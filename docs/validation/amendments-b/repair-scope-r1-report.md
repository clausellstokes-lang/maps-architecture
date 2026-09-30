# repair-scope-r1 — lane amendments-b/repair-scope-r1 (repair round 1, SCOPE part)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-scope-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-b/repair-r1-scope.md` (blocks only; its preamble is the assembler hand-off and the allow
> rows); this file is the lane's report. Base: docs/ARCHITECTURE.md sha256 87d8969209c7deb5…, rationale 3f39b2de60c97741….
> BLOCK summary (VS-08, VR-32; VS-22's figure): planned | done: REPLACE block written
> BLOCK §0.2 (V-MAB-35, VS-13, VD-11b, VP-38, VK-19 (1)–(4), VS-05, VS-09, VS-23, VS-25; new test ids): planned | done: REPLACE block written
> BLOCK §1.1 (VS-27, VS-28): planned | done: REPLACE block written
> BLOCK §1.2 (VS-26): planned | done: REPLACE block written
> BLOCK §1.4 (VD-35b, VS-38, VS-16): planned | done: REPLACE block written
> BLOCK §13.1 (VK-17; the construction's W_ATTRACTED fixture): planned | done: REPLACE block written
> BLOCK §13.2 (VK-18, VK-04 (4), VP-11 / VD-12c / VS-12, VP-38 / VS-13, VP-40, VS-03 (1), VS-04, VS-11, VS-14, VS-20, VS-23, VS-24, VS-32, VS-37): planned | done: REPLACE block written
> BLOCK §13.3 (VR-31 / VS-21): planned | done: REPLACE block written
> BLOCK §13.5 (VS-16): planned | done: REPLACE block written
> BLOCK §13.6 (VS-01): planned | done: REPLACE block written
> BLOCK §13.7 (VS-37): planned | done: REPLACE block written
> BLOCK §13.8 (VS-03 (3), VS-34): planned | done: REPLACE block written
> BLOCK §13.9 (VS-39): planned | done: REPLACE block written
> BLOCK §14 (VK-20, VP-39, VS-23, VS-24, VS-25; model and pipeline notes): planned | done: REPLACE block written
> BLOCK §15.1 (VS-07): planned | done: REPLACE block written
> BLOCK §15.2 (VS-04, VS-05, VS-20): planned | done: REPLACE block written
> BLOCK §16 (VS-03 (2), VS-04, VS-06, VS-20, VS-22, VS-23, VS-30, VS-31, VS-33, VS-34): planned | done: REPLACE block written
> BLOCK §17.1 (VS-09, VS-10, VS-38): planned | done: REPLACE block written
> BLOCK Delegated decisions (VS-36, VS-06 / VS-22 / VS-33 in D-20, VS-23 in D-25): planned | done: REPLACE block written
> BLOCK Staged (VS-35, VK-19 (5)–(6), VP-41, VS-03 (2), VS-23): planned | done: REPLACE block written
> BLOCK Appendix A (VS-37): planned | done: REPLACE block written
> BLOCK J-ROWS + RATIONALE-A (J-A15.01, J-A23.02 new; J-A16.01, J-A20.01, J-A21.01, J-A23.01, J-A27.01, J-A28.01, J-A28.02 restated): planned | done: J-ROWS (7 rows) + RATIONALE-A (9 rows) written
> HAND-OFF VS-40 (the index paragraph swap), restated-row swaps, allow rows: planned | done: preamble hand-off (1) row swaps, (2) the VS-40 paragraph swap, (3) 32 allow rows, (4) cross-part notes; receipts §4

## 1 Outcome

All 50 routed issues are answered in `docs/validation/amendments-b/repair-r1-scope.md` (sha256 `ff370304…`): 21 REPLACE
blocks over the scope part, one J-ROWS block (7 rows) and one RATIONALE-A block (9 rows). Every REPLACE body is the live
subsection with asserted single-occurrence substitutions, so every untouched line is byte-identical. One issue, VS-40,
cannot be a block without harm: its paragraph shares the level-1 heading `# Judgment calls` with the index table that the
earlier files append to, so the file hands the assembler an exact four-line → five-line swap instead (preamble (2)). Two
rulings are new (J-A15.01, J-A23.02); five index rows and seven Part A entries are restated under their existing ids.

| issue(s) | where | fix (short) |
|---|---|---|
| VS-08, VR-32 | summary | "the markets" twice; effort 166–220; erratum sentences removed; "(§11.3, §17.3, D-22)" |
| V-MAB-35, VS-13, VD-11b, VP-38 | §0.2 rows 11, 25; T25-1 | tunnel condition a reading (J-A11.21); `siltReach`; terrain or water operator or the carve; `LandUse.reclaimed` in §2.7 |
| VK-19 (1)–(4) | §0.2 rows 12, 21, 28, 30 | arena isolation (§3.4, §3.10); §3.1's licence ground; §3.3 `ArenaKey`, §3.8 `spine`; §3.10 nesting + passage room |
| VS-05, VS-09, VS-23, VS-25 | §0.2 rows 26, 21, 28 | O14 (h); §17.1 (1) unchanged; `setRoomUnit` and the change marker; the plan step's package |
| VS-27, VS-28 | §1.1 | SettlementForge = the data mapping onto the contract the base builds; village rows in the `rung` comment |
| VS-26 | §1.2 | `Features.sewers` resolved by tier, network built when the staged stage exists; plans on a second click at stage 3 |
| VD-35b, VS-38, VS-16 | §1.4, §17.1 (6) | item-23 paragraph → one pointer sentence to §7.6; §17.1 (6) one sentence; MFCG shares = its 2017 open-source model |
| VK-17 (+ J-A28.34's consequence) | §13.1 | clipped T wings, `overlap` refusals, hot-pixel split vs 20 cm `seed` refusal; kept rings keep their polygons |
| VK-18, VK-04 (4) | T28-14, T28-4 | shell by leaf digest (§2.6, §5.3), §3.10 for the tiling; storeys' extents and the passage room |
| VS-12 (VP-11, VD-12c) | T31-9 | frontage edges and no shell shrunk, other changes matched to §5.3's epoch row's events |
| VP-40, VS-11, VS-14 | T8-7, T31-4, T12-1 | stored plan re-cut in the event; join/split "vacate first" unless confirmed; cellar stair and gratings |
| VS-03, VS-23 | T28-17, T28-18; §13.8; §16; Staged | T28-17's housing and F-PLAN clauses; T28-18 (`relet` / `setRoomUnit`); base-built bars at M3a, the rest at stage 3 |
| VS-04 | T20-5; §15.2 O10 (i); §16 M3a | the one-way door by message-kind enumeration and `report.changed` |
| VS-20 | T28-19, T29-5, T30-5, T12-1; O12 (d); §16 | plan block, VTT portals and basements, withheld query rows and legend, one depth band; legend 100 % of admitted places |
| VS-24, VK-20, VP-39, VS-25 | §13.2 registry sentence; §14 | point to §2.8's registry list; `@plat/model`, `tables` (`InteriorLadderRow`, `basementGate`, `DisruptionBudgetRow`), `labels`, `render`, `api`; `Kernel.plat(key: PlatKey)`; §10.2's rows; no `PlanBuilder` |
| VS-32 (J-A15.01) | T15-1 | count law tested against each seed's expectation; every count on an h = 1 fixture |
| VR-31 / VS-21 | §13.3 | placement goldens at `public` with no places, one golden CITY also at `secret` |
| VS-16, VS-37, VS-01 (J-A23.02), VS-39 | §13.5, §13.7, §13.6 (3), §13.9 (5) | MFCG shares a note, no row; soft bands with numbers; parity presets on the MFCG / FTG pairs; item 24 |
| VS-34 | §16, §13.8 | T14-1 but hidden-render and T16-4 at M1; T23-1's parity clauses and S10b's §12.4 row at M2b; island draw at M4; tiers |
| VS-06, VS-22, VS-30, VS-31, VS-33 | §16, D-20 | O14-core to the must line; knowledge work +1 on O11 (M3a 23–28); regrowth-first on O9 and M4; audit covers the marker; no history figures; total 166–220, cuts ≈ 135–174 / ≈ 149–192 |
| VS-07 | §15.1 B7, B13, B14, a:J05 | markets; FTG's shanty trigger, extramural a soft row; principal and secondary markets; stalls by rank |
| VS-10, VS-36 | §17.1 (2), D-2 | the pass's own report files; the regional material shift a region preset |
| VS-35, VP-41, VK-19 (5)–(6) | Staged | condition a reading; `UndergroundRule` rows; kernel clauses; rendering hooks; §11.3 for the separate program |
| VS-37 | Appendix A | Dwellings numbers research-side notes, never baseline rows |
| VK-16, VS-09 | J-A21.01 Part A | CGAL's licence ground kept (J-A21.31 re-stated); no sentence added to §17.1 |
| VS-40 | the index paragraph | assembler swap: the first digit names the seat's part (0, 2, 3, 4, 5–7, 8) |

## 2 Rulings recorded (vetoable)

* **J-A23.02 (new; VS-01).** The D-5 panel's MFCG and FTG pairs render PLAT under the matching parity preset; NG pairs and
  the threshold strips under the default. Chosen over the default preset because three homes already say so and item 23
  makes the emulation the base "at parity" and "mastered" judge. Reversal: one sentence of §13.6 (3) plus three pointers.
* **J-A15.01 (new; VS-32).** T15-1 compares the count distribution with each seed's expectation and proves reachability
  on an h = 1 fixture, rather than the verifier's "every count among 100 seeds with h ≥ 0.5", which a correct law fails
  about one run in four (P(count 3 | h = 0.5) ≈ 0.013).
* **J-A16.01 (restated; VS-06, VS-22).** The rendering part's knowledge work is priced (+1 pw on O11, M3a 23–28), not
  named absorbed; the total becomes 166–220 (base 152–202). The `states`, glyph and `live.stale` rows are absorbed by O12.
* **J-A28.01 (restated; VS-03).** B-PLAN bars whose mechanism the base builds run from M3a; the rest from stage 3.
* **J-A27.01, J-A28.02, J-A20.01, J-A21.01, J-A23.01 (restated)** follow VS-16, VS-08, VS-04, VK-16 / VS-09 and VD-35b.

## 3 Cross-part notes and hand-off

The block file's preamble holds the assembler hand-off: (1) the restated-row swaps; (2) the VS-40 paragraph swap as
`# OLD|` / `# NEW|` lines; (3) 32 reviewed allow rows; (4) notes to other lanes — model §2.6's Bars pointer should read
T28-13 – T28-18, and the model repair's J rows carry the 7 C3 runs that stay unreviewed on the combined output.

## 4 Receipts (executed 2026-09-27)

* `apply-blocks.py`, this file alone on scratch copies of the live files (sha256 `87d89692…`, `3f39b2de…`): 23 found, 23
  applied, 0 skipped; audit not OK 0; headings 145 → 145; fences balanced (110 → 110); title block unchanged; PENDING
  FABLE REVIEW lines 0 → 0; duplicate ids exactly the restated ones.
* All six repair files (determinism, kernel, model, pipeline, rendering, scope) in name order: 94 found, 94 applied, 0
  skipped, audit not OK 0.
* After the simulated hand-off (row swaps and the paragraph swap, scratchpad `rs1/postproc.py`): `refs.py` broken 2 on
  both outputs, the two pre-existing external citations (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6).
* `doc_checks.py --sections "The whole design,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`:
  live document C3 231 / 40 unreviewed (corpus growth); this file's output with the live TSV, the siblings' rows and this
  file's 32 rows: C1 5/0, C2 0/0, C3 235/0, C4 3/0, S1 0/0, S2 0/0, exit 0. All six files: C3 246/7, the 7 in the model
  repair's J rows.
* T ids: 88 defined, 0 cited undefined (T20-5, T28-18, T28-19, T29-5, T30-5 among the defined). §16's sums re-added by
  script: effort lines 152–202, + stage 2 14–18 = 166–220 = the milestone sum.
* The live `docs/ARCHITECTURE.md`, the rationale file and the validation file are unchanged by this lane.

**CONFIRMED** (executed above): the blocks apply cleanly alone and with every sibling, the substitutions hit exactly the
quoted text, references resolve, the checks pass with the reviewed rows, and the effort figures add up. **PLAUSIBLE**
(reasoning only): the two new rulings and the O11 pricing choice, VS-37's soft-band numbers (± 0.05, Spearman 0.8, 90 %),
and the reading that the rendering repair's §9.2 / §11.2 names stay as cited.
