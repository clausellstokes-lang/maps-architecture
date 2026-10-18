# blocks-pipeline-sewers — lane amendments-b/amend-pipeline-sewers (PIPELINE part, seat pipeline-sewers; rule family sewers): block file per the BLOCK PROTOCOL
# Home items 12 and 14. Written against docs/ARCHITECTURE.md sha256 7a4e19dbae731d3e… (the route's snapshot). Every block is ADDITIVE
# (APPEND TO SECTION): II.6, §4.2, §4.5, §4.12, §10.2, II.1 and PART III are shared with the other pipeline seats, whose files sort
# before this one, so no REPLACE is written; the home mechanism is a new subsection II.7 appended to PART II. Text before the first
# "=== " line is ignored.

=== APPEND TO SECTION # PART II — STAGE 2: the city composed of neighbourhoods (interface depth; built after the base) ===

## II.7 The sewer layer — existence by tier, the network stage, the underground neighbourhoods (staged, with its base hooks)

*In plain words.* Sewers are a toggle the owner stages after the city is mastered, and the owner has since ruled three things
about them (items 12 and 14 of the owner's amendments of 2026-09-25, evening): a town may or may not have sewers, a city or a metropolis
always does and its switch only decides whether they are drawn; some sewer systems carry neighbourhoods underground, whose
plots may only line a sewer tunnel and whose buildings stand flush against its outer wall; and there are no sewer alleys.
This section states those rules as the design's own mechanisms — a rung row, a feature draw, two stages with declared
inputs and outputs, rule tables with their context, and the invariants and tests that prove them — so that the layer,
when the owner calls for it, is a registration and not a redesign. The network stage's declaration, its rule families and
presets and the underground's lifecycle stay in II.6; the records are §2.7's; nothing here is built in the base except the
rows, fields, invariants and tests it names.

### II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the toggle as visibility, the drain rule

**The rung row.** `RungProfile.layers.sewers` (§1.1; one row per rung in `ladder.json`, calibratable like every table, §7.6)
states whether the network exists:

| rung | `existence` | law (TOWN only) |
|---|---|---|
| THORP, HAMLET, VILLAGE (the village product's rows, PART III) | `never` | — |
| TOWN | `law` | P(sewers) = clamp(base + populationWeight · (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap), defaults base 0.05, populationWeight 0.25, wealthWeight 0.30, cap 0.60 — our own values, provenance "architecture 2026-09-26", PLAUSIBLE until calibrated (J-T, §13.7) |
| CITY, METROPOLIS | `always` | — |

`population` is the request's (§1.1) and `wealthLevel` the intent's town-wide wealth control in [0, 1] (§7.7's expansion;
default 0.5), so the probability rises with both and never reaches 1 inside the band (the cap): a large rich town draws
sewers three times in five, a small poor one once in twenty. **The draw (J-A14.41)** is one of S0's auto features
(§4.2 S0): `Blueprint.toggles.sewers ∈ { auto, on, off }`; a TOWN's `auto` is resolved by this law from the
`blueprint.features` concern (§6.1) before any other stage, with the other auto features, and recorded in the report's
`autoResolved` with its reason (§5.4); `on` and `off` are honoured as requested. At CITY and METROPOLIS the row fixes
existence `on` whatever the request says: a requested `off` is honoured as a hidden layer instead (below) and reported in
`requestedVsBuilt` ("network built, layer hidden"). The resolved value is **`Features.sewers: boolean`**, a derived field
of the document, recomputed on every replay from seed and request (§2.9) and listed in the report; every dependant —
the network stage, the drain rule, the underground pseudo-district, the exporters — reads it from the model and never
from the view. Until the two staged stages are built, `Features.sewers` is resolved and reported and the underground arena
stays empty: the layer's `requested` row reads `omitted` with cause `staged` (§5.1 (7)), so a CITY never claims a network
it does not carry.

**The toggle is visibility (J-A14.42).** The app's one *Sewers* control (§7.8's registry) has two meanings by rung, declared
in its registry row: at TOWN it is the model feature above (`auto` / `on` / `off`; continuity class *discrete*; locality
class *re-derive from the network stage* — the two staged stages of II.7.2 and II.7.3 run again on the underground arena
and the ground stays byte-identical, §7.3); at CITY and METROPOLIS it is a view control that sets the underground
`LayerSpec.visible` through `setLayer` (§7.1, §8.4) and changes no model. `visible` is `false` by default at every rung
(D-3: toggles off by default; MFCG and FTG draw no sewers, so the default picture is theirs), and the network exists in
the model at CITY and METROPOLIS whether or not it is drawn: §8.4's cut-away or overlay shows it when asked, §11's
exporters write the underground layer when its `exportSeparately` says so, and the drain rule and the underground
neighbourhoods depend on the model, not on the view.

**Which plot rules depend on the network (J-A14.44).** Exactly two. (1) **The drain rule.** The class table's `drain` column
(§10.2: `none`, `pit`, `channel`) names each class's need; the network stage connects plots to tunnels by the connection
table below and records each connection on the tunnel (`Tunnel.serves`, §2.7) — a one-way cross-arena link by entity id
(§2.2 rule 1), read back through a resolved view `drainOf(plot)` (J-K3), so no ground record changes; an unconnected plot
drains to its own pit or the street gutter and draws nothing (no cess-pit geometry, no pin: the yards stay as the
references draw them). Without a network — a TOWN whose draw came out `off`, every village — the rule does nothing and the
map stays the references' map: `channel` classes keep the `requires: 'water'` gate (§10.2) and S10b's downstream and downwind
scoring they already have (§4.7). (2) **The underground neighbourhoods** (II.7.3), which exist only along navigable
tunnels. S10b's siting, S11's site plans and S12b's greenery read nothing else from the network (emulation-first, item 23).

| connection table (defaults, calibratable) | `channel` plots | `pit` plots |
|---|---|---|
| `historical` preset | connected when a main lies within `reachM` = 60 m of its frontage midpoint, else reported as unconnected | connected by a per-band share drawn from the plot's `sewer` stream: poor 0, modest 0.10, prosperous 0.30, rich 0.60 |
| `navigable` preset | `reachM` = 120 m | every band 1.0 within `reachM` |

### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing

**The declaration is II.6's** (`SewerStrategy`, registered after S11 by declared I/O; rule families `follow-streets`,
`drainage-lines`, `mixed`; presets `historical` and `navigable`; the lifecycle of item 11); this subsection adds what the
owner's rules need of it. **The gate.** The stage's declared inputs are `Features.sewers`, the ways with `flowToward`
(§2.4), `Terrain.hydro` and `outfalls` (§2.3), the plots and buildings with the class table's `drain` column, and the
underground arena; its outputs are the `Tunnel` records (`under.tunnels`). It runs only when `Features.sewers` is true;
otherwise it commits nothing and the underground arena stays schema-complete and empty (§2.1). It runs eagerly on the
generation worker after the derivation pool's merge (it reads every district's committed L3 and L4, §4.1); it names its
tunnels with S13a's naming engine as the underground stage names its own entities (II.7.3), and S14's display list and
§11's exporters read the model through the entity registry (§4.10, §8.1) after every registered stage, so the tunnels are
drawn and exported with no change to S14.

