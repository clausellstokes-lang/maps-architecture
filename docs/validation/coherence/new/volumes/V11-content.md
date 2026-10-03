# Design volume 11 — The content system: every rule and content table, its schema, its rows and its authoring plan

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V11-content, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** A bare `§n` or `II.n` is a section of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `D-n` and the `J…` rows without a volume prefix are
the base's decisions. `Vnn §n` is a section of a design volume, this one included (`V11 §3.2`); a list or range after a
volume prefix stays in that volume (`V04 §2.3, §3.5.1` is two sections of volume 4). `item n` is an owner or amendment
item (owner items 1–101, file g 102–113, file f 200–585), cited as the base text it became; `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. A volume's local row ids (W, X, IN)
are cited with their volume outside it (`V08 X5`). Registry rows are cited by number ("registry row 50"); they are this
volume's §3.1 rows.

## 0 In plain words

Every decision the generator makes that is not geometry — which buildings a town of 6 000 people needs, how big a
rich smith's house is compared with a poor one, which trades like to sit together and which keep apart, what a
neighbourhood is called, what a thieves' guild hides behind, what the walls are made of — is read from a **table**.
This volume is the book of those tables. It lists every table the program has, says what each column means and in
what unit, who reads it, where its rows come from, and writes out in full the rows that are real design choices: the
ladder of building kinds from shack to cathedral, the kinds of district, the named quarters, the translation of every
one of SettlementForge's 280 institution kinds onto our buildings, the fronts a hidden institution may use, the
economy's sectors, and the owner's siting rulebook of 2026-09-28 — how each kind of building pulls toward or pushes
away from the others.

How it feels to use: nothing changes on the one-click map — the tables are simply what the map is made from. A
designer who opens the tables editor sees plain rows ("tannery: gives off smell and fouls water; needs running water;
downstream of houses; sells to cobblers and saddlers"), each cell saying where its value came from (a reference we
emulate, our own judgment, the owner, the historical corpus later). Changing a cell changes exactly the parts of the
map that read it, as an undoable edit. When the map puts the tannery by the river below the town, the clerk can say
why, by naming the rows that pulled it there.

The rulebook is **factored**, not a giant list of pairs: each building kind carries a short profile — what it gives
off (smell, smoke, noise, fire risk, fouled water, heavy traffic, crowds, disorder), what it cannot bear, what it needs
(running water, a road, a gate, the harbour, the market, space, safety, secrecy), who its customers are (the street, the
whole town, travellers, the rich, the underworld), what it buys and sells, which side of the law and of the sacred it
stands on, whether it clusters with its own kind or spreads out so every district has one — and a dozen general rules
turn those profiles into gentle pulls and pushes. A few dozen named pairs add what the profiles cannot say ("dyers
upstream of tanners"). Nothing in the rulebook is a hard law except true physical needs (a watermill on water);
everything else is a weighted tendency, so towns differ and the pattern shows only on average — the owner's "a
correlating general rule".

SettlementForge's custom content fits the same book: a custom institution nobody wrote a rule for still lands
sensibly, because its scene archetype, category, tags and even the words of its name map onto profiles here, and its
supply chain is placed as one connected thing — raw material at the river or the quarry, processors stepping inward,
the seller by the market. The grimmer kinds SettlementForge's catalogue carries (a slave market, a trafficking ring) are
kept, hidden from players by default and shown as SettlementForge's own settings show them.

Under the ground the book holds the numbers the owner's underground rules need: how likely the ruins of an older
civilisation lie under a site (certain where the dossier names ancient ruins or a ruined landmark, possible anywhere
once the fantasy setting is on), the four kinds of ancient street plan such ruins follow, which parts of a ruin last
longest, how likely a cellar, a well or a mine breaks into a cave or a ruin, and how deep a void must lie to stay a
secret even under a great city. It also holds the burial rule the owner settled ("switch it then, cathedral also gets
crypts but cemetaries get catacombs"): churches get crypts — the cathedral always, and the largest — while catacombs lie
only under cemeteries (and, in a city or a metropolis, under a worked-out quarry turned ossuary). A town has at most one
catacomb and a city more by its number of churches; each grows by about a tenth a decade at most and never shrinks.

It holds the numbers for the owner's four building rules ("they go in"): how steep a slope must be, and how tall a
step, before a town builds a terrace wall, and what that wall is made of by the wealth of the ground it holds; how
likely a city or a metropolis is to carry a road on arches over a ravine, raise a road between its high quarters, or
bring water in on an aqueduct when its wells fall short — never a town, which gets one only when the user draws it;
which cultures build temples, palaces and towers in stepped tiers, and how rarely; how many small buildings a bridge, a
pier, a mole or a quay may carry and which trades may stand on them (never a forge, never a cathedral); and which fort,
lighthouse or watchtower may stand at a mole's head.

Dry country has its rows too: how likely a desert site has an oasis — a spring-fed pond with palms and irrigated
gardens — and how much likelier when there is no river, lake or coast; how strongly the town crowds toward its water
and the rich hold the ground nearest it, strong in dry climates and near nothing in wet ones; and how hot dry climates
value shade over sun. And the history rows let a settlement be generated as its past and aged to the present: how long
each replayed epoch is, what a great fire, a plague or an occupation does to the epoch it falls in, and after how many
years a ruined old town lies buried underground. Every one of these is a row the user can change, and with every one
switched off the map is exactly what it was before.

What the volume does NOT hold: the vocabularies of names (it designs the grammars and how their word lists are written,
never the lists), the colours of the palette (§8.2's), and the rows other volumes own and state (cited, never copied).

## 1 Scope, the base hooks consumed, and what is out of scope

**What this volume builds to depth.** The content system: (a) the **table registry** — every rule table's identity,
file, schema, units, declared ranges, readers, slice kinds, provenance rules and parity-preset behaviour, as one
typed catalogue (V11 §2.1, §3.1), the base's own settings values among its rows; (b) the **authoring source,
compiler and loader** of `@plat/tables` — how rows are written, inherited, checked, versioned, compiled to the shipped
JSON §7.6 describes and loaded as a `TableView` (V11 §2.2, §3.2); (c) the **rows** of every table whose rows are design
decisions and that no other document writes: the class ladder with its designation-template families (V11 §3.5, §3.6),
the siting rulebook of items 103, 104 (h), 105, 107 and 108 — profile families, relation families, class profiles,
coverage, balance, orientation, split, the goods table, the signature pairs, the ladder step types (V11 §3.3, §3.4,
§3.7, §3.8, §3.12), the district kinds and quarter identities (V11 §3.9, §3.10), the institution map over all 280
SettlementForge catalogue kinds with the 17 scene archetypes, the category synonyms, the keyword table and the fallback
(V11 §3.11, §3.13), the concealment and cover rows (V11 §3.14), the sector and power association rows (V11 §3.15), the
wall defensibility and waterfront-threat rows of item 106 (V11 §3.16), the climate rows with item 111's dry-country cells
and the land-use rows (V11 §3.17), the era and region table and the material rows (V11 §3.19), the government, religion
and household rows (V11 §3.21), the crypt column of item 109 (k) (2) (V11 §3.5.8), the underground's content rows of
item 109 (V11 §3.23), item 110's rows (V11 §3.24) and item 113's history rows (V11 §3.25); (d) the **naming system's
grammars** — their structure, features and rule sets per entity kind — and the **authoring plan for their
vocabularies** (V11 §3.20); (e) the **editing, versioning, testing and authoring plan** of all of it (V11 §4, §7, §8),
with every edge of the content system defined (V11 §3.26).

**Base hooks consumed** (each by section; nothing restated):

| base hook | section | what this volume plugs into it |
|---|---|---|
| the override layer, keyed rows, cells with provenance and `extension`, per-preset values, reference cells, `documentOnly` tables, the pinning hash, orphans, slice invalidation | §7.6 | every table of V11 §3.1; the compiler (V11 §3.2) emits that cell shape |
| `RosterTables` and the row types of §10.2 | §10.2 | the rows (V11 §3.5–§3.15); the types §10.2 marks "V11 §2.x" (V11 §2.3–§2.8c) |
| the sequential roster, need propagation, markets, seats | §4.2 S2, §10.2 | the classes' roster columns, supply edges and `perConsumers` (V11 §3.5, §3.7) |
| the placement solver and its read-only explanation | §4.7 S10a, S10b; `PlacementSolver.explain` | the derived family rows and signature pairs (V11 §3.3) with the row ids of V11 §2.4 |
| the designation template, the mutator's compatibility table, class mix, clusters, concealed institutions | §4.7 S11 | template families (V11 §3.6), compatibility rows (V11 §3.6.3), cover rows (V11 §3.14) |
| typing, the band set, fields and drivers, character, identities, dials, band ranges, soft terms | §4.5 | district-kind rows (V11 §3.9), identity rows (V11 §3.10), `w_sun` and the climate row's water and sunlight cells (V11 §3.3.5, §3.17.1) |
| water in dry country: the oasis, the arid chances, the water pull, well yield | §4.2 S0, S1 (2), (10), S3 (6), §4.5, §4.7 S10b, §4.9 | the climate rows' item-111 cells (V11 §3.17.1), the water table's yields (V11 §3.24.6), the `garden` land-use row (V11 §3.17.2) |
| the greenery rule table, climate rows, farm modes, land uses | §4.9, §2.7 | climate and land-use rows (V11 §3.17); the greenery rows are §4.9's |
| the decline table, survivors' ladder, Works table, salvage | §4.11 | the salvage and durability rows by material (V11 §3.18) |
| history-first generation, the buried former settlement | §4.11, II.7.6, §7.7 DR36–DR39 | the history rows (V11 §3.25) |
| `MaterialRow`, the regional shift, the era and region preset | §2.6, §7.7 layer 2, D-2 | the era table and the material rows (V11 §3.19) |
| the naming engine, setting packs, user corpora | §10.4, §9.6, §4.10 S13a | the grammar slices and their features (V11 §3.20) |
| table edits, row operations, presets | §7.1 (`editTable`, `RowOp`), §7.4 | the tables editor's row set and lifecycle (V11 §4) |
| the dossier row sets and the port's lookup chains | §14 item 7; V08 §2.6, §3.5 | the rows of `kinds`, `archetypes`, `categorySynonyms`, `keywords`, `ladders`, `goodWords` and every tag family's profile (J-V8.18) |
| the clean-room chain and honest provenance | §17.1 (2), (5), (6) | the authoring discipline (V11 §3.2.6), the provenance grammar per cell |
| the package layout | §14 | `@plat/tables`: registry, compiler, loader; `@plat/content`: item 104's resolver and the family derivation (V11 §3.3.4) |
| the statistics bench and the owner-item bar convention | §13.2 | the per-row bars of V11 §7; the off forms the no-op pins read (V11 §3.24.0) |
| basements, the terrain gate, the crypt | §2.6 *Basements*; §10.2 | the `crypt` and `cryptM2` rows and `crypt.rankShare` (V11 §3.5.8) |
| the underground systems, access, the undercity's void sources | II.7.3, II.7.5, II.7.6 | the rows of `tables/under/ruin.json`, `openings.json`, `dig.json`, `catacomb.json` (V11 §3.23); `undergroundAccess.prob` (V11 §3.5.1) |
| item 110's records, levelling, raised parts, deck plots, `Use.specialisation` | §2.2, §2.7, §3.4, §4.2 S1, §4.3, §4.6, §4.7 S10–S11 | the rows of V11 §3.24 |
| the values the base calls table values: the dynamic grid's cells, New random's advance bound, the crossing search band | §3.3, §5.1 (6), §4.2 S1 (5), §6.3 | the base settings row (registry row 93, V11 §3.1) |
| the style check | §13.2 (T112-1), §8.2 | the style sheets' check row and its cell `cvd.minDeltaE2000` (registry row 52) |

**Out of scope** (with the owner of each): the solver's scoring code and the relaxation pass (§4.7); item 110's geometry
— the levelling and the `RetainingWall` records, the raised parts, their course solver and generator, the deck-plot
cutter (the base), the tiers (V02), the vaults and ruin monuments (V04), the epochs' raised-way pass and decline (V06),
the tools (V09); the island's underside, its shadow strip and its siting (V05); the epochs' use step and coverage gaps
reopening over time (V06, which reads these rows); the history replay engine (V06) and the reading of SettlementForge's
history (V08); the village classes (V07 §2.4, whose rows this volume cites and whose `villageForm` column it fills for
the town classes, V11 §3.22); the port's adapter, the lookup chains and their shapes (V08); the room programmes (V03,
`roomProgram.json`) and the crypt's plan (V03); the composition rows and the crypt's basement ladder (V02,
`composition.json`); the underground tables' schemas and every stage that reads them (V04, `tables/under/*` — this volume
writes the rows of four of them, V11 §3.23); the evolution tables (V06, `tables/evolution.json`); the style sheets and
the palette values (§8.2); the prices, stock and professions' content of `@plat/sim` (M4b, §10.3 — this volume gives
their catalogue rows and authoring plan, V11 §3.21.4); the screens of the tables editor and of the siting panel (V09);
the clerk's dialogue (V10). The vocabularies (word lists and corpora) are authored at build time by the plan of V11
§3.20.6 (J122: written during the build, clean-room); this volume fixes their grammars and bars, never their words
(§17.1).

### 1b Wiring table

Every new piece, what feeds it and what it feeds. "Base" names the hook it plugs into. A table's stage and module
readers are stated once, in its registry row (V11 §3.1); a row below cites that row and names only the consumers a
registry row does not carry (tests, exports, the register, the docs).

| # | piece | produced by (fed from) | consumed by (feeds) | base hook | dossier field and derivation row |
|---|---|---|---|---|---|
| W1 | `TableSchema` registry (V11 §2.1) | `@plat/tables` source (`registry.ts`) | the compiler, the loader, the tables editor (V09), the docs generator (§14 `docs`), the provenance audit (M4) | §7.6, §14 | — |
| W2 | authoring source files `src/<table>/*.json5` (V11 §2.2) | authors (V11 §8) | the compiler | §7.6 | — |
| W3 | the compiler `tables compile` (V11 §3.2) | W1, W2 | shipped `tables/<id>.json`, the manifest, `dist/evidence.json`, the clean-room scan input, CI | §7.6, §17.1 (5) | — |
| W4 | `TableView` with derived family rules (V11 §3.3.4) | the loader over the override chain (§7.6) | every stage, epoch phase and module a registry row's readers name; tagged per StageId in the integration suite (T-V11-1 (b)) | §4.1, §7.6 | — |
| W5 | `SitingProfile` on each class and profile family (V11 §2.3) | V11 §3.4 rows, class deltas V11 §3.5 | registry rows 17 and 33 (W4's family derivation, item 104's resolver, V06 §3.9.9's clientele lookup); the clerk's `profile` query (V10) | §10.2 | a dossier institution's class through V08's chain (DR24) |
| W6 | `RelationFamilyRow` table (V11 §2.4, §3.3) | V11 §3.3 rows | registry row 34 (W4's `fam/…` rows) | §4.7 S10b | — |
| W7 | `SignaturePairRow` table (V11 §2.4, §3.8) | V11 §3.8 rows | registry row 35 (`sig/…` rows on both classes) | §4.7 S10b | — |
| W8 | goods columns on `ResourceRow` (V11 §2.5, §3.7), `demand` included | V11 §3.7 rows | registry row 19 (orientation at compile, V11 §3.7.3; the supply web's two-way term and `comfortM` plateau; S2's need propagation; the reverse pull's target) | §10.2, §4.2 S2, §4.7 S10b | `activeChains[].outputs` and mapping.md row 44's lists resolved to goods by V11 §3.13.5's rows (V08's adapter) |
| W9 | balance, orientation, split, coverage columns (V11 §2.3) and `coverage.rosterWeight` | V11 §3.5 rows; `roster.settings` | registry rows 17 and 24 (S10a's order, S10b's coverage term, S2's coverage option, V06's openings) | §10.2 | — |
| W10 | `LadderStepRow` table (V11 §2.6, §3.12) | V11 §3.12 rows | registry row 66 (the port's T9 / DR9, S2's member counts) | §7.7 DR9; §10.2 | `institutions[].catalogId` → kind → step; `promotedFrom` / `demotedFrom` (V08) |
| W11 | `WallBarrierRow`, `WaterfrontThreatRow` (V11 §2.7, §3.16) | V11 §3.16 rows | registry rows 14 and 15 (S3 (9), S5a's arc classification, §4.8's graded furniture, §2.7's `stretchClass`, DR2, V07's palisade, V05's island rim, the mole-head slot's fort draw) | §2.7, §4.2 S3 (9) | stressors, `activeConditions[].archetype`, DR3's hostile sea partners, `config.monsterThreat`, `config.tradeRouteAccess` → V08's `threats` row set (V08 §2.6, J-V8.50) → the neutral threat key → this table → DR2 |
| W12 | `kinds` rows, 280 (V11 §3.11) | this volume | registry row 64 (DR24's first rung) | §14 item 7 | `institutions[].catalogId` |
| W13 | `archetypes` 17, `categorySynonyms`, `keywords`, `generic-<family>` classes (V11 §3.13) | this volume; the compiler emits the generic classes | registry rows 65 and 17 (DR24's rungs (2)–(7), item 104 (a)'s resolver) | §14 item 7 | `custom.sceneProfileId`, `category`, `tags`, name and `desc` words |
| W14 | custom-chain placement rules (V11 §3.13.4) | this volume | registry row 37 (S10b's flow-order placement of `CustomChainRecord` members, V06 §3.9.8) | §4.7 S10b | V08 `CustomChainRecord` |
| W15 | district-kind rows (V11 §3.9) | this volume | registry row 18 (§4.5 typing, S7b affinity, whole-neighbourhood assignment) | §10.2 `districtKinds` | quarter names through T6 (V08) |
| W16 | quarter-identity rows (V11 §3.10) | this volume | registry row 28 (S12c, the epoch character step, S13a's district naming) | §4.5 (4), §10.2 | district-defining kinds (T9), naming claims (item 82) |
| W17 | cover and concealment rows (V11 §3.14) | this volume | registry rows 26 and 17 (§4.7's concealed institutions, II.7.3's access multiplier) | §10.2 | `facets.clandestine`, `facets.subterranean` (V08) |
| W18 | sector, power-link, sector-link rows (V11 §3.15) | this volume | registry rows 29 and 31 (§4.5 (2), (6); S2's town-level character) | §10.2 | `economy.incomeSources` (T13), `powers[]` (T15) |
| W19 | `EraRow` table (V11 §3.19.1) | this volume | registry row 50 (moat, intervallum, towers, lights, fuel and timber, market green, material keys, V07's pump date, the harbour chain, the raised-way chance, V04's vaults) | `CircumstanceSlice.era` (§7.7) | the era V08 §2.6's era row derives from `site.culture` |
| W20 | `MaterialRow` rows (V11 §3.19.3) | this volume | registry row 49 (S11's material read, §8.2's texture and colour roles, §4.11's Works durations) | §2.6 | `materialFamily` of a custom record (item 104; DR15) |
| W21 | `ClimateRow` rows with item 111's cells (V11 §3.17.1) | this volume | registry row 43 (species, field system, roof form, the arid water chances and the oasis, the water pull, the prosperity water term, the sunlight cell, the wells' weight and coverage, the gardens and grove) | §4.9, §4.2 S0–S3, §4.5, §4.7 S10b | `site.terrain`, `site.culture` → biome (the digest's `site` row, V08 §2.6); `oasis_water` → an oasis (DR1) |
| W22 | grammar slices and descriptions (V11 §3.20) | this volume's grammar sources + authored corpora | registry rows 68–71 (S13a, the description writer, V05's island names, V01's local places and way names, V06's chronicle, V04's underground names) | §10.4 | claimed names (item 82) bypass the grammar |
| W23 | government, religion, household rows (V11 §3.21) | this volume | registry rows 20–23 (seats, temples, households, the dials) | §10.2 | `government.name` (T14), `religion` (V08) |
| W24 | `villageForm` column fill (V11 §3.22) | this volume | registry row 17 (V07 §3.11's substitution) | §10.2 | DR24 at village rungs |
| W25 | the table manifest, provenance report and `dist/evidence.json` (V11 §3.2.1 step 7) | the compiler | the M4 provenance audit, release notes, the corpus stage (§13.9), the tables editor's and the clerk's evidence lines (V12 §2.10) | §13.9, §6.4, §7.6 | — |
| W26 | row-level "why" ids (V11 §2.4) | W4's derivation | `PlacementSolver.explain` and its `WhyPull.row`, V06's `UseMove.why`, the clerk (V10), the siting panel (V09), `exportWhy` (W45) | §4.7 S10b | — |
| W27 | the `crypt` column, `cryptM2` and `crypt.rankShare` (V11 §3.5.8) | V11 §3.5.8 rows; `roster.settings`; a dossier crypt record or the `crypt` keyword binds `always` | registry rows 17 and 24 (§2.6's basement function, V02's crypt ladder, V03's crypt ring and rank trim, V04's crypt join, V06 §3.18.3, V05's rim-slab vault, V09's crypt line, V10's why); V12's register | §10.2; §2.6 | the cathedral records (`cathedral_10_000_only`, `great_cathedral`) and church records (DR32) → classes by V11 §3.11; a dossier crypt record → `always` (V08) |
| W28 | the burial faces: the `churchyard` yard part of the `church` and `cathedral` families, the `burial` yard part of the `cloister` and `burial-ground` families, the `cemetery_network` COUNT row (V11 §3.6.1, §3.12) | V11 §3.6.1, §3.12 rows | registry rows 17 and 66 (V04 §3.5.1's candidates, V06's lineage keys, V07 §3.12's hand-off, DR32, S11's yard parts) | §2.5 `YardPart`; §4.9's churchyard row | `burial_ground`, `graveyard`, `parish_burial_grounds`, `burial_grounds_and_charnel_house`, `cemetery_network` (DR32) |
| W29 | the catacomb rows (`under.catacomb`; V11 §3.23.8) | V11 §3.23 | registry row 58a (U-SYS, V06 §3.18.2, V07 §3.12, V09's catacomb view, V10's why); V12's register | II.7.6; V04 §2.3's `CatacombRule` | the church count from church records and their ranges (item 108 (c); T9 / DR9) |
| W30 | the ruin rows (`under.ruin`; V11 §3.23.2–§3.23.6) | V11 §3.23 | registry row 58a (V04 §3.5.0a, U-CITY C1, U-FADE, U-FORECAST; V07 §3.16; V06's ruin decay); V12's `paired` and `twoSample` bars | II.7.5, II.7.6; V04 §2.3's `RuinRule` | `ancient_ruins` deposit, `ruined-landmark` records, `magical_node`, ley-line income rows, `magical` history events, `history.age`, delving institutions (V08's `ruinEvidence`, DR30) |
| W31 | the opening and dig rows (`under.openings`, `under.dig`; V11 §3.23.7) and `under.rule`'s `access.ruinGain` | V11 §3.23 | registry rows 58a and 57 (V04's U-ACCESS, II.7.3's access probability, V06's excavation, V07 §3.16); V12's `voidSealedDeep` and `voidAccessible` bars | II.7.3; V04 §2.3's `OpeningRow`, `DigRule` | a ruin known to the dossier (`ruined-landmark`, `ancient_ruins` discovered) → `ruin_entrance` 1 |
| W32 | the cavern cell `miningCellShare` (V11 §3.23.1) | V11 §3.23.1 | registry rows 9 and 59 (§4.2 S1's geology rows, V04's cavern existence and fissure variant) | §4.2 S1, II.7.6 | `site.terrain` `mountain` → mountainous (DR1); the mining deposits (V08) |
| W33 | the `naming.ruin` slice and the corpora `ancient.root`, `ruin.generic` (V11 §3.20) | V11 §3.20 grammar; corpora authored | registry rows 68 and 70 (S13a's ruin names, V04's label row) | §10.4 | a civilisation named by `history` bypasses the grammar (item 82) |
| W34 | the `building.wingRole` slice (V11 §3.20.1) | V11 §3.20 | registry row 68 (V02's wing hover label, V02 §5.4) | §10.4 | — |
| W35 | the pseudo-class `@absent:<class>[+<class>]` (V11 §3.11) | V11 §3.11 rows | registry row 64 (V08's DR24 routing → S2 zeroes the class's `min` and demand; at a village rung the `v.` class that plays each named class, V07 §3.11 step 1) | §4.2 S2 (via V08) | `access_to_external_mill`, `access_to_parish_church` |
| W36 | hinterland land-use providers of a good's `site.landUse` | V11 §3.7.1's `site` column | registry row 19 (S2's need propagation, S10b's provider rasters) | §4.2 S2, §4.7 S10b | — |
| W37 | coverage units at a plot and the roster's coverage option | V11 §2.3, §3.3.1, §3.5.1 | registry rows 17 and 24 (S10b's `cov/<class>` term, S2's count draw at the base rungs; none at the `territory` rungs) | §10.2 | — |
| W38 | feature classes `wall`, `wallInner`, `open:square`, `open:green`, `gate`, `harbour` | S3 (the enceinte), S10 (0) (the inner setback band), S7b and S12b (squares, greens), S7 (gates), S3 (the harbour) | `resolveSiting`'s rows, S10b's rasters | §4.7 S10b | — |
| W39 | relative `upstream`, `downstream`, `upwind`, `downwind` with a `to` | V11 §3.3.1's water family, the pairs | S10b's satisfaction | §10.2, §4.7 S10b | — |
| W40 | `DistrictKindRow.affinity` | V11 §3.9 rows | registry row 18 (§4.5's typing scorer, S7b (1)'s affinity) | §10.2 | — |
| W41 | `LadderStepRow.identity` and the QUARTER identity rows (V11 §3.10, §3.12) | V11 §3.10, §3.12 | registry rows 28 and 66 (§4.5 (3)–(4), S13a's district naming); V01's quarter records | §10.2 | QUARTER records (V08 T9) |
| W42 | the `siting.declared` key forms and cells; `siting.linkEdits` (V11 §4.2) | V09's gestures (V09 §2.6), the clerk's accepted proposals (V10) | registry row 76 (item 104's resolver, S10a and S10b's link binding and split test, S11's specialisation) | §7.6 (`documentOnly`) | never written to the dossier (item 20 (h)) |
| W43 | provenance sources `general ⟨practice⟩`, `sf:⟨file⟩@⟨baseline⟩`, the cell's `evidence` and `ownerRule` | authors; V12's accepted runs; the compiler's stamp (V11 §3.2.1 step 4) | the compiler, the tables editor, the clerk, the M4 audit, `dist/evidence.json`, V12's register check | §17.1 (6); §7.6 | — |
| W44 | the id forms `drv/<driver>` and `bal/<class>` (V11 §2.4) | the field's driver table; W4 | V10's `WhyPull.row` and `FieldDrivers`, V09's siting panel | §4.5, §4.7 S10b | — |
| W45 | `exportWhy` (V11 §5) | the export options | GeoJSON and CityJSON writers | §11.1 | — |
| W46 | the committed catalogue manifest `src/dossier/catalogue.<line>.json` with its `ladderPairs` | V08's build step | registry row 77 (the compiler's `coversManifest` rule and the ladder cross-check, T-V11-2) | §14 item 7 | the line's catalogue and the ladder file's pairs in V08 §2.4's manifest shape (V08 §3.5.1 (f)) |
| W47 | class tags (profile family, class id, `church-family`, `notice`, `riverbank`) and the derived `noxious` and `cluster` (V11 §3.5.1) | the compiler | registry row 17 (§4.5 (2)'s plot mix, the identity rows' families, `#<tag>` rasters, the notice posts, `SectorRow.tags`, S10a's noxious-first order, field pass 2's kernels, S7b (2)'s sub-districts, V06's church-family reads, V04's church count) | §10.2 | — |
| W48 | `HeightsRow.attic`, `parapetCm`, `towerStoreyCm`, the role table (V11 §3.6.5), the `sky-*` district kinds and the landing rows (V05) | V11 §3.6, §3.9, §3.5.13 | registry rows 5, 17 and 18 (V02's massing and heights, S11's structures, V05's arena typing, V01's unit runner) | §10.2, §2.6 | — |
| W49 | `terrace` and `retaining` (V11 §3.24.1), the relief column `terracedEdges` | V11 §3.24.1 rows | registry rows 78, 79 and 9 (the levelling and the `RetainingWall` records, V01's stepped fabric and `levelledUnits`, V07's village cells, V09's T2 and T3 and their flat-ground bends, V06 §3.19.4, V05's island arena); V12 §3.4.2's model metric `retaining.onFlatM` | §2.7 `RetainingWall`, §4.7 S10–S11; §4.2 S1 | — (relief from the terrain row; a dossier `mountain` terrain is mountainous, DR1) |
| W50 | `raisedWays` with its `settings` and `structure` (V11 §3.24.2) | V11 §3.24.2 rows | registry row 80 (the raised-way generator at S4, each later stage's S5b and S6's end; V06 §3.19; V09's T4 and aqueduct tool; V04's arch vaults and foundations; V05's caster ceiling; V10's `rw/<kind>`; DR35's landmark threshold); V12's register | §2.7, §3.4, §4.3, §4.6 | the water-system record, the landmarks on high ground, `site.culture` (V11 §3.24.7) |
| W51 | `ways.crossing` (V11 §3.24.5) | V11 §3.24.5 rows | registry row 81 (the way builders where a way crosses a retaining wall, the raised ways' ends, V09's ghosts, V10's `cross/<class>`) | §2.4 `WayClass` | — |
| W52 | `deck` and the compiled `deckOk` (V11 §3.24.4) | V11 §3.24.4 rows; the compiler (step 5a) | registry rows 82 and 17 (the deck-plot cutter, V02's `DeckBudgetRead` and storey bend, V06 §3.19.5, V07's village widths, V09's badges and T6 landward bend, V10's `deck/…`, `deckok/…`); V12 | §2.7 deck plots; §10.2 | — |
| W53 | `deck.landmarks` and the classes `fort` and `lighthouse` with the template family `fort` | V11 §3.24.4, §3.5.7, §3.5.9, §3.6.1 | registry rows 83, 17 and 68 (the cutter's slot draws, V02's landmark composition, V09's T6 slots, `naming.landmark`); the two known-city fixtures; §5's fortified and institution symbols | §4.8 (item 106 (e)'s chain tower) | the waterfront threat key through V11 §3.16.2 (V08's `threats` row) |
| W54 | `roster.specialisations` and the `stepped-shrine` heights row | V11 §3.24.3, §3.6.4 | registry rows 84 and 5 (S11's draw → `Use.specialisation`, V02's resolution chain, V03's plan rows, V07 §2.4's village cap, V10's `spec/…`, DR15's trace); V12 | §4.7 S11, §2.7 `Use.specialisation` | `site.culture` (V08, DR15) |
| W55 | the ancient-culture `monument` cells (V11 §3.23.4) | V11 §3.23.4 | registry row 58a (V04's monument rule laying V02's `stepped-monument` row) | II.7.6 | the ruin's sources (W30) |
| W56 | `water` and `ClimateRow.rainMmPerYear` | V11 §3.24.6, §3.17.1 | registry rows 85 and 43 (the aqueduct reason, V06 §3.19 (3), V09's uphill-aqueduct bend to a well, the well-yield raster, V06's failing spring) | §4.2 S1 (10), II.7.6 (`cisternDistM`) | — |
| W57 | the feature class `raised:terminal` and the criteria row `pc/aqueduct/<way lineage>` | V11 §3.3.3; the aqueduct generator writes the row | S10b's placement of the one `conduit_house` bound to a cistern terminal; V04's terminal cistern under its yard | §7.7 `PlacementCriteria` | the `aqueduct_or_water_system` record's bound conduit house (V08) |
| W58 | the era factors `aqueductM`, `raisedVaultM` and the culture `building` block | V11 §3.19.1, §3.20.3 | registry rows 50 and 71 (the raised-way chance, V04's `span.vaultShare` scale, V06 §3.19) | `CircumstanceSlice.era` | `site.culture` and the era V08 resolves |
| W59 | the structures decline block and the structure material keys (`retaining`, `raised:<kind>`, `pier`, `deck`), the wall materials `dry_stone`, `earth_bank`, `timber_crib` | V11 §3.18, §3.19.3 | registry rows 46 and 49 (V06 §3.19.2 and §3.19.4's decline and salvage, the levelling's material draw, §8.2's texture roles, V09's style panel) | §4.11, §2.6 `MaterialRow`, §8.2 | — |
| W60 | the naming additions: `naming.ruin`, `building.wingRole`, the `raised` guard, the fort, lighthouse and mole forms, the `terraced` feature, the underground system slices, their corpora | V11 §3.20 | registry rows 68 and 70 (S13a's names for ruins, raised ways, slot buildings, moles, terraced districts, sewers, catacombs, voids and plazas; V02's wing hover label) | §10.4 | a ruin civilisation named by `history` bypasses the grammar (item 82) |
| W61 | the item-110 switches (`terrace.enabled`, `raisedWays.chance`, `deck.offer`, `roster.specialisations` chances, `deck.landmarks` chances) | V11 §3.24.0; the parity presets (§7.6) | every item-110 reader's no-op path; T-V11-31; the `NoOpPin`s T-V2-50, T-V4-69, T-V5-15, T-V6-65, V07's village pin (V12 §3.7.8) | §7.6, §13.2 | — |
| W62 | the `v.<id>` village namespace in `roster.classes` and the `villageForm` targets (V11 §2.9, §3.22) | V07 §2.4's rows, this volume's column | registry row 17 (V07 §3.11's substitution, every table naming a village class); the compiler's T-V11-3 clause | §10.2 | DR24 at village rungs |
| W63 | `GovernmentRow.villageSeat` (V11 §2.8, §3.21.1) | V11 §3.21.1 rows, from V07 §3.11 DR11 | registry row 21 (the `@seat` pseudo-class at village rungs; S2's government step at the territory rungs) | §10.2 | `government.name` → T14's kind → this row (V08) |
| W64 | the archetypes' `village` cell (`ArchetypeVillageCell`, V11 §2.8, §3.13.2) | V11 §3.13.2's column, V07 §2.4's values | registry row 65 (V07 §3.11's item-104 reading, before `villageForm`); T-V7-21 | §14 item 7 (V08's `archetypes` shape) | `custom.sceneProfileId` |
| W65 | `WallBarrierRow.arcKind` and the closure-feature rule (V11 §2.7, §3.16.1) | V11 §3.16.1 rows | registry row 14 (V07's palisade, V10's unwalled-arc answers, V09's preview arcs); V12's `closure` features and item 447's export | §2.7 | the threats as W11 |
| W66 | the village naming slices `naming.villageEnd`, `naming.field` and the village features of `naming.settlement` and `naming.way` (V11 §3.20.1) | V11 §3.20's grammars; corpora authored; V07's VS8 ends, anchors and S12a fields as features | registry row 68 (S13a's village, end, lane and field names); V07 §5.3's labels | §10.4 | a dossier's names protected (DR14) |
| W67 | the web's off form `web.off` and the switches `orientEnabled`, `splitEnabled` (V11 §3.7.4) | V11 §3.7.4 rows; the parity presets | registry row 36 (the loader → S7b (1), S10a, S10b); the web's no-op pin (T-V11-21), V06's T-V6-44, V12's bar map 105 (k) `noRegression` reference arm (V12 §2.7) | §7.6 | — (the dossier's own chains stand, item 105 (i)) |
| W68 | the preset entries on V11's cells and the `PresetId` union (V11 §2.2) | V11 §2.2's rule; written at C2 and C3b (`MFCG`, `FTG`), with V07's V-M0 (`VG`) and V02's M6c (`FM`) (V11 §8) | the compiler's preset check (V11 §3.2.1 step 4); the loader's preset step; T-V11-21; V12 §3.7.2 (3)'s run scope and §3.7.6's emission target | §7.6 (items 376–377) | — |
| W69 | the bench-bar registrations of the bars V11's register entries name — the base's T16-4 and V11's T-V11-30, each a V12 `BenchBarDef` (V11 §8) | the seat landing C1 (T16-4, `owner` `'base'`) and C2 (T-V11-30, `owner` `'V11'`) | `plat parity`'s bar rows → the metrics `bar.T16-4` and `bar.T-V11-30` (V12 §2.1); V12's register lint (T-V12-20) | §13.2; V12 §2.1 | — |
| W70 | the village-read scope of `VG` — the source manifest's `productStages.village`, the compiled `villageRead` flag and `villagePresetCells` (V11 §3.2.1 steps 1, 4, 7) | the seat landing V07's V-M0; the compiler over `REGISTRY`'s `readers` | the compiler's preset and off-form checks and the loader's preset step under `VG`; V07 §3.15's `VG` cell list; T-V11-9 | §7.6 | — |
| W71 | the registry's readers as StageIds, the source manifest's `stageIds`, the compiled `stageReaders` (V11 §2.1, §3.1's *Readers*, §3.2.1 steps 1, 6, 7) | each change that registers a stage; the registry source | the compiler's reader check; the village-read test; V12's run scope and cost shortcut (V12 §3.7.2 (4), §3.7.7); §7.6's invalidation; T-V11-1 (b) | §4.1, §4.12, §7.6 | — |
| W72 | registry rows 86–89 — `toolkit`, `messages`, `clerk.ops`, `clerk.content` | V09's and V10's rows (V09 §2.3, §2.9, §4.2, §4.9; V10 §2.10, §3.3) | registry rows 86–89 (the application's shell, the clerk, `@plat/docs`); T-V11-1 (a); T-V11-37 | §14 `@plat/tables` (item 516) | — |
| W73 | V04's dossier row sets `dossier.sanitation` and `dossier.subterranean` in registry row 63 | V04 §2.3a's rows, shipped with V04's content row (M6-U); empty before it, so no record forces sewers or a system | registry row 63 (`port.digest`'s creation at door 1 by DR17; V09's why card); T-V4-34, T-V4-38; T-V11-1 (a); T-V11-37 | §7.7 DR17; §14 | the sanitation and subterranean records → DR17 |
| W74 | `raisedWays.settings`' `elevated.landmarkMinSignificance` (V11 §2.8c, §3.24.2) | V11 §3.24.2's row (20, the castle's significance) | registry row 80 (V11 §3.24.7 (4)'s landmark count → `landmarkFactor^n`; V06 §3.19; DR35); T-V8-38; V12 §3.11's `raisedWays` settings line | §4.3, §4.6 | the dossier-bound institutions' class significance (§10.2; item 72) → DR35 |
| W75 | `NG` in `PresetId`, its resolution and its compile scope (V11 §2.2, §3.2.1 step 4, §3.2.2) | V01 §3.15 (the preset's definition); the seat landing V01's M5 (its entries on `hood.constants`) | the compiler's preset checks under `NG`; the loader's preset step → V01's NG harness (T-V1-31) and the M5 panel's NG pairs (T-V1-32); V12's `PresetArm` `'NG'` | §7.6 | — |
| W76 | registry rows 90–91 — `way.surface` and the base table `squares.quota` | V01's rows (V01 §3.7.3, §3.5.2), shipped by V01's M2b pieces | registry rows 90–91 (S10a's way-surface rule with S6's and EVO_DECLINE's re-lays, S7b (3)'s square claims, S2's land estimate, S9b's quota); T-V11-1 (a); V12's register | §2.4 `Way.surface`; §4.5 S7b (3), §4.7 S9 | — |
| W77 | the display cells — `label`, `icon?`, `synonyms`, `commonness` on every class row; `label`, `icon?` on the profile families, goods, district kinds and style sheets (V11 §2.3, §3.1's *Display cells*) | V11's source rows; V07 §2.4 (the `v.` rows); the compiler (a class's `icon` and `commonness`, the generic rows' cells) | registry rows 17, 18, 19, 33 and 52's display modules (V09's roster reader, T6's palette and T5's cards, the link view, the message slots V10 renders, V08 §4.6's notes); `@plat/docs`; V09 §5.1's sprite holds the 45 `fam.<key>` glyphs | §10.2 `BuildingClassRow`; §14 (item 516) | — (no dossier field feeds the words) |
| W78 | the span-rule cells `raisedWays.structure.span` and `.slideMaxFactor`, and `retaining.settings.stateSnapCm` (V11 §2.1's settings form) | V11 §3.24.1, §3.24.2 (their values stated there) | registry rows 79 and 80 (item 244's support step and the span rule, V04's `foundationObstacles` and arch vaults, item 245's state-knot carry); V12's register (the span-rule, `raisedWays.structure` and `retaining` lines); T-V11-1 (a) | §2.7's raised-way record and `RetainingWall` (items 244, 245); II.7.6's vaults | — |
| W79 | item 111's climate cells — the arid water factors, the oasis chance and its no-other-water factor, the oasis area band, garden factor, channel reach and grove band, the water-pull weights and radius, the sunlight cell, the wells' yield weight and coverage factor (V11 §3.17.1) | V11 §3.17.1 rows | registry row 43 (S0's water chances, S1's oasis, S3's water pull, the prosperity water term and sunlight cell, S10b's wells and the sunlit prestige term, S12a's gardens, S12b's grove, V07's village water pull, V06's epochs); T-V11-38; V12's register and item 111's `NoOpPin` (T111-5) | §4.2 S0, S1 (2), S3 (6); §4.5; §4.7 S10b; §4.9 | a dossier's `oasis_water` deposit makes the oasis exist (§7.7's oasis row, citing DR1); `site.terrain` → biome |
| W80 | the water table's well yields by ground class (V11 §3.24.6) | V11 §3.24.6 | registry row 85 (S1 (10)'s well-yield raster, the aqueduct balance's `wellsPerHa` key, V06's failing-spring draw) | §4.2 S1 (10) | — |
| W81 | the `garden` land-use row (V11 §3.17.2) and its goods | V11 §3.17.2, §3.7.2 | registry rows 44 and 19 (S12a's surface role, §8.2's tiles, the herbs provider raster) | §2.7 `LandUse` | an oasis's gardens (item 111) |
| W82 | item 113's history rows — `history.settings` (`replay`, `epochYears`, `symbolicQuantile`, `defaultAgeYears`, `burialYears` and its factors and bounds, `reuseCost`) and the event-to-epoch rows (V11 §3.25) | V11 §3.25 | registry row 92 (the history-first path's start at S0, V06 §3.20's replay planner, V04's `BuriedFormer.lay`, the refounding's route solves); V10's story lines; T-V11-39; V12's register and item 113's `NoOpPin` (T113-7) | §4.11 *History-first generation*; II.7.6; §7.7 DR36–DR39 | `history.events[]` types, years ago and severity; `tierHistory`, `populationHistory`, `calamityHistory` (V08's history reading) |
| W83 | the base settings row (`index.gridCellM`, `reroll.maxAdvance`, `crossing.searchBandM`) | V11 §3.1's base settings paragraph | registry row 93 (the kernel's dynamic grid, New random, S1 (5)'s crossing search and §6.3's bridge anchor) | §3.3, §5.1 (6), §4.2 S1 (5), §6.3 | — |
| W84 | the underground naming slices `naming.sewer`, `.catacomb`, `.cavern`, `.quarry`, `.vaults`, `.buried`, `.undercity.plaza` (V11 §3.20.1) | V11 §3.20 grammars; corpora authored | registry row 68 (S13a in the underground tail; V04 §5.4's label rows) | §10.4 | a catacomb reads its cemetery's or church's name; a buried town its quarter's (II.7.6) |
| W85 | the style check's threshold `cvd.minDeltaE2000` (the style sheets' check row, registry row 52) | V11 §3.1 (row 52) | T112-1's style check (§13.2) | §8.2, §13.2 | — |

## 2 Data model

Everything below is TABLE data — versioned JSON in `@plat/tables` (§7.6, §14), never document state — except the two
document-only tables of V11 §4.2 (`siting.declared`, `siting.linkEdits`). A table's rows are keyed by a stable string key;
a cell is §7.6's. Units are §2.1's `Unit` vocabulary, of which a column takes the subset `ContentUnit` (V11 §2.1);
two of them have a content meaning stated here: `weight`, a dimensionless solver weight (one fully satisfied soft row of
weight 1 is one score unit, §4.7 S10b), and `lvl`, the ordinal nuisance level (V11 §2.3's `Lvl`: 0 none, 1 low, 2
middle, 3 high).

### 2.1 The table registry

```ts
// TableId is §7.6's type: a dotted, stable, never-reused name — 'roster.classes', 'siting.families', 'dossier.kinds', 'era', 'naming.district' …
type SliceKind = SliceRef['kind']   // §2.8: 'row'|'weights'|'bracket'|'thresholds'|'match'
type ContentUnit = Extract<Unit, 'm'|'m2'|'ha'|'cm'|'cdeg'|'share'|'weight'|'people'|'yr'|'wk'|'m3'|'lvl'|'none'>   // §2.1's Unit, this volume's subset
interface ColumnSpec {
  name: string /* the field path, dotted for nested cells: 'template.floors', 'profile.emits.smell' */;
  row?: string /* the settings form (below): the one named row this column belongs to — 'settings', 'structure'; absent: a column of the keyed rows */;
  type: 'number'|'integer'|'bool'|'string'|'enum'|'ref'|'range'|'weights'|'list'|'object';
  unit: ContentUnit;
  range?: [number, number] /* the declared range; an edit outside it is clamped (V11 §4.1) */;
  enumValues?: string[]; ref?: TableId /* a ref column's target table: its value must be a live row key there */;
  interp: 'band'|'step'|'none' /* band: interpolated along the prosperity value between band rows (§4.5); step: switches at the cut; none: not band-keyed */;
  calibratable: boolean /* the corpus stage may re-sign it (§13.9) */; extensionAllowed: boolean /* may carry §7.6's extension marker */;
  presetsRequired?: boolean /* a categorical option cell: the schema refuses it without an entry for each zeroing parity preset whose file ships, on the tables that preset requires one — `MFCG` and `FTG` on every table; `VG` (from V07's V-M0, the milestone whose content ships the `VG` preset file, V07 §8) only on a village-read table (V11 §3.2.1 step 4); `NG` on none (§7.6) */;
  sumsTo?: { group: string; total: number; tolerance: number } /* weights that must sum (a class's powers, sectors; a cover row's weights need not) */ }
interface TotalityRule {   // a coverage promise the compiler checks and CI holds (T-V11-2)
  kind: 'coversEnum'|'coversTable'|'coversManifest'; column: string;
  of: string /* an enum name, a TableId, or a manifest list: 'sf.catalogue@<line>', 'sf.archetypes@<line>' */; allowFallback?: string /* the row key a miss resolves to, reported */ }
interface TableSchema {
  id: TableId; file: string /* shipped path under plat/packages/tables/dist/, e.g. 'roster/classes.json' */; rowType: string /* the TypeScript row type's name, §10.2 or this volume */;
  key: string /* the key field; composite keys joined by '/' in declared order, e.g. 'trueCls/band' */; columns: ColumnSpec[];
  readers: string[] /* who reads it — the invalidation map of §7.6: a stage or an epoch phase by its StageId, a reader outside the stage graph by its module id (V11 §3.1's *Readers*) */;
  sliceKinds: SliceKind[]; rowsHome: string /* the document section that writes the rows: 'V11 §3.5', '§4.9', 'V07 §2.4' … */;
  owner: 'base'|'V01'|'V02'|'V03'|'V04'|'V05'|'V06'|'V07'|'V08'|'V09'|'V10'|'V11' /* the design document owning the schema */;
  parity: 'zeroExtensions'|'perPreset'|'untouched' /* how §7.6's parity presets resolve it */; packPatchable: boolean /* a SettingPack's rosterPatch or tablePatch may target it (§10.4) */;
  totality: TotalityRule[]; version: string /* semver of the table content; major = a changed schema, minor = a declared output shift, patch = no output change */ }
```

`@plat/tables` exports `REGISTRY: ReadonlyMap<TableId, TableSchema>` — one entry per row of V11 §3.1's catalogue, the
one list every tool reads (the compiler, the loader, the tables editor, the docs generator, the provenance audit). A
table not in the registry cannot be loaded, patched or edited (the loader refuses it, F-EDIT); a registry entry without
its file fails the build. **Every registry row exists from C0** (V11 §8): a row whose rows-home milestone has not landed
ships its file as its schema's empty table (no rows; the manifest's `rows` 0), its *status* column (V11 §3.1) unchanged —
`written (Vnn)` names who writes the rows, not whether they have shipped. The compiler holds an empty table's
`TotalityRule`s and row invariants from the change that ships its first row (before it they meet no row); the tests of the
milestone that lands its rows read them (V11 §8's exits, or the owning volume's), so a table still empty past that
milestone fails there; a reader that meets an empty table reads no rows, as the readers of a `staged` row read its
absent input (registry row 32) (J-V11.84).

**The settings form** (`roster.settings`, `raisedWays`' `settings` and `structure`, `retaining`'s `settings`, V01's
`hood.constants`, the base settings row; J-V11.96). Beside its keyed rows a table may hold single rows named by a fixed
key — `settings`, `structure` — whose fields are no column of the keyed rows. Each such field is a `ColumnSpec` whose
`row` names that row, a nested cell by its dotted `name` (`span.maxHeightCm`, `span.vaultShare.viaduct`), each with its
own unit, range, `calibratable` and `extensionAllowed`, so every settings cell is a column a register entry names (V12
§3.11) and the tables editor edits as a cell. The key column admits the named keys beside its own values; a named row
holds exactly the columns whose `row` names it and a keyed row none of them (T-V11-3). A table that is only a settings
row (`roster.settings`, `hood.constants`, `base.settings`) keys that one row `settings`.

### 2.2 The authoring source and the compiled form

Authors never write §7.6's full cell by hand. They write **source files** — JSON5, one file per row group, under
`plat/packages/tables/src/<table-id-with-slashes>/` — which the compiler (V11 §3.2) turns into the shipped table.

```ts
interface SourceFile {
  $table: TableId; $defaults: { provenance: ProvenanceSpec; calibratable?: boolean } /* cascades to every cell of the file unless a row or a cell overrides it */;
  rows: SourceRow[] }
interface SourceRow { key: string; $extends?: string /* a template-family or profile-family row key of the same kind (V11 §3.6, §3.4): its cells are inherited, this row's override */;
  $provenance?: ProvenanceSpec /* row-level override */; [field: string]: SourceCell | unknown }
type PresetId = 'MFCG'|'FTG'|'VG'|'FM'|'NG'   // the registered presets of registry row 73 (§7.6; items 376, 377, 584)
type PresetEntry = { v: unknown; p?: ProvenanceSpec /* the entry's own provenance (§7.6); absent: the cell's */ }
type SourceCell = unknown /* a bare value, inheriting provenance */
  | { v: unknown; p?: ProvenanceSpec; ext?: { over: 'MFCG'|'FTG'|'VG'|'FM'|'both'|'none' /* NG adds no value (§7.6) */; mode: 'chance'|'weight'|'option' };
      presets?: { MFCG?: PresetEntry; FTG?: PresetEntry; VG?: PresetEntry; FM?: PresetEntry; NG?: PresetEntry /* on `hood.constants`' cells only */ } }
  | { ref: { table: TableId; row: string; cell: string }; p?: ProvenanceSpec }   // §7.6's reference cell: another table's cell held, never copied; resolved by V11 §3.2.1 step 4
type ProvenanceSpec = string   // §17.1 (6)'s grammar (item 534), checked by the compiler — e.g. 'own', 'owner', 'ref:MFCG 12710731 front recession (code) P9',
                               // 'general tanners below the town on the river', 'sf:institutionLadders.js@5d699cc68'; each optionally '; <note>';
                               // a cell may add `evidence` ids (V12 §2.10); the compiler adds `ownerRule` (V11 §3.2.1 step 4)
```

**The preset entries** (items 376–377, 584; J-V11.74). Every preset resolves a cell by §7.6's order. V11's own cells
carry entries in exactly two cases: (a) `presets.MFCG`, `.FTG` and `.VG` where the off value is not what the zeroing
gives, or the cell is a switch — `siting.web.bulkyWater` and `siting.web.perishableShort` 1 (their ranges start above 0),
and `siting.web.orientEnabled`, `siting.web.splitEnabled`, `terrace.enabled` and `history.replay` false (written although
the zeroing would give the same, so every switch's parity value stands in its row; V11 §3.7.4, §3.24.0, §3.25.1); (b)
`presets.FM` 0 on V11 §3.24.0's item-110 chance and offer cells — every `roster.specialisations` `chance`, every `deck`
`offer` and every `deck.landmarks` claimant chance — and on no other V11 cell (item 376's scope). V11 writes no `NG`
entry: none of its cells lies in `NG`'s scope, and each resolves under `NG` as under `MFCG`. Each entry is an off value,
provenance `own` with the note `fixed: the parity off value (V11 §3.7.4, §3.24.0, §3.25.1)`, so the provisional-number
lint passes it with no register entry and no calibration run names it (V12 §3.7.2 (3) admits a preset entry only as a
measured rate of that preset's own reference). The other tables' entries are their owners' (§7.6's reference-choice rows,
V07's `village.json` `VG` column, V02's `composition.json` `FM` cells, V01's `hood.constants` `NG` entries). The compiler
checks all of them (V11 §3.2.1 step 4); when each lands is V11 §8's.

The tables' prose shorthand "`own`; general historical knowledge, not corpus-witnessed" compiles to the source `general`
with the row's practice as its text (the row's `reason`, `says` or note); a row naming no practice fails T-V11-9. A
`corpus` source is valid for item 69's palette targets and, from M-CAL, in a `historical:<frame>` preset table when its
`evidence` names a corpus `CalibrationRun` listed in a committed `ReconciliationRecord` (V12 §2.10).

The compiled row is §7.6's cell shape exactly, with `unit` and `calibratable` from the column's `ColumnSpec`, `date` the
source file's last change date recorded by the compiler from the source manifest (never the wall clock, so a rebuild is
byte-identical), and inheritance flattened (a compiled row holds every cell; the `$extends` chain is kept only in the
provenance note: `note: 'from template family workshop-yard'`). Shipped tables are canonical JSON (keys sorted, no
insignificant whitespace, numbers in the shortest round-trip form), so their content hash is stable (§6.2's H128 over the
bytes).

### 2.3 The siting profile and the class columns items 103–108 add

```ts
type Nuisance = 'smell'|'smoke'|'noise'|'fire'|'water'|'traffic'|'crowds'|'disorder'
  // water = fouls water (item 103 (a)'s "water pollution"); traffic = heavy traffic. Holiness is not a nuisance: holy places push the profane through the alignment axis (`align:sacred+`, V11 §3.3.1), and the sacred are sensitive to disorder and noise
type Lvl = 0|1|2|3
type Need = 'runningWater'|'riverBank'|'shore'|'road'|'through'|'gate'|'harbour'|'market'|'space'|'security'|'secrecy'|'highGround'|'dryGround'|'woodEdge'|'fields'|'deposit'
type Clientele = 'dailyLocal'|'townWide'|'travellers'|'elite'|'clandestine'|'institution'|'residential'   // V06 §3.9.9's six plus residential (households, never a use's catchment)
interface NeedSpec { need: Need; strength: 'hard'|'soft'; weight?: number /* soft: overrides the family row's default */ }
interface CoverageSpec { unit: 'district'|'walk'|'households'|'settlement'|'parish';
  per: number /* range [1, 100 000]: walk — metres of the catchment radius (at least 10, T-V11-3); households — households per member; parish — households per parish; district, settlement — 1 */;
  target: number /* members per unit, soft; range [0.01, 100] */; weight?: number }
  // the unit at a plot: district — the plot's district; walk — the members within the disc of radius `per` m about the plot, counted on the 16 m raster;
  // households — the members within the disc of radius r = √(per × a_res ÷ π) about the plot, a_res the plot's district's residential plot area per household (m², derived at S10a); a district with no residential plot (a_res = 0) gives r = 0 and satisfaction 0 at its plots — no household to serve;
  // parish — the plot's cell of the parish partition: the Voronoi cells of the placed and allocated members of the `church-family` classes that count as churches (V11 §3.23.8's list) over residential land at S10a, derived per read and never stored; before any church exists, one cell per district;
  // settlement — the town. Satisfaction at a plot is clamp(2 − n ÷ target, 0, 1), n the members of the class in the plot's unit (1 while n ≤ target, 0 from 2 × target); the ranges keep per and target above 0, so the formula never divides by 0
interface SitingProfile {
  family: string /* exactly one profile family key it inherits (V11 §3.4; V08 §2.6's tag family keys, plus the category families); every class row names it (T-V11-4) */;
  emits: Partial<Record<Nuisance, Lvl>>; sensitive: Partial<Record<Nuisance, Lvl>>;
  needs: NeedSpec[]; clientele: Clientele;
  alignment: { law: -1|0|1 /* +1 enforcement, -1 crime */; sacred: -1|0|1 /* +1 sacred, -1 profane */; status: -1|0|1 /* +1 elite, -1 low */ };
  competition: { mode: 'cluster'|'spread'|'neutral'; spacingM?: number /* spread: the same-kind spacing radius inside a district (item 107 (d)) */; street?: boolean /* cluster: prefers one street (sameStreet) */ };
  coverage?: CoverageSpec /* item 103 (f) */;
  balance: 'everyday'|'specialist'|'heavy'|'wholesale'|'institution'|'residential' /* item 107 (a) */;
  orientation?: 'source'|'market'|'balanced' /* item 105 (b): absent = derived from the goods table (V11 §3.7.3) */;
  split?: { works: string /* the designation template family of the works */; shop: string /* of the shop */; threshold: number /* weight: the minimum (nuisance push + output pull) difference at which the solver splits, item 105 (h) */ };
  landmark?: boolean /* item 104 (a): asks for a prominent site (square frontage, high ground, a vista) and raises significance ×2 */ }
```

`BuildingClassRow` (§10.2, item 432) carries `profile: SitingProfile` (compiled flat: the family's cells overridden by
the class's deltas), `staff` (the working households a workplace employs at a band, read by `@plat/sim`'s postings and
by V03's staff rooms), `villageForm?` (a `v.<id>` village class key, V11 §2.9, §3.22), `templateFamily` (the authoring
family its `template` rows were compiled from, read by S11's composition key — V02's resolution chain and
`composition.roleKeys`, V02 §3.10.4 — and by the tables editor's grouping), and the crypt columns of item 109 (k) (2)
(item 436): `crypt: 'always'|'basement'|'never'` (default `never`) and `cryptM2?` (m², the crypt ring's growth target at
poor, modest, prosperous, rich; required when `crypt` ≠ `never`). `always`: the building always has a crypt, taken by
§2.6's no-refusal crypt ladder (full, half, raised; V02's crypt ladder; on an island V05's rim-slab vault) and exempt from
the terrain gate's wet-ground refusal; `basement`: the building has a crypt exactly when §2.6 draws it a full, half or
walk-out basement, so the class's cellar row is its crypt chance and the terrain gate binds it ("a church on wet ground
has no crypt"); `never`: none. A crypt is part of its building's basement (`Basement.crypt`), never an underground
system, never a catacomb source (item 109 (k) (2)). Every other §10.2 column stays. **`distribution` governs the
competition mode** (one statement; V11 §3.2.1 step 5a and §3.5.2 cite it): it is the competition's coarse reading and
stays authoritative for S7b (1)'s dispersal (J-A72.46), so the compiler sets `competition.mode` to `neutral` for a
`singular` class and to `cluster` for a `district-defining` one, whatever the family says, and lists each such override
in the manifest (J-V11.25; T-V11-4 checks the compiled result). V07 §2.4's village rows (keyed `v.<id>`) carry V07's
`presence?` column as §10.2 types it; every other column of a `v.` row is this section's and is compiled and checked by
the same rules as a town row (V11 §3.2.1 step 6).

**The display cells** (item 516; J-V11.93). `BuildingClassRow` also carries four cells, each `own`, `calibratable:
false`, never `extension`, and read by no model stage (display words move no digest, §6.3):
* `label: string` — plain words for one member ("fish landing", "parish church"), lower case but for proper words (the
  shell capitalises at the start of a card or a sentence); unique within its namespace — the town-and-city rows, the
  `v.` rows, the generic rows (V11 §2.9) — so a town `smithy` and V07's `v.smithy` may share their words;
* `icon?: string` — an id in V09 §5.1's icon sprite; a source row states none, and the compiler writes the class's profile
  family's `icon` (V11 §3.4's `fam.<family>`; V11 §3.2.1 step 5a), so the palette shows the family's glyph (V07 §2.4's
  reading for the `v.` rows);
* `synonyms: string[]` — the other whole words and adjacent word pairs a user types for it, case-folded; `[]` where none;
  never its own label nor another row's label of its namespace, and possibly shared with another row's synonyms (`mill`),
  which `commonness` settles;
* `commonness: number` (share, 0–1) — the reader's tie-break: for the town-and-city rows V11 §3.5.1's derived column (the
  row's roster share at TOWN), for the `v.` rows V07 §2.4's (the roster share at VILLAGE; J-V7.133), 0 for a generic row.

The source writes `label` and `synonyms` for every authored town-and-city row and for V05's two sky rows in V11
§3.5.15's table, V07 §2.4 for the `v.` rows, and the compiler the generic rows' (V11 §3.13.3). Their readers are the
display modules of registry row 17 (V11 §3.1's *Display cells*). The same `label` and `icon?` cells go on the other tables
the UI shows rows of: the profile families (V11 §3.4), the goods (V11 §2.5, §3.7.1), the district kinds (V11 §3.9) and
the style sheets (registry row 52).

### 2.4 Relation families, signature pairs and the derived rows

```ts
interface RelationFamilyRow {   // one row per (family, member): e.g. ('nuisance','smell'), ('need','runningWater'), ('clientele','travellers'), ('alignment','law')
  family: 'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun';
  member: string /* the Nuisance, Need, Clientele or axis it reads; '*' for supply, competition and coverage */;
  emits?: { kind: RelationRule['kind']; to: string /* feature class or field the derived row measures to */; withinM?: number; beyondM?: number; falloff: 'step'|'linear'|'smoothstep' }[] /* the row template each level instantiates */;
  radiusM: [number, number, number] /* per level 1, 2, 3: the distance over which the pull or push acts */;
  weight: number /* weight: the family's base weight; the derived row's weight is weight × f(levels) (V11 §3.3.2) */;
  strength: 'soft' /* families are always soft; a hard need is the class's NeedSpec, never a family default (item 103 (c)) */;
  extension: boolean /* true unless the references have the behaviour (V11 §3.3.1) */ }
interface SignaturePairRow {   // item 103 (b): a relation the families do not capture; sparse, each with its reason
  id: string /* 'sig.bakery-mill' — stable */; a: string /* class id or '#tag' */; b: string /* class id, '#tag' or a feature class */;
  kind: RelationRule['kind']; withinM?: number; beyondM?: number; falloff: 'step'|'linear'|'smoothstep';
  weight: number; symmetric: boolean /* true: b receives the mirrored row */; reason: string /* one sentence, shown by the clerk */ }
```

**Derived row identity (the "why" ids).** Every `RelationRule` the solver scores carries a stable id: `cls/<class>/<n>`
for a row authored on the class; `fam/<family>/<member>/L<level>` for a family-derived row (V11 §3.3.4); `sig/<id>` for a
signature pair; `sup/<class>/<resource>` for a supply edge (and `sup/<class>/<resource>/rev` for item 105's reverse
pull); `cov/<class>` for the coverage pull; `spc/<class>` for same-kind spacing; `bal/<class>` for the balance profile's
comfort-distance term (item 107 (a)–(b)); `dk/<kind>/<n>` for a district kind's row; `pc/<assignment>/<n>` for a
`PlacementCriteria` row the port or an assignment adds (§7.7; the guildhall's trade row, V11 §3.8); and `drv/<driver>`
for a term of §4.5's prosperity field (`drv/sun` for item 102's daylight term, `drv/water` for item 111's water term,
…), which V10's `FieldDrivers` and the "why is this quarter poor" answer cite. Item 110's rows add `rw/<kind>` for a
raised way's reason row (cited with the candidate's measured drop, link or need ratio); `ter/<rung>` for a retaining
wall's terrace row (with the unit's slope and step) and `ret/<band>` for its profile row; `deck/<kind>/<band>` and
`deckok/<class>` for a deck plot's budget and a class's admission; `slot/<slot>` for a landmark slot's row;
`spec/<culture>/<cls>/<specialisation>` for a stepped specialisation; `cross/<class>` for a way's stair or ramp. Item
109's rows add `under/<table>/<row>` (for example `under/catacomb/count`, `under/dig/classRow`); item 111's add
`clim/<biome>` for a climate row's dry-country cell (the oasis chance, the water pull, the sunlight cell), cited with
`drv/water` and `drv/sun`; item 113's add `hist/<type>/<template>` for an event-to-epoch row and `hist/settings` for the
burial threshold and the epoch length. Each id resolves to the row's `says` sentence (V11 §3.24, §3.25) or its note. The
solver's read-only explanation (`PlacementSolver.explain`, §4.7 S10b; item 311) reports these ids in `WhyPull.row`, and
V06's `UseMove.why` reports them; the clerk (V10) and the siting panel (V09) resolve each id to its row's `reason`
(signature pairs), its family's plain sentence (V11 §3.3.1's `says` column) or the class row's note. Ids are derived from table keys only, so they are stable across hosts and table
reloads, and change only when the row they name changes key.

### 2.5 The goods columns on `ResourceRow`

```ts
interface ResourceRow {   // §10.2's resources, declared here (item 434); the goods table of items 105 (b) and 107 (b)
  id: string; kind: 'site'|'made'|'import';
  label: string; icon?: string /* the display cells (V11 §2.3): its words V11 §3.7.1's; no shipped row states an icon */;
  bulk: Lvl /* weight or volume per unit of value moved: 3 for building stone, 0 for jewellery */; perishable: Lvl /* 3 spoils within a day, 0 never */; value: Lvl /* 3 precious, 0 near-worthless */;
  comfortM: number /* m: item 107 (b)'s plateau — full satisfaction within it */; maxDistanceM: number /* m: the default for a SupplyEdge naming this good without its own */;
  modes: ('street'|'road'|'river'|'sea')[] /* the modes it travels by, cheapest first */; security: Lvl /* item 104 (h) (2): how strongly a holder of it seeks walls, the watch or a guarded quarter */;
  site?: { terrain: 'water'|'land'|'subterranean'|'special'; landUse?: string; deposit?: string } /* kind 'site': where it is won (SettlementForge's resource kinds, item 104 (b)); a hinterland face of `landUse` is a provider of the good (§4.2 S2, §4.7 S10b; item 288) */;
  demand: 'households'|'market'|'classes'|'export' /* the reverse pull's target when no consumer class binds (item 105 (b)): households — the band-weighted `#housing` raster; market — `nearMarket`; classes — its bound consumers only; export — the store at the gate or quay facing the partner (V11 §3.13.4) */;
  volume?: number /* the good's relative flow volume, the weight orientation reads (V11 §3.7.3); absent 1 */ }
```

### 2.6 Ladder steps

```ts
interface LadderStepRow {   // item 108 (a): one row per SettlementForge catalogue kind that is a step of a ladder or a subsumption
  kind: string /* the greater catalogue kind (V08's kinds key) */; lesser: string[] /* the kinds it replaces or subsumes */;
  step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT';
  memberClass?: string /* COUNT, QUARTER, GUILD: the class each member is built as */;
  range?: [number, number] /* COUNT, QUARTER, GUILD: the member range when the record's name carries none — the value at the kind's LOWEST tier (V08's tiers of the kind) */;
  rungScale?: { CITY?: number; METROPOLIS?: number } /* × range for an unnumbered record at a rung ABOVE the kind's lowest tier; default {CITY 2, METROPOLIS 3} for a TOWN kind, {METROPOLIS 1.5} for a CITY kind, none for a METROPOLIS kind */;
  identity?: string /* QUARTER: the QuarterIdentityRow the record claims (V11 §3.10), required on every QUARTER row (T-V11-2) */;
  sizeFactor?: number /* SIZE: × the class template's footprint and plot-area budget, and σ's rank (§4.5 (1)) */;
  source: 'ladder'|'subsumption'|'inferred' /* 'ladder' and 'subsumption': SettlementForge's own pairs (item 108's quoted rows); 'inferred': read from the catalogue's tier names, re-checked by V08 against the ladder file */ }
```

### 2.7 Walls on natural barriers

```ts
interface WallBarrierRow {   // item 106 (a), (c): one per defensibility class (the key); the arc classification reads it
  barrier: 'sheerCliff'|'cliff'|'steepSlope'|'gorge'|'deepWater'|'shallowWater'|'marsh'|'open';
  test: { slopePct?: number; heightM?: number; depthM?: number /* read on a river arc only (the course's depthCm, §2.3) */; widthM?: number;
    waterKind?: ('sea'|'lake'|'river')[] /* sea and lake arcs are deepWater unless their bank kind is `beach` (then shallowWater) — §2.3 carries no depth for them */;
    siteFeature?: 'ravine'|'cliff' /* §2.3's SiteFeature kinds */; bankKind?: string[]; rule?: 'islandRim' /* an arc of a sky island's rim chain, by rule (V05 §3.21) */ } /* the test that classifies an arc as this barrier (thresholds; ours) */;
  closes: boolean /* closes the circuit for the 'enclosed' and 'sealed' tests */; wall: 'none'|'parapet'|'light'|'full';
  thicknessFactor: number; heightFactor: number; walk: boolean; towerSpacingFactor: number /* × the enceinte's spacing; ∞ written as 0 = no towers */;
  anchorTower: 'none'|'normal'|'strong' /* the tower where a stretch meets this barrier */;
  arcKind: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|null /* the closure-arc barrier kind (J-VI.3's vocabulary) an arc of this
    class reports: the arc is a closure feature exactly when its row closes and its wall is 'none'; a walled stretch carries
    the class as its grade and this kind as the barrier it stands on; 'enceinte' is V06's later-ring rule, never a row
    (V11 §3.16.1) */ }
interface WaterfrontThreatRow {   // item 106 (d): DR2's waterfront from circumstances
  threat: 'naval'|'raider'|'hostileSeaPartner'|'seaMonster'|'exposedPort'|'none' /* the neutral threat keys V08's `threats` row set produces
    from real dossier fields (V08 §2.6 `threats`, J-V8.50: stressors, conditions, DR3's hostile sea partners, `config.monsterThreat`,
    `config.tradeRouteAccess`); `raider` is a standalone and pack key only — the line has no raid or piracy word */;
  waterfront: 'open'|'quay_wall'|'sea_wall'; seaGates: 'everyQuay'|'mainQuays'|'none'; minRung?: string; weight: number /* when several threats apply, the highest-weight row wins */ }
```

### 2.8 The row types this volume declares for the base

§10.2 names these row types and cites their declarations here (items 400, 435); §7.7's `CircumstanceSlice.era` names an
`EraRow` key.

```ts
interface EraRow {   // the era and region preset CircumstanceSlice.era names (§7.7 layer 2; D-2); table 'era'
  id: string /* 'c12'|'c13'|'c14'|'c15' in the default table (V11 §3.19.1); a pack may add rows */; years: [number, number] /* the span it stands for (a label only, never a date the map reads) */;
  region: string /* 'western' default; a region preset row keys the regional material shift (§2.6) */;
  tower: { kinds: { round: number; square: number; bastion: number; octagonal: number } /* weights, §4.8 */; spacingM: [number, number] /* §4.8's straight-run spacing band */ };
  moatWidthM: [number, number] /* §4.2 S3's moat, §4.4's later rings */; intervallum: boolean /* the lane inside the wall (§2.7, §4.8) */;
  marketPaved: number /* share of market squares paved; the rest get the market green (§4.9) */; publicLighting: 'sparse'|'moderate'|'dense' /* §4.7's light rows (item 68) */;
  fuelM3PerCapitaYear: number; timberM3PerCapitaYear: number /* §4.9's fuel and timber rows */; pumpFromYear?: number /* V07's pump date: wells become pumps from this year */;
  harbourChain: 'raised'|'lowered' /* item 106 (e): how the harbour-mouth chain is drawn */; suburbRegime: boolean /* FTG's cul-de-sac suburb admitted by the era (§4.4) */;
  materialRows: string /* the MaterialRow key prefix this era's rows use (V11 §3.19.3) */;
  aqueductM: number /* × the aqueduct's chance (item 110 (b); V11 §3.24.2) */; raisedVaultM: number /* × `raisedWays.structure.span.vaultShare`, V04's `raised.vaultShare` (V11 §3.24.2) */ }
interface ClimateRow {   // §4.9's ClimateTable rows; table 'climate'
  biome: 'temperate-deciduous'|'temperate-coniferous'|'mixed'|'maritime'|'arid'|'cold'; groundRole: string /* §8.2's ground-cover role key */;
  woods: { species: string; inner: number; outer: number; leafType: 'deciduous'|'evergreen' }[]; fieldSystem: 'openStrip'|'enclosed'|'infieldOutfield'|'irrigated';
  farmLayout: string /* a §4.9 farm-mode override key or 'none' */; roof: { form: 'gable'|'hip'|'flat'|'pyramid'; pitch: number /* ratio */ }; scatterPerHa: [number, number] /* ambient single trees */;
  rainMmPerYear: number /* mm a year: the aqueduct's water balance (V11 §3.24.6) */;
  // item 111's dry-country cells (V11 §3.17.1; their readers registry row 43):
  arid: boolean /* the base's "arid row": S0's water rows read aridChance and P(oasis) is oasisChance (§4.2 S0); false: P(oasis) 0 */;
  aridChance: { river: number; lake: number; coast: number } /* × the rung feature table's P(river), P(lake), P(coast) on an arid row, each [0, 1] */;
  oasisChance: number /* share: P(oasis) on an arid row */; oasisNoWaterFactor: number /* × oasisChance when no river, lake or coast was drawn; the product capped at 1 */;
  oasisAreaHa: [number, number] /* the oasis water body's area band (§4.2 S1 (2)) */; gardenFactor: number /* the irrigated gardens' area ÷ the oasis water area (§4.9) */;
  channelReachM: number /* m: the gardens lie within this of the water */; groveBandM: number /* m: the grove's shore band */;
  grove: { species: string; share: number }[] /* the grove's trees (§4.9's oasis grove row), shares summing to 1 */;
  w_water: number /* the growth field's water-pull weight, [0, 0.9] (§4.2 S3 (6): below 1) */; pullRadiusM: number /* m: q(x) falls to 0 here */;
  w_waterP: number /* the prosperity field's water weight (§4.5) */;
  sunlight: number /* item 111 (c), [−1, 1]: × w_sun (§4.5), × ClassMixRow.sun (§4.7 S10b) and × V07's village sun terms; 1 is item 102 as filed */;
  wellYieldWeight: number /* weight: the well and public-fountain classes' extra term on the plot's well yield (§4.7 S10b) */;
  wellCoverageFactor: number /* (0, 1]: × the water-supply family's walking-coverage radius (§4.7 S10b) */ }
interface HeightsRow {   // the class heights row DesignationTemplateRow.heights names (§2.6, §4.7 S11); table 'heights'
  key: string; storeyCm: { ground: number; upper: number } /* integer cm */; roofPitch: number /* ratio */; towerStoreys?: [number, number] /* keeps, church and mage towers */; spireFactor?: number /* spire height ÷ tower height */;
  attic: boolean; parapetCm: number /* cm */; towerStoreyCm?: number /* cm: a tower storey; absent reads storeyCm.upper */ /* the three columns V02 §3.10.6 reads */ }
interface RoleRow {   // V11 §3.6.5: a structure role's defaults; the compiler writes them into DesignationTemplateRow.structures
  role: string /* the structure name the template families use; V02's `composition.roleKeys` maps it to a composition key (V02 §3.10.4) */; footprintShare: number /* share of the footprint budget */; houses: boolean }
interface DistrictKindAffinity { tag: string /* a class tag (V11 §3.5.1) */; band?: [string, string] /* the classes' band within */; weight: number }   // §10.2's DistrictKindRow.affinity entry (item 438)
interface CompatibilityRow {   // §4.7 S11's mutator compatibility table; table 'mutator.compat'
  from: string /* a slot role */; to: string /* a slot role */; fate: 'keep'|'adapt'|'convert'; tolerance: number /* share: the size difference within which 'keep' holds */ }
interface GovernmentRow {   // §10.2's government rows, typed; table 'roster.government'
  kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: string /* the seat class */;
  villageSeat: string /* the seat's v.<id> class at village rungs (V07 §3.11 DR11; V11 §3.21.1): `@seat` binds it there */;
  offices: { name: string; seatClass: string; count: number | { perThousand: number } }[]; guardPerThousand: number; barracksFrom: 'TOWN'|'CITY'|'METROPOLIS'|'never' }
interface ReligionRow { id: string; worshipperShare: number; practiceShare: number; clergyPerThousand: number; templeClass: string; greatTempleClass: string; shrinePin: string }   // table 'roster.religions'
interface HouseholdRow { band: string; size: { mean: number; sd: number; min: number; max: number } /* people */; liveInStaff: number /* servants per household, mean */ }   // table 'roster.households'
interface InstitutionRow { id: string; classes: string[] /* the classes that house it, main first */; faction?: Faction['kind']; seatOf?: GovernmentRow['kind'][] }   // table 'roster.institutions'
interface GoodWordRow {   // table 'dossier.goodWords' (registry row 65) — V11's own shape, as LadderStepRow is; its reader is V11 §3.13.5's matching rule, applied by V08's adapter
  words: string[] /* case-folded whole tokens or adjacent token pairs */; good: string /* a roster.resources id (V11 §3.7.1) */ }
interface ArchetypeVillageCell {   // the optional `village` cell of a dossier.archetypes row (V08 §2.6's shape carries it); read at village rungs BEFORE villageForm (V11 §3.13.2; V07 §2.4, J-V7.78)
  class?: string /* a v.<id> class */; elseClass?: string /* the v.<id> class taken when class's hard need finds no site (the mill's and the inn's alternation) */;
  pin?: string /* '@pin:<kind>': a pin, no building */; delta?: string /* the reading V07 §2.4 names, in V11 §3.5.2's notation where it has one */;
  composition?: string /* a composition key replacing the class's (V02 §3.10.4) */; ruin?: true /* the ruin decoration and the ruin system's source (V07 §3.16) */ }
interface ProfessionRow { id: string; family: string; workplaces: string[] /* class ids */; perWorkplace: { band: string; count: [number, number] }[] }   // table 'sim.professions' — @plat/sim's (M4b)
interface TemplateFamilyRow {   // AUTHORING ONLY (V11 §3.6): the shared shape a class's DesignationTemplateRow[] is compiled from; never shipped as a table
  key: string; arrangement: DesignationTemplateRow['arrangement']; structures: DesignationTemplateRow['structures']; frontage: [string, string, string, string];
  floors: [[number, number], [number, number], [number, number], [number, number]]; footprintM2: [number, number, number, number] /* p50 by poor, modest, prosperous, rich */; plotAreaM2: [number, number, number, number];
  coverage: [number, number, number, number]; bounds: [string, string, string, string]; programme: string /* the room-programme key prefix (V03) */; heights: string; underSize: 'compact'|'refuse'; replaceability: [string, string, string, string]; works?: string;
  yard: { part: string; share: number }[] /* the yard parts and their shares (V11 §3.6.1; the `churchyard` part of a church or cathedral plot and the `burial` part of a cloister or burial ground are the burial faces, V04 §3.5.1 (1) (a) and (d)) */;
  cellarProb?: [number, number, number, number] /* the cellar row's prob by band when it differs from item 29 (b)'s defaults (V11 §3.6.1) */ }
interface GrammarDef {   // §10.4's grammars, typed; one per naming slice (V11 §3.20)
  slice: string /* 'naming.district', 'naming.way', … */; start: string /* the start symbol */; features: string[] /* the feature names its guards may read (V11 §3.20.2) */;
  rules: Record<string, { text: string /* our own text with #symbol# references and .modifiers */; weight: number; when?: { feature: string; op: 'eq'|'ne'|'in'|'gt'|'lt'|'has'; value: unknown }[] }[]>;
  corpora: Record<string, string> /* a symbol whose expansion is a corpus draw: symbol → corpus id (a culture row's corpus field, §7.6) */; maxSyllables?: number }
interface TemplateDef { id: string /* 'desc.district', 'desc.building', 'chronicle.wallToWay' … */; lines: { text: string; weight: number; when?: GrammarDef['rules'][string][number]['when'] }[]; fallback: string }
interface HistorySettings {   // table 'history' (registry row 92), its named row 'settings' (item 113; V11 §3.25.1)
  replay: boolean /* the history-first path's switch: false = generation as without replay (§4.11's no-op pin); a switch, not calibratable */;
  epochYears: number /* yr: a coarse epoch's span */; symbolicQuantile: number /* share: where in the tier's population range the effective peak is sized */;
  defaultAgeYears: Record<Rung, number> /* yr: the age of a history that states none (the blueprint's history option, V06 §3.20.2 (2)); a dossier's absent age is V08's `historyAge` row's */;
  burialYears: number /* yr: ruins older than burialYears_eff lie buried */;
  burialFactor: { flood: number; silt: number; rebuilt: number; bareRock: number } /* × burialYears for each condition that holds (V11 §3.25.2) */;
  burialBoundsYears: [number, number] /* the clamp on burialYears_eff */;
  reuseCost: number /* × a lattice edge's cost along a ruined way's trace (§4.3's existingFabricCost) */ }
interface HistoryEventRow {   // table 'history' (registry row 92), keyed 'type/template': the event-to-epoch rows (item 113 (a) (2); V11 §3.25.3)
  type: string /* a history event's type word as V08 reads it (economic, political, disaster, religious, magical, demographic, occupation_infiltration, exile_return) */;
  template: string /* the event's templateType, or '*' for the type's default row */;
  words?: string[] /* name or description words that select this row when the event carries no templateType */;
  effects: EventEffectRow[]; says: string }
type EventEffectRow =   // each becomes one of V06 §2.14's ReplayEffects; severity s ∈ [0, 1] is the event's (V08's severity words)
  | { kind: 'hazard'; hazard: string /* a V06 HazardRow kind */; minSeverity: number }
  | { kind: 'condition'; archetype: string /* a ConditionOverlay archetype */; weeksAtFull: number /* × s */ }
  | { kind: 'slice'; threatStep?: number; disorderStep?: number; wealthStep?: number /* each × s, signed, the result clamped to [0, 1] */ }
  | { kind: 'request'; cls: string /* a roster class */; count: Partial<Record<'TOWN'|'CITY'|'METROPOLIS', number>>; minSeverity: number }
  | { kind: 'population'; factorAtFull: number /* the epoch's target × (1 − (1 − factorAtFull) × s) */ }
  | { kind: 'destroy'; minSeverity: number };
interface BaseSettings {   // table 'base.settings' (registry row 93), one row 'settings' (V11 §3.1)
  index: { gridCellM: { L0: number; L1: number; L2: number; L3: number; L4: number } } /* m: the dynamic uniform grid's cell per level (§3.3) */;
  reroll: { maxAdvance: number } /* New random's advance bound (§5.1 (6)) */;
  crossing: { searchBandM: number } /* m: the crossing-site search band (§4.2 S1 (5); §6.3's bridge anchor) */ }
```

### 2.8b The underground content rows (item 109): shapes cited

The schemas of the four underground tables whose ROWS this volume writes are V04 §2.3's — `RuinRule` with its
`CultureRow` and `PersistenceClass` (`tables/under/ruin.json`), `OpeningRow` (`openings.json`), `DigRule` (`dig.json`)
and `CatacombRule` (`catacomb.json`, its `order` cell holding V11 §3.23.8's candidate order) — cited, never restated. The
values are V11 §3.23's; V04 §2.3's defaults table cites them. `growthCapShare` is read as a share PER YEAR compounded over
an epoch's span (V06's J-V6.53 reading, V11 §3.23.8), so V04's field needs no second cell. Two cells of
`roster.settings` (V11 §3.5.1) join them: `crypt.rankShare` (the crypt rank, read by V03 §3.7.4 and V06 §3.18.3) and
`coverage.rosterWeight`. Three cells of base tables take V11's values: `miningCellShare` of `under.systems`' cavern row
(II.7.6; registry row 59), `access.ruinGain` of `under.rule` (II.7.3; registry row 57) and `UndercityRule.sourceRank`
(II.7.5; registry row 59), the void-source rank V04 §2.3 reads (V11 §3.23.1, §3.23.6, §3.23.7).

### 2.8c Item 110's row types

The base mechanisms (the `RetainingWall` record and its levelling, the raised parts and their course solver, the deck
plots and their cutter, the stepped massing) are item 110's, and V02's tiers (J-V2.62); these are the ROWS those
mechanisms read, declared once here and written in V11 §3.24 (§10.2 cites them, item 435). Every table is `extension` (off in the parity presets) and calibratable unless marked; every switch
below is also the table's parity-neutral default when a pinned set lacks it (J-V11.49).

```ts
interface TerraceRow {              // table 'terrace' (registry row 78); key 'rung'
  rung: 'TOWN'|'CITY'|'METROPOLIS'; // the TOWN row is "the base-rung terrace row" V07's village cells default to at every anchor (J-V7.41)
  enabled: boolean;                 // the row set's switch: false = no RetainingWall is generated (the no-op pin); the parity presets false
  slopeMin: number;                 // share (rise ÷ run): the least mean slope of a levelled unit for its step to be walled; V01's percent is 100 × share
  stepMinCm: number;                // cm: the least step that is a wall; below it the base's plinth and skirt carry the fall (§2.2)
  stepMaxCm: number;                // cm: the most one wall retains; a larger step is split by an intermediate terrace and a second wall
  minTerraceDepthM: number;         // m: the least depth of a terrace between two walls; a unit that cannot keep it is not levelled
  retainingReachM: number;          // m: V09 §4.20.1 (3) (a)'s reach — a retaining stroke drawn on flat ground moves onto a slope break, terrace edge or wall within it
  flatDepthM: number;               // m: V09 §4.20.1 (3) (b)'s strip — else the stroke becomes a terrace this deep on its high side (≥ minTerraceDepthM, T-V11-32 (a))
  coverShare: number }              // share: V09 §4.20.1 (3)'s flat test — the least share of the stroke's stations below stepMinCm and slopeMin for the run to be flat
interface RetainingProfileRow {     // table 'retaining' (row 79); key 'band' (and the named row 'settings', below); four anchors interpolated along the value of the HIGH side's plot
  band: string;
  material: Record<'dry_stone'|'rubble'|'ashlar'|'brick'|'earth_bank'|'timber_crib', number>;  // weights; earth_bank and timber_crib only where the step ≤ 150 cm
  batter: number;                   // share: the face's set-back per unit of height
  thicknessShare: number;           // share: the base thickness ÷ the step (a gravity wall)
  buttress: { fromCm: number; spacingM: [number, number] };   // steps at or above fromCm take buttresses at this spacing
  parapetCm: number;                // cm: on the high side where a way, square or other public face runs along the top; 0 elsewhere
  tower: { per100m: number; minStepCm: number } }             // decorative towers (item 110 (a)): never an Enceinte, no gate, no walk
interface RetainingSettings {       // one row 'settings' of the same entry (V11 §2.1's settings form)
  stateSnapCm: number }             // cm: the farthest a state knot whose vertex is gone moves to the re-derived chain's nearest point, else it is dropped (item 245; J-RF2.4)
type RaisedKind = 'viaduct'|'elevated'|'aqueduct';            // the reason vocabulary item 110 (f) records: drop, link, water need
interface RaisedWayRow {            // table 'raisedWays' (row 80); key 'rung/kind'; the rung enum is EXACTLY CITY | METROPOLIS — the owner's rung gate
  rung: 'CITY'|'METROPOLIS';        // is the schema's (provenance owner, item 110 (b): "A TOWN gets them only by declaration"), never a cell (J-V11.41)
  kind: RaisedKind; chance: number /* share: the base chance p0 of a live candidate */; cap: number /* the kind's count cap at the rung */; pMax: number /* share: the ceiling on p */ }
interface RaisedWaySettings {       // one row 'settings' of the same entry
  totalCap: Record<'CITY'|'METROPOLIS', number>;
  viaduct: { minDropM: number; spanCostFactor: number; maxSpanM: number; routeClasses: WayClass[] };
  elevated: { minRiseM: number; maxSpanM: number; bandFactor: Record<'poor'|'modest'|'prosperous'|'rich', number>; landmarkFactor: number; landmarkMax: number; highGroundM: number;
    landmarkMinSignificance: number /* the least class significance (§10.2; item 72) of a dossier-bound institution that counts as a landmark, V11 §3.24.7 (4), DR35 */ };
  aqueduct: { sourceReachKm: number; needRatioMin: number; minFallPerKm: number /* m per km the intake stands above the terminal (V06's reading) */;
    gradient: [number, number] /* share: the laid channel's fall per unit run, the course solver's bounds */; capPerSizeMember: number;
    terminal: Record<'fountain'|'basin'|'cistern', number> } }
interface RaisedWayStructure {      // one row 'structure' of the same entry: the heights V05's caster ceiling and V04's vaults read
  clearanceCm: { cart: number; foot: number };   // the least soffit height over a crossed part-0 way, by that way's class (carts or not, V11 §3.24.5)
  parapetCm: number; channelWallCm: number;      // the deck's parapet; an aqueduct channel's side walls above its deck
  channelCm: [number, number]; deckExtraCm: number;               // an aqueduct's channel width band and the deck beyond it (the `ways.widths` aqueduct row)
  maxPierM: Record<RaisedKind, number>;                            // a course needing a taller pier is infeasible: the candidate drops, reported raised_too_tall
  pierSpacingM: { masonry: [number, number]; timber: [number, number] }; pierWidthShare: number; pierMinCm: number;
  material: Record<'poor'|'modest'|'prosperous'|'rich', Partial<Record<'timber'|'rubble'|'brick'|'ashlar', number>>>;   // an aqueduct never timber
  span: {                                                          // item 244's span rule (J-V11.96)
    vaultShare: Record<RaisedKind, number>;                        // share: the chance a span past the rule's gates is a vault (`raised.vaultShare`), × era and culture `raisedVaultM`
    maxHeightCm: number; minHeadroomCm: number; maxFallCm: number; // cm: the `tall`, `low` and `slope` gates (`raised.vault.maxHeightCm`, `minHeadroomCm`, `maxFallCm`)
    vaultCap: Record<'THORP'|'HAMLET'|'VILLAGE'|'TOWN'|'CITY'|'METROPOLIS', number>;  // the most `vault` spans in a settlement (`raised.vaultCap[rung]`); every rung, a declared way standing at any
    deckDepthCm: number;                                           // cm: the deck's depth under its level, the soffit's offset (`raised.deckDepthCm`)
    supportFoundationCm: number };                                 // cm: a pier's foundation below the levelled ground, read by V04 §3.5.0's foundation rule (`raised.supportFoundationCm`)
  slideMaxFactor: number }                                         // × the `pierSpacingM` band's upper bound: the longest span a slid station may leave (item 244's support step (3))
interface CultureSpecialisationRow { // table 'roster.specialisations' (row 84); key 'culture/cls/specialisation'
  culture: string;                  // a V11 §3.20.3 culture id (V08's twelve)
  cls: string;                      // a roster class
  specialisation: 'stepped_temple'|'terraced_palace'|'tiered_tower';
  composition: string;              // V02 §3.15.4's row key: 'stepped-temple' | 'terraced-palace' | 'tiered-tower'
  heights?: string;                 // a HeightsRow key replacing the template's (required on stepped_temple rows)
  chance: number;                   // share, per eligible use
  capShare: number; capMin: number } // share of S2's building count, ≤ 0.001; the cap is at least capMin where chance > 0;
                                    // at village rungs the cap is V07's rules.tiers.capPerSettlement, per settlement (V11 §3.24.3)
type DeckKind = 'bridge'|'pier'|'mole'|'quay';                    // V02's DeckContext.kind; a jetty is a pier
interface DeckRow {                 // table 'deck' (row 82); key 'kind/band': the four kinds × the four band anchors
  kind: DeckKind; band: string;
  offer: { TOWN: number; CITY: number; METROPOLIS: number };      // share: the chance a deck of this kind offers frontage plots, drawn per deck by the cutter (village rungs: V07's cells)
  footprintM2: [number, number]; maxFloors: number;                // V02's DeckBudgetRead
  frontageM: [number, number]; minPlotDepthM: number;              // a face is buildable where (deck width − way width) ÷ sides ≥ minPlotDepthM
  fillShare: number;                                               // the most of the buildable face length plotted
  sides: 'both'|'harbourSide'|'landward';                          // a mole builds on its sheltered side only
  endClearM: number }                                              // no plot within this of an abutment, root or head (the landmark slots)
interface DeckLandmarkRow {         // table 'deck.landmarks' (row 83); key 'slot'; one claimant per slot
  slot: 'moleHead'|'midMole'|'bridgeMid'|'islet';
  claimants: { cls: string; when: string /* the condition, V11 §3.24.4 */; chance: Partial<Record<'TOWN'|'CITY'|'METROPOLIS', number>> }[] /* tried in order; the first that draws yes holds the slot */;
  minSpanM?: number }               // bridgeMid: the least span that has a mid-bridge slot (V09 §4.20 reads it)
interface WayCrossingRow {          // table 'ways.crossing' (row 81); key 'cls'
  cls: WayClass; carts: boolean; rampMaxGrade?: number /* share; absent: the class never crosses a retaining wall */; switchback: boolean;
  stair?: { riserCm: number; treadCm: number; landingEveryCm: number; landingM: number } /* absent: never a stair */ }
interface WaterNeedRow {            // table 'water' (row 85); one row 'default'
  perHeadL: number;                 // litres a day a head drinks, cooks and washes with
  wellsPerHa: Record<'alluvial'|'default'|'soluble'|'volcanic', number>; wellYieldM3: number;
  roofShare: number; captureShare: Record<'arid'|'maritime'|'other', number>;
  wellYield: Record<'alluvial'|'gravel'|'lowGround'|'default'|'rock', number>;   // item 111 (b): the well-yield raster's value by ground class, [0, 1] (§4.2 S1 (10); V11 §3.24.6)
  geologyYield: Record<'ordinary'|'soluble'|'volcanic', number>;                 // × wellYield by the site's geology flag
  topYield: number }                                                            // share: the least yield of "the top well-yield class" (§4.2 S3 (6), §4.5)
```

`BuildingClassRow` carries the compiled column `deckOk: DeckKind[]` (§10.2; absent = `[]`, never on a deck; V11
§3.24.4), and `siting.declared`'s `use:` rows the cell `specialisation?` (V11 §4.2). The culture rows carry the `building`
block (V11 §3.20.3), `EraRow` the two factors and `ClimateRow` `rainMmPerYear` (V11 §2.8).

### 2.9 Identity

A table is identified by its `TableId` and version; a row by `(TableId, key)`; a cell by `(TableId, key, field)`.
Keys are lower-case ASCII with `_` and `-` (class ids `snake_case`, as §10.2's `lean_to_shelter`; profile families
and grammar slices kebab or dotted as V08 wrote them). **Village class rows** (V07 §2.4) are keyed `v.<id>` (`v.smithy`,
`v.farmstead`, `v.parish_church`, `v.chapel`, …; the prefix is the one dot a class key may hold): a namespace of their own
inside `roster.classes`, because a village row and the town row of the same function share no profile, template or
presence law — V07's `v.farmstead` is a husbandman's farm in the village, V11's `farmstead` an outside hinterland farm;
V07's `v.chapel` a crypt-less chapel of ease, V11's `chapel` a `basement` one (J-V11.58). A `villageForm` names a
`v.` key and only a `v.` key; the compiler refuses a `villageForm` naming any other key and any V07 row whose key lacks
the prefix (T-V11-3). A key is **never reused** for a different meaning: a retired row
is deleted in a new major version and its key goes to the registry's `retired` list, which the compiler checks against
new keys (T-V11-3). Row hashes are H128 over the row's canonical bytes (§6.2); the slice hashes of §2.8 are computed
from them. Derived family rows (V11 §3.3.4) carry the ids of V11 §2.4 and are never stored in a document: a document
records the slices it read (`DerivationRecord.slices`, §2.8), and a family row's slice is the pair of source rows it came
from (the class row and the family row), so editing either re-derives exactly its readers (§7.6's invalidation).

### 2.10 Lifecycle of every new state field

A *read* cell names the registry row whose readers read the field (V11 §3.1, the one statement of a table's readers). Item 110's eight tables share one pattern row; the rows after it state only how each differs.

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `TableSchema` registry entries | authored in `registry.ts` | compiler, loader, editor, docs, audit | the package | n/a (code) | n/a | a schema change is a major table version with a migration (§7.5) of the documents' overrides: renamed columns mapped, removed columns' overrides orphaned (§7.6) |
| source files | authors | the compiler | the repository | recompiled on change | VCS | n/a |
| shipped tables | the compiler | the loader (`TableView`) | the package, pinned by version and hash in the recipe (§2.9) | a document replays against its pinned versions | an `editTable` undo (§7.4) | a new version is a declared shift (§6.4); a document upgrades by §7.5's upgrade event |
| a registry row's empty table before its rows-home milestone (V11 §2.1) | the compiler from an empty source at C0 (the manifest's `rows` 0) | its registry row's readers read no rows; the compiler's `TotalityRule`s and invariants wait for its first row | the package | the change that ships its rows is a `minor` table version (a declared shift for its readers, V11 §3.2.5), its exit tests reading them | VCS | n/a |
| `BuildingClassRow.profile`, `staff`, `villageForm`, `templateFamily` | compiled | registry row 17 | table | table | table | absent in an older table version: the loader fills `profile` from the class's `tags` by the tag → family map (V08 §2.6's `tags` rows) and V11 §3.4's family rows, reported as a declared shift |
| the `v.<id>` village keys, `GovernmentRow.villageSeat`, the archetypes' `village` cell, `WallBarrierRow.arcKind`, the terrace's three bend cells | compiled | registry rows 17, 21, 65, 14 and 78 | table | table (a village building re-derives with its use when its row's key or cells change; standing buildings kept by V11 §4.3's rule) | table | the `v.` prefix is a major version of `roster.classes` (§7.5): a document override naming an unprefixed village key is mapped to its `v.` key by the migration, reported; absent `villageSeat`: the seat class, reported; absent `village` cell: the class's `villageForm`; absent `arcKind`: V11 §3.16.1's column for the row's class; absent bend cells: V11 §3.24.1's TOWN row values |
| `RelationFamilyRow`, `SignaturePairRow`, `LadderStepRow`, `WallBarrierRow`, `WaterfrontThreatRow`, `EraRow`, `ClimateRow`, `HeightsRow`, `CompatibilityRow`, `GrammarDef`, the typed §10.2 rows | compiled | their registry rows | table | table | table | table versions; a document without a table in its pinned set reads the parity-neutral default the schema declares (a family weight 0, no pair, no ladder step, the uniform wall profile — J-V11.12) |
| `ResourceRow` goods columns | compiled | registry row 19 | table | table | table | absent: `comfortM` 0 and orientation `balanced`, which reproduces the base's linear decay (item 107 (b)); absent `demand`: `classes` (no reverse pull without a bound consumer, the base's behaviour) |
| `siting.web`'s switches `orientEnabled`, `splitEnabled` | compiled | registry row 36 (through the loader's view, V11 §3.2.2) | table | a switch edit re-derives every class whose orientation or split it changes; placed uses kept and the moves listed (V11 §4.3; J-V11.14) | table (an `editTable` undo) | absent in a pinned `siting.web` version that predates them: true (that version's behaviour, replayed unchanged); a document with no `siting.web` at all reads the off form (V11 §3.7.4; J-V11.12) |
| `dossier.sanitation`, `dossier.subterranean` (V04's rows in registry row 63) | compiled from V04 §2.3a's rows | registry row 63 | the package, pinned like every table (§2.9) | a table version (a table fix reviewed with V04 and V08, never a calibration; J-V11.65) re-runs the port's creation for the records it matches (the digest's inputs change, §7.7) | table | absent in an older table version: no record binds, sewers and systems by II.7's laws alone |
| V11's preset entries (`presets.MFCG`, `.FTG`, `.VG`, `.FM` on the cells of V11 §2.2's rule) | compiled from the source cells, each written in the change that lands its preset or its cell (V11 §8) | the loader's preset step (§7.6's order) when a document runs that preset | table | table: a document under a preset replays its pinned versions | table (an `editTable` or `editPreset` undo, §7.4) | a pinned table version compiled before a preset shipped carries no entry for it; running that preset on such a document first upgrades that table by §7.5's upgrade event (a declared shift, reported), so a missing entry is never resolved by the zeroing rule (which would give `bulkyWater` 0, below its range) |
| the source manifest's `productStages.village`, the compiled `villageRead` flag and `villagePresetCells` | `productStages.village` committed by the seat landing V07's V-M0 from V07 §3.0's stage set (with the stages V07's fallbacks register), changed in the change that registers or withdraws a village stage; `villageRead` and `villagePresetCells` compiled (V11 §3.2.1 steps 4, 7) | the compiler's preset and off-form checks under `VG`; the loader's preset step under `VG`; V07 §3.15's list check; T-V11-9 | the repository (the source list); the package's manifest, pinned with the table versions (§2.9) | recompiled whenever a registry `readers` list or the stage list changes; a table that becomes village-read requires its cells' `VG` entries in that same change | VCS | absent before V-M0: no table is village-read and no `VG` check runs (the `VG` file does not ship); a pinned manifest without `villageRead` read under `VG` is upgraded by §7.5's event, as a pinned table without its `VG` entries is (the row above) |
| the source manifest's `stageIds` and the compiled `stageReaders` | `stageIds` committed by the seat landing each change that registers a stage (C0: §4.1's stages); `stageReaders` compiled (V11 §3.2.1 step 6) | the compiler's reader check, the village-read test, the loader's `VG` scope, V12's run scope and cost shortcut | the repository; the dist manifest | recompiled on change; a stage registered or removed changes `stageIds` in the same change, else T-V11-1 (b) fails | VCS | n/a (build data) |
| `NG`'s entries (`presets.NG` on `hood.constants`' cells, V01's) and the `NG` key | compiled from V01's source cells (V01 §3.15), written by the seat landing V01's M5 in the change that ships the `NG` preset file | the loader's preset step under `NG` (V01's harness and panel); the compiler's checks | the package, pinned (§2.9) | table | table (an `editTable` or `editPreset` undo, §7.4) | a pinned `hood.constants` compiled before M5 carries no `NG` entry; running `NG` on such a document first upgrades that table by §7.5's event (a declared shift, reported), since its fallback — `MFCG`'s off switches — would run none of Neighbourhood's rules |
| registry rows 90–91 (`way.surface`, `squares.quota`) | V01's rows compiled; each an empty table from C0 until V01's M2b (V11 §2.1) | registry rows 90–91 | the package, pinned (§2.9) | a surface row edit re-derives the surfaces of the ways that read it at S10a's end (an edited `surface` kept, V01 §3.7.3); a quota edit re-derives S7b's square claims and, from M5, the districts' dispatch (§7.6's slice) | table (an `editTable` undo) | absent from a pinned set: every way's `surface` unset and S7b (3) claiming no quota square (the pre-M2b behaviour); an upgrade is a declared shift naming the ways and squares it changes |
| registry rows 86–89 (`toolkit`, `messages`, `clerk.ops`, `clerk.content`) | V09's and V10's shipped rows, compiled | registry rows 86–89 | the package, pinned like every table (§2.9) | a table edit applies by its owner's rule (V09 §2.3: never by a user; V10 §2.10: `clerk.ops` the device layer only) | `editTable`'s inverse where an edit is admitted | a new version by V11 §3.2.5 (V09 §2.3's additive rule for tools) |
| `crypt`, `cryptM2`, `crypt.rankShare` | compiled (V11 §3.5.8) | registry rows 17 and 24 | table | table (a building's `Basement.crypt` is re-derived with its basement, V03) | table | absent in an older document's pinned `roster.classes`: every class `never` (the base's no-crypt behaviour) until the document upgrades; the shipped rows then arrive as a declared shift (§6.4): the cathedral gains its crypt, reported |
| the `under.ruin`, `under.openings`, `under.dig`, `under.catacomb` rows, `miningCellShare`, `access.ruinGain`, `sourceRank` | compiled (V11 §3.23) | registry rows 58a, 57 and 59 | table | table (V04's records re-derive by V04's ratchet and keys) | table | absent: no ruin, no opening chance, no dig draw, a ruin's gain 1, the base's catacomb rule (II.7.6); on upgrade a declared shift — a church-sourced catacomb is re-sourced to its churchyard, else `legacy` (V04 §3.5.1) |
| the `siting.declared` and `siting.linkEdits` rows | `editTable` on the document-only tables (V11 §4.2) | registry row 76 | the log | re-derived by the match slice of their binding key (V11 §4.3) | inverse row op | a key that no longer resolves is orphaned and reported (§7.6) |
| **item 110's tables — the pattern** (`terrace`, `retaining`, `raisedWays`, `ways.crossing`, `deck` with `deckOk`, `deck.landmarks`, `roster.specialisations` with the `stepped-shrine` row, `water` with `rainMmPerYear` and the era and culture factors; registry rows 78–85, 43, 50, 71) | compiled (V11 §3.24) | registry rows 78–85, 43, 50 and 71 | table | the entities whose recorded slices cite a changed row re-derive; a standing generated structure the edit no longer admits is KEPT and listed with an offer (J-V11.14); a declared or user-set one is held; a structure the user removed stays suppressed whatever the table says (item 110 (b), (f)); each draw keyed by its entity's lineage | table | absent from a pinned set: off (V11 §3.24.0); an upgrade is a declared shift that names every structure it adds |
| — `terrace`, `retaining`, `terracedEdges` | as the pattern | | | the levelling units whose slices cite a changed row re-derive with their generated `RetainingWall`s; drawn walls held; a profile edit re-draws material and towers only; draw key: the levelling unit's lineage | | as the pattern |
| — `raisedWays` rows, `settings`, `structure` | as the pattern | | | the generator's gate re-runs for every reason key whose outcome the edit can change (§7.6's slice); a standing generated raised way whose reason is no longer admitted is KEPT and listed with a remove offer; a newly admitted reason is built by the dry run with its fates; draw key: the reason key | | as the pattern, naming every raised way it adds |
| — `raisedWays.structure.span`, `.slideMaxFactor`, `retaining.settings.stateSnapCm` | compiled from V11 §3.24.1–§3.24.2's values, written at C3b with M3a's raised ways (V11 §8) | | the package, pinned (§2.9) | a `span` edit re-runs the span rule over every raised way whose spans cite the row (held `use` edits kept) and V04's arch-vault reconcile in the same commit; a `slideMaxFactor` edit re-runs the support step on the generated ways (keys kept by item 244 (5)); a `stateSnapCm` edit applies at the next re-derivation and moves no standing knot | | rows 79 and 80 first ship with these cells; a pinned version without them is upgraded by §7.5's event, reported, so the zeroing rule never supplies a foundation depth of 0 to a document holding raised ways |
| — `ways.crossing` | as the pattern | | | the crossings whose ways cite the row re-derive (a stair becomes a ramp or back); no way moves | | absent: the base's slope rule (§7.3), every crossing a ramp, reported |
| — `deck`, `deckOk` | as the pattern | | | the cutter re-runs on the decks whose rows changed; a standing deck building above a lowered budget or of a class no longer admitted is KEPT and listed with a relocate offer; new plots obey the rows (V02's clamp, J-V2.67); draw key: the deck's lineage | | as the pattern |
| — `deck.landmarks` | as the pattern | | | the slot draws re-run; a standing slot building is kept, an empty slot may fill; draw key: the slot's deck lineage | | as the pattern |
| — `roster.specialisations`, the `stepped-shrine` row | as the pattern | | | the S11 draw re-evaluates for the eligible uses; a generated stepped building whose draw flips is KEPT and listed with a "re-mass" offer (a massing change is disruptive, J-V11.14); user-set, declared and keyword specialisations are held; draw key: the use's lineage with `'spec'` | | absent: none; an upgrade names every stepped building it adds |
| — `water`, `rainMmPerYear`, the era and culture factors | as the pattern | | | as `raisedWays` (the reasons they gate) | | absent: `perHeadL` 0 (no need), factors 1 |
| item 111's climate cells, the water table's yields, the `garden` land-use row (V11 §3.17, §3.24.6) | compiled | registry rows 43, 85 and 44 | table | the entities whose recorded slices cite a changed row re-derive: an oasis chance or arid-chance edit re-derives the site's feature draws from S0 (§7.6's first reader stage — the structural features are S0's); a water-pull or sunlight edit re-derives the field and, through it, the placements by least disruption (uses kept and listed, V11 §4.3); a grove or garden edit re-plants and re-sites them at S12a and S12b; a hand-made or dossier-made oasis is held (§2.3) | table | absent from a pinned set: the neutral values of V11 §3.17.3 (no oasis, no pull, `sunlight` 1), byte-identical to item 102 as filed |
| item 113's history rows (V11 §3.25) | compiled | registry row 92 | table | an edit re-plans the replay: the plan is a pure function of the history and the pinned tables (V06 §2.14), so the document re-derives from S0 at the start population with §7.1's fate report, user edits held (§7.3) — the path a changed history takes | table | absent from a pinned set: `replay` false — generation as without history (V11 §3.25.1), byte-identical to the base |
| the base settings row (`base.settings`) | compiled (V11 §3.1) | registry row 93 | table | a `gridCellM` edit changes no output (an index's cell size moves no geometry; §3.3); a `reroll.maxAdvance` or `crossing.searchBandM` edit re-derives by §7.6's slice | table | absent from a pinned set: the values of V11 §3.1 |
| the display cells — `label`, `icon?`, `synonyms`, `commonness` on the class rows; `label`, `icon?` on the profile families, goods, district kinds and style sheets | the source (V11 §3.4, §3.5.15, §3.7.1, §3.9, §3.1's *Display cells*; V07 §2.4 for the `v.` rows); `icon` and `commonness` of a class and the generic rows' cells compiled (V11 §3.2.1 steps 5, 5a) | the display modules of registry rows 17, 18, 19, 33 and 52 — never a model stage | the package, pinned (§2.9) | a label or synonym edit changes no digest (no stage reads it); a count edit recomputes `commonness` in the same compile | table (an `editTable` undo) | absent in an older pinned `roster.classes`: the loader shows the class key with `_` as a space for `label`, `[]`, 0 and no icon, reported once; the words arrive with the table's major version (a schema change, §7.5's migration of overrides), which moves no digest |
| derived family rows | `resolveSiting(view)` at load (V11 §3.3.4) | S10b, explain | never (derived, memoised by the view hash) | re-derived on any change of a source row | follows its sources | n/a |
| document overrides of any of these tables | an `editTable` / `editPreset` event (§7.1) | the loader's override chain | the log | replayed | §7.4's `editTable` row | orphaned by §7.6 when the base row changed |

No document state is added by this volume beyond the overrides §7.6 already records; the siting explanations are
derived per query (`PlacementSolver.explain`) and the "why" rows of V06 live in its non-canonical epoch report.

## 3 Generation — the table catalogue, the compiler, and the rows

"Generation" for a content system is two things: how the tables are made and loaded (V11 §3.1–§3.3) and what the rows
say (V11 §3.4–§3.25). Every row set below is our own and calibratable (§13.9) — except the dossier row sets of V11
§3.11–§3.13 (registry rows 63–66 and 77), never calibrated (§13.9 (7)), and the naming row sets of V11 §3.20 (registry
rows 68–70 and the naming columns of row 71), never calibrated (V12's R4: the corpus teaches drawing, never naming) —
provenance per cell by §17.1 (6); a row marked *ext* is an `extension` (0, off or empty in the parity presets, §7.6);
every soft weight is in solver units (V11 §2). Every value a table cell holds is stated once, in this volume or at the
rows home its registry row names; another unit cites the cell (table, row, column) and states no number.

### 3.1 The complete catalogue of tables

One row per registry entry (V11 §2.1). *Rows home* names the one section that writes the rows (single source); *status*
says whether the rows are written in a design document (`written`), authored at build time by the plan of V11 §8
(`authored`, with the bar they must meet), or empty until a staged input fills them (`staged`) — never whether they have
shipped (V11 §2.1's empty-table rule).

**Readers** (J-V11.80). A table's readers column is the one statement of who reads it: V11 §1b's wiring rows and
V11 §2.10's lifecycle rows cite it. A reader that is a stage or an epoch phase is named by its **StageId** — §4.1's
stages; the ids the volumes register (V01's `S7c`, `S9b`; V05's `SKY`; V04's `U-NET`, `U-SYS`, `U-ACCESS`, `U-FRONT`,
`U-CITY`, `U-LINK`, `U-RECONCILE` and `U-FADE`, the stage its epoch participants `under.fade`, `under.extend`,
`under.access` and `under.undercity` run under, V04 §1.1; V07's `VS1`–`VS6`, `VS8`); and V06 §3.16's fifteen
epoch-phase ids `EVO_PRELUDE` … `EVO_RAISED`. **A read is recorded under the registered StageId of the stage function
that reads it**, never under a calling epoch phase: an epoch step that runs a base stage (S2 at `demand`, S6 at `field`,
S5–S13 on a new stage's faces at `growth`, S12c at `character`; V06 §3.2) reads under that stage's own id, the main-road
step S5b under `S5b` at every stage and epoch, the seed primitives V01 lays in S8's district batch under `S8`, and an
epoch participant under the `stage` it registers (V06 §2.1's `EpochParticipant.stage`: `SKY` for V05's two, `S9b` for
`hood.fabric`, `U-FADE` for V04's four, `VS1` and `VS2` for V07's `village.plan` and `village.density`, V04 §1.1, V07
§3.12); an epoch re-derives through the epoch fold (V06). A **module id** names only a reader outside the stage graph:
`@plat/app` (the application), `@plat/clerk`, `@plat/docs`, `@plat/sim`, `@plat/evolve` (V06's replay planner at
generation), `@plat/hood` (the neighbourhood close-up's view-side derivation on a district click or in view, V01 §3.8,
its draws keyed `STAGE_VIEW`; the package's pipeline registrations — S7c, S9b and its S13a step — stay StageIds),
`port.digest`, `tables.compiler`, `derivePerson` (§10.3), `testkit.bench`, and the lazy elaboration rungs `rung.wings`
and `rung.plan`, which run on a click and never in the pipeline (V02 §3.1). **The village-read test (V11 §3.2.1 step 4),
V12's run scope (V12 §3.7.2 (4)) and its cost shortcut's first reader stage (V12 §3.7.7) match StageIds only**, so every
table a stage or phase reads names that stage, and T-V11-1 (b) holds it by recording each stage's reads. A section named
beside a StageId says where that reading is written. "Every stage" (rows 1, 10, 93) compiles to every id of the source
manifest's `stageIds`; "every band-keyed reader" (row 6) to the union of the stage readers of the band-keyed tables;
"the display modules" to `@plat/app` (V09's roster reader, T6's palette and T5's cards, the link view), `@plat/clerk`
(the message slots V10 renders) and `@plat/docs`. **`S5`** (rows 2, 3, 50, 81) names the growth stage, which §4.1
registers as its four steps S5a, S5b, S5c and S5d, each with its own `StageDecl`, and compiles to those four ids; a row
that needs one step only names that step. **S5b beside S4** (J-V11.92): the main-road step at stages k ≥ 2 and at every
epoch stage runs S4's router incrementally, under the same F-ROUTE ladder (§4.4), and that route solve prices a viaduct
span (item 290 (1), (3); V06 §3.6), so every row that lists S4 as the raised-way generator lists S5b beside it — rows
49, 71, 80, 81 and 92 by name, rows 3 and 50 through `S5`.

| # | TableId | file (under `dist/`) | row type | rows home | readers | slices | status |
|---|---|---|---|---|---|---|---|
| 1 | `rung.ladder` | `ladder.json` | `RungProfile` | §1.1; village rungs V07 §2.1 | every stage | row | written |
| 2 | `stage.regimes` | `stages.json` | stage rows per rung | §4.2 S2, §4.4 | S2, S5 | row, bracket | written |
| 3 | `ways.widths` | `ways.json` | way-class widths | §4.3, §4.4; the `aqueduct` class's row V11 §3.24.2 (`channelCm`, `deckExtraCm`) | S4, S5, S9; S6 and EVO_RAISED (the raised-way generator at S4 and at the end of S6, and V06 §3.19's epoch pass, read the `aqueduct` class's row) | row | written |
| 4 | `granularity` | `granularity.json` | granularity rows by kind × band | §4.7 S10 | S10 | row, bracket | written |
| 5 | `heights` | `heights.json` | `HeightsRow` (with the `stepped-shrine` row, item 110 (c)) | V11 §3.6.4 | S11 (§2.6's stage-3 hook: V02's massing, V02 §3.1, and its heights), U-SYS (V04's stepped monuments) | row | written here |
| 6 | `prosperity.bands` | `bands.json` | `BandSet` | §4.5 | every band-keyed reader | row | written |
| 7 | `prosperity.drivers` | `drivers.json` | driver kernels and weights (`w_sun`, item 102; `drivers.wealthGradient`; the water term's `w_waterP` is the climate row's, row 43) | §4.5; `w_sun` row V11 §3.3.5 | S6, S10a, EVO_FIELD (the building shade mask's `w_sun` term, V06 §3.4; the field step's re-evaluation runs as S6) | weights | written |
| 8 | `density.drivers`, `greenery.drivers` | `drivers.json` | driver kernels | §4.5 | S6, S10a | weights | written |
| 9 | `s0.features` | `features.json` | feature probabilities; S1's geology rows by relief (item 109 (a)); the relief rows' `terracedEdges` column (item 110 (a)) | §4.2 S0, S1; `terracedEdges` V11 §3.24.1 (item 289) | S0, S1, S10, S11 (the district-edge levelling) | row | written (the column here) |
| 10 | `workLimits` | `workLimits.json` | work-limit coefficients | §5.1 (5) | every stage | row | written |
| 11 | `market.siting` | `market.json` | market-siting weights | §4.2 S3 (12) | S3, S7b | weights | written |
| 12 | `cut` | `cut.json` | `cut.bendMode`, `cut.flattenM`, reach weights | §4.6 | S8 | row | written |
| 13 | `walls` | `walls.json` | `castle.minInnerM`, `wall.smoothPasses`, gates' waterfront share, spacing | §4.2, §4.4, §4.8 | S3, S5a, S7 | row | written |
| 14 | `walls.barriers` | `walls/barriers.json` | `WallBarrierRow` | V11 §3.16.1 | S3 (9), S5a, S7, VS3 (the palisade's barrier arcs, V07 §3.4 step 5), SKY (an island's rim closing as a cliff, V05), EVO_GROWTH and EVO_FORT (a new circuit and a ring's contraction under barrier closure, V06 §3.7); modules: `@plat/app` (V09's preview arcs), `@plat/clerk` (V10's unwalled-arc answers) | row | written here |
| 15 | `walls.waterfront` | `walls/waterfront.json` | `WaterfrontThreatRow` | V11 §3.16.2 | S3, S10 (the mole-head slot's fort reads the matched threat, V11 §3.24.4), EVO_FORT (the waterfront grade and the harbour-mouth chain at an epoch, V06 §3.2); port.digest (DR2, §7.7) | match | written here |
| 16 | `district.growth` | `districts.json` | `district.growthRate` | §4.5 | S6 | row | written |
| 17 | `roster.classes` | `roster/classes.json` | `BuildingClassRow` (with `profile`, `staff`, `villageForm`, `templateFamily`, `crypt`, `cryptM2`, the compiled `deckOk`, and the display cells, V11 §2.3) | V11 §3.5 (town and city classes); V07 §2.4 (village classes, keyed `v.<id>`, V11 §2.9); V05 §2.4 (landing facts) | S2, S7b, S10a, S10b, S11 (with §2.6's basement function and V02's massing), S12a, S12c (the tags: the plot mix, the identity rows' families, the sectors' tags), S13a, U-SYS and U-ACCESS (V04's catacomb sources, access pass and crypt join), SKY (V05's rim-slab vault under an `always` crypt), EVO_USES (V06 §3.9's use step), EVO_SITING (regrowth's per-use `deckOk`, V06 §3.8), EVO_DECLINE (`salvageM3`, V11 §3.18), EVO_UNDER (V06 §3.18); modules: `rung.wings` (V02), `rung.plan` (V03), port.digest, the display modules | row, match | written here |
| 18 | `roster.districtKinds` | `roster/districtKinds.json` | `DistrictKindRow` (with `affinity` and the display cells) | V11 §3.9 (the `sky-*` rows from V05 §2.4's facts) | S6, S7b, S10b, SKY (V05's arena typing; V01's unit run is a derivation unit these same stages run, V01 §3.10); the display modules | row, match | written here |
| 19 | `roster.resources` | `roster/resources.json` | `ResourceRow` (goods columns; the display cells) | V11 §3.7 | S2, S10a, S10b, EVO_USES (the goods' `comfortM` and orientation over epochs, V06 §3.9.10); modules: tables.compiler (orientation, V11 §3.7.3), the display modules | row | written here |
| 20 | `roster.institutions` | `roster/institutions.json` | `InstitutionRow` | V11 §3.21.3 | S2, S7b (the institution records of §2.7) | row | written here |
| 21 | `roster.government` | `roster/government.json` | `GovernmentRow` | V11 §3.21.1 | S2, S12c (the institution dial's governing kind, §4.5); port.digest (`@seat` and the village seat, V07 §3.11) | row | written here |
| 22 | `roster.religions` | `roster/religions.json` | `ReligionRow` | V11 §3.21.2 | S2, S12c (the dials, §4.5) | row | written here |
| 23 | `roster.households` | `roster/households.json` | `HouseholdRow` | V11 §3.21.2 | S2; derivePerson (§10.3, on demand, outside the stage graph) | row | written here |
| 24 | `roster.settings` | `roster/settings.json` | one row: `rosterMode`, the unemployment threshold, the propagation depth, `placement.extensionWeight`, the detour factor, `crypt.rankShare`, `coverage.rosterWeight` | V11 §3.5.1 | S2, S10b, S11 (§2.6's basement function with V03 §3.7.4's crypt rank pass after it), EVO_USES and EVO_MUTATION (the epoch ops that re-run the rank in their batch, V06 §3.18.3 (1)–(2)) | row | written here |
| 25 | `roster.basementGate` | `roster/basementGate.json` | `BasementGateRow` | §10.2 | S11 (§2.6's basement function) | row | written |
| 26 | `roster.covers` | `roster/covers.json` | `CoverRow` | V11 §3.14 | S10b | row | written here |
| 27 | `roster.classMix`, `roster.clusters`, `roster.tenure` | `roster/*.json` | `ClassMixRow`, `ClusterRow`, `TenureRow` | §10.2 | S10b, S11 | weights, row | written |
| 28 | `roster.quarterIdentities` | `roster/identities.json` | `QuarterIdentityRow` | V11 §3.10 | S12c (also at each epoch's `character` step, V06 §3.2), S13a | thresholds, row | written here |
| 29 | `roster.powerLinks`, `roster.sectorLinks` | `roster/links.json` | `PowerLinkRow`, `SectorLinkRow` | V11 §3.15 | S12c (§4.5 (2), (6)) | weights | written here |
| 30 | `roster.bandRanges` | `roster/bandRanges.json` | `BandRangeRow` | §10.2 | S7b, S10a | row | written |
| 31 | `roster.sectors` | `roster/sectors.json` | `SectorRow` | V11 §3.15 | S2, S12c | row | written here |
| 32 | `roster.portRows` | `roster/portRows.json` | `PortRows` | §10.2 | S6, S7b (§4.5), S8 (§4.6), S12a (§4.9), and the sewer layer's stages U-NET and U-FRONT (II.7) | row | staged (the port fills) |
| 33 | `siting.profiles` | `siting/profiles.json` | `SitingProfile` per profile family, with the family's `label` and `icon` (read by the palette's groups, the class rows' compiled `icon` and the generic rows' `label`) | V11 §3.4 | S10b; modules: tables.compiler (class profiles), port.digest (item 104's resolver), the display modules | row | written here |
| 34 | `siting.families` | `siting/families.json` | `RelationFamilyRow` | V11 §3.3 | S10b (`resolveSiting`, through the view) | row | written here |
| 35 | `siting.pairs` | `siting/pairs.json` | `SignaturePairRow` | V11 §3.8 | S10b (`resolveSiting`, through the view) | row | written here |
| 36 | `siting.web` | `siting/web.json` | the supply web's settings (item 105 (f), (g), (h); item 107) | V11 §3.7.4 | S7b (1), S10a, S10b, EVO_USES (links re-bound, relaxation passes and splits over epochs, V06 §3.9.10) | row | written here |
| 37 | `siting.custom` | `siting/custom.json` | the custom-chain placement rules (item 104 (h)) | V11 §3.13.4 | S10b, EVO_USES (custom chains over epochs, V06 §3.9.8) | row | written here |
| 38 | `roomProgram`, `interiorLadder` | `roomProgram.json` | `RoomProgramRow`, `InteriorLadderRow`, layout patterns | V03; §2.6 | S10b and S11 through the base's one capacity function (§2.6: the class programme's `circulation` and the `room` form's area minimum; from M2b the capacity's `R(s)` cells `stair.ladder` and `stair.landingCm`, item 233) — called by S10b's placement and S11's household clamp — and, from M3a, S11's `Entrance.storey` and `basementDoor(b)` (`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`, `moduleCm`, `door.mainCm`; items 241, 578); EVO_DEPARTURES, EVO_SITING and EVO_GROWTH (the epoch's `relet`s through the same function, V06 §3.5.1, §3.8, §3.6); modules: `rung.plan` (V03; lazy), `@plat/hood` (the close-up's entrance reserve calling `basementDoor(b)`, V01 §3.8.2 step 5) | row | written (V03) |
| 39 | `composition` | `composition.json` | V02's composition rows | V02 | S11 (V02's `outline()`, the massing, called per building at S11, V02 §3.1 and §3.5); modules: `rung.wings` (`compose(…, 'wings')`, lazy, V02 §3.1), `@plat/hood` (the neighbourhood close-up's entrance reserve reads V02's porch kind rows, V01 §3.8.2, from M3a-V2; view-side) | row | written (V02) |
| 40 | `mutator.compat` | `mutator/compat.json` | `CompatibilityRow` | V11 §3.6.3 | S11 (its designation mutator, which every designation change an epoch makes runs) | row | written here |
| 41 | `farm` | `farm.json` | `FarmTable`, `FarmModeRow` (the village rows' per-head sum is V07's territory per head, derived, never a cell: V07 §3.9 (1)) | §4.9 | S2, S12a | row | written |
| 42 | `greenery` | `greenery.json` | the greenery rule rows | §4.9 | S12b | row, bracket | written |
| 43 | `climate` | `climate.json` | `ClimateRow` (with `rainMmPerYear` and item 111's dry-country cells) | V11 §3.17 | S0 (the arid water chances and the oasis chance), S1 (the oasis's area band), S3 (the water pull `w_water`, `pullRadiusM`), S6, S10a and EVO_FIELD (the prosperity water term `w_waterP` and the `sunlight` cell, §4.5), S10b (the wells' `wellYieldWeight` and `wellCoverageFactor`; the sunlit prestige term × `sunlight`), S11 (roof), S12a (field system, the gardens' `gardenFactor` and `channelReachM`), S12b (species, the grove's `grove` and `groveBandM`), EVO_RAISED and S6 (the water balance of V11 §3.24.6, read by the aqueduct reason), VS1, VS2 and VS8 (V07's village water pull, sun terms and wells, V07 §3.2 (4a), §3.10) | row | written here |
| 44 | `landuse` | `landuse.json` | land-use rows (surface role, crop and livestock options; the `garden` row, item 111) | V11 §3.17.2 | S12a; the renderer (§8.2) | row | written here |
| 45 | `hidden` | `hidden.json` | hidden-share rows | §4.6 | S10 | row | written |
| 46 | `decline` | `decline.json` | `DeclineTable` | §4.11; material durability rows V11 §3.18 | EVO_DECLINE (the strike pool, its persistence rows and V11 §3.18's retaining cells, V06 §3.5.2, §3.19.4), EVO_RAISED (the disuse cells, V06 §3.19.2), EVO_WORKS (the `decay` Works and dwell bands, V06 §3.13); tables.compiler (`salvageM3`) | row, weights | written |
| 47 | `wealthLadder` | `wealthLadder.json` | survivors' ladder, churn caps | §4.11 | EVO_LADDER (the wealth ladder's rungs, V06 §3.8.4), EVO_DECLINE (the churn caps the strike pool runs inside, V06 §3.5.2) | row | written |
| 48 | `works` | `works.json` | `WorksTable`, `CalendarRow` | §4.11 | EVO_WORKS (V06 §3.13), S13a | row | written |
| 49 | `materials` | `materials.json` | `MaterialRow` (with the structure keys `retaining`, `raised:<kind>`, `pier`, `deck`) | V11 §3.19.3 | S10, S11 (the material read and the levelling), S4, S5b, S6 and EVO_RAISED (the raised-way generator; S5b through S4's router), EVO_WORKS (the durations, through `works`); the renderer (§8.2); `@plat/app` (V09's style panel) | match | written here |
| 50 | `era` | `era.json` | `EraRow` (with `aqueductM`, `raisedVaultM`) | V11 §3.19.1 | S3, S5, S7, S11 (§4.7's lights), S12a, S12b (§4.9), S4, S6 and EVO_RAISED (the raised-way chance), U-SYS (V04's vaults), VS8 (V07's pump date), EVO_FORT (the harbour chain at an epoch) | row | written here |
| 51 | `lights` | `lights.json` | `LightRule` | §4.7, §8.4 | S11; the renderer (§8.4) | row | written |
| 52 | `palette` | `style/*.json` | style sheets and role values (each sheet's head row with `label` and `icon?`); the style sheets' check row (`cvd.minDeltaE2000`, below) | §8.2 (values); V05 §5.1's sky-slot facts and V04's ruin and void style facts (their volumes) — this volume writes no colour; the sheets' labels and the check row below | the renderer (§8); the display modules; testkit.bench (T112-1's style check, §13.2) | row | written |
| 53 | `sugar` | `sugar.json` | the sugar expansion table | §7.1 | the edit parser | row | written |
| 54 | `disruption` | `disruption.json` | `DisruptionBudgetRow` | §7.7 | S10b (requests) | row | written |
| 55 | `knowledge.admit` | `knowledge.json` | the knowledge admission table | §9.2 | S13b (label placement, view data outside the model's stage graph, §9.2) | row | written |
| 56 | `islands` | `islands.json` | `IslandRule` and V05's rows (its `accessSiting.deckGapM` and `lineClearM` are V05's own cells, never V11 rows) | II.6, V05 | S7b (5), SKY (V05's stage, and its epoch participants `sky.islands` and `sky.clearance`, which run under it, V05 §3.15) | row | written (V05) |
| 57 | `sewer.existence`, `under.rule`, `under.tunnel` | `under/*.json` | `SewerExistenceRow`, `UndergroundRule`, `TunnelProfileRow` | II.7.1–II.7.4; `access.ruinGain` V11 §3.23.7 | S0 (II.7.1's draw), U-NET, U-FRONT, U-LINK, U-ACCESS (II.7.1–II.7.4 as V04 §3.1 runs them; the access row's `ruinGain`), EVO_PRELUDE (the feature set re-resolved at an epoch's rung by II.7.1's law, V06 §3.2), U-FADE (`under.extend`'s sewer derivation and extension at an epoch — `SewerStrategy.derive` and `.extend`, V06 §3.2, V04 §1.1) | row | written |
| 58 | `under.network`, `under.layout`, `under.fade` | `under/network.json` … | V04's rows | V04 | U-NET, U-SYS, U-ACCESS, U-FRONT, U-CITY, U-LINK (V04 §3.1), S7b (U-FORECAST, V04's predictor called at S7b), U-FADE (V04's epoch participants, V06 §3.2) | row | written (V04) |
| 58a | `under.ruin`, `under.openings`, `under.dig`, `under.catacomb` | `under/ruin.json`, `under/openings.json`, `under/dig.json`, `under/catacomb.json` | `RuinRule` (with `CultureRow`), `OpeningRow`, `DigRule`, `CatacombRule` — schemas V04 §2.3 | V11 §3.23 | U-SYS, U-ACCESS, U-FRONT, U-CITY (V04 §3.1; at every rung, V07 §3.16's village subset included), S7b (U-FORECAST), U-FADE (V04's epoch participants, V06 §3.18; V07 §3.12 at village rungs), EVO_UNDER (excavation by demand, V06 §3.18.1); modules: testkit.bench (V12's bars), `@plat/app` (V09's catacomb view), `@plat/clerk` (V10's why) | row | written here |
| 59 | `undercity`, `under.systems`, `under.links` | `under/*.json` | `UndercityRule` (its `sourceRank`, V11 §3.23.6), `UndergroundSystemRow` (the cavern row's `miningCellShare`, V11 §3.23.1), `LinkRule` | II.7.5, II.7.6; the two cells V11 §3.23 | U-SYS, U-ACCESS, U-CITY, U-LINK (II.7.5, II.7.6 as V04 §3.1 runs them), S7b (U-FORECAST), U-FADE | row | written |
| 60 | `evolution` | `evolution.json` | V06's rows (clientele defaults of V06 §3.9.9 among them) | V06 | every epoch phase — EVO_PRELUDE, EVO_HAZARD, EVO_FIELD, EVO_USES, EVO_DEPARTURES, EVO_DECLINE, EVO_FORT, EVO_TERRAIN, EVO_LADDER, EVO_MUTATION, EVO_SITING, EVO_GROWTH, EVO_WORKS, EVO_UNDER, EVO_RAISED (V06 §3.16; V06 §2.12's `EvolutionTable` row) | row | written (V06) |
| 61 | `village` | `village.json` | V07's village rung rows | V07 | S0, S1, S2, VS1–VS6, VS8, S10, S10b (`rules.race`, the slot race's keys), S11, S12a, S12b (V07 §2.2a's per-sub-record stages; the `village.plan` and `village.density` participants re-run VS1's and VS2's steps; `village.pins` re-runs VS8's rows at a village epoch (stage `VS8`); `village.records` places a record's market, claim or pin under `S10b`; the siting step (m) reads under `EVO_SITING`, V07 §3.12), and the epoch phases that read V07 §3.12's rows: EVO_DECLINE (`epoch.rows`' persistence, street and hinterland rows, V06 §3.5.2–§3.5.3), EVO_USES (`rules.claimArea`, V06 §3.9.6), EVO_SITING and EVO_GROWTH (the village's own phases at those steps, V07 §3.12) | row | written (V07) |
| 62 | `hood.*` — `hood.templates`, `hood.dispatch`, `hood.squares`, `hood.pins`, `hood.placeKnowledge`, `hood.defaultCuts`, `hood.kinds`, `hood.constants` (V01 §2.2; `fabric.select` is V01's stream concern, V01 §3.12, never a table) | `hood/*.json` | V01's rows: `TemplateRow`, `DispatchRow`, `SquareRow`, `HoodPinRow`, the place-knowledge and default-cut rows, `HoodKindRow`, and `hood.constants`' one `settings` row in the settings form (`HoodSettings`, its columns V01 §3.14's column table) | V01 | S0, S1 and S6 (the standalone document's kind draw, frame and default cuts, V01 §3.10.1); S2 (the land estimate's dispatch land, `hood.dispatch`'s small-block weights and `land.smallShare`, V01 §3.5.9); S7b (S7b (1)'s capacity and reconcile with the template land `templateLandM2`, V01 §3.3.7, §3.5.9, and the standalone one-district allocation's anchors and affinity, V01 §3.10.1); S7c; S8 (the seed primitives' rows and the plaza primitive's `hood.squares`, V01 §3.4, laid in S8's district batch — their lineage-key stage component is `S8.seed`, never a reader); S9b; S11 (a square's centrepiece from its `hood.squares` row, V01 §3.5.10); S13a (the naming context's and the places' cells); modules: `@plat/hood` (the neighbourhood close-up's hood pins, V01 §3.8.2 — view-side, its draws keyed `STAGE_VIEW`), `@plat/app` (the panel's template cards, V01 §3.3), testkit.bench (T-V1-5's fabric classifier) | row | written (V01) |
| 63 | `dossier.*` (tiers, site, access, threat, deposits, quarters, landmarks, distribution, status, wealth, sectors, government, powers, conditions, calendar, receipts, derivation, impairments, crime, cultures, categories, tags, relations, historyScars, magic, era, materials, isolation, chainStatus, dependencySeverity, calamitySeverity, qualifiers, threats, ruinEvidence, `customWeights` (the custom definition's `economicWeight` and `criticality` words → the numbers of `PortRows.customKinds`, V08 §2.6, §3.11; J-V8.108) — and V04's two, `sanitation` and `subterranean`, which V04 writes as `tables/dossier/sanitation` and `tables/dossier/subterranean` (files `dossier/sanitation.json`, `dossier/subterranean.json`; `owner` `'V04'`)) | `dossier/*.json` | V08's row types; V04's two the match rows of V04 §2.3a (`sanitation`: match, binding; `subterranean`: match, effect, binding) | §14 item 7, V08 §2.6 and §2.6a; V04 §2.3a for `sanitation` and `subterranean` (DR17) | `port.digest` (for V04's two, DR17's creation and binding at door 1: `toggles.sewers`, a system's forced existence, a placement's `arena` row, each record's binding target); for V04's two also `@plat/app` (V09's why card, which names the matched row, V09 §4.17.3) | row, match | written (V08; V04's two written (V04)) |
| 64 | `dossier.kinds` | `dossier/kinds.json` | V08's `kinds` row (with the optional `implies`) | V11 §3.11 | `port.digest` (DR24), the raised-way and bridge readers through `implies` | match | written here |
| 65 | `dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.goodWords` | `dossier/*.json` | V08 §2.6's shapes for the first three (the archetype row's optional `village` cell, `ArchetypeVillageCell` of V11 §2.8; the synonym row's optional `family`; the keyword row's optional `near`, `class`, `specialisation` and `binds`); `goodWords` is V11's own `GoodWordRow` (V11 §2.8) | V11 §3.13 | `port.digest`, item 104's resolver, V08's adapter (the good-word matching rule, V11 §3.13.5) | match | written here |
| 66 | `dossier.ladders` | `dossier/ladders.json` | `LadderStepRow` | V11 §3.12 | `port.digest` (T9, DR9), S2 | row | written here |
| 67 | `character` | `character.json` | `character.anchorSigma`, `anchorRadiusM`, `identity.dominantMin`, `identity.hysteresis`, `identity.dwellEpochs`, `dial.*`, `pressure.*`, `dispersal.random`, `relation.*`, `trade.kernelScale` | §4.5 | S12c (also at each epoch's `character` step, V06 §3.2), EVO_PRELUDE (the dials past their hysteresis and `TradeFlow` re-read, V06 §3.2) | row | written |
| 68 | `naming.*` (settlement, district, quarter, way, place, landmark, water, island, cluster, undercity, ruin, formerWall, person, folk, villageEnd, field, sewer, catacomb, cavern, quarry, vaults, buried, undercity.plaza, `building.wingRole`) | `naming/*.json` | `GrammarDef` | V11 §3.20.1 (grammars); corpora `authored` | S13a (V04's underground names in the tail's S13a and the renames at an epoch's `character` step included); modules: derivePerson (§10.3), `rung.wings` (V02's wing hover label) | row (field slices for corpora, §7.6) | grammars written here; corpora authored (bar: V11 §3.20.6) |
| 69 | `desc.*`, `chronicle.*`, `appearance.*` | `desc/*.json` | `TemplateDef` | V11 §3.20.4; V06's chronicle defaults | S13a; modules: the description writer, derivePerson (§10.3), the chronicle writer (V06 §2.10, non-canonical, rebuilt by replay) | row | written here (skeletons); lines authored |
| 70 | `corpora` | `corpora/*.json` | `{id, kind, entries[]}` | V11 §3.20.5 (sizes and rules), §3.20.6 (plan and bars) | S13a and derivePerson (§10.3), through the naming engine | row | authored |
| 71 | `ancestry`, `culture` | `naming/ancestry.json` | `AncestryRow`, culture rows (with the `building` block, item 110 (b)) | §10.3, V11 §3.20.3 | S13a, S11 (V11 §3.24.3's specialisation rows), S4, S5b, S6 and EVO_RAISED (V11 §3.24.2's chance; S5b through S4's router), U-SYS (V04's vault share); derivePerson (§10.3) | row, field slices | written here (one human ancestry, the culture rows) |
| 72 | `sim.professions`, `sim.items`, `sim.services`, `sim.prices`, `sim.statblocks` | `sim/*.json` | `ProfessionRow`, `ItemRow`, `ServiceRow`, `PriceTable`, `StatBlockPack` | V11 §3.21.4 (schemas cited, §10.3) | `@plat/sim` | row | authored at M4b |
| 73 | presets `MFCG`, `FTG` (§7.6), `VG` (V07 §3.15; item 377; from V07's V-M0, the milestone whose content ships its file, V07 §8; its entries required on the village-read tables only, V11 §3.2.1 step 4), `FM` (V02 §3.10.8; item 376; from M6c) and `NG` (V01 §3.15; item 584; from V01's M5, the milestone whose content ships its entries; resolved through `MFCG`, its entries on `hood.constants` only) — `PresetId`, V11 §2.2 | `presets/*.json` | preset deltas | §7.6, V07, V02, V01 | the override chain; the compiler's preset check (V11 §3.2.1 step 4) | row | written |
| 74 | the setting pack `english-fantasy` | `packs/english-fantasy/` | `SettingPack` | §10.4, V11 §3.20 | the override chain | — | grammars written here, corpora authored |
| 75 | `keymap` | `keymap.json` | the default keymap | §14 | `@plat/app` | row | written (V09) |
| 76 | `siting.declared`, `siting.linkEdits` (`documentOnly`, §7.6; item 380) | shipped empty | the declaration rows of V11 §4.2 (with the `use:` row's `specialisation` cell) | documents (V09's gestures, V10's accepted proposals) | S10a, S10b (the link binding and the split test), S11 (a `use:` row's `specialisation`); port.digest (item 104's resolver) | match | document-only |
| 77 | `dossier.catalogue` (a manifest, not a rule table) | `src/dossier/catalogue.<line>.json` | V08 §2.4's manifest shape — each catalogue kind's entry and `ladderPairs`, the ladder file's pairs as data (V08 §3.5.1 (f)); cited, never restated | V08's build step | the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2) | — | committed by V08 |
| 78 | `terrace` | `item110/terrace.json` | `TerraceRow` | V11 §3.24.1 | S10, S11 (the levelling — at village rungs through V07's reference cells, and at every epoch that levels, V06 §3.19.4 (1)), S7c (V01's stepped fabric, `terraceState`); modules: `@plat/app` (V09's T2 terrace sugar, T3 retaining mode and flat-ground bends, V09 §4.20.1 (3)), testkit.bench (V12) | row | written here |
| 79 | `retaining` | `item110/retaining.json` | `RetainingProfileRow` and its named row `settings` (`RetainingSettings`; V11 §2.1's settings form) | V11 §3.24.1 (`settings.stateSnapCm` read by §2.7, item 245) | S10, S11 (the levelling: material, batter, buttresses, towers — also at every epoch that levels or restores a stretch, V06 §3.19.4 (1), (6); `stateSnapCm` wherever a re-derivation carries a generated wall's state knots, at generation after an edit and in those epoch ops, V11 §3.24.1); `materials`' structure key refers to it; modules: `@plat/app` (V09's tools), testkit.bench (V12) | row | written here |
| 80 | `raisedWays` (rows, `settings`, `structure`) | `item110/raisedWays.json` | `RaisedWayRow`, `RaisedWaySettings`, `RaisedWayStructure` (with `span` and `slideMaxFactor`) | V11 §3.24.2 (the `span` and `slideMaxFactor` values read by §2.7's support step and span rule, item 244) | S4, S6 (the base's raised-way generator), S5b (the main-road step at stages k ≥ 2 and every epoch stage, through S4's router, which prices viaduct spans; §4.4; V06 §3.6), EVO_RAISED (V06 §3.19's epoch pass), U-SYS and U-FADE (V04's arch vaults and their reconcile, and `foundationObstacles`' `span.supportFoundationCm`, V04 §3.5.0's foundation rule), U-CITY, U-ACCESS and U-LINK (`foundationObstacles` read by U-CITY's carve and U-DIG's cost), SKY (V05's caster ceiling, with its `sky.clearance` participant); modules: `@plat/app` (V09's T4), `@plat/clerk` (V10), testkit.bench (V12), port.digest (DR35's landmark threshold) | row | written here |
| 81 | `ways.crossing` | `item110/crossing.json` | `WayCrossingRow` | V11 §3.24.5 | S4, S5 (its four steps, V11 §3.1's *Readers*), S9 and S9b (V01's lanes) where a way crosses a retaining wall; S4, S5b, S6 and EVO_RAISED (the raised ways' ends; S5b's viaduct through S4's router); modules: `@plat/app` (V09's ghosts), `@plat/clerk` (V10's `cross/<class>`) | row | written here |
| 82 | `deck` | `item110/deck.json` | `DeckRow` | V11 §3.24.4 | S10 (the base's deck-plot cutter, at village rungs too), S11 (V02's deck budget and storey bend), EVO_SITING (deck faces offered at regrowth tier (5), V06 §3.19.5 (1)), EVO_DECLINE (the pool's `deck` candidates, V06 §3.5.2), EVO_RAISED (a deck's repair, V06 §3.19.5); modules: `@plat/app` (V09's tools), `@plat/clerk` (V10's `deck/…`, `deckok/…`), testkit.bench (V12) | row | written here |
| 83 | `deck.landmarks` | `item110/landmarks.json` | `DeckLandmarkRow` | V11 §3.24.4 | S10 (the cutter's slot draws), S11 (V02's landmark composition); modules: `@plat/app` (V09's T6 slots), testkit.bench (the fixtures) | row | written here |
| 84 | `roster.specialisations` | `roster/specialisations.json` | `CultureSpecialisationRow` | V11 §3.24.3 | S11 (the draw, §4.7 S11, item 259, and V02's resolution chain; at village rungs V07 §2.4's cap); modules: `rung.plan` (V03's rows), port.digest (DR15's trace), `@plat/clerk` (V10), testkit.bench (V12) | row | written here |
| 85 | `water` | `item110/water.json` | `WaterNeedRow` (with item 111's well yields) | V11 §3.24.6 | S1 (the well-yield raster, §4.2 S1 (10)), S6 (the aqueduct reason's test), EVO_RAISED (V06 §3.19's pass), EVO_TERRAIN (V06's failing spring: the town's draw against its yield, V06 §3.12.1); module: `@plat/app` (V09's uphill-aqueduct bend to a well, J-VI.4 (h)) | row | written here |
| 86 | `toolkit` | `toolkit.json` | `ToolRow` (with `ToolModeRow`, `ToolParamRow`) | V09 §2.3 (the shipped rows V09 §4.2's table; item 110's rows V09 §4.20) | modules: `@plat/app` (the rail and options strip, the mapper, the binding table and the context menu, V09 §3.3, §4.2–§4.4), `@plat/docs`' tool pages, testkit.bench (T-V9-12) | row | written (V09; owner V09, `parity: 'untouched'`, `packPatchable: false` — a user never edits it, V09 §2.3) |
| 87 | `messages` (one file per locale; `en` ships) | `messages/<locale>.json` | `MsgRow` for `en.json`; `{ key; text }` for every other locale's file — `buttons`, `tone` and `codes` are read from `en.json` only, and the loader refuses a locale file carrying them (V09 §2.9's *Locales*; J-V9.121) | V09 §2.9 (the rows V09 §4.9; volume 10's key families' `en` texts from V10 §2.10, §3.9, §3.9a, §3.10–§3.13, §3.16, §3.20 and §4.4; volume 8's `host.*` rows; volume 6's `info.copy.condensed` line, V06 §3.15.5 — as V09 §1b's messages row lists them) | modules: `@plat/app` (every bend line, refusal, error and hint), `@plat/clerk` (V10), `@plat/docs` | row | written (V09 and V10; owner V09, `parity: 'untouched'`, `packPatchable: false` — a locale is another file of the same keys, V09 §2.9) |
| 88 | `clerk.ops` | `clerk/ops.json` | `ClerkOps` | V10 §2.10 | module: `@plat/clerk` (the backend, the request builder, the meter, the caps, the store) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false`; its layers the shipped rows and the device's preference layer only — a document's, a skeleton's or a host's `editTable` on it refused as V10 §2.10 states) |
| 89 | `clerk.content` | `clerk/content.json` | `ClerkContent` | V10 §2.10 (its default lexicon rows V10 §3.3's table) | module: `@plat/clerk` (the encoders, the resolver, the brief renderer, the critique engine, the grounding check, the system prompt) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false` — its layers the shipped rows, the device's preference layer, the document's override layer and a host's rows, V10 §2.10; the base's §11.4 door 3) |
| 90 | `way.surface` | `way/surface.json` | `SurfaceRow` (V01 §2.2: `wayClass`, `era?`, `band`, `surface`; key `wayClass/band/era`, an absent `era` an empty component) | V01 §3.7.3 | S10a (the way-surface rule at S10a's end, after field pass 2); S6 (an epoch's field step re-bands, and the ways whose fronting band crossed the hysteresis take their surface again, V01 §3.7.3, §4.5); EVO_DECLINE (the landfall's re-laid surface, V06 §3.5.2) | row | written (V01; `owner` `'V01'`, `parity: 'zeroExtensions'` — it holds no `extension` cell, so every preset reads its rows; `packPatchable: true`; its one value column an enumeration, `calibratable: false`, so it takes no register entry) |
| 91 | `squares.quota` | `squares/quota.json` | `SquareQuotaRow` (V01 §2.2: `band`, `haPer1000`, the `kind` factors; key `band`) | V01 §3.5.2 (the default rows) — the base table §4.5 S7b (3) and §4.7 S9 read | S7b (S7b (3)'s square claims larger than a block, from M2b); S2 (the land estimate's sub-block square share, V01 §3.5.9, from M5); S9b (the sub-block remainder, V01 §3.5.2, from M5) | row | written (V01's rows; `owner` `'base'`, `parity: 'perPreset'` — its `MFCG` and `FTG` entries where they differ, V01 §2.2, and no `NG` entry, `NG` reading it as `MFCG` does; `packPatchable: true`; `haPer1000` and the kind factors calibratable, their register entries written at V01's M2b exit by V12 §3.11's default line, V01 §8.1) |
| 92 | `history` (keyed rows and the named row `settings`) | `history.json` | `HistoryEventRow` (key `type/template`) and `HistorySettings` (V11 §2.8) | V11 §3.25 | S0 (the history-first path starts at the peak's or the founding's population, sized by `symbolicQuantile`), S4, S5b and VS4 (`reuseCost` in a refounded settlement's route solve), U-SYS (`BuriedFormer.lay`'s burial threshold, V04 §3.5.5 (b)); modules: `@plat/evolve` (V06 §3.20's replay planner, at generation), `@plat/clerk` (V10's story lines read the rows' `says`) | row, match | written here (item 113) |
| 93 | `base.settings` (one row `settings`) | `base/settings.json` | `BaseSettings` (V11 §2.8) | V11 §3.1 (below) | every stage (the kernel's dynamic grid, §3.3; New random's advance bound, §5.1 (6)), S1 (the crossing-site search band, §4.2 S1 (5), and §6.3's bridge anchor) | row | written here (`owner` `'base'`, `parity: 'untouched'`, `packPatchable: false`, every column `calibratable: false`) |

Ninety-four catalogue rows (1–93 and 58a; some rows group several ids that share a file), counted by `REGISTRY`'s size
wherever a count is read (J-V11.89); the catalogue is closed: a table any document names and this list lacks is a
registry defect the build refuses (T-V11-1). Every column of rows 63–66 and 77 (the `dossier.*` row sets — V04's
`sanitation` and `subterranean` among them — and the catalogue manifest) carries `ColumnSpec.calibratable: false`
(§13.9 (7); V12's R4): a change to them is a table fix reviewed with V08, never a calibration, and V12's register holds
no entry for them (J-V11.65). Likewise every column of rows 68–70 (`naming.*`, `desc.*` / `chronicle.*` /
`appearance.*` and `corpora`: the grammars' rules, guards and weights, the templates' lines, the corpora's entries) and
the naming columns of row 71 (the ancestry row's `nameGrammar` and `appearanceTemplates`, each culture row's
grammar-slice and corpus fields) carries `calibratable: false` (V12's R4 and T-V12-24: naming tables, grammars, word
lists and packs are never calibrated): a change to them is an authoring change held to V11 §3.20.6's bars, and V12's
register holds no entry for them. Row 71's culture `building` block stays calibratable (V12 §3.11's row for it)
(J-V11.70). Every column of rows 86–89 (`toolkit`, `messages`, `clerk.ops`, `clerk.content`) carries `calibratable:
false` too (J-V11.81): the corpus stage measures drawn maps (§13.9) and never re-signs a tool row, a message text, the
assistant's operation or its wording, and the numbers their owners re-set by their own measurements (V10 §7.3's
evaluation for the clerk's budgets, token limits and prices; V09's usability runs for the toolkit's hints) land as
ordinary table versions (V11 §3.2.5), each a `minor` or `patch` bump with its cause, so V12's register holds no entry
for them. Every column of row 93 and the event rows' keys and enumerations of row 92 (`type`, `template`, `words`,
`kind`, `hazard`, `archetype`, `cls`) are `calibratable: false` (engineering values and the event mapping); row 92's
numbers and every other cell of rows 43, 44 and 85 are calibratable, `history.replay` excepted (a switch, as
`terrace.enabled`).

**Display cells** (item 516; J-V11.93). Every table the UI shows rows of carries a `label` cell and an `icon?` cell
(V11 §2.3's meaning), `own` and `calibratable: false`, and the class rows also `synonyms` and `commonness`; T-V11-4
refuses a row of these tables without its `label`, and each lists the display modules among its readers (rows 17, 18,
19, 33, 52), `port.digest` reading a class's `label` for V08 §4.6's notes. Where the words are written: the
town-and-city classes and V05's sky classes, V11 §3.5.15; the `v.` classes, V07 §2.4; the generic classes, the compiler
from their family (V11 §3.13.3); the profile families (row 33), V11 §3.4's *Display words*; the goods (row 19), V11
§3.7.1; the district kinds (row 18), V11 §3.9; the style sheets (row 52), here — `ink` "ink", `lit` "lit", `hatched`
"hatched", `parchment` "parchment" (a shipping ink-family variant, §8.2), `bw-print` "black and white", `night` "night",
and the owner's chosen third preset `house` "house" (D-1), each written into its sheet's head row by the seat that ships
the sheet (§8.2; §16's M1, M2b, M3b and M5); the random style and a user's saved sheets (V09 §4.5's T12 row) are no
shipped rows and take their words from V09. Icons: only the profile families' rows state one (`fam.<family key>`, 45
glyphs in V09 §5.1's sprite, written with the glyphs), and the class rows compile theirs from their family; the goods,
district kinds and style sheets ship none, so their cards show the label alone (V09 §2.3's `iconCell` is optional; a
style card shows its rendered thumbnail, V09 §5.7), and a pack may state one.

**The style check's threshold** (item 112; registry row 52). The style sheets' check row holds `cvd.minDeltaE2000` 8 (a
CIEDE2000 difference; `own` — the contrast matrix's floor for two area fills that meet, §8.2; `calibratable: false`; range
[1, 40]), the threshold §13.2's T112-1 reads for every pair of categories a legend distinguishes in each checked variant.

**The base settings row** (`base.settings`, registry row 93). The values the base calls table values, one row
in the settings form, `own`, `calibratable: false`, cited by the base and stated nowhere else: `index.gridCellM` — the
dynamic uniform grid's cell per refinement level (§3.3): L0 25 m, L1 25 m, L2 10 m, L3 5 m, L4 5 m (range [1, 100]);
`reroll.maxAdvance` 3 — the most times New random advances an unchanged scope entity's reroll (§5.1 (6); integer range
[1, 10]); `crossing.searchBandM` 120 m — the crossing-site search band (§4.2 S1 (5)), which §6.3's bridge anchor re-reads
(range [20, 500]). A `gridCellM` edit moves no output (an index's cell size changes no geometry, §3.3); the other two
re-derive by §7.6's slice.

### 3.2 The compiler, the loader and their failure handling

**3.2.1 Compile (`plat tables compile`, a build step of `@plat/tables`; pure, no clock, no network).**
0. The shipped sources compile (T-V11-0): the seat that writes a row runs the compiler before its change lands, so an invariant a
   row breaks is caught where it is written; C1's exit runs it first.
1. Read `REGISTRY` (V11 §2.1) and the source manifest (`src/manifest.json`: every source file's path, author seat,
   last-change date — the only dates the compiled provenance carries — and, from V07's V-M0, `productStages.village`: the
   stage ids `ProductDecl('village').stages` registers, conditional registrations included — V07 §3.0's set with any stage a
   V07 fallback registers, as S8's bent cut under V07 §8's risk (1) — committed by the seat landing V-M0 and held equal to
   the declaration by T-V11-9, so `@plat/tables` never imports the village package — and, from C0, `stageIds`: every
   StageId the stage registry holds with every package the build ships loaded (§4.1's stages, the volumes' registered
   stages and V06 §3.16's epoch-phase ids, each package's ids entering the list in the change that registers them),
   committed by the seat landing that change and held equal to the registry by T-V11-1 (b), so `@plat/tables` imports no
   stage package either).
2. Parse every source file in path order (JSON5; a parse error names file, line and column and stops the build).
3. Resolve inheritance: `$extends` chains within one kind (template families V11 §3.6, profile families V11 §3.4); a
   cycle or a missing parent stops the build naming the chain; depth ≤ 4.
4. Expand cells: bare values take the file's or row's provenance; the provenance string is parsed by §17.1 (6)'s grammar
   (item 534; the compiler's `provenance.ts`, one regular grammar; a `ref:` without a behaviour, a `(code)` without its
   P-id, a `general` without its practice, or a `corpus` source other than the item-69 palette targets and the
   `historical:<frame>` preset rows of V11 §2.2 stops the build); `evidence` is carried into the compiled cell (V12 §2.10);
   unit and `calibratable` come from the `ColumnSpec`; `ext` becomes §7.6's `extension`. **Reference cells** (§7.6)
   resolve here, for every table: a `ref` to a missing table, row or cell, or one whose target's unit differs from the
   referencing column's, stops the build naming both cells; a resolved reference is compiled as §7.6's reference cell,
   read as its target's current value. **The owner-rule stamp** (V12 §2.10): every cell of an owner-rule row carries
   `provenance.ownerRule` naming the item and part it encodes — the `raisedWays` rung gate and the CITY and METROPOLIS
   calibration minima (`'110 (b)'`, V11 §3.24.2), the catacomb TOWN gate and the cemetery-only catacomb sources (`'109 (k)
   (1)'`, V11 §3.23.8), the cathedral's and the great temple's `always` crypt (`'109 (k) (2)'`, V11 §3.5.8), the
   underground's any-tier existence (`'109 (j) (1)'`, V11 §3.23.2) — stamped from the source manifest's owner-rule row list,
   and the compiler writes the stamped-clause list V12's register check reads; a stamped cell outside the list, or a listed
   cell without its stamp, stops the build. The preset entries are checked (V11 §2.2; items 376–377, 584): a `presets` key
   outside `PresetId`, or an `ext.over` value outside its union (`PresetId` but `NG`, with `both` and `none`), stops the
   build naming the cell; for every zeroing preset whose file ships in registry row 73 (`MFCG` and `FTG` from C0, `VG` from
   V07's V-M0, the milestone whose content ships the `VG` preset file, V07 §8; `NG` from V01's M5, the milestone whose
   content ships its entries, V01 §8.1), a `presetsRequired` column's cell without the entry that preset requires stops it
   — `MFCG` and `FTG` on every table, `VG` on the village-read tables (below), `NG` on none, every cell resolving under
   `NG` through its `MFCG` resolution — and every named off form — V11 §3.7.4's `web.off`, V11 §3.24.0's switch table and
   the off forms of items 111 and 113 (V11 §3.17.3, §3.25.1) — must resolve under that preset, by §7.6's order, to its off
   values cell for cell, else the build stops naming the preset, the cell and the form (under `VG` over every table, since
   the loader resolves every table, V11 §3.2.2: a switch cell that fails it on a table that is not village-read is a table
   defect fixed by its `extension` marker, a `VG` entry being refused there). **The `VG` entries cover the village-read
   tables only** — a table whose `readers` StageIds (its `stageReaders`, step 6; a module id never counts) meet step 1's
   `productStages.village` (compiled `villageRead: true`): `VG` is read at village rungs only (items 377, 581), and what a
   village stage reads is what a `VG` entry states; a missing `VG` entry stops the build naming every village-read
   `presetsRequired` cell that lacks one at once (so the seat landing V-M0 reads the whole list from one compile, V07
   §3.15's rule filling it); a `presets.VG` entry on a cell of any other table stops the build instead — such a table
   resolves under `VG` by §7.6's order, a categorical cell to its `MFCG` entry (V11 §3.2.2; J-V11.77, J-V11.91); a
   `presets.FM` entry on any cell but `composition`'s (row 39) and V11 §3.24.0's chance and offer cells (rows 82–84) stops it
   (item 376's scope); a `presets.NG` entry on any cell but `hood.constants`' (row 62; V01 §3.15's list) stops it
   (J-V11.88).
5. Emit the generated rows: one `generic-<family>` class per NON-ALIAS profile family (V11 §3.13.3, with its display
   cells from its family row; an alias resolves to its target's generic class) and the derived compiled `template` rows of every class from its template family (V11
   §3.6.1's derivation rules and the role table of V11 §3.6.5).
5a. Apply the reading rules of V11 §3.5.2 and the derived columns of V11 §3.5.1 — default weights and distances, supply
   edge defaults, `tags`, `noxious`, `cluster`, `max`, the compiled orientation (V11 §3.7.3), the `competition.mode` of
   `singular` and `district-defining` classes (V11 §2.3's rule), the compiled `deckOk` (V11 §3.24.4), and the display
   cells `icon` and `commonness` — a town-and-city row's by V11 §3.5.1's rule, a `v.` row's by V07 §2.4's (the roster share
   at VILLAGE) — and list every default applied and every override in the manifest.
6. Validate (each failure stops the build naming table, key, field and rule): types, `range`, `enumValues`, `ref`
   targets live, `sumsTo` groups within tolerance, the `TotalityRule`s (V11 §2.1), the retired-key list (V11 §2.9),
   the readers — the group entry `S5` first expanded to S5a, S5b, S5c and S5d (V11 §3.1's *Readers*), then every
   `readers` entry either an id of step 1's `stageIds` or a module id (`@plat/<package>`,
   `port.digest`, `tables.compiler`, `derivePerson`, `rung.wings`, `rung.plan`, `testkit.bench`; V11 §3.1's *Readers*), an
   entry that is neither stopping the build naming the table and the entry, and the stage entries compiled per table as the
   manifest's `stageReaders` (step 7), which step 4's village-read test and V12's run scope read — and the content
   invariants of V11 §7.1 (T-V11-3 … T-V11-9, T-V11-23 … T-V11-26, T-V11-28, T-V11-32, T-V11-37, T-V11-38 (a)–(c), T-V11-39
   (a)–(c)) — T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 run over every class row, V07 §2.4's `v.` rows included,
   whose `presence?` column is carried as written (V07's T-V7-56 runs the same over its rows).
7. Write canonical JSON per table, compute each row's H128 and the table's **pinning hash** — §7.6's: over each cell's
   value, unit, `calibratable`, `extension` and `presets`, the whole provenance block (source, date, note, evidence,
   owner rule) excluded, so a provenance note or an evidence line moves no output version — and write
   `dist/manifest.json`:
   `{ table, version, hash, rows, provenanceCensus: {own, ref, owner, corpus, host, general, sf}, extensionCells, shadowedDerived, defaultsApplied, competitionOverrides, ownerRuleCells, stageReaders, villageRead }`
   (`stageReaders` the table's `readers` that are StageIds, step 6 — read by V12's run scope and cost shortcut, V12 §3.7.2 (4),
   §3.7.7; `ownerRuleCells` the stamped-clause list, step 4; `villageRead` from V07's V-M0, false before), with, from V-M0,
   the top-level `villagePresetCells` — every `presetsRequired` cell of a village-read table as `<table>/<row key>/<column>`
   with its `VG` entry's value and provenance, the list V07 §3.15's `VG` cell list is checked complete against — and
   `dist/evidence.json` in V12 §2.10's shape (`{ "<cell ref>": { status, lines } }`: the register's plain status word for
   the cell, `owner` for a stamped cell, and one plain line per cited evidence id from its run's summary).
8. Hand the dist tree to the clean-room scanner (§17.1 (5)) and the docs generator (`@plat/docs`: one page per table
   with its schema, readers and rows, which the tables editor's help reads).

**3.2.2 Load (`loadTables(recipe, packs) → TableView`, `@plat/tables`, on every host).** Resolve each registry table at
the version the recipe pins, by hash, from the package or from the document's `packs` block (§2.9); apply the override
chain `defaults ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events` by row operations (§7.6), orphaning
per §7.6 — the preset step resolves every table by the preset's order (§7.6), `VG`'s entries standing only on the
village-read tables (the manifest's `villageRead`), so an epoch at a village rung (V07 §3.12; V06 §3.2) reads the epoch
tables at their parity values (V06's "0 in the parity presets"), as a town's epochs do under `MFCG` (J-V11.91); resolve
the reference cells (§7.6); refuse a non-`en` `messages` file carrying `buttons`, `tone` or `codes` (registry row 87);
apply the web's two switches (V11 §3.7.4: with `orientEnabled` false every class's `profile.orientation` reads
`balanced` in the view, with `splitEnabled` false no class's `profile.split` is in the view — a use's declared split, V11
§4.2, stands); run `resolveSiting` (V11 §3.3.4); freeze. The view is memoised by the H128 of (pinned table hashes, the
ordered override chain's row-op hashes).

**3.2.3 Failure handling (no whole-map retry, §5).** At build time any defect stops the build (nothing ships half-valid).
At run time: (a) an override or pack row is checked as an edit is (V11 §4.1): a numeric cell outside its declared range
clamped and reported in one line, a schema failure (a type error, a dangling `ref`) **refused** as F-EDIT (§5.2) with the
rule it broke — never partially applied; (b) a pack whose `baseVersion` does not match is loaded with its mismatched ops **orphaned**
(§7.6) and reported; (c) a `ref` a pack deletes from under a live reference (a class a kind row still names) makes the
kind row fall to its `TotalityRule.allowFallback` (the category's `generic-<family>` class, reported
`unmapped_kind`), never a crash; (d) a derived family row whose target feature class has no member in the town scores
its neutral value (satisfaction 1 for a push, 0 for a pull) — a missing emitter never blocks a plot; (e) a table the
recipe pins that neither the package nor the document holds follows §6.4 exactly: inside the N−2 window the retained
chunk of that output version holds the table (its rows stored as deltas, V11 §6); outside it the document opens as §6.4's
frozen view with its CLI command — this volume adds no third behaviour.

**3.2.4 Determinism.** The compiler iterates files by path and rows by key; numbers are decimal literals parsed to IEEE
doubles identically on every host (§6.5); derived weights are computed in the fixed order of V11 §3.3.4 with no
reduction whose order could vary. The loader holds no random stream; nothing in the content system draws — every
draw that reads a table is the reading stage's, on its own named stream (§6.1).

**3.2.5 Versioning.** Each table carries semver (V11 §2.1): major = schema change (a migration of overrides, §7.5);
minor = a row change that moves output (a declared shift, §6.4, with its goldens re-recorded under §13.3's protocol and
its cause written in the manifest); patch = no output change (provenance notes, reasons, docs). The recipe pins every
table's version and hash (§2.9); a document never silently takes a new table.

**3.2.6 Authoring discipline (the clean-room rule for content, §17.1).** Tables are written by implementer seats from
this volume, the design and the digest only. The `ref:` rows carry a behaviour and, where it was read in code, its
P-id — never a reference's value set: a reference NUMBER that describes a behaviour (a measured spacing, a share, a
threshold) is a fact and may stand with its baseline id; a reference LIST, grammar, word, palette or table is never
typed in (§17.1 (6)). Every source file's header names its author seat; every PR runs §17.1 (5)'s hashed scan over the
dist tree, its list-hit rule failing the PR unless an allow row with a written reason is reviewed. Rows citing "general
historical knowledge, not corpus-witnessed" (item 104 (f)) name the historical practice in their note; the corpus stage
re-signs them (§13.9).
SettlementForge is the owner's own program, not a reference: its words (kind keys, tag and category words, archetype
ids) stand in the left columns of the dossier tables, quoted, and are never a reference list for the scan (§17.1 (3)).

### 3.3 The relation families (item 103 (a)) — rows and derivation

**3.3.1 The family rows** (`siting.families`; every row `extension: true` — the references' own siting survives as
the classes' authored rows, which are `extension: false` where a reference has them (V11 §3.5) — so the parity presets
zero every family and keep the references' rules, item 23; weights ours, calibratable). `says` is the sentence the
clerk shows (V10) for a row of the family.

| family | member | derived row (kind → to) | radius m by level 1 / 2 / 3 | weight | says |
|---|---|---|---|---|---|
| nuisance | smell | `far` → `emit:smell:L` (and the emitter's reciprocal `far` → `sens:smell`, share 0.5) | 60 / 150 / 300 | 0.6 | "kept away from the smell of …" |
| nuisance | smoke | `far` → `emit:smoke:L` (reciprocal 0.4) | 40 / 100 / 200 | 0.4 | "kept away from the smoke of …" |
| nuisance | noise | `far` → `emit:noise:L` (reciprocal 0.3) | 30 / 80 / 160 | 0.4 | "away from the noise of …" |
| nuisance | fire | `far` → `emit:fire:L` (reciprocal 0.5) | 15 / 30 / 60 | 0.5 | "kept a fire gap from …" |
| nuisance | water | `upstream` with `to` `emit:water:L` — the relative form of §4.7 S10b (item 437): the nearest emitter on the plot's own drainage network within the radius, neutral 0.5 when none lies on it (reciprocal: the emitter `downstream` with `to` `sens:water`, share 0.7) | 100 / 300 / 800 | 0.8 | "draws its water above …" |
| nuisance | traffic | `far` → `emit:traffic:L` (reciprocal 0.2) | 20 / 50 / 100 | 0.2 | "off the heavy traffic of …" |
| nuisance | crowds | `far` → `emit:crowds:L` (reciprocal 0.2) | 20 / 60 / 120 | 0.25 | "away from the crowds of …" |
| nuisance | disorder | `far` → `emit:disorder:L` (reciprocal 0.3) | 40 / 100 / 200 | 0.5 | "away from the disorder of …" |
| need | runningWater | `nearWater` → river or stream, within 40, beyond 150 | 40 / 40 / 40 | 1.0 | "needs running water" |
| need | riverBank | `nearWater` → a bank of any water, within 20, beyond 60 | 20 | 1.0 | "needs a bank" |
| need | shore | `nearWater` → a shore or harbour edge, within 20, beyond 80 | 20 | 1.0 | "needs the shore" |
| need | road | `frontage` values `through`, `primary`, `secondary` | — | 0.5 | "wants a proper street" |
| need | through | `frontage` values `through`, `primary` | — | 0.8 | "wants a through road" |
| need | gate | `nearGate`, within 60, beyond 300 | — | 0.6 | "wants to be near a gate" |
| need | harbour | `nearHarbour`, within 60, beyond 300 | — | 0.8 | "wants to be near the harbour" |
| need | market | `nearMarket` (the nearest of N, item 24), within 80, beyond 400 | — | 0.6 | "wants to be near a market" |
| need | space | `plotArea` min = 1.5 × the class's p50 plot area at the band | — | 0.4 | "needs room" |
| need | security | `intramural` and `near` → `align:law+`, within 150, beyond 400 | — | 0.4 | "wants the safety of the walls and the watch" |
| need | secrecy | `exposure` values `hidden`, `back` (item 30) | — | 0.6 | "keeps out of sight" |
| need | highGround | `highGround` | — | 0.5 | "wants high ground" |
| need | dryGround | `dry` | — | 0.6 | "wants dry ground" |
| need | woodEdge | `near` → `landuse:wildwood`, `landuse:coppice`, `landuse:reserve` (the nearest of the three), within 100, beyond 400 | — | 0.6 | "works at the wood's edge" |
| need | fields | `near` → `landuse:arable` or `pasture`, within 100, beyond 500 | — | 0.6 | "works beside its fields" |
| need | deposit | `near` → `deposit:<family>` (S12a's site), within 50, beyond 300 | — | 1.0 | "works its deposit" |
| clientele | dailyLocal | `near` → `#housing`, within 0, beyond 150; `frontage` any street | — | 0.3 | "close to the homes it serves" |
| clientele | townWide | `nearMarket` within 150, beyond 600; `frontage` `primary`, `secondary` | — | 0.4 | "on a street that feeds the market" |
| clientele | travellers | `nearGate` within 80, beyond 400; `near` → `bridge`, `quay`, within 60, beyond 250; `frontage` `through` | — | 0.6 | "where travellers pass" |
| clientele | elite | `band` values `prosperous`, `rich`; `near` → `align:status+` within 100, beyond 300 | — | 0.5 | "among the well-to-do" |
| clientele | clandestine | `exposure` `hidden`, `back`; `near` → `emit:crowds:2` within 50, beyond 300 | — | 0.5 | "hidden near the crowds it preys on" |
| clientele | institution, residential | none | — | 0 | — |
| alignment | law | crime (−1) `far` → `align:law+`; law (+1) nothing; like attracts: crime `near` → `align:law-` | 0 / 200 / 400 (far); 150 (near) | 0.8 far, 0.2 near | "keeps clear of the watch and the courts" / "near its own kind" |
| alignment | sacred | profane (−1) `far` → `align:sacred+`; sacred `near` → `align:sacred+` — the one way holy places push the profane (no `sacred` nuisance, V11 §2.3) | 0 / 100 / 200 (far); 300 (near) | 0.5 far, 0.2 near | "kept away from holy ground" / "near the other houses of God" |
| alignment | status | elite (+1) `far` → `align:status-`; low (−1) nothing | 0 / 80 / 150 | 0.4 | "away from the hovels" |
| competition | cluster | `clustered` → own class within 120 (and `sameStreet` → own class when `street`) | 120 | 0.4 (0.3 sameStreet) | "clusters with its trade" |
| competition | spread | `far` → own class, within the district, beyond `spacingM` (item 107 (d)) | spacingM | 0.5 | "keeps its distance from others of its kind" |
| coverage | * | `coverage` (§10.2's kind, item 433): satisfaction over the plot's unit as V11 §2.3 states it | unit's | 0.6 | "this part of town lacked one" |
| supply | * | the supply edge's pull (`sup/…`), with the goods table's `comfortM` plateau; the reverse pull `sup/…/rev` at `reverseShare` 0.5 (item 105 (b)) | goods | edge weight × 1.0 | "close to its supplier of …" / "close to the buyers of its …" |

**3.3.2 Level arithmetic.** A derived nuisance row between a sensitive class at level `s` and an emitter level `L` has
weight `w_family × (s / 3) × (L / 3)` and radius `radiusM[L − 1]`; so a house (smell 2) feels a tannery (smell 3) at
`0.6 × 2/3 × 1 = 0.4` out to 300 m and a chandler (smell 2) at `0.6 × 2/3 × 2/3 ≈ 0.27` out to 150 m. The reciprocal row
an emitter gets is `w_family × reciprocal × (L / 3)` toward `sens:<n>` (members with sensitivity ≥ 2). A class's compiled
profile never both emits a nuisance at level 2 or more and is sensitive to it at level 2 or more (the rule fails only when
BOTH levels exceed 1; T-V11-5) — which is why the slaughtering and brewing trades take the `food-works` family, not
`food` (V11 §3.4).

**3.3.3 Feature classes the derived rows measure to** (the complete `to` vocabulary; T-V11-3 refuses any other; each is
one distance raster of §4.7 S10b's kind, built from the placed and allocated members exactly as the provider rasters are,
unless it reads the context vector):
* rasters: `emit:<n>:<L>` (members whose class emits `n` at level L or more — ONE multi-level raster per nuisance, the
  nearest distance at each level ≥ L computed in one pass, three channels), `sens:<n>` (sensitivity ≥ 2), `align:law+`,
  `align:law-`, `align:sacred+`, `align:status+`, `align:status-`, `#<tag>` (members whose class carries the tag),
  `landuse:<kind>` (§2.7's `LandUse.kind`), `deposit:<family>`, `bridge`, `quay`, `open:square` (S7b's and S3's market
  and square faces), `open:green` (S12b's greens) and `raised:terminal` (the terminal point of a generated or declared
  aqueduct, item 110 (b); read only by the one criteria row V11 §3.24.7 (1) writes — a town with no aqueduct builds no
  such raster);
* read from the context vector (no raster): `wall` (`dist.wall`), `wallInner` (`dist.wall` on an intramural plot — the
  inner setback band S10 (0) builds; satisfaction 0 outside the enceinte), `gate` (`dist.gate`), `harbour`
  (`dist.harbour`), and the river, shore and water targets of `nearWater`;
* cell size: a raster is built at the fields' 32 m cell when every derived row reading it has a radius (its
  `beyondM`) of at least 60 m, and at 16 m otherwise (the fire family's 15–60 m and the level-1 traffic and crowd rows'
  20–30 m keep 16 m; the supply and class rasters of §4.7 S10b stay 16 m);
* at most 32 rasters are built per S10b pass, only those some allocated class reads, in the order nuisance, alignment,
  `#<tag>`, land use, deposit, the rest. *Pre-decided fallback* when the budget of V11 §6 is missed at the M2b bench:
  the nuisance rasters keep levels 2–3 only (level-1 rows score neutral), then the cap falls to 24.

**3.3.4 The derivation `resolveSiting(view) → Map<classId, RelationRule[]>`** (`@plat/content`, pure, memoised by the
view hash; order fixed so the output is byte-stable): for each class in id order —
1. nuisance rows: for each `n` in the `Nuisance` order with `sensitive[n] = s > 0`, for `L` = 1..3 where any class
   emits `n` at `L`: one row `fam/nuisance/<n>/L<L>`; then for each `n` with `emits[n] = L > 0` and a reciprocal share
   `> 0` and any class sensitive to `n` at ≥ 2: one row `fam/nuisance/<n>/rev`;
2. need rows from each `NeedSpec` (`fam/need/<need>`; `strength` from the spec — the only hard family-derived rows);
3. the clientele rows (`fam/clientele/<c>/<i>`); 4. the alignment rows (`fam/alignment/<axis>/far|near`);
5. the competition row (`fam/competition/cluster|spread`); 6. the coverage row (`cov/<class>`);
7. the signature pairs naming the class or one of its tags, in pair-id order (`sig/<id>`, mirrored `sig/<id>/b`);
8. **shadowing**: a derived soft row whose (kind, to) equals an authored row of the class (`cls/…`) is dropped — the
   authored row wins; the drop is listed in the manifest's `shadowedDerived`;
9. every derived row's weight × `placement.extensionWeight` (§4.7 S10b; 0 in the parity presets).
A class carries ≤ 48 derived rows (T-V11-6). The solver's hard-filter / soft-score logic is the base's, unchanged in
shape (item 103 (c)).

**3.3.5 Item 102's cells.** `prosperity.drivers` holds the row `sun` (id `drv/sun`): kernel `−shade(x)` (item 102
(a)), weight `w_sun` 0.02 — about a tenth of a band's width at full all-day shade (the default band set's six bands span
[0, 1] with a mean width ≈ 0.17); `own`, `extension`, calibratable — sampled at nine path-sun positions at the equinox
(`sun.samples` 9). Item 111 (c) multiplies the term by the climate row's `sunlight` cell (V11 §3.17.1: 1 in temperate and
cold rows, item 102 as filed). Because the bands' value widths are cut per town by land shares and the thinnest bands can
be narrower than the mean, the guard is a bar, not an argument: T-V11-30 compares `w_sun` 0.02 with 0 under common random
numbers on B-CITY and requires that the term alone move no plot across two bands; *pre-decided fallback* on a failure:
halve `w_sun` once (0.01), then set it to 0.005 and re-run. The class mix's sunlit prestige term `ClassMixRow.sun` (item
102 (d)'s preference among equal prime frontages, read by §4.7 S10b's prime-frontage draw × the climate row's
`sunlight`) is a cell of `roster.classMix`, whose rows home is §10.2 (registry row 27), stated there. The mechanism is the
base's (item 102); these are its rows.

### 3.4 The profile families (`siting.profiles`) — every tag family's and category family's profile

These are the default profiles item 103 (a) gives "by tag": V08 §2.6's `tags` rows map SettlementForge tag words to the
family keys below, its `categories` rows map the catalogue categories and content groups to the category families
(`civic`, `defence`, `entertainment`, and the shared keys); a class names one family and states only its deltas (V11
§3.5); item 104's resolver adds tag deltas on top (V11 §3.13.1). Nuisance levels as `smell 3`; needs soft unless marked
**hard**; law · sacred · status as +, 0, −; `spread N` is the same-kind spacing in metres; coverage is the soft default
a class may override; *gen.* is the template family the compiler gives the family's `generic-<family>` class (V11
§3.13.3). Provenance: `own` for every cell, with the note "general historical knowledge, not corpus-witnessed" on the
nuisance and siting cells (item 104 (f)); `extension: true` throughout (these profiles feed only the families).

| family | emits | sensitive to | needs | clientele | law · sacred · status | competition | coverage | balance | gen. |
|---|---|---|---|---|---|---|---|---|---|
| `civic-authority` (= `civic`) | crowds 1 | smell 2, noise 1, disorder 1 | through, market | institution | + · 0 · + | neutral | — | institution | hall |
| `law-court` | crowds 1 | smell 2, noise 2, disorder 1 | through, market | institution | + · 0 · + | neutral | — | institution | hall |
| `watch` | — | — | road | institution | + · 0 · 0 | spread 250 | district : 1 | everyday | watch-house |
| `garrison` (= `defence`) | noise 2, traffic 1, crowds 1 | — | gate, space, security | institution | + · 0 · 0 | neutral | — | institution | barracks |
| `fortification` | — | — | highGround | institution | + · 0 · 0 | neutral | — | institution | tower |
| `welfare` | crowds 1 | noise 1, disorder 1 | road | institution | 0 · + · − | spread 300 | — | institution | court-institution |
| `healing` | — | smell 2, noise 2, smoke 1 | road | dailyLocal | 0 · 0 · 0 | spread 300 | district : 1 | everyday | shopfront |
| `school` | noise 1, crowds 1 | noise 2, smell 2, disorder 2 | road | townWide | 0 · + · 0 | spread 400 | — | everyday | hall |
| `worship` | crowds 1 | noise 2, smell 2, disorder 2 | road, space | dailyLocal | 0 · + · 0 | spread 300 | parish : 1 per 250 households | institution | church |
| `monastic` | — | noise 2, disorder 2, smell 1 | space, runningWater | institution | 0 · + · 0 | neutral | — | institution | cloister |
| `trade` | traffic 1, crowds 1 | smell 1 | road, market | townWide | 0 · 0 · 0 | cluster (street) | — | specialist | shopfront |
| `market` | crowds 3, noise 2, traffic 2 | — | market (hard) | townWide | 0 · 0 · 0 | neutral | — | wholesale | market-hall |
| `craft` | noise 1 | smoke 1 | road | townWide | 0 · 0 · 0 | cluster (street) | — | specialist | workshop-row |
| `metalwork` | noise 3, smoke 2, fire 2 | — | road | townWide | 0 · 0 · 0 | spread 200 | walk : 600 m | everyday | workshop-yard |
| `leatherwork` | smell 3, water 3 | — | runningWater | townWide | 0 · 0 · − | cluster | — | heavy | works-noxious |
| `textile` | water 2, smell 1, noise 1 | smoke 1 | runningWater | townWide | 0 · 0 · 0 | cluster (street) | — | heavy | works-noxious |
| `timber-yard` | noise 2, traffic 2, fire 1 | — | road, space, riverBank | townWide | 0 · 0 · 0 | cluster | — | heavy | yard |
| `shipyard` | noise 2, traffic 2, smell 1 | — | shore (hard), space | townWide | 0 · 0 · 0 | cluster | — | heavy | landing-yard |
| `farming` | smell 2, traffic 1 | — | fields, road, space | townWide | 0 · 0 · 0 | spread 300 | — | heavy | farm |
| `food` | smell 1, smoke 1, fire 1 | smell 2 | road | dailyLocal | 0 · 0 · 0 | spread 250 | walk : 400 m | everyday | shopfront |
| `food-works` | smell 2, smoke 1, fire 1, water 1 | — | road | townWide | 0 · 0 · 0 | neutral | — | heavy | works-noxious |
| `extraction` | noise 3, traffic 3, smoke 1 | — | deposit (hard), road | townWide | 0 · 0 · 0 | cluster | — | heavy | yard |
| `industry` | noise 2, smoke 2, fire 2, traffic 2 | — | road, runningWater | townWide | 0 · 0 · − | cluster | — | heavy | works-noxious |
| `warehouse` | traffic 3, noise 1 | fire 2 | harbour, gate, road | townWide | 0 · 0 · 0 | cluster | — | wholesale | warehouse |
| `port` | traffic 3, noise 2, crowds 2, smell 1 | — | shore (hard) | travellers | 0 · 0 · 0 | cluster | — | wholesale | landing-yard |
| `finance` | — | smell 2, noise 1, disorder 2 | market, security | elite | + · 0 · + | cluster (street) | — | specialist | shopfront |
| `guild-hall` | crowds 1 | smell 2, noise 1 | road, market | institution | 0 · 0 · + | neutral | — | institution | hall |
| `luxury` | — | smell 3, smoke 2, noise 2, disorder 2 | road, security | elite | 0 · 0 · + | cluster (street) | — | specialist | shopfront |
| `exotic` | crowds 1 | — | space | townWide | 0 · 0 · + | neutral | — | institution | court-institution |
| `arcane` | noise 1, fire 1 | noise 2, crowds 2 | space, secrecy | elite | 0 · 0 · + | neutral | — | specialist | tower |
| `alchemy` | smell 2, fire 2, smoke 1 | — | road | townWide | 0 · 0 · 0 | cluster | — | specialist | workshop-row |
| `planar` | crowds 1, disorder 1 | — | space | townWide | 0 · 0 · 0 | neutral | — | institution | court-institution |
| `infrastructure` | — | — | road | institution | 0 · 0 · 0 | spread 300 | district : 1 | institution | yard |
| `transport` | traffic 3, smell 1, noise 1 | — | gate, through | travellers | 0 · 0 · 0 | neutral | — | wholesale | stable-yard |
| `housing` | — | smell 2, noise 1, smoke 1, water 1, disorder 1 | road | residential | 0 · 0 · 0 | neutral | — | residential | dwelling-row |
| `lodging` | crowds 2, noise 2, disorder 1 | smell 1 | through, gate | travellers | 0 · − · 0 | spread 200 | — | specialist | inn-compound |
| `sanitation` | smell 2 | — | runningWater | institution | 0 · 0 · − | spread 300 | district : 1 | institution | yard |
| `water-supply` | — | water 3, smell 2 | — | dailyLocal | 0 · 0 · 0 | spread 150 | walk : 150 m | everyday | yard |
| `adventuring` | crowds 1, disorder 1, noise 1 | — | gate, road | travellers | 0 · 0 · 0 | cluster | — | specialist | hall |
| `underground` | — | — | secrecy | clandestine | − · 0 · 0 | neutral | — | specialist | workshop-row |
| `information` | — | — | secrecy, market | clandestine | − · 0 · 0 | neutral | — | specialist | shopfront |
| `criminal` | disorder 2 | — | secrecy | clandestine | − · − · 0 | neutral | — | specialist | workshop-row |
| `smuggling` | traffic 1 | — | secrecy, harbour, gate | clandestine | − · 0 · 0 | neutral | — | wholesale | warehouse |
| `entertainment` | crowds 3, noise 3, disorder 2 | — | through | townWide | 0 · − · 0 | cluster | — | specialist | hall |
| `other` | — | smell 1 | road | townWide | 0 · 0 · 0 | neutral | — | specialist | shopfront |

The category families of V08's `categories` rows resolve as: `adventuring` → `adventuring`; `craft` → `craft`;
`criminal` → `criminal`; `defence` → `garrison`; `trade` → `trade`; `entertainment` → `entertainment`; `exotic` →
`exotic`; `civic` → `civic-authority`; `infrastructure` → `infrastructure`; `arcane` → `arcane`; `worship` → `worship`
(aliases are rows with `$extends` and no delta, so each key resolves to one profile). The compiler emits a generic class
only for a non-alias family: `civic` resolves to `generic-civic-authority` and `defence` to `generic-garrison`, which
V08's `categories` rows cite. The table holds 45 profile families (44 authored, plus `food-works`,
which the slaughtering, brewing and fish trades take so that no class both emits and cannot bear smell at level 2 —
J-V11.38): `food` keeps the bakery, the cookshop and the grocer.

**Display words** (J-V11.93, J-V11.95). Each non-alias family row carries a
`label` — plain words for one member, which is also its generic class's label (V11 §3.13.3) and the heading of its group
in T6's stamp palette — and an `icon`, `fam.<family key>` (the family's glyph in V09 §5.1's sprite), which its
classes compile (V11 §2.3); the 45 `icon` cells are written in the change that draws the 45 glyphs into V09 §5.1's
sprite, by that change's seat, and until then no family states one and the palette's groups show their label alone; an
alias row (`civic`, `defence`) has neither and resolves to its target's. Both are `own`,
`calibratable: false`, and never inherited into a class's compiled profile. The labels, unique across the families
(T-V11-4): `civic-authority` civic office; `law-court` court; `watch` watch house; `garrison` garrison post;
`fortification` fortification; `welfare` charitable house; `healing` house of healing; `school` place of learning;
`worship` place of worship; `monastic` religious house; `trade` merchant's shop; `market` market building; `craft` craft
workshop; `metalwork` metalworking shop; `leatherwork` leather workshop; `textile` cloth workshop; `timber-yard` wood yard;
`shipyard` boatbuilding yard; `farming` farm; `food` food shop; `food-works` food works; `extraction` extraction site;
`industry` works; `warehouse` store; `port` port building; `finance` finance house; `guild-hall` guild house; `luxury`
luxury shop; `exotic` exotic site; `arcane` arcane house; `alchemy` alchemy shop; `planar` planar site; `infrastructure`
public works; `transport` transport yard; `housing` dwelling; `lodging` lodging; `sanitation` sanitation works;
`water-supply` water supply; `adventuring` adventurers' house; `underground` hidden workshop; `information` information
den; `criminal` criminal den; `smuggling` smugglers' den; `entertainment` place of entertainment; `other` building.

### 3.5 The class ladder (`roster.classes`) — every town and city class

**3.5.1 Defaults by family and the settings row.** A class row states only what differs from its family's defaults:

| family | liveIn | shopProb | lifestyleBand | priority | outside | drain | underground · undercity | template family |
|---|---|---|---|---|---|---|---|---|
| housing | — (households) | 0 | by class mix | 1 | no | pit | allowed · allowed (squalid, poor) | by class |
| food, trade, craft, luxury, alchemy, healing, information | yes | 0.6 | modest (luxury, finance: prosperous) | 4 | no | pit | never · allowed | shopfront or workshop-row |
| food-works | yes | 0.3 | modest | 5 | no | channel | never · never (the brewery `allowed`, below) | works-noxious (butcher, fishmonger: shopfront) |
| metalwork | yes | 0.3 | modest | 4 | no | pit | never · never | workshop-yard |
| leatherwork, textile, industry | yes | 0.2 | poor | 6 | no | channel | never · never | works-noxious |
| timber-yard, shipyard, extraction, farming | yes | 0 | modest | 6 | extraction, farming: yes | pit | never · never | yard, landing-yard, farm |
| warehouse, port, transport, smuggling | no | 0 | modest | 5 | no | pit | allowed · never | warehouse, stable-yard |
| lodging, entertainment | yes | 0 | modest | 4 | no | pit (bathhouse channel) | allowed · allowed | inn-compound, tavern-row, hall |
| civic-authority, law-court, guild-hall, watch, garrison, fortification, welfare, school, worship, monastic, infrastructure, sanitation, water-supply | no (a warden's household where the template has a dwelling slot) | 0 | prosperous (watch, welfare: modest) | 10 | no | pit (monastic, sanitation: channel) | never · never (worship: allowed for the forbidden rows only) | by class |
| arcane, planar, exotic, adventuring | no | 0 | prosperous | 7 | no | pit | allowed · allowed | by class |
| criminal, underground | yes | 0 | poor | 3 | no | pit | preferred · preferred | by class (a front's, V11 §3.14) |

**Class overrides of the `underground` column** (II.7.3, item 553): `brewery`, `vintner` and `guildhall` take `allowed` (the
cellar workshops of brewers and vintners and the guild vaults S7b (6) names); `warehouse` keeps its family's `allowed`.
Crypts leave the column: a crypt is part of its building's basement (the `crypt` column, V11 §3.5.8), never an
underground allocation.

**The derived and defaulted class columns** (the compiler writes them, step 5a, and lists them in the manifest):
* `tags` = [the class's profile family key, the class id] plus: `notice` on `town_hall`, `market_hall` and `guildhall`
  (the notice posts); `riverbank` on every class of the `textile`, `leatherwork` and `timber-yard` families;
  `church-family` on `cathedral`, `great_temple`, `church`, `chapel`, `monastery`, `generic-worship`, `generic-monastic`
  and V07's `v.parish_church` and `v.chapel` (V06's "church-family use", V04's church count); a class row may add tags
  (`tags +x`). Only the profile family key is a plot-mix family (§4.5 (2)); the class id is an identity-row counter.
* `noxious` = the compiled profile emits `smell`, `smoke` or `water` at level 2 or more (S10a's noxious-first order,
  field pass 2's kernels).
* `cluster` = the class id when the compiled `competition.mode` is `cluster`, else absent (S7b (2)'s sub-districts).
* `max` = unbounded (written as §10.2's sentinel) unless the row states one; a `singular` class is 1.
* `perCapita` = [buildings, per people]: the notation "1/700" is `[1, 700]`; a housing or `dos` class is `[0, 1]`.
* `undergroundAccess.prob` (item 64; per band row poor / modest / prosperous / rich, interpolated along the value): the
  `lodging`, `entertainment`, `warehouse` and `food-works` families and `vintner` 0.15 / 0.2 / 0.25 / 0.3; `housing` 0.02
  at every band (II.7.3's age term raises it); `garrison`, `law-court`, `worship` and `monastic` 0; the `criminal` and
  `underground` families 0.3 at every band, before the concealment multiplier (§10.2's `accessMultiplier`); every other
  family 0.05 — the one statement of these values, which §10.2 and II.7.3 read; `extension`.
* `useRules`: no class states its own by default; V06 §3.9.9's clientele defaults apply (a class row may state one).
* `subLocations` and `openingHours`: empty until `@plat/sim`'s M4b rows (V11 §3.21.4).
* `icon`: the class's profile family's `icon` (V11 §3.4), unless the row states one.
* `commonness` (J-V11.94), for every town-and-city row, the row's **roster share at
  TOWN**: at P, the TOWN row's default target of §1.1's rung table (registry row 1), with no dossier and no pack, the
  class's expected member count n — 0 when a `dos`, `magic` or `req` gate or a `firstAtPopulation` above P binds it, or
  when it is `gov`-forced only (a `gov` cell's `else` count, such as `town_hall`'s "1 @5k", counts); otherwise
  max(`min`, P × b ÷ p) for `perCapita` [b, p], and for `perOther` its factor × the other class's n; for a housing class
  its `roster.classMix` share at the modest band × P ÷ the modest `roster.households` mean size (the cluster structures
  0) — then commonness = n ÷ Σ n over the town-and-city rows, rounded to 0.001, a class with n > 0 never below 0.001.
  The compiler computes it at step 5a from the compiled cells, so a table version that moves a count moves it in the
  same compile; a row may not state it (T-V11-4). A `v.` row's `commonness` is V07 §2.4's rule (the row's roster share at
  VILLAGE, rounded to 0.01, never below 0.01), computed by the compiler at the same step — the one producer of every
  compiled display cell. The two rules give one meaning at each product's rung; the reader compares rows of the
  document's rung only, a village rung's tie going to the `v.` row (V09 §4.16 (3)).

`roster.settings` (one row; `own` unless marked): `rosterMode` `minimiseUnemployment` (FTG's default; `ref:FTG
workplace placement default`; the `matchRatios` value is FTG's alternative), `unemploymentThreshold` 0.08,
`propagation.depth` 3 (§4.2 S2), `placement.extensionWeight` 1 (0 in the parity presets, §4.7 S10b), `detourFactor` 1.3
(§4.7 S10b; provisional, its register entry V11 §8's, measured at M1 by T16-4 with its fallback), `magicGate` the classes marked *magic* below read
`CircumstanceSlice.magic ≠ 'none'` or a dossier arcane power (item 79), `crypt.rankShare` 0.8 (every crypt but the
principal held to at most this share of the principal's area — V03 §3.7.4's trim, V06 §3.18.3; J-V11.35) and
`coverage.rosterWeight` 0.5 (`extension`, 0 in the parity presets).

**The roster's coverage option (item 103 (f)).** Without a dossier count, a class with a coverage row draws its
count at S2's Δ grid point as `round((1 − w) × perCapitaCount + w × coverageCount)`, `w` = `coverage.rosterWeight` —
except at the rungs whose `RungProfile.frameLaw` is `territory`, where it adds no member and a `V` cell is a siting pull
only (V07 §2.4's presence column; J-V7.101; J-V11.73).
`coverageCount` = Σ over the predicted units × `target`, the units predicted from S2's own inputs only: `district` → the
district count `N_d` by §4.5's count law; `walk` → `0.6 × land ÷ (π × per²)` (the stage's built land, m²); `households`
and `parish` → `households ÷ per`; `settlement` → 1. The count is monotone in the virtual population, so it stays
prefix-stable (§10.2's sequential roster), it is never a hard minimum, and with `w` = 0 the roster is byte-identical
(T-V11-13).

**3.5.2 Notation of the class tables.** *roster*: `1/700` one building per 700 people (`perCapita`), `≥1` `min`, `@5k`
`firstAtPopulation`, `×0.3 brewery` `perOther`, `gov` forced by the government row (V11 §3.21.1), `dos` only by a
dossier record, an assignment or a pack (perCapita 0), `magic` gated as above, `req` the site-resource gate (§10.2
`requires`); *dist · σ*: `disp`, `sing`, `def` (§4.5 (3)) and the significance (§4.5 (1); the base's values where it
states them); *profile deltas* on the family (V11 §3.4): `E+`, `S+`, `N+` add, `K` competition, `V` coverage, `band`
lifestyle band; *bal · or · split*: balance (V11 §2.3), orientation when not derived (`src`, `mkt`, `bal`), `split
works+shop` (item 105 (h); threshold 0.6 unless given); *powers · sectors* (weights; §4.5 (6), item 78); *authored rows*
are the class's own `RelationRule`s — the references' rules `extension: false` with their `ref:` provenance where a
reference has them, marked *ext* otherwise — and every class also receives its family-derived rows (V11 §3.3.4).

*family* names the ONE profile family the row inherits (V11 §3.4; T-V11-4 refuses a row without it). *Profile deltas*,
on the family's compiled profile:
* `E+ k n` raises the emission of nuisance k to max(inherited, n); `E k n` sets it to n (0 removes it), the other
  members inherited; `E= k n, …` replaces the whole set with the listed members; `E —` clears the set; `E− k` removes k.
  `S` (sensitive-to) takes the same forms.
* `N+ need` adds a soft need (`N+ need (hard)` a hard one; `(soft w)` its weight); `N need …` sets it; `N —` clears the
  needs; `N− need` removes one.
* `K mode [spacing]` replaces the competition cell (`K spread 150`, `K cluster (street)`); `V unit : target` replaces the
  coverage cell and `V —` removes it; `band b` the lifestyle band; `clientele c`; `alignment axis ±/0`; `tags +t`.
* T-V11-5's rule is V11 §3.3.2's; the competition mode of a `singular` or `district-defining` class is V11 §2.3's rule.

**Default reading rules** (the compiler applies them and lists each in the manifest's `defaultsApplied`):
* an authored soft row with no weight weighs 0.5, and a row with `ref:` provenance 1.0;
* a single distance D on `near`, `nearGate`, `nearMarket`, `nearHarbour`, `nearWater` or `nearCentre` means `withinM` D,
  `beyondM` 3 × D, `falloff` linear; on `far` it means `withinM` D ÷ 2 and `beyondM` D (full satisfaction beyond D);
* a row naming several targets of ONE kind (`near` → barracks, castle) measures to the nearest of them; alternatives of
  two kinds ("`near` → castle 400 or `nearGate` 300") compile to two rows sharing the weight equally;
* a supply edge written "supply `g` D m mode" is `soft`, weight 0.6, `maxDistanceM` D, `substitutes: ['import']`,
  `perConsumers` 8, unless the row marks it `hard`; a `hard` row keeps weight 0 (§10.2);
* `within 0` on a `near` → `landuse:<kind>` row means the plot lies on that land use (the outside classes' seats).

**3.5.3 Housing** (households come from the roster's household rows and the class mix, §10.2, never `perCapita`):

| class | family | use | template | dist · σ | roster | profile deltas | bal | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `hovel` | `housing` | one-room dwelling | hovel | disp · 0.05 | class mix | S —; band squalid | residential | — · — | `near` → `wall` within 30, soft 0.3 *ext* (general: the poorest crowd against the wall) |
| `row_house` | `housing` | terraced house | dwelling-row | disp · 0.15 | class mix | — | residential | — · — | `frontage` any, soft (`ref:NG 1.2.2 attached share`) |
| `cottage` | `housing` | small detached house | dwelling-detached | disp · 0.1 | class mix | — | residential | — · — | — |
| `house` | `housing` | burgess house | dwelling-row (prosperous: dwelling-detached) | disp · 0.2 | class mix | — | residential | — · — | — |
| `town_house` | `housing` | merchant's or master's house | dwelling-compound | disp · 0.5 | class mix | S+ smell 3, disorder 2 | residential | company 0.5, council 0.5 · — | `frontage` through, primary, soft *ext* |
| `manor` | `housing` | great house with court | dwelling-compound | disp · 2 | class mix | S+ smell 3, noise 2; N+ space | residential | lordship · — | `highGround` soft *ext* |
| `tower_house` | `fortification` | fortified elite house | tower | disp · 3 | 1/15 000 @10k, CITY+; prosperous and rich only | S smell 2, noise 1; clientele residential | residential | lordship · — | — |
| `lodging_house` | `lodging` | rooms let by the night or week | lodging-row | disp · 0.3 | 1/1 000 @3k | band poor | everyday | — · — | — |
| `shack`, `tent`, `lean_to_shelter` | `housing` | cluster structures | cluster | disp · 0.05 | the cluster rows (§10.2) | band squalid | residential | — · — | §10.2's cluster rows |

**3.5.4 Food and drink:**

| class | family | use | template | dist · σ | roster | profile deltas | bal · or · split | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `bakery` | `food` | bread oven and shop | shopfront | disp · 0.6 | 1/700, ≥1 | V walk : 400 m | everyday · mkt | guild · crafts | supply `flour` 600 m street hard (§10.2's example) |
| `butcher` | `food-works` | meat | shopfront | disp · 0.6 | 1/900, ≥1 | clientele dailyLocal; V walk : 600 m | everyday · mkt · split works-noxious+shopfront (the slaughterhouse and the stall) | guild · crafts | supply `livestock` 2 000 m road, `salt` 3 000 m road |
| `shambles` | `food-works` | the town's slaughter yard and meat hall | works-noxious | sing · 3 | 1/12 000 @8k | E smell 3, water 3, noise 2; N runningWater (hard) | heavy · src | council · agriculture | `downstream` with `to` `#housing`, beyond 100, soft 1.0 *ext*; `extramural` soft *ext* |
| `cookshop` | `food` | hot food | shopfront | disp · 0.5 | 1/1 500 @3k | E+ fire 2 | everyday · mkt | — · crafts | supply `meat` 600 m street, `bread` 600 m street |
| `alehouse` | `lodging` | ale sold from a house | tavern-row | disp · 0.5 | 1/400, ≥1 | E crowds 1, noise 1, disorder 1; band poor; V households : 1 per 100 | everyday | — · trade | supply `beer` 1 200 m street |
| `tavern` | `lodging` | drink and a room | tavern-row | disp · 1 | 1/900 @1k | E crowds 2, noise 2, disorder 2; K spread 150 | everyday | — · trade | `frontage` through, primary, soft 1.0 *ext* (general: taverns on the through streets); supply `beer` 1 200 m street |
| `brewery` | `food-works` | brewhouse and taphouse | works-noxious | disp · 1.5 | 1/2 500 @2k | E smoke 2; N+ runningWater | heavy · mkt · split works-noxious+tavern-row (the brewhouse and the taphouse) | guild · crafts | supply `malt` 1 000 m street hard, `nearWater` soft (§10.2's example); underground `allowed` (its cellar workshop, item 553) |
| `maltings` | `food-works` | malt house and kiln | works-noxious | disp · 1 | ×0.4 brewery | E smoke 2, fire 2, water 0 | heavy · src | — · agriculture | supply `grain` 3 000 m road (§10.2's example) |
| `granary` | `warehouse` | town grain store | warehouse | disp · 3 | 1/5 000, ≥1 | S+ fire 3, water 2; N+ dryGround (hard) | wholesale · bal | council · agriculture | `nearMarket` 300 soft *ext* |
| `watermill` | `food` | corn mill on a leat | mill | disp · 2 | 1/1 500, req water | E= noise 2, traffic 2; N runningWater (hard) | heavy · src | lordship · agriculture | `nearWater` hard with a fall (§10.2's example; its outside row §4.9) |
| `windmill` | `food` | post mill | mill | disp · 1.5 | 1/1 500 where no watermill site, req farmland | E= noise 1, traffic 1; N highGround (hard) | heavy · src | lordship · agriculture | — (the hard `highGround` need: terrainClass `high`, V07's reading of an exposed site) |
| `fishmonger` | `food-works` | fish stall and store | shopfront | disp · 0.5 | 1/2 000, req fish | clientele dailyLocal | everyday · mkt | — · fishing | supply `fish` 800 m street, `salt` 3 000 m road |
| `vintner` | `trade` | wine merchant and cellar | shopfront | disp · 0.8 | 1/4 000 @3k | band prosperous | specialist · mkt | company · trade | underground `allowed` (its cellar, item 553) |
| `grocer` | `trade` | spices, dried goods, general dealer | shopfront | disp · 0.5 | 1/800 | — | everyday · mkt; V walk : 500 m | — · trade | — |

**3.5.5 Crafts — metal, leather, textile, wood, other:**

| class | family | use | template | dist · σ | roster | profile deltas | bal · or · split | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `smithy` | `metalwork` | general smith | workshop-yard | disp · 1 | 1/800, ≥1 | V walk : 600 m; K spread 200 | everyday · src | guild · crafts | supply `iron` 3 000 m road, `charcoal` 3 000 m road |
| `farrier` | `metalwork` | shoeing and horse-smith | workshop-yard | disp · 0.8 | 1/2 500 @2k | N+ gate; clientele travellers | everyday · bal | guild · crafts | `nearGate` 150 soft *ext*; supply `fodder` 2 500 m road |
| `armourer` | `metalwork` | armour and blades | workshop-yard | disp · 1.5 | 1/6 000 @5k | band prosperous; S+ disorder 1 | specialist · mkt | guild 0.5, military 0.5 · crafts | `near` → barracks, castle within 400, soft *ext* |
| `cutler` | `metalwork` | knives and edge tools | workshop-row | disp · 1 | 1/5 000 @4k | — | specialist · mkt | guild · crafts | — |
| `goldsmith` | `luxury` | gold and silver work | shopfront | disp · 2 | 1/4 000 @4k | band rich | specialist · mkt | guild · crafts | `sameStreet` goldsmith soft *ext* |
| `metalworks` | `metalwork` | specialised metal shops (a street of them) | workshop-row | disp · 1.5 | 1/10 000 @10k | K cluster (street) | specialist | guild · crafts | — |
| `smelter` | `industry` | bloomery and smelting yard | works-noxious | disp · 2 | 1/8 000, req ore | E smoke 3, fire 3 | heavy · src | guild · extraction | `extramural` soft *ext*; supply `ore` 5 000 m road, `charcoal` 5 000 m road |
| `mint` | `finance` | coin striking under guard | hall | sing · 5 | dos, CITY by gov (crown, ecclesiastical) | N+ security (soft 0.8) | institution | council 0.5, lordship 0.5 · finance | `near` → castle, town_hall within 300, soft *ext* |
| `tannery` | `leatherwork` | tanning pits | works-noxious | disp · 1.5 | 1/3 000, ≥1, req water | — | heavy · src | guild · crafts | `downstream` with `to` `#housing`, beyond 100, soft 1.0 (presets MFCG and FTG: hard, `ref:MFCG noxious-ward siting`), `nearWater` hard, `extramural` soft (§10.2's example, item 440); supply `hides` 800 m street, `bark` 2 000 m road |
| `currier` | `leatherwork` | leather dressing | workshop-row | disp · 0.8 | ×0.5 tannery | E smell 1, water 1 | specialist · src | guild · crafts | supply `leather` 400 m street |
| `cobbler` | `craft` | shoes | workshop-row | disp · 0.5 | 1/600 | — | everyday; V walk : 500 m | guild · crafts | supply `leather` 1 500 m street |
| `saddler` | `craft` | saddles and harness | workshop-row | disp · 0.8 | 1/3 000 @2k | N+ gate | specialist · mkt | guild · crafts | supply `leather` 1 500 m street |
| `furrier` | `luxury` | furs | shopfront | disp · 1 | 1/5 000 @4k | E smell 1 | specialist | guild · crafts | supply `pelts` 3 000 m road |
| `weaver` | `textile` | looms | workshop-row | disp · 0.5 | 1/800 | E noise 1; band poor | specialist · src | guild · crafts | supply `wool` 800 m street (spinning was household work; general) |
| `fuller` | `textile` | fulling mill and tenter yard | works-noxious | disp · 1 | 1/4 000, req water | N runningWater (hard) | heavy · src | guild · crafts | `nearWater` hard; supply `cloth` 800 m street |
| `dyer` | `textile` | dye works | works-noxious | disp · 1 | 1/3 000, req water | E water 3, smell 2 | heavy · src | guild · crafts | `nearWater` hard; supply `cloth` 800 m street, `dyestuff` 3 000 m road |
| `tailor` | `craft` | clothes | shopfront | disp · 0.5 | 1/600 | — | everyday; V walk : 500 m | guild · crafts | supply `cloth` 1 500 m street |
| `draper` | `trade` | cloth merchant | shopfront | disp · 1 | 1/2 500 @2k | band prosperous | specialist · mkt | company · trade | supply `cloth` 2 000 m street |
| `ropewalk` | `textile` | rope-making walk | yard | disp · 1 | 1/8 000 @4k, req coast or river | N+ harbour | heavy · src | guild · crafts | `plotShape` hard: depth ≥ 60 m (the walk's physical length); supply `hemp` 3 000 m road |
| `carpenter` | `craft` | carpentry shop and yard | workshop-yard | disp · 0.8 | 1/800 | E noise 2, fire 1 | everyday · src | guild · crafts | supply `planks` 1 500 m street |
| `cooper` | `craft` | casks | workshop-row | disp · 0.8 | 1/1 500 | — | specialist · mkt | guild · crafts | supply `planks` 1 500 m street |
| `wheelwright` | `craft` | carts and wheels | workshop-yard | disp · 0.8 | 1/3 000 @2k | N+ gate | specialist · bal | guild · crafts | `nearGate` 200 soft *ext* |
| `woodcarver` | `craft` | carving and turnery | workshop-row | disp · 0.5 | 1/5 000 @4k | — | specialist | guild · crafts | `near` → church 400 soft *ext* |
| `sawmill` | `timber-yard` | saw pits or a water saw | yard | disp · 1 | 1/6 000, req timber | E noise 3 | heavy · src | guild · extraction | supply `logs` 5 000 m river or road |
| `timber_yard` | `timber-yard` | timber stacks and sawpits | yard | disp · 1 | 1/4 000 | — | heavy · bal | company · extraction | `nearWater` soft *ext* (logs float) |
| `mason_yard` | `craft` | stone yard | yard | disp · 1 | 1/3 000 | E noise 2, traffic 2 | heavy · src | guild · crafts | supply `stone` 5 000 m road, `lime` 3 000 m road |
| `brickworks` | `industry` | clamps and kilns | kiln-yard | disp · 1 | 1/6 000, req clay | E smoke 3, fire 2 | heavy · src | guild · crafts | `extramural` soft *ext* |
| `lime_kiln` | `industry` | lime burning | kiln-yard | disp · 0.8 | 1/8 000 @3k, req stone | E smoke 3, fire 2 | heavy · src | guild · crafts | `extramural` soft *ext* |
| `potter` | `craft` | kiln and shop | kiln-yard | disp · 0.8 | 1/2 500, req clay | E smoke 2, fire 2 | specialist · bal · split kiln-yard+shopfront | guild · crafts | `extramural` soft *ext* |
| `glassworks` | `industry` | glass furnace | kiln-yard | disp · 2 | 1/10 000 @5k, req clay (sand) | E smoke 2, fire 3 | heavy · src | guild · crafts | `extramural` soft *ext* |
| `glassblower` | `luxury` | glass shop | shopfront | disp · 1.2 | 1/8 000 @5k | E fire 1 | specialist · mkt | guild · crafts | supply `glass` 3 000 m road |
| `thatcher` | `craft` | thatch and roofing yard | yard | disp · 0.5 | 1/3 000 | — | everyday | guild · crafts | supply `reed` 3 000 m road |
| `chandler` | `craft` | candles and soap | workshop-row | disp · 0.6 | 1/1 500 | E smell 2, fire 2 | everyday · src | guild · crafts | supply `tallow` 800 m street |
| `bookbinder` | `luxury` | books and binding | shopfront | disp · 1 | 1/8 000 @5k | band prosperous | specialist | guild · crafts | `near` → school, university, cathedral within 500, soft *ext*; supply `parchment` 1 500 m street |
| `printing_house` | `craft` | press | workshop-row | disp · 2 | 1/25 000 @10k | E noise 2 | specialist · mkt | guild · crafts | supply `paper` 2 000 m street |
| `bowyer` | `craft` | bows and arrows | workshop-row | disp · 0.8 | 1/5 000 @3k | — | specialist | guild 0.5, military 0.5 · crafts | — |
| `cartographer` | `luxury` | maps and charts | shopfront | disp · 1 | 1/15 000 @10k | — | specialist | guild · crafts | `near` → harbour 800 soft *ext* |
| `workshop` | `craft` | a craft the table has no row for | workshop-row | disp · 1 | 1/600 | — | specialist | guild · crafts | — |


**3.5.6 Trade, finance, lodging and entertainment:**

| class | family | use | template | dist · σ | roster | profile deltas | bal · or · split | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `market` | `market` | a market square (the reservation; no building) | — (S3 (12), S7b (3)) | sing · 5 (principal), 2 (secondary) | ≥1; @10k 1/12 000; TOWN `secondaryChance` 0.15 (§4.2 S2) | — | wholesale | council · trade | the base's market siting (§4.2 S3 (12)) |
| `market_hall` | `market` | covered market | market-hall | sing · 5 | one per market of rank principal @8k; secondaries @20k | — | wholesale | council · trade | `nearMarket` 60 hard (§10.2's example) |
| `cloth_hall` | `market` | cloth market hall | market-hall | sing · 4 | 1/15 000 @8k where textile classes ≥ 10 | — | wholesale | guild 0.5, company 0.5 · trade | `nearMarket` 150 soft *ext* |
| `shop` | `trade` | general retail | shopfront | disp · 0.5 | 1/500 | V walk : 400 m | everyday · mkt | — · trade | — |
| `merchant_house` | `trade` | counting house and store | dwelling-compound | disp · 2 | 1/1 500 @2k | band prosperous; N+ harbour or gate | wholesale · bal | company · trade | `frontage` through, primary soft *ext* |
| `warehouse` | `warehouse` | goods store | warehouse | disp · 1 | 1/2 000 | — | wholesale · bal | company · trade | `nearHarbour` 150 hard, supply `import` by sea (§10.2's example) — at a port; else `nearGate` 200 soft *ext* |
| `moneylender` | `finance` | loans | shopfront | disp · 1 | 1/4 000 @3k | band modest | specialist | company · finance | — |
| `bank` | `finance` | banking house | hall | disp · 4 | 1/20 000 @10k | — | specialist | company · finance | `nearMarket` 300 soft *ext* |
| `money_changer` | `finance` | exchange table | shopfront | disp · 1 | 1/6 000 @5k | clientele travellers | specialist | company · finance | `nearGate` 200 or `nearHarbour` 200 soft *ext* |
| `pawnshop` | `finance` | pledges | shopfront | disp · 0.5 | 1/5 000 @3k | band poor; S — | everyday | — · finance | — |
| `auction_house` | `market` | auction rooms | hall | sing · 3 | dos; CITY 0.3 @20k | — | wholesale | company · trade | — |
| `assay_office` | `finance` | assay and hallmark | hall | sing · 2 | dos; @10k with goldsmiths ≥ 3 | — | institution | council · finance | `near` → goldsmith 200 soft *ext* |
| `customs_house` | `civic-authority` | customs | hall | sing · 3 | ≥1 at a port or a walled town @5k | N+ harbour or gate | institution | council · taxes | `nearHarbour` 100 hard at a port; else `nearGate` 100 hard |
| `toll_house` | `civic-authority` | toll collection | watch-house | disp · 0.5 | one per main gate and toll bridge @3k (S7's count) | — | institution | council · taxes | `near` → bridge within 30 hard where the settlement has a bridge (a `toll_bridge` record implies one, V11 §3.24.7 (2)), else `nearGate` within 30 hard — tried in that order, one physical need |
| `fair_ground` | `market` | a fair field with booths | — (a `market` reservation, secondary, extramural) | sing · 2 | dos (annual fairs) | — | wholesale | council · trade | `extramural` soft 1.0; `nearGate` 400 soft |
| `slave_market` | `market` | a slave market (a setting's fact) | market-hall | sing · 2 | dos | alignment status −, sacred − | wholesale | company · trade | `nearHarbour` 300 or `nearGate` 300 soft *ext* |
| `inn` | `lodging` | inn with stables | inn-compound | disp · 1.5 | 1/1 500, ≥1 | — | specialist · mkt | — · trade | `frontage` through or primary soft 1.0 (presets MFCG and FTG: hard — §4.7 S10b's reference rows, inns at junctions and gates), `nearGate` 150 soft (§10.2's example, item 440); supply `beer` 1 200 m street, `fodder` 2 500 m road |
| `coaching_inn` | `lodging` | large inn and yard | inn-compound | disp · 2.5 | 1/10 000 @5k | N+ through (soft 1.0), space | specialist | — · trade | `nearGate` 200 soft; supply `fodder` 2 500 m road |
| `caravanserai` | `lodging` | walled court for caravans | inn-compound | disp · 3 | dos; arid biome 1/8 000 | N+ gate, space (hard: its walled court's area) | wholesale | company · trade | `nearGate` 300 soft 0.8 *ext* |
| `bathhouse` | `entertainment` | public baths | bath-house | disp · 1.5 | 1/4 000 @3k, req water | E crowds 1, noise 1, disorder 1; N runningWater; V district : 1 | everyday | council · — | `nearWater` soft *ext* |
| `brothel` | `entertainment` | brothel | tavern-row | disp · 1 | 1/5 000 @3k | alignment sacred −, law 0 | specialist | — · crime 0.3, trade 0.7 | `nearHarbour` 300, `nearGate` 200, `near` → inn 100, soft (§4.5 (3); J-A72.51) |
| `gambling_house` | `entertainment` | dice and cards | tavern-row | disp · 1 | 1/8 000 @5k | alignment law 0, sacred − | specialist | criminal 0.3 · crime 0.3, trade 0.7 | — |
| `theatre` | `entertainment` | playhouse | hall | disp · 3 | dos; 1/40 000 @20k | — | specialist | council · — | `frontage` through, primary soft |
| `arena` | `entertainment` | arena or colosseum | arena | sing · 10 | dos | N+ space (hard) | institution | council · — | `extramural` soft *ext* |
| `fighting_pit` | `entertainment` | fighting pit | tavern-row | disp · 1 | dos; 1/30 000 @10k | alignment law − | specialist | criminal · crime | — |
| `opera_house` | `entertainment` | opera house | hall | sing · 6 | dos | band rich | institution | company · — | `nearMarket` 400 soft |
| `college` | `school` | bardic or trade college | court-institution | disp · 4 | dos | — | institution | guild · — | — |

**3.5.7 Civic, legal, military and fortification** (the seats the government forces are V11 §3.21.1's):

| class | family | use | template | dist · σ | roster | profile deltas | bal | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `town_hall` | `civic-authority` | council house | hall | sing · 5 | gov (commune, oligarchy); else 1 @5k | N+ — ; tags +notice | institution | council · taxes | `nearMarket` 100 soft 1.0 *ext* (general: the council house on the market place) |
| `guildhall` | `guild-hall` | a guild's hall | hall | disp · 5 | 1/3 000 @2k (commune ×1.5) | tags +notice | institution | guild · crafts | — (a guildhall placed for a GUILD or COUNT record carries a `near` row to that record's member class through §7.7's `PlacementCriteria`, written by the port: within 300, beyond 900, soft 0.3, id `pc/…`; an unrecorded guildhall has no trade row); underground `allowed` (guild vaults, item 553) |
| `courthouse` | `law-court` | court of law | hall | sing · 4 | 1/20 000 @5k | — | institution | council · taxes | `near` → town_hall, castle within 300, soft *ext* |
| `prison` | `law-court` | gaol | court-institution | sing · 2 | 1/25 000 @5k | E disorder 1; S — | institution | council · — | `near` → courthouse 300 soft *ext*; `far` → `open:square` beyond 150, soft *ext* |
| `workhouse` | `welfare` | poor relief with work | court-institution | disp · 1 | dos; @20k 1/40 000 | — | institution | council · — | — |
| `archive` | `civic-authority` | records house | hall | sing · 2 | dos; CITY 0.5 | — | institution | council · — | `near` → town_hall 200 soft |
| `palace` | `civic-authority` | royal or princely palace | castle | sing · 30 | gov (crown) | N+ space (hard), highGround | institution | lordship · — | the castle's reservation rules (§4.2 S3); on an institution island, V05's island siting applies and the ground rows do not (V05 §3.5) |
| `castle` | `fortification` | castle | castle | sing · 20 | gov (seigneurial, crown), the castle toggle | — | institution | lordship · military | §4.2 S3's castle siting (`ref:MFCG castle compactness gate`) |
| `barracks` | `garrison` | barracks | barracks | disp · 3 | gov: CITY and above | — | institution | military · military | `near` → castle 400 or `nearGate` 300 soft (§10.2); supply `fodder` 2 500 m road |
| `guard_post` | `watch` | watch post | watch-house | disp · 0.5 | gov: per 1 000 inhabitants (V11 §3.21.1) | — | everyday | military · military | `nearGate` 100 soft; `nearMarket` 200 soft |
| `armoury` | `garrison` | arms store | warehouse | sing · 2 | dos; @10k with a castle or barracks | S+ fire 3 | institution | military · military | `near` → barracks, castle within 200, soft |
| `mercenary_hall` | `garrison` | free company's hall | hall | disp · 2 | dos | clientele travellers; alignment law 0 | specialist | military · military | `nearGate` 300 soft |
| `training_yard` | `garrison` | training or gladiators' school | court-institution | disp · 2 | dos | E noise 2, crowds 1 | institution | military · military | — |
| `watchtower` | `fortification` | lookout tower | tower | disp · 1 | dos; a mole slot's draw (V11 §3.24.4); at village rungs `v.watchtower` plays it (V11 §3.22) | — | institution | military · military | `highGround` soft 0.5 *ext* (general: a lookout on the highest ground); on a slot, none |
| `fort` | `fortification` | a small fort (a harbour mouth, a mole head, a bridge) | fort | sing · 6 | dos; a landmark slot's draw (V11 §3.24.4) | N+ security | institution | military · military | on its slot, none; else `highGround` soft 0.5, `nearHarbour` 200 soft 0.5 *ext* |

**3.5.8 Religious, charitable, learning and health:**

| class | family | use | template | dist · σ | roster | profile deltas | bal | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `cathedral` | `worship` | cathedral and close | cathedral | sing · 30 | gov (ecclesiastical); else 1 @10k | N+ space (hard); V — | institution | religion · religion | S3's precinct (§4.2 S3); `nearMarket` 300 soft; on an institution island, V05's island siting applies and the ground rows do not (V05 §3.5) |
| `great_temple` | `worship` | a non-default religion's great temple | cathedral | sing · 30 | by `ReligionRow.greatTempleClass` | N+ space (hard); V — | institution | religion · religion | as cathedral |
| `church` | `worship` | parish church | church | disp · 8 | 1/1 500, ≥1 (MFCG spawns several) | V parish : 1 per 250 households | institution | religion · religion | churchyard ≥ 30 % of the yard (§4.9) |
| `chapel` | `worship` | chapel (hospital, guild or bridge chapel) | chapel | disp · 3 | 1/4 000 @3k | — | everyday | religion · religion | — |
| `monastery` | `monastic` | abbey, priory or friary | cloister | disp · 6 | 1/6 000 @3k | — | institution | religion · religion | `near` → `wallInner` within 200, soft 0.3 *ext* (general: friaries settled at the town's edge) |
| `almshouse` | `welfare` | almshouse | court-institution | disp · 1.5 | 1/5 000 @3k | — | institution | religion 0.5, guild 0.5 · religion | — |
| `hospital` | `welfare` | hospital (sick and travellers) | court-institution | disp · 4 | 1/10 000 @5k | N+ runningWater, gate | institution | religion · religion | `nearGate` 300 soft *ext* (hospitals of the road) |
| `foundling_home` | `welfare` | foundling home | court-institution | disp · 1.5 | dos | — | institution | religion · religion | — |
| `cemetery` | `worship` | burial ground beyond the churchyards | burial-ground (V11 §3.6.1) | disp · 2 | @20k 1/40 000 | N+ space (hard); V — | institution | religion · religion | `extramural` soft *ext*; `dry` hard (a burial ground's physical need) |
| `school` | `school` | grammar or song school | hall | disp · 2 | 1/5 000 @3k | — | everyday | religion 0.5, council 0.5 · — | `near` → church, cathedral within 300, soft *ext* |
| `university` | `school` | university and colleges | court-institution | sing · 15 | dos; CITY 0.3 @20k | N+ space | institution | religion 0.5, council 0.5 · — | — |
| `library` | `school` | great library | hall | sing · 6 | dos | — | institution | council · — | — |
| `scriptorium` | `school` | copying house | workshop-row | disp · 1 | ×1 cathedral, ×0.5 monastery | — | specialist | religion · religion | `near` → cathedral, monastery, university 300 soft (V11 §3.8) |
| `apothecary` | `healing` | medicines | shopfront | disp · 1 | 1/2 000 @1.5k | — | everyday · mkt | guild · crafts | supply `herbs` 3 000 m road; V district : 1 (item 107 (f)) |
| `herbalist` | `healing` | herbs and remedies | shopfront | disp · 0.5 | 1/3 000 | band poor | everyday · src | — · crafts | — |
| `barber_surgeon` | `healing` | barber and surgeon | shopfront | disp · 0.6 | 1/1 500 | — | everyday | guild · crafts | — |
| `physician` | `healing` | physician's house | dwelling-compound | disp · 1 | 1/5 000 @4k | clientele elite; band prosperous | specialist | guild · — | — |
| `healer` | `healing` | healer or midwife | dwelling-row | disp · 0.5 | 1/2 500 | band poor | everyday | — · — | — |

**The crypt column (item 109 (k) (2), J111).** "CHURCHES GET CRYPTS: the cathedral always has a crypt, the largest crypt
in the settlement, and every other church may have one". The column's meanings are V11 §2.3's; the rows (own, `general` —
crypts under the east ends of cathedrals and great churches, and undercrofts under some parish, guild and castle chapels;
provisional, each with its V12 §3.11 register entry):

| class | crypt | cellar prob = the crypt chance, poor / modest / prosperous / rich | cryptM2, poor / modest / prosperous / rich |
|---|---|---|---|
| `cathedral` | always | — (the no-refusal crypt ladder: full, half, raised) | 400 / 450 / 550 / 700 |
| `great_temple` | always | — (the ladder) | 300 / 350 / 420 / 500 |
| `monastery` (its church) | basement | 0.3 / 0.4 / 0.5 / 0.6 | 60 / 90 / 120 / 160 |
| `church` | basement | 0.1 / 0.2 / 0.3 / 0.45 | 30 / 45 / 65 / 90 |
| `chapel` | basement | 0.03 / 0.05 / 0.08 / 0.1 | 15 / 20 / 25 / 30 |
| `generic-worship`, `generic-monastic` (item 104's generic classes) | basement | the chapel's | the chapel's |
| every other class (`cemetery`, `druid_grove` and `forbidden_cult` included) | never | — | — |

* The cellar row of a `basement` class sets `kinds` full 1, half 0, walk-out 0 where §2.6 allows; a crawl space holds no
  crypt. The cellar probability IS the crypt chance: one draw on §2.6's basement stream gives one answer (J-V11.33).
* A dossier crypt record bound to a building (DR32), or a custom institution whose name or description matches the
  `crypt` keyword (V11 §3.13.2), makes its building `always` with the chapel's `cryptM2` unless its class states more.
* The wet-ground gate (§2.6's terrain gate, `roster.basementGate`) binds `basement` classes only, so "a church on wet
  ground has no crypt" holds for church, chapel and monastery; an `always` class never loses its crypt to it (the ladder
  applies; on an institution island V05's rim-slab vault, V05 §3.10 (5)).
* **The largest.** Compile bar T-V11-25: every `always` class's smallest `cryptM2` exceeds every `basement` class's largest
  `cryptM2` (300 > 160), so the cathedral's crypt is the settlement's largest by construction — a crypt's ring is never
  scaled by the interior ladder's `sizeFactor` (V03's `'ring'` rows), and a SIZE step's `sizeFactor` (V11 §3.12)
  multiplies `cryptM2` like the footprint budget, only the cathedral's step (`great_cathedral`) touching a crypted class; `crypt.rankShare` 0.8 (V11 §3.5.1) is V03's runtime backstop. The tables editor clamps a
  `cryptM2` edit that would break the bar and says so in one line (item 101 R2).
* **Village rows.** V07 §2.4's village classes (keyed `v.<id>`, V11 §2.9) carry their own crypt and cellar cells
  (J-V7.64): they are the rows the village rungs read (J-V7.41) — separate keys, never a shadow of the town `church` or
  `chapel` row — and `v.parish_church` counts as a church for V11 §3.23.8's catacomb count.

**3.5.9 Water, sanitation, infrastructure, harbour and transport** (wells, pumps, fountains and troughs are pins placed
by §4.7's furniture step with V07's and §4.9's rows, not classes):

| class | family | use | template | dist · σ | roster | profile deltas | bal | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `conduit_house` | `water-supply` | cistern house, conduit head, or an aqueduct's terminal cistern | yard | disp · 1.5 | @10k 1/15 000; dos (aqueduct) | V district : 1 | institution | council · — | `highGround` soft; the one member bound to an aqueduct's cistern terminal takes the generator's criteria row `pc/aqueduct/…` (V11 §3.24.7 (1)) |
| `latrine` | `sanitation` | common privy | yard | disp · 0.3 | 1/5 000 @5k | N runningWater (hard) | institution | council · — | `nearWater` hard; `downstream` with `to` `#housing`, beyond 100, soft 0.5 |
| `harbour_master` | `port` | harbour office | hall | sing · 2 | ≥1 at a port | — | institution | council · trade | `nearHarbour` 60 hard |
| `lighthouse` | `infrastructure` | lighthouse | tower | sing · 4 | dos; a landmark slot's draw at a sea port (V11 §3.24.4) | V — | institution | council · trade | on its slot, none; else `nearWater` → a shore, within 30, hard (a light stands at the water) |
| `shipyard` | `shipyard` | slipways and sheds | landing-yard | disp · 3 | 1/15 000 @5k at a port | — | heavy · src | company · trade | supply `timber` 5 000 m river or sea |
| `boatyard` | `shipyard` | river boatyard | landing-yard | disp · 1 | 1/6 000, req river | — | heavy | guild · trade | `nearWater` hard |
| `ferry_landing` | `transport` | ferry stage | landing-yard | disp · 0.5 | one per river crossing without a bridge | N shore (hard) | wholesale | council · taxes | `nearWater` hard at the crossing |
| `fish_landing` | `port` | fish landing and racks | landing-yard | disp · 0.8 | 1/3 000, req fish | E smell 2 | heavy · src | guild · fishing | `nearWater` hard |
| `ship_chandlery` | `trade` | ships' stores | shopfront | disp · 0.8 | 1/5 000 at a port | N harbour | wholesale | company · trade | `nearHarbour` 200 soft (V11 §3.8) |
| `livery_stable` | `transport` | stables and hire | stable-yard | disp · 0.8 | 1/3 000 | — | wholesale | — · trade | `nearGate` 200 soft; supply `fodder` 2 500 m road |
| `post_station` | `transport` | post and relay | stable-yard | disp · 1 | 1/10 000 @5k | — | institution | council · — | `frontage` through hard (the post road runs past it); supply `fodder` 2 500 m road |
| `carrier_yard` | `transport` | carriers and carts | stable-yard | disp · 1 | 1/5 000 @3k | — | wholesale | guild · trade | `nearGate` 150 soft; supply `fodder` 2 500 m road |

**3.5.10 Outside (hinterland) classes** (`outside: true`, placed by the hinterland unit's S10b on S12a's sites, §4.9):

| class | family | use | template | dist · σ | roster | profile deltas | bal · or | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `farmstead` | `farming` | farm | farm | disp · 0.5 | §4.9's farm table | — | heavy · src | lordship · agriculture | §4.9's seeding rows |
| `quarry` | `extraction` | quarry | extractive | disp · 1 | req stone; ×1 per mason demand | N deposit stone | heavy · src | guild · extraction | §4.9's seeding rows |
| `mine` | `extraction` | mine | extractive | disp · 2 | req ore | N deposit ore | heavy · src | lordship · extraction | §4.9 |
| `lumber_camp` | `extraction` | wood cutting | extractive | disp · 0.5 | §4.9's timber rows | N woodEdge | heavy · src | — · extraction | §4.9 |
| `charcoal_burner` | `extraction` | charcoal hearths | extractive | disp · 0.3 | ×0.5 smelter + §4.9's fuel rows | E smoke 3, fire 2; N woodEdge | heavy · src | — · extraction | `far` → `#housing` beyond 200, soft 0.8 (V07's row) |
| `fishery` | `farming` | fish weirs, ponds, boats | landing-yard | disp · 0.5 | req fish | N shore | heavy · src | — · fishing | §4.9 |
| `salt_works` | `extraction` | salt pans and boiling house | extractive | disp · 1 | req coast (saltpan land use) | E smoke 2 | heavy · src | company · extraction | `near` → `landuse:saltpan` within 0, hard (it works its pans) |
| `claypit` | `extraction` | clay digging | extractive | disp · 0.3 | req clay | — | heavy · src | — · extraction | §4.9 |
| `apiary` | `farming` | bee garden | farm | disp · 0.2 | 1/4 000 | E — | heavy · src | — · agriculture | `near` → `landuse:orchard`, `landuse:meadow` within 0, beyond 200, soft 0.5 |
| `sheepfold` | `farming` | sheepfold and shepherd's hut | farm | disp · 0.2 | §4.9's pasture rows | — | heavy · src | — · agriculture | `near` → `landuse:pasture` within 0, hard |
| `vineyard_house` | `farming` | press house | farm | disp · 0.5 | on vineyard land use | — | heavy · src | lordship · agriculture | `near` → `landuse:vineyard` within 0, hard |
| `hunting_lodge` | `farming` | lodge | farm | disp · 1 | dos | N woodEdge | institution | lordship · — | — |
| `peat_works` | `extraction` | peat cutting and drying | extractive | disp · 0.2 | on marsh land use | — | heavy · src | — · extraction | `near` → `landuse:marsh` within 0, hard |
| `druid_grove` | `worship` | sacred grove | — (a grove `Decoration` with a shrine pin) | sing · 3 | dos, magic | V — | institution | religion · religion | `near` → `landuse:wildwood`, `landuse:reserve` within 0, hard (a grove stands in its wood) |

**3.5.11 Arcane, exotic and adventuring** (every row *magic*-gated unless marked; all `extension`):

| class | family | use | template | dist · σ | roster | profile deltas | bal | powers · sectors | authored rows |
|---|---|---|---|---|---|---|---|---|---|
| `mage_tower` | `arcane` | a wizard's tower | tower | disp · 6 | 1/20 000 @10k | K spread 400 | specialist | arcane · magic | — |
| `mages_guild` | `arcane` | mages' guild hall | hall | sing · 6 | CITY 0.5 | — | institution | arcane · magic | — |
| `academy_of_magic` | `arcane` | academy | court-institution | sing · 12 | dos | — | institution | arcane · magic | — |
| `alchemist` | `alchemy` | alchemist's shop | workshop-row | disp · 1 | 1/8 000 @3k | — | specialist · src | arcane · magic | supply `reagents` 3 000 m road |
| `enchanter` | `arcane` | enchanter's shop | shopfront | disp · 1.5 | 1/15 000 @5k | clientele elite | specialist | arcane · magic | — |
| `scroll_scribe` | `arcane` | scroll scribe | shopfront | disp · 1 | 1/15 000 @5k | — | specialist | arcane · magic | `near` → mage_tower, mages_guild within 400, soft |
| `hedge_wizard` | `arcane` | a wise one's house | dwelling-row | disp · 0.5 | 1/6 000 (low magic ×2) | clientele dailyLocal; band poor | everyday | arcane · magic | — |
| `teleport_circle` | `planar` | a warded circle | court-institution | sing · 4 | dos | N space | institution | arcane · magic | `near` → `open:square`, castle within 300, soft |
| `airship_dock` | `transport` | mooring mast and yard | tower | sing · 5 | dos (high magic) | N highGround, space (hard) | wholesale | company · trade | `far` → `#housing` 60 soft |
| `planar_embassy` | `planar` | embassy of another plane | court-institution | sing · 6 | dos | — | institution | arcane · magic | — |
| `dream_parlour` | `entertainment` | dream parlour | tavern-row | disp · 1 | dos | E= crowds 1, noise 1; S noise 2, crowds 2 | specialist | arcane · magic | — |
| `golem_works` | `industry` | golem workshop | works-noxious | disp · 2 | dos | E noise 3 | heavy | arcane · magic | — |
| `necro_works` | `industry` | undead labour yard | works-noxious | disp · 2 | dos | E smell 2, disorder 1; alignment sacred − | heavy | arcane · magic | `far` → `#worship` 300 soft |
| `dragon_roost` | `exotic` | a resident dragon's roost | tower | sing · 10 | dos | E crowds 1, fire 3; N highGround | institution | — · — | `far` → `#housing` 150 soft |
| `adventurers_hall` | `adventuring` | adventurers' guild or charter hall | hall | disp · 2 | dos (not magic-gated) | — | specialist | company · — | `nearGate` 300 soft |
| `hireling_hall` | `adventuring` | hiring hall | hall | disp · 1 | dos (not magic-gated) | — | specialist | — · — | `nearGate` 300 soft |
| `beast_yard` | `adventuring` | beast trainers | stable-yard | disp · 1 | dos (not magic-gated) | E smell 2, noise 2 | specialist | — · — | `extramural` soft |
| `fortune_teller` | `entertainment` | fortune teller's booth | shopfront | disp · 0.3 | dos (not magic-gated) | alignment sacred − | everyday | — · — | `nearMarket` 200 soft |
| `outfitter` | `adventuring` | delvers' outfitter | shopfront | disp · 1 | dos (not magic-gated) | — | specialist | company · trade | `nearGate` 200 soft |
| `sage_house` | `school` | sage | dwelling-compound | disp · 1 | dos (not magic-gated) | — | specialist | — · — | `near` → library or university 400 soft |

**3.5.12 Clandestine classes** (`concealment` rows and fronts: V11 §3.14; family `criminal`, `smuggling`, `information`
or `underground`; roster `dos` except three default rows so the siting tension shows in a one-click town (J-V11.9; `extension`, 0 in the
parity presets): `thieves_den` 1/10 000 @5k, `fences_hall` 1/8 000 @5k, `smugglers_store` 1/10 000 at a port — the
rest come from the dossier's criminal kinds, a pack, an assignment, or the staged crime term (`PortRows.crime`); `underground` and `undercity` `preferred`; powers `criminal`; sector `crime`):
`thieves_den`, `assassins_house`, `smugglers_store` (family smuggling), `forbidden_cult` (family worship with alignment
sacred −, law −), `black_market` (family market with law −; E crowds 2), `spy_ring` (family information),
`fences_hall` (family trade with law −), `kidnap_den`, `trafficking_den` (family smuggling), `gang_hideout`,
`info_broker` (family information; the rookery and the whisper market), `outlaw_camp` (hinterland; family criminal;
`far` → `gate` beyond 400, soft). Each is `disp · 1` (the black market and the thieves' guild's seat `sing · 3`).

**3.5.13 The sky classes** `sky_landing` and `sky_landing_top`: the rows encoding V05 §2.4's facts — family
`transport`, template `yard` (ground) and `landing-yard` (island), `sing · 1`, positioned, E traffic 2, noise 1,
clientele townWide, alignment neutral (a `guarded` landing law +), no coverage, `extension`. `sky_landing` carries the
`front` cell V05 §2.2 names: a
secret access's ground landing is fronted by item 63's `front` mode through a cover row (V11 §3.14.2: `warehouse` 2,
`livery_stable` 1 at every band).

**3.5.14 Village classes and generic classes.** The village classes are V07 §2.4's rows (cited, not restated; compiled by
the same rules — V11 §3.2.1 step 6 runs T-V11-3, -4, -5, -7 and -25 over them), keyed `v.<id>` (V11 §2.9); where a village
class and a town class share a function the town class's `villageForm` names it (V11 §3.22). The compiler adds one
`generic-<family>` class per non-alias profile family (V11 §3.13.3). Count: 181 authored town and city classes (167 table
rows, `fort` and `lighthouse` among them, the two further cluster structures and the twelve clandestine classes) + 45
generic classes + V05's 2 + V07's village classes. Every class row names its family (the `family` column).

**3.5.15 Display words** (item 516; J-V11.93). The
`label` and `synonyms` cells (V11 §2.3) of every authored town-and-city row and of V05's two sky rows, one row each
(`own`, `calibratable: false`; general English; a synonym list is case-folded when compiled, "—" is `[]`). `icon` and
`commonness` are compiled (V11 §3.5.1); the `v.` rows' words are V07 §2.4's and the generic rows' the compiler's (V11
§3.13.3). A row added later — by this volume or a pack's `rosterPatch` (§10.4) — carries its own `label`, which T-V11-4
requires. Only `mill` is shared (the two mills), settled by `commonness`.

| § | class | `label` | `synonyms` |
|---|---|---|---|
| 3.5.3 | `hovel` | hovel | hut |
| 3.5.3 | `row_house` | row house | terraced house, terrace house |
| 3.5.3 | `cottage` | cottage | cot |
| 3.5.3 | `house` | house | dwelling, home |
| 3.5.3 | `town_house` | town house | townhouse, mansion |
| 3.5.3 | `manor` | manor house | manor, great house |
| 3.5.3 | `tower_house` | tower house | peel tower, fortified house |
| 3.5.3 | `lodging_house` | lodging house | boarding house, rooming house, lodgings |
| 3.5.3 | `shack` | shack | shanty |
| 3.5.3 | `tent` | tent | — |
| 3.5.3 | `lean_to_shelter` | lean-to | lean to, shelter |
| 3.5.4 | `bakery` | bakery | baker, bakehouse |
| 3.5.4 | `butcher` | butcher's shop | butcher, butchery |
| 3.5.4 | `shambles` | shambles | slaughterhouse, abattoir, meat hall, slaughter yard |
| 3.5.4 | `cookshop` | cookshop | cook shop, pie shop, eating house |
| 3.5.4 | `alehouse` | alehouse | ale house, pub, public house |
| 3.5.4 | `tavern` | tavern | taproom, bar |
| 3.5.4 | `brewery` | brewery | brewhouse, brewer |
| 3.5.4 | `maltings` | maltings | malt house, malthouse, maltster |
| 3.5.4 | `granary` | granary | grain store, corn store |
| 3.5.4 | `watermill` | watermill | water mill, mill, corn mill |
| 3.5.4 | `windmill` | windmill | wind mill, mill, post mill |
| 3.5.4 | `fishmonger` | fishmonger's shop | fishmonger, fish shop, fish stall |
| 3.5.4 | `vintner` | wine merchant | vintner, wine shop, wine cellar |
| 3.5.4 | `grocer` | grocer's shop | grocer, grocery, spicer, general store |
| 3.5.5 | `smithy` | smithy | blacksmith, smith, forge |
| 3.5.5 | `farrier` | farrier's forge | farrier, horse smith, shoeing smith |
| 3.5.5 | `armourer` | armourer's workshop | armourer, armorer, weaponsmith, bladesmith |
| 3.5.5 | `cutler` | cutler's shop | cutler, knife maker |
| 3.5.5 | `goldsmith` | goldsmith's shop | goldsmith, silversmith, jeweller, jeweler |
| 3.5.5 | `metalworks` | metalworkers' row | metalworker, pewterer, tinsmith, locksmith |
| 3.5.5 | `smelter` | smelting works | smelter, bloomery, foundry |
| 3.5.5 | `mint` | mint | coin mint |
| 3.5.5 | `tannery` | tannery | tanner, tanyard, tan yard |
| 3.5.5 | `currier` | currier's workshop | currier, leather dresser |
| 3.5.5 | `cobbler` | cobbler's shop | cobbler, shoemaker, cordwainer |
| 3.5.5 | `saddler` | saddler's shop | saddler, saddlery, harness maker |
| 3.5.5 | `furrier` | furrier's shop | furrier, fur shop, skinner |
| 3.5.5 | `weaver` | weaver's workshop | weaver, weaving shed, loom house |
| 3.5.5 | `fuller` | fulling mill | fuller, tucker, tenter yard |
| 3.5.5 | `dyer` | dye works | dyer, dyehouse, dye house |
| 3.5.5 | `tailor` | tailor's shop | tailor, seamstress, dressmaker |
| 3.5.5 | `draper` | draper's shop | draper, cloth merchant, mercer |
| 3.5.5 | `ropewalk` | ropewalk | rope walk, ropemaker, roper |
| 3.5.5 | `carpenter` | carpenter's yard | carpenter, joiner, joinery |
| 3.5.5 | `cooper` | cooper's workshop | cooper, cooperage, barrel maker |
| 3.5.5 | `wheelwright` | wheelwright's yard | wheelwright, cartwright |
| 3.5.5 | `woodcarver` | woodcarver's workshop | woodcarver, carver, turner |
| 3.5.5 | `sawmill` | sawmill | saw mill, sawpit, sawyer |
| 3.5.5 | `timber_yard` | timber yard | lumber yard, woodyard |
| 3.5.5 | `mason_yard` | mason's yard | mason, stonemason, stoneyard, stone yard |
| 3.5.5 | `brickworks` | brickworks | brickyard, brick kiln, brickmaker |
| 3.5.5 | `lime_kiln` | lime kiln | limekiln, lime burner |
| 3.5.5 | `potter` | pottery | potter, potter's workshop |
| 3.5.5 | `glassworks` | glassworks | glass furnace, glasshouse |
| 3.5.5 | `glassblower` | glassblower's shop | glassblower, glass shop |
| 3.5.5 | `thatcher` | thatcher's yard | thatcher, roofer |
| 3.5.5 | `chandler` | chandler's shop | chandler, candlemaker, soap maker, soapmaker |
| 3.5.5 | `bookbinder` | bookbinder's shop | bookbinder, bookseller, stationer |
| 3.5.5 | `printing_house` | printing house | printer, print shop, press |
| 3.5.5 | `bowyer` | bowyer's workshop | bowyer, fletcher, bowmaker |
| 3.5.5 | `cartographer` | cartographer's shop | cartographer, mapmaker, map shop |
| 3.5.5 | `workshop` | workshop | craftsman, artisan |
| 3.5.6 | `market` | market | marketplace, market square |
| 3.5.6 | `market_hall` | market hall | covered market, market house |
| 3.5.6 | `cloth_hall` | cloth hall | cloth market, wool hall |
| 3.5.6 | `shop` | shop | store, retailer |
| 3.5.6 | `merchant_house` | merchant's house | merchant, counting house, trading house |
| 3.5.6 | `warehouse` | warehouse | storehouse, store house, depot |
| 3.5.6 | `moneylender` | moneylender | money lender, usurer, loan shop |
| 3.5.6 | `bank` | bank | banking house, banker |
| 3.5.6 | `money_changer` | money changer | moneychanger, changer, exchange |
| 3.5.6 | `pawnshop` | pawnshop | pawnbroker, pawn shop |
| 3.5.6 | `auction_house` | auction house | auction rooms, auctioneer |
| 3.5.6 | `assay_office` | assay office | assayer, assay house |
| 3.5.6 | `customs_house` | customs house | custom house, customs |
| 3.5.6 | `toll_house` | toll house | tollhouse, toll booth, tollbooth |
| 3.5.6 | `fair_ground` | fairground | fair, fair field, fairfield |
| 3.5.6 | `slave_market` | slave market | — |
| 3.5.6 | `inn` | inn | hostelry, guesthouse, guest house |
| 3.5.6 | `coaching_inn` | coaching inn | posting inn |
| 3.5.6 | `caravanserai` | caravanserai | caravansary, khan |
| 3.5.6 | `bathhouse` | bathhouse | baths, bath house, public baths |
| 3.5.6 | `brothel` | brothel | bordello, stews, pleasure house |
| 3.5.6 | `gambling_house` | gambling house | gambling den, gaming house, casino |
| 3.5.6 | `theatre` | theatre | theater, playhouse |
| 3.5.6 | `arena` | arena | colosseum, amphitheatre, amphitheater |
| 3.5.6 | `fighting_pit` | fighting pit | fight pit, pit fights, cockpit |
| 3.5.6 | `opera_house` | opera house | opera |
| 3.5.6 | `college` | college | bardic college |
| 3.5.7 | `town_hall` | town hall | townhall, city hall, council house, moot hall |
| 3.5.7 | `guildhall` | guildhall | guild hall |
| 3.5.7 | `courthouse` | courthouse | court, court house, law court |
| 3.5.7 | `prison` | prison | gaol, jail, lockup |
| 3.5.7 | `workhouse` | workhouse | poorhouse |
| 3.5.7 | `archive` | archive | record office, records house |
| 3.5.7 | `palace` | palace | royal palace |
| 3.5.7 | `castle` | castle | keep, citadel, stronghold |
| 3.5.7 | `barracks` | barracks | garrison |
| 3.5.7 | `guard_post` | guard post | guardhouse, guard house, watch house, watchhouse |
| 3.5.7 | `armoury` | armoury | armory, arsenal |
| 3.5.7 | `mercenary_hall` | mercenary hall | mercenaries, free company |
| 3.5.7 | `training_yard` | training yard | drill yard, training ground, gladiator school |
| 3.5.7 | `watchtower` | watchtower | watch tower, lookout, lookout tower |
| 3.5.7 | `fort` | fort | fortlet, blockhouse, redoubt |
| 3.5.8 | `cathedral` | cathedral | minster |
| 3.5.8 | `great_temple` | great temple | grand temple |
| 3.5.8 | `church` | church | parish church, kirk |
| 3.5.8 | `chapel` | chapel | chantry |
| 3.5.8 | `monastery` | monastery | abbey, priory, friary, convent, nunnery |
| 3.5.8 | `almshouse` | almshouse | alms house, almshouses |
| 3.5.8 | `hospital` | hospital | infirmary, hospice, spital |
| 3.5.8 | `foundling_home` | foundling home | orphanage, foundling hospital |
| 3.5.8 | `cemetery` | cemetery | graveyard, burial ground, necropolis |
| 3.5.8 | `school` | school | grammar school, song school, schoolhouse |
| 3.5.8 | `university` | university | studium |
| 3.5.8 | `library` | library | great library |
| 3.5.8 | `scriptorium` | scriptorium | copying house, scribes |
| 3.5.8 | `apothecary` | apothecary | chemist, druggist, pharmacy |
| 3.5.8 | `herbalist` | herbalist | herb shop, herb seller |
| 3.5.8 | `barber_surgeon` | barber-surgeon | barber surgeon, barber, surgeon |
| 3.5.8 | `physician` | physician's house | physician, doctor, leech |
| 3.5.8 | `healer` | healer's house | healer, midwife, wise woman |
| 3.5.9 | `conduit_house` | conduit house | cistern, cistern house, conduit head, water house |
| 3.5.9 | `latrine` | latrine | privy, public privy, necessary house |
| 3.5.9 | `harbour_master` | harbourmaster's office | harbourmaster, harbour master, harbor master, harbour office |
| 3.5.9 | `lighthouse` | lighthouse | light tower, beacon |
| 3.5.9 | `shipyard` | shipyard | dockyard, shipwright, slipway |
| 3.5.9 | `boatyard` | boatyard | boatbuilder, boat builder |
| 3.5.9 | `ferry_landing` | ferry landing | ferry, ferry stage |
| 3.5.9 | `fish_landing` | fish landing | fish quay, fish wharf |
| 3.5.9 | `ship_chandlery` | ship chandlery | ship chandler, ships' stores |
| 3.5.9 | `livery_stable` | livery stable | stables, stable, livery |
| 3.5.9 | `post_station` | post station | posting house, post house, relay station |
| 3.5.9 | `carrier_yard` | carrier's yard | carrier, carter, haulier, wagoner |
| 3.5.10 | `farmstead` | farmstead | farm, farmhouse, grange |
| 3.5.10 | `quarry` | quarry | stone pit |
| 3.5.10 | `mine` | mine | mine shaft, mineworks |
| 3.5.10 | `lumber_camp` | lumber camp | logging camp, woodcutter, woodcutters |
| 3.5.10 | `charcoal_burner` | charcoal burners' camp | charcoal burner, collier, charcoal |
| 3.5.10 | `fishery` | fishery | fish weir, fishpond, fish pond |
| 3.5.10 | `salt_works` | salt works | saltworks, salt pans, saltern |
| 3.5.10 | `claypit` | clay pit | claypit, clay digging |
| 3.5.10 | `apiary` | apiary | bee garden, beehives, bee yard |
| 3.5.10 | `sheepfold` | sheepfold | fold, sheep pen, shepherd's hut |
| 3.5.10 | `vineyard_house` | press house | winepress, vineyard, vineyard house |
| 3.5.10 | `hunting_lodge` | hunting lodge | lodge |
| 3.5.10 | `peat_works` | peat cutting | peat works, turbary, peat bog |
| 3.5.10 | `druid_grove` | sacred grove | druid grove, grove, druids |
| 3.5.11 | `mage_tower` | mage's tower | mage tower, wizard's tower, wizard tower |
| 3.5.11 | `mages_guild` | mages' guild | mages guild, wizards' guild, wizards guild |
| 3.5.11 | `academy_of_magic` | academy of magic | magic academy, arcane academy, wizard school |
| 3.5.11 | `alchemist` | alchemist's shop | alchemist, alchemy |
| 3.5.11 | `enchanter` | enchanter's shop | enchanter, enchantments |
| 3.5.11 | `scroll_scribe` | scroll scribe's shop | scroll scribe, scroll shop, scribe |
| 3.5.11 | `hedge_wizard` | wise one's house | hedge wizard, hedge witch, cunning woman, cunning man |
| 3.5.11 | `teleport_circle` | teleport circle | teleportation circle, portal, warded circle |
| 3.5.11 | `airship_dock` | airship dock | airship mooring, sky dock, mooring mast |
| 3.5.11 | `planar_embassy` | planar embassy | embassy |
| 3.5.11 | `dream_parlour` | dream parlour | dream parlor, dream den |
| 3.5.11 | `golem_works` | golem works | golemworks, golem workshop |
| 3.5.11 | `necro_works` | undead labour yard | necromancer's yard, necro works, undead labor yard |
| 3.5.11 | `dragon_roost` | dragon's roost | dragon roost, dragon's lair, dragon lair |
| 3.5.11 | `adventurers_hall` | adventurers' hall | adventurers guild, adventurers' guild, charter hall |
| 3.5.11 | `hireling_hall` | hiring hall | hireling hall, hirelings |
| 3.5.11 | `beast_yard` | beast yard | menagerie, beast trainer, kennels |
| 3.5.11 | `fortune_teller` | fortune teller's booth | fortune teller, seer, soothsayer |
| 3.5.11 | `outfitter` | outfitter | delvers' outfitter, adventuring supplies |
| 3.5.11 | `sage_house` | sage's house | sage, scholar |
| 3.5.12 | `thieves_den` | thieves' den | thieves guild, thieves' guild, den of thieves |
| 3.5.12 | `assassins_house` | assassins' house | assassins guild, assassins' guild |
| 3.5.12 | `smugglers_store` | smugglers' store | smugglers, smuggling den, contraband store |
| 3.5.12 | `forbidden_cult` | cult house | cult, forbidden cult, secret temple |
| 3.5.12 | `black_market` | black market | thieves' market |
| 3.5.12 | `spy_ring` | spy house | spies, spy ring, safe house |
| 3.5.12 | `fences_hall` | fence's hall | fence, fences, receiver |
| 3.5.12 | `kidnap_den` | kidnappers' den | kidnappers, kidnap den |
| 3.5.12 | `trafficking_den` | traffickers' den | traffickers, trafficking den |
| 3.5.12 | `gang_hideout` | gang hideout | hideout, gang house |
| 3.5.12 | `info_broker` | information broker | info broker, whisper market, rookery |
| 3.5.12 | `outlaw_camp` | outlaw camp | outlaws, bandit camp, bandits |
| 3.5.13 | `sky_landing` | sky landing (ground) | — |
| 3.5.13 | `sky_landing_top` | sky landing (island) | — |

### 3.6 Designation templates, the compatibility table and heights

**3.6.1 Template families (authoring source; V11 §2.8 `TemplateFamilyRow`).** A class's `template: DesignationTemplateRow[]`
(§10.2) is compiled from its template family, one compiled row per band of the band set: the four authored columns are
the poor, modest, prosperous and rich rows (§4.5's four-row tables: `squalid` reads the poor row, `comfortable` the
interpolation), continuous columns interpolated along the value, discrete columns switching at the cut (§4.7 S11). A
class may override any cell. Areas in m², floors as ranges, coverage as the built share of the plot. The columns §10.2
declares and this table omits take these defaults: `densityShift` 0; `jitter` §4.7 S11's values; `separation`
`party_wall` for row, `slot` otherwise; `households` `{built: 1, max: 1}` for a single dwelling slot, the interior
ladder's capacity for `row` dwellings (§2.6); `entrances` §10.2's owner default; `cellar` item 29 (b)'s class rows
(prob 0.3 poor → 0.7 rich for dwellings, 0.8 for inns, taverns, vintners, merchants' houses and warehouses, 0.1 for
workshops, 0 for clusters and tents) and, for the religious families, the crypt chances of V11 §3.5.8 (`church` and
`chapel` families: the class's cellar row, kinds full 1; `cloister`: the monastery's row; `cathedral`: 1, full, the
`always` ladder; `burial-ground`: 0); `works` the class default Works row (§4.11).

**Derivation rules** (the compiler, step 5; own): `footprintM2` = [0.7, 1, 1.45] × the authored p50 (the ratios
V02's M10 slot band reads as its fixed `sizeBandLo` and `sizeBandHi`, V02 §3.5); `plotAreaM2` = [0.8, 1.25] × the authored plot area; each structure's
`footprintShare` and `houses` from the role table (V11 §3.6.5), the required main slot taking 1 − Σ(the others' shares),
all shares normalised to sum to at most 1 (a structure's count range multiplies its share at the drawn count); the
`yard` list from the yard-parts table below; the columns §10.2 declares and this table omits as listed above.

| family | arrangement | structures (role × count; `*` required) | frontage p / m / pr / r | floors p / m / pr / r | footprint p50 p / m / pr / r | plot area p / m / pr / r | coverage p → r | bounds p / m / pr / r | replaceability p → r |
|---|---|---|---|---|---|---|---|---|---|
| `dwelling-row` | row | house* 1 | none | 1–2 / 2 / 2–3 / 3 | 30 / 45 / 70 / 95 | 60 / 90 / 150 / 220 | 0.55 → 0.45 | wall rear / fence / fence / wall | immediate → long |
| `dwelling-detached` | detached | house* 1, shed 0–1 | none | 1 / 1–2 / 2 / 2–3 | 35 / 50 / 80 / 110 | 150 / 250 / 400 / 600 | 0.25 → 0.2 | hedge / fence / railing / railing | short → long |
| `dwelling-compound` | compound | hall* 1, kitchen 0–1, stable 0–1, store 0–2, dwelling (staff) 0–1 | wall / gate / gate / gate | 2 / 2 / 2–3 / 3 | 90 / 120 / 180 / 260 | 400 / 600 / 1 000 / 1 800 | 0.35 → 0.3 | fence / fence / wall *ext* / wall *ext* | long → ruin_only |
| `hovel` | hovel | hut* 1 | none | 1 | 16 / 20 / — / — | 60 / 80 / — / — | 0.2 | none / hedge | immediate |
| `cluster` | cluster | §10.2's cluster rows | none | 1 | cluster rows | whole plot | cluster rows | none | immediate |
| `lodging-row` | row | house* 1 | none | 2 / 2–3 / 3 / 3 | 45 / 60 / 80 / 90 | 70 / 100 / 140 / 160 | 0.6 → 0.5 | wall rear | short → long |
| `shopfront` | row | shop-house* 1, store 0–1 | lean_to / stall / shopfront / arcade | 1–2 / 2 / 2–3 / 3 | 30 / 45 / 70 / 100 | 60 / 90 / 150 / 220 | 0.6 → 0.5 | wall rear / fence / fence / wall | short → long |
| `workshop-row` | row | shop-house* 1, workshop 0–1, store 0–1 | lean_to / stall / shopfront / shopfront | 1–2 / 2 / 2 / 2–3 | 35 / 50 / 70 / 90 | 70 / 110 / 170 / 240 | 0.55 → 0.45 | wall rear / fence / fence / wall | short → long |
| `workshop-yard` | compound | house* 1, forge or workshop* 1, yard (open) 1, store 0–1, journeymen 0–1 | lean_to / stall / shopfront / shopfront | 1 / 1–2 / 2 / 2–3 | 30 / 50 / 80 / 120 | 100 / 180 / 300 / 450 | 0.35 → 0.3 | fence / fence / wall / wall | short → long |
| `works-noxious` | compound | works* 1, house 0–1, sheds 1–3, pits or vats (yard parts) | gate | 1 / 1–2 / 2 / 2 | 60 / 90 / 140 / 200 | 300 / 500 / 800 / 1 200 | 0.35 → 0.3 | fence / fence / wall / wall | short → long |
| `yard` | compound | shed* 1, stacks (yard parts), office 0–1 | gate | 1 | 40 / 60 / 90 / 120 | 400 / 700 / 1 000 / 1 400 | 0.15 → 0.15 | fence / fence / wall / wall | immediate → short |
| `kiln-yard` | compound | kiln* 1–2, shed 1, house 0–1 | gate | 1 | 30 / 45 / 70 / 90 | 300 / 450 / 700 / 1 000 | 0.2 | fence / fence / wall / wall | short |
| `warehouse` | row | store* 1, office 0–1, yard 0–1 | gate | 2 / 2–3 / 3 / 3–4 | 120 / 180 / 260 / 360 | 200 / 300 / 450 / 650 | 0.7 → 0.6 | wall | long |
| `market-hall` | institution | hall* 1 (open arcaded ground storey) | arcade | 2 | 250 / 350 / 500 / 700 | the claim's | — | none | ruin_only |
| `hall` | institution | hall* 1, annex 0–2 | gate / gate / shopfront / arcade | 2 / 2 / 2–3 / 3 | 150 / 220 / 320 / 450 | 300 / 450 / 700 / 1 000 | 0.5 → 0.45 | wall | long → ruin_only |
| `inn-compound` | compound | inn* 1, stable* 1, brewhouse 0–1, store 0–1 | gate | 2 / 2 / 2–3 / 3 | 100 / 150 / 220 / 300 | 500 / 700 / 1 000 / 1 400 | 0.4 → 0.35 | wall | long |
| `tavern-row` | row | house* 1, cellar store 0–1 | none / stall / shopfront / shopfront | 2 / 2 / 2–3 / 3 | 45 / 60 / 85 / 110 | 80 / 110 / 160 / 220 | 0.6 → 0.5 | wall rear | short → long |
| `bath-house` | compound | bath hall* 1, furnace 1, house 0–1 | gate | 1–2 | 120 / 160 / 220 / 300 | 300 / 400 / 550 / 700 | 0.5 | wall | long |
| `church` | institution | nave* 1, tower 0–1, porch 0–1 | wall (churchyard) | tower storeys 3–5 | 250 / 350 / 500 / 650 | the claim's (churchyard ≥ 30 %) | — | churchyard wall | ruin_only |
| `chapel` | institution | nave* 1 | wall | 1 | 60 / 80 / 110 / 150 | 150 / 200 / 300 / 400 | 0.4 | wall | ruin_only |
| `cathedral` | institution | nave and choir* 1, towers 1–2, chapter house 0–1, cloister 0–1, close houses 2–6 | wall (close) | tower storeys 5–8 | the claim's (§4.2 S3) | the claim's | — | close wall | ruin_only |
| `cloister` | institution | church* 1, cloister ring* 1, ranges 2–3, gatehouse 1, barns 0–2 | wall | 2 | the claim's | the claim's | — | precinct wall | ruin_only |
| `burial-ground` | institution | mortuary chapel 0–1 (chance 0.3 / 0.5 / 0.7 / 0.9 by band), charnel house 0–1 (required on a `burial_grounds_and_charnel_house` record), gatehouse or lychgate 0–1 | wall | 1 | 40 / 60 / 80 / 100 | 1 500 / 2 500 / 4 000 / 6 000 | 0.03 | wall | ruin_only |
| `court-institution` | institution | main range* 1, ranges 1–3 around a court, chapel 0–1 | wall | 2 | 200 / 300 / 450 / 600 | 600 / 900 / 1 400 / 2 000 | 0.4 | wall | long → ruin_only |
| `barracks` | compound | block* 1–2, yard (parade) 1, stable 0–1, armoury 0–1 | gate | 2 | 300 / 350 / 400 / 450 | 1 200 / 1 400 / 1 600 / 1 800 | 0.35 | wall | long |
| `watch-house` | detached | post* 1 | none | 1–2 | 25 / 30 / 40 / 50 | 50 / 60 / 80 / 100 | 0.5 | none | short |
| `tower` | detached | tower* 1, annex 0–1 | gate | tower storeys 3 / 3–4 / 4–5 / 5–7 | 40 / 50 / 70 / 100 | 150 / 200 / 300 / 450 | 0.3 | wall | ruin_only |
| `fort` | compound | tower* 1–2, gate 1, range (barracks) 0–1 | gate | 2 | 150 / 200 / 300 / 450 | 300 / 500 / 800 / 1 200 | 0.4 | wall | ruin_only |
| `arena` | institution | stands* 1 (an oval ring; main share 1), gate 2–4 laid inside the stands' massing (V02's `absorbed`, attach `main`) | gate | 2 / 2–3 / 3 / 3 | the claim's (V02's `arena` row `claimShare`) | 2 500 / 4 000 / 6 000 / 9 000 (own; the historical amphitheatres' hulls) | — | wall | ruin_only |
| `castle` | institution | §4.2 S3's castle and bailey; a palace's ranges around courts | gate | — | the claim's | the claim's | — | curtain | ruin_only |
| `farm` | compound | farmhouse* 1, barn* 1, byre 0–1, sheds 1–2 | gate | 1 / 1–2 / 2 / 2 | 60 / 80 / 120 / 160 | outside plot | 0.1 | hedge / hedge / wall / wall | short → long |
| `mill` | compound | mill house* 1, wheel or sails* 1, store 0–1 | gate | 2–3 | 60 / 80 / 100 / 120 | 250 / 350 / 450 / 600 | 0.3 | fence | long |
| `extractive` | compound | works shed* 1, spoil (yard part), hut 0–2 | none | 1 | 20 / 30 / 45 / 60 | outside plot | 0.05 | none | immediate |
| `landing-yard` | compound | sheds* 1–3, slip or stage (yard part), store 0–1 | gate | 1–2 | 60 / 100 / 160 / 240 | 400 / 700 / 1 200 / 2 000 | 0.25 | fence | short → long |
| `stable-yard` | compound | stable* 1, house 0–1, store 0–1 | gate | 1–2 | 60 / 90 / 130 / 180 | 300 / 450 / 650 / 900 | 0.35 | wall | short → long |

**Yard parts by family** (`yard`; shares of the plot's open ground; own; the `churchyard` part of a church or cathedral
plot and the `burial` part of a cloister or burial ground are burial faces — V04 §3.5.1 (1) (a) and (d) read them by these
two names — and never the church building):

| family | yard parts (share) |
|---|---|
| `dwelling-row`, `dwelling-detached`, `lodging-row`, `hovel` | garden 0.6, midden 0.1 |
| `dwelling-compound` | court 0.4, garden 0.3 (prosperous and rich: formal_garden 0.2 of it) |
| `shopfront`, `workshop-row`, `tavern-row` | yard 0.4, midden 0.1 |
| `workshop-yard` | work yard 0.5, midden 0.1 |
| `works-noxious` | pits 0.3, yard 0.3 |
| `farm` | court 0.3, garden 0.2, pen 0.2 |
| `inn-compound` | court 0.5, garden 0.2 |
| `church` | churchyard 0.3 (§4.9's row: at least 30 % of the plot's open ground), court 0.1 |
| `cloister` | garth 0.2, garden 0.3, burial 0.15 |
| `cathedral` | close 0.4, churchyard 0.15 (§4.9's churchyard row on the cathedral plot) |
| `burial-ground` | burial 0.9 |
| `fort` | court 0.6 |
| `arena` | floor 0.9 (the arena floor inside the stands) |
| every other family | court 0.4 |

**The `manor` override** (class `manor`; V02 §3.10.3's `manor` composition rows are measured against these values,
J-V2.35): prosperous footprint p50 420 m², plot 2 000 m²; rich footprint p50 650 m², plot 3 000 m²; structures
hall* (main, share ≥ 0.6), kitchen 1, stable 1–2, store 1–3, chapel 0–1, gatehouse 0–1, staff dwelling 1–2, arranged
around a court (court 0.4 of the open ground); the poor and modest rows are the `dwelling-compound` family's. The "giant
manor to small hovel" range is then 16 m² to 650 m² of footprint (J-V11.39).

Every family's `underSize` is `compact` except `church`, `cathedral`, `cloister`, `castle`, `market-hall`, `fort` and
`arena` (`refuse`: a claim that cannot be joined is reported, never squeezed); `programme` is the class id (V03's
programme rows keyed by class and band); `heights` is the family key (V11 §3.6.4), except `fort`, which reads `tower`, and
`arena`, which reads `hall`. Every family's crypt is `never` unless V11 §3.5.8 says otherwise. The template families
number 35. The `arena` family's oval composition is V02's `ovalCourt` family (V02 §3.3) through V02's `arena` row (V02
§3.10.2), whose `slotBand` reads this table's `arena` plot row and its own `claimShare` (V02 §3.5). Provenance: the band
structure is `ref:FTG lifestyle banded pools` and `ref:MFCG ward-type sizes` (§4.7 S11's emulated banding); every value is `own`, calibratable, and the
dwelling and shop areas are the targets the granularity table's plot areas are fitted to at M1 (§4.7 S10; §13.5).

**3.6.2 Specialisations by band** (the discrete `specialisation` cell: the variant's name, which the description and the
room programme read; a class without a row here has one specialisation equal to its id; the culture-keyed stepped
specialisations of item 110 (c) are V11 §3.24.3's rows, drawn once per use and replacing the band's for that use):

| class | poor | modest | prosperous | rich |
|---|---|---|---|---|
| `smithy` | nail-maker's lean-to forge | general smithy with a yard | smith with a shop front | master smith with journeymen's rooms |
| `bakery` | oven-house | baker's shop | baker with a front shop | master baker with a bakehouse court |
| `tavern` | drink shop | tavern | tavern with rooms | wine tavern |
| `inn` | hostelry | inn | inn with a court | great inn |
| `tailor` | patcher | tailor | tailor with a shop | robe-maker |
| `apothecary` | herb seller | apothecary | apothecary with a still-room | physician's apothecary |
| `merchant_house` | — | chapman's house | merchant's house | merchant's hall |
| `shop` | stall-house | shop | shop with a counter front | fine shop |
| `church` | chapel-of-ease church | parish church | parish church with an aisle | great parish church |
| `house` | — | burgess house | burgess house with a hall | burgess house with a court |

**3.6.3 The compatibility table** (`mutator.compat`, §4.7 S11's step 1; `own`; `tolerance` 0.25 unless given):

| from | to | fate |
|---|---|---|
| house, shop-house, hall | house, shop-house, hall, inn, bath hall, main range | keep (within tolerance), else adapt |
| shop-house | workshop, forge | convert |
| workshop | forge, works, store, kiln | convert |
| forge | workshop | convert |
| stable | store, shed, workshop | convert |
| store, shed | stable, workshop, store | convert |
| barn | store, stable, works shed | convert |
| hut | house (hovel → cottage) | adapt |
| any | yard part | subtract unless the target lists it |
| tower | tower | keep |

**3.6.4 Heights** (`heights`; `own`; storey heights in integer cm; roof pitch as rise over half-span; `attic`,
`parapetCm` and `towerStoreyCm` are item 427's columns, their values written here once and their reading rule V02
§3.10.6's):

| key | ground storey | upper storey | roof pitch | tower storeys | tower storey cm | spire factor | attic | parapet cm |
|---|---|---|---|---|---|---|---|---|
| `dwelling-row`, `lodging-row`, `shopfront`, `workshop-row`, `tavern-row` | 300 | 260 | 1.0 | — | — | — | yes | 0 |
| `dwelling-detached` | 260 | 240 | 1.0 | — | — | — | yes | 0 |
| `hovel`, `cluster` | 260 | 240 | hovel 1.2; cluster: tent roof | — | — | — | no | 0 |
| `dwelling-compound`, `hall`, `court-institution`, `market-hall` | 380 | 320 | 0.9 | — | — | — | yes | 0 |
| `workshop-yard`, `stable-yard`, `farm`, `mill` | 350 | 280 | 0.8 | — | — | — | yes | 0 |
| `works-noxious`, `yard`, `kiln-yard`, `extractive`, `landing-yard` | 350 | 280 | 0.8 | — | — | — | no | 0 |
| `warehouse` | 350 | 300 | 0.7 | — | — | — | yes | 0 |
| `inn-compound` | 330 | 280 | 0.9 | — | — | — | yes | 0 |
| `bath-house` | 330 | 280 | 0.9 | — | — | — | no | 0 |
| `church`, `chapel` | nave 900 | — | 1.1 | 3–5 | 450 | 0.8 | no | 0 |
| `cathedral`, `cloister` | nave 2 000 | — | 1.1 | 5–8 | 600 | 1.0 | no | 0 |
| `burial-ground` | 300 | — | 1.1 | — | — | — | no | 0 |
| `barracks` | 330 | 300 | 0.7 | — | — | — | yes | 0 |
| `watch-house` | 330 | 300 | 0.7 | — | — | — | no | 0 |
| `tower`, `castle` | 400 | 350 | 0.6 (cone roofs by style) | by template | — | — | no | 60 |
| `stepped-shrine` (the shrine on a stepped temple's top tier; V11 §3.24.3, J-V11.43) | 450 | 350 | 1.0 | — | — | — | no | 0 |

**3.6.5 The role table** (`RoleRow`, compiled into every `DesignationTemplateRow.structures` entry; own; the role ids
are the structure names the template families use, and V02's `composition.roleKeys` maps each to its composition key,
V02 §3.10.4 — so V02's and V03's role vocabularies are reached without renaming):

| role | footprintShare | houses | role | footprintShare | houses |
|---|---|---|---|---|---|
| house, hut, shop-house | main | yes | kitchen | 0.15 | no |
| hall (dwelling-compound, manor) | main | yes | hall (institutions), main range, block, nave, nave and choir, church (cloister), inn, bath hall, market hall | main | no |
| staff dwelling (`dwelling (staff)`) | 0.15 | yes | journeymen | 0.15 | yes |
| farmhouse, mill house | main | yes | barn, barns (each) | 0.3 | no |
| stable | 0.2 | no | byre | 0.2 | no |
| store, cellar store | 0.15 (cellar store 0: below ground) | no | kiln | 0.25 | no |
| workshop | 0.25 | no | forge | 0.2 | no |
| works, works shed | main | no | shed, sheds (each) | 0.1 | no |
| office | 0.1 | no | annex | 0.2 | no |
| tower, towers (each) | 0.15 | no | porch | 0.05 | no |
| gatehouse, lychgate | 0.08 | no | ranges (each), range | 0.2 | no |
| cloister ring | 0.25 | no | chapter house | 0.12 | no |
| close houses (each) | 0.06 | yes | chapel (in a compound) | 0.12 | no |
| brewhouse | 0.2 | no | furnace | 0.1 | no |
| armoury | 0.15 | no | wheel or sails | 0.05 | no |
| post (watch-house) | main | no | mortuary chapel | main when present, else 0.6 of the built share | no |
| charnel house | 0.3 | no | gate (a fort's gate, each; an arena's gates are laid inside the stands, share 0) | 0.08 | no |
| stands (the arena's oval ring) | main (share 1) | no | range (barracks) | 0.2 | yes |

`main` is the required main slot's 1 − Σ(others). A live-in class's main slot houses its household whatever this column
holds (§10.2's `houses` rule). A template family whose structure names a role absent from this table fails T-V11-7.

### 3.7 The goods table, orientation and the supply web's settings (items 105, 107)

**3.7.1 The goods** (`roster.resources`; `own`, calibratable; `comfortM` and `maxDistanceM` in metres along the edge's
mode; levels 0–3; `site` for kind `site` goods names SettlementForge's resource kind and our land use or deposit, item 104
(b) — a hinterland face of that land use, or that deposit, is a provider of the good (item 288); `demand` is V11 §2.5's
reverse-pull target; the table holds no yarn: spinning is household work, and the weaver takes wool, general):

| good | kind | bulk | perish. | value | comfortM | maxDistanceM | modes | security | site | demand |
|---|---|---|---|---|---|---|---|---|---|---|
| `grain` | site | 3 | 0 | 1 | 1 500 | 5 000 | river, road, street | 0 | land · arable | classes |
| `flour` | made | 2 | 1 | 1 | 400 | 1 500 | street | 0 | — | classes |
| `malt` | made | 2 | 1 | 1 | 600 | 2 000 | street, road | 0 | — | classes |
| `bread` | made | 1 | 3 | 1 | 150 | 600 | street | 0 | — | households |
| `beer` | made | 3 | 2 | 1 | 300 | 1 200 | street | 0 | — | households |
| `livestock` | site | 3 | 1 | 2 | 1 000 | 5 000 | road | 0 | land · pasture | classes |
| `meat` | made | 2 | 3 | 2 | 200 | 800 | street | 0 | — | households |
| `hides` | made | 2 | 2 | 1 | 400 | 1 500 | street | 0 | — | classes |
| `tallow` | made | 1 | 1 | 1 | 400 | 1 500 | street | 0 | — | classes |
| `leather` | made | 1 | 0 | 2 | 600 | 2 500 | street | 0 | — | classes |
| `pelts` | site | 1 | 1 | 2 | 1 500 | 6 000 | road | 1 | land · wildwood | classes |
| `bark` | site | 2 | 0 | 0 | 1 000 | 4 000 | road, river | 0 | land · wildwood, coppice | classes |
| `wool` | site | 1 | 0 | 1 | 1 000 | 5 000 | road | 0 | land · pasture | classes |
| `cloth` | made | 1 | 0 | 2 | 800 | 3 000 | street, road | 1 | — | market |
| `dyestuff` | site | 1 | 0 | 2 | 1 500 | 6 000 | road, sea | 0 | land · arable (woad, madder) or import | classes |
| `hemp` | site | 2 | 0 | 1 | 1 000 | 4 000 | road, river | 0 | land · arable | classes |
| `rope` | made | 2 | 0 | 1 | 600 | 2 000 | street | 0 | — | classes |
| `logs` | site | 3 | 0 | 1 | 1 500 | 6 000 | river, road | 0 | land · lumber | classes |
| `timber` | made | 3 | 0 | 1 | 800 | 4 000 | river, road, street | 0 | — | classes |
| `planks` | made | 2 | 0 | 1 | 600 | 2 000 | street | 0 | — | classes |
| `firewood` | site | 3 | 0 | 0 | 800 | 3 000 | road, street | 0 | land · coppice | households |
| `charcoal` | made | 2 | 0 | 1 | 1 000 | 5 000 | road | 0 | — | classes |
| `reed` | site | 2 | 0 | 0 | 1 000 | 3 000 | road, river | 0 | land · marsh | classes |
| `stone` | site | 3 | 0 | 1 | 1 000 | 6 000 | river, road | 0 | subterranean · quarry | classes |
| `lime` | made | 3 | 0 | 1 | 800 | 3 000 | road | 0 | — | classes |
| `clay` | site | 3 | 0 | 0 | 600 | 2 500 | road | 0 | land · claypit | classes |
| `bricks` | made | 3 | 0 | 1 | 800 | 3 000 | road, river | 0 | — | market |
| `pottery` | made | 2 | 0 | 1 | 600 | 2 000 | street | 0 | — | market |
| `glass` | made | 2 | 0 | 2 | 800 | 3 000 | street, road | 1 | — | classes |
| `ore` | site | 3 | 0 | 1 | 1 500 | 8 000 | road, river | 0 | subterranean · mine | classes |
| `iron` | made | 3 | 0 | 2 | 1 000 | 5 000 | road, street | 0 | — | classes |
| `tools` | made | 1 | 0 | 2 | 800 | 3 000 | street | 0 | — | market |
| `arms` | made | 1 | 0 | 3 | 800 | 3 000 | street | 2 | — | market |
| `silver` | site | 0 | 0 | 3 | 1 500 | 8 000 | road | 3 | subterranean · mine | classes |
| `jewellery` | made | 0 | 0 | 3 | 600 | 3 000 | street | 3 | — | market |
| `fish` | site | 2 | 3 | 1 | 200 | 800 | street, river, sea | 0 | water · fishery | households |
| `salt` | site | 2 | 0 | 1 | 1 000 | 6 000 | road, sea, river | 0 | water · saltpan | households |
| `milk` | site | 2 | 3 | 1 | 200 | 1 000 | street | 0 | land · pasture | households |
| `wine` | import | 2 | 0 | 2 | 800 | 4 000 | river, sea, road | 1 | land · vineyard, or import | market |
| `herbs` | site | 0 | 1 | 1 | 800 | 3 000 | street, road | 0 | land · meadow, garden | classes |
| `medicines` | made | 0 | 1 | 2 | 400 | 1 500 | street | 1 | — | households |
| `candles` | made | 1 | 0 | 1 | 400 | 1 500 | street | 0 | — | households |
| `parchment` | made | 0 | 0 | 2 | 800 | 3 000 | street | 0 | — | classes |
| `paper` | import | 0 | 0 | 2 | 800 | 3 000 | street, road | 0 | import | classes |
| `books` | made | 0 | 0 | 3 | 600 | 3 000 | street | 2 | — | market |
| `fodder` | site | 3 | 1 | 0 | 600 | 2 500 | road, street | 0 | land · meadow | classes |
| `reagents` | site | 0 | 1 | 3 | 1 000 | 5 000 | road | 2 | special · deposit | classes |
| `import` | import | 2 | 0 | 2 | 300 | 3 000 | sea, river, road | 1 | — (the gate or quay facing the partner) | classes |
| `luxuries` | import | 0 | 0 | 3 | 600 | 4 000 | sea, road | 3 | — | market |
| `coin` | made | 0 | 0 | 3 | 400 | 2 000 | street | 3 | — | market |

*Display words* (item 516; J-V11.93): each good's `label` is its key as written
("grain", "firewood", "jewellery"), save `import` "imported goods" and `luxuries` "luxury goods"; no good ships an `icon`
(V11 §3.1's *Display cells*). Readers: V09's link view (V09 §4.7) and its goods legend, the clerk's supply explanations
(V10), `@plat/docs`.

**3.7.2 Produces and supply edges.** Every producing class's `produces` names goods above with shares (item 434's
`producesShare`, default equal), and the land uses provide the `site` goods of V11 §3.7.1 (arable: grain, hemp, dyestuff;
pasture: livestock, wool, milk; meadow: fodder, herbs; garden: herbs (item 111's irrigated garden, V11 §3.17.2);
coppice: firewood, bark; wildwood: pelts, bark; marsh: reed; vineyard: wine; saltpan: salt): farmstead grain 0.6, livestock 0.2, wool 0.1,
milk 0.1; lumber camp logs 0.9, bark 0.1; hunting lodge pelts 0.5, meat 0.5; bowyer arms; watermill and windmill flour;
maltings malt; brewery beer; bakery bread; butcher meat 0.7, hides 0.2, tallow 0.1 (the slaughterhouse's three outputs,
item 105 (c)); shambles meat 0.6, hides 0.3, tallow 0.1; tannery leather; currier leather; chandler candles;
sawmill and timber yard timber 0.5, planks 0.5; charcoal burner charcoal; coppice land (the hinterland's rows)
firewood; quarry stone; lime kiln lime; claypit clay; brickworks bricks; potter pottery; glassworks glass; mine ore (and
silver where the deposit is precious); smelter iron; smithy tools; armourer arms; goldsmith jewellery; fishery and fish
landing fish; salt works salt; weaver cloth; fuller cloth; dyer cloth; ropewalk rope; apothecary medicines; herbalist
herbs; scriptorium parchment, books; printing house books; mint coin; warehouse and merchant house import (as
re-sellers); vineyard house wine; sheepfold wool; apiary candles 0.5 (wax), herbs 0.5. The supply edges are the class
rows' (V11 §3.5; `perConsumers` 8 unless the class row states it; the reading rules of V11 §3.5.2: soft 0.6, `substitutes:
['import']`), plus these edges the class tables leave to this list: `watermill` and `windmill` + `grain` 3 000
m road; `shambles` + `livestock` 3 000 m road; `lime_kiln` + `stone` 2 000 m road; `potter` and `brickworks` + `clay`
2 500 m road; `armourer` and `cutler` + `iron` 3 000 m road; `armoury` + `arms` 3 000 m street; `goldsmith` and `mint` +
`silver` 3 000 m road; `vintner` + `wine` 4 000 m road; `shipyard` + `rope` 2 000 m street (the class rows carry the
rest: tavern, alehouse and inn + beer; cookshop + meat and bread; butcher and fishmonger + salt; smithy + charcoal; mason
yard + lime; bookbinder + parchment; weaver + wool; fuller and dyer + cloth; the stables + fodder). **Totality**
(T-V11-28): every good has at least one producer (a class or a site land use or deposit, or kind `import`) and at least
one consumer (a class's supply edge, or a `demand` other than `classes`); the compile fails otherwise.

**3.7.3 Orientation (item 105 (b)), derived at compile time for a class whose profile states none.** With its inputs
`I` (the supply edges, each weighted by its good's `volume`, default 1 — never by the solver weight, which is 0 on a hard
edge) and outputs `O` (`produces` with shares): `inBulk = Σ_I bulk × volume`, `outBulk = Σ_O bulk × share`; the tests in
this order, the first that holds deciding: **source** when `inBulk > f × outBulk` (`web.orientFactor` f = 1.5);
**market** when any output has `perishable ≥ 2` or `outBulk > f × inBulk`; else **balanced**. A class with no inputs is **source** if
it has outputs (it sits by its resource) and **balanced** otherwise. The derived value is written into the compiled
row with provenance `own; derived from the goods table` and may be overridden per class (V11 §3.5's `src`, `mkt`,
`bal`).

**3.7.4 The web's settings** (`siting.web`; one row; `own`, `extension`, calibratable):

| cell | default | what it does |
|---|---|---|
| `reverseShare` | 0.5 | the provider's pull toward its bound consumers' weighted centre, × the edge weight (item 105 (b)) |
| `orientFactor` | 1.5 | V11 §3.7.3's bulk ratio |
| `relaxPasses` | 2 | item 105 (f)'s bounded relaxation cap |
| `relaxGain` | 0.15 | the score gain (units) a relaxation move must exceed |
| `districtSupplyWeight` | 0.08 | item 105 (g)'s S7b (1) term, low enough that J-A72.46's dispersal holds (T-V11-18) |
| `splitThreshold` | 0.6 | a split class's default (V11 §2.3) |
| `volume` | minor 0.5, moderate 1.0, major 1.5, backbone 2.0 (SettlementForge's `economicWeight` words, V08 §2.8); any other word: moderate, noted `unmapped_word` | `economicWeight` → a custom or dossier chain link's volume and σ multiplier (item 104 (h) (2)); absent: moderate |
| `chainStatus` | keyed by V08's NEUTRAL status keys (V08 §2.6's `chainStatus` word row maps SettlementForge's six words onto them: `running` and `operational` → `active`, `magically_sustained` → `sustained`, any other word → `active`, noted; J-V8.49): active 1.0, vulnerable 0.8, impaired 0.6, entrepot 1.0 (its ends take the import and export pulls), sustained 0.9 (J-V11.52) | item 105 (i)'s status table; the port carries the key, this row the weight |
| `perishableShort` | × 0.5 on `comfortM` when perishable = 3 | item 104 (h) (2): perishable links kept short |
| `bulkyWater` | × 0.6 on the distance of a river or sea leg when bulk = 3 | item 103 (a): water legs cheaper than carts |
| `valuableSecurity` | + 0.3 × `security` on `fam/need/security` for a holder of a good with security ≥ 2 | item 104 (h) (2) |
| `orientEnabled` | true | the orientation switch: false reads every class's `profile.orientation` as `balanced` in the view (V11 §3.2.2), so item 105 (f)'s orientation tiers collapse to one; a switch, not calibratable |
| `splitEnabled` | true | the split switch: false leaves every class's `profile.split` out of the view, so no works-and-shop pair is generated; a use's declared split (V11 §4.2) stands; a switch, not calibratable |

**The web's off form** (`web.off`; J-V11.72) — one named cell set, every value inside its column's declared range,
equal cell for cell to what the `MFCG`, `FTG` and `VG` presets resolve (T-V11-21; checked at compile, V11 §3.2.1 step 4), in the form of V11 §3.24.0's switch
table, so a no-op pin's overlay and V12's `noRegression` reference arm write it as `{ ref, value }` pairs (V12 §2.13,
J-V12.43). The ranges below are these columns' `ColumnSpec.range`:

| cell (range) | off | effect when off |
|---|---|---|
| `siting.web.reverseShare` ([0, 1]) | 0 | no provider pulls toward its bound consumers (item 105 (b), (c)); the goods' `demand` column is never read |
| `siting.web.relaxPasses` (integer [0, 2]; item 105 (f)'s cap) | 0 | no relaxation pass; `relaxGain` is never read |
| `siting.web.districtSupplyWeight` ([0, 0.2]) | 0 | no supply term in S7b (1)'s district allocation (item 105 (g)) |
| `siting.web.valuableSecurity` ([0, 1]) | 0 | no security raise for a holder of a valuable good (item 104 (h) (2)) |
| `siting.web.bulkyWater` ([0.3, 1]) | 1 | a bulky good's river or sea leg costs its plain distance by mode (the base's supply distance) |
| `siting.web.perishableShort` ([0.25, 1]) | 1 | no shortening of a perishable good's plateau |
| `siting.web.orientEnabled` | false | every class `balanced`; `orientFactor` and the goods' `volume` are never read for orientation |
| `siting.web.splitEnabled` | false | no generated split |
| `roster.resources` `comfortM` on every good ([0, the row's `maxDistanceM`]) | 0 | no plateau: a consumer's satisfaction decays linearly from its provider to `maxDistanceM`, the base's supply term (item 107 (b); V11 §2.10's goods row) |

`comfortM` and the four `siting.web` cells whose off value is 0 are `extension` numbers, so §7.6's zeroing gives them 0 in
the zeroing presets with no entry; `bulkyWater` and `perishableShort` (off value 1) and the switches `orientEnabled` and
`splitEnabled` (false) carry explicit `presets.MFCG`, `.FTG` and `.VG` entries (V11 §2.2's preset entries) — so the
presets and the off form agree cell for cell. `FM` carries no entry here and leaves the web at its defaults (item 376). With the form applied the placement is
byte-identical to the base's without item 105 (item 105 (k)'s no-op pin, T-V11-21); V06's T-V6-44 is its epoch form and
V12's bar map 105 (k) its `noRegression` reference arm, each citing this set. `orientFactor`, `relaxGain`,
`splitThreshold`, `volume` and `chainStatus` keep their values and are never read for a generated town while the form holds.
The dossier's own chains (item 105 (i)) and a document's link edits and declared splits (V11 §4.2) are not generated
terms and stand, as declared rows stand under V11 §3.24.0's switches; the pins run on generated towns that carry none.

### 3.8 The signature pairs (`siting.pairs`; item 103 (b); all soft, `extension`, provenance `own; general historical knowledge, not corpus-witnessed` unless marked)

| id | a | b | kind | distance m | weight | sym. | reason |
|---|---|---|---|---|---|---|---|
| `bakery-mill` | bakery | watermill, windmill, granary | near | within 300, beyond 1 200 | 0.4 | no | bakers stand near their flour |
| `tannery-shambles` | tannery | shambles, butcher | near | within 300, beyond 1 000 | 0.4 | no | hides come from the slaughter yard |
| `tannery-homes` | tannery | `#housing` | downwind (relative, item 437) | beyond 150 | 0.6 | no | the smell is carried away from homes |
| `dyer-tanner` | dyer | tannery | upstream (relative, item 437) | beyond 100 | 0.7 | yes (mirrored: tannery downstream of dyer) | dyers need clean water, tanners foul it |
| `fuller-dyer` | fuller | dyer | near | within 200, beyond 800 | 0.3 | yes | the cloth trades work in sequence |
| `smith-gate` | smithy, farrier | `gate` | near | within 100, beyond 500 | 0.3 | no | smiths shoe and mend at the road's entry |
| `farrier-stable` | farrier | livery_stable, inn, coaching_inn | near | within 80, beyond 300 | 0.4 | no | where the horses are |
| `inn-gate` | inn, coaching_inn | `gate` | near | within 100, beyond 400 | 0.4 | no | travellers arrive at the gates |
| `inn-stable` | inn | livery_stable | near | within 100, beyond 300 | 0.2 | yes | inns and stables share custom |
| `chandler-harbour` | ship_chandlery, ropewalk | `harbour`, `quay` | near | within 150, beyond 600 | 0.5 | no | ships' stores at the waterfront |
| `apothecary-physician` | apothecary | physician, hospital | near | within 150, beyond 600 | 0.3 | no | prescriptions travel short distances |
| `scriptorium-learning` | scriptorium, bookbinder | cathedral, monastery, university, school | near | within 200, beyond 800 | 0.4 | no | copying serves the church and the schools |
| `thieves-garrison` | thieves_den, gang_hideout | barracks, guard_post, courthouse, prison, castle | far | beyond 400 | 0.8 | no | the underworld keeps clear of the law … |
| `thieves-crowds` | thieves_den, fences_hall | market, inn, tavern | near | within 60, beyond 300 | 0.5 | no | … yet stays near crowds and wealth — the tension is the point |
| `thieves-wealth` | thieves_den, fences_hall | values `prosperous`, `rich` | band | — | 0.2 | no | … and within reach of the well-to-do |
| `fence-pawn` | fences_hall | pawnshop | near | within 100, beyond 400 | 0.3 | yes | stolen goods pass through pledges |
| `smuggler-water` | smugglers_store | `harbour`, `quay`, `landuse:marsh` | near | within 80, beyond 300 | 0.5 | no | goods come off the water … |
| `smuggler-hidden` | smugglers_store | values `hidden`, `back` | exposure | — | 0.3 | no | … unseen |
| `brothel-harbour` | brothel | `harbour`, `gate`, inn | near | within 150, beyond 400 | 0.3 | no | sailors and travellers (§4.5 (3)'s rows) |
| `brothel-church` | brothel, gambling_house | church, cathedral, monastery | far | beyond 200 | 0.5 | no | kept at a distance from holy ground |
| `market-hall-market` | market_hall, cloth_hall | market | near | within 60 | 0.8 | no | the hall stands on its market |
| `goldsmith-cluster` | goldsmith | goldsmith | sameStreet | — | 0.5 | yes | goldsmiths kept one street (under the assay's eye) |
| `money-market` | money_changer, moneylender, bank | market, `gate` | near | within 150, beyond 500 | 0.3 | no | money follows trade |
| `warehouse-merchant` | merchant_house | warehouse | near | within 200, beyond 600 | 0.3 | yes | merchants live over or beside their stores |
| `granary-market` | granary | market | near | within 200, beyond 800 | 0.3 | no | grain is sold where it is stored |
| `church-green` | church | `open:square`, `open:green` | near | within 30, beyond 200 | 0.3 | no | a parish church fronts its square or green |
| `hospital-gate` | hospital | `gate`, `bridge` | near | within 150, beyond 500 | 0.3 | no | hospitals of the road stood at the town's entries |
| `friary-edge` | monastery | `wallInner` | near | within 100, beyond 400 | 0.3 | no | friars settled at the edges |
| `almshouse-church` | almshouse | church | near | within 150, beyond 500 | 0.3 | no | charity beside its parish |
| `school-church` | school | church, cathedral | near | within 150, beyond 500 | 0.3 | no | schools were kept by the church |
| `prison-court` | prison | courthouse | near | within 150, beyond 500 | 0.4 | yes | gaol beside the court |
| `barracks-castle` | barracks, armoury | castle | near | within 200, beyond 600 | 0.5 | no | the garrison serves the castle |
| `mage-apart` | mage_tower | mage_tower | far | beyond 400 | 0.4 | yes | rival towers keep apart (the family's spread, stated for the clerk) |
| `alchemist-mage` | alchemist, scroll_scribe, enchanter | mage_tower, mages_guild | near | within 300, beyond 800 | 0.3 | no | the arcane trades serve the mages |
| `cookshop-crowds` | cookshop | market, inn, `gate` | near | within 80, beyond 300 | 0.3 | no | hot food where people pass |
| `latrine-water` | latrine | `#housing` | downstream (relative, item 437) | beyond 100 | 0.5 | no | the privy empties below the town |
| `wheelwright-carrier` | wheelwright | carrier_yard, livery_stable | near | within 100, beyond 400 | 0.3 | no | carts are mended where they stand |
| `mason-church` | mason_yard | cathedral | near | within 200, beyond 800 | 0.3 | no | the lodge beside the great building |
| `bath-water` | bathhouse | conduit_house (the river is the bathhouse's own `nearWater` row) | near | within 100, beyond 300 | 0.3 | no | baths need water |

Every pair endpoint is a class id, a `#<tag>`, a feature class of V11 §3.3.3 or, for the kinds `band` and `exposure`,
a values list; T-V11-3 refuses anything else. No pair ties a watermill to its leat (the watermill's hard `nearWater`
with a fall carries it) or a guildhall to a trade (a guildhall has no trade of its own; one placed for a GUILD or COUNT
record takes its trade row through §7.7's `PlacementCriteria`, V11 §3.5.7). "The mason's lodge beside the
great building during its Works" is read as the lodge near the cathedral at any time: a Works condition cannot be scored
at placement.

### 3.9 District kinds (`roster.districtKinds`)

The S6 typing scorer's rows (§4.5 *Typing*) and S7b's affinity rows. Each row lists its `RelationRule`s (kind → to,
distance, weight; hard only where marked); the class affinities S7b reads are the classes whose tags the kind names.
Provenance: the reference rows `ref:MFCG ward types` and `ref:FTG district rules` (§4.5's emulated typing), extensions
*ext*.

| kind | relations (all soft unless marked) | `affinity` (tag, band, weight) | notes |
|---|---|---|---|
| `central` | `nearCentre` 300 (1.0); `nearMarket` 300 (0.6) | trade 1.0, civic-authority 1.0, finance 0.8, worship 0.6 | the core |
| `market` | `nearMarket` 150 (hard, at its market) | market 1.0, trade 1.0, food 0.8 | one per market (item 24) |
| `docks` | `nearHarbour` 200 (hard); `nearWater` 60 (0.8) | port 1.0, warehouse 1.0, shipyard 0.8, smuggling 0.3 | waterfront |
| `riverbank` | `nearWater` river 100 (0.8) | riverbank 0.8 (the textile, leatherwork and timber-yard classes' tag), food-works 0.4 | river trades |
| `gate` | `nearGate` 200 (1.0) | lodging 1.0, transport 1.0, metalwork 0.6 | gate wards |
| `castle` | `near` castle 300 (1.0) | garrison 1.0, civic-authority 0.6, housing (rich–rich) 0.4 | near the castle → military and administration |
| `temple` | `near` cathedral, great_temple 300 (1.0) | worship 1.0, monastic 0.8, school 0.6, welfare 0.6 | the ground precinct |
| `craft` | `downstream` scalar (the plot's own drainage position, `min` 0.6; 0.4 *ext*); `downwind` scalar (`min` 0.6; 0.4 *ext*); `nearWater` 300 (0.3) | craft 1.0, metalwork 0.8, leatherwork 1.0, textile 1.0, industry 0.8, food-works 0.6 | noxious crafts downstream and downwind |
| `park` | `highGround` (0.3); `band` values prosperous, rich (0.5) | housing (prosperous–rich) 0.6 | the `greens` toggle's park districts (§4.9) |
| `sprawl` | `extramural` (0.6) | housing 1.0, farming 0.4 | the ribbon regime |
| `suburb` | `extramural` (1.0) | housing 1.0 | FTG's suburb regime (era or preset) |
| `shanty` | `extramural` (0.6 *ext*, J-A27.43) | housing (squalid–squalid) 1.0 | FTG's shanty rule (§4.5) |
| `hinterland`, `underground`, `undercity` | pseudo-districts: their own rows (§4.9, II.7.3, II.7.5) | — | — |
| `sky-island`, `sky-palace`, `sky-temple`, `sky-prison`, `sky-tower` | V05 §2.4's rows (item 213; keyed apart from every ground kind, J-V5.48) | each its ground counterpart's (`sky-island` the town's richest ground kind's; `sky-palace` `castle`'s; `sky-temple` `temple`'s; `sky-prison` and `sky-tower` `central`'s) | V05's facts, written as rows here |
| `harbour-market` | `nearHarbour` 150 (hard); `nearMarket` 150 (hard) | market 1.0, warehouse 1.0 | a market sited at the harbour (item 24's flanking site) |
| `bridgehead` | `near` bridge 150 (1.0) | lodging 0.8, trade 0.8, civic-authority 0.6 | a market or ward at a bridge's end *ext* |

*Display words* (item 516; J-V11.93), read by T5's kind cards (V09 §4.5) and `@plat/docs`; no kind ships an `icon`: `central` town centre; `market` market quarter; `docks` docks;
`riverbank` riverside; `gate` gate ward; `castle` castle ward; `temple` temple precinct; `craft` craft quarter; `park`
park quarter; `sprawl` roadside sprawl; `suburb` suburb; `shanty` shanty town; `hinterland` hinterland; `underground`
underground; `undercity` undercity; `sky-island` sky island; `sky-palace` sky palace; `sky-temple` sky temple;
`sky-prison` sky prison; `sky-tower` sky tower; `harbour-market` harbour market; `bridgehead` bridgehead.

`affinity` is `DistrictKindRow.affinity` (item 438): §4.5's typing scorer adds, for a candidate kind, Σ weight × the
remaining demand of the classes carrying the tag (inside the band range when one is given), and S7b (1)'s affinity reads
the same rows; the relations are the kind's `RelationRule`s (`dk/<kind>/<n>`), read by the typing scorer and a
whole-neighbourhood assignment. Keys are unique (T-V11-3): the ground precinct is `temple`, the island's `sky-temple`.

### 3.10 Quarter identities (`roster.quarterIdentities`; item 72 (d′); `own`, `extension`)

| id | families (weight) | threshold | per ha | bands | priority | singular | power · sector | kind | definedBy · targetShare | naming slice |
|---|---|---|---|---|---|---|---|---|---|---|
| `religious` | worship 1; cathedral, great_temple 3; monastic 2 | 3 | no | — | 80 | no | religion · religion | temple | — | `naming.district/religious` |
| `craftsmen` | craft 1; metalwork 1; textile 1 | 0.6 | yes | — | 50 | no | guild · crafts | craft | — | `…/craft` |
| `noxious` | leatherwork 2; industry 2; food-works 1; dyer, fuller 1 | 3 | no | — | 55 | no | guild · crafts | craft | — | `…/noxious` |
| `merchants` | trade 1; warehouse 1; finance 2 | 5 | no | prosperous–rich | 60 | no | company · trade | — | — | `…/merchant` |
| `market` | market 3; food 1; trade 0.5 | 4 | no | — | 45 | no | council · trade | market | — | `…/market` |
| `harbour` | port 1; warehouse 1; shipyard 1 | 4 | no | — | 65 | no | company · trade | docks | — | `…/harbour` |
| `riverside` | riverbank 1 | 4 | no | — | 40 | no | guild · crafts | riverbank | — | `…/riverside` |
| `garrison` | garrison 2; fortification 1 | 4 | no | — | 70 | no | military · military | castle | — | `…/garrison` |
| `government` | civic-authority 2; law-court 2 | 4 | no | — | 72 | yes | council · taxes | central | — | `…/government` |
| `learned` | school 2; university 5; library 3 | 5 | no | — | 60 | no | — · — | temple | — | `…/learned` |
| `arcane` | arcane 1; mage_tower 3; alchemy 1 | 3 | no | — | 75 | no | arcane · magic | — | magicOnly | `…/arcane` |
| `lodging` | lodging 1; entertainment 1 | 4 | no | — | 35 | no | — · trade | gate | — | `…/lodging` |
| `luxury` | luxury 2; finance 1 | 4 | no | prosperous–rich | 58 | no | guild · crafts | — | — | `…/luxury` |
| `red-light` | entertainment 1; brothel 3 | — | — | — | 90 | no | — · crime | — (J-A72.51) | brothel · 0.15 | `…/redlight` |
| `slums` | housing (squalid–poor) 1 | — | — | squalid | 90 | no | — · — | shanty | — (reached by §7.7 item 14's quarter biases, V08's `quarters` rows) | `…/slums` |
| `foreign` | the quarter bias's classes | — | — | — | 88 | no | company · trade | — | — (a quarter bias, as `slums`) | `…/foreign` |
| `guild-district` | guild-hall 2; the biased trade's family 1 | — | — | — | 86 | no | guild · crafts | craft | — (a quarter bias, as `slums`) | `…/guild` |
| `warehouse-district` | warehouse 2 | — | — | — | 86 | no | company · trade | docks | warehouse · 0.3 | `…/warehouse` |
| `apothecary-district` | healing 2 | — | — | — | 84 | no | guild · crafts | — | apothecary · 0.2 | `…/apothecary` |
| `banking-district` | finance 2 | — | — | prosperous–rich | 84 | no | company · finance | central | bank · 0.2 | `…/banking` |
| `mages-district` | arcane 2 | — | — | — | 84 | no | arcane · magic | — | mage_tower · 0.15 (magicOnly) | `…/arcane` |
| `alchemist-quarter` | alchemy 2 | — | — | — | 84 | no | arcane · magic | — | alchemist · 0.25 (magicOnly) | `…/arcane` |
| `luxury-quarter` | luxury 2 | — | — | prosperous–rich | 84 | no | guild · crafts | — | goldsmith · 0.2 | `…/luxury` |
| `stable-district` | transport 2 | — | — | — | 82 | no | — · trade | gate | livery_stable · 0.25 | `…/lodging` |
| `inns-district` | lodging 2 | — | — | — | 82 | no | — · trade | gate | inn · 0.15 (tavern members beside it at 2 : 1, V11 §3.12) | `…/lodging` |
| `gambling-district` | entertainment 2 | — | — | — | 82 | no | criminal · crime | — | gambling_house · 0.2 | `…/lodging` |
| `entertainment-district` | entertainment 2 | — | — | — | 80 | no | — · trade | — | theatre · 0.2 (a naming claim's row, item 82) | `…/lodging` |
| `furriers-quarter` | luxury 1; furrier 2 | — | — | — | 82 | no | guild · crafts | craft | furrier · 0.2 | `…/craft` |
| `slave-market-district` | market 2 | — | — | — | 82 | no | company · trade | — | slave_market · 0.15 | `…/market` |
| `sages-quarter` | school 2 | — | — | — | 82 | no | — · — | — | sage_house · 0.2 | `…/learned` |
| `delvers-district` | adventuring 2 | — | — | — | 82 | no | company · trade | gate | outfitter · 0.2 | `…/lodging` |
| `mercenary-quarter` | garrison 2 | — | — | — | 82 | no | military · military | gate | mercenary_hall · 0.2 | `…/garrison` |
| `plain-<band>` | residential, one row per band | — | — | the band | 1 | no | — · — | — | — | `…/plain` |

Dominant-component identities (§4.5 (4)) read the family's or sector's row of this table when one names it, else a
generated `dominant-<family>` row with priority 20 and the naming slice `naming.district/trade` guarded on the family.
The `families` column's keys are class tags (V11 §3.5.1: a profile family key, a class id, or an extra tag); a
`definedBy` names a class whose dossier record is district-defining — a QUARTER record's member class (item 108 (a);
the record names its identity through `LadderStepRow.identity`, V11 §3.12) or a class whose row is `district-defining`
(item 439). `slums`, `foreign` and `guild-district` have no `definedBy`: §7.7 item 14's quarter biases (V08's
`quarters` rows) reach them. The table's family keys are V11 §3.4's profile families, not the base paragraph's prose
words (item 442).

### 3.11 The institution map — every SettlementForge catalogue kind (`dossier.kinds`; V08's shape, J-V8.18)

All 280 kinds of the catalogue at the port's baseline line (read by V08's build step, V08 §2.4; tiers T thorp, H hamlet, V village,
W town, C city, M metropolis) map to a class of V11 §3.5 (town and city rungs) — at village rungs V07 §3.11's
substitution reads the class's `villageForm` (V11 §3.22). The **pseudo-classes** say what a kind that is
not a building drives, each a fact the port hands to the named reader and never an assignment: `@wall` (the record says
the town is walled — S3's enceinte, §4.2 S3 (9); its step says which ring the dossier names), `@layer:sewer` (forces the
sewer layer's existence, II.7.1), `@layer:undercity` (the dossier requires an undercity — II.7.5's `require`, at TOWN
and above with at least one neighbourhood; its void comes from item 109 (e)'s ranked sources, V11 §3.23.6's
`sourceRank`, never from a sewer alone), `@absent:<class>[+<class>]` (the settlement has none of its own: S2 sets each
named class's `min` and per-capita demand to 0 at the settlement unless another record names one — a village using a
neighbour's mill or parish church; at a village rung, the `v.` class that plays each named class through its
`villageForm`, V07 §3.11 step 1; one `class` string, `+` joining the classes), `@seat` (the
government row's seat class, V11 §3.21.1, and at a village rung its `villageSeat` — the record binds to that building), `@office` (the record binds to its
seat's existing building as a sub-location, never a second building — the town crier and the scribe to the town hall,
the resident priest to the church), `@landuse:<kind>` (a hinterland land use S12a sizes, §4.9), `@pin:<kind>` (the pins
of §4.7's furniture step — wells, shrines — whose coverage rows hold, at the base rungs; at a village rung V07 §3.10's
pin-record rule — in VS8 at generation, in `village.records` when the record arrives at a village epoch or an absorb, or
when a pin-record lesser's REPLACEMENT greater arrives (V07 §3.12 *Records at a village epoch*) —
binding a standing pin of its kind or forcing one where none stands (V07 §3.10; a promoted record's binding as
V08 §3.5.1 (d) states, J-V8.114), since §4.7's furniture step places none at the
`territory` rungs (item 579)), `@housing` (bounds S2's residential count, V08
row 29) and `@none` (a presence with no map element — reported in the gazetteer, labelled nowhere). A kind the line
adds later that this table lacks falls to its category's `generic-<family>` class, reported `unmapped_kind` (the
totality rule `coversManifest sf.catalogue@<line>`, read from the committed manifest `src/dossier/catalogue.<line>.json`
that V08's build step writes in V08 §2.4's manifest shape; T-V11-2). The class's profile is the kind's
profile (a row may name a `family` override; none does in the default rows). **Routing order** (V07 §3.11 steps
1–4, J-V7.56): a pseudo-class first; at a village rung then the class's `villageForm` (V11 §3.22); then the class row —
a class plays itself at any rung once a dossier names it; the tag fallback only for a kind that fell to a
`generic-<family>` class (`unmapped_kind`). The granularity T9 yields (building, dispersed members, a
district-defining neighbourhood, an office, a wall) is derived by V08's T9 from its `distribution` rows and V11 §3.12's
ladder step, and the ladder step of a kind is V11 §3.12's row (single source). The rows are never calibrated (§13.9 (7)); a change is a table fix reviewed with V08.

| kind (catalogId) | tiers | class |
|---|---|---|
| `beast_trainers` (Adventuring) | W | `beast_yard` |
| `charlatan_fortune_tellers` (Adventuring) | W | `fortune_teller` |
| `dungeon_delving_supply_district` (Adventuring) | C | `outfitter` |
| `hireling_hall` (Adventuring) | W | `hireling_hall` |
| `mercenary_quarter` (Adventuring) | C | `mercenary_hall` |
| `merchant_warehouses` (Adventuring) | W | `warehouse` |
| `multiple_adventurers_guilds` (Adventuring) | C | `adventurers_hall` |
| `sage_s_quarter` (Adventuring) | C | `sage_house` |
| `apothecary` (Crafts) | V | `apothecary` |
| `apothecary_established` (Crafts) | W | `apothecary` |
| `bakers_5_15` (Crafts) | W | `bakery` |
| `beekeeper` (Crafts) | V | `apiary` |
| `blacksmith` (Crafts) | V | `smithy` |
| `blacksmiths_3_10` (Crafts) | W | `smithy` |
| `bowyer_fletcher` (Crafts) | V | `bowyer` |
| `bowyers_fletchers_guild` (Crafts) | W | `bowyer` |
| `brewer` (Crafts) | V | `brewery` |
| `brewery` (Crafts) | W | `brewery` |
| `brickmaker` (Crafts) | V | `brickworks` |
| `butchers_3_8` (Crafts) | W | `butcher` |
| `carpenter` (Crafts) | V | `carpenter` |
| `carpenter_part_time` (Crafts) | H | `carpenter` |
| `carpenters_5_15` (Crafts) | W | `carpenter` |
| `chandler` (Crafts) | W | `chandler` |
| `charcoal_burner` (Crafts) | H,V | `charcoal_burner` |
| `cobbler` (Crafts) | V | `cobbler` |
| `cobbler_s_guild` (Crafts) | W | `cobbler` |
| `cooper` (Crafts) | V | `cooper` |
| `craft_guilds_100_150` (Crafts) | M | `guildhall` |
| `dairy_farmer` (Crafts) | H,V | `farmstead` |
| `dyer` (Crafts) | V | `dyer` |
| `fisher_s_landing` (Crafts) | H | `fish_landing` |
| `fishmonger` (Crafts) | V | `fishmonger` |
| `fuller` (Crafts) | V | `fuller` |
| `glassblower` (Crafts) | W | `glassblower` |
| `glassmakers` (Crafts) | C | `glassworks` |
| `hunter_s_lodge` (Crafts) | H,V | `hunting_lodge` |
| `luxury_goods_quarter` (Crafts) | C | `goldsmith` |
| `maltster` (Crafts) | H | `maltings` |
| `midwife` (Crafts) | V | `healer` |
| `mill` (Crafts) | V | `watermill` |
| `mills_2_5` (Crafts) | W | `watermill` |
| `mine` (Crafts) | V | `mine` |
| `mine_open_cast` (Crafts) | H | `mine` |
| `mint` (Crafts) | W | `mint` |
| `pack_animal_trader` (Crafts) | H | `livery_stable` |
| `peat_cutter` (Crafts) | H | `peat_works` |
| `potter` (Crafts) | V | `potter` |
| `printing_house` (Crafts) | C | `printing_house` |
| `resident_smith_part_time` (Crafts) | H | `smithy` |
| `ropemaker` (Crafts) | W | `ropewalk` |
| `salt_works` (Crafts) | H,V | `salt_works` |
| `sawmill` (Crafts) | V | `sawmill` |
| `sawmill_commercial` (Crafts) | W | `sawmill` |
| `shepherd` (Crafts) | H | `sheepfold` |
| `smelter` (Crafts) | W | `smelter` |
| `specialized_metalworkers` (Crafts) | C | `metalworks` |
| `stable_master` (Crafts) | V | `livery_stable` |
| `stable_yard` (Crafts) | H | `livery_stable` |
| `stone_quarry` (Crafts) | H,V | `quarry` |
| `tailor` (Crafts) | V | `tailor` |
| `tailor_s_guild` (Crafts) | W | `tailor` |
| `tanner_established` (Crafts) | W | `tannery` |
| `tanners` (Crafts) | W | `tannery` |
| `tannery` (Crafts) | V | `tannery` |
| `thatcher` (Crafts) | V | `thatcher` |
| `town_crier` (Crafts) | W | `@office` |
| `village_scribe` (Crafts) | V | `@office` |
| `weavers_textile_workers` (Crafts) | W | `weaver` |
| `wildfowler` (Crafts) | V | `fishery` |
| `woodcarver` (Crafts) | V | `woodcarver` |
| `cartographer_s_workshop` (Crafts/Economy) | V,W | `cartographer` |
| `assassins_guild` (Criminal) | M | `assassins_house` |
| `bandit_affiliate` (Criminal) | H | `outlaw_camp` |
| `black_market` (Criminal) | C | `black_market` |
| `black_market_bazaar` (Criminal) | M | `black_market` |
| `contract_killer` (Criminal) | C | `assassins_house` |
| `fence_word_of_mouth` (Criminal) | H,V | `fences_hall` |
| `front_businesses` (Criminal) | W,C | `gang_hideout` |
| `human_trafficking_network` (Criminal) | C | `trafficking_den` |
| `kidnapping_ring` (Criminal) | C | `kidnap_den` |
| `local_fence` (Criminal) | T | `fences_hall` |
| `multiple_criminal_factions` (Criminal) | C | `gang_hideout` |
| `outlaw_shelter` (Criminal) | T | `outlaw_camp` |
| `rookery` (Criminal) | W,C | `info_broker` |
| `smuggling_network` (Criminal) | V,C | `smugglers_store` |
| `smuggling_operation` (Criminal) | W | `smugglers_store` |
| `smuggling_waypoint` (Criminal) | H | `smugglers_store` |
| `street_gang` (Criminal) | W | `gang_hideout` |
| `thieves_guild_chapter` (Criminal) | C | `thieves_den` |
| `thieves_guild_powerful` (Criminal) | M | `thieves_den` |
| `underground_city` (Criminal) | M | `@layer:undercity` |
| `underground_network` (Criminal) | V,W,C | `smugglers_store` |
| `whisper_market` (Criminal) | C | `info_broker` |
| `barracks` (Defense) | W | `barracks` |
| `citadel` (Defense) | C | `castle` |
| `citizen_militia` (Defense) | H,V,W | `@none` (a muster, not a building: its ground is the green or the market; J-V11.59) |
| `city_walls_and_gates` (Defense) | C | `@wall` |
| `free_company_hall` (Defense) | W | `mercenary_hall` |
| `garrison` (Defense) | C | `barracks` |
| `gates_if_walled` (Defense) | W | `@none` (its gates follow a wall record: SettlementForge makes a wall its prerequisite, `research/sf/dossier-model.md`; J-V11.64) |
| `massive_walls_and_fortifications` (Defense) | M | `@wall` |
| `multiple_garrisons` (Defense) | M | `barracks` |
| `palisade_or_earthworks` (Defense) | H,V | `@wall` |
| `professional_city_watch` (Defense) | C | `guard_post` |
| `town_walls` (Defense) | W | `@wall` |
| `town_watch` (Defense) | W | `guard_post` |
| `veteran_s_lodge` (Defense) | V | `mercenary_hall` |
| `access_to_external_mill` (Economy) | T,H | `@absent:watermill+windmill` |
| `ale_house` (Economy) | V | `alehouse` |
| `alehouse` (Economy) | H | `alehouse` |
| `annual_fair` (Economy) | W | `fair_ground` |
| `apothecary_district` (Economy) | C | `apothecary` |
| `assay_office` (Economy) | W | `assay_office` |
| `auction_house` (Economy) | C | `auction_house` |
| `banking_district` (Economy) | M | `bank` |
| `banking_houses` (Economy) | C | `bank` |
| `barge_and_river_transport_company` (Economy) | C | `carrier_yard` |
| `caravan_masters_exchange` (Economy) | C | `carrier_yard` |
| `caravaneer_s_post` (Economy) | W | `carrier_yard` |
| `caravanserai` (Economy) | H,V | `caravanserai` |
| `carriers_guild` (Economy) | W | `carrier_yard` |
| `carriers_hiring_hall` (Economy) | W | `carrier_yard` |
| `cartographer_s_guild` (Economy) | C | `cartographer` |
| `chroniclers_exchange` (Economy) | C | `archive` |
| `city_granaries` (Economy) | C | `granary` |
| `coaching_inn` (Economy) | W | `coaching_inn` |
| `common_grazing_land` (Economy) | H | `@landuse:commons` |
| `craft_guilds_30_80` (Economy) | C | `guildhall` |
| `craft_guilds_5_15` (Economy) | W | `guildhall` |
| `customs_house` (Economy) | W | `customs_house` |
| `daily_markets` (Economy) | C,M | `market` |
| `district_markets_5_10` (Economy) | M | `market` |
| `docks_port_facilities` (Economy) | W,C | `harbour_master` |
| `farmland` (Economy) | V | `@landuse:arable` |
| `fish_market` (Economy) | V | `market_hall` |
| `fishing_community` (Economy) | T | `fish_landing` |
| `furrier_s_district` (Economy) | C | `furrier` |
| `harbour_master_s_office` (Economy) | C | `harbour_master` |
| `inn_multiple` (Economy) | W | `inn` |
| `inns_and_taverns_district` (Economy) | C | `inn` |
| `international_trade_center` (Economy) | M | `market_hall` |
| `jeweller` (Economy) | W | `goldsmith` |
| `listening_post` (Economy) | W,C | `spy_ring` |
| `major_annual_fairs` (Economy) | C | `fair_ground` |
| `market_square` (Economy) | W | `market` |
| `merchant_guilds_15_40` (Economy) | C | `guildhall` |
| `merchant_guilds_3_8` (Economy) | W | `guildhall` |
| `merchant_guilds_50_100` (Economy) | M | `guildhall` |
| `mint_official` (Economy) | C | `mint` |
| `money_changers` (Economy) | W | `money_changer` |
| `multiple_market_squares` (Economy) | C | `market` |
| `pawnbroker` (Economy) | H | `pawnshop` |
| `periodic_market` (Economy) | H | `market` |
| `post_relay_station` (Economy) | W | `post_station` |
| `public_bathhouse` (Economy) | W | `bathhouse` |
| `river_boatyard` (Economy) | V | `boatyard` |
| `river_ferry` (Economy) | V | `ferry_landing` |
| `shepherd_collective` (Economy) | T | `sheepfold` |
| `shipyard` (Economy) | W,C | `shipyard` |
| `slave_market` (Economy) | W,C | `slave_market` |
| `slave_market_district` (Economy) | C | `slave_market` |
| `stable_district` (Economy) | W | `livery_stable` |
| `state_granary_complex` (Economy) | M | `granary` |
| `subsistence_farming` (Economy) | T,H | `@landuse:arable` |
| `taverns_5_20` (Economy) | W | `tavern` |
| `toll_bridge` (Economy) | V | `toll_house`; `implies: 'bridge'` (V11 §3.24.7 (2)) |
| `town_granary` (Economy) | W | `granary` |
| `travelers_inn` (Economy) | V | `inn` |
| `vintner` (Economy) | W | `vintner` |
| `warehouse_district` (Economy) | C | `warehouse` |
| `wayside_inn` (Economy) | H | `inn` |
| `waystation` (Economy) | V | `post_station` |
| `weekly_market` (Economy) | V,W | `market` |
| `woodcutter_s_camp` (Economy) | T | `lumber_camp` |
| `bardic_college` (Entertainment) | C | `college` |
| `brothel` (Entertainment) | W | `brothel` |
| `brothel_red_light_district` (Entertainment) | C | `brothel` |
| `colosseum_arena` (Entertainment) | C | `arena` |
| `fighting_pits` (Entertainment) | C | `fighting_pit` |
| `gambling_den` (Entertainment) | W | `gambling_house` |
| `gambling_district` (Entertainment) | C | `gambling_house` |
| `gambling_halls` (Entertainment) | C | `gambling_house` |
| `gladiatorial_school` (Entertainment) | W | `training_yard` |
| `hired_blades` (Entertainment) | W | `mercenary_hall` |
| `multiple_theaters` (Entertainment) | C | `theatre` |
| `opera_house` (Entertainment) | C | `opera_house` |
| `red_light_district` (Entertainment) | C | `brothel` |
| `theaters` (Entertainment) | C | `theatre` |
| `traveling_performers` (Entertainment) | W | `@none` |
| `airship_docking_high_magic` (Exotic) | C | `airship_dock` |
| `dragon_resident` (Exotic) | C | `dragon_roost` |
| `dream_parlors_high_magic` (Exotic) | C | `dream_parlour` |
| `golem_workforce` (Exotic) | C | `golem_works` |
| `message_network_high_magic` (Exotic) | C | `post_station` |
| `planar_traders` (Exotic) | C | `merchant_house` |
| `undead_labor` (Exotic) | C | `necro_works` |
| `city_administration` (Government) | C | `town_hall` |
| `city_state_government` (Government) | C | `town_hall` |
| `democratic_assembly` (Government) | C | `town_hall` |
| `guild_consortium` (Government) | C | `guildhall` |
| `guild_governance` (Government) | W | `guildhall` |
| `head_of_household_consensus` (Government) | T | `@none` |
| `household_elder` (Government) | T | `@none` |
| `informal_elder_consensus` (Government) | T,H | `@none` |
| `lord_s_appointee` (Government) | W | `@seat` |
| `lord_s_reeve` (Government) | T | `@seat` |
| `lord_s_steward` (Government) | H,V | `@seat` |
| `mayor_and_council` (Government) | W,C | `town_hall` |
| `merchant_oligarchy` (Government) | C | `@seat` |
| `multiple_court_buildings` (Government) | M | `courthouse` |
| `noble_governor` (Government) | C | `@seat` |
| `palace_government_complex` (Government) | M | `palace` |
| `royal_seat` (Government) | C | `palace` |
| `town_council` (Government) | W | `town_hall` |
| `village_elder` (Government) | V | `@seat` |
| `village_headman` (Government) | H | `@seat` |
| `village_reeve` (Government) | V | `@seat` |
| `advanced_water_infrastructure` (Infrastructure) | M | `conduit_house` |
| `aqueduct_or_water_system` (Infrastructure) | C | `conduit_house` |
| `city_hall` (Infrastructure) | C | `town_hall` |
| `communal_root_cellar` (Infrastructure) | T | `@none` |
| `courthouse` (Infrastructure) | W | `courthouse` |
| `dwellings_17_80` (Infrastructure) | H | `@housing` |
| `dwellings_4_16` (Infrastructure) | T | `@housing` |
| `dwellings_80_180` (Infrastructure) | V | `@housing` |
| `household_levy` (Infrastructure) | T | `@none` |
| `housing_1000_5000_structures` (Infrastructure) | C | `@housing` |
| `housing_180_1000_structures` (Infrastructure) | W | `@housing` |
| `large_prison` (Infrastructure) | C | `prison` |
| `massive_prison` (Infrastructure) | M | `prison` |
| `multiple_courthouses` (Infrastructure) | C | `courthouse` |
| `multiple_water_sources` (Infrastructure) | V,W | `@pin:well` |
| `palisade` (Infrastructure) | T | `@wall` |
| `sewage_system` (Infrastructure) | C | `@layer:sewer` |
| `small_prison_stocks` (Infrastructure) | W | `prison` |
| `town_hall` (Infrastructure) | W | `town_hall` |
| `water_source` (Infrastructure) | T,H | `@pin:well` |
| `workhouse` (Infrastructure) | C | `workhouse` |
| `academy_of_magic` (Magic) | M | `academy_of_magic` |
| `alchemist_quarter` (Magic) | C | `alchemist` |
| `alchemist_shop` (Magic) | W | `alchemist` |
| `druid_circle` (Magic) | V | `druid_grove` |
| `elder_grove_council` (Magic) | W | `druid_grove` |
| `enchanter_s_shop` (Magic) | C | `enchanter` |
| `great_library` (Magic) | M | `library` |
| `healer_divine_1st_level` (Magic) | V | `healer` |
| `hedge_wizard` (Magic) | V | `hedge_wizard` |
| `mages_district` (Magic) | M | `mage_tower` |
| `mages_guild` (Magic) | C | `mages_guild` |
| `planar_embassy` (Magic) | M | `planar_embassy` |
| `scroll_scribe` (Magic) | C | `scroll_scribe` |
| `teleportation_circle` (Magic) | W,C | `teleport_circle` |
| `traveling_hedge_wizard` (Magic) | H | `@none` |
| `warden_s_lodge` (Magic) | W | `hunting_lodge` |
| `wizard_s_tower` (Magic) | W,C | `mage_tower` |
| `adventurers_charter_hall` (Magic/Adventuring) | H,V,W | `adventurers_hall` |
| `access_to_parish_church` (Religious) | T,H | `@absent:church` |
| `almshouse` (Religious) | W | `almshouse` |
| `burial_ground` (Religious) | T,H | `cemetery` |
| `burial_grounds_and_charnel_house` (Religious) | C | `cemetery` |
| `cathedral_10_000_only` (Religious) | C | `cathedral` |
| `cemetery_network` (Religious) | M | `cemetery` |
| `foundling_home` (Religious) | C | `foundling_home` |
| `graveyard` (Religious) | V | `cemetery` |
| `great_cathedral` (Religious) | M | `cathedral` |
| `hospital_network` (Religious) | M | `hospital` |
| `major_hospital` (Religious) | C | `hospital` |
| `major_monasteries_5_10` (Religious) | M | `monastery` |
| `monastery_or_friary` (Religious) | W | `monastery` |
| `multiple_monasteries` (Religious) | C | `monastery` |
| `parish_burial_grounds` (Religious) | W | `cemetery` |
| `parish_church` (Religious) | V | `church` |
| `parish_churches_10_30` (Religious) | C | `church` |
| `parish_churches_2_5` (Religious) | W | `church` |
| `parish_churches_50_100` (Religious) | M | `church` |
| `priest_resident` (Religious) | V | `@office` |
| `small_hospital` (Religious) | W | `hospital` |
| `village_musician` (Religious) | V | `@none` |
| `wayside_shrine` (Religious) | T,H | `@pin:shrine` |


### 3.12 The ladder step types (`dossier.ladders`; item 108)

Every catalogue kind that stands for a greater tier of a lesser one, typed by what the step means on the map (item 108
(a)). *Source*: `ladder` and `subsumption` are SettlementForge's own pairs as item 108 quotes them (provenance
`sf:institutionLadders.js@5d699cc68`, item 534 — the owner's own program, never a reference); `inferred` pairs are read
from the catalogue's own tier names (a numbered plural of a singular kind, a "district" or "quarter" of a trade) and
re-checked by V08 against the ladder file when the port reads it (V08 §3.5; a disagreement is a table fix, reported). An
unnumbered COUNT, QUARTER or GUILD record's member range is the *range* column, which is the value at the kind's
**lowest tier** (V11 §3.11's tiers); `rungScale` multiplies it only at rungs above that tier — {CITY 2, METROPOLIS 3} for
a TOWN kind, {METROPOLIS 1.5} for a CITY kind, none for a METROPOLIS kind — so `multiple_court_buildings` (M) yields 4–10
courthouses at METROPOLIS, never 16–40. At a village rung (THORP, HAMLET, VILLAGE) an unnumbered record takes
V07 §2.4's range row (`village.json` `rules.ladders.ranges`) by V08 §3.5.1 (b)'s rule — keyed by step type and the class
that plays the member class, the qualifier the row's label (J-V7.105) — else this range unscaled. Every member count is S2's per-capita count of the member class clamped into the range (item 108
(b)); a numbered record's own range wins. **A COUNT whose member is a pin** (`@pin:<kind>`) sets a floor only: members =
max(the range's low end, the pin's own coverage count at the rung — V07 §3.10's well rows at village rungs, §4.7's
furniture step at base rungs), never clamped to the range's top, since a pin has no per-capita row (J-V11.61).
SIZE's factor multiplies the template's footprint and plot budget, σ's rank and, for a crypted class, `cryptM2`.
*identity* names the `QuarterIdentityRow` a QUARTER record claims (`LadderStepRow.identity`, V11 §3.10; T-V11-2). The
rows are never calibrated — `range`, `rungScale` and `sizeFactor` included, `inferred` rows too (§13.9 (7)); a change is a
table fix reviewed with V08.

| kind | step | lesser kinds | member class | range (unnumbered) or size | identity | source |
|---|---|---|---|---|---|---|
| `blacksmiths_3_10` | COUNT | blacksmith, resident_smith_part_time | smithy | (3–10) | — | ladder |
| `carpenters_5_15` | COUNT | carpenter, carpenter_part_time | carpenter | (5–15) | — | ladder |
| `bakers_5_15` | COUNT | — | bakery | (5–15) | — | inferred |
| `butchers_3_8` | COUNT | — | butcher | (3–8) | — | inferred |
| `tanners` | COUNT | tannery, tanner_established | tannery | 2–5 | — | inferred |
| `mills_2_5` | COUNT | mill | watermill | (2–5) | — | inferred |
| `taverns_5_20` | COUNT | ale_house, alehouse | tavern | (5–20) | — | inferred |
| `inn_multiple` | COUNT | travelers_inn, wayside_inn | inn | 2–6 | — | inferred |
| `parish_church` | REPLACEMENT | wayside_shrine | church | the shrine's pin kept as the churchyard cross (at a village rung V07 §3.10's pin-record rule lays the cross — at generation, when either record arrives, or when the shrine is promoted, V07 §3.12 *Records at a village epoch* — and the shrine record's key binds it as V08 §3.5.1 (c)–(d) state: where two keys meet it binds the cross, while a promotion by receipt re-points the one key to the church placed new and lays the cross for the record unbound, J-V8.114; at a base rung the shrine record's key aliases the church, V08 §3.5.1 (c)) | — | ladder |
| `parish_churches_2_5` | COUNT | parish_church | church | (2–5) | — | ladder |
| `parish_churches_10_30` | COUNT | parish_churches_2_5 | church | (10–30) | — | ladder |
| `parish_churches_50_100` | COUNT | parish_churches_10_30 | church | (50–100) | — | inferred |
| `craft_guilds_5_15` | COUNT | — | guildhall | (5–15) | — | ladder |
| `craft_guilds_30_80` | COUNT | craft_guilds_5_15 | guildhall | (30–80) | — | ladder |
| `craft_guilds_100_150` | COUNT | craft_guilds_30_80, craft_guilds_5_15 | guildhall | (100–150), open top | — | subsumption |
| `merchant_guilds_3_8` | COUNT | — | guildhall | (3–8) | — | ladder |
| `merchant_guilds_15_40` | COUNT | merchant_guilds_3_8 | guildhall | (15–40) | — | ladder |
| `merchant_guilds_50_100` | COUNT | merchant_guilds_15_40, merchant_guilds_3_8 | guildhall | (50–100), open top | — | subsumption |
| `theaters` | REPLACEMENT | traveling_performers | theatre | the players settle in the playhouse | — | ladder |
| `multiple_theaters` | COUNT | theaters | theatre | 3–8 | — | ladder |
| `multiple_courthouses` | COUNT | courthouse | courthouse | 2–5 | — | ladder |
| `multiple_court_buildings` | COUNT | multiple_courthouses | courthouse | 4–10 | — | inferred |
| `multiple_garrisons` | COUNT | garrison | barracks | 2–5 | — | inferred |
| `multiple_monasteries` | COUNT | monastery_or_friary | monastery | 2–5 | — | inferred |
| `major_monasteries_5_10` | COUNT | multiple_monasteries | monastery | (5–10) | — | inferred |
| `hospital_network` | COUNT | almshouse, foundling_home | hospital (a merged almshouse or foundling-home record binds one member built as its own class) | 3–8 | — | ladder |
| `banking_houses` | COUNT | money_changers, pawnbroker | bank | 2–6 | — | ladder |
| `gambling_halls` | COUNT | gambling_den | gambling_house | 2–6 | — | ladder |
| `district_markets_5_10` | COUNT | multiple_market_squares, daily_markets | market (secondary) | (5–10) | — | inferred |
| `multiple_adventurers_guilds` | COUNT | adventurers_charter_hall, hireling_hall | adventurers_hall | 2–4 | — | ladder |
| `multiple_criminal_factions` | COUNT | street_gang | gang_hideout | 2–5 | — | ladder |
| `multiple_water_sources` | COUNT | water_source | `@pin:well` (members are well pins, §4.7's furniture step; V07 §3.10 at village rungs) | at least 2 (a floor over the wells' own coverage count) | — | ladder |
| `parish_burial_grounds` | COUNT | graveyard, burial_ground | the burial faces: the `churchyard` part of each church plot, `v.parish_church`'s at a village rung (one per churchyard, V08 §2.6a (3)); a `cemetery` plot where no church stands | one member per church plot, at least 1 | — | inferred |
| `graveyard` | REPLACEMENT | burial_ground | — | the burial ground's face re-bound as the graveyard's | — | inferred |
| `cemetery_network` | COUNT | — | cemetery | one member per gate on a through route (S3's gates), at least 2; each member `extramural` soft 0.6 and `nearGate` within 400 soft 0.5 through §7.7's `PlacementCriteria` | — | inferred (SettlementForge's 'burial beyond every gate') |
| `apothecary_district` | QUARTER | apothecary_established, apothecary | apothecary | 4–10 | `apothecary-district` | ladder |
| `alchemist_quarter` | QUARTER | alchemist_shop | alchemist | 3–8 | `alchemist-quarter` | ladder |
| `luxury_goods_quarter` | QUARTER | jeweller | goldsmith | 4–10 | `luxury-quarter` | subsumption |
| `stable_district` | QUARTER | stable_master, stable_yard | livery_stable | 3–8 | `stable-district` | subsumption |
| `warehouse_district` | QUARTER | merchant_warehouses | warehouse | 6–15 | `warehouse-district` | inferred |
| `inns_and_taverns_district` | QUARTER | inn_multiple, taverns_5_20 | inn (and tavern members at 2 : 1) | 6–15 | `inns-district` | inferred |
| `banking_district` | QUARTER | banking_houses, pawnbroker | bank | 4–10 | `banking-district` | ladder |
| `mages_district` | QUARTER | wizard_s_tower, mages_guild, alchemist_shop, alchemist_quarter | mage_tower | 2–5 | `mages-district` | ladder |
| `gambling_district` | QUARTER | gambling_halls, gambling_den | gambling_house | 4–10 | `gambling-district` | ladder |
| `brothel_red_light_district` | QUARTER | brothel | brothel | 4–10 | `red-light` | inferred |
| `red_light_district` | QUARTER | brothel | brothel | 4–10 | `red-light` | inferred |
| `furrier_s_district` | QUARTER | — | furrier | 3–8 | `furriers-quarter` | inferred |
| `slave_market_district` | QUARTER | slave_market | slave_market | 2–4 | `slave-market-district` | ladder |
| `sage_s_quarter` | QUARTER | — | sage_house | 3–8 | `sages-quarter` | inferred |
| `dungeon_delving_supply_district` | QUARTER | bowyers_fletchers_guild | outfitter | 3–8 | `delvers-district` | ladder |
| `mercenary_quarter` | QUARTER | free_company_hall, hired_blades | mercenary_hall | 2–6 | `mercenary-quarter` | inferred |
| `bowyers_fletchers_guild` | GUILD | bowyer_fletcher | bowyer | 3–8 | — | ladder |
| `cobbler_s_guild` | GUILD | cobbler | cobbler | 4–12 | — | subsumption |
| `tailor_s_guild` | GUILD | tailor | tailor | 4–12 | — | subsumption |
| `carriers_guild` | GUILD | carriers_hiring_hall | carrier_yard | 3–8 | — | ladder |
| `caravan_masters_exchange` | GUILD | carriers_guild | carrier_yard | 4–10 | — | ladder |
| `cartographer_s_guild` | GUILD | cartographer_s_workshop | cartographer | 2–5 | — | ladder |
| `brewery` | SIZE | brewer | — | × 1.6 | — | subsumption |
| `apothecary_established` | SIZE | apothecary | — | × 1.3 | — | ladder |
| `tanner_established` | SIZE | tannery | — | × 1.4 | — | inferred |
| `sawmill_commercial` | SIZE | sawmill | — | × 1.5 | — | inferred |
| `city_granaries` | SIZE | town_granary | — | × 2.5 (one compound of several stores) | — | ladder |
| `state_granary_complex` | SIZE | city_granaries | — | × 4 | — | inferred |
| `major_hospital` | SIZE | small_hospital, almshouse | — | × 2 | — | ladder |
| `wizard_s_tower` | REPLACEMENT | hedge_wizard, traveling_hedge_wizard | mage_tower | the wise one's house becomes the tower | — | ladder |
| `mages_guild` | REPLACEMENT | wizard_s_tower | mages_guild | the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case) | — | ladder |
| `garrison` | SIZE | barracks | — | × 1.8 | — | ladder |
| `city_hall` | SIZE | town_hall | — | × 1.6 | — | ladder |
| `city_administration`, `city_state_government` | SIZE | town_council, mayor_and_council | — | × 1.6 | — | inferred |
| `palace_government_complex` | SIZE | royal_seat | — | × 1.5 | — | inferred |
| `guild_consortium` | SIZE | guild_governance | — | × 1.5 | — | inferred |
| `shipyard` | SIZE | river_boatyard | — | × 3 | — | ladder |
| `coaching_inn` | SIZE | travelers_inn | — | × 1.5 | — | inferred |
| `great_cathedral` | SIZE | cathedral_10_000_only | — | × 1.4 | — | inferred |
| `burial_grounds_and_charnel_house` | SIZE | graveyard, burial_ground, parish_burial_grounds | — | × 2 (its `burial-ground` template's charnel house required) | — | inferred |
| `large_prison` | SIZE | small_prison_stocks | — | × 2 | — | ladder |
| `massive_prison` | SIZE | large_prison, small_prison_stocks | — | × 3.5 | — | inferred |
| `citadel` | SIZE | — | — | × 1.5 (a castle) | — | inferred |
| `black_market_bazaar` | SIZE | black_market | — | × 2 | — | inferred |
| `thieves_guild_powerful` | SIZE | thieves_guild_chapter, black_market_bazaar, contract_killer | — | × 1.5 | — | ladder |
| `mint_official` | SIZE | mint, assay_office | — | × 1.3 | — | ladder |
| `major_annual_fairs` | SIZE | annual_fair | — | × 2 | — | inferred |
| `international_trade_center` | SIZE | caravan_masters_exchange, caravaneer_s_post | — | × 2 (a market hall) | — | ladder |
| `elder_grove_council` | SIZE | druid_circle | — | × 2 | — | inferred |
| `advanced_water_infrastructure` | SIZE | aqueduct_or_water_system | — | × 1.5 per member | — | inferred |
| `town_watch` | REPLACEMENT | citizen_militia | guard_post | the militia had no post (`@none`); the watch builds its posts (at a village rung `v.watchtower`, V11 §3.22) | — | ladder |
| `professional_city_watch` | REPLACEMENT | town_watch | guard_post | the town watch's posts become the city watch's | — | ladder |
| `town_walls` | REPLACEMENT | palisade_or_earthworks, palisade | `@wall` | stone ring replaces the palisade | — | ladder |
| `city_walls_and_gates` | REPLACEMENT | town_walls, gates_if_walled | `@wall` | as above | — | ladder |
| `massive_walls_and_fortifications` | REPLACEMENT | city_walls_and_gates | `@wall` | as above | — | inferred |
| `cathedral_10_000_only` | REPLACEMENT | parish_church, priest_resident, wayside_shrine | — | the lesser absorbed; the parish churches of a numbered record stay | — | subsumption |
| `fish_market` | REPLACEMENT | fishmonger | — | the fishmongers trade in the hall | — | subsumption |

A kind absent from this table is no step (a plain record). A COUNT's members are keyed `#k` (J-A74.73), a QUARTER
record owns its district's members of the class and, by the class's ordinary spread (item 107), members outside it; a
GUILD record is one `guildhall` (the trade's hall) plus a collective of the trade's members tied to it — its hall bound
into a guild COUNT record of the same dossier by V08 §3.5.1 (c)'s family rule (J-V8.83), never a further hall (item 108
(c)); SIZE is one building; REPLACEMENT
keeps only the greater (item 108 (a)); no double counting (item 108 (c)). A `cemetery_network` record's members are
burial faces (V04 §3.5.1's candidates; at METROPOLIS the first in the catacomb order, V11 §3.23.8). The burial ladder
across 1 500 people: `burial_ground` (T, H) → `graveyard` (V) → `parish_burial_grounds` (W, a COUNT of the church
plots' churchyards) → `burial_grounds_and_charnel_house` (C, SIZE); so a tier change is never a closure — V08 §2.6a (4)
re-binds the lesser's face to the greater's key (the churchyard keeps its lineage and its opening year, which V07 §3.12
step 6 carries across the hand-off), and no churchyard is bound to two records.

**V08's re-check against the ladder file** (V08 §3.5.1 (f)) holds in the table: the rows the file holds are `ladder`
or `subsumption`, `hospital_network`'s and `dungeon_delving_supply_district`'s lessers are the file's, and every pair the
file holds is a row (among them `parish_church`, `multiple_water_sources`, `theaters`, `wizard_s_tower`, `mages_guild`,
`caravan_masters_exchange`, `major_hospital`'s almshouse). The rows the file
lacks but the dossiers carry in both forms (`parish_churches_50_100`, `multiple_monasteries`, `major_monasteries_5_10`,
`great_cathedral`, `burial_grounds_and_charnel_house` and the other `inferred` rows) stay `inferred`: item 108 (c) must
merge them whatever the file says. **The remaining file pairs** — `academy_of_magic`, `assassins_guild`, `auction_house`,
`gladiatorial_school`, `printing_house`, `great_library`, `specialized_metalworkers`, `caravaneer_s_post`,
`chroniclers_exchange`, `whisper_market`, `black_market` and `thieves_guild_chapter` over their lessers — are typed
by the one rule for a greater kind whose class is a single institution (`sing`, or `disp` with one record): **SIZE × 1.5,
member none**, except `specialized_metalworkers`, a collective of the `metalworks` class: **COUNT 2–5**; their `lesser`
cells come from the ladder file itself, which V08's build step commits as `dossier.catalogue`'s `ladderPairs` (registry
row 77), and the compiler cross-checks every committed pair against this table (T-V11-2): a pair with no row fails the
build, so the author of C4 writes each lesser list from the committed data, never from memory. Before C4 lands, a dossier
carrying both forms of one of these pairs places both, noted `ladder_unknown` by V08 §3.5.1 (b).

**Pairs whose greater kind the line does not catalogue** (no row; the port reports `uncatalogued_step` if a dossier ever
carries one): `major port` over `docks_port_facilities`, `river_boatyard` and `river_ferry`. A further such pair in
`ladderPairs` joins this list by the same cross-check.

### 3.13 Custom content — item 104's rows and the custom-chain placement rules

The `siting.custom` rows (V11 §3.13.1, §3.13.4; registry row 37) are calibratable like every siting row; the dossier row
sets of this section — `dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords` (their weights included) and
`dossier.goodWords` (registry row 65) — are **never calibrated** (§13.9 (7)): their columns carry `calibratable: false`,
and a change is a table fix reviewed with V08 (J-V11.65).

**3.13.1 The resolution weights** (`siting.custom`; the resolver of item 104 (a) is the base's; these are its weights;
`own`, `extension`). Each source contributes a profile or deltas with the weight below; the weights ORDER
the sources and never scale a level: a nuisance or sensitivity level is taken from the strongest-ranked source that
states it (so a category-only tannery keeps its family's smell 3); needs and alignments are the union, the stronger source
winning a conflict; clientele and competition are the strongest source's value; every contribution is stored with the
use (the clerk's "why"):

| rung | source | weight | what it gives |
|---|---|---|---|
| 1 | the author's map-side declaration (item 101) | overrides | the kind's `siting.declared` row (profile cells, family weights, a quarter, an area; V11 §4.2) and, for one institution, §7.7's assignment (a place or a pin); never written to the dossier |
| 2 | `sceneProfileId` → `dossier.archetypes` (V11 §3.13.2) | 1.0 | the archetype's class and family profile |
| 3 | `category` → V08's `categories` rows, then `dossier.categorySynonyms` (V11 §3.13.2) | 0.7 | the category family's profile |
| 4 | `tags` → V08's `tags` rows → the family profiles (V11 §3.4) as deltas | 0.5 each, ≤ 4 tags counted | nuisance, needs, alignment deltas |
| 5 | the optional definition fields (V08's `custom-def` facts): `authority` (any non-empty value) → alignment law + and status +; `defenseRole` by its words — `garrison`, `militia` → `garrison`; `watch`, `patrol`, `police` → `watch`; `wall`, `fort`, `tower` → `fortification`; any other word → `garrison`, noted `unmapped_word` — as that family's deltas; `criminal` → family `criminal`, concealment weights of V11 §3.14.1's generic row; `magical` → family `arcane`; `foodImpact: produces` → need `fields` and clientele townWide; `economicWeight` → σ × (minor 0.5, moderate 1, major 1.5, backbone 2) and link volume (V11 §3.7.4) | 0.6 | as listed |
| 6 | keywords of name and description → `dossier.keywords` | the row's weight (≤ 0.5), flagged low-confidence | a family's deltas |
| 7 | fallback | — | `generic-other` (V11 §3.4's `other` row); `landmarkLevel: landmark` sets `landmark: true` |

**3.13.2 The scene archetypes** (`dossier.archetypes`; exactly the 17 ids of SettlementForge's manifest, T-V8-25). The
`village` column is each row's optional `ArchetypeVillageCell` (V11 §2.8; V08 §2.6's shape carries it): V07
§2.4's village readings (J-V7.78), cited — V07's values, written here as data so one row serves both products — and read
at village rungs BEFORE the class's `villageForm` (V11 §3.22), so an archetype reaches the village row V07 names even
where the town class has no village form or another one (T-V7-21 reads it):

| archetype | class | family | notes | village (V07 §2.4) |
|---|---|---|---|---|
| `agrarian-farmstead` | `farmstead` | farming | outside plot where the settlement has a hinterland unit; else the edge | class `v.farmstead` |
| `agrarian-mill` | `watermill` (`windmill` without a watermill site) | food | running water hard for the watermill | class `v.watermill`, elseClass `v.windmill` |
| `civic-archive` | `archive` | civic-authority | centre, main street | class `v.reeve_house` |
| `civic-hall` | `town_hall` | civic-authority | centre, main street | class `v.reeve_house` |
| `domestic-house` | `house` | housing | residential | class `v.cottage` |
| `exotic-tower` | `mage_tower` | exotic | its own ground, apart: `far` → `#housing` 60 soft | class `v.watchtower`; delta `S+ noise 2` plus the authored row `far` → `#housing` 60 soft (full beyond 60 m, V11 §3.5.2's reading; the town archetype's own row); composition V02's `tower` family at its `exotic` look |
| `industrial-forge` | `smithy` | metalwork | fire gap from thatch-dense housing (the fire family) | class `v.smithy` |
| `industrial-workshop` | `workshop` | craft | — | class `v.potter`; delta `N− deposit` (a craft workshop on the through road, with no clay pit of its own) |
| `martial-barracks` | `barracks` | garrison | walls, gates | class `v.watchtower`; delta `N+ space` (a yard of 400 m²), `clientele dailyLocal` |
| `martial-keep` | `tower_house` | fortification | high ground | class `v.manor_house`; composition the `tower_house` class's key; delta `alignment law +` |
| `martial-watchtower` | `watchtower` | fortification | walls, gates, high ground | class `v.watchtower` |
| `mercantile-guildhall` | `guildhall` | guild-hall | — | class `v.reeve_house` (the reeve's row) |
| `mercantile-inn` | `inn` | lodging | gates, main roads, bridges, quays | class `v.inn`, elseClass `v.alehouse` (no through road) |
| `mercantile-market` | `market_hall` | market | market square frontage | pin `@pin:market_cross`, placed with its stalls by V07 §3.10's pin-record rule |
| `ruined-landmark` | `generic-other` | other | built in the `ruined` existence at its site, "as found" (§2.8); a ruin existence source of chance 1 (V11 §3.23.2), its site the ruin's centre and its surface marker | ruin: the ruin decoration and the ruin system's source (V07 §3.16) |
| `sacred-sanctuary` | `church` | worship | square or parish centre, quiet | class `v.chapel` |
| `sacred-shrine` | `chapel` | worship | at a square or road edge | pin `@pin:shrine` |

**Category synonyms** (`dossier.categorySynonyms`; free text case-folded, matched whole; `group` a V08 `categories` key;
the optional `family` cell — carried by V08 §2.6's shape — wins over the group's family when set, so a category-only
custom farm is sited as a farm, not a shop):
`commerce`, `trade`, `mercantile`, `merchant`, `market`, `shop`, `food` → Economy; `agriculture`, `farming` → Economy,
family `farming`; `craft`, `artisan`, `production`, `workshop` → Crafts; `industry`, `industrial`, `manufacturing` →
Crafts, family `industry`; `religion`, `temple`, `faith`, `church`, `holy`, `sacred` → Religious; `military`, `defense`,
`defence`, `martial`, `fortification` → Defense; `guard` → Defense, family `watch`; `government`, `civic`,
`administration`, `politics` → Government; `law`, `legal` → Government, family `law-court`; `crime`, `underworld`,
`illicit`, `thieves` → Criminal; `magic`, `magical`, `arcane`, `mystic`, `occult` → Magic; `leisure`, `social`,
`recreation`, `tavern` → Entertainment; `utility`, `public works`, `transport` → Infrastructure; `water` →
Infrastructure, family `water-supply`; `adventure`, `adventurers`, `quest` → Adventuring; `strange`, `wondrous`,
`planar` → Exotic. (One row each; our own words.)

**The keyword table** (`dossier.keywords`; item 104 (a) (6): the weakest signal, weight ≤ 0.5, our own vocabulary —
single tokens of three or more letters and a few two-token phrases, matched whole on the case-folded name and
description; a hit is reported low-confidence). The row shape is V08 §2.6's `{ key, family, weight }` with its four
OPTIONAL cells, whose effects are these: `near?: { cls; withinM; weight }` (an authored soft `near`
row at the keyword's rank — item 104's resolver reads it like any authored row), `class?` (the record's class when the
resolver's own rungs 1–5 give none stronger: a custom lighthouse is then a `lighthouse`, not a yard), `specialisation?`
(V11 §3.24.3's id, taken like a declared one — exempt from the chance and the cap, held, reported low-confidence — when
the record's resolved class carries that specialisation in some culture row, or is `generic-worship`), and `binds?:
'cryptAlways'` (the record's building takes `crypt: always`, V11 §3.5.8). The plain rows:

| key | family | weight |
|---|---|---|
| `temple` | `worship` | 0.5 |
| `shrine` | `worship` | 0.5 |
| `chapel` | `worship` | 0.5 |
| `church` | `worship` | 0.5 |
| `abbey` | `worship` | 0.4 |
| `priory` | `worship` | 0.4 |
| `altar` | `worship` | 0.3 |
| `sanctum` | `worship` | 0.3 |
| `oratory` | `worship` | 0.4 |
| `monastery` | `monastic` | 0.5 |
| `friary` | `monastic` | 0.5 |
| `convent` | `monastic` | 0.5 |
| `cloister` | `monastic` | 0.4 |
| `hospital` | `healing` | 0.5 |
| `infirmary` | `healing` | 0.5 |
| `healer` | `healing` | 0.4 |
| `physic` | `healing` | 0.4 |
| `surgeon` | `healing` | 0.4 |
| `apothecary` | `healing` | 0.5 |
| `remedy` | `healing` | 0.3 |
| `school` | `school` | 0.5 |
| `academy` | `school` | 0.4 |
| `college` | `school` | 0.4 |
| `library` | `school` | 0.4 |
| `scriptorium` | `school` | 0.4 |
| `archive` | `school` | 0.3 |
| `court` | `law-court` | 0.4 |
| `justice` | `law-court` | 0.4 |
| `magistrate` | `law-court` | 0.4 |
| `tribunal` | `law-court` | 0.4 |
| `watch` | `watch` | 0.4 |
| `constable` | `watch` | 0.4 |
| `watch house` | `watch` | 0.5 |
| `barracks` | `garrison` | 0.5 |
| `garrison` | `garrison` | 0.5 |
| `armoury` | `garrison` | 0.4 |
| `soldiers` | `garrison` | 0.3 |
| `keep` | `fortification` | 0.3 |
| `bastion` | `fortification` | 0.4 |
| `rampart` | `fortification` | 0.4 |
| `citadel` | `fortification` | 0.5 |
| `council` | `civic-authority` | 0.4 |
| `moot` | `civic-authority` | 0.4 |
| `chancery` | `civic-authority` | 0.4 |
| `town hall` | `civic-authority` | 0.5 |
| `guild` | `guild-hall` | 0.4 |
| `guildhall` | `guild-hall` | 0.5 |
| `guild hall` | `guild-hall` | 0.5 |
| `market` | `market` | 0.5 |
| `bazaar` | `market` | 0.5 |
| `exchange` | `market` | 0.3 |
| `fair` | `market` | 0.3 |
| `stall` | `market` | 0.3 |
| `shop` | `trade` | 0.3 |
| `emporium` | `trade` | 0.4 |
| `merchant` | `trade` | 0.4 |
| `trader` | `trade` | 0.4 |
| `dealer` | `trade` | 0.3 |
| `bank` | `finance` | 0.5 |
| `moneylender` | `finance` | 0.5 |
| `treasury` | `finance` | 0.4 |
| `counting house` | `finance` | 0.5 |
| `jeweller` | `luxury` | 0.5 |
| `jewels` | `luxury` | 0.3 |
| `perfumer` | `luxury` | 0.4 |
| `silks` | `luxury` | 0.3 |
| `forge` | `metalwork` | 0.5 |
| `smith` | `metalwork` | 0.5 |
| `smithy` | `metalwork` | 0.5 |
| `anvil` | `metalwork` | 0.4 |
| `foundry` | `metalwork` | 0.5 |
| `armourer` | `metalwork` | 0.4 |
| `tannery` | `leatherwork` | 0.5 |
| `tanner` | `leatherwork` | 0.5 |
| `leather` | `leatherwork` | 0.4 |
| `hides` | `leatherwork` | 0.3 |
| `weaver` | `textile` | 0.5 |
| `loom` | `textile` | 0.4 |
| `dyer` | `textile` | 0.5 |
| `dyeworks` | `textile` | 0.5 |
| `fuller` | `textile` | 0.5 |
| `cloth` | `textile` | 0.3 |
| `wool` | `textile` | 0.3 |
| `lumber` | `timber-yard` | 0.4 |
| `timber` | `timber-yard` | 0.4 |
| `sawmill` | `timber-yard` | 0.5 |
| `shipyard` | `shipyard` | 0.5 |
| `boatyard` | `shipyard` | 0.5 |
| `slipway` | `shipyard` | 0.4 |
| `shipwright` | `shipyard` | 0.5 |
| `farm` | `farming` | 0.5 |
| `barn` | `farming` | 0.4 |
| `orchard` | `farming` | 0.4 |
| `vineyard` | `farming` | 0.4 |
| `dairy` | `farming` | 0.4 |
| `apiary` | `farming` | 0.4 |
| `pasture` | `farming` | 0.4 |
| `bakery` | `food` | 0.5 |
| `baker` | `food` | 0.5 |
| `butcher` | `food-works` | 0.5 |
| `brewery` | `food-works` | 0.5 |
| `brewer` | `food-works` | 0.5 |
| `cookhouse` | `food` | 0.4 |
| `mill` | `food` | 0.4 |
| `winery` | `food` | 0.4 |
| `mine` | `extraction` | 0.5 |
| `quarry` | `extraction` | 0.5 |
| `excavation` | `extraction` | 0.3 |
| `diggings` | `extraction` | 0.4 |
| `kiln` | `industry` | 0.4 |
| `furnace` | `industry` | 0.4 |
| `smelter` | `industry` | 0.5 |
| `glassworks` | `industry` | 0.5 |
| `works` | `industry` | 0.2 |
| `warehouse` | `warehouse` | 0.5 |
| `depot` | `warehouse` | 0.4 |
| `storehouse` | `warehouse` | 0.5 |
| `dock` | `port` | 0.5 |
| `docks` | `port` | 0.5 |
| `harbour` | `port` | 0.5 |
| `harbor` | `port` | 0.5 |
| `wharf` | `port` | 0.5 |
| `quay` | `port` | 0.5 |
| `pier` | `port` | 0.4 |
| `stable` | `transport` | 0.4 |
| `stables` | `transport` | 0.4 |
| `coach` | `transport` | 0.4 |
| `caravan` | `transport` | 0.4 |
| `ferry` | `transport` | 0.4 |
| `carter` | `transport` | 0.4 |
| `relay` | `transport` | 0.3 |
| `inn` | `lodging` | 0.5 |
| `tavern` | `lodging` | 0.5 |
| `alehouse` | `lodging` | 0.5 |
| `hostel` | `lodging` | 0.4 |
| `hostelry` | `lodging` | 0.5 |
| `theatre` | `entertainment` | 0.5 |
| `theater` | `entertainment` | 0.5 |
| `arena` | `entertainment` | 0.5 |
| `circus` | `entertainment` | 0.4 |
| `gambling` | `entertainment` | 0.5 |
| `brothel` | `entertainment` | 0.5 |
| `opera` | `entertainment` | 0.5 |
| `bath house` | `entertainment` | 0.4 |
| `wizard` | `arcane` | 0.5 |
| `mage` | `arcane` | 0.5 |
| `sorcerer` | `arcane` | 0.5 |
| `enchanter` | `arcane` | 0.5 |
| `arcane` | `arcane` | 0.5 |
| `magic` | `arcane` | 0.4 |
| `spell` | `arcane` | 0.4 |
| `runes` | `arcane` | 0.3 |
| `mage tower` | `arcane` | 0.5 |
| `alchemist` | `alchemy` | 0.5 |
| `alchemy` | `alchemy` | 0.5 |
| `potion` | `alchemy` | 0.4 |
| `elixir` | `alchemy` | 0.4 |
| `portal` | `planar` | 0.5 |
| `planar` | `planar` | 0.5 |
| `embassy` | `planar` | 0.3 |
| `dragon` | `exotic` | 0.5 |
| `golem` | `exotic` | 0.5 |
| `airship` | `exotic` | 0.5 |
| `thieves` | `criminal` | 0.5 |
| `thief` | `criminal` | 0.5 |
| `hideout` | `criminal` | 0.5 |
| `gang` | `criminal` | 0.5 |
| `assassin` | `criminal` | 0.5 |
| `assassins` | `criminal` | 0.5 |
| `rookery` | `criminal` | 0.4 |
| `smuggler` | `smuggling` | 0.5 |
| `smugglers` | `smuggling` | 0.5 |
| `contraband` | `smuggling` | 0.5 |
| `smuggling` | `smuggling` | 0.5 |
| `spy` | `information` | 0.5 |
| `spies` | `information` | 0.5 |
| `informant` | `information` | 0.4 |
| `whisper` | `information` | 0.3 |
| `latrine` | `sanitation` | 0.5 |
| `privy` | `sanitation` | 0.5 |
| `sewer` | `sanitation` | 0.5 |
| `cesspit` | `sanitation` | 0.4 |
| `well` | `water-supply` | 0.3 |
| `fountain` | `water-supply` | 0.4 |
| `cistern` | `water-supply` | 0.5 |
| `aqueduct` | `water-supply` | 0.5 |
| `conduit` | `water-supply` | 0.5 |
| `almshouse` | `welfare` | 0.5 |
| `orphanage` | `welfare` | 0.5 |
| `poorhouse` | `welfare` | 0.5 |
| `workhouse` | `welfare` | 0.5 |
| `charity` | `welfare` | 0.4 |
| `cottage` | `housing` | 0.4 |
| `tenement` | `housing` | 0.4 |
| `dwelling` | `housing` | 0.4 |
| `manor` | `housing` | 0.3 |
| `adventurer` | `adventuring` | 0.5 |
| `adventurers` | `adventuring` | 0.5 |
| `mercenary` | `adventuring` | 0.4 |
| `hireling` | `adventuring` | 0.4 |
| `delvers` | `adventuring` | 0.4 |
| `tunnel` | `underground` | 0.4 |
| `undercroft` | `underground` | 0.4 |
| `cellar` | `underground` | 0.3 |
| `bridge` | `infrastructure` | 0.3 |
| `toll` | `infrastructure` | 0.4 |
| `clocktower` | `infrastructure` | 0.4 |

The rows with optional cells (`own`):

| key | family | weight | near | class | specialisation | binds |
|---|---|---|---|---|---|---|
| `catacomb`, `catacombs`, `ossuary`, `charnel` | `underground` | 0.5 | `cemetery` within 150, soft 0.5 | — | — | — |
| `crypt` | `worship` | 0.5 | — | — | — | `cryptAlways` |
| `ziggurat` | `worship` | 0.5 | — | — | `stepped_temple` | — |
| `pyramid` | `worship` | 0.3 | — | — | `stepped_temple` | — |
| `pagoda` | `worship` | 0.4 | — | — | `tiered_tower` | — |
| `lighthouse` | `infrastructure` | 0.5 | — | `lighthouse` | — | — |
| `fort` | `garrison` | 0.4 | — | `fort` | — | — |
| `viaduct` | `infrastructure` | 0.3 | — | — | — | — |
| `mole`, `jetty`, `breakwater`, `causeway` | `port` | 0.3 | — | — | — | — |

A keyword hit never raises arches: a custom record named "viaduct" or "aqueduct" is a building of its family, and a raised
way on a town map comes only from V11 §3.24.2's rows at CITY and METROPOLIS or a declaration (item 110 (b)).

**3.13.3 The generic classes.** For every non-alias profile family `f` of V11 §3.4 the compiler emits `generic-<f>` (an
alias, `civic` or `defence`, resolves to its target's generic class, V11 §3.4): `family` f,
`template` the family's *gen.* template family, `distribution` `dispersed` (`singular` when the resolved profile has
`landmark`), σ 1 (× 2 for a landmark), roster `dos`, powers and sectors from V11 §3.15's family defaults, `drain` by
the family default (V11 §3.5.1), and the display cells (V11 §2.3; J-V11.95): `label`
the family's `label` (V11 §3.4's *Display words*: `generic-worship` "place of worship", `generic-other` "building"),
`icon` the family's, `synonyms` [] and `commonness` 0 (a typed word reaches a generic class only when no authored row
matches, V09 §4.16 (3)). These are DR24's category fallbacks (V08 §2.6) and item 104 (a) (7)'s fallback
(`generic-other`).

**3.13.4 The custom-chain placement rules** (`siting.custom`; item 104 (h), revised by item 107 (e); read by S10b's
flow-order placement, the base's (item 104 (h)); `own`, `extension`, calibratable):

| rule | cell | default | what it does |
|---|---|---|---|
| resource site | `resourceSite` | water → the river or coast within 100 m of the chain's first processor's district; land → the hinterland land use of its good (V11 §3.7.1 `site`); subterranean → a mine or quarry at the hinterland edge; special → a `DepositSite` of its resource row | a missing feature is created as a map feature (a `LandUse` face or a `DepositSite`) sized `featureHaPerVolume` 2 ha × volume; a water resource on a site with no river, stream or coast becomes a `well` pin with a spring decoration beside the chain's first processor, never a created river |
| first processor | `firstProcessor` | `near` → its resource node within 400, beyond 1 500, weight 0.8; plus `extramural` 0.5 when it emits any nuisance ≥ 2 | by the resource or on the road between it and the town |
| later processor | `stepInward` | satisfaction 1 when `dist.market(plot) ≤ dist.market(upstream node) − 100 m`, falling to 0 at `+ 200 m`; weight 0.5 | each step a step further in |
| final seller | `finalSeller` | `nearMarket` within 150, beyond 600, weight 0.6; or its consumers' weighted centre (the supply web's reverse pull) when they are institutions | on a street feeding a market |
| compatibility | `compatible` | two in-town nodes are compatible when neither emits a nuisance at ≥ 2 that the other is sensitive to at ≥ 2 | compatible: every link's `comfortM` plateau is the target (street scale); incompatible: the noxious nodes take `extramural` 0.5, the clean ones `intramural` 0.3, still flow-ordered |
| quarter | — | never assigned (item 107 (e)); named a working quarter only past §4.5 (4)'s identity threshold or by a declaration | J-A72.46 holds |
| services | `serviceSite` | a `providedBy` service is a `SubLocation` of its provider; when its template needs a plot, `adjacent` → the provider, hard | inside or beside its provider |
| subsumption | `subsumeGrowth` | the subsuming institution's plot budget × (1 + 0.5 × the subsumed count), one site | a larger compound, never a second site |
| trade endpoints | `endpointStore` | the store is the nearest existing warehouse within 300 m of the gate or quay facing the partner's bearing (items 77, 85), else a new `warehouse` use placed there (`nearGate` or `nearHarbour` 300 hard); the importing consumer `near` → that store 0.5; at village rungs V07 §3.11's entry store (J-V7.29): a `store` use on the existing plot facing the partner (the inn at its entry, else the landing, else the nearest farmstead's barn), never a new warehouse use | imports and exports through a store at the facing gate or quay |
| volume | `volume` | V11 §3.7.4's `volume` row | link strength by volume |
| inactive chain | — | pulls nothing; nodes keep their sites (V06 §3.9.8) | item 104 (h) (7) |

**3.13.5 Good words** (`dossier.goodWords`, V11's own `GoodWordRow` of V11 §2.8 — this section's matching rule is its
reader — a row set V08's adapter reads to resolve SettlementForge's `activeChains[].outputs`, the dossier's export,
import, local-production and transit lists, and a custom chain's goods to V11 §3.7.1's goods; our own words). **The
matching rule** (a pure function, J-V11.26): a label is
tokenised on every non-letter and case-folded ("Fish & Preserved Produce" → `fish`, `preserved`, `produce`); each token
and each adjacent token pair is matched whole against the rows' words; the label yields EVERY good it matches, in the
table's row order, each once; a label matching none resolves to `import`, reported `unmapped_good` with the label, and the
compiler's manifest lists every unmatched label met in the frozen fixtures (T-V11-29: at least 95 % of label occurrences
in the 155 frozen dossiers match a good). V11 §3.7.1 holds no yarn good, so yarn's words resolve to `wool`:

| words | good |
|---|---|
| `grain`, `wheat`, `barley`, `rye`, `oats` | grain |
| `flour`, `meal` | flour |
| `malt` | malt |
| `bread` | bread |
| `ale`, `beer` | beer |
| `cattle`, `sheep`, `pigs`, `livestock`, `horses` | livestock |
| `meat`, `beef`, `pork`, `mutton` | meat |
| `hides`, `skins` | hides |
| `leather` | leather |
| `furs`, `pelts` | pelts |
| `bark` | bark |
| `wool`, `yarn`, `thread` | wool |
| `cloth`, `linen`, `textiles`, `fabric` | cloth |
| `dye`, `dyes`, `woad`, `madder` | dyestuff |
| `hemp`, `flax` | hemp |
| `rope`, `cordage` | rope |
| `logs`, `lumber`, `wood` | logs |
| `timber`, `beams` | timber |
| `planks`, `boards` | planks |
| `firewood`, `fuel` | firewood |
| `charcoal` | charcoal |
| `reed`, `reeds`, `thatch` | reed |
| `stone` | stone |
| `lime` | lime |
| `clay` | clay |
| `bricks`, `tiles` | bricks |
| `pottery`, `ceramics` | pottery |
| `glass` | glass |
| `ore`, `iron ore` | ore |
| `iron`, `steel` | iron |
| `tools` | tools |
| `weapons`, `arms`, `armour` | arms |
| `silver`, `gold` | silver |
| `jewellery`, `gems` | jewellery |
| `fish` | fish |
| `salt` | salt |
| `milk`, `cheese`, `butter` | milk |
| `wine` | wine |
| `herbs` | herbs |
| `medicine`, `medicines`, `potions` | medicines |
| `tallow` | tallow |
| `candles`, `wax` | candles |
| `parchment`, `vellum` | parchment |
| `paper` | paper |
| `books` | books |
| `hay`, `fodder` | fodder |
| `reagents`, `components` | reagents |
| `coin`, `coins` | coin |
| `spices`, `silk`, `luxuries` | luxuries |

### 3.14 Concealment and the cover table (item 63; `roster.classes[].concealment`, `roster.covers`; all `own`, `extension`)

**3.14.1 Concealment rows** (`ConcealmentRow`; band rows interpolate; `accessMultiplier` 6 unless given):

| class | band | none | front | hidden | underground | hiddenWithFront |
|---|---|---|---|---|---|---|
| `thieves_den` | poor, squalid | 0.1 | 0.5 | 0.25 | 0.15 | 0.5 |
| `thieves_den` | modest → rich | 0.1 | 0.7 | 0.1 | 0.1 | 0.5 |
| `assassins_house` | every | 0.05 | 0.75 | 0.1 | 0.1 | 0.7 |
| `smugglers_store` | every | 0.1 | 0.6 | 0.15 | 0.15 | 0.4 |
| `forbidden_cult` | every | 0.05 | 0.55 | 0.15 | 0.25 | 0.6 |
| `black_market` | every | 0.15 | 0.3 | 0.2 | 0.35 | 0.3 |
| `spy_ring`, `info_broker` | every | 0.1 | 0.8 | 0.05 | 0.05 | 0.8 |
| `fences_hall` | every | 0.2 | 0.7 | 0.1 | 0 | 0.5 |
| `kidnap_den`, `trafficking_den` | every | 0 | 0.55 | 0.25 | 0.2 | 0.5 |
| `slave_market` | every | 0 | 0.8 | 0.2 | 0 | 0.5 |
| `gang_hideout` | every | 0.3 | 0.4 | 0.2 | 0.1 | 0.3 |
| custom `criminal` (item 104 (a) (5)) | every | 0.3 | 0.5 | 0.15 | 0.05 | 0.4 |

**The sensitive kinds (J122).** The catalogue's `slave_market` and `slave_market_district` (class `slave_market`),
`human_trafficking_network` (`trafficking_den`) and `kidnapping_ring` (`kidnap_den`) are kept on the map and concealed by
default: their rows above weigh `none` at 0, so the class-table source of §4.7's *Concealed institutions* step 1 always
resolves a front, a hidden plot or an underground place, and the concealed use's `knownTo` is `secret` — withheld from a
player view's key and shown on the secret view (item 30; §9.2). SettlementForge's own settings come first: a record whose
dossier states a mode or a knowledge (carried by the port, V08 §2.3) is resolved by that fact (§4.7 step 1), so an open
slave market in the dossier is drawn open, as SettlementForge shows it. A slave market's front is drawn from its cover
row below; its true class's `market-hall` template is read only where it is placed open.

**3.14.2 The cover table** (`CoverRow`; weighted plausible fronts per band; every front is a class id of V11 §3.5
(`CoverRow.covers[].cls`); a front class must have a template row at the band — the compiler checks it,
T-V11-8):

| concealed class | fronts (weight) — poor and modest | fronts (weight) — prosperous and rich |
|---|---|---|
| `thieves_den` | `tavern` 3, `pawnshop` 2, `bathhouse` 1, `lodging_house` 2, `alehouse` 2 | `tavern` 2, `gambling_house` 2, `bathhouse` 1 |
| `assassins_house` | `tavern` 2, `apothecary` 2, `workshop` 1 | `training_yard` (a fencing school) 2, `apothecary` 2, `tavern` 1, `chapel` 1 |
| `smugglers_store` | `warehouse` 3, `ship_chandlery` 2, `chandler` 1, `cooper` 1 | `warehouse` 3, `merchant_house` 2, `vintner` 1 |
| `forbidden_cult` | `almshouse` 2, `bathhouse` 1, `bookbinder` 1, `lodging_house` 1 | `bookbinder` 2, `chapel` 1, `physician` 1, `merchant_house` 1 |
| `black_market` | `tavern` 2, `pawnshop` 2, `warehouse` 1 | `auction_house` 1, `warehouse` 2, `shop` 1 |
| `spy_ring` | `tavern` 2, `barber_surgeon` 1, `shop` 1 | `inn` 2, `bank` 1, `money_changer` 1 |
| `info_broker` | `tavern` 2, `alehouse` 1, `lodging_house` 1 | `inn` 1, `bookbinder` 1, `cartographer` 1 |
| `fences_hall` | `pawnshop` 3, `shop` 2 | `goldsmith` 1, `moneylender` 2, `shop` 1 |
| `kidnap_den`, `trafficking_den` | `warehouse` 2, `lodging_house` 2, `livery_stable` 1 | `warehouse` 2, `carrier_yard` 1 |
| `gang_hideout` | `alehouse` 2, `workshop` 2, `lodging_house` 1 | `tavern` 1, `workshop` 1 |
| `slave_market` | `warehouse` 2, `livery_stable` 1, `carrier_yard` 1 | `market_hall` 2, `warehouse` 2, `auction_house` 1 |

### 3.15 Sectors, powers and their links (items 72, 78, 79; `roster.sectors`, `roster.powerLinks`, `roster.sectorLinks`)

**Sectors** (`SectorRow`; the set the economy slice is keyed by; `tags` the class families that serve the sector by
default, which a class's own `sectors` column overrides): `trade` — market, trade, warehouse, port, transport, lodging;
`taxes` (taxes and tolls) — civic-authority, law-court; `crafts` — craft, metalwork, leatherwork, textile, timber-yard,
food, alchemy, luxury, guild-hall; `agriculture` — farming; `extraction` — extraction, industry; `fishing` — port (the
fishing classes by their own column); `finance` — finance; `religion` — worship, monastic, welfare; `military` —
garrison, watch, fortification; `magic` — arcane, planar, exotic; `crime` — criminal, smuggling, information,
underground. The classes' own columns are V11 §3.5's; a class naming none takes its family's sector at weight 1.
SettlementForge's income sources map to these by V08's `sectors` rows (T13).

**Powers** (the power kinds of §2.7 and item 79: guild, company, religion, lordship, council, criminal, military,
arcane): the classes' columns are V11 §3.5's; a class naming none takes its family's default — guild-hall, craft,
metalwork, leatherwork, textile, food → guild; trade, warehouse, port, finance, transport → company; worship, monastic,
welfare → religion; fortification → lordship; civic-authority, law-court, infrastructure, sanitation, water-supply →
council; garrison, watch → military; arcane, alchemy, planar → arcane; criminal, smuggling, information, underground →
criminal; housing, lodging, entertainment, adventuring, farming, extraction, industry, school, healing, exotic, luxury,
other → none (they enter no power's dial).

**Infrastructure links** (`PowerLinkRow`, `SectorLinkRow`; the base's defaults written as rows):

| element | powers (weight) | sectors (weight) |
|---|---|---|
| `gate` | military 0.5, council 0.5 | taxes 0.7, trade 0.3 |
| `wall`, `tower` | military 1 | taxes 1 |
| `bridge` | council 1 | taxes 0.7, trade 0.3 |
| `road` | council 1 | taxes 0.7, trade 0.3 |
| `quay` | council 1 | trade 1 |
| `market` | council 1 | trade 1 |
| `tollHouse`, `customsHouse` | council 1 | taxes 1 |

### 3.16 Walls on natural barriers (item 106; `walls.barriers`, `walls.waterfront`; `own`, general historical knowledge, not corpus-witnessed, calibratable)

**3.16.1 Defensibility by barrier** (`WallBarrierRow`; tests evaluated per arc of the boundary on the terrain grid;
the first row whose test holds classifies the arc; a river arc reads its course's `depthCm` (§2.3), while a sea or lake
arc, which carries no depth, is `deepWater` unless its bank kind is `beach`):

| barrier | test | closes | wall | thickness · height factor | walk | tower spacing factor | anchor tower | arcKind |
|---|---|---|---|---|---|---|---|---|
| `sheerCliff` | slope ≥ 100 % over a drop ≥ 12 m; or, by rule (`islandRim`), an arc of a sky island's rim chain (V05 §3.21: closure only, no wall) | yes | none | — | no | 0 (none) | strong | `cliff` (`sheer` under `islandRim`) |
| `deepWater` | a sea or lake arc whose bank kind is not `beach`; a river arc whose course `depthCm` ≥ 200 | yes | none | — | no | 0 | strong | `shore` |
| `gorge` | a `SiteFeature` `ravine` (§2.3's kinds), width ≥ 10 m, depth ≥ 8 m | yes | none | — | no | 0 | strong | `gorge` |
| `cliff` | slope ≥ 60 % over a drop ≥ 6 m (a `SiteFeature` `cliff` qualifies when it meets it) | yes | parapet | 0.5 · 0.4 | yes | 2 | normal | `cliff` |
| `steepSlope` | slope ≥ 30 % over a rise ≥ 8 m | yes | light | 0.7 · 0.7 | yes | 1.5 | normal | `cliff` (an escarpment, item 106 (a)) |
| `marsh` | bank kind `marsh`, or a `marsh` land use ≥ 60 m deep | yes | light | 0.7 · 0.6 | yes | 1.5 | normal | `marsh` |
| `shallowWater` | a sea or lake arc whose bank kind is `beach`; a river arc whose course `depthCm` < 200 (fordable) | no (village kinds: yes, below) | full (with water gates at every quay access); village kinds: none | 1 · 1 | yes | 1 | normal | `shore` |
| `open` | none of the above | no | full | 1 · 1 | yes | 1 | normal | — (null) |

**The arc kind and the closure feature** (J-V11.63). The key stays the defensibility class; `arcKind` maps
it onto J-VI.3's six closure-arc kinds. An arc is a **closure feature** — V12's `closure` LineString (item 447),
V10's unwalled arc ("the cliff is the wall here"), V09's preview arc — exactly when its row `closes` and its `wall` is
`none` (at base kinds `sheerCliff`, `deepWater`, `gorge`); every other closing row is a walled stretch graded by its class
(a parapet on a cliff top, a light wall on a steep slope or along a marsh) that reports its `arcKind` as the barrier it
stands on; `open` reports none. `enceinte` (an earlier ring closing a later one, item 106 (f)) is V06's later-ring rule,
never a row. **At village kinds** (`palisade`, `earthwork`, `inner`) every water arc closes, a brook's included (V07 §3.4
step 5 (a), J-V7.26): the `shallowWater` row reads `closes: yes`, `wall: none` there, so a village never fences its own
water; the rest of the village grading is V07 §3.4 step 5 (c).

Reach (item 106 (b)): `wall.barrierReachM` 150, capped at 0.25 × the stage's equal-area radius — at village kinds min(`wall.barrierReachM`, V07's
`palisade.barrierReachShare` 0.5 × the settlement radius) instead (item 312, J-V7.45); the neck rule of a river
loop or spur closes by the barrier rows above. The palisade of V07's villages reads the same rows for its barrier arcs
(V07 §3.4 step 5). An island's rim (V05 §3.21) is the `islandRim` rule of the first row — closure
only, `arcKind` `sheer`.

**3.16.2 The waterfront from threats** (`WaterfrontThreatRow`; DR2 reads the neutral threat keys V08's `threats` row set
derives from the dossier — V08 §2.6, J-V8.50, never restated here — and takes the highest-weight matching row; the preset
row still overrides; on a standalone map the keys come from the intent's threat and a pack):

| threat | waterfront | sea gates | min rung | weight |
|---|---|---|---|---|
| `naval` (a naval war or a hostile fleet) | quay_wall | every quay | TOWN | 1.0 |
| `raider` (raiders or pirates by sea; standalone and pack only) | quay_wall | every quay | TOWN | 0.9 |
| `hostileSeaPartner` (a sea-bearing neighbour hostile or at war) | quay_wall | main quays | TOWN | 0.8 |
| `seaMonster` (a coastal monster threat) | quay_wall | main quays | TOWN | 0.7 |
| `exposedPort` (a sea-exposed port, no threat named, population ≥ 20 000) | quay_wall | main quays | CITY | 0.4 |
| `none` | open | — | — | 0 |

The matched row's `threat` is also what V11 §3.24.4's mole-head slot reads (a fort only under `naval` or `raider`).

### 3.17 Climate and land use

**3.17.1 Climate rows** (`ClimateRow`; §4.9's species and field system; `own`, calibratable; species are generic kinds
our crown symbols draw, not a reference's list; `rainMmPerYear` is the mean yearly rainfall V11 §3.24.6's water balance
reads, general — orders of magnitude for each climate; provisional, its entry V12 §3.11's register):

| biome | ground role | woods (inner / outer shares; leaf) | field system | roof form · pitch | scatter per ha | rain mm a year |
|---|---|---|---|---|---|---|
| `temperate-deciduous` | `ground.grass` | oak 0.5 / 0.3, beech 0.3 / 0.2, ash 0.2 / 0.3, hazel 0 / 0.2 (deciduous) | openStrip | gable · 1.0 | 0.5–1.5 | 750 |
| `temperate-coniferous` | `ground.grass` | pine 0.5 / 0.3, spruce 0.4 / 0.3, birch 0.1 / 0.4 | enclosed | gable · 1.1 | 0.5–1.0 | 700 |
| `mixed` | `ground.grass` | pine 0.4 / 0.2, oak 0.3 / 0.4, birch 0.3 / 0.4 | openStrip | gable · 1.0 | 0.5–1.5 | 700 |
| `maritime` | `ground.grass` | oak 0.4 / 0.2, ash 0.3 / 0.3, thorn 0.3 / 0.5 | enclosed | hip · 0.8 | 0.3–1.0 | 1 100 |
| `arid` | `ground.dry` | olive 0.4 / 0.3, cypress 0.3 / 0.3, palm 0.3 / 0.4 (evergreen) | irrigated | flat · 0.1 | 0.2–0.6 | 200 |
| `cold` | `ground.cold` | spruce 0.6 / 0.4, birch 0.2 / 0.4, larch 0.2 / 0.2 | infieldOutfield | gable · 1.3 | 0.2–0.8 | 500 |

**Item 111's dry-country cells** (the same rows; `own`, general — desert towns on exotic rivers and coasts, spring-fed
oases with their palm groves and channel-fed gardens, the wealthy holding the watered and shaded ground; calibratable,
provisional, their entries V12 §3.11's register; `extension`, so the parity presets read their neutral values by §7.6's
zeroing where the neutral value is 0 and by explicit `presets.MFCG`, `.FTG` and `.VG` entries where it is 1 — the
`aridChance` factors, `sunlight` and `wellCoverageFactor`). The cells' meanings are V11 §2.8's `ClimateRow`; their
readers are registry row 43.

| biome | `arid` | `aridChance` river · lake · coast | `oasisChance` · `oasisNoWaterFactor` | `oasisAreaHa` | `gardenFactor` · `channelReachM` · `groveBandM` | `grove` | `w_water` · `pullRadiusM` | `w_waterP` | `sunlight` | `wellYieldWeight` · `wellCoverageFactor` |
|---|---|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous`, `temperate-coniferous`, `mixed` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.1 · 300 m | 0.01 | 1 | 0.2 · 1 |
| `maritime` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.02 · 200 m | 0 | 1 | 0.1 · 1 |
| `cold` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.1 · 300 m | 0.01 | 1 | 0.2 · 1 |
| `arid` | true | 0.4 · 0.25 · 1 | 0.3 · 2 | 0.5–4 ha | 3 · 250 m · 30 m | palm 0.7, fig 0.15, tamarisk 0.15 | 0.6 · 800 m | 0.08 | −0.5 | 0.6 · 0.6 |

Ranges (`ColumnSpec.range`): each `aridChance` factor [0, 1]; `oasisChance` [0, 1]; `oasisNoWaterFactor` [1, 5], the
product with `oasisChance` capped at 1 (§4.2 S0); `oasisAreaHa` within [0.1, 20], low ≤ high; `gardenFactor` [0, 10];
`channelReachM` [20, 1 000]; `groveBandM` [5, 100]; the `grove` shares summing to 1; `w_water` [0, 0.9] (§4.2 S3 (6):
below 1, so no edge's cost reaches 0); `pullRadiusM` [50, 2 000]; `w_waterP` [0, 0.3]; `sunlight` [−1, 1];
`wellYieldWeight` [0, 1]; `wellCoverageFactor` [0.2, 1]. A non-arid row's oasis cells are never read (§4.2 S0 reads them
only on an arid row; P(oasis) is 0 elsewhere), so they hold their neutral values and `—` is "absent, never read".

How they read, each at its home: S0's P(river), P(lake) and P(coast) take the rung feature table's value ×
`aridChance` on an arid row, and P(oasis) = min(1, `oasisChance` × `oasisNoWaterFactor` when no river, lake or coast was
drawn, else `oasisChance`) (§4.2 S0); S1 sizes the oasis by `oasisAreaHa` (§4.2 S1 (2)); S12a lays `garden` land-use
faces of `gardenFactor` × the oasis's water area within `channelReachM` of its shore, and S12b plants the `grove` in a
band of `groveBandM` (§4.9); S3's travel-cost edges take × (1 − `w_water` · q(x)), q falling to 0 at `pullRadiusM`
(§4.2 S3 (6)), and V07's village crowding map reads the same two cells; §4.5's prosperity field adds `w_waterP` · q(x)
and multiplies item 102's sun term by `sunlight` — `w_sun` × `sunlight` is 0.02 in the temperate and cold rows, item
102 as filed, and −0.01 in the arid row, where shade is valued and the water term carries the pull (V11 §3.3.5); S10b's
well and public-fountain classes add `wellYieldWeight` × the plot's well yield (V11 §3.24.6's raster values) and their
water-supply walking-coverage radius takes × `wellCoverageFactor` (V11 §3.5's water-supply rows). A sky island reads
none of these cells (§4.2 S0; V05). Item 111's off form — every `aridChance` 1, `oasisChance` 0, `w_water` and
`w_waterP` 0, `sunlight` 1, `wellYieldWeight` 0, `wellCoverageFactor` 1 — is V11 §3.24.0's row for the item (T111-5).
The rows are checked by T-V11-38.

**3.17.2 Land-use rows** (`landuse`; one per `LandUse.kind`, §2.7; read by S12a for the surface role and by §8.2's
tiles): `arable` — role `field.arable`, crops by climate (grain default); `garden` — `field.garden`, an irrigated garden
of beds and channels (item 111's oasis gardens, §4.9; a provider of `herbs`, V11 §3.7.2); `strip_field` — `field.strip`; `meadow` —
`field.meadow`, hay; `pasture` — `field.pasture`, livestock (sheep default, cattle in maritime); `commons` —
`field.commons`, scatter × 1.5; `orchard` — `wood.orchard`, a jittered grid; `vineyard` — `field.vineyard` (arid and
maritime biomes, else only by dossier deposit); `coppice` — `wood.coppice`; `wildwood` — `wood.wild`; `quarry`, `claypit`,
`mine` — `works.pit`; `lumber` — `wood.felled`; `fishery` — `water.fishery`; `saltpan` — `works.saltpan`; `marsh` —
`field.marsh`; `reserve` — `wood.reserve`. The roles are §8.2's keys; their colours are the style sheet's.

### 3.18 Decline, ruin and salvage by material

The decline table, the ladders and the Works table are §4.11's (rows written there). This volume adds the per-material
rows they read, keyed by `MaterialRow.walls` (V11 §3.19.3):

| wall material | salvage m³ per 100 m² of footprint per storey | decay dwell factor (× §4.11's bands) | ruin persistence | robbed first |
|---|---|---|---|---|
| `ashlar` | 30 | 1.5 | long: walls stand as a ruin | yes (dressed stone is prized) |
| `rubble` | 30 | 1.2 | long | after ashlar |
| `brick` | 22 | 1.1 | medium | yes |
| `timber_frame` | 12 (timber 8, infill 4) | 0.6 | short: roof and frame go, a footprint trace | timber first |
| `wattle_daub` | 6 | 0.5 | short | no |
| `cob` | 4 | 0.5 | short (melts to a mound) | no |

`BuildingClassRow.salvageM3` is compiled from these rows × the class's template footprint and floors at its band;
§4.11's `decay` Works and dwell bands multiply by the factor (×0.6 for timber and thatch is the base's rule, kept).
The *ruin persistence* column is the one scale of survival for the town's own ruins (§4.11); an ANCIENT ruin's elements
survive by V04's `RuinRule.survival` shares, whose order is V11 §3.23.5's — every ancient-culture row builds in long
masonry (ashlar and rubble), so the material factor of this column is 1 there and is not applied twice (J-V11.31).
Item 110's wall materials read these rows: `dry_stone` as `rubble` × 0.9 dwell (it slumps sooner), `earth_bank` as
`cob` (it melts to a bank), `timber_crib` as `timber_frame`.

**Structures** (item 110; V06 §3.5.2's pool units; the cells V06 §3.19.2 and §3.19.4 read; `own`, general — terrace
walls slump and are robbed when the fields above them are abandoned, arches fall before their piers — provisional, V12
§3.11's register):

| structure | holds while | decays | persistence | salvage |
|---|---|---|---|---|
| retaining wall | a live plot lies on its high side within `retaining.holdM` 10 m | after `retaining.neglectAfterYears` 30 without one, by stretches of `retaining.stretchM` 20 m, each stretch a candidate struck by the strike pool at the base's persistence row `retaining` (§4.11, item 291; V06 §3.5.2) | by its material's row above (a dry-stone wall slumps to a bank) | m³ = face area × thickness × 0.8 |
| raised way (arches, deck, channel) | in use; an aqueduct while its source flows and its need ratio stays above 1 | disused after `aqueduct.disuseAfterYears` 30 (a dry aqueduct) or, for a viaduct or an elevated road, after V06's `streets.abandonAfterYears` (V06 §2.2) unused at both ends; then arches by stretches of one span, each span a candidate struck by the strike pool at the base's persistence row `raised` (§4.11, item 291; V06 §3.5.2) | piers `long` (they stand as footprints); arches and deck by their material's row | m³ per metre of span = deck width × 1.2 (masonry) or × 0.3 (timber) |
| deck plots and their buildings | while the deck stands | fall with the deck (the base's fate rule, item 110 (d)) | — | by the building's rows |
| stepped mass (V02's tiers) | as its building | a ruined stepped building decays from its top tier by V04's `RuinRule.monument.tierDecay` (0.85 a tier), read through V11 §3.23.5's `hall` share for the base tier | a solid rubble tier `long`; the mound permanent | the tiers' solid volume × 0.5 |

`retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and `aqueduct.disuseAfterYears` are stated here
once (V06 §2.2 cites them). The strike weights of a stretch and a span are the base decline table's persistence rows
`retaining` and `raised` (§4.11, item 291), which V06's lottery reads as a layer weight inside the churn cap
(`w = E(x) · rate · u`, V06 §3.5.2), never a per-year chance; this block holds no rate (J-V11.71).

### 3.19 Era, region and materials

**3.19.1 The era table** (`era`; `EraRow`, item 400; `own`, calibratable; D-2's centre of gravity; `aqueductM` and
`raisedVaultM` are item 110 (b)'s era factors, V11 §3.24.2 — general: conduits and aqueducts spread with the later
medieval towns):

| id | years | tower kinds (round · square · bastion · octagonal) | tower spacing m | moat width m | intervallum | market paved | public lighting | fuel · timber m³ per head-year | pump from | harbour chain | suburb regime | aqueductM | raisedVaultM |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `c12` | 1100–1199 | 0.3 · 0.7 · 0 · 0 | 45–60 | 6–10 | no | 0.1 | sparse | 1.1 · 0.15 | — | raised | no | 0.5 | 1.0 |
| `c13` | 1200–1299 | 0.6 · 0.35 · 0 · 0.05 | 40–55 | 8–14 | 0.3 | 0.3 | sparse | 1.0 · 0.15 | — | raised | no | 0.7 | 1.0 |
| `c14` (default) | 1300–1399 | 0.6 · 0.3 · 0 · 0.1 | 35–50 | 8–16 | 0.5 | 0.5 | sparse | 1.0 · 0.15 | — | raised | no | 1.0 | 1.0 |
| `c15` | 1400–1499 | 0.4 · 0.3 · 0.2 · 0.1 | 35–50 | 10–18 | 0.6 | 0.7 | moderate | 0.9 · 0.15 | 1450 | lowered | yes | 1.2 | 1.0 |

`intervallum` and `market paved` are chances drawn on the reading stage's stream; FTG's 39 m tower spacing and MFCG's
tower-per-vertex remain §4.8's reference points. **3.19.2 Era default from the dossier:** the era is
V08 §2.6's era row's reading of the culture (every culture defaults to `c14`; a culture row may name another era); the
region is `western` unless a pack adds region rows.

**3.19.3 Material rows** (`materials`; `MaterialRow`; texture and colour only, never shape — the owner's rule and item
19; the most specific key wins: a STRUCTURE key (`retaining`, `raised:<kind>`, `pier`, `deck`; item 110),
then class, then district kind, then growth stage; `own`):

| key (era · stage · district · class) | walls | roof | weight |
|---|---|---|---|
| every era · stage 1 (the core) | rubble 0.4, timber_frame 0.5, brick 0.1 | clay_tile 0.5, slate 0.2, thatch 0.3 | 1 |
| every era · stage 2 | timber_frame 0.6, rubble 0.3, wattle_daub 0.1 | thatch 0.5, clay_tile 0.4, shingle 0.1 | 1 |
| every era · stage ≥ 3 and ribbon | timber_frame 0.5, wattle_daub 0.4, cob 0.1 | thatch 0.8, shingle 0.2 | 1 |
| `c15` · stage 1 | brick 0.3, rubble 0.3, timber_frame 0.4 | clay_tile 0.7, slate 0.3 | 1 |
| district `docks` | timber_frame 0.5, brick 0.3, rubble 0.2 | clay_tile 0.6, slate 0.4 | 1 |
| district `shanty`, cluster classes | wattle_daub 0.6, timber (boards) 0.4 | thatch 0.6, turf 0.2, canvas (tents) 0.2 | 1 |
| class `church`, `chapel`, `cathedral`, `monastery`, `castle`, `palace`, `town_hall`, `guildhall` | ashlar 0.7, rubble 0.3 | lead 0.4, slate 0.4, clay_tile 0.2 | 1 |
| class `tower_house`, `mage_tower`, `watchtower` | rubble 0.6, ashlar 0.4 | slate 0.6, lead 0.4 | 1 |
| class `warehouse`, `granary` | rubble 0.5, timber_frame 0.5 | clay_tile 0.8, slate 0.2 | 1 |
| structure `retaining` (a retaining wall) | V11 §3.24.1's `retaining` row at the band of the high side's plot (its `material` weights; the rich row on a civic face at CITY and above) | — | 1 |
| structure `raised:viaduct`, `raised:elevated`, `raised:aqueduct` and `pier` | V11 §3.24.2's `raisedWays.structure.material` row at the band (an aqueduct never timber) | — | 1 |
| structure `deck` (a building on a bridge, pier, mole or quay deck, item 110 (d)) | timber_frame 0.8, brick 0.2 | clay_tile 0.5, shingle 0.3, slate 0.2 | 1 |
| regional shift rows (`extension: 'regionalShift'`, off by default) | a region's row set replacing walls and roof shares | — | — |

The material ids (`ashlar`, `rubble`, `brick`, `timber_frame`, `wattle_daub`, `cob`, and item 110's `dry_stone`,
`earth_bank`, `timber_crib` for retaining walls and `timber` for raised-way decks; roofs `thatch`, `shingle`, `clay_tile`,
`slate`, `lead`, `turf`, `canvas`) are the keys §8.2's texture and colour roles use (item 110's three wall roles by
item 412); the colours are the style sheet's (the palette rules, §8.2), never this table's. A custom record's `materialFamily` (item 104) selects the
row whose walls share is largest for that family (V08 maps its words).


### 3.20 Naming — the grammars, their features and the authoring of their vocabularies

The engine, the streams, uniqueness, user corpora and packs are §10.4's and §9.6's; claimed names bypass the grammar
(item 82). This volume fixes each slice's grammar STRUCTURE and features; the words are authored by the plan of V11
§3.20.6 and never copied from a reference (§17.1).

**3.20.1 The slices** (`naming.*`, one `GrammarDef` each; the features are the guards' inputs, derived at S13a from
eager records):

| slice | names | features (guards) | structure (our symbols) |
|---|---|---|---|
| `naming.settlement` | the settlement when no dossier names it | terrain (river, ford, hill, coast, marsh, wood), size rung, culture; at THORP, HAMLET and VILLAGE V07 §3.10's descriptive tags — the settlement's form, the water type, the palisade kind (or none), the part-0 crossing kind (bridge, ford, none), a wood | `#place.root##place.suffix#` or `#place.root# #place.qualifier#` (a river or market qualifier); guards on the village tags choose the suffix and the qualifier (a ford word where the crossing is a ford, a wood word by a wood, a water word by its type) |
| `naming.district` | districts (item 72 (c)) | identity row, dominant family or sector, anchor institution's name, power, gate bearing and trade (the Northgate rule), terrain, band, `terraced` (the share of the district's area in levelled units, item 110 (a)) | head (`#trade.noun#`, `#anchor.name#`, `#power.noun#`, `#bearing#gate`, `#terrain.noun#`, `#band.adjective#`) + generic (`#district.generic#`); weights by the identity's source; where `terraced` ≥ 0.4 the terrain head draws from `#terrace.word#` |
| `naming.quarter` | quarter nodes (§9.1) | the members' dominant identity, the largest member's name | the dominant member's head + `#quarter.generic#`, or the largest member's name |
| `naming.way` | ways | V01's `WayNamingContext` (class, length, shape, destination, landmark, trade, band, identity, water, slope, place, and `raised` — the raised way's kind, item 110 (b)) | `#dest#` + street word by class; `#trade.plural#` + lane word; `#shape.word#` + lane word; `#person.surname#` + possessive street; weights per V01 §3.7.2. Guard `raised`: `viaduct` → `#place.root#` or `#dest#` + `#viaduct.word#`; `elevated` → `#landmark.name#` + `#walk.word#`; `aqueduct` → `#water.root#` or `#place.root#` + `#aqueduct.word#` (never a street word). Guard `anchorLane` (village rungs, V07 §3.10: the anchor a lane is named from — `mill`, `church`, `manor`, `green`, `back`): `#anchor.word#` + lane word (a mill lane, a church lane, a back lane) |
| `naming.villageEnd` | a village's ends (V07 §3.10 VS8) | the end's kind (`green`, `church`, `manor`, `mill`, `crossing`, `entry`, `wharf`, `nucleus`, `claim`, declared), its anchor's name, its bearing from the heart | by kind: `#anchor.short#` + `#end.word#` (a church end, a mill end); the town's end at an entry `#dest#` + `#end.word#`; a green side `#green.word#` + side; a nucleus `#place.root#` + `#wick.word#`; a claimed end its claim's name (item 82) |
| `naming.field` | great fields, meadows, commons and woods (V07 §3.9, §3.10) | the field kind (great field, meadow, common, wood, coppice), its bearing from the heart, its use | `#bearing#` + `#field.word#` (the north field); `#use.word#` + `#field.word#`; a common or wood `#place.root#` + its kind word |
| `naming.place` | squares, greens, courts, yards (V01's `HoodPlace`) | kind, square type, centrepiece pin, adjacent landmark, dominant trade, identity, surname source | `#centrepiece#` + square word; `#landmark.name#` + close; `#person.surname#`'s court |
| `naming.landmark` | churches, inns, halls, mills, bridges, gates | class, band, era, culture, the district's identity | church: `#dedication#`; inn and tavern: the sign `#sign.object#` or `#sign.colour# #sign.object#`; hall: `#guild.trade#` hall; mill: `#water.name#` or `#person.surname#` mill; bridge and gate: `#bearing#`, `#dest#` |
| `naming.landmark` (item 110's forms) | forts, lighthouses, moles | class, the harbour's name, the settlement's root | fort: `#bearing#`, `#place.root#` or the harbour's name + `#fort.word#`; lighthouse: `#place.root#` + `#light.word#`; a mole (its way's name): `#place.root#` + `#mole.word#` |
| `naming.water` | rivers, streams, ponds, the harbour | size, flow, source terrain, the settlement's name | `#water.root#` (a river word), `#place.root#` brook, a mill pond by its mill |
| `naming.island` | floating islands (V05 §3.14) | reason, the institution's kind, the echoed river's name, the ground district below, altitude class, culture | `#island.head#` from the institution or the district below + `#island.generic#`; the fallen form for a landfall |
| `naming.cluster` | informal clusters (item 70) | band, terrain, the nearest landmark | `#cluster.word#` (a rough-ground word) or `#landmark.short#`'s `#cluster.word#` |
| `naming.undercity` | undercity neighbourhoods (item 65) | the parent quarter's name | "Under-" + parent, parent + "Below" … (our two forms, weighted) |
| `naming.undercity.plaza` | the undercity core's plaza (II.7.5; V04 §5.4) | the parent quarter's name, the plaza's first institution | `the #plaza.word#`; `#quarter.name# #plaza.word#`; the black market's plaza `the #market.word# Below` |
| `naming.sewer` | sewer trunks and culvert runs (V04 §5.4) | the run's role (trunk, culvert), the brook it carries, the quarter above, the way it follows | `the #way.name# #sewer.word#`; `the #quarter.name# #sewer.word#`; guard `culvert`: the brook's name + `Culvert` |
| `naming.catacomb` | catacomb complexes (V04 §5.4) | the source face (cemetery, churchyard, quarry ossuary) and its cemetery's, church's or quarter's name | `the Catacombs of #cemetery.name#`; under a churchyard `the Catacombs of #church.name#`; guard `ossuary`: `the Ossuary of #quarter.name#` |
| `naming.cavern` | cavern systems (item 109 (a); V04 §5.4) | relief, the terrain feature above, the depth class | `the #cavern.word# of #terrain.name#`; `#place.root# #cavern.word#` |
| `naming.quarry` | quarry gallery systems (V04 §5.4) | the stone, the quarter above | `the #quarter.name# Galleries`; `#stone.word# #quarry.word#` |
| `naming.vaults` | cisterns, vaults and arch-vault runs (V04 §5.4) | the chamber kind, the raised way's name, the landmark above | guard `archVault`: `the #way.name# Arches` (a run under a raised way, item 110 (b)); else `the #vault.word# of #landmark.name#` |
| `naming.buried` | buried old towns and buried former settlements (II.7.6; item 113 (c); V04 §5.4) | the source (old town or former settlement), the quarter above, the settlement's name | an old town `Old #quarter.name#`; guard `former`: `Old #settlement.name#` |
| `naming.ruin` | ruin systems (item 109 (g)) | the source (V11 §3.23.2), the civilisation's name when the dossier's history gives one (a claimed name bypasses the grammar, item 82), the ancient-culture row, the districts above (V01's `districtsAbove`), the terrain | `the #ruin.generic# of #ancient.root#`; `#ancient.root# Below`; `the Old #ruin.generic#` under `#district.name#` — weighted, with the first as the unguarded fallback; a ruin's chambers take `naming.place` names under the guard `arena: underground` |
| `building.wingRole` | a building's wing, for V02's hover label (V02 §5.4) | the wing's `WingRole`, the class, the band | one plain word or two per role — including item 110's "a tier", "the shrine", "a stair" and the arena's "the seating" and "a gate passage" — from `#wing.word#`; the role id is the fallback |
| `naming.formerWall` | a way made by `wallToWay` (V06) | the enceinte's ring order, bearing | `#wall.memory#` + way word (an old wall's ring road) |
| `naming.person` | people (§10.3) | ancestry, culture, sex, band, profession, parent's name | given `#given.m#` or `#given.f#`; byname by trade (`#trade.agent#`), place (`#place.root#`), father (`#given.m#` + a patronymic mark) or a nickname `#byname#`, weighted by band and era |
| `naming.folk` | the folk-contraction of an old name at an epoch (§10.4) | the name, `maxSyllables` 3 | syllable elision rules of our own (drop an unstressed middle syllable, merge doubled consonants), never a word list |

**3.20.2 Guards and weights.** A rule alternative carries its guards (`when`) and a weight; S13a keeps the alternatives
whose guards hold, draws by weight on the entity's `naming` stream (§6.1), and on an empty set falls back to the
slice's unguarded alternatives (every slice has one). No feature is a strict priority (V01 §3.7.2's rule, applied to every
slice).

**3.20.3 Culture and ancestry rows.** One human ancestry (§10.3's realism base) and one culture row per V08 culture id
(germanic, latin, celtic, arabic, norse, slavic, east_asian, mesoamerican, south_asian, steppe, greek, mixed): each culture
row names its grammar slices and corpus fields; in the shipped pack every culture reads the English-fantasy corpora
(the owner's adopted default D-6), so names stay English-fantasy until a setting pack supplies a culture's own corpora —
a pack's `tablePatch` on that culture's corpus fields (§10.4), re-drawing exactly the unedited names drawn from them.

Each culture row also carries a **building block** `{ aqueductM, elevatedM, raisedVaultM }` (item 110 (b); the
dossier's `site.culture` is the discriminator, since every culture's default era is `c14`; own, general — Roman and later
Mediterranean arcaded aqueducts, raised causeway aqueducts, northern conduits laid in the ground rather than on arches;
provisional, V12 §3.11's register), read by V11 §3.24.2's chance and by V04's vault share, and the
culture-keyed specialisation rows of V11 §3.24.3:

| culture | aqueductM | elevatedM | raisedVaultM |
|---|---|---|---|
| latin | 1.5 | 1.0 | 1.2 |
| greek | 1.2 | 1.0 | 1.0 |
| arabic | 1.0 | 1.0 | 1.0 |
| mesoamerican | 1.2 | 1.2 | 1.0 |
| south_asian | 1.0 | 1.0 | 1.0 |
| east_asian | 0.8 | 1.0 | 0.8 |
| germanic, celtic, norse, slavic | 0.8 | 0.8 | 1.0 |
| steppe | 0.3 | 0.5 | 0.8 |
| mixed, and any culture a pack adds without a block | 1.0 | 1.0 | 1.0 |

**3.20.4 Descriptions and templates** (`desc.*`, `chronicle.*`, `appearance.*`; `TemplateDef`): `desc.district` — its
identity, its mix's two largest families, one feature (water, gate, hill), its band's adjective; `desc.building` — the
specialisation, the band, the Works stage words of item 67 ("being built", "being extended", "being demolished", "under
repair", "ruined since" the year), a concealed use never named on a public view (item 30); `desc.quarter`; `chronicle.*`
— V06's defaults, overridable here by key; `appearance.*` — §10.3's lines. Every template has a fallback line.

**3.20.5 The corpora** (`corpora/*`; the vocabularies — AUTHORED, never written in this volume):

| corpus | used by | size target | authoring rule |
|---|---|---|---|
| `place.root`, `place.suffix`, `place.qualifier` | settlement, water, person | 300 roots, 60 suffixes, 40 qualifiers | coined from general English and Norse place-name formation (a linguistic fact, not a list), each entry a new coinage or a common word |
| `district.generic`, `quarter.generic`, street, lane, square and close words | district, quarter, way, place | 40, 20, 60 | ordinary English topographic words |
| `trade.noun`, `trade.plural`, `trade.agent` | district, way, person | one per class family and per class (≈ 200) | from our own class ids, glosses and display labels (V11 §3.4, §3.5, §3.5.15), in plain English — the labels are display cells, never read from this corpus (J-V11.95) |
| `dedication` | church names | 120 | invented saint-like and virtue names; no real saint list |
| `sign.object`, `sign.colour` | inns, taverns | 150, 20 | ordinary nouns (animals, tools, heraldic objects) and colour words |
| `given.m`, `given.f`, `byname` | persons | 400, 400, 200 | invented or common English forms, spell-checked |
| `island.head`, `island.generic`, `cluster.word`, `wall.memory`, `water.root` | as named | 60, 20, 30, 20, 80 | our own words |
| `ancient.root`, `ruin.generic` | `naming.ruin` | 80, 12 | coined roots unlike the town's English-fantasy corpus (another civilisation's sound), same authoring rule and scan |
| `end.word`, `wick.word`, `green.word`, `field.word`, `use.word`, `anchor.word` | `naming.villageEnd`, `naming.field`, `naming.way`'s `anchorLane` guard | 8–15 each | ordinary English topographic and farming words |
| `viaduct.word`, `walk.word`, `aqueduct.word`, `fort.word`, `light.word`, `mole.word`, `terrace.word`, `wing.word` | way, landmark, district, `building.wingRole` (item 110) | 8–15 each (`wing.word` one to three per `WingRole`) | ordinary English topographic and building words |
| `sewer.word`, `cavern.word`, `quarry.word`, `stone.word`, `vault.word`, `plaza.word`, `market.word` | the underground slices | 8–15 each | ordinary English words for drains, caves, workings, stone, vaults and open places |
| profanity and collision filter | every slice | ≈ 300 | authored; a draw hitting it re-draws on `…/attempt=n` (§9.6) |

**3.20.6 The authoring plan and its bars.** Every corpus file is written by an implementer seat from this volume alone,
names its author seat and date (§10.4), passes the spell check (§9.6) and the hashed clean-room scan (§17.1 (5)), and meets
V11 §7's naming bars (T-V11-15). The scan also carries a hashed list of the STUDY reference's proper nouns — the city,
ward and landmark names of the reference map item 110 was assessed on (J114) — maintained by the
scanner's owner and never written into this volume or any other; a hit in any corpus, table row or fixture name fails the
PR. The second known-city fixture's names are our own (item 110 (e)). The vocabularies are written
during the build, clean-room (J122): authoring runs at C5 (V11 §8), the O13-core corpora (district, way, place,
landmark, settlement) at M2b, the rest at M3b.

### 3.21 Government, religion, households, institutions and the module's tables

**3.21.1 Government rows** (`roster.government`; the seats §10.2 lists, written as rows; `own`; T14 maps the dossier's
government names onto the kinds, V08):

| kind | seat class | village seat (`villageSeat`; V07 §3.11 DR11) | offices (seat class · count) | guard posts per 1 000 | barracks from |
|---|---|---|---|---|---|
| `crown` | `palace` (else `castle`) | `v.manor_house` (the lord's hall; V07 names no crown row, J-V11.60) | chancellor · palace 1; treasurer · palace 1; sheriff · castle 1; mayor · town_hall 1 | 1.5 | CITY |
| `seigneurial` | `castle` (a `tower_house` below CITY when the castle toggle is off) | `v.manor_house` | steward · castle 1; bailiff · courthouse 1 | 1.2 | CITY |
| `ecclesiastical` | `palace` (the bishop's palace, specialisation `bishops_palace`) beside the `cathedral` | `v.parsonage` beside the church | bishop · palace 1; dean · cathedral 1; archdeacon · cathedral 1 | 0.8 | METROPOLIS |
| `chartered_commune` | `town_hall` | `v.reeve_house` with the moot pin | mayor · town_hall 1; aldermen · town_hall 1; guild wardens · guildhall 0.3 per 1 000 | 1.0 | CITY |
| `merchant_oligarchy` | `guildhall` (specialisation `merchants_hall`) | `v.reeve_house` with the moot pin | council of merchants · guildhall 1; harbour reeve · harbour_master 1 at a port | 1.0 | CITY |

At the rungs whose `RungProfile.frameLaw` is `territory`, S2 reads the `villageSeat` column alone; the seat class, the
offices' seat classes and the guard posts (with the barracks column) are the base rungs' (V07 §3.2 (3); item 576
(c)) — a village's officers sit in the seat's house and its watch keeps no post of its own.

**3.21.2 Religion and households.** `roster.religions`: one default row `faith` (worshipper share 1.0, practice share
0.9, clergy 10 per 1 000, temple class `church`, great temple class `cathedral`, shrine pin `shrine`); further religions
only by a pack or the dossier (V08). `roster.households` (people; staff = live-in servants per household):

| band | mean size | sd | min · max | staff |
|---|---|---|---|---|
| squalid | 3.5 | 1.5 | 1 · 8 | 0 |
| poor | 4.0 | 1.5 | 1 · 9 | 0 |
| modest | 4.5 | 1.5 | 1 · 10 | 0.1 |
| comfortable | 5.0 | 1.5 | 2 · 11 | 0.4 |
| prosperous | 6.0 | 2.0 | 2 · 14 | 1.5 |
| rich | 8.0 | 2.5 | 3 · 20 | 5 |

**3.21.3 Institution rows** (`roster.institutions`): one row per class whose balance is `institution` (V11 §3.5), its
classes the class itself, its faction kind the class's first power, and `seatOf` from V11 §3.21.1 — compiled, so the
institution list can never drift from the class ladder.

**3.21.4 The module's tables** (`sim.*`, M4b; schemas §10.3; rows authored at M4b by this plan): professions — one
profession family per workplace class family, with ranks master, journeyman, apprentice, labourer, servant, and per band
counts compiled from each class's `staff` column (V11 §2.3; `staff` defaults: shop and workshop classes 1–2 poor, 2–3
modest, 3–5 prosperous, 5–8 rich; institutions by template size ÷ 40 m²); items and services — one item per good of V11
§3.7.1 plus finished goods per class (≈ 250), prices in the setting pack's coin unit relative to bread = 1; stat blocks —
off by default (D-3). Estimate in V11 §8.

### 3.22 The `villageForm` column (item 430, filled here)

Town classes played by a village class at village rungs (every target a `v.<id>` key, V11 §2.9; T-V11-3): `house`,
`row_house`, `cottage` → `v.cottage`; `town_house` → `v.yeoman_house`; `manor`, `tower_house` → `v.manor_house`; `hovel` →
`v.hovel`; `church` → `v.parish_church`; `chapel` → `v.chapel`; `smithy`, `farrier` → `v.smithy`; `inn`, `coaching_inn` →
`v.inn`; `tavern`, `alehouse` → `v.alehouse`; `bakery` → `v.bakehouse`; `watermill` → `v.watermill`; `windmill` →
`v.windmill`; `farmstead` → `v.farmstead`; `tannery` → `v.tannery`; `potter` → `v.potter`; `timber_yard`, `lumber_camp`,
`sawmill` → `v.wood_yard`; `charcoal_burner` → `v.charcoal_pit`; `fish_landing`, `fishery` → `v.landing`; `watchtower` and
`guard_post` → `v.watchtower` (a town watch's post at a village rung is V07 §2.4's watchtower row with a yard by the
green); `town_hall` → `v.reeve_house`; `shop`, `grocer` → `v.shop`. `guildhall` has no village form and plays
itself — a guild record at a village rung stands V11's guild hall (V07 §2.4), never a reeve's house; the
`mercantile-guildhall` archetype's village reading is its `village` cell (V11 §3.13.2). Every other class has no village
form and plays itself at a village rung once a dossier names it (V07 §3.11 step 3); the tag fallback is reached only by a
kind that fell to a `generic-<family>` class (`unmapped_kind`). Village classes no town class plays
(`v.longhouse`, `v.parsonage`, `v.tithe_barn`, `v.pound`) stay village-only. Four readings come before this column: a
scene archetype's `village` cell (V11 §3.13.2), a government seat's `villageSeat` (V11 §3.21.1), V07 §3.11's burial-record
seat (a `cemetery`-class record at a village rung is seated on the parish church's `churchyard` part before any class row
plays) and its
`@absent` reading (each named class zeroed through the `v.` class that plays it, V11 §3.11).

### 3.23 The underground's content rows (item 109; the catacombs by J111)

The schemas are V04 §2.3's (`RuinRule` with `CultureRow` and `PersistenceClass`, `OpeningRow`, `DigRule`,
`CatacombRule`) and V04's stages read them (V11 §2.8b); the ROWS below — the ancient-culture plan rows and their
distinctness, the ruin persistence order, the cavern and ruin chance rows, the void-source rank, the access gain over a
ruin, the dig and opening rows, the catacomb count, order, growth-cap rows (and the `ruin` naming slice, V11 §3.20.1) —
are written here once, and V04 §2.3 cites them. The geometric cells of those tables (depths, burial by age, smoothing,
clearances, frame shares, retries, forecast shares, layout rules, fade weights, lights, overlap shafts) are V04's rows,
cited, never restated. Every cell is `extension` and calibratable
(V12 §3.11's item-109 register row) with provenance `general` (general knowledge, not corpus-witnessed; the practice
named in each row) unless marked. The crypt column is V11 §3.5.8's.

**3.23.1 Caverns (item 109 (a)).** The relief rows (P(soluble) 0.45 and P(volcanic) 0.15 at mountainous relief), the
mine boost, the fissure variant's chance and the breach reach are item 109 (a)'s values in the base's S1 rows (registry
row 9; §4.2 S1 (10)) and in `under.systems`' cavern row (registry row 59; V04's `params` entries `mineBoost`, `mineCap`,
`fissureChance`, `breachM`), cited. This volume writes the one cell item 109 (a) leaves to it: **`miningCellShare`
0.02** — the site "holds mining" when at least this share of the frame's land cells carry `SiteResources.ore` ≥ 0.5
(besides a roster mining class or a dossier mining deposit, item 109 (a) (2)); own. Caverns exist at every rung (item 109 (j) (1)); no cavern row reads the rung.

**3.23.2 Ruin existence** (`RuinRule.chance`; item 109 (b), (j) (1); strongest source first, one ruin system per
settlement; the dossier's facts reach it through V08's `ruinEvidence` row set, V08 §2.6):

| source | chance |
|---|---|
| the dossier's `ancient_ruins` deposit, or a record of scene archetype `ruined-landmark` (V11 §3.13.2) | 1 (by rule, no draw) |
| a `magical_node` deposit or a ley-line income row | 0.6 (`magic`) |
| a `magical` history event, or a founding older than V04's `ancientYears` | 0.4 (`history`) |
| a delving institution (`dungeon_delving_supply_district`, or a record resolving to `adventurers_hall` or `outfitter`) | × 1.5 on the strongest row above (`delvingFactor`), capped at 1; alone 0 |
| no dossier source (the blueprint, only while the fantasy toggle — V04's `recipe.layers.ruins`, D-3 — is on), by relief plain · rolling · hilly · mountainous | THORP to VILLAGE 0.02 · 0.03 · 0.05 · 0.06; TOWN 0.04 · 0.05 · 0.08 · 0.10; CITY and METROPOLIS 0.06 · 0.08 · 0.12 · 0.15 |

Every rung has a non-zero blueprint row, so a hamlet may sit over a ruin (item 109 (j) (1)); the rows rise with the rung
because good sites were re-settled and the larger places are the older (general), and with relief because hill and
cliff cities weather into ruins that survive (J-V11.29). In the parity presets every chance is 0.

**3.23.3 Size, age and depth** are V04's cells (`RuinRule.significance`, `burialByAge`, `depthM`, `maxFrameShare`,
`sharedAxisChance`; V04 §2.3), cited. The source picks the significance as V04 states (a `ruined-landmark` record a
palace; an `ancient_ruins` deposit drawn by the significance weights).

**3.23.4 The ancient-culture plan rows** (`RuinRule.cultures`, V04's `CultureRow`; item 109 (c); own — the practice of
orthogonal colonial grids, processional temple axes, ringed citadels and terraced hill cities; provisional, V12 §3.11's
register):

| id | family | blockPitchM | streetCm main · minor | aspect | orientation | roomM | columnPitchM | hallShare | terraceRiseM | weight | monument (V04's cell) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `ancient-grid` | grid | 24–36 | 500 · 250 | 1.2 | cardinal (within ±3°) | 4–6 | 3.5 | 0.1 | — | 0.35 | none |
| `ancient-axial` | axial | 30–50 (its courts) | 1 000 · 300 | 2.0 | solar (the axis toward the equinox sunrise, ±5°) | 5–8 | 4.5 | 0.3 | — | 0.25 | band 2, hosts temple and tomb |
| `ancient-radial` | radial | 30–45 (ring spacing; 6–10 spokes) | 600 · 300 | 1.0 | cardinal (the first spoke) | 4–6 | 4.0 | 0.2 | — | 0.2 | band 1, host hall |
| `ancient-terraced` | terraced | 12–20 (terrace depth) | 350 · 200 | 3.0 | contour | 4–6 | 3.5 | 0.1 | 4 | 0.2 at hilly and mountainous relief, 0 elsewhere (the rest renormalised) | band 1, hosts temple and tomb |

The `monument` cell is the band index into V02's `stepped-monument` row and the chamber kinds that may host one (V04
§3.5.0a (5a)); a grid culture raised none.

**Distinctness** (item 109 (c): "differ from every current culture row in at least block size, grid regularity and
orientation law"). The current culture rows of V11 §3.20.3 are naming rows with no fabric, so "every current culture row"
is read as the TOWN'S FABRIC ABOVE THE RUIN — V01's `fabricSignature` under the ruin's outline (J-V11.30). The thresholds
are V12 §3.6b's (its `paired` rows on §13.7), cited. Each
row's centre values must differ from B-CITY's bent-cut fabric on at least two of the three measures in ≥ 90 % of 100 seeds
(T-V11-24). *Pre-decided fallback* for a row that fails: its `blockPitchM` moves 25 % away from the town's median block
pitch (smaller for grid, radial and terraced; larger for axial) once, and the bench re-runs; a second failure drops the
row's weight to 0 and is reported to the owner as a table defect. V04's per-seed rotation retry (`distinct`) stays the
system's guard.

**3.23.5 The persistence order** (`RuinRule.survival`; item 109 (c): "monumental halls, walls, colonnades, cisterns, gates
and paved axes survive longest; ordinary rooms least"): the survival share at V04's `ageRefYears` (1 000 years), aged
by V04's law (survival ^ (ageYears ÷ ageRefYears), raised by V04's `coverKeep`):

| hall | wall | colonnade | cistern | gate | axis | street | room |
|---|---|---|---|---|---|---|---|
| 0.8 | 0.75 | 0.7 | 0.7 | 0.65 | 0.6 | 0.45 | 0.2 |

Every ancient-culture row builds in long-persistence masonry, so V11 §3.18's material factor is 1 and is not applied
(J-V11.31). A strictly non-increasing order is a compile bar (T-V11-23).

**3.23.6 The void-source rank** (`UndercityRule.sourceRank`, II.7.5 — the cell V04 §2.3 reads as
`RuinRule.sourceWeight`; item 109 (e): "a ruin ranks ABOVE caverns and quarries … a built city is readier to live in"): ruin 2.0, buried old town 1.5, vaults 1.2, catacomb 1.0, quarry 0.8, cavern 0.8 —
read by II.7.5's undercity source choice (V04 §3.6) and by the `@layer:undercity` pseudo-class (V11 §3.11). Scattered
void dwellings (`voidDwellings`), the forecast floor (`accessForecastMin`) and the ruin's magic lights
(`magicLightChance`, V04 §3.9) are V04's cells, cited.

**3.23.7 Access — dig by class and depth, and the public openings** (item 109 (j) (3), (5); V04 §3.5.7 (d)–(e) reads
them). `DigRule`: `cap` 0.6, `reachM` 6 m, `decayM` 2 m, `maxM` 20 m, `basementFactor` 1.5, `sealedFloor` 0.5 (DEPTH KEEPS
SECRETS: the least sealed share of voids deeper than `reachM` across metropolis seeds, the floor V12's `voidSealedDeep`
bar reads); `planReachM` is V04's geometric cell. **`under.rule`'s `access.ruinGain` 1.5** (item 109 (d): a basement over a
ruin chamber within its reach may hold an access, "its chance raised over a ruin"): II.7.3's basement-access probability
× 1.5 where the nearest underground element is a ruin's, still under the access row's `cap`; own, general. The depth factor is 1 within `reachM`, `exp(−(d − reachM) ÷ decayM)`
beyond, 0 past `maxM` (V04's law), so the dig chance never rises with depth (T-V11-23). `classRow` by family, a class row
overriding (the compiler resolves every class; T-V11-23):

| classes | dig chance |
|---|---|
| the `worship` and `monastic` families; `mine` and `quarry` (a working's pithead) | 0.5 |
| `manor`, `town_house`, `tower_house` (the great houses) | 0.35 |
| the `lodging` family; the cellar trades `brewery`, `vintner`, `warehouse`, `merchant_house` | 0.3 |
| the `craft`, `metalwork`, `textile` and `leatherwork` families | 0.15 |
| `house`, `row_house`, `cottage` | 0.12 |
| `hovel` and the cluster classes | 0.03 |
| every other class | 0.1 |
| V07's village classes (`v.<id>`) | V07 §3.16 (3)'s cells |

`OpeningRow` chances: `sinkhole` 0.15 per qualifying chamber, `mouth` 0.5 per candidate, `skylight` 0.3, `collapsed_shaft`
0.05, `ruin_entrance` 0.6, or 1 where the dossier makes the ruin known (a `ruined-landmark` record, or an `ancient_ruins`
deposit in state `discovered`). The candidates' conditions (cover depths, faces, footprints) are V04's. The overlap shaft
of item 109 (3b) (`overlapShaftM`, `overlapShaftChance`) is V04's `UnderLayoutRule.links` cell, cited.

**3.23.8 Catacombs** (`CatacombRule`; item 109 (k) (1)–(6), J111: only under cemeteries — a churchyard, a
separate burial ground, a monastery's burial ground, a cemetery outside the walls — and, at CITY and METROPOLIS, a
worked-out quarry turned ossuary; churches get crypts, V11 §3.5.8; the age and dry-ground gates are the base's, II.7.6):

| cell | TOWN | CITY | METROPOLIS | note |
|---|---|---|---|---|
| `count` (`churchesPer`, `cap`) | —, 1 | 10, 3 | 8, 5 | item 109 (k)'s values: one more complex per `churchesPer` churches, capped |
| `order` (V04 §2.3's `CatacombRule.order`) | burial | burial, quarryOssuary | network, burial, quarryOssuary | inside a class, by the burials served (V04 §3.5.1 (2)); METROPOLIS takes the `Cemetery network`'s grounds first (J-V11.36) |
| `chance.churchyard` | 0.25 | 0.4 | 0.5 | the base's churchyard value |
| `chance.cemetery`, `chance.network` | 0.3 | 0.45 | 0.55 | a separate or network burial ground |
| `chance.monastery` | 0.4 | 0.4 | 0.4 | the base's precinct value |
| `chance.quarryOssuary` | 0 | 0.3 | 0.3 | never at TOWN (item 109 (k) (2)) |
| `rankCap` | 0.9 | 0.9 | 0.9 | every complex but the primary held to this share of the primary's extent, so the largest is the largest cemetery's |
| `growthCapShare` | 0.01 | 0.01 | 0.01 | a share PER YEAR compounded over the epoch's span: an epoch of y years grows a complex by at most `max(extent × ((1 + 0.01)^y − 1), growthFloorM2)`, through `dmath.pow` (V06's J-V6.53 reading) — about a tenth a decade, the owner's "moderately" (J-V11.32) |
| `growthFloorM2` | 60 | 60 | 60 | m² |
| `plagueNeedFactor` | 3 | 3 | 3 | a plague epoch's burials × this, still under the cap |
| `cryptJoin` (own, other) | 0.7, 0.3 | 0.7, 0.3 | 0.7, 0.3 | a church's crypt joins a catacomb growing under its own churchyard at 0.7, beside another burial face at 0.3 (J-V11.37) |
| `charnelMaxM2` | 40 | 40 | 40 | a dossier catacomb below TOWN is one charnel vault of at most this |

The church count covers the ground buildings of `cathedral`, `great_temple`, `church` and a monastery's church, and V07's
`v.parish_church`; a collective record's members count once each (item 108 (c)), an island church once; a `chapel`
does not count. `ossuaryReachM` and the stagnation fill rule are V04's (V04 §3.5.1), cited. The ratchet — the
extent only ever grows, stagnation fills the ossuaries instead of shrinking — is V04's mechanism and V06's over epochs.

**3.23.9 Switches and the no-op pin.** With every ruin chance 0 and the relief, boost and fissure rows at the base's
values without item 109 (the parity presets, and a document whose pinned set lacks these tables), the underground is
byte-identical to the base's (item 109 (i)'s no-op pin, T109-6; its off form V11 §3.24.0's row; V04's bars hold it);
the catacomb rows' absent default is the base's TOWN-and-above rule (II.7.6; V11 §2.10).

### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks (the owner's "they go in")

Item 110's mechanisms are the base's (items 244–246): the `RetainingWall` line record and the
levelling of S10 and S11, the raised parts on their own ground arena part with the course solver and the raised-way
generator (S4 for viaducts, the end of S6 for elevated roads and aqueducts), the deck plots and their cutter, the
second known-city fixture. The tiers are V02's (J-V2.62), the vaults V04's, the epochs V06's. This section holds only the
ROWS they read (types V11 §2.8c). Every table is `extension` (off in the parity presets, §7.6) and calibratable (V12
§3.11's register) unless marked; every cell's provenance is `general` with the practice named in the row's note (hill-town
terracing; arcaded viaducts and aqueducts; built-on bridges, moles and quays; stepped temple platforms); every value is
our own. No row here holds a random stream: each draw is its reading stage's, under the key V11 §2.10 records.

**3.24.0 The switches and the owner items' off forms** (J-V11.49). One switch per row set, which is also that
table's parity-neutral default when a document's pinned set lacks it (J-V11.12) and the value the MFCG, FTG and VG presets
resolve; every off form is a cell value in its column's range, so a no-op pin's overlay can write it (V12 §2.13,
J-V12.43):

| row set | off | effect when off |
|---|---|---|
| `terrace` | `enabled` false on every row | no `RetainingWall` is generated; the base's plinth, skirt and stepped wings carry every fall (§2.2) |
| `raisedWays` | every `chance` 0 | no raised way is generated; declared ones stand (item 110 (b)) |
| `deck` | every `offer` 0 | no deck offers a plot, so V02's deck budget is never read and V02's fallback constants never apply |
| `roster.specialisations` | every `chance` 0 | no generated stepped building; declared ones stand |
| `deck.landmarks` | every claimant chance 0 | no generated slot building; declared and stamped ones stand |

With all five off, the generated documents are byte-identical to the goldens without item 110 (T-V11-31, the no-op pin
every volume's item-110 pin cites: V02's T-V2-50, V06's T-V6-65, V07's village pin). The chance and offer cells resolve 0
by §7.6's zeroing with no entry; `terrace.enabled`, a switch, carries explicit `presets.MFCG`, `.FTG` and `.VG` entries
false (V11 §2.2's preset entries). **`presets.FM`** (V02's building-scope preset) resolves the stepped and deck families
off — every `roster.specialisations` `chance` 0, every `deck.offer` 0 and every `deck.landmarks` chance 0, carried as
`presets.FM` entries 0 on exactly those cells (V11 §2.2; item 376's scope; landing with V02's M6c, V11 §8) — so the FM
goldens stay byte-identical at every switch-on bump (V12 §3.4.4, J-V12.54).

**The owner items' off forms.** §13.2's convention (5) makes every owner item's no-op pin a `NoOpPin` on V12 §3.7.8's
engine; the cells it writes are these, each in its column's range and, save `history.replay`, equal to what the `MFCG`,
`FTG` and `VG` presets resolve (T-V11-21):

| item | off form | pin (base bar · this volume) |
|---|---|---|
| 102 | `prosperity.drivers` `w_sun` 0; every climate row's `sunlight` 1 | T102-1 · T-V11-30 (the guard against the term's default) |
| 103 | the `coverage` family's weight 0; `coverage.rosterWeight` 0 | T103-3 · T-V11-13 |
| 105 and 107 | the web's off form `web.off` (V11 §3.7.4), which zeroes every good's `comfortM` | T105-4, T107-4 · T-V11-21 |
| 106 | the barrier closure and the stretch profile off (§4.8's switches; this volume's `walls.barriers` rows then unread) | T106-5 · T-V11-19 |
| 109 | every `RuinRule.chance` 0; the relief, boost and fissure rows at the base's values without item 109 (V11 §3.23.9) | T109-6 · V04's bars |
| 110 | the five switches above | T110-7 · T-V11-31 |
| 111 | every climate row's `aridChance` 1 · 1 · 1, `oasisChance` 0, `w_water` 0, `w_waterP` 0, `sunlight` 1, `wellYieldWeight` 0, `wellCoverageFactor` 1 (V11 §3.17.1) | T111-5 · T-V11-38 (c) |
| 113 | `history.settings.replay` false (V11 §3.25.1); the parity presets resolve it false too | T113-7 · T-V11-39 (c) |

A pin's overlay writes these cells as `{ ref, value }` pairs (V12 §2.13); no other cell differs between a pin's two arms.

**3.24.1 Terraces and retaining walls** (item 110 (a)). *`terrace`* (registry row 78; the three rows equal;
J-V11.40):

| rung | enabled | slopeMin (share) | stepMinCm | stepMaxCm | minTerraceDepthM | retainingReachM | flatDepthM | coverShare |
|---|---|---|---|---|---|---|---|---|
| TOWN | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| CITY | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| METROPOLIS | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |

The `enabled` column is a switch, not calibratable (`ColumnSpec.calibratable: false`, as V11 §3.7.4's `orientEnabled` and
`splitEnabled`): the owner's "they go in" holds it true by the schema, its off form is V11 §3.24.0's parity value, and no
calibration run can name it (V12 §3.7.2 rule (1)); the terrace family's realism is confirmed through its thresholds'
register line and the M4 panel's M4-110 group, never by moving the switch (J-V11.75). The last three columns are V09
§4.20.1 (3)'s flat-ground bends of a drawn retaining stroke (own; written at M3a, calibrated by V12 §3.11's terrace
line): their only reader is that bend, which never refuses on the ground's account.

* **Units.** `slopeMin` is a share (rise ÷ run); V01's slope in percent is 100 × share, so V01 §3.3's stepped fabric
  band "between slopeMeanPct 8 and terrace.slopeMin" reads 8 % to 15 %. The TOWN row is "the base-rung
  terrace row": V07's village `PLaw` takes its values at every anchor (J-V7.41), and V05 reads the rows unchanged on an
  island's arena.
* **Compile bar T-V11-32 (a).** `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm` (the base's `plinthCm` 30 and `skirtMaxCm`
  300, §2.2, read from their tables), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` (else no unit could be levelled) and
  `flatDepthM ≥ minTerraceDepthM` (a flat-ground bend's terrace is a lawful terrace).
  A fall below `stepMinCm` stays the base's plinth; between `stepMinCm` and `stepMaxCm` one wall; above, an intermediate
  terrace of at least `minTerraceDepthM` and a second wall; a slope steeper than `stepMaxCm ÷ minTerraceDepthM` (0.67) is
  not levelled (the base's skirt and stepped wings, or no plot, reported). The tables editor clamps an edit that would
  break an inequality to the nearest lawful value and says so in one line (item 101 R2).
* **The relief column** (`s0.features`' relief rows, registry row 9; item 289): `terracedEdges` plain false, rolling
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
The rows' `says` (the clerk's and the terrace tool's sentences): `terrace/<rung>` "levelled into terraces: the slope here is
{s} %, more than {slopeMin} %, each step at most {stepMax} m"; `retaining/<band>` "a {material} wall holds the {band} plot
above".
Item 110's three wall materials take §8.2 roles (item 412).

*`retaining.settings`* (the table's named row, V11 §2.1's settings form; J-V11.96): **`stateSnapCm` 100 cm** — item 245's
state-profile snap: a state knot whose vertex is gone is re-placed on the new chain within this distance of its old
point, else dropped (§2.2's chain profiles; prose name `retaining.stateSnapCm`); `own`, `extension`, `calibratable: true`,
written at M3a with its entry on V12 §3.11's default line, restated in place by V06 §8's line from V6-E2 on
`bar.T-V6-62` (J-RF2.4: the confirming measurement is T-V6-62's H-TERRACE century; the pre-decided fallback, the wall's
own `stepProfile` sample spacing as the tolerance). Its one reader is the re-derivation that carries a generated wall's `retaining_state_knot`s onto a new chain: S10 and S11, at
generation after an edit that re-levels a unit and at every epoch op that levels (a new stage's S10–S11, a rung-3 re-cut,
a `rebuild` running S11, V06 §3.19.4 (1), (6)), each under S10's or S11's id; a `repairRetaining`, the landfall's write
and a cut or join by `rekey` (item 245) move no knot by it. Under the parity presets it resolves 0 (a knot then
survives only on its own vertex), where no generated wall stands anyway (V11 §3.24.0).

**3.24.2 Raised ways** (item 110 (b): "at CITY and METROPOLIS the generator raises a way where there is a reason, each a
soft rule with a table chance and a count cap per rung", "A TOWN gets them only by declaration"; J-V11.41).
*`raisedWays`* (registry row 80; readers: the base's generator — S4's route solve, at generation and in each later
stage's S5b, and S6's end —, V06 §3.19's epoch
pass, V09's T4 dry run and aqueduct tool, V04's vaults, V05's caster ceiling, V10's why, V12's register):

| rung · kind | chance | cap | pMax |
|---|---|---|---|
| CITY · viaduct | 0.6 | 1 | 0.9 |
| CITY · elevated | 1 (the band factor carries it) | 1 | 0.8 |
| CITY · aqueduct | 0.6 | 1 | 0.9 |
| METROPOLIS · viaduct | 0.7 | 2 | 0.9 |
| METROPOLIS · elevated | 1 | 2 | 0.8 |
| METROPOLIS · aqueduct | 0.7 | 2 | 0.9 |

* **The rung gate is the schema's**, provenance `owner`: the key's `rung` enum is exactly `CITY | METROPOLIS`, so there is
  no row below CITY and no calibration, pack or `editTable` can make one; an edit adding a TOWN row is refused as F-EDIT
  naming the owner's rule, with the alternative "declare the raised way (T4 `road` with `raised`, or an aqueduct)" (item
  101 R2, R13). It is not a register cell. The compiler stamps it `ownerRule: '110 (b)'` (V11 §3.2.1 step 4); the CITY
  and METROPOLIS columns carry the calibration minima 0.02 (`chance`) and 1 (`cap`), binding calibration runs, fallbacks
  and corpus packs only — never a pin, a parity preset's zero or a user's edit (J-VI.10).
* **`raisedWays.settings`**: `totalCap` CITY 2, METROPOLIS 4 (the caps are ceilings, never quotas); `viaduct.minDropM` 12 m;
  `viaduct.spanCostFactor` 4 (a metre of span priced as four ground metres against the detour); `viaduct.maxSpanM` 600 m;
  `viaduct.routeClasses` through, primary, secondary; `elevated.minRiseM` 8 m (the segment's lowest ground at least this
  below both ends); `elevated.maxSpanM` 600 m (the two anchors at most this apart; V06's name); `elevated.bandFactor` poor 0,
  modest 0.1, prosperous 0.3, rich 0.5 (read at the band holding the mean of the two ends' prosperity values);
  `elevated.landmarkFactor` 1.5 per dossier landmark on high ground at an end (the records DR35 lists, counted by V11
  §3.24.7 (4)), `landmarkMax` 2; `elevated.landmarkMinSignificance` 20 (the least class significance, §10.2 and item 72, of
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
* **`raisedWays.structure`** (the heights V05's caster ceiling and V04's vaults read): `clearanceCm` cart
  450, foot 250 (the least soffit over a crossed part-0 way, by whether that way's class carries carts, V11 §3.24.5);
  `parapetCm` 100; `channelWallCm` 60 (an aqueduct channel's walls above its deck); `channelCm` [60, 120] and `deckExtraCm`
  100 (an aqueduct's width: the channel plus 50 cm each side — the `ways.widths` row of the `aqueduct` way class, registry
  row 3); `maxPierM` viaduct 45, elevated 12, aqueduct 35 (a course needing a taller pier drops, reported
  `raised_too_tall`); `pierSpacingM` masonry 8–15, timber 4–8; `pierWidthShare` 0.2 of the span, `pierMinCm` 150;
  `material` by band — poor timber 0.5, rubble 0.5; modest rubble 0.7, brick 0.2, timber 0.1; prosperous rubble 0.4, ashlar
  0.4, brick 0.2; rich ashlar 0.7, brick 0.3 — an aqueduct never timber (a timber channel leaks; its timber weight is
  renormalised away). The deck's level is the course's (the viaduct's grade across the gap, the elevated road's ends and
  ramps, the aqueduct's gradient line from its intake); these cells bound it, never set it. `pierSpacingM`,
  `pierWidthShare` and `pierMinCm` are read by item 244's support step (§2.7: the piers' pitch and footprint),
  `clearanceCm` by its clearance rule, and `maxPierM` drops a generated course there (`raised_too_tall`).
* **The span rule's cells** (`raisedWays.structure.span` and `.slideMaxFactor`; J-V11.96), read by §2.7's support step
  and span rule (item 244), their values stated here once: `span.vaultShare` viaduct 0.6, elevated 0.7, aqueduct 0.15
  (scaled by `era.raisedVaultM` × `culture.raisedVaultM`, capped at 1); `span.maxHeightCm` 900; `span.minHeadroomCm` 250;
  `span.maxFallCm` 150; `span.vaultCap` THORP, HAMLET and VILLAGE 10 each, TOWN 40, CITY 120, METROPOLIS 240 (all six
  rungs — a declared raised way stands at any rung; a field of the named row, so the keyed rows' rung gate is untouched);
  `span.deckDepthCm` 150; `span.supportFoundationCm` 400 (each pier's depth below the levelled ground); `slideMaxFactor`
  1.5 (a sliding station keeps both neighbouring spans within this × the pitch band's upper bound). Each is `own`,
  general (arcades walled into vaults where the ground under them was built on), `extension`, `calibratable: true`,
  written at M3a, its register entry V12 §3.11's span-rule line (owner V04) or the `raisedWays.structure` line
  (`slideMaxFactor`). A prose name `raised.vaultShare`, `raised.vault.maxHeightCm`, `raised.vaultCap`,
  `raised.deckDepthCm` or `raised.supportFoundationCm` resolves to these cells (T-V11-1 (a)). Readers: the base's support step and span rule, run with the raised-way
  generator (S4, S5b, S6, EVO_RAISED) and by a declared or drawn way's operator; `foundationObstacles` (V04 §3.5.0,
  `supportFoundationCm`), derived where U-SYS, U-CITY, U-FADE and U-DIG's cost (under U-ACCESS and U-LINK) read it; V04's
  arch vaults (U-SYS, U-FADE).
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
* **The draw and the cap** (item 259). S11 draws ONCE per use, at the use's first building, before V02
  §3.2's resolution, on `siteplan` keyed by (the use's lineage, `'spec'`), taking the row when `u < chance` (the first row
  of the use's culture and class; a class has at most one row per culture). The cap is `max(capMin, ⌊capShare × S2's
  building count⌋)` (at village rungs V07's `rules.tiers.capPerSettlement`, per settlement), counted in the roster's sequence order, so it stays prefix-stable
  (§10.2). The chosen id is written to `Use.specialisation`, and the row's `composition` and `heights` replace the band
  template's for that building. A use whose specialisation the user set (`setAttr`, §7.1), declared
  (`siting.declared`'s `specialisation`, V11 §4.2) or reached by a keyword (V11 §3.13.2) is exempt from the chance and the
  cap, never overwritten (item 101 R13) and not counted — so a declared stepped temple stands in any town of any culture
  (the second known-city fixture's stepped temple is made so).
* **The carriers** (V03's keys): `stepped_temple` by `great_temple`, `cathedral` and `church` (and
  `generic-worship` by keyword or declaration only); `terraced_palace` by `palace`; `tiered_tower` by `tower_house`,
  `mage_tower` and `watchtower`. V03 keys its programme rows `for.use` by the specialisation id with `for.cls: '*'`.
* **As a designation** (the clerk's or a document's class slot naming a specialisation id, V10's `class`): the
  specialisation's first carrier is placed — `stepped_temple` a `great_temple`, `terraced_palace` a `palace`,
  `tiered_tower` a `tower_house` — with `Use.specialisation` set as a declared one (held, exempt from the chance and the
  cap). Their plain words, the `desc.building` specialisation word and the clerk's: "a stepped temple", "a terraced
  palace", "a tiered tower".
* **At village rungs** a row applies to the village class that plays its `cls` (V11 §3.22: `church` →
  `v.parish_church`, `tower_house` → `v.manor_house`, `watchtower` → `v.watchtower`; a `cls` with no village form reaches
  no village class), so V07 §2.4's eligible classes are exactly those three; the cap is V07's
  `rules.tiers.capPerSettlement` (1), counted per settlement, never per row; the chance is the row's, which V07 §2.4's
  culture cells leave as it is (the European cultures have no row).
* **The heights.** V11 §3.6.4's row `stepped-shrine` (a shrine on a platform is a few metres, never a 20 m nave;
  J-V11.43). A stepped building's crypt, where its class has one, follows V02's crypt ladder under tier 0 (V02 §3.15).
* **The dossier trace.** `site.culture` → these rows; the port supplies no religion that builds in
  tiers, so the culture is the only input.
* **V04's monument cells** are V11 §3.23.4's `monument` column.

**3.24.4 Decks, the `deckOk` column and the landmark slots** (item 110 (d): "frontage plots with a `deck` size budget
(small, light, a table row), towers and forts at mole heads and mid-mole as placed landmarks"; J-V11.44, J-V11.46). *`deck`* (registry row 82; readers: the base's deck-plot cutter at S10, V02 M10/M11's
`DeckBudgetRead`, V06 §3.19.5, V07's village widths, V09's badges, V12):

| kind | offer TOWN · CITY · METROPOLIS | footprint m² poor / modest / prosperous / rich | max floors p / m / pr / r | frontage m | min plot depth m | fill | sides | end clear m |
|---|---|---|---|---|---|---|---|---|
| bridge | 0.15 · 0.35 · 0.5 | 15–30 / 20–40 / 25–50 / 30–60 | 2 / 2 / 2 / 3 | 3–6 | 3 | 0.8 | both | 6 |
| pier | 0.1 · 0.2 · 0.3 | 10–20 / 12–25 / 15–30 / 15–35 | 1 / 1 / 1 / 2 | 3–5 | 2.5 | 0.3 | both | 4 |
| mole | 0.3 · 0.5 · 0.6 | 15–30 / 20–40 / 25–50 / 30–60 | 1 / 2 / 2 / 2 | 4–7 | 3 | 0.4 | harbourSide | 15 |
| quay | 1 · 1 · 1 | 20–40 / 30–60 / 40–80 / 50–100 | 2 / 2 / 3 / 3 | 4–8 | 4 | 0.6 | landward | 5 |

The offer is drawn once per deck by the cutter, keyed by the deck's lineage; village rungs read V07's cells (J-V7.41). The
footprints bracket V02's stopgap band ([20, 60] m²), and V02's T-V2-47 reads whichever row is loaded. A plot's `says`: "on
the {deck}: at most {n} storeys, about {a} m²" (id `deck/<kind>/<band>`).

*`deckOk`* (a compiled column of `roster.classes`, step 5a; item 432; listed in the manifest; a class row may
override). A class is ELIGIBLE only when all hold: its template family is `shopfront`, `workshop-row`, `tavern-row`,
`dwelling-row`, `chapel` or `watch-house`; its compiled profile emits no `fire` ≥ 2 and no `smell` 3 (a timber deck and a
crowded way); its balance is not `heavy`; it is not `outside`; its `crypt` is not `always`. Eligible trades and shops take
`[bridge, mole, quay]`; `row_house`, `house` and `lodging_house` `[bridge, quay]`; `chapel` `[bridge]` (the bridge chapel);
`toll_house` `[bridge]` (a bridge gatehouse); `guard_post` `[bridge, mole]`. Explicit rows:
`fishmonger` and `ship_chandlery` `[pier, mole, quay]`; `fish_landing` `[pier, quay]`; `harbour_master` and
`customs_house` `[quay]`. The landmark-slot classes take their slots only: `fort` `[mole, bridge]`, `lighthouse` `[mole]`,
`watchtower` `[mole, bridge]` — `DeckContext.landmark` only. Compile bar T-V11-32 (c): no class whose `crypt` is `always`
or whose profile emits `fire` ≥ 2 carries a deck kind (J-V2.68). **Per use** (V02 §3.16 (6)): S10b
reads `deckOk` per use — `[]` when the use's effective crypt is `always` (its class `always`, a dossier crypt record bound
to it, DR32, or a keyword row `binds: 'cryptAlways'`, V11 §3.13.2), else its class's compiled column — so a bridge
chapel carrying a crypt record stands on land with its crypt, and V09's T6 landward bend sends a hand placement there. A
class not admitted: `says` "a {class} can't stand on a {deck}" (id `deckok/<class>`). V07's village rows (`v.<id>`, V11
§2.9) carry their own cells at village rungs.

*`deck.landmarks`* (registry row 83; one claimant per slot; the draws are the cutter's, keyed by the slot's deck lineage;
a declared or stamped class is held and exempt from the chance):

| slot | claimants, in order |
|---|---|
| `moleHead` | at a WALLED port, item 106 (e)'s harbour-mouth chain tower holds it (wall furniture, never a building); a `fort` replaces it as the chain's anchor on that head at chance 0.5 at CITY and METROPOLIS when V11 §3.16.2's matched threat is `naval` or `raider`. At an UNWALLED port: a `lighthouse` on a sea-facing mole (CITY 0.3, METROPOLIS 0.5), else a `watchtower` (0.2 at every rung) |
| `midMole` | a `watchtower`: TOWN 0.1, CITY 0.2, METROPOLIS 0.3 |
| `bridgeMid` (span ≥ `minSpanM` 40 m — the one cell V09's bridge mid-span slot reads) | a `fort` at 0.05 at CITY and above, on a bridge outside the enceinte on a through route; otherwise by declaration only (J78's bridge fortress) |
| `islet` | a `lighthouse` at 0.6 where a causeway or mole reaches a sea islet |

The two new classes (`fort`, `lighthouse`) are V11 §3.5.7's and §3.5.9's rows; the `deck` material key is V11 §3.19.3's.

**3.24.5 The way-class crossing rule** (item 110 (a): "a stair or a ramp by its slope (a way-class rule, never a gap in the
wall)"; (b): "its two ends are ramps or stairs joined to ground vertices"; J-V11.47). *`ways.crossing`*
(registry row 81; readers: the way builders where a way crosses a `RetainingWall` — S4, S5, S9 and V01's lanes — the raised
ways' ends (S4's and each later stage's S5b's viaducts, S6's end and V06 §3.19's pass), V09's T4 ghosts):

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
  stair and never a gap in the wall (the owner's words). **Beyond 1.5 ×** the levelling lowers the wall's step where the
  way crosses: S10 re-grades the high side's terrace inside the way's corridor (and the wall's face within half a corridor
  width of it) so that the step there is 1.5 × `rampMaxGrade` × the run available, the wall keeping its line, its height
  elsewhere and its continuity; reported `W_STEP_LOWERED` with the way and the wall (a bend, never a refusal: both stand).
  T-V11-32 (h) holds it.
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
* **Well yield by ground** (item 111 (b); the `wellYield` raster S1 (10) writes, §4.2): `wellYield` alluvial 1.0, gravel (a
  dry riverbed's) 0.9, lowGround (by the water table) 0.7, default 0.4, rock 0.1, × `geologyYield` ordinary 1, soluble 0.8,
  volcanic 0.6; `topYield` 0.7 — ground at or above it is "the top well-yield class" that S3's water pull and the
  prosperity water term read as reliable water (§4.2 S3 (6), §4.5). S10b's wells and public fountains read the raster
  through the climate row's `wellYieldWeight` (V11 §3.17.1), and V06's failing springs read it over epochs. Own, general
  (wells sunk in alluvium and riverbed gravels, scarce on rock); calibratable, provisional, V12 §3.11's register.
* **The ratio** `needRatio = D ÷ S` (`S = 0` counts as unmet, and the candidate lives); an aqueduct is a candidate when
  `needRatio > aqueduct.needRatioMin` and an intake lies within `sourceReachKm` (else `aqueduct_no_source`, reported). The
  standing aqueducts' deliveries join `S` at an epoch (V06 §3.19 (3)).
* **Worked check (PLAUSIBLE; T-V11-33 measures it).** A temperate alluvial CITY of 15 000 in 100 ha, far share 0.6: D 180, S 240 +
  41, ratio 0.64 — no aqueduct. An arid METROPOLIS of 60 000 in 300 ha, far share 0.7: D 840, S 360 + 197, ratio 1.5 — a
  candidate. The rule favours dry, karst and large cities, as the historical pattern does.
* **Pre-decided fallback** (V12's register; T-V11-33's bench): if the share of arid METROPOLIS seeds with an aqueduct
  candidate is below 0.5, or the share of temperate alluvial CITY seeds with one is above 0.2, `perHeadL` moves by 5 litres
  once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements.

**3.24.7 The dossier's reach into item 110** (items 20, 20 (h); J-V11.48):
1. **The aqueduct terminal.** V11 §3.3.3's feature class `raised:terminal` is the distance to the terminal point of a
   generated or declared aqueduct. The binding is never a class row (a hard class row would exclude every plot of a town
   with no aqueduct and pull every conduit house to one point): the aqueduct's generator (the base's, item 244) writes ONE §7.7
   `PlacementCriteria` row, id `pc/aqueduct/<way lineage>`, "`near` → `raised:terminal` within 0, hard", on exactly one
   `conduit_house` roster member — the dossier-bound one when a record binds one, else the first
   unplaced member in roster sequence — when the terminal kind is `cistern` (V11 §3.24.2). Item 401 makes the generator a
   writer of `PlacementCriteria` for this row only. The row is written only on a `conduit_house` the roster or the
   dossier holds; otherwise the terminal is a fountain pin (J-VI.9). Every other conduit house keeps its class row, and no
   class row carries a hard terminal row.
2. **The toll bridge.** `dossier.kinds` carries the optional cell `implies` (V08 §2.6's shape); the row `toll_bridge`
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

### 3.25 History rows — the settings, the burial threshold and the event-to-epoch rows (item 113)

The history-first path is the base's (§4.11 *History-first generation*; §7.7 DR36–DR39; II.7.6's buried former
settlement) and its engine V06's (V06 §3.20); V08 reads SettlementForge's history into `HistoryHint` (V08 §2.6c). This
section holds the rows they read: table `history` (registry row 92; types V11 §2.8), its named row `settings` and its
event-to-epoch rows. Every cell is `own`, general (towns that burned and were rebuilt, plague years, sieges and
occupations, pilgrim towns, ruins buried under a century of silt and rebuilding), `extension`, and calibratable save
`replay` (a switch, `calibratable: false`); provisional, their entries V12 §3.11's register.

**3.25.1 The settings row** (`history.settings`):

| cell | value | range | read by |
|---|---|---|---|
| `replay` | true | switch | §4.11's history-first path (V06 §3.20.1); false is item 113's off form (V11 §3.24.0), and the `MFCG`, `FTG` and `VG` presets carry explicit entries false |
| `epochYears` | 10 yr (a decade, item 113 (a) (2)) | [5, 100] | the coarse epoch's span (V06 §3.20.2 (3)) |
| `symbolicQuantile` | 0.25 (the range's lower quartile, item 113 (f)) | [0, 1] | DR36's effective peak: the population at this quantile of the higher tier's range (§1.1's rung table), marked `symbolic` (V06 §3.20.2 (1)) |
| `defaultAgeYears` | THORP 160, HAMLET 75, VILLAGE 140, TOWN 175, CITY 300, METROPOLIS 500 (the mid-points of SettlementForge's ages by tier) | each [10, 1 000] | the age of a history that states none — the blueprint's history option (V06 §3.20.2 (2)); a dossier's absent age is V08's `historyAge` row's |
| `burialYears` | 100 yr (item 113 (c): "a century by default") | [20, 1 000] | the burial threshold (V11 §3.25.2) |
| `burialFactor` | flood 0.7, silt 0.8, rebuilt 0.6, bareRock 1.5 | each [0.1, 3] | V11 §3.25.2 |
| `burialBoundsYears` | [30, 400] | low ≤ high, within [10, 2 000] | the clamp of V11 §3.25.2 |
| `reuseCost` | 0.6 | [0.1, 1] | × §4.3's `existingFabricCost` along an abandoned way's trace in a refounded settlement's route solves (S4, S5b, V07's VS4), so the new town reuses the old roads, gate gaps and bridges where they serve (item 113 (b); V06 §3.20.5 (2)) |

**3.25.2 The burial threshold** (item 113 (c): "a century by default, shortened by floods, river silt and rebuilding on
top, lengthened on bare rock"). A region of ruined fabric is buried once its abandonment age — from the week its last
household left — reaches

`B = clamp(burialYears × flood^nFlood × silt^nSilt × rebuilt^[built over] × bareRock^[on rock], burialBoundsYears)`,

`nFlood` the great floods (V06's `flood` hazard) over the region since it was abandoned, `nSilt` the silting events of a
river reach beside it (V06 §3.12), `[built over]` 1 when a building of a later settlement stands on the region, `[on
rock]` 1 when the site is bare rock — the dossier's `site.terrain` rocky or mountainous (V06 §3.20.5 (3)), on a
standalone map the region's ground class `rock` (§4.2 S1 (10)) — each bracket 0 otherwise. So a quiet ruin is buried
after 100 years, one flooded twice after 49, one on bare rock after 150, and none before 30 or after 400 years. V06 tests
it at each coarse epoch's close (V06 §3.20.5 (3)) and V04's `BuriedFormer.lay` reads it (V04 §3.5.5 (b)); a younger ruin
stays on the surface and ages by the decline ladder (§4.11).

**3.25.3 The event-to-epoch rows** (keyed `<type>/<template>`; item 113 (a) (2); V06 §3.20.3 reads them). A history event
— its family, template word, years ago and severity `s` ∈ [0, 1] as V08 reads them (V08 §2.6c) — takes the row whose
`template` is its template word (template words are unique across the rows), else its family's `*` row; so every one of
SettlementForge's 29 templates maps, the template rows below refining those whose effect differs from their family's. A
row's `type` names the family it refines. Each effect becomes one `ReplayEffect` (V06 §2.14) at the event's week, its
size scaled by `s`; an effect with a `minSeverity` applies only when `s` reaches it. Ranges: each `slice` step [−1, 1]
(the result clamped to [0, 1]); `population` `factorAtFull` [0.2, 1.5] (the epoch's target × (1 − (1 − factorAtFull) ×
s)); `weeksAtFull` [0, 520]; `minSeverity` [0, 1]; a `request` count [0, 10] per rung.

| row | effects | `says` (V10's story; `{n}` the years ago) |
|---|---|---|
| `economic/*` | slice `wealthStep` −0.1; population 0.9 | "hard times came {n} years ago" |
| `political/*` | slice `threatStep` +0.2 | "there was unrest {n} years ago" |
| `disaster/*` | population 0.8; destroy at `s` ≥ 1 | "a disaster struck {n} years ago" |
| `religious/*` | slice `disorderStep` +0.1 | "a religious upheaval {n} years ago" |
| `magical/*` | slice `disorderStep` +0.1 | "strange events {n} years ago" |
| `demographic/*` | population 0.85 | "the people dwindled {n} years ago" |
| `occupation_infiltration/*` | slice `threatStep` +0.3, `disorderStep` +0.1 | "it was held by outsiders {n} years ago" |
| `exile_return/*` | population 1.1 | "exiles returned {n} years ago" |
| `disaster/great_fire` | hazard `fire` at `s` ≥ 0.25; destroy at `s` ≥ 1 | "a great fire burned {district} {n} years ago; it was rebuilt" |
| `disaster/great_flood` | hazard `flood` at `s` ≥ 0.25; destroy at `s` ≥ 1 | "a great flood came {n} years ago and the ground was raised" |
| `disaster/plague_years` | condition `plague`, 156 weeks at full; population 0.7 | "the plague years, {n} years ago, filled the burial grounds" |
| `occupation_infiltration/occupation_legacy` | request `castle` CITY 1, METROPOLIS 1 at `s` ≥ 0.5; slice `threatStep` +0.2 | "the occupiers built the citadel {n} years ago" |
| `economic/trade_collapse` | slice `wealthStep` −0.25; population 0.8 | "trade collapsed {n} years ago and the edges emptied" |
| `economic/market_crash` | slice `wealthStep` −0.15 | "the market failed {n} years ago" |
| `demographic/demographic_pressure` | population 1.1 | "the town filled up {n} years ago" |
| `religious/pilgrimage_surge` | request `lodging_house` TOWN 1, CITY 2, METROPOLIS 4 at `s` ≥ 0.25 | "pilgrims came {n} years ago, and hostels were built for them" |
| `political/external_threat` | slice `threatStep` +0.4; destroy at `s` ≥ 1 | "the town was threatened {n} years ago" |

A `destroy` effect is DR38's destruction (V06 §3.20.5 (1)); refounding is the lifecycle's or DR38's inference, never a
row. An event older than the replay's window keeps only its soft hint (§4.11 item 1); an ancient "Fall of" event is item
109's older civilisation (DR30), never a row's. With `replay` false no row is read and the history's events are §4.11
item 1's soft hints alone. The rows are checked by T-V11-39.

### 3.26 Edges and combinations

**The rules that close every edge** (J-V11.97); each mechanism's own outcomes follow in the first table.
(a) **Data.** Every table is compiled: a missing, empty, out-of-range or contradictory source cell stops the build naming
the cell (V11 §3.2.1 steps 4–6), so no runtime reader meets one; an empty row list is the mechanism absent (no row, no
effect) unless a `TotalityRule` requires rows, when the compile fails. At load a pinned set lacking a table, row or cell
reads that row's absent default in V11 §2.10, reported once. A dossier fact with no row takes the declared else —
`unmapped_kind` → the category's `generic-<family>` class, `unmapped_word` → the family's row — and is reported (V08 §4.6).
(b) **Geometry.** This volume commits no geometry. The stages that read its rows commit through the kernel, and a
degenerate result takes the stage's failure class on its ladder (§5.1's rule; §5.2), never a whole-map retry; a zero
input to a rule here (a zero-length way or arc, a zero-area plot, district or claim, an empty unit) reads the zero case
named below.
(c) **Rungs.** Every row names its rungs or holds at every rung THORP to the METROPOLIS cap; a rung a keyed table has no
row for reads that table's neutral (no `raisedWays` row below CITY: no generated raised way); at the village rungs a town
class is read through its `villageForm` and V07 §2.4's `v.` rows (V11 §3.22).
(d) **Toggles and presets.** Each `extension` row's parity value is its off form (V11 §3.24.0) or §7.6's zeroing; `FM`
resolves its `presets.FM` entries; a layer toggled off leaves its rows unread; the dossier row sets (never calibrated)
are read the same in every preset.
(e) **Lifecycle.** Every table's save, load, undo, redo, regenerate and migrate are its V11 §2.10 row: an edit is an
`editTable` with its undo record, regeneration reads the pinned version, a major version migrates by §7.5.

| mechanism (V11 §) | edge | outcome | failure rung | test |
|---|---|---|---|---|
| registry, compiler, loader (§3.1, §3.2) | a table with no rows; a reader id neither a StageId nor a module id; a shipped file whose hash disagrees with its manifest; two sources writing one cell | rule (a); compile refused naming the entry; the loader refuses the file and keeps the previously pinned set (§7.6), reported; compile refused naming both sources | check | T-V11-0, T-V11-1, T-V11-10 |
| coverage units (§2.3) | `per` or `target` at 0; a district with no residential plot | refused at compile (ranges `per` [1, 100 000], `target` [0.01, 100], T-V11-3); r = 0 and satisfaction 0 at its plots (V11 §2.3) | check | T-V11-3, T-V11-13 |
| relation families and derived rows (§2.4, §3.3) | a family no class carries; a target class with no member on the map; a feature the site lacks (no river, no gate, no harbour); more than 48 derived rows for a class | no row derived; its soft rows score 0 at every plot (beyond `beyondM`) and a hard row with an absent target excludes every plot, the request taking F-SITING's closest options (§5.2); a relative `upstream`/`downstream` row with no member on the plot's network 0.5 (§4.7 S10b); the excess shadowed, listed in the manifest | leave out and report | T-V11-6, T-V11-27 |
| profile families and the class ladder (§3.4, §3.5) | a record resolving to no family; a class with no template row at a band; a class whose rounded count is 0 | `generic-other` (item 104 (a) (7)); compile refused (T-V11-7); no member, unless a dossier record names one (§7.7 item 2: the record places it) | substitute; check | T-V11-4, T-V11-7, T-V11-16 |
| templates and heights (§3.6) | a plot below the band's least footprint; a claim of zero area; a `refuse` family on a claim that cannot be joined; a village rung | `compact` shrinks to the plot (S11's ladder); S3's refusal, no building; `underSize` reported, nothing placed there, the request re-sited by S10b; the `v.` row's `templateFamily` (V07 §2.4) | simpler shape; leave out and report | T-V11-7 |
| goods and the web (§3.7) | a good no member produces on the map; a consumer with no provider within `maxDistanceM`; a class with neither inputs nor outputs; one provider for many consumers | the link binds the import endpoint's store (V11 §3.13.4) where the edge lists `import`, else `s_l` 0 and the why names the missing good; `s_l` 0; `balanced` (V11 §3.7.3); demand beyond `perConsumers` adds a provider by S2's need propagation | substitute | T-V11-14, T-V11-28 |
| signature pairs (§3.8) | an endpoint absent from the town; a self-pair (`goldsmith-cluster`) with one member | the pair scores 0; no row (a lone member has no partner) | — | T-V11-3, T-V11-12 |
| district kinds and identities (§3.9, §3.10) | a town of one district; no kind's relations met; no identity past its threshold; a QUARTER record whose identity row a pinned set lacks | the typing scorer's highest score, ties by row order (§4.5); `plain-<band>`; the generated `dominant-<family>` row; the record's quarter named by the family's generated row, reported | substitute | T-V11-3 |
| the institution map and ladders (§3.11, §3.12) | a kind the line adds later; a record whose kind sits above the settlement's tier; `@absent` naming a class the roster lacks; a COUNT whose member is a pin | `generic-<family>`, `unmapped_kind`; the class plays itself at any rung once named; no effect; a floor over the pins' own count (V11 §3.12) | substitute | T-V11-2, T-V11-17 |
| custom content (§3.13) | a record with no category, tags or keywords; a chain whose resource the site lacks; a water resource on a dry site | `generic-other`; the resource created as a feature sized `featureHaPerVolume`; a `well` pin with a spring beside the first processor, never a created river | substitute | T-V11-16 |
| concealment and covers (§3.14) | one cover candidate; no cover plot passing its hard rows; no mode feasible; the parity presets | that cover; §4.7's fallback chain (underground → front → hidden), never placed open; F-SITING's closest options, reported, never dropped; every extension weight 0, so `none` — and the sensitive kinds' dossier facts, if any, as stated | substitute; leave out and report | T-V11-8 |
| walls on barriers (§3.16) | a site with no barrier; a single arc; a zero-length arc; a threat key with no row; village kinds | every arc `open` (a full wall, the base's); classified alone; refused by the kernel and merged into its neighbour (rule (b)); the `none` row (an open front); V07 §3.4 step 5's grading | repair locally | T-V11-19 |
| climate and land use (§3.17) | a biome the reading cannot place; a hinterland with no face of a good's site kind; an arid site that drew a river; an oasis site with no hollow | the climate row V08's biome reading falls back to (V08 §2.6); the good supplied by import; P(oasis) = `oasisChance` (no factor); the lowest ground cell of the area band (§4.2 S1 (2)) | substitute | T-V11-38 |
| decline by material (§3.18) | a wall material with no row (a pack's) | read as `rubble`'s row, noted | substitute | T-V11-40 (a) |
| era, region, materials (§3.19) | a recipe era with no row; a building no material key matches | `c14`, reported; the `every era · stage 1` row | substitute | T-V11-3 |
| naming (§3.20) | every guarded alternative failing; a corpus exhausted by collisions; a pack culture with no corpora | the slice's unguarded alternatives; §9.6's naming ladder (`…/attempt=n`, then the numbered suffix); the shipped English-fantasy corpora (D-6) | substitute | T-V11-15 |
| government and households (§3.21) | a seat class the roster cannot place; a drawn household size beyond `min` or `max` | the row's named alternative (`palace` else `castle`; `tower_house` below CITY with the castle toggle off); clamped to [min, max] | substitute | T-V11-37 |
| `villageForm` (§3.22) | a class with no village form at a village rung; several town classes played by one `v.` class | plays itself once a dossier names it (V07 §3.11 step 3); counted through that one class, `@absent` zeroing it once | — | T-V11-37 |
| the underground's rows (§3.23) | no catacomb candidate; a ruin outline of zero area; every chance 0 | no catacomb (`count` is a cap), reported by V04; rule (b); no ruin (V11 §3.23.9) | leave out and report | T-V11-23, T-V11-26 |
| item 110's rows (§3.24) | a deck too short for one plot; a cart crossing beyond 1.5 × `rampMaxGrade`; a TOWN raised-way row; a specialisation cap below 1 | no deck plot (the cutter offers none); `W_STEP_LOWERED` (V11 §3.24.5); refused by the schema (V11 §3.24.2); `capMin` 1 | leave out; repair locally; check | T-V11-32, T-V11-35, T-V11-36 |
| history rows (§3.25) | no history; one event; an event whose template and family have no row; a window shorter than one epoch | no replay (§4.11 item 1's soft hints); one effect in its epoch; no effect, `replay.unmapped` (V06 §3.20.3); one epoch (V06 §3.20.2 (3)) | substitute | T-V11-39 |

**The combinations this volume owns** — a table's rows over a feature another unit builds. The rule: the other unit
decides the geometry, these rows decide the numbers it reads, and a row that names the feature is read only where the
feature stands; each pair's outcome:

| feature (unit) × these rows | where they meet | outcome | rungs | test |
|---|---|---|---|---|
| cliff (pipeline) | `walls.barriers` `sheerCliff` and `cliff`; the `terrace` thresholds | a cliff arc closes with no wall or a parapet by its row; the `terrace` rows never level a cell the `cliff` row's test classifies — the cliff is the levelling unit's edge, so no retaining wall stands on a cliff line | every rung (village kinds by V07 §3.4) | T-V11-19, T-V11-40 (b) |
| steep ground (pipeline) | `terrace`, the relief column, `ways.crossing` | levelled between `slopeMin` and 0.67, never above (the base's skirt and stepped wings); crossings by V11 §3.24.5 | every rung | T-V11-32, T-V11-34 |
| moat (pipeline) | the era row's moat width; the `deck` bridge row | the moat's width by the era row (§4.8); a draw bridge or a ford offers no deck plot (item 246), a fixed decked bridge by its row | TOWN–METROPOLIS | T-V11-35 |
| bridge (pipeline) | `deck` bridge, `deck.landmarks` `bridgeMid`, `deckOk`, `ways.crossing`, `bridgehead`, `toll_bridge`'s `implies` | by the rows; a bridge never crosses a retaining wall, its approach ramps read `primary`'s row | every rung | T-V11-35, T-V11-40 (b) |
| raised way (model) | `raisedWays`, the span cells, `ways.crossing`'s `aqueduct` row, `naming.way`'s `raised` guard, `raised:<kind>` materials | generated only at CITY and METROPOLIS; declared at any rung, its spans capped by `span.vaultCap[rung]` | every rung | T-V11-33, T-V11-32 (b) |
| retaining wall (model) | `terrace`, `retaining`, `retaining.settings`, the `retaining` material key, §3.18's structures row | by the rows; a drawn wall holds its material, its decline by the structures row | every rung | T-V11-34 |
| deck plot (model) | `deck`, `deckOk`, `deck.landmarks` | at village rungs V07's cells | VILLAGE–METROPOLIS | T-V11-35 |
| hinterland (pipeline) | the land-use, climate and goods rows; the `garden` row | each face's role and goods by its row; an oasis's gardens by item 111's cells | every rung | T-V11-28, T-V11-38 |
| frame (kernel) | `miningCellShare` (the frame's land cells); V04's frame shares | measured on the frame's land cells, margin excluded; a frame grown by a later stage re-measures at that stage | every rung | T-V11-23 |
| neighbourhood (V01) | district kinds, siting rows, `naming.place` and `naming.way` | V01's unit run is a derivation unit the same stages run, reading the same rows (registry row 18) | TOWN–METROPOLIS | T-V11-40 (c) |
| terraced ward (V01) | the relief column `terracedEdges`; `naming.district`'s `terraced` feature; the stepped fabric band | a district edge is terraced only where the relief row asks; its name's terrain head by `#terrace.word#` at a terraced share ≥ 0.4 | TOWN–METROPOLIS | T-V11-34, T-V11-15 |
| composed building (V02) | the template structures through `composition.roleKeys`; `heights`; `building.wingRole` | every structure name has a role key (T-V2-33, T-V11-7); heights by family | every rung | T-V11-7 |
| floor plan (V03) | the programme key (the class id), the specialisation's `for.use`, the concealed programme | by the keys; a `v.` key without a programme row reads its `composition.classFamily` (V03 §2.4) | every rung | T-V11-7 |
| sewer (V04) | `sewer.existence` (row 57), `naming.sewer`, `@layer:sewer` | the dossier record forces the layer; names by the slice | TOWN–METROPOLIS | T-V11-15, T-V11-2 |
| catacomb (V04) | `under.catacomb`, the crypt column, the church count | by the rows; a church's crypt joins by `cryptJoin` | TOWN–METROPOLIS | T-V11-25, T-V11-26 |
| undercity (V04) | `sourceRank`, `naming.undercity` and `.plaza`, the concealment `underground` mode, `@layer:undercity` | a ruin void ranks first; a concealed class prefers it | TOWN–METROPOLIS | T-V11-23, T-V11-8 |
| void (V04) | the ruin chance, culture and persistence rows; `miningCellShare` | at every rung (item 109 (j) (1)) | every rung | T-V11-23, T-V11-24 |
| access (V04) | `DigRule`, the opening rows, `ruinGain`, `accessMultiplier` | the dig chance never rises with depth; a ruin's gain under the access row's `cap` | every rung | T-V11-23 |
| vault (V04) | the span cells, `era.raisedVaultM`, `culture.raisedVaultM`, `naming.vaults` | at most `span.vaultCap[rung]` vaults; a run under a raised way named "the ⟨way⟩ Arches" | every rung | T-V11-32 (b), T-V11-15 |
| island shade (V05) | `w_sun` × `sunlight`; `ClassMixRow.sun` | the shade strip enters the prosperity field through the driver row only; no row reads the island | CITY–METROPOLIS | T-V11-30 |
| dossier (V08) | `dossier.*`, the threat, culture, ladder, good-word and history rows | the dossier's facts win (item 20); an unread word takes rule (a)'s else | every rung | T-V11-2, T-V11-17, T-V11-29 |

T-V11-40 holds both tables: one fixture per row at its rungs, built by §13.2's edge-suite builder (B-EDGE), each
asserting the outcome named — hard, 0 violations.

## 4 Editing — table edits, declarations, locality, undo and the clerk's view

**4.1 Every table is edited by the base's events.** A cell change, a row insert or a row delete in any registry table
is a `RowOp` inside an `editTable` event (§7.1), a preset change an `editPreset`, a pack an `adjust` of the pack list
(§7.6, §10.4) — so every table of V11 §3.1 is editable, undoable (§7.4's `editTable` row), migrated by §7.5 and replayed
by hash. The tables editor (its screens V09's) reads `REGISTRY` for each table's columns, units, declared ranges, enum
values and refs and validates in the dry run (§7.1): a numeric value outside its declared range is **clamped** to the
nearer bound and the editor says so in one line ("set to 3, the most this column allows"; item 101 R2), as is a
value that would break a compile inequality (the terrace inequalities, T-V11-32 (a); the largest-crypt bar, T-V11-25);
only a dangling `ref`, a type error or an owner rule is **refused**, F-EDIT (§5.2), naming the rule — the one owner rule a
table edit can meet is item 110 (b)'s rung gate (a `raisedWays` row below CITY), refused with the alternative "declare
the raised way". It shows each cell's provenance and whether it is an extension, and the layer that set it (§7.6).

**4.2 The siting rulebook's edits and the declarations.** A class's profile cell (`profile.emits.smell`), a family row
(`siting.families`), a signature pair, a goods row, a ladder step, a wall barrier row, a kind mapping or any item-110 row
is an ordinary cell. Two **document-only tables** (item 380; registry row 76; shipped empty, `documentOnly: true`,
holding only document overrides) carry the map-side declarations the owner's rules require, so they too are row
operations with undo, never written to the dossier (item 20):

* **`siting.declared`** — item 104 (a) (1)'s author declaration, with four KEY FORMS and typed cells per form:
  - the kind keys `uid:<localUid>` (a custom kind), `cat:<catalogId>` (a catalogue kind) and `cls:<class>` (a roster
    class no dossier record binds): `{ profile?: Partial<SitingProfile>; familyWeights?: Record<string, number> /* per
    family one of 0, 0.5, 1, 2 or 3, multiplying the family's soft terms for the kind; hard needs unscaled */; quarter?:
    Id /* a district, or a named quarter record */; place?: Id /* a plot or a district the kind's members prefer */;
    split?: false /* the kind's members each stay one site (item 105 (h)) */ }`;
  - `use:<use address>` (ONE institution): `{ place?: Id /* a plot or a district */; pin?: Id; split?: false /* merge
    this split: the use stays one site */; specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower'|'none' /*
    item 110 (c): held, exempt from the chance and the cap (V11 §3.24.3); 'none' refuses a generated one */ }`.
  A kind-level row shapes every member of the kind; a `use:` row one member, and is orphaned when the use goes, as
  `siting.linkEdits`' keys are. §7.7's assignment remains the route for a dossier institution's place when the port
  writes it; a `use:` row is the user's.
* **`siting.linkEdits`** — item 105 (j)'s link pins and cuts, keyed `<consumer use address>/<good>`, cells `{ bindTo?: Id
  /* a provider use */; avoid?: Id[] /* providers never bound */; cut?: boolean }`, with three meanings: `bindTo` keeps a
  supplier — the link binds that provider whatever the nearest-provider rule says; `avoid` cuts one — the listed
  providers are never bound and the next nearest serves; `cut: true` alone stops the good at that use — no link binds and
  its supply term scores 1 (neutral).

Item 101's toolkit reaches them through its declare and adjust verbs: *declare this custom kind's quarter*, *place this
institution here*, *pin this link*, *cut this link*, *merge this split*, *build this temple in tiers* (or *never in
tiers*). The tool mapping and the screens are V09's, and V09 keeps NO store of its own for these declarations: its gestures
write these two tables, each screen mapped to a declared cell (V09 §2.6); its family ids and sentences are V11 §3.3.1's.
The clerk's tool API writes the same rows and only declared cells (V10 §4.1).

**4.3 Locality.** A table edit re-derives exactly the entities whose recorded slices cite a changed slice (§7.6). The
slices a placement records (S10b's `DerivationRecord.slices`) are: the class row, each derived row's two source rows
(the class and its family or pair row, V11 §2.9), the goods rows its supply terms read, the `siting.web` row, and — for a
use a declaration or link edit touches — a **`match` slice keyed by the binding key** (`uid:…`, `cat:…`, `use:…`, or the
link key), so inserting a `siting.declared` or `siting.linkEdits` row re-derives only the uses that cite that key, never
through §7.6's first-reader fallback. Because a changed siting weight can move a placed use, the
re-derivation of a PLACEMENT is S10b's `relocation` request in the least-disruption order (§4.7 S10b; J-V11.14) with the
fate report: by default every placed use whose present plot still passes its hard rows is **kept** and listed with the
score it would gain by moving; the user confirms moves per use or all (the fates stored in the `editTable` event, §7.1).
Template, heights, material, naming and climate edits re-derive by §7.6 as the base states. A `dossier.kinds` edit
re-binds the records of that kind through the port's next digest (V08), as a dossier-derived change with least
disruption. The item-110 and item-109 tables re-derive by the rows of V11 §2.10 (standing generated structures kept and
listed; removals held).

**4.4 Lifecycle of each edit kind** (§7.4's columns; only what differs from `editTable`'s row; the item-109 and item-110
tables are V11 §2.10's rows):

| edit | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| a registry-table cell or row | `editTable` | the loader's chain | the log | re-derive by slice (4.3) | inverse row op | orphan on a changed base row (§7.6) |
| a family, pair, goods or web row | `editTable` | `resolveSiting` | the log | re-derive the placements citing the source rows, kept by default (4.3) | inverse row op | orphan |
| a `siting.declared` row (`uid:`, `cat:`, `cls:`) | `editTable` on the document-only table | item 104's resolver, S10b | the log | the declared kind's uses re-sited by least disruption through the key's match slice | inverse row op | a binding key that no longer resolves is orphaned and reported |
| a `siting.declared` row (`use:`) | `editTable` | S10b, S11 (`specialisation`), the web's split test (`split`) | the log | that use only: re-placed, re-massed (a changed specialisation) or merged | inverse row op | a use address that no longer exists orphans the row |
| a `siting.linkEdits` row | `editTable` | S10a / S10b's link binding | the log | the consumer's placement re-scored | inverse row op | a use address that no longer exists orphans the row |
| a `raisedWays` row set below CITY | refused (the owner's rung gate) | — | — | — | — | — |
| a setting pack | `adjust` of the pack list | the loader | recipe and `packs` block | Re-derive from the pack's first reader stage (§7.6) | the second `adjust` | the pack's rows orphaned by `baseVersion` |

**4.5 The clerk's view.** The clerk (V10) and the siting panel (V09) read: `why(use)` — the solver's read-only explanation
(`PlacementSolver.explain`, item 311) reports the top rows by id (V11 §2.4) in `WhyPull.row`, each resolved to its
sentence (a family's `says`, a pair's `reason`, a class row's note, a supply edge's good, an item-110 row's `says`: why a
raised way stands, why a wall is here, why a stair and not a ramp, why a class may not stand on a deck, why a temple is
stepped); `explainRow(table, key)` — the row, its provenance, its readers and the entities citing its slice; and
`profile(class)` — the compiled profile with each cell's source (family, class delta, custom-resolution rung). V10
answers the last two by its queries `query row` and `query profile`. Every answer names
rows, never a paraphrase of a rule the tables do not hold; an unwalled side names its `WallBarrierRow`, a record's members
name its `LadderStepRow`, a link names its `sup/…` row and its binding.

## 5 Rendering, labels and exports

Tables are not drawn; the entities they feed are, by §8 and §9. What this volume adds:

1. **Every class is drawable.** Each template family names its symbol role in §8.3's catalogue (`dwelling-*`, `hovel`,
   `cluster` → the house roles; `shopfront`, `workshop-*`, `works-noxious`, `yard`, `kiln-yard`, `warehouse`,
   `stable-yard`, `landing-yard`, `mill`, `farm`, `extractive` → the trade roles; `hall`, `market-hall`,
   `court-institution`, `barracks`, `watch-house`, `bath-house`, `inn-compound`, `tavern-row`, `arena` → the institution
   roles; `church`, `chapel`, `cathedral`, `cloister`, `burial-ground` → the sacred roles; `tower`, `castle`, `fort` → the
   fortified roles), and the compiler refuses a template family without one (T-V11-7). The item-110 structures are drawn
   by their owners (the base's `RetainingWall` and raised parts, V02's tiers and deck buildings, V04's vaults, V09's
   views) with this volume's materials (V11 §3.19.3's structure keys) through §8.2's roles (item 412's three wall
   roles).
2. **Labels.** A use of σ ≥ 5 takes a `landmark` label (§9.1), its name from `naming.landmark` (a fort, a lighthouse and
   a mole now included); a raised way is labelled like any way, its name from `naming.way`'s `raised` guard; a terraced
   district's name may read its terrace word; a ruin's from `naming.ruin` (its label only at `secret` while unexcavated,
   V04); a concealed use is labelled only as its front on public views (item 30).
3. **Exports.** The item-110 entities' GeoJSON properties — the raised ways, their supports and spans, the retaining
   walls, stairs and ramps, deck plots and deck buildings, stepped buildings — are item 447's one text for both
   variants (J-VI.18), cited; this volume adds no second name for any of them. With the option `exportWhy` (item 456;
   default off) GeoJSON and CityJSON (§11.1) write each use's `cls`, `family`,
   `specialisation`, `significance` and its top three "why" row ids of V11 §2.4, the item-110 ids included — a raised
   way's `rw/<kind>` id travels there, never as its `reason`. The document's effective tables export as JSON (`plat tables export`, the same
   canonical form the compiler writes) and as a setting pack of the document's overrides (`plat tables pack`), which is
   how a designer ships a rule set.
4. **Docs pages.** The table docs pages (V11 §3.2.1 step 8) are the tables editor's help and the implementer's reference;
   each item-110 table's page carries its `says` sentences and the switch that turns it off.

The shade map view, the link view, the siting explanations on screen, the terrace and raised-way tools and the deck
badges are V09's; the island's shade strip V05's.

## 6 Performance budgets

On §12.1's reference hardware (desktop; the low-end tier × 2.5):

| operation | budget | how |
|---|---|---|
| `plat tables compile` (every `REGISTRY` entry; the count is read from the registry, never written into a bar) | ≤ 8 s in CI | one pass, no network; cached per unchanged source file |
| `loadTables` (resolve pinned versions + override chain) | ≤ 15 ms, OFF the model budget: it sits in §12.5's first-map row; tables are parsed once per session and shared by view hash | JSON parse of ≤ 1.5 MB, frozen |
| `resolveSiting` (every class `REGISTRY` compiles — the authored, generic and sky classes and V07's `v.` classes — read from the registry, ≤ 48 derived rows each) | ≤ 20 ms at load; memoised by view hash | fixed-order loops (V11 §3.3.4) |
| feature rasters for the derived rows | ≤ 0.4 ms per raster; ≤ 4 ms in total at TOWN, ≤ 10 ms at CITY, ≤ 26 ms at METROPOLIS (§12.4's × ≈ 2.6), inside §12.4's S10a/S10b rows as item 477 restates them; at most 32 rasters per S10b pass | V11 §3.3.3: the 32 m field cell where every reading row's radius is ≥ 60 m, 16 m otherwise; one multi-level raster per nuisance in one pass; only rasters some allocated class reads. *Pre-decided fallback:* the nuisance rasters keep levels 2–3 only, then the cap falls to 24 |
| the derived rows' scoring | ≤ 1.1 × S10b's time without them, at CITY and at METROPOLIS (T-V11-20) | soft rows scored like any other |
| item 104 resolution per custom record | ≤ 0.2 ms | table lookups; keywords by one hash-set pass over ≤ 200 tokens |
| item 109's and item 110's tables (V11 §3.23, §3.24) | ≤ 20 KB of the shipped payload together; every lookup O(1) (keyed rows); no budget of their own beyond their reading stages' (§12.4) | plain rows; the water balance is a handful of multiplications per candidate |
| shipped tables size | ≤ 1.5 MB JSON, ≤ 300 KB gzipped for the CURRENT version; each retained output version (N−1, N−2) stores its tables as row deltas against the current version, rows content-addressed by H128, ≤ 150 KB gzipped each — §6.4's bar | canonical JSON; deltas by row hash |
| memory of the `TableView` | ≤ 12 MB at METROPOLIS including derived rows | frozen objects, shared across documents with the same view hash |

These sit inside §12's per-stage rows (S2, S10a, S10b): the raster total at CITY (≤ 10 ms) replaces the ≈ 7 ms §12.4 gives
all of S10's distance rasters only by item 477's restatement, which keeps the critical path at CITY inside §12.3's p95 of
300 ms (≈ 262 ms p50 + 3 ms). T-V11-20 measures it at CITY and METROPOLIS.

## 7 Tests and acceptance bars

**7.1 Content invariants** (compile-time; each a failing build; T-V11-0 runs first at C1's exit and in every change that
writes a row):

| id | test | bar |
|---|---|---|
| T-V11-0 | the shipped sources compile: every invariant below holds on the rows as written in this volume and its successors, and T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 hold on V07 §2.4's `v.` rows as on every class (V07's T-V7-56); the preset checks of V11 §3.2.1 step 4 hold under each registered preset whose file ships — `NG`'s among them from V01's M5: no `presets.NG` entry off `hood.constants`, and the named off forms at their off values under `NG` | 0 failures |
| T-V11-1 | registry closure and readers: (a) every table any design document names has a registry entry (a scripted grep of the design and the volumes for table ids, `.json` names and the `tables/…` and `dossier/…` path forms — V04's `tables/dossier/sanitation` and `tables/dossier/subterranean` among them, — the item-110 cells `terrace.slopeMin`, `terrace.stepMinCm`, `viaduct.minDropM` and the deck row included, and the application's and the clerk's tables `toolkit.json`, `messages/<locale>.json`, `clerk.ops` and `clerk.content`, and V01's `way.surface` and `squares.quota`, the `history` table and the base settings row (rows 92, 93), and the prose names `raised.vaultShare`, `raised.vault.maxHeightCm`, `raised.vaultCap`, `raised.deckDepthCm`, `raised.supportFoundationCm` and `retaining.stateSnapCm`, each resolving to a live calibratable cell of row 80's `structure.span` or row 79's `settings` (V11 §3.24.1, §3.24.2)) and every entry has its file; the catalogue count is read from `REGISTRY`; (b) readers complete: in the integration suite that loads every shipped package (the golden tooling's, §13.3), the loader hands each stage and each epoch phase a `TableView` tagged with its StageId that records every table it reads, and over the golden fixtures at every rung of both products, with three `'history'` epochs, every recorded (stage, table) pair has the stage among that table's compiled `stageReaders` (the `S5` group expanded, V11 §3.1's *Readers*) — every row a stage reads lists that stage's id; a listed stage no run records is reported, never failed; and the source manifest's `stageIds` equals the stage registry's ids with every shipped package loaded | 0 missing; 0 unlisted stage readers |
| T-V11-2 | totality: `dossier.kinds` covers the line's 280 catalogue kinds; `dossier.archetypes` the 17; every profile family named by V08's `tags` and `categories` rows exists; every band-keyed table has a row or interpolates for every band of `prosperity.bands`; every QUARTER kind names an identity row and every `definedBy` is a class id; every pair of `dossier.catalogue`'s `ladderPairs` is a `dossier.ladders` row or on the uncatalogued list; the burial kinds (`burial_ground`, `graveyard`, `parish_burial_grounds`, `burial_grounds_and_charnel_house`) form one ladder chain | 100 % |
| T-V11-3 | identity: no key reused from the retired list; every `ref` column and every reference cell `{ ref: { table, row, cell } }` resolves to a live cell of the same unit (V11 §3.2.1 step 4); every `CoverageSpec` `per` and `target` inside its range, a `walk` unit's `per` at least 10 (V11 §2.3); every class id referenced by any table (kinds, covers, pairs, identities, villageForm, government, specialisations, deckOk rows, landmark claimants) exists; every derived row's `to` lies in V11 §3.3.3's feature-class vocabulary; every V07 row is keyed `v.<id>` and every `villageForm`, `villageSeat` and archetype `village.class` / `elseClass` names a `v.` key and nothing else (V11 §2.9); every `split.works` and `split.shop` is a template-family key of V11 §3.6.1; a named row of the settings form (V11 §2.1) holds exactly the columns whose `row` names it, and a keyed row none of them | 0 dangling |
| T-V11-4 | coherence of a class row: every class row names its ONE family; the compiled `competition.mode` is `neutral` for a `singular` class and `cluster` for a `district-defining` one; a `district-defining` class has an identity row that names it; a hard family-derived row only for a `NeedSpec` marked hard; weights in `powers` and `sectors` sum to 1 ± 0.001; the display cells: every class row — the `v.` rows and the generic rows included — has a non-empty `label`, unique within its namespace (V11 §2.3), no synonym equal to a label of its namespace or to its own, a `commonness` in [0, 1] — on a town-and-city or `v.` row compiled, never stated in its source, and equal to its rule recomputed (V11 §3.5.1; a `v.` row's by V07 §2.4's rule), 0 on a generic row — and an `icon`, where compiled, that is a V09 §5.1 sprite id; every profile family, good, district kind and shipped style sheet row has a non-empty `label`, the non-alias families' labels unique, each with its `fam.<key>` icon (V09 §5.1's sprite) | 0 violations |
| T-V11-5 | no compiled profile both emits a nuisance at level 2 or more and is sensitive to it at level 2 or more | 0 |
| T-V11-6 | derived rows per class ≤ 48; shadowed derived rows listed | bound holds |
| T-V11-7 | every template family names a symbol role and a heights row; every structure role is in the role table; every class's template compiles for every band | 100 % |
| T-V11-8 | every cover row's front class has a template row at the band; every concealed class has ≥ 2 fronts per band | 100 % |
| T-V11-9 | provenance grammar (§17.1 (6) as item 534 extends it): every cell's source parses; every `ref:` names a behaviour (and its P-id for `(code)`); every `general` names its practice; `sf:` names a file and a baseline; no `corpus` source except item 69's palette targets and `historical:<frame>` preset rows with evidence; the parity presets resolve every `option` cell — `VG` every one of a village-read table and no other (V11 §3.2.1 step 4), the source manifest's `productStages.village` equal to the stage ids `ProductDecl('village')` registers, conditional registrations included (checked in `@plat/village`'s suite, where both load); under `VG` a categorical cell of any other table resolves to its `MFCG` entry; `NG` resolves every `option` cell through its `MFCG` resolution, its own entries on `hood.constants` alone | 100 % |
| T-V11-10 | determinism: two compiles of the same sources on two hosts give byte-identical dist trees and manifests; `resolveSiting`'s output hash stable across hosts | identical |
| T-V11-11 | clean room: the hashed scan (§17.1 (5)) over the dist tree and the corpora — no list hit, no reference identifier, no study-reference proper noun (V11 §3.20.6) | 0 unreviewed hits |
| T-V11-23 | item 109's rows: every `under.*` cell in its declared range; the dig depth factor non-increasing with depth; the ancient-culture weights sum to 1 at every relief; the persistence shares non-increasing in V11 §3.23.5's order; every class resolves a dig `classRow` | 100 % |
| T-V11-25 | crypts: `cathedral` and `great_temple` are `always`; every `always` class has `cryptM2` and its minimum exceeds every `basement` class's maximum; every `basement` class's template family has a cellar row above 0 at some band; no class outside the worship and monastic families and their generic classes is `always` or `basement` | 100 % |
| T-V11-26 | catacombs: the caps do not decrease with the rung; every chance in [0, 1]; `quarryOssuary` 0 at TOWN; every `order` entry a burial-face class or `quarryOssuary`, METROPOLIS's starting with `network`; no source names a church-family class or a crypt | 100 % |
| T-V11-28 | goods totality: every good has a producer (a class, a site land use or deposit, or kind `import`) and a consumer (a class edge or a `demand` other than `classes`) | 0 orphans |
| T-V11-32 | item 110's rows: (a) `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm`, `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` and `flatDepthM ≥ minTerraceDepthM`; (b) `raisedWays` holds exactly the six CITY and METROPOLIS rows and its key admits no other rung, and `span.vaultCap` holds a value for every rung, non-decreasing with the rung; (c) no `deckOk` kind on an `always`-crypt class or a `fire` ≥ 2 class; (d) every specialisation row's `composition` is a key of V02's `composition.json`, its class a `roster.classes` row, its `heights` a `heights` row; (e) no specialisation row for a shipped culture other than `mesoamerican`, `south_asian` and `east_asian`; (f) `ways.crossing` covers every `WayClass`; (g) `deck` holds the sixteen kind × band rows; (h) on the terrace fixtures a cart crossing whose step needs more than 1.5 × `rampMaxGrade` lowers the wall's step there (`W_STEP_LOWERED`, V11 §3.24.5) — never a stair, never a gap | 100 % |
| T-V11-37 | the village readings and the wall kinds: every `GovernmentRow` has a `villageSeat`; every `dossier.archetypes` row a `village` cell with exactly one of `class`, `pin`, `ruin`; `guildhall`, `castle` and `palace` carry no `villageForm`; `citizen_militia` and `gates_if_walled` map to `@none`; every `walls.barriers` row carries an `arcKind` column, null only on `open`, `sheer` only under the `islandRim` rule; no `dossier.*` column, no column of registry rows 68–70 and 86–89 and no naming column of row 71 is calibratable; no switch cell — `siting.web.orientEnabled`, `siting.web.splitEnabled`, `terrace.enabled`, `history.settings.replay` — is calibratable | 100 % |
| T-V11-38 | item 111's rows: (a) every climate row's dry-country cells inside their ranges (V11 §3.17.1), `w_water` below 1, the `grove` shares summing to 1, a non-arid row's oasis cells at their neutral values; (b) the `garden` land-use row present with its role key and among `herbs`' providers, and the water table's `wellYield` and `geologyYield` values in [0, 1] with `topYield` in their span (V11 §3.24.6); (c) item 111's off form (V11 §3.24.0) in range and equal to the parity presets' resolution, and with it applied the generated documents byte-identical to the base without item 111 — the `NoOpPin` T111-5, 200 B-CITY seeds per rung | 100 %; identical |
| T-V11-39 | item 113's rows: (a) every family of V08's history reading has its `*` row, template words are unique, every effect valid — a `hazard` a V06 `HazardRow` kind, a `condition` a `ConditionOverlay` archetype, a `request` class a `roster.classes` row — and every value in its range (V11 §3.25.3); (b) the settings in range, `burialBoundsYears` low ≤ `burialYears` ≤ high, `defaultAgeYears` set at all six rungs; (c) with `replay` false, byte-identical to the base without item 113 — the `NoOpPin` T113-7, on the H-HISTORY fixtures and 200 B-CITY seeds | 100 %; identical |

**7.2 Behaviour bars** (the §13.2 statistics bench, over ≥ 200 B-CITY seeds per rung with a random-placement baseline
that keeps each class's count and district allocation; every bar a correlation, never a guarantee — items 103 (e),
104 (g), 105 (k), 106 (h), 107 (g), 108 (f), 109 (i), 110 (f); the mechanisms' own bars are the base's and the owning
volumes', these are the rows' bars; V12 §3.6b runs the share, sweep and paired forms):

| id | measure | bar |
|---|---|---|
| T-V11-12 | family effects: for each nuisance with ≥ 1 emitter at level 3 in a town, the median distance from sensitive-≥ 2 members to the nearest emitter exceeds the baseline's; tanneries downstream of the median dwelling in ≥ 80 % of river towns; `thieves_den` to the nearest law member above baseline; shops' distance to the nearest market below baseline | each shift significant at p < 0.01 (Holm-corrected) |
| T-V11-13 | coverage: for every class with a coverage row whose unit is not `settlement` (V12 §2.7 refuses a `settlement`-unit class, `notApplicable`: its coverage is the roster clause), the share of units served, by V12 §3.6's `servedShare` on the class's compiled unit (a church class's parish read in its households form, J-V12.59), exceeds the baseline's by ≥ 0.1; with `coverage.rosterWeight` 0 the roster, and with the coverage family's weight 0 the placement, byte-identical — the village `v.` rows lie outside the roster clause, since the option adds no member at the `territory` rungs (V11 §3.5.1) | holds; no-op pins |
| T-V11-14 | supply web: multi-output producers nearer their dominant output's consumers, shared-provider consumers nearer it, source-oriented classes nearer inputs and market-oriented nearer demand than baseline; consumer-to-provider distance within `comfortM` in ≥ 70 % of links | significant; ≥ 70 % |
| T-V11-15 | naming: across 100 seeds per rung, ≥ 98 % of district and way names unique within their scope before suffixing; every name ≤ 5 words; the profanity filter's hit rate ≤ 0.1 % of draws, each re-drawn; folk forms ≤ 3 syllables; no raised way named with a street word | holds |
| T-V11-16 | custom content: fixtures carrying only a category; a category and tags; an archetype; the optional definition fields; an active chain; a keyword with a class or a specialisation cell — each resolves, sites and reports its rows; chain nodes closer than baseline; flow order (resource farther from the market than the final seller) in ≥ 75 % of placements; zero placement failures | holds |
| T-V11-17 | ladders: on the 155 surveyed dossiers every COUNT, QUARTER and GUILD record shows members inside its range, monotone over a population sweep; no pair double-counted; each SIZE record one building; a COUNT of pins (`multiple_water_sources`) never lowers the wells below their own coverage count and never clamps them to a top; a village-to-town promotion keeps the churchyard's burial face and its opening year | 100 % |
| T-V11-18 | dispersal (J-A72.46) with the web's weights on: the share of districts holding a dispersed class within ± 0.05 of the reference arm under V11 §3.7.4's web off form, by `servedShare` with `unit: 'district'` (districts of ≥ 30 households; V12's 105 (k) `noRegression` row) | holds |
| T-V11-19 | walls: the barrier fixtures of item 106 (h) with these rows — river-loop neck only; cliff-backed coast zero wall edges on sheer arcs; 100 % of quays reachable; a sea-threat dossier's quay wall with sea gates; an island's rim closed with no wall; every exported `closure` feature comes from a row that closes with wall `none` and carries that row's `arcKind`; a village palisade by a fordable brook closes that water arc with no wall | holds |
| T-V11-20 | cost: S10b's time with the derived rows ≤ 1.1 × without, at CITY and at METROPOLIS (§12.4's rows as item 477 restates them) | holds |
| T-V11-21 | parity: with the `MFCG`, `FTG` and `VG` presets (each from the milestone its file ships, V11 §8; `VG` on the village-read tables, V11 §3.2.1 step 4) every family, pair, coverage, web and wall-profile extension is 0 or off, or at its off form's value (V11 §3.7.4: `bulkyWater`, `perishableShort` 1), every item-109 chance 0, the five item-110 switches off, item 111's cells at their off form and `history.replay` false (V11 §3.24.0); with `presets.FM` every `roster.specialisations` chance, every `deck.offer` and every `deck.landmarks` chance 0; V11 §3.7.4's web off form is exactly the set they resolve for its cells, and with it applied the placement is byte-identical to the base's without item 105 (item 105 (k)'s no-op pin); B-REF's parity rows (§13.5) hold unchanged | holds |
| T-V11-22 | emulation: the classes' authored `ref:` rows reproduce their references' behaviour in the parity presets (noxious trades downstream and extramural, mills on water, inns at gates, warehouses at the harbour) at §13.5's rates | within §13.5's tolerances |
| T-V11-24 | ancient-culture distinctness (M6-U, V04's U3): V12's `paired` measures at each culture row's centre values against B-CITY's fabric, 100 seeds per row | every row differs on ≥ 2 of the 3 measures in ≥ 90 % of seeds (V11 §3.23.4's fallback on a miss) |
| T-V11-27 | relative siting kinds (unit, synthetic rivers and a fixed wind): `upstream` / `downstream` / `downwind` / `upwind` with a `to` score 1 on the right side, fall with the course or bearing, and score 0.5 where no member lies on the plot's network | exact on the fixtures |
| T-V11-29 | good words: on the 155 frozen dossiers at least 95 % of label occurrences (`outputs` and the dossier's goods lists) match a good; every unmatched label listed in the manifest | ≥ 95 % |
| T-V11-30 | item 102's guard: `w_sun` 0.02 against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands | 0 plots (the fallback of V11 §3.3.5 on a miss) |
| T-V11-31 | item 110's no-op pin: 200 B-CITY seeds per rung, TOWN to METROPOLIS, with the five switches off, byte-identical to the goldens without item 110; with `raisedWays` alone on at TOWN, still identical (no row below CITY) | identical |
| T-V11-33 | raised ways, over 200 seeds per rung: none generated at TOWN; counts within the caps at CITY and METROPOLIS; every one carrying a reason; aqueduct candidates more frequent on arid and soluble sites than on temperate alluvial ones | 0 at TOWN; 100 % within caps and reasoned; p < 0.01 (Holm) |
| T-V11-34 | terraces: every generated retaining wall stands on a levelled unit above both thresholds; none on a plain-relief site whose slope stays below `slopeMin` (V12 §3.4.2's model metric `retaining.onFlatM`, 0 by rule, reported nightly) | 100 %; exactly 0 |
| T-V11-35 | decks: each kind's offer rate within ± 0.05 of its row; no class outside `deckOk` on a deck; every deck building's footprint within its row's band; a bridge chapel carrying a dossier crypt record never stands on the deck (the per-use rule, V11 §3.24.4) | holds |
| T-V11-36 | specialisations: a `mesoamerican` culture fixture yields a stepped temple; a Western fixture yields none; stepped buildings never exceed the cap; a declared specialisation is held through a regeneration | holds |
| T-V11-40 | edges and combinations (V11 §3.26): one fixture per row of its two tables at the row's rungs, built by §13.2's edge-suite builder (B-EDGE) — (a) each mechanism row's outcome and failure rung; (b) each combination row's outcome; (c) V01's unit run reading the same rows as the stages it runs | 0 violations |

**7.3 Parity metrics.** This volume owns no new reference metric: the parity of class counts per 1 000 people against
FTG's documented roster shape and MFCG's ward mix is §13.5's (the use-mix entropy and the per-band built-land share); the
rows here are calibrated to them at M2b (V11 §8), and the corpus stage re-signs them (§13.9). **One descriptive row**
(no pass bar): buildings per 1 000 residents by profile family on B-CITY against the FTG capture's counts per
family (numbers only, from `baselines.json`, V12 §2.3), reported at M2b so a family far off the reference's rate is
visible before the corpus stage.

## 8 Build plan

| milestone | content | exit (executed) | estimate | where in §16 |
|---|---|---|---|---|
| C0 — registry, compiler, loader | V11 §2.1–§2.2, §3.2; the provenance grammar; the source manifest's `stageIds` with §4.1's stages, the reader check and the recorded-read suite; every registry row (V11 §3.1; the count read from `REGISTRY`), the base settings row (row 93) with its values; T-V11-1, 3, 9, 10 | a compile of the M1 tables byte-identical on two hosts; T-V11-1 (a) and (b) green over the base's stages; `plat calibrate register --check` joins CI at M1 (V12's T-V12-20) | 1.25–1.75 pw | M0 (b) beside `@plat/tables`' loaders |
| C1 — the M1 rows | the M1 classes (housing, food, crafts, trade, lodging, civic, worship, the outside classes) with their template families and heights; district kinds; greenery and climate rows; the era and material rows | B-CITY's M1 gate on these rows; the register green over them (below) | 2.0–2.5 pw | M1 (inside the content line) |
| C1b — item 111's rows | the climate rows' dry-country cells (V11 §3.17.1), the `garden` land-use row, the water table's well yields (V11 §3.24.6); item 111's off form in V11 §3.24.0 | T-V11-38 (a), (b) at M1, (c) and the base's T111 bars at M2b with the prosperity water term; the register green (below) | 0.25–0.5 pw | M1 (the oasis and the water pull) and M2b (the prosperity term) |
| C2 — the siting rulebook | profile families, class profiles, relation families and `resolveSiting`, signature pairs, goods and web settings, coverage, balance, orientation, split; the concealment and cover rows; sectors and powers; identities | T-V11-4…8, 12…14, 18, 20–22 on the bench; the register green (below) | 2.0–3.0 pw | M2b (inside the content line; items 532, 568) |
| C3 — the full ladder and the tables editor's data | the remaining classes (arcane, exotic, adventuring, clandestine, military extras), the compatibility table, the document-only tables with their three key forms, exports and docs pages | T-V11-2 on the ladder, T-V11-11; the register green (below) | 1.0–1.5 pw | M3a (the tables editor) |
| C3b — item 110's rows | V11 §3.24's eight tables and the switches; the `fort` and `lighthouse` classes; the `fort` and `arena` template families; the `stepped-shrine` heights row; the structure material keys and the structures decline block; the era and culture factors; the naming additions of V11 §3.20 for raised ways, slots and terraces | T-V11-31 – T-V11-36 and T-V11-32 on the bench and the two known-city fixtures; the register green (below) | 0.75–1.25 pw | M3a, beside C3 (item 110 (e)'s second fixture and V02's tier and deck construction ship there, item 229) |
| C4 — the SettlementForge rows | `dossier.kinds` (280), archetypes, category synonyms, keywords, good words, ladders; the wall barrier and waterfront rows | T-V11-2, 16, 17, 19, 37 on the 155 frozen dossier fixtures; the register green over the wall rows (the dossier row sets are not calibratable) | 1.5–2.0 pw | the SettlementForge stage (V08's milestones); wall rows at M2b with item 106's base |
| C5 — naming | the grammars of V11 §3.20 and the corpora of V11 §3.20.5 authored and scanned | T-V11-15; the register green (below) | 1.5–2.0 pw (O13-core at M2b, full at M3b) | M2b and M3b |
| C6 — provenance audit and calibration hand-off | the audit of the register entries every earlier exit wrote (V12 §3.11); every default cell's `ref:` and `extension` audited; the corpus stage's re-sign list is those entries | M4's table-provenance audit | 0.5 pw | M4 |
| C7 — the module's content | professions, items, services, prices | M4b's exit; the register green (below) | 1.0–1.5 pw | M4b |
| C8 — item 109's rows | V11 §3.23: the cavern cell, the ruin chances, the four ancient-culture rows with their monument cells, the persistence order, the void rank, the dig and opening rows, the catacomb rows; the crypt rows of V11 §3.5.8 checked against V03's ring | T-V11-23 – T-V11-26 (compile), T-V11-24 (bench); the register green (below) | 0.75–1.0 pw | the underground layer's milestone (M6-U, J-VI.22), reviewed with V04's U3 |
| C9 — item 113's rows | V11 §3.25: the settings row and the event-to-epoch rows; item 113's off form in V11 §3.24.0 | T-V11-39 on the H-HISTORY fixtures with V06's replay (T-V6-70); the register green (below) | 0.25 pw | M6-E, with V06's E9 (the history replay at generation) |
| **total** | | | **12.75–17.75 pw** | ≈ 8–10.5 inside §16's content line (10.5–14.5, which also prices presets, symbols and textures); **+4.5–7.0 pw** for the owner items' rows (items 103–113: their share of C2 and C4, and C1b, C3b, C8 and C9; items 532, 568) |

**The register at every exit** (J-V11.69). Each content milestone's exit — C1, C2, C3, C3b, C4, C5, C7, C8 —
includes `plat calibrate register --check` green over the tables it lands: one `target.column` entry per calibratable
column (V12 §3.11), written by the seat landing the milestone, never deferred to M4; C6 at M4 audits those entries and
hands them to the corpus stage. So V12's provisional-number lint, which runs from M1 (T-V12-20), never meets a V11 cell
without its entry.

**The other tables' entries** (J-V11.76). V12 §3.11's lines cover the owner items' rows (items 102–113). The tables C1,
C3 and C7 land outside them take their `target.column` entries by the lines below, in V12 §3.11's
form, `owner` V11 unless a line says otherwise. The two metric families are V12's (V12 §2.1; J-V12.65): `bar.<id>` (the
verdict statistic of one registered bar) and `frame.<table>.<column>` (a corpus frame's value for that column,
`notApplicable` until M-CAL). **The bars V11's entries name are registered by V11's seats** (J-V11.78; V12 X-V12-15), each as a V12 `BenchBarDef` (V12 §2.1) in the change that writes the entry naming it. The
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
reason "no admissible frame", as V12 §3.11's owner-item lines do. A column this volume marks non-calibratable takes no entry.

| column family (registry row) | exit | method, due | metric | fallback — the pre-decided move |
|---|---|---|---|---|
| the town and city classes' roster columns `perCapita`, `min`, `firstAtPopulation`, `perOther`, `shopProb` (row 17); `roster.settings`' `unemploymentThreshold` (row 24); `roster.households` (row 23) | C1 (the M1 classes), C3 (the rest) | `measure` at M2b — §13.5's block-level use-mix row and V11 §7.3's descriptive row (buildings per 1 000 residents by family against the FTG capture) — then `corpus` at M-CAL | `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn`, `pop.perBuilding`; `frame.roster.classes.perCapita` | a use-mix value outside its band: every non-housing family's `perCapita` denominator scales once by the one factor that brings `usemix.resOnly` to its band's centre, clamped to the column's range, and the bench re-runs; a second miss makes the entries `not-achieved`, reported to the owner as a table defect (V12 §5.5) |
| `roster.settings`' `detourFactor` (row 24; the base's provisional cell, §4.7 S10b), owner `base` | C1 | `measure` at M1 by the base's T16-4 (block-raster distance against the way-graph Dijkstra on B-CITY) | `bar.T16-4` | the base's: the factor refitted per rung |
| the template families' footprint and plot budgets by band (V11 §3.6.1, compiled into row 17's `template`) and the role table's `footprintShare` (V11 §3.6.5) | C1 (the M1 families), C3 (the rest) | `measure` at M1's gate — §13.5's footprint rows; the dwelling and shop areas are the targets the granularity table's plot areas are fitted to (V11 §3.6.1) — then `corpus` at M-CAL | `bldg.area`, `plot.area`, `bldg.quadSide`; `frame.*` | a residential family's median footprint outside its band: that family's footprint budgets move once by the ratio of the reference's median to ours, clamped to their ranges, and the gate re-runs; a second miss `not-achieved` |
| `roster.classes`' `undergroundAccess.prob` by band (item 64; row 17) | C1 | `panel` (V4-U5, `realism`) at U5, the underground layer's sitting | `void.*` (accessible, read beside the panel as V12 §3.11's other V4-U5 lines read it) | the panel rule (V12 §3.11); second value: every band row × 0.5 |
| `roster.districtKinds`' relation and `affinity` weights (row 18) | C1 | `measure` at M2b against MFCG's anchors (§13.5), then `corpus` at M-CAL | `district.area`, `quarter.count`, `usemix.entropy`; `frame.*` | V12 §3.6b's default (the driving weight doubles once, clamped); a second miss `not-achieved` |
| `roster.quarterIdentities`' thresholds (row 28) | C2 | `measure` at M2b against MFCG's quarter count (§13.5), then `corpus` at M-CAL | `quarter.count`; `frame.*` | the failing threshold moves once by a quarter of its value toward the band, clamped; a second miss `not-achieved` |
| `heights` (row 5) but its `stepped-shrine` row (V12 §3.11's item-110 line) | C1 | `corpus` at M-CAL (a frame's storey counts by band and district kind) | `frame.heights.<column>` | no admissible frame: closes `fixed` at M-CAL with its reason |
| the rest: `mutator.compat`'s `tolerance` (row 40); `landuse` (row 44); `climate`'s columns but `rainMmPerYear` (row 43); `era` (row 50) and `materials` (row 49) outside item 110's factors and structure keys; the per-material `decline` rows (row 46, V11 §3.18's first table); `roster.covers` (row 26) and the `concealment` column; `roster.sectors`, `roster.powerLinks`, `roster.sectorLinks` (rows 29, 31); `roster.institutions`, `roster.government`, `roster.religions` (rows 20–22); `roster.settings`' `placement.extensionWeight`; every other calibratable class column (`priority`, the family defaults of V11 §3.5.1); `sim.*` (row 72) | C1; C3; C7 at M4b | `corpus` at M-CAL | `frame.<table>.<column>` | no admissible frame: closes `fixed` at M-CAL with its reason |

**The preset entries** (J-V11.74). The source type admits all five `PresetId` keys from C0, so no later schema change is
needed. V11's `presets.MFCG` and `.FTG` entries land with their cells — `siting.web`'s four (V11 §3.7.4) at C2,
`terrace.enabled`'s at C3b. Its `presets.VG` entries on the same five cells land with V07's **V-M0** — the milestone whose
content ships the `VG` preset file (V07 §8: V-M0's exit already runs under `VG`, and V-M1 ships the request mapping; J-V11.79) — in the change that
ships that file (item 377), written by the seat
landing V-M0 from V11 §2.2's rule. The same change commits the source manifest's `productStages.village` (V11 §3.2.1
step 1) and writes the `presets.VG` entry of every `presetsRequired` cell of a village-read table from V07 §3.15's list,
each with the `VG` value V07 states there; no cell of any other table carries a `VG` entry, and the
compile's `villagePresetCells` equals V07's list (T-V11-9). Afterwards the seat landing any change that makes a table
village-read — V07's V-M2u, which registers V04's tail at the village subset (V07 §3.16 (1)), extending
`productStages.village` — or adds a `presetsRequired` column to a village-read table (V02's M6a on `composition.json`, a V04
rule table) writes the new cells' `presets.VG` entries by the same rule and in the same change, V07 §3.15 (3)'s list
growing with them (V07 §3.15 (3), J-V7.123; J-V11.87). Its `presets.FM`
entries (0 on V11 §3.24.0's chance and offer cells) land with V02's **M6c**, in the change that ships the `FM` preset file
(item 376), written by the seat landing M6c. Before then neither preset exists and no entry for it is written.
Each of those exits runs the compile's preset check (V11 §3.2.1 step 4; T-V11-0) and the register check, which passes each
entry by its `fixed:` note (V11 §2.2) with no register entry. V11 writes **no `presets.NG` entry**: none of its cells lies
in `NG`'s scope, and each resolves under `NG` as under `MFCG` (its `MFCG` entry where it has one). The `NG` entries are
V01's, on `hood.constants`, written by the seat landing V01's **M5** (V01 §3.15) in the change that ships the `NG`
preset file (item 584); from that change every compile runs step 4's checks under `NG` too (T-V11-0;
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
module read a table it did not read before — a base item's application included (items 233, 230, 241, 578 and 294 among them) — writes that reader into the table's registry row in the same change, its seat owning
both edits (J-V11.90). Rows 90–91 (`way.surface`, `squares.quota`)
ship their rows with V01's M2b pieces (V01 §8.1: the way-surface rule, item 207, and S7b (3)'s quota, item 301), written by the
seat landing M2b, which also writes `squares.quota`'s register entries (`way.surface` has no calibratable column); S2's
and S9b's reads of `squares.quota` arrive at M5 and are already listed. The registry holds rows 86–89 from C0, as it holds every
row (V11 §2.1's empty-table rule); each ships as its schema's empty table until its owner's milestone ships
its rows — `toolkit.json` and `messages/en.json` with
V09's shell (item 516, BASE M1–M3b), `clerk/ops.json` and `clerk/content.json` with V10's first
milestone that ships `@plat/clerk` (V10 §8) — the seat landing that milestone writing the rows and the owner's layer rules.

**The display cells and the span cells**. Each class row's `label` and
`synonyms` land with the row — C1 the M1 classes, C3 the rest, C3b `fort` and `lighthouse`, V05's sky rows with M6-sky,
V07's `v.` rows with V-M2 — and the district kinds', goods' and profile families' labels with their tables (C1, C2, C2);
the compiler's `commonness` and `icon` from C1; the 45 family icons with V09 §5.1's glyphs; the shipped style
sheets' labels with each sheet (§16's M1, M2b, M3b, M5). Rows 79–80's `span`, `slideMaxFactor` and `stateSnapCm` cells
are written at C3b by the seat landing item 244's base side at M3a, with their register entries (V12's span-rule, `raisedWays.structure`
and `retaining` lines). The words are ≈ 0.1 pw inside C1's and C3's ranges; no estimate or milestone moves.

**Dependencies:** C0 before any stage reads a table; C1 before M1's gate; C2 needs the base's solver with the owner items'
terms and the §13.2 bench; C4 needs V08's adapter and the frozen fixtures; C5 needs the
naming engine (§10.4) at M2b. **Risks and spikes:** (R1) the family weights' balance — a spike at the start of C2 runs
the bench with the families alone, then with the authored rows, and tunes `siting.families` weights so no family
dominates S10b's score (bar: no family's mean share of the winning score above 0.4); *fallback:* halve every family
weight and re-measure — pre-decided; (R2) clean-room list hits on ordinary trade vocabulary — allow rows with written
reasons (§17.1 (5)); (R3) the SettlementForge line adding kinds — the totality bar catches it and the fallback keeps the
map whole; (R4) authoring effort — CONFIDENCE §3.4's warning; C1 is scoped to the M1 classes so M1 never waits on the
full ladder; (R5) aqueducts too rare or too common — the spike is V11 §3.24.6's bench at the start of C3b, with its
pre-decided `perHeadL` fallback; (R6) an ancient-culture row that fails distinctness — T-V11-24 at C8 with V11 §3.23.4's
pre-decided refit; (R7) the ladder lessers of the twelve remaining file pairs — written at C4 from the committed `ladderPairs`
(J-V11.105), the ladder cross-check (T-V11-2) failing any build that lacks one. C1b depends on the base's oasis and
water pull (§4.2 S0–S3); C9 on V06's replay engine (V06 §3.20). C3b depends on the base's
item-110 records (items 244–246) and V02's M3a tier and deck construction; C8 on V04's U-SYS and U-ACCESS.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V11.1 | chose one typed registry (`REGISTRY`) of every table, with columns, units, ranges, readers and totality rules, over tables described only in prose, because the loader, the editor, the audit and the docs must read one list and a table outside it must be impossible |
| J-V11.2 | chose JSON5 authoring sources with `$extends` inheritance compiled to §7.6's flat canonical JSON, over hand-writing the compiled form or using YAML, because per-cell provenance across every compiled class by hand is error-prone and YAML's implicit typing is not deterministic enough |
| J-V11.3 | chose that dates in compiled provenance come from the source manifest, never the clock, so a rebuild is byte-identical |
| J-V11.4 | chose to derive the relation families' rows at load from profiles (`resolveSiting`) with distance rasters per emission level, over storing pairwise rows, because item 103 (a) forbids a pairwise table and rasters make it O(classes), not O(pairs) |
| J-V11.5 | chose to mark every family, pair, coverage and web row `extension` and keep the references' rules as the classes' authored `ref:` rows, so the parity presets reproduce the references exactly (item 23) |
| J-V11.6 | chose nine nuisances on a 0–3 scale with a reciprocal share, over a continuous scale, because authors can reason about four levels and the clerk can say them |
| J-V11.7 | chose 45 profile families (V08's tag keys plus the category families, `other` and `food-works`, J-V11.38) with classes stating only deltas, over a full profile per class, so one family edit moves every class it governs and the SettlementForge tags land on the same rows |
| J-V11.8 | chose 181 authored town and city classes (V11 §3.5.14's count; more than §16's 60–100 estimate) because the 280 catalogue kinds need distinct buildings for distinct siting; the extra authoring is priced in items 532 and 568 |
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
| J-V11.23 | chose the wall barrier thresholds (sheer ≥ 100 % over 12 m; cliff ≥ 60 % over 6 m; steep ≥ 30 % over 8 m) as our own, provisional, over leaving them to the solver |
| J-V11.24 | chose to compile institution rows from the class ladder (V11 §3.21.3) so the two lists cannot drift |
| J-V11.25 | chose to keep `distribution` authoritative for S7b's dispersal and derive the competition mode from it, so J-A72.46 holds whatever a profile says |
| J-V11.26 | chose to map SettlementForge's `outputs`, its export, import and production labels and custom goods to our goods by a word table (`goodWords`) matched on case-folded tokens and adjacent token pairs, every match kept, with an `import` fallback, over fuzzy matching, for determinism |
| J-V11.27 | chose the family weights' calibration spike with a pre-decided halving fallback (V11 §8 R1), so no family dominates the solver |
| J-V11.28 | chose to write all 280 kind rows from SettlementForge's own catalogue — its names, tags, categories and tiers, read by V08's build step from `research/sf` (the owner's own program, not a reference) and committed as the catalogue manifest (registry row 77), the build's one source — over leaving them to a later step; the descriptions are not read |
| J-V11.29 | chose the ruin blueprint chance by rung and relief (every rung non-zero) over one rung-invariant row, because item 109 (b) names "a blueprint chance by rung and relief", item 109 (j) (1)'s any-tier rule holds with every row above 0, and good sites were re-settled so the larger and older places sit more often on older remains |
| J-V11.30 | chose to read item 109 (c)'s "every current culture row" as the town's fabric above the ruin (V01's `fabricSignature`), because V11 §3.20.3's culture rows are naming rows with no fabric to differ from |
| J-V11.31 | chose to fill V04's survival-share schema in item 109 (c)'s persistence order with no material factor, over exponential with a material term, because V04's schema landed and every ancient-culture row builds in long-persistence masonry, so the factor would be 1 everywhere |
| J-V11.32 | chose `growthCapShare` 0.01 PER YEAR compounded over the epoch's span (about a tenth a decade) over 0.1 per epoch or per year, because the same century must grow the same at any cadence (V06's J-V6.53) and 0.1 a year compounds to one and a half times a decade, not the owner's "moderately" |
| J-V11.33 | chose three crypt values with the crypt chance carried by the basement draw (`basement`) over a separate crypt chance, because one draw gives one answer: a church's basement is its crypt |
| J-V11.34 | chose `basement` with a low cellar row for the town `chapel` over `never`, because the owner's "may" covers every church and some guild and castle chapels stood over undercrofts; V07's chapel of ease keeps `never` |
| J-V11.35 | chose `crypt.rankShare` 0.8 over 0.9, because the compile bar already keeps the cathedral's target above every other crypt and a margin of a fifth keeps "the largest crypt" visible when the trim fires |
| J-V11.36 | chose an `order` row that puts the network's grounds first at METROPOLIS over leaving it to the burials-served rank, because item 109 (k) (2) states it and a row makes it a bar |
| J-V11.37 | chose the two-valued crypt join (0.7 over the church's own churchyard, 0.3 beside another burial face) over a single 0.5, because item 109 (k)'s "stands in or beside its cemetery" names two cases and the nearer is the likelier to have broken through |
| J-V11.38 | chose a `food-works` profile family for the slaughtering, brewing and fish trades over exempting them from T-V11-5, so no class both emits and cannot bear smell at level 2 and the rule stays unconditional |
| J-V11.39 | chose the manor's prosperous and rich footprints of 420 and 650 m² (V02 §3.10.3's measured values) over 320 and 550, because V02's courtyard compositions were measured against them and a giant manor must hold them |
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
| J-V11.50 | chose to hold item 110's decline cells in V11 §3.18 beside the building material rows, with V06's proposed values, over keeping them in V06's table, because V11 is the content home and V06 reads them as it reads the building rows — amended by J-V11.71 |
| J-V11.51 | chose the aqueduct as the way class `aqueduct` with a drawn terminal kind, over a roster class, because item 110 (b) calls it a raised channel of the raised way's kind and a roster class would add a building the roster never counted |
| J-V11.52 | chose to key `siting.web.chainStatus` by V08's neutral status keys (with `sustained` 0.9) over SettlementForge's six words, because the port carries only the neutral key (J-V8.49) and one weight table must serve dossier and standalone maps alike |
| J-V11.53 | chose to take the waterfront's threat keys from V08's `threats` row set and drop this volume's `from` cells, over two derivations of one fact, because V08 landed the derivation over real fields and single source forbids a copy |
| J-V11.54 | chose to apply V08's ladder re-check now and type the twelve file pairs whose lessers it did not list by one rule (SIZE × 1.5, the metalworkers COUNT), their lessers read from the committed `ladderPairs` with a failing cross-check, over guessing lessers from catalogue names or leaving the pairs untyped |
| J-V11.55 | chose V06's names and defaults `elevated.maxSpanM` 600 m and `aqueduct.minFallPerKm` 1 m, keeping `aqueduct.gradient` as the course solver's bounds, over `maxLengthM` 500 m, so V06's landed pass reads the rows without renaming |
| J-V11.56 | chose `plagueNeedFactor` 3 (V04's value) over 2, because item 109 (k) gives no figure, plague years buried many times the usual dead, and the growth cap bounds the effect either way |
| J-V11.57 | chose to carry the keyword table's new optional cells (`near`, `class`, `specialisation`, `binds`) in a second small table beside the plain rows, over widening every row, so the plain table stays V08's three-cell shape |
| J-V11.58 | chose to key V07's village class rows `v.<id>` inside `roster.classes`, with `villageForm` naming only `v.` keys, over a per-rung overlay on one row per id, because a village row and the town row of the same function share no profile, template or presence law (a village farmstead is a dwelling, the town's an outside farm), and one key holding two rows cannot compile (J-SS.2) |
| J-V11.59 | chose `citizen_militia` → `@none` at every rung (its muster is the green or the market), over a `guard_post`, because a militia was the able-bodied householders under arms, not a building, and V07 already reads it so; the town watch builds the posts (J-SS.3) |
| J-V11.60 | chose `v.manor_house` as the crown's village seat, over the parsonage or the reeve's house, because a royal manor was held and run from its hall like a lord's, and V07 names no crown row |
| J-V11.61 | chose that a COUNT of pins sets a floor over the pins' own coverage count and never clamps them to the range's top, over clamping, because a pin has no per-capita row and a record listing "multiple water sources" cannot mean fewer wells than the households need |
| J-V11.62 | chose to hold the archetypes' village readings as a typed cell of the archetype row (class, else-class, pin, delta, composition, ruin), read before `villageForm`, over V07's text alone or a single-class `villageForm`, because eight archetypes read differently at village rungs and data read by one compiler cannot drift |
| J-V11.63 | chose to keep the eight defensibility classes as the key and add `arcKind` (J-VI.3's vocabulary), with a closure feature exactly where a row closes with no wall and `steepSlope` reporting `cliff`, over keying by the six arc kinds (which drops classes with different wall grades) and over's null for `steepSlope`, because a closing escarpment is item 106 (a)'s "cliff or escarpment" and every closing row must name the barrier it stands on |
| J-V11.64 | chose `gates_if_walled` → `@none`, over `@wall`, because the record is conditional — its gates follow a wall record — and SettlementForge makes a wall its prerequisite, so no SettlementForge map loses a wall while a hand-made dossier listing only the gates stays unwalled |
| J-V11.65 | chose `calibratable: false` on every column of the dossier row sets (registry rows 63–66, 77), over leaving them to the general calibratable rule, because they are the port's derivation rules and the owner's program's words (§13.9 (7); V12's R4), changed only as table fixes reviewed with V08 |
| J-V11.66 | chose two `inferred` ladder rows joining the burial records across 1 500 (`parish_burial_grounds` a COUNT of the churchyards over `graveyard` and `burial_ground`; `graveyard` a REPLACEMENT of `burial_ground`), over leaving them unpaired, because without a pair a promotion closes the village's churchyard or binds it twice |
| J-V11.67 | chose two new naming slices (`naming.villageEnd`, `naming.field`) and village features on `naming.settlement` and `naming.way`, over folding ends into `naming.district`, because a village end is named from its anchor and bearing, not from a district identity, and the catalogue is closed |
| J-V11.68 | chose a siting row of its own for the town `watchtower` (`highGround` soft 0.5) once the village row moved to `v.watchtower`, over borrowing V07's row, because the two keys are separate and a town lookout still seeks the highest ground |
| J-V11.69 | chose that every content milestone writes its calibratable columns' register entries at its own exit, with C6 at M4 as their audit, over one transfer at M4, because V12's lint runs from M1 and a cell without an entry fails it |
| J-V11.70 | chose `calibratable: false` on every column of registry rows 68–70 and on the naming columns of row 71 (the ancestry row's `nameGrammar` and `appearanceTemplates`, the culture rows' grammar-slice and corpus fields), keeping the culture rows' `building` block calibratable, over leaving them to §3's general rule, because V12's R4 and T-V12-24 forbid calibrating naming tables, grammars, word lists and packs — the corpus teaches drawing, never naming — so a calibratable naming cell would need a register entry R4 refuses ('s shape) |
| J-V11.71 | chose the base decline table's persistence rows `retaining` and `raised` (§4.11, item 291) as the one home of a retaining stretch's and a raised span's strike weight, withdrawing V11 §3.18's `retaining.rate` and `raised.rate`, over keeping them as V11 cells, because V06's lottery reads the rate as a layer weight inside the churn cap, never a per-year chance, and one knob in two tables with two meanings fails V12's lint; J-V11.50 stands for the four hold and disuse cells |
| J-V11.72 | chose to state the supply web's off form as one named cell set in V11 §3.7.4 — the four web weights at 0, the two factors at 1, every good's `comfortM` 0 and two new switch cells `orientEnabled` and `splitEnabled` applied by the loader — over per-class orientation cells set to `balanced` and every split threshold at its range top, because `balanced` and "no split" are not zero cells, a threshold at a range top is an in-range sentinel the solver would have to special-case, and one switch per behaviour is the form V11 §3.24.0 already uses; declared splits, link edits and the dossier's chains stand, as declared rows do under V11 §3.24.0 |
| J-V11.73 | chose to exempt the rungs whose `RungProfile.frameLaw` is `territory` from the roster's coverage option — there a `V` cell is a siting pull only and S2's village member counts are V07's presence laws — over applying the option at every rung, because the option's rounded count would step inside a village band that V07 §2.4's laws own (J-V7.101) and T-V7-41's counts expect; the rule is read from the rung's `frameLaw`, so a later territory rung inherits it with no list to extend |
| J-V11.74 | chose to type the source cell's `presets` and `ext.over` over the four registered presets (`PresetId`: `MFCG`, `FTG`, `VG`, `FM`; items 376–377) from C0, with the compiler checking keys, the `presetsRequired` cells and every named off form under each zeroing preset whose file ships, and a `presets.FM` entry only on item 376's cells; and to write V11's own entries only where the off value is not the zeroing's (`bulkyWater`, `perishableShort` 1) or the cell is a switch (`orientEnabled`, `splitEnabled`, `terrace.enabled` false), each `own` with a `fixed:` note, landing with V07's V-M0 (VG; the milestone whose content ships the `VG` preset file, V07 §8 — J-V11.79) and V02's M6c (FM) — over typing the four keys only when each preset lands (a schema change at two later milestones) or writing an entry on every extension cell (hundreds of entries restating §7.6's zeroing), because the union is known now, the check makes T-V11-21's equality a build failure rather than a bench finding, and a `fixed:` off value keeps calibration runs off the parity neutrals (V12 §3.7.2 (3)); `PresetId` gains `NG` by J-V11.88, `ext.over` no value for it |
| J-V11.75 | chose `terrace.enabled` `calibratable: false`, as V11 §3.7.4's two switches, over leaving it calibratable with a register line whose fallback "none moves a switch", because a calibratable cell is one a run may name (V12 §3.7.2 rule (1)) and the owner's "they go in" is a rule, not a value to tune; the terrace family's realism stays confirmed through its thresholds' register line and the M4 panel's M4-110 group (V12 §3.11's next line), and T-V11-37 now refuses any calibratable switch |
| J-V11.76 | chose to name the other tables' register metrics and methods in V11 §8 by column family — the roster columns by the use mix and `pop.perBuilding` at M2b, the template budgets by `bldg.area`, `plot.area` and `bldg.quadSide` at M1, district kinds and identities by MFCG's anchors, `detourFactor` by the base's T16-4, `undergroundAccess.prob` by the V4-U5 panel, and the rest `corpus` at M-CAL by `frame.<table>.<column>` — over one blanket `corpus` line for every other table, because the columns a reference measures today would otherwise wait for M-CAL unconfirmed; `heights` is read by a frame, not by `bldg.*` as suggested, because no catalogue metric reads a storey count (the `bldg.*` metrics read footprints only); the `bar.<id>` and `frame.*` families are V12's (V12 §2.1, J-V12.65), the two bars V11's entries name registered by V11's seats (J-V11.78) |
| J-V11.77 | chose to require a `presets.VG` entry only on the `presetsRequired` cells of the village-read tables — those whose `readers` meet the stage set `ProductDecl('village')` registers, conditional registrations included, committed as the source manifest's `productStages.village` and held equal to the declaration by T-V11-9 — refusing a `VG` entry on any other cell and resolving no other table under `VG`, over requiring a `VG` entry on every categorical option cell (values for cells `VG` never reads, which a seat would have to invent) and over resolving an unlisted categorical cell under `VG` by a stand-in rule such as the `MFCG` entry (a value no village stage reads, stated only to satisfy a check), because `VG` is read at village rungs only (items 376–377), and a committed list with an equality check keeps `@plat/tables` free of a dependency on the village package; the compile writes the village-read cells to its manifest so V07 §3.15's list is checked complete; item 581 carries the rule into §7.6's sentence. — amended by J-V11.91 |
| J-V11.78 | chose that V11's seats register the two bars V11's register entries name — the base's T16-4 at C1 (`owner` `'base'`) and T-V11-30 at C2 — each as a V12 `BenchBarDef`, over a base change request for T16-4 (its check is already the base's, §13.2, and a registration is test code, not base text) and over's `paired` `StatBarSpec` for T-V11-30, because V12 §2.7b's `paired` rule measures a ruin's laid plan against the town above by `ruin.blockArea`, `grid.r4` and `grid.axis` and cannot state a two-arm band count, while V12 §2.1's `BenchBarDef` already names both ids; T-V11-30's zero arm is the same town's field recomputed from its drivers with `w_sun` 0, so the one term is the only difference between the arms |
| J-V11.79 | chose V07's V-M0 as the milestone that ships the `VG` preset file and V11's `presets.VG` entries with it, over's V-M1, because V-M0's exit already runs under `VG` (V07 §8), moves the file into V-M0's content and leaves V-M1 the request mapping, and V11's compile check under `VG` binds from the file's landing; every V11 place names the milestone by its content ("the milestone whose content ships the `VG` preset file"), so if V07 moves the file again V11's reading moves with it |
| J-V11.80 | chose to name every stage and epoch-phase reader in the registry by its StageId — V04's epoch participants under `U-FADE` (V04 §1.1's engine for them), V07's village participants under `VS1` and `VS2`, — with module ids only for readers outside the stage graph, the compiler telling them apart by a committed `stageIds` list and the integration suite recording each stage's reads (T-V11-1 (b)), over keeping prose readers and teaching the village-read test and V12's run scope to parse them (a free-text match that cannot be checked) and over deriving readers from code at build time alone (the registry is the one place §7.6's invalidation, the `VG` scope and V12's run scope read, so it must be data a reviewer sees); a reader list proved incomplete by the recorded reads is fixed in the change that registers the stage, never by a looser test (§2.1, §3.1, §3.2.1, T-V11-1, W71) |
| J-V11.81 | chose `calibratable: false` on every column of rows 86–89 (`toolkit`, `messages`, `clerk.ops`, `clerk.content`), over the finding's narrower marking (the message texts and `clerk.content`'s lexicon and refusal texts only), because V11 §2.1 defines the flag as "the corpus stage may re-sign it (§13.9)" and no corpus of drawn maps measures a tool row, a message, the clerk's budgets, token limits and prices or its spatial word distances; left calibratable, those cells would enter V12's register lint (T-V12-20) with no admissible method; their owners' own re-measurements (V10 §7.3, V09's usability runs) land as table versions instead (§3.1, T-V11-37) |
| J-V11.82 | chose the shipped paths `clerk/ops.json` and `clerk/content.json` for V10's two tables (V10 names no file) and `packPatchable: false` for all four new rows, over letting a setting pack patch the clerk's wording or the toolkit, because V09 §2.3, §2.9 and V10 §2.10 name every layer each table takes and a pack layer is none of them — a setting's words reach the clerk through a document's or a host's `clerk.content` rows (V10 §3.3's vocabulary block) (§3.1 rows 88–89) |
| J-V11.83 | chose to register V04's two dossier row sets, `dossier.sanitation` and `dossier.subterranean`, inside registry row 63 with `owner` `'V04'`, rows home V04 §2.3a and every column `calibratable: false`, over a row of their own or leaving them in V04's text alone, because they are dossier row sets the port's creation reads at door 1 like V08's row sets (`port.digest`; their DR17 is item 386's), a table outside the registry cannot load (V11 §2.1), and a dossier row set is a derivation rule of the port, never calibrated (§13.9 (7); J-V11.65); `@plat/app` is named as a module reader because V09's why card names the matched row, so a table edit refreshes it (§3.1 row 63; T-V11-1 (a)) |
| J-V11.84 | chose to state once, in V11 §2.1, that every registry row exists from C0 and ships as its schema's empty table until its rows-home milestone, with the *status* column naming who writes the rows and never whether they have shipped, and that the compiler holds an empty table's `TotalityRule`s and invariants from its first row, over calling the pre-milestone state `staged` (the status column's word for a table a staged input fills, row 32) or checking totality on empty tables, because a coverage rule over a table no seat has yet written would stop every build from C0 to that milestone, while the milestone's own exit tests read the rows it lands (§2.1; §3.1's preamble; §8's readers paragraph) |
| J-V11.85 | chose to make the seat registering an epoch participant write its registered `stage` into the readers of every table the participant reads, and the seat landing a module's first read of a table write the module reader, over leaving both to the stage registrations alone, because a participant adds reads under an existing stage without registering one and T-V11-1 (b) records the reads under that stage; and chose the module reader `@plat/hood` for the neighbourhood close-up (rows 39, 62), as the finding asks and as the other view-side readers are named by package (`@plat/app`, `@plat/clerk`), over a new id such as `hood.closeUp`, because the compiler tells module readers from stages by the manifest's `stageIds` (V11 §3.2.1 step 6) and the package's pipeline registrations (S7c, S8, S9b, its S13a step) stay listed by StageId beside it; row 57 gains U-FADE and row 61 S10b by the same rule (§3.1; §8) |
| J-V11.86 | chose to hold item 110 (b)'s landmark threshold as V11 §3.24.2's `elevated.landmarkMinSignificance` 20 (calibratable, beside `landmarkFactor`) over a `dossier.*` row set or a constant in V08's rule, because the threshold tunes the base's raised-way chance, not a dossier fact — a dossier row set is never calibrated (J-V11.65), V08 intends the value calibratable (J-V8.70), and a constant in a rule's text is a hard-coded universal (item 23); DR35 names the records and cites the cell (V11 §2.8c, §3.24.2, §3.24.7 (4)) |
| J-V11.87 | chose to name in V11 §8 the seat that writes the `presets.VG` entries after V-M0 — the seat landing a change that makes a table village-read (V-M2u) or adds a `presetsRequired` column to a village-read table, in the same change — over leaving V-M0's seat as the only writer, because after V-M0 the compile names those cells (V11 §3.2.1 step 4) and would stop a later build with no seat assigned; V07 §3.15 (3) states the V07 half |
| J-V11.88 | chose to admit `NG` as a fifth `PresetId` exactly as V01 states it (V01 §3.15, item 584, J-V1.98) — a zeroing parity preset that resolves a cell by its own `presets.NG` entry, else as `MFCG` resolves it; required on no cell; admitted only on `hood.constants`' cells, the compiler refusing one elsewhere as it refuses an `FM` entry outside item 376's scope; no `ext.over` value; its checks from V01's M5, the milestone whose content ships its entries — over the finding's default of requiring `NG` entries on every `presetsRequired` cell of the tables a V01 stage reads and admitting `NG` in `ext.over`, because `NG` falls back to `MFCG`'s resolution, so every categorical cell already resolves under it through its `MFCG` entry (a required `NG` entry would restate that value on cells V01 declares neutral to Neighbourhood), because V01, the owner of Neighbourhood's rules, puts its entries on `hood.constants` alone (switches that select whole rules), and because `over` names the reference a cell extends, whose zeroing `NG` inherits (item 376's note records no `NG` value); V11 writes no `NG` entry, none of its cells lying in the scope (§2.2, §3.1 row 73, §3.2.1 step 4, §3.2.2, §8, T-V11-0, T-V11-9, W75) |
| J-V11.89 | chose to register V01's `way.surface` and the base table `squares.quota` as catalogue rows 90–91, appended so no existing row number moves, with `squares.quota`'s rows home V01 §3.5.2 (where its default values are written) and its `owner` `'base'` (item 301's table, read by S7b (3) from M2b), its readers S7b, S2 and S9b (S2's land estimate reads its sub-block share, V01 §3.5.9, beside the finding's two), and `way.surface`'s readers S10a, S6 and EVO_DECLINE (an epoch's re-banded ways and V06 §3.5.2's landfall re-lay take their surface by the same rule), over folding them into row 62 (whose files are `hood/*.json`) or setting `squares.quota`'s rows home to §4.5 S7b (3) and §4.7 S9 (those sections name the table but write no row; the single-source rule puts a rows home where the values stand), because a table outside the registry cannot load (V11 §2.1) and V01 lands both at M2b; `way.surface`'s one value column is an enumeration, not calibratable, so it takes no register entry (§3.1 rows 90–91, T-V11-1 (a), §6, §8, W76) |
| J-V11.90 | chose to widen row 38's readers to S10b, S11, EVO_DEPARTURES, EVO_SITING, EVO_GROWTH and the module `@plat/hood` (the base's one capacity function, S11's entrance and basement-door cells and the close-up's reserve) and row 62's to S0, S1, S2, S6, S7b, S8.seed, S11 and the modules `@plat/app` and `testkit.bench`, and to drop `fabric.select` from row 62's ids (V01's stream concern, V01 §3.12, not a table), over listing only the finding's minimum, because V01's own text names the standalone document's S0, S1 and S6 reads (V01 §3.10.1) and S11's centrepiece read (V01 §3.5.10), and an unlisted stage fails T-V11-1 (b) while an over-listed one is only reported; row 38's S11 admits V12's runs whose metrics read S11 to name `roomProgram` cells (V03's hand-off left it to V11), which is right, since the capacity moves the households S11 houses — V03's T-V3-35 keeps `stages` `[]`; chose `S8.seed` over `S8` for the seed pass, because item 345 reserves it as a lineage stage id and V11's *Readers* paragraph keeps it one, (amended by J-V11.100: the reads are recorded under S8); and chose to extend V11 §8's writer rule to any change that makes a registered stage, phase or module read a table it did not read before, a base change request's application included, because the registration rule missed reads added to existing stages (items 233, 230, 241, 578 and 294) and the change that adds a read is the one place that knows it (§3.1 rows 38 and 62, §8) |
| J-V11.91 | chose that the loader resolve every table under `VG` by §7.6's order — a village-read table's `VG` entry, else 0 or off for an `extension` cell, else the default — with a categorical `option` cell of a table no village stage reads resolving to its `MFCG` entry, over the round-4 reading that only the village-read tables resolve under `VG`, because a village runs epochs (V07 §3.12; V06 §3.2 at a village rung) whose phases read V06's tables, whose cells V06 states "0 in the parity presets" (`decline.turnoverVacancy`, the splits, the fire-ordinance row), and those cells otherwise entered a `VG` view at their defaults; and over widening the village-read test to the fifteen `EVO_*` ids, which would break `productStages.village`'s equality with V07's declaration (T-V11-9) and require `VG` entries V07's list does not hold, for a case no table has today (V06 declares no `presetsRequired` column); the `MFCG` entry is the value V07 §3.15's rule gives a village-read cell for which `VG` has no behaviour of its own, so the two resolutions agree; the `VG` entry rule is unchanged (V11 §3.2.1 step 4); item 581's text follows (§2.1, §2.2, §3.2.1 step 4, §3.2.2, T-V11-9, item 581) |
| J-V11.92 | chose to list S5b beside S4 on every registry row that names S4 as the raised-way generator — rows 49, 71, 80 and 81 by name, rows 3 and 50 through `S5` — under one standing rule in V11 §3.1's *Readers*, over adding S5b to row 80 alone as the finding's minimum, because S5b runs S4's router with the same span pricing (§4.4; item 290 (1), (3)), so every table that route solve reads S5b reads too, and an unlisted reader fails T-V11-1 (b) while an over-listed one — row 71's culture factor, which a viaduct's `F = 1` never multiplies, listed for S5b as it already is for S4 — is only reported; chose to read the registry's `S5` (rows 2, 3, 50, 81) as a group the compiler expands to S5a–S5d, over rewriting those rows to per-step ids now, because §4.1 registers the growth stage as four `StageDecl`s (each with its own op form), so a bare `S5` would stop step 6's reader check, the base's own text names the growth stage "S5", and over-listing a step is only reported — amended by J-V11.100 |
| J-V11.93 | chose to write the display words as one table of their own (V11 §3.5.15: class, `label`, `synonyms`) over adding two columns to each of §3.5's nine class tables, and to give icons to the 45 profile families only — each class compiling its family's glyph, the goods, district kinds and style sheets shipping none — over a glyph per class (≈ 250 with the `v.` and generic rows), because the class tables are already ten columns wide and the words are reviewed, spell-checked and scanned together, the class key joining them as the single source; the palette groups stamps by family, V07 §2.4 already reads "the palette's glyph for the row's family", and V09 §2.3's `iconCell` is optional, so a label-only card is the pre-decided fallback wherever no glyph exists. Labels are unique per namespace (town-and-city, `v.`, generic), so a town row and its village form may share their words; a synonym may be shared (`mill`) and `commonness` settles it |
| J-V11.94 | chose `commonness` = the row's roster share at TOWN, derived by the compiler at step 5a from the compiled count cells (V11 §3.5.1), over hand-set numbers or a per-capita-rate proxy, because it has the same meaning as V07's village rule (J-V7.133) and the reader compares rows of the document's rung only, a village rung's tie going to the `v.` row (V09 §4.16 (3)), and a derived cell moves with every table version that moves a count (a calibration included) where a stored number would drift; rounded to 0.001, finer than V07's 0.01, since a town roster holds V11 §3.5.14's 181 classes against the village's 25 |
| J-V11.95 | chose that a `generic-<family>` class's `label` is its profile family's `label` cell (V11 §3.4), over the family's `trade.noun` corpus entry proposed, because the corpus is authored at C5 (M2b and M3b) while the generic rows compile from the first compile that holds their family, a label must exist from then (T-V11-4), and `trade.noun` is a naming word list held to naming's bars and never calibrated nor read as a display cell; the corpus's authoring rule now reads the labels (V11 §3.20.5), so the two agree in words. The finding's mechanism (the compiler writes the label, `synonyms` [], `commonness` 0) is kept |
| J-V11.96 | chose to hold item 244's span-rule constants as `raisedWays.structure.span` and item 244's slide bound as `structure.slideMaxFactor`, and item 245's snap as the `retaining` table's named `settings` row, over a registry row of their own (`raised.span`), because the structure row already holds the heights the span rule reads beside them (clearance, pier heights and spacing), so one row set is one invalidation slice and one editor page; their values stated once — amended by J-V11.104. Chose also to define the settings form in V11 §2.1 (`ColumnSpec.row`), which V01's `hood.constants` and this finding cite and §2.1 had not stated, and to list U-CITY, U-ACCESS and U-LINK among row 80's readers for `foundationObstacles` (over-listing is only reported by T-V11-1 (b), under-listing fails) |
| J-V11.97 | chose to close the content system's edges by five rules — data compiled (a refusal at compile, an absent default at load), geometry the reading stages', rungs, presets and lifecycle by V11 §2.10 — and one table of each mechanism's outcomes and failure rungs, with one table of the combinations this volume owns and one suite (T-V11-40), over an edge paragraph in each subsection, because the content system's edges reduce to its compile refusals and its absent defaults, which the rules state once (V11 §3.26) |
| J-V11.98 | chose to hold item 111's dry-country cells on the climate rows — the arid water factors, the oasis chance with its no-other-water factor, area band, gardens, channel reach and grove, the growth and prosperity water weights and radius, the sunlight multiplier and the wells' yield weight and coverage factor — over a dry-country table of its own, because every reader selects them by the site's biome (§4.2 S0–S3, §4.5, §4.7 S10b, §4.9), one row per biome is one invalidation slice, and a multiplier on `w_sun` keeps item 102 exactly as filed where it is 1 (V11 §3.17.1) |
| J-V11.99 | chose event-to-epoch rows keyed by SettlementForge's template word with one default row per event family, and the burial threshold as the base century times its four factors, clamped, over a row per template only or an additive rule, because a family row maps every one of the 29 templates (a template word the rows lack reads its family's), the factors act per flood and per silting as item 113 (c) words them, and the clamp keeps a much-flooded ruin from burying in a decade (V11 §3.25) |
| J-V11.100 | chose that a table read is recorded under the registered StageId of the stage function that reads — S8 for the seed primitives, S5b for the growth step's router — never under a calling epoch phase (an epoch re-derives through V06's fold), so registry rows 62, 80 and 81 list S8 and S5b with no conditional clause, over keeping the pre-decided moves of J-V11.90 and J-V11.92, because a readers entry is §7.6's invalidation map and must be determinate (V11 §3.1's *Readers*) |
| J-V11.101 | chose, by the owner's delegated decision on Q-V11-1 (J122), to keep SettlementForge's sensitive kinds on the map concealed by default — concealment rows with `none` 0 for `slave_market`, `trafficking_den` and `kidnap_den` and a cover row for the slave market — with a dossier's own mode or knowledge resolved first, so the map shows them as SettlementForge's own settings show them (V11 §3.14) |
| J-V11.102 | chose to hold the values the base calls table values — the dynamic grid's cells by level, New random's advance bound, the crossing search band — as one registered base settings row (registry row 93), over leaving them in prose, because a value outside the registry cannot load, be edited or be pinned (V11 §3.1) |
| J-V11.103 | chose to write every owner item's no-op-pin off form as one table in V11 §3.24.0, each in its columns' ranges, with its base bar and this volume's test, over each item's cells in its own section, because §13.2's convention (5) reads one off form per item and V12's engine writes them as `{ ref, value }` pairs (V11 §3.24.0) |
| J-V11.104 | chose to state the span-rule, slide and snap values in V11 §3.24.1–§3.24.2, the base naming the cells as rows 79–80's and stating no value (§2.2, §2.7), over leaving the values in item 244's text, because one value has one home and the base cites this one (J-V11.96 amended) |
| J-V11.105 | chose that the ladder lessers of the twelve remaining file pairs are written at C4 from the committed `ladderPairs`, the cross-check (T-V11-2) failing any build that lacks one, over writing them from memory now, because the committed data is the one source and a pair with no row cannot pass the build (V11 §3.12, §8) |
| J-V11.106 | chose that the vocabularies — the corpora of V11 §3.20.5 — are written during the build under V11 §3.20.6's plan, clean-room and scanned, never in this volume (J122), because this volume fixes their grammars and bars and the words are authored, spell-checked and scanned together |
| J-V11.107 | chose that a cart crossing needing more than 1.5 × `rampMaxGrade` lowers the wall's step inside the way's corridor (`W_STEP_LOWERED`), over lengthening the ramp along the wall or refusing the way, because the owner's words forbid a stair and a gap, the corridor is the way's own ground, and the wall keeps its line and height elsewhere (V11 §3.24.5) |
| J-V11.108 | chose the union of V09's and this volume's declared shapes for the two document-only tables — the kind keys `uid:`, `cat:` and `cls:` with profile, family weights, quarter, place and split; `use:` with place, pin, split and specialisation; link edits with `bindTo`, `avoid` and `cut` — over either volume's narrower set, because every screen of V09's must write a declared cell and no cell may be lost (V11 §4.2) |
| J-V11.109 | chose `access.ruinGain` 1.5 on II.7.3's basement-access probability over a ruin's element, under the access row's `cap`, over leaving the gain at 1, because item 109 (d) raises the chance over a ruin and a built void is the readiest to break into (V11 §3.23.7) |

## 10 Base change requests

Every request this volume made of the base is base text: file f carries it as the items below, applied at the base
section named, and this volume cites that section. None is open; a request's amendment notes are folded into its one
entry.

| request | what the base holds | item(s) | base section |
|---|---|---|---|
| BCR-V11-1 | the class row's `profile`, `staff`, `villageForm`, `templateFamily` and `producesShare` columns, with `SitingProfile` and its parts typed as V11 §2.3 | 430, 432, 576 | §10.2 |
| BCR-V11-2 | the derived rows' ids, the `coverage` kind and its cells, the feature classes a row's `to` accepts | 433 | §10.2 |
| BCR-V11-3 | the goods columns of `ResourceRow` (V11 §2.5) | 434 | §10.2 |
| BCR-V11-4 | the dossier row sets this volume writes (`ladders`, `archetypes`, `categorySynonyms`, `keywords`, `goodWords`) | 510, 520 | §14 item 7 |
| BCR-V11-5 | the wall rows (`walls.barriers`, `walls.waterfront`) | 258 | §2.7 |
| BCR-V11-6 | the table list is the registry, V11 §3.1 | 379 | §7.6 |
| BCR-V11-7 | the era table (`EraRow`) | 400 | §7.7 |
| BCR-V11-8 | the row types the base names without declaring; the roster mode's home | 427, 435 | §10.2 |
| BCR-V11-9 | V08's `kinds` shape takes the pseudo-classes and V08's adapter reads `goodWords` | — (a volume's) | V08 §2.6, §3.5 |
| BCR-V11-10 | the document-only tables (`documentOnly`) | 380 | §7.6 |
| BCR-V11-11 | the price of the owner items' content rows | 532, 568 | §16 |
| BCR-V11-12 | the term "EVO" (an epoch phase id) defined | 446 | §10.4 |
| BCR-V11-13 | the crypt column (`crypt`, `cryptM2`, `crypt.rankShare`) | 436 | §10.2 |
| BCR-V11-14 | crypts are not catacombs | 566 | II.7.6 |
| BCR-V11-15 | the cellar trades | 553 | II.7.3 |
| BCR-V11-16 | relative `upstream`, `downstream`, `upwind`, `downwind` | 437 | §10.2, §4.7 S10b |
| BCR-V11-17 | the district kinds' `affinity` | 438 | §10.2 |
| BCR-V11-18 | the hinterland's land uses as providers | 288 | §4.2 |
| BCR-V11-19 | `definedBy` | 439 | §10.2 |
| BCR-V11-20 | soft, not hard (item 103 (c)) | 440 | §10.2 |
| BCR-V11-21 | the provenance grammar | 534 | §17.1 |
| BCR-V11-22 | the siting feature rasters in the CITY split | 477 | §12.4 |
| BCR-V11-23 | `exportWhy` | 456 | §11.1 |
| BCR-V11-24 | `distribution` | 441 | §10.2 |
| BCR-V11-25 | quarter identities keyed by profile families | 442 | §10.2 |
| BCR-V11-26 | the custom kinds' fallback class retired for item 104 (a)'s resolution | 425 | §10.2 |
| BCR-V11-27 | the culture specialisation and `Use.specialisation` | 259, 426 | §2.7, §4.7 S11 |
| BCR-V11-28 | the relief rows' `terracedEdges` column | 289 | §4.2 S0 |
| BCR-V11-29 | the aqueduct's terminal criteria row | 401 | §7.7 |
| BCR-V11-30 | the retaining walls' materials and their §8.2 roles | 245, 412 | §2.7, §8.2 |
| BCR-V11-31 | the `VG` preset's scope over categorical option cells | 581 (with 377) | §7.6 |

The other volumes' requests this volume's rows serve are base text the same way: `PlacementSolver.explain` (item 311,
V11 §4.5), the `VG` and `FM` presets (items 377, 376), `NG` (item 584).

### 10b Hand-offs — every one closed

**What this volume asked of others** (each landed at its destination; this volume's text reads the landed form):

| id | to | what | closed at |
|---|---|---|---|
| X-V11-1 | V08 | T9 and DR9 read `dossier.ladders`; the adapter applies `goodWords` by V11 §3.13.5's rule; the committed catalogue manifest with `ladderPairs`; the `kinds` shape's pseudo-classes (`@absent:<class>[+<class>]`) and `implies`; the `categorySynonyms` `family` cell; the `keywords` cells `near`, `class`, `specialisation`, `binds`; the `archetypes` `village` cell; its custom kinds read by item 104 (a)'s resolution | V08 §2.4, §2.6, §3.5, §3.5.1 |
| X-V11-2 | V07 | the palisade reads `walls.barriers` with every water arc closing; the village tier cap and eligible classes; the `v.` keys; the archetypes' `village` cells; `villageSeat`; the village naming slices; the `VG` entries with V-M0 and V07 §3.15's list | V07 §2.4, §3.4, §3.10, §3.11, §3.15, §8 |
| X-V11-3 | V10 | `WhyPull.row` carries V11 §2.4's ids resolved to `says`; `query row` and `query profile`; an unwalled side names its row and `arcKind` | V10 §2.13, §3.10 |
| X-V11-4 | V04 | `CatacombRule.order`; `growthCapShare` per year compounded; V04 §2.3 cites V11 §3.23 for the rows it marks V11's | V04 §2.3 |
| X-V11-5 | V02 | the S11 specialisation draw replaces the band template's `composition` and `heights` | V02 §3.15 |
| X-V11-6 | V08 | the keyword rows' optional `class` and `specialisation` cells | V08 §2.6 |
| X-V11-7 | V02 | the deck fallback constants are read only while `deck` is unregistered | V02 §3.16 (2) |
| X-V11-8 | V01, V07 | `WayNamingContext.raised`; the terrace slope's unit | V01 §3.7.2, §3.3; V07 §2.4 |
| X-V11-9 | V02 | an oval composition for the `arena` family | V02 §3.3, §3.10.2 (`ovalCourt`) |
| X-V11-10 | V04 | the vault share scaled by the era and culture factors; `CultureRow.monument`'s values | V04 §2.3, §3.5.0a |
| X-V11-11 | V06 | V06 reads V11 §3.18's structures block and §3.24.2's rows and keeps no copy; no dossier factor; the base's persistence rows for strike weights; the web's off form cited | V06 §2.2, §3.5.2, §3.9.10, §3.19 |
| X-V11-12 | V12 | every calibratable cell of V11 §3.23–§3.25 in the register; `evidence`; the column entries at each milestone; the dossier rows not calibratable; the off forms of V11 §3.24.0 | V12 §2.10, §2.13, §3.11 |
| X-V11-13 | V09 | the siting, link, split and tier gestures write the two document-only tables and keep no store; the deck badge, landward bend and `bridgeMid` read V11 §3.24.4; the flat-ground bends read `terrace` | V09 §2.6, §4.7, §4.20 |
| X-V11-14 | V04, V07, V09, V10, V12 | the epoch participants' registered stages (`U-FADE`, `VS1`, `VS2`); V12's run scope reads the registry's StageIds; the clerk's tables not calibratable | V04 §1.1, V07 §3.12, V12 §3.7.2, V10 §2.10 |
| X-V11-15 | V04, V08, V07, V01, V06 | the dossier row sets V04 owns in row 63; DR35 cites `elevated.landmarkMinSignificance`; V07 §3.15 (3)'s `VG` writer rule; `@plat/hood`; the participants' stages | V04 §1b, V08 §2.6, V07 §3.15, V06 §3.16 |
| X-V11-16 | V01, V12, V03, V06, file f | `NG` as V01 states it; rows 90–91; item 581's text; row 38's readers | V01 §3.15, item 581, V03 §2.4, V06 §3.5.2 |
| X-V11-17 | V09, V07, V08, V04, V12, file f | the 45 family glyphs; the display cells read; the span cells' names `raisedWays.structure.span.*`, `slideMaxFactor`, `retaining.settings.stateSnapCm`; their register lines | V09 §5.1, V07 §2.4, V08 §4.6, V04 §2.3, items 244–245, V12 §3.11 |

**What others asked of this volume** (each answered in this text):

| hand-off | what | answered at |
|---|---|---|
| V02 X2, X3, X5, X32 | the derivation ratios, the `manor` override, the heights columns, the `arena` row and the role shares | V11 §3.6.1, §3.6.4, §3.6.5 |
| V02 X9 | `MaterialRow`'s rows are this volume's; `materialFamily` reaches the material row only | V11 §3.19.3 |
| V02 X13 | a `templateFamily` on V07's `v.` rows | V11 §2.9, §3.6.1 (V07 §2.4 names it) |
| V02 X26 | village tiers only through the specialisation rows under V07's cap | V11 §3.24.3 |
| V06 X1 | `growthCapShare` | V11 §3.23.8 |
| V06 X8 | the always-crypt class column and the church family; the religion rows | V11 §3.5.8, §3.21.2 |
| V06 X20 | the `raisedWays`, `terrace`, `deck` and `deckOk` rows | V11 §3.24.1, §3.24.2, §3.24.4 |
| V06 X31 | `retaining.*` and `aqueduct.disuseAfterYears` are V11 §3.18's | V11 §3.18 |
| V06 X35 | the web's off form as one cell set | V11 §3.7.4 |
| V06 X43, X45 | the village participants' stages; row 90's readers | V11 §3.1 rows 61, 90 |
| V07 FL-2, FL-3 | `v.parish_church` among the counted churches; the village cells of the specialisation rows and of `deckOk` | V11 §3.23.8, §3.24.3, §3.24.4 |
| V08 X1, X4, X14, X22 | the ladder fixes, the burial ladder, the burial pairs, the pin-record and `parish_church` rows | V11 §3.11, §3.12 |
| V08 X2 | `chainStatus` `sustained` 0.9 | V11 §3.7.4 |
| V08 X5 | the conduit house's binding (superseded by the criteria row) | V11 §3.24.7 (1) |
| V08 X6 | the culture rows for the aqueduct chance; the stepped specialisation rows | V11 §3.20.3, §3.24.3 |
| V08 X9 | `toll_bridge`'s `implies`; the toll house's `deckOk` | V11 §3.11, §3.24.4 |
| V08 X19 | `elevated.landmarkMinSignificance`; `customWeights` in row 63 | V11 §3.24.2, §3.1 |
| V08 X25 | the display cells; a generic class's label | V11 §2.3, §3.5.15, §3.13.3 |
| V09 XV-V9-1, XV-V9-2 | the `cls:` and `use:` key forms, `familyWeights`; `avoid` and the three link meanings | V11 §4.2 |
| V09 XV-V9-13 | the flat-ground bend cells; `bridgeMid`'s `minSpanM`; the raised ways' `says` | V11 §3.24.1, §3.24.2, §3.24.4 |
| V09 XV-V9-31 | row 87's row types by locale | V11 §3.1 row 87, §3.2.2 |
| V10 CVR-V10-6 | the family names V10's mapping reads (`sun`, `nuisance`) | V11 §2.4, §3.3 |
| V10 CVR-V10-12 | the specialisation ids as designations with plain words; the item-110 rows' `says` | V11 §3.24.1–§3.24.4 |
| V10 CVR-V10-16 | one name, `familyWeights` | V11 §4.2 |
| V12 X-V12-1 | `corpus` sources in historical packs with evidence; `evidence.json` | V11 §3.2.1 steps 4, 7 |
| V12 X-V12-3 | the column entries at each content milestone; the ancient rows' distinctness | V11 §8, §3.23.4 |
| V12 X-V12-9, X-V12-11 | the switch table as the pins' off form; the `ownerRule` stamp and calibration minima | V11 §3.24.0, §3.24.2, §3.2.1 step 4 |
| V12 X-V12-15, X-V12-16, X-V12-18 | the bars V11's seats register; the rows not calibratable; one entry per staged line | V11 §8, §3.1, T-V11-37 |

## 11 Owner questions

| question | decision |
|---|---|
| Q-V11-1 — the sensitive SettlementForge kinds (`slave_market`, `slave_market_district`, `human_trafficking_network`, `kidnapping_ring`) | answered by J122: keep them, concealed by default in player views, shown as SettlementForge's own settings show them — V11 §3.14's rows and J-V11.101 |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** the base's §2.2, §2.7, §4.2 S0–S3, §4.5, §4.7 S10b–S11, §4.9, §4.11, §7.6, §7.7, §10,
§13.2, §16 and II.7.3–II.7.6 as the coherence pass left them; file items 102–113; the landed volumes V01–V09 and V12 at
the sections this volume cites; the 280 SettlementForge catalogue kinds mapped (0 missing, 0 extra, every mapped class
defined in V11 §3.5); by script over this file, every J-V11, T-V11 and W id cited is defined once, the registry's
catalogue count is read from `REGISTRY`, the class count is V11 §3.5.14's 181, the template families number 35.
**PLAUSIBLE (reasoning, to be measured):** every numeric row — per-capita rates, weights, radii, areas, thresholds, the
item-109 chances, the ancient-culture pitches, the catacomb growth cap, every item-110, item-111 and item-113 cell — is
our own and provisional until its V12 §3.11 register entry closes; the family weights' balance against the authored
rows (V11 §8's R1 spike decides); that the behaviour bars T-V11-12 – T-V11-40 hold at the stated rates; that the water
balance favours dry, karst and large cities (V11 §3.24.6's worked check; T-V11-33 and the fallback decide); that the
ancient-culture rows clear V12's distinctness thresholds (T-V11-24, with the pre-decided refit); the `inferred` ladder
rows until the port meets both forms.

## 13 Fix list

Empty. Every finding against this volume is closed in its text: the former fix-list items are decisions — the ladder
lessers of the twelve remaining file pairs (J-V11.105, V11 §3.12) and the vocabularies (J-V11.106, V11 §3.20.6) — and the
other volumes' restatements of this volume's rows are gone at their destinations (V04 §2.3 and V06 §2.2 cite V11 §3.18,
§3.23 and §3.24).
