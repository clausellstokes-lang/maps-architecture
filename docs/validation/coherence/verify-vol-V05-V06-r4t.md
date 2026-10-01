# Verify V05 and V06 after repair round 4 — lane coherence/verify-vol-V05-V06-r4t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r4t`, 2026-10-01)
- P0 brief read whole (ROUND-4 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); round-3 findings (5,
  verify-vol-V05-V06-r3t); adjudication-r4 (R4-01 – R4-03, R4-07 – R4-09, R4-12, R4-16 whole; Part H · V05, V06, V08,
  V09, pipeline, model, V03, V10 rows and END lines naming VV56 or V05/V06); repair-r4-V05's and repair-r4-V06's reports;
  assemble-r4 (live hashes equal): done
- P1 word diffs of live V05 (22 hunks) and V06 (51 hunks) against assemble-r3's outputs (commit 6c640e5^): done
- P2 every round-3 finding re-checked against the live text and each END line's second end: done (section 1)
- P3 every round-4 block in scope read subsection by subsection: done (V05 11 blocks, V06 17 blocks; candidates: V09 trigger wording, V06 §6.8 (6) parenthetical, H-AQUA fixture parts)
- P4 ids, references, retired terms, phone clauses, review ids, document checks, sizes: pending
- P5 report, result, LANDED: pending

## 1. Round-3 findings re-checked (draft, P2)

| id | owner (r3) | disposition (adjudication-r4) | verdict now |
|---|---|---|---|
| VV56-r2-06 | V06 | FIX per R4-03 (BLOCKER kept; VV34-r3-01 merged) | FIXED at V06 and every END |
| VV56-r2-04 | V08 | FIX per R4-16 | FIXED (V08 §6 batch, §3.6 (3); V06 §6.8 (6), T-V6-24 cite) |
| VV56-r3-03 | pipeline | FIX | FIXED (§10.2 (d) h ≥ 1; edge row; T-ER-27 fixture) |
| VV56-r3-01 | V06 | FIX | FIXED |
| VV56-r3-02 | V09 | FIX | written as required; the required wording itself restates the events-alone trigger (new minor) |
