# code-manor — Fantasy Manor read from its compiled bundle

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/manor; no Fable critic has checked it). Queue row B-code/manor in
> docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 overturns and the §6 corrections against the bundle
> before any of them is carried into docs/ARCHITECTURE.md, and the firewall (no code, no asset copied; identifiers citation-only).

**Lane** `code/manor` · **written** 2026-09-27 · **bundle** `captures/manor/2026-09-25T11-25-38/coverage/network/bodies/0002-a1c7fb89.js`
(2 533 954 B, 77 475 lines, sha256 `0bd521ff4c4812f9…`, byte-identical to the `0003-a1c7fb89.js` body of every other manor
capture pass, so every recorded count in `captures/manor/**` was produced by this code) · **toolchain** Haxe 4.0.3, **not
minified** (readable identifiers, one statement per line) · **application metadata** name "Fantasy Manor", package
`com.watabou.manor`, version 1.0.0, build 890 · **class map** `scratchpad/code/manor/classes.tsv` · **per-class extracts**
`scratchpad/code/manor/classes/` · **extraction script** `scratchpad/code/manor/extract.py`
(scratchpad = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/`).

**Grades.** `[READ]` = seen in the bundle (class and method named); `[INFERRED]` = our reconstruction or a consequence we
derived; `[STATED]` = the author's words elsewhere; `[CHECKED]` = a rule read in the bundle, restated in our own words as a
small script, and run against the recorded captures (§9 lists the scripts). **CONFIRMED** = read on disk or executed;
**PLAUSIBLE** = reasoning only. Constants are facts about the reference, stated as numbers; nothing here is code; data
assets are named and shaped, never reproduced. Reference identifiers are citations only and are never adopted by the design.

STATUS: COMPLETE (2026-09-27).

**What made this reading unusually strong.** The bundle is not minified, and the program's only randomness is one
linear-congruential stream seeded from the page-load clock. Every capture pass logged an epoch timestamp, so the
reading could be restated as a small script (`scratchpad/code/manor/sim/sim.mjs`, reader-tier) and its seed searched
near each timestamp. One seed per pass, 0–43 ms after the page's first console line, reproduces **every** recorded
building: all 39 counted call totals of all 46 coverage generations (up to 5 638 line-intersection tests per building),
and the exact RGB of every roof facet and paving stone in all 5 draw generations. Statements marked `[CHECKED]` rest on
that replay (§9 lists the scripts and outputs).

---

## §0 Headline — the ten things the code settles

1. **One hidden stream, seeded from the load clock, and it is recoverable.** `[READ]`+`[CHECKED]` The only randomness is
   a Park–Miller generator (multiplier 48 271, modulus 2³¹−1), inlined at every call site, seeded once at start-up from
   the wall clock in milliseconds modulo 2³¹−1 (the app entry, its `Main` constructor via `Random.reset`), never reset
   again. A 64×64 paper-grain tile then consumes 16 384 draws before the first building. Every later building, recolour and
   toggle continues the same stream. The seeds of five of the six capture passes were recovered to the millisecond, and
   they replay all 46 coverage generations and all 5 draw generations exactly (§4). This refines the capture README. The seed is not shown in the UI, but it is the load clock, read through the `Date`
   constructor (which the `Date.now` probe could not see), so any recording's timestamp brackets it.
2. **The five layouts are an equal-weight pick, and each one is now exact.** `[READ]` (`ManorScene.getPoly` and its five
   routines.) A *ring* is a **regular** 4-, 5-, 6- or 8-gon (probabilities ¼, ⅜, ¼, ⅛; never 3 or 7) of circumradius
   100–200. A *closed* plan is a star-shaped irregular 4–6-gon: each vertex gets its own radius (80–200) and an angle
   jittered inside its own sector. An *arc* is 2 to 7 consecutive equal chords of a regular 4–8-gon, with both end
   segments shortened. A *rect* is a rectangle of 100–180 × 160–320 at a random angle. A *snake* is a self-avoiding
   random walk on a 4×4 grid (pitch 90–120) with collinear runs merged. Overturns "arc = 4 wings, U/C"
   (arcs run 2–7 wings, ⅓ of them 2-wing L's) and "no 7-wing building" (7-wing snakes are 10 % of snakes).
3. **A wing is a mitred slab with a two-facet roof whose ridge is the plan segment itself.** `[READ]` (`Wing.updateGeometry`.)
   Corners at a joint are the intersections of the neighbouring eave lines, mirrored through the plan vertex. Free ends are
   **gable** ends: the ridge runs to the end, closed by one ink line. Joint (hip or valley) lines are inked **only when the
   turn exceeds about 84°**; at hexagon and octagon joints the fold shows by shading alone. No miter limit is applied.
4. **"createSlab" is the optional hip block, not the wing footprint, and a block is never a pyramid.** `[READ]`
   (`Wing.createSlab`, `ManorView.drawDiamond`.) The chance is 1 − width/length, so slender wings get blocks. Length runs
   from wing width to wing length, skewed long. Width runs from wing width up to twice it. The block sits on the ridge line
   at the wing's start, middle or end (60 %) or at a free position (40 %), sometimes turned across the wing. It is kept only
   if (a) at each wing end it covers both mitre corners or neither, and (b) it overlaps no earlier block. Its roof ridge is
   inset by a quarter of the short side at each end, so even a square block keeps a short ridge. The "pyramid" squares
   in the images are **square towers**, which the code deliberately stands on blocks (item 7).
5. **About 70 % of "dormers" are projecting cross-gables, not dormers.** `[READ]` (`Wing.spawnAlong`.) Each eave gets one
   row: an element width of ⅓–1 × the wing width, a uniformly random slot count, evenly spaced slots with random gaps, and
   a shape of a gabled ridge perpendicular to the main ridge with a hipped tip up the slope. With probability
   (1 − element/wing width)² the element is a true dormer set back from the eave. Otherwise it straddles the eave and
   projects past it. A lone projector can be stretched up to 4× and becomes a candidate doorway. Rows are
   collision-tested against every earlier dormer and every block.
6. **Entrances are a porch lottery with a projecting-bay fallback, and about 14 % of buildings get none.** `[READ]`+`[CHECKED]`
   (`Wing.spawnPorch`, `Wing.createPorch`, the `Manor` constructor.) The porch style is one coin per building: a
   32-facet half-dome or a small gabled hood 5–8 units deep. Each wing gets at most one porch, drawn from up to four
   options: its outer side (chance 1/wings), its inner side (open plans only, chance 1/wings), and the plan's open start
   and end (chance ½ each). A porch-less building uses one random lone projecting bay as its door. If it has none, it has
   no entrance: 17–27 % of courtyard plans, under 3 % of open plans. Grass is not tied to entrances.
7. **Towers follow two branches, and only tower–tower overlaps are rejected.** `[READ]`+`[CHECKED]` (`Manor.spawnTowers`,
   `Tower.intersects`.) The tower style is 75 % round (always round when porches are domes). A building with square towers
   *and* hip blocks gets a square tower on each block with probability ½, sized ⅓–⅔ of the block's short side. Otherwise
   towers go on path points: joints, wing midpoints and free ends. They are added by a chain accepted with probability ½,
   ⅓, ¼ …, with radius 0.6–1.0 × wing width, and rejected only against earlier towers. Round towers are 64-facet cones
   with thin concentric rings every ~3 units, which answers the profile's "rings not isolated" question. Blocks and towers
   are never tested against wings, and towers never against blocks.
8. **The lighting recipe is a Lambert-plus-Phong term on each facet's eave direction.** `[READ]`+`[CHECKED]`
   (`ManorView.prepareColors`, `ManorView.shaded`.) Facet colour = a mix of *dark* and *light* in proportion (1 + cos)/2.
   cos is the facet's eave direction dotted with the light vector. *dark* = *light* × a random bluish shadow tint.
   A specular term is added when on (½ of wood buildings, 60 % of slate): colour × cos^k with k in 4–8 (4–10 for slate).
   Blocks are drawn 10 % lighter and round towers 20 % lighter, each with its own ±10° hue shift. Hatching is 0.5-px ink
   at half alpha, parallel to the eave, 3 units apart, clipped to the facet. The exact colours of all 282 roof facets
   recorded in the draw passes reproduce.
9. **Scale is fixed, not fit-to-view; the shadow is a swept silhouette; the grain covers the roofs too.** `[READ]`
   (`ManorScene.layout`, `visuals.Shadow`, `visuals.Noise`.) 800 model units span the window's shorter side, so the ×1.375
   of the recordings is 1100/800 whatever the building's size. Buildings average 300–410 units across, depending on the layout. The shadow is the
   silhouette stamped along an offset 12.5–25 units long (screen-right to screen-down), tinted and multiplied onto the
   ground; there is no blur. The paper-grain tile is multiplied over the **whole** scene, building included. Overturns the
   profile's "fit-to-view scale ambiguity" and "scaled to fit".
10. **Controls, dead code and a crash.** `[READ]` Shift+Enter is *New lighting*, the hotkey the capture could not find. It
    rebuilds only the view: roof colour, light, shadow tint and specular are re-rolled, and so are grass and pathways.
    **C** flips slate **and** does exactly that, so the creator's "C for New lighting" is half right. Space toggles the
    simplified view; F, G, N, P and S toggle fullscreen, grass, noise, pathways and shadow; L does nothing. `zigzag` has no
    caller anywhere. A snake whose first step fails ten random tries is a one-point plan, and the wing-linking step then
    throws. That happens about once in 20 000 buildings.

**Profile claims the code overturns** (details in §6): "createSlab = the wing's footprint quad"; "square hip block = pyramid";
"arc = 4 wings"; "fit-to-view / scaled to fit"; "grass at re-entrant corners and near the entrance"; "C is no longer New
lighting"; "New-lighting hotkey not found"; "stones shrink with distance" (a selection effect, not a size rule);
"the 48-38 draw's projecting gabled bay / open triangle" (a gabled porch on a *closed* plan); "the C-pair drop in
line-intersection counts comes from re-rolled decoration" (it is the model's collision tests not re-running); "no world
scale" (there is a fixed model-unit scale, though no metric one); "the 2 ambiguous buildings (gens 8, 31)" (both are two
gabled porches plus one round tower).

## §1 Class map by package

The bundle has 562 class and enum markers. Haxe 4 writes each class as a constructor, a line registering it in the class
table (`$hxClasses`) and a prototype block; the class map records each one's line and byte range
(`classes.tsv`). The app's own code is **58 `com.watabou.*` classes (194 841 bytes)** plus 3 generated entry classes. Lines
4 073–11 409 hold the app; the static initialisers sit at lines 75 162–75 218. Everything else is Lime, OpenFL, msignal,
Haxe std and FileSaver.

| package | class (bundle lines) | role, one line | read |
|---|---|---|---|
| (entry, generated) | `ApplicationMain` (862–970) | registers the app; window background 0xCEC5B6, 30 fps, meta: name "Fantasy Manor", package `com.watabou.manor`, version 1.0.0, build 890 | full |
| | `DocumentClass` (4170–4180) | stage child that runs `Main` | full |
| | `ManifestResources` (4341–4366) | one asset library: the UI font | full |
| `com.watabou.manor` | `Main` (4139–4169) | **seeds the stream from the clock**, sets four UI greys, starts the game with the scene | full |
| | `ManorScene` (8279–8607) | keys, right-click menu, `reset` (the build), the five layouts, grass and pathway placement, fixed-scale layout | full |
| | `ManorView` (8608–8929) | colours, light, facet shading, hatching, ink lines, element drawers (porch, dormer, block, tower), unused `zigzag` | full |
| `…manor.model` | `Manor` (8930–9122) | plan centring, style coins, wing chain, tower placement, collision shape list, door fallback | full |
| | `Wing` (9155–9475) | segment frame, mitred corners, hip block, dormer rows, porch options, porch shapes | full |
| | `Tower` (9123–9154) | round (64 sides) or square (4 sides) tower polygon; tower–tower test | full |
| `…manor.visuals` | `Grass` (9476–9519) | one patch = a random walk of faint radial-gradient blobs | full |
| | `PavedRoad` (9946–10014) | stepping-stone trail with growing spacing; `drawStone` | full |
| | `Shadow` (10015–10046) | swept-silhouette bitmap, multiply blend | full |
| | `Noise` (9897–9945) | 64×64 grey grain tile, tiled over the window, multiply blend | full |
| `com.watabou.geom` | `GeomUtils` (6151–6241) | two-line parameters, lerp, misc. (§3) | full |
| | `Color` (6021–6150) | HSV→RGB, lerp, multiply, add, scale, RGB→HSV | full |
| | `Chaikin` (5958–6005) | corner cutting at ¼/¾ | full |
| | `Circle` (6006–6020) | centre + radius record | full |
| | `Segment` (7158–7201) | segment record — **unused by the app** | full |
| | `_Polygon.Polygon_Impl_` (6242–7157) | shared polygon abstraction (area, centroid, OBB, largest inscribed rectangle, inset, buffer, smoothing, union outline) — **unreachable from the app** | full |
| `…geom.polygons` | `PolyBounds` (7328–7689) | AABB, point-in-polygon, polygon-overlap test (used); circle, OBB, inscribed rectangle, hulls (unused) | full |
| | `PolyCut` (7828–8200) | `pierce` (line × polygon, used for hatching); cut, peel, shrink, inset, buffer, enlarge (unused) | full |
| | `PolyCore` (7690–7809) | vertex average (used); area, perimeter, centroid, simplify (unused) | full |
| | `PolyCreate` (7810–7827) | centred rectangle (used); regular polygon (unused) | full |
| | `PolyTransform` (8201–8278) | translate, rotate by sine/cosine, copying and in place | full |
| | `PolyAccess` (7202–7327) | neighbour, edge and convexity helpers (unused by the app) | full |
| `com.watabou.utils` | `Random` (10975–11060) | the generator; helper functions all inlined by the compiler | full |
| | `ArrayExtender` (10179–10545) | weighted pick, random element, pick-and-remove, identity de-duplication, … | full |
| | `PointExtender`, `MathUtils`, `GraphicsExtender` | in-place point ops; clamp; polygon outline (the only drawing helper used) | full |
| | `Updater` + 4 dispatcher classes | frame tick (no randomness, no model access) | full |
| `com.watabou.coogee` | `Game`, `Scene` (4073–5078) | scene switching; key state (Shift, Ctrl), Escape → quit; `Scene.shake` uses the platform random but is never called | full |
| `…coogee.ui` (+ `elements`, `forms`, `layouts`, `utils`) | 21 classes (5079–5957) | menu, menu items with check bullets, windows and dialogs (never opened by this app), boxes, text | full |
| `com.watabou.processes` | `Process`, `Sequence`, `Tweener` | tweening; reachable only from the unused `shake` | full |

**Entry point and call order** `[READ]`. `ApplicationMain.start` creates the document class, which runs `Main`. `Main`
seeds the generator from the clock, installs the four UI greys, and starts `Game` with `ManorScene`. The scene constructor
builds the grain tile (16 384 draws) and calls **`reset`**. On Enter, `Scene.onKeyDown` → `ManorScene.onKey` → `reset`, with
Shift making it a view-only rebuild. `reset(newBuilding)`, in order:

1. If newBuilding: `getPoly` (one weighted draw, then the chosen layout's draws); the wing width (four draws); the
   `Manor` constructor, which centres the plan, tosses the porch coin and then (only if that came up gabled) the tower
   coin, then runs `createWings` → `updateGeometry` for every wing → `createSlab` for every wing → `spawnDormers` for every
   wing (inner row, outer row, porch) → `spawnTowers` → the door fallback.
2. `ManorView` (27–40 draws): colours and light, then porches → wings → joint lines → dormers → block colour → blocks →
   round-tower colour → towers.
3. `createGrass` and `createRoads` (skipped in the simplified view).
4. The shadow (no draws); layering; fixed-scale `layout`.

The profile's order "each Wing: createSlab, updateGeometry, spawnDormers" is wrong. The pipeline runs in passes (all
corners, then all blocks, then all rows and porches), so a block on wing 3 is tested against the blocks of wings 1–2.
Wing 1's dormers are tested against every block.

## §2 The pipeline as coded, stage by stage

Notation: *u* is one uniform draw; *m3* the mean of three draws (a bell on [0, 1], mean ½); *b3* = 2·*m3* − 1 (a bell on
[−1, 1]); *s4* = |(sum of four draws)/2 − 1| (a half-bell on [0, 1] piled near 0, mean ≈ 0.23). "± x" below means
"+ x·*b3*". All lengths are model units; §2.14 gives the screen scale. Every statement in this section is `[READ]` from the
named method. The replay (§4) makes each draw-consuming step `[CHECKED]`, because one wrong draw count or one wrong branch
would desynchronise every later building.

### 2.1 Start-up, frame and layers (`Main`, `ApplicationMain`, `ManorScene.reset`, `ManorScene.layout`)

- The window background is 0xCEC5B6, rgb(206, 197, 182), set as the application's clear colour. `Main` overrides four UI
  greys, the darkest being the ink 0x33322E.
- Start-up: seed the generator from the clock. Build the grain tile (4 draws per pixel, 16 384 draws). Build the first
  building inside the scene constructor, before the first frame.
- Inside one scaled "image" sprite, bottom to top: the grass sprite, the pathways sprite, the shadow bitmap, the building
  view. The window-sized grain bitmap sits **above** the image. The image's scale is min(window width, height)/800, centred
  on the window. The model has its origin at the plan's centre and a fixed 800-unit short side, whatever the building.

### 2.2 The plan — `ManorScene.getPoly` and its five routines

`getPoly` makes one weighted pick over five equal weights, so each layout has probability ⅕ (`[READ]`; the 41-building
tally 8/7/8/9/9 was consistent with this and is now explained).

| layout | construction (draw order as coded) | wings |
|---|---|---|
| ring (`ring`) | side count from a uniform pick over an 8-entry list: P(4) = ¼, P(5) = ⅜, P(6) = ¼, P(8) = ⅛. Phase *u* turns. Circumradius 100 + 100·*m3* (100–200). Vertices at equal angles. **Regular**; closed by repeating the first vertex object. | 4, 5, 6, 8 |
| closed (`closed`) | side count: P(4) = ⅓, P(5) = ½, P(6) = ⅙. Phase *u*. Per vertex: radius 80 + 120·*m3* (80–200), then the angle (*i* + *m3*)/*n* turns past the phase, so each vertex stays inside its own 1/*n* sector. The result is simple and star-shaped about the origin, usually not convex. | 4–6 |
| arc (`arc`) | *n* from a 9-entry list: P(4) = 2/9, P(5) = 3/9, P(6) = 2/9, P(7) = P(8) = 1/9. Point count uniform on 3 … *n*. Phase *u*. Radius 100–200. The first points of the regular *n*-gon: an open convex chain of equal chords. | 2 … *n* − 1 (2–7) |
| rect (`rect`) | a centred rectangle, side 100 + 80·*m3* (100–180) by 160 + 160·*m3* (160–320), turned by a uniform angle; closed. | 4 |
| snake (`snake`) | a 4×4 lattice of pitch 90 + 30·*m3* (90–120). Start cell uniform (column then row). Each step: stop with probability (*k* − 3)/13, where *k* is the current **vertex** count after merging. Otherwise make up to 10 random direction tries for an unvisited in-bounds neighbour. Append it, and drop the middle point when the last two steps are collinear (cosine ≥ 0.999). If all 10 tries fail, stop. Turn the whole path by a uniform angle; open. | 1–11 |

The snake's stop chance counts corners, not cells: it is zero until the path has four vertices, and straight runs never
raise it. A walk that fails its very first ten tries leaves a one-point plan (§8).

**Wing width** (`ManorScene.reset`): 90 − 30·*s4*, one value per building, shared by every wing. It ranges over 60–90,
with the mode at 90 and the mean at 83.

### 2.3 Building set-up — the `Manor` constructor and `createWings`

- **Centring.** The plan is translated so the mean of its stored vertex list sits at the origin; each distinct vertex
  object moves once (`ArrayExtender.clean`). A closed plan stores its first vertex twice, so its "centre" is pulled toward
  that vertex by up to *r*/(*n* + 1): 30 units for a square ring of radius 150. Rings are therefore slightly off-centre on
  screen.
- **Style coins.** Porches are domes with probability ½. Towers are round if the porches are domes; otherwise a second ½
  coin decides, drawn only in that case. So towers are round in ¾ of buildings, and square towers only ever appear with
  gabled porches.
- **Wing chain.** One wing per segment. A plan is *closed* (a "cloister" in the code) when its first and last stored
  vertices are the same object. On an open plan with two or more segments, the first vertex moves toward the second by
  1/(segment count) of that segment, and the last vertex likewise toward its neighbour. A 2-wing L therefore keeps half
  of each arm, and a 7-wing arc loses a seventh of each end chord. Neighbours are linked, and closed plans round the loop.

### 2.4 The wing slab — `Wing` constructor and `updateGeometry`

- Each wing has a unit direction, a normal (the direction turned a quarter turn counter-clockwise in y-up terms), and a
  half-width offset along the normal. Corners on the +normal side are "inner" and on the −normal side "outer".
  All three closed layouts are generated counter-clockwise, so for every courtyard plan **inner = courtyard side,
  outer = outside**. This is `[READ]` from the construction and checked on the restated geometry: in all 57 308
  courtyard-plan wings of the Monte Carlo the outer eave lies farther from the centre, and all 3 910 courtyard porches
  stand outside. On open plans the two sides are just two sides;
  for an arc, "inner" faces the arc's centre.
- **Corners.** A free end gets square corners (end ± offset). At a joint the inner corner is the intersection of the two
  inner eave lines. The outer corner is its mirror through the plan vertex, so inner corner, vertex and outer corner are
  collinear: one straight mitre line. The two wings share both corner objects. No miter limit exists, so a sharp joint of a
  *closed* polygon yields a long spike.
- The inner and outer eave lengths are stored; the porch rules read them.
- **Footprint.** The quad inner-start, inner-end, outer-end, outer-start. The roof is two facets from each eave to the
  ridge, and the ridge **is** the plan segment. §2.9 covers how the roof is drawn.

### 2.5 Hip blocks ("diamonds") — `Wing.createSlab`, all wings after all corners

1. Chance 1 − width/length, so a wing no longer than it is wide never gets one.
2. Length along the wing: width + (length − width)·(1 − *s4*), between the wing width and the wing length, skewed toward
   the full length (mean ≈ width + 0.77·(length − width)).
3. Depth across the wing: width + min(length₂ − width, width)·*m3*, where length₂ is the value from step 2. It lies
   between the wing width and min(length₂, 2 × width), so **a block is never narrower than the wing it sits on**.
4. Position along the ridge: *u*, snapped. Below 0.2 goes to the start, above 0.8 to the end, and 0.4–0.6 to the middle;
   0.2–0.4 and 0.6–0.8 stay continuous. The snapped cases cover 60 % of draws.
5. Turned across the wing (length and depth swapped) with ½, but only when the position is not a linked joint. The coin is
   not drawn at a joint.
6. The rectangle is aligned with the wing and centred **on the ridge line** at that position.
7. Kept only if (a) at each wing end it contains both of that end's corners or neither (the *corner-parity rule*), and
   (b) it overlaps no block already kept. No dormers exist yet. A rejected block is simply dropped, with no retry.

### 2.6 Dormer rows — `Wing.spawnDormers` → `Wing.spawnAlong` (inner row, then outer row, then the porch)

- **Element width** *d* = width·(1 + 2·*s4*)/3, from ⅓ to 1 × the wing width, mostly near ⅓ (mean ≈ 0.49 × width).
- **Shape fractions** of the half-width: tip depth *in1* = (*d*/width)·(0.5 + *s4*); body depth *in0* = (1 − *in1*)·*s4*;
  projection *out* = (*in0* + *in1*)·*m3*.
- **True dormer vs projecting bay.** With probability (1 − *d*/width)² the element is a true dormer. Its projection
  becomes negative (a third of the half-width left over after both depths), and both depths shift up-slope by the same
  amount, so the whole element sits inside the roof with its gable set back from the eave. Otherwise it straddles the
  eave: its body runs up the slope and its gable projects past the eave line (a cross-gable over a projecting bay). Across
  many buildings about 69 % of elements project (§2.16).
- **Slots.** *n* = ⌊*u*·(⌈L/*d*⌉ − 1)⌋, where L is that eave's length. The count is uniform from 0 up to two fewer than the
  number of elements that fit. The end margin is (L − *n*·*d*)·*m3*·½ at each end, with slots evenly spaced between the
  margins. If *n* = 1 and the element projects, then with ½ the projection is multiplied by 1 + 3·*s4* (up to 4×): a
  longer stub.
- **Shape.** Six points: a hipped tip up-slope on the element's axis; two body corners; and a straight gable across the
  outer end (two corners plus the axis point). The shape is set in the eave's frame, mirrored for the outer row.
- **Placement tests.** When *n* > 1, each slot is dropped with probability 1/(*n* + 1), which puts gaps in the row. Each
  remaining element must overlap nothing in the shape list taken **once, at the start of the row**: every earlier row's
  elements plus all blocks. Elements of one row are never tested against each other; their pitch is at least *d*.
- **Door candidate.** If exactly one element survives and it projects, and the row is the outer one (either row on an open
  plan), its outer axis point is recorded as a possible door facing outward along the element's axis.

### 2.7 Porches — `Wing.spawnPorch` → `Wing.createPorch` (once per wing, after its two rows)

Up to four options are tested, each with its own draw, and only when its precondition holds:

| option | precondition | chance | porch |
|---|---|---|---|
| outer side | the outer row is empty and the outer eave is longer than the wing width | 1/(number of wings) | at the eave midpoint, facing out; width = wing width × (0.9 − 0.4·*s4*), 0.5–0.9 (mode 0.9), capped at the eave length |
| inner side | **open plan only**, the inner row is empty and the inner eave is longer than the width | 1/(number of wings) | the same on the inner eave |
| plan start | the first wing of an open plan | ½ | at the plan's start point (the centre of the gable wall), facing along the wing outward; width = wing width × (0.2 + 0.4·*m3*), 0.2–0.6 |
| plan end | the last wing of an open plan | ½ | the same at the far end |

If any option passed, one is chosen uniformly and built, so a wing has at most one porch. A **dome** porch is a half-disc
whose diameter is the porch width, standing on the wall and drawn with 33 perimeter points. A **gabled** porch is a
rectangle of the porch width by max(width/10, 5) deep, with its ridge perpendicular to the wall. Every porch registers
a door at its base midpoint, facing out. Porches are never collision-tested and are not in the shape list.

### 2.8 Towers — `Manor.spawnTowers`, `Tower`

- **Branch A** — square towers and at least one block exist. Each block gets a coin ½. On heads, a square tower goes at
  the block's centre, with side = the block's short side × (⅓ + ⅓·*u*) and aligned with the block. No test is made. This is
  the "tower sitting on a hip block" of the images.
- **Branch B** — everything else, including every round-tower building. The candidate spots are each wing's start (facing
  the bisector of its own and its predecessor's direction, or its own direction at a free start), each wing's midpoint,
  and the last wing's free end on open plans. The loop runs while spots remain: continue with probability
  1/(2 + towers accepted so far), take a random spot (removing it), and set the radius to width × (1.2 + 0.8·*u*)/2
  (0.6–1.0 × width, uniform). The polygon is a 64-gon (round) or a square aligned with the spot's direction. It is
  rejected if it overlaps an accepted tower: for round towers, centre distance below the radius sum; otherwise the polygon
  test. So the chain is ½, then ⅓ or ½ again after a rejection, and so on.
- A round tower's polygon vertices sit at half-step angles; a square tower is the 4-gon with the same rule, turned by the
  spot's or block's direction.

### 2.9 Door fallback — the end of the `Manor` constructor

If no porch registered a door and at least one lone projecting bay did (§2.6), one of those candidates is picked at random
and becomes the building's single door. Otherwise the building has no entrance and no pathway.

### 2.10 Colour and light — `ManorView.prepareColors` (27–40 draws per view)

| quantity | wood | slate |
|---|---|---|
| roof base hue / saturation / value | 25° ± 5 / 0.40 ± 0.05 / 0.60 ± 0.20 | 220° ± 10 / 0.20 ± 0.05 / 0.60 ± 0.10 |
| light vector angle (y down: 90° = down the screen, 180° = screen-left) | 90° + 90°·*s4*: concentrated near 90°, mean ≈ 111° | same |
| shadow tint (HSV) | 220° ± 40 / 0.4·*s4* (mostly grey) / 0.4 + 0.4·*m3* (0.4–0.8) | same |
| specular strength *k* | 8·*u*; **off when *k* < 4** (½ of buildings) | 10·*u*; off when *k* < 4 (40 %) |
| specular colour (when on) | 40° ± 40 / 0.6·*s4* / (*k*/10)·*m3*; exponent *k* | same |

*light* = the base colour. *dark* = *light* × the tint, per channel. In effect the sun stands between screen-left and
screen-top, mostly left: the facets facing that way come out lightest, and the shadow (§2.14) falls the opposite way. Before the blocks are drawn, *light* is re-rolled
with the base hue ± 10° and the value moved 10 % toward white. Before round towers (only when towers are round) it is
re-rolled again: hue ± 10°, value 20 % toward white. Square towers keep the block colour; dormers and porches keep the base.

### 2.11 Drawing the roof — `ManorView` constructor, `shaded`, `stroke`, `thin`, `line` and the element drawers

**Order** (the painter's order): porches → each wing (two facets, then ink) → joint lines → every dormer (inner rows then
outer rows, wing by wing) → blocks → towers.

**One facet** (`shaded`). Each facet is passed an *axis*: the direction of its eave edge, taken so that the facet always
lies on the same side of it. For wing facets that is the wing direction for the inner facet and its reverse for the outer
one. For dormers and gabled porches it runs along the element's ridge, one way per facet. For dome porches and towers it
is the chord of each triangle. For blocks it is each facet's eave edge. The axis is thus the facet's downslope direction
turned a quarter turn, and the shading depends only on facet azimuth.

- cos = axis · light vector. The colour mixes *dark* toward *light* by (1 + cos)/2 per channel, truncated to integers.
  If cos > 0 and specular is on, specular × cos^*k* is added, saturating.
- The facet is filled, and its outline is stroked 0.5 px in its own colour (seam hiding).
- **Hatching** (every facet except round-tower cones; never in the simplified view). Lines parallel to the axis run
  through the facet's bounding-box centre and then every **3 units** to both sides, until a line misses the facet. Each
  line is clipped to the facet by its crossings, taken in pairs (`PolyCut.pierce`). The line style is 0.5 px ink at 50 %
  alpha, so the hatch runs along the eaves like tile courses, and dormer courses run perpendicular to the main roof's.

**Ink** is 1 px, 0x33322E:

| element | facets | ink |
|---|---|---|
| wing | 2 | both eaves and the ridge (the plan segment); the mitre line at a joint **only if the dot of the two directions < 0.1** (a turn over ≈ 84°) or at a free end (the gable line); the plan-start gable line on open plans |
| dormer or gabled porch | 2, split along its ridge | outline + ridge |
| dome porch | 32 triangles to the wall midpoint (a half-cone) | outline |
| block | 4: two hip triangles and two trapezoids; the ridge runs along the long axis and stops a quarter of the short side from each end | outline, four hips, ridge |
| round tower | 64 triangles to the centre (a cone) | outline circle, 0.5-unit centre dot, and (not simplified) thin rings at radius·*i*/*n* for *i* = 1 … *n* − 1, *n* = ⌊radius/3⌋ |
| square tower | 4 triangles (a pyramid), hatched | outline and four hips |

Section outlines are one per wing, block, dormer, porch and tower. That is the identity the profile measured
(sections = wings + blocks + dormers + porches + towers), now `[READ]`. The facet identity is 2 per wing, 4 per block,
2 per dormer, 32 per dome or 2 per gabled porch, and 64 per round or 4 per square tower `[READ]`.

**Simplified view** (Space or the menu). Every facet is filled flat in the current *light*, so blocks and round towers
stay a shade lighter. There is no hatching and there are no rings. Grass and paths are not created and the shadow is
hidden. The **grain stays**; only N or the menu hides it. The ink is unchanged, so the obtuse joints of hexagons and
octagons show no line at all in this mode.

**Dead code.** `ManorView.zigzag` draws a zig-zag of amplitude 0.75 and period ≈ 3 along a segment, with one coin for
its phase. Nothing in the bundle calls it.

### 2.12 Grass — `ManorScene.createGrass`, `visuals.Grass`

- A tone per building: hue 70° ± 25 (yellow-green).
- One **free patch** at the building centre with probability ½. In a courtyard plan that centre is the court.
- For each stored plan vertex (the closing vertex of a closed plan counts twice), a **bounded patch** with chance
  2/(stored vertex count). It sits at the vertex pushed away from the centre by a factor 1 + 0.5·*m3* (1–1.5), with
  radius 40 + 60·*m3* (40–100). About 2.5 patches per building.
- **A patch** adds blobs until a 1 % stop: a geometric count, mean 100, recorded 2–647 per patch. Each blob has hue
  tone ± 30, saturation 0.4 ± 0.1 and value 0.6 ± 0.3, with radius 5 + 30·*s4* (5–35, mostly small). It is a radial
  gradient from alpha 0.10 at ⅛ of its radius to 0 at its edge. The next blob is a random step of up to one blob radius:
  unconstrained for the free patch (a random walk that can wander far), and redrawn until inside the patch radius for a
  bounded patch.
- Grass lies under everything, so only the parts outside the roofs show. Nothing ties it to entrances or corners beyond
  the vertex rule.

### 2.13 Pathways — `ManorScene.createRoads`, `visuals.PavedRoad`, `PavedRoad.drawStone`

- One trail per door. Length 100 + 200·*m3* (100–300); it starts at the door and heads out along the door direction.
- A candidate stone every **0.5 units** along the centreline, at a lateral offset of ±12.5 (bell), with radius
  5·(1 − 0.8·*s4*) (1–5, mostly near 5).
- The heading turns by a constant rate *a* of at most 0.01 rad per step (bell). At a step drawn between 40 % and 80 % of
  the trail the rate flips sign and takes a new magnitude, which makes an S-bend.
- A candidate is kept if it clears every kept stone by (r₁ + r₂)·(1 + 4·(i/steps)⁴). The factor grows from 1 to 5, which
  starves the far end.
- A kept stone has 4 vertices at radius r·√2 (one at full radius, three at 20–100 %), a random rotation, and one Chaikin
  pass, giving an 8-point pebble. Its fill is the ground colour × (1 ± 0.1); its outline is 1 px ink at 20 % alpha.
- Measured on the restatement, a trail keeps 33 stones on average. The mean kept radius falls from 3.7 in the first fifth
  to 2.9 in the last, while candidates stay at 4.1: the "stones shrink with distance" of the screenshots is **survivorship
  under the growing clearance**, not a size rule `[INFERRED, simulated]`.

### 2.14 Shadow, grain, scale — `visuals.Shadow`, `visuals.Noise`, `ManorScene.layout`

- **Shadow.** The offset is the light vector turned a quarter turn, scaled to 10/V(tint), so 12.5–25 units long. With the
  light angle in 90°–180° it points between screen-right and screen-down; lower-right is typical. The building as drawn is
  stamped in the solid tint at *i*/steps of the offset for *i* = 1 … steps − 1, steps = ⌊largest offset component⌋. The
  result is one bitmap under the building, blended **multiply**: a swept silhouette with no blur (soft edges come only from
  antialiasing). The recordings' 11–15 stamps per building are `[CHECKED]` equal. The ≈ 90 % CPU share measured by the
  capture is this bitmap work.
- **Grain.** A 64×64 tile of greys at 255·(1 − 0.1·*s4*) (0.9–1.0 of white, mostly white), tiled over the window and
  multiplied **over everything, the roofs included**. The sampled "ground ≈ rgb(200, 192, 177)" is the background under
  this grain.
- **Scale.** 800 model units = the window's shorter side, so ×1.375 in a 1500×1100 window. Buildings measure 300–410 units
  across on average by layout. There is no fit-to-building step, so relative size **is** readable across screenshots.

### 2.15 Controls — `ManorScene.onKey`, `showMenu`, `coogee.Scene`

| key | action | draws consumed |
|---|---|---|
| Enter | new building (`reset`) | plan, model, view, grass, paths |
| **Shift+Enter** | new lighting: view-only rebuild (roof colour, light, tint, specular) plus fresh grass and paths | view, grass, paths |
| C | toggle slate, then the same view-only rebuild | view, grass, paths |
| Space | toggle simplified view, then the same rebuild (grass and paths skipped while simplified) | view (+ grass, paths when leaving) |
| G / P | toggle grass / pathways; turning one on re-rolls it | grass / paths |
| S / N / F | shadow / grain visibility; fullscreen | none |
| Escape | the framework's quit | none |
| L and all other keys | nothing | none |

The right-click menu offers New building, New lighting and Simplified view, then Slate roof, Grass, Pathways, Shadow and
Noise, then Fullscreen. Items show a check bullet when on. Grass, Pathways and Shadow are greyed out while simplified.
There is no export, seed display or URL handling anywhere in the app.

### 2.16 What the grammar produces — distributions from the replay-verified restatement

Monte Carlo over 20 000 buildings on one stream (`sim/mc.mjs` → `mc.out`) `[INFERRED from a CHECKED restatement]`:

| layout | share | wings | blocks / bldg | dormer elements (projecting) | porches | no entrance | door = bay | ≥ 1 tower | mean extent |
|---|---|---|---|---|---|---|---|---|---|
| ring | 20 % | 4: 24 %, 5: 37 %, 6: 26 %, 8: 12 % | 1.22 | 9.0 (6.2) | 0.34 | 17 % | 53 % | 52 % | 412 |
| closed | 20 % | 4: 34 %, 5: 49 %, 6: 17 % | 1.00 | 8.8 (6.0) | 0.33 | 21 % | 51 % | 51 % | 405 |
| rect | 20 % | 4 | 0.95 | 8.6 (5.9) | 0.29 | 27 % | 46 % | 51 % | 403 |
| arc | 20 % | 2: 32 %, 3: 31 %, 4: 21 %, 5: 9 %, 6: 4 %, 7: 2 % | 0.47 | 3.8 (2.6) | 1.46 | 3 % | 8 % | 50 % | 303 |
| snake | 20 % | 1: 2 %, 2: 1 %, 3: 17 %, 4: 24 %, 5: 23 %, 6: 17 %, 7: 10 %, 8+: 6 % | 0.66 | 6.9 (4.8) | 1.48 | 1.5 % | 11 % | 52 % | 391 |
| **all** | | mean 4.5 | 0.86 (0: 38 %, 1: 41 %, 2: 18 %, 3: 3 %) | 7.4 (5.1) | 0.77 | **14 %** | 34 % | 51 % (round 37 %, square on blocks 9 %, square on the plan 5 %) | 383 |

Buildings with 1–3 wings come only from arcs (64 % of arcs) and snakes (19 %). The "cottage" is the tail of those two
layouts, not a branch of its own. Per building, the model consumes about 250 draws, the view 27–40, the grass about
4 600 and the pathways about 3 800. The stream is spent overwhelmingly on decoration.

## §3 The geometry toolkit — what each primitive really does `[READ]`

| primitive (citation) | what it does | edge cases and tolerances |
|---|---|---|
| two-line parameters (`GeomUtils.intersectLines`) | takes two lines as point + direction and returns each line's parameter at the crossing; the first parameter is solved along that line's larger direction component | returns nothing when the determinant is **exactly** zero; no epsilon anywhere. At a mitre, parallel neighbouring wings would crash the corner step. That cannot happen: snakes merge collinear runs and the polygon layouts never repeat or reverse a direction `[INFERRED]` |
| point in polygon (`PolyBounds.containsPoint`) | parity of the crossings of a rightward horizontal ray; an edge counts when its parameter is in [0, 1] **inclusive** and the ray's is ≥ 0 | horizontal edges never count. A ray through a vertex counts both edges and flips the answer; a point on an edge gets whatever the parity gives. Both are measure-zero with random floats. One line test per edge |
| polygon overlap (`PolyBounds.testShapeVsShape`) | true if either polygon contains the other's **first** vertex, else if any pair of closed edges crosses (both parameters in [0, 1]) | touching counts as overlap. Exact and complete for simple polygons, but brute force: no bounding-box prefilter and no separating-axis shortcut, n·m line tests plus two containment tests. Used for blocks, dormers and square towers |
| tower test (`Tower.intersects`) | two round towers overlap when centre distance < radius sum (strict); if either is square, the polygon overlap test | round–square pairs never occur in one building (one style per building) |
| line × polygon (`PolyCut.pierce`) | all crossings of an **infinite** line with the closed edges, sorted along the line, returned as points | a line through a vertex yields that vertex twice; hatching then draws a zero-length piece or drops an odd leftover. Harmless |
| vertex mean (`PolyCore.center`) | arithmetic mean of the stored vertex list, duplicates included | not the area centroid; a closed plan's repeated first vertex biases it (§2.3) |
| centred rectangle (`PolyCreate.rect`) | corners at ±w/2, ±h/2, counter-clockwise in y-up terms | — |
| rotate / translate (`PolyTransform.rotateYX`, `asRotateYX`, `asTranslate`) | rotation from a given sine and cosine, as a copy or in place; translation in place | in-place moves are why the plan's shared vertex objects matter (see identity below) |
| identity de-duplication (`ArrayExtender.clean`) | keeps the first occurrence of each **object** | needed because a closed plan stores its first vertex object twice; a copy of the point would be moved twice |
| weighted / uniform / take-one (`ArrayExtender.weighted`, `random`, `pick`) | one draw each: a cumulative-weight scan (the first weight whose running sum reaches the draw × total), a uniform index, and a uniform index that removes the element | the take-one variant is what stops a tower spot being reused |
| mix (`GeomUtils.lerp`) | linear interpolation, halfway by default | — |
| corner cutting (`Chaikin.render`) | each pass replaces every vertex by two points a quarter of the way toward each neighbour; open or closed, with optional pinned vertices | the stones use one closed pass (4 → 8 points) |
| colour (`Color.hsv`, `lerp`, `multiply`, `add`, `scale`, `rgb2hsv`) | HSV → RGB by the standard piecewise-linear hue ramp, clamped and truncated to 8 bits; per-channel mix with truncation; per-channel product (truncated, unclamped); saturating sum; saturating scale; HSV value = the largest channel | truncation, not rounding, everywhere. The replay reproduces facet colours bit-exactly only with truncation |

**Everything else in the geometry packages is shared library code the app never reaches.** It covers the polygon
abstraction: area, perimeter, centroid, compactness, an oriented box from each edge, a largest inscribed rectangle per
base edge, per-vertex inset with angle-dependent clamps, buffering with self-intersection splitting that keeps the
largest part, smallest-triangle simplification, 4-point smoothing, inverse-distance weights, and the outer outline of a
set of adjacent polygons. It also covers the cutting tools (cut with optional gap and snap, peel, shrink, inset, buffer,
enlarge), a bounding circle, two convex hulls, the neighbour and convexity helpers, and the smooth-curve, dash and arc
drawing helpers. The only numeric tolerances in the bundle's app packages are the snake's collinearity cosine (0.999) and
a 10⁻⁶ in that unused buffer code.

## §4 Randomness `[READ]` unless marked

- **Generator.** The "minimal standard" Lehmer generator with multiplier 48 271. The state lies in 1 … 2³¹ − 2; the next
  state is state × 48 271 mod (2³¹ − 1) and the output is state/(2³¹ − 1). The product is below 2⁵³, so double
  arithmetic is exact. The compiler **inlined** it at every call site: `Random.float`, `normal`, `int` and the rest exist
  but are never called, which is why the profiler saw no generator calls (the capture README's PLAUSIBLE reading,
  now CONFIRMED).
- **Seeding.** Once, as the first statement of `Main`: the current time in milliseconds modulo 2³¹ − 1, read through
  the `Date` constructor. The default seed of 1 is overwritten at once. There is no reset, save or restore, seed display or
  URL handling anywhere in the app. The platform's `Math.random` appears only in an unused screen-shake.
- **Stream layout.** Start-up takes 16 384 draws for the grain tile. Each building then takes its plan, width and model
  draws (about 80–590), its view (27–40), its grass (7 to about 24 000, mean about 4 600) and its paths (0 to about 18 000,
  mean about 3 800). Each recolour (Shift+Enter, C, Space) inserts view + grass + paths; Space skips grass and paths while the simplified
  view is on. Toggling grass or paths on
  inserts that part.
- **History dependence.** Building *k* is a function of the load millisecond and the exact sequence of draw-consuming
  interactions before it. Window size, resizing, the shadow, grain and fullscreen toggles, and opening the menu consume
  nothing. A described building therefore cannot be reproduced. A whole session can be, given its load time and its key
  log, and the recordings show exactly that.
- **The replay** `[CHECKED]`. `sim.mjs` restates every draw-consuming step in draw order, every collision test and the
  full view geometry. `replay.mjs` and `replay_draw.mjs` search the seed near each pass's first console timestamp.

| pass | first console line (epoch ms) | seed clock found | offset | seed | generations | what matched |
|---|---|---|---|---|---|---|
| 10-45-12 coverage | 1 790 333 123 197 | …123 240 | +43 ms | 1 479 245 289 | 3 (cold + 2 Enter) | all 39 counters, every generation |
| 10-45-12 draw | 1 790 333 132 265 | …132 267 | +2 ms | 1 479 254 316 | 3 | exact RGB of all 88 + 110 + 28 roof facets and of every paving stone; shadow stamps; blobs per grass patch |
| 10-48-38 coverage | 1 790 333 320 913 | …320 925 | +12 ms | 1 479 442 974 | 2 (cold + C) | all 39 counters |
| 10-48-38 draw | 1 790 333 326 945 | …326 945 | +0 ms | 1 479 448 994 | 2 (cold + C) | exact RGB of 28 + 28 facets and every stone; stamps; blobs |
| 11-25-38 coverage | 1 790 335 540 698 | …540 710 | +12 ms | 1 481 662 759 | 41 (cold + 40 Enter) | all 39 counters, every generation |
| 10-45-12 profile | 1 790 333 114 783 | not attempted | | | 3 | a profile pass records neither counts nor colours |

  The 39 counters are per-generation call totals read from `coverage/gen-N.calls.json`. They cover the plan and model
  (layout, wings, blocks, dormers, porches, tower candidates, tower tests, towers), the tests (shape-list builds,
  line-intersection tests up to 5 638 per building, point-in-polygon, overlap), the drawing (facets, section outlines,
  ink lines, hatch piercings, thin-line switches, outlines, HSV conversions, colour mixes, multiplies, specular additions,
  colour scalings), the dressing (trails, stones, circle records, Chaikin passes, grass patches, drawn circles), and the
  helpers (interpolations, in-place additions and scalings, point copies, rotations and translations, weighted picks,
  random picks, take-one picks).
  Each search window (−5 s to +30 s for coverage passes, −3 s to +5 s for draw passes) held other seeds that matched
  gen-0 on eight model counts: 2, 17 and 11 of them. Only one per pass survived every counter of every generation. The
  C generations re-rolled the lighting on the same building (10-48-38 coverage: light 91.5° → 108.9°, specular strength
  1.24 → 0.30), which confirms that C is a slate toggle plus New lighting.
- **Consequences for the design** `[INFERRED]`. FM shows three things our design must not reproduce: randomness shared
  across model and decoration, decoration dominating the stream, and every interaction shifting every later building.
  The profile's "give decoration its own seeded stream" (manor.md §6) is confirmed as necessary. The reference's
  recoverability also shows why our fixtures should record the seed, not the clock.

## §5 Data assets present — named and shaped, never reproduced

- **A procedural palette, no colour table.** Two roof materials, each an HSV centre with bell spreads (§2.10); a block
  and round-tower lightening; a shadow tint; a specular colour; the grass tone and blob ranges; stones at the ground
  colour × 0.9–1.1; one ink, 0x33322E (1 px lines, 0.5 px hatching at ½ alpha, stone outlines at 0.2 alpha); the window
  background 0xCEC5B6. Example values: wood hue 20–30°, slate hue 210–230°, grass hue 45–95°.
- **A UI palette.** Four greys installed by `Main` for the menu (the ink plus three lighter warm greys, for example
  0xB3AA98). They affect UI chrome only.
- **Layout parameter lists.** Three short side-count lists (8, 6 and 9 entries) whose repeated entries act as weights
  (stated as probabilities in §2.2), and five equal layout weights.
- **Bundled assets.** One font (Share Tech Regular, 46 596 bytes, used by the menu) and the favicon. There are no
  images, wordlists, name grammars, tables or text content. The only raster the app uses, the grain tile, is generated at
  start-up.

## §6 Corrections — profile claim | what the code says | where it matters

"Design §" means `docs/ARCHITECTURE.md`. The profile is `research/findings/manor.md`; the capture files are
`captures/manor/README.md` ("cap") and `README-frequencies.md` ("freq").

| # | profile claim | what the code says | design § · profile § |
|---|---|---|---|
| 1 | Each wing runs createSlab, updateGeometry, spawnDormers in turn; createSlab is "the wing's footprint quad" | The work runs in passes: corners for all wings, then blocks for all, then rows and a porch per wing. `createSlab` is the **optional hip block**; the footprint is built by `updateGeometry` `[READ]` | §2.6 (a wing and a hip block are different records) · manor §1 flow, §2.1, §2.3 |
| 2 | arc = "an open chain of 4 wings bending one way — U / C" | 2–7 equal chords of a regular 4–8-gon, end segments shortened by 1/(segment count); ⅓ of arcs are 2-wing L's `[READ]` | §2.6 stage-3 layout vocabulary · manor §2.2, §3.3 (1) |
| 3 | ring = "regular-ish, 4–8 sides"; the gallery's rectangles, rhombus and pentagon read as rings | A ring is exactly regular with 4, 5, 6 or 8 sides (P ¼, ⅜, ¼, ⅛). Rectangles are `rect`; irregular quadrilaterals are `closed`; pentagons are ring or closed `[READ]` | · manor §2.2, §4.1 |
| 4 | readings of screenshots: 48-38 draw = "open, roughly triangular courtyard" with "one projecting gabled bay painted first"; the "projecting stub" failure mode | The replay shows 48-38 draw = `closed`, 4 wings, with **a gabled porch** painted first and two hip blocks painted last. 45-12 draw gen-0 = `rect` with a round tower, gen-1 = a 3-wing `arc` with a dome porch and a round tower of radius 87, gen-2 = `closed` `[CHECKED]` | · manor §2.2, §2.3 (draw cross-check), §7.3 |
| 5 | a square hip block has a pyramid roof; "a pyramid block reads as a square with an X" | A block's ridge stops ¼ of the short side from each end, so a square block keeps a ridge half its side. The 4-facet pyramids are **square towers**, which stand on block centres when a building has both `[READ]` | §2.6 `RoofSpec` (hip ≠ pyramid), §8.2 · manor §2.3, §5 |
| 6 | the collision test "must reject only some overlaps (probably block–block or block–tower)"; "which overlaps count is not identifiable" | Blocks: the corner-parity rule plus block–block. Dormer elements: against every earlier element and every block. Towers: tower–tower only. Porches: never. Nothing is tested against a wing, and a tower never against a block `[READ]` | §2.6 stage-3 collision set (the lot polygon would be a fifth kind) · manor §2.3, §3.1, §3.3 (4), §7.3 |
| 7 | dormers are "2-facet gable or hip dormers … rows of 3–6 read as crenellation" | One row per eave with a uniform slot count and random gaps. About 69 % of elements **project past the eave** (cross-gables over bays); the rest are true dormers set back from it. A lone projector can be stretched up to 4× and doubles as a door `[READ]` | §2.6 (dormer and bay as distinct elements) · manor §2.3, §9 |
| 8 | towers are round cones at wing ends and ring corners; "the concentric rings … not isolated"; `Tower.intersects` a mutual rejection | Round (¾) or square (¼, only with gabled porches). Square towers go on block centres when blocks exist; otherwise towers go on joints, wing midpoints and free ends. The rings are thin circles every ~3 units drawn by `drawTower`. The rejection is tower–tower only `[READ]` | §8.2 (tower paint) · manor §2.4 |
| 9 | "createPorch runs only when a half-dome porch is actually built"; porch-less buildings get "a small gabled bay" doorway | `createPorch` builds either style; the style is one coin per building. With no porch, one random **lone projecting bay** becomes the door. With neither, there is no entrance: 14 % of buildings, 17–27 % of courtyard plans `[READ]`+`[CHECKED]` | §2.6 entrances (owner: always a street-facing door — FM guarantees none) · manor §2.5, §7.3 |
| 10 | grass "placed against the building's walls, typically at re-entrant corners and near the entrance" | Patches sit at plan vertices pushed outward (chance 2/vertices each), plus a free random-walk patch from the centre (½), which in a courtyard plan starts in the court. Nothing refers to the entrance `[READ]` | §4.9 greenery (a dressing rule, not a siting rule) · manor §2.5 |
| 11 | stones "thin out and shrink with distance from the door" | Thinning: the clearance factor grows from 1 to 5 as (step fraction)⁴. The size law never changes; the shrinking is survivorship `[READ]`+`[INFERRED, simulated]` | · manor §2.5 |
| 12 | ground "flat beige ≈ rgb(200, 192, 177)" plus a noise tile; noise composited under the building | The background is rgb(206, 197, 182). The 0.9–1.0 grey grain is **multiplied over the whole scene, roofs included** `[READ]` | §8.2 (the texture-tint-by-multiply idea is the same) · manor §2.5, §5; cap draw record |
| 13 | building "centred" and "scaled to fit the canvas"; "scale ambiguity … framed to the same screen size (fit-to-view)"; "no world scale" | The scale is fixed: 800 model units = the window's shorter side. Centring uses the vertex mean, which puts closed plans slightly off-centre. Sizes compare across screenshots. The unit is consistent (wing width 60–90) though not metric `[READ]` | §2.6 metric scale · manor §2.6, §3.1, §7.3, §9 (6) |
| 14 | the whole building is rotated (evidence: `PolyTransform.rotateYX` 8–15 calls) | Orientation comes from a random phase (ring, closed, arc) or a random turn (rect, snake). The copying rotate is the **dormer** placement `[READ]` | · manor §2.6 |
| 15 | C = Slate roof; "the creator's 'It's C for New lighting' is out of date"; "New-lighting hotkey not found" | C toggles slate **and** runs the New-lighting rebuild. **Shift+Enter** is New lighting. Space, F, G, N, P, S and Escape are also bound `[READ]`+`[CHECKED]` (the C generation's light changed) | · manor §1, §7.1, §7.2; cap target table |
| 16 | New lighting re-rolls "light direction / specular intensity"; the building is not rebuilt | It also re-rolls the roof base colour, the shadow tint, the grass and the pathways; the model is untouched `[READ]` | §8.2 · manor §1, §5 |
| 17 | shadow "11–15 draw + colour-transform passes … soft, slightly blurred …; PLAUSIBLE: steps the silhouette outward to fake a penumbra" | The silhouette is stamped along the offset (a sweep) in a solid tint and multiplied. There is no blur. The offset is 12.5–25 units, set by the light and the tint `[READ]`+`[CHECKED]` | §8.2 `shadowPass`, §8.4 · manor §5 |
| 18 | painter's order "porch → wings → dormers → towers and diamonds", then "shadow, noise, grass, pathways composited under the display-scale building" | porch → wings → dormers → **blocks → towers**. Layers from the bottom: background, grass, paths, shadow, building, **grain on top** `[READ]` | §8.2 layer order · manor §2.3, §5 |
| 19 | simplified view: "flat single roof colour, ink outlines of every facet … no noise" | Blocks and round towers keep their own lighter flat colours. Obtuse joints (hexagon, octagon) show **no** line. The grain stays unless toggled `[READ]` | · manor §1, §5 |
| 20 | `zigzag` "never ran …; PLAUSIBLE: crenellations or a thatch edge" | Nothing in the bundle calls it (dead code); it would draw a 0.75-amplitude zig-zag `[READ]` | · manor §2.1, §8 (3) |
| 21 | cap: `intersectLines` and `gate` "change across the C pair … also serve work that C re-rolls" | The line-test drop (4 672 → 3 554) is the **model's** collision and mitre tests (1 118) not re-running; the hatching is identical. `gate` moves with the grass-blob colour count `[CHECKED]` | · cap "Exact call counts" |
| 22 | freq: gens 8 and 31 ambiguous (2 gabled porches or 1 pyramid tower) | Both are 2 gabled porches plus 1 round tower `[CHECKED]` | · freq §4 |
| 23 | freq: "No 7-wing building was seen"; "rect is the only layout that produced 2 hip blocks" | 7 wings occur (10 % of snakes, 2 % of arcs). Rings average the most blocks, 1.22 per building against rect's 0.95 `[READ]`+`[INFERRED, simulated]` | · freq §3, §4 |
| 24 | "no determinism handle … seed not exposed"; `Date.now` 0 calls | The seed is the load millisecond read through the `Date` constructor, so it is **recoverable**: five of six passes were replayed exactly `[CHECKED]` | §6.1 streams, §13.2 fixtures · manor §6; cap randomness row |
| 25 | model step "0.6–1.7 ms per building" used as the stage-3 cost basis | Those are cold, profiled samples from the first three builds of a page. The restated model runs about 0.08 ms per building warm, and model plus view geometry plus dressing about 0.66 ms `[INFERRED — our restatement's timing, not the reference's]` | §12.7 stage-3 budget; `docs/validation/redteam-scale.md` SCL-13 · manor §4.4 (4), §6 |
| 26 | free arc ends "consistent with … a flat gable cut [INFERRED]"; one wing width per building [SHOWN]; slate toggled per gallery building [INFERRED] | All three CONFIRMED `[READ]` | §2.6 · manor §2.3, §3.3 (2), §4.1 |

## §7 The critic's open questions, answered from the code

No critic file covers Fantasy Manor. The open questions on record are the profile's §8 list, the review-queue rows B14 and
B15 (`docs/FABLE-REVIEW-QUEUE.md`), the capture README's deferred items, and the red-team's use of the model cost
(SCL-13). Each is answered below.

| question | answer | grade |
|---|---|---|
| manor §8 (1): layout weights, and which shapes `closed`, `rect`, `snake` produce | Equal weights; exact constructions in §2.2. Every recorded coverage and draw screenshot is now labelled by replay (`sim/detail.out`) | ANSWERED `[READ]`+`[CHECKED]` |
| §8 (2): segment counts and angles per layout, 3 or 7 sides, regularity, segment lengths, wing width | Rings are regular 4/5/6/8-gons; closed plans have 4–6 jittered vertices; arcs 2–7 chords; snakes 1–11 segments at right angles; rect 4. There is never a 3-gon; 7 comes only from arcs and snakes. Lengths follow from the radii and pitches in §2.2. One width per building, 60–90 | ANSWERED `[READ]` |
| §8 (3): per-element rates and rules (blocks, dormer spacing, entrance probability, towers, `zigzag`) | §2.5–§2.9 give every rule; §2.16 gives the resulting rates. `zigzag` is never called | ANSWERED `[READ]`, rates `[INFERRED, simulated]` |
| §8 (4): the light model behind New lighting | §2.10–§2.11: a light angle of 90–180°, a shadow tint, and a Lambert-like mix plus a specular term (on in 50 %/60 %, exponent 4–10). New lighting re-rolls all of it plus the roof base colour, grass and paths | ANSWERED `[READ]`+`[CHECKED]` (exact colours) |
| §8 (5): are the "cottage-like" buildings a separate branch? | No. They are the short tail of arcs (64 % of arcs have ≤ 3 wings) and snakes (19 %) | ANSWERED `[READ]` |
| §8 (6): how PM rasterises a lot and how DW takes a plan | Not in this bundle; FM has no plan input | OUT OF SCOPE (Dwellings lanes) |
| B14: "the five-layout grammar; no plot/scale/orientation input; the proposed lot-driven adaptation" | The grammar is confirmed and corrected (§6 rows 1–8). There is no plot or orientation input, but there **is** a fixed unit scale (row 13). The model's whole input is one polyline and one width (`Manor` constructor), so a lot-derived path and width plug in directly. Adding the lot polygon to the shape list extends the collision set; restricting the porch options fixes the street door. The code shows these seams exist; the adaptation itself stays a design proposal | CONFIRMED seams `[READ]`; adaptation `[INFERRED]` |
| B15: layout and element classification rules; frequencies | Every rule in freq §2 holds in the code: one trail per door, the porch/tower facet split, and `Tower.new` counting candidates. The two ambiguous buildings are resolved (row 22) | CONFIRMED `[READ]`+`[CHECKED]` |
| cap, deferred: New lighting, Simplified view and the Grass/Pathways/Shadow/Noise toggles were never recorded | Their code paths are read (§2.15). New lighting and Simplified are replay-equivalent to the recorded C path minus the slate flip | ANSWERED `[READ]` |
| cap: which hotkey is New lighting; what L does | Shift+Enter; L is unbound | ANSWERED `[READ]` |
| SCL-13 (redteam-scale): FM's model cost as the stage-3 basis | The work per building is a few hundred polygon tests; §6 row 25 gives the warm estimate. For the stage-3 cost contract, generating the geometry is cheap; the reference's cost sat in rasterising the shadow | ANSWERED `[INFERRED]` |

## §8 What remains unknown

- **Nothing is obfuscated and there is no server side.** The bundle is readable Haxe output and FM makes no generation
  requests. Every app class was read (§9).
- **The profile pass's seed** (10-45-12 profile) was not attempted: that pass records neither counts nor colours. Matching
  its three screenshots against rendered candidates would work but was not needed.
- **Images from other builds or sessions** (the 2020 release gallery, the itch images) cannot be replayed: their load
  times and key logs are unknown. The CDN build is version 1.0.0, build 890, uploaded 2026-06-24. Whether the 2020 build
  had identical constants is unknown; the gallery shows the same element vocabulary (PLAUSIBLE same grammar).
- **The one-point-snake crash's visible effect.** A one-point plan throws when the wings are linked, about once in
  20 000 buildings on the restatement. What the page then shows (probably the previous building on Enter, and a failed
  start on a cold load) was not observed `[INFERRED]`.
- **Escape.** It calls the framework's quit; the effect in a browser was not examined.
- **Library rendering internals** (OpenFL's vector rasterisation, the WebGL multiply blend, antialiasing, the colour
  transform used by the shadow stamps) were read only as far as the point class. The record-level matches (colours,
  stamps, counts) make them immaterial to these findings.
- **Intent.** Why the block ridge is inset by exactly a quarter of the short side, why the joint line appears only above
  an ≈ 84° turn, and what `zigzag` was for are not recoverable from code.

## §9 Reading record

- **Bundle:** `captures/manor/2026-09-25T11-25-38/coverage/network/bodies/0002-a1c7fb89.js` (sha256 `0bd521ff…`,
  byte-identical in all six manor capture passes).
- **Class map:** `scratchpad/code/manor/classes.tsv` (562 markers, each with name, package, identifier, kind, line range,
  byte range and static-initialiser count). **Extraction script:** `scratchpad/code/manor/extract.py`, written for this
  non-minified format. It keys on the class-table registrations and the enum registrations, starts each body at the
  column-0 constructor line, ends it at the next class, and appends each class's static initialisers.
  **Extracts:** `scratchpad/code/manor/classes/` (61 files).
- **Classes read in full: 61 of 61** app and entry classes. That is `com.watabou.manor` 10/10 (`Main`, `ManorScene`,
  `ManorView`, `model.Manor`, `model.Wing`, `model.Tower`, `visuals.Grass`, `Noise`, `PavedRoad`, `Shadow`),
  `com.watabou.geom` 12/12, `com.watabou.utils` 10/10, `com.watabou.coogee` 23/23, `com.watabou.processes` 3/3, and
  the generated entry classes 3/3. The library class `openfl.geom.Point` was also read, for exact arithmetic in the replay.
  Model and geometry were read first, then view, visuals, utils and UI.
- **Check scripts** (reader-tier, `scratchpad/code/manor/sim/`):

| script | output | what it establishes |
|---|---|---|
| `sim.mjs` | — | the restatement: every draw-consuming step in draw order, every collision test, and the full view geometry, with call counters |
| `replay.mjs` (+ `observed.json` from `coverage/gen-N.calls.json`) | `replay.out`, `replay2.out` | seed search and 39-counter replay of all 46 coverage generations: 3 of 3 passes, every generation equal |
| `replay_draw.mjs` | `replay_draw.out` | seed search and exact facet colours, stone colours, shadow stamps and blobs per patch for all 5 draw generations |
| `detail.mjs` | `detail.out` | per-building parameters of every replayed recording (layout, wings, blocks, rows, porches, towers, light) |
| `mc.mjs`, `mc2.mjs` | `mc.out`, stdout | distributions over 20 000 buildings; the outer-side orientation check |
| `stones_mc.mjs`, `draws.mjs`, `bench.mjs` | stdout | stone survivorship; draws per phase; restated cost and the one-point-snake rate (10 in 200 000 plans) |

- **CONFIRMED vs PLAUSIBLE.** Everything marked `[READ]` is CONFIRMED on disk. Everything marked `[CHECKED]` is CONFIRMED
  by execution: exact replay of 51 recorded generations from five recovered seeds. Items marked `[INFERRED]` are
  PLAUSIBLE: the design consequences, the restated timing (§6 row 25), the stone survivorship reading, the crash's visible
  effect, and every distribution in §2.16. The distributions come from a replay-verified restatement, so they are strongly
  supported but still simulation, not recording.
- **Firewall.** This file describes the logic in prose; it quotes no code and reproduces no data table. The scratchpad
  scripts restate the reference only for testing, and they stay reader-tier.

## Fable review (2026-09-27) — B-code/manor

Verdict **CONFIRMED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`, receipts FM 1–5). Read whole.
Firewall: no fenced code; three fixed colour values and two rgb forms (one our own sample) within R5's five examples; hue and
value ranges are procedural (logic); the side-count lists stated as probabilities; identifiers citation-only; the harness stays
reader-tier (critic R9; the three common-noun class names it shares with the reference are ruled not to be identifier adoption,
J-Fcode-10). Re-derived on the unminified extracts (`ManorScene`, `Manor`, `Wing`, `Tower`, `ManorView.drawDiamond` and
`prepareColors`): the five equal layouts with their side-count odds, radii and the snake's stop chance; the wing width
90 − 30·s4; the mitred slab and free gable ends; the hip block's chance, sizes, snapped position, joint-only swap coin,
corner-parity rule and block–block test; the dormer/bay rule, slot count, gap drop and 4× stretch; the four porch options with
their preconditions, odds and widths; the door fallback; the two tower branches and the tower–tower-only test; the ridge inset
by a quarter of the short side (never a pyramid); the fixed 800-unit scale; the light angle 90° + 90°·s4; the key bindings.
Executed: `sim/replay.mjs` re-run (node 24.12) — output byte-identical to `replay.out` (three passes, all 46 coverage
generations, all 39 counters); `sim/mc.mjs` re-run — identical to `mc.out` (13.9 % of 20 000 buildings without an entrance,
69 % of elements projecting, mean width 83.00). Every [READ] and [CHECKED] statement this reading makes about the model is
therefore CONFIRMED by this seat's own reading and execution. PLAUSIBLE stays PLAUSIBLE (the §2.16 distributions as a
restatement's statistics, the stone survivorship, the crash's visible effect); the timing is released as a restatement
measurement (evidence gate, J-Fcode-5). No correction is needed. Note: §9's scratchpad path names the reader session; the
extracts and harness this review used are the mirror at
`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/code/manor/`.

## Fable review (2026-09-27) — B-code/manor (critic)

Verdict **CONFIRMED**. R-F1–R-F5 stand, all five re-derived here; I6 is trivial; I7 is settled by R9 (J-Fcode-10). The critic
did not re-run the replay; this review did, with identical output. Its list of what it did not re-derive is accurate and this
review closed it (porch options, door fallback, dormer rows and bays, the light law; grass, pathways and shadow by the exact
replay of their counters and colours).

## Fable review (2026-09-27) — B-code/manor (impact)

Verdict **CONFIRMED**. Item 59 of `docs/AMENDMENTS-2026-09-27c.md` rests on the collision pairs, the porch lottery and its
fallback, the fixed scale, the five layouts and the hip-block ridge — all re-derived above; the ≈ 14 % entrance-less share is a
restatement statistic that reproduces (the design text quotes no number); the timing note is RELEASED in the evidence gate. The
editor text carries no reference identifier, code, grammar, palette or word list.
