# MFCG itch.io devlogs — NEWER half (slice `mfcg-devlogs-b`)

Scope: 23 devlog directories under `research/devlogs/medieval-fantasy-city-generator/`,
worklist indices 23..45, ordered oldest → newest. All 23 `post.md` files read in full
(body + comment threads); all 25 images opened with the Read tool.
One directory (`494692-keyboard-shortcuts-and-mouse-actions`) has no images.

Evidence tags used throughout: **[STATED]** creator explicitly describes the method ·
**[SHOWN]** visible in an image/recording, not explained · **[INFERRED]** my
reconstruction, reasoning given · **[NAMED-ONLY]** feature announced, no method.

> **Data hazard — the `date:` field in these post.md files is worthless.** 22 of the 23
> posts carry `03 February 2025 @ 19:27 UTC`, which is the scrape timestamp, not the
> publication date. The 23rd (`880636`) carries `28 October 2024`, which contradicts
> its own position at the end of the chronological worklist and its Patreon post id
> (121415691 — higher, i.e. later, than the 114858238 of `823841-experiments`).
> The only reliable ordering axes are (a) the version numbers in the titles and
> (b) the monotonically increasing Patreon post ids in the body links. Every calendar
> date in the table below is **[INFERRED]** from Patreon post-id ordering plus one
> hard anchor (the Twitter status id `1226214767947325441` quoted in `123268`
> = 8 Feb 2020) and should be treated as ±2 months.

---

## 1. Chronological table

| # | Approx. date (INFERRED) | Post id | Title | What changed relative to the previous iteration |
|---|---|---|---|---|
| 1 | ~Jul 2019 | 91172 | 0.7.1: Editable district names | Click-to-edit district names; Shift+click a district label rerolls **all** district names at once (no single-name reroll). District names deliberately **not** persisted in the URL (unlike the city name). New district "type": **riverbank**. Improved road drawing; improved label placing. |
| 2 | ~Sep 2019 | 101529 | 0.7.2: Lots of (mostly) small (mostly) visual changes | Palette 4 → **7** colours (background, light, medium, dark, roof, water, green). Vector font in UI. **Compass rose** added (rotates with the Warp rotation; Ctrl+click resets; Shift+click rerolls its shape). Scale bar: two designs, auto-switch to miles/km for large cities. **Improved framing** (viewport choice). **Raised roofs** (fake-3D). "Thin lines" extended to overlays and decoupled from map scale. Better Azgaar FMG integration; improved buildings generation; Warp optimised ("and uglified"); legend fixed in place; new label font; option to filter out triangular buildings; water drawn differently; **>1 park per city**, parks drawn differently and can be marked as separate districts; smaller SVG exports. |
| 3 | ~Nov 2019 | 112574 | 0.7.3: Bug fixes, GeoJSON export | Fixed a bug that could hard-freeze the machine. Fixed: extramural buildings too close to the wall; river with both ends on the coast; "weird roads". **Small plazas are now created around gates** so gates stop overlapping neighbouring buildings. Replaced naive **Bowyer–Watson** with a port of **Delaunator** for the Voronoi stage (~100× faster). **GeoJSON export**. New URL params `gates=` and `export=` (png/svg/json). |
| 4 | ~Feb 2020 | 123268 | City Viewer aka Toy Town 2 | Companion app released. Loads an MFCG JSON export and builds a 3D model; does **no** procedural generation of its own. Simpler than Toy Town (no gable roofs, no windows, no trees) but much faster and handles much larger cities. Next goal stated: "elevation" option to place a city on a hilly surface. |
| 5 | ~Feb 2020 | 124980 | City Viewer 1.0.1: gable roofs and .obj export | Gable roofs restored; OBJ export documented (previously an experiment). |
| 6 | ~Jun 2020 | 153064 | 0.7.6: Landmarks | **Landmarks** — named points of interest with lettered map pins and a legend box, alongside numbered districts/roads. |
| 7 | ~Oct 2020 | 179534 | 0.8.0: new buildings, improved UI | "A new algorithm for buildings/lots creation is introduced, which is the reason to increase the second part of the version number." Note: the "curved streets" goal announced in 0.7.2 is **not** claimed as delivered. |
| 8 | ~Apr 2021 | 219273 | 0.8.1: major UI changes | Whole new windowed UI (Generate / Settlement / Style / Color scheme dialogs, context menu). Road count becomes a generation parameter (Generate > Roads). POI list loading (`Settlement > Landmarks > Load`). |
| 9 | ~May 2021 | 228034 | 0.8.2: basic integration with Armoria | Coat of arms fetched from Azgaar's Armoria and drawn on the map. Called "the smallest MFCG update ever". |
| 10 | ~Jun 2021 | 242933 | 0.8.3: assorted improvements | **District tints** (Color scheme > Tints tab: Method = Overlay, Strength = 50%). Scale bar can render in yards. |
| 11 | ~Feb 2022 | 334289 | 0.9.0: new alleys and buildings | Intended small, grew into a minor-version bump. Style > Buildings tab gains **Lots method**, **Display mode**, **Processing** dropdowns plus **Filter lots / No outline / Raised** checkboxes. |
| 12 | ~Mar 2022 | 345262 | 0.9.1: trees and other visual changes | **Trees**. Several changes explicitly aimed at making maps easier to repaint in other software. |
| 13 | ~Mar 2023 | 494237 | 0.9.2: assorted new features and improvements | Fixed `export=`; "the rest of the changes are just random items from my todo list". |
| 14 | ~Mar 2023 | 494692 | Keyboard shortcuts and mouse actions | Reference post, no version. Exposes the whole interaction surface incl. the 8 Warp tools. |
| 15 | ~Oct 2023 | 576591 | 0.10.0-alpha | Alpha published at a separate URL (`watabou.github.io/city-generator/0.10.0`), not replacing 0.9.2. JSON export has diverged from GeoJSON. Language confirmed as **Haxe**. |
| 16 | ~Mar 2024 | 685971 | 0.10.1 | No new features vs the alpha; fixes the issues that blocked a normal release. |
| 17 | ~Apr 2024 | 698858 | 0.10.2: alleys view | **Alleys** become a drawable layer, hidden by default. "Technically, it was easy, but there were nuances… alleys don't look exactly like major roads." |
| 18 | ~May 2024 | 711706 | 0.11.0: roof details and district view | **Roofs** drop-down on the Buildings tab: **Plain / Hip / Gable**. Hip and Gable make generation "a little slower". **District view** added. |
| 19 | ~May 2024 | 715292 | 0.11.1: improved map labels | New label-placement algorithm "based on the idea of **straight skeleton**", "much more reliable"; curvilinear labels. |
| 20 | ~Aug 2024 | 780847 | 0.11.2: small improvements and bug fixes | "Numerous tweaks and fixes, most (but not all) of them related to **rivers and coastlines**." |
| 21 | ~Oct 2024 | 817711 | 0.11.4: forests | **Forests** — the single longest-standing feature request, dating back to first release. Retrospective admission: at first release "these cities were barely more than stylized Voronoi diagrams". (0.11.3 is absent from this slice.) |
| 22 | ~Oct 2024 | 823841 | Experiments | Unreleased look experiments: extruded 2.5D buildings with hard cast shadows. "Some of them I'm not planning to release at all." |
| 23 | ~Jan 2025 | 880636 | Three generators have been updated | MFCG, **Village Generator** and **Dwellings** updated together; all three small. |

---

## 2. Techniques

Each entry: problem → algorithm as recoverable → parameters/constants → failure modes
and handling → delta vs previous → what a re-implementer must still decide.

### 2.1 Voronoi as the substrate, and the Delaunator swap — [STATED]
*Source: `112574-073-bug-fixes-geojson-export/post.md` L16; `817711-0114-forests/post.md` L12.*

- **Problem.** The city's coarse partition into wards/patches is a Voronoi diagram over
  seed points; computing it with a hand-rolled Bowyer–Watson triangulation was slow and
  (by implication) numerically fragile.
- **Algorithm as stated.** "I have finally replaced my naive implementation of
  Bowyer-Watson algorithm with a port of Delaunator for creating Voronoi diagrams."
  Delaunator computes the Delaunay triangulation; the Voronoi cells are then the dual
  (circumcentres of adjacent triangles joined around each site). Watabou explicitly
  links the Wikipedia Bowyer–Watson page and the mapbox/delaunator repo.
- **Quantified effect.** "One of the stages of city generation is now a hundred times
  faster. This stage wasn't a bottle neck, so you probably won't see a difference, but
  it's important for further development of the generator." → the Voronoi stage is
  **not** the hot path; the hot path is downstream (lot subdivision / rendering).
- **Corroboration that Voronoi is foundational.** In `817711` (0.11.4) he writes that at
  first release "these cities were barely more than stylized Voronoi diagrams". This is
  the clearest single-sentence statement of the generator's core in my whole slice.
- **Still UNKNOWN.** Seed-point distribution (uniform? jittered grid? Poisson-disc?),
  whether Lloyd relaxation is applied, how many seeds per size class, how the diagram is
  clipped to the city outline, and how the river/coast cut interacts with cell boundaries.
  None of that is stated anywhere in this slice.

### 2.2 Ward/lot subdivision — the 0.8.0 rewrite and the 0.9.0 "alleys" rewrite — [STATED] + [SHOWN]
*Sources: `179534-080-new-buildings-improved-ui/post.md` L11; `334289-090-new-alleys-and-buildings/post.md` L10; images `179534/images/01.png`, `334289/images/01.png`, `685971/images/01.png`.*

- **Problem.** Turning a ward polygon into a believable medieval block-and-building
  pattern: irregular lots, alleys, courtyards, and buildings that are not all convex
  quads.
