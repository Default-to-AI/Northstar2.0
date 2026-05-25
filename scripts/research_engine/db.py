from __future__ import annotations

import os
import sqlite3
from pathlib import Path


def repo_root() -> Path:
    """Return the repository root from this module location."""
    return Path(__file__).resolve().parents[2]


def resolve_db_path() -> Path:
    """Resolve the Northstar research SQLite database path.

    NORTHSTAR_DB_PATH wins; otherwise default to repo-root data/northstar.db.
    """
    configured = os.environ.get("NORTHSTAR_DB_PATH")
    if configured:
        return Path(configured).expanduser().resolve()
    return repo_root() / "data" / "northstar.db"


def connect(db_path: Path | None = None, *, must_exist: bool = False) -> sqlite3.Connection:
    """Open a SQLite connection with the project's concurrency pragmas."""
    path = db_path or resolve_db_path()
    if must_exist and not path.exists():
        raise FileNotFoundError(f"Northstar DB not found: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA busy_timeout=5000")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn
