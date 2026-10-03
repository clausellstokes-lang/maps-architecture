### 3.17 Item 110 inside the neighbourhood — terraces, walls, raised ways, deck plots (item 110)

Item 110 is base design, built at M3a: the `RetainingWall` record with S10 and S11's levelling (items 245, 302), the
raised ways on ground parts from 1 with their generator, supports, spans and hand operator (items 244, 290), the deck
plots with their `deck` budget row (item 246), stepped tiers. Each base mechanism is cited, never restated; this section
states what the neighbourhood does with them. With the terrace, raised-way and deck-plot rows off, nothing here acts
(T-V1-4).

#### 3.17.1 The terraced ward (J-V1.60–J-V1.62)

1. **The state.** `terraceState(D)` (V01 §2.3, its one definition) says whether D is terraced (`asks`, with its
   `source`) and whether walls may stand (`walls`); S7c, the base's district-edge source and the elevated-road
   generator's terrace endpoints (V06 §3.19.3; item 290) read that one value.
2. **The layout.** S7c's `stepped` weight gains the factor `(1 + terrace.askGain × asks)` (V01 §3.3.3); the `stepped`
   row lays a contour series, and over a ravine a thalweg path with a series per flank (V01 §3.4.3). A terraced ward is
   declared by name as a quarter with `fabric: 'stepped'` (the Terraces card) and `terrace: 'on'` (items 349, 350) — the
   form the second known-city fixture's ravine quarter declares (T-V1-54; V10's transcript).
3. **The walls inside the ward are the base's.** Each block between two contour streets holds two plot rows back to
   back, each levelled by S10 and S11 to its own fronting street (item 110 (a)), so the rise between the streets is held
   at the blocks' rear lines by base-produced walls wherever the step passes `terrace.stepMinCm` on ground steeper than
   `terrace.slopeMin`; between the `stepped` row's `slopeMeanPct` and `terrace.slopeMin` the ward takes no edge wall and
   the base walls only its units steeper than the threshold, so its terraced streets stand mostly without walls
   (V01 §3.6 (8)).
4. **The ward-edge wall is the base's district-edge source** (item 302; J-V1.61: one producer for every generated wall
   line). It runs for D when D's fabric declares `terracedEdges` (item 506: `FabricStrategy.levelledUnits` and
   `terracedEdges`) and `terraceState(D)` has `asks` and `walls`. **`TemplateFabric` declares `terracedEdges: true` for
   every row and returns from `levelledUnits` exactly what the bent cut returns for the faces it cut — their blocks,
   their plots and the ward** — since every template runs the bent cut on its remainder (V01 §3.4.2 (e)); the placement
   rule is §4.7 S10's. This volume supplies the inputs and reads the walls: lines the seeds respect when held
   (V01 §3.17.2), splitters of court sites (V01 §3.8.2), marks (V01 §5.1), export rows (V01 §5.3), why answers
   (V01 §4.5) and the fates of a dry run (V01 §3.9). Where D's edge runs along a cliff or gorge closure arc (a hard
   `cliff` seam, V01 §3.6 (7)), the cliff face holds the ground and no ward-edge wall stands on that run (item 302: none
   stands on a hard run).
5. **Crossings.** Every way crossing a wall — a contour series' cross lane, a portal lane over the ward-edge wall, any
   bent-cut lane — is a stair or a ramp by the way-class crossing row (`ways.crossing`, volume 11; item 110 (a): "never a
   gap in the wall"), an interval attribute of the way at the wall that changes neither its shape nor its name (V01 §3.6
   (3)).
6. **Naming.** Contour streets carry `terraceIndex` (V01 §3.7.2); the district's naming features gain `terraced`
   (V01 §3.7.4).
7. **Courts across a wall.** A court residue (§4.7 S10 (6)) that a wall crosses is one residue in two or more level
   pieces: the hood pins read one site per piece (V01 §3.8.2 step 1), the greening makes one draw and plants every piece
   (V01 §3.5.7), and its place is one record labelled on its largest piece (V01 §3.7.1).

#### 3.17.2 Held walls in every re-derivation

