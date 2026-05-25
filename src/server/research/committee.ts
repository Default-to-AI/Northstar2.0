import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';
import {getFrozenEvidencePacket} from './evidence.ts';
import {evaluateRiskGovernance} from '../../lib/riskGovernance.ts';

type CommitteeRequestBody = {
  evidencePacketId?: string;
  ticker?: string;
};

type CommitteeSessionRow = {
  id: string;
  evidence_packet_id: string;
  ticker: string;
  model: string;
  external_llm: number;
  created_at: string;
  final_json: string;
  score_snapshot_id: number | null;
  score_model_id: string | null;
  source_freshness: string;
  prompt_version: string;
  schema_version: string;
};

type PacketPayload = {
  id?: string;
  score?: {
    snapshotId?: number | null;
    modelId?: string | null;
    actionabilityState?: string;
  };
  sourceFreshness?: Record<string, unknown>;
  promptVersion?: string;
  schemaVersion?: string;
  [key: string]: unknown;
};

type CommitteeFinal = {
  category: 'WATCH';
  market_implication: string;
  playbook: {
    entry: string;
    stop: string;
    target: string;
    size: string;
    invalidation: string;
    review_trigger: string;
    confidence: string;
    citations: string[];
  };
};

type CommitteeValidation = {
  sanitizedFinal: CommitteeFinal;
  warnings: string[];
};

class CommitteeValidationError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'CommitteeValidationError';
    this.statusCode = statusCode;
  }
}

type CommitteeLineage = {
  scoreSnapshotId: number | null;
  scoreModelId: string | null;
  sourceFreshness: Record<string, unknown>;
  promptVersion: string;
  schemaVersion: string;
};

function ensureColumn(db: Database.Database, tableName: string, columnName: string, ddl: string): void {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{name: string}>;
  const hasColumn = columns.some((column) => column.name === columnName);
  if (!hasColumn) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${ddl}`);
  }
}

function ensureCommitteeTables(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS committee_sessions (
      id TEXT PRIMARY KEY,
      evidence_packet_id TEXT NOT NULL,
      ticker TEXT NOT NULL,
      model TEXT NOT NULL,
      external_llm INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      final_json TEXT NOT NULL,
      score_snapshot_id INTEGER,
      score_model_id TEXT,
      source_freshness TEXT NOT NULL DEFAULT '{}',
      prompt_version TEXT NOT NULL DEFAULT 'unknown',
      schema_version TEXT NOT NULL DEFAULT 'v1'
    );
  `);

  ensureColumn(db, 'committee_sessions', 'score_snapshot_id', 'score_snapshot_id INTEGER');
  ensureColumn(db, 'committee_sessions', 'score_model_id', 'score_model_id TEXT');
  ensureColumn(db, 'committee_sessions', 'source_freshness', "source_freshness TEXT NOT NULL DEFAULT '{}'");
  ensureColumn(db, 'committee_sessions', 'prompt_version', "prompt_version TEXT NOT NULL DEFAULT 'unknown'");
  ensureColumn(db, 'committee_sessions', 'schema_version', "schema_version TEXT NOT NULL DEFAULT 'v1'");
}

function generateSessionId(): string {
  return `cms_${Date.now()}`;
}

function isPayloadEmpty(payload: PacketPayload): boolean {
  return Object.keys(payload).length === 0;
}

function hasStaleCore(payload: PacketPayload): boolean {
  return payload.score?.actionabilityState !== 'fresh_actionable';
}

function extractLineage(payload: PacketPayload): CommitteeLineage {
  const sourceFreshness = typeof payload.sourceFreshness === 'object' && payload.sourceFreshness !== null
    ? payload.sourceFreshness
    : {
      actionabilityState: payload.score?.actionabilityState ?? 'unknown',
      frozenEvidence: true,
    };

  return {
    scoreSnapshotId: typeof payload.score?.snapshotId === 'number' ? payload.score.snapshotId : null,
    scoreModelId: typeof payload.score?.modelId === 'string' ? payload.score.modelId : null,
    sourceFreshness,
    promptVersion: typeof payload.promptVersion === 'string' ? payload.promptVersion : 'unknown',
    schemaVersion: typeof payload.schemaVersion === 'string' ? payload.schemaVersion : 'v1',
  };
}

function buildCommitteePrompt(packetId: string, ticker: string, payload: PacketPayload): string {
  return [
    'You are an investment committee assistant. Output ONLY valid JSON.',
    'Given the frozen evidence payload, synthesize a WATCH-category playbook.',
    'Constraints:',
    '- category must be WATCH',
    '- citations must reference evidence fields and include evidence_packet:<id>',
    '- confidence must be one of low|medium|high',
    '- each playbook field must be concrete and non-empty',
    'JSON schema:',
    '{',
    '  "category": "WATCH",',
    '  "market_implication": "string",',
    '  "playbook": {',
    '    "entry": "string",',
    '    "stop": "string",',
    '    "target": "string",',
    '    "size": "string",',
    '    "invalidation": "string",',
    '    "review_trigger": "string",',
    '    "confidence": "low|medium|high",',
    '    "citations": ["string"]',
    '  }',
    '}',
    `Ticker: ${ticker}`,
    `Evidence packet ID: ${packetId}`,
    `Frozen evidence payload JSON:\n${JSON.stringify(payload)}`,
  ].join('\n');
}

