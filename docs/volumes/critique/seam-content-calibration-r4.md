# Seam check, round 4: content (V11) and calibration (V12), with V02 and V06 as readers

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r4; covered by the whole-design retrovalidation (J84).

PROGRESS (kill-safe; one line per section: planned | done)
- §0 Inputs and method | done
- §1 Re-check of round 3 (SCC-73 – SCC-87, SCC-R3C-1 – SCC-R3C-15) and of SCC-R0C-1 – SCC-R0C-5 | done
- §2 New findings (SCC-88 onward) | done
- §3 Table and calibration census, round 4 | done
- §4 Disposition by owning volume | done
- §5 CONFIRMED versus PLAUSIBLE | done

## 0 Inputs and method

**Why this lane ran now.** A skeleton of this file was written at 07:42 and cut before any section. Under the CONTINUE
rule this lane resumed at 12:00. Since 07:42, round 3 gained a continuation (`seam-content-calibration-r3.md` §6,
SCC-R3C-1 – SCC-R3C-15, landed 11:19), and every round-4 reconcile lane landed a continuation (V02 11:30, V04 11:35, V07
11:38, V06 11:39, V03 11:41, BASE-F 11:44, V09 11:48, V01 11:50, V10 11:53, V11 11:54, V08 11:54, V12 11:59). So round
3's "previous round" is now the whole r3 file: SCC-73 – SCC-87 and SCC-R3C-1 – SCC-R3C-15. The five findings the round-0
continuation routed to this lane at 08:28 (SCC-R0C-1 – SCC-R0C-5) are re-checked too.

**Inputs** (md5, lines; snapshots in `scratchpad/volumes/sccr4/now/`): V11 04fb8f43… (4 904), V12 b7467d91… (3 257), V02
34f5b1f5… (4 774), V06 ba61b240… (4 354), `_integrate` 965ab696… (468, unchanged since round 3), file f 0da3c86c…
(1 616), file g 8df8841b… (unchanged), base 01fea21f… (unchanged since round 0). Also read where the seam reaches them:
V01 cbbfe6e8… (4 241), V03 735035b5… (3 587), V04 87f5ce61… (4 012), V05 a60dbcc9… (3 649, unchanged), V07 a2279e33…
(4 090), V08 bb42f20b… (3 681), V09 f16fc374… (4 597), V10 0edd1635… (3 718). No lane that edits these files was open
when this lane started. The last to land was reconcile-V12-r4, at 11:59.

