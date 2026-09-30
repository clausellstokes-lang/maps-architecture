# Slice: `vg-ng-devlogs` — watabou itch.io devlogs for Village Generator (21) and Neighbourhood (6)

Extraction pass. Every `post.md` in the slice was read in full (body + comment thread); every image
listed under "Images (local files)" was opened and inspected (33 images total, including 6 magnified
crops made locally for detail work). No captured JavaScript bundle was opened.

**Evidence tags used throughout:**
`[STATED]` creator explicitly describes the method · `[SHOWN]` visible in an image but not explained ·
`[INFERRED]` my reconstruction, reasoning given · `[NAMED-ONLY]` feature announced, no method given.

**Source-path convention.** All devlog citations are `<generator>/<devlog-id>-<slug>`, relative to
`/Users/cstokes/Desktop/Maps/research/devlogs/`. Images are cited as `…/images/NN.ext`.

---

## 0. Critical caveat about this slice's evidentiary value

**The itch.io devlogs are teasers, not documentation.** Almost every VG/NG devlog in this slice is
1–3 sentences that break off mid-thought with a `[(more)]` link to Patreon. The Patreon bodies are
*not* in this slice. Word counts: 15 of 21 VG posts are under 110 words including the comment thread.

Consequences for the re-implementer:

1. The *only* substantial algorithmic prose in this entire slice is four passages: the village-square
   construction (`village-generator/507254`), the palisade/density coupling (`village-generator/736720`),
   the river rewrite admission (`village-generator/589997`), and the "recursive bisection with a twist"
   explanation (`neighbourhood/315495`). Everything else is names of features plus pictures.
2. **The images are therefore the primary evidence**, and much of this document is careful reading of
   them. I have tagged those observations `[SHOWN]` and kept inference visibly separate.
3. **Post dates in this corpus are unreliable.** 20 of 21 VG `post.md` files carry the identical
   timestamp `17 September 2026 @ 14:19 UTC`, and 5 of 6 NG files carry `24 February 2024 @ 15:16 UTC`.
   These are scrape artifacts, not publication dates. Two files escaped it:
   `village-generator/1667364` = 09 September 2026 and `neighbourhood/687554` = 24 August 2022 — and
   the latter is itself inconsistent with its own content (it links Patreon post 99067664, which by ID
   ordering sits well after 2022's posts). **Do not trust any date field in this corpus.**
   Order the timeline by devlog ID and by Patreon post ID, both of which are monotonic in time. I have
   done so below and marked the derived ordering `[INFERRED]`.
4. **Two VG releases are missing from the itch devlog stream: 1.6.3 and 1.6.6.** The sequence runs
   …1.6.1, 1.6.2, *(gap)*, 1.6.4, 1.6.5, *(gap)*, 1.6.7, 1.6.8. Whatever changed in those two versions
   is not recoverable from this slice.

---

# PART A — VILLAGE GENERATOR (VG)

## A1. Chronological table

Ordered by devlog ID (monotonic). "Patreon" = the ID of the linked full post, which corroborates the
ordering independently. "Date" column omitted deliberately — see §0.3.

| # | Devlog id | Version / title | Patreon | What changed (as stated or shown) |
|---|-----------|-----------------|---------|-----------------------------------|
| 1 | 248943 | 1.2.5: fields | 50688261 | **Fields introduced.** Requested "from the moment when the color visual style (which is currently the default one) was first introduced" — i.e. fields postdate the colour style. Image shows sparse yellow hatched parcels only, no field *system*. |
| 2 | 308559 | 1.2.7: improved fields and roads | 57968729 | "a relatively large update and its largest part is improved fields". Image shows the field system's real debut: a contiguous mosaic of subdivided parcels separated by green lanes, with per-parcel furrow direction and hedgerow trees along the lanes. Roads also improved (unspecified). |
| 3 | 382428 | 1.2.8: integration with Procgen Mansion | 66544756 | Right-click a building → "Open in PM" → that building opens in Procgen Mansion. Implemented via **GET request parameters** (creator reply). |
| 4 | 425635 | 1.3.0: new trees and buildings | 71653886 | "almost exclusively visual changes", many of them. Image: multi-tone tree canopies (3+ greens per clump), brown/tan buildings with ridge-and-rafter roof hatching, cream road ribbons with casing, dashed tracks, hedgerow trees along field edges and lanes. |
| 5 | 426543 | Keyboard shortcuts | — | Reference list; the most useful *inventory of independent layers* in the whole slice (see §A3.1). |
| 6 | 507254 | 1.4.0: village square and orchards | 80494491 | **Village square algorithm stated** (density peak → circle → distort → centrepiece unless it overlaps water). **Orchards** introduced. |
| 7 | 541652 | 1.5.0: non-square maps and isolated villages | 84106820 | **Portrait/landscape maps.** "took much time to implement and debug it. Too much time — after all a map of unequal width and height is not such a wild idea." **Isolated villages** (later seen as an `isolated` tag). |
| 8 | 584696 | 1.5.1: ponds and improved farm fields | 88749133 | **Ponds**; farm fields improved again. "a collection of pretty diverse new features. There could be more of them, but I didn't want pile them up." |
| 9 | 589997 | 1.5.2: improved rivers and bridges | 89314043 | **River subsystem rewritten from scratch** (see §A2.7). Bridges improved. Permalink in the post reveals the tag vocabulary: `?seed=975637253&tags=pond,grove,organic,isolated`. |
| 10 | 613514 | Plans | 90033685 | Roadmap post: "things that I am interested in adding for one or more reasons and I have at least some idea how to do it". Comments yield map scale, tree-colour config, and the palisade/motte-and-bailey ruling. |
| 11 | 626406 | 1.5.3: new water features and other additions | 91692684 | Planned single-area update got padded out because Patreon access was lost mid-cycle. Image shows a **river confluence (Y-junction)**, piers, ring+radial street layout around a circular plaza. |
| 12 | 635140 | Collection of styles | — | 12 downloadable style JSONs, all rendering **the same seed** — the single most valuable style/geometry separation artifact in the slice (see §A3.6). |
| 13 | 731413 | 1.5.4: spotlight and improved roads | 104226049 | **Spotlight**: "a soft radial gradient … making its focus brighter and its periphery darker. The effect is similar to vignetting, but it's more customizable and sort of smarter." Roads improved again. |
| 14 | 736720 | 1.6.0: palisades | 104796798 | **Palisades.** "The shape of the enclosure depends on the 'population density map'. As a result, 'sparse' villages tend to be surrounded by smaller fences and vice versa: in 'dense' villages, not only houses are placed more tightly, but the radius of the palisade is larger (on average)." |
| 15 | 740285 | 1.6.1: palisades in JSON and small visual improvements | 105215836 | "I was expecting bug reports related to palisades, but instead I found a whole chunk of functionality missing: those palisades weren't exported to JSON and weren't displayed in City Viewer". Image is a **City Viewer 3D render** — reveals the JSON's semantic content (see §A2.12). |
| 16 | 785801 | 1.6.2: shading | 110526365 | **Terrain shading**: "the ground is now drawn shaded: sun-facing slopes are highlighted and the opposite ones are darkened. In a sense, this feature functionally duplicates hachures, but unlike hachures…" (cut off). |
| 17 | 840277 | 1.6.4: crossroads and numbered houses | 116745476 | **`crossroads` tag**: "you can now request a village at a highway intersection (a crossroads or a T-junction)". **Numbered houses** (no method given). |
| 18 | 848499 | 1.6.5: small improvements | 117634240 | "a tiny follow-up update to the previous one". |
| 19 | 880634 | Three generators have been updated | 121415691 | MFCG + VG + Dwellings updated together, "All three updates are quite small". |
| 20 | 1657874 | 1.6.7: improved trees | 169047704 | "It's been more than a year since I last updated this generator (a year and a half actually) … I'll start with some relatively simple improvements and then we'll see how it goes". Note the **huge devlog-ID jump** (880634 → 1657874) corroborating the hiatus. |
| 21 | 1667364 | 1.6.8: improved contours and other visual changes | 169696051 | **Selective outlining**: "The contours of visual objects … are now rendered using shades of the objects themselves, rather than solid black (or any other fixed colour). Apparently, the technique is called 'selective outlining', although I'm not sure if the term is used outside of pixel art". |

**Arc of the corpus.** Read end to end, VG's development is: *fields → integration/export → visual
polish → structural map features (non-square, ponds, rivers, water) → global post-processing
(spotlight, shading) → the one genuinely new settlement-structure feature (palisades) → export/viewer
catch-up → tags for layout control (crossroads) → hiatus → rendering-quality refresh (trees, contours).*
Only two entries in 21 add new settlement *structure* (village square+orchards, palisades). Everything
else is terrain, water, rendering or plumbing. **That ratio is itself the finding**: VG's settlement
layout core was essentially frozen from 1.2.x onward, and the product was improved almost entirely
through terrain, water, and render quality.

---

## A2. Techniques

### A2.1 — The population-density map (the spine of the whole generator)

**Tag:** `[STATED]` that it exists and is named; `[INFERRED]` for its construction.
**Sources:** `village-generator/736720` (names it, in quotes, as "population density map"),
`village-generator/507254` (the square is placed at "a place on a map with high population density").

**Problem solved.** VG needs one shared scalar field that simultaneously decides (a) where the centre
of the village is, (b) how tightly houses pack, (c) how far out the built-up area extends, and
(d) how big the enclosure is. Without it, those four would need independent tuning and would drift
out of agreement.

**What is recoverable.**
- It is a *map* (a field over the map plane), not a scalar parameter. The creator's own scare quotes
  suggest it is an internal informal name.
- It has a peak or peaks: "the generator finds a place on a map with high population density — often
  it's a place on the highway" (507254). **The highway biases the field** — density is elevated along
  the main road. `[STATED]`
- Density is *also* a global dial: villages are described as "sparse" vs "dense", and in dense ones
  "not only houses are placed more tightly, but the radius of the palisade is larger (on average)"
  (736720). So the field has both a shape and an amplitude/spread, and both are per-village random. `[STATED]`
- The palisade's *shape* (not just radius) depends on it (736720). That means the field is consumed as
  a 2-D iso-contour, not merely sampled at points. `[STATED]`

**Reconstruction.** `[INFERRED]` A plausible construction consistent with every image: start from a
base kernel centred on the settlement seed point (a radially decaying bump), add a ridge term along
the highway polyline (distance-to-road falloff), multiply by habitability masks (zero inside water,
reduced on steep slope), and perturb with low-frequency noise so iso-contours are organic rather than
elliptical. Reasoning: the egg/oval palisades in `736720/images/01.jpg` and `840277/images/01.jpg` are
smooth and convex-ish but *not* circles and not terrain-following, which is what you get from a smooth
bump plus mild noise, and not what you get from a terrain threshold. The highway ridge term explains
both the "often it's a place on the highway" remark and the consistent ribbon-of-houses-along-the-road
morphology in `248943/images/01.png` and `425635/images/01.png`.

**Parameters mentioned.** None numerically. Only the qualitative sparse↔dense axis.

**Failure modes / handling.** `[STATED]` Water is an explicit veto surface: the square's centrepiece
is added only "if the square doesn't overlap water" (507254) — i.e. the density field is not itself
water-aware enough, and a downstream overlap test is used as the guard.

**UNKNOWN for a re-implementer.** Grid resolution vs analytic; whether it is recomputed after rivers
are carved; whether "population" is literal (pop. count is printed on the nameplate: 96, 180, 240, 370,
380, 490, 1200, 1700 across the images) or whether the printed population is derived from the building
count after the fact. The printed figures span 96→1700, so the generator covers ~20× population range
with the same machinery.

---

### A2.2 — Village square

**Tag:** `[STATED]` — the single most complete algorithm statement in the slice.
**Source:** `village-generator/507254` (1.4.0), verbatim: *"the generator finds a place on a map with
high population density - often it's a place on the highway. Then it creates a circle of a reasonable
size at that location and distorts it a little. This circle becomes the shape of a village square. If
the square doesn't overlap water, a centerpiece (a large tree or a well) is added..."*

**Algorithm, as given:**
1. Locate the argmax (or a high-value sample) of the population-density field.
2. Instantiate a circle of "a reasonable size" there. (Size rule not given — `UNKNOWN`. Almost
   certainly scaled by village size; see the images below.)
3. **Distort the circle "a little"** → the square polygon.
4. Overlap test against water. If clear, place a centrepiece: **a large tree or a well**.
5. (Post cuts off here — there is more in the Patreon body we do not have.)

**Corroboration in images, and the size/shape variation across versions:** `[SHOWN]`
- `507254/images/01.png` (St Roesia, pop. 180): the square is a **large, visibly non-circular grey
  blob** — the "distorted circle" is strongly distorted here, an irregular rounded heptagon-ish shape.
  Centrepiece is a **well**, drawn as a small dark ring with a lighter core. Dashed paths radiate from
  its edge. Buildings ring it, long axes roughly tangent to its boundary.
- `541652/images/01.png` (1.5.0): a pale sand disc with **a large tree** as centrepiece — the other
  branch of the stated rule, confirmed visually.
- `626406/images/01.jpg` (Abehorn, pop. 240) and my crop `abehorn_square.png`: the square is an
  almost **perfect circle** with a well at the exact centre; 5–6 roads radiate from it and concentric
  arc roads wrap it. So the "distort a little" amount is itself random and can be ~0.
- `840277/images/01.jpg` (Astfin, pop. 380) and crop `astfin_sq.png`: the square is a clean **ellipse**,
  well at centre, placed *off-centre* within the palisade (near its south edge) — confirming the square
  is placed by the density peak, not by the enclosure's centroid.
- `1667364/images/01.jpg` (Alberven, pop. 1700): even at 1700 pop the square stays a single small
  rounded plaza with a well; it does **not** scale with population. It is the hub of a radial street
  fan plus concentric rings.
- `635140/images/07.png` (default style, same seed as all 12): the square here contains **a building on
  it** rather than a well/tree — so the centrepiece set is larger than the two the post names, or a
  separate "building on the square" rule exists. `[SHOWN]`, method unknown.

**Failure modes / handling.** Water overlap → suppress the centrepiece (but apparently *not* the square
itself). `[STATED]`

**UNKNOWN.** The "reasonable size" formula; the distortion operator (radial noise on a polygonised
circle? Chaikin-smoothed random offsets? an MFCG-style polygon perturbation?); how roads are attached
to the square rim; whether the square is subtracted from the buildable area before or after house
placement; the full centrepiece table.

---

### A2.3 — Orchards

**Tag:** `[NAMED-ONLY]` for method; `[SHOWN]` for appearance; it is also an independent toggle.
**Sources:** `village-generator/507254` (title: "village square and orchards"),
`village-generator/426543` (shortcut `O — toggle orchards`), `village-generator/613514/images/01.jpg`.

**What is recoverable.** Orchards are a distinct layer from "trees" (separate keyboard toggles `O` and
`Shift+T`), so they are generated by different code and are semantically tied to the settlement rather
than to the wilderness. In `613514/images/01.jpg` the orchard is unmistakable: a compact block of
**evenly spaced trees on a regular lattice**, in a lighter/different palette than the surrounding
natural woodland, sitting immediately adjacent to the built-up area and bounded like a field parcel.
Natural groves in the same image are irregular, clustered and follow hedgerow lines.

**Reconstruction.** `[INFERRED]` Orchards are field-system parcels whose fill is "trees on a jittered
grid" instead of "furrow hatching". Reasoning: their footprints are parcel-shaped (straight-edged
polygons of field-like size), they occupy the same ring of land as fields, and the tree spacing is
lattice-regular with small jitter. A re-implementer can get this by tagging a fraction of generated
field parcels as orchard and stamping a jittered lattice of tree instances clipped to the parcel.