1. **A fixed input.** A declared `RetainingWall` (source `declared`, item 245: drawn with T3 `wall` in its `retaining`
   kind or a T2 terrace stroke's edge) is held (item 110 (a)): V01 §3.5.12's fixed input (5), kept by every re-derivation
   of the district it lies in — a replace close-up, New random, a content edit's scope, an epoch.
2. **Seeds.** A held wall is a line, not a hole: V01 §3.4.2 (d)'s validation keeps every seed from running within
   `eLo / 2` of it along more than `eLo` of its length; a seed crossing it at ≥ 45° is allowed and takes a stair or ramp
   interval by the way-class crossing row. A generated wall is re-derived with D's S10, after S8, so it constrains no
   seed.
3. **The chunk.** V01 §3.8.3's inputs digest holds every wall, strip and pier inside or on D's faces and the deck plots
   D owns, so a wall drawn across an opened court stales the chunk and the re-derived pins clear the wall.
4. **The dry run** lists each generated wall added, removed or moved and each declared wall kept among its fates
   (V01 §3.9).

A held wall locked by the user and then crossed by a replace close-up's seed keeps its line; the seed takes F-TEMPLATE's
rungs (V01 §3.13). A declared wall of zero length or one self-touching after the dry run's snap is bent by §7.1's dry run
before it commits (item 245), so no degenerate wall reaches stage 2.

#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raised.stripMarginM` each side — is a **hole** in the faces it crosses, as an S7b claim is (V01 §3.4.1): where it
   crosses a face from boundary to boundary it cuts it; no plot, block interior, seed or hood pin lies in it; the base's
   arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist, and an `open` span stays open ground, a way
   passing under it or bare ground (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   through an `open` span (the span's `use`, an eager base fact; item 244's span rule) whose clear width is ≥ the way's
   width + `raised.clearWidthM` and whose soffit meets item 244's clearance rule for the crossed way — the way's held
   `clearanceCm` first, else volume 11's `raisedWays.structure.clearanceCm` for the crossed class (cart or foot) —
   within ± `raised.squareDeg` of square to the deck; never along the strip, never through a pier. A seed that would
   cross elsewhere takes F-TEMPLATE rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest
   qualifying span); a bent-cut lane takes §4.6's ladder and, finding no span, ends at the strip's edge as at a
   reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **Wall openings are not gates.** An aqueduct's arch through a curtain wall and a viaduct's or elevated road's raised
   gate at deck level are wall openings: no gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side
   feature and no S9b square reads them.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).

#### 3.17.4 Raised-way land and the slot

Generated raised parts are committed before S7b (1) — the viaduct inside S4's route solve, the elevated road and the
aqueduct at S6's end (item 290) — so S7b (1)'s capacity subtracts the strips inside each district and no household is
ever allocated to strip land. **A raised part added by an edit** — T4 `road` with `raised`, or the aqueduct class —
removes the plots under its piers and strip by least disruption (the adding edit's fates), and their households are
re-homed in the order V01 §4.1's content edits use: D's other blocks first (the join maximum lowered one step, §4.7 S10
(7)), then the first district in S7b's order whose capacity holds them; the bend is named in one line ("the new aqueduct
takes 6 houses; 22 households move to Tanners' Row") and no household is stranded (T-V1-12's fixture). **At an epoch**
(J-V1.79) the plots and households under a new strip are **volume 6's clearing** (V06 §3.19 (7)): its `raisedWays` step
clears them before the raised way's commit, its households going through the engine's ledger and `siting`. The commit's
operator — this subsection's add path — then removes the strip's plots as for an edit (V06 §3.19 (7)–(8)), finding the
buildings already cleared and the households already in the engine's ledger, so its re-homing moves nobody; the
`hood.fabric` participant re-derives only the crossed districts' fabric reading and hood pins over the committed plot set
(V01 §3.3.6 (3)).

#### 3.17.5 Removing or adding a raised way (J-V1.67)

1. **The base's edit.** Both are the base's (item 110 (b); a removal of a generated part is a suppression, item 260,
   that holds through regeneration). This volume re-derives every district whose part-0 ways, strip holes or plots the
   edit changes — the crossed districts and those of the detour by which the base re-routes a cut route — each from S8
   with §7.3 item 1's seam exception, and adds its lines (fabric bends, dispatch changes) to the base edit's dry run.
2. **The suppression's one reader** is the base's raised-way generator: a Re-derive from S4 or S6 lays no raised part
   where one holds. This volume reads only the committed way set.
3. **The freed strip** is re-plotted by D's S8 re-derivation and the template face grows. A fabric that had fallen back
   for want of room is laid again from the row S7c's keyed pick recomputes (the fabric why provider's reading, V01 §4.5),
   when the committed fabric lies on that pick's fallback chain and D's fabric path is not edited — never re-drawn.

An undo of the removal restores the part and its strip, and the districts it re-derived return with the removal's undo
record (§7.4); a redo re-applies it. A raised way is map-derived (item 20 (h)): a dossier change reaches a generated one
only through the base generator's rows (DR34, DR35) at the fold that re-derives it (§7.7), which this volume reads as
committed state.

#### 3.17.6 Deck plots (J-V1.68)

