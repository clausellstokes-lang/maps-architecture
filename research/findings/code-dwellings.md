# code-dwellings — watabou's Dwellings (build 17195045) read from its compiled code

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/dwellings; no Fable critic has checked it). Queue row B-code/dwellings
> in docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 settlements and the §6 corrections against the
> bundle before any of them is carried into docs/ARCHITECTURE.md (item 28's floor-plan rung above all), and the firewall
> (no code, no asset copied; identifiers citation-only).

STATUS: COMPLETE (lane `code/dwellings`, 2026-09-27) — §1–§2.12 by the first seat; §2.13–§5 drafted by it and spliced,
verified and corrected by the continuation seat, which also wrote §0 and §6–§9 (§9 records who read what).

Bundle: `captures/dwellings/2026-09-26T23-54-54/profile/network/bodies/0002-cd66b0ce.js` (1 368 261 bytes, Haxe → JavaScript,
Closure-minified). Evidence grades: [READ] seen in the bundle (class and method cited), [INFERRED] our reconstruction,
[STATED] the author's words elsewhere. Conclusions: CONFIRMED (read on disk) / PLAUSIBLE (reasoning).
Reference identifiers appear only as citations ("the plan's partition (its `Plan.divideArea`)"); the design never adopts them.

## 0. Headline findings

The ten things the code settles (each CONFIRMED by reading the cited class unless marked; §6 lists every overturned
claim with its row):

1. **Randomness is one Lehmer 48271 stream with three kinds of reset** — the clock at start-up, the blueprint's seed per
   house (after the facade style has already been drawn from the old state), and a rewind to the best trial after each
   of the two role lists. When the second list meets zero rooms (a house of ≤ 4 rooms that all took first-list roles)
   the rewind goes to the **clock**: that is the "one generation in five" clock reseed, and it makes such houses'
   furniture, lights, windows, chimneys and name load-dependent (§4.2; C21–C23 overturn "deterministic per permalink").
2. **The footprint has one acceptance test — the cell count.** Twelve three-by-three templates, stretched and grown at
   random, are drawn until the area fits the band; no compactness or bounding-box test exists (§2.3; C1). CONFIRMED by
   replay: every recorded shape and candidate count reproduces.
3. **The storey, stair and basement rolls are closed forms:** storeys ≈ (√cells − 1) × a mean of uniforms (clamp 1–8);
   spiral 0.1 / 0.3, stairwell (n − 1)/(n + 1); basement **n/(n + 1)** (§2.2). CONFIRMED by replay on 92/92 houses —
   overturning the critic's "≈ 0.78 whatever the storey count" (C3).
4. **The partition is a recursive straight cut with one optional bend**, started from the middle of a straight wall or
   extended from a re-entrant corner (`mechanical` prefers corners, `organic` walls), stopped at 6–12 cells, and kept with
   probability (q₁q₂)² where q rewards non-narrow cells — or, with `hallways`, narrow small parts (§2.5; C6–C8 overturn
   the profile's "notch = re-entrant corner" and "openings rather than doors").
5. **"Narrow" (a cell in no 2 × 2 block of its set) is the generator's one shape measure** — cut starts, cut scores,
   corridor merging, door prices, the corridor fallback, prop placement and most validators all read it (§3.3).
6. **Doors: one per adjacent pair, pruned to a priced spanning tree plus half the non-redundant extras** — loops exist but
   are uncommon; corridors are hubs because a narrow room costs nothing (§2.6; C9–C11 settle the critic's tree ruling and
   refute "some openings are not `Door` objects").
7. **Stairs are searched per storey pair on cells that are candidates on both storeys**, with direction toward a wall; a
   trapdoor (a direction-less stair, `dir` null in JSON) when none fits; a failed upper connection would leave a storey
   with no stair — unguarded, practically unreachable (§2.8; C13–C15). The stairwell is a one-cell room stacked through the storeys; the spiral is a turret outside the
   footprint.
8. **Upper storeys lose at most one exterior room each**, chosen for the most box-like remainder (§2.7; C5); **the
   basement is the largest room of a throw-away coarse plan** of the ground floor (§2.9; C4).
9. **Role assignment has no scoring:** yes/no validators, rooms × roles random trials, keep the trial with the fewest
   unassigned rooms, rewind and replay; list 1 first over every room, list 2 over the rest, then five fallback roles; the
   bathroom–bedroom rule of 1.3.0 is present but dead (an identity mismatch); specials are not coupled to the name
   (§2.10; C16–C18). Furniture and lights run inside this stage, before door kinds and windows (C20).
10. **Everything drawn is a projection of the plan model:** windows by role rule then by a storey density (0.8 at the top,
    0.1 less per storey below), roofs as one hip face per outline run of each storey's straight skeleton, the elevation
    as per-side planes of the storey outlines with the plan's windows, the JSON as cells, surviving doors, windows and
    stairs; the name's house noun is chosen by the derived size and height (§2.11–§2.16; C19, C29, C31, C33).

**For our design (reader-tier note, not a design change):** the reference is partition-then-label with rejection and
replay; ARCH §2.6's plan rung is function-first and already refuses to adopt it. What the code adds is precise
baselines (C3, C9, C29) and three cautions for §13.2's bars: the reference never checks that every storey got a stair
(C15), a URL plan wider
than 11 cells silently becomes a random house (§7 gap 1), and a clock rewind hides inside a replay step (C21).

## 1. The class map

Built by `scratchpad/code/dwellings/extract.py` (the lane's copy of the shared extractor): every `__name__` marker and
enum registration, its byte range and its static initialisers, written to `scratchpad/code/dwellings/classes.tsv` (659
markers). The app's own packages, extracted one file per class into `scratchpad/code/dwellings/classes/` and made
readable by `readable.py` (the inlined generator draw replaced by a token, class identifiers replaced by their short
names) into `classes_r/`: **261 classes** — `dwellings` 106 (105 classes + 1 enum; the task's "102" was a grep that
missed markers split across a line break: `utils.Grid`, `rooms.Storage`, `props.Prop`), `tinypubs` 43 (42 + 1 enum),
`geom` 24, `utils` 16 (15 + 1 enum), `coogee` 55, `tracery` 9, `formats` 3, `system` 3, `processes` 2. Dead-code
elimination has run: every class and method present is reachable from the app (for example the geometry helper class
keeps only two functions).

**Entry point and call order** [READ `Main` constructor, `House` constructor, `Specs.process`]:
the application constructor seeds the generator from the clock, restores the palette and wall style from browser
storage, reads the URL into a blueprint (or draws a random blueprint), builds the house, then opens the plan or
elevation scene. Building a house = (1) draw the elevation's style parameters from the *live* generator state,
(2) reset the generator to the blueprint's seed, (3) the specification stage (one discarded draw, footprint, entrance,
storey count, stair mode, basement roll), (4) one floor plan per storey, bottom-up, each upper outline cut from the
one below, (5) stairs between adjacent storeys, (6) the basement (a throw-away coarse plan of the ground floor, its
largest room becomes the basement outline, then a real plan), (7) the room programme and role assignment, which
also furnishes and lights every room, (8) door kinds, (9) windows, (10) chimneys, (11) the name, (12) the URL
rewrite. §2 walks every stage.

### 1.1 `com.watabou.dwellings` (106) — the generator, its views and its UI

| class (citation) | what it is, in one line |
|---|---|
| `Main` | application shell: clock seed, palette/wall-style restore, blueprint from URL or random, first house, first scene |
| `Export` | PNG/SVG writers for one storey, the facade, and a multi-storey sheet (200 px or 100 units per cell, 3-cell margins) |
| `model.Blueprint` | the request: seed, tags, storey count, plan code, width/height, entrance code, custom name; URL read/write |
| `model.Tags` | tag vocabulary, the random tag draw, the dialog's exclusive groups, the build's one-line descriptions |
| `model.Specs` | the specification stage: footprint, entrance, storey count, spiral/stairwell rolls, basement roll (static state) |
| `model.Drafter` | footprint drafting (polyomino or box with rejection), plan-code and entrance-code decoding/encoding |
| `model.House` | the house: storey plans, upper-storey setbacks, stairs, basement, assignment, doors, windows, chimneys, re-rolls |
| `model.Plan` | one storey: the recursive partition, notch choice, corridor merging, door placement and pruning, windows |
| `model.Room` | a room: cell set, outline, narrow cells, doors map, counts used by validators, windows, furnishing, light |
| `model.Door` / `model.DoorType` | a connection between two rooms on one cell edge, with its price; kinds none-set / open side / doorway / leaf door (the doorway kind is declared but nothing assigns it) |
| `model.Staircase` | one end of a stair or trapdoor: storey, cell, direction (none = trapdoor), link to the other end |
| `model.RoomType` | a role: name, validator, optional window rule, door rule, furnishing; the shared validator predicates |
| `model.HouseType` | the assignment engine: two programme lists, best-of-N replayed assignment, the fallback roles |
| `model.RegularHouseType` | the default programme and its 22 role instances |
| `model.LoadedHouseType` | a programme read from a JSON5 file (the Gothic and Tavern menus) |
| `model.Namer` | the house name: a Tracery grammar on the shared generator, with persistent selection decks |
| `model.Clutter` | abstract furniture: groups of rectangles and discs, slid toward walls away from doors |
| `model.JsonExporter` | the JSON export (storeys, rooms, doors, windows, stairs, exit, spiral) |
| `model.Elevation` | the facade model for one side: wall planes by depth, sections by storey count, door, windows, tower, porch |
| `model.Layer`, `FacadeLayer`, `TowerLayer`, `PorchLayer` | the elevation's depth-sorted layers |
| `model.props.Prop`, `PropSet` | drawable props and a room's prop set (free-cell search) |
| `model.props.Light` | a room light: position, radius, power; centre (skeleton summit), wall, edge and cell variants |
| `model.props.Altar`, `Statue`, `Curtain`, `Bed` | prop glyphs (the bed is compiled in but no role creates it) |
| `model.rooms.*` (24) | one class per role: `Generic` (five fallback roles), `LivingRoom`, `Bathroom`, `Bedroom`, `Kitchen`, `Storage`, `Hall`, `Gallery`, `Cellar`, `Attic`, `Study`, `Library`, `Workshop`, `Passage` (secret passage), `Observatory`, `Laboratory`, `Lookout`, `Greenhouse`, `Studio`, `Vault`, `Chapel`, `Trophy`, `Armoury`, and `Loadable` (roles from JSON5) — each a validator plus its furnishing (§2.8) |
| `scenes.DwellingScene` | the shared scene: Enter/tap = new house, Space = name, 1–5 = colour presets, T/Tab = parameters, menus |
| `scenes.PlanScene` | the plan view: Shift+Enter re-partition, Ctrl+Enter re-assign, floor keys, wall styles 6–0, layer toggles |
| `scenes.ElevationScene` | the elevation view: sides, style re-roll, fortified, dark, fading |
| `scenes.BlueprintScene` | the 11×11 footprint editor: paint, random shape, random box, entrance edge, submit |
| `ui.*` (10) | `ParamsForm` (tags + storeys 1–8), `ExportForm` (multi-storey sheet), `URLForm` (permalink), `RoomForm` (rename a room), `FloorSelector`, `SideSelector`, `ModeSelector`, `ButtonStripe`, `Button`, `LayersButton` |
| `utils.Grid`, `Cell`, `Node`, `Edge`, `Dir` | the cell/node/directed-edge lattice and the eight directions |
| `utils.ChainUtils` | edge-chain helpers: slice, next/prev, corner search, straight-run merging, rectangle test, flood fill |
| `utils.AreaUtils` | cell-set helpers: bounding box, compactness, largest inscribed rectangle, bitmap, flood fill |
| `utils.PolyUtils` | polygon outset (mitred) |
| `utils.Polyomino` | the footprint template drafter (12 templates on a 3×3 mini-grid, random stretches) |
| `view.FloorMap`, `PlanView`, `TopDownView` | the plan scene's map: roof underlay, one storey's layers, labels |
| `view.WallsView` + `view.architecture.{Simple, Castle, LogHouse, Modern, SciFi}` | wall drawing and the five wall-style presets (thicknesses, gap widths, spiral radius, step count) |
| `view.WindowView`, `DoorView`, `EntranceView`, `StaircaseView`, `ArrowView` | glyph painters |
| `view.ClutterView`, `GridView`, `Shading`, `Hatching`, `EarthView` | furniture fills, floor grid modes, light and ambient-occlusion gradients, black-and-white wall hatching, basement earth hatching |
| `view.RoofStack`, `_RoofStack.Layer`, `RoofPainter` | the roof underlay: one straight-skeleton roof per storey below, tiles, ridges, chimneys, the spiral turret cone |
| `view.LabelsLayer`, `_LabelsLayer.Label` | room labels fitted into the largest rectangle, rotated or abbreviated |
| `view.Style` | the palette record (nine colours, two stroke widths, three opacities, font, hatching flag) |
| `view.ElevationView`, `BlueprintView`, `_BlueprintView.DoorButton` | the elevation painter and the editor's grid, shape and entrance buttons |

### 1.2 `com.watabou.tinypubs` (43) — the elevation kit shared with Tiny Pubs

`model.Facade`, `model.Section` (a facade = sections of equal storey count; windows, door, chimney per section);
`params.*` (15 style records drawn by `params.Dimensions.random`: column width, storey height, roof slope, base,
apron, window/door/dormer/chimney/sign/lamp/spire/half-timbering/gable data, `ColorMode` enum, `Style` = elevation
palette); `view.*` (16 facade, wall, roof-front, tower, spire, stairs, door, window, sign, lamp, ground painters),
`view.architecture.*` (half-timbering, porch), `view.surfaces.*` (tiling, hatching, stonework painters), `utils.Brush`,
`utils.Drawing`. Details in §2.14.

### 1.3 Shared libraries

| package | classes | role here |
|---|---|---|
| `com.watabou.geom` | 24 | straight skeleton (`Skeleton`, `Rib`, `_Skeleton.*`), Chaikin smoothing, colour maths, room graph with a breadth-first path search (`Graph`, `Node`), Poisson-disk samplers (`PoissonDisk*`, periodic `PoissonPattern`), polygon create/cut/transform/bounds, `Rect`, `Dot`, two line helpers — §3 |
| `com.watabou.utils` | 16 | the generator (`Random`), array helpers that draw from it (`ArrayExtender`), `MathUtils`, `Palette` (typed style records), gradients, dashed lines and arcs, nearest colour name, timers, `Stopwatch` |
| `com.watabou.tracery` | 9 | the name grammar engine (§2.13) |
| `com.watabou.formats` | 3 | sprite-to-SVG conversion for the SVG exports |
| `com.watabou.system` | 3 | URL state, browser-storage settings, file saving |
| `com.watabou.processes` | 2 | tweening (toast fade) |
| `com.watabou.coogee` | 55 | the UI toolkit (scenes, menus, dialogs, forms, layouts); grep-verified: no generator draws, no model logic (§9) |


## 2. The pipeline as coded

Grid conventions used throughout [READ `utils.Grid`, `utils.Dir`, `utils.Edge`]: a storey lives on a w × h cell grid
(i = row downward, j = column rightward) with (h+1) × (w+1) nodes; every pair of orthogonally adjacent nodes has two
directed edges, each tagged with its direction. The cell "belonging" to a directed edge is the cell on its right-hand
side, so every outline is a clockwise chain (on screen, y down) with the interior on the right; a right turn is a
convex corner, a left turn a re-entrant one. A cell set's outline is traced by collecting its boundary edges and
chaining them, preferring a right turn, then straight on, then a left turn at every node (so two cells touching only
diagonally are kept apart); the list of loops starts with the loop that holds the **last** boundary edge collected,
i.e. the last cell of the input list. The cells inside a closed chain are recovered by a flood fill that crosses any
cell edge not in the chain — so anything the chain encloses, holes included, comes back.

### 2.1 Request, tags and URL [READ `Blueprint`, `Tags`, `Main`, `DwellingScene`, `PlanScene`]

* **URL keys read:** `rooms` (`gothic` or `tavern` switch the programme), `seed`, `tags`, `floors`, `plan` + `w` + `h`,
  `entrance`, `name` (a custom house name that replaces the generated one), `view` (`plan` or `elevation`, the start
  view; read, never written). With no `seed`, `tags` or `floors` the URL is ignored and a random blueprint is drawn.
  **Written after every generation:** `rooms` (when not regular), `seed`, `tags`, `floors` (when > 0), `plan`/`w`/`h`/
  `entrance` (when a plan is set), `name` (when set). Shift+Enter does not rewrite the URL; Ctrl+Enter and the
  programme menu (both run the same role re-assignment) rewrite it — with unchanged values, except the new `rooms`
  value after a programme switch [READ `PlanScene.reroll/rerollRooms`, `fillViewMenu`].
* **A new seed is the generator's next raw state.** A blueprint without a seed takes one raw step of the shared
  generator as its seed (not a scaled draw): Enter, a tap, *New house* and the Parameters dialog all make a seed this
  way, so the next seed is a function of everything that drew from the generator since the last reset (§4).
* **Random tags** (`Tags.random`): one size tag from a four-slot list in which medium appears twice (small ¼, medium ½,
  large ¼); `square` with probability 0.1; with probability 0.2 a height tag (low or tall, even odds), and when it is
  tall, `slab` with probability 0.5; with probability 0.5 a partition tag (organic ⅔, mechanical ⅓); `hallways` with
  probability 0.2. `spiral`, `stairwell`, `basement`, `blank`, `transparent` and `generic` are never drawn — they come
  only from the user. A URL with a seed but no tags draws random tags from the clock-seeded start-up state.
* **Conflicts are not resolved at load.** The blueprint constructor calls the resolver with one argument, which does
  nothing; the resolver only acts in the Parameters dialog (selecting a tag removes the other members of its group:
  size, height, blank/transparent, mechanical/organic, spiral/stairwell). Downstream, each consumer settles a clash its
  own way: **size and height take the first matching tag in the URL's order** (a pick that walks the house's tag list);
  **mechanical beats organic, blank beats transparent, spiral beats stairwell whatever the order** (fixed precedence in
  the code that reads them).
* **Keys** [READ scene `onKey` handlers]: Enter = new house (Shift = re-partition, Ctrl = re-assign), Space = name
  toast, 1–5 = colour presets in the order natural, wooden, plain, blueprint, black-and-white, 6/7/8/9/0 = wall styles
  simple, castle, log house, modern, sci-fi, arrows = storey, A/P/R/L/O = arrows/props/labels/lights/AO, D = door
  glyph mode, G = grid mode (Shift = visibility, Ctrl = double), B = editor, E = elevation, S = style, X = multi-storey
  export, T or Tab = parameters. Clicking a room opens a rename dialog; Shift-click toggles its light, Ctrl-click leaves
  only its light on.

### 2.2 Specification stage [READ `Specs.process`, `Specs.pickShape`, `Specs.randNFloors`, `Specs.rollStairs`]

Order of work after the reset to the seed: **one raw step is thrown away**, then footprint → entrance → storey count
→ the two-storey minimum for spiral/stairwell → stair mode → basement roll.

* **Footprint size bands** (cells): small 10–16, medium 16–24, large 24–34 (inclusive on both ends). With a plan code
  the size tags are never read; a plan wider or taller than 11 (the editor's size) is dropped and the random path runs.
  When the tags carry **no** size tag (a hand-made URL), the size is drawn inside the seeded stream at this point with
  the same ¼ / ½ / ¼ odds as the random tags — one extra draw that shifts everything after it.
  The plan decoder is called for every house (with no plan it returns at once), which is why the profile counted it
  once per house.
* **Storeys above ground** when `floors` is not given: base value b = √(ground cells) − 1; untagged = round(b × the mean of
  three uniforms); `low` = round(b × |sum of four uniforms ÷ 2 − 1|) (a value near 0, folded); `tall` = round(b × (1 + ½ ×
  that folded value)); the result is clamped to 1–8. A given `floors` is used unclamped (the URL accepts 12). A house
  with `spiral` or `stairwell` and fewer than two storeys is raised to two.
* **Stair mode** (only with two or more storeys): the `spiral` tag, else the `stairwell` tag, else a roll — spiral
  with probability 0.1 for a two-storey house and 0.3 otherwise; if not spiral, stairwell with probability (n − 1)/(n + 1)
  (⅓ for two storeys, ½ for three, 0.6 for four).
* **Basement:** the `basement` tag forces it; otherwise it is drawn with probability **n/(n + 1)** for n storeys above
  ground — ½ for a single storey, ⅔ for two, ¾ for three. It can still be dropped later if no stair or trapdoor cell
  exists (§2.6).

### 2.3 Footprint drafting [READ `Drafter.getShape/getPolyomino/getBox/fromCode`, `Polyomino.create/draw/set/rect`, `Grid.cloud2gridNArea`]

* **Polyomino path (no `square`):** a candidate is built on a blank canvas from one of **twelve 3 × 3 templates** —
  every tetromino and pentomino that fits a 3 × 3 box, one orientation each (four 4-cell and eight 5-cell shapes). The
  template is randomly mirrored in x, mirrored in y and transposed (each with probability ½); the three template columns
  get random widths and the three rows random heights, each a uniform integer in [round(min/10), round(max/10)] — so
  small uses stretches of 1–2 cells, medium exactly 2, large 2–3. Each template cell becomes a rectangle spanning its
  column and row stretch, and each of its four sides may grow outward by one cell with probability ⅓ independently; the
  union of the 4–5 rectangles is the candidate. **The only acceptance test is the cell count**: candidates are drawn
  until one has between min and max cells (inclusive). There is no compactness or bounding-box test.
* **Box path (`square`):** width and height are round(2 + 6u) each (2–8, the ends half as likely); drawn until width ×
  height lies in the band. So `square` is a random rectangle, squareness incidental.
* **Plan code** (`Drafter.fromCode`): bit (k mod 4) of hex digit ⌊k/4⌋ is cell k = row × w + column, filled cells listed
  in row-major order. All three paths end in the same trimming step (bounding grid, offset remembered for the entrance).
  **Which part is built:** the footprint outline is the first loop of the traced outline, i.e. the loop of the last
  cell in the list — for a URL plan the part containing the last filled cell in row-major order; its flood fill then
  fills any hole. The editor instead keeps the loop of **largest area** when it writes the plan (§2.12), which is why
  the creator could describe "the largest part" while a hand-made URL behaves otherwise.
* **Replay check (CONFIRMED):** re-running this stage from the seed (`scratchpad/code/dwellings/sim/shape.py`) gives
  the recorded ground floor of `seed=12345&tags=medium` cell for cell (19 cells, the two-block shape of profile §2.3
  example 3), the recorded candidate counts 11/3/5/2/4 and rectangle counts 50/13/23/9/19 of seeds 260926501–505
  (profile §4.1), 11/11/9 candidates for seed 501 as small/medium/large (profile §4.2), and the five `medium,square`
  areas 21/24/24/20/16 (critic R11).

### 2.4 Entrance [READ `Specs.pickEntrance`, `Drafter.decodeEdge`]

Every footprint outline edge gets a weight from its neighbours' directions: **5** when the edges before and after run
the same way (the middle of a straight wall), **3** when it is a one-edge side between two convex corners (the tip of
a one-cell protrusion), **1** when one end is straight and the other convex, **0** when either end is a re-entrant
corner. The entrance is a weighted draw over the outline, so long straight walls win in proportion to their length and
an entrance never touches an inner corner. The entrance record is the door edge and its landing (the inside cell).

A URL `entrance` (four hex digits: row and column of the start node, then of the end node, in the untrimmed plan's
coordinates) replaces the drawn edge *after* the draw (the draw still consumes a number). The decoded edge is used
without checking that it lies on the outline: two nodes that are not neighbours give no edge and the build fails when
the landing is computed; a reversed boundary edge gives a landing outside the house (the build fails downstream); an
interior edge is taken as the entrance as it stands (§6 row C6). Only the editor refuses non-boundary entrances.

### 2.5 The partition of one storey [READ `Plan` constructor, `Plan.divideArea`, `Plan.getNotch`, `Plan.isNarrow`]

**Narrow cell** — a cell of an area that belongs to no 2 × 2 block of that area (this includes any cell with no
neighbour above and below, or none left and right). It is the one shape measure the whole generator uses: it decides
where cuts may start, whether a cut is kept, which rooms are corridors, door prices, and several role validators.

**The recursion** (each call receives a closed outline):

1. **Stop test.** The area becomes a room when its cell count is at most **6 × 2^m**, m = the mean of three uniforms —
   a threshold between 6 and 12 cells, most often near 8.5 (the average room size is a static set to 6 before every
   storey plan, 12 for the basement's coarse plan; the size-chaos exponent is 1). A second, rectangle-only rule exists
   but is switched off for every house.
2. **Cut start.** Two kinds of candidate, both on the area's own outline: *wall* candidates — every outline node in the
   middle of a straight run, the cut going perpendicular into the area; *corner* candidates — every re-entrant corner
   offers two cuts, each extending one of the two walls that meet there straight on into the area. A candidate is
   skipped when the inside cells it would start between are all narrow (cuts do not start inside corridors).
   `mechanical` takes corner candidates when any exist (else walls); `organic` takes wall candidates when any exist
   (else corners); untagged houses pool both kinds, one entry per candidate, and pick uniformly. No candidate → room.
3. **Trace.** The cut runs straight from its start node until it meets the outline again.
4. **Bend.** A cut longer than one edge bends with probability (its length ÷ 6): it keeps its first ⌊L/2⌋ edges (one
   more with probability equal to the fractional part of L/2), turns 90° left or right (even odds) and runs straight to
   the outline. This is the "bisection with a bend" in the creator's words.
5. **Split and judge.** The outline and the cut make two closed chains. Each part scores q = (non-narrow cells + 1) ÷
   (cells + 1); with `hallways` a part larger than 6 cells scores 1 and a smaller one scores (narrow cells + 1) ÷
   (cells + 1). The cut is **kept with probability (q₁ × q₂)²** and both parts recurse; otherwise **the same area is
   tried again from step 1** — a fresh stop threshold, a fresh candidate — so a rejected cut can end with the area kept
   whole. (Every tried cut, kept or not, is appended to a list of inner walls that nothing reads.)

So the default partition refuses cuts that leave thin slivers (they score low), `hallways` inverts that preference for
small parts (small thin parts are welcome, small fat parts are refused), and `mechanical`/`organic` only change where
cuts may start. The cut never looks at the room programme. With a stairwell, its stair cell is first made a one-cell
room of its own and the rest of the storey is partitioned around it.

### 2.6 Corridors and doors [READ `Plan.mergeCorridors`, `Plan.connectRooms`, `Plan.wallDoors`, `Door.getPrice`, `Room.link/unlink`]

1. **Corridor merging.** Rooms made only of narrow cells (other than the stairwell cell) are merged pairwise, repeatedly,
   when they share exactly one cell edge (end to end); pieces lying side by side are left apart.
2. **One door for every adjacent pair.** Adjacency = at least one shared cell edge (the stairwell room is adjacent only
   to its landing room, through its exit side). Rooms are visited in list order and each links to its unvisited
   neighbours, those sharing fewer edges first. The door edge is the shared edge that minimises cost(near cell) +
   cost(far cell), where a cell's cost is 1 + the number of its four neighbours inside its own room, doubled when the
   cell already touches a door; ties are drawn at random. Doors therefore sit at corridor ends and room corners and
   avoid cells that already carry a door.
3. **Pruning.** A door's price is f(room₁) + f(room₂), with f = 10 for a one-cell room and otherwise the room's count of
   non-narrow cells (a corridor costs 0, a big room a lot). (a) A door is marked redundant when some third room is joined
   to both of its rooms by doors that are each strictly cheaper — i.e., when the two rooms share a thinner neighbour.
   (b) A spanning tree grows from a random room by always adding the cheapest non-redundant door to a new room. (c) Of
   the doors left outside the tree and not redundant, **round(half) are removed at random and the rest stay**: these are
   the loops. JavaScript rounding sends one leftover door to removal, so a storey keeps a loop only when at least two
   non-redundant extra doors exist — which the redundancy rule makes uncommon. The price formula also explains why a
   corridor or hall ends up as the hub. A room graph is built from the surviving doors (used only by the secret passage).

Every candidate door is a `Door` object (hence one per adjacent pair, equal to the link count the profile saw); the price
is evaluated once per redundancy comparison and once per tree step, which is why the profile's "priced twice" identity
did not hold (critic D5).

### 2.7 Upper storeys [READ `House` constructor loop]

Each upper storey starts from the cells of the storey below. Unless `slab`, and only when the storey below has more
than one room, the generator looks at every room of the storey below that touches its outline and is neither the
spiral's corner room, the stairwell cell nor the stairwell landing's room; for each it tests whether the remaining cells
stay connected and scores the remainder by its compactness (cells ÷ bounding-box area). The best-scoring room (the
later one on a tie) is removed with probability best² ÷ (current compactness), which is certain whenever removal makes
the shape more box-like. **So each storey is the storey below minus at most one exterior room**, and the storey is then
partitioned afresh. `slab` skips the removal (all storeys share the ground outline). The basement is not in this chain.

### 2.8 Stairs, spiral, stairwell, trapdoor [READ `House.connectFloors`, `getStairCells`, `getStairDir`, `empty`; `Specs.rollSpiral/rollStairwell`; `Staircase`]

* **Ordinary stairs** (no spiral): one connection per adjacent storey pair, bottom-up, then the basement to the ground
  floor. A storey's stair candidates are its cells minus the landings (entrance, spiral corner, stairwell cell and its
  landing) and minus each door's cell on the room's own side, and minus two shapes: the middle of a one-cell-wide
  passage, and a cell at an inside corner of its room (two adjacent sides in the room but the diagonal between them
  not). The stair cell is a random cell that is a candidate on **both** storeys; afterwards it and its eight neighbours
  in the same room are struck from each storey's list, so two stair cells never touch inside one room. Each end gets its
  own direction: preferably one whose approach cell (behind) is in the room and whose forward cell is not (the flight
  runs toward a wall), otherwise any direction with an in-room approach. The pair of end directions picks the drawn
  form: opposite directions → one straight flight, equal directions → a U with a half-landing, perpendicular → an L.
* **Trapdoor:** when no common candidate exists the console prints the "trapdorr" line and a random cell common to
  both storeys and not yet used by a stair becomes a direction-less stair on both (drawn as a 0.3-cell square with a
  cross); if even that fails a second message is printed and the connection fails (for the basement this cancels it;
  between two storeys above ground the failure is ignored and the upper storey is left without a stair — a path the
  code does not guard, though it needs every shared cell to hold a stair already, so practically unreachable).
* **Stairwell** (`rollStairwell`): candidate cells are ground cells whose removal keeps the footprint connected, minus
  the entrance landing, weighted by their number of exterior sides (0 for interior cells, so the stairwell always sits
  against an outer wall); the landing is a random in-footprint neighbour. That cell becomes a one-cell room on every
  storey that contains it and the stairs are stacked there, each flight running away from the landing; its walls are
  drawn open toward the landing (door kind "open side") and every exterior edge of it gets a window.
* **Spiral** (`rollSpiral`): candidate edges are the edge just after a convex corner whose two sides each run at least
  two edges, excluding the entrance and the edge before it. The spiral is a **turret outside the footprint**: a 270°
  disc of radius 0.7 cell (default wall style) centred on that corner node, opening onto the corner cell through the
  first 0.7 cell of both corner walls. It serves every storey above ground, so no per-pair stairs are built above
  ground; a basement still gets an ordinary stair or trapdoor to the ground floor. On the top storey's roof it is a cone;
  in the elevation a tower with a spire.

### 2.9 Basement [READ `House` constructor]

When the basement roll succeeds, the ground floor is partitioned a second time as a throw-away plan with average room
size **12** (no stairwell, no house pointer); its **largest room** becomes the basement outline, so the basement is
one coarse "room" of the ground floor — typically 9–20 cells, and the whole ground floor when the ground floor is too
small to be split at that scale. The stairwell carries down only when that room contains both the stairwell cell and
its landing. The basement is then partitioned normally (average 6) and connected to the ground floor; if no stair or
trapdoor cell exists, the basement is discarded. This is the extra plan the profile counted.

### 2.10 Role assignment [READ `HouseType.assignRooms/assignSet/types2rooms/assignGeneric`, `RegularHouseType.getTypes`, `RoomType`, every `rooms.*`]

**Room order.** Rooms are listed storey by storey from the ground floor up, then the basement; within a storey they are
ordered by a depth-first walk over doors from the storey's start room (ground: the entrance room; spiral houses: the
spiral's corner room; basement: the room holding the up-stair; other storeys: the room holding the down-stair; fallback:
the first room). The walk backtracks along its own visit order rather than a stack, and a room it never reaches is left
out of the house's room list and never gets a role (with doors forming a connected tree this does not arise).

**The programme** (`RegularHouseType.getTypes`, drawn before any assignment): 1 or 2 "specials" (even odds) drawn
without replacement from thirteen — study, library, workshop, secret passage, laboratory, observatory, greenhouse,
chapel, studio, trophy room, armoury, lookout, vault — none with `generic`.
* **List 1** = living room, bathroom, bedroom, + the first special.
* **List 2** = kitchen, storage, hall, gallery, + the second special (if drawn), + one of study/library/workshop drawn
  uniformly (skipped only when it repeats a special already drawn), + one bedroom per storey above the ground floor, +
  bathroom and attic when there is more than one storey, + cellar when there is a basement. So even `generic` houses
  get a study, library or workshop candidate in list 2; list 2 is empty of specials only when the single special drawn
  equals the extra study/library/workshop.

**Assignment of one list** (`assignSet`): run N = rooms × roles trials; in each, note the generator state, shuffle the
rooms, then repeatedly draw a role at random (without replacement) and give it to the first unassigned room, in
shuffled order, whose validator accepts it — a role no room accepts is dropped. Keep the trial that leaves the fewest
rooms unassigned (stop early at zero). Then **reset the generator to the noted state of the best trial and replay it**.
There is no scoring beyond "fewest unassigned rooms"; the dominant cost is the N re-runs. List 1 runs over all rooms,
list 2 over the rooms list 1 left, then every room still without a role gets a fallback role, then every room is
furnished and lit (so furnishing is inside this stage's time, as the critic found).

**The empty-list clock seed** [READ `assignSet`; observed]: when list 1 has taken every room, list 2 runs with zero
rooms, zero trials, and the replay resets the generator with the "no seed" sentinel — **the clock**. Everything drawn
afterwards (furniture, lights, windows, chimneys, the name, and the next Enter seed) is then clock-seeded. The profile's
seed probe shows exactly this: `newDate = 1` on its two Enter houses (`701227701 small,organic` with rooms Living room +
Bedroom, `556371499 small` with Living room + Bathroom + Trophy room — every room a list-1 role) and 0 on the houses
with list-2 rooms. Such houses (at most four rooms in the whole house, every one taking a list-1 role — in practice
small one-storey houses; a basement vault can be one of them) are therefore not reproducible from their permalink
beyond walls, rooms, roles, door kinds and stairs.

**Fallback roles** (`assignGeneric`): the stairwell cell → the stairwell role (unnamed); a room with one real stair and
≤ 6 cells, or with two or more real stairs → "stairhall" (abbreviation SH); otherwise, rooms of more than 2 cells → a
"corridor" when every cell is narrow and it has more than one connection, else a plain "room"; rooms of 1–2 cells → an
unnamed empty role.

**Validators** (size = cells minus stair cells; "connections" counts doors, the entrance, stairs in the room and the
spiral; "narrow share" = narrow cells ÷ size; "above ground" = an upper storey, or the ground floor of a one-storey
house; "top floor" = the last storey):

| role | accepted when |
|---|---|
| living room | size ≥ 5, narrow share ≤ 0.5, not in the basement |
| bathroom | size ≤ 4, ≤ 1 connection, not the entrance room, not in the basement, its storey has more than one room |
| bedroom | above ground, size 4–8, narrow share ≤ 0.5, ≤ 1 connection not counting doors to bathrooms (see below) |
| kitchen | ground floor, size 4–6, narrow share ≤ 0.5, ≤ 2 connections |
| storage | size 2–5, ≤ 1 connection, not the entrance room |
| hall | size 2–8, ≥ 2 connections, holds the entrance |
| gallery | size ≥ 6, every cell narrow (a long corridor-like room) |
| cellar | basement, size ≥ 5, not all narrow |
| attic | top floor and the only room on it |
| study | above ground, size 4–6, narrow share ≤ 0.5, ≤ 1 connection |
| library | size 4–9, narrow share ≤ 0.8, ≤ 3 connections, not the entrance room, not in the basement |
| workshop | size 4–6, narrow share ≤ 0.3, ≤ 2 connections |
| laboratory | size 4–6, narrow share ≤ 0.3, ≤ 2 connections |
| armoury | size 4–9, narrow share ≤ 0.5, ≤ 1 connection |
| trophy room | size 4–9, narrow share ≤ 0.5, ≤ 2 connections |
| chapel | size 4–6, narrow share ≤ 0.2, ≤ 1 connection |
| studio | size 6–9, narrow share ≤ 0.4, ≤ 2 connections, not the entrance room, not in the basement |
| observatory | top floor, size 4–9, narrow share ≤ 0.2, ≤ 2 connections |
| greenhouse | top floor, size 5–9, narrow share ≤ 0.5, ≤ 2 connections |
| lookout | at least two storeys, top floor, size ≤ 9, at least half its outline on the storey's outline |
| vault | size ≥ 4, narrow share ≤ 0.3, ≤ 1 connection, in the basement if there is one, else on the ground floor |
| secret passage | size ≥ 3, every cell narrow, ≥ 2 connections, not the entrance room, not holding the spiral landing above or below ground |

The bedroom's exemption for bathroom doors never fires: it compares the neighbour's role with a *second* bathroom role
object created for that purpose, while the programme assigns a different bathroom object, so every door counts. This
is why no bathroom opens off a bedroom in the exported houses (critic B7): the 1.3.0 attachment is present in the
code but disabled by an identity mismatch.

**Loaded programmes** (`LoadedHouseType`, `rooms.Loadable`): a JSON5 file lists room definitions and two optional
lists; list 1 = the file's `primary` roles, list 2 = every other role in the file; the file's `generic` roles are tried
in order before the built-in fallbacks. A definition can set: display name, abbreviation, window ratio, leaf doors,
a seven-number furnishing preset (or none), and validator bounds — size min/max, narrow share min/max, storey index,
maximum connections, entrance yes/no, top floor, ground floor, basement, above ground, single room. The two files are
re-parsed for every house.

### 2.11 Door kinds, windows, chimneys [READ `House.assignDoors/spawnWindows/spawnChimneys`, `Plan.spawnWindowsExcluding`, `Room.spawnWindows`]

* **Door kinds.** All kinds are cleared, then rooms are visited in house order: a role with a door rule sets every door
  of its room (leaf doors for bathroom, bedroom, kitchen, storage, study, vault, chapel, laboratory, workshop; "open
  side" — no wall at all on that edge — for the stairwell); otherwise a room on the ground or an upper storey with
  exactly one connection gets a leaf door. Everything else stays an untyped opening (a gap in the wall; the JSON omits its
  kind). Later rooms overwrite earlier ones on a shared door. Basement rooms get leaf doors only through their role.
* **Windows.** Roles with a window rule go first and choose whole straight runs of their exterior wall at random until
  the count is met (bathroom 1; armoury, storage, vault, secret passage 0; bedroom a quarter of its outline edges;
  living room 0.4; greenhouse, lookout and the stairwell all). The rest of each storey above ground then gets
  density × (its exterior edges outside those rooms), with density **0.8 on the top storey and 0.1 less per storey
  below** (a one-storey house 0.8; `transparent` sets 1). Exterior edges are grouped into runs (one room, one
  direction; the entrance door and the spiral's two edges excluded) and whole runs are drawn with weight length²
  until the target is reached. `blank` skips this general pass, leaving only the role rules. Basements get no windows
  (their role windows are drawn and then cleared). The density is computed from the storey count without a floor, so a
  URL `floors` above 8 leaves the lowest storeys with a zero or negative target and no general windows.
* **Chimneys.** One random candidate cell per storey — never the spiral corner cell; for every storey but the top one
  also never the ground-floor entrance landing, and only cells outside the storey above and not touching it even
  diagonally (so on a one-storey house, whose ground floor is its top storey, the landing cell can take the chimney) —
  then a random subset of max(1, randomised round(ground cells ÷ 16)) of those storeys is kept; each is drawn on its
  storey's roof.

### 2.12 Furniture and lights [READ `Room.fill/defaultLight`, `Clutter`, `props.*`, `PropSet.available`, the role furnishers]

* **Abstract furniture** (`Clutter`): a room without its own furnisher gets the default preset; roles carry their own
  seven-number preset (piece size, wall pull, pieces per group, size decay, upright share, rectangle share, density).
  The default preset draws its piece size (0.05–0.45 cell, a folded four-uniform value), pull 0.6, up to 3 pieces,
  decay 0.8, upright share 0.7, rectangle share 0.8, density 0.4. The number of groups is a uniform integer from
  round(½ × density × cells) up to, but excluding, round(2 + density × cells); the groups take a random subset of the
  free cells (not a door cell, stair cell, entrance landing or spiral landing), one each, and hold 1..k pieces; piece
  *i* of *n* is the preset size times (1 − w + w·u) with w = decay^(n − i), so the first pieces keep nearly the full
  size and the later ones are shrunk more at random. A piece is a rectangle about twice as long as wide (probability
  √(rectangle share)) or a 16-sided disc; a group that is not pulled fully to the wall is turned by a small angle unless
  the upright roll keeps it square to the grid. Each group then **slides once**: its direction is away from the room's doors, stairs, entrance and spiral
  (offsets weighted by squared distance; random when the room has none), its distance is the wall-pull share of the
  free travel to the room outline — an outline with a point pushed half a cell into every door mouth, so doorways stay
  clear. It is a single ray-cast slide, not an iterative force layout.
* **Named props:** gallery, studio and trophy room place one statue on a free cell (not a door or stair cell, not a
  landing, and not a narrow cell that would block a passage) and light it; the chapel places an altar on the long wall
  farthest from its doors (or prints "No place for an altar?") and lights that wall; the secret passage finds the
  neighbour nearest the storey's start room (breadth-first over the room graph), and hangs a curtain of up to three
  edges over the shared door; the bathroom puts one fixture group at the cell farthest from its door. A bed prop exists
  but no role creates it.
* **Lights:** the default is a centre light at the room outline's straight-skeleton summit (the ridge point of greatest
  height), snapped to the nearest corner, edge midpoint or centre of a cell; basement rooms and corridors (all-narrow,
  more than one connection) get a wall light at the outline node (any lattice node of the room outline, not only a
  corner) least exposed to its windows and doors (sum of inverse squared distances, plus inverse distance to the
  entrance; ties drawn at random). **On a first build the window list is still empty when lights are placed** (lights
  are placed inside the role stage, windows after it), so only doors and the entrance count; Ctrl+Enter places lights
  while the previous assignment's windows are still listed. Corridors, 1–2-cell leftovers and the secret passage get a
  light that is switched off. Radius
  √(cells ÷ 2); power r ÷ (r + 1) for the centre light, (1 + r) ÷ (2 + r) for the others. The skeleton builder handles only
  edge events; when it stalls (common on rectilinear rooms) every vertex is jittered by 0.05 cell with the
  **unseeded** browser random and it is rebuilt — the only unseeded draw in the model, and the reason light positions
  can differ between two loads of one permalink.

### 2.13 The house name [READ `Namer.init/get`, `House.getTags`, `tracery.Grammar` (`selectRule`, `validateRule`, `eval`, `execute`), `tracery.DeckRuleSelector`, `RuleSelector`, `RuleSet.process/selectRule`, `Symbol`; the grammar asset's structure by script]

* **Source and generator.** The name is a Tracery expansion of a four-symbol grammar asset (§5). On first use the namer
  points the grammar engine's random source at the shared seeded generator (the engine's own default is the unseeded
  browser random, never used here) and makes every symbol draw its alternatives from a **deck**: without replacement,
  refilled when empty. The decks are session state: they survive from one house to the next. Before every later name,
  one draw decides (probability 0.3) whether all decks are refilled; otherwise only the flags are cleared.
* **Flags from the house.** The house hands over its tags minus the size and height tags, plus a derived size (`small`
  under 16 ground cells, `large` over 24, nothing in between) and a derived height (`low` for one storey or fewer storeys
  than half the square root of the ground area; `tall` for at least that root), upper-cased as flags.
* **Guarded alternatives.** An alternative may carry a condition before a guard marker: a number (a probability drawn
  from the generator), a flag, a negated flag, or a conjunction of these. A selected alternative whose condition fails is
  **discarded from the deck** and another is drawn, until one passes. In the shipped grammar the **house noun** symbol
  carries such conditions on 11 of its 12 alternatives (on the four derived flags: small, large, low, tall, with
  negations and conjunctions; one alternative is unconditional), and the title's optional adjective is a 10 %
  probability guard wrapped in a two-way inline choice (so about one name in twenty carries an adjective on fresh decks).
  The location and adjective symbols are unconditional. **So the house's derived size and height choose among the
  house nouns; the other tags are handed over but no alternative tests them.** The engine's second flag mechanism — a
  whole symbol overridden per flag — is unused (no such symbol in the asset). Correction: the draft of this section said
  the tags had no effect on the name; the asset's structure refutes that (checked by script, words masked).
* **A custom `name`** from the URL replaces the generated name and skips the grammar entirely (no draws).
* **Consequences.** The first name of a page load is a function of the seed and the house's derived flags; a later
  house's name also depends on the decks left by earlier names (rejected alternatives are consumed too), which is why a
  reloaded Enter permalink reproduced every plan layer but not the toast (profile §3.4, result 1 — CONFIRMED there,
  explained here). The name is not in the JSON; it becomes the export's file name.

### 2.14 The elevation [READ `model.Elevation`, `FacadeLayer`, `TowerLayer`, `PorchLayer`, `Layer`, `tinypubs.params.Dimensions`, `House.getElevations`, `ElevationScene` key handler; the `tinypubs` model and painters skimmed by grep — §9]

* **Style parameters are drawn before the seed is set.** The first act of building a house is the facade kit's
  parameter draw (the shared Tiny Pubs record): column width 35–45 units per cell and storey height 50–70 (each a
  mean of three uniforms across the range), roof slope, one to three window designs (a second with probability ⅔, a
  third with ¼ of that), plinth thickness and height, apron, a hip roof (or a castellated parapet when the elevation is
  toggled to fortified), door, gable-window, dormer, chimney, sign, lamp and spire designs, one of two roof-surface
  painters (¾ against ¼), stonework with probability plinth height ÷ 20, half-timbering with probability 0.1 (a second
  pattern with ½). Only then is the generator reset to the house's seed. **The facade style of a loaded permalink
  therefore depends on the page-load clock, and that of an Enter house on everything drawn before it**; the elevation's
  geometry is reproducible, its style is not. No lane compared elevation views between loads, so this was never seen.
* **Geometry is a projection of the plan** (built lazily, per side, when the elevation view first asks). For one side
  the width is the grid's extent across that side and the height the number of storeys above ground. The depth planes
  are the positions of every storey's outline walls that face that side, plus the spiral turret's plane and the
  entrance's plane, sorted front to back. At each wall plane every cell column is tested, storey by storey, for whether
  the cell behind that wall position belongs to the storey; each run of ground-occupied columns becomes one facade whose
  sections carry per-column heights (the unbroken stack of occupied storeys from the ground up), the door column where
  the plan's entrance edge lies on that wall, and **windows at exactly the plan's window edges** on that wall. The widest
  full-height section gets a chimney when it is wider than two columns (the elevation's chimney is its own; it does not
  read the plan's chimney cells). The four sides are built together the first time the elevation is asked for, and
  each draws one flag from the shared generator (a facade separator, probability (storeys − 1) ÷ √width) — four
  view-time draws that move the next Enter seed (§4). The elevation
  view's R key re-draws the style record; F toggles fading of the planes behind; D a dark palette.

### 2.15 Roofs, walls and the plan drawing [READ `view.RoofStack`, `_RoofStack.Layer`, `RoofPainter`, `WallsView` presets `view.architecture.{Simple, Castle, LogHouse, Modern, SciFi}`, `WindowView`, `DoorView`, `view.Style` statics; `StaircaseView`, `PlanView`, `FloorMap`, `Shading`, `GridView`, `Hatching`, `EarthView`, `LabelsLayer`, `ClutterView`, `EntranceView`, `ArrowView` skimmed for their constants and generator use — §9]

* **Which roofs are shown.** Each storey owns one roof layer. Viewing storey *n* shows the roofs of the storeys below
  *n* underneath it; every one but the storey directly below is veiled by a paper-coloured overlay (alpha 0.1 with
  detailed roofs, 0.3 with simple ones). *Shrink* pulls a lower roof's eave in by the factor 2 ÷ (1 + its distance
  below the viewed storey); the R view shows every roof. The roof menu's Simple / Detailed / Hidden and Shade / Fade /
  Shrink are these switches (critic gap 4 answered).
* **The detailed roof** of a storey: take the storey outline's corner polygon, offset it outward (mitred) by the eave —
  the outer wall thickness less half the inner thickness and half a stroke — and build its straight skeleton (§3.5).
  When the builder stalls, every vertex is jittered **with the seeded generator** (radius up to 0.1 cell, a centred
  mean-of-three value; direction uniform over a half turn) and the skeleton rebuilt; afterwards every skeleton node is
  snapped to the half-cell lattice, edge directions are rounded to whole axis steps and the true outline is restored.
  One **hip face per outline run** (the polygon from the run's two corners up the skeleton), so faces = outline
  corners (critic R12/B1 CONFIRMED, now by the code). Each face is filled in the roof colour scaled by 1.2 to the power
  of (fixed light direction, −150°, against the face's outward direction) — four shades on a rectilinear outline — and
  hatched with dashed tile courses 0.08 cell apart whose dash patterns come from a **session pool** of up to ten
  random patterns (a static list). Ridge caps run along every skeleton bone; each plan chimney of the storey is a
  0.4-cell square with a 0.2-cell flue. The skeleton can also turn a ridge end into a gable, but plan roofs never ask for
  it: hips only.
* **The simple roof**: the outline in the paper colour with a short 45° hip stub at every corner.
* **The spiral turret's roof** (top storey only): a cone of wedge faces (about circumference ÷ 0.08 of them) shaded by
  the same light, with dashed rings and radial courses whose phase is one generator draw.
* **Walls and gaps.** Five wall-style presets (§5) set inner and outer wall thickness, door gap, entrance gap, window
  length, spiral radius, entrance-stoop steps and three style flags (landings, rounded corners, insulated windows).
  Every door of every kind is a gap of the style's door width; the stairwell's open side (the NULL kind) is a gap of the
  whole cell side less the inner thickness.
* **Windows.** A window is a bar of the style's window length centred on its cell edge: an ink stroke as thick as the
  outer wall, extended by one stroke width at each end, under a window-colour stroke two stroke widths thinner. With the
  default style that is 0.28 + 2 × 0.02 = **the 0.32-cell module the profile measured** (§7 there); the other styles'
  windows run 0.16–0.4.
* **Door glyphs** (D key): hidden (the default: gaps only) → simple (a closed leaf bar) → open (a leaf swung 60° with
  its arc). **Only leaf doors (the REGULAR kind) get a glyph**; untyped openings stay gaps — which is why the
  door-mode stroke counts never equalled a storey's door count (profile §4.5, critic R16).
* **Stairs.** A straight flight is drawn as treads at a 0.1-cell pitch (hence the eleven fills of a one-cell flight);
  the pair of end directions picks straight, U (two half flights and a turn) or L (a turning flight); a trapdoor is a
  small square with a cross.
* **View-time draws from the shared generator** (each moves the next Enter seed, §4): the roof jitter and dash patterns
  (drawn once per roof layer, the first time it is displayed), the turret's course phase, the grid's *planks* and
  *tiles* modes, the black-and-white scheme's hatching (Poisson-disk clusters over the plan's bounding rectangle and
  the turret disc) and the elevation's per-side flag and style re-roll.

### 2.16 Editor, permalink, exports and re-rolls [READ `BlueprintScene`, `BlueprintView.update/drawEntrance`, `Drafter.encodeBitmap/encodeEdge/decodeEdge`, `Blueprint.updateURL/fromURL`, `JsonExporter`, `House.reroll/reassignRooms`, `PlanScene.reroll/rerollRooms`, `DwellingScene.onKey/showParams/onPermalink`; `Export` and `system.Exporter` skimmed]

* **The editor** is an 11 × 11 grid. On opening it copies the current ground floor re-centred (offsets
  ⌊(11 − w)/2⌋ and ⌊(11 − h)/2⌋) and carries the current entrance edge. Cells are painted by dragging; *Random* draws a
  polyomino with stretch bounds of 1–2 and 2–3 cells, placed with a randomly rounded centring; *Box* draws a rectangle
  of 10 + 25u² cells (10–35, skewed small) with aspect 2^(2u − 1) (½ to 2); Backspace clears; holding Shift switches
  to wall mode, where clicking an outline edge toggles the entrance. **The displayed shape is the outline loop of
  largest area**, and entrance buttons exist only on that loop's edges.
* **Submit** fills that loop (holes filled, every other part dropped), writes it as an 11 × 11 bitmask (row-major,
  four cells per hex digit, low bit first; the trace line the profile saw comes from this encoder), writes the entrance
  as four hex digits — row and column of its start node, then of its end node — only when it lies on the loop, keeps the
  seed and tags, builds the house and rewrites the URL. A URL entrance that is not on the loop (an interior edge) is
  therefore neither shown nor written back.
* **The permalink** holds `seed`, `tags`, `floors` (when above 0), `plan`/`w`/`h`/`entrance`, `name` (a custom name)
  and `rooms` (`gothic` or `tavern`). `view` (`plan` or `elevation`) is read at load and never written. Neither re-roll
  is encoded.
* **The JSON export** lists the storeys above ground bottom-up and then the basement. Per storey: its level (−1 for the
  basement); its rooms (the room's custom name, else its role name capitalised, omitted when empty — the stairwell and
  the 1–2-cell leftovers are the unnamed rooms — and its cells as row/column pairs); **its doors = every connection that
  survived the pruning of §2.6**, each as the first room's cell and side, with its kind when one is set (REGULAR = leaf
  door, NULL = the stairwell's open side; untyped openings carry no kind); its windows (cell and side); its stairs (cell,
  direction n/e/s/w — **null for a trapdoor** — and whether it goes up). The house adds the exit (the entrance edge) and
  the spiral's entry edge. There is no seed, tag, name, furniture, light, chimney, roof or elevation in it. The PNG and
  SVG exports draw the plan at 200 px (PNG) or 100 units (SVG) per cell with a three-cell margin round the ground
  floor's bounding box; facades at five times their unit size with a 1 000-px margin; multi-storey sheets side by side.
* **Re-rolls.** *Shift+Enter* re-partitions every storey and the basement inside its existing outline, re-links the
  stairs, and redoes roles, furnishing, lights, door kinds and windows — from the live generator state, with no reset;
  the upper-storey outlines, chimneys, name and facade style are kept. It differs from a first build in three ways: the
  basement is re-planned without the stairwell even in a stairwell house, a failed basement connection keeps the
  basement instead of dropping it, and nothing is written to the URL. *Ctrl+Enter* clears every role, draws a new
  programme and assigns it, then redoes door kinds, windows, furnishing and lights on unchanged walls and stairs; it
  rewrites the URL with unchanged values. The Parameters dialog and *New house* make a new blueprint whose seed is the
  generator's next raw state; the Permalink dialog parses the pasted query and builds from it.

## 3. The geometry toolkit

Everything the model does happens on the integer cell lattice of §2 (conventions above §2.1); the continuous-geometry
kit serves the lights, the roofs, the furniture and the painters. What each primitive really does, with its edge cases:

### 3.1 The lattice [READ `utils.Grid`, `Cell`, `Node`, `Edge`, `Dir`]

* **Construction.** A grid of w × h cells owns (h + 1) × (w + 1) nodes and, for every node, a directed edge to each
  orthogonal neighbour tagged with its compass direction; a directed edge's cell is the one on its right-hand side, and a
  cell's own side edges run clockwise round it. Node and cell lookups return nothing outside the grid, and nothing
  guards the callers — which is how a malformed entrance code crashes the build (§2.4). Every storey, the basement and
  the throw-away plan share the ground floor's grid; exports read the ground grid for every storey.
* **Outline tracing** (`outlineEx`): collect every cell side whose neighbour is not in the set (in input order, north,
  east, south, west per cell), then repeatedly pop the **last** collected edge and chain from its end node, preferring
  a right turn, then straight, then a left turn among the edges still unused, until the loop closes. The result is a
  list of loops — outer boundaries clockwise, hole boundaries the other way — whose first loop is the one containing
  the last boundary edge collected; `outline` keeps only that first loop. Two cells touching at a corner stay in
  separate loops (the right-turn preference).
* **Area from a loop** (`contour2area`): flood fill from the first edge's cell, crossing any cell side that is not in
  the loop. Holes are therefore returned as area; a loop that does not close off a region would leak to the whole grid.
* **Connectivity** (`isConnected`): grow from one cell by repeated linear scans for a 4-neighbour — quadratic, exact.
* **Trimming** (`cloud2gridNArea`): a point cloud becomes a grid sized to its bounding box, with the offsets kept (the
  entrance decoder subtracts them).

### 3.2 Chains and areas [READ `ChainUtils`, `AreaUtils`, `PolyUtils`]

* A chain is a list of directed edges. Helpers find the edge leaving a node, slice a chain between two nodes (wrapping),
  step to the next or previous edge, find the first corner, merge straight runs into long edges (corner to corner), test
  for a rectangle (exactly four long edges), flood-fill from a chain's right side (the editor's fill) and convert to a
  polygon of node positions (x = column, y = row).
* Cell sets: bounding box; **compactness = cells ÷ bounding-box area** (the setback score, §2.7); the **largest
  inscribed axis-aligned rectangle** by exhaustive search over every top-left cell and every size, preferring larger
  area, then the wider and more nearly square of equal areas (the label box); a boolean bitmap (the editor's encoder);
  a 4-connected flood fill restricted to the set (the stairwell's cut-cell test).
* **Mitred outset** of a polygon (the roof eave, the basement's earth band): each vertex moves along the sum of its two
  edge normals by d ÷ √((1 + cos θ)/2); a hairpin (θ = 180°) would divide by zero — unreachable on cell outlines.

### 3.3 Narrowness [READ `Plan.isNarrow`]

A cell is narrow in a cell set when no 2 × 2 block of the set contains it: explicitly, when it lacks both vertical
neighbours, or both horizontal ones, or when for each of its four diagonal quadrants the diagonal or one of the two
flanking neighbours is missing. It is recomputed against the set being judged (a candidate part, a room), so a cell can
be narrow in a room and not in the storey. Every rule that shapes a plan reads it: cut starts, cut acceptance, corridor
merging, door prices, the corridor fallback, prop placement and seventeen of the twenty-two regular validators (all but the bathroom, storage, hall, attic and lookout).

### 3.4 The partition's cut in lattice terms [READ `Plan.divideArea`, `getNotch`, `ChainUtils.slice/findEdge`, `Grid.revertChain`]

A cut is a chain of lattice edges from an outline node into the area and on until it reaches a node of the outline
again; the two parts are the outline sliced at the cut's two ends, each closed by the cut (one side reversed). Straight
cuts can end at any outline node, so a cut may leave an L, a U or a stepped part; bends (§2.5 step 4) turn once, never
twice. The cut never tests the parts for connectivity: a cut through a one-cell neck simply yields two parts.

### 3.5 The straight skeleton [READ `geom.Skeleton`, `Rib`, `_Skeleton.Node`, `_Skeleton.Segment`, `GeomUtils.intersectLines`; callers `Light.getSkele/getSummit`, `RoofPainter.getSkele`]

* **Model.** Each polygon vertex starts a bisector ray between its two edges, parameterised so that moving one unit
  along it raises the wavefront by one unit (the bisector is scaled by 1 ÷ √((1 + cos θ)/2)); a reflex leaf's ray is
  flipped inward. Two nearly parallel edges (cosine above 0.99999) get the perpendicular instead.
* **Events.** Each step considers, for every ray, where it meets the rays of its two neighbouring edges ahead of both
  (both parameters non-negative), keeps the nearest, and applies the globally earliest meeting: the two rays end at a new
  node at that height and a new ray starts there between the two outer edges. With two rays left they are joined as the
  root bone. **Only these edge events exist — there are no split events** (a reflex vertex's ray reaching a non-adjacent
  edge), and a ray between two exactly opposite walls has no finite speed under this parameterisation. When no pair of
  neighbouring rays meets ahead while more than two remain, the builder stops with rays left over — a stall.
* **Recovery.** Both callers retry after jittering the polygon: the lights with the unseeded browser random (0.05 cell,
  any direction; one draw per corner per retry — the 5-cell L room of the plan probes stalls once, which is its seven
  recorded unseeded calls: one at start-up plus six corners, `plan3` draw records), the roofs with the seeded generator
  (§2.15). The roof then snaps the skeleton to half cells, which hides the jitter; the light snaps only its final point
  (§2.12), so a summit lying between two snap points can land on either — the one unseeded effect in the plan drawing.
* **Faces and gables.** A face is read by walking from an edge's two leaves up their parents while the node still
  belongs to that edge. Gables (moving a ridge end onto the wall) are implemented, unused by the plan.

### 3.6 The polygon kit [READ `polygons.PolyCore/PolyCreate/PolyTransform/PolyCut/PolyBounds`, `GeomUtils`, `Chaikin`, `Rect`, `Dot`]

Signed shoelace area; centroid as the plain mean of the vertices (not the area centroid — used only to aim a furniture
group's slide); rectangle and regular n-gon builders; a polyline thickened into a polygon with mitred joins and optional
end extensions; translation and rotation (in place or copied); axis bounds; **segment–polygon piercing** (all crossing
parameters, sorted — the roof and earth hatching); an equal inset that skips near-reversals (cosine below −0.999); line
intersection returning both parameters (null only for exactly parallel lines; it divides by the larger direction
component for stability); linear interpolation; ¼–¾ Chaikin corner cutting with pinned points (the curtain, the stair
arrows, the elevation's ground line).

### 3.7 Search and sampling [READ `geom.Graph`, `geom.Node`, `PoissonDisk`, `PoissonDiskRect/Circle/ShapeCollection`, `PoissonPattern`]

* **Room graph path search**: named A-star, but with no heuristic, unit link weights and a first-in-first-out open
  list it is a breadth-first search; the path is returned goal-first. Only the secret passage uses it.
* **Poisson disk** (the black-and-white hatching): the usual grid-accelerated dart thrower — 30 attempts per active
  point in the annulus [r, 2r) inside a rectangle, disc or union of shapes, drawing from the shared generator.
* **Periodic Poisson pattern** (the facade stonework): 50 attempts per active point at 1.0–1.1 × the spacing, wrapped
  on a torus so the tile repeats seamlessly, with an optional per-point jitter; tiled over a shape.

### 3.8 Tolerances in one place

Parallel-edge test 0.99999 (skeleton); summit selection 0.999 × the skeleton's height; light jitter 0.05 cell
(unseeded); roof jitter ≤ 0.1 cell (seeded); light snap to the nine half-cell points of each cell; roof snap to the
half-cell lattice; line intersection exact zero test; equal-inset reversal cut-off −0.999. The model itself uses no
floating tolerance at all: every decision is an integer test on cells and edges, except the random thresholds.

## 4. Randomness

### 4.1 The generator [READ `utils.Random`, `ArrayExtender` statics]

One global generator: the Park–Miller "minimal standard" multiplicative congruential generator with multiplier 48271
and modulus 2³¹ − 1; a draw advances the state and returns state ÷ modulus. Its state is 1 at boot. The compiler inlines
almost every draw; only the array helpers (uniform pick, pick-and-remove, insertion shuffle, subset = shuffle then
prefix, weighted pick) and the name grammar's selectors call the function — so the profile's per-house `Random.float` counts (467–2 632) count only those
helper draws and are a lower bound on the draws made. The shuffle inserts each element at a uniformly drawn position of
the growing output (one draw per element). The weighted pick returns the first element on an all-zero weight list.

### 4.2 Seeding and reset points [READ `Random.reset`, `Main`, `Blueprint`, `House`, `HouseType.assignSet`]

* `reset(s)` sets the state to s; `reset()` or `reset(−1)` sets it to the clock (milliseconds mod 2³¹ − 1).
* **Resets per build**: at page start (clock); at house construction, to the seed — *after* the facade style draw
  (§2.14); and once at the end of each `assignSet`, to the noted state of the best trial, to replay it (§2.10). So a cold
  load makes four resets and a regeneration three — the profile's 4 / 3 (§1 there) explained.
* **The zero-trial case**: when the second programme list meets zero rooms (every room took a list-1 role — small
  houses of two to four rooms), `assignSet` has no best trial and resets with the no-seed marker, i.e. **to the clock**.
  Everything drawn afterwards — furniture, wall-light ties, role and general windows, chimneys, the name, the facade
  flags and the next Enter seed — is then clock-dependent, while walls, rooms, roles, door kinds and stairs are not.
  CONFIRMED against the seed probe: in session A both Enter houses (`701227701 small,organic`: living room and bedroom;
  `556371499 small`: living room, bathroom, trophy room — every room a list-1 role) show one clock read whose stack runs
  through `assignSet`; the houses with list-2 rooms show none (`_probes/seed/session{A,B}/steps/steps.jsonl`
  `dateCtor`/`dstacks`). The critic's D16 ("0–1 per generation") is this rule.
* **A new seed is the next raw state** of the generator (not a scaled draw): Enter, a tap, *New house* and the
  Parameters dialog all take it. A URL seed is used as the state as it stands; seed 0 means "none" and draws one.

### 4.3 Stream order inside one house [READ the stage classes of §2]

Facade style (pre-reset) → reset to seed → one discarded step → a size draw when the tags carry none → footprint candidates (and the entrance's weighted
draw, always consumed even when a URL entrance replaces it) → storey count (only when `floors` is absent) → stair roll
(two or more storeys) → spiral edge or stairwell cell → basement roll (unless the tag forces it) → the ground storey's
partition, then for each upper storey its setback roll and its partition → per adjacent pair the stair cell and end directions (or the
trapdoor cell) → the basement's throw-away plan, its real plan and its stair → programme (special count, a 13-element
shuffle, the extra study/library/workshop) → list 1: N trials, rewind, replay → list 2: the same (or the clock) →
furnishing and lights, room by room → role windows then general windows, storey by storey → chimney cells and the
kept subset → name (deck draws; after the first house one refill roll) → URL. Because the replay rewinds to the best
trial's starting state, the draws of every later trial are discarded and the rest of the house continues from inside the
trial sequence — the tail of the stream depends on which trial won, not on how many were run.

### 4.4 What depends on interaction history

1. **The next seed**: every draw since the last reset — the house's own tail, plus view-time draws: roofs displayed
   for the first time (jitter, dash patterns), the grid's planks/tiles modes, the black-and-white hatching, the
   elevation's per-side flag and style re-rolls, the editor's *Random* and *Box*, and both re-rolls. This is the
   profile's §3.4 result 3, now named draw by draw.
2. **The facade style** of every house (drawn before the reset).
3. **The name** after the first house of a page load (decks persist, §2.13).
4. **The roof dash patterns** (a session pool) — render only.
5. **The light positions** in rooms whose skeleton stalls (unseeded jitter, §3.5) — render only.
6. **Everything after the assignment in an all-list-1 house** (the clock, §4.2).

What a permalink reproduces, therefore: footprint, storeys, partition, doors, stairs, roles and door kinds always;
windows, furniture, chimneys and a fresh load's name unless the house is an all-list-1 house; never the facade style,
never a re-roll. The Enter chain is a deterministic function of the loaded page and the key history only until it
passes through an all-list-1 house; from there on its seeds come from the clock.

### 4.5 Replay receipt (CONFIRMED, executed this session)

`scratchpad/code/dwellings/sim/shape.py` re-implements, in its own words, the generator, the discarded step and the
footprint drafter (templates read from the bundle at run time, never stored): `12345 medium` → the recorded 19-cell
ground floor (profile §2.3 example 3, the same two-block shape); seeds 260926501–505 `medium` → 11 / 3 / 5 / 2 / 4
candidates (profile §4.1); seed 501 `small` / `large` → 11 / 9 candidates (profile §4.2); the five `medium,square`
houses → 21 / 24 / 24 / 20 / 16 cells as 3 × 7, 6 × 4, 6 × 4, 5 × 4, 4 × 4 (critic R11). Output in
`sim/shape.out.txt`. `sim/specs.py` carries the same replay through the specification stage (the entrance's one draw,
the storey law, the stair roll and the spiral or stairwell picks, the basement roll) and compares it with every house
the profile lane walked (`captures/dwellings/_measure/floors.json`): **92 / 92 ground-floor cell counts, 92 / 92 storey
counts and 92 / 92 basement presences match**, and the stair modes it predicts — 10 spiral houses (5 tagged, 5 rolled)
and 30 stairwell houses (5 tagged, 25 rolled) among the 52 multi-storey ones — are exactly the critic's coverage counts
(R7 "spiral 10/10"; D10 "rollStairwell ran in 30 of the 42 multi-storey non-spiral houses (5 tagged, 25 untagged)").
Output in `sim/specs.out.txt`. This settles the storey law, the stair-roll probabilities' draw structure and the
basement law n/(n + 1) as CONFIRMED by replay, not by reading alone.

## 5. Data assets present — named and shaped, never copied

| asset (where) | shape | ranges and a few example values |
|---|---|---|
| footprint templates (`Polyomino` statics) | 12 patterns on a 3 × 3 layout, as short strings | the four tetrominoes that fit 3 × 3 (every one but the straight bar) and the eight pentominoes that do, one orientation each |
| size bands (`Specs.pickShape`) | three cell ranges | small 10–16, medium 16–24, large 24–34; the editor's limit 11 × 11 |
| tag vocabulary (`Tags`) | 16 tags, one-line descriptions, 5 exclusive groups, random-tag odds | odds in §2.1; descriptions paraphrased in profile §2.2 |
| regular programme (`RegularHouseType`, `rooms.*`) | 22 role records + 5 fallback roles; the 13-role special pool | validator bounds in §2.10 (sizes 2–9 cells, narrow shares 0.2–0.8, connections 1–3); abbreviations only for bathroom and stairhall |
| furnishing presets (the role furnishers, `Clutter.fill`) | seven numbers per role: piece size, wall pull, pieces per group, size decay, upright share, rectangle share, density | size 0.2–0.5 (0 = drawn), pull 0–1, pieces 1–10, density 0.1–10 (a greenhouse and a cellar pack densely) |
| Gothic programme (`gothic.json5`, 3 221 B) | 29 role definitions; a primary list of three everyday roles (a kitchen among them); no generic list | fields used: size bounds 2–9, narrow-share bounds 0–1, maximum connections 1–3, window ratio 0–1, leaf doors, furnishing presets, entrance / top-floor / ground-floor / basement / above-ground / single-room flags; example keys: ballroom, crypt, nursery |
| Tavern programme (`tavern.json5`, 1 084 B) | 7 role definitions; a primary list of three; a generic fallback list of three | size bounds 2–6, maximum connections 1–2; example keys: common, guest, dormitory; the guest role is both primary and a fallback, so leftover rooms become guest rooms |
| name grammar (`grammar.json`, 899 B) | 4 symbols: a title rule, 11 location forms, 12 house nouns (11 of them guarded by conditions on the derived small/large/low/tall flags), 7 adjectives; inline alternatives; one 10 % optional adjective | outputs seen: "Lodge By The Sea", "Hut In The Woods", "Mountain House", "Lakeside Lodge" |
| colour schemes (five ~500-B JSON files: natural, wooden, plain, blueprint, bw) | 16 keys each: nine colours, three alphas (grid, ambient occlusion, lights), two stroke widths (× 10), the label font (size 18–28), a hatching flag | the default scheme's nine colours are recorded in profile §2.4 |
| wall styles (`view.architecture.*`) | 5 records of 7 numbers + 3 flags | inner wall 0.08–0.26, outer 0.16–0.3, door gap 0.3–0.5, entrance gap 0.35–0.6, window 0.16–0.4, spiral radius 0.6–0.8, stoop steps 1–5; the default: inner 0.1, outer 0.2, window 0.28, spiral 0.7 |
| roof constants (`RoofPainter` statics) | 5 numbers | tile course 0.08, tile length 0.24, face shading base 1.2 (turret 1.3), light from −150° |
| facade kit (`tinypubs.params.*`, 15 records) | the style draw of §2.14 | column 35–45, storey 50–70 units |
| colour names (`utils.ColorNames`) | a nearest-name table for the palette dialog | not used by the model |
| fonts (two WOFF files, 22 KB and 21 KB) | Share Tech Regular and Mono | third-party; labels and UI |

## 6. Corrections to the profile, the critic and the confidence file

Sources abbreviated: **pf** `profile-dwellings.md`, **cr** `_critic-dwellings.md` (D = contradiction row, R = re-derivation,
B = binding ruling, T = thin spot), **ex** `dwellings-exports.md`, **po** `dwellings-posts.md`, **cf**
`docs/confidence/dwellings.md` (row ids), **ru** `docs/confidence/dwellings-ruling.md`. "ARCH" = `docs/ARCHITECTURE.md`.
Grade of every "code says" cell: [READ] in the class and method cited in §2–§4 unless marked; CONFIRMED where a replay
or a recorded stack is named.

| # | claim (where) | what the code says | matters for |
|---|---|---|---|
| C1 | Ground plans are rectangle unions accepted by unknown "shape tests (compactness threshold, bounding-box limits)"; `findLargestRect`/`compactness` judge candidates (pf §4.2, headline 4; cf B1) | The only acceptance test is the cell count inside the size band; candidates are one of 12 three-by-three templates with random column/row stretches and ⅓-odds one-cell side growth (§2.3). Compactness is the upper-storey setback score, the largest rectangle is the label box. CONFIRMED by replay (13/13 recorded shapes and candidate counts) | ARCH §2.6 (the plan rung takes the composed footprint — no drafting to copy); pf §4.2 |
| C2 | Storeys: `low` 1–2, untagged 1–3/1–4, `tall` 3–6; the probabilities "cannot be known" (pf §4.3, §8; cf B2 A 0.45) | b = √(ground cells) − 1; untagged round(b × mean of three uniforms), `low` round(b × a folded four-uniform value), `tall` round(b × (1 + ½ × that)); clamp 1–8; a URL `floors` is unclamped (§2.2). CONFIRMED by replay, 92/92 storey counts | ARCH §2.6 `Heights.floors` (ours comes from the wing, not a roll); pf §4.3 |
| C3 | Basement probability ≈ 0.78 whatever the storey count; the creator's 2024 "50 % for a single storey" is not this build (cr D8, B6, R24) | The roll is **n/(n + 1)** for n storeys above ground: ½, ⅔, ¾, … (§2.2). The creator's statement *is* this build; the critic's 11/14 single-storey sample was a 3 % tail. CONFIRMED by replay, 92/92 basement presences | ARCH §2.6 Basements and §13.5's descriptive baseline row (J-A29.01) — the baseline to quote is n/(n + 1); cr B6 |
| C4 | Basements are "a size target of 9–20 cells" / "capped near 15" (cr B6, D7; pf §4.3) | The basement outline is the **largest room of a throw-away coarse partition** of the ground floor (average room size 12, threshold 12–24 cells), then partitioned normally; the whole ground floor when it is too small to split at that scale (§2.9). The "target" is that coarse room size | ARCH §2.6 Basements (ours: inset ground ring, not a coarse room); pf §4.3 |
| C5 | The upper-storey outline rule is unknown (pf §4.3, §8; cf B3 A 0.35) | Each storey is the one below minus at most one exterior room, chosen as the removal that leaves the most box-like connected remainder and applied with probability best² ÷ current compactness; the spiral corner room, the stairwell cell and its landing's room are never removed; `slab` skips it (§2.7) | ARCH §2.6 (our storeys come from `Wing` heights — no setback roll); pf §4.3 |
| C6 | The partition cuts from a **notch = re-entrant corner**; `mechanical` cuts "straight across the bounding extent", `organic` "along the outline's own edges" (pf headline 5, §4.4; po §2(c)) | Cut starts are of two kinds: the middle of any straight outline run (cut perpendicular) and each re-entrant corner (two cuts, extending either wall). `mechanical` prefers corners, `organic` prefers straight runs, untagged pools both; every cut is straight to the outline and may bend once (probability length ÷ 6, at about half its length) (§2.5). "Notch" = the chosen cut start, not only a corner | ARCH §2.6 plan rung step 4 (`bisect`, `follow` patterns: ours are our own rows; the reference's `organic` is *not* a parallel cut); pf §4.4 |
| C7 | The stop size and the acceptance tests between levels are unknown (pf §4.4, §8; cf C1 A 0.40) | Stop when cells ≤ 6 × 2^m, m the mean of three uniforms (6–12 cells); a cut is kept with probability (q₁ × q₂)², q = (non-narrow cells + 1) ÷ (cells + 1); a rejected cut re-tries the same area from the stop test (§2.5) | ARCH §2.6 step 4's stop rule (ours: target areas); §13.2's plan bars; pf §4.4 |
| C8 | `hallways` adds "corridor pieces and nooks joined by openings rather than doors" (pf §4.4; cr D11) | `hallways` only changes the cut score: parts larger than 6 cells always pass, smaller parts score by their **narrow** share, so thin pieces are welcome. Every adjacent pair of rooms still gets a `Door` and the same pruning; an "opening" is a door whose kind is left unset (§2.6, §2.11). There is no door-less connection | ARCH §2.6 (`spine` pattern and circulation share); pf §4.4 |
| C9 | "Every storey and every house is a tree" (ex headline 5; pf headline 6); "trees in 12/12, loops rare and unverified" (cr B4, D2) | A priced spanning tree over the non-redundant doors, then **round(half)** of the remaining non-redundant doors removed at random, the rest kept as loops; a door is redundant when a third room joins its two rooms by two strictly cheaper doors (§2.6). Loops exist whenever ≥ 2 non-redundant extras exist — uncommon because redundancy removes most. B4's "our rung must not assume a tree" stands, now with the mechanism | ARCH §2.6 step 5 (circulation roots; decide loops explicitly), §13.2 bars; cr B4 |
| C10 | `Door.getPrice = 2 × Door.new` (pf §4.5) — struck by cr D5 / B3; the connection algorithm "[INFERRED] a priced spanning connection" (cr B3) | Price = f(room₁) + f(room₂), f = 10 for a one-cell room else its non-narrow cell count; the price is evaluated once per side in the redundancy test, twice per third-room comparison and once per candidate per tree step — hence the measured 3–7 ratio. The algorithm is read (C9) | ARCH §2.6 (door placement rule is ours); cr B3 |
| C11 | "The exported doors are not simply the surviving `Door` objects … some openings (the `NULL` stair-shaft sides, some type-less openings) are not `Door` objects" (cr R16, B3) | Every exported door, the stairwell's `NULL` side included, is a surviving `Door` of a real storey plan (the exporter lists each plan's doors after pruning). The throw-away basement plan makes further `Door` objects that are never exported, so `Door.new − Room.unlink` can only be ≥ the JSON count; the four houses where the counts run the other way point at the coverage counts, not the model (PLAUSIBLE: inlined optimised calls go uncounted) | ARCH §11.1 (export of openings); cr R16 |
| C12 | Door types: `REGULAR` a leaf, absent an arch, `NULL` an open side at stair shafts (ex §1.4) | Kinds are set after roles: the roles with a door rule set all their doors (leaf for nine roles; `NULL` for the stairwell); otherwise any room above the basement with exactly one connection gets leaf doors; later rooms overwrite earlier ones on a shared door; `DOORWAY` is declared and never used. Kinds do not affect connectivity (§2.11) | ARCH §2.6 `Opening` kinds; ex §1.4 |
| C13 | Stairwell taken "in three untagged houses" (pf §4.6) → "about half of multi-storey houses" (cr B8, D10) | Spiral first (0.1 for two storeys, 0.3 otherwise), else stairwell with probability (n − 1)/(n + 1) (§2.2); the replay predicts 10 spiral and 30 stairwell houses — exactly the critic's coverage counts | ARCH §2.6 step 3 (our stair core is placed, never rolled); cr B8 |
| C14 | `getStairCells = 0 ⇔ stacked` fits 27/31; "a fingerprint, not a rule" (cr T4, pf §4.6) | `getStairCells` runs once per storey plan that takes part in an ordinary (non-stairwell, non-spiral) connection, cached; stairwell pairs never call it; the basement is an ordinary pair whenever its coarse room misses the stairwell cell or its landing — the four stairwell houses with 2 calls (§2.8, §2.9) | pf §4.6; cr T4 |
| C15 | The trapdoor's JSON form is unknown; a trapdoor appears when no cell is free (cr B16, R17) | A trapdoor is a stair with **no direction** on both storeys (JSON `dir` null, `up` set); it is taken from the cells common to both storeys not yet used by a stair when no cell is a stair candidate on both. If none exists the connection fails: a basement is dropped, but an upper storey would be left with no stair at all (the failure is ignored above ground — unguarded, though practically unreachable because it needs every shared cell to hold a stair already) (§2.8) | ARCH §2.6 `Basement.access` trapdoor; §13.2's "every storey reachable" bar; cr B16 |
| C16 | Role assignment: "the scoring inside `validate`", tie-breaks and the best-attempt criterion are unknown (pf §4.7, §8; cf D3 A 0.45) | Validators are yes/no predicates (§2.10's table); no score. Each list runs rooms × roles trials of (shuffle rooms, draw roles without replacement, first accepting room wins); the best trial is the one with the fewest unassigned rooms; the generator is rewound to that trial's start and replayed | ARCH §2.6 steps 2–3 (ours: function first; the reference's validators become acceptance bars); cf D3 |
| C17 | Specials are coupled to the house name ("name → special", cf D2/D4 from po 1.0.1) | No coupling in this build: 1 or 2 specials drawn uniformly from thirteen before any assignment; the name is drawn afterwards and its only inputs are the tags and the derived size/height flags (§2.10, §2.13) | ARCH §10.2 programme rows; cf D2, D4 |
| C18 | Bathroom–bedroom attachment (1.3.0) "not present in this build" (cr B7, D9) | Present in the code and disabled by an object-identity mismatch: the bedroom's exemption tests a second bathroom object that the programme never assigns, so every bathroom door counts against the bedroom's one-connection limit (§2.10) | ARCH §2.6 adjacency rows (the idea is sound; the reference's implementation is dead); cr B7 |
| C19 | Names: "the name drives the special room"; tags irrelevant (cf D4; this file's own first draft) | The house noun is chosen under conditions on the derived size and height flags (11 of 12 alternatives guarded); rejected alternatives are consumed from persistent decks (§2.13) | ARCH naming rows (ours are our own grammar); cf D4 |
| C20 | Pipeline order "… role assignment → windows → furniture and lights → elevation parameters → name" (pf headline 3, §3.1) | Elevation style is drawn **first**, before the reset to the seed; furniture and lights are **inside** the role stage; then door kinds, windows, chimneys, name, URL (§1, §4.3). The call-tree order was time-sorted, not execution order (memory hazard) | ARCH §6.1 (stream order); pf §3.1 |
| C21 | "Deterministic per permalink; only the light gradients vary" (pf headline 9; cr B12, R4, R6) | True for houses with a list-2 room. In a house whose every room takes a list-1 role (≤ 4 rooms), list 2 runs zero trials and rewinds the generator to the **clock**: furniture, lights, windows, chimneys, the name and the next seed then vary between loads (§4.2). The clock read is CONFIRMED (stack through `assignSet` on both such Enter houses of the seed probe); the visible variation between two loads is read, not yet executed. The facade style of every house depends on the pre-reset state (§2.14) | ARCH §6.1, §6.2 (what a seed determines: ours must not rewind to a clock); cr B12 |
| C22 | "≈ 1 generation in 5 reseeds its successor from the clock" (ru A4; memory) | Exactly the all-list-1 houses of C21 | ru A4 S 0.70 |
| C23 | Overall S 0.02: "every downstream draw order is not pinned (467–2 632 inlined `Random.float` per house)" (ru §1.1; cf §3) | Every draw site and its order is read (§4.3); the counted `Random.float` calls are only the array helpers' and the name grammar's, a lower bound. The knowledge barrier to seed-exact reproduction is gone; what remains unreproducible is the reference's own (C21, the unseeded light jitter, the pre-reset facade style) | docs/CONFIDENCE.md §9 (the S cells are Fable's to re-rule); ru §1.1 |
| C24 | The unseeded `Math.random` jitter is "PLAUSIBLY removed by `Light.snap`"; its size unmeasured (pf §1, §4.11; cf E3) | 0.05 cell per outline vertex per retry, in a uniformly random direction, only when the room's skeleton stalls; the summit is then snapped to one of nine half-cell points per cell, so the light moves only when the summit lies near a snap boundary (§2.12, §3.5) | ARCH §8 (our lights are seeded); pf §4.11 |
| C25 | `Clutter.getForce` is "force-based packing" (cr R14, pf §4.10) | One ray-cast slide per group away from the room's doors and stairs (offsets weighted by squared distance), by the wall-pull share of the free travel; no iteration (§2.12) | ARCH §8.10 decoration (ours); cr R14 |
| C26 | "The drafted polyomino is encoded as a plan code and decoded by the same path" (cr D15) | The plan decoder is called for every house and returns at once without a plan; the drafted shape never passes through an encoding (§2.2, §2.3) | cr D15 |
| C27 | Tag conflicts "resolve to the first of size → height → partition → windows → stairs" (cr B11, R25) | Size and height: the first matching tag in the URL's order. Partition, windows, stairs: fixed precedence — `mechanical` over `organic`, `blank` over `transparent`, `spiral` over `stairwell` whatever the order (§2.1). R25's own `organic,mechanical = mechanical` shows it | pf §2.2; cr B11 |
| C28 | JSON room cells are "a growth order … PLAUSIBLY the order in which the generator grew the room"; "whether rooms are cut or grown" is unknowable (ex §1 `cells`; cf §3) | Rooms are cut; the cell list is the flood fill that recovers a room's cells from its outline, starting at the outline's first edge — hence every cell touches an earlier one (§3.1) | ex §1; cf §3 |
| C29 | Windows: "fixed counts on 6 types, a ratio on 5"; density ≈ 0.6–0.7 per exterior edge (pf §4.8, §7) | Fixed: bathroom 1; armoury, storage, vault, secret passage 0 (five). Ratio of the room outline: bedroom ¼, living room 0.4, greenhouse, lookout, stairwell 1 (five). General density 0.8 on the top storey, 0.1 less per storey below (`transparent` 1, `blank` none), whole runs drawn by length² (§2.11) | ARCH §2.6 exterior demand rows; pf §4.8 |
| C30 | The entrance rule is unknown; po "avoid the longest wall" (pf §4.9; cf B6) | A weighted draw over outline edges: 5 mid-straight, 3 tip of a one-edge protrusion, 1 straight-to-convex, 0 next to a re-entrant corner (§2.4) — long straight walls are favoured, not avoided | ARCH §2.6 Entrances rule 1 (ours: frontage edge); pf §4.9 |
| C31 | Roofs: "hipped roofs over each block" (pf §4.12) → straight skeleton of the whole outline (cr B1) | B1 upheld: one hip face per outline run from the skeleton of the eave-offset outline; gables implemented but never requested; a seeded ≤ 0.1-cell jitter on stalls, then a half-cell snap; faces shaded 1.2^(cos to a −150° light); the spiral's cone (§2.15) | ARCH §8.10 roof detail; cr B1 |
| C32 | Shift+Enter "re-partitions every storey inside unchanged outlines" (pf §3.4; cr B17) | Also re-links stairs and redoes roles, furnishing, lights, door kinds and windows from the live generator (no reset); keeps chimneys, name and facade style; re-plans the basement without the stairwell and never drops it; writes no URL (§2.16) | ARCH §7 (our re-derive keeps the canonical prior); pf §3.4 |
| C33 | The elevation's link to the plan is unknown (pf §8; cf E7 A 0.40) | A projection per side: depth planes at every storey's outline walls facing that side; sections by the unbroken stack of occupied storeys; the door where the plan's entrance lies; windows exactly at the plan's window edges; its own chimney; a separator flag drawn per side at first view (§2.14) | ARCH II stage-2/3 elevation rows; cf E7 |
| C34 | The Gothic / Tavern JSON5 programmes' format is unknown (cf D5; pf §8) | Read: role records with name, abbreviation, window ratio, leaf-door flag, a seven-number furnishing preset, and validator bounds (size, narrow share, storey, connections, entrance, top/ground/basement/above-ground, single room); primary list = list 1, all other roles list 2, a generic list tried before the built-in fallbacks (§2.10, §5) | ARCH §10.2 programme rows (shape only); cf D5 |
| C35 | Room order and "a type is placed only where its validator accepts" (pf §4.7) | Upheld, with the order made exact: storey by storey bottom-up then the basement, each storey in a depth-first walk over doors from its start room (§2.10). Gallery and study rarely win because their predicates are narrow (gallery: ≥ 6 cells all narrow; study: 4–6 cells, ≤ 1 connection, above ground) and they sit in list 2 behind bedrooms that accept the same rooms — not "never" (PLAUSIBLE, from the table) | cf D3; ex §3.12 |
| C36 | Profile "URL `entrance` … silently ignored when it names an interior edge" (pf §4.9) | The decoded edge is used as it stands: an interior edge becomes the entrance (the editor merely does not display or re-write it); a reversed boundary edge puts the landing outside; non-adjacent nodes crash (§2.4). The "ignored" observation was the editor's display | ARCH §11 hand-off validation; pf §2.3 |

## 7. The critic's open questions, answered

| critic item | answer from the code | status |
|---|---|---|
| Gap 1 — what "Open in Dwellings" sends (cr §6.1; posts §6.1 #2, #12) | The receiving side is read: `seed`, `tags`, `floors`, `plan` + `w` + `h` (≤ 11 each, else **the plan is dropped and a random house is drawn**), `entrance`, `name`, `rooms`, `view` (§2.1, §2.16). The senders are in other bundles: MFCG rasterises on a 1.5-unit grid (≤ 11 × 11) with seed = city seed + indices and `tall` for houses (`code-mfcg.md` links-out); NG sends seed = map seed + building index and a width/height of round(side ÷ 10) clamped to 1–16 (`code-neighbourhood.md` §2.12) — so an NG building wider than 11 cells arrives as a random house. Neither sends `entrance` or `floors` as far as those lanes report | ANSWERED on this side; the senders per their lanes |
| Gap 2 — loops and the creator's permalink `?seed=1341473638&tags=large,slab` | The loop rule is read (§2.6, C9): loops need ≥ 2 non-redundant extra doors, half of which (rounded) are removed. Whether that permalink shows one needs a replay of the partition (not built) or an export (owner approval) | MECHANISM ANSWERED; the instance still unmeasured |
| Gap 3 — the partition's cut rule, the validators' scoring, the Door-object model, the stairwell roll, the basement's cell choice, the upper-storey setback | §2.5, §2.10, §2.6 + C11, §2.2, §2.9, §2.7 | ANSWERED |
| Gap 4 — the elevation's link to the plan; the Gothic/Tavern programmes; the roof options (Simple/Hidden, Shade/Fade/Shrink); the light jitter's size | §2.14; §2.10 + §5; §2.15 (the roof menu switches: simple outline with hip stubs, hidden, face shading, fading of lower roofs, eave shrink 2 ÷ (1 + distance)); 0.05 cell (§3.5) | ANSWERED |
| Gap 5 — the trapdoor in JSON; can an exported house carry a `NULL` edge that is not a stair shaft | A stair record with `dir` null on both storeys (C15). `NULL` is set only by the stairwell role's door rule and the stairwell room has one door, so `NULL` edges occur only at the stairwell cell — for the built-in programme; a loaded programme can set only leaf doors | ANSWERED |
| T1 — "always/never" role facts rest on small samples (kitchens and halls on the ground floor, attics on top, bedrooms never on the ground floor) | Kitchen: ground floor by predicate; hall: must hold the entrance, hence ground floor; attic: top storey and the only room there; bedroom: above ground, or the ground floor of a one-storey house — so "never on the ground floor" is false for one-storey houses (§2.10); the seed probe's one-storey Enter house `701227701 small,organic` shows a ground-floor bedroom (`_probes/seed/sessionA` step 9) | ANSWERED (one exception, CONFIRMED on a recorded house) |
| T2 — `hallways` / `organic` / `mechanical` rest on five paired seeds | The rules are read (§2.5, C6, C8) | ANSWERED |
| T3 — the trapdoor's representation and the entrance-threshold heuristic | C15; the drawing is a 0.3-cell square with a cross on both storeys (§2.8, §2.15) | ANSWERED |
| T4 — `getStairCells` semantics | C14 | ANSWERED |
| T5 — the basement probability rests on 11/14 | n/(n + 1), replayed 92/92 (C3) | ANSWERED |
| T6 — `new Date()` 1 in one session, 0 in the other | The clock is read at start-up and by `assignSet` only in all-list-1 houses (C21); session B's Enter houses had list-2 rooms | ANSWERED, CONFIRMED on the recorded stacks |
| T8 — the rejection-loop story rests on one seed | The acceptance test is the cell band alone; the replay reproduces the candidate counts of every recorded seed (§2.3) | ANSWERED, CONFIRMED |
| T10 — the Door-object model | C11 | ANSWERED (the count mismatch left to the harness, PLAUSIBLE) |
| T13 — elevation, Gothic/Tavern, wall styles beyond keys, roof options | §2.14, §2.10, §2.15, §5 | ANSWERED |
| T14 — the "never executed" inventory | Present and reachable (dead-code elimination ran; §1): the exporters, the elevation, the Poisson samplers (black-and-white hatching), the timers | ANSWERED |
| R16 — Door objects vs exported doors | C11 | ANSWERED (model); OPEN (why the counts disagree) |
| D12 / R6 — why lighting varies between loads | C24 | ANSWERED |
| D15 — `fromCode` = 1 in 96/96 | C26 | ANSWERED |
| D16 — `new Date()` 0–1 | C21, C22 | ANSWERED |
| pf §8 — "the PRNG and its seeding … which view keys draw from it" | §4.1–§4.4: Lehmer 48271, state 1 at boot, resets at start-up (clock), per house (seed, after the facade draw), per list (rewind); view-time draws listed in §4.4 | ANSWERED |

## 8. What remains unknown

* **Not in this bundle:** the senders' side of the hand-off (MFCG, VG, NG, UP, Tiny Pubs) beyond what their own code lanes
  report; Taverns (a separate generator); versions other than build 17195045 and seed stability across versions.
* **Not executed here (read only):** that an all-list-1 house's windows, furniture, chimneys and name actually differ
  between two loads (C21 — a two-load check of `seed=701227701&tags=small,organic` would settle it); whether the creator's
  loop permalink shows a loop (§7 gap 2); the realised roll rates beyond the 92 replayed houses; a full partition replay
  (the replay stops after the specification stage).
* **Why the coverage counts undercount `Door.new` in four houses** (C11): a property of the profiler (PLAUSIBLE: inlined
  optimised calls), not of the model.
* **Unreachable or dormant paths:** the rectangle-only stop rule (switched off for every house), the gable roof ends
  (never requested by the plan), the bed prop (no role creates it), the doorway door kind (never assigned), the flag-
  specific symbol override of the name engine (no such symbol), the stairwell raise to two storeys for a URL `floors=1`
  with `spiral` or `stairwell` (reachable but unobserved), negative or zero URL seeds (zero means "draw one"; a negative
  seed drives the generator negative — undefined behaviour, never tested).
* **Painters and the Tiny Pubs kit** (`tinypubs.view.*`, `formats.*`, most of `dwellings.view.*`) were skimmed for
  constants and generator use, not read line by line (§9); their pixel-level drawing is described only where §2.15 cites
  it. `coogee` (the UI toolkit) was grep-checked for generator draws and model logic, not read.
* **Obfuscation:** none beyond minification; every class keeps its package name, and the trace lines keep source file
  names and line numbers.

## 9. Reading record

* **Bundle:** `captures/dwellings/2026-09-26T23-54-54/profile/network/bodies/0002-cd66b0ce.js` (1 368 261 bytes).
  **Class map:** `scratchpad/code/dwellings/classes.tsv` (659 markers; 261 app classes, listed in `app_classes.txt`),
  built by `scratchpad/code/dwellings/extract.py`; readable copies by `readable.py` (draw token, short class names) in
  `classes_r/`. Scratchpad = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/`
  (session-local; reader-tier; never handed to implementers).
* **Replays (CONFIRMED, re-executed by the continuation seat):** `sim/shape.py` — 13/13 recorded shapes and candidate
  counts identical to its first run (`sim/shape.out.txt`, diff empty); `sim/specs.py` — 92/92 ground cells, 92/92 storey
  counts, 92/92 basements against `captures/dwellings/_measure/floors.json`. Both restate the read rules in our own code;
  the footprint templates are read from the bundle at run time and not stored.
* **Other executed checks (continuation seat):** the grammar asset's structure with its words masked (§2.13 — which
  overturned the first draft); the seed probe's clock-read stacks (`_probes/seed/sessionA/steps/steps.jsonl`, both Enter
  houses through `assignSet`); the plan3 probe's unseeded-call stacks (1 start-up + 6 `getSkele` on the five-cell L plan).
* **Classes read in full, by package** (first seat, per the section headers of §2–§3; continuation seat re-read the
  starred ones in full to verify the drafts): `dwellings.model` 53 of 53 — 22 core, 7 `props.*`, 24 `rooms.*` (House*, Plan*, Room*,
  Door*, DoorType*, Staircase*, HouseType*, RegularHouseType*, RoomType*, every `rooms.*`*, Specs*, Tags*, Blueprint*,
  Drafter*, Namer*, Elevation*, JsonExporter*, Clutter*, PropSet*, Light*, the prop glyphs, LoadedHouseType, FacadeLayer,
  TowerLayer, PorchLayer, Layer, Light* among the props); `dwellings.utils` 9 of 9; `dwellings` shell 2 of 2 (Main*, Export); `dwellings.scenes`
  4 of 4 (key handlers, reset, re-rolls; BlueprintScene* in its randomisation and submit); `geom` 24 of 24 (Skeleton*,
  Rib*); `utils` 10 of 16 (Random*, ArrayExtender*, MathUtils, Palette, GradUtils, PointExtender, and the helpers the
  model calls); `tracery` 9 of 9 (Grammar*, RuleSet*, DeckRuleSelector*, RuleSelector*, Symbol*); `tinypubs.params.Dimensions`*.
  **Skimmed for constants and generator draws:** `dwellings.view` 28 (RoofPainter in its skeleton, shading and hatching
  — re-read in part by the continuation seat; WallsView, DoorView, the five wall styles, StaircaseView; the rest by grep),
  `dwellings.ui` 10, `tinypubs` 42 others, `formats` 3, `system` 3, `processes` 2, the other 6 `utils`.
  **Grep-verified only:** `coogee` 55 (no generator draw, no model logic).
* **Count:** about **112 of 261** app classes read in full (model, utils, geometry, tracery, the shell and scenes, the
  shared kit's parameter draw), **≈ 94** skimmed, **55** grep-verified. The first seat's list of classes read was not
  recorded class by class; the count above is reconstructed from the §2–§3 citations (PLAUSIBLE ± 5). The continuation
  seat re-read **54 classes in full** (the starred ones: the 24 roles, House, Plan, Room, Door, DoorType, Staircase,
  HouseType, RegularHouseType, RoomType, Specs, Tags, Blueprint, Drafter, Namer, Elevation, JsonExporter, Clutter, PropSet,
  Light, Main, Skeleton, Rib, Random, the five tracery classes named in §2.13, the facade parameter draw) and 5 in part
  (RoofPainter, BlueprintScene, PlanScene, ArrayExtender, DoorView) — CONFIRMED; its corrections to the drafts are
  §2.1 (URL rewrite), §2.2 (size draw), §2.11 (chimney landing, windows above eight storeys), §2.12 (group count, piece
  sizes, wall-light exposure, unlit passage), §2.13 (rewritten), §2.14 (four sides at once).
* **CONFIRMED versus PLAUSIBLE.** CONFIRMED: every rule this file states with a class and method cited in the model,
  geometry and randomness packages (read on disk), the two replays, the grammar structure, the clock and unseeded-call
  stacks. PLAUSIBLE: the count mismatch explanation (C11), the gallery/study rarity reading (C35), the realised adjective
  frequency (§2.13), the visible consequences of the all-list-1 clock rewind (C21) until a two-load check runs, and the
  painter details of §2.15 that rest on skims.

## Fable review (2026-09-27) — B-code/dwellings

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`, receipts Dwellings 1–6). Read
whole. Firewall: no fenced code, no colour literal, no grammar syntax; the validator table and furnishing presets are logic
(critic R5, J-Fcode-8); role names, tag names and console lines are identifiers (J-Fcode-1); the templates are described, never
listed; the grammar and the two programme files are shaped with at most five examples each. Re-derived on the readable
extracts (`Random`, `Blueprint`, `Drafter`, `Specs`, `Plan`, `House`, `Room`, `HouseType`, `RegularHouseType`, `Namer`,
`rooms.Bedroom`, `rooms.Bathroom`): the discarded step; the size bands, the template stretches and the cell-count-only
acceptance; the silent drop of a URL plan wider or taller than 11 cells; the entrance weights 5 / 3 / 1 / 0 and the draw consumed
even under a URL entrance; the storey law and its clamp; spiral 0.1 / 0.3 and stairwell (n − 1) ÷ (n + 1); the basement roll
n ÷ (n + 1); the partition's stop 6·2^m, its two candidate kinds and tag preferences, the bend with probability L ÷ 6 at about
half its length, the score (q₁q₂)² and the hallways inversion, the retry of the same area; the corridor merge on exactly one
shared edge; the door cost and the priced pruning — redundant doors removed, a cheapest-first spanning tree, round(half) of the
remaining non-redundant doors removed and the rest kept as loops; the setback rule best² ÷ current; the coarse-room basement
(average 12) dropped when its connection fails; the unguarded upper-stair failure (the return value ignored above ground,
checked for the basement) and the trapdoor; window density 0.9 − 0.1·(storeys − index), 0.8 at the top; the chimney subset;
the facade parameter draw before the reset to the seed; the zero-trial rewind to the clock; the programme lists and the
thirteen-role pool; the bedroom's dead exemption and the bathroom validator; the namer's seeded source, decks and 0.3 refill.
Executed: `sim/specs.py` re-run — identical (92 / 92 / 92); `sim/shape.py` re-run with the 13 recorded arguments — identical
(79 lines). The grammar asset (899 B, read with every letter masked): 4 symbols — a title of one alternative carrying a 10 %
probability guard round an optional adjective, 11 location forms, 12 house nouns of which 11 carry conditions on the four
derived flags and one is unconditional, 7 adjectives — exactly §2.13 and C19.

Corrections (critic R7; this section supersedes the two references): §1.1's `rooms.*` row cites the furnishing at §2.8 — it
is §2.12 (the roles §2.10); §2.2's basement bullet cites the later drop at §2.6 — it is §2.8–§2.9. PLAUSIBLE stays PLAUSIBLE:
the C11 count artefact, C35's rarity reading, the class count ± 5 (R11), and C21's visible two-load divergence (the mechanism
is CONFIRMED in code; the divergence itself needs a two-load check this standalone seat cannot run). The design changes this
reading requires are items 52 and 60 of `docs/AMENDMENTS-2026-09-27c.md`, both CONFIRMED on the receipts above.

## Fable review (2026-09-27) — B-code/dwellings (critic)

Verdict **CONFIRMED**. R-D1–R-D6 stand: R-D1–R-D5 re-derived here, R-D6 re-executed here (identical). R7 applied above; R11
stands (the first seat's list is unrecorded; the 261-file extract set and the 54 re-read classes are what is checkable). The
critic's list of what it did not re-derive is accurate; this review closed all of it but the furniture and light recipes, the
elevation projection and the roof painter, none of which is design-bearing.

## Fable review (2026-09-27) — B-code/dwellings (impact)

Verdict **CONFIRMED**. Item 52's Dwellings clause (the clock rewind in all-first-list houses) is re-derived; item 60's five
coded laws (n ÷ (n + 1), the coarse-room basement, half of the non-redundant extra doors kept, the storey window density, the
11-cell drop, plus the unguarded stair) are re-derived; NG's hand-off widths of 1–16 are accepted on the NG reading (critic
X8). The editor texts carry no reference identifier, code, grammar, palette or word list.