**UNKNOWN.** Selection rule (what fraction of parcels; proximity requirement to the settlement);
row spacing; whether orchards are ever enclosed (a commenter asked for "walled Orchards" — `613514`
comment by *Maseiken* — and got no reply, so presumably not).

---

### A2.4 — Fields / the farm-field system

**Tag:** `[SHOWN]` in detail; `[NAMED-ONLY]` for the algorithm. Three separate improvement passes.
**Sources:** `village-generator/248943` (1.2.5, introduced), `village-generator/308559` (1.2.7,
"its largest part is improved fields"), `village-generator/584696` (1.5.1, "improved farm fields").
Key images: `248943/images/01.png`, `308559/images/01.png` + my crop `oak_fields.png`,
`584696/images/01.png`, `613514/images/01.jpg`, `589997/images/01.jpg`.

**The 1.2.5 state** (`248943/images/01.png`): fields are a handful of isolated yellow polygons with
parallel hatching, straight-edged, not forming a system, not obviously related to the roads. They read
as "some parcels got placed near the village".

**The 1.2.7 state** (`308559/images/01.png`, crop `oak_fields.png`) — this is the important one:
- Fields form a **contiguous mosaic** occupying one side of the village: a large irregular region
  subdivided into ~20 parcels.
- **Subdivision is recursive and axis-varying.** Large parcels are split by straight cuts into 2–4
  children; children are split again. Cut directions differ between generations, producing the
  characteristic mix of big slabs and small strips.
- **Every cut leaves a gap**, rendered as a narrow strip of background green — i.e. the lane/balk
  between parcels is produced by *offsetting the parcels inward from the cut line*, not by drawing a
  line. `[SHOWN]` This is polygon inset/offsetting applied per parcel.
