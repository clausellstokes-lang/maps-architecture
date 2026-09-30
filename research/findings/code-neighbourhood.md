# code-neighbourhood — the Neighbourhood generator read from its compiled bundle

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/neighbourhood; no Fable critic has checked it). Queue row
> B-code/neighbourhood in docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 items and the §6 corrections
> (rows 1–38) against the bundle before any of them is carried into docs/ARCHITECTURE.md, together with the §2.13 verdicts on
> the S8 recipe (§4.6); the firewall (no code, no asset copied, identifiers citation-only), including a ruling on whether the
> per-map parameter table of §2.0 and the template and building constants of §2.1 and §2.7 are logic, not content; which of
> the earlier NG bent-cut addenda (queue rows B09–B11) these rows supersede; and the PLAUSIBLE items of §9. The scratchpad
> cited below is mirrored (ephemeral) at
> `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/code/neighbourhood/`.

**Lane** `code/neighbourhood` · **written** 2026-09-27 · **bundle** `captures/neighbourhood/2026-09-25T10-55-59/draw/network/bodies/0003-7553bd15.js`
(1 166 518 B, sha256 `ed5c88f3f2661db6…`, byte-identical to `0019-7553bd15.js` of the same capture) · **build** itch `html/11441280`
= **NG 1.2.2** by the bundle's own application metadata — the same build as every NG recording in the corpus (the 09-21 base,
ring and size captures and the 09-25 vertex captures), so every profile number applies to this code · **class map**
`scratchpad/code/neighbourhood/classes.tsv` · **per-class extracts** `scratchpad/code/neighbourhood/classes/` · **checks**
`scratchpad/code/neighbourhood/sim/` (scratchpad = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/`).

**Grades.** `[READ]` = seen in the bundle (class and method named); `[INFERRED]` = our reconstruction or a consequence we
derived; `[STATED]` = the author's words elsewhere; `[CHECKED]` = a rule read in the bundle, restated in our own words as a
small script, and run against the recorded captures (§9 lists the scripts and their outputs). **CONFIRMED** = read on disk or
executed; **PLAUSIBLE** = reasoning only. Constants are facts about the reference, stated as numbers; nothing here is code;
data assets are named and shaped, never reproduced. Reference identifiers are citations only.

---

## §0 Headline — the ten things the code settles

1. **The bent cut is fully specified, and it is not the recipe the design measured.** `[READ]` NG's plain bisector (its
   `Bisector`, method `makeCut`) builds every cut the same way: take the face's minimum-area box; pick a position on the
   long axis as the **midpoint of the face centroid's fraction and a bell draw** (mean of three uniforms); run the short-axis
   line through that position; of all the edges that line crosses, the **start edge is the one most parallel to the long
   axis** — deterministic, not a coin; leave the start point along that edge's normal; measure the distance F to the first
   boundary hit; put the **corner at a bell-random fraction of F** (mean of three uniforms, kept at least one "minimum
   offset" from both ends); then pick the **far edge from the corner**: among edges whose perpendicular foot from the corner
   lands inside them, unobstructed and on the forward side, the one most perpendicular to the first leg; the second leg is
   that perpendicular. Both ends are therefore constructed exactly square to the edges they touch, and the bend is always
   built first — a straight cut is a bend that was flattened afterwards (item 3). This closes C13's mechanism: the one
   `PointExtender.project` call per cut is the centroid's projection onto the long axis (V5's reading, CONFIRMED).
2. **The street-width law is exact and seed-determined.** `[READ]`+`[CHECKED]` A street's model width is the per-map
   minimum plus the per-map range times (its own cut length ÷ the template's axis length, capped at 1) raised to a per-map
   power; the renderer strokes it at the palette's road-width ratio (0.4 by default). Every one of those per-map numbers is
   drawn from the seed before any geometry. Restated as a script and fed only the seed, it reproduces **every drawn street
   width in all eight vertex maps to rms 0.0003–0.0008 model units** (max 0.005), with no fitted parameter for the area,
   ring and street templates (axis 1500, 1500 and the main street's own length) — 10–80× tighter than the profile's linear
   fits. The template street width (7.750 / 8.639) is the per-map maximum × 0.4, exactly. The profile's "free-end term" is an
   artefact: junction ends are drawn 0.3 × the crossed street's width beyond the cut, free ends are not.
3. **Straight versus bent, fillet versus sharp: two explicit tests.** `[READ]`+`[CHECKED]` A street corner is flattened when
   its triangle is flat — height under 2 units, or height under 2 % of the chord (lots use only the 2-unit test). Recorded
   sharp corners sit exactly above that edge (177 of 178 have area ÷ chord² ≥ 0.0100; the rule's edge is 0.0100). A kept
   street corner then stays sharp with probability sin²(θ/2) + cos²(θ/2)·min(1, minimum-building-side ÷ shorter leg), else
   it becomes a circular arc **tangent at the far end of the shorter leg — the whole shorter leg curves** — stepped at
   about the per-map minimum building side. Checked: 200 of 200 recorded arcs start or end at a drawn end vertex; expected
   fillets under the rule 209.9 against 200 observed of 378; chord ÷ minimum building side ≥ 1.05 in every arc. The
   profile's "53 %, no predictor" and "tangent ≈ 0.73 × shorter leg" are measurement readings of this rule (§6).
4. **The stop test is area against a random threshold, per node.** `[READ]` A face stops splitting when its area is below
   the minimum area × (variance ^ a folded bell draw in [0, 1]) — a fresh threshold at every node, between the minimum and
   minimum × variance, peaked near the minimum. Streets use minimum = (minimum block side)² and variance = the per-map block
   variance (3.2–16); lots use minimum = (minimum building side)² and the per-map building variance (1.6–4). There is no
   extent test. A cut whose two pieces differ in area by more than 2 × variance is retried in a rotated frame (36° steps,
   ten times), then the face is left whole.
5. **Blocks are hollow by construction, not by a filter on a failed setback.** `[READ]` Lots come from the same bisector
   inside each ordinary block; a lot is built only if (a) one of its edges lies on the block boundary, (b) it passes a shape
   test (area ≥ half the minimum building area, fills ≥ half its box, aspect under 3), and (c) none of its edges lies on the
   **hood outline**. Lots with no frontage are never built — they are the court — and the court gets the block's green and
   its trees when the frontage ring is complete (every frontage lot valid), or with `leafy` on a coin. The profile's 42 %
   "discard" is these three rules; the uneven street wall is a separate per-lot random setback (item 6).
6. **The uneven street wall is a per-lot random pull of the whole block polygon.** `[READ]` Each built lot is intersected
   with the block polygon shifted toward the block centroid by a uniform draw up to min(√lot area ÷ 3, max street width ÷ 2 ×
   a per-map indentation factor in [0, 2]); shifts under half a unit are skipped. That trims the street-facing sides only —
   the creator's "method I have doubts about" is exactly this translation, which misaligns on curved or concave blocks.
7. **Templates are seed geometry plus one or two bisections, and every constant is readable.** `[READ]` Area and ring
   outlines are random star polygons (4–12 vertices, one Chaikin pass, fitted to an axis of 1000 / 1500 / 2000 units by
   size, aspect 0.4–1, turned ±45°); street is a spindle strip around a three-point main street at the per-map maximum
   width; square is a rectangle or round plaza (100 / 200 / 400 units by size) with a through street, both at the maximum
   width; ring roads are **jittered hexagons smoothed by three Chaikin passes (48 vertices)** at geometrically widening
   spacing, not polar samples; the ring centre is cut, or else becomes a square, a green or a manor with equal chance.
8. **One MINSTD stream, used everywhere, including the renderer and a session cache.** `[READ]` The only randomness is the
   Park–Miller generator (48 271, 2³¹ − 1), inlined at every call site; the seed is the raw state; there are no reseed
   points. Model, naming, roof colours, hatching lengths, trees, wells and night lights all draw from it, so the next Enter
   seed is the state the whole view leaves behind. **Two things make a map depend on session history:** the tree-spacing
   tile is cached per rounded radius for the whole session (a later map reusing a cached tile skips thousands of draws), and
   the night-lights layer draws on every relayout. Any exception during generation regenerates with seed + 1 (explicit
   seeds; otherwise from the advanced stream).
9. **Several profile readings of the renderer are wrong in mechanism, right in statistics.** `[READ]` Roof colour is a
   power-of-two scale (2^(variance × bell), base 3 for large buildings), not 1 + variance × normal; hatching strokes run
   **parallel to the ridge from both gable ends**, one taper from each end to a random point up to mid-chord, plus two
   heavier ridge tapers; trees are not depth-sorted (large-tree pins sit in a layer under the houses, block trees above);
   there are no manor walls — the stone pieces are a large building's end pavilions and ridge strips; the fountain basin is
   `colorWater`; the "props" layer is chimneys; the free title corner is the one covering the fewest outline vertices.
10. **Scale is recoverable: the JSON export writes 0.35 per model unit.** `[READ]` The GeoJSON writer shared with MFCG
    (which writes 4 per unit = metres there) is set to 0.35 for NG, so one NG unit is 0.35 m in the export
    `[INFERRED metre reading]`: the medium area hood ≈ 525 m across, minimum street 3.5–7 m, maximum up to ≈ 21 m, minimum
    building side 8.75–12.25 m, tree radius 5–9 m. The Dwellings hand-off grids a building at 10 units per cell.

**Profile claims the code overturns** (details and design impact in §6): `isSmallEnough` as an extent test (Q1);
`detectStraight` as frontage snapping; `MathUtils.gate` clamping the split (it is colour clamping, exactly 3 per colour scale);
"the plain bisector never subtracts a corridor" (it does, inside the cut); street width ± jitter and the free-end term; start
side as a coin; far side by the perpendicular ray; fillet 53 % with no predictor and tangent 0.73 × leg; corner at half the
projection; `indentFronts` as a corridor setback; `swapAxes` as a gable re-roll; hatching as mid-chord pairs on split slopes;
roof k = 1 + var·N; trees depth-sorted; manor walls; `spawnPin` placing wells (it is an empty stub); `colorWater` unused;
palette strings re-parsed on every use; "no whole-map retry"; H-R polar rings; `assemble` and `getGreenTable` as NG routines
(they are OpenFL's shader assembler and colour-matrix code); the Poisson field as a per-generation object.

---

## §1 Class map by package

Marker scan of the whole bundle: 531 markers (494 classes, 19 enums, 18 interfaces); class bodies end at the next marker,
static initialisers come from the boot region (byte 1 058 861 onward). Extracted: every `com.watabou.*` entry — 152.
The app's own packages: **`neighbourhood` 48** (47 classes/interfaces + 1 enum; the brief's "46" counted markers written
without a space), **`geom` 18**, **`utils` 14** (13 + 1 enum), **`coogee` 52**; shared libraries also extracted: `tracery`
10, `nlp` 2, `formats` 4, `system` 2, `processes` 2.

**Entry point and call order** `[READ]`: the application's main class resets the generator from the clock and opens the map
scene; the scene's activation calls its restore routine, which reads `seed`, `tags` and `name` from the URL and calls its
reset. Reset loops over `Hood.create` until it returns without an exception (seed + 1 per failure when a seed was given),
then rebuilds the view. `Hood.create` → (random tags inside save/restore, or tag resolution) → `Settings.processTags` →
template constructor → `Hood` constructor: **build** (template) → **populate** (block contents) → **name**. Then the view:
`HoodView` (greens, roads, pins, houses, chimneys, trees; shadows inserted third) → layout (framing on the building cloud,
title corner, night lights). Enter, a tap, the tags dialog and the permalink dialog all re-enter reset.

### 1.1 `com.watabou.neighbourhood` root (3) and `scenes` (1)
| class | one line |
|---|---|
| `Main` | app entry: clock reset of the generator, saved style restore, scene switch |
| `Style` | the 26-key style (defaults, apply, edit dialog) and the random-style generator; derived light direction and ambience tints |
| `URLState` | URL parameters (get/set/remove, `replaceState`), permalink base |
| `scenes.MapScene` | the scene: reset loop, keys, context menu, framing, title corner, exports, toggles, dialogs |

### 1.2 `model` (10 incl. 1 enum), `model.content` (5), `model.templates` (4)
| class | one line |
|---|---|
| `Hood` | the neighbourhood: create (tags → template), street width law, the street-level bisection, content dispatch, fillet (`semiSmooth`, `getCircle`, `getArc`), framing cloud, building lookup |
| `Settings` | tag vocabulary, random tags, tag resolution, the per-map parameter draws (`processTags`), tag descriptions |
| `Street` | a street: width, source course, corridor ("gap"), closed flag; drawn course with end extension and twisting |
| `Block` | a block: shape, content, buildings, greens, trees, cached area/centroid/box |
| `Building` | footprint, box, height, plan (simple / T / cross for large buildings), cupolas, Dwellings hand-off (`open`, `getPlan`) |
| `Wing` | a roofed box: height, stone and shadow flags, chimney, entrance, dormers |
| `Cupola`, `CupolaType` (enum) | dome / cone / pyramid, radius, dome rings, stone tip |
| `Pin` | a point object: position, size, angle, type (well / large tree / fountain) |
| `Namer` | naming through the grammar and the Markov surname source |
| `content.BlockContent` | content base: runs populate, sorts trees, shared tree-spacing tiles (session cache) |
| `content.Normal` | lots, frontage and hood-edge filters, green and court trees, street-wall setback, houses |
| `content.Manor` | one large building on a box pressed to one side, optional green and grove |
| `content.Empty` | paved yard, green-with-grove, or a pin (well / large tree / fountain) |
| `content.Green` | a green with an optional grove (ring centre only) |
| `templates.AreaHood` | star-polygon outline + one bisection |
| `templates.StreetHood` | spindle outline around a main street + two bisections |
| `templates.SquareHood` | rectangular or round plaza + through street + two bisections |
| `templates.RingHood` | outline, hexagon rings, one hole-aware bisection per band, centre rule |

### 1.3 `utils` (7)
| class | one line |
|---|---|
| `Bisector` | the plain recursive bent-cut bisector (stop test, cut, split, straightening) |
| `BisectorEx` | the hole-aware variant for annuli (slits, alternative cuts, retries) |
| `ExPolygon` | polygon with holes: contours, next-vertex map, area, corridor subtraction |
| `Offsetter` | per-edge polygon offset with self-intersection loop extraction; loop filter |
| `PolyUtils` | shape containment, resampling (open/closed), vertex jitter (free, inner, closed) |
| `Rect` | a box over a polygon: origin, two axes, ridge, sub-boxes, end caps, ridge beam |
| `GraphUtils` | tapered stroke, variable-width long stroke, triangular width envelope |

### 1.4 `visuals` (9 incl. 1 interface) and `export` (3), `ui` (6)
| class | one line |
|---|---|
| `HoodView` | layer assembly, greens, trees, pins, night lights (`setViewport`), shadows toggle |
| `BuildingView` | roof fills, slope shading, hatching, domes / cones / pyramids / tips, dormers, chimneys, entrances |
| `Roads` | three road modes (full, dashed lines, hidden) and three surfaces (plain, cobbles, tiles) |
| `CobbledArea` | cobble and tile paving on a street core (session-cached shapes, colours and spacing tile) |
| `ShadowLayer` | prism shadows of wings, tree and pin shadows, multiply layer at shadow alpha |
| `Tree` | crown by repeated midpoint bulging, lit cap, foliage rings, shadow |
| `WellView`, `FountainView`, `PinView` (interface) | pin renderers |
| `export.JsonExporter`, `PngExporter`, `SvgExporter` | GeoJSON (scale 0.35), PNG (≈ 16.7 M pixels), SVG via the shared converter |
| `ui.*` (6) | tags dialog and tag chips (shift-click info), rename with re-roll, rotate slider, permalink |

### 1.5 `com.watabou.geom` (18)
| class | one line |
|---|---|
| `GeomUtils` | line–line intersection returning both parameters (exact-zero parallel test), lerp, collinearity test |
| `Color` | RGB pack/unpack with truncation, clamp, lerp, scale, multiply, HSV, colour distance |
| `Chaikin` | corner cutting at ¼/¾, open or closed, n passes, optional kept-vertex set |
| `Circle` | centre + radius |
| `PoissonPattern` | toroidal Bridson tile (k = 50), fill of a shape by tiling |
| `IFillableShape`, `FillablePoly`, `FillableMultiPoly` | point-in-shape targets for the tile |
| `SkeletonBuilder`, `Rib`, `_SkeletonBuilder.Node`, `_SkeletonBuilder.Segment` | a straight-skeleton builder — **compiled in, never constructed in NG** |
| `polygons.PolyBool` | intersection/difference of two simple polygons by vertex augmentation and a walk (one loop out) |
| `polygons.PolyBounds` | bbox, centroid circle, axis box, minimum-area box over the hull, hull, point-in-polygon |
| `polygons.PolyCore` | signed area, polyline length, vertex mean, area centroid |
| `polygons.PolyCreate` | centred rectangle, regular polygon, mitred strip around a polyline |
| `polygons.PolyCut` | line pierce, cut by a line (first two crossings), peel, shrink by per-edge cuts, enlarge by edge offsets |
| `polygons.PolyTransform` | translate, scale, rotate (copy and in place) |

### 1.6 `com.watabou.utils` (14)
`Random` (the generator), `ArrayExtender` (weighted pick, uniform pick, insertion shuffle, subset, min/max by key, set ops),
`MathUtils` (clamp), `PointExtender` (projection fraction, copy), `Palette` (typed style parameters, JSON parsing once,
geometric colour weights), `ParamType` (enum), `BinGrid` (bucket grid for building lookup), `ColorNames` (nearest named
colour), `GraphicsExtender` (polygon, polyline, dashed polyline drawing), `LongPresser` (long press = right click), `Updater`
and its two dispatchers, `RecurringEventDispatcher`.

### 1.7 `com.watabou.coogee` (52) and the other shared packages
`coogee` is the UI framework (game and scene shells, windows, dialogs, menus, forms, sliders, the palette form). Grep over
all 52: no generator draw, no model class, no clock. `tracery` (grammar engine with flag-specific symbol variants,
Bernoulli rule gates and a deck selector), `nlp` (order-2 Markov over grapheme clusters, syllable splitter), `formats`
(GeoJSON writer; SVG converter), `system` (local-storage state, file saving), `processes` (tweening) — none draws except
through the grammar's pointer to the generator and the Markov source's uniform picks (§4).

---

## §2 The pipeline as coded, stage by stage

Notation used below (our own): **U** = one uniform draw in [0, 1); **B3** = the mean of three uniforms (a bell on [0, 1],
mean 0.5, sd 1/6); **F4** = |(sum of four uniforms) ÷ 2 − 1| (a folded bell on [0, 1], mean ≈ 0.23, peaked at 0);
**S** = 2·B3 − 1 (a bell on [−1, 1]). Every draw comes from the one generator of §4. Lengths are model units (§0 item 10).

### 2.0 Control, tags and the per-map parameters — `MapScene.reset`, `Hood.create`, `Settings` `[READ]`

* **Reset loop.** The scene calls the hood factory inside a loop that catches any exception, logs it and tries again; when
  an explicit seed was given the retry uses seed + 1, otherwise it simply continues from the advanced stream. No recording
  ever hit it (no scene-level log line exists in any capture), but it exists. CONFIRMED.
* **Seed.** A given seed becomes the generator state directly; with no seed (Enter, tap, the tags dialog) the current state
  is used and written back to the URL as the map's seed.
* **Tags.** With no tags, random tags are rolled **between a save and a restore of the generator state**, so the roll does
  not move the geometry stream: the size tag is carried over from the previous map (initially medium), the template is a
  weighted pick area 0.7 / street 0.3 / square 0.1 / ring 0.1 (weights as written, i.e. ≈ 58 / 25 / 8 / 8 %), and `leafy`
  is added with probability 0.1; `secular` is never rolled. With URL tags, resolution keeps one tag per slot and fills a
  missing size with medium and a missing template with area. The vocabulary is exactly nine tags (leafy, secular, four
  templates, three sizes); the shift-click description table also describes a tenth, "radial" (a central block with
  radiating streets), that no list offers — a dead description.
* **Per-map parameters (`processTags`), drawn in this order before any geometry** — this is the "3 → ≈ 20 internal
  parameters" expansion; every later rule reads these:

  | parameter | law | range |
  |---|---|---|
  | minimum street width | 10 × (1 + F4) | 10–20 (mean ≈ 12.3) |
  | maximum street width | minimum × (1 + 2·B3) | 1–3 × minimum |
  | street-width exponent | 2^S | 0.5–2 (log-bell at 1) |
  | minimum building side | 30 + 5·S | 25–35 |
  | minimum building area | side² | 625–1225 |
  | building-area variance | 4 × (0.4 + 0.6·B3) | 1.6–4 |
  | indentation factor | 2·U | 0–2 |
  | manor area min / max | min building area × building variance; × (1 + (variance − 1)·B3) | |
  | manor ratio max / min | 1 + 2·B3²; 1 + (max − 1)·U | 1–3 |
  | minimum block side | building side × √(9 + 16·B3) | 3–5 × building side (≈ 75–175) |
  | block-area variance | 16 × (0.2 + 0.8·B3) | 3.2–16 |
  | tree coverage | 1 − F4, or 1 with `leafy` (no draw) | 0–1 |
  | tree radius | 20 + 5·S | 15–25 |
  | tree / well / fountain / empty pin chances | tree = coverage (2 with `leafy`), others 1 | reset every map |

  `[CHECKED]` Simulating only these draws from seeds 7171 and 7172 gives maximum street widths 19.3747 and 21.5972; × 0.4 =
  7.750 and 8.639, the two template-street widths the vertex captures record in all four templates.
* **Template.** Ring, square, street, else area, from the template tag.

### 2.1 Templates — outline and seed geometry `[READ]`

* **Axis length by size** (it scales the outline and normalises the width law, §2.3): area and ring 1000 / 1500 / 2000
  (small / medium / large); street 800 / 1200 / 1800 (then replaced by the main street's own length); square: twice the
  largest vertex distance from the outline's centroid.
* **Area.** A star polygon: vertex count 4 + ⌊8 × (1 − F4)⌋ (4–12, mostly 9–12); vertex *i* at angle 2π(i + B3)/n and
  radius B3 (so radii 0–1, bell at 0.5); one Chaikin pass; rotated so its minimum-area box is axis-aligned; centred;
  stretched to axis × (axis × aspect) with aspect 0.4 + 0.6·U; turned +45° with probability 0.3, else −45°. The "straight
  chord" of some area outlines is a long edge of this low-vertex polygon surviving one Chaikin pass. One bisection of the
  whole outline.
* **Street.** A main-street line at angle ±45° (+ with probability 0.3) plus a bell jitter of up to ±45°, from −axis/2 to
  +axis/2 through a random middle control point within axis/2 of the centre; resampled into 3–7 segments (3 + ⌊5·U⌋) and
  its inner points jittered sideways by up to half a segment. The outline is a strip around it of width axis × (0.3 +
  0.5·F4), vertex-jittered, with its two end vertices on each side pulled toward the street's ends by a B3 fraction (the
  spindle). With probability (segments − 1) ÷ segments the main street gets 4 − ⌊segments/2⌋ Chaikin passes. The axis
  becomes the main street's length; the main street is a street at the maximum width with its own corridor; each half of
  the outline, minus the corridor, is bisected — two bisections.
* **Square** (a coin between two plazas):
  * *rectangular* — the base plaza size (100 / 200 / 400 by size, × (1 − 0.5·F4)) and orientation (U × 180°) are **drawn
    again** inside the branch (the values passed in are discarded); aspect 1 + F4, used only when above 1.2; the plaza
    ring is the plaza enlarged by the maximum street width. The outline is, with probability 0.3, a jittered rectangle
    about 3–4 plaza sides wide plus one minimum block side, offset from the plaza; else a 4–6-vertex star at radius
    plaza × (2 + U) + minimum block side, one Chaikin pass.
  * *round* — plaza radius = half the base size; a regular polygon with one side per minimum building side of
    circumference; the plaza street's outer ring at radius + half the maximum width. The outline is, with probability 0.3,
    a jittered octagon, else a 4–7-vertex star at radius × (4 + U) + minimum block side; Chaikin smoothed.
  * Both: a through street along the plaza's axis cuts the outline in two; it becomes two streets (outline to plaza ring)
    at the maximum width; the plaza itself is a closed street and an **empty block** (a paved square, which may get a pin,
    §2.8); each half minus the plaza ring and the through-street corridor is bisected. Hence three template streets and
    "blocks = streets" (CA-2).
* **Ring.**
  * *Outline*: as area but radii 0.5 + 0.5·B3 (rounder), aspect 1 − 0.6·F4 (peaked at 1), and the Chaikin pass keeps a
    random subset of 3 … n − 1 vertices sharp (the one insertion shuffle and subset per ring map).
  * *Rings*: centre = the outline's centroid; R = the largest vertex distance from it; first spacing c = minimum block side
    + (R − minimum block side)·U; growth factor 1 + F4 (1–2); ring radii d = c/2, then d + c·g, d + c·g + c·g², … while
    d < R − c/2. Each ring is **six points** at radius d, angles (k + a common phase U + a per-point B3)/6 of a turn, smoothed
    by **three Chaikin passes → 48 vertices**. The rings are therefore independent jittered hexagons: an egg or rounded
    triangle comes from the angle jitter; spacing widens outward geometrically; resolution is fixed at 48.
  * *Bands* (outside-in): one ring width for the map, minimum + range × B3^exponent; band *k* = (the outline, or ring *k*
    shrunk by half the ring width) minus (ring *k* + 1 enlarged by half the ring width) — a polygon with one hole — cut by
    the hole-aware bisector (§2.4); then ring *k* + 1 becomes a street whose corridor is the enlarged ring minus the shrunk
    ring, made simple by one slit along the horizontal line through the hole's bounding-box middle.
  * *Centre*: the innermost ring shrunk by half the ring width goes to the plain bisector. If it splits, its blocks join the
    map. If not, it becomes one block whose content is, with equal chance, empty (a square), a green with a grove, or a
    manor (falling back to empty); if that block has neither greens nor trees, the innermost ring road is turned into a
    closed loop whose corridor is the ring enlarged by half its width (a plaza ring). The name then gets a square / manor /
    park flag. This is the creator's stated "square, grove or single large building" rule, seen in code (1/3 each).

### 2.2 The plain bisection — `Bisector.partition`, `subdivide`, `isSmallEnough`, `makeCut`, `split`, `detectStraight` `[READ]`

**Parameters per use.** Street level (templates' bisections and the ring centre): minimum area = (minimum block side)²,
variance = block-area variance, a gap function (the street-width law, §2.3) and the street post-processor (§2.3). Lot level
(each ordinary block): minimum area = minimum building area, variance = building-area variance, no gap, the lot
post-processor. The "minimum offset" = √(minimum area) (street ≈ 75–175; lot 25–35). Default variance if none is given: 10.

**Recursion.** A face is a leaf if it passes the stop test; otherwise it is cut; if the cut yields one piece (all attempts
failed) the face is a leaf; otherwise both pieces recurse. No depth limit.

**Stop test.** Area below minimum area × variance^F4 — a new F4 each call (so the stop threshold is random per node, between
the minimum and minimum × variance, log-skewed toward the minimum). It is area only; there is no extent or aspect test.
CONFIRMED; answers pn §9 Q1.

**One cut attempt** (attempt number *a* = 0 first):
1. *Frame.* Attempt 0: the minimum-area box of the face (hull, then every hull edge as a candidate direction). Attempts
   1–10: the axis-aligned box of the face rotated by *a* × 36°, rotated back. The longer box side is the major axis M, the
   shorter the minor axis m (both as full-length vectors from one box corner).
2. *Position.* p = (the centroid's fraction along M from that corner + B3) ÷ 2 — so p lies within ±0.25 of the midpoint
   between the centroid's projection and the box middle, bell-shaped. The point P = corner + p·M lies on the box's own edge.
3. *Start edge.* Every face edge crossed (strictly inside the edge) by the line through P along m is a candidate; the start
   edge is the candidate most parallel to M (largest |cos|); the start point S is its crossing. Deterministic.
4. *First leg.* Direction = the start edge's left-hand normal (inward for the windings the bisector produces — an outward
   normal would find no hit and abort `[INFERRED]`). F = the
   distance to the nearest other edge hit along it. If nothing is hit the attempt aborts with a "bad polygon" exception —
   the one path to the scene-level retry.
5. *Corner.* q = offset ÷ F; if q > 0.5 the corner goes at F/2, otherwise at F × (q + (1 − 2q)·B3) — a bell over
   [offset, F − offset]. Corner C = S + that distance along the normal.
6. *Far edge.* For every other edge, drop a perpendicular from C to the edge's line; keep edges where the foot lies strictly
   inside the edge, on the side the edge faces, and where no third edge crosses the probe (a segment from C, as long as that
   edge, along the drop direction). Among them pick the one maximising sin(first leg, edge) — the most perpendicular to the
   first leg. The end point E is the foot. If no edge qualifies: log "failed to make a cut" and go to the next attempt.
7. *Post-process* the three-point cut S–C–E (lot: straighten if flat; street: §2.3). If any interior point of the processed
   course falls outside the face, revert to the sharp S–C–E.
8. *Split* the face at S and E into two pieces (the new points are inserted into the parent's vertex list in place, so a
   retry sees two extra vertices). If the larger piece exceeds 2 × variance times the smaller: next attempt.
9. *Corridor* (street level only): a strip of the gap width around the course, extended by half the width at both ends, is
   subtracted from each piece (a difference that returns one loop), and the course → corridor pair is recorded for the
   street. The plain bisector therefore carves street corridors **during** the cut, like the hole-aware one.
After attempt 10 fails, the face is returned whole (a leaf that should have been cut — the profile's `subdivide` deficit).

**Lot post-processor (`detectStraight`).** If the cut triangle's area ÷ its chord is under 1 (height under 2 units), the
corner is dropped and the cut runs straight from S to E. It is not frontage snapping.

### 2.3 Street courses: flatten, fillet, width, extension — `Hood.semiSmooth`, `getCircle`, `getArc`, `getStreetWidth`, `Street` `[READ]`

* **Flatten.** A street cut S–C–E becomes the straight S–E if its triangle's area ÷ chord < 1 or area ÷ chord² < 0.01 (height
  under 2 units or under 2 % of the chord; at a mid-course corner that is a bend under 4.58°, each end off by ≤ 2.29°).
  `[CHECKED]` 177 of 178 recorded sharp street corners have area ÷ chord² ≥ 0.0101 after the ends are pulled back to the cut.
* **Keep sharp or fillet.** With turn angle θ between the legs: keep sharp with probability (1 − cos θ)/2 = sin²(θ/2);
  otherwise keep sharp with probability min(1, minimum building side ÷ shorter leg); otherwise fillet. So large turns and
  short legs stay sharp.
* **The fillet.** The tangent points are the far end of the shorter leg (a cut end) and the point at the same distance from
  the corner on the longer leg; the circle tangent to both legs there is sampled from one tangent point to the other with
  ⌊arc length ÷ minimum building side⌋ points (so each step is at least the minimum building side); fewer than three points
  → keep sharp. The rest of the longer leg stays straight. `[CHECKED]` 200 / 200 recorded arcs touch a drawn end;
  step ÷ minimum building side p10 1.18, p50 1.32, p90 1.65, never below 1.05; expected fillets 209.9 against 200 of 378.
* **Width.** When a street cut is accepted the gap function computes its width and registers the street:
  width = minimum + (maximum − minimum) × min(course length ÷ axis length, 1)^exponent, using the processed course (arc
  included, kerb to kerb). `[CHECKED]` §0 item 2.
* **The street record** keeps the width, the source course, the corridor and a closed flag. At draw time each open street's
  first and last points are moved along their end segments to where that line meets another street's source course within
  the maximum street width beyond the end, pulled back by half that street's **drawn** width; ends that meet nothing (hood
  edge, free ends) stay. Hence the recorded "stop exactly one crossed half-width short" and the drawn junction end being
  0.3 × the crossed model width beyond the kerb (half corridor − half stroke at ratio 0.4). With the style's twisting on,
  the drawn course is resampled at one width and jittered by 0.2 × width (0.4 for cobbles and tiles, 0.1 for dashed lines)
  then smoothed once — view-time geometry that consumes draws.
* **Corridor gap lookup.** After a bisection, streets without a corridor get the one recorded for their course.

### 2.4 The hole-aware bisection — `BisectorEx`, `ExPolygon` `[READ]`

Differences from §2.2, each CONFIRMED on the code:
* The face is a polygon with holes (outer contour + holes, each vertex → next vertex in one map); area = outer − holes.
* Minimum offset = √(minimum area) ÷ 2 (half the plain one). Recursion depth budget 100.
* The stop test is the same law; **a one-piece result is recursed into** (no leaf-on-failure guard), which is how the
  opening slit works.
* Frame: attempt 0 the minimum-area box of the **outer contour**; retries use a **random** rotation (U × 360°), not 36° steps.
* Position: B3 over [offset, length − offset] of the major axis — **no centroid term** (hence no projection call).
* Start edge: outer-contour edges crossed forward by the minor-axis line; the one whose direction is most aligned with the
  major-axis vector (signed dot product, so a particular long side).
* First leg / corner: as §2.2 but the ray tests all edges, holes included; no hit → log "recut" and restart.
* Far edge: as §2.2 over all edges (holes included), with the obstruction probe correctly bounded at the foot.
* No far edge → log "Trying again" and restart from scratch (unbounded; a dead branch would return the face whole).
* If the far edge is on a **hole**, the cut joins outer boundary to hole: the result is one simply connected piece, marked
  incised; its corridor is subtracted and it is returned as one piece (the slit). Incised pieces skip the balance test.
* Balance: if the area ratio is not below the variance (the plain bisector allows 2 × variance), log "Alternative cut" and
  retry, up to 20 times; at 20, log "Failed to bisect with ratio less than …" and accept the cut anyway.
* Corridor subtraction removes the strip from the outer contour; a hole the strip touches is merged into the outer contour.
So RA-3's "Alternative cut" is exactly the balance failure (not thinness or hitting the hole), "Trying again" is exactly
"no far edge", and both are local. The ring template uses this bisector with the street post-processor and gap (§2.3).

### 2.5 Block content dispatch — `Hood.populate` `[READ]`

1. **Manor count** = 0 with `secular`, else ⌊1 + U × (⌊blocks ÷ 8⌋ − 1)⌋ over blocks without content (so 0 when fewer than 8,
   1 for 8–23, and 1 … ⌊blocks ÷ 8⌋ − 1 above that).
2. **Manor choice**: weight 0 for blocks under the minimum manor area, else 1 ÷ (block area × its box area) — favouring the
   smallest eligible blocks; after each manor, every remaining weight is multiplied by its distance to the manor's block
   (spacing). A manor that fails (§2.8) becomes an ordinary block — the profile's one extra content object.
3. **All other blocks**: ordinary if area > (minimum block side)² ÷ 2, else **empty**. Empty blocks are the small ones.

### 2.6 Ordinary blocks: lots, courts, setback, houses — `Normal.populate`, `validateOuter`, `validateLot`, `indentFronts`, `createGreen`, `spawnInnerTrees` `[READ]`

1. Lots = the plain bisection of the block at lot level (§2.2).
2. **Frontage** (outer lots): a lot with an edge collinear with a block-boundary edge (tolerance 10⁻⁹ on an unnormalised
   line test — effectively exact, which works because split points are inserted on the parent's edges).
3. **Shape test** (valid lots): area ≥ minimum building area ÷ 2; area ≥ half its box; box aspect strictly between 1/3 and 3.
4. **Court**: if there are lots without frontage and every outer lot is valid — or with `leafy`, on a coin — the block
   gets a green and court trees (5, 6). Otherwise nothing: the "pin" routine called there is an **empty stub**.
5. **Green**: if no lot is valid, the block inset by half the minimum building side; otherwise the block outline resampled
   at the maximum street width, jittered sideways by up to half that width, inset by half the minimum building side
   (per-edge offset with loop repair), resampled at the minimum street width, one Chaikin pass. The green covers nearly
   the whole block and is drawn **under** the houses; it shows in the court and the gaps.
6. **Court trees**: points of the shared spacing tile (radius 1.5 × tree radius) inside the frontage-less lots; each kept with
   probability tree coverage × (1 − F4); size = tree radius × 1.6^S.
7. **Hood edge**: valid lots with an edge collinear with the **hood outline** are dropped — no houses face out of the hood.
8. **Street wall** (more than one lot left): per lot, setback = U × min(√area ÷ 3, maximum street width ÷ 2 × indentation
   factor); if ≥ 0.5, the lot is intersected with the block shifted by that distance toward the block centroid.
9. **Houses**: one building per remaining lot; the block is "outer" when the hood edge removed some (used for framing).

### 2.7 Buildings — `Building`, `Wing`, `Cupola`, `Rect` `[READ]`

* **Box**: the minimum-area box of the lot (a large building: the given rectangle), axes swapped if needed so the first axis
  is the longer — the ridge always runs along the lot box's long axis. Footprint = the lot polygon itself.
* **Height** = √(footprint area) × (1 + B3) — used for the prism shadow (§2.11) and the large-building caps.
* **Ordinary building**: one wing; a chimney unless U < minimum building area ÷ lot area (only lots larger than the
  minimum building area can have one; typical lots are smaller, hence ≈ 3 %). Chimney: a stack of 4–8 × 4–8 units
  (8 × (1 − 0.5·F4) each side) placed along the ridge from one end by the short side × (1 − F4); a flue at 0.4 scale.
* **Large building** (manors only): simple plan with probability (long ÷ short − manor ratio min) ÷ (max − min), else a T or
  a cross at even odds.
  * *Simple*: the main wing with an entrance; a stone ridge strip (height 0, no shadow) with probability 1 − minimum building
    side ÷ short side; two stone end caps (width 1 + F4 + 3 + F4, overhang 1 + F4) raised by the cap overhang; then either
    dormers with probability (minimum manor area ÷ box area)³, or one cupola: type uniform over dome / cone / pyramid /
    pyramid, radius = short side × (0.25 + 0.25·B3), forced to a dome when its diameter exceeds √(minimum manor area),
    otherwise shrunk to 0.2–0.3 × short side when its diameter exceeds 0.6 × short side; non-domes add dormers with
    probability 1 − short ÷ long; placed at the centre when short ÷ long > 0.8 (or, for domes, with probability short ÷ long),
    else half a short side in from one end.
  * *T* and *cross*: a head wing and a stem (or two crossing wings) sized from the manor ratios, secondary wings at
    50–100 % height, stone caps on every arm, ridge strips, one entrance, one cupola on the head wing's centre (radius
    0.25–0.5 × its short side; a dome is forced by the same diameter rule; otherwise shrunk to 0.3–0.4 × short side above
    0.8 × short side).
* **Entrance**: a small porch box ((short ÷ 3 + minimum building side) ÷ 2 wide, up to 20 deep) at the ridge end nearer
  the map origin — the hood's centre, since templates centre their outlines there `[INFERRED reading of the literal rule]`.
* **Dome**: ring count = diameter ÷ √(minimum manor area) rounded stochastically; ring radii from a cosine law; stone tip
  with probability 1 − rings ÷ (rings + 1) (2/3 with none); cones and pyramids always get a stone tip.

### 2.8 Manors, empty blocks, greens — `Manor`, `Empty`, `Green` `[READ]`

* **Manor**: fails if the block is under the minimum manor area or its centroid lies outside it. Box = the block's box about
  its centroid; if longer than the maximum manor ratio, trimmed to it; scaled to the minimum manor area (fails if even
  that does not fit inside the block), then five halving steps toward min(maximum manor area, the whole box); then
  **pressed** along its long axis toward the block boundary crossing nearest the map origin, by eight halving steps while
  it still fits. Planting: always with `leafy`, else with probability 1 − building area ÷ block area; a planting is, with probability
  tree coverage, a green (block outline resampled at the maximum street width, two Chaikin passes) with a full grove, else a
  grove alone at tree-coverage density. Grove trees avoid the building enlarged by one tree radius. **No wall,
  no gate, no enclosure** anywhere in the code.
* **Empty**: a weighted pick among plain yard / well / large tree / fountain with weights 1 / 1 / tree chance / 1; each type
  that is picked divides its own weight by 10 for the rest of the map (whether or not its pin then lands). A pin is placed with probability (block area ÷ box
  area)³, on the block's midline at half the short side from one end (a coin for which end), oriented along the long axis,
  size tree radius × (2 − F4). A plain yard stays paved with probability area ÷ box area, else gets a green and, with
  probability tree coverage, a full grove.
* **Green** (ring centre only): the green plus a grove with probability tree coverage (always when built as a grove).

### 2.9 The spacing tile, trees and pins — `BlockContent.getPattern`, `PoissonPattern`, `Tree`, `WellView`, `FountainView` `[READ]`

* **Spacing tile**: a 10r × 10r torus with minimum distance r = 1.5 × tree radius; seeded at one uniform point; each step
  picks a uniform active point and throws **50** candidates in the annulus [r, 1.1r] at uniform angles, wraps them onto the
  torus (that is all `warp` does), keeps **every** valid one, and retires the point if none is valid; it runs to
  exhaustion. Filling a shape tiles the plane with the pattern over the shape's box and keeps the points inside. Tiles are
  cached **by rounded radius for the whole session**. A second spacing tile (100 × 100, r = 6) paves cobbles and tiles.
* **Tree** (a view object; draws): twelve points at radius size × (1 − U/3) and angles (k + B3)/12 of a turn; the crown
  is that polygon **bulged** repeatedly — with n = 0.707 × size, every edge of length L > 0.1 n gets a midpoint pushed
  sideways (outward for the crown's winding) by L × min(L ÷ n, 1) ÷ 2 — until no edge splits; the crown is filled at the shaded colour (colour × lerp towards colour × shadow at
  shadowAlpha², i.e. 0.16 by default); a lit cap = the twelve points at 0.7 scale, bulged, offset toward the light by
  √shadowLength ÷ (1 + √shadowLength) × 0.3 × size, in the full colour; with details on, concentric rings at cos-spaced
  scales (≈ size ÷ (8 × thin stroke) of them), bulged, each edge drawn with a light-dependent probability; shadow = the
  crown shifted by 2 × size × shadowLength away from the light. Block trees use ambience-tinted colours; pin trees do not.
* **Well**: round with probability 0.4, else square; 16 × 1.2^S outer, 0.5–0.7 of that for the dark shaft; stone and
  outline colours. **Fountain**: stone disc 20 × 1.2^S, water basin (0.7–0.8 of it) in `colorWater` with a radial gradient
  to its shaded tone offset away from the light, a 2–4 stone centre.

### 2.10 Naming — `Namer`, the grammar engine, the Markov source `[READ]`

The grammar asset is loaded once per session; each name clears the grammar's per-run state, adds the map's tags (upper
case) as flags, and expands the template's start symbol (area → the district rule; street / square / ring → their own).
Engine semantics: a rule prefixed by a number is a **Bernoulli gate** evaluated on the generator each time it is drawn
(not a weight); prefixed by flags (with `&` and `!`) it is a condition; a flag can also select a flag-specific variant of a
whole symbol; `{a|b}` is an inline choice and `{a}` optional; `@list` inlines another symbol with its condition; rules are
drawn from a **deck** (without replacement, refilled when empty) and redrawn when a gate or condition fails. The proper-name
source is an order-2 Markov chain over grapheme clusters trained once on the word list, re-drawn until the result is not a
corpus word and has at least two syllables. Naming uses the main generator, last in the model. The rename dialog's
re-roll draws from it too.

### 2.11 The view, as far as it shapes what a map shows — `HoodView`, `BuildingView`, `ShadowLayer`, `Roads`, `MapScene` `[READ]`

* **Layers** (bottom → top): greens; roads; shadows (inserted third); pins (wells, fountains, large-tree pins); a
  multiply-blended light layer when the ambience is not white; houses; chimneys; trees; the title. No depth sorting.
* **Roof colour** per building: a pick from the (ambience-tinted) roof list with geometric weights (each entry half as likely
  as the one before), scaled by 2^(roof variance × S) — base 3 for large buildings; all wings of a building share it.
  Channel arithmetic truncates, which is the profile's steady 0.5 % "residual".
* **Roof drawing** per wing: the footprint in the roof colour; the half on the dark side of the ridge line (chosen by the
  light direction) in the shaded colour (colour lerped toward colour × shadow colour by shadow alpha); the outline;
  hatching. Stone wings (caps, ridge strips) are stone-filled and unhatched. With shadows off the hatching turns 90°.
* **Hatching**: lines **parallel to the ridge**, spaced max(2, 4 × thin stroke) across the roof; each line's two footprint
  crossings get one tapered stroke each, pointing inward to a random point up to half the chord (0.5 × B3); then two
  heavier tapers (normal stroke) from the ridge's ends, each 30–50 % of the ridge. A taper is a filled triangle with a base
  of one stroke width. Pyramids, domes, cones and dormers have their own hatching; cones use the variable-width stroke.
* **Shadows**: for each wing with shadows, the footprint (box for large wings) is offset by height × shadowLength against
  the light; one quad per edge whose offset side faces away, filled and stroked 1 unit in the shadow colour; tree and pin
  shadows likewise; the whole layer multiplies at shadow alpha. `ShadowLayer` draws nothing random.
* **Roads**: full (surfaces plain / cobbles / tiles), dashed lines (dash 9, gap 6 × normal stroke), or hidden. Plain: an
  optional outline pass (drawn width + 2 thin strokes) then each street at width × road-width ratio, square caps for open
  streets, round caps and a fill for closed ones (the plaza). Cobbles and tiles fill the street core with session-cached
  jittered pentagons or small rectangles at the 6-unit spacing tile.
* **Night lights** (ambience not white): the ambience colour fills the visible rectangle in the multiply layer and every
  building, with probability `cityLights`, adds a radial glow (hue and saturation jittered around the lights colour) of
  radius 1.5 × half-diagonal × (1 + B3). This runs in the view-port update, i.e. on every relayout.
* **Framing and title**: the view is scaled to 90 % of the bounding box of the "cloud" (the house boxes of outer blocks and
  manors); the title is scaled to width ÷ 1024 and placed in whichever corner rectangle (top-left, bottom-left,
  bottom-right, top-right, first wins ties), inflated by the title height, contains the fewest hood-outline vertices.

### 2.12 Exports and the Dwellings hand-off `[READ]`

GeoJSON at scale 0.35 with y flipped: a values record (maximum street width × 0.35, generator "hood", version), an "earth"
octagon of radius 1500, roads (drawn courses, width = model width × ratio × 0.35), buildings (footprints), prisms (wells as
8-gons of radius 8, fountains as 16-gons of radius 10), squares (blocks with neither buildings nor trees), greens, trees
(points; large-tree pins included), and the hood outline with its name. PNG at ≈ 16.7 M pixels; SVG through the shared
converter with the title font imported. "Open in Dwellings" sends seed = map seed + building index, a width and height of
round(side ÷ 10) cells clamped to 1–16, and a hexadecimal occupancy mask of the footprint (all wings for large buildings).

### 2.13 The design's S8 recipe (`docs/ARCHITECTURE.md` §4.6) against the code, rule by rule

The design calibrated S8 on the profile's measurements (AN-6, PF-2, BG-1) and says so ("the measured default"). The code
shows which of those measurements were the mechanism and which were artefacts of measuring it. "Ours" = a design choice
the code neither supports nor contradicts; nothing below asks the design to copy NG.

| S8 step | design says | code says `[READ]` | verdict for the design's owners |
|---|---|---|---|
| sides (GEO-22) | faces reduced to runs within 10° cumulative turning; fillet arcs replaced by virtual corners | NG works on raw polygon edges; an arc's chords are separate edges, so start and far edges can be single chords | ours, and better; it also explains NG's noisy "inexact ends" (§6 row 17) |
| 1 stop test | OBB minor extent < the band's upper bound; slope term | area < minimum area × variance^F4, a new random threshold per node; no extent or aspect test | the extent test is ours; for NG parity the stop law is area-based and random per node (§2.2) |
| 2 position | f ~ N(0.5, σ) with σ 0.066 plain / 0.098 holed, a 3 % outlier draw U[0.15, 0.85], redraw outside [0.1, 0.9] | plain: (centroid fraction + B3) ÷ 2 — bounded, ±0.25 around the centroid–middle midpoint, sd ≈ 0.083; holed: B3 over [offset, 1 − offset], no centroid term; **no outlier draw** — the measured tail is retries in rotated frames and centroid offsets | replace the outlier term and σ values (measurement-frame artefacts) if NG fidelity is the aim; `[CHECKED]` 2f − centroid fraction lies in [0, 1] for 160 of 162 reconstructed faces (§9) |
| 3 start | the minor-axis line's segment around the OBB centre; a coin (p 0.5; `cut.sideLongerBias`) picks the start | every edge the minor-axis line crosses is a candidate; the start is the one most parallel to the major axis — deterministic | drop the coin for parity; the "coin" in PF-3/PP-4/AN-2 is this rule seen through run-merged sides |
| 4 far side (J-P16) | R1: side hit by the perpendicular ray from A; `cut.farSideAlt` 0 → 0.34 fallback → R4 | the corner is placed first (bell fraction of the ray's first-hit distance F); the far edge is chosen **from the corner**: among edges whose perpendicular foot lands inside them, forward and unobstructed, the one most perpendicular to the first leg | the fallback ladder is unnecessary for parity; the measured 34 % R1 mismatch is this rule (AN-7 open item 1 answered) |
| 5 straight or bent | straight if a straight cut reaches within 2° (mean of run normals), else one corner at half the projection A–F; never two bends | always built bent, corner at a bell fraction in [offset, F − offset] of the first-hit distance; then flattened to start → foot if the triangle's height < 2 units or < 2 % of the chord (lots: 2 units only); two bends never | corner: bell over [offset, F − offset] instead of exactly half; straight: the start-to-foot chord, not a mean normal; 2 % of chord ≈ 2.29° per end at mid-course — the design's 2° is close |
| 6 fillet (COV-NG-N19) | p = 0.53 constant; tangent = r_t × shorter leg, r_t ~ N(0.73, 0.10) clipped [0.54, 0.87] | streets only; sharp with probability sin²(θ/2) + cos²(θ/2)·min(1, minimum building side ÷ shorter leg), else an arc whose tangent is the **whole shorter leg** (r_t = 1); steps ≥ the minimum building side; < 3 points or any arc point outside the face → sharp; lots never | replace both rows; `[CHECKED]` 200/200 arcs touch a drawn end; expected 209.9 vs 200 fillets; 0.73 is the measurement's leg reconstruction (§6 row 12) |
| 7 ends (GEO-21) | model end extended to the crossed spine (T-junction); NG's half-width stop is the renderer's | model ends lie on the kerb (the corridor edge); only the drawn stroke is extended toward the centreline, stopping half the drawn width short | the design's reading is right; the drawn extension (0.3 × crossed model width) is also what produced the "free-end term" of step 9 |
| 8 transaction and ladder (GEO-23) | reflex pre-cut; reject on min edge / angle / block width; ladder: redraw f (≤ 3), straight on mean normal, always-succeeding cut, substitution for small faces | plain: the only tests are area balance (larger ÷ smaller ≤ 2 × variance) and "a far edge exists"; retries rotate the frame by 36° (10 attempts), then the face is left uncut silently; a failed first leg throws and the scene retries the map at seed + 1. Holed: balance < variance, 20 random-frame retries then accept; unbounded restarts on missing edges. No pre-cut, no edge/angle test, no substitution in the bisector | the ladder is ours and more robust; "NG's ≈ 4 % Alternative cut" is the holed balance test only — the plain bisector never logs; NG's only substitution is the ring centre (square / green / manor, 1/3 each) and manor → ordinary block |
| 9 width (COV-NG-N20) | w = a_district + b·(L + e·n_free), e = 0.025 × median cut length | w = minimum + range × min(L ÷ axis, 1)^exponent per map (exponent 0.5–2), L = the cut's own length kerb to kerb; **no free-end term** | remove e·n_free (artefact of drawn-length fitting); for parity use the axis-normalised power law (`[CHECKED]` rms ≤ 0.0008 in 8/8 maps); metric bands stay ours |
| 10 continuation (J-P11) | a cut may continue across a collinear lower-class street within 6° | never: every cut ends on its face boundary; NG crossroads arise only by coincidence | ours; NG's all-T-junction network (361/361) follows from the code |
| 11 recurse | both children, own sub-streams | both children; plain unbounded depth, holed ≤ 100; **one global stream**, no sub-streams | sub-streams are ours (and better for locality) |
| deep interior (IMP-8, J-P15) | court / back lane / through alley / rear plots by target shares, chosen in S8 | no interior logic in the street bisection; at lot level, lots without frontage are never built, so every thick block becomes a **court** (green + trees when all frontage lots are valid, or with `leafy` on a coin; bare otherwise); no lanes, alleys or rear plots exist | court is NG's only interior; the other three types are ours; NG's hollow-block share is a function of block and lot size, not a drawn share |
| holes (C13 — ours) | a cut crossing a hole is routed to the hole's boundary as a slit; σ 0.098 | hole edges are ordinary far-edge candidates; the first cut that lands on the hole becomes the slit (one piece, "incised", exempt from the balance test); a corridor touching a hole merges it into the outer boundary | agrees in substance; the holed position law has no centroid term and a wider bell (§2.4) |
| slope term, portals, seams, recipes, strategy slot | — | NG has no terrain, no districts, no seams | ours |

---

## §3 The geometry toolkit — what each primitive really does `[READ]`

| primitive | what it does | edge cases and tolerances |
|---|---|---|
| line intersection (`GeomUtils.intersectLines`) | returns both line parameters; the first is recovered from whichever direction component is larger (stability) | parallel only when the determinant is **exactly** 0 — near-parallel lines return huge parameters; every caller range-checks |
| collinearity (`GeomUtils.converge`) | both points of a segment on the infinite line through another segment | absolute 10⁻⁹ on an unnormalised cross product — effectively exact; works for frontage because split points are inserted on the parent edge; also true for collinear but non-overlapping edges |
| signed area, centroid, vertex mean, polyline length (`PolyCore`) | shoelace; area centroid; plain mean | sign encodes winding; callers take absolute values only in the fillet test |
| minimum-area box (`PolyBounds.obb`) | hull, then every hull edge tried as an axis; smallest product of extents wins; corners returned in that edge's frame | O(h²); first side = the chosen hull edge's direction, so which side is longer is arbitrary — callers compare and swap; ties keep the first |
| hull (`PolyBounds.convexHull`) | Melkman-style deque, valid for simple polylines | fewer than 3 points → null (a box of a degenerate face would crash) |
| point in polygon (`PolyBounds.containsPoint`) | crossing number, optional parity flip used by the boolean "subtract" trick | points on edges ambiguous |
| bounding circle (`PolyBounds.circle`) | centroid-centred, radius = farthest vertex | not the minimal circle; it sets the square and ring axis lengths |
| boolean (`PolyBool.and`) | inserts every pairwise edge intersection into both polygons (O(nm)), then walks from the first crossing, switching polygon at each shared point; subtraction = the second polygon reversed + parity flip | returns **one loop** — a difference that should split the polygon keeps one piece; no-crossing cases return the inner polygon, the outer, or "unchanged" (null), and a piece wholly inside the subtracted strip is returned unchanged |
| pierce (`PolyCut.pierce`) | all crossings of an infinite line with the polygon, sorted along the line | inclusive at edge ends — a crossing at a vertex can appear twice |
| cut (`PolyCut.cut`) | splits at the **first two** crossings along the line; optional snap to vertices; optional peel of a gap; pieces ordered by side | concave polygons are cut only between their first two crossings |
| shrink / shrink-equal (`PolyCut.shrink`, `shrinkEq`) | one half-plane cut per edge with a positive inset (48 cuts for a 48-gon ring) | exact for convex shapes; infinite cut lines can over-trim concave ones |
| enlarge (`PolyCut.enlarge`) | every edge offset outward, both ends kept — 2n vertices | bevel at convex corners, self-overlap at reflex ones; used for ring corridors, grove exclusion and manor greens |
| strip (`PolyCreate.stripe`) | a band around a polyline with mitred joins (offset × √(2 ÷ (1 + cos))), ends optionally extended by half the width | no miter limit — spikes at very sharp turns; bisector corridors extend their ends, template streets do not |
| per-edge offset (`Offsetter`) | offset lines of consecutive edges intersected; where the join falls outside both edges, two clamped points are emitted; all self-intersections found (O(n²)) and the ring split into loops; the filter keeps positive-area loops not inside a larger kept loop | the loop walk relies on object identity of inserted points |
| Chaikin (`Chaikin.render`) | corner cutting at ¼ and ¾, n passes; open ends kept; an optional set of vertices kept sharp | a closed n-gon doubles per pass (6 → 48 in three) |
| resample and jitter (`PolyUtils`) | resample to an integer number of equal steps keeping the ends; jitter every vertex by a signed bell amount in a random direction, inner vertices only, or perpendicular to the neighbour chord | the last resampled point is merged into the end if closer than half a step |
| ridge and sub-boxes (`Rect`) | ridge = the footprint pierced along the long axis through the box middle; sub-box, end cap, central strip | the ridge ends lie on the real footprint, not the box |
| polygon with holes (`ExPolygon`) | contours cloned at construction; next-vertex map keyed by point identity; area = outer − holes; corridor subtraction with hole merging | identity keys are why the ring runs spend 5–7 ms in map lookups |
| spacing tile (`PoissonPattern`) | toroidal Bridson, k = 50, annulus [r, 1.1r], every valid candidate emitted, run to exhaustion; fill by tiling | `warp` is only the torus wrap; the grid is 5 × 5 cells around a candidate with wrapped distances |
| straight skeleton (`SkeletonBuilder` + 3) | rib bisectors merged at the earliest intersection | never constructed in NG — dead weight shared with a sibling |
| colour (`Color`) | channel arithmetic with truncation; scale clamps; HSV conversions for the random style | truncation biases every derived shade ≈ 0.5 % dark |

Tolerances used by the bisectors: 10⁻¹⁰ for degenerate edges, 10⁻⁶ for the hole-aware ray start, 10⁻⁹ for collinearity.

---

## §4 Randomness `[READ]` unless marked

* **Engine.** One Park–Miller "minimal standard" generator, multiplier 48 271, modulus 2³¹ − 1; the state is the last value;
  a draw is state ÷ modulus. The compiler inlined every draw at its call site; the draw function itself is called only
  through the grammar engine's function pointer, which is why coverage counted 3–11 "Random.float" calls per map while the
  orbit test (confidence §1.3) found 35 k–104 k steps. A zero state would be absorbing (a URL seed of 0) `[INFERRED]`.
* **Seeding.** Cold load: the clock in milliseconds modulo 2³¹ − 1 (the confidence lane's clock-derived first seeds).
  A URL seed is used as the raw state (no scrambling). Enter, tap, tags dialog: no reseed — the map's seed is the current
  state, written to the URL. Failure: the scene regenerates with seed + 1 (explicit seeds) or the advanced stream.
* **Structure.** **One stream, no reseed points** (VG has six). The only save/restore brackets random-tag rolling (RA-9
  item 4 is right; naming is not bracketed). The parameter draws (§2.0) come first, so every template with the same seed
  shares them — BG-1's "intercept follows the seed, not the template" is this.
* **Draw order within a generation.** random tags (restored) → 33–37 parameter draws → outline and template geometry →
  street bisections (4 per stop test, 3 per position, 3 per corner, 1–2 per street post-process, per attempt) → content
  (manor count, choice, rectangle fitting is deterministic, lots, courts, setbacks, houses: height 3, chimney 1 + 12, …)
  → the spacing tile when first needed (thousands of draws) → trees and pins as placed → the name (gates, deck picks,
  Markov) → the view: per building one roof pick (only when the list has more than one colour) + 3 for the scale, 6 per
  hatch line + 6 for the ridge, dormer, cupola and cone draws; per tree ≈ 12 × 4 + 4 + ring coins; wells and fountains;
  night lights per building on each relayout.
* **What depends on interaction history** (so the same seed can give a different map):
  1. **Spacing tiles are cached per rounded radius for the whole session.** The first map in a session that needs radius r
     pays the tile's draws; a later map needing the same rounded radius skips them, so everything drawn after its first
     green or grove differs from a fresh load of that seed. `[READ]` for the cache; the divergence is `[INFERRED]` and was
     never tested (every same-seed comparison in the corpus used fresh loads or reloads). Radius = 1.5 × tree radius, tree
     radius 15–25 (a bell at 20), so at most 16 distinct tiles exist and repeats within a session are common.
  2. Cobble, tile and road-colour caches (textured road styles only) consume draws only while filling.
  3. Night lights draw on every relayout (resize, rotate, export) — only when the ambience is not white.
  4. A random style (Shift + Enter, key 0) draws before the map; the rename dialog's re-roll draws names.
  5. Random tags carry the previous map's size.
  The next Enter seed is the state after the whole model **and view** (confidence §1.3's "k = the whole generation's draw
  count" is right, and it includes items 1–4).

---

## §5 Data assets present — named and shaped, never reproduced

| asset | where | shape and ranges | a few facts |
|---|---|---|---|
| default style | `Style` statics | the 26 keys of profile §4.1 (13 colours incl. two lists, 9 numbers, a surface enum, 3 booleans) | equals `default.json`: roof list of one brown, tree list of two greens, shadow alpha 0.4, length 0.2, direction 30°, road width 0.4 |
| five preset styles | external assets (warm, cool, bw, night, modern), keys 2–6 | same 26-key schema | profile §4.1 has the values; parsed once into typed parameters |
| random-style generator | `Style.getRandom` | procedural HSV ranges: a night branch (20 %) with a dark bluish ambience and warm lights; a day branch with four roof hue families, two-colour roofs 30 % and trees 50 %, textured roads 60 % (cobbles 60 % of those), shadows off 10 % (day) / 70 % (night), details 80 %, stroke widths and variances quantised to 0.1 | a generator, not a table; its ranges are the only style knowledge beyond the presets |
| name grammar | external `grammar` asset | a Tracery grammar with district / street / square / ring start symbols and flag variants | captured separately (profile §3.11); not in the bundle |
| word list | external `words` asset | line-separated English corpus for the surname chain | 360 lines (profile §3.11) |
| grapheme clusters | `Syllables` statics | ≈ 24 vowel clusters and ≈ 25 consonant clusters, longest first | e.g. digraphs such as "th", "ee" |
| English modifiers | `ModsEngBasic` | capitalise, plural, possessive, article, past, -ing, pronoun forms; an irregular-plural table of 14 entries | only a few are used by the grammar |
| colour names | `ColorNames` | 141 named colours → RGB, nearest-name lookup for the style dialog | CSS-like names |
| tag descriptions | `Settings.getInfo` | 10 one-line descriptions | includes the unlisted "radial" |
| links | `Building`, `MapScene`, `URLState`, `SvgExporter` | Dwellings hand-off URL, the author's portal link, the permalink base, a web-font import for SVG titles | the hand-off is the NG → Dwellings path of vnd B2.6 |
| fonts | bundled assets | title face Voltaire; UI faces Share Tech and Share Tech Mono | |

---

## §6 Corrections — profile claim | what the code says | where it matters

pn = `profile-neighbourhood.md` (CA, RA, BG, PF, PP, AN = its addenda); cvn = `_critic-vg-ng.md`; conf = `docs/confidence/ng.md`;
ARCH = `docs/ARCHITECTURE.md`. Every "code says" is `[READ]` and CONFIRMED on the bundle; `[CHECKED]` rows were also run
against the captures (§9).

| # | profile / critic claim | what the code says | matters for |
|---|---|---|---|
| 1 | `isSmallEnough` tests area and/or OBB minor extent against a size-tag target (pn §3.2, §9 Q1; conf §5 risk 1) | area < minimum area × variance^F4, a fresh random threshold per node; streets (min block side)² × block variance 3.2–16; lots (min building side)² × building variance 1.6–4; no extent test | ARCH §4.6 step 1; §4.7 granularity; pn §3.2, §9 Q1 |
| 2 | `detectStraight` snaps lot cuts perpendicular to the frontage (pn §3.2, H3) | it drops a negligible bend: straight start → foot when the cut triangle's height < 2 units | ARCH §4.6 step 5; §4.7 (4) side lines; pn §3.2 |
| 3 | `makeCut` position "gated by `MathUtils.gate`", "two OBBs per cut" (pn §3.2, §9 Q2) | position = (centroid fraction + B3) ÷ 2, never clamped; the gate count is exactly 3 × `Color.rgbfSafe` in all four base runs (2 436 / 2 508 / 1 959 / 2 067 = 3 × 812 / 836 / 653 / 689), and those are one colour scale per building, tree and dome (779 + 33, 736 + 100, 600 + 51 + 2, 605 + 84); one box per first attempt | ARCH §4.6 step 2; pn §3.2 |
| 4 | the plain bisector never subtracts a corridor; setback happens later in `indentFronts` (pn RA-2; cvn V19) | at street level the plain bisector subtracts a strip of the street's width from both pieces inside the cut, exactly as the hole-aware one; `indentFronts` is the per-lot street-wall jitter | ARCH §4.6 intro (kerb faces), §4.7; pn RA-2 |
| 5 | widths "`roadWidth × scale × (1 ± jitter)`" (pn §4.2) and "w = a_seed + b·L + ≈ 5 mu per free end" (pn BG-1, BG-4 step 6) | model width = min + range × min(L ÷ axis, 1)^exponent with L the cut's own length; drawn × 0.4; no free-end term — junction ends are drawn 0.3 × crossed width beyond the cut. `[CHECKED]` rms ≤ 0.0008 in 8/8 maps from the seed alone | ARCH §4.6 step 9, II.2 template widths; pn BG-1, BG-4 |
| 6 | the 7171 fits' larger residuals mean "part of the law is still missing" (pn BG-1) | the exponent: 0.849 for seed 7171, 1.024 for 7172 — a power law read as linear | ARCH §4.6 step 9 |
| 7 | start side: "plausibly a coin flip", weak lean to the longer side (pn PF-3, PP-4, AN-2; ARCH `cut.side`, `cut.sideLongerBias`) | deterministic: of the edges crossed by the minor-axis line, the one most parallel to the major axis (hole-aware: most aligned in sign) | ARCH §4.6 step 3; pn AN-6 step 3 |
| 8 | far side: the perpendicular ray from the start (R1, 66 %), cause of the 34 % mismatch open (pn AN-3, AN-7) | chosen from the corner: the reachable edge (foot inside, forward, unobstructed) most perpendicular to the first leg | ARCH §4.6 step 4 (J-P16 fallback ladder); pn AN-7 item 1 |
| 9 | corner at half the perpendicular projection, or at the course midpoint (pn AN-4, AN-6 step 6) | corner at a bell (B3) fraction of the first-hit distance, kept ≥ one minimum offset (√ minimum area; half that when holed) from both ends; exactly half when the face is thinner than two offsets | ARCH §4.6 step 5 |
| 10 | a straight cut "takes the mean normal, each end off ≤ 2.3°"; tolerance 2–3° (pn BG-2, BG-4) | straight = start → foot after flattening a bend with height < 2 units or < 2 % of the chord; at a mid-course corner that is ≤ 2.29° per end. `[CHECKED]` the recorded sharp corners' area ÷ chord² floor is 0.0101 (177/178) | ARCH §4.6 step 5 |
| 11 | fillet in ≈ 53 % of bends with no predictor (pn BG-1, PF-2 e, PF-3 item 4; ARCH COV-NG-N19 p = 0.53) | sharp with probability sin²(θ/2) + cos²(θ/2)·min(1, min building side ÷ shorter leg); streets only. `[CHECKED]` expected 209.9, observed 200 of 378 | ARCH §4.6 step 6 |
| 12 | tangent length = 0.73 × the shorter leg (p10 0.54 – p90 0.87), radius follows the legs (pn PF-2 e; ARCH r_t) | the tangent is the whole shorter leg; the arc runs from that leg's cut end; the measurement took its leg directions from the first and last arc chords and its leg lengths from the extended drawn ends. `[CHECKED]` 200/200 arcs touch a drawn end | ARCH §4.6 step 6 |
| 13 | equal-chord arcs "30–44 mu", one end step half or full (pn BG-1) | step ≥ the per-map minimum building side (⌊arc ÷ side⌋ points); the half step is where the straight leg meets the arc. `[CHECKED]` step ÷ side p50 1.32, min 1.05 | ARCH §4.6 step 6 ("chord steps ≥ lattice minimum") |
| 14 | "Alternative cut" = a piece too thin or a cut into the hole; "Trying again" = no usable line (pn RA-3) | "Alternative cut" = area ratio not below the variance (≤ 20 random-frame retries, then accepted with a message); "Trying again" = no far edge (unbounded restart); a third message, "recut", = no hit along the first leg | ARCH §4.6 step 8, holes paragraph; pn RA-3 |
| 15 | the plain bisector's only failure handling is a silent sliver drop (pn §7, RA-2) | ten 36°-rotated retries on imbalance or no far edge, then the face stays whole; the recorded `subdivide` deficit (2 × cuts + partitions − nodes = 4–16) is twice the number of **extra attempts** — balance retries, since no "failed to make a cut" message appears in any capture — not dropped slivers `[INFERRED from the counts + READ]` | ARCH §4.6 step 8 |
| 16 | "no whole-map retry loop" (pn §7; conf A3) | the scene catches any exception and regenerates with seed + 1 (explicit seed) or the advanced stream; never triggered in the corpus | ARCH §5.2 / §6 retry policy comparisons; conf A3 |
| 17 | junction ends are exact at the start 65 %, at the end 45 %; inexact ends not explained by arcs (pn BG-1, BG-2) | both ends are built exactly square to the **polygon edge** they touch; drawn arrivals are measured against the crossed road's drawn centreline, which differs where the touched edge was a fillet chord or a corridor cap edge `[INFERRED]`; flattened cuts are off by ≤ 2.3° at both ends | ARCH §4.6 GEO-22 runs; pn BG-2 |
| 18 | ring roads are 48-vertex polar samples at 7.5° with low-frequency noise, radii from shuffled candidates (pn RA-7 H-R) | six points at one radius with a common phase and per-point bell angle jitter, three Chaikin passes (→ 48); spacing c = min block side + (R − min block side)·U, growing ×(1 + F4) per ring; the shuffle and subset belong to the outline's kept-sharp vertices | ARCH II.2 (ring fabric); pn RA-7 |
| 19 | the ring centre: C = 0 → a grove (pn RA-2) | an uncut centre becomes a square, a green or a manor with probability 1/3 each; with neither greens nor trees the innermost ring road closes into a plaza loop | ARCH II.2; pn RA-2 |
| 20 | block content: weighted random, Manor on larger blocks (pn §3.3) | manors first: count ⌊1 + U(⌊blocks/8⌋ − 1)⌋, choice ∝ 1 ÷ (area × box area) among blocks ≥ the minimum manor area, spaced by multiplying weights by distance; a failed manor → ordinary; others ordinary if area > (min block side)² ÷ 2 else empty | ARCH §4.7 S10a, II.3; pn §3.3 |
| 21 | `validateOuter` = "still touches a street after the setback"; ≈ 42 % of lots discarded for losing frontage (pn §3.4) | frontage = an edge collinear with the block boundary, tested **before** the setback; lots without frontage form the court and are never built; a second test drops lots with an edge on the **hood outline**; shape test: area ≥ ½ min building area, ≥ ½ box, aspect < 3 | ARCH §4.7 S10 (10) "NG's ≈ 42 % discard"; §4.6 deep interior |
| 22 | `indentFronts` = lot ∩ (block inset by the road stripe) (pn §3.4, H5); the uneven-streetwall method unknown (conf C7) | per lot, the block shifted toward its centroid by U × min(√area ÷ 3, max street width ÷ 2 × an indentation factor 0–2), intersected with the lot; skipped below 0.5 units or when one lot remains | ARCH §4.7 front-line jitter; pn §3.4; conf C7 |
| 23 | `swapAxes` re-rolls the ridge so ≈ 1/3 of houses show a gable to the street (pn §3.5) | normalisation: the ridge always runs along the lot box's long axis; 36 % is how often the box's first side is the short one | ARCH §2.6 / §4.7 S11 roof orientation; pn §3.5 |
| 24 | hatching: cut into two slopes, pierce each slope, two tapers meeting at the chord midpoint (pn §3.6, H8) | the cut only chooses the shaded half; hatch lines run **parallel to the ridge** across the whole footprint, each end gets one taper to a random point up to mid-chord (0.5·B3), plus two heavier ridge tapers of 30–50 % | ARCH §8 roof style (hatching rows); pn §3.6 |
| 25 | roof colour k = 1 + varRoof · N(6-uniform) (pn §3.6, H6); `getDark` residual 0.5 % unexplained (pn §9 Q11) | k = 2^(varRoof × S) (base 3 for large buildings) — same sd at 0.3, different shape and range; the picked colour uses geometric weights 1 : ½ : ¼ …; the residual is channel truncation | ARCH §8 colour laws; pn §3.6, §9 Q11 |
| 26 | trees are depth-sorted against buildings (pn §4.3, RA-5; conf E2 "sort key unknown") | no sort: large-tree **pins** live in the pins layer under the houses; block trees in a layer above everything; within a block, smaller trees first | ARCH §8 layer order; pn §4.3 |
| 27 | tree crown = recursive 4-way corner bulging, multiple-of-4 vertices (pn §3.9, H13) | 12 jittered points, then repeated midpoint bulging of every edge longer than 0.1 × 0.707 × size until stable; the lit cap is a 0.7-scaled copy offset toward the light; shade t = shadowAlpha² | ARCH §8 tree style; pn §3.9 |
| 28 | wells from `Normal.spawnPin` (23–37 per map, pn §3.10, §9 Q9) | `spawnPin` is an empty stub; wells, large trees and fountains come only from empty blocks (the plaza included), one weighted pick each, the picked type's weight ÷ 10 thereafter | ARCH II.3 pins; pn §9 Q9 |
| 29 | manors are walled compounds with white stone walls (pn §3.10, RA-4; ARCH §4.7 "NG's walled manor compound") | no wall, gate or enclosure exists in the code; the stone pieces are the large building's end caps and ridge strips (and chimneys, wells, fountains, cupola tips) | ARCH §4.7 set-back compound row (the wall is ours) |
| 30 | `colorWater` never exercised (pn §4.1, §8) | the fountain basin is `colorWater` with a radial shade | ARCH §8 style schema |
| 31 | palette strings are re-parsed on every use (`Type.toFloat` 15–20 k per map) (pn §4.1) | parsed once into typed parameters; the conversions are the colour arithmetic's channel reads | ARCH §8 / §12 cost notes |
| 32 | `PoissonPattern` built once per generation (pn §3.8; CA-4 "lazy") | a 10r × 10r torus tile cached per rounded radius for the **session**; runs to exhaustion with several emits per step (so steps ≈ 1.6 × points without an early stop) | ARCH §4.9 / §6 determinism (session cache hazard); pn CA-4, RA-8 |
| 33 | `Hood.getCloud` = outline (pn §3.1) — already corrected by RA-9 | confirmed view framing: the house boxes of hood-edge blocks and manors; the outline comes from the template | ARCH II.2; pn RA-9 |
| 34 | `assemble` (7 272 B) and `getGreenTable` (205 B) are unexecuted NG routines (pn §1.1, §9 Q17; conf §1.4) | OpenFL's shader mini-assembler and colour-matrix filter tables — framework code, not NG | conf §1.4; pn §9 Q17 |
| 35 | random tags: "four independent tag slots" (pn §0; CA-1 "3 + resolved tags") | size carried from the previous map, template 0.7 / 0.3 / 0.1 / 0.1, `leafy` 10 %, `secular` never; the `oneOf` count is lookup calls, not slots | ARCH §4.1 request tags; pn §0 |
| 36 | NG has no metric (conf C8; mpb §5 quote) | the JSON export writes 0.35 per unit (MFCG's writer uses 4 m per unit), so ≈ 0.35 m per NG unit `[INFERRED]`; Dwellings cells are 10 units | ARCH §1 scale, II.2 stage-2 seams; conf C8 |
| 37 | title corner = least overlap with the map bounds (pn §3.12) | the corner rectangle, inflated by the title height, containing the fewest outline vertices; order TL, BL, BR, TR; first wins ties | ARCH §9 label placement; pn §3.12 |
| 38 | the Tracery "w?-rule" is a weight (pn §3.11) | a Bernoulli gate on the main stream at each draw, with deck selection and redraw on failure | ARCH §9 naming engine; pn §3.11 |

---

## §7 The critics' open questions, answered from the code

Sources: cvn §2 ("not resolved" rows) and §6 items 5–7; pn §9 Q1–Q17; pn PF-3, PP-5, AN-7 "still open"; RA-7's five tests;
conf §5's ten riskiest unknowns. "Answered" = `[READ]` CONFIRMED unless marked.

| # | open question (source) | answer |
|---|---|---|
| 1 | bent-cut parameters: bend position, endpoint-edge choice, stop predicate, width law, reject filter (cvn §6 item 5; §2 B4.1/B4.2; conf §5 risk 2) | answered: §2.2 (position, start edge, corner, far edge), §2.2 stop test, §2.3 width, §2.2/§2.4 balance tests |
| 2 | C13 mechanism: what makes the right angles; what `project` is (cvn V5) | both ends are built square (start normal; perpendicular foot at the far edge); `project` is the centroid's fraction on the major axis, used for the position — only in the plain bisector |
| 3 | `Settings.getInfo`, `assemble`, `findBuilding`, `getGreenTable` never executed (cvn §6 item 6) | the tag-description table (shift-click in the tags dialog); OpenFL's shader assembler; the building lookup behind "Open in Dwellings"; OpenFL's colour-matrix tables |
| 4 | which build (cvn §6 item 7) | this bundle is itch 11441280 = NG 1.2.2, the build of every NG capture; NG remains superseded by Urban Places |
| 5 | `isSmallEnough` law and the size-tag mapping (pn §9 Q1; conf risk 1) | area < minimum area × variance^F4 per node; size tags act only through the axis length (1000 / 1500 / 2000 area and ring, 800 / 1200 / 1800 street, plaza 100 / 200 / 400) — block and lot sizes are per-map draws independent of size |
| 6 | `makeCut` internals, the second OBB, `detectStraight` tolerance (pn §9 Q2) | §2.2; one box per attempt (others belong to lots' boxes, manors, empty blocks); the lot straightening tolerance is a triangle height of 2 units |
| 7 | how street cuts are ordered and how templates bias them; the square/ring branches (pn §9 Q3) | depth-first in recursion order (the draw order = creation order); templates bias only through seed geometry and the number of bisections; §2.1 has every branch |
| 8 | outline stitching and the straight chord (pn §9 Q4; conf B1) | no circles: a 4–12-vertex star polygon with one Chaikin pass, stretched and turned ±45° (§2.1); the chord is a surviving long edge |
| 9 | `semiSmooth` and `roadTwisting` (pn §9 Q5) | flatten / keep sharp / fillet (§2.3); twisting is a view-time resample + jitter (0.2 × width) + one Chaikin pass of the drawn course |
| 10 | street-width distribution and the `roadWidth` mapping (pn §9 Q6; conf risk 5) | §2.3 power law; drawn = model × road-width ratio (0.4 default); `[CHECKED]` |
| 11 | `PoissonPattern` scheme (pn §9 Q7; cvn V15) | toroidal Bridson, k = 50, annulus [r, 1.1 r], tile 10 r, r = 1.5 × tree radius, session cache; `warp` = torus wrap only (V15: the stated domain warp is not in the sampler) |
| 12 | tree crown construction (pn §9 Q8; conf C5) | §2.9 (12 points, repeated midpoint bulging, lit cap at 0.7 scale) |
| 13 | `spawnPin` semantics (pn §9 Q9; conf risk 10) | an empty stub; pins come from empty blocks (§2.8) |
| 14 | 1-segment strokes in the shadow layer (pn §9 Q10) | still unknown in detail — the layer strokes every quad and draws tree and pin shadows with one line style; probably OpenFL's pen-point artefact (BG-3 found the same lone point on every road stroke) `[INFERRED]` |
| 15 | `getDark` constant (pn §9 Q11) | lerp(colour, colour × shadow colour, shadow alpha) with truncating channel arithmetic |
| 16 | building plan selection (pn §9 Q12) | plans exist only for manors' large buildings: simple with probability (ratio − min) ÷ (max − min), else T / cross 50 / 50 |
| 17 | roof-type selection (pn §9 Q13) | one cupola per large building unless dormers win ((min manor area ÷ box area)³ on the simple plan); type uniform over dome / cone / pyramid / pyramid, domes forced when large |
| 18 | depth sorting key (pn §9 Q14; conf E2) | none: pin trees under the houses, block trees above, smaller first within a block |
| 19 | title corner rule (pn §9 Q15) | §2.11 (fewest outline vertices under the inflated corner) |
| 20 | tag space (pn §9 Q16) | nine tags; `secular` suppresses manors; `leafy` sets tree coverage 1, tree chance 2 and courts on a coin; "radial" is described but not offered |
| 21 | `assemble` (pn §9 Q17) | framework code (row 3) |
| 22 | which long side starts the cut; the side bit's lean (pn PF-3 item 1, PP-5, AN-7 item 3) | deterministic most-parallel crossed edge |
| 23 | the gate's bounds; the outlier tail f < 0.30 (pn PF-3 item 2, AN-7 item 2) | no gate; the position is bounded to ±0.25 around the centroid–middle midpoint on the attempt's frame; low values come from centroid offsets and from retries in rotated frames |
| 24 | why the ring law is wider (pn PF-3 item 3, AN-7 item 4) | the hole-aware position has no centroid term, spans [offset, 1 − offset] of the **outer contour's** box, and retries in random frames |
| 25 | arc vs sharp (pn PF-3 item 4, PP-5 item 4; conf risk 4) | the explicit probability of §2.3 (angle and shorter-leg dependent); `[CHECKED]` |
| 26 | the far-side rule behind the 25–34 % mismatch (pn PP-5, AN-7 item 1) | chosen from the corner, most perpendicular reachable edge (§2.2 step 6) |
| 27 | the 344 hood-side cuts (pn PF-3 item 5, AN-7 item 5) | same construction; the hood outline is just the face's other edges (no rim road, free ends not extended) |
| 28 | RA-7 tests 1–5 on the rings | 1: one band loop per ring — yes; 2: fixed resolution — yes, 48 always; 3: polar 7.5° sampling — no, Chaikin hexagons; 4: zero-cut centre ⇔ square / green / manor — yes, 1/3 each; 5: Chaikin count — one call per ring (three passes inside) plus one for the outline |
| 29 | block-content weights and conditioning; landmark spacing (conf risk 7) | §2.5 |
| 30 | lot validation semantics and party-wall bending (conf risk 6) | §2.6; lot cuts bend like street cuts (bent then flattened below a 2-unit triangle height), never filleted |
| 31 | hood outline construction (conf risk 3) | §2.1 |
| 32 | unrecorded style modes: cobbles, tiles, outlined, twisting, dashed, night glow, details off (conf risk 9) | §2.11: cobbles and tiles fill the street core at a 6-unit spacing tile with cached jittered shapes; outlined = a wider outline pass first; twisting §2.3; dashed = 9 : 6 × normal stroke on centre-lines extended to the crossed centre-line; night = multiply ambience + per-building glows; details off removes the roof hatching lines (the two ridge tapers stay), dome, cone, pyramid and dormer strokes and the tree rings |
| 33 | the uneven streetwall method (conf C7) | §2.6 step 8 |

---

## §8 What remains unknown

1. **Nothing is server-side.** NG generates entirely in the page; every rule that makes a map is in this bundle.
2. **The name grammar and word list** are external text assets, not in the bundle; their shape is in §5 and their content in
   the profile (reader-tier data, not for implementers).
3. **Seed-exact reproduction** is now possible in principle (one stream, every draw readable), but only the per-map
   parameter draws were simulated here (§9). A full re-simulation was not attempted and should not be: it would be a code
   transcription, which the firewall forbids for the design.
4. **The session-cache divergence** (§4 item 1) is a consequence of the cache as read; no capture compares an Enter-reached
   seed with a fresh load of the same seed. PLAUSIBLE.
5. **Why some drawn arrivals are inexact** (§6 row 17): the explanation — the touched polygon edge was a fillet chord or a
   corridor cap edge rather than a kerb parallel to the drawn centre-line — is inferred; the code builds both ends square.
6. **Failure paths never observed:** the scene-level retry at seed + 1, a plain face left whole after ten attempts, the
   boolean returning one loop when a corridor should split a piece, the hole-aware "recut" and "Failed to bisect" messages.
7. **The shadow layer's single-segment strokes** (pn §9 Q10) — not traced to a call; probably a pen-point artefact.
8. **Dead or unreachable code:** the straight-skeleton builder (never constructed); the "radial" tag description; the
   explicit pin type of empty blocks (no caller passes one); the hole-aware bisector's "return the face whole" branch
   (its probability is 1 − 1 = 0); the ordinary block's pin routine (an empty stub); street cores (used only by cobbles and
   tiles).
9. **`coogee`** (the UI framework, 50 of 52 classes) was verified by search only (no generator draw, no model class, no
   clock), not read line by line; the two it drives the map through (game and scene shells) were read in full.
10. **Obfuscation:** none beyond minified local names — class, method and field names are intact.

---

## §9 Reading record

* **Prior documents read before the code:** `profile-neighbourhood.md` in full (2 289 lines: body, CA, RA, Critic-2, BG, PF,
  PP, AN); `_critic-vg-ng.md` in full; `docs/confidence/ng.md` in full; `docs/ARCHITECTURE.md` §4.6 in full and §4.7 searched
  for its NG references.
* **Class map:** 531 markers (494 classes, 19 enums, 18 interfaces) → `scratchpad/code/neighbourhood/classes.tsv`; app list
  `app_classes.txt`. **Extraction script:** `scratchpad/code/neighbourhood/extract.py` (the program's own reader-tier tool,
  carried from the village lane) with `annotate.py` (identifier legend per class); run log `extract.log`.
* **Classes read in full:** `neighbourhood` 48 / 48, `geom` 18 / 18, `utils` 14 / 14 (the colour-name table skimmed as data),
  `coogee` 2 / 52 (game, scene; the other 50 search-verified) — **82 of the 132 app classes in full**, the remaining 50
  search-verified. Shared libraries also read: `tracery` 7 / 10 in full (grammar, rule set, symbol, external symbol,
  parser, both selectors; modifiers by function list), `nlp` 2 / 2, `formats` 1 / 4 (GeoJSON), `system` 2 / 2 —
  94 of the 152 extracted classes in full.
* **Checks executed** (our own scripts restating read rules, stdlib + the capture lane's analysis helpers; all in
  `scratchpad/code/neighbourhood/sim/`):
  * `settings_sim.py` — the per-map parameter draws for seeds 7171 / 7172: maximum street width × 0.4 = 7.750 / 8.639 (the
    recorded template widths, exact).
  * `code_checks.py` — the width law on all eight vertex maps: rms 0.0003 / 0.0003 (ring), 0.0003 / 0.0007 (area),
    0.0003 / 0.0003 (street), 0.0006 / 0.0008 (square), max 0.0052; axis 1500 given for area and ring, the main street's
    length for street, fitted for square (1045 / 1230). Fillet law: 209.9 expected, 200 observed of 378 one-bend streets;
    8 bends under 4.58°, 7 of them fillets.
  * `code_checks2.py` — 200 / 200 arcs attached to a drawn end; 133 / 176 arcs with a half step at one end; arc step ÷
    minimum building side p10 1.18, p50 1.32, p90 1.65, min 1.05; sharp-corner area ÷ chord² floor 0.0101 (177 / 178; one
    outlier at 0.0066, a 3.0° corner in area 7172, unexplained).
  * `position_check.py` — on the 162 reconstructed faces, 2 × position − centroid fraction lies in [0, 1] for 160 / 162
    (mean 0.49); the centroid moves too little (sd 0.036–0.051) for the slope test to discriminate. Consistent, not decisive.
  * Arithmetic on the profile's recorded counts: clamp calls = 3 × colour-scale calls in 4 / 4 base runs, and colour-scale
    calls = buildings + trees + domes in 4 / 4 (§6 row 3) — the clamp is colour code, not the cut.
  * One screenshot crop viewed (`area7172_crop.png` from the area capture): hatching runs parallel to the ridge from the gable
    ends; no manor walls; courts show the green under the houses.
* **CONFIRMED vs PLAUSIBLE.** Every `[READ]` statement is CONFIRMED on the bundle, and the width law, the fillet rule, the
  flatten threshold and the template widths are CONFIRMED against the recordings by the checks above. PLAUSIBLE only: the
  metre reading of the 0.35 export scale, the session-cache divergence, the explanation of inexact arrivals, the "map origin
  = hood centre" reading of the press and entrance rules, and the single-segment shadow strokes.

## Fable review (2026-09-27) — B-code/neighbourhood

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`). Read whole. Firewall: clean —
no code; console strings are identifiers under R5 as sharpened (J-Fcode-1); the §2.0 per-map parameter table and the §2.1 /
§2.7 template and building constants are **logic** (J-Fcode-8: numbers that parameterise an algorithm, admissible here,
never carried into the design as a table); the default style's few values sit within R5's limit; the grammar and word
list shaped only. Re-derived on the per-class extracts of this bundle: `Hood.semiSmooth` (straight when area ÷ chord < 1 or
area ÷ chord² < 0.01; sharp with probability sin²(θ/2), else with probability min-building-side ÷ shorter leg; else the arc
tangent to the shorter leg at its far end and to the longer leg at the same distance); `Normal.validateLot` (½ minimum
building area, ½ box, aspect in (⅓, 3)), the court rule, `Normal.indentFronts` (min(√area ÷ 3, maximum width ÷ 2 ×
indentation) × u, skipped under 0.5) and the court-tree law; `Empty`'s ÷ 10 decay after a pick; `RingHood`'s six-point rings
with three Chaikin passes, geometric spacing, the outline's 0.5 + 0.5·bell radii with a random kept-sharp subset, and the
⌊3u⌋ centre choice; `HoodView`'s layer order (greens, roads, shadows at index 2, pins, light, houses, chimneys, trees);
`BisectorEx`'s position (offset + (1 − 2·offset) × bell; the class has no projection call where the plain `Bisector` has
one); `JsonExporter`'s scale 0.35 in the shared GeoJSON writer; the class map holds no wall, gate, fence, enclosure or hedge
class. All CONFIRMED as written.

