# MFCG Patreon posts — NEWER half (slice `mfcg-posts-b`)

Source: `research/patreon/watabou-city/<post_id>/post.md` (title, date, body, comment thread) and
`research/patreon/watabou-city/<post_id>/images/NN.(png|jpg)`.
Author of all posts: Oleg Dolya ("watabou"). Generator: **Medieval Fantasy City Generator (MFCG)**.

Coverage: all 15 directories in `worklists.json["watabou-city"][15:30]` read completely; all 80 image
files opened (75 unique; 5 are byte-identical duplicates of an image already opened —
`79147510/03`, `102377277/04`, `102377277/06`, `102377277/07`, `109852547/05`).
Post bodies were verified complete against `post.json → content_json_string`; comment threads
verified complete against `comments.json` (no comment text missing from `post.md`).

No captured JavaScript bundle was opened. Two bundle *filenames* appear below only because users
pasted browser stack traces into the comment threads (`TownGenerator.js` = MFCG,
`ToyTown2.js` = City Viewer).

Evidence tags: **[STATED]** creator describes the method · **[SHOWN]** visible in an image/recording,
not explained · **[INFERRED]** my reconstruction, reasoning given · **[NAMED-ONLY]** feature
announced, no method.

---

## 1. Chronological table

| # | Date | Post id | Title | What changed vs. the previous iteration |
|---|------|---------|-------|------------------------------------------|
| 1 | 2021-03-03 | 48290708 | MFCG 0.8.2: basic integration with Armoria | Only new feature: a random coat of arms from Azgaar's Armoria can be placed on a map. Announced-but-absent: importing a specific Armoria design by link, emblem placement options (legend / map corner), emblem tinting toward "map colour". |
| 2 | 2021-04-15 | 50057173 | MFCG 0.8.3: assorted improvements | Fixed the crash bug that made **"improved lots"** (introduced 0.8.0) unusable; now recommended. Armoria: *Customize* (assign a specific design) + emblem embedded in the legend. **"Watercolours" renamed "tints"**, with method (*Spectrum / Brightness / Overlay*) and *Strength* parameters. Exported JSON now carries district descriptions. Unspecified streets/blocks/buildings improvements. UI: collapsible tool windows. |
| 3 | 2021-08-10 | 54745111 | WIP and updates | Mostly Perilous Shores (PS). Relevant to MFCG: **PS→MFCG integration** — click a town on a region map to open it in MFCG. PS gets a *universal* SVG-export method (no text, no gradients). MFCG hotfix for immovable windows. |
| 4 | 2022-01-11 | 61026228 | MFCG 0.9.0: new alleys and buildings | **Alleys switch from plain recursive bisection of a patch to "twisted bisection"** (imported from Neighbourhood Generator). Alleys widened. Lots: `Improved lots` checkbox → **`Lots method` = Bisection / Voronoi / Twisted**. `Tight` checkbox → **`Processing` = None / Shrink / Offset**. `No triangles` → `Filter lots`. New **half-towers ("Open")**. Option not to outline roads (unoutlined roads become dashed when hatching is on). SVG export rewritten (only hatching unsupported). Permalinks reworked. Stated next goal: rewrite the **river/coast system**. |
| 5 | 2022-02-09 | 62336213 | MFCG 0.9.1: trees and other visual changes | **Trees** added (greens, block courtyards, occasionally between farm fields) with their own colour; exported in JSON. Per-text-role **fonts** (Title, Labels, Legend, Pins, Elements) in a new *Text* tab. **Weathered roofs** (per-roof colour jitter; `Weathering` per colour scheme). New *Outline* tab (+ outline water, outline trees). New **separate wall colour**. New `Natural` preset; `Blueprint` removed; `Default`/`Night` retuned. SVG crop fixed. **Farm fields spawned differently to hide sawtooth borders.** `Simplified water` removed. |
| 6 | 2023-02-24 | 79147510 | MFCG 0.9.2: assorted new features and improvements | Any building openable in **Procgen Mansion**. Warp gets **`Pinch`** (inverse of `Bloat`). New **`Solids`** option (citadel/temple/churches painted in the wall colour). **More churches** spawned. `Night` preset removed, `B&W` made truly black-and-white, `Medium` colour removed, `Light` renamed **`Compass`**. **`Hatching` removed.** Trees "fluffier and a little smaller", **placed by a different much faster method** (side effect: more of them). **Much fewer secondary plazas.** Map labels improved using ideas from Perilous Shores. `export=` fixed. New keyboard shortcuts. Creator flags the codebase as aging ("rewrite from scratch, or … thorough refactoring"). |
| 7 | 2023-08-18 | 87882877 | MFCG 0.10.0-**alpha** | The structural change of this era: **patches are merged into districts and streets are built district-wide** instead of per-patch, so the underlying cells stop being visible. Published only at a separate URL because it is unstable. Also: much better **smoothing** of coast/walls/roads; **improved outskirts filtering**; **cities made larger** (Medium = 20–40 patches, was 12–25); **local churches more reliable**; **better framing/cropping**; new `modern` preset. Failure modes documented in detail (below). |
| 8 | 2024-02-21 | 98918904 | MFCG 0.10.1 | No new features; stabilises 0.10.0-alpha and promotes it to main. Freezes gone; rare crashes; the "empty area where there shouldn't be one" glitch remains (reroll with ctrl+click). **Shapes of curved alleys and district borders improved** — stated to both look more organic *and* reduce glitches. Roadmap: land/water configurations, wide rivers, better coasts, then farms/districts/walls/harbours/castles. |
| 9 | 2024-03-16 | 100431269 | MFCG 0.10.2: alleys view | **Alleys can be drawn explicitly** (`Show alleys`, key **A**); exported in JSON. `Display mode: Hidden` (key **B**) hides all regular + farm houses but not citadel/temple/walls, to give a pure street map. `Farms` moved out of *Generate*: **fields are now always generated** and only hidden by style; new option to draw fields as **solid shapes** instead of furrows. Trees smaller/more irregular, **now drawn with the Neighbourhood Generator algorithm with fewer details**. City and district **name generation reworked** (simpler code). |
| 10 | 2024-04-08 | 101942512 | MFCG 0.11.0: roof details and district view | **`Roofs` = Plain / Hip / Gable, built on straight skeletons** (method explained in the separate "straight skeleton" post 101173551, outside this slice). Hip/gable interact with `Raised` (drawn as if viewed from slightly lower); gable+raised looks like greenhouses (known, unfixed). **District View** (shift-click / context-menu *Zoom in*) — a district fills the viewport, everything else hidden, district border drawn as a thick semi-transparent dashed line. `Equalize` tool improved (fixes plaza and castle shapes). `Towers: Bastions` and `Water isolines` removed. Key **N** = thin lines. |
| 11 | 2024-04-15 | 102377277 | MFCG 0.11.1: improved map labels | **Curved labels rewritten**: from the creator's own heuristic to a "widely used" algorithm that **draws an area label along a "ridge" of the area's straight skeleton**. Low-level fixes for letter spacing and text outlining. New `labels` colour; `compass` colour renamed **`elements`** (now also scale bar + legend). New **`grid`** element, sized from the current scale (key **D**). **Removed: `Lots method`, `Filter lots`, `Display mode: Simple`, `Processing: Shrink`.** Farm fields and city/castle walls can now be outlined. |
| 12 | 2024-08-12 | 109852547 | MFCG 0.11.2: small improvements and bug fixes | Numerous tweaks mostly to **rivers and coastlines** — affecting bridges, piers, water gates and overall water shape. **Bays generated differently and more diverse; "headlands" (inverted bays) no longer occur** (called ugly; to be reintroduced better later). MFCG gets its own **styles page** (`watabou.github.io/city_styles.html`), 9 colour schemes of which 6 are the standard presets. |
| 13 | 2024-10-18 | 114184619 | MFCG 0.11.4: forests | **Forests**, the oldest outstanding request (since the 2017 first release). Off by default (`Style > Misc > Show forests`). When on, they **fill all space not occupied by city, farmland or water**. Roads deliberately run **over** the forest rather than pushing it apart. Known flaw: on large maps forest edges look too straight. (0.11.3 is not in this slice.) |
| 14 | 2024-10-28 | 114858238 | Experiments | Unreleased R&D: non-uniform **higher buildings** (required implementing **z-sorting**), hard wall shading + **ground shadows**, **shaded roofs** as filled polygons with back-face culling, **roof hatching**, plus "town on a hill" and "city in the night". The "military projection" branch is **rejected** for readability, speed ("10x more polygons") and because walls/trees are hard to draw raised. Intends to ship **shaded roofs + ground shadows** on the normal top-down map eventually. |
| 15 | 2025-02-03 | 121415691 | Three generators updated (Dwellings, VG, MFCG) | MFCG: only the **forest export bug** fixed — "the fix is based on some assumptions which I can't really verify"; **a map with forests is now exported at a lower PNG resolution** than the same map without, the difference depending on several parameters; SVG export recommended as the fallback. |