- **Furrow direction is constant within a parcel and differs between parcels**, and adjacent siblings
  often share a direction. `[INFERRED]` the furrow angle is a per-parcel attribute, probably derived
  from the parcel's dominant edge or its OBB long axis, with sibling correlation because siblings
  inherit the parent's geometry.
- The mosaic's outer boundary is **clipped against the forest and the road**, ragged where it meets
  woodland, straight where it meets a lane.
- **Trees are planted along the lanes and at parcel corners** — hedgerow planting derived from the
  parcel boundary geometry, not scattered. `[SHOWN]`

**The 1.5.1 state** (`584696/images/01.png`): fields are now **radial wedges fanning out from the
settlement** — the parcels are trapezoids whose long axes point away from the village core, separated
by wedge-shaped gaps. Compare `507254/images/01.png` (St Roesia), which shows the same radial wedge
system on an island. `[SHOWN]` This is a different subdivision regime from the 1.2.7 rectilinear
mosaic — suggesting either a second field template or a polar-space subdivision.

**Later states**: by `626406/images/01.jpg` and `840277/images/01.jpg`, both regimes coexist — rectilinear
blocks further out, plus small tan hatched crofts/kitchen-gardens *inside* the palisade adjacent to
houses (`840277`, crop `astfin_sq.png`). Small in-village garden plots are therefore a third field
class. `[SHOWN]`

**Reconstruction.** `[INFERRED]` A defensible re-implementation: (1) build a "farmland" region as the
annulus between the built-up area and the map/terrain limits, minus water and forest; (2) cut it into
blocks along the road network; (3) recursively subdivide each block by bisecting the OBB (or the
longest-edge direction) until an area threshold, with the cut position jittered; (4) inset each leaf
parcel by a lane half-width; (5) assign each leaf a furrow angle from its OBB long axis; (6) optionally
retag some leaves as orchard/meadow/fallow (multiple field fill colours appear in
`1657874/images/01.jpg`: mid-green hatched, pale-green hatched, and unhatched paddock); (7) plant
hedgerow trees along inset boundaries with Poisson-ish spacing.

**Failure modes.** Not discussed. `[INFERRED]` from the images: fields never overlap water or buildings,
and never straddle the river — in `589997/images/01.jpg` parcels stop cleanly at both banks.

**UNKNOWN.** Whether the radial-wedge form is a separate template or the same recursive cutter applied
in polar coordinates; the area threshold; how many field classes exist; how field extent scales with
population.

---

### A2.5 — Roads and the highway

**Tag:** `[NAMED-ONLY]` (three separate "improved roads" entries, none explained) + `[SHOWN]`.
**Sources:** `village-generator/308559` (1.2.7), `village-generator/731413` (1.5.4),
`village-generator/840277` (1.6.4, crossroads tag), `village-generator/426543` (`R — toggle roads`).

**Road hierarchy visible across the images** `[SHOWN]` — at least four classes, each with its own style:
1. **Highway** — the widest ribbon, runs off the map edge on both sides, passes through or beside the
   village. Rendered as a filled ribbon with a casing stroke. Present in nearly every image.
   It is the spine the density field biases toward (§A2.1).
2. **Village streets** — narrower ribbons, same fill, forming the local network: radial spokes from the
   square plus concentric arcs (`626406`, `1667364`), or a ladder along the highway (`382428`).
3. **Tracks/lanes** — thin single strokes serving individual houses and field lanes.
4. **Footpaths** — **dashed or dotted** strokes running out into the wilderness and terminating at
   nothing (`248943`, `584696`, `731413`, `840277`). These are decorative "the world continues" hints.

**Geometry** `[SHOWN]`: streets are smooth curves, not polylines with visible corners — arcs around the
square and gentle S-curves elsewhere. Junctions are *merged*: in `731413/images/01.jpg` a fork's two
branches meet the trunk with a filleted Y, not a hard T. `[INFERRED]` road centrelines are splines
(or Chaikin-smoothed polylines) rendered as stroked ribbons with round joins/caps, and junctions are
resolved by overdraw of the ribbon fills (which also explains why junction geometry never shows seams
in any style, including the flat `minimal` style).

**The `crossroads` tag (1.6.4)** `[STATED]`: *"you can now request a village at a highway intersection
(a crossroads or a T-junction)"*. So highway topology within the map is a *requestable* property, and
the generator supports at minimum: single through-highway, T-junction, and 4-way crossroads.
`425635/images/01.png` shows a clean X crossroads with houses lining both arms — the pre-tag version of
the same morphology, so the tag constrains an existing capability rather than adding one. `[INFERRED]`

