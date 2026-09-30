# blocks-pipeline-evolution-islands — lane amendments-b/amend-pipeline-evolution-islands (PIPELINE part; seat pipeline-evolution-islands; items 8, 10, 11, 13, 15)
#
# Blocks only, per the BLOCK PROTOCOL of workflows/09-amendments-b.js. Every block is ADDITIVE (APPEND TO SECTION):
# §4.11 is co-homed with the seats pipeline-assignments (item 17) and pipeline-prosperity-change-dossier-plan (items 25, 31),
# II.6 with pipeline-sewers (items 12, 14), §4.5 / §4.7 / §4.9 / §10.2 belong to other seats' home items, and PART III is
# shared with pipeline-sewers — so no REPLACE is written here. The stale sentences these items retire (route.md, "Stale
# text …") are listed with their replacement text in amend-pipeline-evolution-islands.md §8 for the seats that own them.
# Judgment ids use the pipeline suffix range .41–.49 (the kernel seat used .31–), so no two seats mint one id.

=== APPEND TO SECTION ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is
growth read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the
fabric the suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic
— until regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base
carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag
rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each
applicable by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3
holds the identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`:
  roofless, `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared
  (`cleared`: a footprint trace, its material in the ledger) → reused (`reused`: a garden, orchard or field laid over the
  trace, which persists beneath it as the old foundations, or a successor building raised on those foundations, which
  takes the trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth
  uses them first. *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled (`decayed`; the gap
  a `StretchRef`) → superseded by a shorter inner ring: `contractWall` traces and builds the new ring inside the old one
  through S5a's trace step and S7's operator, the old ring's record stays live with `Enceinte.supersededBy` naming the new
  one and its line persists as a trace — or becomes the ring road of the owner's original case by `wallToWay`. *Tunnels*
  (II.6): in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
  `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning → settled → fallen. *Plots:* a
  plot whose last building is cleared or reused merges into a garden, orchard or field (`plotToGarden`) or into its
  occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside them and the plan coarsens
  where people are few — fewer, larger plots from loss, through the same merge operator as from wealth. Fields are their
  own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest farmstead or to the
  commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our
  own rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street and wall lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix is selected in reverse ordinal order and its uses leave (`vacate`); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run, weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
  computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity field with its chance share;
  `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the entity's lineage and the
  epoch (§6.1; no new concern); the draw bounded by the Survivors rule's churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last,
  and a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger`
  (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a
  repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a
  flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45).
  Its mark on the map: the lottery's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul
  radius — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside
  active building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or
  ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall vacates
  at once and the standing stock decays by the dwell bands over later epochs; a rise is met in the epoch it arrives by
  the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself: plot lines, street
  lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path.** In `grow-by-stage` (above) S2's delta demand is placed in this order,
  and only the residual grows a stage: (1) vacant buildings reoccupied (`reoccupy`); (2) derelict ones repaired
  (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations (`rebuild`, `reuse …
  build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the share; the design's own
  runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along its street lines inside
  the last boundary; (6) new faces of a new stage — S5a grows the boundary for the residual only, and an epoch whose
  residual is ≤ 0 grows no stage and adds no face. S7b allocates the delta first to (1)–(5) as each district's old-plan
  capacity and only the remainder to new faces; this replaces the rule that an epoch placed delta demand only on new or
  transformed plots (J-A8.44). **Test (M4; §13.2):** a town with 12 % of its buildings vacated, derelict or cleared by
  hand, grown by +6 % population, adds 0 new faces and refills ≥ 95 % of the delta inside the old plan, every
  vacancy-run share unchanged.
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market,
  harbour and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the
  density field falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's
  amalgamations are its footprint on the plan.
* **Islands and the underground over epochs** (their laws are II.6's). Each epoch re-reads the rung from its population
  target (§1.1) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
  (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply falls to zero — or whose
  settlement has left the CITY band (AM-13) — wanes, settles after its dwell band and falls: `fallIsland` archives its
  arena and lays a `ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's
  clear-region protocol above, every entity under it demolished with that cause; regrowth re-floats a settled island
  before it raises a new one (J-A10.42). A tunnel silts, caves in and is sealed by the same lottery at the underground's
  rate, is never demolished by the engine (J-A11.41), and is reopened before a new one is dug.
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address
  and lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: a yard part of the plot over the persisting trace, or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen'; tunnel: Id; stretch?: StretchRef }       // the underground's ladder (II.6); no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; elevationCm: Cm }                    // the supply law's response: the outline re-drawn by §4.2's routine from the island's own stream; rim plots cleared, or new rim faces grown by the grow path on the island's arena
  | { op: 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }                    // waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, a ruin face on the ground); a settled island re-floats first
  | { op: 'raiseIsland'; allocation: Id };                                                 // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6)
```

=== APPEND TO SECTION ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===

**The island rule — existence, count and the supply law (owner: "Floating islands are also a product of prosperity …
magic … a resource that needs to constantly be supplied"; "limited only to cities and metropolises"; "not all cities or
Metropolis have floating islands"; AM-10, AM-13, AM-15).** One rule decides whether a settlement has islands, how many and
how large; the toggle only shows them. Its rows are band rows of the family that coverage, plot granularity and greenery
belong to (§4.7, §4.9): they interpolate along the prosperity value and read the same field (§4.5).
1. **Two settings, not one.** `recipe.layers.islands ∈ {'off', 'on'}` is a MODEL setting — off by default, the named
   fantasy toggle of D-3, so the realism base has no island and its ground model is byte-identical to the realism
   golden; changing it is an `adjust` of the recipe that re-derives from S7b (§7.6, §7.7; its control row is §7.8's).
   The sky layer's `LayerSpec.visible` (§8.4) is the VIEW toggle the owner speaks of: it shows the islands a settlement
   has and creates none; a hidden island still exists and still carries its households, and hiding or showing the
   layer leaves the model digest unchanged (J-A15.41).
2. **The gate — rung.** Islands are possible only where the rung's row allows them: `RungProfile.layers.islands` (§1.1)
   is `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS. The rung is the one the
   request's population chooses at generation and, in an epoch, the one the epoch's population target chooses (§4.11),
   so a settlement that leaves the CITY band can no longer sustain islands and one that enters it may gain them
   (J-A13.41).
3. **The supply.** Magic is a supplied resource, so an island's existence and size are functions of two prosperity values
   read from §4.5's field: `S_town`, the area-weighted mean of the prosperity value over the settlement's built land (one
   scalar per town, recomputed per epoch), and `S_carried`, the mean band value of the households the island carries
   (S7b (5) fills it from the richest band down, so `S_carried` is high where the town has a rich band and modest where it
   has none). The supply function `h(v)` is a band row per rung interpolated along the value: 0 up to the threshold τ —
   the lower cut that the town's own `FieldBands` record for the `thresholdCut` band, the prosperous band by default —
   rising to 1 at the rich band's top. No island exists where `h(S_town) = 0`, the owner's "if there is no prosperity, there is
   no floating islands", and none is carried where `h(S_carried) = 0`. An `institution` island reads the same gate: it
   exists only where `h(S_town) > 0`, its `S_carried` being its institution's requirement band (J-A10.41).
4. **The count.** How many islands the settlement has, 0–3, is drawn once per town on the `island.place` stream (§6.1),
   before any allocation, from three ordered slots: slot k opens with probability `chance_k · h(S_town)` and only if slot
   k − 1 opened (defaults 0.6 for the first slot, 0.5 for the second and 0.35 for the third), so a poor city has none, a
   rich one may have none or several, and the count depends on the seed and on prosperity, never on the toggle
   (J-A15.42). An epoch re-draws the slots
   with the epoch component: a slot that opens raises a new island only where the supply admits one (§4.11's
   `raiseIsland`), and a slot that closes is read by the decline ladder, never as an instant removal.
5. **Size and altitude.** For an open slot the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) · h(S_town)` and the
   altitude `elevationCm = E_min + (E_max − E_min) · h(S_town)` — area from both prosperities, altitude from the city's
   alone: a rich neighbourhood in a poor city floats low and small, a rich one in a rich city high and large (J-A10.43).
   S7b (5) fills the island's allocation from the richest band down until the plot land of `A` (× the dense core's plot
   share, §4.2 S2) is used or three districts' worth of households are allocated, recomputing `S_carried` and `A` as it
   adds — `A` falls as poorer households join, so the fill converges — and makes no allocation for a slot whose `A` is 0.
   `SkyStrategy` then sizes each outline to its allocation's area and floats it at its altitude (below).
6. **Over epochs** (§4.11): the supply is re-evaluated each epoch; an island whose `A` shrinks by more than the
   hysteresis (0.05 of its area) is resized, one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls,
   and regrowth re-floats a settled island before raising a new one — the program's proposed response, adopted as
   conversion kinds and vetoable (J-A10.42). An island's lifecycle state is `SkyIsland.state` (§2.7).
7. **Editable.** The count, each island's area and altitude and its state are attributes under `setAttr` and `lock`
   (§7.1, §7.2); `resizeIsland`, `settleIsland`, `fallIsland`, `refloatIsland` and `raiseIsland` are `convert` events a
   user may apply by hand; every draw is on `island.place`, so an edited island survives regeneration by §6.3's rules.
8. **Emulation note.** No reference has islands: the rule is our extension, and with the model setting off nothing of it
   runs.

```ts
interface IslandRule {                      // one row per rung that admits islands; read by S7b (5) and by SkyStrategy; a rule table (§7.6)
  rung: 'CITY'|'METROPOLIS'; chance: [number, number, number] /* the three ordered slots, each × h(S_town) */;
  thresholdCut: 'prosperous'|'rich' /* τ = the lower cut the town's FieldBands give this band */; supply: { band: string; h: number }[] /* h(v) per band row, interpolated along the value */;
  areaHaMax: number; elevationCmBand: [Cm, Cm]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own';
  institutions: IslandInstitution[] /* { kind, requirementBand, areaHa }: the unique-institution rows a slot may carry by rule or by assignment */;
  hysteresis: number /* share of area; default 0.05 */; dwellYears: [number, number] /* waning → settled, settled → fallen (§4.11's dwell bands) */ }
interface SkyStrategy { place(doc: Document, rule: IslandRule, allocations: Allocation[] /* S7b (5)'s sky allocations: the open slots with A > 0, each with its supported area and altitude */, ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }
// a Stage registered after S7b by declared I/O: inputs the sky allocations and the ground plan; outputs the islands (outline sized to the
// allocation's area, placement by rule), their arenas and their districts, which run the ordinary pipeline through a NeighbourhoodRequest
```

**The underground fades like the walls (owner: "Sewer systems and the underground like the walls fade slowly, rather some
tunnels simply cave in or become decommissioned rather than intentionally taken down by populations"; AM-11).** A tunnel's
lifecycle is a ladder like a wall's, moved only by §4.11's lottery at the underground's persistence rate — after streets
and walls, before terrain and water: the slowest fabric but the ground itself (J-A11.42) — and by hand: in use →
neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined`, with
`Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7); the conversions `silt`, `caveIn` and `seal` act on a tunnel or on one of
its stretches. No epoch rule ever demolishes a tunnel: the engine's plan may not contain `demolish` on a tunnel record (a
hook test lints it), while a user's `delete` stays available, because everything is editable (J-A11.41). A closed tunnel
persists as an underground ruin — its record live at its address, its centreline and invert kept, drawn by §8.2's silted,
caved-in and sealed classes through the underground layer's cut-away (§8.4) — and later growth reopens it (`reopen`;
regrowth-first: a closed tunnel on the network's line is reopened before a new one is dug) or reuses it: AM-12's
underground plots front a reopened tunnel as they front any navigable one. Decline follows the surface's drivers and lag: a
tunnel's exposure is the exposure of the ground it runs under, and its dwell bands are two steps slower than a building's
(§4.11's table). Emulation note: no reference has sewers or time; with the network absent nothing of it runs.

=== APPEND TO SECTION ### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19) ===

**One more member of the family (AM-10).** II.6's island supply law is a band row of this family: an island's supported
area and altitude interpolate along the prosperity value between band rows exactly as coverage, granularity and greenery
do, read the same field, and are zero below the supporting threshold; its rows are II.6's `IslandRule`.

=== APPEND TO SECTION ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===

**Vacant plots under decline (AM-8).** A plot whose last building is cleared or reused merges into a garden, orchard or
field by `plotToGarden`, or into its occupied neighbour by `amalgamate` (§4.11's ladders), through the merge operator of
S10 (7) with the neighbour's band; the band's vacancy-run share of S10 (8) is the design's deliberate vacancy: regrowth
never fills a run below its share, and decline's vacancies are counted apart from it.

=== APPEND TO SECTION ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, as above, and vacates its buildings
(`vacate`, §4.11) — it never removes them by arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise
reoccupies the same suffix first. `BuildingClassRow` carries `salvageM3: Record<string, number>` — the class's material
yield when robbed, cleared or dismantled, and the debit of a build or repair of that class — read by §4.11's ledger.

=== APPEND TO SECTION # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===

**Layers at the village rungs (AM-13).** The village ladder's `RungProfile` rows carry `layers.islands = 'none'` (§1.1), so
II.6's island rule admits no island below TOWN whatever the prosperity or the model setting; a village request never
creates a sky allocation.

=== J-ROWS ===
| J-A8.41 | decline exposure as a weighted lottery over an exposure field with a chance share, in place of the fixed decline order | §4.11 |
| J-A8.42 | a cleared or reused building is a live trace record at its address, a tombstone only when demolished or succeeded | §4.11, §2.8, §6.3 |
| J-A8.43 | locked and pinned entities are never struck; assigned ones only through the use-relocation rule | §4.11 |
| J-A8.44 | regrowth-first siting binds the built grow path now: old-plan capacity before any new face, a stage grown for the residual only | §4.11, §4.5 |
| J-A8.45 | salvage as a demand-weighted clearance recorded in a flow ledger, never a hard material budget | §4.11, §2.7 |
| J-A8.46 | the ladders reuse `abandoned`, `decayed` and `ruined` and add only `cleared` and `reused`; a superseded wall is a link, not a state | §4.11, §2.8, §2.7 |
| J-A8.47 | lag as per-entity dwell bands on the way down and none on the way up | §4.11 |
| J-A10.41 | every island, an institution's included, is gated by the town's prosperity supply | II.6 |
| J-A10.42 | the proposed island decline adopted as conversion kinds — resize, wane, settle, fall, re-float, raise — the fall through the carve path's clear region | II.6, §4.11 |
| J-A10.43 | the supply law's two inputs and product form: area from the carried and the town's prosperity, altitude from the town's alone | II.6 |
| J-A11.41 | the engine never demolishes a tunnel; a user's delete stays | II.6, §4.11 |
| J-A11.42 | the underground after streets and walls and before terrain and water in the persistence order | §4.11, II.6 |
| J-A13.41 | the rung gate as a `RungProfile.layers` row read at generation and at every epoch; a band crossing runs the decline ladder, never an instant removal | II.6, §1.1 |
| J-A15.41 | a model-level fantasy-layers setting, off by default under D-3, separated from the sky layer's view toggle; hidden islands keep their households | II.6, §8.4, §7.8 |
| J-A15.42 | the island count as three ordered slots opened by chance × the town's supply, drawn once per town on `island.place` | II.6 |

=== RATIONALE-A ===
| J-A8.41 | Chose to pick what decline strikes by a weighted lottery — an exposure field built like the prosperity field from drivers on the context vector (extramural, low and damp ground, downwind, the noxious kernels, the intramural periphery, low prosperity; a resilient core around market, churches and castle), a persistence rate per fabric layer (uses, buildings, plot boundaries, streets and walls, the underground, terrain and water) and a chance share of 0.25 — over the fixed order "periphery, lowest value, noxious and extramural first", because the owner said causes vary and chance plays a part, and every rule's default must be a table tendency, never a law (AM-23); the old order survives as the weights' default ranking (§4.11). |
| J-A8.42 | Chose to keep a cleared or reused building as a live record at its address — its footprint face persisting as a trace, drawn as the old foundations inside the garden or field laid over it — over tombstoning it at clearance, because the owner wants ruins to keep their ids and regrowth to raise a new building on the old foundations, which needs the trace to be addressable; the record becomes a tombstone only by `demolish` or when a successor building takes its address by succession (§4.11, §2.8, §6.3). |
| J-A8.43 | Chose to exempt locked and pinned entities from every strike and to let an assigned entity be struck only through the use-relocation rule of AM-17 (a pinned assignment never) over the earlier blanket "never locked or assigned", because a lock or pin is the user's explicit fixing of state (§7.2) while an assignment is a stable identity that AM-17 lets close or relocate under the same rules unless pinned; a blanket exemption would leave every assigned business immune to a town's decline (§4.11). |
| J-A8.44 | Chose to make regrowth-first bind the base's built `grow-by-stage` path now — delta demand placed first on vacant buildings, then derelict ones, then ruins and traces, then the old plan's vacant plots and unbuilt faces along its street lines, and only the residual growing a stage — over an engine-only rule, because the owner's history is growth, regression and growth again on one plan, the base's path is the same path "regenerate this area" uses (D-25), and an epoch that grew a new stage while the old plan stood half-empty would contradict the owner's picture; the earlier rule that an epoch placed delta demand only on new or transformed plots is retired (§4.11, §4.5). |
| J-A8.45 | Chose to model salvage as a flow ledger — credits from robbing, clearing, dismantling and demolition by a class-table yield, debits from building, rebuilding and repair within a haul radius, shortfalls reported — whose only effect on the map is to weight clearance toward nearby building demand, over a hard material budget that could block a build, because the owner asked that cleared zones appear near active building and that ruins be left standing elsewhere, not that construction be rationed; a tendency reproduces the pattern and can never fail a generation (§4.11, §2.7). |
| J-A8.46 | Chose to express the decline ladders with the existing `abandoned`, `decayed` and `ruined` values (vacant, derelict, ruin for buildings; neglected and breached for walls; silted and caved-in for tunnels) plus two new values, `cleared` (a footprint trace) and `reused`, with a wall's supersession recorded as an `Enceinte.supersededBy` link and a tunnel's closure as `Tunnel.closure`, over a per-kind state vocabulary, because §2.8's one existence state with orthogonal flags is the design's rule, `supersede` already names identity succession and must not be overloaded, and two added values cover every rung the owner named (§4.11, §2.8, §2.7). |
| J-A8.47 | Chose to give decline its lag as per-entity dwell bands drawn in years for each downward step (vacant → derelict, derelict → ruin; clearance only on salvage demand; walls slower, tunnels slower still) and regrowth no lag at all, over one town-wide delay, because the owner asked for built extent that follows population with a vacancy lag down and quick reoccupation up, and per-entity draws give the mixed picture of the same street — a house emptied last decade beside one long in ruin — that a single delay cannot (§4.11). |
| J-A10.41 | Chose to gate an `institution` island by the town's prosperity supply as well — it exists only where the town's supply is above the threshold, its carried value being its institution's requirement band — over exempting institution islands from the supply law, because the owner's words are absolute ("if there is no prosperity, there is no floating islands") and magic as a constantly supplied resource is the city's to supply, whatever the island carries (II.6). |
| J-A10.42 | Chose to adopt the program's proposed island decline as conversion kinds on the one list — resize under a shrinking supply, waning, settling and falling below the threshold or outside the CITY band, re-floating and raising under regrowth, a fall laying a ruin face on the ground through the carve path's clear region — over leaving islands static across epochs, because the owner made supply continuous and the evolution hooks must cover every layer; the response is vetoable and stays behind the staged engine except as hand-applied edits (II.6, §4.11). |
| J-A10.43 | Chose the supply law's two inputs as the area-weighted mean prosperity of the built land (`S_town`) and the mean band value of the carried households (`S_carried`), the supported area their product with a per-rung maximum and the altitude a function of the town's value alone, over a single wealth index, because the owner tied size to the prosperity of both the neighbourhood and the whole city and the product makes both necessary; altitude from the city alone gives the reading a rich quarter in a poor city floats low, a rich one in a rich city high (II.6). |
| J-A11.41 | Chose that no epoch rule of the engine may demolish a tunnel — its plan may not contain `demolish` on a tunnel, linted by a hook test — while a user's `delete` on a tunnel stays available, over forbidding tunnel deletion outright, because the owner said tunnels cave in or are decommissioned rather than being taken down by populations, which is a rule about the engine's behaviour, and the owner's separate rule that everything is editable keeps the user's hand free (II.6, §4.11). |
| J-A11.42 | Chose to place the underground after streets and walls and before terrain and water in the persistence order (rate 0.03 against walls' 0.05 and terrain's 0.005), with a tunnel's exposure read from the ground above it and its dwell bands two steps slower than a building's, over its own driver table, because the owner said the underground fades like the walls and is the slowest layer after terrain, and one tendency table for every layer is the evolution family's rule (§4.11, II.6). |
| J-A13.41 | Chose to gate islands by a `RungProfile.layers.islands` row (none at TOWN and every village rung, possible at CITY and METROPOLIS) read at generation from the request's population and at every epoch from the epoch's target, with a band crossing handled by the decline ladder (waning, settling, falling over the dwell bands) rather than an instant removal, over a fixed rung list in the island rule, because the ladder is the one home of per-rung data (D-33) and an island that vanished the epoch a city dipped under 10 000 inhabitants would contradict the owner's slow fading (II.6, §1.1). |
| J-A15.41 | Chose two settings — a model-level `recipe.layers.islands`, off by default as D-3's named fantasy toggle, and the sky layer's view visibility — over one toggle that both creates and shows islands, because the owner says the toggle shows islands where the settlement has them and never creates ones it cannot sustain, and D-3 requires the realism base's ground model to be unchanged; with the model setting on, a settlement that has islands keeps its richest households on them whether or not the layer is shown, so hiding a layer changes no digest (II.6, §8.4, §7.8). |
| J-A15.42 | Chose to draw the island count as three ordered slots, each opening with a table chance times the town's supply function and only after the slot before it, once per town on `island.place`, over "1–3 islands when the toggle is on", because the owner said not every city or metropolis has islands and that a poor city has none while a rich one may have none or several; ordered slots give a monotone, calibratable distribution over prosperity and keep the count a function of the seed, never of the toggle (II.6). |
=== END ===