---

## 2. Techniques

### 2.1 The overall pipeline (patches → city → wards → blocks → lots)

**[STATED]** — 87882877, "Long story":

> "first, the map is partitioned into cells, which I call **patches**. Then, a few central patches are
> marked as *city*. Most of the city patches become *regular* patches, and these regular patches are
> cut into city blocks, and those cuts become streets."

and the crucial provenance note: *"I've described the process before and it hasn't changed much since
[the very first version](https://imgur.com/a/5DxQK) of the generator."* — i.e. the 2017
TownGeneratorOS pipeline is still the skeleton in 2023.

- **Problem solved:** produce a plausible medieval street layout with recognisable wards.
- **Data structures (recoverable):** a planar partition into convex-ish cells ("patches"); a
  city/non-city flag per patch; a ward type per city patch (most are "regular"); per-patch block
  subdivision; per-block lot subdivision.
- **Two distinct road classes** — **[STATED]** 87882877 and 100431269:
  - **Main/major roads**: "radiating from the centre of the city to the edges of a map", explicitly
    described as having "a completely different nature" from alleys. They are *not* produced by the
    block subdivision.
  - **Alleys** (minor roads): the cuts created when a patch/district is subdivided into blocks.
    **[STATED]** 100431269: "there are two types of alleys which are quite different from each
    other" — the difference is not explained anywhere in this slice. **UNKNOWN.**
- **Parameters:** `size` = the number of cells/patches — **[STATED]** 121415691 comment:
  *"The 'size' parameter determines the number of 'cells' with each cell divided into blocks and
  subsequently individual buildings."* Medium city ≈ **1000–2000 buildings**; **[STATED]** 87882877:
  Medium = **20–40 patches** in 0.10.0 (previously **12–25**).
- **Population coupling [SHOWN]** 50057173/01–02 (UI screenshot): *Number of buildings: 2702,
  Population: ~17000* → **≈6.3 inhabitants per building**. The URL in a 61026228 comment carries
  `size=46&population=28444`, so population is an independent URL field, not derived at load time.
- **UNKNOWN for a re-implementer:** how patches are generated (Voronoi from jittered seeds vs.
  something else) is *never* stated in this slice; the 2017 ancestor is the only evidence source.
  Also unknown: the rule that picks which central patches become "city", and how ward types other
  than "regular" (castle, market, docks, slums…) are assigned.

### 2.2 District-wide street construction (patch merging) — the headline change of 0.10.0

**[STATED]** — 87882877:

> "What I have been planning to try for a long time is to **merge patches and build streets
> district-wide**. And it worked! This change makes cells almost invisible and often there is an
> illusion of streets following some kind of underlying landscape. **There is no underlying landscape
> of course, it's just 'twisted bisection' propagating properties of the outer shape inside.**"

- **Problem solved:** in the old scheme "this original cells are clearly visible on the map. There
  are no long roads running through a whole district, every street is contained within its patch."
- **Algorithm (as far as recoverable):** union adjacent same-district patches into one polygon, then
  run the recursive twisted bisection on that *merged* polygon, so cut lines can cross former patch
  boundaries. The emergent "landscape" effect is explicitly attributed to the bisection inheriting
  the orientation/curvature of the enclosing boundary and carrying it inward.
- **Cost:** "Refactoring took much time… most problems of this version are caused by the old code,
  not the new one."
- **[SHOWN]** 87882877/04 (hi-res, display mode showing blocks as solid polygons): streets run in
  long continuous curved runs right across the walled area, with blocks as irregular convex
  quads/pentagons and many blocks carrying an interior courtyard void. 100431269/03 and /06 (street
  map with buildings hidden) show the resulting network as a **connected planar mesh**: locally a
  deformed quad grid whose orientation rotates slowly across a district, with T- and Y-junctions
  dominating, few dead ends inside the core, and short stub ends only at the urban fringe.
- **[INFERRED]** The merged district polygon is markedly concave (it is a union of cells clipped by
  walls/river/coast), which is exactly the input class the creator says breaks the bisection — see
  2.3. That is the causal link between this feature and the alpha's instability.

### 2.3 "Twisted bisection" — the block/lot subdivision primitive

**[STATED]** — 61026228 (adoption) and 87882877 (properties and failure modes). The method itself is
described in post **49191011** (outside this slice; 87882877 links it as "simple enough").

- 61026228: *"Alleys used to be generated by **simple recursive bisection of map cells**. Now they are
  created using **'twisted bisection'** (I need to come up with a better name for it) like in the
  Neighbourhood Generator."* The effect is muted in MFCG because "processed areas" are small.
- 87882877: *"The idea of twisted bisection is simple enough, but my implementation of it is not. For
  **complex concave shapes** it often produces far from perfect results and such defects as
  **collapsed or intersecting edges** can easily break it completely."*
- **What it buys:** curved rather than straight cut lines; propagation of the outer boundary's shape
  inward; visually "organic" alleys and lot rows.
- **Same primitive is used twice** — for alleys (block cutting) and for lots (`Lots method: Twisted`).
- **Known failure modes and handling [STATED]** 87882877:
  1. *Empty areas where they clearly shouldn't be, e.g. inside city walls* → user-level recovery:
     reroll that area via the context menu or **shift-click** it.
  2. *Generator not responding* — "the script has broken while doing the generation", i.e. an
     exception escapes; the app survives, press **Enter** to generate a new map.
  3. *Browser not responding* — the worst case, an unbounded loop; kill the tab/browser.
  In 0.10.1 (98918904): freezes gone, crashes "very occasional", the empty-area glitch remains and is
  "hard to fix"; recovery moved to **ctrl+click** to reroll the corrupted part.
- **Implementation hint [SHOWN]** — 61026228 comment thread, user Daniel with a reproducing permalink:
  `Uncaught TypeError: Cannot read properties of null (reading '0')` in `TownGenerator.js`, and
  *"the variable **`rect`** ends up null"* in the twisted+complex+offset path. **[INFERRED]** the
  twisted-lot routine derives a **rectangle (oriented/minimum-area bounding box) per polygon** and
  indexes its corner array; degenerate polygons (zero area, collinear or self-touching rings — i.e.
  the "collapsed or intersecting edges" the creator names) make that rectangle undefined. A
  re-implementer must define behaviour for degenerate sub-polygons explicitly (discard, or fall back
  to a non-twisted cut).
- **Mitigation shipped in 0.10.1 [STATED]** 98918904: *"a few improvements to the shapes of curved
  alleys and district borders. These should make alleys look more organic and at the same time reduce
  the number of glitches."* — i.e. the geometric smoothing of the input boundary is itself a
  robustness measure, not only a cosmetic one.
- **UNKNOWN:** the actual twist construction (where the cut's control points come from, how curvature
  is derived from the boundary, the recursion stop condition, min area/aspect thresholds).

### 2.4 Lot (building footprint) methods

**[STATED]** — 61026228, dropdown `Lots method`:
- **Bisection** — the original recursive halving. Creator later: *"Bisection was obviously inferior
  comparing to Voronoi and Twisted"* (102377277 comment).
- **Voronoi** — a Voronoi partition of the block.
- **Twisted** — the NG method; *"Occasionally it produces weirdly looking shapes, but for my taste
  this method is currently the best-looking-on-average one."*

**`Processing`** (post-pass over generated lots) — **[STATED]** 61026228:
- `None` — leave lots as they are.
- `Shrink` — make lots a bit smaller (equivalent to unchecking the old `Tight` checkbox); i.e. an
  inward **polygon offset** per lot leaving a gap between neighbours. Removed in 0.11.1.
- `Offset` — *"shifts the front side of every lot to make lines of facades uneven"*; "works best with
  the new 'twisted' lots". **[INFERRED]** the "front side" is the lot edge adjacent to the street, so
  each lot needs a known street-facing edge; the shift is along that edge's normal by a small random
  amount, breaking the straight facade line of a row.

**`Filter lots`** — renamed from `No triangles`, *"because now it works differently depending on the
selected lots method, not only filters out triangles"* (61026228). Removed in 0.11.1.

**Display-mode coupling [STATED]** 61026228 comment (creator): *"I do think that 'voronoi' works
better with 'simple' and 'twisted' works better with 'lots' and to highlight these combinations the
generator auto-switches the display mode."* He calls the whole *Buildings* tab overpopulated and
admits no single combination is best — which is why 0.11.1 deleted `Lots method`, `Filter lots`,
`Display mode: Simple` and `Processing: Shrink` outright. A user (sb.works) protested the loss of the
Voronoi+Simple and Bisection+Simple+Shrink+Filter combinations; the creator said he would consider
restoring them.

**Display modes seen:** `Lots`, `Simple` (removed), `Blocks` (**[SHOWN]** 87882877/04 — blocks drawn
as one filled polygon each, with courtyard holes and no internal lot lines), `Hidden` (0.10.2).

### 2.5 Block morphology — perimeter blocks with courtyards

**[SHOWN]** — 61026228/03–04 (`Twisted` + `Offset` + `Filter lots`), 87882877/02 & /04,
98918904/02, 100431269/04, 109852547/04, 121415691/06.

Blocks are consistently rendered as a **ring of lots around an empty interior** (a "donut"): buildings
line the block perimeter facing the alleys, and a void of ground colour remains in the middle. Those
voids are exactly what the trees feature later fills — **[STATED]** 62336213: trees go "in empty
spaces inside blocks (**shared courtyards**)".

**[INFERRED]** the lot generator subdivides only a boundary band of each block (an inward offset of
the block polygon defines the courtyard), rather than partitioning the block's whole area. Evidence:
courtyard voids are present in *every* colour scheme and every version from 0.9.0 onward, their width
scales with block size, and small blocks have no courtyard at all — consistent with "offset inward by
a fixed depth; if the remainder is non-empty it is the yard".

### 2.6 Outskirts filtering

**[STATED]** — 87882877: *"**Improved outskirts filtering.** To make city outskirts look less
urbanized, the generator decreases the **density of streets** there, while keeping the **density of
buildings along those streets** relatively high."*

- **Problem solved:** a uniform subdivision makes suburbs look as urban as the core.
- **[SHOWN]** 98918904/02, 114184619/04, 114858238/09, 121415691/06: outside the core the pattern
  degrades to long **ribbon development** — single or double rows of buildings strung along radial
  roads with large empty wedges between them, thinning with distance until only isolated farm
  buildings remain.
- **[INFERRED]** two separate knobs: (a) probability/recursion-depth of the block subdivision falls
  with distance from the centre (or with a per-patch "urban density" attribute), (b) lots along the
  surviving street frontages keep full occupancy. This is a *filter* (as named), i.e. generated
  streets are discarded rather than never created.

### 2.7 Smoothing of coast, walls, roads and district borders

**[STATED]** — 87882877: *"Things like the coast, city walls etc are much better smoothed now. It's
especially noticeable with roads, which looked too jagged within city limits before."*
**[STATED]** — 98918904: *"improvements to the shapes of curved alleys and district borders."*

- **[SHOWN]** 109852547/04, 121415691/06: walls are smooth polylines with a large turning radius
  between tower nodes; roads inside the city are smooth curves, not chains of straight segments;
  district borders are smooth.
- **[INFERRED]** a curve-smoothing pass (Chaikin-style corner cutting or a spline resample) applied to
  the polylines *after* topology is fixed. The creator never names the method. Note that in 0.9.0
  (61026228/03–04) walls are visibly polygonal with sharp vertices; by 109852547/04 they are not.

### 2.8 Roads: main roads, gates, bridges, and their continuation outside the map

- **[SHOWN]** in nearly every map: main roads leave the city through **gates** in the wall and
  continue to the map edge, where they simply terminate at the crop boundary.
- **[STATED]** 79147510 comment (creator, on aligning MFCG roads with Perilous Shores region roads):
  *"Around coastal towns roads do run correctly (more or less) because towns are **oriented correctly
  relative to the coast** (again, more or less). For **inland settlements it doesn't work** and maybe
  I'll fix it one day."* — i.e. the map's global orientation is derived from the water when water
  exists, and is otherwise arbitrary; outgoing road bearings are not reconciled with a parent region
  map.
- **URL parameter `gates=-1`** (61026228 comment permalink) — **[INFERRED]** gate count with `-1`
  meaning "auto/unspecified".
- **Bridges** are first-class named features: **[SHOWN]** 79147510/01 labels "DARKBRIDGE" and "OLD
  CROSSING" at two river crossings; 114184619/02–03 labels "FOOLSBRIDGE"; 121415691/03 & /06 list
  "Greenbridge" and "Winebridge" **in the numbered legend** with pins placed on the river.
- **[STATED]** 109852547: the river/coast rework "affected **bridges, piers, water gates** and their
  overall shape".

### 2.9 Alleys drawn explicitly (0.10.2)

**[STATED]** — 100431269:

> "before this update, only major roads were drawn explicitly, and **alleys existed only as empty
> spaces separating rows of houses**. … Technically, it was easy, but there were nuances which needed
> to be taken care of. As a result, **alleys don't look exactly like major roads** and the way they
> are drawn may change in the future."

- This is a *rendering* change, not a generation change: the alley graph already existed as the block
  cut lines; 0.10.2 renders it as ribbons.
- Off by default, key **A**; when on, alleys are added to the exported JSON and appear in City Viewer.
- **[SHOWN]** 100431269/03 — a pure street map (`Display mode: Hidden` + alleys on). This is the
  single most informative image in the slice for street topology: alleys form a fully connected mesh
  with mostly 3-valent nodes, block areas within roughly one order of magnitude of each other, alley
  width uniform and narrower than main roads, and no alley crossing the river except at bridges.

### 2.10 Roofs from straight skeletons (0.11.0)

**[STATED]** — 101942512 (detailed derivation is in post 101173551, outside this slice):
`Style > Buildings > Roofs` = **Plain / Hip / Gable**. "The *Hip* and *Gable* options make the
generation a little slower, but on my laptop the difference is not visible to the naked eye."

- Interaction with **`Raised`**: *"the roof details are drawn as if we look at them from a slightly
  lower position, not exactly top-down."* Known flaw, unfixed: *"In case of gable roofs, the
  implementation is flawed: when examined closely, the buildings look like **greenhouses**."*
- **[SHOWN]** 101942512/04 and especially /06 (district view, hi-res): each footprint carries interior
  lines consistent with a **straight skeleton** — a central ridge with hip lines running out to the
  footprint corners on hipped roofs; long footprints sliced transversely into a row of gabled bays.
  In 0.11.0 these are **line work only** ("wireframes"), not filled faces — confirmed by 114858238
  which proposes filling them as the *next* step.
- **[INFERRED]** the gable variant is produced by choosing a dominant ridge direction (likely the
  longest skeleton edge / the OBB long axis) and emitting eave+ridge lines perpendicular to it, rather
  than by offsetting the full skeleton; this is why "raised" gables read as glazed boxes — the gable
  end triangles are drawn where a solid wall should occlude them.

### 2.11 Curved map labels from the straight-skeleton ridge (0.11.1)

**[STATED]** — 102377277:

> "The previous algorithm was **my own invention** and it worked surprisingly well considering how
> random were the assumptions it was built on. Otherwise it wasn't great — labels often **went beyond
> the borders of their areas** and occasionally they were **bent in the opposite direction** to what
> one would expect. … The new algorithm is a **widely used one (unfortunately, I don't know its name)**
> and it's much more reliable. It's based on the idea of **straight skeleton** and essentially it is
> about **drawing an area label along a 'ridge' of the area**. **Which ridge is most suitable for the
> purpose is not always obvious**, so this can be implemented in different ways."

- **Problem solved:** placing a district name inside an arbitrary concave polygon so it stays inside
  and bends the "right" way.
- Paired with "a set of small low-level improvements" addressing **incorrect letter spacing** and
  **text-outlining glitches** — both had been fixed unsuccessfully more than once before.
- **[SHOWN]** 102377277/03 (hi-res): labels follow smooth arcs that hug the district's long axis;
  glyphs are individually rotated along the path; label *size scales with district size*; a narrow
  district ("UPPER DISTRICT") gets a small, nearly vertical label. 62336213/04 and 79147510/01 show
  the *earlier* algorithm for comparison — flatter arcs, and small districts labelled horizontally
  with a leading dot marker instead of being fitted to the shape.
- **[STATED]** the creator planned to transplant the same labels to Perilous Shores.
- **UNKNOWN:** the ridge-selection rule (longest skeleton path? the path maximising clearance?), and
  how the text is fitted (arc-length parametrisation, per-glyph tangent).

### 2.12 District View (0.11.0)

**[STATED]** — 101942512: *"Instead of implementing a **real zoom** feature (which is **too difficult
for a specific technical reason**) and integration with the Neighbourhood Generator (which is doable,
but complicated for a number of reasons), I've added something in between."*

- Right-click → *Zoom in*, or shift-click a district; shift-click again / *Zoom out* to leave.
- The district fills the viewing area, everything outside is hidden.
- All interactions still work inside it (reroll, warp, style options, PNG/SVG export). **`Export as
  JSON` still exports the whole city.**
- *"everything is drawn **exactly in the same way** as in the 'city view'. So there are no cupolas,
  shadows, cobbled roads or any other niceties of NG."*
- Known weakness: *"District view often looks disjointed with pieces of rivers, roads, city walls. To
  make it more whole, the **district border is drawn explicitly as a thick semi-transparent dashed
  line**. I'm not sure it's a good solution."*
- **[SHOWN]** 101942512/03 and /06: the dashed border is drawn *over* water and walls alike; the scale
  bar rescales to 20–100 m.
- **[INFERRED]** "too difficult for a specific technical reason" + "drawn exactly the same way" ⇒ the
  renderer emits geometry at a fixed world-to-pixel scale chosen at generation time (line widths,
  hatch pitch, roof detail thresholds and text sizes are baked to that scale), so a continuous zoom
  would desynchronise them; district view sidesteps this by re-fitting the viewport to a sub-polygon
  and re-rendering, not by scaling a finished picture. Note the corollary **[SHOWN]** in 101942512/06:
  building roof details are *not* more detailed in district view than in city view.

### 2.13 Trees

Three distinct generations in this slice:

1. **0.9.1 introduction [STATED]** 62336213: trees appear "in **city greens**, in **empty spaces
   inside blocks (shared courtyards)**, occasionally **between farm fields**". Explicit goal: *"to make
   city maps look a bit like zoomed out neighbourhood maps"*. Drawn "much simpler than in the
   Neighbourhood and Village generators" because they are much smaller relative to the map. Off by
   default (`Style > Misc > Show trees`); own colour (`Color scheme > Additional > Trees`); exported in
   JSON. **No density control**, deliberately: *"there are too few of them to provide an option to
   spawn even fewer and there is not enough space to spawn more."*
2. **0.9.2 [STATED]** 79147510: *"Trees were made fluffier and a little smaller. **I use a different,
   much faster way to place them now.** The side effect is that there seems to be more of them
   spawned."* — a placement-algorithm swap whose side effect on count was accepted rather than
   corrected. **[INFERRED]** the earlier method was a rejection/Poisson-disc-style sampler with
   per-candidate collision tests against buildings; the replacement is cheaper and less strict about
   spacing, which is what "seems to be more of them" means.
3. **0.10.2 [STATED]** 100431269: *"Trees have been made smaller and more irregular in shape. They are
   now drawn using the **same algorithm as in Neighbourhood Generator**, but with fewer details."*

**[SHOWN]** 62336213/04, 109852547/04, 121415691/06: a "tree" is a small irregular lobed blob with a
darker outline; they appear in tight clusters (several overlapping blobs) rather than evenly spread,
and cluster along **field boundaries as hedgerows** (chains of blobs following a field edge) and
around the city green. In 114858238/13 trees also carry a ground shadow.

### 2.14 Forests (0.11.4)

**[STATED]** — 114184619:

- Longest-standing request: asked for since the **2017** first release, when *"these cities were barely
  more than **stylized Voronoi diagrams**"* (a rare direct statement about the original patch method).
- Historical objection dropped on "fantasy" grounds; second, aesthetic justification: *"forests fill
  empty spaces around cities nicely (they look better than farmland), so they can be treated as **a
  sort of frame**."*
- Off by default (`Style > Misc > Show forests`).
- **Coverage rule:** *"When enabled, forests fill **all available space (i.e. not occupied by the
  city, farmland or water)** on the map."* — a complement operation, not a growth/seeded simulation.
