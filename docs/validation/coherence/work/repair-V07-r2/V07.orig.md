# V07 — The village product: thorp, hamlet and village in their landscape (VG-class)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V7-village, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the village product the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
PART III. The implementer holds the base and the volumes and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is always the
base's; every design volume's section carries its prefix, `Vnn §n` — this one's included (`V07 §3.2`) and every item of a
list (`V06 §2.1, V06 §3.5.2`); `item n` is an amendment item — items 1–120 the owner's, items 200 and
above file f's, each the applied text of a volume's base change request (V07 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V7.n` (V07 §9),
tests `T-V7-n` (V07 §7); the wiring rows `W1`… are this volume's (V07 §1b; another volume's are written `V06 W75`). The
twelve tools are item 101's T1–T12, written with their word at first use (T8 `fill`); a base bar group is written with its
number (`T8-1`). **Symbols:** `N` is a dwelling count (`N_b` per band, `N_v` the village dwellings, `N_o` the outlying
farmsteads, `N = N_v + N_o`); `D(x)` is only item 102's daylight share, the sunlit share at `x` (V07 §2.3).
**Provenance.** Every reference behaviour this volume emulates is restated in metres in our own words and carries
`ref:VG 1.6.9 ⟨behaviour⟩ (code)`, its trace key row D5 of `research/findings/code-impact.md` §(d) (P17 for the field
sectors) (§17.1 (6), item 62); VG's grammar, word lists and palettes are never used.

## 0 In plain words

The village product is the second generator the owner asked for: a separate product on the same engine that draws a
**thorp** (a handful of farms), a **hamlet** (a few dozen homes) or a **village** (a few hundred people with a church, a
mill and a smithy) — always **in its landscape**. You pick a size (or SettlementForge sends a dossier) and one click gives
the whole township: the lie of the land, the brook or river that crosses it with its fords and bridges, the roads from the
neighbouring places, the village itself, and around it the fields in their long strips, the meadow by the water, the common
pasture and the woods at the edge.

It works the way the Village Generator (VG) works, because that is the reference the owner chose: first the program decides
where people want to live — a smooth "crowding" map, highest at the village's heart, following the contour of the ground —
then roads grow like walkers over the land, bending along slopes, branching where the village is busy and thinning into
tracks where it is empty; a green (or, in VG's look, a small square) sits at the busiest spot; houses stand along the roads
and around the green, each in its plot with a garden and a paddock behind; some villages have a palisade, built before the
roads so the roads come through its gates. Our own rules add what a real medieval village had: a parish church with its
churchyard, often beside the manor house; a mill where the stream falls, or a windmill on the rise; a smithy and an
alehouse on the through road; wells and a pond on the green; outlying farms at the end of tracks; open fields in furlongs of
strips, meadow on the flood ground and woods on the poor or shaded slopes. Prosperity is a smooth gradient: the richer farms
take the sunny, dry side, the cottagers the damp or shaded edge. Seven shapes are available — VG's grown look (the default),
a street village, a green village, a nucleated cluster at a crossroads, a village of two or three knots joined by lanes, a
planned row of equal plots, and a scatter of farms — chosen by chance within a size, or asked for.

A village's palisade uses the land as real ones did: where the village backs onto a river, a cliff, a gorge or a marsh, the
fence stops at the edge and the water or the drop does the rest — nobody fences off the village's own water, and a village
in a river bend fences only the neck. The trades are linked as their goods flow: the bakehouse near the green, the smithy
where the roads meet, the charcoal burners at the wood's edge, each alehouse far enough from the next that every end has
one. When SettlementForge says a small town has "several blacksmiths", the map shows that many smithies.

Everything is editable with the same twelve tools as the towns: drag the heart, draw the green or a palisade, brush "more
houses here", drop a mill on the stream, switch the field system, name anything. SettlementForge's thorps, hamlets and
villages — and its small "towns" under 1 500 people — are accepted: every institution the dossier lists stands on the map,
the population is exact, a listed wall becomes a palisade or bank, and the dossier's own word titles the map. A village that
grows past 1 500 people hands over to the town generator, the old village staying as the town's old core; a declining town
can shrink back into a village the same way. The default look is VG's painterly family — soft colours, hill shading,
contour tufts and a gentle spotlight on the heart — with the clean ink look one click away.

Everything grows smoothly with the head count: there is no jump at 80 or 400 people, and the chance of a church, a smithy or
a green rises gradually with the population.

Under the ground a village may sit on a cave system or the buried ruins of an older people — more often in mountains, near
mines, or where SettlementForge names ancient ruins, a magical node or ley lines. Usually nobody has found a way down: the
caves and ruins are on the map, drawn faded for the game master, but sealed. A house over them may have a cellar that broke
through, a well may break into a cave, a sinkhole may open in a field, a mine may break into a gallery, and a ruined
landmark may be the ruins' entrance; as the village grows the chance rises. Only once a way in exists do squatters,
hermits or a cult live below. A village church may have a small crypt (most did not), a chapel of ease has neither crypt
nor churchyard, and the dead lie in the churchyard or the burial ground — where the town's catacombs may one day begin.

On steep ground the houses stand on small levelled platforms held by low stone walls, with steps or a cart ramp up from the
lane, while crofts and fields follow the slope. A village never builds a viaduct, an aqueduct or a raised road itself — the
generator raises those only in cities — but you can draw or remove one anywhere, and one left from a time when the place
was a city still stands, losing its arches one by one, the lanes passing under its arches and joining it only at its ends.
A fishing pier may end in a platform with a net shed. When a hillside village is deserted, its house platforms and their
walls remain as the grassy terraces that mark where it stood.

## 1 Scope, the base hooks consumed and what is out of scope

**In scope (build depth).** The village product's ladder rows and population bands (THORP, HAMLET, VILLAGE; V07 §2.1), its
territory frame, the landscape first (the course-first river, the site, the heart), the density stage before the network,
the plan forms, the palisade before the roads, the tracker-steered network (through roads, lanes, tracks, fords, bridges,
wharf and piers), the green or square, the perimeter as the one `village` district, the "houses along ways" fabric with
toft-and-croft plots and the slot race, the village institutions (parish church, chapel, manor house, mill, smithy, alehouse
and inn, bakehouse, pound, tithe barn, parsonage, the reeve's house and the moot, wells, pond, cross), the hinterland
(field systems, meadow, commons, woods, outlying farmsteads), the village ends, the SettlementForge small-settlement
dossiers the port accepts, the ladder hand-off in both directions, the village's epochs (infill, green encroachment,
extension; desertion), the `painterly` family and the `VG` parity preset, editing with item 101's tools, labels, exports,
budgets, tests and the build plan. The village's part of the owner's items: item 102 (the settlement prefers the sunny
slope; fields and woods sort by it); items 103–104 (the village classes' profiles, coverage rows, signature pairs and the
village reading of the scene archetypes; the rulebook is file g's and V11's); items 105–108 (the palisade's barrier closure
and graded stretches, V07 §3.4; the supply web's links and stores at village scale, V07 §2.4, V07 §3.8, V07 §3.11; the balance of
spread and pull inside one district, V07 §2.4, V07 §3.10; the institution ladders' members at village rungs, the palisade's
replacement by a town wall included, V07 §2.4, V07 §3.11, V07 §3.12); item 109 (caverns and ruins under a village with their access
and the dwellings that follow it, V07 §3.16; the crypt cells and burial faces, V07 §2.4; the catacomb gate at the hand-off
up and a shrunk town's standing underground, V07 §3.12); item 110 ((a) the house platform with its walls, stairs and ramps
and their decline into the scarps of a deserted village, V07 §3.8a, V07 §3.12; (b) a raised way on a village map, declared or
carried down, read-only to every village stage, with the router's rung gate, V07 §3.5, V07 §3.5a, V07 §3.12; (c) stepped massing by
the culture-and-era rows only, V07 §2.4; (d) deck plots on a pier head or placed by the author, V07 §3.10a); item 111 (the
crowding map's water pull and the oasis village, V07 §3.3, V07 §3.2 (4)); item 113 (a village over a former city and refounding
at village rungs, V07 §3.12a); item 114 (the palisade's patches, decay and recovery, V07 §3.4 (8)); item 115 (the village class
mix under the grandeur ceiling, V07 §3.8); item 116 (the township view at the zoom-out limit, V07 §5.2); item 117 (the fields,
strips, commons, green and ponds through the year, autumn's fall covers included, V07 §5.1); item 118 (the festival decorations
of the village rungs, V07 §5.1); item 119 (the village's one-time waits inside the comfort level, V07 §6); item 120 (Find at
the village rungs: the ends, fields and places as targets and the ends as Show gaps' units, V07 §5.5).

**Base hooks consumed** (cited, never restated): the rung profile, the village rows and `LadderRouter` (§1.1, D-33; items
201, 202); the Blueprint, the feature table and `autoResolved` (§4.2 S0); S1 whole (§4.2 S1); S2's roster, the farm table,
need propagation and the fixed dossier rows (§4.2 S2, §10.2); S3's centre scoring (§4.2 S3 (1)) and, done by VS1 since S3 is
not in the village's set, S3's map border (§3.2 (9)), lattice and edge costs (§4.2 S3 (3)), typed destinations (§4.2 S3
(13)) and L0 ponds (§4.2 S3 (10)); the stage graph, laziness and registration by declared I/O (§4.1, §4.12); the strategy
registry and `ProductDecl`'s place in it (§4.12, §14; item 202); the prosperity and density fields (§4.5); S7b (§4.5 S7b);
S7's wall and bridge furniture (§4.8); S9–S11 with the relation and supply rows and the designation mutator (§4.7); S12a,
the hinterland unit, the farm table and modes, decorations and S12b (§4.9); names and labels (§4.10, §9); the display list,
style sheets, the `painterly` slot and the relief tier (§8.1, §8.2); the light model (§8.4); identity and lifecycle (§2.8);
the document and recipe (§2.9); streams and addresses (§6.1–§6.3); edits, locality, lifecycle rows and migrations
(§7.1–§7.5); the override layer, reference cells and parity presets (§7.6); the dossier contract, DR1–DR35 and items 12–16
(§7.7); the port (§14); exports (§11.1); budgets and test families (§12, §13); the epoch, the rung and product at an epoch,
frame growth and `ConversionOp` (§4.11, §3.2 (9)); items 102–108 through their base mechanisms (the daylight share, the
profile columns and families, the supply web, the barrier closure with its defensibility classes and stretch profile, the
balance profile, the ladder step-type table); item 110's base side — `RetainingWall` with its state profile (§2.7, §2.2
rule 5), S10–S11's levelling and the levelled ground they publish (§4.7), the ground arena's parts from 1 and the raised
way's deck, supports, ends and span rule (§2.7, item 244), the deck invariant (§5.3), the way-class stair and ramp rule, the
deck plots and their budget, T3 `wall`'s `retaining` kind and T4 `road`'s `raised` flag (§7.1). The sibling volumes' parts
read here: V04's underground tail at the village subset (V04 §3.1: T2 for `ruin` and `cavern`, T2b, T3's F6, T5, T6, T8, T7
on show) with its records and tables (V04 §2.2, V04 §2.3); V11's crypt column (`crypt`, `cryptM2`; item 436) and V03's crypt
rule (V03 §3.7.4); V11 §3.24.1's TOWN `terrace` row, its `deck` table and compiled `deckOk` (V11 §3.24.4) and its
culture-and-era specialisation rows (V11 §3.24.3); V02's `DeckContext`, `@deck` rows, `stepped` family and `stairFlight`
program (V02 §3.15, V02 §3.17); V04's arch-vault source and foundation reach (V04 §3.5.4 (d), V04 §3.5.0); V06's raised-way step,
cap and decline (V06 §3.19); V09's delete; V01's aqueduct terminal form (V01 §3.17.8).

**Out of scope, and why.** Floating islands are V05's: no new island arises at a village rung (`layers.islands`
`none`), and an island a fallen city leaves wanes, settles and falls over its dwells at whatever rung (V05 §3.15 (6); V07
§3.12), the village phases reading none; the sewer network, catacombs, quarries, vaults, the buried town and the
undercity at village rungs — they keep their TOWN-and-above gates (item 109 (j) (1), (k) (1)), save that a shrunk town's standing systems keep
their records in maintenance mode (V07 §3.12; V04 §3.1) and a dossier catacomb fact below TOWN is V04's charnel vault (V07
§2.4); the construction of caverns and ruins (V04's); the **generation** of raised ways — the base's route solve and V06
§3.19's founding, at CITY and METROPOLIS only (item 110 (b)) — and the second known-city fixture (item 110 (e);
V12); the stepped family's construction (V02), the plans of tiers (V03) and the arch vaults' chambers (V04); stage-2
close-ups of the village district (the village's fabric is its neighbourhood-band picture, J-V7.24); stage-3 compositions
and the plan rung (V02's and V03's machinery unchanged; this volume supplies only the village class rows they read); the
content rows of every SettlementForge catalogue kind (V11); the host bridge (V08); the built-in clerk (V10) and the
application shell (V09), which this volume feeds through the base's API; the unexcavated underground style and its toggle
(V09) and the clerk's underground explanations (V10). VG's request settings are named only in `matched.vg` and in the
research-side request mapping (item 495).

**Cross-volume facts this volume relies on**, each at its home: (1) V04 — `CatacombComplex.blockedBy` holds `'rung'` for a
town's catacomb carried into a village (V04 §2.2, V04 §3.5.1 (6); V07 §3.12); V04 §3.5.1 (3)'s counted classes include
`v.parish_church` (V11 §3.23.8; V07 §2.4); V04's stages in maintenance mode at a village rung (V04 §3.1, V04 §3.10). (2) V11 —
the crypt and cellar cells of `v.parish_church` and `v.chapel` are this volume's rows (V07 §2.4; J-V7.41), and V11's compile
check counts `v.parish_church` as a church. (3) V02 — every village row names a `templateFamily` of V11 §3.6.1 for its
budget rows, while V02's `composition.classFamily` (V02 §3.10.5) is the one source of the village classes' composition
keys and is read first (V07 §2.4). (4) V09 and V10 — the unexcavated style, the shade map and link views, and
the explanations (V07 §4.5, V07 §5.1). (5) V04 — the arch-vault source registered at every village rung (V04 §3.5.4 (d)); the
span rule's `country` reason keeps a span over hinterland faces open at every rung (§2.7, item 244; J-C4). (6) V06 — the
raised-way ledger's suppressions and carried ways cross both hand-offs unchanged and the raised-way step's founding never
runs at a village rung (V06 §3.19, V06 §3.19.1 (5)); a carried raised way declines and is repaired by V06 §3.19.2, and a
removal holds by V06 §3.19.3. (7) V11 — the one village cell of the specialisation rows is this volume's
`tiers.capPerSettlement` (V11 §3.24.3; V07 §2.4); the `deckOk` cells of the village rows are this volume's (V07 §2.4) and
the `terrace` cells of V07 §2.2a are reference cells to V11's TOWN row. (8) V11 — the `v.` namespace and `villageForm`
naming a `v.` key with its compile check (V11 §2.3, V11 §2.9); `guildhall` without a village form (V11 §3.22); the wells floor of
`multiple_water_sources` (V11 §3.12); V08 — the `@absent:<class>[+<class>]` shape (V08 §2.6's `kinds` row); V06 —
`ProductDeclEpoch.rows` (V06 §2.1) and the restoration of retaining walls (V06 §3.19.4 (6)); item 244's derived `source`.
(9) V06 — the `street` row's `again` and `reopen` members and their issuers (V06 §2.1, V06 §3.5.2, V06 §3.8.2 tier (5′)); V11 — the
`churchyard` part of the `church` and `cathedral` families (V11 §3.6.1), the village reading of `@absent` (V11 §3.11), the
`presence` column compiled with the class invariants over the `v.` rows (V11 §2.3, V11 §3.2.1 step 6, T-V11-0) and the village
range row keyed by step type and the class that plays the member class (V11 §3.12); V02 — `composition.classFamily` keyed
by the `v.` keys (V02 §3.10.5); V03 — the village plan rows keyed by the `v.` keys; V04 — its church count reading
`v.parish_church` (V04 §3.5.1); V08 — V08 §3.5.1 (b)'s range read "for its step type and member class" and T-V8-46's hamlet
clauses at VH. (10) V06 §3.9.6's claim-sized classes at a village rung, reading `rules.claimArea` (J-V6.119); V11 — a
territory rung reads the `villageSeat` column alone (V11 §3.21.1); the village-read scope (`productStages.village`, each
table's `villageRead` flag, the compile's `villagePresetCells`; V11 §3.2.1) and its `VG` entries kept with V-M0 (J-V11.79);
V12 §3.7.1 (c) and V12 §3.7.2 (3) naming `rules.race.densityPower@VG` as the one `VG` run's cell; item 576 (c) on §10.2's
government sentence. (11) V11 §8's preset-entries paragraph: the seat landing a change that makes a table village-read, or
adds a `presetsRequired` column to one, writes those cells' `presets.VG` entries by V07 §3.15's rule in that change
(J-V11.87; J-V7.123). (12) V06 — `ProductDeclEpoch.records` and `EpochPlacement` (V06 §2.1), the `dossier` step's call
(V06 §3.2 row 12), V06 §3.9.6's companion sentence and the clauses of T-V6-51 and T-V6-26; the participant table's
`village.pins` row (V06 §3.2: `afterGrowth`, order 60, `@plat/village`, stage `VS8`); V11 — V11 §3.11's `@pin:<kind>` read
at a village rung as VS8's pins, a record forcing its pin (V07 §3.10), and V11 §3.12's `parish_church` row naming the
churchyard cross VS8 lays; V08 — V08 §3.5.1 (c) binding a pin-record lesser to the churchyard `cross` (J-V8.111) and V08
§4.6's notes naming the class V07 §3.11 steps 2–4 give (J-V8.112). (13) V06 — `EpochPlacement.place(ctx, record, event)`
keyed by the dossier event's `seq` and `remove?(ctx, record, event)` after the base's removal on both paths (V06 §2.1, V06 §3.16
*Keys*); item 202's records hook, its calls on both paths, the two phase overrides and the participants on M4's grow path,
and the absorb-path call in §7.7's *One path* sentence; V06 §3.9.11's REPLACEMENT row for a greater V08 §3.5.1 (d) places
new (J-V6.125; T-V6-45) and a record's claim-sized joins charged to no churn cap (V06 §3.9.6, J-V6.123); V08 §3.5.1 (c)'s
three cases and (d)'s one-key receipt (J-V8.113, J-V8.114) and the `town_walls` key; V11's display cells on
`BuildingClassRow` (V11 §2.3, V11 §3.5.15; T-V11-4), which V07 §2.4's column fills for the `v.` rows. (14) V06's engine
(M6-E) for V-M3's clauses that run its steps: the desertion's street candidate and hollow ways (V06 §3.5.2, E2), a
claim-sized roster member's opening and the counts (V06 §3.9.6, V06 §3.9.1, E4), a ladder step carried by an epoch (V06
§3.9.11, E4) and a carried raised way's decline (V06 §3.19.2, E3); the grow path reaches the village's phases and
participants at item 202's call points with V06 §2.1's `ProductEpochContext`; *fallback*: V07 §8's risk (10).


## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds, the base hook it plugs into and the dossier facts it reads
(nothing orphaned, nothing dangling). The lifecycle of each stored field is V07 §2.6's.

| # | piece | fed by | feeds | base hook | dossier trace |
|---|---|---|---|---|---|
| W1 | `ProductDecl('village')` (V07 §2.1) | `@plat/village`'s registration at load | `LadderRouter.route`; the stage set (V07 §3.0); the replay of a village creation (§2.9); the port's consultation (V08 §3.10); the epoch runner's overrides, participants and records placement (V07 §3.12) | `StrategyRegistry.products` (§4.12, §14; item 202) | DR23 (the rung) |
| W2 | the THORP, HAMLET and VILLAGE rows of `ladder.json` (§1.1; V07 §2.1) | the shipped table; `editTable`; the corpus stage | `LadderRouter`; S0; the frame (V07 §3.2 (1)); V07 §6's budgets; §4.11's rung at an epoch; II.6 and II.7's gates (`none`, `never`) | `RungProfile` (§1.1; item 201) | DR23 |
| W3 | `village.json` (V07 §2.2) with its `VG` column | the shipped table; `editTable`; the corpus stage | S0 (V07 §3.1), the frame, S2's households, VS1–VS8, S10's toft rows, V07 §3.12's epoch rows, the `VG` preset | §7.6's tables and presets (item 377) | DR1, DR2, DR5, DR7 read its rows |
| W4 | `VillageRequest` (V07 §2.7) | the request; T1 `intend`; the port's creation prefix (V07 §3.11); the skeleton file | S0's resolution and `autoResolved`; VS1 (a declared heart); VS4 (declared entries) | `Blueprint` (item 287) | DR1 (terrain → water), DR2 (walls, access), DR3 (bearings) |
| W5 | S0's village draws — water, form, roads, palisade, open space, field system, `δ` (V07 §3.1) | W4, W3, `blueprint.features`; the climate row's arid chances (item 111) | VS1–VS6, S12a, the report | S0's feature table (§4.2 S0) | `site.culture` (forms), access (roads), a bridge-implying kind (V08 §2.6b (3)) |
| W6 | the `course-first` `RiverStrategy` (V07 §3.2 (2)) | S0's water type | S1's carve and crossing sites; VS1's mill seat; VS4's crossings | `RiverStrategy` registry (§4.12; PART III) | DR1 `riverside` |
| W7 | `VillagePlan` from VS1 — heart, nuclei, character, `R_s` (V07 §2.3, V07 §3.2) | S1's site, S2's roster, W4 | VS2, VS3, VS4 (branch spacing, rim), VS5 (`buildingScale`, `depthRatio` → S11), VS8's ends, the spotlight (V07 §5.1), labels, exports, the clerk (W74) | `StageDecl` (§4.1); entity registry (item 267) | DR1 (site), DR7 (the dwellings in `R_s`) |
| W8 | the mill seat and leat (V07 §3.2 (7)) | S2's watermill demand; S1's carved bed | the L0 `canal` and its deck; the mill's reservation → VS4's routing, S10b's mill placement | S3's reservation and carve forms (§4.2 S3 (2), (10)) | DR19 `river_mills` |
| W9 | the density raster and `FieldBands('density')` (V07 §3.3), with item 111's water pull | S1's terrain and water (the oasis and spring included); W7; W42; the climate row's water-pull weight | VS3's keep test; VS4's tracks and branching; VS5's perimeter; S10a's quotas; S10b's race; V07 §3.9's orchards; V07 §3.12's infill; T8 `fill`'s brush; the spotlight | §4.5's field type; §7.2's brush | `oasis_water` (through DR1's oasis) |
| W10 | the palisade plan and its `Enceinte`, with the barrier closure, the reach and the stretch profile (V07 §3.4) | W9, W7, S1's water, bank kinds and slope; the gorge features; V11's `walls.barriers` rows | VS4 (gates, push, the wall band; free passage over closing arcs); S7's gate and anchor furniture; VS5 (the reached ground); VS6's reached faces → S10's intramural closes, typed by S12b; V07 §5.1's palisade look; the clerk's "why is this side open" | `EnceinteStrategy 'palisade'` (§4.12; PART III item 2); `Enceinte.closure 'barrier'` and the stretch profile (item 106; item 312) | DR2 wall records (the record's words → kind; V07 §3.11) |
| W11 | the tracker network — ways, junctions, `entries`, `approaches`, landings (V07 §3.5) | W9, W10, W7, S1's crossing sites, W8, the partners' bearings | S7 (bridges, fords); VS5; VS6's runs; S9; V07 §3.9's farmsteads; the wharf (W23); labels and exports | `NetworkStrategy 'tracker'` (§4.12; PART III item 3) | DR2 access → topology; DR3 bearings |
| W12 | the open space — a green or a square (V07 §3.6) | VS4 seeding 2; W9; W7 | VS6's rim runs; S10a's rim multiplier; the market rank; the halls' claims (W65); `dist.market` (W64); VS8's centrepiece, stalls and green end; labels; the painterly green | `Reservation` (item 215; `plaza`) | a dossier market record (V07 §3.6 (4)); the Alehouse & Common quarter |
| W13 | the perimeter and the one `village` district (V07 §3.7) | W9, W10, W11, W12 | S7b; S12a's hinterland faces; VS6; S12c; labels; exports; V07 §3.12's retype at the hand-off | `District.kind` (item 214); §4.5's pass 1 | DR5 (one district) |
| W14 | the village prosperity drivers with item 102's term and item 111's water term (V07 §3.7 (3)) | W13; W42's terrain daylight and the palisade's shade (VS5's one pass); the climate row's sunlight cell | S10a; S10b's class mix and sunlit-side preference; S11's templates | §4.5's field; items 102, 111 | DR6 wealth |
| W15 | the `village-ways` fabric — frontage runs, back closes (V07 §3.8) | W13, W11, W9, W7 | S10's `toft` slots; S10a's quotas | `FabricStrategy` registry (§4.12; PART III item 3) | — |
| W16 | toft plots (toft, croft, drive) and closes (V07 §3.8) | S10 with W3's toft rows | S10b; S11; S12b's yard planting; V07 §3.12's infill and decline; address numbers; exports | `PlotStrategy 'toft'` (§4.7); yard-part data rows | DR7; the landmark yard parts (V07 §3.11) |
| W17 | block quotas and the slot race (V07 §3.8) | S10a (W9 × the multipliers); `village.slot` | S10b's generation fill; V07 §4.3's locality | S10a's block `Allocation` (§4.5) | DR7 (the dwelling count) |
| W18 | the village classes (`v.` keys) as typed rows — label and synonyms, family, template family, distribution and significance, presence entries, powers and sectors, `deckOk`, balance, profile deltas and authored rows, and each row's `commonness` (V07 §2.4) | the roster tables (V11 cites them and compiles them by its rules, `commonness` at step 5a; T-V7-56); `rules.presence` | S2 (the presence column); S7b; S10b; S11's templates; item 72's character; the deck-plot cutter (`deckOk`); the clerk's "why" (`cls/<class>/<n>`); V09's roster reader and stamp palette; V08 §4.6's notes' `class` word; the refusal V10 renders | `BuildingClassRow` (§10.2; item 576's `presence`); S2's government step reading `villageSeat` alone at territory rungs (item 576 (c); V07 §3.2 (3)); items 103, 104 | DR9, DR10, DR11 (the forced seats), DR24; V08's `threat` and `threats` rows; item 104's archetypes |
| W19 | `BuildingClassRow.villageForm` (naming a `v.` key) and the tag fallback (V07 §2.7, V07 §3.11), in the order pseudo-reader → village form → own row → fallback | V11's rows and pseudo-classes; V07 §3.11's fallback rows | S2 and DR24 at village rungs; the port's one `unmapped_kind` note naming the class the fallback gives (V08 §4.6) | `BuildingClassRow` (items 430, 432) | DR24 |
| W20 | S12a's village presets, the land budget and the suitability claim (V07 §3.9) | S2's farm demand; W13's hinterland faces; the daylight share; S1's resources; the oasis's gardens (§4.9) | the hinterland unit's `LandUse` faces; W21; W22; labels; exports; V07 §3.12's retype | §4.9's presets (item 315); `FarmTable` | DR19 deposits; DR1 terrain `forest` |
| W21 | `VillageField` (V07 §2.7) | the hinterland unit (W20) | field labels; exports; the clerk (W74); V07 §3.12's land-use turn; T9 `shape` and T11 `name` | entity registry (item 267) | — |
| W22 | outlying farmsteads (V07 §3.9 (5)): `N_o` of the dwellings `N` (V07 §3.2 (3)) | W11's approaches; W20; S2's `H_f`, `H_o` | the hinterland unit's S10b; DR7's count (`N_v + N_o`); labels | §4.9's outside plots and farm modes (item 314); `farm.outlyingShare` | DR7's farm households |
| W23 | the wharf, landings and piers (VS4 seeding 5, V07 §3.10) | W11's landings (`Landing`, V07 §2.7); S2's dwelling count `N`; S1's water | `quay` and `pier` ways → S7, render, exports; the `v.landing` site; `dist.harbour` (W64) | the water furniture (§4.8); the network's output | DR2 access `port`, `river`; the Fishing Landing quarter |
| W24 | `VillageEnd` (V07 §3.10) | the plots; the anchors (W12, the church, the manor, W8, crossings, entries, W23, nuclei, claims) | S13's labels; exports; the clerk (W74); the port's quarter matcher; V07 §3.12's sub-area labels | entity registry (item 267); §7.7 item 16's naming claims | DR5 quarters → ends; DR14 names |
| W25 | the village pins — `stocks`, `maypole`, wells by coverage, the moot place, the market stalls, and the pin a pin record forces (`shrine`, `market_cross`, `well`, the churchyard `cross`; V07 §3.10) | VS8's rows; the coverage rows; the `@pin:<kind>` records; at a village epoch `village.pins` (W72) and `village.records` (W70), the latter also on an absorb and for a pin-record lesser whose REPLACEMENT greater arrives | glyphs (V07 §5.1); labels; exports; the records' bindings (V07 §3.11 step 1; V08 §3.5.1 (c)); a forced pin tombstoned by `village.records`' `remove` with its record, a bound one unbound | `Pin.kind` (item 255); the village's whole furniture — S11's furniture step places none at territory rungs (item 579) | `Common well`; Roadside Shrine; DR11 (the moot); `wayside_shrine`, `water_source`, `multiple_water_sources` (DR9, DR24 → `@pin:shrine`, `@pin:well`); the `mercantile-market` and `sacred-shrine` archetype cells (V11 §3.13.2); the `parish_church` over `wayside_shrine` REPLACEMENT (item 108) |
| W26 | `declareEnd` and `drawWay.walk` (V07 §4.2) | T5 `quarter` and T4 `road` on the three surfaces | VS8; VS6 | §7.1's events (item 357) | — |
| W27 | `retypeLand` (V07 §4.2) | V07 §3.12's decline and a hand `convert` | the hinterland unit's faces; render | V06's `EvolveOp` member (item 209) | `resource_strike`, a depleted deposit (DR19) |
| W28 | the village epoch phases — `siting` with its step (m) (W71) and `growth` — the records placement `village.records` (W70) and the `village.plan` (stage `VS1`), `village.density` (stage `VS2`) and `village.pins` (stage `VS8`, W72) participants (V07 §3.12) | the epoch runner at a village rung — V06's, or before M6-E the base's `grow-by-stage` on M4's grow path at item 202's call points | the epoch's ops; the created or revived `VillagePlan` at the hand-off down; VS2 and the plan's read as base-product participants while it is superseded; their draws under `VS1`, `VS2`, `VS8` (§6.1) and their table reads under the same ids (V11 §3.1 row 61, T-V11-1 (b)) | V06's phases (item 317), the overrides, records call and participants (item 202); V06 §2.1's `EpochParticipant.stage`; §4.11 | the population target (the absorb, DR23) |
| W29 | the hand-off up and down (V07 §3.12) | the product and rung at the epoch (§4.11) | the district's retype; the green → market; the base's grow path; the derived plan | §4.11's rung at an epoch; V08 §3.10 | DR23 |
| W30 | the port's consultation of `LadderRouter` for `[1, 1 500)` and the village DR rows (V07 §3.11) | the village `ProductDecl`, consulted by the port through `LadderRouter` (item 202); the digest | creation and absorb on the village rows | item 202; §7.7 | every row of V07 §3.11 |
| W31 | the `painterly` programs and the village roles (V07 §5.1) | the style sheets (data) | the display list's paint (§8.1); B-ZOOM | `PaintProgram`, `StyleSheet` registries (§8.2) | — |
| W32 | the GeoJSON village layers (V07 §5.4) | W7, W12, W16's closes, W21, W24, W11's approaches | exports; the skeleton file | the `Exporter` registry; the export mapping | — |
| W33 | the village concerns (V07 §3.14) | the concern registry | VS1–VS8; S12a's village presets | §6.1 (item 344) | — |
| W34 | the `VG` parity preset (V07 §3.15) | W3's `VG` column and the switches | B-REF's VG rows; the side-by-side (§13.6) | §7.6 (item 377) | — |
| W35 | the village budgets and the `B-VILLAGE` bench (V07 §6, V07 §7) | V07 §6's laws | CI tiers; the milestone exits (V07 §8) | §12, §13 (item 495) | the frozen small-dossier fixtures |
| W36 | the village supply, balance and spacing rows (V07 §2.4's second table) | the roster tables (V11 cites them); V11's goods table | S2's need propagation; S10b's placement order, two-way pulls and relaxation (V07 §3.8); the coverage and spacing terms; the clerk's link explanations | `SupplyEdge` and the balance profile (§10.2; items 105, 107) | `activeChains[]` (W38) bind to these edges |
| W37 | the village rungs' ladder rows — member ranges and step readings (V07 §2.4's third table, V07 §3.11) | V11's step-type table; the dossier's ladder records | S2's member counts; S10b's members (spaced by W36); VS8's QUARTER ends; V07 §3.12's promotions and demotions; the palisade's REPLACEMENT | the step-type table (§10.2; item 108) | `institutions[]` names with a range or a qualifier → DR9 (item 108) |
| W38 | the dossier's `activeChains[]` as village links (V07 §3.11) | V08's chain row (item 105 (i)) | S10b's links between bound members; the entry store (W39); the clerk | the port's DR rows (§7.7; V08) | `economicState` supply chains → V08's chain row |
| W39 | the entry store for imports and exports (V07 §3.11) | W11's entries and W23's wharf; the chain's partner bearing (DR3); the roster's inn and farmstead rows | S10b (a `store` use on the host plot); the import and export pulls; labels; the clerk | item 104 (b)'s import and export pulls | DR3 partners; an `entrepot` chain |
| W41 | VS1's S3 jobs: the `border` chain, the `lattice` and its edge costs, the typed `destinations`, the L0 ponds (V07 §3.2 (8)) | S1's terrain and water; W7's heart; DR3's partners; W8 | the border → every frame-bounded step; the lattice → the leat and S4's router (neighbour roads, polyfocal joins, the `row` spine, F-V-TRACK, stub tracks); destinations → VS4's seeding; the ponds → water, render | §4.2 S3 (3), (10), (13); §3.2 (9) | DR3 partners |
| W42 | `daylight.terrain` — the sunlit share `D` over terrain by nine horizon sweeps (V07 §3.2 (4)) | S1's height raster; the latitude in force by V08 §2.5's rule, a recorded input | VS1's heart score, VS2's sun term, VS5's pass 1, V07 §3.9's suitability — each × the climate row's sunlight cell (item 111 (c)) — the shade map view (V07 §5.1), the clerk | item 102 (a)–(c) (the sampler; `shade = 1 − D`) | DR29's latitude (V08 §2.5) |
| W43 | the anchor law over `P` for every per-rung cell (V07 §2.2) | `village.json`'s anchor points | every reader of a `village.json` cell; S2's presence rows (V07 §2.4) | §7.6's tables | `population` (DR23) |
| W44 | the typed rule cells (V07 §2.2a) | the shipped table; `editTable`; the corpus stage | VS1–VS8, S10–S12, V07 §3.12, V07 §3.16, V07 §5.3 | §7.6 (item 377); reference cells (§7.6) | — |
| W45 | the underground tail at village rungs (V07 §3.16): caverns and ruins, the access pass, scattered dwellings after access | S1's geology and relief; the mining signals; the dossier's ruin, magic and mining sources (V08); the village's buildings, wells and working plots | V04's records → the underground view (V09), labels, exports, the clerk (V10); T3's F6 dwellings; V07 §3.12's growth draws | V04 §3.1's village subset; `StageDecl` (§4.12) | `ancient_ruins`, a ruined-landmark record, `magical_node`, ley-line income, a `magical` history event, the mining deposits (DR1, DR19, DR24; V08) |
| W46 | the village dig rows and the well and mine-working access readings (V07 §3.16 (3)–(4)) | V07 §2.4's classes; VS8's wells; the mining class's outside plot | V04's U-ACCESS draws; `AccessPoint.cause` | V04's `DigRule.classRow`, `OpeningRow` | the mining deposits (DR19) |
| W47 | the ruin marker's site at village rungs (V07 §3.16 (6)) | S12a's decoration sites; the dossier's `ancient_ruins` or ruined-landmark record | `RuinRecord.marker` and centre (V04); the ruin entrance opening; labels | §4.9's decoration table (village row) | `ancient_ruins`; the ruined-landmark archetype (item 104) |
| W48 | the crypt cells and burial faces of the village churches (V07 §2.4) | V07 §2.4's rows (`crypt`, `cryptM2`, the cellar chance) | §2.6's basement draw (V02, V03 §3.7.4); V07 §3.12 step 6's candidates; V04's crypt join (V04 §3.5.7 (c)) | V11's crypt column (item 436) | a dossier crypt fact (chance 1); `graveyard`, `burial_ground` (DR9) |
| W49 | the hand-off up's catacomb step and the hand-off down's maintenance mode (V07 §3.12) | the burial faces with their opening years; the standing underground systems | V06's `under.extend` from the first TOWN epoch (V06 §3.18.2 (1); V04 §3.5.1); V04's stages in maintenance mode (V04 §3.1); U-FADE | V04 §3.5.1; §4.11; V06's phases | the church and burial records (V08) |
| W50 | the hand-off band `handoff.band` and the product fold (V07 §2.1, V07 §3.12) | the epoch targets; the creation's `Recipe.rung` | the phase choice at each epoch; T-V7-14's alternating fixture | §4.11's product at an epoch (item 322) | `population` (DR23) |
| W51 | `Landing` and `FrontageRun`, `village.reached` (transient, V07 §2.7) | VS4 (landings), VS6 (runs, reached faces) | VS4 seeding 5 (piers), S10b's `v.landing`; S10's `toft` strategy (runs, the reached closes), S10a (exclusion) | the stage graph's data keys (§4.1) | — |
| W52 | the ways' decline ladder — hollow ways by `retireWay`, `effaceWay` and `reopenWay` on the land classes on ground part 0 only; decks by V06 §3.19.5, fords with their ways, raised parts by V06 §3.19.2 — and the house platform (V07 §3.12) | V06's street candidate at a village rung through `ProductDeclEpoch.rows`; the regrowth order; a hand `convert` (V07 §4.1) | V07 §5.1's `hollow_way` and `house_platform` roles; GeoJSON (V07 §5.4); regrowth-first (§4.11) | §2.8's decline hooks and §4.11's `DeclineOp` (item 268); the `cleared` existence | — |
| W53 | the VG request mapping and the request fields `orchards`, `forest`, `arableFactor`, `organic`, `district` (V07 §2.7) | the request; T1; the skeleton file; B-VG's baseline rows (item 495) | S0's draws (V07 §3.1), VS4's `turn`, V07 §3.9's VG fields and woods, the `VG` frame (V07 §3.15) | `Blueprint` (item 287) | — |
| W54 | the painterly building, edge, tree and spotlight programs (V07 §5.1) | the style sheets (data) | the display list's paint; B-ZOOM (T-V7-25) | `PaintProgram` (§8.2) | — |
| W55 | the title plate's qualifier and rounding (V07 §5.3) | the resolved water type; `plate.*` cells | S13a's `title` label | §9.5 (item 424) | `tier` (the dossier's word) |
| W56 | the dossier's burial ground, parish burial grounds, external mill, parish church elsewhere, Wealthy and Common Residential and the east phrase readings (V07 §3.11) | V08's rows; V11's `cemetery`, `parish_burial_grounds` COUNT, `@absent:watermill+windmill` and `@absent:church` rows | the burial face (W48), S2's mill and church demand (the presence column), VS8's claimed end, the church's east term | §7.7 (DR5, DR9) | `burial_ground`, `graveyard`, `parish_burial_grounds`, `access_to_external_mill`, `access_to_parish_church`, the quarter names, the Religious Quarter's phrase |
| W57 | generated and drawn `RetainingWall`s at village rungs (V07 §3.8a) | S11's platform levelling (W58), T3 `wall` `retaining`, T2 `ground`'s terrace stroke; a shrunk town's standing walls | the `retaining_wall` role and `retaining.wall` program (W62); the GeoJSON mapping; the clerk (W74); V07 §3.12's decline and the `house_platform` scarp; V04's foundation reach (V04 §3.5.0); the ground datum (§2.6's `deriveBase`) | item 110 (a) (§2.7's record, its state profile §2.2 rule 5); item 506 | DR1 terrain `hills`, `mountain` → the relief whose slopes are levelled |
| W58 | the house platform and `rules.terrace` (V07 §2.2a, V07 §3.8a) | S11's site plan (the footprints); the refined 2.5 m raster; `village.json` | the levelling and its walls (W57); the stair and ramp parts (W61); the ground datum (§2.6's `deriveBase`); V07 §3.12's regrowth repair | `FabricStrategy.levelledUnits` (item 506) | — |
| W59 | the `raised` data key (§4.1's `RaisedRead`) and a raised way on a village map (V07 §2.7, V07 §3.5a) | the ground arena's parts from 1 through the declaration layer (a T4 `road` or skeleton declaration, or a way carried down from a CITY epoch) | VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit, VS8; V04's arch-vault source at village rungs; render (W62); the clerk; V07 §3.12's hand-offs | item 110 (b) (§2.7's parts); item 290 | none: `aqueduct_or_water_system` is a tier-C record (V11), no small dossier declares a raised way, and a "Bridge" landmark string names a part-0 bridge (V08) |
| W60 | deck plots at village rungs, the pier head and `rules.deck`; the deck widths (V07 §3.10a) | VS4's piers and part-0 bridges; item 292; S2's `v.landing` presence | S10b's non-dwelling uses (V11's `deckOk`, the village reading); V02's `@deck` rows through `DeckContext`; VS5's perimeter (deck faces with a foot inside); render; V07 §3.12's decline (plots falling with their deck) | item 110 (d) | a toll-house or chapel record V11's `deckOk` admits on a bridge; the Fishing Landing quarter (the landing's net store) |
| W61 | the `stair` and `ramp` yard parts, the village way-class crossing rule and F-V-TERRACE (V07 §3.8a, V07 §3.13) | W58's walls; `rules.grade`, `rules.terrace.stairFromCm` | T-V7-9's access bar; the `way.stair` and `way.ramp` programs (W62); exports; the clerk | §2.5's data-defined yard parts; item 110 (a)'s way-class rule; V07 §3.13 | — |
| W62 | the painterly item-110 programs — `retaining.wall`, `way.stair`, `way.ramp`, `raised.deck` with `deck.shadow`, `raised.support`, `raised.ruin`, `aqueduct.channel`, tiers by `roof.faces` (V07 §5.1) | the style sheets (data); W57, W59, W60, W61's records; V02's tier roles | the display list's paint (§8.1); B-ZOOM (T-V7-53); §8.4's shadows | `PaintProgram` (§8.2) | — |
| W63 | stepped massing at village rungs (V07 §2.4) and the ruin marker's stepped monument (V07 §3.16 (6)) | V11's specialisation rows (V11 §3.24.3) with this volume's village cap; the dossier's culture key; V04's ancient-culture row | V02's `stepped` family (`layTiers`); the marker's composition; render (tiers by `roof.faces`) | §10.2 `DesignationTemplateRow.composition` | `cultureProfileKey` → DR1 → the culture key the chance reads |
| W64 | `dist.market` and `dist.harbour` at territory rungs (item 576 (b); V07 §2.4) | W12's market-ranked reservation (else the flanking square, the first nucleus's open space, the heart); W23's wharf `quay` way | the `nearMarket` and `nearHarbour` rows and needs of the classes that play themselves at a village rung (`market_hall`, `slave_market`, `harbour_master`, `customs_house`, `warehouse`, `ropewalk`, `granary`); V11 §3.13.4's `stepInward` and `finalSeller` for custom chains (V07 §3.11); the clerk | `ContextVector.dist` (§2.5; item 576 (b)) | the market kinds and the port kinds (`docks_port_facilities`, `customs_house`, `merchant_warehouses`, `ropemaker`, `town_granary`) → DR9, DR24 |
| W65 | `rules.claimArea` and the market halls' claims (V07 §2.2a, V07 §3.6 (4a)) | the shipped table (the `cloister` footprint a reference cell to V11 §3.6.1's `church` row); S2's manifest (a `cloister`- or `market-hall`-family class playing itself); W12; at a village epoch `village.records` for a record and V06 §3.9.6 or step (m) for a roster member (V07 §3.12) | S10's joins (a cloister's plot; a `market-hall`-family plot without a `nearMarket` row) and the rim claim's plot; VS6's capacity estimate; S10b claims-first; the claim-sized joins at village epochs and `village.outsidePlot` (W73); T-V7-42's compile check | §4.2 S3's claim form read at a village rung (an `institution` `Reservation` laid by VS4); V11 §3.6.1's families | `monastery_or_friary`, `fish_market`, `slave_market` → DR9, DR24 |
| W66 | the fair field (V07 §3.6 (4b)) | S2's `fair_ground` member (a dossier `annual_fair` record); VS5's perimeter and its road crossings; `rules.market.fairHa`, `fairAspect`; at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | S12a's commons claim (a `common` face, through `extraInputs`); `retypeLand` to `commons` at an epoch, with the `setAttr` of each `VillageField`'s `furlongs` the faces leave; (8v)'s perimeter re-derivation (a hole); S10b's binding of the member (no building); labels; the GeoJSON `open_spaces` layer; the clerk; the hand-off up (a standing secondary market) | `Reservation` kind `market`, rank `secondary` (item 24) | `annual_fair` → DR9 |
| W67 | the `VG` preset file's entries (V07 §3.15): this volume's `VG` column and switches, V11's five `presets.VG` entries, and the entry of every village-read `presetsRequired` cell | V07 §2.2's `VG` column and V07 §2.2a's cells; V11 §2.2's rule; V07 §3.15's list and rule over V11's compile manifest; the seat landing V-M0, and afterwards the seat landing a change that makes a table village-read (V-M2u) or adds a `presetsRequired` column to one, in that change (J-V7.123) | the loader's preset step (§7.6) under `VG`; V11 §3.2.1 step 4's preset check (V-M0's exit); B-VG's runs (T-V7-23, T-V7-29); V12's provisional-number lint | §7.6's parity presets (item 377) | — |
| W68 | `rules.race.densityPower` and its register entry `cal.village.*.rules.race.densityPower@VG` (V07 §2.2a, V07 §3.8, V07 §3.15) | the shipped table (1 at every rung, the `VG` entry provisional 1); V-M4's one `reference` run against VG (V12 §3.7.1 (c)) when T-V7-23's accepted-share row misses | S10b's race keys (V07 §3.8); V12's register and V-M4's register check; T-V7-23 | §7.6; V12 §2.6's register | — |
| W69 | the register entries of this volume's calibratable columns — `village.json`'s (V-M0) and the `presence` column's (V-M2) (V12 §2.6's `CalibrationEntry`; V07 §8 *The register at the exits*) | the seats landing V-M0 and V-M2, each in its landing change: V07 §3.15's named `…@VG` entry, then `plat calibrate register --defaults --milestone <id>` (V12 §3.11; J-V7.124) | the provisional-number lint (`plat calibrate register --check`, T-V12-20) at PR tier and every V07 §8 exit; V12's milestone exits; the corpus stage's target lists at M-CAL (V12 §3.10.5) | §13.7, §13.9 (V12 §3.11) | — |
| W70 | `village.records` — the product's records placement (`ProductDecl('village').records`, stage `S10b`; V07 §2.1, V07 §3.12 *Records at a village epoch*) | the engine's `dossier` step at a village epoch (V06 §3.2 row 12) and, on an absorb without an epoch, the base's *One path* placement and §7.7 item 2's removal, as item 202 calls it; the dossier event's `seq` (its key) | the placements and removals V07 §3.12 *Records at a village epoch* states — the fair field, a hall's claim and plot, a claim-sized join or W73's outside plot, the market rank, a forced pin (W25), a REPLACEMENT greater, and on `remove` the tombstones, unbindings and a removed market record's cleared rank; a declined record → S10b's `dossier` request | V06 §2.1's `ProductDeclEpoch.records` and `EpochPlacement` (item 202) | the market kinds (`weekly_market`, `market_square`, `periodic_market`, `fish_market`, `annual_fair`, `slave_market`), `monastery_or_friary`, `wayside_shrine`, `water_source`, `multiple_water_sources`, a `mercantile-market` or `sacred-shrine` custom record → DR9, DR24; `parish_church` and `fish_market` as REPLACEMENT greaters (V08 §3.5.1 (c), (d)) → DR9 with item 108; a removed record (`state: 'removed'`, §7.7 item 2) → `remove` |
| W71 | the siting override's step (m), the market members (V07 §3.12 *Village siting*) | S2's manifest at the epoch's target less the standing `fair_ground` and `nearMarket`-hall members (V06 §3.9.1's count, which V06 §3.9.6 leaves to it); V07 §3.6 (4)'s one creation draw against `market.law` | (a)'s fair field and (b)'s hall in the siting batch, before tier (0); the market rank ((d)); the epoch's record, undone by its undo record where the epoch is an undo target | the `siting` phase (`ProductDecl.phases`, item 317) | the market records' collectives (DR9 with item 108) |
| W72 | `village.pins` — VS8's rows at a village epoch (participant at `afterGrowth`, order 60, stage `VS8`; V07 §3.12 *Pins over epochs*) | the epoch's committed state: the housed households, the host faces the epoch tombstoned, the markets' reservations and ranks, (9v)'s new open spaces, the epoch's new crossroads and wells, the government's seat, a `Roadside Shrine` quarter whose claim anchors on no shrine; VS8's rows and its creation draws | orphans tombstoned (step 0), wells by coverage, stalls to count, the new hosts' rows and a Roadside Shrine quarter's shrine, the stocks by the law's crossing, a pin record's re-binding; glyphs, labels, exports (W25); T-V7-57 | V06 §2.1's `EpochParticipant`, V06 §3.2's participant table | `Common well`, `water_source`, `multiple_water_sources` (bound wells; DR9); the `Roadside Shrine` quarter (DR5) |
| W73 | `village.outsidePlot` — (c)'s outside plot (V07 §3.12 (c)) | a claim-sized class with no joinable candidate: V06 §3.9.6 in the `uses` step (a roster member) and `village.records` in the `dossier` step (a record) | the hinterland unit's S10 in its incremental form (the plot on the nearest hinterland face adjoining a road beyond the perimeter, the face's remnant kept), S11's `build` (finished on an absorb without an epoch), `openUse`; the `VillageField`'s `furlongs`; the epoch's record or the absorb's commit | §4.9's outside plots (item 314) | `monastery_or_friary`, `slave_market` → DR9, DR24 |
| W74 | the village `WhyProvider` for `VillagePlan`, `VillageField` and `VillageEnd`, with its `info.village.*` answer rows (V07 §4.5) | the committed records; V07 §2.3's recorded sources (`formSource`, `roadsSource`, `heartSource`), the heart's terms, a field's system, an end's reason; `RaisedRead.origin`; a generated wall's platform | V10's `why` query and the application's why card (V10 §3.9's owed table); T-V7-61 | item 270's `WhyProvider` registry (§2.8; §11.2's `why`) | the recorded dossier sources (`formSource`/`roadsSource` `dossier`) |
| W75 | item 111 at village rungs — the arid water weights, the oasis village, the water pull on the crowding map, the climate cell on the sun readings, the wells' arid coverage (V07 §3.1 (1), V07 §3.2 (4), V07 §3.3, V07 §3.10) | the climate row's arid chances, oasis chance, water-pull weight, sunlight cell and well-coverage factor (V11); S1's oasis and spring (§4.2 S1 (2)); the top well-yield ground (§4.2 S1 (10)) | S0's water draw; VS1's heart; VS2's density; VS5's pass 1 (the base's water term); V07 §3.9's suitability; VS8's wells; T-V7-58 | §4.2 S0–S1, S3 (6)'s `q(x)`, §4.5 (item 111) | `oasis_water` → DR1's oasis; the desert terrain (V08) |
| W76 | item 113 at village rungs — a village over a former town or city and refounding at village rungs (V07 §3.12a) | §4.11 *History-first generation*: the peak (`HistoryHint.peak`, V08), the replay's epochs (V06), a destruction event; the ruined geometry of the former settlement | the replay's hand-off down (V07 §3.12) with its remnant readings; a refounded village's lattice pricing, tracker trace pull, crossing reuse and foundation-slot weight; V04's buried former settlement under a village (V04 §3.5.5 (b)); the clerk's story (V10); T-V7-59 | §4.11 (item 113); DR36 onward (§7.7) | V08's history reading (`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, the ruined higher-tier records) |
| W77 | the palisade's run conditions and patch materials (item 114; V07 §3.4 (8)) | at generation §7.7's readiness-and-wealth row; at an epoch V06 §3.7's walls step (need and means); T3 `wall`'s `repairWall` with its material; `walls.patchMaterials`' rows by kind and culture (V11 §3.25.3) | render (V07 §5.1's condition looks, the legend); exports (condition and material; a patch a wall, a breach an opening); the clerk (W74's `info.village.palisadeRun`); T-V7-62 | `Enceinte.condition` (§2.7; a stretch-state profile, §2.2 rule 5) | the dossier's `readiness` label and `wealth` (V08) |
| W78 | the grandeur ceiling at village rungs (item 115; V07 §3.8) | V11's ceiling rows by rung (§10.2's shape); S10b's class mix; DR6's wealth shift; a dossier's manor record or `villageSeat` ("specified", V08) | S10b's generation fill and the manor's presence; V02's composition chain (the capped rows); the clerk (`info.village.ceiling`); T-V7-63 | §4.7 S10b's rung ceiling; §10.2 | DR6 wealth; DR11 seats; a manor or hall record |
| W79 | the township view at the zoom-out limit (item 116; V07 §5.2) | the map's `bounds` (the territory frame, grown by an epoch or an edit) | the view's zoom-out stop, the pyramid's tiles, the export frame; T-V7-64 | §8.8's per-map limit | — |
| W80 | the village through the year (item 117, (f2) included; V07 §5.1) | the view's year position (§2.9), §7.7's calendar row (the dossier's week), the climate's season columns (§4.2 S0, §10.2), V11's season tables by field, garden and water kind and its leaf palettes | §8.2's season, cover, `ice` and `snow` rows over the village's fields, strips, commons, green, ponds, leat, crowns and roofs; exports naming the season; the clerk (`info.village.season`); T-V7-65 | §8.2's season rows (item 117) | the campaign calendar's week and season (V08) |
| W81 | the festival decorations of the village rungs (item 118; V07 §5.1) | the view's year position and festival display (§2.9); §7.7's `traditions` row (window, staging); V11's decoration, staging-keyword and motif tables | §8.2's decoration rows at the village's places (the heart, the green, the church lane, the market, the landing); exports (the image only); the clerk (`info.village.festival`); T-V7-66 | §8.2's decoration rows (item 118) | `traditions[]` (V08) |
| W82 | the village's one-time waits (item 119; V07 §6) | V07 §6's target laws and measured figures; §12.1's reference machine; V11's `perf.qualitySpend` rows (none shipped for a village stage) | the comfort-level bar T-V7-67; V09 §4.21.9's progress view past one second; the VILLAGE row's declared target miss and the fallback's re-declared bar (V07 §6) | §12's comfort level, measured-gain and progress rules (item 119); §4.1's quality budget | — |
| W83 | Find at the village rungs (item 120; V07 §5.5) — the list's village entries, the area targets (the ends, the village, the field groups), the named places, Show gaps' units (the ends) | §11.2's gazetteer at the view's effective key over the committed records; V11's lexicon (labels, synonyms, groups) with V07 §2.4's `v.` words; W24's ends, W21's fields, V07 §5.3's label rows; the view key `find` (§2.9) | V09's Find panel and its `live.find` overlay; §8.2's veil, halo, outline, pin and bubble rows; picture exports (V07 §5.4; §11.1); the clerk's "show me" (V10); T-V7-68 | §2.9's view key `find`; §11.2 (item 120) | the institution names (V08's list entries) |

**The dossier facts this volume reads, traced** (field → derivation row → piece): `population` → DR23, DR7 → W2, W17;
`tier` → the title word (§9.5, V07 §5.3); `terrain` → DR1 → W4, W5, W6, and its oasis (`oasis_water`) → W9, W75;
`tradeRouteAccess` → DR2 → W4, W11, W23; the wall records → DR2 → W10; the partners → DR3 → W11; `cultureProfileKey` → DR1 →
W5's forms and the longhouse factor (V07 §3.8); `prosperity` → DR6 → W14 and S2's band shares; `government` → DR11 → W18's
seats (manor, reeve's house, the moot); `institutions[]` → DR9, DR24 → W18, W19; the housing record's range → DR7 → W17;
`spatialLayout.quarters[]` → DR5 and item 16 → W24; landmark strings → V08's `landmarks` row → W16's yard parts and names;
deposits → `site.deposits` (V08 §2.6) → DR19 → W20; custom institutions and active custom chains → item 104 → W18 (V11
§3.13.2's `village` cells) and V07 §3.11's chain placement (V11 §3.13.4, reading W64); `activeConditions` (a migration) →
DR18 → tent clusters at the perimeter; the supply chains (`activeChains[]`) → V08's chain row (item 105 (i)) → W38, W39; an
institution name carrying a count range or a ladder qualifier → DR9 with item 108 → W37; `monsterThreat` → V08's `threat`
row (`Intent.defence` ≥ 0.6) → the `v.watchtower` presence (V07 §2.4); the sea threats → V08's `threats` row
(`PortValues.threats`) → the watchtower at the wharf and the open waterfront (V07 §3.11's DR2); a kind whose `kinds` row
implies a bridge (`Toll bridge`) → V08's `kinds` row → W5's forced brook and its bridge (V07 §3.1 (1)); `ancient_ruins`, a
ruined-landmark record, `magical_node`, the ley-line income rows and a `magical` history event → V08's ruin and magic rows
(DR19, DR24, `HistoryHint`) → W45, W47; `terrain` `hills` and `mountain` → DR1's relief → the slopes W57 and W58 level and
W45's cavern rows; `cultureProfileKey` → DR1 → W63's tier chance; a toll-house or chapel record on a bridge → V11's `deckOk` →
W60; no small-dossier fact makes a raised way (W59); the mining deposits (iron, precious metals, gemstones, coal, copper) →
DR19 → W45's mine boost and W46's working breach; `burial_ground` and `graveyard` → DR9 → W48, W56; a crypt record → W48
with chance 1; `access_to_external_mill` → V11's `@absent:watermill+windmill` → W56 (no mill, milling imported);
`access_to_parish_church` → V11's `@absent:church` → W56 (no parish church, parsonage or tithe barn; a chapel of ease by its
row); `parish_burial_grounds` → V11 §3.12's COUNT → W48 (one burial face per standing church's churchyard); Wealthy and
Common Residential and the Religious Quarter's phrase → DR5 → W56; the church records and ranges → item 108 → the
hand-off's church count (W49); the market kinds and a `mercantile-market` custom record → DR9, DR24 → W12's market rank,
W64, W65, W66, and at a village epoch W70 (a record) and W71 (a roster member); `wayside_shrine`, `water_source`,
`multiple_water_sources` and the `mercantile-market` and `sacred-shrine` archetype cells → DR9, DR24, V11 §3.13.2 → W25's
forced pins, at a village epoch through W70; the port kinds → DR9, DR24 → W64; `monastery_or_friary` → W65's cloister area;
a `town_watch` record → DR9 with item 108 → the `v.watchtower` member's own soft row (V07 §3.11 DR9); the history
(`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, a ruined or remnant higher-tier record)
→ V08's history reading and DR36 onward → W76; the `readiness` label and wealth → §7.7's item-114 row → W77; a manor or
hall record and a government's `villageSeat` → item 115's "specified" → W78; the campaign calendar's week and season → §7.7's
item-117 row → W80; `traditions[]` (their windows and staging) → §7.7's item-118 row → W81; the institution names → V08's
Find list entries (item 120) → W83.


## 2 Data model

Units are §2.1's (`M`, `Cm`, `Cdeg`; areas in m² or ha as named). The product lives in its own package, `@plat/village`
(item 505), which depends on `@plat/layout` and `@plat/plots` through their interfaces only, as `@plat/hood` does (§14),
and registers its stages and strategies by declared I/O (§4.12). Nothing in this section restates a base record; the
base records this volume reads gained their fields through file f (V07 §10).

### 2.1 The village ladder, the product registration and the population floor

**The rung rows** are §1.1's THORP, HAMLET and VILLAGE rows of `ladder.json` (item 201: bands, targets, frame law and
minimum, stage rows, granularity, greenery, `matched.vg`, layers), their floor lowered to 1 to admit SettlementForge's
smallest thorps (its thorp band starts at 8 people; J-V7.1). This volume gives their households and dwellings:

| rung (default target) | households / dwellings at the target |
|---|---|
| THORP (40) | 9 / 8 |
| HAMLET (200) | 44 / 41 |
| VILLAGE (700) | 156 / 148 |

Dwellings are fewer than households because two households may share a longhouse or a farmstead at the poor and modest
bands (`household.share2`, V07 §2.2). Budgets are V07 §6's laws. A village row's one unwalled stage means the village is
not grown in growth stages at creation; its growth over time is V07 §3.12's path. The village rows carry no split switch:
item 105 (h)'s threshold decides a generated works-and-shop split at village rungs as everywhere, its one off switch V11
§3.7.4's `siting.web.splitEnabled` (false in the parity presets, `VG` included; J-V7.115); inside a village's span it
rarely fires, a village craftsman selling at his works or from a stall on the green (VS8's `stall` pins, V07 §3.10). A
declared split and a standing pair across a rung change are item 310's. **Layers:** caverns and ruins are gated by the
site, not the rung (item 109 (j) (1); V07 §3.16); the catacomb, quarry, vaults and buried-town systems keep their TOWN gate
(item 109 (j) (1), (k) (1)).

**The floor and the ceiling.** A population of at least 1 and below 1 500 is a village; the ceiling is D-33's 1 500, so the
ladders meet without gap or overlap (§1.1). A creation request below 1 is an F-EDIT conflict whose dry run offers 1; a
dossier below 1 is refused `E_RUNG_UNAVAILABLE` naming the floor (§7.7 item 15; item 202). At an **epoch**, a target below
1 keeps the THORP row and runs V07 §3.12's desertion — a deserted village is an outcome of decline, never an error
(J-V7.2).

**The hand-off band** (hysteresis; J-V7.68). At an epoch the product is a fold over the epochs, never a stored flag
(J-V7.3): before the first epoch it is the product that registered the creation's `Recipe.rung`; at each epoch a
village-product document passes to the base product only when the epoch's target reaches `1 500 × (1 + handoff.band)`
(1 575 at the default 5 %), and a base-product document passes to the village product only when the target falls below
`1 500 × (1 − handoff.band)` (1 425); inside the band the previous epoch's product runs, reading its own rung row at the
edge of its range (a 1 560-person village on the VILLAGE row, a 1 440-person town on the TOWN row). At creation there is
no band: the population alone routes (§1.1). A target alternating 1 480 / 1 520 therefore never changes the product, one
alternating 1 400 / 1 600 changes it at every epoch, each change a whole hand-off (V07 §3.12). The fold is item 322's at
§4.11 (*The product at an epoch*).

**The product registration** is item 202's: one `ProductDecl` per product in `StrategyRegistry.products`, read by
`LadderRouter.route` (§1.1) and by the port at creation and every absorb. Its type is this one (item 202):

```ts
interface ProductDecl extends ProductDeclEpoch /* V06 §2.1's members phases?, participants?, rows?, records?, landed with item 202;
    the village's values are V07 §3.12's *The village's registration* */ {   // @plat/layout's registry entry for a product; the base registers 'base', @plat/village 'village'
  id: 'base' | 'village'; rungs: Rung[] /* the ladder.json rows it builds (Rung: §1.1) */; stages: StageDecl[] /* by declared I/O, §4.12 */;
  strategies: { network?: string; enceinte?: string; fabric?: string; river?: string; placement?: string; fieldSystems?: string[] };
  extraInputs?: Record<string /* a reused base stage's id */, string[] /* data keys added to its declared inputs */>
    /* the village adds `districts` to S7's inputs, so VS5 precedes S7, and `reservations.fair` to S12a's (V07 §3.0, V07 §3.6 (4b)) */;
  tables: TableId[] /* TableId: §7.6; the product's own tables: village.json (V07 §2.2) */; version: string }
```

No recipe field records the product: `Recipe.rung` (item 276) names the creation rung and the product that registered it
replays the creation (§2.9); at an epoch the fold above chooses the product, rung and phases (V07 §3.12), so a village grown
into a town and a town shrunk into a village each run the right path without a stored flag (J-V7.3). The overrides, the
participants and the records hook land with item 202 on M4's grow path at its call points (§4.11 (e)–(h); J-V7.132).

### 2.2 The village rung table (`village.json`) — every village-specific rule value, as data

One versioned table in `@plat/tables`, `village.json`, one `VillageRungRow` per village rung, every cell `{ value, unit,
provenance, calibratable }` (§1.7's data row), editable by `editTable` (§7.6). A cell may carry a `VG` parity value
(`presets: { VG }`, item 377), read by the `VG` preset as the `MFCG` and `FTG` presets read theirs.

```ts
type VillageRung = 'THORP' | 'HAMLET' | 'VILLAGE';
type PlanForm = 'grown' | 'street' | 'green' | 'nucleated' | 'polyfocal' | 'row' | 'dispersed';
type RoadTopology = 'isolated' | 'through' | 'dead_end' | 'crossroads';
type FieldSystem = 'vg_sector' | 'open_field' | 'enclosed' | 'infield_outfield' | 'forest_strip' | 'mfcg_belt';
interface VillageRungRow {
  rung: VillageRung;
  household: { meanSize: number /* persons */; share2: Record<string, number> /* per band: the share of dwellings two households share */;
    minSize: number /* the least mean household size DR7's re-solve may reach (V07 §3.11) */ };
  bandShares: Record<string, number> /* household wealth shares over §4.5's band set, Σ = 1 */;
  territory: { usableShare: number; minKm2: number; marginShare: number }   // the area per head is derived (V07 §3.9 (1))
  rasters: { heightCm: Cm; hydroCm: Cm; densityCm: Cm; daylightCm: Cm } /* cell sizes */;
  forms: Record<PlanForm, number> /* the plan-form weights of the feature table's village row */;
  cultureForms: Record<string /* the dossier's culture profile key */, Partial<Record<PlanForm, number>>> /* multipliers */;
  roads: Record<RoadTopology, number>; neighbourTracks: { base: number; perDoubling: number; min: number; max: number } /* 1 + round(log₂(P ÷ 40)), clamped 1–4 */;
  water: Record<'none'|'brook'|'stream'|'river'|'pond'|'coast'|'island'|'estuary'|'confluence', number>;
  density: { radialPeak: number; reachShare: number; bandWeight: number; bandMinM: M; waterTerm: number; waterReachM: M;
    sunTerm: number; slopeTerm: number; slopeFrom: number; floodTerm: number; epsShare: number; dial: [number, number]; populated: number };
  network: { stepM: M; lookAheadM: M; weight: { through: number; road: number; track: number }; turn: [number, number]; organicTurn: number;
    branchFactor: [number, number]; waterRepel: number; waterAttract: number; waterReachM: M; pullThrough: number; pullRoad: number; wallPush: number;
    trailMinShare: number; bridgeSnapM: M };
  open: { chance: Record<'dry'|'water'|'island', number>; rim: [number, number] /* dwellings of the widest ordinary width the rim holds */;
    round: Record<'dry'|'water', number>; scale: [number, number]; green: { widthM: [M, M]; lengthRatio: [number, number]; haPerThousand: number };
    centrepiece: Record<'well'|'large_tree'|'pond'|'cross'|'none', number> };
  palisade: { chance: number; denseChance: number; denseDialFrom: number; waterFactor: number; lattice: number; keepBelow: number; flatten: number;
    pullM: M; resampleM: M; bandM: M; kinds: Record<'palisade'|'earthwork'|'inner', number>; heightCm: Record<'palisade'|'earthwork'|'inner', Cm>;
    section: { palisadeThickCm: Cm; bankWidthM: M; ditchWidthM: M; innerThickCm: Cm } /* the full sections (V07 §3.4 step 6) */;
    barrierReachShare: number /* item 106 (b)'s reach: min(the base's wall.barrierReachM, this share × R_s) */;
    lightHeightCm: Record<'palisade'|'earthwork'|'inner', Cm> /* item 106 (c)'s light stretch (V07 §3.4 step 6) */;
    minStretchM: M /* a non-water closing arc shorter than this between two walled stretches is walled through */;
    reachedCloseHa: number /* a reached face's commons close is split at this area (V07 §3.4 step 5 b) */ };
  toft: Record<string /* band */, { frontageM: [M, M]; toftM: [M, M]; croftM: [M, M]; jitterCv: number }>;
  fields: Record<FieldSystem, number> /* default weights; the factor rows of V07 §2.2a multiply them (V07 §3.9) */;
  farm: { outlyingShare: Record<PlanForm, number> };
  epoch: { encroachShareMax: number /* of a green's or common's area, over its life */; newNucleusShare: number /* of N, one epoch's residual */;
    rows: ProductEpochRows /* V06 §2.1's type: persistence keyed by class id, street { classes, op, again, reopen }, hinterland
      { slack, order, cap } — the cell ProductDecl('village').rows names, read by V06's decline and hinterland steps (V07 §3.12) */ };
  rules: VillageRuleCells /* V07 §2.2a: every other rule constant of V07 §3, typed */;
  provenance: Provenance }
type PLaw = { at: [number /* persons */, number][] }   // the anchor law: piecewise linear in ln P between anchors, clamped outside
```

**The anchor law — smooth scaling by population** (DEFINITION §2: "Inside a band, everything scales smoothly with the
head count"; J-V7.47). A per-rung value in the table below is an **anchor**: the three rung columns are the value at the
rung targets (40, 200 and 700 people), and the value at a population `P` is read piecewise linear in `ln P` between
neighbouring anchors and clamped outside them, so nothing steps at 80 or 400 people and no default moves at a target. A
cell may state its own anchors as a `PLaw` (V07 §2.4's presence rows); weight rows (forms, kinds, fields, water, band
shares) are read per entry and renormalised; a count is the law's value rounded to the nearest integer and never below
the law at a smaller `P` (monotone). Three kinds of cell are **rung-stepped** by design and read the rung's own column: the
raster cell sizes (a resolution, not a rule; V07 §6's law prices them), `territory.minKm2` (it binds only below 13 people)
and the `VG` column. T-V7-41 checks every law.

**The default rows.** Provenance `ref:VG 1.6.9 … (code)` (trace key D5) where marked VG, `own` otherwise; every numeric
cell calibratable, the corpus stage recalibrating the `own` ones. The switch and mode cells — `terrace.enabled` (V07
§2.2a), `vg.emptyRoadPrune`, `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode`, `plate.qualifier` and the
`epoch.rows` op, class-list and order cells — carry `calibratable: false` (J-V11.75; J-V7.121), since a calibratable cell
is one a run may name (V12 §3.7.2 (1)) and a run searches numbers; so do `rules.ladders.ranges` (J-V7.114) and every
reference cell of V07 §2.2a (its target cell's flag governs). The `VG` column is the parity preset's value where it
differs; its entries' provenance and the preset file are V07 §3.15's.

| cell | THORP | HAMLET | VILLAGE | VG preset | provenance |
|---|---|---|---|---|---|
| household.meanSize | 4.5 | 4.5 | 4.5 | one draw per village, uniform in [3, 7] (V07 §3.8) | own (medieval peasant household); VG: population per house as one village-wide draw |
| household.share2 (poor, modest) | 0.3, 0.15 | 0.2, 0.1 | 0.15, 0.05 | 0 | own |
| household.minSize | 1.5 | 1.5 | 1.5 | 1 | own (a household under 1.5 persons on average is a village in decline: DR7 builds the surplus vacant, V07 §3.11) |
| bandShares squalid / poor / modest / comfortable / prosperous / rich | 0.04 / 0.26 / 0.36 / 0.26 / 0.08 / 0 | 0.05 / 0.26 / 0.34 / 0.25 / 0.08 / 0.02 | 0.05 / 0.25 / 0.33 / 0.25 / 0.09 / 0.03 | as default | own (cottars, smallholders, husbandmen, yeomen, the lord's household) |
| territory per head (derived, no cell) | 2.275 ha | 2.275 ha | 2.275 ha | — (VG has no territory: the frame is VG's view at `matched.vg.size` — small, medium or large: 300, 500 or 800 units, 210, 350 or 560 m square at 0.7 m per unit (`rules.vg.frameM`) — plus its 48-unit ≈ 34 m margin) | the sum of the FarmTable village rows (V07 §3.9 (1)) |
| territory.usableShare / minKm2 / marginShare | 0.8 / 0.36 / 0.1 | 0.8 / 1.0 / 0.1 | 0.8 / 4.0 / 0.1 | — | own |
| rasters height / hydro / density / daylight (rung-stepped) | 4 / 16 / 4 / 20 m | 5 / 24 / 4 / 20 m | 8 / 32 / 4 / 20 m | as default | own (VG's 128 × 128 grid is ≈ 3–5 m per cell); the hydrology grid only drains the land — a village's rivers are vector, course-first (V07 §3.2 (2)) — so it is coarse (J-V7.61) |
| forms grown / street / green / nucleated / polyfocal / row / dispersed | 0.25 / 0.25 / 0 / 0 / 0 / 0 / 0.5 | 0.4 / 0.2 / 0.15 / 0.05 / 0.1 / 0 / 0.1 | 0.35 / 0.15 / 0.2 / 0.15 / 0.1 / 0.05 / 0 | grown 1 | own; `grown` is VG's form |
| roads isolated / through / dead_end / crossroads | 0.56 / 0.21 / 0.14 / 0.09 | as THORP | as THORP | as default | VG (its road-tag roll as shares; an island forces isolated) |
| neighbourTracks | `1 + round(log₂(P ÷ 40))`, clamped 1–4: 1 at 40, 3 at 200, 4 from about 227 | (law) | (law) | 0 | own (a township's roads to its neighbours) |
| water: none | 0.33 | 0.33 | 0.33 | 0.33 | VG |
| water: brook / stream / river | 0.10 / 0.09 / 0.06 | as THORP | as THORP | river 0.25 | VG's river share, split by our width classes |
| water: pond / coast / island | 0.083 / 0.167 / 0.083 | as THORP | as THORP | as default | VG |
| water: estuary / confluence | 0.042 / 0.042 | as THORP | as THORP | as default | VG |
| density radialPeak / reachShare / bandWeight / bandMinM | 1.5 / 1.35 / 1.0 / 20 m | as THORP | as THORP | 1.5 / (the map half-width) / 1.0 / — | VG (peak and band); own (reach from demand, band floor) |
| density waterTerm / waterReachM / sunTerm / slopeTerm from / floodTerm | 0.3 / 300 m / 0.25 / −0.5 from 0.15 / −0.6 | as THORP | as THORP | 0 / — / 0 / 0 / 0 | own; the sun term is item 102's village reading (V07 §3.3) |
| density epsShare / dial / populated | 0.1 / [0.5, 2] / 0.05 | as THORP | as THORP | 0 / {0.5, 1, 2} / 0 | VG's density dial (sparse ½, dense 2); own |
| network stepM / lookAheadM / bridgeSnapM | 3.5 / 3.5 / 30 | as THORP | as THORP | 3.5 / 3.5 / 0 | VG (its 5-unit step at 0.7 m per unit); own snap |
| network weight through / road / track | 0.5 / 1 / 2 | as THORP | as THORP | as default | VG (the per-type terrain weight) |
| network turn (drawn once per village) / organicTurn | 0.05 + 0.2 · F4 / 0 | as THORP | as THORP | as default | VG (F4 is V07 §3.1's folded draw) |
| network branchFactor (× the mean dwelling width) | 4 + 8 · B3^1.5 | as THORP | as THORP | as default | VG (B3 is V07 §3.1's bump draw) |
| network waterRepel / waterAttract / waterReachM | 5 / −10 / 45 m | as THORP | as THORP | as default | own, fitted at V-M1 to VG's shore-parallel share and bridge count (V07 §8) |
| network pullThrough / pullRoad / wallPush | 0.2 / 0.1 / 0.5 | as THORP | as THORP | as default | VG |
| network trailMinShare | 1.0 | as THORP | as THORP | 1.0 | VG (a trail is at least one branch spacing long) |
| open chance dry / water / island | 0.2 / 0.1 / 0.3 | 0.4 / 0.2 / 0.6 | 0.4 / 0.2 / 0.6 | 0.4 / 0.2 / 0.6 | VG for the `grown` form (other forms: V07 §3.6) |
| open rim / round dry / round water | 12–19 / 0.7 / 0.9 | as THORP | as THORP | as default | VG |
| open scale (× √(P ÷ target)) | [0.5, 2] | [0.5, 2] | [0.5, 2] | [1, 1] | own (VG's square does not grow with the village; ours does) |
| open green widthM / lengthRatio / haPerThousand | — | 25–45 / 3–5 / 0.8 | 30–60 / 3–6 / 0.8 | — | own (green villages) |
| open centrepiece well / large_tree / pond / cross / none | 0.35 / 0.25 / 0.2 / 0.15 / 0.05 | as THORP | as THORP | VG's own (a tower, else a tree or a well; none on water) | own |
| palisade chance / denseChance / denseDialFrom / waterFactor | 0.10 / 0.15 / 1.4 / 0.5 | 0.15 / 0.25 / 1.4 / 0.5 | 0.2 / 0.3 / 1.4 / 0.5 | 0.2 / 0.3 / 1.4 / 0 | VG (dry maps only); own for the smaller rungs and water |
| palisade lattice / keepBelow / flatten / pullM / resampleM / bandM | 10 / 0.1 / 0.1 / 10 m / 17 m / 8.5 m | as THORP | as THORP | as default (`pullM` unread: the pull is off under `VG`) | VG (a 10 × 10 lattice, kept with probability density − 0.1, the flattest-vertex drop, a 24-unit resample and 12-unit band); own pull |
| palisade kinds palisade / earthwork / inner; heights | 0.8 / 0.2 / 0; 300 / 180 / 500 cm | 0.75 / 0.25 / 0 | 0.6 / 0.3 / 0.1 | palisade 1 | own (timber stakes, bank and ditch, a small stone wall) |
| palisade section palisadeThickCm / bankWidthM / ditchWidthM / innerThickCm | 40 cm / 4 m / 3 m / 120 cm | as THORP | as THORP | as default | own |
| palisade barrierReachShare / lightHeightCm (palisade, earthwork, inner) / minStretchM / reachedCloseHa | 0.5 / 150, 100, 250 cm / 25 m / 1 ha | as THORP | as THORP | — (the barrier closure off: VG's water cut, V07 §3.15) | own (item 106 (b), (c) at village scale: a wattle fence or dead hedge on steep ground and marsh, a low bank, a parapet) |
| toft frontage / toft depth / croft depth (squalid: hovels) | 5–8 / 8–15 / 0–10 m | as THORP | as THORP | the house width plus a gap (V07 §3.8) | own (a cottar's hovel on a scrap of ground) |
| toft frontage / toft depth / croft depth (poor) | 8–12 / 15–25 / 20–60 m | as THORP | as THORP | the house width plus a gap (V07 §3.8) | own (toft-and-croft plots) |
| toft (modest) / (comfortable) / (prosperous) | 12–18 / 20–30 / 40–100; 16–24 / 25–35 / 60–150; 20–30 / 30–40 / 80–200 m | as THORP | as THORP | as above | own |
| toft (rich: the manor) / jitterCv | 40–80 / 40–80 / 100–300 m; 0.2 (`row` form 0.05) | as THORP | as THORP | as above | own |
| fields vg_sector / open_field / enclosed / infield_outfield / forest_strip / mfcg_belt | 0.1 / 0.2 / 0.3 / 0.3 / 0.1 / 0 | 0.1 / 0.4 / 0.2 / 0.2 / 0.1 / 0 | 0.1 / 0.6 / 0.15 / 0.1 / 0.05 / 0 | vg_sector 1 | own; P17 for the VG construction |
| farm outlyingShare grown / street / green / nucleated / polyfocal / row / dispersed | 0.15 / 0.1 / 0.05 / 0.05 / 0.1 / 0.05 / 1.0 | as THORP | as THORP | the trail ends only (V07 §3.5) | own; VG's farmsteads at track ends |
| epoch encroachShareMax / newNucleusShare | 0.25 / 0.3 | as THORP | as THORP | — (VG has no epochs) | own (squatters on the waste) |
| epoch.rows.persistence (× the building layer's rate, V06 §3.5.2) | one key per member of V11 §3.5.1's `church-family` tag (the list is V11's; the compile check of T-V7-44 fails a cell whose keys differ from the tag's members) × 0.3; `v.manor_house`, `manor`, `tower_house` × 0.5 | as THORP | as THORP | — | own (churches and manors outliving their villages; the town classes keyed too, so a handed-down town's standing church and manor outlive it) |
| epoch.rows.street | classes `through`, `primary`, `secondary`, `lane`, `alley`, `cul_de_sac`, `track`, `path`; op `retireWay`; again `effaceWay`; reopen `reopenWay` (item 268) | as THORP | as THORP | — | own (V07 §3.12's hollow ways) |
| epoch.rows.hinterland | slack 0.2; order `perimeterPoorest`; cap `greatFieldPerEpoch` | as THORP | as THORP | — | own (V07 §3.12's land use following the households) |

The `cultureForms` rows multiply the form weights by the dossier's culture profile key (DR1's `site.culture`): `celtic` ×
2 on `dispersed`, `norse` × 2 on `dispersed`, `germanic` × 1.5 on `green` and `row`, `slavic` × 2 on `street` and × 1.5 on
`green`, `latin` and `greek` × 2 on `nucleated`, others 1 — our own reading of regional village forms (own, calibrated at
the corpus stage; J-V7.6).

### 2.2a The rule cells — every other constant of V07 §3, typed (`VillageRungRow.rules`)

Item 23 and DEFINITION §5 ("Rules are data"): no rule constant of V07 §3 stands in prose alone. Each is a cell of
`VillageRuleCells`, `{ value, unit, provenance, calibratable }`, editable by `editTable`, versioned with `village.json` (V07
§2.6) and read by the stage named; a cell given one value is the same at every rung, and a `PLaw` cell follows the anchor
law (V07 §2.2). A cell may instead be a **reference cell** (§7.6: resolved at load, a dangling or unit-mismatched reference
failing the table compile, `editTable` replacing it by a value and its inverse restoring it; J-V7.96): a value another
volume owns is held so, never copied. Provenance is `own` (calibratable at the corpus stage) unless marked `VG`
(`ref:VG 1.6.9`, trace key D5).

```ts
interface VillageRuleCells {
  heart: { latticeM: M; middleShare: number; slopeMax: number; slopeRelaxed: number; crossing: number; crossingM: M; water: number; waterM: M;
    sun: number; wind: number; fertile: number; fertileM: M; frame: number; frameM: M; prominence: number; prominenceM: M; random: number };  // V07 §3.2 (4)
  polyfocal: { extraChance: number; spacingMinM: M; spacingShareRs: number };                         // V07 §3.2 (4), V07 §3.12 (9v)
  settle: { settledShare: number; stretchMajor: number; stretchMinor: number; boxShare: number; boxMinM: M };   // V07 §3.2 (6), V07 §3.3
  mill: { fallM: M; fallWithinM: M; distM: [M, M]; downstream: number; crossing: number; crossingM: M; heartSide: number; random: number;
    leatMaxM: M; leatFallbackM: M; headM: M };                                                        // V07 §3.2 (7), F-V-MILL
  grade: { through: number; road: number; track: number; maxTurnCdeg: Cdeg };                        // V07 §3.5 step 5
  branch: { sideOdds: [number, number, number]; contAfterOne: number; contAfterTwo: number; shoreSteerSteps: number;
    retreatSteps: number; crossingSearchShare: number };                                              // V07 §3.5 steps 2, 6; F-V-TRACK
  formRules: { streetSideSpacing: number; streetBackLane: number; nucleatedCrossroads: number; nucleatedBranch: number;
    nucleatedWithinShareRs: number; crossroadsWeight: number; rowStraightness: number; rowBackLane: number; rowJitterCv: number;
    dispersedBranch: number; dispersedTrackLimit: number; isolatedWeight: number; dispersedDialMax: number;
    organicDialFrom: number /* the planned ↔ organic dial from which `organic` resolves true */;
    districtDensity: number /* δ's multiplier under a `district` request */ };                          // V07 §3.1, V07 §3.5
  openShape: { alongRoad: number; spiralGrowth: number; slopeStretchAt: number; vertexM: M; roadWithinR: number;
    vgTower: { round: number; square: number }; shrink: number; shrinkTries: number };               // V07 §3.6, F-V-OPEN
  market: { law: PLaw /* the market's chance with no dossier market record */; fairHa: number; fairAspect: number /* long ÷ short */ };   // V07 §3.6 (4), (4b)
  claimArea: { cloister: { plotM2: [number, number, number, number] /* m², poor / modest / prosperous / rich */;
      footprintM2: [number, number, number, number] /* p50 by band: a reference cell to V11 §3.6.1's `church` row */ };
    marketHall: { coverage: number /* plot = the family's footprint p50 ÷ this */; aspect: number /* the claim's long side ÷ its depth */;
      depthShareR: number /* the claim's depth at most this × the open space's radius */ } };           // V07 §2.4, V07 §3.6 (4a), V07 §3.8
  perimeter: { closeM: M /* the morphological close */ };                                              // V07 §3.7 (1)
  ends: { minPlots: number; capBase: number; capPerHouseholds: number; capMax: number };             // V07 §3.10
  stalls: { perHouseholds: number; min: number };                                                      // V07 §3.10
  pins: { wellPerHouseholds: number; wellWithinM: M; cross: number; trough: number; shrine: number; maypole: number; stocks: PLaw;
    pond: number; pondWithinM: M };                                                                    // V07 §2.4, V07 §3.2 (8), V07 §3.10
  manor: { moatChance: number; moatWaterM: M; moatWidthM: [M, M]; fishpond: number; fishpondM: M; warren: number; gallows: PLaw };  // V07 §3.8, V07 §3.9 (6)
  presence: { siteReachM: M };  longhouse: { fallLineSlopeMin: number };                             // V07 §2.4's presence tests, V07 §3.10's pin-record rule; the longhouse's axis (S11)
  slot: { startClearM: M; rimMultiplier: number; closeJoin: number; backCloseHa: number; backCloseDepthShare: number };   // V07 §3.7, V07 §3.8
  race: { densityPower: number /* unit none, range [0.5, 3] */ };                                    // V07 §3.8's race keys; V07 §8 risk (2)
  fields: { factor: { key: string /* climate, relief, culture or era value */; system: FieldSystem; times: number }[]; tolerance: number;
    greatFields: number; twoFields: number; furlongHa: [number, number]; headlandM: M; stripM: M; stripRangeM: [M, M]; furrowSlope: number;
    infieldM: M; outfieldCycle: number; commonPerHa: number; stripMaxM: M; claimBandM: M; woodShade: number; arableSlope: number;
    arableDistM: M; woodSlope: number };                                                              // V07 §3.9
  ladders: { replaceShare: number; churchSpacingM: M; churchSpacingShareRs: number;
    ranges: { step: 'COUNT'|'GUILD'|'QUARTER'|'SIZE'; qualifier: string /* the row's label: the qualifier word read for that step */;
      member: string /* V11 §3.12's member class as the class that plays it at a village rung — a `v.` id or a class playing itself — or '*' */;
      range: PLaw[] /* [low, high] */ }[] };                                                          // V07 §2.4, V07 §3.11
  handoff: { band: number };                                                                           // V07 §2.1, V07 §3.12
  vg: { householdDraw: [number, number]; frameM: Record<'small'|'medium'|'large', M>; marginM: M; fieldM2PerDwelling: number;
    fieldOneHouse: boolean; orchardOnHouse: boolean; forestMode: 'fill'|'patches'|'grove'; clearHouseM: M; clearWayM: M; emptyRoadPrune: boolean };   // V07 §3.15
  plate: { populationRound: number; qualifier: boolean };                                              // V07 §5.3
  firstView: { frameShare: number; minM: M };                                                          // V07 §5.2
  ruinMarker: { maxM: M };  mine: { workingDepthM: Record<'open_cast'|'shaft', M> };                  // V07 §3.16
  terrace: { enabled: boolean; slopeMin: PLaw /* share, rise ÷ run; this and the next three are reference cells to V11 §3.24.1's TOWN row */;
    stepMinCm: PLaw; stepMaxCm: Cm; minDepthM: M /* V11's minTerraceDepthM */; stairFromCm: Cm; apronM: M;
    fitSamples: number; edgeSampleM: M };                                                                // V07 §3.8a (item 110 (a))
  raised: { supportClearM: M; endSnapM: M; stripClearM: M; turnStepCdeg: Cdeg; turnMaxCdeg: Cdeg };   // V07 §3.5a (item 110 (b))
  deck: { headChance: PLaw; headM: [M, M] /* length along the pier, width */; parapetM: M };           // V07 §3.10a (item 110 (d)); the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind (no village cell)
  tiers: { capPerSettlement: number };                                                                   // V07 §2.4 (item 110 (c))
  refound: { traceWeight: number; traceReachM: M; foundationSlot: number };                            // V07 §3.12a (item 113)
  fail: { dialStep: number; dialTries: number; reachStep: number; palRingShare: number; palRingPoints: number; slotTopUp: number } }   // V07 §3.13
```

| sub-record | defaults (own unless marked) |
|---|---|
| `heart` | lattice 20 m over the frame's middle half (0.5); slope ≤ 0.1 (hard; F-V-HEART relaxes to 0.2); +0.6 within 150 m of a crossing site; +0.5 within 300 m of fresh water; `sun` +0.3 × (`D` − `D̄`); `wind` −0.3 × exposure; +0.2 × fertile share within 500 m; −0.5 within 300 m of the frame; `prominence` +0.2 × the relative height within 300 m; random share 0.15 |
| `polyfocal` | extra-nucleus chance 0.35 (`k = 2 + (u < 0.35)`); spacing `max(250 m, 0.8 · R_s)` |
| `settle` | settled share 0.5; street and row stretch 1.8 (major) and 0.55 (minor); the density box `max(1.6 · R_major, 150 m)` |
| `mill` | fall ≥ 1 m within 300 m; 150–1 000 m from the heart; +0.5 downstream, +0.3 within 100 m of a crossing, +0.2 on the heart's side, random 0.1; leat ≤ 300 m (600 m on F-V-MILL's rung); take-off head 1 m |
| `grade` | through 10 %, road 14 %, track 20 %; turn at most 60° |
| `branch` | sides left / both / right ⅓ each (VG); continuation 0.9 after one side, 0.1 after two (VG); shore steer 20 steps; retreat 3 steps; crossing search 3 × `bridgeSnapM` |
| `formRules` | street side spacing × 3, back lane 0.5; nucleated crossroads 0.6, branch × 0.7 within 0.6 · `R_s`, crossroads weight × 2; row straightness 5, back lanes 0.8, jitter 0.05; dispersed branch × 1.5, track limit × 2, isolated weight × 2, dial above 1.4 → weight 0; `organicDialFrom` 0.75; `districtDensity` 1.5 |
| `openShape` | long axis along the through road 0.7; spiral radius × 1.1 per step (VG); stretch `2^min(1, slope ÷ 0.25)`; a vertex per 3.5 m (VG); a through road within 2 r moves the space; `VG` tower 0.1 round, 0.5 square (VG); F-V-OPEN shrink × 0.8, 3 tries |
| `market` | `law` (900, 0) → (1 300, 0.2); `fairHa` 1.5 ha and `fairAspect` 2 (a village fair field by the road in, common grazing between fairs) |
| `claimArea` | `cloister`: plot area 3 000 / 4 500 / 6 000 / 8 000 m² at poor / modest / prosperous / rich (a friary or a small priory, not an abbey's precinct), its footprint p50 a reference cell to V11 §3.6.1's `church` row; `marketHall`: coverage 0.8, `aspect` 1.5, `depthShareR` 0.5 |
| `perimeter` | the close 20 m |
| `ends` | an anchor with fewer than 6 plots merges; cap `1 + ⌊households ÷ 25⌋`, at most 6 |
| `stalls` | one per 40 households, at least 3 |
| `pins` | a well per 8 households within 120 m; a crossroads cross 0.4; troughs 0.3; a shrine 0.3; a maypole 0.2; stocks (200, 0) → (700, 0.5); the L0 village pond 0.4 within 150 m of the heart |
| `manor` | moated site 0.25 with water within 150 m, moat 5–8 m wide; fishponds 0.5 within 300 m; a warren 0.2; a gallows hill (400, 0) → (700, 0.1), seigneurial only |
| `presence` | V07 §2.4's `site` and `noSite` tests look within 1 000 m of the frame's centre, and V07 §3.10's pin-record rule looks for a standing pin of a record's kind within the same reach |
| `longhouse` | the long axis follows the fall line where the natural slope exceeds 3 % |
| `slot` | a run starts `half-width + 4 m + minWidthM · B3` from the junction (VG); rim multiplier 2 (VG); an unbuilt slot joins its neighbour 0.5; a back close up to 2 ha; interior beyond 2 × the toft-plus-croft depth |
| `race` | `densityPower` 1 at every rung (range [0.5, 3]): the slot race weights each slot by its density raised to this power (V07 §3.8); its `presets.VG` entry is this volume's one measured-rate `VG` entry, provisional 1 until V-M4, with the register entry `cal.village.*.rules.race.densityPower@VG` (V07 §3.15; J-V7.119) |
| `fields` | factors: climate `cold`, `maritime` × 2 `infield_outfield`; relief `hilly` × 1.5 and `mountainous` × 3 `infield_outfield`, `mountainous` × 0.3 `open_field`; culture `celtic`, `norse` × 2 `infield_outfield`; `germanic`, `slavic` × 1.5 `forest_strip` on `forest` terrain; `latin` × 1.5 `enclosed`; before the era row's open-field date `open_field` × 0. Great fields ± 25 %; 3 (2 in a two-field system); furlongs 2–8 ha; headlands 5 m; strips 10 m (5–20 m by era); furrow downslope above 2 %; infield within 400 m; a common per 200 ha; a strip at most 1.5 km; claim bands 100 m; `woodShade` 0.3; arable slope reference 0.15 and distance 3 km; wood from slope 0.2 |
| `ladders` | replacement cut 0.8; church spacing `min(400 m, 0.8 · R_s)`; ranges: V07 §2.4's third table, `calibratable: false` (a derivation rule of the port, item 20 (h); J-V7.114) |
| `handoff` | band 0.05 |
| `vg` | household draw [3, 7] (VG); frame 210 / 350 / 560 m (VG); margin 34 m (VG); field area 490 m² per dwelling (VG); one-house field rule and orchard trigger on (VG); forest `fill` (VG); clearance 7 m around houses, 5 m beside ways (own reading of VG's clearing); empty-road prune on (VG) |
| `plate` | population rounded to 1 (10 under `VG`); qualifier on in `painterly` |
| `firstView` | the perimeter's box × 1.6, at least 400 m |
| `ruinMarker` | the ruin marker within 800 m of the heart |
| `mine` | working depth: open cast 10 m, shaft 30 m |
| `terrace` | on (`enabled`; off under `VG`, V07 §3.15) — this volume's switch for the village rungs; V11 §3.24.1's `enabled` column (the TOWN–METROPOLIS switch, with its own `presets.VG` entry) is not read at a village rung; `slopeMin`, `stepMinCm`, `stepMaxCm` and `minDepthM` are reference cells to V11 §3.24.1's TOWN row (`slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM`), read at every anchor, so a village and a town level alike until a village cell is edited (J-V7.41, J-V7.96); `stairFromCm` 60 cm; `apronM` 4 m; the plane fit on at most 12 samples (`fitSamples`: 8 outline vertices and 4 interior points), the step sampled every 2.5 m along an edge (`edgeSampleM`, the base's refined raster) |
| `raised` | support clearance 1 m; end snap 20 m; strip clearance 2 m; a tracker turns around a support in 15° steps up to 60° |
| `deck` | `headChance` (200, 0) → (700, 0.3) → (1 500, 0.5) (0 under `VG`); the head 8 m along the pier × 6 m wide; `parapetM` 0.5 m each side, so a bridge's deck is its carried way's width + 1 m; the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind, read, never copied |
| `tiers` | at most 1 stepped building per settlement at village rungs |
| `refound` | `traceWeight` 0.3 (a refounded village's trackers lean onto a ruined way's trace within reach); `traceReachM` 15 m; `foundationSlot` 1.5 (a slot over a ruined building's footprint weighs × 1.5 in the race); all 0-neutral: with no ruined fabric under the village, or with replay off, nothing reads them (V07 §3.12a) |
| `fail` | the dial × 1.25, twice; the reach × 1.25; the palisade ring `0.8 · R_s` through the 12 densest lattice points; up to 3 top-up trackers |

**The reference trace** (§17.1 (6), item 62): every constant marked VG carries trace key D5 of
`research/findings/code-impact.md` §(d) (P17 for the field sectors), restated in metres in our words, never copied as a
table. The reference-derived sets under D5 are: the character draws (V07 §3.2 (5)); the terrain primitive by water type
and the meander spline (V07 §3.2 (2)); the density band and closed formula (V07 §3.3); the palisade lattice, hull and
resample (V07 §3.4); the tracker steering, step, look-ahead, weights, pulls, push, branch odds and pruning (V07 §3.5); the
square sized in house widths, its rim, round odds, spiral and tower (V07 §3.6); the frontage start, the house rectangle
and the household draw, the density-accepted frontage and the rim multiplier (V07 §3.8, V07 §3.15); the wharf and piers (V07
§3.10); the field area per house, the one-house and orchard rules and the forest fill (V07 §3.9, V07 §3.15); the approach
farmstead and the trail repair (V07 §3.9 (5)); the spotlight and the water look (V07 §5.1); the retry behaviour (V07 §3.13,
not emulated); the road and water shares and the palisade chances (V07 §2.2).

### 2.3 Records

```ts
// @plat/village — two new entity kinds in the registry (§2.8; item 267)
interface VillagePlan {                     // one per document, ever: created at the first village creation or the first hand-off
                                            // down, superseded at a hand-off up, revived at the next hand-off down (V07 §3.12; J-V7.67)
  id: Id; district: Id /* the one District of kind 'village' (item 214) */;
  form: PlanForm; formSource: 'auto'|'request'|'dossier'|'edit';          // S0's feature draw, the request, the culture-weighted dossier draw, or setAttr
  roads: RoadTopology; roadsSource: 'auto'|'request'|'dossier'|'edit';    // S0's feature draw, or the dossier's access word (V07 §3.11)
  heart: PointCm; heartSource: 'derived'|'edit';                          // VS1's scored point; a moved heart is a recorded input
  nuclei: PointCm[] /* the heart first; 2–3 for 'polyfocal', else [heart] */;
  character: { minWidthM: M; maxWidthM: M; depthRatio: number; branchSpacingM: M; turn: number } /* drawn once at VS1 (V07 §3.2); recorded inputs */;
  radiusM: M /* R_s: the settlement radius from the roster's demand (V07 §3.2); recorded input */;
  opens: Id[] /* the Reservations of kind 'green' or 'square' (item 215), at most one per nucleus */;
  palisade?: Id /* the Enceinte of kind palisade, earthwork or inner */;
  entries: { way: Id; bearingCdeg: Cdeg; kind: 'through'|'neighbour'|'dead_end'|'wharf' }[] /* where roads leave the territory */;
  approaches: Id[] /* the track ways that end at an outlying farmstead site (V07 §3.5); read by S12a (V07 §3.9) */;
  ends: Id[] /* VillageEnd ids, in anchor order */;
  lifecycle: Lifecycle }
interface VillageEnd {                      // a named part of the one district (V07 §3.10); its plots are derived, never stored
  id: Id; plan: Id; anchor: Id /* the green, church, manor, mill, crossing, entry, wharf, nucleus or claimed place it gathers around */;
  kind: 'green'|'church'|'manor'|'mill'|'crossing'|'entry'|'wharf'|'nucleus'|'claim';
  name?: NameRef /* §10.4; a dossier quarter's name when a claim matched it (V07 §3.11) */; claim?: Id /* the naming-claim Assignment (§7.7 item 16) */;
  declared?: { event: Id /* the declareEnd event's address: the end's key when its anchor is a point */; boundary?: PolygonCm /* the lasso: plots
    whose centroid lies inside join this end whatever their nearest anchor (V07 §4.2) */ } /* a declared end is exempt from the merge and the cap (V07 §3.10) */;
  lifecycle: Lifecycle /* superseded with its plan at a hand-off up, revived with it (V07 §3.12) */ }
```

**The sources' readers.** `formSource`, `roadsSource` and `heartSource` are read by S0's resolution (V07 §3.1: a source
other than `auto` is kept, never redrawn, so a `request`, `dossier` or `edit` value survives Regenerate (keep), New random
on the village scope and every village epoch's re-derivation of the plan — `village.plan`'s participant re-runs VS1 over the
recorded values, V07 §3.12), by the port's DR rows (a `dossier` source re-bound on each absorb, V07 §3.11) and by the
village `WhyProvider` (V07 §4.5: "the plan is a street village because the dossier's culture weighted it so" /
"because you set it").

**Base records read with village values** (no new field beyond file f's): `District.kind = 'village'` (item 214);
`Reservation.kind = 'green'` (item 215) with `owner: 'commons'` and its `Greenery` of kind `green` (§2.7); `Enceinte.kind`
∈ `palisade`, `earthwork`, `inner` with `closure: 'ring'|'shore'|'barrier'` (§2.7; `barrier` is item 106 (a)); ways of
classes `through`, `secondary` (the village street), `lane`, `track`, `path`, `ford`, `bridge`, `quay`, `pier` (§2.4);
`Plot` with the village toft rows and the **close** — an unbuilt frontage plot whose `use` is the data row `close` (a
paddock, orchard or garden held with a neighbouring dwelling: `owner` that household, `sitePlan.arrangement: 'none'`, yard
parts `paddock`, `orchard` or `garden`); the yard-part kinds `croft`, `paddock`, `drive`, `stair` and `ramp` (V07 §3.8a) and
the **landmark yard parts** `net_rack`, `drying_rack` and `timber_stack` (V07 §3.11) added as data rows (§2.5: `YardPart.kind`
is data-defined; each with its V07 §5.1 role and V07 §5.4 export row). A **named beach** is no record: the `beach` run of the
shore chain's `bankKinds` profile (§2.3, drawn at S1 (7)) nearest the wharf end's anchor, else the landing's own shore run,
carries the dossier's landmark string as its S13a label and export name, re-read from the dossier binding at every
derivation (J-V7.99). `Pin` kinds `well`, `pump`, `large_tree`, `cross`, `market_cross`, `shrine`, `trough`, `notice` and
two added, `stocks` and `maypole` (item 255); `LandUse` kinds as §2.7 lists them; `FieldBands` for `density` (§2.5), whose
village raster is V07 §2.2's `densityCm` grid over the settlement box (V07 §3.3); VS1's `daylight.terrain` raster (V07
§3.2 (4)) at the village's `daylightCm`. **The sign of `D`:** `D(x)` is the **sunlit** share of the representative day at
x; item 102 (a)'s shade is `shade(x) = 1 − D(x)`, so its kernel `−w_sun · shade(x)` and this volume's `+w · (D − D̄)` terms
push the same way (J-V7.60); every village reading of `D` is multiplied by the climate row's sunlight cell (item 111 (c);
1 in temperate and cold rows). The farm mode at village rungs follows the plan form (§4.9; item 314), and the share of the
farm households at outlying farmsteads is `farm.outlyingShare` (V07 §2.2) — no base table gains a column for it.

Item 110's records at village rungs: `RetainingWall` (§2.7, its state a stretch-state profile, §2.2 rule 5) for the walls of
V07 §3.8a, generated or drawn, never an `Enceinte`; a raised way's parts from 1 (item 110 (b)), read by the village's
stages only through the `raised` key (V07 §2.7); the deck plots of item 110 (d) (base `Plot`s on a deck's buildable face,
their buildings reading V02's `DeckContext`) on pier heads and widened bridges (V07 §3.10a). The term **house platform**
names one piece of ground through its life: the levelled toft ground of V07 §3.8a while its dwelling stands, and the same
ground with its footprint trace and scarps once the dwelling is `cleared` (V07 §3.12; J-V7.76).


### 2.4 The village classes and their siting (the village part of items 103 and 104)

The classes below are rows of §10.2's `RosterTables.classes` (`BuildingClassRow` as V11 §2.3 extends it, with the
`presence` column of item 576), our own content, provenance `own` unless marked, each keyed in the **`v.` namespace**
(`v.hovel`, `v.smithy`, `v.parish_church`, …; V11 §2.3, V11 §2.9; J-V7.95): a village row and V11's town row of the same word
(`smithy`, `farmstead`, `chapel`, …) are two keys that share no profile, template or presence law. A town class that has a
village form reaches a village rung only through it (V07 §2.7); every other class plays itself once a dossier names it
(V07 §3.11 step 3). In this volume's prose a class named in words (the smithy, the church) is its `v.` row; a town row is
always named as V11's. V11's compiler builds these rows by the rules it applies to every class (V11 §3.2, V11 §3.5.14) — the
same notation, defaults, derivations and compile checks (T-V7-56) — and the base's families (item 103 (a)) turn their
profile columns into the solver's pulls. They are written in V11 §3.5.2's notation as two tables, the **class columns** and
the **profile and authored rows** (J-V7.101).

**The class columns.** *family* is the ONE profile family of V11 §3.4 the row inherits. *template* is its
`templateFamily`, a family of V11 §3.6.1 whose budget rows (footprint, plot area, floors, coverage, yard parts, cellar)
compile its `template` for every band, with the overrides stated; V02's `composition.classFamily` (keyed `v.`, V02
§3.10.5) is the one source of the composition key and is read first, the template family after it (J-V7.82);
an arrangement that differs from the template family's is the class's override (V11 §3.6.1); a dwelling's plot at a
village rung is its toft slot (S10's `toft` strategy on V07 §2.2's `toft` rows), so a dwelling template's plot-area cell
is read as its band's toft-and-croft area; and a town class that plays itself at a village rung with a template family
whose plot is "the claim's" (`cloister`, `market-hall`; no S3 claim exists at a village rung) reads its plot from
`rules.claimArea` (V07 §2.2a, V07 §3.6 (4a), V07 §3.8; J-V7.112), as `v.parish_church` reads its own override below. *dist · σ*
is the base's `distribution` (`disp`, `sing`) and `significance`. *presence and roster* is the `presence` column (read as
the paragraph after the tables states) — each entry `member · condition : law`, the law a `PLaw` of `(P, chance)` anchors,
so no class appears or vanishes at a rung boundary (J-V7.47) — then `perCapita` (`1/600` is `[1, 600]`; absent `[0, 1]`),
`perOther` (`×1 v.parish_church`), `class mix` for the dwellings (S10b's generation fill, V07 §3.8) and the DR11 seats
(V07 §3.11). *label · synonyms* are the row's display words (V11 §2.3's display cells, item 516; own, `calibratable:
false`): the label in plain words for one member, the synonyms the other words a reader types for it, matched whole and
case-folded by V09's roster reader (V09 §3.3), a word shared by two rows (`mill`, `cot`) settled by `commonness`; `icon` is
absent (the palette shows the row's family glyph). `commonness` (the reader's tie-break) is not a column: each `v.` row's
value is its **roster share at VILLAGE** — the row's expected member count at the VILLAGE default target (700 people: its
presence laws' chances and per-capita rows there, and for the five dwelling rows their class-mix shares of the rung's 148
dwellings, V07 §2.1) ÷ the sum of those counts over the 25 rows, rounded to 0.01 and never below 0.01 (J-V7.133) —
computed by V11's compiler at step 5a like every compiled display cell (V11 §3.2.1) and checked by T-V7-56. Pin
kinds take no row: their words are V08 §4.6's `host.pinKind.<kind>` rows. *powers · sectors* take weight 1 each (V11
§3.15's keys; "—" none). *deckOk* is the compiled column (V11 §3.24.4) stated for every row — the village reading of V07
§3.10a (4). *bal* is the balance (V11 §2.3's enum); the orientation is always derived from the goods table (V11 §3.7.3).
Every row has `min` 0, `firstAtPopulation` 0, `max` unbounded unless `sing`, `outside` as its family's settings row (V11
§3.5.1) unless marked, `crypt` `never` unless the crypt paragraph below gives one, and its family's settings row for every
column not stated.

| class | label · synonyms | family | use; arrangement (§4.7 S11); structures | template | dist · σ | presence and roster | powers · sectors | deckOk | bal |
|---|---|---|---|---|---|---|---|---|---|
| `v.hovel` | hovel · hut, cot | `housing` | one-room dwelling; `hovel`; one room, lean-to | `hovel` | disp · 0.05 | class mix (squalid, poor) | — · — | [] | residential |
| `v.cottage` | cottage · house, cot | `housing` | small detached house; `detached`; house, pen or garden | `dwelling-detached` | disp · 0.1 | class mix (poor to comfortable) | — · — | [] | residential |
| `v.longhouse` | longhouse · long house, byre-house | `housing` | dwelling for people and beasts; `detached`; one long building, byre end downslope | `dwelling-detached` | disp · 0.1 | class mix (poor, modest), its weights × `cultureForms`' longhouse factor (`norse`, `celtic`, `germanic` × 1.5; V07 §3.8) | — · agriculture | [] | residential |
| `v.farmstead` | farmstead · farm, farmhouse | `housing` | husbandman's farm in the village; `compound`; house, barn, byre around a yard | `farm` | disp · 0.5 | class mix (modest to prosperous) | — · agriculture | [] | residential |
| `v.yeoman_house` | yeoman's house · yeoman's farm, yeoman | `housing` | yeoman's house; `compound`; house, barn, dovecote | `dwelling-compound` | disp · 0.2 | class mix (prosperous, rich) | — · agriculture | [] | residential |
| `v.manor_house` | manor house · manor, hall, lord's hall | `housing` | the lord's hall; `compound` (hall, chamber block, kitchen, barn, stables, dovecote; the moat by `rules.manor`, V07 §3.8) | `dwelling-compound` | sing · 2 | under the grandeur ceiling (V07 §3.8; item 115): at VILLAGE `gov seigneurial` : 1, else none; at THORP and HAMLET none; forced by DR11 when a dossier government's `villageSeat` names it (seigneurial, crown), or by a dossier manor record — "specified", at every rung | lordship · agriculture | [] | residential |
| `v.parish_church` | parish church · church, kirk | `worship` | church; `institution` (nave, chancel, west tower); its `churchyard` part ≥ 30 % of the yard (§4.9), a burial face | `church` — plot area 1 500 / 2 000 / 3 000 / 4 000 m² (the family's "the claim's" has no claim at a village rung; own); cellar 0.1 at every band (the crypt chance) | disp · 8 | (40, 0) → (200, 0.3) → (400, 1); a COUNT record adds members (the third table below) | religion · religion | [] | institution |
| `v.chapel` | chapel of ease · chapel | `worship` | chapel of ease; `institution` (a single cell; the `chapel` family has no churchyard part, V11 §3.6.1) | `chapel` | disp · 3 | `without v.parish_church` : (40, 0) → (200, 0.4) | religion · religion | [bridge] | everyday |
| `v.parsonage` | parsonage · vicarage, rectory, priest's house | `housing` | the priest's house; `compound` | `dwelling-compound` | disp · 0.5 | `×1 v.parish_church`; forced by DR11 for an ecclesiastical government (its `villageSeat`) | religion · religion | [] | residential |
| `v.tithe_barn` | tithe barn · great barn | `farming` | great barn; `institution` (one barn) | `yard` (its shed the barn) | sing · 2 | `with v.parish_church` : (200, 0) → (700, 0.5); `outside` no | religion · agriculture | [] | wholesale |
| `v.watermill` | watermill · mill, water mill | `food` | mill; `compound` (mill house, wheel, the leat as a water carve of kind `canal`, `rules.mill`) | `mill` | disp · 2 | `site millSeat` : (70, 0) → (300, 1); `1/500` | lordship · agriculture | [] | heavy |
| `v.windmill` | windmill · mill, post mill | `food` | post mill on a mound; `detached` | `mill` | sing · 1.5 | `noSite millSeat` : (40, 0) → (200, 0.3) → (700, 0.7) | lordship · agriculture | [] | heavy |
| `v.smithy` | smithy · forge, blacksmith, smith | `metalwork` | smith; `detached` (forge, open front, shoeing yard) | `workshop-yard` | disp · 1 | (40, 0.1) → (200, 0.5) → (700, 1); `1/600` | guild · crafts | [] | everyday |
| `v.alehouse` | alehouse · ale house, tavern, pub | `lodging` | ale-seller's house; `detached` | `tavern-row` | disp · 0.5 | member 1 : (40, 0.1) → (200, 0.6) → (400, 1); member 2 : (600, 0) → (900, 0.5) | — · trade | [] | everyday |
| `v.inn` | inn · hostelry, coaching inn | `lodging` | inn with stables; `compound` | `inn-compound` | disp · 1.5 | `road through, crossroads` : (40, 0) → (200, 0.4) → (700, 0.8) | — · trade | [] | specialist |
| `v.bakehouse` | bakehouse · common oven, bakery, oven | `food` | common oven; `detached` | `shopfront` | disp · 0.6 | (40, 0) → (200, 0.3) → (700, 0.6) | — · crafts | [] | everyday |
| `v.pound` | pound · pinfold, animal pound | `farming` | pinfold; `institution` (a walled pen, no building) | `yard` — structures none, yard part `pen` 0.9, bounds wall | sing · 0.5 | (40, 0) → (200, 0.4) → (700, 0.7); `outside` no | council · agriculture | [] | institution |
| `v.reeve_house` | reeve's house · headman's house, moot house | `civic-authority` | the reeve's or headman's house (the council's seat); `compound` | `dwelling-compound` | sing · 2 | `gov chartered_commune` : (40, 0.3) → (120, 1); forced by DR11 when the government's `villageSeat` names it (commune, oligarchy) | council · taxes | [] | institution |
| `v.shop` | shop · general dealer, chandler | `trade` | a general dealer; `detached` with a `stall` front | `shopfront` | disp · 0.5 | (200, 0) → (700, 0.3) | company · trade | [] | everyday |
| `v.landing` | fishing landing · landing, boat landing | `port` | fishing landing; `compound` (boat shed, net racks — its structures, never classes) | `landing-yard` | disp · 1 | `site water`, `resource fish ≥ 0.3` : 0.7 | — · fishing | [pier, quay] | wholesale |
| `v.wood_yard` | wood yard · woodcutters' ground, timber yard | `timber-yard` | woodcutters' ground; `compound` (saw pit, timber stacks) | `yard` | disp · 0.5 | `resource timber ≥ 0.4` : 0.6 | — · crafts | [] | heavy |
| `v.charcoal_pit` | charcoal pit · charcoal hearth, charcoal burner | `extraction` | burner's hearth; `institution` in the hinterland | `extractive` | disp · 0.3 | `resource timber ≥ 0.4` : 0.3; `outside` yes | — · extraction | [] | heavy |
| `v.potter` | potter's kiln · pottery, potter | `craft` | potter's kiln; `compound` | `kiln-yard` | disp · 1 | `resource clay ≥ 0.4` : 0.3 | guild · crafts | [] | heavy |
| `v.tannery` | tannery · tan yard, tanner | `leatherwork` | tanner; `compound` | `works-noxious` | disp · 1 | `site flowing` : (200, 0) → (700, 0.1); a dossier record forces it (DR9) | guild · crafts | [] | heavy |
| `v.watchtower` | watchtower · lookout, tower | `fortification` | a timber or stone tower; `detached`, tall | `tower` | disp · 1 | `threat` : 1 (a sea threat, V07 §3.11 DR2); `defence ≥ 0.6` : 0.3 (V08's `threat` row); a dossier record forces it | military · military | [] | institution |

**The profile and authored rows.** *Profile deltas* are on the family's compiled profile in V11 §3.5.2's notation. The
village words translate once (J-V7.102): holiness is the family's `alignment sacred +`, never an emission; a service's
local custom is `clientele dailyLocal`, a dwelling's or a seat's is its family's (`residential`, `institution`);
"town-wide" is `townWide`; a second clientele is an authored row; "common" is `alignment 0 · 0 · 0`, "elite" `status +`,
"law" `law +`; a class marked clustered is `disp` with `K cluster`, one with a same-kind spacing `K spread` at it (item 107
(d)). *Authored rows* are the class's own `RelationRule`s (`cls/<class>/<n>`), the village's signature pairs, every one
soft, `extension`, provenance `own` unless marked; each `to` is a class, a `#tag` or a feature class of V11 §3.3.3, and V11
§3.5.2's default reading rules apply. At village rungs `nearCentre`, `nearGate`, `nearMarket` and `nearHarbour` (and a
`harbour` need) read `dist.centre`, `.gate`, `.market` and `.harbour` as §2.5 measures them at territory rungs (item 576
(b)); a class row's "at a port" reads "a wharf is laid" — a row with no such form, finding no harbour, takes the base's
closest option, reported, as at a base rung without one (J-V7.111).

| class | profile deltas | authored rows |
|---|---|---|
| `v.hovel` | `S= smell 1, fire 1` | — (a dwelling: the slot race and the class mix place it, V07 §3.8, and V07 §3.12 (7v)'s encroachment strips at the green's or common's edge; J-V7.31) |
| `v.cottage` | — | — (as `v.hovel`: on a toft with its croft) |
| `v.longhouse` | `E= smell 2; S —; N+ runningWater (soft 0.3)` | — (as `v.hovel`). Its site-plan rule (hard): S11 lays its main slot's long axis along the fall line where the platform's natural slope exceeds `longhouse.fallLineSlopeMin` (V07 §2.2a), the byre end downslope; its platform is never levelled, so the rule reads the natural ground (V07 §3.8a (4)) |
| `v.farmstead` | `E= smell 2, traffic 1; S —; N+ space` | — (as `v.hovel`) |
| `v.yeoman_house` | `S= smell 2` | — (as `v.hovel`; among equal slots the larger class takes the sunnier by V11 §3.3.5's `sun` prestige key, item 102 (d)) |
| `v.manor_house` | `E+ crowds 1; S+ smell 3, noise 2; N+ space, highGround, dryGround; clientele elite; alignment status +; V settlement : 1` | `near` → `v.parish_church` 150 soft 1.0; `far` → `open:green`, `open:square` 120 soft 0.3 (at the settlement's edge with its demesne close); `near` → `v.watermill` 400 soft 0.3 (the lord's mill); its moat and fishponds are `rules.manor`'s draws (V07 §3.8, V07 §3.9 (6)) |
| `v.parish_church` | `clientele townWide; K neutral; V settlement : 1` | `nearCentre` 200 soft 1.0 (within 200 m of the heart); `near` → `open:green` 60 or `highGround` soft 1.0 (at the green, or on the high ground); `near` → `v.manor_house` 150 soft 1.0; the Religious Quarter's east row where a dossier carries it (V07 §3.11 DR5) |
| `v.chapel` | `N− space; K neutral; V walk : 800 m` | `near` → `open:green`, `open:square` 60 soft 0.5 (at a nucleus's open space); `far` → `#church-family` 800 soft 0.5 (beyond 800 m of any church) |
| `v.parsonage` | `alignment sacred +` | `near` → `v.parish_church` within 250 **hard**; `near` → `v.parish_church` 100 soft 0.8 |
| `v.tithe_barn` | `E= traffic 2; N− fields; alignment sacred +; K neutral` | `near` → `v.parish_church`, `v.parsonage` 150 soft 0.6 |
| `v.watermill` | `E= noise 2, traffic 2; S —; N+ runningWater (hard); clientele townWide; alignment status +; K spread 600; V —` | — (its seat is VS1's mill seat, reserved before the network by `rules.mill`, V07 §3.2 (7); the reservation is its plot) |
| `v.windmill` | `E= noise 1, traffic 1; S —; N+ highGround (hard); clientele townWide; alignment status +; K neutral; V settlement : 1` | `nearGate` 300 soft 0.5 (on the rise beside a road out) |
| `v.smithy` | `clientele travellers; K spread 200` | `frontage` values `through`, `secondary` soft 0.8; `near` → `open:green`, `open:square` 150 or `nearGate` 150 soft 0.8 (near the green or an entry); `near` → `v.inn`, `v.alehouse` 100 soft 0.5 |
| `v.alehouse` | `E= crowds 1, noise 1, disorder 1; S —; N road; clientele dailyLocal; alignment sacred 0; K spread 150; V households : 1 per 55` (250 people at the 4.5-person mean) | `near` → `open:green` 60 soft 0.8 (on the green: SettlementForge's "Alehouse & Common", V07 §3.11) |
| `v.inn` | `E= crowds 2, traffic 2; S —; N through (hard); alignment sacred 0; K spread 400` | `nearGate` 150 soft 1.0 (at a through-road entry); `near` → `v.smithy` 100 soft 0.5 |
| `v.bakehouse` | `E= smoke 1, fire 1; S —; K spread 200; V walk : 500 m` | `near` → `open:green`, `open:square` 60 soft 0.6; `near` → `v.watermill`, `v.windmill` 300 soft 0.3 (item 103 (b)'s bakery-by-mill) |
| `v.pound` | `E= smell 1, noise 1; N road; clientele dailyLocal; K neutral; V settlement : 1` | `near` → `landuse:commons` 200 soft 0.8 (toward the common); `far` → `open:green`, `open:square` 150 soft 0.3 (at the settlement's edge) |
| `v.reeve_house` | `E —; S —; N road; alignment law 0; alignment status 0` | `near` → `open:green`, `open:square` 80 soft 0.5 (by the moot place, a `large_tree` or `cross` pin on the green that VS8 places with it) |
| `v.shop` | `E= crowds 1; S —; N road; clientele dailyLocal; K spread 150` | `frontage` values `through` soft 0.5; `near` → `open:green`, `open:square` 150 soft 0.5 |
| `v.landing` | `E= smell 2, noise 1; N riverBank (hard); clientele dailyLocal` | `near` → `quay` 100 soft 0.5 (by the wharf where one is laid); its net store on the chief pier's head when one is laid (V07 §3.10a) |
| `v.wood_yard` | `E= noise 2; N woodEdge (hard), road` | — (its hard need: at the forest edge, SettlementForge's "Woodcutters' Ground") |
| `v.charcoal_pit` | `E= smoke 3, fire 2; N woodEdge (hard)` | `near` → `landuse:coppice`, `landuse:wildwood` within 0 soft 1.0 (inside the wood); `far` → `#housing` beyond 200 soft 0.8 |
| `v.potter` | `E= smoke 2, fire 2; S —; N+ deposit clay (hard); K spread 300` | — (its hard need: at the clay pits' side) |
| `v.tannery` | `N runningWater (hard); alignment status 0; K spread 400` | `downstream` soft 1.0 (the lower end of the drainage by the context vector's `upstream` value); `downwind` soft 0.6; `extramural` soft 0.5 (outside the palisade where one stands) — item 103 (b)'s tannery row at village scale |
| `v.watchtower` | — | `near` → `wall` 20 soft 0.5 (on the palisade); `nearGate` 40 soft 0.5 (at a gate); `nearCentre` 300 soft 0.3 (else near the heart, on the family's `highGround`); with a sea threat the port's `PlacementCriteria` row `near` → `quay`, `v.landing` 60 soft 1.0 (id `pc/…`; V07 §3.11 DR2) |

**The presence column** (item 576 (a); read by S2 at the rungs whose `RungProfile.frameLaw` is `territory`, the village
rows). The classes are drawn in the roster's class order with every class a `with`, `without` or `×` cell names drawn
before it (the compiler orders them and refuses a cycle, T-V7-56). Member 1 is drawn once on `roster/<class>/1` (§6.1)
against the law of the first entry for member 1 (an entry with no member is member 1's) whose condition holds — none
holding, no member 1; member m ≥ 2 is drawn only when member m − 1 is present, on `roster/<class>/<m>`, against its own
entry's law; the members after the drawn ones are S2's per-capita count (`perCapita`, `perOther`; §10.2) less the members
drawn, never below 0. The roster's coverage option (V11 §3.5.1) adds no member at a village rung — a `V` cell is a siting
pull there, since the option's rounded count would step inside a band (J-V7.47, J-V7.101). A class without `presence`
counts as V11 states (the class mix for the dwellings). The conditions (`PresenceWhen`), read at S2 from S0's draws, S1's
site and the dossier:
* `gov k, …` — the government kind (V11 §3.21.1; DR11's reading of the dossier, else the request's) is one of them;
* `with c`, `without c` — the roster already holds, or lacks, a member of class `c`;
* `site t`, `noSite t` — S1's site offers, or lacks, the test `t` within `presence.siteReachM` of the frame's centre:
  `flowing` a brook, stream, river, confluence or estuary course (S0's water type); `millSeat` a point of the carved bed
  that falls at least `mill.fallM` within `mill.fallWithinM` downstream (the watermill's hard need; VS1 then sites the
  seat, F-V-MILL where its tests fail, V07 §3.2 (7)); `water` any water type but `none`, or an oasis (item 111 (a));
* `resource r ≥ v` — the site value S2's `requires` gate reads for `r` (§4.2 S2's reading of `SiteResources`) is at least `v`;
* `road t, …` — S0's road topology (V07 §3.1 step 3) is one of them;
* `defence ≥ v` — `Intent.defence` (V08's `threat` row) is at least `v`;
* `threat` — a key of `PortValues.threats` holds (V08's `threats` row; V07 §3.11 DR2).

```ts
interface PresenceWhen {   // a presence entry's condition (item 576 (a); §10.2's `presence`): every member stated must hold; the readings are the list above
  gov?: string[] /* GovernmentRow kinds */; with?: string; without?: string /* a class the roster holds, or lacks, drawn before this one */;
  site?: 'flowing'|'millSeat'|'water'; noSite?: 'flowing'|'millSeat'|'water';
  resource?: { key: 'ore'|'stone'|'timber'|'fish'|'clay'|'fertile'; min: number }; road?: string[] /* the drawn road topology (V07 §3.1 step 3) */;
  defenceMin?: number /* `defence ≥ v`: Intent.defence */; threat?: boolean /* a key of PortValues.threats holds */ }
```

**Forced seats** (V07 §3.11 DR11): the class a dossier government's `villageSeat` names (V11 §3.21.1), or an `@seat`
record's, is present with at least one member at every village rung, whatever its presence entries. An `@absent:` record
zeroes a class's presence entries and members through its village form (V07 §3.11 step 1), and with them every class whose
`with` or `×` cell names it. **A forced seat stands even where an `@absent:` record zeroes the class its `with` or `×`
cell names** — the government is its own dossier fact (J-V7.113): the priest's house of an `ecclesiastical` hamlet with
`Access to parish church` stands with no church of its own, its `near` → `v.parish_church` rows finding no target and
read as neutral (satisfied, scoring 0 — the hard row included, since no member of a zeroed class can stand, so no
F-SITING report), and the solver places it by its other rows.

**Pins and decorations.** The village's pins are VS8's rows (V07 §3.10; values `rules.pins`, V07 §2.2a), a `@pin:<kind>`
record forcing its pin where none stands (V07 §3.10's pin-record rule), at a village epoch through `village.pins` (V07
§3.12). Its decorations — the L0 village pond VS1 carves (V07 §3.2 (8)), the uncarved `pond` parts (the green's
centrepiece pond, the manor's fishponds), the warren, boundary stones, wayside crosses and the gallows hill — are §4.9's
table's village rows, placed by V07 §3.2 (8) and V07 §3.9 (6) (values `rules.pins`, `rules.manor`).

**Stepped massing at village rungs** (item 110 (c); J-V7.94). No village class carries a tiered composition of its own. A
class takes tiers at a village rung only through V11's culture-and-era specialisation rows (the `stepped_temple`,
`terraced_palace` and `tiered_tower` rows naming V02's `stepped` family). The chance is V11 §3.24.3's row's (it has no rung
column, and the European cultures — `celtic`, `norse`, `germanic`, `slavic`, `latin`, `greek` — have no row, so their
chance is 0); the one village cell is this volume's cap `tiers.capPerSettlement` (1) per settlement (J-V7.41) — so the
European village is unchanged, while a village of a culture whose shrines were stepped may raise one. The eligible village
classes are those the rows reach through the village form of the class each row names (V11 §3.24.3): `v.parish_church`,
`v.manor_house` and `v.watchtower` — no row reaches `v.chapel` or `v.reeve_house`; the draw is V11's, on
`roster/<class>/<ordinal>`, at S2.

**Crypts and burial faces at village rungs** (item 109 (k) (2); J111: "cathedral also gets crypts but
cemetaries get catacombs"). The crypt column and its size rows are V11's schema (`crypt: 'always'|'basement'|'never'`,
`cryptM2`, the cellar row's chance as the crypt chance; item 436); the village rows fill it for their own classes
(J-V7.41, J-V7.64): `v.parish_church` → `crypt: 'basement'`, crypt chance 0.1 at every band (the class row's cellar chance,
a V12 calibration cell), `cryptM2` 20 / 25 / 35 / 45 m² at poor / modest / prosperous / rich (village churches seldom had
crypts, burial being in the churchyard; own, a V12 cell); `v.chapel` → `crypt: 'never'` (a single-cell chapel of ease;
own; its own key beside V11's town `chapel` row, J-V7.95 — a chapel built at a village rung keeps no crypt for life, its
draw made once). The crypt is drawn **once per church building, when it is built**, by §2.6's basement draw keyed by the
building's lineage (V02, V03 §3.7.4) — never by a rung key, so neither a rung change nor a hand-off redraws it; where the
terrain gate denies the basement, a drawn crypt is no crypt and the chancel floor takes ledger slabs (V03 §3.7.4); a
dossier fact naming a crypt binds to its church's crypt with chance 1 (V04 §3.5.1 (11), V03 §3.7.4). No `cathedral` or
`great_temple` is placed at a village rung (V11's roster rows; SettlementForge's cathedral kinds are tiers C and M only), so
the "cathedral always" bar is vacuous in a village-made document; a standing cathedral of a shrunk town keeps its crypt
(V07 §3.12). **Burial faces** — the grounds a later catacomb may lie under (item 109 (k) (2)): the parish church's
`churchyard` yard part; a dossier `graveyard` or `burial_ground` record's seat (V07 §3.11 DR9: the churchyard enlarged, or
its own `cemetery` plot), which carries the record's binding key; a monastery's burial yard where a dossier places one. A
chapel of ease carries **no** churchyard part at village rungs and is never a burial face (chapels of ease commonly lacked
burial rights; own, J-V7.65). Below TOWN no catacomb forms (item 109 (k) (1)): a dossier fact forcing one at a village rung
is V04's charnel vault (V04 §3.5.1 (10)) — one `ossuary` chamber of the `dug` system under the burial face, at most
`CatacombRule.charnelMaxM2`, reported `W_CATACOMB_BELOW_TOWN` — never a gallery system and never a church's crypt.
**Church counts.** A standing `v.parish_church` counts as a `church` in the CITY and METROPOLIS catacomb count (V11
§3.23.8's church count) and among item 108's church members; a `v.chapel` does not, as the town `chapel` row does not.

**Item 104 at village rungs.** A custom institution's scene archetype resolves to the village class row that plays it
(item 104 (a) (2)); where no village class plays it, the archetype maps to an existing row **plus a profile delta** (item
104's delta tables), never a new class (J-V7.78). Each archetype's village reading — class, else-class, delta, composition,
pin or ruin — is its `village` cell in V11 §3.13.2 (`ArchetypeVillageCell`), read before `villageForm`; T-V7-21 reads the
cells. What no cell holds is this volume's: a **ruined-landmark** record's ruin is the ruin system's source by item 109 (b)
(`RuinRecord.source.kind 'ruinedLandmark'`, significance palace), its ruin decoration the surface marker and candidate
entrance, sited by V07 §3.16 (6); a **mercantile-market** record is a dossier market record (V07 §3.6 (4)), so the open
space carries the market and its `market_cross` pin, forced by V07 §3.10's pin-record rule, stands at the market's centre
with VS8's stalls. The rest of item 104's order (category, tags, definition fields, keywords, the fallback) is the base's.

**Items 105 and 107 at village rungs — the supply rows.** The consumer-side `SupplyEdge` rows of the village classes
(§10.2's type; every good an id of V11 §3.7.1's goods table — ale is `beer`, hay `fodder`, pots `pottery`, the entry store's
goods `import` — and a service, lodging or shoeing, no good but a note in the reading column; the good's `bulk`,
`perishable`, `value` and `comfortM` are V11's, and each class's orientation is derived from that table by item 105 (b) — V11
writes the orientation rows and T-V7-33 reads them at test time). Each consumes cell compiles to one soft `SupplyEdge` per
good whose `maxDistanceM` and `mode` are the good's (V11 §3.7.1: its `maxDistanceM` and first listed mode), with V11
§3.5.2's default reading for the rest (weight 0.6, `substitutes ['import']`, `perConsumers` 8); the provider classes named
are those whose `produces` lists the good, and each produces cell is the class's `produces` (the dwellings' too:
`v.farmstead` grain and hides, `v.yeoman_house` and `v.manor_house` grain, `v.longhouse` hides). Item 107 (a)'s balance
profile is each row's *bal* and item 107 (d)'s same-kind spacing its `K spread` (a soft `far` row to the class's own members
inside the one district), both in the tables above. "—" means no row. Links bind each consumer to its nearest provider
(item 105 (a), 107 (c)).

| class | consumes (good ← provider classes) | produces (good → consumers) | the village reading |
|---|---|---|---|
| `v.watermill`, `v.windmill` | grain ← `v.farmstead`, `v.yeoman_house`, the outlying farmsteads, `v.manor_house` (the demesne) | flour → `v.bakehouse`, every household | an **anchor**: its seat is fixed by its hard need (VS1's mill seat; the windmill's high ground), so its links pull its consumers and never move it |
| `v.bakehouse` | flour ← the mills (imported when none, V07 §3.2 (3)) | bread → households | settles by the green; the mill pull (0.3) is weak |
| `v.alehouse` | grain ← `v.farmstead` (the brewing barley) | beer → households | on the green or at an end lacking one; the ale-seller brews her own ale |
| `v.inn` | grain ← `v.farmstead`; fodder ← the meadow faces (a resource anchor, S12a) | beer → travellers | at a through-road entry (its hard need); the carriers' store for imports and exports (V07 §3.11); its lodging is a service |
| `v.smithy` | iron ← the entry store (imported: the edge's `import` substitute); charcoal ← `v.charcoal_pit` | tools → `v.farmstead`, `v.yeoman_house`, `v.watermill` | where its input and output routes meet: the through road's entry or the crossroads (item 105 (b)); agrees with its authored rows; shoeing is a service |
| `v.charcoal_pit` | firewood ← the coppice faces (a resource anchor, S12a) | charcoal → `v.smithy`, `v.potter` | inside the wood (its authored row) |
| `v.wood_yard` | logs ← the managed-wood faces (V11 §3.7.1's `lumber` site; a resource anchor, S12a) | timber, firewood → households, `v.bakehouse`, `v.potter` | at the wood edge |
| `v.potter` | clay ← the clay pits (a resource anchor); firewood ← `v.wood_yard` | pottery → households, `v.alehouse` | the clay side; no split (the row carries no `split` profile) |
| `v.tannery` | hides ← `v.farmstead`, `v.longhouse`; bark ← the coppice faces (a resource anchor, S12a) | leather → exported through the entry store | downstream and outside the perimeter where the site allows |
| `v.landing` | — | fish → households | the water trade's store (V07 §3.11) |
| `v.tithe_barn` | grain ← `v.farmstead`, `v.yeoman_house` (the tithe) | — | fixed by its church pair |
| `v.shop` | import ← the entry store | import → households (a re-seller, as V11 §3.7.2's warehouse and merchant house) | on the through road near the green |
| `v.chapel` | — | — | at a nucleus (its coverage row, `V walk : 800 m`) |

Three village rules sit on the base's mechanism. (1) **Dwellings are link ends but carry no placement pull.** A
farmstead, yeoman house or longhouse is a provider (grain, hides) and a consumer (tools, bread) for binding and for the
clerk's explanations, but its toft is chosen by the slot race (V07 §3.8), never by a link — so the exact count and VG's
density look hold (J-V7.31). (2) **One district: no district supply term.** Item 105 (g)'s S7b term has one district and
the hinterland pseudo-district to choose between; it is computed and changes nothing, and the no-op is a test (T-V7-33).
(3) **Near enough everywhere.** A village's span is inside most goods' `comfortM`, so inside the settlement the links
rarely decide; coverage and spacing do (item 107 (b)), and the source-oriented classes are decided by their resource
anchors in the hinterland.

**Item 108 at village rungs — the ladder rows that reach the village's population.** V11 §3.12 types every SettlementForge
ladder pair and subsumption (COUNT, QUARTER, GUILD, SIZE, REPLACEMENT), and every pair reaches a village rung by V11's
reading, its member class played through V07 §3.11's resolution order (a member class with a village form by its `v.`
row: `mills_2_5`'s watermills, `taverns_5_20`'s taverns as alehouses, `inn_multiple`'s inns). The table below lists **only
the readings that differ at village rungs**, for pairs whose greater can arrive in a dossier below 1 500 people (a small
town is drawn on the VILLAGE rung, V07 §3.11). The member count is S2's per-capita count of the member class at the
population, clamped into the record's numeric range, or — unnumbered — into the village rungs' rows of item 108 (b)'s
range table below, keyed per kind and rung as item 108 (b) asks: by (step type, member class) (V11 §3.12's *member class*
column, played at a village rung through its village form), the step's `*` row the default, the qualifier word the row's
label (`rules.ladders.ranges`; own, `calibratable: false` — a derivation rule of the port, item 20 (h), changed only as a
table fix reviewed with V08, as V11 §3.12's rows are; J-V7.114; V11's rows hold the base rungs) — so every unnumbered
stepped record at a village rung reads its step's row, whether its name carries a qualifier or none (`tanners`; the trade
GUILD kinds of tier W), never V11's town range (J-V7.105; V08 §3.5.1 (b) reads it "for its step type and member class").

| ladder step (the dossier's names) | step type | the village reading |
|---|---|---|
| Blacksmith → Blacksmiths (a range) | COUNT | that many `v.smithy` members, keyed `#k`, spaced by the row's `K spread 200`, each at a through road or end by its row |
| Carpenter → Carpenters (a range) | COUNT | members of V11's carpenter class (it plays itself at village rungs) on frontage slots |
| Parish church → Parish churches (a range) | COUNT | member #1 at the heart by the church row; the others at the nuclei or the ends farthest from it, spaced `min(400 m, 0.8 · R_s)` (`rules.ladders`), each with its churchyard (a burial face) |
| Wayside shrine → Parish church | REPLACEMENT | the greater only (V11 §3.12's `parish_church` row): `v.parish_church` by its row; the shrine's pin is not placed at the settlement edge — the shrine record binds the churchyard `cross` pin VS8 lays for it in the `churchyard` part, nearest the church's door (V07 §3.10's pin-record rule; the shrine kept as the churchyard cross); arriving over time (a promotion receipt, or the church added beside or replacing the shrine record), the church is placed new and its cross laid in that batch by V07 §3.12 *Records at a village epoch* item 4 — the shrine record's key binding the cross where two keys meet, after a receipt the one key on the church and the cross with no binding row (V08 §3.5.1 (d)) — the old roadside shrine standing, unbound |
| Water source → Multiple water sources | COUNT | `@pin:well` members (V11 §3.12's `multiple_water_sources` row): a floor, never a clamp — VS8's coverage wells (V07 §3.10, `rules.pins`) or the range's low end, whichever is more; the record binds its members to the coverage wells in address order |
| Apothecary → Apothecary (established) | SIZE | one larger building by the class's template (plays itself once a dossier names it) |
| … → Apothecary district, a trade's quarter or "district" | QUARTER | an **end** claimed by the record (V07 §3.10), owning its members inside it; the class's ordinary spread places the rest |
| Craft guilds (5–15), Merchant guilds (3–8) | COUNT | that many `guildhall` members (V11 §3.12's `craft_guilds_5_15` and `merchant_guilds_3_8` rows) — V11's town `guildhall` class playing itself at a village rung (it has no village form, V11 §3.22) — their count S2's per-capita count clamped into the record's range; the first at the green, the rest on frontage slots spaced by the class's same-kind row; a GUILD record's hall is bound into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further hall; a GUILD record of another family keeps its own hall (item 108 (c)) |
| A trade's guild (Cobblers', Tailors', Bowyers' and Fletchers' guild) | GUILD | one `guildhall` plus the trade's members tied to it (V11 §3.12's GUILD rows): the roster's members of the trade's class **are** the record's (item 108 (c): never counted twice), topped up to the range's minimum (item 108 (b)) |
| River boatyard → Shipyard | SIZE | one yard at the landing or the wharf (plays itself) |
| Palisade or earthworks → Town walls → City walls and gates | REPLACEMENT | the palisade record builds the village kind (V07 §3.11's DR2); a town-wall record at a village rung builds the `inner` stone circuit; a promotion over time rebuilds on the palisade's trace or builds a new ring, the `town_walls` key binding the rebuilt enceinte, else the new ring, with the palisade's key as its alias (after a receipt the one key re-pointed, no alias; V08 §3.5.1 (d)) (V07 §3.11's palisade REPLACEMENT) |
| Fishmonger → Fish market | REPLACEMENT | the greater only: the fish market's hall on the market's rim (V07 §3.6 (4a), V07 §3.12 (b)); arriving over time beside a standing fishmonger, the hall is placed new by V07 §3.12 *Records at a village epoch* item 4, the fishmonger's key its alias (after a receipt the one key re-pointed to the hall; V08 §3.5.1 (d)) and the shop keeping its use, unbound |
| Citizen militia → Town watch | REPLACEMENT | a militia has no building (its muster is the green); a town watch at a village rung takes the `v.watchtower` row (its `guard_post` played through the village form), its yard by the green by the assignment's own soft row (V07 §3.11 DR9: `near` → `open:green`, `open:square` 80 soft 0.8) |

| step type (qualifier label) | member class | THORP | HAMLET | VILLAGE |
|---|---|---|---|---|
| COUNT ("(multiple)") | `*` | 2–2 | 2–3 | 2–4 |
| COUNT ("(multiple)") | `v.parish_church` | 2–2 | 2–2 | 2–3 |
| GUILD ("(guild)"; the members) | `*` | 2–3 | 3–5 | 3–8 |
| QUARTER ("(district)"; the members) | `*` | 2–4 | 3–6 | 4–10 |
| SIZE ("(established)") | `*` | no members | no members | no members |

Each range end is an anchor at the rung target, read by the anchor law and rounded down, never below its lower end.


### 2.5 Identity and addresses

Every village entity has a lineage address (§6.3): `VillagePlan` is keyed by the town root (one per document, ever: a
revived plan keeps its address, V07 §3.12); a derived `VillageEnd` by its anchor's lineage and its kind, a declared one by
its declaring event's address (a point anchor has no lineage of its own; J-V7.71); a green or square reservation by its
nucleus ordinal; the palisade as an `Enceinte` of stage 1. A **tracker** is transient — a walker, never a record — but every
way it lays carries the lineage `way:<tracker lineage>`, where a tracker's lineage is its parent's lineage and its
**position along the parent** (J-V7.69): `t0` the highway, `t0/s<k>.L` the left branch rooted at step `k` of its parent,
`k = ⌊arc length of the branch vertex ÷ network.stepM⌋`, `.R` the right, `…/c` the continuation after a branch, `…/t` a
road's track continuation, `…/e<epoch>.<n>` an epoch's extension. The step index is stable while the parent's walk up to
that vertex is unchanged, so an edit that suppresses or adds an earlier branch renumbers nothing downstream on that parent;
a re-derived network re-mints the same addresses where the walk is unchanged (§6.3's carry-over), and branch draws keyed by
that lineage do not shift when an unrelated branch changes. Frontage slots take the base's plot lineage (block and frontage
anchor); the built-slot draw (V07 §3.8) is keyed by each slot's lineage, so re-selecting one block leaves every other
block's choice unchanged.

Item 110's village entities (V07 §3.5a, V07 §3.8a, V07 §3.10a): a generated retaining wall is keyed by its platform's plot lineage
and the platform edge it stands on, `<plot>/terrace/<side>` with `side` ∈ `front`, `back`, `left`, `right` (the edge's
bearing relative to the frontage) and `.<k>` for the k-th walled interval along one edge; a wall shared by two platforms is
one record, owned by the platform with the higher datum (tie: the lower plot address); a pier head is `<pier lineage>/head`;
a stub track from a raised way's foot is `way:raised/<raised way>/foot<0|1>`; a raised way keeps its own lineage (the
base's; a generated one's is its reason key, V06 §3.19), never re-minted by a village stage.

### 2.6 Lifecycle of every new state field

| state | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `ladder.json` village rows; `village.json` | shipped tables | VS1–VS8, S2, S10, S12a, V07 §6 budgets | table pins in the recipe (§2.9) | a table edit re-derives from its first reader stage (§7.6) | `editTable` inverse | table-version migration (§7.5) |
| the register entries of this volume's calibratable columns (V07 §8 *The register at the exits*; W69) | V-M0's landing change (`village.json`'s) and V-M2's (the `presence` column's): V07 §3.15's named `…@VG` entry, then `plat calibrate register --defaults --milestone <id>` | the provisional-number lint (T-V12-20), V12's milestone exits (the `@VG` entry at V-M4), the corpus stage at M-CAL (V12 §3.10.5) | `plat/calibration/register.json` in the repository (V12 §2.6) | never re-derived: a status moves only forward and history rows are appended (V12 §3.11) | the landing change reverted with the table change that landed its columns (V12 §4.2) | V12's: a later named line restates an entry in place (V12 §3.11) |
| `ProductDecl` 'village' | package registration | `LadderRouter`, the port, the epoch | not persisted (code) | — | — | registry version |
| `Recipe.rung` at a village rung | creation (`generate`, the port's `creation`) | the replay's product stage set (§2.9), the report | recipe | kept | never edited | a base-only reader sees an unknown rung and refuses to replay, naming the village product (§7.5) |
| `VillagePlan.form`, `.roads` and their sources | S0's feature draw (V07 §3.1), the request or the dossier | VS2–VS6, S12a; the sources: S0, the port, the `WhyProvider` (V07 §2.3) | entities chunk | Regenerate (keep) reads the recorded value; New random on the village scope redraws the `auto` ones | `setAttr` inverse | schema version |
| `.heart`, `.nuclei`, `.radiusM`, `.character` | VS1 | VS2–VS6, labels (the heart's spotlight) | entities chunk (recorded inputs) | kept by Regenerate (keep); re-derived by Re-derive from VS1 | `setAttr` inverse (a heart move) | as above |
| `.opens`, `.palisade`, `.entries`, `.approaches` | VS3–VS4 | S7, S10, S12a, labels, exports | entities chunk | re-derived with their stage; addresses carried (V07 §2.5) | the event's undo record | as above |
| `VillageEnd` | VS8 | labels, the clerk, the dossier's quarter matcher, exports | entities chunk | re-derived after S10b; kept by address when its anchor survives | inverse of the event that changed it | as above |
| density raster and its `FieldBands` | VS2 | VS3–VS6, S10 slot draw, `painterly` spotlight | fields chunk | recomputed from recorded inputs; the density brush's strokes composited (§7.2) | stroke inverse | as the base field |
| `close` plots | S10b (V07 §3.8) | S12b (orchard rule), V07 §3.12 infill | entities chunk (base plot) | re-selected in the scope (V07 §3.8) | as a plot edit | base |
| `farm.outlyingShare` (`village.json`) | table | S2 (the farm households' split), S12a (the outlying farmsteads' count) | table | as a table | as a table | as `village.json` |
| `Reservation` 'green', `Pin` 'stocks' and 'maypole', `District` 'village' | VS4, VS8, VS5 | as their base kinds | base chunks | base | base | new enum values under schema versioning (§7.5) |
| `VillageRequest` (blueprint block) | the request, a dossier's creation prefix (V07 §3.11) or the skeleton file's `intend` line | S0's village draws (V07 §3.1) | recipe (the blueprint) | kept; a changed request re-derives from S0 | `setAttr` on the recipe's intent (§7.1's Adjust) | an absent block reads all-`auto` |
| `VillageField` | the hinterland unit at village rungs (V07 §3.9) | labels, the clerk, exports, V07 §3.12's retype | entities chunk | re-derived with the hinterland; kept by address while its seed furlong survives | inverse of the event that changed it | as above |
| `BuildingClassRow.villageForm` | table | S2 at village rungs, DR24's village step (V07 §3.11) | table | as a table | as a table | a row without the column reads its own id |
| `BuildingClassRow.presence` on the village rows and their typed columns (V07 §2.4), the words and `commonness` included | table (`commonness` compiled, V11 §3.2.1 step 5a) | S2 at village rungs (the presence column); V11's compiler; S10b, S11 (the profile, rows and template) | table | as a table: a row edit re-derives from S2 (§7.6) | `editTable` inverse | a row without the column counts by `perCapita`, `min` and `firstAtPopulation` as at every rung |
| `LandUse` retype (`retypeLand`, item 209) | an epoch's village phases (V07 §3.12) or a hand `convert` | S12b, the hinterland unit, render | entities chunk | the epoch's record | the conversion's undo record (§7.4) | new op kind under schema versioning |
| the palisade's `closure: 'barrier'`, its barrier arcs and stretch profile (item 106 at village kinds) | VS3 (V07 §3.4 steps 5–6) or `drawWall`'s derived form | VS4 (free passage on closing arcs), S7 (anchor furniture), VS5, S10b (intramural closes), render, the clerk | the `Enceinte` record (base chunk) | re-derived with VS3 from the recorded density and terrain; a drawn wall held | the `drawWall` inverse or the re-derivation's undo record | an absent profile reads uniform and a `shore` closure stays `shore` (item 106 (c)'s migration) |
| the entry store (a `store` use on its host plot, V07 §3.11) | S10b at creation or at a chain's arrival (absorb) | the import and export pulls; labels; the clerk | the `Use` record (base) | re-derived when its host or the chain changes; an assigned store held | the assignment's inverse | base |
| the market halls' claims and the fair field (`Reservation`s of kind `institution`, owned by the member, and `market` rank `secondary`, owned by the commons; V07 §3.6 (4a), (4b)) | VS4 (the claims, in its L1 batch) and VS5 (the fair field) from S2's manifest; at a village epoch `village.records` for a record and step (m) for a roster member (V07 §3.12 *Markets, halls and the fair over epochs*); on an absorb without an epoch `village.records` in the absorb's commit; a record's fair field tombstoned by `village.records`' `remove` | S10 (the hall's plot), S10b (the members bind), S12a (the fair field as a `common` face), (8v)'s perimeter re-derivation (the fair field a hole), `dist.market` (the open space, never the fair field), labels, exports, the clerk | the base's reservation chunk | re-derived with their stage, keyed by the member's lineage; one moved by hand held (V07 §4.3); one laid at an epoch replayed from the epoch's record, and the fair field kept at the hand-off up as a standing secondary market | the event's inverse or the stage's undo record; one step (m) laid for a roster member, the epoch's undo record where the epoch is an undo target; one a record laid or removed, none (a dossier event and an epoch that carries one are no undo targets, §7.4; the host restores, item 87) | a document without them has none until VS4, VS5 or an epoch lays them |
| ladder members at village rungs (V07 §2.4's third table) | S2's member count; S10b | render, labels, the clerk ("the record's members") | base records, keyed `#k` (J-A74.73) | the count re-read from the population; members kept by address | the event's inverse | base |
| a pin a record forces (V07 §3.10's pin-record rule) | VS8 at generation; `village.records` at a village epoch or an absorb (V07 §3.12), its address minted from the adding dossier event's `seq`, and for a pin-record lesser whose REPLACEMENT greater arrives (item 4) | render (V07 §5.1's glyphs), labels, exports, the record's binding (V07 §3.11 step 1), the clerk | the base's pin record, its provenance naming the record's binding key | re-derived with VS8 (the same key, the same pin); held while its record stands; tombstoned by `village.records`' `remove` with its record, save a forced well the coverage row counts, kept unbound with the coverage row as its provenance (J-V7.130) | the stage's undo record; one laid or tombstoned at an epoch or an absorb, none (a dossier event's; §7.4) | a document without it gains it when VS8 re-runs or the record next arrives |
| a village epoch's pins (`village.pins`; V07 §3.12 *Pins over epochs*) | the participant at `afterGrowth` | render, labels, exports, the next epoch's coverage and stall counts, T-V7-57 | the base's pin records (author `epoch`, cause `rule:village.pins`) and the stalls' tombstones, in the epoch's record | kept (standing fabric) by every later epoch and by Regenerate (keep) on the epoch's record; a pin whose host face the epoch tombstoned goes by `village.pins`' step 0 | the epoch's undo record where the epoch is an undo target | a document without them has the pins its earlier epochs placed; nothing is back-filled |
| the records placement's ops (`village.records`; V07 §3.12) — the fair field, a hall's plot, building and use, a claim-sized join or outside plot, the rank, a forced pin, a REPLACEMENT greater (item 4), and `remove`'s tombstones, unbindings and a removed market record's cleared rank | the engine's `dossier` step at a village epoch; the base's *One path* placement and §7.7 item 2's removal on an absorb without an epoch — every entity minted and every draw keyed by the adding or removing dossier event's `seq`, epoch component 0 | as their records' rows above and the base's | the epoch's record, or the absorb's commit | replayed from the epoch's record or the absorb's commit | none: a dossier event and an epoch that carries one are no undo targets (§7.4); the host restores (item 87) | base |
| `village.json` `rules` (V07 §2.2a) and the anchor laws | shipped table | the stages named per sub-record | table pins (§2.9) | a cell edit re-derives from its first reader (§7.6) | `editTable` inverse | table-version migration; an absent sub-record reads the shipped defaults |
| `daylight.terrain` (VS1) | VS1 by nine horizon sweeps (V07 §3.2 (4)) | VS1, VS2, VS5, V07 §3.9, the shade map, the clerk | never (recomputed from terrain and the latitude on load) | recomputed with VS1 | — (derived) | — |
| the border chain, `lattice`, `destinations` and the L0 ponds (VS1; V07 §3.2 (8)) | VS1 | every frame-bounded step; S4's router; VS4; water readers | the border and ponds as base chains and water bodies; the lattice and destinations never (transient) | re-derived with VS1 | the event's undo record | base |
| `VillagePlan` lifecycle across crossings | the first creation or first hand-off down | V07 §3.12's phases; the old core's fabric after a hand-off up | entities chunk | `superseded` at a hand-off up; revived (lifecycle back to live, `auto` fields re-derived, declared fields kept) at a hand-off down | the epoch's undo record | as above |
| a `VillagePlan` created by a history replay (V07 §3.12a) | the replay's hand-off down epoch, or a refounding's village generation on the ruins | as `VillagePlan` | entities chunk | re-run with the replay from the seed and the history (§4.11 *History-first generation* (2)) | none: the replay's epochs are the creation prefix, never undo targets (§7.4) | as above |
| `VillageEnd.declared` (`event`, `boundary`) | `declareEnd` | VS8 (the lasso's plots, exempt from merge and cap) | entities chunk | held (declared means held) | the event's inverse | absent: a derived end |
| `VillageField` whose furlongs are all cleared | the hinterland unit | — | entities chunk | tombstoned by the clearing epoch's ops, or by the batch of V07 §3.12 (a)'s fair field or (c)'s outside plot that takes its last furlong | the epoch's undo record where the epoch is an undo target; a record's batch none (a dossier event's, §7.4) | as above |
| the product fold and `handoff.band` (V07 §2.1) | derived at each epoch from the creation rung and the targets | the epoch runner's phase choice | never (derived; J-V7.3) | re-folded on replay | — | an absent cell reads 0.05 |
| crypt cells of `v.parish_church`, `v.chapel`; a church's drawn crypt | table; §2.6's basement draw at build | V02, V03, V04's crypt join, V07 §3.12 step 6 | table; the building's basement record (base) | the drawn crypt kept by lineage; never redrawn by a rung change | the build's undo | base |
| caverns, ruins, their `AccessPoint`s and scattered dwellings at village rungs (V07 §3.16) | V04's T2, T2b, T3 F6 at village rungs; V07 §3.12's growth draws | the underground view, labels, exports, the clerk, V07 §3.12 | V04's records (entities block, the part) | V04's rows (V04 §2.6); kept across both hand-offs | V04's | V04's; a document without them has none |
| a shrunk town's standing underground in maintenance mode (V07 §3.12) | the hand-off down | V04's stages in maintenance mode, U-FADE | V04's records | re-derived from kept galleries, never grown; a catacomb never below `extentFloorM2` | the epoch's undo record | V04's |
| hollow ways (a way's `abandoned` existence, the land classes on ground part 0 only) and house platforms (a dwelling's `cleared` existence) | V07 §3.12's decline ops (`retireWay`, `effaceWay`; `reopenWay` by regrowth; each also a hand `convert`, V07 §4.1) | V07 §5.1's roles, GeoJSON, regrowth-first | the way's and building's `Lifecycle` (base) | kept (live records) | the epoch's undo record | base (item 268 adds the ways' ladder) |
| a generated `RetainingWall` at village rungs (V07 §3.8a) | S11's platform levelling | render (`retaining.wall`), exports, the clerk, the ground datum (§2.6's `deriveBase`), V04's foundation reach, V07 §3.12 | the base's record (entities chunk; its state a stretch-state profile, §2.2 rule 5) | re-derived with its terrain while its platform's dwelling stands in any existence short of `cleared`; from the step at which the dwelling is `cleared` or its toft turned to garden, **kept** — never re-derived again — and decaying by V06 §3.19.4 (3)'s `retaining` kind; restored by V06 §3.19.4 (6) when a rebuild re-levels its platform at the datum (J-V7.89) | the log's (an edit's inverse, the epoch's undo record) | a pre-110 document has none: walls arrive only when a re-derivation touches their platform (Regenerate or an edit), and the upgrade report states the one-time shift |
| a drawn `RetainingWall` (T3 `wall` `retaining`, T2 `ground`'s terrace stroke) | the event | as above | log | held (declared) | the event's inverse | absent in an older document: nothing |
| the house platform's levelled ground and its `stair` and `ramp` yard parts (V07 §3.8a) | S11 | the ground datum (§2.6's `deriveBase`), render, T-V7-9, exports, the clerk | the levelled ground as the base's levelling output (recomputed); the yard parts in the plot record | re-derived with S11 on its plot; kept with a kept wall | the plot edit's undo | a pre-110 document: as the walls |
| a raised way on a village map (declared, or carried down; V07 §3.5a) and the `raised` key | a T4 `road` or skeleton declaration; the hand-off down carrying a city's way | VS3–VS6, S10, S12a, the hinterland unit, VS8, V04's arch-vault source, render, the clerk | the base's parts (a declaration in the log; a carried way in the entities chunk); `raised` never (read from the parts) | a declared way held; a carried way never re-derived or removed by a village phase; its feet re-joined at every derivation; removal by V09's delete or V06 §3.19.3's suppression (a reason key in the log, never V07 state) | the event's inverse | absent: none |
| a foot's join or stub track (`W_RAMP_STUB`) | VS4 at every derivation | the network's readers | the network (a `T` junction or a `track` way) | re-derived with VS4 | the derivation's undo record | — |
| a pier head and its deck plot; a placed deck plot (V07 §3.10a) | VS4 (the head, drawn on `village.slot` by the pier's lineage); S10 (the plot); T6 `place` on a deck face | S10b, V02 (`DeckContext`), render, exports, the clerk | base plot and way records | re-derived with VS4 and S10; a placed plot held; falls with its deck by least disruption and is re-offered when the deck is rebuilt | the event's inverse or the epoch's undo record | a pre-110 document gains pier heads only when a re-derivation touches its piers, reported with the walls |
| the landmark yard parts (`net_rack`, `drying_rack`, `timber_stack`) and a named beach (V07 §2.3, V07 §3.11) | S11 (the yard parts in their host's site plan, from V08's `landmarks` row); S13a (the beach's label) | render (V07 §5.1's roles), labels, exports (`landmark_parts`), the clerk | the yard parts in the plot record; the beach's name never (re-read from the dossier binding) | re-derived with S11 and S13a | the plot edit's undo | a document without them has none |
| a stepped building at a village rung (V07 §2.4) | V11's specialisation draw at S2, V02's `layTiers` at S11 | V02, V03, render, exports | base building record | V02's rows | V02's | V02's |
| `Landing`, `FrontageRun`, `village.reached` | VS4; VS6 | VS4 seeding 5, S10b; S10, S10a | never (transient data keys) | recomputed with their stage | — | — |
| the request fields `orchards`, `forest`, `arableFactor`, `organic`, `district` | the request, T1, the skeleton file | S0, VS4, V07 §3.9, V07 §3.15 | recipe (the blueprint) | kept | `setAttr` on the intent | absent reads `auto` |

### 2.7 The request block, the field groups and the class column

```ts
// @plat/layout — the blueprint's village block (item 287); every field optional, 'auto' drawn at S0 (V07 §3.1)
interface VillageRequest {
  form?: PlanForm | 'auto'; roads?: RoadTopology | 'auto'; water?: keyof VillageRungRow['water'] | 'auto';
  palisade?: 'auto'|'none'|'palisade'|'earthwork'|'inner'; fieldSystem?: FieldSystem | 'auto';
  open?: 'auto'|'green'|'square'|'none'; densityDial?: number /* [0.5, 2]; absent: 2^(2·intent.density − 1) (V07 §3.3) */;
  heart?: PointCm /* a declared heart (T6 `place` of the village's centre, V07 §4) */; entries?: Cdeg[] /* declared entry bearings */;
  organic?: boolean | 'auto' /* roads follow the terrain freely: turn 0 (V07 §3.2 (5)); auto: true when the intent's planned ↔ organic
    dial ≥ formRules.organicDialFrom (0.75) */;
  district?: boolean /* denser and crossroaded: δ × formRules.districtDensity (1.5) and the crossroads weight × 2 (V07 §3.1) */;
  orchards?: boolean | 'auto' /* false: no orchard closes or orchard faces (V07 §3.8, V07 §3.9) */;
  forest?: 'auto'|'many'|'some'|'grove' /* the wood claim's weight × 2, × 1 or the grove reversal (woods only on a ring around the village, V07 §3.9) */;
  arableFactor?: number /* [0, 4]: the arable demand × this factor (VG's farmland 4, uncultivated 0; V07 §3.9 (1)); absent 1 */ }
// transient data keys (never persisted; recomputed with their stage) — typed here because two stages exchange them
interface Landing { shore: PointCm; bearingCdeg: Cdeg; tracker: string /* the lineage of the tracker that stopped */; water: Id }   // output `village.landings` of VS4; read by VS4 seeding 5 (piers) and S10b's `v.landing`
interface FrontageRun { way: Id; side: 'L'|'R'; from: M; to: M /* along the way's spine */; weight: number /* 1, ½ on a track, 2 on the rim */; rim: boolean }   // output `frontageRuns` of VS6; read by S10's `toft` strategy and S10a
// `village.reached: Id[]` — the block faces inside the enclosure and outside the pre-reach trace (V07 §3.4 step 5 b), output of VS6; read by S10 (closes) and S10a (excluded)
// `raised` — the ground arena's parts from 1 read as one data key (item 110 (b); item 290), its value one `RaisedRead` per raised way: §4.1's
// type, a view derived on read from the way's `RaisedWayRecord` (§2.7) — its supports and spans by their keys with their `state`, its
// `origin` (at village rungs a generated one is carried down from a CITY epoch) and `reason` (read by the clerk); at village rungs produced by
// the kernel's declaration layer from the log and the standing records (V07 §3.0), never by a village stage; read by VS3–VS6, S10, S12a,
// the hinterland unit, VS8 — a support whose `state` is absent or `ruined` as standing ground, a `cleared` one as none (V07 §3.5a)
// @plat/village — the named groups of hinterland faces (item 267)
interface VillageField {
  id: Id; plan: Id; kind: 'great_field'|'infield'|'outfield'|'common'|'meadow'|'wood'|'strip_holding';
  furlongs: Id[] /* the LandUse faces it groups, address order */; slot?: number /* a great field's rotation slot (LandUse.rotation.slot of its furlongs) */;
  holder?: Id /* a strip holding's toft (forest_strip only) */; name?: NameRef; lifecycle: Lifecycle }
```

A great field is the rotation unit of an open-field village (every furlong in it carries the same `rotation.slot`, §4.9's
three-field scheme read per great field at village rungs; V07 §3.9); the infield and outfield are the two tiers of an
infield–outfield system; a common, a meadow and a wood group their faces for one label and one owner; a strip holding is
one toft's long strip in a forest-strip village. `BuildingClassRow.villageForm` (§10.2; items 430, 432) names the `v.`
class that plays a class at village rungs, absent meaning the class plays itself; V07 §3.11's resolution order reads it.
The request block's values are the recorded inputs a village request carries; a dossier fills them by V07 §3.11's rows,
never by hand.


## 3 Generation

### 3.0 The village pipeline — stages, order and data keys

The village product runs the base's pipeline machinery (§4.1) over its own stage set: `ProductDecl('village').stages`
lists the base stages it reuses, the seven village stages it registers (VS1–VS6 and VS8; the wharf and piers are VS4's
step, J-V7.51) and V04's underground tail at the village subset (V07 §3.16), and the pipeline is the topological order of
that set's declared I/O (§4.1, §4.12). The base's S3–S6 and S8 are not in the set. Their jobs are done by VS1–VS6, which
write the same data keys the later base stages read (`network`, `enceintes`, `reservations`, `districts`, `blocks`), and
**VS1 takes over S3's non-siting jobs** — the map border, the lattice and its edge costs, the typed destinations and the L0
ponds (V07 §3.2 (8); J-V7.50) — so S7 and S7b–S14 run unchanged on a village (save S11's furniture step, which places no pin
at the rungs whose `RungProfile.frameLaw` is `territory`: VS8's rows, V07 §3.6 (5) and V07 §3.10, are the village's whole
furniture; item 579; J-V7.118), and every input key of every stage in the set has exactly one producer in it (T-V7-3). S2's
government step reads the government row's `villageSeat` alone at those rungs (V07 §3.2 (3); item 576 (c); J-V7.117).

```
S0   Blueprint + the village draws (V07 §3.1)                                [base stage; village rows]
S1   Site over the territory, course-first river (V07 §3.2)                 [base stage; village RiverStrategy 'course-first']
S2   Programme at village rungs (V07 §3.2 (3), V07 §3.8)                    [base stage; village rows]
VS1  Heart, nuclei, character, radius, daylight; S3's jobs: lattice, destinations;
     L0 batch (the leat, the ponds); L1 batch (the border first, then the mill reservation) (V07 §3.2)
VS2  Density raster and FieldBands('density') (V07 §3.3)
VS3  Palisade trace, planned (V07 §3.4)
VS4  Network: trackers, open spaces, entries, approaches, crossings, the wharf and its piers
     → one L1 batch with the palisade (V07 §3.5, V07 §3.6, V07 §3.10)
VS5  Perimeter (interiors over 2 ha cut out), the one `village` district, prosperity pass 1 (V07 §3.7)
S7   Fortification and water furniture (gates, gate towers, bridges, fords)  [base stage]
S7b  Allocation (the district and the hinterland)                           [base stage]
S12a Hinterland siting at village rungs (V07 §3.9)                          [base stage; village presets]
VS6  Houses-along-ways fabric: blocks, frontage runs, reached faces, the capacity check
     and its top-up trackers (a second L1 batch) (V07 §3.8)
S9   Corridors · S10a block quotas · S10 toft plots · S10b placement · S11 site plans and the house platforms' levelling (V07 §3.8a)   [base stages; village rows]
S12b Greenery ‖ the hinterland unit (fields, woods, outlying farmsteads) (V07 §3.9)   [base stages]
VS8  Ends, pins and decorations (V07 §3.10)
S12c character · S13 names and labels · S14 display list                    [base stages]
— first map —
T2 (ruin, cavern) · T2b access · T3's F6 · T5 · T6 · T8; T7 when the layer is shown   [V04's tail, village subset (V07 §3.16)]
```

**The writer order at village rungs** (§4.1's rule read for this set, J-P46; item 283): L0 is written by S1 and VS1 (the
leat, the ponds); L1 by VS1 (the border first, then the reservations), VS4 (the network with the palisade, the open spaces
with the market halls' claims, the wharf and piers), VS5 (the perimeter and the fair field), S7, S7b and VS6 (the top-up
trackers), in that order, and by no generation stage after S9; S10 never writes L1. The tail writes only its own
underground parts (V04 §3.1). The order is the topological sort with the stage id as the tie-break (§4.1); two dependencies
are declared for it: VS6 reads S7b's allocation (`allocation`, for the institutions' joins in its capacity check), and
`ProductDecl('village').extraInputs` adds `districts` to S7's inputs, so VS5 precedes S7 as the base's S6 precedes S7 (the
tie-break alone would put S7 first), and `reservations.fair` to S12a's, so S12a claims the fair field as common (V07 §3.6
(4b)). VS6's top-up trackers grow inside the perimeter only, so S12a's hinterland decisions, made before VS6, stay valid.

**Document-state keys.** `declarations.*` (VS8's `declarations.ends`) and `raised` (item 110 (b)'s parts from 1, §4.1's `RaisedRead`;
item 290) are published by the kernel's declaration layer from the log and the standing records (§7.2), never by a village
stage; they are the one producer T-V7-3 counts for those keys. No village stage writes a ground part from 1: a raised way on
a village map is read-only to the village (V07 §3.5a). Item 110's village writes keep the order: the feet's joins, the stub
tracks and the pier heads are in VS4's L1 batch; the house platforms' walls, stairs and ramps are S11's plot-level writes,
never L1 (V07 §3.8a). S10, S12a and the hinterland unit read `raised` as the base declares it for item 110 (b) (the base's
plots avoid supports and the deck's strip, V02 §3.17 (b)); where that declaration lacks it,
`ProductDecl('village').extraInputs` adds it (J-V7.80).

| stage | inputs (data keys) | outputs | stream concerns (V07 §3.14) | txForm |
|---|---|---|---|---|
| VS1 | `site.*`, `roster`, `blueprint.village`; as recorded inputs from the recipe and the epoch's slice, the latitude in force by V08 §2.5's rule (`CircumstanceSlice.port.latitudeDeg`, else the blueprint's `Intent.latitudeDeg`, else 50) | `village.plan` (heart, nuclei, character, radius), `daylight.terrain`, `lattice`, `destinations`, `water.leat`, `water.ponds`, `border`, `reservations.mill` | `village.plan`, `site.centre`, `hinterland.decor` (the pond's site) | declared |
| VS2 | `site.terrain`, `site.water`, `village.plan`, `daylight.terrain` | `village.density`, `fields.density` | `village.density` | callback |
| VS3 | `village.density`, `village.plan`, `site.water`, `reservations.mill`, `raised` | `village.palisadePlan` | `village.palisade` | declared |
| VS4 | `village.density`, `village.palisadePlan`, `village.plan`, `site.crossings`, `reservations.mill`, `destinations`, `lattice`, `roster` (`N` for the piers, the `v.landing` for the pier head, the `market-hall`-family members with a `nearMarket` row for the halls' claims, V07 §3.6 (4a)), `raised` | `network` (with quays, piers and pier heads; the raised ways' foot joins and stubs), `enceintes`, `reservations.open` (with the halls' claims), `village.entries`, `village.approaches`, `village.landings` | `village.track`, `village.open`, `village.slot` (the piers, the pier head), `route` | callback |
| VS5 | `network`, `enceintes`, `village.density`, `village.plan`, `reservations.mill`, `reservations.open`, `daylight.terrain`, `raised`, `roster` (the `fair_ground` member) | `districts` (one, kind `village`, with the deck faces of V07 §3.10a (5)), `perimeter`, `fields.prosperity` (pass 1), `reservations.fair` (V07 §3.6 (4b)) | `field.chance` | callback |
| VS6 | `districts`, `network`, `enceintes`, `village.density`, `village.plan`, `village.palisadePlan`, `fields.prosperity`, `roster`, `allocation`, `raised` | `blocks`, `frontageRuns`, `village.reached`, `network` (top-up trackers) | `village.track` (the top-ups) | callback |
| VS8 | `plots`, `buildings`, `reservations.*`, `village.plan`, `institutions`, `declarations.ends`, `raised` | `village.ends`, `pins`, `decorations` | `pin.centrepiece`, `pin.decor`, `hinterland.decor` | declared |
| V04's tail | V04 §3.1's rows at the village subset, with the village's buildings, wells and working plots | V04's records (V07 §3.16) | V04's keys | V04's |

Every village stage registers a `StageDecl` with its invariants (V07 §3.13's rows), its ladder (V07 §3.13), its work limits
(laws of the household count, V07 §6) and `budgetMs` per village rung (V07 §6). The order is fixed by the data keys: the
density before the network and the palisade before the roads (PART III items 1 and 2) hold because VS4 declares
`village.density` and `village.palisadePlan` as inputs.

### 3.1 S0 — the village draws

**Named draw shapes** (our own names, used throughout): **u** — a single draw, uniform on (0, 1); **B3** — the average of
three such draws, a hump centred on ½ over [0, 1]; **F4** = |(the total of four draws) ÷ 2 − 1|, a value on [0, 1] crowded
toward 0 with average ≈ 0.28; **S** = 2·B3 − 1, a hump centred on 0 over [−1, 1]. Each is drawn from the stream the step
states.

S0 resolves the `VillageRequest` (V07 §2.7): a value the request or a dossier gives is taken (its source recorded), and
every `auto` is drawn once on `blueprint.features` from the town root (§6.1), in this order, after the base's own feature
draws (relief, geology), and recorded in `autoResolved` with its reason (§5.4):
1. **Water type** from `water` (V07 §2.2); a brook, stream or river by its row, a pond, coast, island, estuary or confluence
   by theirs; `island` forces `roads: isolated`. The site request's own water (a dossier's terrain, V07 §3.11) replaces the
   draw. **On an arid climate row** (item 111 (a); J-V7.134) the weights are first re-weighted by the arid row's chances: each entry is
   multiplied by `P_arid ÷ P_temperate` of its class (V11's climate rows: river for brook, stream, river, estuary and
   confluence; lake for pond; coast for coast and island), `none` takes what the others give up, and the row is
   renormalised — so an arid village still draws a river, a pond or a coast at the arid row's chances; on every other row the
   weights are unchanged. **The oasis** is S1's feature (§4.2 S0–S1 (2)), not a water type: after the water type, S0 draws it
   by the base's rule on the village territory — the arid row's `P(oasis)` × its no-other-water factor when the water type is
   `none` — and a dossier's `oasis_water` makes it exist (DR1); a village beside an oasis is an **oasis village**, its spring
   and shore water for every village rule that reads water (V07 §2.4's `site water`, V07 §3.2 (4), V07 §3.3, V07 §3.10's wells, V07 §3.16
   (3)'s well reading) and its irrigated gardens and grove §4.9's (inside the perimeter the plots nearest the water take garden
   yards by prosperity, outside it the gardens are laid before the fields). **A bridge-implying record** — a dossier record
   whose `kinds` row carries `implies: 'bridge'` (V11's `toll_bridge`) — applies V08 §2.6b (3)'s toll-bridge rule at its
   village rung: its forced course (`water: brook`, `estuary` on a coastal site), the course's entry and exit bearings
   on the two frame arcs the through road's entries divide, the road topology it raises to `through` at step 3, and its
   failure `toll_bridge_dry` are that rule's; VS4 bridges the crossing, whose deck may carry the toll house by `deckOk` (V07
   §3.10a (4)).
2. **Plan form** from `forms` × `cultureForms[culture]` (V07 §2.2): the row's weights times the culture multipliers,
   renormalised, each weight read at `P` by the anchor law; `dispersed` is weight 0 when the density dial exceeds
   `formRules.dispersedDialMax` (1.4).
3. **Road topology** from `roads` (V07 §2.2); the `nucleated` form and a `district` request each multiply `crossroads` by
   `formRules.crossroadsWeight` (2), `dispersed` multiplies `isolated` by `formRules.isolatedWeight` (2).
4. **Palisade**: kind from `palisade.kinds`, present with probability `chance` (or `denseChance` when the dial exceeds
   `palisade.denseDialFrom`, 1.4), × `waterFactor` on a water map (`VG` preset: dry maps only, VG's rule); a dossier decides
   it exactly (V07 §3.11).
5. **Open space** (`open`): `none` for `dispersed`; `green` for `green`; else present with `open.chance[dry|water|island]`,
   its kind `green` unless the culture key is `latin` or `greek`, a dossier market record exists, or the preset is `VG`
   (then `square`; J-V7.17).
6. **Field system** from `fields` (V07 §2.2) × the factor rows of `rules.fields` (V07 §2.2a: climate, relief, culture, era)
   and the form rule (`forest_strip` weight 0 unless the form is `row` or `street`), renormalised.
7. **Density dial** `δ` = the request's `densityDial`, else `2^(2·intent.density − 1)` (intent density 0.5 → 1; continuous
   and monotone, §7.8), × `formRules.districtDensity` (1.5) under a `district` request, clamped to `density.dial`.
8. **Organic** = the request's `organic`, else true when the intent's planned ↔ organic dial is at least
   `formRules.organicDialFrom` (0.75); true sets the character's `turn` to 0 (V07 §3.2 (5): every steering vector applied,
   the roads following the ground). The reference's requests (its water, road, palisade, square, orchard, grove, farmland,
   uncultivated, organic, district, density and size choices) map onto these fields by the request-mapping table held with
   B-VG's baseline rows (item 495), calibration data like the other baseline rows (J-V7.72).

### 3.2 S1 over the territory, S2 at village rungs, and VS1 — heart, nuclei, character, radius, mill seat

**(1) The territory frame.** `A_T = max(territory.minKm2, a · P ÷ territory.usableShare ÷ 100)` km², where `a` is the area
per head the land budget derives (V07 §3.9 (1): 2.275 ha; 700 people → 19.9 km²), at the request's aspect, plus
`territory.marginShare` of each side as the context margin drawn beyond it — the ladder row's `frameLaw: 'territory'`
(§1.1; item 279 reads it). The `VG` preset replaces it by VG's view at `matched.vg.size` (V07 §2.2). The frame grows at an
epoch by §4.11's rule and never shrinks.

**(2) S1 with the village's river strategy.** Terrain, coast, hydrology, the carve, crossing sites, bank classes, the
oasis and resources are S1's (§4.2 S1), run over the territory at the village rung's raster sizes (V07 §2.2 `rasters`). The
relief primitive follows the water type as VG's does (`ref:VG 1.6.9 terrain primitive by water type (code)`), mapped onto
S1's authored primitives: a dry map picks among six equally likely slots — two plains, two hills, a ridge and a valley (a
hill placed by B3 in each axis inside the frame's middle half, a ridge or valley on a straight axis crossing the frame's
centre at a u-drawn bearing); a coast a sloping plane falling to the sea side; a pond a hollow near the centre; an island a
mount at the centre whose level set is the shore. Amplitudes are S1's relief-class metres. **The river is course-first**
(J-V7.5) — the registered `RiverStrategy 'course-first'`, VG's order (PART III): for a brook, stream, river, confluence or
estuary,
1. the width `w` by class — brook 2–4 m, stream 4–10 m, river 10–40 m, drawn `w_lo + (w_hi − w_lo)·B3²` on `water.river`
   (VG's width skewed small, in our classes);
2. the course enters and leaves on a ring a little beyond the territory's edge, entry bearing `π·u`, exit
   `entry + π·(0.5 + u)` — 90° to 270° apart — and the axis through a point within 0.3 × the territory's half-width of its
   centre (VG passes through the map centre; ours lets the heart sit off the river, J-V7.5), Chaikin-cut twice;
3. knots at the first cosine extremum and every half wavelength after it, the wavelength `λ = w · 2^(3.5 + B3²)`, each pushed
   along the axis normal by `w · (2 or 5, even odds) · √B3 · cos(2π(s/λ + φ))`, `φ = u` (`ref:VG 1.6.9 meander spline
   (code)`), plus knots at both ends;
4. an interpolating cubic through the knots at 8 samples per span, resampled every `w/2`;
5. a confluence adds a tributary of width `w·(1 − ½F4)` from a source opposite the main course's chord midpoint turned by
   `±60°·S`, its meander amplitude decaying linearly to zero at the junction; an estuary lays the course to a coast drawn on
   the course's exit side.

S1's carve then makes the bed descend monotonically along the course (§4.2 S1 (3); `carveMaxCm` binding, F-RIVER
re-routing a course the carve cannot serve), so the course-first river is hydrologically sound by construction. The option
`river: 'descent'` (the base's descent trace) is taken when a dossier's realm block gives a river course (V07 §3.11).

**(3) S2 at village rungs.** The sequential roster (§10.2) runs with the village class rows (V07 §2.4) and the village's
household rows: households `H = round(P ÷ household.meanSize)` split over the bands by `bandShares` (shifted by the intent's
wealth level, §4.2 S2); dwellings `N_b = round(H_b ÷ (1 + share2_b))`; the institutions by their rows' rung presence; the
hinterland's demand by the farm table's village rows (V07 §3.9) under the form's farm mode (§4.9; item 314): the forms
`grown`, `street`, `green`, `nucleated`, `polyfocal` and `row` take `perimeter` (the farm households live in the village,
their fields around it), `dispersed` takes `fill` (J-V7.11). **Who lives where** (J-V7.54): the farm households
`H_f = min(H, round(arableHaPerCapita · P ÷ fieldHaPerFarmstead) × householdsPerFarmstead)` (§4.9's `FarmTable`, village
rows); the outlying households `H_o = round(farm.outlyingShare[form] · H_f)`, taken from the farm households' bands in
proportion; the outlying farmsteads `N_o = ⌈H_o ÷ householdsPerFarmstead⌉`; the village dwellings `N_v = N − N_o`, with `N`
the dwellings above (after DR7's re-solve with a dossier, V07 §3.11). V07 §3.8's quotas and race place `N_v`; V07 §3.9 (5)
places `N_o`; every household is housed once, and DR7's residential count is `N_v + N_o = N`. The need propagation (§4.2 S2)
runs unchanged — a village with a bakehouse and no mill imports its flour; a roster that needs a watermill demands its mill
seat.
**The government step at village rungs** (J-V7.117). At the rungs whose `RungProfile.frameLaw` is `territory`, S2's
government step (§10.2 *Government*) reads the government row's `villageSeat` alone (V11 §3.21.1): a dossier government's
(DR11) or an `@seat` record's `villageSeat` class is present with at least one member (V07 §2.4's forced seats; J-V7.104),
and a request's government (the blueprint's stand-in where no dossier is bound) forces nothing and feeds only V07 §2.4's
`gov` presence conditions, whose laws give the seat by the village's size. The step reads neither the row's seat class, nor
its offices' seat classes, nor its military share (guard posts per 1 000, barracks) — those columns are the base rungs'
(item 576 (c)): a village's officers sit in the seat's house and its watch keeps no post of its own. A dossier office
(`@office`) binds to the `villageSeat` member's building, a religious office (`priest_resident`) to the parish church (V11
§3.11); a `guard_post` member (played by `v.watchtower`, V11 §3.22) arises only from a town-watch record (V07 §3.11 DR9) or
the `v.watchtower` presence row (V07 §2.4). So no `palace`, `castle`, `cathedral`, `courthouse` or government-row
`guildhall` is placed at a village rung by the government step (T-V7-13); a dossier record naming one of those classes
still plays itself by V07 §3.11's resolution order.

**(4) The daylight share, the heart and the nuclei** (VS1). *The daylight share first* (item 102 (a)–(c); J-V7.60):
`daylight.terrain` is the sunlit share `D(x)` over the frame and margin at `rasters.daylightCm`, computed by **nine horizon
sweeps** — one per sun position of item 102's representative day (the path sun at the latitude in force, a recorded input;
equinox; nine azimuths from sunrise to sunset) — each a single pass over the grid in the sun's azimuth order keeping, per
scan line, the running horizon angle; a cell is lit for that position when the sun's elevation exceeds the horizon angle
behind it; `D(x)` is the lit count ÷ 9 (our own algorithm, ≈ 9 × cells operations). Only terrain casts at generation
(nothing built exists yet; the palisade's shade enters VS5's pass 1, V06's building mask the epochs). Every village reading
of `D` below is multiplied by the climate row's sunlight cell (item 111 (c); V07 §2.3).
*The heart* (draws on `site.centre` keyed by the town root). A declared heart (the request's `heart`, an `intend` or `place`
declaration) is taken. Otherwise candidates on the `heart.latticeM` (20 m) lattice inside the frame's middle half are scored
by `rules.heart` (V07 §2.2a): dry and above S1's flood line (hard); slope ≤ `slopeMax` (hard; relaxed by F-V-HEART); +0.6
within 150 m of a crossing site (villages sit at fords and bridges); +0.5 within 300 m of fresh water (a stream, a pond, an
oasis's shore or spring, or a spring cell of S1's hydrology); +0.3 × (D(x) − D̄) (the sunny slope); −0.3 × wind exposure
(sheltered sites); +0.2 × the relative height within 300 m (prominence: a village on or beside a rise); +0.2 × fertile
share within 500 m; −0.5 within 300 m of the frame; a random term of share 0.15. The net effect of wind and prominence: a
sheltered shoulder or the lee foot of a rise scores above both the exposed crest and the flat bottom (J-V7.34). The best is
the **heart**. A `polyfocal` form sites `k = 2 + (u < polyfocal.extraChance)` nuclei, each by the same score, at least
`max(polyfocal.spacingMinM, polyfocal.spacingShareRs · R_s)` apart; every nucleus after the first carries a share `1 ÷ k`
of the dwellings for V07 §3.3's radii.

**(5) The character** (VS1, drawn on `village.plan` keyed by the plan, in this order; `ref:VG 1.6.9 character parameters
(code)`, restated at 0.7 m per unit): `minWidthM = 0.7·(8 + 2·B3)` (5.6–7.0 m), `maxWidthM = 0.7·(10 + 4·B3)` (7.0–9.8 m),
`depthRatio = 1.2 + 0.6·B3`, `branchSpacingM = ½(minWidthM + maxWidthM)·(4 + 8·B3^1.5)` (≈ 25–100 m), `turn = 0.05 + 0.2·F4`
(0 when `organic` resolves true, V07 §3.1 (8)). They are recorded inputs (V07 §2.3) and feed: the branch spacing (V07 §3.5),
the open space's rim (V07 §3.6), the dwelling scale — `District.buildingScale = ½(minWidthM + maxWidthM) ÷ 7.7 m` (VG's mean
width, so a village of big houses has big houses) — and the footprint aspect of detached and hovel plans through
`District.fabricParams.depthRatio` (item 378).

**(6) The settlement radius.** `A_s = (Σ_b N_v,b · toftArea_b + Σ_inst plotArea_inst) ÷ settle.settledShare` — the tofts
and crofts of the village dwellings at their band centres (V07 §2.2 `toft`, the squalid row for hovels) plus the
institutions' plots at their templates' `plotAreaM2` centre, over a settled share of 0.5 (the rest ways, the open space,
closes and gaps) — and `R_s = √(A_s ÷ π)`: ≈ 100 m at 40 people, ≈ 245 m at 200 and ≈ 480 m at 700 (the rows' band centres;
T-V7-24 recomputes these from the table). The croft rows stand as written and the worked figures follow them (J-V7.62). The
`street` and `row` forms stretch it along the through road's bearing (the major radius `settle.stretchMajor · R_s`, the
minor `settle.stretchMinor · R_s`); a polyfocal nucleus takes `R_i = R_s ÷ √k`. Recorded (V07 §2.3).

**(7) The mill seat and its leat** (VS1, when S2 demanded a `v.watermill`). Candidates are the course points where the
carved bed falls at least 1 m within 300 m downstream (V07 §2.4's hard need), within 150–1 000 m of the heart, scored +0.5
downstream of the heart, +0.3 within 100 m of a crossing site, +0.2 on the heart's side of the water, a random term of share
0.1 (`rules.mill`). The **leat** is a least-cost channel on VS1's lattice (step (8)) from a take-off upstream where the bed
stands at least 1 m above the mill's, to the mill and back to the stream below it (the tail race), at most 300 m long,
carved in VS1's L0 batch as `canal` water with one deck where the mill's approach crosses it (S1 (5)'s form), and the
mill's plot is reserved (`Reservation.kind 'institution'`, owner the mill's institution) in VS1's L1 batch, so the network
routes to it and around it. No site → F-V-MILL (V07 §3.13): a windmill, else an import. A dossier's
`access_to_external_mill` suppresses both mills (V07 §3.11).

**(8) S3's non-siting jobs, taken over by VS1** (J-V7.50). S3 is not in the village's set, so VS1 does its four jobs that
the later stages read, with the base's constructions: (a) the **map border** chain on the frame rectangle (§3.2 (9), §2.2
rule 1), laid first in VS1's L1 batch; (b) the **lattice** and its edge costs over the frame (§4.2 S3 (3)'s form), the
costs reading the village way classes and `rules.grade`, output `lattice` — read by the leat (7), S4's router for the
neighbour roads, the polyfocal joins and the `row` spine (V07 §3.5) and F-V-TRACK's third rung, every such call passing
the routed rung so that the router prices no raised span (V07 §3.5's rung gate; J-V7.90); (c) the typed **destinations**
(§4.2 S3 (13)'s `Destination`): one per entry bearing (the declared bearings, DR3's partners, else S0's drawn bearings; V07
§3.5 seeding 1 and 7), the heart, the mill reservation's attach point and the dockable run's densest point where water
allows, output `destinations`, read by VS4; (d) the **L0 ponds** — the village pond of `pins.pond` (0.4), carved in VS1's
L0 batch with the leat at the lowest hollow within `pins.pondWithinM` (150 m) of the heart, its site on `hinterland.decor`
keyed by the heart. The green's centrepiece pond and the manor's fishponds are **uncarved `pond` parts** drawn in the water
tone, sited after the L0 batch as the moat is (J-V7.13, J-V7.50).

### 3.3 VS2 — the density raster

**The box.** A square around the heart of half-side `max(1.6 · R_major, 150 m)`, clipped to the frame, at
`rasters.densityCm` (4 m) — ≈ 385 × 385 cells (≈ 150 000) at the VILLAGE target, ≈ 195 × 195 at the HAMLET target and
≈ 80 × 80 at a 40-person thorp (the 300 m floor square, 75 × 75, below ≈ 30 people).

**The reference height** (`ref:VG 1.6.9 density elevation band (code)`, re-anchored on the heart): a point
`c = heart + polar(0.5·R_s·S, π·u)` (drawn on `village.density`), `h_c` its ground height, or, when `c` is in water, the
highest shore height within `2·R_s`; `Δh` the height range over the box.

**Per cell x** (every term a cell of `density`, V07 §2.2, or of the climate row):
```
q(x)  = bandWeight · clamp(1 − 2·|h_c − h(x)| ÷ max(Δh, bandMinM), 0, 1)      // the elevation band: villages follow the contour through c
r(x)  = radialPeak · (1 − ρ(x) ÷ (reachShare · R_s))                         // ρ: the distance to the nearest nucleus, anisotropic for street and row
w(x)  = waterTerm · max(0, 1 − d_water(x) ÷ waterReachM)                      // drawn to the water's edge
wp(x) = w_water · pw(x)                                                       // item 111 (b): the water pull, leaning toward reliable water
s(x)  = sunTerm · c_sun · (D(x) − D̄)                                           // item 102, the village reading: the settlement prefers the sunny ground
g(x)  = slopeTerm · max(0, slope(x) − slopeFrom) ÷ slopeFrom                  // steep ground avoided
f(x)  = floodTerm · [x below S1's flood line]                                  // flood ground avoided
n(x)  = epsShare · fbm3(x ÷ 120 m)                                             // controlled chance, on `village.density`
density(x) = smoothstep(clamp(δ · (q + r + w + wp + s + g + f + n − 1), 0, 1)); 0 in water
```
`D(x)` is VS1's `daylight.terrain`, the sunlit share over terrain only (V07 §2.3's sign; bilinear from `rasters.daylightCm`;
nothing built exists yet, so nothing is circular), `D̄` its box mean, and `c_sun` the climate row's sunlight cell (item 111
(c)). `pw(x)` ∈ [0, 1] is §4.2 S3 (6)'s proximity to reliable water — 1 on a river bank, a lake or oasis shore, a spring or
ground of the top well-yield class (S1 (10)), falling linearly to 0 at the climate row's pull radius — and `w_water` the
climate row's water-pull weight (V11; strong in arid rows, weak in temperate, near zero in wet ones); so a dry-country
village crowds along its water (J-V7.134). `bandWeight` (1 at every rung and under `VG`) scales the elevation band (J-V7.139). Under the `VG`
preset `w`, `wp`, `s`, `g`, `f` and `n` are 0, `ρ` is measured from the map centre and the reach is the map's half-width
(VG's closed formula; `ref:VG 1.6.9 density (code)`). With `q = 1` the heart reaches `smoothstep(min(1, 1.5·δ))`: 1 by
default, ≈ 0.84 at the sparse end. With `w_water` 0 and `c_sun` 1 the raster is byte-identical to the raster before item 111
(T-V7-58's no-op clause).

**Bands.** The raster is the village district's density field (§4.5's field type; `FieldBands` with `field: 'density'`,
cuts `[populated, 0.35, 0.7]`, bands `empty`, `scattered`, `close`, `dense`, `source: 'table'`), read by VS3 (the keep test),
VS4 (a road becomes a track below `populated`; the branch spacing), VS6 and S10a (the slot weights), V07 §3.9 (the orchard
chance), V07 §5 (the spotlight) and item 101's density brush (T8 `fill`), whose strokes composite onto it (§7.2). It is not
stored at full resolution: recomputed from the recorded inputs on load (§2.9's rule for fields).


### 3.4 VS3 — the palisade, before the roads

Only when S0 resolved a palisade (or a dossier lists a wall record, V07 §3.11). The construction is VG's (`ref:VG 1.6.9
palisade from the populated lattice (code)`; PART III item 2), restated over the density box. **The strategy's binding**
(§4.12's `EnceinteStrategy.trace`; J-V7.77): `boundary` = the density box (V07 §3.3), over which step 1 lays its lattice;
`gateSites = []` (the gates are VS4's, where roads cross); `reservations` = the mill reservation; `terrain` and `water` as
given; `policy = { waterfront: 'open', placement: 'aroundAll' }`; the density raster is read through the stage's declared
input `village.density` in `ctx`. The result is the planned trace (step 7), committed by VS4.
1. **Lattice.** A `palisade.lattice` × `palisade.lattice` (10 × 10) lattice over the box (step ≈ 0.32·R_s); each point is
   offset within its own cell, on both axes, by `(0.1 + 0.8·B3)` × the step, and survives with chance
   `density(p) − palisade.keepBelow`, on `village.palisade` keyed by the lattice index.
2. **Hull and flattening.** The convex hull of the kept points; the flattest vertex is dropped while its triangle's
   `2·area ÷ (distance between its neighbours)²` is below `palisade.flatten` (0.1).
3. **Smoothing.** A closed interpolating cubic through the hull at 12 samples per span, resampled every `palisade.resampleM`
   (17 m), the last point dropped when within half a step of the first.
4. **Defensible ground** (our extension, off under `VG`): each vertex is pulled up to `palisade.pullM` (10 m) toward the
   highest ground in its normal band, the base's S5a pull in miniature, keeping the vertex order.
5. **Barriers — the barrier closure** (item 106 (a), (b) at village scale; off under `VG`, whose rule is the water cut
   alone: the stretches in water or within `palisade.bandM` of a shore are cut and the open chains take `closure: 'shore'`).
   By default:
   a. *The barriers.* Every shore — the sea, a lake, a pond, a river and a brook alike (a village never fences its own water;
      J-V7.26) — the bank segments of kind `cliff` and `marsh` (§2.3's bank kinds), the terrain runs steeper than the
      defensibility table's cliff threshold over its height (V11 §3.16.1's `walls.barriers` rows, `WallBarrierRow`), and the
      gorge features.
   b. *Reaching the barrier.* With `reach = min(wall.barrierReachM, palisade.barrierReachShare · R_s)` (the base's 150 m cap
      at the VILLAGE target, ≈ 120 m at the HAMLET target, ≈ 50 m at a 40-person thorp), each maximal run of trace vertices
      whose outward normal meets a barrier within `reach` is replaced by a connector from the run's first vertex to its
      nearest barrier point, the barrier's edge from there to the point nearest the run's last vertex, and a connector back —
      so a village in a river bend is enclosed by the bend and fenced across its neck only, and one backed by a scarp or a
      marsh is fenced on its approachable side only. The spare ground between the old trace and the barrier is inside the
      enclosure and the perimeter (VS5 unites the enclosure): VS6 marks every block face there that lies outside the
      pre-reach trace as **reached** (`village.reached`, V07 §2.7; no frontage runs on it); S10's `toft` strategy lays one
      commons-owned `close` plot per reached face, split at `palisade.reachedCloseHa` (1 ha); S12b types its yard parts —
      paddock, orchard or garden by suitability — as item 106 (b)'s intramural gardens at village scale. The reached ground is
      excluded from S10a's quotas and from VS6's capacity check, and VS5's cut of interiors over 2 ha never applies to it
      (J-V7.75).
   c. *Classifying the arcs* by the barrier table's `arcKind` column (V11's `WallBarrierRow`, keyed by J-VI.3's closure-arc
      kinds): every water arc and every arc within `palisade.bandM` of a shore, a sheer cliff and a gorge **close** (no wall);
      a steep slope and deep marsh take a **light** stretch; open ground the **full** section. A non-water closing arc shorter
      than `palisade.minStretchM` between two walled stretches is walled through, so the circuit does not stop and restart for
      a boulder; a water arc is never walled.
   d. *Anchors.* Each walled stretch's two ends anchor on their barriers (§2.7's shore, bank and cliff anchor kinds), with the
      kind's anchor furniture — an end post for `palisade` and `earthwork`, a small tower for `inner` (item 312); the
      enceinte's `closure` is `barrier` when any arc closes, else `ring`.
6. **Kind and section, graded by stretch** (item 106 (c)'s stretch profile at village kinds). The full stretches take the
   kind's section (`palisade.heightCm`, `palisade.section`): `palisade` (timber stakes, 300 cm, 40 cm thick), `earthwork` (a
   bank 4 m wide and 180 cm high with its ditch 3 m wide outside), `inner` (a small stone circuit, 500 cm, 120 cm thick,
   `material: 'stone'` — the one masonry enceinte of a village, J-V7.15). The light stretches take `palisade.lightHeightCm`:
   a wattle fence or dead hedge of 150 cm on a palisade, a low bank of 100 cm without its ditch on an earthwork, a parapet of
   250 cm on a stone circuit. Closing arcs carry nothing. The band `palisade.bandM` (8.5 m) each side of every walled stretch
   is the no-build band every later stage reads.
7. **Planned, then committed.** The trace is data (`village.palisadePlan`) that every tracker reads at every step (V07 §3.5
   step 3); VS4 commits it with the network in one L1 batch as an `Enceinte` of stage 1 (`placement 'aroundAll'`,
   `waterfront 'open'` at every village rung, V07 §3.11's DR2), its gates the crossings VS4 made, split at them. A walled
   stretch that touches no gate after VS4 is kept by default — a stretch between two barriers need not hold a gate, the
   enclosure's gates being where its roads cross (J-V7.27) — and dropped under `VG` (VG's rule). S7 builds the furniture
   (§4.8): a gatehouse across each gate of `through` class, a timber gate elsewhere, and the anchor furniture at every barrier
   anchor. The palisade's "show circuit" control is V09's `LayerSpec.showCircuit` (item 413; V07 §5.1).
8. **Condition, patches and recovery** (item 114, the palisade's part; J-V7.135). Each run of the palisade carries
   `Enceinte.condition` (§2.7: `standing` · `worn` · `patched` · `breached` · `dismantled`, a stretch-state profile, §2.2 rule 5) and
   its run's material — **robust** (the kind's own section, step 6, the light section on a light stretch) or a **patch row**.
   The village kinds' patch rows are `walls.patchMaterials`' (V11 §3.25.3: by wall kind and culture, drawn by weight among
   the rows admitted for the kind and culture, V06 §3.7.7 (3); V11 holds the values): `palisade` — `odd_stakes` (mismatched
   posts driven into the gap), `hurdles` (woven wattle panels lashed between posts), `brush` (a dead hedge of thorn and cut
   brush); `earthwork` — `brush_and_turf` (brush and re-cut turf on the bank's crest, without its ditch), `hurdles`; `inner` —
   V11's masonry rows, as a town wall's. A patch is a condition of a run
   that was breached, never a light stretch: a light stretch is a standing run of the light section graded at generation by
   its ground (step 6), and a breached light stretch is patched by the same rows. **Decay and recovery** follow V06 §3.7's
   transitions with item 114's need and means (V06 §3.7.3 neglect, V06 §3.7.5 repair) — the palisade is an `Enceinte` like any
   ring, and V06's walls step runs over it at every village epoch; nothing here restates them: need decides whether a gap is
   closed, means whether it is closed robust or patched, a patch replaced oldest first when means return, a `dismantled` run a
   gap for good unless a hand edit or a new wall decision rebuilds it. **At generation** with no replay, each run's condition
   is §7.7's readiness-and-wealth derivation row (item 114 (d); a dossier village's `readiness` label and wealth, V08), and
   with item 113's replay the replay's; a request without a dossier reads the row's neutral inputs, every run `standing`.
   Under `VG` every run is `standing` (the parity preset reads no condition). The look is V07 §5.1's; the repair tool's
   material is V07 §4.1's T3 row; the clerk tells each run's story (V07 §4.5).

Fewer than three kept points or a trace that holds no nucleus go to F-V-PAL, a walled stretch whose end finds no barrier to
anchor on to F-V-ANCHOR, and a trace with no gate after VS4 to F-V-GATE (V07 §3.13) — never a rebuild of the map.

### 3.5 VS4 — the tracker-steered network

The registered `NetworkStrategy 'tracker'` (§4.12) grows every road of the village as a **tracker** — a walker that steps,
steers, merges, branches and stops (VG's mechanism, `ref:VG 1.6.9 tracker steering (code)`, restated in metres; PART III
item 3). It reads the density raster, the planned palisade, the mill reservation, S1's crossing sites, VS1's `destinations`
and `lattice` and S2's dwelling count through its stage's declared inputs (V07 §3.0); `enceintes` carries the planned
palisade (§4.12's signature). A tracker is transient state — `{ lineage, class: 'through'|'road'|'track', pos, heading,
target?, water: 'repel'|'attract', length, limit }` — never a record; the ways it lays are records (V07 §2.5).

**The terrain vectors.** At each position, from S1's height raster (bilinear gradient), with `n` the unit surface normal,
`n_h` its level component and `n_z` its upright one: *uphill* and *downhill* are `∓ n_h · n_z²` — weakened where the ground
is steep — and the two *contour* directions are `n_h` rotated by ±90°, at full length. The best-aligned of the four with the
current heading is the terrain vector `t`.

**One step** (`network.stepM`, 3.5 m), for each live tracker in round-robin order (lineage order, one step per round):
1. **Frame.** Leaving the frame stops the tracker (an open crossing is cancelled; a through road's end becomes an `entries`
   row of kind `through`, `neighbour` or `dead_end`).
2. **Water ahead** (the next point wet):
   * a crossing site of S1 (5) whose deck lies within `network.bridgeSnapM` (30 m) of the heading is **taken**: the
     tracker's next points are the deck's two ends, the way lays the span (the `Bridge` becomes `built`, §4.2 S1 (5)), and
     the tracker continues from the far end, heading away from the water, `water: 'repel'`;
   * else, on a brook or stream (width below S1's ford row), a `through` or `road` tracker lays a **ford** straight across,
     perpendicular to the flow, and continues; a `track` fords brooks only;
   * else a `through` tracker sites a deck by F-ROUTE's extra-bridge rung (§5.2) at the crossing point, perpendicular to
     the flow — a ground-part-0 deck by S1 (5)'s rules, never a raised part (the rung gate below); a `road` does so only when
     the far bank's density is at least `populated` and no deck lies within `crossing.minSpacing` (§4.2 S1 (5)) — else it
     stops and records a **landing** (a `Landing`, V07 §2.7; read by seeding step 5);
   * the sea, a lake, a pond and an oasis are never crossed: a `through` tracker steers along the shore (the contour vector
     of the water's edge) for at most `branch.shoreSteerSteps` (20) steps and then goes to F-V-TRACK; others stop and record
     a landing.
3. **The wall.** A closing arc of the planned circuit (V07 §3.4 step 5 c) is no wall: a tracker crosses it freely (it is
   water or a drop, which steps 2 and 5 handle). When a walled stretch crosses the next step: a `through` tracker makes a
   **gate** there, always; a `road` makes one only when the crossing lies at least `max(perimeter ÷ 6, ½π · branchSpacingM)`
   along the trace from every gate so far, else it stops at the wall (VG's rule); a `track` stops.
4. **Merge.** When a laid or pending way point **on ground part 0** lies within `network.lookAheadM` ahead (the tracker's
   own last four steps excepted), the tracker **merges**: its last point is attracted onto that way (§3.6's attraction), the
   previous vertex smoothed, a `T` junction recorded, and it stops. Of a raised way only its two feet are merge points,
   never a point along its ramps or deck; its supports are obstacles and its spans are passed beneath (V07 §3.5a (3)).
5. **Steer.** `v = t · weight[class] + water + pull + push + trace`, where `weight` is `network.weight` (through 0.5, road 1,
   track 2 — a through road holds its line, a track wanders); `water` is the repulsion vector of every water cell within
   `network.waterReachM` (the inverse-distance sum, normalised by the disc's area) times `waterRepel` or `waterAttract`
   (negative: an attraction) by the tracker's mode, applied only while heading toward water; `pull` toward a target —
   `pullThrough · √(d ÷ frameSide)` for a through road, `pullRoad · d ÷ frameMax` for a road with a target; `push` is
   `wallPush` along the trace normal, in the direction of travel, while inside the palisade band, so a road crosses the wall
   squarely; `trace` is item 113's pull onto a ruined way of a former settlement (V07 §3.12a (4); 0 on every map without
   one). A `road` applies `v` only when its component across the heading exceeds `turn` (the rigidness); a `through` road
   and a `track` always apply it. **The grade guard** (our extension, off under `VG`): when the grade along the new heading
   exceeds `rules.grade[class]` (through 10 %, road 14 %, track 20 %), the heading turns toward the nearer contour vector
   until the grade is within it or `grade.maxTurnCdeg` (60°) is turned — a switchback tendency.
6. **Density at the new point.** A `road` below `populated` stops and a `track` continues from it (lineage `…/t`); a `road`
   with no junction within `branchSpacingM ÷ max(density, 0.05)` **branches** and stops: left only, both sides or right only
   with a third each, and a continuation with probability 0.9 after one side, 0.1 after two (all on `village.track` keyed by
   the branch lineage `…/s<k>.L|R`, V07 §2.5; `rules.branch`) — each new tracker a `road` with its parent's opposite water
   mode; a `track` stops when its length passes its limit `branchSpacingM ÷ max(F4, 0.05)` (never below `branchSpacingM`,
   heavy tailed), and when its end lies outside the populated area it is an **approach** — an outlying farmstead's drive (V07
   §3.9). After laying a bridge a tracker's mode is `repel`.

**Seeding, in order** (VG's order, our additions marked):
1. **Through roads** by the topology: `isolated` none; `through` one, from the entry at the entry bearing — VS1's
   `destinations` in their order: the declared bearing, a dossier partner's bearing (V07 §3.11), else `π·u` stretched by the
   aspect — toward the opposite side, its target the opposite frame point (or the second partner's destination); `dead_end`
   one from the heart's populated point out to the entry; `crossroads` a through road plus, at its dry point nearest the
   heart, one or two perpendicular `through` branches (the second along a second partner's bearing when one exists).
2. **The open space** (V07 §3.6), before the through road's side roads.
3. **Side roads of the through road:** its interior vertices in shuffled order (`village.track`), each dry, above
   `populated`, outside the open space and with no junction within `branchSpacingM ÷ density`, branch perpendicular as
   step 6.
4. **Gates** at every crossing of the through road with the planned palisade.
5. **The wharf, its road and its piers** (V07 §3.10's construction, laid here in VS4's batch; J-V7.51) when the water has a
   dockable shore; else a single pier at each recorded `Landing` with no bridge nearby.
6. **The isolated start**, when no tracker exists yet: the open space at the heart if one fits; else two opposite roads along
   one of the four terrain vectors (drawn) plus each perpendicular with probability `½ · density`.
7. **Neighbour roads** (our extension; 0 under `VG`): `neighbourTracks` (V07 §2.2) roads to the neighbouring places, at the
   neighbour `destinations` (the dossier partners' bearings or drawn bearings at least 45° from every through road), each
   routed by S4's router (§4.3) over VS1's `lattice` from the frame inward until it meets the network — `road` class inside
   the perimeter, `track` beyond.
8. **Rounds** until no tracker is live or the stage's work limit (V07 §6) is reached (F-V-TRACK). Before the finish, the feet
   of every raised way on the map are joined to the network (V07 §3.5a (3)).
9. **Finish.** A branch that produced exactly one road and no continuation has its corner cut (the new road's first point
   moved toward its neighbours' midpoint); the palisade is split at its gates; stretches touching no gate are kept (J-V7.27;
   dropped under `VG`). **The empty-road prune** (`vg.emptyRoadPrune`; on under `VG`, off by default, J-V7.74): under `VG` a
   road or track along which no slot will be built is removed — decided here by the density law, a way whose frontage lies
   wholly below `populated` and which reaches no entry, landing, approach or open space; by default our lanes to fields,
   farmsteads and landings stay, since a township's tracks serve the land, not only houses.

**The rung gate on the router** (item 110 (b): generated raised ways "at CITY and METROPOLIS", "A TOWN
gets them only by declaration"; J-V7.90). Every call a village stage makes to S4's router — VS4's neighbour roads (seeding
7), the polyfocal joins, the `row` spine, F-V-TRACK's third rung and a raised way's stub track (V07 §3.5a) — and F-ROUTE's
extra-bridge rung in step 2 pass the **routed rung**, and the router's raised-way gate is closed at THORP, HAMLET and
VILLAGE: no span is priced and no raised part is laid, whatever the drop. A water crossing is a part-0 deck by S1 (5)'s
rules; a dry ravine is detoured by the router's costs and the grade guard (step 5). The gate is the owner's rule, provenance
`owner`: it is no `village.json` cell and cannot be moved by `editTable` or calibration. The village registers no raised-way
generation source (T-V7-46; item 290).

**Plan forms** (our extension over VG's grown form, J-V7.6; each a table row of `forms`, applied to the rules above):
* `street` — the through road is the spine; its side-road spacing × `formRules.streetSideSpacing` (3) within the major
  radius; for each side of the street along its settled length, with probability `formRules.streetBackLane` (0.5), a **back
  lane** parallel to it at the toft-plus-croft depth (the street's spine offset and smoothed, joined to the street at both
  ends by short lanes).
* `green` — the open space is a long green (V07 §3.6) and the through road divides along its two long sides as its rim ways,
  so the houses face the green.
* `nucleated` — a `through` topology becomes `crossroads` with probability `formRules.nucleatedCrossroads` (0.6); branch
  spacing × `formRules.nucleatedBranch` (0.7) within `formRules.nucleatedWithinShareRs · R_s` (0.6).
* `polyfocal` — each nucleus gets its own isolated start (seeding 6) and the nuclei are joined by roads routed by S4's router
  between their open spaces or starts; the through road passes the nucleus nearest its line.
* `row` — `turn` 0; the spine is laid by S4's router over VS1's lattice with a straightness weight of
  `formRules.rowStraightness` (5) along the contour through the heart; no branching within the row's length; back lanes on
  both sides with probability `formRules.rowBackLane` (0.8); equal slots (V07 §3.8).
* `dispersed` — no open space; branch spacing × `formRules.dispersedBranch` (1.5); track limits ×
  `formRules.dispersedTrackLimit` (2); the farm households at approach farmsteads (V07 §3.9).

**Output — one L1 batch** with the palisade's trace and the open spaces: ways of class `through` (7 m), `secondary` (the
village street, 5 m), `lane` (back lanes and joining lanes, 3.5 m), `track` (3 m, `surface: 'dirt'`), `ford`, `bridge`,
`quay`, `pier` (a chief pier with its head where drawn, V07 §3.10a (3)); junctions `T`, `X`, `Y`, `end`, `gate`,
`bridgehead`, `square`; the `entries` and `approaches` of the plan; the `village.landings`. Widths are the village rows of
§4.3's width table (item 292; own, calibratable; VG's roads are 5.6–7 m, its highways wider).

### 3.5a A raised way on a village map (item 110 (b); J-V7.83)

The owner: "i think raised ways for cities is fair for the genertor to generate adn then a user can decide to add or
remove". A village never generates one (the rung gate, V07 §3.5), but a user may add one at any rung, and one generated in
a city epoch stays when the place falls through TOWN below the hand-off band (V07 §3.12; V06 §3.19: a fall below CITY never
removes one). On every derivation and every village epoch the village's own stages lay their ways, plots and fields around
it.

**(1) Sources at village rungs.** Exactly two: a **declaration** — T4 `road` with `raised`, or the aqueduct class, or the
skeleton file's line (V07 §4.1) — and a way **carried down** through the hand-off from a CITY epoch (V07 §3.12). No village
stage and no village phase creates one. No village tool refuses a raised stroke that contradicts no dossier fact and no
lock (item 101 R2; J-VI.4): the rung gate binds only generation (item 290).

**(2) The data key.** `raised` (§4.1's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, its supports and spans by their keys with their `state`, two feet and, for an aqueduct, its channel —
published by the declaration layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an
input (V07 §3.0's table). No village stage writes a part from 1. **A support stands for the village while its `state` is
absent or `ruined`** (a ruined pier is a stump of masonry): such a support is an obstacle ((3)), a stretch the palisade abuts
((4)) and a hole in the faces beneath ((5), (6)); a `cleared` support (taken down in V06 §3.19.2's decline, its stone
credited) is none of these, its ground free at the next derivation.

**(3) VS4 — the trackers around it.**
* **Merging on part 0 only.** The merge test (V07 §3.5 step 4), and S4's router whenever a village stage calls it, read ways
  on ground part 0 only; of a raised way only its two feet may be merged onto.
* **Supports are obstacles.** A support whose `state` is absent or `ruined`, its footprint grown by
  `raised.supportClearM` (1 m), is an obstacle, looked up in a uniform grid index of those supports (cell 10 m). When a
  step would enter one, the heading turns by `raised.turnStepCdeg` (15°) steps — first to the side nearer the tracker's
  target, else to the side of higher density, alternating sides — up
  to `raised.turnMaxCdeg` (60°) either way; failing that the tracker goes to F-V-TRACK's first rung.
* **Under a span.** A tracker passes beneath a span, standing, ruined or cleared, freely: no junction, no crossing record, no
  gate, no stop.
* **The feet.** After the rounds and before the finish, at every derivation, each foot joins the nearest part-0 way vertex
  within `raised.endSnapM` (20 m) as a `T` junction (the vertex attracted onto the foot by §3.6's attraction); with no vertex
  in reach, a stub `track` is routed by S4's router (rung gate closed) from the foot to the nearest way, lineage
  `way:raised/<raised way>/foot<0|1>` (V07 §2.5), reported `W_RAMP_STUB`; failing that, F-V-FOOT (V07 §3.13). The joins and
  stubs are in VS4's L1 batch.
* **No frontage.** A raised way, its ramps included, carries no frontage run (VS6) and is never a way VS5's interior cut
  measures from (V07 §3.7 (1)).

**(4) VS3 — the palisade.** A support whose `state` is absent or `ruined` standing in the planned palisade's band is
taken into the stretch: the stretch abuts its two faces (town walls were built against aqueduct piers); the support is
never moved and never a gate, and a gate VS4 would make within `raised.supportClearM` of it moves along the trace to the
nearest clear point. The trace passes beneath a
span as an ordinary stretch; a raised way crossing the circuit makes no gate (its deck passes over). The barrier closure
never treats a raised way as a barrier.

**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — the deck's footprint grown by
`raised.stripClearM` (2 m) — holds no toft yard part and no building. S10's `toft` strategy lays a frontage slot whose toft
would meet the strip as a **close** by V07 §3.8's close rule (a paddock, orchard or garden, joined to or held by the nearest
built dwelling's household), never raced; VS6's capacity estimate subtracts those slots before F-V-SLOT's rungs; S10a's
quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports whose `state` is absent or `ruined` cut out as holes (§3.6's hole rule). The
perimeter is not changed by a raised way.

**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports whose
`state` is absent or `ruined` as holes (fields under arches are the historical sight); a furlong's strips run through; no
hedge, headland or field line follows a deck; V07 §3.9's outward claim and suitability ignore the deck.

**(7) The spans.** V04's arch-vault source is registered at every village rung (V04 §3.5.4 (d): arch vaults follow their
raised way at every rung; V07 §3.16 (1)); the span rule (§2.7, item 244) decides each span, and its `country` reason keeps a
span over hinterland faces — field, meadow, common, pasture or wood — open at every rung (J-C4). Inside the perimeter the
strip holds no plot, so a vault there is `storage` by V04's chamber row and holds an institution only by declaration. The
street-vault and bridge-vault sources keep their TOWN gate.

**(8) An aqueduct at a village.** Its terminal is a fountain `Pin` or a basin, as its declaration says (a basin by default;
V01 §3.17.8's terminal form); a cistern terminal comes only by declaration (V04 §3.5.4 (e)). VS8's well coverage (V07 §3.10)
counts each delivery point of an aqueduct whose channel is unbroken as a well, so no well is sited within
`pins.wellWithinM` (120 m) of one. When a span is ruined or cleared in the engine's decline (V06 §3.19.2), the channel is
broken, its points stop counting, and the coverage rule sites wells at the next derivation or epoch.

**(9) VS8 and names.** A raised way is never an end anchor: `crossing` reads part-0 bridges and fords only (as V01 §3.4.2 (a)
reads bridgeheads). The name's descriptive tags (V07 §3.10) and the plate's water qualifier (V07 §5.3) read part-0 crossings
only; a raised way's own label is the base's way label and V07 §5.3's landmark word.

**(10) Adding and removing are local** (V07 §4.3's rows).
* **Adding** (T4 `road` with `raised`, or the aqueduct class): the declaration's commit joins its feet to ground vertices by
  the base's rule, and VS4 re-joins them at every later derivation. The dry run re-races the blocks whose raceable slots the
  strip removes — each keeping its recorded quota; a block that can no longer hold its quota passes the shortfall to its
  neighbouring blocks (those sharing a frontage way with it) by largest remainder on their free slots' density, failing that
  F-V-SLOT's rungs — so `N_v` stays exact; it re-cuts the hinterland faces beneath with the support holes, and shows the
  count badge (item 101 R14): "the arches pass over 6 tofts; 4 houses move within their blocks".
* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, V06 §3.19.3's
  suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it
  back". The strip's slots return to the race in their blocks, the faces beneath are re-cut, and V04's vaults under it go in
  the same commit (V04 §3.5.4 (d)).

**(11) Order and determinism.** Every rule above is draw-free — the turns, joins, strip, holes and coverage are pure
functions of `raised` and the recorded inputs — so with no raised part on the map every village stage's output is
byte-identical to the build without this section (T-V7-46, T-V7-52), and with one it is the same on every engine.

### 3.6 The open space — a green or a small square

Placed during VS4 (seeding 2) from S0's resolution (J-V7.17). All draws on `village.open` keyed by the nucleus ordinal.
1. **Size** (`ref:VG 1.6.9 square sized in house widths (code)`): the rim holds `n` of the widest ordinary dwellings, `n`
   uniform in `open.rim` (12–19), so the circumference is `n · maxWidthM` and the radius `r = n · maxWidthM ÷ 2π` (≈ 13–30 m),
   times `clamp(√(P ÷ target), open.scale)` (our extension: a larger village has a larger green).
2. **Centre.** The populated point: from the nucleus, outward along a spiral of random angles whose radius grows ×
   `openShape.spiralGrowth` (1.1) per step from half a cell, skipping water, the densest point seen before the density first
   falls below `populated`. If a through road passes within `openShape.roadWithinR · r` (2 r), the space moves to the through
   road's densest dry vertex and takes its tangent as orientation.
3. **Shape.** A `square`: round with probability `open.round[dry|water]` (0.7 / 0.9) — a regular polygon of one vertex per
   `openShape.vertexM` (≈ 3.5 m) of circumference, randomly turned — else a square of side `2r` resampled every 3.5 m. A
   `green`: a rounded lens `W` wide and `W · lengthRatio` long (`open.green`), `W` drawn in `widthM`, its area at least
   `haPerThousand · P ÷ 1 000` ha, its long axis along the through road (probability `openShape.alongRoad`, 0.7) or across it.
   Either is stretched along the contour by `2^min(1, slope ÷ openShape.slopeStretchAt)` (0.25; VG's stretch restated against
   slope) and turned to the contour direction at its centre, or to the road's tangent when it took one.
4. **Records.** A green is a `Reservation` of kind `green` (item 215; owner `commons`) with its `Greenery` of kind `green`; a
   square is a `plaza` reservation (§2.5). With a market in S2's manifest — a **dossier market record** (a record whose class
   is of V11's `market` profile family, V11 §3.4: at the tiers that reach a village rung `market` (`weekly_market`,
   `market_square`, `periodic_market`), `market_hall` (`fish_market`), `fair_ground` (`annual_fair`) and `slave_market`; or a
   custom record of archetype `mercantile-market`), else the market law `rules.market.law`, (900, 0) → (1 300, 0.2) (its one
   draw a uniform on `village.open` keyed by the first nucleus's ordinal and `market`, compared with the law at the population
   — the same draw at every epoch, V07 §3.12) — the open space (the first nucleus's where there are several) carries the
   principal `market` rank (§4.2 S3 (12)'s rule with the plaza candidate alone: the village's market is its green or square;
   J-V7.17); with no open space the market is a flanking square astride the through road at the heart (the "widened street",
   §4.2 S3 (12)). That reservation is what `dist.market` measures to at village rungs (V07 §2.4; item 576 (b); J-V7.111).
4a. **The market halls' claims** (J-V7.112). A class of the `market-hall` template family that plays itself at a village
   rung and whose rows pull it to the market — a `nearMarket` row (today V11's `market_hall`, for a `fish_market` record) —
   has no S3 claim (S3 is not in the village set, V07 §3.0), so VS4 makes its claim here, on the reservation that carries the
   market: each member's plot area `A_h` is its family's footprint p50 ÷ `claimArea.marketHall.coverage` (0.8), at the band
   of the median household in `bandShares` (V07 §2.2; the claim is cut before the prosperity field exists); the reservation's
   polygon is first scaled about its centre by √((A + ΣA_h) ÷ A), `A` its area after step 3, so the open ground left is the
   size step 1 decided; (7)'s checks run on the grown space; then each claim is cut inside it against its rim — a rectangle of
   area `A_h`, depth `min(√(A_h ÷ claimArea.marketHall.aspect), claimArea.marketHall.depthShareR · r)` (`r` the grown space's
   radius, a green's half-width `W ÷ 2`, a flanking square's half-side), its long side along the rim, centred on the rim
   vertex nearest where the through road meets the space (a second hall at the rim vertex farthest from the first along the
   rim) — a `Reservation` of kind `institution` owned by the member (§4.2 S3's claim form, read at a village rung), laid in
   VS4's L1 batch. S10 lays it as the hall's plot and S10b seats the hall on it claims-first (V07 §3.8), so `nearMarket` 60
   hard holds and no toft slot is taken. Any other `market-hall`-family class that plays itself at a village rung — V11's
   `slave_market`, whose rows pull it toward the harbour or a gate, never the market — takes no claim on the open space: S10b
   seats it claims-first on adjacent slots joined up to the same area `A_h` by S10 (7)'s join law, sited by its own rows, as a
   `cloister`-family class joins slots (V07 §3.8).
4b. **The fair field** (J-V7.111). A `fair_ground` member in S2's manifest (a dossier `annual_fair` record; V11's row: a
   `market` reservation, secondary, extramural, no building) is laid by **VS5** after the perimeter (V07 §3.7 (1)), in its L1
   batch: a rectangle of `market.fairHa` (1.5 ha) with sides in the ratio `market.fairAspect` (2), its long side along the
   through road just outside the perimeter at the through road's perimeter crossing nearest the heart (a neighbour road's
   where there is no through road), on the side of the road with the lower mean slope, clear of water, the mill reservation,
   a raised way's strip and supports and the frame's margin — a `Reservation` of kind `market`, rank `secondary`, owner
   `commons` (output `reservations.fair`). The member binds to it (its row builds nothing). Between fairs it is common
   grazing: S12a claims its face as a `common` face before the outward claim (V07 §3.9 (4)). It is never what `dist.market`
   measures to. Where it cannot be laid, F-V-FAIR (V07 §3.13). At a village epoch the same placement runs in `village.records`
   for a record (the `dossier` step) and in the siting override's step (m) for a roster member (V07 §3.12's *Markets, halls
   and the fair over epochs* (a)).
5. **Centrepiece** (VS8 places it; decided here): none when the shape meets water; else from `open.centrepiece` — a well, a
   large tree, a pond (a small uncarved decoration pond inside the green, V07 §3.2 (8)), a cross, or nothing. Under `VG` a
   tower with probability `openShape.vgTower` 0.1 (round) or 0.5 (square) — a real building, triple height, footprint
   `maxWidthM · (1 + F4) · depthRatio` on a side — else a tree or a well at even odds.
6. **Roads from the rim.** The rim's vertices, shuffled, each dry and with no junction within
   `branchSpacingM · min(1, perimeter ÷ (5 · branchSpacingM)) ÷ density`, start an outward road along the rim normal.
7. **Checks.** The space lies inside the planned palisade and clear of water and the mill reservation, else F-V-OPEN.

### 3.7 VS5 — the perimeter and the one village district

VS5 runs after VS4 and before S7 (V07 §3.0's declared order), so its L1 chain precedes S7's furniture as the base's S6
precedes S7.
1. **The perimeter.** The region where the density is at least `populated`, closed by a `perimeter.closeM` (20 m)
   morphological close and Chaikin-smoothed, united with the palisade's enclosure where one exists and with the open spaces
   and the mill reservation, and clipped to the frame; then **the deep interiors are cut out** (J-V7.53): in each network
   face inside it, the part farther than the modest band's toft-plus-croft centre depth (`toft.toftM + toft.croftM`, 95 m)
   from every way that will carry frontage (`through`, `secondary`, `lane`, and a `track` inside the region, on ground part 0
   — never a raised way, V07 §3.5a (3)) is an interior; an interior of more than `slot.backCloseHa` (2 ha) is removed from the
   region, so it is a hinterland face from the start (the fields inside a ring of village lanes, J-V7.19) — a hole in the
   district's face, which the plat supports (§3.6's hole rule); interiors of the palisade's reached ground are never cut (V07
   §3.4 step 5 b). The result is inserted as L1 chains with the `perimeter` role by the base's same-level splits (§3.3), so
   every network face it crosses is split and nothing outside it is touched.
2. **The district.** The faces inside the perimeter form **one `District` of kind `village`** (PART III item 4; item 214),
   one quarter, `fabric: 'village-ways'`, its `buildingScale` and `fabricParams.depthRatio` from the character (V07 §3.2
   (5)); the faces outside are the hinterland pseudo-district's (§4.9). A second nucleus of a polyfocal village is inside the
   same district — its ends name it (V07 §3.10); the containment invariant building ⊂ plot ⊂ block ⊂ district holds unchanged
   (§5.3).
3. **Prosperity, pass 1.** §4.5's field over the district and its margin, at its 32 m cells, with the village driver rows of
   §4.5's driver table (our own, calibratable): the heart and the open space (+), the through road's frontage (+), high dry
   ground (+), damp and flood ground (−), the palisade's lee (the base's wall driver at 0.3 of its weight), item 102's
   daylight term (× the climate row's sunlight cell) and item 111 (b)'s water term — terrain and the palisade casting, one
   pass, never iterated. The `FieldBands` for prosperity follow §4.5's rule from the village's `bandShares` (V07 §2.2), so
   band capacity and demand agree by construction; pass 2 is S10a's, as in the base (the institution kernels: the church and
   manor up, the smithy and the tannery down).

### 3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot race

**VS6, the fabric** (`FabricStrategy 'village-ways'`, PART III item 3): no block is cut. Every face of the district is a
block. A **frontage run** is laid along each side of every `through`, `secondary` and `lane` way on ground part 0 facing into
the district, along `track` ways inside the perimeter at half weight, and outward along the open space's rim; a run starts
clear of the junction at `the way's half-width + 4 m + minWidthM · B3` (`ref:VG 1.6.9 frontage start (code)`, restated;
`slot.startClearM`). A block face deeper than twice the band's toft-plus-croft depth keeps its interior beyond the crofts as
a **back close** — a `close` plot owned by the commons (grazing garths) of at most `slot.backCloseHa` (2 ha); a larger
interior was cut out by VS5 before any stage allocated it (J-V7.19, J-V7.53). VS6 also marks the palisade's **reached** faces
(V07 §3.4 step 5 b; `village.reached`), which carry no frontage runs.

**VS6's capacity check and top-up** (J-V7.52). VS6 estimates the slot count of every frontage run as its length ÷ the
frontage centre of the band its prosperity (pass 1) reads, and the institutions' slots as the Σ of their templates'
`plotAreaM2` (a claim-sized family's from `rules.claimArea`, a rim-claimed hall's counting 0, since it takes no slot) ÷ the
modest slot's area; when the estimate falls below `N_v` plus the institutions' slots it runs F-V-SLOT's first three rungs
here (V07 §3.13): the band-minimum widths (recorded for S10), track frontage at full weight, then up to `fail.slotTopUp` (3)
**top-up road trackers** from the densest perimeter junctions, grown by VS4's step rules inward only (stopped at the
perimeter chain), committed as VS6's second L1 batch with their frontage runs. The reached ground counts toward neither
side, and the slots whose toft would meet a raised way's under-deck strip are subtracted from the estimate (V07 §3.5a (5)).

**Slots.** Along each run S10 (with the registered `PlotStrategy 'toft'`) lays slots: widths from the band's
`toft.frontageM` at the run's prosperity value (V07 §2.2), jittered by `toft.jitterCv` (0.05 in a `row` village); the slots
abut, as toft rows do; each slot's depth is `toft.toftM + toft.croftM` at its band, clipped by the block's per-frontage
region (§4.7 S10), its rear line following the region's median where two frontages share a block. Each slot is cut
perpendicular to its frontage into **one plot** with two yard parts, the **toft** (the house yard, `toft.toftM` deep) and the
**croft** (the plot's garden-close behind), and a `drive` part where V07 §2.4's class row asks for one. Under `VG` the slot is
VG's house rectangle — width uniform in `[minWidthM, maxWidthM]` (a large one, `maxWidthM · (1 + 3·F4)` wide, with
probability `0.15 ÷ k`, where `k` is 3 plus the number of large houses already laid in this village), depth
`width · (1 + 2(depthRatio − 1)·u)`, set back `offset · (1 + F4)` (offset 7 m on the through road, 5.6 m elsewhere),
advancing by `width + minWidthM · B3` whether built or not, a driveway with probability
`((width − minWidthM) ÷ (maxWidthM − minWidthM))²` — with no croft (`ref:VG 1.6.9 frontage draws (code)`).

**Block quotas (S10a).** The village dwellings `N_v` (V07 §3.2 (3)) and the institutions are allocated to blocks (reached
faces excluded) in proportion to `Σ_slots density(slot midpoint) · m` over their raceable slots (the slots under a raised
way's strip, V07 §3.5a (5), and the deck plots of V07 §3.10a excluded), with `m` = `slot.rimMultiplier` (2) on the open
space's rim, else 1 (VG's multipliers), by largest remainder, ties by block address, recorded in each block's `Allocation`;
so re-selecting one block never moves another block's count (§6.3; J-V7.8).

**The slot race (S10b).** Institutions first, claims-first (§4.7 S10b): each class is placed by the one solver with its
V07 §2.4 row — its profile, relation rows, coverage, supply links and spacing — joining adjacent slots up to its template's
plot area (S10 (7)'s join law) and taking them out of the race; a class whose template family's plot is "the claim's" reads
`rules.claimArea` (V07 §2.2a; J-V7.112): a `cloister`-family class joins slots up to its band's `claimArea.cloister` area, a
`market-hall`-family class with a `nearMarket` row takes its claim at the market's rim (V07 §3.6 (4a)) and no slot, and any
other `market-hall`-family class (`slave_market`) joins slots up to `A_h` (V07 §3.6 (4a)'s area), sited by its own rows.
Their order is item 105 (f)'s, read at village rungs: the dossier's and the author's claims; the **anchors** (the mill seat's
reservation from VS1, the open space, the entries, the wharf and the chief landing, and S12a's resource sites in the
hinterland — the wood edge, the clay pits, the shore); the field-driving classes (the church and the manor, whose kernels
drive prosperity's pass 2); then the source-oriented classes by depth from their resources (charcoal pit, wood yard, potter,
tannery), the balanced ones (the smithy) and the market-oriented ones (bakehouse, alehouse, inn, shop) — ties by class id,
then member ordinal. One bounded relaxation pass (item 105 (f); at most the base's cap of 2, on `alloc.block`) re-scores the
two-way classes inside the district's allocation; at village rungs it moves an institution only between slots not yet
raced. Then, in each block, each remaining slot `i` draws `u_i` on `village.slot` keyed by its lineage and gets the key
`k_i = −ln(u_i) ÷ max(10⁻⁶, density_i^p · m_i · h_i)`, `p` = `race.densityPower` (V07 §2.2a; 1 by default, the plain
density) and `h_i` = `refound.foundationSlot` on a slot over a ruined building's footprint of a former settlement (V07
§3.12a (5)), else 1; the block's remaining quota of dwellings goes to the smallest keys — a draw without replacement
weighted by density, which is VG's accept-with-probability-density look at an exact count (`ref:VG 1.6.9 frontage accepted
with the local density (code)`; J-V7.8). The dwellings then take their households by S10b's generation fill with the
village class mix (item 71's rows at village rungs, our own): squalid → `v.hovel` on the squalid toft row; poor →
`v.cottage` 0.7, `v.hovel` 0.2, `v.longhouse` 0.1; modest → `v.cottage` 0.5, `v.farmstead` 0.3, `v.longhouse` 0.2;
comfortable → `v.farmstead` 0.7, `v.cottage` 0.3; prosperous → `v.yeoman_house` 0.5, `v.farmstead` 0.5; rich →
`v.yeoman_house` (the manor comes only by its own row); `v.longhouse` weights × `cultureForms`' longhouse factor (V07 §2.4).
Among otherwise equal slots the larger classes take the sunnier (item 102 (d); the solver's preference). Every unbuilt slot
becomes a **close**: joined to the built toft beside it on the same run with probability `slot.closeJoin` (0.5; a larger
holding), else its own `close` plot held by the nearest built dwelling's household, its yard part a paddock, orchard or
garden by that household's band (V07 §2.3); with the request's `orchards` false, no orchard parts (V07 §2.7).

**The grandeur ceiling at village rungs** (item 115, the village's part; J-V7.136). Prosperity in a small place shows as
quality, never grandeur: larger plots and ranges within each class's own row, more outbuildings, better roofs and
materials. The rung ceiling table (§10.2's ceiling shape, V11's rows; §4.7 S10b's rung ceiling on the class mix, the "all
manors" rule scoped to TOWN and above) reads at the village rungs: **THORP and HAMLET** — every dwelling's composition at
most `single`, `L` or `T` (no `H`, `U`, court, tower or turret; V02's composition rows cap it in the resolution chain), and no
manor-class dwelling unless specified; **VILLAGE** — at most one manor house, only with a lord (a `seigneurial`
government) or when specified, the manor alone taking the grand arrangements; every other dwelling at most `L` or `T`. So
the rich band's class mix stays `v.yeoman_house` (never a manor), and a yeoman house or farmstead at the rich anchor is its
capped row's rich anchor. **Wealth** (DR6, V07 §3.11) still shifts `bandShares` toward the rich band, but a band only moves a
dwelling along its capped row, and the manor count never rises with wealth: `v.manor_house` is `sing` with its presence law
read under the ceiling (V07 §2.4's row: at THORP and HAMLET 0, at VILLAGE its `gov seigneurial` law, else 0) — the ceiling is
rung-stepped by the owner's rule, the one step at a rung boundary this volume's anchor law admits beside the raster sizes
(J-V7.47 kept for every other cell). **"Unless specified"** (item 115 (c)): a manor or other grand building the dossier
specifies (V08 §3.16 (3)'s reading; DR11's forced seat among its cases) or one the author places or reshapes by hand (T6
`place`, V07 §4.1) keeps its full design: the ceiling is a default, never a refusal (item 101 R2), and the clerk says the
building exceeds the tier's usual (V07 §4.5). Across a hand-off the ceiling follows V07 §3.12.

**The moated manor.** When the manor row's moated-site draw (`manor.moatChance` 0.25 with water within `manor.moatWaterM`
150 m, on `siteplan` keyed by the plot) succeeds, S11 lays two yard parts: a `platform` holding the hall and its chamber
block, and a `moat` ring `manor.moatWidthM` (5–8 m) wide around it, crossed by one `drive` part at the gate — drawn in the
water tone, filled from the nearby stream in the story but not a carved water body (no L0 batch after S10; J-V7.13). The
`platform` part is the manor's levelled unit on a slope (V07 §3.8a (1)).

**Wells, closes and drives** are the only non-building contents a toft adds; the rest of each site plan is S11's with the
village template rows (V07 §2.4). **Capacity.** VS6's check (above) has already run F-V-SLOT's first three rungs; when the
laid slots still cannot hold `N_v` dwellings and the institutions, S10a and S10b run its last two (the doubled share to the
templates' `households.max`, then the report — never a drop); a surplus of slots is closes by construction.

### 3.8a Levelling and retaining walls at village rungs (item 110 (a); J-V7.84 – J-V7.89)

Item 110 (a)'s units — a plot, a block, a ward — are each the wrong size in a village: a toft-and-croft plot runs up to
380 m deep (V07 §2.2), a block is a whole face between lanes (VS6: every face is a block), and the ward is the one `village`
district. Levelling any of them would terrace a yeoman's croft, flatten the ground between two lanes, or — by the
district-edge source — wall a hill village's perimeter. A medieval hillside village levelled its **house platforms** and let
its crofts and fields follow the ground. S11 levels after the site plan (the footprints must exist first) and before the
heights are set, so the heights read the levelled ground.
1. **The levelled unit is the house platform.** For each built plot: the union of its building footprints (S11's site plan)
   grown by `terrace.apronM` (4 m) and clipped to the plot's toft yard part; for the manor, its `platform` yard part where
   the moat draw laid one, else as a dwelling; for an institution, the yard part holding its buildings (the churchyard part
   excluded). A least-squares plane is fitted to at most `terrace.fitSamples` (12) samples of the base's refined 2.5 m raster
   (the platform's outline vertices, simplified to at most 8, and 4 interior points on the diagonals at ⅓ and ⅔). When
   `terrace.enabled` holds and the plane's gradient exceeds `terrace.slopeMin` (a share, rise ÷ run; V11's TOWN value by
   reference, V07 §2.2a), the platform is **levelled**: its datum is the mean of its samples — the spoil of the upslope cut
   filling the downslope side (J-V7.84) — published as levelled ground through the base's S10/S11 levelling output (§4.7,
   item 309), which the ground datum (§2.6's `deriveBase`), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read.
   Below the threshold the platform follows the ground and the base's plinth and skirt carry the fall.
2. **The walls.** Along each levelled platform's edge the step `|datum − natural ground|` is sampled every
   `terrace.edgeSampleM` (2.5 m); each maximal interval whose step exceeds `terrace.stepMinCm` (V11's, by reference) is one
   generated `RetainingWall` (keyed per V07 §2.5), its step profile the sampled steps, its high side the platform on a fill
   edge (datum above the ground) and the natural ground on a cut edge (datum below it) — so a platform on a slope has a cut
   face upslope and a revetment downslope; its material the base's `RetainingWall` material row at the geology (dry stone by
   the village row, V11). A step above `terrace.stepMaxCm` (V11's) splits the platform along the contour into two levels,
   each levelled at its own datum, the footprints split with it by the base's stepped-wing rule; a level shallower than
   `terrace.minDepthM` (V11's `minTerraceDepthM`) is not levelled — the whole platform keeps the base's skirt and stepped
   wings. Two adjoining platforms share one wall on their common edge (V07 §2.5's owner rule), its step the difference of
   their datums. **No wall on a cliff** (§4.7 S10's hard-line rule, J-A110.43, read at the village rungs): an interval of a
   platform's edge that runs along a bank of kind `cliff`, a closure arc of kind `cliff` or `sheer` (§4.4) or a cliff inside
   the district (§4.7) takes no `RetainingWall`, whatever its step — the cliff face holds the ground; the platform, clipped to
   its toft, keeps the cliff setback S10's regions keep (§4.2 S1 (8)'s `cliff` row; §4.7), so no platform is levelled across
   a cliff.
3. **What generation never levels at village rungs**: the croft; a close (paddock, orchard or garden, a reached close
   included); the reached ground; the green; the churchyard part; the pound; the charcoal pit; the under-deck strip of a
   raised way; and every hinterland face. The author may level any of them with T2 `ground`'s terrace stroke or T3 `wall`
   `retaining` (V07 §4.1).
4. **The longhouse is exempt** (J-V7.86). Its platform is never levelled: the base's skirt and stepped wings carry the fall,
   so its hard rule (V07 §2.4) reads the natural ground and the byre end stays downslope, draining as it was built to.
5. **No district-edge source for this fabric** (J-V7.85). Item 110 (a)'s terraced-district edge source never applies to a
   district whose `fabric` is `village-ways`, at any rung — the village district, and the old core after a hand-off up (V07
   §3.12) — since its perimeter is a density contour, not the edge of a levelled ward. The rule is keyed by the fabric, not
   by the rung or the district kind, so it holds across both hand-offs. The hook is `FabricStrategy.levelledUnits` (item
   506): the bent cut returns item 110 (a)'s blocks, plots and wards and declares its terraced edges; `village-ways` returns
   the house platforms and declares none.
6. **Access across a platform wall — stairs and ramps** (J-V7.88). A dwelling stands at the front of its toft (V07 §3.8), so
   on a slope its platform's cut or fill edge often runs along the frontage, the houses standing above or below the lane
   behind a revetment. Where a platform wall separates the main door from the frontage, S11 lays the path from the frontage
   to the door as a `stair` yard part when the step there exceeds `terrace.stairFromCm` (60 cm), else as a `ramp` yard part;
   and the class's `drive` part, where V07 §2.4's row asks for one, as a `ramp` yard part of grade at most
   `rules.grade.track` (20 %), laid along the wall inside the toft yard (a dog-leg) when a straight ramp would be steeper.
   Failing both, F-V-TERRACE (V07 §3.13). `stair` and `ramp` are yard-part kinds added as data rows (V07 §2.3).
7. **The village way-class crossing rule** (item 110 (a)'s way-class rule read at village classes; its threshold
   `terrace.stairFromCm`). Where a way crosses a retaining wall — a drawn wall, a terrace stroke's edge, or a shrunk town's
   standing wall — `through`, `secondary` and `track` cross as ramps only, within `rules.grade` (they carry carts); `lane` and
   `path` cross as a stair where the step exceeds `terrace.stairFromCm`, else as a ramp. Never a gap in the wall. The house
   platforms' own walls stand inside tofts and are crossed only by the plots' accesses (6).
8. **Order, locality and determinism.** The levelling is S11's, per plot, draw-free; the walls and yard parts are plot-level
   writes, never L1, so the village writer order (V07 §3.0, item 283) and T-V7-3's writer check hold. A re-derivation of one
   plot re-levels that plot and the wall it shares with a neighbour, nothing else.
9. **Decline** (V07 §3.12; J-V7.89). A generated wall re-derives with its terrain only while its platform's dwelling stands
   short of `cleared`; after that it is kept and decays by stretch, so a deserted hillside village keeps its scarps.

With `heart.slopeMax` 0.1 and VS2's slope term from 0.15, platforms are levelled mainly in hilly and mountainous villages,
as they should be. Field terraces and strip lynchets are not generated (J-V7.87): a field terrace is the author's T2
`ground` terrace stroke.


### 3.9 S12a and the hinterland unit at village rungs — fields, meadow, commons, woods, outlying farms

The hinterland is §4.9's — S12a decides with the demand, the hinterland unit draws after the settlement, its faces the L2
blocks outside the perimeter — with the village's rows and the three presets it registers (§4.9; item 315).

**(1) The land budget.** The farm table's village rows (§4.9's `FarmTable` at the village rungs; own, calibratable): arable
1.2 ha per head including fallow (`arableHaPerCapita`), meadow 0.15 (`meadowHaPerCapita`), pasture and commons 0.6
(`pastureHaPerCapita`), fuel 1.0 m³ per head and year against coppice at 4 m³ per ha and year (0.25 ha), timber 0.15 m³
against 2 m³ per ha (0.075 ha) — the base's fuel and
timber law at its own defaults, so the village and the town read one table. **The area per head** `a` is their sum, 2.275
ha, derived when the tables load and never stored: V07 §3.2 (1)'s territory reads it, so an `editTable` of a farm row
moves the territory with it (the former stored 2.3 ha retired, the territory 1.1 % smaller; the farm rows unchanged; V12's
register holds the farm rows as the calibratable cells). `extent: 'demand'` at village rungs (the territory is sized to the
demand, V07 §3.2 (1), so the fields fill it; the frame's remainder is wildwood and waste); the request's `arableFactor`
multiplies the arable demand (absent 1). The `VG` preset instead claims VG's field area — `vg.fieldM2PerDwelling` (490 m²)
per dwelling × the request's `arableFactor` (the mapped farmland 4, uncultivated 0; `ref:VG 1.6.9 field area per house
(code)`) — whose land is decorative, not fed (J-V7.12); and under `VG` two of the reference's field rules hold as preset
cells: a field that would hold more than one house is discarded (`vg.fieldOneHouse`), and a field overlapped by exactly one
house becomes an orchard (`vg.orchardOnHouse`), unless the request's `orchards` is false.

**(2) Suitability and the outward claim.** Each hinterland face gets a suitability per use (rule rows, soft, our own):
arable = fertile × (1 − slope ÷ `fields.arableSlope`)₊ × dry × √D × (1 − dist ÷ `fields.arableDistM`)₊; meadow = [below the
flood line] × damp × near water; pasture and commons = open ground, rising with slope, distance and poor soil; wood = slope ≥
`fields.woodSlope` or low D or the frame's wood propensity, rising with distance, × 2 under the request's `forest: 'many'`;
orchard = ring 1 beside the tofts × D (0 when `orchards` is false). `D` is item 102's daylight share at `rasters.daylightCm`
over terrain, × the climate row's sunlight cell (the woods take the shaded north-facing slopes and the fields and orchards
the sunny ones — the village reading of item 102; weight `fields.woodShade` 0.3, soft). Uses claim faces **outward** from
the perimeter in `fields.claimBandM` (100 m) distance bands (VG's outward claim, re-derived for a perimeter, as §4.9 does),
within a band by suitability then face address: an oasis's irrigated gardens first where the oasis lies outside the
perimeter (§4.9), then arable to its demand, meadow to its demand on flood ground, pasture and commons, coppice, managed
wood; the rest wildwood (and waste above the tree line or on rock). Faces beneath a raised way are claimed as any other, the
standing supports (V07 §3.5a (2)) cut out as holes (V07 §3.5a (6)). **The request's forest** (`forest`): `many` doubles the
wood claim, `some` leaves it, `grove` reverses it (the woods only in the ring nearest the perimeter, the far bands open
ground). Under `VG` the woods
follow `vg.forestMode` — `fill` (the remaining land wooded), `patches` (random patches) or `grove` — with trees cleared within
`vg.clearHouseM` (7 m) of a house and `vg.clearWayM` (5 m) of a way; their crowns are drawn on the `render.instances` stream
and re-rolled by T12 `dress`'s New trees (`rerollLayer('render.instances')`, town-wide and display only; §6.1, §7.1; V09 §4.5).

**(3) The field system** (S0's draw, V07 §3.1 (6), weighted by `rules.fields.factor`, V07 §2.2a). Inside the arable:
* **`open_field`** (the default at VILLAGE): the arable is divided into `G` **great fields** — `fields.greatFields` (3), or
  `fields.twoFields` (2) when the era row or poor land says — as angular sectors around the heart bounded by the roads out,
  rebalanced by moving whole faces between neighbouring sectors until each holds `arable ÷ G` ± `fields.tolerance` (25 %);
  each great field is a `VillageField` of kind `great_field` with its rotation slot (winter grain, spring crop, fallow —
  §4.9's three-field rows read per great field at village rungs); the hinterland unit cuts each into **furlongs** of
  `fields.furlongHa` (2–8 ha), bounded by contours and field tracks; each furlong's `furrowAxisCdeg` runs downslope where the
  slope exceeds `fields.furrowSlope` (2 %) and otherwise perpendicular to its access way; **headlands** — L3 `path` faces
  `fields.headlandM` (5 m) wide — run along the furlong ends; the **strips** are render-time segmentation along the furrow
  axis at `fields.stripM` (10 m; `stripRangeM` 5–20 m by the era row), as §4.9's strips are. No hedges: the balks are drawn,
  not modelled.
* **`enclosed`**: §4.9's enclosed fields (hedged, 1–5 ha), with the outlying farmsteads by their fields.
* **`infield_outfield`**: the arable within `fields.infieldM` (400 m) of the perimeter (about a third) is the **infield**,
  cropped every year (`rotation.scheme 'continuous'`), the rest the **outfield**, cropped in slot 0 of a
  `fields.outfieldCycle` (five-year) cycle and grazed otherwise; the hill ground is common grazing. Two `VillageField`s
  (`infield`, `outfield`).
* **`forest_strip`** (with a `row` or `street` form only): each toft on the spine continues as one strip of its own width
  running perpendicular to the street, **from its croft's rear line** (the croft untouched, so the switch changes nothing
  inside the perimeter, T-V7-17) to the wood edge or the territory's back line (at most `fields.stripMaxM`, 1.5 km): the
  hinterland unit cuts the strips by extending each plot's side lines as field lines (L3), each strip a `VillageField` of
  kind `strip_holding` whose `holder` is its toft's plot — read by the clerk ("this strip belongs to the third toft on the
  street"), the GeoJSON `village_fields` layer (`holder`) and V07 §3.12's desertion, which returns a deserted toft's strip to
  the common; the wood lies beyond; no outlying farms.
* **`vg_sector`** and **`mfcg_belt`**: §4.9's two recorded sector constructions (P17, P18), unchanged.

**(4) Meadow, commons and woods.** The meadow faces along the water form a `meadow` field; the pasture and commons form one
or more `common` fields (a common per `fields.commonPerHa` 200 ha, split along roads); coppice and managed wood form `wood`
fields. The green is the village's inner common (its `Greenery` is commons-owned). The fair field (V07 §3.6 (4b)), where
laid, is claimed as a `common` face before the outward claim and joins the nearest `common` field.

**(5) Outlying farmsteads.** Their count is `N_o = ⌈H_o ÷ householdsPerFarmstead⌉` (V07 §3.2 (3); §4.9's `FarmTable`; the mode
by form, item 314), housing the `H_o` outlying households: sited first at the approaches' ends (VS4; VG's farmsteads at the
ends of its trails, `ref:VG 1.6.9 farmstead at the approach end (code)`), facing along the track, then by §4.9's farmstead
score on fertile land near a track; each an outside plot with its drive (§4.9). Where a field face overruns an approach
(VG's trail repair), the approach is cut at the field edge and its farmstead moved there, facing the edge (`ref:VG 1.6.9
trail repair (code)`).

**(6) Decorations** (§4.9's table, village rows, our own; values `rules.manor`, V07 §2.2a): fishponds by a manor
(`manor.fishpond` 0.5, within `manor.fishpondM` 300 m; uncarved `pond` parts, V07 §3.2 (8)), a warren of pillow mounds on a
common (`manor.warren` 0.2, with a manor), boundary stones where roads cross the territory frame, a wayside cross per
through road, a gallows hill on a through road at the frame (`manor.gallows`, VILLAGE 0.1, seigneurial government only).

### 3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names

**The wharf, landings and piers — VS4's seeding step 5** (`ref:VG 1.6.9 wharf and piers (code)`, restated in metres; laid
in VS4's one L1 batch, since no L1 write may follow S9 — the pier count reads S2's dwelling count `N`, known before the
network, not the built dwellings; J-V7.51). A wharf exists only on navigable water — a coast, an island's sea, an estuary, a
river — with a **dockable run**: the longest shore run whose points are all at or above `populated` and which contains the
densest shore point. The **shallow width** `s` is 14 m + √(0.7 · (w − 14 m) · 1 m) on a river of width `w` (14 m below that
width), `28 m · (1 + F4)` on a coast or estuary, `20 m · (1.5 + B3)` on a lake; the pier length `L = s · 1.5^S`; a river
takes no wharf when `L > w ÷ 2`. The **wharf** — a `quay` way following the dockable run, smoothed by two corner-cutting
passes and resampled near `L · (1 + F4)`, with the stretch within one step of a bridge end removed — is laid with its road
inland from its densest vertex, and `1 + ⌊√(5 · N ÷ (4 · L ÷ 0.7 m)) + u⌋` **piers** (`pier` ways of length `L` along the
outward normal, at wharf vertices where the point `1.5·L` out is water, no pier crosses another and no bridge end is within
`s`), the wharf trimmed from a random end (never its densest vertex) to that count. Without a wharf, every `Landing`
recorded, with no bridge nearby, takes a single pier `s · (1 − ½F4)` long when that fits the river's maximum. A `v.landing`
class (V07 §2.4) is placed at the wharf or the busiest landing by S10b's row. Draws on `village.slot` keyed by the wharf's
lineage. The chief pier's head, when drawn, is laid with it (V07 §3.10a (3)).

**VS8 — ends.** A village is one district; its **ends** are its named parts (J-V7.20). Anchors, in this order: each open
space (`green`), the church (`church`), the manor (`manor`), the mill (`mill`), each part-0 bridge or ford (`crossing`; a
raised way is never an anchor, V07 §3.5a (9)), each through-road entry within the perimeter (`entry`), the wharf or chief
landing (`wharf`), each nucleus after the first (`nucleus`), each dossier naming claim not yet matched (`claim`, V07 §3.11),
and each **declared** end (V07 §4.2). The plots whose centroid lies inside a declared end's lasso join it whatever their
nearest anchor; every other plot of the district joins the anchor nearest to it by walking distance along the ways; a
derived anchor with fewer than `ends.minPlots` (6) plots merges into its nearest neighbour's end; the derived ends are
capped at `1 + ⌊households ÷ 25⌋`, at most 6 (`rules.ends`; 1 at 40 people, 2 at 200, 6 from about 563), the smallest merged
first. **Declared ends are exempt from the merge and the cap** (item 101 R13: declared means held; J-V7.71) — the cap counts
derived ends only. An end's plots are derived (V07 §2.3), its outline for labels and exports the union of its plots' faces.
**An end is never assigned to a trade** (item 107 (e)): its anchors are places, never classes; a trade or chain names an
end only by the dossier (a quarter record's claim, or a QUARTER ladder record, which claims the end holding most of its
members and owns those members, V07 §2.4's third table), by the author's `declareEnd` (V07 §4.2), or by item 72's
quarter-identity threshold crossed in that end — whose per-hectare scaling a village's few hectares rarely reach.

**VS8 — pins and decorations** (on `pin.centrepiece` and `pin.decor`, keyed by host; values `rules.pins`): the open
space's centrepiece (V07 §3.6 (5)); **wells** by the coverage row (one per `pins.wellPerHouseholds` (8) households within
`pins.wellWithinM` (120 m) of their dwellings, tightened on an arid climate row by the climate row's well-coverage factor
and sited with extra weight on the top well-yield ground (item 111 (b), §4.7 S10b); an unbroken aqueduct's delivery point
counts as a well, V07 §3.5a (8)), on the green, at junctions or in yards, a **pump** instead from the era row's pump date;
the **moot place** under chartered or council government (a large tree or a cross on the green beside the reeve's house); a
**cross** at a crossroads inside the perimeter (`pins.cross` 0.4); **stocks** near the church or on the green (`pins.stocks`,
(200, 0) → (700, 0.5); item 255); a **maypole** on a green (`pins.maypole` 0.2); a **shrine** at the perimeter on a road
(`pins.shrine` 0.3; a dossier's Roadside Shrine forces it); **troughs** at wells on through roads (`pins.trough` 0.3); on an
open space that carries the market (V07 §3.6 (4)), **stalls** — `stall` pins, one per `stalls.perHouseholds` (40) households,
at least `stalls.min` (3), along the rim facing the ways (a street market's, where an epoch gave a market to a village with
no open space, along the through road's frontage nearest the heart, V07 §3.12 (d)) — where the village's crafts sell.

**A pin record forces its pin** (J-V7.127). The rows above run first; then a `@pin:<kind>` record (V11 §3.11) binds to a
standing pin of its kind within `presence.siteReachM` of the frame's centre that no other record binds, nearest the heart
first, and where none remains it is given **one pin of that kind** in VS8's batch, drawn on `pin.decor` keyed by the
record's binding key (the pin's provenance names the record, which forced it), and binds to it. A `shrine` is placed as the
shrine row places it (at the perimeter on a road). A `market_cross` stands at the centre of the reservation that carries
the market (the open space, or the flanking square; V07 §3.6 (4)), replacing the centrepiece V07 §3.6 (5) drew there, or
standing where none was drawn — at an epoch or an absorb the cross replaces only an engine-placed centrepiece no one holds
(tombstoned in that batch, a listed fate) and otherwise stands beside it at the reservation's centre; with no such
reservation — an epoch's street market (V07 §3.12 (d)) — it stands on the through road's frontage nearest the heart,
beside the stalls. A `well` record (`water_source`) binds to the coverage wells, as `multiple_water_sources` binds its
members (V07 §2.4's third table), this rule giving a well only where none stands. The churchyard `cross` of a wayside
shrine merged into a parish church (V07 §2.4's REPLACEMENT row) is laid in the parish church's `churchyard` yard part, at
its point nearest the church's door, whatever other crosses stand, and the shrine record binds it — save after a promotion
receipt, when the cross is laid for the promoted record with no binding row and the record's one key binds the church (V08
§3.5.1 (d); J-V8.114), such a cross being a pin its record forced, tombstoned by `remove` with it (J-V7.130); no shrine is
placed at the edge for that record. The same rule runs in `village.records` for a record added at a village epoch or an
absorb, and for a pin-record lesser whose REPLACEMENT greater arrives (V07 §3.12 *Records at a village epoch* item 4).

These rows are **the village's whole furniture** (J-V7.118): at the rungs whose `RungProfile.frameLaw` is `territory`,
S11's furniture step (§4.7 *Furniture pins*: the centrepieces, the gate plazas' pins, the blocks' decoration rows, the
singletons, the campfires and the market stalls by rank) places no pin (item 579), so the open space carries only VS8's
centrepiece and stalls, the fair field (V07 §3.6 (4b)) carries none (common grazing between fairs; a fair's booths are the
fair's own and never drawn), and no village stage and no furniture step places a statue, fountain, bandstand or monument at
a village rung; a handed-down town's standing pins stay as standing fabric (V07 §3.12). S11's light rows (item 68) are not
that step and run unchanged (V07 §5.1's night). At a village epoch these rows run through the participant `village.pins`
(V07 §3.12 *Pins over epochs*).

**Names** (S13a, §10.4; `naming`; the rows are V11 §3.20.1's `naming.settlement` village features, `naming.villageEnd` and
`naming.field`): the village's name from our own grammar rows with our own descriptive tags — the water type (an oasis
included), the form, the relief, the rung, a palisade, a part-0 bridge or ford, a wood — so the name describes the map (the
idea of descriptive tags feeding names is VG's; its grammar and word lists are never used, §17.1); each end's name by its
kind's pattern rows (a church end, a mill end, the town's end at an entry, a green side, a wick for a nucleus — our rows);
lane names at VILLAGE for the lanes an anchor gives (a mill lane, a church lane, a back lane); each great field by its
bearing from the heart, each common and wood by its use and place. A dossier's names are protected (DR14).

### 3.10a Deck plots at village rungs (item 110 (d); J-V7.91)

Item 110 (d) lets a mole, a pier, a quay platform or a bridge deck carry plots, "with a `deck` size budget (small, light, a
table row)". Village jetties and bridges rarely carried buildings, and the reference's piers are bare plank piers
(`research/findings/profile-village.md`'s pier addendum); so at village rungs generation makes one kind of deck plot only —
a widened pier head with the landing's net store — and every other is the author's.
1. **Eligible decks** are VS4's `pier` ways and part-0 `bridge` decks. The wharf is a shore `quay` way on land (V07 §3.10),
   not a quay platform, and carries no deck plot; a raised deck carries none (V02's J-V2.71).
2. **Widths** (item 292; own, calibratable): `pier` 2.5 m (a plank pier), `quay` 5 m, a bridge's deck its carried way's
   width + 2 × `deck.parapetM` (1 m in all), a `ford` its carried way's width. A deck face is buildable where (the deck's
   width − its way's width) ÷ its sides reaches V11 §3.24.4's `minPlotDepthM` for its kind (the `deck` row, read by kind) —
   so no default pier or bridge qualifies; only a pier head, whose whole face lies beyond its way's end and so is as deep as
   the head is long (`deck.headM`), or a deck the author widens (`setAttr` of its width, V07 §4.2), carries a plot.
3. **The pier head** — the one deck plot generation makes. When S2's roster holds a `v.landing` (V07 §2.4), the chief pier
   (the pier nearest the wharf's densest vertex, else the single landing pier) ends in a head platform of `deck.headM` (8 m
   along the pier × 6 m wide) with probability `deck.headChance`, the `PLaw` (200, 0) → (700, 0.3) → (1 500, 0.5), drawn on
   `village.slot` keyed by the pier's lineage (`<pier>/head`, V07 §2.5) and laid in VS4's L1 batch with the pier, within the
   pier's length. S10 lays the head's one deck plot by the base's deck-plot rule (item 110 (d)), owned by the landing's
   institution, and S10b stands the landing's net store (else its boat shed) on it as a structure of the landing's compound,
   composed by V02's `@deck` rows through `DeckContext` within the deck budget.
4. **Uses.** At village rungs a deck plot takes no dwelling. V11's `deckOk` is read with the village reading (J-V7.41): a
   store, a net shed or a boat shed; a toll house or a chapel only by the author's or a dossier's record. Deck plots stand
   outside S10a's quotas and VS6's capacity, so `N_v`, the race and T-V7-2 are unchanged with the deck rows on or off.
5. **Containment.** VS5's perimeter unites the deck faces of the piers and bridges that have a foot (an end on land) inside
   it, so the one `village` district holds them and building ⊂ plot ⊂ block ⊂ district holds (§5.3); a deck face outside (a
   bridge on a neighbour road) belongs to the hinterland pseudo-district.
6. **Lifecycle.** A deck plot falls with its deck by least disruption (V07 §3.12's decline of decks; V06's flood), and a
   rebuilt deck re-offers it (V07 §2.6).
7. **Under `VG`** `deck.headChance` is 0 (V07 §3.15).

### 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and how

**Routing.** The village package registers its `ProductDecl` (V07 §2.1; range `[1, 1 500)`), which the one port consults
through `LadderRouter` (§1.1; item 202): a dossier whose population lies in that range — every SettlementForge thorp (8–60),
hamlet (61–400) and village (401–900) and every town from 901 to 1 499 (the mapping's population census,
`research/sf/mapping.md`: 70 of 70 small dossiers and 5 of 38 towns in the surveyed 155) — is created on the village rows,
and the port stops refusing it. The rung follows the population (DR23); the dossier's own tier word titles the map (§9.5): a
1 105-person SettlementForge town is drawn by the village product on the VILLAGE rung and titled a town.

**What a small dossier holds** (`research/sf/dossier-outputs.md` §3.4, §6): one population integer; a tier word; 7–42
institution records, one of them a housing record with a count range (4–16, 17–80 or 80–180 dwellings); a government name
(an elder or household council, a feudal stewardship, an elected reeve); a terrain word, an access word, deposit keys; a
wall record in 6–8 of 20 dossiers per tier (`hasWalls` and `hasGates` together); 0–2 quarters with fixed location phrases
(Religious Quarter, Alehouse & Common, Fishing Landing, Woodcutters' Ground, Roadside Shrine; the small towns' Market
Quarter); 0–4 landmark strings; culture, wealth and power records; no port institution below the town tier; no coordinate of
anything. Every gap is derived by our rules (items 20 (h), 22).

**The derivation rows at village rungs** (§7.7's DR table read with the village's values; only what differs from the base's
rows is stated; the row sets are V08 §2.6's):
* **DR1 site.** `plains` → the water draw with the coast, island and estuary weights 0; `riverside` → a brook, stream or
  river by the water row's flowing weights (renormalised), course-first (V07 §3.2 (2)); `coastal` → a coast; `hills` → the
  `hilly` relief row; `mountain` → `mountainous` and a pass when `defended_pass` is listed; `forest` → the forest toggle,
  woods × 2 in V07 §3.9's claim and `forest_strip` and `infield_outfield` × 2; `desert` → the arid row: S0's
  water weights re-weighted by V07 §3.1 (1) (each type at its class's arid chance — a brook, stream, river, pond or coast all
  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`) applies V08 §2.6b (3)'s rule at the village rung (V07 §3.1 (1)). `site.culture` → `cultureForms` (V07 §2.2)
  and the longhouse factor.
* **DR2 walls.** A wall record → the palisade stage runs and its chance draw is skipped; its kind from the record's words:
  `Palisade` alone → `palisade`; "Palisade or earthworks" (the small dossiers' other wall record) leaves the choice open, so
  it is drawn from `palisade.kinds` restricted to `palisade` and `earthwork` and renormalised, on `blueprint.features`,
  recorded in `autoResolved`; a record naming a bank and ditch → `earthwork`; a record naming stone, "Town walls" or "City
  walls and gates" (a small town's greater ladder tiers, V07 §2.4's third table) → `inner`. No wall record → no palisade
  (walls exactly when the dossier lists one, DR2's bar). The palisade's generation-time condition is §7.7's item-114 row
  (the dossier's `readiness` label and wealth; V07 §3.4 (8)). **The waterfront** (item 106 (d) at village rungs) is `open`
  whatever the threats: a village's palisade never fences its water (V07 §3.4 step 5); a **sea threat** — any key of
  `PortValues.threats` (V08's `threats` row: `naval`, `hostileSeaPartner`, `seaMonster`; `exposedPort` never fires below
  20 000 people) — raises the `v.watchtower` row's chance to 1 and sites it at the wharf or chief landing instead of a gate —
  a lookout, not a sea wall (J-V7.28) — and no harbour-mouth chain is built (a village has no harbour basin). The access word
  → the road topology: `road` → `through`; `crossroads` → `crossroads`; `river` → `through` along the river with a landing
  (and a wharf when the water is navigable); `port` → `through` with a wharf; `isolated` → `isolated`; `none` → `dead_end`;
  `mountain_pass` → `through` along the pass. An unwalled village's "gates" are its road entries (V08 §2.6's `access` row).
* **DR3 partners.** A `road` partner's bearing is a through road's or neighbour road's entry bearing (V07 §3.5 seeding 1, 7).
* **DR5 districts → ends.** One district. Each quarter claims an **end** by §7.7 item 16's naming claim, anchored as its
  phrase says: Religious Quarter → the church end; Alehouse & Common ("Village centre") → the green end with the alehouse on
  the green; Fishing Landing ("At the water's edge") → the wharf end with the `v.landing`; Woodcutters' Ground ("At the
  forest edge") → an end at the wood edge with the `v.wood_yard`; Roadside Shrine ("At the settlement edge") → a shrine at
  the perimeter on a road, and its name on that end when houses stand there; Market Quarter ("Central") → the open space's
  end, which carries the market; Noxious Trades Quarter → the downstream end with the tannery; Government Quarter → the
  manor's or reeve's end; Artisan Quarter → the smithy's end; Waterfront District → the wharf end; Shadows District → the
  lowest-value end; Mages' Quarter → an end apart (`far` from the heart); **Wealthy Residential** ("High ground, good
  views") → a `claim` end on the plots of highest mean prosperity (pass 1), on the high ground, its band bias applied to that
  end's plots only, never to the one district (a one-district village would otherwise shift its whole wealth); **Common
  Residential** ("Spread throughout") → no end and no bias (the village is its common residence) (J-V7.59). A claim with no
  anchor makes a `claim` anchor at the claimed class's place (V07 §3.10). **The Religious Quarter's east phrase** ("Eastern
  district (traditional)"), the one compass statement a small dossier makes: the parish church's siting gains the base's soft
  east row at its low weight (§7.7 item 16's quarter row, `tables/dossier/quarters`), so the church end tends east of the
  heart — a placeholder the owner may drop (J80 Q5), with which T-V7-13's east clause lapses.
* **DR6 wealth.** `wealth.label` → `intent.wealthLevel` (V08's `wealth` row) shifts `bandShares` as §4.2 S2 shifts the
  base's; the bar (the population-weighted mean band within one band of the label's) holds at village rungs. A band moves a
  dwelling only along its capped row, and the manor count never rises with wealth (item 115; V07 §3.8's ceiling).
* **DR7 households** (J-V7.55). `H₀ = round(P ÷ meanSize)`; with the housing record's range `[min, max]`:
  1. **Too few households** (`H₀ < min`): `H = min(min, max(1, ⌊P ÷ household.minSize⌋))` — the mean household size falls to
     `P ÷ H`, never below `household.minSize` (1.5 persons) — and `N = min`, one household a dwelling; when `H < min` the
     `min − H` surplus dwellings are built **vacant** and reported (`W_VACANT_TO_RANGE`; a village in decline is the
     historical reading). A 10-person thorp with the thorp record's range 4–16: `H₀ = 2`, `H = 4`, `N = 4`, sizes 3, 3, 2, 2.
  2. **Otherwise** `H = H₀` and `N_raw = Σ_b round(H_b ÷ (1 + share2_b))`. If `N_raw > max`, the doubling is re-solved band by
     band from the poorest up, at most two households a dwelling, only until `N = max`; if even full doubling leaves
     `⌈H ÷ 2⌉ > max`, the household size rises instead (`H = 2 · max`), reported. If `N_raw < min`, the doubling is undone
     band by band from the richest doubling band down until `N = min` (reachable, since `H ≥ min`).
  3. **The members sum to `P` exactly**: each household gets `⌊P ÷ H⌋` persons and the remainder goes one each to the
     households in address order (largest remainder over equal shares).
  `N = N_v + N_o` (V07 §3.2 (3)) — the outlying farmsteads count as dwellings of the settlement — so the residential building
  count lies inside the record's range (DR7's bar) and every household is housed once.
* **DR9 and DR24 institutions → classes** (J-V7.56). DR24's class rule (item 12; V11's catalogue rows) gives each record's
  class or pseudo-class; at a village rung it resolves in this order, the first that applies deciding:
  1. **a pseudo-class** goes to its reader and builds nothing of its own (V11 §3.11): `@office` binds to its seat's building —
     at a village rung the `villageSeat` member's, a religious office the parish church's (V07 §3.2 (3)); `@seat` to the
     government row's `villageSeat` (V11 §3.21.1); `@pin:<kind>` to VS8's pins, forcing its pin where none stands (V07
     §3.10); `@landuse:<kind>` to V07 §3.9's claim; `@housing` to DR7; `@wall` to DR2; `@layer:*` to the layer toggles;
     `@none` to the gazetteer only; `@absent:<class>[+<class>]` to S2 — each named class's `min` and per-capita demand 0
     unless another record names one, and at a village rung each named class read through its `villageForm` (V11 §3.22):
     `@absent:church` (`access_to_parish_church`, tiers T and H) zeroes `v.parish_church` — its presence entries and its
     members — and with it the classes keyed on a parish church, `v.parsonage` (its `×1 v.parish_church`) and `v.tithe_barn`
     (its `with v.parish_church`), while `v.chapel`'s `without v.parish_church` entry stands (a chapel of ease served a
     parish whose church was a neighbour's); `@absent:watermill+windmill` zeroes `v.watermill` and `v.windmill` (J-V7.103) —
     never to the fallback, so a `priest_resident` binds to the parish church and a `village_musician` stays a gazetteer
     entry;
  2. **a class with a `villageForm`** (V11 §3.22) is substituted by the `v.` class that plays it;
  3. **a class with its own row** plays itself — allowed at any rung once a dossier names it (a `pawnshop`, a
     `smugglers_store`);
  4. **only a kind that fell to V11's `generic-<family>` class** takes the **tag fallback** (our rows); the port's one
     `unmapped_kind` note names the class the fallback gives (V08 §4.6), and no second report is written: `religious` →
     `v.parish_church` from 400 people, else `v.chapel`; `market` → the open space's market (V07 §3.6 (4)); `lodging` →
     `v.inn` on a through road, else `v.alehouse`; `food` with a keyword `brewer`, `brewery` (family `food-works`), `tavern` or
     `alehouse` (family `lodging`) in the record's name (a drink) → `v.alehouse` (any other `food` record goes on down this
     list); `metalwork` → `v.smithy`; a keyword of family `food` with the key `mill` in the name → `v.watermill`, else
     `v.windmill`; `law_enforcement` or `defense` → `v.watchtower`; `civic` or `legal` → `v.reeve_house`; `healing` → V11's
     `healer` class, playing itself on a toft slot (its `dwelling-row` template read as V07 §2.4's dwelling plot); `leather`
     with `industry` → `v.tannery`; `port`, or a keyword of family `port` in the name → `v.landing`; a keyword of family
     `timber-yard` in the name → `v.wood_yard`; a keyword of family `industry` with the key `kiln` in the name → `v.potter`;
     else the generic class itself. Every keyword is a row of V11 §3.13.2's keyword table (`dossier.keywords`), matched whole
     on the case-folded name as that table states, so the fallback reads one table (J-V7.106).
  **The burial records** (J-V7.57): a `cemetery`-class record (`burial_ground` at tiers T and H, `graveyard` at V; V11's
  rows) is seated as the parish church's **churchyard** when a church stands, its yard part enlarged to V11 §3.6.1's
  `burial-ground` family plot area at the church plot's band (the churchyard part grown by S10 (7)'s join law over the
  adjacent slots until it holds that area, the church's own template unchanged; J-V7.100); else as its own `cemetery` plot at
  the settlement's edge on a road (S10b; `use: 'cemetery'`), with a `v.chapel` only where a religious record also asks for
  one. The seat carries the record's binding key and is a burial face (V07 §2.4) — the face the town's catacomb rule reads
  after a hand-off up (V07 §3.12 step 6; J111: catacombs lie only under cemeteries). A `parish_burial_grounds` record (tier W;
  every small SettlementForge town carries one) reads V11 §3.12's COUNT: one member per standing `v.parish_church`'s
  `churchyard` part, each bound `#k` and a burial face, none enlarged; a `cemetery` plot at the settlement's edge only where
  no church stands (J-V7.107).
  **The external mill**: `access_to_external_mill` (`@absent:watermill+windmill`, V11 §3.11) suppresses S2's mill demand —
  neither a watermill nor a windmill — and makes milling an import through the entry store (below), reported (J-V7.58).
  A count range clamps the class's count; a singular record is placed once (DR9's bars). The housing record assigns nothing
  (DR7).
* **DR11 seats.** `Feudal Stewardship` (seigneurial) → the `v.manor_house` as the seat; an elder, household or free elder
  council or an elected reeve (chartered commune; V08 §2.6's `government` row set) → the `v.reeve_house` and the moot place;
  ecclesiastical → the `v.parsonage` beside the church — the `@seat` binding being V11 §3.21.1's `GovernmentRow.villageSeat`.
  A dossier's government (or an `@seat` record) forces its `villageSeat` class present with at least one member (V07 §2.4's
  forced seats) at every village rung, whatever its presence entries and whatever an `@absent:` record zeroes (J-V7.104,
  J-V7.113) — so a crown village has its manor house and a merchant-oligarchy village its reeve's house, and a
  `lord_s_reeve` or `village_headman` record always finds its seat; a forced manor is "specified" under item 115's ceiling
  (V07 §3.8).
* **DR16–DR18.** The hidden share is 0 and a clandestine record takes the front mode (PART III). The underground at village
  rungs: caverns and ruins by the site (item 109 (j) (1); V07 §3.16) with access by dig, well, opening, a dug passage or a
  mine breach, and scattered dwellings only after access; no sewer network, undercity, catacomb, quarry, vaults or buried
  town (their TOWN gates, item 109 (j) (1), (k) (1)) — save a shrunk town's standing systems in maintenance mode (V07 §3.12)
  and a dossier catacomb fact, which is V04's charnel vault (V07 §2.4); an author's dug passage (item 66) as everywhere;
  informal clusters appear only under a migration condition (tents at the perimeter; V08 §2.6's `conditions` row set), the
  squalid band otherwise living in hovels at the green's or common's edge (V07 §3.12's encroachment).
* **DR19 deposits.** V08's `deposits` rows open their land uses in V07 §3.9's claim; `river_mills` forces a `v.watermill`
  when a mill seat exists; `grazing_land` doubles the commons' share; `managed_forest` doubles the coppice. The mining
  deposits (iron, precious metals, gemstones, coal, copper) raise the cavern chance by `cavern.mineBoost` and make a mining
  class's working a breach candidate (V07 §3.16 (4)); `ancient_ruins`, `magical_node` and the ley-line income rows are ruin
  sources (V07 §3.16 (1); V08's ruin and magic rows).
* **Landmark strings** (V08's `landmarks` row, the village-product rows): `Alehouse` → the alehouse use's name; `Common well`
  → the green's well pin; `Net mending post` → a `net_rack` yard part of the landing; `Drying racks` → `drying_rack` yard parts
  of the landing; `Beaching ground` → the named beach (V07 §2.3); `Timber stacks` → a `timber_stack` yard part of the wood
  yard; `Tool shed` → a named outbuilding in a farmstead; `Charcoal pit` → the charcoal pit's name.
* **DR9 with item 108 — ladder records.** A record whose name carries a count range, or a ladder qualifier ("(multiple)",
  "(guild)", "(district)", "(established)"), or whose kind is a greater tier of a ladder pair, is read by its step type (V11's
  step-type table; V08 parses the qualifier): COUNT → that many members of the member class keyed `#k`, their count S2's
  per-capita rows at `P` clamped into the range (V07 §2.4's third table for an unnumbered one), spaced by the class's
  same-kind row; QUARTER → an end claimed and owning its members (V07 §3.10); GUILD → one `guildhall` plus the trade's
  members, its hall bound into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further
  hall; a GUILD record of another family, or with no COUNT record of its family in the dossier, keeps its own hall; SIZE → one
  larger building by the class's template; REPLACEMENT → the greater only. Where a greater and a lesser of one ladder both
  arrive (a custom kind, an event adding the lesser, a stale record) the lesser becomes a member of the greater's collective,
  and the roster's own per-capita members of that class **are** the record's members (item 108 (c)): no double count. A
  small-town dossier's count-range records (8–10 in a town's records, `research/sf/dossier-outputs.md` §3.4) are the common
  case at the VILLAGE rung's top. A `town_watch` record's member (V11's `guard_post`, played by `v.watchtower` through its
  village form) carries the assignment's own soft row (`Assignment.criteria`, the base's `PlacementCriteria`; id `pc/…`, as
  DR2's sea-threat row): `near` → `open:green`, `open:square` 80 soft 0.8 — the watch's yard by the green.
* **Supply chains (item 105 (i)).** The dossier's `activeChains[]` (0–4 in a thorp, 2–9 in a hamlet, 6–13 in a village,
  `research/sf/dossier-outputs.md` §3.4) become links between the bound members through V08's chain row: each processor name
  resolves by kind family to the village class that plays it (DR24 with `villageForm`); a chain whose processor is absent
  from the map binds nothing and is reported, never invents a building (the dossier is the truth of what exists; DR9 places
  what it lists); an `impaired` or `vulnerable` chain's links weaken by V11 §3.7.4's `chainStatus` weights, keyed by V08's
  neutral status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls, served by the **entry store**.
* **The entry store** (imports and exports at village scale). A village has no warehouse district: the store is a `store` use
  (§2.7's `Use`, assigned by S10b, never a new building) on the plot that faces the partner — the inn on the through road's
  entry at the partner's bearing (DR3) when there is one (the carriers' inn); else the wharf's or chief landing's `v.landing`
  for water trade; else the farmstead nearest that entry, whose barn holds it (J-V7.29). Its pulls are item 104 (b)'s and 105
  (i)'s; the clerk names it ("the carriers' store at the inn").
* **Item 104 at village rungs.** A custom institution resolves its profile by item 104's order, its archetype read through V11
  §3.13.2's `village` cells (V07 §2.4); an **active custom chain** is placed as one connected thing (item 104 (h)) by V11
  §3.13.4's rules (`siting.custom`), read through the village's context (item 576 (b)): its resource at its terrain feature in
  the hinterland (`resourceSite`; V07 §3.9's claim reserves the face), its first processor by the resource or on the road
  toward it (`firstProcessor`, outside the perimeter when it emits a nuisance), its later processors each a step nearer the
  village's centre of trade and its final seller by it (`stepInward` and `finalSeller`, reading `dist.market`: the market's
  open space, else the first nucleus's, else the heart; J-V7.111); a compatible chain sits close at street scale
  (`compatible`, item 104 (h) (3) as revised by item 107) and names the end it stands in only when item 72's quarter-identity
  threshold is crossed there or the dossier or the author declares it (a chain is never assigned an end); an incompatible
  one stretches along its road; its imports and exports pass the entry store (`endpointStore`'s village reading).

**The absorb half at village rungs.** Every later dossier change is the base's absorb (§7.7, V08): an added institution is
placed first by `village.records` — a market, claim-sized or pin record by V07 §3.12's *Records at a village epoch*, at an
epoch in its `dossier` step and without one in the absorb's commit (item 202; J-V7.125, J-V7.128) — and otherwise by a
`dossier` request to S10b on the current map; a removed one closes its use and is then handed to `village.records`' `remove`
for the fair field's reservation and the pins it forced or bound (V07 §3.12 *Records at a village epoch*); a population
change moves the epoch's target (V07 §3.12); a new wall record builds a palisade by `drawWall` in its derived form (the VS3
construction over the current density and the barrier closure, gates where the ways cross it); a changed access word adds or
retires a through road's classification (never its geometry); an added or changed supply chain re-derives the links it names
(links are never stored, item 105 (a)); and a ladder step — a promotion or a demotion carried by the record's `promotedFrom` /
`demotedFrom` receipt — changes the members by item 108 (d)'s least disruption: an upgrade keeps the standing building as
member #1 and places the rest — save a REPLACEMENT whose greater is a new thing, placed by V07 §3.12 *Records at a village
epoch* item 4 (V08 §3.5.1 (d)); a demotion keeps the member nearest its demand and vacates the rest by fate (item 17).
**The palisade's REPLACEMENT** ("Palisade or earthworks" → "Town walls"): when at least `ladders.replaceShare` (80 %) of the
standing dwellings lie inside the palisade's enclosure, the wall is **rebuilt on the palisade's trace** — `setAttr` of the
enceinte's kind to `inner`, `material: 'stone'`, its full stretches taking the stone section and its light ones the parapet
(item 106 (c)), gates kept, every run `standing` and robust (a patched run rebuilt in stone) — the least disruptive reading,
and the historical one where a stone wall replaced a timber circuit on its line; otherwise the town wall is a new ring by the
base's later-ring rule, anchoring on the barriers and on the palisade (item 106 (f)), and the palisade is `supersededBy` the
new ring and decays by the persistence rows (J-V7.32). The `town_walls` record's key binds the rebuilt enceinte, else the new
ring, with the palisade's key as its alias — after a `promotedFrom` receipt the record's one key is re-pointed to that
enceinte and no alias is written (V08 §3.5.1 (d)); the superseded palisade keeps no binding.


### 3.12 Over time — the village's epochs, desertion, and the ladder hand-off in both directions

**Which path runs.** An epoch's product and rung are the fold's of V07 §2.1 (§4.11 *The rung at an epoch* and *The product
at an epoch*, items 322 and 317; V06 §3.1 (3)–(4)), never the target's own rung (the hand-off band: a village passes to the
town product only at 1 575 and back only below 1 425; J-V7.68); with the village product registered the engine's target
clamp admits [0, 120 000] (V06 §3.1 (4)). While the fold gives the village product the epoch runs the village's phases; the
base product, the base's. **The village's registration** — the values of V06 §2.1's `ProductDeclEpoch` members on
`ProductDecl('village')` (V07 §2.1; item 202), each participant's step, order, stage and scope V06 §3.2's tables':
* `phases` — the village's `siting` and `growth` (*Village siting* and *Village growth phase* below), which the runner takes
  in place of the engine's at a village rung (item 317);
* `participants` — `village.plan` (stage `VS1`: it re-runs VS1's plan read, at `afterField`, so the plan exists before the
  siting phase reads it), `village.density` (stage `VS2`: VS2's density raster on the old core's recorded inputs, while a
  superseded `VillagePlan` stands, under any product, so a re-derived old core runs the village fabric; J-V7.67) and
  `village.pins` (stage `VS8`: *Pins over epochs* below; J-V7.126), each run at every epoch and acting only where its scope
  admits (V06 §2.1; J-V6.124); their draws key by those stages (§6.1) on the concerns V07 §3.14 names, and their table reads
  are VS1's, VS2's and VS8's (V11 §3.1 row 61's readers, recorded by T-V11-1 (b)); no stage id or concern is added (V06
  §2.1's `EpochParticipant.stage`, V06 §3.16; J-V7.122);
* `rows` — `village.json`'s `epoch.rows` cell (V07 §2.2), typed V06 §2.1's `ProductEpochRows`: the decline step's
  persistence multipliers and way ops and the hinterland step's slack, order and per-epoch cap (V06 §3.5.2, V06 §3.5.3);
* `records` — `village.records`, stage `S10b` (*Records at a village epoch* below; J-V7.125, J-V7.129, J-V7.130).

Every other step of V06 §3.2's order (V06 §3.1 (4); the participants at their steps) is the engine's — the field step with
item 102's building shade mask (V06 §3.4) among them — reading the village's `epoch.rows` cell where it states a village row
and otherwise unchanged. **Before M6-E** the base's `grow-by-stage` path takes the same two overrides, its dossier step (e)
calls `village.records` as the engine's does, and the participants run on M4's grow path — all at the call points item 202
adds to §4.11's order (a)–(j), at the places V06 §3.2's table gives the same steps, with the `ProductEpochContext` the grow
path fills (V06 §2.1); on that path the extension V06's E1 adds is absent — the siting override's tier (0) reads an empty
pool and step (m)'s roster joins take the base's churn cap (§4.11 *Churn*) — and what the path cannot run before M6-E is
V07 §8's risk (10) (J-V7.132). No stored flag decides (V07 §2.1): a village that grew into a town runs the base's path, a
town that shrank into a village the village's.

**Village siting** (the regrowth-first order of §4.11, tiers (0)–(5) unchanged, then the village's tiers; every placement
in them, a house platform's rebuild included, follows V06 §3.8.2's placement rule — a placement on a toft whose access edge
is a hollow way is made only after `reopenWay` restores it, with any hollow way on its path to the ways in use, in the same
batch; the decline's disuse test below is unchanged; every new building at a village rung follows V07 §3.8's grandeur
ceiling). The override **opens with a named step before tier (0)** (J-V7.125):
* **(m) the market members** — the manifest's `fair_ground` members and its `market-hall`-family members with a `nearMarket`
  row at the epoch's target, less the standing ones (the count V06 §3.9.1 makes and V06 §3.9.6 leaves to this step: a member
  of a standing record's collective that the target adds, V06 §3.9.1 (2)), in class then member-key order, each placed by
  *Markets, halls and the fair over epochs* (a) or (b) below in this step's batch; a `fair_ground` member held on the
  market's reservation by F-V-FAIR's last rung counts as not standing, so its field is tried again at each epoch (reported
  only when its rung changes); then the market law's crossing ((d)). Tier (0) then reads the ledger's pool as V06 §3.8
  states;
* **(6v) infill** — the closes of the district, by the slot race's keys recomputed on the current density (a close whose
  toft is vacant first): a close becomes a toft again with a dwelling (`build`), the density bands permitting;
* **(7v) encroachment** — the poorest band's residual households take **encroachment cottages** on the edge of the green or
  a common: a strip `toft.toftM` deep is cut from the green's or common's edge facing a way (a `densify … infill` on the
  commons' face, §4.11's operator) and hovels built on it on the squalid toft row — the squatters of the waste (J-V7.21); a
  green loses at most `epoch.encroachShareMax` (0.25) of its area over its life;
* **(8v) extension** — the rest grows the network: new road trackers from the perimeter's junctions and road ends in
  descending density (VS4's rules, lineage `…/e<epoch>.k`, the palisade consulted), their frontage runs laid by VS6's rules
  and their slots raced for the residual; the perimeter re-derived (VS5 (1)) around the new tofts, the fair field's face cut
  out as a hole ((e) below); a new end when a new anchor qualifies (V07 §3.10); every building these tiers add over a cavern
  or ruin draws for an access (V07 §3.16 (7));
* **(9v) a new nucleus** — when the residual exceeds `epoch.newNucleusShare · N` in one epoch, a second nucleus is sited by
  VS1's score, spaced by the polyfocal rule (V07 §3.2 (4): at least `max(polyfocal.spacingMinM, polyfocal.spacingShareRs ·
  R_s)` from the existing ones, the 250 m floor holding at epochs as at creation), and grown as a polyfocal nucleus (the
  village turns polyfocal).
The density these tiers read is the epoch's: a spring or oasis V06 marks failing weakens its water pull (item 111 (b); V06),
so infill and extension lean away from a failing water as they leaned toward it.

**Village growth phase.** No S5 stage runs at a village rung: `growth` is (6v)–(9v) above; the palisade stays unless the
fortification phase rules (a village never gains a ring at an epoch — a dossier wall record does it, V07 §3.11).

**Markets, halls and the fair over epochs** (J-V7.116, J-V7.125). Neither the base's *Markets over epochs* claim (§4.11)
nor an S5 stage runs at a village rung, so the village places its market members itself, each in the epoch it arrives: a
**record** through `village.records` in the `dossier` step (*Records at a village epoch*, below), a **roster member** — a
member of a standing record's collective that the target adds (V06 §3.9.1 (2)) — in the `uses` step when it is claim-sized
((c); V06 §3.9.6) and in step (m) otherwise; each op in the epoch's record (replayed with it) — a roster member's and the
law's ops undone by the epoch's undo record where the epoch is an undo target, a record's never (an epoch that carries a
dossier event is no undo target, §7.4; the host restores, item 87):
* **(a) The fair field.** A `fair_ground` member arriving at a village epoch is laid by V07 §3.6 (4b)'s placement over the
  hinterland faces by the through road's perimeter crossing nearest the heart, with F-V-FAIR's ladder (V07 §3.13); each face
  it takes that is not already common is turned to the `commons` land use by `retypeLand` in the same batch, and leaves its
  `VillageField` as the hand-off up's clear regions do (step 4 below): a `setAttr` of the field's `furlongs` in that batch,
  the face joining no field (the fair field is labelled as itself, V07 §5.3), a field left without a furlong tombstoned in
  that batch (V07 §2.6). It is never claimed by S7b. A removed record's reservation is tombstoned by `village.records`'
  `remove`; its faces stay `commons`, left to V06 §3.5.3's hinterland ladder.
* **(b) A market hall.** A `market-hall`-family member with a `nearMarket` row (V07 §3.6 (4a)) arriving at a village epoch
  takes V07 §3.6 (4a)'s claim cut from the rim of the open space that carries the market **without growing the space** (no
  standing toft moves for a hall; a hall encroaching its market place is the historical reading), its area counted against
  the open space's `epoch.encroachShareMax` as (7v)'s encroachment is. Where that share is spent, the hall takes the vacant
  plots of the rim's frontage runs within its `nearMarket` reach (a vacant building, a cleared trace or no building) joined up
  to `A_h` by S10 (7)'s join law (V06 §3.8.4's `amalgamate` form: neighbours fixed, never across a retaining wall); where none
  can be joined, a dossier record's hall takes the rim claim beyond the share, reported `W_ENCROACH_OVER_CAP` (the record is a
  fact), and a roster member waits in its class's deficit for the next epoch, reported. **The ops**: in that batch the claim
  is laid as the hall's plot by S10's claim form, the hall is built on it by S11 (a `build` — at an epoch its Works scheduled
  by V06 §3.13; on an absorb without an epoch it stands finished in the absorb's commit, as V08 §3.6 (6) applies an element
  event) and its use opened by `openUse` — cause `dossier` with the record's assignment for a record, its entities (the plot,
  the building, the use) minted as the base mints a post-build placement's, from the adding dossier event's `seq` and their
  ordinal in the placement's ops (§6.3; §7.7 item 6, J-A22.76; J-V7.129); cause `demand` for a roster member, minted (§6.3)
  as V06 §3.9.6 mints an opening (the town root as derivation unit, the placing phase's stage id, the epoch and its ordinal
  in that phase's opening order); the joined-plots form does the same on the joined plot (the `amalgamate` first, then the
  `build` and the `openUse`) — a record's joins being its dossier event's disruption, charged to no churn cap, bounded by the
  request kind's `DisruptionBudgetRow` and reported over budget, never refused (§7.7 item 5; V06 §3.9.6, J-V6.123), a roster
  member's charged to the district's `geometry` cap (V06 §3.9.6).
* **(c) A claim-sized opening.** A `cloister`-family member, or a `market-hall`-family member without a `nearMarket` row
  (`slave_market`; V07 §3.6 (4a)), opening at a village epoch takes a candidate plot only with its vacant neighbours joined by
  the same law up to its area — `claimArea.cloister` at its band, or `A_h` — by V06 §3.9.6's *Claim-sized classes at a village
  rung*: **a roster member in the `uses` step; a record through `village.records` in the `dossier` step**, the ops those of
  (b) on the joined plot. With no candidate joinable to that area it takes an **outside plot** of that area, cut by
  `village.outsidePlot` (`@plat/village`; called by V06 §3.9.6 for a roster member and by `village.records` for a record): the
  hinterland unit's S10 in its incremental form (neighbours fixed) cuts the plot on the nearest hinterland face adjoining a
  road beyond the perimeter (§4.9's outside plots; friaries settled at the edge, V11's `monastery` row), the face's remnant
  kept under its land use (the plot's part leaving its `VillageField`'s `furlongs` as (a) states), S11 builds on it (a
  `build` — at an epoch its Works scheduled by V06 §3.13; on an absorb without an epoch it stands finished in the absorb's
  commit) and `openUse` opens its use (the cause, the mint and the joins' charge of (b)). Else a roster member waits in its
  class's deficit for the next epoch, reported; a record never waits — its last rung is the base's `dossier` request's
  closest option, reported as the base's F-SITING with the rows it fails (§5.2; J-A20.71).
* **(d) The market rank.** A dossier market record (V07 §3.6 (4)) arriving at a village epoch, or the market law crossing —
  V07 §3.6 (4)'s one draw compared with `market.law` at each epoch's target, so the market appears once the law passes the
  draw and never vanishes by the law — sets the principal `market` rank on the open space (the first nucleus's) by `setAttr`
  in that batch — a record's in `village.records`' batch, the law's crossing in step (m)'s — as the hand-off up's step 3 does.
  With no open space the market is a street market at the heart: no reservation is cut from standing tofts, `dist.market`
  measures to the heart (item 576 (b)'s last fallback), and `village.pins` brings its stalls to VS8's count along the through
  road's frontage nearest the heart (*Pins over epochs*, below). A market closes only as the base's *Markets over epochs*
  says (its square kept; its stalls removed by `village.pins`).
* **(e) Extramural stays extramural.** (8v)'s perimeter re-derivation cuts the fair field's face out as a hole, as V07 §3.7
  (1) cuts a deep interior, so the field stays an extramural common.
* **(f) At the hand-off up** the fair field is a standing secondary `market` reservation: the grow path's clear regions keep
  it (step 4 below), and the base's *Markets over epochs* governs it from the first TOWN epoch.

**Records at a village epoch** (`village.records`, the one home of the records placement; J-V7.125). Item 202's records
hook calls it — the engine's `dossier` step (V06 §3.2 row 12) at an epoch whose product is the village, and the base's *One
path* placement on an absorb without an epoch (§7.7) — with the placement `ProductDecl('village').records` names:
`village.records`, registered by `@plat/village` with stage `S10b` (the stage whose `dossier` request it stands in for; its
draws key by it, §6.1). **`place`** is called once for each dossier record the step adds, **member a count step adds, or
greater a REPLACEMENT re-key places new** (V08 §3.5.1 (c)'s second and third cases, (d)) — a re-key whose greater keeps the
lesser's thing is a `rebind`, never offered — in binding-key order, before the base's placement of that record (§7.7's
*One path* sentence), with the adding dossier event's `seq` (its keys, V07 §3.14; J-V7.129), its ops committed as that step's
single-level batches. It places, and declines nothing it names:
1. a record whose class is of V11's `market` profile family (V07 §3.6 (4)) or a `mercantile-market` custom record:
   `annual_fair` → the fair field by (a); `fish_market` (a `market-hall` class with a `nearMarket` row) → its hall by (b),
   then the rank by (d); `weekly_market`, `market_square`, `periodic_market` and a `mercantile-market` record → the rank by
   (d), the latter's `market_cross` by 3 below; `slave_market` → (c);
2. a `cloister`-family record (`monastery_or_friary`) and a `market-hall`-family record without a `nearMarket` row → V06
   §3.9.6's claim-sized join, else (c)'s outside plot, else (c)'s last rung;
3. a `@pin:<kind>` record (V11 §3.11: `wayside_shrine`, `water_source`, `multiple_water_sources`, a `sacred-shrine` or
   `mercantile-market` custom record's pin) → V07 §3.10's pin-record rule, in this batch;
4. **a REPLACEMENT greater whose lesser stands on the map** (J-V7.131) — brought by a promotion receipt, by the change that
   adds it beside its lesser, or by a lesser leaving the list in that change (V08 §3.5.1 (c), (d)) — is placed as a new member
   wherever V08 §3.5.1 (d) places it new, the greater's own thing, never the lesser's re-keyed: `parish_church` over
   `wayside_shrine` → the church placed by S10b's one solver (the `dossier` request, §4.7), issued by this placement in this
   batch so that the cross can follow it, then the lesser's churchyard `cross` by V07 §3.10's pin-record rule — where two keys
   meet (the church added beside the kept shrine record, or the shrine record leaving the list as the church arrives) the
   shrine record's key binding it (V08 §3.5.1 (c)); after a `promotedFrom` receipt, which keeps the record's one key, that key
   binding the church and the cross laid for the record, keyed by its binding key, its provenance the record, with no binding
   row of its own (V08 §3.5.1 (d); J-V8.114) — and the lesser's former pin left standing, unbound (least disruption: a wayside
   shrine outlived its role); `fish_market` over a standing fishmonger → by 1 ((b)'s rim hall), the fishmonger's key an alias
   on the hall where two keys meet, the record's one key re-pointed to the hall after a receipt (V08 §3.5.1 (c), (d)), its
   shop keeping its use, unbound, left to the use step. The palisade's REPLACEMENT is not this item's — the fortification's
   dossier path yields it (V07 §3.11) — nor is a REPLACEMENT whose V11 §3.12 reading keeps the lesser's thing (`graveyard`
   over `burial_ground`), which V08 re-binds and which places nothing; a `@none` or `@office` lesser (a citizen militia, a
   resident priest) has nothing to re-bind: its greater is placed as any added record and the lesser's key becomes an alias
   on the greater's member `#1` (V08 §3.5.1 (c)'s second case). The engine's dossier-phase ladder step, which runs after this
   call, finds the greater standing and converts nothing in place (V06 §3.9.11's REPLACEMENT row, which excepts a greater V08
   §3.5.1 (d) places new; J-V6.125).
Every other record it **declines**, and the base's placement places it (S10b's `dossier` request on the current map, V07
§3.11's absorb half). A named record is never declined because its placement fails — F-V-FAIR's last rung, (b)'s claim
beyond the share and (c)'s last rung each end in this batch, reported — so every record added at a village epoch is placed or
bound in the epoch it arrives (§5.3's dossier row, checked at the `epoch` event). **`remove`** (J-V7.130): for a removed
record the base's dossier step removes it first (its use closed by `closeUse`, §7.7 item 2), then calls `remove` with the
removing event's `seq`, whose ops — each an op of that batch, keyed as `place`'s (V07 §3.14) — take the village's own traces
of it: the fair field's reservation tombstoned ((a)), its faces kept `commons` and left to V06 §3.5.3's hinterland ladder; a
pin the record forced (V07 §3.10) tombstoned with its binding — save a forced well the coverage row counts (it serves a housed
household within `pins.wellWithinM`), which stays, unbound, its provenance turned to the coverage row by `setAttr`, since
`village.pins`' step 1 would otherwise place it again; a pin it bound but did not force left standing, unbound. A hall or a
cloister takes nothing more: the building stands vacant for item 17's re-use. **A market record's removal** (the market-family
kinds of V07 §3.6 (4) and a `mercantile-market` custom record) clears the principal `market` rank by `setAttr` in that batch
unless another market record stands or V07 §3.6 (4)'s one draw passes `rules.market.law` at the population (the target at an
epoch, the absorb's population on an absorb) — the law's market, which never vanishes by the law ((d)); the square is kept as
an open space (the base's *Markets over epochs*), its stalls going by `village.pins`' step 2 and `dist.market` falling back
by W64 (J-V7.111). **Without an epoch** (J-V7.128): a record an absorb adds at a village rung with no epoch (V08's absorb
path, V07 §3.11's absorb half) is placed by the same call and the same list, and a record it removes is handed to `remove`
after §7.7 item 2's removal, with a context holding the document, the tables, the product, the rung and the absorb's week;
their ops are that absorb commit's batches (no undo target, §7.4), keyed by the absorb's dossier event's `seq`; so a fair
field, a hall, a cloister, a forced pin or a REPLACEMENT greater never waits for the next epoch, and S10b's `dossier` request
never meets a record it cannot place (a fair ground's reservation, a hall's claim). `village.records` reads nothing else of
its context: its draws and the addresses it mints are keyed by `event.seq`, as a post-build placement's, epoch component 0
(V07 §3.14; J-V7.129).

**Pins over epochs** (`village.pins`; J-V7.126). VS8 is a generation stage; at a village epoch its rows run through the
participant `village.pins` (*The village's registration* above), over what the epoch changed and by least disruption, in
this order:
0. **orphans** — a pin whose host face (`Pin.host`, §2.7) the epoch tombstoned is tombstoned in this batch, a pin record it
   bound re-bound by step 4;
1. **wells** — the coverage row read as VS8 reads it (each housed household served by a well, pump or unbroken aqueduct
   delivery point within `pins.wellWithinM`, as item 111 tightens it on an arid row, a well serving at most
   `pins.wellPerHouseholds` households, nearest first): every housed household the standing wells, pumps and unbroken
   delivery points leave unserved (the coverage row over the district's housed households, as V07 §6 prices it) takes a new
   well at VS8's sites (on the green, at a junction, in a yard, in that preference, the top well-yield ground weighted), each
   placed within reach of the most unserved households (ties by the site's address), until none is left — a pump instead from
   the era row's pump date;
2. **stalls** — every reservation carrying the principal market rank, and an epoch's street market ((d)), brought to VS8's
   stall count at the epoch's households: stalls added along the rim facing the ways (a street market's along the through
   road's frontage nearest the heart) at the free positions in rim order, the surplus removed last-placed first; a
   reservation that lost the principal market rank since the last village epoch loses its stalls;
3. **the new hosts' rows** — a new nucleus's open space ((9v)) gets its centrepiece by V07 §3.6 (5) and its maypole row; a
   crossroads the epoch made inside the perimeter its cross row; a new well on a through road its trough row; a moot place
   where a chartered or council government newly stands — each drawn as VS8 draws it, on `pin.centrepiece` or `pin.decor`
   keyed by its host's lineage, so the pin is the one a regeneration of the grown village would place on that host; a row
   whose law reads the population (the stocks) compares VS8's one creation draw with the law at the epoch's target, so it
   appears once the law passes the draw and never vanishes by the law (as the market law); and a **`Roadside Shrine` quarter**
   (DR5) whose claim anchors on no shrine — added by the epoch's dossier step, or by an absorb since the last village epoch —
   anchors on a standing shrine within `presence.siteReachM` of the frame's centre where one stands, else on the shrine the
   shrine row places for it (at the perimeter on a road), drawn on `pin.decor` keyed by the quarter's claim; until a village
   epoch runs, a claim an absorb added anchors as DR5's claim without an anchor does (a `claim` anchor at the claimed class's
   place, V07 §3.11);
4. **pin records** — a record whose bound pin went with its host (step 0) re-binds by V07 §3.10's pin-record rule.
It removes no pin whose host stands, save step 2's stalls (the surplus as households fall, and a closed market's) — a pin
whose host is gone going by step 0 — never moves a pin, never re-adds a pin its author deleted and never moves one its author
placed (declared means held, §7.2; a placed well counts in the coverage row). Each pin written or removed is an op of its
batch — the pin records VS8 writes (author `epoch`, cause `rule:village.pins`), a removed stall's or orphan's tombstone — in
the epoch's record (replayed with it), undone by its undo record where the epoch is an undo target (an epoch that carries a
dossier event is none, §7.4). At the hand-off up, step 3 runs the stall rows on the green it makes the market; at the
hand-off down, a shrunk town's standing pins — statues, fountains and bandstands included — stay as standing fabric, and
`village.pins` only adds to them by the rows above.

**Decline and desertion.** The engine's strike lottery (V06 §3.5) with the village's persistence rows: a vacant toft's
dwelling decays by §4.11's dwell bands; a dwelling that reaches the base's `cleared` existence — a live record whose footprint
trace persists (§2.8's decline hooks) — is the **house platform** (no new field: the `house_platform` role draws a `cleared`
dwelling at village rungs, and regrowth-first rebuilds on it first; J-V7.76) and the toft returns to its croft
(`plotToGarden` → a paddock); a way of a land class on ground part 0 (`through`, `primary`, `secondary`, `lane`, `alley`,
`cul_de_sac`, `track`, `path`; in a village mostly a track or lane) the shrinking village no longer uses — no standing
building's access and no entry, approach or landing, so no route beyond the frame is ever cut — is a candidate of the pool's
`street` kind at a village rung (V06 §3.5.2, read through the village's epoch rows, which applies the entry, approach and
landing clause at the draw): struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight
`E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), it takes **`retireWay`** to the
`abandoned` existence (the ways' decline ladder, item 268), its `Lifecycle.since.epoch` the disuse epoch: a **hollow way**,
drawn sunken (V07 §5.1), skipped by the trackers' merge test and
S4's router; a hollow way struck again takes **`effaceWay`** to `decayed` (the street row's `again` cell); regrowth-first
reopens a hollow way before it lays a new track (**`reopenWay`**, back to `built`, the street row's `reopen` cell, by V06
§3.8.2 tier (5′) and its placement rule). **Retirement is not `downgradeWay`** (J-V7.98): at a village rung the street
candidate issues `retireWay` for every land class, a `primary` or `through` way included — the main street of a deserted
village is the classic hollow way — while `downgradeWay` and its rule that primaries never downgrade keep their meaning at
every rung (V06 §3.5.2), and V06 §3.19.2 (2)'s lapse reads a raised way whose carried way is retired as downgraded. **The
crossing and water classes and every raised part never become hollow ways** (item 268): a `bridge`, `pier` or `quay` deck is
struck only as V06 §3.19.5 (3) states — the pool's `deck` kind, to `decayed` or `ruined` (item 291's deck states) — a `ford`
retires with its carried way to `abandoned` and then `decayed` and is drawn as no crossing, a raised way declines by stretch
with its supports persisting (V06 §3.19.2), and a deck's plots fall with their deck (V07 §3.10a (6)). **The house platforms'
walls** (J-V7.89): a generated retaining wall re-derives with its terrain only while its platform's dwelling stands in any
existence short of `cleared`; from the step at which the dwelling is `cleared` or its toft is turned to garden, the wall is
standing fabric — never re-derived again, never removed by a re-derivation — and its decay is V06 §3.19.4 (3)'s (the pool's
`retaining` kind: a stretch slumped to `decayed`, a slumped scarp; its stone taken, to `ruined`, only on salvage demand); the
`house_platform` role draws the platform with its decaying walls (V07 §5.1); regrowth-first rebuilds on the platform first,
and the rebuild's re-levelling at the platform's datum restores its decayed stretches by V06 §3.19.4 (6). A deserted toft's
strip holding returns to the common (V07 §3.9 (3)); a `VillageField` whose furlongs are all cleared is tombstoned by the
clearing epoch's ops; a `church-family` building's persistence is × its class's `epoch.rows.persistence` cell (0.3) of a
dwelling's (churches outlive their villages — a handed-down town's as well as the village's own); a manor's or tower house's
× 0.5 (V06 §3.5.2). **The palisade over epochs** (item 114): the engine's walls step runs over it at every village epoch by V06
§3.7's need and means (V07 §3.4 (8)) — so a safe, poor hamlet's palisade wears to gaps, a threatened one is patched with odd
stakes, hurdles or brush, and a prosperous one under threat is rebuilt whole; a village never gains a ring at an epoch (the
growth phase above). **Land use follows the households** (`retypeLand`, item 209): when the arable demand falls below the
arable by more than `epoch.rows.hinterland.slack` (20 %), the furlongs farthest from the perimeter and poorest by V07 §3.9's
suitability turn to pasture (order `perimeterPoorest`), one great field's worth at most per epoch (cap `greatFieldPerEpoch`;
V06 §3.5.3). **A deserted village** — a target below 1, or no household left — is an outcome, not an error (J-V7.2): every
dwelling vacates and decays over the dwell bands, the green turns pasture, the arable pasture, the church may stand alone
among the house platforms and hollow ways — the deserted medieval village the evolution engine can draw — and the map keeps
its name and its plan; a later rise resettles it by the regrowth-first order onto the old tofts.

**The hand-off up — a village that passes the hand-off band** (the fold gives the base product; the rung is TOWN):
1. The standing fabric survives as every growth stage's does (§6.3): the village district, its tofts, ways, green and
   palisade keep their records and addresses (the palisade's run conditions and materials included); the caverns and ruins,
   their access points and any dwellings in them carry over unchanged (V07 §3.16 (7)); every church keeps its drawn crypt (V07
   §2.4). The grandeur ceiling lifts for buildings new or rebuilt from this epoch (item 115 (e); V06), the standing buildings
   unchanged.
2. The village district is retyped `central` (`setAttr` in the epoch's ops, the cause recorded) — the old village is the
   town's old core — and keeps `fabric: 'village-ways'`; its `VillagePlan` is kept, its lifecycle `superseded`, and its
   `VillageEnd`s are superseded with it and become sub-area labels on the quarter tree (§9.1) until S13a names the new
   districts; the village's name is the core's name. **While a superseded plan exists**, VS2 and the plan's read stay
   registered as participants of the base product (`village.density`, *The village's registration* above), so
   the old core's density field is recomputed on load and a re-derivation of the old core runs the village fabric and the
   `toft` plot strategy on its recorded inputs (J-V7.67).
3. The green, if any, becomes the principal market's reservation when the town has none (the green as market place; `setAttr`
   on the reservation's kind and rank, J-V7.22), its commons-owned `Greenery` kept on the reservation as a `market_green` part
   (§4.9's era row), owner unchanged, restored by the inverse; else it stays a green. In that batch VS8's stall rows run on the
   green made the market (V07 §3.10), since `village.pins` does not run at the TOWN rung.
4. The epoch's residual grows by the base's path from S5 on (§4.4), as V06 §3.6's growth states: the stage-k boundary is
   grown from the village perimeter as the previous stage's boundary, the palisade is the innermost enceinte (its gates on the village's
   through roads), S5c grows the town's streets from the village's ways, and the hinterland's faces the new stage takes are
   cleared by the grow path's clear regions (§4.11) — the fair field's reservation excepted, kept as a standing secondary
   market ((f) above) — their `VillageField`s shrinking with them (a field left without a furlong is tombstoned by that
   epoch's ops).
5. The frame grows when the new target needs it (§4.11); the territory beyond stays the hinterland.
6. **The catacomb rule opens** (item 109 (k); V04 §3.5.1; J-V7.66). From the first TOWN epoch, V06's `under.extend`
   evaluates the burial faces at every epoch (V06 §3.18.2 (1); V04 §3.5.1), a re-derivation giving the same answer from the
   same draws. Its candidates are **burial faces only**: the churchyard of every standing `v.parish_church` (the village's and
   each COUNT member's), the dossier-bound burial ground (V07 §3.11's seat) and a monastery's burial yard where one stands —
   ranked by the burials each serves (V04 §3.5.1 (2)); never a church, and never a quarry ossuary (CITY and above). At most one
   complex forms at TOWN (V11 §3.23.8's `count`); the dry-ground and age gates are the base's and the source chances are V11
   §3.23.8's `CatacombRule` rows at TOWN (`chance.churchyard`, `chance.cemetery`, `chance.monastery`). **The age gate reads
   the face's own years since its use opened**: at generation the village's single creation stage (`stageRows`, V07 §2.1: `K`
   = 1, one `yearsPerStage`), replaced by `HistoryHint.ageYears` when the port fills it (item 88), plus the log's years since;
   the churchyard's use record and its opening year are kept across the hand-off like every surviving entity (step 1), never
   reset by the product change. The complex's entrance is on its burial face (V04 §3.5.1); where a crypt was drawn, the parish
   church's crypt joins the complex only by the crypt-join draw (V11 §3.23.8's `cryptJoin`, its own-churchyard value; V04
   §3.5.7 (c)) — never as the catacomb's entrance or source. A standing `v.parish_church` counts as a `church` in the CITY and
   METROPOLIS count (V07 §2.4; V11 §3.23.8).
7. **Item 110's state crosses held** (J-V7.92). The village's declared raised ways cross unchanged; the crossing into TOWN
   lays none (TOWN gets them only by declaration); from the first CITY epoch V06 §3.19's founding may found others within the
   cap, counting the declared ones (V06 §3.19.1; J-V6.86). The old core keeps `village-ways`, so its levelling stays the
   house-platform rule at TOWN and CITY (V07 §3.8a (5)), while the town's new districts level by their own fabrics' units; no
   crossing re-derives a wall. The suppression ledger (V06 §3.19.3) is the log's and crosses unchanged. The pier head keeps its
   lineage draw; deck plots stand.

**The hand-off down — a town that falls below the hand-off band** (the fold gives the village product; the rung is VILLAGE):
the standing fabric survives unchanged. **The plan**: the document's one `VillagePlan` is **revived** when it exists
(lifecycle back to live; only its `auto` fields re-derived from the standing fabric; a declared heart or form kept; its
superseded ends revived with it), else created (the participant `village.plan`): the heart at the principal market's
centroid, the form `nucleated`, the roads from the arterials (`through` where two leave the frame), the open spaces from the
market reservations (squares), the palisade the innermost standing enceinte, the character from the standing dwellings'
median frontage and depth, the ends one per standing district, named by its name. From then on the village phases run: the
declining town contracts by the engine's lottery and the village's persistence rows, its districts stay districts (the
village rules read the plan, never re-cut a district), and a later rise past the band hands up again by the steps above, the
same plan superseded once more (J-V7.67). One document, one seed, one history (V08 §3.10, J-V8.12). **The grandeur
ceiling** (item 115 (e)): the shrunk town's grander buildings stand as they are, never reshaped down; new and rebuilt
buildings follow the village ceiling (V07 §3.8). **The standing underground** (DEFINITION §4: tunnels "silt up, cave in or
are sealed, never torn down"; item 109 (k) (4)–(5); J-V7.63): every standing system keeps its records, arena parts and access
points; at a village rung V04's stages for the kinds the village's set does not otherwise register (the sewer network, a
catacomb, quarries, vaults, a buried old town or a buried former settlement) stay registered in **maintenance mode** (V04
§3.1) — each re-derives its own parts from its kept galleries by `corridorUnion`, as §4.11 does for the `buried` and `dug`
parts, and never grows — and U-FADE ages them at the underground's rate (V04 §3.10), so sewers silt and cave in by the
engine's lottery. A catacomb keeps its `CatacombComplex` (`extentFloorM2`, `fill`, `source`, `rank`): its extent never falls
below `extentFloorM2`; it is `stagnant` with `blockedBy` holding `'rung'` (V04 §2.2, V04 §3.5.1 (6)), its unmet need absorbed by
reuse (its `fill` rising); when the shrinking parish is deserted and the churchyard's use closes, the reason becomes
`'sourceClosed'` and the complex stays; a later rise past the band resumes its growth by least disruption. Its source stays
its burial face, never a church. **Crypts follow their buildings**, not the ratchet: every standing church keeps its drawn
crypt; a crypt joined to a catacomb keeps its (3b) link under the base's closure states; a **standing cathedral keeps its
crypt unconditionally** — the hand-off down never re-classes a standing building (V07 §3.11's resolution order applies to
dossier records and new placements, not to standing fabric), so a cathedral left in a village stays a cathedral with the
settlement's largest crypt. An undercity's households vacate by II.7.5's rules once its bound is left (a village has none).
An island still waning or settled when the fold gives the village product continues V05's steps (`sky.islands` runs at every
rung, V06 §3.2; §4.11 and V05 §3.15 (6) take an island down over its dwell spans, never in one epoch); the village phases read
no island, its landing houses are ground uses, and the households it releases enter the village's siting tiers, (0)–(5) then
(6v)–(9v), through the engine's ledger.

**Item 110's state** (J-V7.92). Neither hand-off rewrites any event, so the suppression ledger (V06 §3.19.3), derived from the
log, crosses both unchanged: no village stage reads it (a village generates none), and V06 §3.19's founding reads it again
from the first CITY epoch, so a removed generated way stays removed through the fall, the village epochs and a rise; at a
village rung V06's `raisedWays` step runs its lapse and repair, never its founding (V06 §3.19). The derived plan's `roads`
("from the arterials") and `entries` read ways on ground part 0 only; a raised way that carries an arterial counts by its
part-0 approaches at the frame. **A carried raised way** is standing fabric: no village phase re-derives or removes it; its
decline is the engine's (arches fall by stretch while the supports persist, V06 §3.19.2); its arch vaults are re-derived with
it by the span rule (V07 §3.5a (7)) — they are not on the maintenance-mode list above, which keeps a shrunk town's street and
bridge vaults; an aqueduct's delivery points count for wells while its channel is unbroken (V07 §3.5a (8)). **Retaining
walls follow their district's fabric** (V07 §3.8a (5)): a shrunk town's districts keep their own fabric's levelling at
village rungs, and the hand-off re-derives none. **Deck plots**: those of a shrunk town's bridges, moles and quay platforms
stand with their dwellings (least disruption, as standing split pairs do); the village's no-dwelling rule (V07 §3.10a (4))
governs new deck plots only.

**Item 102 over epochs** at village rungs: V06's building shade mask applies (a village's houses are low; the term moves
little), and the palisade's shade enters the field as at generation.

**Items 105–108 over epochs** at village rungs — the engine's rules, read with the village's rows: links are re-derived
whenever a member opens, closes or moves (item 105 (a); V06's use step), so a closed mill re-binds its bakehouse to the next
mill or to the import; a coverage gap reopens by the engine's coverage rule (item 107; V06 §3.9) — an end that lost its
alehouse is the first candidate for the next — inside the village's siting tiers; ladder steps arrive through the dossier
phase (V07 §3.11's absorb half); the fortification phase repairs a palisade under renewed threat on its barrier closure
unchanged (robust or patched by item 114's means, V07 §3.4 (8)), and a village gains a ring only by the dossier (a wall
record, or the palisade's REPLACEMENT). Splits follow item 105 (h)'s threshold at every rung (V11's `splitEnabled`,
J-V7.115): inside a village's span it rarely fires, a split pair standing when a town shrinks into a village stays (never
merged by a rung change; least disruption, item 22), and a split may form as a village grows toward its top.

### 3.12a A village over a former town, and refounding at village rungs (item 113, the village's part; J-V7.138)

§4.11 *History-first generation* generates a settlement with a known history as its past and ages it to the present, V06's
replay engine running the coarse epochs, V08 reading SettlementForge's history, V04 burying the former fabric. This section
is what happens at the village rungs; every epoch it names is an ordinary village epoch of V07 §3.12, run inside the
replay's creation prefix (§7.4: never an undo target).
1. **A village over a former town or city.** A history whose peak (§4.11 (1): `peakTier`, the high-water population, or the
   effective peak from evidence, V08) lies at TOWN or above and whose present lies below the hand-off band is generated at
   the peak and declined by the replay's epochs to the present. The epoch whose target first falls below `1 500 × (1 −
   handoff.band)` is an ordinary **hand-off down** (V07 §3.12): the `VillagePlan` is created from the standing fabric (the
   heart at the principal market's centroid, the form `nucleated`, the palisade the innermost standing enceinte, the ends one
   per standing district), and from then on the village phases run to the present. The remnants are what the village's rules
   leave of the town, never a separate construction: its walls far beyond the houses (every enceinte a standing ring decaying
   by V06 §3.7's need and means, item 114); its abandoned street lines as hollow ways by the village street row (`retireWay`,
   V07 §3.12 *Decline and desertion*) and, past the dwell bands, as field boundaries where V07 §3.12's land use takes their
   faces; a church too big for today's congregation (the persistence rows keep it; a cathedral stays a cathedral, V07 §3.12
   *The hand-off down*); a market square too large for its market (the square kept, its rank by V07 §3.12 (d)); empty plots
   as closes and paddocks; roofless and ruined buildings by the dwell bands; the grander buildings kept as they stand under
   the village's grandeur ceiling (V07 §3.8). The present dossier's facts are met exactly at the end (item 20): the present
   population by the roster, the present institutions by the last epoch's dossier step through `village.records` (V07
   §3.12). **A symbolic peak** (§4.11 (1); item 113 (f)): a village dossier that holds a ruined or remnant record of a higher
   tier (a ruined "City walls and gates", a remnant cathedral) has its peak at that tier, sized at `history.symbolicQuantile`
   of the tier's population range (V11), every remnant the replay sizes carrying provenance `symbolic`; with no evidence there
   is no peak and the village is generated at its present. The clerk tells the story from the replay record (V10; V07 §4.5).
2. **Buried remnants under a village.** Where the former town's ruins pass `history.burialYears` (DR39) during the replay, V04
   §3.5.5 (b) lays them as the buried former settlement at their old ground level — whatever the rung at that epoch, since the
   former settlement stood at TOWN or above — and at a village rung the buried system stays registered in maintenance mode
   (V07 §3.12 *The hand-off down*; V04 §3.1), its access by item 109 (j) through the village's own openings (V07 §3.16 (3)–(5)).
   A former settlement that stood below TOWN at its peak lays no buried system (V04 §3.5.5 (b) returns null): its house
   platforms and hollow ways stay the surface earthworks of a deserted village (V07 §3.12), past any burial threshold.
3. **Refounding at village rungs** (item 113 (b); §4.11 (4)). Where the history says the place was destroyed outright
   (SettlementForge's terminal death and resettlement — a resettled place forced to THORP — a catastrophic event, or an ancient
   "Fall of" event on the site; DR38) and the new settlement is a thorp, hamlet or village, the old geometry becomes ruins
   (§4.11 (4): every building `ruined`, every way a trace) and the village product generates the new settlement on top, its S0
   draws reading the refounders' culture where the history gives one (V07 §3.1 (2)'s `cultureForms`), so it may follow a
   different plan. The rules (4)–(6) below make it reuse the old fabric wherever it helps; the rest of its generation is V07
   §3.1–V07 §3.16 unchanged.
4. **The old roads, gate gaps and bridges.** (a) VS1's lattice (V07 §3.2 (8)) prices a ruined way trace of the former
   settlement at V11's `history.reuseCost` through `existingFabricCost` (§4.3), so every router call a village stage makes —
   the neighbour roads, the polyfocal joins, the `row` spine, F-V-TRACK's third rung, a stub track — follows the old roads
   where they serve. (b) Every tracker's steer gains the **trace term** (V07 §3.5 step 5): `refound.traceWeight` × the unit
   tangent of the nearest ruined way trace within `refound.traceReachM` of the tracker's position, signed to agree with its
   heading (0 where none), so the village's lanes lean onto the old streets without being forced onto them. (c) A ruined
   bridge's deck site is one of S1 (5)'s crossing sites; a tracker taking it (V07 §3.5 step 2) rebuilds it (the `Bridge`
   `built` again), so the old crossings are reused first. (d) A ruined enceinte run of the former settlement is standing
   ruin, never the village's palisade: a tracker crosses it freely at a gate gap or a `breached` or `dismantled` run (item
   114's openings); where a step would cross a standing run away from any opening within `refound.traceReachM`, a `road` or
   `track` stops there as at a walled stretch (V07 §3.5 step 3), and a `through` tracker crosses, the run set `dismantled`
   over the crossing's width by `setAttr` in VS4's batch (the ruin's stone taken for the road). The village's own palisade,
   where drawn, is traced by V07 §3.4 over its own density, and a stretch running within `palisade.bandM` of a standing ruined
   run abuts it as it abuts a support (V07 §3.5a (4)).
5. **The old foundations.** In the slot race (V07 §3.8) a slot whose toft holds a ruined building's footprint of the former
   settlement weighs × `refound.foundationSlot`, so the new houses stand on the old ones first; a raced slot's ruin is taken
   by `clear` and its dwelling built by `reuse … build`, crediting and debiting the salvage ledger within the haul radius
   (§4.11 *Salvage*); a ruin on a slot the race leaves unbuilt stands, the close around it (the old plan persisting wherever it
   helps).
6. **The ruins' fate over time.** The former settlement's surface ruins decay by the dwell bands (walls one band slower) and,
   past `history.burialYears`, are buried by (2) when the former settlement stood at TOWN or above; the village's own decline
   and growth treat them as standing fabric (V07 §3.12's regrowth-first order rebuilding on a ruin's platform first).
7. **Edges and bars.** With the replay off (`history.replay` false, the parity presets — `VG` included) no rule of this section
   runs and the output is byte-identical (T-V7-59's no-op clause); a refounding with no ruined way within the territory leaves
   the trace term 0 and the lattice unpriced; a history whose peak lies below TOWN with a village present replays the village's
   own epochs (V07 §3.12) and lays no buried system; a peak above the cap is sized at the cap (§4.11 (7)). T-V7-59 is the
   village's half of T113-1 and T113-3.


### 3.13 Failure handling — the village ladders (never a whole-map retry, §5)

VG retries a failed build on the next generator state without bound (`ref:VG 1.6.9 retry on the next state (code)`); we
never do. Every village stage's ladder is below; each rung is bounded, each outcome reported with its delivery tier (§5.4).

| class | detected at | ladder (in order) | test |
|---|---|---|---|
| F-V-HEART no heart candidate | VS1 | slope limit `heart.slopeMax` 0.1 → `heart.slopeRelaxed` 0.2 → any dry cell above the flood line → the driest cell of the frame's middle half, reported | T-V7-4 |
| F-V-DENS populated area below the demand's `A_s` | VS2 | `δ` × `fail.dialStep` (1.25) `fail.dialTries` (2) times → `reachShare` × `fail.reachStep` (1.25) → carry on; F-V-SLOT covers capacity | T-V7-5 |
| F-V-PAL fewer than 3 kept points (collinear points counting as fewer), or no nucleus inside | VS3 | `keepBelow` → 0 → a ring through the `fail.palRingPoints` (12) densest lattice points around the heart → the palisade omitted, reported (a dossier's wall: kept as a ring of `fail.palRingShare · R_s` (0.8) around the heart) | T-V7-6 |
| F-V-ANCHOR a walled stretch whose end finds no barrier to anchor on (item 106 (h)'s F-WALL at village kinds) | VS3 step 5 d | the stretch follows the pre-reach trace around the barrier's end until it meets another barrier → it closes the ring on the pre-reach trace (that run's reach undone) → the barrier closure off for this enceinte (VG's water cut), reported | T-V7-31 |
| F-V-GATE a palisade with no gate | VS4 finish | a gate where the nearest road to the heart crosses the trace → a gate stub way from the nearest junction square to the trace (`placeGate`'s form, §7.1) | T-V7-6 |
| F-V-TRACK a tracker that meets itself, is stopped by water with no crossing, leaves an unfinished crossing, exceeds its step limit, or is still blocked by a raised way's support after its turns (V07 §3.5a (3)) | VS4 step | retreat `branch.retreatSteps` (3) and re-steer along the contour vector → the nearest crossing site within `branch.crossingSearchShare` × `bridgeSnapM` → for a through road, the remainder routed by S4's router (§4.3) to its target; for others, stop and record a landing → reported | T-V7-7 |
| F-V-OPEN the open space meets water, the mill or leaves the palisade | VS4 seeding 2 | shrink × `openShape.shrink` (0.8) up to `openShape.shrinkTries` (3) times → the next densest populated point → no open space, reported (the market to a flanking square) | T-V7-8 |
| F-V-FAIR the fair field meets water, the mill reservation, a raised way's strip or support, or the frame's margin | VS5 (V07 §3.6 (4b)); at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | slid outward along its road one field length at a time, up to `R_s` → the other side of the road, slid likewise → the nearest dry hinterland face adjoining a road that holds its area → no reservation: the fair is held on the reservation that carries the market (the member bound to it), reported `W_FAIR_ON_GREEN` | T-V7-13 |
| F-V-SLOT fewer slots than dwellings and institutions | VS6's capacity check (rungs 1–3); S10a and S10b (rungs 4–5) | slot widths to the band minimum → track frontage at full weight → up to `fail.slotTopUp` (3) top-up road trackers from the densest perimeter junctions, grown inward, VS6's second L1 batch → the doubled-household share to the templates' `households.max` → the unhoused households reported, never dropped (§5.2 F-PLAN's rule) | T-V7-9 |
| F-V-MILL no mill seat | VS1 | the leat limit `mill.leatMaxM` 300 → `mill.leatFallbackM` 600 m → a `v.windmill` by its row → the milling imported, reported (the need propagation's substitution, §4.2 S2) | T-V7-10 |
| F-V-FOOT a raised way's foot with no part-0 way vertex within `raised.endSnapM` | VS4 (V07 §3.5a (3)) | a stub `track` routed by S4's router (rung gate closed) from the foot to the nearest way, reported `W_RAMP_STUB` → the foot left unjoined, reported `W_RAMP_UNJOINED` (the way still reached by its other foot); never a moved foot, never a raised part laid | T-V7-48 |
| F-V-TERRACE a platform wall between the door and the frontage whose drive or path cannot meet its grade inside the toft | S11 (V07 §3.8a (6)) | the ramp laid along the wall inside the toft yard → the platform's frontage edge dropped to the way's level (two levels, the wall moved back by the ramp's length) → a stair only, the drive omitted, reported `W_TERRACE_NO_CART`; never a gap in the wall, never a retry of the map | T-V7-47 |
| F-V-FIELD arable short of its demand | S12a | wood and pasture faces re-claimed by suitability → the import share raised and reported (§4.9's rule) | T-V7-11 |

Every base ladder a reused stage has (F-RIVER, F-ROUTE, F-PLOT, F-SITING …) applies as in the base; the edges of every
village mechanism are V07 §3.17's.

### 3.14 Determinism — streams, addresses, locality

**Concerns** (appended to §6.1's registry, item 344; ids u16, never renumbered): `village.plan` (VS1's character and the
polyfocal count), `village.density` (the reference point and the noise), `village.palisade` (jitter and keep),
`village.track` (branch sides, continuations, shuffles, track limits), `village.open` (rim count, shape, rotation,
centrepiece, the market law's one draw), `village.slot` (slot draws, the race, VS4's piers, the pier head), `village.fields`
(great-field count, sector rotation, furlong sizes). Reused: `blueprint.features` (S0's village draws, the oasis's), 
`water.river`, `site.centre`, `roster`, `siting`, `siteplan`, `fields`, `crop`, `forest`, `hinterland.outside`,
`hinterland.decor`, `pin.centrepiece`, `pin.decor`, `naming`, `epoch.transform` (every epoch draw of V07 §3.12, keyed by
lineage and epoch — save the market law's comparison, which re-reads V07 §3.6 (4)'s one creation draw on `village.open`, so
the law's crossing is monotone, and `village.records`' draws, keyed by the dossier event below), `alloc.block` (item 105
(f)'s relaxation pass; no new concern), `sewer` (V04's tail at village rungs: the ruin and cavern draws and every access
draw, keyed per building or element pair, V07 §3.16). The barrier closure (V07 §3.4 step 5), the palisade's condition at
generation (a derivation row, V07 §3.4 (8)), the raised way's rules (V07 §3.5a), the levelling (V07 §3.8a), the water pull
(V07 §3.3) and the refounding's reuse rules (V07 §3.12a) are draw-free. The epoch participants draw under the stages they
register — `village.plan` under `VS1`, `village.density` under `VS2`, `village.pins` under `VS8` (V06 §3.16) — on their own
concerns above, keyed as V06 §3.16's *Keys* state (J-V7.122); `village.pins`' new hosts draw on `pin.centrepiece` and
`pin.decor` keyed by the host's lineage, and its population-law rows (the stocks) re-read VS8's one creation draw, so their
crossing is monotone (J-V7.126). **The records placement** `village.records` draws and mints as the base's post-build
placement does (§6.1, §6.3; §7.7 item 6, J-A22.76; J-V7.129): its draws on `siting`, and on the `plot.*` concerns for a
claim-sized join's scores and an outside plot's cut, keyed by the entity, the adding (for `remove`, the removing) dossier
event's `seq` as creation index and epoch component 0, under stage `S10b`, on the epoch path and the absorb path alike; the
entities it creates — the fair field's reservation, a hall's or cloister's plot, building and use, a forced pin, a
REPLACEMENT greater — take their creation indexes from that `seq` and their ordinal in the placement's ops; a forced pin's
site stays on `pin.decor` keyed by the record's binding key. So two absorbs between the same pair of epochs never mint one
address, and a record carried by an epoch takes the identities it takes folded standalone at that `seq` (the port's grouping
of a week's changes never changes an identity, J-A22.76). Records arriving at one epoch are placed in binding-key order,
never the port's listing order.
**Order.** Trackers advance in lineage order one step per round, so the network is a pure function of the recorded inputs;
branch draws are keyed by the branch's lineage — its step index along the parent (V07 §2.5) — so an edit that removes one
branch moves no other tracker's draws, and changes the geometry only of the trackers that merge onto, or test junctions within
`branchSpacingM` of, the removed branch's ways (the influence set T-V7-18 computes). **Locality.** A block's quota is recorded
(V07 §3.8), so re-selecting a block re-races that block only; the open space and the palisade are keyed by nucleus and
lattice index; a heart move re-derives from VS1 (a declared recorded input, §7.3). **Floating point.** Every raster and
tracker step goes through `dmath` (§6.5 (3)); positions are snapped to the lattice at commit (§3.2).

### 3.15 The `VG` parity preset

`VG` is a parity preset (§7.6; item 377), set through the table cells' `VG` column (V07 §2.2) and these switches, so the
side-by-side (§13.6) compares like with like: the frame VG's view at `matched.vg.size` — 210, 350 or 560 m square
(`vg.frameM`); one household draw per village, uniform in `vg.householdDraw` [3, 7], drawn on `village.plan` keyed by the plan
after the character draws (V07 §3.2 (5)), the dwellings `N = round(P ÷ that draw)` (VG's population is dwellings × one draw;
we keep the relation, read in reverse, so the requested population still decides — J-V7.23); `grown` form; VG's density
formula (V07 §3.3); VG's house rectangles and advance (V07 §3.8), with the exact count kept by the race; no institutions
beyond VG's own kinds (an inn on a through road, one or two taverns, a shop at 0.2, a smithy at 0.7, a temple at 0.1, placed
on dwellings' plots by the solver with `placement.extensionWeight` 0); VG's square, centrepiece and tower; VG's palisade
(dry maps, no defensible pull, no barrier closure: VG's water cut with `closure: 'shore'` and a uniform stretch profile,
stretches without a gate dropped, every run `standing`, item 114's condition not read); the supply web's off form (V11
§3.7.4's `web.off`, its `splitEnabled` false among its cells, so no generated split), with V11's `presets.VG` entries on its
five cells — `siting.web.bulkyWater` and `.perishableShort` 1, `.orientEnabled`, `.splitEnabled` and V11's `terrace.enabled`
false — written by V11 §2.2's rule; the same-kind spacing at 0 (item 107 (g)); no grade guard, no neighbour roads; `vg_sector`
fields at VG's extent; no closes drawn (unbuilt slots are bare ground); the one-house field rule, the orchard trigger and the
forest mode with its clearances (V07 §3.9; `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode`), the woods' crowns on
the `render.instances` stream (re-rolled by T12 `dress`'s `rerollLayer('render.instances')`); the empty-road prune (V07 §3.5
finish); item 110's rows off — no platform levelling (`rules.terrace.enabled` false), `deck.headChance` 0, and no raised
way but a declared one (the
reference has none; its piers are bare plank piers); item 111's water pull, arid re-weighting and climate cell neutral and
item 113's replay off (the parity presets); the title plate's population rounded to 10 (V07 §5.3); the `painterly` family
with the relief tier on, the spotlight on the heart and our own palette on §8.2's targets (never VG's colours, §17.1). The
reference's requests reach these fields through the request-mapping table held with B-VG's baseline rows (item 495).

**The preset file and its entries** (J-V7.119, J-V7.120). The `VG` preset file (item 377) ships with **V-M0** (V07 §8),
whose exit already runs under `VG`, and carries: (1) this volume's `VG` column and switches (V07 §2.2, V07 §2.2a, the lists above)
— no `village.json` column is `presetsRequired`, each cell's `VG` value its V07 §2.2 or V07 §2.2a entry ("as default" reading the
default); (2) V11's five entries above, written by V11 §2.2's rule; (3) a `presets.VG` entry on every `presetsRequired` cell of
any other table a stage of `ProductDecl('village').stages` reads (a conditional registration included): `cut.bendMode` (§4.6
step 5), read only where S8's bent cut is registered for V07 §8 risk (1)'s fallback — `VG` entry `straightFirst`, the `MFCG`
entry's value (VG cuts no block), provenance `own`, note `fixed: the parity value`; and every other cell of the compile's
`villagePresetCells` (V11 §3.2.1 steps 1, 4 and 7: the `presetsRequired` cells of the tables whose readers meet the stage set
the source manifest's `productStages.village` records) by one rule — VG's own behaviour where the reference code reading has
one (`ref:VG 1.6.9 ⟨behaviour⟩ (code)`, trace key D5), else the cell's `MFCG` entry's value (`own`, note `fixed: the parity
value`) — written by the seat landing V-M0 for the cells then compiled, and afterwards by the seat landing any change that
makes a table village-read (V-M2u's registration of V04's tail, V07 §3.16 (1), `productStages.village` gaining its stage ids
in the same change) or adds a `presetsRequired` column to a village-read table (V02's M6a on `composition.json`, a V04 rule
table), by the same rule and in the same change (J-V7.123) — so the list, `cut.bendMode` by name and the rest by the rule, is
complete by construction at every such change, and T-V11-9's equality of `villagePresetCells` with it, run in that change, is
its check.
**Every `VG` entry is code-read or fixed but one.** Each entry of V07 §2.2's column and of V07 §2.2a's `vg`, `terrace`, `deck`
and `plate` cells is either VG's behaviour read in its code (`ref:VG 1.6.9 … (code)`) or a parity off value (`own`, note
`fixed: the parity value`, V11 §2.2's rule (a)); it passes the provisional-number lint with no register entry and moves by no
run (V12 §3.7.2 (3)). The one measured-rate entry is `rules.race.densityPower`'s (V07 §2.2a), provisional 1 until V-M4, with
the register entry `cal.village.*.rules.race.densityPower@VG`: target `{ column: { table: 'village', column:
'rules.race.densityPower', preset: 'VG' } }` (its three rung rows), owner `V07`, metric `vg.acceptedShare` (T-V7-23's
accepted-share row), method `tune`, due V-M4 — confirmed at 1 when that row holds its band under `VG` (no run opened), else
fitted by the one `reference` run against VG 1.6.9 with `layer: { preset: 'VG' }` (V12 §3.7.1 (c)); fallback `not-achieved`,
the entry staying at 1 and the row reported to the owner (V07 §8 risk (2)).

### 3.16 Caverns and ruins under a thorp, hamlet or village (item 109 (a), (b), (j), (3b); V04's systems)

The owner: a village or a hamlet "could be sitting on top of a ruins or caverns", reached only once someone digs down or
finds an opening (~19:25). Item 109 (j) (1) names this volume. The systems are V04's; this section is the village's
registration, rows and readings of them (J-V7.48, J-V7.49, J-V7.79, J-V7.81).

**(1) Existence.** `ProductDecl('village').stages` registers V04's tail at the village subset V04 §3.1 names — T2 for the kinds
`ruin` then `cavern` (the ruin laid first, item 109 (c)), T2b the access pass, T3's F6 only, T5 (L3, L5, L7), T6 and T8
eagerly after the first map, T7 when the layer is shown; never T1 (the sewer network) or T4 (the undercity). The catacomb,
quarry, vaults and buried-town kinds are not registered at village rungs (their TOWN gates, item 109 (j) (1), (k) (1)), save
V07 §3.12's maintenance mode for a shrunk town's standing systems and a replay's buried former settlement (V07 §3.12a (2)),
and T2's catacomb step run for a dossier catacomb fact alone, which lays V07 §2.4's charnel vault. **Arch vaults**: V04's
arch-vault source (V04 §3.5.4 (d)) is registered at every village rung for the spans of a raised way standing on the map (V07
§3.5a (7)) — the only vault source at village rungs, the span rule's `country` reason keeping the spans over hinterland faces
open (§2.7; J-C4) — and V04's foundation reach (V04 §3.5.0: a void element within reach of a support or of a retaining wall's
footing is created collapsed) applies as V04 states it. **Caverns** follow S1's geology draw with item 109 (a) (1)'s relief
rows (a dossier `mountain` terrain is mountainous relief, DR1), the system's chance × `cavern.mineBoost`, capped by
`cavern.mineCap` (item 109 (a)'s values as V11 §3.23.1 registers them in V04's cavern `params`), where the site holds mining —
by V11 §3.23.1's ore rule over its `miningCellShare` of the frame, a roster mining class, or a dossier mining deposit (DR19) —
and the `fissure` variant in ordinary rock of hilly or mountainous relief (V04 §2.3's cavern parameters). **Ruins** exist by
V04 §3.5.0a's sources, strongest first: a dossier `ancient_ruins` deposit or a ruined-landmark record (by rule); a
`magical_node` or a ley-line income row; a `magical` history event or an ancient founding; a delving institution as a
multiplier, never alone; else V11 §3.23.2's blueprint row of `RuinRule.chance` at THORP, HAMLET and VILLAGE (by relief class;
V04 §2.3's shape) under the ancient-ruins toggle (`recipe.layers.ruins`, D-3); 0 under `VG` (item 109 (i)'s no-op pin).

**(2) Extent and place.** The underground arena covers the frame and margin, as at the base. A cavern's reach and caps are the
frame's (V04 §3.5.2). A ruin's extent is V04's significance draw capped at `RuinRule.maxFrameShare` of the **frame** — the
site's extent, not the settlement's, so a hamlet may sit over a large one (item 109 (j) (1); J-V7.48). Its centre is V04's
rule read at a village rung: the surface marker's position ((6)), else the magical node's, else the centroid of the stage-1
districts — at a village rung the one `village` district — so a ruin without a located source lies under the village
(settlements rise on older sites).

**(3) Access** (item 109 (j) (2)–(3), (3b)): every cavern and ruin is `unexcavated` until an access exists; V04's T2b draws each
access and records it as an `AccessPoint` with its `cause`:
* **(i) Dug from above** — V04 §3.5.7 (d)'s draw, at every village building, with **the village classes' rows** of
  `DigRule.classRow` (this volume's, in V04's table; own): `v.parish_church`, `v.chapel` 0.5 (a religious house); a mining
  class's pithead 0.5; `v.manor_house` 0.35 (a great house); `v.inn`, `v.alehouse` 0.3 (a cellar); `v.smithy`, `v.potter`,
  `v.tannery`, `v.bakehouse`, `v.watermill`, `v.windmill`, `v.wood_yard`, `v.landing`, `v.shop` 0.15 (a workshop); `v.farmstead`,
  `v.yeoman_house`, `v.cottage`, `v.longhouse`, `v.parsonage`, `v.reeve_house`, `v.tithe_barn`, `v.watchtower` 0.12 (an ordinary
  house); `v.hovel` 0.03; `v.pound` and `v.charcoal_pit` 0 (no floor to dig from). The buildings V07 §3.12's (6v)–(9v) and the
  dossier's absorb add at epochs are village buildings like the rest.
* **(ii) Wells** — V04 §3.5.7 (f)'s well reading over VS8's `well` and `pump` pins: a well that broke through is an access; an
  oasis's spring is the base's water, never a well.
* **(iii) Public openings** — V04 §3.5.7 (e)'s candidates and V11 §3.23.7's `OpeningRow` chances (the ruin entrance's 1 where
  the dossier makes the ruin known), at the village's places: a sinkhole under a field, the green or a common; a cave mouth
  anywhere in the territory; a skylight; a collapsed shaft under a field face or the open space (V04's cover bound); a ruin
  entrance at its surface marker ((6)).
* **(iv) Through another system** (item 109 (j) (3b)). A village has no sewer network; the systems that grow at village rungs are
  an author's dug passage (item 66; V04's U-DIG) and a mine working ((4)). A dug passage crossing a sealed void at a shared depth
  becomes a `breach` link. **Access is transitive** over V04's connection graph: a void is accessible when the graph links it to
  any open surface access point, and **lost** when its every open path closes (item 113 (e); V04 §3.5.7 (g)).

**(4) Mines at village rungs** (item 109 (a) (3); J-V7.49). A mining class at a village rung (V11 maps a hamlet's
`mine_open_cast` and any mining kind a village dossier lists to its `mine` class) lays no `quarry` system — its gate is TOWN and
above. Its outside plot's **working** (the pit or shaft, reaching `mine.workingDepthM`: open cast 10 m, shaft 30 m) is a breach
candidate, tested by V04 §3.5.7 (a) *The village working* (J-V4.113), which also carries its access across the hand-off up.

**(5) Dwellings only after access** (item 109 (j) (4)). V04's F6 settles scattered dwellings (squatters, hermits, a cult) in
accessible cavern and ruin clusters by II.7.3's sewer-front dwelling rows, at every village rung; the undercity is never
registered here (`layers.undercity` `never`, item 109 (e)); a void without access holds no dwelling; an epoch that seals the last
access empties them by the base's vacancy rules (V06), and they may return when access returns (item 113 (e)).

**(6) The surface marker** (item 109 (b); J-V7.81). At village rungs S12a sites the ruin decoration (§4.9's decoration table, the
village row, on `hinterland.decor`) for a dossier `ancient_ruins` deposit or a ruined-landmark record: on the most prominent
hinterland face within `ruinMarker.maxM` (800 m) of the heart that no arable claim takes, else the nearest open ground; a
ruined-landmark record's building stands there — a roofless shell by V02's ruined-landmark composition, or V02's
`stepped-monument` composition when the ruin's ancient-culture row builds in tiers (V04's monument rule, V04 §3.5.0a (5a); V02
§3.15.6; J-V7.94). The marker is `RuinRecord.marker`, the ruin's centre ((2)) and its ruin-entrance candidate. Without a dossier
source a ruin has no marker until an opening or an excavation makes one. The unexcavated style and its toggle are V09's; the
explanations V10's ("the ruins under the green; nobody has dug down yet"; "the smith's cellar broke into the cave").

**(7) Over time.** Every building V07 §3.12's village siting adds over a void takes (i)'s draw, so the accessible share rises as the
village grows (item 109 (j) (3)); excavation, sealing and ruin decay over epochs are V06's scheduling over V04's rules; at both
hand-offs the voids, their access points and their dwellings carry over unchanged.

**(8) Order, determinism, cost.** The tail runs after the first map (V04 §3.1); its draws are on `sewer` (V07 §3.14). With the
ruin chance 0 and the base's relief, boost and fissure rows the village is byte-identical to the build without these kinds
(T-V7-38). Its cost is V04 §6's village columns (the whole tail ≤ 10 ms p95 at each village rung, after the first map, outside
V07 §6's model law).

### 3.17 Edges — every mechanism at its limits (principle (11))

Every village mechanism's extremes have a defined outcome (J-V7.143), a rung of its failure ladder (§5: check, repair locally, retry that
piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test; T-V7-60 runs every row on the
edge fixtures, at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo,
redo, regenerate and migrate. The edge classes: **none** (no input), **one** (exactly one item), **cap** (the maximum and its
caps), **degenerate** (zero-length, zero-area, self-touching, collinear, coincident), **data** (missing, empty or contradictory,
the dossier included), **rungs** (every rung and toggle), **lifecycle** (save, load, undo, redo, regenerate, migrate). At a base
rung (TOWN to the cap) no village stage runs — the product's stage set decides (V07 §3.0) — so every row's rungs clause is its
THORP–VILLAGE range plus that statement.

**(a) The mechanisms.**

| mechanism | the extremes and their defined outcome | rung | test |
|---|---|---|---|
| the records (V07 §2.3): yard-part kinds, the named beach | data: a landmark string whose host is absent (no landing for `Net mending post`, no wood yard for `Timber stacks`) lays nothing and is listed in the gazetteer, reported `W_LANDMARK_NO_HOST`; `Beaching ground` with no `beach` run on any shore takes the landing's own shore run, and with no landing no label, reported; an unknown yard-part kind in a table row fails the table compile (§7.6) | leave out and report | T-V7-60 (a) |
| the request block and `villageForm` (V07 §2.7) | data: a `villageForm` naming no `v.` key fails the compile (V11 §2.3), never a run; a request `densityDial` outside [0.5, 2] is clamped and reported; `arableFactor` outside [0, 4] clamped; `water: 'island'` with an explicit `roads` other than `isolated` is an F-EDIT conflict whose dry run offers `isolated` | check | T-V7-60 (a) |
| the pipeline (V07 §3.0) | none: P = 1 runs every stage (one household, one dwelling, no institution by the presence laws at 1 person) and the frame is `territory.minKm2`; degenerate: a stage whose inputs are empty (no water, no road topology `isolated`) runs on empty inputs and writes empty outputs, T-V7-3's one-producer check unchanged | check | T-V7-3, T-V7-60 (a) |
| S0's draws (V07 §3.1) | none: every field `auto` draws in the stated order; one: a single-entry weight row (every other weight 0) draws that entry with no draw consumed beyond the one `u`; data: a dossier's fixed access word (`isolated`, `none`) beside a bridge-implying record reads V08 §2.6b (3)'s failure (`toll_bridge_dry`); a request and a dossier never both fill one field (the dossier fills the request, V07 §3.11); rungs: every weight read at `P` by the anchor law, clamped at the THORP anchor below 40 and the VILLAGE anchor above 700; lifecycle: `autoResolved` recorded, Regenerate (keep) re-reading it, New random on the village scope redrawing the `auto` fields, a changed request re-deriving from S0, an absent block reading all-`auto` on load of an older document | check | T-V7-1, T-V7-60 (b) |
| VS1 (V07 §3.2) | degenerate: a lattice with no dry cell above the flood line → F-V-HEART; polyfocal nuclei that cannot all be spaced → as many as fit, `k` reduced and reported; a course whose chord passes outside the frame is re-drawn by F-RIVER's rung (§5.2); zero-length resampled course segments dropped; lifecycle: the plan's recorded inputs (heart, nuclei, character, `R_s`) kept by Regenerate (keep), re-derived by Re-derive from VS1, a moved heart undone by `setAttr`'s inverse | repair locally | T-V7-4, T-V7-24, T-V7-60 (b) |
| VS2's density (V07 §3.3) | cap: the box clipped to the frame, so the raster never exceeds (frame side ÷ `densityCm`)² cells (≈ 314 000 at P = 1 499), priced by V07 §6; `δ` clamped to `density.dial`; `Δh` 0 (a flat box) reads `bandMinM`; an arid row with `w_water` at its maximum and no reliable water leaves `wp` 0 | check | T-V7-19, T-V7-60 (b) |
| VS3's palisade (V07 §3.4) | none: no kept point → F-V-PAL; one: one kept point → F-V-PAL; degenerate: collinear kept points count as fewer than 3; a reach replacement whose connector would cross the trace is not made (that run keeps its trace), so the trace never self-touches; data: a dossier wall record over an empty density box → F-V-PAL's dossier rung (a ring of `0.8 · R_s`); a `patched` run with no patch row for its kind and culture takes V11's kind default row; rungs: THORP with a palisade (chance 0.10) traces as every rung; every run `standing` under `VG` | simpler shape | T-V7-6, T-V7-31, T-V7-62, T-V7-60 (c) |
| VS4's network (V07 §3.5) | degenerate: a zero terrain gradient (a flat cell) gives `t` = the current heading; a step that would re-enter the tracker's own last four steps → F-V-TRACK; a frame shorter than one step lays no tracker and records the entries at the frame; branch spacing wider than the frame: no branch; lifecycle: ways keep their lineages (V07 §2.5) through Regenerate (keep) and every re-derivation, an edit's undo restoring its ways by the event's inverse | retry that piece | T-V7-7, T-V7-46, T-V7-60 (c) |
| a raised way on a village map (V07 §3.5a) | degenerate: two feet within `raised.endSnapM` of one vertex join it once (two `T` junctions on one vertex); a zero-length span (coincident supports) is one support; a raised way wholly outside the perimeter changes no slot; a support on the frame's edge is clipped to the frame as an obstacle | check | T-V7-46, T-V7-52, T-V7-60 (c) |
| the open space (V07 §3.6) | none: `open: 'none'` or the `dispersed` form: no reservation, the market to a flanking square; one: one nucleus; degenerate: a rim of `open.rim`'s minimum on a shape meeting water → F-V-OPEN; data: a dossier market record with no open space → the flanking square; rungs: the space scaled by `open.scale` at every `P`; lifecycle: a hand-moved space held (V07 §4.3) | simpler shape | T-V7-8, T-V7-60 (d) |
| VS5's perimeter (V07 §3.7) | none: no populated cell → the perimeter is the open spaces and the mill reservation united (F-V-DENS having run), else a disc of radius `R_s` about the heart, reported; one: one nucleus; degenerate: a perimeter touching the frame is clipped to it; an interior of exactly `slot.backCloseHa` stays (the cut is "more than"); rungs: every rung | substitute | T-V7-5, T-V7-60 (d) |
| VS6 and the slot race (V07 §3.8) | none: no frontage run → F-V-SLOT; one: one slot takes the whole quota's first dwelling; cap: a quota above the raceable slots → F-V-SLOT's rungs; degenerate: a run shorter than one slot's minimum width lays none; data: a housing range forcing more dwellings than slots → F-V-SLOT (never a drop); rungs: every rung; the grandeur ceiling at THORP, HAMLET and VILLAGE (item 115) | simpler shape | T-V7-2, T-V7-9, T-V7-63, T-V7-60 (d) |
| levelling (V07 §3.8a) | degenerate: a platform of zero area (a footprint outside its toft) is not levelled; a walled interval shorter than one `edgeSampleM` step lays no wall; a plane fit on fewer than 3 distinct samples is flat (gradient 0, not levelled) | check | T-V7-47, T-V7-60 (d) |
| the hinterland (V07 §3.9) | degenerate: a hinterland face of zero area is skipped; a furlong below `fields.furlongHa`'s lower end joins its neighbour in the same great field; a great field left without a face keeps its slot and is tombstoned (V07 §2.6) | repair locally | T-V7-11, T-V7-17, T-V7-60 (e) |
| the wharf, ends and pins (V07 §3.10) | none: no dockable run → no wharf, the landings' single piers; one: one pier; cap: the pier count's law, the ends' cap 6; degenerate: a dockable run shorter than one pier spacing lays one pier at its densest vertex; data: a `market_cross` record with no market → the through road's frontage nearest the heart; a `@pin:<kind>` of a kind VS8 has no row for is placed at the heart's nearest free junction; rungs: every rung; lifecycle: a forced pin across undo, redo and an absorb follows V07 §2.6's rows | substitute | T-V7-13, T-V7-35, T-V7-60 (e) |
| deck plots (V07 §3.10a) | degenerate: a pier shorter than `deck.headM`'s length takes no head; a head over dry ground (a pier ending on a shoal) takes no plot | leave out | T-V7-49, T-V7-60 (e) |
| the dossier readings (V07 §3.11) | degenerate: a quarter claim with no anchor → a `claim` anchor at the claimed class's place; data: a housing range with `min > max` is the port's refusal (V08), never read here; a population outside `[1, 1 500)` never reaches the village rows (§1.1, item 202) | check | T-V7-13, T-V7-21, T-V7-60 (f) |
| epochs and the hand-offs (V07 §3.12, V07 §3.12a) | degenerate: an epoch whose target equals the standing population adds nothing and removes nothing; a hand-off down whose principal market's centroid lies in water puts the heart at the nearest dry cell; a replay with no peak runs no history (§4.11 (7)); lifecycle: an epoch undone after a save restores its record's ops on load, since the log is the document (§2.9) | check | T-V7-13, T-V7-14, T-V7-59, T-V7-60 (f) |
| the failure ladders (V07 §3.13) | none: a ladder with nothing to act on returns unchanged and reports nothing; degenerate: a ladder whose every rung fails ends at its last rung's report, never a retry; data: a contradictory dossier (a wall record at a `none`-access dossier) builds the wall and the dead-end topology | leave out and report | T-V7-4 – T-V7-11, T-V7-60 (f) |
| determinism (V07 §3.14) | none: a stage with no draws consumes no stream index | check | T-V7-18 |
| the underground at village rungs (V07 §3.16) | none: no cavern and no ruin → the tail lays nothing, byte-identical; one: one void element takes the access draws alone; degenerate: a void element whose headroom falls below V04's minimum is created collapsed (V04 §3.5.5 (b), V04 §3.5.0a) | leave out | T-V7-38, T-V7-60 (g) |
| editing (V07 §4.1–V07 §4.4) | none: an undo with no village edit in the log changes nothing; one: a lasso holding one plot declares a one-plot end; degenerate: a zero-length stroke (T4 `road`'s walk mode, T3 `wall`, a lasso of zero area in `declareEnd`) is a dry-run F-EDIT refusal of shape, never an event; data: an edit whose target a dossier absorb removed is a dry-run F-EDIT naming the absorb; rungs: every tool at every village rung; lifecycle: every edit kind's V07 §4.4 row | check | T-V7-22, T-V7-54, T-V7-60 (h) |
| the clerk (V07 §4.5) | degenerate: a `why` on a zero-area end or a field with no face answers its anchor's or system's line; data: a `why` on a superseded `VillagePlan` answers from its record with the "when this was a village" line; a village with no end answers the one district; lifecycle: the provider reads committed records only | check | T-V7-61, T-V7-60 (h) |
| rendering, labels, exports (V07 §5.1–V07 §5.4) | none: a village with no palisade, green or field draws the rest; one: a one-dwelling THORP exports every format; degenerate: a label on a zero-area end is dropped by §9's rules; data: a dossier title word absent → the rung's word; rungs: every rung, `painterly` and `ink`; lifecycle: every export re-derived from the committed model | leave out | T-V7-25, T-V7-60 (h) |
| the one-time waits (V07 §6) | cap: every one-time wait at P = 1 499 on the largest frame, an epoch and the history replay included, within the comfort level, the target misses declared; a wait past one second shows its progress; rungs: every village rung on the reference machine, the low tier's unreachable sizes declared per device (item 119 (e)) | check | T-V7-67 |
| Find at the village rungs (V07 §5.5) | none: no chip on, the view unchanged; one: a class with one member glows once, its count 1; data: a chip whose end or field an epoch, an edit or a hand-off removed stays at count 0, dark, until removed or revived; rungs: THORP with no end (the village itself the one area and gaps unit), HAMLET, VILLAGE, under `VG`; lifecycle: the `find` key never in the document — saved in view pins only, untouched by undo, redo, regenerate and migrate, re-evaluated at every commit | check | T-V7-68, T-V7-60 (h) |

**(b) Combinations** (two units' features meeting at their limits; the rung is a failure ladder's where the outcome is one,
"—" where it is a rule):

| combination | defined outcome | rung | test |
|---|---|---|---|
| a village that grows over a sealed cavern or ruin | each building the epoch adds over the void takes V04 §3.5.7 (d)'s draw (V07 §3.16 (7)); dwellings only after access | — | T-V7-38 |
| a raised way over the palisade | the stretch abuts the standing supports (a `cleared` one none), no gate under the deck (V07 §3.5a (4)) | — | T-V7-52 |
| a raised way beside the fair field | the fair field slides clear of the strip and the standing supports | F-V-FAIR's ladder | T-V7-13 |
| a deck plot on a bridge over a moat | none at a village rung: the manor's moat is a yard part, never water a bridge crosses (V07 §3.8) | — | T-V7-60 (i) |
| a retaining wall on a cliff edge | no house platform's wall stands along a cliff bank, a cliff or sheer arc or a cliff inside the district: the cliff face holds the ground and the platform keeps the cliff setback (V07 §3.8a (2)); the palisade's barrier closure treats the cliff as a barrier, never the wall | — | T-V7-47, T-V7-31 |
| an oasis inside the palisade's reach | its shore is a barrier (V07 §3.4 step 5 a); the palisade never fences it | — | T-V7-58 |
| an oasis village with an arid climate cell | the sun terms at the climate cell (0 or toward shade), the water pull carrying the crowding (V07 §3.3) | — | T-V7-58 |
| a dossier removing what an edit pinned | the dossier wins (item 20); the pin lapses by §7.7's lapse rule, reported | leave out and report | T-V7-13 |
| an epoch undone after a save | the undo record in the saved log restores it on load (§2.9, §7.4) | — | T-V7-14 |
| a patched palisade at the hand-off up | the runs keep their condition and material (V07 §3.12 step 1); the town's walls step governs from TOWN | — | T-V7-62 |
| a manor specified at a HAMLET by a dossier | kept with its full design (item 115 (c)); a second manor never generated | — | T-V7-63 |
| a refounded village over a ruined town wall | trackers cross at its gate gaps and breaches (V07 §3.12a (4) (d)) | — | T-V7-59 |
| a village over a buried former city and a well that meets it | the well is an access (V07 §3.16 (3) (ii)); the buried system in maintenance mode | — | T-V7-59, T-V7-38 |
| the zoom-out limit at a village that grows its frame | the limit moves with the bounds (item 116 (d); V07 §5.2) | — | T-V7-64 |
| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |


## 4 Editing — declarations, events, locality, undo and the clerk's view

Everything a village has is editable with item 101's twelve tools (§7.1's *The authoring toolkit* and its binding); the
village adds no thirteenth tool — two parameters and one sugar expansion (item 357) — and every declaration is held
(declared means held, §7.2) until its author changes it, bent to the nearest lawful form by its dry run otherwise (item 101
R2): no village tool refuses a declaration that contradicts no dossier fact and no lock.

### 4.1 The twelve tools on a village

| tool | what it does on a village | events (§7.1) | derived by |
|---|---|---|---|
| T1 `intend` | the site card carries the village's form (grown, street, green, nucleated, polyfocal, row, dispersed), water (an oasis on an arid site included, item 111), palisade, field system, organic roads, orchards, the forest and the field factor; the size is the population; the density and wealth sliders; the history option ("once a city, now a village", §4.2 S0; V09), which replays a village over a former settlement (V07 §3.12a) | the recipe's intent at creation; afterwards Adjust / Re-derive on `VillageRequest` (V07 §2.7); a form edit that makes the held `forest_strip` unlawful is bent by its dry run to `open_field` with a one-line note (item 101 R2) | S0's resolution (V07 §3.1) |
| T2 `ground` | reshape the ground; draw a brook or a pond; add or remove an oasis (the lake's point-and-level form with its spring flag, item 111 (a)); move the course-first river's knots; **draw a terrace** (item 110 (a)): the faces under the stroke are levelled and walled along its edge — a field terrace or lynchet included (J-V7.87); retype land by the land-use chip | `setField(terrain)`, `warp`, `drawWater` (its `spring`), `moveCourseKnot` (the course's knots are `WaterBody.controls`, V07 §3.2 (2)); the terrace stroke (item 110 (a)'s T2 form), its edge a drawn `RetainingWall` where the step exceeds `terrace.stepMinCm`, held; `convert` `retypeLand` (item 209) | S1's operators (§7.3); S10–S11's levelling inside the perimeter, the hinterland unit outside |
| T3 `wall` | draw a palisade, a bank and ditch or a stone circuit; add a gate; let a river, cliff or marsh close it; repair a run robust or with a patch (item 114 (f)); draw a **retaining wall** (item 110 (a)) — held, never an enclosure | `drawWall` with `kind` ∈ `palisade`, `earthwork`, `inner`, or `retaining` (a `RetainingWall`, its high side picked by the drawing direction or the ground, the plots it crosses re-levelled; a way it crosses becomes a stair or ramp by V07 §3.8a (7)); its points form derives the village trace (VS3's smoothing and pull between the points, closing when the ends meet); a stretch's end snaps to a barrier within the reach and the barrier arcs show as part of the circuit (item 106 (g), V09's snapping); `placeGate`; `repairWall` with its material (robust, or one of the kind's patch rows, V07 §3.4 (8); V09's panel) | VS3's construction with steps 5–6; S7 |
| T4 `road` | draw a road, lane or track between points — or **walk** one from a point in a direction, as the village's own roads grew; draw a **raised way** or an **aqueduct** (item 110 (b): the user may add one at any rung); retire, efface or reopen a way by its way chip | `drawWay` with its class and the `walk` parameter (§7.1; item 357; V07 §4.2); `raised: true`, or the aqueduct class, **by points only** — `walk` with `raised` is bent by its dry run to the points form (a walker follows the ground), with a one-line note (item 101 R2); the dry run shows the count badge (V07 §3.5a (10)); `convert` `retireWay`, `effaceWay`, `reopenWay` (item 268), its dry run keeping every live plot's access — a stretch that is some plot's only access stays in use with a one-line note | S4's router (points) or VS4's tracker (walk); a raised way by the base's raised-part commit, the village stages around it (V07 §3.5a) |
| T5 `quarter` | at a village rung: **declare an end** by lassoing its houses (item 101 R4: areas are lassos), with its kind and name; the anchor defaults to the most significant entity inside (the church, the manor, the mill, the open space, else the lasso's centroid) or is picked (a point, a building or a pin) | the sugar `quarter` expands at village rungs to `declareEnd` with its `boundary` (§7.1; item 357); the dry run shows the count badge | VS8 (the lassoed plots join the declared end; the rest their nearest anchor; declared ends held, never merged or capped) |
| T6 `place` | place the village's heart, the church, the mill, the manor, a well, the green's centrepiece; assign a use; place on a **deck face** (a pier head or a widened bridge): a store, a net shed, a boat shed, a toll house or a chapel (V07 §3.10a (4)); place or reshape a building grander than the rung's ceiling (item 115 (c): honoured, never refused; the clerk notes it exceeds the tier's usual) | `placeAt` (point form); the heart is `placeAt` of `VillagePlan.heart` (`heartSource: 'edit'`); `assign`, `build`; on a deck face, S10b's request path with V11's `deckOk` in the village reading (a dwelling there is bent to the nearest toft with a note); a works-and-shop split by `assign` with the new use's `branchOf` naming the works' use (item 310), held and merged back by its inverse | VS1 (the heart); S10b's solver (a class; a mill bent to the nearest mill seat, V07 §3.2 (7)) |
| T7 `roster` | list what the village must hold ("a church, two alehouses, a smithy by the ford") | `roster`; with a dossier the author may only place (§7.1) | S10b claims-first |
| T8 `fill` | brush "more houses here" or "fewer"; draw a green; brush the class mix | `setField(density)` on the village density field; `drawGreen` with `kind: 'green'` (a green `Reservation` and its `Greenery`) | S10a quotas and the slot race in the touched blocks (V07 §4.3) |
| T9 `shape` | split or join tofts; build on a close; move a house; set a croft's depth; change a furlong's strips; widen a deck | `split`, `join`, `build` (a close becomes a toft), `moveFootprint`, `setAttr` (yard parts, `furrowAxisCdeg`, `rotation.slot`, a deck's width, a generated wall's material), `drawFootprint` | S10–S11 in the plot; the hinterland unit in the furlong |
| T10 `hold` | lock a toft, the green or the church; revert; regenerate the village (keep) or re-roll a block's houses, the roads or the fields; **delete** anything, a raised way included (item 110 (b): "a removal is an edit that holds through regeneration") | `lock`, `pin`, `revert`, `regenerate`; New random on a block re-races its slots, on the plan redraws the `auto` village draws; `rerollLayer('village.track')` re-grows the roads; `delete` — a declared raised way by its declaration's inverse, a carried generated one by V06 §3.19.3's suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it back" (V09 §4.3's gesture) | as scoped (V07 §4.3); a raised way's removal by V07 §3.5a (10) |
| T11 `name` | name the village, an end, a green, a lane, a great field, a common, a wood | `setAttr(name)` on `VillageEnd`, `VillageField`, the reservation, the way; `moveLabel`, `hideLabel`, `group` | S13 |
| T12 `dress` | the painterly or the ink look; show fields, relief, the spotlight, the shade map, the underground (with the unexcavated voids, V09's toggle), the palisade's whole circuit (`LayerSpec.showCircuit`, item 413); re-roll the woods' trees (**New trees**) | `setStyle`, `setLayer`, `paintGround`; `rerollLayer('render.instances')` (New trees: town-wide and display only — the trees, hedgerows and render-time field strips re-drawn, nothing else moving; §6.1, §7.1; V09 §4.5) | V07 §5 |

The underground under a village — a cavern or ruin drawn or pinned, an access dug or sealed, a void excavated — is edited with
V04's tools and events (`drawTunnel`, `drawChamber` with system `ruin` or `cavern`, `addUndergroundAccess`, the closure states;
V04 §4), their lifecycle rows and undo V04's; a church's crypt is its building's basement, edited by V02's and V03's events.
**The count badge** (item 101 R14): the dry runs of `declareEnd`, `drawGreen`, the density brush, a raised way's add and
removal, a retaining wall and a terrace stroke show the plots, households and buildings they touch before commit. The supply
links (item 105 (j)) are pinned, moved or cut by the base's link events through V09's link view, stored map-side and never
written to the dossier; at village rungs they add nothing: a cut link between the bakehouse and the mill makes the
bakehouse's flour an import. **Item 110's edits at village rungs**: a drawn retaining wall, a terrace stroke, a declared raised
way and a placed deck plot are declarations, held through Regenerate (keep) until their author changes them; a generated wall
(V07 §3.8a) is edited by `setAttr` on its material or by drawing over it (the drawn wall wins and holds); a deck is widened by
`setAttr` of its width, which makes its face buildable (V07 §3.10a (2)).

### 4.2 The new event forms

The forms are §7.1's (item 357): `declareEnd { anchor?, boundary?, kind, name? }` and `drawWay`'s optional `walk { headingCdeg,
class: 'road'|'track', maxLengthM? }`; `retypeLand { landUse, to, crop?, rotation? }` is V06's `EvolveOp` member, one op
for both volumes (item 209). Their village semantics:
* **`declareEnd`** — the sugar `quarter` at a village rung expands to it; it creates a declared `VillageEnd` keyed by this
  event's address, held; an absent `anchor` is the most significant entity inside the boundary; the lasso's plots join it
  whatever their nearest anchor (V07 §3.10).
* **`walk`** — one tracker from `points[0]` by VS4's step rules (V07 §3.5), its branches off; the dry run resolves the laid
  spine into `points`, and the stored spine is the recorded input (never re-walked). `walk` and item 110 (b)'s `raised` flag
  are exclusive: a `drawWay` carrying both is bent by its dry run to the points form (the walked spine resolved into
  `points`, the walk dropped) with a one-line note — a walker follows the ground and a deck does not (item 101 R2).
* **`setAttr`** reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a
  recorded input, V07 §2.3; a changed `form` or `roads` sets its source to `edit`), `VillageRequest.*` (T1's Adjust events),
  `Reservation.kind` between `green` and `plaza`, `Enceinte.kind` among the village kinds, `VillageField.name` and `.kind`,
  `VillageEnd.name` — each with the base's dry run, fate report and inverse (§7.1, §7.4).

### 4.3 Locality — what each village edit re-derives

| edit | re-derives from | effective scope (§7.3) | fate report says |
|---|---|---|---|
| heart moved (`placeAt` of the heart), form or road topology changed, nuclei edited | VS1 | the settlement: VS1–VS8 and the S7–S11 stages on the district; the hinterland only on faces the perimeter's move touches; locked and pinned entities held, declared entities re-placed by their declarations | a coarse edit: "the village is re-laid around the new heart; N houses move" |
| character (`branchSpacingM`, widths, `turn`) | VS4 | the network and everything after it in the district | as above |
| density brush (T8 `fill`) | S10a | the blocks the stroke touches: their quotas re-allocated among themselves (their sum kept), their slots re-raced | "N houses in the brushed blocks" |
| `drawGreen` | VS4's open-space step for the green only, then VS6–S11 | the blocks the green overlaps or fronts: frontage re-laid around it; quotas among them | "the green takes N tofts; they move within the same blocks" |
| `drawWall` (village kinds) | VS3's form, then S7 | the wall's band: plots and footprints in the band cleared and re-cut (S10 on the touched blocks); gates where ways cross | "N plots in the wall's band" |
| `repairWall` on a palisade run (item 114) | the run's condition and material | the run alone | "the gap is closed with hurdles" / "rebuilt in timber" |
| `drawWay` (points or walk) | VS6 on the faces it splits | the split blocks: runs, slots and quotas re-derived there | "N plots re-cut beside the new road" |
| `declareEnd` | VS8 | the ends only: the lassoed plots join the declared end, the others re-assigned to anchors; labels | "N plots, H households join the new end" (the count badge) |
| a class placed or assigned | S10b's request path | the target plot and the relocated occupants (§4.7) | the base's |
| a market hall's claim or the fair field moved (T6 `place`'s `placeAt` of its member) | VS4's claim step (V07 §3.6 (4a)) along the rim, or VS5's fair step (V07 §3.6 (4b)) at the point | the open space's remainder and the hall's plot; or the fair field's face and the commons around it (S12a on those faces) | "the hall moves along the green's edge" / "the fair field moves; N ha of common re-laid" |
| field system changed (T1 Adjust) | S12a | the hinterland unit's faces; the outlying farmsteads re-sited; nothing inside the perimeter | "the fields are re-laid; N farmsteads move" |
| an oasis added or removed (T2 `ground`) | S1's water and the fields it feeds: VS2 (the water pull), then as a density stroke's scope inside the perimeter, S12a outside | the blocks whose density the pull moves re-raced with their quotas kept; the gardens and grove re-laid | "N houses move toward the new water" |
| `retypeLand`, a furlong's `rotation.slot`, `furrowAxisCdeg` | the hinterland unit on that face | the face | the base's |
| `retireWay`, `effaceWay`, `reopenWay` | the network's readers of that way | the way alone: no live plot takes its access from a hollow way, so no frontage moves; a reopened way's runs are raced again only by regrowth | the base's |
| New random on a block | S10b's race in that block | that block | "N houses re-chosen in this block" |
| `rerollLayer('village.track')` | VS4 | as a character edit | as above |
| T3 `wall` `retaining` at a village | S10–S11 in the plots it crosses | those plots re-levelled and re-cut; a way it crosses gets its stair or ramp (V07 §3.8a (7)) | "N plots re-levelled beside the new wall" |
| T2 `ground` terrace stroke | S10–S11 inside the perimeter; the hinterland unit outside | the faces under the stroke re-levelled; their plots re-cut; the furlongs beneath re-cut | "N plots and M fields re-levelled" |
| T4 `road` raised way or aqueduct added | V07 §3.5a (10) | the blocks whose raceable slots the strip removes re-raced with their quotas kept (a shortfall passed to their neighbouring blocks), the faces beneath re-cut with the support holes, the feet joined; VS8's well coverage | the count badge: "the arches pass over N tofts; M houses move within their blocks" |
| a raised way removed (T10 `hold`'s delete or the suppression) | V07 §3.5a (10) | the strip's blocks re-raced, the faces beneath re-cut, V04's vaults under it removed in the same commit | "N slots return; the arches' vaults go with them" |
| a deck plot placed (T6 on a deck face) | S10b's request path on the deck face | the deck plot and its occupant | the base's |
| a deck widened (`setAttr` of its width) | S10 on the deck face | the deck's face made buildable; no dwelling | "the pier head can now hold a shed" |

The coarse edits are declared coarse by their dry run (§7.3's rule for a re-derivation from an early stage); everything else is
local by the recorded quotas and the lineage-keyed draws (V07 §3.14). A density stroke never moves a block quota outside its
stroke's blocks, so "more houses here" never empties another end.

### 4.4 Lifecycle of every village edit kind (§7.4's columns)

| edit kind | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `declareEnd` | the event (sugar `quarter` at a village rung) | VS8, labels, exports | log | held: its lasso's plots re-joined on every re-derivation; never merged or capped (V07 §3.10) | the event's inverse removes the end | the event's schema version; an event without `boundary` reads a point declaration |
| `drawWay` with `walk` | the event; its resolved spine stored | VS6 on the split faces | log (the spine, resolved) | never re-walked: the stored spine is the recorded input | inverse removes the way; faces re-joined | as `drawWay` |
| `retypeLand` (one lifecycle row with V06's, item 209) | `convert` (hand) or an epoch's op | S12b, the hinterland unit, render | log / the epoch record | kept | the conversion's undo record | new op kind, versioned |
| `retireWay`, `effaceWay`, `reopenWay` (a hand `convert`, or the epoch's ops at a village rung) | the event or the epoch's op | the network's readers (a hollow way read by none), V07 §5.1's `hollow_way` role, GeoJSON `hollow_ways` | log / the epoch record | kept | the conversion's undo record | new op kinds, versioned |
| `setAttr` on `VillagePlan`, `VillageRequest`, `VillageField`, `VillageEnd` | the event | as V07 §2.6's rows | log | the recorded value read on regenerate | inverse | as V07 §2.6 |
| village density stroke | `setField(density)` | S10a, the race | log (strokes) | strokes composited onto the recomputed raster (§7.2) | stroke inverse | as the base field |
| `drawGreen` (`kind: 'green'`) | the event | VS6–S11 | log | the drawn green held (declared) | inverse | as `drawGreen` |
| `drawWall` `retaining`; the T2 terrace stroke | the event | S10–S11's levelling, the hinterland unit, render, exports, the clerk | log | held (a drawn wall, a stroked terrace) | the event's inverse | absent in an older document: nothing |
| `repairWall` on a palisade run, with its material (item 114) | the event (T3 `wall`) | the run's condition and material: render (V07 §5.1), exports, the clerk | log | held: the run keeps its repaired state until an epoch's walls step or a later edit changes it | the event's inverse restores the run's condition and material | an older event without a material reads robust |
| `drawWay` with `raised` or the aqueduct class | the event | the stages of V07 §3.5a (VS3–VS6, S10, S12a, the hinterland unit, VS8), V04's arch-vault source | log | held; its feet re-joined at every derivation (V07 §3.5a (3)) | the event's inverse | absent: nothing |
| a raised way's removal (T10 `hold`'s delete; V06 §3.19.3's suppression) | the event | the declaration layer (`raised`), V06 §3.19's ledger from the first CITY epoch | log (the reason key for a generated way) | held through Regenerate (keep), every village epoch and both hand-offs (V07 §3.12) | the event's inverse restores the way and its vaults with their ids | absent: nothing |
| a deck plot placed; a deck widened | the event | S10b, V02 (`DeckContext`), render | log | held while its deck stands; falls with its deck (V07 §3.10a (6)) and is re-offered when the deck is rebuilt | the event's inverse | absent: nothing |
| a grand building placed or reshaped beyond the rung's ceiling (item 115 (c)) | the event (T6 `place`, T9 `shape`) | S10b, S11, V02's composition, the clerk | log | held (declared means held); never reshaped down by the ceiling | the event's inverse | absent: nothing |

### 4.5 The clerk's view

The clerk (V10, over §11.2's tool API) reads the same records a person sees: the `VillagePlan` (form, heart, character, the
sources), the ends, the fields, the palisade and the dossier's facts; it proposes with the twelve tools and its proposals are
dry runs shown as ghosts (J-A101.74). **Describe-to-map** on a village returns a skeleton — "a green village by a ford, the
church on the rise, a watermill below the ford, three open fields" becomes `intend` (VILLAGE, 600 people, form `green`, water
`stream`), `place` (`v.parish_church`, high ground within 200 m of the heart), `place` (`v.watermill`), `intend` (field system
`open_field`) — never a picture.

**The village `WhyProvider`** (V10 §3.9's owed table; item 270's interface (§2.8); W74; J-V7.140). `@plat/village` registers one
`WhyProvider` whose `kinds` are `VillagePlan`, `VillageField` and `VillageEnd`; it answers §11.2's `why` in `asPlaced` and
`asNow` modes (V10's `WhyAnswer`) from the committed records alone — the heart's terms recomputed by VS1's score (a pure function
of the site and the recorded inputs, never stored) — as rows of V09 §4.9's catalogue (their words written here):
* `info.village.heart` — the heart's score terms ("the heart is at the ford (+0.6) on the sunny slope"), or "you moved it"
  (`heartSource: 'edit'`);
* `info.village.form` and `info.village.roads` — the form and the road topology with their sources (`formSource`,
  `roadsSource`): drawn, asked, the dossier's (the culture that weighted it, the access word) or yours;
* `info.village.end` — an end's kind and anchor, derived or declared, and the dossier quarter that claimed it;
* `info.village.field` — a field's system and kind, its rotation slot, a strip's holder ("this strip belongs to the third toft
  on the street");
* `info.village.platformWall` — a generated wall's platform and its step ("This wall holds the house platform above the lane —
  the ground falls 22 % here"); a scarp ("The terrace of a house that stood here until year N");
* `info.village.raisedCarried` — a carried raised way ("The arches were built in year N, when this was a city, for its water;
  they outlived it"; `RaisedRead.origin` and `reason`); `info.village.belowCity` — the village rungs' `belowCity` wording
  ("No viaduct here: villages never build them; you may draw one"); a removal ("You removed the viaduct; the town will not
  rebuild it");
* `info.village.palisadeRun` — a palisade run's condition and material and its epoch ("patched with hurdles in the lean years;
  rebuilt in timber when raiders came"; item 114 (f)); `info.village.unwalled` — an unwalled side from the barrier arc that
  closes it (item 106 (g): "the river is the wall here"; "the scarp is the wall here");
* `info.village.ceiling` — a building grander than the rung's usual ("the dossier names this hall"; "you placed it"; item 115
  (c));
* `info.village.remnant` — a village over a former town (V07 §3.12a): "the village grew in the old town's core"; the story
  itself is V10's from the replay record ("the walls were built when this was a city of twelve thousand"; for a symbolic peak
  "its exact size is not recorded");
* `info.village.superseded` — a superseded plan ("the old village, now the town's core");
* `info.village.season` and `info.village.festival` — a seasonal look and a festival shown ("the millpond is frozen: it is
  midwinter, and winters here are cold"; "the green is set for the harvest feast, weeks 34–35; the tables are on the green";
  items 117 (h), 118 (g)), read from view state and the dossier's schedule, never from the model.
Its completeness is item 270's test over these three kinds (T-V7-61). **The other "why"s** come from the kinds' own
providers and the section providers, reading this volume's rows: a house from its slot's density and rim multiplier and its
block's quota; a class from its V07 §2.4 profile, the relation and coverage rows the solver summed and the signature pairs that
fired (item 103 (e)); a wood from V07 §3.9's suitability terms, the shade among them (item 102 (f)); a custom institution from
its resolved profile's sources (item 104 (a)); a trade from the links and goods that pulled it (item 105 (j): "the bakehouse
stands by the green because its bread is eaten there; its flour comes from the mill at the ford"), or from the coverage and
spacing that pushed it ("the second alehouse serves the mill end; the first is 300 m away"); a market hall from its claim
("the fish hall stands on the green's edge, as halls stood on their markets"); the fair field from its record ("the annual
fair is held on this field by the north road; between fairs it is common"); a pin from the record that forced it or the VS8
row and epoch that placed it, read from its provenance ("the wayside shrine the dossier lists"; "the old shrine is the
churchyard cross now"; "a well sunk in year N for the new cottages by the mill lane"); a ladder record from its members
("Blacksmiths (3-10): three smithies, at the ford, the green and the north entry"); the underground from V04's records (V10's
rows): an unexcavated void ("the ruins under the green; nobody has dug down yet"), an access from its `cause` ("the smith's
cellar broke into the cave"; "the old mine broke into a gallery"), a dwelling from its access; a church's crypt or its absence
("most village churches had none; the dead lie in the churchyard"); a burial face ("the churchyard: where the town's catacombs
may begin"); a hollow way from its disuse epoch; a pier head ("A net store on the pier head: the landing's"); the water pull
("the cottages crowd the oasis shore").


## 5 Rendering, labels and exports

### 5.1 The look — the `painterly` family built, `ink` one click away

The village product opens in the **`painterly`** family — the base reserves the slot for VG's look (§8.2) and this volume
builds it at all four bands — and every other family draws a village from the same display list (§8.1), `ink` one click away
(J-V7.25). The family's style sheet is data (§8.2): roles, programs, layer order, palette on §8.2's targets (the
corpus-anchored bands, item 69) — our own colours, never VG's (§17.1). Its programs (each a `PaintProgram` in §8.2's registry,
the constants ours unless a provenance says otherwise):
* **Ground.** A ground ramp by relief class and moisture over the paper tone; the base's `hillshade` on the terrain field
  (multiply for the shade side, add for the lit side, at 0.5 and 0.25 strength) and the relief tier **on** — contours,
  hachures or grass marks by the sheet's `relief` option (§8.2's relief tier; grass the painterly default: short slope-aligned
  ticks, alternately longer and shorter, light or dark by the side they face the light from).
* **Water.** The water-band law of §8.3's census (`W · (i ÷ N)^1.5`, N = 3), a stony edge drawn as a pair of jittered strokes
  along every shore, one tide line on flowing water and two on still water and the sea (`ref:VG 1.6.9 water look (code)`,
  restated as geometry only).
* **Ways.** Through roads wide, the village street narrow, lanes narrower, tracks as dotted lines (a dash of 1 % of the width, a
  gap of two widths), driveways as flared patches, junction corner fills where two roads meet at more than 26°; fords as a pale
  band across the water with stepping marks; hollow ways (a way of a land class on ground part 0 in the `abandoned` existence,
  V07 §3.12) as a sunken double hairline with an inner shade. **`way.edgeFade`**: a road or track leaving the frame turns, over
  its last `fadeM` (60 m), into a dotted trail whose dot spacing widens geometrically (× 1.4 per dot) to the frame edge.
  **`bridge.shadow`** is `deck.shadow` (below) for a part-0 bridge: each bridge deck casts a soft offset band on the water below
  it along the light model's sun direction (§8.4), its offset the deck's height above the water × the sun's cotangent. A pier
  head is the pier's plank deck widened. **`way.stair`** (the painterly program for §8.2's stair interval): step ticks across the
  way or yard part over the stair's interval only, one tick per `stairTickM` (0.3 m) of run, the tick side toward the low end;
  **`way.ramp`** (for its ramp interval): a tapered wedge tint along the ramp, darkest at its low end.
* **Fields.** Each furlong filled with its crop's tone from the palette, varied by a bounded jitter; **strips** as furrow strokes
  along `furrowAxisCdeg` at the strip width, dashed from a small set of dash patterns, the headlands left plain; enclosed fields
  hedged by the hedgerow instances (§8.10); orchards as rows of crowns (a jittered grid, §4.9); meadow a fine stipple, commons a
  coarse one; an oasis's irrigated gardens in the garden tone with their channels as water hairlines; great-field boundaries a
  faint dashed line at the township band.
* **Woods.** **`crown.bands`**: along each wood's margin, a **rim** band of separate full crowns, then one or two **muted** bands
  of crowns offset inward and drawn at `mutedMix` (0.35) toward the wood's fill tone, and a **solid interior** — a billowed
  thicket fill; **`crown.groupShade`**: each crown shaded on its side away from the light, and a cluster of touching crowns shaded
  as one mass on its far edge, with a per-crown radial gradient as a sheet option (off in `ink`). Crowns come from §8.10's
  instances on the `render.instances` stream (never stored), so T12 `dress`'s New trees (`rerollLayer('render.instances')`)
  redraws them, nothing in the model moving.
* **The palisade.** A `palisade` as a thick dark line with stake ticks every 1.5 m on its outer side; an `earthwork` as a bank
  of short hachures toward the ditch with the ditch a thin water-toned or dark line outside it; an `inner` stone circuit as the
  ink family's wall symbol at half width; gates as a gap with two posts or a gatehouse footprint. A light stretch (V07 §3.4 step
  6) is drawn at half the full stretch's weight — a wattle fence as a thin line with short cross-hatches, a low bank as sparse
  hachures, a parapet as the stone symbol at a third width; a barrier anchor as a post dot (palisade, earthwork) or a small tower
  (stone); closing arcs are drawn only as the barrier they are, and the `wall` layer's `LayerSpec.showCircuit` ("Show the whole
  circuit", item 413; V09) traces them as a faint dashed line so the enclosure reads whole. **The run conditions** (item 114;
  V07 §3.4 (8); §8.2's state rows and legend): a `breached` run a clear break in the line with a spill of fallen stakes or rubble
  at every band; a `patched` run by its `walls.patchMaterials` row's `look` role (V11 §3.25.3; §8.2's patch looks and their
  patterns) — thinner, lighter and irregular beside the robust section, at every band; a `worn` run at the district
  band and finer only (broken stakes, a slumped bank crest); a `dismantled` run as the base draws it; each state distinguishable
  in greyscale by its pattern, never by colour alone (item 112), and named in the legend.
* **Buildings** (the painterly family's signature; J-V7.73). Roof shapes are V02's roof rows (gable default for cottages and
  longhouses, hip for the manor and the church's nave by their templates). **`roof.faces`**: each roof drawn as its planes — the
  lit faces in the roof tone, the unlit faces mixed toward the shadow tone by `unlitMix` (0.45), and on each face a pair of hatch
  strokes alternating across the ridge at `hatchM` (0.8 m) spacing, parallel to the fall of the face — plus the entrance mark (a
  short stroke at the door, V02's entrance). **`roof.palette`**: the roof tone drawn from the sheet's weighted list (thatch, tile,
  slate, shingle; our own weights, about one roof in three slate where the geology row gives slate) with a per-building tone
  variance of ± `roofJitter` (6 %) keyed by the building's lineage; **`roof.oblique`**: an oblique extrusion (walls drawn below
  the roof toward the viewer by the building's height × `obliqueShare`) as a sheet option, off by default (the base's
  no-oblique-default rule). **`roof.ruin`**: a `ruined` or `decayed` building drawn as its wall ring with gaps and no roof planes,
  a `cleared` one as its footprint trace — the **house platform**, a low rectangle with hachured sides, and where the platform
  was levelled its kept walls drawn by `retaining.wall` in their decay as the scarp (V07 §3.12). **Selective outlining** (§8.2's
  outline-mix program) and cast shadows by the base's light model (§8.4; the cursor sun, on by default).
* **Item 110's structures** (J-V7.93; geometry only, our cells; the painterly programs for §8.2's item-110 roles).
  **`retaining.wall`** (the retaining-wall role): a line whose weight follows the wall's step profile (a hairline at
  `stepMinCm`, the full wall weight at 300 cm and above), with short stone ticks toward the low side every `tickM` (0.8 m), and
  the low-side cast shadow from §8.4's sun at the wall's height; a decayed stretch as a broken line with a slumped stipple on its
  low side (the scarp). **`raised.deck`** (the raised way's deck): the deck band drawn above everything it crosses, in the way's
  tone for a viaduct or elevated road, with parapet hairlines, and **`deck.shadow`** — `bridge.shadow` generalised to every deck:
  an offset band on whatever lies beneath (ground, a way or water), its offset the deck's height above that surface × the sun's
  cotangent, sampled per span; the arch openings show only under `roof.oblique`'s option. **`raised.support`** (its piers): small
  filled rectangles at the district band and finer, only their shadows at the city band. **`raised.ruin`**: a ruined span as a
  gap with a rubble stipple between its standing supports, a cleared span as a plain gap. **`aqueduct.channel`**: a thin line in
  the water tone along the deck's centre while the channel is unbroken, dry (the deck tone) once broken. **Stepped tiers** (V02's
  `tier`, `shrine` and `stair` roles, program `stairFlight`): each tier drawn by `roof.faces` at its own height, with its own cast
  shadow. **Deck-plot buildings**: the buildings program unchanged, their shadows falling on the water.
* **The spotlight.** A radial vignette (§8.2's `vignette` program in the painterly slot): **`spotlight.focus`** ∈ `heart`
  (default: `VillagePlan.heart`), `centre` (the view's centre) or `edge` (pushed from the heart toward the frame edge opposite the
  light, along the shadow angle); **`spotlight.size`** the radius as a share of the distance to the farthest visible corner (1 by
  default); a lightened centre that fades out by half the radius, then a shade that deepens from half the radius outward to the
  edge, its two intensities separate cells (`ref:VG 1.6.9 spotlight (code)` — `spotlight.core` 0.2 and `spotlight.rim` 0.8), a
  view program that never enters the model; off in exports unless the sheet says so.
* **Night.** The base's night view (§8.4 (e), item 68): lit windows by occupancy, the alehouse's and the inn's lamps, no street
  lighting in a village (the era row's public-lighting density at village rungs is 0).
* **The shade map** (item 102 (f)): a thematic view of the daylight share `D` over the settlement and the fields, from VS1's
  `daylight.terrain` with the palisade's shade (terrain and walls, item 102 (b)); a `setLayer` toggle, never on by default.
* **The village through the year** (item 117, the village's part; J-V7.141). A season is a look only: the view's year position
  (§2.9's view state, a week 0–51, spring first; a campaign dossier's own week by §7.7's derivation row, else midsummer) selects
  §8.2's season rows, with V11's season tables by climate and by field, garden and water kind giving the bands of weeks; nothing
  here moves, adds or removes a building, way, wall, field boundary or water edge, and the document hashes identically in every
  week. The village's surfaces read those rows by their own kinds: each **great field** by its rotation slot's crop (the winter
  grain, the spring crop, the fallow; the infield's continuous crop; the outfield's cropped or grazed year) — spring fresh green
  and sown strips, summer full crops, late summer to autumn ripening gold, then stubble with **stooks** (render-time glyphs along
  the strips, on `render.instances`) after the harvest weeks, winter ploughed brown and bare fallow; the **strips** carry their
  furlong's row, a strip's week offset within the band keyed by its strip index on `render.instances` so a furlong turns strip by
  strip; **orchards** in blossom in spring; the **meadow** high in summer and mown after its hay weeks; the **commons** and the
  **green** by the climate's grass rows (the green grazed short); an oasis's gardens by their climate; hedges and the wood's
  deciduous crowns by the leaf weeks, evergreens unchanged; **snow** over all of it where the climate's snow weeks lie (§8.2's
  `snow` role). **Water in winter** (item 117 (e)) by the climate's winter severity: still water freezes first — the L0 village
  pond, the green's centrepiece pond, the manor's moat and fishponds, the fair field's watering places — then the leat's slow
  reach above the mill, then a brook, a stream and a river last; open water is kept at the mill race (the wheel pit and the tail
  race), at the leat's take-off and at springs (an oasis never freezes: arid climates have no ice); drawn in §8.2's `ice` role
  with crack lines, snow-dusted where snow lies, boats at the landing hauled up on the bank while their water is frozen. The
  painterly family draws these rows in its own palette, `ink` by §8.2's ink rows; the view's sun height follows the week (§8.2),
  item 102's model daylight `D` never does. **Autumn, a plethora of fall covers** (item 117 (f2)): through the climate's leaf
  weeks each deciduous crown of the woods, hedgerows, orchards and the green's large tree takes its own colour by a draw on
  `render.instances` keyed by the crown's instance key from V11's species leaf palette (gold, amber, orange, scarlet, crimson,
  russet, bronze and brown, some crowns still green in the first weeks), so a wood's rim band and an orchard read as many colours
  at once; **fallen-leaf cover** (§8.2's cover rows, V11's densities) lies under and around the trees and drifts over the green,
  the lanes and tracks, the tofts' yards and crofts, the churchyard, the closes and the roofs, gathering at the palisade, hedges
  and yard walls, thin in the first leaf-fall weeks and deepening through them, and floats on the village pond and the moat near
  trees; creepers on the church, the churchyard wall and cottage walls turn red; hedges and orchards turn; the bracken of the
  commons goes rust and the stubble of the great fields gold; late autumn thins the crowns toward winter's bare ones.
* **Festivals** (item 118, the village's part; J-V7.142). A look only, never the model or its hash: while the view's week (item
  117's year position) falls inside a festival's `window` from the dossier's `traditions` (V08's reading; §7.7's row), or the
  user previews one (a generic spring, midsummer, harvest or midwinter festival when standalone), §8.2's decoration rows draw the
  village rungs' kinds from V11's decoration table: at **THORP** a garland or a bonfire at the heart; at **HAMLET** a maypole or a
  bonfire on the green, garlands on doors; at **VILLAGE** a maypole, bunting along the church lane, stalls and tables on the green
  — never a larger tier's kinds. **Where**: the staging prose maps to a place kind by V11's staging keyword table, read at a
  village rung as — square or market → the open space that carries the market (else the flanking square, else a street market's
  frontage by the heart); green → the green (else the first nucleus's open space, else the heart); church or temple → the parish
  church's churchyard gate and the **church lane** (the lane V07 §3.10 names so, else the shortest way from the church's door to
  the green); river or harbour → the wharf or the chief landing; gate → the palisade's gate on the through road, else the through
  road's entry; fair field → the fair field; the castle → the manor house; a dossier-named place wins where it names one; with no
  keyword, the fallback by the festival's kind (religious → the church and the church lane to the green; market or fair → the
  market's open space or the fair field; harvest → the green and the nearest great field's edge; water → the landing). Each
  decoration is placed by keyed draws on `render.instances` from the seed, the festival's id and the place, never over a label's
  keep-out, a gate's passage or a way's carriageway (bunting spans above it, stalls and tables stand on the green's turf); the
  culture's motifs and the season's (flowers in spring, sheaves at harvest, evergreen boughs and lanterns in winter) from V11's
  motif rows; by band as §8.2's rows give (colour along the church lane at the city band; the maypole, bunting and stalls at the
  district band; garlands, tables and lanterns at the neighbourhood band); item 112's pattern rule holds.

The program cells above (`fadeM`, the dot factor, `unlitMix`, `hatchM`, the roof weights, `roofJitter`, `obliqueShare`,
`mutedMix`, the spotlight's; item 110's `stairTickM`, `tickM` and the wall-weight ramp) are the
`painterly` sheet's own cells — our constants, described as geometry, never the reference's values (§17.1) — each in B-ZOOM's
role list (T-V7-25). The underground's marks under a village — the cavern's irregular fill, the ruin's masonry style, the
unexcavated style — are V04's programs and V09's toggle. New **roles** (rows in every family's sheet, with defaults so `ink`,
`lit` and `hatched` draw them too): `village.green`, `village.close`, `village.croft`, `palisade`, `earthwork`,
`palisade.light`, `wall.anchor`, `hollow_way`, `house_platform`, `strip_field`, `headland`, `great_field_edge`, `meadow`,
`common`, `ford`, `village.pond_part` (an uncarved pond part in the water tone), `roof.ruin`, the landmark yard parts'
`village.net_rack` (two posts with a hatched span), `village.drying_rack` (a short ladder of bars) and `village.timber_stack` (a
rectangle of log-end rings) (a named beach is drawn by the base's shore program as its `beach` run, no new role), and the pin
symbols `stocks` and `maypole` (§8.3's symbol catalogue gains the two glyphs and the well, pump, cross, market cross, shrine,
trough and stall glyphs at village scale, so every pin VS8, `village.pins` or a pin record places is drawn). Item 110's
structures take §8.2's roles (the retaining wall, the raised way with its piers and an aqueduct's channel, the stair and ramp
intervals), which the painterly family draws by the programs above; the palisade's run conditions take §8.2's state rows (item
114), the seasons §8.2's season rows, cover rows and its `ice` and `snow` roles (item 117), the festivals §8.2's decoration rows
(item 118).

### 5.2 Bands, the first view and level of detail

The four bands read at village scale (§8.5's `LodBand`): **city** — the whole township, the fields as tones and strip hatching,
the settlement as masses; **district** — the village with its first fields, every footprint, way and wall; **neighbourhood** —
the tofts, crofts and closes with their fences and hedges, wells, yards and the green's centrepiece; **building** — stage 3
(V02). The village has no stage-2 close-up of its own: its model already carries neighbourhood detail (J-V7.24). **The first
view** frames the perimeter's bounding box × `firstView.frameShare` (1.6; at least `firstView.minM`, 400 m, on a side) at the
district band — the village and its nearest fields (J-V7.4; item 418); the first map is the complete district band (§8.5's
rule), its relief tier, shadows and spotlight following within the settle bound (§12.5). **The township view** — the stop at
which the whole territory frame (the map's `bounds`) fits the viewport's short side — is the zoom-out limit's view less its
one-stop margin (item 116; §8.8's per-map limit): the view never settles beyond the limit, the pyramid draws no tile past it,
and a thorp is never zoomed out to a speck; the first view is unchanged, an epoch or an edit that grows the frame moves the limit
with it (item 116 (d)), and exports frame within it (item 116 (c); V07 §5.4) (J-V7.137).

### 5.3 Labels and map furniture

S13a builds, S13b places (§9.1, §9.2; collision-checked, never over a gate, the church or a well):
* **The title plate** — the village's name, its tier word (the dossier's when bound: "the hamlet of …"; else the rung's), then
  a **water qualifier** from the resolved water type (our own row: riverside, by the sea, on the island, at the ford, by the
  oasis …; `plate.qualifier`, on by default in `painterly`), and the population rounded to `plate.populationRound` (1; 10 under
  `VG`) (§9.5's furniture, item 424), in the corner that covers the fewest ways and never over the heart.
* **Ends** at the district band, curved along the end's main way or straight across a green; **the green**, **the church**,
  **the manor**, **the mill** and the inn as landmark labels; **the fair field** (our own word row, else the record's name) at
  the district band, drawn as the common it is inside the base's secondary-market outline; a named beach along its run (V07
  §2.3); a raised way as a landmark at the district band by our own word row — "the arches" for a viaduct or elevated road,
  "the aqueduct" for an aqueduct — unless it is named; **lanes** at the neighbourhood band for the lanes V07 §3.10 named; **the
  stream** along its course; **great fields**, commons and woods at the city band in letter-spaced italics centred on their faces;
  house numbers on request (§9.5's address numbers, the `marked` look of VG).
* Scale bar, compass and grid in metres, feet or squares (§9.5) — the village has real units (VG's "vague" units removed,
  `docs/improvements/vg.md` §4 (2)).

### 5.4 Exports

Every base format exports a village (§11.1): SVG and PNG by band and family, framed within the zoom-out limit and drawing the
chosen season and the festival shown, both named (items 116, 117, 118), and Find as shown with its chips in the legend
(item 120 (i); V07 §5.5); GeoJSON in metres; VTT scenes (one at the district band — the palisade and buildings as walls,
gates as doors, a `patched` run a wall and a `breached` one an opening (item 114 (f)), ice walkable only in a severe winter
(item 117 (h)), a festival's decorations in the image only, never walls or obstacles (item 118 (g)), Find off unless asked
(item 120 (i)) — and one at the city band); glTF / OBJ with heights; CityJSON; the `.plat` document; the skeleton file
(the village request, the declarations and the ends). The GeoJSON gains layers, each feature with its id, kind and name:
`village_plan` (the heart and nuclei as points, the radius), `ends` (the union of each end's plots; `declared` for a declared
end), `village_fields` (great fields, infield, outfield, commons, meadow, woods, strip holdings as multipolygons with `slot`,
`system` and a strip's `holder`), `closes` (with `reached` for a reached close), `approaches` (lines), `open_spaces` (the greens
and squares with their `market` rank, and the fair field with `kind: 'fair'`; a market hall's claim exports as its plot),
`hollow_ways` (lines, with the disuse epoch), `house_platforms` (polygons, the `cleared` dwellings, with `levelled` where the
platform was) and `landmark_parts` (the `net_rack`, `drying_rack` and `timber_stack` yard parts as polygons with `kind`, `plot`
and the landmark's `name`; a named beach as a LineString with `bankKind: 'beach'` and `name`); the palisade exports as the
enceinte it is, each run with its condition and material (item 114; §11's rows); retaining walls, raised parts (with their
supports and spans) and deck plots export by the base's mappings of item 110; the caverns, ruins, access points and crypts
export by V04's and V02's mappings. Every new entity kind has its export mapping in the entity registry (§2.8's paths; item
267), so the registry's completeness test covers it.

### 5.5 Find at the village rungs (item 120, the village's part; J-V7.145)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the panel's close, and saved only
in view pins — never in the document, its hash or the log. Every suggestion, count, glow, pin and ghost pin passes §11.2's
knowledge admission at the view's effective key (item 120 (h); V09 §4.8's View as). The panel, the type-ahead, the chip
grid, the results and the `live.find` overlay are V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the
search words and groups V11's lexicon; the gazetteer's class counts and match listing §11.2's. This section states what a
THORP, HAMLET or VILLAGE map offers and how each target reads there.

**(1) The list** (item 120 (b)), built by §11.2's gazetteer query over the committed records — nothing the village lacks
offered:
* **kinds** — every `v.` class with a standing member (V07 §2.4), the five dwelling rows included, so "farms" finds the
  husbandmen's farmsteads in the village and the outlying farmsteads in the hinterland (V07 §3.9 (5)); each under its
  `label`, its `synonyms` its search words, with its count ("Smithy · 2"), grouped by V11's groups; a town class that plays
  itself at a village rung (V07 §3.11 step 3) under its own V11 row; a word that matches a `v.` row and V11's town row of the
  same thing ("forge" → the smithy) offers the one the map holds, once;
* **named institutions** — the dossier's institution names first (V08's list entries), each bound to its members by V07
  §3.11's resolution order, a ladder record to all of them ("Blacksmiths (3–10)" → the three smithies);
* **areas** — the village itself (the one `village` district: the whole settlement lifted from the veil); its **ends**
  (`VillageEnd`, V07 §3.10), by name, else by kind and anchor ("the mill end", "the green end"), a declared end by its
  declared name; and the hinterland's **field groups** (`VillageField`, V07 §2.7): each great field, the infield and
  outfield, a common, the meadow, a wood, a strip holding by its holder's toft;
* **named places** — V07 §5.3's label rows: the green or the square, the church, the manor, the mill, the inn, the fair
  field, a named beach, a raised way's landmark word ("the arches", "the aqueduct"), the named lanes, the stream and the
  crossings (a ford or a bridge by its name, else "the ford");
* **people** — through V09's "Where is" (home and work), as at every rung.
An empty box shows the kinds as V11's grouped grid, as at every rung; at THORP and HAMLET the grid is short.

**(2) Show gaps** (item 120 (i)). At a village rung its units are the **ends** — a village is one district, and its ends are
its parts (V07 §3.10). For each chip's class, an end whose plots hold no member of the class is outlined dashed along the
union of its plots' faces and labelled "none here"; a village with one end, or none, has one unit, the village itself (its
perimeter, V07 §3.7), marked the same way. A member outside the perimeter (an outlying farmstead, the charcoal pit in the
wood, a mine's working) counts toward no unit, and a class whose row sites it outside (`outside` yes, V07 §2.4) is never
marked: a gap is a lack inside the settlement. An area or place chip has no gaps (the switch reads each chip's class, item
120 (i)).

**(3) The look at village scale** (item 120 (e), (f)). The veil and the halo are §8.2's rows at every band. At a village
rung the city band is the township view (V07 §5.2): a match whose plot falls there under about 6 px — most tofts at VILLAGE
and HAMLET, the narrow ones at THORP — carries its chip's pin, and pins closer than about 24 px merge into a count bubble, so
a village's two smithies at the ford and the green may read as one bubble "2" at the township view and as two glowing tofts
at the district band. An area chip lifts its whole area from the veil and glows along its boundary: an end's the outline of
the union of its plots' faces (V07 §3.10), a field group's the outline of its furlongs, the village's its perimeter (V07
§3.7). A match in the hinterland glows as any other, the territory frame lying wholly inside the zoom-out limit (item 116;
V07 §5.2), so no match lies beyond the view's reach. **Across layers**: on Below, a dwelling or an access in a cavern or ruin
(V07 §3.16 (3), (5)) glows on the underground layer and shows as a ghost pin on Ground (V04's part); an island a fallen city
left (V05 §3.15 (6)) carries its matches on Sky (V05's part); at the interior band an institution's rooms glow as V03's part
gives them.

**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, village epoch and hand-off re-evaluates the
chips at once: a smithy that opens at an epoch glows in that commit and one whose use closes goes dark. A chip whose target
the map no longer holds — an end superseded at a hand-off up or merged away, a field group tombstoned — stays in the grid at
count 0, dark, until the viewer removes it or presses Clear; a hand-off down revives an end at its address (V07 §3.12), and
its chip lights again. After a hand-off up the town's districts and quarters are offered by V01's reading, and the old
village's ends, sub-area labels on the quarter tree (V07 §3.12 step 2), are no longer listed.

**(5) The clerk, exports and cost** (item 120 (i), (j)). The clerk's "show me the smithies" sets the chips (V10; a view
action, never an edit). A picture export of a village draws Find as shown, its chips in the legend (V07 §5.4; §11.1); a VTT
scene leaves it off unless asked. Find is an interaction, not a one-time wait (item 119 (d)): suggestions within about 50 ms
of a key and a chip's glow within about 100 ms of the click, its index rebuilt once per commit and the base tiles never
re-rendered (item 120 (j)) — at the VILLAGE top an index of about 540 footprints, 25 village classes with the dossier's
names, at most 6 ends and the field groups of a few hundred furlong faces.

## 6 Performance budgets

Measured on §12.1's reference machine and rules. VG's own model takes 14 ms (no water) to 143 ms (a pond, cold), a whole
regenerate with rendering 240–330 ms of script (`research/findings/profile-village.md` §5); a village of ours carries a
territory, fields sized to its people, institutions and site plans VG does not, and still stays inside TOWN's one-click bars.

**Model time** (p95, the pool configuration of §12.3, single-worker fallback + 15 %): the law
`T ≤ 20 ms + 0.8 ms × frame km² + 110 µs × footprints` (J-V7.42, J-V7.61) — the frame term is the frame with its margin (1.44
× the territory at the default margin share): S1's rasters, VS1's daylight sweeps, S12a and the hinterland unit's faces,
re-derived from §12.4's measured hydrology rate (≈ 0.16 µs per cell) at the coarse village hydrology grid (V07 §2.2); the
footprint term the fabric, placement and site plans.

| rung | at the band bottom / the target / the top | p95 bar | measured against |
|---|---|---|---|
| THORP | 21 / 24 / 27 ms (frame 0.5 / 1.7 / 3.3 km²; 3 / 20 / 40 footprints) | 30 ms | the law |
| HAMLET | 27 / 35 / 50 ms (3.3 / 8.3 / 16.5 km²; 40 / 75 / 150 footprints) | 50 ms | the law |
| VILLAGE | 50 / 71 / 129 ms (16.6 / 29 / 62 km²; 150 / 250 / 540 footprints) | 100 ms up to ≈ 1 100 people; above it the law (≤ 130 ms at the top), a declared target miss against TOWN's 100 ms one-click target (§12.3's form) inside item 119's comfort level | the law |

**The VILLAGE target's split** (p50 on the critical path, PLAUSIBLE until V-M0 measures it): S0 0.2 · S1 10 (terrain at 8 m
from the 32 m fBm grid; hydrology at 32 m, ≈ 28 000 cells) · S2 1 · VS1 4.5 (the 20 m heart lattice 1; the nine daylight sweeps
≤ 3 over ≈ 72 000 cells, ≤ 6 at the top over ≈ 155 000; the lattice and its costs, the destinations, the border and ponds 0.3;
the leat 0.2) · VS2 6 (≈ 150 000 cells) · VS3 0.4 · VS4 4.5 (≈ 1 500 tracker steps, the neighbour roads' routes, the wharf and
piers) · VS5 3 (the perimeter with its interior cut) · S7 1 · S7b 0.5 · S12a 3 · VS6 1.5 (runs, reached faces, the capacity
estimate) · S9–S11 18 (≈ 70 µs per footprint, §12.4's S11 share) · S12b ‖ the hinterland unit 8 (≈ 400 furlong faces) · VS8 1 ·
S12c and S13a 2 — ≈ 65 ms against the law's 71 ms p95. Inside these figures: the barrier closure ≤ 0.5 ms in VS3 (a run scan
of ≈ 60 trace vertices against the barrier edges within the reach, one polyline splice); the supply links and the relaxation
pass ≤ 1.5 ms in S10b (≈ 25 institutions, ≤ 2 passes, nearest-provider queries on the district's plot index); the ladder members
and the entry store inside S10b's per-footprint share; S11's platform levelling ≤ 1 ms at the VILLAGE top (≈ 300 platforms,
each at most 12 samples, one plane fit and one polyline per walled edge); VS4's support test ≤ 0.2 ms with a uniform grid
index of the supports (only when a raised way stands on the map); the foot joins inside VS4's finish; the pier head inside
VS4's piers; item 111's water pull ≤ 0.5 ms in VS2 (one distance transform of the reliable water over the density grid; 0 when
`w_water` is 0); item 113's trace term ≤ 1 ms in VS4 at the top (a nearest-trace query per step on a uniform grid of the ruined
ways, only on a refounded map) and the replay's own budget V06's; item 114's generation-time condition a table read per run;
item 115's ceiling a row read in S10b; items 117 and 118 no model time (looks, drawn lazily per visible tile within §12.5's
budget). **The underground tail** (V07 §3.16) runs after the first
map and outside this law: V04 §6's village columns, the whole tail ≤ 10 ms p95 at each village rung.

**First map:** the complete district band ≤ the model time + 60 ms at every village size (≤ 160 ms at the top); the relief
tier, shadows and the spotlight within §12.5's settle bound; a season switch re-skins within §12.5's re-skin budget (item 117).
**Edits** (p95): a block's re-race ≤ 5 ms; a density stroke over 10 blocks ≤ 15 ms; `drawGreen` ≤ 20 ms; `drawWay` (points or
walk) ≤ 15 ms; `declareEnd` ≤ 3 ms, lassoed with its count badge ≤ 5 ms; a field system switch ≤ 15 ms; a coarse edit (a heart
move) ≤ the rung's model time; a drawn wall with its barrier snapping ≤ 20 ms; a palisade run repaired ≤ 2 ms; a link pinned or
cut ≤ 5 ms (the bound members re-scored, no re-race); an oasis added or removed ≤ 20 ms; item 110's edits: a raised way added at
a village ≤ 20 ms, its removal ≤ 15 ms, a retaining wall drawn ≤ 15 ms, a terrace stroke over 10 blocks ≤ 20 ms, a deck plot
placed ≤ 5 ms; the underground edits V04 §6's. **An epoch** at a village rung ≤ 60 ms at the VILLAGE target (no S5 stage),
inside which `village.pins` ≤ 2 ms (a coverage pass over the housed households on the district's plot index, the orphan check
over the pins on the faces the epoch tombstoned, and ≤ 10 new pins) and `village.records` ≤ 5 ms per record it places (a claim
or join, one plot, one building; the fair field ≤ 3 ms; item 4's church the base's placement row, §12.6, plus one pin) and ≤ 1
ms per record `remove` takes (a tombstone or an unbinding); on an absorb without an epoch the same per-record bounds inside the
absorb's commit. **At a base-product epoch** while a superseded `VillagePlan` exists, `village.density` recomputes the old
core's raster ≤ 6 ms p95 (VS2's cost over the old core's box, ≈ 150 000 cells at a VILLAGE-sized core) and `village.plan`
returns no ops (its scope is a village rung); V06 §6.2's participant row cites these figures. **Memory** ≤ 25 MB for the model
and the district band's display list at the VILLAGE top. **Work limits** (§5.1 (5)): tracker steps ≤ 40 × the frame side ÷ the
step (VS6's top-ups included); trackers ≤ 4 + 0.3 × N + 3; slots ≤ 3 × N + the institutions' joins; the daylight sweeps 9 × the
cells; all laws of `N` (V07 §3.2 (3)).

**Confirming measurement:** V-M0's spike and V-M1's exit on the `B-VILLAGE` bench (V07 §7). **Pre-decided fallback:** if a
rung's p95 exceeds its bar, the height raster goes to 12 m, the daylight raster to 30 m and the density raster to 6 m at that
rung and it is re-measured; if it still fails, the bar is re-declared at the measured p95, a declared target miss inside
item 119's comfort level (D-18's form as item 119 (a) re-declares it).

**One-time waits** (item 119, the village's part; J-V7.144). The laws above stay the **targets** — as fast as possible, the
build pressing every path toward them (item 119 (a)). The **comfort level** is ten seconds of total time: every wait a user
sits through once at THORP, HAMLET and VILLAGE — generate, regenerate, opening a map from SettlementForge, a dossier change
applied, an epoch (advancing time) and item 113's history replay (V07 §3.12, V07 §3.12a), an export (V07 §5.4) and a
migration — completes within 10 s from the click to the complete result on §12.1's reference machine, at every village size
(T-V7-67); past it a wait is a failure. An epoch run and the history replay are timed against it as V06's part of item 119
times them, the village's figures above being their inputs. A step runs slower than its target only for a measured gain,
recorded as its `perf.qualitySpend` row (V11 §3.25.8; §4.1's quality budget: the step, its cost and its gain) and still inside
the comfort level (item 119 (b)); no village stage ships one. A wait beyond about one second shows progress — the stage by
name and the map filling in, never an empty screen — through V09 §4.21.9's progress view (item 119 (c)); the first picture is
still the complete district band (§8.5). The edit and switch budgets above (every edit's p95, the season switch's re-skin)
and every frame budget the village's views read from §12.5 are interaction budgets, unchanged by item 119 (d); the first
map's bound is a target like the laws. The low tier (§12.1) aims at the same
comfort level, a size it cannot reach declared per device (item 119 (e)). At every village size the targets lie far inside
the comfort level (the model law tops out near 130 ms), so item 119 moves no village figure: it re-reads a missed target —
the VILLAGE row above ≈ 1 100 people and the fallback's re-declared bar — as a declared target miss inside the comfort level,
never a veto question.


## 7 Tests and acceptance bars

**The bench.** `B-VILLAGE`: 200 seeds per village rung × four water settings (none, a stream, a river, a coast) × the seven
forms at their default weights (PR tier: 20 seeds per rung; nightly: the full bench; §13.8's tiers), plus an arid set (item
111), the frozen small-dossier fixtures (the 70 thorps, hamlets and villages and the 5 small towns of the 155 surveyed,
`research/sf/dossier-outputs.md` §3) and the 10-person thorp fixture, plus `B-VG`: 200 seeds per VG request-tag set under the
`VG` preset, each request set mapped onto `VillageRequest` by the request-mapping table (item 495). Each bar is labelled C (a
rule followed), P (parity with a measured VG number) or O (an outcome VG does not reach), as §13 labels them. A class a bar
names in words (the church, the smithy, every watermill) is its `v.` row of V07 §2.4 (J-V7.95). These tests take over the
village rungs' clauses of the base's hook bars (§13.2's take-over row: T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 –
T111-5, and the village halves of T113-1 and T113-3 and of items 114–120's bars, each test naming the bar it takes over); every
no-op pin registers on V12 §3.7.8's engine and reads "off" as V11 §3.24.0's switch table.

| id | bar | class | milestone |
|---|---|---|---|
| T-V7-1 | routing: populations 1, 8, 79, 80, 399, 400 and 1 499 build THORP, THORP, THORP, HAMLET, HAMLET, VILLAGE and VILLAGE; 1 500 builds a TOWN; with the product unregistered a dossier below 1 500 is refused naming the village product, registered it is created | C | V-M1 |
| T-V7-2 | population exact: the households' members sum to `P` on every bench seed; `N_v + N_o = N` and every household is housed once; with a dossier, the residential building count (`N_v + N_o`) lies inside the housing record's range on every fixture; the 10-person thorp (range 4–16) builds 4 households in 4 dwellings; a fixture below `household.minSize` builds the surplus vacant and reports `W_VACANT_TO_RANGE` | C | V-M1, V-M2 |
| T-V7-3 | registration: every input key of every stage in `ProductDecl('village').stages` has exactly one producer in the set (the declaration layer counting as the one producer of `declarations.*` and `raised`, V07 §3.0); no village stage writes a ground part from 1; the order has VS2 and VS3 before VS4 and VS5 before S7, and contains none of S3–S6, S8; on a registration fixture L0 is written only by S1 and VS1 and L1 only by VS1 (the border first), VS4, VS5, S7, S7b and VS6, in that order, none after S9 (the kernel's writer check) | C | V-M1 |
| T-V7-4 | the heart is dry, above the flood line and within its slope limit, or F-V-HEART's rung is reported | C | V-M1 |
| T-V7-5 | density: under `VG` the raster equals the restated formula's reference implementation bit for bit on 100 fixtures; the mean populated area is monotone in `δ` | C | V-M1 |
| T-V7-6 | palisade: every nucleus inside the trace; every gate on a way; no footprint in the band; a dossier wall record gives a palisade on 100 % of fixtures, none without one | C | V-M1, V-M2 |
| T-V7-7 | network: one connected component; every through road reaches its entries; 0 self-intersections; every bridge within ± 10° of the channel normal; through-road length over its grade limit ≤ 5 % outside `VG` | C, O | V-M1 |
| T-V7-8 | the open space lies inside the palisade and clear of water and the mill; its area grows with `√(P ÷ target)` within the scale clamp | C | V-M1 |
| T-V7-9 | every built plot has an access edge on a way and every dwelling's main door faces it (the hidden share 0); every built plot's access edge reaches its main door on the ground, directly or by a `ramp` or `stair` yard part; every drive that crosses a platform wall is a ramp within `rules.grade.track`, or F-V-TERRACE's rung is reported | C | V-M1 |
| T-V7-10 | every watermill stands on a reach with ≥ 1 m of fall and a leat within its limit, else F-V-MILL's outcome is reported | C | V-M2 |
| T-V7-11 | hinterland: arable per head within ± 20 % of its row outside `VG`; ≥ 80 % of meadow below the flood line; great fields within ± 25 % of each other; the furrow axis downslope on ≥ 90 % of furlongs steeper than 2 %; the territory's area per head equals the sum of the farm rows and moves with an `editTable` of one | C, O | V-M2 |
| T-V7-12 | institutions: each V07 §2.4 presence row's rate within ± 5 % of its anchor law at the fixture's population over 1 000 seeds; the church within 200 m of the heart or on the green on ≥ 80 % | C | V-M2 |
| T-V7-13 | dossiers: every small fixture is created; every institution record placed or bound by V07 §3.11's resolution order; every quarter on an end; walls exactly per record; the title word the dossier's; a `burial_ground` or `graveyard` record resolves to one burial face (the churchyard enlarged or its own `cemetery` plot) carrying its binding key; `access_to_external_mill` gives 0 mills and a reported milling import; Wealthy Residential claims the end of highest mean prosperity and biases only its plots, Common Residential claims nothing; the Religious Quarter's east phrase puts the church east of the heart more often than its random baseline (while §7.7 item 16's east row stands; the clause lapses with it, J80 Q5); a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` its toll house stands at an entry with `toll_bridge_dry` reported (V08 §2.6b (3)); a coastal fixture whose `PortValues.threats` holds `naval` stands its watchtower at the wharf or chief landing and walls none of its water; an `access_to_parish_church` fixture at THORP and at HAMLET has no parish church, no parsonage and no tithe barn of its own (a chapel of ease by its row); a crown fixture and a merchant-oligarchy fixture each stand their `villageSeat` class; an `ecclesiastical` hamlet fixture with `Access to parish church` stands its `v.parsonage` with no parish church and no F-SITING report; a `fish_market` fixture puts the market on the open space and its hall's plot on the space's rim — the hall within 60 m of the market, no toft slot taken, the open ground left no smaller than the unhalled size; a port fixture with `Docks and port facilities` stands its harbour master within 60 m of the wharf's quay; an `annual_fair` fixture lays one secondary `market` reservation of `market.fairHa` outside the perimeter at the through road's crossing nearest the heart, claimed as common, with 0 pins on it, or reports F-V-FAIR's rung; a `monastery_or_friary` fixture seats its cloister on joined slots of `claimArea.cloister`'s area at its band; a `town_watch` fixture's `v.watchtower` lies nearer the green than its random baseline; a crown, a seigneurial, an ecclesiastical and a chartered-commune fixture at VILLAGE place no `palace`, `castle`, `cathedral`, `courthouse` or `guildhall` of the government row's and no `v.watchtower` beyond its presence row, each standing its `villageSeat` class; a coastal `slave_market` fixture seats its slave market on joined slots with no claim on the open space, its site nearer the wharf or an entry than its random baseline; a thorp fixture with a `Wayside shrine` record and no Roadside Shrine quarter stands exactly one `shrine` pin bound to that record, on every seed; a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record to a `cross` pin inside the church's `churchyard` part, nearest its door, with no shrine pin at the settlement edge bound to it; a `Water source` thorp fixture binds its record to a well pin. **Its village-history clause** (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): an `annual_fair` record arriving at an epoch lays its fair field outside the perimeter on `commons` faces, never inside the district, still extramural after an (8v) extension and standing as a secondary market after the hand-off up; a `fish_market` record arriving at an epoch cuts its hall's claim from the rim with the open space not grown and the encroached share within `epoch.encroachShareMax`, else its reported rung; a `monastery_or_friary` record arriving at an epoch opens on joined plots of `claimArea.cloister`'s area or an outside plot, else its reported rung; every record the port adds at a village epoch is placed or bound in that epoch's `dossier` step — by `village.records` for the market, claim-sized and pin records, by the base's placement for the rest — with 0 records left unplaced at the `epoch` event's check; the `fish_market` record's hall stands **built with its use open** (`openUse`, cause `dossier`) in the epoch the record arrives, its plot the rim claim or joined plots, and a `monastery_or_friary` record's cloister likewise, its outside plot cut from a hinterland face whose remnant keeps its land use; a roster `fair_ground` member with no standing field — the fixture's field held on the green at creation by F-V-FAIR's last rung — is laid by step (m) at the first epoch whose perimeter crossings offer a dry face, outside the perimeter on `commons` faces, each face gone from its `VillageField`'s `furlongs` in that batch; a `Wayside shrine` record added at an epoch stands its bound `shrine` pin at that epoch; an `annual_fair` record removed at a later epoch leaves its reservation tombstoned in that epoch and its faces `commons`, and a `Wayside shrine` record removed leaves its forced pin tombstoned, while one whose record had bound a chance shrine leaves that pin standing, unbound; a `weekly_market` record removed below the law's crossing clears the principal market rank in that batch, 0 stalls at the next village epoch and `dist.market` measured to the first nucleus's open space, and one removed above it keeps the market by the law, its stalls at count; a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church` at a village epoch stands its church bound to the record's key and one churchyard `cross` laid for the record with no binding row, the roadside shrine standing unbound, a hamlet fixture whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt binds the shrine's key to the churchyard `cross`, the church bound to its own key, and a `fish_market` record added at an epoch beside a standing fishmonger stands its hall on the market's rim with the fishmonger's shop keeping its use; and, at V-M2, an `annual_fair` and a `fish_market` record absorbed without an epoch lay the fair field and the built, open hall in that absorb's commit — the hall standing finished, with no Works — and S10b's `dossier` request receives neither (J-V7.128); two `fish_market` records absorbed in two weeks between the same pair of epochs stand two halls with two distinct use addresses, each minted from its own dossier event's `seq`, and a record carried by an epoch mints the addresses and draws the values the same dossier event mints and draws folded standalone at that `seq` (J-V7.129); the `Wayside shrine` promotion to `Parish church` absorbed without an epoch stands the church on the record's key and its churchyard `cross` with no binding row in that absorb's commit | C, O | V-M2 (its village-history clause at V-M3) |
| T-V7-14 | the hand-off up: a fixture village grown past the band over epochs keeps every surviving entity byte-identical, retypes its district `central` keeping `village-ways`, turns its green into the market (its `Greenery` a `market_green` part) when the town has none, and grows the town's first stage from its perimeter; a re-derivation of the old core after the hand-off runs the village fabric on its recorded inputs, the participants registered with stage `VS1` (`village.plan`) and `VS2` (`village.density`), T-V11-1 (b) recording their reads of `village.json` under those two ids and never under a participant id; a target alternating 1 480 / 1 520 changes the product 0 times and one alternating 1 400 / 1 600 at every epoch; no catacomb exists before the first TOWN epoch; after it at most one, sourced at a burial face, 0 sourced at a church; a drawn crypt stays with its church, unchanged by the crossing, joining only by the crypt-join draw; the churchyard's age at the crossing equals its creation age plus the logged years; an epoch undone after a save restores on load; one document | C | V-M3 |
| T-V7-15 | the hand-off down: a TOWN fixture falling below the band creates a `VillagePlan` (a former village revives its one plan at the same address, its declared fields kept), re-cuts no district and runs the village phases at later epochs; a second crossing up and down leaves one plan record | C | V-M3 |
| T-V7-16 | desertion: a target of 0 vacates every dwelling; after ten epochs the church stands on ≥ 60 % of seeds and the hollow ways persist; the replay reproduces the history | C, O | V-M3 |
| T-V7-17 | locality: a block's re-race changes nothing outside the block; a density stroke changes only its blocks; a field-system switch — `forest_strip` included, its strips starting at the crofts' rear lines — changes nothing inside the perimeter (the oracle of §7.3) | C | V-M3 |
| T-V7-18 | determinism: digests identical across the five engines of §13.3 on 100 seeds per rung; removing one branch (a density stroke that suppresses it) leaves every draw of every other tracker identical and changes the geometry only of the trackers in its computed influence set — those that merge onto, or test junctions within `branchSpacingM` of, the removed branch's ways — asserted on 100 fixtures; a stage with no draws consumes no stream index | C | V-M1 |
| T-V7-19 | item 102 at village rungs (T102-1's village clause): with `sunTerm` and `woodShade` at 0 the output equals the build without them byte for byte; at their defaults the dwellings' mean daylight share exceeds the density box's and the woods' mean share is below the arable's, across the bench | C, O | V-M2 |
| T-V7-20 | item 103 at village rungs (the statistics suite, village rows): the smithy's distance to the through road and the church's to the heart below their random baselines; the tannery downstream in ≥ 70 % of river villages that hold one | O | V-M2 |
| T-V7-21 | item 104 at village rungs: the custom fixtures (a category only; tags; an archetype; an active chain) resolve, site and report; a chain's nodes closer than a random baseline; the flow order holds; a `mercantile-market` custom record at VILLAGE binds a `market_cross` pin at the centre of the reservation carrying the market (the open space, else the flanking square), in place of the drawn centrepiece, and a `sacred-shrine` custom record binds a `shrine` pin at the perimeter on a road | C, O | V-M2 |
| T-V7-22 | editing: each V07 §4.1 row's event is identical from the canvas, the tool API and the skeleton file; a declared heart, green, end and walked road survive Regenerate (keep); a lassoed end holds exactly the plots inside its lasso and survives the merge and the cap however few its plots; the dry runs of `declareEnd`, `drawGreen` and the density brush return the count badge; an unlawful form edit under `forest_strip` is bent to `open_field` with its note; a zero-length stroke or zero-area lasso is refused by its dry run as a shape, never logged | C | V-M3 |
| T-V7-23 | parity with VG (`B-VG`, under `VG`): dwellings per village in VG's recorded range per tag set; the accepted-frontage share (`vg.acceptedShare`) in VG's measured 63–82 %; the square's rim radius, the trail and approach counts, bridges per river map, the palisade rate on dry maps (0.2, 0.3 when dense) and the road-topology shares, the orchard share and the wood cover per map each within the band rule of §13.5 against `baselines.json`'s VG rows | P | V-M4 |
| T-V7-24 | performance: V07 §6's laws and bars on `B-VILLAGE`; `R_s` recomputed from `village.json` at each rung target lies within 5 % of V07 §3.2 (6)'s figures (≈ 100, 245 and 480 m) and the density box's cell count within 10 % of V07 §3.3's; `village.density` at a base-product epoch within its bound (V07 §6) | C | V-M1 (the epoch clause at V-M3) |
| T-V7-25 | renders: B-ZOOM's role continuity across every band switch of `painterly` and `ink` at village rungs, the programs `roof.faces`, `roof.palette`, `roof.ruin`, `way.edgeFade`, `bridge.shadow`, `crown.bands`, `crown.groupShade`, `spotlight.focus` and `spotlight.size` in its role list | C | V-M3 |
| T-V7-26 | labels: no end label over the church, a gate or a well; the title plate never over the heart | C | V-M3 |
| T-V7-27 | exports: the GeoJSON village layers validate (with `hollow_ways`, `house_platforms`, `landmark_parts`, a strip's `holder`, a declared end's flag, a reached close's flag); `VillagePlan`, `VillageEnd` and `VillageField` round-trip through `.plat` byte-identical | C | V-M3 |
| T-V7-28 | robustness: 10 000 seeds per rung — 0 whole-map retries, 0 crashes, 0 tier-6 omissions of a requested feature; every F-V rung counted in the report | C, O | V-M1 |
| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG) — rated, or the owner's acceptance recorded; unrated, the milestone is *provisional — not rated* | O | V-M4 |
| T-V7-30 | desertion traces: after a desertion fixture every hollow way is a way of a land class on ground part 0 in the `abandoned` existence with its disuse epoch and every house platform a dwelling in the `cleared` existence; 0 hollow ways on a deck, a ford or a raised part (T-V7-50); every retirement is a `retireWay` op (a primary included), struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), and every effacement an `effaceWay`, while 0 `downgradeWay` lowers a primary at any rung; both render in every family, export in their GeoJSON layers, round-trip through `.plat`, and regrowth rebuilds on the platforms and reopens the hollow ways first | C | V-M3 |
| T-V7-31 | the barrier closure (item 106 at village kinds): a river-bend fixture is fenced across its neck only and its enclosure is sealed; a scarp-backed fixture has 0 walled edges along its sheer arcs; no walled edge lies within `palisade.bandM` of any shore; 100 % of landings and wharves are reached from the heart without crossing a walled stretch; every walled stretch's ends anchor on a barrier, or F-V-ANCHOR's rung is reported; the reached ground holds only commons-owned closes typed by S12b, no dwelling, and is excluded from S10a's quotas and VS6's capacity; under `VG` the palisade is byte-identical to the build with the closure off | C | V-M1 |
| T-V7-32 | the palisade's REPLACEMENT: with ≥ `ladders.replaceShare` (80 %) of dwellings inside, a town-wall promotion keeps the trace's vertices and gates, retypes the kind to stone and stands every run robust; below it, a new ring anchors on the barriers and the palisade, and the palisade is superseded; one document | C | V-M3 |
| T-V7-33 | the supply web at village rungs: every good of V07 §2.4's supply rows is an id of V11 §3.7.1 and every provider class produces the good it provides (T-V11-3 and T-V11-28 pass over the village rows); with its weights at 0 the output is byte-identical (item 105 (k)'s no-op pin); the district term changes nothing (one district); every dwelling's toft is identical with the web on and off; across the bench the bakehouse and the alehouse lie nearer the open space, the smithy nearer a through-road entry or the crossroads, and the charcoal pit and the wood yard nearer the wood edge than their random baselines; with two mills each consumer binds to the nearer | C, O | V-M2 |
| T-V7-34 | balance at village rungs: with `comfortM` and the spacing at 0 the output equals items 103 and 105 alone byte for byte; the nearest-alehouse distance between alehouses exceeds its random baseline; every end of ≥ 40 households lies within 400 m walk of an alehouse on ≥ 80 % of VILLAGE seeds; no end is named for a trade without a dossier claim, a declaration or item 72's threshold (0 on the bench) | C, O | V-M2 |
| T-V7-35 | ladders at village rungs: on the small-town fixtures every COUNT (save `multiple_water_sources`, a floor), QUARTER and GUILD record shows members inside its range, non-decreasing across a population sweep from 900 to 1 499; a `Blacksmiths` record's smithies spaced by the row's `K spread 200`; a craft- or merchant-guild COUNT record stands that many `guildhall` members, a GUILD record of that COUNT's `categories` family adds no hall beside them (its hall one of the COUNT's members), and one of another family keeps its own hall (V08 §3.5.1 (c)); a `multiple_water_sources` record's wells number at least the range's low end and the coverage count; a `Wayside shrine` beside a `Parish church` record leaves no edge shrine and one churchyard cross bound to it; a lesser record beside its greater adds no building; a SIZE record is one building; a promotion whose greater's thing is the lesser's (V08 §3.5.1 (c)'s first case) keeps member #1 byte-identical, and one to a REPLACEMENT greater of a new thing places the greater new and leaves the lesser's former thing byte-identical and unbound; a demotion keeps the member nearest its demand | C | V-M2, V-M3 |
| T-V7-36 | chains and the entry store: every dossier chain whose members stand on the map becomes links on 100 % of fixtures with chains; a chain with an absent processor binds nothing, adds no building and is reported; an `entrepot` chain's store stands at the entry facing its partner (the inn, else the landing, else a farmstead) on 100 % | C | V-M2 |
| T-V7-37 | splits at village rungs: 0 split pairs below 900 people across the bench and 0 under `VG`; above 900, pairs only where item 105 (h)'s threshold fires; an author's `branchOf` assignment makes one, held through Regenerate (keep) and removed by its inverse; a town shrinking into a village keeps its standing pairs | C | V-M3 |
| T-V7-38 | caverns and ruins at every village rung: across the bench (with a mountainous-relief set and a dossier-ruin set) caverns and ruins occur at THORP, HAMLET and VILLAGE at their rows' rates within ± 3 s.e.; cavern frequency higher with mining than without per relief class; a dossier `ancient_ruins` fixture gets a ruin with its marker linked, or a reported reason; with the ruin chance 0 and the base's relief, boost and fissure rows the village is byte-identical to the build without these kinds (a `NoOpPin`); the village rungs' levels of item 109's presence and access bars join at V-M4, `notApplicable` before, never `insufficient` (V12) | C | V-M2u |
| T-V7-39 | access grows with the village: across a growth sweep from 40 to 1 499 people over one fixed void, the accessible share rises monotonically with the buildings over it; a 40-person thorp over a void is sealed on ≥ 60 % of seeds; a mining working with a gallery within `breachM` at its depth gives a `mineBreach` access on 100 %; a dug passage crossing a sealed void makes it accessible, transitively through its links | C, O | V-M2u |
| T-V7-40 | dwellings only after access: 0 dwellings in a void without an access; every `AccessPoint` carries its `cause`; 0 undercity at any village rung; 0 catacomb, quarry, vaults or buried systems created at a village rung save the charnel vault of a dossier catacomb fact and a replay's buried former settlement (V07 §3.12a (2)) | C | V-M2u |
| T-V7-41 | smooth scaling: across a population sweep from 60 to 1 499 in steps of 10, every presence rate and every count is monotone non-decreasing within its tolerance and no rate changes by more than 0.1 between adjacent steps — the grandeur ceiling's rung step (V07 §3.8) excepted and asserted by T-V7-63; at 40, 200 and 700 people every cell equals its rung column | C | V-M1 |
| T-V7-42 | the resolution order: every catalogue kind of tiers T, H, V and W — the count read from `dossier.catalogue`'s manifest, never written into the bar (176 at the pinned line: 97 kinds of tiers T, H and V and 85 of W, six in both) — resolves at the three village rungs to exactly one of pseudo-reader, village class (a `v.` key), own class or fallback; no pseudo-class builds a building (an `@absent:` kind zeroes its classes' demand through their village forms, asserted at THORP and HAMLET for `@absent:church`); the fallback is reached only through `unmapped_kind` and is reported; the compile refuses an unprefixed village row and a `villageForm` naming a non-`v.` key (V11's T-V11-3 clause); every class a kind of tiers T, H, V or W plays itself at a village rung has a finite plot area at THORP, HAMLET and VILLAGE (a compile check: a template family whose plot is "the claim's" reads `rules.claimArea`, V07 §2.2a) | C | V-M2 |
| T-V7-43 | the hand-off down's underground: a TOWN fixture with sewers and a catacomb shrinks into a village over epochs; every tunnel record survives; the catacomb's extent is non-decreasing (never below `extentFloorM2`), its state `stagnant` with `'rung'` in `blockedBy`, its `fill` non-decreasing, its `source` a burial face; after the parish's desertion the reason is `'sourceClosed'` and the complex stays; a fixture town with a cathedral keeps the cathedral and its crypt at every village epoch; a later rise past the band resumes the catacomb's growth | C | V-M3 |
| T-V7-44 | rules are data: a scan of V07 §1 and V07 §3 finds no numeric rule constant that is not a `village.json` cell (V07 §2.2, V07 §2.2a), a class row of V07 §2.4 or a cited base, V04 or V11 cell (every reference cell of V07 §2.2a resolving to an existing cell of its unit, and no `village.json` cell copying a value it could reference) — unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to row D5 (V07 §2.2a's reference trace), and implementation parameters that change no output (a spatial index's cell size); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a included in the scan; `epoch.rows.persistence`'s church keys equal V11 §3.5.1's `church-family` members; the table compile refuses a switch or mode cell of `village.json` marked calibratable (`terrace.enabled`, the `vg.*` switches and `vg.forestMode`, `plate.qualifier`, the `epoch.rows` op, class-list and order cells), and a reference cell so marked, as T-V11-37 refuses V11's | C | V-M1 |
| T-V7-45 | crypts and burial faces: over every parish church built across the village bench, the crypt share lies within the binomial band of 0.1; 0 chapels carry a crypt or a churchyard part; below TOWN 0 catacomb complexes and 0 gallery systems sourced at a burial face; every dossier-bound `graveyard` or `burial_ground` record resolves to exactly one burial face, a churchyard it enlarges holding at least V11's `burial-ground` plot area at its band; a dossier crypt fact gives its church a crypt on 100 %; a church's crypt state is identical before and after a rung change; a `parish_burial_grounds` record binds one member per standing parish church's churchyard, enlarges none, and places a `cemetery` plot only where no church stands | C | V-M2 |
| T-V7-46 | no generation below TOWN (item 110 (b)): across `B-VILLAGE` with a ravine-and-valley set (a dry gorge across a neighbour bearing, mountainous relief), 0 raised parts created by generation, by any router call a village stage makes or by a village epoch at THORP, HAMLET and VILLAGE; with item 110 (b)'s rows on, the output is byte-identical to rows off when no declaration is held; the rung gate is no `village.json` cell (an `editTable` on it is refused) | C | V-M1 |
| T-V7-47 | levelling (V07 §3.8a): on a flat fixture (every platform below `terrace.slopeMin`) 0 retaining walls; on the hilly and mountainous sets, walls only on house-platform edges whose step exceeds `terrace.stepMinCm`; 0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter; on a cliff-edge village fixture 0 walls on a cliff bank segment, a `cliff` or `sheer` arc or a cliff inside the district, every platform there keeping the shore setback's `cliff` distance from it (V07 §3.8a (2)); the longhouse's byre end downslope on ≥ 95 % where the ground falls > 3 %; every plot's access reaches its door on the ground, by a ramp or by a stair, and every drive crossing a wall is a ramp within grade or F-V-TERRACE is reported; a re-derivation of one plot changes no other plot's walls but a shared one | C, O | V-M1 |
| T-V7-48 | a raised way on a village map (a declared viaduct and aqueduct, and one carried down from a CITY fixture): 0 junctions between VS4's ways and a raised part except its two feet; 0 toft yard parts or buildings in the under-deck strip; 0 hinterland faces over a standing support (a support whose `state` is absent or `ruined` is a hole); the palisade abuts each standing support in its band and has 0 gates at supports; after a support is `cleared` the next derivation makes no obstacle, hole or abutment at it; `N_v` exact before and after the add; after Regenerate (keep) the feet re-join within `raised.endSnapM` or `W_RAMP_STUB` / `W_RAMP_UNJOINED` is reported; the add's dry run shows the count badge; every span over a hinterland face open (the span rule's `country`); an unbroken aqueduct's delivery point counts as a well (no well within 120 m), and after a span is ruined or cleared a well is sited at the next derivation; 0 ends anchored on a raised way | C | V-M3 |
| T-V7-49 | deck plots (V07 §3.10a): every deck plot inside its deck's width and budget, and no deck face buildable below V11's `minPlotDepthM` for its kind; 0 dwellings on a deck generated at village rungs; `N_v` and every toft byte-identical with the deck rows on and off; the pier head's rate within ± 3 s.e. of `deck.headChance` at the fixture's population over 1 000 seeds with a landing; each deck plot falls with its deck and is re-offered when the deck is rebuilt; every deck plot inside the village district or the hinterland pseudo-district | C | V-M3 |
| T-V7-50 | decline: 0 hollow ways on a deck, a ford or a raised part; on a hilly desertion fixture every generated wall persists as a decaying scarp beside its platform, none removed by a re-derivation after its dwelling is cleared; regrowth rebuilds on the platforms first and repairs their walls at the datum | C | V-M3 |
| T-V7-51 | hand-offs: a CITY fixture with a generated aqueduct and a viaduct falls to VILLAGE, and both stand, with their supports and reasons, at every village epoch, declining only by stretch; 0 raised ways created at a TOWN or village-rung epoch; a removed generated way stays removed through the fall, the village epochs and a rise back to CITY; a village's declared raised way crosses the hand-off up held; the old core keeps the house-platform rule at TOWN; a shrunk town's deck plots keep their dwellings | C | V-M3 |
| T-V7-52 | no-op pins (item 110 (f); T110-7's village clause): with every `deck.offer` 0 and `terrace.enabled` false (V11 §3.24.0's switch table) and no raised way declared, `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset; the suite registers on V12 §3.7.8's engine with its `terrace.enabled` switch, its switch-on shifts following V12 §3.7.6's four bumps | C | V-M1 |
| T-V7-53 | renders: B-ZOOM's role continuity for §8.2's item-110 roles (the retaining wall, the raised way with its piers and channel, the stair and ramp intervals, the tier roles) drawn by the painterly programs (`retaining.wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`) and by `ink` at village rungs; every retaining wall draws its low-side shadow and every raised deck its shadow on the surface beneath | C | V-M3 |
| T-V7-54 | editing: each item-110 row of V07 §4.1 (the terrace stroke, `retaining`, `raised` and the aqueduct class, a deck face, the removal) gives the same event from the canvas, the tool API and the skeleton file; a drawn wall, a declared raised way and a placed deck plot survive Regenerate (keep); `walk` with `raised` is bent to the points form with its note; each dry run returns the count badge | C | V-M3 |
| T-V7-55 | performance: the platform levelling ≤ 1 ms at the VILLAGE top; VS4 with a declared raised way within its 4.5 ms; the item-110 edit budgets of V07 §6 | C | V-M3 |
| T-V7-56 | the village rows compile: V11's compile checks T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 pass over every `v.` row of V07 §2.4 (V11's T-V11-0 run over them); every row names one family of V11 §3.4, one template family of V11 §3.6.1 whose template compiles for every band, a `deckOk` list, a `distribution` of the base's enum and a significance; every presence entry names only `PresenceWhen` conditions and a `PLaw`, and the class order has no cycle; every authored row's `to` is a class id, a `#tag` or a feature class of V11 §3.3.3; every supply cell compiles to a `SupplyEdge` whose good is a V11 §3.7.1 id; with a dossier government, its `villageSeat` class stands with at least one member at THORP, HAMLET and VILLAGE on 100 % of fixtures; every `v.` row carries a `label` (T-V11-4's display-cell check), the 25 labels distinct, and each row's `commonness`, compiled by V11 at step 5a, equals its roster share at VILLAGE recomputed from the compiled rows within 0.01 (J-V7.133) | C | V-M2 |
| T-V7-57 | the village's furniture (J-V7.118): across `B-VILLAGE` and the dossier fixtures at every village rung, 0 `statue`, `fountain`, `bandstand` and `monument` pins; every pin placed by a VS8 row (its row recorded in the pin's provenance), 0 by S11's furniture step (its trace); each open space carries at most one centrepiece and, where it carries the market, exactly VS8's stall count (V07 §3.10); 0 pins on a fair field; on the village-history fixture at every village epoch (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): every housed household served by a well, pump or aqueduct delivery point within `pins.wellWithinM` under the coverage row's capacity, every market (a street market included) at VS8's stall count for the epoch's households and a closed market with 0 stalls, a new nucleus's open space with its centrepiece, 0 standing pins moved and 0 removed whose host stands — save step 2's stalls (the surplus as households fall, and a closed market's), an engine-placed centrepiece no one holds that a market cross replaced and a forced pin whose record the dossier removed — every pin whose host face an epoch tombstoned gone in that epoch (step 0), every housed household served after an epoch that took a well with its host or broke an aqueduct's delivery point, a `Roadside Shrine` quarter added at an epoch anchored on a shrine in that epoch and one added by an absorb anchored at the next village epoch, each new host's row pin (a cross, trough, maypole or centrepiece) the one a regeneration of the grown village places on that host; after the hand-off up the green made the market carries its stalls; after the hand-off down a shrunk town's standing statues, fountains and bandstands stand unchanged and no new one appears | C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |
| T-V7-58 | item 111 at village rungs (T111-1 – T111-5's village clauses): on the arid set the share of households within `pins.wellWithinM` of water exceeds the non-arid baseline; an oasis stands only on an arid site unless drawn (T2 `ground`) or given by `oasis_water`; arid sites still draw rivers, ponds and coasts at the arid row's re-weighted shares (a rate `StatBarSpec` per water kind); the richest band's mean distance to reliable water below the middle band's on arid seeds; the density's `wp` term leans the dwellings toward reliable water on arid seeds (their mean `pw` above the box's); an oasis village's heart, `site water` test and wells read the oasis as water, its spring never a well access, its shore a barrier the palisade never fences; with the oasis chance, `w_water` and the climate cell at their neutral values the output is byte-identical to the build before item 111 (a `NoOpPin`) | C, O | V-M1 (the dossier clause at V-M2) |
| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3; run on V06's replay engine): a CITY-to-VILLAGE history fixture shows walls and street lines beyond the village's fabric, hollow ways on the old streets, an oversized church and a kept market square, with a `VillagePlan` created at the replay's hand-off down epoch and the dossier's present population and institutions matched exactly; a symbolic-peak fixture (a village with a ruined "City walls and gates" record) sizes its remnants inside CITY's range at `history.symbolicQuantile`, each remnant fact `symbolic`, and a fixture with no evidence has no peak; a refounded-village fixture over a ruined town reuses the old roads (the share of new way length within `refound.traceReachM` of a ruined way trace above the same site's unrefounded baseline), rebuilds its ruined bridges where its trackers cross, crosses the ruined wall only at gate gaps and breaches save a through road's cut, and races slots over ruined footprints above their random baseline; a former city buried past `history.burialYears` lies under the village as V04's buried former settlement in maintenance mode, a former hamlet's refounding lays none; the replay is byte-stable per seed and history on the five engines; with the replay off the output is byte-identical (a `NoOpPin`) | C, O | V-M3 (with M6-E) |
| T-V7-60 | the edge suite (V07 §3.17): each clause runs its V07 §3.17 rows on their edge fixtures at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate — each case ending in its row's defined outcome and reported rung, with 0 crashes, 0 hangs, 0 lost records, 0 whole-map retries and 0 silent changes (every changed output named in the report). The clauses: **(a)** the records, the request block and the pipeline; **(b)** S0, VS1 and VS2; **(c)** VS3, VS4 and the raised way; **(d)** the open space, VS5, VS6 and levelling; **(e)** the hinterland, the wharf, ends and pins, and deck plots; **(f)** the dossier readings, the epochs and hand-offs, and the failure ladders; **(g)** the underground; **(h)** editing, the clerk, rendering, labels and exports, and Find; **(i)** every combination row of V07 §3.17 (b). (Determinism's row is T-V7-18's, the one-time waits' T-V7-67's.) | C | (a), (b), (d) at V-M1, (a)'s landmark-part clause at V-M2; (c) at V-M1, its raised-way row at V-M3; (e) at V-M2, its deck-plot row at V-M3; (f) at V-M2, its epoch and hand-off row at V-M3; (g) at V-M2u; (h) at V-M3; (i) each row at the later milestone of the two mechanisms it joins |
| T-V7-61 | the village `WhyProvider` (item 270's completeness test over V10 §3.9's owed kinds for V07): a `why` on every `VillagePlan`, `VillageField` and `VillageEnd` of the bench answers in both modes with at least one row whose key resolves in V09 §4.9's catalogue (`info.village.*`, V07 §4.5); the heart's terms recomputed equal VS1's recorded score; a `dossier`-sourced form and an `edit`-sourced heart answer with their sources; a superseded plan answers with its superseded line; the provider reads committed records only (a pending proposal changes no answer) | C | V-M3 |
| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses): a poor, threatened palisade fixture shows patched runs in its kind's `walls.patchMaterials` rows (V11 §3.25.3), each drawn by its row's `look` role, and no robust rebuild; a rich, threatened one rebuilds its breached runs robust; a safe one wears through `worn` to `breached`; recovery replaces patches oldest first; no run changes condition without a sustained driver (no flicker across two epochs at a threshold); every state distinguishable in greyscale at its bands; a dossier village's generation-time conditions follow its readiness and wealth by §7.7's row; `VG` draws every run standing; with need and means at neutral values the existing neglect and repair behaviour is reproduced (a `NoOpPin`); a patched run exports as a wall and a breached one as an opening; `repairWall` with a material is undone by its inverse | C, O | V-M2 (generation), V-M3 (epochs, with M6-E) |
| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses): rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or a dossier record (none at THORP and HAMLET without one); a dossier-named hall and a hand-placed manor keep their design, the clerk noting the excess; a village grown into a town builds its new grand buildings from that epoch, a shrunk town keeps its grand buildings as they stand; the manor count never rises with wealth (a wealth sweep at a fixed population and government leaves it unchanged) | C | V-M2 (the class mix and manor rule); the composition clause with V02's M6 (`notApplicable` before) |
| T-V7-64 | item 116 at village rungs: at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) the zoom-out limit shows the whole territory frame with one stop of margin and no stop beyond it is reachable in the view; the pyramid draws every stop from the limit inward and none beyond; the first view unchanged; an epoch that grows the frame moves the limit; an export frames within it | C | V-M3 |
| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included): the same village document hashes identically in all 52 weeks; every village surface (each great field by its slot, the strips, orchards, meadow, commons, green, gardens, ponds, the moat, the leat, the stream) has a season row in every week of every climate with no gap; an arid fixture never draws ice or snow; a cold fixture freezes the ponds and the moat before the leat's slow reach and the leat before the stream, and keeps open water at the mill race, the leat's take-off and springs; stooks only in the harvest weeks; in autumn a wood's rim crowns take several colours (their count per wood above a floor), the leaf cover's density non-decreasing through the leaf-fall weeks on the green, lanes, tofts, churchyard and roofs; a campaign dossier opens on its own week; each week's look passes the contrast and colour-blind checks (item 112) | C | V-M3 |
| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses): the same document hashes identically with decorations on and off and in every week; a festival shows exactly in its window's weeks; the same festival draws identically across views and exports (byte-stable tiles per seed); a THORP fixture shows only a garland or a bonfire at the heart, a HAMLET a maypole or a bonfire on the green and door garlands, a VILLAGE a maypole, church-lane bunting and the green's stalls and tables — no larger tier's kinds; staging lands on the named or keyed village place, else its kind's fallback; nothing blocks a gate or covers a label's keep-out; with no traditions and no preview, byte-identical (a `NoOpPin`) | C | V-M3 (the dossier-window clause with V08's reading of `traditions`) |
| T-V7-67 | the one-time waits (item 119 (f)'s village clauses): on §12.1's reference machine, at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499), each on its largest frame, generate, regenerate, opening a map from SettlementForge (the small-dossier fixtures), a dossier change applied, an epoch and the history replay (V07 §3.12a's fixture; each timed as V06's part of item 119 times it), every export format and a migration each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its §12 or V07 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V07 §6's edit and switch budgets and §12.5's frame budgets hold unchanged | C | V-M3 |
| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures, with and without a dossier, the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles; each chip's matches equal the gazetteer query's rows at the key — the `v.` classes by their labels and synonyms (a "farms" chip holding the village's farmsteads and the outlying ones), the dossier's names, the village, the ends, the field groups and V07 §5.3's places — and the list offers nothing the village lacks; Show gaps outlines exactly the ends (with one end or none, the village) holding no member of the chip's class and never a class its row sites outside the perimeter; at the township view every match has a pin or a count bubble; an epoch that opens a smithy lights it and one that closes its use darkens it in that commit; an end's chip reads 0 after the hand-off up and lights again after the hand-off down; under a player view the knowledge canary (T-V9-66's fixture read at a village rung) surfaces in no suggestion, count, glow or pin; the chips survive every band and layer change, a village epoch and an undo; suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | V-M3 (with V09's Find; risk (13)) |

**Parity metrics** read from `baselines.json`'s VG rows (item 495; `referenceBuild` 19365073 = VG 1.6.9, §13.5's stamp),
generated research-side from the existing recordings (`captures/village/*`, `research/findings/profile-village.md` §3.3, §5 and
its addenda N1–N5): dwellings per village by tag set, the accepted share of frontage draws, the square's rim radius, trackers
per village (4–11) and steps per village (≈ 200), bridges and piers per water map, the palisade's kept lattice points (13–20)
and the model time per stage — V12's `vg.*` family, each metric `vg.<name>` (the accepted share `vg.acceptedShare`, the one a
register entry names, V07 §3.15). The village's panels are `PanelSpec`s on V12 §3.9's engine, their `D5Pair` variants V12's and
their reference rows `Baseline` rows of input `counts` or `geo` under V12's `'VG'` reference.

**Goldens and the one-time shift** (item 110; a legitimate change of outputs is stated, never silent). The village goldens are
re-recorded once, with the terrace and deck rows on, and item 110 is stated as the cause beside them: hilly and mountainous
fixtures gain house-platform walls and their stairs and ramps, fixtures with a landing and a pier gain pier heads at
`deck.headChance`'s rate; T-V7-52 pins that nothing else moved. Items 111 (the water pull at its temperate weight), 115 (the
manor rule) and the derived area per head (V07 §3.9 (1); the territory 1.1 % smaller) are stated the same way when their changes land: the goldens re-recorded
once each, the cause named beside them, their no-op pins (T-V7-58) and T-V7-11's clause pinning that nothing else moved.


## 8 Build plan

The village product is built on the finished base in J122's order (`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`; §16's
staged table and INDEX §4 carry the same slot): **V-M0, the tracker spike, right after M0**, on M0's kernel, M0 (b)'s tables and
its own fixtures (synthetic flat, river and coast sites and its own frontage slotting; no M2b input), beside M1; **V-M1 – V-M4
after M4**, in parallel with M5 (different packages, no shared file), needing S1, the plot model and the one solver (M2b), the
relief tier (M2b), item 101's tools and the port's absorb half (M3a) and the epoch path (M4); V-M3's clauses that run V06's
steps exit with M6-E's E2–E4 (V07 §1 (14)); **V-M2u after M6-U's tail** (V04). Its milestones:

| milestone | content | exit (executed) | est. (pw) |
|---|---|---|---|
| **V-M0 — the tracker spike** | VS2 + VS3 + VS4 + the slot race on flat, river and coast sites at the VILLAGE target, headless, on the spike's own fixtures; `village.json` whole — its three rung rows, every column of V07 §2.2 and V07 §2.2a — with its register entries (*The register at the exits*, below); the `VG` preset file (item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule, and the `presets.VG` entry of every `presetsRequired` cell of a table a village stage reads, from V07 §3.15's list and rule; the source manifest's `productStages.village` from V07 §3.0's stage set, conditional registrations included (V11 §3.2.1 step 1) | 0 whole-map retries on 1 000 seeds; VS2 + VS4 ≤ 8 ms at VILLAGE; under `VG` the road-topology shares within ± 5 % of VG's roll; the legibility check of risk (1) below on 20 renders; V11 §3.2.1 step 4's preset check green with the `VG` file shipped; `plat calibrate register --check` green over the cells it lands | 1.25–1.75 |
| **V-M1 — the village core** | `@plat/village`; the `ProductDecl` (with `extraInputs`) and the ladder rows; the anchor law and the typed rule cells (their readers; the table's rows shipped whole at V-M0); S0's village draws with item 111's arid water weights and the oasis reading; the course-first river; VS1 with S3's jobs (border, lattice, destinations, L0 ponds) and the daylight sweeps; VS2 with item 111's water pull; VS3–VS6 and VS8 in the village writer order; the `toft` plot strategy; the `VG` request mapping; the palisade's barrier closure and graded stretches (item 106); the `painterly` family's ground, water, ways (with the edge fade and bridge shadows), palisade, spotlight (focus and size) and building programs (roof faces, palette, ruin) at the city and district bands; labels; `B-VILLAGE` in CI; item 110's levelling at village rungs (V07 §3.8a) and the router's rung gate (V07 §3.5), once the base's item 110 has landed (its M3a) | T-V7-1 – T-V7-9, T-V7-17's block clause, T-V7-18, T-V7-24, T-V7-28, T-V7-31, T-V7-41, T-V7-44, T-V7-46, T-V7-47, T-V7-52, T-V7-57 (its fair-field clause at V-M2), T-V7-58, T-V7-60's V-M1 clauses; `plat calibrate register --check` green over the cells it lands | 9–11.25 |
| **V-M2 — institutions, fields and dossiers** | V07 §2.4's class rows and templates with the presence laws, the crypt cells and the burial faces; items 103, 104, 105, 107 and 108 at village rungs (the supply, balance, spacing and ladder rows, the placement order, the entry store); item 115's grandeur ceiling in the class mix and the manor's rule; the three field presets, great fields, meadow, commons, woods (with the request's forest and the `VG` forest modes), outlying farms (`N_o`) and decorations; the port's consultation of `LadderRouter` (V08 §3.10; item 202), the village DR rows in the resolution order with the burial, mill and residential readings, the chains and the ladder records, the market and harbour readings with the market halls' claims, the fair field and `rules.claimArea`, VS8's pin-record rule and the records placement `village.records` (`place`, with item 4's REPLACEMENT greaters, and `remove`, keyed by the dossier event's `seq`) with `village.outsidePlot`, called on the absorb path without an epoch, and the product registration's hooks that call it — `ProductDecl.records`, the *One path* placement's and §7.7 item 2's removal's calls, and the dossier step's call on M4's grow path (item 202; J-V7.128 – J-V7.132); item 114's generation-time palisade conditions and patch rows; the small-dossier fixtures | T-V7-2's dossier clause, T-V7-6's dossier clause, T-V7-10 – T-V7-13, T-V7-19 – T-V7-21, T-V7-33 – T-V7-36 (T-V7-35's promotion clause at V-M3), T-V7-42, T-V7-45, T-V7-56, T-V7-58's dossier clause, T-V7-62's generation clause, T-V7-63's class-mix clause, T-V7-60's V-M2 clauses; `plat calibrate register --check` green over the cells it lands | 7.5–10.75 |
| **V-M2u — the underground under a village** (after V04's tail milestone) | the registration of V04's tail at the village subset, with the source manifest's `productStages.village` gaining its stage ids (V11 §3.2.1 step 1) and, in the same change, the `presets.VG` entry of every `presetsRequired` cell of a table that registration makes village-read, by V07 §3.15's rule; the village dig rows, the well and mine-working readings, the ruin marker's site, dwellings after access; the growth draws at epochs wired to V07 §3.12 | T-V7-38 – T-V7-40, T-V7-60 (g); V11 §3.2.1 step 4's preset check green under `VG`, T-V11-9's equality of `villagePresetCells` with V07 §3.15's list included; `plat calibrate register --check` green over the cells it lands | 1–1.5 |
| **V-M3 — editing, time and output** | V07 §4's tool forms, events and locality rows (the lassoed ends with the count badge, the wall tool's barrier snapping and its repair material, the declared split, the form-edit bend); the epoch phases, desertion with the hollow ways and house platforms as records, the ladder steps and the palisade's replacement; the markets, halls and the fair over epochs (V07 §3.12) with the dossier step's call of `village.records` (built at V-M2), `village.outsidePlot` from V06 §3.9.6 and the siting step (m), and the pins over epochs (`village.pins`), these grow-path parts on M4's grow path at item 202's call points (V-M2) until V06's engine carries them — V-M3's clauses that run V06's steps exiting with M6-E (risk (10)); both hand-offs with the band, the one revived plan, the old core's fabric participants, the catacomb step and the maintenance mode; item 113's village part (V07 §3.12a) on V06's replay; item 114's epochs and condition looks; `painterly` at the neighbourhood band with the crown bands and group shade; the night view; the village through the year and its festivals (items 117, 118); the township view at the zoom-out limit (item 116); exports; the village `WhyProvider`; item 110's village parts — the raised way on a village map (V07 §3.5a), deck plots and the pier head (V07 §3.10a), the decline rows, the hand-offs' item-110 state, the painterly item-110 programs and the item-110 edit rows; item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the edge suite's V-M3 clauses | T-V7-13's village-history clause, T-V7-57's village-history clause, T-V7-14 – T-V7-17, T-V7-22, T-V7-25 – T-V7-27, T-V7-30, T-V7-32, T-V7-35's promotion clause, T-V7-37, T-V7-43, T-V7-48 – T-V7-51, T-V7-53 – T-V7-55, T-V7-59, T-V7-60's V-M3 clauses, T-V7-61, T-V7-62's epoch clause, T-V7-64 – T-V7-68 — the clauses that run V06's steps (T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs, T-V7-51, T-V7-59, T-V7-62's epoch clause) at V-M3's exit where M6-E's E2–E4 have landed, else at the first V07 exit after E4 (risk (10)); `plat calibrate register --check` green over the cells it lands | 9.5–14.25 |
| **V-M4 — parity and the owner's panel** | `baselines.json`'s VG rows; T-V7-23 under `VG`; the one `reference` run on `rules.race.densityPower@VG` (risk (2); register entry `cal.village.*.rules.race.densityPower@VG`, V07 §3.15), only if T-V7-23's accepted-share row misses its band; the D-5 panel against VG | T-V7-23; T-V7-29 rated or accepted; `plat calibrate register --check` green over the cells it lands | 2–3 |
| **total** | | | **30.25–42.5** |

The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 routed here (item 111 at V-M1, + 0.25–0.5; items 114
and 115 at V-M2, + 0.5–0.75; at V-M3 item 113's village part + 0.75–1.25, item 114's epochs and looks + 0.25–0.5, items 117 and
118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's one-time
waits + 0.25, item 120's Find at the village rungs + 0.25–0.5); §16's village line and INDEX §4 carry it (item 568 computes
the totals once).

**The register at the exits** (J-V7.124). Every milestone above that lands a registry table of this volume, or a
calibratable column of one, exits with "`plat calibrate register --check` green over the cells it lands — their entries from
V12 §3.11's default line (`plat calibrate register --defaults --milestone <id>`, the landing change's id in V12 §2.8's
volume-qualified form: `V-M0` – `V-M4`, `V-M2u`) unless this volume's own line names the column". The lint runs at PR tier
from M1 (T-V12-20), so the change that lands a column carries its entry, never a later change (V12 §3.11). The entries follow a
table's first rows, not its first compile: every registry row compiles from C0 as its schema's empty table (V11 §2.1's
empty-table rule, J-V11.84), and `--defaults` writes an entry only for a column that holds a compiled cell (V12 §3.11,
J-V12.73); so a table or column that first ships rows in an earlier milestone than planned below takes its entries there, the
check failing that milestone otherwise. Every entry the default line writes here is due at M-CAL (V12 §3.11), which opens only
after V-M4 has exited (V12 §3.10.1), so each falls due after the milestone that writes it. The landing seat writes the named
entry first, then runs `--defaults` for the rest (V12 §3.11's order). Keys, switches, modes, reference cells and
`rules.ladders.ranges` take no entry (`calibratable: false`; V07 §2.2, V07 §2.2a, J-V7.114, J-V7.121), the derived territory per
head is no column (its farm rows are the base's `FarmTable` cells), and a `VG` entry passes by its `ref:VG` provenance or
its `fixed:` note (V07 §3.15), save the one named below. The rows this volume adds to other tables — the village rows of
`ladder.json` (item 201), of §4.3's width table (item 292) and of §4.9's farm table (item 314), V07 §2.4's `v.` rows of
`roster.classes`, the supply, balance, spacing and ladder rows of V11's tables, V02's `composition.classFamily` rows and V04's
dig rows — take no entry: a column entry's `rows` is absent, so it binds every row, and those columns were bound when their
owners landed them. This volume writes no register line of its own (J-V7.124). As planned:

| milestone | first ships rows here — holds a compiled cell (registry row) | each column's entry from |
|---|---|---|
| V-M0 | `village.json` (61), every column of V07 §2.2 and V07 §2.2a: its three rung rows are written whole with the `VG` preset file, whose entries sit on cells of both (V07 §3.15) | `rules.race.densityPower`'s `VG` entry: the named `cal.village.*.rules.race.densityPower@VG` (method `tune`, due V-M4; V07 §3.15), written first; every other calibratable column by the default line (owner `V07`, the table's rows home), `rules.race.densityPower`'s default value among them — a cell's default and its `VG` entry are two knobs, told apart by `preset` (V12 §2.6) |
| V-M1 | none: the typed rule cells' readers read the rows V-M0 shipped, and its village rows of `ladder.json`, the width table and the farm table add rows only | — (the check runs and is green) |
| V-M2 | the `presence` column of `roster.classes` (17; item 576 (a)), whose first cells are V07 §2.4's `v.` rows: its law anchors are numbers and calibratable (`own`; §12), the column's flag as this volume types it | the default line |
| V-M2u | none: the dig rows are rows of V04's tables (landed at V04's U3b), the well and mine-working readings `village.json`'s cells (V-M0) | — (the check runs and is green) |
| V-M3 | none: the epoch rows and the `handoff`, `raised`, `deck` and `refound` cells are `village.json`'s (V-M0) | — (the check runs and is green) |
| V-M4 | none; `cal.village.*.rules.race.densityPower@VG` falls due, its history row and status by V12 §3.11's milestone exits (V07 §3.15) | — |

**Risks and spikes, in order.** (1) **Legibility at the VILLAGE top** — VG's trackers make 5–60 houses; a 1 500-person village
has ≈ 300 dwellings, and a walk-grown network may tangle. Spike: V-M0's 20 renders at 1 400 people, judged against the
figure-ground metrics of §8.5. *Pre-decided fallback:* above 800 people the tracker branch spacing takes the `nucleated` law and
faces larger than 4 ha inside the perimeter get the base's bent-cut lanes (S8's `BentCutFabric` on those faces only, registered
for the village district by `fabricParams`), re-measured. (2) **The exact-count race's look against VG's independent
acceptances** — measured by T-V7-23's accepted-share row and the V-M4 panel; *fallback:* the race draws its keys from a density
raised to a power fitted so the built share per density band matches VG's — the cell `rules.race.densityPower`, whose `VG` entry
the one `reference` run at V-M4 fits, the default staying 1 (J-V7.119). (3) **Content** — the class rows and templates of V07
§2.4 are ours to author (≈ 1.5 pw inside V-M2), with V11's rows cited. (4) **The `painterly` family** — reserved and never built
in the base; its programs at build depth (the roof faces, palette and ruin, the edge fade, bridge shadows, crown bands and group
shade, the spotlight's modes, the condition looks, the season and festival rows) are priced inside V-M1 and V-M3 (≈ 3–4 pw).
(5) **The hand-offs' coherence** — the epoch fixtures T-V7-14 and T-V7-15 run from V-M3's first week. (6) **File g's base
mechanisms** — the barrier closure, the supply web, the balance profile and the ladder table are the base's; *pre-decided
fallback:* if the barrier closure has not landed when V-M1 starts, V-M1 ships the palisade with VG's water cut (`closure:
'shore'`) and T-V7-31 moves to V-M2's exit; if the web or the ladder table has not landed by V-M2, those bars move to V-M3 and
V-M2 exits on the rest. (7) **V04's tail** — V-M2u registers V04's stages and cannot start before V04's tail milestone;
*pre-decided fallback:* until it lands the village ships with no cavern or ruin (the author's dug passage stays, item 66), T-V7-38
– T-V7-40 move to the first milestone after V04's, and V07 §3.12's hand-off down keeps a shrunk town's underground records
untouched and unregistered (read-only, drawn, never re-derived) until the maintenance mode exists. (8) **The base's item 110** —
the levelling, the ground parts from 1 and the deck plots are the base's (M3a); *pre-decided fallback:* if the base's item 110
has not landed when V-M1 starts, V-M1 ships with the terrace, raised-way and deck rows off (T-V7-52's state) and T-V7-46 and
T-V7-47 move to V-M3's exit; if V04's arch-vault source or V06's raised-way decline has not landed by V-M3, a raised way on a
village map stands with open spans and without decline, reported, and the clauses of T-V7-48 and T-V7-51 that read them move to
the first milestone after theirs. (9) **The registration's hooks** — `ProductDecl.records`, its calls on both paths, the phase
overrides and the participants on M4's grow path are item 202's; *pre-decided fallback:* V-M2 builds the village's side against
item 202's text, the base's side landing with it in the same milestone; if the base's side is not in place when V-M2 exits,
T-V7-13's absorb clause and its village-history clause move to V-M3's exit and a record at a village rung is reported as placed
by S10b's request until then. (10) **A village epoch on the grow path before M6-E** — the grow path runs V-M3's grow-path parts
at item 202's call points but none of V06's steps; *pre-decided fallback:* such an epoch strikes no way (no hollow way until
E2), applies a ladder step or a walls record the epoch carries by the base's dossier step as V07 §3.11's absorb half applies it
(member #1 kept where the greater's thing is the lesser's, the rest by S10b's `dossier` request; the palisade's REPLACEMENT;
V08 §3.5.1 (c), (d)'s bindings), and leaves a claim-sized roster member waiting in its deficit, each reported in the epoch
event's generation report (§5.4); T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs and
T-V7-51 then exit at the first V07 exit after E4, priced inside V-M3's range. (11) **Item 113's replay** runs on V06's engine
(M6-E); *pre-decided fallback:* until it lands a village is generated at its present (the replay off, as §4.11 (7) states) and
T-V7-59 exits at the first V07 exit after M6-E's replay. (12) **The season, festival and zoom-limit rows** are §8.2's
and §8.8 rows and V11's tables (items 116–118); *pre-decided fallback:* if they have not landed by V-M3, the village draws its
one default season (midsummer) with no decorations and the base's zoom-out range, and T-V7-64 – T-V7-66 exit at the first V07
exit after them. (13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows;
*pre-decided fallback:* if they have not landed by V-M3, the village's readings (V07 §5.5) ship as the gazetteer's rows and
area targets alone, and T-V7-68 exits at the first V07 exit after V09's Find.

## 9 Decisions

Every nontrivial choice of this volume, each final unless vetoed ("chose X over Y because Z"); the provenance of the constants is
in the rows of V07 §2.2 and V07 §2.4. A superseded or amended decision carries one mark, "superseded by X" or "amended by X";
the governing row keeps the reason.

| id | decision | where |
|---|---|---|
| J-V7.1 | chose a THORP floor of 1 inhabitant (bands THORP [1, 80), HAMLET [80, 400), VILLAGE [400, 1 500)) over PART III (5)'s "≈ 20", because SettlementForge's thorps start at 8 people (`research/sf/dossier-outputs.md` §3.4: 10–60 in the soak) and a dossier's population is a fact the map may not clamp (§1.1, item 15); a creation below 1 is an F-EDIT conflict or a refusal | V07 §2.1 |
| J-V7.2 | chose to draw a deserted village — every dwelling vacated and decaying, house platforms, hollow ways, the church standing — over refusing an epoch whose target falls below 1, because desertion is a real outcome of decline (the deserted medieval village) and the owner's evolution rule draws decline | V07 §2.1, V07 §3.12 |
| J-V7.3 | chose no stored product flag — `Recipe.rung` at creation and, at each epoch, the product and rung of V07 §2.1's fold choose the stage set and the phases, never the target's own rung — over a persisted `product` field, because a village that becomes a town and a town that becomes a village must run the right path without a second fact that could go stale | V07 §2.1, V07 §3.12 |
| J-V7.4 | chose a first view at the district band framing the perimeter × 1.6 (at least 400 m) over the base's city-band first map, because a village's city band is a township in which the settlement is a speck (item 418) — amended by J-V7.137 (the township view at the zoom-out limit) | V07 §5.2 |
| J-V7.5 | chose a course-first river whose axis passes within 0.3 of the territory's half-width from its centre over VG's axis through the map centre, because our heart is scored (fords, sun, shelter) and a village beside its stream is the common case; the `VG` preset keeps VG's centre crossing | V07 §3.2 (2) |
| J-V7.6 | chose seven plan forms — VG's grown form as the default plus the street, green, nucleated, polyfocal, row and dispersed village — weighted by rung and multiplied by the dossier's culture key, over VG's one form, because the realism tiebreaker asks for the attested variety and the culture key is a dossier fact to honour | V07 §2.2, V07 §3.1, V07 §3.5 |
| J-V7.7 | chose a territory sized by land per head over a 0.8 usable share with a floor per rung, its fields sized to the demand (`extent: 'demand'`), over VG's fixed ≈ 350 m view and the base's frame law, because "in its landscape" and "population decides the land it takes" need the fields, meadow, commons and woods to be the people's own — amended by V07 §3.9 (1) (the area per head derived from the farm rows, 2.275 ha, never stored) | V07 §2.2, V07 §3.2 (1), V07 §3.9 (1) |
| J-V7.8 | chose an exact dwelling count raced per block by density-weighted keys without replacement, with block quotas by largest remainder, over VG's independent accept-with-probability-density per slot, because the population is exact (a dossier fact) and a recorded block quota keeps every edit local; the race reproduces VG's look by construction and is measured (T-V7-23; risk (2)'s fallback) | V07 §3.8 |
| J-V7.9 | chose to let two households share a dwelling at the poor and modest bands (`share2`) over one household per dwelling, because shared longhouses and farmsteads were common among cottars and SettlementForge's housing ranges (4–16 dwellings for a thorp) require fewer dwellings than households | V07 §2.1, V07 §2.2 |
| J-V7.10 | chose, when a housing range forces fewer dwellings, to raise the doubling (at most two households a dwelling) and then lower the household size, never to leave the dossier's range, because the range is a dossier fact and the household size is ours to derive (items 20 (h), 22) — amended by J-V7.55 | V07 §3.11 DR7 |
| J-V7.11 | chose the farm mode by plan form — `perimeter` with an outlying share for the nucleated forms, `fill` for the dispersed form — over PART III's `fill` at every village, because nucleated villages housed their farmers in the village with the fields around it while dispersed settlement put them on their land (item 314) | V07 §3.2 (3) |
| J-V7.12 | chose, under the `VG` preset, VG's field area (490 m² per dwelling times its factor) as decorative land not fed by the farm table, over feeding it, because parity compares like with like while the default's fields are fed; the difference is reported | V07 §3.9 (1) |
| J-V7.13 | chose the moated manor's moat as `moat` and `platform` yard parts drawn in the water tone over a carved water body, because no L0 batch may follow the plots (§3.3's canonical order) and a manor moat is a site-plan feature at this scale | V07 §3.8 |
| J-V7.14 | chose a grade guard on the trackers (turning toward the contour above 10, 14 and 20 % by class) as our extension, off under `VG`, over VG's slope-blind steering, because village roads wound around steep ground; T-V7-7 bars it | V07 §3.5 step 5 |
| J-V7.15 | chose the `inner` stone circuit as the village's one masonry enceinte (0.1 of VILLAGE palisades, and a small town's town-wall record) over no masonry below TOWN, because small walled towns under 1 500 people existed and SettlementForge's small towns carry wall records; timber and earth remain the norm | V07 §3.4 step 6, V07 §3.11 |
| J-V7.16 | chose a defensible-ground pull of at most `palisade.pullM` (10 m) on the palisade trace as our extension, off under `VG`, over VG's pure hull, because a village bank followed the rise; kept small so VG's hull shape holds | V07 §3.4 step 4 |
| J-V7.17 | chose a green as the default open space and a square for `latin` and `greek` culture keys, a dossier market or the `VG` preset, with the one market held on it (a dossier record, or the market law above 900 people), else a flanking square, over a separate market place, because a northern village's market was its green and a southern village's its square, and PART III allows at most one market | V07 §3.1 (5), V07 §3.6 |
| J-V7.18 | chose a registered product — `ProductDecl` in its own package `@plat/village`, reusing the base's pipeline machinery with its own stage set — over a fork of the pipeline or a village switch inside the base stages, because the base must not pay for the village (PART III) and registration by declared I/O is the base's extension mechanism (items 505, 202) | V07 §2.1, V07 §3.0 |
| J-V7.19 | chose to keep a block interior deeper than twice the toft-plus-croft depth as a commons-owned back close, a hinterland face above 2 ha, over cutting more frontage into it, because villages kept garths behind their tofts and fields inside a ring of lanes are real, and houses along ways must stay along ways — amended by J-V7.53 | V07 §3.8 |
| J-V7.20 | chose ends — named parts of the one district, anchored on the green, church, manor, mill, crossings, entries, wharf, nuclei and claims, the derived ends capped by the law `1 + ⌊households ÷ 25⌋`, at most 6 (J-V7.47), declared ends exempt (J-V7.71) — over sub-districts or several districts, because PART III (4) fixes one district and villages named their parts by landmark | V07 §3.10 |
| J-V7.21 | chose epoch growth as infill of closes, then encroachment cottages on the green's or common's edge (at most a quarter of a green), then extension by trackers, then a new nucleus, over the base's growth stages, because villages filled their tofts and their squatters took the waste before they spread, and a village has no growth stages | V07 §3.12 |
| J-V7.22 | chose, at the hand-off up, to make the green the principal market's reservation when the town has none, over a new market square, because many market towns' markets were their former greens (least disruption, item 22) | V07 §3.12 |
| J-V7.23 | chose, under `VG`, one household-size draw per village in [3, 7] read in reverse (dwellings = population ÷ the draw) over VG's population = dwellings × the draw, because the requested population must still decide while the relation stays VG's | V07 §3.15 |
| J-V7.24 | chose no stage-2 close-up of a village district — its model already carries tofts, crofts, closes and yards at the neighbourhood band — over running V01's composer on it, because a second composition would duplicate the village's own plot-scale fabric | V07 §1, V07 §5.2 |
| J-V7.25 | chose the `painterly` family as the village's opening look, `ink` one click away, over opening in `ink` as the town does, because emulation-first makes VG's look the village's default (DEFINITION §1: match how the references look) and the base reserves the slot for it | V07 §5.1 |
| J-V7.26 | chose that every water body closes a village palisade — sea, lake, pond, river and brook alike, a water arc never walled — over walling across a fordable brook, because a village never fenced off its own water (stock, the mill, the ford), item 106's "never cut off water access", and VG cuts at every shore | V07 §3.4 step 5 |
| J-V7.27 | chose to keep a walled stretch between two barriers that no road crosses, dropping it only under `VG`, over VG's drop everywhere, because with the barrier closure an approachable arc left unwalled would open the enclosure — item 106 walls exactly the approachable arcs — and the gates stay where the roads cross | V07 §3.4 step 7 |
| J-V7.28 | chose an always-open village waterfront, a sea threat raising a watchtower at the wharf or landing, over item 106 (d)'s quay wall with sea gates, because villages did not wall their shores and a lookout is the attested response; no harbour-mouth chain without a harbour basin | V07 §3.11 DR2 |
| J-V7.29 | chose to pass a village's imports and exports through a `store` use on an existing plot — the carriers' inn at the partner's entry, else the landing, else the nearest farmstead's barn — over a new storehouse, because a village had no warehouses and the dossier lists what exists | V07 §3.11 |
| J-V7.30 | chose no works-and-shop split switch of the village's own, an author's declared split allowed and a standing pair never merged by a rung change — superseded by J-V7.115 (the one off switch V11's `siting.web.splitEnabled`; item 105 (h)'s threshold decides at village rungs as everywhere) | V07 §2.1, V07 §3.12, V07 §4.1 |
| J-V7.31 | chose dwellings as link ends for binding and explanation but without placement pull, over two-way pulls on farmsteads, because the exact count and the density race decide the tofts (J-V7.8) and a farm's toft followed the village plan, not the mill | V07 §2.4 |
| J-V7.32 | chose to rebuild a promoted town wall on the palisade's trace when at least `ladders.replaceShare` (80 %) of the dwellings stand inside it, else a new ring anchored on the barriers and the palisade, over always a new ring, because least disruption (item 22) and the historical pattern of stone walls on the older circuit's line; the 80 % cut is ours, calibratable | V07 §3.11 (absorb half) |
| J-V7.33 | chose to site the mill seat and carve its leat at VS1, before the network, making the mill an anchor of the supply web, over placing the mill with the other institutions at S10b, because its hard water need decides its site, the leat is L0 water that must precede the network's L1 (§3.3's order) and the roads must reach it | V07 §3.2 (7), V07 §2.4 |
| J-V7.34 | chose item 102's village reading as terms in the heart score, the density and the field suitability (the sunny slope for the settlement, the shaded slopes for the woods), besides prosperity, with `heart.prominence` +0.2 beside the wind penalty −0.3 so a sheltered shoulder or the lee foot of a rise scores above both the exposed crest and the flat bottom, over prosperity alone, because a village chose its sunny slope before its rich side and often sat on or beside a rise; every term at 0 reproduces the build without it (T-V7-19) — amended by J-V7.134 (the climate cell multiplies each reading) | V07 §3.2 (4), V07 §3.3, V07 §3.9 (2) |
| J-V7.35 | chose 2–3 great fields as angular sectors around the heart bounded by the roads out, rebalanced to ± 25 % and each the rotation unit, over §4.9's per-furlong rotation slot, because the open-field system rotated whole fields divided by the roads; the furrow runs downslope above 2 % | V07 §3.9 (3) |
| J-V7.36 | chose, at the hand-off down, to derive a `VillagePlan` from the standing town (heart at the principal market, form nucleated, roads from the arterials, ends from the districts) and keep every district, over re-cutting the shrinking town as a village, because least disruption keeps the standing fabric and the village phases need only a plan to read | V07 §3.12 |
| J-V7.37 | chose a `villageForm` column on the class rows plus a tag fallback for SettlementForge's kinds at village rungs, over a second village roster, because one roster keeps DR24 one rule and V11 fills the column once (item 430) | V07 §2.7, V07 §3.11 |
| J-V7.38 | chose to draw "Palisade or earthworks" between the two kinds by the rung's kind weights, renormalised, over always a palisade, because the dossier leaves the choice open and every gap is derived by our rules (item 20 (h)); a town-wall record at a village rung builds the stone circuit | V07 §3.11 DR2 |
| J-V7.39 | chose our own member ranges for the unnumbered ladder qualifiers at village rungs (multiple 2–4, guild 2–8, district 2–10 by rung) over the base rungs' ranges, because a village's population supports only a few members; inside the range S2's per-capita rows still decide | V07 §2.4 |
| J-V7.40 | chose that a dossier chain whose processor is absent from the map binds nothing and is reported, over inventing the missing building, because the dossier's institution list is the truth of what exists and item 105 (i) makes chains links between bound members | V07 §3.11 |
| J-V7.41 | chose to state the village class rows (profiles, supply, balance, spacing and ladder readings, the crypt, `deckOk` and tier-cap cells at village rungs) in this volume, cited by V11, while V11 owns the goods table and the base rungs' rows, over V11 restating them, because the village rungs are this volume's subject (single source); at village rungs this volume's rows win over V11's town rows | V07 §2.4 |
| J-V7.42 | chose the model budget as a law of frame area and footprints — `20 ms + 0.8 ms × frame km² + 110 µs × footprints`, p95 bars 30, 50 and 100 ms, a declared miss above ≈ 1 100 people — over one number per rung, because size follows population (§1.1 *Budgets inside a rung*) and §12.4's measured rate prices the frame; declared with its pre-decided fallback (J-V7.61) | V07 §6 |
| J-V7.43 | chose the tracker network at every village size, with the pre-decided fallback above 800 people (nucleated branch spacing, the bent cut on interior faces over 4 ha), over switching to the base's backbone at the VILLAGE top, because VG's grown look is the reference and the legibility risk is measured first (V-M0) | V07 §8 (risk (1)) |
| J-V7.44 | chose one plot per frontage slot with toft and croft yard parts (and a drive where the class asks) over VG's bare house rectangle, because the plot model comes first (DEFINITION: plots first, buildings on the plots) and toft-and-croft is the attested village plot; VG's rectangle under the `VG` preset | V07 §3.8 |
| J-V7.45 | chose a barrier reach at village rungs of `min(the base's reach, 0.5 × R_s)` — the base's 150 m cap at the VILLAGE target, ≈ 120 m at the HAMLET target and ≈ 50 m at a 40-person thorp — over the base's flat 150 m, because a flat reach would let a thorp's fence run far beyond its houses | V07 §2.2, V07 §3.4 step 5 |
| J-V7.46 | chose a light stretch on steep ground and marsh (a wattle fence, a low bank, a parapet) and end posts rather than towers at palisade and earthwork anchors, over the base's graded curtain and anchor towers, because village defences had no towers (VG's palisade has none) and a steep bank needed only a fence (item 312) | V07 §3.4 steps 5–6 |
| J-V7.47 | chose laws of `P` with the rung values as anchors (piecewise linear in ln P, clamped; presence rows as `PLaw`s) over per-rung constants, because the owner's definition requires smooth scaling inside and across the village bands; raster sizes, the frame floor and the `VG` column stay rung-stepped by design — amended by J-V7.136 (the grandeur ceiling rung-stepped by the owner's item 115) | V07 §2.2, V07 §2.4 |
| J-V7.48 | chose V04's frame-share cap for a ruin's extent at village rungs, with its centre on the village district's centroid when no marker or node locates it, over a settlement-box cap, because item 109 (j) (1) says the extent is the site's, not the settlement's ("a hamlet may sit over a large one"), while the centre rule still puts an unlocated ruin under the village | V07 §3.16 (2) |
| J-V7.49 | chose to record a mine working's break into a void at a village rung as an `AccessPoint` of cause `mineBreach` with no link, over a `quarry` system below TOWN, because the quarry's gate is TOWN and above while item 109 (a) (3) makes the working an access; the working becomes a quarry source at the hand-off up | V07 §3.16 (4) |
| J-V7.50 | chose VS1 to take over S3's non-siting jobs — the border first in its L1 batch, the lattice and costs, typed destinations, the L0 ponds — and the green's centrepiece pond and fishponds as uncarved pond parts, over re-registering S3, because S3's siting is VS1's and the rest must precede the network's L1 while the green is sited after the L0 batch | V07 §3.0, V07 §3.2 (8) |
| J-V7.51 | chose to lay the wharf and piers in VS4's batch with the pier count read from S2's dwelling count, over a VS7 after S10b, because no L1 write may follow S9 (J-P46) and the count needs only the demand, not the built houses | V07 §3.10 |
| J-V7.52 | chose VS6 (the stage replacing S8, which may write L1) to run the capacity estimate and F-V-SLOT's first three rungs with inward top-up trackers, over S10a, because S10 never writes L1; the last two rungs stay at S10a and S10b | V07 §3.8, V07 §3.13 |
| J-V7.53 | chose to cut block interiors over 2 ha out of the perimeter in VS5 (the plat's holes), over re-owning faces in VS6, because S7b's allocation and S12a's decisions must see the final district and hinterland | V07 §3.7 |
| J-V7.54 | chose to split the dwellings `N` into the village's `N_v` and the outlying `N_o` from the farm table's households, over housing the outlying farmers twice, because every household is housed once and DR7 counts both as the settlement's dwellings | V07 §3.2 (3), V07 §3.9 (5) |
| J-V7.55 | chose to trigger DR7's small-range rule on the household count, lowering the household size to at least 1.5 persons and building any surplus vacant, over the `2 · range.min` population trigger, because SettlementForge's 10-person thorps must meet a 4-dwelling minimum and a vacant house is the attested reading of decline | V07 §3.11 DR7 |
| J-V7.56 | chose the resolution order pseudo-reader → village form → own row → fallback (only for `unmapped_kind`), over the fallback before the class's own row, because V11's pseudo-classes bind to readers and a named class must play itself | V07 §3.11 |
| J-V7.57 | chose to seat a village's `cemetery` record as the churchyard enlarged (or an edge cemetery plot without a church), carrying the binding key as a burial face, over a second church or a town-sized cemetery class, because a village's graveyard was its churchyard and J111 puts catacombs only under burial grounds | V07 §3.11 |
| J-V7.58 | chose `access_to_external_mill` to suppress both mills and import the milling, over keeping the roster's watermill, because the dossier says the settlement has no mill of its own | V07 §3.11 |
| J-V7.59 | chose Wealthy Residential as a claimed end on the highest-prosperity plots with its bias there alone, and Common Residential as no end and no bias, over district-wide biases, because a village is one district and a whole-village bias would misstate its wealth | V07 §3.11 DR5 |
| J-V7.60 | chose the daylight share as nine horizon sweeps over the grid, and `D` as the sunlit share with item 102's shade = 1 − D, over item 102's wording alone, because a producer was missing, the sweep is O(cells) per sun position and the sign must be pinned once | V07 §2.3, V07 §3.2 (4) |
| J-V7.61 | chose coarse hydrology grids (16 / 24 / 32 m) and the frame-priced model law with its declared miss above ≈ 1 100 people against the 100 ms bar, over a law under the measured rate, because a village's rivers are vector and §12.4's rate prices the frame honestly | V07 §2.2, V07 §6 |
| J-V7.62 | chose the worked radius (≈ 100 / 245 / 480 m) from the croft rows as written, over cutting the croft rows, because the toft-and-croft sizes are the attested village plot and the budget follows them | V07 §3.2 (6), V07 §3.3 |
| J-V7.63 | chose to keep a shrunk town's underground in V04's maintenance mode (re-derived from kept galleries, never grown, aged by U-FADE), with a catacomb `stagnant` by `'rung'`, over dropping the stages at village rungs, because tunnels are never torn down and a catacomb never shrinks | V07 §3.12 |
| J-V7.64 | chose `crypt: 'basement'` at a 0.1 chance (the class row's cellar chance) with small `cryptM2` for the village parish church and `never` for the chapel of ease, drawn once per building by lineage, over reading the town church's row, because village churches seldom had crypts and the village classes are this volume's rows | V07 §2.4 |
| J-V7.65 | chose no churchyard part on a chapel of ease at village rungs, over every church plot's churchyard row, because chapels of ease commonly lacked burial rights; so a chapel is never a burial face | V07 §2.4 |
| J-V7.66 | chose the hand-off up's catacomb step to take burial faces only, ranked by burials served, one at TOWN, reading the face's own years since its use opened across the crossing, the crypt joining only by the crypt-join draw, over the largest church, because J111 puts catacombs only under cemeteries and a churchyard's age is its own | V07 §3.12 step 6 |
| J-V7.67 | chose one `VillagePlan` per document, ever — superseded at a hand-off up and revived at a hand-off down, with VS2 and the plan's read kept as base-product participants while it is superseded — over deriving a fresh plan per crossing, because identity must be stable and the old core's fabric reads the plan's inputs | V07 §2.3, V07 §3.12 |
| J-V7.68 | chose a 5 % hand-off band as a fold over the epochs (never a stored flag), over switching exactly at 1 500, because a village oscillating around the threshold would flip product, district kind and market every epoch | V07 §2.1 |
| J-V7.69 | chose to key a branch by its step index along the parent (`t0/s<k>.L`) over its branch ordinal, because an earlier branch's appearance or loss renumbers ordinals and churns every later address | V07 §2.5 |
| J-V7.70 | chose typed sub-records in `VillageRungRow.rules` for every V07 §3 constant, over prose values, because rules are data (DEFINITION §5, item 23): editable, versioned, calibratable | V07 §2.2a |
| J-V7.71 | chose a lassoed `declareEnd` keyed by its event's address, exempt from the merge and the cap, with the count badge in its dry run, over a point anchor with nearest-anchor plots, because item 101 R4, R13 and R14 require lassos, held declarations and the badge | V07 §2.3, V07 §4.1–V07 §4.4 |
| J-V7.72 | chose explicit request fields (`organic`, `district`, `orchards`, `forest`, `arableFactor`) with `organic` also derived from the intent's organic dial, and the reference's request mapping held with B-VG's baseline rows, over naming the reference's requests in the volume, because the bench needs a mapping while the clean-room rule keeps the reference's vocabulary out of the design | V07 §2.7, V07 §3.1 |
| J-V7.73 | chose to specify the painterly building, edge, bridge, crown and spotlight programs at build depth with our own cells, over citing V02's roof rows alone, because the reference's look is the village's default (emulation-first) and B-ZOOM must test each program | V07 §5.1 |
| J-V7.74 | chose the empty-road prune on under `VG` and off by default, over pruning always, because our township's tracks serve fields, farmsteads and landings | V07 §3.5 |
| J-V7.75 | chose VS6 to mark the palisade's reached faces and S10's `toft` strategy to lay commons closes on them, typed by S12b, excluded from quotas and capacity, over S10b laying plots, because S10b places uses and item 106 (b) homes the typing in S12b | V07 §3.4 step 5 b |
| J-V7.76 | chose the base's existence states for the desertion traces — a way's `abandoned` existence as the hollow way (its disuse epoch in `Lifecycle.since`), a dwelling's `cleared` existence as the house platform — over new fields, because the base's decline ladder already keeps the trace; only the ways' ladder row is added (item 268) | V07 §3.12 |
| J-V7.77 | chose to bind the palisade strategy's call with the density box as `boundary`, no gate sites and an open waterfront, over a new `planFrom` parameter, because the signature already fits the village construction | V07 §3.4 |
| J-V7.78 | chose to map the four archetypes without a village class to existing rows plus item 104's profile deltas, over four new classes, because a delta keeps one class set and the template families already supply the looks | V07 §2.4 |
| J-V7.79 | chose the village classes' dig rows by family (religious 0.5, great house 0.35, cellars 0.3, workshops 0.15, houses 0.12, hovels 0.03, pens and hearths 0), over one village-wide chance, because item 109 (j) (3) sets the chance by class | V07 §3.16 (3) |
| J-V7.80 | chose `ProductDecl.extraInputs` to add `districts` to S7's inputs, over renumbering stage ids, because the tie-break by stage id would put S7 before VS5 and the base's own order puts the district first | V07 §3.0 |
| J-V7.81 | chose to site the ruin marker on the most prominent non-arable hinterland face within 800 m of the heart, over the settlement's heart, because a ruined landmark stands in the open where the village did not build over it, while the ruin beneath may extend under the village | V07 §3.16 (6) |
| J-V7.82 | chose to keep V02's `composition.classFamily` rows (V02 §3.10.5, its home) as the one source of the village classes' composition keys, read first, every village row also naming a `templateFamily` of V11 §3.6.1 for its budget rows only, over two sources for one mapping — amended by J-V7.101 | V07 §1, V07 §2.4 |
| J-V7.83 | chose to make a raised way on a village map a read-only obstacle set every village stage respects — its feet joined at every derivation, its supports obstacles, its strip unbuilt (no toft yard part, no building; crofts, closes, a reached close included, and fields passing beneath with the supports as holes), its spans left to the span rule with country spans open — over re-deriving it with the village or leaving it to the base alone, because the village's own stages lay the ways, plots and fields around it and the owner lets a user add one at any rung; every unbuilt part may pass beneath, as fields do | V07 §3.5a |
| J-V7.84 | chose the house platform — the footprints plus a 4 m apron inside the toft, levelled at the mean of its samples — as the village's levelled unit, over the toft-and-croft plot, the block or the district, because medieval hillside houses stood on platforms cut into the slope, the spoil of the cut filling the downslope side, while their crofts and fields followed the ground | V07 §3.8a (1) |
| J-V7.85 | chose no district-edge terrace source for the `village-ways` fabric, keyed by the fabric (so it holds for the old core across both hand-offs), over a rung or kind key, because a village's perimeter is a density contour, not the edge of a levelled ward (item 506) | V07 §3.8a (5) |
| J-V7.86 | chose to exempt the longhouse from levelling, over levelling it like any dwelling, because its byre drained down the slope it was built along and its hard downslope rule must read the natural ground | V07 §3.8a (4) |
| J-V7.87 | chose not to generate field terraces or strip lynchets, over terraced arable on steep ground, because item 110 (a)'s sources are blocks, plots and wards and V07 §3.9's suitability keeps arable below 15 % slope; a field terrace is the author's T2 `ground` terrace stroke. **The realism alternative, recorded for the owner's veto:** Mediterranean and upland terraced fields and English strip lynchets were real; generating them would add a hinterland source (arable faces above a slope row levelled as contour strips with walls or banks) | V07 §3.8a, V07 §4.1 |
| J-V7.88 | chose ramps for the cart classes (`through`, `secondary`, `track`) and stairs above 60 cm for the foot classes (`lane`, `path`), with a plot's drive as a ramp and its door path as a stair, over item 110 (a)'s rule on ways alone, because at a village the crossings that matter are the plots' own accesses | V07 §3.8a (6)–(7) |
| J-V7.89 | chose to freeze a generated wall's re-derivation when its platform's dwelling is cleared (or its toft turned to garden), the wall then decaying by stretch, over re-deriving it from the ground, because a deserted hillside village keeps its platform scarps and a re-derivation must never delete an earthwork | V07 §3.8a (9), V07 §3.12 |
| J-V7.90 | chose a structural rung gate on every router call a village stage makes, provenance `owner` and no table cell, over trusting the base stage's gate, because the village reuses the router function outside S4 and the owner's rule allows generated raised ways at CITY and METROPOLIS only (item 290) | V07 §3.5, V07 §3.2 (8) |
| J-V7.91 | chose deck plots at village rungs only on a widened pier head (a smooth law of population, with a landing) or by the author, never dwellings, over a rung-stepped budget or houses on piers, because village jetties and bridges rarely carried buildings, the reference's piers are bare, and the population race must stay exact | V07 §3.10a |
| J-V7.92 | chose to carry item 110's state through both hand-offs unchanged — suppressions in the log, carried ways as standing fabric, levelling by fabric, standing deck plots with their dwellings — over re-deriving any of it at the crossing, because least disruption and the owner's "a removal holds" both require it | V07 §3.12 |
| J-V7.93 | chose to build a painterly program for every item-110 role of §8.2 (`retaining.wall`, `way.stair`, `way.ramp`, `raised.deck` with `deck.shadow` generalising `bridge.shadow`, `raised.support`, `raised.ruin`, `aqueduct.channel`, tiers by `roof.faces`), over leaving them to the ink defaults, because `painterly` is the village's default look (J-V7.25) and B-ZOOM must test each role | V07 §5.1 |
| J-V7.94 | chose culture-and-era rows with a village cap (one stepped building per settlement; no row for the culture keys `cultureForms` names in V11, so no chance there) over a ban on tiers below TOWN, because item 23 forbids universals; the ruin marker takes the stepped monument where its ancient culture built in tiers | V07 §2.4, V07 §3.16 (6) |
| J-V7.95 | chose the `v.` namespace for every village class row over a per-rung overlay on one shared row or unprefixed village-only ids, because the village and town rows of one word share no profile, template or presence law, T-V11-3 refuses a reused key, and a prefix makes every reference unambiguous; a class named in words in this volume's prose is its `v.` row | V07 §2.4, V07 §2.7 |
| J-V7.96 | chose reference cells (§7.6) for the values another volume owns (V11 §3.24.1's TOWN terrace row; the `church` family's footprint) over copying their numbers into `village.json`, because a copy drifts when V11 recalibrates while a reference follows it until a village cell is deliberately edited; the deck-plot depth is read by deck kind with no village cell at all | V07 §2.2a, V07 §3.8a, V07 §3.10a |
| J-V7.97 | chose, for a bridge-implying record on a site with no watercourse, to force a brook whose course separates the through road's two entries (an estuary on a coast; the topology raised to `through` unless the access word fixes it) over placing the toll house at an entry on every dry site, because the dossier's toll bridge is a fact and the watercourse is the gap a village derives to honour it (items 20 (h), 22); the dry desert and a fixed isolated access keep `toll_bridge_dry` — amended by V08 §2.6b (3) (the rule's one home, with its village column) | V07 §3.1 (1), V07 §3.11 DR1 |
| J-V7.98 | chose own ops `retireWay`, `effaceWay` and `reopenWay` for the hollow ways at village rungs, issued by V06's street candidate through the product's epoch rows and struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), over widening or reusing `downgradeWay`, because a hollow way leaves the network (no router reads it) while a downgraded way stays live, and V06's rule that primaries never downgrade (which its viaduct lapse reads) must hold at every rung; decks keep V06's deck candidate and states | V07 §3.12, item 268 |
| J-V7.99 | chose to export the landmark yard parts and a named beach in one village layer `landmark_parts`, the beach as the `beach` run of the shore profile carrying the dossier's string, over a new named-shore entity, because the dossier is the name's truth and the bank profile already holds the geometry; the three yard parts are data rows with their own roles | V07 §2.3, V07 §5.1, V07 §5.4 |
| J-V7.100 | chose V11 §3.6.1's `burial-ground` family plot area at the church plot's band as the size of a churchyard that seats a dossier burial record, over a new `village.json` cell, because the burial ground's size is V11's content and a churchyard seating that record is the same ground | V07 §3.11 |
| J-V7.101 | chose to state the village classes as typed rows in V11 §3.5's notation — family, template family (with the church's plot-area override and a dwelling's plot read as its toft), distribution and significance, powers and sectors, `deckOk`, balance, profile deltas and authored rows — with a `presence` column of member-indexed, conditioned `PLaw` entries and the context readings of the heart and the perimeter's road crossings (item 576 (a), (b)), over prose rows or a single-law presence shape, because V11's compiler must build the rows (T-V11-4, T-V11-7) and S2 must read the laws, and a second-member entry keeps the alehouse's smooth second law; and chose that the roster's coverage option adds no member at a village rung, because its rounded count steps inside a band against the smooth-scaling rule (J-V7.47) | V07 §2.4, V07 §10 |
| J-V7.102 | chose one translation of the village words onto V11's types — holiness the family's `alignment sacred +`, a service's local custom `dailyLocal`, a dwelling's or a seat's its family's clientele, "common" 0 · 0 · 0, "elite" `status +`, "law" `law +`, clustered as `disp` with `K cluster`, and the same-kind spacing as `K spread` (the potter 300 m, the tannery 400 m, the smithy 200 m) — over case-by-case readings, because one rule keeps the rows comparable and item 107 (d)'s spacing was the later, specific statement; the dwellings carry no authored rows (J-V7.31) | V07 §2.4 |
| J-V7.103 | chose to read an `@absent:` record at a village rung through each named class's village form — `@absent:church` zeroing `v.parish_church` and with it the parsonage and tithe barn keyed on it, the chapel of ease's own entry standing — over zeroing only the town class, which never stands at a village rung, because the dossier says the parish church is a neighbour's | V07 §3.11 |
| J-V7.104 | chose to force a dossier government's `villageSeat` class present with at least one member at every village rung, over leaving it to its presence law, because a seat record must always find its seat and a crown or merchant-oligarchy village would otherwise have none by chance; the presence column's per-capita and `perOther` members still follow the forced one (two `v.parsonage` under two parish churches) | V07 §2.4, V07 §3.2 (3), V07 §3.11 DR11 |
| J-V7.105 | chose to key the village range rows by step type with the qualifier as their label, over keying them by qualifier word, because a stepped record with no qualifier in its name (`tanners`; the trade GUILD kinds) would otherwise take V11's town range at a village (J-V7.39) | V07 §2.2a, V07 §2.4 |
| J-V7.106 | chose to key the tag fallback on V11 §3.13.2's keyword families, over this volume's own word sets, because rules are data (item 23) and one table serves the resolver and the fallback | V07 §3.11 |
| J-V7.107 | chose to read `parish_burial_grounds` as V11's COUNT over the standing churches' churchyards, none enlarged, with an edge cemetery only where no church stands, over the enlarged-churchyard reading of the single burial records, because the record names every parish's ground and a small town's churches each have one | V07 §3.11 |
| J-V7.108 | chose, in the typed rows, V11's `walk` coverage and a `far` row from the church family for the chapel of ease over a per-nucleus count, because the nuclei are sited at VS1 after S2 counts; the lord's-mill pair on the manor over the mill, because the mill's seat is fixed at VS1 before the manor is placed; no claimed fire gap from the cottages, because the dwellings are raced after the institutions and a derived row among placed members cannot keep one; the church's plot area 1 500 – 4 000 m² by band (own, calibratable) | V07 §2.4 |
| J-V7.109 | chose the village's epoch rows as V06's `ProductEpochRows` keyed by class id — every member of V11 §3.5.1's `church-family` tag × 0.3 and the manor, town manor and tower house × 0.5, the town classes included — with the street row's three ops and the hinterland's slack, order and cap, over named `church` and `manor` cells, because the engine reads only that shape and a town handed down keeps its town-class churches; the fold's product and rung, never the target's rung, choose an epoch's phases | V07 §2.1, V07 §2.2, V07 §3.12 |
| J-V7.110 | chose to read the latitude as a recorded input by V08 §2.5's resolution rule, over a `site.latitude` data key no stage produces, because the port already delivers it in the intent and the epoch's slice and T-V7-3 needs one producer per key | V07 §3.0, V07 §3.2 (4) |
| J-V7.111 | chose, at territory rungs, to measure `dist.market` to the reservation carrying the principal market rank (the open space, or the flanking square), else the first nucleus's open space, else the heart, and `dist.harbour` to the wharf's `quay` way where one is laid (else absent); to define a dossier market record as a record of V11's `market` profile family or a `mercantile-market` custom record; and to lay a `fair_ground` record as an extramural secondary `market` reservation of `market.fairHa` by the through road's perimeter crossing nearest the heart, claimed as common grazing — over leaving these reads to the base's closest option or holding the fair on the green, because the market and port classes that play themselves at a village rung carry hard rows that read these fields, V11 §3.13.4's chain rules read `dist.market` at every rung, and a village's market was its green or square while its fair field lay on the common by the road in; the fair field is never what `dist.market` measures to | V07 §2.4, V07 §3.6 (4), (4b), V07 §3.11 |
| J-V7.112 | chose a `rules.claimArea` cell set for the claim-sized template families at village rungs — the `cloister` family's plot 3 000 / 4 500 / 6 000 / 8 000 m² by band with the `church` family's footprint p50 by reference, joined from slots by S10 (7); the `market-hall` family's plot its footprint p50 ÷ 0.8 at the median household's band, the rim claim taken only by a `market-hall`-family class with a `nearMarket` row (today `market_hall`), cut from the market's open space with the space grown so its open ground is unchanged, taking no toft slot; a `slave_market` joining slots up to `A_h` sited by its own rows toward the harbour or a gate — over a village claim stage or a per-class override, because no S3 claim exists at a village rung and the families' `underSize` is `refuse`, so the three claim-sized classes a small dossier reaches (a monastery, a market hall, a slave market) need finite plots; a friary or a small priory, not an abbey's precinct, is the village's scale, and a market hall stood on its market | V07 §2.2a, V07 §2.4, V07 §3.6 (4a), V07 §3.8 |
| J-V7.113 | chose that a forced seat stands even where an `@absent:` record zeroes the class its `with` or `×` cell names, its rows naming the zeroed class read as neutral (the hard one included), over letting the zeroing remove the seat or reporting its hard row as failed, because the government is its own dossier fact and the dossier says the parish church is a neighbour's, not that the parish has no priest | V07 §2.4, V07 §3.11 DR11 |
| J-V7.114 | chose `calibratable: false` for `rules.ladders.ranges`, changed only as a table fix reviewed with V08, over leaving the village range rows calibratable, because they are the port's derivation rule for an unnumbered record (item 20 (h)), which no calibration run moves, and a calibration must never change how a dossier fact is read | V07 §2.2a, V07 §2.4 |
| J-V7.115 | chose to make V11 §3.7.4's `siting.web.splitEnabled` the one off switch for generated works-and-shop splits (false in the `MFCG`, `FTG` and `VG` presets), item 105 (h)'s threshold deciding at village rungs as everywhere, keeping the declared split (item 310) and the never-merged pair, over a village rung-level switch, because V11's switch is already the parity presets' off form of the supply web (J-V11.72) and a rung-level switch would be a second switch for one behaviour | V07 §2.1, V07 §3.12, V07 §3.15 |
| J-V7.116 | chose to place a village's market records at an epoch by its own rules, in the batch of the phase that brings them — the fair field over hinterland faces turned `commons`, a rim hall's claim cut from the open space without growing it (within `epoch.encroachShareMax`, else joined vacant rim plots, a dossier hall beyond the share as the last rung), a claim-sized opening over joined plots (else an outside plot at the edge), the market rank by `setAttr` (a street market at the heart where no open space stands), the fair field cut out of a re-derived perimeter and kept as a standing secondary market at the hand-off up — over the base's *Markets over epochs* S7b claim or growing the open space as generation does, because a claim in a due district puts an extramural fair inside the one village district, a grown green at an epoch would move standing tofts, and a hall encroaching its market place and a friary at the village's edge are the historical readings; the phases that run them are J-V7.125's | V07 §2.6, V07 §3.6 (4b), V07 §3.12 |
| J-V7.117 | chose that S2's government step at the territory rungs reads the government row's `villageSeat` alone — forced for a dossier government or an `@seat` record, a request government feeding only the `gov` presence conditions — and reads neither its seat class, nor its offices' seat classes, nor its military share, over the row's town seats and guard posts at every rung, because a village's officers sat in the lord's, the reeve's or the priest's house, a crown village with a palace and a castle or an ecclesiastical one with a cathedral breaks the rule that no cathedral stands at a village rung, and a guard post at 700 people would override the watchtower's presence law that T-V7-12 bars | V07 §3.2 (3), V07 §3.11 |
| J-V7.118 | chose that S11's furniture step places no pin at the territory rungs, VS8's rows being the village's whole furniture, over letting both passes run or trimming the base's rows by rung, because two passes give a green two centrepieces and two sets of stalls and put statues, fountains and bandstands in a village, the fair field is common grazing between fairs, and one stage owning the furniture keeps T-V7-57 checkable; the light rows are not the furniture step and run unchanged | V07 §3.0, V07 §3.10 |
| J-V7.119 | chose one cell, `rules.race.densityPower` (default 1 at every rung, the plain density), whose `presets.VG` entry is this volume's one measured-rate `VG` entry — confirmed at V-M4 at 1 when T-V7-23's accepted-share row holds its band, else fitted by the one `reference` run — over an unnamed tuning at V-M4 or fitting the default as well, because V12 admits a preset entry to a run only when a register entry names it, risk (2)'s fallback needed a cell, and the default village carries our own density terms that VG lacks, so VG's fitted power is a parity knob, not a default; the corpus stage (M-CAL) may move the default | V07 §2.2a, V07 §3.8, V07 §3.15, V07 §8 |
| J-V7.120 | chose to ship the `VG` preset file at V-M0 — this volume's `VG` column and switches, V11's five entries by V11 §2.2's rule, and a `presets.VG` entry on every village-read `presetsRequired` cell of another table (`cut.bendMode` named; the rest by one rule) — over V-M1, because V-M0's exit already runs under `VG` and V11 lands its entries with V-M0; the preset file's data work sits in V-M0's row | V07 §3.15, V07 §8 |
| J-V7.121 | chose `calibratable: false` for `village.json`'s switch and mode cells and for every reference cell, the table compile refusing a calibratable switch (T-V7-44), over "every cell calibratable", because a calibratable cell is one a run may name and a run searches numbers (J-V11.75, T-V11-37), and a reference cell's value is its target's, calibrated there | V07 §2.2, V07 §7 |
| J-V7.122 | chose stage `VS1` for the `village.plan` participant and `VS2` for `village.density` — the stages whose steps they re-run — over a stage id of their own, because V06 §2.1 requires the field and it fixes the village epochs' stream keys for good (stage ids are never renumbered) and tags their table reads for V11's registry and T-V11-1 (b); the two ids are already row 61's readers and V06 §3.16's list, so `village.json`'s readers stay the village stages, V06 §3.16's fifteen ids gain none and the draws stay on the stages' own concerns | V07 §2.1, V07 §3.12, V07 §3.14, W28, T-V7-14 |
| J-V7.123 | chose the seat landing each change that makes a table village-read (V-M2u's registration of V04's tail) or adds a `presetsRequired` column to a village-read table as the writer of those cells' `presets.VG` entries, by V07 §3.15's rule and in that same change, over the seat landing V-M0 alone, because V11's compile names only the cells village-read when it runs and stops the build on a missing one, so a later change that widens the set would otherwise have no named writer and could not land; the rule (VG's code-read behaviour, else the `MFCG` entry's value, `fixed:`) asks no new judgement of that seat | V07 §1 (11), V07 §3.15, V07 §8, W67 |
| J-V7.124 | chose to write no register line of its own — every calibratable column this volume lands takes V12 §3.11's default line, but `rules.race.densityPower`'s `VG` entry, named by V07 §3.15 — to land `village.json` whole at V-M0 with all its entries in that change and the `presence` column's at V-M2, and to put the register check in every V07 §8 exit cell, over lines naming T-V7-12, T-V7-20, T-V7-33 and T-V7-34 as `BenchBarDef`s, because those bars test orderings against random baselines and rates against their anchor laws — each reads many cells across the class rows and `village.json` and none isolates one column's value — so a `measure` entry naming them could neither confirm nor move a column; most cells they bear on are columns of `roster.classes` already bound by V12's lines (the items 103–108 line among them); a V-M2 miss is repaired in the landing change, which the default line's entry does not record (its first history row is M-CAL's); and a `VillageRungRow` is one typed record, written whole with the `VG` file V-M0 ships, so one change writes every entry once | V07 §8, V07 §2.6, W69, V07 §12 |
| J-V7.125 | chose a records placement, `village.records`, called by the engine's `dossier` step before the base's placement, that places the market, claim-sized and pin records in the epoch they arrive and declines every other record to the base's placement — with a roster member placed in the `uses` step when claim-sized (V06 §3.9.6) and otherwise in the siting override's opening step (m) — over overriding the engine's whole dossier step or deferring a record to the next epoch, because the dossier step carries the ladder steps, the chain re-binding, the walls trigger and the see's crypt that the village does not re-implement, and a deferred record leaves a dossier element unplaced against the base's invariant (§5.3); a named record is never declined for a failed placement and never waits (its last rung the base's `dossier` request's closest option), since a declined one would take the S7b claim the village never runs; the hall, the cloister and the outside plot are cut, built and opened by the base's ops so each is in the epoch's record (a record's ops no undo target, §7.4; a roster member's undone with an epoch that is one) | V07 §2.1, V07 §3.12, W70, W71, W73 |
| J-V7.126 | chose a participant, `village.pins` (`afterGrowth`, order 60, stage `VS8`, at village rungs only), that runs VS8's rows by least disruption over what the epoch changed — an orphans step for a pin whose host face the epoch tombstoned, wells serving every housed household the coverage row leaves unserved, stalls brought to count and removed with a closed market, the new hosts' rows keyed by their host's lineage, the population-law rows by their one creation draw, a Roadside Shrine quarter's shrine, a pin record re-bound, no pin removed whose host stands save the stalls — over re-running VS8 whole at an epoch or letting S11's furniture step run at village epochs, because a whole re-run moves standing pins (least disruption, item 22), item 579 forbids the second, and keying a new host's pin as generation keys it makes an epoch's pin the one a regeneration would place; a handed-down town's statues, fountains and bandstands stay as standing fabric | V07 §3.10, V07 §3.12, W72, T-V7-57 |
| J-V7.127 | chose that a `@pin:<kind>` record binds to an unbound standing pin of its kind within `presence.siteReachM` of the frame's centre, nearest the heart first, and else forces one pin of that kind in VS8's batch keyed by its binding key — a shrine where the shrine row sites one, a market cross at the market's centre in place of the drawn centrepiece (at an epoch or an absorb beside a held centrepiece, replacing only an engine-placed one no one holds), a well only where none stands, a merged wayside shrine's cross in the churchyard part nearest the church's door — the forced pin tombstoned with its record (save a forced well the coverage row counts, kept unbound, J-V7.130) and a merely bound pin left standing, over raising the shrine row's chance or one VS8 row per record kind, because a record is a dossier fact that must find its pin (items 20, 22), one rule covers every pin kind the catalogue and the archetype cells map, and the chance pins stay chance while the forced one belongs to its record | V07 §2.4, V07 §3.10, V07 §3.12, W25 |
| J-V7.128 | chose that the base's placement of a record an absorb adds **without an epoch** (§7.7's *One path* sentence) calls the product's records placement first, as the dossier step does, with a context holding only what the placement reads (the document, tables, product, rung and the absorb's week; its keys the absorb's dossier event's `seq`), over routing such records only through the next epoch's dossier step or letting S10b's `dossier` request take them, because V08's absorb path applies element events outside epochs, a waiting record leaves a dossier element unplaced against the base's invariant, and S10b cannot lay a fair ground's reservation or a hall's claim; one call on both paths keeps one list of what the village places | V07 §2.1, V07 §3.11, V07 §3.12, W70 |
| J-V7.129 | chose to key `village.records`' draws and minted addresses by the adding (for `remove`, the removing) dossier event's `seq` as creation index, epoch component 0 — as the base keys any post-build placement of a dossier event (§6.1, §6.3; §7.7 item 6, J-A22.76) — on the epoch path and the absorb path alike, the forced pin's site still drawn on `pin.decor` by the record's binding key, over an epoch key (the town root, the placing stage, the epoch and an ordinal), because an epoch key gives two absorbs between the same pair of epochs one address, gives an absorb the address the epoch's own placement minted, and splits one record's identities between the port's two groupings of a week's changes; a roster member's opening keeps V06 §3.9.6's epoch key, since no dossier event causes it | V07 §2.1, V07 §2.6, V07 §3.12 (b), (c), V07 §3.14, W70, W73, T-V7-13 |
| J-V7.130 | chose a `remove` member on the records placement, called after the base's removal of a record at an epoch or on an absorb, that tombstones the fair field's reservation (its faces kept `commons`), tombstones a pin the record forced with its binding and unbinds a pin it bound but did not force — keeping a forced well the coverage row counts, unbound, with the coverage row as its provenance — and clears a removed market record's principal rank unless another market record stands or the law's one draw passes at the population, the square kept as an open space; over keeping the fair field as the base keeps a closed market's square, leaving a forced pin to the next Regenerate, or keeping the rank, because the field is common grazing with no square to keep, a forced pin belongs to its record and would otherwise stand with a provenance naming a record the dossier no longer holds, a well the households still draw from would be placed again by `village.pins`' next coverage pass (least disruption, item 22), and a village market is a rank, not a use, so `closeUse` closes nothing, and keeping the rank would keep a market the dossier no longer holds and our law would not derive (items 20, 22); a hall or a cloister stays for item 17's re-use | V07 §2.1, V07 §3.11, V07 §3.12, W25, W70, V07 §2.6, T-V7-13, T-V7-57 |
| J-V7.131 | chose that a REPLACEMENT greater whose lesser stands on the map and whose thing differs from the lesser's is placed new by `village.records` whenever it arrives — by a promotion receipt, beside its lesser, or as the lesser leaves the list — (item 4: the church by S10b's solver in that batch, then the shrine's churchyard cross, the old roadside shrine left standing, unbound; the fish market's rim hall, the fishmonger's shop keeping its use), a receipt's one key binding the greater placed new and a kept pin laid for the record with no binding row (V08 §3.5.1 (d), J-V8.114), and that the `town_walls` key binds the rebuilt enceinte, else the new ring, with the palisade's key its alias, over re-keying the lesser's thing as the greater's member #1, because a roadside pin cannot be a church, a fishmonger's shop is not a market hall and a superseded palisade is not the town wall; the placement issues the church's request itself so the cross follows it in one batch | V07 §2.4, V07 §3.10, V07 §3.11, V07 §3.12, W25, W70, T-V7-13 |
| J-V7.132 | chose to land `ProductDecl.records`, its calls on both paths, the two phase overrides and the participants' run on `grow-by-stage` as hooks of the product's registration with item 202, on M4's grow path, item 317 carrying them into V06's phase interface at M6-E, over staging the village's records call and pins with V06's engine or accepting S10b's request for village records until then, because the village slots after M4 in parallel with M5, T-V7-13's absorb clause exits at V-M2, and S10b's request cannot lay a fair ground's reservation or a hall's claim — without the hooks the records placement's and the pins' failures return on the village's own milestones; the hooks are small wiring at item 202's call points, priced inside V-M2; V-M3's grow-path parts need no M6-E milestone, while its clauses that run V06's steps exit with M6-E's E2–E4, a village epoch before then taking risk (10)'s fallback | V07 §3.12, V07 §8, V07 §1 (13), W28 |
| J-V7.133 | chose to give the 25 `v.` rows a label and synonyms in plain words as a column of V07 §2.4, and to derive `commonness` by one rule — each row's roster share at VILLAGE's default target, computed by V11's compiler at step 5a from the compiled rows and recomputed by T-V7-56 — over hand-set commonness numbers, because the tie-break's only job is to prefer the class a village holds more of, the rule stays true when a presence law is recalibrated, and a hand-set number would drift silently; the pin kinds take their words from V08 §4.6's `host.pinKind.<kind>` rows | V07 §2.4, W18, V07 §2.6, T-V7-56 |
| J-V7.134 | chose item 111's village reading — S0's water weights re-weighted on an arid climate row by the arid-to-temperate chance ratio of each water class with `none` taking the rest, the oasis drawn beside the water type by the base's rule and read as water by every village rule that reads water, and the crowding map's added water-pull term `w_water · pw(x)` beside its old water term, every sun reading × the climate row's sunlight cell — over replacing the density's water term or giving the village its own oasis rule, because the base's `q(x)` and weights are the one definition of reliable water and its pull (§4.2 S3 (6)), the old term keeps VG's draw to the water's edge, and with the weight 0 and the cell 1 the village is byte-identical to the build before item 111 | V07 §3.1 (1), V07 §3.2 (4), V07 §3.3, V07 §3.10 |
| J-V7.135 | chose the palisade's condition and material per run on `Enceinte.condition` with the village kinds' rows of `walls.patchMaterials` (V11 §3.25.3: odd stakes, hurdles and brush on a palisade; brush and turf, and hurdles, on a bank; V11's masonry rows on a stone circuit), decay and recovery by V06 §3.7's need and means, the generation-time conditions by §7.7's readiness-and-wealth row, a patch kept apart from a light stretch, over a village decay rule of its own or drawing a breached palisade whole, because item 114 makes the palisade one enceinte among the rest, a light stretch is a terrain grade while a patch is repaired damage, and the parity preset draws VG's whole palisade | V07 §3.4 (8), V07 §3.12, V07 §5.1 |
| J-V7.136 | chose item 115's grandeur ceiling as a rung-stepped reading of V11's ceiling rows — at THORP and HAMLET no grand dwelling and no manor unless specified, at VILLAGE at most one manor and only with a lord or when specified, every other dwelling at most `L` or `T`, wealth moving a dwelling only along its capped row — with the manor's presence law under it (0 at THORP and HAMLET, its `gov seigneurial` law at VILLAGE, else 0) and "specified" meaning a dossier manor or hall record, a dossier government's `villageSeat` naming the manor, or the author's placement, over keeping the manor's small chance by population or capping by wealth, because the owner's rule is by tier and outranks the anchor law's smoothness, the dossier's government is its own fact (J-V7.113), and a hand edit is never refused (item 101 R2) | V07 §2.4, V07 §3.8, V07 §3.11 DR6, DR11 |
| J-V7.137 | chose the township view as the zoom-out limit's view less its one-stop margin (item 116; §8.8's per-map limit), the first view unchanged, over a fixed township stop per rung, because the limit is the map's own land and moves with the frame, and one stop inside it frames the whole township with nothing beyond | V07 §5.2 |
| J-V7.138 | chose to generate a village over a former town by the ordinary hand-off down inside the replay's creation prefix, its remnants whatever the village's own rules leave of the town, and to make a refounded village reuse the old fabric by four draw-free rules — the lattice's reuse price on a ruined way, a tracker trace term (`refound.traceWeight` within `refound.traceReachM`), a ruined bridge's site as a crossing site, a slot weight over a ruined footprint (`refound.foundationSlot`) — with a ruined wall crossed at its openings, over a separate remnant construction or forcing the new ways onto the old, because §4.11 already defines the replay and the village's decline already produces hollow ways, standing churches and empty plots, and soft reuse lets a new plan follow the old wherever it helps without copying it; all 0-neutral with the replay off | V07 §3.12a |
| J-V7.139 | chose to wire `density.bandWeight` as the elevation band's weight (1 at every rung, so no output moves) and to remove `network.slack` and `network.emptyDensity`, which no step read, over giving the two removed cells readers, because a reader added now would change the network's behaviour (the empty-road prune reads `populated`), while the band's weight makes a cell the density formula already implied real | V07 §2.2, V07 §3.3, V07 §3.5 |
| J-V7.140 | chose one village `WhyProvider` over `VillagePlan`, `VillageField` and `VillageEnd` answering from committed records — the heart's terms recomputed, the sources recorded (`formSource`, `roadsSource`, `heartSource`), the remnant, ceiling, palisade-run, season and festival lines — as `info.village.*` rows of V09 §4.9's catalogue (their words this volume's), over leaving the kinds to V10's generic provider, because V10 §3.9's owed table assigns them to this volume and a generic answer cannot say why a village has the form or heart it has | V07 §4.5, W74, T-V7-61 |
| J-V7.141 | chose to dress the village through the year by §8.2's season rows keyed on its own surfaces — each great field by its rotation slot's crop, the strips offset strip by strip, stooks after the harvest weeks, the green and commons by the climate's grass rows, ice on still water before the leat and the stream with open water at the mill race — and autumn's plethora (per-crown colours by keyed draw, leaf cover deepening over the green, lanes, tofts, churchyard and roofs, red creepers, rust bracken, gold stubble), a look only, over one tint per season, because item 117 makes the year position a view state that never touches the model, and the open-field village's look is its rotation | V07 §5.1 |
| J-V7.142 | chose the festival decorations of the village rungs by §8.2's rows and V11's decoration table — THORP a garland or bonfire at the heart, HAMLET a maypole or bonfire on the green with door garlands, VILLAGE a maypole, church-lane bunting and the green's stalls and tables — staged by V11's keyword table read at the village's places (the green, the church lane, the market's open space, the landing, the palisade's gate, the fair field, the manor for a castle), over the town kinds scaled down, because item 118 sets the kinds by tier and the village's festival places are its green and its church lane; keyed draws make a festival look the same each time | V07 §5.1 |
| J-V7.143 | chose the defined outcomes of V07 §3.17's edge rows — among them an `island` water with explicit roads bent to `isolated`, a perimeter with no populated cell falling back to the open spaces and the mill, else a disc of `R_s`, a landmark string with no host listed only in the gazetteer, a crossing connector that would self-touch the palisade not made, a `@pin:<kind>` with no VS8 row placed at the heart's nearest free junction — over failing or retrying, because every edge must end in a defined outcome on the failure ladder (principle (11)) and each chosen outcome is the nearest lawful form of the case | V07 §3.17 |
| J-V7.144 | chose to read item 119 at the village rungs as V07 §6's laws kept as the targets and every one-time wait of the village — generate, regenerate, opening from SettlementForge, a dossier change applied, an epoch and the history replay, an export, a migration — within the ten-second comfort level on §12.1's machine, the VILLAGE row's miss above ≈ 1 100 people and the fallback's re-declared bar read as target misses inside it, a step slower than its target only with its `perf.qualitySpend` row, progress past one second by V09 §4.21.9 and the edit, frame and switch budgets untouched, over a village ceiling of its own or keeping the veto question, because item 119 (a) re-declares D-18's misses inside the comfort level, the village's laws sit about two orders of magnitude inside it, and interaction budgets are item 119 (d)'s; how an epoch run and the replay are timed against it is V06's part of the item | V07 §6, W82, T-V7-67 |
| J-V7.145 | chose to read Find (item 120) at the village rungs with the ends as the area targets and Show gaps' units — the one `village` district being the whole settlement, offered as one area — the field groups (`VillageField`) as the hinterland's areas, V07 §5.3's label rows as the named places and every `v.` class with a member (the dwelling rows included) as a kind, and to keep a chip whose end or field an epoch, an edit or a hand-off removes at count 0 until removed or revived, over offering the one district as the only area or adding a village area kind, because a village's parts are its ends (V07 §3.10) and its fields, a viewer looking for "the mill end" or "the north field" means those, and a kept chip lets a viewer watch a place come and go across epochs as item 120 (f) asks of a closed smithy | V07 §5.5, W83, T-V7-68 |

## 10 Base change requests

This volume's requests to the base are applied by file f; each is now the base's text, which this volume cites.

| request | subject | applied by | base home |
|---|---|---|---|
| BCR-V7-1 | the village rows of the ladder | item 201 | §1.1 |
| BCR-V7-2 | the blueprint's village block and rung | item 287 | §4.2 S0 |
| BCR-V7-3 | the three entity kinds (`VillagePlan`, `VillageEnd`, `VillageField`) | item 267 | §2.8 |
| BCR-V7-4 | the `village` district kind | item 214 | §2.5 |
| BCR-V7-5 | the green reservation | item 215 | §2.5 |
| BCR-V7-6 | two pin kinds (`stocks`, `maypole`) | item 255 | §2.7 |
| BCR-V7-7 | the farm mode at village rungs | item 314 | §4.9 |
| BCR-V7-8 | the village field-system presets | item 315 | §4.9 |
| BCR-V7-9 | the village's first view | item 418 | §8.5 |
| BCR-V7-10 | the village package | item 505 | §14 |
| BCR-V7-11 | products in the registry | items 202, 326 | §1.1, §4.12, §14, PART III |
| BCR-V7-12 | the recipe's rung | item 276 | §2.9 |
| BCR-V7-13 | the `VG` parity preset | item 377 | §7.6 |
| BCR-V7-14 | the depth ratio as a fabric parameter | item 378 | §2.5 |
| BCR-V7-15 | the village concerns | item 344 | §6.1 |
| BCR-V7-16 | the village's price | item 527 | §16 |
| BCR-V7-17 | the village's range at the port | items 202, 528 | §1.1, §7.7, §16 |
| BCR-V7-18 | a product's epoch phases, participants and records placement | items 202, 317 | §4.11, §7.7 |
| BCR-V7-19 | the village edit forms | item 357 | §7.1 |
| BCR-V7-20 | furniture and stretches at village kinds | item 312 | §4.8 |
| BCR-V7-21 | the class's village form | item 430 (carried by item 432) | §10.2 |
| BCR-V7-22 | the land-use retype | item 431 (absorbed into item 209) | §4.11, §7.4 |
| BCR-V7-23 | the village bench and the VG baselines | item 495 | §13.5 |
| BCR-V7-24 | a declared split, and split pairs across a rung change | item 310 | §4.7 |
| BCR-V7-25 | way widths at village rungs | item 292 | §4.3 |
| BCR-V7-26 | a small dossier reaches the village product | item 322 | §4.11 |
| BCR-V7-27 | caverns and ruins below TOWN | item 565 | II.7.6, PART III |
| BCR-V7-28 | the village's ponds | item 316 | §4.9 |
| BCR-V7-29 | the village writer order | item 283 | §4.1 |
| BCR-V7-30 | the frame law's reader | item 279 | §3.2 |
| BCR-V7-31 | the title plate's qualifier and rounding | item 424 | §9.5 |
| BCR-V7-32 | the ways' decline ladder | item 268 | §2.8, §4.11 |
| BCR-V7-33 | the router's rung gate for raised spans | item 290 | §4.3 |
| BCR-V7-34 | the fabric's levelled units | item 506 | §14 |
| BCR-V7-35 | `raised` as a data key | item 290 | §4.3, §2.7 |
| BCR-V7-36 | a class's presence entries, the context readings and the government step at village rungs | item 576 | §10.2, §2.5 |
| BCR-V7-37 | the village classes are rows of their own | item 577 | PART III |
| BCR-V7-38 | S11's furniture pins at village rungs | item 579 | §4.7 |

The other volumes' requests this volume's text relies on are cited at their items where read: BCR-V6-1 (item 317), BCR-V6-26
(item 291), BCR-V9-8 (item 516), BCR-V9-25 (item 413), BCR-V11-1 (item 432), BCR-V11-13 (item 436), and the consolidated item-110
items 244, 245, 290, 309.

## 11 Owner questions

| question | decision |
|---|---|
| Q1 — when is the village product built: (a) as soon as the base's M4 lands, in parallel with stage 2 (M5); (b) after stage 2; (c) after the corpus calibration? | **Decided (a), J122** (`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`): V-M1 – V-M4 right after M4, in parallel with M5, the tracker spike V-M0 right after M0 (V07 §8; §16; INDEX §4). |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading:** every base and volume citation of this volume against the set (files f and g
applied, items 111 and 113–120 included); the owner's words in `docs/DEFINITION.md`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`
and the OWNER RULE items of `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`'s J-VI rows; SettlementForge's small
dossiers — populations, institution counts, the one housing range below town, wall records in 6–8 of 20 per tier, 0–2 quarters
with fixed phrases, 0–13 supply chains, no port below town, towns' 8–10 count-range records — from
`research/sf/dossier-outputs.md` §3.4 and §6, and the two small wall records from `research/sf/mapping-verify.md` V20; VG's
behaviours restated here (the density before the roads, the palisade from the populated lattice, the tracker steering terms,
the square sized in house widths, the frontage draws and acceptance, the wharf and piers, the outward field claim, the spotlight,
the model times of 14–143 ms) from the reference code readings and the profile (`research/findings/code-village.md` §2,
`research/findings/profile-village.md` §3.3, §5 and addenda), reader tier, never transferred; provenance rows D5 and P17.
**Executed** (arithmetic from V07 §2.2's rows): the settlement radius ≈ 100 / 245 / 480 m and the density box sizes; the area per
head 2.275 ha and the territory 19.9 km² at 700 people; `neighbourTracks` reaching 4 from about 227 people and the ends' cap
reaching 6 from about 563. No reference code, class name, word list or table was read for or copied into this volume.

**PLAUSIBLE until measured** (each with the milestone that measures it): every `own` constant of V07 §2.2, V07 §2.2a, V07 §2.4 and V07 §3 —
the household sizes and doubling shares, the band shares, the farm rows' per-head areas, the plan-form and culture weights, the
toft and croft sizes, the heart-score terms and prominence weight, the density terms and the water pull's use of the climate
weights, the palisade's reach share, light heights, pull and sections, the spacing radii, the presence anchors, the rule cells,
the dig rows, the crypt chance and sizes, the hand-off band, the mine working depths, the ruin marker's reach, the refounding
weights, the 80 % replacement cut, the epoch rows and the painterly, condition, season and festival cells — calibratable and
recalibrated at the corpus stage (M-CAL), the ladder ranges a table fix reviewed with V08 (J-V7.114); that the tracker network
stays legible at 1 400 people (risk (1); V-M0's renders) and the exact-count race reproduces VG's accepted-frontage share (risk
(2); T-V7-23 at V-M4); the budget split of V07 §6 (V-M0 and V-M1 measure it, the fallback stated); that items 105, 107 and 108
produce the orderings of T-V7-33 – T-V7-35 at village scale (V-M2) and that the barrier closure fences a river-bend village
across its neck only (T-V7-31, V-M1); the item-110 values and readings — the platform's apron and mean datum, `stairFromCm`, the
support and strip clearances, the turns, the deck widths, the pier head and its law, and the item-110 budgets (V-M1, V-M3);
that a forced brook separating the through road's entries reads as a village's stream (V-M2's dossier renders); that V06's street
rate retires a deserted village's lanes over decades as the record suggests (T-V7-16, T-V7-30; V-M3); that `village.records`'
`remove` and item 4 fit V07 §6's per-record bounds (V-M2, V-M3); that the refounding's reuse rules make a new village follow the
old streets without tracing them slavishly (T-V7-59; V-M3); that the palisade's condition looks and the season and festival rows
read at every band (T-V7-62, T-V7-65, T-V7-66; V-M3); that every one-time wait of the village stays inside item 119's
comfort level (T-V7-67; V-M3); that the ends serve as Find's area targets and Show gaps' units (T-V7-68; V-M3); and the
historical readings — village forms by culture, the farm mode by
form, green encroachment, churches outliving their villages, great fields in sectors, few crypts under village churches, chapels
of ease without burial rights, settlements rising on older sites, hillside house platforms, longhouses built down the slope, open
arches across country, bare village jetties, walls built against aqueduct piers, patched palisades in poor times, the absence of
grand houses in small places — as general historical knowledge, not corpus-witnessed; the corpus stage may revise them.

## 13 Fix list

No item is open. Each former item is closed at its home: the per-constant trace is row D5 of
`research/findings/code-impact.md` §(d) (V07 §2.2a's reference trace); every critique and seam citation is replaced by the
section its finding landed in; V04's `blockedBy 'rung'`, its counted `v.parish_church` and its maintenance mode are V04 §2.2,
V04 §3.5.1 and V04 §3.1; the span rule's `country` reason is §2.7 (item 244; J-C4); V06's raised-way step and decline are V06 §3.19,
V06 §3.19.2; the village cap of the specialisation rows is `tiers.capPerSettlement` (V11 §3.24.3); `village.density`'s cost at a
base-product epoch is priced in V07 §6; the `v.` rows' `commonness` is V11's compiler's (step 5a); and file f carries this
volume's requests (V07 §10).

## Integration notes

The volumes-integration decisions this volume carries (`docs/volumes/_integrate.md`) are folded into the body at their homes:
**J-VI.1** and **J-VI.23** (clean-room) — the request field is `arableFactor` (V07 §2.7) and the VG slot rule's large-house
probability is stated in our words (V07 §3.8); **J-VI.16** — V04's `blockedBy 'rung'`, counted `v.parish_church`, maintenance
mode, ruin centre, well pins and `DigRule` rows are read at their V04 homes (V07 §1 (1), V07 §3.12, V07 §3.16), the span rule's
`country` reason keeps country spans open (V07 §3.5a (7); J-C4), V06's raised-way step runs only its lapse and repair at a
village rung (V07 §3.12) and the village cap is `rules.tiers.capPerSettlement` (V07 §2.4); **J-VI.17** — a toll bridge reads V08
§2.6b (3)'s rule at the village rung (V07 §3.1 (1)), the palisade's barrier arcs read V11's `walls.barriers` rows by their
`arcKind` (V07 §3.4 step 5) and its "show circuit" control is `LayerSpec.showCircuit` (V07 §3.4 step 7, V07 §5.1); **J-VI.4** — no
village tool refuses a declaration that contradicts no dossier fact and no lock, a raised stroke at a village rung drawn as
declared (V07 §3.5a (1), V07 §4); **J-VI.25** — the dossier trace reads deposits through `site.deposits` to DR19 and W20 (V07 §1b).
