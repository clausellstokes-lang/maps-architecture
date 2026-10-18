# rewrite-model routing digest (working file; kill-safe resume)

Inputs: §2 = ARCHITECTURE.md lines 469-2451 (copy scratch s2_orig.md); inventory digest inv_by_sec.txt (by subsection);
f items + BCR texts f_bcr_texts.md (line index via grep '^######## f item'); canon model section canon.md 3222-3367.

Method rules decided:
- A canon REFERENCE is applied only where the home really states the fact (checked in the current base/volume text);
  where §3 (kernel) itself cites §2.2 as the home (dissolution, demotion, split flag, re-levelling, pinned-flag release,
  Size), §2.2 keeps it (reported per id in the mapping table, cross-part note to kernel).
- Underground levels: §2.2 rule 1 keeps the level MAPPING (II.7.2 says "the level mapping is §2.2 rule 1's") as a compact
  table per arena kind (ground, underground part 0, further underground part, sky island — f 203/204); stage-writing
  details referenced to II.7.2, II.7.3, II.7.6, V05 §3.8.
- Types used by base records declared in base (MC-11): Segment §2.1; Outfall §2.3 (V04 BCR-1 shape); TypedBoundary,
  FabricStrategyId §2.5 (V01 shapes); DriftBounds §2.6 (V02 §2.1 shape); Rung → §1.1 (scope); TableId → §7.6 (determinism).
- E-37 unit vocabulary type `Unit` in §2.1 (union list); E-15 Cdeg sole angle unit (kernel removes binary angle).
- E-01 stretch-state profile rule at §2.2 rule 5 (knot profiles) with equivalence list; records state value set, knot
  role, absent default, writers, readers.

Per-section to-do (from canon units.model):
2.1: MODEL-0014 ref §6.3; 0017 ref II.7; 0019 ref II.7.4/§7.3 item 9 (d); cluster 001 (part counter once, here);
     cluster 002 (schema-complete and empty once, here); E-15, E-37, MC-11 Segment; f 203 nextSkyPart mention.
2.2: f 203, 204 (sky levels, rim role, sky_access vertex role, void face); KXC-03 (rule 6 → §3.3 for clear rule, §7.2 locks);
     MC-07 (SkyIsland rim/land via f 251); MC-12 (part 0 margin role on pseudo-district, stated once);
     E-01 home here; knot roles gain retaining_state_knot (245), wall_state_knot (575); rim (structural), sky_access;
     refs 0025 0027 0028 0030 0036 0038 0047 0049 0057 0059 0062 0067 0072 0073 0075 0084 0086 0087 0088 0100 0104 0119 0121 0123 (verify each).
2.3: f 205 (Outfall type), 206 (oxbow), 252 also touches §2.3 (waterfall); g 111 wiring (spring/oasis records);
     MC-04 cause convert:<kind>.
2.4: f 207, 208, 209 (Way line order 208→207→209); edges M-model-943 E5 (missing/contradictory data) + E8 test.
2.5: f 210-215, 286 (Reservation.handedFrom), 576 (ContextVector.dist market/harbour), MC-05 (arena 'sky' via 213),
     MC-08 (AssignmentRef, rosterAssignment defined), W-FLD-13 Block.depthClass, MC-11 TypedBoundary/FabricStrategyId,
     MC-01 lot→plot; clusters 007, 008.
2.6: f 216-243, 578, 303, 333, 371 parts; g 105 (Use.branchOf §2.6 and §2.7); MC-01, MC-03, MC-06, MC-09; W-HOOK-02
     (compose → V02, plan → V03); DriftBounds; clusters 003-006, 010, 011.
2.7: f 244-259, 575, 313 part, 362 part; g 106, 109, 110, 113 (history record, LOST access state, symbolic flag); E-01 per
     record; E-02 (keep apart, lift rule once at f 260 §2.8); E-39 (keep apart); V07-XCONF-2 (span rule `country`);
     W-FLD-05 Enceinte.walkCm; W-HOOK-02 staged record volumes; MB-01 (II.7.4 (R12)); combos raised/retaining/deckplot × frame;
     MC-02 lifecycle fields; cluster 013.
2.8: f 260-271, 459 part; MC-04 (cause convert:<kind>); MB-02..MB-13 undeclared types (AssignmentRef, OrphanRecord,
     PackedIndex, UniformGrid, PersonFields, PlotUse, RosterRef, StatisticsRecord, TextRef, NameRef, EditRef, RuleRef);
     MW-05 dossier consumption + ignore-list; g 113 symbolic flag; clusters 009, 011.
2.9: f 272-278, 459 (docId from host), 203 (nextSkyPart); MC-10; W-FLD-06 Recipe.presetId; cluster 012.
Terms: G-lot (14 hits), G-shadows (1 hit, orig line ~1393 of the file = §2.7).

## Progress (kill-safe)
- DONE parts: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6a (records), 2.6b (builder, carry, composition, datum, materials), 2.6c (stage-3 hook, contract, entrances, basements, requested basement), 2.6d (plan rung, elaboration, interior ladder)
- NEXT: 2.7 (read s2_orig lines 1296-1462; f 244-259, 575, 313 (Greenery.along.way?), g 105 Use.branchOf, 106, 109, 113; E-01 per record; V07-XCONF-2 span rule `country`; W-FLD-05 walkCm; MB-01; combos raised/retaining/deckplot × frame; HoodPlace (f 207 b); InstanceOverride type; DeckPlot type)
- THEN 2.8 (1463-1675), 2.9 (1676-1983), assemble, report, results, LANDED

