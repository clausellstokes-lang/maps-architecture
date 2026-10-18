## II.7 The sewer layer — existence by tier, the network stage, the underground neighbourhoods (staged, with its base hooks)

*The underground layer as a whole (item 65; owner: "the central piece is a derived sewer system … catacombs (underneath
cemeteries or churches for example), cavernous tunnels, sewer dwellings and networks, and an undercity. Those are all
options that exist in the same level with varying degrees of connections and access between them (not always)").* The
sewer network below is the central piece of one underground layer that also holds catacombs, caverns, underground ruins,
quarries and mine voids, cisterns and vaults, a buried old town or former settlement where history made one, the private
passages an access edit digs, and the undercity — each system its own arena part (the sewer part 0; J-A65.31), all drawn and
edited as one layer by depth band, joined to one another and to the surface by typed links that exist by rule and chance,
never by guarantee. II.7.1–II.7.4 state the sewer, its neighbourhoods and the basement accesses; II.7.5 the undercity;
II.7.6 the other systems, their depths, the connection graph and the pieces an access edit generates. The layer at build
depth is V04's; like the sewer, all of it is staged by the owner's roadmap (M6-U): the base carries the rows, fields,
interfaces, invariants and tests these subsections name, and its stages run as the tail (§4.1).

*In plain words.* Sewers are a toggle the owner stages after the city is mastered, and the owner has ruled three things about
them (items 12 and 14): a town may or may not have sewers, a city or a metropolis always does and its switch only decides
whether they are drawn; some sewer systems carry neighbourhoods underground, whose plots may only line a sewer tunnel and
whose buildings stand flush against its outer wall; and there are no sewer alleys. This section states those rules as the
design's own mechanisms — a rung row, a feature draw, two stages with declared inputs and outputs, rule tables with their
context, and the invariants and tests that prove them — so that the layer, when the owner calls for it, is a registration and
not a redesign. The network stage's declaration, its rule families and presets and the underground's lifecycle stay in II.6;
the records are §2.7's.

### II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the toggle as visibility, the drain rule

**The rung row.** `RungProfile.layers.sewers` (§1.1; one row per rung in `ladder.json`, calibratable like every table, §7.6)
states whether the network exists:

| rung | `existence` | law (TOWN only) |
|---|---|---|
| THORP, HAMLET, VILLAGE (the village product's rows, PART III) | `never` | — |
| TOWN | `law` | P(sewers) = clamp(base + populationWeight · (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap), defaults base 0.05, populationWeight 0.25, wealthWeight 0.30, cap 0.60 — our own values, provenance "architecture 2026-09-26", PLAUSIBLE until calibrated (JT, §13.7) |
| CITY, METROPOLIS | `always` | — |

`population` is the request's (§1.1) and `wealthLevel` the intent's town-wide wealth control in [0, 1] (§7.7's expansion;
default 0.5), so the probability rises with both and never reaches 1 inside the band (the cap): a large rich town draws
sewers three times in five, a small poor one once in twenty. **The draw (J-A14.41)** is one of S0's auto features (§4.2 S0,
which states the toggle's values at every rung). The resolved value is **`Features.sewers: boolean`**, a derived field of the
document, recomputed on every replay from seed and request (§2.9) and re-resolved at each epoch against the epoch's rung and
population — on at CITY and METROPOLIS; at TOWN by the creation's one `blueprint.features` draw against this law at the
epoch's population and wealth level, no new draw; once on, never off (V06's prelude, V06 §3.2; the first epoch it turns on,
the network is laid whole, §4.11) — and listed in the report; every dependant — the network stage, the drain rule, the
underground pseudo-district, the exporters — reads it from the model and never from the view. Until the staged stages are
built, `Features.sewers` is resolved and reported and the sewer network's arena (part 0) stays empty: the layer's
`requested` row reads `omitted` with cause `staged` (§5.1 (7)), so a CITY never claims a network it does not carry.

**The toggle is visibility (J-A14.42).** The app's one *Sewers* control (§7.8's registry) has two meanings by rung, declared
in its registry row: at TOWN it is the model feature above (`auto` / `on` / `off`; continuity class *discrete*; locality
class *re-derive from S7b* — S7b (6) and (7) re-run with carry-over (§6.3), a TOWN toggled on or off gaining or losing the
underground allocations, then the underground tail; the ground's geometry outside the re-placed uses stays byte-identical,
§7.3); at CITY and METROPOLIS it is a view control that sets the underground `LayerSpec.visible` through `setLayer` (§7.1,
§8.4) and changes no model. `visible` is `false` by default at every rung (D-3: toggles off by default; MFCG and FTG draw no
sewers, so the default picture is theirs), and the network exists in the model at CITY and METROPOLIS whether or not it is
drawn: §8.4's cut-away or overlay shows it when asked, §11's exporters write the underground layer when its
`exportSeparately` says so, and the drain rule and the underground neighbourhoods depend on the model, not on the view.

**Which plot rules depend on the network (J-A14.44).** Exactly two. (1) **The drain rule.** The class table's `drain` column
(§10.2: `none`, `pit`, `channel`) names each class's need; the network stage connects plots to tunnels by the connection table
below and records each connection on the tunnel (`Tunnel.serves`, §2.7) — a one-way cross-arena link by entity id (§2.2 rule
2), read back through a resolved view `drainOf(plot)` (J-K3), so no ground record changes; an unconnected plot drains to its
own pit or the street gutter and draws nothing (no cess-pit geometry, no pin: the yards stay as the references draw them).
Without a network — a TOWN whose draw came out `off`, every village — the rule does nothing and the map stays the references'
map: `channel` classes keep the `requires: 'water'` gate (§10.2) and S10b's downstream and downwind scoring they already have
(§4.7). (2) **The underground neighbourhoods** (II.7.3), which exist only along navigable tunnels. S10b's siting, S11's site
plans and S12b's greenery read nothing else from the network (emulation-first, item 23).

| connection table (defaults, calibratable) | `channel` plots | `pit` plots |
|---|---|---|
| `historical` preset | connected when a main or a culvert lies within `reachM` = 60 m of its frontage midpoint, else reported as unconnected | connected by a per-band share drawn from the plot's `sewer` stream: poor 0, modest 0.10, prosperous 0.30, rich 0.60 |
| `navigable` preset | `reachM` = 120 m | every band 1.0 within `reachM` |

### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing

**The declaration and its declared inputs are II.6's** (`SewerStrategy`, a tail stage registered after S11 by declared I/O;
rule families `follow-streets`, `drainage-lines`, `mixed`; presets `historical` and `navigable`; the lifecycle of item 11);
this subsection adds what the owner's rules need of it. **The gate.** The stage runs only when `Features.sewers` is true;
otherwise it commits nothing and part 0 stays schema-complete and empty (§2.1); every other part of the layer is II.7.6's. It
runs eagerly on the generation worker after the derivation pool's merge (it reads every district's committed L3 and L4,
§4.1); it names its tunnels with S13a's naming engine as the underground stage names its own entities (II.7.3; §10.4's
`sewer` slice), and S14's display list and §11's exporters read the model through the entity registry (§4.10, §8.1) after
every registered stage, so the tunnels are drawn and exported with no change to S14.