**UNKNOWN.** What "improved roads" changed in each of 1.2.7, 1.5.4; how streets are generated (grown
from the square? derived from the density field's gradient? subdivision of the built-up polygon?);
how the highway path is chosen across the terrain.

---

### A2.6 — Building placement, footprints and orientation

**Tag:** `[SHOWN]` throughout; no post in this slice explains placement.

**Observations, consistent across all 21 VG images:**
- Houses are **rectangles with a strong long axis** (typ. 2:1 to 4:1), placed in **short parallel
  runs of 2–6** sharing an alignment, with a setback from the road. `[SHOWN]`
- **Orientation follows the nearest road/boundary**: along a straight street the long axis is parallel
  to it; around the square the long axes go tangential, producing the fan patterns in
  `541652/images/01.png` and `626406/images/01.jpg`. `[SHOWN]`
- Houses are **not** snapped to a lot grid, and blocks are **not** perimeter-ringed the way NG's are
  (the contrast with Part B is stark and is the clearest structural difference between the two
  generators). VG houses stand in their own plots with grass between them.
- **Composite footprints exist**: some buildings are L-shaped or T-shaped unions of two rectangles
  (clearly visible in `731413/images/01.jpg` and in the Procgen Mansion panel of `382428/images/01.png`,
  where the exported footprint is an L of two overlapping rectangles).
- **Special/large buildings** are a distinct class: the dark hall with a spire in `507254/images/01.png`;
  the big rectangle-plus-round-tower in `840277` (crop `astfin_sq.png`) reading as a church/keep; two
  round-roofed structures (rectangle + large concentric-ringed circle, reading as mills) in
  `1657874/images/01.jpg`. `[SHOWN]`
- **Density follows the density field**: tight ranks near the square/highway, thinning to isolated
  farmsteads at the edge (`248943/images/01.png` is almost entirely the thin tail).

**"Wilderness mode"** `[STATED]`, `village-generator/426543`: `B — toggle buildings ("wilderness
mode")`. The generator can render the map with the settlement removed — meaning buildings are a
detachable layer over a terrain+road+field substrate that stands on its own.

**Numbered houses (1.6.4)** `[NAMED-ONLY]`, `village-generator/840277`. No numbers are legible in
`840277/images/01.jpg` at the published resolution. In my crop `astfin_sq.png` there are small pale
lavender tabs attached to the street-facing side of many houses; these may be entrance markers or
number plaques, but I could not confirm it and will not claim it. **Treat as unresolved.**

**UNKNOWN (large).** The actual placement algorithm — rejection sampling against the density field?
Poisson-disc with a density-varying radius? plot subdivision along road frontage? — is entirely
unrecovered from this slice. This is the single biggest gap for a re-implementer working from VG
devlogs alone.

---

### A2.7 — Rivers (rewritten from scratch in 1.5.2)

**Tag:** `[STATED]` for the rewrite and the motive; `[SHOWN]` for behaviour.
**Source:** `village-generator/589997`, verbatim: *"When I implemented rivers in the Village Generator
for the first time, I struggled with them a lot. Back then I ended up with something that looked more
or less acceptable, but inside it was a total mess. This time, to make all the changes I wanted to
make, I decided to rewrite everything river-related from scratch instead of refactoring..."*
The first implementation is linked to Patreon post 36199609 (not in this slice).

**Why this matters to a re-implementer.** This is a direct, unambiguous warning from the creator that
the river subsystem is the part of a settlement generator most likely to accrete into an unmaintainable
mess if grown incrementally, and that he found rewriting cheaper than refactoring. Rivers couple to:
terrain, bridges, the density field, field clipping, building exclusion, and the shoreline renderer.
**Design the river as a first-class, replaceable subsystem from day one.**

**Behaviour shown in the images** `[SHOWN]`:
- Rivers **meander** with smooth, spline-like curvature and varying width; `1657874/images/01.jpg`
  shows a full S-meander with near-oxbow tightness.
- **Confluences** work: `626406/images/01.jpg` shows a clean Y-junction of two rivers with the merged
  channel wider than either tributary. `589997/images/01.jpg` also shows a tributary joining at the
  village.
- Rivers **widen downstream** (visible in `785801/images/01.png`, where the channel broadens into an
  estuary/lake at the bottom of the frame).
- The channel is drawn as **nested bands** (dark bank line → mid tone → light core, or the reverse in
  some styles), which is a depth/centre-line cue and implies the river is stored as a centreline +
  width profile and rendered by repeated inward offsetting. `[INFERRED]`
- A **pale sandy bank strip** is drawn along the shoreline in several styles (`589997`, `785801`,
  `731413`) — an outward offset of the water polygon.

**Related water features.** Ponds (1.5.1, `584696/images/01.png`: a rounded organic blob with 4–5
concentric depth bands and a white shoreline highlight); lakes and sea (`507254`, `880634`, with
**offshore bathymetric contour bands**); "new water features" (1.5.3, unspecified).

**UNKNOWN.** Whether rivers are traced downhill on the heightmap or drawn top-down and the terrain
conformed to them; the width law; how the confluence geometry is built; whether ponds/lakes are
placed independently or are river artifacts.

---

### A2.8 — Bridges and piers

**Tag:** `[SHOWN]`; named in `village-generator/589997` ("improved rivers and bridges").

- **Bridges** appear exactly where a road crosses water, are drawn as a rectangle with **ladder/plank
  hatching** perpendicular to the crossing direction, span bank to bank, and are slightly wider than
  the road. Multiple bridges per map are normal (`589997/images/01.jpg` has four).
- **Piers/jetties** are thin rectangles projecting from a shore into open water, in groups of 1–4,
  always where the settlement meets a lake/sea/wide river (`507254`, `541652`, `626406`, `880634`,
  `1667364`). They are a settlement-adjacency feature, not a road feature — none of them connects to
  anything on land. `[SHOWN]`

**UNKNOWN.** Whether bridge sites are chosen first (and the road routed through them) or the road is
routed first and bridges inserted at crossings. The creator's remark in `613514`'s comments that he is
"not planning to implement keeps, bridges, ditches or anything like that" in the motte-and-bailey
context indicates *fortification* structures, not river bridges, which already existed.

---

### A2.9 — Palisades (1.6.0) — the one structural addition

**Tag:** `[STATED]` for the coupling; `[SHOWN]` for the geometry and gates.
**Source:** `village-generator/736720`, verbatim: *"...The shape of the enclosure depends on the
'population density map'. As a result, 'sparse' villages tend to be surrounded by smaller fences and
vice versa: in "dense" villages, not only houses are placed more tightly, but the radius of the
palisade is larger (on average)..."*
Images: `736720/images/01.jpg` (Wyma's Rise, pop. 240) + my crop `palisade_gate.png`;
`840277/images/01.jpg` (Astfin) + crop `astfin_sq.png`; `848499/images/01.jpg` (Kilrary);
`740285/images/01.png` (3D view).

**Algorithm, as far as recoverable:**
1. The enclosure **shape** is derived from the population-density field — `[STATED]`. Given that
   "radius" is described as a scalar with an average, and shape is field-derived, the natural reading
   is: **take an iso-contour of the density field at some threshold, then smooth it**. `[INFERRED]`
2. Observed geometry strongly supports that: every palisade in the slice is a **single smooth closed
   convex-ish curve** — an egg (`736720`), a tilted ellipse (`840277`), a long oval (`848499`) — with
   **no terrain following, no re-entrant lobes, and no self-intersections**. That is what a smoothed
   iso-contour of a single dominant bump looks like. `[SHOWN]` + `[INFERRED]`
3. Enclosure size correlates with density amplitude — dense villages get *larger* radius (note: this is
   counter-intuitive and is explicitly stated, so do not invert it).
4. **Gates** are placed where roads cross the palisade — `[SHOWN]`. In `palisade_gate.png` the gate is a
   rounded rectangle with wood-grain hatching straddling the wall line, with the road passing through
   it. Wyma's Rise has 3 gates (W, E, S); Astfin has 3–4; Kilrary has 4. The count is simply the number
   of road crossings.
5. **The palisade does not enclose everything.** Fields and even a few houses lie outside it
   (`736720`: outlying house to the E; `840277`: substantial fields outside). It encloses the dense core
   and cuts across the field system.
6. **Rendering** `[SHOWN]`: a dark band (bank/ditch) carrying a line of small pale beads (individual
   posts/stakes); in `840277` the inner edge additionally carries short hatch ticks (rampart). In the
   3D City Viewer render (`740285/images/01.png`) it becomes a continuous white extruded wall with
   gatehouse boxes — so the exported representation is a **polyline plus gate positions**, and the
   post/bead texture is purely a 2-D style flourish.

**Failure modes and the creator's stated limits.** `613514` comments, creator reply to *Andonome*:
*"villages in this generator are quite often placed on top of (or next to) a hill, so with a palisade
this will give us a natural motte and some kind of bailey. However, right now I'm not planning to
implement keeps, bridges, ditches or anything like that."* — two facts: (a) **village sites are biased
toward hills**, and (b) the palisade is deliberately the *only* fortification primitive; no keep, no
ditch, no drawbridge. `[STATED]`

**The 1.6.1 failure mode (important, and generalisable).** `740285` `[STATED]`: palisades shipped
without being written to the JSON export or rendered in City Viewer — *"I was expecting bug reports
related to palisades, but instead I found a whole chunk of functionality missing"*. **This is exactly
the "write survives one lifecycle path and ghosts another" bug class.** Any new map entity must be
threaded through: generation → 2-D render → JSON export → external viewer. Build a registration
manifest so a new entity cannot be added without all four.

**UNKNOWN.** The iso-value/threshold; the smoothing operator; the "(on average)" distribution; whether
the palisade is a tag/probability or always present above some size; whether houses outside the
palisade are deliberate (suburbs) or fallout.

---

### A2.10 — Spotlight (1.5.4)

**Tag:** `[STATED]` (partially — the post is cut off at the interesting part).
**Source:** `village-generator/731413`: *"Spotlight is a new feature of the generator that allows you to
apply a soft radial gradient to a map, making its focus brighter and its periphery darker. The effect
is similar to vignetting, but it's more customizable and sort of smarter..."*
Shortcuts: `L — open Spotlight window`, `Shift+L — toggle spotlight` (`426543`).

**What it is.** A post-process radial luminance ramp. "More customizable" ⇒ the centre, radius and
falloff are exposed (it has its own settings window). **"Sort of smarter"** is the interesting unexplained
word — `[INFERRED]` it most likely means the spotlight centre is auto-placed at the settlement's focus
(density peak / square) rather than at the image centre, and/or its radius is fitted to the built-up
extent. Evidence: in `840277/images/01.jpg` the bright pool is centred on the village, which is *not*
the image centre, and its radius hugs the palisade; in `880634/images/01.jpg` the bright pool is centred
on the island's settled valley. `[SHOWN]`

**Interaction with style.** In dark styles the spotlight becomes the dominant compositional device
(`840277`: bright yellow core → deep teal periphery). In light styles it is nearly invisible. It is a
separate layer from the "shading" of A2.11 and from the per-building night glow of A3.4.

---

### A2.11 — Terrain shading and relief (1.6.2), and hachures

**Tag:** `[STATED]` for the shading rule; `[SHOWN]` for hachures/contours.
**Source:** `village-generator/785801`: *"the ground is now drawn shaded: sun-facing slopes are
highlighted and the opposite ones are darkened. In a sense, this feature functionally duplicates
hachures, but unlike hachures…"* (cut off). Shortcuts: `E — toggle relief visualization`,
`H — toggle shading` — **two separate toggles**, confirming relief (hachures/contours) and shading
(lambert-style slope lighting) are independent layers. `[STATED]`

**So VG carries a heightfield** and exposes it three ways, all optionally:
1. **Hachures** — short curved tick marks that run downslope, dense where steep. Clearly visible in
   `248943/images/01.png` (the fan of tick marks east of the village) and `785801/images/01.png`.
2. **Contour lines** — thin smooth closed curves at intervals; `541652/images/01.png` and
   `1657874/images/01.jpg` show them on open ground. Offshore, the same treatment becomes
   **bathymetric bands** (`507254`, `880634`, `1667364`).
3. **Shading** — sun-direction diffuse lighting of the ground. In `785801/images/01.png` the yellow
   ground carries olive-brown darkened patches on the away-facing slopes. Implemented as a full-map
   luminance modulation, below everything else.

The creator's own note that shading "functionally duplicates hachures" is a design admission: the two
are redundant relief cues kept as alternatives for different styles, not as a stack.

**UNKNOWN.** Heightfield source (noise? erosion?); sun azimuth (fixed or style-controlled — the images
are consistent with a fixed NW light, matching the down-right drop shadows); contour interval.

---

### A2.12 — JSON export, City Viewer, and the exported data model

**Tag:** `[STATED]` that JSON export and City Viewer exist and must be fed;
`[INFERRED]` for the model contents, read off the 3-D render.
**Sources:** `village-generator/740285` (1.6.1) and its image `740285/images/01.png`;
`village-generator/382428` context menu lists `Export as >` and `Permalink...`.

The 1.6.1 image is a **City Viewer 3-D isometric render of a VG village**, and it is the best available
X-ray of what the JSON must contain. Legible in it:
- **Palisade** as a closed polyline extruded to a wall, with **gatehouse** structures at road crossings
  (so: polyline + gate list, or a flag per vertex/segment).
- **Buildings** as boxes with pitched gable roofs, individual **footprint polygons** with an orientation,
  plus a height (they vary), plus window/door dots. Roof colour differs from wall colour.
- **Trees** as ellipsoids on trunks with per-instance **position and radius** (radii clearly vary).
- **Village square** as a filled beige ellipse with a **well** object at its centre.
- **Roads** as ribbons with width, including the ones leaving the map.
- **Fields** as flat coloured polygons outside the wall.
- Ground as a plane (no terrain in this viewer render, though VG itself has a heightfield — so either
  elevation is not exported or City Viewer ignores it). `[INFERRED]`

**Integration mechanism.** `382428` comments, creator reply to *BoJustBo*: *"Developing one giant …
application is significantly more difficult for me than several smaller ones with the same
functionality. And so far all the integration users requested could be implemented via GET method
requests."* — **cross-generator integration is done by encoding the handoff in URL query parameters**,
not by a shared runtime. `[STATED]` This is a deliberate architectural stance, and it constrains the
payload to URL-length-safe sizes.

**Permalink/seed format** `[STATED]`, from the URL in `village-generator/589997`:
`https://watabou.itch.io/village-generator?seed=975637253&tags=pond,grove,organic,isolated`
— so: a single integer seed plus a **comma-separated tag list**. Known tags across the slice:
`pond`, `grove`, `organic`, `isolated` (589997), `crossroads` (840277).

---

### A2.13 — Selective outlining (1.6.8) — the most transferable rendering idea in the slice

**Tag:** `[STATED]`.
**Source:** `village-generator/1667364`: *"The contours of visual objects in the generator are now
rendered using shades of the objects themselves, rather than solid black (or any other fixed colour).
Apparently, the technique is called 'selective outlining', although I'm not sure if the term is used
outside of pixel art..."*

**What it does.** Instead of one global outline colour, each object's outline is a darkened (or
otherwise shifted) variant of that object's own fill. Effects: outlines stop fighting the palette in
light/pastel styles; dark styles stop turning into black mush; and every style automatically gets a
coherent line treatment without per-style outline tuning. **This is a one-line change with an outsized
quality return and should be adopted from the start** rather than retrofitted (watabou retrofitted it
at 1.6.8, i.e. after ~4 years of releases).

Visible in `1667364/images/01.jpg` (Alberven): the buildings, trees and shoreline each carry their own
tinted contour, and the whole night image holds together without a single black line.

---

### A2.14 — Styles as data (downloadable JSON)

**Tag:** `[STATED]`.
**Source:** `village-generator/635140`: a collection of downloadable style files served from
`watabou.github.io/village-generator/styles/<name>.json`, later reorganised to
`watabou.github.io/village_styles.html`. *"It doesn't look great and I can't make the browser download
files instead of opening them, so I'll probably have to move all this to Arcana."*

**Twelve named styles**, in the post's own link order (matching `images/01.png`…`12.png`):
`vivid, duskvol, haunted, fall, beach, subtle, default, sand, cold, night, bw, minimal`.

**Style is a first-class, serialisable, user-authorable artifact.** Combined with `426543`'s
`1–6 — apply one of the preset styles` and `0 — apply a random style`, the model is: 6 preset slots +
random + import from JSON. Also `S — open Style window`, and (613514 comments) the Style dialog lets you
specify **more than one colour for trees** (the example uses five). `[STATED]`

---

## A3. Visual and style conventions observed in the images

### A3.1 The layer inventory (from `village-generator/426543`, `[STATED]`)
Every one of these is an independently toggleable layer, which is itself the architecture statement:

`relief (E)` · `fields (F)` · `shading (H)` · `orchards (O)` · `shadows (U)` · `buildings / wilderness
mode (B)` · `roads (R)` · `outlines (P)` · `nameplate (N)` · `grid (Shift+G)` · `trees (Shift+T)` ·
`spotlight (Shift+L)`.
Plus `Ctrl+T — reroll trees` (tree layer has its own sub-seed), `Shift+Enter — reroll current village`
(distinct from `Enter — generate new village`, so there are two RNG scopes).

### A3.2 Trees
- Canopies are **scalloped/cloud outlines**, drawn as individual instances with varying radius, heavily
  overlapping to form woodland. Never a texture fill.
- **Multiple tints per clump** — usually 2–5 greens, sometimes with autumn accents. Style-controlled
  (`613514` comments: five tree colours configured in that example). `[STATED]`
- **Canopy silhouette is style-dependent**: rounded cloud lobes in most styles; **spiky maple/oak
  star-shapes** in 1.5.1/1.6.0/1.6.5 era images (`584696`, `736720`, `731413`); **conifer spikes** in
  the `haunted` style (`635140/images/03.png`).
- Large woodland gets an **interior fill region** in a flatter tone with only the rim drawn as
  individual canopies (`589997`, `1657874`) — a performance/legibility device: draw instances only at
  the boundary.
- **Hedgerow planting**: trees follow field lanes, road edges and plot boundaries in lines
  (`425635`, `308559`, `613514`). This is the main thing that makes VG's landscapes read as farmed
  rather than random.
- **1.6.7 "improved trees"**: canopies gain an inner lobe-pattern and richer per-instance shading
  (`1657874/images/01.jpg`).

### A3.3 Buildings and roofs
- Base primitive: a rectangle with a **dark contour** and a **roof hatch** — a ridge line with short
  perpendicular rafter ticks. Sometimes the gable end is drawn as a pentagon point
  (`736720`, crop `palisade_gate.png`).
- **Thatch variant**: radiating fan lines from a ridge point (`589997/images/01.jpg`).
- **Ruin variant**: `426543` comments confirm *"Ruin"* is one of the **roof types**, and that random
  style assignment can select it. `[STATED]`
- **Wood-grain variant**: long grain lines along the roof (`736720`).
- **Minimal variant**: white/cream rectangle with a doubled outline and no hatch (`584696`, `731413`,
  `635140/images/08.png`), or solid black (`635140/images/12.png`).
- Drop shadow: consistently **down and to the right**, soft, and toggleable (`U`).

### A3.4 Night/lit styles
`541652/images/01.png`, `635140/images/10.png` (night), `1667364/images/01.jpg`: individual buildings
emit a **warm yellow bloom** onto the surrounding ground, and streets/squares carry a glow ribbon.
Only *some* buildings are lit — so "lit" is a per-instance random attribute, not a global effect.
`[SHOWN]` In NG's night styles the same device lights the street network rather than the buildings
(`neighbourhood/687554/images/01.png`).

### A3.5 Water
Consistent across every style that has water:
- Dark bank contour → one or more **nested tone bands** stepping toward the channel centre (or toward
  deep water offshore) → occasionally a white/pale highlight line along one shore.
- Sea/lake gets **offshore bathymetric contour bands** in 3–6 steps (`507254`, `880634`, `1667364`).
- A pale **sand/bank strip** between water and land in several styles.
- Ponds get the same concentric treatment at small scale (`584696`).

### A3.6 The 12-style comparison set — the cleanest style/geometry separation evidence available
`village-generator/635140/images/01–12.png` all render **the identical seed** (same river confluence,
same bridge, same circular square with a building on it, same field mosaic, same building positions).
Comparing them isolates exactly what "style" owns:

| Style (image) | What it demonstrates |
|---|---|
| `vivid` (01) | Saturated greens, navy water with bathymetric bands, red-brown hatched fields, ochre roads. |
| `duskvol` (02) | Greyscale. Fields become pure line hatching on white; water a flat dark mass; trees outline+stipple. |
| `haunted` (03) | Desaturated blue-grey; **conifer/spiky canopies** replace round ones; buildings reduce to hollow glyphs. |
| `fall` (04) | Same greens as default plus orange/red/yellow tree tints — proves tree colour is a *set*, sampled per instance. |
| `beach` (05) | Cream ground, turquoise gradient water, green fields. |
| `subtle` (06) | Monochrome sepia, **line-work only** — no area fills for water or ground; the whole map is hatching. |
| `default` (07) | Green ground, blue banded river, mauve hatched fields, dark-green trees, brown-red buildings, cream roads. |
| `sand` (08) | Yellow ground, turquoise water, **white double-outlined buildings** (no roof hatch). |
| `cold` (09) | Snow: white ground, pale blue water, white canopies with blue outlines, grey hatched fields. |
| `night` (10) | Dark blue; per-building warm glow; pale roads; the square glows. |
| `bw` (11) | Pure line art: black on white, everything hatched, no fills at all. |
| `minimal` (12) | Flat: **solid black building rectangles**, flat grey water, light-grey woodland blobs, white field polygons, no outlines on ground. Some buildings white-with-outline rather than black — a second building class survives even here. |

**The lesson for an original generator:** the geometry layer must expose semantic categories (ground,
water-with-depth, field-with-furrow-angle, road-by-class, building-with-roof-type, tree-with-radius,
wall, square, centrepiece) and the style layer must be free to render each as fill, hatch, outline-only
or nothing. Styles 06 and 11 prove the renderer can drop area fills entirely; style 12 proves it can
drop outlines entirely. **Neither fill nor stroke may be assumed to exist.**

### A3.7 Nameplate
Top-left or top-right. Serif **small-caps** title with a light outline/shadow, and `POP. <n>` beneath
in smaller small-caps. Toggleable (`N`). Population values observed: 96, 180, 240, 240, 370, 380, 490,
1200, 1700. NG's nameplate is different: a **humanist sans-serif**, title only, no population
(`Pearl Ward`, `Cheese Gate`, `Olill Square`, `Stone Circle`, `Beggars Wall`).

### A3.8 Miscellaneous marks
- **Grass tufts**: small zigzag/“w” marks scattered on open ground (`507254`, `626406`).
- **Fences/hedges**: thin wiggly lines between plots (`626406`, crop `abehorn_square.png`).
- **Dotted/dashed paths** running off-map.
- **Field furrows**: fine parallel lines, one angle per parcel.
- **Paper/canvas texture** overlaid on the whole map in several styles (`589997`, `848499`, `736720`).
- **Oil-paint filter** in `731413/images/01.jpg` — a full-image painterly post-process, suggesting the
  render pipeline can accept arbitrary raster post-effects.

---

## A4. Creator's stated design philosophy and constraints (VG)

1. **Many small apps, not one big one.** `382428` comments: *"Developing one giant … application is
   significantly more difficult for me than several smaller ones with the same functionality. And so
   far all the integration users requested could be implemented via GET method requests."* `[STATED]`
2. **Rewrite beats refactor for tangled subsystems.** `589997` on rivers. `[STATED]`
3. **Don't pile up features.** `584696`: *"There could be more of them, but I didn't want pile them up.
   Instead, I'm planning to make another update of this generator later this month."* `[STATED]`
4. **Ship only what he knows how to build.** `613514`: *"These are things that I am interested in adding
   for one or more reasons and I have at least some idea how to do it."* `[STATED]`
5. **Deliberate scope limits on fortification.** `613514` comments: no keeps, no ditches, no
   motte-and-bailey structures — the palisade alone, letting the hill-siting produce the motte look for
   free. `[STATED]`
6. **User requests drive features but not immediately.** Fields were requested "from the moment when the
   color visual style … was first introduced" (`248943`) and palisades were requested in `613514`'s
   comments before shipping in `736720`.
7. **Release cadence honesty.** `626406` documents a release being delayed and padded because he lost
   Patreon access while travelling; `1657874` documents an 18-month hiatus. The devlogs are frank about
   process.

---

## A5. Useful facts from VG comment threads

| Source | Fact | Tag |
|---|---|---|
| `613514` (watabou → Murlynd) | **Map scale: "I don't have an exact value, but yeah, about 300 or maybe 200 meters"** for a 300×300 map. So the whole VG map is a ~200–300 m square — a *village and its immediate fields*, not a parish. | `[STATED]` |
| `613514` (watabou → Murlynd) | Tree colour variety comes from the Style dialog: *"you can specify more than one colour for trees. In this case there are five of them."* | `[STATED]` |
| `613514` (watabou → Andonome) | Villages are "quite often placed on top of (or next to) a hill", so palisade + hill ≈ motte and bailey for free; keeps/bridges/ditches explicitly out of scope. | `[STATED]` |
| `382428` (watabou → BoJustBo) | Integration = GET request parameters; no plan for a merged mega-app. | `[STATED]` |
| `426543` (watabou → stormelemental13) | **"Ruin" is a roof type**, and the random-style button can assign it. | `[STATED]` |
| `426543` (scott2020, unanswered) | Wish-list revealing what VG *lacked* as of that version: dirt/wear, villages built around rocks and big trees, livestock enclosures, **wells**, roof-type variety, tree-type/colour variety. (Wells and tree colours later exist; livestock and wear apparently never.) | user request |
| `613514` (RKB81Labs, unanswered) | Asked for the algorithm, and for separate drop-downs for biomes/seasons/day-night. No reply — **watabou does not publish algorithms on itch**; they go to Patreon or nowhere. | — |
| `541652` (jgkane) | Users treat VG output as a base for 3-D landscape work (Vue d'Esprit) — an export-consumer signal. | — |

---

## A6. Open questions a re-implementer must decide (VG)

1. **How are houses actually placed?** Nothing in this slice explains it. Poisson-disc with
   density-varying radius, rejection sampling, or road-frontage plot subdivision all fit the pictures.
2. **How is the street network generated?** Radial-plus-concentric around the square is obvious in the
   images but its construction (grown? subdivided? offset rings?) is unrecovered.
3. **Construction of the population-density map.** Kernel shape, highway coupling strength, noise
   spectrum, resolution, and whether it is recomputed after water is carved.
4. **Square sizing law** and the exact "distort a little" operator; the full centrepiece table (well,
   large tree, and at least one building case seen in `635140/images/07.png`).
5. **Palisade iso-value and smoothing**; the size distribution behind "(on average)".
6. **Field subdivision**: is the radial-wedge system a second template or polar-space recursion? How
   many field classes (crop, pasture, fallow, orchard, croft) exist and how are they assigned?
7. **River generation direction** (downhill trace vs top-down drawing) and the width/confluence law.
8. **What changed in 1.6.3 and 1.6.6** — absent from the devlog stream entirely.
9. **"Numbered houses" (1.6.4)** — what is numbered, where the number is drawn, and how the order is
   chosen. Not legible at published resolution.
10. **What "improved roads" meant** in each of 1.2.7 and 1.5.4 — two separate unexplained passes.
11. **Whether elevation is exported** to JSON/City Viewer (the 3-D render shows a flat plane).
12. **Spotlight's "smarter"** — confirm whether the centre is auto-fitted to the settlement focus.

---

# PART B — NEIGHBOURHOOD GENERATOR (NG)

## B1. Chronological table

| # | Devlog id | Version / title | Patreon | What changed |
|---|-----------|-----------------|---------|--------------|
| 1 | 315495 | Neighbourhood Generator (1.0.0 launch) | 58808794 (recapping 49191011) | **Launch.** Contains the full statement of "recursive bisection with a twist" / "bent cuts" and the generator's origin story. |
| 2 | 317489 | 1.0.1: a bunch of QOL features | 59046807 | Polish only — *"This small update is all about adding more polish to the app, but before listing the changes let me elaborate a little on the topic of 'uselessness' of this generator (feel free to skip my ramblings)"*. |
| 3 | 362757 | 1.1.0: templates, large buildings and other features | 64375271 | **Templates** (plural, a system) and **large buildings**. *"I guess it means this generator is now a part of the stack of my 'big' generators after all."* |
| 4 | 419786 | 1.2.0: new template, integration with mansions, lots of visual changes | 70917627 | **`ring` template** with its own stated fallback rule; **Procgen Mansion integration**; many visual changes. |
| 5 | 419965 | Keyboard shortcuts | — | Layer inventory (see §B3.1). |
| 6 | 687554 | 1.2.1 | 99067664 | *"I just remembered that I should transplant some of the code from the latest versions of MFCG (and my other generators)"* — **explicit code sharing between generators.** |

---

## B2. Techniques

### B2.1 — "Recursive bisection with a twist" / bent cuts — the core of NG

**Tag:** `[STATED]`, and it is the single most valuable algorithmic passage in this entire slice.
**Source:** `neighbourhood/315495`, verbatim:

> *"Recursive bisection with a twist" is a modification of simple recursive bisection which is a better
> fit for creating city blocks because a) it produces more natural-looking junctions and b) its simple
> recursive nature is less visible for the naked eye. I was going to implement this method in the city
> generator, but at that moment (half a year ago) it wasn't polished enough - too slow and too unstable.
> To see how it would look I've made an app that generated relatively small patches filled with streets
> and buildings using those "bent cuts" - this is where the idea of "neighbourhood generator" came from.
> The new generator is an improved (created from scratch) version of that original neighbourhood
> generator with a better implementation of the bisection idea and with better visuals.*