1. **The owner.** A deck's plots and its placed landmarks (item 110 (d): frontage plots along the deck's way on a mole,
   a pier or jetty, a quay platform or a part-0 bridge deck; towers and forts at mole heads and mid-mole) belong to one
   **owning district**: for a mole, a pier or a quay platform, the district whose land face holds its root vertex (where
   its way leaves the shore); for a bridge, the district at its **intramural end** — the end whose district lies inside
   the town's outermost enceinte — else `Bridge.deck[0]`'s when both ends or neither do; a root vertex on a shared chain
   goes to the district of the smaller id. They count in the owner's `inhabitants`, its S10a allocation and its identity
   reading, and S7b (1)'s capacity of the owner adds the deck row's expected plot capacity, so every household on a
   bridge is in one district's allocation. A bridge over a moat offers deck plots only by item 246's rule (none on a
   `ford` or `draw` bridge, none without a `deckCm`); a fixed moat bridge with a deck belongs by this rule (its intramural end where one end lies inside the
   enceinte, else `Bridge.deck[0]`'s).
2. **No dispatch.** S9b never types a deck plot: it is not a block (V01 §3.5.1).
3. **No hood pins.** No hood-pin site lies on a deck plot — a deck has no ground for a well, a pump, a trough or a tree;
   a mole-head tower or fort is a model landmark, not a hood pin.
4. **The close-up.** The owner's refine close-up includes the decks it owns and draws their plots, buildings (V02 §3.16)
   and landmarks at the neighbourhood band; V01 §3.8.7's frame extends to them; an outline close-up over a harbour opens
   them with their owner (V01 §3.8.9).
5. **One owner per frontage.** The bridgehead template's plaza (V01 §3.4.5) and S9b's bridgehead square stand on land;
   the deck row's first plot begins at the abutment. A quay platform's plots are the deck row's alone: the `quay` row's
   `onEdge` street runs on land and the platform's plots front the platform's own way.
6. **A fallen or ruined deck.** Its plots and buildings take the base's least-disruption fates (item 110 (d); the deck's
   condition its host's, item 246); the owner's chunk re-derives because its inputs digest changed (V01 §3.8.3). No
   hood-pin override hangs on a deck plot, since none stands there.

#### 3.17.7 Unit runs, islands and epochs

1. **No generated raised way in a unit run.** A standalone neighbourhood document and a sky island's districts get none —
   the unit run has no route solver and no water balance, and no aqueduct element stands on an island (V05 §3.22 (5)
   (d)). A declared one is honoured on a standalone document's ground; on an island it is bent by V05 §3.22 (3) (d)
   (J-VI.4 (e): `raised` dropped, the stroke drawn as the island's own way).
2. **The terrace rule on an island.** The island's unit run reads `terraceState` at the island's relief class: its drawn
   class (`terrainEcho.reliefClass`, V05 §2.1; item 251) where `terrainEcho.relief` is `own`, and `plain` where it is
   `echo` or `none` — the echo's quarter amplitude and the dome are no terracing relief (V05 §3.8 (3), V05 §3.22 (4);
   J-V1.94) — and the base's levelling raises its walls on the island's arena (V05 §3.22 (4)). No ward-edge wall stands
   on or along the rim: the rim run is `sky` (hard, which the district-edge source excludes, item 302) and the levelling
   stops at the rim strip's setback line (volume 5).
3. **Epochs.** An epoch that lifts a town to CITY may generate raised ways (V06 §3.19), clearing the land under each
   strip itself (V06 §3.19 (7)) before the commit's operator removes the strip's plots (V01 §3.17.4); opened close-ups
   then read the committed state — the `hood.fabric` participant's item (3) re-derives the crossed districts' fabric
   reading and hood pins, logged in the epoch's diff, with no plot removal and no re-homing of its own (V01 §3.3.6,
   V01 §3.17.4).
4. **Walls over epochs** are the base's district-edge source in whichever S10 lays a district's plots — a new stage's
   growth run or an epoch's re-derivation (V06 §3.19.4 (1)); a surviving district's walls are survivors, their state
   profile item 245's. The `hood.fabric` participant raises no wall.

#### 3.17.8 The aqueduct's terminal

One rule reads either form of the terminal's public outlet (item 110 (b): "to a basin, cistern or fountain"; volume 11's
`aqueduct.terminal`; the record's `terminal`, item 244): a model `Pin` of kind fountain (or the base's basin kind, when
it adds one), or the frontage of a `conduit_house` building (volume 11's class; V02 §3.17 (b)). **The terminal is a
`conduit_house` where the roster (a standalone document) or the dossier (its `aqueduct_or_water_system` record, by
volume 11's mapping; DR34) holds one, else a fountain `Pin`** (J-VI.9), so no institution the dossier does not list
appears. When the outlet stands in or fronts a square face — an S9b square, a template plaza, the main plaza — it is that
square's centrepiece: S11's `SquareRow.centrepiece` draw is skipped for that square (V01 §3.5.10), and V01 §3.8.2 step 2
counts the outlet as a prior pick of kind fountain. Both forms exist before S11 (the pin committed with the aqueduct,
the building by S10a–S10b), so the skip is decided at S11. An outlet in no square adds no centrepiece and skips nothing.
A removed aqueduct (V01 §3.17.5) takes its terminal pin with it; the square's centrepiece is drawn again at the next
re-derivation of its block. Bar: 0 squares with two fountains (T-V1-51 (g)).

