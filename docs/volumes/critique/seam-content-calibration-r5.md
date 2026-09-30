# Seam check, round 5: content (V11) and calibration (V12), with V02 and V06 as readers

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r5; covered by the whole-design retrovalidation (J84).

PROGRESS (kill-safe; one line per section: planned | done)
- §0 Inputs and method | done
- §1 Re-check of round 4 (SCC-88 – SCC-97) | done
- §2 New findings (SCC-98 onward) | done
- §3 Table and calibration census, round 5 | done
- §4 Disposition by owning volume | done
- §5 CONFIRMED versus PLAUSIBLE | done

## 0 Inputs and method

**Why this lane ran now.** Round 4 (`seam-content-calibration-r4.md`, landed 12:22) raised SCC-88 – SCC-97. Every
round-5 reconcile lane has since landed: V02 12:33, V04 12:36, V05 12:39, BASE-F 12:39, V01 12:40, V08 12:49, V03 12:50,
V11 12:51, V06 12:55 (V07's shared-file edits in V06 at 12:59 and 13:01), V07 13:07, V12 13:08, V10 13:10 and V09 13:14.
No lane that edits these files was open when this lane started (13:14).

**Inputs** (md5, lines; snapshots in `scratchpad/volumes/sccr5/now/`, copies under round-4 names in `sccr5/cur/`): V11
08213668… (4 972), V12 3c9e7aa8… (3 373), V02 65e5ea63… (4 828), V06 c63ae4ae… (4 508), `_integrate` 965ab696… (468,
unchanged), file f e4c1756e… (1 709), file g 8df8841b… (unchanged), base 01fea21f… (unchanged). Read where the seam
reaches them: V01 15a69be1… (4 373), V03 e60491e3… (3 721), V04 27bdbbd7… (4 075), V05 5d0a101c… (3 740), V07 75393e28…
(4 331), V08 8be737e0… (3 745), V09 9274c4bc… (4 667), V10 c5aa04a6… (3 896).

**What was read, and how.** Round 4's snapshots (`sccr4/now/`) match round 4's recorded inputs by md5, so every line changed
since round 4 is in `sccr5/diff/` (5 050 diff lines).
* **Read whole:** the diffs of V12 (348), V11 (226), V02 (144), V06 (567) and file f (178).
* **Read by seam-term grep** (register, calibrat-, `--defaults`, preset, `NG`/`VG`/`FM`, registry, readers,
  `presetsRequired`, `BenchBarDef`, `bar.`, M-CAL, `ColumnSpec`, row numbers, `.json`), then at source wherever a hit
  touched a table, a preset or the register: V01 (473), V03 (568), V04 (196), V05 (410), V07 (740), V08 (206), V09 (298),
  V10 (696). Unchanged: `_integrate`, file g, the base.
* **Re-read at source:** V12 §2.6 (`CalibrationEntry`, the `cells` marker), §2.8's *Milestone ids*, §2.9, §3.7.1 – §3.7.2,
  the whole of §3.11 (the default line, *The due's corpus run*, *A value moved by its owning seat before its due*, the
  named lines with *Items 109 and 110 by column*, the panel rule, the lint, *Milestone exits*), J-V12.10, J-V12.61,
  J-V12.69, J-V12.77, J-V12.78, X-V12-17 and §12's round-5 paragraph; V11 §2.8c's `RaisedWaySettings` and
  `RaisedWayStructure`, §3.1's *Readers* and rows 38, 49, 50, 58 – 61, 71, 78 – 82, §3.24.2, §8 (the C-steps' *where in
  §16*, the lines table) and J-V11.92; V03 §2.4's register lines, §8's PE – P6 rows, A3, J-V3.118, J-V3.123 and BCR-V3-33;
  V01 V1-2.3's `TerraceState`, V1-3.14's column table, V1-3.17.1, V1-8.1 (the milestone bullets and the register
  paragraph); V02 §3.10.10; V04 §8's register tables, BCR-45 and J-V4.93; V05 §8 and §13 item 29; V06 §3.2, §3.4 (9), §8's
  register lines and X45; file f items 244, 245, 290, 309, 444, 505, 575, 576, 580, 581, 584 and 585.