- **Roads:** *"I was originally going to let roads push the forest apart. In the end I decided that
  **roads going 'under' the forest** looked better."* — a pure draw-order decision; roads are painted
  over the forest mass.
- **Known flaw:** *"on large maps **forest edges look too straight** and not great overall."*
- **[SHOWN]** 114184619/01,/02,/04 and 121415691/06: the forest is a **flat single-colour mass** whose
  boundary is decorated with a **scalloped edge of small overlapping circular lobes** (cumulus-like).
  The cleared interior follows the city+farmland footprint at a visible standoff distance, so the
  clearing is an **offset/dilation** of the occupied area, not a tight hull — which is precisely why
  long straight boundary runs appear on large maps where the offset distance dominates local detail.
  The same scalloped-blob edge treatment is used for forests in Perilous Shores (54745111/02, /06).
- **Export defect [STATED]** 121415691: forests broke PNG export; the fix is speculative
  (*"based on some assumptions which I can't really verify"*) and costs resolution — *"A map with
  forests enabled is now **exported at a lower resolution** than the same map without forests, and the
  difference depends on several parameters."* SVG export is the recommended workaround.
  **[INFERRED]** the forest layer is rasterised (or filtered/blurred) rather than emitted as vectors,
  and its bitmap blows a texture/canvas size limit at high export scales, forcing a scale reduction.

