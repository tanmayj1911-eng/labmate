# Directives

Directives are **Layer 1** of the Lab Mate architecture — the SOPs that tell the agent *what* to do and *why*.

## Conventions

| Field | Description |
|---|---|
| **Goal** | One-sentence purpose of the directive |
| **Inputs** | What the agent (or user) must supply |
| **Steps** | Ordered actions referencing `execution/` scripts |
| **Outputs** | What is produced (file, Sheet, Slide, …) |
| **Edge cases** | Known failure modes and how to handle them |

## Living documents

Directives grow over time. When a script is updated or a new API constraint is discovered, **update the relevant directive** so the next run benefits from that learning.

Do **not** delete or overwrite a directive without explicit user approval.
