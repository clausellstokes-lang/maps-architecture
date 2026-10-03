# Rewrite — the scope part of the base (title, summary, §0, §1, §13–§17, decisions, judgment index, staged list, Appendix A)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-scope; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-scope`, 2026-09-29; cloud continuation 2026-10-02/03)
- P1 inputs read (the scope part whole, canon scope routes, conflicts, f and g items with their BCR texts, INDEX, owner decisions): done
- P2 section files written to `docs/validation/coherence/new/base/scope/` (14 files, 01–14 in document order): done
- P3 INDEX §3, §4, §6 and §7 new text for the assembler (`docs/validation/coherence/new/index/`): done
- P4 sizes, mapping table, elegance, f and g items, conflicts, renumberings, cross-part notes: done
- P5 the landed base parts' cross-part notes (model, kernel, determinism, rendering, pipeline) folded into §0, §13, §14,
  §16, §17 and the index (*Landed parts' notes folded*, below): done (the run of 2026-09-29 stopped inside this step;
  the continuation verified every note against the files and finished it)
- P6 result file and LANDED: done

## Outcome

The scope part is rewritten as fourteen section files, each starting with its heading line exactly as today: the title
block (banner line kept as is), the one-page summary, §0, the PART I heading, §1, §13, §14, §15, §16, §17, the delegated
decisions, the judgment-calls index, the staged list and Appendix A. They describe the whole set — the base, INDEX.md and
the twelve volumes — with J122's combined build order and item 568's two totals in §16, every volume package placed in
§14, the village rows and the volumes' milestones in §1.1, and the owner items 102–113's bars in §13.2. Every routed
conflict (27), f item (64 own, 6 shared parts, and the §13/§16 parts of items 296, 308, 317, 371, 413, 458 and 474),
g part (102–113), wiring gap (6), elegance ruling (7), id ruling (7), cohesion check, owner question and the 8 UNDEFINED
edges are applied; the 73 open findings are closed (below). All 1 684 inventory ids are mapped (none missing). The unit
shrinks by 3.8 %, below the 25–40 % band: the pass added about 11 300 words of required content, and the rest is test
specification, typed interfaces, matrices and one index row per decision (see *Sizes*). CONFIRMED by script: table
shapes, pointer resolution against the base and volume headings, index ids (795 unique, the 736 old ones all present),
the §16 sums; the design statements themselves are PLAUSIBLE as before. The five landed base parts' notes to this
part are folded (36 further index rows for their decisions and J-A112.02, T112-1's threshold and simulation, §14's stage-2 type homes
and `SkyUnitInput`, the ID-TOOL, G-cite and G-lot forms).

## Sizes

| section file | words before | words after | change | KB before | KB after |
|---|---|---|---|---|---|
| 01-title | 264 | 302 | +38 | 2 | 2 |
| 02-summary | 1944 | 1732 | -212 | 11 | 10 |
| 03-s0 | 5689 | 2715 | -2974 | 34 | 16 |
| 04-part1 | 17 | 17 | +0 | 0 | 0 |
| 05-s1 | 5570 | 5580 | +10 | 34 | 34 |
| 06-s13 | 26850 | 33189 | +6339 | 163 | 201 |
| 07-s14 | 7391 | 9157 | +1766 | 50 | 64 |
| 08-s15 | 8436 | 8692 | +256 | 48 | 49 |
| 09-s16 | 7565 | 8248 | +683 | 46 | 50 |
| 10-s17 | 3383 | 3773 | +390 | 22 | 25 |
| 11-delegated | 3005 | 3107 | +102 | 19 | 19 |
| 12-judgment | 25908 | 16385 | -9523 | 146 | 88 |
| 13-staged | 1779 | 1296 | -483 | 11 | 8 |
| 14-appendixA | 657 | 549 | -108 | 4 | 3 |
| **total** | **98458** | **94742** | **-3716 (-3.8 %)** | **590** | **569** |

**Words removed, by source** (≈ 15 000 removed, ≈ 11 300 added; the source split is PLAUSIBLE — estimated section by
section from the edits made, not measured by a diff tool):