**The underground arena's levels (the kernel's J-A12.31 and J-A12.32; the level mapping is §2.2 rule 1's).** The stage writes,
on the sewer's part 0 (J-A65.31) in §3.3's one-level batches: L0 — one land face, the rock, bounded by the arena's outer ring
(the ground's frame plus its context margin, §3.2 (9)), written before any tunnel as S1 writes the ground's ring; L1 — every
tunnel's centreline as a `tunnel` chain, never a `way` (no alley, lane or street exists underground: rule U2 of II.7.3); L2 —
`corridorUnion` on the L1 faces (§3.7, S9's function unchanged): each tunnel's band — its bore plus a wall on each side — as
two half-corridor strips with junction wedges, and the rock between the bands as the underground's built blocks. The band's
outer ring is **the tunnel's external wall**: the kerb every underground plot line ends on (§3.7). L3 and L4 are the
underground stage's (II.7.3). Nothing here writes the ground: the outfall is an entity link (`Tunnel.outfall`), the served
plots are ids (`serves`), and the street a main follows is `follows` (§2.7). A degenerate centreline (zero length, a
self-touching run) is refused by the kernel and the run re-routed by the stage's ladder row, else left out and reported
(§5.2).

**The tunnel profile** is a rule table keyed by `(kind, preset)`; the kernel reads a tunnel's corridor half-width as
`widthCm ÷ 2 + wallCm` from it (§3.7):

| kind × preset (defaults, calibratable; cm) | bore `widthCm` | `headroomCm` | `wallCm` | `navigable` |
|---|---|---|---|---|
| `drain`, either preset | 40 | 60 | 25 | never |
| `culvert`, historical / navigable | 80 / 120 | 120 / 180 | 40 / 50 | no / yes |
| `main`, historical | 100 · (servedHa ÷ 10)^0.3, in [100, 180] | 150 · (servedHa ÷ 10)^0.2, in [150, 210] | 50 | where the bore and the headroom both reach the thresholds — a large trunk main in a big city, rarely a whole system |
| `main`, navigable | 240 | 260 | 60 | always |
| `passage`, navigable only | 150 | 220 | 50 | always |

`navigable` is derived per tunnel — `widthCm ≥ 110 ∧ headroomCm ≥ 160` (the thresholds are table values) — and stored on the
record (`Tunnel.navigable`, `Tunnel.headroomCm`, §2.7); it is what item 12 (b) means by a navigable tunnel, so the
`historical` preset has few or no underground quarters and the `navigable` preset can have many (J-A14.43). The `navigable`
preset is D-3's fantasy toggle, off by default; the `historical` preset is realism and is the network every CITY and
METROPOLIS carries.

**Depth and fall.** A tunnel's `invert` profile (§2.7; `invert_knot` on the centreline) is laid from the head of its run to
the outfall: at every knot `invert = groundHeightAt(p) − coverCm − headroomCm`, lowered where needed so the profile falls
monotonically toward the outfall at no less than `minGradient` (1 : 200) — the monotone-bed rule the river's carve uses (§4.2
S1 (3)) — with `coverCm` (the crown's depth under the street: 150; 600 for the navigable `main` where II.7.3's
within-reach surface rule applies) a table value; a run that would need more fall than the ground gives is re-routed toward
the nearer outfall by the family's rule, never trenched (the stage's ladder row, §5.2). `elevationCm` (§2.1's layer field)
on every tunnel is its invert's mean, negative below the ground datum. Outfalls are §2.3's `outfalls` on the settlement's
downstream side (`ContextVector.upstream ≥ 0.5` at the outfall's cell) — downstream of the harbour and of every water mill's
intake (a policy row). A settlement with no outfall (no water body and no frame edge the flow leaves by) drains every run to
its lowest frame cell, reported.

**Editing.** A tunnel is an edit target like a way (§7.1's edit-target table: draw, move, delete, `setAttr` on its kind, bore
and headroom; its condition changes only through the conversions `silt`, `caveIn`, `seal` and `reopen` of II.6's condition
table, a hand change of the condition being the matching `convert`; the preset is the network's): in the base a user may
cut, move, seal, reopen or delete any tunnel; the evolution engine never demolishes one (item 11, II.6). Every tunnel edit
re-derives the underground blocks the edited edges bound (II.7.3's scoping) and nothing on the ground.

### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order

**The owner's rules, as hard invariants (their §5.3 check rows are the determinism part's).** U1–U3 are the sewer network's
rules: they hold on its arena, part 0 of the underground layer (J-A65.42) — the owner's "there are no sewer alleys" stays
true in the sewer — while the undercity (II.7.5) and the layer's other systems (II.7.6) are other parts with rules of their
own.
* **U1 — frontage on one tunnel, doors onto it.** Every underground plot's `frontage` rows lie on the kerb (the external
  wall) of exactly one navigable, open tunnel run, and its `access` rows are a subset of its `frontage` rows (§2.5): a door
  opens only onto the tunnel.
* **U2 — no sewer alleys.** The underground L1 carries `tunnel` chains only; no `way` chain, no `alley` face and no S8 lane
  exists underground, so no tunnel exists to give access alone. F-PLOT's alley rung is skipped on the underground arena
  (§5.2): a plot that cannot front a tunnel is not a plot but residue.
* **U3 — flush against the outer wall.** Every underground building's frontage side lies on its plot's frontage edge; the
  footprint is `plot ∩ the frontage band of the row depth` (§4.7 S11's boolean), so the room's wall is the tunnel's wall by
  construction.

**Who lives there, from the same tables and field (J-A12.44).** The underground is a **pseudo-district**
(`District.kind = 'underground'`, one per settlement, its `faces` the underground built blocks, its `allocation` an S7b
record), as the hinterland and the sky pseudo-districts are (§4.5, II.6); S7b (6) creates its `Allocation` (§4.5, which
states the parts and their order). Its occupants: (a) households of the **poorest** band, a share `undergroundShare` of that
band's demand (defaults TOWN 0.02, CITY 0.04, METROPOLIS 0.06 — the crowded, cheap, hidden stock), where the preset yields
navigable mains (the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one navigable run of
`minRunM` = 60 m — both predicted at S7b by the **network forecast**, which runs the network stage's graph, tree and sizing on
the ways and district faces that exist by then, for every family; V04 §3.3); (b) the classes whose class-table row carries
`underground: 'allowed'` or `'preferred'` (the cellar workshops of brewers and vintners, stores and guild vaults — the
classes V11 §3.5 marks; a crypt is never an underground allocation, §10.2) at their table share, plus the clandestine
institutions whose concealment mode is `underground` (§4.7, item 63) — except where S7b predicts an undercity, which takes
them at (7), and where no underground allocation can take them the mode falls back to a front (§4.7) — and any assigned or
dossier institution whose `knownTo` is `secret` (item 30) for which the assignment templates prefer underground plots; (c)
in an epoch, the evolution engine's crowding hook: a share `crowdingShare` (II.7.4) of the poorest band's households in the
epoch's residual demand — what §4.11's regrowth-first steps (0)–(5) leave — goes underground before the boundary widens: on
lived and reopened sewer runs where `Features.sewers` is on, and in the cavern and ruin clusters that V04's excavation
reading makes `accessible` at any rung, whether or not sewers exist, capped there by those clusters' free dwelling capacity
(V04's U-FRONT F6), the rest staying in the residual (§4.11 (6); J-A12.47; item 109 (j) (4)) — the owner's "crowding on the
surface pushes growth underground", staged with the engine; (d) at every rung, the **void-dwelling part** —
`voidDwellingHouseholds` of the poorest band for the cavern and ruin voids whose forecast access chance reaches
`accessForecastMin` (V04 §3.3 P7), placed by V04's F6 — no dwelling stands in a void that has no access (item 109 (j) (4)).
Each part is capped at `forecastSafety` (0.85) × its forecast capacity (for the sewer front, 2 sides × the navigable run
length ÷ the poorest band's mean frontage, less the excluded ground below) and the ground's districts receive the remainder,
so the population stays whole; a miss between the forecast and the built network is absorbed by S10b's plan–fit–reconcile
and F-SITING's ladder, reported, never re-rolled. **The prosperity underground is the ground's field, shifted:** a plot's
`ContextVector.prosperity` is the ground raster sampled at the plot's frontage midpoint plus `undergroundOffset` (default
−0.25, a table value), clamped to [0, 1] and banded by the town's own `FieldBands` (§4.5), so a vault under the cathedral
close reads richer than a cell under the tanners' lane; the density and greenery fields are read the same way, and
`ContextVector.arena = 'underground'` keys the arena-specific rows. The granularity table (§4.7 S10 (2)) then does what the
owner asked without a new law: the poor band's rows give many small cells, the institution row few large vaults;
`UndergroundRule` (II.7.4) scales the band depths by `depthScale` 0.35 (a plot one or two rooms deep: poor 4–7 m, modest
6–10 m) and gives the institution row its own depth `institutionDepthM` (8–15 m; the ground's row being by requirement),
sets the vacancy-run share to `vacancyRunShare` 0.25 (long bare stretches of wall), and on the underground arena S11 admits
only its `arrangements` — the designation templates' `row` and `institution` (§10.2's `arrangement`, read with
`ContextVector.arena`) — so no compound, detached, hovel, tents or cluster stands along the sewer (the undercity's chambers
admit hovels and informal clusters by their own rows, II.7.5; item 70).

**The cut is the ground's cut (J-A12.41).** On each underground built block the underground stage runs S9's and S10's own
machinery with the underground context (`PlotStrategy`, `SitePlanStrategy` and `BuildingGenerator.outline` unchanged, §14):
(1) a kerb edge is a frontage when its tunnel is `navigable` and open (the `open` column of II.6's condition table) — drains,
culverts and closed runs are not frontages, so a block bounded by drains alone holds only residue; the frontage's `class` is
the tunnel's `kind`; (2)–(3) as §4.7, claims first for the vaults; (4) per-frontage regions by the block's straight skeleton,
the depth capped by the underground depth band, so a plot's rear line is its region's rear line and **no plot reaches a
second tunnel by construction** — two tunnels close together share the medial line between their regions, never a kerb; (5)
corner plots at junctions as on the ground; (6) residue typed `rock`; (7) joins and splits under the same law; (8) vacancy
runs at the underground share; (9) no alleys (U2); (10) every plot gets its context vector, its derivation record and access
rows ⊆ frontage rows (U1). Then S10b places the allocation by the same scorer and S11 lays `row` cells end to end along the
wall with party walls, and vaults on their claims — the row boolean gives U3. Everything is cut inside the sewer network's
arena (part 0): the stage writes only that arena — every transaction it opens is keyed to part 0 (§3.4's isolation), and
§13.2's reroll-isolation fixture proves the ground and every other part byte-identical — while the ground's static index
partitions are read, never touched. A degenerate plot or cell the kernel refuses takes F-UNDER's ladder below.

**The surface constrains the underground — by reads, never by copied geometry (J-A12.42, J-A12.43).** Before a plot is
committed its ring is tested on the ground arena through `pointLocate` and `resolve` on the ground's `PlatKey` (§2.2 rule 1,
through §3.4's services: no cross-arena write, no ground ring copied into the underground) at its vertices, its frontage
midpoint and a 1 m sample of its rear line. A sample is **excluded** when it lies in: any L0 water face; a cell whose
`terrainClass` is `damp` or `flood` (the water table: low, damp ground stays empty, item 12 (c)); a `wall_strip` block's band,
setback, glacis or ditch part, a tower's or a gatehouse's footprint (§4.8); the castle's reservation; the main footprint of a
`precinct` reservation (the cathedral's foundations); and **every other L4 footprint** — a room under a surface building is
that building's own basement (item 29, §2.6), a record of the ground building that never opens onto a tunnel, never an
underground frontage plot (J-A12.42). Public ground (corridors, squares, gate plazas), yard parts, greens, residue and vacant
plots are allowed. An excluded sample steps the plot down the **F-UNDER ladder** (its §5.2 row is the determinism part's; the
rungs are these): the band's depth → the band's lower depth → the class minimum depth → the run is typed `vacant` (a bare
stretch of wall); the ladder is deterministic from the plot's stream and each use is counted in the report. A rear line that
stops a metre short of the house above is invisible underground, which is why the test is a sample and not a boolean against
ground rings (J-A12.43). *Pre-decided fallback (J-V4.60):* if T-V4-41 fails at U2, the test applies only to a plot whose
ceiling lies within `surfaceClearCm` (600 cm) of the ground — a deeper plot is free of the surface, as II.7.6's shallow
elements are — and II.7.2's navigable `main` takes `coverCm` 600.

**Access, air and light (item 12 (d)).** An **`AccessPoint`** (II.7.4; in §2.7's entity registry) links the arenas by entity
ids — a kind, a role (`access`, `air`, `light`), a ground point with the host it opens in (the corridor, square, yard or
building, resolved on the ground by `pointLocate`, never a ground face slot) and a vertex on the tunnel's kerb — and is placed
after the plots: every **underground neighbourhood** — a connected component of open navigable tunnel edges carrying at least
one plot — gets at least one `access` point, at the nearest allowed ground point above its tunnels in a declared order: a
street stair in a corridor strip or a square; a well shaft in a yard or a square; a `cellar_stair` in a surface building
whose basement lies within `accessReachM` of the neighbourhood's tunnels — the one on a `knownTo: 'secret'` plot (item 30)
first, else the one whose class row has the highest access probability at its band (§10.2's `undergroundAccess.prob`), ties
by address (J-A64.44) — a stair to the tunnel from a basement that stays the building's own room (item 29; J-A12.42). Air and
light shafts (`grating`) are placed every `shaftSpacingM` of navigable tunnel that carries plots (60 m historical, 40 m
navigable) on public ground only; where none lies within reach the spacing doubles once, then the run has none, reported.
`AccessPoint.ground.at` moves with its host face under a warp as a pin's point does (§7.4). Every `grating`, well shaft and
street stair — every access that breaks the surface — is a light shaft for §8.4's lighting, a secret one lit only for a key
under which it draws (§8.1 item 7): a column of daylight by day, of faint moonlight by night, on the floor below (item 68
(d′)). **The sewer's light rows (item 68 (d′)).** The underground layer has no global light and near-zero ambient; along the
sewer the rows of §4.7's light table (context `arena` underground, system `sewer`) put a light at every sewer-front
dwelling's door — its windows lit by §8.4's derived window lights — and at the tunnels' junctions and access points only,
the tunnels between them dark; the fuel is the rows the era row selects (tallow, pitch, lamp oil by era) and, where the
`magic` circumstance admits them, the magical rows (§4.7 *Light sources* (3)).

**Basement accesses (item 64; owner: "some buildings that have basements have accesses to the sewer grid or a dwelling in a
sewer grid where appropriate. higher chances if they are criminal as described above"; J-A64.41, J-A64.42).** Beside the
neighbourhood rule above, a surface building may hold its own way down — decided per building by the connection stage
(II.7.6), after the underground plots and the layer's other systems, never because a neighbourhood needs one.
1. **The gate.** The building has a basement (§2.6, item 29) and its `Basement.ring` lies within `accessReachM` (5 m;
   `UndergroundRule.access`, II.7.4) in plan of an open navigable tunnel's kerb (part 0), of an underground building's side
   or rear wall (a sewer dwelling — never its frontage, which is the tunnel's — or an undercity building), or, where they
   exist, of an open gallery or chamber of another system (II.7.6) — a ruin's among them — or an undercity walkway (II.7.5);
   the test is a read through the kernel's services on each part by key (J-A12.32; no cross-arena write), the nearest element
   first, ties by address. The cellar stays a cellar (J-A12.42): the building gains an access record, never a room of the
   tunnel.
2. **The probability.** `p = min(accessCap, prob × (1 + ageGain × age) × multiplier × ruin × crime)` — `prob` the
   `undergroundAccess.prob` of the building's class at the plot's band, interpolated along the value (§10.2; the front's
   class where the building carries a concealed use), `age` ∈ [0, 1] the plot's growth-stage rank `(K − k) ÷ (K − 1)` for a
   plot of stage k of K (1 for the first stage, 0 for the last: the "old houses"; 1 when K = 1; `ageGain` 1), `multiplier` the
   concealed class's `accessMultiplier` where the building carries a concealed use (§4.7, item 63; default 6) and 1 otherwise,
   `ruin` the access row's `ruinGain` where the nearest element is a ruin's (item 109 (d); V11's `under.rule` row) and 1
   otherwise, `crime` §4.6's access factor `1 + crime.accessScale × PortRows.crime` (item 88; 1 while the row is empty),
   `accessCap` 0.9 — one draw on `sewer` keyed by the building's lineage (§6.1; no new concern). A class row of 0 (a barracks,
   a courthouse, a temple) never draws; a user adds an access to any building by item 66's edit (§7.3 item 9; II.7.6).
3. **The kind** follows the drop from the basement's floor to the element's floor: a `door` through the basement wall where
   the element is an underground building's wall and the drop is within `doorDropCm` (60); a `stair` within `stairDropCm`
   (300); a `ladder` beyond; a `hatch` — the basement plan's trapdoor over a ladder — instead of a stair or ladder where the
   building carries a concealed use or its basement's own access is a trapdoor.
4. **State and knowledge.** `state` is `open`, `locked` or `bricked` by the row's weights (0.6 / 0.3 / 0.1 — a bricked-up door
   is the trace of an old one) or an edit, and reads `collapsed` or `bricked` while its element is closed (II.6); `knownTo` is
   `secret` where the building carries a concealed use (item 63) or its plot is `knownTo: 'secret'` (item 30), else `local` —
   the one statement of an access's knowledge in a building, which II.7.4 and II.7.6 cite — a brewery's cellar door to the
   sewer is known to its street (item 30's values).
5. **Its uses.** The access is a fixed anchor of the basement storey that the plan rung reserves — a stair, ladder, trapdoor
   or door in the basement plan (§2.6, item 28) — and a node of the connection graph (II.7.6): a lifeline where its element is
   the undercity's (II.7.5). The neighbourhood rule above keeps its cellar-stair case as the fallback for a neighbourhood that
   no basement access reaches.
§5.3's rows (no access without a basement and a reachable element; a concealed building's access `secret`) and §13.2's T64
bars (the access rate by class within its row; a clandestine building over a network at least at its row's rate) prove it.

**Depth and ceiling, drawn on their own level (item 12 (g); J-A12.45).** Every underground building's `Heights` (§2.6) is
populated as on the ground: `baseCm` = the tunnel's invert at the plot's frontage midpoint + `floorAboveInvertCm` (30, above
the flow); `floors` = 1, or 2 for a vault class in the `navigable` preset where the headroom row allows; `eaveCm` = the ceiling
= min(the class's storey height, the tunnel's `headroomCm` + `vaultAllowanceCm` (a table value: 80 for vaults, 0 for cells));
`ridgeCm = eaveCm`, roof kind `flat` (a vault is a style program over the flat kind, §8.2); `elevationCm` (§2.1) = `baseCm`,
the entity's depth below the ground datum. The sewer network is **one arena** (`PlatKey` part 0 of the `underground` layer,
§2.2), not one per depth: depth is per entity inside it (J-A12.45), so tunnels at different depths keep their one topology,
while the layer's other systems are parts of their own (II.7.6; J-A65.31, which amends J-A12.45 for systems). The view groups
every part's items into **depth bands** of `depthBandCm` (250) for §8.4's cut-away and for §11's virtual-tabletop scenes —
one scene per depth band with its elevation — so a building sits on its own level.

**Lifecycle follows the tunnel (item 12 (f); the tunnel's states are item 11's, II.6).** When a tunnel run's condition closes
— the `open` column of II.6's condition table turns false: caved in, collapsed or sealed — every plot whose frontage rows lie
on it takes `existence: 'abandoned'` with cause `rule:tunnel-closed`, and its buildings step through §2.8's decline states by
§4.11's tendency table at the underground's rate (the persistence order places the underground after streets and walls and
before terrain, item 8); a closed run's plots keep their ids, rings and derivation records. Reopening — the `reopen`
conversion, by the engine or by hand (§7.1) — `resurrect`s (§2.8) the plots whose rings still exist, so nothing is re-rolled.
A tunnel deleted by a user (allowed: everything is editable) takes its plots with it as any way's deletion takes the plots
that fronted it (§7.3), and the underground blocks it bounded re-derive.

**Order, seed and locality (item 12 (h); J-A12.46).** The `UndergroundStrategy` registers after the network stage by declared
I/O — inputs `under.tunnels`, the ground plat (read), the three field rasters, the underground `Allocation` and the tables;
outputs `under.blocks`, `under.plots`, `under.buildings`, `under.access` — so the owner's order holds: city → network →
underground plots and buildings. It runs eagerly on the generation worker after the pool's merge, as a tail stage, never in
the pool (it reads every district's committed L3 and L4 and writes another arena). It keys its streams from the underground
pseudo-district's lineage through the ordinary concerns (`plot.width`, `plot.join`, `plot.vacancy`, `siting`, `siteplan`,
`heights`; the network's own draws use `sewer`; §6.1); a seed therefore reproduces its underground exactly, and it names its
entities with S13a's naming engine for its own pseudo-district — a leaf of §9.1's quarter tree in a family of its own, its
labels drawn only when the layer is visible — as the hinterland unit runs its own stages (§4.1). The sewer-front blocks on the
tunnel runs that lead into an undercity are its **outskirts** (II.7.5): they keep every rule of this subsection and belong,
for naming, description and counts, to the undercity neighbourhood that lists them (`District.outskirts`, §2.5).
**Locality:** the stage's spatial reads are declared (§7.3's audit): each underground block records the ground cells over it,
so an edit whose clear region covers those cells re-derives those blocks by tree scoping onto the dependent arena, a tunnel
edit re-derives the blocks its edges bound, and a New random of the underground pseudo-district writes only the `under` arena
(part 0) — the ground and every other part are byte-identical (the reroll-isolation fixture, §13.2). **Editable like
everything:** underground plots and buildings are ordinary plots and buildings on the `under/` arena (§2.1's address
prefix), so every edit kind, lock, pin, assignment and label of §7 applies unchanged; tunnels and access points have their
own edit-target rows (§7.1). **Stage 2:** the underground pseudo-district opens as II.1's underground close-up.

**Emulation note (item 23).** Neither MFCG nor FTG has sewers or an underground; the whole layer is our extension, staged by
the owner, hidden by default, and with `undergroundShare` 0 and the layer hidden a CITY reads exactly as the references'
city. Nothing stands in a village's way: the village rows carry `never` (PART III).

### II.7.4 The hook interfaces and the base's part

```ts
interface SewerExistenceRow { existence: 'never'|'law'|'always'; law?: { base: number; populationWeight: number; wealthWeight: number; cap: number } }   // RungProfile.layers.sewers (§1.1); II.7.1's law
interface Features { sewers: boolean /* resolved at S0 from the request and the rung row; re-derived on replay (§2.9) and re-resolved at each epoch (II.7.1); read by every dependant */;
  underground: boolean /* items 65 and 66: true while any underground system exists — the sewer network, a system of II.7.6, or a dug passage alone (II.7.6's closure pieces); derived from the model on every replay (§2.9); the underground layer's presence, its exporters and the reader read it, never a view */ }
interface TunnelProfileRow { kind: Tunnel['kind']; preset: 'historical'|'navigable'; widthCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; headroomCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; wallCm: Cm;
  coverCm: Cm; minGradient: number; navigableMinWidthCm: Cm; navigableMinHeadroomCm: Cm }   // II.7.2's table; the kernel reads widthCm ÷ 2 + wallCm as the corridor half-width (§3.7)
interface AccessPoint { id: Id; kind: 'stair'|'ladder'|'hatch'|'door'|'shaft'|'well'|'cellar_stair'|'grating'|'mouth'|'sinkhole'|'collapsed_shaft'|'ruin_entrance'
    /* ladder, hatch and door: item 64's basement accesses; mouth: an opening in outside ground — a cave mouth, a dug passage's outlet (II.7.6);
       sinkhole, collapsed_shaft, ruin_entrance: public openings by chance into a cavern, a quarry or mine, or a ruin (item 109 (j) (3) (ii)) — each public opening of role access a HoodPlace of kind opening on the surface (V01 §3.7.1) */;
  role: 'access'|'air'|'light';
  ground: { at: PointCm /* moves with its host face under a warp (§7.4) */; host: Id /* the corridor, square, yard, building (for a basement access, its basement) or outside face it opens in */ };
  under: { part: number /* the underground part it reaches (§3.4; 0 the sewer network) */; element: Id /* the tunnel, gallery, chamber or underground building (a sewer dwelling's side or rear wall: item 64's door) */; at: VertexRef /* ('access_point', id) on that element's kerb or wall, §2.2 rule 7 */ };
  state: 'open'|'locked'|'bricked' /* item 64 (c): stored, set by the rule's row, an edit, or the access closures of its host's change (a use turned to a class whose access row is 0, a ground host no longer admitted: bricked; V04 §3.10); it reads collapsed or bricked while its element is closed (II.6), a derived reading, never stored */;
  knownTo: 'public'|'local'|'secret' /* item 64 (c), item 30's values: public for a stair, shaft or grating on public ground, local in a yard, and in a building by II.7.3's Basement accesses (4) — secret too where an undercity lifeline's row makes it so (II.7.5) */;
  source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit'|'dig'|'opening'|'overlap'|'crypt'|'dossier' /* II.7.3's neighbourhood rule or its basement accesses, a system's own entrance (II.7.6), an undercity lifeline (II.7.5), an edit (§7.1; §7.3 item 9's closure), a building's dig into a void, a public opening, a system grown through a void (item 109 (j) (3), (3b)), a church's crypt joining a catacomb (item 109 (k) (2)), a dossier's requirement */;
  cause: AccessCause /* persisted: the rule, the system and the event that made it; absent in an older document `legacy` (V04 §2.2) */; lifecycle: Lifecycle }   // §2.8's entity registry; its lifecycle row V04 §2.6's
interface UndergroundRule {
  undergroundShare: Record<Rung, number> /* an `extension` cell: 0 under the parity presets (§7.6), as are crowdingShare, voidDwellingHouseholds and the class table's underground and undercity 'preferred' shares */;
  crowdingShare: number /* II.7.3 (c): the share of an epoch's residual poorest-band households the crowding hook sends underground (§4.11 (6)); default 0.10, our own, calibratable with the staged engine */;
  voidDwellingHouseholds: number; accessForecastMin: number; forecastSafety: number /* 0.85 */ /* II.7.3 (d) and S7b (6)'s caps (V04 §3.3) */;
  undergroundOffset: number; depthScale: number; institutionDepthM: [number, number] /* [8, 15] */; vacancyRunShare: number; minRunM: number; floorAboveInvertCm: Cm; vaultAllowanceCm: Cm; depthBandCm: Cm;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'institution']: the arrangements S11 admits along the sewer, part 0 (II.7.3) */;
  access: { reachM: number /* 5 */; ageGain: number /* 1 */; ruinGain: number /* item 109 (d): × over a ruin (V11) */; cap: number /* 0.9 */; doorDropCm: Cm /* 60 */; stairDropCm: Cm /* 300 */; state: { open: number; locked: number; bricked: number } /* 0.6 / 0.3 / 0.1 */ } /* item 64: II.7.3's Basement accesses; our own values, extension */;
  shaftSpacingM: Record<'historical'|'navigable', number>; surfaceClearCm: Cm /* 600: II.7.3's pre-decided fallback */; excluded: ('water'|'damp'|'flood'|'wall_strip'|'tower'|'gatehouse'|'castle'|'precinct_main'|'footprint')[];
  connection: { reachM: Record<'historical'|'navigable', number>; pitShareByBand: Record<'historical'|'navigable', Record<string, number>> } }   // II.7.1's and II.7.3's tables as one editable rule record (§7.6)
interface UndergroundStrategy { derive(doc: Document, tunnels: Tunnel[], allocation: Allocation /* the underground pseudo-district's, S7b (6) */, rules: UndergroundRule, ctx: StageContext, k: Kernel):
  KernelResult<{ blocks: Block[]; plots: Plot[]; buildings: Building[]; access: AccessPoint[] }> }
// a tail Stage registered after the network stage by declared I/O: inputs under.tunnels, the ground plat (read), the fields, the underground Allocation; outputs under.blocks, under.plots, under.buildings, under.access;
// runs S9 → S10 → S10b → S11 on the underground arena with the underground context; the StrategyRegistry's `underground` map (§14)
```

**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and `Features.sewers`
with S0's draw, and `Features.underground`; the underground `LayerSpec` hidden by default; the class table's `drain`,
`underground`, `undercity`, `undergroundAccess`, `crypt` and `concealment` columns and the cover table (§10.2);
`Tunnel.navigable`, `Tunnel.headroomCm` and the profile table with its wall thickness; the `AccessPoint` record with its
state, knowledge, source and cause; `ContextVector.arena`; `UndergroundRule`'s depth scale, vacancy share, crowding share,
void-dwelling part, arrangement restriction and access row; the undercity's existence row and rule (II.7.5); the system
rows, the link rule and the `raiseGrade` kind (II.7.6); the records `UndergroundSystem` (its kinds with `ruin`), `Gallery`,
`Chamber` and `UndergroundLink` (its via kinds with `breach` and `reuse`) and the district's `parent` and `outskirts` links
(§2.5, §2.7), schema-complete and empty; the `UndergroundStrategy`, `UndercityStrategy`, `UndergroundSystemStrategy`,
`AccessPassStrategy` and `UndergroundLinkStrategy` registration slots; the U1–U3 invariants, F-UNDER's and F-VOID's ladder
rows, §5.3's rows for the accesses, the concealed modes and the undercity, and §13.2's hook tests (T12, T63–T66); and the
closure rule with `addUndergroundAccess` (§7.3 item 9, §7.1), whose underground pieces run once the layer's stages exist.
Staged by the owner's roadmap (M6-U) and not built here: the stages themselves — the network, the sewer-front
neighbourhoods, the void systems, the undercity, the access pass and the connection stage.

**Limits (EP-19).** A degenerate gallery, chamber, plot or link the kernel refuses is handled on its stage's ladder — F-UNDER
for the sewer front, F-VOID for the systems and the undercity (§5.2) — the element left out and reported, never a whole-map
retry. With `Features.sewers` off the network stage commits nothing; with every system's chance 0 (the parity presets) and
`maxNeighbourhoods` 0 nothing of the layer runs but the caverns and ruins the site holds, which are drawn only under the
view key `showUnexcavated` (V04; J-VI.19); the islands setting changes nothing underground; the layer's `LayerSpec.visible`
changes nothing in the model. Every underground record persists in its part (§2.9), undoes by the log (§7.4), re-derives with
the tail at the same fold position (§4.1) and migrates by its table version — a document without a part has none, and
`nextUndergroundPart` is never reused (§7.5).

### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement

*In plain words.* The owner asked what an undercity would require. Not more dwellings along the sewer walls — those stay
standoffish — but a place with the four things that make any town a town: a void big enough to live in, its own square and
streets, its own institutions, and lifelines to the surface. It is one to three neighbourhoods at most, each the underside of
a real quarter above, peopled by the settlement's own poorest and outlawed, trading the town's goods — a shadow of the
settlement, never a second one.

**What an undercity requires — its existence test (item 65 (b); J-A65.41).** The undercity stage tests four conditions before
it builds anything, each a rule with its values in `UndercityRule` (below; our own, calibratable, `extension`):
1. **A void large enough to live in** — chambers from a source that explains them (II.7.6): a ruin (a built void, ranked
   above caverns and quarries by the rule's `sourceRank`, item 109 (e): a built city is readier to live in; an ancient forum or
   temple hall of at least `mainChamberM2` is the first plaza candidate), a cavern hall, a quarry's gallery system, a catacomb,
   cisterns and vaults, or a buried old town or former settlement (II.7.6). A void's **capacity** is the floor area of one
   connected cluster of its chambers and galleries ÷ `m2PerHousehold` (40 m² with its walkways). A void with no access to the
   surface holds no dwelling (item 109 (j) (4)).
2. **Its own public space and streets** — a chamber of at least `mainChamberM2` (400 m²) to be its plaza and black market, and
   galleries or walkways joining its chambers: its streets, independent of the sewer's water channel.
3. **Its own institutions** — the microcosm: at least `minInstitutions` (2) institutions of `undercity: 'preferred'` classes
   placed (§10.2: the black market first, a fence's hall, a criminal guild's seat, a tavern, a forbidden shrine, a fighting
   pit, a healer), beside its warren of dwellings.
4. **Lifelines to the surface** — food, water and air: at least one access to the surface (a stair, a basement access of
   II.7.3 or a link to a system that has one), one air shaft surfacing at a well, a grate, a chimney or a ruin (an
   `AccessPoint` of role `air`), and water from the river, a cistern or a well; and a route to the outside where the site
   offers one (an outfall, a cave mouth beyond the walls).
A neighbourhood whose void, square, institutions or lifelines fail steps down the ladder below; the sewer-front dwellings of
II.7.3 along the tunnels that lead into it are its outskirts, and its core is the void.

**Existence and the 1–3 bound (item 65 (c); owner: "the undercity is at most 1-3 neighborhoods to keep it simple and
consistent"; J-A65.41).** One rule: an undercity may exist in cities and metropolises under the law, rarely in a large town,
never below TOWN. The rung row `RungProfile.layers.undercity` (§1.1; `UndercityExistenceRow`, below) reads `never` at THORP,
HAMLET and VILLAGE (PART III); `law` at TOWN with `maxNeighbourhoods` 1, `minPopulation` 6 000 (the large town) and `chance`
0.2 (rare: one draw on `sewer`); `law` at CITY with 2; `law` at METROPOLIS with 3. Under `law` it exists when (i) the rung
admits it (and, at TOWN, its draw comes up), (ii) a void source with capacity for one neighbourhood exists or is forecast,
(iii) its household demand H (below) reaches `minHouseholds` (20) and (iv) conditions 2–4 can be met — S7b (7) reads this
verdict from the network forecast (V04 §3.3 P6) rather than drawing again; where the dossier port supplies the fact (an
optional input, §7.7), a dossier may require one — it then exists at TOWN and above with at least one neighbourhood, in the
vaults under the oldest district where no other void is found — or forbid one, and the dossier's word outranks the rule. It
is never more than three neighbourhoods; the sewer-front dwellings elsewhere in the network are not part of it and do not
count against the bound.

**The size law.** The household demand is `H = min(N × u × (P ÷ P_ref) × (1 + g × disorder) × c, maxBandShare × N_poor)` —
`N` the settlement's households; `u` the undercity share at the reference poverty by rung (TOWN 0.01, CITY 0.02, METROPOLIS
0.03); `P` the poverty share, the share of households in the `squalid` and `poor` bands (§4.5), and `P_ref` 0.022 the default
roster's; `disorder` the circumstance slice's scalar in [0, 1] (§7.7 layer 2; 0 where absent) with gain `g` 1; `c` §4.6's
undercity factor `1 + crime.undercityScale × PortRows.crime` (item 88; 1 while the row is empty); `N_poor` the households of
those two bands and `maxBandShare` 0.6, so the surface keeps poor households of its own — the H households taken from the
squalid band first, then the poor band. To them join the roster's `undercity: 'preferred'` institutions at their table counts
and the clandestine institutions whose mode is `underground` (§4.7). The neighbourhood count is
`n = clamp(⌈H ÷ householdsPerNeighbourhood⌉, 1, maxNeighbourhoods)` (120 households), none when `H < minHouseholds`; the void's
capacity caps both (n falls first, then H). At the default roster and the `navigable` preset a city holds one neighbourhood and
a metropolis two, a poorer or more disordered one up to the bound — so the undercity grows with population, poverty and
disorder and shrinks with prosperity and order, as the owner asked. **Realism or toggle (D-3; J-A65.43).** Under the sewer's
`historical` preset (realism, the default) the undercity is a modest warren: at most one neighbourhood at any rung, its void
sources vaults, catacombs, quarries, a buried old town and a ruin only, its shares `u` × 0.5; the full microcosm with the
1 / 1–2 / ≤ 3 bound and cavern towns rides on the `navigable` preset, D-3's fantasy toggle.

**The allocation (S7b (7), §4.5).** Where the forecast gives an undercity — every void source being predictable at S7b:
ruins from their evidence (II.7.6), caverns from S1's geology flag and mining, catacombs from the burial sources and their
ages, quarries from the stone resource and the roster's predicted stone stock, vaults from the arterials and bridges S4 laid,
a buried town from the log or, at generation, from a history scar or the replay (II.7.6) — S7b creates its `Allocation`: the H
households of the size law, the squalid band's first and then the poor band's, the `undercity: 'preferred'` classes, and the
clandestine institutions whose mode is `underground`, which take the undercity over a sewer dwelling where both exist; capped
at `forecastSafety` × the forecast capacity; the ground's districts receive the remainder, so the population stays whole —
nobody is added by the underground (c′ (1)). A miss between the forecast and the voids as built is absorbed by S10b's
plan–fit–reconcile and F-SITING's ladder, reported, never re-rolled.

**A shadow, not a second city (item 65 (c′); owner: "while it is called an undercity, it is simply the less than savory shadow
and extension of the full settlement, not independent of it"; J-A65.44).**
1. **Its people and institutions are the settlement's own** — the roster's households and institutions (the dossier's where
   one exists); the settlement's population totals include them.
2. **Each neighbourhood shadows a surface district.** A neighbourhood is a pseudo-district (`District.kind = 'undercity'`,
   §2.5) in its void's part (below), with a `parent` link to the surface district above the largest share of its main chamber
   in plan (ties by address) — the district that feeds it: poor, dockside, market, the old core. It joins §9.1's quarter tree
   under its parent's quarter node and is named as the underside of that quarter by §10.4's undercity naming (J-A65.40), never
   as a rival town; its prosperity is the parent's field sampled at each plot, shifted by `undercityOffset` (−0.35) and banded
   by the town's own `FieldBands` (II.7.3's pattern).
3. **Its economy is the surface's shadow.** Its black market trades the town's goods and its trades serve the town: S10b's
   supply links run to the surface markets, docks and outfalls, measured from each undercity plot along its walkways to its
   nearest lifeline and on from the lifeline's ground point (the solver's `street` mode through the lifeline).
4. **It has nothing of its own to govern it** — no government, walls, gates or rung of its own, and no identity of its own: it
   reads its parent's (§4.5 (4), (*Which districts*); §10.4); the settlement's circumstances (disorder, crime, government) drive it.
5. **It changes as the settlement above changes.** At each epoch its size law is re-read (`UndercityEpoch.reread`, V06's
   `under.undercity`), a change taking effect only past `hysteresis` (0.1 of H) and a new neighbourhood opening only in its
   void's free capacity; its blocks follow their parent's due marks through §4.11's wealth ladder (item 31); its chambers and
   galleries flood, collapse or are sealed by II.6's condition table, a chamber's plots following it as II.7.3's follow their
   tunnel; a void whose every open path to the surface closes is lost (II.7.6) and its dwellings empty by the vacancy rules;
   and the conversion `clearUndercity` (below; the authorities' clearance, by an epoch or by hand) vacates one neighbourhood's
   plots — its households leaving by §4.11's step (c), its institutions relocating by the use step — while its chambers stay.

**Where it lives, and its streets, plots and buildings (item 65 (e); J-A65.44).** An undercity neighbourhood lives in the arena
part of its void source (a ruin, cavern, quarry, catacomb, vaults or buried part, II.7.6) — never in the sewer's part 0, where
U1–U3 hold, and never in a part of its own, because its chambers are its source's: nothing is copied between parts (J-A12.43;
J-A65.31). The undercity stage runs S9–S11 on that part by the kernel's one cut (J-A65.32): its streets are `gallery` chains of
its own — walkways laid across a chamber's floor and the source's galleries it adopts (a ruin's old streets among them) —
banded by `corridorUnion`; a chamber's floor is cut by S10's frontage-first machinery on those walkways' kerbs and on the
chamber wall (plots may end on the `chamber_wall`); the main chamber stays unplotted as its plaza, the black market's stalls
its pins (§4.7's market pins). S11 admits the arrangements `row`, `hovel`, `cluster` (item 70's informal clusters) and
`institution` (`UndercityRule.arrangements`), carved rooms and repurposed vaults being `row` cells against the chamber wall;
heights are ceiling-capped — `eaveCm` = min(the class's storey height × its floors, the chamber's `ceilingCm` −
`ceilingClearCm` (30)), one floor or more where the ceiling allows, roof kind `flat`, no sky. Every district, plot and building
is an ordinary record on its part, editable by every edit kind of §7.

**Its outskirts.** The sewer-front blocks of II.7.3 whose tunnel runs lead into the undercity — within `outskirtsReachM`
(150 m) along open tunnels from a link that joins it — belong to its neighbourhoods: each undercity district lists them
(`District.outskirts`, §2.5), a link between records in two parts (J-A65.31); their plots, geometry and allocation stay part
0's under U1–U3, and they are named, described and counted with the neighbourhood.

**Lifelines and light.** The connection stage (II.7.6) realises the undercity's lifelines before any other link: the nearest
candidate access, air shaft and water link are made (`open`, or `secret` by the row) first; a neighbourhood left without one
fails condition 4 and is dropped, its allocation re-placed by the reconcile, and with none left there is no undercity — each
drop reported. **Light (item 68 (d′); owner: "the undercity and near dwellings underground has to have a lot of light
sources. they don't have the sun or moon").** The underground layer has no global light and near-zero ambient; the
undercity's rows of §4.7's light table (context `arena` underground, system `undercity`) are the densest of the layer — a
light at every door (the windows lit by §8.4's derived window lights), along walkways (`gallery` rows) at a spacing tighter
than any surface street, clustered in the market chamber and around its institutions, braziers and fire pits in the larger
chambers — the fuel the rows the era row selects (tallow and pitch, lamp oil), with the magical rows only where the `magic`
circumstance admits them (§4.7 *Light sources* (3)), and every lifeline that breaks the surface is a light shaft (§8.4), so its
brightest spots at noon lie under its shafts.

**Emulation (item 65 (f)).** No reference generator has an underground: every row here is an `extension`, and the parity
presets set `maxNeighbourhoods` to 0.

**Order, seed and locality.** `UndercityStrategy` registers after the void systems, the sewer-front neighbourhoods and the
access pass and before the connection stage, by declared I/O — inputs: the void systems' parts, the ground plat (read), the
three field rasters, the undercity `Allocation` and the rows; outputs: its districts, blocks, plots, buildings and walkways —
and runs eagerly on the generation worker after the pool's merge, as a tail stage, as II.7.3's stage does (J-A12.46). Its
existence and size draws are on `sewer`, keyed by the settlement's lineage; each neighbourhood's streams derive from its
district's lineage, itself from its parent's (§6.3), through the ordinary concerns (`plot.*`, `siting`, `siteplan`,
`heights`; §6.1, no new concern); it writes only its void's part, so a New random of an undercity neighbourhood leaves the
ground and every other part byte-identical, but for the far `link_end` vertices of its links, which the connection stage
re-derives by one transaction on each such part (§3.4).

```ts
interface UndercityExistenceRow { existence: 'never'|'law'; maxNeighbourhoods: 0|1|2|3; minPopulation?: number; chance?: number /* TOWN: 0.2 */ }   // RungProfile.layers.undercity (§1.1); the rule above
interface UndercityRule {   // II.7.5's values as one editable rule record (§7.6); our own, calibratable, extension (the parity presets: maxNeighbourhoods 0)
  share: Partial<Record<Rung, number>> /* u: TOWN 0.01, CITY 0.02, METROPOLIS 0.03 */; povertyRef: number /* 0.022 */; maxBandShare: number /* 0.6 */; disorderGain: number /* 1 */; householdsPerNeighbourhood: number /* 120 */; minHouseholds: number /* 20 */;
  m2PerHousehold: number /* 40 */; mainChamberM2: number /* 400 */; minInstitutions: number /* 2 */; undercityOffset: number /* −0.35 */; ceilingClearCm: Cm /* 30 */;
  outskirtsReachM: number /* 150 */; hysteresis: number /* 0.1 of H */; sourceRank: Partial<Record<UndergroundSystem['kind'], number>> /* item 109 (e): ruin above cavern and quarry (V11) */;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'hovel', 'cluster', 'institution'] */;
  presets: Record<'historical'|'navigable', { maxNeighbourhoods: 0|1|2|3 /* a cap on the rung row: 1 and 3 */; sources: UndergroundSystem['kind'][] /* historical: vaults, catacomb, quarry, buried, ruin; navigable: all */; shareScale: number /* 0.5 and 1 */ }> }
interface ClearUndercity { op: 'clearUndercity'; district: Id /* one undercity neighbourhood */ }   // a conversion kind (§4.11's union names it): its plots vacated, households leaving by step (c), institutions relocating by the use step; chambers kept
interface UndercityStrategy { derive(doc: Document, systems: UndergroundSystem[], allocation: Allocation /* S7b (7)'s */, rules: UndercityRule, ctx: StageContext, k: Kernel):
  KernelResult<{ districts: District[]; blocks: Block[]; plots: Plot[]; buildings: Building[]; walkways: Gallery[] }> }
// a tail Stage registered after the void systems, II.7.3's stage and the access pass by declared I/O; runs S9 → S10 → S10b → S11 on each neighbourhood's void part; the StrategyRegistry's `underground` map (§14)
```

### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**One layer, several systems (item 65 (a); J-A65.31, J-A65.42).** The underground layer holds the derived sewer network — the
central piece, system kind `sewer`, part 0 (II.7.1–II.7.4) — and beside it the systems below, each an `UndergroundSystem`
record (§2.7) with its kind, its source, its arena part and its depth range: `ruin` (an older civilisation's remains, item
109), `catacomb`, `cavern`, `quarry` (quarries and mine voids), `vaults` (cisterns, street and bridge vaults and a raised
way's arch vaults), `buried` (a buried old town or former settlement) and `dug` (the private passages an access edit, an
undercity lifeline's closure or the connection stage digs, item 66). Each is its own arena part of the `underground` layer
(§3.4): the sewer keeps part 0, and every further system takes the next unused part number when it is first created — at
generation in the stage order below, one system per kind; a `buried` system when a `raiseGrade` first makes one, or at
generation from a history scar or the replay (*A buried old town*, below); a `dug` system at the first closure or generation
dig that needs one (§7.3 item 9 (d)) — stored on the record (`UndergroundSystem.part`), counted by the document's
`nextUndergroundPart` (§2.9) and never renumbered or reused, because the number is part of its entities' keys and addresses
(§6.3). One system per kind: two complexes of one kind that meet join, as galleries of one kind may; what passes over or
under without meeting belongs to another kind and so to another part. Inside one part every plan crossing is a junction
(§3.4), so no rule lays an element across another of its part without meeting it: a catacomb or quarry laid beside a complex
of its kind joins it at a common depth band; a dug connector's path search treats every other building's dug passage as a
foundation (step 3 below); and a drawn gallery or chamber that would cross one of its system's at another depth band is
refused by its dry run, naming the crossing (F-EDIT, §5.2; J-A65.47). A system's elements are **galleries** (`Gallery`,
§2.7: a chain at the part's L1 with `widthCm`, `wallCm` and `headroomCm` from its system row below, banded by
`corridorUnion` as a tunnel is, §3.7) and **chambers** (`Chamber`, §2.7: a void wider than a band — an ossuary, a cavern
hall, a ruin's hall, a quarry room, a cistern, an arch vault — a closed outline chain carrying the `chamber_wall` role, its
floor an L1 face; J-A65.32), each with its floor `elevationCm` and its `ceilingCm`.

**Depth bands.** Every gallery and chamber keeps its own depth, laid inside its system row's `depthM` range (catacombs 3–10 m,
vaults 3–8 m and a raised way's arch vaults at grade, quarries 10–30 m, caverns 5–60 m following the rock, ruins 4–30 m by
their age (V04 §3.5.0a), a buried town or former settlement at its old grade, dug passages 2.5–6 m) and never above the ground
less its system's `coverM`; inside one part depth is per entity (J-A12.45), and systems in different parts pass over and under
one another. The view groups every part's items into the depth bands of `depthBandCm` (II.7.3), so the layer draws and exports
as one (§8.4, §11.1), a crossing of two parts drawn over and under.

**The derivations.** Each system is a registered tail stage with declared I/O (§4.12) — `UndergroundSystemStrategy`, below —
running after the network stage in the order ruins (first, so the later systems meet them), catacombs, caverns, quarries,
vaults — then, at generation, a buried town or former settlement where a history scar or the replay makes one (below) — each
reading the ground and part 0 through the services only (J-A12.32) and writing its own part; every draw is on `sewer`, keyed
by the system's lineage and the element's source (§6.1; no new concern). Caverns and ruins exist at every rung, their extent
the site's, not the settlement's, so a hamlet may sit over a large one (item 109 (j) (1); PART III); every other system is
gated to TOWN and above (PART III) and by its row's chance per rung — a history scar's buried town by the `buried` row's
`scarSeverity` instead, drawing nothing; the chances are 0, and the scar rule off, in the parity presets. **Unexcavated by
default (item 109 (j) (2)):** a cavern or ruin exists whole whether or not anyone can reach it; it is `unexcavated` until an
access exists (the excavation state is V04's), drawn only under the view key `showUnexcavated` (dashed, faded), and the clerk
says so.
- **Ruins (item 109 (b)–(i); V04 §3.5.0a builds them).** An older, different civilisation's remains — distinct from `buried`,
  this settlement's own earlier level. **Existence**, from what explains it, strongest first: the dossier's `ancient_ruins`
  resource or a ruined-landmark record (scene archetype `ruined-landmark`); a `magical_node` or a ley-line income row; a
  `magical` history event or an ancient founding ("The Fall of …"); an adventuring institution that implies delving nearby, as
  supporting evidence; without a dossier, a blueprint chance by rung and relief under the fantasy toggle (D-3; V11's ruin
  chance rows); 0 in the parity presets (§7.7's DR rows map the dossier sources). The surface `ancient_ruins` decoration stays
  as the system's surface marker and, where placed, its entrance. **Structure — a remnant plan, not a cave:** laid as an
  ancient plan from an ancient-culture row (a grid, an axial temple precinct, a radial citadel, a terraced cliff city — V11's
  rows, each differing from every current culture row in at least block size, grid regularity and orientation law, so a ruin
  never copies the streets overhead), at its own orientation or, with a table chance, sharing one axis with today's main
  street, sized by its source's significance (a shrine complex, a palace, a sunken district; capped at a share of the frame);
  then decayed by a persistence order (monumental halls, walls, colonnades, cisterns, gates and paved axes survive longest;
  ordinary rooms least), keeping a survival share by age and cover, the rest collapsed or filled; its stepped monuments laid by
  V02's tiers (item 110 (c)). Galleries are its old streets and corridors, chambers its halls, temples, courts, tombs and
  vaults — straight walls, right angles, columns and axial symmetry. **Magic:** under `magic` ≥ `low` its chambers may carry
  lights (source `magic`), and a dossier's `magical_node` sits at its heart — the node term II.6 and V08 read, taken at the
  ruin's centre. **Named** from the `ruin` slice or the civilisation the dossier's history names (§10.4); **drawn** in V04's
  masonry style (§8.2's ruin style).
- **Catacombs (item 109 (k); V04 §3.5.1 builds them).** Only under cemeteries: a churchyard, a separate burial ground (a
  cemetery, or SettlementForge's `Cemetery network` ground beyond the gates), a monastery's burial ground, and, at CITY and
  METROPOLIS, a worked-out quarry turned ossuary for a cemetery's bones — each source with its chance by kind and rung (V11's
  `CatacombRule` cells, V11 §3.23.8). **Crypts are not catacombs:** a church's crypt is part of its own basement (§2.6; §10.2's
  `crypt` column; the cathedral always has one, the largest), never a catacomb source, and it opens into a catacomb only by
  V04's crypt join where a gallery grows beneath it. **How many:** at most one at TOWN; at CITY and METROPOLIS one plus one
  per `churchesPer` churches (the dossier's church records and ranges, item 108's members, or the roster's), capped by rung
  (V11's `CatacombRule`); candidates are taken in order — cemeteries by the burials they serve, then a quarry ossuary — until
  the count is reached, each still subject to dry ground, the age gate and its chance, so not every town has one; the largest
  catacomb is the largest cemetery's. A source qualifies when its ground is not `damp` or `flood` (the water table of §2.6's
  gate values) and its **age** reaches `minAgeYears` (100): a source's age is its own — at generation `(K − k + 1) ×
  yearsPerStage` for a source built in growth stage k of K (§4.4; `yearsPerStage`, the stage rows' 50 years; with a known
  history K and the stage years are §4.2 S2's history-scaled ones, so a stage-1 source is as old as the settlement's
  `ageYears`), after the replay or epochs the log's years since its use opened. **Extent — moderate and never shrinking:** the
  ossuary need `A = Σ_years servedPopulation × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial` — the population its source
  serves (the town's population history × the source's **burial share**, the share of households whose nearest open burial
  face it is; at generation each growth stage's population at its built share; an epoch's calamity deaths included,
  `CalamityRef.deaths`), `burialRate` 30 per 1 000 a year, `ossuaryShare` 0.1, `m2PerBurial` 0.05 — is a **ratchet**: every
  derivation (a growth stage, an epoch, a dossier event, a regeneration) may only add galleries and chambers, the extent being
  the larger of the current extent and the need, its growth per epoch capped at `growthCapShare` of its floor area (V11); a
  new cemetery or church taking a share of burials never removes an older catacomb's galleries, and closed galleries stay part
  of the extent. Laid as galleries on a grid of `gridM` (6 m) under and beside the source within `reachM` (80 m), an ossuary
  chamber at every fourth crossing, and an **entrance stair on the source's burial face**, its head in the face's chapel where
  one stands, never inside a church-class building — a churchyard's catacomb is entered from the churchyard, and through its
  church only by the crypt join; a quarry ossuary by its working's shaft and a stair at the working's surface head (an
  `AccessPoint` of source `system`; V04 §3.5.1 (9); V01 makes it a place, V01 §3.7.1). **Stagnation:** where growth is blocked
  — its reach limit, wet ground, another system or a foundation in the way, the wall strip, the rock's depth, or its source
  closed — the catacomb is `stagnant`: its extent holds and the unmet need is absorbed by reuse (the ossuaries' fill rising,
  drawn denser), never as loss; when the block lifts, growth resumes by least disruption; a catacomb whose cemetery closes
  stops growing and stays; a new cemetery begins a new one only where the count allows. So a catacomb is as large as its town's
  dead and as old as its cemetery.
- **Caverns (item 109 (a)).** From geology: where S1's geology flag (`Terrain.geology`, §2.3) is `soluble` or `volcanic`, over
  the frame's rock (S1's `rock`, `high` and `mid` terrain classes), a cavern system exists with the row's chance (soluble 0.7,
  volcanic 0.4), multiplied where the site holds mining (`Terrain.mining`, §4.2 S1 (10)) by `cavern.mineBoost` (1.4, capped at
  0.9); in `ordinary` rock of hilly or mountainous relief a `fissure` variant applies with its own chance (0.15): narrow
  fissure galleries along the steepest relief with one or two chambers, never great halls — rock type stays the physical gate
  for large systems (general knowledge, not corpus-witnessed). Soluble rock: galleries along the terrain's drainage lines
  beneath the rock (§2.3's `hydro` cells whose `flowAccum` passes the row's threshold), at the local water table — a gallery
  below it carries water (`Gallery.water`) — with a hall where two galleries meet under high relief; volcanic rock: one to three
  tubes descending from high ground along the steepest descent, with breakdown chambers. The extent is capped at
  `maxRockShare` (0.1) of the rock area, and a gallery that meets a slope's face or a bank opens there as a cave mouth (an
  `AccessPoint` of kind `mouth`). **Mines break into caves:** a mine working within `cavern.breachM` (40 m) of a cavern gallery
  joins it by a `breach` link, the mine's shaft then an access to the cavern (V11's cavern rows hold these cells).
- **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the town is
  built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity of stone,
  never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are laid on the
  frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within `reachM` (2 km),
  under the town first where its own ground holds the stone (as the old quarries lay under Paris), as room-and-pillar galleries
  on a `roomM` (5 m) grid leaving `pillarShare` (0.35) of the rock, the area (m²) = volume (m³) ÷ (`headroomCm` (250) ÷ 100);
  a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry (§4.9) and laid nowhere
  underground; a shaft opens at each working's centre (an `AccessPoint` of kind `shaft`). Mine voids read `SiteResources.ore`
  the same way, where the roster holds a mining class.
- **Vaults** — cisterns and street, bridge and raised-way vaults: under every bridge approach whose way rises over the ground
  beyond the banks; under way segments on slopes steeper than `vaultSlope` (0.12) where a street is carried on arches; a
  cistern under the oldest precincts and the castle where the lesser of `dist.water` and the distance to the nearest aqueduct
  delivery point exceeds `cisternDistM` (400 m) — each a chamber or a short run of vaults under its way or precinct, under
  public ground only (II.7.3's surface constraint applies, a cistern's own precinct or castle court admitted); an aqueduct's
  cistern terminal takes a terminal cistern under its conduit house's yard; and each span a raised way's record marks `vault`
  holds one arch vault at grade (`archVault`), following its raised way at every rung — the TOWN gate binds the other vault
  sources only. The aqueduct's need test (§4.3) reads only eager inputs and never these placed cisterns, so no cycle arises; the
  cistern rule reads the aqueduct's delivery points (`terminal.at` and `feeds`) in return.
- **A buried old town** — the settlement's own earlier street level under a raised grade (item 65 ruling 5; J-A65.46): the
  conversion kind `raiseGrade` (below; §4.11's union names it) is applied by an epoch (the evolution engine) or by hand (a
  `convert`, §7.1). S1's terrain operator raises the region's ground by `raiseCm` (≥ 200 cm, a storey); the region's ways,
  plots and buildings at the old grade end on the ground (their existence `cleared`, §2.8) and fresh records of the `buried`
  part are the system's elements — each old way's centreline a gallery, each old building's ground storey a chamber, each
  square a `square` chamber, each new record minted from the conversion event's `seq` and ordinal as a mutation's added parts
  are (§6.3), the cleared records keeping their addresses on the ground: an address names its part and no batch writes two
  (§3.4) — while the ground above is re-derived on the new grade from the old centrelines (regrowth-first, §4.11: the streets
  keep their lines, the buildings rise on their plots). The conversion records the system it created or extended in
  `RaiseGrade.system`, so a replay after a log truncation reads its part number there, as a closure's `ClosureRecord.created`
  does (§2.9). So an undercity in it walks the old town's streets under the new. **At generation from a scar:** where
  `HistoryHint` carries a `fire` or `flood` scar (the `RaiseGrade.cause` types §4.2 S2 routes here) of `severity` ≥ the
  `buried` row's `scarSeverity` (0.5), the most severe such scar (ties: the oldest, by `yearsAgo`) makes one `buried` system —
  its region the districts whose `growthStage` is 1 (its `sources`, §2.7), its galleries that region's way centrelines, its
  chambers their buildings' ground storeys and its squares (a `square` chamber each: every square face and every square block
  of the region), fresh records of the `buried` part (the system's lineage children, §6.3), its floors at `scarBaseCm +
  scarGainCm × severity` (200 + 200 × severity) cm below the present grade — the town above generated on the present grade as
  it stands, no `raiseGrade` event recorded and nothing cleared, the rule drawing nothing (our own rows, calibratable,
  `extension`, off in the parity presets); with the hint empty, none. **The buried former settlement (item 113 (c)):** under
  history-first generation (§4.11) a destroyed or shrunken former settlement older than `history.burialYears` is buried the same
  way from the replay's own former geometry — its streets, walls and major buildings at their old ground level — as fresh
  `buried` records minted from the replay epoch that buried them; it is this settlement's past, distinct from a ruin's older
  civilisation, and access to it follows item 109 (j) below.
- **Dug passages** — item 66's pieces (below), and those the connection stage digs at generation for an undercity lifeline and
  for a subterranean dossier institution, keyed by the district's lineage or the institution's binding key (no
  `ClosureRecord`: generated pieces re-derive with their owner, edit-made pieces are held, and a `regenerate` on the `dug`
  system re-derives only its generated pieces; §7.3 item 9 (d)).

**The connection graph (item 65 (d), item 109 (d), (j); J-A65.47).** A link (`UndergroundLink`, §2.7) joins two elements of
different parts — each end one vertex in its part carrying the `link_end` role (§2.2 rule 7), never a vertex two parts share
(J-A65.31) — with a `kind` (`open`, `gated`, `secret`, `collapsed`, `flooded`), a `via` (`breach`, `reuse`, `stair`,
`shaft`, `door`) and a `knownTo`; the surface links are `AccessPoint`s (II.7.4). Two tail stages make them: **the access pass**
(`AccessPassStrategy`, V04's U-ACCESS), after the void systems and before the undercity, writes the proximity, overlap,
mine-breach, crypt and reuse links, the dig, opening and crypt accesses and a mine's heading galleries; **the connection stage**
(`UndergroundLinkStrategy`) runs last, after the undercity: (1) the undercity's lifelines (II.7.5) first; (2) for every pair of
elements of different systems within `linkReachM` (10 m) in plan and `linkDepthM` (8 m) in depth — found by reads across parts
— one link per pair within `linkSpacingM` (60 m), existing with the row's chance for the pair of kinds (sewer–vaults 0.6,
catacomb–quarry 0.5, any–buried 0.5, sewer–catacomb 0.3, sewer–quarry 0.3, cavern–quarry 0.3, sewer–cavern 0.2, others 0.2;
our own), so a catacomb may meet the sewer or not; (3) its kind drawn by the row's weights (open 0.3, gated 0.25, secret 0.25,
collapsed 0.15, flooded 0.05 — `flooded` only below the water table); (4) its `knownTo` `secret` for a `secret` link or a link
into a building with a concealed use, else `local`; (5) II.7.3's basement accesses (item 64). **Ruin links, only where the
rules allow (item 109 (d)):** a cavern gallery crossing a ruin street breaks into it (`breach`); a mine or quarry working within
reach breaks into a hall (`breach`); a catacomb may reuse a ruin's tombs (`reuse`); the sewer may adopt an ancient drain as a
trunk stretch where one lies along its course (`reuse`, never against the sewer's own hydraulics); a well shaft piercing a
chamber is an access; a buried old town above may reach it by a stair; its surface marker, a ruined landmark or a cave mouth
is its entrance. **Access to caverns and ruins (item 109 (j) (3), (3b); V04's excavation reading):** each access is an
`AccessPoint` with its cause — dug from above (every building standing over a chamber or gallery within `dig.reachM` of its
footprint's floor draws once, when it is built, for an access down, at a chance by its class, the void's depth — falling
steeply below the reach, so even at METROPOLIS a share of deep chambers stays sealed — and its basement; keyed per building on
`sewer`, so the chance of access rises as the settlement grows); a public opening (a sinkhole, a cave mouth, a collapsed shaft,
a ruin entrance, each by its row's chance); or none. When any system grows — the sewer extending, a catacomb's growth, a working,
a dug passage, an undercity lifeline — and one of its tunnels or galleries crosses or meets a sealed cavern or ruin where their
depth ranges meet, the crossing becomes a `breach` link (the grower's own course never bent for it) and the void is reached
through that system; at different depths they stay apart, save a small row chance of a connecting shaft. Access is
**transitive**: a void is `accessible` while the graph links it to a surface access point through **open** links only; when
every open path closes — its sewer sealed or caved in, a cellar filled, the building above lost, a disaster — the void is
`lost` (item 113 (e)): remembered as once known, drawn faded like an unexcavated void, until refound (the sewer reopened, a new
dig, a collapse, an excavation); dwellings in a lost void empty by the vacancy rules and may return with access. A link's kind
follows the elements it joins (II.6), and every link is an edit target (add, delete, `setAttr` on `kind` and `knownTo`, §7.1).

**The same engine, and the rest of the family's rules (item 65 (e)).** Every system is laid by the kernel's one cut (J-A65.32):
galleries as chains banded by `corridorUnion`, chambers as closed outline chains. Plots and buildings exist only where a system
hosts people — the sewer's frontage (II.7.3), an accessible cavern's or ruin's scattered dwellings (II.7.3 (c), (d)) and the
undercity (II.7.5); a catacomb's, quarry's or vault's chambers carry none unless the undercity takes them. Every element is an
edit target (draw, move, delete, `setAttr` on kind, depth, width, state and `knownTo`; II.6's conversions and `flood`; the
author draws or pins ruins with `drawTunnel` and `drawChamber` with system `ruin`), every rule is a data row (§7.6), the seed
survives edits (§6.3), the dossier stays the authority for institutions (item 20), and every element fades by II.6's condition
table — a ruin decaying slowly, excavated by a `dug` link, reoccupied or sealed over epochs (V06). **Light (item 68 (d′)):**
catacombs are dark but for their shrine and ossuary lamps at the chamber altars, caverns dark but where lived in (a
glowing-fungus row only where the `magic` circumstance or the biome allows, `LightRule.biome`), quarries and vaults dark but at
their shafts and where lived in, ruins by their magic rows — §4.7's light table, context `arena` underground and the system
kind; every access or cave mouth that breaks the surface is a light shaft (§8.4).

**The pieces an access edit generates (item 66; owner: "if a user edits a building to have an access to the underground, it
generates all the necessary pieces"; the closure rule — one event whose batches commit together, the record of what it
created, exact undo, shared pieces kept — is §7.3 item 9's; J-A66.41).** `addUndergroundAccess(building, target?)` (§7.1)
calls these generators in dependency order at its dry run, each drawing on `sewer` keyed by the building's lineage, the
target's and the event's `seq` (§6.1; minted as J-A18.43 mints), so the same edit on the same seed gives the same pieces:
1. **The basement** — §2.6's basement decision with its probability forced: the request overrides the chance, never the
   terrain gate — a full cellar where the gate allows, else a half cellar or a walk-out on a slope, else a hatch to a crawl
   space under a raised floor (§2.6's requested-mode ladder), else a refusal naming the gate (F-EDIT, §5.2), never silent
   (J-A29.22 stands).
2. **The target** — the named element; else the most plausible reachable one: an open navigable sewer tunnel or an
   underground building's wall within `accessReachM` (II.7.3's targets), then within `digReachM` (60 m) the nearest open gallery
   or chamber of a ruin, catacomb, cavern, quarry or vaults, or an undercity walkway — ties by plan distance, then address.
3. **The connector** — when the target lies beyond `accessReachM`: a `dug` passage, a gallery chain in the `dug` system's part,
   routed by the kernel's path search (§3.1) on the frame's grid from the basement ring to the target — its cost infinite within
   `foundationClearM` (0.5 m) of every other building's footprint, basement ring and dug passage and wherever the water table
   (§2.6's gate values) lies above the passage's floor, rising with the rock class — inside the `dug` row's depth range, below
   the street's services (the network's `coverCm`, II.7.2) and above the water table; a route longer than 2 × `digReachM` is a
   refusal with the reason (§13.2's T66 group covers a target within `digReachM` whose route exceeds it).
4. **The system itself** — where no underground element lies within `digReachM` (a town without sewers, a village): the minimal
   private underground, the `dug` system with one passage to the most plausible outlet by the building's outlet row (default:
   another cellar of the same owner within reach, a catacomb or cave the site has, the riverbank, the shore, beyond the
   outermost enceinte; where the building carries a concealed use: beyond the walls, the riverbank, the shore, a catacomb or
   cave) — its outer end an `AccessPoint` of kind `mouth`, or a door into the other cellar. The settlement's sewer rows are
   unchanged — a dug passage is no network and `Features.sewers` is untouched — while `Features.underground` turns true
   (II.7.4).
5. **The access point** — II.7.4's record, its kind by the drop (II.7.3's *Basement accesses* (3)), `state` `open`, `knownTo` by
   II.7.3's *Basement accesses* (4), `source` `edit`.
6. **The plan** — the plan rung reserves the stair, ladder or hatch in the basement plan (§2.6, item 28), and the building's plan
   rung is marked `stale`.
7. **The links** — the connection graph gains the new links, typed (`open` at a dug passage's two ends).
The closure's other instances (§7.3 item 9 (d)) declare their own generators: a concealed front's missing door by §2.6's
entrance rules (§4.7's *Concealed institutions* (4)), an undercity neighbourhood's missing lifeline by the target, connector,
access-point and link steps above (II.7.5), run from that neighbourhood's district ring in place of a basement ring, its target
the nearest element of another system with an access to the surface (II.7.5's condition 4), and keyed by that district's
lineage. The bars are §13.2's T66 group.

```ts
interface UndergroundSystemRow {   // one per system kind; II.7.6's rules as data (§7.6); our own values, extension (every chance 0 in the parity presets)
  kind: 'ruin'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'; chance: Partial<Record<Rung, Record<string /* source kind */, number>>> /* absent: none (the buried row's generation-time town reads scarSeverity instead); below TOWN only the ruin and cavern rows */;
  depthM: [number, number]; coverM: number; gallery: { widthCm: Cm; wallCm: Cm; headroomCm: Cm } /* the kerb reads widthCm ÷ 2 + wallCm (§3.7) */; chamber: { minM2: number; ceilingCm: Cm };
  params: Record<string, number> /* the kind's own values named above: minAgeYears, burialRate, ossuaryShare, m2PerBurial, gridM, reachM; mineBoost, fissureChance, breachM, maxRockShare; wasteFactor, roomM, pillarShare, minCoverM; vaultSlope, cisternDistM; scarSeverity, scarBaseCm, scarGainCm; digReachM, foundationClearM — the catacomb and ruin rows' own cells being V11's CatacombRule and ruin rows */;
  outlets?: { use: 'default'|'concealed'; order: ('cellar'|'void'|'riverbank'|'shore'|'beyondWalls')[] }[] /* dug only: the outlet rows of item 66's step 4 */ }
interface LinkRule { linkReachM: number /* 10 */; linkDepthM: number /* 8 */; linkSpacingM: number /* 60 */; chance: Record<string /* the sorted pair of system kinds, 'catacomb|sewer' … */, number>;
  kinds: Record<UndergroundLink['kind'], number> /* the kind weights */ }
interface RaiseGrade { op: 'raiseGrade'; region: Id[] /* the blocks or districts raised */; raiseCm: Cm /* ≥ 200 */; cause: 'fire'|'flood'|'rebuild'|'hand';
  system?: Id /* the buried system it created or extended, written when the conversion is applied; its address's under<n>/ prefix carries the part number a replay reads (§2.9) */ }   // a conversion kind (§4.11's union names it): the buried old town above
interface UndergroundSystemStrategy { derive(doc: Document, row: UndergroundSystemRow, ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[]; access: AccessPoint[] }> }
interface AccessPassStrategy { run(doc: Document, rules: { link: LinkRule; dig: DigRule; openings: OpeningRow[]; catacomb: CatacombRule }, ctx: StageContext, k: Kernel):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; headings: Gallery[] }> }   // V04's U-ACCESS; DigRule, OpeningRow and CatacombRule are V04 §2.2's (their rows V11's)
interface UndergroundLinkStrategy { link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel):
  KernelResult<{ links: UndergroundLink[]; access: AccessPoint[]; outskirts: { district: Id; blocks: Id[] }[]; dug: { system?: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[] } }> }
// Tail stages registered after the network stage by declared I/O (§4.12): the systems in the order ruin, catacomb, cavern, quarry, vaults and, at generation, a scar's or the replay's buried system, each writing
// its own part; then II.7.3's stage, the access pass, II.7.5's stage; then the connection stage last, which writes link records and access points and no geometry but their link_end and access_point
// vertices and the dug pieces of lifeline closures and of the dossier's subterranean institutions, each on the dug part, one part per transaction; the StrategyRegistry's `underground` map (§14)
```