## Decisions log (for the report; JUDGMENT lines)
- J1 refs kept as homes where the home does not state the fact (kernel cites §2.2 as home): MODEL-0025/0027/0028/0030/0036/0038/0062/0067/0072/0075/0084/0086(part)/0087/0088/0100/0104/0119/0121(part)/0123 kept (compacted); valid refs applied: 0047, 0049 (§4.1 rows), 0073 (§3.3 clear region), 0086 first clause (§3.3 no item changes in place), 0057 (II.7.2/II.7.3 for writing details; mapping kept since II.7.2 names §2.2 rule 1 as mapping home), 0059 kept (II.7.6 does not state the further-part levels).
- J2 hinterland "lots" (§2.2 L3, §2.7 LandUse) kept: a hinterland holding (§4.9 weighted-Voronoi lots), a different sense from G-lot's building parcel; "(FTG's around stage lots)" a quotation.
- J3 ground parts ≥ 1 for raised ways (g 110 (b)): PlatKey comment, §2.1 arena parts, Document.nextGroundPart (§2.9) added as the counter (wiring: allocated once, never reused "as the underground's and sky's"); addresses on ground parts stay unprefixed (§2.1 rule "prefixed outside the ground layer").
- J4 types declared in base per S3/MC-11: Segment, Unit (§2.1); OutfallInto/Outfall (§2.3, f 205); FabricStrategyId, SeamRun, TypedBoundary, BlockKind, SquareType (§2.5); WingRole (f 216), MassingFamilyId, MassingRef (+stack), DriftBounds (MC-11), DeckContext, FurnitureItem (f 232), basementDoor signature (§2.6); PackedIndex, UniformGrid (§2.2, MB-04/05). Types left in volumes (cited): DormerRow (V02 §2.2), AccessHead (V03 §2.1), MassingFamilyRow (V02 §2.3).
- J5 Outfall 'lake' mapping gains oxbow (f 206 adds oxbow; V04's mapping omitted it) — edge closure.
- J6 depthClass typed 'standard'|'deep' = S8 deep-interior test, read by §13.5 keep-test (W-FLD-13).
- J7 oasis records (g 111 wiring): WaterBody.spring {at, flow}; Greenery kind grove & LandUse kind garden with fedBy (to add in §2.7); channels derived at draw; lifecycle sentence in §2.3.
- J8 §2.4 missing-data edges defined (unnamed way legal; removed partner key → TradeFlow 0, T77-1 clause cross-note; slopeP95 written on load; formerClass=class reads absent); E8 test = registry path test (§13.2 Document tests).
- J9 MC-09 capacity max(1, …) for residential; 0 for unhoused slot (non-residential); "capacity bounds" stated once (cluster 006).
- J10 stage-3 hook narrative referenced to V02 §3.3–§3.5 (MODEL-0325..0328); intake fallback kept in §2.6 because f 223 rewrites it there (f > canon ref for MODEL-0339).

## Progress 2 (after all sections drafted)
- ALL parts drafted: 2.1 2.2 2.3 2.4 2.5 2.6a-d 2.7a-b 2.8 2.9a-c; narration tags (file f item N, MC-/MB-/W-/E- ids) stripped from parts; assembled_v1 kept in scratch.
- Assemble command: cat parts in order (2.1,2.2,2.3,2.4,2.5,2.6a,2.6b,2.6c,2.6d,2.7a,2.7b,2.8,2.9a,2.9b,2.9c) with blank lines between sections → new/base/model/01-domain-model-and-schemas.md
- Words: original 42,526; first assembly 54,778 (f/g additions ≈ 14k).
- REMAINING: (1) light compression of verbose prose (2.9b load steps, 2.6 capacity/basements, 2.2 rules) — nuance guard absolute; (2) verification sweeps: retired terms (lot, shadow pass), every f item 202-278/575/578 + parts of 286/303/305/313/333/362/370/371/406/420/459/576 present, g 105/106/109/110/111/113 parts present, MC-01..12, KXC-03, V07-XCONF-2, MB-01..13, W-FLD-05/06/13, W-HOOK-02, MW-05, KWG-09/E-15, E-01, E-02, E-37, E-39, clusters 001-014, edges (M-model-943 E5/E8, MC-05, MC-09, combos frame); (3) write rewrite-model.md (sizes, sources, mapping table by script from inventory, rulings, f items, conflicts, renumberings: none, cross-part notes); (4) results json; LANDED line.
- Additional judgments made in §2.7-§2.9: SkyIsland/UndersideProfile/ShadeBasis/SkyAccess referenced to V05 §2.1-§2.2 (canon MODEL-0432 ref + f 251 "as V05 declares"); Tunnel/UndergroundSystem/Gallery/Chamber/UndergroundLink and dossier staged records kept declared in base (V04 §2.1 reads them as base-declared; no volume declares the dossier staged records) — canon refs MODEL-0433..0437, 0443..0445 not applied; Enceinte.closure 'barrier' + anchors multi-stretch (end: number) + arcs [{from,to,barrier}] + stretchClass profile (wall_class_knot) + Gate.mouth (g 106); HistoryRecord one per document in model digest (g 113); Provenance.symbolic; LOST referenced to V04's access-state set (E-39); frame combos defined in §2.7 "At the frame"; presetId readers = §5.4 report recipe line + V09 recipe panel; StatisticsRecord/OrphanRecord/NameRef/TextRef/PlotUse/RosterRef/EditRef/RuleRef/AssignmentRef/PersonFields declared; f 266 (BCR-V6-21) edits §4.11 (pipeline), not §2.8 — cross-part note.