**Unpacking every claim in that passage:**

1. **Baseline**: simple recursive bisection — cut a polygon with a straight line, recurse on both halves
   until a size threshold. Standard, and known to look mechanical.
2. **The twist**: the cut is **bent**, not straight — a polyline of (at minimum) two segments meeting at
   an interior kink, rather than a single chord. Hence "bent cuts".
3. **Stated benefit (a): "more natural-looking junctions".** `[INFERRED]` reasoning: with straight cuts,
   a child cut meeting its parent produces a clean perpendicular T every time and long collinear runs
   across many generations. A bend breaks collinearity at the junction, so each intersection arrives at
   an irregular angle — exactly the look of an organically-grown street network.
4. **Stated benefit (b): "its simple recursive nature is less visible for the naked eye".** The bend
   destroys the tell-tale binary-partition signature (the eye can no longer trace the cut hierarchy).
   This is an *aesthetic* justification for an algorithmic change and is worth internalising: the
   partition scheme's job is to be **unreadable**, not merely to partition.
5. **It was intended for MFCG first** and was rejected there for being **"too slow and too unstable"**.
   `[STATED]` — a direct warning: bent-cut bisection has robustness problems (degenerate slivers,
   self-intersection, non-termination) and costs more than straight bisection. NG exists because the
   technique was previewed in a throwaway app while it was being stabilised.