- **What is stated.** 0.8.0: "A new algorithm for buildings/lots creation is introduced,
  which is the reason to increase the second part of the version number." No method
  given on itch (the detail is behind a Patreon link, `posts/41711473`, not in this
  slice). 0.9.0 is titled "new alleys and buildings" and is described only as having
  grown beyond its intended scope.
- **What the 0.9.0 UI exposes — [SHOWN], `334289/images/01.png`.** The Style window, tab
  **Buildings**, contains exactly:
  - `Lots method:` dropdown, current value **`Twisted`**
  - `Display mode:` dropdown, current value **`Lots`**
  - `Processing:` dropdown, current value **`Offset`**
  - checkbox **`Filter lots`** (checked)
  - checkbox **`No outline`** (unchecked)
  - checkbox **`Raised`** (unchecked)
  These six controls are the most concrete evidence of the lot pipeline's shape anywhere
  in my slice. Their existence implies the pipeline is: *ward polygon → (Lots method)
  → set of lot polygons → (Filter lots) → (Processing) → (Display mode) → render.*
- **[INFERRED] reading of each control**, reasoning given:
  - **Lots method = "Twisted"** — a named *family* of subdivision, so at least one
    alternative exists (unseen). "Twisted" plausibly denotes subdivision whose cut
    directions are perturbed away from the block's own axes, versus a "straight"/grid
    variant. Reasoning: the open-source ancestor's `Ward.createAlleys`
    (`reference/TownGeneratorOS/Source/com/watabou/towngenerator/wards/Ward.hx:125-152`)
    recursively bisects a polygon and takes its cut direction from the longest edge with
    an angular perturbation `angleSpread = PI/6 * gridChaos` and a positional spread
    `0.8 * gridChaos`; "twisted" is the natural product name for the high-`gridChaos`
    behaviour. This is an inference from the ancestor, **not** a statement by watabou.
  - **Processing = "Offset"** — a post-pass applied to each lot polygon. Polygon
    *offsetting* (inward buffering / straight-skeleton shrink) is what turns a lot that
    fills its block into a building footprint set back from the alley. The ancestor has
    exactly this: `patch.shape.shrink(insetDist)` at `Ward.hx:57`. Alternatives in the
    dropdown are unseen.
  - **Display mode = "Lots"** — draw the lot polygons themselves rather than the
    processed buildings. In `334289/images/01.png` the intramural blocks are tiled
    edge-to-edge by polygons separated only by thin background-coloured alleys, with
    scattered *empty* white polygons inside blocks — consistent with drawing lots, and
    with a per-lot "leave empty" probability (ancestor: `emptyProb = 0.04`, `Ward.hx:125`).
  - **Filter lots** — the direct descendant of the 0.7.2 "option to filter out
    triangular buildings" (`101529` L56). It discards degenerate lots (slivers,
    triangles) rather than drawing bad buildings.
  - **Raised** — the fake-3D roof extrusion introduced in 0.7.2 (see §2.8).
- **What the images show about the resulting geometry — [SHOWN].**
  - `179534/images/01.png` (0.8.0, a close crop): building footprints are frequently
    **non-convex** — L, T, U and C shapes — and blocks routinely enclose a courtyard.
    This is a visible break from "every building is a convex quad".
  - `334289/images/01.png` (0.9.0): whole wards are tiled by lots with white alley gaps;
    empty lots read as courtyards; wards are tinted per-district so the ward partition is
    directly legible.
  - `685971/images/01.png` (0.10.1, "No outline" style): the alley network becomes the
    dominant graphic — a dense capillary net of cream lines through solid colour blocks.
- **Failure modes named by the creator.** Triangular/degenerate lots (handled by a
  filter, 0.7.2 → `Filter lots`); extramural buildings placed too close to the city wall
  (fixed in 0.7.3); gates overlapping neighbouring buildings (fixed by carving plazas,
  see §2.3).
- **Still UNKNOWN.** The full value lists of the three dropdowns; the numeric constants
  (minimum lot area, alley width, empty-lot probability, chaos parameters) in the modern
  versions; whether the modern subdivision is still recursive OBB bisection at all;
  whether courtyards are an explicit feature or an emergent result of empty lots.

### 2.3 Plazas carved around gates — [STATED]
*Source: `112574-073-bug-fixes-geojson-export/post.md` L15.*

- **Problem.** A gate sits on the wall polyline; the ward immediately inside subdivides
  right up to the wall, so buildings land on top of the gate and block the road that must
  pass through it.
- **Algorithm as stated.** "To prevent gates from overlapping neighbouring buildings,
  small plazas are now created around gates." I.e. before lot subdivision, a small
  keep-out polygon is stamped at each gate position and subtracted from (or excluded by)
  the buildable area, producing a small open square just inside/outside the gate.
- **Corroboration — [SHOWN].** In `153064/images/01.png` and `817711/images/01.jpg`, the
  area immediately inside each gate is visibly clear of buildings and a road runs
  straight out of it.
- **Still UNKNOWN.** Plaza radius/shape and whether it scales with road width or city size.
- **Generalisable principle for a re-implementation.** Negative space is authored
  *before* subdivision, as an exclusion mask, not repaired afterwards. The same trick
  covers the main plaza, the temple forecourt, and the parks.

### 2.4 Framing / viewport selection — [STATED]
*Source: `101529-072-…/post.md` L41; plus `91172` comments L34-36.*

- **Problem.** A city's drawn extent is not its bounding box: ribbon development along
  roads and a river tail can stretch the bounding box far beyond the interesting area,
  so a naive fit leaves the city small in a sea of empty paper.
- **What is stated.** "The generator now chooses a 'window' for a city more correctly.
  It is more visible on exported images, especially when there are large sprawls along
  roads or a river." No method given → **[NAMED-ONLY]** at the algorithm level.
- **Known failure mode, from the comment thread (`91172` L36, user "Tom").** "the SVG is
  always portrait and includes a lot of empty space. That means editing every exported
  file manually." So as of 0.7.1 the SVG export used a fixed portrait page with generous
  margins; the 0.7.2 framing work is the response.
- **Related technical constraint (`91172` L35).** "due to implementation details of
  OpenFL (which is used as a drawing engine) I can't implement zooming." This constraint
  recurs for years (see §5) and explains why *framing* had to be solved at generation
  time rather than by letting the user pan/zoom.
- **[INFERRED] plausible method.** Weight the fit by content density — e.g. fit to a
  percentile of the building-centroid distribution, or to the walled core plus a margin,
  rather than to the extremal geometry. Reasoning: exported images in this slice
  (`242933`, `576591`, `780847`) consistently crop through the outermost sprawl and
  farm fields rather than containing all of them.

### 2.5 Map labels via the straight skeleton — [STATED], the single most valuable algorithmic disclosure in this slice
*Source: `715292-0111-improved-map-labels/post.md` L12; image `715292/images/01.png`.*

- **Problem.** Place a district name inside an arbitrary, often crescent- or
  annulus-shaped ward polygon so that the text (a) fits, (b) stays inside, (c) reads
  along the ward's own grain, and (d) does not collide with other labels.
- **Exactly what is stated.** "The new algorithm is a widely used one (unfortunately, I
  don't know its name) and it's much more reliable. It's based on the idea of
  [straight skeleton] and essentially it is about…" — the sentence is truncated by the
  Patreon paywall link. He also links a dedicated Patreon post titled *straight*
  (`posts/straight-101173551`), i.e. he had written the skeleton code up separately
  just before shipping this.