**Scripts** (`scratchpad/volumes/sccr5/scripts/`, outputs beside them):
* `tcensus.py` (round 4's, on the current files): 62 table names used in a table phrase; the 9 without a registry row are
  V12's harness files (`answers`, `baselines`, `canvas`, `evidence`, `frames`, `metrics`, `seeds`, `transcript`) and V02's
  `plat.ext` — as at round 4.
* `cites.py` (round 4's, re-pointed at `sccr5/diff/`): 950 cross-volume section citations in added lines, 0 missing; 805
  cross-cited T-, J-, X- and BCR- ids, 0 suspect.
* `readers.py` (new): every StageId in V11 §3.1's `readers` cells against the base's stage names, V06's `EVO_*` ids,
  V04's `U-*` engines and V07's `VS*` set — 54 distinct ids, 0 unknown, and every `EVO_*` id V06 names is some row's reader.
* `rowrefs.py` (new): 54 "`table` … (row N)" references across the volumes and file f against V11's registry, 0 wrong
  (the flagged hits are columns named beside their own table's row).
* A census of V12 §3.11's line table: every leading table id is a registry TableId or a column of one — except V04's
  span-rule constants (SCC-104).
* Greps: `register --defaults` with and without `--milestone` per volume (V01 4 / 1, V03 3 / 0, V04 1 / 0, V05 7 / 0,
  V07 2 / 0, V12 9 / 12 — V12 admits the short form, X-V12-17); the `raised.*` and `retaining.*` keys across the design;
  bare step ids in register-line due cells (V02, V04, V06, V11, V12).

**Method.** Each of round 4's ten findings was re-checked in its owner's live text and at every text its required change
names (§1). The round-5 repair surface was then swept (the diffs), and the whole seam by the scripts and the line-table
census (§2, §3). New findings start at **SCC-98**. Severity as before: **blocker** — the seam cannot be built; **major** — a
contradiction or an unwired piece a builder would hit; **minor** — wording, a stale pointer, or a restatement whose values
agree.

**Decisions of this lane (vetoable).**
* **JC5-1:** Raised SCC-103 against the round-4 text this lane's predecessor wrote: SCC-90's required change compared "the
  column's compiled cells by row key", which V12 adopted verbatim and which cannot tell a moved value from a row a later
  landing adds. The fix belongs to V12, whose text now carries it.
* **JC5-2:** Raised SCC-102 against a premise round 4 supplied: SCC-90 said "No golden moves: these cells have no reader
  before M5", which V12 carried into J-V12.77 and its §12 as CONFIRMED; it is false for `terrace.siteShare`.
* **JC5-3:** Swept two pre-existing gaps no earlier round named, because the round-5 repairs (V12 §2.8's id rule, the
  `cells` machinery) make them reachable: the multi-stage register lines (SCC-105) and the calibratable constants with no
  registry table (SCC-104). Each is raised once, under its owner, with the texts that rely on it listed.

## 1 Re-check of round 4's issues

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-88 | BASE-F | FIXED | file f item 581 l. 519: heading adds "amended in V11's round-4 continuation, SCC-R3C-15; J-V11.91"; the note carries BCR-V11-31 as V11 §10 words it, applied with item 377 and before item 584, the round-4 clause withdrawn; *Needed by* adds V06 (V6 §2.2) and V07's readers; J-RF5.3 |
| SCC-89 | BASE-F | FIXED | file f item 505 l. 869: M1 names `WayNamingContext` and `hood.constants`' one `settings` row shipped whole, every calibratable column's entry at M1; M3a names `hood.templates`' `stepped` row shipped whole with every calibratable column's entry at M3a; the other rows at M5; item 444 l. 696 points back (J-RF5.5) |
| SCC-90 | V12 | FIXED in its own terms; **residues:** SCC-98 (named `measure` lines tuned before their exit), SCC-102 (a false premise), SCC-103 (rows added are not moves) | V12 §3.11's *A value moved by its owning seat before its due* l. 1979 – 2004; §2.6's `cells` marker l. 646 – 651; §2.11's `CalibrationEntry` row; §4.2's command row; §5.2; the lint l. 2090 – 2092; T-V12-20's clauses; J-V12.10's note; J-V12.77 |
| SCC-91 | V03 | FIXED in V03; **residue:** SCC-101 (file f item 585's note) | V03 §2.4 l. 970 (the `room` role's `area` on the first line, restated in place at P1), l. 973 (PE's row keeps the class rows' poorest-band `circulation`); l. 758 – 759; A3 l. 1155 – 1157; §8's PE, P1 and P6 rows; J-V3.118 and J-V3.123 amended; BCR-V3-33 l. 3057 – 3067 |
| SCC-92 | V01 | FIXED | V1-8.1 l. 3064 – 3072 (M3a: the `stepped` row whole, every calibratable column of `hood.templates` its entry there; M5: the other rows, "rows only"); l. 3081 – 3085 (the value-move sentence cites V12 §3.11's paragraph with `--milestone M5`); §1b's register row and W11 |
| SCC-93 | V12 | FIXED; **residue:** SCC-99 (the volumes' own lines and V12's two unnamed steps carry no id in the new form) | V12 §2.8's *Milestone ids* l. 808 – 815; *The due's corpus run* l. 1956 – 1972 (the flag required; the id refused when bare; the table with M6-P's row); §2.9's `CorpusRunId` comment; l. 2035 – 2037; X-V12-17's round-5 clause; T-V12-20's refusal clauses; J-V12.78 |
| SCC-94 | V05 | FIXED | V5 §13 item 29 marked met (l. 3558 – 3560); §8's register paragraph l. 2725 ("fall due at `M-CAL/sky`"); §12 l. 3399 – 3409 |
| SCC-95 | V06 | FIXED | V6 §3.2 row 4 l. 1015; §3.4 (9) l. 1193 – 1209; §2.10's `shade.surfacesRelaid` / `.surfacesHeld`; §2.12's `Way.surface` row; W81; T-V6-12's clause; J-V6.121; X45 |
| SCC-96 | V11 | FIXED | V11 row 80 l. 885 lists S5b with the pre-decided EVO_GROWTH move; rows 49, 71 and 81 by the same rule; `S5` compiled as a group (§2.1's comment, §3.1's *Readers* l. 795 – 801, §3.2.1 step 6, T-V11-1 (b)); W50, W71; J-V11.92 |
| SCC-97 | V01 | FIXED | V1-3.14's column table l. 2292 (twelve `access.<accessSymbolKind>M` columns held by T-V1-4's registry test, not a `TotalityRule`); J-V1.100 |

**All ten are fixed in their owners' text.** Round 4 in all: 0 blocker, 4 major, 6 minor, all fixed. Three repairs left a
residue in a sibling text or opened a case their words did not cover, raised in §2: SCC-90 → SCC-98, SCC-102 and SCC-103;
SCC-91 → SCC-101 (and SCC-106, the plan rung's restatement when it lands after M-CAL); SCC-93 → SCC-99.

## 2 New findings (SCC-98 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-98 | major | V12 | contradiction (a round-5 sentence against a volume's calibration plan) and unwired writer | V12 §3.11's new paragraph ends (l. 1990 – 1992): "A named line's entry moves its cells only by its line's method (a run; the panel rule's stated second value), never by this paragraph." V03's register lines are named `measure` lines in V2 §3.10.10's form whose cells the V03 seat tunes by hand before the exit — "`measure` at V3-P6 — T-V3-35 (i) and (ii) on B-PLAN and B-CITY-lite after P6's tuning" (V03 §2.4 l. 970 – 972), P6 "content and tuning … tuned on B-PLAN and B-CITY-lite" (§8 l. 2514), "P6 does tune those columns" (J-V3.118) — and whose fallback is a hand move: "a cell P6 tuned returns to its shipped default in the same change, the entry closes `fallback-applied`" (l. 970). No run can reach these cells: T-V3-35's `BenchBarDef` has `stages` `[]`, so "V12 §3.7.2 (4) admits no run's cell through the bar" (l. 960). V12 thus forbids the tuning, and its *Milestone exits* (l. 2105: "otherwise its fallback opens (V12 §3.7.1 (b))", a `fallback` run) routes the fallback through a run §3.7.2 (4) refuses. Neither move has a register writer: the entry's last cells row (P1's restating row for `area`; for a column first landed at P1 or P2 the named entry's first row, which V12 §2.6's `cells` comment does not classify) disagrees with the shipped cells, SCC-90's defect on a named line, while check (3) covers default entries only. The V3-P6 seat cannot follow both texts. | In *A value moved by its owning seat before its due*, the last sentence reads: "A named line's entry moves its cells by its line's method — a run, the panel rule's stated second value — and, on a `measure` line whose owning volume states a tuning before its exit and whose bars no run may name (every `BenchBarDef.stages` `[]`, V12 §3.7.2 (4): V03 §2.4's lines, tuned at V3-P6), by its owning seat inside the exit's milestone under (1)'s golden test, and by the line's stated fallback applied in the exit's change; each such move appends (2)'s cells row by the same command while the entry is `provisional`, and (3)'s check covers the entry." Clauses (2) and (3) read "a default entry, or a named entry the last sentence admits". *Milestone exits*, after "otherwise its fallback opens (V12 §3.7.1 (b); SCC-56)", adds: "— or, for an entry whose cells no run may name (V12 §3.7.2 (4)), its line's stated fallback applied by the exit's seat in the exit's change, recorded by the cells row, the entry closing `fallback-applied`". §2.6's `cells` comment names a named entry's first row (written with its column's compiled cells) a cells row. T-V12-20 gains: a fixture named `measure` entry on a `stages: []` bar, tuned before its exit, fails `--check` until the command appends the row, and its hand fallback at the exit appends a row and closes `fallback-applied`; the same move on an entry whose bar has stages fails as owed to a run. J-V12.77 is amended; an X-V12 row tells V03 (no edit needed; V03 §2.4 may cite the paragraph). |
| SCC-99 | major | V12 | unwired ids (entries that never fall due) | V12 §2.8's *Milestone ids* (l. 808 – 815) makes every register entry's `due` volume-qualified, and *Milestone exits* (l. 2102) finds "each `measure` entry due there" by the milestone's id; but the provisional-number lint (l. 2079 – 2100) refuses no unregistered due, and V12 wrote the new form only for its own lines' V04 and V06 steps (l. 2035 – 2037). Left bare or unnamed: **V06 §8**'s register lines (l. 3433 – 3446: exits E2 – E8, the V6-E7 panel); **V11 §8**'s lines (l. 3895 ff.: the `undergroundAccess.prob` line "at U5"; every line's writing step C1 – C8, which V11 §8 builds inside §16's milestones — C1 in M1, C2 M2b, C3 and C3b M3a, C5 M2b and M3b, C6 M4, C7 M4b, C8 M6-U, l. 3859 – 3868 — and which §2.8's `V<n>-` rule would write `V11-C8`, dating a C8 column that lands after M-CAL to `M-CAL/V11-C8` instead of `M-CAL/under`; V12 l. 2025 – 2029 already reads "C8 for item 109 (M6-U), C3b for item 110 (M3a)" in prose); **V02 §3.10.10**'s crypt line (l. 2023: "from the landing of volume 4's access draw", "at U5"); **V12's own** raisedWays line (l. 2059: "`measure` at the raised-way milestone", with W5, T-V12-11's TOWN clause, T-V12-39 and T-V12-40 — no such id in §2.8 or §16, while file f items 244 and 290 build raised ways at M3a and V11's C3b ships row 80 there), its span-rule line (l. 2071: "at its milestone"), and its evolution lines (l. 2069 – 2070: "at V06's evolution milestone (M6-E)", beside l. 2036's "V06's … E7 as `V6-E7`"). An entry written `due: 'E2'` or `'U5'` matches no `MilestoneRecord`, is never "due there" and never "past its due", and dangles silently — the defect the lint exists to prevent. | (a) §2.8's *Milestone ids* adds: "A register line a volume writes names its step by that volume's own id, which the writing seat puts into `due` and `--milestone` in this form: V06 §8's E1 – E8 as `V6-E1` … `V6-E8` (its V6-E7 panel `V6-E7`); V04 §8's U-steps as `V4-U*`; 'at U5' in V02 §3.10.10 and V11 §8 as `V4-U5`. Volume 11's content steps C0 – C8 (C3b among them) are built inside §16's milestones and take their ids, as volume 3's PE does (V11 §8's *where in §16*: C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C5 `M2b` or `M3b` by its part, C6 `M4`, C7 `M4b`, C8 `M6-U`; C4's wall rows `M2b`). Item 110's raised ways are built at `M3a` (file f items 244, 290)." (b) V12's lines read "`measure` at M3a" for `raisedWays` (W5's split kept inside M3a; T-V12-11's TOWN clause, T-V12-39 and T-V12-40 at M3a), "by V04's T-V4-62 at `V4-U3`" (with SCC-100) and "at `V6-E7`" for the evolution panels; V02 §3.10.10's crypt line's measure is due at `V4-U3b` (the access draw's step, V4 §8). (c) The lint fails an entry whose `due` is neither a §16 id, a §2.8 id nor a `CorpusRunId`, naming §2.8's form — the test `--milestone` applies. (d) T-V12-20 adds: "an entry with `due: 'E2'` fails, naming V12 §2.8's form". (e) X-V12-17 adds V02, V06 and V11 (no edit needed: the lint names the form; each volume's next round may write the ids). |
| SCC-100 | minor | V12 | disagreement on a line's stages (with V04) | V12's span-rule line (l. 2071): "`measure` by V04's T-V4-62 at its milestone, then `panel` (M4-110) at M4". V4 §8's row (l. 2830): "T-V4-62 at U3 (conformance, 0 violations; confirmed when it passes), then the M4-110 and V4-U5 panels". V04 adds a V4-U5 panel that V12 lacks, and both put the V4-U3 measure before the M4 panel, though the cells land at M3a (V4 §8) and M6-U follows M4 in §16 and in `_integrate`'s order (l. 324 – 326). | V12's line (the line's home) reads: "`panel` (M4-110) at M4, then T-V4-62's conformance at `V4-U3` (0 violations), then the V4-U5 panel's `realism` at `V4-U5`", in SCC-105's staged form. V04 §8's row takes the same order and cites V12's line (V04's next round; no mechanism changes). |
| SCC-101 | minor | BASE-F | base note lagging its volume (SCC-91's file-f half) | File f item 585's note (l. 852): "the capacity's two cells stay on volume 12 §3.11's default line from M2b (volume 3 §2.4)". Since SCC-91, V03's BCR-V3-33 (l. 3064 – 3067) and §2.4 put only the class rows' poorest-band `circulation` on the default line; the `room` role's area rides its `area` column's entry, written at M2b by the default line and restated in place at P1 by V03 §2.4's first line, measured at V3-P6 and never tuned. Round 4 routed SCC-91 to V03 alone, so reconcile-BASE-F-r5 did not carry it. | Item 585's note reads: "*Note (reconciliation round 5, seam SCC-91's file-f half):* the capacity's two cells are never tuned: each class row's poorest-band `circulation` on volume 12 §3.11's default line from M2b; the `room` role's area on its `area` column's entry, written at M2b by that line and restated in place at P1 by volume 3 §2.4's first register line, measured at V3-P6 and never tuned (volume 3 §2.4; J-V3.123)"; a J-RF row. |
| SCC-102 | minor | V12 | a false premise in a round-5 decision (round 4 supplied it; JC5-2) | V12's clause (1) (l. 1982 – 1988) admits a move "only while no committed golden holds a stage that reads the column: the change's golden check … finds no digest … moved by the new value", and names `terrace.siteShare` among "Volume 1's M5 tunings". J-V12.77 reasons that these tunings "precede every golden of their readers", and §12's round-5 paragraph (l. 3135 – 3138) marks "no reader before M5" CONFIRMED. But `TerraceState.asks` reads `terrace.siteShare` wherever an authored S1 `terrace` site primitive covers a district (V1-2.3 l. 631 – 632; V1-3.17.1 (1) l. 2394 – 2398), and `terraceState` lands at M3a "because the base's district-edge source reads them from M3a (BCR-42)" (V1-8.1 l. 3048 – 3050). So a committed M3a golden holds S10 reading the column, and the clause's two tests disagree. If M5's check does find a moved digest, V01's tuning to T-V1-50 has no legal path: V12 makes it a run, a run needs a register metric, and V01's bars are "never register metrics" (V1-8.1 l. 3084). | (1)'s condition reads: "only when the change's golden check (…) finds no digest of a golden committed before the change moved by the new value — a column a committed stage already reads may so move where no golden's digest depends on the moved cells (`terrace.siteShare`, read from M3a by `terraceState` for the base's district-edge source, V1-8.1, BCR-42, matters only where an authored `terrace` site primitive covers a district, V1-3.17.1 (1))". Pre-decided: should the M5 check find a committed digest moved by such a tuning, the tuning is not landed — the cell keeps its landed value, the register report lists it "held: a committed golden reads it", and V01's bar reads the shipped value. J-V12.77's "they precede every golden of their readers" reads "no committed golden's digest depends on them, which the golden check proves per change". §12's round-5 paragraph moves `terrace.siteShare` to PLAUSIBLE. V01 may cite the held outcome in V1-8.1 (no edit required). |
| SCC-103 | major | V12 | an unwired case of the round-5 check (rows added are not moved values; JC5-1) | Clause (1) (l. 1979 – 1982) admits a move only by "the seat that owns a calibratable column (its entry's `owner`)", on a `provisional`, not-yet-due default entry. Clause (2) appends nothing to an entry that is "not `provisional`, or whose due's record is committed", listing it "as a move owed to a run". Clause (3) fails a default entry "whose last cells row's `value` differs from its column's compiled cells", comparing every row key. A row a later landing adds to a column is no moved value, and no run adds a row (§3.7.2: a run's `changes` are existing cells). The design adds such rows. V03's `roomProgram.circulation`: the class rows' poorest-band cells land at M2b (PE; V03 §2.4 l. 973; the entry's `owner` `base`, the M2b source file's seat by V12 §3.11's owner rule), the band rows' cells at P1 (l. 974, "written with each cell's landing"). V01's `hood.templates` other rows land at M5 (V1-8.1 l. 3071 – 3072; owner V01, so admitted). Before M-CAL, V03's P1 seat is not the entry's owner, so (1) does not admit its rows, though (2)'s command appends them. If the plan rung lands after M-CAL's record — the order V12's own due table provides for (the row "M6-P and `V3-P0` – `V3-P6`" → `M-CAL/M6-P`) — the entry is closed or past due: the command appends nothing, `--check` fails naming `plat calibrate run`, and no run can add a row, so P1's exit can never be green. The same holds for any layer landing after M-CAL that adds rows to a default-line column. | *A value moved by its owning seat before its due* gains (2′): "A change whose compiled cells hold row keys the entry's last cells row lacks, with every row key that row holds unchanged, adds rows: `plat calibrate register --defaults --milestone <id>` appends the cells row whatever the entry's status or due and whichever seat lands the rows, and changes nothing else. Rows added after the entry's corpus run keep their authored values and are reported as 'rows added after close'; a later major table version may restate the entry for them (V12 §4.2)." (1)'s owner condition and (2)'s "owed to a run" apply to changed cells of the row keys the last cells row holds; (3) compares those row keys only. §4.2's command row, §5.2's report ("rows added") and §2.11's lifecycle row follow. T-V12-20 gains: a fixture M2b column whose P1 rows land after a committed fixture M-CAL record passes once the command appends the row, and a changed M2b cell still fails as owed to a run. A J-V12 row. |
| SCC-104 | major | V11 | calibratable cells with no registry table | V12's span-rule line (l. 2071) binds "V04's span-rule constants — `raised.vaultShare` …, the headroom and fall bounds, the cap, the deck depth, `raised.supportFoundationCm` (the base's raised-way rows by V04's BCR-45, J-V4.93)". V04 BCR-45 (l. 3384 – 3395) states them — `raised.vault.maxHeightCm` 900, `minHeadroomCm` 250, `maxFallCm` 150, `raised.vaultShare[kind]` 0.6 / 0.7 / 0.15, `raised.vaultCap[rung]` 10 / 40 / 120 / 240, `raised.deckDepthCm` 150, `raised.supportFoundationCm` 400, "all our own, calibrate-later, `extension` cells" — but names no table. J-V4.93 files them "among the base's raised-way rows (BCR-45), over this volume's tables", and V4 §8 (l. 2830) lands them at M3a "by the seat landing BCR-45". No registry table holds them: row 80's `RaisedWaySettings` and `RaisedWayStructure` (V11 l. 657 – 671) lack every one, and V11 §3.24.2 (l. 3496) says "`raised.vaultShare` stays V04's cell". File f adds two more: item 244 (l. 166), the support step's slide bound "≤ 1.5 × the band's upper bound (own, calibrate-later, `extension`)", unnamed; and item 245 (l. 168), `retaining.stateSnapCm` (100 cm; "our own, calibrate-later"), absent from V11's `retaining` (row 79). A cell outside every registry table has no `ColumnSpec`, so V12 §3.7.2 (1) and the lint's "every entry's cell or column exists and is calibratable" fail on V12's span-rule line. The M3a seat landing BCR-45 and items 244 – 245 must invent a table, and T-V11-1 (a)'s grep finds no table id to check. | `RaisedWayStructure` gains `span: { vaultShare: Record<RaisedKind, number>; maxHeightCm: number; minHeadroomCm: number; maxFallCm: number; vaultCap: Record<rung, number> /* the village rungs, TOWN, CITY, METROPOLIS */; deckDepthCm: number; supportFoundationCm: number }` and `slideMaxFactor: number` (item 244's 1.5). The `retaining` table (row 79) gains a `settings` row (V11 §2.1's settings form) holding `stateSnapCm` (item 245's 100 cm). Each is `own`, calibrate-later, `extension`, `calibratable: true`. Row 80's rows-home cell adds "V04 §10 BCR-45 (the `span` values); §2.7 by file f item 244 (`slideMaxFactor`)", and row 79's adds "§2.7 by file f item 245 (`stateSnapCm`)"; each value is stated once, in those texts. Readers: V11 checks that row 80 lists U-SYS (V04 §3.5.0's foundation rule reads `supportFoundationCm`) and that row 79 lists every re-derivation path that snaps a state knot, adding any that is missing. T-V11-1 (a)'s grep adds the `raised.*` and `retaining.*` keys. Companions (their next rounds; single source): V04 BCR-45, J-V4.93 and V4 §8's register row name `raisedWays.structure.span`; file f items 244 and 245 name `raisedWays.structure.slideMaxFactor` and `retaining.settings.stateSnapCm`; V12's span-rule line cites row 80; V11 l. 3496 reads "`raised.vaultShare` — V04's value, held in `raisedWays.structure.span`". |
| SCC-105 | major | V12 | a record that cannot hold what its lines say (multi-stage register lines; JC5-3) | V12 §2.6 (l. 618 – 651) gives an entry one `method`, one `due` and a `panel?` field for "method 'panel' only". The status machine (l. 2098 – 2100) allows only provisional → confirmed / fallback-applied / not-achieved / owner-set / fixed, and confirmed → owner-set. *Milestone exits* (l. 2102 – 2104) confirms a `measure` entry at its due exit "when every `bar.` metric it names passes". V12 also says "a line's method cell writes `CalibrationEntry.method` by name" (l. 2008). Yet many lines name several stages. V12's own: l. 2041 ("`measure` at U3 …, then `panel` (V4-U5, `realism`) at U5"), l. 2043 (measure, panel, `corpus` possibility), l. 2059 (`raisedWays`: measure, panel, corpus possibility) and l. 2071. V02 §3.10.10's: the geometry line ("`measure` at M6a …, then `panel` at M6 …, then `corpus` possibility at M-CAL"), and the stepped, arena, `@deck`, small-tables, crypt and `terrace.wallBandCm` lines. V11 §8's ("`measure` at M2b …, then `corpus` at M-CAL"), and V04 §8's rows. No text says which method and due such an entry carries. If it confirms at its measure stage: the panel rule's outcomes at the later stage (a second value by a `fallback` run, or `not-achieved`, V12 l. 2073 – 2077) are illegal moves from `confirmed`; the panel's `panel` field cannot sit on a `measure` entry; and the trailing corpus possibility is never "due" at M-CAL, so no corpus run reads it. The `frame.*` rule (l. 2105 – 2109) covers only a measure-then-corpus line's metrics. | §2.6's `CalibrationEntry` gains `stages?: { method: 'measure'\|'tune'\|'panel'\|'corpus'; due: string; panel?: <the panel field>; possibility?: true }[]`. It is written when a line names more than one stage, in milestone order; the entry's `method`, `due` and `panel` are the current stage's (the first at writing). *Milestone exits* adds: "A staged entry whose current stage passes, and is not its last non-`corpus` stage, appends that stage's row and advances `method`, `due` and `panel` to the next stage, staying `provisional`; the last non-`corpus` stage's pass confirms it. A failing stage applies the line's 'when it cannot confirm' there — its fallback, or the panel rule's second value, or `not-achieved` — which closes the entry, later stages then reading as metrics rows. An unrated panel stage holds it *provisional — not rated*. A trailing `corpus` possibility stage is read at its corpus run (M-CAL, or `M-CAL/<layer>`) whatever the status, as a `frame.*` metrics row, and moves cells only by V12 §3.10's rules into historical packs (R1), never re-opening the status." The lint reads the current stage's due and refuses stages out of milestone order. §2.11's lifecycle row migrates an entry without `stages` as single-stage. T-V12-20 gains the fixture: measure at M2b → panel at M4 → corpus at M-CAL is provisional with due M4 after M2b's pass, confirmed at M4, and takes a frame row at M-CAL with its status kept; a panel No after a passing measure closes it `not-achieved`. A J-V12 row; an X-V12 note to V02, V04 and V11 (no edit: their lines read in stage order; V04's span row is re-ordered by SCC-100). |
| SCC-106 | minor | V03 | an order case its restatement does not cover | V03 §2.4 (l. 970) and §8's P1 row: the `area` column's M2b default entry is "restated in place by this line at P1 — V12 §3.11's later-line rule". V12 (l. 1951 – 1954) restates a default entry in place "while it is `provisional` (after its corpus run, M-CAL or `M-CAL/<layer>`, only under a new major table version, V12 §4.2)". J-V3.118 notes that "no corpus frame measures room areas", so the M2b entry closes `fixed` at M-CAL. V12's due table provides for M6-P landing after M-CAL's record, and V03's P1 row states nothing for that order. | §8's P1 exit cell and §2.4's first line add: "— should M6-P land after M-CAL's record, the restatement ships with a new major version of `roomProgram` (V12 §4.2), the entry `provisional` again". J-V3.123 notes it. |
| SCC-107 | minor | V12 | a rule with no scope and no checker | V12 §3.11's lint paragraph (l. 2092 – 2093): "Constants the volumes keep outside tables, in code, move into a table or take a `thr.` entry", and §3.11's *Entries*: "every volume's calibrate-later constant". The lint scans compiled cells only, so nothing checks the sentence. V09 and V10 keep calibrate-later application constants outside every table: V9 l. 1144 (autosave: "50 entries, 60 s, 2 s … calibrate-later by the M2a autosave measurement"), l. 2383 (`raised.previewOnReleaseKm` 3 km, "calibrate-later by T-V9-3 at M3a"), l. 2387 (the deck scenes' cap per export), l. 3109 (times, "calibrate-later at M1"); V10 l. 2618 and l. 3800 (a budget row, "measured by T-V10-8"). Their tables are `calibratable: false` (V11 rows 86 – 89; SCC-R2C-4). A V09 or V10 seat cannot tell whether each needs a `thr.` entry, and V12's rule would put UI and engineering thresholds under the corpus register. | The sentence reads: "Model constants the volumes keep outside tables, in code, move into a table or take a `thr.` entry. An application or engineering constant — a UI threshold, an autosave or export limit, a time budget — that its volume confirms by its own test or performance row under D-18 (volume 9's and volume 10's calibrate-later constants) is outside the register: its provenance note names that test, and no entry is written." *Entries* reads "every volume's calibrate-later model constant". T-V12-20 adds: "a fixture application constant with its test named takes no entry and passes". An X-V12 note to V09 and V10 (no edit needed). |

## 3 Table and calibration census, round 5

**Tables read across the seam.** Every table that V12, V02, V06 and the other volumes read has a row in V11 §3.1's
registry. `tcensus.py` finds no content table without one, `rowrefs.py` finds every "(row N)" pointer right, and
`readers.py` finds every reader StageId registered. Changes since round 4:

| reader | table / cells | V11 home (registry row) | status |
|---|---|---|---|
| S5b (the main-road step at later stages, through S4's router) | `raisedWays`, `ways.crossing`, `materials`, `ancestry` / `culture`; `stage.regimes`, `ways.widths`, `era` through the `S5` group | rows 80, 81, 49, 71; 2, 3, 50 | present (SCC-96; J-V11.92) |
| V06's `field` phase (S6 at an epoch) | `way.surface`, `era` | rows 90, 50 | present; row 90's S6 epoch reader now has its phase (V6 §3.4 (9); SCC-95) |
| V07's `village.records` (stage S10b) and `village.pins` (VS8) at an epoch | `village` (`rules.claimArea` and the fair and hall rows; VS8's pin rows) | row 61 | present — S10b and VS8 are already row 61's readers, and an epoch's reads record under the participant's stage (V6 §3.16) |
| V12's span-rule line; file f items 244 and 245 | `raised.vaultShare`, `raised.vault.maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `raised.vaultCap`, `raised.deckDepthCm`, `raised.supportFoundationCm`; item 244's slide bound; `retaining.stateSnapCm` | none | **missing** (SCC-104) |

**Preset vocabulary.** The same five across the seam — `MFCG`, `FTG`, `VG`, `FM` and `NG` — in V11's `PresetId`, V12's
`PresetArm` and target unions and file f items 376, 497, 581 and 584. Under `VG` every table resolves by §7.6's order, and
entries are required only on the village-read tables; file f item 581 now says so (SCC-88). V07 §2.2a's `terrace.enabled`
is V07's village switch, and V11's `terrace.enabled` keeps its own `presets.VG` entry for the town rungs (V07 SR4-11). No
finding.

**The register's writers and checks.** Every calibratable column in the seam has a line that writes its entry:

| volume | its entries |
|---|---|
| V01 | the default line at M1, M2b, M3a and M5, with the moved-value rows of V12 §3.11 at M5 (V1-8.1) |
| V02 | V2 §3.10.10's lines, with eleven `BenchBarDef`s |
| V03 | V03 §2.4's lines (the `room` role's area on the first, SCC-91), T-V3-35 registered; PE's other cells on the default line |
| V04 | V12's named lines for its cells, the rest on the default line |
| V05 | the default line (due `M-CAL/sky` when late) |
| V06 | V6 §8's lines, with sixteen `BenchBarDef`s |
| V07 | the one `@VG` entry, the rest on the default line |
| V11 | V11 §8's non-g lines, with two `BenchBarDef`s; file g's lines are V12's |
| the base's cells | V12's `base` lines |

Five joints remain, each holding §2's findings:
1. **Moves V12 does not type.** A named `measure` line tuned by hand before its exit, with its hand fallback (SCC-98). Rows
   a later landing adds to a default-line column (SCC-103).
2. **Ids.** The volumes' own lines, and two of V12's, carry dues no `MilestoneRecord` matches, and the lint refuses none
   (SCC-99). The span-rule line's stages disagree with V04 and run against milestone order (SCC-100).
3. **Stages.** Multi-stage lines have no typed form in `CalibrationEntry` (SCC-105).
4. **Cells with no table.** V04's span-rule constants and two file-f constants (SCC-104).
5. **Lags and premises.** File f item 585 lags SCC-91 (SCC-101). V12's clause (1) rests on a false premise about
   `terrace.siteShare` (SCC-102). V03's restatement lacks a post-M-CAL form (SCC-106). The in-code constants rule has no
   scope and no checker (SCC-107).

**V02 and V06 as readers.**
* **V02.** V02's round-5 diff (S23R4-02: the approach strip, the stack helpers' readers) touches no table, preset or
  register line. Its register lines are as round 4 left them, but they meet SCC-99 (the crypt line's ids) and SCC-105
  (the staged lines).
* **V06.** V06's round-5 diff adds the way-surface re-lay (SCC-95, fixed), the island events' pricing and the re-declared
  century bounds (TV-01; no table reads), item 244's support step (TV-07; row 80's readers already cover it) and V07's
  `village.records` / `village.pins` rows (row 61 covers their reads). Its §8 lines meet SCC-99 (bare `E` exits).
* **`_integrate`.** Unchanged. Its recommended order lands M6-U, M6-sky, M6-E and the plan rung before M-CAL, so SCC-103's
  stuck exit and SCC-106 bite only in the order V12's due table also provides for.

## 4 Disposition by owning volume (round 5)

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V12 | 0 | 4 | 3 | SCC-98, SCC-99, SCC-103, SCC-105 (major); SCC-100, SCC-102, SCC-107 (minor) |
| V11 | 0 | 1 | 0 | SCC-104 |
| BASE-F | 0 | 0 | 1 | SCC-101 (file f item 585) |
| V03 | 0 | 0 | 1 | SCC-106 |
| **total** | **0** | **5** | **5** | 10 findings (SCC-98 – SCC-107); round 4's ten all fixed (§1) |

No finding is a blocker: each closes inside one volume's text or one file-f note, and none stops a milestone from starting.
Each major stops an exit or makes a seat invent a rule:
* **SCC-98:** the V3-P6 tuning and its fallback.
* **SCC-99:** every entry of V06's, V11's and V02's own lines, which never fall due as written.
* **SCC-103:** a later landing's rows.
* **SCC-104:** the M3a seat that lands BCR-45.
* **SCC-105:** every staged line's entry.

**Grouped for the lanes:**
* **V12:** one lane with SCC-105 first, since the staged form is the ground SCC-100's re-ordered line stands on; then
  SCC-99, SCC-98, SCC-103 and SCC-102 in *A value moved…* and the lint, and SCC-107's scope sentence.
* **V11:** SCC-104, with V04's and file f's naming as companions for their next rounds.
* **Single items:** SCC-101 (BASE-F), SCC-106 (V03).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading** (the lines cited in each row, in the files at §0's md5s):
* §1's ten re-checks, at every text their required changes name.
* SCC-98: V12 l. 1990 – 1992 and 2105; V03 l. 960, 970 – 972, 2514 and J-V3.118; V12 §3.7.2 (4); §2.6's `cells` comment.
* SCC-99: V12 l. 808 – 815, 2035 – 2037, 2059, 2069 – 2071, 2079 – 2100 and 2102; V06 l. 3433 – 3446; V11 l. 3859 – 3868
  and the lines table from l. 3895; V02 l. 2023; file f items 244 and 290 (BASE (M3a)).
* SCC-100: V12 l. 2071; V04 l. 2830; `_integrate` l. 324 – 326.
* SCC-101: file f l. 852; V03 l. 3057 – 3067.
* SCC-102: V12 l. 1982 – 1988, J-V12.77 and l. 3135 – 3138; V01 l. 630 – 636, 2394 – 2398, 3048 – 3050 and 3084.
* SCC-103: V12 l. 1979 – 2004 and §3.7.2; V03 l. 973 – 974; V1-8.1 l. 3071 – 3072; V12's due table l. 1966 – 1972.
* SCC-104: V12 l. 2071; V04 l. 2830, 2953 and 3384 – 3395; V11 l. 657 – 671, 884 – 885 and 3496; file f l. 166 and 168; a
  grep of every `raised.*` key (V01's in `hood.constants`, V07's in `village`, V09's a shell constant — SCC-107; V04's in none).
* SCC-105: V12 l. 618 – 651, 2008, 2041 – 2071, 2073 – 2077, 2098 – 2100 and 2102 – 2109; V02 §3.10.10's lines table;
  V11 §8's lines table; V04 §8's rows.
* SCC-106: V03 l. 970 and §8's P1 row; V12 l. 1951 – 1954; J-V3.118.
* SCC-107: V12 l. 2092 – 2093 and §3.11's *Entries*; V9 l. 1144, 2383, 2387 and 3109; V10 l. 2618 and 3800; V11 rows 86 – 89.

**CONFIRMED by execution:**
* The sixteen diffs against round 4's verified snapshots.
* `tcensus.py` (62 names; the 9 without a row are harness files and an export extension).
* `cites.py` (950 citations and 805 ids in added lines, 0 missing, 0 suspect).
* `readers.py` (54 reader StageIds, 0 unknown).
* `rowrefs.py` (54 row pointers, 0 wrong).
* The V12 line-table census and the greps of §0.

**PLAUSIBLE (reasoning only):**
* **That the required changes are the owners' best mappings.** SCC-98 might instead be met by V03 moving its P6 tuning
  into a pre-exit authoring step whose values its line records as the first row. SCC-104 might instead take a registry row
  of its own (`raised.span`) rather than `raisedWays.structure`. SCC-105 might be met by one entry per stage, which would
  break V12's one-knob, one-entry rule.
* **That SCC-102's held outcome is never reached.** A committed M3a golden moves under a tuned `terrace.siteShare` only
  where an authored `terrace` site primitive covers a district between the two shares; whether K2's skeleton authors its
  terraced wards that way is not stated.
* **That no other volume moves a named line's cells by hand before its exit.** V02, V04, V06 and V11 state no such tuning
  (grep), and V04's "re-tunes P4's admissible share" is a risk fallback, not a register move.
* **That SCC-103's stuck exit needs a post-M-CAL landing.** `_integrate`'s recommended order has none; the owner's order
  could.

**Not re-read this round:** the parts of the volumes that no round-5 repair touched and that lie outside §0's sections read
at source. Earlier rounds swept them; this round checked them only by the scripts and the V12 line-table census.
