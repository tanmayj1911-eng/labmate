"""
health_check.py — Verify that the Lab Mate environment is correctly set up.

Usage:
    python execution/health_check.py

Checks:
    - Python version >= 3.10
    - Required directories exist (directives/, execution/, .tmp/)
    - .env file present (or env vars set)
    - Optional: python-dotenv installed
    - Optional: google-auth libraries installed
"""

import sys
import os
from pathlib import Path


REQUIRED_DIRS = ["directives", "execution", ".tmp"]
OPTIONAL_PACKAGES = ["dotenv", "googleapiclient", "google.auth", "openai"]


def check(label: str, ok: bool, detail: str = "") -> bool:
    icon = "✅" if ok else "❌"
    suffix = f"  ({detail})" if detail else ""
    print(f"  {icon}  {label}{suffix}")
    return ok


def main():
    print("\n── Lab Mate Health Check ─────────────────────────────────")
    all_ok = True

    # Python version
    major, minor = sys.version_info[:2]
    all_ok &= check(f"Python >= 3.10", major >= 3 and minor >= 10,
                    f"found {major}.{minor}")

    # Required directories
    for d in REQUIRED_DIRS:
        exists = Path(d).is_dir()
        all_ok &= check(f"Directory: {d}/", exists)

    # .env file
    env_exists = Path(".env").exists()
    check(".env file", env_exists,
          "not found — copy .env.example → .env and fill in secrets" if not env_exists else "")

    # Optional packages
    print("\n  Optional packages:")
    for pkg in OPTIONAL_PACKAGES:
        try:
            __import__(pkg.split(".")[0])
            check(pkg, True)
        except ImportError:
            check(pkg, False, "not installed")

    print()
    if all_ok:
        print("  All checks passed. Lab Mate is ready. 🚀\n")
    else:
        print("  Some required checks failed. Fix the issues above before running tasks.\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
