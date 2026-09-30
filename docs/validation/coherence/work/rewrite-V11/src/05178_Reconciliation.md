## Reconciliation round 4 (volumes/reconcile-V11-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 4 seam issues this volume owns in `docs/volumes/critique/seam-settlements-r3.md` (SR3-*)
and `docs/volumes/critique/seam-content-calibration-r3.md` (SCC-*): 0 blockers, 2 majors, 2 minors — **4 FIXED, 0
INVALID, 0 on the fix list**. The pre-round text is kept at `scratchpad/volumes/rcV11r4/V11-pre-reconcile-r4.md` (md5
3679161b…). What changed, by issue:

| id | severity | disposition | where |
|---|---|---|---|
| SCC-75 | major | FIXED (the registration's form differs from the finding's suggestion; vetoable) — V11 §8: the two metric families are V12's (V12 §2.1; J-V12.65); the seat landing C1 registers the base's T16-4 as a `BenchBarDef` (`owner` `'base'`, B-CITY, `stages` `['S10b']`, `tier` `'milestone'`, unit `ratio`) with the `detourFactor` entry; the seat landing C2 registers T-V11-30 as a `BenchBarDef` (`owner` `'V11'`; the count of plots whose band moves by two or more between `w_sun` 0.02 and the field recomputed with `w_sun` 0; `stages` `['S6', 'S10']`) with V12's item-102 entry — a `BenchBarDef`, not SCC-75's `paired` `StatBarSpec`, because V12 §2.7b's `paired` rule measures a ruin's plan against the town above and cannot state a two-arm band count, while V12 §2.1's `BenchBarDef` already names both ids | §8, W69, X-V11-12, J-V11.76's tail, J-V11.78 |
| SCC-77 | major | FIXED — under `VG` a `presets.VG` entry is required only on the `presetsRequired` cells of the village-read tables (`readers` meeting the stage set `ProductDecl('village')` registers, conditional registrations included, committed as the source manifest's `productStages.village` and held equal to the declaration by T-V11-9); a missing entry names every such cell at once; a `VG` entry elsewhere stops the build; the off-form check under `VG` and the loader's preset step cover the village-read tables only; the manifest carries `villageRead` per table and `villagePresetCells`, against which V07 §3.15's list is checked; V11 §8: the seat landing V-M0 writes those entries from V07 §3.15's list; BCR-V11-31 narrows §7.6's categorical-option sentence to match | §2.1 `presetsRequired`, §2.10, §3.1 row 73, §3.2.1 steps 1, 4, 7, §3.2.2, §8, T-V11-9, T-V11-21, W70, BCR-V11-31, X-V11-2, X-V11-12, J-V11.77 |
| SR3-03 | minor | FIXED — the sentence under §3.21.1's table: at the `territory` rungs S2 reads the `villageSeat` column alone; the seat class, the offices' seat classes and the guard posts (with the barracks column) are the base rungs' (V07 §3.2 (3); BCR-V7-36 (c); SR3-01); W63's consumer adds S2's government step at the territory rungs | §3.21.1, W63, X-V11-2 |
| SR3-07 | minor | FIXED on SCC-79's side (V-M0; vetoable) — every place names the milestone by its content: "V07's V-M0, the milestone whose content ships the `VG` preset file (V07 §8 as SCC-79 sets it)"; SR3-07's V-M1 reading declined, because V-M0's exit already runs under `VG` and SCC-79, V07's major of the same round, moves the file there — V07's round-4 lane does so (its J-V7.120), so the two volumes agree | W68, §2.1, registry row 73, §3.2.1 step 4, §8, J-V11.74, the round-3 note (history kept), J-V11.79, X-V11-2 |

**Also in this round.** Wiring rows W69 and W70; the §2.10 lifecycle row for the village-read scope; decisions J-V11.77 –
J-V11.79; BCR-V11-31; the round-4 paragraph of §12; the §13 preamble.

**Other volumes' halves.** None edited. V07 (its round-4 lane open): handed over by a lane-events note at 07:20 — the `VG`
preset file and V11's five entries in V-M0's row (SR3-08 with SCC-79), V07 §3.15's list of the village-read
`presetsRequired` cells, `productStages.village`; its open text already carries them (W67, §3.15, J-V7.120), and SR3-01's
V07 text is its own. V12: no edit — V12 §2.1's `BenchBarDef` already names both bar ids and X-V12-15 is answered by V11
§8. File f: BCR-V11-31 is new and not yet carried; handed to the next BASE-F round by a lane-events note.

**Document checks** (`docs/validation/bench/doc_checks.py --doc docs/volumes/V11-content.md --heads docs/ARCHITECTURE.md`),
before → after: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0; C3 244 → 251 (the new hits digit runs of section and
line numbers, the round's stand-in lines and ordinary phrasing — "every one of a village", "is the only difference
between the", "s list of the village"; none a list, grammar or table) and S2 274 → 299 (this volume's own §2.10 and §3.11
pointers and V07's §3.0 and §3.15, V12's §3.11, which the base's headings do not hold).

