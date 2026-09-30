## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

*In plain words.* The owner stages both layers as toggles after the city is mastered. Nothing here is built in the base, but
every record and interface they need exists now, so adding them later is a registration, not a redesign.

**Floating islands (AM-2; DEF-7).** The toggle creates 1–3 islands. **Why an island exists** is one of two reasons, by rule
or by assignment: `prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods: by rule, when
the toggle is on, S7b allocates the roster's richest demand for up to three districts' worth of households to sky
pseudo-districts instead of the ground, so the population stays whole (§4.5 S7b (5)); `institution` — the island carries one
unique institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's
routine (an outline template of §4.2 S1 (2)), an elevation from a band row, and optionally its own terrain from S1 run on
the sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's bearing
and width law; its districts are laid by the ordinary pipeline through a `NeighbourhoodRequest` with `layer: 'sky'` (no
portals, no roads in or out; II.1 (5)). **Where it floats:** a placement rule reads the ground plan — over water, fields or
outskirts by default, over the built core only by assignment (`SkyIsland.placement`, §2.7); the occlusion mode (opaque,
ghost the covered ground, offset view) is a rendering choice (§8.4). **What it does not do:** it has no relation to the
underground layer; its shadow falls on the ground through the shadow pass; it exports as its own layer (§11). Hook interface:

```ts
interface IslandRule { reason: 'prosperity'|'institution'; maxIslands: 1|2|3; elevationCmBand: [Cm, Cm]; areaHaBand: [number, number]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own' }
interface SkyStrategy { place(doc: Document, rules: IslandRule[], allocations: Allocation[] /* S7b's sky pseudo-district allocations */, ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }
// a Stage registered after S7b by declared I/O: inputs S7b's sky allocations and the ground plan; outputs the islands (outline sized to each
// allocation's area, placement by rule), their arenas and their districts, which run the ordinary pipeline through a NeighbourhoodRequest
```

**Sewers (DEF-7).** A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage
raster and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
`Tunnel` records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }
```