### 2.15 Farm fields

- **[STATED]** 62336213: *"Farm fields are spawned a bit differently to make **sawtooths of farmland
  borders** less visible."* — an artefact where the outer boundary of the farmland ring showed the
  underlying cell edges as a zigzag.
- **[STATED]** 100431269: the `Farms` toggle is removed from *Generate*; **fields are always generated**
  and only hidden by style (`Style > Misc > Farm fields`); new option to draw fields as **solid shapes**
  instead of sets of **furrows**.
- **[STATED]** 102377277: farm fields can now be **outlined**.
- **[SHOWN]** 48290708/02, 62336213/04 (furrows) vs 102377277/05, 109852547/04, 121415691/06 (solid):
  fields form an irregular quadrilateral patchwork separated by narrow ground-coloured lanes, each
  field's furrow direction independent of its neighbours; tiny isolated farm buildings sit inside or
  beside fields; hedgerow tree-chains follow some field borders. The patchwork tiles the annulus
  between the built-up edge and the forest/map edge, and is clipped by roads and water.
- **URL parameter** `farms=1` (61026228 comment permalink).

### 2.16 Water: coasts, rivers, bays, piers, water gates

- **[STATED]** 61026228 "What's next": *"The next big thing I'd like to improve in this generator is
  the **river/coast system**. It hasn't been updated for a long time and it looks pretty dated and
  primitive even comparing to Village Generator. My goal will be to make the generator capable of
  building a city on **any land-water configuration including one or more islands, confluence of
  rivers** etc. It's a big task, so first I'll probably need to make a **prototype**, maybe even more
  than one."* — stated in Jan 2022; still unshipped as of the end of this slice.