function citationExistsInPayload(citation: string, payload: PacketPayload): boolean {
  if (citation.startsWith('evidence_packet:')) {
    const citedPacketId = citation.slice('evidence_packet:'.length).trim();
    const payloadPacketId = String(payload.id ?? '').trim();
    return citedPacketId.length > 0 && payloadPacketId.length > 0 && citedPacketId === payloadPacketId;
  }

  const segments = citation.split('.').filter(Boolean);
  if (segments.length === 0) {
    return false;
  }

  let cursor: unknown = payload;
  for (const segment of segments) {
    if (!cursor || typeof cursor !== 'object' || !(segment in (cursor as Record<string, unknown>))) {
      return false;
    }
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor !== undefined;
}

function parsePercentValues(text: string): number[] {
  const matches = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%/g)];
  return matches.map((match) => Number.parseFloat(match[1])).filter((value) => Number.isFinite(value));
}

function applyRiskGovernanceToPlaybook(final: CommitteeFinal, violations: string[], maxPct: number): CommitteeFinal {
  const requestedPercents = parsePercentValues(final.playbook.size);
  if (requestedPercents.length === 0) {
    throw new CommitteeValidationError('Committee playbook rejected: size must include a numeric percent for risk governance enforcement.');
  }

  if (maxPct <= 0) {
    throw new CommitteeValidationError('Committee playbook rejected: computed risk-governed max position size is non-positive.');
  }

  const requestedMaxPct = Math.max(...requestedPercents);
  const exceedsBound = requestedMaxPct > maxPct || violations.some((violation) => violation.startsWith('max_position_exceeded:'));
  if (!exceedsBound) {
    return final;
  }

  return {
    ...final,
    playbook: {
      ...final.playbook,
      size: `${maxPct.toFixed(2)}% max position size (risk-governed cap). Original model output: ${final.playbook.size}`,
    },
  };
}

function validateAndSanitizeCommitteeFinal(final: CommitteeFinal, payload: PacketPayload): CommitteeValidation {
  const warnings: string[] = [];

  const requiredPlaybookFields = ['entry', 'stop', 'target', 'size', 'invalidation', 'review_trigger', 'confidence'] as const;
  for (const field of requiredPlaybookFields) {
    if (final.playbook[field].trim().length === 0) {
      warnings.push(`missing_required_playbook_field:${field}`);
    }
  }

  if (final.playbook.citations.length === 0) {
    throw new CommitteeValidationError('Committee playbook rejected: citations are required and must ground to evidence payload fields or evidence_packet:<id>.');
  }

  const invalidCitations = final.playbook.citations.filter((citation) => !citationExistsInPayload(citation, payload));
  if (invalidCitations.length > 0) {
    for (const citation of invalidCitations) {
      warnings.push(`invalid_citation:${citation}`);
    }
    throw new CommitteeValidationError(`Committee playbook rejected: invalid citations (${invalidCitations.join(', ')}).`);
  }

  return {
    sanitizedFinal: {
      ...final,
      playbook: {
        ...final.playbook,
        citations: final.playbook.citations,
      },
    },
    warnings,
  };
}

function parseCommitteeFinal(raw: string): CommitteeFinal {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const playbook = parsed.playbook as Record<string, unknown> | undefined;
  const citationsRaw = playbook?.citations;
  const citations = Array.isArray(citationsRaw)
    ? citationsRaw.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  if (parsed.category !== 'WATCH' || typeof parsed.market_implication !== 'string' || !playbook) {
    throw new Error('Invalid committee schema from LLM');
  }

  const requiredPlaybookFields = ['entry', 'stop', 'target', 'size', 'invalidation', 'review_trigger', 'confidence'] as const;
  const normalizedPlaybook: Record<(typeof requiredPlaybookFields)[number], string> = {
    entry: '',
    stop: '',
    target: '',
    size: '',
    invalidation: '',
    review_trigger: '',
    confidence: '',
  };

  for (const field of requiredPlaybookFields) {
    if (typeof playbook[field] === 'string') {
      normalizedPlaybook[field] = String(playbook[field]);
    }
  }

  return {
    category: 'WATCH',
    market_implication: parsed.market_implication,
    playbook: {
      entry: normalizedPlaybook.entry,
      stop: normalizedPlaybook.stop,
      target: normalizedPlaybook.target,
      size: normalizedPlaybook.size,
      invalidation: normalizedPlaybook.invalidation,
      review_trigger: normalizedPlaybook.review_trigger,
      confidence: normalizedPlaybook.confidence,
      citations,
    },
  };
}

