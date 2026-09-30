## Reconciliation round 3 — continuation (volumes/reconcile-V07-r3, re-issued brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r3; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with a wider issue set than its 06:21 landing covered. The issues of that landing
(eleven, which the round-3 note above counts as ten) are
history: fixed as that note records, each anchor verified present in the live text by grep, nothing redone. The three
added since — raised at 10:10 by `docs/volumes/critique/seam-content-calibration-r2.md` §7.2 — reached no landed lane and
are fixed here: 0 blockers, 1 major, 2 minors, all **fixed**, none invalid, none on the Fix list. Decisions J-V7.122 –
J-V7.124 (vetoable). What changed, by issue:

| issue | severity | what changed (where) |
|---|---|---|
| SCC-R2C-3 | major | `village.plan` registers `stage: 'VS1'` (it re-runs VS1's plan read) and `village.density` `stage: 'VS2'` (VS2's density raster on the old core's recorded inputs); their draws key by those stages on their own concerns and their table reads are VS1's and VS2's (V11 §3.1 row 61): V07 §2.1's `participants` comment, V07 §3.12's *Which path runs* (a sentence *The participants' stages*) and the hand-up's step 2, V07 §3.14, W28, T-V7-14's clause; J-V7.122 — agreeing with V06 §2.1, V07 §3.16 and X43 (reconcile-V06-r3's continuation, LANDED 10:31). |
| SCC-R2C-12 | minor | V07 §3.15 (3): the `presets.VG` entries of the village-read `presetsRequired` cells are written by the seat landing V-M0 for the cells then compiled, and afterwards by the seat landing any change that makes a table village-read (V-M2u's registration of V04's tail) or adds a `presetsRequired` column to a village-read table, by the same rule and in that change; W67's producer; V-M2u's row carries `productStages.village`'s new ids, those entries and the preset check with T-V11-9's equality; V07 §1's dependency (11) records V11's one-clause half pending with its fallback, handed to reconcile-V11-r3 by a lane-events note (no edit in V11); J-V7.123. |
| SCC-R2C-16 | minor | every V07 §8 exit cell (V-M0, V-M1, V-M2, V-M2u, V-M3, V-M4) carries "`plat calibrate register --check` green over the cells it lands"; V07 §8's new paragraph *The register at the exits* states the finding's clause, the landing rule and a table by milestone — `village.json` whole at V-M0 (the named `…@VG` entry first, the default line for every other calibratable column), the `presence` column at V-M2 by the default line, no other milestone landing a column; no register line of its own and no `BenchBarDef` (J-V7.124); V-M0's and V-M1's content cells; W69; V07 §2.6's register row; V07 §12's two "measured at V-M2" readings restated as acceptance bars whose cells keep their columns' register entries. |

Also in passing: V07 §1's dependency (10) marks V12's SCC-80 companion landed (V12 §3.7.1 (c)) and withdraws its fallback.
V07 §12 records the reads and readings; V07 §13's note. Estimates unchanged (26.5–36.5 pw).
Checks: every table's column count by script (27 tables with this note's, 0 rows off their header's count); the J-V7
(124), W (69), T-V7 (57) and BCR-V7 (38) ids unique; doc_checks with the base's headings against the pre-continuation
copy (`scratchpad/volumes/rcV7r3c/V07-pre-r3c.md`) — C1, C2, S1 0; C4 unchanged (7 hits, 5 unreviewed); C3 + 11
unreviewed, all generic phrases or digit runs (the banner phrases, "at the end of this file", "table by the same rule",
"line of its own and", runs of section, milestone and dependency numbers), none from the reference corpus; S2 + 46, all
pointers to this volume's own V07 §3.11 – V07 §3.16 or to V06 §3.16, V11 §3.1 – §3.2.1, V12 §2.6 – §4.2 and the critique's §7.0,
none meant as a base section; the diff against the copy holds this lane's hunks only. No base text is quoted anew, so
V07 §10's quotes are unchanged.