- **[STATED]** 98918904: the 0.10.x street rework was justified partly as the enabler: *"the changes
  made in this version make it possible (or much easier) to implement … more diverse land/water
  configurations. People have been asking for **river confluences and islands** for a long time,
  however for me personally the most important thing would be **more interesting coasts and wide
  rivers**."*
- **[STATED]** 109852547: *"most (but not all) of them related to rivers and coastlines (they affected
  **bridges, piers, water gates** and their overall shape, among other things). It is not very obvious,
  but **bays are generated differently now and they're a bit more diverse**. The downside of this
  change is that **'headlands' (inverted bays) no longer happen**. I don't think it's a huge loss,
  because those headlands were ugly. I am going to reintroduce them later and better."*
- **[STATED]** 61026228 comment, user Daniel: *"The existing bays always seem unusually narrow."*
- **[STATED]** 101942512 comment (2026-05-05), asked whether a city can sit on an island entirely
  surrounded by water with docks all round: *"**No, but something like that is next on my list.**"*
- **[SHOWN]** islands *do* occur as sub-features: 109852547/04 has a bay islet carrying two named
  districts (MISTY WATER, HARBOUR WARD) joined to the mainland by two bridges; 114184619/02–03 has a
  river islet district ("MERCHANTS DISTRICT"/"TWIN BROOKS" between braided channels). So island
  *districts* exist while an island *city* does not.
- **[SHOWN]** water rendering: a filled band with a single dark outline; **piers** are groups of 2–5
  short parallel lines perpendicular to the shore (48290708/02, 109852547/04, 114184619/04,
  114858238/12); a gap in the city wall where the river passes is a **water gate** (87882877/02,/04).
- **`Water isolines`** — **[SHOWN]** 48290708/02 and 61026228/05: 4–5 concentric contour lines offset
  inward from the shoreline inside the water body, an inward polygon-offset cascade. Removed in
  0.11.0 (**[STATED]** 101942512).
- **URL parameters:** `coast=1`, `river=1`, `sea=0.09` (61026228 comment permalink).
  **[INFERRED]** `sea` is a fractional coverage/height for the water body given its continuous value.

### 2.17 City walls, towers, castle/citadel

- **[STATED]** 61026228: a new tower type, **half-towers ("Open")**. **[SHOWN]** 61026228/05: the
  castle ring carries round filled dots at some corners and small squares at others.
- **[STATED]** 101942512: `Towers: Bastions` removed.
- **[STATED]** 62336213: a **separate wall colour** was added; advice for custom schemes — *"make walls
  at least slightly lighter than the 'Dark' colour."*
- **[STATED]** 102377277: city and castle walls can be outlined (`Style > Outline`).
- **[STATED]** 79147510: `Solids` draws citadel, temple and churches in the wall colour.
- **[SHOWN]** the wall is a closed smooth polyline with **towers at its vertices** (filled circles in
  most schemes; cream squares straddling the wall band in 109852547/04 and 114858238/13) and **gates**
  rendered as wider blocks where a main road crosses. The wall terminates at water rather than
  crossing it.
- **[SHOWN]** the **castle/citadel** is a *separate* walled enclosure with its own towers, either
  tangent to the city wall (61026228/03, 109852547/04), free-standing inside the fabric (114858238/05,
  121415691/06) or on the shore (114184619/04). It contains a ward (open ground) plus a keep drawn as
  a cruciform or irregular block, and it gets its own label ("CASTLE", "CITADEL") or legend entry
  ("Castle District").
- **URL parameters:** `walls=1`, `citadel=1`, `urban_castle=0` (61026228 comment permalink) — so the
  citadel and an "urban castle" are distinct switches. **[INFERRED]** `urban_castle` places the castle
  inside the built-up fabric instead of on the perimeter.
- **[STATED]** 101942512: the `Equalize` tool is "useful for fixing shapes of **plazas and castles**"
  — i.e. both are polygons that can come out badly proportioned and there is a manual regularisation
  operator for them.

### 2.18 Plazas, temple, churches

- **[STATED]** 79147510 on churches: *"they are relatively large buildings (**larger than regular ones,
  but usually smaller than the Temple**) and **each of them has a small square next to it**."* 0.9.2
  spawns more of them.
- **[STATED]** 87882877: *"**'Local churches' are generated more reliably now** meaning that there are
  more of them and they **don't tend to disappear after rerolling a ward**."* — evidence that ward
  rerolling regenerates the ward's contents and had been losing attached point features.
- **[STATED]** 79147510: *"**Much fewer secondary plazas** are generated. They look ugly and maybe I
  should remove them completely."*
- **[SHOWN]** the main plaza is a light polygon at the convergence of main roads with a **single tiny
  dot** at its centre (a monument/well glyph); churches appear as small dark quadrilaterals each
  abutting a small light square; the temple is a larger cruciform building sitting on its own light
  plot (62336213/04, 79147510/01, 102377277/03).
- **URL parameters:** `plaza=1`, `temple=0`, `greens=0`, `shantytown=1` (61026228 comment permalink).

### 2.19 Colour system: tints and weathering