- **[INFERRED] reconstruction of "the widely used one".** The standard technique this
  describes is: compute the polygon's straight skeleton; the skeleton's interior arcs
  form a medial-axis-like tree; pick the longest path (or the highest-clearance path)
  through that tree; smooth it into a curve; set the text along that curve, sized so the
  glyph height is at most twice the local skeleton clearance (the distance from the
  skeleton to the polygon boundary, which the straight skeleton gives for free as each
  node's offset time). Reasoning: (i) the straight skeleton is named by the author;
  (ii) the rendered labels in `715292/images/01.png` are unmistakably set on *curved*
  baselines that thread down the middle of each crescent-shaped ward
  ("WESTERN SLUMS", "PURPLE ROWS", "FREE SIDE", "NEW LODGE" all bend with their ward);
  (iii) label size visibly tracks ward size (tiny "UPPER DISTRICT" vs huge "GRIMHEART
  TOWN"), which is what clearance-driven sizing produces.
- **Corroborating images — [SHOWN].** Curvilinear labels first appear far earlier than
  0.11.1: `101529/images/01.png` (0.7.2, "CABBAGE DOCKS" and "HAYDOCKS" already curve),
  `345262/images/01.png` (0.9.1), `494237/images/01.png` (0.9.2). So 0.11.1 **replaced**
  an older curvilinear-label method with a skeleton-based one, it did not introduce
  curved labels. The 0.7.1 post already lists "improved labels placing" as a change, and
  0.7.2 mentions a "new font for labels" — label placement was iterated on for years.
- **Known limitation, from comments (`494692` L68-69).** A user asks to move labels;
  watabou: "currently labels can only be placed automatically", and asks whether the
  complaint is about placement *within* districts or about labelling arbitrary areas.
- **Still UNKNOWN.** Whether the straight skeleton is computed exactly (Aichholzer-style
  wavefront) or approximated by iterated polygon offsetting; how inter-label collisions
  are resolved; how the small/large label tiers are assigned; whether the same skeleton
  is reused for roof generation (see §2.9 — strongly suspected).

### 2.6 Roofs: Plain / Hip / Gable, in 2D — [STATED] + [SHOWN]
*Source: `711706-0110-roof-details-and-district-view/post.md` L11; image `711706/images/01.png`.*

- **Problem.** A top-down building footprint drawn as a flat polygon reads as a slab.
  Drawing the roof's fold lines makes it read as a house without leaving 2D.
- **Exactly what is stated.** "A new **Roofs** drop-down menu has been added to the
  Buildings tab of the Style window with three options: **Plain**, **Hip** and **Gable**.
  The Hip and Gable options make the generation a little slower, but on my laptop the
  difference is not visible to the naked eye."
- **What the image shows — [SHOWN], `711706/images/01.png`.** Every building footprint
  carries an internal line pattern: a **ridge line** running along the footprint's long
  axis, with **hip lines** springing diagonally from the footprint's corners to the ends
  of the ridge. On non-convex (L-shaped) footprints the pattern branches and meets at
  interior junctions. Many roofs additionally carry **fine parallel striations**
  perpendicular to the ridge (shingle/rafter hatching) — that is the "roof details" of
  the post title, distinct from the Hip/Gable geometry.
- **[INFERRED] method.** Hip and gable roofs over an arbitrary simple polygon are the
  textbook application of the **straight skeleton**: the skeleton *is* the set of ridge
  and hip lines of a roof raised at a constant pitch over the footprint. The gable
  variant is the same skeleton with the degenerate end-faces replaced by vertical gable
  walls (i.e. the skeleton's terminal arcs are collapsed to a point at the footprint
  edge rather than hipped). Reasoning: (a) the branching ridge/hip pattern on L-shaped
  footprints in the image is precisely a straight skeleton and nothing else produces it;
  (b) watabou wrote and published his straight-skeleton work in the *same* release
  cycle (Patreon `straight-101173551` is linked from 0.11.1, one release later);
  (c) "make the generation a little slower" fits a per-building skeleton computation and
  does not fit a texture/hatching pass. Confidence: high.
- **Still UNKNOWN.** Roof pitch (or whether pitch is even parameterised); how the
  striation spacing is chosen; whether the skeleton is clipped for very small footprints;
  whether Plain/Hip/Gable is chosen per-building or globally (the UI is global).

### 2.7 Alleys as a first-class drawable layer — [STATED] + [SHOWN]
*Sources: `698858-0102-alleys-view/post.md` L11; `494692/post.md` L22 (shortcut `A`); images `685971/images/01.png`, `334289/images/01.png`.*

- **Problem.** The gaps between lots already existed as geometry; exposing them as a
  drawn network makes the intramural circulation legible.
- **What is stated.** "Technically, it was easy, but there were nuances which needed to
  be taken care of. As a result, **alleys don't look exactly like major roads** and the
  way they are drawn may change in the future. By default, they are hidden and you need
  to [enable them]." Keyboard shortcut **`A`** toggles alleys (`494692` L22).
- **[INFERRED] what the "nuances" are.** Major roads in MFCG are drawn as wide stroked
  bands with casing (visible in every colour image here); alleys are the residual space
  *between* lot polygons, i.e. they are defined by their two flanking boundaries, not by
  a centreline. To draw them as lines you must extract a centreline graph from the
  negative space — which is exactly where degenerate junctions, dead ends and
  zero-width pinches appear. Hence "easy, but there were nuances" and "don't look
  exactly like major roads". Reasoning: the 0.10.1 image shows alleys rendered as
  *uniform-width cream ribbons* that terminate abruptly at dead ends, unlike roads which
  taper and connect to the outside world.
- **Still UNKNOWN.** Whether the alley layer is a derived centreline graph or simply the
  lot-gap polygons filled with the road colour. The 0.10.1 image is compatible with
  either.

### 2.8 Raised roofs / fake 3D — [STATED] + [SHOWN]
*Sources: `101529/post.md` L46; `334289/images/01.png` (checkbox `Raised`); `179534/images/01.png`; `823841/images/01.png`.*

- **What is stated (0.7.2).** "Buildings can be drawn in a kind of very simple fake 3D
  style. It is a purely cosmetic feature for those who tired of the utterly flat default
  view." It survives as the `Raised` checkbox on the Buildings tab in 0.9.0.
- **[SHOWN] how it looks.** In `179534/images/01.png` each footprint carries a darker
  copy offset a few pixels toward the lower-right, reading as an extruded wall face lit
  from the upper-left. In `711706/images/01.png` the same offset appears together with
  hip/gable ridge lines — so raised + roof geometry compose.
- **[INFERRED] method.** Translate the footprint by a constant screen-space vector,
  fill it in the "dark"/shadow colour, draw the original footprint on top in the roof
  colour. Constant offset for all buildings (not height-dependent) — in the images the
  offset is visually identical for large and small footprints. A height-dependent offset
  would be the obvious upgrade and is what the `823841` experiment does (below).
- **The Experiments escalation — [SHOWN], `823841/images/01.png`.** An unreleased style
  where every building is a genuine extruded prism rendered in top-down orthographic
  projection with a **hard black cast shadow** and a near-white roof, sun from the
  upper-left. Buildings have visibly *varied heights*. Roads reduce to thin grey lines
  and farm fields to pale rounded quads, so the extrusions carry the whole image.
  Watabou explicitly warns: "none of these features are present in the currently
  published version… some of them I'm not planning to release at all."

### 2.9 Forests — [STATED] (motivation) / [SHOWN] (method)
*Source: `817711-0114-forests/post.md` L12; image `817711/images/01.jpg`; corroborating image `880636/images/01.jpg`.*

- **Problem stated.** "When MFCG was first released and these cities were barely more
  than stylized Voronoi diagrams, one of the first requested features was the ability to
  add surrounding forests. All this time people kept asking about them and finally
  forests are here." No method given → the *feature* is [STATED], the *algorithm* is
  [NAMED-ONLY].
- **[SHOWN] geometry, `817711/images/01.jpg`.** The world is partitioned into two
  regions: an irregular **clearing** containing the settlement, its roads, its farm
  fields and its ribbon development, drawn in the pale ground colour; and everything
  outside it drawn as solid forest. The boundary between them is a closed curve with a
  **scalloped / bumpy** edge — a chain of small convex arcs, reading as a canopy edge.
  The clearing is clearly *not* a simple offset of the built-up area: it has lobes and
  re-entrant notches, it reaches much further along the two main roads and along the
  river than it does perpendicular to them, and small isolated forest islands sit inside
  it.
- **[INFERRED] method.** A distance/occupancy field over the plane — accumulate influence
  from buildings, roads, fields and the river, threshold it, and take the forest as the
  complement; then decorate the resulting boundary with the arc scallops. Reasoning: the
  clearing's shape is a smoothed union of road corridors and the built mass, which is
  what thresholding a summed influence field produces; it is not a convex hull, not a
  polygon offset of the wall, and not a Voronoi cell. A marching-squares extraction of
  the threshold contour followed by per-segment arc decoration would reproduce the
  observed edge. Confidence: moderate — the shape is diagnostic, the implementation is not.
- **[SHOWN] in the later map `880636/images/01.jpg`.** Same construction in a different
  palette (dark green forest, cream clearing), and the scalloping is coarser, confirming
  the scallop amplitude is a style parameter rather than fixed.
- **Still UNKNOWN.** Everything numeric: influence radii, threshold, scallop size,
  whether forests interact with the elevation option, whether forest edges avoid fields.

### 2.10 Trees — [STATED], with an unusually candid scale admission
*Source: `345262-091-trees-and-other-visual-changes/post.md` L10 and the whole comment thread L18-22; images `345262/images/01.png`, `494237/images/01.png`, `711706/images/01.png`, `780847/images/01.png`.*

- **Creator's own words, in full, replying to a complaint that trees are >25 m across:**
  1. "Yes, single trees are pretty large."
  2. "**Single trees get merged together and sometimes groups of them look like single
     even larger trees.**"
  3. "But actually these single trees are supposed to be treated as **clusters of
     greenery or 'micro groves'**. Why would anyone want to have every tree in a city to
     be mapped?"
  4. "**The scale in the generator is probably wrong. Buildings often seem way too
     large.**"
- **Algorithmic content.** Point 2 is a real disclosure: tree glyphs are generated as
  individual discs/blobs and then **merged** (a union of overlapping circles) so that
  clumps become a single outlined mass. That is exactly what the images show — each
  "tree" is a lobed blob whose outline is the union-boundary of several overlapping
  circles, and dense groves read as one large amoeboid shape with a single stroke.
- **Placement — [SHOWN].** Trees appear (a) scattered singly along streets inside wards,
  (b) massed inside parks/greens, (c) strung along field boundaries and road verges
  outside town, (d) never on top of buildings or roads. In `780847/images/01.png` a
  large grove fills an intramural green. In `817711/images/01.jpg` the same glyph is
  drawn in the *forest* colour for isolated groves inside the clearing, tying trees and
  forests to one colour slot.
- **Point 4 is a standing invariant worth inheriting or fixing deliberately**: MFCG's
  metric scale is acknowledged by its author to be off — buildings (and therefore the
  scale bar) are too large for the stated metres. A re-implementation must decide
  explicitly whether to reproduce the "wrong but pretty" scale or calibrate it, because
  building footprint size, road width, scale bar and population estimate are all coupled.
- **Also in 0.9.1 [STATED].** Some of the update's visual features exist "to simplify the
  process of repainting maps in other software" — i.e. the SVG layer/structure was
  reorganised for downstream editing (confirmed by the 0.8.1 commenter "BadgerFiend":
  "Great to have SVG support so I can drop in and make modifications in Inkscape").

### 2.11 Palette model — [STATED] + [SHOWN], fully recovered
*Sources: `101529/post.md` L17; image `219273/images/01.png` (Color scheme dialog); image `242933/images/01.png` (Tints tab).*

- **0.7.2 [STATED]:** palettes extended from 4 to **7** colours —
  `background, light, medium, dark, roof, water, green`. "Old custom palettes should work
  as before" (backward-compatible loading).
- **0.8.1 [SHOWN], with literal hex values read off `219273/images/01.png`** — the dialog
  now has **8** slots (a `Road` slot has been added, and `background` is relabelled
  `Paper`):

  | Slot | Hex in the "Boake-Mily" screenshot |
  |---|---|
  | Paper | `D6CCA8` |
  | Light | `947A69` |
  | Medium | `827968` |
  | Dark | `332C24` |
  | Roof | `A0846E` |
  | Water | `CAC3B3` |
  | Green | `9EA885` |
  | Road | `D8CFB0` |

  Dialog buttons: `Preset`, `Load`, `Apply`, `Save` — so palettes are named presets,
  importable and exportable.
- **0.8.3 [SHOWN], `242933/images/01.png`:** the Color scheme window gains tabs
  `Colors` / `Tints`. The **Tints** tab has `Method:` = **`Overlay`** and
  `Strength(%):` = **`50`**. In that screenshot each district is rendered in a different
  hue (crimson, violet, slate, olive, orange, tan) over the same base palette.
- **[STATED] in comments (`494692` L63-66):** "It's not possible to specify a colour for
  a district, but you can try changing parameters on the Tints tab… if you're not happy
  with the colours **assigned randomly**." And, asked whether some parameter assigns the
  colour: "**Nope.**" → district hue is a free random draw per district, composited over
  the base palette with a named blend mode at a percentage strength.
- **[INFERRED] the composite.** `result = blend(base_colour, district_hue, Overlay) *
  strength + base_colour * (1 - strength)`. Reasoning: an "Overlay" method plus a
  0-100 strength slider is the standard photo-compositing formulation, and the rendered
  result in `242933` preserves the base palette's light/medium/dark *value* structure
  while shifting hue, which is exactly what Overlay-at-50% does and what a plain hue
  replacement would not.
- **Still UNKNOWN.** The other `Method` values; how hues are sampled (uniform on the hue
  circle? a curated set? forced apart?); whether adjacent districts are prevented from
  drawing similar hues (the images suggest yes — neighbours are always distinguishable).

### 2.12 Compass rose — procedurally generated — [STATED]
*Source: `101529/post.md` L27; `494692/post.md` L29-34.*

- "The compass rose indicates an orientation of a map relative to the cardinal
  directions. If you **rotate a map with the Warp tool, the rose is rotated as well**.
  Ctrl+click the rose to reset the orientation. **Shift+click the rose to reroll its
  shape.**" Later shortcuts post adds: "Roll the mouse wheel over the compass to rotate
  it."
- **Two independent facts fall out.** (1) The rose's *shape* is procedurally generated
  and rerollable — it is not an art asset. (2) Map orientation is a first-class piece of
  state that the Warp rotate tool mutates, and the rose is bound to it.
- **[SHOWN] across the slice**, roses vary: 8-point star in a circle with alternating
  black/cream limbs (`101529/02`), 8-point star without circle (`101529/01` area),
  16-point with minor limbs (`153064`, `715292`, `817711`), thin-line fleur-topped
  variants (`711706`, `780847`). The cardinal letter drawn is whichever direction is
  actually up — I see `N`, `E` (`101529/01`) and `W` (`153064/01`), confirming the map
  can be generated/warped to an arbitrary orientation and the rose labels accordingly.
- **Still UNKNOWN.** The grammar of the rose generator (point count, limb ratios, inner
  ring options).

### 2.13 Scale bar — [STATED] + [SHOWN]
*Source: `101529/post.md` L36; images throughout.*

- "There are now **2 scale bar designs**, which can be switched between by shift+clicking
  the bar. The scale bar **switches to miles or kilometers when a city is large enough**."
- **[SHOWN] observed instantiations** (useful as a sanity check on city sizes):
  `0 / 250 / 500m` (`91172`), `40 80 120 160 200m` (`101529/01`, `494237`),
  `0.4 0.8 1.2 1.6 2km` (`101529/02`), `0 / 100 / 200m` (`153064`, `219273`),
  `0m / 250 / 500` (`228034`), `100 200 300 400yd` (`242933` — **yards**, so imperial
  units exist too), `100…500 m` (`715292`, `817711`), `100…400 m` (`880636`).
- **Two designs, both [SHOWN]:** (a) a plain rule with tick marks and numerals above
  (`91172`, `219273`, `715292`); (b) a chequered bar of alternating filled/empty
  segments (`101529/02`, `242933`, `817711`, `880636`).
- Numerals are **old-style (text) figures** in the serif style — `ı` for 1, descending
  `3`/`5` — a consistent typographic signature.

### 2.14 Export formats and the JSON schema — [STATED] + [SHOWN]
*Sources: `112574/post.md` L17-18; `123268` comments L83-98; `576591` comments L22-25; image `112574/images/01.png`.*

- **0.7.3 [STATED].** GeoJSON export added "for those who want to tinker with data
  created by MFCG, instead of images. This is not the final version of this feature,
  I'm not even sure I want to stick with GeoJSON (it seems kind of awkward to me)".
- **By 0.10.0 [STATED], the format has diverged.** Asked whether the JSON export is valid
  GeoJSON (QGIS could not read it): "Initially it was GeoJSON, but for me it was
  inconvenient to use, so I made some changes. So **now it just resembles GeoJSON without
  being compatible with anything**." A third party (Tom / lemuriaorg) maintains a PHP
  converter back to valid GeoJSON.
- **[SHOWN] the 0.7.4-era schema**, read directly off `112574/images/01.png` (geojson.io)
  and off the literal paste in `123268` comment L95:
  - Top level: `{"type":"FeatureCollection","features":[…]}`.
  - **First feature is a metadata record** with no geometry:
    `{"type":"Feature","properties":{"id":"values","roadWidth":0.00007207207207207208,
    "towerRadius":0.00006846846846846847,"wallThickness":0.00006846846846846847,
    "version":"0.7.4","riverWidth":0.00030589267170456956}}`.
  - Subsequent features carry `geometry` (`Polygon`, `MultiLineString`) and a
    `properties.id` naming the **layer** (e.g. `"rivers"`), not the individual object.
  - Coordinates are fake-georeferenced near **lon 20, lat 40** (values like
    `20.0009989426194, 40.0084490335282`; `19.9998850438988, 40.0002977735952`).
- **[INFERRED] the scale convention.** The scalar parameters are expressed in the same
  degree units as the coordinates. `roadWidth = 7.207e-5°`. At latitude 40°, 1° of
  latitude ≈ 111 km, so `roadWidth ≈ 8.0 m`, `towerRadius = wallThickness ≈ 7.6 m`,
  `riverWidth ≈ 34 m`. Those are plausible medieval-map figures and confirm the export is
  a straight affine mapping of internal units onto a degree grid anchored at (20 E, 40 N).
  Note `towerRadius == wallThickness` exactly — towers are exactly as thick as the wall
  in this build, which is a real modelling fact, not a coincidence of rounding.
  Reasoning is arithmetic on the quoted values; confidence high.
- **URL parameters documented in this slice — [STATED].** `gates=` (exact number of
  gates; `gates=0` yields a wall with none), `export=` (`png|svg|json`, exports
  immediately after generation, "useful for some kind of automation"), `size=`
  (precise size, can exceed the Small/Medium/Large range), `seed=`, `name=`, `hub=`,
  `random=`, `citadel=`, `plaza=`, `temple=`, `walls=`, `shantytown=`, `river=`,
  `coast=` — the full list is visible in the example URL watabou posts at
  `123268` comment L57:
  `http://fantasycities.watabou.ru/?size=70&seed=1939698321&hub=0&random=0&citadel=1&plaza=1&temple=0&walls=1&shantytown=1&river=0&coast=0`.
- **Azgaar interop [STATED].** Azgaar's FMG links to MFCG passing **`size = population /
  1000`**; a commenter shows a 6 387-person city arriving as `size=6` and complains it
  looks "a little overcrowded". Watabou does not dispute the mapping.
- **Rejected/considered alternative [STATED].** Asked about CityJSON: "I'll take a look,
  thanks! But right now it seems to me that I'll have to switch to some custom
  (JSON-based) format." — which is what happened by 0.10.0.
- **Hard limitation [STATED].** MFCG **cannot re-import** its own export (`494692` L79-80:
  "No, an exported city can only be imported in City Viewer"). Reproducibility is via
  the seed URL only, and POIs are not covered by the URL (`219273` L25-26).

### 2.15 City Viewer — the 3D companion — [STATED]
*Sources: `123268/post.md` L15-33 and comments; `124980/post.md`; images `123268/01-03`, `124980/01`, `698858/01`.*

- **Contract.** "A separate application which can build and display a 3D model of a city
  generated in MFCG. In contrast with its spiritual predecessor Toy Town, **it doesn't do
  procedural generation** — the cities you see before importing your custom ones are
  generated in MFCG as well, they just come bundled with the viewer." Import = drag and
  drop the exported JSON onto the canvas (a repeated source of user confusion —
  three separate commenters fail at it; watabou: "I'll try to implement a more obvious
  way to import maps, this one causes too much confusion").
- **Trade stated explicitly.** "In some aspects this application is simpler or even
  cruder than the original Toy Town: **no gable roofs, no windows, no trees**. It's not a
  complete degradation though, the viewer is **much faster and can handle much larger
  cities**." → the design decision is throughput over per-building detail.
- **Then reversed, one release later.** `124980` = "City Viewer 1.0.1: gable roofs and
  .obj export". And by `698858/images/01.png` the viewer additionally has **lit windows**
  (yellow dots on wall faces at night) and **trees** (dark low-poly blobs) — i.e. all
  three "missing" features came back.
- **Castle height rule — [STATED], a real authored heuristic.** Asked why castles look
  "very very high": "**The larger the city, the higher its castle. It's done on purpose to
  make them more visible and more 'fairy-tale'.** Ideally it should be customizable and
  probably one day it will be." → keep height ∝ (some increasing function of) city size,
  deliberately exaggerated.
- **Elevation.** Stated as the next goal: "the next release will include the 'elevation'
  option to place a city on a hilly surface instead of a plane". MFCG itself already has
  an `Elevation` option in the 0.7.2 menu and an `Apply elevation` checkbox in the 0.8.1
  Generate window — so elevation exists on both sides.
- **[SHOWN] rendering conventions** (`123268/01`, `123268/03`, `124980/01`, `698858/01`):
  vertical-gradient sky; strong distance fog that washes the far city to the sky colour;
  flat-shaded untextured prisms; a single directional light with no cast shadows in
  1.0.0, gable ridges and a sun disc by 1.0.1; the **city wall as a continuous extruded
  solid with cylindrical towers at every vertex and clean gaps at the gates**;
  farm fields as flat polygons on the ground plane; a "pedestrian view" mode (key `2`)
  and a rotation toggle on `~` (users repeatedly cannot find the tilde — a small UX
  lesson).
- **Stated use cases from the thread.** Export OBJ → Blender for nicer renders, → Unity
  as environment, → **3D printing** (one commenter reports "quite excellent results"),
  → D&D table visuals. Repeated request, twice deflected: merge the Procgen Mansion
  generator in. Watabou: "Procgen Mansion was initially created more or less for this
  purpose, but I don't think actual integration will happen anytime soon" and "it's not
  easy to implement and **performance is just one of the problems**."

### 2.16 The Warp system — 8 named deformation tools — [STATED]
*Source: `494692-keyboard-shortcuts-and-mouse-actions/post.md` L36-55; plus `101529/post.md` L56.*

This is the most complete published description of MFCG's post-generation editing model.

- **Tools, each with a hotkey:** `D` Displace · `R` Rotate · `L` Liquify · `X` Relax ·
  `B` Bloat · `P` Pinch · `M` Measure · `E` Equalize.
- **Common control:** every tool has an **effect-area size**, adjusted with `+`/`-` or
  the mouse wheel — i.e. a brush radius with (almost certainly) a falloff kernel.
- **Session model:** `Enter` submits changes and exits Warp; `Esc` discards them. So Warp
  is a modal edit over a snapshot, committed or rolled back atomically.
- **[INFERRED] what each tool does**, by analogy with the standard image-warp brush set
  they are named after (Photoshop Liquify / mesh warp): Displace = translate points under
  the brush with the drag; Rotate = swirl about the brush centre (and this is the tool
  that changes map orientation, per §2.12); Liquify = smear along the drag direction;
  Relax = Laplacian smoothing of point positions; Bloat = push points radially outward
  from the brush centre; Pinch = pull them inward; Equalize = redistribute spacing toward
  uniformity; Measure = a non-destructive readout, not a deformation. Reasoning: the
  names are the industry-standard set and the effect-area control is the industry-standard
  brush; confidence high for Bloat/Pinch/Displace/Rotate, moderate for Relax/Equalize.
- **Cost, stated.** 0.7.2: "**Warp mode is optimized (and uglified)**" — a candid
  performance-for-appearance trade in the warp preview.
- **Key implication for a re-implementation.** Warping happens on the *geometry* after
  generation, and every dependent overlay (compass orientation, and presumably labels and
  the scale bar) must re-derive from the warped geometry. That is a hard architectural
  constraint: the render layer cannot cache anything the warp can move.

### 2.17 Per-ward regeneration and district view — [STATED]
*Source: `494692/post.md` L28-30; `711706` title.*

- "**Cmd(Ctrl)+click a ward to reroll its inner geometry**" — wards are independently
  re-randomisable without touching the city skeleton. This is a strong statement about
  the data model: the ward partition, the road graph and the wall are one layer, and each
  ward's interior subdivision is a separate, reseedable layer beneath it.
- "**Shift+click a district to zoom in**" — the "district view" of 0.11.0. Since true
  zoom is impossible (§5), district view is implemented as a re-render at a larger scale
  restricted to one ward.

### 2.18 Landmarks / points of interest — [STATED] (workflow) + [SHOWN] (rendering)
*Sources: `153064` (title + image); `219273` comments L25-28; `494692` comments L72-74.*

- **Rendering — [SHOWN], `153064/images/01.png`.** Two distinct marker families on one map:
  - **Districts and roads:** a solid dark **filled circle** with a white numeral (1-6).
  - **Landmarks:** a white circle with a dark ring containing a lowercase letter
    (a-h), sitting atop a small downward **teardrop/pin tail** that points at the exact
    spot. The pin tail is what distinguishes a point feature from an area feature.
  - A bordered **legend box** carries the city name, a rule, the numbered list, a second
    rule, then the lettered list. In `153064` the lists are: districts/roads
    *Old District, Military Ward, Feypole, North Road, The Port, East Road*; landmarks
    *Spires of the Morning, Fair Winds, Silavene's, The Font of Knowledge, The Halls of
    Justice, Blackstaff Tower, The Cynosure, The Market Hall*.
- **Workflow — [STATED].** POIs are *not* generated with names by default; you supply
  them. "Create a list of points of interest externally (like
  `http://fantasycities.watabou.ru/pois.json`) and load it (**Settlement > Landmarks >
  Load**) when you need it. The items from your list will be **distributed across a city
  randomly**." Format: "a JSON file containing a single array of strings, therefore
  quotes are required and so are square brackets". (In a later reply he says "each line
  is the name of a point of interest", which contradicts the JSON-array answer — the two
  answers are inconsistent and a re-implementer should support both.)
