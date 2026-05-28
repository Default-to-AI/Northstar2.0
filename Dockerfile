# Northstar 2.0 API runtime (Node + Python) for Render/Railway
# - Runs the bundled Node server (dist/server.cjs)
# - Provides python3 + pip deps so evidence collectors can run

FROM node:22-bookworm-slim

# System deps:
# - python3/pip for collectors
# - build-essential/python3 for better-sqlite3 native build
# - sqlite3 for debugging/inspection (optional but useful)
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    build-essential \
    pkg-config \
    sqlite3 \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Node deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Install Python deps (minimal set used by scripts/)
COPY scripts/requirements.txt ./scripts/requirements.txt
RUN python3 -m pip install --no-cache-dir -r ./scripts/requirements.txt

# Copy source
COPY . .

# Build static UI + bundled server
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]