- **[STATED]** 50057173: *"Tints is a new name for 'watercolours'. In the 'Color scheme' dialog you can
  now specify **how tints … are derived from a basic colour**. There are three different methods —
  ***Spectrum*, *Brightness* and *Overlay*** — and a ***Strength*** parameter to define how pronounced
  the effect should be."* Intended to generalise beyond districts later.
  **[SHOWN]** 50057173/02: `Method: Overlay`, `Strength(%) 50`.
  **[INFERRED]** *Spectrum* rotates hue around the base colour, *Brightness* varies lightness only,
  *Overlay* composites the base over a per-district hue with the overlay blend; `Strength` is the
  interpolation weight. Districts are assigned distinguishable tints so adjacent wards read apart.
- **[STATED]** 62336213 **weathered roofs**: *"each roof is drawn in its own slightly different colour
  to produce a less formal, more natural-looking image. So basically it works the same way as in the
  Neighbourhood and Village generators **but without shadows**. How subtle this effect is, is defined
  for each colour scheme individually (`Color scheme > Tints > Weathering`)."*
- **Colour roles over time:** `Dark` (all outlines), `Water`, **`Walls`** (new 0.9.1), **`Trees`** (new
  0.9.1), `Medium` (removed 0.9.2), `Light` → **`Compass`** (0.9.2) → **`Elements`** (0.11.1, now also
  scale bar + legend), **`Labels`** (new 0.11.1, map labels and pins only — not header/legend text).
- **Presets:** `Default`, `Night` (retuned 0.9.1, removed 0.9.2), `B&W` (made truly black-and-white
  0.9.2), `Blueprint` (removed 0.9.1), **`Natural`** (added 0.9.1; "similar to Neighbourhoods' *Cool*"),
  **`modern`** (added 0.10.0). By 0.11.2 there is a **styles page** with 9 schemes, 6 of them the
  standard presets; **[SHOWN]** 109852547/02–03 names three custom ones: **academia** (violet-blue on
  dusty pink), **turquoise** (terracotta with a teal river), **june** (olive-green monochrome), plus
  three more below the fold (a black-on-cream, a grey-blue, and a white line-art scheme). Styles are
  downloaded as files and loaded via the *Color scheme* dialog.
- **[STATED]** 61026228 comment (creator), on separating water outlines: *"Currently it's not possible
  — **everything is outlined in the same 'Dark' colour**."* Workaround given: check
  `Style > Buildings > No outlines`, uncheck `Style > Misc > Outline roads`, and set `Dark` = `Water`.
  0.9.1 then added per-class outline toggles (buildings / roads / water / trees).

### 2.20 Rendering experiments (unreleased, post 114858238)

All **[STATED]** by the creator as experiments, with **[SHOWN]** images.

1. **Higher, non-uniform buildings** — *"Here I raise building roofs higher and not uniformly across
   the map. It's not just changing a single value in the code though, as even for such a simple change
   I had to implement **a sort of z-sorting**."* **[SHOWN]** 114858238/09,/11: an oblique/military
   projection — the roof polygon is drawn offset from the footprint and quad side walls connect the
   two; per-face flat shading (top light, side mid, front dark); heights vary building to building
   with visible regional clustering. **[INFERRED]** painter's algorithm sorted by footprint depth.
2. **Hard wall shading + ground shadows** — **[SHOWN]** 114858238/11: cream lit roof faces, blue-grey
   walls, and a uniform-length dark ground shadow offset consistently down-right (single directional
   light). *"This looks nice (and a bit too dramatic), but **not very readable**."*
3. **Shaded roofs** — *"In the current version gable and hip roofs are drawn as **sets of lines, more
   like wireframes than surfaces**. To make them look solid, here I draw their **faces as filled
   polygons omitting the ones that don't face the viewer**. And since I'm drawing them as polygons, why
   not to shade them properly."* — explicit **back-face culling + per-face lambert-ish shading** over
   the straight-skeleton faces. **[SHOWN]** 114858238/12: pitched roofs with a bright face, a deep
   shadow face and blue-grey gable end walls.