async function synthesizeWatchPlaybook(packetId: string, ticker: string, payload: PacketPayload): Promise<CommitteeFinal> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required for committee synthesis');
  }

  const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const response = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'northstar-committee/1.0',
    },
    body: JSON.stringify({
      contents: [{parts: [{text: buildCommitteePrompt(packetId, ticker, payload)}]}],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini committee synthesis failed (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{content?: {parts?: Array<{text?: string}>}}>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini committee synthesis returned empty output');
  }

  return parseCommitteeFinal(text);
}

export function registerCommitteeRoutes(app: Express, openDb: () => Database.Database): void {
  app.post('/api/research/committee/session', async (req: Request<Record<string, never>, unknown, CommitteeRequestBody>, res: Response) => {
    const evidencePacketId = req.body?.evidencePacketId?.trim();
    if (!evidencePacketId) {
      return res.status(400).json({
        error: 'evidencePacketId is required. Ticker-only committee requests are blocked; freeze evidence first.',
      });
    }

    let db: Database.Database | null = null;
    try {
      db = openDb();
      ensureCommitteeTables(db);
      const packet = getFrozenEvidencePacket(db, evidencePacketId);
      if (!packet) {
        return res.status(404).json({error: `Frozen evidence packet not found: ${evidencePacketId}`});
      }

      const payload = JSON.parse(packet.payloadJson) as PacketPayload;
      // Inject the packet id into payload so citationExistsInPayload can match
      // evidence_packet:<id> citations against the actual packet id.
      // The packet id is not stored inside payloadJson; it's separate DB metadata.
      payload.id = packet.id;
      if (isPayloadEmpty(payload)) {
        return res.status(422).json({error: `Frozen evidence packet ${packet.id} has empty payload; regenerate evidence packet.`});
      }
      if (hasStaleCore(payload)) {
        return res.status(422).json({
          error: `Frozen evidence packet ${packet.id} has stale core (actionabilityState=${payload.score?.actionabilityState ?? 'unknown'}). Refresh pipeline and freeze a new packet.`,
        });
      }

      const lineage = extractLineage(payload);
      const llmFinal = await synthesizeWatchPlaybook(packet.id, packet.ticker, payload);
      const outputValidation = validateAndSanitizeCommitteeFinal(llmFinal, payload);
      const riskGovernance = evaluateRiskGovernance({
        entry: outputValidation.sanitizedFinal.playbook.entry,
        stop: outputValidation.sanitizedFinal.playbook.stop,
        size: outputValidation.sanitizedFinal.playbook.size,
        payload,
      });
      const riskGovernedFinal = applyRiskGovernanceToPlaybook(
        outputValidation.sanitizedFinal,
        riskGovernance.violations,
        riskGovernance.boundedSizeRange.maxPct,
      );
      const sessionId = generateSessionId();
      const createdAt = new Date().toISOString();
      const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';

      db.prepare(
        `INSERT INTO committee_sessions (
          id, evidence_packet_id, ticker, model, external_llm, created_at, final_json,
          score_snapshot_id, score_model_id, source_freshness, prompt_version, schema_version
        ) VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        sessionId,
        packet.id,
        packet.ticker,
        model,
        createdAt,
        JSON.stringify(riskGovernedFinal),
        lineage.scoreSnapshotId,
        lineage.scoreModelId,
        JSON.stringify(lineage.sourceFreshness),
        lineage.promptVersion,
        lineage.schemaVersion,
      );

      const session = db
        .prepare(
          `SELECT id, evidence_packet_id, ticker, model, external_llm, created_at, final_json,
                  score_snapshot_id, score_model_id, source_freshness, prompt_version, schema_version
           FROM committee_sessions WHERE id = ?`,
        )
        .get(sessionId) as CommitteeSessionRow;

      return res.json({
        sessionId: session.id,
        evidencePacketId: session.evidence_packet_id,
        ticker: session.ticker,
        model: session.model,
        externalLlm: Boolean(session.external_llm),
        createdAt: session.created_at,
        scoreSnapshotId: session.score_snapshot_id,
        scoreModelId: session.score_model_id,
        sourceFreshness: JSON.parse(session.source_freshness) as Record<string, unknown>,
        promptVersion: session.prompt_version,
        schemaVersion: session.schema_version,
        final: JSON.parse(session.final_json) as CommitteeFinal,
        warnings: outputValidation.warnings,
        riskGovernance,
      });
    } catch (error) {
      if (error instanceof CommitteeValidationError) {
        return res.status(error.statusCode).json({error: error.message});
      }
      console.error('Grounded committee error:', error);
      return res.status(500).json({error: 'Failed to run grounded committee session'});
    } finally {
      db?.close();
    }
  });
}