6. **NG 1.0 is a from-scratch rewrite** of that preview app, "with a better implementation of the
   bisection idea". `[STATED]` — rewrite-over-refactor again (cf. A2.7).

**Geometry visible in the images** `[SHOWN]`, esp. `315495/images/01.png` and my crop `ng_blocks.png`:
- Block boundaries are **polylines with a visible mid-segment kink**. Rows of houses follow the boundary
  and therefore *turn a few degrees mid-run* — the signature look.
- Streets are the **negative space** between blocks: there is no road fill layer in the launch style at
  all, only background showing through. (Later versions do fill and texture streets — see §B3.2.)
- Street width is roughly constant, implying blocks are produced by **insetting each partition cell by
  half the street width** rather than by stroking the cut lines. `[INFERRED]`
- Junctions are consequently irregular little plazas rather than clean crosses.
- The overall patch has a **ragged organic outline**, and blocks at the rim are clipped by it.

**UNKNOWN (and it is a lot).** Where the bend is placed along the cut (midpoint? random parameter?);
the bend angle distribution; whether the bend is one kink or a smooth arc; how the cut direction is
chosen (perpendicular to the longest edge? OBB long axis?); the stopping criterion; how "unstable" it
was and what the stabilisation was; whether cuts are bent in both children consistently.