4. **Rejection of the military-projection branch** — three reasons given verbatim: unreadable ("hard to
   see individual streets and some buildings get completely obscured"); *"The drawing gets much slower
   with all the checks, sortings and **10x more polygons**"*; and *"there are **no city/castle walls**
   on these images … they are much more difficult to draw raised. And there is **the same problem with
   trees**."* He suggests the projection would instead suit a future focused "urban location"
   generator (squares, alleys, crossroads, bridges).
5. **Top-down with shaded roofs + ground shadows** — the branch he intends to keep. **[SHOWN]**
   114858238/04,/13: roofs get a two-tone split (lit upper-left face, darker lower-right face) and a
   soft grey ground shadow; walls, trees, farms and forest all still render normally.
6. **Roof hatching** — *"roofs on the image above seem **too smooth, like plastic**. I can try to fix
   this by adding a texture to them, for example the hatching like in the VG and NG."* **[SHOWN]**
   114858238/14: fine parallel hatch lines in a darker tone of each roof colour, direction following
   the roof face.
7. **"Town on a hill" and "city in the night"** — **[SHOWN]** 114858238/08 (night): warm feathered
   glow along street centrelines, dark textured building masses, unlit outskirts, black sea. No method
   given. **[NAMED-ONLY].**
8. **[STATED]** comment reply: *"Of course **shadows will be optional**, as in my other generators."*

### 2.21 Warp / manual editing tools

- **[STATED]** 79147510: `Warp` gains **`Pinch`**, the inverse of **`Bloat`**. 101942512 fixes the warp
  brush cursor.
- **[STATED]** 101942512: `Equalize` improved (plaza and castle shapes).
- **[STATED]** 102377277 comment (creator): **manual edits are not persisted.** *"No manual changes made
  to a map are encoded into its URL (apart from the city name), and since permalinks are the only mean
  of saving a map, currently there is no way to save those changes."* Landmarks/points of interest are
  the same object; they can be *loaded* from an external JSON array of strings but not saved; he
  considered a "save landmarks" action and rejected it as confusing. A user reports that re-pasting a
  permalink also **"subtly changed the city geometry"** — a same-seed reproducibility gap.

### 2.22 Export, permalinks and integrations

- **SVG export:** rewritten in 0.9.0 — *"A huge amount of code was replaced with a much smaller amount
  of code and now the **only feature not supported in SVG is hatching**"* (61026228). The technique came
  from Perilous Shores' *universal* SVG method (54745111): *"Universal here means that I won't probably
  need to modify this code when new features will be added"*, but at that point it did not support text
  or gradients. 0.9.1 changed SVG cropping ("more correctly"). 0.11.0 notes labels exported badly to
  PNG and worse to SVG before the 0.11.1 label rewrite.
- **JSON export:** one-way. **[STATED]** 62336213 comment: *"These jsons **can't be imported back** —
  my only application capable of loading them is the **City Viewer**. The original purpose … was to
  provide a way for **third party software** to load (and process) generated cities."* Contents grew:
  district descriptions (0.8.3), trees (0.9.1), alleys when shown (0.10.2). District view exports PNG/SVG
  of the district but **JSON of the whole city** (101942512).
- **Permalinks:** reworked in 0.9.0 "to make it more reliable and convenient"; `export=` repaired in
  0.9.2. **Observed URL surface [SHOWN]**, 61026228 comment:
  `watabou.github.io/city-generator/?size=46&seed=5484757540042&name=Ringpaw&population=28444&greens=0&farms=1&citadel=1&urban_castle=0&plaza=1&temple=0&walls=1&shantytown=1&coast=1&river=1&gates=-1&sea=0.09`
- **Armoria** (48290708, 50057173): 0.8.2 adds a random coat of arms only; 0.8.3 adds *Customize*
  (assign a specific design) and embeds the emblem in the legend. Announced but not shipped in this
  slice: importing a design by editor link, placement options (legend vs. a chosen map corner), and
  **emblem tinting** — *"By default Armoria uses a neutral palette and sometimes its colours look out
  of place on a map. This is easy to fix by adding a bit of 'map colour' to them."*
- **Perilous Shores → MFCG** (54745111): click a town on the region map to open it in MFCG; villages
  (VG) and dungeons (1PDG) planned. **[SHOWN]** 54745111/03,/07,/08: the PS context menu reads
  `<Town name> > Edit name / Reroll names / Add to almanac / Open in MFCG`.
- **MFCG → Procgen Mansion** (79147510): right-click any building to open it as a floor plan.
  **[STATED]** comment: *"the side of a grid cell in Procgen Mansion should be **around 3 meters**"*,
  immediately qualified — *"**Dimensions are a mess in all my generators.** Don't use them for planning
  anything real."*
- **MFCG → Neighbourhood Generator: rejected.** **[STATED]** 100431269 comment: *"It's **not hard to
  pass a shape**, but there are many things in the city generator that are **not supported in NG** (e.g.
  rivers, city walls). Opening a docks district in NG doesn't make much sense if it's not displayed
  next to the sea, does it? At some point I was planning to implement some of these missing features,
  but then **I lost interest in NG** to be honest."* This is what produced District View instead.
- **City Viewer** is a separate 3D consumer of the JSON. **[SHOWN]** 62336213/02,/10: walls extruded
  with crenellations and cylindrical towers, buildings extruded with pitched roofs, trees as ellipsoid
  canopies on trunks, fields as flat polygons. A 2026 comment on 114184619 reports newer MFCG JSON
  failing in City Viewer at `addWall` — i.e. the JSON schema drifted and the viewer was not kept in sync.

### 2.23 Naming

- **[STATED]** 100431269: *"City names and district names have been **reworked**. Not sure they got
  better, but the code is much simpler and cleaner now."* No method given. **[NAMED-ONLY].**
- **[SHOWN]** the generated vocabulary is compound-English: district names combine a colour/quality/
  noun with a place-word (LONGGATE, CROWNS TOWN, GREEN STAIR, DUSKGATE, MISTY WATER, HARBOUR WARD,
  PALE ORCHARD, NORTHERN SLUMS, BLACK COURTS TOWN, DOWNWIND EDGE, TWILIGHT MILE, SALT SIDE, BLACK KNOT,
  RATSTEPS, BREADSPRING, CLOUD HOOK, THE HOOK, THE HOUSES, SEVEN RIDGES, THIEFS MILE, WESTERN SLUMS,
  PURPLE ROWS, NEW LODGE, TREESIDE, MILITARY WARD, SPICEBANK, TWIN BROOKS, GREY FAIR, MERCHANTS
  DISTRICT). Generic fallbacks appear alongside them (Old Town, South District, East District, North
  Quarter, Eastgate, West District, Castle District, The Docks, East Docks, Cherry Docks). Bridges use
  the same compounding (Darkbridge, Old Crossing, Foolsbridge, Greenbridge, Winebridge). City names are
  single invented compounds (Flountport, Carketen, Woud, Chandren Town, Ringpaw).

---

## 3. Visual and style conventions observed in the images

**Palette structure.** A scheme is a small set of named roles rather than a per-object palette:
ground/background, water, buildings (+ per-district tint + per-building weathering), walls, trees,
labels, elements, and one `Dark` used for *every* outline. Typical published schemes pair a warm
desaturated ground (sand, olive, dusty pink, cream) with terracotta/ochre/slate/mauve buildings and a
blue, teal or grey water; the B&W scheme drops to pure black-on-white line art.

**Line weight.** A single hairline `Dark` outline on buildings, water, trees, fields; a noticeably
heavier stroke (or a filled band) for city and castle walls; roads are drawn as *filled ribbons in the
ground colour with the same hairline outline*, so a road reads as a gap rather than a stroke. Alleys,
when shown, are narrower ribbons of the same construction. Unoutlined roads with hatching on become
**dashed lines** (61026228/05).

**Buildings.** Small convex quadrilaterals packed shoulder to shoulder around a block's perimeter,
leaving a courtyard void. `Weathered roofs` gives each one a small independent colour jitter within its
district tint. `Raised` adds a thin darker wall face along the lower/right edges (a constant offset
extrusion). Roof detail, when on, is line work: a central ridge with hip lines to the corners, or a row
of transverse gable bays.

**Hatching** (0.9.0–0.9.1 only, removed 0.9.2): buildings filled with fine parallel diagonal lines,
direction varying per building/block (61026228/02,/05). It returns as an *experiment* on roof faces in
114858238/14. Farm furrows are the same primitive at a coarser pitch.

**Shadows.** None in shipped versions. The experiments post adds a single directional light with a
uniform-length ground shadow offset down-right, plus per-face roof shading.

**Water.** A flat fill with a single outline. Optional `Water isolines` (removed 0.11.0) drew 4–5
inward-offset contours. Shorelines are smooth; the Perilous Shores sibling instead uses a white/cyan
glow halo (54745111/06) or parallel wave hatching (54745111/01,/04,/05) — MFCG uses neither.

**Piers** are groups of 2–5 short parallel lines perpendicular to the shore, drawn in the wall/road
colour. **Bridges** are short ribbon segments crossing the water on the road colour.

**Trees** are small irregular lobed blobs with a darker outline, drawn in tight overlapping clusters,
placed in courtyards, greens, along field boundaries (hedgerows) and scattered on the periphery.
**Forests** are one flat mass with a scalloped edge of overlapping circular lobes, drawn beneath roads.

**Farm fields** tile the ring outside the built-up area as an irregular quad patchwork with narrow
ground-coloured lanes between them; fill is either per-field parallel furrows (direction independent
per field) or a flat solid; tiny isolated farm buildings sit among them.

**Labels.** Letter-spaced small-caps in a serif display face, dark with a light halo, individually
rotated along a curve; size scales with district area; minor districts get a small horizontal label
with a leading dot (pre-0.11.1) or a small fitted curve (0.11.1+). Bridges and the castle are labelled
in the same family at a smaller size.

**Legend** is a cream panel with a thin double rule containing: the city name in a larger serif, an
optional Armoria shield, a **scale bar** (alternating dark/light segments with old-style numerals —
observed at 0–500 m, 40–160 m, 100–400 m, 100–500 m, 100–400 yd, and 20–100 m in district view), and a
numbered list of districts. **Pins** are filled dark circles with light numerals at each feature.

**Compass rose:** an eight-point star, either plain two-tone or with hatched shading, bottom-right.
**Grid** (0.11.1+): thin `elements`-coloured lines forming square cells sized from the current scale,
drawn under the city (102377277/03).

**District View** adds one unique element: a thick semi-transparent dashed border drawn over
everything, including water and walls.

---

## 4. Creator's stated design philosophy and constraints

1. **Readability beats fidelity.** The entire military-projection branch is discarded because the maps
   "are not readable" even though they "look fancy" (114858238).
2. **Fantasy licence over historical accuracy, but only when it buys something.** On forests: *"I used
   to argue that woods tightly surrounding a city are historically unrealistic, but for fantasy
   settlements this argument is irrelevant"* (62336213) and *"since there is 'fantasy' in the name of
   the generator, historical accuracy is kind of negotiable"* (114184619) — and the deciding argument
   is compositional, that forests "frame" the map better than farmland.
3. **Option count is a liability.** 61026228 comment: *"There is a problem with all those options at
   the 'Buildings' tab: I think there are **too many of them**. Unfortunately, I don't see a single
   combination … which would be definitely the best for most situation so I could remove (or hide) all
   the others."* Two versions later he removes four of them anyway (102377277). Similarly 61026228:
   widths/sizes *should* be editable "but there are too many parameters in this generator as it is".
   And he repeatedly complains about naming: *"I am running out of words to name stuff in this
   generator!"*
4. **Cross-generator visual convergence.** MFCG is deliberately pulled toward the Neighbourhood
   Generator: the twisted bisection, wider alleys "to make the overall pattern of streets and buildings
   closer to the one in the Neighbourhood Generator", trees "to make city maps look a bit like zoomed
   out neighbourhood maps", the NG tree-drawing algorithm, the `Natural` preset "similar to
   Neighbourhoods' *Cool*", weathered roofs "the same way as in NG and VG". District View exists
   because it "looks a little like the Neighbourhood Generator".
5. **Ship the visible improvement even if it is unstable — but quarantine it.** 0.10.0 was released
   as an alpha at a separate URL rather than replacing 0.9.2, explicitly because he had already posted
   screenshots and wanted to show something working.
6. **Persistent-failure honesty.** Recurring pattern of naming a defect and declining to fix it now:
   greenhouse gables, straight forest edges, disjointed district view, the empty-area glitch, ugly
   secondary plazas, removed headlands. Each is paired with "maybe later".
7. **Technical-debt awareness.** 79147510: *"This generator is already quite old and over time it's
   getting more and more difficult to add new features. At some point, I'll either have to **rewrite it
   from scratch**, or at least spend some time on a thorough refactoring."*
8. **Zoom is architecturally impossible.** 101942512: real zoom is "too difficult for a specific
   technical reason"; 100431269 comment: "real zoom is still impossible".
9. **Exports are one-way.** JSON exists for third parties, not for round-tripping; permalinks encode
   generator parameters only, never manual edits.
10. **Scale is not to be trusted.** *"Dimensions are a mess in all my generators. Don't use them for
    planning anything real :)"* (79147510 comment).

