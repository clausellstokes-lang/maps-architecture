# V07 — The village product: thorp, hamlet and village in their landscape (VG-class)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V7-village, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the village product the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
PART III. The implementer holds the base and the volumes and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V07 §3.2`); a list after a volume prefix stays in that volume
(`V06 §2.1, §3.5.2` is two sections of V06); `item n` is an amendment item — items 1–118 the owner's, items 200 and
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
and graded stretches, V07 §3.4; the supply web's links and stores at village scale, V07 §2.4, §3.8, §3.11; the balance of
spread and pull inside one district, V07 §2.4, §3.10; the institution ladders' members at village rungs, the palisade's
replacement by a town wall included, V07 §2.4, §3.11, §3.12); item 109 (caverns and ruins under a village with their access
and the dwellings that follow it, V07 §3.16; the crypt cells and burial faces, V07 §2.4; the catacomb gate at the hand-off
up and a shrunk town's standing underground, V07 §3.12); item 110 ((a) the house platform with its walls, stairs and ramps
and their decline into the scarps of a deserted village, V07 §3.8a, §3.12; (b) a raised way on a village map, declared or
carried down, read-only to every village stage, with the router's rung gate, V07 §3.5, §3.5a, §3.12; (c) stepped massing by
the culture-and-era rows only, V07 §2.4; (d) deck plots on a pier head or placed by the author, V07 §3.10a); item 111 (the
crowding map's water pull and the oasis village, V07 §3.3, §3.2 (4)); item 113 (a village over a former city and refounding
at village rungs, V07 §3.12a); item 114 (the palisade's patches, decay and recovery, V07 §3.4 (8)); item 115 (the village class
mix under the grandeur ceiling, V07 §3.8); item 116 (the township view at the zoom-out limit, V07 §5.2); item 117 (the fields,
strips, commons, green and ponds through the year, autumn's fall covers included, V07 §5.1); item 118 (the festival decorations
of the village rungs, V07 §5.1).

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
on show) with its records and tables (V04 §2.2, §2.3); V11's crypt column (`crypt`, `cryptM2`; item 436) and V03's crypt
rule (V03 §3.7.4); V11 §3.24.1's TOWN `terrace` row, its `deck` table and compiled `deckOk` (V11 §3.24.4) and its
culture-and-era specialisation rows (V11 §3.24.3); V02's `DeckContext`, `@deck` rows, `stepped` family and `stairFlight`
program (V02 §3.15, §3.17); V04's arch-vault source and foundation reach (V04 §3.5.4 (d), §3.5.0); V06's raised-way step,
cap and decline (V06 §3.19); V09's delete; V01's aqueduct terminal form (V01 §3.17.8).

**Out of scope, and why.** Floating islands (none reaches a village rung: §4.11 fells an island when the CITY band is
left, and TOWN holds none); the sewer network, catacombs, quarries, vaults, the buried town and the undercity at village
rungs — they keep their TOWN-and-above gates (item 109 (j) (1), (k) (1)), save that a shrunk town's standing systems keep
their records in maintenance mode (V07 §3.12; V04 §3.1) and a dossier catacomb fact below TOWN is V04's charnel vault (V07
§2.4); the construction of caverns and ruins (V04's); the **generation** of raised ways — the base's route solve and V06
§3.19's founding, at CITY and METROPOLIS only (item 110 (b) as revised) — and the second known-city fixture (item 110 (e);
V12); the stepped family's construction (V02), the plans of tiers (V03) and the arch vaults' chambers (V04); stage-2
close-ups of the village district (the village's fabric is its neighbourhood-band picture, J-V7.24); stage-3 compositions
and the plan rung (V02's and V03's machinery unchanged; this volume supplies only the village class rows they read); the
content rows of every SettlementForge catalogue kind (V11); the host bridge (V08); the built-in clerk (V10) and the
application shell (V09), which this volume feeds through the base's API; the unexcavated underground style and its toggle
(V09) and the clerk's underground explanations (V10). VG's request settings are named only in `matched.vg` and in the
research-side request mapping (item 495).

**Cross-volume facts this volume relies on**, each at its home: (1) V04 — `CatacombComplex.blockedBy` holds `'rung'` for a
town's catacomb carried into a village (V04 §2.2, §3.5.1 (6); V07 §3.12); V04 §3.5.1 (3)'s counted classes include
`v.parish_church` (V11 §3.23.8; V07 §2.4); V04's stages in maintenance mode at a village rung (V04 §3.1, §3.10). (2) V11 —
the crypt and cellar cells of `v.parish_church` and `v.chapel` are this volume's rows (V07 §2.4; J-V7.41), and V11's compile
check counts `v.parish_church` as a church. (3) V02 — every village row names a `templateFamily` of V11 §3.6.1 for its
budget rows, while V02's `composition.classFamily` (V02 §3.10.5) is the one source of the village classes' composition
keys and is read first (V07 §2.4). (4) V09 and V10 — the unexcavated style, the shade map and link views, and
the explanations (V07 §4.5, §5.1). (5) V04 — the arch-vault source registered at every village rung (V04 §3.5.4 (d)); the
span rule's `country` reason keeps a span over hinterland faces open at every rung (§2.7, item 244; J-C4). (6) V06 — the
raised-way ledger's suppressions and carried ways cross both hand-offs unchanged and the raised-way step's founding never
runs at a village rung (V06 §3.19, §3.19.1 (5)); a carried raised way declines and is repaired by V06 §3.19.2, and a
removal holds by V06 §3.19.3. (7) V11 — the one village cell of the specialisation rows is this volume's
`tiers.capPerSettlement` (V11 §3.24.3; V07 §2.4); the `deckOk` cells of the village rows are this volume's (V07 §2.4) and
the `terrace` cells of V07 §2.2a are reference cells to V11's TOWN row. (8) V11 — the `v.` namespace and `villageForm`
naming a `v.` key with its compile check (V11 §2.3, §2.9); `guildhall` without a village form (V11 §3.22); the wells floor of
`multiple_water_sources` (V11 §3.12); V08 — the `@absent:<class>[+<class>]` shape (V08 §2.6's `kinds` row); V06 —
`ProductDeclEpoch.rows` (V06 §2.1) and the restoration of retaining walls (V06 §3.19.4 (6)); item 244's derived `source`.
(9) V06 — the `street` row's `again` and `reopen` members and their issuers (V06 §2.1, §3.5.2, §3.8.2 tier (5′)); V11 — the
`churchyard` part of the `church` and `cathedral` families (V11 §3.6.1), the village reading of `@absent` (V11 §3.11), the
`presence` column compiled with the class invariants over the `v.` rows (V11 §2.3, §3.2.1 step 6, T-V11-0) and the village
range row keyed by step type and the class that plays the member class (V11 §3.12); V02 — `composition.classFamily` keyed
by the `v.` keys (V02 §3.10.5); V03 — the village plan rows keyed by the `v.` keys; V04 — its church count reading
`v.parish_church` (V04 §3.5.1); V08 — V08 §3.5.1 (b)'s range read "for its step type and member class" and T-V8-46's hamlet
clauses at VH. (10) V06 §3.9.6's claim-sized classes at a village rung, reading `rules.claimArea` (J-V6.119); V11 — a
territory rung reads the `villageSeat` column alone (V11 §3.21.1); the village-read scope (`productStages.village`, each
table's `villageRead` flag, the compile's `villagePresetCells`; V11 §3.2.1) and its `VG` entries kept with V-M0 (J-V11.79);
V12 §3.7.1 (c) and §3.7.2 (3) naming `rules.race.densityPower@VG` as the one `VG` run's cell; item 576 (c) on §10.2's
government sentence. (11) V11 §8's preset-entries paragraph: the seat landing a change that makes a table village-read, or
adds a `presetsRequired` column to one, writes those cells' `presets.VG` entries by V07 §3.15's rule in that change
(J-V11.87; J-V7.123). (12) V06 — `ProductDeclEpoch.records` and `EpochPlacement` (V06 §2.1), the `dossier` step's call
(V06 §3.2 row 12), V06 §3.9.6's companion sentence and the clauses of T-V6-51 and T-V6-26; the participant table's
`village.pins` row (V06 §3.2: `afterGrowth`, order 60, `@plat/village`, stage `VS8`); V11 — V11 §3.11's `@pin:<kind>` read
at a village rung as VS8's pins, a record forcing its pin (V07 §3.10), and V11 §3.12's `parish_church` row naming the
churchyard cross VS8 lays; V08 — V08 §3.5.1 (c) binding a pin-record lesser to the churchyard `cross` (J-V8.111) and V08
§4.6's notes naming the class V07 §3.11 steps 2–4 give (J-V8.112). (13) V06 — `EpochPlacement.place(ctx, record, event)`
keyed by the dossier event's `seq` and `remove?(ctx, record, event)` after the base's removal on both paths (V06 §2.1, §3.16
*Keys*); item 202's records hook, its calls on both paths, the two phase overrides and the participants on M4's grow path,
and the absorb-path call in §7.7's *One path* sentence; V06 §3.9.11's REPLACEMENT row for a greater V08 §3.5.1 (d) places
new (J-V6.125; T-V6-45) and a record's claim-sized joins charged to no churn cap (V06 §3.9.6, J-V6.123); V08 §3.5.1 (c)'s
three cases and (d)'s one-key receipt (J-V8.113, J-V8.114) and the `town_walls` key; V11's display cells on
`BuildingClassRow` (V11 §2.3, §3.5.15; T-V11-4), which V07 §2.4's column fills for the `v.` rows. (14) V06's engine
(M6-E) for V-M3's clauses that run its steps: the desertion's street candidate and hollow ways (V06 §3.5.2, E2), a
claim-sized roster member's opening and the counts (V06 §3.9.6, §3.9.1, E4), a ladder step carried by an epoch (V06
§3.9.11, E4) and a carried raised way's decline (V06 §3.19.2, E3); the grow path reaches the village's phases and
participants at item 202's call points with V06 §2.1's `ProductEpochContext`; *fallback*: V07 §8's risk (10).
