# Design volume 11 — The content system: every rule and content table, its schema, its rows and its authoring plan

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V11-content, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the content system `@plat/tables` and the content rows
of `@plat/content` over the base (`docs/ARCHITECTURE.md`, with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`,
`docs/AMENDMENTS-2026-09-28g.md`). The implementer holds the base, this volume and the sibling sections cited, and nothing
else (§17.1). Every fact the base or another volume states is cited, never restated; every content-table value is stated
once, here (the canon's rule S2: another unit cites the cell by table, row and column). **Citations:** a bare `§n` or
`II.n` is the base's; `Vnn §n` is a design volume's section, this one included (`V11 §3.5`); a list after a volume prefix
stays in that volume (`V04 §3.5, V04 §3.10`); `item n` is an amendment item — items 1–101 the owner's instructions, 102–119
file g's owner and program rules, 200 and above file f's, each the applied text of a volume's base change request (V11
§10 lists this volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never
restated. Decisions are `J-V11.n` (V11 §9), tests `T-V11-n` (V11 §7), wiring rows `W1…` and cross-volume rows `X-V11-n`
(local to this volume; another unit writes `V11 W19`). **Provenance words.** A cell's provenance is one of the grammar's
sources (V11 §2.2); `own` means our own reasoned default, and "calibratable" means V12 §3.11's register carries its entry
(the method and the milestone that confirms it) — a provisional number with a named check, never an open choice.
**Clean room.** No row, word list, palette or table is taken from a reference program; references enter only as
described behaviour cited by file and section, and SettlementForge's catalogue enters as its kinds' identity only (§17.1).

## 0 In plain words

Every decision the generator makes that is not geometry — which buildings a town of 6 000 people needs, how big a rich
smith's house is beside a poor one, which trades sit together and which keep apart, what a neighbourhood is called, what
a thieves' guild hides behind, what the walls are made of — is read from a **table**. This volume is the book of those
tables: every table the program has, what each column means and in what unit, who reads it, where its rows come from,
and, in full, the rows that are design choices — the ladder of building kinds from shack to cathedral, the district
kinds, the named quarters, the translation of each of SettlementForge's 280 institution kinds onto our buildings, the
fronts a hidden institution may use, the economy's sectors, and the owner's siting rulebook of 2026-09-28: how each kind
of building pulls toward or pushes away from the others.

Nothing changes on the one-click map — the tables are what the map is made from. A designer who opens the tables editor
sees plain rows ("tannery: gives off smell and fouls water; needs running water; downstream of houses; sells to cobblers
and saddlers"), each cell saying where its value came from (a reference we emulate, our own judgment, the owner, the
historical corpus). Changing a cell changes exactly the parts of the map that read it, as an undoable edit, and the clerk
can say why the tannery stands by the river below the town by naming the rows that pulled it there.

The rulebook is **factored**, not a giant list of pairs: each building kind carries a short profile — what it gives off
(smell, smoke, noise, fire risk, fouled water, heavy traffic, crowds, disorder), what it cannot bear, what it needs
(running water, a road, a gate, the harbour, the market, space, safety, secrecy), who its customers are, what it buys and
sells, which side of the law and of the sacred it stands on, whether it clusters or spreads so every district has one —
and a dozen general rules turn the profiles into gentle pulls and pushes. A few dozen named pairs add what profiles
cannot say ("dyers upstream of tanners"). Only true physical needs are hard (a watermill on water); everything else is a
weighted tendency, so towns differ and the pattern shows on average — the owner's "a correlating general rule".
SettlementForge's custom content fits the same book: a custom institution nobody wrote a rule for lands sensibly, because
its scene archetype, category, tags and the words of its name map onto profiles, and its supply chain is placed as one
connected thing.

Under the ground the book holds the numbers of the owner's underground rules (items 109, 113): how likely an older
civilisation's ruins lie under a site, their four kinds of ancient street plan, which parts of a ruin last longest, how
likely a cellar, a well or a mine breaks into a cave or a ruin, how deep a void must lie to stay secret, and the burial
rule the owner settled — churches get crypts (the cathedral always, and the largest), catacombs lie only under
cemeteries (and, in a city, under a worked-out quarry turned ossuary), one catacomb in a town and more in a city by its
churches, each growing by about a tenth a decade at most and never shrinking. For the owner's four building rules of
item 110 it holds how steep a slope and how tall a step make a town build a terrace wall and of what, how likely a city
carries a road on arches over a ravine, raises a road between its high quarters or brings water on an aqueduct (never a
town unless the user draws it), which cultures build in stepped tiers, how many small buildings a bridge, a pier or a quay
may carry and which trades may stand on them, and which fort or lighthouse may stand at a mole's head.

The owner's rules of 29 and 30 September add their numbers here too: how likely a desert town has an oasis and how
strongly dry country pulls a town toward its water (item 111); how a known history is replayed decade by decade and when
old ruins sink underground (item 113); what a poor, safe town patches its failing walls with (item 114); how grand a
building a hamlet or a village may have (item 115); how each climate looks through the year — ice, harvest, the autumn's
many colours (item 117); and what a festival hangs in the streets at each size of settlement (item 118). Every one of
these is a row the user can change, and with every one switched off the map is exactly what it was before.

What the volume does NOT hold: the vocabularies of names (it designs the grammars and how their word lists are written,
never the lists), the colours of the palette (§8.2's), and the rows other volumes own and state (cited, never copied).

## 1 Scope, the base hooks consumed, and what is out of scope

**What this volume builds to depth.** The content system: (a) the **table registry** — every rule table's identity,
file, schema, units, declared ranges, readers, slice kinds, provenance rules and parity-preset behaviour, one typed
catalogue (V11 §2.1, V11 §3.1), the registry §7.6 cites (E-05; file f item 379), with the base settings row that holds the
values the base calls table values (V11 §3.1; W-SET-01); (b) the **authoring source, compiler and loader** of
`@plat/tables` — how rows are written, inherited, checked, versioned, compiled to §7.6's cell shape and loaded as a
`TableView` (V11 §2.2, V11 §3.2); (c) the **rows** of every table whose rows are design decisions and that no other
document writes: the class ladder with its designation-template families (V11 §3.5, V11 §3.6); the siting rulebook of
items 103, 104 (h), 105, 107 and 108 — profile families, relation families, class profiles, coverage, balance,
orientation, split, the goods table, the signature pairs, the ladder step types (V11 §3.3, V11 §3.4, V11 §3.7, V11 §3.8,
V11 §3.12); the district kinds and quarter identities (V11 §3.9, V11 §3.10); the institution map over all 280
SettlementForge catalogue kinds with the 17 scene archetypes, the category synonyms, the keyword table and the resolution
of item 104 (a) (V11 §3.11, V11 §3.13); the concealment and cover rows (V11 §3.14); the sector and power association rows
(V11 §3.15); item 106's wall defensibility and waterfront-threat rows (V11 §3.16); the climate and land-use rows
(V11 §3.17); decline, ruin and salvage by material (V11 §3.18); the era and region table and the material rows
(V11 §3.19); the government, religion and household rows (V11 §3.21); item 109's crypt column (V11 §3.5.8) and the
underground's content rows (V11 §3.23); item 110's rows (V11 §3.24); and the rows of items 111 and 113–119 (V11 §3.25);
(d) the **naming system's grammars** and the **authoring plan for their vocabularies** (V11 §3.20) — the word lists and
the symbol artwork are written during the build under that plan, clean-room (J122); (e) the **edges** of every mechanism
this volume owns and the combinations it meets (V11 §3.26); (f) the **editing, versioning, testing and build plan** of
all of it (V11 §4, V11 §7, V11 §8).

**Base hooks consumed** (each by section; nothing restated):

| base hook | section | what this volume plugs into it |
|---|---|---|
| the override layer, keyed rows, cells with provenance, `extension` and per-preset values, reference cells, `documentOnly` entries, orphans, slice invalidation, the pinning hash | §7.6 | every table of V11 §3.1 is such a table; the compiler (V11 §3.2) emits exactly that cell shape and computes that hash |
| `RosterTables` and every row type of §10.2 (`BuildingClassRow`, `RelationRule`, `SupplyEdge`, `DesignationTemplateRow`, `UseRuleRow`, `DistrictKindRow`, `ConcealmentRow`, `CoverRow`, `ClassMixRow`, `ClusterRow`, `TenureRow`, `QuarterIdentityRow`, `PowerLinkRow`, `SectorLinkRow`, `BandRangeRow`, `SectorRow`, `PortRows`) and the shapes files f and g add there | §10.2 | the rows (V11 §3.5–V11 §3.15; V11 §3.25); the columns items 103–108 add (file f items 432–434, 510, 520, 258) |
| the sequential roster, need propagation, markets, government and religion seats | §4.2 S2, §10.2 | the classes' roster columns, supply edges and `perConsumers` (V11 §3.5, V11 §3.7) |
| the placement solver (hard rows filter, soft rows score, supply distances by mode, explain) | §4.7 S10a, S10b | the derived family rows and signature pairs it scores (V11 §3.3), with stable row ids for its explain mode (V11 §2.4) |
| the designation template, the mutator's compatibility table, class mix, clusters, concealed institutions; item 115's rung ceiling | §4.7 S11, §4.7, §4.2 S10b | template families (V11 §3.6), the compatibility rows (V11 §3.6.3), the cover rows (V11 §3.14), the ceiling rows (V11 §3.25.4) |
| typing, the band set, fields and drivers (item 102's `w_sun`; item 111's water term), character, identities, dials, band ranges | §4.5 | district-kind rows (V11 §3.9), identity rows (V11 §3.10), the driver rows' cells and item 111's climate cells (V11 §3.25.1) |
| the site features and their chances; the oasis; the water pull on the growth field | §4.2 S0, S1, S3 (6), §4.4 | the climate rows' dry-country cells (V11 §3.25.1) |
| the greenery rule table, the climate rows, farm modes, land uses; the season columns (item 117) | §4.9, §2.7, §4.2 S0, §10.2 | the climate and land-use rows (V11 §3.17), the season and leaf tables (V11 §3.25.6); the greenery rows are §4.9's (cited) |
| the decline table, survivors' ladder, Works table, salvage; history-first generation (item 113) | §4.11 | the salvage and durability rows by material (V11 §3.18); the history cells and event rows (V11 §3.25.2) |
| `Enceinte.condition` and the wall's repair material (item 114) | §2.7, §7.1, §7.7 | the wall-condition cells and the patch-material rows (V11 §3.25.3) |
| `MaterialRow`, the regional shift, the era and region preset the circumstance names | §2.6, §7.7 layer 2, D-2 | the era table `EraRow` (file f item 400) and the material rows (V11 §3.19) |
| the naming engine, setting packs, user corpora, names from character | §10.4, §9.6, §4.10 S13a | the grammar slices and their features (V11 §3.20) |
| table edits, row operations, presets | §7.1 (`editTable`, `RowOp`), §7.4 | the tables editor's row set and lifecycle (V11 §4) |
| the dossier row sets and the port's lookup chains; `traditions` (item 118) | §14 item 7; §7.7; V08 §2.6, V08 §3.5 | the ROWS of `kinds`, `archetypes`, `categorySynonyms`, `keywords` and every tag family's profile (J-V8.18); the staging keywords (V11 §3.25.7) |
| the view state's season and festival keys; the rendering's season and decoration rows | §2.9, §8.2 | the season tables, leaf palettes, cover densities, decoration, staging and motif tables (V11 §3.25.6, V11 §3.25.7) |
| the clean-room chain and honest provenance | §17.1 (2), (5), (6) | the authoring discipline (V11 §3.2.6), the provenance grammar per cell, the scan in the build |
| the package layout and dependency rules | §14 | `@plat/tables` owns the registry, compiler and loader; `@plat/content` owns item 104's resolver and the family derivation (V11 §3.3.4) |
| the statistics bench and the no-op pins | §13.2 | the content fixtures and the per-row bars of V11 §7; every owner item's off form (V11 §3.24.0) the pins read (E-20) |
| basements, the terrain gate and the crypt | §2.6 *Basements*; §10.2 `basementGate` | the `crypt` and `cryptM2` columns and `crypt.rankShare` (V11 §3.5.8; file f item 436) the basement function reads |
| the underground systems, access, the undercity's void sources; the buried former settlement | II.7.3, II.7.5, II.7.6 | the rows of `tables/under/ruin.json`, `openings.json`, `dig.json` and `catacomb.json` under V04's schemas (V11 §3.23); the class rows' `undergroundAccess.prob` (V11 §3.5.1); `history.burialYears` (V11 §3.25.2) |
| the solver's read-only explanation | §4.7 (`PlacementSolver.explain`, file f item 311) | the row ids of V11 §2.4 its `WhyPull.row` carries |
| retaining walls and levelling, raised parts and their generator, deck plots and their cutter, `Use.specialisation` (item 110) | §2.2, §2.7, §3.4, §4.2 S1, §4.3, §4.6, §4.7 S10–S11 | the rows of V11 §3.24 (`terrace`, `retaining`, `raisedWays`, `ways.crossing`, `deck`, `deck.landmarks`, `roster.specialisations`, `water`); file f items 259, 289, 401, 412 |
| the per-map zoom-out limit (item 116); the quality budget's recorded uses (item 119) | §8.8; §4.1, §12 | the base settings row's `view.zoomOutMarginStops` and the `perf.qualitySpend` rows (V11 §3.1, V11 §3.25.5, V11 §3.25.8) |

**Out of scope** (with the owner of each): the solver's scoring code and the relaxation pass (§4.7); item 110's
geometry — the levelling and the `RetainingWall` records, the raised parts, their course solver and generator, the
deck-plot cutter (base), the tiers (V02), the vaults and ruin monuments (V04), the epochs' raised-way pass and decline
(V06), the tools (V09); the island's underside, its shadow strip and its siting (V05); the epochs' use step and coverage
gaps reopening over time (V06, which reads these rows), the history replay's engine (V06 §3.20) and the wall transitions
(V06 §3.7.7); the village classes (V07 §2.4, cited; this volume fills their `villageForm` column for the town classes,
V11 §3.22); the port's adapter, the lookup chains and their SHAPES (V08); the room programmes and the crypt's plan (V03);
the composition rows and the crypt's basement ladder (V02, `composition.json`); the underground tables' SCHEMAS and every
stage that reads them (V04 — this volume writes the rows of four of them, V11 §3.23); the evolution tables (V06,
`tables/evolution.json`); the style sheets and palette values, the season, cover, `ice`, `snow` and decoration draw rows
(§8.2); the prices, stock and professions' content of `@plat/sim` (M4b, §10.3 — this volume gives their registry rows and
authoring plan, V11 §3.21.4); the screens of the tables editor and the siting panel (V09); the clerk's dialogue (V10).
The vocabularies (word lists and corpora) are authored at build time by V11 §3.20.6's plan; this volume fixes their
grammars and bars, never their words (§17.1).