- **Known gap — [STATED].** POIs are lost on regeneration and are not carried in the
  seed URL or restored from the JSON export (`219273` L25-26).

### 2.19 Population model — [SHOWN], and it is exactly recoverable
*Sources: images `219273/images/01.png` and `242933/images/01.png` (Settlement window).*

Two independent readings of the Settlement panel:

| Map | Number of buildings | Population | ratio |
|---|---|---|---|
| Boake-Mily (`219273`) | 286 | ~1800 | 6.294 |
| Carketen (`242933`) | 2702 | ~17000 | 6.292 |

- **[INFERRED]** population is a deterministic function of the building count,
  `pop ≈ 6.29 × buildings`, rounded to 2 significant figures for display
  (286 × 6.29 = 1799 → "~1800"; 2702 × 6.29 = 16 996 → "~17000"). The agreement to four
  significant figures across a 9.4× size range rules out a random per-building draw and
  rules out any nonlinearity over that range. A re-implementer can adopt
  `households_per_building × people_per_household` with the product pinned at ~6.3.
  Confidence: high, but based on two samples only.
- The panel therefore reports **buildings** as the primary size measure and derives
  population; the URL `size=` parameter is a third, separate scale knob, and Azgaar
  feeds it `population/1000` (§2.14) — three coupled notions of "size" that do not agree
  with each other. This is a genuine modelling wart to resolve deliberately.
