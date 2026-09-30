## Reconciliation round 4 (volumes/reconcile-V07-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r4; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against its eleven round-3 seam issues (`docs/volumes/critique/seam-time-r3.md`
TU-04; `docs/volumes/critique/seam-settlements-r3.md` SR3-01;
`docs/volumes/critique/seam-content-calibration-r3.md` SCC-78): 0 blockers, 5 majors, 6 minors, all
**fixed**, none invalid, none on the Fix list. Decisions J-V7.116 – J-V7.121 (vetoable); J-V7.112 amended. What changed,
by issue:

| issue | severity | what changed (where) |
|---|---|---|
| TU-04 | major | V07 §3.12 gains *Markets, halls and the fair over epochs* (J-V7.116): (a) a `fair_ground` member arriving at a village epoch is laid by V07 §3.6 (4b)'s placement in the batch of the phase that brings it, over hinterland faces turned `commons` by `retypeLand`, with F-V-FAIR's ladder, never by the base's S7b (3) claim; a removed record tombstones the reservation, its faces staying `commons`; (b) a hall with a `nearMarket` row takes V07 §3.6 (4a)'s rim claim without growing the space, counted against `epoch.encroachShareMax`, then joined vacant rim plots by S10 (7)'s join law, a dossier hall beyond the share as the last rung (`W_ENCROACH_OVER_CAP`); (c) a `cloister`-family member (and a hall without a `nearMarket` row) opens by V06 §3.9.6 over plots joined up to `rules.claimArea`, else an outside plot at the edge — V06 §3.9.6's reading of `rules.claimArea` is V06's hand-off row (V07 §1 (10)); (d) a dossier market record or the market law crossing (V07 §3.6 (4)'s one keyed draw, now stated) sets the principal market rank by `setAttr`, a street market at the heart where no open space stands; (e) (8v)'s perimeter re-derivation cuts the fair field out as a hole; (f) the hand-off up keeps it as a standing secondary market (step 4). V07 §2.6's row gains the epoch create path and its undo; V07 §3.6 (4b), V07 §3.13's F-V-FAIR row, W12, W65, W66, V-M3's content and exit; T-V7-13's village-history clause (at V-M3). |
| SR3-01 | major | V07 §3.2 (3) gains *The government step at village rungs* (J-V7.117): at territory rungs S2 reads the government row's `villageSeat` alone — forced for a dossier government or an `@seat` record, a request government feeding only the `gov` presence conditions — and neither its seat class, its offices' seat classes nor its military share; `@office` binds to the `villageSeat` member's building, a religious office to the parish church; a `guard_post` member only from a town-watch record or the watchtower's presence row. V07 §3.0's note; V07 §3.11 step 1's `@seat` and `@office`; W18; file f item 576 retitled "a class's presence entries, the context readings and the government step at village rungs" with part (c) — its heading §10.2's (the sentence stands there, l. 11546; §4.2 S2 only cites it), not §4.2 as the seam text had it; T-V7-13's crown, seigneurial, ecclesiastical and chartered-commune fixtures at VILLAGE. |
| SR3-02 | major | V07 §3.0 and V07 §3.10: at territory rungs S11's furniture step places no pin, VS8's rows being the village's whole furniture (the open space only VS8's centrepiece and stalls, the fair field none, no statue, fountain, bandstand or monument); the light rows run unchanged (J-V7.118). file f item 579 on §4.7's *Furniture pins*, quoting "The main plaza always gets one centrepiece" once (the id file f item 579 carries); W25; T-V7-13's "0 pins on it"; the new bar T-V7-57 (V-M1, its fair-field clause at V-M2). |
| SCC-78 | major | V07 §2.2a's cell `rules.race.densityPower` (none, [0.5, 3], default 1 at every rung, `own`), read by V07 §3.8's race key (`density^p`); its `presets.VG` entry the volume's one measured-rate `VG` entry, provisional 1, register entry `cal.village.*.rules.race.densityPower@VG` (V07 §3.15: target the column form over the three rung rows, as V12 §2.6's id grammar and target types require — the seam text's `cal.village.*.race.densityPower@VG` with `target.cell` read so; metric `vg.acceptedShare`, now named in V07 §7's parity metrics and T-V7-23; method `tune`; fallback `not-achieved`, reported); V-M4's row names the one run, only on a miss; V07 §3.15 states every other `VG` entry code-read or `fixed:`, moved by no run; risk (2); W44, W68; J-V7.119. |
| SCC-79 | major | V-M0's row ships the `VG` preset file (file f item 377): V07 §3.15's `VG` column and switches, V11's five entries by V11 §2.2's rule, and the `presets.VG` entry of every village-read `presetsRequired` cell of another table, with V11 §3.2.1 step 4 green at its exit; V-M1's row reads "the `VG` request mapping"; V07 §3.15's *The preset file and its entries*: no `village.json` column `presetsRequired`, `cut.bendMode`'s `VG` entry `straightFirst` (the `MFCG` value, `own`, `fixed:`), the rule for any other manifest cell; W67; J-V7.120; V-M0 1.25–1.75 pw, V-M1 8.75–10.75 pw, the total unchanged. |
| SR3-04 | minor | V07 §1 (9) reads "all landed", V11 §3.12's range row added, the pending sentence and its fallback deleted; V07 §12's round-2 row reads "(all landed since, V07 §1 (9))". |
| SR3-06 | minor | V07 §3.6 (4a)'s rim claim only for a `market-hall`-family class with a `nearMarket` row (today `market_hall`); a `slave_market` joins slots up to `A_h` sited by its own rows; V07 §3.8's race and VS6's estimate; W65; J-V7.112 amended; T-V7-13's coastal `slave_market` fixture. |
| SR3-08 | minor | V07 §3.15 cites V11's five `presets.VG` entries beside `web.off`; the builder meets them in V-M0's row rather than V-M1's, since the preset file ships at V-M0 (J-V7.120) — the defect (a V07 builder never meeting them) closed at the milestone the file ships with. |
| SR3-09 | minor | V07 §3.0's VS4 row: `roster` also for "the `market-hall`-family members with a `nearMarket` row for the halls' claims, V07 §3.6 (4a)". |
| SR3-10 | minor | "member class" in V07 §2.4's range prose (with "V11 §3.12's *member class* column, played at a village rung through its village form; item 108 (b)'s 'lesser class'" once), the range table's column head and V07 §3.11 DR9; V07 §2.2a's range field renamed `lesser` → `member` (V08 and V11 use `lesser` for the subsumed kinds). |
| SCC-87 | minor | V07 §2.2: the switch and mode cells — `terrace.enabled`, `vg.emptyRoadPrune`, `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode`, and in passing `plate.qualifier` and the `epoch.rows` op, class-list and order cells — and every reference cell carry `calibratable: false`; T-V7-44's compile clause; J-V7.121. |