### B2.2 — Blocks, plots and perimeter building placement

**Tag:** `[SHOWN]` — never explained in any NG post.
**Sources:** `315495/images/01.png` + crop `ng_blocks.png`; `317489/images/01.png`;
`362757/images/01.png`; `419786/images/01.png`; `687554/images/01.png`.

Every NG image shows the same, very consistent scheme — and it is **categorically different from VG**:
- Each block is **ringed by buildings around its perimeter**, packed edge-to-edge with no gaps, leaving
  an **interior courtyard** of bare ground. This is European perimeter-block morphology.
- Perimeter buildings are **narrow rectangles of varying width** whose short side fronts the street and
  whose depth is roughly constant per block — i.e. the block's inset ring is subdivided into *strips*
  along its boundary. `[INFERRED]` Algorithm: offset the block polygon inward by the building depth,
  then walk the boundary ring subdividing it into randomly-sized frontages.
- Roof tones **alternate light/dark per building**, which is what makes the rows legible as individual
  houses rather than one long wall.
- **Courtyards are filled with trees** (`315495`, `419786`) or left bare (`687554`).
- Some blocks are **entirely green** — a grove/garden block instead of a built one.
- Some blocks are **partially built** (a run of frontage left empty), which prevents the "every block
  fully ringed" monotony. `[SHOWN]`
- The whole block (buildings + courtyard ground) casts a **single drop shadow**, so blocks read as
  raised plateaus above the street plane.

### B2.3 — Templates, and the `ring` template (1.1.0, 1.2.0)

**Tag:** `[NAMED-ONLY]` for the template *system*; `[STATED]` for one ring-template rule;
`[SHOWN]` for the ring geometry.
**Sources:** `neighbourhood/362757` ("templates" among "the most important features of this update"),
`neighbourhood/419786`, verbatim:

> *#### New template: ring*
> *Neighbourhoods of this type contain one or more concentric ring roads. If the smallest ring is too
> small to be cut into blocks, a square, a grove or a single large building is placed there instead*

**What this gives us:**
1. NG has a **template system** — named, pluggable neighbourhood archetypes, of which `ring` is one
   added later. So the bent-cut bisection is the *default* template, not the only one.
2. The ring template lays down **one or more concentric ring roads** first, then cuts the annuli into
   blocks with the same bisection machinery.
3. **Explicit degenerate-case fallback, stated by the creator:** if the innermost ring is too small to
   subdivide, substitute one of three things — **a square, a grove, or a single large building**.
   This is a directly reusable failure-handling pattern: *when a subdivision target falls below the
   minimum, replace it with a landmark rather than producing degenerate blocks.*

**`419786/images/01.png` ("Stone Circle") shows the ring template in full** `[SHOWN]`: 3–4 concentric
cobbled ring streets crossed by radial streets; wedge-shaped blocks between rings, each perimeter-built;
several wedges given over to groves; the innermost ring occupied by **a single large building with a
pyramidal hipped roof** on a circular plaza — the third fallback branch, visibly exercised. A fountain
(blue disc) and a domed building on a platform sit in outer blocks. The outermost ring is broken where
the patch boundary cuts it, so the template is clipped by an independently-generated patch outline.

### B2.4 — Large buildings, and "pins" (1.1.0, 1.2.0)

**Tag:** `[NAMED-ONLY]` + `[SHOWN]`.
**Sources:** `neighbourhood/362757` ("large buildings"), `neighbourhood/419965` shortcut
`P — toggle pins (fountains, wells and large trees)`.

Two distinct special-object systems:
- **Large buildings** — footprints much bigger than a house, sometimes with distinct roof geometry
  (hipped pyramid, dome). They occupy a whole block or a large share of one. Visible in
  `362757/images/01.png` (long dark-red hall) and `419786/images/01.png` (the central hipped-roof
  mansion and the domed rotunda on a wooden platform).
- **"Pins"** — a *named category* comprising **fountains, wells and large trees**, with its own toggle.
  `[STATED]` These are the point-landmark layer. Seen as: a blue concentric-ring fountain
  (`419786`), a small monument/well block in the central square (`362757`), a ringed well and a round
  tower (`687554`).

The VG equivalent is the square's centrepiece ("a large tree or a well", §A2.2) — **the same landmark
vocabulary appears in both generators**, which is a strong hint of shared code.

### B2.5 — Squares

**Tag:** `[SHOWN]`.
`362757/images/01.png` ("Olill Square") has an irregular polygonal cobbled square at the network's
centre with a small monument at its centre — formed by *omitting* the buildings from several adjoining
block frontages, so it is an absence in the block fabric rather than an inserted disc (contrast VG,
where the square is an inserted distorted circle). `419786` instead uses a circular plaza. So NG has at
least two square morphologies.

### B2.6 — Procgen Mansion integration (1.2.0) and MFCG code transplant (1.2.1)

**Tag:** `[STATED]`.
- `neighbourhood/419786`: "integration with mansions" — same mechanism as VG 1.2.8 (§A2.12),
  i.e. GET-parameter handoff of a building footprint.
- `neighbourhood/687554` (1.2.1) verbatim: *"This is a spontaneous update - I just remembered that I
  should transplant some of the code from the latest versions of MFCG (and my other generators)..."*
  **Explicit confirmation that watabou's generators share a common codebase that is periodically
  back-ported between apps.** This is why NG, VG and MFCG converge on identical style vocabularies,
  identical landmark categories, identical export plumbing and identical keyboard-shortcut grammar.
  A re-implementer should mirror this: **one shared engine (geometry, style, render, export), thin
  per-product layout templates.**

### B2.7 — The "uselessness" framing (design philosophy)

**Tag:** `[STATED]` that he wrote it, `[NAMED-ONLY]` for the content (the argument is behind the
Patreon link).
`neighbourhood/317489`: *"let me elaborate a little on the topic of 'uselessness' of this generator
(feel free to skip my ramblings)"*. Combined with `362757`'s *"I guess it means this generator is now a
part of the stack of my 'big' generators after all"*, the arc is legible: NG started as a **technique
demo** for a method destined for MFCG, was self-deprecated as having no practical use, and was then
promoted to a first-class product by user demand. `[INFERRED]` from the two quotes together.

---

## B3. Visual and style conventions observed in the NG images

### B3.1 NG's layer inventory (`neighbourhood/419965`, `[STATED]`)
`trees (T)` · `greens (G)` · `pins — fountains, wells, large trees (P)` · `roads (R)` · `shadows (S)` ·
`Style settings (C)` · `1–6` preset styles · `0` random style · `Tab` tags window ·
`Enter` new neighbourhood · `Shift+Enter` new neighbourhood **and** a new random style.