| source | words removed | where |
|---|---|---|
| restatement (a fact stated again where a pointer serves) | ≈ 13 400 | the judgment index's choice texts beyond the name (≈ 10 500; the full entries stay in the rationale's Part A); §0.2's landing lists (≈ 2 700); the staged list's hook enumerations; the summary's figures; §1.2's day-view detail (RC-13); §1.4's adopted cells (RC-16); §13.4's palette values (RC-14); §14's event-kind comment (RC-15); §16's M1/M2a mechanism detail; D-5, D-31 |
| narration (how the text evolved) | ≈ 900 | "amendments b/c" group headings and convention intros in §13; §16's per-round "+x pw" basis and pricing paragraphs (EL-05); the summary's two appended paragraphs (EL-06); Appendix A's pass paragraphs; §0.1's round history; §17's dated framing; J-A11.43's verification-round note; R11 (ID-R) |
| duplicated mechanisms (the canon's UNIFY rulings) | ≈ 1 400 | E-20 (three convention copies → one), E-21 (§13.8's two tier paragraphs and §16's exit T-lists → one schedule table; net of the table), E-22 (three landing tables → one), E-23 (three re-signing lists → one) |
| verbose prose | ≈ 300 | compact wording in §1.1's layers paragraph, §1.5–§1.6, D-rows |

**Added, as required by the pass** (≈ 11 300): the g items 102–113's bars at build depth (≈ 2 300); the volumes placed —
§1.1's stage table and village rows, §14's nine new package lines and dependency rules, §16's staged-milestone table,
release gate and effort lines, §15's STAGE-3 rows (≈ 3 300); the f items' texts (T28-1/2/3, T29-4, T14-1, T15-1,
T101-6, the Baseline/ParityReport/D5/MilestoneRecord fields, §13.6 (10)–(11), §13.7's two rows, §13.9's items 6–10,
§17.1's additions; ≈ 2 000); the takeover table (CO-06/W-05) and the edges (≈ 1 100); the schedule table net (≈ 400);
the index's 22 new rows (≈ 400); in the continuation, the landed parts' notes (≈ 1 800 — §13's clauses for the
kernel's cost model, the determinism fixtures and schema tests, the pipeline's B-EDGE suite, the door-4 fixture, T66-2's
dug-route case and T112-1's threshold and simulation, ≈ 690; the index's 36 rows for the other parts' decisions and J-A112.02,
≈ 1 000; §14's, §16's and §17.1's lines, ≈ 110).

**Why the unit sits below the band (not a defect; the goal yields to the guard).** §13 (33 200 words) is test
specification: every bar is a behaviour, a fixture or a threshold, and none is restated elsewhere; §14's typed
interfaces exist only here (script check: `interface StageContext`, `ConcernId`, `StrategyRegistry`, `Kernel`, `Rng`,
`EditEngine`, the strategies and the port's types are declared once in the base, in §14); §15's two matrices are the
home of the parity rows and the acceptance letters; the index keeps one row per decision (795). Cutting further would
remove content, which the guard forbids. The unit shrank by more than half nowhere as a whole; two files did — §0 (−52
%, its landing lists cut to homes by E-22) and the index (−37 %, the choice text beyond the name, held in Part A) — and
are flagged for the verifier's nuance audit.

## Elegance rulings applied, with their equivalence lists

* **E-20 — one owner-item bar convention** (§13.2, *The owner-item bars and their convention*). Equivalence: ☑ the
  registry path-test list for amendments c (kept whole in the convention's last sentence, with amendments b's records);
  ☑ the declared-shift clause for goldens (convention (4)); ☑ each item's off-form cells and bar id (convention (5)
  names V11 §3.24.0 for item 110 and V11 §3.7.4's web off form for items 105 and 107; every no-op pin keeps its id —
  T102-1, T103-3, T105-4, T106-5, T107-4, T109-6, T110-7, T111-5, T113-7); ☑ hard unless banded (1); ☑ tier and
  milestone (2, from §13.8's schedule); ☑ a staged engine's bars on hook fixtures until it lands (3); ☑ BCR-V12-13's
  `NullModelSpec` / `StatBarSpec` / conformance-list mechanism (6).
* **E-21 — one bar schedule** (§13.8, *The bar schedule*; §16's exits cite it). Equivalence: ☑ every range's tier and
  first milestone carried: M0 (b) the bent-cut bars; M1 T13-1, T14-1 but its hidden-render clause, T16-4, T23-1's
  registry test, T43-1–T43-5, T45-1, T46-1, T47-1, T54-1, T55-1, T20-7, T20-10–T20-13, T73-1–T73-10, T77-1's slice
  clause, T81-2's creation clause, T85-1, T85-2, T88-1, T65-7 (its sky-island clause from M4); M2a the T9/T10 toolkit
  bars; M2b the old list (T16-1 … T30-4, T44-1, T57-1, T70, T71, T72 at generation, T77-1's weight clauses, T88-2,
  items 63 and 68's day bars); M3a the old list (T16-3 … T31-7, T75, T76-1's cadence, T81-2's absorb clause, T85-3,
  T66-5, T72-9's dossier clause, item 101's bars, both fixtures); M3b T29-5, T68-5, T68-6, the lit-street fixture but
  its tunnel/access/Works clauses; M4 the old list; ☑ T28-12's `wings` clause from M3a and its `plan` clause from the
  plan rung's intake (now M6-P, the plan rung's milestone; file f item 567); ☑ the tiers of the old paragraphs (PR on the
  golden and hook fixtures, the sweeps nightly, T68-4 and T68-7 on five engines, B-DOSSIER-lite's ≈ 45 generations, the
  totality files nightly, T81-1 milestone, T101-6 milestone). The code-reading bars (items 33–62) had no tier in the old
  §13.8; the schedule gives them one (PR, the 10 000-face mean nightly) — an undefined edge defined.
* **E-22 — one landing table** (§0.2). Equivalence: ☑ every clause-map cell kept (items 1–101); rows added for items
  102–113 and a pointer row for file f.
* **E-23 — one list of calibratable table families** (§13.9 (4)). Equivalence: ☑ "the dossier row sets are not
  re-signed" kept as §13.9 (7), so the volumes' citations of (7) still resolve.
* **E-24 — one supersession mark** (the index). Equivalence: ☑ no row dropped (795 = 736 + 22 + the continuation's 37, ids checked by script);
  ☑ the governing row keeps the reason (Part A). Marks: J-P16 *superseded by J-A37.41*; J-A29.01 *amended by J-A50.01,
  J-A50.21*; J-A30.71, J-A30.72 *amended by J-A20.77*; J-A30.22 *amended by J-A30.24*; J-A8.21 *amended by J-A8.22*;
  J-A12.45 *amended by J-A65.31*; J-DET-2, J-DET-6, J-DET-53 (their inline "amended by amendments b" notes); J-A28.71
  *amended by item 28 (f)*; J-A16.01 *amended by J-A568.01*; J-A28.02 *superseded by J-S44*; J-A32.02 *superseded by
  J-S44, J-S45*; J-A68.05 *amended by J-C1*; J-A81.71 *amended by file f item 202*; J-A101.04 *superseded by item 110
  (d)*.
* **E-25 — one FtgSize** (§13.5). Equivalence: ☑ 'CITY' (FTG's timed preset) expressible; `RungProfile.matched.ftgSize`
  typed by it (§1.1).
* **E-26 — kept apart** (§13.6's `D5Pair` FTG arm and `FtgCapture`): unchanged; D5Pair keeps `platSeed` and
  `suburbFrame`.

No unification beyond the canon's was made; merging §13.5's and §13.7's split tables into their main tables is layout
(the same columns, the split was the amendment rounds'), not a mechanism unification.

## File f and file g items applied

**File f, applied at their sections:** 200 (§1.1 stage table); 201 (`Rung`, `matched.vg`, `frameLaw`, the village
rows); 202 (§1.1's routing and refusal sentences, the rung-at-an-epoch sentence; `StrategyRegistry.products`); 474's §16
part (M5's row, content, exits and effort line); 476's parts (T15-1, `@plat/sky`, M6-sky's row, the staged row); 482
(T28-19's volume-3 sentence); 483 (T28-1, T28-2); 484 (the underground-built bullet); 485 (T14-1's parity clause); 486
(the SettlementForge-stage bullet; §13.8's volume tiers); 487 (T101-6's transcripts; §13.4's apply-then-undo); 488
(T71-3; the convention's (6)); 489 (T101-6's second fixture); 490 (`MilestoneRecord.ux`); 491 (the golden and B-CITY seed
formulas); 492 (`ShiftRecord.seeds[].fixture`); 493 (`MilestoneRecord.d5[]`, `exitCriteria` statuses); 494 (§13.4's
session timing; §16's M2a and M3a exits); 495 (the VG rows note; B-VILLAGE and B-VG); 496 (`Baseline` fields, the band
rule, ten MFCG seeds); 497 (`ParityReport`); 498 (the carved plaza, the bent-cut search, the `NG` preset pairs); 499
(§13.6 (11)); 500 (§13.6 (10); `D5Status`, `D5Pair`, answers, verdicts); 501 (JT's calibration-run kinds; §13.7's two
rows); 502 (§13.8's volume-12 tiers and the parity-report cell); 503 (`CalibrationRun` as V12 §2.5's, `CorpusMap`,
`CorpusAdapter` research-side); 504 (§13.9 (3), (4)'s re-sign rule, (6)–(10)); 505 (the five package lines and the
dependency rule); 506 (`FabricStrategy.levelledUnits`, `terracedEdges`); 507 (`@plat/bridge-client`, `embed.html`); 508
(`PortNote`, `E_OTHER_SETTLEMENT`, the manifest and registry by pointer); 509 (the digest's staged fields by pointer);
510 (the dossier row sets list and sentence); 511 (`HostContext.customLibrary`, `custom` by pointer); 512 (the line
id); 513 (the player's audience row); 514 (`@plat/app`'s contents); 515 (T1's walls chip, the tool keys); 516
(`@plat/tables`' app tables and cells); 517 (`RoleIndex.snap`); 518 (`@plat/clerk`, its rule, `ClerkBackend`, the
clerk row); 519 (the clerk paragraph); 520 (merged into 510); 521 (`@plat/testkit`'s volume-12 entries); 522 (§15.1's
Fantasy Manor rows, §13.2's stage-3 bullet, §13.5's FM rows); 523 (S4 (c)); 524 (M6's row, effort line, gating
sentence, staged row); 525 (M3a's item-110 building part); 526 (M6-U's row); 527 (the village's line); 528 (merged
into 202); 529 (M-SF's row); 530 (the app line); 531 (M3a's oracle at depth); 532 (the content line); 533 (the rig line
and its milestone deltas); 534 (the provenance grammar); 535 (the crossing check and the later panels' files); 536 (the
reference maps' names in the deny-list); 537 (the nine statistical methods); 538 (the provider SDK row, J121-worded);
567 (M6-P's row and line, the PE deltas); 568 (the two totals); 569 (the calibration staged row); 585 (the plan soft
band's fallback). **Shared parts:** 352 (the eight plan events, in the staged list), 391 (`RealmBlock.cell.latDeg`),
396 (the realm block's comment), 428 (`@plat/tables`' plan tables), 578 (T28-3). **Also carried because their §13 or
§14 parts land in this unit:** 296 (T-V5-19–T-V5-21 for item 102's island clause), 308 (T-V5-22–T-V5-24), 317 (b)
(`@plat/evolve`), 371 (T29-4's external access), 413 (V04 BCR-10's PageUp/PageDown), 458 (T1's time card; the
timeline bar).

**File g:** items 102–110 applied like f items — their bars T102-1 … T110-7 in §13.2 (each group naming the volume tests
that take it over), their §0.2 rows and their milestones in §16; item 110 (e)'s second known-city fixture at M3a
(T101-6). Items 111–113 written at build depth: §13.2's T111-1 – T111-5, T112-1 – T112-2 and T113-1 – T113-7; §0.2's
rows; §16's release gate (item 112 (b)), item 111's milestones (M1, M2b, M3a) and item 113's replay at M6-E with the
buried former settlement at M6-U; the schedule rows.

## Conflicts resolved (27)

DIC-06 and SCOPE-C11 (tools written with their word; bars always with their number); DIC-11 (the forms catalogue at
M3b, §16); KIC-02 (`Kernel.resolve` takes a `PlatKey`; a transient arena through `readBack` and `view`); RXC-01
(`ObstacleSource` kind `room`); SCOPE-C01 (file f item 202's wording at §1.1, the port's items 3–4, D-33, J-A81.71, the
staged row); SCOPE-C02 (E-24's marks); SCOPE-C03 (J-A16.01 without 166–220; the Part A entry is a cross-part note);
SCOPE-C04 (the set described; J122's order; the two totals); SCOPE-C05 (the audience table built at M3a, in use at
M-SF); SCOPE-C06 (J-C1–J-C3 in the summary, §0.2, D-19, the index); SCOPE-C07 (§14's clerk paragraph, the staged row,
J-A101.02); SCOPE-C08 (the summary reworded to the mechanism); SCOPE-C09 (§17.1 (1), (2) check (v), D-29, J-S8);
SCOPE-C10 (FtgSize); SCOPE-C12 (IMPROVEMENTS R3, R6, R8, R11, R13; R9 and R11 as narration removed); SCOPE-C13 (§17.3,
D-22); SCOPE-C14 (D-31); SCOPE-C15 (title, D-19, J-17); SCOPE-C16 (§14's packages); V04-XCONF-2 (§14's PageUp /
PageDown precedence); V07-XCONF-1 and CANON-C01 (V-M0 right after M0, V-M1 after M4: §16, INDEX §3/§4); V09-J122-1
(§13.4's participants); V12-XCONF-1 (§13.6 (1)'s sittings); CANON-C03 (INDEX §6's decisions table); CANON-C04 (INDEX §7
with no open item).

## Renumberings and new ids

* **§13.6:** new numbered items (10) one engine for every sitting (BCR-V12-6 (b) numbered it 10), (11) stage 3's gate
  (BCR-V2-25), (12) edges. No citation of (10)–(12) existed.
* **§13.9:** the heading now reads "(built at M-CAL by volume 12; DEF-9)"; item (4) is the one list of calibratable
  families (old (4), (5) and (7)'s lists); old (6) → (5); (7) keeps the dossier-row-set exclusion, so V08's, V11's and
  V12's citations of "§13.9 (7)" still hold; new (6) evidence, (8) never changed, (9) acceptance, (10) owner rules, (11)
  edges. **Re-point:** a citation of "§13.9 (5)" for the relation templates now reads "§13.9 (4)", and one of "§13.9
  (6)" for the palette bands "§13.9 (5)" (the staged list is updated; other units: see the notes).
* **New test ids:** T102-1 – T102-4, T103-1 – T103-3, T104-1 – T104-4, T105-1 – T105-4, T106-1 – T106-5, T107-1 –
  T107-4, T108-1 – T108-4, T109-1 – T109-6, T110-1 – T110-7 (with V12's spec ids `T110b.*` kept), T111-1 – T111-5,
  T112-1 – T112-2, T113-1 – T113-7; the rig's own edge tests T-RIG-1 – T-RIG-6. None collides with an existing id
  (script check over the base, the volumes and files f and g).
* **J-T → JT** (ID-JT). The canon's gloss "the Jonckheere–Terpstra trend test" is wrong for the base: §13.7's J-T is
  "the calibration rule every table row and threshold cites"; only the rename is applied, the meaning kept.
* **A.3 → Appendix A** (ID-APPX): the section is unnumbered.
* **New index rows:** J-C1 – J-C4, J-S44 – J-S47, J-A73.06, J-A77.06, J-A102.01, J-A110.01, J-A111.01, J-A112.01,
  J-A113.01, J-A201.01, J-A505.01, J-A505.02, J-A509.01, J-A568.01 – J-A568.03 (their Part A entries below); J-A112.02
  (this part's threshold for T112-1); and, entered for the other parts' decisions under J122 as their editors report
  them, the determinism part's J-A113.61, J-A110.61, J-DET-55, J-A344.61, J-A101.78, J-DET-56, the model part's
  J-A110.21, J-A206.21, J-P51, J-A111.21, J-A77.21, J-P52, J-P53, J-A106.21, J-A113.21, J-A110.22, J-P54, the kernel
  part's J-K37, the pipeline part's J-P55, J-A102.41, J-P56, J-A110.41 – J-A110.43, J-A101.42, J-A26.45, J-A111.41,
  J-A109.41, J-A64.45, J-A12.48, J-A68.43, J-A15.43, J-A58.44, and the rendering part's J-R57 – J-R59 (the index's
  convention: J-A⟨item⟩.⟨n⟩ with the seat's digit, else the area family; the index header's J-P now reads "pipeline and
  model", which its §2 rows J-P47 – J-P54 need). Every id checked against the whole set: none collides.
* **§0.2's columns** are now item | home — the mechanism | clause map (E-22).

## Wiring gaps closed

**In the continuation:** T112-1's threshold — item 112 (a)'s "table threshold" had no cell (§8.2 deferred it to §13's
check and §13 to §8.2): now the cell `cvd.minDeltaE2000` (ΔE2000 8, provenance `own`) of the style sheets' check row in
`@plat/tables`, read by T112-1, with the simulation method named (Machado, Oliveira and Fernandes 2009, full severity;
§17.1 (8)) and the failure's report (pair, variant, sheet) — J-A112.02; the stage-2 type homes in §14 (`HoodPlace` §2.7,
`TypedBoundary` and `FabricStrategyId` §2.5, as the model now declares them); `@plat/sky`'s `skyUnitInput`
(G-unitinput, the name V05 gives it); three uses of "lot" for our own concept made "plot" (G-lot: T72-4, §15.2's O10
row, the delegated decisions' district paragraph); V01's cites in the `V1-x.y` form written `V01 §x.y` (G-cite, seven).
Found and routed (cross-part notes): `Invariant` is used by `KernelTx.expect` and
`StageDecl.invariants` and declared nowhere (§5.3's); `D5PairStaged` and `CustomRecordRef`, which §13.6 and §14 cite as
V12 §2.8's and V08 §2.8's, are written there as unnamed shapes.

W-DOS-05 (`DossierDigest.government.previous` dropped — no reader in the set; J-A73.06); W-DOS-06
(`RealmBlock.mPerRealmUnit` dropped — the host client's `realmBlockFrom` converts the scale; J-A77.06); W-HOOK-01 (the
staged list's *built by* column); W-PKG-01 (`@plat/cli`, J-A505.02); W-FLD-10 (`CorpusMap.populationEstimate` dropped —
V12 §2.9's corpus index carries no population and no reader exists); KWG-08 (M4's exit names the extreme-growth memory
measurement). Also written: the staged packages' importer (`@plat/api`'s worker host registers them, J-A505.01); the
`ContentProvider` door's fixture test (§13.2's stage contract tests, J-S46); every extension point with its implementer
(§14); the takeover table (W-05, CO-06).

## Edges defined (the 8 UNDEFINED of edges.md)

§13.3 E6 (every rung: the base's three rungs in the goldens, B-CITY's sweep 1 500 to the cap, the village rungs' goldens
volume 7's B-VILLAGE); §13.5 E8 (the baseline file append-only, missing rows stop the CLI, reports reproducible;
T-RIG-1, T-RIG-2); §13.6 E4 and E8 (a degraded pair rendered as delivered and noted, an undecodable capture dropped
before render, a short panel never passing; the record written once and appended; T-RIG-3); §13.7 E4 (empty or
degenerate measurement units skipped and counted, `notApplicable` never pass; T-RIG-4); §13.8 E1 and E5 (whole-tree
jobs, empty suites fail, contradictory records fail naming both; T-RIG-5); §13.9 E1 (no admissible frame: every column
closes `fixed`, a record with no pack; T-RIG-6). Each is scheduled (§13.8's T-RIG row).

## Open findings closed (73)

RC-01 (§1.2 and the summary cite §12.3/§12.5); RC-02, RC-03 (D-5, §16 cite §13.6 (7), (8)); RC-04 (the staged list the
one list; §16 and the summary point to it); RC-05 (§13.5 the matched sizes' statement, D-31 cites it; §1.1 holds the
`ladder.json` data); RC-06 (§0.3); RC-07 (§1.7 cites §17.1 (3)); RC-08 (§16 alone states effort; D-20 and the summary
cite it); RC-09 (§1.1 carries file f item 202's one wording, the port and D-33 cite it); RC-10 (§14 the surfaces, UI and
clerk; §7.1 the tools); RC-11 (§17.1 (1)); RC-12 (§1.4 cites §7.6); RC-13 (§1.2 cites §8.4); RC-14 (§13.4 cites §8.2);
RC-15 (the typed declarations are §14's only — the script finds each once in the base — so §14 is their home; the
event-kind list replaced by a pointer to §7.1; the kernel's services cited to §3.3–§3.4); RC-16 (§1.4's adopted cells cut
to pointers); RC-17 (E-21); RC-18 (§1.1's layers column data only, the rules at II.6 (2), II.7.1, II.7.5); SCOPE-C01 –
SCOPE-C16 (above); EL-01 – EL-04, EL-07, EL-08 (E-20 – E-25); EL-05, EL-06 (narration removed); EL-09 (E-26); W-01
(`ContentProvider` kept with its fixture test and call points named, J-S46; the call points are the pipeline editor's
W-IF-07); W-02 (`CorpusAdapter` implemented research-side by V12, §13.9); W-03 (every digest field consumed per
wiring.md, `previous` and `mPerRealmUnit` dropped); W-04 (§14's extension points name their implementers); W-05
(the takeover table); W-06 – W-10 (both ends present; unchanged); ID-01 – ID-08 (the id rulings); CO-01 – CO-12
(the cohesion checks: the set described, stage table, packages, §15's tags, J122's order, INDEX, D-20/D-25/D-35,
volume test families, §17.1 and §17.4 with their volume rules, Appendix A's volume grades, §0.2's g and f rows, J121
subjects, the context vector named at `DistrictContext`, `BlockContext` and `RungProfile`, the owner questions).

## Hand-offs routed here (18), with their disposition

| hand-off | what it asks of the base | disposition |
|---|---|---|
| V12:X-V12-12 | §16's M3a row carries item 110's base parts and K2; a row names raised-way generation's milestone; §13.2's conformance clauses listed | closed here: §16 M3a; §13.8's volume-12 tiers (K2); §13.2 convention (6) |
| V12:X-V12-15 | a `BenchBarDef` for every bar a register line names (the base's T16-4 among them) | closed at its destination: V11's seat registers T16-4 (V11 §8); the base's bar id stands (schedule row M1) |
| V12:X-V12-19 | V04's and V06's register lines, file f's pointers | V04, V06 and the determinism/model editors (no scope text) |
| V02:X16, X23, X28 | item 110's deck table, tiers over epochs, the deck-plot `landmark` | the model editor (§2.7's deck-plot record) and the pipeline editor (§4.11's fate rule, §10.2); V11's deck table; no scope text |
| V06:X1, X13, X29, X33, X34, X38, X41, X42 | file f items 209, 264, 275, 336, 443, 574, 575, BCR-V6-24 – BCR-V6-28 and the DR rows of item 110's dossier inputs | the model, pipeline and determinism editors; §16's M6-E row cites V06 §8 |
| V07:FL-4 | the critique ids left in V07 | V07's editor |
| V11:X-V12-1, X-V11-16, X-V11-17 | the preset entries, companion rows for V01, V03, V04, V06, V07, V08, V09, V12 and file f | the named volumes' editors; §14's `@plat/tables` line and §13.9 (3)'s historical packs agree |

## Landed parts' notes folded (the continuation)

Every note the five landed base parts addressed to this part, checked against the files on disk; each is present at the
place named (the run of 2026-09-29 had folded most of them before it stopped; the rest were finished here).

| from | note | where it now stands |
|---|---|---|
| model | §1.1 declares `Rung` | §1.1's `RungProfile` block (`type Rung`) |
| model | T77-1's removed-partner clause (J-RM8) | §13.2 T77-1's slice clause |
| model | item 110 (f)'s frame clause for raised ways, retaining walls and deck slots (J-RM12) | §13.2 T110-1, T110-2, T110-5 |
| model | the registry path test covers `HistoryRecord`, `WaterBody.spring`, `fedBy`, `Enceinte.arcs`/`stretchClass`, `Gate.mouth` | §13.2 *Document tests* |
| kernel 28 | §13.1's constructive set gains §3.11's cases | §13.1 *the kernel at its limits (§3.11)* — by pointer to §3.11's rows, their home (principle (1)) |
| kernel 29 | the cost-model test bounds `work` and the four edge counts per commit by the touched faces | §13.2 *Batch cost* |
| kernel 30 | `Kernel.resolve(ref, key)` takes a `PlatKey`; a transient arena through `readBack` and `view` | §14's `Kernel` |
| kernel 31 | the extreme-growth memory measurement | §16 M4's exits |
| determinism | the bug-abort fault injection, "`bugs` empty", one degenerate input per failure class | §13.1 |
| determinism | §6.5 (9)'s cross-host, replay = session and truncation tests per base rung and the METROPOLIS cap | §13.2 |
| determinism | the empty-edit, lock-pin-declaration, edit-boundary fixtures; the report-schema, budget-row and control-registry tests | §13.2 (*B-EDIT*, *Document tests*) |
| determinism | `migrate` returns `{ doc, diff: UpgradeDiff }` | §14's `EditEngine` |
| determinism | tools with their words (ID-TOOL) in §13.8 and §16 | scanned clean; two stragglers fixed (§0.2's row 108 cites "DR9 and the institution ladders", J-A111.01 "T2 `ground`'s spring flag") |
| determinism | decisions 1–6 as index rows | J-A113.61, J-A110.61, J-DET-55, J-A344.61, J-A101.78, J-DET-56 |
| pipeline | §1's "What the base supports" stays at §4.2 S0 | §1 holds none (nothing to change) |
| pipeline | B-EDGE (EP-01 – EP-19 and the combination cells, hard, 0 per 1 000) | §13.2 *The edge suite B-EDGE*; §13.8's schedule row |
| pipeline | a fixture `ContentProvider` for door 4 (W-IF-07) | §13.2 *The host-content door* (J-S46) |
| pipeline | items 111's and 113's bars | §13.2 T111-1 – T111-5, T113-1 – T113-7 |
| pipeline | T66's over-long dug route (EDGE-PIPE-02) | §13.2 T66-2 |
| pipeline | §13.5's wealth-bands row points to §4.5 for MFCG's ward-class shares | §13.5's wealth-bands row |
| pipeline | `StrategyRegistry.hooks`, `products`; `AccessPassStrategy`; `@plat/evolve` | §14 |
| pipeline | its decisions (section 4) | J-P55, J-A102.41, J-P56, J-A110.41 – J-A110.43, J-A101.42, J-A26.45, J-A111.41, J-A109.41, J-A64.45, J-A12.48, J-A68.43, J-A15.43, J-A58.44 |
| rendering | `ObstacleSource` kind `room` | §14's `ObstacleSource` |
| rendering | `LabelTable`'s `pinDirCdeg`, `pinLines` if §14 lists its columns | §14 lists none (cites §8.1); nothing to add |
| rendering | the `LiveLayerProvider` registrations | §14 cites §8.2's list, naming `live.history` and `live.people` |
| rendering | PageUp/PageDown; T1's time card, the timeline and history panel; `@plat/clerk` | §14 |
| rendering | T-ER-01 – T-ER-21 registered by pointer | §13.2 *The rendering, label and export edges* |
| rendering | item 112's style check with its table threshold and id | §13.2 T112-1 with `cvd.minDeltaE2000` (above) |
| rendering | the band entry stops' B-ZOOM pop check | §13.4 *B-ZOOM* |
| rendering | item 474 (d)'s M5 row and effort line; the daylight term's measurement at M2b; item 568's totals | §16 |
| model, kernel, rendering | their decisions under J122 | J-A110.21, J-A206.21, J-P51, J-A111.21, J-A77.21, J-P52, J-P53, J-A106.21, J-A113.21, J-A110.22, J-P54 (model's J-RM3, 5–13; J-RM1, 2, 4, 14–16 are editorial and enter no row); J-K37 (KWG-01); J-R57 – J-R59 (the removal rulings) |

## Owner questions marked answered

J-A68.81 (J-C1), J-A69.82 (J-C2), the item-72 surplus-pressure reading (J-C3): the summary, §0.2's rows 68, 69 and 72,
D-19, J-A68.05 and the index carry the decisions and no "put to the owner" wording. J122's other points: interface
languages follow SettlementForge (§14's accessibility bullet); the licence for users' maps follows SettlementForge's
terms (§17.3, D-22, §0.2 row 21); simultaneous editing not offered (the summary); word lists and symbol artwork are V11's
authoring plan. J121 subjects read as inputs: hosting, plans, save limits and backups (§1.7, D-21), the public name
(title, D-19, J-17), the AI provider, key and model tier (§14's clerk paragraph, §17.4's SDK row), the assistant (§14),
the first-five-minutes participants (§13.4, J122).

## Where the canon was not followed literally, and why

* **RC-15 and the REFERENCE rows for §14** (SCOPE-0576 – SCOPE-0650): the linker pointed §14's package lines, interface
  declarations, tools table, interaction contract, input scheme and accessibility bullet at targets such as "pipeline
  §14", "rendering §14", "determinism §14", "V09 §7.1" (V09's bars) and "V09 §14", which do not state them; RC-10 names
  §14 the home of the surfaces, the UI and the clerk, and S1 makes the reference UI the base's (built inside its
  milestones). They stay at §14 with their pointers; replacing them would lose the only statement.
* **SCOPE-0151, SCOPE-0153** (§1.1's dossier refusals, pointed at §7.7 item 15): file f item 202 writes this sentence at
  §1.1 and SCOPE-C01 names §1.1 among the places carrying the one wording; kept, and D-33, §14 and the staged row cite it.
* **G-lot:** applied to our own concept (a plot cut, hinterland plots, the suburb regime's plots); the references' own
  "lots" (MFCG's lots drawn as buildings, FTG's growth lot, NG's lot leaves, MFCG's lots per block) stay, as MC-01's
  "outside quotations" requires — renaming them would change what the reference did.
* **ID-JT's gloss** (above).

## Cross-part notes (what another unit must change; not edited here)

* **Model (§2):** declare `ProductDecl` (V07 §2.1's type) at the base's home if S3/MC-11 applies (the base registers
  'base'); `StrategyRegistry.products` in §14 cites it.
* **Kernel (§3.3–§3.4):** KIC-02's service list must agree with §14's `Kernel` — `resolve` PlatKey-only, a transient
  arena read through `readBack` and `view`.
* **Pipeline:** W-IF-07 — §4.2 S2, §4.7 S10b and §10.3 name the `ContentProvider` call points (§14 keeps door 4 and
  §13.2 holds its fixture test, J-S46); file f item 202's §4.11, §4.12 and PART III parts; PART III item 5's village
  bands per BCR-V7-1 ([1, 80), [80, 400), [400, 1 500)); G-lot in §4.6 and §4.7 ("lot cut" → "plot cut"; §4.9's hinterland
  "lots" → "plots"); rename J-T → JT (4 hits); item 111's base parts at M1 (S0–S1) and M2b (the water pull, the water
  term, wells) as §16 schedules them; §4.11's history replay (item 113) lands at M6-E.
* **Determinism:** §7.7 item 1's never-read list gains `powerStructure.previousGovernments` (W-DOS-05); §7.7 item 15
  carries file f item 202's wording (the refusal only while no village product is registered); the forms catalogue's
  milestone is §16's M3b (DIC-11); DR24's custom-content inputs (file f item 511's §7.7 part); §7.1 T2 `ground`'s spring
  flag (item 111) and the tools' layer words (L0 intent … L4 finish) as §14 writes them.
* **Rendering:** §8.2 names the deficiency-contrast threshold cell T112-1 reads, and the checked variants and second cues
  of every shipped family ship at M3b (`hatched` at M5) as §16 places them; §9.2 cites `ObstacleSource` kind `room`
  (RXC-01); §8.3's plan-draw row's structural-face clause (file f item 482's §8.3 part); §12's budgets point to V07 §6
  for the village rungs (file f item 495); "first paint" → "first map" in §8/§12 (G-firstmap).
* **Rationale (Part A):** entries for the 22 new index rows, as follows. J-C1: chose to keep the default ink map's gentle
  cast shadows in its own ink, only the `MFCG` preset drawing none, over MFCG's raised look on the default, because the
  owner's item 68 makes shadows follow real heights on every map and J-A68.81's design already did (J122 delegation).
  J-C2: chose `ink`'s plate chroma 20–30 over the corpus middle 43, because the default stays in MFCG's restrained family
  and 43 is the `parchment` variant's aim (RIC-01; J122). J-C3: chose to keep item 72's surplus-pressure reading as
  designed over reopening it, because it reads the owner's words directly and changes no behaviour (J122). J-C4: chose to
  leave open a raised-way span whose strip lies wholly on hinterland faces (reason `country`) at every rung over a
  rung-specific rule, because realism: country arches stand open (V07-XCONF-2). J-S44: chose to fold every amendment's
  facts into the summary's body by subject over appended per-round paragraphs, because the summary describes the design,
  not its history (EL-06). J-S45: chose one landing table (item, home, clause map) over three per round, because one
  discipline and one column set serve all (E-22). J-S46: chose to keep `ContentProvider` (door 4) as a third party's
  extension point with a fixture test over removing it, because it costs nothing unused and serves hosts other than
  SettlementForge, which enters through the port (J121). J-S47: chose one schedule table over per-paragraph and
  per-milestone lists, because one statement of when a bar runs cannot drift (E-21). J-A73.06: chose to drop
  `government.previous` over naming a reader, because no mechanism of the set reads it and inventing one is new design;
  §7.7 item 1 lists the key as never read. J-A77.06: chose to drop `RealmBlock.mPerRealmUnit`, because the host client
  already turns the scale into distances and no module reads it. J-A102.01: chose `T⟨item⟩-⟨n⟩` ids for items 102–113
  with each group naming the volume tests that take it over, because the base's bar family is that form and principle
  (10) needs the takeover named. J-A110.01: chose to keep volume 12's `T110b.*` spec ids for item 110's tendency bars
  beside T110-1 – T110-7, because V12's bar map already registers them as base bars. J-A111.01: chose M1 for the oasis and
  spring (with the S0–S1 site features), M2b for the water pull and term (with the field) and M3a for T2's spring flag
  (with the ground tool), because each lands with the stage it belongs to. J-A112.01: chose the public release inside
  SettlementForge as the trial's gate, its timing SettlementForge's, because J121 makes the product's release
  SettlementForge's and item 112 (b) asks the trial before it. J-A113.01: chose M6-E for the replay and M6-U for the
  buried former settlement, because the replay is volume 6's engine and the ruins are volume 4's layer. J-A201.01: chose
  to carry the village rows' values in §1.1's table as file f item 201 rules, with volume 7 §2.1 giving households and
  dwellings, over a pointer only, because `ladder.json` is the base's table. J-A505.01: chose `@plat/api`'s worker host as
  the one importer of the staged packages over ground-package imports, because the ground must never import a staged
  layer and something must register them. J-A505.02: chose a separate `@plat/cli` over hosting `plat clerk` in
  `@plat/api`, because `clerk` depends on `api` and the reverse import would invert the chain. J-A509.01: chose to name
  the digest's staged fields in §14 member by member with volume 8 §2.5 and §2.8 their type home over copying the types,
  because one declaration serves both. J-A568.01: chose to split stage 3's 22.5–32.5 pw as 2–2.75 inside M3a and
  20.5–29.75 staged, and to carry volume 9's and volume 12's out-of-row shares on one line, because item 568 forbids
  counting a delta twice and the rows must sum to the total. J-A568.02: chose to place volume 11's +2.5–4 pw as C2's
  file-g share at M2b and C3b at M3a (by subtraction from V11 §8) and to scale the calendar to about 110–150 weeks, over
  leaving them unplaced. J-A568.03: chose to price the base mechanisms of items 102–113 by absorption into named lines
  over new line widenings, because they are rows and terms read by stages the lines price (PLAUSIBLE until measured).
  **Changed entries:** J-A16.01 drops "the total 166–220" (SCOPE-C03); J-A29.25 reads "`external` for a walk-out or where
  no ground wing is storeyed (§2.6 *Basements*; its door V03 §3.7.1's), else the programme row's `basementAccess` at
  `builtBand`" and "an `external` basement's outside stair a door at the point §2.6's plan rung step 3 gives (V03
  §3.7.1)" (BCR-V2-33 (b), file f item 371); J-A28.02 drops "(R11)" (ID-R); the marks of E-24 on their entries.
* **INDEX.md:** the assembler places `docs/validation/coherence/new/index/03-dependency-graph.md`,
  `04-combined-build-order.md`, `06-owner-questions.md` and `07-reconciliation.md` over §3, §4, §6 and §7 (each starts
  with its heading line exactly); the intro's "(file g, items 102–110)" reads "items 102–113"; §1's table stands.
* **Volumes:** V01 (T-V1 tests name the base bars they take); V02 (T-V2-31 cites §13.5's Fantasy Manor rows, which file f
  item 522 places in the base); V03 (§4.5 cites §14's PageUp/PageDown precedence); V04 (§5.1 cites the same; T-V4 name
  the base bars they take); V05 (T-V5-19 – T-V5-21 cite T102-2); V06 (§7's tests name each base bar and clause they take
  — the takeover table's first row; item 113's replay cost inside M6-E's price or as a delta §16 then carries); V07 (§2.1
  cites §1.1's rows; §8's V-M0 slot right after M0 and V-M1 after M4, J122); V08 (drop `government.previous` from its
  digest and adapter; `mPerRealmUnit` stays only in its host-side `RealmPlacements`); V09 (the release trial's running,
  item 112 (b)); V10 (`plat clerk` in `@plat/cli`, J-A505.02); V12 (J-T → JT, 6 hits; M-CAL after M6-sky in J122's
  order); every volume listing the published methods it adopts (§17.1 (8)'s rule) and its production dependencies
  through its base change requests (§17.4).

* **Continuation notes (2026-10-02/03), from folding the landed parts' notes:**
  * **Rationale (Part A):** entries for the 36 rows entered for the other parts' decisions, each from its editor's report
    verbatim as "chose X over Y because Z": J-A113.61, J-A110.61, J-DET-55, J-A344.61, J-A101.78, J-DET-56 ← the
    determinism report's *Decisions taken under J122* 1–6; J-A110.21, J-A206.21, J-P51, J-A111.21, J-A77.21 with J-P52,
    J-P53, J-A106.21, J-A113.21, J-A110.22, J-P54 ← the model report's J-RM3, J-RM5, J-RM6, J-RM7, J-RM8, J-RM9, J-RM10,
    J-RM11, J-RM12, J-RM13; J-K37 ← the kernel report's KWG-01 ruling; J-P55, J-A102.41, J-P56, J-A110.41 – J-A110.43,
    J-A101.42, J-A26.45, J-A111.41, J-A109.41, J-A64.45, J-A12.48, J-A68.43, J-A15.43, J-A58.44 ← the pipeline report's
    section 4, bullet by bullet (its last bullet split into its six constants); J-R57 – J-R59 ← the rendering report's
    removal rulings. And J-A112.02: chose to simulate each deficiency by Machado, Oliveira and Fernandes' model at full
    severity and to fail a legend pair below ΔE2000 8 (`cvd.minDeltaE2000`) over a hue-only or per-family threshold,
    because 8 is the contrast matrix's own floor for two area fills that meet (§8.2) and item 112 (a) asks a table
    threshold the style check reads, the second cue carrying the meaning where colour alone falls short.
  * **Determinism (§5.3):** declare the `Invariant` type, which `KernelTx.expect` (§3.3) and `StageDecl.invariants` (§4.12)
    use and nothing declares (the kernel's note 18): its name, its scope among §5.3's five (`batch`, `stage`, `save`,
    `load`, `ci`), hard or soft (§5.3: a hard failure aborts the batch, a soft one goes to the report) and its check, whose
    result is §5.4's report row `{ name, scope, pass, count }`.
  * **Rendering:** §8.2's "against its table threshold" names T112-1's cell `cvd.minDeltaE2000` (ΔE2000 8) of the style
    sheets' check row; §8.2 and §11.3 name the unions `Role` (§8.2's role list) and `BridgeMessage` (§11.3's messages),
    which §14's type map cites as theirs.
  * **V11:** the style sheets' check row holds the cell `cvd.minDeltaE2000` = 8 (provenance `own`; reader §13.2's T112-1).
  * **V12:** §2.8 names its five panel variants `type D5PairStaged = …` (FM, VG, DW, AB, SOLO), the union §13.6's
    `D5Pair` closes with.
  * **V08:** §2.8 names the object it declares as `DossierInstitution.custom` `CustomRecordRef`, which §14 cites.
  * **V05:** the unit-run view is `skyUnitInput(doc, island)` returning `SkyUnitInput` (G-unitinput), as §14's `@plat/sky`
    line names it (the V05 rewrite's parts already use it).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane; re-run in the continuation on the final files):** every section file starts with its
heading line exactly as in the base; every table row of the fourteen files has its header's cell count (three hits are
lines of TypeScript unions inside code blocks); every `§x.y` pointer resolves to a heading of the six base parts' new
text and every `Vnn §x.y` to a volume heading or numbered paragraph; the index holds 795 rows with 795 distinct ids and
every one of the 736 old ids, and its 59 new ids collide with nothing in the set; the new test ids collide with none in
the set; §16's rows sum to the first total (221.5–300.5) and its staged lines to 170.75–238.75 and the whole program to
392.25–539.25; the retired-term patterns of the canon's glossary find no hit outside quotations of the references (one
G-M6U hit is §16's *runs beside* cell M6, volume 2's stage 3, as the rule intends); every type of §14's type map is
declared at the home it names except `Role` and `BridgeMessage` (routed to rendering); all 1 684 inventory ids appear in
the mapping table; the word counts of *Sizes*. The bench script `docs/validation/bench/doc_checks.py`, run over
the fourteen files with the six base parts' headings, is NOT authoritative in this checkout (captures/ and four research
folders are absent; it says so) and is recorded as **provisional**: C1 1 hit and C4 1 hit, both reviewed in the allow
file; C2 0; S1 0; C3 363 hits, 96 unreviewed, every one a generic phrase ("byte identical to the base", "stage 2 and the
whole") or a run of section numbers, none a copied list, name or sentence; S2 14, each a volume pointer (V07 §3.12, V12
§3.14, V01 §3.15, V10 §2.11 …) the base-only heading set cannot hold, every one resolved by this lane's volume check.
**PLAUSIBLE:** the source split of the words removed; the designs added (the g bars, the edges' outcomes, the pricing
placements J-A568.01 – J-A568.03, the calendar estimate), each until the milestone §16 names executes it.

## Mapping table

Every inventory id of `docs/validation/coherence/inventory-scope.json` → its new home or disposition (generated by
script from the inventory's lines and the canon's roles; `02-summary` lines keep the summary's plain words with their
pointer, which is the summary's job).

| inventory id | new home or disposition |
|---|---|
| SCOPE-0001 | 01-title: kept (defined term) |
| SCOPE-0002 | 01-title: banner kept as is (principle 8) |
| SCOPE-0003 | 01-title: kept (defined term) |
| SCOPE-0004 | 01-title title block |
| SCOPE-0005 | 01-title title block |
| SCOPE-0006 | 01-title title block |
| SCOPE-0007 | 02-summary: plain-words line pointing to its home |
| SCOPE-0008 | 02-summary: plain-words line pointing to its home |
| SCOPE-0009 | 02-summary: plain-words line pointing to its home |
| SCOPE-0010 | 02-summary: plain-words line pointing to its home |
| SCOPE-0011 | 02-summary: plain-words line pointing to its home |
| SCOPE-0012 | 02-summary: plain-words line pointing to its home |
| SCOPE-0013 | 02-summary: plain-words line pointing to its home |
| SCOPE-0014 | 02-summary: plain-words line pointing to its home |
| SCOPE-0015 | 02-summary: plain-words line pointing to its home |
| SCOPE-0016 | 02-summary: plain-words line pointing to its home |
| SCOPE-0017 | 02-summary: plain-words line pointing to its home |
| SCOPE-0018 | 02-summary: plain-words line pointing to its home |
| SCOPE-0019 | 02-summary: plain-words line pointing to its home |
| SCOPE-0020 | 02-summary: plain-words line pointing to its home |
| SCOPE-0021 | 02-summary: plain-words line pointing to its home |
| SCOPE-0022 | 02-summary: plain-words line pointing to its home |
| SCOPE-0023 | 02-summary: plain-words line pointing to its home |
| SCOPE-0024 | 02-summary: plain-words line pointing to its home |
| SCOPE-0025 | 02-summary: plain-words line pointing to its home |
| SCOPE-0026 | 02-summary: plain-words line pointing to its home |
| SCOPE-0027 | 02-summary: plain-words line pointing to its home |
| SCOPE-0028 | 02-summary: plain-words line pointing to its home |
| SCOPE-0029 | 02-summary: plain-words line pointing to its home |
| SCOPE-0030 | 02-summary: plain-words line pointing to its home |
| SCOPE-0031 | 02-summary: plain-words line pointing to its home |
| SCOPE-0032 | 02-summary: plain-words line pointing to its home |
| SCOPE-0033 | 02-summary: plain-words line pointing to its home |
| SCOPE-0034 | 02-summary: plain-words line pointing to its home |
| SCOPE-0035 | 02-summary: plain-words line pointing to its home |
| SCOPE-0036 | 02-summary: plain-words line pointing to its home |
| SCOPE-0037 | 02-summary: plain-words line pointing to its home |
| SCOPE-0038 | 02-summary: plain-words line pointing to its home |
| SCOPE-0039 | 02-summary: plain-words line pointing to its home |
| SCOPE-0040 | 02-summary: plain-words line pointing to its home |
| SCOPE-0041 | 02-summary: plain-words line pointing to its home |
| SCOPE-0042 | 02-summary: plain-words line pointing to its home |
| SCOPE-0043 | 02-summary: plain-words line pointing to its home |
| SCOPE-0044 | 02-summary: plain-words line pointing to its home |
| SCOPE-0045 | 02-summary: plain-words line pointing to its home |
| SCOPE-0046 | 02-summary: plain-words line pointing to its home |
| SCOPE-0047 | 02-summary: plain-words line pointing to its home |
| SCOPE-0048 | 02-summary: plain-words line pointing to its home |
| SCOPE-0049 | 02-summary: plain-words line pointing to its home |
| SCOPE-0050 | 02-summary: plain-words line pointing to its home |
| SCOPE-0051 | 02-summary: plain-words line pointing to its home |
| SCOPE-0052 | 02-summary: plain-words line pointing to its home |
| SCOPE-0053 | 02-summary: plain-words line pointing to its home |
| SCOPE-0054 | 02-summary: plain-words line pointing to its home |
| SCOPE-0055 | 02-summary: plain-words line pointing to its home |
| SCOPE-0056 | 02-summary: plain-words line pointing to its home |
| SCOPE-0057 | removed: narration (the validation records keep it) |
| SCOPE-0058 | 03-s0 §0.1 |
| SCOPE-0059 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0060 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0061 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0062 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0063 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0064 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0065 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0066 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0067 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0068 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0069 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0070 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0071 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0072 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0073 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0074 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0075 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0076 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0077 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0078 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0079 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0080 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0081 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0082 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0083 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0084 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0085 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0086 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0087 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0088 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0089 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0090 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0091 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0092 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0093 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0094 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0095 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0096 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0097 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0098 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0099 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0100 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0101 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0102 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0103 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0104 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0105 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0106 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0107 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0108 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0109 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0110 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0111 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0112 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0113 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0114 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0115 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0116 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0117 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0118 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0119 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0120 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0121 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0122 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0123 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0124 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0125 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0126 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0127 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0128 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0129 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0130 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0131 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0132 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0133 | 03-s0 §0.2: row kept; its landing list cut to the home (E-22) |
| SCOPE-0134 | 03-s0 §0.3 |
| SCOPE-0135 | 03-s0 §0.3 |
| SCOPE-0136 | 03-s0 §0.3 |
| SCOPE-0137 | 03-s0 §0.3 |
| SCOPE-0138 | 05-s1 §1 intro |
| SCOPE-0139 | 05-s1 §1.1 |
| SCOPE-0140 | 05-s1 §1.1 |
| SCOPE-0141 | 05-s1 §1.1 |
| SCOPE-0142 | 05-s1 §1.1 |
| SCOPE-0143 | 05-s1 §1.1 |
| SCOPE-0144 | 05-s1 §1.1 |
| SCOPE-0145 | 05-s1 §1.1 |
| SCOPE-0146 | 05-s1 §1.1 |
| SCOPE-0147 | 05-s1 §1.1 |
| SCOPE-0148 | 05-s1: replaced by a pointer to rendering §12 |
| SCOPE-0149 | 05-s1 §1.1 |
| SCOPE-0150 | 05-s1 §1.1 |
| SCOPE-0151 | 05-s1 §1.1: kept, the one wording of file f item 202 (SCOPE-C01) |
| SCOPE-0152 | 05-s1 §1.1 |
| SCOPE-0153 | 05-s1 §1.1: kept, the one wording of file f item 202 (SCOPE-C01) |
| SCOPE-0154 | 05-s1 §1.1 |
| SCOPE-0155 | 05-s1 §1.2 |
| SCOPE-0156 | 05-s1: replaced by a pointer to rendering §1.2 |
| SCOPE-0157 | 05-s1 §1.2 |
| SCOPE-0158 | 05-s1 §1.2 |
| SCOPE-0159 | 05-s1 §1.2 |
| SCOPE-0160 | 05-s1 §1.3 |
| SCOPE-0161 | 05-s1: replaced by a pointer to kernel §2.2 |
| SCOPE-0162 | 05-s1: kept |
| SCOPE-0163 | 05-s1 §1.4 |
| SCOPE-0164 | 05-s1: kept |
| SCOPE-0165 | 05-s1: kept |
| SCOPE-0166 | 05-s1: kept |
| SCOPE-0167 | 05-s1: kept |
| SCOPE-0168 | 05-s1: kept |
| SCOPE-0169 | 05-s1: kept |
| SCOPE-0170 | 05-s1: kept |
| SCOPE-0171 | 05-s1: kept |
| SCOPE-0172 | 05-s1: kept |
| SCOPE-0173 | 05-s1: kept |
| SCOPE-0174 | 05-s1: kept |
| SCOPE-0175 | 05-s1: kept |
| SCOPE-0176 | 05-s1: kept |
| SCOPE-0177 | 05-s1: kept |
| SCOPE-0178 | 05-s1: kept |
| SCOPE-0179 | 05-s1: kept |
| SCOPE-0180 | 05-s1: replaced by a pointer to determinism §7.6 |
| SCOPE-0181 | 05-s1 §1.4 |
| SCOPE-0182 | 05-s1: kept |
| SCOPE-0183 | 05-s1: replaced by a pointer to pipeline §4.11 |
| SCOPE-0184 | 05-s1: replaced by a pointer to pipeline PART II |
| SCOPE-0185 | 05-s1: replaced by a pointer to pipeline PART III |
| SCOPE-0186 | 05-s1: kept |
| SCOPE-0187 | 05-s1: kept |
| SCOPE-0188 | 05-s1: kept |
| SCOPE-0189 | 05-s1: kept |
| SCOPE-0190 | 05-s1: kept |
| SCOPE-0191 | 05-s1: kept |
| SCOPE-0192 | 05-s1: kept |
| SCOPE-0193 | 05-s1: kept |
| SCOPE-0194 | 05-s1: kept |
| SCOPE-0195 | 05-s1: kept |
| SCOPE-0196 | 06-s13 §13 intro |
| SCOPE-0197 | 06-s13 §13.1 |
| SCOPE-0198 | 06-s13 §13.1 |
| SCOPE-0199 | 06-s13 §13.1 |
| SCOPE-0200 | 06-s13 §13.1 |
| SCOPE-0201 | 06-s13 §13.1 |
| SCOPE-0202 | 06-s13 §13.1 |
| SCOPE-0203 | 06-s13 §13.1 |
| SCOPE-0204 | 06-s13 §13.1 |
| SCOPE-0205 | 06-s13 §13.1 |
| SCOPE-0206 | 06-s13 §13.1 |
| SCOPE-0207 | 06-s13 §13.1 |
| SCOPE-0208 | 06-s13 §13.1 |
| SCOPE-0209 | 06-s13 §13.1 |
| SCOPE-0210 | 06-s13 §13.1 |
| SCOPE-0211 | 06-s13 §13.1 |
| SCOPE-0212 | 06-s13 §13.1 |
| SCOPE-0213 | 06-s13 §13.1 |
| SCOPE-0214 | 06-s13 §13.1 |
| SCOPE-0215 | 06-s13 §13.2 |
| SCOPE-0216 | 06-s13 §13.2 |
| SCOPE-0217 | 06-s13 §13.2 |
| SCOPE-0218 | 06-s13 §13.2 |
| SCOPE-0219 | 06-s13: replaced by a pointer to rendering §12 |
| SCOPE-0220 | 06-s13 §13.2 |
| SCOPE-0221 | 06-s13 §13.2 |
| SCOPE-0222 | 06-s13 §13.2 |
| SCOPE-0223 | 06-s13 §13.2 |
| SCOPE-0224 | 06-s13 §13.2 |
| SCOPE-0225 | 06-s13 §13.2 |
| SCOPE-0226 | 06-s13 §13.2 |
| SCOPE-0227 | 06-s13 §13.2 |
| SCOPE-0228 | 06-s13 §13.2 |
| SCOPE-0229 | 06-s13 §13.2 |
| SCOPE-0230 | 06-s13 §13.2 |
| SCOPE-0231 | 06-s13 §13.2 |
| SCOPE-0232 | 06-s13 §13.2 |
| SCOPE-0233 | removed: narration (the validation records keep it) |
| SCOPE-0234 | 06-s13 §13.2 |
| SCOPE-0235 | 06-s13 §13.2 |
| SCOPE-0236 | 06-s13 §13.2 |
| SCOPE-0237 | 06-s13 §13.2 |
| SCOPE-0238 | 06-s13 §13.2 |
| SCOPE-0239 | 06-s13 §13.2 |
| SCOPE-0240 | 06-s13 §13.2 |
| SCOPE-0241 | 06-s13 §13.2 |
| SCOPE-0242 | 06-s13 §13.2 |
| SCOPE-0243 | 06-s13 §13.2 |
| SCOPE-0244 | 06-s13 §13.2 |
| SCOPE-0245 | 06-s13 §13.2 |
| SCOPE-0246 | 06-s13 §13.2 |
| SCOPE-0247 | 06-s13 §13.2 |
| SCOPE-0248 | 06-s13 §13.2 |
| SCOPE-0249 | 06-s13 §13.2 |
| SCOPE-0250 | 06-s13 §13.2 |
| SCOPE-0251 | 06-s13 §13.2 |
| SCOPE-0252 | 06-s13 §13.2 |
| SCOPE-0253 | 06-s13 §13.2 |
| SCOPE-0254 | 06-s13 §13.2 |
| SCOPE-0255 | 06-s13 §13.2 |
| SCOPE-0256 | 06-s13 §13.2 |
| SCOPE-0257 | 06-s13 §13.2 |
| SCOPE-0258 | 06-s13 §13.2 |
| SCOPE-0259 | 06-s13 §13.2 |
| SCOPE-0260 | 06-s13 §13.2 |
| SCOPE-0261 | 06-s13 §13.2 |
| SCOPE-0262 | 06-s13 §13.2 |
| SCOPE-0263 | 06-s13 §13.2 |
| SCOPE-0264 | 06-s13 §13.2 |
| SCOPE-0265 | 06-s13 §13.2 |
| SCOPE-0266 | 06-s13 §13.2 |
| SCOPE-0267 | 06-s13 §13.2 |
| SCOPE-0268 | 06-s13 §13.2 |
| SCOPE-0269 | 06-s13 §13.2 |
| SCOPE-0270 | 06-s13 §13.2 |
| SCOPE-0271 | 06-s13 §13.2 |
| SCOPE-0272 | 06-s13 §13.2 |
| SCOPE-0273 | 06-s13 §13.2 |
| SCOPE-0274 | 06-s13 §13.2 |
| SCOPE-0275 | 06-s13 §13.2 |
| SCOPE-0276 | 06-s13 §13.2 |
| SCOPE-0277 | 06-s13 §13.2 |
| SCOPE-0278 | 06-s13 §13.2 |
| SCOPE-0279 | 06-s13 §13.2 |
| SCOPE-0280 | 06-s13 §13.2 |
| SCOPE-0281 | 06-s13 §13.2 |
| SCOPE-0282 | 06-s13 §13.2 |
| SCOPE-0283 | 06-s13 §13.2 |
| SCOPE-0284 | 06-s13 §13.2 |
| SCOPE-0285 | 06-s13 §13.2 |
| SCOPE-0286 | 06-s13 §13.2 |
| SCOPE-0287 | 06-s13 §13.2 |
| SCOPE-0288 | 06-s13 §13.2 |
| SCOPE-0289 | 06-s13 §13.2 |
| SCOPE-0290 | 06-s13 §13.2 |
| SCOPE-0291 | 06-s13 §13.2 |
| SCOPE-0292 | 06-s13 §13.2 |
| SCOPE-0293 | 06-s13 §13.2 |
| SCOPE-0294 | 06-s13 §13.2 |
| SCOPE-0295 | 06-s13 §13.2 |
| SCOPE-0296 | 06-s13 §13.2 |
| SCOPE-0297 | 06-s13 §13.2 |
| SCOPE-0298 | 06-s13 §13.2 |
| SCOPE-0299 | 06-s13 §13.2 |
| SCOPE-0300 | 06-s13 §13.2 |
| SCOPE-0301 | 06-s13 §13.2 |
| SCOPE-0302 | 06-s13 §13.2 |
| SCOPE-0303 | 06-s13 §13.2 |
| SCOPE-0304 | 06-s13 §13.2 |
| SCOPE-0305 | 06-s13 §13.2 |
| SCOPE-0306 | 06-s13 §13.2 |
| SCOPE-0307 | 06-s13 §13.2 |
| SCOPE-0308 | 06-s13 §13.2 |
| SCOPE-0309 | 06-s13 §13.2 |
| SCOPE-0310 | 06-s13 §13.2 |
| SCOPE-0311 | 06-s13 §13.2 |
| SCOPE-0312 | 06-s13 §13.2 |
| SCOPE-0313 | 06-s13 §13.2 |
| SCOPE-0314 | 06-s13 §13.2 |
| SCOPE-0315 | 06-s13 §13.2 |
| SCOPE-0316 | 06-s13 §13.2 |
| SCOPE-0317 | 06-s13 §13.2 |
| SCOPE-0318 | 06-s13 §13.2 |
| SCOPE-0319 | 06-s13 §13.2 |
| SCOPE-0320 | 06-s13 §13.2 |
| SCOPE-0321 | 06-s13 §13.2 |
| SCOPE-0322 | 06-s13 §13.2 |
| SCOPE-0323 | 06-s13 §13.2 |
| SCOPE-0324 | 06-s13 §13.2 |
| SCOPE-0325 | 06-s13 §13.2 |
| SCOPE-0326 | 06-s13 §13.2 |
| SCOPE-0327 | 06-s13 §13.2 |
| SCOPE-0328 | 06-s13 §13.2 |
| SCOPE-0329 | 06-s13 §13.2 |
| SCOPE-0330 | 06-s13 §13.2 |
| SCOPE-0331 | 06-s13 §13.2 |
| SCOPE-0332 | 06-s13 §13.2 |
| SCOPE-0333 | 06-s13 §13.2 |
| SCOPE-0334 | 06-s13 §13.2 |
| SCOPE-0335 | 06-s13 §13.2 |
| SCOPE-0336 | 06-s13 §13.2 |
| SCOPE-0337 | 06-s13 §13.2 |
| SCOPE-0338 | 06-s13 §13.2 |
| SCOPE-0339 | 06-s13 §13.2 |
| SCOPE-0340 | 06-s13 §13.2 |
| SCOPE-0341 | 06-s13 §13.2 |
| SCOPE-0342 | 06-s13 §13.2 |
| SCOPE-0343 | 06-s13 §13.2 |
| SCOPE-0344 | 06-s13 §13.2 |
| SCOPE-0345 | 06-s13 §13.2 |
| SCOPE-0346 | 06-s13 §13.2 |
| SCOPE-0347 | 06-s13 §13.2 |
| SCOPE-0348 | 06-s13 §13.2 |
| SCOPE-0349 | 06-s13 §13.2 |
| SCOPE-0350 | 06-s13 §13.2 |
| SCOPE-0351 | 06-s13 §13.2 |
| SCOPE-0352 | 06-s13 §13.2 |
| SCOPE-0353 | 06-s13 §13.2 |
| SCOPE-0354 | 06-s13 §13.2 |
| SCOPE-0355 | 06-s13 §13.2 |
| SCOPE-0356 | 06-s13 §13.2 |
| SCOPE-0357 | 06-s13 §13.2 |
| SCOPE-0358 | 06-s13 §13.2 |
| SCOPE-0359 | 06-s13 §13.2 |
| SCOPE-0360 | 06-s13 §13.2 |
| SCOPE-0361 | 06-s13 §13.2 |
| SCOPE-0362 | 06-s13 §13.2 |
| SCOPE-0363 | 06-s13 §13.2 |
| SCOPE-0364 | 06-s13 §13.2 |
| SCOPE-0365 | 06-s13 §13.2 |
| SCOPE-0366 | 06-s13 §13.2 |
| SCOPE-0367 | 06-s13 §13.2 |
| SCOPE-0368 | 06-s13 §13.2 |
| SCOPE-0369 | 06-s13 §13.2 |
| SCOPE-0370 | 06-s13 §13.2 |
| SCOPE-0371 | 06-s13 §13.2 |
| SCOPE-0372 | 06-s13 §13.2 |
| SCOPE-0373 | 06-s13 §13.2 |
| SCOPE-0374 | 06-s13 §13.2 |
| SCOPE-0375 | 06-s13 §13.2 |
| SCOPE-0376 | 06-s13 §13.2 |
| SCOPE-0377 | 06-s13 §13.2 |
| SCOPE-0378 | 06-s13 §13.2 |
| SCOPE-0379 | 06-s13 §13.2 |
| SCOPE-0380 | 06-s13 §13.2 |
| SCOPE-0381 | 06-s13 §13.2 |
| SCOPE-0382 | 06-s13 §13.2 |
| SCOPE-0383 | 06-s13 §13.2 |
| SCOPE-0384 | 06-s13 §13.2 |
| SCOPE-0385 | 06-s13 §13.2 |
| SCOPE-0386 | 06-s13 §13.2 |
| SCOPE-0387 | 06-s13 §13.2 |
| SCOPE-0388 | 06-s13 §13.2 |
| SCOPE-0389 | 06-s13 §13.2 |
| SCOPE-0390 | 06-s13 §13.2 |
| SCOPE-0391 | 06-s13 §13.2 |
| SCOPE-0392 | 06-s13 §13.2 |
| SCOPE-0393 | 06-s13 §13.2 |
| SCOPE-0394 | 06-s13 §13.2 |
| SCOPE-0395 | 06-s13 §13.2 |
| SCOPE-0396 | 06-s13 §13.2 |
| SCOPE-0397 | 06-s13 §13.2 |
| SCOPE-0398 | 06-s13 §13.2 |
| SCOPE-0399 | 06-s13 §13.2 |
| SCOPE-0400 | 06-s13 §13.2 |
| SCOPE-0401 | 06-s13 §13.2 |
| SCOPE-0402 | 06-s13 §13.2 |
| SCOPE-0403 | 06-s13 §13.2 |
| SCOPE-0404 | 06-s13 §13.2 |
| SCOPE-0405 | 06-s13 §13.2 |
| SCOPE-0406 | 06-s13 §13.2 |
| SCOPE-0407 | 06-s13 §13.2 |
| SCOPE-0408 | 06-s13 §13.2 |
| SCOPE-0409 | 06-s13 §13.2 |
| SCOPE-0410 | 06-s13 §13.2 |
| SCOPE-0411 | 06-s13 §13.2 |
| SCOPE-0412 | 06-s13 §13.2 |
| SCOPE-0413 | 06-s13 §13.2 |
| SCOPE-0414 | 06-s13 §13.2 |
| SCOPE-0415 | 06-s13 §13.2 |
| SCOPE-0416 | 06-s13 §13.2 |
| SCOPE-0417 | 06-s13 §13.2 |
| SCOPE-0418 | 06-s13 §13.2 |
| SCOPE-0419 | 06-s13 §13.2 |
| SCOPE-0420 | 06-s13 §13.2 |
| SCOPE-0421 | 06-s13 §13.2 |
| SCOPE-0422 | 06-s13 §13.2 |
| SCOPE-0423 | 06-s13 §13.2 |
| SCOPE-0424 | 06-s13 §13.2 |
| SCOPE-0425 | 06-s13 §13.2 |
| SCOPE-0426 | 06-s13 §13.2 |
| SCOPE-0427 | 06-s13 §13.2 |
| SCOPE-0428 | 06-s13 §13.2 |
| SCOPE-0429 | 06-s13 §13.2 |
| SCOPE-0430 | 06-s13 §13.2 |
| SCOPE-0431 | 06-s13 §13.2 |
| SCOPE-0432 | 06-s13 §13.2 |
| SCOPE-0433 | 06-s13 §13.2 |
| SCOPE-0434 | 06-s13 §13.2 |
| SCOPE-0435 | 06-s13 §13.2 |
| SCOPE-0436 | 06-s13 §13.2 |
| SCOPE-0437 | 06-s13 §13.2 |
| SCOPE-0438 | 06-s13 §13.2 |
| SCOPE-0439 | 06-s13 §13.2 |
| SCOPE-0440 | 06-s13 §13.2 |
| SCOPE-0441 | 06-s13 §13.2 |
| SCOPE-0442 | 06-s13 §13.2 |
| SCOPE-0443 | 06-s13 §13.2 |
| SCOPE-0444 | 06-s13 §13.2 |
| SCOPE-0445 | 06-s13 §13.2 |
| SCOPE-0446 | 06-s13 §13.2 |
| SCOPE-0447 | 06-s13 §13.2 |
| SCOPE-0448 | 06-s13 §13.2 |
| SCOPE-0449 | 06-s13 §13.2 |
| SCOPE-0450 | 06-s13 §13.2 |
| SCOPE-0451 | 06-s13 §13.3 |
| SCOPE-0452 | 06-s13 §13.3 |
| SCOPE-0453 | 06-s13 §13.3 |
| SCOPE-0454 | 06-s13 §13.3 |
| SCOPE-0455 | 06-s13 §13.3 |
| SCOPE-0456 | 06-s13 §13.3 |
| SCOPE-0457 | 06-s13 §13.3 |
| SCOPE-0458 | 06-s13 §13.3 |
| SCOPE-0459 | 06-s13 §13.3 |
| SCOPE-0460 | 06-s13 §13.3 |
| SCOPE-0461 | 06-s13 §13.3 |
| SCOPE-0462 | 06-s13 §13.3 |
| SCOPE-0463 | 06-s13 §13.3 |
| SCOPE-0464 | 06-s13 §13.3 |
| SCOPE-0465 | 06-s13 §13.4 |
| SCOPE-0466 | 06-s13 §13.4 |
| SCOPE-0467 | 06-s13 §13.4 |
| SCOPE-0468 | 06-s13 §13.4 |
| SCOPE-0469 | 06-s13 §13.4 |
| SCOPE-0470 | 06-s13 §13.4 |
| SCOPE-0471 | 06-s13 §13.4 |
| SCOPE-0472 | 06-s13 §13.4 |
| SCOPE-0473 | 06-s13 §13.4 |
| SCOPE-0474 | 06-s13 §13.5 |
| SCOPE-0475 | 06-s13 §13.5 |
| SCOPE-0476 | 06-s13 §13.5 |
| SCOPE-0477 | 06-s13 §13.5 |
| SCOPE-0478 | 06-s13 §13.5 |
| SCOPE-0479 | 06-s13 §13.5 |
| SCOPE-0480 | 06-s13 §13.5 |
| SCOPE-0481 | 06-s13 §13.5 |
| SCOPE-0482 | 06-s13 §13.5 |
| SCOPE-0483 | 06-s13 §13.5 |
| SCOPE-0484 | 06-s13 §13.5 |
| SCOPE-0485 | 06-s13 §13.5 |
| SCOPE-0486 | 06-s13 §13.5 |
| SCOPE-0487 | 06-s13 §13.5 |
| SCOPE-0488 | 06-s13 §13.5 |
| SCOPE-0489 | 06-s13 §13.5 |
| SCOPE-0490 | 06-s13 §13.5 |
| SCOPE-0491 | 06-s13 §13.5 |
| SCOPE-0492 | 06-s13 §13.5 |
| SCOPE-0493 | 06-s13 §13.5 |
| SCOPE-0494 | 06-s13 §13.5 |
| SCOPE-0495 | 06-s13 §13.5 |
| SCOPE-0496 | 06-s13 §13.5 |
| SCOPE-0497 | 06-s13 §13.5 |
| SCOPE-0498 | 06-s13 §13.5 |
| SCOPE-0499 | 06-s13 §13.5 |
| SCOPE-0500 | 06-s13 §13.5 |
| SCOPE-0501 | 06-s13 §13.5 |
| SCOPE-0502 | 06-s13 §13.5 |
| SCOPE-0503 | 06-s13 §13.5 |
| SCOPE-0504 | 06-s13 §13.5 |
| SCOPE-0505 | 06-s13 §13.5 |
| SCOPE-0506 | 06-s13 §13.5 |
| SCOPE-0507 | 06-s13 §13.5 |
| SCOPE-0508 | 06-s13 §13.5 |
| SCOPE-0509 | 06-s13 §13.5 |
| SCOPE-0510 | 06-s13 §13.5 |
| SCOPE-0511 | 06-s13 §13.5 |
| SCOPE-0512 | 06-s13 §13.5 |
| SCOPE-0513 | 06-s13 §13.5 |
| SCOPE-0514 | 06-s13 §13.5 |
| SCOPE-0515 | 06-s13 §13.5 |
| SCOPE-0516 | 06-s13 §13.5 |
| SCOPE-0517 | 06-s13 §13.5 |
| SCOPE-0518 | 06-s13 §13.5 |
| SCOPE-0519 | 06-s13 §13.6 |
| SCOPE-0520 | 06-s13 §13.6 |
| SCOPE-0521 | 06-s13 §13.6 |
| SCOPE-0522 | 06-s13 §13.6 |
| SCOPE-0523 | 06-s13 §13.6 |
| SCOPE-0524 | 06-s13 §13.6 |
| SCOPE-0525 | 06-s13 §13.6 |
| SCOPE-0526 | 06-s13 §13.6 |
| SCOPE-0527 | 06-s13 §13.6 |
| SCOPE-0528 | 06-s13 §13.6 |
| SCOPE-0529 | 06-s13 §13.6 |
| SCOPE-0530 | 06-s13 §13.6 |
| SCOPE-0531 | 06-s13 §13.6 |
| SCOPE-0532 | 06-s13 §13.6 |
| SCOPE-0533 | 06-s13 §13.6 |
| SCOPE-0534 | 06-s13 §13.6 |
| SCOPE-0535 | 06-s13 §13.6 |
| SCOPE-0536 | 06-s13 §13.7 |
| SCOPE-0537 | 06-s13 §13.7 |
| SCOPE-0538 | 06-s13 §13.7 |
| SCOPE-0539 | 06-s13 §13.7 |
| SCOPE-0540 | 06-s13 §13.7 |
| SCOPE-0541 | 06-s13 §13.7 |
| SCOPE-0542 | 06-s13 §13.7 |
| SCOPE-0543 | 06-s13 §13.7 |
| SCOPE-0544 | 06-s13 §13.7 |
| SCOPE-0545 | 06-s13 §13.7 |
| SCOPE-0546 | 06-s13 §13.7 |
| SCOPE-0547 | 06-s13 §13.7 |
| SCOPE-0548 | 06-s13 §13.7 |
| SCOPE-0549 | 06-s13 §13.7 |
| SCOPE-0550 | 06-s13 §13.7 |
| SCOPE-0551 | 06-s13 §13.7 |
| SCOPE-0552 | 06-s13 §13.7 |
| SCOPE-0553 | 06-s13 §13.7 |
| SCOPE-0554 | 06-s13 §13.7 |
| SCOPE-0555 | 06-s13 §13.7 |
| SCOPE-0556 | 06-s13 §13.7 |
| SCOPE-0557 | 06-s13 §13.7 |
| SCOPE-0558 | 06-s13 §13.7 |
| SCOPE-0559 | 06-s13 §13.7 |
| SCOPE-0560 | 06-s13 §13.7 |
| SCOPE-0561 | 06-s13 §13.7 |
| SCOPE-0562 | 06-s13 §13.8 |
| SCOPE-0563 | 06-s13 §13.8 |
| SCOPE-0564 | 06-s13 §13.8 |
| SCOPE-0565 | 06-s13 §13.8 |
| SCOPE-0566 | 06-s13 §13.8 |
| SCOPE-0567 | 06-s13 §13.8: in the bar schedule (E-21) |
| SCOPE-0568 | 06-s13 §13.8: in the bar schedule (E-21) |
| SCOPE-0569 | 06-s13 §13.9 |
| SCOPE-0570 | 06-s13 §13.9: field dropped, no reader (W-FLD-10); rest kept |
| SCOPE-0571 | 06-s13 §13.9 |
| SCOPE-0572 | 06-s13 §13.9 |
| SCOPE-0573 | 06-s13 §13.9 |
| SCOPE-0574 | 06-s13 §13.9 |
| SCOPE-0575 | 07-s14 §14 |
| SCOPE-0576 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0577 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0578 | 07-s14 §14 |
| SCOPE-0579 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0580 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0581 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0582 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0583 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0584 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0585 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0586 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0587 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0588 | 07-s14 §14 |
| SCOPE-0589 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0590 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0591 | 07-s14 §14 |
| SCOPE-0592 | 07-s14 §14 |
| SCOPE-0593 | 07-s14 §14 |
| SCOPE-0594 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0595 | 07-s14 §14 |
| SCOPE-0596 | 07-s14 §14 |
| SCOPE-0597 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0598 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0599 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0600 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0601 | 07-s14 §14 |
| SCOPE-0602 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0603 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0604 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0605 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0606 | 07-s14 §14 |
| SCOPE-0607 | 07-s14 §14 |
| SCOPE-0608 | 07-s14 §14 |
| SCOPE-0609 | 07-s14: field dropped, no reader (W-DOS-06; J-A77.06); rest kept |
| SCOPE-0610 | 07-s14: `previous` dropped, no reader (W-DOS-05; J-A73.06); rest kept |
| SCOPE-0611 | 07-s14 §14 |
| SCOPE-0612 | 07-s14 §14 |
| SCOPE-0613 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0614 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0615 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0616 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0617 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0618 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0619 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0620 | 07-s14 §14 |
| SCOPE-0621 | 07-s14 §14 |
| SCOPE-0622 | 07-s14 §14 |
| SCOPE-0623 | 07-s14 §14 |
| SCOPE-0624 | 07-s14 §14 |
| SCOPE-0625 | 07-s14 §14 |
| SCOPE-0626 | 07-s14 §14 |
| SCOPE-0627 | 07-s14 §14 |
| SCOPE-0628 | 07-s14 §14 |
| SCOPE-0629 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0630 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0631 | 07-s14 §14 |
| SCOPE-0632 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0633 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0634 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0635 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0636 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0637 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0638 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0639 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0640 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0641 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0642 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0643 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0644 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0645 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0646 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0647 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0648 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0649 | 07-s14 §14 |
| SCOPE-0650 | 07-s14: kept at §14, its subject (the link target states no such text; RC-10, RC-15) |
| SCOPE-0651 | 07-s14 §14 |
| SCOPE-0652 | 08-s15 §15 |
| SCOPE-0653 | 08-s15 §15.1 |
| SCOPE-0654 | 08-s15 §15.1 |
| SCOPE-0655 | 08-s15 §15.1 |
| SCOPE-0656 | 08-s15 §15.1 |
| SCOPE-0657 | 08-s15 §15.1 |
| SCOPE-0658 | 08-s15 §15.1 |
| SCOPE-0659 | 08-s15 §15.1 |
| SCOPE-0660 | 08-s15 §15.1 |
| SCOPE-0661 | 08-s15 §15.1 |
| SCOPE-0662 | 08-s15 §15.1 |
| SCOPE-0663 | 08-s15 §15.1 |
| SCOPE-0664 | 08-s15 §15.1 |
| SCOPE-0665 | 08-s15 §15.1 |
| SCOPE-0666 | 08-s15 §15.1 |
| SCOPE-0667 | 08-s15 §15.1 |
| SCOPE-0668 | 08-s15 §15.1 |
| SCOPE-0669 | 08-s15 §15.1 |
| SCOPE-0670 | 08-s15 §15.1 |
| SCOPE-0671 | 08-s15 §15.1 |
| SCOPE-0672 | 08-s15 §15.1 |
| SCOPE-0673 | 08-s15 §15.1 |
| SCOPE-0674 | 08-s15 §15.1 |
| SCOPE-0675 | 08-s15 §15.1 |
| SCOPE-0676 | 08-s15 §15.1 |
| SCOPE-0677 | 08-s15 §15.1 |
| SCOPE-0678 | 08-s15 §15.1 |
| SCOPE-0679 | 08-s15 §15.1 |
| SCOPE-0680 | 08-s15 §15.1 |
| SCOPE-0681 | 08-s15 §15.1 |
| SCOPE-0682 | 08-s15 §15.1 |
| SCOPE-0683 | 08-s15 §15.1 |
| SCOPE-0684 | 08-s15 §15.1 |
| SCOPE-0685 | 08-s15 §15.1 |
| SCOPE-0686 | 08-s15 §15.1 |
| SCOPE-0687 | 08-s15 §15.1 |
| SCOPE-0688 | 08-s15 §15.1 |
| SCOPE-0689 | 08-s15 §15.1 |
| SCOPE-0690 | 08-s15 §15.1 |
| SCOPE-0691 | 08-s15 §15.1 |
| SCOPE-0692 | 08-s15 §15.1 |
| SCOPE-0693 | 08-s15 §15.1 |
| SCOPE-0694 | 08-s15 §15.1 |
| SCOPE-0695 | 08-s15 §15.1 |
| SCOPE-0696 | 08-s15 §15.1 |
| SCOPE-0697 | 08-s15 §15.1 |
| SCOPE-0698 | 08-s15 §15.1 |
| SCOPE-0699 | 08-s15 §15.1 |
| SCOPE-0700 | 08-s15 §15.1 |
| SCOPE-0701 | 08-s15 §15.1 |
| SCOPE-0702 | 08-s15 §15.1 |
| SCOPE-0703 | 08-s15 §15.1 |
| SCOPE-0704 | 08-s15 §15.1 |
| SCOPE-0705 | 08-s15 §15.1 |
| SCOPE-0706 | 08-s15 §15.1 |
| SCOPE-0707 | 08-s15 §15.1 |
| SCOPE-0708 | 08-s15 §15.1 |
| SCOPE-0709 | 08-s15 §15.1 |
| SCOPE-0710 | 08-s15 §15.1 |
| SCOPE-0711 | 08-s15 §15.1 |
| SCOPE-0712 | 08-s15 §15.1 |
| SCOPE-0713 | 08-s15 §15.1 |
| SCOPE-0714 | 08-s15 §15.1 |
| SCOPE-0715 | 08-s15 §15.1 |
| SCOPE-0716 | 08-s15 §15.1 |
| SCOPE-0717 | 08-s15 §15.1 |
| SCOPE-0718 | 08-s15 §15.1 |
| SCOPE-0719 | 08-s15 §15.1 |
| SCOPE-0720 | 08-s15 §15.1 |
| SCOPE-0721 | 08-s15 §15.1 |
| SCOPE-0722 | 08-s15 §15.1 |
| SCOPE-0723 | 08-s15 §15.1 |
| SCOPE-0724 | 08-s15 §15.1 |
| SCOPE-0725 | 08-s15 §15.1 |
| SCOPE-0726 | 08-s15 §15.1 |
| SCOPE-0727 | 08-s15 §15.1 |
| SCOPE-0728 | 08-s15 §15.1 |
| SCOPE-0729 | 08-s15 §15.1 |
| SCOPE-0730 | 08-s15 §15.1 |
| SCOPE-0731 | 08-s15 §15.1 |
| SCOPE-0732 | 08-s15 §15.1 |
| SCOPE-0733 | 08-s15 §15.1 |
| SCOPE-0734 | 08-s15 §15.1 |
| SCOPE-0735 | 08-s15 §15.1 |
| SCOPE-0736 | 08-s15 §15.1 |
| SCOPE-0737 | 08-s15 §15.1 |
| SCOPE-0738 | 08-s15 §15.1 |
| SCOPE-0739 | 08-s15 §15.1 |
| SCOPE-0740 | 08-s15 §15.1 |
| SCOPE-0741 | 08-s15 §15.1 |
| SCOPE-0742 | 08-s15 §15.1 |
| SCOPE-0743 | 08-s15 §15.1 |
| SCOPE-0744 | 08-s15 §15.1 |
| SCOPE-0745 | 08-s15 §15.1 |
| SCOPE-0746 | 08-s15 §15.1 |
| SCOPE-0747 | 08-s15 §15.1 |
| SCOPE-0748 | 08-s15 §15.1 |
| SCOPE-0749 | 08-s15 §15.1 |
| SCOPE-0750 | 08-s15 §15.1 |
| SCOPE-0751 | 08-s15 §15.1 |
| SCOPE-0752 | 08-s15 §15.1 |
| SCOPE-0753 | 08-s15 §15.1 |
| SCOPE-0754 | 08-s15 §15.1 |
| SCOPE-0755 | 08-s15 §15.1 |
| SCOPE-0756 | 08-s15 §15.1 |
| SCOPE-0757 | 08-s15 §15.1 |
| SCOPE-0758 | 08-s15 §15.1 |
| SCOPE-0759 | 08-s15 §15.1 |
| SCOPE-0760 | 08-s15 §15.1 |
| SCOPE-0761 | 08-s15 §15.1 |
| SCOPE-0762 | 08-s15 §15.1 |
| SCOPE-0763 | 08-s15 §15.1 |
| SCOPE-0764 | 08-s15 §15.1 |
| SCOPE-0765 | 08-s15 §15.1 |
| SCOPE-0766 | 08-s15 §15.1 |
| SCOPE-0767 | 08-s15 §15.1 |
| SCOPE-0768 | 08-s15 §15.1 |
| SCOPE-0769 | 08-s15 §15.1 |
| SCOPE-0770 | 08-s15 §15.1 |
| SCOPE-0771 | 08-s15 §15.1 |
| SCOPE-0772 | 08-s15 §15.1 |
| SCOPE-0773 | 08-s15 §15.1 |
| SCOPE-0774 | 08-s15 §15.1 |
| SCOPE-0775 | 08-s15 §15.1 |
| SCOPE-0776 | 08-s15 §15.1 |
| SCOPE-0777 | 08-s15 §15.1 |
| SCOPE-0778 | 08-s15 §15.1 |
| SCOPE-0779 | 08-s15 §15.1 |
| SCOPE-0780 | 08-s15 §15.1 |
| SCOPE-0781 | 08-s15 §15.1 |
| SCOPE-0782 | 08-s15 §15.1 |
| SCOPE-0783 | 08-s15 §15.1 |
| SCOPE-0784 | 08-s15 §15.1 |
| SCOPE-0785 | 08-s15 §15.1 |
| SCOPE-0786 | 08-s15 §15.1 |
| SCOPE-0787 | 08-s15 §15.1 |
| SCOPE-0788 | 08-s15 §15.1 |
| SCOPE-0789 | 08-s15 §15.1 |
| SCOPE-0790 | 08-s15: replaced by a pointer to V07 §15.1 |
| SCOPE-0791 | 08-s15 §15.2 |
| SCOPE-0792 | 08-s15 §15.2 |
| SCOPE-0793 | 08-s15 §15.2 |
| SCOPE-0794 | 08-s15 §15.2 |
| SCOPE-0795 | 08-s15 §15.2 |
| SCOPE-0796 | 08-s15 §15.2 |
| SCOPE-0797 | 08-s15 §15.2 |
| SCOPE-0798 | 08-s15 §15.2 |
| SCOPE-0799 | 08-s15 §15.2 |
| SCOPE-0800 | 08-s15 §15.2 |
| SCOPE-0801 | 08-s15 §15.2 |
| SCOPE-0802 | 08-s15 §15.2 |
| SCOPE-0803 | 08-s15 §15.2 |
| SCOPE-0804 | 08-s15 §15.2 |
| SCOPE-0805 | 08-s15 §15.2 |
| SCOPE-0806 | 08-s15 §15.2 |
| SCOPE-0807 | 08-s15 §15.2 |
| SCOPE-0808 | 08-s15 §15.2 |
| SCOPE-0809 | 08-s15 §15.2 |
| SCOPE-0810 | 08-s15 §15.2 |
| SCOPE-0811 | 08-s15 §15.2 |
| SCOPE-0812 | 08-s15 §15.2 |
| SCOPE-0813 | 08-s15 §15.2 |
| SCOPE-0814 | 08-s15 §15.2 |
| SCOPE-0815 | 08-s15 §15.2 |
| SCOPE-0816 | 08-s15 §15.2 |
| SCOPE-0817 | 08-s15 §15.2 |
| SCOPE-0818 | 08-s15 §15.2 |
| SCOPE-0819 | 08-s15 §15.2 |
| SCOPE-0820 | 08-s15 §15.2 |
| SCOPE-0821 | 08-s15 §15.2 |
| SCOPE-0822 | 08-s15 §15.2 |
| SCOPE-0823 | 08-s15 §15.2 |
| SCOPE-0824 | 08-s15 §15.2 |
| SCOPE-0825 | 08-s15 §15.2 |
| SCOPE-0826 | 08-s15 §15.2 |
| SCOPE-0827 | 09-s16 §16 |
| SCOPE-0828 | 09-s16 §16 |
| SCOPE-0829 | 09-s16 §16 |
| SCOPE-0830 | 09-s16 §16 |
| SCOPE-0831 | 09-s16 §16 |
| SCOPE-0832 | 09-s16 §16 |
| SCOPE-0833 | 09-s16 §16 |
| SCOPE-0834 | 09-s16 §16 |
| SCOPE-0835 | 09-s16 §16 |
| SCOPE-0836 | 09-s16 §16 |
| SCOPE-0837 | 09-s16 §16 |
| SCOPE-0838 | 09-s16 §16 |
| SCOPE-0839 | 09-s16 §16 |
| SCOPE-0840 | 09-s16 §16 |
| SCOPE-0841 | 09-s16 §16 |
| SCOPE-0842 | 09-s16 §16 |
| SCOPE-0843 | 09-s16 §16 |
| SCOPE-0844 | 09-s16 §16 |
| SCOPE-0845 | 09-s16 §16 |
| SCOPE-0846 | 09-s16 §16 |
| SCOPE-0847 | 09-s16 §16 |
| SCOPE-0848 | 09-s16 §16 |
| SCOPE-0849 | 09-s16 §16 |
| SCOPE-0850 | 09-s16 §16 |
| SCOPE-0851 | 09-s16 §16 |
| SCOPE-0852 | 09-s16 §16 |
| SCOPE-0853 | 09-s16 §16 |
| SCOPE-0854 | 09-s16 §16 |
| SCOPE-0855 | 09-s16 §16 |
| SCOPE-0856 | 09-s16 §16 |
| SCOPE-0857 | 09-s16 §16 |
| SCOPE-0858 | 09-s16: kept |
| SCOPE-0859 | 09-s16 §16 |
| SCOPE-0860 | 09-s16 §16 |
| SCOPE-0861 | 10-s17 §17 |
| SCOPE-0862 | 10-s17 §17.1 |
| SCOPE-0863 | 10-s17 §17.1 |
| SCOPE-0864 | 10-s17 §17.1 |
| SCOPE-0865 | 10-s17 §17.1 |
| SCOPE-0866 | 10-s17 §17.1 |
| SCOPE-0867 | 10-s17 §17.1 |
| SCOPE-0868 | 10-s17 §17.1 |
| SCOPE-0869 | 10-s17 §17.1 |
| SCOPE-0870 | 10-s17 §17.1 |
| SCOPE-0871 | 10-s17 §17.1 |
| SCOPE-0872 | 10-s17 §17.1 |
| SCOPE-0873 | 10-s17 §17.1 |
| SCOPE-0874 | 10-s17 §17.2 |
| SCOPE-0875 | 10-s17: kept |
| SCOPE-0876 | 10-s17 §17.4 |
| SCOPE-0877 | 10-s17 §17.4 |
| SCOPE-0878 | 10-s17 §17.4 |
| SCOPE-0879 | 10-s17: kept |
| SCOPE-0880 | 10-s17: kept |
| SCOPE-0881 | 10-s17: kept |
| SCOPE-0882 | 10-s17: kept |
| SCOPE-0883 | 10-s17: kept |
| SCOPE-0884 | 10-s17: kept |
| SCOPE-0885 | 10-s17: kept |
| SCOPE-0886 | 10-s17: kept |
| SCOPE-0887 | 10-s17: kept |
| SCOPE-0888 | 10-s17: kept |
| SCOPE-0889 | 10-s17: kept |
| SCOPE-0890 | 10-s17: kept |
| SCOPE-0891 | 10-s17: kept |
| SCOPE-0892 | 10-s17: kept |
| SCOPE-0893 | 10-s17: kept |
| SCOPE-0894 | 10-s17: kept |
| SCOPE-0895 | 10-s17: kept |
| SCOPE-0896 | 10-s17: kept |
| SCOPE-0897 | 10-s17 §17.4 |
| SCOPE-0898 | 11-delegated Delegated decisions |
| SCOPE-0899 | 11-delegated: kept |
| SCOPE-0900 | 11-delegated: kept |
| SCOPE-0901 | 11-delegated: kept |
| SCOPE-0902 | 11-delegated: kept |
| SCOPE-0903 | 11-delegated: kept |
| SCOPE-0904 | 11-delegated: kept |
| SCOPE-0905 | 11-delegated: kept |
| SCOPE-0906 | 11-delegated: kept |
| SCOPE-0907 | 11-delegated: kept |
| SCOPE-0908 | 11-delegated: kept |
| SCOPE-0909 | 11-delegated: kept |
| SCOPE-0910 | 11-delegated: kept |
| SCOPE-0911 | 11-delegated: kept |
| SCOPE-0912 | 11-delegated: kept |
| SCOPE-0913 | 11-delegated: kept |
| SCOPE-0914 | 11-delegated: kept |
| SCOPE-0915 | 11-delegated: kept |
| SCOPE-0916 | 11-delegated: kept |
| SCOPE-0917 | 11-delegated: kept |
| SCOPE-0918 | 11-delegated: kept |
| SCOPE-0919 | 11-delegated: kept |
| SCOPE-0920 | 11-delegated: kept |
| SCOPE-0921 | 11-delegated: kept |
| SCOPE-0922 | 11-delegated: kept |
| SCOPE-0923 | 11-delegated: kept |
| SCOPE-0924 | 11-delegated: kept |
| SCOPE-0925 | 11-delegated: kept |
| SCOPE-0926 | 11-delegated: kept |
| SCOPE-0927 | 11-delegated: kept |
| SCOPE-0928 | 11-delegated: kept |
| SCOPE-0929 | 11-delegated: kept |
| SCOPE-0930 | 11-delegated: kept |
| SCOPE-0931 | 11-delegated: kept |
| SCOPE-0932 | 11-delegated: kept |
| SCOPE-0933 | 11-delegated: kept |
| SCOPE-0934 | 12-judgment Judgment calls |
| SCOPE-0935 | 12-judgment Judgment calls |
| SCOPE-0936 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0937 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0938 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0939 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0940 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0941 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0942 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0943 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0944 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0945 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0946 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0947 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0948 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0949 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0950 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0951 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0952 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0953 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0954 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0955 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0956 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0957 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0958 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0959 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0960 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0961 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0962 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0963 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0964 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0965 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0966 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0967 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0968 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0969 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0970 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0971 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0972 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0973 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0974 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0975 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0976 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0977 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0978 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0979 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0980 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0981 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0982 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0983 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0984 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0985 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0986 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0987 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0988 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0989 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0990 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0991 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0992 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0993 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0994 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0995 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0996 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0997 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0998 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-0999 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1000 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1001 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1002 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1003 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1004 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1005 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1006 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1007 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1008 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1009 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1010 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1011 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1012 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1013 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1014 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1015 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1016 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1017 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1018 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1019 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1020 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1021 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1022 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1023 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1024 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1025 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1026 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1027 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1028 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1029 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1030 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1031 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1032 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1033 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1034 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1035 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1036 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1037 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1038 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1039 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1040 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1041 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1042 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1043 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1044 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1045 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1046 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1047 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1048 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1049 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1050 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1051 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1052 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1053 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1054 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1055 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1056 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1057 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1058 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1059 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1060 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1061 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1062 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1063 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1064 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1065 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1066 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1067 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1068 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1069 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1070 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1071 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1072 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1073 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1074 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1075 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1076 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1077 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1078 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1079 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1080 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1081 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1082 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1083 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1084 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1085 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1086 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1087 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1088 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1089 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1090 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1091 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1092 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1093 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1094 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1095 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1096 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1097 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1098 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1099 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1100 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1101 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1102 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1103 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1104 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1105 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1106 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1107 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1108 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1109 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1110 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1111 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1112 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1113 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1114 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1115 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1116 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1117 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1118 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1119 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1120 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1121 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1122 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1123 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1124 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1125 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1126 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1127 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1128 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1129 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1130 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1131 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1132 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1133 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1134 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1135 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1136 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1137 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1138 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1139 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1140 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1141 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1142 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1143 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1144 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1145 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1146 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1147 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1148 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1149 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1150 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1151 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1152 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1153 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1154 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1155 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1156 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1157 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1158 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1159 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1160 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1161 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1162 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1163 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1164 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1165 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1166 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1167 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1168 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1169 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1170 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1171 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1172 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1173 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1174 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1175 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1176 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1177 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1178 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1179 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1180 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1181 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1182 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1183 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1184 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1185 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1186 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1187 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1188 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1189 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1190 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1191 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1192 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1193 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1194 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1195 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1196 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1197 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1198 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1199 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1200 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1201 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1202 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1203 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1204 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1205 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1206 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1207 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1208 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1209 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1210 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1211 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1212 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1213 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1214 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1215 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1216 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1217 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1218 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1219 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1220 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1221 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1222 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1223 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1224 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1225 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1226 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1227 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1228 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1229 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1230 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1231 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1232 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1233 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1234 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1235 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1236 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1237 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1238 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1239 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1240 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1241 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1242 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1243 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1244 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1245 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1246 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1247 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1248 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1249 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1250 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1251 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1252 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1253 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1254 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1255 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1256 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1257 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1258 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1259 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1260 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1261 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1262 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1263 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1264 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1265 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1266 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1267 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1268 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1269 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1270 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1271 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1272 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1273 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1274 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1275 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1276 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1277 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1278 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1279 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1280 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1281 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1282 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1283 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1284 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1285 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1286 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1287 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1288 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1289 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1290 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1291 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1292 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1293 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1294 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1295 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1296 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1297 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1298 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1299 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1300 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1301 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1302 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1303 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1304 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1305 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1306 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1307 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1308 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1309 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1310 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1311 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1312 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1313 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1314 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1315 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1316 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1317 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1318 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1319 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1320 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1321 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1322 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1323 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1324 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1325 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1326 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1327 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1328 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1329 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1330 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1331 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1332 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1333 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1334 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1335 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1336 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1337 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1338 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1339 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1340 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1341 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1342 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1343 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1344 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1345 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1346 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1347 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1348 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1349 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1350 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1351 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1352 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1353 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1354 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1355 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1356 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1357 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1358 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1359 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1360 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1361 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1362 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1363 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1364 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1365 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1366 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1367 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1368 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1369 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1370 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1371 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1372 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1373 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1374 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1375 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1376 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1377 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1378 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1379 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1380 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1381 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1382 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1383 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1384 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1385 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1386 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1387 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1388 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1389 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1390 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1391 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1392 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1393 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1394 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1395 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1396 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1397 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1398 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1399 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1400 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1401 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1402 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1403 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1404 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1405 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1406 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1407 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1408 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1409 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1410 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1411 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1412 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1413 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1414 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1415 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1416 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1417 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1418 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1419 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1420 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1421 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1422 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1423 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1424 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1425 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1426 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1427 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1428 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1429 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1430 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1431 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1432 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1433 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1434 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1435 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1436 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1437 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1438 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1439 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1440 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1441 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1442 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1443 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1444 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1445 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1446 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1447 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1448 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1449 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1450 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1451 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1452 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1453 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1454 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1455 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1456 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1457 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1458 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1459 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1460 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1461 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1462 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1463 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1464 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1465 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1466 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1467 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1468 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1469 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1470 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1471 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1472 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1473 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1474 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1475 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1476 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1477 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1478 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1479 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1480 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1481 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1482 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1483 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1484 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1485 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1486 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1487 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1488 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1489 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1490 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1491 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1492 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1493 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1494 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1495 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1496 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1497 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1498 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1499 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1500 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1501 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1502 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1503 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1504 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1505 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1506 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1507 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1508 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1509 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1510 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1511 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1512 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1513 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1514 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1515 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1516 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1517 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1518 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1519 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1520 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1521 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1522 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1523 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1524 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1525 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1526 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1527 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1528 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1529 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1530 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1531 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1532 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1533 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1534 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1535 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1536 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1537 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1538 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1539 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1540 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1541 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1542 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1543 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1544 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1545 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1546 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1547 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1548 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1549 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1550 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1551 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1552 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1553 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1554 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1555 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1556 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1557 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1558 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1559 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1560 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1561 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1562 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1563 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1564 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1565 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1566 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1567 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1568 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1569 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1570 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1571 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1572 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1573 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1574 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1575 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1576 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1577 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1578 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1579 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1580 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1581 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1582 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1583 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1584 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1585 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1586 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1587 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1588 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1589 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1590 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1591 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1592 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1593 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1594 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1595 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1596 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1597 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1598 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1599 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1600 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1601 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1602 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1603 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1604 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1605 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1606 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1607 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1608 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1609 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1610 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1611 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1612 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1613 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1614 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1615 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1616 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1617 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1618 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1619 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1620 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1621 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1622 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1623 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1624 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1625 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1626 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1627 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1628 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1629 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1630 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1631 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1632 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1633 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1634 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1635 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1636 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1637 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1638 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1639 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1640 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1641 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1642 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1643 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1644 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1645 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1646 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1647 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1648 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1649 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1650 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1651 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1652 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1653 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1654 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1655 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1656 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1657 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1658 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1659 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1660 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1661 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1662 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1663 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1664 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1665 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1666 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1667 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1668 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1669 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1670 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1671 | 12-judgment: row kept, choice compacted (Part A holds the entry) |
| SCOPE-1672 | 13-staged Staged by the owner's roadmap |
| SCOPE-1673 | 13-staged Staged by the owner's roadmap |
| SCOPE-1674 | 13-staged Staged by the owner's roadmap |
| SCOPE-1675 | 13-staged Staged by the owner's roadmap |
| SCOPE-1676 | 13-staged Staged by the owner's roadmap |
| SCOPE-1677 | 13-staged Staged by the owner's roadmap |
| SCOPE-1678 | 13-staged Staged by the owner's roadmap |
| SCOPE-1679 | 13-staged Staged by the owner's roadmap |
| SCOPE-1680 | 13-staged Staged by the owner's roadmap |
| SCOPE-1681 | removed: narration (the validation records keep it) |
| SCOPE-1682 | 14-appendixA Appendix A |
| SCOPE-1683 | removed: narration (the validation records keep it) |
| SCOPE-1684 | removed: narration (the validation records keep it) |