Also in this round: V07 §1's dependency (10) lists the round-4 companions with their fallbacks (V06's §3.9.6 reading of
`rules.claimArea`; V11's SR3-03 sentence and SCC-77 scope, SR3-07 moot; V12's SCC-80 pointer; file f item 576 (c)'s
heading); V07 §10's preamble records the round's quotes; V07 §12 records the reads and readings; V07 §13's note. Hand-offs by
lane-events notes (V06, V11, V12, BASE-F), never edits in their files.
Checks: every table's column count by script (0 rows off their header's count); every `v.` id used is one of the 25
rows; the J-V7 (121), T-V7 (57), W (68) and BCR-V7 (38) ids unique; doc_checks against the pre-round copy — C1, C2, S1 0;
C4 two new unreviewed lines of common institution and landscape nouns (T-V7-13's row, V07 §3.12's new paragraph), no list
copied; S2 19 new pointers, all to the base's sections (§4.6, §4.7, §4.9, §4.11, §7.6, §7.7, §10.2) or V11 §3.22, none
unresolvable; 23 new unreviewed C3 runs, all number runs from section and table numbers or generic phrases (none from the
reference corpus's content); the quotes of file f item 576 (c) and file f item 579 each once in the base (receipt
`scratchpad/volumes/rcV7r4/quotes.out`).

*After LANDED (same lane, 07:34):* volume 6's round 4 (its 07:33 note) and volume 11's round 4 (LANDED 07:32) applied
their companions: V07 §1's dependency (10) marks V06's *Claim-sized classes at a village rung* (J-V6.119) and V11's SR3-03
sentence, SCC-77 scope and SR3-07 resolution (J-V11.79) landed, the V06 fallback withdrawn; V07 §3.15 names V11's manifest
fields (`productStages.village`, `villageRead`, `villagePresetCells`, T-V11-9's equality) and V-M0's row gains the
`productStages.village` commit V11 §3.2.1 step 1 asks of that seat. V12's and file f's rows stay pending with their
fallbacks.

