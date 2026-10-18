## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

*In plain words.* The owner stages both layers after the city is mastered; whether a layer exists is a model rule (the
island rule below; II.7.1's tier row), and its layer toggle shows it. Nothing here is built in the base, but every record and
interface they need exists now, so adding them later is a registration, not a redesign. The sky layer at build depth is V05's.

**Floating islands (AM-2; DEF-7).** A settlement has 0–3 islands by the island rule below — with the model setting on, the
rung, the count slots and the supply decide them, and the view toggle only shows them. **Why an island exists**
(`SkyIsland.reason`, §2.7) is one of two reasons, by rule or by assignment: `prosperity` — the island carries a very
prosperous neighbourhood or set of neighbourhoods: by rule — where the model setting `recipe.layers.islands` is on, the rung
admits islands and a count slot opens ((1)–(4) below) — S7b (5) allocates the roster's richest demand to that slot's sky
pseudo-district under the supply law (5), so the population stays whole; `institution` — the island carries one unique
institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's routine
(an outline template of §4.2 S1 (2)), an altitude from the supply law (5), and optionally its own terrain from S1 run on the
sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's bearing and
width law; its districts are laid by V01's unit run through a `NeighbourhoodRequest` with `layer: 'sky'` (no portals, no
roads in or out; II.1 (5)). **Where it floats:** a placement rule reads the ground plan — over water, fields or outskirts by
default, over the built core only by assignment (`SkyIsland.placement`, §2.7); the occlusion mode (opaque, ghost the covered
ground, offset view) is a rendering choice (§8.4). **What it does not do:** it has no relation to the underground layer; it
exports as its own layer (§11); item 111's oasis, water pull and climate cell do not apply on it (its water stays V05's).
**Its light, shadow and shade (items 68, 102).** In §8.4's lighting model an island casts shadow from above — an occluder
slab with a top and an underside, so its shadow falls from its underside onto whatever lies below and the ground under it is
shaded from above yet lit from the side; its **shade strip** — the ground its shadow sweeps across the model sampler's day —
enters §4.5's daylight term in field pass 2 only (V05 §3.19; item 102 (c)), after the island supply law has read the field;
its magical lights are the sky rows of §4.7's light table, scaled by the island's carried supply `h(S_carried)` — magic is the
resource that keeps it aloft, so a waning island's lights fade with it.

**Sewers (DEF-7).** A `SewerStrategy` registers as a tail stage after S11 (declared inputs — the one list II.7.2 cites:
`Features.sewers`, the ways with `flowToward` (§2.4), `Terrain.hydro` and `outfalls` (§2.3), the plots and buildings with their
class table's `drain` column, the underground plat; outputs: the sewer system with its `Tunnel`, `Junction` and `AccessPoint`
records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy {
  derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel):
    KernelResult<{ system: UndergroundSystem; tunnels: Tunnel[]; junctions: Junction[]; access: AccessPoint[] }>;
  extend(doc: Document, epoch: number, ctx: StageContext, k: Kernel): KernelResult<{ tunnels: Tunnel[]; junctions: Junction[]; access: AccessPoint[]; reopened: Id[] }> /* an epoch's growth (§4.11 (6)): closed runs on its paths reopened first */ }
