# rewrite-V12 — routing state (for resume)
Inputs gathered 2026-09-30 in this folder: rulings.md, findings.md (34), handoffs.md (11 routed + V12's X-V12 rows), agree-pairs.md, edges-v12.md (40 UNDEF, 11 UNTESTED; 17 combos owned), inv.tsv (403 ids with roles), src/ (volume split by heading, md5 0cada4c8).
Plan: cl/ = transformed src (xf.py); parts/ edited per section group; new §3.15 edges; g111/g112/g113 parts; §9 marks; §10 pointer table; §11 answered; §12 condensed; §13 empty + hand-off closure table; assemble; checks; mapping; report; result JSON; LANDED.
DONE: (see lane-events CHECKPOINT lines)

## Notes from the read (for resume)
- E-37: V12 metric unit = `MetricUnit` named subset of base §2.1 `Unit` (model/01 l.24).
- V12-XCONF-1/J122: base §13.6 (1),(7) already carry the sittings rule (M1 look check, M2b, M4, M5; staged panels join next gating sitting, else provisional, offered with every release). V12 cites; §0, §3.9.1, §6 rows, §8.3 risk 6, §11 follow.
- V12-MISSING-2: *Staged entries* order rule -> §16's starts-after relation (J122); unordered rows = the four streams after M4, M6 vs M6-U, M6-E vs M6/M6-U/M6-sky; item-102 line stays "each at own exit".
- §3.10.1: under J122 M6-U, M6-E, M6-sky exit before M-CAL (§16 row: M-CAL after M6-sky) -> their columns are M-CAL's; later runs only for M6-P's late steps or slipped milestones.
- V06: steps now V6-E0..V6-E9 (E9 replay); BenchBarDefs bar.T-V6-70 (E5, due V6-E7), bar.T-V6-73, bar.T-V6-75 (E9, due V6-E9); NoOpPins T-V6-70 (f), T-V6-74 (e).
- V04: undergroundInputOf state gains 'lost'; T-V4-76 (lost void), T-V4-77 (buried former) join item-113 bar map at later of M6-U, M6-E.
- V07: village.json cells (heart.oasis, heart.oasisM, palisade.*, formRules.*, perimeter.closeM, formerCity.*) default line at V-M0; NoOpPins T-V7-59 (111), T-V7-60 (113).
- V09 §7.6 GmTrialRecord (findings[].enteredAs.calibration = entry id); gate allFindingsEntered; T-V9-75; record path plat/goldens/ux/release/gm-trial.json.
- V10: W-IF-05 wired to dist/evidence.json (status, lines, ids); T-V10-50.
- base §13.2 NoOpPins: T102-1, T103-3, T105-4, T106-5, T107-4, T109-6, T110-7, T111-5, T113-7 (convention (5), E-20).
- base T111-1 higherWith, T111-2 conformance, T111-3 rate per water kind, T111-4 most, T111-5 NoOpPin; §13.8: T111-2,3,5 M1 PR (T111-3 nightly); T111-1,4 nightly M2b. T112-1 style check nightly M3b; T112-2 release gate. T113-4/5 at later of M6-U and M6-E; T113-1..3,6,7 M6-E PR.
- item 111 cells: V11 climate rows (V11 §3.17): aridity, arid water chances, oasis chance + no-other-water factor, oasis area band, w_water + pull radius, w_waterP, sunlight cell; S10b well-yield weight/arid coverage. item 113 cells: V11 history.*: epochYears, burialYears (+factors), symbolicQuantile, reuseCost, event-to-epoch rows; history.replay switch. V06's replay.maxEpochs line at E9.
- W-IF-04: dist/evidence.json gains per-entry {reference, due, history} for V09's inspector (status, reference, due, history, lines).
- IN-V12-1 -> default line list (V05 IslandRule accessSiting.deckGapM, lineClearM own cells, never V11 rows). IN-V12-2 -> §3.7.8/§2.10 (V11 IN-V11-1 stamps; presets.FM stepped/deck off). IN-V12-3 -> §3.6b (bars count bends). IN-V12-4 -> §2.2 (item 447's one text; J-VI.3 six barrier kinds; span polygons read by no metric).