Note the differences from VG: NG has **`greens`** as a layer distinct from `trees` (greens = the
grove/garden *blocks*; trees = individual instances), has **no** relief/shading/fields/orchards/spotlight
/grid/nameplate-toggle, and **does** have a tags window — so NG shares VG's tag concept but none of its
terrain machinery. NG is a flat, terrain-free generator.

### B3.2 Street surfaces — NG's signature
- Launch (`315495`): streets are **unrendered negative space**.
- By 1.1.0 (`362757`) and 1.2.0 (`419786`): streets are **cobbled**, drawn as a dense field of small
  pebble outlines, with the kerb marked by a line of larger stipple dots. This is NG's most
  distinctive visual device and has no VG equivalent.
- Night styles (`317489`, `687554`): the street network is the **light source** — a warm glow runs along
  every street with stippled kerbs picked out, and the buildings stay dark. The inverse of VG's
  lit-windows treatment.

### B3.3 Buildings
Narrow rectangles with **ridge-and-rafter roof hatching**, alternating light/dark roof tones,
dark contour, down-right drop shadow. Small white dots/squares on some roofs (`419786`) —
chimneys or entrances, unconfirmed. Large buildings additionally get hipped-pyramid roofs (drawn as a
rectangle with X diagonals) or domes (concentric circles).

### B3.4 Trees and greens
Round multi-lobe canopies with a dark contour, clustered in courtyards and in whole "green" blocks.
Far fewer tints than VG (typically 1–2). No hedgerows (no fields to line).

### B3.5 Ground and nameplate
Flat single-tone background — **no terrain, no water, no contours, no shading, no spotlight** in any of
the 5 NG images. The neighbourhood is a **floating patch on an empty field of colour**, with the patch's
own ground tone (and its drop shadow) marking its extent. Nameplate is a **humanist sans-serif**, title
only, top-left, no population figure.

---

## B4. Open questions a re-implementer must decide (NG)

1. **Bent-cut parameters**: bend location along the cut, angle distribution, one kink or several,
   whether the bend is angular or smoothed.
2. **Cut-direction choice** and the recursion stopping criterion (area? aspect? depth?).
3. **What made it "too slow and too unstable"** for MFCG, and what the "better implementation" fixed —
   this is precisely the robustness knowledge a re-implementer most needs and it is not in the slice.
4. **The full template list.** Only `ring` is named; 1.1.0 says "templates" plural and 1.2.0 says "new
   template", so at least two more existed before `ring`.
5. **Patch-outline generation** — the ragged organic boundary that clips everything is never discussed.
6. **Frontage subdivision law** for perimeter buildings (width distribution, depth, corner handling).
7. **Which blocks become greens/squares/partial** and by what rule.
8. **How much of NG is shared code with MFCG/VG** after the 1.2.1 transplant.

---

# PART C — Cross-cutting conclusions relevant to building an original generator

1. **One scalar field should drive settlement form.** VG's "population density map" simultaneously
   fixes the centre, the packing, the extent and the enclosure. `[STATED]` This is a small, cheap,
   high-leverage design decision.
2. **Two different block regimes exist and they are not interchangeable.** VG = free-standing houses
   oriented to roads on open plots; NG = perimeter blocks with courtyards. Choosing between them is the
   main lever between "village" and "town quarter" feel. Both come from the same author and the same
   shared engine, so they are layout templates over a common substrate, not different products.
3. **Make the subdivision scheme unreadable.** NG's entire justification for bent cuts is that the eye
   must not be able to trace the recursion. `[STATED]`
4. **Handle degenerate subdivision by substituting a landmark**, not by tolerating slivers — stated
   explicitly for NG's ring template (square / grove / single large building).
5. **Style must be data, and the renderer must survive extreme styles.** 12 style JSONs over one seed
   prove the renderer must work with no fills (`bw`, `subtle`) and with no outlines (`minimal`).
6. **Adopt selective outlining from day one** (outline = a shade of the object's own fill). `[STATED]`
7. **Every entity must be threaded through generation → 2-D render → JSON export → external viewer.**
   The palisade shipping without export/viewer support (`740285`) is the canonical failure. `[STATED]`
8. **Integration by URL/GET parameters** keeps generators small and separately deployable. `[STATED]`
9. **Expect to rewrite the water subsystem.** The creator did, and said refactoring was not worth it.
   `[STATED]`
10. **Non-square maps are a structural decision, not a rendering one.** VG took "too much time to
    implement and debug" a feature that sounds trivial (`541652`). `[STATED]` Build aspect-ratio
    independence in from the start.
11. **Scale target for a village map: ~200–300 m across.** `[STATED]` Populations rendered: 96→1700.
12. **Independent layer toggles are the architecture.** VG's 12 toggles and NG's 6 are a direct
    readout of the layer decomposition; both generators expose a reroll that re-seeds a sub-layer
    (VG: `Ctrl+T` rerolls trees only) — so sub-seeds per layer, not one global RNG stream.

---

## Appendix — files read

**Posts (27/27, each in full including comments):** all `post.md` under
`research/devlogs/village-generator/{248943, 308559, 382428, 425635, 426543, 507254, 541652, 584696,
589997, 613514, 626406, 635140, 731413, 736720, 740285, 785801, 840277, 848499, 880634, 1657874,
1667364}` and `research/devlogs/neighbourhood/{315495, 317489, 362757, 419786, 419965, 687554}`.

**Images (33/33):** one image in each of the 25 image-bearing directories, plus the 12-image set in
`village-generator/635140/images/`. (`village-generator/426543` and `neighbourhood/419965` have no
images.)

**Local magnified crops made for detail work** (in the session scratchpad, not project files):
`palisade_gate.png` (from `736720/images/01.jpg`), `ng_blocks.png` (from `315495/images/01.png`),
`abehorn_square.png` (from `626406/images/01.jpg`), `oak_fields.png` (from `308559/images/01.png`),
`astfin_sq.png` (from `840277/images/01.jpg`), `stroesia_orchard.png` (from `507254/images/01.png`).

**Not read, by instruction:** no `captures/**/network/bodies/*.js` bundle was opened.

## Critic-2 addendum (VG/NG seat, 2026-09-25)

Resolutions from `research/findings/_critic-vg-ng.md` §1–§2 for items this file marked UNKNOWN or `[NAMED-ONLY]`.
The four devlog quotations spot-checked here (S15–S18) were found verbatim at source.

* **A2.7 "traced downhill or drawn top-down":** drawn first — `River.new` runs before the height field exists and
  the terrain is carved to the course (`profile-village.md` River-course addendum R1).
* **A2.6 numbered houses:** method in `vg-posts-b.md` §2.34 (shift-click marking; creation-order numbering;
  stored in permalinks from 1.6.5); the live build's `NumbersLayer` runs every generation and paints nothing
  unless houses are marked.
* **A2.3 orchards:** the two stated fill modes (80494491: rows, or "more chaotically" for irregular plots) are
  recorded as `FarmlandView.getRows` versus `FarmlandView.getPoisson`, one per orchard, with `validateTree`
  clipping to the plot.
* **A2.2 "a building on the square" (`635140/07`):** the third centrepiece kind, `props.Tower` (1 : 1 with
  `SquareBuilder.addCenterpiece` alongside `props.Tree` and `props.Well`); "none" is the stated water-overlap
  suppression.
* **A2.9 palisade "iso-contour":** the recording shows a hull-based construction (`ConvexHull.ofSet` →
  32-segment cubic smoothing → raster push-off from buildings → gates where roads cross); the density map enters
  through which buildings count as "populated". Level-set reading not supported by the call set.
* **A2.5 roads / A6.1 houses:** trackers (35854256 `[STATED]`; 4–11 per village, ≈ 30–40 steps each) and
  rejection sampling along frontages (`buildAlong → Building.new → validateBuilding → addBuilding`, 63–82 %
  acceptance).
* **B2.2 lots "walk the ring into strips":** refuted — NG lots come from the same recursive `Bisector.partition`
  applied per block, then `indentFronts` setback and `validateOuter`, which discards ≈ 42 % of lot leaves; the
  perimeter-block look is that filter.
* **B2.1 "blocks by insetting half the street width":** both happen — `PolyCreate.stripe` builds the corridor in
  the model and the view strokes each street at `getStreetWidth`; the ring template's `BisectorEx` subtracts the
  corridor inside the cut.
* **B2.3 ring template:** recorded in full (`profile-neighbourhood.md` RA-0..RA-9): R closed 48/50-vertex ring
  roads at one width, one hole-aware `BisectorEx` partition per annulus, a centre disc that is either bisected
  (5 cuts → 6 blocks) or replaced by a `Green` grove — the stated fallback seen running.
* **B4.4 template list:** Area, Street, Square (round and rectangular branches), Ring — nothing else executes in
  10 samples; Junction/Park/River bank/Bridge/Port were only planned (64375271).
* **Part C item 12 (sub-seeds per layer):** VG re-seeds `Random` six times per regeneration; NG's
  `Random.save/restore` brackets random tag rolling, not naming.