Corrections and rulings (this section supersedes the passages named): (1) **§2.2 gains the build line the critic's R8
asks for:** the bisector described here is NG 1.2.2's bend-first version; the copies in MFCG (itch 12710731) and VG 1.6.9
(itch 19365073) first test for a straight cut (a square arrival with balanced halves) and bend only when it fails; stop
test, position, start edge, corner and far-edge rules are the same in all three (critic X2). (2) **§8.3's sentence** "a full
re-simulation … should not be [attempted]: it would be a code transcription, which the firewall forbids" is a lane choice,
not a firewall rule (critic R9): a restatement harness is a reader-tier test instrument, kept in the session scratchpad,
never committed or shown to an implementer. (3) **§0 item 10 and §6 row 36 — the metre reading** is ruled (J-Fcode-2): the
export scale 0.35 is CONFIRMED; "one NG unit ≈ 0.35 m" stays an inference, released to the design only as a labelled one
(the shared writer's schema is metric in MFCG's instance; the dimensions it yields are plausible while 1 unit = 1 m is not;
the bundle holds no unit word). (4) The earlier NG bent-cut addenda (queue rows B09–B11) are superseded in mechanism by §6
rows 5–13, 15 and 17; their measured numbers stand as outputs of the mechanism (amendment 41).

## Fable review (2026-09-27) — B-code/neighbourhood (critic)

Verdict **CONFIRMED**. R-N1–R-N5 stand; R-N3 re-derived here; every point of R-N2 that the `Hood`, `Normal`, `RingHood`,
`Empty` and `BisectorEx` extracts touch agrees. The critic's not-re-derived list is honest; six of its items are closed above
(fillet and arc, lot filters and setback, ring courses and centre, pin decay, manor walls, layer order).

## Fable review (2026-09-27) — B-code/neighbourhood (impact)

Verdict **CONFIRMED**. Items 33–44 rest on R-N2, R-N5 and the re-derivations above; item 58 (a)–(e) are re-derived except the
hatching geometry (accepted on the reading and the reader's screenshot crop) and (f) is released as a labelled inference
(J-Fcode-2). Item 37's `flatten` default stands (J-Fcode-3: DEFINITION §3 names watabou's bent cut with constants we
measured, and §13.5's bent-cut targets are NG's; the MFCG parity preset takes `straightFirst`). Item 35's holed position law
is re-derived (no centroid term).