- Corroborating limit: a commenter on 0.11.0 reports "Cant Load Town Of Over 100K People"
  — i.e. ~16 000 buildings is near the practical ceiling.

### 2.20 Riverbank, parks/greens, and district typing — [STATED]
*Sources: `91172/post.md` L19; `101529/post.md` L56; images throughout.*

- 0.7.1 adds a new **"type" of district — riverbank** (`91172` L19). So districts carry a
  *type* that affects naming and presumably subdivision/decoration.
- 0.7.2: "**more than one park can be spawned in a city**, they are drawn differently and
  **can be marked as separate districts**" — parks are both a decoration layer and,
  optionally, promoted to first-class districts with names in the legend.
- District *types* visible by name across the slice: Old Town/Old District, Castle
  District, Military Ward, Merchants District, The Docks/The Port, Shanty town/Slums,
  Gate wards (named after their gate: "Dog Gate", "Eastgate", "Darkgate", "Longgate"),
  riverbank/bridge wards ("Darkbridge", "Old Crossing", "Foolsbridge", "Greenbridge",
  "Winebridge"), Greens ("The Green", "Green Stair"), Upper District, plus generic
  compass wards ("North Ward", "East District", "South Town", "Western Slums").
  The name generator is clearly type-aware: gate wards are named for gates, bridge wards
  for bridges, waterside wards for water.
- The 0.8.1 Generate window enumerates the feature toggles — [SHOWN],
  `219273/images/01.png`: `Random`, `Citadel`, `Inner castle`, `Walls`, `River`, `Coast`,
  `Temple`, `Plaza`, `Shanty town`, `Farms`, `Greens`, plus `Apply elevation`, and size
  buttons `Small` / `Medium` / `Large` / `Size` / `Rebuild` / `From URL`. Compare the
  0.7.2 menu (`101529/images/01.png`): `More roads`, `Farm fields`, `Elevation`,
  `Random`, `Citadel`, `Plaza`, `Temple`, `Walls`, `Shanty town`, `River`, `Coast`.
  **Delta:** `Inner castle` and `Greens` are new by 0.8.1; `More roads` has been replaced
  by a dedicated **Roads** tab with a numeric road count.

### 2.21 Rivers and coastlines — [STATED] failure modes, [SHOWN] rendering
*Sources: `112574/post.md` L14; `780847/post.md` L11; images `91172/01`, `101529/01-02`, `494237/01`, `576591/01`, `780847/01`, `817711/01`, `880636/01`.*

- **Named bug, 0.7.3:** "the one with **both ends of the river on the coast**" — the river
  generator could produce a river that starts and ends in the sea. Fixed. This tells you
  the river is generated as a path across the domain without a guaranteed inland source.
- **0.11.2 is almost entirely a river/coast release:** "numerous tweaks and fixes, most
  (but not all) of them related to rivers and coastlines."
