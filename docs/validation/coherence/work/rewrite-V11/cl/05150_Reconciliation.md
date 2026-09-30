## Reconciliation round 3 (volumes/reconcile-V11-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 8 seam issues this volume owns in `docs/volumes/critique/seam-settlements-r2.md` (SR2-*)
and `docs/volumes/critique/seam-content-calibration-r2.md` (SCC-*): 0 blockers, 2 majors, 6 minors — **8 FIXED, 0
INVALID, 0 on the fix list**. The pre-round text is kept at `scratchpad/volumes/rcV11r3/V11-pre-reconcile-r3.md` (md5
4cf57d39…). What changed, by issue:

| id | severity | disposition | where |
|---|---|---|---|
| SR2-05 | major | FIXED — the roster's coverage option adds no member at the rungs whose `RungProfile.frameLaw` is `territory`; a `V` cell is a siting pull there (V07 §2.4's presence column, BCR-V7-36 (a), J-V7.101); T-V11-13 notes the village rows lie outside the roster clause | V11 §3.5.1, T-V11-13, W37, J-V11.73 |
| SCC-51 | major | FIXED — `PresetId` (`MFCG`, `FTG`, `VG`, `FM`; file f items 376–377) types the source cell's `presets` (each entry `{ v, p? }`) and `ext.over`; the compiler checks the keys, the `presetsRequired` cells and every named off form under each zeroing preset whose file ships, and admits a `presets.FM` entry only on item 376's cells; V11's carrying cells stated (`bulkyWater`, `perishableShort` 1; `orientEnabled`, `splitEnabled`, `terrace.enabled` false in MFCG, FTG, VG; FM 0 on V11 §3.24.0's chance and offer cells), each `own` with a `fixed:` note; VG entries land with V07's V-M0 (confirmed in round 4 as the milestone whose content ships the `VG` preset file), FM entries with V02's M6c | §2.1 `presetsRequired`, §2.2 (type and "The preset entries"), §3.1 row 73, V11 §3.2.1 step 4, V11 §3.7.4, V11 §3.24.0, §8, V11 §2.10, W68, T-V11-21, J-V11.74, X-V11-12 |
| SR2-06 | minor | FIXED — the village range row cited by V08 §3.5.1 (b)'s rule, keyed by step type and the class that plays the member class, the qualifier the row's label (J-V7.105) | V11 §3.12 |
| SCC-63 | minor | FIXED — the same sentence as SR2-06 | V11 §3.12 |
| SCC-65 | minor | FIXED — "V06's `streets.abandonAfterYears` (V06 §2.2)" | V11 §3.18 |
| SCC-66 | minor | FIXED — T-V11-21 admits the off form's values (`bulkyWater`, `perishableShort` 1); T-V11-18 compares with the reference arm under V11 §3.7.4's web off form by `servedShare` with `unit: 'district'` (V12's 105 (k) row); T-V11-13 runs over the classes whose coverage unit is not `settlement` (V12 §2.7) | T-V11-13, T-V11-18, T-V11-21 |
| SCC-67 | minor | FIXED — `terrace.enabled` is a switch, `calibratable: false`, as V11 §3.7.4's two; T-V11-37 refuses any calibratable switch | V11 §3.24.1, T-V11-37, J-V11.75, X-V11-12 (V12's line to drop: SCC-68 (a), V12's lane) |
| SCC-72 | minor | FIXED — V11 §8 names, per non-g column family, the method, due milestone, metric and pre-decided fallback of its register entries (roster columns by the use mix and `pop.perBuilding`; `detourFactor` by the base's T16-4; template budgets by `bldg.area`, `plot.area`, `bldg.quadSide`; `undergroundAccess.prob` by the V4-U5 panel; district kinds and identities by MFCG's anchors; `heights` and the rest `corpus` at M-CAL by `frame.<table>.<column>`) | §8, J-V11.76, X-V11-12 |

**Also in this round.** Decisions J-V11.73 – J-V11.76; the wiring row W68; the V11 §2.10 lifecycle row for the preset entries;
X-V11-12's round-3 clause; the round-3 paragraph of §12.

**Other volumes' halves.** None edited. V12's own round-3 lane carries SCC-68 (a) (drop §3.11's `terrace` `enabled` line)
and SCC-56 (the `bar.<id>` and `frame.<table>.<column>` metric families V11 §8 now reads), handed over by a lane-events
note; V07 already states SR2-05's rule (§2.4, BCR-V7-36 (a)) and V08 SR2-06's (V11 §3.5.1 (b)); V02's BCR-V2-14 and file f
item 376 already carry the FM scope V11 §2.2 checks.