```

**The island rule — existence, count and the supply law (owner: "Floating islands are also a product of prosperity … magic
… a resource that needs to constantly be supplied"; "limited only to cities and metropolises"; "not all cities or
Metropolis have floating islands"; AM-10, AM-13, AM-15).** One rule decides whether a settlement has islands, how many and
how large; the toggle only shows them. Its rows interpolate along the prosperity value as coverage, plot granularity and
greenery do (§4.9), keyed by absolute values rather than bands — a town-wide supply must compare towns, which the per-town
cuts cannot (V05 §3.3).
1. **Two settings, not one.** `recipe.layers.islands ∈ {'off', 'on'}` is a MODEL setting — off by default, the named fantasy
   toggle of D-3, so the realism base has no island and its ground model is byte-identical to the realism golden; changing it
   is an `adjust` of the recipe that re-derives from S7b (§7.6, §7.7; its control row is §7.8's). The sky layer's
   `LayerSpec.visible` (§8.4) is the VIEW toggle the owner speaks of: it shows the islands a settlement has and creates none;
   a hidden island still exists and still carries its households, and hiding or showing the layer leaves the model digest
   unchanged (J-A15.41).
2. **The gate — rung.** Islands are possible only where the rung's row allows them: `RungProfile.layers.islands` (§1.1) is
   `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS. The rung is the one the
   request's population chooses at generation and, in an epoch, the one the epoch's population target chooses (§4.11), so a
   settlement that falls below the CITY band (to TOWN or a village rung) can no longer sustain islands and one that enters it
   may gain them (J-A13.41).
3. **The supply** (definition and calibration V05 §3.3). Magic is a supplied resource, so an island's existence and size are
   functions of two supplies on the field's absolute value (§4.5): `townSupply`, `h(S_town)` of the area-weighted mean of the
   prosperity value over the settlement's built land (one scalar per town, recomputed per epoch), and `carriedSupply`,
   `h(S_carried)` of the band values of the households the island carries (S7b (5) fills it from the richest band down, so
   `S_carried` is high where the town has a rich band and modest where it has none) — value-keyed rows, 0 up to the rule's
   threshold and rising to 1. No island exists where `h(S_town) = 0`, the owner's "if there is no prosperity, there is no
   floating islands", and none is carried where `h(S_carried) = 0`. A dossier whose `site.deposits` lists a `magical_node` in
   state `available` (or `discovered`, from the next epoch) raises `h(S_town)` by the rule's `node.bonus` (0.25, clamped to
   1) wherever it is above 0 — never from 0, so the owner's rule stands (V05 §3.3; the deposit mapped by V08 §2.6's deposits
   row). An `institution` island reads the same gate: it exists only where `h(S_town) > 0`, its `S_carried` being its
   institution's requirement (J-A10.41).