- **[SHOWN] river rendering conventions, in evolution order:**
  - 0.7.1 (`91172/01`): a smooth tapering band in the "green"/pale colour, no casing,
    meandering with large-radius curves.
  - 0.7.2 (`101529/01`): dark slate band with a **casing line** either side; visibly
    constant width; a distinct **estuary** widening where it meets the sea.
  - 0.9.2 (`494237/01`): pale blue band with a thin dark casing; width constant.
  - 0.10.0 (`576591/01`): thick saturated blue band with a *lighter blue inner stripe*
    (a two-tone bank treatment).
  - 0.11.2 (`780847/01`): flat navy with hard edges, no casing; a **mid-river island**
    carrying two named wards, joined by bridges.
  - 0.11.4 (`817711/01`): **two tributaries merging** inside the town — so the river is a
    small tree, not a single polyline, by this point.
- **[SHOWN] coast rendering.** The sea is drawn with **3-5 concentric contour lines
  echoing the shoreline inward or outward at decreasing spacing** (`101529/02`,
  `153064/01`, `228034/01`) — a nautical-chart convention. In later releases
  (`715292/01`, `780847/01`) the sea is a flat fill with a single shoreline stroke and
  the echo lines are gone.
- **[SHOWN] piers/docks.** Short thick bars perpendicular to the shoreline, arranged in
  runs of 3-8, always in front of a "Docks"/"Port" ward (`101529/01`, `153064/01`,
  `228034/01`, `715292/01`, `780847/01`). In `101529/01` they are drawn as ladder-like
  hatched rectangles; later they simplify to single thick strokes.
- **[SHOWN] bridges.** Where a road crosses the river the road band continues unbroken and
  a small label may be attached ("DARKBRIDGE", "OLD CROSSING" in `494237/01`). In
  `179534/01` a wall crosses the river as a thick black line with round tower dots
  spaced along it — so walls bridge water rather than stopping at it.
- **Still UNKNOWN.** How the river path is generated (noise-driven? A* on a height field?
  spline through control points?), how the coast outline is generated, and how either
  interacts with the Voronoi partition.

### 2.22 City wall, gates and towers — [SHOWN], with one [STATED] parameter
*Sources: `112574/post.md` L18 (`gates=`); `123268` comment L95 (`towerRadius`, `wallThickness`); images throughout.*

- **[SHOWN] wall rendering evolves through three distinct styles:**
  1. **Thick dark polyline with filled circles at the vertices** (towers) and short
     perpendicular bars marking gates — `91172/01`, `153064/01`, `334289/01`, `715292/01`.
  2. **Thick dark polyline with filled squares** at intervals — `228034/01`.
  3. **A light/cream band with square bastion blocks straddling it**, reading as a
     masonry wall in plan rather than a line — `780847/01`, `817711/01`.
- **Gates — [SHOWN]:** rendered as a break in the wall flanked by two heavier
  perpendicular bars (the gate towers), always with a road passing through and a small
  clear plaza inside (§2.3). Count is user-settable via `gates=` **[STATED]**, and
  `gates=0` is explicitly legal.
- **Towers — [SHOWN/derived]:** placed at wall polyline **vertices**, not at uniform
  arc-length spacing — visible in `91172/01` and `153064/01` where tower spacing varies
  with the polygon's irregularity. `towerRadius == wallThickness` in the exported
  metadata (§2.14).
- **Citadel/castle — [SHOWN]:** a *separate, smaller* closed wall loop with its own
  towers, either (a) tangent to the city wall and sharing a segment with it
  (`153064/01`, `711706/01`), or (b) free-standing inside or outside the city
  (`219273/01`, `242933/01`, `576591/01`, `880636/01`). Inside it sits a **keep** drawn as
  a chunky non-convex footprint — a cross/plus shape in `91172/01`, `345262/01`,
  `494237/01`, `715292/01`, `576591/01`; an irregular blob in `153064/01`. The keep is
  drawn in the "dark" colour and is visibly the largest single footprint on the map.
  The `Inner castle` checkbox (0.8.1) is presumably what toggles the keep separately from
  the enclosure.

### 2.23 Farm fields — [SHOWN]
- Fields are irregular convex-ish quads and pentagons, tiled in **strips sharing edges**,
  fanning out along the roads leaving town; they never overlap buildings.
- Two render treatments: **fine parallel hatching whose direction is constant within a
  field and varies between fields** (`101529/01`, `228034/01`, `242933/01`, `494237/01`,
  `817711/01`) — i.e. each field carries a random furrow angle; or **flat pale-green
  fill with a thin outline and rounded corners** (`711706/01`, `780847/01`, `880636/01`).
- In the 3D viewer (`123268/02`) the same fields appear as **rounded-corner quads** on the
  ground plane, confirming a corner-rounding pass on the field polygons themselves rather
  than a 2D-only drawing trick.
- Isolated farmsteads (1-3 tiny buildings) sit inside or at the corners of field clusters.

### 2.24 Extramural sprawl / ribbon development — [SHOWN] + one [STATED] bug
- Outside the wall, buildings cluster densely in bands hugging the radial roads and thin
  out with distance — `91172/01`, `228034/01`, `345262/01`, `576591/01`, `823841/01`.
  This ribbon pattern is so pronounced in `823841/01` that the extramural arms are
  narrower than one block.
- **[STATED] bug fixed in 0.7.3:** "extramural buildings being placed too close to the
  city wall" — so the sprawl generator needed an explicit clearance from the wall.
- Sprawl wards get their own names and tints in later versions (`334289/01`: "West
  District", "Misthill", "Dawnarch" are all extramural).

---

## 3. Visual and style conventions observed in the images

**Palette / colour**
- Eight named slots (§2.11). Backgrounds are always warm and desaturated — sand
  `D6CCA8`, cream, pale khaki, pale sage, or near-white. Never pure white except in the
  0.11.0 line-art style (`711706/01`).
- Buildings sit one or two steps darker than the paper, in a *hue-shifted* neutral
  (dusty rose `947A69`, brick red, slate blue, purple, ochre, olive). The "Roof" slot is
  a lighter, warmer sibling of the building fill.
- Water is either much darker than everything (`101529/01` slate, `780847/01` navy) or
  much lighter (`91172/01` pale green, `494237/01` pale blue). Both read; mid-value water
  is never used.
- Outlines are always the single "Dark" colour (`332C24`-like), used for building strokes,
  wall fill, keep fill and label text — a one-ink discipline that keeps the maps coherent.
- District tints are random hues Overlay-composited at ~50% (§2.11). Neighbouring
  districts always land on visibly different hues.
- The `823841` experiment breaks the palette rule: near-white roofs and pure-black cast
  shadows on a single flat blue-grey ground.

**Line weights**
- Three weights only: hairline for roads' casings, field outlines and contour echoes;
  a medium stroke for every building; a heavy stroke for the city wall and the legend box
  border. The "Thin lines" option scales the first two.
- **[STATED], 0.7.2:** "the thickness of lines doesn't depend on a map scale, so you may
  want to choose 'thin lines' for large cities." Strokes are in screen units, not world
  units — a deliberate cartographic choice with a manual escape hatch.
- **`No outline` mode** (`334289` checkbox; realised in `685971/01`) drops building strokes
  entirely and relies on per-building value jitter plus the cream alley network for
  legibility. It is the most "modern infographic" of all the styles here.

**Hatching**
- Only two hatch uses: **farm furrows** (parallel lines, per-field random angle, close
  spacing) and **roof striations** in 0.11.0 (`711706/01`, fine lines perpendicular to
  the ridge). Water is never hatched; forests are never hatched.

**Shadows / depth**
- `Raised` = constant-offset dark copy under each footprint, sun from upper-left
  (§2.8). In the 3D-render images the same upper-left key is used.
- `823841` experiment: true extrusion with long hard black shadows, still upper-left.

**Roofs**
- 2D: Plain (flat fill) / Hip (ridge + corner hips) / Gable (ridge + end walls), plus
  optional striations (§2.6).
- 3D (City Viewer): flat prisms in 1.0.0; gable ridges from 1.0.1; lit windows at night
  by `698858/01`.

**Trees and greenery**
- Blobs formed by unioning overlapping circles, single dark stroke around the merged mass
  (§2.10). Filled in the "Green" slot, or in the forest colour when they are groves in
  the clearing (`817711/01`).
- Parks/greens are flat polygons in the Green slot, often with trees drawn on top
  (`101529/01` "THE GREEN"; `780847/01`).

**Water**
- Flat fill plus shoreline stroke; in the 2019-2021 maps also 3-5 concentric echo
  contours; rivers as constant-width bands, sometimes with a lighter inner stripe;
  piers as perpendicular bars; estuaries widen at the coast.

**Labels**
- Two families coexist:
  - **Serif** (a Garamond-like face with old-style figures) for the legend box, city
    title and scale numerals — `153064`, `219273`, `228034`, `242933`, `494237`, `880636`.
  - **Letter-spaced bold caps** for on-map district names, curved along the ward's
    skeleton, with a white/paper **halo** behind the glyphs (`715292/01`, `780847/01`,
    `817711/01`). Earlier maps use a bold italic sans (`91172/01`, `345262/01`).
- **Size encodes importance**: major districts get large text spanning the ward, minor
  ones get small text (`345262/01` has "CLEARLANE" at ~4× the size of "SEVEN RIDGES").
- Label colour is either the Dark ink, or a strong accent (crimson in `715292/01`, navy
  in `780847/01`) always with a paper-coloured halo.
- Small italic caps for micro-features: "RIVER PORT", "MURKY REACH" (`91172/01`),
  "DARKBRIDGE", "OLD CROSSING" (`494237/01`).

**Legend / overlays**
- Legend box: thin double-ruled rectangle in paper colour; city name centred; horizontal
  rule; scale bar; the numbered district list; optionally a second rule and a lettered
  landmark list; optionally the Armoria coat of arms (inside the box in `242933`, loose on
  the map in `228034` and `715292`).
- **[STATED], 0.7.2:** "the legend is no longer movable, but looks a bit nicer" — a
  deliberate removal of a degree of freedom.
- Compass rose always in a bottom corner (bottom-right in 9 of 12 maps with one).
- A faint **square grid** can be overlaid (`715292/01`; toggle `D` per `494692`), drawn in
  a mid-grey hairline under everything.

**Plaza**
- Always a pale polygon (paper colour) with a **single tiny filled dot or small square at
  its centre** — a market cross or well (`91172/01`, `153064/01`, `228034/01`, `494237/01`,
  `685971/01`, `780847/01`). This dot is one of MFCG's most consistent signatures across
  six years of images.

---

## 4. Creator's stated design philosophy and constraints

1. **Windowless interaction, until it broke.** `91172` L14: "It gets harder and harder to
   invent 'windowsless' ways of interaction, so eventually I'll have to implement a
   proper UI with dialogs, tabs, scrollbars etc." Two releases later 0.8.1 is exactly
   that. The intermediate idiom — plain click to edit, **Shift+click to reroll**,
   **Ctrl+click to reset** — survives into the shortcut list and is worth stealing.
2. **Ship small, name honestly.** Version minor numbers are bumped *because* a core
   algorithm changed ("A new algorithm for buildings/lots creation is introduced, which
   is the reason to increase the second part of the version number", `179534`); 0.9.0 was
   "supposed to be small" and got renumbered when it wasn't; 0.8.2 is advertised as "the
   smallest MFCG update ever"; 0.10.0 shipped as an alpha at a separate URL rather than
   replacing the stable build.
3. **Risk is stated up front.** `101529` L61 on the curved-streets plan: "This will need
   very serious changes in the current model and algorithms, so there is a **non-zero
   chance of failure**. But I think it's worth it, so let's hope for the best." (And in
   fact 0.8.0 shipped a lots/buildings rewrite, not curved streets.)
4. **Correctness is admitted, not hidden.** 0.7.3: "I can't be 100% sure that exactly that
   bug is fixed, but I've found (and fixed) a couple of errors which could be the reason."
   0.9.1: "The scale in the generator is probably wrong. Buildings often seem way too
   large." 0.11.1: "The new algorithm is a widely used one (unfortunately, **I don't know
   its name**)."
5. **Explicit performance/appearance trades.** "Warp mode is optimized (and uglified)";
   City Viewer drops gable roofs/windows/trees to be "much faster and… handle much larger
   cities"; Hip/Gable roofs "make the generation a little slower, but on my laptop the
   difference is not visible to the naked eye".
6. **He optimises what unblocks future work, not what users feel.** On Delaunator: "This
   stage wasn't a bottle neck, so you probably won't see a difference, but **it's
   important for further development of the generator**."
7. **Features are declined with a reason, not deflected.** Deleting a district: "No. What
   would be on its place?" Numbering every building: "But there are hundreds of them! How
   is it supposed to look? And why? :)" Mansion integration: "not easy to implement and
   performance is just one of the problems."