**What was read, and how.** Round 3's continuation inputs exist as verified snapshots (`sccr3c/now/`). Each matches by md5
the backup its round-4 reconciler recorded: V11 cd7e6c42, V12 013d6f78, V02 0c432111, V06 c1499809, V07 bb68ff1b, V08
594909a3, V01 925e51b5 and file f b4546425. So every line changed since round 3 is in one of the diffs in
`sccr4/diff/`, which total about 2 400 lines.
* **Read whole** (the seam's core and the volumes whose repairs it received): V11 (269 diff lines), V12 (347), V02 (100),
  V06 (103), file f (168), V01 (439) and V07 (88).
* **Read by seam-term grep, then at source wherever a hit touched a table, a preset or the register:** V03 (322), V04
  (214), V08 (129), V09 (121) and V10 (107).
* **Unchanged:** V05 and `_integrate` (0 diff lines).

The current text was then re-read at source for:
* **V12:** §2.6's `CalibrationEntry` (method, due, history), §2.9's `CorpusRunId`, §3.10.1, the whole of §3.11 (the default
  line, *The due's corpus run*, *Milestone exits*, the lint and status rules), X-V12-15 to X-V12-17, J-V12.10, J-V12.75
  and J-V12.76.
* **V11:** §2.1 (`ColumnSpec`, `TotalityRule`, `TableSchema.readers`), §2.2's preset resolution; registry rows 17, 24,
  38, 39, 46, 60–62, 73, 80 and 90–91 with the count; §3.2.1 step 4 and §3.2.2; §8's preset and reader paragraphs;
  BCR-V11-31 and X-V11-16.
* **V01:** V1-2.2's `HoodSettings`, V1-3.7.3, the V1-3.14 constants and column tables, V1-3.15, V1-8.1's register
  paragraph, J-V1.97 – J-V1.99, BCR-6, BCR-46 and notes (32) – (35).
* **V03:** §2.4's register lines, A3, and §8's PE – P6 rows.
* **V07:** §3.0's stage set, §3.15, and §8's register paragraph and table.
* **Others:** V06 §3.2's `field` row and X38; V05 §13 item 29 with l. 2698 – 2707 and l. 3372 – 3377; V04's engine table
  (§1.1).
* **File f:** items 207, 224, 291, 301, 369, 376, 426, 444, 497, 505, 510, 540, 575, 581, 584 and 585.
* **The base:** §4.4's S5b (l. 4442) and S6 (l. 8257).

**Scripts** (`scratchpad/volumes/sccr4/scripts/`, outputs beside them):
* `tcensus.py` (round 3's, on the current files): 62 table names used in a table phrase. The 9 without a registry row are
  V12's harness files (`answers`, `baselines`, `canvas`, `evidence`, `frames`, `metrics`, `seeds`, `transcript`) and V02's
  `plat.ext`, an export extension. No content table is missing; `way.surface` and `squares.quota` are now rows 90–91.
* `cites.py` (round 3's, over the twelve new diffs): 587 cross-volume section citations in added lines, 0 missing; 799
  cross-cited T-, J-, X- and BCR- ids, 0 suspect.
* **A registry reader scan:** every StageId in V11 §3.1's `readers` cells, set against V06's `EVO_*` ids, V04's engines
  and V07's village stage set.
* **Greps:** `register --defaults` without `--milestone`, per volume (V01 4, V03 3, V04 1, V05 6, V07 2; V12's own nine
  carry the flag); preset unions spelled out without `'NG'` (only V11's `ext.over`, which BCR-46 makes correct, and
  historical notes); `hood.constants` rows versus the settings row; "NG column"; `presetsRequired` and `presets.VG` in
  V01 – V04.

**Method.**
1. Each of round 3's 30 findings, and the five SCC-R0C findings, was re-checked in its owner's live text and at every
   volume its required change names (§1).
2. The repair surface was swept (the diffs), then the whole seam by the scripts and the reader scan (§2, §3).
3. New findings start at **SCC-88**. Round 3's continuation reserved that number for this round (JC3C-2).
4. Severity follows round 3: **blocker** means the seam cannot be built; **major** means a contradiction or an unwired
   piece that a builder would hit; **minor** means wording, a stale pointer, or a restatement whose values agree.

**Decisions of this lane (vetoable).**
* **JC4-1:** Continued the 07:42 skeleton under the CONTINUE rule, widened to the whole round-3 file, rather than
  re-checking SCC-73 – SCC-87 alone as the skeleton's STARTED line planned. The brief's "previous round" now holds the r3
  continuation too, and its fifteen findings reached their reconcilers after the skeleton was cut.
* **JC4-2:** Re-checked SCC-R0C-1 – SCC-R0C-5. They were routed here at 08:28, and reconcile-V02-r1 and reconcile-BASE-F-r1
  applied them later that morning. This check confirms them in the live text rather than taking the lanes' word for it.
* **JC4-3:** Raised defects outside the four core volumes (V01, V03, V05, file f) wherever they reach the registry, the
  preset vocabulary or the register, each under its own owner (as JC2-3 and JC3C-4 did).
* **JC4-4:** Assigned the value-move gap (SCC-90) to V12, not V01. The register's writers and checks are V12's, and the gap
  is general: any seat that moves a cell outside a run meets it. V01's pointer to it is SCC-92.

## 1 Re-check of round 3's issues (and SCC-R0C-1 – SCC-R0C-5)

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-73 | V06 | FIXED | V6 §8 l. 3325 (each `bar.T-V6-<n>` registered as a V12 `BenchBarDef` by the seat landing its line's exit, in the same change); W80 l. 463; J-V6.117; X38 l. 4059 reads "landed … V06 owes the registrations … X-V12-15 answered" |
| SCC-74 | V02 | FIXED | V2 §3.10.10's *The bars' registrations* l. 1969, with its eleven-row table; X33 l. 4436 "landed", fallback "none" |
| SCC-75 | V11 | FIXED | V11 §8 l. 3864–3872 (C1 registers the base's T16-4 with `owner` `'base'`; C2 registers T-V11-30); W69 l. 290; the `detourFactor` row l. 3879 |
| SCC-76 | V12 | FIXED | V12 §3.11 l. 1963–1964 (the items 103–107 and item-106 lines end "and every other calibratable column …"); the catch-all rule l. 1975; T-V12-20's clause |
| SCC-77 | V11 | FIXED (amended by SCC-R3C-15, below) | V11 §2.1's `presetsRequired` l. 321; §3.2.1 step 4 l. 927–946; J-V11.77 with its amendment |
| SCC-78 | V07 | FIXED | V07 §2.2a `rules.race.densityPower`; §3.15 l. 2593–2603 (the one measured-rate `VG` entry, `tune` at V-M4); §8's V-M4 row l. 3110 |
| SCC-79 | V07 | FIXED | V07 §8's V-M0 row l. 3105 (the `VG` preset file with V11's five entries and the village-read `presetsRequired` cells); §3.15 (3) l. 2576–2592 |
| SCC-80 | V12 | FIXED | V12 l. 1521 and 3156 ("V07's one measured-rate `VG` entry, `rules.race.densityPower@VG`"); J-V12.11 |
| SCC-81 | V12 | FIXED | V12 §3.11 l. 2007 (the stepped line: owner V11 only, "V02's stepped compositions … take V2 §3.10.10's stepped line, never this one") |
| SCC-82 | V12 | FIXED | V12 §2.6's `method` comment l. 622–628 (`'tune'` defined, with V07's conditional run) |
| SCC-83 | V12 | FIXED | V12 §3.11's *Milestone exits* l. 2044–2049 (a `frame.*` metric is read only at a corpus stage) |
| SCC-84 | V06 | FIXED | V6 l. 2638 and 2761–2763 cite V11 §3.18's cells without numbers; §2.2 l. 648–649 |
| SCC-85 | V02 | FIXED | V2 l. 1070, l. 1939, J-V2.38 (`sunBias` 0.5 under `MFCG`, `FTG`, `VG` and `FM`, the `VG` entry `own`/`fixed`). Registry row 39's reader S11 lies in V07's village set, so `composition` is village-read and V11 §3.2.1 step 4 admits the `VG` entry |
| SCC-86 | BASE-F | FIXED | file f item 575 l. 171 (each run's `id` and `run`, *Needed by* V12); item 291 l. 281 (*Needed by* V04, V06, V11, V12) |
| SCC-87 | V07 | FIXED | V07 §2.2 l. 588–590 (switch and mode cells `calibratable: false`, J-V7.121); T-V7-44's compile clause refuses a calibratable switch |
| SCC-R3C-1 | V12 | FIXED; **residues:** SCC-93 (the `--milestone` flag and V03's P-steps) and SCC-94 (V05's item 29 still reads open) | V12 §2.6's `due` and `method` comments l. 629–632; §2.9's `CorpusRunId` l. 809–814; §3.10.1 l. 1749–1762; the default line l. 1912–1916; *The due's corpus run* l. 1933–1949; the lint l. 2026–2029; T-V12-20's clause; X-V12-17; J-V12.75 |
| SCC-R3C-2 | V11 | FIXED | V11 §2.2's `PresetId` l. 365–367 and source cell l. 370–371; §2.2's `NG` resolution l. 381–387; row 73 l. 863; §3.2.1 step 4 l. 927–946; §3.2.2 l. 975–980; §8 l. 3887 and 3904–3908; T-V11-0; T-V11-9; W75; J-V11.88. The same as V01's statement |
| SCC-R3C-3 | V01 | FIXED | V1-3.15 l. 2239–2287 (kind, resolution, where the entries stand, the stage-2 switch, scope, provenance and the register); V1 §2.2 l. 476–483; the column table l. 2202–2237; BCR-46 (§10); J-V1.98; file f item 584 |
| SCC-R3C-4 | V11 | FIXED; **residue:** SCC-95 (row 90's epoch reader, which no phase implements) | V11 rows 90–91 l. 880–881; the count l. 883–887; T-V11-1 (a); §8 l. 3919–3925; W76; J-V11.89 |
| SCC-R3C-5 | BASE-F | FIXED; **residue:** SCC-89 (item 505 lags V01's own later revision) | file f items 207, 210, 272, 280, 300, 301, 323, 340, 345 and 444, each with its *Build* note and split label; item 505's note; item 584 (V01 BCR-46) |
| SCC-R3C-6 | V12 | FIXED | V12 §2.1 l. 391–393; §2.5 l. 583; §2.6 l. 612–618; §3.5 step 3 l. 1223–1224; §3.7.2 (3) l. 1547–1548; §3.9.1's M5 row l. 1677; T-V12-9; T-V12-24; BCR-V12-2's union l. 2573; file f item 497 |
| SCC-R3C-7 | V11 | FIXED; **the same class found by this round's sweep on row 80:** SCC-96 | row 38 l. 827; row 62 l. 852 (`fabric.select` dropped); §8's writer rule l. 3919–3923; J-V11.90 |
| SCC-R3C-8 | V03 | FIXED in intent; **residue:** SCC-91 (one column split between two register lines) | V03 §2.4 l. 938–960; l. 742 and 1140; §8's PE and P6 rows; BCR-V3-33 (file f item 585); J-V3.123 |
| SCC-R3C-9 | V01 | FIXED; **residues:** SCC-89 (file f), SCC-90 (values moved after entries written at M1), SCC-92 (V1-8.1's M3a list and pointer), SCC-97 (`coversEnum`) | (a) V1 §2.2's `HoodSettings` l. 539–546; the V1-3.14 column table l. 2192–2237; J-V1.99. (b) V1-8.1 l. 3002–3004 (owner `base` by J-V12.73) |
| SCC-R3C-10 | BASE-F | FIXED | file f item 510 l. 878 (`customWeights` after `materials`, J-V8.108) |
| SCC-R3C-11 | V08 | FIXED | V08 §13 X19 **CLOSED** (V11 §3.24.2, row 63); §12's paragraph *Added by reconciliation round 4's continuation* |
| SCC-R3C-12 | V12 | FIXED | V12 X-V12-16 marked met l. 2891–2907 (names each volume's paragraph; T-V4-62 dropped); X-V12-15's V02 clause l. 2887–2889 |
| SCC-R3C-13 | V04 | FIXED | V4 §8's *The register at each exit* ("first ships its rows (holds a compiled cell; V11 §2.1's empty-table rule)"; the due steps read "the default line's due — V12 §3.11: M-CAL, or the underground's later corpus run …"); §1b.1; J-V4.117 |
| SCC-R3C-14 | V07 | FIXED | V07 §8 l. 3117–3124 and the table header l. 3132; V-M1's cells; §1 (11) l. 344–348 (landed, fallback withdrawn) |
| SCC-R3C-15 | V11 | FIXED in V11; **residue:** SCC-88 (file f item 581 still carries the withdrawn reading) | V11 §2.1's `presetsRequired`; §2.2 l. 381–387; step 4; §3.2.2 l. 975–980; T-V11-9; BCR-V11-31 l. 4285–4298 (amended); J-V11.77 amended; J-V11.91 |
| SCC-R0C-1 | BASE-F | FIXED | file f items 224 (l. 120) and 426 (l. 651): **BASE (M3a)**, with items 228, 229 and 230 |
| SCC-R0C-2 | V02 | FIXED | BCR-V2-09 l. 3685 and BCR-V2-23 l. 3835 carry "(from M3a, with BCR-V2-39)"; V2 §8.5's M3a-V2 cell |
| SCC-R0C-3 | V02 | FIXED | `sizeBandLo` and `sizeBandHi` are fixed mirrors: V2 l. 1259–1260, the §3.10.9 row l. 1942, the no-entry row l. 2005; J-V2.35 |
| SCC-R0C-4 | V02 | FIXED | J-V2.3 (`hipInset` "under `FM` the measured-rate entry of V2 §3.10.8"); J-V2.34 ("35") |
| SCC-R0C-5 | V02 | FIXED | BCR-V2-19's bullet l. 3795: T-V2-1 – T-V2-53, with its milestone clause |

**All 35 re-checked issues are fixed in their owners' text.** Round 3 in all: 0 blocker, 12 major, 18 minor, all fixed.
Six of those repairs left a residue in a sibling text, raised in §2:
* SCC-R3C-15 → SCC-88
* SCC-R3C-5 and SCC-R3C-9 → SCC-89
* SCC-R3C-9 → SCC-90, SCC-92 and SCC-97
* SCC-R3C-8 → SCC-91
* SCC-R3C-1 → SCC-93 and SCC-94
* SCC-R3C-4 → SCC-95

SCC-96 is SCC-R3C-7's class, found on a row that finding did not name.

## 2 New findings (SCC-88 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-88 | major | BASE-F | base change request lagging its volume (BCR-V11-31 as amended) | V11's continuation amended BCR-V11-31 (V11 §10 l. 4285–4298; J-V11.91; SCC-R3C-15): under `VG` every table resolves by §7.6's order, with `VG` entries required only on the village-read tables and a categorical cell of any other table resolving to its `MFCG` entry — so a village's epochs read V06's tables at their parity values — and it withdrew the clause "and a village document's loader resolves no other table under `VG`". File f item 581 (l. 518) still summarises the round-4 reading: "§7.6's per-preset sentence names the tables each parity preset resolves (`MFCG` and `FTG` every table; `VG` only the tables a stage of the village product reads …)", its heading and *Needed by* (V07, V11, V12) unamended. V11's X-V11-16 (c) and its §10 note say item 581 "carries the amended text"; it does not — reconcile-BASE-F-r4 landed at 11:44, the minute V11's first note arrived, and V11's follow-up of 11:52 (the plainer wording) came after it. A V-M0 builder applying §7.6 from item 581 builds a loader that leaves every non-village-read table unresolved under `VG`, against V11 §3.2.2 — a village epoch under `VG` then reads V06's "0 in the parity presets" cells at their defaults. | Item 581's heading adds "; amended in V11's round-4 continuation (SCC-R3C-15; J-V11.91)"; its *Note* reads: "Applied with item 377 (BCR-V7-13), which it narrows, and before item 584 (V01's BCR-46): the text is BCR-V11-31's as V11 §10 now words it — a categorical `option` cell's entry is required for `MFCG` and `FTG` on every table and for `VG` on the tables a stage of the village product reads (volume 11 §3.2.1 step 4); under `VG` every other table resolves by §7.6's order, so an epoch at a village rung reads its tables at their parity values and a categorical cell of such a table resolves to its `MFCG` entry; the round-4 clause 'and a village document's loader resolves no other table under `VG`' is withdrawn"; *Needed by* adds V06 (its parity values, V6 §2.2); a J-RF row. |
| SCC-89 | major | BASE-F | base schedule lagging its volume (V01's early pieces after SCC-R3C-9) | File f item 505's *Build* note (l. 868) lists V01 BCR-1's early parts as V1-8.1 stood before V01's continuation (landed 11:50, after file f's 11:44): at M1 "`@plat/model`'s `HoodPlace`, `DistrictContext` and `TypedBoundary` … and `@plat/tables`' `hood.constants` with the naming context's four rows (item 444)"; at M3a "the two cells `terraceState` reads, `hood.constants`' `terrace.siteShare` and `hood.templates`' `stepped` row's `params.terraceSpacingM`". V01 now holds: `hood.constants` is one `settings` row whose columns are V1-3.14's column table, shipped **whole at M1**, every column at its default, every calibratable column taking its register entry at M1 (V1-8.1 l. 3000–3002; V1 §2.2's `HoodSettings`; J-V1.99); `terrace.siteShare` lands at M1, not M3a (V1-8.1 l. 3004–3006); and BCR-1's `@plat/model` list gains `WayNamingContext` "(from M1, S13a's naming input)", which V01's note (35) asks file f's BCR-1 item to carry. V11 row 62 agrees with V01 (one settings row). File f's "four rows" matches neither the settings form nor the whole-row landing, and the M1 schema lacks the type item 444 (BASE M1) conditions every way name on — the M1 seat would build a four-row `hood.constants` and write four entries where V01's M1 exit expects every calibratable column's. | Item 505's *Build* note: M1 reads "`@plat/model`'s `HoodPlace`, `DistrictContext`, `TypedBoundary` and `WayNamingContext` (S13a's naming input, item 444) with the `FabricStrategy` comment …, and `@plat/tables`' `hood.constants` — its one `settings` row shipped whole, every column of volume 1 V1-3.14's column table at its default, the naming context reading four of its columns (item 444), every calibratable column taking its register entry at M1 (volume 1 §8.1)"; M3a reads "… with `hood.templates`' `stepped` row, shipped whole, whose `params.terraceSpacingM` `terraceState` reads with `hood.constants`' `terrace.siteShare` (landed at M1)"; the label's parenthesis follows; a J-RF row. |
| SCC-90 | major | V12 | unwired writer (a value moved before its entry's due) | V01 now ships `hood.constants` whole at M1, every calibratable column taking its default-line entry there (`corpus`, due M-CAL; J-V1.99, V1-8.1), and `hood.templates`' columns take theirs at M3a with the `stepped` row (a compiled row holds every cell; `--defaults` writes every column holding a compiled cell, V12 §3.11). But V1-8.1 (l. 3011–3018) tunes the "calibrate at M5" and "measured at M5" constants "before M5's exit" — `land.spineFactor`, `land.ringSlack` (T-V1-12), `land.smallShare`, `terrace.askGain`, `terrace.siteShare` (T-V1-50), `ng.plazaM2` (T-V1-31's plaza share) and S7c's `select.*` weights (the stepped row's among them) — and says "a tuning that moves a value an earlier milestone landed … appends a history row to its one entry (V12 §2.6)". V12 names no such writer: its history rows come from `--defaults` (the first row), a milestone exit (only `measure` entries due there, l. 2041), runs (T-V12-12), panels, picks and M-1 records (§4.2 l. 2216) and a later named line's restatement; `--defaults` "never touches an existing entry"; J-V12.10 chose runs "over hand tuning"; and no check compares an entry's history with its column's compiled cells. So the M5 seat invents the row's writer, and the register's history — read by the tables editor (V09) and the clerk's provenance answer (V10) — can silently disagree with the shipped value. Before SCC-R3C-9's fix only `terrace.siteShare` was in this position; now at least nine columns are. (No golden moves: these cells have no reader before M5.) | V12 §3.11 adds, after *The due's corpus run*, **A value moved by its owning seat before its due** (SCC-90): "A seat may change the compiled cells of a calibratable column whose entry is `line: 'default'`, `provisional` and not yet due, outside any run, only while no golden holds a stage that reads the column — volume 1's M5 tunings of the `hood.constants` columns it ships at M1 and of `hood.templates`' columns entered at M3a (V1-8.1); a move that would shift a golden is a run (V12 §3.7). The change that moves it appends `{ date, value: the column's compiled cells by row key, milestone: <id> }` with `plat calibrate register --defaults --milestone <id>`, which, for an existing `line: 'default'` entry whose column's compiled cells differ from its last history row's `value`, appends that row — its only change to an existing entry (status, due, method, metric kept). `--check` fails a `line: 'default'` entry whose last history row's `value` differs from its column's compiled cells, naming the command." §4.2's command row and §2.11's `CalibrationEntry` row say so; T-V12-20 gains the clause (a fixture default entry whose column moves at a later milestone fails `--check` until the command appends the row, then passes with status and due unchanged); J-V12.10 gains "(runs; a value set before any reader lands is authoring, recorded by V12 §3.11's value row)"; a J-V12 row. |
| SCC-91 | major | V03 | one column split between two register lines | V03 §2.4's register table puts "every `RoomRoleRow`'s `area` triple but the `room` role's" on V03's own line (`measure` at V3-P6, `bar.T-V3-35`) and the `room` role's `area` triple on the PE row — "no line here: V12 §3.11's default line, its entries written by the seats landing M2b and M3a" (SCC-R3C-8's fix; l. 742, 1140; J-V3.123). V12 binds a column, not a row: the default line's entry is `cal.<table>.*.<column>` with `rows` absent (every row); a later named line "restates that one entry in place … never a second entry"; "a named entry beside a default entry for one column fails as two entries for one knob". The `room` row ships at M2b (§2.6's capacity reads its minimum), so M2b's `--defaults` writes `cal.roomProgram.*.area` over every row; at P1 the seat either restates it in place (V12's rule — the `room` row then sits on the P6 `measure` line, against V03's table) or writes a second entry with a `rows` glob excluding `room` (the lint fails; V12 defines no negated or complement glob). | V03 §2.4's first register row reads "every `RoomRoleRow`'s `area` triple — the `room` role's included, measured by T-V3-35 (i) at V3-P6 but never tuned there, since §2.6's capacity reads its minimum from M2b; the column's default entry, written at M2b, restated in place by this line at P1 (V12 §3.11's later-line rule)", its fallback cell adding "(the `room` row, never tuned, never moves)"; the PE row drops "the `room` role's `area` triple (its min §2.6's `minRoomCm2`)" and keeps the class rows' poorest-band `circulation` (a column wholly on the default line); A3's sentence (l. 1140), the class-row note (l. 742), §8's PE and P6 cells, J-V3.123 and BCR-V3-33's note follow ("the `room` role's area: V03's P6 line, measured, never tuned"). |
| SCC-92 | minor | V01 | the register paragraph after SCC-R3C-9 | V1-8.1's M3a cell names only "the `stepped` row's `params.terraceSpacingM` of `hood.templates`", but the row ships whole, so every calibratable column of `hood.templates` holds a compiled cell and takes its default entry at M3a (V12 §3.11; V11 §2.2) — the `select.*` weights W3 tunes at M5 among them; the M5 cell reads "every cell of the other `hood.*` tables", leaving `hood.templates`' other rows (rows a later milestone adds, needing no entry) unplaced; and the value-move sentence cites "V12 §2.6", which holds no such writer (SCC-90). | V1-8.1's M3a cell: "`hood.templates`' `stepped` row, whole — every calibratable column of `hood.templates` takes its entry here, `params.terraceSpacingM` the cell `terraceState` reads with `hood.constants`' `terrace.siteShare` (landed at M1)"; the M5 cell adds "and `hood.templates`' other rows (rows only; their columns' entries written at M3a)"; "(V12 §2.6)" → "(V12 §3.11's *A value moved by its owning seat before its due*; SCC-90)"; §1b's register row and W11 follow. |
| SCC-93 | minor | V12 | the new flag and its milestone ids | *The due's corpus run* makes the command `plat calibrate register --defaults --milestone <id>` and dates late columns by the landing milestone's id, but (a) V1-8.1, V03 §2.4, V4 §8, V5 §8 and V07 §8 cite `plat calibrate register --defaults` without the flag (grep: V01 4, V03 3, V04 1, V05 6, V07 2), and V12 states neither that the flag is required nor what the command does without it; (b) the table keys layers by bare step ids — "volume 4's steps U0 – U5", "volume 5's phases P0 – P6" — while V03's plan-rung steps are also "P0 – P6" (V3 §8) and fall to "any other milestone → `M-CAL/<that milestone's id>`", so each P-step would be its own later run (`M-CAL/P1` …), and a bare `P1` passed by a V03 or a V05 seat is ambiguous; V12 §2.8's milestone ids are volume-qualified (`V3-P6`, `V4-U5`, `V6-E7`). | *The due's corpus run* states that `--milestone` is required (the command refuses without it, naming the flag; each volume's short citation runs with it) and that the id is the landing milestone's in V12 §2.8's volume-qualified form (`M1`, `M2b`, `M3a-V2`, `V-M0`, `V3-P1`, `V4-U3b`, `V5-P2`, `V6-E2` …); the table's rows read "M6-U and `V4-U0` – `V4-U5`; `V-M2u`" → `M-CAL/under`, "M6-sky and `V5-P0` – `V5-P6`" → `M-CAL/sky`, "M6-E and `V6-E0` – `V6-E8`" → `M-CAL/evolution`, and a new row "M6-P and `V3-P0` – `V3-P6` (V3 §8; PE is built inside M2b and M3a)" → `M-CAL/M6-P`; X-V12-17 adds the clause for V01, V03, V04, V05 and V07 (no edit needed: their citation names the command); T-V12-20 adds "`--defaults` without `--milestone` refuses". |
| SCC-94 | minor | V05 | stale hand-off (SCC-R3C-1's V05 side) | V5 §13 item 29 (l. 3509–3513) still asks "Volume 12's reconciliation [to set] the default line's `due` for a column that first lands after M-CAL's first run … to the later corpus run"; V12 did so at 11:59 (`M-CAL/sky`; *The due's corpus run*, J-V12.75; X-V12-17 "V5 §13 item 29 is met"). V05 is unchanged since (md5 a60dbcc9), and its §8 register paragraph (l. 2706–2707) and §12 (l. 3377) still point at item 29 as pending. | V5 §13 item 29 marked **met**, citing V12 §3.11's *The due's corpus run* (`M-CAL/sky` for a P-phase column whose first cell lands after M-CAL's record; J-V12.75; X-V12-17); l. 2706–2707 read "… due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*)"; §12's l. 3377 sentence moves to CONFIRMED. |
| SCC-95 | minor | V06 | an epoch reader no phase implements (`way.surface`) | V1-3.7.3 (l. 1606–1607): "An epoch re-derives surfaces on ways whose fronting band changes past the hysteresis (§4.5)"; V11's new row 90 lists its epoch reader as "S6 (an epoch's field step re-bands, and the ways whose fronting band crossed the hysteresis take their surface again, V1-3.7.3, §4.5)". But V6 §3.2's `field` row (l. 997) reads only "the building shade mask written, then S6 re-evaluates the drivers, re-bands `fieldBand`, marks due blocks (base)"; no phase and no base change request runs the way-surface rule at an epoch (file f item 207 (a) runs it only "at S10a's end" at generation; V06 names a way's `surface` only in the landfall re-lay, EVO_DECLINE, l. 1261). After epochs a declined district keeps its paved lanes, and row 90's S6 reader is never exercised (T-V11-1 (b) only reports it). | V6 §3.2's `field` row reads "…, marks due blocks, and re-lays the `surface` of each way whose fronting band crossed the hysteresis by volume 1's way-surface rule (V1-3.7.3; an edited `surface` kept) (base; V01)"; V6 §3.4 states that write in the phase's batch as it states its other writes; a T-V6 clause on H-100 (a district declined two bands re-lays its lanes' surface; an edited surface stays). |
| SCC-96 | minor | V11 | incomplete readers (SCC-R3C-7's class, row 80) | Row 80 (`raisedWays`) lists S4 and S6 ("the base's raised-way generator"), EVO_RAISED, U-SYS, U-FADE and SKY. The base's S5b — the main-road step "at stages k ≥ 2 and every epoch stage" (§4.4 l. 4442) — runs S4's router incrementally (l. 4339), whose route solve prices a viaduct span (file f item 290 (1), (3)); V06 says so twice: "A new stage's own main roads (S5b) may take a viaduct from the base's raised-way solver" (V6 l. 1366–1367) and W58 "generation's S4 and S6 and a new stage's S5b (BCR-V6-25)". No registry row lists S5b (the reader scan: 0 rows); T-V11-1 (b) fails on the first walled city of two stages whose S5b routes over a drop. | Row 80's readers add "S5b (the main-road step at stages k ≥ 2 and every epoch stage, through S4's router, which prices viaduct spans; §4.4; BCR-V6-25; V6 §3.6)", with J-V11.90's pre-decided move: should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, the row lists EVO_GROWTH in that change; the same check for row 81 (`ways.crossing`, which lists "S5"). |
| SCC-97 | minor | V01 | a V11 mechanism misapplied | V1-3.14's column table (l. 2234) types `access.<kind>M` as "one column per symbol kind of V1-3.8.8, the compiler holding the set (a `coversEnum` totality, V11 §2.1)". V11's `TotalityRule` `coversEnum` (§2.1) promises that a column's values across a table's rows cover an enumeration; in the settings form `hood.constants` has one row and the kinds are columns, not row values, so no `coversEnum` rule can state or check this set. | The cell reads "twelve columns, one per symbol kind of V1-3.8.8 (listed in the default column); V1-3.8.8's kind list and these columns change together in one change", and T-V1-4's registry test adds "every access symbol kind has its `access.<kind>M` column" (or the sizes move to a small row table keyed by kind with a real `coversEnum` rule). |

## 3 Table and calibration census, round 4

**Tables read across the seam.** Every table that V12, V02, V06 and the other volumes read in V11's content system has a
row in V11 §3.1's registry, and every row lists its rows' home. `tcensus.py` found no content table without a row:
`way.surface` and `squares.quota`, missing at round 3, are rows 90–91. Changes since round 3:

| reader | table / cells | V11 home (registry row) | status |
|---|---|---|---|
| V01 (S10a; S7b, S2, S9b), V06 (EVO_DECLINE) | `way.surface`, `squares.quota` | rows 90–91 (SCC-R3C-4) | present. `squares.quota` has owner `base` and is BASE (M2b) by file f item 301. The epoch surface reader of row 90 has no phase behind it (SCC-95) |
| V01's rules, the `NG` harness | `hood.constants`, now one `settings` row with V1-3.14's column table | row 62 | present and agreeing (V11 row 62; V1 §2.2; J-V1.99). File f item 505 still says "four rows" (SCC-89). The `access.<kind>M` set is typed by a totality rule that cannot apply to a settings row (SCC-97) |
| the base's capacity, S10b, S11, the relet phases, `@plat/hood` | `roomProgram` | row 38 (readers widened, SCC-R3C-7) | present. V03's register lines split its `area` column (SCC-91) |
| S0 – S2, S6, S7b, S8.seed, S11, `@plat/app`, `testkit.bench` | `hood.*` | row 62 (readers widened) | present |
| S5b | `raisedWays` | row 80 | reader missing (SCC-96) |

**Preset vocabulary.** The registered presets are the same five across the seam: `MFCG`, `FTG`, `VG`, `FM` and `NG`.
* **Where they are stated:** V11's `PresetId` and source cell; V12's `PresetArm`, the `…@NG` suffix, `target.preset` and
  BCR-V12-2's union; file f items 376, 497 and 584; V01's BCR-46.
* **`ext.over`** carries no `NG` value in V11 §2.2, BCR-46 (d) or file f item 376's note, since `NG` zeroes what `MFCG`
  zeroes.
* **`NG`'s entries** stand on `hood.constants` alone, with none required (V11 §3.2.1 step 4; V1-3.15). Every entry is
  code-read or a fixed switch value, so it takes no register entry, and V12 §3.7.2 (3) keeps `NG` out of runs.
* **`VG`'s scope** is the one disagreement. V11 resolves every table under `VG`, with entries required on the village-read
  tables only; file f item 581 still says `VG` resolves only those tables (SCC-88).
* **The village-read set** grew with the widened readers. Rows 38 (S10b, S11), 62 (S0, S1, S2, S7b, S11), 90 (S10a) and
  91 (S2, S7b) now meet V07 §3.0's village stage set. V07 §3.15 (3)'s rule writes the `VG` entries of their
  `presetsRequired` cells by construction: V-M0's seat for the cells then compiled, else the seat of the change that
  makes a table village-read. `hood.constants`' categorical `pin.decayScope` takes its `MFCG` value, `own`, fixed. No
  finding.

**Calibration census.** Every volume that ships calibratable cells across this seam has a register writer:

| volume | its entries |
|---|---|
| V01 | the default line at M1, M2b, M3a and M5 |
| V02 | V2 §3.10.10's lines, with eleven `BenchBarDef`s |
| V03 | V03 §2.4's lines, T-V3-35 registered, PE's cells on the default line |
| V04 | V12's named lines for its cells, the rest on the default line |
| V05 | the default line |
| V06 | V6 §8's lines, with sixteen `BenchBarDef`s |
| V07 | the one `@VG` entry, the rest on the default line |
| V11 | V11 §8's non-g lines, with two `BenchBarDef`s; file g's lines are V12's |
| the base's cells | V12's `base` lines |

Every corpus due is `M-CAL` or `M-CAL/<layer>`. Four joints remain:

1. **Values moved after an entry exists.** Shipping `hood.constants` whole at M1 put V01's M5 tunings on entries written at
   M1 and M3a, and V12 names no writer or check for that move (SCC-90, SCC-92).
2. **One column, one entry.** V03 splits `RoomRoleRow.area` across its own line and the default line (SCC-91).
3. **The flag and the ids.** `--milestone` is part of the command, but its ids are ambiguous between V03's and V05's
   P-steps, and V03's plan rung has no layer run (SCC-93). V05's request is met but still reads as open (SCC-94).
4. **Base text lagging the volumes.** File f items 581 and 505 lag V11's and V01's repairs of this round (SCC-88,
   SCC-89).

**V02 and V06 as readers.** Neither changed anything that reaches a table, a preset or the register. V02's diff holds the
sealed-stack wording and `rebaseStack`'s `ground` parameter; V06's holds `EpochReport.raised.suppressedFired`. Their
register lines, bar registrations and cited V11 cells are as round 3 left them (§1: SCC-73, -74, -84, -85). The one V06
item this round is the missing epoch reader of a V01 table (SCC-95). **`_integrate`** is unchanged. Its product order,
with M6-E, M6-U and M6-sky before M-CAL, is consistent with V12's later runs: a layer landing before M-CAL's record is
M-CAL's (V12 §3.10.1).

## 4 Disposition by owning volume (round 4)

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| BASE-F | 0 | 2 | 0 | SCC-88 (file f item 581), SCC-89 (item 505) |
| V12 | 0 | 1 | 1 | SCC-90 (major); SCC-93 (minor) |
| V03 | 0 | 1 | 0 | SCC-91 |
| V01 | 0 | 0 | 2 | SCC-92, SCC-97 |
| V05 | 0 | 0 | 1 | SCC-94 |
| V06 | 0 | 0 | 1 | SCC-95 |
| V11 | 0 | 0 | 1 | SCC-96 |
| **total** | **0** | **4** | **6** | 10 findings (SCC-88 – SCC-97); round 3's 30 and round 0's five continuation findings all fixed (§1) |

No finding is a blocker: each closes inside one volume's text or one file-f note, and none stops a milestone from
starting. Each major stops an exit or makes a seat invent a rule:
* **SCC-88:** the V-M0 loader built two ways.
* **SCC-89:** the M1 schema and M1's register entries.
* **SCC-90:** M5's history rows.
* **SCC-91:** P1's lint.

**Grouped for the lanes:**
* **File f:** SCC-88 and SCC-89, one BASE-F lane with V11's 11:52 note and V01's note (35) as texts.
* **The register:** SCC-90 and SCC-93 (V12), then SCC-92 (V01), which cites SCC-90's paragraph.
* **Single items:** SCC-91 (V03), SCC-94 (V05), SCC-95 (V06), SCC-96 (V11), SCC-97 (V01, with SCC-92).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading** (the lines cited in each row, in the files at §0's md5s):
* §1's 35 re-checks, at every volume their required changes name.
* SCC-88: file f l. 518; V11 l. 4285–4298 and X-V11-16 (c); the lane-events notes of 11:44 and 11:52 and
  reconcile-BASE-F-r4's LANDED at 11:44.
* SCC-89: file f l. 868 and items 444 and 584; V1-8.1 l. 3000–3006; V1 §2.2's `HoodSettings`; V01's BCR-1 and note (35);
  V11 row 62.
* SCC-90: V1-8.1 l. 3011–3018; J-V1.97 and J-V1.99; V1-3.14's constants table; V12 l. 639, 1915–1918, 2041, 2216, 2480.
* SCC-91: V03 l. 742, 938–960, 1140 and J-V3.123; V12 §3.11's default line, its later-line rule and the lint; §2.6's
  `target.column.rows`.
* SCC-92: V1-8.1 l. 3004–3007.
* SCC-93: V12 l. 1933–1949 and §2.8's milestone ids; V03 §8's P0 – P6 rows; the per-volume grep.
* SCC-94: V05 l. 2706–2707, 3377 and 3509–3513; V12 X-V12-17.
* SCC-95: V01 l. 1606–1607; V11 row 90; V06 l. 997 and 1261; file f item 207; the base grep (no epoch surface re-lay).
* SCC-96: V11 row 80; the base l. 4339 and 4442; file f item 290; V06 l. 441 and 1364–1367.
* SCC-97: V01 l. 2234; V11 §2.1's `TotalityRule`.

**CONFIRMED by execution:**
* The fourteen diffs against snapshots whose md5s equal round 3's continuation inputs and the reconcilers' recorded
  backups.
* `tcensus.py` (62 names; the 9 without a row are harness files and an export extension).
* `cites.py` (587 citations and 799 ids in added lines, 0 missing, 0 suspect).
* The registry reader scan, and the greps of §0.

**PLAUSIBLE (reasoning only):**
* **That the required changes are the owners' best mappings.** SCC-90 might instead be met by V01 adopting J-V1.97's
  pre-decided fallback: `measure` lines at M5 for the columns it tunes after landing, whose exit rows would record the
  tuned values. SCC-91 might instead be met by a V12 rule for row-subset default entries. SCC-95 might instead be met by
  a V01 base change request on §4.5's epoch mode rather than V06's phase row.
* **That S5b's reads through S4's router are recorded under S5b** rather than S4 or EVO_GROWTH (SCC-96 carries the
  pre-decided move).
* **That the `P`-id collision in SCC-93 would bite.** It bites only if the plan rung or the sky layer lands after M-CAL;
  `_integrate`'s recommended order lands both before it.
* **That `landmark.maxRings` stays inert under `VG`.** Its `MFCG` and `FTG` entries hold its off value 1, but it carries
  no `VG` entry, so under `VG` it zeroes to 0, below its range. It is read only by a template's seed ring, and stage 2
  is off under `VG` (`fabric.extensionWeight` 0), so no finding is raised. The same holds for any other V01 cell whose
  parity entries differ from its zeroing.
* **That S7b (3)'s quota squares do not reach a village under `VG`** through `squares.quota`'s defaults. This is a
  question for the settlements seam, not this one.

**Not re-read this round:** the parts of the volumes that no repair touched since round 3's continuation and that lie
outside §0's sections read at source. Earlier rounds swept them, and this round checked them only by the scripts.
