---
name: handfix-b-fable-continuation
description: "How a Fable seat finishes an Opus stand-in's handfix-b repair lane — the pattern, the receipts to re-execute, two reusable raster checks, and two tool hazards that cost round-trips"
metadata:
  node_type: memory
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
  modified: 2026-09-27T22:01:08.150Z
---

Pattern (2026-09-27, lanes handfix-b/repair-model-r1 and repair-kernel-r2, both finished by Fable 5.1 after the opus stand-in had written the block file, its report and a PENDING FABLE REVIEW line): the stand-in's LANDED line already exists in docs/lane-events.log and is self-labelled "opus stand-in, PENDING FABLE REVIEW" — the CONTINUATION OF A STAND-IN clause of the lane text outranks the RESUME RULE there. The Fable seat re-reads every block against its issues (docs/validation/amendments-b/handfix/verify-*-r1.md) and the live subsection (diff the block body against the live section; diff the RATIONALE-A row against the live Part A row word by word), sweeps both design files for other copies of the fixed wording, checks that no sibling repair-r2-*.md replaces the same heading, re-executes the receipts on copies (the stand-in's scratch verify.py, alone and combined with ALL current sibling files — the siblings change after the stand-in ran), promotes the report's PLAUSIBLE items by an executed check where one is possible, appends "## Fable continuation (date)" to the report plus an "ITEM fable-continuation … | done" ledger line, leaves the PENDING line and the queue row (docs/FABLE-REVIEW-QUEUE.md is append-only; the row is for workflows/05 or 15 to close), writes a second LANDED line, and runs `python3 tools/progress.py` (idempotent regen of docs/PROGRESS.md's AUTO block from disk; the last 40 lane events are copied in). Design files are never edited by a repair or continuation seat.

Reusable receipts (stdlib, in docs/validation/amendments-b/handfix/): `tower-order-check.py [cases] [seed]` — §2.6's composed-tower clip order (J-A28.26 amended) on a raster, H1 no holed piece / H2 no holed round room / H3 each round room in one seed piece / H4 one order; `hole-gloss-check.py [cases] [seed]` — §3.4's holed-piece gloss (VHM1-04), G1 gloss ⇔ topological hole under random orders, G2 no hole under the clip order, G3 the tower clause, G4 the old gloss's false refusals; it adds L-shaped wings. Both exit 0 at 3 000 / 2 000 cases on seeds 1–3.

Tool hazards: (1) the harness shell is zsh — an unquoted `$VAR` holding a command with spaces is NOT word-split, so `DC="python3 x.py"; $DC` fails with "no such file"; write commands out or use `${=VAR}`. (2) `docs/validation/amendments-b/refs.py` is positional (`refs.py <document> <out.json>`), not `--doc`. (3) doc_checks with the allow file prints counts only; to compare hit SETS run both copies with an empty allow file and diff after normalising `l. NNNN` (a change earlier in the file shifts every later hit's line number).

**Why:** five more r2 stand-in lanes (determinism, model, pipeline, rendering, scope) carry PENDING rows and will be finished the same way; the pattern and the scripts save each of them a discovery pass.
**How to apply:** follow the pattern above; extend, do not fork, the two raster checks when a clip-order or hole question recurs. When the round HAS been assembled already, corrections route to the next round instead — see [[fable-continuation-assembled-rounds]]; also [[fable-review-queue]], [[doc-checks-corpus-drift]].