4. **The count** (V05 §3.2). How many islands the settlement has, 0–3, is drawn once per town on the `island.place` stream
   (§6.1), before any allocation, from three ordered **slots** (each island's `SkyIsland.slot`, §2.7; a requested or edited count is `recipe.params['islands.count']`, V05 §3.2): slot k opens with
   probability `chance_k · h(S_town)` and only if slot k − 1 opened (defaults 0.6, 0.5 and 0.35), so a poor city has none, a
   rich one may have none or several, and the count depends on the seed and on prosperity, never on the toggle (J-A15.42). A
   slot holding a supplied island is never redrawn (V05 §3.15); an epoch re-draws each other slot with the epoch component at
   the per-year rate `redrawPerYear` (default 0.1, our own) converted to the epoch's span as 1 − (1 − `redrawPerYear`)^years,
   the power by `dmath.pow` (§6.5 (3); §4.11's per-year rule; J-A67.40), so a weekly epoch re-decides a slot no more often per
   year than a decade-long one: a slot that opens raises a new island only where the supply admits one (`raiseIsland`), and a
   slot that closes is read by the decline ladder, never as an instant removal.
5. **Size and altitude** (V05 §3.4–§3.7). For an open slot the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) ·
   h(S_town)` and the altitude `elevationCm = E_min + (E_max − E_min) · h(S_town)` — area from both supplies, altitude from the
   city's alone: a rich neighbourhood in a poor city floats low and small, a rich one in a rich city high and large
   (J-A10.43). S7b (5) fills the island's allocation from the richest band down until the plot land of `A` (× V01's
   `plotShare`, §4.5 S7b (5)) is used or three districts' worth of households are allocated, recomputing `S_carried` and `A`
   as it adds — `A` falls as poorer households join, so the fill converges — and makes no allocation for a slot whose `A` is
   0. `SkyStrategy` then sizes each outline to its allocation's area and floats it at its altitude.
6. **Over epochs** (§4.11; V05 §3.15): the supply is re-evaluated each epoch; an island whose `A` shrinks by more than the
   hysteresis (0.05 of its area) is resized, one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls, and
   regrowth re-floats a settled island before raising a new one (J-A10.42). An island's lifecycle state is `SkyIsland.state`
   (§2.7).
7. **Editable** (V05 §4.2). The count (`recipe.params['islands.count']`), each island's slot, area, altitude and state are
   attributes under `setAttr` and `lock` (§7.1, §7.2) — a locked slot is neither opened nor closed by a re-draw; the island conversions of
   §4.11's `DeclineOp` are `convert` events a user may apply by hand; every draw is on `island.place`, so an edited island
   survives regeneration by §6.3's rules.
8. **Emulation note.** No reference has islands: the rule is our extension, and with the model setting off nothing of it
   runs.

```ts
// IslandRule (one row per rung that admits islands; read by S7b (5) and SkyStrategy; a rule table, §7.6) is V05 §2.4's, with CarryRule,
// IslandInstitution (the unique-institution rows a slot may carry, their hand-over class) and SkyAccessRow; its node.bonus is (3)'s.
interface SkyStrategy { place(doc: Document, rule: IslandRule, allocations: Allocation[] /* S7b (5)'s sky allocations: the open slots with A > 0, each with its supported area and altitude */, ctx: StageContext, k: Kernel):
  KernelResult<{ islands: SkyIsland[]; unitInputs: SkyUnitInput[] /* V05 §2.3: each island's inputs to V01's unit run */; groundClaims: Id[] }> }
// SKY (§4.1): a Stage registered after S7b by declared I/O; inputs the sky allocations and the ground plan; outputs the islands (outline sized to the
// allocation's area, placement by rule), their arenas and, through the unit run, their districts; its ground outputs under reservations.landing and allocations.landing
```

**The underground fades like the walls (owner: "Sewer systems and the underground like the walls fade slowly, rather some
tunnels simply cave in or become decommissioned rather than intentionally taken down by populations"; AM-11).** A tunnel's
lifecycle is a ladder like a wall's, moved only by §4.11's underground fade at the underground's persistence rate — after
streets and walls, before terrain and water: the slowest fabric but the ground itself (J-A11.42) — and by hand: in use →
neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined`, with
`Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7); the conversions `silt`, `caveIn` and `seal` act on one tunnel record —
`DeclineOp`'s `element` names it (§4.11; an older `convert` event's `tunnel` field reads as `element`, §7.5) — and `reopen`
undoes them. A conversion given a `stretch` first widens it, at both ends, out to the first centreline vertex at or beyond
that end whose station no underground plot's frontage straddles on either side of the tunnel (a plot's frontage read as the
interval of centreline stations its frontage edges project onto) — a vertex where the frontages break on both sides, a
junction or the tunnel's end — so that no plot fronts two records (U1, II.7.3), the widening shown by the dry run and
reported with the event's fates; it then splits the tunnel at the stretch's two ends, handing the stretch (and, for an
interior stretch, the part beyond it) to new `Tunnel` records by `retypeEdges`' `rekey` on their `StretchRef`s (§3.4), as a
cut way hands its far part to a new way (§4.11's carve), so that the stretch changes condition alone: each part keyed by
§6.3's SPLIT rule for a tunnel record, each keeping the record's attributes on its own stretch (its invert knots, the outfall
at its end, the plots and buildings whose connections meet it, its chambers (`Tunnel.chambers`) and the access points whose
vertex lies on it (`AccessPoint.under.element`, II.7.4)), the `Frontage` records of the underground blocks along it (§2.5)
split wherever one spans a stretch end, all in the one step that splits the tunnel (a record spanning both ends of an
interior stretch in three parts) — each part beyond an end a new record, its kerb edges' `('frontage', id)` rows moved to it
by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, every part keyed by §6.3's rule for a split `Frontage` — and
each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one tunnel record and each split `Frontage`'s
one record (§7.4; J-A11.43). Each run the condition table names, and the tunnel run of II.7.3's frontage and lifecycle
rules, is one `Tunnel` record. **The condition table** — the one statement of a tunnel's condition, which §2.7's `Tunnel`,
§2.8's decline hooks and II.7.3 read:

| condition | `existence` (§2.8) | `Tunnel.closure` | `open` — may carry frontage plots (II.7.3) | reached by |
|---|---|---|---|---|
| in use | `generated`, `built`, `altered` or `converted` | — | yes | generation or a drawn tunnel; `reopen` from any other condition |
| neglected, silted | `abandoned` | — | yes | `silt` on a run in use |
| partly caved in | `decayed` | — | no | `caveIn` on a run in use or neglected |
| collapsed | `ruined` | `collapsed` | no | `caveIn` on a partly caved-in run |
| sealed (decommissioned) | `ruined` | `sealed` | no | `seal` on a run in any other condition |
| flooded — galleries and chambers of II.7.5 and II.7.6 only (item 65) | `ruined` | `flooded` | no | `flood` on an element whose floor lies below the water table (§2.6's gate values) |

The condition is this reading of `existence` and `closure`, never a second stored state (J-A11.21): it changes only by these
conversions — a hand change of a tunnel's condition is the matching `convert` event (§7.1) — and its `open` column is what
II.7.3's frontage rule and its lifecycle read. **The same table serves the whole layer (items 64 and 65).** Every gallery and
chamber of the underground layer's other systems (II.7.6) and of the undercity (II.7.5) takes this ladder, these conversions
and this table (`Gallery.closure` and `Chamber.closure`, §2.7), the `flooded` row theirs alone — reached by `DeclineOp`'s
`flood` on the element (§4.11; J-A65.48) — and undone by `reopen` as the others are, and a chamber closes its plots as a
tunnel run closes its frontage plots (II.7.5). An **access point's state follows its element** (item 64): it reads
`collapsed` while the element it reaches is partly caved in or collapsed and `bricked` while that element is sealed —
derived readings, never stored by the conversion, so a `reopen` gives back the access's own stored state (`open`, `locked`
or `bricked`, II.7.4); a link of the connection graph (II.7.6) reads `collapsed` or `flooded` by the same rule. No epoch rule
ever demolishes a tunnel: the engine's plan may not contain `demolish` on a tunnel record (a hook test lints it), while a
user's `delete` stays available, because everything is editable (J-A11.41). A closed tunnel persists as an underground ruin
— its record live at its address, its centreline and invert kept, drawn by §8.2's silted, caved-in and sealed classes
through the underground layer's cut-away (§8.4) — and later growth reopens it (`reopen`; regrowth-first: a closed tunnel on
the network's line is reopened before a new one is dug, in a history replay as in a live epoch, item 113 (d)) or reuses it:
AM-12's underground plots front a reopened tunnel as they front any navigable one. Decline follows the surface's drivers and
lag: a tunnel's exposure is the exposure of the ground it runs under, and its dwell bands are two steps slower than a
building's (§4.11's table). Emulation note: no reference has sewers or time; with the network absent nothing of it runs.

**Where the rest of the sewer layer is stated (items 12, 14, 64 and 65).** Existence by tier and the toggle-as-visibility
rule, the `drain` connection rule, the network stage's gate, its levels on the underground arena, the tunnel profile with its
wall thickness, depth and outfalls, the underground neighbourhoods along navigable tunnels and the basement accesses are
II.7.1–II.7.4's; the undercity is II.7.5's; the underground layer's other systems, their depths, the connection graph and the
pieces an access edit generates are II.7.6's; this section keeps the islands, the network stage's declaration, its rule
families and presets, and the lifecycle of every underground element.