**The underground arena's levels (the kernel's J-A12.31 and J-A12.32; the level mapping is §2.2 rule 1's).** The stage
writes, in §3.3's one-level batches: L0 — one land face, the rock, bounded by the arena's outer ring (the ground's frame
plus its context margin, §3.2 (9)), written before any tunnel as S1 writes the ground's ring; L1 — every tunnel's
centreline as a `tunnel` chain, never a `way` (no alley, lane or street exists underground: rule U2 of II.7.3); L2 —
`corridorUnion` on the L1 faces (§3.7, S9's function unchanged): each tunnel's band — its bore plus a wall on each side —
as two half-corridor strips with junction wedges, and the rock between the bands as the underground's built blocks. The
band's outer ring is **the tunnel's external wall**: the kerb every underground plot line ends on (§3.7). L3 and
L4 are the underground stage's (II.7.3). Nothing here writes the ground: the outfall is an entity link (`Tunnel.outfall`),
the served plots are ids (`serves`), and the street a main follows is `follows` (§2.7).

**The tunnel profile** is a rule table keyed by `(kind, preset)`; the kernel reads a tunnel's corridor half-width as
`widthCm ÷ 2 + wallCm` from it (§3.7):

| kind × preset (defaults, calibratable; cm) | bore `widthCm` | `headroomCm` | `wallCm` | `navigable` |
|---|---|---|---|---|
| `drain`, either preset | 40 | 60 | 25 | never |
| `culvert`, historical / navigable | 80 / 120 | 120 / 180 | 40 / 50 | no / yes |
| `main`, historical | 100 · (servedHa ÷ 10)^0.3, in [100, 180] | 150 · (servedHa ÷ 10)^0.2, in [150, 210] | 50 | where the bore and the headroom both reach the thresholds — a large trunk main in a big city, rarely a whole system |
| `main`, navigable | 240 | 260 | 60 | always |
| `passage`, navigable only | 150 | 220 | 50 | always |

`navigable` is derived per tunnel — `widthCm ≥ 110 ∧ headroomCm ≥ 160` (the thresholds are table values) — and stored on
the record (`Tunnel.navigable`, `Tunnel.headroomCm`, §2.7); it is what item 12 (b) means by a navigable tunnel, so the
`historical` preset has few or no underground quarters and the `navigable` preset can have many (J-A14.43). The
`navigable` preset is D-3's fantasy toggle, off by default; the `historical` preset is realism and is the network every
CITY and METROPOLIS carries.

**Depth and fall.** A tunnel's `invert` profile (§2.7; `invert_knot` on the centreline) is laid from the head of its run to
the outfall: at every knot `invert = groundHeightAt(p) − coverCm − headroomCm`, lowered where needed so the profile falls
monotonically toward the outfall at no less than `minGradient` (1 : 200) — the monotone-bed rule the river's carve uses
(§4.2 S1 (3)) — with `coverCm` (the crown's depth under the street: 150) a table value; a run that would need more fall
than the ground gives is re-routed toward the nearer outfall by the family's rule, never trenched (the stage's ladder row,
§5.2). `elevationCm` (§2.1's layer field) on every tunnel is its invert's mean, negative below the ground datum. Outfalls
are §2.3's `outfalls` on the settlement's downstream side (`ContextVector.upstream ≥ 0.5` at the outfall's cell) —
downstream of the harbour and of every water mill's intake (a policy row).

**Editing.** A tunnel is an edit target like a way (§7.1's edit-target table: draw, move, retype its kind, delete, `setAttr`
on its condition and preset): in the base a user may cut, move, seal, reopen or delete any tunnel; the evolution engine never
demolishes one (item 11, II.6). Every tunnel edit re-derives the underground blocks the edited edges bound (II.7.3's
scoping) and nothing on the ground.

### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order

**The owner's rules, as hard invariants (their §5.3 check rows are the determinism part's).**
* **U1 — frontage on one tunnel, doors onto it.** Every underground plot's `frontage` rows lie on the kerb (the external
  wall) of exactly one navigable, open tunnel run, and its `access` rows are a subset of its `frontage` rows (§2.5): a door
  opens only onto the tunnel.
* **U2 — no sewer alleys.** The underground L1 carries `tunnel` chains only; no `way` chain, no `alley` face and no S8 lane
  exists underground, so no tunnel exists to give access alone. F-PLOT's alley rung is skipped on the underground arena
  (§5.2): a plot that cannot front a tunnel is not a plot but residue.
* **U3 — flush against the outer wall.** Every underground building's frontage side lies on its plot's frontage edge; the
  footprint is `plot ∩ the frontage band of the row depth` (§4.7 S11's boolean), so the room's wall is the tunnel's wall
  by construction.

**Who lives there, from the same tables and field (J-A12.44).** The underground is a **pseudo-district**
(`District.kind = 'underground'`, one per settlement, its `faces` the underground built blocks, its `allocation` an S7b
record), as the hinterland and the sky pseudo-districts are (§4.5, II.6). **S7b (6)** — after the sky pseudo-districts (5)
and before the districts (1) — creates its `Allocation` when `Features.sewers` is on and the preset yields navigable mains
(the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one navigable run of `minRunM` =
60 m, predicted at S7b from the arterials' and main roads' served areas, which exist by then, since the mains follow
them): (a) households of the **poorest** band, a share `undergroundShare` of that band's demand (defaults TOWN 0.02, CITY
0.04, METROPOLIS 0.06 — the crowded, cheap, hidden stock); (b) the classes whose class-table row carries
`underground: 'preferred'` (crypts, cold stores, the cellar workshops of brewers and vintners, guild vaults) at their table
share, plus any assigned or dossier institution whose `knownTo` is `secret` (item 30) for which the assignment templates
prefer underground plots; (c) in an epoch, the evolution engine's crowding hook: a table share of S5d's ground shortfall
goes underground before the boundary widens (§4.11) — the owner's "crowding on the surface pushes growth underground",
staged with the engine. The allocation is capped by the predicted capacity — 2 sides × the navigable run length ÷ the
poorest band's mean frontage, less the excluded ground below — and the ground's districts receive the remainder, so the
population stays whole; a miss between the prediction and the built network is absorbed by S10b's plan–fit–reconcile and
F-SITING's ladder, reported, never re-rolled. **The prosperity underground is the ground's field, shifted:** a plot's
`ContextVector.prosperity` is the ground raster sampled at the plot's frontage midpoint plus `undergroundOffset` (default
−0.25, a table value), clamped to [0, 1] and banded by the town's own `FieldBands` (§4.5), so a vault under the cathedral
close reads richer than a cell under the tanners' lane; the density and greenery fields are read the same way, and
`ContextVector.arena = 'underground'` keys the arena-specific rows. The granularity table (§4.7 S10 (2)) then does what the
owner asked without a new law: the poor band's rows give many small cells, the institution row few large vaults; the
table's underground row scales depth by 0.35 (a plot one or two rooms deep: poor 4–7 m, modest 6–10 m, institution
8–15 m) and sets the vacancy-run share to 0.25 (long bare stretches of wall), and the site-plan table's arena column
admits the `row` and `institution` arrangements only (no compound, detached, hovel or tents underground).

