
=== REPLACE ### 1b Wiring table ===
### 1b Wiring table

Every new piece, what feeds it and what it feeds. For a table, *consumed by* cites its registry row, whose readers
(V11 §3.1) are the one list of the stages, phases and modules that read it (E-34); the column adds only consumers that are
no table readers (tests, the editor, the clerk, exports). *Base hook* names the base section it plugs into and the file f
item that carries this volume's change there.

| # | piece | produced by (fed from) | consumed by (feeds) | base hook | dossier field and derivation row |
|---|---|---|---|---|---|
| W1 | `TableSchema` registry (V11 §2.1) | `@plat/tables` source (`registry.ts`) | the compiler, the loader, the tables editor (V09), the docs generator (§14 `docs`), the provenance audit (M4) | §7.6, §14 (file f item 379) | — |
| W2 | authoring source files `src/<table>/*.json5` (V11 §2.2) | authors (V11 §8) | the compiler | §7.6 | — |
| W3 | the compiler `tables compile` (V11 §3.2) | W1, W2 | shipped `tables/<id>.json`, the manifest, the clean-room scan input, CI | §7.6, §17.1 (5) | — |
| W4 | `TableView` with derived family rules (V11 §3.3.4) | the loader over the override chain (§7.6) | every reader of every registry row; tagged per StageId in the integration suite (T-V11-1 (b)) | §4.1, §7.6 | — |
| W5 | `SitingProfile` on each class and profile family (V11 §2.3) | V11 §3.4 rows, the class deltas of V11 §3.5 | W4's family derivation; item 104's resolver; rows 17, 33; the clerk's "why" (V10) | §10.2 (file f item 432) | a dossier institution's class through V08's chain (DR24) |
| W6 | `RelationFamilyRow` table (V11 §2.4, V11 §3.3) | V11 §3.3 rows | W4's derivation of `fam/…` rows (row 34) | §4.7 S10b (file f item 433) | — |
| W7 | `SignaturePairRow` table (V11 §2.4, V11 §3.8) | V11 §3.8 rows | W4 (compiled into `sig/…` `RelationRule`s on both classes; row 35) | §4.7 S10b | — |
| W8 | goods columns on `ResourceRow` (V11 §2.5, V11 §3.7), `demand` included | V11 §3.7 rows | row 19; the compiler's orientation derivation (V11 §3.7.3) | §10.2 (file f item 434); §4.2 S2, §4.7 S10b (file f item 288) | `activeChains[].outputs` and mapping.md row 44's export, import, local-production and transit lists, resolved to goods by V11 §3.13.5's good-word rows (V08's adapter applies them) |
| W9 | balance, orientation, split, coverage columns (V11 §2.3) and `coverage.rosterWeight` | V11 §3.5 rows; `roster.settings` | rows 17, 24; V06's openings | §10.2 (file f item 432) | — |
| W10 | `LadderStepRow` table (V11 §2.6, V11 §3.12) | V11 §3.12 rows | row 66 | §7.7 T9, DR9; §10.2 (file f items 510, 520) | `institutions[].catalogId` → kind → step; `promotedFrom` / `demotedFrom` (V08) |
| W11 | `WallBarrierRow`, `WaterfrontThreatRow` (V11 §2.7, V11 §3.16) | V11 §3.16 rows | rows 14, 15 | §2.7, §4.2 S3 (9) (file f item 258) | stressors, `activeConditions[].archetype`, DR3's hostile sea partners, `config.monsterThreat`, `config.tradeRouteAccess` (mapping.md rows 10, 11, 49, 70) → V08's `threats` row set (V08 §2.6, J-V8.50) → the neutral threat key → this table → DR2 |
| W12 | `kinds` rows, 280 (V11 §3.11) | this volume | row 64 | §14 item 7 | `institutions[].catalogId` |
| W13 | `archetypes` 17, `categorySynonyms`, `keywords`, `generic-<family>` classes (V11 §3.13) | this volume; the compiler emits the generic classes | row 65 | §14 item 7 | `custom.sceneProfileId`, `category`, `tags`, name and `desc` words |
| W14 | custom-chain placement rules (V11 §3.13.4) | this volume | row 37 | §4.7 S10b | V08's `CustomChainRecord` |
| W15 | district-kind rows (V11 §3.9) | this volume | row 18; the whole-neighbourhood assignment (§7.7) | §10.2 `districtKinds` | quarter names through T6 (V08) |
| W16 | quarter-identity rows (V11 §3.10) | this volume | row 28 | §4.5 (4), §10.2 | district-defining kinds (T9), naming claims (item 82) |
| W17 | cover and concealment rows (V11 §3.14) | this volume | rows 17, 26; the knowledge filter of player views (§9.2; V11 §3.14.3) | §10.2 | `facets.clandestine`, `facets.subterranean` (V08 row 33) |
| W18 | sector, power-link, sector-link rows (V11 §3.15) | this volume | rows 29, 31 | §10.2 | `economy.incomeSources` (T13), `powers[]` (T15) |
| W19 | `EraRow` table (V11 §3.19.1) | this volume | row 50 | `CircumstanceSlice.era` (file f item 400) | `site.culture` → era by V08 §2.6's era row |
| W20 | `MaterialRow` rows (V11 §3.19.3) | this volume | row 49 | §2.6 | `materialFamily` of a custom record (item 104) |
| W21 | `ClimateRow` rows (V11 §3.17), with the farm-mode override `farmLayout`, item 111's dry-country cells, item 117's season cells and item 124's weather cells, and the table's `settings` row (V11 §3.17.1, V11 §3.25.1, V11 §3.25.6, V11 §3.25.11) | this volume | row 43 | §4.9; §4.2 S0, S1, S3 (6), §4.5, §4.7 S10b (item 111); §8.2 (item 117); §6.1, §8.2, §8.4 (i) (item 124) | `site.terrain`, `site.culture` → biome (the digest's `site` row, V08 §2.6; J-VI.25); the terrain type → biome by V08's `climates` row set (§7.7's DR42; item 125 (b)); `oasis_water` → the oasis (DR1) |
| W22 | grammar slices and descriptions (V11 §3.20) | this volume's grammar sources + authored corpora | rows 68–71; V05's island names, V01's local places and way names | §10.4 | claimed names (item 82) bypass the grammar |
| W23 | government, religion, household rows (V11 §3.21) | this volume | rows 21–23 | §10.2 | `government.name` (T14), `religion` (V08) |
| W24 | `villageForm` column fill (V11 §3.22) | this volume | row 17: V07 §3.11's substitution | §10.2 (file f item 430) | DR24 at village rungs |
| W25 | the table manifest, `dist/evidence.json` and the provenance report (V11 §3.2.1 step 7) | the compiler | the M4 provenance audit, release notes, the corpus stage (§13.9), the tables editor's cell inspector (V09 §4.14), V12's register lint | §13.9, §6.4 | — |
| W26 | row-level "why" ids (V11 §2.4) | W4's derivation | `PlacementSolver.explain` and its `WhyPull.row`, V06's `UseMove.why`, the clerk (V10), the siting panel (V09), `exportWhy` (W45) | §4.7 S10b (file f item 311) | — |
| W27 | the `crypt` column (`always` / `basement` / `never`), `cryptM2` and `crypt.rankShare` (V11 §3.5.8) | V11 §3.5.8 rows; `roster.settings`; a dossier crypt record or the `crypt` keyword binds `always` | rows 17, 24; V05's rim-slab vault; V09's crypt line, V10's why, V12's register | §10.2 (file f item 436); §2.6 | the cathedral records (`cathedral_10_000_only`, `great_cathedral`) and church records (V08 DR32) → classes by V11 §3.11; a dossier crypt record → `always` (V08) |
| W28 | the burial faces: the `churchyard` yard part of the `church` and `cathedral` families, the `burial` yard part of the `cloister` and `burial-ground` families, the `Cemetery network` COUNT row (V11 §3.6.1, V11 §3.12) | V11 §3.6.1, V11 §3.12 rows | rows 17, 66; V06's lineage keys, V07 §3.12's hand-off | §2.5 `YardPart`; §4.9's churchyard row | `burial_ground`, `graveyard`, `parish_burial_grounds`, `burial_grounds_and_charnel_house`, `cemetery_network` (V08 DR32) |
| W29 | the catacomb rows (`under.catacomb`: count, order, chances, `rankCap`, growth, fill, join, charnel; V11 §3.23.8) | V11 §3.23 | row 58a; V09's catacomb view, V10's why | II.7.6 (file f item 566); V04 §2.3's `CatacombRule` | the church count from church records and their ranges (item 108 (c); V08 T9 / DR9 over `dossier.ladders`) |
| W30 | the ruin rows (`under.ruin`: chances, significance, burial by age, the four ancient-culture rows, survival, the void-source rank, magic lights; V11 §3.23.2–V11 §3.23.6) | V11 §3.23 | row 58a; V12's `paired` and `twoSample` bars | II.7.5, II.7.6; V04 §2.3's `RuinRule` | `ancient_ruins` deposit, `ruined-landmark` records, `magical_node`, ley-line income rows, `history` events of type `magical`, `history.age`, delving institutions (V08's DR30–DR32) |
| W31 | the opening and dig rows (`under.openings`, `under.dig`; V11 §3.23.7) | V11 §3.23 | row 58a; V12's `voidSealedDeep` and `voidAccessible` bars | II.7.3 *Basement accesses*; V04 §2.3's `UnderOpeningRow`, `DigRule` | a ruin known to the dossier (`ruined-landmark`, `ancient_ruins` discovered) → `ruin_entrance` 1 |
| W32 | the cavern cells (item 109 (a)'s values; `miningCellShare` 0.02) | the base (item 109); V11 §3.23.1 | rows 9, 59 | §4.2 S1 (10) (`Terrain.mining`'s test) | `site.terrain: mountain` → mountainous (DR1); the mining deposits (V08) |
| W33 | the `naming.ruin` slice and the corpora `ancient.root`, `ruin.generic` (V11 §3.20) | V11 §3.20 grammar; corpora authored | row 68 | §10.4 | a civilisation named by `history` bypasses the grammar (item 82) |
| W34 | the `building.wingRole` slice (V11 §3.20.1) | V11 §3.20 | row 68 | §10.4 | — |
| W35 | the pseudo-class `@absent:<class>[+<class>]` (V11 §3.11) | V11 §3.11 rows | row 64: V08's DR24 routing → S2 zeroes the class's `min` and demand (at a village rung, the `v.` class that plays each named class through its `villageForm`, V07 §3.11 step 1) | §4.2 S2 (via V08) | `access_to_external_mill`, `access_to_parish_church` |
| W36 | hinterland land-use providers of a good's `site.landUse` | V11 §3.7.1's `site` column | row 19 | §4.2 S2, §4.7 S10b (file f item 288) | — |
| W37 | coverage units at a plot and the roster's coverage option | V11 §2.3, V11 §3.3.1, V11 §3.5.1 | S10b's `cov/<class>` term, S2's count draw at the base rungs (none at the `territory` rungs, V11 §3.5.1); V12 §3.6's `servedShare` over the same units | §10.2 (file f item 433) | — |
| W38 | feature classes `wall`, `wallInner`, `open:square`, `open:green`, `gate`, `harbour`, `raised:terminal` | S3 (the enceinte), S10 (0) (the inner setback band), S7b and S12b (squares, greens), S7 (gates), S3 (the harbour), the aqueduct generator (the terminal) | `resolveSiting`'s rows, S10b's rasters | §4.7 S10b (file f item 433) | — |
| W39 | relative `upstream`, `downstream`, `upwind`, `downwind` with a `to` | V11 §3.3.1's water family, the pairs | S10b's satisfaction | §10.2, §4.7 S10b (file f item 437) | — |
| W40 | `DistrictKindRow.affinity` | V11 §3.9 rows | row 18 | §10.2 (file f item 438) | — |
| W41 | `LadderStepRow.identity` and the QUARTER identity rows (V11 §3.10, V11 §3.12) | V11 §3.10, V11 §3.12 | rows 28, 66; V01's quarter records | §10.2 (file f item 439) | QUARTER records (V08 T9) |
| W42 | the `siting.declared` key forms and cells; `siting.linkEdits`' `{ bindTo?, avoid?, cut? }` (V11 §4.2) | V09's gestures (V09 §2.6), the clerk's accepted proposals (V10 §4.1) | row 76 | §7.6 (file f item 380) | never written to the dossier (item 20 (h)) |
| W43 | provenance sources `general ⟨practice⟩`, `sf:⟨file⟩@⟨baseline⟩`, the cell's `evidence` and `ownerRule` | authors; V12's accepted runs; the compiler's owner-rule stamp (V11 §3.2.1 step 4) | the compiler, the tables editor, the clerk, the M4 audit, `dist/evidence.json` | §17.1 (6) (file f item 534); §7.6 (file f item 381) | — |
| W44 | the id forms `drv/<driver>`, `bal/<class>` (V11 §2.4) | the field's driver table; W4 | §11.2's `WhyPull.row` and `FieldDrivers`, V09's siting panel | §4.7 (file f items 311, 297) | — |
| W45 | `exportWhy` (V11 §5) | the export options | GeoJSON and CityJSON writers | §11.1 (file f item 456) | — |
| W46 | the committed catalogue manifest `src/dossier/catalogue.<line>.json` with its `ladderPairs` and its crisis census (item 122) | V08's build step | row 77: the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over the census lists `crisis.stressors`, `crisis.archetypes` and `crisis.events` (T-V11-46 (a)) | §14 item 7 | the line's catalogue, the ladder file's pairs and its crisis words in V08 §2.4's manifest shape (V08 §3.5.1 (f)) |
| W47 | class tags (`profile family`, class id, `church-family`, `notice`, `riverbank`) and the derived `noxious` and `cluster` (V11 §3.5.1) | the compiler | row 17; §4.5 (2)'s plot mix, the notice posts, V06's church-family reads | §10.2 | — |
| W48 | `HeightsRow.attic`, `parapetCm`, `towerStoreyCm` (file f item 427), the role table (V11 §3.6.5), the `sky-*` district kinds and the landing rows (V05) | V11 §3.6, V11 §3.9, V11 §3.5.13 | rows 5, 17, 18 | §10.2, §2.6 | — |
| W49 | `terrace` and `retaining` (V11 §3.24.1), the relief column `terracedEdges` | V11 §3.24.1 rows | rows 9, 78, 79; V01's `levelledUnits`; V12 §3.4.2's `retaining.onFlatM` (0 by rule) | §2.7 `RetainingWall`, §4.7 S10–S11 (item 110 (a)); §4.2 S1 (file f item 289) | — (relief from the terrain row; a dossier `mountain` terrain is mountainous, DR1) |
| W50 | `raisedWays` with its `settings` and `structure` (V11 §3.24.2; `structure.stripMarginM` the under-deck strip's margin) | V11 §3.24.2 rows | row 80; V08's DR35 (its landmark threshold, W74); §4.6 S8's under-deck strip, V01 §3.17.3 (2), V06 §3.19's clearance (`stripMarginM`) | §3.4's ground parts, §4.3, §4.6 (item 110 (b)) | the water-system record, the landmarks on high ground, `site.culture` (V11 §3.24.7) |
| W51 | `ways.crossing` (V11 §3.24.5) | V11 §3.24.5 rows | row 81; V10's why (`cross/<class>`) | §2.4 `WayClass` | — |
| W52 | `deck` and the compiled `deckOk` (V11 §3.24.4) | V11 §3.24.4 rows; the compiler (step 5a) | rows 17, 82; V10's why (`deck/…`, `deckok/…`) | §2.7 deck plots (item 110 (d)); §10.2 (file f item 432) | — |
| W53 | `deck.landmarks` and the classes `fort` and `lighthouse` with the template family `fort` | V11 §3.24.4, V11 §3.5.7, V11 §3.5.9, V11 §3.6.1 | rows 17, 83; `naming.landmark` (row 68); §5's fortified and institution symbols | §4.8 (item 106 (e)'s chain tower) | the waterfront threat key through V11 §3.16.2 (V08's `threats` row) |
| W54 | `roster.specialisations` and the `stepped-shrine` heights row | V11 §3.24.3, V11 §3.6.4 | rows 5, 84 | §4.7 S11, §2.7 `Use.specialisation` (file f item 259) | `site.culture` (V08 DR15) |
| W55 | the ancient-culture `monument` cells (V11 §3.23.4) | V11 §3.23.4 | row 58a | II.7.6 | the ruin's sources (W30) |
| W56 | `water` and `ClimateRow.rainMmPerYear` | V11 §3.24.6, V11 §3.17.1 | rows 43, 85 | §4.2 S1, II.7.6 (`cisternDistM`) | — |
| W57 | the feature class `raised:terminal` and the criteria row `pc/aqueduct/<way lineage>` | V11 §3.3.3; the aqueduct generator writes the row only on a `conduit_house` the roster or the dossier holds (else the terminal is a fountain pin) | S10b's placement of the one `conduit_house` bound to a cistern terminal; V04's terminal cistern under its yard | §7.7 `PlacementCriteria` (file f item 401) | the `aqueduct_or_water_system` record's bound conduit house (V08 §2.6b (1) (c)) |
| W58 | the era factors `aqueductM`, `raisedVaultM` and the culture `building` block (`aqueductM`, `elevatedM`, `raisedVaultM`) | V11 §3.19.1, V11 §3.20.3 | rows 50, 71 | `CircumstanceSlice.era` (file f item 400) | `site.culture` and the era V08 resolves |
| W59 | the structures decline block and the structure material keys (`retaining`, `raised:<kind>`, `pier`, `deck`), the wall materials `dry_stone`, `earth_bank`, `timber_crib` | V11 §3.18, V11 §3.19.3 | rows 46, 49; V09's style panel | §4.11, §2.6 `MaterialRow`, §8.2 | — |
| W60 | the naming additions: `naming.ruin`, `building.wingRole`, `naming.formerWall`, the `raised` guard, the fort, lighthouse and mole landmark forms, the `terraced` district feature, the `vaults` slice's arch-vault name, their corpora | V11 §3.20 | row 68 | §10.4 | a ruin civilisation named by `history` bypasses the grammar (item 82) |
| W61 | the owner items' switches and off forms — item 110's (`terrace.enabled`, `raisedWays.chance`, `deck.offer`, `roster.specialisations`, `deck.landmarks` chances, V03's `roomProgram` `exposureAllStoreys`) and items 111 and 113–118's (V11 §3.24.0) | V11 §3.24.0; the parity presets (§7.6) | every such reader's no-op path; T-V11-31, T-V11-38 – T-V11-43; V02's T-V2-50, V03's T-V3-34, V06's T-V6-65, T-V6-71, T-V6-73, T-V6-74, V07's pins; the NoOpPin registrations on V12 §3.7.8's engine (E-20) | §7.6; §13.2 | — |
| W62 | the `v.<id>` village namespace in `roster.classes` and the `villageForm` targets (V11 §2.9, V11 §3.22) | V07 §2.4's rows (their keys), this volume's column | row 17: V07 §3.11's substitution (DR24 at village rungs), the compiler's T-V11-3 clause, every table naming a village class (V07's supply, ladder and dig rows; V11 §3.5.8, V11 §3.23.8, V11 §3.24.3) | §10.2 (file f items 430, 432) | DR24 at village rungs |
| W63 | `GovernmentRow.villageSeat` (V11 §2.8, V11 §3.21.1) | V11 §3.21.1 rows, from V07 §3.11 DR11 | row 21: the `@seat` pseudo-class at village rungs (V07 §3.11 step 1); S2's government step at the territory rungs, which reads this column alone (V07 §3.2 (3)) | §10.2 (file f item 435) | `government.name` → T14's kind → this row (V08) |
| W64 | the archetypes' `village` cell (`ArchetypeVillageCell`, V11 §2.8, V11 §3.13.2) | V11 §3.13.2's column, V07 §2.4's values | row 65: V07 §3.11's item-104 reading (before `villageForm`); T-V7-21 | §14 item 7 (V08's `archetypes` shape) | `custom.sceneProfileId` |
| W65 | `WallBarrierRow.arcKind` and the closure-feature rule (V11 §2.7, V11 §3.16.1) | V11 §3.16.1 rows | row 14; V10's unwalled-arc answers, V12's `closure` features and file f item 447's export, V09's preview arcs (J-VI.3) | §2.7 (file f item 258) | the threats as W11 |
| W66 | the village naming slices `naming.villageEnd`, `naming.field` and the village features of `naming.settlement` and `naming.way` (V11 §3.20.1) | V11 §3.20's grammars; corpora authored; V07's VS8 ends, anchors and S12a fields as features | row 68; V07 §5.3's labels | §10.4 | a dossier's names protected (DR14) |
| W67 | the web's off form `web.off` and the switches `orientEnabled`, `splitEnabled` (V11 §3.7.4) | V11 §3.7.4 rows; the parity presets (§7.6) | row 36 through the loader (V11 §3.2.2); the web's no-op pin (T-V11-21), V06's T-V6-44, V12's bar map 105 (k) `noRegression` reference arm (V12 §2.7) | §7.6 | — (the dossier's own chains stand, item 105 (i)) |
| W68 | the preset entries on V11's cells (V11 §2.2's rule) and the `PresetId` union | V11 §2.2's rule; written at C2 and C3b (MFCG, FTG), with V07's V-M0, the milestone whose content ships the `VG` preset file (VG; V07 §8), and V02's M6c (FM) (V11 §8) | the compiler's preset check (V11 §3.2.1 step 4); the loader's preset step (§7.6's order) → the off forms of V11 §3.7.4 and V11 §3.24.0 under the zeroing presets, the stepped and deck families off under FM; T-V11-21; V12 §3.7.2 (3)'s run scope and V12 §3.7.6's emission target | §7.6 (file f items 376–377) | — |
| W69 | the bench-bar registrations of the bars V11's register entries name — the base's T16-4 and V11's T-V11-30, each a V12 `BenchBarDef` (V11 §8) | the seat landing C1 (T16-4, `owner` `'base'`) and the seat landing C2 (T-V11-30, `owner` `'V11'`), each in the change that writes the entry naming it | `plat parity`'s bar rows → the metrics `bar.T16-4` and `bar.T-V11-30` (V12 §2.1); V12's register lint (T-V12-20) over V11 §8's `detourFactor` line and V12 §3.11's item-102 line | §13.2 (T16-4's check); V12 §2.1 | — |
| W70 | the village-read scope of `VG` — the source manifest's `productStages.village`, the compiled `villageRead` flag per table and the manifest's `villagePresetCells` (V11 §3.2.1 steps 1, 4, 7) | the seat landing V07's V-M0 (the stage ids `ProductDecl('village').stages` registers, V07 §3.0, with its fallbacks' stages); the compiler over `REGISTRY`'s `readers` | the compiler's preset and off-form checks under `VG`; the loader's preset step under `VG` (V11 §3.2.2); V07 §3.15's `VG` cell list, checked complete against `villagePresetCells`; T-V11-9 | §7.6 (file f items 377, 581) | — |
| W71 | the registry's readers as StageIds, the source manifest's `stageIds`, the compiled `stageReaders` per table, the group entry `S5` (V11 §2.1, V11 §3.1's *Readers*, V11 §3.2.1 steps 1, 6, 7) | the seat landing each change that registers a stage (its ids into `stageIds`); the registry source | the compiler's reader check (step 6); the village-read test (step 4) and the loader's `VG` scope (V11 §3.2.2); V12's run scope and cost shortcut (V12 §3.7.2 (4), V12 §3.7.7); §7.6's invalidation; T-V11-1 (b)'s recorded reads | §4.1, §4.12 (the stage registry), §7.6 | — |
| W72 | registry rows 86–89 — `toolkit`, `messages`, `clerk.ops`, `clerk.content` | V09's and V10's rows (V09 §2.3, V09 §2.9, V09 §4.2, V09 §4.9; V10 §2.10, V10 §3.3) | rows 86–89; T-V11-1 (a)'s closure; T-V11-37's non-calibratable rule | §14 `@plat/tables` (file f item 516) | — |
| W73 | V04's dossier row sets `dossier.sanitation` and `dossier.subterranean` in registry row 63 (`owner` `'V04'`, every column `calibratable: false`) | V04 §2.3a's rows (DR17), shipped with V04 §8's content row (M6-U); empty before it (V11 §2.1's empty-table rule), so until then no record forces sewers or a system | row 63; T-V4-34, T-V4-38; T-V11-1 (a); T-V11-37 | §7.7 DR17 (file f item 386); §14 `@plat/tables` | the sanitation and subterranean records (kinds, tags, custom records' resolved profiles, `facets.subterranean`) → DR17 |
| W74 | `raisedWays.settings`' `elevated.landmarkMinSignificance` (V11 §2.8c, V11 §3.24.2) | V11 §3.24.2's row (20, the castle's significance) | row 80; V08's DR35 and T-V8-38; V12 §3.11's `raisedWays` settings line | §4.3, §4.6 (item 110 (b)) | the dossier-bound institutions' class significance (§10.2; item 72) → DR35 |
| W75 | `NG` in `PresetId`, its resolution and its compile scope (V11 §2.2, V11 §3.2.1 step 4, V11 §3.2.2) | file f item 584 and V01 §3.15 (the preset's definition); the seat landing V01's M5 (its entries on `hood.constants` and the `NG` preset file) | the compiler's preset checks under `NG` and its scope refusal (step 4); the loader's preset step under `NG` (V11 §3.2.2) → V01's NG harness (T-V1-31, B-REF's NG rows) and the M5 panel's NG pairs (T-V1-32); V12's `PresetArm` `'NG'` (V12 §2.1) | §7.6 (file f item 584, beside items 376–377) | — |
| W76 | registry rows 90–91 — `way.surface` and the base table `squares.quota` | V01's rows (V01 §3.7.3; V01 §3.5.2), shipped by V01's M2b pieces (V01 §8.1) | rows 90, 91; T-V11-1 (a)'s closure; V12's register (`squares.quota`'s entries at M2b) and run scope | §2.4 `Way.surface` (file f item 207); §4.5 S7b (3), §4.7 S9 (file f item 301); §14 `@plat/tables` (file f item 505) | — |
| W77 | the display cells — `label`, `icon?`, `synonyms`, `commonness` on every class row; `label`, `icon?` on the profile families, goods, district kinds, style sheets, patch materials and crisis looks (V11 §2.3, V11 §3.1's *Display cells*, V11 §3.25.9) | V11's source rows (the town-and-city and sky classes, the families, goods, kinds, patch rows, crisis look rows and the shipped sheets' words); V07 §2.4 (the `v.` rows); the compiler (a class's `icon` and `commonness`, the generic rows' cells) | V09's roster reader (V09 §4.16 (3)), T6's palette and T5's cards (V09 §2.3's `labelCell` / `iconCell`, V09 §4.5), the link view (V09 §4.7), the Material chip (V09 §4.21.4), the `refuse.roster.dossier` slot and the history template (V09 §4.9, V09 §4.16 (6)) rendered by V10, V08 §4.6's `unmapped_kind` and `custom_resolved` notes (T-V8-46), V09's Find (W87), V09's Show crises list and the legend's crisis look lines (W88; §8.2, §9.5), `@plat/docs`; V09 §5.1's sprite holds the 45 `fam.<key>` glyphs | §10.2 `BuildingClassRow` (file f item 432); §14 `@plat/tables` (file f item 516) | — (no dossier field feeds the words; V08's notes name the class a record is built as) |
| W78 | the span-rule and support-step cells `raisedWays.structure.span`, `.slideMaxFactor` and `.maxClearSpanM`, and `retaining.settings.stateSnapCm`, in V11 §2.1's settings form (V11 §2.8c, V11 §3.24.1, V11 §3.24.2) | the values of V11 §3.24.2 (file f item 244's span rule and support step; §2.7's clear-span bound) and file f item 245's snap (V11 §3.24.1), written by the seat landing item 244 at M3a | rows 79, 80; T-V11-1 (a) | §2.7's raised-way record and `RetainingWall` (file f items 244, 245); II.7.6's vaults (file f item 559) | — |
| W79 | the base settings row `base.settings` — `reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM`, `view.zoomOutMarginStops` (V11 §3.1 row 92; J-V11.106, item 116) | V11 §3.1 (the base's values, one home) | row 92 | §3.3, §4.2 S1, §5.1, §6.3, §8.8 | — |
| W80 | item 111's dry-country cells (`ClimateRow.dry`) and the `garden` land-use row (V11 §3.25.1, V11 §3.17.2) | V11 §3.25.1 | rows 43, 44 | §4.2 S0, S1, S3 (6), §4.4, §4.5, §4.7 S10b, §4.9 | `oasis_water` makes an oasis (DR1); the desert terrain → `arid` (V08) |
| W81 | item 113's `history` cells and `history.events` rows (V11 §3.25.2) | V11 §3.25.2 | rows 93, 94; V09's History chip (`history.defaultAgeYears` is V09's) | §4.11 *History-first generation*, §7.7 DR36–DR39 | the history's events → V08's `historyEvents` neutral keys → these rows (DR37); floods, silt and rebuilding on top → the burial factors (DR39) |
| W82 | item 114's `walls.condition` cells and `walls.patchMaterials` rows (V11 §3.25.3) | V11 §3.25.3 | rows 95, 96 | §2.7 `Enceinte.condition`, §7.1 `repairWall`, §7.7's DR41 | the dossier's `readiness` label and wealth (V08) → the generation row |
| W83 | item 115's `grandeur.ceiling` rows and its `settings` row's `grandClasses` (V11 §3.25.4) | V11 §3.25.4 | row 97, port.digest among its readers (V08 §3.16 (3)'s "specified" test) | §4.7 S10b, §10.2 (item 115) | 'specified' is V08 §3.16 (3)'s reading |
| W84 | item 117's season cells and tables (V11 §3.25.6) | V11 §3.25.6 | rows 43, 98–101; V07's village year (V07 §5.1), V05's islands; V12's bars | §2.9 view state, §7.7's DR42, §8.2, §12.5 | the present week from the dossier's own stamped ticks and the climate by V08's `climates` row set (item 125) — §7.7's DR42 |
| W85 | item 118's festival tables (V11 §3.25.7) | V11 §3.25.7 | rows 102–105; V07's village decorations (V07 §5.1), V05's pennants; V12's bars | §2.9, §7.7's DR43, §8.2, §12.5 | `traditions[]` (window, staging, kind by V08's `festivals` row set) and `customContentRoster.traditions`; `site.culture` (from `config.cultureProfileKey`, V08 §2.4) and the deity — §7.7's DR43 |
| W86 | item 119's `perf.qualitySpend` rows (V11 §3.25.8) | a calibration change landing a measured gain (V12) | row 106 | §4.1, §12 (item 119) | — |
| W87 | Find's lexicon — the class rows' `label` and `synonyms` and the profile families' `findGroup` (V11 §2.3, V11 §3.4, V11 §3.5.15) | the source rows (V07 §2.4 for the `v.` rows); a class's group read through its family | V09's Find panel — its type-ahead, chips and grouped browse grid (item 120 (b), (c)) — through rows 17 and 33 | §11.2's gazetteer (item 120) | — (the dossier's institution names are V08's list entries, never lexicon words) |
| W88 | item 122's crisis tables — `crisis.looks` with its `settings` row (item 122 (h)'s rates among its cells) and the closed mapping `crisis.map` (V11 §3.25.9) | V11 §3.25.9; the `map` rows' words from V08's census at the pinned baseline (C4b) | rows 107, 108; V09's Show crises preview list and Find's list of looks (by `label`), V10's explanations, V12's item-122 bars; T-V11-46 | §2.7 `ConditionOverlay`, §7.7's DR44, §10.2 *Crisis looks*, §8.2, §8.8, §12.5 | a standing overlay's source word (V08 §3.16 (7) (b): a stressor's `type`, a simulator crisis event, the `calamity` word of a condition linked to a carried calamity, else the condition's `activeConditions[]` archetype) → its `map` row (DR44); the forces', coalitions' and groups' headcounts, else `exodus` and arrivals (item 122 (h); V08) → the camp's size; a calamity's `targets` → its districts (V01) |
| W89 | item 123's damage tables — `damage.elements` (the threshold ranges by plan element kind, the `settings` row's default age) and `damage.materials` (the decay rates by walls material) (V11 §3.25.10) | V11 §3.25.10 | rows 109, 110: §6.3's thresholds, V06 §3.23's `decayLevel`, V03's, V02's and V04's drawings, §11.1's battle maps; T-V11-47 | §2.6 step 7, §6.3 *Plan damage*, §8.6, §11.1 | — (the level reads the lineage's lifecycle events; a dossier calamity's ruin reaches them through the epoch path, DR28) |
| W90 | item 124's weather cells — the climate rows' `weather` and the `settings` row's `weather` block (V11 §3.25.11) | V11 §3.25.11 | row 43: §6.1's weather stream (the spells), §8.2's effect marks, §8.4 (i)'s light terms, V09's Start a shower now; V12's item-124 bars; T-V11-48 | §6.1 *The weather stream*, §8.2, §8.4 (i), §2.9 | the climate from the dossier's terrain type (§7.7's DR42; item 125 (b)); the week as §2.9 takes it |
=== END ===

=== REPLACE ### 2.1 The table registry ===
### 2.1 The table registry

```ts
// TableId is §7.6's: a dotted, stable string, never reused — 'roster.classes', 'siting.families', 'dossier.kinds', 'era' …
type SliceKind = 'row'|'weights'|'bracket'|'thresholds'|'match'   // §2.8's SliceRef kinds
type ColumnUnit = Extract<Unit, 'm'|'m2'|'ha'|'cm'|'cdeg'|'share'|'weight'|'people'|'count'|'yr'|'wk'|'s'|'m3'|'lvl'|'none'>   // §2.1's subset, exactly this volume's set (E-37)
interface ColumnSpec {
  name: string /* the field path, dotted for nested cells: 'template.floors', 'profile.emits.smell' */;
  row?: string /* the settings form (below): the one named row this column belongs to — 'settings', 'structure'; absent: a column of the keyed rows */;
  type: 'number'|'integer'|'bool'|'string'|'enum'|'ref'|'range'|'weights'|'list'|'object';
  unit: ColumnUnit;
  range?: [number, number] /* declared range: an edit outside it is clamped by V11 §4.1's rule (item 101 R2) */;
  enumValues?: string[]; ref?: TableId /* a ref column's target table: its value must be a live row key there */;
  interp: 'band'|'step'|'none' /* band: interpolated along the prosperity value between band rows (§4.5); step: read by §4.5's discrete-cell rule (a band without a row reads the nearest rowed band below); none: not band-keyed */;
  calibratable: boolean /* V12 §3.11's register carries its entry (§13.9) */; extensionAllowed: boolean /* may carry §7.6's extension marker */;
  presetsRequired?: boolean /* a categorical option cell that needs an entry for each zeroing parity preset whose file ships (V11 §2.2):
    MFCG and FTG on every table; VG only on a village-read table (V11 §3.2.1 step 4); NG on none (it resolves as MFCG) */;
  sumsTo?: { group: string; total: number; tolerance: number } /* weights that must sum (a class's powers, sectors; a cover row's weights need not) */ }
interface TotalityRule {   // a coverage promise the compiler checks and CI holds (T-V11-2)
  kind: 'coversEnum'|'coversTable'|'coversManifest'; column: string;
  of: string /* an enum name, a TableId, or a manifest list: 'sf.catalogue@<line>', 'sf.archetypes@<line>' */; allowFallback?: string /* the row key a miss resolves to, reported */ }
interface TableSchema {
  id: TableId; file: string /* shipped path under plat/packages/tables/dist/, e.g. 'roster/classes.json' */; rowType: string /* the row type's name, §10.2 or this volume */;
  key: string /* the key field; composite keys joined by '/' in declared order, e.g. 'trueCls/band' */; columns: ColumnSpec[];
  readers: string[] /* the invalidation map of §7.6: StageIds for stages and epoch phases, module ids for the rest (V11 §3.1's *Readers*) */;
  sliceKinds: SliceKind[]; rowsHome: string /* the section that writes the rows: 'V11 §3.5', '§4.9', 'V07 §2.4' … */;
  owner: 'base'|'V01'|'V02'|'V03'|'V04'|'V05'|'V06'|'V07'|'V08'|'V09'|'V10'|'V11' /* the document owning the schema ('V09', 'V10' for rows 75 and 86–89) */;
  parity: 'zeroExtensions'|'perPreset'|'untouched' /* how §7.6's parity presets resolve it */; packPatchable: boolean /* a SettingPack's rosterPatch or tablePatch may target it (§10.4) */;
  totality: TotalityRule[] /* the coverage promises its rows' home states, held by the compile (T-V11-2) and by V11 §4.1's delete rule —
    among them item 122's and item 123's kind tables: row 107 `crisis.looks` [{ kind: 'coversEnum', column: 'kind', of: 'CrisisLookKind' }]
    and row 109 `damage.elements` [{ kind: 'coversEnum', column: 'kind', of: 'DamageElementKind' }], their compile form T-V11-46 (b) and T-V11-47 (a) */;
  version: string /* semver: major = a changed schema, minor = a declared output shift, patch = no output change */;
  defaultRow?: string /* the row a reader meeting an absent key reads (V11 §3.26's general rule), declared on every table whose text names one:
    `era` 'c14', `climate` 'temperate-deciduous', `roster.religions` 'faith', `walls.barriers` 'open', `walls.waterfront` 'none',
    `history.events` 'none', `festival.motifs` 'mixed', `damage.materials` 'timber_frame'; V11 §4.1 refuses its delete */;
  mayEmpty: boolean /* true where an empty table is a reading state its readers define — rows 32, 35, 63–66, 76, 106 and 108;
    false elsewhere, so no delete removes the last row (V11 §4.1) */ }
```

`@plat/tables` exports `REGISTRY: ReadonlyMap<TableId, TableSchema>` — one entry per row of V11 §3.1, the one list the
compiler, the loader, the tables editor, the docs generator and the provenance audit read. A table not in the registry
cannot be loaded, patched or edited (the loader refuses it, F-EDIT); a registry entry without its file fails the build.
**The empty-table rule** (J-V11.84): every registry row exists from C0 (V11 §8); a row whose rows-home milestone has not
landed ships its schema's empty table (the manifest's `rows` 0), its *status* unchanged — `written (Vnn)` names who writes
the rows, not whether they shipped. The compiler holds an empty table's `TotalityRule`s and row invariants from the change
that ships its first row; the milestone that lands the rows tests them (V11 §8's exits, or the owning volume's), so a
table still empty past it fails there; a reader that meets an empty table reads no rows, as a `staged` row's readers read
its absent input (row 32); once a table that is not `mayEmpty` holds rows, no edit empties it again (V11 §4.1).

**The settings form** (J-V11.96). Beside its keyed rows a table may hold single rows named by a fixed key — `settings`,
`structure` — whose fields are no column of the keyed rows. Each such field is a `ColumnSpec` whose `row` names that row,
a nested cell by its dotted `name` (`span.maxHeightCm`, `span.vaultShare.viaduct`), each with its own unit, range,
`calibratable` and `extensionAllowed`, so every settings cell is a column a register entry names (V12 §3.11) and the
tables editor edits as a cell. The key column admits the named keys beside its own values; a named row holds exactly the
columns whose `row` names it and a keyed row none of them (T-V11-3). A table that is only a settings row
(`roster.settings`, `hood.constants`, `base.settings`, `history`, `walls.condition`) keys that one row `settings`.
=== END ===

=== REPLACE ### 2.3 The siting profile and the class columns items 103–108 add (file f item 432) ===
### 2.3 The siting profile and the class columns items 103–108 add (file f item 432)

```ts
type Nuisance = 'smell'|'smoke'|'noise'|'fire'|'water'|'traffic'|'crowds'|'disorder'
  // water = fouls water (item 103 (a)'s "water pollution"); traffic = heavy traffic. Holiness is not a nuisance: holy places push the profane
  // through the alignment axis (`align:sacred+`, V11 §3.3.1), and the sacred are sensitive to disorder and noise
type Lvl = 0|1|2|3
type Need = 'runningWater'|'riverBank'|'shore'|'road'|'through'|'gate'|'harbour'|'market'|'space'|'security'|'secrecy'|'highGround'|'dryGround'|'woodEdge'|'fields'|'deposit'
type Clientele = 'dailyLocal'|'townWide'|'travellers'|'elite'|'clandestine'|'institution'|'residential'   // V06 §3.9.9's six plus residential (households, never a use's catchment)
interface NeedSpec { need: Need; strength: 'hard'|'soft'; weight?: number /* soft: overrides the family row's default */ }
interface CoverageSpec { unit: 'district'|'walk'|'households'|'settlement'|'parish';
  per: number /* > 0; walk: the catchment radius, m, range [50, 2000]; households: households per member, range [1, 5000]; district, settlement: 1; parish: households per parish, range [1, 5000] */;
  target: number /* members per unit, soft; range [0.01, 50] */; weight?: number }
  // the unit at a plot: district — the plot's district (no household threshold); walk — the members within the disc of radius `per` m about the plot, counted on the 16 m raster;
  // households — the members within the disc of radius r = √(per × a_res ÷ π) about the plot, a_res the plot's district's residential plot area per household (m², derived at S10a);
  //   a district with no residential plot (a_res undefined) has no household to serve: the term is skipped there (satisfaction 1, reported once per district; V11 §3.26's row EI-V11-EDGE-2);
  // parish — the plot's cell of the parish partition: the Voronoi cells of the placed and allocated members of the `church-family` classes that count as churches (V11 §3.23.8's list)
  //   over residential land at S10a, derived per read and never stored; before any church exists, one cell per district;
  // settlement — the town. Satisfaction at a plot is clamp(2 − n ÷ target, 0, 1), n the members of the class in the plot's unit (1 while n ≤ target, 0 from 2 × target)
interface SitingProfile {
  family: string /* exactly one profile family key it inherits (V11 §3.4; V08 §2.6's tag family keys, plus the category families); every class row names it (T-V11-4) */;
  emits: Partial<Record<Nuisance, Lvl>>; sensitive: Partial<Record<Nuisance, Lvl>>;
  needs: NeedSpec[]; clientele: Clientele;
  alignment: { law: -1|0|1 /* +1 enforcement, -1 crime */; sacred: -1|0|1 /* +1 sacred, -1 profane */; status: -1|0|1 /* +1 elite, -1 low */ };
  competition: { mode: 'cluster'|'spread'|'neutral'; spacingM?: number /* spread: the same-kind spacing radius inside a district (item 107 (d)) */; street?: boolean /* cluster: prefers one street (sameStreet) */ };
  coverage?: CoverageSpec /* item 103 (f) */;
  balance: 'everyday'|'specialist'|'heavy'|'wholesale'|'institution'|'residential' /* item 107 (a) */;
  orientation?: 'source'|'market'|'balanced' /* item 105 (b): absent = derived from the goods table (V11 §3.7.3) */;
  split?: { works: string /* the designation template family of the works */; shop: string /* of the shop */; threshold: number /* weight: the least (nuisance push + output pull) difference at which the solver splits, item 105 (h) */ };
  landmark?: boolean /* item 104 (a): asks for a prominent site (square frontage, high ground, a vista) and raises significance ×2 */ }
```

`BuildingClassRow` gains (file f item 432): `profile: SitingProfile` (compiled flat: the family's cells overridden by
the class's deltas); `staff: { band: string; workers: [number, number] }[]` (the working households a workplace employs
at a band, read by `@plat/sim`'s postings and V03's staff rooms); `villageForm?: string` (file f item 430, filled here:
a `v.<id>` village class key, V11 §2.9, V11 §3.22); `templateFamily: string` (the authoring family its `template` rows
compile from, read by S11's composition key — V02's resolution chain and `composition.roleKeys`, V02 §3.10.4 — and the
tables editor's grouping); and item 109 (k) (2)'s crypt columns (file f item 436): `crypt: 'always'|'basement'|'never'`
(default `never`) and `cryptM2?: [number, number, number, number]` (m², the crypt ring's growth target at poor, modest,
prosperous, rich; required when `crypt` ≠ `never`). `always`: the building always has a crypt, taken by §2.6's no-refusal
crypt ladder (full, half, raised; file f item 226; on an island V05's rim-slab vault) and exempt from the terrain gate's
wet-ground refusal; `basement`: a crypt exactly when §2.6 draws a full, half or walk-out basement, so the cellar row is
its crypt chance and the terrain gate binds it (a church on wet ground has no crypt; ledger slabs in the chancel floor,
V03 §3.7.4); `never`: none. A crypt is part of its building's basement (`Basement.crypt`, file f item 238), never an
underground system, never a catacomb source (item 109 (k) (2)). Every existing column of §10.2 stays; `distribution` is
the competition's coarse reading and stays authoritative for S7b (1)'s dispersal (J-A72.46). **The competition override**
(stated once here): the compiler sets `competition.mode` to `neutral` for a `singular` class and to `cluster`
for a `district-defining` one, whatever the family says, and lists each override in the manifest (J-V11.25; T-V11-4
checks the compiled result). The village rows (V07 §2.4, keyed `v.<id>`) carry one column more, V07's `presence?` (file f
item 576), which the compiler carries as V07 types it; every other column of a `v.` row is this section's and is compiled
and checked by the same rules as a town row (V11 §3.2.1 step 6).

**The display cells** (file f item 516; J-V11.93). `BuildingClassRow` also gains four cells, each `own`,
`calibratable: false`, never `extension`, and read by no model stage (display words move no digest, §6.3):
* `label: string` — plain words for one member ("fish landing", "parish church"), lower case but for proper words (the
  shell capitalises at the start of a card or a sentence); unique within its namespace — the town-and-city rows, the `v.`
  rows, the generic rows (V11 §2.9) — so a town `smithy` and V07's `v.smithy` may share their words;
* `icon?: string` — an id in V09 §5.1's icon sprite; a source row states none, and the compiler writes the class's profile
  family's `icon` (`fam.<family>`, V11 §3.4; V11 §3.2.1 step 5a);
* `synonyms: string[]` — the other whole words and adjacent word pairs a user types for it, case-folded; `[]` where none;
  never its own label nor another row's label of its namespace, and possibly shared with another row's synonyms (`mill`),
  which `commonness` settles;
* `commonness: number` (share, 0–1) — the reader's tie-break: for a town-and-city row V11 §3.5.1's derived column (its
  roster share at TOWN), for a `v.` row V07 §2.4's rule computed by the compiler (V11 §3.5.1), 0 for a generic row.

The source writes `label` and `synonyms` for every authored town-and-city row and V05's two sky rows in V11 §3.5.15's
table, V07 §2.4 for the `v.` rows, and the compiler the generic rows' (V11 §3.13.3). **Readers:** V09's roster reader
(V09 §4.16 (3): labels and synonyms, ties by `commonness`), Find's type-ahead and lists (item 120; *Find's lexicon*,
below), T6's stamp palette and the cards of a `values` control over a
table (V09 §2.3's `labelCell` and `iconCell`; V09 §4.5), the `{thing}` slot of `refuse.roster.dossier` and the history
template's unnamed line (V09 §4.9, V09 §4.16 (6); rendered by V10), V08 §4.6's `unmapped_kind` and `custom_resolved`
notes' `class` argument (T-V8-46), and `@plat/docs`' table pages. The same `label` and `icon?` cells go on the other tables
the UI shows rows of: the profile families (V11 §3.4), the goods (V11 §2.5, V11 §3.7.1), the district kinds (V11 §3.9),
the style sheets (registry row 52), the patch materials (V11 §3.25.3) and the crisis looks (V11 §3.25.9), where their
words are written (V11 §3.1's *Display cells*).

**Find's lexicon** (item 120 of file g, the owner's rule of 1 October; J133). Find — V09's panel over §11.2's gazetteer —
matches what a user types against these words and groups its browsable grid by them. The lexicon is words only, never a
model input, so the document hashes identically with Find on or off (item 120 (a)):
* **The words.** A class is reached by its `label` and its `synonyms` (above), case-folded, under item 120 (c)'s matching
  rules, which V09 applies. A dossier institution's own name is V08's list entry, never a lexicon word.
* **A shared word names a set.** A whole word that two or more class rows of one namespace carry in their `label` or
  `synonyms` reaches each of them: Find offers every such row and one "all ⟨word⟩" chip (item 120 (c)), while the roster
  reader settles the same word by `commonness` (V09 §4.16 (3)). An author therefore writes a trade word a user types for
  a family of kinds on each of its members — `mill` on the two mills (and the saw mill's and the fulling mill's words carry
  it), `smith` on the smithy, the armourer's, the goldsmith's and the metalworkers' rows (the farrier's word pairs carry
  it; V11 §3.5.15).
* **The groups.** `type FindGroup = 'crafts'|'trade'|'faith'|'rule'|'defence'|'learning'|'health'|'lodging'|'other'` —
  item 120 (b)'s nine, in the order the grid shows them (`other` is the item's "the rest"). Each non-alias profile family
  row carries `findGroup: FindGroup` (V11 §3.4's *Find's groups*), and a class's group is its profile family's — every
  class row names one (T-V11-4) — for the town-and-city, `v.`, sky and generic rows alike, so no class row states one and
  a family edit regroups every class it governs (J-V11.112). The headings are V09's catalogue words (`find.group.<key>`,
  V09 §4.9).
* **Knowledge.** The lexicon reveals nothing: what Find lists, suggests, counts, draws or pins is the gazetteer's answer at
  the view's effective key (§11.2; item 120 (h)), a concealed use answering only as the key admits it — as its
  front's class or not at all (V11 §3.14; item 30) — so a withheld kind is never offered by its words or its group.
* `findGroup` is `own`, `calibratable: false`, never `extension` and read by no model stage, as the other display cells.
=== END ===

=== REPLACE ### 2.8 The row types the base names without declaring (file f items 400, 435) ===
### 2.8 The row types the base names without declaring (file f items 400, 435)

The base names these types or rows but types none of them; they are declared here once and cited by §10.2 (and §2.6,
§4.9).

```ts
interface EraRow {   // the era and region preset CircumstanceSlice.era names (§7.7 layer 2; D-2); table 'era'
  id: string /* 'c12'|'c13'|'c14'|'c15' in the default table (V11 §3.19.1); a pack may add rows */; years: [number, number] /* the span it stands for (a label only, never a date the map reads) */;
  region: string /* 'western' default; a region preset row keys the regional material shift (§2.6) */;
  tower: { kinds: { round: number; square: number; bastion: number; octagonal: number } /* weights, §4.8 */; spacingM: [number, number] /* §4.8's straight-run spacing band */ };
  moatWidthM: [number, number] /* §4.2 S3's moat, §4.4's later rings */; intervallum: boolean /* the lane inside the wall (§2.7, §4.8) */;
  marketPaved: number /* share of market squares paved; the rest get the market green (§4.9) */; publicLighting: 'sparse'|'moderate'|'dense' /* §4.7's light rows (item 68) */;
  fuelM3PerCapitaYear: number; timberM3PerCapitaYear: number /* §4.9's fuel and timber rows */; pumpFromYear?: number /* wells drawn as pumps from this year (V07's VS8 reads it) */;
  harbourChain: 'raised'|'lowered' /* item 106 (e): how the harbour-mouth chain is drawn */; suburbRegime: boolean /* FTG's cul-de-sac suburb admitted by the era (§4.4) */;
  materialRows: string /* the MaterialRow key prefix this era's rows use (V11 §3.19.3) */;
  aqueductM: number /* × the aqueduct's chance (item 110 (b); V11 §3.24.2) */; raisedVaultM: number /* × `raisedWays.structure.span.vaultShare` (V11 §3.24.2) */ }
interface ClimateRow {   // §4.9's ClimateTable rows; table 'climate'
  biome: 'temperate-deciduous'|'temperate-coniferous'|'mixed'|'maritime'|'arid'|'cold'; groundRole: string /* §8.2's ground-cover role key */;
  woods: { species: string; inner: number; outer: number; leafType: 'deciduous'|'evergreen' }[]; fieldSystem: 'openStrip'|'enclosed'|'infieldOutfield'|'irrigated';
  farmLayout: 'rows'|'perimeter'|'rivers' /* §4.9: the farm modes' climate override; 'rows' leaves the rung × landscape choice */; roof: { form: 'gable'|'hip'|'flat'|'pyramid'; pitch: number /* ratio */ }; scatterPerHa: [number, number] /* ambient single trees */;
  rainMmPerYear: number /* mm a year: the aqueduct's water balance (V11 §3.24.6) */;
  dry: ClimateDryCells /* item 111, V11 §3.25.1 */; seasons: ClimateSeasonCells /* item 117, V11 §3.25.6 */; weather: WeatherSpells /* item 124, V11 §3.25.11 */ }
interface ClimateDryCells {   // item 111; values V11 §3.25.1
  aridity: number /* share: 0 wet – 1 desert; a row is arid when aridity ≥ climate.aridMin (V11 §3.25.1) */;
  water: { river: number; lake: number; coast: number } /* share: S0's P(river), P(lake), P(coast) on an arid row (§4.2 S0); read on arid rows only */;
  oasis: { chance: number; noOtherWaterFactor: number; areaHa: [number, number]; grove: { species: string; share: number }[]; groveBandM: number; channelReachM: number; gardenAreaFactor: number };
  waterPull: number /* w_water, share < 1: S3 (6)'s cost factor */; pullRadiusM: number /* m: q(x) falls to 0 here */; waterProsperity: number /* w_waterP, weight: §4.5's water term */;
  sunCell: number /* × w_sun (item 102): 1 in temperate and cold rows, 0 or negative (toward shade) in hot arid rows */;
  wellYieldWeight: number /* weight: the well and fountain classes' extra term on the plot's well yield (§4.7 S10b) */; wellCoverageFactor: number /* × the water-supply family's walking radius */ }
interface ClimateSeasonCells {   // item 117; values V11 §3.25.6; weeks 0–51, spring first (week 0 the first of spring); a band [a, b] with a > b wraps the year's end
  winter: 'none'|'mild'|'cold'|'severe'; leafColour: [number, number] | null; leafFall: [number, number] | null; blossom: [number, number] | null;
  grow: [number, number]; harvest: [number, number]; hay: [number, number] | null; ice: [number, number] | null; snow: [number, number] | null }
type WeatherKind = 'rain'|'drizzle'|'snow'|'mist'|'fog'|'leaves'|'cloudShadow'|'shimmer'|'dust'   // item 124 (a)'s effects in this order (V11 §3.25.11's ties); §8.2's marks and §8.4 (i)'s light terms draw them
type WeatherSpells = Partial<Record<WeatherKind, {   // item 124 (c): a climate row's weather cells, values V11 §3.25.11; a kind absent never comes on the row
  weeks: [number, number] /* wk: a band of weeks 0–51 (a > b wraps the year's end); two bands of one kind never share a week */;
  perHour: number /* count: how often — the mean spells of the kind an hour of clear map */; lengthS?: [number, number] /* s: how long, where it differs from the kind's */ }[]>>
interface ClimateSettings {   // the named row 'settings' of the climate table (V11 §2.1's settings form)
  aridMin: number /* share: item 111's arid test, V11 §3.25.1 */;
  weather: {   // item 124; values V11 §3.25.11
    kinds: Record<WeatherKind, { lengthS: [number, number] /* s: a spell's length */; hours?: [number, number] /* the view's hours of day in which the kind is live, read under `light: 'time'` (§2.9; V11 §3.25.11) */ }>;
    sites: Record<'coast'|'riverside'|'hills'|'forest', Partial<Record<WeatherKind, number>>> /* × a live kind's perHour where the site applies; several: the largest */;
    forestShareMin: number /* share: the woods' share of the frame's land that makes the `forest` site */;
    aridRainMaxPerHour: number /* count: item 124 (c)'s cap on an arid row's rain and drizzle, after the largest site factor */; aridRainMaxWeeks: number /* wk: the weeks they may cover */ } }
interface HeightsRow {   // the class heights row DesignationTemplateRow.heights names (§2.6, §4.7 S11); table 'heights'
  key: string; storeyCm: { ground: number; upper: number } /* integer cm */; roofPitch: number /* ratio */; towerStoreys?: [number, number] /* keeps, church and mage towers */; spireFactor?: number /* spire height ÷ tower height */;
  attic: boolean; parapetCm: number; towerStoreyCm?: number /* cm; absent reads storeyCm.upper */ /* the three columns of file f item 427 (V02 §3.10.6), read by V02's M11 */ }
interface StructureRoleRow {   // V11 §3.6.5: a structure role's defaults; the compiler writes them into DesignationTemplateRow.structures
  role: string /* the structure name the template families use; V02's `composition.roleKeys` maps it to a composition key (V02 §3.10.4) */; footprintShare: number /* share of the footprint budget */; houses: boolean }
interface DistrictKindAffinity { tag: string /* a class tag (V11 §3.5.1) */; band?: [string, string] /* the classes' band within */; weight: number }   // DistrictKindRow.affinity's entry (file f item 438)
interface CompatibilityRow {   // §4.7 S11's mutator compatibility table; table 'mutator.compat'
  from: string /* a slot role */; to: string /* a slot role */; fate: 'keep'|'adapt'|'convert'; tolerance: number /* share: the size difference within which 'keep' holds */ }
interface GovernmentRow {   // §10.2's government rows, typed; table 'roster.government'
  kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: string /* the seat class */;
  villageSeat: string /* the seat's v.<id> class at village rungs (V07 §3.11 DR11; V11 §3.21.1): `@seat` binds it there */;
  offices: { name: string; seatClass: string; count: number | { perThousand: number } }[]; guardPerThousand: number; barracksFrom: 'TOWN'|'CITY'|'METROPOLIS'|'never' }
interface ReligionRow { id: string; worshipperShare: number; practiceShare: number; clergyPerThousand: number; templeClass: string; greatTempleClass: string; shrinePin: string }   // table 'roster.religions'
interface HouseholdRow { band: string; size: { mean: number; sd: number; min: number; max: number } /* people */; liveInStaff: number /* servants per household, mean */ }   // table 'roster.households'
interface InstitutionRow { id: string; classes: string[] /* the classes that house it, main first */; faction?: Faction['kind']; seatOf?: GovernmentRow['kind'][] }   // table 'roster.institutions'
interface GoodWordRow {   // table 'dossier.goodWords' (registry row 65), V11's own shape; its reader is V11 §3.13.5's matching rule, applied by V08's adapter
  words: string[] /* case-folded whole tokens or adjacent token pairs */; good: string /* a roster.resources id (V11 §3.7.1) */ }
interface ArchetypeVillageCell {   // the optional `village` cell of a dossier.archetypes row (V08's shape carries it); read at village rungs BEFORE villageForm (V11 §3.13.2; V07 §2.4, J-V7.78)
  class?: string /* a v.<id> class */; elseClass?: string /* the v.<id> class taken when class's hard need finds no site (the mill's and the inn's alternation) */;
  pin?: string /* '@pin:<kind>': a pin, no building */; delta?: string /* the reading V07 §2.4 names, in V11 §3.5.2's notation where it has one */;
  composition?: string /* a composition key replacing the class's (V02 §3.10.4) */; ruin?: true /* the ruin decoration and the ruin system's source (V07 §3.16) */ }
interface ProfessionRow { id: string; family: string; workplaces: string[] /* class ids */; perWorkplace: { band: string; count: [number, number] }[] }   // table 'sim.professions' — @plat/sim's (M4b)
interface TemplateFamilyRow {   // AUTHORING ONLY (V11 §3.6): the shared shape a class's DesignationTemplateRow[] is compiled from; never shipped as a table
  key: string; arrangement: DesignationTemplateRow['arrangement']; structures: DesignationTemplateRow['structures']; frontage: [string, string, string, string];
  floors: [[number, number], [number, number], [number, number], [number, number]]; footprintM2: [number, number, number, number] /* p50 by poor, modest, prosperous, rich */; plotAreaM2: [number, number, number, number];
  coverage: [number, number, number, number]; bounds: [string, string, string, string]; programme: string /* the room-programme key prefix (V03) */; heights: string; underSize: 'compact'|'refuse'; replaceability: [string, string, string, string]; works?: string;
  yard: { part: string; share: number }[] /* the yard parts and their shares (V11 §3.6.1; a church or cathedral plot's `churchyard` part and a cloister or burial ground's `burial` part are the burial faces, V04 §3.5.1 (1) (a), (d)) */;
  cellarProb?: [number, number, number, number] /* the cellar row's prob by band when it differs from item 29 (b)'s defaults (V11 §3.6.1) */ }
interface GrammarDef {   // §10.4's grammars, typed; one per naming slice (V11 §3.20)
  slice: string /* 'naming.district', 'naming.way', … */; start: string /* the start symbol */; features: string[] /* the feature names its guards may read (V11 §3.20.2) */;
  rules: Record<string, { text: string /* our own text with #symbol# references and .modifiers */; weight: number; when?: { feature: string; op: 'eq'|'ne'|'in'|'gt'|'lt'|'has'; value: unknown }[] }[]>;
  corpora: Record<string, string> /* a symbol whose expansion is a corpus draw: symbol → corpus id (a culture row's corpus field, §7.6) */; maxSyllables?: number }
interface TemplateDef { id: string /* 'desc.district', 'desc.building', 'chronicle.wallToWay' … */; lines: { text: string; weight: number; when?: GrammarDef['rules'][string][number]['when'] }[]; fallback: string }
```
=== END ===

=== REPLACE ### 2.8d The row types of items 113–119 and 122–124 ===
### 2.8d The row types of items 113–119 and 122–124

Each table is our own and calibratable unless marked (rows 97, 102–105 and 108 are not, in any column: V11 §3.25.4,
V11 §3.25.7, V11 §3.25.9), its values in V11 §3.25, its switch in V11 §3.24.0. Item 124's weather cells are on
`ClimateRow` and `ClimateSettings` (V11 §2.8).

```ts
interface HistorySettings {         // table 'history' (registry row 93), the one row 'settings' (item 113)
  replay: boolean;                  // the switch: false = generation is the one-click path, byte-identical (the no-op pin); the parity presets false
  epochYears: number;               // yr: a coarse replay epoch's length (V06 §3.20.1 (3))
  symbolicQuantile: number;         // share: where in the peak tier's population range a symbolic peak is sized (item 113 (f))
  burialYears: number;              // yr: the default age past which a former fabric is buried (item 113 (c)); the factored value is V11 §3.25.2's formula
  burial: { floodFactor: number; floodMaxCount: number; siltFactor: number; rebuiltFactor: number; rebuiltCoverMin: number;
            bareRockFactor: number; bareRockStoneMin: number; minYears: number; maxYears: number };
  reuseCost: number }               // share: × the route cost of a lattice edge on a ruined way's trace (§4.4's existingFabricCost at refounding; item 113 (b))
// table 'history.events' (registry row 94): V06 §2.14's HistoryEventRow, one row per neutral event key of V08 §2.6's `historyEvents` row set, plus 'none'
interface WallConditionSettings {   // table 'walls.condition' (registry row 95), the one row 'settings' (item 114)
  atGeneration: boolean;            // the switch of item 114 (d): false = every run `standing` at generation (the base's)
  needReturnYears: number; meansLow: number; meansHigh: number; meansWindowYears: number; localWeight: number;
  wearChancePerYear: number | null; poorWearChancePerYear: number; poorBreachChancePerYear: number; bothLowFactor: number; rebuildRunsPerYear: number;
  generation: Record<'fortress'|'defended'|'light'|'vulnerable', Record<'low'|'mid'|'high', { standing: number; worn: number; patched: number; breached: number }>> }
interface PatchMaterialRow {        // table 'walls.patchMaterials' (registry row 96); key 'wallKind/id'
  wallKind: 'masonry'|'palisade'|'earthwork' /* masonry: the kinds citadel, inner, outer, suburb, bailey (§2.7 Enceinte.kind) */;
  id: string; label: string /* the Material chip's words (V09 §4.21.4) */; cultures?: string[] /* V11 §3.20.3 culture ids it is limited to; absent: every culture */;
  weight: number /* the draw weight among the rows admitted for the enceinte's kind and culture */;
  material: string /* a MaterialRow key (V11 §3.19.3): its salvage, decline and Works rows */; look: string /* §8.2's patch line-style role key */ }
// GrandeurCeilingRow and its named row 'settings' (GrandeurCeilingSettings, grandClasses): §10.2's shape (item 115 homes it there); table 'grandeur.ceiling' (registry row 97), rows V11 §3.25.4
interface SeasonSurfaceRow {        // table 'season.surfaces' (registry row 98); key 'kind' (item 117 (f)): a land use, garden, green or tree kind
  kind: string; phases: { look: string /* §8.2's season row key */; from: SeasonAnchor; offsetWk: number }[] /* in year order; each look holds until the next phase */ }
type SeasonAnchor = 'yearStart'|'grow.start'|'grow.end'|'harvest.start'|'harvest.end'|'hay.start'|'hay.end'|'blossom.start'|'blossom.end'|'leafColour.start'|'leafFall.start'|'leafFall.end'|'snow.start'
interface SeasonWaterRow {          // table 'season.water' (registry row 99); key 'kind' (item 117 (e))
  kind: 'pond'|'moat'|'millpond'|'lake'|'slowRiver'|'river'|'harbourEdge'|'seaShore'; freezesFrom: 'mild'|'cold'|'severe'; lagWk: number /* weeks after ice.start it freezes and before ice.end it thaws */ }
interface LeafPaletteRow {          // table 'season.leaf' (registry row 100); key 'species' (item 117 (f2)); an evergreen species has no row
  species: string; colours: Partial<Record<'gold'|'amber'|'orange'|'scarlet'|'crimson'|'russet'|'bronze'|'brown', number>> /* weights */; earlyGreenShare: number }
interface LeafCoverRow {            // table 'season.cover' (registry row 101); key 'surface' (item 117 (f2))
  surface: string; start: number; end: number /* share of cover at the first and the last leaf-fall week */; edgeFactor: number; driftM: number; fadeWk: number }
interface DecorationRow {           // table 'festival.decorations' (registry row 102); key 'rung/item' (item 118 (d), (f))
  rung: Rung | 'SKY'; item: string /* a §8.2 decoration glyph key */; place: StagingPlace | 'heart'|'doors'|'churchLane'|'towers'|'walls'|'gates'|'hall'|'mainWays'|'boats'|'rims'|'landings';
  band: 'city'|'district'|'neighbourhood' /* the coarsest band it shows at */; per: 'place'|'per100m'|'perSquare'|'perTower'|'perBoat'; count: [number, number]; alt?: string /* an item it alternates with (one of the two per festival, by weight) */; weight?: number }
type StagingPlace = 'square'|'market'|'green'|'church'|'temple'|'deityTemple'|'waterfront'|'gate'|'fairField'|'castle'|'fieldEdge'|'processionRoute'
interface StagingKeywordRow { key: string /* a case-folded whole word or adjacent word pair */; place: StagingPlace }   // table 'festival.staging' (registry row 103), rows by key; its named row 'fallback': Record<FestivalKind, StagingPlace[]>
type FestivalKind = 'religious'|'market'|'harvest'|'water'   // V08 §2.6's `festivals` row set's kinds (item 118 (c))
interface MotifRow { key: string /* a culture id, or 'season/<spring|summer|autumn|winter>' */; motifs: string[] /* §8.2 decoration glyph keys */; colourRoles: string[] /* §8.2 palette role keys; never a colour */ }   // table 'festival.motifs' (registry row 104)
interface GenericFestivalRow { key: 'spring'|'midsummer'|'harvest'|'midwinter'; kind: FestivalKind; window: [number, number] /* weeks */ }   // table 'festival.generic' (registry row 105)
interface QualitySpendRow {         // table 'perf.qualitySpend' (registry row 106); key 'stage/use' (item 119 (b)); shipped empty, calibratable: false
  stage: string /* a StageId */; use: string /* the quality path the stage may run */; targetMs: number; extraMs: number /* the measured cost above the target */;
  gainBar: string /* the bar id the gain is measured by (§13, V12) */; gain: number; run: string /* the CalibrationRun id that measured it */ }
// item 122: CrisisLookRow with its named row 'settings' (CrisisLookSettings) — table 'crisis.looks', registry row 107 — and CrisisMapRow —
// table 'crisis.map', row 108 — are §10.2's shapes (item 122 homes them there); their rows V11 §3.25.9
type DamageElementKind = 'furniture'|'door'|'window'|'partition'|'roofBay'|'upperFloor'|'stair'|'outerWall'|'groundFloor'
  |'cellarVault'|'cellarWall'|'cryptTomb'|'cryptVault'|'cryptWall'   // item 123: a plan element's kind (§6.3 *Plan damage*); V03 gives each plan element its kind, V04 §5.6 the five below ground
interface DamageElementRow {        // table 'damage.elements' (registry row 109); key 'kind' (item 123 (b), (c))
  kind: DamageElementKind;
  range: [number, number];          // share of the decay level, 0 ≤ lo < hi ≤ 1: the element's threshold is lo + u · (hi − lo), u its §6.3 draw
  states: ('abandoned'|'decayed'|'ruined')[] }   // the existence states whose look item 123 (c) gives the kind; the range lies inside their shares (V06 §3.23 (2)); not calibratable
interface DamageSettings {          // the named row 'settings' of the same table (V11 §2.1's settings form)
  defaultAgeYears: number }         // yr: the age a building generated abandoned, decayed or ruined reads at the week it is first met so, aging from then (V06 §3.23 (4))
interface DamageRateRow {           // table 'damage.materials' (registry row 110); key 'material' (item 123 (b))
  material: string;                 // a walls material id of V11 §3.19.3 (`Building.material.walls`)
  ratePerYear: number }             // share a year: V06 §3.23 (2)'s r, the level a decay run gains each year — timber faster than stone
```

The base settings row (registry row 92, V11 §3.1) holds `reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM`
and `view.zoomOutMarginStops` in the settings form.
=== END ===

=== REPLACE ### 3.1 The complete catalogue of tables ===
### 3.1 The complete catalogue of tables

One row per registry entry (V11 §2.1). *Rows home* names the one section that writes the rows; *status* says whether the
rows are written in a design document (`written`), authored at build time by the plan of V11 §8 (`authored`, with the bar
they must meet), or empty until a staged input fills them (`staged`) — never whether they have shipped (V11 §2.1's
empty-table rule).

**Readers** (J-V11.80). This column is the one list of each table's readers (E-34): V11 §1b and V11 §2.10 cite it. A reader
that is a stage or an epoch phase is named by its **StageId** — §4.1's stages; the ids the volumes register (V01's `S7c`,
`S8.seed`, `S9b`; V05's `SKY`; V04's `U-NET`, `U-SYS`, `U-ACCESS`, `U-FRONT`, `U-CITY`, `U-LINK`, `U-RECONCILE` and
`U-FADE`; V07's `VS1`–`VS6`, `VS8`); and V06 §3.16's fifteen epoch-phase ids `EVO_PRELUDE` … `EVO_RAISED`. **A read is
recorded under the registered StageId of the stage function that reads** (J-V11.109): an epoch step that runs a base
stage (S2 at `demand`, S6 at `field`, S5–S13 on a new stage's faces at `growth`, S12c at `character`; V06 §3.2) reads
under that stage's own id — an epoch stage's S5b under `S5b`, never under the calling phase; an epoch participant reads
under the `stage` it registers (V06 §2.1's `EpochParticipant.stage`: `SKY` for V05's two, `S9b` for `hood.fabric`,
`U-FADE` for V04's four — `under.fade`, `under.extend`, `under.access`, `under.undercity`, V04 §1.1 — `VS1` and `VS2` for
V07's `village.plan` and `village.density`), and the seat registering a participant writes that `stage` into the readers
of every table the participant reads (J-V11.85). A **module id** names only a reader outside the stage graph — the
application, the clerk, the compiler, the port's digest, the docs generator, `derivePerson` (§10.3), the bench, the lazy
wings and plan rungs (they run on a click, never in the pipeline, V02 §3.1), the renderer, and the neighbourhood close-up
(`@plat/hood`'s view-side derivation, V01 §3.8, its draws keyed `STAGE_VIEW`; the package's pipeline registrations stay
StageIds); in the table a module reader appears by its plain name, which the source writes as its module id (V11 §2.1).
**The village-read test (V11 §3.2.1 step 4), V12's run scope (V12 §3.7.2 (4)) and its cost shortcut's first reader stage
(V12 §3.7.7) match StageIds only**, so every table a stage or phase reads names that stage, and T-V11-1 (b) holds it by
recording each stage's reads. A section named beside a StageId says where that reading is written. "Every stage" (rows 1,
10) compiles to every id of the source manifest's `stageIds`; "every band-keyed reader" (row 6) to the union of the stage
readers of the band-keyed tables. **`S5`** (rows 2, 3, 50, 81) names the growth stage, which §4.1 registers as its four
steps S5a–S5d, each with its own `StageDecl`, and compiles to those four ids; a row that needs one step names that step.
**S5b beside S4** (J-V11.92): the main-road step at stages k ≥ 2 and at every epoch stage runs S4's router
incrementally, under the same F-ROUTE ladder (§4.4), and that route solve prices a viaduct span (file f item 290 (1),
(3); V06 §3.6), so every row that lists S4 as the raised-way generator lists S5b beside it — rows 49, 71, 80 and 81 by
name, rows 3 and 50 through `S5`.

| # | TableId | file (under `dist/`) | row type | rows home | readers | slices | status |
|---|---|---|---|---|---|---|---|
| 1 | `rung.ladder` | `ladder.json` | `RungProfile` | §1.1; village rungs V07 §2.1 | every stage | row | written |
| 2 | `stage.regimes` | `stages.json` | stage rows per rung | §4.2 S2, §4.4 | S2, S5 | row, bracket | written |
| 3 | `ways.widths` | `ways.json` | way-class widths | §4.3, §4.4; the `aqueduct` class's row V11 §3.24.2 (`channelCm`, `deckExtraCm`) | S4, S5, S9; S4, S6 and EVO_RAISED read the `aqueduct` class's row (the raised-way generator at S4 and the end of S6, V06 §3.19's epoch pass) | row | written |
| 4 | `granularity` | `granularity.json` | granularity rows by kind × band | §4.7 S10 | S10 | row, bracket | written |
| 5 | `heights` | `heights.json` | `HeightsRow` (with the `stepped-shrine` row, item 110 (c)) | V11 §3.6.4 | S11 (§2.6's stage-3 hook: V02's massing and its M11 heights), U-SYS (V04's stepped monuments); modules: the plan rung (V03 §3.3's storey heights) | row | written here |
| 6 | `prosperity.bands` | `bands.json` | `BandSet` | §4.5 | every band-keyed reader | row | written |
| 7 | `prosperity.drivers` | `drivers.json` | driver kernels and weights (with `w_sun`, item 102) | §4.5; `w_sun` V11 §3.3.5 | S6, S10a, EVO_FIELD (the building shade mask's `w_sun` term, V06 §3.4; the field step's re-evaluation runs as S6) | weights | written |
| 8 | `density.drivers`, `greenery.drivers` | `drivers.json` | driver kernels | §4.5 | S6, S10a | weights | written |
| 9 | `s0.features` | `features.json` | feature probabilities; S1's geology rows by relief (item 109 (a)'s mountainous values); the relief rows' `terracedEdges` column (item 110 (a)) | §4.2 S0, S1; `terracedEdges` V11 §3.24.1 (file f item 289) | S0, S1, S10, S11 (the district-edge levelling) | row | written (the column here) |
| 10 | `workLimits` | `workLimits.json` | work-limit coefficients | §5.1 (5) | every stage | row | written |
| 11 | `market.siting` | `market.json` | market-siting weights | §4.2 S3 (12) | S3, S7b | weights | written |
| 12 | `cut` | `cut.json` | `cut.bendMode`, `cut.flattenM`, reach weights | §4.6 | S8 | row | written |
| 13 | `walls` | `walls.json` | `castle.minInnerM`, `wall.smoothPasses`, gates' waterfront share, spacing, `moat.waterReachM`, `moat.maxFallCm` (§4.2 S3 (10)) | §4.2, §4.4, §4.8 | S3, S5a, S7 | row | written |
| 14 | `walls.barriers` | `walls/barriers.json` | `WallBarrierRow` | V11 §3.16.1 | S3 (9), S5a, S7 (§4.8's graded furniture), VS3 (the palisade's barrier arcs, V07 §3.4 step 5), SKY (an island's rim closing as a cliff, V05 §3.21), EVO_GROWTH and EVO_FORT (a new circuit and a ring's contraction under barrier closure, V06 §3.7) | row | written here |
| 15 | `walls.waterfront` | `walls/waterfront.json` | `WaterfrontThreatRow` | V11 §3.16.2 | S3, S10 (the mole-head slot's fort claimant, V11 §3.24.4), EVO_FORT (the waterfront grade and the harbour-mouth chain at an epoch, V06 §3.2 row 9); port.digest (DR2, §7.7) | match | written here |
| 16 | `district.growth` | `districts.json` | `district.growthRate` | §4.5 | S6 | row | written |
| 17 | `roster.classes` | `roster/classes.json` | `BuildingClassRow` (with `profile`, `staff`, `villageForm`, `templateFamily`, `crypt`, `cryptM2`, the compiled `deckOk`, and the display cells, V11 §2.3) | V11 §3.5 (town and city classes); V07 §2.4 (village classes, keyed `v.<id>`, V11 §2.9); V05 §2.4 (landing facts) | S2, S7b (with S7b (2)'s sub-districts), S10a (the noxious-first order, field pass 2's kernels), S10b, S11 (with §2.6's basement function and V02's massing), S12a, S12c (the identity rows' families, `SectorRow.tags`), S13a, U-SYS and U-ACCESS (V04's catacomb sources, church count, access pass and crypt join), EVO_USES (V06 §3.9's use step and clientele lookup), EVO_SITING (regrowth's per-use `deckOk`, V06 §3.8), EVO_DECLINE (`salvageM3`, V11 §3.18), EVO_UNDER (V06 §3.18); modules: the wings rung (V02), the plan rung (V03), port.digest, `@plat/app` (the display cells, V11 §2.3: V09's roster reader, palette, cards and Find's lexicon) | row, match | written here |
| 18 | `roster.districtKinds` | `roster/districtKinds.json` | `DistrictKindRow` (with `affinity`, file f item 438, and `label`, `icon?`) | V11 §3.9 (the `sky-*` rows from V05 §2.4's facts) | S6, S7b, S10b, SKY (V05's arena typing); V01's unit run is a derivation unit these same stages run (V01 §3.10) | row, match | written here |
| 19 | `roster.resources` | `roster/resources.json` | `ResourceRow` (goods columns; `label`, `icon?`) | V11 §3.7 | S2, S10a, S10b, EVO_USES (the goods' `comfortM` and orientation over epochs, V06 §3.9.10) | row | written here |
| 20 | `roster.institutions` | `roster/institutions.json` | `InstitutionRow` | V11 §3.21.3 | S2, S7b (the institution records of §2.7) | row | written here |
| 21 | `roster.government` | `roster/government.json` | `GovernmentRow` | V11 §3.21.1 | S2, S12c (§4.5's dials) | row | written here |
| 22 | `roster.religions` | `roster/religions.json` | `ReligionRow` | V11 §3.21.2 | S2, S12c (§4.5's dials) | row | written here |
| 23 | `roster.households` | `roster/households.json` | `HouseholdRow` | V11 §3.21.2 | S2; derivePerson (§10.3, on demand) | row | written here |
| 24 | `roster.settings` | `roster/settings.json` | `RosterSettings` (§10.2; its one row `settings`, cells V11 §3.5.1) | V11 §3.5.1 | S2, S10b, S11 (§2.6's basement function with V03 §3.7.4's crypt rank pass after it), EVO_USES and EVO_MUTATION (the epoch ops that re-run the rank in their batch, V06 §3.18.3 (1)–(2)) | row | written here |
| 25 | `roster.basementGate` | `roster/basementGate.json` | `BasementGateRow` | §10.2 | S11 (§2.6's basement function) | row | written |
| 26 | `roster.covers` | `roster/covers.json` | `CoverRow` | V11 §3.14 | S10b (§4.7's concealed institutions) | row | written here |
| 27 | `roster.classMix`, `roster.clusters`, `roster.tenure` | `roster/*.json` | `ClassMixRow`, `ClusterRow`, `TenureRow` | §10.2 | S10b, S11 | weights, row | written |
| 28 | `roster.quarterIdentities` | `roster/identities.json` | `QuarterIdentityRow` | V11 §3.10 | S12c (also at each epoch's `character` step, V06 §3.2 row 17), S13a | thresholds, row | written here |
| 29 | `roster.powerLinks`, `roster.sectorLinks` | `roster/links.json` | `PowerLinkRow`, `SectorLinkRow` | V11 §3.15 | S12c (§4.5 (6)) | weights | written here |
| 30 | `roster.bandRanges` | `roster/bandRanges.json` | `BandRangeRow` | §10.2 | S7b, S10a | row | written |
| 31 | `roster.sectors` | `roster/sectors.json` | `SectorRow` | V11 §3.15 | S2, S12c | row | written here |
| 32 | `roster.portRows` | `roster/portRows.json` | `PortRows` | §10.2 | S6, S7b (§4.5), S8 (§4.6), S12a (§4.9), U-NET and U-FRONT (II.7) | row | staged (the port fills) |
| 33 | `siting.profiles` | `siting/profiles.json` | `SitingProfile` per profile family, with the family's `label`, `icon` and `findGroup` | V11 §3.4 | the compiler (class profiles, the class rows' `icon`, the generic rows' `label`), item 104's resolver, S10b; modules: `@plat/app` (the palette's groups; Find's groups, item 120 (b)) | row | written here |
| 34 | `siting.families` | `siting/families.json` | `RelationFamilyRow` | V11 §3.3 | S10b (`resolveSiting`) | row | written here |
| 35 | `siting.pairs` | `siting/pairs.json` | `SignaturePairRow` | V11 §3.8 | S10b (`resolveSiting`) | row | written here |
| 36 | `siting.web` | `siting/web.json` | the supply web's settings (item 105 (f), (g), (h); item 107) | V11 §3.7.4 | S7b (1), S10a, S10b, EVO_USES (links re-bound, relaxation passes and splits over epochs, V06 §3.9.10) | row | written here |
| 37 | `siting.custom` | `siting/custom.json` | the custom-chain placement rules (item 104 (h)) | V11 §3.13.4 | S10b, EVO_USES (custom chains over epochs, V06 §3.9.8) | row | written here |
| 38 | `roomProgram`, `interiorLadder` | `roomProgram.json` | `RoomProgramRow`, `InteriorLadderRow`, layout patterns | V03; §2.6 | S10b and S11 through the base's one capacity function (§2.6: the programme's `circulation` and the `room` form's area minimum; from M2b the capacity's `R(s)` cells `stair.ladder` and `stair.landingCm`, file f item 233), from M3a S11's `Entrance.storey` and `basementDoor(b)` (`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`, `moduleCm`, `door.mainCm`; file f items 241, 578); EVO_DEPARTURES, EVO_SITING and EVO_GROWTH (an epoch's `relet`s, V06 §3.5.1, V06 §3.8, V06 §3.6); modules: the plan rung (V03; lazy), `@plat/hood` (the close-up's entrance reserve calling `basementDoor(b)`, V01 §3.8.2 step 5) | row | written (V03) |
| 39 | `composition` | `composition.json` | V02's composition rows | V02 | S11 (V02's `outline()` and massing, V02 §3.1, V02 §3.5); modules: the wings rung (lazy, V02 §3.1), `@plat/hood` (the close-up's porch kind rows, V01 §3.8.2, from M3a) | row | written (V02) |
| 40 | `mutator.compat` | `mutator/compat.json` | `CompatibilityRow` | V11 §3.6.3 | S11 (its designation mutator, which every designation change an epoch makes runs) | row | written here |
| 41 | `farm` | `farm.json` | `FarmTable`, `FarmModeRow` | §4.9 | S2, S12a | row | written |
| 42 | `greenery` | `greenery.json` | the greenery rule rows (the oasis grove's row, item 111) | §4.9 | S12b | row, bracket | written |
| 43 | `climate` | `climate.json` | `ClimateRow` (with `farmLayout`, `rainMmPerYear`, the dry-country cells of item 111, the season cells of item 117 and the weather cells of item 124) and its named row `settings` (`ClimateSettings`: `aridMin`, item 124's weather block) | V11 §3.17; `dry` and `aridMin` V11 §3.25.1; `seasons` V11 §3.25.6; `weather` and the weather block V11 §3.25.11 | S0 (the arid water chances, P(oasis)), S1 (the oasis site and area band, the well-yield raster), S2 (the farm mode, which §4.9 reads with `farmLayout` before S2 demands the farm plots), S3 (S3 (6)'s water pull), S6 (the prosperity water term and the sun cell; the aqueduct's water balance, V11 §3.24.6), S10b (the wells' yield term and coverage factor), S11 (roof), S12a (§4.9's field system and farm modes — the climate override `farmLayout`; the oasis gardens), S12b (§4.9's species; the oasis grove), EVO_FIELD (a failing spring's pull, V06 §3.12.1), EVO_RAISED (the water balance), VS1, VS2, VS5, VS8 (V07's village readings of item 111, V07 W75); the renderer (§8.2's season rows, item 117; the weather effects — §6.1's weather stream, §8.2's effect marks and §8.4 (i)'s light terms, item 124); modules: `@plat/app` (V09's season control and Start a shower now), the clerk (V10) | row | written here |
| 44 | `landuse` | `landuse.json` | land-use rows (surface role, crop and livestock options) | V11 §3.17.2 | S12a; the renderer (§8.2) | row | written here |
| 45 | `hidden` | `hidden.json` | hidden-share rows | §4.6 | S10 | row | written |
| 46 | `decline` | `decline.json` | `DeclineTable` | §4.11; material durability rows V11 §3.18 | EVO_DECLINE (the strike pool, its persistence rows and V11 §3.18's retaining cells, V06 §3.5.2, V06 §3.19.4), EVO_RAISED (the disuse cells, V06 §3.19.2), EVO_WORKS (the `decay` Works and dwell bands, V06 §3.13); the compiler (`salvageM3`) | row, weights | written |
| 47 | `wealthLadder` | `wealthLadder.json` | survivors' ladder, churn caps | §4.11 | EVO_LADDER (the wealth ladder's rungs, V06 §3.8.4), EVO_DECLINE (the churn caps the strike pool runs inside, V06 §3.5.2) | row | written |
| 48 | `works` | `works.json` | `WorksTable`, `CalendarRow` | §4.11 | EVO_WORKS (V06 §3.13), S13a | row | written |
| 49 | `materials` | `materials.json` | `MaterialRow` (with the structure keys `retaining`, `raised:<kind>`, `pier`, `deck`, and the patch materials' keys, item 114) | V11 §3.19.3 | S10, S11 (the material read and the levelling), S4, S5b, S6 and EVO_RAISED (the raised-way generator), EVO_WORKS (the durations, through `works`), EVO_FORT (a patch's material, V06 §3.7.7); the renderer (§8.2's texture and colour roles) | match | written here |
| 50 | `era` | `era.json` | `EraRow` (with `aqueductM`, `raisedVaultM`) | V11 §3.19.1 | S3 (the moat, the intervallum), S5 (the towers), S7, S11 (§4.7's lights; the material keys), S12a, S12b (§4.9's fuel, timber and market green), S4, S6 and EVO_RAISED (the raised-way chance), U-SYS (V04's vaults), VS8 (V07's pump date); the renderer (the harbour chain's drawing, §8.2) | row | written here |
| 51 | `lights` | `lights.json` | `LightRule` | §4.7, §8.4 | S11; the renderer (§8.4) | row | written |
| 52 | `palette` | `style/*.json` | style sheets and role values (each sheet's head row with `label` and `icon?`) | §8.2 (values; the deficiency-contrast threshold of item 112 among its cells); V05 §5.1's sky-slot facts and V04's ruin and void style facts — this volume writes no colour; the sheets' labels V11 §3.1's *Display cells* | the renderer (§8) | row | written |
| 53 | `sugar` | `sugar.json` | the sugar expansion table | §7.1 | the edit parser | row | written |
| 54 | `disruption` | `disruption.json` | `DisruptionBudgetRow` | §7.7 | S10b (requests) | row | written |
| 55 | `knowledge.admit` | `knowledge.json` | the knowledge admission table | §9.2 | §9.2's admission function: S13b (label placement, view data outside the model's stage graph); the thematic rows, concealed marks and lights, the legend and `live.voids` (the renderer); the reader — hover and every `query` kind, Find's lists, counts and glow among them (`@plat/app`; item 120 (h)); every export (§11.1) | row | written |
| 56 | `islands` | `islands.json` | `IslandRule` and V05's rows (its `accessSiting.deckGapM`, `lineClearM` and `accessCount.handMax` are V05's own cells) | II.6, V05 | S7b (5), SKY (V05's stage, and its epoch participants `sky.islands` and `sky.clearance`, V05 §3.15) | row | written (V05) |
| 57 | `sewer.existence`, `under.rule`, `under.tunnel` | `under/*.json` | `SewerExistenceRow`, `UndergroundRule`, `TunnelProfileRow` | II.7.1–II.7.4 | S0 (II.7.1's draw), U-NET, U-FRONT, U-LINK (as V04 §3.1 runs them), EVO_PRELUDE (the feature set re-resolved at an epoch's rung, V06 §3.2), U-FADE (`under.extend`'s sewer derivation and extension, V04 §1.1) | row | written |
| 58 | `under.network`, `under.layout`, `under.fade` | `under/network.json` … | V04's rows | V04 | U-NET, U-SYS, U-ACCESS, U-FRONT, U-CITY, U-LINK (V04 §3.1), S7b (U-FORECAST, V04's predictor called at S7b), U-FADE | row | written (V04) |
| 58a | `under.ruin`, `under.openings`, `under.dig`, `under.catacomb` | `under/ruin.json`, `under/openings.json`, `under/dig.json`, `under/catacomb.json` | `RuinRule` (with `CultureRow`), `UnderOpeningRow`, `DigRule`, `CatacombRule` — schemas V04 §2.3, `CatacombRule.order` V04 §2.3 | V11 §3.23 | U-SYS, U-ACCESS (T2b), U-FRONT (F6), U-CITY (V04 §3.1; at every rung, V07 §3.16's village subset included), S7b (U-FORECAST), U-FADE (V04's epoch participants, V06 §3.18; V07 §3.12 at village rungs), EVO_UNDER (excavation by demand, V06 §3.18.1); the bench (V12's bars) | row | written here |
| 59 | `undercity`, `under.systems`, `under.links` | `under/*.json` | `UndercityRule`, `UndergroundSystemRow` (the cavern row's `miningCellShare`, V11 §3.23.1), `LinkRule` | II.7.5, II.7.6 | U-SYS, U-ACCESS, U-CITY, U-LINK (as V04 §3.1 runs them), S7b (U-FORECAST), U-FADE | row | written |
| 60 | `evolution` | `evolution.json` | V06's rows (V06 §3.9.9's clientele defaults among them) | V06 | every epoch phase — EVO_PRELUDE, EVO_HAZARD, EVO_FIELD, EVO_USES, EVO_DEPARTURES, EVO_DECLINE, EVO_FORT, EVO_TERRAIN, EVO_LADDER, EVO_MUTATION, EVO_SITING, EVO_GROWTH, EVO_WORKS, EVO_UNDER, EVO_RAISED (V06 §3.16; V06 §2.12's `EvolutionTable`) | row | written (V06) |
| 61 | `village` | `village.json` | V07's village rung rows | V07 | S0, S1, S2, VS1–VS6, VS8, S10, S10b (`rules.race`, V07 W68), S11, S12a, S12b (V07 W3, W58, V07 §2.2a's per-sub-record stages; `village.plan` and `village.density` re-run VS1's and VS2's steps; `village.pins` re-runs VS8's rows at a village epoch under `VS8`; `village.records` places a record's market, claim or pin under `S10b`); EVO_SITING (the siting step (m), V07 §3.12), EVO_DECLINE (`epoch.rows`' persistence, street and hinterland rows, V06 §3.5.2–V06 §3.5.3), EVO_USES (`rules.claimArea`, V06 §3.9.6), EVO_GROWTH (the village's own phase, V07 §3.12, file f item 317) | row | written (V07) |
| 62 | `hood.*` — `hood.templates`, `hood.dispatch`, `hood.squares`, `hood.pins`, `hood.placeKnowledge`, `hood.defaultCuts`, `hood.kinds`, `hood.constants` (V01 §2.2) | `hood/*.json` | V01's rows: `TemplateRow`, `DispatchRow`, `SquareRow`, `HoodPinRow`, the place-knowledge and default-cut rows, `HoodKindRow`, and `hood.constants`' one `settings` row (`HoodSettings`, its columns V01 §3.14's column table) | V01 | S0, S1 and S6 (the standalone document's kind draw, frame and default cuts, V01 §3.10.1); S2 (the land estimate's dispatch land, `hood.dispatch`'s small-block weights and `land.smallShare`, V01 §3.5.9); S7b (S7b (1)'s capacity and reconcile with `templateLandM2`, V01 §3.3.7, V01 §3.5.9, and the standalone one-district allocation's anchors and affinity, V01 §3.10.1); S7c; S8 and S8.seed (the seed primitives' rows and the plaza primitive's `hood.squares`, V01 §3.4; the seed pass registers `S8.seed`, file f item 345, inside S8); S9b; S11 (a square's centrepiece from its `hood.squares` row, V01 §3.5.10); S13a (the naming context's and the places' cells); modules: `@plat/hood` (the close-up's hood pins, V01 §3.8.2), `@plat/app` (the panel's template cards, V01 §3.3), testkit.bench (T-V1-5's fabric classifier) | row | written (V01) |
| 63 | `dossier.*` — tiers, site, access, threat, deposits, quarters, landmarks, distribution, status, wealth, sectors, government, powers, conditions, calendar, receipts, derivation, impairments, crime, cultures, categories, tags, relations, historyScars, magic, era, materials, isolation, chainStatus, dependencySeverity, calamitySeverity, qualifiers, threats, ruinEvidence (these twelve split from `relations`), `customWeights` (the custom definition's `economicWeight` and `criticality` words → `PortRows.customKinds`' numbers, V08 §2.6, V08 §3.11; J-V8.108), readiness (item 114), climates (item 117), historyEvents (item 113), festivals (item 118) — and V04's two, `sanitation` and `subterranean` (files `dossier/sanitation.json`, `dossier/subterranean.json`; `owner` `'V04'`) | `dossier/*.json` | V08's row types (V08 §2.6); V04's two the match rows of V04 §2.3a (`sanitation`: match, binding; `subterranean`: match, effect, binding) | §14 item 7, V08 §2.6, V08 §2.6a; V04 §2.3a for its two (DR17) | port.digest (for V04's two, DR17's creation and binding at door 1: `toggles.sewers`, a system's forced existence, a placement's `arena` row, each record's binding target); for V04's two also `@plat/app` (V09's why card, V09 §1b's dossier-facts table) | row, match | written (V08; V04's two written (V04)) |
| 64 | `dossier.kinds` | `dossier/kinds.json` | V08's `kinds` row (with the optional `implies`) | V11 §3.11 | port.digest (DR24), the raised-way and bridge readers through `implies` | match | written here |
| 65 | `dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.goodWords` | `dossier/*.json` | V08's shapes for the first three (the archetype row's optional `village` cell, `ArchetypeVillageCell` of V11 §2.8; the synonym row's optional `family`; the keyword row's optional `near`, `class`, `specialisation` and `binds`); `goodWords` V11's own `GoodWordRow` (V11 §2.8) | V11 §3.13 | port.digest, item 104's resolver, V08's adapter (the good-word matching rule, V11 §3.13.5) | match | written here |
| 66 | `dossier.ladders` | `dossier/ladders.json` | `LadderStepRow` | V11 §3.12 | port.digest (T9, DR9), S2 | row | written here |
| 67 | `character` | `character.json` | `character.anchorSigma`, `anchorRadiusM`, `identity.dominantMin`, `identity.hysteresis`, `identity.dwellEpochs`, `dial.*`, `pressure.*`, `dispersal.random`, `relation.*`, `trade.kernelScale` | §4.5 | S12c (also at each epoch's `character` step, V06 §3.2 row 17), EVO_PRELUDE (the dials past their hysteresis and `TradeFlow` re-read, V06 §3.2 row 1) | row | written |
| 68 | `naming.*` (settlement, district, quarter, way, place, landmark, water, island, cluster, undercity, ruin, formerWall, vaults, person, folk, villageEnd, field, `building.wingRole`) | `naming/*.json` | `GrammarDef` | V11 §3.20.1 (grammars); corpora `authored` | S13a (V04's T6 and the renames at an epoch's `character` step included); modules: derivePerson (§10.3), V02's wing hover label | row (field slices for corpora, §7.6) | grammars written here; corpora authored (bar: V11 §3.20.6) |
| 69 | `desc.*`, `chronicle.*`, `appearance.*` | `desc/*.json` | `TemplateDef` | V11 §3.20.4; V06's chronicle defaults | S13a; modules: the description writer, derivePerson (§10.3), the chronicle writer (V06 §2.10, non-canonical, rebuilt by replay) | row | written here (skeletons); lines authored |
| 70 | `corpora` | `corpora/*.json` | `{id, kind, entries[]}` | V11 §3.20.5 (sizes and rules), V11 §3.20.6 (plan and bars) | S13a and derivePerson (§10.3), through the naming engine | row | authored |
| 71 | `ancestry`, `culture` | `naming/ancestry.json` | `AncestryRow`, culture rows (with the `building` block, item 110 (b)) | §10.3, V11 §3.20.3 | S13a, S11 (V11 §3.24.3's specialisation rows), S4, S5b, S6 and EVO_RAISED (V11 §3.24.2's chance), U-SYS (V04's vault share), EVO_FORT (a patch row's culture, V11 §3.25.3); derivePerson (§10.3) | row, field slices | written here (one human ancestry, the culture rows) |
| 72 | `sim.professions`, `sim.items`, `sim.services`, `sim.prices`, `sim.statblocks` | `sim/*.json` | `ProfessionRow`, `ItemRow`, `ServiceRow`, `PriceTable`, `StatBlockPack` | V11 §3.21.4 (schemas cited, §10.3) | `@plat/sim` | row | authored at M4b |
| 73 | presets `MFCG`, `FTG`, `VG` (V07 §3.15; file f item 377, from V07's V-M0, the milestone whose content ships its file, V07 §8; its entries required on the village-read tables only, V11 §3.2.1 step 4), `FM` (V02 §3.10.8; file f item 376, from M6c) and `NG` (V01 §3.15; file f item 584, from V01's M5, V01 §8.1; resolved through `MFCG`, its entries on `hood.constants` only) — `PresetId`, V11 §2.2 | `presets/*.json` | preset deltas | §7.6, V07, V02, V01 | the override chain; the compiler's preset check (V11 §3.2.1 step 4) | row | written |
| 74 | the setting pack `english-fantasy` | `packs/english-fantasy/` | `SettingPack` | §10.4, V11 §3.20 | the override chain | — | grammars written here, corpora authored |
| 75 | `keymap` | `keymap.json` | the default keymap | §14 | `@plat/app` | row | written (V09) |
| 76 | `siting.declared`, `siting.linkEdits` (`documentOnly`, file f item 380) | shipped empty | the declaration rows of V11 §4.2 (with the `use:` row's `specialisation` cell) | documents (V09's gestures, V10's accepted proposals) | item 104's resolver, S10b | match | document-only |
| 77 | `dossier.catalogue` (a manifest, not a rule table) | `src/dossier/catalogue.<line>.json` | V08 §2.4's manifest shape — each catalogue kind's entry, `ladderPairs` (the ladder file's pairs as data, V08 §3.5.1 (f)) and the crisis census `crisis.stressors`, `crisis.archetypes`, `crisis.events` (item 122); cited, never restated | V08's build step | the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over its crisis census lists (T-V11-46 (a)) | — | committed by V08 |
| 78 | `terrace` | `item110/terrace.json` | `TerraceRow` | V11 §3.24.1 | S10, S11 (the levelling — at village rungs through V07's reference cells, and at every epoch that levels, V06 §3.19.4 (1)), S7c (V01's stepped fabric, `terraceState`); modules: V09's T2 terrace sugar, T3 retaining mode and flat-ground bends (V09 §4.20.1 (3)), the bench (V12) | row | written here |
| 79 | `retaining` | `item110/retaining.json` | `RetainingProfileRow` and its named row `settings` (`RetainingSettings`) | V11 §3.24.1; `settings.stateSnapCm` §2.7 by file f item 245 | S10, S11 (the levelling: material, batter, buttresses, towers — also at every epoch that levels or restores a stretch, V06 §3.19.4 (1), (6); `stateSnapCm` wherever a re-derivation carries a generated wall's state knots); `materials`' structure key refers to it; modules: V09's tools, the bench (V12) | row | written here |
| 80 | `raisedWays` (rows, `settings`, `structure`) | `item110/raisedWays.json` | `RaisedWayRow`, `RaisedWaySettings`, `RaisedWayStructure` (with `span`, `slideMaxFactor`, `maxClearSpanM` and `stripMarginM`) | V11 §3.24.2 (the `span` values, `slideMaxFactor`, `maxClearSpanM` and `stripMarginM`; the rules file f item 244's, §2.7, and §4.6 S8's strip) | S4, S6 (the base's raised-way generator), `S8` and `S8.seed` (V01's seeds, fans and bent-cut lanes crossing under an arch read `structure.clearanceCm`, V01 §3.17.3 (3); S8 cuts the under-deck strip at `structure.stripMarginM`, §4.6, V01 §3.17.3 (2)), S5b (the main-road step at stages k ≥ 2 and every epoch stage, through S4's router, which prices viaduct spans; §4.4; file f item 290), EVO_RAISED (V06 §3.19's epoch pass and its strip clearance), U-SYS and U-FADE (V04's arch vaults and their reconcile; `foundationObstacles`' `span.supportFoundationCm`, V04 §3.5.0), U-CITY, U-ACCESS and U-LINK (`foundationObstacles` read by U-CITY's carve and U-DIG's cost), SKY (V05's caster ceiling, with its `sky.clearance` participant); modules: V09's T4, the clerk (V10), the bench (V12) | row | written here |
| 81 | `ways.crossing` | `item110/crossing.json` | `WayCrossingRow` | V11 §3.24.5 | S4, S5, S9, `S8` and `S8.seed` (V01's lanes and seeds, V01 §3.17.1 (5)) where a way crosses a retaining wall; S4, S5b, S6 and EVO_RAISED (the raised ways' ends); S3 (5), S4, S5b and S5c (the class grade limit on routed edges, §4.3 *Lattice and costs*), §7.3 (a) 5 (the steepness report); S13a and S14 (`rampMaxGrade`, the stair-stepped way's threshold: its naming context and its step ticks, V01 §3.6 (3)); module: V09's ghosts | row | written here |
| 82 | `deck` | `item110/deck.json` | `DeckRow` | V11 §3.24.4 | S10 (the base's deck-plot cutter, at village rungs too), S11 (V02 M10/M11's deck budget and storey bend), EVO_SITING (deck faces offered at regrowth tier (5), V06 §3.19.5 (1)), EVO_DECLINE (the pool's `deck` candidates, V06 §3.5.2), EVO_RAISED (a deck's repair, V06 §3.19.5); modules: V09's tools, the bench (V12) | row | written here |
| 83 | `deck.landmarks` | `item110/landmarks.json` | `DeckLandmarkRow` | V11 §3.24.4 | S10 (the cutter's slot draws), S11 (V02's landmark composition); modules: V09's T6 slots, the fixtures | row | written here |
| 84 | `roster.specialisations` | `roster/specialisations.json` | `CultureSpecialisationRow` | V11 §3.24.3 | S11 (the draw, file f item 259, and V02's resolution chain; at village rungs V07 §2.4's cap); modules: the plan rung (V03's rows), port.digest (V08's DR15 trace), the clerk (V10), the bench (V12) | row | written here |
| 85 | `water` | `item110/water.json` | `WaterNeedRow` | V11 §3.24.6 | S1 (S1 (10)'s well-yield raster by ground, item 111 (b)), S6 (the aqueduct reason's test), EVO_RAISED (V06 §3.19's pass); module: V09's uphill-aqueduct bend to a well (J-VI.4 (h)) | row | written here |
| 86 | `toolkit` | `toolkit.json` | `ToolRow` (with `ToolModeRow`, `ToolParamRow`) | V09 §2.3 (the shipped rows V09 §4.2; item 110's V09 §4.20) | modules: the application's rail and options strip, the mapper, the binding table and the context menu (V09 §3.3, V09 §4.2–§4.4), `@plat/docs`' tool pages, T-V9-12 | row | written (V09; owner V09, `parity: 'untouched'`, `packPatchable: false` — a user never edits it, V09 §2.3) |
| 87 | `messages` (one file per locale; `en` ships) | `messages/<locale>.json` | `MsgRow` for `en.json`; `{ key; text }` for every other locale's file (buttons, tone and codes are read from `en.json` only, V09 §2.9; J-V9.121) — the loader refuses a locale file carrying `buttons`, `tone` or `codes` | V09 §2.9 (the rows V09 §4.9; volume 10's key families' `en` texts from V10 §2.10, V10 §3.9, V10 §3.9a, V10 §3.10–V10 §3.13, V10 §3.16, V10 §3.20 and V10 §4.4; volume 8's `host.*` rows; volume 6's `info.copy.condensed` line, V06 §3.15.5 — as V09 §1b's messages row lists them) | modules: the application (every bend line, refusal, error and hint), the clerk (V10), `@plat/docs` | row | written (V09 and V10; owner V09, `parity: 'untouched'`, `packPatchable: false` — a locale is another file of the same keys, V09 §2.9; which locales ship follows SettlementForge, J121) |
| 88 | `clerk.ops` | `clerk/ops.json` | `ClerkOps` | V10 §2.10 | module: the clerk (`@plat/clerk`: the backend, the request builder, the meter, the caps, the store) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false`; its layers the shipped rows and the device's preference layer only — a document's, a skeleton's or a host's `editTable` on it refused as V10 §2.10 states) |
| 89 | `clerk.content` | `clerk/content.json` | `ClerkContent` | V10 §2.10 (its default lexicon rows V10 §3.3's table) | module: the clerk (the encoders, the resolver, the brief renderer, the critique engine, the grounding check, the system prompt) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false` — its layers the shipped rows, the device's preference layer, the document's override layer and a host's rows, V10 §2.10; §11.4 door 3) |
| 90 | `way.surface` | `way/surface.json` | `SurfaceRow` (V01 §2.2: `wayClass`, `era?`, `band`, `surface`; key `wayClass/band/era`, an absent `era` an empty component) | V01 §3.7.3 (file f item 207) | S10a (the way-surface rule at S10a's end, after field pass 2); S6 (an epoch's field step re-bands, and the ways whose fronting band crossed the hysteresis take their surface again, V01 §3.7.3, V01 §4.5); EVO_DECLINE (the landfall's re-laid surface, V06 §3.5.2) | row | written (V01; `owner` `'V01'`, `parity: 'zeroExtensions'` — no `extension` cell, so every preset reads its rows; `packPatchable: true`; its one value column an enumeration, `calibratable: false`) |
| 91 | `squares.quota` | `squares/quota.json` | `SquareQuotaRow` (§10.2; key `band`) | V01 §3.5.2 (the default rows) — the base table §4.5 S7b (3) and §4.7 S9 read (file f item 301) | S7b (S7b (3)'s square claims larger than a block, from M2b); S2 (the land estimate's sub-block square share, V01 §3.5.9, from M5); S9b (the sub-block remainder, V01 §3.5.2, from M5) | row | written (V01's rows; `owner` `'base'`, `parity: 'perPreset'` — its `MFCG` and `FTG` entries where they differ, V01 §2.2, no `NG` entry, `NG` reading it as `MFCG` does; `packPatchable: true`; `haPer1000` and the kind factors calibratable, their register entries written at V01's M2b exit by V12 §3.11's default line, V01 §8.1) |
| 92 | `base.settings` | `base/settings.json` | one row `settings`: `reroll.maxAdvance` (integer, 3), `crossing.searchBandM` (m, 120), `index.gridCellM` (m by level: L0–L1 25, L2 10, L3–L4 5), `view.zoomOutMarginStops` (integer, 1; item 116 (a)) — the base's values, provenance `architecture 2026-09-28` (`view.zoomOutMarginStops` `owner`, item 116), `calibratable: false`, note `fixed: a base engineering constant` | here (J-V11.106; the base cites the cells by name and states no value) | S1 (§4.2 S1 (5)'s crossing sites), every stage through §3.3's dynamic grid, §5.1 (6)'s New random (the edit parser and the stage it re-derives), §6.3's anchor table (the reconciler); the renderer (§8.8's zoom-out limit on the pyramid, §9.5's framing, §11's export frames); modules: `@plat/app` (V09's view controls), V07 §5.2's township view | row | written here (`owner` `'base'`, `parity: 'untouched'`, `packPatchable: false`) |
| 93 | `history` | `history/settings.json` | `HistorySettings` (one row `settings`) | V11 §3.25.2 | V06's replay at generation (V06 §3.20: its plan, epochs and refounding, run by the epoch runner's phases under their own ids — EVO_PRELUDE for the plan, EVO_SITING and S4's router for `existingFabricCost` at `reuseCost`, EVO_TERRAIN for burial), U-SYS (V04's `BuriedFormer.lay` depth factor, V04 §3.5.5 (b)), VS1 (V07's refounded village's lattice pricing, V07 §3.12a); modules: port.digest (DR36's symbolic peak sizing), the clerk (V10), the bench (V12) | row | written here |
| 94 | `history.events` | `history/events.json` | `HistoryEventRow` (V06 §2.14) | V11 §3.25.2 | EVO_PRELUDE (V06 §3.20.2's event-to-epoch mapping, which feeds each replay epoch's inputs); modules: the clerk (V10's story), the bench | row | written here |
| 95 | `walls.condition` | `walls/condition.json` | `WallConditionSettings` (one row `settings`) | V11 §3.25.3 | EVO_FORT (V06 §3.7.7's drivers, decay and repair), S3 and S7 (§7.7's DR41, item 114 (d), applied where the enceinte and its stretches are laid), VS3 (V07's palisade, V07 §3.4 (8)); modules: the clerk (V10), the bench | row | written here |
| 96 | `walls.patchMaterials` | `walls/patches.json` | `PatchMaterialRow` | V11 §3.25.3 | EVO_FORT (a patch's material draw), S7 (the generation-time patched runs' material), VS3 (the palisade's patches); the renderer (§8.2's patch line style by `look`); modules: `@plat/app` (V09's Material chip by `label`), the clerk (V10), exports (§11.1's condition and material) | row | written here |
| 97 | `grandeur.ceiling` | `buildings/ceiling.json` | `GrandeurCeilingRow` and its named row `settings` (`GrandeurCeilingSettings`) | V11 §3.25.4 (the table's shape §10.2 as item 115 homes it) | S2 (the manor count at the territory rungs, V07 §3.8), S10b (the rung ceiling on the class mix, §4.7 S10b; V07 §3.8's village class mix), S11 (V02's composition chain caps a dwelling's family), EVO_SITING, EVO_GROWTH and EVO_MUTATION (V06 §3.8.5's designs at the epoch's rung); modules: `@plat/app` (V09 §4.21.5's shell check), port.digest (V08 §3.16 (3)'s "specified" test reads `grandClasses`), the clerk (V10), the bench | row | written here |
| 98 | `season.surfaces` | `season/surfaces.json` | `SeasonSurfaceRow` | V11 §3.25.6 | the renderer (§8.2's season rows over fields, gardens, orchards, meadows, commons, greens, hedges, vines and deciduous crowns); exports (§11); modules: the clerk (V10) | row | written here |
| 99 | `season.water` | `season/water.json` | `SeasonWaterRow` | V11 §3.25.6 | the renderer (§8.2's `ice` role by water kind); exports (§11.1's battle-map ice rule) | row | written here |
| 100 | `season.leaf` | `season/leaf.json` | `LeafPaletteRow` | V11 §3.25.6 | the renderer (§8.2's per-crown autumn colour by a keyed draw on `render.instances`; the colours of item 124's `leaves` effect marks) | row | written here |
| 101 | `season.cover` | `season/cover.json` | `LeafCoverRow` | V11 §3.25.6 | the renderer (§8.2's fallen-leaf cover rows) | row | written here |
| 102 | `festival.decorations` | `festival/decorations.json` | `DecorationRow` | V11 §3.25.7 | the renderer (§8.2's decoration rows by tier and band); exports (§11, the image only); modules: the clerk (V10), `@plat/app` (V09's festival list) | row | written here |
| 103 | `festival.staging` | `festival/staging.json` | `StagingKeywordRow` and the named row `fallback` | V11 §3.25.7 | port.digest (V08's adapter reduces the staging prose to these keys, J-V8.124); the renderer (§8.2's placement at the keyed place, else the fallback) | match | written here |
| 104 | `festival.motifs` | `festival/motifs.json` | `MotifRow` | V11 §3.25.7 | the renderer (§8.2's decoration colours and motifs) | row | written here |
| 105 | `festival.generic` | `festival/generic.json` | `GenericFestivalRow` | V11 §3.25.7 | modules: `@plat/app` (V09's preview list, standalone); the renderer | row | written here |
| 106 | `perf.qualitySpend` | `perf/qualitySpend.json` | `QualitySpendRow` | V11 §3.25.8 | the stage each row names (its StageId, written into this row's readers by the change that lands the row, as J-V11.85 does for a participant); modules: testkit.bench (§12's budget accounting, V12's bars) | row | staged (shipped empty; a row lands with its measured gain) |
| 107 | `crisis.looks` | `crisis/looks.json` | `CrisisLookRow` and its named row `settings` (`CrisisLookSettings`) — §10.2's shapes | V11 §3.25.9 | the renderer (§7.7's DR44, §8.2's crisis look rows, §8.8's massed ring marks, and §10.2's placement over V01's `campLand` and `disasterDistricts` and V06's `frontierFor`); exports (§11: pictures, and a battle map's image only); modules: `@plat/app` (V09's Show crises preview list and Find's list of looks by `label`, §2.9's framing, the panel's headcount line), the clerk (V10), the bench (V12) | row | written here |
| 108 | `crisis.map` | `crisis/map.json` | `CrisisMapRow` (§10.2; key `from/key`) | V11 §3.25.9 (a dossier row set; the words V08's census at the pinned baseline) | the renderer (§7.7's DR44: each standing overlay's look); port.digest (V08's baseline totality check and its `unmapped_word` notes); the compiler (T-V11-46 (a)'s totality over registry row 77's lists); modules: the clerk (V10) | match | written here |
| 109 | `damage.elements` | `damage/elements.json` | `DamageElementRow` and its named row `settings` (`DamageSettings`) | V11 §3.25.10 | §6.3's `plan.damage` thresholds wherever a plan is drawn — modules: the plan rung (V03: the damaged plan, its exports and panel lines), the wings rung (V02's ruined exterior), `@plat/under` (V04 §5.6's kinds below ground), `@plat/evolve` (V06 §3.23's default age), the renderer (§8.6, §11.1's battle maps), the clerk (V10), the bench (V12) | row | written here |
| 110 | `damage.materials` | `damage/materials.json` | `DamageRateRow` | V11 §3.25.10 | modules: `@plat/evolve` (V06 §3.23's `decayLevel`, read by every damage drawer of row 109), the clerk (V10), the bench (V12) | row | written here |

**The count.** One hundred and eleven catalogue rows (1–110 and 58a; some rows group several ids that share a file),
counted by `REGISTRY`'s size wherever a count is read; the catalogue is closed: a table any document names
and this list lacks is a registry defect the build refuses (T-V11-1). **Never calibrated** (`ColumnSpec.calibratable:
false` on every column; V12's register holds no entry for them): rows 63–66 and 77 (the `dossier.*` row sets, V04's two
among them, and the catalogue manifest; §13.9 (7), V12's R4 — a change is a table fix reviewed with V08, J-V11.65); rows
68–70 and the naming columns of row 71 (the ancestry row's `nameGrammar` and `appearanceTemplates`, each culture row's
grammar-slice and corpus fields; V12's R4 and T-V12-24: naming tables, grammars, word lists and packs are never
calibrated — a change is an authoring change held to V11 §3.20.6's bars), while row 71's culture `building` block stays
calibratable (V12 §3.11's row; J-V11.70); rows 86–89 (J-V11.81: the corpus stage never re-signs a tool row, a message
text, the assistant's operation or its wording, and the numbers their owners re-set by their own measurements — V10 §7.3's
evaluation for the clerk's budgets, token limits and prices; V09's usability runs for the toolkit's hints — land as
ordinary table versions, V11 §3.2.5, each a `minor` or `patch` bump with its cause); row 92 (the base's engineering
constants); row 97 (the grandeur ceiling — the owner's rule at THORP, HAMLET and VILLAGE, the base's behaviour above and
the `grandClasses` list: enumerations, V11 §3.25.4); rows 102–105 (a look's enumerations and calendar mappings, not
measured quantities: items, places, counts, motifs and windows, V11 §3.25.7); row 106 (measured costs, each row its own
evidence); row 108 (`crisis.map`: SettlementForge's words onto our looks, a dossier row set, V11 §3.25.9). Every other
row of items 111–119 and 122–124 is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its
switches (`history.replay`, `walls.condition.atGeneration`; T-V11-37), the patch rows' `label` and `look` (V11 §3.25.3) and
row 43's two owner-stamped weather caps `aridRainMaxPerHour` and `aridRainMaxWeeks` (item 124 (c); V11 §3.25.11), its
register entry V12 §3.11's.

**Display cells** (file f item 516; J-V11.93). Every table the UI shows rows of carries a `label` cell and an `icon?` cell
(V11 §2.3's meaning), `own` and `calibratable: false`, and the class rows also `synonyms` and `commonness`; T-V11-4
refuses a row of these tables without its `label`. Where the words are written: the town-and-city classes and V05's sky
classes, V11 §3.5.15; the `v.` classes, V07 §2.4; the generic classes, the compiler from their family (V11 §3.13.3); the
profile families (row 33), V11 §3.4's *Display words*, with their `findGroup` (Find's groups, V11 §2.3); the goods (row 19), V11 §3.7.1; the district kinds (row 18),
V11 §3.9; the patch materials (row 96), V11 §3.25.3; the crisis looks (row 107), V11 §3.25.9; the style sheets (row 52), here — `ink` "ink", `lit` "lit",
`hatched` "hatched", `parchment` "parchment" (a shipping ink-family variant), `bw-print` "black and white",
`night` "night", and the owner's third preset `house` "house" (D-1), each written into its sheet's head row by the seat
that ships the sheet (§8.2; §16's M1, M2b, M3b and M5); the random style and a user's saved sheets (V09 §4.5's T12 row)
are no shipped rows and take their words from V09. Icons: only the profile families' rows state one (`fam.<family key>`,
45 glyphs in V09 §5.1's sprite, written with the glyphs), and the class rows compile theirs from their family; the goods,
district kinds, patch materials, crisis looks and style sheets ship none, so their cards show the label alone (V09 §2.3's `iconCell` is
optional; a style card shows its rendered thumbnail, V09 §5.7), and a pack may state one.
=== END ===

=== REPLACE ### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks ===
### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks

Item 110's base mechanisms are the base's: the `RetainingWall` line record and the
levelling of S10 and S11, the raised parts on their own ground arena part with the course solver and the raised-way
generator (S4 for viaducts, the end of S6 for elevated roads and aqueducts), the deck plots and their cutter, the
second known-city fixture. The tiers are V02's (J-V2.62), the vaults V04's, the epochs V06's. This section holds only the
ROWS they read (types V11 §2.8c). Every table is `extension` (off in the parity presets, §7.6) and calibratable (V12 §3.11's register) unless marked; every cell's provenance is `general` with the practice named in the row's note (hill-town
terracing; arcaded viaducts and aqueducts; built-on bridges, moles and quays; stepped temple platforms); every value is
our own. No row here holds a random stream: each draw is its reading stage's, under the key V11 §2.10 records.

**3.24.0 The switches** (J-V11.49). One switch per row set, which is also that table's parity-neutral default
when a document's pinned set lacks it (J-V11.12) and the value the MFCG, FTG and VG presets resolve; every off form is a
cell value in its column's range, so a no-op pin's overlay can write it (V12 §2.13, J-V12.43):

| row set | off | effect when off |
|---|---|---|
| `terrace` | `enabled` false on every row | no `RetainingWall` is generated; the base's plinth, skirt and stepped wings carry every fall (§2.6) |
| `raisedWays` | every `chance` 0 | no raised way is generated; declared ones stand (item 110 (b)) |
| `deck` | every `offer` 0 | no deck offers a plot, so V02's deck budget is never read and V02's fallback constants never apply (V02 X16) |
| `roster.specialisations` | every `chance` 0 | no generated stepped building; declared ones stand |
| `deck.landmarks` | every claimant chance 0 | no generated slot building; declared and stamped ones stand |
| `roomProgram` `PlanGeometryRow.exposureAllStoreys` (item 110 (a); V03's cell, J-V3.84) | false | S11's entrances and the plan rung read the outside ground as before item 110 (V03 §2.4's `false`; V03 §3.6) |
| `climate` dry cells (item 111) | on every row `dry.oasis.chance` 0, `dry.waterPull` 0, `dry.waterProsperity` 0, `dry.sunCell` 1, `dry.wellYieldWeight` 0, `dry.wellCoverageFactor` 1 (V11 §3.25.1) | no oasis is generated (a drawn or dossier-made one stands, item 20), no water pull on the growth field, no water term, item 102's sun term as filed, wells placed and spaced as before item 111 |
| `history` (item 113) | `replay` false | generation is the one-click path; the history's events stay `HistoryHint` scars (§4.11 (1)) |
| `walls.condition` (item 114) | `atGeneration` false; `meansLow` 0, `wearChancePerYear` null, `needReturnYears` 0 | every run `standing` at generation; the epochs' neglect and repair as before item 114 (V06 §3.7.7 (4)) |
| `grandeur.ceiling` (item 115) | `enabled` false on every row | no ceiling: every rung reads as TOWN does (the "all manors" row everywhere, as before item 115) |

Items 116–119 and 122–124 add no switch here: item 116's margin is a view cell of the base settings row (V11 §3.1 row
92); the season and festival tables of items 117 and 118 are looks that never enter the model or its hash (with no season
and no festival chosen, the base's view draws); item 119's `perf.qualitySpend` ships empty; item 122's crisis looks are
switched per viewer by §2.9's `crises` key and item 124's weather effects by V09's device switch, both looks only, their
`scale`, `lookLevel` and `perHour` cells `extension` (the parity presets draw neither); item 123's damage has no switch —
a building never decayed draws its plan unchanged (`item123.damage`). With item 110's six off the generated
documents are byte-identical to the pre-110 goldens (T-V11-31, the no-op pin every volume's item-110 pin cites: V02's
T-V2-50, V03's T-V3-34, V06's T-V6-65, V07's pins); with each other row set at its off form, byte-identical to the base without that item
(T-V11-38 – T-V11-41; V06's T-V6-71, T-V6-73, T-V6-74). **Every no-op pin of the owner items is a NoOpPin registration on
V12 §3.7.8's engine that reads its off form from this table** (E-20; §13.2's one convention). The chance, offer and weight cells resolve 0 by §7.6's zeroing with
no entry; the switches (`terrace.enabled`, `history.replay`, `walls.condition.atGeneration`, `grandeur.ceiling`'s
`enabled`) carry explicit `presets.MFCG`, `.FTG` and `.VG` entries false, and `dry.sunCell` and `dry.wellCoverageFactor`
entries 1 (V11 §2.2's preset entries); V03's `exposureAllStoreys` carries the same three entries false, written by V03
on its own cell (V11 §2.2: another table's entries are its owner's). **`presets.FM`** (V02's building-scope preset) resolves
the stepped and deck families off — every `roster.specialisations` `chance` 0, every `deck.offer` 0 and every
`deck.landmarks` chance 0, carried as `presets.FM` entries 0 on exactly those cells (V11 §2.2; file f item 376's scope;
landing with V02's M6c, V11 §8) — so the FM goldens stay byte-identical at every switch-on bump (V12 §3.4.4, J-V12.54).

**3.24.1 Terraces and retaining walls** (item 110 (a)). *`terrace`* (registry row 78; the three rows
equal at first; J-V11.40):

| rung | enabled | slopeMin (share) | stepMinCm | stepMaxCm | minTerraceDepthM | retainingReachM | flatDepthM | coverShare |
|---|---|---|---|---|---|---|---|---|
| TOWN | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| CITY | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| METROPOLIS | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |

The `enabled` column is a switch, not calibratable (`ColumnSpec.calibratable: false`, as V11 §3.7.4's `orientEnabled` and
`splitEnabled`): the owner's "they go in" holds it true by the schema, its off form is V11 §3.24.0's parity value, and no
calibration run can name it (V12 §3.7.2 rule (1)); the terrace family's realism is confirmed through its thresholds'
register line and the M4 panel's M4-110 group, never by moving the switch (J-V11.75).
The last three columns are V09 §4.20.1 (3)'s flat-ground bends of a drawn retaining stroke (J-VI.11; own; written at M3a,
calibrated by V12 §3.11's terrace line): their only reader is that bend, which never refuses on the ground's account.

* **Units.** `slopeMin` is a share (rise ÷ run); V01's slope in percent is 100 × share, so V01's stepped fabric band
  "between slopeMeanPct 8 and terrace.slopeMin" reads 8 % to 15 %. The TOWN row is "the base-rung
  terrace row": V07's village `PLaw` takes its values at every anchor (J-V7.41), and V05 reads the rows unchanged on an
  island's arena.
* **Compile bar T-V11-32 (a).** `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm` (the base's `plinthCm` and `skirtMaxCm`,
  §2.6), `stepMinCm < stepMaxCm ÷ 2` (so every intermediate wall of §4.7's step regions, which retains more than
  `stepMaxCm` ÷ 2, is a wall), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` (else no unit could be levelled) and
  `flatDepthM ≥ minTerraceDepthM` (a flat-ground bend's terrace is a lawful terrace).
  A fall below `stepMinCm` stays the base's plinth; between `stepMinCm` and `stepMaxCm` one wall; above, an intermediate
  terrace of at least `minTerraceDepthM` and a second wall; a slope steeper than `stepMaxCm ÷ minTerraceDepthM` (0.67) is
  not levelled (the base's skirt and stepped wings, or no plot, reported). The tables editor clamps an edit that would
  break any of these inequalities — a `stepMinCm` raised to `stepMaxCm` ÷ 2 or a `stepMaxCm` lowered to twice `stepMinCm`
  among them — to the nearest lawful value and says so in one line (item 101 R2).
* **The relief column** (`s0.features`' relief rows, registry row 9; file f item 289): `terracedEdges` plain false, rolling
  false, hilly true, mountainous true — terraced wards on hill and mountain towns, lowland towns following the ground. It
  gates ONLY item 110 (a)'s district-edge source ("along a terraced district's edge when the relief row asks for
  terraces"); the plot, block and ward levelling runs at every relief wherever the thresholds hold.

*`retaining`* (registry row 79; `RetainingProfileRow`; interpolated along the value of the HIGH side's plot — the ground
the wall holds):

| band | material (weights) | batter | thicknessShare | buttress from cm · spacing m | parapet cm | towers per 100 m (min step cm) |
|---|---|---|---|---|---|---|
| poor | dry_stone 0.6, rubble 0.2, earth_bank 0.15, timber_crib 0.05 | 0.17 | 0.5 | 300 · 6–9 | 0 | 0 |
| modest | dry_stone 0.4, rubble 0.5, earth_bank 0.1 | 0.15 | 0.45 | 280 · 5–8 | 90 | 0 |
| prosperous | rubble 0.6, ashlar 0.3, brick 0.1 | 0.12 | 0.4 | 250 · 5–7 | 100 | 0.02 (300) |
| rich | ashlar 0.6, rubble 0.3, brick 0.1 | 0.1 | 0.4 | 250 · 4–6 | 110 | 0.05 (300) |

`earth_bank` and `timber_crib` are drawn only where the step is ≤ 150 cm (their weights renormalised away otherwise). A
wall along a public face at CITY and METROPOLIS (a square, a precinct, a primary or through way) reads the rich row's
material: civic works were dressed. The draws (material, buttress spacing, tower positions) are the levelling stage's, on
its own stream, keyed by the levelling unit's lineage. A decorative tower is never an `Enceinte`, has no gate and no walk.
The three new wall materials take §8.2's roles (file f item 412).

*`retaining.settings`* (the table's named row, V11 §2.1's settings form; J-V11.96):
`stateSnapCm` — file f item 245's state-profile snap, which it names `retaining.stateSnapCm` (this cell's prose name in
T-V11-1 (a)'s name map), its value stated once there; `own`, `extension`,
`calibratable: true`; its register entry is V12 §3.11's — the default line at M3a, restated in place by V06 §8's line on
`bar.T-V6-62` from V6-E2 (J-RF2.4 names the confirming measurement, T-V6-62's H-TERRACE century, and the
pre-decided fallback, the wall's own `stepProfile` sample spacing as the tolerance). Its one
reader is the re-derivation that carries a generated wall's `retaining_state_knot`s onto a new chain: S10 and S11, at
generation after an edit that re-levels a unit and at every epoch op that levels (a new stage's S10–S11, a rung-3 re-cut,
a `rebuild` running S11, V06 §3.19.4 (1), (6)), each under S10's or S11's id; a `repairRetaining`, the landfall's write
and a cut or join by `rekey` (file f item 245) move no knot by it. Under the parity presets it resolves 0 (a knot then
survives only on its own vertex), where no generated wall stands anyway (V11 §3.24.0).

**3.24.2 Raised ways** (item 110 (b): "at CITY and METROPOLIS the generator raises a way where there is a reason, each a
soft rule with a table chance and a count cap per rung", "A TOWN gets them only by declaration"; J-V11.41). *`raisedWays`* (registry row 80; readers: the base's generator — S4's route solve,
at generation and in each later stage's S5b, and S6's end —, V06 §3.19's epoch
pass, V01's seeds, fans and lanes crossing under an arch (`clearanceCm`, V01 §3.17.3 (3)), S8's under-deck strip
(`stripMarginM`, §4.6), V09's T4 dry run and aqueduct
tool, V04's vaults, V05's caster ceiling, V10's why, V12's register):

| rung · kind | chance | cap | pMax |
|---|---|---|---|
| CITY · viaduct | 0.6 | 1 | 0.9 |
| CITY · elevated | 1 (the band factor carries it) | 1 | 0.8 |
| CITY · aqueduct | 0.6 | 1 | 0.9 |
| METROPOLIS · viaduct | 0.7 | 2 | 0.9 |
| METROPOLIS · elevated | 1 | 2 | 0.8 |
| METROPOLIS · aqueduct | 0.7 | 2 | 0.9 |

* **The calibration minima.** The CITY and METROPOLIS `chance` columns carry the owner-stamped calibration minimum 0.02
  and the cap columns 1 (`ownerRule: '110 (b)'`, J-VI.10; stamped at V11 §3.2.1 step 4): no calibration run, fallback or
  corpus pack sets one lower (V12 §3.7.2 (5)); a user's edit may.
* **The rung gate is the schema's**, provenance `owner`: the key's `rung` enum is exactly `CITY | METROPOLIS`, so there is
  no row below CITY and no calibration, pack or `editTable` can make one; an edit adding a TOWN row is refused as F-EDIT
  naming the owner's rule, with the alternative "declare the raised way (T4 `road` with `raised`, or an aqueduct)" (item
  101 R2, R13). It is not a register cell (V12 §3.11).
* **`raisedWays.settings`**: `totalCap` CITY 2, METROPOLIS 4 (the caps are ceilings, never quotas); `viaduct.minDropM` 12 m;
  `viaduct.spanCostFactor` 4 (a metre of span priced as four ground metres against the detour); `viaduct.maxSpanM` 600 m;
  `viaduct.routeClasses` through, primary, secondary; `elevated.minRiseM` 8 m (the segment's lowest ground at least this
  below both ends); `elevated.maxSpanM` 600 m (the two anchors at most this apart; V06's name); `elevated.bandFactor` poor 0,
  modest 0.1, prosperous 0.3, rich 0.5 (read at the band holding the mean of the two ends' prosperity values);
  `elevated.landmarkFactor` 1.5 per dossier landmark on high ground at an end (the records DR35 lists, counted by V11 §3.24.7 (4)), `landmarkMax` 2; `elevated.landmarkMinSignificance` 20 (the least class significance, §10.2 and item 72, of
  a dossier-bound institution that counts — the castle's; provenance `own; V08 J-V8.70, the castle's significance`;
  calibratable, its entry V12 §3.11's `raisedWays` settings line);
  `elevated.highGroundM` 10 m (V11 §3.24.7 (4)); `aqueduct.sourceReachKm` 10; `aqueduct.needRatioMin` 1.0 (the ratio is V11 §3.24.6's);
  `aqueduct.minFallPerKm` 1 m (the intake stands at least this far above the terminal per kilometre of straight distance;
  V06's reading); `aqueduct.gradient` [0.0003, 0.003] (the laid channel's fall, 0.3–3 m per km — the course solver's
  bounds); `aqueduct.capPerSizeMember` 1; `aqueduct.terminal` fountain 0.5, basin 0.2, cistern 0.3. No cell scales the
  chance by the dossier's water record (J-V8.67): the record makes the need count as met (V11 §3.24.7 (3)).
* **The chance, stated once.** For each live candidate `p = min(pMax, chance[rung, kind] × F)`: a viaduct `F = 1` (the drop
  and the priced saving already gate it); an elevated road `F = bandFactor × landmarkFactor^n × culture.elevatedM` (`n` ≤
  `landmarkMax`); an aqueduct `F = era.aqueductM × culture.aqueductM`. The era factors are V11 §3.19.1's, the culture factors V11 §3.20.3's building block. The draw, its key (the
  reason key), the kind order and the cap counting are the reading stage's (the base's generator; V06 §3.19 (3)–(5)).
* **`raisedWays.structure`** (the heights V05's caster ceiling and V04's vaults read; `pierSpacingM`, `pierWidthShare` and
  `pierMinCm` are file f item 244's support step's pitch and footprint, `clearanceCm` its clearance rule's, and `maxPierM` and
  `maxClearSpanM` drop a generated course there; J-VI.27): `clearanceCm` cart
  450, foot 250 (the least soffit over a crossed part-0 way, by whether that way's class carries carts, V11 §3.24.5);
  `parapetCm` 100; `channelWallCm` 60 (an aqueduct channel's walls above its deck); `channelCm` [60, 120] and `deckExtraCm`
  100 (an aqueduct's width: the channel plus 50 cm each side — the `ways.widths` row of the `aqueduct` way class, registry
  row 3); `maxPierM` viaduct 45, elevated 12, aqueduct 35 (a course needing a taller pier drops, reported
  `raised_too_tall`); `pierSpacingM` masonry 8–15, timber 4–8; `pierWidthShare` 0.2 of the span, `pierMinCm` 150; `maxClearSpanM` masonry 30, timber 20 (§2.7's
  clear-span bound: the longest merged clear span a crossed river or square leaves; range masonry [15, 75], timber
  [8, 40]; `own`, `extension`, calibratable, its entry V12 §3.11's `raisedWays.structure` line; an edit below a slid span's
  reach is clamped, T-V11-32 (h); J-V11.116);
  `stripMarginM` 1 m (the under-deck strip's margin each side of the deck's ground projection over its piers and spans —
  §4.6 S8's hole, V01 §3.17.3 (2)'s strip, V06 §3.19's clearance; range [0, 3] m; `own`, `extension`, calibratable, its entry
  V12 §3.11's `raisedWays.structure` line; shipped with item 110's rows at M3a);
  `material` by band — poor timber 0.5, rubble 0.5; modest rubble 0.7, brick 0.2, timber 0.1; prosperous rubble 0.4, ashlar
  0.4, brick 0.2; rich ashlar 0.7, brick 0.3 — an aqueduct never timber (a timber channel leaks; its timber weight is
  renormalised away). The deck's level is the course's (the viaduct's grade across the gap, the elevated road's ends and
  ramps, the aqueduct's gradient line from its intake); these cells bound it, never set it.
* **The span rule's cells** (`raisedWays.structure.span` and `.slideMaxFactor`;
  J-V11.96). The span rule's constants (file f item 244; J-V4.93) are cells of this row under these names: `raised.vaultShare[kind]` =
  `span.vaultShare[kind]`, `raised.vault.maxHeightCm` = `span.maxHeightCm`, `minHeadroomCm` = `span.minHeadroomCm`,
  `maxFallCm` = `span.maxFallCm`, `raised.vaultCap[rung]` = `span.vaultCap[rung]` (all six rungs, the village rungs
  included — a declared raised way stands at any rung; a field of the named row, so the rung gate of the keyed rows is
  untouched), `raised.deckDepthCm` = `span.deckDepthCm`, `raised.supportFoundationCm` = `span.supportFoundationCm`; file f
  item 244's support-step slide bound is `slideMaxFactor`. Their values, stated here once (the base and V04 cite the cells): `span.vaultShare` viaduct 0.6,
  elevated 0.7, aqueduct 0.15; `span.maxHeightCm` 900; `span.minHeadroomCm` 250; `span.maxFallCm` 150; `span.vaultCap`
  THORP, HAMLET and VILLAGE 10 each, TOWN 40, CITY 120, METROPOLIS 240; `span.deckDepthCm` 150;
  `span.supportFoundationCm` 400; `slideMaxFactor` 1.5 — written into this row's source by the seat landing item 244's
  span rule at M3a (V04 §8); each is `own`, `extension` and `calibratable: true`, its register entry V12's span-rule line (the `span` block, owner V04) or the
  `raisedWays.structure` line (`slideMaxFactor`). The span rule scales `span.vaultShare` by `era.raisedVaultM ×
  culture.raisedVaultM`. Readers: the base's support step and span rule, run with the raised-way
  generator (S4, S5b, S6, EVO_RAISED) and by a declared or drawn way's operator; `foundationObstacles` (V04 §3.5.0,
  `supportFoundationCm`), derived where U-SYS, U-CITY, U-FADE and U-DIG's cost (under U-ACCESS and U-LINK) read it; V04's
  arch vaults (U-SYS, U-FADE). The name map is T-V11-1 (a)'s list.
* **The aqueduct is the way class `aqueduct`** (V09's `WayClass` addition, applied by the coherence pass; item 110 (b)'s
  "a raised water channel of the same kind"). No roster class stands for it (J-V11.51); its crossing row is V11 §3.24.5's,
  its width row above. **The terminal kind** is drawn from `aqueduct.terminal` on the generator's stream keyed by the way's
  lineage: a `fountain` or a `basin` is a model pin, one centrepiece per square; a `cistern` binds
  ONE `conduit_house` roster member through V11 §3.24.7 (1)'s criteria row, or, when the roster holds none, falls to a
  fountain pin, reported `aqueduct_terminal_pin`, so the roster's counts never move for an aqueduct. A dossier-bound
  `conduit_house` forces `cistern`. V04's terminal cistern (V04 §3.5.4 (e)) lies under that building's yard.
* **`says`** (the clerk's and the siting panel's sentences, id `rw/<kind>`): viaduct — "carried over the {feature} on arches:
  the drop is {d} m and going round was {x} m longer"; elevated — "a raised road between {a} and {b} over the lower
  {district}"; aqueduct — "brings water from {source}: the wells and cisterns inside the walls fall short".

**3.24.3 Stepped massing — the culture specialisations** (item 110 (c): "through composition rows (volume 2) and class rows
(volume 11)"; J-V11.42, J-V11.43). *`roster.specialisations`* (registry row 84; readers: S11's draw, V02's
resolution chain, V03's plan rows, V07 §2.4's village cap, V08's DR15 trace, V10's why, V12's register; the practice:
Mesoamerican temple platforms and pyramids, South Asian terraced palaces and temple towers, East Asian tiered towers and
palace platforms):

| culture | class | specialisation | composition (V02 §3.15.4) | heights | chance |
|---|---|---|---|---|---|
| mesoamerican | `great_temple`, `cathedral` | stepped_temple | stepped-temple | `stepped-shrine` | 0.95 |
| mesoamerican | `church` | stepped_temple | stepped-temple | `stepped-shrine` | 0.6 |
| mesoamerican | `palace` | terraced_palace | terraced-palace | — (the template's `castle`) | 0.5 |
| south_asian | `great_temple`, `cathedral` | stepped_temple | stepped-temple | `stepped-shrine` | 0.3 |
| south_asian | `palace` | terraced_palace | terraced-palace | — | 0.4 |
| south_asian | `tower_house`, `mage_tower` | tiered_tower | tiered-tower | — (the template's `tower`) | 0.2 |
| east_asian | `tower_house`, `mage_tower`, `watchtower` | tiered_tower | tiered-tower | — | 0.5 |
| east_asian | `palace` | terraced_palace | terraced-palace | — | 0.3 |

Every row has `capShare` 0.001 and `capMin` 1. No other culture has a row, so no default Western town ever
builds in tiers (J-V2.63; T-V11-32 (e)); a pack's culture may add rows.
* **The draw and the cap are §4.7 S11's** (file f item 259; V02 §3.2): the draw once per use, at its first building, before
  V02 §3.2's resolution; its stream and key; the chance test; the cap's formula, counted in roster sequence order so it
  stays prefix-stable (§10.2); `Use.specialisation` and the replacement of the band template's `composition` and
  `heights`; and the exemption of a user-set (`setAttr`, §7.1), declared (`siting.declared`'s `specialisation`, V11 §4.2)
  or keyword (V11 §3.13.2) specialisation. This table supplies the row the draw reads — the first row of the use's culture
  and class (a class has at most one row per culture), with its `chance`, `capShare` and `capMin` — and, at village rungs,
  the cap through V07's `rules.tiers.capPerSettlement`, per settlement (V07 §2.4). An exempt use is held (item 101 R13)
  and not counted toward the cap, so a declared stepped temple stands in any town of any culture (the second known-city
  fixture's stepped temple is made so).
* **The carriers** (V03's keys): `stepped_temple` by `great_temple`, `cathedral` and `church` (and
  `generic-worship` by keyword or declaration only); `terraced_palace` by `palace`; `tiered_tower` by `tower_house`,
  `mage_tower` and `watchtower`. V03 keys its programme rows `for.use` by the specialisation id with `for.cls: '*'`.
* **At village rungs** a row applies to the village class that plays its `cls` (V11 §3.22: `church` →
  `v.parish_church`, `tower_house` → `v.manor_house`, `watchtower` → `v.watchtower`; a `cls` with no village form reaches
  no village class), so V07 §2.4's eligible classes are exactly those three; the cap is V07's
  `rules.tiers.capPerSettlement` (1), counted per settlement, never per row; the chance is the row's, which V07 §2.4's
  culture cells leave as it is (the European cultures have no row).
* **The heights.** V11 §3.6.4's row `stepped-shrine` (a shrine on a platform is a few metres, never a 20 m nave;
  J-V11.43). A stepped building's crypt, where its class has one, follows V02's crypt ladder under tier 0 (V02 §3.15).
* **The dossier trace.** `site.culture` → these rows (V08 DR15); the port supplies no religion that builds in
  tiers, so the culture is the only input.
* **V04's monument cells** are V11 §3.23.4's `monument` column.

**3.24.4 Decks, the `deckOk` column and the landmark slots** (item 110 (d): "frontage plots with a `deck` size budget
(small, light, a table row), towers and forts at mole heads and mid-mole as placed landmarks";
J-V11.44, J-V11.46). *`deck`* (registry row 82; readers: the base's deck-plot cutter at S10, V02 M10/M11's
`DeckBudgetRead`, V06 §3.19.5, V07's village widths, V09's badges, V12):

| kind | offer TOWN · CITY · METROPOLIS | footprint m² poor / modest / prosperous / rich | max floors p / m / pr / r | frontage m | min plot depth m | fill | sides | end clear m |
|---|---|---|---|---|---|---|---|---|
| bridge | 0.15 · 0.35 · 0.5 | 15–30 / 20–40 / 25–50 / 30–60 | 2 / 2 / 2 / 3 | 3–6 | 3 | 0.8 | both | 6 |
| pier | 0.1 · 0.2 · 0.3 | 10–20 / 12–25 / 15–30 / 15–35 | 1 / 1 / 1 / 2 | 3–5 | 2.5 | 0.3 | both | 4 |
| mole | 0.3 · 0.5 · 0.6 | 15–30 / 20–40 / 25–50 / 30–60 | 1 / 2 / 2 / 2 | 4–7 | 3 | 0.4 | harbourSide | 15 |
| quay | 1 · 1 · 1 | 20–40 / 30–60 / 40–80 / 50–100 | 2 / 2 / 3 / 3 | 4–8 | 4 | 0.6 | landward | 5 |

The offer is drawn once per deck by the cutter, keyed by the deck's lineage; village rungs read V07's cells (J-V7.41). A
plot's `says`: "on the {deck}: at most {n} storeys, about {a} m²" (id `deck/<kind>/<band>`).

*`deckOk`* (a compiled column of `roster.classes`, step 5a; file f item 432; listed in the manifest; a class row may
override). A class is ELIGIBLE only when all hold: its template family is `shopfront`, `workshop-row`, `tavern-row`,
`dwelling-row`, `chapel` or `watch-house`; its compiled profile emits no `fire` ≥ 2 and no `smell` 3 (a timber deck and a
crowded way); its balance is not `heavy`; it is not `outside`; its `crypt` is not `always`. Eligible trades and shops take
`[bridge, mole, quay]`; `row_house`, `house` and `lodging_house` `[bridge, quay]`; `chapel` `[bridge]` (the bridge chapel);
`toll_house` `[bridge]` (a bridge gatehouse); `guard_post` `[bridge, mole]`. Explicit rows:
`fishmonger` and `ship_chandlery` `[pier, mole, quay]`; `fish_landing` `[pier, quay]`; `harbour_master` and
`customs_house` `[quay]`. The landmark-slot classes take their slots only: `fort` `[mole, bridge]`, `lighthouse` `[mole]`,
`watchtower` `[mole, bridge]` — `DeckContext.landmark` only. Compile bar T-V11-32 (c): no class whose `crypt` is `always`
or whose profile emits `fire` ≥ 2 carries a deck kind (V02 X16; J-V2.68). **Per use** (V02 X16): S10b
reads `deckOk` per use — `[]` when the use's effective crypt is `always` (its class `always`, a dossier crypt record bound
to it, V08 DR32, or a keyword row `binds: 'cryptAlways'`, V11 §3.13.2), else its class's compiled column — so a bridge
chapel carrying a crypt record stands on land with its crypt, and V09's T6 landward bend sends a hand placement there. A
class not admitted: `says` "a {class} can't stand on a {deck}" (id `deckok/<class>`). V07's village rows (`v.<id>`, V11
§2.9) carry their own cells at village rungs.

*`deck.landmarks`* (registry row 83; one claimant per slot; the draws are the cutter's, keyed by the slot's deck lineage;
a declared or stamped class is held and exempt from the chance):

| slot | claimants, in order |
|---|---|
| `moleHead` | at a WALLED port, item 106 (e)'s harbour-mouth chain tower holds it (wall furniture, never a building); a `fort` replaces it as the chain's anchor on that head at chance 0.5 at CITY and METROPOLIS when V11 §3.16.2's matched threat is `naval` or `raider`. At an UNWALLED port: a `lighthouse` on a sea-facing mole (CITY 0.3, METROPOLIS 0.5), else a `watchtower` (0.2 at every rung) |
| `midMole` | a `watchtower`: TOWN 0.1, CITY 0.2, METROPOLIS 0.3 |
| `bridgeMid` (span ≥ `minSpanM` 40 m — file f item 246's slot; this cell is the constant's one home, V09 §4.20 cites it) | a `fort` at 0.05 at CITY and above, on a bridge outside the enceinte on a through route; otherwise by declaration only (J78's bridge fortress) |
| `islet` | a `lighthouse` at 0.6 where a causeway or mole reaches a sea islet |

The two new classes (`fort`, `lighthouse`) are V11 §3.5.7's and V11 §3.5.9's rows; the `deck` material key is V11 §3.19.3's.

**3.24.5 The way-class crossing rule** (item 110 (a): "a stair or a ramp by its slope (a way-class rule, never a gap in the
wall)"; (b): "its two ends are ramps or stairs joined to ground vertices"; J-V11.47). *`ways.crossing`*
(registry row 81; readers: the way builders where a way crosses a `RetainingWall` — S4, S5, S9 and V01's lanes and seeds (S8, S8.seed) — the
raised ways' ends (S4's and each later stage's S5b's viaducts, S6's end and V06 §3.19's pass), the stair-stepped way's
naming context and step ticks (S13a, S14; V01 §3.6 (3)), V09's T4 ghosts):

| class | carts | rampMaxGrade | switchback | stair (riser cm · tread cm · landing every cm · landing m) |
|---|---|---|---|---|
| `through` | yes | 0.08 | yes | — |
| `primary`, `secondary` | yes | 0.10 | yes | — |
| `track` | yes | 0.12 | yes | — |
| `lane`, `alley`, `cul_de_sac` | no | 0.12 | no | 15 · 38 · 180 · 1.2 |
| `path` | no | 0.15 | no | 16 · 35 · 200 · 1.0 |
| `quay`, `pier`, `bridge`, `ford` | — | — | — | — (never cross a retaining wall; a bridge's approach ramps read `primary`'s row) |
| `aqueduct` | — | — | — | — (never a stair or a ramp: its channel keeps its gradient, buried or arched) |

* **The rule.** A crossing is a ramp when the step over the run available is at most `rampMaxGrade`, or when a switchback
  fits within `minTerraceDepthM` (V11 §3.24.1); otherwise a stair when the class has one.
* **The pre-decided failure for a cart class.** The ramp takes up to 1.5 × `rampMaxGrade`, reported `W_STEEP_RAMP` — never a
  stair and never a gap in the wall (the owner's words).
* **Beyond 1.5 × `rampMaxGrade`** (V11 §3.26's row EI-V11-EDGE-1; a 4 m step across a `through` way with a short run): the levelling
  repairs locally (§5's rung 2) — it re-cuts the two levelling units the way separates so that the step where the way
  crosses falls within the steep ramp's reach, the high unit's datum lowered along the way's corridor and the difference
  carried by the base's plinths and skirts at the buildings (reported `W_STEP_RECUT`); where no re-cut within `stepMinCm` to
  `stepMaxCm` on both sides reaches it, the units are not levelled at that crossing — the base's skirts and stepped wings
  carry the fall and no retaining wall stands across the way (§5's rung 5, leave out and report, `W_UNLEVELLED_AT_WAY`).
  Never a stair on a cart class, never a gap in a standing wall, never a whole-map retry. The bar is T-V11-45 (b).
* Street stairs are shallower than a building's; V02's building stair constants stay V02's and are never read for streets.
  T-V11-32 (f): the table covers every `WayClass`. The `says` (id `cross/<class>`): "a stair here: the terrace wall is {h}
  m and this lane carries no carts" or "a ramp at {g} %".

**3.24.6 The water need** (item 110 (b): "where the city's water need exceeds what its wells, river and cisterns supply
inside the walls"; J-V11.45). *`water`* (registry row 85; one row; readers: the aqueduct reason — the base's S6
test and V06 §3.19's pass — and V09's uphill-aqueduct bend to a well, J-VI.4 (h)). The balance reads only eager inputs, since the reason is
decided before any well, cistern or household is placed:
* **Demand** `D = pop_in × farShare × perHeadL ÷ 1000` (m³ a day): `pop_in` S2's population inside the enceinte; `farShare`
  S6's density-weighted share of the intramural area lying beyond the base's `cisternDistM` (II.7.6's row, read, never
  restated) from a river or lake face, since frontage serves the rest; `perHeadL` 20.
* **Supply** `S = walledHa × wellsPerHa(geology) × wellYieldM3 + walledHa × 10 000 × roofShare × captureShare(biome) ×
  rainMm ÷ 1000 ÷ 365`: `wellsPerHa` by S1's geology row — alluvial 1.0, default 0.6, soluble 0.3, volcanic 0.3;
  `wellYieldM3` 4 m³ a day; `roofShare` 0.4; `captureShare` arid 0.3, maritime 0.1, every other biome 0.05 (cistern towns
  of dry climates); `rainMm` the climate row's `rainMmPerYear` (V11 §3.17.1).
* **The ratio** `needRatio = D ÷ S` (`S = 0` counts as unmet, and the candidate lives); an aqueduct is a candidate when
  `needRatio > aqueduct.needRatioMin` and an intake lies within `sourceReachKm` (else `aqueduct_no_source`, reported). The
  standing aqueducts' deliveries join `S` at an epoch (V06 §3.19 (3)).
* **Worked check** (PLAUSIBLE; T-V11-33's bench measures it). A temperate alluvial CITY of 15 000 in 100 ha, far share 0.6: D 180, S 240 +
  41, ratio 0.64 — no aqueduct. An arid METROPOLIS of 60 000 in 300 ha, far share 0.7: D 840, S 360 + 197, ratio 1.5 — a
  candidate. The rule favours dry, karst and large cities, as the historical pattern does.
* **Pre-decided fallback** (V12's register; T-V11-33's bench): if the share of arid METROPOLIS seeds with an aqueduct
  candidate is below 0.5, or the share of temperate alluvial CITY seeds with one is above 0.2, `perHeadL` moves by 5 litres
  once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements.

**3.24.7 The dossier's reach into item 110** (items 20, 20 (h); J-V11.48):
1. **The aqueduct terminal.** V11 §3.3.3's feature class `raised:terminal` is the distance to the terminal point of a
   generated or declared aqueduct. The binding is never a class row (a hard class row would exclude every plot of a town
   with no aqueduct and pull every conduit house to one point): the aqueduct's generator (the base's) writes ONE §7.7
   `PlacementCriteria` row, id `pc/aqueduct/<way lineage>`, "`near` → `raised:terminal` within 0, hard", on exactly one
   `conduit_house` roster member — the dossier-bound one when a record binds one, else the first
   unplaced member in roster sequence — when the terminal kind is `cistern` and the roster or the dossier holds a
   `conduit_house` (J-VI.9); otherwise the terminal is a fountain pin (V11 §3.24.2). File f item 401 adds the generator as
   a writer of `PlacementCriteria` for this row only. Every other conduit house keeps its class row, and no class row
   carries a hard terminal row.
2. **The toll bridge.** `dossier.kinds` gains the optional cell `implies` (V08's shape); the row `toll_bridge`
   carries `implies: 'bridge'` (V11 §3.11). The `toll_house` class rows try "`near` → bridge within 30, hard" first when the
   settlement has a bridge, else "`nearGate` within 30, hard" (V11 §3.5.6): one physical need, tried in order, never two
   equal-weight rows.
3. **The dossier's water system.** At CITY and METROPOLIS, when `aqueduct_or_water_system` (or its SIZE greater
   `advanced_water_infrastructure`, V11 §3.12) is present: (a) the need test counts as met; (b) the
   chance takes no factor from the record — it stands at chance 1 on every SettlementForge city, so a factor would be one
   constant (J-V8.67); (c) each SIZE member raises the aqueduct cap and `totalCap`
   by `capPerSizeMember`; (d) the bound `conduit_house` is the terminal and the terminal kind is forced to
   `cistern`. The record never forces arches: the source-in-reach condition and `pMax` hold, and a miss is reported
   `aqueduct_no_source`. At TOWN the record never raises arches (item 110 (b)); its conduit house stands.
4. **Landmarks on high ground.** The records that count are DR35's: the dossier-bound
   institutions whose class significance is at least `elevated.landmarkMinSignificance` (20, the castle's; V11 §3.24.2), and the custom records at `landmarkLevel` `landmark`, read at their S3 reservations and cited, never restated; a reservation is on high ground when its mean ground stands at least
   `elevated.highGroundM` (10 m) above the median ground of the intramural area; at most `landmarkMax` (2) count per road;
   landmark strings never count.
5. **The culture.** `site.culture` → V11 §3.20.3's `building` block and V11 §3.24.3's rows.
=== END ===

=== REPLACE ### 3.25 The rows of the owner's rules of 29 September to 1 October (items 111, 113–119, 122–124) ===
### 3.25 The rows of the owner's rules of 29 September to 1 October (items 111, 113–119, 122–124)

Each subsection writes the rows an item names for this volume (the canon's routing; J127–J130, J135–J138). The mechanisms are the
base's and the owning volumes', cited; the types are V11 §2.8 and V11 §2.8d's, and §10.2's for item 115's ceiling and
item 122's crisis tables; the switches and off forms are V11 §3.24.0's; the registry rows are V11 §3.1's (43, 44, 92–110). Every cell is our own (`own`, the practice in its note,
general historical knowledge where it leans on one) and calibratable unless marked, its register entry V12 §3.11's.

**3.25.1 Water in dry country** (item 111; the climate rows' `dry` cells, registry row 43; the `garden` land use, row 44,
V11 §3.17.2). The mechanisms are §4.2 S0 and S1 (the water chances, the oasis and its site), S3 (6) and §4.4 (the water
pull on the growth field), §4.5 (the water term; item 102's sun cell), §4.7 S10b (the wells) and §4.9 (the grove and the
gardens):

| biome | aridity | water chances (river · lake · coast) | oasis chance · no-other-water factor · area ha | grove (species share) · band m | channel reach m · garden area × oasis | water pull `w_water` · pull radius m | water term `w_waterP` | sun cell | well-yield weight · well-coverage factor |
|---|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous` | 0.2 | the feature table's | 0 | — | — | 0.1 · 300 | 0.05 | 1 | 0.2 · 1.0 |
| `temperate-coniferous` | 0.15 | the feature table's | 0 | — | — | 0.08 · 300 | 0.05 | 1 | 0.2 · 1.0 |
| `mixed` | 0.2 | the feature table's | 0 | — | — | 0.1 · 300 | 0.05 | 1 | 0.2 · 1.0 |
| `maritime` | 0.05 | the feature table's | 0 | — | — | 0.03 · 250 | 0.02 | 1 | 0.1 · 1.0 |
| `arid` | 0.9 | the feature table's (the row's own chances when a pack or a calibration sets them) | 0.35 · 2.0 (the product capped at 0.9) · 0.3–3 | palm 0.6, olive 0.3, cypress 0.1 · 25 | 150 · 3 | 0.6 · 600 | 0.5 | −0.5 | 1.0 · 0.6 |
| `cold` | 0.3 | the feature table's | 0 | — | — | 0.1 · 300 | 0.05 | 1 | 0.2 · 1.0 |

* **Arid** is a row whose `aridity` is at least the table's named row `settings`' `aridMin` 0.6 — by default the `arid`
  biome alone. A non-arid row's oasis chance is 0 by rule (the base reads P(oasis) only on an arid row); a dossier's
  `oasis_water` makes an oasis on any row (item 20; DR1).
* **The water chances** stay the feature table's per-rung P(river), P(lake), P(coast) on every row: an arid site keeps
  every water a site can have (the owner: "some desert areas to have access to a lake or river or coast"), and the pin
  holds without them; a cell set on the arid row replaces the feature table's chance there.
* **The sun cell** multiplies item 102's `w_sun` (V11 §3.3.5): 1 in the temperate and cold rows (item 102 exactly as
  filed — `w_sun` 0.02 effective), −0.5 in the arid row (the shaded ground valued; the water term carries the pull there;
  item 111 (c), kept by J122).
* **The wells** (§4.7 S10b): the well and public-fountain classes score `wellYieldWeight` × the plot's well yield
  (S1 (10)'s raster, read through `water.wellsPerHa` and `wellYieldM3`, V11 §3.24.6), and their walking-coverage radius (the
  `water-supply` family's 150 m, V11 §3.4) is × `wellCoverageFactor`.
* **`says`** (ids `clim/<biome>/<cell>`, `drv/water`): the pull — "this town leans toward its water: in {biome} country the
  river, the springs and the best wells decide where people live"; the water term — "the well-to-do hold the ground
  nearest the water and its gardens"; the oasis — "an oasis: a spring-fed pool in its hollow, the grove and the gardens
  around it"; the sun cell in an arid row — "in hot, dry country shade, not sun, is prized".
* **Off form** (V11 §3.24.0): oasis chance 0, pull 0, water term 0, sun cell 1, well-yield weight 0, well-coverage
  factor 1 — byte-identical to the base without item 111 (item 111 (d)'s pin; T-V11-38 (b)).

**3.25.2 History at generation** (item 113; `history`, registry row 93, and `history.events`, row 94; the mechanism is
§4.11 *History-first generation*, §7.7's DR36–DR39 and V06 §3.20's replay).

*`history`* (the one row `settings`):

| cell | value | range | what it does |
|---|---|---|---|
| `replay` | true (the parity presets false) | switch, not calibratable | a known history (the dossier's, V08; the blueprint's option, §4.2 S0) is replayed at generation; false: the one-click path |
| `epochYears` | 10 (the owner's "decades") | [5, 50] yr | a coarse replay epoch's length (V06 §3.20.1 (3)); V06 §3.20.4 coarsens it to the budget |
| `symbolicQuantile` | 0.25 (the range's lower quartile, item 113 (f)) | [0, 1] | where in the peak tier's population range a symbolic peak is sized (§1.1's rung table) |
| `burialYears` | 100 (the owner's "a century") | [30, 400] yr | the default age past which a former fabric is buried (item 113 (c)) |
| `burial.floodFactor` · `floodMaxCount` | 0.8 · 3 | (0, 1] · integer [0, 5] | × per flood-effect event of the history after the fabric's ruin, at most this many |
| `burial.siltFactor` | 0.7 | (0, 1] | the fabric's centroid on alluvial ground (S1 (10)'s ground class) — river silt |
| `burial.rebuiltFactor` · `rebuiltCoverMin` | 0.75 · 0.5 | (0, 1] · [0, 1] | the fabric's footprint at least this share covered by the later settlement's built plots — rebuilding on top |
| `burial.bareRockFactor` · `bareRockStoneMin` | 2.0 · 0.7 | [1, 4] · [0, 1] | the fabric's centroid where `SiteResources.stone` reaches this (§4.2 S1 (10)) — bare rock |
| `burial.minYears` · `maxYears` | 30 · 400 | yr | the clamp of the factored value |
| `reuseCost` | 0.5 | (0, 1] | × a lattice edge's cost on a ruined way's trace at refounding (§4.4's `existingFabricCost`; item 113 (b)) |

**The factored burial age** of a former fabric `f` (DR39; read by V06 §3.20.5 (4) and V04 §3.5.5 (b)):
`T(f) = clamp(burialYears × floodFactor^min(n_flood, floodMaxCount) × (silt ? siltFactor : 1) × (rebuilt ? rebuiltFactor : 1)
× (bareRock ? bareRockFactor : 1), minYears, maxYears)`, each condition read on the replay epoch's committed state; V04's
depth factor is `burialYears ÷ T(f)`. A fabric that meets none of the conditions is buried at `burialYears`.

*`history.events`* (V06 §2.14's `HistoryEventRow`, one row per neutral event key of V08 §2.6's `historyEvents` row set —
the key is the row's `type` — plus `none`; the effect scaled linearly between `severityScale`'s ends by the event's
severity; for `destroy` the scale's first end is the threshold at or above which the event destroys, below it recorded
only):

| type | effect | detail | severityScale | `says` (id `hist/<type>`) |
|---|---|---|---|---|
| `fire` | hazard | `fire` (V06 §2.4's hazard row) | [0.3, 1] | "a great fire burned {quarter} in {year}" |
| `flood` | hazard | `flood` | [0.3, 1] | "a great flood in {year} raised the ground" |
| `plague` | population | factor 0.7 | [0.5, 1.2] | "plague years emptied the edges" |
| `tradeCollapse` | population | factor 0.8 | [0.5, 1.2] | "trade failed and people left" |
| `crowding` | population | factor 1.15 | [0.5, 1.2] | "the town filled up" |
| `return` | population | factor 1.1 | [0.5, 1] | "the exiles came home" |
| `siege` | slice | `threat` 0.6 (raised to at least this, × the scale) | [0.5, 1] | "the threat of war came in {year}" |
| `occupation` | uses | `barracks` 0.5 per 1 000 households; `castle` 0.001 (one citadel at any size) | [0.5, 1] | "an occupation left its citadel" |
| `pilgrimage` | uses | `inn` 1.0 and `hospital` 0.2 per 1 000 households | [0.5, 1.5] | "pilgrims came and hostels were built" |
| `ancientFall` | destroy | the fallen place this settlement at its peak (V06 §3.20.5 (1)) | [0, 1] (always) | "the old town fell in {year}" |
| `disaster` | destroy | a catastrophic disaster | [0.85, 1] (V08's `catastrophic` 0.9 destroys; `major` 0.6 does not) | "a disaster destroyed the town in {year}" |
| `unrest`, `magical` | none | recorded only | [0, 1] | — |
| `none` | none | an unknown type (V06 reports `historyEventUnmapped`) | [0, 1] | — |

* **Off form** (V11 §3.24.0): `replay` false — byte-identical to the base without item 113 (T-V6-71's pin; T-V11-39 (b)).
* The history's age is V08's (`history.ageYears`) and the blueprint option's default age V09's (`history.defaultAgeYears`
  300, V09 §4.21.3); the replay's budget cells (`replay.*`) are V06's (V06 §2.2).

**3.25.3 Walls in decay and repair** (item 114; `walls.condition`, registry row 95, and `walls.patchMaterials`, row 96; the
mechanism is §2.7's `Enceinte.condition`, V06 §3.7.7's transitions and §7.7's DR41).

*`walls.condition`* (the one row `settings`; every chance per year and per V06 §3.7.2's stretch):

| cell | value | what it does |
|---|---|---|
| `atGeneration` | true (the parity presets false; a switch, not calibratable) | §7.7's DR41 gives each run its condition at generation from readiness and wealth (item 114 (d)) |
| `needReturnYears` | 5 yr | NEED `high` once the threat stays at or above `walls.threatMin` this long (V06 §3.7.7 (1)) |
| `meansLow` · `meansHigh` | 0.3 · 0.5 (the wealth level, [0, 1]) | MEANS `low` below the first, `high` at or above the second, each sustained over `meansWindowYears` |
| `meansWindowYears` | 20 yr | the window a MEANS class needs before it changes (no flicker at a threshold) |
| `localWeight` | 1.0 | λ = clamp(1 + localWeight × (P_town − P_run), 0.5, 1.5) |
| `wearChancePerYear` | 0.02 | a neglected ring's `standing` → `worn` (null: straight to `breached`, the rule before item 114) |
| `poorWearChancePerYear` · `poorBreachChancePerYear` | 0.01 · 0.004 | a ring in use under low means: `standing` → `worn`, `worn`/`patched` → `breached` (below neglect's `walls.breachChancePerYear` 0.01, V06's) |
| `bothLowFactor` | 1.5 | × the neglect chances when MEANS is also `low` |
| `rebuildRunsPerYear` | 0.5 | patched runs rebuilt robust per year with need and means, oldest first |

*The generation shares* (the cell `generation`, read by §7.7's DR41: the readiness band — V08's `readiness` row
set, standalone the band the threat gives by that row — by the MEANS class of the present wealth level against `meansLow`
and `meansHigh`; each row the shares of runs `standing` · `worn` · `patched` · `breached`, summing to 1; a `dismantled` run
stays as the history made it):

| readiness | means `low` | means `mid` | means `high` |
|---|---|---|---|
| `fortress` | 0.6 · 0.15 · 0.25 · 0 | 0.9 · 0.1 · 0 · 0 | 1 · 0 · 0 · 0 |
| `defended` | 0.45 · 0.25 · 0.25 · 0.05 | 0.75 · 0.2 · 0.05 · 0 | 0.9 · 0.1 · 0 · 0 |
| `light` | 0.3 · 0.3 · 0.25 · 0.15 | 0.55 · 0.3 · 0.1 · 0.05 | 0.7 · 0.3 · 0 · 0 |
| `vulnerable` | 0.15 · 0.3 · 0.25 · 0.3 | 0.3 · 0.35 · 0.1 · 0.25 | 0.4 · 0.4 · 0 · 0.2 |

The shares follow item 114 (c): patches only where need meets low means, none under high means (rebuilt robust), and a rich
place without fear wearing and breaching (a vulnerable, poor town shows patched and breached runs; a fortress in a rich
city stands whole).

*`walls.patchMaterials`* (key `wallKind/id`; the draw is by `weight` among the rows admitted for the enceinte's kind and
culture, V06 §3.7.7 (3); `material` a V11 §3.19.3 key for salvage, decline and Works; `look` the §8.2 patch line-style role
that draws it apart from the robust wall, pattern and not colour alone, item 112; `label` the Material chip's words,
V09 §4.21.4; `calibratable: false` on `label` and `look`):

| wallKind | id | label | cultures | weight | material | look |
|---|---|---|---|---|---|---|
| masonry (`citadel`, `inner`, `outer`, `suburb`, `bailey`) | `timber_hoarding` | "Patch with timber" | every | 0.35 | `timber` | `patch.timber` |
| masonry | `wattle_fence` | "Patch with wattle" | every | 0.2 | `wattle_daub` | `patch.wattle` |
| masonry | `earth_bank` | "Patch with an earth bank" | every | 0.2 | `earth_bank` | `patch.earth` |
| masonry | `dry_stone_infill` | "Patch with dry stone" | every | 0.25 | `dry_stone` | `patch.drystone` |
| masonry | `mudbrick_infill` | "Patch with mud brick" | `arabic`, `south_asian`, `mesoamerican` | 0.4 | `cob` | `patch.earth` |
| `palisade` | `odd_stakes` | "Patch with odd stakes" | every | 0.5 | `timber` | `patch.stakes` |
| `palisade` | `hurdles` | "Patch with hurdles" | every | 0.3 | `wattle_daub` | `patch.wattle` |
| `palisade` | `brush` | "Patch with brush" | every | 0.2 | `wattle_daub` | `patch.brush` |
| `earthwork` | `brush_and_turf` | "Patch with brush and turf" | every | 0.6 | `earth_bank` | `patch.earth` |
| `earthwork` | `hurdles` | "Patch with hurdles" | every | 0.4 | `wattle_daub` | `patch.wattle` |

* **`says`** (ids `wall/<cell>`, `patch/<id>`): "patched with {label words} in the lean years"; "rebuilt in {material} when
  the threat came back with the money to meet it"; "left to wear: no one feared an attack".
* **Off form** (V11 §3.24.0): `atGeneration` false, `meansLow` 0, `wearChancePerYear` null, `needReturnYears` 0 — the
  neglect and repair rules before item 114, every run `standing` at generation (V06's T-V6-73; T-V11-40 (b)).

**3.25.4 The grandeur ceiling** (item 115; `grandeur.ceiling`, registry row 97; the table's shape §10.2 as item 115 homes
it; read by §4.7 S10b's rung ceiling on the class mix, V02's composition chain, V06 §3.8.5, V07 §3.8 and, for its `settings`
row, V08 §3.16 (3)):

| rung | dwelling families (V02's composition families) | towers · turrets · gatehouse · courts on a dwelling | manor: at most · requires | S10b's "all manors" rich row |
|---|---|---|---|---|
| THORP | `single`, `L`, `T` | no · no · no · no | 0 · specified | no |
| HAMLET | `single`, `L`, `T` | no · no · no · no | 0 · specified | no |
| VILLAGE | `single`, `L`, `T` (the manor alone takes the grand arrangements) | no · no · no · no | 1 · a lord (a `seigneurial` government) or specified | no |
| TOWN, CITY, METROPOLIS | all | yes | unbounded · none | yes |

* The THORP, HAMLET and VILLAGE rows are the owner's rule (provenance `owner`, stamped `ownerRule: '115 (b)'`, V11 §3.2.1
  step 4); every row `calibratable: false` (the THORP, HAMLET and VILLAGE rows the owner's rule; the TOWN – METROPOLIS row
  the base's behaviour, an enumeration); every row's `enabled` is true, false its off form.
* **The `settings` row** (§10.2's `GrandeurCeilingSettings`): `grandClasses` `manor`, `tower_house`, `castle`, `palace`
  and V07's `v.manor_house` — the lord's and the ruler's houses, whose dossier-bound record specifies a grand building
  (V08 §3.16 (3) (a), read by `port.digest`); `own`, `calibratable: false`, each entry a live class key (T-V11-41 (a);
  J-V11.114).
* **"Specified"** is V08 §3.16 (3)'s reading, which reads the `settings` row above; a
  specified or hand-made grand building keeps its full design — the ceiling is a default, never a
  refusal (item 101 R2) — and the shell and the clerk say it exceeds the tier's usual (V09 §4.21.5's `info.grand.beyondTier`
  and `info.grand.dossier`; V10).
* **Wealth** moves a dwelling along its capped row only (item 115 (d)); the manor count never rises with wealth.
* **`says`** (id `ceil/<rung>`): "small places show wealth in their houses' size and finish, never in towers or courts".
* **Off form** (V11 §3.24.0): `enabled` false on every row — every rung reads TOWN's row, byte-identical to the base
  without item 115 (V06's T-V6-74; T-V11-41 (b)); at TOWN and above the table changes nothing (item 115 (f)'s pin).

**3.25.5 The zoom-out limit's margin** (item 116; the base settings row, registry row 92): `view.zoomOutMarginStops` 1 —
the stops of margin §8.8's per-map limit adds beyond the stop at which the map's whole `bounds` fits the viewport's short
side (item 116 (a)); integer, range [0, 3], provenance `owner` (item 116), `calibratable: false` (a view cell; no model
reads it). Its readers are row 92's: §8.8's pyramid and view (no tile past the limit), §9.5's framing, §11's export frames
(the whole bounds at most), V07 §5.2's township view (the limit's view less this margin) and V09's view controls. The
bars are item 116 (e)'s (§13.2), V07's and V09's; T-V11-44 (a) holds the cell.

**3.25.6 Seasons** (item 117: a LOOK only — no season moves, adds or removes anything, and no cell here is read by a model
stage, so the document hashes identically in every week; the climate rows' `seasons` cells, registry row 43, and
`season.surfaces`, `season.water`, `season.leaf`, `season.cover`, rows 98–101; drawn by §8.2's season, cover, `ice` and
`snow` rows, named by §11's exports, explained by V10). **Weeks** are 0–51 from the first week of spring
(SettlementForge's grid: spring 0–12, summer 13–25, autumn 26–38, winter 39–51); the named seasons are picks of their
middle weeks (6, 19, 32, 45; midsummer 19, the standalone default); a band `a–b` includes both ends and wraps the year's
end when `a > b`.

*The climate rows' season cells:*

| biome | winter | leaf colour | leaf fall | blossom | growing | harvest | hay | ice | snow |
|---|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous` | cold | 28–35 | 31–37 | 3–7 | 0–25 | 22–30 | 14–18 | 41–1 | 43–0 |
| `temperate-coniferous` | cold | 27–33 | 29–35 | 5–9 | 2–24 | 21–28 | 15–19 | 40–3 | 41–2 |
| `mixed` | cold | 27–34 | 30–36 | 4–8 | 1–24 | 22–29 | 15–19 | 40–2 | 42–1 |
| `maritime` | mild | 30–36 | 33–38 | 4–8 | 0–27 | 23–31 | 15–20 | 45–49 | — |
| `arid` | none | 36–41 | 38–44 | 50–3 | 39–10 (winter-sown, irrigated) | 8–14 | — | — | — |
| `cold` | severe | 26–31 | 28–33 | 8–11 | 5–23 | 19–26 | 17–21 | 35–6 | 34–8 |

Arid and warm climates never freeze and draw no snow — lying or falling, whatever the view's `weather` holds (§8.2;
item 124 (c); V11 §3.25.11's hard rules); `snow` weather
defaults on in the snow weeks of a `cold` or `severe` climate (item 117 (g)); the view sun's default height by week is
§8.2's (item 102's model daylight never changes).

*`season.water`* (item 117 (e): still water freezes first, flowing water last; a water kind freezes from `ice.start +
lagWk` to `ice.end − lagWk` in a climate whose winter is at least `freezesFrom`, and not at all when that span is empty;
open leads at a river's fast current, weirs, mill races, springs and outfalls, and an oasis never freezing, are §8.2's
rule):

| kind | freezes from | lag weeks |
|---|---|---|
| `pond`, `moat` | mild | 0 |
| `millpond` | cold | 1 |
| `lake` | cold | 2 |
| `slowRiver` (a slow, wide river) | cold | 3 |
| `river` | severe | 3 |
| `harbourEdge` | severe | 4 |
| `seaShore` (sheltered shores only) | severe | 5 |

*`season.surfaces`* (item 117 (f); each row's phases in year order, each look holding until the next, the last until the
first's week next year; the anchors are the climate row's bands; the looks are §8.2's season row keys):

| kind | phases (look ← anchor + offset weeks) |
|---|---|
| `arable`, `strip_field` (by the field's crop and rotation slot at village rungs, V07 §5.1) | `field.sown` ← grow.start · `field.green` ← grow.start + 4 · `field.ripe` ← harvest.start − 4 · `field.harvest` (stooks) ← harvest.start · `field.stubble` ← harvest.end · `field.ploughed` ← harvest.end + 6 |
| `meadow` | `meadow.green` ← grow.start · `meadow.high` ← hay.start · `meadow.mown` ← hay.end · `meadow.winter` ← leafFall.end (a row with no hay band: `meadow.dry` ← harvest.end) |
| `pasture`, `commons`, green | `grass.green` ← grow.start · `grass.autumn` ← harvest.end · on `commons` `commons.bracken` (rust) ← leafColour.start |
| `orchard` | `orchard.blossom` ← blossom.start · `orchard.leaf` ← blossom.end · `orchard.fruit` ← harvest.start · `orchard.colour` ← leafColour.start · `orchard.bare` ← leafFall.end |
| `vineyard` | `vine.leaf` ← grow.start · `vine.fruit` ← harvest.start · `vine.colour` ← leafColour.start · `vine.bare` ← leafFall.end |
| `garden` (item 111's irrigated gardens; a town garden yard part) | `garden.green` ← grow.start · `garden.bare` ← harvest.end + 8 |
| deciduous crown, hedge | `crown.leaf` ← grow.start + 2 · `crown.colour` ← leafColour.start (each crown by `season.leaf`) · `crown.bare` ← leafFall.end |
| evergreen crown | no row (unchanged all year) |
| wood floor (`wildwood`, `coppice`, `reserve`) | `wood.floor` ← yearStart · `wood.floor.leaves` ← leafFall.start (the cover table's densities) |

*`season.leaf`* (item 117 (f2): each deciduous crown takes its own colour by a keyed draw on `render.instances` from its
species' weights, so a wood reads as many colours at once; a share `earlyGreenShare` of crowns stays green at the first
leaf-colour week, falling linearly to none at the band's middle; late autumn thins the crowns toward winter's bare ones):

| species | colours (weights) | early green |
|---|---|---|
| oak | russet 0.3, bronze 0.25, brown 0.25, gold 0.1, amber 0.1 | 0.35 |
| beech | amber 0.3, bronze 0.3, orange 0.2, gold 0.1, russet 0.1 | 0.3 |
| ash | gold 0.6, amber 0.2, brown 0.2 | 0.4 |
| hazel | gold 0.7, amber 0.3 | 0.3 |
| birch | gold 0.8, amber 0.2 | 0.25 |
| larch | gold 0.7, amber 0.3 | 0.2 |
| thorn | crimson 0.3, russet 0.3, scarlet 0.2, brown 0.2 | 0.3 |
| orchard (a fruit tree) | gold 0.3, orange 0.3, scarlet 0.2, russet 0.2 | 0.3 |
| hedge (mixed) | russet 0.3, gold 0.3, crimson 0.2, brown 0.2 | 0.3 |
| vine | gold 0.4, scarlet 0.3, crimson 0.3 | 0.2 |
| creeper (on walls) | scarlet 0.5, crimson 0.5 | 0 |

A temperate-deciduous wood (oak, beech, ash, hazel) draws from gold, amber, orange, russet, bronze and brown — six colours,
over item 117 (i)'s five. Bracken goes rust and the stubble gold by `season.surfaces`' looks.

*`season.cover`* (item 117 (f2): the fallen-leaf cover's share of a surface near deciduous crowns, from `start` at the first
leaf-fall week to `end` at the last, deepening linearly; × `edgeFactor` within 1 m of a wall or kerb, where it gathers;
reaching `driftM` from the nearest deciduous crown; thinning to none over `fadeWk` weeks after leaf fall ends, or lying
under snow):

| surface | start | end | edge factor | drift m | fade weeks |
|---|---|---|---|---|---|
| `underTrees` (the crown's footprint × 1.5) | 0.15 | 0.8 | 1.0 | 0 | 4 |
| `street` | 0.05 | 0.3 | 2.0 | 12 | 4 |
| `lane` | 0.08 | 0.4 | 2.0 | 12 | 4 |
| `green`, `lawn` | 0.1 | 0.5 | 1.5 | 15 | 4 |
| `garden` | 0.1 | 0.6 | 1.5 | 12 | 4 |
| `churchyard` | 0.1 | 0.6 | 1.5 | 15 | 4 |
| `roof` | 0.02 | 0.2 | 1.0 | 8 | 4 |
| `stillWater` | 0.02 | 0.15 | 1.0 | 10 | 2 |

* The present week and the climate are §7.7's DR42 (item 125: the week from the dossier's own ticks, the climate from its
  terrain type through V08's `climates` row set, V08 §2.6).

**3.25.7 Festival decorations** (item 118: a LOOK only, as item 117; `festival.decorations`, `festival.staging`,
`festival.motifs`, `festival.generic`, rows 102–105; drawn by §8.2's decoration rows, placed by keyed draws from the seed,
the festival's id and the place, never over a label's keep-out or a gate's passage; exports draw them in the image only; every column of rows 102–105 `calibratable: false` — a look's enumerations:
items, places, counts, motifs and windows, with no register entry, V12 §3.11).

*`festival.decorations`* (by rung and item; each tier draws its own rows and never a larger tier's; `band` the coarsest band
it shows at — the city band colour along the procession route and pennants on towers, the district band bunting, stalls
and pavilions, the neighbourhood band lanterns, tables and garlands, item 118 (f); `count` per the `per` unit, a keyed draw;
two items with `alt` are one choice per festival by weight):

| rung | item | place | band | count | alt · weight |
|---|---|---|---|---|---|
| THORP | `garland` | the heart | neighbourhood | 1–3 per place | `bonfire` · 0.5 |
| THORP | `bonfire` | the heart | district | 1 per place | `garland` · 0.5 |
| HAMLET | `maypole` | the green | district | 1 per place | `bonfire` · 0.6 |
| HAMLET | `bonfire` | the green | district | 1 per place | `maypole` · 0.4 |
| HAMLET | `garland` | doors | neighbourhood | 3–6 per 100 m of frontage | — |
| VILLAGE | `maypole` | the green | district | 1 per place | — |
| VILLAGE | `bunting` | the church lane | district | 1 run per 100 m | — |
| VILLAGE | `stall` · `table` | the green | district · neighbourhood | 3–8 · 2–6 per place | — |
| TOWN | `bunting` | across streets between facing fronts on the main ways | district | 2 runs per 100 m | — |
| TOWN | `banner` | the gates and the hall | district | 2 per gate, 2 on the hall | — |
| TOWN | `stall` | the market square | district | 6–15 per square | — |
| TOWN | `lanternString` | the main ways | neighbourhood | 2 per 100 m | — |
| CITY, METROPOLIS | `routeColour` | the procession route | city | continuous | — |
| CITY, METROPOLIS | `banner` | lining the procession route | district | 3 per 100 m | — |
| CITY, METROPOLIS | `pennant` | towers and walls | city | 1 per tower, 1 per 50 m of wall | — |
| CITY, METROPOLIS | `pavilion` · `stage` | the squares | district | 1–3 · 0–1 per square | — |
| CITY, METROPOLIS | `lantern` | the main ways | neighbourhood | 3 per 100 m | — |
| CITY, METROPOLIS | `boatDecor` | boats on the water | district | 1 per boat at the waterfront | — |
| SKY (V05's islands) | `pennant` | rims and landings | district | 2 per landing, 1 per 100 m of rim | — |

*`festival.staging`* (a whole case-folded word or adjacent word pair of the staging prose → a place kind; V08's adapter
reduces the prose to these keys; the dossier's named place wins where it names one):

| keys | place |
|---|---|
| `square`, `plaza`, `piazza`, `hall`, `guildhall`, `town hall` | square (the main square; a hall's is the square before it — the civic stage) |
| `market`, `marketplace`, `bazaar` | market |
| `green`, `common`, `meadow`, `lawn` | green |
| `church`, `chapel`, `cathedral`, `abbey` | church |
| `temple`, `shrine`, `sanctuary` | temple (the deity's temple where the festival names a deity whose temple stands) |
| `river`, `riverbank`, `harbour`, `harbor`, `quay`, `docks`, `waterfront`, `shore`, `beach`, `lake` | waterfront |
| `gate`, `gates`, `gatehouse` | gate |
| `fair`, `fairground`, `field`, `fields` | fair field |
| `castle`, `keep`, `palace`, `citadel` | castle |

Its named row `fallback`, by V08's festival kind when no key matches or the keyed place does not stand: `religious` → the
temple (the deity's where named) and the procession route from it to the main square along primary ways; `market` → the
market square, else the fair field; `harvest` → the green and the field edge; `water` → the waterfront.

*`festival.motifs`* (the culture's motifs and colour roles, and the season's; colours are §8.2's roles, never values here;
a festival naming a deity takes the `festival.sacred` roles in place of its culture's):

| key | motifs | colour roles |
|---|---|---|
| `germanic`, `norse`, `slavic` | `wreath`, `ribbon`, `knot` | `festival.a`, `festival.b` |
| `latin`, `greek` | `garland`, `laurel`, `ribbon` | `festival.b`, `festival.c` |
| `celtic` | `knot`, `ribbon`, `wreath` | `festival.a`, `festival.c` |
| `arabic`, `south_asian` | `lanternPierced`, `garlandFlower`, `canopy` | `festival.c`, `festival.d` |
| `east_asian` | `lanternPaper`, `streamer`, `canopy` | `festival.a`, `festival.d` |
| `mesoamerican` | `garlandFlower`, `streamer`, `sunDisc` | `festival.b`, `festival.d` |
| `steppe` | `streamer`, `pennantSwallowtail`, `knot` | `festival.a`, `festival.b` |
| `mixed`, and a culture a pack adds without a row | `garland`, `ribbon` | `festival.a`, `festival.b` |
| `season/spring` · `season/summer` · `season/autumn` · `season/winter` | flowers · garland · `sheaf` · `evergreenBough`, `lantern` | — |

*`festival.generic`* (the standalone preview's festivals, item 118 (b); each of V08's `harvest` kind — V08 §2.6 maps sowing,
midsummer and midwinter words to it — so the green and the field edge stage them):

| key | window (weeks) |
|---|---|
| `spring` | 6 |
| `midsummer` | 19 |
| `harvest` | 30–31 |
| `midwinter` | 45 |

* **`says`** (ids `fest/<table>/<row>`): "the streets are hung for {festival}, weeks {a}–{b}; the {place} holds the
  {items}"; with the dossier's staging place — "as the festival's own custom has it".

**3.25.8 The quality budget's recorded uses** (item 119 (b): a step slower than its target only for a measured gain;
`perf.qualitySpend`, registry row 106; shipped empty, `calibratable: false`). One row per use a stage makes of time above its
§12 target (`stage/use` key; V11 §2.8d's shape): the stage's StageId, the use, the target and the measured extra cost, the
bar the gain is measured by and its value, the `CalibrationRun` that measured it (V12). A row lands only in the change that
records its gain (the empty-table rule, V11 §2.1), with the stage's id written into the row's readers; the stage runs its
quality path only while its row stands, and inside §12's ten-second comfort level (the owner's, §12; never a cell here). The
targets, the comfort level and the interaction budgets are §12's and untouched by this table. The bars are §12.10's and V12's;
T-V11-44 (b) holds the row shape.

**3.25.9 Crisis looks** (item 122, with (h)–(i): a LOOK only — no crisis moves, adds or removes anything and no cell here
is read by a model stage, so the document hashes identically with crises on and off and in every week; `crisis.looks` with
its named row `settings`, registry row 107, and `crisis.map`, row 108; the shapes, the placement rules and the parts each
kind draws are §10.2 *Crisis looks*, the derivation §7.7's DR44, each look's marks by band — its symbols, in role keys,
never a colour here — §8.2's crisis look rows, the outskirts' land and a disaster's districts V01's `campLand` and
`disasterDistricts`, the refugee camp's frontier V06's `frontierFor`). The numbers are `own` and calibratable, their
register entries V12 §3.11's, `scale` and `lookLevel` `extension` (the parity presets draw no look); `kind`, `label`,
`place`, `band` and `priority` are enumerations, `calibratable: false`.

*`crisis.looks`* (one row per look kind; `scale` the extent at severity 0 – 1 by rung, linear between — m² of camped
ground at a camp place, each cell a headcount × `areaPerHeadM2`, the heads in brackets, else the share of the place's
units; `band` the coarsest band §8.2 draws a part at; `priority` the camp looks' turn on the outskirts, lowest first):

| kind | label | place | band | scale by rung (THORP · HAMLET · VILLAGE · TOWN · CITY · METROPOLIS) | priority |
|---|---|---|---|---|---|
| `siege` | "Siege camps" | `beyondWalls` | city | m² 900–2 700 · 2 250–9 000 · 4 500–22 500 · 22 500–135 000 · 90 000–450 000 · 225 000–1 350 000 (20–60 heads, a war band, to 5 000–30 000, a full siege line) | 1 |
| `blockade` | "Blockade camps" | `approachRoads` | city | as `siege` (the same forces before a place with no standing wall) | 1 |
| `quarantine` | "Quarantine camp" | `outside` | city | m² 225–900 · 450–2 250 · 900–4 500 · 4 500–22 500 · 13 500–90 000 · 45 000–270 000 (5–20 to 1 000–6 000 heads) | 2 |
| `refugeeCamp` | "Refugee camp" | `approachByGate` | city | m² 450–1 800 · 900–5 400 · 2 250–13 500 · 9 000–67 500 · 45 000–360 000 · 135 000–1 125 000 (10–40 to 3 000–25 000 heads) | 3 |
| `occupation` | "Occupation" | `gatesAndKeep` | city | m² of its garrison camp 225–900 · 450–2 250 · 900–4 500 · 4 500–22 500 · 22 500–90 000 · 45 000–225 000 (5–20 to 1 000–5 000 heads) | 4 |
| `famine` | "Famine" | `fields` | city | share of the fields bare 0.3–1 at every rung | 5 |
| `beast` | "Beast attacks" | `edge` | district | share of the edge's runs torn 0.05–0.4 at every rung | 5 |
| `raiders` | "Raiders" | `outlyingFarms` | city | share of the outlying farmsteads burned 0.1–0.6 at every rung | 5 |
| `disaster` | "Ruined quarters" | `neighbourhoods` | city | share of the districts — at THORP, HAMLET and VILLAGE of V07's ends — 0.05–0.5 at every rung; `lookLevel` 0.67–0.95 | 5 |
| `rebellion` | "Barricades" | `streets` | district | share of the junctions barricaded 0.1–0.6 at every rung | 5 |
| `boom` | "Building boom" | `streets` | district | share of the frontages scaffolded 0.05–0.3 at every rung | 5 |
| `bust` | "Shuttered shops" | `streets` | district | share of the shops shuttered 0.1–0.6 at every rung | 5 |

* **The rows' readings.** The camp looks' priorities are item 122 (c)'s order — the siege camp, then the quarantine camp,
  then refugees — the blockade beside the siege it stands for and an occupation's garrison after them; the other looks take
  no camp land, their priority 5 unread. The `disaster` row's `lookLevel` lies in the `ruined` share of the decay level
  (V06 §3.23 (2)): a ruined quarter's buildings draw item 123's damage there by severity, or at their own level where that
  is higher (§10.2 (d)). The ranges: each m² cell [0.25, 4] × its value, each share in [0, 1], `lookLevel` inside [2/3, 1].
* **`settings`**: `densityCap` 0.5 — the share of the outskirts' free land the camp looks take together (item 122 (c);
  range [0.1, 0.9]); `siegeStandoffM` 300 — item 122 (b)'s "beyond bowshot" (range [150, 500] m; general: a war bow's and a
  crossbow's effective reach of 200–300 m); `areaPerHeadM2` 45 — item 122 (h) (range [30, 60] m²; general: Roman marching
  camps and present-day refugee-camp standards near 30–45 m² a head — tents, lines, horses and lanes); `enginesPerBesiegers`
  1 500 — item 122 (h): one siege engine to about this many besiegers (range [500, 5 000] people); `previewSeverity` 0.6 —
  the severity a preview draws its look at (§2.9's `crises`; range [0, 1]).
* **Item 122 (h)'s rates** are three of these cells. A force's or a travelling group's camp is `areaPerHeadM2` × its heads
  where the dossier gives them — two armies joined, twice the ground —, the condition's `exodus` or arrivals standing in
  where it gives none, and the `scale` row by severity and rung only where it gives no count at all (§10.2 (c)); the engines
  are one per `enginesPerBesiegers` heads, capped by §10.2 (f)'s gates and curtain runs; a coalition's spread round the
  town — each army its own camp in its own colours, the ring fuller as the coalition grows — is §10.2 (f)'s rule (bearings
  evenly spaced from a keyed start) and holds no cell.

*`crisis.map`* (the closed mapping, item 122 (b): every SettlementForge stressor type, condition archetype and simulator
crisis event has one row — a look or an explicit `none`; key `from/key`; the words are SettlementForge's own at its pinned
baseline, identity only (§17.1), read by V08's census; a dossier row set, never calibrated, landing with the port at M-SF (C4b) — until then the
set is empty and every condition reads `none`, §10.2 (b)):

| from | key → look |
|---|---|
| `stressor` | `under_siege` → `siege`; `mass_migration` → `refugeeCamp`; `plague_onset` → `quarantine`; `famine` → `famine`; `monster_pressure` → `beast`; `occupied` → `occupation`; `insurgency`, `slave_revolt` → `rebellion`; `wartime`, `indebted`, `infiltrated`, `politically_fractured`, `recently_betrayed`, `religious_conversion`, `succession_void` → `none` |
| `archetype` | `war_pressure` → `siege`; `regional_migration_pressure` → `refugeeCamp`; `plague` → `quarantine`; `famine` → `famine`; `vassal_extraction` → `occupation`; `occupation` → `occupation`; `rebellion` → `rebellion`; `boom` → `boom`; `bust` → `bust`; `reconstruction`, `resource_strike`, `vein_exhausted`, `trade_route_cut`, `food_anchor_lost`, `corruption_exposed`, `faction_challenge`, `dominant_npc_removed`, `stressor_residual`, `custom_crisis`, `regional_authority_instability`, `regional_tax_revenue_disruption`, `regional_criminal_pressure`, `regional_religious_pressure` → `none` |
| `event` | `REFUGEE_WAVE` → `refugeeCamp`; `PLAGUE` → `quarantine`; `RAID_OR_MONSTER_ATTACK` → `raiders`; `calamity` (a condition linked to a carried calamity whose own row is `none`, V08 §3.16 (7) (b)) → `disaster` |

* **The readings.** `regional_migration_pressure` is the mass immigration item 122 (b) names, so it draws the refugee camp;
  the other `regional_*` pressures are its "no look (nothing physical)". `war_pressure` is the siege it names beside the
  siege stressor; `wartime`, a war away from the walls, draws none. An insurgency and a slave revolt are risings, drawn as
  barricades; `vassal_extraction`, an overlord's men in the town, and `occupation`, item 122 (b)'s own word, as an
  occupation. `reconstruction` draws none by its own row: its Works scaffolding is the model's own (§4.11), the aftermath
  a disaster's look hands over to building by building (V06 §3.22 (3)); a `reconstruction` condition linked to a carried
  calamity carries the `event` word `calamity` and reads that row instead (V08 §3.16 (7) (b): one condition per calamity).
  `RAID_OR_MONSTER_ATTACK` strikes the outlying farms first, so it draws `raiders`; a standing monster threat draws `beast`
  through `monster_pressure`. A calamity draws `disaster` through the condition linked to it
  (V08 §3.16 (7) (b), (d)), its districts the calamity's `targets` first, else its pattern by its type (V01's
  `disasterDistricts`, §10.2 (d)); a calamity linked to no condition draws no look, its aftermath DR28's.
* **Totality** (T-V11-46 (a); T122-4). The compile checks the `stressor` rows against the catalogue manifest's
  `crisis.stressors` list (V08 §2.4), the `archetype` rows against its `crisis.archetypes` list and the `event` rows
  against its `crisis.events` list (registry row 77; V08's census at the pinned baseline): a listed word without its row
  fails the build until the row is written, so the rows above — SettlementForge's fifteen stressor types, the archetypes
  its conditions carry today and the simulator's crisis events — grow with the line; the `event` row `calamity` is the
  word V08 §3.16 (7) (b) gives a linked condition, in no census list; a word V08 meets that no row maps reads `none`,
  reported `unmapped_word` (V08).
* **Off** — §2.9's `crises` key turns the looks off per viewer, with no switch in V11 §3.24.0; with no condition standing
  and no preview nothing is drawn, every tile byte-identical to the base (`item122.crises`; T122-7).

**3.25.10 Damage in a ruined building's plan** (item 123: a drawing only — one plan, never redrawn; no damage moves, adds
or removes a room, wall, opening or id, and no cell here is read by a model stage; `damage.elements` with its named row
`settings`, registry row 109, and `damage.materials`, row 110; the mechanism is §2.6 step 7's damage layer, §6.3 *Plan
damage*'s keyed threshold t = lo + u · (hi − lo) per plan element and V06 §3.23's decay level, an element showing damaged
while the level is above 0 and at least t; the drawings are V03's, V02's and V04's, the battle maps §11.1's). The numbers
are `own` and calibratable, their register entries V12 §3.11's; `states` is an enumeration, `calibratable: false`.

*`damage.elements`* (each kind's range of the decay level lies inside the shares of the existence states whose look item
123 (c) gives it — V06 §3.23 (2)'s thirds: `abandoned` [0, 1/3], `decayed` [1/3, 2/3], `ruined` [2/3, 1] — so each state's
look holds whatever the years; outer walls and ground floors late, partitions and upper floors early; a range's ends move
freely inside its states' shares, the lower below the upper):

| kind | range | states | item 123 (c)'s look |
|---|---|---|---|
| `furniture` | 0.02–0.30 | abandoned | broken furniture |
| `door` | 0.05–0.33 | abandoned | doors off their hinges |
| `window` | 0.10–0.33 | abandoned | shutters and panes broken among the dust and debris |
| `partition` | 0.36–0.66 | decayed | partition walls down |
| `roofBay` | 0.40–0.66 | decayed | roof holes open to the sky over their rooms |
| `upperFloor` | 0.40–0.95 | decayed, ruined | rotten floor patches and holes, then the upper storeys mostly floorless — fragments over the void |
| `stair` | 0.70–0.90 | ruined | the way up gone with the floors it served |
| `outerWall` | 0.72–0.98 | ruined | outer walls broken |
| `groundFloor` | 0.85–1 | ruined | rubble heaps on the one walkable storey |
| `cellarVault`, `cellarWall` | 0.75–1, 0.80–1 | ruined | cellars intact or partly collapsed by their own thresholds |
| `cryptTomb`, `cryptVault`, `cryptWall` | 0.86–1, 0.88–1, 0.92–1 | ruined | the crypt last: a ruined church keeps its crypt (V04 §5.6) |

* **`settings`**: `defaultAgeYears` 40 (range [0, 300] yr) — the years a building generated abandoned, decayed or ruined
  reads at the week it is first met so, aging from then as any run (V06 §3.23 (4)); a building item 113's replay abandons
  or ruins ages from that replay epoch's week; before V06's level lands (M6-E) every building reads its existence state
  alone at this age.

*`damage.materials`* (V06 §3.23 (2)'s rate r for the building's walls material, `Building.material.walls`: the level a
decay run gains a year; timber faster than stone, item 123 (b); general: an unroofed timber frame rots through within a
generation, a masonry shell stands for a century and more; range [0.002, 0.1] each):

| material | rate a year |
|---|---|
| `ashlar` | 0.008 |
| `rubble` | 0.011 |
| `brick`, `dry_stone` | 0.012 |
| `timber_frame` (the default row), `timber_crib` | 0.03 |
| `timber` (the boards of a shanty or a deck) | 0.035 |
| `wattle_daub`, `cob`, `earth_bank` | 0.04 |

A walls material with no row — a pack's, a regional shift's — reads `timber_frame`, the commonest walls material of
V11 §3.19.3's default rows (the table's `defaultRow`, V11 §2.1), reported once.

* **`says`** (ids `dmg/<table>/<row>`): the ranges — "doors and furniture go first, then partitions, roofs and the upper
  floors; outer walls and the ground floor last, the cellar and the crypt longest"; a rate — "{material} decays about {r} of
  the way to a ruin a year: timber within a generation, stone over a century and more".
* **Off** — no switch: a building never decayed (level 0) draws its plan unchanged (`item123.damage`; T123-7).

**3.25.11 Light weather** (item 124: a LOOK only — the animated effects never change a tile, the model, the document or
its hash, and no cell here is read by a model stage; the climate rows' `weather` cells and the `weather` block of the
climate table's named row `settings`, registry row 43; the mechanism is §6.1 *The weather stream* — the session-seeded
timeline —, §8.2's effect marks and §8.4 (i)'s light terms, the switch V09's device state). The numbers but the two caps
of the hard rules (below) are `own` and calibratable, their register entries V12 §3.11's; `perHour` is `extension` (the
parity presets resolve it 0: no spell); the weeks are V11 §3.25.6's (0–51 from the first week of spring; a band `a–b`
includes both ends and wraps the year's end when a > b).

* **The columns.** A climate row holds, for each effect kind, its bands of weeks, each with `perHour` — how often: the
  mean spells of the kind an hour of clear map — and, where it differs from the kind's, `lengthS` — how long a spell lasts.
  At a moment the kinds whose band holds the view's year position (§2.9's `yearWeek`) and — under `light: 'time'` — whose
  `hours` hold the view's hour are live, each at its `perHour` × the largest factor of the sites that apply (below); with
  R their sum, the clear time after a spell (and from the map's opening) is spent at that live rate (§6.1: a unit
  exponential spent as the integral of R ÷ 3 600 over view time, none spent while R is 0), the next kind is k with chance
  its live rate ÷ R at the moment the gap ends, and its length is uniform in its `lengthS` — §6.1 draws the three uniforms
  in that order. A moment with no live kind (R = 0) spends none of the gap and brings no spell. A band holds its cells
  through its weeks, so the weeks turn by bands written as transitions — the first flurries before deep snow, a thaw of
  rain — never by interpolation, and a kind absent from a band stays absent through it (the arid dry months).
* **The commonest kind** at a moment is the live kind (above) of greatest `perHour` after the sites' factors, ties in
  `WeatherKind`'s order (V11 §2.8): the kind a press of V09's **Start a shower now** starts as the next spell; at a moment
  with no live kind (R = 0) a press starts none, and V09 disables the button there with its reason (§6.1; §7.8).

*The kinds* (`settings.weather.kinds`; `hours` the hours of the view's day in which the kind is live, read only under
`light: 'time'` (§2.9), so fog and mist come on cool mornings and burn off as the day goes on, item 124 (d); every
`lengthS` lower end at least twice its kind's fade in §8.4 (i), so a spell reaches its full strength):

| kind | length s | hours |
|---|---|---|
| `rain` | 30–90 | — |
| `drizzle` | 60–180 | — |
| `snow` | 60–240 | — |
| `mist` | 120–360 | 4–11 |
| `fog` | 180–600 | 4–11 |
| `leaves` | 20–60 | — |
| `cloudShadow` | 120–480 | — |
| `shimmer` | 120–600 | 10–18 |
| `dust` | 120–480 | — |

*The climate rows' weather cells* (weeks · spells an hour, a length in s where it differs from the kind's; item 124 (c)'s
defaults — temperate rows: spring showers, the odd summer downpour, autumn fog and blowing leaves, winter snow where it
freezes; maritime: frequent rain in autumn and winter, morning fog; arid: clear most of the year, rare short showers in its
short wet weeks, heat shimmer and dust haze, never snow; cold: snow most of the winter, frozen fog on still days):

| biome | rain | drizzle | snow | mist | fog | leaves | cloud shadows | shimmer, dust |
|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous` | 0–12 · 3; 13–25 · 1 (60–180 s); 26–40 · 2 | 0–12 · 1; 26–40 · 2 | 41–42 · 1 (first flurries); 43–51 · 3; 0–1 · 1 (the thaw) | 0–12 · 0.5; 26–37 · 1 | 26–42 · 1.5; 43–51 · 0.5 | 31–37 · 6 | 0–12 · 2; 13–25 · 3; 26–38 · 2 | — |
| `temperate-coniferous` | 0–12 · 2.5; 13–25 · 1 (60–180 s); 26–39 · 2 | 0–12 · 1.5; 26–39 · 2 | 40 · 1; 41–51 · 3; 0–3 · 1.5 | 0–12 · 1; 26–39 · 1.5 | 26–40 · 1.5; 41–51 · 0.5 | 29–35 · 3 | 0–12 · 2; 13–25 · 3; 26–39 · 2 | — |
| `mixed` | 0–12 · 3; 13–25 · 1 (60–180 s); 26–39 · 2 | 0–12 · 1; 26–39 · 2 | 40–41 · 1; 42–51 · 3; 0–2 · 1 | 0–12 · 0.5; 26–36 · 1 | 26–41 · 1.5; 42–51 · 0.5 | 30–36 · 5 | 0–12 · 2; 13–25 · 3; 26–39 · 2 | — |
| `maritime` | 0–12 · 3; 13–25 · 1.5; 26–51 · 4 | 0–12 · 2; 13–25 · 1; 26–51 · 3 | — | 26–38 · 1 | 0–12 · 1; 26–51 · 2 | 33–38 · 4 | 0–51 · 3 | — |
| `arid` | 44–49 · 0.3 (20–60 s) | — | — | — | — | 38–44 · 1 | 44–49 · 0.5 | shimmer 10–38 · 2; dust 13–38 · 1 |
| `cold` | 9–25 · 2; 26–33 · 2 | 26–33 · 1 | 34–35 · 1; 36–6 · 3; 7–8 · 1 | 9–25 · 0.5 | 26–33 · 1; 36–6 · 1 (frozen fog) | 28–33 · 4 | 9–25 · 2; 26–33 · 2 | — |

*The sites* (`settings.weather.sites`: × a live kind's `perHour` where the site applies; where several apply each kind
takes the largest factor, never their product; where none applies the row's own rates stand, item 124 (c)'s temperate
plains; the weather stream reads the sites from the model at the view's head and writes nothing; `forestShareMin` 0.3;
each factor in [0.25, 4]):

| site | applies where | factors |
|---|---|---|
| `coast` | a sea shore in the frame (a `sea` water body, §2.3) | fog × 2 (morning sea fog), rain × 1.3, drizzle × 1.3 |
| `riverside` | a river course or a lake in the frame (§2.3), or S0's relief class `plain` (lowland) | mist × 2 (morning mist on the water), fog × 1.5 |
| `hills` | S0's relief class `hilly` or `mountainous` | snow × 1.5, fog × 1.5 (valley fog), cloudShadow × 1.5 (low cloud) |
| `forest` | woods — the `wildwood`, `coppice` and `reserve` land uses (§2.7) — on at least `forestShareMin` of the frame's land | mist × 1.5, drizzle × 1.5, leaves × 2 |

A factor scales a live entry and never makes one: a kind a row holds no band for stays absent, so a hill town of a row
that cannot snow has no snow.

* **The two hard rules** (item 124 (c); compile checks, T-V11-48 (a)–(b); T124-3, T124-4). (1) **No snow where winter does
  not freeze**: a row whose `seasons.winter` is `none`, a row with no `snow` band and every arid row (`aridity` ≥ `aridMin`,
  V11 §3.25.1) hold no `snow` entry, and an arid row or one whose winter is `none` holds no `snow` or `ice` band either —
  a `snow` cover there draws as `clear` (§8.2); every other row's `snow` entries lie inside its `ice` and `snow` weeks.
  (2) **Rain is rare in arid country**: on an arid row `rain` and `drizzle` come at most `aridRainMaxPerHour` 0.5 an hour
  after the largest site factor, in bands covering at most `aridRainMaxWeeks` 8 weeks — its short wet weeks — and in no
  other week, its dry months. The two caps are the owner's rule in numbers: provenance `owner`, stamped
  `ownerRule: '124 (c)'` (V11 §3.2.1 step 4), `calibratable: false`.
* **Off** — no switch here: V09's **Weather effects** switch (device state; off by default on the low tier and under
  reduced motion) turns the layer off, and the parity presets draw no spell.
=== END ===

=== REPLACE ### 3.26 Edges and combinations ===
### 3.26 Edges and combinations

Every mechanism this volume owns has a defined outcome at the extremes of its inputs, a rung on §5's ladder (check, repair
locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test. Two
general rules cover most of them: **the compile refuses** a table that breaks a declared range, a `ref`, a key rule or a
totality rule (V11 §3.2.1 steps 4–6: nothing ships half-valid; §5's first rung), so a zero or negative area, length, spacing
or count never reaches a reader where a reader needs it positive (every such column's `range` excludes it); and **at run
time a reader that meets an absent row, member or target** reads the table's declared default (`TableSchema.defaultRow`, V11 §2.1) or scores the
row's neutral value (V11 §3.2.3 (c)–(d)), reported — never a crash and never a retry; the rows a reader falls back to
or needs — a declared default, a totality rule's only cover, a table's named row — never go, since V11 §4.1 refuses their
delete. Geometry is never this volume's: a degenerate result in a reading stage is the kernel's refusal handled by that
stage's failure class (the canon's E-GEN-1; §5.1, §5.2). The edges the canon's catalogue lists for this volume, each closed:

| edge | mechanism | the case | outcome | rung | test |
|---|---|---|---|---|---|
| M-V11-513-E5 | V11 §2.4 families, pairs, derived rows | a family member nobody emits; a pair naming a class the town lacks; a pair naming an unknown class | no derived row (V11 §3.3.4 (1) needs an emitter; a pair derives for the classes the view holds); an unknown class refused at compile | check · leave out | T-V11-3; T-V11-45 (a) |
| M-V11-549-E5 | V11 §2.5 goods | a good with no producer or consumer; `comfortM` above `maxDistanceM`; a chain label matching no good | refused at compile (T-V11-28; `comfortM`'s range is [0, `maxDistanceM`]); the label resolves to `import`, reported `unmapped_good` (V11 §3.13.5) | check · substitute | T-V11-28, T-V11-29 |
| M-V11-563-E5 | V11 §2.6 ladders | a record set lacking the lesser kinds; a lesser under two greater kinds; a numbered record against the row's range | the row applies to what is listed; the first greater by key takes it, the second reported; the record's own range wins (V11 §2.6, V11 §3.12) | check · leave out | T-V11-2, T-V11-17 |
| M-V11-577-E5 | V11 §2.7 barrier and waterfront rows | an arc two tests pass; an arc none passes; a river course without `depthCm`; two threats of equal weight | the earlier barrier in the enum's order; `open`; `shallowWater`, walled, reported; the first in key order (V11 §2.7) | repair locally | T-V11-19, T-V11-45 (j) |
| M-V11-599-E5 | V11 §2.8 row types | an era, biome, government or religion key the table lacks; a heights key a template names but the table lacks | the default row — `c14`, `temperate-deciduous`, the recipe's default government kind, `faith` — reported (a default row is never deleted, V11 §4.1); a missing heights row refused at compile (T-V11-7) | substitute · check | T-V11-45 (k), (m), (o); T-V11-7 |
| M-V11-655-E5 | V11 §2.8b the underground rows | a rung without an `order` entry; a cell outside its range | refused at compile (T-V11-26, T-V11-23) | check | T-V11-23, T-V11-26 |
| M-V11-762-E5 | V11 §2.9 identity | an empty, duplicate or ill-formed key; an override naming a retired key | refused at compile (F-EDIT naming the row); the override orphaned (§7.6), reported | check · leave out | T-V11-3 |
| M-V11-827-E4, M-V11-991-E4 | V11 §3.1 catalogue, V11 §3.2 compiler | a cell that would be degenerate to a reader (a zero footprint, plot, frontage, spacing) | its column's range excludes it: refused at compile | check | T-V11-0 |
| M-V11-1106-E4 | V11 §3.3 families | a plot at distance 0 from an emitter; coincident members; a feature class with no member | full push (a `far` row unsatisfied within `withinM`); each member counts; the row's neutral score (V11 §3.2.3 (d)); a zero-area plot never reaches S10b (F-PLOT, §5.2) | — (defined) · leave out | T-V11-27, T-V11-45 (c) |
| M-V11-1106-E6, M-V11-2183-E6 | V11 §3.3, V11 §3.8 at every rung | THORP to the METROPOLIS cap | the families derive for every class of the view at every rung — the `v.` rows by the same compile (V11 §3.2.1 step 6), read at village rungs through V07's slot race; a pair naming a town class applies where that class stands (a village rung holds it only when a dossier names it, V11 §3.22), a pair on a `#<tag>` or a feature class at every rung | — | T-V11-12 (TOWN–METROPOLIS), T-V7-56, T-V11-45 (d) |
| M-V11-1207-E1 | V11 §3.4 profile families | a class naming no family; a custom record with no tag, category or archetype; a family with no class | refused at compile (T-V11-4); item 104 (a) (7)'s fallback `generic-other` (V11 §3.13.3); only its generic class exists | check · substitute | T-V11-4, T-V11-16 |
| M-V11-1292-E4, M-V11-1862-E4 | V11 §3.5, V11 §3.6 classes and templates | a plot too small for the template; structure shares summing above 1; a count range 0–0 | `underSize` `compact` shrinks, `refuse` reports the claim (V11 §3.6.1); shares normalised (the derivation rule); the structure absent | simpler shape · leave out | T-V11-7, T-V11-45 (q) |
| M-V11-1862-E6 | V11 §3.6 at every rung | a band's template at a village rung | templates are per band, the same at every rung; a `v.` row reads its template family from this table (V07 §2.4); a family that fails to compile at a band fails the build | check | T-V11-7, T-V7-56 |
| M-V11-2039-E4 | V11 §3.7 goods and the web | a consumer whose provider stands on its own plot; a consumer with no provider and no import | distance 0, satisfied; the `import` substitute at the facing gate or quay (V11 §3.13.4), else the neutral score | substitute | T-V11-14, T-V11-28 |
| M-V11-2183-E1 | V11 §3.8 pairs | an empty pair table; a pair whose endpoints are absent | the families alone (the parity presets' state); no row | — · leave out | T-V11-3, T-V11-21 |
| M-V11-2234-E1, -E5, -E6 | V11 §3.9 district kinds | one district; no kind scores above 0; a dossier quarter naming an unknown kind; the village rungs | the one district takes the scorer's first kind; `central`; V08's `quarters` rows map it, else the scorer's pick, noted; a village holds one district of kind `village`, set by VS5 (V07 §3.7; V11 §3.9's row), its ends V07 §3.10's, the `sky-*` kinds on islands only | substitute | T-V11-45 (e) |
| M-V11-2271-E5, -E6 | V11 §3.10 identities | a dominant family with no row; the village rungs | the generated `dominant-<family>` row (V11 §3.10); identities type districts only, a village's ends are named by `naming.villageEnd` | substitute | T-V11-45 (f) |
| M-V11-2271-E8, M-V11-2318-E8, M-V11-2636-E8, M-V11-2786-E8, M-V11-3485-E8, M-V11-3527-E8 | the edits of V11 §3.10–V11 §3.13, V11 §3.21, V11 §3.22 | save, load, undo, redo, regenerate and migrate after an `editTable` on an identity, kind, ladder, custom-chain, government or `villageForm` row | the edit re-derives exactly the readers whose recorded slices cite the row (§7.6) — S12c and S13a for an identity; the port's creation for a kind or a ladder row, standing buildings kept by least disruption (item 22); S10b for a chain; S2's seats for a government row; the village buildings of that class for a `villageForm` — claimed names and held edits kept (item 82, V11 §4.3); undo restores the prior view byte for byte; a load replays the pinned versions; an older pinned set upgrades by §7.5's event (V11 §2.10's migrate cells) | — | T-V11-45 (g) |
| M-V11-2318-E4, M-V11-2786-E4 | V11 §3.11 map, V11 §3.13 custom chains | a record whose class finds no site; a chain whose resource feature cannot be sized; a chain of one node | §4.7's placement ladder (relax, substitute, leave out and report); a `DepositSite` point at the nearest hinterland cell, reported; the node placed alone, no link | simpler shape · substitute · leave out | T-V11-16 |
| M-V11-2318-E7 | V11 §3.11 pseudo-classes under toggles | `@layer:sewer` or `@layer:undercity` while the layer is toggled off or under a parity preset (which draws no underground) | the fact is carried at every toggle (item 20); the layer draws it when shown; under a parity preset it is recorded and reported, never drawn | leave out and report | T-V11-45 (h) |
| M-V11-2636-E4 | V11 §3.12 ladders | a range of 0 | refused at compile (ranges ≥ 1) | check | T-V11-2 |
| M-V11-3175-E2, -E5, -E6 | V11 §3.14 concealment | one front at a band; a town where the drawn front class does not stand; a custom concealed record with no row; a village rung | refused at compile (≥ 2 fronts, T-V11-8); the next front by weight among those the roster places, else `hidden`, reported; the custom `criminal` row; the `v.` class that plays the front (V11 §3.22), a front with no village form skipped | check · substitute | T-V11-8, T-V11-44 (c), T-V11-45 (i) |
| M-V11-3241-E1, -E2, -E5, -E6 | V11 §3.16 walls | no barrier; one barrier arc; DR2's threat keys; the village kinds | every arc `open`, a full ring; one closure feature or graded stretch (an arc shorter than the tower spacing one stretch, no tower); the highest-weight threat row; every water arc closing at village kinds | — | T-V11-19 |
| M-V11-3241-E4 | V11 §3.16 degenerate arcs | a zero-length arc; a self-touching boundary | the arc is no arc, its stretches merged (V11 §2.7); S5a's F-WALL ladder | repair locally | T-V11-45 (j) |
| M-V11-3289-E1, -E5 | V11 §3.17 climate and land use | no biome in the circumstance; a land-use kind without a row; the `arid` row's `rivers` farm layout on a frame with no river | `temperate-deciduous`, reported; refused at compile (`landuse` covers `LandUse.kind`, T-V11-2); `perimeter`, §4.9's rule | substitute · check | T-V11-2, T-V11-45 (k) |
| M-V11-3312-E1, -E2, -E4, -E5 | V11 §3.18 decline by material | a building with no material; one material; a zero-footprint ruin; a retaining stretch shorter than `retaining.stretchM`; a material key a pack adds without a row | the class's most specific material row (V11 §3.19.3); no draw; salvage 0; one stretch; the `rubble` row, reported | substitute | T-V11-45 (l) |
| M-V11-3351-E1, -E2, -E4, -E5, -E6 | V11 §3.19 era, region, materials | no era or region; a row with one material; a spacing band with equal ends; a dossier culture naming no era row; the structure rows at every rung | `c14`, `western`; no draw; a fixed spacing (the range admits a = b); `c14` (V08 §2.6's era row), reported; the retaining row by band at every rung a wall stands | substitute | T-V11-3, T-V11-34, T-V11-45 (m) |
| M-V11-3396-E4, -E7 | V11 §3.20 naming | an empty corpus for a symbol; a name over five words; the parity presets; a pack replacing a culture's corpus | the slice's unguarded fallback; re-drawn to the attempt cap (§9.6), then the fallback; the grammars run unchanged (naming is no extension); exactly the unedited names drawn from the changed field re-drawn (§10.4) | retry that piece · substitute | T-V11-15, T-V11-45 (n) |
| M-V11-3485-E1, -E3, -E5, -E6, -E7 | V11 §3.21 government, religion, households | no government kind; no religion; the METROPOLIS cap; the crown row's seat; the village rungs; the castle toggle off | the recipe's default kind (§4.2 S2); `faith`; household sizes clamped to their rows' [min, max], offices at least 1 (⌈⌉); `palace`, else `castle`; the `villageSeat` alone (T-V11-37); a `tower_house` seat below CITY | substitute | T-V11-37, T-V11-45 (o) |
| M-V11-3527-E2 | V11 §3.22 `villageForm` | a village class one town class plays; a `v.` class no town class plays | one-to-one substitution; village-only | — | T-V11-3 |
| M-V11-3547-E4 | V11 §3.23 underground rows | a rung with no church; an epoch of zero years | no catacomb (the count reads the churches); no growth — the floor `growthFloorM2` applies only when years > 0; the geometry's edges are V04's (F-UNDER) | — | T-V11-26, T-V11-45 (p) |
| M-V11-3678-E4 | V11 §3.24 item 110's rows | a zero-length terrace stroke; a deck of no buildable width; a raised way shorter than one pier spacing | no wall; no plot (the cutter's `minPlotDepthM` test); one span (item 244's step (2)) | leave out | T-V11-32 – T-V11-35, T-V11-45 (q) |
| EI-V11-EDGE-1 | V11 §3.24.5 | a cart class's crossing beyond 1.5 × `rampMaxGrade` with no switchback | the step re-cut at the crossing, else the units not levelled there (V11 §3.24.5) | repair locally · leave out and report | T-V11-45 (b) |
| EI-V11-EDGE-2 | V11 §2.3 coverage | `per` or `target` 0; a district with no residential plot | refused by the columns' ranges (both > 0); the households term skipped there, reported (V11 §2.3) | check · leave out | T-V11-4, T-V11-45 (c) |
| EI-V11-EDGE-3 | V11 §4.1 table edits | a row `delete` — an `editTable` or a pack's patch — of a table's `defaultRow`, of an `allowFallback` target, of the only row covering a value a totality rule requires, of a table's named row (`settings`, `structure`, `festival.staging`'s `fallback`), or of the last row of a table not `mayEmpty` | refused F-EDIT, `refuse.table.required`, naming the readers, with the alternative "edit its cells"; a pack's op refused at load, the row standing, reported; a cell edit of the same row applies | check | T-V11-45 (s) |
| EI-V11-EDGE-4 | V11 §3.25.9 crisis looks | a stressor, archetype or event word with no `map` row; the `map` set empty (before M-SF; a standalone map); a severity outside [0, 1]; a dossier headcount of 0; a look whose `scale` at the map's rung is 0 (the parity presets); a delete of a look kind's row or of the `settings` row (by `editTable` or a pack's patch) | the word reads `none`, reported `unmapped_word` (V08), and a word the census lists fails the build until its row is written (T-V11-46 (a)); every condition `none`, only a preview drawing; clamped into [0, 1] (§10.2 (c)); read as no size given — the `scale` row (§10.2 (c)); nothing drawn; the delete refused F-EDIT, `refuse.table.required` (V11 §4.1), naming the readers — §7.7's DR44, §10.2's placement and §8.2's look rows — with "edit its cells", a pack's op refused at load, the row standing | check · substitute · leave out and report | T-V11-46; T-V11-45 (s), (t) |
| EI-V11-EDGE-5 | V11 §3.25.10 damage | a decay level of 0 and of 1; a walls material with no `damage.materials` row; a range edited to lo ≥ hi or out of its states' shares; `defaultAgeYears` 0; a delete of an element kind's row or of the `settings` row (by `editTable` or a pack's patch) | nothing damaged at 0 (§6.3: the level above 0 and at least t); every element damaged at 1 (t < hi ≤ 1), a ruined church keeping its crypt's rooms and ways (V04 §5.6); the `timber_frame` row, reported; clamped to the nearest lawful range (V11 §4.1); a building generated abandoned, decayed or ruined at its state's floor the week it is first met, aging from then (V06 §3.23 (2), (4)); the delete refused F-EDIT, `refuse.table.required` (V11 §4.1), naming the readers — §6.3's thresholds, V06 §3.23, V03's, V02's and V04's drawings — with "edit its cells", a pack's op refused at load, the row standing | check · substitute | T-V11-47; T-V11-45 (s), (u) |
| EI-V11-EDGE-6 | V11 §3.25.11 weather | a moment with no live kind (a week no band of a row covers; under `light: 'time'`, an hour no live kind's `hours` hold); a kind whose `hours` exclude the view's hour; a site factor on a kind the row holds no band for; a `snow` entry or an arid rain cell edited past a hard rule; a `light` other than `'time'` | no spell comes, none of the gap spent (§6.1), and Start a shower now starts none, V09 disabling it with its reason; not live then: it adds nothing to R and is never drawn at that hour; the kind stays absent; clamped — the `snow` entry to 0, the rain cell to its cap (V11 §4.1); the `hours` cells unread, every hour admitted | check · leave out | T-V11-48; T-V11-45 (v) |

**The combinations** (a physical feature of another unit read through these tables). One rule defines them all: a feature
reads its rows at the document's rung — a row's rung key decides, and a table with none applies at every rung; an
`editTable` on a row re-derives that feature from its first reader stage (§7.6's invalidation) with V11 §4.3's held and kept
rules; the parity presets resolve the extension rows to their off forms (V11 §3.24.0); a dossier fact wins over a table
default (item 20); a failure reading a row takes V11 §3.2.3's rungs. The rows each combination reads, and its rungs:

| combination | rows read | rungs |
|---|---|---|
| C-cliff-tables | `walls.barriers` (`sheerCliff`, `cliff`, `steepSlope`; V11 §3.16.1) | every rung (village kinds by V07 §3.4) |
| C-steep-tables | `terrace`, `retaining` (V11 §3.24.1); the relief column `terracedEdges` | TOWN–METROPOLIS by row; THORP–VILLAGE through V07's cells defaulting to the TOWN row |
| C-moat-tables | `era.moatWidthM` (V11 §3.19.1) | TOWN–METROPOLIS |
| C-bridge-tables | `deck` and `deckOk` (V11 §3.24.4); `ways.crossing` (a bridge never crosses a retaining wall; its approach ramps read `primary`'s row) | every rung (village deck cells V07's) |
| C-raised-tables | `raisedWays` (V11 §3.24.2), the era and culture factors | CITY–METROPOLIS generated; any rung declared (the schema's rung gate) |
| C-retaining-tables | `retaining` by band; `ways.crossing` | every rung where a wall stands |
| C-deckplot-tables | `deck`, `deck.landmarks` | VILLAGE (V07's cells)–METROPOLIS |
| C-hinterland-tables | `landuse`, `farm`, the goods' `site`, the climate rows | every rung |
| C-frame-tables | `rung.ladder` (the frame law), `base.settings`' `view.zoomOutMarginStops` | every rung |
| C-hood-tables | `hood.*` (V01) | TOWN–METROPOLIS |
| C-terraced-ward-tables | `terracedEdges`, `terrace` | TOWN–METROPOLIS |
| C-composed-tables | `composition` (V02), `heights`, `roster.specialisations`, `grandeur.ceiling` | every rung (the ceiling's rows by rung) |
| C-plan-tables | `roomProgram` (V03), the class templates | every rung |
| C-sewer-tables | `sewer.existence`, `under.*` (II.7) | TOWN–METROPOLIS |
| C-catacomb-tables | `under.catacomb` (V11 §3.23.8) | TOWN–METROPOLIS; below TOWN a dossier catacomb is one charnel vault (`charnelMaxM2`) |
| C-undercity-tables | `undercity`, `RuinRule.sourceWeight` (V11 §3.23.6) | TOWN–METROPOLIS |
| C-void-tables, C-access-tables | `under.dig`, `under.openings` (V11 §3.23.7) | every rung |
| C-vault-tables | `raisedWays.structure.span` (V11 §3.24.2), `naming.vaults` | every rung a raised way stands |
| C-shade-tables | `prosperity.drivers`' `w_sun` × the climate row's sun cell (V11 §3.3.5, V11 §3.25.1) | CITY–METROPOLIS (the islands' shade in pass 2) |
| C-dossier-tables | every `dossier.*` row set (never calibrated) | every rung |
| C-crisis-tables | `crisis.looks`, `crisis.map` (V11 §3.25.9) | every rung, THORP to the METROPOLIS cap, by each look's `scale` row; at THORP, HAMLET and VILLAGE a disaster's units V07's ends |
| C-damage-tables | `damage.elements`, `damage.materials` (V11 §3.25.10) | every rung where a building stands abandoned, decayed or ruined, and a disaster look's districts at its `lookLevel` |
| C-weather-tables | the climate rows' `weather` cells, the `settings` row's weather block (V11 §3.25.11) | every rung |

T-V11-45 (r) runs one fixture per combination and listed rung: one row edited, only the feature's readers re-derived, the
undo byte-identical.
=== END ===

=== REPLACE ## 4 Editing — table edits, declarations, locality, undo and the clerk's view ===
## 4 Editing — table edits, declarations, locality, undo and the clerk's view

**4.1 Every table is edited by the base's events.** A cell change, a row insert or a row delete in any registry table is a
`RowOp` inside an `editTable` event (§7.1), a preset change an `editPreset`, a pack an `adjust` of the pack list (§7.6,
§10.4) — so every table of V11 §3.1 is editable, undoable (§7.4's `editTable` row), migrated by §7.5 and replayed by hash.
The tables editor (its screens V09's) reads `REGISTRY` for each table's columns, units, declared ranges, enum values and
refs and validates in §7.1's dry run. **The one statement of the edit rule**: a numeric value outside its declared range,
or one that would break a compile inequality (the terrace inequalities, T-V11-32 (a); the clear-span bound, T-V11-32 (h);
the largest-crypt bar, T-V11-25; item 123's range order, T-V11-47 (a); item 124's two hard rules, T-V11-48 (a)–(b): a
`snow` entry where no snow may fall clamps to 0, an arid rain cell to its cap), is clamped to the nearest lawful value with
the dry run's one-line note (§7.1; item 101 R2); only a dangling `ref`, a type error or an owner rule is refused, F-EDIT
(§5.2), naming the rule — the one owner rule a
table edit is refused for is item 110 (b)'s rung gate (a `raisedWays` row below CITY), refused with the alternative "declare the
raised way"; a stamped cell is edited like any cell — its stamp binds calibration runs, fallbacks and corpus packs, never
a user's edit (V11 §3.2.1 step 4). **A row readers fall back to or need is never deleted** (J-V11.113): a row `delete` — by
`editTable` or a pack's patch — of the row a schema names as its readers' declared default (`TableSchema.defaultRow`,
V11 §2.1), of a `TotalityRule.allowFallback` target (the `generic-<family>` classes), of the only row covering a value a
`TotalityRule` without `allowFallback` requires (a `landuse` row for a live `LandUse.kind`, a `roster.government` row for
its kind, a `crisis.looks` row for its `CrisisLookKind`, a `damage.elements` row for its `DamageElementKind`), or of a
table's named row (V11 §2.1's settings form — `settings`, `structure`, `festival.staging`'s `fallback` —, whose cells its
readers read with no fallback) is refused as a dangling reference (F-EDIT, `refuse.table.required`), naming the readers,
with the alternative "edit its cells"; a delete that would leave empty a table not `mayEmpty` (V11 §2.1) is refused the same way; a pack's such
op is refused at load, the row standing, reported (V11 §3.2.3). The editor shows each cell's provenance, its calibration
status (`dist/evidence.json`), whether it is an extension and the layer that set it (§7.6).

**4.2 The siting rulebook's edits and the declarations.** A class's profile cell (`profile.emits.smell`), a family row, a
signature pair, a goods row, a ladder step, a wall barrier row, a kind mapping or any row of V11 §3.24–V11 §3.25 is an
ordinary cell. Two **document-only tables** (file f item 380; registry row 76; shipped empty, holding only document
overrides) carry the map-side declarations the owner's rules require, so they too are row operations with undo, never
written to the dossier (item 20). Their shape is the union both editing volumes need (V09 §2.6 maps each
screen to a cell here and V10 §4.1's encoders write only these cells):

* **`siting.declared`** — item 104 (a) (1)'s author declaration, four KEY FORMS:
  - the kind keys — `uid:<localUid>` (a custom kind), `cat:<catalogId>` (a catalogue kind) and `cls:<class>` (a roster class
    no dossier record binds) — each admitting `{ profile?: Partial<SitingProfile>; familyWeights?: Record<string, 0|0.5|1|2|3>
    /* per family, × that family's soft terms for the kind's members — a family the cell does not hold
    multiplies by 1; hard needs unscaled */; quarter?: Id /* a district,
    or a named quarter record */; place?: Id /* a plot or a district */; split?: false /* the kind's members stay one site
    each (item 105 (h)) */ }`; a kind row shapes every member of the kind;
  - `use:<use address>` (ONE institution) admitting `{ place?: Id; pin?: Id; split?: false; specialisation?:
    'stepped_temple'|'terraced_palace'|'tiered_tower'|'none' /* item 110 (c): held, exempt from the chance and the cap
    (V11 §3.24.3); 'none' refuses a generated one */ }`, orphaned when its use goes, as a link key is.
  §7.7's assignment remains the route for a dossier institution's place when the port writes it; a `use:` row is the user's.
* **`siting.linkEdits`** — item 105 (j)'s link pins and cuts, keyed `<consumer use address>/<good>`, cells `{ bindTo?: Id
  /* a provider use */; avoid?: Id[] /* providers never bound */; cut?: boolean }` with three meanings: `bindTo` keeps that
  supplier whatever the nearest-provider rule says; `avoid` cuts the listed ones, the next nearest serving; `cut: true`
  alone stops the good at that use — its supply term scores 1 (neutral) and no link binds.

Item 101's toolkit reaches them through its declare and adjust verbs — declare this custom kind's quarter, place this
institution here, pin, avoid or cut this link, merge this split, build this temple in tiers (or never in tiers). The tool
mapping and the screens are V09's, and V09 keeps no store of its own for these declarations: its gestures write these two
tables (V09 §2.6); the family ids and sentences are V11 §3.3.1's. The clerk's tool API (V10) writes the same rows.

**4.3 Locality.** A table edit re-derives exactly the entities whose recorded slices cite a changed slice (§7.6). The slices
a placement records (S10b's `DerivationRecord.slices`) are the class row, each derived row's two source rows (the class and
its family or pair row, V11 §2.9), the goods rows its supply terms read, the `siting.web` row, and — for a use a
declaration or link edit touches — a **`match` slice keyed by the binding key** (`uid:…`, `cat:…`, `cls:…`, `use:…` or the
link key), so inserting a `siting.declared` or `siting.linkEdits` row re-derives only the uses that cite that key, never
through §7.6's first-reader fallback. Because a changed siting weight can move a placed use, the re-derivation of a
PLACEMENT is S10b's `relocation` request in the least-disruption order (§4.7 S10b; J-V11.14) with the fate report: by
default every placed use whose present plot still passes its hard rows is **kept** and listed with the score it would gain
by moving; the user confirms moves per use or all (the fates stored in the `editTable` event, §7.1). Template, heights,
material, naming and climate edits re-derive by §7.6. A `dossier.kinds` edit re-binds the records of that kind through the
port's next digest (V08), a dossier-derived change with least disruption. The item-109, item-110, items 111–119 and items
122–124 tables re-derive by V11 §2.10's rows (standing generated structures kept and listed; removals held; the looks of
items 117, 118, 122 and 124 and item 123's damage redraw only).

**4.4 Lifecycle of each edit kind** (§7.4's columns; only what differs from `editTable`'s row; the tables' own rows are
V11 §2.10's):

| edit | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| a registry-table cell or row | `editTable` | the loader's chain | the log | re-derive by slice (4.3) | inverse row op | orphan on a changed base row (§7.6) |
| a family, pair, goods or web row | `editTable` | `resolveSiting` | the log | re-derive the placements citing the source rows, kept by default (4.3) | inverse row op | orphan |
| a `siting.declared` kind row (`uid:`, `cat:`, `cls:`) | `editTable` on the document-only table | item 104's resolver, S10b | the log | the kind's uses re-sited by least disruption through the key's match slice | inverse row op | a binding key that no longer resolves is orphaned and reported |
| a `siting.declared` row (`use:`) | `editTable` | S10b, S11 (`specialisation`), the web's split test (`split`) | the log | that use only: re-placed, re-massed (a changed specialisation) or merged | inverse row op | a use address that no longer exists orphans the row |
| a `siting.linkEdits` row | `editTable` | S10a / S10b's link binding | the log | the consumer's placement re-scored | inverse row op | a use address that no longer exists orphans the row |
| a `raisedWays` row set below CITY | refused (the owner's rung gate) | — | — | — | — | — |
| a `delete` of a row readers fall back to or need, or of a named row (4.1) | refused (`refuse.table.required`) | — | — | — | — | — |
| a setting pack | `adjust` of the pack list | the loader | recipe and `packs` block | Re-derive from the pack's first reader stage (§7.6) | the second `adjust` | the pack's rows orphaned by `baseVersion` |

**4.5 The clerk's view.** The clerk (V10) and the siting panel (V09) read: `why(use)` — `PlacementSolver.explain` (file f
item 311) reports the top rows by id (V11 §2.4) in `WhyPull.row`, each resolved to its sentence (a family's `says`, a pair's
`reason`, a class row's note, a supply edge's good, a row's `says` of V11 §3.24–V11 §3.25: why a raised way stands, why a
wall is here or patched, why a stair and not a ramp, why a class may not stand on a deck, why a temple is stepped, why a
dry town hugs its water); `explainRow(table, key)` — the row, its provenance, its readers and the entities citing its
slice; and `profile(class)` — the compiled profile with each cell's source (family, class delta, custom-resolution rung).
V10 implements the last two as `query row` and `query profile`, and `query rule` reads every item-110 row with its `says`
(`raisedWays`, `terrace.*`, `deck`); the three specialisation ids enumerate as `spec/…` rows with their plain words —
stepped temple "a temple raised on stepped platforms", terraced palace "a palace on stepped terraces", tiered tower "a tower
of stacked tiers" — carried by a designation through `Use.specialisation` (V11 §3.24.3; V10's CVR-V10-12). Every answer
names rows, never a paraphrase of a rule the tables do not hold; an unwalled side names its `WallBarrierRow`, a record's
members its `LadderStepRow`, a link its `sup/…` row and its binding.
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

**7.1 Content invariants** (compile-time; each a failing build; T-V11-0 runs first at C1's exit and in every seat that
writes a row):

| id | test | bar |
|---|---|---|
| T-V11-0 | the shipped sources compile: every invariant below holds on the rows as written in this volume, and T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 hold on V07 §2.4's `v.` rows as on every class (V07's T-V7-56); the preset checks of V11 §3.2.1 step 4 hold under each registered preset whose file ships — `NG`'s among them from V01's M5: no `presets.NG` entry off `hood.constants`, and the named off forms at their off values under `NG` | 0 failures |
| T-V11-1 | registry closure and readers: (a) every table any design document names has a registry entry — a scripted grep of the design and the volumes for table ids, `.json` names and the `tables/…` and `dossier/…` path forms (V04's `tables/dossier/sanitation` and `tables/dossier/subterranean` among them), the item-110 cells `terrace.slopeMin`, `terrace.stepMinCm`, `viaduct.minDropM`, `raisedWays.structure.stripMarginM` (§4.6 S8's strip) and the deck row, the application's and the clerk's tables `toolkit.json`, `messages/<locale>.json`, `clerk.ops` and `clerk.content`, V01's `way.surface` and `squares.quota`, the base settings cells `reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM` and `view.zoomOutMarginStops`, the owner items' tables (`history`, `history.events`, `walls.condition`, `walls.patchMaterials`, `grandeur.ceiling`, `season.*`, `festival.*`, `perf.qualitySpend`, `crisis.looks`, `crisis.map`, `damage.elements`, `damage.materials`) and the prose keys of V11 §3.24.2's and V11 §3.24.1's name maps (the span rule's `raised.vaultShare`, `raised.vault.maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `raised.vaultCap`, `raised.deckDepthCm`, `raised.supportFoundationCm`, file f item 244's slide bound and `retaining.stateSnapCm`, each resolving to a live calibratable column of row 80's `structure` or row 79's `settings`) — and every entry has its file; the catalogue count is read from `REGISTRY`; (b) readers complete: in the integration suite that loads every shipped package (the golden tooling's, §13.3), the loader hands each stage and each epoch phase a `TableView` tagged with the StageId of the stage function that reads (V11 §3.1's *Readers*), which records every table it reads; over the golden fixtures at every rung of both products, with three `'history'` epochs and one history replay, every recorded (stage, table) pair has the stage among that table's compiled `stageReaders` (the `S5` group expanded); a listed stage no run records is reported, never failed; and the source manifest's `stageIds` equals the stage registry's ids with every shipped package loaded | 0 missing; 0 unlisted stage readers |
| T-V11-2 | totality: `dossier.kinds` covers the line's 280 catalogue kinds; `dossier.archetypes` the 17; every profile family named by V08's `tags` and `categories` rows exists; every band-keyed table has a row or interpolates for every band of `prosperity.bands`; every QUARTER kind names an identity row and every `definedBy` is a class id; every pair of `dossier.catalogue`'s `ladderPairs` is a `dossier.ladders` row or on the uncatalogued list; the burial kinds (`burial_ground`, `graveyard`, `parish_burial_grounds`, `burial_grounds_and_charnel_house`) form one ladder chain; `landuse` covers `LandUse.kind` (`garden` included); `history.events` covers V08's `historyEvents` keys and `none`; `grandeur.ceiling` the six rungs; `roster.government` every `GovernmentRow` kind; `season.leaf` every deciduous species of the climate rows' woods; `walls.patchMaterials` at least two rows admitted for every wall kind and culture; `festival.decorations` every rung and `SKY`; `festival.motifs` every culture of V11 §3.20.3 and the four seasons; `festival.staging`'s `fallback` the four festival kinds | 100 % |
| T-V11-3 | identity: no key reused from the retired list; every `ref` column resolves; every `defaultRow` is a live key of its table; every class id referenced by any table (kinds, covers, pairs, identities, villageForm, government, specialisations, deckOk rows, landmark claimants, history-event `uses`) exists; every derived row's `to` lies in V11 §3.3.3's feature-class vocabulary; every V07 row is keyed `v.<id>` and every `villageForm`, `villageSeat` and archetype `village.class` / `elseClass` names a `v.` key and nothing else (V11 §2.9); every `split.works` and `split.shop` is a template-family key of V11 §3.6.1; a named row of the settings form (V11 §2.1) holds exactly the columns whose `row` names it, and a keyed row none of them; every key well-formed and unique within its table | 0 dangling |
| T-V11-4 | coherence of a class row: every class row names its ONE family; the compiled `competition.mode` is `neutral` for a `singular` class and `cluster` for a `district-defining` one; a `district-defining` class has an identity row that names it; a hard family-derived row only for a `NeedSpec` marked hard; weights in `powers` and `sectors` sum to 1 ± 0.001; a coverage row's `per` and `target` inside their ranges (both > 0); the display cells: every class row — the `v.` rows and the generic rows included — has a non-empty `label`, unique within its namespace (V11 §2.3), no synonym equal to a label of its namespace or to its own, a `commonness` in [0, 1] — on a town-and-city or `v.` row compiled, never stated in its source, and equal to V11 §3.5.1's rule recomputed (V07's T-V7-56 recomputes the `v.` rows'), 0 on a generic row — and an `icon`, where compiled, that is a V09 §5.1 sprite id; every profile family, good, district kind, patch material, crisis look and shipped style sheet row has a non-empty `label`, the crisis looks' labels unique, the non-alias families' labels unique and, from the change that ships the glyphs, each with its `fam.<key>` icon; every non-alias profile family row one `findGroup`, each of `FindGroup`'s nine held by at least one family (V11 §2.3's lexicon) | 0 violations |
| T-V11-5 | no compiled profile both emits a nuisance at level 2 or more and is sensitive to it at level 2 or more (V11 §3.3.2) | 0 |
| T-V11-6 | derived rows per class ≤ 48; shadowed derived rows listed | bound holds |
| T-V11-7 | every template family names a symbol role and a heights row; every structure role is in the role table; every class's template compiles for every band | 100 % |
| T-V11-8 | every cover row's front class has a template row at the band; every concealed class has ≥ 2 fronts per band | 100 % |
| T-V11-9 | provenance grammar (§17.1 (6); file f item 534): every cell's source parses; every `ref:` names a behaviour (and its P-id for `(code)`); every `general` names its practice; `sf:` names a file and a baseline; no `corpus` source except item 69's palette targets and `historical:<frame>` preset rows with evidence; every owner-rule cell stamped (V11 §3.2.1 step 4); the parity presets resolve every `option` cell — `VG` every one of a village-read table and no other (step 4), the source manifest's `productStages.village` equal to the stage ids `ProductDecl('village')` registers, conditional registrations included (checked in `@plat/village`'s suite, where both load); under `VG` a categorical cell of any other table resolves to its `MFCG` entry; `NG` resolves every `option` cell through its `MFCG` resolution, its own entries on `hood.constants` alone | 100 % |
| T-V11-10 | determinism: two compiles of the same sources on two hosts give byte-identical dist trees and manifests; `resolveSiting`'s output hash stable across hosts; the pinning hash unchanged by a provenance-only change | identical |
| T-V11-11 | clean room: the hashed scan (§17.1 (5)) over the dist tree and the corpora — no list hit, no reference identifier, no study-reference proper noun (V11 §3.20.6) | 0 unreviewed hits |
| T-V11-23 | item 109's rows: every `under.*` cell in its declared range; the dig depth factor non-increasing with depth; the ancient-culture weights sum to 1 at every relief; the persistence shares non-increasing in V11 §3.23.5's order; every class resolves a dig `classRow` | 100 % |
| T-V11-25 | crypts: `cathedral` and `great_temple` are `always`; every `always` class has `cryptM2` and its minimum exceeds every `basement` class's maximum; every `basement` class's template family has a cellar row above 0 at some band; no class outside the worship and monastic families and their generic classes is `always` or `basement` | 100 % |
| T-V11-26 | catacombs: the caps do not decrease with the rung; every chance in [0, 1]; `quarryOssuary` 0 at TOWN; every rung has an `order` entry, each a burial-face class or `quarryOssuary`, METROPOLIS's starting with `network`; no source names a church-family class or a crypt | 100 % |
| T-V11-28 | goods totality: every good has a producer (a class, a site land use or deposit, or kind `import`) and a consumer (a class edge or a `demand` other than `classes`) | 0 orphans |
| T-V11-32 | item 110's rows: (a) `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm`, `stepMinCm < stepMaxCm ÷ 2` (an intermediate terrace's two walls each above `stepMinCm`, §4.7's step regions), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` and `flatDepthM ≥ minTerraceDepthM`; (b) `raisedWays` holds exactly the six CITY and METROPOLIS rows and its key admits no other rung; (c) no `deckOk` kind on an `always`-crypt class or a `fire` ≥ 2 class; (d) every specialisation row's `composition` is a key of V02's `composition.json`, its class a `roster.classes` row, its `heights` a `heights` row; (e) no specialisation row for a shipped culture other than `mesoamerican`, `south_asian` and `east_asian`; (f) `ways.crossing` covers every `WayClass`; (g) `deck` holds the sixteen kind × band rows; (h) each material's `raisedWays.structure.maxClearSpanM` ≥ its `pierSpacingM` upper bound × `slideMaxFactor`, so a slid station's span never passes the clear-span bound | 100 % |
| T-V11-37 | the village readings and the wall kinds: every `GovernmentRow` has a `villageSeat`; every `dossier.archetypes` row a `village` cell with exactly one of `class`, `pin`, `ruin`; `guildhall`, `castle` and `palace` carry no `villageForm`; `citizen_militia` and `gates_if_walled` map to `@none`; every `walls.barriers` row carries an `arcKind` column, null only on `open`, `sheer` only under the `islandRim` rule; the never-calibrated rows of V11 §3.1's *The count* carry `calibratable: false` on every column; no switch cell — `siting.web.orientEnabled`, `siting.web.splitEnabled`, `terrace.enabled`, `history.replay`, `walls.condition.atGeneration`, `grandeur.ceiling`'s `enabled` — is calibratable | 100 % |

**7.2 Behaviour bars** (the §13.2 statistics bench, over ≥ 200 B-CITY seeds per rung with a random-placement baseline that
keeps each class's count and district allocation; every bar a correlation, never a guarantee — items 103 (e), 104 (g),
105 (k), 106 (h), 107 (g), 108 (f), 109 (i), 110 (f); the mechanisms' own bars are the base's and the owning volumes', these
are the rows' bars; V12 §3.6b runs the share, sweep and paired forms):

| id | measure | bar |
|---|---|---|
| T-V11-12 | family effects: for each nuisance with ≥ 1 emitter at level 3 in a town, the median distance from sensitive-≥ 2 members to the nearest emitter exceeds the baseline's; tanneries downstream of the median dwelling in ≥ 80 % of river towns; `thieves_den` to the nearest law member above baseline; shops' distance to the nearest market below baseline | each shift significant at p < 0.01 (Holm-corrected) |
| T-V11-13 | coverage: for every class with a coverage row whose unit is not `settlement` (V12 §2.7 refuses a `settlement`-unit class, `notApplicable`: its coverage is the roster clause), the share of units served, by V12 §3.6's `servedShare` on the class's compiled unit (every district as V11 §2.3 defines it; a church class's parish read in its households form, J-V12.59), exceeds the baseline's by ≥ 0.1; with `coverage.rosterWeight` 0 the roster, and with the coverage family's weight 0 the placement, byte-identical — the `item103.coverage` registration of B-CITY's 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C2 seat (the village `v.` rows lie outside the roster clause, since the option adds no member at the `territory` rungs, V11 §3.5.1) | holds; no-op pins |
| T-V11-14 | supply web: multi-output producers nearer their dominant output's consumers, shared-provider consumers nearer it, source-oriented classes nearer inputs and market-oriented nearer demand than baseline; consumer-to-provider distance within `comfortM` in ≥ 70 % of links | significant; ≥ 70 % |
| T-V11-15 | naming: across 100 seeds per rung, ≥ 98 % of district and way names unique within their scope before suffixing; every name ≤ 5 words; the profanity filter's hit rate ≤ 0.1 % of draws, each re-drawn; folk forms ≤ 3 syllables; no raised way named with a street word; an arch-vault run named by `naming.vaults` | holds |
| T-V11-16 | custom content: fixtures carrying only a category; a category and tags; an archetype; the optional definition fields; an active chain; a chain of one node; a keyword with a class or a specialisation cell; a record with no tag, category or archetype — each resolves, sites and reports its rows; chain nodes closer than baseline; flow order (resource farther from the market than the final seller) in ≥ 75 % of placements; zero placement failures | holds |
| T-V11-17 | ladders: on the 155 surveyed dossiers every COUNT, QUARTER and GUILD record shows members inside its range, monotone over a population sweep; no pair double-counted; each SIZE record one building; a COUNT of pins (`multiple_water_sources`) never lowers the wells below their own coverage count and never clamps them to a top; a village-to-town promotion keeps the churchyard's burial face and its opening year | 100 % |
| T-V11-18 | dispersal (J-A72.46) with the web's weights on: the share of districts holding a dispersed class within ± 0.05 of the reference arm under V11 §3.7.4's web off form, by `servedShare` with `unit: 'district'` (districts of ≥ 30 households for this reading alone — V12's 105 (k) `noRegression` row) | holds |
| T-V11-19 | walls: item 106 (h)'s barrier fixtures with these rows — river-loop neck only; cliff-backed coast zero wall edges on sheer arcs; 100 % of quays reachable; a sea-threat dossier's quay wall with sea gates; an island's rim closed with no wall; every exported `closure` feature from a row that closes with wall `none` and carries that row's `arcKind`; a village palisade by a fordable brook closes that water arc with no wall; an open-plain control arcs `open` everywhere (a full ring); a one-arc boundary one closure feature | holds |
| T-V11-20 | cost: S10b's time with the derived rows ≤ 1.1 × without, at CITY and at METROPOLIS (§12.4's rows, file f item 477) | holds |
| T-V11-21 | parity: with the `MFCG`, `FTG` and `VG` presets (each from the milestone its file ships, V11 §8; `VG` on the village-read tables, V11 §3.2.1 step 4) every family, pair, coverage, web and wall-profile extension is 0 or off, or at its off form's value (V11 §3.7.4: `bulkyWater`, `perishableShort` 1), every item-109 chance 0, and every switch and cell of V11 §3.24.0 at its off form; with `presets.FM` every `roster.specialisations` chance, every `deck.offer` and every `deck.landmarks` chance 0; V11 §3.7.4's web off form is exactly the set they resolve for its cells, and with it applied the placement is byte-identical to the base's without item 105 (item 105 (k)'s no-op pin); B-REF's parity rows (§13.5) hold unchanged | holds |
| T-V11-22 | emulation: the classes' authored `ref:` rows reproduce their references' behaviour in the parity presets (noxious trades downstream and extramural, mills on water, inns at gates, warehouses at the harbour) at §13.5's rates | within §13.5's tolerances |
| T-V11-24 | ancient-culture distinctness (M6-U, V04's U3): V12's `paired` measures at each culture row's centre values against B-CITY's fabric, 100 seeds per row | every row differs on ≥ 2 of the 3 measures in ≥ 90 % of seeds (V11 §3.23.4's fallback on a miss) |
| T-V11-27 | relative siting kinds (unit, synthetic rivers and a fixed wind): `upstream` / `downstream` / `downwind` / `upwind` with a `to` score 1 on the right side, fall with the course or bearing, and score 0.5 where no member lies on the plot's network; a member at distance 0 scores the row's full value | exact on the fixtures |
| T-V11-29 | good words: on the 155 frozen dossiers at least 95 % of label occurrences (`outputs`, mapping.md row 44's lists) match a good; every unmatched label listed in the manifest | ≥ 95 % |
| T-V11-30 | item 102's guard: `w_sun` 0.02 against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands | 0 plots (the fallback of V11 §3.3.5 on a miss) |
| T-V11-31 | item 110's no-op pin: 200 B-CITY seeds per rung, TOWN to METROPOLIS, with the six switches of V11 §3.24.0's item-110 rows off (V03's `exposureAllStoreys` among them), byte-identical to the pre-110 goldens — the `item110.raised`, `.terrace`, `.deck` and `.stepped` registration of B-CITY's 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C3b seat; with `raisedWays` alone on at TOWN, still identical (no row below CITY) | identical |
| T-V11-33 | raised ways, over 200 seeds per rung: none generated at TOWN; counts within the caps at CITY and METROPOLIS; every one carrying a reason; aqueduct candidates more frequent on arid and soluble sites than on temperate alluvial ones (V11 §3.24.6's worked check measured) | 0 at TOWN; 100 % within caps and reasoned; p < 0.01 (Holm) |
| T-V11-34 | terraces: every generated retaining wall stands on a levelled unit above both thresholds; none on a plain-relief site whose slope stays below `slopeMin` (V12 §3.4.2's model metric `retaining.onFlatM`, 0 by rule, reported nightly); a wall's material by its band's row at every rung it stands | 100 %; exactly 0 |
| T-V11-35 | decks: each kind's offer rate within ± 0.05 of its row; no class outside `deckOk` on a deck; every deck building's footprint within its row's band; a bridge chapel carrying a dossier crypt record never stands on the deck (the per-use rule) | holds |
| T-V11-36 | specialisations: a `mesoamerican` culture fixture yields a stepped temple; a Western fixture yields none; stepped buildings never exceed the cap; a declared specialisation is held through a regeneration | holds |

**7.3 Parity metrics.** This volume owns no new reference metric: the parity of class counts per 1 000 people against FTG's
documented roster shape and MFCG's ward mix is §13.5's (the use-mix entropy and the per-band built-land share); the rows
here are calibrated to them at M2b (V11 §8), and the corpus stage re-signs them (§13.9). **One descriptive row** (no pass
bar): buildings per 1 000 residents by profile family on B-CITY against the FTG capture's counts per family (numbers only,
from `baselines.json`, V12 §2.3), reported at M2b so a family far off the reference's rate is visible before the corpus
stage.

**7.4 The owner items 111, 113–119 and 122–124, the base settings row and the edges.** Each item's behaviour bars are the
base's (§13.2's T111–T119 and T122–T124 groups) and the owning volumes'; these are its rows' bars, and each no-op pin is a
NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form (E-20):

| id | test | bar |
|---|---|---|
| T-V11-38 | item 111's rows: (a) every `dry` cell in its range; the oasis chance 0 on every non-arid row and `aridMin` admits the `arid` row alone; the sun cell 1 on the temperate and cold rows; `water.wellsPerHa` covers every ground class; (b) the no-op pin — the off form of V11 §3.24.0 on 200 seeds per rung of an arid and a temperate site, byte-identical to the base without item 111 — the `item111.water` registration of the arid and temperate sites' 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat | 100 %; identical |
| T-V11-39 | item 113's rows: (a) `minYears ≤ burialYears ≤ maxYears`, `symbolicQuantile` in [0, 1], every factor in its range; every `history.events` row's effect fields consistent (a `hazard` row names a V06 hazard kind, a `uses` row live classes, a `population` factor > 0, a `destroy` row a threshold in [0, 1]); the factored burial age of V11 §3.25.2 recomputed on four fixtures (a flooded alluvial town, a rebuilt town, a rock-built town, none) equals the formula; (b) the no-op pin on clause (a)'s four fixtures — `replay` false byte-identical to the one-click path, the `item113.history` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-71 takes the replay's bars) | 100 %; identical |
| T-V11-40 | item 114's rows: (a) `meansLow < meansHigh`; every `generation` row's shares sum to 1 ± 0.001 and no share of `patched` under means `high`; every patch row's `material` a `materials` key and its `look` a §8.2 role; at least two rows admitted for every wall kind and culture, their labels unique within a kind; (b) the no-op pin on B-CITY's 200 seeds per rung — the off form reproduces the neglect and repair rules before item 114 byte for byte, the `item114.condition` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-73 takes the transitions' bars) | 100 %; identical |
| T-V11-41 | item 115's rows: (a) the THORP, HAMLET and VILLAGE rows admit only `single`, `L`, `T` dwellings, no tower, turret, gatehouse or court, the manor at most 0, 0 and 1 with their requirements, and each is stamped `'115 (b)'`; TOWN and above `all`; every family name a V02 composition family; every `settings.grandClasses` entry a live class key; every column `calibratable: false`; (b) the no-op pin on B-CITY's 200 seeds per rung — `enabled` false, and at TOWN and above with it true, byte-identical to the base without item 115: the `item115.off` registration of them and, at TOWN, CITY and METROPOLIS, the `item115.ceiling` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-74 and V07's T-V7-63 take the village and epoch bars) | 100 %; identical |
| T-V11-42 | item 117's rows (takes T117-3): every climate row's bands lie in 0–51 and resolve to weeks in cyclic order; every `season.surfaces` row covers all 52 weeks with no gap (its phases cyclic, none of zero length); the `arid` row draws no ice and no snow; `season.water`'s lags non-decreasing from `pond` to `seaShore` and its `freezesFrom` non-decreasing; a temperate-deciduous wood's species palettes give at least five distinct colours; every cover row `start ≤ end`; no season table has a StageId reader (a look only), so the model hash is identical in every week (the base's T117 bar measures it) | 100 % |
| T-V11-43 | item 118's rows: each rung's decoration rows name only its own items — THORP's ⊆ {garland, bonfire}, HAMLET's ⊆ {maypole, bonfire, garland}, VILLAGE's ⊆ {maypole, bunting, stall, table}, no TOWN, CITY or METROPOLIS item at a smaller rung; every staging key maps to a place kind and the fallback covers the four kinds; the generic festivals' windows lie in 0–51; no festival table has a StageId reader (a look only); every column of rows 102–105 `calibratable: false` | 100 % |
| T-V11-44 | (a) the base settings row: its four cells equal the base's constants (3; 120 m; 25, 10 and 5 m; 1 stop) and are `calibratable: false`; (b) `perf.qualitySpend`: every row names a registered StageId (in its own readers), a bar id and a `CalibrationRun`, with `extraMs` > 0; (c) the sensitive kinds: `slave_market`, `trafficking_den` and `kidnap_den` carry `none` 0 concealment rows and ≥ 2 fronts; on a fixture dossier a record of each kind without `knownTo` draws its front in the players' view and its function in the secret view, and one with `knownTo: 'public'` draws its function in both | 100 % |
| T-V11-45 | the edges of V11 §3.26, one fixture each: (a) the data edges of the family, pair and goods rows; (b) the cart-class crossing beyond 1.5 × `rampMaxGrade` (a 4 m step across a `through` way with a short run): re-cut or not levelled, never a stair or a gap; (c) the coverage units' edges (a district with no residential plot; a member at distance 0); (d) the families and pairs at every rung, THORP to the METROPOLIS cap; (e) the district kinds' edges; (f) the identities' edges; (g) an `editTable` on an identity, kind, ladder, custom-chain, government and `villageForm` row — only the recorded readers re-derived, held edits kept, the undo byte-identical, a load replaying the pinned versions, an older pinned set upgraded; (h) the pseudo-class facts under the toggles and the parity presets; (i) concealment with one standing front and at a village rung; (j) the degenerate wall arcs; (k) no biome, a missing climate or land-use row; (l) the material and decline edges; (m) no era or region, a culture naming no era; (n) naming under the parity presets and a corpus pack; (o) the government, religion and household edges; (p) a catacomb at a rung with no church and a zero-year epoch; (q) item 110's degenerate strokes, decks and short raised ways; (r) the combinations of V11 §3.26, one row edited per combination and listed rung; (s) a row `delete` of a table's `defaultRow`, an `allowFallback` target, a totality rule's only cover, a named row and the last row of a table not `mayEmpty`, by `editTable` and by a pack — each refused naming its readers (the pack's op at load, the row standing), the tables editor's deletes of `crisis.looks`' `siege` row, `damage.elements`' `roofBay` row and `crisis.looks`' `settings` row among them, each refused with the tables unchanged; a cell edit of the same row applies; (t) the crisis tables' edges (an unmapped word, the empty `map` set, a severity outside [0, 1], a headcount of 0, a zero `scale`); (u) the damage tables' edges (levels 0 and 1, a material with no row, a range edited out of its shares); (v) the weather cells' edges (a moment with no live kind — by the week, and by the hour under `light: 'time'` —, a kind whose `hours` exclude the view's hour under `light: 'time'`, a site factor on an absent kind, an edit past a hard rule, a `light` other than `'time'`) | every stated outcome; 0 crashes, 0 whole-map retries |
| T-V11-46 | item 122's rows (takes T122-4): (a) the closed mapping — every word of the catalogue manifest's `crisis.stressors` list (V08 §2.4) has its `stressor` row, every word of its `crisis.archetypes` list its `archetype` row and every word of its `crisis.events` list its `event` row, each naming a live `crisis.looks` kind or `none`, no two rows sharing a `from/key`; (b) `crisis.looks` holds one row per `CrisisLookKind` (its `coversEnum` totality rule's compile form, V11 §2.1); every `scale` pair `lo ≤ hi`, inside its range and non-decreasing from THORP to METROPOLIS at each end, the camp places' rows in m² and the others' shares in [0, 1]; `lookLevel` on the `disaster` row only, inside the `ruined` share (V06 §3.23 (2)); the camp looks' priorities in item 122 (c)'s order, `siege` and `blockade` before `quarantine` before `refugeeCamp`; (c) every `settings` cell inside its range; (d) no crisis table has a StageId reader (a look only) | 100 % |
| T-V11-47 | item 123's rows: (a) `damage.elements` holds one row per `DamageElementKind` (its `coversEnum` totality rule's compile form, V11 §2.1), each range `0 ≤ lo < hi ≤ 1` inside the shares of its `states` (V06 §3.23 (2)'s thirds); item 123 (c)'s order — `partition`'s upper end at most `outerWall`'s lower, `upperFloor`'s lower end at most `groundFloor`'s, each crypt kind's lower end at least each cellar kind's; (b) every `damage.materials` rate inside its range, `timber_frame`'s above every masonry row's (`ashlar`, `rubble`, `brick`, `dry_stone`), every walls material of V11 §3.19.3 resolving to its row or the default row; (c) `defaultAgeYears` inside its range; (d) no damage table has a StageId reader (a drawing only) | 100 % |
| T-V11-48 | item 124's rows (takes T124-3's compile clause and T124-4's row clause): (a) no snow where winter does not freeze — no `snow` entry on an arid row, on a row whose winter is `none` or on a row with no `snow` band, no `snow` or `ice` band on an arid row or one whose winter is `none`, and every other row's `snow` entries inside its `ice` and `snow` weeks, a hill site's factor included (T124-3; V12 measures the drawn weeks); (b) arid rain — on every arid row and under every site's factor, `rain` and `drizzle` at most `aridRainMaxPerHour` and in bands covering at most `aridRainMaxWeeks` weeks, none in any other week (T124-4; V12 measures the replayed frequency against the row); (c) every band inside 0–51, no two bands of one kind on a row sharing a week, every `perHour` ≥ 0, every `lengthS` lower end at least twice its kind's fade (§8.4 (i)) and below its upper end, every `hours` inside [0, 24], every site factor inside its range; (d) no weather cell has a StageId reader (a look only) | 100 % |
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

| milestone | content | exit (executed) | estimate | where in §16 |
|---|---|---|---|---|
| C0 — registry, compiler, loader | V11 §2.1–V11 §2.2, V11 §3.2; the provenance grammar; the source manifest's `stageIds` with §4.1's stages, the reader check and the recorded-read suite; every registry row (V11 §3.1), each shipped empty until its milestone (V11 §2.1); the base settings row (row 92) with its values; T-V11-1, 3, 9, 10, 44 (a) | a compile of the M1 tables byte-identical on two hosts; T-V11-1 (a) and (b) green over the base's stages; `plat calibrate register --check` joins CI at M1 (V12's T-V12-20) | 1.25–1.75 pw | M0 (b) beside `@plat/tables`' loaders |
| C1 — the M1 rows | the M1 classes (housing, food, crafts, trade, lodging, civic, worship, the outside classes) with their template families and heights; district kinds; greenery and climate rows; the era and material rows | B-CITY's M1 gate on these rows; the register green over them (below) | 2.0–2.5 pw | M1 (inside the content line) |
| C2 — the siting rulebook | profile families, class profiles, relation families and `resolveSiting`, signature pairs, goods and web settings, coverage, balance, orientation, split; the concealment and cover rows; sectors and powers; identities | T-V11-4…8, 12…14, 18, 20–22 on the bench; the register green (below) | 2.0–3.0 pw | M2b (inside the content line; file f item 532) |
| C3 — the full ladder and the tables editor's data | the remaining classes (arcane, exotic, adventuring, clandestine, military extras), the compatibility table, the document-only tables with their three key forms, exports and docs pages | T-V11-2 on the ladder, T-V11-11; the register green (below) | 1.0–1.5 pw | M3a (the tables editor) |
| C3b — item 110's rows | V11 §3.24's eight tables and the switches; the `fort` and `lighthouse` classes; the `fort` and `arena` template families; the `stepped-shrine` heights row; the structure material keys and the structures decline block; the era and culture factors; the naming additions of V11 §3.20 for raised ways, slots and terraces | T-V11-31 – T-V11-36 and T-V11-32 on the bench and the two known-city fixtures; the register green (below) | 0.75–1.25 pw | M3a, beside C3 (item 110 (e)'s second fixture and V02's tier and deck construction ship there, file f item 229) |
| C4a — the wall rows | the wall barrier and waterfront rows (item 106; V11 §3.16) | T-V11-19 on item 106 (h)'s barrier fixtures; T-V11-37's `walls.barriers` clause; the register green over them | 0.5 pw | M2b, with item 106's base (inside the content line) |
| C4b — the SettlementForge rows | `dossier.kinds` (280), archetypes, category synonyms, keywords, good words, ladders; item 122's `crisis.map` rows (V11 §3.25.9) | T-V11-2, 16, 17, T-V11-46 (a) and T-V11-37's other clauses on the 155 frozen dossier fixtures and V08's census lists (the dossier row sets are not calibratable) | 1.1–1.6 pw | M-SF (V08's milestones; §16's staged content line) |
| C5 — naming | the grammars of V11 §3.20 and the corpora of V11 §3.20.5 authored and scanned | T-V11-15; the register green (below) | 1.5–2.0 pw (O13-core at M2b, full at M3b) | M2b and M3b |
| C6 — provenance audit and calibration hand-off | the audit of the register entries every earlier exit wrote (V12 §3.11); every default cell's `ref:` and `extension` audited; the corpus stage's re-sign list is those entries | M4's table-provenance audit | 0.5 pw | M4 |
| C7 — the module's content | professions, items, services, prices | M4b's exit; the register green (below) | 1.0–1.5 pw | M4b |
| C8 — item 109's rows | V11 §3.23: the cavern cell, the ruin chances, the four ancient-culture rows with their monument cells, the persistence order, the void rank, the dig and opening rows, the catacomb rows; the crypt rows of V11 §3.5.8 checked against V03's ring | T-V11-23 – T-V11-26 (compile), T-V11-24 (bench); the register green (below) | 0.75–1.0 pw | the underground layer's milestone (M6-U, J-VI.22), reviewed with V04's U3; §16's staged content line |
| C9 — the rows of items 111, 113–119 and 122–124 | V11 §3.25: item 111's dry-country cells and the `garden` row; item 113's `history` cells and event rows; item 114's condition cells and patch rows; item 115's ceiling; item 116's margin cell (row 92); item 117's season cells and tables; item 118's festival tables; item 119's empty `perf.qualitySpend`; item 122's look rows and settings (its `map` rows C4b's); item 123's damage ranges, default age and rates; item 124's weather cells | T-V11-38 – T-V11-44, T-V11-46 (b) – (d), T-V11-47 and T-V11-48 at the exits of the milestones that build each item's base mechanism (§16's rows for items 111–119 and 122–124: item 111's with S0–S1's oasis and S3's pull; item 113's with V06's E9; item 114's with V06's walls step and §7.7's DR41; item 115's with S10b's rung ceiling; items 116–118's with §8.8's limit and §8.2's season and decoration rows; items 122 and 124's with §8.2's crisis looks and weather effects at M3b; item 123's with V03's plan step that draws a decayed or ruined plan, V03 §8); T-V11-46 (a), the closed mapping over V08's census lists, is C4b's at M-SF; the register green (below) | 1.25–2.0 pw | beside each item's base milestone (§16) |
| **total** | | | **13.6–19.1 pw** | **§16's first total** carries C0–C3b, C4a, C5–C7 and C9 — 11.75–16.5 pw inside its content line (which also prices presets, symbols and textures): 8.25–10.75 for the rows outside file g and 3.5–5.75 for file g's (C2's g share 1.0–2.0 for items 102, 103, 105 and 107; C4a's 0.5 for item 106; C3b for item 110; C9 for items 111, 113–119 and 122–124); **§16's staged content line** carries C4b and C8 — 1.85–2.6 pw (the 280 kind rows, items 104 and 108's dossier rows and item 122's mapping; item 109's rows); file g's rows in all 5.35–8.35 pw (file f items 532, 568; J-V11.117) |

**The register at every exit** (J-V11.69). Each content milestone's exit — C1, C2, C3, C3b, C4a, C4b, C5, C7, C8, C9 —
includes `plat calibrate register --check` green over the tables it lands: one `target.column` entry per calibratable
column (V12 §3.11), written by the seat landing the milestone, never deferred to M4; C6 at M4 audits those entries and
hands them to the corpus stage. So V12's provisional-number lint, which runs from M1 (T-V12-20), never meets a V11 cell
without its entry.

**The non-g tables' entries** (J-V11.76). V12 §3.11's lines cover file g's rows. The
tables C1, C3 and C7 land outside file g take their `target.column` entries by the lines below, in V12 §3.11's
form, `owner` V11 unless a line says otherwise. The two metric families are V12's (V12 §2.1; J-V12.65): `bar.<id>` (the
verdict statistic of one registered bar) and `frame.<table>.<column>` (a corpus frame's value for that column,
`notApplicable` until M-CAL). **The bars V11's entries name are registered by V11's seats** (J-V11.78), each as a V12 `BenchBarDef` (V12 §2.1) in the change that writes the entry naming it. The
seat landing C1 registers the base's T16-4 — `id` `'T16-4'`, `owner` `'base'`, `statistic` the measured detour factor
(way-graph Dijkstra distance over block-raster distance on sampled pairs, unit `ratio`), `stages` `['S10b']`, `towns`
B-CITY's family and settings (`'bcity'`, §13.2), each setting's `preset` `'default'` (V12 §2.1's `PresetArm`: the recipe with no parity preset), `tier` `'milestone'`, `run` the base's check (within the factor's band,
§13.2's T16-4) — with the `detourFactor` entry below. The seat landing C2 registers T-V11-30 — `id` `'T-V11-30'`,
`owner` `'V11'`, `statistic` the number of plots whose band index differs by two or more between the prosperity field
with `w_sun` 0.02 and the same town's field recomputed from its drivers with `w_sun` 0 (§4.5; each arm's bands cut by
§4.5's rule on its own field; one seed, so common random numbers), unit `count`, `stages` `['S6', 'S10']` (the field's
drivers, the plots' bands), `towns` B-CITY at every rung, each setting's `preset` `'default'`, `tier` `'milestone'`, `run` that count with `verdict` pass at
0 — with V12 §3.11's item-102 entry at M2b. The base already holds T16-4's check (§13.2), and registering it is code in
`@plat/testkit/bars`, not base text, so no base change is needed. A `corpus` line whose column no admissible frame measures closes `fixed` at M-CAL with the
reason "no admissible frame", as V12 §3.11's g lines do. A column this volume marks non-calibratable takes no entry. A line naming several methods ("`measure` at M2b …, then `corpus` at M-CAL") is one register entry whose `stages` list them in the line's order (V12 §2.6; V12 §3.11's staged entries; X-V12-18).

| column family (registry row) | exit | method, due | metric | fallback — the pre-decided move |
|---|---|---|---|---|
| the town and city classes' roster columns `perCapita`, `min`, `firstAtPopulation`, `perOther`, `shopProb` (row 17); `roster.settings`' `unemploymentThreshold` (row 24); `roster.households` (row 23) | C1 (the M1 classes), C3 (the rest) | `measure` at M2b — §13.5's block-level use-mix row and V11 §7.3's descriptive row (buildings per 1 000 residents by family against the FTG capture) — then `corpus` at M-CAL | `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn`, `pop.perBuilding`; `frame.roster.classes.perCapita` | a use-mix value outside its band: every non-housing family's `perCapita` denominator scales once by the one factor that brings `usemix.resOnly` to its band's centre, clamped to the column's range, and the bench re-runs; a second miss makes the entries `not-achieved`, reported to the owner as a table defect (V12 §5.5) |
| `roster.settings`' `detourFactor` (row 24; the base's provisional value, §4.7 S10b), owner `base` | C1 | `measure` at M1 by the base's T16-4 (block-raster distance against the way-graph Dijkstra on B-CITY) | `bar.T16-4` | the base's: the factor refitted per rung |
| the template families' footprint and plot budgets by band (V11 §3.6.1, compiled into row 17's `template`) and the role table's `footprintShare` (V11 §3.6.5) | C1 (the M1 families), C3 (the rest) | `measure` at M1's gate — §13.5's footprint rows; the dwelling and shop areas are the targets the granularity table's plot areas are fitted to (V11 §3.6.1) — then `corpus` at M-CAL | `bldg.area`, `plot.area`, `bldg.quadSide`; `frame.*` | a residential family's median footprint outside its band: that family's footprint budgets move once by the ratio of the reference's median to ours, clamped to their ranges, and the gate re-runs; a second miss `not-achieved` |
| `roster.classes`' `undergroundAccess.prob` by band (item 64; row 17) | C1 | `panel` (V4-U5, `realism`) at U5, the underground layer's sitting | `void.*` (accessible, read beside the panel as V12 §3.11's other V4-U5 lines read it) | the panel rule (V12 §3.11); second value: every band row × 0.5 |
| `roster.districtKinds`' relation and `affinity` weights (row 18) | C1 | `measure` at M2b against MFCG's anchors (§13.5), then `corpus` at M-CAL | `district.area`, `quarter.count`, `usemix.entropy`; `frame.*` | V12 §3.6b's default (the driving weight doubles once, clamped); a second miss `not-achieved` |
| `roster.quarterIdentities`' thresholds (row 28) | C2 | `measure` at M2b against MFCG's quarter count (§13.5), then `corpus` at M-CAL | `quarter.count`; `frame.*` | the failing threshold moves once by a quarter of its value toward the band, clamped; a second miss `not-achieved` |
| `heights` (row 5) but its `stepped-shrine` row (V12 §3.11's item-110 line) | C1 | `corpus` at M-CAL (a frame's storey counts by band and district kind) | `frame.heights.<column>` | no admissible frame: closes `fixed` at M-CAL with its reason |
| the rest: `mutator.compat`'s `tolerance` (row 40); `landuse` (row 44); `climate`'s columns but `rainMmPerYear`, the enumeration `farmLayout` and file g's cells (row 43; its `dry`, `seasons` and `weather` cells and its `settings` row are V12 §3.11's g lines); `era` (row 50) and `materials` (row 49) outside item 110's factors and structure keys; the per-material `decline` rows (row 46, V11 §3.18's first table); `roster.covers` (row 26) and the `concealment` column; `roster.sectors`, `roster.powerLinks`, `roster.sectorLinks` (rows 29, 31); `roster.institutions`, `roster.government`, `roster.religions` (rows 20–22); `roster.settings`' `placement.extensionWeight`; every other calibratable class column (`priority`, the family defaults of V11 §3.5.1); `sim.*` (row 72) | C1; C3; C7 at M4b | `corpus` at M-CAL | `frame.<table>.<column>` | no admissible frame: closes `fixed` at M-CAL with its reason |

**The preset entries** (J-V11.74). The source type admits all five `PresetId` keys from C0, so no later schema change is needed. V11's `presets.MFCG` and `.FTG` entries land with their cells — `siting.web`'s four (V11 §3.7.4) at C2,
`terrace.enabled`'s at C3b. Its `presets.VG` entries on the same five cells land with V07's **V-M0** — the milestone whose
content ships the `VG` preset file (V07 §8: V-M0's exit already runs under `VG`, and V-M1 ships the
request mapping; J-V11.79) — in the change that ships that file (file f item 377), written by the seat
landing V-M0 from V11 §2.2's rule. The same change commits the source manifest's `productStages.village` (V11 §3.2.1
step 1) and writes the `presets.VG` entry of every `presetsRequired` cell of a village-read table from V07 §3.15's list,
each with the `VG` value V07 states there; no cell of any other table carries a `VG` entry, and the
compile's `villagePresetCells` equals V07's list (T-V11-9). Afterwards the seat landing any change that makes a table
village-read — V07's V-M2u, which registers V04's tail at the village subset (V07 §3.16 (1)), extending
`productStages.village` — or adds a `presetsRequired` column to a village-read table (V02's M6a on `composition.json`, a V04
rule table) writes the new cells' `presets.VG` entries by the same rule and in the same change, V07 §3.15 (3)'s list
growing with them (V07 §3.15 (3), J-V7.123; J-V11.87). Its `presets.FM`
entries (0 on V11 §3.24.0's chance and offer cells) land with V02's **M6c**, in the change that ships the `FM` preset file
(file f item 376), written by the seat landing M6c. Before then neither preset exists and no entry for it is written.
Each of those exits runs the compile's preset check (V11 §3.2.1 step 4; T-V11-0) and the register check, which passes each
entry by its `fixed:` note (V11 §2.2) with no register entry. V11 writes **no `presets.NG` entry**: none of its cells lies
in `NG`'s scope, and each resolves under `NG` as under `MFCG` (its `MFCG` entry where it has one). The `NG` entries are
V01's, on `hood.constants`, written by the seat landing V01's **M5** (W17; V01 §3.15) in the change that ships the `NG`
preset file (file f item 584); from that change every compile runs step 4's checks under `NG` too (T-V11-0;
J-V11.88).

**The readers and the application's and the clerk's tables** (J-V11.80 – J-V11.82). C0 commits `stageIds` with §4.1's stages and the reader check (V11 §3.2.1 steps 1, 6).
Every later change that registers a stage or an epoch participant — V01's stages and its `hood.fabric`, V04's tail, V05's
`SKY` and its two participants (M6-sky), V06's `EVO_*` phases and its four `under.*` adapters (E8), V07's village stages
and its two participants (V-M3) — adds each new StageId to `stageIds` and writes the id — for a participant, its
registered `stage` (V06 §2.1's `EpochParticipant.stage`; V11 §3.1's *Readers*) — into the `readers` of every table it
reads, in the same change, T-V11-1 (b) holding it from that change on (the seat that registers the stage or the
participant owns both edits; a registry row's readers are the one place the pair is written); a module reader outside
the stage graph (the close-up, a lazy rung, the application) is written by the seat landing the module's first read of
the table; and a change that makes a registered stage, epoch phase or
module read a table it did not read before — a file f item's application included (items 233, 241, 578 and 294 among them) — writes that reader into the table's registry row in the same change, its seat owning
both edits (J-V11.90). Rows 90–91 (`way.surface`, `squares.quota`)
ship their rows with V01's M2b pieces (V01 §8.1: the way-surface rule, file f item 207, and S7b (3)'s quota, file f item 301), written by the
seat landing M2b, which also writes `squares.quota`'s register entries (`way.surface` has no calibratable column); S2's
and S9b's reads of `squares.quota` arrive at M5 and are already listed. The registry holds rows 86–89 from C0, as it holds every
row (V11 §2.1's empty-table rule); each ships as its schema's empty table until its owner's milestone ships
its rows — `toolkit.json` and `messages/en.json` with
V09's shell (file f item 516, BASE M1–M3b), `clerk/ops.json` and `clerk/content.json` with V10's first
milestone that ships `@plat/clerk` (V10 §8) — the seat landing that milestone writing the rows and the owner's layer rules.

**The display cells and the span cells.** Each class row's `label` and
`synonyms` land with the row — C1 the M1 classes, C3 the rest, C3b `fort` and `lighthouse`, V05's sky rows with M6-sky,
V07's `v.` rows with V-M2 — and the district kinds', goods' and profile families' labels — the families with their `findGroup` cells — with their tables
(C1, C2, C2);
the compiler's `commonness` and `icon` from C1; the 45 family icons with V09's glyphs (V09 §5.1); the shipped style
sheets' labels with each sheet (§16's M1, M2b, M3b, M5). Rows 79–80's `span`, `slideMaxFactor`, `maxClearSpanM` and `stateSnapCm` cells
are written at C3b by the seat landing item 244's span rule at M3a, with their register entries (V12's span-rule, `raisedWays.structure`
and `retaining` lines); row 80's `stripMarginM`, the under-deck strip's margin §4.6 S8 reads, ships with item 110's rows at
C3b, its entry the `raisedWays.structure` line. The words are ≈ 0.1 pw inside C1's and C3's ranges; no estimate or milestone moves.

**Dependencies:** C0 before any stage reads a table; C1 before M1's gate; C2 needs the base's solver with file g's
terms (the coherence pass's text) and the §13.2 bench; C4b needs V08's adapter, the frozen fixtures and, for item 122's mapping, V08's census lists in the catalogue manifest; C4a the base's item-106 arc classification at M2b; C5 needs the
naming engine (§10.4) at M2b. **Risks and spikes:** (R1) the family weights' balance — a spike at the start of C2 runs
the bench with the families alone, then with the authored rows, and tunes `siting.families` weights so no family
dominates S10b's score (bar: no family's mean share of the winning score above 0.4); *fallback:* halve every family
weight and re-measure — pre-decided; (R2) clean-room list hits on ordinary trade vocabulary — allow rows with written
reasons (§17.1 (5)); (R3) the SettlementForge line adding kinds — the totality bar catches it and the fallback keeps the
map whole; (R4) authoring effort — CONFIDENCE §3.4's warning; C1 is scoped to the M1 classes so M1 never waits on the
full ladder; (R5) aqueducts too rare or too common — the spike is V11 §3.24.6's bench at the start of C3b, with its
pre-decided `perHeadL` fallback; (R6) an ancient-culture row that fails distinctness — T-V11-24 at C8 with V11 §3.23.4's
pre-decided refit; (R7) the ladder lessers of the twelve file pairs V08's re-check did not list — the ladder cross-check
(T-V11-2) fails the build until C4b writes them from the committed `ladderPairs`. C3b depends on the coherence pass's
item-110 records and V02's M3a tier and deck construction; C8 on V04's U-SYS and U-ACCESS.
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V11.1 | chose one typed registry (`REGISTRY`) of every table, with columns, units, ranges, readers and totality rules, over tables described only in prose, because the loader, the editor, the audit and the docs must read one list and a table outside it must be impossible |
| J-V11.2 | chose JSON5 authoring sources with `$extends` inheritance compiled to §7.6's flat canonical JSON, over hand-writing the compiled form or using YAML, because per-cell provenance across every class (V11 §3.5.14) by hand is error-prone and YAML's implicit typing is not deterministic enough |
| J-V11.3 | chose that dates in compiled provenance come from the source manifest, never the clock, so a rebuild is byte-identical |
| J-V11.4 | chose to derive the relation families' rows at load from profiles (`resolveSiting`) with distance rasters per emission level, over storing pairwise rows, because item 103 (a) forbids a pairwise table and rasters make it O(classes), not O(pairs) |
| J-V11.5 | chose to mark every family, pair, coverage and web row `extension` and keep the references' rules as the classes' authored `ref:` rows, so the parity presets reproduce the references exactly (item 23) |
| J-V11.6 | chose nine nuisances on a 0–3 scale with a reciprocal share, over a continuous scale, because authors can reason about four levels and the clerk can say them |
| J-V11.7 | chose 45 profile families (V08's tag keys plus the category families, `other` and `food-works`, J-V11.38) with classes stating only deltas, over a full profile per class, so one family edit moves every class it governs and the SettlementForge tags land on the same rows |
| J-V11.8 | chose 181 authored town and city classes (V11 §3.5.14's count; more than §16's first estimate) because the 280 catalogue kinds need distinct buildings for distinct siting; the extra authoring is priced by file f items 532 and 568 |
| J-V11.9 | chose three default clandestine rows (thieves' den, fence, smugglers' store; `extension`) over dossier-only criminal classes, so the owner's thieves'-guild-versus-garrison tension shows in a one-click town |
| J-V11.10 | chose the four-row band authoring (poor, modest, prosperous, rich) for template families, matching the base's four-row tables, with squalid reading poor and comfortable interpolating |
| J-V11.11 | chose pseudo-classes (`@wall`, `@layer:*`, `@seat`, `@office`, `@landuse:*`, `@pin:*`, `@housing`, `@none`) in the kind map over forcing every catalogue kind into a building, because 30 kinds are walls, layers, offices or land uses, and a building for them would double count |
| J-V11.12 | chose that a document lacking a table in its pinned set reads the schema's parity-neutral default, so older documents replay unchanged |
| J-V11.13 | chose to type every ladder step in a table (`dossier.ladders`) with inferred rows marked for V08's re-check, over waiting for the ladder file, because item 108 needs the typing now and the file only confirms it |
| J-V11.14 | chose that a siting-table edit keeps placed uses by default and lists the moves it would make, over moving them silently, because the owner's "the layout you already know stays" outranks a weight change |
| J-V11.15 | chose document-only tables for item 104 (a) (1)'s declarations and item 105 (j)'s link edits, so they reuse `editTable`'s lifecycle and undo rather than adding event kinds |
| J-V11.16 | chose the goods table as columns of `ResourceRow` (one resource list) over a second goods table, single source |
| J-V11.17 | chose to derive orientation from the goods by a bulk ratio (factor 1.5) with per-class override, over authoring it per class, so a new class or custom good orients itself |
| J-V11.18 | chose `w_sun` 0.02 (about a tenth of a band's width at full all-day shade) to satisfy item 102's "about a tenth" and "never two bands", held by the bar T-V11-30 with a pre-decided halving fallback rather than by argument |
| J-V11.19 | chose four era rows by century with `c14` default, over a single era, because D-2's span needs the tower, lighting and material shifts the base already reads |
| J-V11.20 | chose that every culture reads the English-fantasy corpora until a pack supplies its own (D-6), over authoring twelve corpora now, because the owner adopted one original naming set and packs are the extension point |
| J-V11.21 | chose to publish no vocabulary in this volume — grammars and authoring rules only — per §17.1 and the brief |
| J-V11.22 | chose per-material salvage and durability rows over per-class numbers, so a class's ruin behaviour follows its material (and a regional material shift changes both consistently) |
| J-V11.23 | chose the wall barrier thresholds (sheer ≥ 100 % over 12 m; cliff ≥ 60 % over 6 m; steep ≥ 30 % over 8 m) as our own provisional values (V12 §3.11's register entry), over leaving them to the solver |
| J-V11.24 | chose to compile institution rows from the class ladder (V11 §3.21.3) so the two lists cannot drift |
| J-V11.25 | chose to keep `distribution` authoritative for S7b's dispersal and derive the competition mode from it, so J-A72.46 holds whatever a profile says |
| J-V11.26 | chose to map SettlementForge's `outputs`, its export, import and production labels and custom goods to our goods by a word table (`goodWords`) matched on case-folded tokens and adjacent token pairs, every match kept, with an `import` fallback, over fuzzy matching, for determinism |
| J-V11.27 | chose the family weights' calibration spike with a pre-decided halving fallback (V11 §8 R1), so no family dominates the solver |
| J-V11.28 | chose to write all 280 kind rows from SettlementForge's catalogue names, tags, categories and tiers (`research/sf`, the owner's own program, not a reference), over leaving them to the apply step; the descriptions were not read; the committed catalogue manifest (registry row 77) is their build source |
| J-V11.29 | chose the ruin blueprint chance by rung and relief (V04's landed values, every rung non-zero) over one rung-invariant row, because item 109 (b) names "a blueprint chance by rung and relief", item 109 (j) (1)'s any-tier rule holds with every row above 0, and good sites were re-settled so the larger and older places sit more often on older remains |
| J-V11.30 | chose to read item 109 (c)'s "every current culture row" as the town's fabric above the ruin (V01's `fabricSignature`), because V11 §3.20.3's culture rows are naming rows with no fabric to differ from |
| J-V11.31 | chose to fill V04's survival-share schema in item 109 (c)'s persistence order with no material factor, over an exponential with a material term, because V04's schema landed and every ancient-culture row builds in long-persistence masonry, so the factor would be 1 everywhere |
| J-V11.32 | chose `growthCapShare` 0.01 PER YEAR compounded over the epoch's span (about a tenth a decade) over 0.1 per epoch or per year, because the same century must grow the same at any cadence (V06's J-V6.53) and 0.1 a year compounds to one and a half times a decade, not the owner's "moderately" |
| J-V11.33 | chose three crypt values with the crypt chance carried by the basement draw (`basement`) over a separate crypt chance, because one draw gives one answer: a church's basement is its crypt |
| J-V11.34 | chose `basement` with a low cellar row for the town `chapel` over `never`, because the owner's "may" covers every church and some guild and castle chapels stood over undercrofts; V07's chapel of ease keeps `never` |
| J-V11.35 | chose `crypt.rankShare` 0.8 over 0.9, because the compile bar already keeps the cathedral's target above every other crypt and a margin of a fifth keeps "the largest crypt" visible when the trim fires |
| J-V11.36 | chose an `order` row that puts the network's grounds first at METROPOLIS over leaving it to the burials-served rank, because item 109 (k) (2) states it and a row makes it a bar |
| J-V11.37 | chose the two-valued crypt join (0.7 over the church's own churchyard, 0.3 beside another burial face) over a single 0.5, because item 109 (k)'s "stands in or beside its cemetery" names two cases and the nearer is the likelier to have broken through |
| J-V11.38 | chose a `food-works` profile family for the slaughtering, brewing and fish trades over exempting them from T-V11-5, so no class both emits and cannot bear smell at level 2 and the rule stays unconditional |
| J-V11.39 | chose the manor's prosperous and rich footprints of 420 and 650 m² (V02's measured values, V02 X3) over 320 and 550, because V02's courtyard compositions were measured against them and a giant manor must hold them |
| J-V11.40 | chose one terrace row per town rung with a compile-time inequality against the base's plinth and skirt, over a single global row, so the thresholds calibrate by rung and can never leave a band of falls untreated |
| J-V11.41 | chose to key `raisedWays` by CITY and METROPOLIS only, with the rung gate held by the schema as an owner rule, over rows of chance 0 below CITY, because the owner ruled that a town gets raised ways only by declaration and a row would make that gate a calibratable default |
| J-V11.42 | chose culture-keyed specialisation rows with a chance and a cap per settlement, drawn once per use at S11 and held once set, over band-keyed specialisations or a region preset, because item 110 (c) ties tiers to where a culture built them, the dossier's culture is the only input the port supplies, and the Western default must stay byte-identical (J-V2.63) |
| J-V11.43 | chose a `stepped-shrine` heights row over the class's own, because a temple's heights row describes a nave, not a shrine on a platform |
| J-V11.44 | chose a per-kind offer chance, typed plot cells and a kind-list `deckOk` derived from the template family, the profile's fire and smell and the crypt column, over a boolean `deckOk` and V02's constants, because item 110 (d) says a deck MAY carry plots, a mole builds only on its sheltered side, and a forge or a crypted church must never stand on a timber deck |
| J-V11.45 | chose an eager water balance from S2's population, S6's density and S1's geology with a climate-keyed cistern term, over counting placed wells and cisterns, because the reason is decided before the tail places them and the balance must not read its own consequences |
| J-V11.46 | chose that a walled port's mole-head slot is held by item 106 (e)'s chain tower and upgraded to a fort only under a sea threat, over a second tower beside it, so the two owner rules place one structure per head |
| J-V11.47 | chose a street-scale crossing table keyed by way class, separate from volume 2's building stairs, with carts never on stairs and an over-steep ramp as the reported fallback, over one stair constant for everything, because a stepped street and a temple stair are built to different measures |
| J-V11.48 | chose the met need alone for a dossier water system (with the cap step per SIZE member and the bound terminal), over also scaling the chance by a dossier factor, because the record stands at chance 1 on every SettlementForge city, so a factor would be one constant marking the host rather than the town (J-V8.67), and the source rule keeps arches honest either way |
| J-V11.49 | chose one named switch per item-110 row set, doubling as the parity-neutral default, over each reader inventing "off", so every volume's no-op pin tests the same thing |
| J-V11.50 | chose to hold item 110's decline cells in V11 §3.18 beside the building material rows, with V06's values, over keeping them in V06's table, because V11 is the content home and V06 reads them as it reads the building rows — amended by J-V11.71 (the strike weights are the base decline table's) |
| J-V11.51 | chose the aqueduct as the way class `aqueduct` with a drawn terminal kind, over a roster class, because item 110 (b) calls it a raised channel of the raised way's kind and a roster class would add a building the roster never counted |
| J-V11.52 | chose to key `siting.web.chainStatus` by V08's neutral status keys (with `sustained` 0.9) over SettlementForge's six words, because the port carries only the neutral key (J-V8.49) and one weight table must serve dossier and standalone maps alike |
| J-V11.53 | chose to take the waterfront's threat keys from V08's `threats` row set and drop this volume's `from` cells, over two derivations of one fact, because V08 landed the derivation over real fields and single source forbids a copy |
| J-V11.54 | chose to apply V08's ladder re-check now and type the twelve file pairs whose lessers it did not list by one rule (SIZE × 1.5, the metalworkers COUNT), their lessers read from the committed `ladderPairs` with a failing cross-check, over guessing lessers from catalogue names or leaving the pairs untyped |
| J-V11.55 | chose V06's names and defaults `elevated.maxSpanM` 600 m and `aqueduct.minFallPerKm` 1 m, keeping `aqueduct.gradient` as the course solver's bounds, over a `maxLengthM` of 500 m, so V06's landed pass reads the rows without renaming |
| J-V11.56 | chose `plagueNeedFactor` 3 (V04's landed value) over 2, because item 109 gives no figure, plague years buried many times the usual dead, and the growth cap bounds the effect either way |
| J-V11.57 | chose to carry the keyword table's new optional cells (`near`, `class`, `specialisation`, `binds`) in a second small table beside the plain rows, over widening every row, so the plain table stays V08's three-cell shape |
| J-V11.58 | chose to key V07's village class rows `v.<id>` inside `roster.classes`, with `villageForm` naming only `v.` keys, over a per-rung overlay on one row per id, because a village row and the town row of the same function share no profile, template or presence law (a village farmstead is a dwelling, the town's an outside farm), and one key holding two rows cannot compile |
| J-V11.59 | chose `citizen_militia` → `@none` at every rung (its muster is the green or the market), over a `guard_post`, because a militia was the able-bodied householders under arms, not a building, and V07 already reads it so; the town watch builds the posts |
| J-V11.60 | chose `v.manor_house` as the crown's village seat, over the parsonage or the reeve's house, because a royal manor was held and run from its hall like a lord's, and V07 names no crown row |
| J-V11.61 | chose that a COUNT of pins sets a floor over the pins' own coverage count and never clamps them to the range's top, over clamping, because a pin has no per-capita row and a record listing "multiple water sources" cannot mean fewer wells than the households need |
| J-V11.62 | chose to hold the archetypes' village readings as a typed cell of the archetype row (class, else-class, pin, delta, composition, ruin), read before `villageForm`, over V07's text alone or a single-class `villageForm`, because eight archetypes read differently at village rungs and data read by one compiler cannot drift |
| J-V11.63 | chose to keep the eight defensibility classes as the key and add `arcKind` (J-VI.3's vocabulary), with a closure feature exactly where a row closes with no wall and `steepSlope` reporting `cliff`, over keying by the six arc kinds (which drops classes with different wall grades) and over a null for `steepSlope`, because a closing escarpment is item 106 (a)'s "cliff or escarpment" and every closing row must name the barrier it stands on |
| J-V11.64 | chose `gates_if_walled` → `@none`, over `@wall`, because the record is conditional — its gates follow a wall record — and SettlementForge makes a wall its prerequisite, so no SettlementForge map loses a wall while a hand-made dossier listing only the gates stays unwalled |
| J-V11.65 | chose `calibratable: false` on every column of the dossier row sets (registry rows 63–66, 77), over leaving them to the general calibratable rule, because they are the port's derivation rules and the owner's program's words (§13.9 (7); V12's R4), changed only as table fixes reviewed with V08 |
| J-V11.66 | chose two `inferred` ladder rows joining the burial records across 1 500 (`parish_burial_grounds` a COUNT of the churchyards over `graveyard` and `burial_ground`; `graveyard` a REPLACEMENT of `burial_ground`), over leaving them unpaired, because without a pair a promotion closes the village's churchyard or binds it twice |
| J-V11.67 | chose two new naming slices (`naming.villageEnd`, `naming.field`) and village features on `naming.settlement` and `naming.way`, over folding ends into `naming.district`, because a village end is named from its anchor and bearing, not from a district identity, and the catalogue is closed |
| J-V11.68 | chose a siting row of its own for the town `watchtower` (`highGround` soft 0.5) once the village row moved to `v.watchtower`, over borrowing V07's row, because the two keys are separate and a town lookout still seeks the highest ground |
| J-V11.69 | chose that every content milestone writes its calibratable columns' register entries at its own exit, with C6 at M4 as their audit, over one hand-over at M4, because V12's lint runs from M1 and a cell without an entry fails it |
| J-V11.70 | chose `calibratable: false` on every column of registry rows 68–70 and on the naming columns of row 71 (the ancestry row's `nameGrammar` and `appearanceTemplates`, the culture rows' grammar-slice and corpus fields), keeping the culture rows' `building` block calibratable, over leaving them to V11 §3's general rule, because V12's R4 and T-V12-24 forbid calibrating naming tables, grammars, word lists and packs — the corpus teaches drawing, never naming — so a calibratable naming cell would need a register entry R4 refuses |
| J-V11.71 | chose the base decline table's persistence rows `retaining` and `raised` (§4.11, file f item 291) as the one home of a retaining stretch's and a raised span's strike weight, withdrawing V11 §3.18's `retaining.rate` and `raised.rate`, over keeping them as V11 cells, because V06's strike pool reads the rate as a layer weight inside the churn cap, never a per-year chance, and one knob in two tables with two meanings fails V12's lint; J-V11.50 stands for the four hold and disuse cells |
| J-V11.72 | chose to state the supply web's off form as one named cell set in V11 §3.7.4 — the four web weights at 0, the two factors at 1, every good's `comfortM` 0 and two new switch cells `orientEnabled` and `splitEnabled` applied by the loader — over per-class orientation cells set to `balanced` and every split threshold at its range top, because `balanced` and "no split" are not zero cells, a threshold at a range top is an in-range sentinel the solver would have to special-case, and one switch per behaviour is the form V11 §3.24.0 already uses; declared splits, link edits and the dossier's chains stand, as declared rows do under V11 §3.24.0 |
| J-V11.73 | chose to exempt the rungs whose `RungProfile.frameLaw` is `territory` from the roster's coverage option — there a `V` cell is a siting pull only and S2's village member counts are V07's presence laws — over applying the option at every rung, because the option's rounded count would step inside a village band that V07 §2.4's laws own (J-V7.101) and T-V7-41's counts expect; the rule is read from the rung's `frameLaw`, so a later territory rung inherits it with no list to extend |
| J-V11.74 | chose to type the source cell's `presets` and `ext.over` over the four registered presets (`PresetId`: `MFCG`, `FTG`, `VG`, `FM`; file f items 376–377) from C0, with the compiler checking keys, the `presetsRequired` cells and every named off form under each zeroing preset whose file ships, and a `presets.FM` entry only on item 376's cells; and to write V11's own entries only where the off value is not the zeroing's (`bulkyWater`, `perishableShort` 1) or the cell is a switch (`orientEnabled`, `splitEnabled`, `terrace.enabled` false), each `own` with a `fixed:` note, landing with V07's V-M0 (VG; the milestone whose content ships the `VG` preset file, V07 §8; J-V11.79) and V02's M6c (FM) — over typing the four keys only when each preset lands (a schema change at two later milestones) or writing an entry on every extension cell (hundreds of entries restating §7.6's zeroing), because the union is known now, the check makes T-V11-21's equality a build failure rather than a bench finding, and a `fixed:` off value keeps calibration runs off the parity neutrals (V12 §3.7.2 (3)); `PresetId` gains `NG` by J-V11.88, `ext.over` no value for it |
| J-V11.75 | chose `terrace.enabled` `calibratable: false`, as V11 §3.7.4's two switches, over leaving it calibratable with a register line whose fallback "none moves a switch", because a calibratable cell is one a run may name (V12 §3.7.2 rule (1)) and the owner's "they go in" is a rule, not a value to tune; the terrace family's realism stays confirmed through its thresholds' register line and the M4 panel's M4-110 group (V12 §3.11's next line), and T-V11-37 now refuses any calibratable switch |
| J-V11.76 | chose to name the non-g tables' register metrics and methods in V11 §8 by column family — the roster columns by the use mix and `pop.perBuilding` at M2b, the template budgets by `bldg.area`, `plot.area` and `bldg.quadSide` at M1, district kinds and identities by MFCG's anchors, `detourFactor` by the base's T16-4, `undergroundAccess.prob` by the V4-U5 panel, and the rest `corpus` at M-CAL by `frame.<table>.<column>` — over one blanket `corpus` line for every non-g table, because the columns a reference measures today would otherwise wait for M-CAL unconfirmed; `heights` is read by a frame, not by `bldg.*`  because no catalogue metric reads a storey count (the `bldg.*` metrics read footprints only); the `bar.<id>` and `frame.*` families are V12's (V12 §2.1, J-V12.65; the two bars V11's entries name are registered by V11's seats, J-V11.78) |
| J-V11.77 | chose to require a `presets.VG` entry only on the `presetsRequired` cells of the village-read tables — those whose `readers` meet the stage set `ProductDecl('village')` registers, conditional registrations included, committed as the source manifest's `productStages.village` and held equal to the declaration by T-V11-9 — refusing a `VG` entry on any other cell and resolving no other table under `VG`, over requiring a `VG` entry on every categorical option cell (values for cells `VG` never reads, which a seat would have to invent) and over resolving an unlisted categorical cell under `VG` by a stand-in rule such as the `MFCG` entry (a value no village stage reads, stated only to satisfy a check), because `VG` is read at village rungs only (file f item 377), and a committed list with an equality check keeps `@plat/tables` free of a dependency on the village package; the compile writes the village-read cells to its manifest so V07 §3.15's list is checked complete; file f item 581 carries the rule into §7.6's sentence — amended by J-V11.91 ("resolving no other table under `VG`" withdrawn: a village's epochs read the epoch tables, so every table resolves under `VG` by §7.6's order; the entry rule stands) |
| J-V11.78 | chose that V11's seats register the two bars V11's register entries name — the base's T16-4 at C1 (`owner` `'base'`) and T-V11-30 at C2 — each as a V12 `BenchBarDef`, over a base change request for T16-4 (its check is already the base's, §13.2, and a registration is test code, not base text) and over a `paired` `StatBarSpec` for T-V11-30, because V12 §2.7b's `paired` rule measures a ruin's laid plan against the town above by `ruin.blockArea`, `grid.r4` and `grid.axis` and cannot state a two-arm band count, while V12 §2.1's `BenchBarDef` already names both ids; T-V11-30's zero arm is the same town's field recomputed from its drivers with `w_sun` 0, so the one term is the only difference between the arms |
| J-V11.79 | chose V07's V-M0 as the milestone that ships the `VG` preset file and V11's `presets.VG` entries with it, over V-M1, because V-M0's exit already runs under `VG` (V07 §8), V07 §8 puts the file in V-M0's content and leaves V-M1 the request mapping, and V11's compile check under `VG` binds from the file's landing; every V11 place names the milestone by its content ("the milestone whose content ships the `VG` preset file"), so if V07 moves the file again V11's reading moves with it |
| J-V11.80 | chose to name every stage and epoch-phase reader in the registry by its StageId — V04's epoch participants under `U-FADE` (V04 §1.1's engine for them), V07's village participants under `VS1` and `VS2` (V04 §1.1, V07 §3.12) — with module ids only for readers outside the stage graph, the compiler telling them apart by a committed `stageIds` list and the integration suite recording each stage's reads (T-V11-1 (b)), over keeping prose readers and teaching the village-read test and V12's run scope to parse them (a free-text match that cannot be checked) and over deriving readers from code at build time alone (the registry is the one place §7.6's invalidation, the `VG` scope and V12's run scope read, so it must be data a reviewer sees); a reader list proved incomplete by the recorded reads is fixed in the change that registers the stage, never by a looser test (V11 §2.1, V11 §3.1, V11 §3.2.1, T-V11-1, W71) |
| J-V11.81 | chose `calibratable: false` on every column of rows 86–89 (`toolkit`, `messages`, `clerk.ops`, `clerk.content`), over a narrower marking (the message texts and `clerk.content`'s lexicon and refusal texts only), because V11 §2.1 defines the flag as "the corpus stage may re-sign it (§13.9)" and no corpus of drawn maps measures a tool row, a message, the clerk's budgets, token limits and prices or its spatial word distances; left calibratable, those cells would enter V12's register lint (T-V12-20) with no admissible method; their owners' own re-measurements (V10 §7.3, V09's usability runs) land as table versions instead (V11 §3.1, T-V11-37) |
| J-V11.82 | chose the shipped paths `clerk/ops.json` and `clerk/content.json` for V10's two tables (V10 names no file) and `packPatchable: false` for all four new rows, over letting a setting pack patch the clerk's wording or the toolkit, because V09 §2.3, V09 §2.9 and V10 §2.10 name every layer each table takes and a pack layer is none of them — a setting's words reach the clerk through a document's or a host's `clerk.content` rows (V10 §3.3's vocabulary block) (V11 §3.1 rows 88–89) |
| J-V11.83 | chose to register V04's two dossier row sets, `dossier.sanitation` and `dossier.subterranean`, inside registry row 63 with `owner` `'V04'`, rows home V04 §2.3a and every column `calibratable: false`, over a row of their own or leaving them in V04's text alone, because they are dossier row sets the port's creation reads at door 1 like V08's row sets (`port.digest`; DR17, file f item 386), a table outside the registry cannot load (V11 §2.1), and a dossier row set is a derivation rule of the port, never calibrated (§13.9 (7); J-V11.65); `@plat/app` is named as a module reader because V09's why card names the matched row, so a table edit refreshes it (V11 §3.1 row 63; T-V11-1 (a)) |
| J-V11.84 | chose to state once, in V11 §2.1, that every registry row exists from C0 and ships as its schema's empty table until its rows-home milestone, with the *status* column naming who writes the rows and never whether they have shipped, and that the compiler holds an empty table's `TotalityRule`s and invariants from its first row, over calling the pre-milestone state `staged` (the status column's word for a table a staged input fills, row 32) or checking totality on empty tables, because a coverage rule over a table no seat has yet written would stop every build from C0 to that milestone, while the milestone's own exit tests read the rows it lands (V11 §2.1; V11 §3.1's preamble; V11 §8's readers paragraph) |
| J-V11.85 | chose to make the seat registering an epoch participant write its registered `stage` into the readers of every table the participant reads, and the seat landing a module's first read of a table write the module reader, over leaving both to the stage registrations alone, because a participant adds reads under an existing stage without registering one and T-V11-1 (b) records the reads under that stage; and chose the module reader `@plat/hood` for the neighbourhood close-up (rows 39, 62), as the other view-side readers are named by package (`@plat/app`, `@plat/clerk`), over a new id such as `hood.closeUp`, because the compiler tells module readers from stages by the manifest's `stageIds` (V11 §3.2.1 step 6) and the package's pipeline registrations (S7c, S8.seed, S9b, its S13a step) stay listed by StageId beside it; row 57 gains U-FADE and row 61 S10b by the same rule (V11 §3.1; V11 §8) |
| J-V11.86 | chose to hold item 110 (b)'s landmark threshold as V11 §3.24.2's `elevated.landmarkMinSignificance` 20 (calibratable, beside `landmarkFactor`) over a `dossier.*` row set or a constant in V08's rule, because the threshold tunes the base's raised-way chance, not a dossier fact — a dossier row set is never calibrated (J-V11.65), V08 intends the value calibratable (J-V8.70), and a constant in a rule's text is a hard-coded universal (item 23); DR35 names the records and cites the cell (V11 §2.8c, V11 §3.24.2, V11 §3.24.7 (4)) |
| J-V11.87 | chose to name in V11 §8 the seat that writes the `presets.VG` entries after V-M0 — the seat landing a change that makes a table village-read (V-M2u) or adds a `presetsRequired` column to a village-read table, in the same change — over leaving V-M0's seat as the only writer, because after V-M0 the compile names those cells (V11 §3.2.1 step 4) and would stop a later build with no seat assigned; V07 §3.15 (3) states the V07 half (V11 §8's preset paragraph) |
| J-V11.88 | chose to admit `NG` as a fifth `PresetId` exactly as V01 states it (V01 §3.15, file f item 584, J-V1.98) — a zeroing parity preset that resolves a cell by its own `presets.NG` entry, else as `MFCG` resolves it; required on no cell; admitted only on `hood.constants`' cells, the compiler refusing one elsewhere as it refuses an `FM` entry outside item 376's scope; no `ext.over` value; its checks from V01's M5, the milestone whose content ships its entries — over requiring `NG` entries on every `presetsRequired` cell of the tables a V01 stage reads and admitting `NG` in `ext.over`, because `NG` falls back to `MFCG`'s resolution, so every categorical cell already resolves under it through its `MFCG` entry (a required `NG` entry would restate that value on cells V01 declares neutral to Neighbourhood), because V01, the owner of Neighbourhood's rules, puts its entries on `hood.constants` alone (switches that select whole rules), and because `over` names the reference a cell extends, whose zeroing `NG` inherits (file f item 376's note records no `NG` value); V11 writes no `NG` entry, none of its cells lying in the scope (V11 §2.2, V11 §3.1 row 73, V11 §3.2.1 step 4, V11 §3.2.2, V11 §8, T-V11-0, T-V11-9, W75) |
| J-V11.89 | chose to register V01's `way.surface` and the base table `squares.quota` as catalogue rows 90–91, appended so no existing row number moves, with `squares.quota`'s rows home V01 §3.5.2 (where its default values are written) and its `owner` `'base'` (file f item 301's table, read by S7b (3) from M2b), its readers S7b, S2 and S9b (S2's land estimate reads its sub-block share, V01 §3.5.9, beside the other two), and `way.surface`'s readers S10a, S6 and EVO_DECLINE (an epoch's re-banded ways and V06 §3.5.2's landfall re-lay take their surface by the same rule), over folding them into row 62 (whose files are `hood/*.json`) or setting `squares.quota`'s rows home to §4.5 S7b (3) and §4.7 S9 (those sections name the table but write no row; the single-source rule puts a rows home where the values stand), because a table outside the registry cannot load (V11 §2.1) and V01 lands both at M2b; `way.surface`'s one value column is an enumeration, not calibratable, so it takes no register entry (V11 §3.1 rows 90–91, T-V11-1 (a), V11 §6, V11 §8, W76) |
| J-V11.90 | chose to widen row 38's readers to S10b, S11, EVO_DEPARTURES, EVO_SITING, EVO_GROWTH and the module `@plat/hood` (the base's one capacity function, S11's entrance and basement-door cells and the close-up's reserve) and row 62's to S0, S1, S2, S6, S7b, S8.seed, S11 and the modules `@plat/app` and `testkit.bench`, and to drop `fabric.select` from row 62's ids (V01's stream concern, V01 §3.12, not a table), over listing only the minimum, because V01's own text names the standalone document's S0, S1 and S6 reads (V01 §3.10.1) and S11's centrepiece read (V01 §3.5.10), and an unlisted stage fails T-V11-1 (b) while an over-listed one is only reported; row 38's S11 admits V12's runs whose metrics read S11 to name `roomProgram` cells (V03's hand-off left it to V11), which is right, since the capacity moves the households S11 houses — V03's T-V3-35 keeps `stages` `[]`; chose `S8.seed` beside `S8` for the seed pass (file f item 345 registers it inside S8) — amended by J-V11.109; and chose to extend V11 §8's writer rule to any change that makes a registered stage, phase or module read a table it did not read before, a file f item's application included, because the registration rule missed reads added to existing stages (file f items 233, 241, 578, 294) and the change that adds a read is the one place that knows it (V11 §3.1 rows 38 and 62, V11 §8) |
| J-V11.91 | chose that the loader resolve every table under `VG` by §7.6's order — a village-read table's `VG` entry, else 0 or off for an `extension` cell, else the default — with a categorical `option` cell of a table no village stage reads resolving to its `MFCG` entry, over resolving only the village-read tables under `VG`, because a village runs epochs (V07 §3.12; V06 §3.2 at a village rung) whose phases read V06's tables, whose cells V06 states "0 in the parity presets" (`decline.turnoverVacancy`, the splits, the fire-ordinance row), and those cells otherwise entered a `VG` view at their defaults; and over widening the village-read test to the fifteen `EVO_*` ids, which would break `productStages.village`'s equality with V07's declaration (T-V11-9) and require `VG` entries V07's list does not hold, for a case no table has today (V06 declares no `presetsRequired` column); the `MFCG` entry is the value V07 §3.15's rule gives a village-read cell for which `VG` has no behaviour of its own, so the two resolutions agree; the `VG` entry rule is unchanged (V11 §3.2.1 step 4); it amends J-V11.77 and file f item 581's text (V11 §2.1, V11 §2.2, V11 §3.2.1 step 4, V11 §3.2.2, T-V11-9) |
| J-V11.92 | chose to list S5b beside S4 on every registry row that names S4 as the raised-way generator — rows 49, 71, 80 and 81 by name, rows 3 and 50 through `S5` — under one standing rule in V11 §3.1's *Readers*, over adding S5b to row 80 alone, because S5b runs S4's router with the same span pricing (§4.4; file f item 290 (1), (3)), so every table that route solve reads S5b reads too, and an unlisted reader fails T-V11-1 (b) while an over-listed one — row 71's culture factor, which a viaduct's `F = 1` never multiplies, listed for S5b as it already is for S4 — is only reported; chose to read the registry's `S5` (rows 2, 3, 50, 81) as a group the compiler expands to S5a–S5d, over rewriting those rows to per-step ids now, because §4.1 registers the growth stage as four `StageDecl`s (each with its own op form), so a bare `S5` would stop step 6's reader check, the base's own text names the growth stage "S5", and over-listing a step is only reported — amended by J-V11.109 (an epoch stage's S5b reads under `S5b`, never `EVO_GROWTH`) |
| J-V11.93 | chose to write the display words as one table of their own (V11 §3.5.15: class, `label`, `synonyms`) over adding two columns to each of V11 §3.5's nine class tables, and to give icons to the 45 profile families only — each class compiling its family's glyph, the goods, district kinds and style sheets shipping none — over a glyph per class (≈ 250 with the `v.` and generic rows), because the class tables are already ten columns wide and the words are reviewed, spell-checked and scanned together, the class key joining them as the single source; the palette groups stamps by family, V07 §2.4 already reads "the palette's glyph for the row's family", and V09 §2.3's `iconCell` is optional, so a label-only card is the pre-decided fallback wherever no glyph exists. Labels are unique per namespace (town-and-city, `v.`, generic), so a town row and its village form may share their words; a synonym may be shared (`mill`) and `commonness` settles it |
| J-V11.94 | chose `commonness` = the row's roster share at TOWN, derived by the compiler at step 5a from the compiled count cells (V11 §3.5.1), over hand-set numbers or a per-capita-rate proxy, because it has the same meaning as V07's village rule (J-V7.133) and the reader compares rows of the document's rung only, a village rung's tie going to the `v.` row (V09 §4.16 (3)), and a derived cell moves with every table version that moves a count (a calibration included) where a stored number would drift; rounded to 0.001, finer than V07's 0.01, since a town roster holds V11 §3.5.14's 181 classes against the village's 25 |
| J-V11.95 | chose that a `generic-<family>` class's `label` is its profile family's `label` cell (V11 §3.4), over the family's `trade.noun` corpus entry, because the corpus is authored at C5 (M2b and M3b) while the generic rows compile from the first compile that holds their family, a label must exist from then (T-V11-4), and `trade.noun` is a naming word list held to naming's bars and never calibrated nor read as a display cell; the corpus's authoring rule now reads the labels (V11 §3.20.5), so the two agree in words. The compiler writes the label, `synonyms` [] and `commonness` 0 |
| J-V11.96 | chose to hold the span rule's constants (file f item 244) as `raisedWays.structure.span` and item 244's slide bound as `structure.slideMaxFactor`, and item 245's snap as the `retaining` table's named `settings` row, over a registry row of their own (`raised.span`), because the structure row already holds the heights the span rule reads beside them (clearance, pier heights and spacing), so one row set is one invalidation slice and one editor page; V11 keeping the name map — amended by J-V11.97 (the values are stated once in V11 §3.24.2). Chose also to define the settings form in V11 §2.1 (`ColumnSpec.row`), which V01's `hood.constants` and this finding cite and V11 §2.1 had not stated, and to list U-CITY, U-ACCESS and U-LINK among row 80's readers for `foundationObstacles` (over-listing is only reported by T-V11-1 (b), under-listing fails) |
| J-V11.97 | chose to state the span rule's constants' values once in V11 §3.24.2 (`span.vaultShare` 0.6 / 0.7 / 0.15, `maxHeightCm` 900, `minHeadroomCm` 250, `maxFallCm` 150, `vaultCap` 10 / 40 / 120 / 240, `deckDepthCm` 150, `supportFoundationCm` 400, `slideMaxFactor` 1.5), over leaving them in V04's request and file f item 244, because a content-table value's one home is this volume (the canon's rule S2), the base names the cells without values (§2.7) and V04 §10 is a pointer table |
| J-V11.98 | chose, for item 111's rows, the feature table's own water chances on the arid row by default (a row's own chances only when set), an oasis chance of 0.35 doubled where no other water was drawn, a water pull and a water term rising with aridity (0.6 and 0.5 arid, near zero in wet rows), and a sun cell of −0.5 in the arid row, over arid water chances below the feature table's and a sun cell of 0, because the owner asked that deserts keep rivers, lakes and coasts, item 111 (d)'s pin names only the oasis, the pull and the sun cell as neutral, and in hot, dry country the shaded, watered ground was the valued one (item 111 (c), kept by J122) |
| J-V11.99 | chose, for item 113's rows, one event row per neutral event key of V08's `historyEvents` row set (plus `none`), a `destroy` row's threshold read as its `severityScale`'s first end, an occupation as `uses` (a garrison and one citadel) and a siege as `slice`, and a burial age of `burialYears` 100 multiplied by factors for floods, silt, rebuilding on top and bare rock and clamped to [30, 400] years, over rows keyed by SettlementForge's raw words and one fixed burial age, because the port already reduces the raw words (V08 §2.6), V06 §2.14's shape carries one effect per row, and item 113 (c) names the four site factors |
| J-V11.100 | chose, for item 114's rows, generation shares by the readiness band and the MEANS class, patch rows by wall kind with culture-limited rows (mud brick in dry cultures), and neutral values that reproduce V06's rules before item 114, over per-culture tables and a condition drawn from the threat alone, because item 114 (d) names readiness and wealth as the drivers at generation, item 114 (b) asks for patch materials by wall kind and culture, and the pin must hold |
| J-V11.101 | chose the grandeur ceiling as one row per rung with the THORP, HAMLET and VILLAGE rows owner-stamped and not calibratable, over calibratable cells, because item 115 (b)'s ceiling is the owner's rule — a default a user may exceed by hand (item 101 R2), never a value a calibration run may move; the TOWN – METROPOLIS row, the base's behaviour, is an enumeration and takes no register entry either (V11 §3.25.4) |
| J-V11.102 | chose item 116's margin as a cell of the base settings row (row 92), over a rendering constant, because the item calls it a table cell and every table value has a registry row (J-V11.106) |
| J-V11.103 | chose item 117's looks as bands of weeks per climate row with surface rows anchored to those bands, over a 52-week look table per surface, because the owner's seasons turn gradually by climate (item 117 (b), (d)), anchors keep every surface in step with its climate's year, and the no-gap bar holds by construction |
| J-V11.104 | chose item 118's decorations as one table by rung whose rows never cross into a larger tier, a staging keyword table with a fallback by festival kind, motifs as glyph and palette-role keys (never colours), and the generic festivals under V08's `harvest` kind, over per-culture decoration sets, because item 118 (d) states the tiers, item 118 (c) the fallbacks, §17.1 keeps colours in §8.2, and V08 maps sowing, midsummer and midwinter words to `harvest` |
| J-V11.105 | chose one empty table, `perf.qualitySpend`, as the one place a step slower than its target is recorded with its measured gain, over per-stage cells, because item 119 (b) requires each such step recorded (the step, its cost, its gain) and a row that lands only with its gain keeps every stage at its target by default |
| J-V11.106 | chose to register the base's settings the base calls table values as one base settings row (row 92, `calibratable: false`), over declaring them kernel constants, because the base names them table cells and a registry row gives each a reader list and an editor page without letting a calibration move an engineering constant |
| J-V11.107 | chose, for the sensitive catalogue kinds (Q-V11-1, answered by J122), concealment rows that never draw them openly by default and a record's `knownTo: 'public'` that places them openly, over hiding them from the map, because the dossier is the truth (item 20), J122 keeps them concealed by default in player views, and SettlementForge's own setting decides otherwise |
| J-V11.108 | chose, for a cart class's crossing beyond 1.5 × `rampMaxGrade`, a local re-cut of the step at the crossing and else no levelling there, over a stair or a gap in the wall, because the owner's words forbid both and §5's ladder stops at leaving out and reporting (V11 §3.26's row EI-V11-EDGE-1) |
| J-V11.109 | chose to record every read under the registered StageId of the stage function that reads — `S8` and `S8.seed` for the seed pass, `S5b` for an epoch stage's main-road step — never under the calling epoch phase, over the conditional moves J-V11.90 and J-V11.92 left open, because the readers list is §7.6's invalidation map and must be determinate |
| J-V11.110 | chose to take the lesser lists of the twelve ladder-file pairs (V11 §3.12) from V08's committed `ladderPairs` data at C4b, with the compiler's cross-check (T-V11-2) failing the build on a committed pair without a row, over writing them now from memory, because the ladder file is the owner's own program's data (J121) and the committed file is its one source; until C4 lands a dossier carrying both forms of such a pair places both, noted `ladder_unknown` (V08 §3.5.1 (b)) |
| J-V11.111 | chose to fix each naming slice's grammar structure and features here and to have the word lists authored at C5 by V11 §3.20.6's plan (its sizes, rules, reference scan and T-V11-15), over word lists in this volume, because §17.1 keeps a design text free of copied vocabulary and an authoring plan with a scan bar makes every list checkable against the clean room |
| J-V11.112 | chose Find's nine groups (item 120 (b); J133) as one cell of each profile family — a class's group its family's — over a group cell on every class row or a table of its own, because every class names exactly one family (T-V11-4), the stamp palette already groups stamps by family (J-V11.93), the `v.` and generic rows then group with no cell of their own, and a family edit regroups every class it governs; `food` reads `crafts` (bakers and millers made what they sold), `transport` and `entertainment` read `other` (the item's "the rest"); the shared trade word `smith` is written on the smithing rows so Find's "all smiths" chip reaches them; the headings are V09's catalogue words (V11 §2.3, V11 §3.4, V11 §3.5.15) |
| J-V11.113 | chose to refuse a row delete that would remove what readers fall back to — a table's `defaultRow`, an `allowFallback` target, a totality rule's only cover, the last row of a table not `mayEmpty` — naming the readers with the alternative "edit its cells", over a substitute row or a hard-coded value when it goes, because every defined outcome of V11 §3.26 rests on those rows standing, a substitute would be a second, silent default, and a cell edit of the row reaches every behaviour a user could want from deleting it; the key joins §7.1's `refuse.table.*` family (V11 §2.1, V11 §4.1, V11 §3.26, T-V11-45 (s)) |
| J-V11.114 | chose `grandClasses` — `manor`, `tower_house`, `castle`, `palace` and V07's `v.manor_house` — as a named `settings` row of `grandeur.ceiling`, over a flag on each class row or reading grandeur from a class's template family, because "specified" belongs to the ceiling rule V08 §3.16 (3) reads (one list beside the rows a specified building bypasses), a class flag would put an item-115 cell on every row of `roster.classes`, and template families do not tell a lord's hall from a merchant's house; the list holds the lord's and the ruler's houses — the manor, the fortified tower house, the castle with its keep, the palace and the village's manor house — and is an enumeration, `calibratable: false` (V11 §2.8d, V11 §3.25.4) |
| J-V11.115 | chose to give the `village` district kind (file f item 214) its affinity through one compiled tag, `village`, on every `v.` row, over listing every village class id in the kind's row, because the `v.` namespace grows with V07's rows and a tag the compiler writes keeps the row whole without an edit; at a base rung no `v.` class holds demand, so the kind is never the typing scorer's pick there, and at village rungs VS5 sets it (V07 §3.7) (V11 §3.5.1, V11 §3.9) |
| J-V11.116 | chose `raisedWays.structure.maxClearSpanM` masonry 30 m and timber 20 m (`own`, calibratable; ranges [15, 75] and [8, 40]) as the cells of §2.7's clear-span bound, over one bound for both materials or the slide bound alone, because a single masonry arch of about 30 m stood at the large end of what Roman and medieval builders turned while timber spans stayed shorter (general historical knowledge, not corpus-witnessed), the support step keys its pitch by the same two classes, and T-V11-32 (h) keeps every slid span (1.5 × the band's upper end: 22.5 m and 12 m) inside the bound (V11 §2.8c, V11 §3.24.2) |
| J-V11.117 | chose to split C4 into C4a, the wall barrier and waterfront rows at M2b with item 106's base (0.5 pw), and C4b, the SettlementForge rows at M-SF (1.0–1.5 pw), over one milestone priced once in two slots, because the base's arc classification reads the wall rows from M2b while the 280 kind rows and the dossier row sets wait for V08's adapter and frozen fixtures, and §16 places each price in one line only — C4a in the first total, C4b with C8 on the staged content line (V11 §8) |
| J-V11.118 | chose item 122's tables as twelve look rows keyed by look kind — the camp looks' scale by rung in m² of camped ground, each a headcount × 45 m² (a war band of 20–60 at a THORP to a siege army of 5 000–30 000 at the METROPOLIS cap), the other looks' as a share of their place's units —, one `settings` row holding item 122 (h)'s rates, display labels on the look rows, and a closed mapping of SettlementForge's own stressor, archetype and event words, over looks per condition instance or a per-rung table of looks, because item 122 (b) and (c) give one look per stressor type and archetype scaled by severity and tier, §10.2's shared shape fixes the rows' columns, V09's Show crises and Find name looks by their words, and a closed mapping lets nothing fall through (T122-4); `regional_migration_pressure` draws the refugee camp because item 122 (b) names it under mass immigration, the other `regional_*` pressures `none`; `war_pressure` the siege and `wartime` none; a calamity the `disaster` look through the condition linked to it (V08 §3.16 (7) (b), (d)), its pattern by its type; each look's marks are §8.2's, never a cell here (V11 §3.25.9) |
| J-V11.119 | chose item 123's thresholds as one range of the decay level per plan element kind — inside the shares of the existence states whose look item 123 (c) gives it, the upper floor's across `decayed` and `ruined` (rotten patches and holes, then mostly floorless) — with the decay rate by walls material and the default age in tables of their own, over ranges by material or the rates as a column of V11 §3.18's decline rows, because item 123 (b) puts the rate on the material and item 123 (c) the order on the element, and the decline rows are read by model phases whose recorded slices an edit of a drawing-only cell would invalidate — a different lifecycle, so the two stay apart (V11 §3.25.10) |
| J-V11.120 | chose item 124's weather cells as per-kind bands of weeks with spells an hour and a spell length, the kinds' lengths and live hours and four site factors in the climate table's `settings` row, and the two hard rules as compile checks with owner-stamped caps, over a chance per week or a 52-week table per kind, because item 124 (c) asks how often each kind comes and how long it lasts, bands written as transitions turn the weeks gradually while a zero stays zero (the arid dry months), the sites carry item 124 (c)'s regions no biome row is — coastal, riverside and lowland, hills and mountains, forest — and fog's cool mornings ride the view's hour (item 124 (d)); a site's factor never makes a kind a row lacks, so no hill town snows where its climate cannot (V11 §3.25.11) |
=== END ===

=== REPLACE ## 12 CONFIRMED versus PLAUSIBLE ===
## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (checked against the texts or counted by script): every one of SettlementForge's 280 catalogue kinds maps to
a class of V11 §3.5 or a pseudo-class of V11 §3.11 (none missing, none extra, every mapped class defined); the class
ladder holds 181 town and city classes, 45 profile families and 35 template families; the registry holds 111 rows (1–110
and 58a); the closed crisis mapping holds a row for each of the fifteen stressor types and the twenty-two condition
archetypes the port's research lists (`research/sf/dossier-model.md` §11, `research/sf/mapping.md` row 70) and
`occupation`, which item 122's text and V08 §2.4's census name; every base
section this volume cites exists in the base, and every request of V11 §10 is carried by the file f item named there.

**PLAUSIBLE** (reasoning, to be measured — each by the test or register line named):
* every numeric row is our own and provisional, with its V12 §3.11 register entry: the per-capita rates, weights, radii,
  areas and thresholds; item 109's chances and the ancient-culture pitches; the catacomb growth cap; item 110's cells;
  items 111–119 and 122–124's cells (V11 §8);
* the family weights balance against the authored rows (V11 §8 R1's spike);
* the behaviour bars T-V11-12 – T-V11-45 hold at the stated rates;
* the water balance favours dry, karst and large cities (V11 §3.24.6; T-V11-33 and its fallback);
* the ancient-culture rows clear V12 §3.6b's distinctness thresholds (T-V11-24, with the pre-decided refit);
* the `inferred` ladder rows hold until the port meets both forms of a pair (V11 §3.12);
* with every class `balanced`, S10a's order is the base's (T-V11-21's no-op pin);
* SettlementForge's wall prerequisite holds in every frozen dossier holding "Gates (if walled)" (V11 §3.11's `@none`
  loses no wall either way);
* the reader lists are complete (T-V11-1 (b)'s recorded reads decide; an over-listing — row 61's S1 and S12b, row 17's
  `EVO_DECLINE`, row 24's `EVO_USES` and `EVO_MUTATION`, row 71's S5b, row 80's U-CITY, U-ACCESS and U-LINK — is only
  reported); `@plat/app` reads the subterranean rows itself (J-V11.83); a table without rows before its milestone is read
  as "no rows" by every earlier stage (V11 §2.1's empty-table rule);
* an epoch re-derives a re-banded way's surface under S6 (T-V11-1 (b) with three `'history'` epochs);
* the roster share separates the rows a typed word can tie (it only breaks ties, V11 §3.5.15);
* T16-4's statistic is the ratio V11 §8 names; heights are better confirmed by a frame than by a panel (J-V11.76);
* the village-read tables' `presetsRequired` cells are exactly V07 §3.15's list (the compile's `villagePresetCells`
  checks it);
* items 111 and 113–118 are no-ops at their off forms (T-V11-38 – T-V11-43) and the arid water pull shows in the siting
  of wells and gardens (T-V11-38);
* item 122's scales read as the owner's "a hamlet gets a war band's camp, a city a full siege line" and 45 m² a head as
  item 122 (h)'s camped ground (V12's item-122 measurements); item 123's ranges show each state's look of item 123 (c)
  at the default rates and age; item 124's rates give a few minutes clear between spells in a wet week and an arid map
  clear most of the year (V12's item-124 bars).
=== END ===

