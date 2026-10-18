# m0-coverage / read-v13 — what V13 (the world) consumes from and asks of the base and the kernel

- Lane: m0-coverage/read-v13 (Opus/high, a reader; records what the text says, judges nothing). Workflow m0-coverage, launched 2026-10-18 09:13Z (docs/lane-events.log, the LAUNCHED line).
- The owner's question (2026-10-18 ~09:20Z, verbatim): "so verify for more or validate me. M0, as it stands can. support all levels of the map building process form local settlement to world to encounter map in building?"
- Files read (WHOLE for each assigned section; listed ranges):
  - docs/volumes/V13-world.md — 4465 lines, 647489 bytes, md5 d0de9ad8dadfeccc89ac86f2ea4d62f4 (taken 2026-10-18 09:13Z). Sections read whole: §1.2 (:210-255), §1b (:437-576), §2.1 (:579-630), §2.2 (:631-925), §2.3 (:926-1176), §2.4 (:1177-1193), §2.5 (:1194-1237), §2.7 (:1271-1322), §3.0 (:1367-1417), §3.1-§3.6 (:1418-1637), §3.8 (:1711-1791), §3.11 (:2061-2484), §3.12-§3.14 (:2485-2708), §3.17 (:2791-2819), §5.7 (:3101-3117), §6 (:3443-3524), §7.1 (:3541-3555), §10 whole incl. §10.2 (:3900-4274), §12 (:4340-4402).
- Marks: READ = seen in the text at the cite; INFERRED = my reading across cites, not stated in those words.
- Cites are docs/volumes/V13-world.md:line unless another file is named. "§x" in a quote is V13's own pointer into the base (docs/ARCHITECTURE.md) unless prefixed "V13".

## Facts, in the order found

### §1.2 The base hooks consumed (:210-255)

- F1. V13 consumes the base `Terrain` record (its `datumCm`, `heightCm`, `hydro`, `flowDir`, `flatRank`, `flowAccum`, `outfalls`, `seaLevelCm`, `wind`, `geology`, `mining`), `HydroGrid`, `TerrainSampler`, `WaterBody` (course, controls, widthProfile, depthCm, flowFrom, flowTo, spring, bankKinds, shoreClass) and `Outfall` (base §2.3); `datumCm` and `wind` go behind accessors `datumOf`/`windOf` (BCR-V13-2; C13-01); water bodies gain a `WaterSurface`. :214 READ
- F2. The base hydrology mechanism — bucket-queue priority flood with exact flats, two-gradient flat resolution, D8 in the fixed neighbour order, accumulation (base §2.3, §4.2 S1 (3)) — is "run unchanged at the world cell size by W4 ... and by the frame's local re-runs (P3, the cascade); lifted into `@plat/world/hydro` with its tests (BCR-V13-1)". :215 READ
- F3. The base basement water-table rule is replaced by the groundwater accessor `waterTableAt` (BCR-V13-3; V13 §3.12.3). :216 READ
- F4. S1 (base §4.2 S1 (1)-(10)) takes the charter as its one input record and refines inside it (BCR-V13-4); "every other step is unchanged". :217 READ
- F5. S0 on a placed frame resolves coast/river/lake/oasis/relief/geology from the charter; S0's size step is the pure `frameOf(size, aspect)`; standalone frame as before. :218 READ
- F6. The world pipeline is "a product's stage set run on its own document" over the base stage graph, `StageDecl`, `phase`, the tail (base §4.1, §4.12). :219 READ
- F7. `ProductDecl`, `StrategyRegistry.products`, `LadderRouter` (base §4.12 item 202, V07 §2.1): the `world` product registers W0-W9; placement operators are base §7.3 local operators under one stage id `WORLD_PLACE` (BCR-V13-7; C13-27). :220 READ
- F8. `WorldDocument` is a base `Document` whose model is the world's records and rasters; frame gets `Recipe.charter` and `Document.worldRef` (BCR-V13-5) (base §2.9). :221 READ
- F9. Base §6.3 identity/lineage/addresses/anchors used for every world entity's lineage unit and creation key; the namespace segment is item 140 M1. :222 READ
- F10. Base §6.1 RNG, stream keys, concern registry, fixed-key draws: the world's concerns and stage ids (BCR-V13-8; V13 §3.17). :223 READ
- F11. Base §6.2 model digest and records digest: the world's layer nodes; "a placement never enters an arena digest". :224 READ
- F12. Further base hooks consumed (all cited to base sections): §7.1 edit events (BCR-V13-9), §7.2 locks/pins, §7.3 locality (BCR-V13-10; `forkAt` §11.2), §7.4 lifecycle, §7.5 migration, §7.6 override layer/editable tables, §7.7/§14 dossier contract and port (BCR-V13-11), §8.4 layers/lighting (BCR-V13-13), §8.2 style sheets, §8.1/§8.5/§8.8 display list/LOD/tiles, §9.1-§9.5 labels (BCR-V13-16), §11.1 exports (BCR-V13-12), §11.2 embedding API, §11.3/§14 host bridge (`WorldPort` beside `DossierPort`), §12 budgets, §5.1-§5.4 failure/invariants (BCR-V13-18), §13 tests, §14 package layout (BCR-V13-1), §16 build plan (BCR-V13-19), §17.1 clean-room. :225-245 READ
- F13. V14 consumes from V13 `FrameCharter`, `Placement`, the suitability score, the water class test and `ReasonRecord`; "2.5D is V14's R1-R4 over V13 §5.7's drawables (SW-02)". :254 READ