---

## 5. Useful facts from the comment threads

| Post | Fact |
|------|------|
| 61026228 | Reproducing permalink for a twisted+complex+offset crash, plus the diagnosis *"the variable `rect` ends up null"* — evidence the twisted-lot path computes a per-polygon rectangle. Creator: fixed that one, *"but since the 'twisted' method is very new, I'm sure there will be more."* |
| 61026228 | Creator confirms the **display-mode auto-switch** pairing (voronoi↔simple, twisted↔lots) and calls it "not a perfect solution (for many reasons)". |
| 61026228 | Water outlines cannot be coloured separately — everything uses `Dark`. Workaround recipe given; a separate wall colour was promised and shipped in 0.9.1. |
| 61026228 | User: *"The existing bays always seem unusually narrow."* (Addressed three years later in 0.11.2.) |
| 62336213 | Exported JSON **cannot be re-imported**; City Viewer is the only loader; the format exists for third-party tools. |
| 79147510 | Roads align with a parent region map only for **coastal** towns, because those are oriented relative to the coast; inland towns are unaligned. |
| 79147510 | Procgen Mansion grid cell ≈ **3 m**; both 2×2 m and 4×4 m buildings render as a 1-cell "shack"; dimensions across all generators are unreliable. |
| 100431269 | **NG integration rejected** — passing a shape is easy, but NG lacks rivers and city walls, and he lost interest in NG. This request directly produced District View. |
| 100431269 | Any MFCG building can already be right-clicked into Procgen Mansion; the limitation is that city-scale buildings are small. |
| 101942512 | (2026) An island city ringed by docks: *"No, but something like that is next on my list."* |
| 102377277 | Users lost favourite combinations (Voronoi+Simple; Bisection+Simple+Shrink+Filter) when the options were removed; creator will "consider" restoring. |
| 102377277 | **Nothing but the city name survives a permalink round-trip** — district renames and landmarks are lost, and the geometry can change "subtly". Landmarks == points of interest; loadable from an external JSON array of strings, not savable. |
| 102377277 | A user's documented workaround: export SVG twice (labels on / off) and edit in Inkscape. |
| 114858238 | Shadows will be **optional**, like in the other generators. |
| 114184619 | (2026) Newer MFCG JSON fails in City Viewer at `ia.addWall` in `ToyTown2.js` — the export schema and the viewer have drifted apart. |
| 121415691 | `size` counts **cells**, not buildings; a medium city is **1000–2000 buildings**; users find `size=60` a good "large medium". Building count is shown in the *Settlement* window. |
| 87882877 | 0.10.0 screenshots were pre-announced on Twitter (status 1689044302918225920, 1691840075158401522) before the alpha; the "houses" side project is status 1686409457125732352. |

---

## 6. Open questions a re-implementer must decide

1. **Patch generation.** Never described in this slice beyond "the map is partitioned into cells" and
   the 2017 retrospective "stylized Voronoi diagrams". Seed distribution, relaxation, and boundary
   handling are unknown.
2. **Twisted bisection proper.** The construction (deferred to post 49191011) is the single highest-value
   unknown: how the cut line is curved, what "propagating properties of the outer shape" means
   operationally, recursion termination, and the degeneracy guards that are still missing in the shipped
   product.
3. **"Two types of alleys which are quite different from each other"** (100431269) — never explained.
4. **Ward taxonomy and assignment.** Only "regular" patches are named; castle, citadel, urban castle,
   docks, shantytown, greens, plaza, temple are all visible as URL switches or map features, but the
   selection/placement rules are never given.
5. **Main-road construction.** Stated to be "a completely different nature" from alleys, but the method
   (radial growth? shortest paths between gates and the plaza? something seeded by the patch graph?) is
   never described.
6. **Outskirts filtering knobs** — what the density falloff is a function of (ring index, distance,
   patch attribute) and how "keep buildings dense along the surviving streets" is enforced.
7. **Smoothing method** for coast/walls/roads/district borders — Chaikin, spline, or offset-and-resample.
8. **Ridge selection for labels** — which straight-skeleton path is chosen, and the text-fitting scheme.
9. **Gable-roof construction** — why raised gables read as greenhouses tells us the end walls are
   mishandled, but not what the intended construction is.
10. **Forest boundary** — the offset distance from the occupied area, and the parameterisation of the
    scalloped lobes; also why the edges go straight at large map sizes.
11. **Tree placement algorithms** (all three generations) — none is named; only relative speed and
    density side-effects are recorded.
12. **Farm field tessellation** — how the patchwork is generated and how the 0.9.1 "sawtooth" fix works.
13. **Bay generation (0.11.2)** — "generated differently and more diverse" with headlands lost, but no
    method; and the promised "better headlands" never appears in this slice.
14. **Tint methods** — exact colour maths for Spectrum / Brightness / Overlay and the meaning of
    `Strength`, plus the per-scheme `Weathering` amplitude.
15. **Why real zoom is impossible** — the "specific technical reason" is never named; my inference
    (scale-baked geometry) is unverified.
16. **Same-seed reproducibility** — a user reports permalink round-trips "subtly changed the city
    geometry"; whether that was a bug or an inherent version drift is unresolved.
17. **Exported JSON schema** — contents are listed piecemeal (districts, trees, alleys, walls,
    buildings, fields) but the schema itself is not in this slice.
18. **`sea`, `gates`, `urban_castle` URL semantics** — inferred only.
19. **0.11.3** is absent from this slice (0.11.2 → 0.11.4); whatever it changed is unrecorded here.
