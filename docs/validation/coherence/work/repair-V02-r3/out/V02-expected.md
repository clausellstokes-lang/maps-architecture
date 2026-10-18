# Volume 2 — Stage 3: building composition at every scale, from a giant manor to a small hovel

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V2-buildings, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** `§n` and `II.n` are sections of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `Vnn §n` is a section of a design volume, this one
included; `item n` is an owner or amendment item (owner items 1–101, file g, file f 200–585; its home is §0.2's
landing row); `J-V2.n` is a decision of this volume (V02 §9), `J-VI.n` a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated; `X n` a row of this volume's hand-off list (V02 §13); research
files are named by file and section only.

## 0 In plain words

**What this stage does.** The base gives every plot a building with a simple outline: a rectangle, an L or T of
rectangles, a row house clipped to its plot, or a church or keep from a small set of templates. Stage 3 replaces that
outline maker with a **composer** that builds each building the way Fantasy Manor builds a manor — out of wings (long
roofed ranges), blocks (square pavilions standing a little proud of the wings), towers, a courtyard, a porch, dormer
windows and chimneys — and does it for **every** building on the map, not only manors. A hovel gets one short, low range
with a thatch-like roof and nothing else. A cottage may get a lean-to at the back. A comfortable town house gets a back
range behind its street front, dormers and a door hood. A rich merchant's house on a wide plot may get a hall with a
cross-wing at each end (the classic H plan), or three ranges round a forecourt. A great manor on a joined plot may close
four ranges round a courtyard, with a gate hall, a corner tower or two and a stair turret. An inn becomes a galleried
courtyard inn in a rich street and an L-shaped alehouse in a poor one. The building's class (hovel, cottage, house, inn,
manor …), how prosperous its spot is — smoothly, never by a switch — and its plot decide which of these it gets.

**How it fits the plot.** The composer turns the building to face its street, keeps it inside the part of the plot the
site plan gives it (never over the street, never over a neighbour), puts the main door on the street side (Fantasy
Manor leaves about one building in seven without a door — ours never does), and keeps towers from standing through the
middle of a wing. Sizes are in metres: a hovel's range is about 4 m wide, a manor's 7–9 m.

**What you see, and when.** At city zoom a building is its plan shape as a dark mass, as today — but the masses now show
courtyards, cross-wings and round towers, so a rich quarter reads differently from a poor one even from far away. Zoom
to a district and the roofs appear: ridges, hips, the valleys where wings meet, the cones of the towers, lit by the
moving sun. Click a neighbourhood (or let the view derive detail as you look) and its buildings open: dormers, porches
and chimneys arrive. Click one building and it is composed down to its rooms — the hall, the tower rooms, the gate
hall — and, with V03, its floor plan; a double-click zooms in until the plan is readable. Once generated, a building's
detail is kept; when something changes it (a new owner, a new use, a fire, the passing years) it is marked with a small
sign and redone at the next click, and whatever did not change stays exactly as it was.

**When a building changes use.** A house that becomes an inn is not torn down and re-rolled: the house's range stays and
the inn grows side ranges round a yard behind it; turned back into a house, the added ranges go again and the original
is exactly as it was. A manor that falls on hard times keeps its shell, but its great hall is no longer held fixed: the
families move in and divide it room by room (V03), and if it recovers the hall comes back exactly as it was. A brewer's
shop that grows into a brewery keeps its shop front and gains a yard behind; a business split into a workshop and a shop
has two ordinary buildings, and merging them back is one undoable step.

**Editing.** Everything is editable with the building tool: drag a wing's ends or width, add or remove a wing, a tower or
a back range, change a tower's shape, storeys or roof, set a porch (or a hood at a side door), add or remove dormers,
switch the hall, the gate hall or the chapel on or off and move their ends. Asking the clerk "why is this manor an H?"
gets the rule, the wealth level and the other shapes it could have taken. Each change is one undoable step that touches
only that building and its plot, and the map repairs around it. **The tool never says a plain no** (item 101 R2): a
request it cannot carry out as asked becomes the nearest thing it can do, and one short line says what it did — "put the
stairs inside" on a solid pyramid seals it instead, "remove the last wing" removes the building, a tower added beside a
stepped temple is built on the ground beside it. Only a fact SettlementForge sent and a lock you set are ever refused.

**Every kind of building has its rules.** The shapes are written once per kind of building — row house, shop, workshop
yard, tannery, inn, guild hall, parish church, cathedral, covered market, farm, barracks and the rest, about thirty kinds
— each at four levels of wealth, so every one of the roughly two hundred town trades, every village building and every
custom building SettlementForge sends gets a shape that fits its trade and its wealth. A few classes have their own
touches: the manor grows courtyards and towers, the longhouse runs down the slope with its byre at the bottom, the
watermill puts its wheel on the water, the windmill is a round tower with sails, the cathedral has twin west towers and
often a tower over its crossing, a market hall stands on an open arcade, a kiln is round, and landmark halls may carry a
small cupola. Bigger and richer buildings, and custom landmarks, are laid larger; a building that would not fit its size
budget steps down from a courtyard to a U, an L or a single range rather than overflowing.

**Small places are not grand (item 115).** In a thorp, a hamlet or a village, wealth shows as bigger houses, longer
ranges, more outbuildings, dormers, porches and chimneys and better roofs — never as a courtyard, an H or U plan, a tower
or a turret on a house. Only a village's one manor house, where there is a lord or SettlementForge names one, takes the
grand plans. A hall SettlementForge names, or a house you reshape by hand, keeps its full design, and the clerk says it
is grander than such a place usually has. A village that grows into a town builds grander from then on; a town that
shrinks keeps its grand buildings as they stand.

**Sun, crypts and digging.** Where a house has a free choice — which end its cross-wing goes, which way its yard opens —
it leans toward the sunny side (the owner's "more prosperous people would love more sun"), never turning away from its
street. Buildings' wings cast the town's shade at later epochs. The cathedral always has a crypt; on wet ground where a
crypt would flood, its choir is raised over a crypt that stays dry, as real cathedrals did. A new wing built over a
hidden cavern or ruin may break through into it. Catacombs are never made by a building: they lie under cemeteries
(V04).

**Stepped buildings, and buildings on bridges, piers and moles (item 110).** Some buildings are a stack of tiers, each
standing on the one below and set back from its edge: a stepped temple (solid rubble tiers, a great stair up the front, a
small shrine on top), a terraced palace (storeys on each terrace, flights of steps along the faces) and a tiered tower
(storeys shrinking as they rise, each with a skirt roof). Each tier casts its own shadow and can be given more or fewer
storeys; the stack can gain or lose tiers, change its shape, step, skirt roofs, which tiers are solid, its stair (or have
none, a sealed pyramid) or put a shrine on top, one undoable step at a time. A stepped temple's size comes from its
precinct and its first tier takes the proportions its stairs need, so the stack fits; its great stair is steep, as such
stairs were, and the summit stands a few metres back from the centre because every terrace in front holds a flight. When
the ground under a stack changes, the whole stack moves with it; a stack under construction rises tier by tier. These
shapes appear only where the settlement's culture builds them, never in an
ordinary European market town; an older civilisation's ruins underground may keep a stepped monument (V04 decays it).
Houses and stalls may also stand on a bridge, a pier, a quay platform or a mole: small and light — one or two storeys,
no cellar — lined along the deck's way, with a tower or fort at a mole's head where the map places one. If the deck
falls, what stands on it falls with it; rebuild the deck and new buildings may rise there. A chapel whose crypt
SettlementForge records is never put on a bridge: it stands on the bank. A quay built on the bank is ordinary ground,
cellars allowed where the ground is dry enough. When a viaduct or an aqueduct is built over a street, every house
standing where its piers or arches come down gives way to it; the spaces between the piers stay open.

**Arenas and terraces.** An arena is an oval: an arcaded outer wall of storeys and, inside it, solid banks of seating
stepping down to an open floor, entered through gate halls at the ends of its long axis. A house built against a
terrace wall stands on its own terrace, never floating up toward the terrace above.

**Ruins and disasters (items 123, 122).** A building left empty for years looks it, and once its floor plan has been
opened its roof shows holes exactly over the rooms whose roof has fallen in, and its outline breaks over a spill of
rubble exactly where an outer wall came down — the same holes and fallen walls the plan shows, because both read one
record of what has broken. As the years pass more breaks, never moving; a repaired roof shows its patches. When
SettlementForge reports a disaster, every building of the neighbourhoods it struck looks ruined while it lasts —
blackened after a fire — until its rebuilding begins, when the scaffolding shows instead; when the disaster ends it
looks as before, unless the following years really left it in ruins. Neither ever changes a building's shape, size or
data.

**Speed.** Building the shapes for a 50 000-person metropolis adds about three hundredths of a second to the first map
(about 3 % of its time); the roof detail of a neighbourhood arrives within about a tenth of a second of the click.
Every wait you sit through once — a new map, an export with every building's detail, an upgrade — ends within ten
seconds at every size up to the largest metropolis (item 119), and dragging, clicking and editing stay as quick as
before.

**What it does not do.** Materials change only colours and textures, never shapes (owner, 2026-09-26). Fantasy shapes
(octagonal and star-shaped courtyard manors, as Fantasy Manor makes them) exist but are rare by default and kept for the
classes where they make sense; a Fantasy Manor look-alike setting turns them up to Fantasy Manor's own mix. Floor plans
are V03's, neighbourhood close-ups V01's, how buildings change over decades V06's.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1a Scope

This volume builds **stage 3** to build depth: the `BuildingGenerator` registration that replaces the base's
`OutlineBuildingGenerator` (§2.6 *The stage-3 hook and its cost contract*). It settles:

1. **The massing** — stage 3's `outline()`: an eager, per-building step at S11 that composes the building's plan from a
   path of wings (ranges), blocks, towers, a back range and a court, fitted to the slot the site plan gives it, oriented
   by its frontage, in metres (V02 §3.2–§3.5). Its output is the base wings (`Building.wings`), so the footprint, the
   heights, the shadows, the 3-D export and the capacity all read it (model data, in the digest).
2. **The composition** — stage 3's `compose()`: the lazy `wings` and `rooms` rungs — dormer rows, the porch, the
   composed towers, the courts and the composer's principal rooms (hall, gate hall, tower rooms, chapel) — whose draws are
   keyed per wing so what is kept stays (V02 §3.6–§3.8).
3. **The roofscape** — one derived roof plan per building, resolving every joint between wings (mitre, valley, wall,
   gable, hip) and every tower, read by the drawing, the light pass and the 3-D exports (V02 §5.2).
4. **The diversity ladder** — per class and per prosperity band, as data tables (`composition.json`), from a hovel to a
   giant manor, interpolated along the prosperity value (item 19) (V02 §3.3, V02 §3.10).
5. **Mutation** — item 18 applied to wings: keep what fits, add, remove, by path growth from the kept ranges (V02 §3.9).
6. **Elaboration by click, editing, rendering, exports, budgets at METROPOLIS scale, tests, parity with Fantasy Manor,
   and the build plan.**
7. **The owner's rules of 2026-09-28 at the building** (file g; V02 §3.14): the building side of sunlight (item 102: the
   wings as epoch casters, the sunlit choice), custom institutions (item 104), split works-and-shop sites (item 105 (h)),
   the institution ladders (item 108), and digging down, crypts and the catacomb boundary (item 109 (j), (k); J111) — each
   only in its building part; g's base mechanisms are the base's.
8. **Item 110 at the building (V02 §3.15–V02 §3.17):** (c) **stepped massing** — the `stepped` family of stacked tiers laid
   by the pure construction `layTiers` behind the exported `massStepped`, which the base outline builder (from M3a; item
   110 (e)'s second fixture needs a stepped temple there) and stage 3 share byte for byte, and which V04 also calls for a
   ruin's stepped monument; solid and storeyed tiers, stairs up the faces, a flat, shrine or roofed top; one shadow per
   tier; the `tiers` edit with a named bend for every structural limit; one building-level datum pass (`rebaseStack`) on
   every re-basing path; a stack order under Works; pent band facets; a solid stack's entrance rule; the claim-sized
   band; and the non-fantasy `ovalCourt` family for the fixture's arena; (d) **buildings on moles, jetties, quay platforms
   and bridge decks** — the `@deck` rows, the deck budget, the deck's datum, no basement; and the building side of (a)
   retaining walls, (b) raised ways (generated at CITY and METROPOLIS, declared at TOWN, added or removed by the user)
   and (e) the second known-city fixture.
9. **Items 123 (d) and 122 at the building (V02 §5.7):** the exterior's damage — a decayed or ruined building's roof
   holes and outline gaps drawn from its plan's damage layer, the same elements at the same level as the plan (V03), and
   its patches after a repair — and the ruined look of a disaster's buildings, item 123's damage at the look's level on
   every building of the neighbourhoods the disaster strikes; looks only, never a wing, a record or a hash.

### 1b The wiring table — every new piece, what feeds it and what it feeds

Every piece below has a named producer and a named consumer; the base hook column names where it plugs in. The file f
items cited are applied to the base (their text is the base section's).

| new piece | kind | fed by (producer; the dossier or derivation row where a fact comes from one) | feeds (consumer) | base hook |
|---|---|---|---|---|
| `ComposedBuildingGenerator.outline()` (the massing) | stage function | `BuildingInput` from S11 (slot hint, access, ctx, class, drift); `CompositionRow` at the manifested band (§2.5 `Plot.builtBand` → §4.11's floor rule); `ClimateTable` pitch; `massing` stream | `Building.wings`, `Building.massing`; S11's footprint insertion and first carry, `deriveEntrances` (entrance hint), `deriveBase`, the basement decision, the capacity function, the yard partition (court typing); §8.4's casters; 3-D exports | §2.6 `BuildingGenerator.outline`; §4.7 S11 |
| `BaseWing.role`, `BaseWing.key`, `Building.nextWingKey` | persisted fields | the massing; `setMassing`; the mutator's wing step | the composer (per-wing keyed draws), the mutator (match by role), §6.3's anchors, the roofscape (joint priority), exports (role names), edits (`setAttr` paths by key), V01's `hatched` stack ties by wing key (V01 §5.1.3) | §2.6 `BaseWing` (item 216) |
| `Building.massing` (`MassingRef`) | persisted field | the massing; `setMassing` `family`; the mutator | the mutator (source family), `deriveEntrances` (entrance wing and side), the JSON export, the report, the clerk's reader | §2.6 `Building` (item 217) |
| `DriftBounds` | type (declared at §2.6) | an assignment (§7.7) | the massing's family filter and size clamp; the mutator's adapt bounds | §2.6 `BuildingInput.drift`; §7.7 `Assignment.drift` (item 385) |
| `composition.json` (`CompositionRow`, `MassingFamilyRow`, `WingRoleRow`, `MassingGrowthRow`, `TowerShapeRow`, `PorchKindRow`, `DormerKindRow`, `RoleKeyRow`, `ClassFamilyRow`, the constants row) | tables | `@plat/tables`, the override layer, the `FM` preset, the corpus phase (§13.9) | the massing, the composer, the mutator, the roofscape, `facadeBays`, §8.10's decorative chimneys; V01's entrance reserve (`PorchKindRow`'s `widthM`, `depthM`, `outside`, shipped from M3a-V2; V01 §3.8.2 step 5, V01 §3.8.3's digest) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `ComposedBuildingGenerator.compose()` (the composer) | lazy stage function | the base wings, the entrance set, the plot and yard parts, `CompositionRow`, `compose.*` streams | `Composition` (the `wings` and `rooms` rungs), the elaboration cache, the building-band drawing, the plan rung (fixed rings, dormer rows), exports with compositions | §2.6 `BuildingGenerator.compose`; §4.1 trigger policy; §2.8 record |
| `Wing.base`, `Wing.dormerRows` (`DormerRow`), `ComposedTower.base`, `Porch.kind`, `Composition.row`, `.grammar`, `.secondaryPorch` | lazy record fields (stored when edited) | the composer; `setComposition` | the roofscape and its paint programs, the plan rung (edited dormer rows fixed), glTF, CityJSON and JSON exports, the carry (rooms only) | §2.6 `Composition` (items 218–220) |
| V11's `HeightsRow` with the columns `attic`, `parapetCm`, `towerStoreyCm` | table contract (V11's rows and values; V02's reading rule) | V11 §3.6.4 (table `heights`, keyed by template family) | M11's eave, ridge, tower storeys and spires; `attic` gates dormers (V02 §3.7); `parapetCm` on flat roofs | §10.2 `DesignationTemplateRow.heights` (items 435, 427) |
| the resolution chain; `composition.roleKeys`; `composition.classFamily`; the family, class-override, role and default rows; the arrangement law | stage logic and tables | `DesignationTemplateRow.composition`, `BuildingClassRow.templateFamily` (item 432), the compiled template's `arrangement` and `structures`, V07's `v.` classes (V07 §2.4; V11 §2.9) | M1 (every slot's row), `MassingRef.row`, `Composition.row`, T-V2-33, the why provider; V03's A1 (3) and slot order, which read `composition.classFamily` for a `v.` key without a programme row (V03 §2.4; J-V3.111) | §4.7 S11; §10.2 |
| the rung ceiling on a dwelling's row (item 115) | stage logic, table read | V11 §3.25.4's `grandeur.ceiling` row of the rung in force (the document's; at an epoch the fold's, V06 §3.8.5) and its `settings.grandClasses`; the use's class and its profile family; S11's capped key in `BuildingInput.compositionRow` | M1's capped row (M3–M8's families and their tower, turret and gate-tower cells), `MassingRef.row`'s `~<RUNG>`, a standing building's re-derivations, the why fact `massing/ceiling`, V09 §4.21.5's beyond-tier line, T-V2-55, T-V2-58 | §4.7 S10b *Class mix* (3), S11 *Footprints and heights*; §10.2 *Grandeur ceiling* |
| M3's budget test and M10's slot band | stage logic | V11's `footprintM2` (p10/p90 or the 0.7 / 1.45 ratios), the role table's `footprintShare`, `LadderStepRow.sizeFactor`, `buildingScale`, the significance shift | M4's family draw, M10's shrink and reverse lattice, the report's `overBudget` | §4.7 S11 |
| `CompositionRow.axis` (`fallLine`, `water`), `MassingRef.low` | table cell, persisted field | the row (V07's longhouse rule; the mill and landing rows; `needs.runningWater`, V02 §3.14.6); the terrain sampler; the water faces | M2's frame; V03's byre end (`low`); the why provider | §2.6 `BuildingInput.terrain` |
| the sunlit choice (`sunBias`) | stage logic, constant | §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50) — the latitude item 102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg`; the constants row; the presets | M5's mirror coins; T-V2-37; the why provider | item 102 (d) |
| the building casters (each wing's prism) | derived | the massing's wings and heights | item 102's epoch daylight raster (V06 §3.4, per wing); §8.4's shadows | §8.4 casters; §4.11 |
| attached structures (M8b; `BuildingInput.attached`) | stage logic, input field | V11's structures through `roleKeys` (`attach: 'main'`); S11's drawn counts (item 304) | the main building's wheel, church porch and west towers; the forced tower mill; the absorbed ranges' budget | §4.7 S11 (item 304) |
| `MassingRef.segments`, `.cupola`, `BaseWing.arcade` | persisted fields | M5 and M13 (`segments`), M12 (`cupola`), M11 (`arcade`); every `setMassing` op and the mutator | the parity harness, the report, the why provider; the roofscape and exports (`cupola`); the drawing, exports and capacity (`arcade`) | §2.6 `Building`, `BaseWing` (items 216, 217) |
| wing references by key; the canonical wing order | contract | every wing writer (massing, mutator, `setMassing`, migration) | the carry, the plan's re-cut, §6.3's re-match, the clip order; T-V2-34 | §2.6 (item 225) |
| the significance shift | stage logic | the use's σ (§4.5 (1), with V11 §3.13's landmark and `economicWeight` factors; DR24 with item 104 (a) (5), (7)) | every geometry cell and M10's budget of that building; T-V2-38 | §4.5 (1) |
| split and ladder composition (V02 §3.14.3–V02 §3.14.4) | stage logic | `Use.branchOf` and V11's `split` families (item 105 (h)); `LadderStepRow` (item 108) | the two buildings of a split site; members and SIZE buildings; W3b's arrangement change; T-V2-39, T-V2-40 | §4.7 S11 designation mutator |
| the crypt seed wings, the raised crypt's lift, the dig floor, the W6 dig trigger | stage logic, persisted heights | `cryptSeedWings` (template parts, a stack's tier 0, the east-most range); V03's stair-entered reading (V03 §3.7.4), which gives the ground wings over the basement's ring the lift and the half raise act on; V11's `crypt` column (item 436) through item 238; the terrain gate; V04's void systems; V11 §3.23.7's `DigRule` rows (the dig chance) | §2.6's basement function (`Basement.crypt`, `kind 'raised'`, item 226); V03's choir stairs; V04's access draw and item 109 (k) (5)'s obstacle test | §2.6 *Basements*; II.7.3; item 109 |
| `setComposition room`, `moveTower { shape }`, the secondary-porch op | edit kinds | T9's handles, the clerk, a skeleton file | the stored composition, the `rooms` rung, §7.3's orphan table | §7.1 (item 351) |
| the `WhyProvider` for `building` (`massing`, `wings/<key>`, `composition`) | interface implementer | the committed massing, M3's and M8's tests re-run without draws, the event log | V10's oracle and clerk; V09's "why?" panel; T-V2-43 | V10 §3.9 (item 270) |
| `fantasyShapes`' control row | control | the recipe | M3's family filter; V09's advanced panel; `@plat/docs` | §7.8 (item 402) |
| `@underground` rows, `BuildingInput.layer` | table rows, input field | S11's plot layer (II.7.3, II.7.5, item 109 (j) (4)) | M1's key suffix, M0 (f) | §2.6 `BuildingInput` (item 303) |
| the naming slice `building.wingRole` | table (V11's naming tables) | V11 (V02 X6) | the wing hover label (V02 §5.4) | §10.4 |
| roof decorations `sails`, `smokeStack`, `stepStones`, `wallGrass` | §8.10 rows (cells in V02 §5.3's style table) | the massing (sails; the class's `emits.smoke`); the `FM` look | the tile rasteriser | §8.10 |
| options `fantasyShapes` (a recipe parameter) and `massing.composed` (a table option, `extension` over both) | model options | the recipe and §7.8's control; the preset resolution (§7.6) | M3's family filter; V02 §3.1's switch to the base outline under `MFCG` and `FTG` | §7.8, §7.6 |
| the composer's room roles `hall`, `gatehall`, `chapel`, `towerRoom` | room rows | the `rooms` rung (V02 §3.8) | the plan rung's programme and its arches (V03); §8.5's room labels | §2.6 `Composition.rooms`; §10.2 `RoomProgramRow` |
| `RoofSpec.kind 'shed'` and `RoofSpec.high` | model field values | the massing (back ranges, lean-tos, outshots, stairs) | the roofscape, §8.2's roof programs, glTF and CityJSON roofs | §2.6 `RoofSpec` (item 222) |
| `roofscape(building)` | derived function (never stored) | base wings, heights, roofs, towers; the composition's dormer rows and porch where present; `valleyReach` (float mode) | §8.6's roof construction `roofscape`, §8.4's surface layer and casters' roof faces, glTF, OBJ and CityJSON LoD2.2 roofs, B-ZOOM | §8.6 (item 406) |
| `exteriorDamage(doc, b, view, opts)` and its `ExteriorDamage` (V02 §2.4) — the exterior's damage (item 123 (d)) and the ruined look of a disaster's buildings (item 122) | derived function (never stored), run in the generation worker by S14 (V02 §5.7 (8)) | V06's `decayLevel` for the building's lineage at §2.9's `week`; the plan in force — current or stored, in the elaboration cache — under its damage layer (V03; §2.6 step 7; §6.3's `plan.damage` with V11's ranges; its repaired elements by V06's per-element `decayPeak`, read through V03 §5.6 (2) (b)); the disaster looks drawn in the view over the building's unit (§2.7's `ConditionOverlay` and its reader rule; §7.7's DR44 and its admission at the view's knowledge key, `ViewOpts.viewAs` lowering it; §10.2's `disaster` row and its `lookLevel`, and `previewSeverity`; §2.9's `crises`; V01's `disasterSource` — its `pattern` — and `disasterDistricts`, V07's ends at THORP, HAMLET and VILLAGE; V06's `crisisLookYields`, false for a preview) | the building's damage marks (V02 §5.7 (8)) — in its district's group of the display list or a `DisplayDelta`, re-emitted for exactly the buildings whose marks change — read by V02 §5.7's drawing in the tile rasteriser (the `roofscape` program's holes and patches, clipped to their wing's facets, the outline's gaps and rubble, the look's tone and dash, the porch, cupola and roof-decoration draws over a hole) and by the SVG and PNG writers from their transient lists; the SVG semantics `sem.building.roof.hole` and `sem.building.rubble`; V02 §6.6's memo; T-V2-59, T-V2-60 | §8.1 (S14, its `group`, the `DisplayDelta`, item 7's week re-emission), §8.9 (the worker boundary), §8.2 (the `states` rows; the crisis look rows), §8.6 (the damaged plan, item 123), §8.8 (the tile key) |
| `valleyReach(X, Y, mode)` — the plan reach of the valley where wing X's ridge meets wing Y's roof | derived function, `@plat/plots` | the two wings' heights and roofs | `facadeBays` (integer mode) and the roofscape (float mode) | — (V02 §3.7) |
| `facadeBays(wing, side, bayM)` | derived function, in `@plat/plots`, re-exported by `@plat/buildings` (item 505) | a wing's ring, the `bayM` column, `valleyReach` (integer mode) | dormer positions (V02 §3.7), the plan rung's windows (V03), lit windows when no plan exists (§8.4's `live.windows`), decorative chimneys (§8.10) | §2.6 plan step 6 "one per façade bay" (item 406) |
| `resolveEnds(building)` | derived function | base wings, heights, joints | the roofscape; the drawing of ridge ends | — (V02 §5.2) |
| the mutator's wing step (`mutateMassing`) | stage function | `MutationRecord` steps of §4.7 S11; `MassingGrowthRow`; `siteplan.mutate` stream | kept, adapted, added and subtracted wings; `MutationStep` of part kind `wing`; the composition's per-wing keep; Works stages (V06) | §4.7 S11 designation mutator steps 1–7 |
| concerns `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` | stream registry entries | §6.1's mixer | the massing and the composer | §6.1 registry (item 341) |
| anchors for base wings and composed parts | identity rows | §6.3's re-match | edits by key after a re-derivation; the mutator's keep | §6.3 anchor table (item 346) |
| events `setMassing`, `setComposition` | edit kinds | the canvas T9 `shape` handles, the clerk's tool API, a skeleton file | S11's operator on the plot (massing), the stored composition, `carryWings`, the capacity re-homing, the elaboration record | §7.1, §7.4 (item 351) |
| the `FM` building-scope parity preset | preset | `composition.json`'s `presets.FM` entries (the measured-rate ones set by V12's `reference` run against Fantasy Manor, V12 §3.7.2 (3)); V11 §3.24.0's item-110 chance and offer cells' `presets.FM` entries, 0 | the free-frame parity harness (V02 §7.4), the owner's stage-3 panel, a user's "Fantasy Manor look" | §7.6 (item 376) |
| the register entries of `composition.json`'s calibratable cells | calibration register entries | the seat landing M3a-V2, M6a, M6b and M6c (V02 §8.3, V02 §8.5), from this volume's defaults, tests and fallbacks (V02 §3.10, V02 §6, V02 §8.2) | `plat calibrate register --check` (T-V12-20) at each exit; V12's tuning, fallback and reference runs (V12 §3.7) | V12 §3.11; §13.9 |
| the `BenchBarDef` registrations of V02's eleven bars (T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51) | bar registrations (`@plat/testkit/bars`) | the seats landing M3a-V2, M6a, M6b and M6c, each in the change that writes the register entry naming the bar (V02 §3.10.10; V02 §7's checks as their `run`) | `plat parity`'s `bar.` rows (V12 §1b); the register lint and the exit rule (V12 §3.11, T-V12-20) | V12 §2.1 (`BenchBarDef`, `bar.<barId>`); §13.8's CI tiers |
| the NoOpPin registration of T-V2-50 (item 110's off form) | pin registration | the seat landing M3a-V2 | V12 §3.7.8's pin engine, reading V11 §3.24.0's off form | §13.2's convention; V12 §3.7.8 |
| the rung-pin registration of T-V2-58 (B-MASS on `item115.ceiling`; item 115 (f)) | pin registration | the seat landing M6a | V12 §3.7.8's pin engine, its `rungScope` kind (V12 §2.13) | §13.2's convention (T115-4); V12 §3.7.8 |
| the `item123.damage` registration of T-V2-59 (d) (the damage sub-fixture's exteriors; item 123) | pin registration | the seat landing V02's item-123 exterior step (M6b, V02 §8.6) | V12 §3.7.8's pin engine, its `entityScope` kind (V12 §2.13) | §13.2's convention (T123-7); V12 §3.7.8 |
| the `item122.crises` registration of T-V2-60 (c) (the look fixture's exteriors; item 122) | pin registration | the seat landing V02's ruined-look step (M6b, V02 §8.6) | V12 §3.7.8's pin engine, its `view` kind (V12 §2.13) | §13.2's convention (T122-1, T122-7); V12 §3.7.8 |
| F-MASSING, F-COMPOSE | failure classes | the massing's and the composer's checks | the generation report (massing), the view report (composition) | §5.2 (item 328) |
| paint programs `roofscape`, `dormer`, `porch`, `towerRoof`, `stairFlight` and the style cells of V02 §5.3 | style programs and cells | the roofscape, the composition, `stairTreads` | the tile rasteriser; the SVG writer | §8.2 (item 406) |
| JSON `massing` and `composition` blocks; glTF composition meshes; CityJSON LoD2.2 roofscape, `BuildingPart`, `BuildingInstallation`; `on`, `solid`, `stack` | export content | the model and the elaboration cache (or a derive-on-export pass) | files | §11.1 (item 449) |
| `@plat/buildings` | package | `@plat/kernel`, `model`, `tables`, the `BuildingGenerator` interface and the stack helpers in `@plat/plots` | the `StrategyRegistry.building` entry `composed` | §14 (item 505) |
| the free-frame parity harness `plat/bench/fm-parity/` | test instrument | the `FM` preset; `baselines.json` rows from `captures/manor/README-frequencies.md` | §13.5's Fantasy Manor rows; the owner's stage-3 panel; V12's `reference` run against Fantasy Manor, whose fixture it is (V12 §3.7.2 (3)) | §13.5, §13.6 (item 522) |
| `layTiers` — the tier geometry, ST2–ST7 | pure function, `@plat/plots` | `TierInput` (V02 §2.6) | a `TierLay` or a typed `TierFailure` → `massStepped` (ST8 and the attempts), the `tiers` op (V02 §4.6), the mutator's anchored lay (V02 §3.15.5), V04's ruin stage (V02 X19) | §2.6 base outline builder (item 229) |
| `massStepped` — the stepped branch of the massing | exported function, `@plat/plots` | `BuildingInput`, the `CompositionRow`, the bands; `slotBand`; `drawTiers` on `massing` indices 8–9; the attempt streams `massing/attempt=a` | `Building.wings` and `Building.massing` (with `stack`) of a stepped building — from M3a through the base outline builder, from M6a through stage 3's M5; T-V2-46 | §2.6 base outline builder (item 229); §4.7 S11 |
| `slotBand` — M10's band as one formula | exported function, `@plat/plots` | the template's `footprintM2` (or `claimShare × area(H)` where the template is claim-sized or the row carries `claimShare`; on a deck the deck row), the role table's shares, `buildingScale`, `sizeFactor`, the significance shift (V02 §3.2 step 3), the drift's `areaPct` | M3's budget test, ST0, ST8, M10 | §4.7 S11 |
| `drawTiers` — ST1 as a function of two streams | exported function, `@plat/plots` | `TierCells` at the band and the storey heights; two `Rng`s (`massing` 8 and 9; `siteplan.mutate` for a mutation; V04's ruin stream) | the `TierDraws` list `layTiers` reads | §6.1 |
| `TierFailure` | type | `layTiers` (ST3's exhausted stair fallback, ST6's checks) | `massStepped`'s M14 loop; the `tiers` op's bend; the mutator's degrade; V04's ruin stage | — |
| `TierCells.heights`; `CompositionRow.claimShare`; the constants `claimLo`, `claimHi` | table cells | `composition.json` (V02 §3.10.9) | `layTiers`' storey heights for a ruin's shrine (V04 passes them); `slotBand` | §7.6 |
| the stack migration row | migration rule | the document loader | `MassingRef.stack` re-derived from the wings of a stepped building that lacks it; then the `tiers` op, the why facts, the JSON export | §7.5 |
| the stair form `none` and `MassingRef.stack.grade` | persisted values | the bends of V02 §4.6; a skeleton file line; `drawTiers` (the grade) | ST3, ST5, ST6, `stairChain`, `landingSide`, the entrance hint; the `tiers` op's re-lay (the grade); V03's `W_TIER_UNREACHED`; exports | §2.6 `MassingRef.stack` (item 217) |
| the bends of V02 §4.2, V02 §4.3 and V02 §4.6 — `bend.tiers.stepped`, `.none`, `.axial`, `.internal`, `.count`, `.step`, `.form`, `.top`; `bend.tier.height`; `bend.stack.groundWing`, `.roof`, `.base`; `bend.deck.single`, `.floors`, `.basement`; `bend.building.remove`; `bend.row.plotLine`; `bend.wing.grow`; `bend.family.nearest`; `bend.room.passage`, `bend.room.host` | edit results, each with its one-line words | V02 §4.2, V02 §4.3, V02 §4.6; V03 §4.2 (`bend.deck.basement`: a cellar asked for on a deck over water goes to the nearest ground building of its plot group, else its block, else the nearest building on the ground) | V09 §4.9's catalogue, one row per id with its words and buttons; V10's clerk, which words each bend through V09's rows (V02 X22); the why provider (`massing/bend/<id>`) | item 101 R2; §7.1 |
| `rebaseStack` — the building-level datum pass | derived function, `@plat/plots`, built at M3a-V2 | the ground wings' `levelledGroundCm` samples (with item 231's wall-side reading) through its `ground` parameter, which each re-basing path builds from its document and the plot's arena key; the deck's surface; a kept user `baseCm` of a ground wing; the crypt lift and the half raise | every stacked wing's `baseCm`, every stair's `ridgeCm` and `stairSteep`, `Building.heights` (the envelope, `floors`) → §8.4's casters and caster ceiling, V05's clearance (V02 X20), V06's shade mask, the 3-D exports | §2.6 datum (item 370); §7.3 (a) 4; §7.4; the carry's rule (2) |
| the stack order under Works | derived rule in `heightsAt` | §4.11 step 8 (item 318): the stack's courses, `on`, `solid` | §8.4's casters at a stage, §11.1's 3-D export, V06's Works (V02 X23) | §4.11 |
| the pent band facets | roofscape rule | a pent wing's ring and the ring of the wing standing on it | §8.4's surface layer and casters; glTF, OBJ and CityJSON roofs | §8.6 (item 406) |
| a solid stack's entrance and plan root | base rule | §2.6 *Entrances* rule 5 (item 230); ST7's hint | V03's plan root at the first landing door (V02 X18); T-V2-45 | §2.6 |
| the sibling-disjointness check | invariant | ST6; item 333 in the carry check | the carry's halving; F-REDERIVE; T-V2-44 | §2.6 rule 4; §5.3 |
| chimney hosting on a stack | draw rule | V02 §3.7's decorative chimneys; the roofscape reading `Chimney.column` and `Chimney.levels` | §8.10's tile draw; V03's carried stacks | §8.10, §8.6 |
| the `tiers` op and its fields | edit op | T9's tier controls (V09, V02 X21); the clerk (V10, V02 X22); a skeleton file | the stack's re-lay; undo; the why facts | §7.1 (item 351) |
| `terrace.wallBandCm` and the wall-side sample | base rule, constant | §2.6 datum (item 231) with item 110 (a)'s `RetainingWall`; the constant's cell (V02 §3.10.9) | the ground wing's datum sample near a retaining wall — `deriveBase` and `rebaseStack` (1); V03's walk-out reads its own band, 2 × `cellar.insetCm` (V03 §3.7.1), never this constant | §2.6; item 110 (a) |
| `levelledGroundCm(doc, key, p)` — §4.7's levelled-ground reader (item 309) | base reader, consumed here | S10 and S11's levelling (item 110 (a)'s platform datum of a levelled plot, block or ward), else S1's raster with the T2 terrain strokes | `deriveBase` and `rebaseStack`'s ground wings (items 370, 231; V02 §3.15.2 (1)), and through them the dig floor (V02 §3.14.5 (a)); the basement gate's fall (§2.6's skirt facts); the raised crypt's lowest sample (V02 §3.14.5 (d)); T-V2-51 (c) | §2.6 *Heights and the ground datum*, *Basements*; §4.7 S10–S11 (item 309) |
| `deckOk` per use (the crypt binding) | placement constraint | V11's `deckOk` (V02 X16); V04's crypt records | S10b's placement; T6's landward bend; the mutator's relocation (§10.3) | §4.7 S10b |
| the family `ovalCourt` (`massOval`, `@plat/plots`), the `arena` family row, `caveaM` | family, function, table row and cell | `composition.json`; the base outline builder from M3a (item 229) and M5 from M6a call `massOval` | M3–M13; the roofscape; V03's plan of the outer ring; V12's fixture bars (V02 X25); V11's arena plot (V02 X27); V01's hood-pin sites (V01 §3.8.2 step 1: no pin on the arena floor, the `court` yard part of item 303's hole sentence) | §7.6; §4.7 S11 |
| `vaultClamp` and its constant `vaultClampCm` | clamp, constant | `composition.json`'s constants; V04's chamber ceiling (V02 X29) | M11 on the underground layer | II.7.6 |
| `DeckContext` (with `landmark`) | input field (declared at §2.6) | S11, from the deck-plot record (`Plot.deck`, its `landmark` flag; item 246) | M1's chain and `@deck` suffix; M10's deck band or the landmark's own rows; M11's storey cap; `deriveBase`'s deck datum (item 370); the basement gate (item 305); the dig floor (V02 §3.14.5) | §2.6 `BuildingInput.deck` (item 305); §4.7 S11 |
| `BaseWing.on`, `BaseWing.solid` | persisted fields | `layTiers` through the massing (ST7), the `tiers` op, the mutator's stepped rows | `deriveBase`'s stacking (item 370), `storeyRange`, the capacity (item 371), the roofscape's occlusion and order, the casters, the carry check (item 333), exports, V03's plans of tiers (V02 X18), V01's `hatched` stack order by `on` depth and tier shadows (V01 §5.1.3; V02 X24) | §2.6 `BaseWing` (item 227) |
| the roles `tier`, `shrine`, `stair`; the family `stepped` | enum members | the massing | `WingRoleRow`, the roofscape, `building.wingRole` labels, exports, the why provider | §2.6 `WingRole`, `MassingFamilyId` (items 216, 221) |
| `MassingRef.stack` | persisted field | ST7, the `tiers` op, the mutator | the `tiers` op's re-lay, the why provider, the JSON export, the report | §2.6 `MassingRef` (item 217) |
| `CompositionRow.tiers` (`TierCells`) and the rows `stepped-temple`, `terraced-palace`, `tiered-tower`, `stepped-monument` | table cells and rows | `composition.json`, reached by name from V11's specialisations (V02 X17) and by V04 (V02 X19) | `layTiers` (ST1–ST8), M3's stepped test, the load checks (V02 §3.15.4) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `storeyRange`, `deckLevel`, `stairChain`, `landingSide` | derived functions, `@plat/plots`, built at M3a-V2 | the wings with `on` and `solid` | the capacity and `Storey.wings` (item 371), `deriveBase` (item 370), V03's levels and landing doors (V02 X18), V03's eager facts at M3a — `ground(b)` and `floorCm` (V03 §3.3), `basementDoor(b)` and `stackAccessDoor(b, a)` (`stairChain`: the stair wings, stair 0 and its approach strip; V03 §3.7.1, V03 §3.7.2 (1)) — and through them V01's entrance reserve; T-V2-44, T-V2-45 | §2.6 capacity, `Storey` |
| stair 0's **approach strip** | derived region, never stored (V02 §4.6 (4)) | `stairChain`'s stair 0 with its ring and `RoofSpec.high`; the main entrance under `internal`; the constant `landingM` | V02 §4.6's ground-wing placement (`addRange`, `addTower`, `backRange`); V03's `basementDoor(b)` rule 2 and `stackAccessDoor(b, a)` (V03 §3.7.1, V03 §3.7.2 (1)) | §2.6 `Building` (the stack's wings) |
| the stack's heights envelope | derived rule in M11 | the stacked wings' heights | `Building.heights` → §8.4's caster ceiling, V05's clearance (V02 X20), exports | §2.6 *Heights* |
| the deck budget (read) | table contract | V11's table `deck` by deck kind × band (V02 X16), registered from C0 (V11 §2.1's empty-table rule): no deck plot exists without its row (V02 §3.16 (3)) | M10 and M11 on a deck plot; `bend.deck.floors` (V02 §4.6 (5)); the why provider | §10.2 (V11) |
| the `@deck` rows | table rows | `composition.json` | M1 and M5–M12 on a deck plot | §7.6 |
| the paint program `stairFlight`; the roofscape's stack order | style program, draw rule | the roofscape; `stairTreads` | the tile rasteriser, the SVG writer | §8.2 (item 406), §8.6 (item 419) |
| constants `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare`, `riserMaxCm`, `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | table cells | `composition.json`'s constants row (V02 §3.10.9) | `layTiers`, `massStepped`, `massOval`, the roofscape, `stairTreads`, the exports, stair 0's approach strip (`landingM`) | §7.6 |
| `stairTreads(w)` — the one tread law of a stair wing (J-V2.90) | derived function, `@plat/plots` | a stair wing's `ridgeCm` (its rise, kept true by `rebaseStack`), its ring and `RoofSpec.high` (its run); `riserMaxCm` | `stairFlight`'s tread lines (V02 §5.6), the glTF, OBJ and CityJSON stair solids, the per-wing constructions' treads (item 419), V01's stair-flight hatch (V01 §5.1.2), V03's exterior flights (V03 §5.1) | §8.2, §8.6 (items 406, 419); §11.1 |
| `cryptSeedWings(b)` (J-V2.92) | derived function, `@plat/plots` | `BaseWing.partName` (item 234), a stack's tier 0, the wings' roles, rings and ridges | §2.6's basement function (item 238's crypt ring; item 226's lift and half raise act on the wings over the basement's ring); V03's crypt placement (V03 §3.7.4 step 1); T-V2-36, T-V2-53 | §2.6 *Basements* (items 226, 238) |
| the half cellar's raise (J-V2.91) | base rule, a datum term | §2.6's terrain gate choosing `half`; `cellar.depthCm`; for a crypt-only basement the wings over the crypt's ring (V03 §3.7.4) | `deriveBase` and `rebaseStack` (1) on every re-basing path → those wings' `Heights.baseCm`; the basement floor at the datum less half the depth; the dig floor (V02 §3.14.5 (a)); V03's storey datum and its half cellar's light windows (V03 §3.3, W2); T-V2-52 | §2.6 *Heights and the ground datum*, *Basements* (item 226) |
| `BaseWing.partName` | persisted field | the base outline builder's templates, passed through by M0 (d), kept by every V02 wing writer (V02 §2.1) | M8 (e)'s crossing tower; `cryptSeedWings`; V03's A5 (e) room placement; the why provider | §2.6 `BaseWing` (item 234) |
| the family rows `burial-ground`, `fort`, `arena` and the role rows `charnelHouse`, `lychgate` (J-V2.88) | table rows | `composition.json`; V11 §3.6.1's 35 template families and their structure names | M1's chain for the classes `cemetery`, `fort` and `arena` and their structures; `roleKeys`; M8b's absorbed arena gates; T-V2-33 | §7.6; §10.2 |
| the stepped specialisation a bend to `stepped` writes (J-V2.94) | edit side effect | V02 §4.6 (1)'s bend and `setMassing { family: 'stepped' }`; V11 §3.24.3's rows for the use's culture and class | the use's `siting.declared` `use:` row cell `specialisation` (V11 §4.2) → `Use.specialisation` → V11's composition and heights replacement, V03's plan rows (`for.use`), V10's why | §7.6 (V11 §4.2's document-only table); §7.1 `EditBase.group` |

**The dossier facts that reach a building's shape** (item 20 (h): the dossier says what exists; its shape is the map's
construction). Every record here has the fact tier `derived` (§2.8's `factTier`), or `declared` where an edit set it.
Each dossier fact that shapes the massing, with its field, its derivation row (§7.7) and the V08 and V11 rows that carry
it:

| dossier fact (SettlementForge field) | derivation row | carried by | reaches the massing as | read by |
|---|---|---|---|---|
| an institution's kind and tier (`institutions[].kind`) | DR24 (the class); DR9 (a ladder's members and SIZE step) | V08's kinds map → V11 §3.11; item 108's `LadderStepRow` | the class (for a ladder the member class or the SIZE factor) | V02 §3.2 step 1; M10 |
| a custom institution's scene archetype (`custom.sceneProfileId`) | DR24 (item 104 (a) (2)) | V11 §3.13.2's archetype row | the class | V02 §3.2 step 1 |
| its `category` and `tags` | DR24 (item 104 (a) (3)–(4)) → the siting profile | V11 §3.13 | nothing in the massing except `emits.smoke` and `needs.runningWater` (V02 §3.14.6) | M2's axis; §8.10's stacks |
| its `landmarkLevel` | DR24 (item 104 (a) (7)) → `landmark` | V11 §3.13's landmark factor on σ | the significance shift | V02 §3.2 step 3; M10 |
| its `economicWeight` (an optional library field) | DR24 (item 104 (a) (5)) | V11 §3.13's `economicWeight` factor on σ | the significance shift | V02 §3.2 step 3; M10 |
| its `materialFamily` | DR15 (materials) | the material row (V11 §3.19) | texture and colour only — never the massing | §8.2 |
| a split class's institution (with `activeChains` feeding the supply web) | DR10 (S10b's split placement; item 105 (h)) | V11 §2.3's `split.threshold` → `Use.branchOf` | the `split.works` and `split.shop` families | V02 §3.14.3 |
| a crypt record and the cathedral's existence | DR17 (a crypt record → its church's crypt); DR32 (the crypted churches) | V08's religious rows → V11's `crypt` column (item 436) → item 238 | the crypt seed wings and the raised crypt's lift | V02 §3.14.5 |
| a crypt record bound to a use that could stand on a deck (a bridge chapel's crypt) | DR17 with DR10 (the binding) | V11's `deckOk` per use (V02 X16) | never a deck plot: the use stands on land with its crypt | V02 §3.16 (6); S10b |
| households and bands (the population, `wealth.label`) | DR6 (the prosperity field and each plot's band), DR7 (households) | §7.7's derivation table | the manifested band (geometry) and the occupants' band (the composer's rooms) | V02 §3.2 step 3; V02 §3.8 |
| a worship, government or fortification institution whose culture builds in tiers — the dossier's `site.culture` only (no religion field builds in tiers — a deity is a temple's dedication — and the era is the constant `c14` on dossier maps) | DR15 (`site.culture` → the template-family row) | V11's specialisation rows `stepped_temple`, `terraced_palace`, `tiered_tower` with their chance and cap (V02 X17), which name the composition key | the `stepped` family through `DesignationTemplateRow.composition` | V02 §3.2 step 2; V02 §3.15 |
| a building on a deck plot — no dossier fact names a deck (the dossier's 'Bridge' and 'Wharf' landmark strings name features whose deck plots are map-side, V08) | none (map-side) | the base's deck plots (item 110 (d)); V11's `deckOk` column (V02 X16) | the `@deck` rows, the deck budget and datum | V02 §3.16 |

A dossier change reaches these facts by §7.7 item 11 (b): the map facts whose inputs it changed are re-derived inside
its disruption set by least-disruption mutation (§7.7 item 5; items 22, 75, 76), never a re-roll. At the building that
mutation is S11's designation mutator with V02 §3.9's wing step — keep what fits, add, subtract, adapt — for a changed
class, ladder step, custom record, significance or specialisation; a changed `materialFamily` reaches the material row
only (never the massing, T-V2-25); a changed crypt record re-derives the basement (§2.6) and with it the lift (V02
§3.14.5).

### 1c The base hooks consumed (by section)

| base section | what this volume uses | how |
|---|---|---|
| §2.6 `BuildingGenerator` (`outline` / `compose` / `plan`) | the three-call split, `BuildingInput`, `KernelResult` | the massing implements `outline()`, the composer `compose()`; `plan()` is V03's |
| §2.6 `BaseWing`, `Building.wings`, the kinds `rect` / `quad` / `polygon`, `corners`, `ridgeAxis`, `spans` | the massing's output record | ranges and blocks are `rect` (butt joints) or `quad` (mitre joints); towers are `polygon`; a row keeps its `quad` |
| §2.6 the wing-carrying rule (`carryWings`, rules 1–5, J-P47–J-P49) | every wing and every stored composition point follows its footprint | unchanged; the massing establishes rule 1 at S11's first carry; the pairing tier (ii) covers every tiled massing, tier (iii) a massing with towers (V02 §3.5) |
| §2.6 *Heights* and `deriveBase`; *Materials*; *Entrances* (`deriveEntrances`, rules 1 and 5); *Basements*; the stage-3 contract and intake | heights per wing, the ground datum, texture-only materials, the entrance set the porch and the gate hall anchor on, the union contract, the intake fallback | as stated there, with items 223 (towers in the union, per-class admission), 224 (the entrance hint), 228 (a forecourt `U`'s door kept where it already lies free) and 230 (a solid stack's entrance at its stair's foot, the plan rooted at the first landing door) |
| §2.6 `Composition`, `Wing`, `ComposedTower`, `Porch`, `Room` | the lazy rungs' records | with items 218–220 (a composed wing and tower name their base wing; dormer rows; porch kinds) |
| §2.6 `PathShapeRow` (item 59) | Fantasy Manor's five layout families | five rows of `MassingFamilyRow` (V02 §2.3) under our own ids (item 221, with its table-migration row) |
| §2.6 *Basements* (items 238, 226); II.7.3; item 109 (j), (k) | the basement decision, the crypt column, the dig draw | the crypt seed wings and the raised crypt's lift; the dig floor and the W6 trigger (V02 §3.14.5) |
| §2.6 `interface Basement`, the terrain gate, §5.3's basement row, §7.4's warp check, §10.2 `cellar`, §13.2's T29-4, J-A29.25 (item 371) | the basement's place and its `external` access | inside the ground wings; `external` for a walk-out or where no ground wing is storeyed; the plan rung's step 3 and T28-3 are V03's (item 578) |
| §4.5 (1) significance; §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50) — the latitude item 102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg` | σ; the settlement's latitude | the significance shift (V02 §3.2 step 3); the sunlit choice (M5) |
| V10 §3.9 `WhyProvider` (item 270) | the oracle's per-kind explainer | V02 §4.5's provider for `building` |
| §7.8 the control registry | control rows | `fantasyShapes` (item 402) |
| §2.5 `SlotPlan.hint`, `BuildingSlot`, `ContextVector`, `PlotBound`, `YardPart`, `Passage`, `Plot.builtBand` / `fieldBand` | the region the massing may occupy, its frontage, its band | read at S11; the manifested band for geometry columns, the field band never (item 31) |
| §2.8 `ElaborationRecord`; §2.9 `ElaborationChunk` | the `wings` and `rooms` rungs' state and cache | the rungs' recorded inputs gain the composition slices (item 261) |
| §3.2–§3.4, §3.6–§3.8, §3.10 | the lattice, `minEdge` and `attractCm` (§2.2 `LatticeSpec`, §3.2), `lir(ring, axes)`, `obb`, booleans on the arrangement, the near-rectangle test, the straight skeleton | the massing's snap and validation (V02 §3.5); the roofscape's facet construction (V02 §5.2) |
| §4.1 the laziness contract and the elaboration trigger policy | massing eager (S11), composition lazy | unchanged; the `rooms` rung derives with the plan only (V02 §3.8) |
| §4.7 S11 — designation template, arrangements, front-line jitter, first carry, households fill, designation mutator, informal clusters, class mix | the class, the band, the slot, the structures, the mutation steps | the massing is S11's `outline()` for every arrangement; the mutator's wing step is V02 §3.9 |
| §4.7 S10–S11's levelling (item 110 (a)) and its reader `levelledGroundCm` (item 309) | the platform datums of levelled plots, blocks and wards | every ground sample of the datum, the basement gate and the raised crypt (items 370, 231) |
| §5.1–§5.3 | bounded ladders, no whole-map retry, the invariant suite | F-MASSING and F-COMPOSE (item 328), invariants (item 332) |
| §6.1 streams and the concern registry; §6.3 anchors | the composition's own concerns, appended when stage 3 registers them | `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` (item 341); wing anchors (item 346) |
| §7.1 events, T9 `shape`, `regenerate` with `rung`; §7.2–§7.5 | edits of massing and composition | `setMassing` and `setComposition` (V02 §4; item 351) |
| §7.6 tables, `extension`, per-preset values | the composition tables and the parity presets | `composition.json`; the `FM` building-scope preset (item 376), resolving `composition.json`'s and V11 §3.24.0's `presets.FM` cells |
| §8.1, §8.2 (`roofConstruction`, `states`, roof tint by band), §8.4 (surface layer, casters), §8.5 (bands, change markers), §8.6 (stage-3 LOD, roof construction), §8.10 (roof detail) | the drawing | the construction `roofscape` (item 406); dormers, porches, tower roofs and stair flights as paint programs (V02 §5) |
| §4.9 `ClimateTable` (`ClimateRow.roof`, typed by V11 §2.8) | the climate's roof form and pitch | M11's one pitch rule and M12's flat roofs (V02 §3.5) |
| §10.2 `DesignationTemplateRow`, `BuildingClassRow.templateFamily`, `HeightsRow` (items 432, 435) | the per-band template, its family and heights | the `composition` column on the row and each structure (item 426); the resolution chain reads `templateFamily`; three heights columns (item 427) |
| §11.1 exports | JSON, SVG, glTF, OBJ, CityJSON, GeoJSON, VTT | V02 §5.5 |
| §12.4, §12.5, §12.7, §12.8 | S11's row, the first-map laws, the stage-3 bullet, the elaboration cache | V02 §6 |
| §13.2, §13.3, §13.5, §13.6 | bars, declared shifts, parity rows, the owner's panel | V02 §7 |
| §14, §15.1, §16 | packages, the parity matrix, the build plan | `@plat/buildings` (item 505); Fantasy Manor rows (item 522); milestones M6 and M3a-V2 (items 524, 525, 568) |
| §2.6 the base outline builder, `deriveBase`, the capacity function, `Storey.wings`, `BuildingInput` (items 227, 229, 305, 370, 371) | where the tier construction and the deck buildings plug in before stage 3; the stacked and deck datums; the storeys a stacked wing reaches; no cellar on a deck | V02 §3.15–V02 §3.16 |
| §2.7 `Bridge.deckCm`; §4.8 the piers', moles' and quays' deck heights; the deck plots (item 246) | the deck's surface and its plots | read through `DeckContext` (V02 §3.16) |
| §8.4 the casters (a prism from `baseCm`) and the caster ceiling; §8.6 the per-wing constructions (item 419) | one shadow per tier; the stack's order in every construction | V02 §5.6 |
| item 110 (a)–(f) (file g) | stepped massing, deck buildings, the building side of retaining walls, raised ways and the second fixture | V02 §3.15–V02 §3.17 |
| §2.6 *Heights and the ground datum*; §7.3 (a) 4; §7.4's warp and `moveVertex`; the wing-carrying rule's rule (2) | every path that re-bases a wing | one building-level pass, `rebaseStack`, for a building with a stacked wing (item 370); the wall-side sample (item 231) |
| §4.11 step 8 `heightsAt` | a building's heights at a Works stage | a stack rises in stack order, solid wings in courses (item 318) |
| item 101 R2 (`docs/AMENDMENTS-2026-09-27e.md`) | refusals only for what item 20 forbids (dossier facts) and what a lock protects | every structural limit of V02's edits is a named bend (V02 §4.2, V02 §4.3, V02 §4.6; J-V2.79) |
| §4.7 S10b *Class mix* (3) and S11 *Footprints and heights*; §10.2 *Grandeur ceiling* (item 115, file g) | the rung's `grandeur.ceiling` row (V11 §3.25.4) and its `settings.grandClasses`; S10b's manor count | the rung ceiling on a dwelling's resolved row (V02 §3.2 step 2) |
| §12.1 *Targets and the comfort level*; §12.10's R12-31 – R12-34 (item 119, file g) | the ten-second comfort level, the progress rule, the measured-gain rule, the interaction budgets | V02 §6's targets and waits (V02 §6, V02 §6.4) |
| §2.7 `ConditionOverlay` and its reader rule; §2.9's `week`, `crises` and `knowledge` keys; §7.7's DR44; §10.2's crisis look table (`RosterTables.crisis`: the `disaster` row's `lookLevel`, `previewSeverity`); §8.2's crisis look rows; §11's exports (item 122, file g) | the disaster looks drawn in the view, their admission and their level; the marks round the buildings | the ruined look of a disaster's buildings (V02 §5.7) |
| §2.6 step 7; §6.3's concern `plan.damage`; §8.6's damaged plan; §11.1's battle maps (item 123, file g) | the plan in force under its damage layer, one keyed threshold per element; the battle maps following the damage | the exterior's damage (V02 §5.7): the plan's own elements, never a threshold of V02's |
| §8.2's `states` rows (`abandoned`, `decayed`, `ruined`, `charred`, the Works `decaying`), the `charred` program, the wall `breached` row's rubble spill and the `condition` row's patched-courses roof `pattern`; §8.8's tile key | the drawn decline states and the marks and values the exterior's damage reuses | V02 §5.7 (no cell of its own) |
| §12.5 (the crisis looks drawn lazily per visible tile) | the look's per-tile cost | V02 §6.6 |
| §8.1's display list (S14; the `group` of delivery and invalidation; item 4's commit delta, item 6's transient lists, item 7's week re-emission) and §8.9's worker boundary | the path of the exterior's damage from the generation worker, where its inputs live, to the tile rasteriser and the export writers | V02 §5.7 (8) |

### 1d Out of scope (and where it lives)

* **The plan rung** (`BuildingGenerator.plan`, room programmes, the interior ladder, stairs, F-PLAN) — V03. This volume
  hands it the composition (V02 §3.8) and the dormer rows it must honour (V02 §3.7).
* **Neighbourhood close-ups** and the neighbourhood click (II.4) — V01; this volume answers that click's request for the
  `wings` rung (V02 §3.11).
* **How mutations spread over epochs and show on the weekly clock** (Works, item 67; item 18 (c)) — V06; this volume
  supplies the recorded wing steps it reads (V02 §3.9).
* **The content of every other rule table** — V11; this volume owns `composition.json`'s schema and default rows.
* **The app's screens and the clerk** — V09 and V10; this volume defines the events, the handles, the bends and the
  clerk's operations (V02 §4).
* **Castles and wall towers** (§4.8, §2.7's `Tower`) stay the base's; a `keep` class building uses the base's template
  (V02 §3.3's `template` family).
* **Underground buildings' vaults and islands' bases** — V04 and V05; the massing gives an underground building a `single`
  range with a `flat` roof and nothing more (V02 §3.10.6's `@underground` rows). An island's rim as a cliff barrier and
  its rim-slab crypt vault are V05's.
* **Materials** are texture and colour only; `MaterialRow`'s rows are V11's (V11 §3.19); SettlementForge's
  `materialFamily` reaches the material row, never the massing (owner, 2026-09-26; T-V2-25).
* **The siting profile** (item 103) is S10b's and V11's: no profile column shapes the massing except `emits.smoke` and
  `needs.runningWater` (V02 §3.14.6).
* **The crypt's ring, its size and its rank** are §2.6's basement function with V11's `crypt` column, `cryptM2` and
  `rankShare` (item 238; V03); **catacombs** are V04's, under cemeteries or a CITY/METROPOLIS quarry ossuary — no V02
  path makes, moves or shrinks one (V02 §3.14.5).
* **Item 110's other homes.** The `RetainingWall` record, its sources and its drawing (item 110 (a)); the raised ways,
  their arena parts, piers, ramps, stairs and vaults, and their generation at CITY and METROPOLIS or declaration at TOWN
  (item 110 (b)); the deck plots themselves — their faces, sizes and fall (item 110 (d)'s base side; items 244–246); the
  second known-city fixture's skeleton and bars (item 110 (e); V12). Which classes build in tiers, with what chance and
  cap, and the deck budget rows are V11's (V02 X16, X17); the plans of tiers V03's (V02 X18); a ruin's decay V04's (V02
  X19). V02 designs the building part only (V02 §3.15–V02 §3.17).
* **Items 123 and 122's other homes.** The damage layer — its element kinds, its keyed thresholds (§6.3's `plan.damage`
  with V11's ranges by material and element kind), the plan's drawing at every state, the plan's exports and its panel
  lines — is V03's; cellars, crypts and underground buildings V04's; the decay level and restoration V06's
  (`decayLevel`, `decayPeak`), and the look's yielding to a rebuild's Works (`crisisLookYields`); the crisis look table,
  its map rows and settings the base's (§10.2) with V11's values; which neighbourhoods a disaster strikes V01's
  (`disasterDistricts`), V07's ends at the village rungs; the marks round the buildings — a ruined quarter's tone,
  camps, smoke, marked doors — §8.2's crisis rows; the hand-over to the aftermath V06's. V02 draws the building's
  exterior only (V02 §5.7).

## 2 Data model

Units, the placement rule and the three storage classes — **persisted** (model data, in the building's leaf digest and
the snapshot), **lazy** (derived by a rung, held in the elaboration cache until an edit stores it) and **derived at
read** (a pure function, never stored) — are the base's (§2.1, §3.2, §2.8, §2.9); table cells carry §7.6's `{value,
unit, provenance, calibratable}`. This volume adds no entity kind: every record below is a sub-record of `Building`
(§2.4's sub-record rule: its lifecycle is its building's, a lock on it an attribute-level lock on its path). The records
the base reads are declared in §2.6 (items 216–222, 225, 227, 305); this chapter states what only stage 3 decides —
their meanings, writers and readers — and declares the records only stage 3 reads.

### 2.1 The massing's records (persisted)

`WingRole`, `MassingFamilyId`, `BaseWing.role`, `.key`, `.arcade`, `.partName`, `Building.nextWingKey`,
`Building.massing` (`MassingRef`), `DriftBounds` and `RoofSpec`'s `shed` kind with `high` are declared at §2.6. Their
meanings:

| role | the wing it names |
|---|---|
| `main` | the range the entrance hint names: the hall, the street range, the only range of a single-range building |
| `range` | another range of the path (a side range, the rear range of a courtyard) |
| `cross` | a cross-wing of a T or H plan: runs through the main range's end at a butt joint |
| `block` | a pavilion that splits the range it straddles (V02 §3.5 M7): always hipped, never a pyramid (item 59; J-V2.3), often a storey taller |
| `back` | a rear range or outshot behind the main range (V02 §3.5 M9) |
| `service` | a lower range of the same building (a kitchen range, an inn's stable range) |
| `tower` | a polygon wing with a cone or pyramid roof, attached at a corner, an end or the front, or standing on a block (V02 §3.5 M8); a church's west or crossing tower (M8 (e)) |
| `turret` | a small tower in a re-entrant corner, a stair turret |
| `gate` | the front range of a closed ring: it carries the gate hall (V02 §3.8) |
| `part` | a part of a base footprint template or of the base's axis-locked composer (institutions, §2.6) |
| `shelter` | a cluster structure: a tent, a shack or a lean-to shelter (§4.7 S11's cluster arrangement) |
| `tier` | one stage of a stepped mass — tier 0 on the ground, tier k ≥ 1 standing on tier k − 1 (`BaseWing.on`; V02 §2.6, V02 §3.15) |
| `shrine` | the small roofed range standing on a stepped mass's top tier |
| `stair` | a solid flight climbing a tier's face, from the ground (stair 0) or a terrace (stair k ≥ 1) to that tier's top |

Each family's meaning, construction and source is V02 §3.3's table; the five `regularCourt`, `starCourt`, `chordArc`,
`rectCourt`, `gridWalk` are our ids for Fantasy Manor's layout families (item 221's table-migration row; J-V2.47).

**Writers and readers of the persisted fields.**

| field | written by | read by |
|---|---|---|
| `BaseWing.role` | the massing; the mutator's convert step; `setMassing` | the composer, the mutator's match, the roofscape's joint priority, the exports, the anchors |
| `BaseWing.key` | once, when the wing is minted (`Building.nextWingKey`); never changed, never re-used after a removal | the composer's per-wing draws, a composed wing's `base`, the mutator's keep, every edit path (`wings/<key>/…`) |
| `BaseWing.arcade` | M11 from the row's `arcade` cell; `setAttr(wings/<key>/arcade)` | the drawing (dashed outline), the exports (open), §2.6's capacity (no ground-storey rooms) |
| `Building.nextWingKey` | the massing (the wing count at S11) and every wing-minting step; never decreases | every wing-minting step |
| `MassingRef.family` | the massing, the last `setMassing` `family` op, the mutator | the mutator (source family), `DriftBounds` (§2.6), the why provider |
| `MassingRef.row` | the resolution chain (V02 §3.2 step 2): a template's `composition` value, `<class>/<band>`, `<family>/<band>`, `default.<arrangement>/<band>`, with `@underground` or `@deck` appended where V02 §3.2 says, and `~<RUNG>` where the rung ceiling capped it | the report, the why provider, the composer (`Composition.row` unless an edit changed the class since; it reads the row without the `~<RUNG>` suffix, whose cells are the massing's), a standing building's re-derivations (its ceiling's rung, V02 §3.2 step 2) |
| `MassingRef.grammar` | the massing (the `composition.json` version it read) | migration (V02 §2.5), the report |
| `MassingRef.entrance` | M13's entrance hint (a wing key and that wing's ring side); `null` where the base rule alone decides (a row, a shelter, a drawn footprint) | *Entrances* rule 1 (item 224) |
| `MassingRef.segments` | M5 (the path's segment count after collinear merging, before M7 splits a range; 1 for `single`, `row`, `towerHouse` and the base's constructions); rewritten by every `setMassing` op and the mutator (the count of range-role wings after re-joining each block's pieces) | the parity harness (the unit Fantasy Manor's counts use, V02 §7.4), the report, the why provider |
| `MassingRef.low` | M5 under the axis `fallLine` only (the main range's downhill ridge end: 0 the end on ring side 1, 1 the end on side 3); rewritten when that wing is reshaped, absent otherwise | V03's byre end (V07's longhouse) |
| `MassingRef.cupola` | M12 (the kind and the key of the range whose ridge midpoint carries it); dropped when its wing leaves, kept at the new midpoint when it is reshaped | the roofscape and its paint program, the exports; never `Heights`, never a caster |
| `DriftBounds` | an assignment (§7.7; item 385); before stage 3 registers only the families §2.6 lists are admitted (`driftFamilyIgnored`) | M3's family filter, M10's size clamp, M11's floors clamp, the mutator's adapt bounds |
| `BaseWing.partName` | the base outline builder's templates (item 234); V02 mints none: M0 (d) passes it through, and every V02 wing writer — the mutator's W-steps, every `setMassing` op and bend, the canonical re-keying, `rebaseStack` — keeps it on the wing that keeps its key (a block's pieces re-joined by `removeWing` keep the lowest key's); a wing V02 adds carries none | M8 (e)'s crossing tower, `cryptSeedWings` (V02 §3.14.5 (c)), V03's A5 (e); its lifecycle row is V03 §2.5's |
| `RoofSpec.kind 'shed'`, `RoofSpec.high` | M12; `setAttr(wings/<key>/roof)` — `high` is the ring side along which the shed stands at its ridge height (the side against the host wall); a shed wing's `ridgeCm` is its height at `high`, its `eaveCm` its height on the opposite side | the roofscape, the exports |

**The canonical wing order (stated once; J-V2.48).** `Building.wings` is always ordered **towers and turrets first,
ascending by key, then every other wing ascending by key**. The massing mints keys in that order (M13), and every
writer — the mutator (V02 §3.9), `setMassing` (V02 §4.2) and the migration row (V02 §2.5) — re-sorts by this rule before
it commits, so §2.6's clip order (towers first) and every derived order are functions of the keys alone. A tower standing
on a block (M8 (d)) is contained in its block; the clip order takes it after its container by §2.6's containment rule,
whatever its place in this order. Under stage 3 every index-named wing field holds a base wing key (§2.6, item 225), so
an edit or a mutation that adds or removes a wing never re-points a stored door, room, stair or chimney (T-V2-34).

### 2.2 The composition's records (lazy; stored only when edited)

`Wing.base`, `Wing.dormerRows`, `ComposedTower.base`, `Porch.kind`, `Composition.row` and `.grammar` are declared at §2.6
(items 218–220), and `DormerRow`, `DormerKind` and `PorchKind` are §2.6's: a composed wing and a composed tower take
their ring, heights, roof and spans from the base wing they name — the composition never re-shapes the massing
(J-V2.2, J-V2.6). This volume declares the rest:

```ts
interface CompositionStage3Fields {
  secondaryPorch?: { entrance: number /* the Entrance ordinal (§2.6 Entrance.vertex's i): a side, rear or yard entrance */;
                     widthCm: Cm; depthCm: Cm };   // a hood only (V02 §3.7, J-V2.44); side and offset re-read from its entrance after every carry (rule 3)
  // courts: derived at read — the holes of the building's footprint face, in ring order (V02 §3.6); never stored
}
```

A composed wing carries zero, one or two dormer rows (one per eave side); its `dormers` count is their sum (§2.6); its
porch stands only on the wing that carries the main entrance, where that wing's role admits one (`WingRoleRow.porch`,
V02 §3.7). `PorchKind` `halfRound` is a half-disc on the door's side under a half-cone roof — Fantasy Manor's commonest
porch, weight 0 by default and calibrated under `FM`. A composed tower's `centre` is its ring's area centroid and its
`radiusCm` the largest vertex distance from it, rounded up. A stored composition therefore holds only its row and
grammar, per composed wing its `base` and its dormer rows, the porch and the secondary porch, per composed tower its
`base`, and the rooms and plan the base defines. Its world points are only the rooms' and the plan's, which `carryWings`
already carries (J-P48); the composed wings and towers follow the base wings they name, so a stored composition adds no
carried ring of its own (J-V2.6).

### 2.3 The composition tables (`composition.json`, `@plat/tables`)

One versioned table file, read through the override layer (§7.6); every cell `{value, unit, provenance, calibratable,
extension?, presets?}`. Every calibratable cell has its calibration register entry (V12 §3.11's rule), written by the seat
landing the milestone that ships the cell — M3a-V2, M6a, M6b or M6c (V02 §8.3, V02 §8.5) — from the line of V02 §3.10.10 that
names its metric, method, due milestone and fallback; `plat calibrate register --check` (T-V12-20) is green over them at
that exit. A `presets.FM` measured-rate entry (V02 §3.10.8) is set only by V12's `reference` run; the code-read `FM`
entries (the rich rows' `families`, `sunBias` 0.5) and `sunBias`'s parity-neutral entries under `MFCG`, `FTG` and `VG`
(0.5, `own`, note `fixed: the parity neutral`, V11 §2.2's rule (a)) move by no run. Readers: S11 (the massing), the
composer, the designation mutator, the roofscape, §8.10's roof detail. Slice kinds: `row` (a `CompositionRow`, a `WingRoleRow`, a `MassingGrowthRow`), `weights` (a row's family
weights, porch weights, tower-shape weights), `bracket` (`TowerShapeRow.sides`). Default rows: V02 §3.10.

```ts
interface CompositionRow {           // one per (key, band of §4.5's band set), compiled from the four authored anchors (V02 §3.10.1); continuous cells interpolate along the prosperity value between band centres (§4.5), discrete cells read §4.5's discrete-cell rule (item 19)
  key: string;                       // `<prefix>/<band>`, the prefix a template-family key (V11 §3.6.1), a class id (an override row), a structure-role key (V02 §3.10.4), `default.<arrangement>` or `outbuilding`; `@underground` and `@deck` suffixed rows exist per prefix (V02 §3.10.6, V02 §3.16)
  prefix: string; band: string;
  alias?: string;                    // a row that reads another prefix's row at the same band (e.g. the `kiln` role reads `kiln-yard`); cells the alias row states override it
  families: { family: MassingFamilyId; weight: number }[];   // continuous weights (interpolated, then renormalised over the feasible set, V02 §3.5 M4); must satisfy the arrangement law (V02 §3.10.7)
  axis: 'frontage' | 'fallLine' | 'water';   // discrete (V02 §3.5 M2): how the main range is oriented; default 'frontage'
  wingWidthM: [number, number];      // continuous: the range's width, drawn uniformly in [lo, hi]
  rangeLenM: [number, number];       // continuous: a single range's length and an L / U / H arm's target length
  crossWing: { fwdM: [number, number]; backM: [number, number] };   // continuous: how far a cross-wing reaches in front of and behind the main range
  courtMinM: number;                 // continuous: the least court side a closed family may leave
  uOpenFront: number;                // continuous chance that a U plan opens toward the frontage (a forecourt) rather than the rear
  blocks: [number, number];          // continuous count range; the count is drawn uniformly on the integers inside it
  blockStoreyDelta: [number, number];
  towers: [number, number];          // continuous count range (corner, end and gate towers; a `towerHouse` family's own tower is laid by M5 and not counted here)
  towerShape: { round: number; square: number; octagon: number };   // continuous weights
  towerRadiusW: [number, number];    // continuous: a corner or end tower's radius as a share of the wing width
  towerStoreyDelta: [number, number];
  towerOnBlock: number;              // continuous weight of M8's candidate (d), a square tower standing on a block: 0 by default, calibrated under FM (V02 §3.10.8)
  towerFlat: number;                 // continuous chance that a square or octagonal tower takes a flat battlemented roof (parapet) instead of a pyramid
  westTowers: [number, number];      // discrete: west towers of a church-like template (M8 (e)): the cathedral 2 at the west corners, a church 0–1 at the west end
  crossingTower: number;             // continuous chance of a tower over a template's transept crossing (M8 (e))
  gateTower: number;                 // continuous chance that a closed or U plan's front range takes a gate tower when a tower is drawn (V02 §3.5 M8 (c))
  turret: number;                    // continuous chance of one stair turret in a re-entrant corner
  backRange: number;                 // continuous chance of a back range (rows, houses, cottages)
  backLenM: [number, number]; backWidthM: [number, number];
  hipShare: number;                  // continuous chance that a range's roof is hipped rather than gabled (blocks are always hipped; towers by shape: WingRoleRow)
  gableToStreetMaxFrontM: number;    // continuous: a single range turns its gable to the street where the frame's frontage is below this
  arcade: boolean;                   // discrete: the main range's ground storey is an open arcade (a market hall; V02 §3.5 M11, V02 §5.1)
  cupola: { chance: number; kinds: { dome: number; tip: number; pyramid: number } };   // continuous: a roof ornament at the main range's ridge midpoint (M12)
  dormer: { perTenM: number /* dormers per 10 m of usable eave */; widthM: [number, number]; kinds: Record<DormerKind, number> /* weights */; entranceGable: number /* chance */ };
  porch: Record<PorchKind | 'none', number>;   // continuous weights; V02 §3.7 filters them by the space in front of the door
  secondaryPorch: number;            // continuous chance of one hood at a side, rear or yard entrance (V02 §3.7); 0 by default, calibrated under FM
  rooms: { hall: boolean /* discrete */; hallLenShare: [number, number]; chapel: number /* chance */; gateHallM: [number, number] };   // read at the OCCUPANTS' band (V02 §3.2 step 3); hall and chapel emitted only by V02 §3.8's rule
  floors?: [number, number];         // a role row's own storey range, overriding the template's `floors` for that slot (a one-storey cloister gallery); absent: the template's
  hearths: [number, number];         // decorative chimneys before a plan exists (§8.10)
  coverageMax: number;               // continuous: the massing's footprint area as the most share of the slot hint's area (a ring leaves its court)
  claimShare?: [number, number];     // present → M10's band is claimShare × area(H), replacing the template's footprint (the stepped rows, the `arena` row); absent on a row whose template's footprintM2 is "the claim's" → the constants claimLo / claimHi (0.35, 0.6); read by slotBand (V02 §3.5 M10)
  caveaM?: [number, number];         // `ovalCourt` only — the seating ring's depth across, drawn uniformly (the `arena` row; V02 §3.5 M5)
}
interface MassingFamilyRow {         // supersedes the base's PathShapeRow (item 221): Fantasy Manor's five families keep their rows (P21) under our ids, ours are added
  family: MassingFamilyId;
  minFrameW: [number, number];       // the least frame (along the frontage, into the plot) in wing widths, for feasibility (V02 §3.5 M3)
  wings: [number, number];           // the range of ranges the family lays before blocks split them (towers and blocks apart); M13 checks the laid count against it
  closed: boolean;                   // a closed ring: the footprint has a hole, the court
  joints: 'butt' | 'mitre' | 'either';   // M13 checks every joint the family laid against it
  fantasy: boolean;                  // true for 'regularCourt', 'starCourt', 'chordArc': the owner's "fantasy as toggles" (D-7); their weight is scaled by the `fantasyShapes` option (V02 §3.10)
  sides?: number[]; sideWeights?: number[];   // 'regularCourt': the side counts and their weights; 'starCourt': the corner counts
  chords?: [number, number];                   // 'chordArc': the least and most chords
  gridCells?: number;                          // 'gridWalk': cells per side
  provenance: string;
}
interface WingRoleRow { role: WingRole; storeyDelta: [number, number]; roofKinds: { kind: RoofSpec['kind']; weight: number }[]; hipInset: number /* a hip roof's ridge-end inset as a share of the span (0.5: equal pitches); ranges 0.5, blocks 0.5 by default and 0.25 under FM (V02 §5.2 step 2) */; through: number /* priority at a butt joint: the higher runs through (V02 §3.5 M5) */; dormers: boolean; porch: boolean /* read by V02 §3.7: a porch only on a wing whose role admits one */ }
interface MassingGrowthRow {         // the mutator's family lattice (V02 §3.9): how a target family is laid around the kept ranges of a source family
  from: MassingFamilyId; to: MassingFamilyId;
  keep: 'all' | 'main' | 'mainAndOne' | 'none';   // which kept ranges seed the target's path
  anchor: 'front' | 'rear' | 'either';            // where the kept main range sits in the target path
}
interface TowerShapeRow { shape: 'round' | 'square' | 'octagon'; sides: { maxRadiusM: number; n: number }[] /* bracket: the polygon's side count by radius */; roof: 'cone' | 'pyramid'; pitch: number /* rise over radius */ }
interface PorchKindRow { kind: PorchKind; depthM: [number, number]; widthM: [number, number]; storeys: number; clearanceM: number /* kept free in front of it */; outside: boolean /* false: recessed inside the footprint */ }
interface DormerKindRow { kind: DormerKind; depthShare: number /* its up-slope depth as a share of the half span */; atEave: boolean; minPitch: number; gapM: number }   // the end margin is the constants row's endMarginM, read by facadeBays (one fact, one place)
interface RoleKeyRow {               // `composition.roleKeys` (V02 §3.10.4): normalises a template structure's name to a composition key
  family: string;                    // a V11 template-family key, or '*' for every family (a family-specific row wins)
  name: string;                      // the structure name as V11 §3.6.1 writes it ('stable', 'stables', 'nave and choir', 'wheel or sails', …)
  key: string | 'yardPart' | 'basement';   // a composition key prefix (a role row, a family row or a class row); 'yardPart': not a building (S11's yard partition owns it); 'basement': held in the cellar (the class's cellar row)
  attach: 'slot' | 'main';           // 'slot': S11 packs it as its own slot, which reads `key`'s row; 'main': S11 packs no slot — the main slot's massing lays it as part of the main building (item 304; V02 §3.5 M8b)
}
interface ClassFamilyRow { cls: string /* a V07 village class key `v.<id>` (V07 §2.4; V11 §2.9) */; key: string }   // `composition.classFamily` (V02 §3.10.5): the composition key prefix of each of V07's `v.` village classes, the one source of their keys (V07 cites it); keyed by the `v.` key (J-V2.96)
// HeightsRow: V11's (V11 §2.8, table 'heights', keyed by template family, with item 427's columns attic, parapetCm, towerStoreyCm; values V11 §3.6.4's); V02 §3.10.6 states only their reading rule. This volume declares no heights row (J-V2.33).
interface CompositionConstantsRow { key: 'constants'; cells: Record<string, TableCell> /* the named constants of V02 §3.10.9's table, each a §7.6 cell */ }
interface CompositionTables { rows: CompositionRow[]; families: MassingFamilyRow[]; roles: WingRoleRow[]; growth: MassingGrowthRow[]; towers: TowerShapeRow[]; porches: PorchKindRow[]; dormers: DormerKindRow[]; roleKeys: RoleKeyRow[]; classFamily: ClassFamilyRow[]; constants: CompositionConstantsRow; version: string }   // composition.json
```

### 2.4 Derived at read (never stored)

```ts
type RoofEnd = 'gable' | 'hip' | 'party' | 'mitre' | 'valley' | 'wall' | 'open';   // V02 §5.2: resolved per wing end from the joints and heights
interface RoofFacet { wing: number /* wing key, or a tower's */; ring: PointCm[]; z: number[] /* cm above the building's lowest base, per vertex */; normal: [number, number, number]; part: 'roof' | 'dormer' | 'porch' | 'tower' | 'cupola' }
declare function roofscape(b: Building, c?: Composition): RoofFacet[];           // V02 §5.2: planar, non-overlapping, covering the footprint (and a porch outside it)
declare function resolveEnds(b: Building): Map<number /* wing key */, [RoofEnd, RoofEnd]>;
declare function facadeBays(w: BaseWing, side: number /* any ring side; an eave side is the ring side of eave 0 or 1 (below) */, bayM: number): { atCm: Cm; widthCm: Cm }[];   // V02 §3.7: every ring side; integer centimetres only (its valley reaches by valleyReach's 'int' mode, never read from the float roofscape); implemented in @plat/plots beside massStepped, stairTreads and cryptSeedWings, re-exported by @plat/buildings (item 505)
declare function valleyReach(x: BaseWing, y: BaseWing, mode: 'int' | 'float'): number;   // V02 §3.7: the plan reach of the valley where x's ridge meets y's roof; 'int' for facadeBays (cm, byte-identical), 'float' for the roofscape (float64, view data)
declare function dormerPositions(w: BaseWing, row: DormerRow, obstacles: Polygon[]): { atCm: Cm }[];
declare function cryptSeedWings(b: Building): number[];   // V02 §3.14.5 (c): the wing keys whose ground storeys seed a crypt's ring; exported by @plat/plots beside massStepped; called by §2.6's basement function (items 238, 226)
```

**Eave sides.** A wing's two eave sides are the ring sides parallel to its ridge: for `ridgeAxis 0` (the ridge joins
the midpoints of sides 1 and 3) sides 2 and 4, for `ridgeAxis 1` sides 1 and 3; `eave: 0` is the one that comes first in
ring order. A `polygon` wing has no eave sides (no dormers).

**The exterior's damage (items 123 (d), 122; V02 §5.7).**

```ts
interface ExteriorDamage {                 // what V02 §5.7 draws of item 123's damage and of a disaster's ruined look; derived at read, never stored
  level: number;                           // the higher of V06's decayLevel at §2.9's week and the drawn disaster look's level (§10.2's
                                           // `disaster` row's lookLevel at its severity); 0 with neither
  look: { condition: Id | null /* null: a preview (§2.9's crises) */;
          pattern: 'fire' | 'flood' | 'scatter' /* V01's DisasterSource.pattern (V01 §3.16 (2)); 'scatter' with no calamity, a preview's included */ } | null;
  reading: 'none' | 'massing' | 'element'; // 'none': nothing to draw (level 0, nothing repaired); 'element' where the building's plan is current or
                                          // stored (V03); else 'massing'
  holes: { wing: number; ring: PointCm[] }[];          // 'element': each damaged roof bay over a room — the room's ring and its wing's key (a tower
                                                       // room's, its tower's); the drawing clips the ring to that wing's facets (V02 §5.7 (2), (8))
  gaps: { wing: number; span: [PointCm, PointCm] }[];  // 'element': each broken outer wall run of a wing's lowest storey, as its span on that wing's outline
  patched: { wing: number; ring: PointCm[] }[];        // 'element': each repaired roof bay over a room, as `holes` (item 114's patch material; V06's
                                                       // per-element decayPeak, read through V03 §5.6 (2) (b))
}
declare function exteriorDamage(doc: Document, b: Building, view: ViewState, opts: ViewOpts): ExteriorDamage;   // reads §2.9's week, crises and knowledge keys from view, opts.viewAs lowering the key (§9.2); runs in the generation worker (V02 §5.7 (8))
```

**Its path to the drawing** (V02 §5.7 (8)): it runs in the generation worker, where its inputs live; its result reaches
the tile worker as the building's damage marks in a `DisplayDelta` (§8.1, §8.9), re-emitted for exactly the buildings
whose marks change; the tile worker clips their rings against the roofscape it memoises (V02 §6.3).

### 2.5 Identity and lifecycle of every state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `BaseWing.role` | the massing at S11; the mutator's add step; `setMassing` (`addRange`, `addTower`, `addBlock`, `backRange`) | composer, mutator, roofscape, exports, anchors | leaf digest | Regenerate (keep) re-derives the same; New random on the plot re-draws it with the plot's reroll (§6.1) | the event's undo record keeps the former wings | the base carries it from M1 (item 216): the base outline builder writes `main`, `range` or `part`; for a document without it, the **fallback migration row** below |
| `BaseWing.key`, `Building.nextWingKey` | as `role`; a new key is `nextWingKey`, which then advances | as `role`; edit paths | leaf digest | as `role` — generation keys 0 … n − 1 in wing order (V02 §3.5 M13) | restored with the wings; `nextWingKey` restored to its former value | as `role` |
| `Building.massing` | S11 (the massing); `setMassing` `family`; the mutator (`family` and `row` of the target) | mutator, `deriveEntrances`, exports, reader | leaf digest | as above | restored | an older document keeps its value; one from before stage 3 has none and reads as `baseOutline` until an `upgrade` re-derives S11 (§7.5; a declared shift, §13.3); a `row` without the ceiling's `~<RUNG>` reads uncapped (V02 §3.2 step 2) |
| `MassingRef.segments`, `.low`, `.cupola` | M5 (`segments`, `low`), M12 (`cupola`); every `setMassing` op and the mutator rewrite them | the parity harness, the report, the why provider (`segments`); V03's byre end (`low`); the roofscape, the paint programs and the exports (`cupola`) | leaf digest | re-derived with the massing (the same draws) | restored with `Building.massing` | a `MassingRef` without them reads `segments` = the range-role wing count with each block's pieces re-joined, `low` absent, `cupola` absent until an `upgrade` re-derives S11 |
| the crypt lift (the ground-storey `baseCm` of the ground wings over the basement's ring, raised form; V02 §3.14.5) and **the half cellar's raise** (the ground wings over a `half` basement's ring, `cellar.depthCm ÷ 2`; a basement that is only a crypt, the wings over the crypt's ring; item 226) | M11, when §2.6's basement function takes the crypt ladder's `raised` form; the basement step when the gate chooses `half` (the gate reading the datum without the raise) | `deriveBase`'s successors, the heights, the plan's floor levels (V03's choir stairs, V03 §3.3's datum), the dig floor, the roofscape, the casters | leaf digest (it is those wings' `Heights.baseCm`) | re-derived with the basement after a `setMassing`, a designation mutation or a terrain change; kept by `deriveBase` and `rebaseStack` (1) on every re-basing path while the basement stays `half` (T-V2-52) | restored with the wings | a document without it re-derives the basement on load for an `always`-crypt building (V03's migrate row, item 238); a document whose half basements lack the raise gains it at its next `upgrade` — the one-time shift of J-V2.91, reported |
| `BaseWing.partName` (item 234) | the base outline builder's templates; passed through by M0 (d) | M8 (e), `cryptSeedWings`, V03 (A5 (e)), the why provider | leaf digest | kept on the wing that keeps its key by every V02 writer (V02 §2.1; a re-joined block keeps the lowest key's); absent on a wing V02 adds | restored with the wings | V03's row (V03 §2.5) |
| `RoofSpec.kind 'shed'`, `RoofSpec.high` | massing M12; `setAttr` | roofscape, exports | leaf digest | as above | restored | none before stage 3 |
| `BaseWing.arcade` | M11 (the row's `arcade`); `setAttr(wings/<key>/arcade)` | the drawing, the exports, the capacity function | leaf digest | re-derived with the massing | restored | absent before stage 3 (no arcade) |
| `Composition.secondaryPorch` | the composer (V02 §3.7); `setComposition` `porch` with `entrance` | roofscape, drawing, exports | lazy; stored with the composition | as the porch | restored | by the entrance ordinal; an entrance that no longer exists orphans it (§7.3 item 4), reported |
| `Composition.row`, `.grammar` | the composer | the elaboration record's slices; migration | lazy; stored with the composition when an edit stores it | a stale rung re-derives from committed state (V02 §3.11) | restored with the composition | a stored composition whose `grammar` is older keeps its stored fields; its unstored parts re-derive under the new grammar at the next click |
| `Wing.base` | the composer (1:1 with non-tower base wings) | roofscape, plan rung, exports | lazy / stored | re-derived; a stored one is re-matched by key when the wings change (V02 §3.9) | restored | a key that no longer exists orphans the composed wing (§7.3 item 4), reported |
| `Wing.dormerRows`, `DormerRow.edited` | the composer; `setComposition` `dormers` (sets `edited`) | roofscape, the plan rung, exports | lazy; stored (the first `setComposition` stores the composition, V02 §4) | an unedited row re-derives on the wing's own stream; an edited row is kept while its eave's length stays within ± `dormerEaveTol`, else orphaned and reported | the undo record keeps the former row | by the wing's key |
| `Porch.kind` | the composer; `setComposition` `porch` | roofscape, drawing, exports | lazy / stored | as dormer rows; side and offset re-read from the main entrance after every carry (the base's rule 3) | restored | — |
| `ComposedTower.base` | the composer (one per tower or turret wing) | plan rung (round wings), roofscape | lazy / stored | follows the tower wing | restored | by key |
| `Composition` as a whole | the `wings` rung (and `rooms` with the plan) | §8.6, the plan rung | the elaboration cache (non-canonical, §2.9); model data once stored | stale → re-derived at the next click (V02 §3.11) | an edit's undo restores the former composition, or removes it when that edit stored it (J-P48 (5)) | §7.5's orphan rule for stored parts |
| the exterior's damage and the ruined look (`ExteriorDamage`, V02 §5.7) | derived at read in the generation worker for each building of a band S14 builds — a full build, a band request, a picture export's transient list — from V06's level, the plan in force and the looks drawn in the view, and again on V02 §5.7 (8)'s changes | its damage marks: the tile rasteriser, the SVG and PNG writers; T-V2-59, T-V2-60 | never stored: no digest, no snapshot field, no cache chunk of its own (the clipped rings memoised beside the roofscape in the tile worker, V02 §6.6; the marks' `revision` kept by the generation worker, 4 B a building) | re-derived with the commit's delta (V02 §5.7 (8)); a Regenerate or New random changes it only through its inputs | — (an undo changes its inputs, never it; its marks re-emitted with the undo's delta) | none |

**The fallback migration row** (a document whose buildings carry no stage-3 fields — from before item 216 reached M1):
each wing's `key` = its index in `Building.wings`; its `role` by the base outline builder's rule — `main` for the first
rectangle (the bar of an L or T) or a row quad, `range` for the other rectangles, `part` for a template or axis-locked
part; `nextWingKey` = the wing count; `massing` absent (read as `baseOutline` with `segments` 1 until an `upgrade`
re-derives S11, a declared shift, §13.3); footprints, heights and roofs unchanged; the canonical order (V02 §2.1) then
holds because the base builder lays no tower. The index-named fields of item 225 need no rewrite: key = index.

**Identity.** A base wing's address is its building's with its key — the sub-record address `('wing', building, key)` —
and it is matched after a re-derivation by §6.3's wing anchor row (item 346). A composed wing, its dormer rows and a composed tower are addressed through the base wing key
they name; the porch by the building; the composer's rooms by the base's `room:<building>/<level>/<i>` (§2.6, §6.3).
No record here stores a stream key or a seed (the base's §2.4).

### 2.6 Stacked tiers and deck buildings — the records (item 110 (c), (d))

Item 110 adds no entity kind. A tier, a shrine and a stair are base wings whose fields say what they stand on and whether
they are solid; a building on a deck is an ordinary building whose `BuildingInput` names its deck. `BaseWing.on`,
`BaseWing.solid`, `MassingRef.stack` and `DeckContext` are declared at §2.6 (items 217, 227, 305); their meanings, writers
and readers:

| field | meaning | written by | read by |
|---|---|---|---|
| `BaseWing.on` | the key of the wing this wing stands on — its floor is that wing's `deckLevel`: tier k ≥ 1 names tier k − 1, the shrine the top tier, stair k ≥ 1 the tier on whose terrace its foot stands; absent: on the ground (every wing of every family but `stepped`) | the massing (V02 §3.15 ST7), the `tiers` op (V02 §4.6), the mutator's stepped rows (V02 §3.15.5); never re-pointed after minting except by those writers | `deriveBase` and `rebaseStack` (item 370), `storeyRange`, the capacity (item 371), the roofscape's occlusion and order (V02 §5.6), the carry check (item 333), the exports, V03's plans of tiers (V02 X18) |
| `BaseWing.solid` | a solid mass with no interior — a stepped pyramid's rubble tier, every stair, an `ovalCourt`'s seating ring: `Heights.floors` 0 and its `eaveCm` its top above its `baseCm`; no storey, room, dormer, porch or capacity | the massing (ST4, ST5; M5's seating ring), the `tiers` op, the mutator (cleared when `stepped → single` keeps a solid tier 0 as a storeyed range, V02 §3.15.5) | `storeyRange`, the capacity, M11, the composer, V03 (no rooms), the exports |
| `MassingRef.stack.shape` | the tiers' plan shape (ST1) | ST7 through `massStepped`; every `tiers` op, bend and stepped mutation | the `tiers` op's re-lay, the why provider, the exports |
| `.stairs` | the stair form laid — after ST3's fallback, so it may differ from the row's; `none` is a sealed stack, lawful only where tier 0 is solid, never a row value, reached only by an edit's bend (V02 §4.6) | as `shape` | ST3, ST5, ST6, `stairChain`, `landingSide`, the entrance hint, V03's `W_TIER_UNREACHED` |
| `.lowerRoof` | every tier's roof but the top's, as laid (a tier's own roof may differ after a `setAttr`, V02 §4.6) | as `shape` | the `tiers` op's re-lay |
| `.top` | the top tier's form | as `shape` | the `tiers` op, the why provider |
| `.insetCm` | the drawn step d (ST1), which the `tiers` op re-uses | as `shape` | the `tiers` op |
| `.grade` | the drawn stair grade (rise ÷ run), which the `tiers` op re-uses | as `shape`; `drawTiers` | the `tiers` op's re-lay |
| `.truncated` | tiers drawn but not laid for want of room (ST3) | as `shape` | the report (`tiersTruncated`), T-V2-46 |
| `DeckContext` | the plot's deck (§2.6): its host, kind (a jetty is a pier; a raised way's deck carries no plot, J-V2.71), `surfaceCm` (`null` exactly for a quay platform built on the bank, which is ground — the terrain datum, the ordinary basement gate and a dig floor — while `kind 'quay'` keeps the `@deck` rows and the deck budget) and `landmark` (a mole-head or mid-mole tower or fort: its class's own rows, no deck budget); a `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot (item 246), so no `DeckContext` names one | S11 at each call, from the plot's deck record (`Plot.deck`, its `landmark` flag) | M1, M10, M11, the datum (item 370), the basement gate (item 305), the dig floor |

```ts
interface TierCells {                         // present exactly on a row whose families include 'stepped' (V02 §3.15.4's load check)
  count: [number, number];                    // continuous: tiers laid, the top one included (≥ 2); drawn uniformly on the integers
  shape: { rect: number; round: number; octagon: number };   // continuous weights
  aspect: [number, number];                   // continuous: the clamp of a rect tier 0's width along the frontage ÷ its depth — the laid aspect
                                              // is the drawn stack's own proportion clamped into this range (ST2; J-V2.86), never drawn
  insetM: [number, number];                   // continuous: the step — how far each tier stands in from the one below on every side
  solid: 'all' | 'lower' | 'none';            // discrete: every tier solid (a stepped pyramid, a ziggurat), tier 0 only (a platform
                                              // under storeyed tiers), or none (a terraced palace, a tiered tower)
  solidHeightM: [number, number];             // continuous: a solid tier 0's height; tier k's × taper^k
  tierFloors: [number, number];               // continuous: a storeyed tier 0's storeys; tier k's × taper^k, rounded stochastically, ≥ 1
  taper: number;                              // continuous: each tier's height as a share of the one below's
  lowerRoof: 'flat' | 'pent';                 // discrete: a walkable terrace (flat, with the family's parapetCm) or a pent skirt rising
                                              // to the tier above (a tiered tower's eaves)
  top: { flat: number; shrine: number; roofed: number };     // continuous weights: the top tier's form
  shrine: { floors: [number, number]; insetShare: [number, number]; roofs: { kind: RoofSpec['kind']; weight: number }[] };
  stairs: 'axial' | 'flights' | 'internal';   // discrete: one straight chain up the front, flights along the faces, or none outside
                                              // (the sealed form 'none' is never a row value — edits only, V02 §4.6)
  stairWidthM: [number, number];              // continuous
  stairGrade: [number, number];               // continuous range: a flight's rise ÷ run, drawn uniformly by ST1, its upper end
                                              // at most the constant stairGradeMax
  heights?: { storeyGroundCm: Cm; storeyUpperCm: Cm };   // read only where no class's HeightsRow is
                                              // passed — a ruin's call (V04) — and only for a shrine's storeys; `stepped-monument` 350 / 300
}
// the construction's contract (V02 §3.15.1; J-V2.80) — all five exported by @plat/plots
declare function massStepped(input: BuildingInput, row: CompositionRow, band: BandRead, k: Kernel): KernelResult<{ wings: BaseWing[]; massing: MassingRef }>;
  // the massing's stepped branch, every step that decides the bytes: V02 §3.4's frontage frame (steps 1–2), slotBand, ST0, drawTiers on
  // `massing` creation indices 8–9, layTiers, ST8, M14's attempts on `massing/attempt=a` (drawTiers re-run on them), then the single
  // fallback (ST8), then the base outline builder's rectangle. The base outline builder calls it from M3a (item 229), stage 3's M5 from
  // M6a; T-V2-46 compares its output. V04 never calls it (no budget, no attempts for a ruin)
declare function slotBand(input: BuildingInput, row: CompositionRow, band: BandRead): { lo: number; hi: number; cap: number };   // m²: M10's band and cap (V02 §3.5 M10), one formula for M3, ST0, ST8 and M10
declare function massOval(input: BuildingInput, row: CompositionRow, band: BandRead, k: Kernel): KernelResult<{ wings: BaseWing[]; massing: MassingRef }>;
  // the `ovalCourt` branch (V02 §3.5 M3, M5, M11–M13), exported beside massStepped so the base outline builder
  // (from M3a, the second fixture's arena) and stage 3's M5 (from M6a) lay the same bytes
declare function drawTiers(cells: TierCells, storeys: { groundCm: Cm; upperCm: Cm }, s8: Rng, s9: Rng): TierDraws;   // ST1: its two draw groups on the caller's two streams
declare function layTiers(input: TierInput): TierLay | TierFailure;          // ST2–ST7: pure — no draw, no budget, no stream
interface BandRead { band: string; value: number /* the manifested band and value, significance-shifted (V02 §3.2 step 3) */ }
interface TierInput {
  frame: { origin: PointCm; u: [number, number]; v: [number, number] };   // the frontage frame: u along the frontage, v inward, origin Rr's near front corner
  region: { W: Cm; D: Cm };                   // the fit rectangle Rr's width and depth
  scale: number;                              // ST8's size factor on tier 0 (1 at the first lay)
  cells: TierCells;                           // the row's cells at the building's band value (V02 §3.2 step 3)
  storeys: { groundCm: Cm; upperCm: Cm };     // the class's HeightsRow storeyCm (massStepped, the tiers op, the mutator) or TierCells.heights (V04)
  pitch: number; parapetCm: Cm; plinthCm: Cm; // M11's one pitch rule; the family's parapet; §2.6's plinth (a ruin passes 0 and 0)
  draws: TierDraws;                           // what drawTiers drew (or, for the `tiers` op, the values it resolved without a draw)
  anchor?: PointCm[];                         // anchored mode (V02 §3.9 W3, the `tiers` op): tier 0's ring is given — four corners (a kept range's
                                              // BaseWing.corners) or a regular ring — and not laid
  forms?: ('axial' | 'flights' | 'internal' | 'none')[];   // the stair forms to try in order; absent: the row's form, then ST3's fallback order
}
interface TierDraws {
  n: number; shape: 'rect' | 'round' | 'octagon'; insetCm: Cm; top: 'flat' | 'shrine' | 'roofed'; stairWidthCm: Cm;
  grade: number;                              // drawn in `stairGrade` (no aspect draw: ST2 derives it, J-V2.86)
  tiers: { heightCm: Cm; floors: number }[];  // per tier in order: floors 0 for a solid tier; heightCm without any parapet (ST4 adds it)
  shrine?: { floors: number; insetShare: number; roof: RoofSpec['kind'] };
}
// `TierLay` and `LaidWing` are §2.7's (V02 §3.15.1 lays them)
interface TierFailure { kind: 'noSecondTier' | 'check'; step: 'ST3' | 'ST6'; detail: string }   // ST3's forms exhausted, or an ST6 check failed
// the deck budget V02 reads — V11's table `deck`, keyed by deck kind × band (V02 X16); V02 declares no row of its own
interface DeckBudgetRead { footprintM2: [number, number]; maxFloors: number }
```

**Derived at read (never stored; exported by `@plat/plots`, built at M3a-V2):**

```ts
declare function deckLevel(w: BaseWing): Cm;   // w.baseCm + w.eaveCm, less the family's parapetCm when w's roof is flat: the floor a wing standing on w has
  // — exact because ST4 adds the parapet to every flat-roofed tier's eave, solid or storeyed, so
  // deckLevel(x) = x.baseCm + x's drawn heightCm for every tier
declare function rebaseStack(b: Building, ground: (p: PointCm) => Cm /* levelledGroundCm(doc, key, ·) on the building's document and arena key (item 309; items 370, 231), never the raster's TerrainSampler */): void;
  // J-V2.81: the building-level datum pass for a building with a wing standing on another — (1) the ground wings by §2.6's
  // terrain rule (item 370; every sample by `ground`), with a deck's surface, a kept user base, item 231's wall-side sample,
  // the crypt lift and the half cellar's raise (item 226); (2) every wing with
  // `on`, in stack order (each after the wing it stands on), baseCm = deckLevel of its support; (3) every stair's ridgeCm re-set to its
  // true rise and `stairSteep` re-tested (V02 §3.15.2); (4) Building.heights by the envelope rule, `floors` included. Every path that
  // re-bases a wing of such a building calls it instead of the per-wing step (item 370), passing `ground` built from its own
  // document and the arena key the building's plot lies on
declare function storeyRange(b: Building, w: BaseWing): [number, number] | null;
  // the storey levels a wing reaches: null for a solid wing; [0, floors − 1] for a storeyed wing on the ground (the base's reading);
  // for a storeyed wing with `on`: [t, t + floors − 1], t = next(on), where next(x) = storeyRange(b, x)[1] + 1 for a storeyed x,
  // next(x.on) for a solid x with `on`, and 0 for a solid x on the ground — so a shrine on a solid pyramid is storey 0, and the
  // tier above a two-storey tier 0 starts at storey 2. Towers, turrets and every other wing: the base's reading, unchanged
declare function stairChain(b: Building): { stair: number; from: number | null; to: number; head: number }[];
  // per stair wing in key order: `from` the wing on whose terrace its foot stands (null: the ground), `to` the tier whose top it
  // reaches, `head` the ring side at its high end (RoofSpec.high); empty for the `internal` and `none` forms and for every other family
declare function landingSide(b: Building, w: BaseWing): number | null;
  // for a storeyed wing with `on`: the side of its ring nearest the head of the stair that arrives on the terrace it stands on
  // (for `axial`, its front side; for `flights`, the side the last flight's head abuts); null for the `internal` and `none`
  // forms — the side where V03 opens its landing door (X18) and, on a solid stack, roots the plan (item 230)
declare function stairTreads(w: BaseWing): { n: number; goingCm: Cm };
  // J-V2.90: the one tread law of a stair wing (role 'stair') — n = ⌈rise ÷ riserMaxCm⌉
  // equal risers (rise = w.ridgeCm, its true rise, which rebaseStack (3) keeps), goingCm = ⌊run ÷ n⌋ (run = the plan
  // distance from the ring side opposite RoofSpec.high to the side `high`, the flight's climb), by §6.5's integer arithmetic; the k-th
  // riser's top at ⌊k × rise ÷ n⌋, the head tread taking the run's remainder (run − n × goingCm). Exported by @plat/plots (the M3a
  // per-wing constructions draw treads, item 419). Read by stairFlight (n − 1 tread lines, V02 §5.6), the glTF, OBJ and CityJSON stair
  // solids (V02 §5.6), V01's stair-flight hatch (V01 §5.1.2) and V03's exterior flights (V03 §5.1; its own goingCm stays for
  // interior stairs). A flight with rise 0 has n = 0 and no treads (a ramp)
```

**Identity and lifecycle.**

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `BaseWing.on` | ST7 (the massing); the `tiers` op; W6 (stepped → stepped) | as the table above | leaf digest | re-derived with the massing by the same draws; a `tiers` edit's result is a fixed input of later S11 runs (the base's pin of edited wings) | restored with the wings | absent on every document from before M3a: every wing on the ground — byte-identical (T-V2-50) |
| `BaseWing.solid` | ST4 and ST5; the `tiers` op (its `solid` field); cleared by `stepped → single`; the `ovalCourt` seating ring (M5) | as above | leaf digest | as `on` | restored | absent before: every wing storeyed |
| `MassingRef.stack` (with `grade`, and `stairs 'none'`) | ST7 through `massStepped`; rewritten by every `tiers` op, bend and stepped mutation | the `tiers` op, the why provider, exports | leaf digest | as the massing; a `tiers` edit's stack is a fixed input of later S11 runs (the base's pin of edited wings) | restored with `Building.massing` | absent before (no `stepped` family existed); **the stack migration row**: a stepped building whose `MassingRef` lacks `stack` (or `stack.grade`) re-derives it at load from its wings — `shape` from tier 0's kind and vertex count (4 → rect, 8 → octagon, else round), `stairs` from the stair wings (`axial` when stair 0's ring is centred on tier 0's centre line, `flights` when it runs along tier 0's face, none with tier 0 storeyed → `internal`, none with tier 0 solid → `none`), `lowerRoof` from tier 1's roof (`flat` → flat, else pent), `top` from the top wing (a shrine → shrine, flat → flat, else roofed), `insetCm` the least ring offset of tier 1 in tier 0, `grade` stair 0's rise ÷ run (none: the row's central grade), `truncated` 0 — the one-time shift reported |
| the `tiers` op's fields (`count`, `insetCm`, `top`, `stairs`, `stairWidthCm`, `shape`, `lowerRoof`, `solid`, `shrineInsetShare`, `centre`, `radiusCm`) | the op; its bends (V02 §4.6) | the re-lay | the event log; the wings and the stack are model data | as V02 §4.4's `setMassing` row | the former wings and `MassingRef.stack` | by the building's address and wing keys |
| the Works heights of a stack | `heightsAt` in stack order (item 318) | §8.4, §11.1, V06 | derived, never stored | per stage | — | — |
| `ovalCourt` wings | the massing; `setMassing family` | as any wing | leaf digest | as the massing | as any wing | none (a new family; the `arena` row's grammar bump is a declared shift for arenas only) |
| `BuildingInput.deck` | S11, per call, from the plot | M1, M10, M11, the datum step, the basement gate, the dig floor | never stored — an input resolved at each call, as `layer` is | re-read at every S11 run on a deck plot | — | — |
| a stacked wing's `Heights.baseCm`, a stair's `ridgeCm`, the stack's envelope (`Building.heights`, `floors` included) | `rebaseStack` (item 370) on every re-basing path — S11, a `setMassing` commit, a tier's height edit, §7.3 (a) 4's terrain operator, §7.4's warp and `moveVertex`, the carry's rule (2), the crypt lift, a deck's re-base | as every wing's; casters, exports, V03, V05 | leaf digest | re-derived by `rebaseStack`, never per wing; a `setAttr` of a stacked wing's `baseCm` bends to its support's height (V02 §4.6) | restored with the wings | none (no stacked wing exists before M3a) |
| a deck building's `Heights.baseCm` | the datum step from `DeckContext.surfaceCm` | as above | leaf digest | re-derived when the deck's height changes (the deck's re-base, item 370) | restored | none |

**Wing roles (the `WingRoleRow` defaults for the three new roles, V02 §3.10.9's list extended).** `tier`: storeys from
`TierCells` (no `storeyDelta`), through 6 (tier 0 runs through at stair 0's butt joint), dormers no, porch yes (a storeyed
tier 0's main door), hipInset .5, **roofKinds** `flat` 1, `hip` 1, `pyramid` 1, `cone` 1 (ST4 picks by the tier's place
and shape; W5's "first allowed kind" is `flat`); `shrine`: storeys from `TierCells.shrine`, through 0, dormers no, porch
no, roofKinds the kinds of `TierCells.shrine.roofs` (default `hip` 1, `pyramid` 1, `gable` 1); `stair`: floors 0, roofKinds
`shed` 1, through 0, dormers no, porch no.

## 3 Generation

### 3.1 Where stage 3 runs

| step | when | where | eager / lazy | output | stream |
|---|---|---|---|---|---|
| the **massing** (`outline()`) | S11, once per building, inside the block's batch (§4.7 S11), and inside every operator that re-derives S11 on a plot — Regenerate, New random, a designation mutation's add step (V02 §3.9), `build`, `fill`, a terrain or water operator's re-fit (§7.3) | the derivation pool (or the generation worker), `@plat/buildings` | **eager** — model data | `Building.wings` with roles and keys, `Building.massing`, `nextWingKey`; then S11's base steps (insertion and first carry, `deriveBase`, `deriveEntrances`, the basement decision, the yard partition, the households fill) | `massing` (V02 §3.12) |
| a **`setMassing` commit** (V02 §4.2) | the event's fold | where the event folds | eager | the edited wings as S11's fixed input, then S11's base steps as above | none for the geometric ops; the `family` op on `siteplan.mutate` (V02 §3.12) |
| the **composer** (`compose(…, 'wings')`) | the `wings` rung: a neighbourhood click (II.4), a building click when `wings` is absent or stale, a visible tile **at the neighbourhood band or finer** under `elaborate: 'view'` (§4.1; the district band draws the massing's roofscape, which needs no composition, and requests nothing — V02 §6.2), an export that asks for compositions (V02 §5.5) | the derivation pool | **lazy** — the elaboration cache until an edit stores it | `Composition` with composed wings, towers, dormer rows, the porch | `compose.dormers`, `compose.porch` |
| the **rooms** rung (`compose(…, 'rooms')`) | only as the plan rung's input, on the building click that derives the plan (J-V2.9) | the derivation pool | lazy | `Composition.rooms`: hall, gate hall, chapel, tower rooms | `compose.rooms` |
| the **roofscape** | every draw of a building at the district band and finer; the surface layer; 3-D exports | the tile worker (drawing), the generation worker (exports) | derived at read | `RoofFacet[]` | none (no draws) |
| the **exterior's damage** (`exteriorDamage`, V02 §5.7) | every band S14 builds at the district band and finer — a full build, a band request, a picture export's transient list — and V02 §5.7 (8)'s re-emissions | the generation worker (S14) | derived at read — view data | the building's damage marks (V02 §5.7 (8)) | none (its thresholds keyed, §6.3; its rubble on the render key, §8.10) |
| the **wing step of the designation mutator** | every designation change (§4.7 S11 steps 1–7) | where the causing event folds | eager | the recorded wing steps | `siteplan.mutate` (the base's) |

**Registration.** `@plat/buildings` registers `ComposedBuildingGenerator` under the id `composed` in
`StrategyRegistry.building` (§14); from stage 3's landing the recipe's building strategy defaults to `composed` for new
documents, and a document keeps the strategy its recipe names (§7.5). The generator's `plan()` delegates to the
registered plan implementation (V03). **Under the `MFCG` and `FTG` parity presets the massing takes the family
`baseOutline` for every class** — the one option cell `massing.composed` (`extension: { over: 'both', mode: 'option' }`,
on by default) is off there — so the parity presets keep the base outline builder's footprints byte for byte (T-V2-26)
and §13.5's MFCG and FTG rows are unaffected.

### 3.2 The row a building reads, and its band

1. **Class.** S10b's class-mix draw (item 71) or the assignment's `shapeClass` gives the class; the slot's structure
   gives the slot role (§4.7 S11). A clandestine front's building reads the front's row (item 63 (4)); the concealed use
   adds nothing to the massing or the composition (its rooms and door are the plan's and the entrance set's). Four owner
   rules of 2026-09-28 decide which class a building composes as (V02 §3.14):
   * **split works-and-shop sites** (item 105 (h)): a building whose use has `branchOf` composes as the class's
     `split.shop` template family, the works building as its `split.works` family (V11 §2.3's `split`);
   * **ladders** (item 108): a COUNT, QUARTER or GUILD member is an ordinary building of the lesser class
     (`LadderStepRow.memberClass`); a GUILD's hall composes as the `hall` family; a SIZE building composes as the greater
     class with `sizeFactor` in M10;
   * **custom institutions** (item 104): the class DR24 resolved from the custom record's scene archetype, category,
     tags or fallback (V11 §3.13.2), composed like any class of that id;
   * **subsumption** (item 104 (h) (5), item 108): a subsuming kind's building takes the subsumed kinds' structures as
     extra slots (V02 §3.14.2).
2. **Row key — the resolution chain (stated once; J-V2.34).** The chain stops at the first key whose row exists and
   satisfies the arrangement law for the compiled template's `arrangement` at this band (V02 §3.10.7); a row that exists
   but breaks the law is skipped and reported at load (`arrangementSkip`, T-V2-33).
   * *The main slot* (the template's first required structure):
     1. `DesignationTemplateRow.composition` (item 426), when the template names one;
     2. `<class>/<band>` — a class override row (V02 §3.10.3);
     3. for a `v.` class (V07 §2.4): `composition.classFamily[<v. key>]` (V02 §3.10.5; a town class at a village rung plays its
        `villageForm`'s `v.` class, V11 §3.22, and never reaches this step by its town id);
     4. `<templateFamily>/<band>` — `BuildingClassRow.templateFamily` (V11 §2.3), which S11's composition resolution
        reads (V02 X1);
     5. `default.<arrangement>/<band>` (V02 §3.10.6).
   * *Any other slot* `structures[i]`:
     1. `structures[i].composition` (item 426);
     2. `<key>/<band>` where `key` is `composition.roleKeys[(templateFamily, name)]`, else `[('*', name)]` (V02 §3.10.4) —
        a key naming a family or class row reads that row (an outbuilding `house` reads `dwelling-detached`);
     3. `outbuilding/<band>`.
   * A structure whose role key is `yardPart` or `basement` has no building and never reaches `outline()`; one whose
     `attach` is `main` is laid by the main slot's massing (M8b) and has no slot of its own (item 304).
   * **The underground layer.** When the plot lies on the underground layer — II.7.3's sewer-front plots, II.7.5's
     undercity, item 109 (j) (4)'s cavern and ruin dwellings — `@underground` is appended to the resolved key, and the
     `<prefix>@underground/<band>` row is read where it exists, else `default.underground/<band>`. The layer reaches
     `outline()` as `BuildingInput.layer` (item 303), written by S11 from the plot's layer.
   * **Decks (item 110 (d)).** When the plot lies on a deck (`BuildingInput.deck`, item 305) and is not a
     placed landmark, `@deck` is appended to the resolved key: the `<key>@deck/<band>` row is read where it exists, else
     `default.<arrangement>@deck/<band>` (V02 §3.16). A landmark reads its class's chain unchanged; a deck plot is never on
     the underground layer.
   * **The rung ceiling (item 115; J-V2.110).** A **dwelling** — a building whose use's class has the profile family
     `housing` (V11 §3.5.3; V07 §2.4's `v.` rows of that family) — whose class is not in `grandeur.ceiling`'s
     `settings.grandClasses` (V11 §3.25.4: the manor and the other lords' and rulers' houses, whose number and presence
     S10b's manor rule decides, §4.7 S10b *Class mix* (3)) reads its resolved row **capped** by the ceiling row of the rung
     in force — the document's (§1.1) at generation, the epoch's at an epoch (V06 §3.8.5) — and S11 passes the capped key in
     `BuildingInput.compositionRow` (§4.7 S11 *Footprints and heights*). A row caps only where it is `enabled` and limits
     something — `dwellingFamilies` not `'all'`, or one of `towers`, `turrets`, `gatehouse` and `courts` false: as shipped,
     the THORP, HAMLET and VILLAGE rows. Every slot of a capped dwelling's site then reads its row with:
     1. `families` keeping a family only where `dwellingFamilies` lists it (as shipped `single`, `L`, `T`) or it is one of
        the arrangement's own constructions (`row`, `shelter`, `template`, `axisLocked`, `baseOutline`), and never a closed
        family (`MassingFamilyRow.closed`) where `courts` is false nor `towerHouse` where `towers` is false; M4 renormalises
        the kept weights as for any row. Where no kept family has a positive weight, the families of
        `default.<arrangement>/<band>` (with the same suffix) capped the same way, else `baseOutline`, reported
        `ceilingEmpty`; where an assignment's `DriftBounds.families` (§2.6) admits none of the kept families, the drift's
        families are read uncapped — a declared bound, the ceiling a default (item 101 R2);
     2. `towers` [0, 0], `towerOnBlock` and `crossingTower` 0 and `westTowers` [0, 0] where `towers` is false; `turret` 0
        where `turrets` is false; `gateTower` 0 where `gatehouse` is false, a slot whose role key is `gatehouse`
        (V02 §3.10.4) then reading `outbuilding/<band>` (a plain range, no gate hall);
     3. a chain step whose key is a `grandClasses` class's override row (`manor/<band>`) skipped, the chain reading on.
     Every other cell — sizes, widths, lengths, blocks, back ranges, roofs, dormers, porches, hearths, the cupola, the
     rooms — stays the row's, so wealth shows as larger ranges, more outbuildings, dormers, porches and hearths and better
     roofs inside the capped row (item 115 (a)), and DR6's wealth moves a dwelling only along it, the richest dwelling its
     rich anchor (item 115 (d)). A row `enabled` false, or one that limits nothing (TOWN, CITY, METROPOLIS), caps nothing
     and writes nothing, so those rungs stay byte-identical (item 115 (f); T-V2-58). A capped key is the resolved key
     followed by `~<RUNG>`, the rung it was capped at (`dwelling-compound/rich~HAMLET`); a key without the suffix is
     uncapped, as every key written before item 115 is (no migration row).
     **Unless specified** (item 115 (c)): a `grandClasses` building — one S10b admits, or one the dossier specifies
     (V08 §3.16 (3)) — reads its full row at every rung, and a hand design is never capped: a T6 placement of a
     `grandClasses` class and every `setMassing` and `setComposition` op (V02 §4.2, V02 §4.3; a `family` op lays the asked family from the
     building's row uncapped) are committed as asked — the ceiling is a default, never a refusal (item 101 R2) — the why
     fact `massing/ceiling` (V02 §4.5) naming the exception and V09 §4.21.5's `info.grand.beyondTier` or
     `info.grand.dossier` line saying that the building exceeds the tier's usual (V10 tells it).
     **Over epochs** (item 115 (e)): the ceiling is read where the chain is resolved — at generation, for a building new or
     rebuilt, a mutation's target (V02 §3.9) and New random on its plot (§7.1) — at the rung in force then; a re-derivation that
     keeps a building standing (a carry, a terrain or water operator's re-fit) reads the ceiling of the rung its stored
     `MassingRef.row` records, so a rung's crossing reshapes no standing building, up or down (V06 §3.8.5 (1)–(2)).
   The key reached is written to `MassingRef.row` and `Composition.row`, so the why provider and the report name it.
3. **Band.** Every geometry cell of the row (families, widths, lengths, blocks, towers, roofs, dormers, porch,
   hearths, coverage — item 31's geometry columns) is read at the plot's **manifested** band and value (§4.11's floor
   rule: `max(field band, geometryFloor)`); continuous cells interpolate between the band rows' centres along the value
   (§4.5's interpolation), discrete cells read §4.5's discrete-cell rule (item 19). The district's band range (item 72,
   §4.5 (5)) clamps the value first. **The `rooms` cells are the exception: they are read at the occupants' band** — the
   plot's `fieldBand` and the current field value, as the programme is (J-A19.43) — because the composer's rooms are the
   interior's, which reads who is there (item 28 (f); V02 §3.8; J-V2.36).
   **Significance.** For every geometry cell and M10's budget, the value is shifted by `0.5 × bandWidth × log2(σ_use ÷
   σ_class)` before interpolation — `σ_use` the use's resolved significance (§4.5 (1), with V11 §3.13's landmark and
   `economicWeight` factors), `σ_class` the class row's — clamped to at most one band's width up and
   never below the plot's own value (a significance below the class's never shrinks a building). So a landmark custom
   guildhall composes one band richer than an unmarked one (T-V2-38; J-V2.43).
4. **Scale and drift.** Every length cell is multiplied by the district's `buildingScale` (§2.5); an assignment's
   `DriftBounds` (§2.6) filters `families` and roof kinds and clamps the footprint target and the floors.
5. **Presets.** The document's preset resolves each cell by §7.6's order; the building-scope `FM` preset (item 376)
   resolves only the cells that carry a `presets.FM` entry — `composition.json`'s (V02 §3.10.8) and V11 §3.24.0's
   item-110 chance and offer cells (0) — and sets `fantasyShapes` on; it zeroes no `extension` cell and changes nothing
   else.

### 3.3 The massing families — the vocabulary of plans

| family | historical type (12th–15th-century Western Europe, the design's centre of gravity, D-7) | construction (V02 §3.5 M5) | joints | wings | closed | source |
|---|---|---|---|---|---|---|
| `single` | the one-range house: hovel, cottage, open-hall house, warehouse, chapel nave | one range along the frontage (eaves to the street), or across it with its gable to the street where the frontage is narrow | — | 1 | no | own |
| `L` | a range with a wing back into the plot (a street range with a kitchen or shop range behind) | front range through, one side range abutting it | butt | 2 | no | own |
| `T` | a hall with one cross-wing (a solar or service end) | the cross-wing runs through the hall's end, reaching forward and back | butt | 2 | no | own |
| `H` | a hall with two cross-wings (the late-medieval hall house of a gentleman or merchant) | two cross-wings through both ends | butt | 3 | no | own |
| `U` | three ranges round a yard, open to the rear (a street range with two back ranges) or to the front (a forecourt before the hall) | a through range and two abutting arms | butt | 3 | no | own |
| `cross` | a cross-shaped hall or institution (a main range crossed at its middle; NG's cross plans, C2) | a main range and one cross slab through its middle; `WingRoleRow.through` decides which runs through | butt | 2 (3 pieces) | no | own |
| `rectCourt` | the courtyard house, the courtyard inn, the college court | four ranges round a rectangular court; the front range is the `gate` range | butt | 4 | yes | Fantasy Manor's rectangle family (P21), fitted; our id |
| `plotRing` | the urban courtyard house that follows an irregular plot | four to eight ranges along the plot's boundary inset by half a wing width | mitre | 4–8 | yes | own — the realistic reading of Fantasy Manor's irregular closed plan |
| `gridWalk` | the accreted house: ranges added over time along a winding line | a self-avoiding walk on a grid fitted to the plot | butt | 1–8 | no | Fantasy Manor's grid-walk family (P21), fitted; our id |
| `towerHouse` | a tower house with an attached range; a tower mill; a bottle kiln; a polygonal chapter house | a square, round or octagonal tower mass at a front corner with an optional range (none where the row's `rangeLenM[1]` is 0) | butt / overlap | 1–2 (+ tower) | no | own |
| `regularCourt` | the regular polygonal court (chapter houses, fantasy manors) | a regular 4-, 5-, 6- or 8-gon ring, one side parallel to the frontage | mitre | 4–8 | yes | Fantasy Manor's regular family (P21) — `fantasy`; our id |
| `starCourt` | the irregular star-shaped court of fantasy manors | four to six corners at jittered radii inside their sectors | mitre | 4–6 | yes | Fantasy Manor's irregular closed family (P21) — `fantasy`; our id |
| `chordArc` | a curved range of equal chords | the first chords of a regular polygon, its convex side to the street | mitre | 2–7 | no | Fantasy Manor's open-chain family (P21) — `fantasy`; our id |
| `row` | a row house, a shopfront, a warehouse front | the row arrangement's clipped quads, unchanged, plus an optional back range | — | 1 (+ back) | no | the base (§4.7 S11) |
| `template`, `axisLocked`, `baseOutline` | churches, cathedrals, cloisters, castles; the parity presets; the last fallback | the base outline builder's constructions (§2.6), unchanged, plus M8 (e)'s west and crossing towers and M8b's attached structures | as built | as built | as built | the base |
| `shelter` | a tent, a shack, a lean-to | the cluster packer's structure, unchanged | — | 1 | no | the base (§4.7 S11, item 70) |
| `drawn` | a footprint drawn by hand | one wing: `rect` if the ring passes §3.8's near-rectangle test, else `polygon` with a `skeleton` roof | — | 1 | — | the base (§7.1) |
| `stepped` | the stepped temple, the ziggurat, the terraced palace, the tiered tower; an ancient ruin's stepped monument | `massStepped` / `layTiers` (V02 §3.15.1): tiers stacked by `on`, each inset from the one below, stairs up the faces, a flat, shrine or roofed top | tier 0 and stair 0 butt; the rest stacked | 2–9 tiers (+ stairs, shrine) | no | item 110 (c); own |
| `ovalCourt` | the amphitheatre: an arcaded outer wall of storeys round solid seating banks and an open floor, entered by gate passages at the ends of its long axis | two concentric rings of mitred `quad` slabs on an elliptical chord polygon (V02 §3.5 M5): an outer storeyed façade ring and an inner `solid` seating ring, sharing their vertices; the hole is the floor | mitre | 24–40 (two rings of 12–20) | yes | own (not fantasy: J-V2.84) |

**Our ids for the reference's families (J-V2.47).** `regularCourt`, `starCourt`, `chordArc`, `rectCourt` and `gridWalk`
are our own names; the base's item-59 `PathShapeRow` ids map to them through item 221's table-migration row, applied
before M6 ships any document, so no reference routine name survives in a table, an export or a document.

**Fantasy shapes are a toggle (J-V2.5).** The three `fantasy` families carry weights in the `manor`, `hall`, `tower` and
`mage_tower` rows, multiplied by the view-independent model option `fantasyShapes` (a recipe parameter with its
§7.8 control-registry row, item 402; **off by default**, the owner's "realism in the base, fantasy as toggles", D-7) —
off, they are never drawn; on, at their row weights; the `FM` preset sets it on with Fantasy Manor's equal weights.

### 3.4 Fitting to the plot — the frame and the region

The massing works inside the **slot hint** `H` (`SlotPlan.hint`, §2.5): the region S11's site plan gives the slot,
already behind the front-line recession (item 43) and the template's setbacks, inside the plot and clear of every
other slot. Nothing the massing makes leaves `H` (T-V2-1), so nothing leaves the plot or reaches a way.

1. **The frontage direction.** `f` is the unit direction of the longest access segment among those the slot's
   `entranceOn` names (the street for a front slot; the court or the path from the plot's gate for a set-back slot;
   the passage or court for a hidden plot's), ties by segment index; its length by `sqrt` only. `n`, the inward normal,
   is `f` turned a quarter turn toward `H`'s area centroid. The frame is (`u` along `f`, `v` along `n`), origin at the
   access segment's first end; coordinates are dot products (§6.5's `+ − × ÷ sqrt`).
2. **The fit rectangle.** `Rr = lir(H, (f, n))` (§3.4's largest inscribed rectangle on the given axes): width `W` along
   `u`, depth `D` along `v`, its **front** the side nearest the access segment. Rectilinear families are laid inside
   `Rr`; `plotRing` follows `H` itself (M5); the fantasy families fit in the ellipse inscribed in `Rr`.
3. **The wing width** `w` is drawn in the row's `wingWidthM` and clamped: `w ≤ D` (a single range across `u`), `w ≤ W`
   (across `v`), `w ≤ (min(W, D) − courtMinM) / 2` for a closed family; a family for which the clamped `w` falls below
   `max(0.8 × wingWidthM[0], 3 m)` is infeasible (M3).
4. **Orientation is the frontage's** (item 59, KEEP OURS), never a random angle; the fantasy families' phase puts one
   side parallel to the frontage and nearest it. Two realism laws of a row's `axis` cell replace the frontage direction
   for their classes (M2; J-V2.41): `fallLine` (a longhouse's range runs down the slope, its byre end downhill — V07's
   hard rule) and `water` (a watermill's or a landing's long side parallel to the water it works).
5. **Rows are already fitted.** A row arrangement's quads are `plot ∩ frontage band` (§4.7 S11) and arrive as
   `fixedWings`; only the back range is laid (M9), inside the **back region**: the plot ∩ the band behind the quad's rear
   chain, of depth `max(0, coverage × plotArea ÷ frontage − rowDepth)` (`coverage` the template's, `rowDepth` the quad's
   mean depth along `n`), clipped to `H` — so the template's coverage and its rear yard hold.

### 3.5 The massing — `outline()`, step by step

`outline(input, k)` is **the add step of V02 §3.9 from the empty design** (the base's "one path", §4.7 S11 step 7): a
generation run and a later mutation lay wings with the same functions. Inputs: `BuildingInput` (the slot hint, the
access segments, the context vector, the class, the drift, `fixedWings` for a row or a cluster structure, the terrain
sampler, the resolved row key and bands, the layer and the attached structures of item 303 and item 304). Output:
`KernelResult<{ wings: BaseWing[] }>` plus the `MassingRef` S11 writes with them. Constants are named in the row or in
the constants table (V02 §3.10.9); every draw is on the `massing` stream with the step's creation index (V02 §3.12).

* **M0 — pass-throughs.** (a) *Row:* `fixedWings` (one quad, or stepped quads on a slope) are returned unchanged with
  role `main` and keys in their order; M9 may add a back range; M11–M12 give heights and roofs; the entrance hint is
  `null` (the base's rule 1 puts the door on the flush front); `segments` 1. (b) *Shelter:* the cluster packer's structure
  arrives as one fixed wing (item 303): role `shelter`; roof `tent` for a tent (a `polygon` ring), `shed` for a lean-to
  with `high` on the side against its host wall, `gable` or `shed` for a shack by the row's weights. (c) *Drawn:* V02 §3.3's
  `drawn` row. (d) *Institutions:* a row whose drawn family is `template` or `axisLocked` runs the base's construction
  (§2.6) and labels its parts `part` (a template part that is a tower in the template's own rows takes `tower`); M8 (e)
  adds its west and crossing towers, M8b its attached structures (a church porch), M11–M12 as below. (e) *`baseOutline`:*
  the base's rectangle, L or T (§2.6), roles `main` and `range`. (f) *Underground:* an `@underground` row (V02 §3.2 step 2)
  lays `single` with a `flat` roof and nothing more; V04 and V05 own the vaults around it.
* **M1 — the row.** V02 §3.2.
* **M2 — the frame.** By the row's `axis` (discrete; J-V2.41):
  - `frontage` (the default): V02 §3.4 steps 1–2 — `f`, `n`, `Rr`, `W`, `D`.
  - `fallLine`: the terrain sampler's gradient at `H`'s area centroid (central differences at ± `axisSampleM` 2 m, the
    base's sampler, §2.3) gives the slope `s` and the downhill unit direction `g`. Where `s > axisSlope` (3 %; own, V07's
    longhouse rule), the frame is `u = g`, `v = g` turned a quarter turn toward the access segment's side, `Rr =
    lir(H, (u, v))`, its front the `Rr` side nearest the access segment; the main range is laid **along `u`** (for
    `single` the "along" mode whatever the frontage), and its downhill end (the ridge end with the larger `u`) is written
    to `MassingRef.low`. Where `s ≤ axisSlope`, the `frontage` frame.
  - `water`: the nearest edge of a water face (§2.7's water bodies and carved channels, including a mill's leat) within
    `axisWaterM` (50 m; own) of `H`'s centroid gives `u` along that edge; `v` points away from the water; `Rr =
    lir(H, (u, v))`, its **water side** the `Rr` side nearest the edge; the main range's long side is laid on the water
    side. With no edge within reach, the `frontage` frame. In both non-frontage frames the entrance hint (M13) is the main
    range's long side nearer the access, kept by `entranceHintMinCos` like any hint (an access-less side is `null`, and the
    base's entrance rule decides).
* **M3 — feasibility.** For each family of the row with weight > 0 (after `fantasyShapes`, the drift's `families` and
  `massing.composed`), with `w₀ = max(0.8 × wingWidthM[0], 3 m)`:
  1. *Geometry:* `W ≥ minFrameW[0] × w₀` and `D ≥ minFrameW[1] × w₀`, and, for a closed family, `W − 2w₀ ≥ courtMinM` and
     `D − 2w₀ ≥ courtMinM`. The default `minFrameW` (in wing widths, along × into): `single` 1.2 × 1; `L` 2 × 2; `T` 2.4 × 2;
     `H` 3.4 × 2; `U` 3 × 2.2; `cross` 3 × 3; `rectCourt` 3 × 3; `plotRing` 3 × 3; `gridWalk` 2.6 × 2.6; `towerHouse` 1.2 ×
     1.2; `regularCourt`, `starCourt` 3.2 × 3.2; `chordArc` 2.6 × 1.6; `stepped` ST0's test instead (V02 §3.15.1);
     `ovalCourt` its own test: with `c₀ = caveaM[0]` and `c = courtMinM`, the least ellipse `b₀ = w₀ + c₀ +
     c/2`, `a₀ = 1.15 × b₀` (the least axis ratio), feasible when the longer side of `Rr` is at least `2a₀` and the shorter at
     least `2b₀`.
  2. *Budget (J-V2.35):* the family's **least footprint** `Amin` (closed form, at `w₀`, the row's least lengths and
     `courtMinM`; `f₀ = crossWing.fwdM[0]`, `b₀ = crossWing.backM[0]`, `c = courtMinM`, `gap₀ = max(walkGapM, 0.3w₀)`):
     `single` 1.2w₀²; `L` 3w₀²; `T` 2.4w₀² + w₀(f₀ + b₀); `H` 3.4w₀² + 2w₀(f₀ + b₀); `U` 5w₀²; `cross` 5w₀²;
     `rectCourt` S² − (S − 2w₀)² with S = max(2w₀ + c, 3w₀); `plotRing` (c + 2w₀)² − c²; `gridWalk` w₀(w₀ + gap₀);
     `towerHouse` 1.44w₀², plus w₀ × max(1.5w₀, rangeLenM[0]) where `rangeLenM[0] > 0`; `regularCourt` and `starCourt`
     2n·tan(π/n)·(c/2 + w₀/2)·w₀ with n the least side count of weight > 0; `chordArc` chords[0] × 1.5w₀²; `row`,
     `template`, `axisLocked`, `baseOutline`, `shelter`, `drawn` — no test; `stepped` ST0's `Amin` (V02 §3.15.1);
     `ovalCourt` `π(a₀b₀ − (a₀ − w₀ − c₀)(b₀ − w₀ − c₀))`. The family is **infeasible when `Amin > 1.1 ×
     hi`**, `hi` `slotBand`'s upper target for this slot (M10).
* **M4 — the family.** One draw (creation index 0) over the families feasible by both tests, weights renormalised;
  ties in weight keep the row's order. Where some families pass the geometry test but none the budget, the one with the
  least `Amin` is taken without a draw and reported (`overBudgetFamily`; M10 then shrinks it). No family passing the
  geometry test → M14's ladder from rung 2.
* **M5 — the path and the slabs**, in the frame, lengths in cm; `u₀` and `v₀` are `Rr`'s near corner and front; `w` is
  drawn (creation index 0, after the family) and clamped (V02 §3.4 step 3); every length cell is drawn uniformly in its
  range (creation index 1, in the order the family's paragraph names its draws). **The sunlit choice (item 102 (d);
  J-V2.38):** where a family draws a coin between two mirror options — the `L`'s arm end, the `T`'s cross-wing end, the
  `U`'s opening (front or rear, its base chance `uOpenFront`), the `towerHouse`'s corner — each option has an **open
  vector** `o` (the `L`: from the arm toward the front range's free end; the `T`: from the cross-wing toward the hall's free
  end; the `U`: `−v` for a forecourt, `+v` for a rear court; the `towerHouse`: from the tower toward its range's far end),
  and its weight is multiplied by `sunBias` when `o · sunDir > 0.25`, by `1 − sunBias` when `o · sunDir < −0.25`, and left
  as it is otherwise, then renormalised; `sunDir` is the plan direction of the noon sun — `(0, −1)` (south, `+y` north,
  §2.1) where the settlement's latitude — §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50), the latitude item
  102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg` — is positive, `(0, +1)`
  where it is negative, none at 0. `sunBias` is 0.7 (own, `extension`) and 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets (each zeroing preset
  carries its entry, since the zeroing's 0 would weight every sun-facing option by 0), where the coin is byte-identical to the unbiased one; orientation by the frontage (or the row's axis) is never changed.
  - `single`: if `W < gableToStreetMaxFrontM` and `D ≥ W`, the range runs **across** the frontage (gable to the street):
    length `L = clamp(rangeLenM, 1.2w, D)`, the slab `[u₀ + (W − w)/2, u₀ + (W + w)/2] × [v₀, v₀ + L]`; otherwise **along**
    it: `L = clamp(rangeLenM, 1.2w, W)`, the slab `[u₀ + (W − L)/2, u₀ + (W + L)/2] × [v₀, v₀ + w]`. Under the `fallLine`
    and `water` axes always along `u`.
  - `L`: front slab `[a, a + Lf] × [v₀, v₀ + w]` with `Lf = clamp(rangeLenM, 2w, W)`, `a = u₀ + (W − Lf)/2`; a coin (left
    or right end) and `Ls = clamp(rangeLenM, 2w, D)`; the side slab `[end − w, end] × [v₀ + w, v₀ + Ls]` (right) or
    `[a, a + w] × …` (left). The front slab runs through (role `main`), the side abuts it (role `range`).
  - `T`: `fwd`, `back` from `crossWing`; hall slab `[a, e] × [v₀ + fwd, v₀ + fwd + w]` (role `main`); cross slab
    `[e, e + w_c] × [v₀, v₀ + fwd + w + back]` (role `cross`, `w_c = w`), `e − a = Lh = clamp(rangeLenM, 1.4w, W − w)`,
    `a` centring the whole in `W`; a coin puts the cross-wing at the left or the right end. Needs `fwd + w + back ≤ D`,
    else `fwd` and `back` shrink proportionally to fit, and the family fails M3 when they reach 0.
  - `H`: as `T` with a cross slab at each end; the hall between them; `Lh + 2w ≤ W`.
  - `U`: a coin with `uOpenFront` decides the opening; `Lf = clamp(rangeLenM, 3w, W)`, `Ls = clamp(rangeLenM, 2w, D)`.
    *Open to the rear:* front slab `[a, a + Lf] × [v₀, v₀ + w]` (through, `main`), arms `[a, a + w]` and `[a + Lf − w, a +
    Lf]` × `[v₀ + w, v₀ + Ls]` (`range`). *Open to the front (a forecourt):* back slab `[a, a + Lf] × [v₀ + Ls − w, v₀ +
    Ls]` (through, `main`), arms from `v₀` to `v₀ + Ls − w`; the entrance hint then names the back range's side facing the
    frontage, across the forecourt.
  - `cross`: main slab `[a, a + Lm] × [c − w/2, c + w/2]` with `Lm = clamp(rangeLenM, 3w, W)`, `c = v₀ + Lc/2`; the cross
    slab `[a + (Lm − w)/2, a + (Lm + w)/2] × [v₀, v₀ + Lc]` with `Lc = clamp(rangeLenM, 3w, D)`. The main range runs
    through (role `main`); the cross slab is laid as two pieces abutting it on each side (role `cross`, keys consecutive),
    so the family lays three wings in two path segments.
  - `rectCourt`: `Lf = clamp(rangeLenM, max(2w + courtMinM, 3w), W)`, `Ld` likewise on `D`; path order front, rear, left,
    right, so the front and rear slabs run through and the two side slabs abut both; the court is the inner rectangle, at
    least `courtMinM` a side.
  - `plotRing`: `H` simplified toward at most 8 vertices at tolerance `w/4`, **removing only a vertex whose removal keeps
    the simplified ring inside `H`** (the new edge tested against `H`'s ring with `orient2d`, §3.2); each edge's line
    moved inward by `w/2`; consecutive moved lines intersected (2 × 2 solves) give the path `Q`. Rejected (a new attempt,
    M14, which **draws `w` afresh** on `massing/attempt=a`) unless `Q` is simple, every edge ≥ 1.5w, every interior angle
    ≥ `mitreMinDeg` (60°), and `Q` inset again by `w/2` leaves a court every side of which is ≥ `courtMinM`. One slab per
    edge with mitre joints; the edge nearest the access segment is the `gate` range.
  - `gridWalk`: a `g × g` grid (`g = gridCells`, 4) fitted to `Rr` with pitch `p = min(W, D)/g`, required `p ≥ w +
    max(walkGapM, 0.3w)` (else `g` drops by one, to 3, else infeasible); the walk starts on a random cell of the front
    row (the row nearest the frontage); at each step it stops with chance `min(1, walkStop × max(0, segments −
    walkFree))` (`walkStop` 0.12, `walkFree` 0; own — the walk may stop after its first segment and is certain to stop
    only at nine; the `FM` values calibrated at M6c against the reference's segment distribution, V02 §7.4), else tries the
    unvisited in-bounds neighbours in an order drawn once per step and takes the first; collinear steps merge. A walk
    that cannot move from its start cell yields `single`. One slab per segment; at each turn the earlier segment runs
    through.
  - `towerHouse`: a coin (left or right front corner) and the tower's shape by `towerShape`; a square tower is a `rect`
    slab of side `t = clamp(1.2w … 2w)` at that corner (role `tower`, roof `pyramid`); a round one a `polygon` ring of
    radius `t/2` there (role `tower`, roof `cone`); an octagonal one an 8-gon of circumradius `t/2`; where the row's
    `rangeLenM[1] > 0` an attached range (role `main`) of length `clamp(rangeLenM, 1.5w, W − t)` runs along `u` from the
    tower (square: abutting it, butt; round or octagonal: overlapping it by `0.35 × t/2`, as M8's attachment). With no
    range the tower is the whole building (a tower mill, a bottle kiln, a polygonal chapter house).
  - `regularCourt` (fantasy): side count by the row's `sides` weights; circumradius `R = (min(W, D) − w)/2 × U(0.8, 1)`;
    centre at `Rr`'s centre; vertices at `R` and angles `θ₀ + 2πk/n` by `dmath` (§6.5) with `θ₀` putting one side parallel
    to `f` and nearest the frontage; mitre joints.
  - `starCourt` (fantasy): corner count by weights; each corner's radius `R × U(0.55, 1)` and angle `θ₀ + (k + U(0.25,
    0.75)) × 2π/n`; mitre joints; rejected (M14 attempt) when an interior angle is below `mitreMinDeg`.
  - `chordArc` (fantasy): `k` chords by `chords`, the polygon order `m = U{k + 1 … 8}`; the first `k` chords of a regular
    `m`-gon, scaled so the chain's bounding box fits `Rr` less `w/2` on every side, its convex side toward the frontage;
    mitre joints; free ends square.
  - `stepped`: **`massStepped`** (V02 §3.15.1) — the one exported function the base
    outline builder also calls from M3a — which runs this frame, `slotBand`, ST0 (M3 for `stepped`), `drawTiers` on creation
    indices 8–9, `layTiers` (ST2–ST7), ST8 (M10 for `stepped`) and the stepped attempts (M14 for `stepped`, on
    `massing/attempt=a`) itself and returns the wings and the `MassingRef`. Its ST4 gives the wings' heights and roofs (M11
    and M12 are not run on them, and no cupola is drawn), ST6 and ST7 its checks, keys and hint (M13's); M7–M9 lay nothing
    (no block, tower, turret or back range). Of M8b's attached structures an `absorbed` one adds its budget share and lays
    nothing; any other is dropped and reported (`attachedDropped`).
  - `ovalCourt` (own) — **`massOval`**, exported by `@plat/plots` beside `massStepped` and called
    by the base outline builder from M3a (the second known-city fixture's arena, item 229) and by this step from M6a, so
    both builders lay the same bytes; it runs this frame, `slotBand`, M3's `ovalCourt` test, the construction below, M11's
    and M12's `ovalCourt` rules and M13's checks, falling to `rectCourt` (from M6a; the base's court-institution
    construction at M3a) when they fail: `w` drawn at creation index 0 as for every family (the façade's width);
    then at creation index 1, in this order, the major semi-axis factor `U(0.85, 1)`, the axis ratio `ρ = U(1.15, 1.4)` and
    the seating depth `c = U(caveaM)`. The major axis runs along the longer side of `Rr` (`L`; the shorter `S`), centred in
    `Rr`: `a = L/2 × factor`, `b = a ÷ ρ`; where `2b > S`, `b = S/2` and `a = min(L/2, b × ρ)`. The side count `n` by the
    constants' bracket `ovalSides` on the mean semi-axis `(a + b)/2`: 12 below 10 m, 16 below 20 m, 20 above (own). The
    **outer polygon** `P0`: `n` vertices at parametric angles `θᵢ = π/n + 2πi/n` on the ellipse (by `dmath`), so the chords
    `(n − 1, 0)` and `(n/2 − 1, n/2)` are centred on the major axis. **`P1`**: each edge line of `P0` moved inward by `w`,
    consecutive lines intersected (2 × 2 solves, as `plotRing`); **`P2`**: each edge line of `P1` moved inward by `c`, where
    `c` is first clamped to at most `b − w − courtMinM/2` (the floor keeps its least width) — a clamp below `caveaM[0]` is
    the M3 failure it was tested against, an M14 attempt. **Wings:** façade `i` = the quad `(P0ᵢ, P0ᵢ₊₁, P1ᵢ₊₁, P1ᵢ)` and
    seating `i` = the quad `(P1ᵢ, P1ᵢ₊₁, P2ᵢ₊₁, P2ᵢ)`, ring-ordered so sides 1 and 3 are the mitred ends and sides 2 and 4
    the eaves (M5's oblique-slab rule: the joints are the edge lines' intersections, every shared point one vertex, §2.6
    rule 1); the façade wings role `range`, storeyed, `arcade` where the row's `arcade` is on; the seating wings role
    `range` and **`solid`**; the hole inside `P2` is the court — the arena floor, typed `court` like any hole (item 303's hole sentence, built at M3a).
    **Gates:** the major-axis chord nearest the access is the **main gate** — its façade wing takes role `gate`, and its
    seating wing is laid **storeyed** (one floor, the gate passage through the seating to the floor) with role `gate`; the
    opposite major-axis chord's façade wing takes `main` and its seating wing is the second passage (`gate`, one floor).
    The entrance hint is M13's rule on the main gate's façade wing (its outer side). No block, tower, turret or back range
    (M7–M9 lay nothing). `segments` = `2n`.

  **Slabs from a path (oblique families).** For segment `i` from `pᵢ` to `pᵢ₊₁` with unit direction `dᵢ` and left normal
  `nᵢ`, the two long sides are the lines at `± w/2`; at a joint the corners are the intersections of the neighbouring
  segments' side lines (the mitre line runs through the path vertex); at a free end the corners are square. Segments
  whose interior angle is ≥ 178° merge first. The slab is a `quad` wing: ring order corner(start, left) → corner(start,
  right) → corner(end, right) → corner(end, left), so sides 1 and 3 are the ends (mitre or square) and sides 2 and 4 the
  eaves; `ridgeAxis 0` (the ridge joins the ends' midpoints — for a mitred end, the path vertex). **Rectilinear
  families** produce `rect` wings directly; at a butt joint the wing whose role has the higher `WingRoleRow.through`
  runs through (ties: the earlier in the path), the other ends on its side.

  **The `main` range of a closed family.** In `rectCourt`, `plotRing`, `regularCourt` and `starCourt` the range opposite
  the gate — the one whose midpoint has the largest component along `+v`, ties by length, then by path order — takes role
  `main` (`through` 2); the front range keeps `gate`. The hall, its court door and the chapel's end read it (V02 §3.8).

  **The segment count.** After collinear merging and before M7, `segments` = the path's segment count (`single`,
  `towerHouse` and the pass-throughs 1; `T` 2, `H` 3, `cross` 2; a closed ring its edge count); M13 writes it to
  `MassingRef.segments`.
* **M6 — (merged into M5).** The joints are part of each family's construction.
* **M7 — blocks.** For rectilinear families (and the `gate` range of a `plotRing`), `k` = an integer drawn in
  `blocks` (creation index 2). Candidates, each with a weight: the midpoint of a range ≥ 3w long (1, or 2 on the `main`
  or `gate` range); the free end of a range (1); the outer corner of a butt joint (1.5 on a closed family, 1 otherwise).
  Draw candidates by weight without replacement; for each, draw the block's length along its host `lb = w × U(1, 1.6)`
  and depth across it `db = w × U(1, 1.4)` (it stands proud of the host by `(db − w)/2` on each side). Accept when the
  block lies inside `H`, keeps 1 m from every accepted block and tower, and leaves each remaining piece of its host at
  least `max(w/2, 2 m)` long (a shorter piece is absorbed into the block by extending it to the host's end). Accepted,
  it **splits its host** into up to two pieces with the host's role (new keys, M13) — `rect` pieces of a `rect` host;
  of a `quad` host (a `plotRing` gate range), `quad` pieces, each keeping the host's mitred end and ending square on the
  block — and itself becomes a `rect` wing of role `block`, aligned with its host's eave (for a `quad` host, the eave
  side's direction at the block's centre); at a corner it replaces the corner square, both hosts ending on its sides. The
  pieces and the block tile the union, so the pairing (§2.6 rule 4 (ii)) holds; the vertices a piece's end puts on the
  block's side are the block's too (§2.6 rule 1), recorded in its `corners`. **A block's roof is always `hip`** (item 59,
  ADOPTED; J-V2.3), its ridge along the longer of `lb`, `db`, its ridge ends inset by `WingRoleRow.hipInset` × its span.
* **M8 — towers (the collision set holds the wings, item 59).** `k` drawn in `towers` (creation index 3); a tower's
  shape by `towerShape`. Candidate spots and weights: (a) every convex corner of the wings' union where two ranges meet,
  and each free corner of a range — weight 2 on `rectCourt`, `plotRing`, `U` and the fantasy closed families, 1
  otherwise; (b) the midpoint of each free end (weight 1); (c) the midpoint of the `gate` or `main` range's street side,
  only with chance `gateTower`; (d) **a tower on a block** — the centroid of each accepted block, weight `towerOnBlock`
  (0 by default; calibrated under `FM`, V02 §3.10.8), shape square. Radius `r = w × towerRadiusW`, drawn. For (a)–(c) the
  centre stands outward from the spot by `0.35 r` along the corner's bisector (a) or the side's outward normal (b, c), so
  the tower overlaps the corner it guards. Its ring: `TowerShapeRow`'s side count by radius (round: 12 below 2 m, 16
  below 4 m, 24 above; square 4, aligned with its host wing; octagon 8, one side parallel to its host), vertices by
  `dmath` and snapped. **Accepted only if** (i) the ring lies inside `H`; (ii) the share of its area inside the wings'
  union is in `[0.2, 0.6]` — attached, neither buried nor free-standing; (iii) its centre lies inside no wing deeper than
  `0.35 r` from that wing's boundary — no tower stands through a wing; (iv) it keeps `0.5 m` from every other tower and
  every block; (v) the seed contract (§2.6): every tower vertex lies at least `attractCm` from every wing side it does
  not cross, and every wing vertex at least `attractCm` from every tower side — else the centre moves once by `2 ×
  attractCm` outward and is re-tested. A candidate (d) replaces (ii)–(iv) by: a square of side `min(lb, db) × U(0.5, 0.8)`
  centred on the block, accepted when its ring lies inside the block's ring inset by `towerOnBlockInsetM` (0.3 m) and
  keeps 0.5 m from every other tower; it is **contained** in its block, so the clip order takes it after its container
  (§2.6's containment rule) and its room lies inside the block's piece; M11 raises it until its eave stands above the
  block's ridge. Candidates are tried in the drawn order until `k` are accepted or none remain (fewer accepted is
  reported, never retried). **Stair turret:** with chance `turret`, one turret of radius `U(1.2, 1.8) m` at a re-entrant
  corner of the union (the inner corner of an L, T, H, U or cross), accepted by the same tests with the share band
  `[0.25, 0.75]`; role `turret`. (e) **Template towers** (the `church`, `cathedral` and `cloister` rows, and any
  `template` row whose `westTowers[1] > 0` or `crossingTower > 0`): the **west end** is the free end of the template's
  nave part (`nave`, or the longest part) whose ridge end lies farthest toward world west (`−x`); the count of west
  towers is the attached `tower` or `towers` structure's drawn count where the template lists one (M8b), raised to the
  row's `westTowers[0]` (so a cathedral always has two), else a draw in `westTowers`.
  One west tower is a square of side `w_n × U(0.45, 0.6)` (`w_n` the nave's width) centred on the west end's midpoint and
  standing out by `0.35 ×` its side; two are squares of that side at the west end's two corners, each standing out
  diagonally by `0.35 ×` its side (the cathedral's twin towers). A crossing tower (chance `crossingTower`, where the
  template has a part `crossing`, item 234's names) is a square of the crossing's shorter side less `2 ×
  towerOnBlockInsetM`, contained in the crossing part and taken after it in the clip order. Template towers pass tests
  (i), (iv) and (v) (the west towers also (ii)); a failing one moves inward along its outward line by `attractCm` steps,
  at most 4, then is dropped and reported. Towers and turrets are `polygon` wings (a square tower a 4-vertex `polygon`,
  aligned), **first in the canonical wing order** (V02 §2.1; J-V2.4): §2.6's clip order then takes each tower's piece whole
  and each range less the towers it meets.
* **M8b — attached structures (item 304).** Each structure of the template whose `composition.roleKeys` row says
  `attach: 'main'` arrives in `BuildingInput.attached` with the count S11 drew for it, and is laid here as part of the
  main building:
  - `wheel` (a watermill's wheel housing): a `rect` wing of role `service`, one storey, width `U(2, 3) m`, length along the
    water side `min(the main range's water-side length − 1 m, 6 m)`, centred on that side, reaching from the main range's
    water-side wall to `H`'s boundary on the water side (at most `wheelReachM` 4 m); roof `shed`, `high` against the mill
    house. It needs the `water` axis frame; without a water edge in reach it is laid on the rear side and reported.
  - `sails` (a windmill): no wing — the main slot's family is forced to `towerHouse` with no range (the tower mill; the
    class override `windmill` sets the shape weights), and the sails are a §8.10 decoration (V02 §5.3).
  - `westTower` (a church's `tower`, a cathedral's `towers`): the count M8 (e) reads.
  - `churchPorch` (a church's `porch`): a `rect` wing of role `service`, one storey, width `U(3, 4.5) m`, depth `U(3, 5) m`,
    on the main entrance's side of the nave centred on the door, inside `H`; where it is laid, the entrance hint names its
    outer side and the composer lays no porch there (the door stands inside it, V02 §3.7).
    - `absorbed` (a court institution's `ranges`): no geometry — the count raises the main family's least range count
    (it is the court family's other ranges), and M10's budget for the main slot takes the absorbed structures' shares.
    **On an `ovalCourt`** (an arena's `gate`s; J-V2.88) an absorbed structure raises no
    range count: its budget share joins the main slot's, and the drawn gate count `g` (2–4, V11 §3.6.1) sets the passages —
    the first two are M5's major-axis gate passages; a third turns the seating wing of the minor-axis chord `(n/4 − 1, n/4)`
    or `(3n/4 − 1, 3n/4)` (each centred on the minor axis, `n` a multiple of 4) nearer the access into a one-floor `gate`
    passage by M5's rule, its façade wing keeping its role; a fourth, the other. `massOval` reads `g` from
    `BuildingInput.attached` (2 where absent), so the M3a builder lays the same bytes.
  An attached wing passes M13's checks like any wing; one that fails is dropped and reported, the building kept.
* **M9 — the back range.** With chance `backRange` (creation index 4): the host is the `main` range (for a row, the
  front quad). Its **rear side** is the host ring's side whose outward normal has the largest component along `+v` (away
  from the access), independent of the ridge (J-V2.40): for a row quad side 4 (the rear chain) — on a gable-fronted row as
  on an eaves-fronted one — and for a detached host the side farthest from the access segment. The attaching run is
  that side's longest straight run (for a chain, the longest sub-run whose direction varies by ≤ 5°). Width `wb =
  clamp(backWidthM, 3 m, run − 0.6 m)`; length `lb = clamp(backLenM, 2 m, reach − 1 m)`, `reach` the free depth of the back
  region behind the run (for a row, V02 §3.4 step 5's back region; otherwise `H`). For a row it stands flush against one
  party wall (a coin), for a detached house flush against the side nearer the plot's larger side yard; a `rect` wing of
  role `back`, abutting (butt) the host's rear side, its vertices on that side inserted into the host's ring. Floors: the
  host's less one (at least one); roof `shed` (high side against the host) when `wb ≤ 3.5 m`, else `gable` with the ridge
  along its length.
* **M10 — the size budget (J-V2.35).** `A` = the union's area (the sum of the tiled wings' areas, less the towers'
  overlaps, measured exactly by the kernel's boolean on the arrangement only when towers exist). The slot's target band:
  `[lo, hi] = [p10, p90] × footprintShare_i ÷ count_i × buildingScale × sizeFactor`, where `[p10, p90]` is the
  template's `footprintM2` read at the building's (significance-shifted, V02 §3.2 step 3) value; where the compiled row has
  `p10 = p50 = p90`, `[sizeBandLo × p50, sizeBandHi × p50]` (V11 §3.6.1's derivation ratios, mirrored as
  `sizeBandLo`/`sizeBandHi`, fixed; J-V2.35); `footprintShare_i` the structure's share (V11's role table; absent: the main slot 0.6 when other
  structures are drawn, else 1, and each other slot an equal part of the rest), plus the shares of the structures it
  absorbs (M8b); `count_i` the drawn count of that role; `sizeFactor` the SIZE ladder step's factor (V11
  `LadderStepRow.sizeFactor`, item 108), 1 otherwise. **Claim-sized** (J-V2.87): where the
  row carries `claimShare`, or the template's `footprintM2` is "the claim's" (V11 §3.6.1's `cathedral`, `cloister` and
  `castle` families, the precinct institutions), `[lo, hi] = claimShare × area(H) × sizeFactor` — the row's `claimShare`,
  else the constants `claimLo`, `claimHi` (0.35, 0.6) — so the precinct the site plan gave the slot sizes the building (a
  stepped temple, a great temple, a palace's courts, an arena); on a deck plot the deck row's band (V02 §3.16 (3)). The band is narrowed by the drift's `areaPct`; the cap is
  `coverageMax × area(H)`. This whole band is one exported function, **`slotBand`** (`@plat/plots`; V02 §2.6), which M3, ST0,
  ST8 and M10 read, so the base outline builder and stage 3 compute it identically.
  1. If `A > 1.1 × min(hi, cap)`: every path length drawn in M5 is scaled by `√(min(hi, cap)/A)`, with each of M5's clamp
     lower bounds lowered to the family's M3 least (so the clamps no longer undo the scale), and M5–M9 re-run once with the
     same draws;
  2. still over: drop the blocks, then the towers;
  3. still over: fall along the **reverse lattice** — `rectCourt`, `plotRing`, `regularCourt`, `starCourt` → `U` → `L` →
     `single`; `H` → `T` → `single`; `cross` → `T` → `single`; `gridWalk`, `chordArc` → `L` → `single`; `towerHouse` → the
     tower alone; `stepped` → `single` (V02 §3.15.1 ST8); `ovalCourt` → `rectCourt` → `U` → `L` → `single` — re-running M5–M9 at each step on `massing/attempt=a`, continuing M14's attempt counter;
  4. at the end of the lattice, still over: accept and report (`overBudget`, by class).
  If `A < 0.9 × lo`: path lengths scale up by `min(√(lo/A), the largest factor that keeps the massing in Rr)` once; still
  under: accept and report (§4.7's `underSize` and JOIN are the mutator's, never the massing's).
* **M11 — heights.** The main floors `fm` = the template's `floors` interpolated along the value, rounded
  stochastically (draw creation index 5: `⌊x + u⌋`), clamped into the template's range and the drift's; each wing's
  floors = `fm` + a draw in its `WingRoleRow.storeyDelta` (a block `blockStoreyDelta`, a tower or turret
  `towerStoreyDelta` above the tallest wing it overlaps), at least 1; all the ranges of one closed or oblique path share
  `fm` (their mitred roofs meet). **Tower storeys:** a tower of a family whose `HeightsRow` carries `towerStoreys`
  (`church`, `chapel`, `cathedral`, `cloister`, `tower`, `castle` — V11 §3.6.4) takes its floors uniformly in that range
  (creation index 5, after `fm`), each of `towerStoreyCm` (item 427; else `storeyCm.upper`). The heights come from the
  building's **`HeightsRow` — V11's, keyed by template family** (V11 §2.8, V11 §3.6.4; J-V2.33): `eaveCm = storeyCm.ground +
  (floors − 1) × storeyCm.upper` (+ `parapetCm` on a flat roof); `ridgeCm` by the roof: gable and hip `eave + pitch ×
  span/2` (`span` the wing's width across its ridge — for a quad the mean length of its two end sides), shed `eave + pitch
  × span` at its `high` side, pyramid and cone `eave + towerPitch × r` (a square's half side), tent `eave + pitch × r`, flat
  `eave`. **One pitch rule (J-V2.33):** a range's `pitch = HeightsRow.roofPitch × (ClimateRow.roof.pitch ÷ pitchRef)`,
  clamped to `[0.3, 1.8]`, where `ClimateRow` is the site's climate row (§4.9, V11 §2.8) and `pitchRef` the
  `temperate-deciduous` row's `roof.pitch` (so a temperate town keeps the family's pitch and a snowy one steepens it);
  towers `TowerShapeRow.pitch`, spires as M12 — never a material's (item 19). A tower's or turret's floors are raised
  further, if needed, until its eave stands at or above the highest point of every wing roof inside its ring (the roof
  plane's height at the overlap's vertices) — a tower on a block above its block's ridge — so a tower always covers what
  it overlaps in plan (V02 §5.2's occlusion rule). A wing that spans a passage keeps the base's two-floor minimum (§2.5
  `Passage`). A wing with the `arcade` flag (the row's `arcade`, on the main range) keeps its storeys; its ground storey is
  open (drawn dashed, exported open, outside the capacity's ground storey; V02 §5.1). **Under a vault**: on the underground layer, where
  V04's chamber record gives the host chamber's ceiling (an arch vault's soffit under a raised way, V02 X29), the floors
  are clamped so the eave stays at least `vaultClampCm` below it,
  reported `vaultClamp`. **`ovalCourt`**: the façade ring shares `fm`; each seating wing is `solid`
  (floors 0) with `eaveCm = storeyCm.ground` (the podium round the floor) and `ridgeCm` = the façade's `eaveCm` (the top row
  of seats at the outer wall's top); a gate passage wing has floors 1, the same eave and ridge. `baseCm` is the base's `deriveBase`,
  which S11 calls after the massing (and which the crypt lift of V02 §3.14.5 then raises for the ground wings over the basement's ring — the crypt's seed
  wings for a derived crypt; for a building with a wing standing on another, `rebaseStack`, item 370).
  **The building's `Heights`:** `towerCm` = the highest tower or turret ridge above `baseCm`, absent without one;
  `eaveCm` and `ridgeCm` = the maxima over the other wings. With a wing that stands on another (`BaseWing.on`), the
  stack's envelope of V02 §3.15.2 instead, `floors` included.
* **M12 — roofs.** Range roles: `hip` with chance `hipShare`, else `gable` (one draw per path for a closed or oblique
  path, one per wing otherwise; creation index 6); **where the site's `ClimateRow.roof.form` is `flat`** (an arid town),
  every range, block and back range takes `flat` with the family's `parapetCm` and carries no dormers (`hipShare` then
  applies to nothing); `block`: always `hip` (M7); towers `cone` (round) or `pyramid` (square, octagon), or — with chance
  `towerFlat` (square and octagonal only) — `flat` with the family's `parapetCm` (a battlemented top); **spires:** a tower
  of a family whose `HeightsRow` carries `spireFactor` takes a `cone` (round) or `pyramid` (square, octagonal) spire whose
  rise is `spireFactor × (eaveCm − baseCm)`, stored as the `RoofSpec.pitch` that gives that rise over its radius; `back`
  as M9; `shelter` as M0; `@underground` rows force `flat`. **The cupola** (the row's `cupola`; creation index 7): with
  its chance, a kind by its weights on the `main` range (the longest `main` or `gate` range where several), written to
  `MassingRef.cupola` — a small derived solid at that range's ridge midpoint (V02 §5.2), never in `Heights` and never a
  caster. **`ovalCourt`**: the façade wings `flat` with the family's `parapetCm`, no draw; the seating
  and gate-passage wings `shed` with `high` the side on `P1` (outward), their `RoofSpec.pitch` the rise over the span that
  M11's eave and ridge give. Ridge axis: along the path segment for a range; along the host for a block unless `db > lb`; for a row quad the
  base's rule, made a law of the frontage — `ridgeAxis 1` (gable to the street) with probability
  `smoothstep((gableToStreetMaxFrontM + 1.5 − frontage) / 3)` (own; its share is calibrated to NG's measured 36 % under the
  parity comparison, V02 §7.4).
* **M13 — snap and validate.** Every point snaps by §3.2's placement rule. A ring edge shorter than `minEdge` (§2.2 `LatticeSpec`)
  merges its end into its start. Every wing vertex within the hot pixel of another wing's side is inserted into that
  side (§2.6 rule 1). Checks, all exact on lattice points: every ring simple and counter-clockwise; every wing inside
  `H`; the non-tower wings **tile** (the pairing of §2.6 rule 4 (ii)) — in a `stepped` massing the ground wings only, every
  wing with `on` checked by V02 §3.15.1 ST6's containment instead; M8 (v) for the towers; each wing at least 4 m²
  and each side at least `minEdge`; **the laid range count before M7's splits lies in the family's
  `MassingFamilyRow.wings` and every joint is of its `joints` kind** (a structural check of the construction, J-V2.57;
  every family has its row, `stepped` and `ovalCourt` included — V02 §3.10.7's load check). For
  `ovalCourt`: `P0`, `P1` and `P2` simple and counter-clockwise, every edge at least `minEdge`, `P2`'s least width at least
  `courtMinM`. **Order and keys:**
  towers and turrets (acceptance order), then the ranges in path order (`gate`, else `main`, first), then blocks, then
  the back range, then M8b's attached wings; keys `0 … n − 1`; `nextWingKey = n` — the canonical order of V02 §2.1 by
  construction. `MassingRef.segments` is written from M5's count. **Entrance hint:** the `gate` wing where the family has
  one, else the `main` wing (a church porch's outer side where M8b laid one), and its eave side whose outward normal makes
  the largest positive component along `−v` (toward the access) — the back range's for a forecourt `U`, the square
  tower's front side for a `towerHouse` without a range — kept only if that component is at least `entranceHintMinCos`
  (cos 60°), else `null`. A check that fails is an M14 attempt.
* **M14 — the ladder (F-MASSING, item 328; per building, never whole-map).** Rung 0: attempts 0, 1 and 2 of the drawn
  family (the concern's cap 3), attempt `a` on `massing/attempt=a` (attempt 0 is the first lay); rung 1: each other
  feasible family by descending weight, one attempt each, **continuing the same attempt counter**; rung 2: `single` with
  `w` at `max(0.8 × wingWidthM[0], 3 m)`; rung 3: `baseOutline` — the base outline builder's rectangle in `H`, which the
  base guarantees (§2.6, F-SITEPLAN's ladder above it). Every rung past 0 is counted per class in the generation report;
  no building is refused, and no retry reaches beyond the building.

### 3.6 The composer — `compose()`, the `wings` rung

`compose(input, outline, 'wings', k)` is a pure function of the `wings` rung's recorded inputs (`wingsInputs`, V02 §3.11:
the base wings, the main entrance, the massing reference, the row's slices and the porch's neighbourhood on the plot)
and its own streams (§4.1's contract):

1. **Composed wings and towers, one to one.** One `Wing { base }` per base wing that is not a tower or turret, in key
   order; one `ComposedTower { base }` per tower or turret wing. Ring, heights, roof and spans are read from the base
   wing (V02 §2.2). So the stage-3 contract (as amended by item 223: the union of the composed wings and the composed
   towers' rings equals the outline's union; each composed wing reaches exactly its base wing's storeys) holds by
   construction.
2. **Courts:** the holes of the footprint face, read from its rings (§2.6), in ring order.
3. **Dormer rows** (V02 §3.7), on `compose.dormers`.
4. **The porch and the secondary porch** (V02 §3.7), on `compose.porch`.
5. **Validation (F-COMPOSE, item 328).** Each dormer inside its facet and clear of every valley, hip, tower and block
   (V02 §5.2's regions); each porch inside the plot, clear of every other building, **of the building's own other wings**
   (a stack's stair 0, an attached porch wing) and of every way; failures take V02 §3.13's ladder. Nothing the composer makes is model data until an edit stores it (V02 §4).

### 3.7 Façade bays, dormers, the entrance gable and the porch

**The valley's reach (`valleyReach`, stated once).** Where a wing `X`'s ridge meets the roof of a wing `Y` (a
`valley` end, V02 §5.2 step 1), the valley reaches into `Y`, in plan, the distance at which `X`'s ridge meets `Y`'s near
roof plane: `valleyReach(X, Y) = (X.ridgeCm − Y.eaveCm) × Y.runCm ÷ Y.riseCm`, where `Y.riseCm = Y.ridgeCm − Y.eaveCm`
and `Y.runCm` is the plan distance across `Y` from its eave to its ridge line — half its span for a `gable` or `hip` roof,
its whole span for a `shed` (whose ridge stands at `high`). It has two arithmetic modes. **`'int'`** — integer
centimetres by §6.5's arithmetic, floored (`⌊…⌋`) — is the one `facadeBays` reads, so the bays and the dormer positions
are byte-identical on every host (T-V2-13; J-V2.25: the bays never read the float roofscape). **`'float'`** — float64,
view data — is the one the roofscape extends a `valley` ridge by (V02 §5.2 step 2). For a `gable` or `hip` `Y` both modes
are the two expressions the bays and the roofscape used before this statement; for a `shed` `Y` both modes read
the shed's whole run, as the roof plane does (J-V2.109; T-V2-54).

**Façade bays (`facadeBays`, the one rhythm every reader shares; item 406).** For a wing and any of its ring sides
(J-V2.93). **On an eave side** the **usable run** is the side's length less `endMarginM` at each end, less the projection
onto the side of every tower ring, block and other wing that meets or overlaps it, each widened by 0.6 m, less
`valleyReach(X, Y, 'int')` of each valley that ends on that side. The run is cut into `nb =
max(1, ⌊run ÷ bayM⌋)` equal bays (`bayM` 3.6 m, own: the rhythm of a timber frame's bays and a masonry front's windows);
each bay is `{ atCm (its centre from the side's first vertex), widthCm }`. **On any other side** of a `rect` or `quad`
wing (a gable end, the free part of a side along a butt joint) the usable run is the side's length less `endMarginM` at
each end, less the projection onto the side of every tower ring, block and other wing that meets or overlaps it, each
widened by 0.6 m — no valley term — cut by the same law, except that a side whose run is not positive has no bay. **On a
`polygon` wing** (a tower or turret, whose sides are facets of one curved wall) the bays are laid round the ring's **free
perimeter** — its boundary less the parts inside, or within 0.6 m of, another wing's ring — each maximal free arc cut into
`max(1, ⌊arc ÷ bayM⌋)` equal bays by arc length (an arc shorter than `bayM ÷ 2` has none), and `facadeBays(w, side, bayM)`
returns the bays whose centres lie on that side (`atCm` along it from its first vertex). It is a pure function of the wing
ring, its neighbours, their heights and one table value — no draw — read by the dormer positions here (eave sides), by the
plan rung's windows on every side (V03's W2; §2.6 step 6), by
the lit windows of §8.4 on every side when no plan exists, and by §8.10's decorative chimneys (eave sides; one at a bay
line nearest each end, `hearths` of them).

**Decorative chimneys on exposed roof only.** A decorative chimney stands at a bay line of a
host wing's eave, at the point up-slope by half the span. Its host is a storeyed wing whose roof there is exposed: never a
`solid` wing (a stair, a rubble tier, a seating bank), and never a point inside the ring of a wing standing on the host.
On a building with a wing standing on another, the `hearths` are placed on the **top storeyed wing** first (bay lines
nearest each end, alternating), then on the **exposed terrace band** of the storeyed wing below it (its bay lines whose
chimney point lies outside the ring of every wing standing on it), and so down the stack; a count left with no exposed
bay line is dropped and reported (`hearthsDropped`). Every other building keeps the rule above unchanged.

**Dormer rows.** A wing takes dormers only if its role allows (`WingRoleRow.dormers`: `main`, `range`, `cross`, `gate`,
`block`), its roof is `gable` or `hip` (so never under a climate's flat roofs, M12) with `pitch ≥ DormerKindRow.minPitch`
(0.7), and its `HeightsRow.attic` is true (item 427) or it has at least two floors. For each eave side (creation index `2 × key + eave` on `compose.dormers`; `nb` and the run are `facadeBays` of that eave's
ring side):
1. `n = clamp(round(perTenM × run/10 × U(0.75, 1.25)), 0, nb)`.
2. **The entrance gable.** On the eave side of the main entrance, with chance `dormer.entranceGable`: one dormer of kind
   `entranceGable`, width `U(2.4, 3.6) m` clamped to its bay, set in the bay containing the main entrance (counts in `n`).
3. **Kind** of the others by `dormer.kinds`. **A warehouse** (`warehouse` family) puts **exactly one `hoist` dormer** on
   each eave that faces an access edge (its outward normal's component toward the access ≥ `entranceHintMinCos`), in the
   bay nearest that eave's centre; the others by `dormer.kinds`.
4. **Width** `U(widthM)` clamped to `bay width − gapM` (0.4 m).
5. **Positions** (`dormerPositions`, no draw): the `n` bays chosen symmetrically about the run's centre — with `n = nb` all
   of them; otherwise the centre bay first when `nb` is odd, then outward in pairs; an odd remainder on an even `nb`
   goes to the bay on the side of the main entrance, else the first side in ring order. A dormer whose plan-view
   rectangle (its width × `depthShare × span/2` up the slope, set back 0.3 m from the eave for `dormer`, at the eave for
   `wallGable`, `entranceGable` and `hoist`) meets a valley region, a tower ring, the cupola or another dormer is dropped
   (the row's count falls by one, reported).

**Precedence against the plan (V03's dormers).** Before a plan exists, the rows above are the dormers. **Once the
plan rung has derived a plan**, an unedited `DormerRow`'s `count` is the plan's count of top-storey roofed rooms with
exterior demand under that eave (V03 §3.6 W4), clamped to `nb`, its `kind` and `widthCm` kept and its positions by
`dormerPositions`; an **edited** row (`edited: true`) stays a fixed input that the plan honours (V02 §2.2). So the drawing
never shows a dormer the plan contradicts, and a user's dormer edit always wins.

Dormers never project past the eave line (J-V2.7): Fantasy Manor's projecting cross-gables would leave the footprint and
the plot, which the stage-3 contract and item 59's plot rule forbid; the projecting bay a real building has is a block
(M7), which the footprint shows.

**The porch.** Only on the wing carrying the main entrance, **and only where that wing's `WingRoleRow.porch` admits one**
(`main`, `gate`, `range`, `cross`, `block`; not `tower`, `turret`, `back`, `service` — so a `towerHouse` entered through
its tower, or a church entered through its porch wing (M8b), takes none); side and offset are the main entrance's (the
base's rule 3, re-read after every carry). With `d` = the free distance from the door point along the side's outward
normal to the first of the plot's boundary, another footprint of the plot, or a yard part of kind `footpath` or
`forecourt` edge that reaches a way — measured on the plot's own rings (so the rung reads only its building's plot, V02
§3.11):
* `recessed` is feasible where the host's depth is ≥ `3 m + depthM[0]`;
* `hood` where `d ≥ depthM[0] + clearanceM` (0.3 m);
* `gabled`, `halfRound` and `twoStorey` where `d ≥ depthM[0] + clearanceM`, the side is ≥ `widthM[0] + 0.6 m` long, and
  (for `twoStorey`) the host has ≥ 2 floors.
One draw (creation index 0 on `compose.porch`) over the row's `porch` weights restricted to the feasible kinds and
`none`; width `U(widthM)` clamped to **the free part of the side** — the part on the footprint's boundary that no other
wing of the building abuts (item 228's part; a stack's stair 0 or a church porch wing covers the rest) — less 0.6 m
; depth `U(depthM)` clamped to `d − clearanceM` (outside) or to
the host's depth less 3 m (recessed); a `halfRound` porch's depth is `width/2`, its width clamped so that `width/2 ≤ d −
clearanceM`. A flush row front (`d = 0`) therefore takes `recessed` or `none`, never a porch over the street. The porch's
plan ring (derived): the rectangle on the side at the entrance's offset, `width × depth`, outward (or inward for
`recessed`); for `halfRound`, the half-disc of radius `width/2` centred on the door point on the side's outer line, its
arc by `dmath` with the side count of `TowerShapeRow`'s round bracket at that radius, halved (at least 6 segments).
Its heights: one storey (`storeyCm.ground`) and a roof rise of `pitch × width/2` (`twoStorey`: two storeys; `halfRound`:
a half-cone to the wall at `TowerShapeRow`'s round pitch × `width/2`); it is drawn and lit at the bands where the
composition is drawn (V02 §5), and it adds nothing to the model's heights (V02 §5.2's note on shadows).

**The secondary porch (J-V2.44).** With chance `secondaryPorch` (creation index 1 on `compose.porch`), one `hood` at
the side, rear or yard entrance (§2.6 `Entrance.role` `side`, `rear` or `yard`) with the largest `d` among those where a
hood is feasible, ties by entrance ordinal; its size by `PorchKindRow.hood`. It is `0` in the default rows (one porch at
the main door, as historical houses mostly had) and calibrated under `FM`, where the reference puts up to three porches
on a building.

### 3.8 The `rooms` rung — the composer's principal rooms

Derived only as the plan rung's input — on the click that derives the plan, `compose(…, 'rooms')` after `wings` —
and never alone under `elaborate: 'view'` (J-V2.9), because nothing but the plan draws them. Each room is a `Room`
(§2.6) with its storey, its composed wing's **base key** (a tower's room its tower wing's key; item 225) and a role the
room programme rows name (V03 owns those rows; these four roles must exist in them). All rooms lie inside one seed
piece at their storey (the stage-3 contract): each avoids every tower ring (a room that would meet one is shortened away
from it, else omitted) and keeps `attractCm` from every side it does not share.

**The rung reads the occupants, not the shell (item 28 (f); J-V2.36).** Its `rooms` cells are read at the occupants'
band (V02 §3.2 step 3), and its recorded inputs include the occupants' band row and the household count (item 261), so a
band change or a re-division marks it stale and the plan's re-cut starts from the rooms the new band admits (a
building's decline excepted, V02 §3.11). The **hall
and the chapel are emitted only** where the interior-ladder row at the occupants' band gives the unit form `house` (one
household holds the building, §2.6's interior ladder), or where the class is an institution whose programme row names a
hall (an inn's common room, a guild or town hall's hall, a market hall's upper hall, a barracks' mess): a rich manor
whose occupants fall to the poor band has no hall ring, and its main range divides into the units the ladder asks
(T-V2-35); returning to the rich band restores the as-built rooms exactly (the canonical chain). **The gate hall and the
tower rooms are shell and circulation rooms and stay at every band.**

1. **Hall** (the row's `rooms.hall` under the rule above): in the `main` wing — for a closed family the range opposite the
   gate (M5) — from eave side to eave side, length `U(hallLenShare) ×` the wing's length along its ridge, clamped to
   `[1.4w, length − 2 m]` and then **to the programme's area**: its area is clamped into the class programme's `hall` row
   `[min, max]` × the interior-ladder row's `sizeFactor` at the occupants' band, by shortening its length, never its width (which runs eave to eave) —
   where a `RoomProgramRow` with a `hall` rule is loaded for the class (V03's rows, shipped by V03's P1 in the stream
   after M4, J122); where none is — a class whose programme names no hall, or a build in which P1 has not shipped its
   rows — the clamp `[1.4w, length − 2 m]` alone, reported per building (`hallUnclamped`; J-V2.95). **Its low end** is the door it is entered by: the main entrance where that lies on the `main`
   wing — the hall's low end at `door offset − hallDoorBackM` (1.5 m; the entrance opens into the hall's low end, the
   cross-passage bay), clamped inside the wing; otherwise a **court door** on the `main` range's court side at the offset
   nearest the gate hall's axis (a derived opening the plan rung opens, listed with the gate hall's arches). The hall runs
   from its low end toward the range's farther end. Ground storey; role `hall`.
2. **Gate hall** (closed families): in the `gate` wing, from eave side to eave side, width `U(gateHallM)` centred on the
   main entrance's offset and shifted to keep `gateHallJointGapM` (0.5 m) from a joint; ground storey; role `gatehall`.
   The plan rung opens an arch at both ends — to the street and to the court (V03 reads the role's programme row) —
   so the court is reached through the building, as courtyard houses and inns were. **`ovalCourt`**: the
   gate hall is laid in the main gate's façade wing as above and continues through its gate-passage seating wing to the
   floor — two rooms of role `gatehall` sharing an arch on `P1` — and the opposite major-axis chord's passage wing holds a
   second `gatehall` room (its outer end a door into the façade's `main` wing, or an arch where an access edge faces it, by
   the base's entrance rules); each minor-axis seating wing M8b turned into a gate passage holds a `gatehall` room likewise,
   its outer end an arch through its façade wing; the plan of the façade ring is V03's.
3. **Chapel** (with chance `rooms.chapel`, under the rule above): in an open family, at the free end of the range whose
   ridge direction is nearest world east (`+x`); **in a closed ring**, at the east end of the range whose ridge is nearest
   east, from its joint toward the range's other end; from eave side to eave side, length `w × U(1, 1.5)`, ground storey
   (or first storey where the ground storey there is the hall); role `chapel`.
4. **Tower rooms:** per composed tower, one room per storey it reaches: its ring less the rings of the towers before it
   in the clip order that it overlaps (the base's rule); a tower on a block, its ring inside the block's piece; role
   `towerRoom`.
Room ids are the base's `room:<building>/<level>/<i>`, `i` in the order hall, gate hall, chapel, then the tower rooms by
tower key; the plan rung passes them as fixed rings (§3.4's transient arena) and places its stair cores against their
walls (the base's contract). **Every one of them is editable** by `setComposition` `room` (V02 §4.1): on or off, and its
extent along its host's ridge, bent to the nearest lawful extent by V02 §3.13 (3)'s rule; an edited room is a fixed input
of the rung (`edited`), kept through a re-derivation while its host keeps its key.

### 3.9 Mutation — the wing step of the designation mutator (item 18)

The base's mutator (§4.7 S11) matches parts by role, orders subtract → convert → adapt → add, draws on the plot's
`siteplan.mutate` stream, records `MutationStep`s and reverses exactly. For the wings of a kept (or adapted, or
converted) slot's building, its steps are:

* **W1 — the target family.** The target designation's composition row at the plot's manifested band (V02 §3.2). If the
  source family (`Building.massing.family`) has weight > 0 in the target row and is feasible on the building's current
  hint (S11's re-fit with the other kept parts fixed), it stays. Otherwise one draw on `siteplan.mutate` (V02 §3.12) over
  the target families **reachable** from the source by `MassingGrowthRow` and the anchored-lay table below, and feasible
  (M3's two tests), weighted by the target row. For `stepped` the feasibility is **anchored**: the kept `main` range's shorter side at least `tierMinSideM + 2 × insetM[0]` (a second tier fits) and the least stair
  reserve of V02 §3.15.1 ST0 fitting inside `H` in front of it (none needed for `internal`); otherwise `stepped` leaves the
  reachable set, as the ± 15 % rule removes a pair.
* **W2 — the seeds.** The growth row's `keep` names the kept ranges: `all` (the target path contains every source
  range), `main` (the source's `main` range only), `mainAndOne` (main and the longest other range, ties by key), `none` (no
  range maps — only for a source whose `main` has no compatible role in the target by §4.7's compatibility table; the
  mutator then keeps what it can as other slots or subtracts it, never re-rolls the plot).
* **W3 — the anchored lay.** The target family's construction (M5) runs in **anchored mode**: its frame is fixed on the
  kept `main` range — `u` along its ridge, `v` away from its access-side eave, the front that eave — and the family's
  parameters are solved so that the kept ranges are exactly slabs of the target, by the table below (one row per
  reachable pair; J-V2.11). Added ranges that do not fit the hint shrink first, then are dropped (the target family
  degrading to the largest feasible sub-family by the growth table), and then the base's step 3 (a JOIN by S10 (7)'s
  orderings, or the template's `underSize`) decides — never a fresh roll.

  | source → target | kept | the anchored construction (lengths not named are drawn as in M5) |
  |---|---|---|
  | `single` → `L` | main | the kept range is the front slab (`Lf` = its length); the arm at the end W1's coin picks (the sunlit choice of M5 applies), `Ls` drawn, abutting |
  | `single` → `T` | main | a cross slab through the kept hall's end the coin picks; the hall **adapted** — shortened by `w_c` at that end |
  | `single` → `H` | main | cross slabs through both of the kept hall's ends; the hall shortened by `w_c` at each |
  | `single` → `U` | main | the kept range is the through front range (open to the rear); arms of length `Ls` at its two ends, running `+v` |
  | `single` → `cross` | main | the kept range is the main range (it runs through); the cross slab through its middle, `Lc` drawn, laid as two pieces |
  | `single` → `rectCourt` | main | the kept range is the `gate` range (`Lf` = its length); `Ld` drawn; the rear and the two side ranges added (the rear takes `main`, M5) |
  | `single` → `towerHouse` | main | the tower at the kept range's front corner nearer the plot's larger side yard (square abutting; round or octagonal overlapping by `0.35 × t/2`) |
  | `single` → `gridWalk` | main | the grid pitch `p` = the kept length ÷ `k`, `k = max(1, round(kept length ÷ p₀))`, `p₀` M5's pitch on the hint; the kept range is the first segment and the walk continues from its far end |
  | `single` → `plotRing`, `regularCourt`, `starCourt`, `chordArc` | main | reachable only when the kept length is within ± 15 % of the target's side at the current hint (the nearest edge of `Q` for `plotRing`; the regular side at M5's `R` for `regularCourt`; one chord for `chordArc`; the nearest corner-to-corner span for `starCourt`); the target is laid with that side on the kept range (its phase or its `Q` edge moved onto it); otherwise the pair is removed from W1's reachable set |
  | `L` → `U` | all | the second arm at the front range's other end, of the kept arm's length |
  | `L` → `rectCourt` | all | the front range is the `gate` range, the kept arm one side; the opposite side and the rear range close the court at the kept arm's length |
  | `L` → `T`, `H` | main | cross slab(s) through the kept front range's end(s), the range shortened by `w_c` at each; the kept arm subtracted |
  | `T` → `H` | all | the second cross slab through the hall's other end, the hall shortened by `w_c` there |
  | `U` → `rectCourt` | all | the closing range across the arms' far ends |
  | `rectCourt` → `U`; `U` → `L`; `H` → `T`; `L`, `T`, `cross` → `single`; any closed family → `U` or `L` | `mainAndOne`, or `main` where the target has one range | the ranges not kept are subtracted (the highest keys first among equals); a hall shortened by a subtracted cross-wing regains that length where `H` allows (adapt) |
  | `towerHouse` → `single` | main | the tower subtracted; a `towerHouse` with no range keeps the tower as a `part` and lays `single` beside it (`none`) |
  | `gridWalk` → `L`, `single` | `mainAndOne`, `main` | the first two segments, or the first, kept; the rest subtracted |
  | any closed or fantasy family → another | main | anchor either: reachable only within the ± 15 % side rule above |
  | `baseOutline` → any | main | the base builder's bar (its `main`) is the kept range, as `single`'s rows |
  | `row` → `row` | all | the quad kept; only the back range and the storeys change |
  | `template` ↔ any other | — | never reachable: a template building changes only by the compatibility table's keep, convert or subtract (§4.7) |
  | `single` → `stepped` (the only source — every other family passes through `single`, as `MassingGrowthRow`'s defaults state) | main | the kept range's four corners are tier 0 (`layTiers`' anchored mode, W1's anchored test first); the stack, its stairs and top laid on it with the target row's cells and `drawTiers` on `siteplan.mutate`; V02 §3.15.5 |
  | `stepped` → `single` | main | tier 0 kept as the `main` range; every stacked wing and every stair subtracted (highest keys first); its roof and floors by W5 — a solid tier 0 becomes storeyed, its `solid` cleared (V02 §3.15.5); onward to any family by `single`'s rows |
  | `stepped` → `stepped` | all | the tiers up to the target's count kept; W4 subtracts the tiers above it (the shrine first); W6 adds tiers on top with the stack's step while ST3's side test passes, their stairs, and the shrine where the target's top is one (V02 §3.15.5) |

* **W3b — an arrangement change (item 108; J-V2.13 scoped).** A `row` building whose target template's arrangement is
  `compound` (a brewer's shopfront becoming a brewery's `works-noxious` yard) keeps its quad byte-identical as the
  compound's **frontage slot** — role `shop-house` or `house` by the target's structures — and the target's main structure
  is added as another slot by the base's compound packer behind it (a JOIN by S10 (7) where the budget asks); the reverse
  (compound → row) subtracts the added slots and restores the quad's role. J-V2.13's "a row building never changes
  family" holds for every change that keeps the `row` arrangement.
* **W4 — subtract.** Source wings with no role in the target, and towers or blocks above the target row's maximum
  (the highest keys first), are subtracted — unless locked or edited (the base's step 4: kept, reported).
* **W5 — adapt.** Kept wings' floors move into the target's floors band (one storey per step, the base's "a storey added
  within the floors band"), and on a deck plot are clamped to the deck's `maxFloors` as M11 clamps them at generation;
  a roof kind the target's `WingRoleRow` does not allow changes to its first allowed kind.
* **W6 — add.** Blocks, towers, a turret, a back range and the attached structures to the target row's counts, by
  M7–M9 and M8b on the new massing, with draws on `siteplan.mutate` keyed as V02 §3.12 states; added wings take keys from
  `nextWingKey`, and the canonical order (V02 §2.1) is restored before the commit. **Digging down (item 109 (j) (3) (i);
  J-V2.39):** an added wing whose ring newly lies over a sealed cavern, ruin chamber or gallery within reach of its dig
  floor (V02 §3.14.5) draws once for an access down, keyed (building lineage, `dig`, the void system's kind, the wing's
  key) on the `sewer` concern in V04's T2b stage — the draw and the access kind are V04's, its chance V11 §3.23.7's `DigRule` rows by class and depth;
  growth by new foundations is the owner's "more digging".
* **W7 — record.** Each wing step is a `MutationStep` with part kind `wing` (its address `('wing', building, key)` and
  role), `storey` for a floors change, `roof` for a roof kind change, and one `slot` step of role `massing` carrying the
  `MassingRef` before and after (its `segments` rewritten). Kept wings keep their keys and bytes (T-V2-15); subtracted
  keys are never re-used.
* **W8 — the composition.** An unstored `wings` rung is marked stale and, at the next click, re-derives — the kept wings'
  dormer rows reappearing unchanged, because their draws are keyed by the wing's key (V02 §3.12). A stored composition is
  re-matched inside the event (the base's rule): composed wings of subtracted keys are dropped (fates), of kept keys
  kept (an edited dormer row kept while its eave's length stays within ± 10 %, else orphaned and listed in §7.3's orphan
  table with its two actions, V02 §4.4), and added keys composed on the spot by V02 §3.6–§3.7 on the committed massing.
* **W9 — reversal** is the base's: the inverse steps restore the former massing exactly while the building's leaf
  digest is the record's result; otherwise a forward mutation toward the former designation runs and is reported.
* **W10 — over time** the same steps are spread by the evolution engine and shown by Works (V06), one Works per
  added or subtracted wing; this volume only records them (V06 calls them through the mutator; no epoch participant of
  its own).

Generation is W6 from the empty design with no seeds — the massing of V02 §3.5 — so a generated building and a mutated one
are laid by one code path (the base's step 7). A `setMassing` `family` op (V02 §4) runs W1–W9 with the named family,
drawing as V02 §3.12 states. Split sites and their merge-back (item 105 (h)) and ladder steps (item 108) are designation
mutations of each plot and take these steps; V02 §3.14.3–V02 §3.14.4 state what is special to them.

### 3.10 The default rows — the diversity ladder from hovel to giant manor

All values are **our own** (provenance `own`, architecture 2026-09-28), calibratable (§13.9),
general architectural history rather than corpus-witnessed, and keyed so that **every class of the compiled roster
resolves to a written row** (T-V2-33): one row per V11 template family (V11 §3.6.1's 35 families), class rows only as overrides, one row per structure role, and full default rows per arrangement.

**3.10.1 Anchors (J-V2.30).** Every row is authored at **V11's four anchors — poor, modest, prosperous,
rich** — the same anchors as the templates whose budgets it must meet; `squalid` reads the poor row and `comfortable`
the modest row for its discrete cells and the cell-wise interpolation of modest and prosperous at its band centre for its
continuous cells (§4.5's band-set paragraph and its discrete-cell rule — one band-anchoring rule for every template-like
table). Continuous cells interpolate along the value. A class the class mix never places at a band still has its row
(its nearest anchor's), because a designation change or an assignment can put it there. Notation
below: `p / m / pr / r` for the four anchors; one value where all four agree. **Porch weights** are written
`none / hood / gabled / twoStorey / recessed`; `halfRound` is 0 in every default row (J-V2.45) and set only by the `FM`
preset. Every cell a row leaves out takes the shared value of V02 §3.10.9.

**3.10.2 The template-family rows** (`<family>/<band>`; the main slot's step 4 of the chain):

| family (arrangement; main slot) | families `p / m / pr / r` | wing width m | range length m | blocks · towers (turret) | back · hip | dormers /10 m | porch `p · m · pr · r` | rooms · hearths | other cells |
|---|---|---|---|---|---|---|---|---|---|
| `dwelling-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .1 / .35 / .6 / .85 (squalid 0) · .1 | .2 / .5 / 1.0 / 1.5 | .9/0/0/0/.1 · .75/.1/0/0/.15 · .5/.3/0/0/.2 · .3/.4/0/0/.3 | — · 1 / 1–2 / 2 / 2–3 | entrance gable 0 / .05 / .15 / .3 |
| `lodging-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .3 / .4 / .5 / .5 · .1 | .5 / .8 / 1.0 / 1.2 | .8/.1/0/0/.1 · .7/.15/0/0/.15 · .6/.2/0/0/.2 · .5/.25/0/0/.25 | — · 1–2 / 2 / 2–3 / 3 | — |
| `shopfront` (row; shop-house) | row 1 | the quad | — | 0 · 0 (0) | .4 / .5 / .6 / .7 · .15 | .3 / .7 / 1.0 / 1.4 | .6/.3/0/0/.1 · .4/.4/0/0/.2 · .3/.5/0/0/.2 · .2/.5/0/0/.3 | — · 1 / 1–2 / 2 / 2–3 | entrance gable 0 / .05 / .1 / .2 |
| `workshop-row` (row; shop-house) | row 1 | the quad | — | 0 · 0 (0) | .5 / .5 / .6 / .6 (shed outshots) · .15 | 0 / .3 / .6 / .8 | .8/.2/0/0/0 · .6/.3/0/0/.1 · .5/.4/0/0/.1 · .4/.4/0/0/.2 | — · 1 / 1–2 / 2 / 2 | — |
| `tavern-row` (row; house) | row 1 | the quad | — | 0 · 0 (0) | .3 / .4 / .5 / .6 · .15 | .3 / .6 / 1.0 / 1.2 | .5/.3/0/0/.2 · .3/.4/0/0/.3 · .2/.4/0/0/.4 · .1/.4/0/0/.5 | hall (the common room) · 2 / 2 / 3 / 3–4 | — |
| `warehouse` (row; store) | row 1 | the quad | — | 0 · 0 (0) | 0 · .1 | .5 / .5 / .6 / .7 | 1/0/0/0/0 | — · 0 | dormer kinds hoist .6, dormer .4, one hoist per access eave (V02 §3.7) |
| `dwelling-detached` (detached; house) | single 1 / single .8, L .2 / single .6, L .3, T .1 / single .4, L .35, T .15, H .1 | 4.2–5.2 / 4.8–6 / 5.5–6.5 / 6–7 | 6–8 / 7–9 / 9–13 / 11–15 | 0 / 0 / 0–1 / 0–1 · 0 (0 / 0 / .05 / .15) | .3 / .4 / .5 / .6 · .4 / .35 / .4 / .45 | 0 / .3 / .8 / 1.2 | .9/.1/0/0/0 · .6/.3/0/0/.1 · .3/.3/.3/0/.1 · 0/.2/.5/.2/.1 | hall (V02 §3.8's rule) · 1 / 1–2 / 2–3 / 3–5 | — |
| `dwelling-compound` (compound; hall) | single .7, L .3 / single .5, L .35, T .15 / single .25, L .4, T .3, H .05 / L .35, T .35, H .15, U .15 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 8–11 / 9–13 / 11–15 / 13–17 | 0 / 0 / 0–1 / 0–1 · 0 (0 / .05 / .15 / .25) | .4 / .4 / .3 / .2 · .3 / .35 / .45 / .5 | .8 / 1.0 / 1.2 / 1.4 | .4/.5/0/0/.1 · .2/.5/.2/0/.1 · 0/.4/.5/.1/0 · 0/.1/.5/.4/0 | hall; chapel 0 / 0 / .05 / .15 · 2–4 / 3–5 / 4–6 / 5–8 | courtMinM 6 / 6 / 7 / 8; uOpenFront .6; cupola 0 / 0 / .05 / .1 |
| `hovel` (hovel; hut) | single 1 | 3.4–4 / 3.6–4.4 / 3.6–4.4 / 3.6–4.4 | 4–5 / 4.5–6 / 4.5–6 / 4.5–6 | 0 · 0 (0) | 0 / .1 / .1 / .1 · .5 | 0 | 1/0/0/0/0 | — · 1 | — |
| `cluster` (cluster) | shelter 1 | the cluster row's | — | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | — · 0 (a shack .3 chance of one) | — |
| `workshop-yard` (compound; house) | single 1 / single .8, L .2 / single .7, L .3 / single .5, L .4, T .1 | 3.6–4.4 / 4.2–5 / 4.8–5.8 / 5.5–6.5 | 4.5–6 / 5.5–7.5 / 7–10 / 8–12 | 0 · 0 (0) | .5 / .5 / .45 / .4 · .2 | 0 / .2 / .4 / .6 | .9/.1/0/0/0 · .7/.3/0/0/0 · .4/.4/.2/0/0 · .2/.5/.3/0/0 | — · 1 / 1–2 / 2 / 2 | — |
| `works-noxious` (compound; works) | single 1 / single .8, L .2 / single .7, L .3 / single .6, L .4 | 5–6 / 5.5–6.5 / 6–7.5 / 7–8.5 | 6–8 / 7–10 / 10–14 / 12–16 | 0 · 0 (0) | 0 · .2 | 0 | .9/.1/0/0/0 | — · 1 / 1 / 2 / 2 | axis `water` where the class needs running water (V02 §3.14.6) |
| `yard` (compound; shed) | single 1 / single 1 / single .8, L .2 / single .7, L .3 | 4–5 / 4.5–5.5 / 5–6.5 / 5.5–7 | 7–9 / 9–12 / 11–15 / 13–17 | 0 · 0 (0) | 0 · .1 | 0 | 1/0/0/0/0 | — · 0 | — |
| `kiln-yard` (compound; kiln) | towerHouse 1 (no range) | 3–3.2 / 3.4–4 / 4–4.8 / 4.6–5.4 | 0 | 0 · 0 (0) | 0 · — | 0 | 1/0/0/0/0 | — · 0 | towerShape round .8, square .2 (a bottle kiln: the tower's cone) |
| `market-hall` (institution; hall) | single 1 / single 1 / single .85, L .15 / single .7, L .15, T .15 | 9–11 / 10–12 / 11–13 / 12–14 | 22–28 / 28–36 / 34–42 / 40–50 | 0 / 0 / 0–1 / 0–1 · 0 (0 / 0 / .1 / .2) | 0 · .5 | .3 / .5 / .6 / .8 | 1/0/0/0/0 (arcaded) | hall (the upper hall) · 0 / 0 / 1 / 1 | `arcade` on; cupola .1 / .2 / .35 / .5 |
| `hall` (institution; hall) | single .6, T .4 / single .5, T .35, H .15 / single .35, T .35, H .2, rectCourt .1 / single .2, T .3, H .3, rectCourt .1, cross .1 | 7–9 / 7.5–9.5 / 8–10 / 9–11 | 11–17 / 14–20 / 15–23 / 18–28 | 0–1 · 0 (.1 / .15 / .2 / .3) | .1 · .3 / .35 / .4 / .5 | .3 / .45 / .6 / .8 | 0/.2/.8/0/0 · 0/.1/.8/.1/0 · 0/0/.7/.3/0 · 0/0/.5/.5/0 | hall · 2 / 2–3 / 3 / 4 | cupola .1 / .15 / .25 / .4; with `fantasyShapes`: regularCourt .1 at r |
| `inn-compound` (compound; inn) | single .6, L .4 / single .4, L .45, U .15 / single .2, L .45, U .3, rectCourt .05 / L .4, U .45, rectCourt .15 | 5–6 / 5.5–6.5 / 6–7 / 6–7 | 8–11 / 10–13 / 12–16 / 13–17 | 0 / 0 / 0–1 / 0–1 · 0 (0) | .3 / .25 / .2 / .1 · .3 | .6 / .8 / 1.0 / 1.2 | .3/.3/.4/0/0 · .1/.3/.5/.1/0 · 0/.2/.6/.2/0 · 0/0/.5/.5/0 | hall (the common room); gate hall on `rectCourt` · 2 / 2–3 / 3 / 4–6 | — |
| `bath-house` (compound; bath hall) | single .7, L .3 / single .6, L .4 / single .6, L .25, T .15 / single .5, T .3, H .2 | 6–8 / 7–9 / 7.5–9.5 / 8–10 | 8–12 / 9–13 / 11–15 / 13–17 | 0 · 0 (0) | 0 · .4 | 0 | .8/.2/0/0/0 · .6/.2/.2/0/0 · .4/.2/.4/0/0 · .2/.2/.6/0/0 | — · 1 / 1 / 2 / 2 | cupola 0 / 0 / .1 / .25 (dome 1) |
| `church` (institution; nave) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door; a church porch by M8b | — · 0–1 | westTowers 0–1 (the chance of one .3 / .6 / .85 / 1, where the template lists no `tower` structure); crossingTower 0 / 0 / .1 / .2; spires by `spireFactor` |
| `chapel` (institution; nave) | single .9, template .1 / single .8, template .2 / single .7, template .3 / single .5, template .5 | 5–6 / 5.5–6.5 / 5.5–7 / 6–8 | 8–12 / 9–14 / 10–16 / 12–20 | 0 · 0 (0) | 0 · .2 | 0 | .5/0/.5/0/0 | — · 0 | — |
| `cathedral` (institution; nave and choir) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door | — · 0 | westTowers 2 (always, at the west corners); crossingTower .5 / .6 / .7 / .8; towerShape square 1; spires by `spireFactor` |
| `cloister` (institution; church) | template 1 | the template's | the template's | 0 · 0 (0) | 0 · the template's | 0 | the template's door | — · 0 | westTowers 0–1 (.5); crossingTower .2 |
| `court-institution` (institution; main range, its `ranges` absorbed) | single .2, L .4, U .4 / L .3, U .45, rectCourt .25 / rectCourt .45, U .35, plotRing .1, H .1 / rectCourt .45, plotRing .15, U .15, H .15, cross .1 | 6–7 / 6.5–7.5 / 7–8 / 7.5–8.5 | 12–18 / 15–21 / 18–26 / 22–32 | 0 / 0–1 / 0–1 / 1–2 · 0 (.1) / 0–1 (.2) / 0–1 (.3) / 0–2 (.4) | 0 · .4 / .45 / .5 / .55 | .5 / .7 / .9 / 1.1 | 0/.3/.7/0/0 · 0/.2/.7/.1/0 · 0/.1/.6/.3/0 · 0/0/.5/.5/0 | hall (by its programme); gate hall on closed families · 3 / 4 / 5–7 / 6–10 | gate tower 0 / .1 / .2 / .3; cupola 0 / .1 / .2 / .3; courtMinM 8 / 9 / 10 / 12 |
| `barracks` (compound; block) | single .7, L .3 / single .4, L .45, U .15 / single .3, L .45, U .2, rectCourt .05 / single .2, L .45, U .35 | 7–8 / 7–8.5 / 7.5–8.5 / 7.5–8.5 | 16–22 / 17–23 / 18–24 / 19–25 | 0 · 0 (.1 / .1 / .2 / .3) | 0 · .3 | .3 / .4 / .5 / .6 | .7/.3/0/0/0 | hall (the mess) · 2 / 3 / 4 / 5 | — |
| `watch-house` (detached; post) | single 1 | 4–5 / 4.5–5.5 / 5–6 / 5.5–6.5 | 5–6.5 / 5.5–7 / 6.5–8 / 7.5–9 | 0 · 0 (0) | 0 · .3 | 0 | .8/.2/0/0/0 | — · 1 | — (a towered post is the `watchtower` class, `tower` family) |
| `tower` (detached; tower) | towerHouse 1 | 3.5–4.2 / 4–4.6 / 3.6–4.4 / 4.2–4.8 (the tower's side 1.2–2 w) | 0 / 0 / 5–7 / 7–10 (the attached range) | 0 · 0 (.1 / .15 / .2 / .3) — M5 lays its tower | 0 · 0 | 0 / 0 / .3 / .5 (on the range) | .5/.5/0/0/0 | tower rooms · 1 / 1–2 / 2 / 3 | towerShape square .5, round .4, octagon .1; towerFlat .3; with `fantasyShapes`: regularCourt .1 at pr and r |
| `castle` (institution) | template 1 (the base's §4.2 S3 castle and bailey) | the template's | the template's | the template's | 0 · the template's | 0 | the template's | — · 0–2 | the palace override (V02 §3.10.3) |
| `farm` (compound; farmhouse) | single 1 / single .8, L .2 / single .7, L .3 / single .5, L .35, T .15 | 4.2–5 / 4.5–5.5 / 5–6 / 5.5–6.5 | 6–7.5 / 7–9 / 8.5–11.5 / 10–13 | 0 · 0 (0) | .3 · .5 | 0 / .2 / .4 / .6 | .8/.2/0/0/0 · .7/.2/.1/0/0 · .6/.2/.2/0/0 · .4/.3/.3/0/0 | — · 1 / 1–2 / 2 / 2–3 | — |
| `mill` (compound; mill house; `wheel or sails` attached) | single .9, L .1 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 7–9.5 / 8–11 / 9–12 / 10–13 | 0 · 0 (0) | .2 · .3 | .3 | .9/.1/0/0/0 | — · 1 | the class overrides `watermill` and `windmill` (V02 §3.10.3) |
| `extractive` (compound; works shed) | single 1 | 3–3.8 / 3.5–4.5 / 4–5 / 4.5–5.5 | 4–5.5 / 5–7 / 7–9 / 8.5–10.5 | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | — · 0 | — |
| `landing-yard` (compound; sheds) | single 1 / single 1 / single .85, L .15 / single .75, L .25 | 4–5 / 4.5–6 / 5.5–6.5 / 6–7.5 | 6–7.5 / 8.5–10.5 / 11–14 / 14–18 | 0 · 0 (0) | 0 · .1 | 0 | 1/0/0/0/0 | — · 0 | axis `water` |
| `stable-yard` (compound; stable) | single .8, L .2 / single .7, L .3 / single .5, L .4, U .1 / single .3, L .45, U .25 | 5–6 / 5.5–6.5 / 6–7 / 6.5–7.5 | 7–10 / 9–12 / 11–14 / 13–16 | 0 · 0 (0) | 0 · .3 | .2 / .3 / .4 / .5 | .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0 · .6/.4/0/0/0 | — · 0 / 1 / 1 / 1 | dormer kinds hoist .4, dormer .6 |
| `burial-ground` (institution; no required structure — V02 §3.10.7's exemption; its mortuary chapel reads this row through `roleKeys`) | single 1 | 4–5 / 4.5–5.5 / 5–6 / 5–6.5 | 5–7 / 6–9 / 8–10 / 9–12 | 0 · 0 (0) | 0 · .2 | 0 | .5/0/.5/0/0 | — · 0 | the `cemetery` class's row; floors by V11 §3.6.4's `burial-ground` heights (one storey) |
| `fort` (compound; tower) | towerHouse 1 (no range) | 6–7 / 7–8 / 8.5–10 / 10.5–12 (the tower's side 1.2–2 w) | 0 | 0 · 0 (0) — M5 lays its tower | 0 · 0 | 0 | 1/0/0/0/0 | tower rooms · 1 / 1 / 2 / 2 | towerShape square .6, round .3, octagon .1; towerFlat .7 (a battlemented roof; the `tower` heights row's `parapetCm` 60, which `fort` reads, V11 §3.6.1); the second tower, the gate and the barracks range by `roleKeys` (V02 §3.10.4) |
| `arena` (institution; stands) — the amphitheatre (a family row since V11's 35) | `ovalCourt` 1 at every anchor | the façade 4–6 | — (claim-sized) | 0 · 0 (0) | 0 · 0 | 0 | 1/0/0/0/0 | none (gate halls only, V02 §3.8) · 0 | `caveaM` 8–12 / 10–14 / 12–18 / 14–22; floors 2 / 2–3 / 3 / 3–4; `arcade` off / off / on / on (every façade wing); `courtMinM` 16 / 20 / 24 / 28; `claimShare` .5–.8 (the arena fills its precinct; J-V2.87); `coverageMax` .85; cupola 0; its `gate`s absorbed (M8b); its plot V11 §3.6.1's `arena` row (plot p50 2 500 / 4 000 / 6 000 / 9 000 m², footprint "the claim's"; X27); heights V11's `hall` row |

**3.10.3 Class override rows** (`<class>/<band>`; step 2 of the chain). Each override row is an `alias` of the family named
beside it, and only the cells named override it — also where another class reads the row through `composition.classFamily`
(`v.manor_house` → `manor`):

| class (family) | overriding cells |
|---|---|
| `manor` (`dwelling-compound`) — the giant manor | families: single .7, L .3 (a fallen one) / single .45, L .35, T .2 / L .2, T .25, H .25, U .3 / rectCourt .35, plotRing .2, U .2, H .15, gridWalk .1 — with `fantasyShapes` on, regularCourt .2, starCourt .15, chordArc .15 added at pr and r; width 5–6 / 5–6 / 7–8 / 7.5–9; length 9–11 / 10–13 / 16–22 / 20–30; blocks 0 / 0 / 0–1 / 1–2; towers 0 (.05) / 0 (.15) / 0–1 (.3) / 1–3 (.5); gate tower 0 / .05 / .15 / .3; back .3 / .3 / .2 / .1; hip .35 / .4 / .5 / .55; dormers .8 / 1.0 / 1.2 / 1.4; porch .3/.7/0/0/0 · .1/.5/.4/0/0 · 0/.3/.6/.1/0 · 0/0/.4/.6/0; chapel 0 / .05 / .2 / .4; hearths 3–5 / 4–6 / 5–9 / 8–14; courtMinM 6 / 7 / 8 / 9; cupola 0 / 0 / .1 / .2; coverageMax .65. **Budget (J-V2.35):** V11 §3.6.1's `manor` override as adopted (J-V11.39) — prosperous footprint p50 420 m², rich p50 650 m² (p10 455, p90 943 by the 0.7 / 1.45 ratios), rich plot 3 000 m², the main slot's `footprintShare` ≥ 0.6 at prosperous and rich (the court's ranges hold the kitchen and lodgings); the rows' medians sit at 1.1–1.3 × those budgets (the table after this one) |
| `town_house` (`dwelling-compound`) — the burgess's urban compound | families: single .7, L .3 / single .5, L .35, T .15 / single .3, L .4, T .3 / L .35, T .3, U .2, H .15; towers 0 (0 / .1 / .2 / .25); back .6 / .7 / .8 / .9; hip .2; dormers 1.0 / 1.1 / 1.3 / 1.6; porch .4/.3/0/0/.3 · .3/.35/.05/0/.3 · .2/.4/.1/0/.3 · 0/.4/.3/.1/.2; hearths 2 / 2 / 2–3 / 3–4 |
| `house` (`dwelling-row` at p and m, `dwelling-detached` at pr and r — V11's per-band family) | at pr: single .5, L .35, T .15; at r: single .3, L .35, T .25, H .1; hall at r only (the `house` unit form) |
| `cottage` (`dwelling-detached`) | families single .8, L .2 / single .7, L .3 / single .6, L .4 / single .5, L .5; back .3 / .35 / .45 / .5; dormers 0 / 0 / .3 / .6; porch .9/.1/0/0/0 · .8/.15/0/0/.05 · .7/.2/0/0/.1 · .5/.3/.2/0/0; hearths 1 / 1 / 1–2 / 1–2 (an `L` at p is infeasible by M3's budget and falls away) |
| `watermill` (`mill`) | axis `water`; the attached `wheel` (M8b) |
| `windmill` (`mill`) | the attached `sails` force `towerHouse` with no range; towerShape round .6, square .4 (a tower mill, or a post mill's body); width 5–6.5 |
| `v.longhouse` (`dwelling-detached`; V07's village class, read by the chain's step 2 under its own `v.` key) | families single 1; axis `fallLine` (V07's hard rule: the axis along the fall line where the slope exceeds 3 %, the byre end downhill in `MassingRef.low`); width 5–6 / 5.5–6.5 / 5.5–6.5 / 5.5–6.5; length 14–22 / 16–26 / 16–26 / 16–26; back 0; hip .3; dormers 0; porch .9/.1/0/0/0; hearths 1 |
| `palace` (`castle`) | at p and m template 1; at pr and r families rectCourt .4, plotRing .2, H .2, U .2; width 8–10; length 24–50; towers 1–4 (.5); gate tower .5; cupola .3; rooms hall, chapel .6, gate hall |
| `mage_tower` (`tower`) | towerShape round .6, octagon .3, square .1; towerFlat 0; cupola .3 (tip 1); with `fantasyShapes`: regularCourt .15 at pr and r |
| `watchtower` (`tower`) | range length 0; towerShape square .5, round .5; towerFlat .6 |

The classes `cemetery` and `arena` read their own template families' rows, `burial-ground` and `arena` (V02 §3.10.2),
with no class override row; the `arena` plot is V11 §3.6.1's `arena` row.

**The rows against the budgets.** Each row's median footprint — the family weights at their median width
and length, `crossWing` 2.25 m forward and 1.5 m back, a `towerHouse` tower of side 1.6 w by its shape weights, by M5's
constructions — against the template's p50 × the main
slot's share (V11 §3.6.1's p50; shares: 1 for a one-structure template, 0.9 where only small optional structures stand
beside the main, 0.6 where a second building is required or several are drawn — the `mainShareDefault`), computed by
M5's constructions (receipt `docs/validation/coherence/receipts/V02/medians.py` → `medians.out`, re-executed 2026-09-29). Every ratio lies in [0.91, 1.31], inside
`[sizeBandLo, sizeBandHi]` = [0.7, 1.45] of the p50, so M10 trims rather than rebuilds; the few rows near 1.3 are the rich courts the
owner asked for. The `manor` rows are measured against V11 §3.6.1's `manor` override.

| row | share | p: median / budget = ratio | m | pr | r |
|---|---|---|---|---|---|
| `dwelling-detached` | 0.9 | 33 / 32 = 1.04 | 52 / 45 = 1.16 | 84 / 72 = 1.17 | 123 / 99 = 1.24 |
| `house` (pr, r) | 0.9 | — | — | 89 / 72 = 1.24 | 129 / 99 = 1.31 |
| `cottage` | 0.9 | 40 / 32 = 1.26 | 56 / 45 = 1.26 | 83 / 72 = 1.15 | 106 / 99 = 1.07 |
| `dwelling-compound` | 0.6 | 64 / 54 = 1.18 | 89 / 72 = 1.24 | 128 / 108 = 1.19 | 197 / 156 = 1.26 |
| `town_house` | 0.6 | 64 / 54 = 1.18 | 89 / 72 = 1.24 | 121 / 108 = 1.12 | 201 / 156 = 1.29 |
| `manor` (V11's override) | 0.6 | 66 / 54 = 1.22 | 85 / 72 = 1.18 | 283 / 252 = 1.12 | 496 / 390 = 1.27 |
| `workshop-yard` | 0.6 | 21 / 18 = 1.17 | 37 / 30 = 1.22 | 57 / 48 = 1.18 | 85 / 72 = 1.18 |
| `works-noxious` | 0.6 | 38 / 36 = 1.07 | 62 / 54 = 1.16 | 98 / 84 = 1.16 | 137 / 120 = 1.14 |
| `yard` | 0.9 | 36 / 36 = 1.00 | 52 / 54 = 0.97 | 83 / 81 = 1.03 | 110 / 108 = 1.02 |
| `kiln-yard` | 0.6 | 20 / 18 = 1.13 | 29 / 27 = 1.08 | 41 / 42 = 0.98 | 53 / 54 = 0.98 |
| `market-hall` | 1.0 | 250 / 250 = 1.00 | 352 / 350 = 1.01 | 503 / 500 = 1.01 | 680 / 700 = 0.97 |
| `hall` | 0.85 | 150 / 128 = 1.17 | 212 / 187 = 1.13 | 305 / 272 = 1.12 | 438 / 382 = 1.14 |
| `inn-compound` | 0.6 | 68 / 60 = 1.13 | 103 / 90 = 1.15 | 165 / 132 = 1.25 | 219 / 180 = 1.21 |
| `bath-house` | 0.75 | 93 / 90 = 1.03 | 130 / 120 = 1.08 | 153 / 165 = 0.93 | 215 / 225 = 0.96 |
| `court-institution` | 0.9 | 176 / 180 = 0.97 | 308 / 270 = 1.14 | 457 / 405 = 1.13 | 559 / 540 = 1.04 |
| `barracks` | 0.6 | 168 / 180 = 0.94 | 230 / 210 = 1.10 | 278 / 240 = 1.16 | 310 / 270 = 1.15 |
| `watch-house` | 1.0 | 26 / 25 = 1.03 | 31 / 30 = 1.04 | 40 / 40 = 1.00 | 50 / 50 = 0.99 |
| `tower` | 0.85 | 34 / 34 = 0.99 | 42 / 42 = 0.99 | 60 / 60 = 1.01 | 84 / 85 = 0.99 |
| `farm` | 0.5 | 31 / 30 = 1.03 | 47 / 40 = 1.18 | 66 / 60 = 1.10 | 91 / 80 = 1.14 |
| `mill` | 0.8 | 50 / 48 = 1.04 | 62 / 64 = 0.97 | 74 / 80 = 0.93 | 87 / 96 = 0.91 |
| `extractive` | 0.8 | 16 / 16 = 1.01 | 24 / 24 = 1.00 | 36 / 36 = 1.00 | 48 / 48 = 0.99 |
| `landing-yard` | 0.5 | 30 / 30 = 1.01 | 50 / 50 = 1.00 | 81 / 80 = 1.01 | 124 / 120 = 1.03 |
| `stable-yard` | 0.8 | 56 / 48 = 1.16 | 76 / 72 = 1.06 | 112 / 104 = 1.08 | 163 / 144 = 1.13 |
| `hovel` | 1.0 | 17 / 16 = 1.04 | 21 / 20 = 1.05 | 21 / 20 = 1.05 | 21 / 20 = 1.05 |
| `fort` | 0.6 | 98 / 90 = 1.09 | 131 / 120 = 1.09 | 199 / 180 = 1.10 | 294 / 270 = 1.09 |
| `burial-ground` | 0.6 | 27 / 24 = 1.12 | 38 / 36 = 1.04 | 50 / 48 = 1.03 | 60 / 60 = 1.01 |

The `fort` and `burial-ground` rows are measured by the same arithmetic (receipt
`docs/validation/coherence/receipts/V02/medians_new.py` → `medians_new.out`: 1.01–1.12; every ratio of the table stays in [0.91, 1.31]). The row families (`row`),
the templates (`church`, `chapel`'s template share, `cathedral`, `cloister`, `castle`), the claim-sized `arena` (its band
`claimShare × area(H)`, `slotBand`) and `cluster` are sized by their quads, templates, claims and cluster rows, not by these
medians.

**The stepped rows against their bands.** Receipt `docs/validation/coherence/receipts/V02/stepped_receipt.py` → `stepped_receipt.out`, which
evaluates V02 §3.15.1's closed forms: ST0's least stack at the least draws
and the steepest grade, the median stack (its tier-0 width × depth, its own proportion, the summit offset), the tiered
tower against its tower-family budget, and a Monte-Carlo of `tiersTruncated` (N = 4 000 per anchor) on precinct hints
sized for the row's 90th-percentile stack at `claimHi` (the T-V2-46 bar; the Monte-Carlo column is the recorded output of an unsaved run, PLAUSIBLE until T-V2-46 measures
it, V02 §12). The claim-sized rows are measured against
`claimShare × area(H)`, not a template number.

| row | anchor | ST0 least `Wmin × Dmin` (m) | median stack: tier 0 `W × D` (m), own aspect, summit offset | band | `tiersTruncated` on the p90 hint |
|---|---|---|---|---|---|
| `stepped-temple` | p / m / pr / r | 9.0 × 15.0 / 12.0 × 20.8 / 15.0 × 23.7 / 19.0 × 30.6 | 15.0 × 19.8, .76, 2.4 m / 19.0 × 26.3, .72, 3.6 m / 23.0 × 29.7, .77, 3.3 m / 30.5 × 39.3, .78, 4.4 m | `claimShare` .35–.6 × area(H) | 1.0 / 1.6 / 4.6 / 7.0 % |
| `terraced-palace` | p / m / pr / r | 9.0 × 11.3 / 9.0 × 11.3 / 19.0 × 21.8 / 23.0 × 26.3 | the top face must hold its flight (≥ `h ÷ g + landingM`), so its own aspect is 1.2–1.7 | `claimShare` .35–.6 × area(H) | 3.2 / 4.8 / 6.0 / 7.6 % |
| `stepped-monument` | p / m / pr / r | 9.0 × 17.4 / 12.0 × 22.3 / 15.0 × 27.0 / 18.0 × 31.5 | 16.5 × 23.6, .70, 3.5 m / 21.0 × 29.8, .71, 4.4 m / 25.5 × 35.6, .72, 5.1 m / 30.0 × 41.2, .73, 5.6 m | none (V04's plan cell; no ST8) | 5.1 / 6.3 / 7.3 / 7.5 % |
| `tiered-tower` | p / m / pr / r | 4.2 × 4.2 / 4.2 × 4.2 / 4.6 × 4.6 / 5.4 × 5.4 | 4.6 × 4.6 (21 m²) / 5.7 × 5.7 (32 m²) / 6.3 × 6.3 (40 m²) / 7.8 × 7.8 (61 m²) | the `tower` family's 34 / 42 / 60 / 85 m² (× 0.85) — every median stack fits | — (not claim-sized) |

**3.10.4 Structure roles** — the rows another slot reads (`<key>/<band>`) and `composition.roleKeys`, which maps each
structure name of V11 §3.6.1 to its key. The first required structure of a template is the main slot (the family chain) and needs no entry — a template with no
required structure (`burial-ground`) takes V02 §3.10.7's exemption; a later instance of the same name (a second `block`, `kiln` or `sheds`) reads the family-specific
entry. Role rows (a row states only what differs from `outbuilding`; `alias` reads another row):

| role key | families | wing width m | range length m `p / m / pr / r` | other cells |
|---|---|---|---|---|
| `shed` | single 1 | 3–4.5 | 4–8 | hip 0; hearths 0 |
| `kitchen` | single 1 | 4.5–6 | 6–10 | hip .3; hearths 1 |
| `stable` | single .8, L .2 at r (else single 1) | 5–6.5 | 8–16 / 10–18 / 12–20 / 14–24 | dormers .2 (hoist .5); hearths 0 |
| `store` | single 1 | 4.5–6 / 5–6.5 / 5–7 / 5.5–7.5 | 6–10 / 6–12 / 8–14 / 8–16 | hearths 0 |
| `staffDwelling` | alias `dwelling-detached` at its p and m cells at every band | — | — | — |
| `workshop` | single .8, L .2 | 5–6.5 / 5.5–7 / 5.5–7 / 6–7.5 | 7–12 / 8–14 / 8–14 / 9–16 | hearths 1 |
| `forge` | single 1 | 5–6.5 | 6–10 / 6–10 / 7–12 / 8–14 | porch (the open front) .5/0/0/0/.5; hearths 1 (+ the smoke stack of V02 §3.14.6) |
| `office` | single 1 | 4.5–6 | 5–9 | hearths 1 |
| `kiln` | alias `kiln-yard` | — | — | — |
| `annex` | single 1 | 5–7 | 6–12 | — |
| `brewhouse` | single .8, L .2 | 5–7 | 8–14 | hearths 1 |
| `furnace` | single 1 | 4–5 | 4–7 | hearths 1 |
| `chapterHouse` | towerHouse 1 (no range) | 7–9 | 0 | towerShape octagon .7, square .2, round .1 (a polygonal chapter house); floors the template's |
| `closeHouse` | alias `dwelling-detached` | — | — | — |
| `cloisterRing` | rectCourt 1 | 3–4 (a gallery) | 16–30 / 18–34 / 20–40 / 24–48 | floors 1–1; courtMinM 10 / 12 / 14 / 16; hip 0; dormers 0; hearths 0 |
| `range` | single 1 | 7–9 | 20–40 | hip .3; dormers .3; hearths 1–2 |
| `gatehouse` | single .7, towerHouse .3 | 6–8 | 8–12 | turret .2; its single range carries a gate hall at its middle (V02 §3.8) |
| `barn` | single .9, L .1 | 7–10 | 12–20 / 14–24 / 16–30 / 18–34 | hip .4; dormers 0; hearths 0 |
| `byre` | single 1 | 5–6.5 | 8–16 | hip .3; hearths 0 |
| `armoury` | single 1 | 6–8 | 10–16 | hearths 0 |
| `charnelHouse` | single 1 | 4–6 | 5–8 | floors 1–1; hip .3; dormers 0; porch 1/0/0/0/0; hearths 0 (a burial ground's charnel house; its bones are V04's) |
| `lychgate` (J-V2.88) | single 1 at p and m | 2.5–3.5 at p and m | 3–4.5 at p and m | at p and m a roofed gate: floors 1–1, hip 0, dormers 0, porch 1/0/0/0/0, hearths 0; at pr and r alias `gatehouse` (a burial ground's gatehouse) |
| `outbuilding` (the last step of every other slot's chain) | single 1 | 4.5–6 (a barn 7–10) | 6–20 | blocks 0; towers 0; back 0 (a barn .2); hip .3; dormers 0; porch 1/0/0/0/0; hearths 0 (a kitchen or brewhouse 1) |

`composition.roleKeys` (family `*` = any family; a family-specific row wins; `attach` `slot` unless named):

| family | V11 structure names | key |
|---|---|---|
| `*` | `shed`, `sheds` | `shed` |
| `*` | `kitchen` | `kitchen` |
| `*` | `stable`, `stables` | `stable` |
| `*` | `store`, `stores` | `store` |
| `*` | `dwelling (staff)`, `journeymen` | `staffDwelling` |
| `*` | `workshop` | `workshop` |
| `*` | `forge` | `forge` |
| `workshop-yard` | `forge or workshop` | `forge` where the class's profile `emits.fire` ≥ 1, else `workshop` |
| `*` | `house` | `dwelling-detached` (a family row) |
| `*` | `office` | `office` |
| `kiln-yard` | `kiln` (the second) | `kiln` |
| `*` | `annex` | `annex` |
| `*` | `brewhouse` | `brewhouse` |
| `*` | `furnace` | `furnace` |
| `cathedral` | `chapter house` · `close houses` · `cloister` | `chapterHouse` · `closeHouse` · `cloisterRing` |
| `cloister` | `cloister ring` · `ranges` · `gatehouse` · `barns` | `cloisterRing` · `range` · `gatehouse` · `barn` |
| `*` | `gatehouse` · `barn`, `barns` · `byre` · `armoury` | `gatehouse` · `barn` · `byre` · `armoury` |
| `barracks` | `block` (the second) | `barracks` (the family row) |
| `extractive` | `hut` | `hovel` (the family row) |
| `landing-yard` | `sheds` (the second and third) | `landing-yard` (the family row) |
| `court-institution` | `chapel` | `chapel` (the family row) |
| `court-institution` | `ranges` | `absorbed`, **attach `main`** (M8b) |
| `church` | `tower` · `porch` | `westTower` · `churchPorch`, **attach `main`** |
| `cathedral` | `towers` | `westTower`, **attach `main`** |
| `mill` | `wheel or sails` | `sails` for the `windmill` class, else `wheel`, **attach `main`** |
| `*` | `yard (open)`, `yard (parade)`, `yard`, `pits or vats (yard parts)`, `stacks (yard parts)`, `spoil (yard part)`, `slip or stage (yard part)` | `yardPart` (no building; S11's yard partition) |
| `tavern-row` | `cellar store` | `basement` (the class's cellar row holds it) |
| `burial-ground` | `mortuary chapel` · `charnel house` · `gatehouse or lychgate` | `burial-ground` (the family row) · `charnelHouse` · `lychgate` |
| `fort` | `tower` (the second) · `gate` · `range (barracks)` | `tower` (the family row) · `gatehouse` · `barracks` (the family row) |
| `arena` | `gate` | `absorbed`, **attach `main`** (M8b: the oval's gate passages) |

The `castle` family's parts are the base's §4.2 S3 construction and take no role rows.

**3.10.5 `composition.classFamily`** — the composition key of each of V07's village classes, keyed by its **`v.` key** as
V07 §2.4 keys it (V11 §2.9; J-V7.95). **This table is the home and the one source of the village classes' composition
keys**; V07 cites it (J-V7.82) and names no second source: each of V07's `v.` rows names a V11 §3.6.1
`templateFamily` only for its budget rows, read by the chain's step 4 only where this table's step-3 row breaks the
arrangement law (V02 X13). V03's programme resolution (V03 §3.2 A1 (3)) and its slot order read it too, for a `v.` key
without a programme row (V03 §2.4; J-V3.111), so a change of a row's key changes that village building's rooms as well
as its massing. A
`v.` key names a village-only class and is read wherever a building of that class stands, at any rung (a
standing building keeps its class across V07 §3.12's hand-offs). A town class never reads this table: at a village rung it
plays its `villageForm`'s `v.` class (V11 §3.22), which reads its row here, and a town class with no village form plays
itself through its `templateFamily` (the chain's step 4). The rows are keyed by the `v.` keys alone (J-V2.96):

| class (V07 §2.4) | key |
|---|---|
| `v.hovel` · `v.cottage` · `v.chapel` · `v.inn` · `v.watchtower` | `hovel` · `cottage` (the override) · `chapel` · `inn-compound` · `tower` |
| `v.longhouse` | `v.longhouse` (its own override row, V02 §3.10.3, which the chain's step 2 reads first) |
| `v.farmstead` · `v.yeoman_house` · `v.manor_house` · `v.parsonage` · `v.reeve_house` | `farm` · `dwelling-compound` · `manor` · `dwelling-compound` · `dwelling-compound` |
| `v.parish_church` · `v.tithe_barn` | `church` · `barn` |
| `v.watermill` · `v.windmill` | `watermill` · `windmill` (the overrides) |
| `v.smithy` · `v.potter` · `v.tannery` | `workshop-yard` · `kiln-yard` · `works-noxious` |
| `v.alehouse` · `v.shop` · `v.bakehouse` | `dwelling-detached` · `dwelling-detached` · `kitchen` |
| `v.landing` · `v.wood_yard` · `v.charcoal_pit` | `landing-yard` · `yard` · `hovel` |
| `v.pound` | `yardPart` — no building ("a walled pen", V07) |

**3.10.6 The default rows, the underground rows and the heights columns.** Every arrangement has a full default row
(`default.<arrangement>/<band>`), so no chain ends on an undefined cell:

| row | cells |
|---|---|
| `default.row` | families row 1; back .1 / .3 / .5 / .6; hip .1; dormers .2 / .4 / .8 / 1.0; porch .9/0/0/0/.1 · .7/.1/0/0/.2 · .5/.2/0/0/.3 · .4/.3/0/0/.3; hearths 1 / 1 / 2 / 2 |
| `default.detached`, `default.compound` | families single 1; wing width 5–6.5; range length 8–14; blocks 0; towers 0 (0); back .2; hip .3; dormers 0 / .3 / .6 / .8; porch .8/.2/0/0/0; hearths 1 |
| `default.institution` | as `default.compound`, with families single .8, T .2 at pr and r |
| `default.hovel`, `default.cluster` | alias `hovel`, `cluster` |
| `default.underground` (every `<prefix>@underground` row aliases it, with the prefix's wing width and range length) | families single 1; roof `flat` forced; blocks 0; towers 0; back 0; dormers 0; porch 1/0/0/0/0; hearths 0 |

**Heights (item 427; J-V2.33).** The storey heights, the roof pitch, `towerStoreys`, `spireFactor` and item 427's three
columns `attic`, `parapetCm` and `towerStoreyCm` are V11's `HeightsRow` (V11 §3.6.4 writes their values), read unchanged. The reading rule is this volume's: `attic` true admits dormers on a one-storey wing (V02 §3.7);
`parapetCm` rises above a flat roof's eave (M11, M12) and is the parapet `deckLevel` subtracts; `towerStoreyCm`, where the
row gives it, is a church's or cathedral's tower storey, and where it is absent a tower's storeys are `storeyCm.upper`;
`fort` reads the `tower` row and `arena` the `hall` row (V11 §3.6.1).

**3.10.7 The arrangement law and the load checks (T-V2-33).** A row read under a `row` arrangement may carry only the
family `row`; under `compound`, `detached`, `hovel` or `institution` never `row`; under `cluster` or `tents` only
`shelter`. The chain skips a lawless row (V02 §3.2 step 2). At load the compiler of `composition.json` also checks:
every row's family weights non-negative with a positive sum at every band after `fantasyShapes` off; every `alias` acyclic
and naming an existing prefix; every structure name of every compiled template resolved by `roleKeys` or as its main
slot — **a template with no required structure** (`burial-ground`; J-V2.88) has no main slot
by name: each drawn structure is an ordinary slot reading its `roleKeys` key, the first drawn in the template's structure
order is the main building for S11's entrance and household rules (V11 §3.6.5: the mortuary chapel "main when present"), a
template that draws none has no building (open ground), and every one of its names must resolve by `roleKeys`; every class of the compiled roster (town, city, generic, custom archetype and `v.` village) resolved at every band to a
row above `default.*`, except the classes whose template has no building (`market`, `fair_ground`, `druid_grove`, `v.pound`);
every `v.` class of the compiled roster has exactly one `composition.classFamily` row, and every row's `cls` names a `v.` class
of the roster;
a failure is a table error naming the key (§7.6's refusal), never a silent default. The stepped and deck rows add V02
§3.15.4's and V02 §3.16's checks. **Every family a row names has its `MassingFamilyRow`**, and a row naming `ovalCourt` carries `caveaM` and a positive `courtMinM`.

**3.10.8 The `FM` building-scope preset (item 376).** Cells of `composition.json` that carry a `presets.FM` entry
— with V11 §3.24.0's item-110 chance and offer cells, whose `FM` entries (0, V11's) keep every generated stepped or
deck building out of the `FM` goldens: the `manor`,
`dwelling-compound`, `hall` and `dwelling-detached` rich rows' `families` — the five Fantasy Manor families
(`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) at weight 1 each and every other family 0, provenance
`ref:Fantasy Manor build 890 layout families (code)`, P21 (item 59); `fantasyShapes` on; `sunBias` 0.5; and,
**calibrated to Fantasy Manor's measured outputs, not copied from its code** — `blocks`, `towers`, `towerOnBlock`,
`towerShape` (the square share), `dormer.perTenM`, the porch weights with `halfRound`, `secondaryPorch`, `walkStop` and
`walkFree`, and the blocks' `WingRoleRow.hipInset` (0.25 until calibrated, pre-decided fallback 0.5) — each set at M6c by
**V12's `reference` run against Fantasy Manor** (`layer: { preset: 'FM' }`, V12 §3.7.1 (c), V12 §3.7.2 (3)) on V12's `fm.*`
metrics, the free-frame harness (V02 §7.4) its fixture and each run holding at most four cells (V12 §3.7.2), so that the
measured rates of `captures/manor/README-frequencies.md` §3–§4 are reproduced (provenance `ref:Fantasy Manor build 890
element rates (measured)`, written into the cells' `presets.FM` entries with the defaults untouched, V12 §3.7.6); a run
rejected applies the register entry's pre-decided fallback (`fallback-applied`), else the entry is `not-achieved` and
reported to the owner (V12 §3.7.5, V12 §3.11). No V02-private tuner exists. Our realism rules stay on under `FM` (item 59's KEEP OURS): wings in the collision set, a street-facing
main door, metric scale, the plot. **The `FM` building look** a user may choose (item 376; V09's style panel, V02 X10) dresses the drawing only — its
roof weathering, doubled cone facets, paper pitch and its two §8.10 decoration rows (`stepStones`, `wallGrass`) are
the style cells of V02 §5.3.

**3.10.9 Shared cells, the small tables and the constants.** A cell no row names: `courtMinM` 6; `uOpenFront` .2;
`crossWing` fwd 1.5–3 m, back 0–3 m; `towerShape` round .7, square .25, octagon .05; `towerRadiusW` .35–.5;
`towerStoreyDelta` 1–2; `blockStoreyDelta` 0–1; `towerOnBlock` 0; `towerFlat` 0; `westTowers` 0–0; `crossingTower` 0;
`gableToStreetMaxFrontM` 6 / 6.5 / 7.5 / 8; `arcade` false; `cupola` 0 (kinds dome .4, tip .3, pyramid .3); `axis`
`frontage`; `dormer.widthM` 1.0–1.6; `dormer.kinds` dormer .7, wallGable .3; `dormer.entranceGable` 0 / .05 / .15 / .2;
`secondaryPorch` 0; `rooms.hall` false; `rooms.hallLenShare` .35–.55; `rooms.chapel` 0; `rooms.gateHallM` 3–4.5;
`coverageMax` .8 (closed families' rows .65); `claimShare` absent (the constants `claimLo`, `claimHi` for a claim-sized
template); `caveaM` absent. These carry the **diversity ladder**: the families widen from one range to
courts, towers appear only toward the rich rows, dormers, porches and back ranges thicken with the value, and each family
keeps its own ladder, so a poor smith's workshop-yard house is a single range with a shed outshot and a rich armourer's
an L round a work yard (item 19's example, reached through the template's specialisation and its composition key).

**`WingRoleRow` defaults.** `main`: storeys 0, through 2, dormers yes, porch yes, hipInset .5; `range`: 0, through 1,
dormers yes, porch yes; `cross`: 0–1, through 3, dormers yes, porch yes; `gate`: 0, through 2, dormers yes, porch yes;
`block`: the row's `blockStoreyDelta`, roof `hip` only (item 59), hipInset .5 (`FM` .25, calibrated), through 4, dormers
yes, porch yes; `back`: −1, through 0, dormers no, porch no; `service`: −1 to 0, through 0, dormers no, porch no; `tower`,
`turret`: the row's `towerStoreyDelta`, roof by shape, through 5 (a square tower's ring stays whole at a butt joint),
dormers no, porch no; `part`: the template's, dormers no, porch yes (a template's door); `shelter`: 0, dormers no, porch
no. Ranges read their gable or hip from `hipShare`. The roles `tier`, `shrine` and `stair`: V02 §2.6.

**The `stepped` and `ovalCourt` `MassingFamilyRow` rows.** `stepped`: `minFrameW`
[0, 0] (ST0's test instead), `wings` [2, 9] (the tiers), `closed` false, `joints` `butt` (tier 0 and stair 0; the stacked
wings are ST6's), `fantasy` false, provenance own. `ovalCourt`: `minFrameW` [0, 0] (its own M3 test), `wings` [24, 40] (two
rings of 12–20), `closed` true, `joints` `mitre`, `fantasy` false, provenance own.

**`MassingGrowthRow` defaults** (the mutator's lattice; V02 §3.9's table gives each pair's construction): from `single` to
any of `L`, `T`, `H`, `U`, `cross`, `rectCourt`, `towerHouse`, `gridWalk`: keep `main` (anchor: the front for `L`, `U` and `rectCourt`; the hall
for `T` and `H`; the main range for `cross`; either for `gridWalk`); `L → U | rectCourt`: `all`; `L → T | H`: `main`;
`T → H`: `all`; `U → rectCourt`: `all`; every reverse (`rectCourt → U`, `U → L`, `H → T`, `T → single`, `L → single`,
`cross → single`, …): `mainAndOne`, or `main` when the target has one range. Any pair into or out of `plotRing` or a
fantasy family — or `ovalCourt` (the kept range matched against one façade chord) — reads `keep: 'main'`, anchor `either`, under V02 §3.9's ± 15 % rule. `row → row`: `all`; a row building
keeps its family through every change that keeps the `row` arrangement (J-V2.13); V02 §3.9's W3b takes the rest.
`single → stepped` keep `main` (anchor front), `stepped → single` keep `main`, `stepped → stepped` keep
`all` (V02 §3.15.5); every other pair into or out of `stepped` passes through `single`.

**`TowerShapeRow`**: round — sides 12 below 2 m radius, 16 below 4 m, 24 above; roof `cone`, pitch (rise over radius)
1.5. Square — 4 sides, `pyramid`, 1.0. Octagon — 8 sides, `pyramid`, 1.2. **`PorchKindRow`** (depth × width m, storeys,
clearance 0.3 m): `hood` 0.4–0.8 × 1.2–2.0, 0 storeys (at 0.8 of the ground storey); `gabled` 1.5–3.0 × 2.0–3.5, 1;
`twoStorey` 2.5–4.0 × 2.5–4.0, 2; `recessed` 1.0–1.8 × 1.2–2.4, inside the footprint; `halfRound` depth = width ÷ 2 ×
2.0–3.5, 1 (a half-cone roof). **`DormerKindRow`** (depth share of the half span, at the eave, least pitch, gap):
`dormer` 0.45, no, 0.7, 0.4 m; `wallGable` 0.5, yes; `hoist` 0.4, yes; `entranceGable` 0.7, yes.

**Constants not in a row** (each a table cell of `composition.json`'s `constants` row; `own`; calibratable):

| constant | default | read by |
|---|---|---|
| `mitreMinDeg` | 60° | M5 (oblique paths) |
| `collinearMergeDeg` | 178° | M5 |
| `wMinM`, `wMinShare` | 3 m, 0.8 | V02 §3.4, M3 |
| `walkStop`, `walkFree`, `walkGapM` | 0.12, 0, 2 m (the gap `max(walkGapM, 0.3w)`) | M5 `gridWalk`, M3 |
| `plotRingMaxVertices`, `plotRingTolW`, `plotRingMinEdgeW` | 8, 0.25, 1.5 | M5 `plotRing` |
| `blockLenW`, `blockDepthW`, `blockMinPiece`, `blockGapM` | [1, 1.6], [1, 1.4], `max(w/2, 2 m)`, 1 m | M7 |
| `towerCentreOut`, `towerShare`, `turretShare`, `turretRadiusM`, `towerGapM`, `towerOnBlockInsetM`, `westTowerW` | 0.35 r, [0.2, 0.6], [0.25, 0.75], [1.2, 1.8] m, 0.5 m, 0.3 m, [0.45, 0.6] | M8 |
| `wheelWidthM`, `wheelReachM`, `churchPorchWidthM`, `churchPorchDepthM` | [2, 3] m, 4 m, [3, 4.5] m, [3, 5] m | M8b |
| `axisSlope`, `axisSampleM`, `axisWaterM` | 3 %, 2 m, 50 m | M2 |
| `sunBias` | 0.7 (`extension`; 0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets — the `MFCG`, `FTG` and `VG` entries `own`, note `fixed: the parity neutral` (V11 §2.2's rule (a)); the `FM` entry code-read (V02 §3.10.10)) | M5's sunlit choice |
| `backMinWidthM`, `backShedMaxWidthM`, `backFarMarginM`, `backRunTolDeg` | 3 m, 3.5 m, 1 m, 5° | M9 |
| `sizeLo`, `sizeHi`, `mainShareDefault` | 0.9, 1.1, 0.6 | M3, M10 |
| `sizeBandLo`, `sizeBandHi` | 0.7, 1.45 (`own`, note `fixed: the mirror of V11 §3.6.1's derivation ratios, changed only in the change that changes those` — not calibratable, the one exception to this table's heading) | M10 |
| `pitchClamp` | [0.3, 1.8] | M11 |
| `entranceHintMinCos` | cos 60° | M2, M13, V02 §3.7 |
| `bayM`, `endMarginM`, `dormerSetbackM` | 3.6 m, 1.2 m, 0.3 m | V02 §3.7 |
| `hallDoorBackM`, `gateHallJointGapM` | 1.5 m, 0.5 m | V02 §3.8 |
| `dormerEaveTol` | ± 10 % | V02 §3.9 W8, V02 §2.5 |
| `domeRise` | 1.0 (rise ÷ the ring's mean radius) | V02 §5.2 |
| `viewBatchMs` | 16 ms of pool time | V02 §3.11, V02 §6.2 |
| `crypt.clearCm`, `crypt.freeboardCm` | 250 cm, 30 cm | V02 §3.14.5 (item 226) |
| `massing.composed` (option, `extension` over both) | on | V02 §3.1 |
| `fantasyShapes` (model option; §7.8 row, item 402) | off | V02 §3.3 |
| `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare` | 3 m, 1 m, 0.3 m, 1.3, 0.6 | V02 §3.15.1 |
| `claimLo`, `claimHi` | 0.35, 0.6 | `slotBand` for a claim-sized template without a row `claimShare` |
| `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | 12 below a 10 m mean semi-axis, 16 below 20 m, 20 above; [1.15, 1.4]; [0.85, 1] | V02 §3.5 M3, M5 |
| `terrace.wallBandCm` | 250 cm (one refined raster cell) | item 231's wall-side sample |
| `vaultClampCm` | 30 cm | M11 |
| `riserMaxCm` | 20 cm | `stairTreads` (V02 §2.6) |

**3.10.10 The register lines of `composition.json` (J-V2.101).** Every calibratable cell of this volume's tables takes
its calibration register entry from exactly one line below, by V12 §3.11's rule (a line ending "and every other …"
binds the rest of its family). `bar.T-V2-<n>` is V12's bar-metric family (V12 §2.1); the other metrics are V12
§3.4.2's. "The panel rule" is V12 §3.11's: this volume states no second value
for these cells, so a group rated No leaves the entry `not-achieved`, reported to the owner as a table defect, and an
unrated group leaves it *provisional — not rated*.

**The bars' registrations** (J-V2.102). Each bar a line below names as `bar.T-V2-<n>` is
registered by the seat landing the milestone that writes that line's entry (V02 §2.3: the milestone that ships the cell),
in the same change, as a V12 `BenchBarDef` (V12 §2.1) — `id` the bar id (`'T-V2-22'` …), `owner` `'V02'`,
`statistic` the bar's own quantity as the table states it, `stages` `['S11']` (the stage that reads `composition.json`, the
composer's draws keyed by its stage id, V02 §3.12 — so V12 §3.7.2 (4) admits exactly this volume's cells), `towns` the
bar's fixtures with their settings (their rungs and water as V02 §7.1 builds them; each setting's `preset` `'default'`, V12 §2.1's `PresetArm` — no parity
preset; `perSetting` the bar's
own count where it states one, else the fixture family's — B-CITY's per rung, §13.2, one for a hand-built fixture),
`tier` the bar's CI tier (V02 §7's two CI paragraphs), `run` the check V02 §7 states — unless a `StatBarSpec` or
`NullModelSpec` of V12's bar map already carries it as `id` or `ownerBar` (none does). A bar V02 §7 runs in
two tiers on two fixture sets registers once per tier under the same `id` (V12 §2.1: `bar.<barId>` is then the vector of
both, passing only when each passes); a bar named by two lines registers once, with the earlier line. In T-V2-36, T-V2-42
and T-V2-46 — the bars whose clauses wait on a later landing — a clause whose subject the build does not yet produce reads
−1 (every value of theirs is a share, a ratio or 1 / 0, never negative) and is left out of the verdict, which is
`notApplicable` when no clause applies; the entry it confirms is not due before that landing (V12 §3.11's *Milestone exits*).

| bar | `statistic` — its clauses in the bar's order (`unit`) | `towns` | `tier` | registered by (the line) |
|---|---|---|---|---|
| T-V2-22 | V02 §6.1's four times, then V02 §6.2's four, then each stage-3 one-time wait's p95 from the click (`ms`) | B-CITY, every rung and the population cap | `nightly` | the M6b seat (`viewBatchMs`) |
| T-V2-28 | the share of cluster structures and `@underground` buildings meeting the one-wing, one-roof rule (`share`) | B-MASS | `pr` | the M6a seat (the crypt line; its cells ship in M6a's `composition.json`) |
| T-V2-29 | the least within-class Spearman, the non-decreasing check (1 or 0), `hovel`'s `single` share, the rich manors' court-family share, the towers standing where no row allows one (`none`) | B-CITY, every rung | `nightly` | the M6a seat (the geometry rows) |
| T-V2-30 | the share of buildings inside `[0.9 × lo, 1.1 × hi]` (`share`) | B-MASS against the compiled V11 templates; B-CITY, every rung | `pr`; `nightly` — two registrations | the M6a seat (the geometry rows; the small tables' line reads the same bar) |
| T-V2-32 | the short-axis ridge share (`share`) | B-CITY-lite | `nightly` | the M6c seat (`gableToStreetMaxFrontM`) |
| T-V2-36 | each clause 1 or 0 (`none`); −1 until V04's access draw and the crypt derivation (M6-U) land (V02 §8.1, R8) | B-MASS's cathedrals on `dry`, `low`, `damp` and `flood` plots and its stepped great temples on `flood` | `nightly` | the M6a seat (the crypt line) |
| T-V2-37 | the south-facing share at `sunBias` 0.7, then at 0.5 (`share`) | B-MASS's flat northern site (latitude 50°, 200 slots) | `pr` | the M6a seat (`sunBias`; its cell ships with M5) |
| T-V2-42 | each landmark clause 1 or 0, then the arena's hull aspect, its court's share of the hull, its floor's `court` typing (1 or 0) and its closure (1 or 0) (`none`); the landmark clauses −1 before M6a's composed massing | B-MASS (its market hall, kiln yard, church with a transept, rich hall, cathedrals and arena sub-fixture) and B-PLAN; the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the arena line) |
| T-V2-46 | the `tiersTruncated` share per anchor, then each other clause 1 or 0 (`none`); the M6a byte-identity clause −1 before M6a | B-MASS's stepped sub-fixture with the receipt's precinct hints (200 per anchor); the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the stepped line) |
| T-V2-47 | the in-band share, then each other clause 1 or 0 (`none`) | B-MASS's deck sub-fixture; the second known-city fixture | `pr`; `milestone` — two registrations | the M3a-V2 seat (the `@deck` line) |
| T-V2-51 | clauses (a) – (c), each the share of buildings holding it (`share`) | the terrace-wall sub-fixture; the second known-city fixture's terraced wards | `pr`; `milestone` — two registrations | the M3a-V2 seat (`terrace.wallBandCm`) |

| cells — one entry each | method, due | metric | when it cannot confirm |
|---|---|---|---|
| the template-family, class-override, structure-role and default rows' geometry cells at the four anchors (V02 §3.10.2 – V02 §3.10.6: `families` weights, `wingWidthM`, `rangeLenM`, `crossWing`, `courtMinM`, `uOpenFront`, `blocks`, `towers`, `towerShape`, `towerRadiusW`, the storey deltas, `towerFlat`, `westTowers`, `crossingTower`, `gateTower`, `turret`, `backRange`, `backLenM`, `backWidthM`, `hipShare`, `cupola`, `dormer`, `porch`, `secondaryPorch`, `rooms`, `floors`, `hearths`, `coverageMax`), the `@underground` rows, V02 §3.10.9's shared cells, and every other calibratable cell of those rows no line below names | `measure` at M6a (T-V2-29's ladder and T-V2-30's budget share on B-CITY, V02 §3.10.3's receipt re-run on the compiled V11 templates), then `panel` at M6 (V02 §7.5 (2), the ladder street), then `corpus` possibility at M-CAL (§13.9) | `bldg.area`, `bar.T-V2-29`, `bar.T-V2-30` | M10's band and shrink keep each building inside its budget whatever the row (V02 §3.5), and SP-V2-1's rich join step (V02 §8.2); otherwise the panel rule |
| `gableToStreetMaxFrontM` (M12's frontage law) | `measure` at M6c (T-V2-32, the NG ridge share, on B-CITY-lite) | `bar.T-V2-32` | none stated: a miss is `not-achieved`, reported; the NG draw-style sheet keeps its own fallback (X14) |
| the `FM` preset's measured-rate entries — `presets.FM` of `blocks`, `towers`, `towerOnBlock`, `towerShape` (the square share), `dormer.perTenM`, the porch weights with `halfRound`, `secondaryPorch`, `walkStop`, `walkFree` and the blocks' `WingRoleRow.hipInset` (V02 §3.10.8) | `reference` run against Fantasy Manor at M6c (`layer: { preset: 'FM' }`, V12 §3.7.2 (3); SP-V2-3), the free-frame harness its fixture | `fm.*` | `hipInset` 0.5 (`fallback-applied`); every other cell `not-achieved`, reported to the owner (V12 §3.7.5) |
| the code-read `FM` entries — the four rich rows' `families` (the five Fantasy Manor families at weight 1, P21) and `sunBias` 0.5 | no entry: their `ref:Fantasy Manor build 890 … (code)` provenance passes V12 §3.11's lint; no run moves them | — | — |
| the mirror constants — `sizeBandLo`, `sizeBandHi` | no entry: `own` with the note `fixed: the mirror of V11 §3.6.1's derivation ratios, changed only in the change that changes those` passes V12 §3.11's lint; no run moves them — a change to V11's ratios changes them in the same change | — | — |
| the parity-neutral entries — `sunBias` 0.5 under `MFCG`, `FTG` and `VG` | no entry: `own` with the note `fixed: the parity neutral` (V11 §2.2's rule (a)) passes V12 §3.11's lint; no run moves them (V12 §3.7.2 (3)) | — | — |
| the stepped rows' `tiers` cells (`count`, `shape`, `insetM`, `solid` and the heights, `taper`, `lowerRoof`, `top`, `stairs`, `stairWidthM`, `stairGrade`, `shrineInsetShare`), `claimShare`, `TierCells.heights`, and the constants `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare`, `riserMaxCm`, `claimLo`, `claimHi` | `measure` at M3a-V2 (T-V2-46's truncation share ≤ 10 % on the receipt's precinct hints; T-V2-44, T-V2-45), then `panel` at M4 (M4-110's stepped-temple item, V12 §3.11's stepped-tiers line) and at M6 (V02 §7.5 (3)) | `tier.count`, `bar.T-V2-46` | the per-building fallbacks V02 §3.15.1 lays (the stair fallback `axial → flights → internal`, ST8's single, each reported) and V02 §6.5's truncation above seven tiers; otherwise the panel rule |
| the `arena` row (`caveaM`, `courtMinM`, `claimShare`) and `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | `measure` at M3a-V2 (T-V2-42's arena bar on B-MASS and the second known-city fixture), then `panel` at M6 (V02 §7.5 (3), the amphitheatre) | `bar.T-V2-42` | M3 removes `ovalCourt` where the least oval does not fit and M14 lays the fallback, reported (X27); otherwise the panel rule |
| the `@deck` rows | `measure` at M3a-V2 (T-V2-47: ≥ 95 % inside the deck band), then `panel` at M4 (M4-110, V12 §3.11's `deck` line) | `deck.buildings`, `bar.T-V2-47` | the panel rule |
| the small tables — `WingRoleRow` (`storeyDelta`, `hipInset` outside `FM`), `MassingFamilyRow` (`minFrameW`, `wings` of our own families; the five Fantasy Manor families' rows keep their `ref:` provenance, P21, and take no entry), `TowerShapeRow`, `PorchKindRow` (shipped at M3a-V2 for V01's entrance reserve, so its entries are written by the M3a-V2 seat and fall due at the measure this line names), `DormerKindRow` — and the massing constants of V02 §3.10.9 (`mitreMinDeg`, `collinearMergeDeg`, `wMinM`, `wMinShare`, `walkStop`, `walkFree`, `walkGapM`, the `plotRing…`, `block…`, `tower…`, `turret…`, `westTowerW`, M8b's four, `axisSlope`, `axisSampleM`, `axisWaterM`, the `back…` four, `sizeLo`, `sizeHi`, `mainShareDefault`, `pitchClamp`, `entranceHintMinCos`, `bayM`, `endMarginM`, `dormerSetbackM`, `hallDoorBackM`, `gateHallJointGapM`, `dormerEaveTol`, `domeRise`), and every other calibratable constant no line names | `measure` at M6a and M6b (SP-V2-1's feasibility share, ≥ 40 % of rich manor plots admitting a court; T-V2-3, T-V2-9 – T-V2-12, T-V2-30), then `panel` at M6 (V02 §7.5 (1)–(2)) | `bldg.area`, `bar.T-V2-30` | SP-V2-1's rich join step (V02 §8.2); otherwise the panel rule |
| `sunBias` (0.7, `extension`) | `panel` at M6 (V02 §7.5 (2); T-V2-37 checks only that the draw reads it), then `corpus` possibility at M-CAL | `bar.T-V2-37` | the panel rule |
| `crypt.clearCm`, `crypt.freeboardCm`, `vaultClampCm` | `measure` by T-V2-36 and T-V2-28 from the landing of V04's access draw, then `panel` at U5 (V4-U5, `realism`; its framing holds the cathedral's crypt, V12 §3.11's `under.catacomb` line) | `crypt.present`, `bar.T-V2-36`, `bar.T-V2-28` | the panel rule |
| `terrace.wallBandCm` | `measure` at M3a-V2 (T-V2-51 (a) – (c) on the terrace-wall sub-fixture and the second known-city fixture), then `panel` at M4 (M4-110's terrace item) | `bar.T-V2-51` | the panel rule |
| `viewBatchMs` | `measure` at M6b (V02 §6.2's measurement; T-V2-22) | `time.model`, `bar.T-V2-22` | V02 §6.2's fallbacks |
| the options `massing.composed` and `fantasyShapes` | no entry: each closes with the note `fixed: an option` (V02 §3.1; the owner's fantasy-as-toggles, D-7, J-V2.5) | — | — |
| the keys and laws — `composition.roleKeys`, `composition.classFamily`, `MassingGrowthRow`'s `keep` and `anchor`, `CompositionRow.axis` and `arcade`, the arrangement law | not calibratable (keys, enumerations and laws, as V12 §3.11 reads V11's `ColumnSpec`): no entry | — | — |

### 3.11 Elaboration by click, staleness and the canonical prior

* **City band.** The massing only (eager): every footprint with its wings and heights, as the base's first map.
* **District band and finer, before any click.** The roofscape of the massing (V02 §5.2) — ridges, hips, valleys, tower
  cones and spires, the cupola — drawn lazily per tile from model data (§8.5's lazy list: "roof constructions and
  hatching"); no composition is needed for it, and the district band requests none.
* **A neighbourhood click** (II.4, V01), an **outline close-up** (V01 §3.8.9: the buildings inside the
  outline, centre-out from the outline's centroid), or a visible tile's request **at the neighbourhood band or finer** under
  `elaborate: 'view'`: the derivation pool runs `compose(…, 'wings')` for each building of the neighbourhood (or tile),
  **centre-out from the click point** (or the tile's centre), each result a cache chunk and its record `current`; the tile
  worker re-rasters the affected tiles as the chunks arrive (`DisplayDelta`, §8.9) — dormers, porches, entrance gables
  appear. A tile's request is sliced into batches of at most `viewBatchMs` of pool time (§12.7's bound) when it
  holds more buildings than one batch composes; the tile draws the massing's roofscape until each batch lands (V02 §6.2).
* **A building click** from the neighbourhood band down: `wings` (if absent or stale), then `rooms`, then `plan` (V03),
  each recorded. At the city and district bands a click on a building is the district's click (V01 §3.8.1: its
  close-up and the `wings` rung), which selects the building without deriving `rooms` or `plan`; a double-click reaches the
  plan at any band (V03 §4.5).
* **What makes the `wings` rung stale — `wingsInputs` (item 261; J-V2.52).** Its recorded inputs are exactly: a digest of
  the building's **base wings** (keys, roles, rings, heights, roofs), the **main entrance** (its wing key, side and offset)
  and any entrance a secondary porch stands at, `Building.massing`, the **slices of `composition.json`** it read, and —
  for the porch's space — the **plot's ring with the footprints of the plot's other buildings and the yard parts** that lie
  within `porch.depthM[1] + clearanceM` of the main entrance (and of the secondary porch's entrance). Nothing else: a
  relet, a household move, a use change, an access, a sub-location, a band drift, a Works stage or a material change
  leaves the rung `current` and draws no change marker (T-V2-21), because dormers and the porch read none of them. A dossier
  event of items 18, 22 or 31 reaches the rung only through those inputs.
* **What makes the `rooms` rung stale.** `wingsInputs`, plus the **occupants' band row and value**, the **household
  count** (V02 §3.8; item 261), the class's programme `hall` row, and its own slices — so a band change or a re-division
  re-derives the composer's rooms and the plan's re-cut starts from the rooms the new band admits. A building's decline is
  no such change: an existence change to `abandoned`, `decayed` or `ruined`, and the households' leaving that comes with
  it, leaves the rung `current`, so the plan as built stands under its damage layer (§2.6 step 7; item 123 (a); V02 §5.7).
* **The canonical prior.** An unstored composition has none to carry: its re-derivation is a pure function of the
  committed massing, and its draws are keyed per wing key (V02 §3.12), so every wing the change kept recomposes exactly as
  before — the least-disruption property item 18 asks of a mutation, obtained by construction. A stored composition is
  re-matched inside the changing event (V02 §3.9 W8) and is never stale (its state is `edited`).
* **Re-rolls.** `regenerate` with `rung: 'wings'` advances `#wings`: dormer counts, kinds and the porches re-draw; the
  massing, a model fact, is unchanged (T-V2-14). `rung: 'rooms'` advances `#rooms`: the hall's length, the chapel. New
  random on the building's plot or block re-derives its massing (S11) with the plot's reroll (§6.1).
* **The exterior's damage reads a plan only where one is in force** (V02 §5.7). A decayed or ruined building, or one
  under a disaster's look, raises no rung for its exterior: its holes and gaps are drawn from the plan a building click
  or V03's `view` derivation put in force (current or stored), and elsewhere the exterior takes its massing reading. A
  change of the decay level or of a look marks no rung stale (`wingsInputs` holds neither), and a plan current before a
  building decays stays current (§2.6 step 7: decay never re-cuts a plan).

### 3.12 Determinism

* **Concerns** (item 341; each with the next append-only u16 id, so no other key moves): `massing` — a geometry
  concern, non-rerollable by salt, attempt cap 3, readers S11 and every operator that re-derives S11 on a plot; keyed by
  the building's entity key (its lineage, minted by S11) with S11's stage id; creation indices 0 (family and width, the
  sunlit coins' base draws), 1 (the family's lengths, sides and walk), 2 (blocks), 3 (towers, the turret and the
  template towers), 4 (the back range and M8b's attached wings), 5 (floors, then the tower storeys), 6 (roofs, the
  towers' flat tops), 7 (the cupola), and — drawn only by the `stepped` family, through `drawTiers` — 8
  (the tiers' count, shape, step, top, stair width, stair grade and shrine; no aspect — ST2 derives it) and 9 (the tiers' heights, in tier order) — so adding a block never shifts a tower's draw. `ovalCourt`
  draws its width at index 0 and its semi-axis factor, axis ratio and seating depth at index 1. `compose.dormers`, `compose.porch` —
  geometry concerns, non-rerollable by salt, attempt cap 0, keyed with `#wings` folded into the building's key (§6.1's
  rung rule); creation index `2 × key + eave` for a dormer row, 0 for the porch, 1 for the secondary porch.
  `compose.rooms` — keyed with `#wings` and `#rooms` folded; creation index 0 (hall), 1 (gate hall), 2 (chapel).
* **Draws in edits and mutations (stated once; J-V2.18).** The designation mutator draws on the base's `siteplan.mutate`:
  W1's family draw with creation index the causing event's `seq` and ordinal 0, and W6's draws with creation index the
  causing event's `seq` and the **new wing's key as ordinal** — one rule, which W6 cites. A `setMassing` `family` op is a
  designation mutation toward the named family and draws on `siteplan.mutate` exactly so (creation index its event's
  `seq`, the new wing's key as ordinal) — replayable, because the stream is a pure function of its key. **Every other
  `setMassing` op and every `setComposition` op draws nothing**: a value the op leaves out takes the row's central value
  (the midpoint of a range cell, the heaviest weight of a weighted one; a stochastically rounded count takes
  round-half-up of the central value). A wing W6 adds over a sealed void draws its access
  on V04's `sewer` key (V02 §3.9 W6), never on these streams. **The bends draw nothing**: each is a
  deterministic function of the op and the committed state, except that a bend to a `family` op (`tiers` on a building
  that is not stepped) draws on `siteplan.mutate` exactly as a `family` op does. A stepped mutation's `drawTiers` takes its
  two streams on `siteplan.mutate` with the causing event's `seq` and the ordinals `nextWingKey` (the group of index 8) and
  `nextWingKey + 1` (the heights).
* **Arithmetic.** The massing and the composer use `+ − × ÷` and `sqrt` only (§6.5), and `dmath`'s `cos` and `sin` for a
  regular polygon's vertices (the rings of `regularCourt`, of towers and of a half-round porch); every result snaps by the placement rule;
  lengths drawn in metres are converted to integer centimetres before any construction; `valleyReach`'s `'int'` mode
  feeds `facadeBays` (V02 §3.7). The roofscape is view data, float64 under the renderer's CPU reference (§6.5 (9)).
* **Order.** Candidates are enumerated in a fixed geometric order (the union's ring order from its lowest vertex, then
  ranges in path order) before any weighted draw; weighted draws use the one weighted-pick helper of §14's `Rng`.
* **Stability.** The same building state gives the same massing and composition on every host (T-V2-13); a New random of
  a finer rung never changes a coarser one (§6.1); the elaboration cache can be dropped at any time (§2.9).

### 3.13 Failure ladders

**F-MASSING** (§5.2's row, item 328) is V02 §3.5's M14 ladder, with M10's reverse-lattice steps counting on the same
attempt counter; a template tower or an attached wing that fails its tests is dropped and reported,
the building kept. For `stepped` the same ladder runs inside `massStepped` (V02 §3.15.1): a `TierFailure` from `layTiers` is
an attempt, then the single fallback, then the base rectangle. **F-COMPOSE** (§5.2's row; per building, at the rung's derivation, reported to the view report and counted by T-V2-18;
never an error): (1) a dormer failing V02 §3.7's test is dropped; (2) a porch whose space fails takes the next feasible
kind, then `none` (a secondary porch: `none`); a porch meeting one of the building's own other wings takes this ladder,
narrowed first to the free part of its side; (3) a composer's room that the seed contract would refuse
(outside its piece, or a vertex within `attractCm` of a side it does not share) is shortened once by `2 × attractCm` away
from the offender, then omitted — V03's A2 (11) places that role itself; (4) any other
failure of the stage-3 contract — a bug by construction — returns the **identity composition** (composed wings and
towers one to one, no dormer, no porch, no room), which satisfies the contract by V02 §3.6 step 1, and files the building
in the report.

### 3.14 The owner's rules of 2026-09-28 at the building (file g, items 102–109)

File g's base mechanisms are the base's (the prosperity driver, the siting profile, the supply web, the wall closure,
the ladder table); this section designs only their building part, citing the item for the rest.

**3.14.1 Sunlight (item 102 (b), (d), (e)).** (a) **The casters.** A building's shade casters are its **base wings'
prisms**: each wing's ring from `baseCm` to its eave, and over its ring the roof's rise (a gable or hip as its ridge prism,
a tower's cone or spire only over its own ring). These are item 102's **epoch casters**: at an epoch (§4.11) the previous
epoch's buildings enter the daylight-share raster through them. **No stage-3 wing is a generation-time caster** — item
102 (b): buildings never feed the term they are sited by (a loop). The composition (dormers, porches, the cupola) never
casts in the model. V06 §3.4 rasterises the casters per wing, not one height per footprint (V02 X8). (b) **The rich
seek the sun** at the building scale: M5's sunlit choice (J-V2.38). (c) **Over time:** a wing added or raised at an epoch
changes the next epoch's casters only; V06 owns the drift.

**3.14.2 Custom institutions (item 104; V11 §3.13).** A custom institution composes as the class DR24 resolves (its
archetype, category, tags, library fields or the fallback — V08, V11 §3.13.2) through the ordinary chain; the dossier
facts that reach the massing are traced in V02 §1b's dossier table. (a) **Scale:** its `landmarkLevel` and `economicWeight`
act through the use's significance (V02 §3.2 step 3). (b) **The ruined landmark** (`ruined-landmark` → `generic-other`) is
massed by its class's row like any building, then takes the `ruined` existence at its site (roof `none`; §2.8's decline
states; V02 §5.1's drawing). (c) **Subsumption** (item 104 (h) (5); item 108 `source: 'subsumption'`): the subsuming kind's
template takes each subsumed kind's structures as extra slots (their names resolved by `roleKeys`, their shares added to
the compound's budget), so the compound is larger where they would have stood; nothing is merged into one wing.
(d) Custom supply chains (item 104 (h)) place members, never shapes: each member is a building of its class.

**3.14.3 Split works-and-shop sites (item 105 (h); J-V2.54).** A split class is one institution on two plots: the
building whose use carries `branchOf` composes by the class's `split.shop` template family, the works building by its
`split.works` family (V11 §2.3); each is an ordinary building of its plot — composed, mutated and undone by W1–W9. A
**merge-back** (the clerk's or the author's declaration, or V06's re-evaluation) is **two designation mutations inside
one event**: the works plot's toward the class's own (unsplit) template family — its shop structure added by W6 as a
frontage slot — and the shop plot's toward vacancy (the base's subtract steps); both are recorded in the one event's
`EditBase.mutations` and reversed together, so an undo restores both buildings byte for byte (T-V2-39).

**3.14.4 Ladders (item 108; J-V2.55).** COUNT, QUARTER and GUILD members are **ordinary buildings of the lesser class**
(`LadderStepRow.memberClass`), each composed by its own chain; a GUILD's hall composes as the `hall` family; a **SIZE**
building composes as the greater class's family with `sizeFactor` in M10's budget (and σ's rank in V02 §3.2 step 3), so
"city granaries" are one compound of several stores. An **upgrade** keeps the existing building as member #1: where the
greater class keeps the `row` arrangement, W1–W9; where it moves a `row` building to a `compound`, V02 §3.9's W3b (the quad
kept as the frontage slot). A **demotion** keeps the member nearest its demand and reverses the added slots; the as-built
bytes return (T-V2-40).

**3.14.5 Digging down, crypts and catacombs (item 109 (j), (k); J111).** (a) **The dig floor.** V02 is
the producer of the dig floor V04's access draw reads: `baseCm − Basement.floors × cellar.depthCm` for a building with a basement (the raised crypt's floor for a `raised` one), else `baseCm` — `baseCm` includes a
`half` basement's raise, so a half cellar's floor is the datum less half the depth (item 226); a building on a deck plot has no dig floor and never draws, and a wing with `on`
never draws (its ground is its tier's) (V02 §3.16); a quay built on the bank (`DeckContext.surfaceCm` null)
is ground and has one. (b) **Who digs.** A building draws its access once
when it is built (the draw V04's; its chance V11 §3.23.7's `DigRule` rows); a wing the mutator **adds** over a sealed void draws once for that wing (V02 §3.9
W6); a **`setMassing` op draws nothing** — a user who wants a way down declares it (`addUndergroundAccess`, item 66); a
replacement building (a new lineage) draws as new (J-V2.39). (c) **Crypts.** The crypt is a model fact on the basement
(`Basement.crypt`, item 238, derived by §2.6's basement function from V11's `crypt` column); **V02 supplies the wings that seed its ring** —
`cryptSeedWings(b)`, stated here once (J-V2.92): for a building whose wings carry template
part names (`BaseWing.partName`, item 234), the wings named `chancel`, else those named `apse`, else those named
`crossing`; else, for a `stepped` building, its tier 0 (the `tier` wing with no `on`); else the one storeyed ground wing (no
`on`, not `solid`) of role `main`, `range` or `cross` whose ridge has the end with the largest world `x` (the end farthest
toward world east), ties by the lowest key; else none — an empty list, where V03 places the crypt under the third of
the region farthest from the main entrance (V03 §3.7.4 step 1). It returns wing keys, is exported by `@plat/plots` beside
`massStepped`, is called by §2.6's basement function (item 238's crypt ring; item 226's lift and half raise act on the wings over the basement's ring) and is read
by V03's crypt placement and T-V2-36, T-V2-53 — and V02 owns the **wet-ground lift** and the **half raise**. After every re-derivation of the basement (a `setMassing`
commit, V02 §4.2 step 3; a designation mutation, an epoch's included, V03 re-running its rank inside it; a terrain change) the crypt of an `always` class (the cathedral, the great
temple, a building a dossier crypt record binds to) is kept **with no condition**, and a `basement`-class church keeps its
drawn crypt while its class stays in the church family; a mutation out of that family drops it through the ordinary
re-derivation, its contents going to V03/V04's closure, never silently. (d) **The cathedral's crypt is never refused
(J-V2.46).** Its basement takes the first lawful form of a ladder with no refusal rung: a **full** crypt; a **half-sunk**
crypt where the full floor would lie below the water table or the plot is `low` — the wings over it raised by `cellar.depthCm ÷ 2` (item 226's half raise; a raised choir over a half-sunk crypt, its floor at the datum
less half its depth); a **raised-choir crypt** (`Basement.kind
'raised'`, item 226) where even a half floor would lie below the water table, or on a `damp` or `flood` plot: the crypt's
floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)`, and the ground storey of the ground wings over the basement's ring lifted so that it clears the basement by `crypt.clearCm` (V02 §3.10.9; the seed wings over a crypt-only basement; every ground wing over the ground wings' whole inset that V03 gives a crypt no stair reaches, V03 §3.7.4) — written by the
basement step as those wings' `Heights.baseCm`, with steps at the crypt ring's edge (V03 plans the choir stairs over the
lift). **Inside a solid platform**: where the seed wing is a `solid` tier 0 whose
height is at least `crypt.clearCm + 100 cm`, the raised form places the crypt **inside** tier 0 — its floor at `max(lowest
terrain sample under its ring, water table + crypt.freeboardCm)`, its vault at least 100 cm under tier 0's top — with no
lift, so stair 0 and the stack keep their heights (as temple platforms held their chambers), any other ground wing over the basement's ring (a storeyed annex over a whole inset) lifted as above; the lift applies only to a
lower or storeyed tier 0, and then through `rebaseStack`, every wing standing on it following. On a sky island the rim-slab vault is V05's form of the same ladder. (e) **Size and rank are not
V02's.** V02 supplies the seed wings; the ring's growth to V11's `cryptM2` and the rank that makes the cathedral's the
largest are §2.6's basement function with V11's rows (item 238). (f) **Catacombs are never V02's.** No V02 path sources,
moves, re-sources or shrinks a catacomb (item 109 (k) (2), (4)): catacombs lie under cemeteries or a CITY/METROPOLIS
quarry ossuary (V04). V02's footprint and basement floor are an **obstacle input** to (k) (5)'s stagnation ("a
foundation in the way"); a V02 demolition or replacement lifts that block; a crypt joins a catacomb only by V04's
(3b) link, which V02 never makes.

**3.14.6 Which siting-profile columns shape a building (item 103).** None, save two: `emits.smoke` ≥ 2 adds one
decorative stack per level above 1 to the row's `hearths` (a forge, kiln, brewhouse or dyer's chimney; §8.10, drawn until a
plan exists), and `needs.runningWater` selects the `water` axis for the main slot (M2). Every other column is S10b's and
the solver's (V11 §2.3); materials stay texture and colour (V02 §1d).

### 3.15 Stepped massing — the `stepped` family (item 110 (c))

Item 110 (c): "each tier a wing standing on the one below, inset by a table step, with its own height, stairs up its
faces and a flat roof or a shrine on the top tier … each tier casts its own shadow." A stepped building is reached **only
by name**: a class whose designation template's `composition` key is one of V02 §3.15.4's rows (V11's
specialisations, X17), a `setMassing { family: 'stepped' }` (or a `tiers` op bent to it, V02 §4.6) or a mutation toward
such a row; no default, family, override or role row lists `stepped` (the no-op pin, T-V2-50). **One exported function
decides the bytes (J-V2.80):** the massing's M5 calls `massStepped` for the family, and the base outline builder calls the
same `massStepped` from M3a (item 229) with the same row, band and streams, so a stepped building made before M6 keeps
its bytes when stage 3 registers (T-V2-46). `massStepped` owns the frame, the band, the draws, the attempts and the
fallbacks; `layTiers` owns only the geometry, pure, and is what the `tiers` op, the mutator's anchored lay and V04's
ruins call (V02 §3.15.5, V02 §3.15.6). V04, V06, V09 and V10 use this tier contract as stated here — `drawTiers`, `layTiers`,
`TierFailure`, `massStepped`, `TierCells.heights`, the `none` stair form, `MassingRef.stack.grade`, `rebaseStack`, the
stack order in `heightsAt` and `vaultClamp` (J-VI.5).

**3.15.1 The construction, step by step.** Types: V02 §2.6. Lengths in centimetres on the lattice; V02 §3.12's arithmetic
(`+ − × ÷ sqrt`, `dmath` for a polygon's vertices); every point snapped by the placement rule.

`massStepped(input, row, band, k)` runs, in order:
1. the frontage frame — V02 §3.4 steps 1–2 (`f`, `n`, `Rr`, `W`, `D`);
2. `slotBand(input, row, band)` → `lo`, `hi`, `cap` (V02 §3.5 M10: a stepped row carries `claimShare`, so the band is
   `claimShare × area(H) × sizeFactor`);
3. **ST0**; infeasible → step 6 at once, reported `steppedInfeasible`;
4. for attempt `a` = 0, 1, 2 (the `massing` concern's cap 3): `drawTiers(cells, storeys, s8, s9)` — `s8`, `s9` the `massing`
   stream's creation indices 8 and 9 for `a` = 0, and `massing/attempt=a`'s indices 8 and 9 otherwise; `layTiers` at
   `scale` 1; **ST8**; a `TierLay` that ST8 accepts is converted to wings and the `MassingRef` (ST7's order and keys) and
   returned; a `TierFailure` is reported with its step and detail and the next attempt runs;
5. (the attempts exhausted) step 6;
6. **the single fallback** (ST8's construction below), then, if its checks fail, the base outline builder's rectangle in `H`
   (which the base guarantees) — the same rungs as M14's rungs 2 and 3.

`storeys` is the class's `HeightsRow.storeyCm` (`ground`, `upper`); `pitch`, `parapetCm` and `plinthCm` are M11's pitch rule,
the family's parapet (V02 §3.10.6) and §2.6's plinth.

* **ST0 — feasibility (M3 for `stepped`).** At the **least draws** — `n₀ = count[0]`,
  `d₀ = insetM[0]`, `sw₀ = stairWidthM[0]`, `ĝ = stairGrade[1]` (the steepest grade: the least run), and the least heights
  `h_k` (a solid tier `solidHeightM[0] × taper^k`, a storeyed tier `storeys.groundCm`) — with `r₀` the least stair reserve
  (axial `(h₀ + plinthCm) ÷ ĝ`, flights `sw₀ + stairClearM`, internal 0) and the least **front insets** `f_k`, k = 1 … n₀ − 1
  (axial `max(d₀, h_k ÷ ĝ + landingM)`, flights `max(d₀, sw₀ + stairClearM)`, internal `d₀`), and the least top width
  `t₀ = tierMinSideM` (flights: `max(tierMinSideM, h_{n₀−1} ÷ ĝ + landingM)`, the top face holding its flight):
  * **rect:** `Wmin = t₀ + 2(n₀ − 1)d₀`, `Dmin = r₀ + Σ f_k + (n₀ − 1)d₀ + tierMinSideM`; feasible when `W ≥ Wmin` and
    `D ≥ Dmin`; `Amin = Wmin × (Dmin − r₀) + sw₀ × r₀`;
  * **round or octagonal** (concentric rings, ST3): the least inradius `ρ = tierMinSideM/2 + Σ max(d₀, f_k)`; feasible when
    `min(W, D − r₀)/2 × cos(π/m) ≥ ρ`, `m` the ring's side count (8, or the round bracket at that radius);
    `Amin = m ρ² tan(π/m) + sw₀ × r₀`;
  * infeasible also when `Amin > 1.1 × hi` (M3's budget rule).
  **Anchored mode** (the mutator, V02 §3.9 W1): feasible when the anchor's shorter side is at least
  `tierMinSideM + 2d₀` (a second tier fits) and the least reserve `r₀` of width `sw₀` fits inside `H` in front of the
  anchor's front side (no reserve for `internal`). The receipt of V02 §3.10.3 gives every row's `Wmin × Dmin`.
* **ST1 — draws (`drawTiers`).** On `s8`, in this order: `n` uniform on the integers of `count`; the shape by `shape`'s
  weights; `d = U(insetM)`; the top by `top`'s weights; `sw = U(stairWidthM)`; `g = U(stairGrade)`; where the top is
  `shrine`, its floors (uniform integer in `shrine.floors`), `U(shrine.insetShare)` and its roof kind by `shrine.roofs`.
  On `s9`, per tier k = 0 … n − 1 in order: a **solid** tier (every tier under `solid: 'all'`, tier 0 only under
  `'lower'`) `heightCm_k = U(solidHeightM) × taper^k` rounded to the centimetre, `floors_k = 0`; a **storeyed** tier
  `floors_k = max(1, ⌊U(tierFloors) × taper^k + u⌋)` (`u` a second uniform: stochastic rounding) and `heightCm_k =
  storeys.groundCm + (floors_k − 1) × storeys.upperCm` — each stacked tier's first storey a principal one (J-V2.85), and
  **never a parapet here** (ST4 adds it). No aspect is drawn (ST2 derives it; J-V2.86). All are drawn once; ST8's
  re-lays and the anchored mode re-use them, so a shrink never shifts a draw. V04 draws the same list on its ruin
  stream.
* **ST2 — tier 0 and the stair reserve.** The reserve `r` at the front (the `−v` side) of `Rr`: axial `(heightCm₀ +
  plinthCm) ÷ g` (stair 0's run), flights `sw + stairClearM`, internal and none 0. **The stack's own proportion (J-V2.86):**
  `W_need = t + 2(n − 1)d` and `D_need = Σ d_k + (n − 1)d + tierMinSideM` — ST0's closed form at the drawn `n`, `d`, heights,
  `g` and `sw`, with ST3's `d_k` and `t` as in ST0 — and the laid aspect `= clamp(W_need ÷ D_need, aspect)` (the row's cell is
  the clamp), so tier 0 takes the proportion its terraces and stairs need. Tier 0 lies in `[0, W] × [r, D]` of the frame:
  **rect** `W₀ = min(W, aspect × (D − r)) × scale`, `D₀ = min(D − r, W₀ ÷ aspect)`, centred on `u = W/2`, its front on `v =
  r`; **round** a regular ring with `TowerShapeRow`'s round side count by radius and circumradius `R₀ = min(W, D − r)/2 ×
  scale`, centred in the region, one side parallel to `u` and nearest the front; **octagon** an 8-gon of that
  circumradius, the same phase. Every tier of a round or octagonal stack keeps tier 0's side count (its rings are
  concentric offsets, vertex for vertex). **The D-front:** under `axial`, a round or
  octagonal ring's front chords lying within `(sw + 2 × stairClearM)/2` of the stack's centre line are replaced by one
  straight edge — the chord between the ring's two crossings of the lines `u = c ± (sw + 2 × stairClearM)/2` on its front
  half — so every stair stands full width against a straight face. *Anchored mode* (V02 §3.15.5, the `tiers` op): tier 0 is
  `anchor` as given — a kept range's four corners (`BaseWing.corners`; the extra vertices other wings put on its sides leave
  with the wings the mutation subtracts) or the `tiers` op's re-laid ring — and the reserve is sought in front
  of it inside the region; where it does not fit there, the stair form falls back (ST3), never the ring. Under `flights`,
  tier 0's front face must be at least `(heightCm₀ + plinthCm) ÷ g + landingM` long, else the stair fallback applies.
* **ST3 — the tiers above.** For k = 1 … n − 1, the front inset `d_k`: axial `max(d, heightCm_k ÷ g + landingM)` (the
  D-front makes the former sagitta term unnecessary), flights `max(d, sw + stairClearM)`, internal and none `d`. **Rect:**
  tier k's ring is tier k − 1's four corners moved inward by `d` on the back and the two sides and by `d_k` on the front.
  **Round or octagonal:** concentric, the inradius reduced by `max(d, d_k)` all round (so the rings stay regular), the same
  side count, then the D-front under `axial`. `on` = tier k − 1. The stack **ends** at tier k − 1 where tier k's shorter
  side (for a polygon, twice its inradius) would fall below `tierMinSideM` or, for flights, its front face below
  `heightCm_k ÷ g + landingM`; `truncated` counts the tiers not laid (reported `tiersTruncated`). **The stair fallback:**
  with fewer than two tiers laid, the lay re-runs from ST2 with the next form of `input.forms` — absent, the row's form,
  then `axial → flights → internal`, `internal` only where tier 0 is storeyed and a round or octagonal stack skipping
  `flights`; `none` only where `input.forms` names it (an edit's bend) and tier 0 is solid — and past the last form
  `layTiers` returns `TierFailure { kind: 'noSecondTier', step: 'ST3' }`. The form laid is `TierLay.stairs` (J-V2.74).
* **ST4 — roofs and heights.** Every tier but the top: `lowerRoof` **flat** — roof `flat` with the family's `parapetCm` (a
  walkable terrace), `ridgeCm = eaveCm` — or **pent** — roof `hip` (rect), `pyramid` (octagon) or `cone` (round) at pitch
  `p_k = min(pitch, pentShare × storeys.groundCm ÷ d)`, `ridgeCm = eaveCm + p_k × d`: the band between the tier's ring and
  the ring above, drawn by V02 §5.2 step 3's band facets (J-V2.75). **Pent needs equal insets** — the `internal` or `none`
  form, where every `d_k = d` (the load check of V02 §3.15.4 and the `tiers` op's bend). The **top tier** —
  whichever tier the lay ended on, so a truncated stack's former pent tier takes the top's roof: `flat` and `shrine` — roof
  `flat` with `parapetCm`; `roofed` — `hip` (rect) at the one pitch rule's pitch, `pyramid` (octagon) or `cone` (round) at
  `TowerShapeRow`'s pitch, ridge by M11's formulas. Each tier: `eaveCm = heightCm_k`, **plus `parapetCm` on every
  flat-roofed tier, solid or storeyed** (so `deckLevel` subtracts it exactly where it was added), `Heights.floors =
  floors_k`, `solid` where `floors_k = 0`. **The shrine** (top `shrine`): the top tier's ring moved inward by `insetShare ×`
  its shorter side on every side (a rect in a rect stack, a regular ring of the stack's shape otherwise), laid only where its
  area is at least 4 m² and each side at least 2 m — else the top becomes `flat` (reported `shrineDropped`); `on` = the top
  tier; floors and roof as drawn; its storeys `storeys.groundCm`, then `storeys.upperCm`; role `shrine`.
* **ST5 — the stairs.** **Axial:** width `min(sw, the length of tier k's straight front edge)` (the D-front gives a round
  or octagonal stack a full-width edge); for k = 0 … n − 1, stair k is the rect of that width centred on the stack's
  centre line along `v`, reaching from tier k's front face toward the front by `run_k = rise_k ÷ g`, `rise_k = heightCm_k`
  for k ≥ 1 and `heightCm₀ + plinthCm` for k = 0 (re-read by `rebaseStack`, V02 §3.15.2); stair 0 on the ground in the
  reserve (no `on`), stair k ≥ 1 on tier k − 1's front terrace (`on` = tier k − 1), the rest of the front inset a landing
  before its foot. **Flights:** stair k is the rect of length `run_k` along `u` and width `sw` along `v`,
  against tier k's front face, on the ground in the reserve (k = 0) or on tier k − 1's front terrace (k ≥ 1, `on` = tier
  k − 1). Stair 0's foot is at the face's left end (seen from the front), climbing `+u`; for k ≥ 1 the foot is **the point
  of tier k's front face nearest stair k − 1's head**, moved along the face toward its farther end only as far as the
  flight needs to fit, and the flight climbs toward the end of the face with more room — so the walk along the terrace
  from one head to the next foot is the shortest the face allows. Every stair: role `stair`, `solid`, roof `shed` with
  `high` its ring side at the upper end (on tier k's face for axial; the end side at the top of the climb for flights),
  `eaveCm` 0, `ridgeCm = rise_k`. **Internal:** no stair wing; V03's cores climb inside the storeyed tiers (X18).
  **None** (a sealed stack, V02 §4.6): no stair wing and no way up; a storeyed shrine or tier on it is reached by nothing
  and V03 flags it `W_TIER_UNREACHED`.
* **ST6 — snap and validate (M13 for `stepped`).** Every ring snapped. **Every vertex of a stair that lies on a side of a
  tier's ring is inserted into that ring (§2.6 rule 1)** — stair 0's head vertices into tier 0's front side, stair k's head
  vertices into tier k's front side, a flight's back vertices into the face it stands against —
  so a stair and the tier it climbs share their contact exactly and a carry keeps it. The ground wings — tier 0 and stair 0
  — tile; every wing with `on` lies inside the ring of the wing it stands on (exact `orient2d`), its boundary at least
  `minEdge` from that ring's except a stair whose foot lies on the terrace's edge; **the wings standing on one wing are
  pairwise interior-disjoint** (exact; stair k abuts tier k on their shared vertices); each stair's `rise ÷ run ≤ g ×
  1.01`; `stairChain` connects the ground to the top tier's terrace for `axial` and `flights`; a regular ring stays regular
  except its D-front edge; every wing at least 4 m² and every side at least `minEdge`. A failed check returns `TierFailure {
  kind: 'check', step: 'ST6', detail }`.
* **ST7 — order, keys and the entrance hint.** Keys `0 … m − 1` in the order **tier 0, stair 0, tier 1, stair 1, …, tier
  n − 1, stair n − 1, then the shrine** (no stairs under `internal` or `none`) — no tower, so V02 §2.1's
  canonical order holds by construction; `nextWingKey = m`; `massStepped` writes `MassingRef.family 'stepped'`, `segments
  1`, `row`, `grammar`, `entrance` and `stack` (`shape`, `stairs`, `lowerRoof`, `top`, `insetCm`, `grade`, `truncated`).
  **The hint:** a solid tier 0 under `axial` or `flights` — stair 0's outer side (axial: the side at its foot; flights: its
  side facing `−v`), so the main entrance is the stair's foot and the plan roots at the first landing door (item 230); a
  storeyed tier 0 — tier 0's front side, the door on its free part (item 228); under `none` — tier 0's front side, an
  entrance that opens nothing (item 230).
* **ST8 — the size budget (M10 for `stepped`, inside `massStepped`).** `A` = the area of tier 0 ∪ stair 0 (the footprint),
  `A_t` tier 0's and `A_s` stair 0's. Over `1.1 × min(hi, cap)`: where `A_s ≥ min(hi, cap)`, the single fallback at once;
  otherwise `scale ← scale × √((min(hi, cap) − A_s) ÷ A_t)` and `layTiers` re-runs once with the same draws (tiers may
  truncate; only tier 0's size moves the footprint, so no tier is dropped for the budget); still over, or a `TierFailure`:
  the next attempt (step 4), and at the end the single fallback. Under `0.9 × lo`: `scale` grows once by the least of
  `√(lo ÷ A)` and the largest factor that keeps tier 0 and the reserve in `Rr`. **The single fallback** (no draw, so the
  M3a and M6 builders agree): `w = max(0.8 × wingWidthM[0], 3 m)`, `L = clamp(min(hi, cap) ÷ w, 1.2w, W)`, the slab
  `[u₀ + (W − L)/2, u₀ + (W + L)/2] × [v₀, v₀ + w]` (M5's `single` along the frontage), role `main`, roof `flat` with the
  family's parapet, floors the template's least; `MassingRef.family 'single'`, reported `steppedFallback`; failing M13's
  checks, the base outline builder's rectangle. A stepped row is never read on a deck (V02 §3.16's rows admit no `stepped`,
  and a `family: 'stepped'` there bends to `single`, V02 §4.6).

**3.15.2 The datum, the stairs' true rise and the envelope — `rebaseStack` (J-V2.81).** Every
path that re-bases a wing of a building with a wing standing on another calls `rebaseStack` (V02 §2.6; item 370) for the
whole building, never the per-wing step: S11's datum step, a `setMassing` commit, a tier's height edit,
§7.3 (a) 4's terrain operator (whenever any ground wing is on a changed sample, so an upper tier over no changed sample
follows its tier), §7.4's warp and `moveVertex`, the carry's rule (2), the crypt lift (V02 §3.14.5 (d)) and a deck's
re-base. Its four steps: (1) the ground wings by the terrain rule (item 370's `levelledGroundCm` samples with item 231's
wall-side move, so a levelling or re-levelling of the plot, block or ward re-bases through S11's datum step) — a ground wing's user-edited `baseCm` (J-DET-24's kept
fate) is kept and carries the stack; (2) each wing with `on`, in stack order (each after the wing it stands on, whatever
the keys, since a `tiers` edit may put an older shrine on a newer tier), `baseCm = deckLevel` of its support; (3) each
stair's `ridgeCm` re-set to its true rise — stair 0 `deckLevel(tier 0) − stair0.baseCm`, stair k `deckLevel(tier k) −
deckLevel(tier k − 1)` — and where that exceeds `g × run × 1.1` (a slope under stair 0) it is kept and reported
(`stairSteep`); the run is never re-laid by the datum pass, so a terrain sample's rounding never moves a ring (J-V2.2's rule
that the massing owns every ring); (4) **the envelope:** `Building.heights.baseCm` is the least `baseCm` of its ground
wings, `eaveCm` and `ridgeCm` the maxima over its non-tower wings of `w.baseCm + w.eaveCm − baseCm` and `w.baseCm + w.ridgeCm
− baseCm` — the top of the stack, which §8.4's caster ceiling and V05's clearance read (X20) — and **`floors = 1 +
max storeyRange(w)[1]`** over its storeyed wings, 0 with none; every other building keeps M11's rule byte for
byte (J-V2.78).

**3.15.3 Storeys, rooms, the composer, chimneys and the shadows.** A tier reaches the storeys `storeyRange` gives (V02
§2.6): a solid tier none, a storeyed tier from the storey above the one it stands on — level 0 is the lowest storeyed level,
so the shrine of a solid pyramid is storey 0 (item 371 has the capacity, `Storey.level` and `Storey.wings` read it), and
each tier's first storey is a principal floor of `storeyCm.ground` (J-V2.85; V03's `floorCm` reads the tier's ground
and upper heights, X18). The composer (V02 §3.6) composes every tier, stair and shrine one to one like any wing;
`WingRoleRow`'s `tier`, `shrine` and `stair` admit no dormer (and a terrace or a pent skirt is neither `gable` nor `hip` on
a dormer role), so no dormer row; the porch only at a storeyed tier 0's main door, clamped to the free part of its side and
clear of stair 0 (V02 §3.7; `tier` admits one, `stair` none, so a solid stack's door, the stair's foot, takes none);
the `rooms` rung emits no hall, gate hall, chapel or tower room (a stepped massing has no `main`, `gate` or tower wing).
Decorative chimneys stand only on exposed roof (V02 §3.7), and the plan's chimneys are drawn at `Chimney.levels`'
top (V02 §5.2). V03 plans each storeyed tier and the shrine by the class's programme and opens a landing door on
`landingSide` (X18). **One shadow per tier:** every tier, stair and shrine is its own caster, its prism from its own
`baseCm` to its eave with its roof's rise over its ring (V02 §5.2's caster rule, which §8.4 reads per wing), so each tier
casts one shadow and the tiers' shadows nest (item 110 (f); T-V2-44). **Crypts and basements.** A stepped building's
basement lies under its ground wings — tier 0 — whatever storeys they reach (item 371); an `always`-crypt class built in
tiers (a great temple) seeds its crypt with tier 0 (V02 §3.14.5 (c)'s seed wings). On wet ground a **solid** tier 0 at
least `crypt.clearCm + 100 cm` high holds its raised crypt **inside the platform**, with no lift (V02 §3.14.5 (d); a storeyed annex over the ground wings' whole inset lifted, V03 §3.7.4);
a lower or storeyed tier 0 takes the lift through `rebaseStack`, every wing standing on it following. Where no wing
standing on no other wing is storeyed (V03's `ground(b)` absent, V03 §3.3: a solid tier 0 with no storeyed annex) the
basement's access is `external` (item 371, with §13.2's T29-4 and J-A29.25), its door at V03's
`basementDoor(b)` (V03 §3.7.1: the tomb door, or the wall's side where the stack stands against a retaining wall; the crypt
inside a platform entered by the same door at its own floor); a storeyed ground wing beside a solid tier 0 (an annex, the arena's façade ring) joins
the basement by its core or the trapdoor fallback, never outside (J-V3.88).

**3.15.4 The rows.** Four rows of `composition.json` — our own (provenance `own`, 2026-09-28; calibratable, §13.9), at V11's four anchors in V02 §3.10.1's notation (one value where
all four agree). Tier 0's size comes from `slotBand`: the temple and palace rows carry `claimShare` (their precinct sizes
them, J-V2.87), the tiered tower reads its class's `tower` family budget. They are reached only by name: V11's
specialisations write `DesignationTemplateRow.composition` (X17), V04 names `stepped-monument` (X19), and the
`family` op, a `tiers` bend or a mutation names `stepped`. V02 §3.10.3's receipt table measures each against its band.

| row (arrangement; main) | `count` | `shape` | `insetM` | `solid` · heights | `taper` · `lowerRoof` | `top` | `stairs` · `stairWidthM` · `stairGrade` | other cells |
|---|---|---|---|---|---|---|---|---|
| `stepped-temple` (institution; the temple) | 3–4 / 4–5 / 4–6 / 5–7 | rect 1 | 1.5–2.5 / 1.5–2.5 / 2–3 / 2–3.5 | all · solid 3–4 / 3.5–4.5 / 4–5 / 4.5–6 m | .9 · flat | flat .2, shrine .8 / shrine 1 / shrine 1 / shrine 1 | axial · 2.5–4 / 3–5 / 4–6 / 5–8 · 1.0–1.2 | aspect .65–.85 (the clamp of the derived aspect); `claimShare` .35–.6; shrine floors 1, insetShare .15–.25, roofs hip .4, pyramid .4, gable .2; families stepped 1; `wingWidthM` 5–7 (ST8's single fallback); porch 1/0/0/0/0; hearths 0 |
| `terraced-palace` (institution; the palace) | 2–3 / 2–3 / 3–4 / 3–5 | rect 1 | 3–5 / 3–6 / 4–7 / 5–8 | none · floors 1–2 / 1–2 / 2–2 / 2–3 | 1 · flat | flat .6, roofed .4 | flights · 2–3 / 2–3 / 2.5–4 / 3–5 · .6 | aspect 1.15–1.8; `claimShare` .35–.6; families stepped 1; `wingWidthM` 8–10; porch as `hall`'s (V02 §3.10.2); hearths 3 / 4 / 5–7 / 6–10 |
| `tiered-tower` (detached; the tower) | 3 / 3–4 / 3–5 / 4–6 | rect .4, octagon .4, round .2 | .3–.5 / .3–.6 / .4–.7 / .4–.8 | none · floors 1 | .92 · pent | roofed 1 | internal · — · — | aspect 1–1; families stepped 1; `wingWidthM` 4–5; porch .5/.5/0/0/0; hearths 1 / 1 / 2 / 2 (the `tower` family's budget: every median stack fits, V02 §3.10.3) |
| `stepped-monument` (V04's ruins, X19) | 3–5 / 4–6 / 5–7 / 6–8 | rect .85, round .15 | 1.5–3 | all · solid 3–5 m | .9 · flat | flat .5, shrine .5 | axial · 3–6 · .9 | aspect .6–.85; `heights` 350 / 300 cm (a ruin's shrine storeys); as `stepped-temple` otherwise |

**Load checks** (V02 §3.10.7's compiler, extended): a row whose families include `stepped` carries `tiers`, and a row with
`tiers` lists `stepped` at weight 1; `stairs: 'internal'` never with `solid` `all` or `lower`; `stairs: 'flights'` never
with a `round` or `octagon` weight above 0; **`lowerRoof: 'pent'` only with `stairs: 'internal'`** (equal insets); `count[0] ≥ 2`; `stairGrade[1] ≤ stairGradeMax`; the sealed form `none` never a row value; a stepped row never read
under the `row`, `cluster` or `tents` arrangement; and **no row of V02 §3.10.2 – V02 §3.10.6 lists `stepped`** — the table half
of the no-op pin (T-V2-50).

**3.15.5 Mutation.** The rows added to V02 §3.9's table and to `MassingGrowthRow`'s defaults: **`single → stepped`** (the
only source) keeps the main range as tier 0 — W1's anchored test first (V02 §3.15.1 ST0), then `drawTiers` on
`siteplan.mutate` (V02 §3.12) and `layTiers` in anchored mode on the range's four corners; a `TierFailure` leaves the
target `single` (the kept range unchanged), reported `steppedDegraded` (W3's "degrading to the largest feasible
sub-family"); **`stepped → single`** keeps tier 0 as the `main` range and subtracts the rest, W5 giving its roof and floors (a
solid tier 0 becomes storeyed: `solid` cleared, `floors` the target's least, recorded as a `storey` step); **`stepped →
stepped`** keeps the tiers up to the target's count, subtracts the ones above it (the shrine first, then each removed
tier's stair with it) and adds tiers on top by W6 with `MassingRef.stack.insetCm` and `.grade` while ST3's side test
passes. Every other pair passes through `single`. The inverse steps restore the former stack exactly (W9).

**3.15.6 A ruin's stepped monument (V04 §3.5.0a).** V04's ruin stage calls `drawTiers` on its own ruin stream and
`layTiers` alone — never `massStepped`: no band, no ST8, no attempts — with the `stepped-monument` row at the band its
ancient-culture row names, in its plan cell's frame, `storeys` = `TierCells.heights`, `plinthCm` 0, `parapetCm` 0 and
`scale` 1 (the `TierInput` contract, V02 §2.6). A `TierFailure` is V04's to handle (its plan cell re-laid
smaller, or the monument a mound by its persistence order). It then decays the result by its persistence order (a stepped
mass decaying toward a mound is V04's and V11's; X19). The monument is V04's record, not a `Building`; V02
supplies the one tier construction, so a ruin's tiers and a living temple's nest by the same rule.

### 3.16 Buildings on moles, jetties, quay platforms and bridge decks (item 110 (d))

1. **Which buildings.** Every building S11 raises on a deck plot the base offers (item 110 (d): frontage plots along the
   deck's way on a mole, a pier or jetty, a quay platform or a bridge deck, and the placed landmarks at a mole's head or
   mid-mole). S11 passes `BuildingInput.deck` (item 305). A raised way's deck carries none (J-V2.71). **No deck plot on a
   ford, a drawbridge, a gate's moat deck or an unbuilt deck**: a `Bridge` of kind `ford` or `draw`, or one whose
   `deckCm` is not yet set (§2.7: optional until S7 builds the bridge), offers none (item 246), and no moat deck at a gate
   offers any (a gate's approach stays clear, §4.7 *Deck plots*). **A quay built on the bank is ground**: its `DeckContext.surfaceCm` is null, its buildings take
   `deriveBase`'s terrain datum (plinth and skirt included), the ordinary basement gate (whose `damp` and `flood` rows refuse
   most cellars there anyway) and a dig floor; it keeps `kind 'quay'` for the `@deck` rows and the deck budget. Points (5)
   and (6) below therefore apply to moles, piers, jetties, bridge decks and quays built out over water.
2. **The row.** A non-landmark deck building reads `<key>@deck/<band>`, else `default.<arrangement>@deck/<band>` (V02 §3.2
   step 2). A landmark reads its class's chain unchanged — a mole-head or mid-mole tower the `tower` family (`towerHouse`),
   a fort its class's template — with its template's budget and floors (J-V2.69). S11 copies `DeckContext.landmark` from
   the deck-plot record's `landmark` flag (§2.7 *Deck plots*, item 246: a mole's head and mid-mole slots, and on a
   bridge whose deck span reaches V11's `deck.landmarks/bridgeMid/minSpanM` one mid-span slot, offered to a tower or fort
   class only). **The lighthouse islet is land**: item 110 (e)
   reaches it by a causeway, so its tower is an ordinary `tower` building with the ground's datum and basement gate, never a
   deck building.
3. **The budget and the storeys.** For a non-landmark deck building M10's band is the deck budget's `footprintM2` at the
   plot's band and deck kind (V11's `deck` row, X16) × `footprintShare_i ÷ count_i × buildingScale` — **per slot**, so
   a compound's slots share the plot's budget — **replacing** the template's `[p10, p90]` (in `slotBand`), under the usual cap `coverageMax ×
   area(H)`; M11 clamps every wing's floors to at most `maxFloors` — the owner's "small, light" (J-V2.67) — and the mutator's W5
   clamps a kept wing's floors the same way (V02 §3.9). **No deck plot without a `deck` row:** V11's `deck`
   table is registered from C0 (V11 §2.1's empty-table rule) and a deck plot exists only where its `deck.offer` drew yes
   (§4.7 *Deck plots*), so M10 and M11 read a `deck` row on every deck plot and V02 keeps no stand-in.
4. **Fitting.** M2's frontage frame on the deck's way (the plot's access segment). `H` lies inside the deck plot and so
   inside the deck's width (item 110 (f)); a row arrangement's quads pass through (M0 (a)).
5. **The datum.** Every wing's `baseCm` is `DeckContext.surfaceCm`, with no plinth and no skirt (item 370) — on a quay
   built on the bank (`surfaceCm` null) the terrain datum instead, (1); a change of the
   deck's height (§4.8's re-base after a terrain stroke, an edit of the bridge) re-bases the deck's buildings in the same
   step — their plots are in the deck's effective scope (item 370).
6. **No basement, no crypt, no dig.** The basement decision gives none on a deck plot built over water (item 305);
   there is no dig floor (V02 §3.14.5 (a)). **No crypt-bound use ever stands on a deck** (J-V2.68): S10b never places on a deck plot a use whose class's `crypt`
   column is `always`, **or a use to which a dossier crypt record binds** (V04 §2.3a) — V11's `deckOk` is read **per
   use**, false for either (X16); a hand placement (T6) of such a use on a deck plot bends to the nearest land plot at the
   deck's landward end, named (T6's landward bend, V09); a designation mutation that would bring such a use onto a deck building relocates the use to the
   nearest land building by the base's relocation (§10.3). So the no-refusal crypt ladder never meets a deck, and a bridge
   chapel whose crypt the dossier records stands on the bank with its crypt.
7. **Lifecycle.** V02 adds nothing to the deck's fate: removing or ruining a deck ruins what stands on it by the base's
   least-disruption rule (item 110 (d)), each building taking its fate as a record, its massing untouched; rebuilding the
   deck re-offers the plots, and S11 raises new buildings on them (new lineages, massings drawn afresh). A generated deck plot
   the user removes stays removed through every regeneration and epoch — item 260's held removal, keyed by its deck host's
   id and its slot ordinal — until the removal's undo or the user's own re-add of that slot.
8. **The `@deck` rows** (own; four anchors; each an `alias` of the row named, only the cells named overriding):

| row | alias of | overriding cells |
|---|---|---|
| `default.row@deck` | `default.row` | back 0; blocks 0; towers 0; turret 0; dormers 0 / 0 / .3 / .5; porch 1/0/0/0/0 · .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0; hearths 1 |
| `default.detached@deck`, `default.compound@deck`, `default.institution@deck` | `default.detached` | families single 1 / single 1 / single .85, L .15 / single .75, L .25; wing width 3.5–4.5 / 4–5 / 4–5.5 / 4.5–6; range length 4–6 / 5–7 / 6–8 / 6–9; back 0; blocks 0; towers 0; turret 0; dormers 0; porch 1/0/0/0/0 · .9/.1/0/0/0 · .8/.2/0/0/0 · .7/.3/0/0/0; hearths 0 / 1 / 1 / 1 |
| `chapel@deck` (a bridge chapel) | `chapel` | families single 1; wing width 4.5–5.5; range length 6–9; porch .6/0/.4/0/0; cupola 0 / 0 / .1 / .2 (tip 1); hearths 0 |
| `watch-house@deck` (a toll house) | `watch-house` | wing width 3.5–4.5; range length 4–6; back 0; hearths 1 |

**Load checks:** every `@deck` row's families lie in {`single`, `L`, `row`} under the arrangement law, and its `blocks`,
`towers`, `turret` and `backRange` are 0 and its `cupola.chance` at most .2 (a deck carries small, light buildings).

### 3.17 The rest of item 110 at the building — retaining walls, raised ways, the second fixture

* **(a) Retaining walls.** The massing reads only `H` and the datum. S10 and S11 level the plot and raise its
  `RetainingWall`s (item 110 (a)); the site plan keeps `H` on one level of the plot and off the wall, so no wing crosses
  or stands on a wall, and a building backing onto one stands off it by the template's rear setback, **which may be 0** (a
  row built against the terrace wall — the ordinary terraced street). **The datum reads its own terrace** by §2.6's
  datum rule and its wall-side sample (items 370, 231; `levelledGroundCm`, item 309): a house is neither lifted toward
  the terrace above nor sunk toward the one below (T-V2-51). A walk-out basement where the plot's low edge is a wall is
  item 242 (V03 §3.7.1: §2.6's basement rule reading the step there; its door on that side). V02 adds no wall rule
  (J-V2.72).
* **(b) Raised ways** — viaducts, elevated roads and aqueducts, **generated at CITY and METROPOLIS** where a ravine or
  valley, a link between high wards or a water need calls for one, declared at TOWN, and added or removed by the user, a
  removal holding through regeneration (item 110 (b)). V02 composes nothing on a raised part (J-V2.71);
  its piers and the strip under its deck are obstacles the base's plots avoid (S10, S11, V01), so no `H` meets them;
  an aqueduct's terminal basin, cistern or fountain house is its class's building (V11's `conduit_house`). Nothing
  in V02 depends on whether a raised way was generated or declared: when the user removes one, the ground it frees is
  re-plotted by the base's locality and its new buildings are ordinary massings; **when the user adds one, or an epoch raises one (V06), every building whose
  footprint meets a pier or the under-deck strip (V01 §3.17.3 (2): the strip is a hole in the faces it crosses)
  takes the base's least-disruption fates, its plot removed by V01 §3.17.4's add path** — the same set on every
  path, so a way founded at an epoch (V06 §3.19 (7), its households displaced with cause `clearance`) and the same way
  regenerated at its address stand over the same open ground (J-V2.89: no building stays under the deck, because item 110 (b) keeps the spaces
  between the piers open or vaulted). The least soffit over a crossed way is item 244's clearance rule — the way's held
  `clearanceCm` first, else V11's `raisedWays.structure.clearanceCm` for the crossed class — which V01 §3.17.3 (3) cites
  identically; V02 keeps no clearance of its own. A building inside an arch vault under a raised way (V04's `archVault` chamber;
  the `@underground` rows) is clamped under the vault's soffit by M11's `vaultClamp` (X29).
* **(e) The second known-city fixture** (an original skeleton, at M3a). V02's building bars T-V2-44 – T-V2-47 and T-V2-51
  run on its stepped temple, its mole with a mid-mole tower and a fort at its mouth, its jetties' deck buildings, its
  terraced wards and **its arena, an `ovalCourt`** (the `arena` family row, V02 §3.10.2, laid by `massOval` from M3a; T-V2-42) — its lighthouse islet's tower is
  an ordinary land building (V02 §3.16 (2)); the fixture's own bars are V12's (X25). Because the fixture stands at M3a, the tier construction
  and the deck buildings ship with the base outline builder there (V02 §8.5; item 229).

### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V02 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every geometry stage 3 commits — the massing, a mutation's lay, a `setMassing` commit, a
stack's lay — passes M13's snap and validation (V02 §3.5: an edge below `minEdge` merged, every ring simple and
counter-clockwise, every wing at least 4 m² with every side at least `minEdge`) and commits through S11's kernel
transaction, so a zero-length, zero-area, self-touching, collinear or coincident ring is never committed: at generation
it is an M14 attempt and ends at worst at rung 3, the base rectangle the base guarantees (V02 §3.13); in an edit it is
bent to the least lawful size (`bend.wing.grow`, V02 §4.2 step 2). A degenerate slot hint (zero area, or narrower than
every family's least lengths) reaches rung 3 at once, and below it the base's F-SITEPLAN ladder (§2.6). The composer's
products (dormer rows, porches, rooms) that would be degenerate are dropped or shortened by F-COMPOSE's rungs (V02
§3.13); the view's derivations (the roofscape, `stairFlight`, the exports) skip a zero-area facet or a zero-length line
and never fail a tile or an export. Tests: T-V2-9, T-V2-17, T-V2-56.

**(b) Rungs.** Stage 3 runs at every rung; only its inputs differ:

| rung | stage 3 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | V07's `v.` classes compose by `composition.classFamily` (V02 §3.10.5); a town class plays its `villageForm`'s `v.` class (V02 §3.2); no stepped building unless V11 §3.24.3's culture × class specialisation applies to the `v.` class under V07's `rules.tiers.capPerSettlement` (X26); deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate); every dwelling but a `grandClasses` building reads its row under the rung's grandeur ceiling — at most `single`, `L` or `T`, no tower, turret, gate tower or court — while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115); a disaster's ruined look falls on every building of V07's ends (V02 §5.7) |
| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5); the grandeur ceiling caps nothing (V02 §3.2 step 2) |
| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows; the grandeur ceiling caps nothing |
| the population cap | V02 §6.1's cap row; nothing else changes |
| any rung, the `VG` preset | `sunBias` 0.5 (V02 §3.10.9's preset entries); the rest as the rung's row |

Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58, T-V2-60.

**(c) Toggles and presets.**

| toggle or preset | stage 3 |
|---|---|
| `MFCG`, `FTG` | `massing.composed` off: every class's family `baseOutline`, the base outline builder's footprints byte for byte (V02 §3.1; T-V2-26); `sunBias` 0.5 |
| `NG` | the `hatched` family's constructions; the NG parity sheet's roof construction by V01 §7's rule (X14); T-V2-32 |
| `FM` | the `FM` building look and its calibrated cells (V02 §3.10.8); T-V2-31 |
| `massing.composed` off (an edit of the option) | as under `MFCG` and `FTG`: every class's family `baseOutline` (V02 §3.1) |
| `fantasyShapes` off (the default) / on | the three fantasy families never drawn / drawn at their row weights (V02 §3.3; V02 §4.4's control) |
| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |
| the grandeur ceiling off (V11 §3.24.0's off form: every `grandeur.ceiling` row `enabled` false) | no row capped: every rung reads as TOWN does, byte-identical to stage 3 without item 115 (the `item115.off` pin, V12 §2.13) |
| `elaborate: 'view'` off | the `wings` rung only on a click (V02 §3.11) |
| the export option `compositions` | V02 §5.5 |
| Show crises (§2.9's `crises`): `follow` (the default) / `off` / `preview` | the disaster looks drawn in the view fall on their units' buildings / no look: each building's exterior by its own decay alone, as if no disaster look stood / the previewed `disaster` look at §10.2's `previewSeverity` on the units its preview strikes (V02 §5.7); item 123's damage is never switched |

Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58, T-V2-60.

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's cells are V02 §2.5's and every event's §7.4's
row (V02 §4.4); the elaboration cache and every derived view (V02 §2.4, the roofscape) are recomputed on load, undo,
redo and regenerate and never stored, so none goes stale in a save; a document without stage-3 fields loads by the
fallback migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). The exterior's
damage and a disaster's ruined look (V02 §5.7) are derived at read and never stored: a load re-reads them from the
level, the plan in force and the looks, and an undo or redo of an epoch changes only the level they read, their damage
marks re-emitted with its delta (V02 §5.7 (8)). Tests: T-V2-6, T-V2-19, T-V2-20, T-V2-24, T-V2-34, T-V2-48, T-V2-59,
T-V2-60.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory
data (E5), and degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the stored composition (V02 §2.2) | a stored composition naming a wing key that left; an edited room whose host left; a secondary porch whose entrance left | listed in §7.3's orphan table with re-attach and discard (V02 §4.4), never dropped silently | leave out and report | T-V2-20 |
| the stored composition (V02 §2.2) | a stored composition whose `composition.json` slices a later table version changed | kept as stored (`edited` is never stale, V02 §3.11); its unedited parts re-derive only when the massing changes | — | T-V2-21 |
| the derived functions (V02 §2.4) | a side whose usable run is not positive; a `polygon` wing's free arc shorter than `bayM ÷ 2`; a wing with no ridge (`flat`, `none`) | no bay on that side or arc; no eave sides and so no dormer; `cryptSeedWings` on a building with none returns an empty list (V02 §3.14.5) | — | T-V2-53 |
| the row a building reads (V02 §3.2) | a class, family or structure with no row; a row breaking the arrangement law; V11's templates without the manor override, the role shares or item 427's columns | the chain's next key, ending at `default.<arrangement>/<band>`; the row skipped and reported at load (`arrangementSkip`); R7's defaults (V02 §8.4) | substitute | T-V2-33 |
| the rung ceiling (V02 §3.2 step 2) | a capped row keeping no family; an assignment's drift admitting none of the kept families; a `gatehouse` slot on a capped dwelling; a ceiling row that limits nothing or is off | the default row's capped families, else `baseOutline` (`ceilingEmpty`, reported); the drift's families read uncapped, the why fact naming it; the `outbuilding` row; no cap and no suffix | substitute | T-V2-58 |
| fitting (V02 §3.4) | the slot's `entranceOn` names no access segment; a zero-length access segment; `lir` of a sliver `H` | the plot's longest access segment gives `f`, and with none the massing takes rung 3, reported; a zero-length segment is never the longest; a clamped `w` below the least makes every family infeasible (M3), so rung 2, then rung 3 | substitute | T-V2-17, T-V2-56 |
| the massing (V02 §3.5) | a plot with no slot; a template that draws no structure | no `outline()` call; no building (open ground, V02 §3.10.7) | — | T-V2-56 |
| the massing (V02 §3.5) | one slot, one wing | the drawn family lays one range, or rung 2's `single` | simpler shape | T-V2-17 |
| the massing (V02 §3.5) | a hint below the family's least footprint `Amin`; a band above the plot's capacity | M3's budget test removes the family; M10's reverse-lattice shrink, then `overBudget` reported (T-V2-30) | simpler shape | T-V2-30 |
| the massing (V02 §3.5) | the most the rows draw (wings, blocks, towers, tiers) | every loop runs over a finite list — M7's and M8's candidates tried in drawn order until `k` are accepted or none remain — and at most three attempts of a family (M14), so no lay hangs; a lay the plot cannot hold is the next attempt | retry that piece | T-V2-17, T-V2-22 |
| the composer (V02 §3.6, V02 §3.7) | a building whose every eave has no bay; no main entrance side with room for a porch | no dormer; the porch ladder ends at `none` (F-COMPOSE (2)) | leave out and report | T-V2-12, T-V2-18 |
| the rooms rung (V02 §3.8) | a host shorter than the hall's least length; no host admitting a room | the room shortened once, then omitted, V03 placing that role (F-COMPOSE (3)) | leave out and report | T-V2-35 |
| the mutation (V02 §3.9) | a kept wing outside every target's ± 15 % side rule; a mutation toward the building's own family | the target unreachable, the next reachable family drawn; a mutation to its own family re-lays nothing (every wing kept) | substitute | T-V2-16 |
| elaboration (V02 §3.11) | a click on a building whose `wings` rung failed; a tile holding more buildings than one batch composes | the identity composition, reported (F-COMPOSE (4)); the batches of `viewBatchMs`, the massing's roofscape drawn meanwhile | substitute | T-V2-18, T-V2-22 |
| determinism (V02 §3.12) | two candidates at equal weight or distance; a row cell absent from `composition.json` | ties by the lowest key, then the fixed geometric enumeration order; an absent cell is resolved by V02 §3.2's chain before any draw, so no draw reads a missing range | — | T-V2-13, T-V2-33 |
| the owner's rules (V02 §3.14) | a split site whose works plot is lost; a ladder demotion with one member | the merge-back's two mutations in one event; the demotion keeps the member nearest its demand, the as-built bytes returning | — | T-V2-39, T-V2-40 |
| stepped massing (V02 §3.15) | a hint too small for a second tier; a draw of more tiers than fit | ST8's shrink, then the single fallback, reported (`tiersTruncated`, `shrineDropped`) | simpler shape | T-V2-46 |
| deck buildings (V02 §3.16) | a deck plot narrower than every family's least lengths; a deck whose `deckCm` is unset | F-MASSING to the base rectangle inside the plot; no deck plot at all (V02 §3.16 (1)) | simpler shape | T-V2-47 |
| item 110's rest (V02 §3.17) | a wall of zero height inside `terrace.wallBandCm`; a building meeting a raised way's pier strip | the wall-side sample equals the terrain's (nothing moves); the add path clears the building (V02 §3.17 (b)) | — | T-V2-51, T-V2-53 |
| the ops (V02 §4.1, V02 §4.2) | an op with no optional field; `addRange` whose two points coincide; a canvas drag to a zero-width range | every omitted value the row's central value (V02 §3.12); the zero-length centre line grows along the plot's frontage direction `f` (V02 §3.4) by `bend.wing.grow`'s rule, as a zero width grows to 2 m | repair locally | T-V2-19, T-V2-56 |
| `setComposition` (V02 §4.3) | `dormers` with count 0; `porch` with an `entrance` ordinal naming no current entrance | the eave's row stored with no dormer (`edited`); the op bends to the nearest side, rear or yard entrance (V02 §4.4's re-attach rule), and with none is a no-op, named | repair locally | T-V2-20, T-V2-56 |
| the skeleton file (V02 §4.5) | a `setMassing` line naming a key that no longer exists | orphaned and reported (§7.4's migrate cell) | leave out and report | T-V2-34 |
| editing stacks (V02 §4.6) | `centre` outside the plot; `radiusCm` giving tier 0 below 4 m² or a side below `minEdge` | the least move into the plot region; the ring grown to the least lawful size (`bend.wing.grow`), the stack re-inset | repair locally | T-V2-48 |
| drawing (V02 §5.1–§5.3, V02 §5.6) | a map with no building; a one-wing building; a sheet that omits one of V02 §5.3's cells | nothing drawn by stage 3; that wing's facets alone; the shipped default cell | — | T-V2-9, T-V2-56 |
| exports (V02 §5.5) | a scope with no building; a zero-area facet | no stage-3 entry; the facet skipped in every format | leave out | T-V2-24 |
| the exterior's damage (V02 §5.7) | level 0 (never abandoned, under no look); level 1; no plan in force (none stored, none current); a stale cached plan | nothing drawn, byte-identical (T123-7's no-op); every element the plan holds damaged; the massing reading, no hole or gap; the stale plan never read — the massing reading until the plan is re-derived | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a building with no roof bay over a room or no storeyed wing (a solid monument, a stack of solid tiers); a wing roofed `none` (the decline's roofless state, a fire's charred shell); a building under a Works whose stage draws no roof (`wallsRising`) or no building yet (`staked`, `groundBroken`) | no hole (gaps only where a storeyed wing has outer runs); no facet to hole — the gaps cut from its state row's outline, and every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined`, damaged (§2.6 step 7); holes only in the facets the stage draws and gaps only on an outline it draws, nothing where it draws no building | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a restoration from level 1 to 0; a wing an `extend` adds, or an element a re-cut makes, after the damage left; a building first met ruined (generated as a ruin, or reached by item 113's replay) | the damage leaving in reverse threshold order, each repaired bay patched and each repaired run drawn whole; the new elements drawn as built, never patched (V06's per-element `decayPeak`, V03 §5.6 (2) (b)); its plan as built under its damage (V03), the exterior reading that plan | — | T-V2-59 |
| the damage marks (V02 §5.7 (8)) | a drawn week that moves a level without crossing a threshold; one that crosses one, a look's week edge or a rebuild's start; Show crises switched, a preview started or ended, View as changed; a plan entering force, or evicted from the elaboration cache; a commit that moves a level or a look's units; a cached tile of a struck district | nothing re-emitted; exactly the buildings whose marks change re-emitted, the rest untouched; the buildings of the looks' units before and after re-emitted; that building re-emitted, its element reading joining or leaving; its marks in the commit's delta; the tile redrawn after each re-emission (its dirty box, §8.1 item 4) and keyed by the drawn week, `crises` and the effective key (§8.8) | — | T-V2-59, T-V2-60 |
| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's key withholds; a `preview` on a standalone document; a preview over buildings under a rebuild's Works; an overlay whose condition carries no calamity | the `disaster` row's two `lookLevel` ends; the higher level, with that look's pattern (ties: the lower condition id); no look on any building; the previewed look at `previewSeverity` on its preview's units; the look on every building of its units whatever their Works (a preview never hands over, V06 §3.22 (3)); the `scatter` pattern (V01 §3.16 (2)) | — | T-V2-60 |
| the ruined look (V02 §5.7) | a roofless building; a deck building; a tower; a stack; an underground building | its state row with the gaps; as any building (its own plan; no cellar); the tower room's roof bay opening its cone; each storeyed wing's own roof bays and lowest-storey runs, a solid wing none; none — below ground is V04's | — | T-V2-60 |

**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits; the rung column names the
§5 rung of a failure outcome, and — marks a rule with no failure:

| combination | outcome | rung | test |
|---|---|---|---|
| a cliff and a composed building | the massing stays inside `H` (V02 §3.4), which the base's plot model keeps off the cliff face; each wing's datum is `deriveBase` over its own samples (plinth and skirt, §2.6); a wing against a retaining wall at the cliff's foot takes the wall-side sample (item 231) | — | T-V2-1, T-V2-51 |
| steep ground and a composed building | above `axisSlope` a `fallLine` class lies along the fall line (V02 §3.4); every wing's datum per `deriveBase` | — | T-V2-41 |
| steep ground and tiers | tier 0's datum per `deriveBase`, the stack re-based by `rebaseStack`; a stair whose run the slope lengthens steepens up to `stairGradeMax`, reported `stairSteep` (V02 §3.15) | repair locally (the stair steepened, `stairSteep` reported) | T-V2-44, T-V2-45 |
| steep ground and a crypt | the crypt's floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)` (V02 §3.14.5 (d)) | — | T-V2-36 |
| a river, a coast, a moat or an oasis and a crypt | the water table decides the ladder's form — full, half-sunk or raised (V02 §3.14.5 (d)); the crypt is never refused | — | T-V2-36 |
| a coast or an oasis and a composed building | a `water`-axis class reads the nearest water face — an oasis's spring pool included (item 111) — within `axisWaterM` (V02 §3.4) | — | T-V2-41, T-V2-57 |
| a harbour and a composed building | deck plots on moles, piers, jetties and quay platforms by V02 §3.16; a bank quay's plots ground | — | T-V2-47 |
| a bridge over a river, or over a moat away from a gate, and a composed building | a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford, a drawbridge or a gate's moat deck carries no deck plot (§4.7 *Deck plots*) | — | T-V2-47 |
| a moat, a square, an oasis's spring pool or the map frame and a composed building, tiers or a crypt | none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside the plot; an oasis's spring pool is water outside the plot (item 111), so `H` excludes it and a stack stands inside `H`, tier 0 on `deriveBase`'s datum over its own samples (V02 §3.15.2); a porch stays inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots off the frame | — | T-V2-1, T-V2-12, T-V2-36, T-V2-57 |
| a raised way and a composed building, tiers or a crypt | the add path clears every building meeting its piers or strip (V02 §3.17 (b)); a cleared building's basement and crypt leave through V03 and V04's closure, never silently (V02 §3.14.5 (c)); a use a dossier crypt record binds is relocated by the base's relocation (§10.3), its crypt re-derived at its new building by the no-refusal ladder; a building inside an arch vault is clamped by `vaultClamp` (M11) | leave out and report (a cleared building, its basement and crypt); substitute (the bound use at its new building); repair locally (`vaultClamp`) | T-V2-53, T-V2-57 |
| a stage-2 neighbourhood (V01) and a composed building | the neighbourhood click raises the `wings` rung centre-out (V02 §3.11); V01's entrance reserve reads the `PorchKindRow`s (V02 §8.5) | — | T-V2-21 |
| a terraced ward (V01) and a composed building or a crypt | every building's datum within `plinthCm + 10 cm` of its own terrace's level (T-V2-51); a basement's and a crypt's floors read the levelled ground as their terrain samples | — | T-V2-51, T-V2-57 |
| a lock and a composed building | a lock on `wings/<key>` holds that wing against every mutation, re-derivation and edit of another wing (V02 §4.1); an op on it is refused with the lock named (item 101 R2) | — (a refusal, the lock named; item 101 R2) | T-V2-19 |
| a crypt and undo | undo of a `setMassing` or a mutation restores the former basement and crypt with every wing, byte for byte (V02 §4.2 step 5) | — | T-V2-36 |
| a settlement growing over a sealed void | a wing W6 adds over a sealed void draws its access once on V04's `sewer` key (V02 §3.9 W6); no `setMassing` op draws | — | T-V2-36 |
| a dossier removing what an edit pinned | the dossier fact wins (item 20): the building goes by its fate, and the `setMassing` and `setComposition` edits on it are orphaned and listed in §7.3's orphan table | leave out and report (the orphaned edits listed) | T-V2-57 |
| a rung change at an epoch and a standing composed building (item 115 (e)) | the crossing reshapes no standing building, up or down: its re-derivations read the ceiling of the rung its `MassingRef.row` records; a building new or rebuilt from that epoch reads the new rung's ceiling (V02 §3.2 step 2; V06 §3.8.5) | — | T-V2-58 |
| an epoch undone after a save | the epoch's recorded wing steps (`EditBase.mutations`) reverse exactly on the loaded document as before the save | — | T-V2-15, T-V2-57 |
| a disaster's look over a building really decayed | each element drawn at the higher of the two levels; an element the look's level does not reach keeps its real state, a repaired one its patch | — | T-V2-60 |
| a disaster's look and its aftermath (V06) | the look leaves a building where V06's `crisisLookYields` holds, so no week draws both the look and the rebuild's scaffolding; a building the next epoch really ruins or abandons reads its own level from that epoch's week; an element only the look damaged is drawn in its real state when the look ends, never patched | — | T-V2-60 |
| a disaster's look and a Works on its building | a Works other than a `decay` Works begun by the week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) ends the look on that building (V06's `crisisLookYields`): its Works' stage and its own state drawn, never both; a `decay` Works, or one finished before the condition, leaves the look standing, its damage over what the stage draws — holes in the facets it draws, gaps on the outline it draws | — | T-V2-60 |
| a disaster's look over a deck building whose deck is ruined | the building by its own state row (§8.2's deck row) and the higher level; when the deck's fall tombstones it, nothing | — | T-V2-60 |
| a dossier change moving a condition's weeks or severity, or removing a building under a look | the look re-read at the next draw, no rung stale; a removed building drawn by its fate, no look on what is gone | — | T-V2-60 |
| an epoch undone, or a save and load, while a look stands | nothing stored: the exterior re-reads the restored level and the look's weeks, byte-identical to before | — | T-V2-59, T-V2-60 |
| a building's decline after its plan was derived (an epoch's `vacate`, a fire's `burn`, a flood's or a topple's `ruin`) | the `wings` and `rooms` rungs stay `current` (V02 §3.11) and the plan in force stands (§2.6 step 7); the exterior's element reading reads it at the rising level | — | T-V2-59 |

## 4 Editing

### 4.1 The declarations — two event kinds under T9 `shape` (item 351)

Item 101's rule holds: no thirteenth tool. The building tool T9 `shape` gains parameters, each an existing event or one of
two new event kinds (the `Edit` union's members, §7.1; this section declares their ops); a new building is still T6
`place` / `build`, whose S11 run is the massing.

```ts
| { t: 'setMassing'; building: Id; op: MassingOp }
| { t: 'setComposition'; building: Id; op: CompositionOp }
type MassingOp =
  | { op: 'family'; family: MassingFamilyId }                                                   // re-lay the building as another family: V02 §3.9 W1–W9 with that family, the current wings the seeds; draws on siteplan.mutate (V02 §3.12)
  | { op: 'addRange'; from: PointsForm /* two points: the range's centre line (item 101 (i)) */; widthCm?: Cm; floors?: number; role?: 'range' | 'cross' | 'service' }
  | { op: 'reshapeRange'; wing: number /* key */; ends?: [PointCm, PointCm]; widthCm?: Cm }    // the centre-line and width handles
  | { op: 'addTower'; from: PointsForm /* one point: the centre */; radiusCm?: Cm; shape?: 'round' | 'square' | 'octagon'; turret?: boolean; floors?: number }
  | { op: 'moveTower'; wing: number; at: PointCm; radiusCm?: Cm; shape?: 'round' | 'square' | 'octagon' }   // shape: the ring re-made at the same centre and radius
  | { op: 'addBlock'; wing: number /* the host range */; at: PointCm /* on its ridge */; lengthCm?: Cm; depthCm?: Cm }
  | { op: 'backRange'; on: boolean; lengthCm?: Cm; widthCm?: Cm; side?: 'left' | 'right' }
  | { op: 'removeWing'; wing: number };                                                           // and the `tiers` member (V02 §4.6)
type CompositionOp =
  | { op: 'dormers'; wing: number; eave: 0 | 1; count: number; widthCm?: Cm; kind?: DormerKind }
  | { op: 'porch'; kind: PorchKind | 'none'; widthCm?: Cm; depthCm?: Cm; entrance?: number /* an Entrance ordinal: set → the secondary porch at that side, rear or yard entrance (a hood or none) */ }
  | { op: 'room'; role: 'hall' | 'gatehall' | 'chapel'; on: boolean; fromCm?: Cm; toCm?: Cm /* the extent along its host's ridge, from the host's ridge start */ };   // V02 §3.8's rooms: on or off, and their extent
```

A wing's storeys and roof are `setAttr` on `wings/<key>/heights/floors` and `wings/<key>/roof` (`kind`, `pitch`, `high`)
— the base's `setAttr` of heights and roof, addressed by key (item 351). A lock on `wings/<key>` (an attribute-level lock,
§7.2) holds that wing against every mutation, re-derivation and edit of another wing. Re-rolls are the base's
`regenerate` with `rung: 'wings'` or `'rooms'`; the massing's re-roll is New random on the building's plot. The draws of
every op are V02 §3.12's (J-V2.18): the `family` op draws on `siteplan.mutate`, every other op draws nothing, so a replay
is exact either way.

### 4.2 What each `setMassing` does — dry run, commit, locality, undo

1. **The new wing set, as values.** `family`: V02 §3.9's steps, recorded as `MutationStep`s in `EditBase.mutations`; a
   `family` op into or out of `stepped` also writes the use's stepped specialisation in the same undo group (V02 §4.6 (1)).
   `addRange`: the two points (snapped by the authoring boundary's resampling and snap, §7.1) are the centre line; width
   as given or the row's middle width; an end within `w` of another range's long side ends on that side (a butt joint); an
   end within `w/2` of another range's free end, turned by more than 2°, mitres with it; role `range` unless given; floors
   as given or the `main` wing's; roof by the role's default kind. `reshapeRange`: the ends and width move; every range
   abutting it is re-trimmed to its new side; a block on it is re-split (V02 §3.5 M7). `addTower`: the point is the centre;
   radius and shape as given or the row's middle; floors one above the tallest wing it meets. `moveTower`: the same tests
   at the new centre; a new `shape` re-makes the ring at the same centre and radius (a stored plan's room and stair re-cut
   by the plan rung). `addBlock`: V02 §3.5 M7 on the host at the given point. `backRange`: V02 §3.5 M9 on or off with the
   given sizes and side. `removeWing`: the wing leaves (its key never re-used); a removed block's host pieces re-join into
   one wing keeping the lowest of their keys; **removing the `main` wing passes the role to the longest remaining range**
   (ties by key). **Bends, never refusals (item 101 R2; J-V2.79)**, each named in one line with its closest alternatives:
   * `removeWing` of the building's last wing bends to T6's `remove` of the building, one undoable event
     (`bend.building.remove`: "Removed the building with its last wing");
   * `reshapeRange` on a row quad (whose party walls are the plot's, J-V2.13) bends, for its ends' moves along the
     frontage, to the plot edit that moves that party-wall line — the plot's `moveVertex` on the line's frontage vertex,
     the neighbour's quad re-clipped by S11, both in one event (`bend.row.plotLine`; a lock on the neighbour's quad or plot
     is refused with the lock named, R2's second class) — and for its width (the quad's depth into the plot) re-cuts the
     quad's rear chain at the new depth inside the plot and the back region, the quad then an edited, pinned wing;
   * `removeWing` on a row quad that is not the building's last wing removes it: a gap in the row, the neighbours'
     party-wall ends reclassed as gables by the roofscape (V02 §5.2 step 1), the remaining wing taking `main`;
   * a `family` op whose family is unreachable or infeasible on the building bends to the reachable, feasible family
     nearest it — the fewest growth-lattice steps, ties by the target row's weight — naming the least plot the asked
     family needs and offering `join` (`bend.family.nearest`).

   Every writer re-sorts the wings into the canonical order (V02 §2.1) and rewrites `MassingRef.segments` before the dry
   run's checks.
2. **The dry run** (on the overlay, §7.1). The region the edit may use is the plot less the footprints of the plot's other
   buildings, each buffered by `attractCm` — a hand may build to the plot line, never over a neighbour, a passage's other
   side or a way. The checks are V02 §3.5 M13's (tiling apart from towers, containment in that region, the ring rules,
   `minEdge`) and M8 (ii)–(v) for a tower; M10's budget does not apply to a hand edit (the capacity follows the shell). A
   failing op **bends to the nearest lawful one**, named (item 101 R2): a range crossing the region's boundary is clipped to
   it; a tower that would stand through a wing moves outward along the line from the wing's nearest boundary point by the
   least distance that passes (iii); a range overlapping another is trimmed to a butt joint; a wing below 4 m² or with a
   side below `minEdge` grows about its centre line to the least lawful size — width first to 2 m, then length until 4 m² —
   inside the region (`bend.wing.grow`); an op reaching beyond the plot is clipped to it and its line offers `join` with the
   neighbour (T9's `join`, §7.1) as the way to more land. An op on a locked wing, or one that would move a locked wing, is
   refused with the lock named — with a dossier fact (item 20), the only refusals (item 101 R2). **Every `setMassing` op's
   dry run — the `tiers` op's among them — also lists**, from V03's `plan` query, every stored-plan room, edited opening
   and furnished room the op would orphan (V03 §3.11, V03 §4.2–§4.3), each with §7.3's orphan actions.
3. **The commit** runs S11's operator on the plot with the building's new wings fixed (the path `moveFootprint` takes,
   §2.6 rule 5): the footprint face re-inserted with the plot's other buildings fixed; `deriveBase`; the entrance set
   re-derived (an edited entrance kept, §7.2; the massing's entrance hint re-read); the basement re-derived unless edited —
   **keeping the crypt** of an `always` class with no condition, and a `basement`-class church's while its class stays in
   the church family, the cathedral's by the no-refusal ladder and its wet-ground lift (V02 §3.14.5); the yard partition
   re-fitted (a new hole typed `court`, item 303); the capacity function re-read and any excess re-homed by §4.7's
   overflow pass, the first carry; for a stored composition, its re-match by key (V02 §3.9 W8); and a **stored plan
   re-cut inside the event** by V03 §3.11 around its edited parts. An unstored `wings` rung is marked stale.
4. **Locality (§7.3 item 1).** The effective scope is the plot (its faces and buildings), the passage a wing spans (the
   base's rule) and the buildings receiving re-homed households; T-V2-19 checks that nothing else changes.
5. **Undo** keeps the former wings, `Building.massing`, `nextWingKey`, the stored composition and everything S11's re-fit
   changed (§7.4's S11 rows), and restores them exactly, a re-homed household's former building included.

### 4.3 What each `setComposition` does

The first `setComposition` on a building **stores its composition** — the current derived composition with the op
applied — as `Building.composition` (the base's rule for the first composition or plan edit, §2.6), its record `edited`.

* `dormers`: the count is clamped to the eave's bays (`facadeBays`), named if clamped; the row is marked `edited` (a fixed
  input to the plan rung's dormers, V03).
* `porch`: a kind whose space fails (V02 §3.7) bends to the nearest feasible kind, named; with `entrance` it sets or
  removes the secondary porch there (a hood; any other kind bends to a hood, named).
* `room`: turns the hall, the gate hall or the chapel on or off and sets its extent along its host's ridge, bent to the
  nearest lawful extent by V02 §3.13 (3)'s rule and named; the room is marked `edited` (a fixed ring for the plan rung)
  and kept through a re-derivation of the `rooms` rung while its host keeps its key; a stored plan is re-cut inside the
  event by V03 §3.11, the dry run listing the stored-plan rooms, edited openings and furnished rooms the op would orphan
  (V03 §3.11, V03 §4.3). Turning a room on where no host admits it **bends** (item 101 R2): a gate hall without a `gate`
  range becomes a **gate passage** through the wing carrying the main entrance — eave side to eave side at the
  entrance's offset, the row's central `gateHallM` wide, its two ends arches to the street and to the yard behind
  (`bend.room.passage`); a hall or chapel goes to the `main` wing, else the largest storeyed wing (a chapel at its east end
  by V02 §3.8's rule; `bend.room.host`); on a building whose wings are all solid, the op first turns the tiers above tier
  0 storeyed (the `tiers` op's `solid: 'lower'`, V02 §4.6) and then places the room in the lowest of them, both named.

The effective scope is the building. Undo restores the former composition, or removes the stored one when this event
stored it (J-P48 (5)); the rooms and plan points the stored composition holds are carried by `carryWings` (the base's
rule); its composed wings and towers follow their base wings by key (V02 §2.2).

### 4.4 The lifecycle rows (§7.4's row; item 351), orphans and controls

**Lifecycle.** Both kinds take §7.4's `setMassing / setComposition` row (item 351: create, read, persist, regenerate,
undo, migrate). What that row leaves to this volume: `setMassing` is created by T9 `shape`'s handles and family strip
(V02 §4.5), the clerk's `shape` call and a skeleton file line; an edited dormer row is also a fixed input to the plan
rung's dormers (V03); `setComposition` migrates by the building's address and the wing key, a secondary porch by its
entrance ordinal; a `family` op whose family a later grammar retires maps through the grammar's migration row.

**Orphans (§7.3's orphan table; J-P48).** An edited dormer row whose eave changed length by more than ± 10 % (V02 §3.9 W8),
an edited room whose host key left, and a secondary porch whose entrance left are listed in §7.3's orphan table with two
actions: **re-attach** (a dormer row to the same eave of the same key, its count clamped to the new bays; a room to its
role's lawful host by V02 §3.8, its extent clamped; a porch to the nearest side, rear or yard entrance) and **discard**
(the derived value returns). Nothing orphaned is dropped silently.

**Controls (§7.8; item 402).** `fantasyShapes` is a registered control: output metric "the share of fantasy families among
composed buildings", consuming stage S11, locality class *re-derive from S11* (the fate report first, §7.1), continuity
*discrete* (off / on), documentation anchor V02 §3.3; it sits in V09's advanced panel. The `FM` building look (V02
§3.10.8) is a style choice in V09's style panel (V02 X10); it changes no model byte.

### 4.5 The canvas, the clerk and the skeleton file

* **Canvas handles** (V09 §3.5 draws them; this is their contract): at the building band each range shows its two
  centre-line end handles and one width handle (→ `reshapeRange`), each tower its centre and radius handles (→ `moveTower`)
  and a shape chip (→ `moveTower { shape }`), each wing a storey stepper and a roof-kind chip (→ `setAttr`), each eave a
  dormer stepper (→ `setComposition dormers`), the main entrance a porch chip and every side, rear or yard entrance a hood
  toggle (→ `setComposition porch`), and — with the plan shown — the hall, gate hall and chapel an on/off chip and two
  extent handles along their host's ridge (→ `setComposition room`). A **family strip** shows the feasible families of the
  building's row read uncapped (a family above the rung's grandeur ceiling carrying V09 §4.21.5's beyond-tier line,
  V02 §3.2 step 2), each as a ghost made by a dry run of `setMassing family`, one tap committing it. Every drag previews its
  dry run live inside the plot (§14's interaction contract) and commits one event on release.
* **The clerk** (V10) calls the same operations through the tool API (§11.2): "make the manor an H" is
  `setMassing { family: 'H' }`; "a round tower on the north-east corner" is `addTower` at that corner's point; "two dormers
  on the street side" is `setComposition dormers` on the `main` wing's street eave. It reads a building's massing (family,
  wings with roles, storeys, roof kinds, towers) and composition (dormer rows, porch, rooms) through the reader under §9.2's
  knowledge rules: the mass of every building is public (J-A30.83), and nothing in this volume is concealed (a front's
  concealed rooms are the plan's, V03).
* **"Why is it this shape?" — the `WhyProvider` (V10 §3.9 lists it; J-V2.51).** `@plat/buildings` registers a provider for
  the kind `building` at the paths `massing`, `wings/<key>` and `composition`, filling §11.2's `WhyAnswer` with no new field:
  **`facts`** — `massing/family`, `massing/row` (the key the chain reached), `massing/ceiling` (the rung whose
  `grandeur.ceiling` row capped the row and the cells it set, or why none did — a `grandClasses` building, a hand design, a
  drift read uncapped, a row that limits nothing; item 115), the manifested band and value, the drift
  bounds, `fantasyShapes`, `massing/segments`, `massing/axis` with `MassingRef.low`, each wing's role, floors and roof, and
  the **alternatives** as fact rows — `massing/alternatives/<family>` = its renormalised weight among M3's feasible families
  (or `infeasible: <the failed test>`), `wings/<key>/rejected/<i>` = the M8 test (i)–(v) a rejected tower candidate failed,
  `composition/porch/d` and `composition/porch/feasible`, `composition/dormers/<key>/<eave>/dropped` = the obstacle of a
  dropped dormer — each with `tier: 'derived'` and `row` the `composition.json` slice; **`cause`** — S11's massing
  (`step: 'S11'`, `rule: 'V02 §3.5'`, `chance: 'massing'` with its creation index), the `setMassing` event (`seq`), or the
  mutation's W1 draw or kept seeds (W2; `chance: 'siteplan.mutate'`); the sunlit choice names `sunBias` and the options'
  factors. The alternatives are **recomputed** by re-running M3 and the M5/M8 tests on the committed state without
  advancing any stream (a pure function), so the answer on an untouched building equals the massing's recorded draws
  (T-V2-43). "Why no crypt / why this crypt" is V03's and V04's provider (item 238's `Basement.crypt`).
* **A skeleton file** carries these events as ordered declarations like any other (§11.1): a building declared with
  `build` and shaped by `setMassing` lines is re-created exactly by the creation prefix's fold (§4.1's read-ahead reads no
  stage-3 declaration ahead; the massing runs when its plot's S11 runs, and the declared ops apply at their log positions).

### 4.6 Editing stacks and deck buildings

```ts
// MassingOp (V02 §4.1) gains one member
  | { op: 'tiers'; count?: number; insetCm?: Cm; top?: 'flat' | 'shrine' | 'roofed'; stairs?: 'axial' | 'flights' | 'internal' | 'none';
    stairWidthCm?: Cm; shape?: 'rect' | 'round' | 'octagon'; lowerRoof?: 'flat' | 'pent'; solid?: 'all' | 'lower' | 'none';
    shrineInsetShare?: number; centre?: PointCm; radiusCm?: Cm }
  // re-lays a stepped building's stack on its tier 0 (layTiers' anchored mode); on any other building it first bends to family 'stepped'
```

**No refusal but a lock or a dossier fact (item 101 R2; J-V2.79).** Every limit of a stack, a deck or a row below is a
**bend** to the nearest lawful declaration, named in one line with its closest alternatives; each bend id is one of V02
§1b's, worded by V09 §4.9's catalogue row (X21) and by the clerk through it (X22). This no-refusal rule is the one every
volume follows (J-VI.4). The bends draw nothing (V02 §3.12) and each is one undoable event; undo restores the building's
leaf digest exactly.

1. **The `tiers` op.** On a building that is **not stepped** it bends to `setMassing { op: 'family', family: 'stepped' }`
   followed in the same event by the op's values (`bend.tiers.stepped`: "Made it a stepped building first") — V02
   §3.15.5's anchored `single → stepped` on the building's `main` range, through `single` by the growth rows, drawing on
   `siteplan.mutate` as a `family` op does; where W1's anchored test fails, `bend.family.nearest` (V02 §4.2) applies.
   **The stepped specialisation (J-V2.94).** This bend, and a `setMassing { family: 'stepped' }` op, write in the same
   undo group (§7.1's `EditBase.group`) an `editTable` row op on the use's `siting.declared` `use:` row (V11 §4.2), setting
   its cell `specialisation` to the id of V11 §3.24.3's row for the use's culture and class where one exists, else
   `stepped_temple` for a class of the worship family, `terraced_palace` for `palace`, `tiered_tower` for `tower_house`,
   `mage_tower` or `watchtower`, and no cell for any other class (its own plan rows stay) — so `Use.specialisation`, the
   heights row where the specialisation names one (`stepped-shrine`) and V03's plan rows follow the hand-made stack, held
   and exempt from the chance and the cap (V11 §3.24.3). A `family` op from `stepped` to another family on a use holding a
   stepped specialisation writes `specialisation: 'none'` the same way. Undo removes the row op with the event; a skeleton
   file replays both lines.
   **On a stepped building** the op re-runs `layTiers` in anchored mode on tier 0 with `MassingRef.stack` and the op's
   values, with no draw: a value the op leaves out keeps the stored one (the count: the tiers now standing; the step
   `stack.insetCm`; the grade `stack.grade`; the top; the stair form; the stair width: the current stairs'; the shape, the
   skirt, the solid mode and the shrine's inset as laid). **A new tier** takes the row's central values: `floors = max(1,
   round-half-up(central(tierFloors) × taper^k))`, or height `central(solidHeightM) × taper^k` to the centimetre.
   **Keys:** a kept tier keeps its key, and its ring and heights exactly where the step, the shape and the stair form are
   unchanged (else its ring is re-inset, its key and heights kept); a stair keeps its key across a change of stair form
   while its tier stands (its ring re-laid), and is removed with its tier or under `internal` or `none`; tiers above the new
   count are removed with their stairs and every wing standing on them (keys retired); new tiers and stairs take keys from
   `nextWingKey`; the shrine comes and goes with `top`.
   **The fields and their bends:**
   * `count` above what fits bends to the most that fits (`bend.tiers.count`); an `insetCm` that leaves no second tier
     bends to the largest lawful step (`bend.tiers.step`).
   * `stairs`: `flights` on a round or octagonal stack bends to `axial` (`bend.tiers.axial`); **`internal` over a solid tier
     0** bends to `none` where every tier is solid, else to `axial` (the first form of J-V2.74's order; `bend.tiers.none`,
     `bend.tiers.axial`); `none` over a storeyed tier 0 bends to `internal` (`bend.tiers.internal`); where the reserve of
     the asked form does not fit in front of tier 0 inside the plot, the forms are tried in J-V2.74's order, and where none
     fits the current form is kept, named with the depth the asked form needs (`bend.tiers.form`).
   * **`none` — the sealed stack**: lawful wherever tier 0 is solid; ST3 uses `d` on every side, ST5 lays no stair, ST6
     skips the chain check, `stairChain` is empty and `landingSide` null; a storeyed tier or shrine on it is reached by
     nothing (V03's `W_TIER_UNREACHED`), which the line names.
   * `shape` re-lays tier 0 as the named shape inscribed in its current ring's bounding rectangle in the building's frame
     (a round or octagonal ring at that rectangle's inradius, a rect at the rectangle itself), the stack re-inset.
   * `centre` and `radiusCm` (a round or octagonal tier 0): tier 0 re-laid as the regular ring of that centre and
     circumradius, clipped by the least move to the plot region (V02 §4.2 step 2), the stack re-inset.
   * `lowerRoof: 'pent'` bends to `flat` where the stair form is not `internal` or `none` (equal insets; `bend.stack.roof`);
     a stair form turned `axial` or `flights` on a pent stack turns its lower roofs `flat` in the same event, named.
   * `solid`: `'all'`, `'lower'` or `'none'`; a tier turning storeyed takes the row's central floors (round-half-up), one
     turning solid keeps its `eaveCm` (less any parapet) as its height; a stair form made unlawful by it bends by the rules
     above.
   * `shrineInsetShare` re-lays the shrine (ST4's tests); a shrine that no longer fits drops the top to `flat`, named
     (`bend.tiers.top`).
2. **A tier's height.** `setAttr(wings/<key>/heights/floors)` on a storeyed tier or the shrine, `setAttr(wings/<key>/
   heights/eaveCm)` on a solid tier (item 351's paths). In the same event `rebaseStack` re-bases every wing standing on it,
   directly or through the chain, and each stair whose rise changed is re-laid (ST5, its width kept): where the terrace no
   longer holds the run at the stack's grade, the grade steepens up to `stairGradeMax`; beyond that the height bends to the
   most the terrace allows (`bend.tier.height`: "the stair up this tier needs room on the terrace below").
   **`setAttr(wings/<key>/heights/baseCm)` on a wing with `on`** bends to the same change in the height of the wing it
   stands on — a solid support's `eaveCm` by the difference, a storeyed support's floors by `round-half-up(difference ÷
   storeyCm.upper)` (a zero result a no-op, named) — then the rules above (`bend.stack.base`); a user's `baseCm` on a ground
   wing is kept (J-DET-24) and carries the stack through `rebaseStack`. From M3a to M6c the base's `setAttr` of a wing's
   heights (the wing's index, which equals its key) does the same through the base outline builder (item 229).
3. **Roofs on a stack.** `setAttr(wings/<key>/roof)` bends, named (`bend.stack.roof`): on a lower tier to `flat` or to its
   shape's pent kind (`hip` rect, `pyramid` octagon, `cone` round), the pent kind only under `internal` or `none` (else
   `flat`); on the top tier among `flat`, `hip` (rect), `pyramid` (octagon) and `cone` (round), another kind bending to its
   shape's kind; on a stair to `shed`; on the shrine among the kinds of `TierCells.shrine.roofs`, else the first.
   `MassingRef.stack.lowerRoof` stays the laid default that a later `tiers` re-lay applies.
4. **The other `setMassing` ops on a stepped building.**
   * `reshapeRange` on tier 0 re-insets the whole stack from its new ring (keys kept; a tier that no longer fits removed
     with its stair and everything on it, named).
   * `removeWing` on **tier k ≥ 1** removes it, its stair (the stair whose `to` is tier k), every wing standing on it and
     every higher tier with its stair (named). `removeWing` on **tier 0** removes the stack — tier 0, every stair and every
     wing standing on it; ground wings added beside it stay (the longest takes `main`, the family becomes `single`, `stack`
     is cleared), and with none left it bends to T6's `remove` of the building (`bend.building.remove`).
   * `removeWing` on **a stair** bends to `tiers { stairs: 'internal' }` where tier 0 is storeyed ("Removed the stairs; the
     tiers are now reached from inside"), else to `tiers { stairs: 'none' }` ("… the pyramid is sealed") —
     `bend.tiers.internal`, `bend.tiers.none`.
   * `addRange`, `addTower` and `backRange` are admitted as **ground wings** (no `on`; `bend.stack.groundWing` names the
     placement): each is laid by V02 §4.2's rules outside tier 0's ring, every stair's ring and stair 0's **approach strip**
     — the reserve's width, `landingM` deep in front of stair 0's foot (under `internal`, `landingM` in front of the main
     entrance; under `none`, no strip) — moved away from them by the least distance; a range ending within `w` of tier 0's
     side abuts it (a butt joint, rule 1's shared vertices), a back range takes tier 0 as its host (M9's rear side), and a
     tower passes M8's tests (ii)–(v) with tier 0 as its host wing and its ring clear of every wing standing on tier 0,
     every stair and the strip, its eave raised above tier 0's roof in its ring (M11). **`addBlock`** (a block splits a
     range, and a tier is not a range) bends to `addRange` of the block's size at the given point on the ground beside
     tier 0. M13's pairing then covers tier 0, stair 0 and the added wings; ST6's nesting is unchanged.
   * `family` runs V02 §3.15.5's rows.
5. **Deck buildings.** Every op works as on any building, inside the deck plot (V02 §4.2 step 2's region, which lies
   inside the deck's width). **A floors value above the deck's `maxFloors` bends to it** (`bend.deck.floors`: "a deck
   carries at most n storeys") — for `setAttr` of floors and `addRange`'s `floors` alike (J-V2.70); M10's budget does not
   apply to a hand edit (V02 §4.2), so the plot alone bounds the footprint; **a `family: 'stepped'` op on a deck building
   bends to `single`**, the deck's lawful family nearest a stepped mass (`bend.deck.single`: "A bridge carries small, light
   buildings", the deck's kind named). A cellar asked for on a deck over water is V03's `bend.deck.basement`; a hand
   placement of a crypt-bound use on a deck plot takes T6's landward bend (V02 §3.16 (6)).
6. **Locality, undo, lifecycle.** As V02 §4.2 (4)–(5): the effective scope is the plot (a `bend.row.plotLine` adds the
   neighbour's plot, both in one event); a stack's re-base and re-lay stay inside the building. The undo record keeps the
   former wings, `nextWingKey` and `MassingRef.stack`. §7.4's `setMassing` row covers the `tiers` op and its bends
   unchanged, and a skeleton file carries `tiers` lines like any other `setMassing` line (a bent line replays to the same
   bend).
7. **The clerk, the canvas, the registry and "why".** The clerk maps requests onto the op's fields ("give the temple five
   tiers" `tiers { count: 5 }`, "a shrine on top" `top: 'shrine'`, "stairs along the faces" `stairs: 'flights'`, "seal it"
   `stairs: 'none'`, "make it round" `shape: 'round'`, "skirt roofs on every tier" `lowerRoof: 'pent'`, "one more storey on
   the second terrace" `setAttr(wings/<key>/heights/floors)`; V10, X22). V09 §4.20.6 draws, at the building band, the tier
   stepper, a step handle on tier 1's front face, the stair-form, top-form, shape, skirt and solid chips, a shrine-inset
   handle, the centre and radius handles on a round or octagonal tier 0, and a storey or height stepper per tier (X21).
   **The entity registry** carries two read-only paths for V10's providers and V09's panels: `massing/stack`,
   each tier's wing key in tier order; and on a deck's host (a mole, pier, quay platform or bridge)
   `deck/landmarks/<head|mid>`, naming its landmark plots (`DeckContext.landmark`, V02 §3.16). The `WhyProvider` (V02 §4.5)
   adds the facts `massing/stack/*` (shape, the row's stair form and the one laid, lowerRoof, top, insetCm, grade,
   truncated, the drawn count, the derived aspect), `wings/<key>/on`, `wings/<key>/solid`, `massing/stairSteep` and each
   bend taken (`massing/bend/<id>`), and for a deck building `massing/deck` (the deck kind, its host, the budget band and
   `maxFloors`), each with its `composition.json` or V11
   slice — no new `WhyAnswer` field.

## 5 Rendering, labels, exports

### 5.1 What each band draws (§8.5's bands, with stage 3)

| band | stage 3 draws | from |
|---|---|---|
| **city** | the massing as masses — the base's closing per block (§8.5 (2)): a courtyard building's court stays open when wider than the closing's 1.5 px (a court is a yard part, `ground` at this band); towers and cross-wings show in the mass's silhouette; no roof lines | model (eager) |
| **district** | footprints with outlines and entrance ticks (the base's), and the **roofscape of the massing** (V02 §5.2): ridges, hips, valleys, walls, tower roofs and spires, the cupola, drawn by the style's construction; an `arcade` wing's ground-storey outline dashed; no dormers or porches | model, drawn lazily per tile |
| **neighbourhood** | the district band's, plus — where the building's `wings` rung is current or stored — dormers, the entrance gable, the porch, and §8.10's decorative chimneys at the façade-bay lines (`hearths` of them; none once the plan rung exists, J-A28.85); the change marker on a stale building (§8.5) | model + the elaboration cache |
| **building** | the neighbourhood band's at full detail, and the plan storey by storey (V03); the other storeys' wing outlines faded beneath (the base's) | model + cache |

Under a Works (item 67) a building draws its wings at their stage heights and §8.2's `states` rows: `wallsRising` draws
no roofscape facet, `roofFramed` draws the roofscape's lines through §8.2's `frame` program without fill, a `decayed` or
`ruined` building (roof kind `none`) draws no facet, its walls by the `states` rows (a ruined landmark, V02 §3.14.2,
included). **A stack under Works** takes its stage heights from `heightsAt` (item 318): the stack rising in stack order, a
solid wing by courses of `storeyCm.upper`, no wing drawn or cast before its support reaches its eave, each stair rising
with the tier whose top it reaches, a demolition lowering in reverse (V02 §5.6); the same order reaches V06's Works
(X23). A building whose roof kind is `none` takes no dormer, porch or cupola drawing. Condition (`worn`, `neglected`) and
material stay texture and colour on the same facets (item 19). A building with one wing draws that wing's facets alone;
a map with no building draws nothing of stage 3.

**Ruin and disaster** (items 123 (d), 122): a building's damage and a disaster's ruined look are drawn over these rows
by V02 §5.7 — holes in the roofscape's facets and gaps in the outline, with rubble and patches at the neighbourhood band
and finer — and change no mass at the city band.

### 5.2 The roofscape — one roof plan per building (item 406)

`roofscape(building, composition?)` returns planar, pairwise non-overlapping facets that together cover the footprint
(and a porch outside it). It is derived at read in the tile worker (drawing, float64, the renderer's CPU reference) and
in the generation worker (exports); it stores nothing and draws nothing from any stream.

1. **Ends (`resolveEnds`).** Each wing with a ridge has two **ends** — the ring sides its ridge meets (sides 1 and 3 for
   `ridgeAxis 0`, 2 and 4 for 1). Each end is classed, in this order: `open` if a tower ring covers it; `party` if it lies
   on a party-wall edge of the plot (a row quad's side); `mitre` if it is shared vertex for vertex with another wing's
   end; if it lies along another wing `Y`'s side (a butt joint): `wall` when `Y.eaveCm ≥ X.ridgeCm − 10`, `gable` when
   `X.ridgeCm > Y.ridgeCm + 10` (the end wall rises above `Y`'s roof), else `valley`; a free end is `hip` on a `hip` roof
   and `gable` on every other kind. A block's side partly shared with a piece's end is classed on the shared part.
2. **Ridge lines.** The base's ridge (for a `rect`, the midpoints of its ends; for a `quad`, the arc-length midpoints of
   the chains its `ridgeAxis` names, §2.6), each end adjusted: `hip` pulls the ridge end inward along the ridge by
   `WingRoleRow.hipInset × span` (0.5 — the plan hip at equal pitches — for ranges; a block's `FM` entry, V02 §3.10.8's
   measured-rate cell, keeps a ridge half its short side long, never a pyramid; the hip facets' pitch then follows from the
   inset and the rise), collapsing to the centre only when the wing is no longer than `2 × hipInset × span`; `valley`
   extends it into `Y` by `valleyReach(X, Y, 'float')` (V02 §3.7); `gable`, `party`, `mitre`, `wall` and `open` leave it
   at the end's midpoint (a mitre end's midpoint is the path vertex).
3. **Facets per wing.** `gable` / `hip` roofs: the two long facets from each eave to the ridge, a hip triangle at each `hip`
   end; a `valley` end's facets continue into `Y` up to the **valley lines** — the plan projections of the lines where
   `X`'s facet planes meet `Y`'s near facet plane, clipped to `Y`'s footprint (where `X`'s eave is below `Y`'s, the valley
   starts inside `Y` on the line where `X`'s facet reaches `Y`'s eave height). `shed`: one facet from the low eave to the
   `high` side. `pyramid` and `cone`: one triangle per ring edge to the apex over the ring's centroid. **Pent band facets**
   (J-V2.75): for a wing `x` with a pent roof and the wing `y` standing on it — rings concentric with equal insets and the
   same vertex count (ST3, ST4) — the facets are the band between the two rings: for each side `i` of `x`'s ring one planar
   facet from that side at `x.eaveCm` to the matching side `i` of `y`'s ring at `x.ridgeCm` (two parallel edges, so
   planar), neighbouring facets sharing the edge from `x`'s vertex to `y`'s matching vertex as their hip line; a round or
   octagonal ring is treated per edge (a cone's band); nothing is built inside `y`'s ring. So `ridgeCm = eaveCm + p × d` is
   exactly the height at which the skirt meets the wall of the tier above, and the casters and the glTF and CityJSON roofs
   read the same facets. A pent-kind roof on a wing with nothing standing on it (a truncated stack's former lower tier) is
   laid as the top's roof instead (ST4). `tent`: as a cone at its pitch; a spire is a `cone` or `pyramid` at its spire
   pitch. `flat`: one facet at eave height, with an inner parapet line where `parapetCm > 0`. `dome` (a template part's
   roof): four latitude bands of planar quads over the ring's area centroid (triangles at the apex), rise = the ring's mean
   radius × `domeRise` (1.0; own), each band's ring the base ring scaled toward the centroid by `cos` of its latitude
   (15°, 37.5°, 60°, 82.5° by `dmath`). `plain` (the F-SKELETON downgrade): one flat facet at eave height with no lines.
   `none` (the decline's roofless state): no facet — the wing is excluded from the tiling check below and drawn by §8.2's
   `states` rows. `skeleton` (a drawn footprint, a template polygon): the base's validated straight-skeleton faces (§3.8),
   with its plain-roof downgrade. **The cupola** (M12): a small solid at its range's ridge midpoint — a square plan of side
   `0.3 ×` the range's width, a drum of `0.25 ×` that side, and a `dome` (as above), a `tip` (a cone of rise 2 × its half
   side) or a `pyramid` — standing on the ridge; its facets are extra (`part: 'cupola'`), painted over the roof, never in
   `Heights`. Every facet vertex carries its height `z` (cm above the building's lowest `baseCm`), so each facet has an
   exact plane and normal. A facet of zero area (a collapsed hip, a wing whose ring degenerates in plan) is dropped before
   the tiling check and draws nothing.
   **Chimneys** (the roofscape draws both kinds, §8.6, §8.10). A decorative chimney (no plan) stands at its host point of
   V02 §3.7, on its host's facet. A **plan chimney** (§2.6's `Chimney`) is drawn on the roof or terrace facet over
   `Chimney.column` of the wing that holds storey `Chimney.levels[1]` and whose ring contains the column — so a lower
   tier's stack carried up through the tiers above (V03) rises from the top of the stack, never from a roof the tier above
   covers; a chimney whose column lies inside the ring of a wing standing on that wing (a stored plan not yet re-cut) is not
   drawn and is reported (`chimneyCovered`) until the plan re-derives its levels (V03).
4. **Occlusion, so facets never overlap.** Each valley region (the part of `X`'s extended facets inside `Y`) is removed
   from `Y`'s facets; each tower ring is removed from every other facet (a tower covers what it overlaps — V02 §3.5 M11
   puts its eave above every roof it meets); each ring of a wing that stands on another is removed from the facets of the
   wing it stands on (V02 §5.6); a dormer's plan rectangle is removed from its host facet and replaced by the dormer's own
   facets (a `dormer` or `wallGable`: two facets from its front edge to a short ridge perpendicular to the host's,
   `depthShare` up the slope; a `hoist`: the same with a flat front; the `entranceGable`: two facets whose ridge runs to the
   host's ridge); the porches, outside the footprint, add their own facets (a hood: one thin facet; `gabled`, `twoStorey`:
   two facets with a ridge square to the wall; `halfRound`: the half-cone's triangles, one per arc segment, to the apex on
   the wall line; `recessed`: none — a notch line in the eave). The result tiles footprint ∪ porches, less the wings
   roofed `none` (T-V2-9); the cupola's facets lie over it and are excluded from the tiling.
5. **Lines.** Ridges, hips (the hip facets' shared edges and a mitre on its convex side), valleys (valley lines and a mitre
   on its concave side), eaves (the footprint outline, the base's), a `wall` end's line, tower seams (every other ring
   vertex's edge to the apex for a cone with 16 or more sides, every edge for a pyramid).
6. **Order.** Within a building: porch facets, wing facets, dormer facets, tower facets, then all lines — the reference's
   painter's order (porch under the eave, the tall parts last), which with non-overlapping facets only decides the order of
   anti-aliased edges. Wing facets go in stack order: a wing's before those of every wing standing on it.

The **surface layer** of §8.4 (a) takes its roofs from these facets (the "roof construction" it names), so the light pass
lights the true roof planes and the tower cones. **The shadow casters are the base wings' prisms** (V02 §3.14.1): each
wing's ring from `baseCm` to its eave, and its roof's rise over its ring (a tower's cone or spire only over its own ring)
— model heights, so **no shadow of the model's masses depends on a click** (J-V2.22); they are also item 102's epoch
casters, and never a generation-time caster. **The surface-layer shading of the porches, the dormers and the cupola**
(rungs 1–2 and the roof ornament) appears with their drawing — view only, in no digest and no caster.

### 5.3 Style rows and paint programs

`StyleSheet.roofConstruction` gains `'roofscape'` (item 406), the default construction of every shipped family from stage
3's landing; the older constructions remain for the parity presets (under `MFCG` and `FTG` the massing is the base's, and
their sheets keep their constructions). The paint programs below join §8.2's list. **Every weight, size and pitch in
them is a cell of the program's entry in the sheet's `programs` (§8.2), or of its §8.10 decoration row**; the value given
is the shipped sheets' default (own), and a sheet may set its own.

* `roofscape(tone: 'twoTone' | 'mono' | 'facet')` — fills every facet in the `roof` role: `twoTone` by `faceLight` per
  facet (`lit`), `mono` one tone with the light pass's shading (`ink`, whose light is value-only, §8.4), `facet` the
  per-facet diffuse-and-specular shading of the reference look (the `FM` preset's building band; §8.4 (h), P24); then the
  lines of V02 §5.2 step 5 in `ink`, cells `ridgeWeight` (½ of the band's building outline weight: ridges and seams) and
  `hipWeight` (⅓: hips and valleys); V02 §5.7's damage drawn over the facets — a hole's edge at `hipWeight`, and cell
  `rubbleReachM` (1.5 m: the rubble spill's reach to each side of a gap in the outline).
* `dormer` and `porch` — their facets through the same tone rule, outlined at cell `outlineWeight` (½ the outline weight);
  `towerRoof` — a cone's facets with the seam lines of step 5, a pyramid's with its hips, a spire's the same at its pitch;
  the cupola through `towerRoof` at ½ weight.
* `stairFlight` (V02 §5.6).
* **Roof decorations** (§8.10 rows, view data, keyed by the render key): `sails` — a windmill's four sails on its tower's
  roof, turned to the settlement's prevailing wind where the site states one, else to `+y`; `smokeStack` — V02 §3.14.6's
  added decorative stacks; and, **only in the `FM` building look**, `stepStones` (a stone path from the main door to the
  frame's access side; row cells `stoneM` 0.5–0.8 m and `pitchM` 1 m) and `wallGrass` (grass tufts at re-entrant corners);
  with the `FM` look's per-building roof hue (`weathering` on hue at `w` 0.15, §8.2) and cone facets doubled for drawing
  only.
* **The NG parity sheet's roof construction** (`fakeGablePerWing`, then `roofscape` when V01's NG draw-style bars pass on
  it) is V01 §7's rule (X14); this volume supplies the construction.
* `hatch(ridge | eave, pitch, taper)`, already in §8.2: the `hatched` family's hatch program is V01's (V01 §5.1.2), run per
  roofscape facet; the `FM` look hatches parallel to the eave at a paper pitch, cell `pitchPx` 0.9 px at 1×.
* The `lit` family's roof tint by band (§8.2, item 19) and the material's `pattern` (texture) apply per facet, never
  changing a facet (J-A19.42).
* The **contrast matrix** is unchanged: the roof role's pairs are the building role's (§8.2).

### 5.4 Labels

Stage 3 adds **no** `LabelTable` row and no S13b candidate: a building keeps the base's labels (a landmark's point label
at its footprint, an address); room labels are the base's (§8.5, from the plan rung). Hovering a wing at the district band
and finer names it — its role in our own words from the naming slice **`building.wingRole`** (one entry per `WingRole`,
authored in V11's naming tables, X6: "the main range", "the gate range", "a cross-wing", "a pavilion", "a rear range", "a
service range", "a tower", "a stair turret", "a part", "a shelter", "a tier", "the shrine", "a stair"; the role id is the
fallback) and the building's name — through the reader (§11.2), under the building's `knownTo` (§9.2); nothing here is
concealed. An `ovalCourt`'s solid ranges hover as "the seating" and its `gate` passage wings as "a gate passage" (two
entries keyed by the family and the wing's `solid` flag, X6). A deck building keeps the base's labels.

### 5.5 Exports (item 449)

| format | stage 3 adds |
|---|---|
| **JSON schema** | per building a `massing` block (family, row, grammar, entrance hint, `segments`, `low`, `cupola`, `stack`; each wing's key, role, kind, ring, heights, roof, `arcade`, `on`, `solid`) and, where the `wings` rung is current or stored, a `composition` block with its state (as the base's `plan` block): row, grammar, composed wings (`base`, dormer rows with their derived positions), towers (`base`), the porch and the secondary porch with their derived rings, the courts (derived rings), the rooms; for a deck building a derived `deck` block (`kind`, `host`) read from its plot at export; round-trips (T-V2-24) |
| **SVG** | at the district band and finer, §11.1's grouping: the roofscape's facets in the semantics `sem.building.roof` (wing facets), `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` (by `RoofFacet.part`), and V02 §5.2 step 5's lines in `sem.building.roofline`, each group one compound `<path>` per (semantic, district), the groups in V02 §5.2 step 6's order; the `<metadata>` map carries each facet's subpath range to its wing address `wing:<building>/<key>` (a porch's to its building, a cupola's to its range's wing) — no per-building group and no `data-wing` attribute, so §12.7's element budgets hold; at the city band nothing new (masses); V02 §5.7's damage and a disaster's look as the view draws them — the holes in `sem.building.roof.hole` (one compound `<path>` per district, after the wing facets), the outline left open over each gap, the rubble in `sem.building.rubble`, the look's tone on the facets' fills |
| **glTF 2.0 / OBJ** | roofs from the roofscape facets (replacing per-wing roof meshes); each wing extruded from its own `baseCm` (a tier stands on the tier below at its deck level; a deck building's `baseCm` the deck's), a solid tier a closed prism; towers as ring prisms with cone, pyramid or spire facets; the cupola a small mesh; an `arcade` wing's ground storey exported open (its piers four corner prisms, its walls from the first storey); each stair a stepped solid of `stairTreads`' `n` risers (the k-th top at `⌊k × rise ÷ n⌋`) and treads of `goingCm`, the head tread taking the remainder; with compositions, dormers and porches as small meshes; `extras` carry each wing's key and role. The export option `compositions`: `'asDrawn'` (the default: the compositions whose rung is current or stored), `'derive'` (`compose()` run for every building of the export scope first, in the derivation pool, under V02 §6.4's export budget) or `'none'` (the massing only); V02 §5.7's damage and a disaster's look are not carried (J-V2.112): the roofs as the model holds them, a roofless building's none |
| **CityJSON 2.0** | LoD2.2 `RoofSurface` per roofscape facet, `WallSurface`s from the wing prisms, dormers and porches as their own surfaces when compositions are exported; tier 0 is the `Building`, each tier above and the shrine a `BuildingPart` (a terrace a `RoofSurface`, the walls from the part's own base), each stair a `BuildingInstallation` (an outer stair, stepped by `stairTreads`) with `plat:role 'stair'` (J-V2.77); attributes `plat:role` and `plat:key` in the `Plat` extension (the base's `plat.ext.json`); V02 §5.7's damage and a disaster's look not carried (J-V2.112) |
| **GeoJSON** | an optional `wings` layer (strict and metric variants): one Polygon per base wing with `key`, `role`, `floors`, `eaveCm`, `ridgeCm`, `roof`, `building`, `on`, `solid`, `baseCm`; the base's building features carry `onDeck`, `deck` and a stepped building's `tiers` (item 447), which the `wings` layer repeats none of |
| **VTT** | the ground scene's walls from the footprint (the base's); a tower's ring is part of the footprint's walls; a stair's outer sides are not walls; the storey scenes are the plan's (V03); walls, portals and line of sight follow the damage by §11.1's battle-map rule (item 123 (e)), and a disaster's look is drawn in the image only, never as a wall or an obstacle (item 122 (f)) |

An export of a scope with no building writes no `massing`, `composition`, roof or `wings` entry and is otherwise the
base's. The export's layer set, band and look (§11.1) govern stage 3's content exactly as they govern the base's
buildings; the `compositions` option is read identically by every format. A picture export (SVG, PNG, print) draws
V02 §5.7's damage and a disaster's look exactly as the view draws them at its band, week and key (item 122 (f)).

### 5.6 Stacks, stairs and deck buildings on the map

* **Bands.** City band: the footprint (tier 0 ∪ stair 0, and any ground wings added beside it) as a mass like any other.
  District band and finer: the roofscape with the stack's occlusion and order (V02 §5.2 steps 4 and 6) — terraces as flat
  facets with their parapet lines, pent skirts as their band facets meeting the wall of the tier above (V02 §5.2 step 3),
  the top's roof or the shrine's, each stair's shed facet painted by `stairFlight`; a sealed stack (`none`) draws no stair;
  chimneys only on exposed roof (V02 §3.7, V02 §5.2). An `ovalCourt` draws its façade ring's flat roofs with their parapet
  lines and its seating ring's shed facets falling toward the floor, which is drawn as a court (a yard part).
  Neighbourhood and building bands: V02 §5.1's, the plan per storeyed tier (V03).
* **`stairFlight`** (a paint program joining §8.2's list with item 406's): the stair's facet filled by the roofscape's tone
  rule (its slope lit by `faceLight` like any facet), with tread lines across the flight, perpendicular to its climb, by
  `stairTreads` (V02 §2.6): `n − 1` lines at `goingCm` intervals from the foot, in `ink` at cell `lineWeight` (⅓ of the
  building outline weight), stopping short of each side by cell `sideGapShare` (0.1) of the flight's width; below cell
  `minTreadPx` (2 px) of plan per tread the lines are omitted and the shaded facet reads as a ramp.
* **The surface layer and the shadows.** Each wing's facets enter §8.4's surface layer at their true heights (a terrace at
  its deck level, a stair's slope), so the light pass lights every terrace and step face; the casters are the wings' prisms
  from their own `baseCm` (V02 §3.15.3), kept current on every re-basing path by `rebaseStack` (V02 §3.15.2), so each tier's
  shadow falls on the terrace or the ground below it; under a Works, the stage heights of item 318.
* **The per-wing constructions** (the parity presets' sheets, and the base outline builder's drawing from M3a until the
  roofscape lands at M6a): a wing that stands on another is drawn after it, its ring clipping the lower wing's roof, and a
  stair's shed with its treads (item 419).
* **Labels and exports.** V02 §5.4's roles and V02 §5.5's rows cover stacks, stairs and deck buildings.

### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)

Two owner items reach the building's exterior, both looks: a building's floor plans show its ruin as a damage layer over
the same plan (item 123), and its exterior draws the same damage (item 123 (d)); a disaster's neighbourhoods look ruined
while it lasts (item 122 (b)). One reading, `exteriorDamage` (V02 §2.4), serves both. It changes no wing, `MassingRef`,
composition, stored plan, digest or hash, reads no model stream, and stores nothing.

**(1) The level.** A building's level is the higher of its **decay level** — V06's `decayLevel` for its lineage at
§2.9's `week`, 0 for a building never abandoned (item 123 (b)) — and the level of a **disaster look** over it: the
`disaster` row's `lookLevel` (§10.2; V11's values) at the condition's severity, linear between its two ends. A disaster
look lies over a building while the look is drawn in the view — its `ConditionOverlay` standing in the view's week by
§2.7's reader rule, its map row reading `disaster` (§7.7's DR44), admitted by the view's knowledge key (DR44's
admission; `ViewOpts.viewAs` lowering it, §9.2), and drawn by §2.9's `crises` in `follow` — or previewed: `crises` in
`preview` naming the `disaster` row, at §10.2's `previewSeverity`, with or without a dossier — while the building stands
in a unit the look strikes and has not handed over ((6); a preview never hands over, V06 §3.22 (3)). The units are every
district V01's `disasterDistricts` returns — for a preview, the districts it returns for the previewed look, keyed on
the look kind in the condition's stead (§10.2's placement; X35) — and at THORP, HAMLET and VILLAGE every end V07
returns; every building of a unit draws the look, with no second, per-building share (item 122 (b): whole
neighbourhoods). Nothing of the look is drawn from a stream of its own: its units are V01's and V07's (keyed by the
condition's id), its elements' thresholds the building's lineage's (§6.3), its rubble the building's render key's
(§8.10). Of two looks over one building the higher level is drawn, with that look's pattern ((4); ties: the lower
condition id). At level 0 — a building never abandoned, under no look — nothing of this section is drawn: the building
draws byte-identically to stage 3 without items 122 and 123 (T123-7's no-op).

**(2) The element reading — where the building's plan is in force.** Where the building's plan rung is current or stored
(V03; a stale cached plan is not read, its elements no longer sure to lie on the massing's facets), the exterior draws
exactly the damage the plan shows at the level. V03's damage layer gives each element its state — intact; damaged, by
§6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's `plan.damage`, V11's
ranges); or repaired, the level below its threshold and V06's per-element `decayPeak` (the highest level since the
element entered the plan, V06 §3.23 (3), read through V03 §5.6 (2) (b)) reaching it by the same comparison, its damage
having left through a restoration (item 123 (b): a `reoccupy` back into use, a repair), so an element added after its
building's damage left (a wing an `extend` adds, an element a re-cut makes) is drawn as built — and V02 reads two kinds
of element, never a threshold of its own:
* **A roof bay over a room** (the roof over a room of the storey directly under it). Damaged, it is a **hole**: the
  room's ring clipped to the facets of the room's own wing (a tower room's to its tower's; never another wing's),
  removed from those facets and from every dormer facet over it, and drawn as §8.2's `decayed` row draws a roofless
  building (no roof construction, the fill at the row's alpha); the roof's lines (V02 §5.2 step 5) stop at its edge,
  which is drawn in `ink` at the `roofscape` program's `hipWeight`. A wing whose every roof bay is damaged draws no roof
  facet over its rooms: the lost upper storey item 123 (c) gives a `ruined` building, seen from above. Repaired, its
  facets take §8.2's patched-courses roof `pattern` (the `condition` row's) over its ring, at the neighbourhood band and
  finer — item 114's patch material on a roof.
* **An outer wall run of a wing's lowest storey** (a wall run of the plan with the outside on one face, on the first
  storey `storeyRange` gives that wing; a solid wing has none). Broken, it is a **gap**: the outline the drawing gives
  that wall — the footprint outline for a wing on the ground, the eave line of a wing standing on another — is not drawn
  over the run's span, and at the neighbourhood band and finer §8.2's rubble spill (the wall `breached` row's dots,
  keyed by the building's render key, §8.10 — never a model stream) covers a strip along the span reaching the
  `roofscape` program's cell `rubbleReachM` (1.5 m; V02 §5.3) to each side of the outline (at least 1 px), the fallen
  wall's spill inside and out. Repaired, the run's outline is drawn whole (its patch material the plan's to show, V03).

Marks standing on a hole go with it: the cupola, `sails` and every roof decoration whose foot lies in a hole are not
drawn; a plan chimney stands (its stack is masonry; §8.6 draws it as before). The porch and a secondary porch are drawn
only while the outer run carrying their entrance stands. A wing roofed `none` (the decline's roofless state, a fire's
charred shell) has no facet to hole: the building draws its state row, the gaps cut from that row's outline, and the
plan's open ceilings are the roof it lacks — every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while
the building is `decayed` or `ruined` (§2.6 step 7) — which T-V2-59 (b) holds (X34). Where a building at the decay
Works' `decaying` stage draws its roof with gaps along the ridge, §8.2's row draws the element reading's holes in their
place (X37).

**(3) The massing reading — where no plan is in force.** No element is known, so nothing is drawn that a plan could
contradict. A building's own decay draws its state row alone (§8.2, as before). A building under a disaster look draws,
over its state row, its roof tone lerped toward `ground` as the `abandoned` row lerps it (30 %) and its outline dashed
as the `decaying` row dashes it — the dash the look's second cue (item 112). When the building's plan comes into force
(a building click; V03's `view` derivation), the element reading's holes and gaps join that tone and dash; because every
threshold is keyed by the lineage and the element's id (§6.3), they are the same whenever, and by whichever trigger, the
plan is derived (V02 §3.11: no rung is raised for them).

**(4) The disaster's kind.** The look draws the damage of (2) and (3) whatever the disaster. Its kind — V01's
`disasterSource(doc, overlay, key).pattern` (V01 §2.3, V01 §3.16 (2): the overlay's calamity's type through V06 §2.4's
calamity table; `scatter` with no calamity, a preview's included) — adds one flavour: a `fire` pattern blackens, the
massing reading's tone lerping toward `ink` instead of `ground` and every hole drawn in the `charred` program's tone; a
`flood` and a `scatter` (an earthquake, every other kind, a preview) draw the damage alone — an earthquake's fallen
wings, towers and open roofs and a flood's fallen walls and outbuildings are that damage, and a flood's stained lower
storeys lie under the roofs a map draws from above (J-V2.113). The look leaves no patch: an element only the look
damaged is drawn in its real state again from the week the look no longer stands (V06's `decayPeak` never reads a look).

**(5) At each band.** City band: nothing of this section — the masses are the model's, and a ruined quarter's tone is
§8.2's crisis rows'. District band: the tone and the dash, and the element reading's holes and gaps. Neighbourhood band
and finer: the rubble spill and the patches as well, the composition's dormers, porches and decorations as (2) says.
Building band: where a building's plan is drawn, the plan draws its own damage (V03; §8.6); every other building's
exterior as at the neighbourhood band.

**(6) The hand-over** (item 122 (a)). The look leaves a building where V06 hands it over: from the week V06's
`crisisLookYields(doc, building, overlay, week)` holds — a Works other than a `decay` Works begun on the building by
that week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) — the
building draws its Works' stage and its own state, so no week draws both the ruined look and the rebuild's scaffolding;
a `decay` Works never ends the look. A building no rebuild reaches keeps the look until its condition no longer stands.
A building the next epoch really ruins or abandons reads its own level from that epoch's week (V06's hazard and decline
phases), the look's level ruling only while it is the higher.

**(7) Exports.** A picture export — SVG, PNG, print — draws this section as the view draws it at its band, week and key
(item 122 (f)), from the damage marks of its transient list ((8)), the SVG carrying the holes in
`sem.building.roof.hole` and the rubble in `sem.building.rubble` (V02 §5.5); a battle map follows the damage by §11.1's
rule (item 123 (e)) and draws a disaster's look in its image only. The glTF, OBJ, CityJSON, GeoJSON and JSON exports
carry neither (J-V2.112).

**(8) Where it runs, and how it reaches the drawing.** `exteriorDamage` runs in the **generation worker**, where its
inputs live — the document, V06's levels over the lineage's lifecycle events, the plan in force in the elaboration cache
(§2.9), V01's `disasterSource` and V06's `crisisLookYields` — inside S14 (§8.1), for the buildings of each district
whose district, neighbourhood or building band S14 builds: a full build, a band request of the tiles entering the view
(§8.9), a picture export's transient list (§8.1 item 6), each at its drawn week, `crises` and effective knowledge key
(§2.9's keys, `ViewOpts.viewAs` lowering the key).
* **The damage marks.** Its result reaches the drawing as the building's damage marks, in its district's group (§8.1's
  `group`) of the display list or of a `DisplayDelta` (§8.9's generation → tile worker rows), each carrying the
  building's `entity`, its render key in `key` (the rubble's, §8.10), its `knownTo`, and one `revision`: a 32-bit hash
  of the building's leaf-digest revision, the plan's hash, its damaged and repaired element ids in plan order and its
  look's pattern (none without a look). A building under a disaster look has one `building.look` mark — kind `outline`,
  its footprint's outline; `building.look.fire` under a `fire` pattern — by which the drawing gives its roof the look's
  tone and its outline the dash ((3)) and, for a fire, its holes the charred tone ((4)). At the element reading each
  hole ring is an `area` mark `building.roof.hole`, each patched ring an `area` mark `building.roof.patch` and each gap
  span a `ribbon` mark `building.wall.gap` (its two points on its wing's outline), each naming its wing's key (a
  tower's) in its `wing` attribute column (§8.1's `attrs`), matched to the roofscape's `RoofFacet.wing`; their `lodMask`
  the district band and finer, the patches' the neighbourhood band and finer. The reading is their presence, and the
  level stays in the generation worker: every drawn form is decided there, so the tile worker reads none. A building
  with nothing of this section to draw — never abandoned and under no look, or at the massing reading under no look,
  where its state row draws its own decay — has no damage mark.
* **When it is sent again.** The generation worker keeps each building's last `revision` (4 B a building with damage
  marks) and re-emits, as a `DisplayDelta` over the districts whose bands the tile worker holds, exactly the buildings
  whose `revision` changes, removing the marks of a building left with none: when the drawn week moves — beside §8.1
  item 7's Works re-emission — testing the buildings with a plan in force whose level or peak is above 0 at either week
  and the buildings of the units of the looks standing in either week, a level that moves without crossing a threshold
  of its plan re-emitting nothing; when `crises` or the effective knowledge key changes (Show crises, a preview's start
  or end, View as), the buildings of the looks' units before and after; when a building's plan enters force (a building
  click, V03's `view` derivation answering a band request) or leaves it (evicted from the elaboration cache, or stale),
  that building; and after a commit — an edit, an epoch, an undo or redo, a regenerate, a dossier change applied — in
  §8.1 item 4's delta, the changed buildings and every building whose level, look units or hand-over the commit moves.
  Each delta's dirty boxes (§8.1 item 4) invalidate the cached tiles they meet.
* **In the tile worker.** The rasteriser clips each hole and patched ring against the facets of its wing in the
  roofscape it memoises (V02 §6.3), keeping the clipped rings beside it under the marks' `revision` (V02 §6.6), cuts the
  outline at each gap span and draws (2)–(5) by §5.3's `roofscape` program and the building's outline, which read the
  damage marks while they draw their building — no sheet entry paints a damage mark on its own, so none takes a slot
  (§8.2's slot resolution). A tile holding a damage mark is keyed by the drawn week, and one holding a `building.look`
  mark by `crises` and the effective knowledge key as well (§8.8's tile key; X37). The SVG writer draws the same marks
  from its transient list in the generation worker, clipping against the roofscape it derives there (V02 §5.2); a raster
  export's list carries them to the tile worker with its request.

## 6 Performance budgets

Every number here is **PLAUSIBLE** (an estimate from operation counts on §12.1's reference machine) until the
measurements named below; each has its pre-decided fallback. The building counts per rung are §1.1's; the mix is §2.6's
cost note's assumed core mix (row quads, single ranges, tiled multi-wing massings, massings with towers).

**Targets and the comfort level (item 119; §12.1).** The lines of V02 §6.1 – V02 §6.6 are the **targets**, which the build
works to meet and beat. Every one-time wait stage 3 adds to or lengthens completes within the **ten-second comfort level**
of total time, from the click to the complete result on the reference machine, at every rung up to the population cap:
the massing's share of a generate, a regenerate, an open from SettlementForge or a dossier change applied (V02 §6.1's
table: ≈ 72 ms of wall time at the cap); an export under every `compositions` option, its `derive` pass included
(V02 §6.4); an `upgrade` that re-derives S11 for a document from before stage 3, whose massing costs V02 §6.1's rates; and
the load's stage-3 migration rows (V02 §2.5: O(wings) a building, ≈ 1 µs, ≤ 40 ms at the cap). An epoch's stage-3 work (the
mutator's wing step, V02 §6.4, and S11's re-fits) counts inside advance time and the history replay, whose reading of the
comfort level is V06 §6's. A wait past about one second shows progress (§12.1's progress rule: §11.2's `Progress` per stage
or export band, shown by V09 §4.21.9; R12-32). A stage-3 step runs slower than its target only for a recorded measured
gain inside the comfort level — its V11 §3.25.8 `perf.qualitySpend` row (§12.1; R12-33); none is planned, and where no row
stands the fallbacks below are taken. The **interaction budgets keep their values** (item 119 (d); R12-34): a `setMassing`
dry run and commit ≤ 2 ms and a `setComposition` ≤ 1 ms (V02 §6.4), a neighbourhood click's batches streamed centre-out
within ≤ 120 ms of pool time and the `view` tiles' batches of `viewBatchMs` (V02 §6.2). A size the low tier cannot reach
within ten seconds is declared per device (§12.1). T-V2-22 and T-V2-24 hold the comfort level at every rung to the cap.

### 6.1 The massing (eager, on the first map's path)

| building kind | massing cost per building (median; PLAUSIBLE) | basis |
|---|---|---|
| row (pass-through, heights, roof, a back range where drawn) | 1–3 µs | one frame, one rect, M11–M13 on ≤ 2 wings |
| single range | 3–6 µs | frame, `lir`, one slab, snap and checks |
| tiled families (`L`, `T`, `H`, `U`, `cross`, `rectCourt`, `gridWalk`), blocks included | 15–40 µs | ≤ 8 slabs, the pairing check (§2.6 rule 4 (ii)), ≤ 4 block trials |
| `plotRing` and the fantasy families | 30–60 µs | simplification, line offsets, mitres, angle checks |
| with towers or a turret | + 20–60 µs | per trial: a ring (≤ 24 vertices), its overlap share by the kernel's boolean on the arrangement, the seed-contract distances |
| an F-MASSING attempt | × (1 + attempts) | ≤ 3 attempts of the drawn family, then one per other family |

**Bars (the stage-3 intake, item 223):** town-wide median ≤ **10 µs** per building (the base's admission bound; the
estimate ≈ 3 µs, rows dominating); for the composed classes (every building whose family is not `row`, `single`,
`shelter` or `baseOutline`) median ≤ **60 µs** and p99 ≤ **250 µs**; mean over all buildings ≤ **12 µs**. S11's §12.4
row is re-declared by the measured difference (the estimate: mean + 6 µs per building).

| rung | added massing CPU | added first-map wall time (3 pool workers) | share of §12.5's first map |
|---|---|---|---|
| TOWN | ≈ 9 ms | ≈ 3 ms (≈ 9 ms single-threaded) | ≈ 2–6 % |
| CITY | ≈ 36 ms | ≈ 12 ms | ≈ 3 % |
| METROPOLIS | ≈ 90 ms | ≈ 30 ms | ≈ 3 % |
| the population cap | ≈ 216 ms | ≈ 72 ms | ≈ 3 % |

**Measurement** (M6a; T-V2-22): the massing timed per class on B-CITY's TOWN, CITY and METROPOLIS seeds, 20 runs, and the
first-map time re-measured. **Pre-decided fallbacks, in order, each a declared shift (§13.3):** (a) M8's candidate trials
capped at 6 per building and M14's rung 0 at one attempt for the composed classes; (b) towers and turrets off in the
massing (the families kept; the rows' tower cells read 0), re-measured; (c) the rest of §2.6's stage-3 intake fallback: the
generator's massing step alone (its wings without roofs or rooms), then the base outline builder making the outline with
`compose()` working inside it (the composer then adding only dormer rows and the porch), reported as "stage-3 massing
withdrawn at this rung" (§12.10's R12-22).

### 6.2 The composer, the rooms rung and the roofscape (lazy)

| work | budget | estimate | when |
|---|---|---|---|
| `compose(…, 'wings')` per building | median ≤ **0.2 ms**, p95 ≤ 0.6 ms (inside §12.7's per-building bound) | 20–150 µs: `facadeBays` per eave against the wings it meets, ≤ 2 rows per wing, one porch ray on the plot's rings, ≤ 10 draws | a neighbourhood click, a building click, a `view` tile request |
| `facadeBays` on every side (the lit windows before a plan), `stairTreads`, `cryptSeedWings` | ≤ 10 µs per wing for every side; ≤ 2 µs per call for the other two | a side's run against ≤ 16 meeting rings in integer arithmetic; one ceiling and one floor division; one pass over ≤ 16 wings | §8.4's lit windows at a night view; the drawing and exports of stairs; §2.6's basement function |
| a neighbourhood click | §12.7's pool time per tile, amortised; the whole neighbourhood within ≤ 120 ms of pool time, streamed centre-out | ≈ 0.1 ms per building (≈ 45 ms at §12.6's district ceiling) | II.4's click |
| `compose(…, 'rooms')` per building | ≤ 0.3 ms median | ≤ 4 rectangles and one ring difference per tower storey | with the plan, on the building click |
| `roofscape` per building | ≤ 25 µs median, ≤ 150 µs p99 (a large manor) | end classes O(wings²) with wings ≤ 16, facets, float64 occlusion clips | the tile worker, per building per (leaf digest, composition hash, construction), memoised as the base's derived-roof cache (§8.1 item 5) |
| a district-band tile's roofscape | ≤ 8 ms of tile-worker raster time for ≤ 400 buildings | 400 × 20 µs | inside §8.8's per-tile raster budget |
| `compose()` under `elaborate: 'view'` per tile | only tiles **at the neighbourhood band and finer** request the `wings` rung (the district band draws the massing's roofscape and requests nothing); p95 buildings per neighbourhood-band tile at the METROPOLIS core ≤ 60 → ≈ 12 ms at 0.2 ms each, inside §12.7's per-tile pool time | ≤ 60 × 0.2 ms (measured at M6b on B-CITY METROPOLIS) | a pan under `view` |

**Measurement** (M6b): on B-CITY METROPOLIS, compose per building by class, 50 neighbourhood clicks, 200 district-band
tiles, and the buildings per neighbourhood-band tile at the core (p95). **Fallbacks:** a tile's `view` request over its
pool time is sliced into batches of at most `viewBatchMs` streamed centre-out, the tile drawing the massing's roofscape
until each batch lands, reported (J-V2.53); a compose median over 0.2 ms: the porch's space test runs on the plot's ring
only (the other footprints ignored, the porch then clipped at draw); still over §12.7's bound: the dormer rows drop to one
per wing (the street eave), reported. A roofscape over budget per tile: the valley extensions are drawn without the
occlusion clip (the abutting wing's valley triangles overpainted in order), a declared view shift.

### 6.3 Memory

* **Model:** per building ≈ 36 B for roles, keys, `nextWingKey` and `MassingRef` (with `segments`, `low` and `cupola`),
  and ≈ 50 B for the extra wings the composed massings carry (about 1.8 wings per building instead of about 1.3) — ≈ 1.2 MB
  at the METROPOLIS target, counted in §12.8's model line and re-declared at the intake.
* **The elaboration cache:** a `wings`-rung chunk ≤ **1 KB** per building at p99 (§12.8's line) — composed wings and
  towers are key references (2 B each), dormer rows 8 B each, the porch 12 B; the `rooms` rung's rings count in the plan's
  per-storey line (§12.8; a tower room's ring encoded as its tower's index and storey, derived at decode). Measured at M6b
  on B-PLAN's fixtures and B-CITY; fallback: the base's (the cap halves).
* **The roofscape memo:** ≤ 2 KB per building in the tile worker's session memo, LRU-capped at 8 MB per worker, evicting
  to recomputation.
* **The damage marks** (V02 §5.7 (8)): held in the tile worker's display list while drawn — ≈ 0.2 KB a building under a
  disaster look at the massing reading, ≈ 2 KB a damaged house at the element reading, ≤ 20 KB a fully ruined large
  manor (V02 §6.6) — and their `wing` attribute column, 4 B a mark of each district-, neighbourhood- or building-band
  table carrying one; counted in §12.8's display-list line and re-declared at the intake. The generation worker keeps
  4 B a building with damage marks (their `revision`).

### 6.4 Edits and exports

* `setMassing` dry run and commit: ≤ 2 ms per edit (one plot's S11 re-fit, the checks, the carry); `setComposition`
  ≤ 1 ms; the mutator's wing step ≤ 150 µs per building plus S11's re-fit — inside §12.6's per-edit laws, which count them.
  These edit lines are interaction budgets, which item 119 leaves as they are (item 119 (d)).

**Exports** — one-time waits (item 119 (a)): glTF, OBJ and CityJSON, written in the generation worker, timed from the click
to the file at every rung; the line is CityJSON's, the slowest format's (glTF and OBJ about a quarter less):

| rung (buildings, §1.1) | `'asDrawn'`: estimate → target | `'derive'`: estimate → target |
|---|---|---|
| TOWN (≈ 1 500) | ≈ 0.2 s → ≤ 0.5 s | ≈ 0.3 s → ≤ 0.6 s |
| CITY (≈ 6 000) | ≈ 0.8 s → ≤ 1.2 s | ≈ 1.1 s → ≤ 1.6 s |
| METROPOLIS (≈ 15 000) | ≈ 1.9 s → ≤ 3 s | ≈ 2.6 s → ≤ 4 s |
| the population cap (≈ 36 000) | ≈ 4.5 s → ≤ 6 s | ≈ 6.3 s → ≤ 8 s |

The estimate per building: ≈ 35 µs for the roofscape's facets (V02 §6.2's ≤ 25 µs median with its ≤ 150 µs p99
tail); ≈ 55 µs (glTF, OBJ) to ≈ 90 µs
(CityJSON) for the wing prisms, roofs and stairs as meshes or surfaces and their encoding (roofs ≈ 8–60 triangles a
building, ≈ 0.4 M triangles at METROPOLIS); `derive` adds `compose()` for each building whose `wings` rung is neither
current nor stored — ≈ 0.1 ms of pool time shared by the three pool workers district by district while the generation
worker writes, ≈ 35 µs of wall time a building — and its dormer and porch meshes, ≈ 15 µs. The village rungs fall below
TOWN's line; a district-band SVG ≤ 1.5 KB per building. Past one second the dialog shows the export's progress band by
band (§11.2's `Progress`; R12-32). **Measured** at M6b at every rung's top and at the population cap (T-V2-24).
**Pre-decided fallbacks, in order:** (a) the roofscape's facets, like `derive`'s compositions, computed on the three pool
workers district by district while the generation worker writes the district before (the same bytes); (b) where the
measurement still cannot hold a format under a `compositions` option within ten seconds at a size, the export dialog
offers it only up to the largest building count the measurement held — above it a `derive` export writes `asDrawn` and a
format that still misses is not offered — naming why in one line (§12.7's print-size rule: a wait past the comfort level
is never offered).

### 6.5 Stacks and deck buildings

| work | budget | estimate (PLAUSIBLE) |
|---|---|---|
| the massing of a `stepped` building (`massStepped`: ST0–ST8, at most three attempts) | ≤ 120 µs p99, inside the composed classes' ≤ 250 µs p99 (V02 §6.1) | ≤ 9 tiers × (an inset, a stair, the containment and the sibling-disjointness tests) ≈ 20–60 µs, plus §2.6 rule 4 (iii)'s union check over ≤ 20 wings ≈ 20–40 µs; a second or third attempt only on a `TierFailure` |
| the massing of an `ovalCourt` (`massOval`) | ≤ 150 µs p99 | two line-offset passes over ≤ 20 edges (as `plotRing`), ≤ 40 quads, the pairing check ≈ 40–90 µs; at most one or two arenas per city |
| `rebaseStack` on a terrain stroke, a warp step or a crypt lift | ≤ 20 µs per stepped building | O(wings) samples and one pass in stack order; counted inside §12.6's per-stroke law with the base's per-entity re-basing |
| how many | stepped buildings are landmarks: ≤ 0.1 % of buildings at every rung (V11's caps, X17), so V02 §6.1's town-wide median and mean do not move | — |
| a deck building's massing | a single range's (V02 §6.1) | — |
| the roofscape of a stepped building | ≤ 60 µs | facets on ≤ 20 wings with the stacked occlusion |
| a `tiers` edit or a tier's height edit | ≤ 2 ms (V02 §6.4's `setMassing` line) | one anchored `layTiers`, the re-base and the re-lay |
| the carry check of a stepped building inside a warp (item 333) | ≤ 40 µs per building per halving, counted like V02 §8.4 R5's towered buildings | the union and the containment tests |

**Measurement** at M6a on B-MASS's stepped and deck sub-fixtures (T-V2-22's harness), and at M3a for the base outline
builder's lay. **Fallbacks, in order:** ST6's containment tests run on the rings' bounding boxes first and the exact test
only on an overlap (a pure speed-up, no output change); then tiers above seven truncated at ST3 (a declared shift, §13.3).

### 6.6 Ruin and disaster on the exterior (items 123 (d), 122)

| work | budget | estimate (PLAUSIBLE) |
|---|---|---|
| `exteriorDamage` at level 0 (the generation worker) | ≤ 1 µs per building of a band S14 builds | V06's `decayLevel` read (its cost V06's) and the look test against the units of the looks drawn in the view, listed once per look and week — no mark |
| a building's damage marks (the generation worker) | ≤ 1 µs under a look at the massing reading; ≤ 5 µs median, ≤ 30 µs p99 (a large manor fully ruined) at the element reading | the look mark; the plan's ≤ 60 roof bays and ≤ 80 outer runs compared with the level and the peak (§6.3's thresholds), their rings and spans packed into ≤ 141 marks — ≈ 0.2 KB delivered for a building under a look at the massing reading, ≈ 2 KB for a damaged house, ≤ 20 KB for a fully ruined large manor |
| a week step's re-emission test (the generation worker) | ≤ 1 µs per tested building, ≤ 3 µs with a plan in force | the level at both weeks against its plan's thresholds, its look's standing and hand-over at both (V02 §5.7 (8)) |
| the massing reading of a damaged building (the tile worker) | ≤ 2 µs over its roofscape | one tone lerp per facet and the outline's dash |
| the element reading of a damaged building (the tile worker) | ≤ 30 µs median, ≤ 200 µs p99 (a large manor fully ruined) over its roofscape | each hole and patched ring clipped against the ≤ 8 facets of its wing (float64, the renderer's CPU reference); the outline cut at each gap; the rubble spill per pixel cell |
| a neighbourhood-band tile in a disaster's district at the METROPOLIS core | ≤ 2 ms of tile-worker raster time over the tile's roofscape | ≤ 60 buildings (V02 §6.2) × 30 µs where every plan is in force; × 2 µs where none is |
| the memo (the tile worker) | ≤ 1 KB per damaged building, inside the roofscape memo's 8 MB LRU cap (V02 §6.3) | the clipped holes and patches, keyed by the marks' `revision` (the leaf digest, the plan's hash, the damaged and repaired element ids, the look's pattern) |

Drawn lazily per visible tile inside §12.5's frame budget — the crisis looks' lazy per-tile line — an interaction budget
item 119 (d) leaves as it is; nothing is derived for it (V02 §3.11), so it adds no one-time wait; its generation-worker
share rides the band builds and V02 §5.7 (8)'s re-emissions, O(changed buildings). **Measured** at M6b on B-CITY
METROPOLIS with the damage sub-fixture and the look fixture of V02 §7.8, plans derived on the core's buildings, across a
week scrub through the look's weeks and a Show crises toggle. **Fallbacks, in order:** (a) each hole's clip run first on
its bounding box and exactly only on an overlap (no output change); (b) on a tile still over its share, the rubble spill
left out at the neighbourhood band, the gaps kept — a declared view shift, reported; (c) a week step over its line: the
test reads only the two thresholds of the building's plan round its kept level, kept beside its `revision` (8 B more a
building; no output change).

## 7 Tests and acceptance bars

The families (C, P, O), the fixture and CI-tier naming (§13.8) and the pointer row in §13.2 (item 522) are §13's; the test
ids here are T-V2-n.

### 7.1 Fixtures

* **B-MASS** (new, in `plat/bench/`): 60 synthetic plots — rectangles from 8 × 12 m to 60 × 80 m at aspects 0.3–3,
  irregular quadrilaterals, wedges and corner plots, L-shaped plots, curved and bent frontages, narrow row frontages of
  4–6 m, slopes of 0–15 %, a plot carrying a passage — each with its slot hint from S11, crossed with every template
  family, class override and structure role of V02 §3.10 at the four anchors (≈ 6 000 buildings), under the default
  preset, `fantasyShapes` on and off, and the `FM` preset, **against the compiled V11 templates** (V11 C1–C3b). Named
  sub-fixtures: **gable-fronted rows with back ranges** (row quads of 4–6 m frontage, `ridgeAxis 1`); an **arid town**
  (`ClimateRow.roof.form` `flat`); **cathedrals** on `dry`, `low`, `damp` and `flood` plots; a **longhouse
  (`v.longhouse`) on a 6 % slope**; a **watermill** on a plot abutting a river; a **flat northern site** (latitude 50°) of
  200 identical L, T, U and `towerHouse` slots; a **landmark custom** `mercantile-guildhall` and the same class unmarked; a
  **butcher split** into a slaughterhouse and a stall; **`brewer → brewery`** and **`town granary → city granaries`**; a
  **market hall**, a **kiln yard**, a **church with a transept** and a **rich hall** of family `cross`; the **butt-joint
  sub-fixture** (every roof kind of the abutted wing; T-V2-54); the **edge sub-fixture** (one fixture per row of V02 §3.18
  (e); T-V2-56); the **combination sub-fixture** (V02 §3.18 (f)'s rows no other bar holds; T-V2-57); the **ceiling sub-fixture**
  (every `housing` class's row and every `v.` housing class's at the rich anchor, on plots wide enough for every family,
  under the THORP, HAMLET, VILLAGE and TOWN ceiling rows, with a `v.manor_house` dossier record at HAMLET and an
  assignment drift naming only `H`; T-V2-58); and V02 §7.7's and V02 §7.8's.
* **B-PLAN** (the base's 24 fixture buildings, §13.2) with, from stage 3's landing, each fixture's composition (and its
  stored form) — the plan rung's intake runs on them (V03).
* **B-CITY-lite** and **B-CITY** (§13.2) at every rung; **B-VILLAGE** (V07) at the village rungs; **B-EDIT** sequences
  (§13.2) with the two new event kinds added to the generator's alphabet.
* **The free-frame harness** (`plat/bench/fm-parity/`): a square slot hint of side `6w` (w = 8 m) with one access side,
  no neighbours, the building's class `manor` at the `rich` row under the `FM` preset — the Fantasy Manor comparison
  setting (the reference has no plot, `research/findings/manor.md` §3.3, CONFIRMED).

### 7.2 Conformance (C) — hard bars, 100 % unless stated

* **T-V2-1 containment** — every wing inside its slot hint and its plot, never over a way corridor or another slot, the
  gable-fronted rows' back ranges included (each behind its quad's rear chain, never across a party wall) (B-MASS,
  B-CITY every rung; PR tier on B-MASS, nightly on B-CITY).
* **T-V2-2 the stage-3 contract** — the union of the composed wings and the composed towers' rings equals the footprint
  face (integer equality); each composed wing reaches exactly its base wing's storeys; the non-tower ground wings tile (the
  pairing holds; a wing with `on` by T-V2-44) (B-MASS, B-PLAN).
* **T-V2-3 towers** — each tower's overlap share in `[0.2, 0.6]` (a turret's in `[0.25, 0.75]`); no centre deeper than
  `0.35 r` in a wing; no tower–tower or tower–block overlap. A tower standing on its block (M8 (d)) or over a template's
  crossing (M8 (e)) is exempt from the share and depth tests and lies inside its container's ring inset by
  `towerOnBlockInsetM`. Every tower's eave at or above every roof inside its ring.
* **T-V2-4 the main door** — exactly one main entrance per building, on a side facing its access edge (§5.3's row), on
  every composed family (Fantasy Manor: 37 of 41 measured buildings have an entrance, `captures/manor/README-frequencies.md`
  §4 — ours is "beyond", O).
* **T-V2-5 the seed contract** — every tower vertex and wing side at least `attractCm` apart except at shared joints; the
  plan rung's transient arena accepts every stage-3 composition of B-PLAN and of every clicked B-CITY-lite building with
  0 `E_DEGENERATE` naming a composer's ring.
* **T-V2-6 keys and roles** — keys unique within a building and never re-used across a 10³-event B-EDIT sequence;
  `nextWingKey` never decreases; every wing has a role; the wings always in the canonical order (V02 §2.1); a document
  without stage-3 fields loads by the fallback migration row (V02 §2.5) with keys = indices and the base builder's roles.
* **T-V2-7 heights** — floors ≥ 1 (a `solid` wing 0, T-V2-44); the mitre-joined ranges of one path share floors; a
  spanning wing ≥ 2 floors; eave and ridge equal M11's formulas to the centimetre from V11's `HeightsRow`
  (`storeyCm.ground`, `storeyCm.upper`) and the one pitch rule (`roofPitch × ClimateRow.roof.pitch ÷ pitchRef`, clamped); a
  `shed` roof has `high`; `Heights.towerCm` the highest tower ridge above `baseCm` and absent without a tower. **Arid
  fixture:** every range, block and back range `flat` with its family's parapet, no dormer. **Cathedral fixture:** two west
  towers of the cathedral `HeightsRow`'s `towerStoreys` at its `towerStoreyCm` (V11 §3.6.4), each with a spire of rise
  `spireFactor × (eaveCm − baseCm)`; a church's single west tower at the church row's `towerStoreys` and `towerStoreyCm`.
* **T-V2-8 courts** — every footprint hole is a yard part of kind `court`; each court is entered through a door or the
  gate hall's arch at the plan rung (B-PLAN's closed-family fixtures).
* **T-V2-9 the roofscape tiles** — facets pairwise disjoint in their interiors; their union equals footprint ∪ porch rings,
  less the wings roofed `none`, to 0.5 % of the area; every facet planar to 1 cm; `dome` (a template part's), `plain` (the
  F-SKELETON downgrade) and `none` (a ruined building) each exercised; the cupola's facets excluded from the union (B-MASS,
  all constructions).
* **T-V2-10 joints** — every end classed by V02 §5.2's order; every valley's lines meet at the ridge extension within
  1 cm; no facet crosses a tower ring.
* **T-V2-11 dormers** — inside their host facets, clear of valleys, hips and towers; count ≤ the eave's bays; positions
  symmetric by V02 §3.7; an edited row unchanged by a re-derivation while its eave's length stays within ± 10 %.
* **T-V2-12 the porch** — inside the plot, clear of ways, other footprints **and the building's own other wings**, at the
  main entrance's side and offset, its width within the free part of that side less 0.6 m; a flush front's porch only
  `recessed` or none; also run on the terraced-palace fixture (a storeyed tier 0 with `flights`, stair 0 at its face's left
  end).
* **T-V2-13 determinism** — the same building state gives byte-identical massing and composition on Node 24, Chromium,
  Firefox and WebKit and with a pool of 0–3 workers; the derived-complete digest over click orders (§6.5 (9)) holds with
  stage 3 registered.
* **T-V2-14 rung isolation** — `regenerate` with `rung: 'wings'` changes dormer rows and the porch only (the building's
  leaf digest unchanged); `'rooms'` changes the composer's rooms only.
* **T-V2-15 mutation keeps what fits** — house → inn, inn → house, single → H, `rectCourt` → `L`, workshop → smithy, and a
  front's change (item 63): every kept wing byte-identical (its leaf digest), its dormer rows identical after the next
  click; the inverse restores the building's leaf digest exactly (item 18 (e); extends T18-1 – T18-4).
* **T-V2-16 the growth lattice** — every ordered pair of families of `MassingGrowthRow` on 50 B-MASS plots gives a valid
  massing or a reported fallback, never an exception; for every reachable pair of V02 §3.9's table the kept `main` wing is
  byte-identical after the lay (its leaf digest), and a pair outside the ± 15 % side rule is never drawn.
* **T-V2-17 the F-MASSING ladder** — fixtures that force each rung 0–3 (a 3.5 m wide hint reaches rung 3) take it, and the
  report counts it.
* **T-V2-18 F-COMPOSE** — the identity composition satisfies the contract on every fixture; on B-CITY the identity rate is
  ≤ 0.1 % of composed buildings (a higher rate is a composer bug, filed).
* **T-V2-19 edit locality** — every `setMassing` op on 200 B-MASS buildings, `moveTower { shape }` included: nothing
  outside the plot changes except the re-homed households' buildings and a spanned passage (the oracle, §7.3 item 7); each
  bent op names its bend; **no op is refused but by a lock** (item 101 R2): removing the last wing removes the building in
  one event; a row quad's reshape along the frontage moves the party-wall line (the neighbour's quad re-clipped, both in
  one event), its depth re-cuts the rear chain; removing a row quad that is not the last wing leaves a gap with the
  neighbours' ends reclassed as gables; a wing below 4 m² is grown; an op beyond the plot is clipped with `join` offered;
  an unreachable `family` bends to the nearest reachable one; a gate hall with no `gate` range becomes a gate passage; a
  hall or chapel with no admitting host goes to its fallback host (`bend.room.host`); undo and redo exact, restoring the
  building's (and the neighbour's) leaf digest.
* **T-V2-20 stored compositions** — the first `setComposition` stores the composition; §2.6's carry test (warps and vertex
  moves) passes with stored compositions of every family, towers included, and with the `room` and secondary-`porch` ops
  applied; an edited room survives a `rooms` re-derivation while its host keeps its key; undo removes what the first
  event stored; an orphaned dormer row, room or porch appears in §7.3's orphan table with re-attach and discard.
* **T-V2-21 staleness** — a massing change marks `wings` stale and the change marker appears; the next click re-derives;
  unchanged wings keep their dormer rows; a stored composition is re-matched inside the event, never stale; **a relet, a
  use change, an access, a Works stage and a material change each leave the `wings` rung `current` and draw no marker**;
  an occupants' band change marks the `rooms` rung stale and not `wings`.
* **T-V2-25 materials** — a material `setAttr` leaves every massing and composition byte unchanged (item 19; extends
  T19-3).
* **T-V2-26 the parity presets** — under `MFCG` and `FTG` every footprint is byte-identical to a build with
  `massing.composed` off (extends T23-1).
* **T-V2-27 capacity** — fewer than 1 % of residential buildings have their households clamped below the template's
  `households.built` by the massing's area and storeys (§2.6's capacity), reported by class otherwise.
* **T-V2-28 shelters and the underground** — every cluster structure is one wing with its kind's roof; every underground
  building (its row key suffixed `@underground`) a single range with a `flat` roof.
* **T-V2-33 totality of the composition key** (PR tier, on the compiled roster — V11 C1–C3b's 35 template families; the
  `burial-ground` exemption of V02 §3.10.7 included): every class of the compiled roster (the town and city classes, the
  `generic-<family>` classes, the custom archetypes' classes and V07's `v.` village classes, V07 §2.4) at every band, and
  every structure name of every compiled template, resolves by V02 §3.2's chain to a row above `default.*` (except the
  no-building classes of V02 §3.10.7), and every resolved row satisfies the arrangement law; the load checks of V02
  §3.10.7 pass; `arrangementSkip` is 0 on the shipped tables.
* **T-V2-34 wings by key** — on B-PLAN buildings with a stored plan, add and remove a range, a tower and a block in every
  order: every stored entrance, room, stair core and chimney keeps its wing (item 225), the wings stay in the canonical
  order, and undo restores the building's bytes.
* **T-V2-35 rooms follow the occupants** (at M6b, the composer's clauses) — a rich-band manor whose occupants' band is set
  to `poor` has no hall and no chapel ring, and returning to `rich` restores the as-built rooms exactly (the canonical
  chain); the gate hall and the tower rooms stay at every band; before V03's programme rows are loaded every hall lies in
  `[1.4w, length − 2 m]` and is reported `hallUnclamped`. **From M6-P's P1** (the programme rows loaded) every hall's area
  lies in its programme's `hall` row × the ladder's `sizeFactor`. The clause that the poor manor's plan houses at least
  three units in its main range is V03's (T-V3-25's manor clause).
* **T-V2-36 crypts** (from M6-U, V02 §8.1) — cathedral fixtures on `damp` and `flood` plots each carry a crypt in the
  `raised` form, the ground wings over the basement's ring lifted so their ground storey clears it by `crypt.clearCm`, and
  on `low` a half-sunk one with the wings over it raised by `cellar.depthCm ÷ 2` (item 226's half raise); after
  `setMassing` removes the east range, the crypt persists under the remaining wings (re-seeded by §2.6's rule), and the
  undo restores the former basement, crypt and wings byte for byte; a church mutated to a warehouse loses its crypt
  through the closure, reported; **a stepped great temple on a `flood` plot** (solid tier 0 of at least `crypt.clearCm +
  100 cm`) holds its raised crypt inside tier 0 with no lift, stair 0's grade unchanged, and one with a low tier 0 takes
  the lift with every stacked wing following through `rebaseStack`; no V02 path sources, moves or shrinks a catacomb (no
  V02 writer touches a catacomb record); a wing W6 adds over a sealed void draws once on its V04 key, and a `setMassing`
  op draws none; a stepped great temple with a storeyed ground annex on a `flood` plot takes the ground wings' whole inset
  in the `raised` form (V03 §3.7.4): the annex's ground storey clears it by `crypt.clearCm`, tier 0 inside or lifted as
  above, the annex's core reaching the basement; an author's crypt ring under a nave on a `low` plot raises the nave.
* **T-V2-37 the sunlit choice** — on the flat northern fixture (latitude 50°): the `L`'s arm, the `T`'s cross-wing, the
  `U`'s opening and the `towerHouse`'s corner take the option whose open vector faces south in 70 % ± 5 of 200 slots at
  `sunBias` 0.7, and 50 % ± 5 at 0.5 (the no-op pin: byte-identical draws to the unbiased coin); orientation by the
  frontage unchanged in every case; and the compiled `sunBias` resolves to 0.5 under each of `MFCG`, `FTG`, `VG` and `FM`
  — never the zeroing's 0.
* **T-V2-38 custom scale** — the landmark custom `mercantile-guildhall` composes at least one band richer (its row cells
  and M10's budget at a value ≥ one band width above) than the same class unmarked; a significance below the class's never
  shrinks a building; a `ruined-landmark` building is massed by its class's row and drawn roofless.
* **T-V2-39 split sites** — the butcher split composes the stall by `split.shop` and the slaughterhouse by `split.works`;
  a merge-back is one event whose undo restores both buildings byte for byte.
* **T-V2-40 ladders** — `brewer → brewery` keeps the brewer's quad byte-identical as the compound's frontage slot;
  `town granary → city granaries` yields one compound with at least three store buildings; the demotion restores the
  as-built bytes; COUNT members are buildings of the lesser class.
* **T-V2-41 orientation laws** — the longhouse on a 6 % slope lies within 10° of the fall line with `MassingRef.low` on its
  downhill end; the watermill's wheel wing lies on its water side, its outer side within 0.5 m of the plot's water edge;
  below `axisSlope`, or with no water in reach, the frontage frame.
* **T-V2-42 landmark and institution forms** — the cathedral has two west towers at its west corners and, where its
  template has a crossing, a crossing tower contained in it with probability per its row; the market hall's main range
  carries `arcade` (drawn dashed, exported open, outside the capacity's ground storey); the kiln yard's kiln is a round
  one-storey `towerHouse` with a cone; the rich hall's `cross` plan lays three wings with the main running through; a
  cupola sits at its range's ridge midpoint, never in `Heights`. **The arena** (B-MASS's arena sub-fixture and the second
  known-city fixture's arena): a closed `ovalCourt` of two rings sharing their vertices, the aspect of its hull's minimal
  bounding rectangle in [1.15, 1.4], its inner ring `solid` except the two gate passages at the major-axis ends, its court
  (the floor) one `court` yard part from M3a (item 303's hole sentence) and at least `courtMinM` across its least width
  and at least 10 % of the hull's area (the historical amphitheatres' 13–20 %; J-V2.84), the façade `arcade` where the row
  sets it; `massOval` from M3a and M5 from M6a byte-identical (T-V2-46's rule).
* **T-V2-43 why** — on untouched B-MASS buildings the `WhyProvider`'s family, row, alternatives and rejected tower
  candidates equal the massing's recorded draws and tests (recomputed without advancing any stream: the stream positions
  before and after are equal).
* **T-V2-54 the valley's reach** — on the butt-joint sub-fixture, for every abutted roof kind: `valleyReach(X, Y,
  'int')` is within 1 cm of `valleyReach(X, Y, 'float')`, so the usable run of the side a valley ends on stops where the
  drawn valley line starts (within 1 cm); for a `shed` `Y` both modes read the shed's full run; the bays stay
  byte-identical on every host (T-V2-13).
* **T-V2-55 every rung** — on B-VILLAGE at THORP, HAMLET and VILLAGE and on B-CITY at TOWN, CITY, METROPOLIS and the
  population cap: T-V2-1, T-V2-2, T-V2-9 and T-V2-13 hold at every rung; every `v.` class composes by its
  `composition.classFamily` row (V02 §3.10.5); no stepped building stands at a village rung unless a V11 specialisation
  drew it under V07's cap; the `VG` preset's `sunBias` is 0.5; every dwelling but a `grandClasses` building reads its
  row under the rung's grandeur ceiling at THORP, HAMLET and VILLAGE, and no row is capped at TOWN and above (V02 §3.2
  step 2; T-V2-58 holds the bar); every row of V02 §3.18 (b) and (c) holds.
* **T-V2-56 edges** — on the edge sub-fixture, every row of V02 §3.18 (e) takes the outcome and rung it names — never an
  exception, a hang or a whole-map retry — and is reported where the row says so: among them a zero-area and a sliver slot
  hint (rung 3 at once), a plot with no slot and a template drawing no structure (no building), `addRange` with coincident
  points (grown along `f`), a `setComposition porch` naming a missing entrance, `dormers` with count 0, a `tiers` op with
  `centre` outside the plot and a `radiusCm` below the least lawful ring, a sheet omitting one of V02 §5.3's cells, and an
  export of a scope with no building.
* **T-V2-57 combinations** — on the combination sub-fixture, every row of V02 §3.18 (f) holds: an oasis town's
  `water`-axis class laid on the spring pool's side, and a stepped building beside the pool standing inside `H`, tier 0
  on `deriveBase`'s datum; a raised way added over a chapel a dossier crypt record binds (the
  use relocated, its crypt re-derived at its new building, the cleared building's basement through the closure); a crypt
  on a terraced ward, its floor from the levelled ground; a dossier removing a building with a stored composition and
  edited wings (its edits orphaned and listed); an epoch undone after a save and load (every building's leaf digest
  restored).
* **T-V2-58 the grandeur ceiling** (item 115 (f); takes T115-1's composed-shape clause and T115-4's rung clause on
  B-MASS, §13.2's stage-3 row) — on B-VILLAGE's rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum (V07's
  T-V7-63 fixtures, 20 seeds a rung) and on B-MASS's ceiling sub-fixture: (a) no dwelling but a `grandClasses` building
  has an `H`, `U` or closed family, a `tower` or `turret` wing or a gate tower — every other dwelling's family in its
  ceiling row's `dwellingFamilies` or one of the arrangement's own constructions, its `MassingRef.row` carrying the rung
  it was capped at — and every size, dormer, porch and hearth cell reads as the uncapped row's; (b) the only dwellings
  with a grand arrangement are `grandClasses` buildings — none at THORP and HAMLET without a dossier record, at most one
  at VILLAGE and only with a `seigneurial` government or a dossier record (S10b's count, checked on the composed
  shapes); (c) the dossier-named hall (a `v.manor_house` record, the lord's hall, at HAMLET) reads its full row, and a
  `setMassing { family: 'H' }` and an `addTower` on a hamlet cottage are committed as asked, the why fact
  `massing/ceiling` naming each; (d) a terrain operator's re-fit of a standing capped and of a standing uncapped
  building keeps its `MassingRef.row`, cap and rung included, and its wings byte-identical (the epoch clauses are V06's
  T-V6-74); (e) a capped row keeping no family takes the default row's capped families (`ceilingEmpty` reported), a
  drift admitting only dropped families is read uncapped (the why fact naming it), and a `gatehouse` slot reads
  `outbuilding`; (f) TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump — the `item115.ceiling`
  registration of B-MASS on V12 §3.7.8's engine (V12 §2.13), written by the M6a seat (T115-4).

### 7.3 Outcomes (O) and statistics

* **T-V2-29 the diversity ladder** (B-CITY, every rung): within each class, Spearman(manifested value, footprint area)
  ≥ 0.7; the share of multi-wing families non-decreasing from the `poor` to the `rich` row for `house`, `inn`, `hall` and
  `manor`; `hovel` 100 % `single`; rich-row manors ≥ 60 % in {`rectCourt`, `plotRing`, `U`, `H`}; towers only where a row
  allows them. Reported with the owner's panel (V02 §7.5).
* **T-V2-30 the size budget** — each slot's footprint area within `[0.9 × lo, 1.1 × hi]` of M10's slot band for ≥ 95 % of
  buildings; the rest reported by class and cause (plot too small, coverage cap, `overBudget` at the lattice's end). Runs
  **in the PR tier on B-MASS against the compiled V11 templates** (so a table conflict shows before M6a), and nightly on
  B-CITY.
* **T-V2-4's "beyond"** — 100 % of buildings with a street-facing main door against Fantasy Manor's measured 90 % (37 / 41).

### 7.4 Parity (P) — Fantasy Manor, NG, and the presets

**T-V2-31 — against Fantasy Manor** (the free-frame harness, `FM` preset, N = 2 000 buildings, nightly; N = 20 000 at the
milestone). Targets are the measured counts of `captures/manor/README-frequencies.md` §3–§4 (41 buildings from build
890 — CONFIRMED counts), committed as numbers only in `baselines.json` (§13.5) with `referenceBuild` 890:

| metric | Fantasy Manor measured | bar |
|---|---|---|
| family shares (`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) | 8 / 7 / 8 / 9 / 9 of 41 — consistent with equal odds (χ² 0.34, df 4) | χ² against equal shares, p ≥ 0.05 |
| **path segments** per building (`MassingRef.segments`: one wing per segment in the reference; our M7 pieces never counted) | 1 ×1, 2 ×1, 3 ×6, 4 ×12, 5 ×11, 6 ×7, 8 ×3 | two-sample KS D ≤ 0.25 (the reference sample is small); `gridWalk` segments reach 1 and 8 |
| blocks per building | 0 ×16, 1 ×20, 2 ×3, 3 ×2 (mean 0.78) | mean within ± 25 % |
| towers per building | 0 ×15, 1 ×22, 2 ×3, 3 ×1 (mean 0.76; ≥ 1 in 63 %) | mean within ± 25 %; the ≥ 1 share within ± 15 points |
| **square towers** (on blocks) among typed towers | 9 / 29 | the share within ± 15 points (candidate (d)'s `towerOnBlock` calibrated) |
| dormer elements per **segment** | 1.61 | within ± 25 % |
| porch elements per building | 0 ×17, 1 ×14, 2 ×9, 3 ×1 | the share with a porch (24 / 41 = 59 %) within ± 15 points; buildings with two or more porches (10 / 41) **reported**, not gating (our secondary porch is a hood at a side, rear or yard door; J-V2.44) |
| **half-round porches** among typed porches | 19 / 31 | the share within ± 15 points |
| buildings with an entrance | 37 / 41 | ours 100 % — "beyond" (T-V2-4) |

The `FM` preset's calibrated cells (V02 §3.10.8) are set at M6c by V12's `reference` run against Fantasy Manor
(`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics, the free-frame harness its fixture, released as one
declared shift (V12 §3.7.6), and then held by these bars. Wing width is ours (metric; item 59), so plan extents are
compared in wing widths: our mean plan extent in wing widths within ± 20 % of the reference's measured mean, which spike
SP-V2-4 measures (V02 §8.2: at least 40 generations with a draw pass) and commits as a numbers-only row of
`baselines.json`; if the spike cannot run, the extent bar is **reported, not gating** (pre-decided).

**T-V2-32 — against NG** (stage 2's `hatched` comparison, B-CITY-lite): the share of row and single-range wings whose ridge
runs on the short axis within 36 % ± 8 points (the base's NG measure, §2.6), by M12's frontage law.

**MFCG and FTG:** T-V2-26 — the presets draw the base's footprints, so §13.5's MFCG and FTG rows are untouched.

### 7.5 The owner's stage-3 panel (item 499)

Stage 3's gate follows §13.6's written, blind protocol: (1) **twenty pairs against Fantasy Manor** — ten of our
manor-class buildings under the `FM` preset in the free frame, ten of the reference's captured buildings, rendered at the
building band in each one's own look, shown in random pairs; (2) **the ladder street** — for three B-CITY seeds, one
street at each of the six band rows at the neighbourhood band, the owner answering "does this read from a giant manor to
a small hovel?" per seed; (3) **the item-110 buildings** — the second known-city fixture's stepped temple, a terraced
palace, a tiered tower, the arena and the bridge's deck row, at the building and neighbourhood bands, the owner answering
"does this read as a stepped temple, a terraced palace, a pagoda, an amphitheatre and a bridge street?"; the stepped
temple's summit offset (J-V2.61; 2.4–4.4 m at the median by V02 §3.10.3's receipt) is shown and named with it. M6 claims
"stage 3 at parity" only by a rated pass or the owner's acceptance recorded in the `D5Record`; unrated, M6 closes
*provisional — not rated* and the panel is offered with every release until rated (§13.6 (7)). The panel is a `PanelSpec`
registered by M6's seat on V12 §3.9's engine (V12 §2.8), its pairs of reference `'FM'` (V12 §2.8's `D5Pair`), its reference
counts `'FM'` rows of `baselines.json` (§13.5).

### 7.6 Cost, memory and exports

* **T-V2-22 cost** — V02 §6.1's bars (town-wide median ≤ 10 µs, composed classes ≤ 60 µs median and ≤ 250 µs p99, mean
  ≤ 12 µs) on B-CITY at every rung, and V02 §6.2's (compose ≤ 0.2 ms median, a neighbourhood ≤ 120 ms of pool time, the
  roofscape ≤ 25 µs median and ≤ 8 ms per district-band tile) — nightly; milestone at METROPOLIS. **And every one-time
  wait stage 3 adds to or lengthens** — the massing's share of a generate, a regenerate, an open and a dossier change,
  an `upgrade`, the load's stage-3 migration rows — **completes within ten seconds from the click at every rung's top and
  at the population cap** (V12 §3.15.9's wait timer, T119-2; the stage-3 share reported beside each wait; the cap at the
  milestone).
* **T-V2-23 memory** — V02 §6.3's lines (a `wings` chunk ≤ 1 KB at p99; the model's added bytes within the re-declared
  line).
* **T-V2-24 exports** — the JSON `massing` and `composition` blocks validate against the schema and round-trip; glTF and
  CityJSON validators green; their roofs equal the roofscape's facets (vertex for vertex after the exporter's rounding);
  an export with `derive` equals, byte for byte, one made with `asDrawn` after every building was clicked (below V02
  §6.4's measured limit); **and at every rung's top and at the population cap each format under each `compositions`
  option completes within ten seconds from the click to the file written** (T119-2's stage-3 export clause; V12
  §3.15.9's wait timer, five seeds each; R12-31), its first progress frame within one second where it runs longer
  (R12-32), a size above the measured limit taking V02 §6.4's fallback (b), named.

**CI tiers (§13.8).** PR: T-V2-1 – T-V2-21, T-V2-25 – T-V2-28, T-V2-30 (B-MASS against the compiled V11 templates),
T-V2-33 – T-V2-35, T-V2-37 – T-V2-43, T-V2-54, T-V2-56, T-V2-57 and T-V2-58's B-MASS clauses on B-MASS and B-PLAN
(≈ 60 s), and T-V2-55 on 20 seeds per rung. Nightly: B-CITY bars (T-V2-22, T-V2-29, T-V2-30, T-V2-32), T-V2-36 from
M6-U, T-V2-55's full bench, T-V2-58 on B-VILLAGE's rich fixtures, the harness at N = 2 000 (T-V2-31), B-EDIT at 10⁴
with the new kinds. Milestone: METROPOLIS and population-cap runs, exports and their ten-second timings (T-V2-22,
T-V2-24), the harness at N = 20 000, the owner's panel.

### 7.7 Stacks and deck buildings

**Fixtures** (B-MASS sub-fixtures): a **stepped temple** (the `stepped-temple` row at each anchor on its receipt's precinct
hints — sized for the row's 90th-percentile stack at `claimHi`, V02 §3.10.3 — and on an 18 × 22 m hint, on flat ground and
on a 6 % slope); a **terraced palace** (`terraced-palace` on its receipt hints and a 60 × 45 m hint); a **tiered tower**
(`tiered-tower`, with octagonal and round draws, on its `tower` budget); a **stepped monument** laid by `layTiers` alone
(V04's call, a fixed draw list, `TierCells.heights`); a **bridge** with frontage deck plots on both sides, a **ford**, a
**drawbridge** and a fixed **moat bridge at a gate** (no deck plot); a **timber pier**; a **stone mole** with a mid-mole tower and a fort at its head
(landmarks); a **bank quay** (ground); a **sealed stack** (stair form `none`) in two forms, the stepped temple sealed with
its storeyed shrine (`tiers { stairs: 'none' }`) and sealed with every wing solid (`tiers { stairs: 'none', top: 'flat',
solid: 'all' }`); a **stepped temple with a storeyed ground annex** (a range added beside tier 0); a **stepped great
temple** on a `flood` plot; a **bridge chapel whose dossier binds a crypt**; an **arena** (the `arena` row on a precinct
hint of 60 × 50 m and on a hint too small for it); a **terrace-wall sub-fixture** (a 3 m `RetainingWall` on a plot's rear
line with a row house built against it, and a house at the wall's top edge); B-EDIT's **warp fixtures** (1–8 m) run over
each stepped fixture; and the **second known-city fixture** at M3a (item 110 (e)).

* **T-V2-44 tiers nest and cast one shadow each** (item 110 (f); takes T110-4) — every wing with `on` lies inside the ring of the wing it
  stands on, inset by at least the drawn step less 1 cm on every side (the front by the stair's run and landing under
  `axial`); **the wings standing on one wing are pairwise interior-disjoint** and each stair shares its contact vertices
  with the tier it climbs; its `baseCm` equals `deckLevel` of that wing to the centimetre, and **`deckLevel(x) = x.baseCm +
  x`'s drawn height for every tier** (the parapet added and subtracted in one place); a stepped building's casters are its
  wings, one prism per tier from its own `baseCm`; the roofscape tiles the footprint with the stacked occlusion (T-V2-9's
  bar on the stepped fixtures, **the tiered-tower fixture included**); **every pent facet meets the wall of the tier above
  at `ridgeCm` within 1 cm**; round and octagonal stacks concentric within 1 cm apart from a D-front edge; solid tiers have
  `floors` 0 and no storey (`storeyRange` null); the capacity of the terraced palace equals §2.6's formula over its
  storeyed tiers only; **no chimney, decorative or planned, is drawn inside the ring of a wing standing on its host**. **On
  every re-basing path** — a terrain stroke under tier 0's edge only, a warp of 1–8 m over the building, and a crypt lift
  — after each: every stacked wing's `baseCm` equals `deckLevel` of its support to the centimetre, every stair's rise
  equals its terrace-to-terrace difference, and `Building.heights` equals the envelope (`floors = 1 + max
  storeyRange[1]`); after each warp step no two wings standing on one wing overlap and T-V2-9's tiling holds. **Under
  Works** (item 318): on a stepped temple and a terraced palace, at every stage no wing is drawn or cast above a support
  that has not reached its eave, and no height is undefined (a solid wing by courses). **Basement access** (item 371): on
  the stepped temple with a storeyed ground annex, given a requested basement, `Basement.access` ≠ `external` (the annex's
  core or the trapdoor fallback joins it, V03's J-V3.88); on the all-solid stepped temple with a requested basement it is
  `external`, its door at `basementDoor(b)` (V03 §3.7.1); **and T29-4 holds on both temples** — each basement inside its
  ground wings and joined by one of §2.6's three ways, the all-solid temple's by the outside stair of its `external`
  access (item 371).
* **T-V2-45 the stairs and the entrance** — every stair's rise ÷ run ≤ its drawn grade × 1.01 (a `stairSteep` report where
  the datum made it steeper, never a moved ring); `stairChain` connects the ground to the top tier's terrace for every
  `axial` and `flights` stack, and each flight's foot lies at the point of its face nearest the last head that lets it fit;
  each flight lies inside the terrace it stands on; a round or octagonal axial stack's stairs keep their full width against
  a straight D-front edge; the fallback `axial → flights → internal` is taken where a fixture's hint forces it, and
  `internal` never over a solid tier 0; **a solid stack's main entrance lies at stair 0's foot and faces the frontage, and
  the plan rung's root is the landing door `landingSide` names; a sealed stack's entrance opens nothing, and its plan has
  no level at or above the ground where every wing is solid — a storeyed tier or shrine on it planned and flagged
  `W_TIER_UNREACHED` (V03's T-V3-28; the base's T28-1 and T28-2 on the storey-less plan, item 483)** (item 230; on both
  sealed fixtures); a storeyed tier 0's door lies on the free part
  of its front side.
* **T-V2-46 stepped buildings from M3a to M6** — the stepped fixtures laid by the base outline builder (M3a) and by the
  stage-3 massing (M6a) are byte-identical in their wings and `MassingRef`, **both being `massStepped`'s output** (and the
  arena both `massOval`'s); a stepped building made at M3a carries `MassingRef.stack`, and a document whose stepped
  building lacks it loads by the stack migration row with the shift reported; `DriftBounds.families` naming `stepped` is
  read at M3a; `tiersTruncated` and `shrineDropped` reported where a fixture forces them, and **`tiersTruncated` on at most
  10 % of the stepped buildings laid on the receipt's precinct hints at each anchor** (N = 200 per anchor; receipt estimate
  1.0–7.6 %, V02 §3.10.3); on a hint that passes ST0 exactly at the least draws, the lay at the least draws lays `count[0]`
  tiers with none truncated (ST0 agrees with ST2–ST3); ST8's shrink and its single fallback reached on a hint too small,
  reported.
* **T-V2-47 deck buildings** (takes T110-5's deck-building clause; the deck-plot clauses stay T-V1-53's and
  T-V6-63's) — every deck-plot building inside its plot and so inside the deck's width; its footprint
  within the deck budget's band (per slot) for ≥ 95 % (the rest reported by cause); its floors ≤ `maxFloors` (100 %, after
  a mutation too); no basement; no dig draw; every wing's `baseCm` the deck's surface; the mole-head fort and the mid-mole
  tower read their classes' rows with their templates' budgets; **the ford, the drawbridge and the gate's moat bridge carry no deck plot (§4.7 *Deck plots*); the bank
  quay's buildings take the terrain datum and the ordinary basement gate; the lighthouse islet's tower is a land building;
  on the bridge-chapel fixture whose dossier binds a crypt, the chapel stands on land with its crypt and the deck holds no
  crypt-bound use**; removing the deck gives its buildings the base's fates, and rebuilding it raises new lineages on the
  re-offered plots.
* **T-V2-48 editing stacks** — `tiers` ops (count up and down, step, top, stair form, and the fields `shape`, `lowerRoof`,
  `solid`, `shrineInsetShare`, `centre`, `radiusCm`) on the stepped fixtures: kept tiers keep their keys and bytes where
  their step is unchanged; a stair keeps its key across a form change; new keys only from `nextWingKey`; new tiers at the
  row's central values (round-half-up); **each of V02 §4.6's bends taken and named, never refused**: `tiers` on a single →
  stepped first; `internal` over a solid base → `none` (all solid) or `axial`; an asked stair form whose reserve fits
  nowhere → the current form kept (`bend.tiers.form`); a shrine that no longer fits → `flat` (`bend.tiers.top`);
  removing a stair → `internal` or `none`; a range, a tower and a back range beside a stack laid as ground wings outside
  tier 0, the stairs and the approach strip; a block → a range; `family: 'stepped'` on a deck → `single`; removing tier 0
  → the stack removed (the building removed with no ground wing left); a count above what fits; pent under `axial` → flat;
  a roof `setAttr` on each tier kind; a stacked wing's `baseCm` → its support's height; a tier's height edit re-bases the
  wings above and re-lays the stairs, and one the terrace cannot hold bends (`bend.tier.height`); floors above `maxFloors`
  on a deck bent (`bend.deck.floors`); undo and redo exact, restoring the building's leaf digest after each.
* **T-V2-49 mutation** — `single → stepped` keeps the main range byte-identical as tier 0 (its four corners the anchor); a
  range too narrow for a second tier never draws `stepped` (W1's anchored test); `stepped → single` keeps tier 0 as the
  range (`solid` cleared, its floors the target's); `stepped → stepped` from four tiers to six and back; each inverse
  restores the building's leaf digest exactly.
* **T-V2-50 the no-op pin** (item 110 (f)) — a `NoOpPin` registration on V12 §3.7.8's engine (§13.2's convention), its
  off form V11 §3.24.0's for item 110 (the `item110.stepped` and `item110.deck` overlays, V12 §2.13): every
  `roster.specialisations` chance 0, every `deck.offer` 0 and every `deck.landmarks` claimant chance 0, so B-MASS's mole
  fort and mid-mole tower are not placed. On the suites B-MASS and B-CITY minus B-MASS's arena sub-fixture (whose
  `ovalCourt` is its own declared shift, T-V2-46), every massing at every rung is byte-identical to the composer without
  item 110: creation indices 8 and 9 never drawn, no `@deck` row read, no wing with `on` or `solid`, `MassingRef.stack`
  absent; the load check finds `stepped` in no row of V02 §3.10.2 – V02 §3.10.6. **Its one reported difference**: a
  forecourt `U`'s main door whose drawn position lay under an arm is moved to the nearest free point of the back range's
  side (item 228's keep-or-move rule); every other door is byte-identical.
* **T-V2-51 the wall-side datum** (item 231) — on the terrace-wall sub-fixture and on the second known-city fixture's
  terraced wards: (a) every building's `baseCm` lies within `plinthCm + 10 cm` of its own terrace's level
  (`levelledGroundCm` at its centroid's side of every wall within `terrace.wallBandCm`); (b) the row house built against the
  wall has rear setback 0 and does not float toward the terrace above, and the house at the wall's top edge does not sink
  toward the terrace below; (c) on a levelled plot every ground wing's `baseCm − plinthCm` equals the maximum of
  `levelledGroundCm` over its samples (its vertices and centroid, after item 231's move) within 1 cm — for a wing with no
  kept user `baseCm`, no half-cellar raise and no crypt lift (T-V2-52 and T-V2-36 hold those).
* **T-V2-52 the half cellar's raise** (item 226; J-V2.91) — on B-MASS's basement sub-fixtures (a `low` plot, a plot whose
  full cellar would meet the water table, a church whose basement is only its crypt): every building with a `half`
  basement has the ground wings over its ring (a crypt-only basement: the wings over the crypt's ring) at `cellar.depthCm
  ÷ 2` above the terrain datum, its basement floor at the datum less half the depth and above the water table by the
  gate's test, after S11, a terrain edit, a warp, a vertex move and `rebaseStack` alike; a full basement's wings stand at
  the datum; the dig floor reads the raised `baseCm` (V02 §3.14.5 (a)); a basement turned from `half` to `full` by a
  re-derivation lowers the wings to the datum in the same event.
* **T-V2-53 one tread law, one crypt seed, bays on every side, the raised strip** — (a) on B-MASS's stepped sub-fixtures
  every stair wing's drawn tread lines (`stairFlight`), glTF risers and CityJSON steps all count `stairTreads(w).n`, and
  the treads' goings sum to the flight's run; (b) `cryptSeedWings` returns the `chancel` part on a template cathedral,
  tier 0 on a stepped great temple, the east-most range on a ranged church (ties by key) and an empty list on a building
  with none; (c) `facadeBays` on every side of every B-MASS wing returns bays inside the side, none on a side whose run is
  not positive, and round a round tower's free perimeter at least one bay per free arc of `bayM ÷ 2` or more; (d) a raised
  way added by T4 over a street of low houses, and the same way founded at an epoch, leave no building meeting its piers or
  strip, and the way regenerated at its address places none there.

**CI tiers for these:** T-V2-44 – T-V2-53 in the PR tier on B-MASS's stepped, deck, arena, terrace-wall and basement
sub-fixtures (≈ + 9 s), T-V2-44's warp and Works cases included; T-V2-46's M3a half, T-V2-47 and T-V2-51 on the second
known-city fixture in M3a's milestone tier; T-V2-50 nightly on B-CITY at every rung.

### 7.8 Ruin and disaster on the exterior

**Fixtures.** A **damage sub-fixture** of B-MASS: a `dwelling-detached` house, an `inn-compound` round its court, a
manor with towers and a turret, a stepped temple with its shrine and solid tiers, a terraced palace, a deck building on
a bridge, a solid stepped monument and a `hovel`, each with its plan derived (V03), drawn at decay levels 0, 0.1, 0.2,
0.3, 0.5, 0.75 and 1 (V06's level, set by the building's existence state and years, in stone and in timber), then
restored from 1 to 0 by a `repair` Works — the manor then extended by a wing (`extend`) — and each once with no plan in
force; and the house once burned (`burn`), its shell charred. A **look fixture** on B-CITY-lite's TOWN and CITY seeds
and B-VILLAGE's VILLAGE seed: a fire, a flood and an earthquake, each a calamity carried by V08's port with its linked
`reconstruction` condition (V08 §3.16 (7) (b)), whose map row then reads `disaster` (V11's map rows), at severities 0,
0.5 and 1, the condition's `sinceWeek` 10 and `untilWeek` 20; on one seed a rebuild's `repair` Works beginning in week
18 on half the struck buildings and a `decay` Works on two others, and a second calamity with its linked condition
overlapping the first; the same documents with Show crises `off` and with no condition; and the `disaster` preview on a
standalone document and on the rebuilt seed, its units holding buildings under the rebuild's Works.

* **T-V2-59 the exterior agrees with the plan** (item 123 (d), (f); takes T123-5 and T123-7's exterior clause) — on the
  damage sub-fixture at every level and every restoration step: (a) the holes are exactly the plan's damaged roof bays
  over rooms (ring for ring after the clip to their wing's facets), the gaps exactly its broken outer runs of each
  wing's lowest storey (span for span) and the patched rings exactly its repaired roof bays — none drawn where the plan
  shows the element intact; (b) on each building while `decayed` or `ruined`, the burned house's charred shell among
  them, no roof facet is drawn over a wing roofed `none` and every roof bay over a room of such a wing is damaged
  whatever its threshold (§2.6 step 7); (c) the holes and gaps at a higher level contain those at a lower, and the
  restoration removes them in reverse threshold order, each repaired bay patched and each repaired run drawn whole, the
  wing the `extend` then adds drawn as built, never patched; (d) at level 0 before any decay every tile byte-identical
  to the same fixture without item 123 (T123-7's no-op) — the `item123.damage` registration of the damage sub-fixture's
  exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's item-123 exterior step (M6b, V02
  §8.6); (e) with no plan in force the massing reading — no hole, no gap — and, the plan then derived by a click and by
  V03's `view`, the same holes and gaps as from the stored plan; the plan then evicted from the elaboration cache, the
  building's damage marks re-emitted at the massing reading and its cached tile redrawn without them; a week step that
  moves a building's level without crossing a threshold re-emitting none of its marks, and one crossing a threshold
  re-emitting that building's alone; a plan derived while the building stood, the building then abandoned by an epoch's
  `vacate`, stays in force with its `wings` and `rooms` rungs `current`; (f) the model digest, every `MassingRef`, wing,
  stored composition and stored plan, and the saved bytes identical with the damage drawn and not, across a save and
  load and an undo and redo of the restoring epoch; (g) the glTF, OBJ and CityJSON exports byte-identical at every
  level, and an SVG at the neighbourhood band carrying the holes in `sem.building.roof.hole` and the rubble in
  `sem.building.rubble`, the outline open over each gap.
* **T-V2-60 a disaster's ruined look** (item 122; takes T122-1 and T122-7's `item122.crises` registration on the look
  fixture's exteriors) — on the look fixture: (a) every building of every unit `disasterDistricts` returns (V07's ends
  at VILLAGE) draws the look in exactly the weeks it stands (10–19; 10–17 on a building whose rebuild's Works begins in
  week 18) and no building outside those units does — at the element reading its holes and gaps equal its plan's damage
  at the higher of its own level and the look's, at the massing reading the toned roof and the dashed outline; (b) the
  model digest, every wing, `MassingRef`, stored composition and stored plan, and the saved bytes identical with Show
  crises `follow`, `off` and a preview and in every week; (c) with Show crises `off`, every building's exterior
  byte-identical to its drawing under no disaster look (its own decay alone), and with no condition and no preview every
  tile byte-identical to stage 3 without item 122 (the `item122.crises` no-op — the `item122.crises` registration of the
  look fixture's exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's ruined-look step (M6b,
  V02 §8.6)); (d) from week 18 a building whose rebuild's Works began draws that Works' stage and not the look (V06's
  `crisisLookYields`), and a building under a `decay` Works keeps the look; the `disaster` preview on the rebuilt seed
  in week 18 draws the look on every building of its units, those under the rebuild's Works included (a preview never
  hands over); a building also really decayed drawn at the higher level; in week 20 every element in its real state,
  none patched by the look; (e) a viewer whose knowledge key withholds the condition sees the look on no building; (f)
  the fire's buildings blackened (the `fire` pattern), the flood's and the earthquake's not (`flood`, `scatter`); of two
  overlapping looks the higher level drawn; (g) one building's holes and gaps identical across two views, at the
  district and neighbourhood bands and in an SVG and a PNG export; over a cached district-band tile of a struck
  district, Show crises switched `off` and back, a preview started and ended, and View as set to a key that withholds
  the condition, the struck buildings' damage marks re-emitted and the tile redrawn after each, and the week step 17 →
  18 re-emitting exactly the buildings whose rebuild began; (h) the stepped temple, the deck building, a tower and a
  solid monument take V02 §3.18 (e)'s outcomes, and an underground building draws none of it.

**CI tiers for these:** T-V2-59 in the PR tier on the damage sub-fixture (≈ + 4 s); T-V2-60 in the PR tier on
B-CITY-lite's TOWN seed (≈ + 6 s) and nightly on every seed of the look fixture; both at the milestone on B-CITY
METROPOLIS with V02 §6.6's measurement.

## 8 Build plan

### 8.1 Where stage 3 sits in §16's order

Stage 3 is built as **milestone M6**, after M5 and beside M6-U in J122's combined order (§16), in three parts (item 524).
It depends on: M2b (roofs, the `lit` family, compound site plans, the designation templates and the generation fill); M3a
(the designation mutator with its record and inverse, assignments, the dry run and bending, the handle-based API); M3b
(the glTF, OBJ and CityJSON exporters); M4 (Works and the evolution hooks the mutation steps feed); M5 (the neighbourhood
click of II.4 that raises the `wings` rung — technically **decoupled**: without it the rung is raised by a building click
and by `elaborate: 'view'`, so no M6 part waits on M5's gate); **V11's compiled templates (V11 C1–C3b; C3b's `fort` and
`arena` families at M3a)** — the template families, the class roster with `templateFamily`, the `HeightsRow` with item
427's columns and the role table — **before M6a** (the chain and T-V2-33 read them). T-V2-36's dig and crypt parts run
from **M6-U**, which brings V04's access draw (its T2b stage) and the crypt derivation (items 238, 226 and 436); until
then T-V2-7's cathedral fixture and T-V2-34 exercise V02's parts of them (the seed wings, the lift, the W6 trigger key).

**The plan rung comes first on the base's buildings.** V03's P0, P1 and P3 run on the base's buildings after M4 (V03 §8;
J-V3.132; J122) and take the composer's rooms and dormer rows when M6b lands (the plan rung's milestone M6-P, item 567); this volume's `facadeBays`, with `endMarginM` and
`bayM`, is therefore built **first, as its own item** in `@plat/plots` (item 505), before V03's P0, its cost inside M6b's
estimate. V06 reads the recorded wing steps from **M6a**.

### 8.2 Spikes first

| spike | when | what it measures | pass | if it fails (pre-decided) |
|---|---|---|---|---|
| **SP-V2-1 massing cost and fit** (≈ 1 pw) | before M6a | M3–M13 for `single`, `L`, `T`, `H`, `U`, `rectCourt` and towers on the real plots of M5's B-CITY METROPOLIS seeds: µs per class, the share of rich-row manor plots on which a court family is feasible, F-MASSING's rung distribution | town median ≤ 10 µs, composed classes ≤ 60 µs median; ≥ 40 % of rich manor plots admit a court family; rung 3 ≤ 1 % | V02 §6.1's fallbacks (a)–(c), chosen before M6a; a feasibility shortfall raises the manor rows' join demand (S10 (7)'s `joinMaxDelta` for the rich band, §1.1's granularity) by one step, re-measured |
| **SP-V2-2 roofscape robustness** (≈ 0.5 pw) | inside M6a | 10⁵ fuzzed massings (every family, stepped rows, warped quads, hand-added ranges at odd angles) through `resolveEnds` and `roofscape` | T-V2-9 and T-V2-10 at 100 % | a joint class that fails draws its valley without the occlusion clip (V02 §6.2's fallback), and a wing whose facets fail takes the base's per-wing construction, both reported per building |
| **SP-V2-3 the Fantasy Manor calibration** (≈ 0.5 pw) | inside M6c | V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics against V02 §7.4's measured targets, the free-frame harness at N = 20 000 its fixture | every V02 §7.4 bar; the run `accepted` (V12 §3.7.5) | V12 §3.7's outcome: the register entry's pre-decided fallback (`fallback-applied`; `hipInset` 0.5, V02 §3.10.8), else the entry `not-achieved`, reported to the owner (V12 §3.7.5, V12 §3.11) |
| **SP-V2-4 the reference's plan extent** (research seat, ≈ 0.25 pw) | before M6c | one capture of at least 40 Fantasy Manor generations with a draw pass, tabulating each plan's extent in wing widths (and confirming the block ridge inset, V02 §3.10.8) | a numbers-only `baselines.json` row | the extent bar of V02 §7.4 is reported, not gating; `hipInset` for blocks keeps its fallback 0.5 under `FM` |

### 8.3 Milestones

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6a — the massing** | `@plat/buildings` with `composition.json` (schema, loaders, the default rows of V02 §3.10, provenance cells, the preset resolution); M0–M14; the S11 integration (the registration, the manifested-band row read, the entrance hint, court typing — the hole sentence built at M3a-V2 (V02 §8.5), now also typing the composed families' courts — the structures' composition keys, the cluster structures as fixed wings; item 303); `BaseWing.role` and `key` as the base carries them from M1 (items 216–217); `MassingRef`; F-MASSING; the `massing` concern; the mutator's wing step W1–W10 with `MassingGrowthRow`; `resolveEnds` and `roofscape` for the massing, the `roofscape` construction in `ink`, `lit` and `hatched` at the district band; the golden shift; the resolution chain with the family, class-override, role and default rows at four anchors, `roleKeys`, `classFamily` and the load checks; V11's `HeightsRow` with the one pitch rule, the climate's flat roofs, tower storeys and spires; M3's budget test and M10's slot band and reverse-lattice shrink; M5's closed-family `main`, `cross`, the sunlit choice and the `fallLine` and `water` axes; M8's tower on a block and the template towers; M8b's attached structures (item 304); the canonical order and the wing keys of item 225; `segments`, `low`, `cupola`; the significance shift, split and ladder composition; item 115's rung ceiling in the chain with the `~<RUNG>` key and the why fact `massing/ceiling` (V02 §3.2 step 2; inside the estimate — before M6a the base outline builder lays no `H`, `U`, closed family or tower on a dwelling); the crypt seed wings (`cryptSeedWings`, exported by `@plat/plots`: built here, or with the crypt derivation at M6-U where that lands first) and the raised crypt's lift (item 226) | T-V2-1 – T-V2-7, T-V2-9, T-V2-10, T-V2-13, T-V2-15 – T-V2-17, T-V2-22 (massing), T-V2-25 – T-V2-30, T-V2-33, T-V2-34, T-V2-37 – T-V2-42, T-V2-55, T-V2-56's massing rows and T-V2-58 (with B-MASS's `item115.ceiling` registration) on B-MASS, B-CITY and B-VILLAGE; the first map re-measured at every rung within V02 §6.1's lines; **every seed's footprints move — one declared shift (§13.3) with its diff report**, output version bumped; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 6.5–9 pw |
| **M6b — the composer, the rooms rung, rendering and exports** | `compose()` at `wings` and `rooms`; dormer rows, the entrance gable, the porch (reading `facadeBays`, built first, V02 §8.1); the composer's rooms; F-COMPOSE; the `compose.*` concerns; the elaboration integration (building click, `view`, and II.4's click where M5 has landed); the paint programs `roofscape`, `dormer`, `porch`, `towerRoof` in every shipped family and the surface layer's roofs; the exports of V02 §5.5 with the `compositions` option; the cache line; the stage-3 intake (§2.6's test with stored compositions of every family; B-PLAN's compositions); `wingsInputs` and the rooms rung at the occupants' band with the programme's hall clamp and the court door; the half-round and secondary porches; the warehouse hoist rule and the plan precedence of dormer rows; `valleyReach` in both modes; `dome`, `plain`, `none`, spires and the cupola in the roofscape; the roof decorations and the `FM` look's dressing; the `WhyProvider`; the view trigger at the neighbourhood band with its sliced batches | T-V2-8, T-V2-11, T-V2-12, T-V2-14, T-V2-18, T-V2-20 (carry part), T-V2-21, T-V2-22 (compose, roofscape), T-V2-23, T-V2-24, T-V2-35 (its composer clauses), T-V2-43, T-V2-54, T-V2-56's composer, drawing and export rows; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 5–7.5 pw |
| **M6c — editing, parity and the gate** | `setMassing` and `setComposition` with their dry runs, bends, lifecycle rows and migration rows; the `setAttr` paths by key; T9's handles and family strip, built with V09's AP10 (the building-band controls, 0.25–0.5 pw, counted on §16's line for V09's staged screens, V09 §8.1), and the clerk's operations (with V10); the `FM` preset and the free-frame harness, the fixture of V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics; the owner's stage-3 panel; the `room` op, `moveTower { shape }`, the secondary-porch op, the bends of V02 §4.2 and V02 §4.3, the orphan actions, the `fantasyShapes` control row (item 402); the parity bars (segments, square towers, half-round porches) with SP-V2-4's extent row | T-V2-19, T-V2-20, T-V2-31 (the V02 §7.4 parity bars), T-V2-32 (the NG ridge share), T-V2-56's edit rows, T-V2-57; B-EDIT at 10⁴ with the new kinds; the panel offered (V02 §7.5); T-V2-36 with M6-U; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 3.5–6 pw |

**Effort (stated once; PLAUSIBLE): 23–33.5 expert person-weeks for the volume** — **M6 18.75–28.5 pw** (the three rows
above, 15–22.5; V02 §8.5's additions inside M6, 3–4.5; V02 §8.6's, 0.5–1; and 0.25–0.5 across M6a–M6c for the `fort`
and `burial-ground` family rows, the `arena` row's move, the `charnelHouse` and `lychgate` rows, the oval's
minor-axis gates,
`cryptSeedWings`, `stairTreads`, `facadeBays` on every side, the stepped-specialisation write, the hall's fallback and
T-V2-52 – T-V2-53), **M3a's part 2–2.75 pw** (V02 §8.5's M3a-V2 row, the hole sentence's cost inside it) and **2.25 pw of
spikes** (V02 §8.2). Builder-tier seats do the build, verify and measure work, the architecture rulings Fable seats, per
the owner's staffing. §16 counts the lines (items 524, 525) and computes its totals once (item 568).

### 8.4 Risks

| risk | likelihood / impact | mitigation, and the pre-decided answer |
|---|---|---|
| **R1** the massing's cost at METROPOLIS | medium / medium — on the first map's path | SP-V2-1 first; V02 §6.1's fallbacks (a)–(c) |
| **R2** real plots too irregular for the rectilinear families, so rich quarters read as single ranges | medium / high — the owner's "giant manor" | `lir` fitting, `plotRing`, the class mix's JOIN for large classes (item 71 (c)); SP-V2-1's feasibility share; fallback: the rich join step |
| **R3** roofscape joint cases after hand edits and warps (oblique butt joints, carried quads) | medium / low — drawing only | SP-V2-2's fuzz; per-joint and per-wing downgrades |
| **R4** the golden shift at landing touches every document | certain / low | a declared shift with its diff (§13.3); saved documents keep their output version until the user upgrades (§7.5) |
| **R5** towered buildings make a warp's validation costlier (the union check, §2.6 rule 4 (iii)) | low / medium | measured at M6c on a 150 m brush over a rich quarter; fallback: towered buildings are validated last in the step; a failure halves the step at most once more, and a building still failing holds the warp's step at its last lawful fraction, named in the dry run (item 101 R2) — never a refusal |
| **R6** the owner's eye does not accept the look | medium / medium | every shape and rate is a table row; the panel (V02 §7.5) before any "at parity" claim |
| **R7** V11's compiled templates arrive without the manor override, the role table's shares or item 427's columns | medium / medium — rich courts would read small | M3's budget test removes the court families that cannot fit (rich manors then `U` and `H`, T-V2-29 still met); the main-slot share defaults to 0.6; `attic` defaults to true for a family V11 leaves out and `parapetCm` to 0; all reported by T-V2-33 and T-V2-30 in the PR tier |
| **R8** M6-U lands after M6c | medium / low | T-V2-36 runs from M6-U's landing (nightly); V02's parts (the seed wings, the lift, the W6 trigger key) are exercised by T-V2-7's cathedral fixture and T-V2-34 meanwhile |
| **R9** stepped stacks truncated on their precincts | medium / low | ST0 with the front terraces, the derived tier-0 aspect, the steeper temple stair, the claim-sized band and the tiered tower's row, whose receipt (V02 §3.10.3) estimates 1.0–7.6 % truncation on precinct hints sized for the 90th-percentile stack under T-V2-46's 10 % bar; fallback: the stair fallback, then ST8's single fallback, reported by class |
| **R10** V11's `deck` rows late | medium / low | nothing breaks: an empty `deck` table offers no deck plot (V11 §2.1's empty-table rule), so stage 3 meets no deck building without its row; T-V2-47 and M3a-V2's exit wait for C3b's rows (V11 §8) |
| **R11** the M3a builder and the stage-3 massing diverging | low / medium | one exported `massStepped` and `layTiers`, and T-V2-46's byte-identity bar; no spike: the construction is closed-form and its checks exact |

### 8.5 Stacks and deck buildings in the build

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M3a-V2** — with item 110's base milestone and its second known-city fixture (§16 M3a; item 229) | `massStepped`, `slotBand`, `drawTiers` and a pure `layTiers` (ST2–ST7 with its typed failure) in `@plat/plots`, exported, and `massOval` (the fixture's arena); `MassingRef` with `stack` for stepped buildings and the stack migration row; the stack helpers `deckLevel`, `storeyRange`, `stairChain` and `landingSide`, exported by `@plat/plots` (read by `massStepped`, `rebaseStack`, the capacity and V03's eager `ground(b)`, `floorCm`, `basementDoor(b)` and `stackAccessDoor(b, a)`, V03 §3.3, V03 §3.7.1, V03 §3.7.2 (1)); `stepped` in the M3a drift list; `rebaseStack` on every re-basing path (item 370) and the wall-side sample (item 231); item 318's stack order in `heightsAt`; item 230's solid-stack entrance; the base outline builder's stepped construction and its deck buildings (a rectangle or row quad inside the deck budget, the storey cap, the deck datum); item 426's `composition?` on the designation template and its structures (written by V11's specialisation replacement, item 259) and item 224's hint clause of *Entrances* rule 1 with item 228's free part; `BaseWing.on` and `solid` (item 227); the datum step's stacking and deck datum (item 370); `storeyRange` in the capacity and `Storey.wings` (item 371); `BuildingInput.deck` and no cellar on a deck (item 305); the carry check (item 333); the per-wing constructions' stack order and treads by `stairTreads` (item 419); item 303's typing of every inner ring of a footprint face as a `court` `YardPart` (the arena's floor); `composition.json` shipped with the `tiers` cells, the four stepped rows, the `@deck` rows, the `PorchKindRow`s (data only: V01's entrance reserve reads their `widthM`, `depthM` and `outside` from M5, V01 §3.8.2 step 5; the porch itself is composed from M6b) and the constants they read (the rest at M6a); a tier's height through the base's `setAttr` | T-V2-44, T-V2-45, T-V2-46 (its M3a half), T-V2-47 and T-V2-51 on B-MASS's sub-fixtures and the second fixture; T-V2-42's arena part on the fixture; T-V2-50 on B-CITY; `plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat | 2–2.75 pw |
| **M6a**, added | the `stepped` family in the massing (M5 calling `massStepped`), the stepped mutation rows with the anchored test, the `@deck` suffix, band (per slot) and storey cap in M1, M10 and M11, the roofscape's stacked occlusion and order; the pent band facets, chimney hosting on exposed roof, `ovalCourt` in M5 (`massOval`) with the `arena` row, the claim-sized band in `slotBand`, `vaultClamp` | T-V2-42 (arena), T-V2-46 (its M6 half), T-V2-49, T-V2-50 | + 1.5–2.25 pw |
| **M6b**, added | `stairFlight`; the stack and deck exports of V02 §5.5 (`BuildingPart`, `BuildingInstallation`, stepped glTF stairs, JSON `on`, `solid`, `stack`, `deck`) | T-V2-24 on the stepped fixtures | + 0.5–0.75 pw |
| **M6c**, added | the `tiers` op with its fields, V02 §4.6's bends (the sealed form `none` among them), the roof and base `setAttr` bends, the why facts, T9's tier controls with V09 | T-V2-19, T-V2-48 | + 1–1.5 pw |

**Dependencies.** M3a-V2 needs the base's deck plots (item 246), V11's `deck` rows (X16; C3b — until they land the
table is empty and no deck plot exists, V11 §2.1's empty-table rule, so T-V2-47 waits for them) and its specialisations
(X17; without them only the fixture's declared class and the `family` op reach `stepped`); V03's plans of tiers (X18)
follow M6b as its plan rung does, while V03's eager facts at M3a (`ground(b)`, `floorCm`, `basementDoor(b)`,
`stackAccessDoor(b, a)`) read the stack helpers M3a-V2 exports and land after them in the same milestone.

### 8.6 Ruin and disaster in the build (items 123, 122)

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6b**, added — the exterior's damage at the later of M6b and V03's item-123 plan step (V03 §8); the ruined look with it, once item 122's base parts (M3b) and V01's `disasterSource` and `disasterDistricts` (M5) stand | `exteriorDamage` in the generation worker and its damage marks with their re-emission (V02 §5.7 (8)); V02 §5.7's drawing in every shipped family — the holes, gaps, rubble and patches, the massing reading's tone and dash, the fire's blackening — the SVG semantics and the export rows of V02 §5.5; V02 §6.6's memo; the pin registrations of T-V2-59 (d) and T-V2-60 (c) | T-V2-59, T-V2-60; V02 §6.6 measured | + 0.5–1 pw |

Until V03's item-123 step lands no plan carries a damage layer, so the element reading draws nothing and the massing
reading stands; until V06's decay level lands (M6-E) the level is read from the existence state alone at V11's default
age (V06); at THORP, HAMLET and VILLAGE the look's units wait for V07's ends (V07 §8).

## 9 Decisions

Each row is final unless the owner or the Fable retrovalidation vetoes it; each is "chose X over Y because Z". A row
another row supersedes or amends carries one mark naming it, and the governing row keeps the reason.

| id | decision |
|---|---|
| J-V2.1 | Chose to make stage 3's **massing the eager `outline()` at S11** (model data: the footprint, heights, shadows and capacity read it) over keeping the base outline and composing only lazily, because the owner's buildings must show their composed plan — courts, cross-wings, towers — at every zoom with one footprint hash across LOD (O17 (i)), and the massing costs ≈ 3 % of the first map (V02 §6.1). |
| J-V2.2 | Chose to let the **massing own every height and ring**, the composer never re-shaping a wing or changing a covered storey, over using the base contract's allowance for taller composed sections, because shadows, the 3-D export and the capacity must never depend on a click (§6.2: a click changes no digest). |
| J-V2.3 | Chose **tiled ranges and blocks** (butt joints at right angles, mitres otherwise; a block splits the range it straddles) over Fantasy Manor's overlapping blocks, because tiling keeps §2.6's cheap pairing tier and an exact capacity; **towers overlap** (tier (iii)) because a round ring cannot tile a rectangle without non-rectangular wings. Item 59's ADOPTED block/tower distinction holds — **a block's roof is always a hip, never a pyramid** (its ridge ends inset by `WingRoleRow.hipInset` × span — under `FM` the measured-rate entry of V02 §3.10.8), and **the square pyramids are towers standing on blocks** (M8's candidate (d), contained in its block, weight 0 by default and calibrated under `FM`). |
| J-V2.4 | Chose to put **towers and turrets first in wing order** over path order, so §2.6's clip order takes each tower whole (a round room per storey) and each range less its towers, and no seed piece has a hole. |
| J-V2.5 | Chose to keep Fantasy Manor's **regular, star and arc families behind the `fantasyShapes` model toggle, off by default**, over its equal weights as the default, because the owner adopted "realism in the base, fantasy as toggles" (D-7); the `FM` preset turns them on at the reference's weights. |
| J-V2.6 | Chose **composed wings and towers that name their base wing by key and store no ring** over storing composed rings, because one geometry source removes a class of carry bugs (the write that survives one path and ghosts another) and makes a mutation's re-match trivial. |
| J-V2.7 | Chose **dormers and gables that never project past the eave** — a projecting bay is a block, which the footprint shows — over Fantasy Manor's projecting cross-gables, because a projection would leave the footprint (the stage-3 contract) and possibly the plot (item 59). |
| J-V2.8 | Chose **orientation by the frontage and fitting in the frontage-aligned largest inscribed rectangle of the slot hint** (`plotRing` following the hint itself) over a random rotation or a free fit in the plot's OBB, because item 59 keeps our plot rule and a building must never leave its plot. |
| J-V2.9 | Chose to derive the **`rooms` rung only with the plan** over deriving it under `view`, because nothing but the plan draws it and its cost would be wasted on a pan. |
| J-V2.10 | Chose **per-wing keyed composition draws** (creation index from the wing's key) over per-building draws, so every wing a mutation keeps recomposes byte for byte without storing the composition — item 18's "keep what fits" by construction. |
| J-V2.11 | Chose to **lay a mutation's target family around the kept ranges** (the growth lattice, anchored mode) over re-running the family and matching after, because item 18 (a) wants "the old house still recognisable inside the new workshop". |
| J-V2.12 | Chose to **draw a mutation's target family** on `siteplan.mutate` over the reachable, feasible families over taking the heaviest, for variety across a town; the stream keeps it deterministic and reversible. |
| J-V2.13 | Chose to **keep a row building's quads** through every designation change that keeps the `row` arrangement (only its back range and storeys change) over re-laying rows, because the quad is the plot's (shared party walls) and item 31's geometry floor protects built stock. A change to a `compound` arrangement keeps the quad byte-identical as the compound's frontage slot and adds the target's main structure behind it (V02 §3.9 W3b). |
| J-V2.14 | Chose a **back range by band** for rows, houses and cottages over leaving rows unarticulated, because rear ranges on burgage plots are the historical norm, the yard behind stays (the coverage cap), and it carries item 19's "scale in structure" to the commonest building. |
| J-V2.15 | Chose **porch kinds filtered by the free space in front of the door** — a flush front takes a recessed porch or none — over Fantasy Manor's porch lottery, because no porch may stand over a street. |
| J-V2.16 | Chose **a closed ring with a gate hall** (the court a footprint hole, reached through the front range) over an open ring spanned above, which would need an in-plot passage face, because item 30's passages are block-level and courtyard houses and inns were entered through a gate hall. |
| J-V2.17 | Chose **two event kinds with op unions** (`setMassing`, `setComposition`) over one event kind per operation, keeping item 101's small vocabulary and one dry-run path per kind. |
| J-V2.18 | Chose **geometric edits that draw nothing** — an omitted value takes the row's central value — over drawn defaults, so the tool behaves predictably; the `setMassing` `family` op is a designation mutation and **draws on `siteplan.mutate`** exactly as one (V02 §3.12), replayable because that stream is a pure function of its key. |
| J-V2.19 | Chose to **switch the composed massing off under the `MFCG` and `FTG` presets** (the base outline) over composing under them, so §13.5's parity rows stay on the references' behaviour (item 23). |
| J-V2.20 | Chose a **building-scope `FM` preset whose element rates are calibrated to Fantasy Manor's measured outputs**, not copied from its code, over a constant table taken from the code reading, because §17.1's clean room admits the code only for understanding, while emulation-first (item 23) still wants the reference's behaviour reproducible. |
| J-V2.21 | Chose **one planar, non-overlapping roof plan per building** (the roofscape) drawn and exported by one function over independent per-wing roofs painted in order, because valleys, walls and towers come out right, the light pass gets exact normals, and the exports agree with the picture. |
| J-V2.22 | Chose to keep the **shadow casters on the model's wing prisms** over casting from composition parts, so **no shadow of the model's masses depends on a click**; the surface-layer shading of a porch, the dormers and the cupola appears with their drawing — view only, no digest. |
| J-V2.23 | Chose to **repair the size budget by scaling and dropping parts**, never by asking for land, over a JOIN inside the massing, because land is S10's and the mutator's and the massing must stay a per-slot pure function. |
| J-V2.24 | Chose a **second admission bound for the composed classes** (≤ 60 µs median, ≤ 250 µs p99) beside the base's town-wide 10 µs median, over one 10 µs bound per class, because the composed classes are a few per cent of buildings and inherently heavier, while the town-wide median and the mean bound the first map. |
| J-V2.25 | Chose **one façade-bay rhythm** (`facadeBays`) for dormers, the plan's windows, lit windows before a plan and decorative chimneys over separate spacing rules, so the picture stays consistent when the plan arrives. |
| J-V2.26 | Chose to **raise a tower's eave above every roof it overlaps** over a per-pixel height sort, so plan occlusion is a subtraction and every tower reads as rising through the roofs, as towers do. |
| J-V2.27 | Chose a **separate `@plat/buildings` package** between `plots` and `labels` over folding the composer into `@plat/plots`, keeping S11 small and the interface (in `plots`) apart from its implementation. |
| J-V2.28 | Chose a new roof kind **`shed`** over drawing lean-tos and outshots as gables, for realism on the commonest additions and on lean-to shelters (item 70). |
| J-V2.29 | Chose **tower ring side counts by radius** (12 / 16 / 24) over one count, so a small turret keeps its sides above `minEdge` and a great tower looks round. |
| J-V2.30 | Chose **V11's four anchor bands (poor, modest, prosperous, rich) with V11's derivation for squalid and comfortable** for every row of `composition.json` over three anchors with midpoints, so **one band-anchoring rule serves every template-like table** and the massing bends where the size budget bends. |
| J-V2.31 | Chose to **measure the porch's space on the building's own plot** over the neighbourhood around it, so the rung stays a function of its building and plot (§4.1's contract). |
| J-V2.32 | Chose **M6 after M5 in three parts, the massing first** (with the roofscape) over the composer first, because the massing is on the first map and is what every view shows; V03's P0, P1 and P3 run on the base's buildings after M4 (V03 §8; J-V3.132; J122), the plan rung taking the composer's rooms and dormer rows when M6b lands, so this volume's `facadeBays` is built first, as its own item (V02 §8.1). |
| J-V2.33 | Chose **V11's family-keyed `HeightsRow`**, with V02 supplying three columns (`attic`, `parapetCm`, `towerStoreyCm`, item 427), and **one pitch rule** (`roofPitch × ClimateRow.roof.pitch ÷ pitchRef`, clamped) over V02's own class-keyed heights row and a climate-only pitch, because one content owner and one key avoid a second source of truth, and the climate still steepens or flattens every family's roof. |
| J-V2.34 | Chose **one resolution chain** — the template's key, a class override, a village class map, the template family, a full default per arrangement; for other slots the slot's key, the role key, `outbuilding` — with **rows per V11 template family and per structure role**, class rows only as overrides, and an **arrangement law checked at load**, over rows per class, because the roster has ~180 classes plus generic, custom and village ones while their shapes follow V11 §3.6.1's template families (35), and a row that contradicts its arrangement must never be read. |
| J-V2.35 | Chose a **slot-level size band** (`[p10, p90] × footprintShare ÷ count × buildingScale × sizeFactor`, the p10/p90 ratios **V11 §3.6.1's derivation ratios, mirrored as `sizeBandLo`/`sizeBandHi` (0.7 / 1.45, fixed)**, over 0.75 / 1.35), an **M3 least-footprint budget test** and an **M10 shrink that lowers the clamps and then falls down the reverse lattice**, over scaling alone, because the clamps undid the scale and T-V2-29 and T-V2-30 could not both pass; and chose a **manor override in V11's rows** (prosperous 420 m², rich 650 m², plot 3 000 m², main share ≥ 0.6), which V11 §3.6.1 carries (J-V11.39), for the owner's "giant manor … bigger courts", M3's test still removing any court family a plot cannot hold. |
| J-V2.36 | Chose to read **the composer's rooms at the occupants' band**, emit the hall and chapel only for the `house` unit form or a programme hall, and clamp the hall to its programme row, over rooms fixed at the built band, because item 28 (f) keeps the shell and lets the interior follow who lives there. |
| J-V2.37 | Chose **the range opposite the gate as a closed ring's `main`**, the hall entered by a court door where the main door opens into the gate hall, over leaving closed families without a `main`, because courtyard houses and inns had their hall across the court from the gate. |
| J-V2.38 | Chose a **sunlit bias on the mirror coins** (`sunBias` 0.7; 0.5 in the parity presets `MFCG`, `FTG`, `VG` and `FM`, each with its own entry) over fair coins, because item 102 (d)'s "the rich seek the sun" reaches the building's garden and court side, and historical houses turned their courts to the south; the frontage orientation is never changed, and the bias is not scaled by band (passive orientation was common at every band). |
| J-V2.39 | Chose that **only a wing the mutator adds** over a sealed void draws for an access (keyed by its wing), that a `setMassing` op draws none (the user declares `addUndergroundAccess`), and that a replacement draws as new, over drawing on every massing change, because growth by new foundations is the owner's "more digging" while a hand edit must stay predictable. |
| J-V2.40 | Chose **the rear side by the outward normal away from the access**, independent of the ridge, over "the eave side farther from access", because the ridge is decided later and a gable-fronted row's eave sides are its party walls. |
| J-V2.41 | Chose **two orientation laws beside the frontage** (`fallLine` for the longhouse, `water` for mills and landings) over frontage-only orientation, because V07's longhouse rule is hard and a mill's wheel must stand on its water (realism tiebreaker). |
| J-V2.42 | Chose **attached structures** (a wheel, sails, a church's west tower and porch, a court institution's ranges) laid by the main slot's massing over separate slots, because they are parts of one building historically and a separate slot could not touch its host (item 304). |
| J-V2.43 | Chose to **shift the geometry value by the use's significance** (half a band per doubling, at most one band up, never down) over ignoring it, because a landmark or a weighty custom institution must read larger (item 104) while a weak one never shrinks built stock. |
| J-V2.44 | Chose **one main porch plus an optional secondary hood** (0 by default, calibrated under `FM`; buildings with two or more porches reported against the reference's 10 / 41) over the reference's up-to-three porches at any door, because historical houses mostly had one porch at the main door; recorded as a departure. |
| J-V2.45 | Chose to add the **half-round porch at weight 0 in the default rows** over a default weight, because it is Fantasy Manor's commonest porch but rare in the realism base; the `FM` preset calibrates it. |
| J-V2.46 | *Amended by J-V2.108* (the lift's wings). Chose a **raised-choir crypt** (the crypt's floor above the water table, the ground wings over the basement's ring lifted by `crypt.clearCm`) over exempting the cathedral from the water table (a crypt that floods) or a refusal (a cathedral with no crypt), because the owner's "the cathedral always has a crypt" is unconditional and a raised choir over a crypt is the historical answer on wet ground (J111). |
| J-V2.47 | Chose **our own ids** (`regularCourt`, `starCourt`, `chordArc`, `rectCourt`, `gridWalk`) with a table-migration row over the reference's layout routine names, because §17.1's clean room forbids transferring its identifiers. |
| J-V2.48 | Chose **a canonical wing order (towers first, then by key) and wing references by key** (item 225) over index references, because V02's edits add and remove wings and an index would silently re-point a stored door or room. |
| J-V2.49 | Chose **the cupola as a massing draw recorded on `MassingRef`**, drawn from the district band and never in `Heights`, over a composition-rung ornament, because landmarks need their silhouettes before any click (NG C2) while shadows and capacity must not change. |
| J-V2.50 | Chose to express **the cross plan, the kiln, the chapter house and the tower on a block** with the existing constructions (`cross` as a main range with a two-piece cross slab; kilns and chapter houses as rangeless `towerHouse`s; the block tower as a contained square) over new wing kinds, keeping one geometry vocabulary. |
| J-V2.51 | Chose to answer "why this shape" through **V10's existing `WhyAnswer` fields** (alternatives as fact rows, recomputed without advancing a stream) over a new typed field, so no volume-10 change is needed. |
| J-V2.52 | Chose a **narrow `wingsInputs` digest** (the base wings, the main entrance, the massing reference, the slices, the porch's neighbourhood) over the building's whole leaf digest, because dormers and porches read nothing else and a relet must not mark a town stale at every epoch. Item 261 writes the per-rung lists into §2.8's `inputs` comment, its `stale` sentence and §4.1's list as well as the `slices` comment, so an implementer holding the base alone stales `wings` only on `wingsInputs`. |
| J-V2.53 | Chose to **request the `wings` rung under `view` only at the neighbourhood band and finer**, with a pre-decided slicing into 16 ms batches, over requesting it at the district band, because the district band draws the massing's roofscape and §12.7 bounds a tile at 16 ms. |
| J-V2.54 | Chose to compose a **split site as two ordinary buildings** by the class's `split.works` and `split.shop` families, a merge-back as two mutations in one event, over a special two-plot building, so every lifecycle path reaches both by the ordinary machinery (item 105 (h)). |
| J-V2.55 | Chose **ladder members as ordinary buildings of the lesser class** and a SIZE step as the greater class with `sizeFactor`, the upgrade keeping member #1 (W3b where the arrangement changes), over a ladder-specific massing, because item 108 asks for real buildings that scale with the population. |
| J-V2.56 | *Amended by J-V2.96* (the keys). Chose a **V02 table (`composition.classFamily`) for V07's village classes**, the one source of their composition keys, read at the chain's step 3, over a `templateFamily` column on V07's rows as that source, so every village class resolves; V07's `v.` rows name a V11 §3.6.1 `templateFamily` for their budget rows only (J-V7.82, J-V7.101), read at the chain's step 4 after this table, so no column supersedes it. |
| J-V2.57 | Chose to **keep `MassingFamilyRow.wings` and `.joints` as M13 checks** over deleting them, because a structural check on each family's construction catches a construction bug at the building, where M14's ladder repairs it. |
| J-V2.58 | *Retired:* a process choice (the lane that wrote item 110's building parts), kept in the validation records; it carries no design content. |
| J-V2.59 | Chose **stacked wings — a tier is a base wing standing on another (`BaseWing.on`), its `baseCm` the lower wing's deck level** — over a separate tier record or a composition-only stack, because heights, casters, capacity, the carry, the exports and the edit paths then serve tiers unchanged, and "each tier casts its own shadow" holds by construction (one prism per wing). |
| J-V2.60 | Chose **solid wings** (`solid`, floors 0, the height in `eaveCm`) over storeyed tiers only, because a stepped pyramid is rubble fill without rooms and a stair is a solid; the capacity and the plan must not count either. |
| J-V2.61 | Chose **stairs as solid `shed`-roofed wings laid on the terrace below**, the stair side's inset deepened to hold the run, over stairs cut into the upper tier or projecting through the step, because every tier then stays a simple nested ring and every stair is contained in what it stands on; both the stepped pyramid's great axial stair and the terraced palace's flights along the faces are reached. **Its cost:** with each front terrace holding a whole flight, the summit stands `(Σ f_k − (n − 1)d) ÷ 2` behind tier 0's centre, 2.4 / 3.6 / 3.3 / 4.4 m on the stepped temple's median stacks at its grade 1.0–1.2 (receipt, V02 §3.10.3) — accepted as the price of nested rings and contained stairs, the steeper stair (as the stepped temples of the Americas were climbed) bringing it down, and shown to the owner's panel (V02 §7.5 (3)), which may veto it toward stairs cut into the tiers. |
| J-V2.62 | Chose to keep **the tier geometry cells in `composition.json`** (V02) and **which classes build in tiers, with their chance and cap, in V11's class rows** (X17), over V11 holding the geometry, because item 110 (c) splits them so ("composition rows (V02) and class rows (V11)") and one fact must live in one place. |
| J-V2.63 | Chose that **a stepped row is reached only by name** (V11 §3.24.3's culture × class specialisations, a declared class, the `family` op) and that no default Western row lists `stepped`, over a small default share, because the design's centre of gravity is Western (D-7), item 23 forbids a hard-coded universal, and item 110 (f)'s no-op pin must hold. |
| J-V2.64 | Chose to **ship the tier construction at M3a in `@plat/plots` as a base outline-builder construction**, the same exported `layTiers` that V02's massing and V04's ruins call, over waiting for M6, because item 110 is "built with the editing and authoring milestones" and its second known-city fixture at M3a has a stepped temple; one function keeps the M3a and M6 results byte-identical (T-V2-46). |
| J-V2.65 | Chose **a tier's storeys and height through the base's `setAttr` of heights from M3a, and the `tiers` op from M6c**, over a new event kind at M3a, keeping item 101's vocabulary and M3a small. |
| J-V2.66 | Chose to **derive a wing's storeys (`storeyRange`) from `on` and the floors beneath, never storing a level offset**, over a stored `levelFrom`, because a derived value cannot disagree with the stack after an edit (the write that survives one path and ghosts another). |
| J-V2.67 | Chose that **a deck building's footprint band is the deck row's, replacing the template's, with its storeys capped**, over the template's band clamped, because item 110 (d) asks for a "small, light" deck budget whatever the class's usual size. |
| J-V2.68 | Chose **no basement, crypt or dig on any deck, a mole included**, over a masonry-mole exception, because the deck is not ground; an `always`-crypt class is never a deck class (V11's load check), so the no-refusal crypt ladder never meets a deck. The gate reads **the use, not only the class** — a use to which a dossier crypt record binds is never placed on a deck either (`deckOk` per use; a hand placement bends landward; a mutation relocates the use), because the dossier is the sole immutable truth (items 20, 22) and a bridge chapel may carry a recorded crypt; and **a quay built on the bank is ground**, not a deck (the terrain datum, the ordinary basement gate, a dig floor), so "the deck is not ground" covers moles, piers, bridge decks and quays built out over water. |
| J-V2.69 | Chose that **placed landmarks on a deck (a mole-head or mid-mole tower or fort, the lighthouse islet's tower) read their classes' own rows** with their templates' budgets and floors, over the deck budget, because item 110 (d) names them "placed landmarks" apart from the frontage plots' small buildings. |
| J-V2.70 | Chose to **bend a hand edit's storeys to the deck's `maxFloors`** while leaving the footprint to the plot, over applying M10 to hand edits or leaving storeys free, because the storey cap is the deck's load (a structural fact) and the plot already bounds the rest. |
| J-V2.71 | Chose that **no building stands on a raised way's deck**, over admitting one, because item 110 (d)'s hosts are a mole, a pier, a quay platform and a bridge deck. |
| J-V2.72 | Chose to **add no building-side retaining-wall rule** — the massing reads only `H` and the levelled datum — over a wall setback or a wall-hugging range in the massing, because S10 and S11's levelling and the site plan own where a wall runs (item 110 (a)). The rear setback may be 0 (a row built against the terrace wall), and **the datum reads the building's own terrace** — a sample within `terrace.wallBandCm` of a wall is taken on the centroid's side (item 231) — because a sample on or across the wall's line would read the platform across the wall, floating the house toward the terrace above or sinking it toward the one below; the massing itself adds no wall rule. Every datum sample is §4.7's `levelledGroundCm` (item 309; item 370), the levelling a platform datum never written to the raster, so the move keeps that one reader on the wing's own terrace — the terrace §2.7's `stepProfile` reads on each side of the wall. |
| J-V2.73 | *Superseded by J-V2.79* (ground wings beside a stack; a block beside it as a range). |
| J-V2.74 | Chose the **stair fallback `axial → flights → internal`** (internal only over a storeyed tier 0), then the family's lattice, over refusing the stepped family where the plot is shallow, so a stepped class keeps its tiers on most real plots and every fallback is reported. |
| J-V2.75 | Chose **pent skirts as ordinary `hip`, `pyramid` or `cone` roofs clipped where the tier above rises** over a new roof kind, keeping one roof vocabulary; the skirt's pitch is capped so it meets the tier above within its ground storey. A pent roof is built as **band facets** between its ring and the ring above (V02 §5.2 step 3), not as a hip to the midline or a pyramid to one apex, so `ridgeCm = eaveCm + p × d` is the height at which the skirt meets the upper wall; and **pent only with equal insets** (`internal` or `none`), since an axial or flights front inset leaves no single `d`. |
| J-V2.76 | *Superseded by J-V2.79* (removing a stair bends to `internal` or `none`). |
| J-V2.77 | Chose to **export a stair as a CityJSON `BuildingInstallation` and a stepped glTF solid**, and each upper tier as a `BuildingPart`, over folding them into one solid, because the standard has those types for outer stairs and building parts, so viewers and GIS tools read them rightly. |
| J-V2.78 | Chose to **compute the building's heights as the stack's envelope only when a wing stands on another** over changing M11's rule for every building, so every other building keeps its bytes (the no-op pin) while §8.4's caster ceiling and V05's clearance see the top of a stack. |
| J-V2.79 | Chose **a named bend for every structural limit of V02's edits** — the sealed stair form `none`; ground wings beside a stack (the nesting and the stair chain read only the wings with `on`, so ground wings break neither); a block beside it as a range; removing a stair as `internal` over a storeyed tier 0 and `none` over a solid one (a sealed stack, as the early stepped royal tombs, is a lawful building whose unreached tiers V03 flags); `tiers` on a non-stepped building as `family: 'stepped'` first; `internal` over a solid base as `none` (all solid) or `axial`; `single` for `family: 'stepped'` on a deck; the building's removal for its last wing (and for tier 0 with nothing beside it); the party-wall line's move for a row quad's reshape and a gap for its removal; a too-small wing grown; an op beyond the plot clipped with `join` offered; an unreachable family as the nearest reachable one; a gate hall with no gate range as a gate passage — over refusals with offers, because item 101 R2 lets a tool refuse only what item 20 forbids and what a lock protects. Two limits of it: `none` is lawful wherever tier 0 is solid, not only where every tier is (an unreached shrine on a sealed stack is the same case, and it gives removing a stair a lawful bend on a platform under storeyed tiers); and removing a row quad that is not the last wing leaves a gap rather than moving a plot line (the nearest form of a removal is a removal). |
| J-V2.80 | Chose to **split the stepped construction into a pure `layTiers` (the geometry, ST2–ST7, with a typed failure) and an exported `massStepped` (frame, `slotBand`, ST0, `drawTiers` on `massing` 8–9, ST8, the attempts and the fallbacks)** over one function with a partial contract, so the M3a builder and stage 3 share every step that decides the bytes (T-V2-46 compares one function) while the `tiers` op, the mutator and V04 take only the geometry; `MassingRef` with `stack` reaches M3a with it (item 229), with a stack migration row, and `stepped` joins the M3a drift list. |
| J-V2.81 | Chose **one building-level datum pass, `rebaseStack`, that every re-basing path calls** for a building with a stacked wing — S11, a commit, a tier edit, the terrain operator, a warp or vertex move, the carry, the crypt lift, a deck's re-base — over per-wing re-basing in call order, because a stacked wing's datum is another wing's height and a per-entity pass leaves it stale (the write that survives one path and ghosts another); a stacked wing's `baseCm` is not user-editable (it bends to its support's height). |
| J-V2.82 | Chose to **raise a stack under Works in stack order, a solid wing by courses of `storeyCm.upper`**, over one fraction for every wing, because a tier cannot rise before the tier it stands on and a solid wing has no storeys to count (item 318). |
| J-V2.83 | Chose **the stair's foot as a solid stack's main entrance, with the plan rooted at the first landing door** (and no plan above the ground for a building with no storeyed wing, its basement and access heads still planned; a sealed stack with a storeyed shrine keeps the shrine's plan, unreached), over a main door on the shrine, because *Entrances* rule 1 puts the main entrance on the footprint and a solid stack has no storey there (item 230). |
| J-V2.84 | Chose **an elliptical two-ring `ovalCourt` family** — an arcaded façade ring and a solid seating ring round an open floor, gate passages at the major-axis ends — over the court-institution's rectangles or the fantasy `regularCourt`, because the amphitheatre is a historical form the owner's second fixture names and solid wings carry the seating; shipped as `massOval` in `@plat/plots` from M3a (the fixture stands there), with an `arena` row that fills its precinct (`claimShare` .5–.8) and a V11 plot override (X27); and chose the floor's bar at least 10 % of the hull over 35 %, because the historical amphitheatres' arenas are about 13–20 % of their hulls (the largest ≈ 13.5 %), so 35 % would forbid the real form. |
| J-V2.85 | Chose **each stacked storeyed tier's first storey a principal floor of `storeyCm.ground`**, its others `storeyCm.upper`, over one storey height per wing, because each tier is its own building level with its own ground floor (as terraced palaces' terraces were entered at a principal floor); V03's `floorCm` reads the tier's two heights (X18), and `Building.heights.floors` counts the stack's levels (`1 + max storeyRange[1]`). |
| J-V2.86 | Chose to **derive a rect tier 0's aspect from the drawn stack's own needs** (ST0's closed form at the drawn count, step, heights, grade and stair width), clamped to the row's aspect cell, over drawing an aspect independently (a .68–.78 draw), because an independent draw mismatches the draw it must hold: the receipt's Monte-Carlo gives 14–27 % truncation with drawn aspects and 1.0–7.6 % with the derived one on the same hints (V02 §3.10.3); ST1 draws no aspect. |
| J-V2.87 | Chose **a claim-sized band — `claimShare × area(H)` — read by `slotBand` wherever the row carries `claimShare` or the template's footprint is "the claim's"**, with the shared default `claimLo`, `claimHi` 0.35, 0.6, over a `stepped`-only constant, because the palace override's courts, the great temple and the arena have the same gap (no template number) and one rule fills it: the precinct the site plan gave the slot sizes the building. |
| J-V2.88 | Chose **family rows for V11's three new template families** — `burial-ground` (the mortuary chapel's small single range, reached through `roleKeys`, over mapping it to the `chapel` family row, whose templates at .1–.5 would give a one-cell mortuary chapel a nave-sized plan), `fort` (a battlemented keep sized to the fort budget; its second tower the `tower` row, its gate the `gatehouse`, its barracks range `barracks`) and `arena` (the `ovalCourt` row as its own family, its `gate`s absorbed as M5's passages — the major-axis pair, then the minor-axis chords for a third and fourth) — with a `charnelHouse` role row, a `lychgate` role row that is a roofed gate at the poor and modest bands and a gatehouse at the prosperous and rich, and the exemption that a template with no required structure has every drawn structure read its role key, the first drawn being the main building, over mapping the lychgate to the `gatehouse` row at every band or giving the first drawn structure the family chain, because each structure then keeps its own historical size and the compile check stays total. |
| J-V2.89 | Chose to **clear every building whose footprint meets a new raised way's piers or under-deck strip, on every path**, over exempting buildings below the deck's underside less a clearance, because item 110 (b) keeps the spaces between the piers open or vaulted, V01 makes the strip a hole, and a way founded at an epoch must leave the same ground as the same way regenerated at its address; the soffit bound over a crossed way is item 244's clearance rule (V02 §3.17 (b)), and V02 keeps no clearance of its own. |
| J-V2.90 | Chose **one tread law, `stairTreads`** — `⌈rise ÷ riserMaxCm⌉` equal risers, the run divided among them in whole centimetres — read by the map, the exports, V01's hatch and V03's exterior flights, over a fixed plan pitch (`treadM`) or V03's interior going, because the flight's rise, run and grade are this volume's and the picture, the plan and the 3-D solid must show one set of treads. |
| J-V2.91 | Chose to **raise the ground wings over a `half` basement by half the cellar depth** (a basement that is only a crypt: the wings over the crypt's ring), carried by `deriveBase` on every re-basing path while the basement stays half and read by the gate without the raise, over sinking the half cellar's floor a full depth below the datum (below the water table the gate chose the half form to avoid) or keeping the gate's half-depth floor with no raise (a cellar storey about 1.1 m high the plan cannot furnish), because a raised ground floor over a half-sunk cellar is the historical form (PLAUSIBLE, general knowledge) and it reconciles the base's two sentences on the half cellar's floor; should the base's basement rule ship before item 226, the change is a declared one-time shift (§13.3). |
| J-V2.92 | Chose the **crypt seed order** template parts (`chancel`, else `apse`, else `crossing`) → a stack's tier 0 → the east-most storeyed range (ties by key) → none, in **one exported function** (`cryptSeedWings`), over leaving the seed to each reader, because the base's basement function, V03's crypt placement and the tests must read one set of wings; a church's chancel is its crypt's historical place and a stepped temple's chamber lies in its platform (V02 §3.14.5 (d)). |
| J-V2.93 | Chose **`facadeBays` on every ring side** — eave sides as before, other sides without the valley term and with no bay where the run is not positive, a tower's bays round its free perimeter — over V03's per-side restatement without the deductions for meeting towers and wings, because one rhythm must serve the plan's windows, the lit windows and the dormers on every face, and a round tower's short facets would otherwise hold a window each or none. |
| J-V2.94 | Chose to **write the use's stepped specialisation into `siting.declared`** in the same undo group as a bend or `family` op to `stepped` (and `none` on the way back), over leaving it to a separate declaration, because the specialisation, the heights row and V03's plan rows must follow a hand-made stack, and V11 holds a user's specialisation on the use through that table only. |
| J-V2.95 | Chose to **clamp the hall by its wing alone before V03's programme rows are loaded**, reported (`hallUnclamped`), and to move T-V2-35's plan-units clause to V03 (T-V3-25) and its hall-area clause to M6-P's P1, over holding M6b's exit on the plan rung, because M6b precedes the plan rung and its exit must be executable at M6b. |
| J-V2.96 | Chose to **key `composition.classFamily` by V07's `v.` keys with no scope column**, over keeping the town ids with a `village` scope, because a `v.` key and the town key of the same word are two classes (V11 §2.9; J-V7.95), a town class at a village rung plays its `villageForm`'s `v.` class (V11 §3.22) and so never needs a village dressing of its own, and this table is the one source of the village classes' composition keys, which V07 cites (J-V7.82); the `v.longhouse` override row takes the class's own key, and a load check pairs every `v.` class with exactly one row. |
| J-V2.97 | Chose **V12's `reference` run against Fantasy Manor** (`layer: { preset: 'FM' }`) on V12's `fm.*` metrics to set the `FM` preset's measured-rate cells, with the free-frame harness as its fixture and V12's outcomes (`fallback-applied`, `not-achieved`) as the failure branch, over a V02 harness calibration run with its own fallback, because V12 §3.7.2 (3) admits a `presets.FM` entry only by such a run and its scope guard (T-V12-9) must see every tuner; and chose **a register entry for every calibratable `composition.json` cell written at the exit that ships it**, over entries at M6c alone, so no milestone lands a provisional number without one (T-V12-20). |
| J-V2.98 | Chose to **take every ground sample of the datum through §4.7's `levelledGroundCm`** (item 370, item 231) — the vertex and centroid samples, the basement gate's fall and the raised crypt's lowest sample — over sampling the terrain raster, because item 309 makes a levelled plot, block or ward a platform datum never written to the raster, so the raster keeps the unlevelled slope and a house seated on it would float above or sink below the step §2.7's `stepProfile` derives from the same datums; the wall-band move is kept so that a vertex on or beside the wall's line reads its own platform. |
| J-V2.99 | Chose to **write V03's condition into item 371's own text** — `Basement.access` `external` only where no ground wing is storeyed, its door at V03's `basementDoor(b)` (a retaining wall's side first, else the tomb door) — together with the base's `basementAccess` comment and every base text that read `external` as a walk-out (§13.2's T29-4, a 100 % bar the all-solid temple would fail; J-A29.25's access clause, its door clause pointed at step 3; the plan rung's step-5 root clause; the six "ground storey" readings of the basement's place — item 371 (a)–(d)), step 3 and T28-3 being V03's item 578 so each base sentence has one request, the condition worded by V03's `ground(b)`, never "storey 0" — over keeping "under a solid ground wing" with a superseding note, because the base-change applier copies the request's words, a mixed ground floor (an arena's façade ring, a stepped temple's annex) must be joined by its core (J-V3.88), and V01's entrance reserve reads the same access. |
| J-V2.100 | Chose **the `FM` preset's scope as the cells that carry a `presets.FM` entry — `composition.json`'s and V11 §3.24.0's item-110 chance and offer cells (0)** — over `composition.json` alone, because V11's T-V11-21 and V12's goldens guard (V12 §3.4.4, V12 §3.7.6, J-V12.54) rely on `FM` resolving the stepped and deck families off; `FM` still zeroes no `extension` cell, so our realism rules stay on under it (item 59's KEEP OURS). |
| J-V2.101 | Chose **one register line per column family** (V02 §3.10.10) — its metric (`bldg.area`, `fm.*`, `tier.count`, `deck.buildings`, `crypt.present`, `time.model`, and `bar.T-V2-<n>` from V12's bar family, X33), method, due milestone and the fallback this volume already states, else V12 §3.11's panel rule — over per-cell prose, so each landing seat writes lint-green entries without inventing a metric; the code-read `FM` entries, the options and the keys take no entry (their `ref:` provenance, a `fixed:` note, not calibratable), and only the measured-rate `FM` entries move, by V12's `reference` run. |
| J-V2.102 | Chose to **register V02's eleven bars in one table in V02 §3.10.10** — per bar its statistic in clause order, its towns, its CI tier and the seat (the milestone that writes the line's entry), `stages` `['S11']` for all, one registration per CI tier where V02 §7 runs a bar in two, and, in T-V2-36, T-V2-42 and T-V2-46, a clause whose subject is not yet built reading −1 and left out of the verdict — over V12's generic sentence alone, because the seat would otherwise choose towns and tiers bar by bar, and the M3a-V2 and M6a entries name bars (T-V2-42, T-V2-46, T-V2-36) whose other clauses are built at M6a or M6-U, so a whole-bar verdict could never confirm them on time. |
| J-V2.103 | Chose (a) to keep `sizeBandLo`/`sizeBandHi` in `composition.json`'s constants as **fixed mirrors** of V11 §3.6.1's derivation ratios (`own`, a `fixed:` note, no register entry — the one constant of V02 §3.10.9's table that is not calibratable) over dropping them and reading V11's compiler constants, because M10 applies the ratios at run time to a compiled row whose authored p10 = p50 = p90 while V11 holds them only in its compiler, and a mirror marked fixed can neither drift by a calibration nor leave M10 without a value; and (b) to bring **item 426 and item 224 to M3a whole** with item 229 — both `composition?` fields, the `heights` comment and the hint clause — over splitting each request into an M3a part and an M6 part, because no part changes a base behaviour before a writer or a hint exists (V11's C3b replacement and the base outline builder's stepped and oval constructions are the first, both at M3a), so the earlier landing costs nothing and each request stays one text. |
| J-V2.104 | Chose (a) to **ship the `PorchKindRow`s with M3a-V2's `composition.json`** (data only; the porch itself is composed from M6b) over V01 holding porch sizes of its own until M6a, because the rows are five authored data rows with no build effort, a second copy of their sizes in V01's constants would state this volume's facts twice, and a reserve sized from the real rows from M5 leaves the hood pins where they are when the composer's porches appear at M6b (J-V1.75's order-independence); and (b) to **build item 303's hole sentence alone at M3a**, with item 229, over the whole request at M3a or leaving the arena floor to its template's yard row until M6, because `massOval`'s arena is laid from M3a and three bars (T-V2-42, T-V1-26, T-V1-54) read its floor as a `court` before M6, while the request's other sentences have no reader before M6. A base template's hole whose kind the yard rows set otherwise before M3a is retyped once at M3a, a declared shift (§13.3), over keeping template-typed holes, because two typings of one kind of place would split every reader of the court. |
| J-V2.105 | Chose (a) to **word X18's hand-off and item 371 (c)'s step-5 root clause as V02 §3.15.3 words the solid stack's door and its planned crypt**, over their older words, because X18 is what V03 builds from and (c) is base text the applier copies — a storey-less stack against a retaining wall would otherwise root its basement at a tomb door the plan never opens, and a storey-less temple's crypt would read as unplanned; (b) to **home the whole derived-at-read block of V02 §2.6 in `@plat/plots` at M3a-V2** — `rebaseStack` and `stairTreads` with the four stack helpers — over naming only the four, because `rebaseStack` runs on the base's re-basing paths from M3a and `@plat/buildings` depends on `@plat/plots`, so no function of the block can live above V03's eager readers (`ground(b)`, `floorCm`, `basementDoor(b)`); (c) to write every bar registration's `preset` as `'default'` (V12 §2.1's `PresetArm`) over leaving the field to the registering seat, because none of V02's eleven bars generates its towns under a parity preset — T-V2-37's preset clause reads the compiled cell, not a town, and the `FM` measurements are V12's `reference` run, not a bar. |
| J-V2.106 | Chose (a) to word item 230's storey-less clause by **what the stack carries, not by its stair form** — "a sealed stack whose every wing is solid" among the buildings with no plan above the ground, and a sealed stack carrying a storeyed tier or shrine keeping that wing's plan, reached by nothing and flagged by V03 — over classing every sealed stack as storey-less, because the stair form says how a stack is reached, not whether it has storeys, and a sealed temple with its shrine is the common sealed stack (V02 §4.6's bend seals a shrine-topped temple); (b) to give V02 §7.7's sealed stack fixture **two forms** (sealed with its storeyed shrine; sealed with every wing solid) over one, because T-V2-45's sealed clause has two branches and a one-form fixture would leave one of them without a subject; (c) to type `rebaseStack`'s ground reader as **a plain function of a point, `ground: (p: PointCm) => Cm`, that each caller builds from `levelledGroundCm(doc, key, ·)`**, over passing the document and the arena key into `rebaseStack`, because the pass reads only heights at points, every calling path (S11's datum step, the edit operators, the carry, the crypt lift, a deck's re-base) already holds its document and the plot's arena key, and the base's raster `TerrainSampler` is the reader item 370 removed from the datum; and (d) to keep item 230's first clause (the stair's foot as the entrance of a building with no storeyed ground wing) as written, the sealed clause after it naming the sealed form's entrance, because ST7's hint places that entrance exactly and the general-then-particular order reads the all-solid sealed stack first. |
| J-V2.107 | Chose (a) to **give stair 0's approach strip its own V02 §1b row while keeping its one statement in V02 §4.6's ground-wing bullet**, the row's kind cell pointing there, over moving the definition into V02 §3.15.1's construction, because V03's two door functions cite the strip "as V02 §4.6 bounds it", no step of the construction lays or stores it (ST2 – ST7 place the reserve and the stairs; the strip only bounds what may stand in front of stair 0), and a moved statement would break a citation for no change of mechanism; and (b) to **name the strip among `landingM`'s consumers** in the constants row. |
| J-V2.108 | Chose to **key the raised lift and the crypt-only half raise on the ground wings over the basement's ring**, over the crypt's seed wings, because V03 derives basements under other wings — the ground wings' whole inset of a crypt no stair reaches (V03 §3.7.4), an author's crypt ring on a building without a basement (V03 §4.2) and the far-third seed where `cryptSeedWings(b)` returns none — and under the seed-wing key each of those put storey −1 into an unraised or unlifted storey 0. A derived crypt stays under its seed wings on the `half` and `raised` rungs (V03 §3.7.4 step 2), so J-V2.91's raised choir over a half-sunk crypt is unchanged; a solid tier 0 holding the crypt inside it keeps its height. No declared shift: the crypt parts are built at M6-U. |
| J-V2.109 | Chose **`valleyReach` to read a `shed` `Y`'s whole run in both modes** (V02 §3.7) over the integer form's half span for every `Y`, because a single-pitch plane runs from its eave to its high side (`RoofSpec.high`), so the plan point where `X`'s ridge meets it lies at `(X.ridgeCm − Y.eaveCm) × Y.runCm ÷ Y.riseCm` with the whole span as the run, and a half-span reach would stop the usable run — the bays, the dormers and the lit windows `facadeBays` feeds — short of where the drawn valley starts; E-27's two equivalences hold (the integer mode byte-identical on every host, T-V2-13; the float mode view data), and only a building whose valley ends on a shed reads otherwise (T-V2-54). |
| J-V2.110 | Chose to apply **item 115's rung ceiling as a cap on a dwelling's resolved row** (V02 §3.2 step 2) — its families kept to the ceiling row's `dwellingFamilies` and the arrangement's own constructions, its tower, turret and gate-tower cells zeroed, a grand class's override row skipped, every other cell kept — over capped rows of its own per rung in `composition.json`, because one filter over the rows already written keeps one source for each fact (V11's table the limits, `composition.json` the shapes) and leaves every size, roof, dormer, porch and hearth cell free to carry the wealth item 115 (a) asks small places to show; over mapping a drawn grand family down the reverse lattice after the draw, because that would pile the grand families' weight onto `T` and `L` instead of keeping the row's own proportions among the admitted families; and to record the cap's rung in `MassingRef.row` (`~<RUNG>`) over re-reading the present rung at every re-derivation, because a standing building keeps the ceiling it was built under across a rung change (item 115 (e); V06 §3.8.5) and the key is already the persisted record of what the chain reached. A row that limits nothing writes no suffix, so TOWN and above stay byte-identical (item 115 (f)). |
| J-V2.111 | Chose to **re-budget V02 §6.4's exports to the population cap inside item 119's ten seconds** — CityJSON `asDrawn` ≤ 3 s at METROPOLIS and ≤ 6 s at the cap, `derive` ≤ 4 s and ≤ 8 s, from the per-building costs of the roofscape, the meshes and their encoding and the pooled `compose()` — with the pre-decided change that a format or a `derive` the measurement cannot hold within ten seconds is offered only up to the building count it held, over keeping METROPOLIS's former lines of 10 s and 12 s, because those lines scaled to the cap's ≈ 36 000 buildings pass the comfort level, past which a wait fails (item 119 (a)); and over a switch by the clock at run time, because a budget never changes output at run time (§12.1), so the limit is fixed by the measurement and one document exports the same way on every machine of the reference tier (the low tier declaring its sizes per device). |
| J-V2.112 | Chose to draw **item 123's damage on the exterior from the plan in force** (V02 §5.7) — its damaged roof bays over rooms as holes cut from their own wing's facets, its broken outer runs of each wing's lowest storey as gaps in the outline, its repaired bays in the patched-courses pattern, all read from V03's damage layer and §6.3's keyed thresholds — over thresholds or a damage pattern of V02's own, because the owner asks the inside and the outside to agree (item 123 (d)) and only the plan's own elements can agree with it element for element; to draw **no element where no plan is in force** — the state rows alone, and a look's tone and dash — and to raise no rung for the exterior, over deriving a plan for every damaged building in view, because a typical house's plan costs 3 ms median and 10 ms p95 (V03 §6) and a disaster's districts hold hundreds of buildings, while §4.1's `elaborate` decides when a rung is derived and never what it draws, so the holes are the same whenever the plan comes; and to leave the damage and a disaster's look **out of the glTF, OBJ, CityJSON, GeoJSON and JSON exports**, over carrying them, because those carry the model's surfaces and records (a roofless building already exports no roof) while the damage depends on the drawn week, the plan in force and, for a look, the viewer's switch and key — a picture draws both and a battle map follows §11.1. |
| J-V2.113 | Chose to draw **a disaster's ruined look as item 123's damage at the higher of the building's own decay level and the look's** (the `disaster` row's `lookLevel` at the condition's severity, §10.2) on every building of every unit V01's `disasterDistricts` returns (V07's ends at the village rungs), over a ruined look of its own or a per-building share inside a struck district, because the owner's disaster takes whole neighbourhoods (item 122 (b)) and one damage design keeps the exterior, the plan and the cellars in one comparison (item 122 (d)); to give the kinds **one flavour** — a fire blackens — over a look per disaster, because soot is the one mark the damage does not already draw — an earthquake's fallen wings, towers and open roofs and a flood's fallen walls and outbuildings are the damage itself, and a flood's stained lower storeys lie under the roofs a map draws from above; and to let the look **leave no patch**, over reading its end as a repair, because the look is temporary and cosmetic (item 122 (a)) and what really breaks reaches the map only through V06's epoch path. |

## 10 Base change requests

Every request of this volume is applied to the base as the file f item named below; the base text is canonical and this
volume cites it. The milestone is the one file f records for the item.

| request | subject | applied as | base home | built |
|---|---|---|---|---|
| BCR-V2-01 | wing roles and keys | item 216 | §2.6 | BASE, M1 |
| BCR-V2-02 | the building's massing reference and next key | item 217 | §2.6 | BASE, M1 |
| BCR-V2-03 | a composed wing names its base wing | item 218 | §2.6 | M6 |
| BCR-V2-04 | porch kinds | item 219 | §2.6 | M6 |
| BCR-V2-05 | composed towers name their tower wing; composition row and grammar | item 220 | §2.6 | M6 |
| BCR-V2-06 | the path-shape rows become the massing family rows | item 221 | §2.6 | M6 |
| BCR-V2-07 | the `shed` roof | item 222 | §2.6 | M6; the `shed` kind at M3a with item 229 |
| BCR-V2-08 | `DriftBounds` typed | item 385 | §7.7 | M6 |
| BCR-V2-09 | the composition key on the template; the heights row named | item 426 | §10.2 | BASE, M3a (with items 229 and 259) |
| BCR-V2-10 | stage 3's concerns | item 341 | §6.1 | M6 |
| BCR-V2-11 | wing anchors | item 346 | §6.3 | M6 |
| BCR-V2-12 | the two event kinds, the key paths, and their lifecycle rows | item 351 | §7.1, §7.4 | M6 |
| BCR-V2-13 | the rungs' recorded inputs | item 261 | §2.8 | M6 |
| BCR-V2-14 | the `FM` building-scope preset | items 376, 377 | §7.6 | M6; the village product's part V-M0 – V-M4 |
| BCR-V2-15 | the roofscape construction, the façade bays and the paint programs | item 406 | §8.2 | M6 |
| BCR-V2-16 | F-MASSING and F-COMPOSE | item 328 | §5.2 | M6 |
| BCR-V2-17 | invariants | item 332 | §5.3 | M6 |
| BCR-V2-18 | the package | item 505 | §14 | M6 (`facadeBays` in `@plat/plots` first, V02 §8.1) |
| BCR-V2-19 | parity rows and the test pointer | item 522 | §13.2, §15.1, §13.5 | BASE, M2b for the §13.2 bullet (its T-V2-52 clause from M2b; its T-V2-44 – T-V2-47, T-V2-50, T-V2-51 clause from M3a with item 229); M6 for the §15.1 Fantasy Manor rows and the §13.5 rows |
| BCR-V2-20 | the milestone, the effort and the staged row | items 524, 568 | §16 | M6; §16's totals by item 568 |
| BCR-V2-21 | exports | item 449 | §11.1 | M6 |
| BCR-V2-22 | the stage-3 contract and the admission bounds | item 223 | §2.6 | M6 |
| BCR-V2-23 | the entrance hint | item 224 | §2.6 | BASE, M3a (with items 228 and 230) |
| BCR-V2-24 | S11 and the massing | item 303 | §4.7 | BASE, M3a for its hole sentence (with item 229); M6 for the rest |
| BCR-V2-25 | the owner's stage-3 panel | item 499 | §13.6 | M6 |
| BCR-V2-26 | three heights columns on the family-keyed heights row | item 427 (with V11's item 435) | §10.2 | BASE, M0 (b) |
| BCR-V2-27 | wings named by key under stage 3 | item 225 | §2.6 | M6 |
| BCR-V2-28 | the raised crypt and the half cellar's raise | item 226 | §2.6 | BASE, M2b for the half cellar's raise (with the basement gate); M6-U for the crypt parts (with items 238, 436) |
| BCR-V2-29 | attached structures | item 304 | §4.7 | M6 |
| BCR-V2-30 | the `fantasyShapes` control | item 402 | §7.8 | M6 |
| BCR-V2-31 | stacked and solid wings | item 227 | §2.6 | BASE, M3a |
| BCR-V2-32 | the datum of a stacked wing and of a deck building | item 370 | §2.6 | BASE, M3a |
| BCR-V2-33 | the storeys a wing reaches (with §5.3, §7.4, §10.2, §13.2's T29-4 and J-A29.25) | item 371 | §2.6 | BASE, M3a |
| BCR-V2-34 | the deck input; no cellar on a deck | item 305 | §4.7 | BASE, M3a |
| BCR-V2-35 | stacked wings in the invariants and the carry check | item 333 | §5.3 | BASE, M3a |
| BCR-V2-36 | the stack order in the per-wing constructions | item 419 | §8.6 | BASE, M3a |
| BCR-V2-37 | the effort with item 110's parts | items 525, 568 | §16 | §16's M3a and M6 rows |
| BCR-V2-38 | the main door on the part of its side the footprint keeps | item 228 | §2.6 | BASE, M3a |
| BCR-V2-39 | the base outline builder's stepped and deck constructions | item 229 | §2.6 | BASE, M3a |
| BCR-V2-40 | a stack's heights under Works | item 318 | §4.11 | M6 |
| BCR-V2-41 | a solid stack's entrance and the plan's root | item 230 | §2.6 | BASE, M3a |
| BCR-V2-42 | the wall-side datum sample | item 231 | §2.6 | BASE, M3a |

## 11 Owner questions

| question | answer |
|---|---|
| **Q-V2-1** — should SettlementForge be able to prescribe a building's shape? | **Not now** (J122; J121: the map follows SettlementForge's product decisions). The dossier says that an institution exists and what it is (item 20); its building's plan is the map's own construction (item 20 (h)). The port reads no shape field; a map user fixes a layout with an assignment's drift bounds (`DriftBounds.families`, V02 §2.1) or reshapes it with the building tool (V02 §4). |

Every other choice of this volume is a vetoable decision of V02 §9. The one the owner sees directly, the stepped temple's
summit offset (J-V2.61), is shown at his panel (V02 §7.5 (3)), reversible toward stairs cut into the tiers.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (an executed measurement or a quotation verified at source):
* The base facts this volume builds on, read at source in `docs/ARCHITECTURE.md` with files f and g: §2.5–§2.9, §3.4,
  §4.1, §4.7 S11 with its mutator, clusters, class mix and concealed institutions, §4.8's piers', moles' and quays' deck
  heights, §4.11, §5.2, §6.1, §6.3, §7.1–§7.6, §8.2, §8.4–§8.6, §8.10, §10.2, §11.1, §12.7–§12.8, §13.2, §14, §16 and the
  staged table; item 101 R2's wording (`docs/AMENDMENTS-2026-09-27e.md`: "refuses only what item 20 forbids (dossier facts)
  and what a lock protects"); items 109 (j), (k) (J111), 110 (a)–(f), 122 and 123 (J135, J136)
  (`docs/AMENDMENTS-2026-09-28g.md`).
* Fantasy Manor's five layout families at equal odds, one polyline and one wing width as its whole input, no plot, no
  metric scale, no entrance guarantee — item 59's evidence gate and `research/findings/manor.md` §2, §3.1; the measured
  element counts of V02 §7.4 (41 buildings of build 890, `captures/manor/README-frequencies.md` §3–§4); the reference
  model's cost (≈ 0.08 ms per building warm, §12.7) under V02 §6.2's `compose()` bound; NG's short-axis ridge share
  (≈ 36 %, §2.6).
* V11's 35 template families with their arrangements, main slots and structure names (V11 §3.6.1), `HeightsRow` and
  `TemplateFamilyRow` (V11 §2.8) and the heights of V11 §3.6.4 with the three columns V02 reads; the generic classes
  (V11 §3.13); the classes with no building family (`market`, `fair_ground`, `druid_grove`); the `arena`, `great_temple`,
  `burial-ground` and `fort` families with their structures and role shares (V11 §3.6.1, V11 §3.6.5); the `manor` override
  (J-V11.39); the `DigRule` rows (V11 §3.23.7); the stepped specialisations with the `siting.declared` `use:` cell
  `specialisation` (V11 §3.24.3, V11 §4.2); the `toll_house`, bridge `chapel` and `watchtower` rows; V11 §2.2's zeroing of an
  `extension` number to 0 under `MFCG`, `FTG` and `VG` absent an entry; V07 §2.4's village classes.
* The medians of V02 §3.10.3 (`docs/validation/coherence/receipts/V02/medians.py` → `medians.out`: every ratio in [0.91,
  1.31]) and of the `fort` and `burial-ground` rows (`medians_new.py` → `medians_new.out`: 1.01–1.12), re-executed; the
  stepped rows (`stepped_receipt.py` → `stepped_receipt.out`, lines 1–35, re-executed): ST0's least `Wmin × Dmin` per row
  and anchor, the median stacks (aspects .70–.78 for the axial rows, 1.2–1.7 for the palace; the temple's summit offset
  2.4 / 3.6 / 3.3 / 4.4 m at grade 1.1), the tiered tower's median stacks inside the `tower` budget at every anchor (21 /
  32 / 40 / 61 m² against 34 / 42 / 60 / 85) — the closed-form model of ST0–ST3 and ST8 in a script, not the built code.
* V03's readings this volume relies on (V03 §3.3 S6, V03 §3.1 step 2, V03 §3.7.1, V03 §3.7.4; T-V3-28): a storeyed wing on a sealed
  stack planned and flagged `W_TIER_UNREACHED`; a building with no storeyed wing has no level at or above the ground, its
  basement storeys planned alone and entered at `basementDoor(b)`; `basementDoor(b)` takes a retaining wall's side before the
  tomb door; V03's eager facts read `storeyRange`, `deckLevel` and `stairChain`. §4.7's `levelledGroundCm(doc, key: PlatKey,
  p: PointCm): Cm` (item 309) and the base's raster `TerrainSampler` (§2.3). V12 §2.1's `BenchBarDef` (`id`, `owner`,
  `statistic`, `stages`, `towns`, `tier`, `run`; several registrations of one id one vector verdict; `PresetArm` =
  `'default' | PresetId`), with no V12 `StatBarSpec` or `NullModelSpec` carrying a V02 bar.

**PLAUSIBLE** (reasoning from that evidence, until measured):
* Every mechanism, constant and default row of this volume — the families' mapping to historical plan types, the widths,
  lengths, rates and chances of V02 §3.10, the bay rhythm, the porch sizes, the tower rules, every tier cell and `@deck`
  row, and every own value (`sunBias` 0.7, `crypt.clearCm` 250 cm, `crypt.freeboardCm` 30 cm, `walkStop` 0.12, `domeRise`
  1.0, `axisSlope` 3 %, the cupola and west-tower chances, `claimLo` / `claimHi` 0.35 / 0.6, the `arena` row, `ovalSides`,
  the axis ratio 1.15–1.4, `terrace.wallBandCm` 250 cm, `vaultClampCm` 30 cm, the temple grade 1.0–1.2 and
  `stairGradeMax` 1.3, the aspect clamps) — our own design, calibratable, each with its stated fallback and test, until
  SP-V2-1 – SP-V2-4, M3a's and M6's exits and the owner's panel measure it (`sizeBandLo` / `sizeBandHi` are fixed mirrors
  of V11's derivation ratios, not calibratable).
* The least-footprint formulas of M3 and the manor override's sizes (a rich `rectCourt` at `w₀` 6 m holds ≈ 360 m², at
  7.5 m ≈ 495 m²) — T-V2-30 measures them; the METROPOLIS core's ≤ 60 buildings per neighbourhood-band tile (V02 §6.2),
  measured at M6b; every budget of V02 §6 and the effort of V02 §8.
* That V02 §5.7's reuse of the base's values — the `abandoned` row's 30 % lerp, the `decaying` row's dash, the `decayed`
  row's fill alpha, the rubble spill's density and `rubbleReachM` 1.5 m — reads as a ruined building to the owner's eye, and
  V02 §6.6's budgets — M6b's measurement and the owner's panel decide.
* The `tiersTruncated` Monte-Carlo (N = 4 000 per anchor, `stepped_receipt.out` lines 36–74, recorded output only): 14–27 %
  with drawn aspects, 1.0–7.6 % with the derived aspect on precinct hints sized for the 90th-percentile stack — T-V2-46
  measures the built `massStepped` at M3a; that `rebaseStack` keeps every stacked datum exact on the warp and terrain paths
  and that the pent band facets meet the upper walls within 1 cm (T-V2-44).
* That no document shifts from item 371 (d) (true by the reading: on a building none of whose ground wings is solid the
  ground wings are the ground storey's; not executed); and whether a mirror-coin family draws at a village rung under `VG`
  at all (the zeroing turns `massing.composed` off there unless an entry turns it on) — `sunBias`'s `VG` entry is written
  either way.
* That the default rows read as the owner's "giant manor to small hovel" ladder, and the stepped temple, the terraced
  palace, the tiered tower, the arena and the bridge street as themselves, to his eye — the panel of V02 §7.5 decides; the
  historical readings (open-hall and H-plan houses, rear ranges on burgage plots, galleried courtyard inns, gate halls,
  courts turned to the south, raised choirs over crypts on wet ground, longhouses down the slope, mill wheels on the race,
  polygonal chapter houses, bottle kilns, a stepped pyramid's axial stair and shrine, terraced palaces' flights, a pagoda's
  pent skirts, sealed step pyramids, steep stairs on the stepped temples of the Americas, chambers in temple platforms,
  bridge houses of one or two storeys, bridge chapels with crypts, amphitheatres' arenas at about 13–20 % of hulls of
  1 400 – 11 000 m²) are general architectural history, not sourced in this repository's research.

**Census** (over this file): decisions J-V2.1 – J-V2.113 (113 rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-60 (60 bars); hand-offs X1 – X37; requests BCR-V2-01 – BCR-V2-42, each applied as its file f item (V02 §10); every `J-V2`, `T-V2` and `X` id cited here is defined here, and every `V02 §` reference resolves.

## 13 Fix list

**Nothing of this volume's own is open**: every finding against it is fixed in its text. The rows below are its
hand-offs — each a rule another unit carries, closed at that destination, which cites this volume. Where V02 reads a
stand-in while the destination's part is not yet built (a build-order fact, not an open choice), the last column names it.

| # | to | what the destination carries | stand-in before it is built |
|---|---|---|---|
| X1 | V11 §2.3 | `BuildingClassRow.templateFamily` is read by S11's composition resolution (V02 §3.2) and the tables editor | — |
| X2 | V11 §3.6.1 | the compiler emits `footprintM2` p10 and p90 by the derivation ratios 0.7 and 1.45 × p50, which V02 mirrors as its fixed `sizeBandLo` / `sizeBandHi` (V02 §3.10.9) | — |
| X3 | V11 §3.6.1 | the `manor` template override: prosperous p50 420 m², rich p50 650 m², rich plot 3 000 m², main-slot share ≥ 0.6 at prosperous and rich (J-V2.35; J-V11.39) | — |
| X4 | V11 §3.6.5 | the role table's `footprintShare` per structure | `mainShareDefault` 0.6, the rest equal |
| X5 | V11 §2.8, V11 §3.6.4 | the `attic`, `parapetCm` and `towerStoreyCm` columns and their values (items 427, 435); V02 §3.10.6 keeps only the reading rule | — |
| X6 | V11's naming tables | the slice `building.wingRole`, our own word per `WingRole` (V02 §5.4), with "a tier", "the shrine", "a stair", and "the seating" and "a gate passage" keyed by the `ovalCourt` family and the wing's `solid` flag | the role id |
| X7 | the base, §10.2 (item 436; V11's rows) | the class columns `crypt` (`always`, `basement`, `never`), `cryptM2` and `rankShare` that §2.6's crypt derivation reads | built with M6-U; T-V2-36's crypt clauses run from it (V02 §8.1) |
| X8 | V06 §3.4 | the epoch casters rasterised **per wing** (each wing's prism and roof rise, V02 §3.14.1); W10 "called through the mutator" | — |
| X9 | V08 | `MaterialRow`'s rows are V11's, and `materialFamily` reaches the material row only (V02 §1d) | — |
| X10 | V09 | the `FM` building look in the style panel; tool rows for `setComposition room`, the secondary porch and `moveTower { shape }`; the `fantasyShapes` control in the advanced panel (V02 §4.4–§4.5) | the ops through the clerk and the skeleton file |
| X11 | V03 | the plan reads wings by key (item 225); unedited dormer rows follow the plan's roofed rooms and edited rows stay fixed (V02 §3.7); the choir stairs over the raised crypt's lift; the room role `gatehall` in V03's role table | — |
| X12 | V04 | the dig draw's key carries the wing key for a wing the mutator adds (V02 §3.9 W6); item 109 (k) (5)'s obstacle test reads V02's footprint and basement floor (V02 §3.14.5 (f)) | — |
| X13 | V07 | every `v.` row names a V11 §3.6.1 `templateFamily` for its budget rows (J-V7.82, J-V7.101), read at the chain's step 4 after `composition.classFamily` (V02 §3.10.5), which is the one source of the village classes' composition keys | — |
| X14 | V01 §7, V01 §5.1.2 | the NG parity sheet's rule for its roof construction (V02 §5.3 supplies `roofscape`); the `hatched` hatch program run per roofscape facet | `fakeGablePerWing` |
| X15 | V05 | the island rim-slab crypt vault as the island form of the `always`-crypt ladder (V02 §3.14.5 (d)) | — |
| X16 | V11 | the `deck` table (`DeckBudgetRead`: `footprintM2`, `maxFloors`, the plot fields the base's deck plots read) by deck kind × band; `deckOk` read **per use**, false for an `always`-crypt class and for a use a dossier crypt record binds (V02 §3.16 (6)); V09's T6 landward bend for a hand placement | without `deckOk`, every class the base places on a deck plot composes by its `@deck` row |
| X17 | V11 §3.24.3 | the specialisations of V11 §3.24.3 (culture × class rows: `stepped_temple`, `terraced_palace`, `tiered_tower`), each naming its composition key in `DesignationTemplateRow.composition` (item 426, written by item 259's replacement), with their chance and cap rows (≤ 0.1 % of buildings), the culture read through DR15; no tier geometry cell in V11 (J-V2.62) | only a declared class and the `family` op reach `stepped` |
| X18 | V03 | plans of tiers: levels by `storeyRange`; no rooms in a `solid` wing; a landing door on `landingSide` for every storeyed wing standing on another; the shrine one room by its programme; item 230's root (a solid stack's main entrance at the stair's foot, the plan rooted at the first landing door, no plan above the ground without a storeyed wing, its basement storeys and access heads still planned); `W_TIER_UNREACHED` for a storeyed wing on a sealed stack; `floorCm` from each tier's ground and upper storey heights (J-V2.85); `Storey.level` 0 the lowest storeyed level (item 371); chimneys carried up through the tiers with `Chimney.levels` reaching the top wing (V02 §5.2); the crypt inside a solid tier 0 entered at its own floor by the door at `basementDoor(b)` (V03 §3.7.1); the arena's façade ring planned, the seating ring not; no basement on a deck; the bank quay's cellar by the ordinary gate; the walk-out door where a retaining wall is the plot's low edge | — |
| X19 | V04 | a ruin's stepped monument laid by `layTiers` with the `stepped-monument` row at its ancient-culture band, on its ruin stream, decayed by its persistence order; the vaults under raised ways are V04's (item 110 (b)) | — |
| X20 | V05 | the caster ceiling reads the stack's envelope (V02 §3.15.2); an island palace or temple may take a stepped row; its crypt is the rim-slab crypt vault under the building's lowest massing tier, inside underside tier 0 (the rim slab; J-VI.7) | — |
| X21 | V09 §4.9, V09 §4.20.5–V09 §4.20.6 | T9's tier controls (V02 §4.6 (7)) emitting `setMassing { op: 'tiers' }` and `setAttr`; the deck-plot badge reading V11's row; one catalogue row, with its words and buttons, per bend id of V02 §1b; no structural refusal (item 101 R2) | the ops through the clerk and the skeleton file |
| X22 | V10 | the clerk's tier calls and V02 §4.6 (7)'s why facts (`massing/bend/<id>`, `stack.grade`, the derived aspect); each bend said by its line and alternatives, never "cannot" | the events |
| X23 | V06 | tiers added or removed over epochs by V02 §3.15.5's rows; deck buildings falling with their deck by the base's fate rule, and deck-plot buildings at an epoch through S11's capped mutator (V02 §3.16 (3)); a solid monument never re-roofed; a stack's Works in stack order, solid wings by courses (item 318); an epoch's raised way clearing every building meeting its supports or strip (V06 §3.19 (7), cause `clearance`; V02 §3.17 (b)); `rebaseStack` on an epoch's terrain change | — |
| X24 | V01 §5.1.2 | the `hatched` family draws a stack in its order and hatches `stairFlight`'s treads by `stairTreads` (V02 §2.6) | the per-wing constructions' stack order and treads (item 419) |
| X25 | V12 | the second known-city fixture's golden and own bars; V02's bars on it are T-V2-42 (the arena), T-V2-44 – T-V2-47 and T-V2-51; the fixture declares its arena's precinct (60 × 50 m or larger) and its temple's precinct (V02 §3.10.3's receipt hints) | — |
| X26 | V07, V11 §3.24.3 | a village class takes tiers only through V11 §3.24.3's culture × class specialisations applied to the `v.` class that plays the row's class, under V07's `rules.tiers.capPerSettlement`; none by default; a village's piers and bridges take deck buildings by the `@deck` rows and V07's deck cell | — |
| X27 | V11 §3.6.1 | the `arena` template override: plot p50 2 500 / 4 000 / 6 000 / 9 000 m² (own; the historical amphitheatres' 1 400 – 11 000 m² hulls), footprint "the claim's" (so `slotBand` reads the `arena` row's `claimShare` .5–.8), main share 1, its `gate` structures absorbed as M5's passages; read with V02's `arena` family row (V02 §3.10.2) | — |
| X28 | the base, §2.7 (item 246) | the deck-plot record's `landmark` (a mole's head and mid-mole slots, and on a bridge whose deck span reaches V11's `deck.landmarks/bridgeMid/minSpanM` one mid-span slot), which S11 copies to `DeckContext.landmark`; no deck plot on a `ford`, a `draw` bridge or a bridge without `deckCm`; a quay platform on the bank flagged ground (`DeckContext.surfaceCm` null) | — |
| X29 | V04 | the chamber record gives its ceiling (an arch vault's soffit), which M11's `vaultClamp` reads for a building on the underground layer; the ruin stage calls `drawTiers` and `layTiers` alone with `TierCells.heights`, `plinthCm` 0, `parapetCm` 0, `scale` 1, and handles a `TierFailure` | no clamp (the `@underground` rows' one flat storey) |
| X30 | V03 | W2 lays windows by `facadeBays(wing, side, bayM)` on every side (a tower's round its free perimeter, V02 §3.7); V03 §3.7.4 step 1 places the crypt under `cryptSeedWings(b)`, else the far third of the region from the main entrance; exterior flights by `stairTreads`; T-V3-25 carries the poor manor's three-units clause; the half cellar's floor at the datum less half the depth | — |
| X31 | V01 §3.17.3 | the stair-flight hatch reads `stairTreads`; the raised way's add path clears the same set of buildings V02 §3.17 (b) clears | — |
| X32 | V11 §3.6.5 | the role table's `gate`, `charnel house`, `mortuary chapel` and `lychgate` shares feed M10 as written | — |
| X33 | V12 §2.1 | the metric family `bar.<barId>` (J-V12.65), which V02 §3.10.10 names as `bar.T-V2-<n>`; V02 registers its bars there (the `BenchBarDef` table, each written by the seat landing its line's milestone) | — |
| X34 | V03 | the damage layer V02 §5.7 reads for the plan in force: each roof bay over a room (its ring) and each outer wall run of a wing's lowest storey (its span), each intact, damaged or repaired at a level (repaired by V06's per-element `decayPeak`, an element that entered the plan after its building's damage left drawn as built, V03 §5.6 (2) (b)); every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined` (§2.6 step 7), damaged, so the plan agrees with the roofless exterior (T-V2-59 (b)) | the element reading draws nothing (the massing reading) |
| X35 | V01, V07 | `disasterSource` and `disasterDistricts` (V01 §3.16): the districts a disaster strikes — for a standing condition, and for a preview of the look keyed on its look kind in the condition's stead (§10.2's placement) — and its `pattern` (`fire`, `flood` or `scatter`: the overlay's calamity's type through V06 §2.4's calamity table, `scatter` with no calamity), and V07's ends at THORP, HAMLET and VILLAGE; every building of each draws the ruined look (V02 §5.7) | no look on a building |
| X36 | V06 | `decayLevel` per lineage at a week, `decayPeak` per lineage at a week since an element's entry into the plan (V06 §3.23 (3); the entry week V03 §5.6 (2) (b) passes), and `crisisLookYields` per building, false for a preview (V06 §3.22 (3)), read by V02 §5.7 | the level from the existence state at V11's default age, nothing repaired; the look standing until its condition no longer stands |
| X37 | the base, §8.1, §8.2 and §8.8 (rendering) | the Works `decaying` row's gaps along the ridge drawn, where a plan is in force, as V02 §5.7's holes (§8.2); the drawn week in the tile key of a tile holding a building drawn under the damage layer, and `crises` and the effective knowledge key where it holds one under a disaster look (§8.8); §8.1 item 7's week re-emission carrying the buildings whose damage marks differ (V02 §5.7 (8)) | the row's own ridge gaps |

**Hand-offs received** — each closed in this volume:

| from | the hand-off | closed at |
|---|---|---|
| V06 §3.18.3 (1)–(2) | V03's rank re-runs inside each epoch op that changes the principal crypt or its building's designation; the basement re-derived with an always-crypt class | V02 §3.14.5 (c) (the crypt kept on every re-derivation, an epoch's included); the rank and the trim are V03's and V06's |
| V06 §3.8.4, V06 §3.19.5 (2) | deck-plot buildings at an epoch through S11's capped mutator | V02 §3.16 (3); X23 |
| V08 §2.6b (4) | the stepped specialisation rows keyed by culture and class, which DR15's template family reads | X17; V02 §3.2 step 1 reads the template's composition key |
| V09 XV-V9-6 | the no-refusal crypt ladder; the canvas-handle contract; X21; the bridge slot as a `DeckContext.landmark` plot; the registry path | V02 §3.14.5 (d), V02 §4.5, V02 §4.6 (7), V02 §3.16; X21, X28 |
| V09 XV-V9-8 | AP10's price with M6c | V02 §8.3's M6c row (counted on §16's line for V09's staged screens) |
| V10 CVR-V10-8 | the registry paths `deck/landmarks/<head\|mid>` and `massing/stack`; the `massing` section's item-110 rows | V02 §4.6 (7); X22 |
| V11 X-V11-5 | the S11 specialisation draw replaces the band template's `composition` and `heights` for the use (item 259) | V02 §3.2 step 1; X17 |
| V11 X-V11-9 | an oval composition key for the `arena` family | V02 §3.10.2's `arena` row (`ovalCourt`); X27 |
| V12 X-V12-2 | the panel a `PanelSpec` on V12's engine with its `'FM'` pairs and reference rows | V02 §7.5 |
| V12 X-V12-11 | T-V2-50 a `NoOpPin` on V12 §3.7.8's engine reading V11 §3.24.0's off form; T-V2-58 (f), T-V2-59 (d) and T-V2-60 (c) registered on that engine (`item115.ceiling`, `item123.damage`, `item122.crises`; V12 §2.13) | V02 §7.7 (T-V2-50); V02 §7.2 (T-V2-58 (f)); V02 §7.8 (T-V2-59 (d), T-V2-60 (c)); V02 §1b's registration rows |
| V12 X-V12-12 | §16's M3a row carrying item 110's base parts with item 229 | V02 §8.5's M3a-V2 row |
| V12 X-V12-15 | every bar a register line names registers a `BenchBarDef` | V02 §3.10.10 |
| V12 X-V12-18 | a line naming several stages is one entry with `stages` in the line's order | V02 §3.10.10 (as written) |

## Integration notes

The volumes-integration decisions (`docs/volumes/_integrate.md`) this volume carries, each stated at its home and cited
there: J-VI.7 (the island's crypt vault under the building's lowest massing tier, X20); J-VI.17 (the solid stack's
`external` access and its door at `basementDoor(b)`, item 371 and V02 §3.15.3; the walk-out at a retaining wall, item
242 and V02 §3.17 (a); every `setMassing` dry run and `setComposition room` listing the plan items it would orphan,
V02 §4.2 step 2 and V02 §4.3; the registry paths, V02 §4.6 (7)); J-VI.4 and J-VI.5 (the no-refusal rule every volume
follows, V02 §4.6; the tier contract V04, V06, V09 and V10 adopt, V02 §3.15); and file f's item 246 (X28's deck-plot
fields).
