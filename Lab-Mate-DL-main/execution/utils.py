"""
utils.py — Shared helpers for Lab Mate execution scripts.

Usage:
    from execution.utils import load_env, ensure_tmp, log

All scripts should import from here rather than duplicating boilerplate.
"""

import os
import sys
import json
import logging
from pathlib import Path
from datetime import datetime

# ── Environment ───────────────────────────────────────────────────────────────

def load_env(dotenv_path: str | Path = ".env") -> None:
    """Load .env into os.environ using python-dotenv (graceful if missing)."""
    try:
        from dotenv import load_dotenv
        load_dotenv(dotenv_path=str(dotenv_path), override=False)
    except ImportError:
        pass  # python-dotenv not installed; rely on existing env vars


# ── Filesystem ────────────────────────────────────────────────────────────────

def ensure_tmp(subdir: str = "") -> Path:
    """
    Return (and create) a .tmp subdirectory path.

    Args:
        subdir: Optional subfolder, e.g. "scrape_results"

    Returns:
        pathlib.Path to the directory (guaranteed to exist)
    """
    base = Path(".tmp")
    target = base / subdir if subdir else base
    target.mkdir(parents=True, exist_ok=True)
    return target


# ── Logging ───────────────────────────────────────────────────────────────────

def get_logger(name: str = "labmate", level: int = logging.INFO) -> logging.Logger:
    """Return a configured logger that writes to stdout."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(
            logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%H:%M:%S")
        )
        logger.addHandler(handler)
    logger.setLevel(level)
    return logger


# ── JSON helpers ──────────────────────────────────────────────────────────────

def save_json(data: dict | list, path: str | Path) -> None:
    """Write data to a JSON file (creates parent dirs automatically)."""
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False, default=str)


def load_json(path: str | Path) -> dict | list:
    """Read a JSON file and return parsed contents."""
    with open(Path(path), "r", encoding="utf-8") as f:
        return json.load(f)


# ── Misc ──────────────────────────────────────────────────────────────────────

def timestamp() -> str:
    """Return an ISO-8601 timestamp string safe for filenames."""
    return datetime.now().strftime("%Y%m%dT%H%M%S")
