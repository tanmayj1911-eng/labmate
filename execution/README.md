# Execution Scripts

Execution scripts are **Layer 3** of the Lab Mate architecture — deterministic Python tools that do the actual work.

## Conventions

- Every script is **self-contained**: imports, argument parsing, and a `main()` guard.
- Use `argparse` for CLI arguments so scripts are easy to call and test.
- Load secrets from `.env` via `python-dotenv`.
- Write intermediate outputs to `.tmp/<task>/` (never hard-code paths).
- Exit with code 0 on success, non-zero on failure — the agent reads exit codes.
- Keep each script **commented**: what it does, what it needs, what it produces.

## Adding a new script

1. Create `execution/your_script.py`.
2. Reference it in the matching directive in `directives/`.
3. Test it end-to-end before marking the directive `active`.