8. **Desktop vs web split.** Hand-placing farms, bridges and buildings "is planned as a
   feature for the desktop version (**but not for the web version**)" (`91172` L38).
9. **Interop is a first-class goal** — Azgaar's FMG (0.7.2, better integration), Azgaar's
   Armoria (0.8.2), GeoJSON/JSON export, SVG for Inkscape repainting, OBJ for
   Blender/Unity/3D-printing.
10. **But format purity is not.** GeoJSON was adopted, found "kind of awkward", then
    mutated until it "just resembles GeoJSON without being compatible with anything" —
    a conscious choice of author convenience over ecosystem compatibility, which pushed
    conversion work onto third parties.
11. **Visual direction is admitted to be unsettled.** `91172` L24: "I'd like to improve the
    look of the generator/generated maps somehow, **not sure how yet** :)"; `123268`:
    "I'm planning to improve visuals gradually, but **I'm not sure yet what I am aiming
    for**"; `823841`: a whole post of experiments, "some of them I'm not planning to
    release at all".
12. **He builds for his own interest first.** `123268` L33: "I don't know if anybody
    really needs it… so for now I'll try to **focus on stuff which interests me**."

---

## 5. Useful facts from the comment threads

- **No zoom, for years, because of the engine.** 0.7.1: "due to implementation details of
  **OpenFL** (which is used as a drawing engine) I can't implement zooming. Eventually it
  will be fixed this way or another." 0.8.1: "Currently it is not possible to zoom due to
  some technical issues which I hope will be resolved one day." Shortcuts post: "there are
  technical issues that prevent me from implementing a normal zoom function." Three
  separate users ask over ~4 years. The workaround shipped instead is **Shift+click a
  district to zoom in** (district view, 0.11.0) — i.e. re-render one ward at a larger
  scale. **This is the single biggest architectural lesson in the slice: the render
  target was fixed-resolution, so every "zoom" affordance had to be faked, and framing
  had to be solved at generation time.**
- **Language: Haxe**, confirmed by watabou in `576591` ("Haxe? It is not an exotic
  language :)"). Drawing engine: OpenFL.
- **Non-itch canonical build:** `http://fantasycities.watabou.ru/`, with URL parameters;
  the 0.10.0 alpha lived at `https://watabou.github.io/city-generator/0.10.0`.