**The cut is the ground's cut (J-A12.41).** On each underground built block the underground stage runs S9's and S10's own
machinery with the underground context (`PlotStrategy`, `SitePlanStrategy` and `BuildingGenerator.outline` unchanged,
§14): (1) a kerb edge is a frontage when its tunnel is `navigable` and open (the condition row's `open` flag, II.6) —
drains, culverts and closed runs are not frontages, so a block bounded by drains alone holds only residue; the frontage's
`class` is the tunnel's `kind`; (2)–(3) as §4.7, claims first for the vaults; (4) per-frontage regions by the block's
straight skeleton, the depth capped by the underground depth band, so a plot's rear line is its region's rear line and
**no plot reaches a second tunnel by construction** — two tunnels close together share the medial line between their
regions, never a kerb; (5) corner plots at junctions as on the ground; (6) residue typed `rock`; (7) joins and splits under
the same law; (8) vacancy runs at the underground share; (9) no alleys (U2); (10) every plot gets its context vector, its
derivation record and access rows ⊆ frontage rows (U1). Then S10b places the allocation by the same scorer and S11 lays
`row` cells end to end along the wall with party walls, and vaults on their claims — the row boolean gives U3. Everything
is cut inside the underground arena: the stage writes only that arena (`E_SCOPE` otherwise), and the ground's static index
partitions are read, never touched.

**The surface constrains the underground — by reads, never by copied geometry (J-A12.42, J-A12.43).** Before a plot is
committed its ring is tested on the ground arena through `pointLocate` and `resolve` on the ground's `PlatKey` (§2.2 rule 1,
through §3.4's services: no cross-arena write, no ground ring copied into the underground) at its vertices, its frontage midpoint and
a 1 m sample of its rear line. A sample is **excluded** when it lies in: any L0 water face; a cell whose `terrainClass` is
`damp` or `flood` (the water table: low, damp ground stays empty, item 12 (c)); a `wall_strip` block's band, setback,
glacis or ditch part, a tower's or a gatehouse's footprint (§4.8); the castle's reservation; the main footprint of a
`precinct` reservation (the cathedral's foundations); and **every other L4 footprint** — a room under a surface building
is that building's own basement (item 29, §2.6), a record of the ground building that never opens onto a tunnel, never an
underground frontage plot (J-A12.42). Public ground (corridors, squares, gate plazas), yard parts, greens, residue and
vacant plots are allowed. An excluded sample steps the plot down the **F-UNDER ladder** (its §5.2 row is the determinism
part's; the rungs are these): the band's depth → the band's lower depth → the class minimum depth → the run is typed
`vacant` (a bare stretch of wall); the ladder is deterministic from the plot's stream and each use is counted in the
report. A rear line that stops a metre short of the house above is invisible underground, which is why the test is a
sample and not a boolean against ground rings (J-A12.43).

**Access, air and light (item 12 (d)).** An **`AccessPoint`** (II.7.4; in §2.7's entity registry) links the arenas by
entity ids — a kind (`stair`, `shaft`, `well`, `cellar_stair`, `grating`), a role (`access`, `air`, `light`), a ground
point with the host it opens in (the corridor, square, yard or building, resolved on the ground by `pointLocate`, never a
ground face slot) and a vertex on the tunnel's kerb — and is placed after the plots: every **underground
neighbourhood** — a connected component of open navigable tunnel edges carrying at least one plot — gets at least one
`access` point, at the nearest allowed ground point above its tunnels in a declared order: a street stair in a corridor
strip or a square; a well shaft in a yard or a square; a `cellar_stair` in a surface building whose class row's
`undergroundAccess` is true (inns, warehouses and guildhalls by default) or whose plot is `knownTo: 'secret'` (item 30) —
a stair to the tunnel from a basement that stays the building's own room (item 29; J-A12.42). Air and light shafts
(`grating`) are placed every `shaftSpacingM` of navigable tunnel that carries plots (60 m historical, 40 m navigable) on
public ground only; where none lies within reach the spacing doubles once, then the run has none, reported.
`AccessPoint.ground.at` moves with its host face under a warp as a pin's point does (§7.4).

**Depth and ceiling, drawn on their own level (item 12 (g); J-A12.45).** Every underground building's `Heights` (§2.6) is
populated as on the ground: `baseCm` = the tunnel's invert at the plot's frontage midpoint + `floorAboveInvertCm` (30,
above the flow); `floors` = 1, or 2 for a vault class in the `navigable` preset where the headroom row allows; `eaveCm` =
the ceiling = min(the class's storey height, the tunnel's `headroomCm` + `vaultAllowanceCm` (a table value: 80 for vaults,
0 for cells)); `ridgeCm = eaveCm`, roof kind `flat` (a vault is a style program over the flat kind, §8.2); `elevationCm`
(§2.1) = `baseCm`, the entity's depth below the ground datum. There is **one underground arena** (`PlatKey` part 0 of the
`underground` layer, §2.2), not one per depth: depth is per entity, and the view groups the layer's items into **depth
bands** of `depthBandCm` (250) for §8.4's cut-away and for §11's virtual-tabletop scenes — one scene per depth band with
its elevation, so a building sits on its own level while tunnels at different depths keep their one topology.

**Lifecycle follows the tunnel (item 12 (f); the tunnel's states are item 11's, II.6).** When a tunnel run's condition
closes — the condition row's `open` flag turns false: caved in, collapsed or sealed — every plot whose frontage rows lie on
it takes `existence: 'abandoned'` with cause `rule:tunnel-closed`, and its buildings step through §2.8's decline states by
§4.11's tendency table at the underground's rate (the persistence order places the underground after streets and walls
and before terrain, item 8); a closed run's plots keep their ids, rings and derivation records. Reopening — by the engine
or through a user's `setAttr` on the condition (§7.1) — `resurrect`s (§2.8) the plots whose rings still exist, so nothing is
re-rolled. A tunnel deleted by a user (allowed: everything is editable) takes its plots with it as any way's deletion takes
the plots that fronted it (§7.3), and the underground blocks it bounded re-derive.

**Order, seed and locality (item 12 (h); J-A12.46).** The `UndergroundStrategy` registers after the network stage by declared
I/O — inputs `under.tunnels`, the ground plat (read), the three field rasters, the underground `Allocation` and the
tables; outputs `under.blocks`, `under.plots`, `under.buildings`, `under.access` — so the owner's order holds: city →
network → underground plots and buildings. It runs eagerly on the generation worker after the pool's merge, never in the
pool (it reads every district's committed L3 and L4 and writes another arena). It keys its streams from the underground
pseudo-district's lineage through the ordinary concerns (`plot.width`, `plot.join`, `plot.vacancy`, `siting`, `siteplan`,
`heights`; the network's own draws use `sewer`; §6.1); a seed therefore reproduces its underground exactly, and it names its
entities with S13a's naming engine for its own pseudo-district — a leaf of §9.1's quarter tree in a family of its own, its
labels drawn only when the layer is visible — as the hinterland unit runs its own stages (§4.1). **Locality:** the stage's
spatial reads are declared (§7.3's audit): each underground block records the ground cells over it, so an edit whose clear
region covers those cells re-derives those blocks by tree scoping onto the dependent arena, a tunnel edit re-derives the
blocks its edges bound, and a New random of the underground pseudo-district writes only the `under` arena — the ground is
byte-identical (the reroll-isolation fixture, §13.2). **Editable like everything:** underground plots and buildings are
ordinary plots and buildings on the `under/` arena (§2.1's address prefix), so every edit kind, lock, pin, assignment and
label of §7 applies unchanged; tunnels and access points have their own edit-target rows (§7.1). **Stage 2:** the
underground pseudo-district opens as a `refine` close-up through II.1's `NeighbourhoodRequest` with `layer: 'underground'`
— no portals, the tunnels its ways, no `replace` fabric.

**Emulation note (item 23).** Neither MFCG nor FTG has sewers or an underground; the whole layer is our extension, staged
by the owner, hidden by default, and with `undergroundShare` 0 and the layer hidden a CITY reads exactly as the references'
city. Nothing stands in a village's way: the village rows carry `never` (PART III).

### II.7.4 The hook interfaces and the base's part

```ts
interface SewerExistenceRow { existence: 'never'|'law'|'always'; law?: { base: number; populationWeight: number; wealthWeight: number; cap: number } }   // RungProfile.layers.sewers (§1.1); II.7.1's law
interface Features { sewers: boolean /* resolved at S0 from the request and the rung row; re-derived on replay (§2.9); read by every dependant */ }
interface TunnelProfileRow { kind: Tunnel['kind']; preset: 'historical'|'navigable'; widthCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; headroomCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; wallCm: Cm;
  coverCm: Cm; minGradient: number; navigableMinWidthCm: Cm; navigableMinHeadroomCm: Cm }   // II.7.2's table; the kernel reads widthCm ÷ 2 + wallCm as the corridor half-width (§3.7)
interface AccessPoint { id: Id; kind: 'stair'|'shaft'|'well'|'cellar_stair'|'grating'; role: 'access'|'air'|'light';
  ground: { at: PointCm /* moves with its host face under a warp (§7.4) */; host: Id /* the corridor, square, yard or building it opens in */ }; under: { tunnel: Id; at: VertexRef /* ('access', id) on the tunnel's kerb */ }; lifecycle: Lifecycle }   // §2.7's registry; II.7.3
interface UndergroundRule { undergroundShare: Record<Rung, number>; undergroundOffset: number; depthScale: number; vacancyRunShare: number; minRunM: number; floorAboveInvertCm: Cm; vaultAllowanceCm: Cm; depthBandCm: Cm;
  shaftSpacingM: Record<'historical'|'navigable', number>; excluded: ('water'|'damp'|'flood'|'wall_strip'|'tower'|'gatehouse'|'castle'|'precinct_main'|'footprint')[];
  connection: { reachM: Record<'historical'|'navigable', number>; pitShareByBand: Record<'historical'|'navigable', Record<string, number>> } }   // II.7.1's and II.7.3's tables as one editable rule record (§7.6)
interface UndergroundStrategy { derive(doc: Document, tunnels: Tunnel[], allocation: Allocation /* the underground pseudo-district's, S7b (6) */, rules: UndergroundRule, ctx: StageContext, k: Kernel):
  KernelResult<{ blocks: Block[]; plots: Plot[]; buildings: Building[]; access: AccessPoint[] }> }
// a Stage registered after the network stage by declared I/O: inputs under.tunnels, the ground plat (read), the fields, the underground Allocation; outputs under.blocks, under.plots, under.buildings, under.access;
// runs S9 → S10 → S10b → S11 on the underground arena with the underground context; the StrategyRegistry's `underground` map (§14)
```

**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and
`Features.sewers` with S0's draw; the underground `LayerSpec` hidden by default; the class table's `drain`, `underground`
and `undergroundAccess` columns; `Tunnel.navigable`, `Tunnel.headroomCm` and the profile table with its wall thickness;
the `AccessPoint` record; `ContextVector.arena`; the underground rows of the granularity and site-plan tables; the
`UndergroundStrategy` registration slot; the U1–U3 invariants, F-UNDER's ladder row and §13.2's hook tests. Staged by
the owner's roadmap and not built here: the two stages themselves.

=== APPEND TO SECTION ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===

**Where the rest of the sewer layer is stated (items 12 and 14).** Existence by tier and the toggle-as-visibility rule, the
`drain` connection rule, the network stage's gate, its levels on the underground arena, the tunnel profile with its wall
thickness, depth and outfalls, and the underground neighbourhoods along navigable tunnels are II.7's; this section keeps
the islands, the network stage's declaration, its rule families and presets, and the underground's lifecycle.

=== APPEND TO SECTION ## II.1 The district → neighbourhood interface ===

**The underground close-up (II.7.3).** `NeighbourhoodRequest.layer` also admits `'underground'`: the underground
pseudo-district opened as a `refine` close-up — `key` the underground arena's `PlatKey`, no portals and no roads in or out,
its tunnels the ways its plots front, no `replace` fabric.

=== APPEND TO SECTION # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===

**No sewers below TOWN (item 14; II.7.1).** The village rung rows carry `layers.sewers.existence = 'never'`: a village
registers neither the network stage nor the underground stage, a request's `toggles.sewers` is reported as not applicable
in `requestedVsBuilt`, and its drainage is gutters and pits — the class table's `drain` column is read by nothing there.
Nothing in II.7 stands in a village's way: every hook is a rung row or a field it leaves empty.

=== APPEND TO SECTION ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===

**S0's sewer feature (item 14; II.7.1).** `toggles.sewers ∈ { auto, on, off }` joins the blueprint's toggles: at TOWN an
`auto` is resolved by the feature table's P(sewers) row — II.7.1's law of the request's population and the intent's
`wealthLevel` — drawn from `blueprint.features` with the other auto features and recorded in `autoResolved`; at CITY and
METROPOLIS the rung row fixes existence on, and a requested `off` hides the underground layer instead, reported in
`requestedVsBuilt` (II.7.1). The resolved value is `Features.sewers`, which every dependant reads from the model (II.7).

=== APPEND TO SECTION ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===

6. **The underground pseudo-district (owner-staged; item 12, II.7.3).** When `Features.sewers` is on and the preset yields
   navigable mains, S7b creates the underground pseudo-district's `Allocation` after (5) and before (1) — the poorest band's
   `undergroundShare`, the classes whose row is `underground: 'preferred'` and, in an epoch, the crowding hook — capped by
   the predicted navigable capacity; the rows, the law and the cap are II.7.3's; the ground's districts receive the
   remainder as they do for the sky.

=== APPEND TO SECTION ### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer) ===

The owner-staged layers register the same way — `SkyStrategy` after S7b, `SewerStrategy` after S11 and `UndergroundStrategy`
after the network stage, each by declared I/O (II.6, II.7) — and the base registers none of them.

=== APPEND TO SECTION ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===

**The `drain`, `underground` and `undergroundAccess` columns (II.7).** `BuildingClassRow` carries `drain: 'none'|'pit'|'channel'`
— the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most workplaces: a cess pit or the
street gutter of their own), `channel` (the trades and institutions that discharge foul water: tanners, dyers, fullers,
brewers, slaughterhouses, baths, hospitals, monasteries) — `underground: 'never'|'allowed'|'preferred'` (which classes an
underground neighbourhood may or prefers to hold) and `undergroundAccess: boolean` (whether a surface building of the
class may hold a cellar stair to a tunnel). Which plots a network connects, what a class does when none exists, and how
the underground rows are used are II.7.1's and II.7.3's rules; the columns are data like every other, our own rows.

=== J-ROWS ===
| J-A14.41 | the sewer existence draw is S0's, from the request's population and the intent's wealth level | §4.2, II.7 |
| J-A14.42 | one Sewers control: a model feature at TOWN, visibility at CITY and METROPOLIS; the layer hidden by default | II.7, §7.8, §8.4 |
| J-A14.43 | the `historical` network is realism; `navigable` is D-3's fantasy toggle; navigability derived per tunnel from bore and headroom | II.7, D-3 |
| J-A14.44 | only the drain connection rule and the underground neighbourhoods depend on the network; siting and yards unchanged | II.7, §10.2 |
| J-A12.41 | the underground is cut by the ground's own S9–S11 on `corridorUnion`'s kerb; no dedicated cutter | II.7, §4.7 |
| J-A12.42 | no underground frontage room under any surface footprint; a room under a building is its basement; a cellar stair is an access record | II.7, §2.6 |
| J-A12.43 | the surface constraint is a sampled `pointLocate` ladder (F-UNDER), never copied ground geometry | II.7, §5.2 |
| J-A12.44 | occupants by an eager S7b pseudo-district allocation from a predicted navigable capacity, on the shifted ground field | II.7, §4.5 |
| J-A12.45 | one underground arena; depth per entity as `elevationCm`, drawn and exported by depth band | II.7, §8.4, §11.1 |
| J-A12.46 | the underground stage runs eagerly after the pool's merge, scoped per tunnel run by declared spatial reads | II.7, §7.3, §4.1 |

=== RATIONALE-A ===
| J-A14.41 | Chose to draw a TOWN's sewer existence at S0, as one of the feature table's auto features from `blueprint.features`, reading the request's population and the intent's `wealthLevel`, over drawing it after S6's first field pass from the prosperity field's mean, because existence is structural and "Enter" must vary it with the other structural features as MFCG's master switch does, because the field's town-wide level is itself set from `wealthLevel` by §7.7's expansion so nothing is gained by waiting, and because a field brush must never flip whether a town has sewers (II.7.1, §4.2 S0). |
| J-A14.42 | Chose one *Sewers* control with two meanings by rung — a model feature (`auto` / `on` / `off`) at TOWN whose re-derivation is confined to the underground arena, and a view control (`LayerSpec.visible`) at CITY and METROPOLIS where existence is fixed on and a requested `off` hides the layer and is reported — with the layer hidden by default at every rung, over two controls or a model toggle everywhere, because the owner ruled that in cities the toggle only decides whether the network is shown, and because the default picture must be MFCG's and FTG's, which draw no sewers (II.7.1, §7.8, §8.4). |
| J-A14.43 | Chose to read D-3 as follows: the `historical` network is realism and is present wherever the tier row says so, never a fantasy toggle; the `navigable` preset (vaulted walkable mains) is D-3's fantasy sewer, off by default; and `navigable` is a per-tunnel property derived from bore and headroom against table thresholds, so a large trunk main of a historical big city can be navigable while the preset as a whole yields few or no underground quarters, over treating every sewer as fantasy or the preset as the only source of navigability, because the owner's words make sewers a necessity of cities and make navigable tunnels — "the fantasy sewer preset and large trunk sewers" — the only carriers of underground neighbourhoods (II.7.2, D-3). |
| J-A14.44 | Chose to let exactly two plot rules depend on the network — the `drain` connection rule (a one-way `Tunnel.serves` link read back through a resolved view, no ground record changed, no cess-pit geometry) and the underground neighbourhoods — over letting S10b's siting or S11's yards read it, because neither reference models drainage and emulation-first (item 23) keeps the ground's map the references' map whether or not a network exists (II.7.1, §10.2). |
| J-A12.41 | Chose to cut the underground with the ground's own machinery — `corridorUnion` on `tunnel` chains giving the external wall as the kerb (the kernel's J-A12.31), S10's frontage-first cut with per-frontage regions, S10b's scorer and S11's row boolean — with the owner's three rules as invariants (frontage rows on one navigable tunnel and access rows inside them; `tunnel` chains only, no alley; footprint = plot ∩ the frontage band), over a dedicated underground cutter, because the ground already guarantees each rule by construction: a region belongs to one frontage run so no plot reaches a second tunnel, and the row boolean puts the room's wall on the tunnel's wall (II.7.3, §4.7). |
| J-A12.42 | Chose that no underground frontage room lies under any surface footprint — a room under a building is that building's basement (item 29), a ground record that never opens onto a tunnel — and that a `cellar_stair` is an `AccessPoint` link record and not a joined room, over the drafted "under a surface building only as its cellar or undercroft", because item 29's "a cellar never joins a sewer" and item 12 (c) can both hold only if the basement stays the building's own room and the tunnel connection is a stair record; the surface's public ground, yards, greens and residue remain the underground's ground (II.7.3, §2.6). |
| J-A12.43 | Chose to apply the surface constraints as a bounded depth ladder of `pointLocate` reads on the ground's `PlatKey` — a plot's vertices, frontage midpoint and a 1 m sample of its rear line, stepping the depth down to the band's lower end, the class minimum and then a vacant run (F-UNDER) — over clipping the underground regions against the ground faces' rings, because §2.2 rule 1 forbids cross-arena writes and copied geometry, and a rear line a metre short of the house above is invisible underground (II.7.3, §5.2). |
| J-A12.44 | Chose to decide the underground's occupants eagerly at S7b as a pseudo-district allocation — the poorest band's `undergroundShare`, the `underground: 'preferred'` classes and, at an epoch, a share of the ground's shortfall — capped by a navigable capacity predicted from the arterials and main roads the mains follow, on the ground's prosperity field shifted by a table offset and banded by the town's own cuts, over a separate underground field or a fill after the network is built, because §4.1's laziness contract puts every content decision in the eager town-wide allocation, and the owner's "same rule tables and prosperity field" is met by shifting the one field rather than inventing another; the prediction's miss is absorbed by the reconcile and reported, never re-rolled (II.7.3, §4.5). |
| J-A12.45 | Chose one underground arena with depth per entity (`elevationCm` = `baseCm` below the datum) and drawing and export by depth band, over one arena per depth level, because tunnels at different depths must keep one topology at their junctions and §2.2's arena-per-layer rule already gives the underground exactly one `PlatKey`; a building is still drawn and exported on its own level through the band (II.7.3, §8.4, §11.1). |
| J-A12.46 | Chose to run the underground stage eagerly on the generation worker after the derivation pool's merge, scoped per tunnel run by its declared spatial reads (each underground block records the ground cells over it), over running it in the pool per district or lazily, because it reads every district's committed plots and footprints and writes a different arena, so it is neither a per-district pure function nor a writer inside a district's faces, and declared reads let an edit above re-derive only the blocks beneath (II.7.3, §4.1, §7.3). |
=== END ===
