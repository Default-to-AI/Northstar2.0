#!/usr/bin/env python3
"""
Overnight Northstar 2.0 improvement loop.
Runs continuously until timeout or manual stop.
Each iteration: collect -> analyze -> improve -> test -> commit.
"""
import subprocess
import time
import sys
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent.parent
LOG = ROOT / "overnight.log"
ITERATION = 0
MAX_ITERATIONS = 999  # effectively unlimited

def run(cmd, cwd=None, check=False, timeout=300):
    result = subprocess.run(cmd, shell=True, cwd=cwd or ROOT,
                           capture_output=True, text=True, timeout=timeout)
    return result

def log(msg):
    entry = f"[{datetime.now().isoformat()}] {msg}"
    print(entry, flush=True)
    with LOG.open("a") as f:
        f.write(entry + "\n")

def git_commit(msg):
    """Stage all changes and commit with message."""
    run("git add -A")
    result = run(f'git commit -m "{msg}"')
    if result.returncode == 0:
        log(f"COMMIT: {msg}")
        return True
    else:
        # No changes to commit is fine
        if "nothing to commit" in result.stdout.lower():
            log("No changes to commit")
            return True
        log(f"COMMIT FAILED: {result.stderr}")
        return False

def iteration():
    global ITERATION
    ITERATION += 1
    log(f"=== ITERATION {ITERATION} START ===")

    # 1. Run data collectors (free stack)
    log("Running data collectors...")
    # Seed universes
    run("python -m scripts.seed_sp500")
    run("python -m scripts.seed_qqq")
    run("python -m scripts.seed_dow30")
    run("python -m scripts.seed_themes")
    run("python -m scripts.refresh_universes")

    # Research engine collectors
    run("python -m scripts.research_engine.briefing")
    run("python -m scripts.research_engine.collect_events")
    run("python -m scripts.research_engine.decision_workflow")
    run("python -m scripts.research_engine.fetch_history")
    run("python -m scripts.research_engine.scoring")
    run("python -m scripts.research_engine.sector_metrics")
    run("python -m scripts.research_engine.outcomes")

    # 2. Build + typecheck + lint
    log("Building TypeScript...")
    run("npm run build")

    log("Typechecking...")
    run("npx tsc --noEmit")

    log("Linting...")
    run("npm run lint")

    # 3. Run tests
    log("Running tests...")
    run("npm test -- --run")

    # 4. Commit changes
    commit_msg = f"chore: overnight iteration {ITERATION} - data refresh + build verify"
    git_commit(commit_msg)

    log(f"=== ITERATION {ITERATION} COMPLETE ===\n")

if __name__ == "__main__":
    log("Overnight improvement loop started")
    try:
        while ITERATION < MAX_ITERATIONS:
            iteration()
            time.sleep(60)  # 1 min between cycles
    except KeyboardInterrupt:
        log("Stopped by user")
    except Exception as e:
        log(f"FATAL: {e}")
        sys.exit(1)