- **City name is persisted in the URL; district names are not** (`91172` L12).
- **Districts cannot be added by the user** as of 0.7.1 ("Definitely, but I can't say how
  far this future is"), and cannot be deleted ever ("No. What would be on its place?").
- **Roads cannot be added or removed after generation**; you can only request a specific
  road count at generation (Generate > Roads).
- **Labels cannot be moved**; placement is automatic only.
- **A generated city cannot be re-imported into MFCG** — only into City Viewer.
- **SVG export is hidden** in `Menu > Settlement > Export as` — two separate commenters
  hunted for it. A discoverability failure worth avoiding.
- **Azgaar's FMG passes `size = population / 1000`**, which a commenter demonstrates is
  wrong at small sizes (6 387 people → `size=6` → "a little overcrowded"); watabou's
  workaround is to set `size=` manually and he notes it can go outside the
  Small/Medium/Large range (his example uses `size=70`).
- **Practical ceiling:** a 0.11.0 commenter can't load a town of over 100 000 people
  (≈16 000 buildings).
- **Chrome-specific breakage** was reported by three users at 0.7.2 (worked in Edge).
- **CityJSON was suggested and considered**, then dropped in favour of a custom format.
- **STL export requested** for 3D printing; declined at the time ("this may change in the
  future"). OBJ export shipped instead and one user confirms successful 3D printing.
- **Procgen Mansion integration** requested three times across two posts; declined each
  time. "Procgen Mansion was initially created more or less for this purpose" — so the
  mansion generator was *designed* as a future MFCG building-detail supplier and never
  wired in.
- **City Viewer controls:** `~` toggles rotation (users repeatedly can't find tilde on
  non-US layouts), `2` switches to a pedestrian view that can also rise to a bird's-eye.
- **Import UX failed repeatedly:** four commenters could not drag-and-drop the JSON;
  watabou: "are you sure you are dropping the file on the generator itself, not somewhere
  else on the page containing it? … I'll try to implement a more obvious way to import
  maps, this one causes too much confusion."

---

## 6. Per-image inventory (what each image demonstrates)

| Image | Demonstrates |
|---|---|
| `91172/01.png` | 0.7.1 monochrome style. Wall as heavy polyline with vertex tower dots + gate bars; cross-shaped keep in a square citadel; pale-green river; plaza with centre dot; extramural ribbon sprawl; bold italic sans district labels + small italic micro-labels; 0/250/500 m scale bar. |
| `101529/01.png` | 0.7.2 full UI + colour palette. Sea with concentric echo contours; ladder-hatched piers; olive park "THE GREEN"; hatched farm fields; castle with round corner towers; 8-point rose labelled **E** (rotated map); chequered scale bar in metres; the pre-0.8.1 menu column listing all feature toggles. |
| `101529/02.png` | Scale-bar design #2 (`0.4 0.8 1.2 1.6 2km`, old-style figures, chequered) and a circled compass rose; coast echo contours at small scale. |
| `112574/01.png` | The GeoJSON export opened in geojson.io on a Mapbox basemap. Reveals the whole schema: `FeatureCollection`, a leading `properties.id:"values"` metadata feature with `roadWidth`/`towerRadius`/`wallThickness`/`riverWidth`/`version`, layer-named features (`"rivers"` as `MultiLineString`), coordinates near 20 E / 40 N. |
| `123268/01.png` | City Viewer 1.0.0. Extruded wall solid with cylindrical towers and clean gate gaps; flat-roofed prisms; flat field polygons; heavy distance fog; gradient sky. |
| `123268/02.png` | Near-top-down 3D. Olive ground, brown buildings with light side faces, tan roads, flat blue river, **white hexagonal citadel wall with cylindrical corner towers** and a dark keep, **rounded-corner** farm-field quads in strips. |
| `123268/03.png` | Low-angle dusk render — sun disc, fog gradient, silhouetted prism masses. Shows the viewer's "pedestrian" camera. |
| `124980/01.png` | City Viewer 1.0.1 at sunset: **gable roof ridges** now visible on every building; dense unwalled sprawl; one tall landmark block on the skyline. |
| `153064/01.png` | The definitive **landmarks/legend** reference. Numbered filled-circle district markers vs lettered white-circle **pin** landmark markers; two-part legend box; district fills in three different tones so wards are distinguishable without tints; citadel loop sharing a segment with the city wall; sea echo contours + piers; 0/100/200 m scale bar; rose labelled **W**. |
| `179534/01.png` | 0.8.0 lots close-up. **Non-convex (L/T/U/C) building footprints**, block courtyards, alleys, per-ward tone differences, `Raised` offset shadows, a wall crossing the river with tower dots. |
| `219273/01.png` | 0.8.1 full UI. **Colour scheme dialog with all 8 hex values**; Generate window (Features/Roads tabs and every checkbox); Settlement window with **buildings 286 / population ~1800**; the context menu; legend with numbered districts. |
| `228034/01.png` | 0.8.2 Armoria shield rendered loose on the map; 8-district legend; square wall towers; hatched fields at varying furrow angles; sea echo contours; plaza with centre dot. |
| `242933/01.png` | 0.8.3 **district tints**: Color scheme > Tints with `Method: Overlay`, `Strength: 50`; six districts in six random hues; **buildings 2702 / population ~17000**; yard-based chequered scale bar; coat of arms inside the legend box. |
| `334289/01.png` | 0.9.0 **Style > Buildings tab** — `Lots method: Twisted`, `Display mode: Lots`, `Processing: Offset`, `Filter lots`, `No outline`, `Raised`. Map shows lot-tiled wards with white alleys and empty courtyard lots; tinted districts incl. extramural ones. |
| `345262/01.png` | 0.9.1 **trees** as merged-circle blobs along streets, in greens and along field edges; hatched fields; cross-shaped keep in a white citadel; two-tier label sizing; no city wall. |
| `494237/01.png` | 0.9.2 near-monochrome style. Buildings randomly split between white and grey fills for texture; blue river with bridge labels; black landmark footprints; black-walled castle with white interior; trees; hatched fields; legend box with 40-200 m scale bar. |
| `576591/01.png` | 0.10.0-alpha. Strong per-district hue tinting (tan/salmon/yellow/orange/olive); thick two-tone blue river; grey-filled citadel enclosure with dark cross keep; dark-grey landmark buildings; courtyard blocks throughout. |
| `685971/01.png` | 0.10.1 in **No-outline** style — the alley network as the dominant graphic; per-building value jitter instead of strokes; dark-teal landmark blocks; trees as small multi-lobe blobs; hatched fields. |
| `698858/01.png` | A City Viewer **night** render (gable roofs, lit window dots, extruded wall with towers, tree polyhedra, flat field polygons). Note: this image does not obviously illustrate the "alleys view" the post is about — possible scrape/header mismatch; treat it as City-Viewer evidence, not alleys evidence. |
| `711706/01.png` | 0.11.0 **roof details** — ridge + hip lines on every footprint, branching on L-shapes, plus perpendicular shingle striations; line-art palette on white; cream wall band with square bastions; keep drawn with a hipped roof; pale-green rounded field polygons. |
| `715292/01.png` | 0.11.1 **straight-skeleton labels** — crimson letter-spaced caps with paper halo, curving along each crescent ward; label size tracks ward size; faint square grid overlay; Armoria shield; blue/teal/purple district tints; 100-500 m scale bar. |
| `780847/01.png` | 0.11.2. Hip/gable roofs in a warm orange palette; island wards in the river joined by bridges; cream wall band with square towers; navy flat river; piers; navy halo'd labels; a large grove inside the walls. |
| `817711/01.jpg` | 0.11.4 **forests** — irregular clearing containing the town, roads, fields and sprawl, with everything beyond drawn as solid forest behind a **scalloped canopy edge**; forest-coloured groves inside the clearing; two tributaries merging; cream wall band; 100-500 m chequered scale bar. |
| `823841/01.png` | The unreleased **extruded-with-hard-shadows** experiment: true prisms of varied height, near-white roofs, black cast shadows, roads reduced to hairlines, fields as pale rounded quads. |
| `880636/01.jpg` | Latest style in the slice: magenta buildings with roof ridges, dark-green scalloped forest, pale-blue river, tan field mosaic with tracks, tan castle enclosure with grey round towers, legend box with chequered scale bar and 7 numbered districts. |

---

## 7. Open questions a re-implementer must decide

1. **Seed placement for the Voronoi substrate** — distribution, count vs size, relaxation.
   Nothing in this slice says.
2. **What the other `Lots method` and `Processing` values are**, and whether the modern
   subdivision is still recursive OBB bisection or something new in 0.8.0/0.9.0.
3. **All numeric constants of lot subdivision** in the modern versions (min lot area,
   alley width, empty-lot probability, chaos parameters). Only the 2017 ancestor's values
   are available, and 0.8.0 explicitly replaced that algorithm.
4. **Whether the straight skeleton is exact or approximated**, and whether one skeleton
   implementation serves both roofs (0.11.0) and labels (0.11.1). Strongly suspected but
   not stated.
5. **The label-collision policy** and the rule that assigns major vs minor label tiers.
6. **River generation**: path model, source/mouth constraints (beyond "not both ends on
   the coast"), tributary rules, width law, and how the river cuts the ward partition.
7. **Coast generation**: outline model and how the echo-contour treatment was computed
   (offset polylines? repeated inward offsets at decreasing spacing?).
8. **Forest region derivation** — the influence-field reconstruction in §2.9 is an
   inference; the real construction is unstated.
9. **Framing algorithm** — "chooses a window more correctly" is all there is.
10. **Elevation** — both MFCG (`Apply elevation`) and City Viewer have it; no method,
    no parameters, and no image in this slice clearly shows it.
11. **Curved streets** — announced as the 0.8.0 goal, never claimed as delivered in any
    post in this slice. Did it ship? The 0.10.x+ maps do show gently curving
    intramural roads (`685971/01`, `715292/01`), which the 2017 ancestor does not.
    Whether that is "curved streets" or an emergent property of the new lot algorithm is
    unresolved here.
12. **Population constant** — is 6.29 exactly right, is it size-dependent outside the
    286-2702 building range, and does it vary by district type? Two samples only.
13. **How district hues are sampled** and whether adjacency repulsion is applied.
14. **Whether alleys are a derived centreline graph or filled negative-space polygons.**
15. **The compass-rose generative grammar.**
16. **The true release dates** — recoverable only from the live itch.io devlog pages or
    the Patreon archive, both outside this slice.
17. **0.11.3 is missing** from the worklist between `780847` (0.11.2) and `817711`
    (0.11.4). Either it had no devlog or it was not scraped; its contents are unknown.
18. **What the 0.8.0 Patreon post (`41711473`) actually says** about the new lots
    algorithm — it is the single highest-value unread source for this slice's biggest gap.
    Same for `61026228` (0.9.0 alleys), `101942512` (0.11.0 roofs), `102377277` and
    `straight-101173551` (0.11.1 labels/skeleton), and `114184619` (0.11.4 forests).

---

## Critic addendum (2026-09-21) — three items in this file that other available sources settle

**1. §2.19 population constant: 6.29 is refuted; ≈ 6.12–6.13 fits every sample.** `mfcg-posts-a.md` §T20 reads
two *further* Settlement panels (post 46685301 images 01–04): Goldfire Castle **856 buildings → ~5200** and
Whater **3423 → ~21000**. `856 × 6.29 = 5384`, which rounds to ~5400, not ~5200 — so "agreement to four
significant figures … rules out any nonlinearity" does not survive a third sample. With display rounding to two
significant figures the four readings constrain the ratio to the intersection of
`[1750,1850)/286`, `[5150,5250)/856`, `[20500,21500)/3423`, `[16500,17500)/2702` =
`[6.12, 6.47) ∩ [6.02, 6.13) ∩ [5.99, 6.28) ∩ [6.11, 6.48)` = **[6.12, 6.13)**. A single constant in that
interval reproduces all four (`286→1751→~1800`, `856→5243→~5200`, `3423→20966→~21000`,
`2702→16550→~17000`). `[INFERRED]` from `[SHOWN]` readings; it still assumes round-half-up to 2 s.f. A
per-ward-type occupancy would also fit, so treat "≈ 6.1 persons per building" as the pin, not 6.29.

**2. §2.16 Warp tools: three of the `[INFERRED]` tool semantics are contradicted by the creator's own
definitions** in Patreon post 40345972 (extracted in `mfcg-posts-a.md` §T4) and 79147510:
*Rotate* — "Rotate the whole map around its center" (not a swirl about the brush); *Equalize* — "Makes a single
cell more regular in shape equalizing its angles. Use it to automatically fix weird shapes" (a per-cell
regulariser, not a spacing redistributor); *Bloat* — "make individual cells or groups of cells larger";
*Relax* — "'Relaxes' the mesh, may be useful to fix too short mesh edges"; *Liquify* — "Basically the same as
Displace but softer"; *Pinch* (added 0.9.2) — "Its effect is opposite to the one of Bloat". All `[STATED]`.
The same two operations are what the live build applies automatically to the citadel cell
(`Castle.hx:60 "Bloating the citadel..."`, `Castle.hx:84 "Equalizing... <compactness>"`, `profile-mfcg.md`
§4.4b): the Warp tools are user-facing handles on the generator's own cell-repair primitives.

**3. §2.5 "Still UNKNOWN" for skeleton labels is mostly closed elsewhere.** The sentence truncated by the
paywall link is complete in Patreon post 102377277 (`mfcg-posts-b.md` §2.11): "…essentially it is about drawing
an area label along a 'ridge' of the area. Which ridge is most suitable for the purpose is not always obvious".
The skeleton is the creator's own O(n²) wavefront implementation (post 101173551, `watabou-extra-b.md` §T3), it
**is** the same one used for roofs, and the recorded call chain gives the pipeline:
`SkeletonBuilder.run → District.getRidge (getPath / getPath2Root) → annotations.Ridge.build →
Equator.build / largestSpan → PolyUtils.simplify = visvalingam → Cubic.smoothOpen (12 samples per segment) →
CurvedLabel` (`profile-mfcg.md` §6.2–6.3). What remains open is only the ridge-selection score and the font-size
rule.
