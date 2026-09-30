# V11 rulings (extracted from canon.json)

## shrink {"words_before": 106185, "goal_band_words_after": [63711, 79639], "narration_ranges_words": 12624, "restatement_items": 70, "bcr_blocks_to_pointers": 12}

## conflicts

### DXC-05 minor FIX units ['determinism', 'pipeline', 'V11']
where: None
- claim: Two registries of the editable tables: §7.6's prose enumeration and V11 §2.1's table registry (one row per table). Neither lists reroll.maxAdvance ("a table value, default 3", §5.1 (6)) or crossing.searchBandM ("default 120 m", §4.2 S1 (5), restated in §6.3's anchor table), which the text calls table values.
- other: V11 §2.1 "The table registry"; §14 @plat/tables list; §4.2 S1 (5) (crossing.searchBandM, pipeline unit)
proposed: One home for the registry (principle (1)); the other points to it; both table values get a named table and row, or are declared constants.
RULING: The table registry's single home is V11 §3.1 (file f item 379, BCR-V11-6 — §7.6's enumeration moves there); §7.6 cites it. reroll.maxAdvance (3) and crossing.searchBandM (120 m), which the base calls table values, become cells of one registered base settings row (canon W-SET-01, which also carries the dynamic grid's cell sizes of KWG-06); §5.1 (6), §4.2 S1 (5) and §6.3's anchor table cite the cells.
basis: f item 379 (a ruled change) > base restatement; principle (7) closes DWG-03

### MC-11 None FIX units ['model', 'V07', 'V11', 'V04', 'V10', 'V01', 'V02']
where: ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.drift (DriftBounds)']
- statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
proposed: None
RULING: Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
basis: principle (1): the base owns what the base builds; f items 385, 505

### CF-PIPE-10 minor FIX units ['pipeline', 'V11']
where: ['§10.2 l.11728-11729', '§10.2 BuildingClassRow comment l.11489']
- what: Sector weights of walls, toll houses and the customs house. §10.2 gives 'gates, toll houses, bridges, roads, walls and the customs house → taxes and tolls (0.7) with trade (0.3) on gates, bridges and roads', so walls, toll houses and the customs house carry 0.7 in total, while the classes' sectors column is declared 'weights summing to 1 per column'.
proposed: Give walls, toll houses and the customs house taxes and tolls 1.0, or state that a link row's weights are renormalised to one.
RULING: Walls, toll houses and the customs house carry taxes and tolls 1.0; gates, bridges and roads 0.7 with trade 0.3 — each class's sector weights sum to 1.
basis: §10.2's own sum rule

### RIC-01 major FIX units ['rendering', 'V11']
where: ['§8.2 Where they bind (L9801)', '§8.2 presets table (L10075)', '§8.2 role continuity (L10068)']
- claim: `parchment` has two statuses and two chroma rules: the palette-target binding calls it 'the reserved `parchment`' and has it aim at the median plate chroma 43 with `lit`, `hatched` and `painterly`, while the presets table lists it as a shipping ink-family variant (with `bw-print` and `night`) that §8.2's role-continuity sentence and §16's M3b row ship at M3b, and the ink family's rule (J-A69.82) holds plate chroma to 20-30. V11 (L983) names it a shipped preset. A builder cannot tell which band its measurement render must land in.
proposed: One status (a shipping ink-family variant at M3b, as the presets table, §16 and V11 have it) and one chroma rule for it (the ink family's 20-30 by J-A69.82, or a stated band of its own); drop 'reserved' for it in the binding sentence.
RULING: `parchment` has one status — a shipping ink-family variant at M3b (presets table, §16, V11) — and one chroma rule of its own: its plate aims at the corpus median chroma 43 (the binding sentence), an exception to J-A69.82's 20–30, which governs `ink`; 'reserved' is dropped.
basis: R7; both facts kept: status from the presets table, chroma from the binding sentence

### V08-XCONF-9 minor FIX units ['V08', 'V11']
where: V08 §2.6 'era' row (line 955) vs V11 §3.19.2 'Era default from the dossier'
- claim: One derivation is written in two homes with different inputs: V11 §3.19.2 says 'V08 derives era from site.culture and the tier' (every culture c14, region western), while V08 §2.6's era row, which owns the reading, maps only the culture ('every culture of the cultures row -> c14 ... the culture is the discriminator'); the tier is read by neither rule's body.
proposed: State the derivation once at V08 §2.6 (culture -> era) and have V11 §3.19.2 cite it without naming the tier, or add the tier's part to V08's row.
RULING: The era derivation's home is V08 §2.6's era row (culture → era); V11 §3.19.2 cites it without naming the tier.
basis: single source (1)

### V09-XAGREE-1 major FIX units ['V11', 'V09', 'V10']
where: V09 §2.6 (screen → row table), §4.7, §10.2 XV-V9-1/XV-V9-2 vs V11 §4.2 (V11 lines 4012-4030)
- claim: V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and puts place, pin and split on use: rows only; (3) V09 says a use: key 'admits the split cell only', V11's use: row carries place, pin, split and specialisation; (4) V09's link view writes siting.linkEdits {avoid: [provider]} ('Cut this link'), V11 §4.2's cells are {bindTo?, cut?} (only V11's wiring row W42 mentions avoid). XV-V9-1 and XV-V9-2 are not marked Met and are not closed at their destination. V10 §4.1's encoders write the same disputed forms (link avoid list; merge allOfKind with cls:<class>).
proposed: Rule the tables' shape once at V11 §4.2 (the owner of the tables): add cls: and avoid, and state which cells each key form admits; V09 §2.6 cites it and maps each screen to a cell V11 declares; mark XV-V9-1/2 closed.
RULING: V11 §4.2 (the tables' owner) states the union of both volumes' needs: siting.declared key forms uid:, cat:, cls: (a roster class no dossier record binds) and use:; the kind keys (uid:, cat:, cls:) admit profile, familyWeights, quarter, place and split; use: admits place, pin, split and specialisation; siting.linkEdits cells {bindTo?, avoid?, cut?} with the three meanings (bindTo keeps a supplier; avoid cuts one, the next nearest serving; cut stops the good at that use). V09 §2.6 maps each screen to a declared cell and cites V11 §4.2; V10 §4.1's encoders write only declared cells; XV-V9-1 and XV-V9-2 are closed.
basis: the tables' owner rules; union of existing statements, nothing lost

### V11-ICONF-1 minor FIX units ['V11']
where: §3.1 rows 62 and 80 (and 81 by reference)
- claim: Readers lists contain conditional clauses left open: row 62 'should T-V11-1 (b) record those reads under S8, the row lists S8 in that change'; row 80 'should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, this row lists EVO_GROWTH in that change, J-V11.92'; row 81 'the same pre-decided move'. The normative readers set is not determined by the text (a readers entry is the invalidation map of §7.6), which is ambiguous normative text bordering on deferral wording.
proposed: Decide the StageId under which an epoch stage's S5b and the seed pass's reads are recorded (per V06 §3.2 / §4.1 registration), and write the determinate readers list.
RULING: Reads are recorded under the registered StageId of the stage function that reads (S8, S5b), never under the calling epoch phase; an epoch re-derives through the epoch fold (V06). Rows 62, 80 and 81 list S8 and S5b and drop the conditional clauses.
basis: determinate readers (the invalidation map, §7.6); no deferral wording (6)

### V11-ICONF-2 minor FIX units ['V11']
where: §3.7.2 produces list
- claim: 'lumber camp logs 0.9, bark 0.1' and later 'lumber camp logs' (no shares) are both in the produces list: a duplicated entry that reads as two different produces sets for one class.
proposed: Delete the second 'lumber camp logs' entry.
RULING: The second 'lumber camp logs' entry is deleted.
basis: duplicate

### V11-ICONF-3 minor FIX units ['V11']
where: §3.13.3 first sentence vs §3.2.1 step 5 and §3.5.14
- claim: §3.13.3 says the compiler emits generic-<f> 'for every profile family f', while §3.2.1 step 5 and §3.5.14 say one per NON-ALIAS family (aliases civic, defence resolve to their target's generic class; 45 generic classes).
proposed: Word §3.13.3 as 'for every non-alias profile family'.
RULING: §3.13.3 reads 'for every non-alias profile family'.
basis: §3.2.1 step 5 governs

### V11-ICONF-4 minor FIX units ['V11']
where: §6 resolveSiting row
- claim: 'resolveSiting (~230 classes ...)' while §3.5.14 counts 181 authored + 45 generic + 2 sky = 228 plus V07's village classes, which step 6 compiles and T-V11-3/-4/-5 run over; the budget's class count omits the v. rows the derivation also iterates (PLAUSIBLE: depends on whether resolveSiting derives v. rows).
proposed: State the count as read from REGISTRY (as the compile row does) or include V07's v. rows.
RULING: §6's resolveSiting row states its count as read from REGISTRY (the authored, generic, sky and V07 v. classes it derives).
basis: one count source

### V11-ICONF-5 minor FIX units ['V11']
where: §9 J-V11.8 vs §3.5.14
- claim: J-V11.8 says '≈ 179 authored town and city classes', while §3.5.14 counts 181 (fort and lighthouse added) and BCR-V11-11 says '≈ 180'; J-V11.94 says 'a town roster holds ≈ 180 classes'.
proposed: Make J-V11.8 read 181 (or '≈ 180' consistently) and cite §3.5.14's count.
RULING: J-V11.8 reads 181 and cites §3.5.14's count; J-V11.94 cites it.
basis: one value

### V11-ICONF-6 minor FIX units ['V11']
where: §12 revision paragraph (line 4841-4843) vs §3.1, §3.5.14, §1b
- claim: §12 states '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)' and wiring 'W1 - W66' as CONFIRMED by script, while the live text has 92 rows, 181 classes and W1-W78.
proposed: Remove with the narration or correct to the live counts.
RULING: §12's stale counts leave with the narration.
basis: principle (5)

### V11-ICONF-7 minor FIX units ['V11']
where: §3.12 mages_guild row (INDEX §7 fix list: SR6-09 (d))
- claim: 'the tower's record binds the guild's hall' is ambiguous (tower becomes the hall, or a new hall takes the tower's key); V08 §3.5.1 (c)'s first case and V06's convert read it as re-designation in place. Open on the INDEX fix list.
proposed: Cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'.
RULING: The mages_guild cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'. Closes SR6-09 (d).
basis: V08 §3.5.1 (c)

### V11-XCONF-1 minor FIX units ['V11']
where: §3.24.1 retaining.settings paragraph
- claim: V11 §3.24.1 says stateSnapCm's register entry is 'V12's retaining line until V12 gives it the line X-V11-17 (f) proposes', but V12 §3.11 excludes stateSnapCm from the retaining line ('every other calibratable column but settings.stateSnapCm') and gives it the default line's entry at M3a, restated in place at V6-E2 by V06 §8's line on bar.T-V6-62, due V6-E7 (J-V12.82). V11's statement is stale and conditional ('until').
proposed: V11 §3.24.1 cites V12 §3.11 (default line at M3a, V06 §8's line from V6-E2); drop 'until'.
RULING: V11 §3.24.1 cites V12 §3.11 for stateSnapCm's register entry (default line at M3a, V06 §8's line from V6-E2); 'until' is dropped.
basis: V12 §3.11 is the register's home

### V11-XCONF-2 minor FIX units ['V11']
where: §3.1 registry row 87 (INDEX §7 fix list: SR6-08 of seam-surfaces-r6)
- claim: Row 87 types every messages/<locale>.json as MsgRow, while V09 §2.9 Locales (J-V9.121) types non-English files as {key; text} only (buttons, tone, codes read from en.json); open on the INDEX fix list (V09 XV-V9-31).
proposed: Row 87's row type 'MsgRow for en.json; {key; text} for every other locale file'; loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows.
RULING: Registry row 87's row type: MsgRow for en.json; {key; text} for every other locale file; the loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows. Closes SR6-08 (surfaces) and XV-V9-31.
basis: V09 §2.9 (J-V9.121)

### V12-XCONF-2 major FIX units ['determinism', 'V11', 'V12']
where: V12 §2.10 vs V11 §2.2 (compiled row) and §3.2.1 step 7
- claim: V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenance and computes the table's content hash (H128) over the canonical JSON bytes, with the recipe pinning version AND hash (§2.9) - so adding evidence moves the hash. The two volumes define the pinning hash differently (and neither says whether provenance date/note are in it; V11 calls a note change a 'patch = no output change').
proposed: Rule once at the base's home (§6.4 / §7.6): the pinning hash covers value, unit, calibratable, extension, presets and excludes provenance (or evidence alone); V11 step 7 computes it that way and V12 §2.10 cites it.
RULING: The pinning hash is defined once at §7.6 (the base home of table versioning): it covers each cell's value, unit, calibratable, extension and presets and excludes the whole provenance block (date, note, evidence); V11 §3.2.1 step 7 computes it so and V12 §2.10 cites it.
basis: base home (1); V11's 'a note change is a patch, no output change' kept

### V11-XCONF-3 minor FIX units ['V11']
where: V11 §3.24.1 last paragraph ('own, calibrate-later at M3a') vs V12 §3.11 register line 21 (panel M4-110 at M4, then corpus E1 at M-CAL)
- claim: V11 dates the three bend cells' calibration 'at M3a' while V12's register line (the single home of calibration method and due) calibrates retainingReachM, flatDepthM, coverShare by the M4-110 panel at M4; read literally the two volumes name different milestones.
proposed: V11 says 'written at M3a; calibrated by V12 §3.11's terrace line' (cite, do not restate the due).
RULING: V11 §3.24.1 reads 'written at M3a; calibrated by V12 §3.11's terrace line'.
basis: V12 §3.11 home of dues

### V11-XCONF-4 minor FIX units ['V11']
where: V11 §8 C0 row exit cell ('plat calibrate register --check runs in CI from here', C0 lands at M0 (b)) vs V12 T-V12-20 ('tier PR from M1') and V12 §3.11 ('T-V12-20 runs at PR tier from M1'); V12 §8 W2 builds the command at M1
- claim: V11 has the register lint in CI from C0 (M0), before V12's W2 builds the command and before V12's tier starts.
proposed: Cite V12: 'register --check joins CI at M1 (V12 T-V12-20)'; C0's exit drops the clause.
RULING: V11 §8's C0 exit cites V12: 'register --check joins CI at M1 (T-V12-20)'.
basis: V12 owns the command and tier

### CANON-C03 major FIX units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
- J121/J122 answered every one.
proposed: None
RULING: INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
basis: J121, J122

### CANON-C04 major FIX units ['scope', 'V01', 'V04', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §7: 'The fix list — deliberately left for the next amendment'.
- The owner's no-defer rule; THE BAR IS ZERO.
proposed: None
RULING: Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.
basis: owner no-defer rule

## elegance

### E-05 UNIFY The table registry: §7.6's prose enumeration (about 60 tables) vs V11 §3.1's registry rows (DEL-09, DXC-05; file f item 379).
unified_form: V11 §3.1 is the registry (one row per table: readers, slice kind, extension and presets); §7.6 cites it.
home: V11 §3.1 units ['determinism', 'V11']
- EQ: every table §7.6 names has a registry row (T-V11-1 fails the build otherwise)
- EQ: readers per table as V11 §3.1 states them, unioned with §7.6's and V11 §1b's (V11-ELEG-1)
- EQ: base table values the base calls table values get a row (W-SET-01)
nuance: None

### E-20 UNIFY Three copies of the owner-item bar convention in §13.2 (EL-01) and every 'no-op pin' bar of the owner items (102 (g), 103 (f), 105, 106, 110 (f), 111 (d), 113 (g)).
unified_form: One convention paragraph in §13.2 ('hard unless banded; tier from §13.8; from the milestone §16 names; a staged engine's bars on hook fixtures until the engine lands; every no-op pin a NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form') cited by every group.
home: §13.2 (scope) units ['scope', 'V11', 'V12']
- EQ: the owner-rules copy's registry path-test list for amendments c
- EQ: the declared-shift clause for goldens
- EQ: each item's off-form cell values (V11 §3.24.0) and its bar id
nuance: None

### E-24 UNIFY Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).
unified_form: One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
home: the index (scope) and each volume's §9 units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
- EQ: no row dropped
- EQ: the governing row keeps the reason
nuance: None

### E-30 UNIFY Cross-table reference cells {ref: {table, row, cell}} defined for village.json only (V07-ELEG-1).
unified_form: Lifted into §7.6 as one reference-cell form for every table, with its compile check (V11's compiler resolves it) and editTable inverse and undo row; V07 §2.2a cites it.
home: §7.6 (determinism); V11 compiler units ['determinism', 'V11', 'V07']
- EQ: the compile check (a reference to a missing row fails the build)
- EQ: editTable's inverse and undo row
- EQ: V07's existing references to V11 §3.6.1, §3.24.1, §3.24.4 expressed in the one form
nuance: None

### E-34 UNIFY Each table's readers stated three times in V11 (W rows, §2.10's read cells, §3.1's registry) and item 110's lifecycle rows repeating one pattern (V11-ELEG-1).
unified_form: §3.1's readers are the single source; §1b and §2.10 cite the row number; item 110's tables share one lifecycle pattern row with per-table exceptions.
home: V11 §3.1, §2.10 units ['V11']
- EQ: the union of every reader listed today (W19's V07 pump date added to row 50, V11-WGAP-1)
- EQ: each table's exceptions to the pattern
nuance: None

### E-37 UNIFY Unit vocabularies: the base §2.1 units, V11's ColumnSpec.unit and V12's metric Unit (V12-TERM-2, V11-RESTATE-1).
unified_form: One unit vocabulary in §2.1, the union of all three (m, m2, ha, cm, cdeg, deg, share, weight, people, count, yr, wk, m3, lvl, perHa, perKm, ratio, bits, ms, s, luma, rb, chroma, z, none); V11 and V12 type their fields by named subsets.
home: §2.1 (model) units ['model', 'V11', 'V12']
- EQ: deg (measured metric angles) and cdeg (model angles) both kept
- EQ: count and people both kept
- EQ: each volume's subset exactly its current list
nuance: None

### E-38 UNIFY territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.
unified_form: haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.
home: V07 §3.9 (1) units ['V07', 'V11', 'V12']
- EQ: the farm rows' values unchanged
- EQ: A_T = households × the per-head sum
- EQ: V12's register: the farm rows are the calibratable cells; haPerHead leaves the register
nuance: None

## wiring

### DWG-03 dangling minor ['determinism', 'V11']
piece: reroll.maxAdvance, crossing.searchBandM called table values, no table row
link: Name each value's table and row (and its range for the tables editor), or declare it a constant.
RULING: CLOSED by W-SET-01 (the base settings row).

### KWG-06 dangling minor ['kernel', 'V11']
piece: dynamic grid cell sizes called table values, no table row
link: Name the table row (or declare them kernel constants, not table values).
RULING: CLOSED by W-SET-01.

### V11-WGAP-1 hook-one-ended minor ['V11']
piece: registry row 50 (era) omits V07's reading stage
link: Add V07's reading stage (VS8) to row 50's readers; derive W19's consumer list from row 50 instead of restating it.
RULING: WIRE: write the named link at its home (the link column), both ends

### W-SET-01 dangling minor ['V11', 'determinism', 'pipeline', 'kernel']
piece: values the base calls table values with no table row: reroll.maxAdvance (3, §5.1 (6)), crossing.searchBandM (120 m, §4.2 S1 (5), §6.3), the dynamic grid cell sizes (§3.3; KWG-06)
link: V11 §3.1 registers one base settings row holding the three cells with their values and readers (§5.1, §4.2 S1, §6.3, §3.3); the base cites the cells by name and states no value (DXC-05, S2)
RULING: canon (DXC-05)

## id rulings

### ID-BCR V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01).
RULING: Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten.
renumber: [{"from": "V01 BCR-n (bare BCR-n in V01)", "to": "BCR-V1-n"}, {"from": "V04 BCR-n (bare BCR-n in V04)", "to": "BCR-V4-n"}]

### ID-WX Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08).
RULING: They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records.
renumber: []

### ID-DR Derivation rows proposed under working names (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1–DR-V8.8) and numbered by J-VI.13 / file f item 383.
RULING: The numbers DR26–DR35 are the only ids everywhere in the set (DR26 = DR-V1.1; DR27 = DR-SKY; DR28 = DR-V6.1 = DR-V8.6, one row; DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8); the aliases are retired (glossary G-DR). g item 113's history rows take DR36 onward, numbered by the determinism editor in §7.7's order and cited by V04, V06, V08.
renumber: [{"from": "DR-V1.1", "to": "DR26"}, {"from": "DR-SKY", "to": "DR27"}, {"from": "DR-V6.1 / DR-V8.6", "to": "DR28"}, {"from": "DR-V8.1", "to": "DR29"}, {"from": "DR-V8.2", "to": "DR30"}, {"from": "DR-V8.3", "to": "DR31"}, {"from": "DR-V8.4", "to": "DR32"}, {"from": "DR-V8.5", "to": "DR33"}, {"from": "DR-V8.7", "to": "DR34"}, {"from": "DR-V8.8", "to": "DR35"}]

### ID-DUPDEF The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry.
RULING: No renumbering beyond the rulings above.
renumber: []

## g parts

### g item 111 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "model"
- "determinism"
- "rendering"
- "scope"
- "V07"
- "V08"
- "V11"
- "V06"
- "V05"
- "V09"
- "V10"
- "V12"

### g item 112 new design at build depth in every named unit; F-MISSING if absent
- "rendering"
- "scope"
- "V09"
- "V12"

### g item 113 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "determinism"
- "scope"
- "model"
- "V06"
- "V08"
- "V04"
- "V07"
- "V11"
- "V09"
- "V10"
- "V12"

## owner questions
- {"unit": "V11", "question": "Q-V11-1", "subject": "the sensitive catalogue kinds", "answer": "J122: keep, concealed by default in player views, shown as SettlementForge's own settings show them"}
[{"q": "Q-V11-1", "subject": "the sensitive catalogue kinds", "answer": "J122: keep, concealed by default in player views, shown as SettlementForge's own settings show them"}]

## cohesion
- The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.
- The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).
- The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.
- One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).

## canon decisions
- {"id": "J-C1", "decision": "The default ink map keeps its gentle cast shadows in its own ink; only the MFCG parity preset draws none (J-A68.81 as designed).", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C2", "decision": "The `ink` plate chroma stays 20–30 (J-A69.82 as designed); `parchment`, a shipping ink-family variant at M3b, aims at the corpus median 43 (RIC-01).", "basis": "J122 delegation; keeps both statements"}
- {"id": "J-C3", "decision": "The item-72 surplus-pressure reading stands as designed.", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C4", "decision": "A raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open (reason `country`) at every rung (V07-XCONF-2).", "basis": "realism tiebreaker; one rule at the span rule's base home"}

## requests_in_f
- BCR-V11-5 -> item 258 | 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins
- BCR-V11-27 -> item 259 | 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins
- BCR-V11-18 -> item 288 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1
- BCR-V11-28 -> item 289 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1
- BCR-V11-6 -> item 379 | 7.6 The override layer and editable tables (G-P12; owner amendment 5)
- BCR-V11-10 -> item 380 | 7.6 The override layer and editable tables (G-P12; owner amendment 5)
- BCR-V11-7 -> item 400 | 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the A
- BCR-V11-29 -> item 401 | 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the A
- BCR-V11-30 -> item 412 | 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer 
- BCR-V11-26 -> item 425 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-1 -> item 432 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-2 -> item 433 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-3 -> item 434 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-8 -> item 435 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-13 -> item 436 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-16 -> item 437 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-17 -> item 438 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-19 -> item 439 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-20 -> item 440 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-24 -> item 441 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-25 -> item 442 | 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)
- BCR-V11-12 -> item 446 | 10.4 Names, descriptions and setting packs
- BCR-V11-23 -> item 456 | 11.1 Formats
- BCR-V11-22 -> item 477 | 12.4 CITY per-stage split (SCL-3)
- BCR-V11-4 -> item 510 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V11-4 -> item 520 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V11-11 -> item 532 | §16 Build plan — calibration and spikes first, then a viewable town, then editin
- BCR-V11-21 -> item 534 | 17.1 The clean-room chain (IMP-1; D-29)
- BCR-V11-15 -> item 553 | II.7.3 The underground neighbourhoods (item 12): the owner's three rules as inva
- BCR-V11-14 -> item 566 | II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (it
- BCR-V11-11 -> item 568 | §16 Build plan — calibration and spikes first, then a viewable town, then editin
- BCR-V11-31 -> item 581 | 7.6 The override layer and editable tables (G-P12; owner amendment 5)

## bcr_pointer
- V11-0623 BCR-V11-1 -> item 432
- V11-0624 BCR-V10-2 -> item 311
- V11-0625 BCR-V11-4 -> item 520
- V11-0626 BCR-V11-7 -> item 400
- V11-0627 BCR-V11-10 -> item 380
- V11-0628 BCR-V11-13 -> item 436
- V11-0629 BCR-V11-16 -> item 437
- V11-0630 BCR-V11-18 -> item 288
- V11-0631 BCR-V11-21 -> item 534
- V11-0632 BCR-V11-24 -> item 441
- V11-0633 BCR-V11-27 -> item 259
- V11-0634 BCR-V11-31 -> item 581

## history_out []

## terms
- {"id": "G-lot", "retired": "lot, lot-driven, lot-derived, BuildingInput.lot", "term": "plot (field BuildingInput.plot)", "count": 2, "lines": [283, 1320]}
- {"id": "G-cite", "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …", "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y", "count": 256, "lines": [240, 247, 270, 278, 291, 308]}
- {"id": "G-unitinput", "retired": "SkyHandover, hand-over (the unit-run view)", "term": "SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover)", "count": 1, "lines": [4377]}
- {"id": "G-strike", "retired": "decline pool, decline lottery, the lottery", "term": "strike pool (defined once in V06 §3.5.2)", "count": 4, "lines": [907, 908, 3340, 3341]}
- {"id": "G-DR", "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8", "term": "DR26–DR35 (ID-DR)", "count": 19, "lines": [263, 264, 286, 310, 709, 1566]}
- {"id": "G-panelgroup", "retired": "panel M4-110", "term": "the M4 panel's M4-110 group", "count": 2, "lines": [3722, 4383]}
- {"id": "G-fallbackclass", "retired": "fallbackClass", "term": "item 104 (a)'s resolution (V11 §3.13)", "count": 3, "lines": [4608, 4678, 5062]}
- {"id": "G-digest", "retired": "nearbyResources[], site.terrainType", "term": "site.deposits; site.terrain", "count": 1, "lines": [5213]}

## agreement_disagreements
- {"subject": "TableId", "with": "V07", "rulings": ["MC-11"]}
- {"subject": "T-V6-62", "with": "V12", "rulings": ["V11-XCONF-1"]}
- {"subject": "T-V11-18", "with": "V12", "rulings": ["V12-XCONF-4"]}
- {"subject": "TableId", "with": "model", "rulings": ["MC-11"]}