---
name: fable-continuation-assembled-rounds
description: "Method for a Fable seat finishing an Opus stand-in's repair-round block file after the assembler has already consumed it (handfix-b, 2026-09-27) — corrections route to the live round, never by re-applying the consumed file"
metadata:
  node_type: memory
  type: method
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
  modified: 2026-09-27T21:36:45.832Z
---

On 2026-09-27 the Fable continuation of `handfix-b/repair-model-r1` found its block file already applied by `assemble-r1`, judged by `verify-model-r1`, and built on by the round-2 repair seats (workflows/13-handfix-b.js runs repair → assemble → verify per round; the CONTINUATION clause says "regenerate the block whole" but nothing re-runs an earlier round's assembly).

**Why:** re-applying a corrected round-N block now would revert round N+1's REPLACE of the same subsection; a regenerated round-N file is dead text. The design files have moved on (live hashes differ from the stand-in's base).

**How to apply:**
1. Verify the block file is the bytes the assembler consumed (sha256 in `assemble-rN.md`'s table); re-apply it alone on the `docs/archive/*-pre-…-repair-rN-…` copies and `cmp` against the stand-in's dry-run output — a receipt that the review reads the applied text.
2. Judge each block against its issue on the LIVE text (the verifier's `vm*/wdiff-rN.txt` gives the exact deltas) and the readers the clause leans on; for a geometric ruling, execute a randomized raster check and keep the script in the repo (precedent: `docs/validation/amendments-b/handfix/tower-order-check.py`).
3. A needed correction goes to the CURRENT round's block file (the repair-r(N+1) seat's continuation, whose REPLACE is generated from the live text) or to the close lane's substitution list — never into the consumed file.
4. Re-execute the receipts once (probes on live, `refs.py <doc> <scratch.json>` — never the rationale in the output slot, see the 08:56 incident — and `doc_checks.py` on one copy since no design text changes); append "## Fable continuation (date)" to the report, leave the PENDING line and the queue row for workflows/05, write a second LANDED line naming the continuation.
