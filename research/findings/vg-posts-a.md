# Slice: `vg-posts-a` — watabou Patreon "🏡 Village Generator", older half (14 posts, 2020-04-10 → 2023-06-05)

**Scope.** All 14 directories from `worklists.json → watabou-village[0:14]`, read completely:
`post.md` bodies **including full comment threads**, plus every file listed under "Images (local
files)" — 71 image files total, of which 8 turned out to be **JSON palette attachments mis-saved with
a `.jpg` extension** (post 42521165) and are transcribed verbatim below; they are the single most
valuable artefact in the slice.

**Source paths** are all relative to `/Users/cstokes/Desktop/Maps/research/patreon/watabou-village/`.
Citations use `<post_id>` and `<post_id>/images/NN.png`.

**Evidence tags** used throughout: `[STATED]` (creator explicitly describes the method),
`[SHOWN]` (visible in an image, not explained), `[INFERRED]` (my reconstruction, reasoning given),
`[NAMED-ONLY]` (feature announced, no method given).

**Method note / honesty.** Image reads in this environment silently drop attachments past a per-request
media limit. Every image in this slice was re-read in pairs until an actual image was returned; nothing
below is described from a dropped read. Byte-identical duplicates (verified by md5) were viewed once:
`37407181/05`≡`04`, `50688261/09`≡`08`, `57968729/04`≡`35854256/04`.

**Relationship to the sibling slice `vg-ng-devlogs.md`.** That slice worked from the itch.io devlogs
and reported "how streets are generated" and "the population-density map's construction" as UNKNOWN.
**This slice closes both**: post `35854256` (the launch post) states the core pipeline outright. Where
we agree I say so; where I can now upgrade a tag from `[INFERRED]` to `[STATED]` I flag it.

---

## 1. Chronological table

| # | Date | Post id | Title / version | What changed (relative to the previous iteration) |
|---|------|---------|-----------------|---------------------------------------------------|
| 1 | 2020-04-10 | `35854256` | **Village Generator** (1.0.0, launch) | First release. **States the whole algorithm**: height map → gradient vector field → "trackers" run through the field draw roads; a separate "density map" decides where roads branch more and where more buildings go. Two styles: *minimalistic* and *hand-drawn*. No water, no trees, no fields, no POIs. Known defect: villages with population 0. |
| 2 | 2020-04-20 | `36199609` | **1.1.0** | **Waterbodies**: two types — *coast* and *river* (rivers "much more difficult than expected"). PNG export. Both styles improved; "large buildings" rendered as **polyominoes** (minimalist) / rectangles with small towers (hand-drawn). "Large buildings" redefined as *special locations*, not necessarily houses. Also: *no empty roads*, improved village names, "large buildings along streets". Water and the village area are still **generated independently** (creator's reply). |
| 3 | 2020-05-22 | `37407181` | **1.1.1** (joint MFCG/CityViewer post) | VG: "really small layout improvements" + **basic JSON export** → viewable in City Viewer 3D. Height-maps **not** exported. Nothing exists beyond map borders, so 3D looks truncated. JSON moved off strict GeoJSON to a "GeoJSON-like" format. Cross-pollination: **MFCG 0.7.5 adopted VG's in-block building placement** for its outskirts — sparser, but all proper rectangles. |
| 4 | 2020-06-22 | `38498864` | **1.2.0** ("Midsummer") | New default **"Vivid"** colour style (TTRPG local-map palette). **Relief visualization** — "something (but not exactly) like hachures", per-style, disableable. **Context menu** replaces hotkeys. **Parameters dialog**: Map size {Small/Medium/Large}, Pop. density {Low/Med/High}, Water {None/River/Coast}. **Port areas**: piers inside the village border, connected to the road net, plus buildings along the shore. Village renaming. Map rotation (Shift+drag). POIs and trees deferred (reasons given). |
| 5 | 2020-09-29 | `42144467` | *WIP: trees* (not a release) | Design study of forest depiction: "group of separate trees" (large-scale convention) vs "homogeneous area" (small-scale convention); VG sits at an "inconvenient middle scale". Per-style tree rendering. Trees are slow to generate and draw. Raises the "if trees, then why no fields/hedges/wells" problem. |
| 6 | 2020-10-08 | `42521165` | **1.2.2** | **Trees shipped** (off by default, `Show trees` submenu; "Some" vs "Many" semantics explained in comments). **Customizable palettes** as **JSON** files (not SVG as in MFCG) — 8 real palette files attached, transcribed in §4.1. **Islands** (third water config). New **"Calligraphy"** style. Land edges drawn differently. Streets generation optimized. POIs exist internally (names in browser console) but are not displayed. |
| 7 | 2020-11-20 | `44111493` | **1.2.3** | **Removed "Calligraphy", "Scribble", "Minimalist" styles** (poll + printer-friendliness complaints). **Three tree methods**: *Simple* (old), *Cotton*, *Blobs* (new default, "very many inner parameters"). New **Style settings** dialog with presets *Default / Night / Outlines / Minimal*; custom styles without hand-editing JSON; style values persisted at startup. **SVG export** (no title, no lights, default trees only). |
| 8 | 2021-04-30 | `50688261` | **1.2.5** | **Fields.** Stated design requirements and known bugs (one-bank rivers; "thorn" defects from the polygon-Boolean library). Fields exported in JSON. Coast/river/island shapes "more interesting and diverse"; **rivers narrower and more meandering**; waterbody generation optimized. Several **dock/pier bugs fixed** (piers intersecting each other or ending on land). Colour-picker + **font settings**; tab overflow via "…". **Two** sand colours (roads vs banks); road outlining toggle; new **Paper** colour for text outlining. Trees still slow; **tree coverage rerollable alone** (Shift+T). |
| 9 | 2021-10-03 | `56941736` | (PS + VG joint update) | **Perilous Shores → VG integration**: click a settlement in PS, open it in VG. Required implementing **permalinks** in VG (5 days) — which also gives save/restore. Two builds: itch.io and `watabou.github.io`. **New SVG export method** (~1K lines shorter) — now exports simple+cotton trees, lights, and the title. **Population number is editable.** |
| 10 | 2021-10-28 | `57968729` | **1.2.7** | **Improved fields** (five concrete rules, §3.10) — max one house per field or the *field* is discarded; **field size scales inversely with population density**; trails truncated at field edges with their terminal house moved and re-aligned; bad-shaped fields discarded; alignment to main road/water near the centre → "line up in circles around the centre" further out; **one-bank-river bug** traced to the *earth-bounds* computation. **Improved roads**: fewer crossroads, more T-junctions, new right-angle turns. **"Lonely houses"** tuned (fewer trails, longer trails). New *Planks* colour; **Shadow {Colour, Length, Angle}**; hachures drawn more evenly; **furrows drawn as dashed lines**; island shapes more diverse; options persistent. POIs still undisplayable (tried PS-style "stickers", looked wrong). |
| 11 | 2022-05-18 | `66544756` | **1.2.8** | **Procgen Mansion integration** (right-click a building → *Open in PM*). All VG buildings are **rectangular**, which makes boring PM floor plans, so PM was allowed more intricate plans; **building dimensions correlate with its size on the map**. New **"Wilderness"** option — hides buildings, secondary roads and piers (fields not auto-hidden). **Optimization**: generation had been taking "up to a couple of seconds"; now much faster. **Drawing** remains the bottleneck. |
| 12 | 2022-09-08 | `71653886` | **1.3.0** | Trees: *Simple* de-geared; *Cotton* fluffier/irregular (like Neighbourhood); new **"Improved"** method (outer crowns normal, inner crowns muted, interior a solid colour blob); **Foliage** multi-colour replaces Light/Dark forest; trees smaller relative to houses; **shadows of varying length**. Buildings: **one** roof colour (unlit = colour × shadow colour); **multiple** roof colours allowed; separate roof-hatching colour; **roofs faked in perspective with a "Slope" parameter**. Relief: **Grass** (zigzags) and **Contours** added — "all three methods really just draw shapes along isolines"; **isolines built more evenly across the map** to stop hachures overlapping. Ground+hachure colours merged into multi-colour **Ground**. **Tags dialog** replaces Map parameters (`island`, `farmland`, `uncultivated`, `organic`). **Map rotation removed** to enable non-square maps. Multi-colour fields; *Hot* and *Cold* presets; **default size now "medium" (formerly known as "small")**. |
| 13 | 2023-03-25 | `80494491` | **1.4.0** | **Village square** — full algorithm stated (§3.12). ~half of villages get one; `no square` tag. **Orchards** — fields overlapped by ≥1 house become orchards (§3.11); `no orchards` tag; hideable. Per-class **road line thickness** (highway/secondary/trails) — explicitly **decoupled from the geometric street width** used to space houses. Outlining becomes **none / hard / soft** for roads and fields. **"No. of bands"** water gradient (PS-style + extra smoothing). **All tree methods except "Improved" removed.** |
| 14 | 2023-06-05 | `84106820` | **1.5.0** | **Non-square maps** (custom width/height + size drop-down, like Perilous Shores). **Isolated** tag (no highway at all) and **Dead end** tag (highway terminates at a village square near the centre; "makes more sense for coastal villages"). Crossroads attempted and postponed. Tree **Shape**: *Cotton* / *Spiky*. **Roof type**: *Gable* / *Hip*. Bridges drawn in more detail ("like 6 lines of code"). **Comment gives the map-size constants: 300 / 500 / 800, and the JSON unit = 0.7 m** (medium map = 350 × 350 m). |

---

## 2. The one-paragraph reconstruction (read this first)

VG builds a **scalar height field** over a square (later rectangular) map, derives a **gradient vector
field** from it, and integrates a set of **"trackers"** (streamline walkers) through that field to lay
down **road centrelines**; a **second scalar field, the "density map"**, modulates how often those
trackers branch and how many buildings are dropped per unit length of road. Water (coast / river /
island) is a separate generator that carves the land polygon. Buildings are **axis-aligned-to-the-road
rectangles** placed along road centrelines at a fixed setback. Everything else added between 2020 and
2023 is a *consumer* of those four primitives (height field, density field, road graph, land polygon):
fields tile the leftover land and take their size from the density field; forests fill the land minus a
clearance buffer around roads and houses; the square is a distorted circle placed at the density
maximum; relief is drawn as strokes along **isolines of the height field**; orchards are fields that
happen to contain a house. The renderer is a **layered flat-colour illustrator** driven by a JSON
palette with ~17 named slots.

---

## 3. Techniques

### 3.1 — Core generation pipeline: height map → gradient field → trackers → roads `[STATED]`

**Source:** `35854256` (launch post), verbatim:

> "First, a height map is created, from which a gradient vector field is derived. Then a set of
> 'trackers' are run (affected by that gradient field) to draw roads. A separate 'density map' is
> created to decide in which areas roads should branch more and where more buildings should be placed.
> That's all more or less."

**Problem it solves.** Producing a settlement layout that *reads as terrain-shaped* at village scale.
The creator states the motivation explicitly in the same post: MFCG has a small-town button "but we
know it doesn't work too well. The smaller the town, the less it resembles anything real." MFCG's
approach (city-wide Voronoi/ward subdivision inside a wall) degenerates below a few hundred buildings;
VG replaces subdivision-first with **road-first**.

**Also stated in the same paragraph:** "The algorithm is completely different from the one I'm using in
MFCG. I tried it before for city generation, also **Procgen Tarot** and **Winter Trees** are working on
the same principle." — i.e. the tracker/vector-field machinery is a *reusable watabou component* that
predates VG, and its other two uses are a card-art generator and a tree-drawing toy. That is strong
evidence the tracker is a general **streamline/branching-walker** primitive (the same code that grows
tree branches grows roads).

**Algorithm as far as recoverable:**
1. Generate a height field `H(x,y)` over the map rectangle. (Construction not stated — see §3.2.)
2. Derive `G = ∇H` (a vector field over the same domain).
3. Seed a set of trackers; integrate each one step-by-step, its heading "affected by" `G`, emitting a
   polyline that becomes a road centreline.
4. Trackers branch; branch probability is read from the density field `D(x,y)` (§3.3).
5. Buildings are dropped along the emitted centrelines, count per unit length read from `D`.

**The "affected by" coupling is later quantified** `[STATED]`, in `71653886` (1.3.0), describing the
new `organic` tag: *"The 'organic' tag forces roads to follow the relief closely making them wavy and
curved. **Normally, they 'resist' the relief trying to stay straight.**"*
→ The tracker's heading update is a **blend of its current heading (momentum / straightness term) and
the field direction**, with a weight that the `organic` tag raises. `[INFERRED, high confidence]` A
minimal form matching every image:
`dir_{t+1} = normalize( (1-w)·dir_t + w·F(p_t) )`, `p_{t+1} = p_t + s·dir_{t+1}`,
with `w` small by default (straight-ish roads, visible in `57968729/05` Saltwood) and large under
`organic` (wavy roads, visible in `35854256/03` Bear Hill, whose highway makes a full lazy loop).

**Which direction is `F`?** `[INFERRED — this is the single biggest open question in the slice.]`
The post says roads are affected by *the gradient* field. But the images repeatedly show roads running
**along contours, not down them**:
- `44111493/04` (Mapoar, island): the entire street net is a family of **concentric arcs** plus short
  radial connectors, and the faint hachure strokes on the same image run in the *same* arc directions.
- `42521165/12` (Emerest, island): two road arcs concentric with the coast.
- `50688261/07` (Pumpkinde…): the hachure arcs and the lanes share curvature.
The most parsimonious reading is that `F` is the **gradient rotated 90°** (the contour-tangent field)
for village streets — i.e. streets are *streamlines of the contour field* = they hold a constant
altitude — while the **highway is free to cross contours** (it visibly climbs and descends in
`38498864/04`, `71653886/08`). A re-implementer must decide: single field with per-road-class rotation,
or two fields. Nothing in this slice settles it.

**What is definitely NOT used:** no Voronoi, no straight skeleton, no OBB bisection is mentioned
anywhere in this slice for VG. (Those are MFCG/NG techniques. VG's only stated Boolean-geometry
dependency is a *polygon Boolean operations library* used for fields — see §3.10.)

**Failure mode + handling `[STATED]`:** `35854256` Update: villages with **population 0** are generated;
the creator's planned fix is a **retry loop** — *"create another village until its population is larger
than zero"*. This is the classic watabou failure strategy (reject-and-regenerate the whole map) and it
means population is a *derived* quantity computed after layout, not an input. Reinforced by `56941736`:
*"you still can't request a village with a specific number of villagers, but you can generate a village
and say that this many people live there"* — the printed population is an **output** you may override
textually.

**UNKNOWN:** the tracker step size; how many trackers are seeded and where; the termination rule;
whether trackers snap to each other on near-miss (they clearly *do* form closed blocks in
`38498864/04` and `71653886/08`, so some junction-merging exists); how the highway's entry/exit points
on the map border are chosen.

---

### 3.2 — The height field / relief `[STATED it exists]` + `[SHOWN]` + `[INFERRED construction]`

**Sources:** `35854256` ("a height map is created"); `37407181` ("height-maps are not exported ... when
they are implemented [in City Viewer] they should greatly improve the quality of the final image");
`38498864` (relief visualization added); `71653886` (isolines).

**What's recoverable:**
- It is a genuine 2-D scalar field over the map, not a per-cell label: it supports a gradient (§3.1),
  it supports **isolines** (`71653886`: *"All three methods really just draw shapes along isolines.
  Isolines themselves are now built more evenly across a map"*), and it is meaningful as a 3-D surface
  (`37407181`: exporting it to City Viewer would "greatly improve the quality of the final image").
- It is **not** exported to JSON as of 1.1.1 (`37407181`) — City Viewer renders VG villages on a **dead
  flat plane** (`37407181/03`, visibly flat to the horizon).
- Its character is visible in `71653886/07` (the *Contours* style): long, smooth, nested, gently
  branching isolines with only a handful of extrema across the whole map, and no high-frequency
  wrinkle. `[SHOWN]`

**`[INFERRED]` construction.** The contour picture in `71653886/07` and the broad, sparse hachure fans
in `38498864/04` are consistent with a **low-octave smooth field** — a small sum of radial bumps/bowls,
or 1–2 octaves of value/Perlin noise heavily smoothed — and are *not* consistent with multi-octave
fBm (which would produce crenellated contours) nor with an erosion simulation (no dendritic valleys).
Cheap, deterministic, and it makes gradient evaluation trivial. `35854256`'s own framing ("also Procgen
Tarot and Winter Trees are working on the same principle") supports "cheap analytic field".

**Relief rendering is a separate concern** — see §3.14.

**UNKNOWN:** grid resolution vs analytic evaluation; whether the height field is edited after water is
carved (rivers ought to sit in valleys; the 1.2.5 note that fields on one bank was really an
*earth-bounds* bug suggests water and terrain are only loosely coupled); amplitude/units.

---

### 3.3 — The density map `[STATED]`

**Sources:** `35854256` (named and given two jobs); `38498864` (the user-facing dial and its two
effects); `57968729` (field size is a function of it); `80494491` (the square is placed at its maximum).

Verbatim, `35854256`: *"A separate 'density map' is created to decide **in which areas roads should
branch more** and **where more buildings should be placed**."*

Verbatim, `38498864` (the *Pop. density* parameter): *"This parameter affects both **the number of
secondary roads** and **the number of buildings per unit of length along those roads**."*

So the density field has exactly two primary consumers, and the UI dial is a global scale on it. Two
later consumers were added:
- `57968729` (1.2.7): *"fields are smaller in areas with higher population density"* — the field is
  sampled *per candidate field polygon* to pick its target size.
- `80494491` (1.4.0): *"the generator finds a place on a map with high population density — often it's
  a place on the highway"* — the square is placed at (near) the argmax, and **the highway biases the
  field**, which is stated only indirectly here ("often it's a place on the highway").

**Interaction with map size** `[STATED]`, `38498864`: *"On average, the larger the map is, the larger
the village is spawned on it."* → density field spread scales with map size; it is not a fixed-radius
blob dropped on a bigger canvas.

**`[INFERRED]` construction.** A smooth unimodal (occasionally bimodal — see the two-lobed villages in
`38498864/05` Mardmere) bump centred on a seeded village centre, plus a ridge term along the highway
polyline, scaled by the map-size and the Low/Medium/High dial. Reasoning: (a) the built-up area in
every image decays smoothly outward with no hard boundary; (b) houses thin out with distance rather
than stopping; (c) the square lands on the highway "often" but not always; (d) Mardmere at Large+High
shows two merged lobes, so the field is a *sum of bumps*, not a single analytic blob.
This agrees with the sibling slice `vg-ng-devlogs.md §A2.1`, which reached the same reconstruction from
different evidence; this slice **upgrades "affects branching and building counts" from inferred to
STATED**.

**UNKNOWN:** whether "population" printed on the map is `∫D` or a count of buildings × household size.
Observed printed populations across this slice: 96, 130, 180, 200, 400, 430, 490, 570, 680, 860, 880,
930, 1200, 1400, 5900. The 5900 case is Large+High (`38498864/05`), i.e. the dial spans ~60×.

---

### 3.4 — Road hierarchy and rendering classes `[SHOWN]` + `[STATED]` in parts

Four classes are consistently distinguishable in every image:

| Class | Geometry | Default rendering | Notes |
|---|---|---|---|
| **Highway** | one polyline crossing the whole map, enters and exits at the border | widest ribbon: light "sand" fill + thin dark casing on both sides | can be removed (`isolated` tag) or truncated at the square (`dead end` tag) — 1.5.0 |
| **Secondary streets** | the branching net inside the village | narrower ribbon or a single dark line depending on style | count driven by the density dial `[STATED, 38498864]` |
| **Lanes / field tracks** | short connectors, field-edge access | thin single stroke | visible between field blocks in `57968729/03` |
| **Trails / footpaths** | leave the village, often leave the map | **dashed or dotted** | §3.5 |

`80494491` (1.4.0) `[STATED]`: *"You can now specify the thickness of lines used to draw the highway,
secondary roads and trails. **This doesn't affect how far from each other houses on opposite sides of a
street are placed.**"* — this is an explicit statement that **stroke width is a render property and the
street's geometric width is a separate model property**, which is exactly the separation a
re-implementer needs (houses are offset from the *centreline* by a per-class setback constant).

**Road-pattern changes in 1.2.7** `[STATED, 57968729]`: *"Road patterns are made more diverse … with
fewer crossroads, more T-junctions, and newly introduced right angle turns. It's more noticeable when
roads do not wiggle too much and overall it makes villages more compact and less regular."*
`[SHOWN]` Comparison evidence: pre-1.2.7 `42144467/05` (Scribble) shows a *ladder* — five near-parallel
streets crossing the highway obliquely, i.e. many 4-way crossings; post-1.2.7 `57968729/05` (Saltwood)
shows Ts and a hard right-angle turn and almost no X crossings. `[INFERRED]` implementation: when a
tracker approaches an existing road, instead of crossing it, it is *terminated on it* (T) or *snapped to
a 90° turn* with some probability — a junction-resolution rule, not a new growth rule.

**Junction rendering** `[SHOWN]`: junctions never show seams in any style, including flat fills — the
ribbons are drawn as overlapping stroked polylines with round caps/joins, and the casing is drawn in a
pass under the fill. Evidence: `80494491/04`, where six roads meet the square's fill with no visible
boundary.

**The `organic` tag (1.3.0)** `[STATED]` — see §3.1; it is a *weight on the field term*, not a
different algorithm.

**Highway topology tags (1.5.0)** `[STATED, 84106820]`:
- `isolated` — "do not include a highway at all, which implies that such villages are not connected to
  other villages/towns by any roads of notice (although often there are trails running somewhere beyond
  the edges of a map)".
- `dead end` — "do include a highway, but it doesn't run from one end of a map to another. Instead, it
  terminates at a village square somewhere close to the centre of the map."
- Creator's forward-looking note: *"maybe in future updates I will make it the default road
  configuration replacing the 'isolated' tag with 'highway'"* — i.e. he considers a through-highway the
  *less* typical real configuration.
- **Crossroads (two intersecting large roads) was attempted and abandoned as harder than expected.**
  This is a useful negative datapoint: multi-highway topology is *not* a free consequence of the
  tracker model.

`[SHOWN]` `84106820/03` shows the `dead end` case: the highway descends from the top border and ends at
the square; a narrower road continues south.

---

### 3.5 — Trails and "lonely houses" `[STATED]`

**Source:** `57968729` (1.2.7), verbatim:

> "One of the features of this generator is 'lonely houses'. Such houses are situated outside the edge
> of a village and connected to it by a trail. **This wasn't something I planned, but more like a
> byproduct of other processes in the generator.** The problem was that sometimes there were just too
> many of them and it looked odd. … First, there are fewer trails running from a village now. Second,
> these trails are made longer on average, so now they run outside the edges of the map more often
> (like to another village or a dungeon or whatever), thus fewer 'lonely houses'."

This is the most informative single failure-mode paragraph in the slice:
- **Emergent artefact**: a tracker that wanders out of the dense zone still gets a building dropped on
  it, producing an isolated house. The creator kept it (it reads as a farmstead) and then *tuned* it.
- **The fix is distributional, not structural**: fewer trail-trackers spawned, each with a longer target
  length so that its endpoint tends to fall outside the map rectangle (where the house is culled).

`[SHOWN]` Lonely houses at the end of dotted trails appear in essentially every map: `35854256/03`
(two), `36199609/03`, `38498864/04` (four), `50688261/05`, `57968729/03`, `71653886/08`, `66544756/03`.
In the *Outlines* island map `44111493/04` two lonely houses sit inside **forest clearings**, reached by
dotted trails — showing the forest-carving pass (§3.13) respects trail+house as well as street+house.

**Interaction with fields (1.2.7)** `[STATED]`: *"If a trail intersects a field, this trail is truncated
at the point of intersection. If the trail had a house at its end, the house is moved to the new ending
point of the trail and aligned to the field's edge."* — an explicit **repair** rule rather than a reject
rule, and a nice pattern: move the dependent object to the clipped endpoint and re-orient it to the
clipping edge.

---

### 3.6 — Building placement and footprints `[SHOWN]` + partial `[STATED]`

**Stated facts:**
- Count per unit length along a road is read from the density map (`35854256`, `38498864`).
- **All buildings are rectangles**: `66544756` — *"In Village Generator all buildings on a map are
  currently rectangular in shape."*
- **Building dimensions correlate with its size on the map** (`66544756`, in the PM-integration
  context) → the model stores a real footprint size per building, not a symbol.
- Houses on opposite sides of a street are spaced by a geometric street width, independent of stroke
  width (`80494491`, quoted in §3.4).
- `36199609` (1.1.0) changelog: **"No empty roads"** — a road with no buildings on it is not kept.
  `[INFERRED]` a post-pass that deletes road segments whose building count is zero; this is why VG maps
  never show bare stub streets, unlike the 1.0.0 image `35854256/03` where several street stubs end in
  nothing.
- `36199609`: **"'Large buildings' along streets"** — large buildings were moved from arbitrary
  positions onto the street frontage.
- `50688261` (1.2.5) lists building generation among the things optimized.

**`[SHOWN]` geometry, consistent across all 14 posts:**
- Footprints are elongated rectangles, roughly 2:1 to 5:1, long axis **parallel to the street tangent**.
- A **uniform setback** from the centreline; rows on both sides of a street are visibly symmetric
  (`42144467/05`, `71653886/08`).
- Buildings do not overlap each other or the road; spacing along the row varies (jittered gaps).
- Around the **square** (1.4.0+), houses are laid tangentially to the square's boundary, forming a ring
  (`80494491/04`, `84106820/03`) — i.e. the same "place along a curve with setback" rule, with the
  square's outline used as the curve.
- On **coasts**, an extra row of buildings runs along the shore ("port areas are also populated by
  buildings along the shore", `38498864` `[STATED]`; `[SHOWN]` `42144467/05`, `71653886/06`) — again the
  same rule with the shoreline as the curve.

**`[INFERRED]` placement algorithm** (the simplest rule that reproduces every image):
for each road polyline, walk it at arc-length steps drawn from a distribution scaled by `1/D(p)`; at
each step pick a side (alternating or random), offset the point by `setback` along the normal, build a
rectangle with the long axis along the tangent and dimensions drawn from a size distribution, reject
if it collides with an existing building / water / another road, otherwise keep. This is essentially
the algorithm MFCG borrowed for its outskirts (`37407181`: *"For their placement within a block I use a
new algorithm similar to the one in Village Generator. The con is that they are placed **more
sparsely**, which is probably OK for semi-rural areas. The pro is that **they all are proper
rectangles**."*) — the "more sparsely" con is the signature of a **rejection-sampling** placer.

**Roof rendering is a separate later concern** — see §3.15.

**UNKNOWN:** whether sides alternate deterministically; the size distribution; whether a building's long
axis can flip to perpendicular (a few gable-end-on buildings appear in `71653886/08`, ambiguous).

---

### 3.7 — "Large buildings" = special locations `[STATED]`

**Source:** `36199609`, verbatim:

> "the quotes around 'large buildings' are there for a reason. **'Large buildings' are actually special
> locations, not necessarily houses — monuments, natural features (a tree, a rock), small special areas
> (a graveyard).** Maybe I will depict them differently in the future."

Rendering, per style, in 1.1.0 `[STATED + SHOWN]`:
- *Minimalist*: **"they look like polyominoes, sometimes pretty weird ones"** — `[SHOWN]` `36199609/03`
  has an L-/plus-shaped dark blob near the centre-right, clearly a union of unit squares.
- *Hand-drawn*: "still rectangular, but with small towers on top. The idea was to make them look like
  churches, but even if they don't, it's still better than it used to be." `[SHOWN]` `35854256/04` and
  `36199609/05` show an oversized hatched rectangle carrying a cross/X mark.
- In later Vivid maps, they appear simply as **larger rectangles with a small triangular gable marker**
  (`71653886/08` centre and mid-right; `80494491/03` top).

This is the seed of the POI system that never shipped in this window (§3.21).

---

### 3.8 — Water: coast, river, island `[STATED]` + `[SHOWN]`

**Timeline.**
- 1.0.0: none. 1.1.0 (`36199609`): **coast** and **river**. *"The whole task turned out to be more
  difficult than I expected, especially with rivers. In the end everything kind of works, but not
  perfectly."*
- 1.2.0 (`38498864`), self-assessment: *"Coasts are mostly OK, but too many rivers are boring or weird
  and not something decent in-between. And I'd like to add new options such as islands, river mouths et
  al."*
- 1.2.2 (`42521165`): **islands** added. *"Generated islands are not very realistic, but I think they
  look cute. They remind me of those images of tiny Scandinavian islands with just one or two
  cottages."* Also "land edges are now drawn differently (in most cases better than before)".
- 1.2.5 (`50688261`): *"The shapes of coasts, rivers and islands are made more interesting and diverse.
  **Rivers are narrower and more meandering now.** Generation of waterbodies was optimized but I've
  found the most computationally expensive piece of code there too late."*
- 1.2.7 (`57968729`): "Water details are drawn more smoothly", "Island shapes are made more diverse".

**The decoupling defect** `[STATED]`, `36199609` creator reply — the most architecturally useful
sentence about water in the slice:

> "Currently **the water and the 'potential village area' are created independently.** As a result, in
> some cases when they don't overlap, villages may appear weirdly detached. I'll try to fix it."

So in 1.1.0 water generation and settlement generation were two independent passes over the same
rectangle, intersected only implicitly. Contrast the user complaint that prompted it (Allen Varney):
*"all these villages seem aloof from the water, like the people didn't even know it was there."*
`[SHOWN]` `35854256/04` (Greenchurch) is the exhibit: a ring-road village sitting inland with a bay it
ignores.

**The "earth bounds" bug** `[STATED]`, `50688261` → `57968729`. Symptom: *"When there is a river on a
map, fields are spawned only on one of its banks… Sometimes there are no fields spawned at all."*
Diagnosis a release later: *"This wasn't actually a problem with fields, but **with the method I used to
calculate earth bounds**."* → there is an explicit **land polygon ("earth bounds")** computed from the
waterbody, and it was being computed as a single connected region, so a river bisecting the map left one
half outside it. A re-implementer should model land as a **possibly multi-component polygon set** from
day one.

**`[SHOWN]` rendered water anatomy** (Vivid, stable from 1.2.0 on):
- a **deep-water** fill, a **shallow-water** band hugging the shore, and one or more **ripple/tide**
  contour lines offshore drawn in a lighter hue (`waterTide` in the palette);
- a **sand/beach** band on the land side of the shoreline (`sand`);
- from 1.4.0, an *N-band* gradient (`80494491`: *"No. of bands allows you to use the existing Shallow
  water and Deep water colour parameters to draw water as gradient (as in Perilous Shores but with
  additional smoothing)"*) — visibly 3–4 nested bands in `71653886/06` and `84106820/04`.
- Rivers additionally carry a **white centre line** (thalweg) in several styles: `57968729/05`,
  `66544756/04`.
- Islands get a full concentric halo: `42521165/12` (Emerest) and `80494491/03` (St Roesia) show
  shallow ring + two dashed offshore contour lines + sand rim.
- In the mono *Scribble*/*Outlines* styles water reduces to a fill plus **dash-dot shore-parallel
  lines** (`42144467/05`) or just **2–3 fine offshore contour lines** (`44111493/04`).

**UNKNOWN:** the shape generator for coasts/rivers/islands (no method is given anywhere in this slice);
whether rivers are traced down the height field's gradient (plausible, and would make the roads-vs-river
relationship coherent) or generated independently (which the 1.1.0 quote suggests for that version at
least); how river width is set; how the "more meandering" 1.2.5 change was implemented.

---

### 3.9 — Ports: piers, docks, bridges `[STATED]` + `[SHOWN]`

**Piers / port areas** `[STATED]`, `38498864` (1.2.0):
> "**If a layout allows**, some piers are placed within a village's border and connected with the rest
> of the village. This feature was surprisingly tricky to implement, so expect occasional glitches.
> Besides piers, port areas are also populated by buildings along the shore."

Three things are encoded there: (a) a **precondition test** on the layout (shoreline inside the village
extent), (b) piers are **connected to the road network** (they are roads that end in water), (c) a
**shore-frontage building pass**.

**Known pier failure modes and the fix** `[STATED]`, `50688261` (1.2.5): *"Several(!) docks-related bugs
are fixed. **Piers intersect each other or end on land** much less often now. They still get spawned at
odd locations though."* → the pier placer is a stochastic placer with pairwise-intersection and
end-in-water validation bolted on afterwards, and location quality remained unsolved.

`[SHOWN]` Piers render as short straight bars perpendicular-ish to the shore, in the *Planks* colour
(introduced 1.2.7, `57968729`): `38498864/04` (5 piers), `42144467/05` (3), `71653886/06` (2),
`80494491/03` (2), `84106820/04` (2). They are straight, unbranched, and of similar length within a map.

**Watermills — an explicit design decision** `[STATED]`, `36199609` reply:
> "I don't plan to create watermills explicitly. Instead, my current idea is to **find suitable existing
> buildings and mark them as such.**"
This is the "tag existing geometry rather than generate special geometry" pattern, and it is the same
pattern the unshipped POI system uses (§3.21).

**Bridges** `[SHOWN]` from 1.2.0: a plank-hatched rectangle carrying the highway across a river
(`38498864/04`). 1.5.0 `[STATED]`: *"Bridges are drawn in a little more detail now. It's a tiny change
(like 6 lines of code), but the effect is visible."* `[SHOWN]` `84106820/04`: cross-planks plus rails.

---

### 3.10 — Fields `[STATED — the best-documented subsystem in the slice]`

#### 3.10.1 Design brief (1.2.5, `50688261`) — stated requirements, verbatim

> "While implementing the fields I didn't try to make them historically accurate… Instead I wanted
> fields to look the way they are portrayed on **fantasy village maps**. These were my requirements:
> - Fields need to be **mostly rectangular with a 'comfortable' aspect ratio** (in reality they tended
>   to be more elongated to turn a plough less often).
> - At the same time they need to **hint with their shape and placement that underlying relief was taken
>   into account**.
> - Fields should be **placed in clusters close enough to houses**. No distinction between crofts and
>   real fields is needed."

#### 3.10.2 Stated behaviour and limits (1.2.5)

- *"Usually my fields **adjoin the main road, but not the smaller 'streets'**. That's how my algorithm
  works but I probably know how to get around this limitation."* → the field tiler is seeded from the
  **highway polyline** (and, from 1.2.7, water edges), not from the whole road graph.
- *"On fantasy village maps fields are often placed **around the centre in rings**. I don't think that
  happened much in real life, but it looks nice and maybe I should try reproducing this type of layout."*
  (Implemented in 1.2.7 — see below.)
- *"Apparently people are bothered by **houses on top of fields**. Actually, this was sort of
  intentional. At first I discarded such fields, but then decided to keep them **to emulate crofts**."*
  (This decision becomes the *orchard* feature in 1.4.0 — §3.11.)

#### 3.10.3 Stated bugs (1.2.5)

- *"When there is a river on a map, fields are spawned only on one of its banks."* → the earth-bounds
  bug (§3.8), fixed in 1.2.7.
- *"Often fields along the main road have a **small shape defect like a thorn**. Most likely it's a bug
  in **my library for Boolean operations with polygons**."* → **VG performs polygon Boolean ops** (a
  Clipper-like union/difference/intersection) on field polygons against the road corridor. The thorn is
  the classic near-degenerate-sliver artefact. `[SHOWN]` visible along the road edge of the large field
  block in `50688261/05` (Aspen Top).

#### 3.10.4 The 1.2.7 rewrite (`57968729`) — five stated rules

1. *"**No more than one house is allowed to stand in any given field.** When there are more such houses,
   **the field is discarded (not houses)**. One house in a field is OK."*
2. *"**Fields in the centre of a map are now smaller than those closer to the edges.** More precisely,
   **fields are smaller in areas with higher population density.** This is a very important trick which
   has several purposes. First, it allows to **filter out 'invalid' fields without leaving large holes
   in the patchwork of fields**. Secondly, it makes fields in populated areas look more like crofts.
   Also it is nice to have some non-random variety of field sizes."*
   — this is the most transferable idea in the whole slice: **make the rejection unit small where
   rejection is likely**, so that discards don't punch visible holes.
3. Trail truncation + house re-anchoring (quoted in §3.5).
4. *"Generation was tweaked to produce **fewer bad-shaped fields (triangular, sectorial or not
   'compact' enough)**. If such fields are produced after all, **they get discarded**."*
   → an explicit shape-quality predicate. "Sectorial" (pie-slice) is a strong hint that the tiling is
   partly **polar around the village centre**, which matches rule 5.
5. *"As before, fields are **mostly aligned to the main road and to water edges**, but **further away
   from the centre they start to line up in circles around the centre**. I'm not entirely sure about
   this idea."*

`[SHOWN]` `57968729/03` (Oak Heath) is the canonical picture: near the highway the field long-axes are
parallel to it and the cells are small; moving NW the cells grow and their orientation rotates into
arcs concentric with the village. `80494491/03` (St Roesia) shows the polar extreme: fields are literal
**wedges radiating from the square**.

`[SHOWN]` **Field anatomy**: cells share edges but are separated by a **thin lane of ground colour**
(4–8 px at 1024 px map width) — i.e. each cell is **inset/offset inward** after tiling. Each cell is
filled flat in a field colour and overlaid with **parallel furrow lines** whose direction is the cell's
long axis. Furrow direction varies per cell. `57968729` `[STATED]`: *"Furrows are drawn as **dashed
lines** for more organic look."* — visible from 1.2.7 onward (`57968729/03` vs the solid furrows of
`50688261/05`).

`[INFERRED]` tiling algorithm. The evidence (shared edges, lanes from inset, per-cell size from a
density lookup, alignment to a seed curve near it and to circles far away, "sectorial" as a *bad* shape,
Boolean ops against the road) is consistent with: take the **land polygon minus the built-up buffer
minus forest minus water**; seed a family of guide curves (the highway offsets near it, concentric
circles about the centre far from it); cut the region with those curves into strips; cut each strip
transversally at intervals drawn from `f(D)`; inset each resulting cell; run the shape predicate
(aspect ratio, convexity/compactness, area) and the ≤1-house predicate; discard failures. A recursive
OBB/longest-edge split of each strip would produce the same look and is the cheaper implementation.
Nothing in the slice distinguishes these.

**Tags (1.3.0, `71653886`)** `[STATED]`: `farmland` = *"makes the generator spawn more fields (which
actually makes the map more realistic)"*; `uncultivated` = *"prevents the generator from spawning any
fields. It is different from hiding fields via the context menu."* — an explicit distinction between
**generation-time absence and render-time hiding**, which matters because fields displace trees and
truncate trails.

**Export** `[STATED, 50688261]`: *"Information about fields is exported in JSON so they will be visible
in City Viewer."* `[SHOWN]` `50688261/03` — flat coloured quads in the 3-D view.

**Colour** `[STATED, 71653886]`: multiple field colours can be assigned (crop variety).
`[SHOWN]` `50688261/05` uses one mauve; `50688261/07` uses yellow (ripe); `71653886/08` uses hatch-only.

---

### 3.11 — Orchards `[STATED]`

**Source:** `80494491` (1.4.0), verbatim:

> "**fields overlapped by one or more houses are turned into orchards.** Usually orchards are filled
> with **rows of smaller trees**, but **if the shape of a plot is particularly irregular, trees are
> placed more chaotically.** In any case, visually orchards differ from woods and overall they make a
> village look a more civilized place."

- Trigger is purely geometric: field ∩ house ≠ ∅. This *reuses* the 1.2.5 "houses on fields = crofts"
  decision instead of fighting it — a good example of turning a complaint into a feature.
- Two fill modes selected by a **shape-regularity test** on the plot.
- `no orchards` tag suppresses generation; orchards can also be **hidden** without affecting the rest.
- `[SHOWN]` `80494491/04`: upper-left shows an orchard as a **regular staggered grid of equal-size
  crowns** inside a plot, visually distinct from the irregular wild canopy to its right.
  `80494491/03` (St Roesia) shows the chaotic variant on the odd-shaped plots.

---

### 3.12 — Village square `[STATED — complete algorithm]`

**Source:** `80494491` (1.4.0), verbatim:

> "This is how it works: **the generator finds a place on a map with high population density** — often
> it's a place on the highway. Then it **creates a circle of a reasonable size at that location and
> distorts it a little.** This circle becomes the shape of a village square. **If the square doesn't
> overlap water, a centerpiece (a large tree or a well) is added.** That's it."
> … "**Roughly half of all generated villages come with a square.** You can request a map without a
> square with the new *'no square'* tag."
> … "here a village square is an empty roundish place with **some roads/trails radiating from it and
> surrounded by houses**. Rectangular squares will probably be added later."

Design honesty worth recording `[STATED]`: *"The biggest surprise was that I didn't actually know how
village squares were supposed to look. What they have in modern villages are essentially town squares
and **in medieval villages they didn't really have squares (village greens were different)**."*

`[SHOWN]` `80494491/04`: an almost-circular blob with low-amplitude boundary noise, filled in the
road/sand colour, a **well** at the centre (a small ring with a dark core), **six** roads radiating, and
a complete ring of houses laid tangentially around it. `84106820/03`: the same but with a **large tree**
centrepiece and the highway terminating at it (`dead end` tag). `80494491/03`: a much more strongly
distorted, roughly heptagonal square.

`[INFERRED]` the distortion is per-vertex radial jitter on a sampled circle (or one octave of angular
noise), then smoothing — amplitude ~10–25 % of radius based on the images. The "reasonable size" rule is
`UNKNOWN`; the squares in `80494491/03` (pop 180) and `84106820/04` are proportionally large, suggesting
size scales with village extent rather than population.

**Interaction with roads:** roads *radiate from* the square, and the `dead end` tag makes the **highway
terminate** at it. `[INFERRED]` the square is placed first (after the highway and density field exist),
then used as a **source of tracker seeds**; the existing 1.0.0 tracker machinery supplies the radials.

---

### 3.13 — Trees and forests `[STATED]` — the longest-running unsolved problem in the slice

#### 3.13.1 The problem statement (`42144467`, WIP post) `[STATED]`

> "Generally speaking, a wood can be depicted on a map either as **a group of separate trees** or as **a
> homogeneous area with details hinting leaves and trunks**. The former is typical on large scale maps
> e.g. battle maps, the latter is usually used on small scale maps. … I tried both these ways and so far
> I haven't found neither a perfect look, nor even a 'universally OK' one. … In my opinion **the problem
> is that these village maps are created in an inconvenient middle scale** and I'm yet to find a
> solution for it."

`[SHOWN]` `42144467/01` + `/04` is the A/B: *left* = homogeneous ("moss") — the wood is a flat
dark-green polygon with a lightly scalloped rim and a pale halo; *right* = individual crowns — a dense
carpet of scalloped discs that visually drowns the village.

Creator's two diagnostic replies `[STATED]`:
- On tree size: *"**This is not trees being gigantic, this is buildings being tiny!** The problem is
  that the smaller the trees, the more of them there are to process, the slower everything works."*
  (Resolved in 1.3.0: "Trees are made smaller relative to houses.")
- On clearings: *"I would argue that without anything outside the houses (i.e. 'village stuff') there is
  no need to push the wood further away. I mean why would villagers cut the trees if they don't use that
  land anyway? **In reality the trees are this close because it looks kind of more dramatic.**"*

#### 3.13.2 Coverage semantics `[STATED — the clearest algorithmic statement about trees]`

`42521165` creator reply:
> "**'Many trees' = fill the whole map with trees, 'Some trees' = create random patches of trees. Then
> in both cases those trees which are too close to cottages or roads are removed.**"

So the pipeline is **fill → carve**:
1. produce a candidate tree set (whole-map Poisson-ish fill, or a set of random patches),
2. **delete every tree within a clearance radius of a house or a road.**

`[SHOWN]` `66544756/04` (Wilderness mode) is the proof: with buildings and secondary roads *hidden*, the
forest still shows a large village-shaped clearing — the carve happened at generation time and is not
undone by hiding the village.
`[SHOWN]` `44111493/04` shows the converse: isolated houses inside the forest have their own small
round clearings.

Also stated in `50688261`: *"Trees coverage can be rerolled without affecting the rest of a map (via the
context menu or by pressing Shift+T)"* → the tree pass consumes its **own RNG stream**, separable from
the layout stream. That is a strong architectural hint (per-subsystem seeded streams).

#### 3.13.3 The four drawing methods `[STATED]`

| Method | Version | Description (verbatim / paraphrase) |
|---|---|---|
| **Simple** | 1.2.3 (`44111493`) | the original; 1.3.0 "altered to look less like **gears**". `[SHOWN]` cog-rimmed discs: `42521165/12`, `44111493/03` left band. |
| **Cotton** | 1.2.3 | "remind me of cotton flowers hence the name. From afar they are not much different from 'simple' trees, but **on small (and tiny) maps they look more random and more natural**." 1.3.0: "made fluffier and slightly more irregular in shape, **like in Neighbourhood Generator**". |
| **Blobs** | 1.2.3, then default | "**very many inner parameters** which affect how blobs look". `[SHOWN]` `44111493/03` right band: merged canopy masses with a bumpy silhouette and sparse interior marks. |
| **Improved** | 1.3.0 (`71653886`) | "**Of a group of trees the outer ones are drawn normally as 'cotton trees', those further from the edges are drawn muted, and the interior of the group is a solid colour blob.**" |

**"Improved" is the resolution of the §3.13.1 dilemma**: rim = individual-tree convention, interior =
homogeneous-area convention, with a muted transition band. `[SHOWN]` `71653886/05` shows all three zones
in one image. In 1.4.0 (`80494491`) **all other methods were deleted**: *"All the tree drawing methods
other than the recently added 'Improved' … have been removed. The 'improved' trees are now drawn faster,
but still not fast enough…"*

**Tree shape (1.5.0)** `[STATED]`: *Cotton* and *Spiky* — *"'Spiky' trees were meant to look like fir
trees, but the resemblance is not great. In the 'Hot' style preset, spiky trees are used to represent
palm trees."* `[SHOWN]` `84106820/04`.

**Shadows (1.3.0)** `[STATED]`: *"Trees cast shadows of **varying lengths** for a more natural looking
combined shadow."* — a deliberate anti-uniformity trick for grouped silhouettes.

**Colour** `[STATED]`: 1.2.2 had `forestLight`/`forestDark`; 1.3.0 replaced both with a single
multi-colour **Foliage** parameter.

#### 3.13.4 Performance `[STATED, repeatedly]`

- 1.2.2: "managed to make trees a bit faster… but not enough to make them enabled by default".
- 1.2.5: "Trees are still **VERY** slow".
- 1.4.0: "drawn faster, but still not fast enough".
- `42144467` contemplated shipping them with *"Enable at your own risk!"*.
Trees are the dominant cost centre of the generator across three years.

---

### 3.14 — Relief visualization: hachures, grass, contours `[STATED]`

**1.2.0 (`38498864`)** — introduction:
> "**Something (but not exactly) like hachures** is implemented to show relief on a map. This is an
> experimental thing, so it is likely to change in the future. In the 'vivid' and 'hand-drawn' styles
> these elevation strokes are drawn a bit differently and **they are not used in the 'minimalist'
> style**. They can be disabled."

**1.2.7 (`57968729`)**: *"Hachures are drawn **more evenly across the map**."*

**1.3.0 (`71653886`)** — the decisive statement:
> "In addition to hachures, two new (yet similar) relief visualization methods are implemented. The
> first one is **Grass** which replaces hachures with **zigzags**. The other one is **Contours**.
> Contours are suitable for less textured surfaces (e.g. snow) or more formal styles. **All three
> methods really just draw shapes along isolines. Isolines themselves are now built more evenly across
> a map, preventing hachures (or whatever) from overlapping.**"

This is the complete recipe:
1. extract **isolines** of the height field (marching squares on a grid, or analytic tracing),
2. **resample them evenly** across the map (this is the "drawn more evenly" fix — the naive version
   produced dense clumps where the gradient was small),
3. walk each isoline and stamp a mark at intervals:
   - *hachures*: a short stroke **perpendicular** to the isoline (classic hachure, slope-length coded),
   - *grass*: a **zigzag** mark,
   - *contours*: draw the isoline itself as a thin line.

`[SHOWN]` corroboration:
- `50688261/07` (Pumpkinde…) — the best hachure image: nested **arcs of short strokes** around a high
  point, in two tones (`hachureLight` / `hachureDark`) giving a shaded-relief read.
- `38498864/04` (Goatley, Vivid) — sparse dark-green hachure fans in the upper left.
- `38498864/05` (Mardmere, hand-drawn) — hachures as long fine "eyelash" strokes.
- `71653886/07` (Cold + Contours) — actual isolines: smooth, nested, few extrema.
- `71653886/08` and `84106820/04` — Grass zigzag/tick texture in curved bands.
- `44111493/04` (Outlines, island) — hachures as very fine gray streaks whose arcs run **parallel to the
  road arcs**, the key evidence for §3.1's contour-following road hypothesis.

**Colour model change (1.3.0)** `[STATED]`: *Ground*, *Light hachures* and *Dark hachures* were merged
into a single multi-colour **Ground** parameter — i.e. relief strokes are now just "more colours of the
ground", which also explains why a "Hot" preset can read as sand-with-green-texture.

---

### 3.15 — Buildings: roof rendering `[STATED]`

**1.3.0 (`71653886`):**
- *"To draw a roof **only one colour is now required instead of two (lit and unlit). The colour of the
  unlit roof is calculated by multiplying that single colour by the shadow colour.**"* → shaded faces are
  a multiply blend of base × shadow, not an independent palette slot. (Before this, `roofLight` and
  `roofDark` were separate slots — see §4.1.)
- *"you can now specify **more than one roof colour** to get roofs of different colours in your village."*
- *"A separate colour parameter for **roof hatching** allows you to make the hatching subtler or hide it
  altogether."*
- *"**Roofs are now drawn faking perspective or angled top-down view.** The 'Slope' parameter determines
  how pronounced this effect is."*

**1.5.0 (`84106820`):** *"'Roof type' … Currently there are two options: **'Gable'** and **'Hip'**. I
guess it would be logical to add also an option for flat roofs."*
`[SHOWN]` `84106820/04`: hip roofs are drawn with four facets and visible diagonal hip lines converging
on a short ridge; gable roofs (everywhere else) are two facets plus a ridge line and end-wall hatching.

**Shadows** `[STATED, 57968729]`: a *Shadow* group with **Colour, Length, Angle**. `[SHOWN]` all Vivid
maps offset shadows consistently down-right.

**Colour variance** `[STATED via the palette UI]`: `roofVariance` / "Color variance" (0.2 default, 0 in
the flat *pale* preset) — a per-building random perturbation of the roof colour. `[SHOWN]` in
`44111493/03` where neighbouring houses vary in tone.

---

### 3.16 — Map size, scale, and non-square maps `[STATED — with numbers]`

- 1.2.0 (`38498864`): Small / Medium / Large; *"On average, the larger the map is, the larger the village
  is spawned on it. I will probably remove the 'large' option, because villages with 15K population
  should be generated in MFCG."*
- 1.3.0 (`71653886`): *"The default map size is now medium (**formerly known as small**)"* — i.e. the
  labels were shifted, not the geometry.
- 1.5.0 (`84106820`): **non-square maps**; two width/height input fields plus a standard-size drop-down,
  "exactly like in Perilous Shores". Map **rotation was removed in 1.3.0 specifically to enable this**.
- **The constants** `[STATED]`, `84106820` creator reply to "what scale in miles?":
  > "The scale there is very… vague, but the relation between 'small', 'medium' and 'large' sizes is
  > exact (**300, 500, 800**). If we assume that the area of the medium map is 1 square mile, then the
  > small map is 0.6×0.6 miles and the large map is 1.6×1.6 miles. … when these maps are exported as
  > json for the City Viewer, **I use much smaller values. One unit is converted to 0.7 metres**, making
  > the medium map **350×350 metres** large."

So: internal map side ∈ {300, 500, 800} generator units; the *canonical* metric interpretation is
**1 unit = 0.7 m**, and the creator himself regards the RPG-scale reading as arbitrary. At 0.7 m/unit a
typical 2:1 house of ~14×7 units is ~10×5 m — a plausible cottage, which cross-validates the constant.

---

### 3.17 — Tags system `[STATED]`

1.3.0 (`71653886`) replaced the *Map parameters* dialog with a *Tags* dialog "like in my other
generators". Tags observed in this slice: `island`, `farmland`, `uncultivated`, `organic` (1.3.0);
`no square`, `no orchards` (1.4.0); `isolated`, `dead end` (1.5.0). 1.5.0 also folded the size options
into a drop-down alongside free width/height fields.

Two distinctions the creator draws explicitly and that a re-implementer must preserve:
- **tag vs render toggle**: `uncultivated` ≠ "hide fields" (`71653886`); orchards can be *not generated*
  (`no orchards`) or *hidden* (`80494491`).
- **tag constrains an existing capability**: `island` selects a water configuration that already existed
  as a random outcome since 1.2.2.

---

### 3.18 — "Wilderness" mode `[STATED]`

`66544756` (1.2.8):
> "Some time ago someone asked me if I had ever considered making a wilderness map generator for forest
> encounters and suchlike. … Then I thought that village maps without houses would probably work for
> this purpose and that's exactly what this 'Wilderness' option does. **When it is checked, buildings,
> secondary roads and piers are hidden. Fields are not hidden automatically** in case you need not a map
> of a wilderness but of some distant village outskirts."

It is a **pure render filter** over the fully generated model (hence the leftover village-shaped
clearing in `66544756/04`). Cheap feature ("it took no more than a half of an hour or so"), and a useful
demonstration that VG's layer model is cleanly separable.

---

### 3.19 — Determinism, permalinks, and cross-generator integration `[STATED]`

- **Permalinks (1.2.6-era, `56941736`)**: implementing PS→VG integration *"only took about 5 minutes to
  implement in PS, but in VG it was more like 5 days"* because it required permalinks. *"It would
  probably be too much effort for the sake of the integration alone, but it also makes possible to save
  and restore villages."* Two builds exist — itch.io (permalink via a dialog, because of the iframe) and
  `watabou.github.io/village-generator/` (URL in the address bar).
  → The **entire map state is reconstructible from a short URL**: seed + tags + name + population
  override. This is the strongest evidence that generation is a **pure function of (seed, parameters)**.
- **Perilous Shores → VG** (`56941736`): right-click a settlement → *Open in VG*. `[SHOWN]` `56941736/03`
  shows the PS context menu with *Open in VG*, and the resulting VG map keeps the PS settlement's **name**
  ("Windycot") and its **coastal** configuration.
- **Procgen Mansion → VG** (`66544756`): right-click a building → *Open in PM*; VG passes the building's
  **dimensions** ("the building's dimensions still correlate with its size on a map"). Because VG
  footprints are plain rectangles, PM was changed to allow **more intricate ground plans** than the input
  rectangle, since rectangular plans "results in boring floor plans". Planned (not done here) for MFCG
  and NG: *"there I'm going to reproduce buildings in stricter accordance with their shape on a map. In
  theory, I can even make PM place entrances where they should be (on a street-facing facade)."*
- **City Viewer** (`37407181`, `50688261`): JSON round-trip, see §3.20.

---

### 3.20 — Export formats and the exported data model `[STATED]`

**PNG** — 1.1.0 (`36199609`), "easy, of course".

**JSON** — 1.1.1 (`37407181`):
- basic export added; villages viewable in City Viewer 3-D.
- **Height-maps are not exported** and are not supported by City Viewer yet. Consequence `[SHOWN]`
  `37407181/03`: a flat plain.
- **Nothing exists beyond the map border**: *"roads, waterbodies end right where the original map ends.
  In the future I hope to find a way to extend them **visually** without additional generation."*
- Format decision `[STATED]`: *"I finally decided to move away from the strict GeoJSON format. I
  mentioned before that I found it too rigid, too limiting and overall awkward. For now the changes are
  minimal: there are still the same object types, points are still two-element arrays etc."* Comment
  thread pushback from user "Tom" (GeoJSON is a standard; later suggests CityJSON); reply: *"Ideally
  there would be two different formats (the pure GeoJSON and my GeoJSON-based thing) to export into;
  unfortunately that would be too much code to maintain."*
- 1.2.5 (`50688261`): **fields are added to the JSON**.
- Units: **1 unit → 0.7 m** on export (`84106820`, §3.16).

**SVG** — first in 1.2.3 (`44111493`): *"Some details are missing in SVG comparing to what you see on a
screen (no title, no lights, only the default trees style is supported)."* Rewritten in `56941736` with
*"the new method"* borrowed from Perilous Shores — *"This not only made the code almost **1K lines
shorter** but also made a number of map features exportable which were not exportable before — 'simple'
and 'cotton' trees, lights (like in the 'Night' style) and the map title."*
`[INFERRED]` the "new method" is a **retained-mode draw list replayed into an SVG backend** rather than
a parallel SVG writer per feature — that is the only change that both deletes ~1000 lines and
automatically gains feature coverage.

Earlier (1.1.0, `36199609`) he had judged: *"SVG export would be harder and I'm not really sure it's
needed."*

---

### 3.21 — POIs: the feature that never shipped in this window `[NAMED-ONLY]` + `[STATED blocker]`

Threaded through five posts:
- `35854256` (launch): *"The main reason why I started it is to try making an analog of **One Page
  Dungeon Generator** for towns. So right after finishing with water bodies I intend to switch to
  POI/note generation to have taverns, shops, houses of interesting people marked on the map."*
- `38498864` (1.2.0): deferred. **The blocker is stated and it is a layout problem, not a content
  problem**: *"I don't know where to place their descriptions on a map without obscuring too much and
  creating too much visual noise. I.e. I need to find a place for a legend on an already crowded map or
  find some alternative to it."* Reply to a user: *"That's my plan for now: to implement markers similar
  to the ones in MFCG (Google Maps-like) and show descriptions on hover. **But I would really like to
  have all the results of generation on a single screen/printed page.**"*
- `42521165` (1.2.2): *"I've started working on 'places of interest' … So far they are not particularly
  'interesting', so I don't expose them, but **you can see their names in the browser console**."*
- `57968729` (1.2.7): *"the generator lists things like **'Arnald's Blades (smithy)'** and **'The Cup And
  Arrow (tavern)'** in the browser console. All I had to do was to expand them a bit and display
  somehow. And this turned out to be a problem — I don't know how to show them. **I am sick and tired of
  implementing the legend in my every generator** and it seems there is no place for it anyway. I tried
  to use 'stickers' like in Perilous Shores but it looked wrong."*

So: **POI content generation (naming + typing) existed from 1.2.2 onward and was purely blocked on
cartographic annotation.** The naming pattern is visible in the two examples: `<Possessive personal
name> <plural noun>` for a craft business, `The <Noun> And <Noun>` for a tavern.

---

### 3.22 — Names and population `[NAMED-ONLY]` + `[STATED]`

- 1.1.0 (`36199609`) changelog: "Improved village names". No method given.
- `[SHOWN]` generated names in this slice: Bear Hill, Greenchurch, Maple Nest, Goatley, Mardmere,
  Rainmere, Clover Nest, Strong Forge, Emerest, Mapoar, Aspen Top, Pumpkinde(…), Basil Town, Windycot,
  Oak Heath, Saltwood, Hugham, St Roesia. The dominant pattern is **bimorphemic compounding**
  (`<nature/quality word> + <settlement/landform suffix>`: -mere, -ley, -ham, -cot, -wood, -heath, Top,
  Nest, Hill, Forge), with a minority of opaque forms (Emerest, Mapoar) and one hagionym (St Roesia).
- Renaming: 1.2.0 (`38498864`) — click the name on the map; a button re-rolls a random name.
- Population: derived, printed, and **editable from 1.2.6** (`56941736`).

---

### 3.23 — Performance engineering `[STATED]`

A running theme with a clear split between the two costs:
- 1.2.2 (`42521165`): "streets generation is optimized".
- 1.2.5 (`50688261`): waterbody generation optimized — *"I've found the most computationally expensive
  piece of code there too late"*; also roads, buildings and trees optimized.
- 1.2.8 (`66544756`): *"In some cases generation took ridiculously long, up to a couple of seconds. …
  now everything works much faster. Well, not everything. **Generation itself is quite fast but drawing
  is not.** Still, the difference is visible."*
- 1.4.0: "improved" trees drawn faster "but still not fast enough".

**Takeaway for a re-implementer:** in this class of generator the render pass (tens of thousands of tree
crowns, hachure strokes and furrow lines, each an outlined shape with a shadow) dominates the model
pass. Budget for draw-call batching / caching from the start.

---

## 4. Visual and style conventions

### 4.1 The palette data model — verbatim from the 8 attached JSON files (`42521165/images/03–10.jpg`)

These files are the 1.2.2 "customizable palettes" attachments, saved with a `.jpg` extension but
containing JSON. Filenames come from `42521165/post.json → attachments_preview_metadata`.

**Vivid-style schema** (`autumn.json` = `03.jpg`; also `night.json` `06`, `pale.json` `07`,
`winter1.json` `09`, `winter2.json` `10`):

```
ground, hachureLight, hachureDark, roofLight, roofDark, sand, ink,
waterShallow, waterDeep, waterTide, forestDark, forestLight,
lights, shadowAlpha, strokeNormal, strokeThin, roofVariance
```

| slot | UI label in the Palette dialog (`42521165/11`) | meaning |
|---|---|---|
| `ground` | Ground | base land fill |
| `hachureLight` / `hachureDark` | Light / Dark hachures | the two relief-stroke tones (merged into multi-colour *Ground* in 1.3.0) |
| `roofLight` / `roofDark` | Light / Dark roof | lit and shaded roof faces (collapsed to one colour × shadow in 1.3.0) |
| `sand` | Sand | roads **and** beaches (split into two separate colours in 1.2.5) |
| `ink` | Ink | all outlines and text |
| `waterShallow` / `waterDeep` | Shallow / Deep water | the two water bands (N-band gradient in 1.4.0) |
| `waterTide` | Ripples | offshore contour / wave lines |
| `forestLight` / `forestDark` | Light / Dark forest | canopy two-tone (replaced by multi-colour *Foliage* in 1.3.0) |
| `lights` | Lights | night window glow |
| `shadowAlpha` | Shadow | shadow opacity |
| `strokeNormal` / `strokeThin` | Normal / Thin stroke | the two line weights |
| `roofVariance` | Color variance | per-building roof colour jitter |

Concrete values (useful as ground truth for a re-implementation's default themes):

```jsonc
// autumn.json
{ "ground":"#dfa752","hachureLight":"#edc758","hachureDark":"#b28147",
  "roofLight":"#978a60","roofDark":"#69554c","sand":"#d2c591","ink":"#1a100c",
  "waterShallow":"#bee9cd","waterDeep":"#abceba","waterTide":"#d6fde8",
  "forestDark":"#855048","forestLight":"#c7a767","shadowAlpha":"0.3" }

// night.json            (matches the left half of 42521165/01, "Strong Forge")
{ "ground":"#3e546c","hachureLight":"#59758a","hachureDark":"#344358",
  "roofLight":"#546b8b","roofDark":"#191d29","sand":"#5e7080","ink":"#171b27",
  "waterShallow":"#21263a","waterDeep":"#1d2333","waterTide":"#6b7b99",
  "forestDark":"#1f2233","forestLight":"#2a374a","lights":"#AA8822","shadowAlpha":"0.25" }

// pale.json             (matches the right half of 42521165/01 — near-monochrome, print-friendly)
{ "ground":"#e2ddc9","hachureLight":"#e2ddc9","hachureDark":"#e2ddc9",
  "roofLight":"#e2ddc9","roofDark":"#b1ada0","sand":"#e2ddc9","ink":"#413f40",
  "waterShallow":"#babcae","waterDeep":"#c3c7b8","waterTide":"#7d7d77",
  "forestDark":"#b9b391","forestLight":"#b9b391",
  "shadowAlpha":"0.1","strokeNormal":"0.8","strokeThin":"0.3","roofVariance":"0.0" }

// winter1.json
{ "ground":"#e0e9f2","hachureLight":"#ffffff","hachureDark":"#b9d4e9",
  "roofLight":"#ffffff","roofDark":"#b9d4e9","sand":"#d0e2f0","ink":"#363d4d",
  "waterShallow":"#a3becc","waterDeep":"#8fadcc","waterTide":"#a3becc",
  "forestDark":"#adc7e2","forestLight":"#496475","shadowAlpha":"0.2" }

// winter2.json
{ "ground":"#f9f9f9","hachureLight":"#ffffff","hachureDark":"#96afc5",
  "roofLight":"#ffffff","roofDark":"#87a2bf","sand":"#b3b1b2","ink":"#0d171a",
  "waterShallow":"#6a8091","waterDeep":"#5b727d","waterTide":"#758ea1",
  "forestDark":"#ecf9ff","forestLight":"#d1dee4","shadowAlpha":"0.3" }
```

**The other three styles had entirely different, much smaller schemas** — decisive evidence that in
1.2.2 the "styles" were *separate renderers*, not one renderer with different colours (and this is why
`42521165` warns "different 'styles' require different palettes. Loading a palette intended for use with
a style different from the current one won't cause much effect"):

```jsonc
// calligraphy_ink.json  (Calligraphy style — 4 tones + FOUR stroke weights)
{ "white":"#F8F8F8","light":"#C0CCC4","dark":"#788088","black":"#282030",
  "strokeUltra":0.3,"strokeThin":0.8,"strokeNormal":1.2,"strokeThick":3.0 }

// minimalist_night.json (Minimalist style — 5 slots, incl. a dedicated road colour + forest alpha)
{ "paper":"#110022","ink":"#EECC77","water":"#443344","forest":"#403e37","road":"#776666",
  "forestAlpha":0.8 }

// scribble_tint.json    (Scribble style — 4 slots + 2 stroke weights)
{ "paper":"#fcf8f0","ink":"#443344","water":"#a3b6bf","forest":"#d5d9c3",
  "strokeNormal":1.2,"strokeThin":0.4 }
```

Three of those four styles were deleted eight months later (1.2.3), which is consistent with
consolidating onto the single Vivid renderer. Later additions to the Vivid schema: *Planks* (1.2.7),
*Shadow {Colour, Length, Angle}* (1.2.7), *Paper* for text outlining (1.2.5), *roof hatching colour* and
*Slope* (1.3.0), *No. of bands* and *road/field outlining none|hard|soft* and per-class road thickness
(1.4.0), *Roof type* and *Tree shape* (1.5.0). Style-settings **tabs** (`50688261/06`): `Houses │ Fields
│ Water&Forest │ Text │ …` with `Preset / Load / Apply / Save` buttons.

**Font settings** (`50688261`, 1.2.5): *Header* and *Population* each have font name, size, Bold, Italic
— `[SHOWN]` `50688261/06`: `Berkshire Swash 80, Bold` for the header, `Default 40` for the population.

### 4.2 Layout of the nameplate

Always a two-line block: the village name in a display face, the population beneath in small caps
("Pop. 430"). Position varies per map (bottom-left `35854256/03`, `38498864/04`, `57968729/05`;
top-right `50688261/05`; top-left `57968729/03`, `80494491/03`) — `[INFERRED]` placed in the emptiest
corner. From 1.2.5 the text carries a **Paper-coloured outline** for legibility over busy ground
(`57968729/03`). Default Vivid face is a Trajan-like small-caps serif; the hand-drawn style uses a
marker script; the Night preset in `50688261/06` uses Berkshire Swash.

### 4.3 Per-feature drawing conventions (Vivid, the default from 1.2.0)

| Feature | Convention |
|---|---|
| **Ground** | flat fill + relief strokes (hachure / grass / contour) in 1–2 tints |
| **Highway** | wide light "sand" ribbon with a thin dark casing on both edges; `soft` outlining option from 1.4.0 |
| **Streets** | narrower ribbon of the same fill; in mono styles, a single or double thin line |
| **Trails** | dashed / dotted thin line, terminating at a lonely house or off-map |
| **Buildings** | filled rectangle, dark `ink` outline, parallel roof hatching, drop shadow offset down-right; two roof tones (lit/shaded); multi-colour roofs and faked perspective from 1.3.0; gable/hip from 1.5.0 |
| **Large buildings** | same but larger, denser hatching, often a small gable/tower marker |
| **Fields** | flat fill + parallel furrow lines (dashed from 1.2.7); cells separated by ground-coloured lanes; multi-colour from 1.3.0 |
| **Orchards** | field polygon filled with regular staggered rows of small crowns (chaotic if the plot is irregular) |
| **Forest** | flat interior fill + individually drawn rim crowns + a muted transition band ("Improved"); shadows of varying length |
| **Water** | deep fill + shallow band(s) + `waterTide` ripple contours; sand beach on the land side; white thalweg line on rivers |
| **Piers** | short straight bars in the *Planks* colour, perpendicular to the shore |
| **Bridges** | plank-hatched deck carrying the road; rails added 1.5.0 |
| **Square** | distorted circle in the road colour with a well (ring + core) or a large tree at its centre |
| **Night** | warm `lights` glow blobs around each building; everything else desaturated toward navy |
| **Mono/Outlines presets** | fills collapse to paper, everything reads as line work; forests become scalloped outlines; water becomes 2–3 offshore contour lines |

### 4.4 Discarded styles, for the record

*Minimalist* (`35854256/03`, `36199609/03`): light grey ground, one dark ink; buildings are solid
rectangles, no outlines, no hatching; roads are bare centrelines; trails dotted; water a flat mid-grey.
*Hand-drawn* (`35854256/04`, `36199609/05`, `38498864/05`): cream paper, wobbled ink lines, hatched
buildings, double-line coasts with dotted inner lines, eyelash hachures.
*Scribble* (`42144467/02`, `/05`): the same but tighter, with cloud-scalloped forest outlines and
dash-dot shore lines.
*Calligraphy* (1.2.2 only; palette above; no image in this slice).
All three plus Minimalist removed in 1.2.3.

---

## 5. Creator's stated design philosophy and constraints

1. **Why VG exists at all** (`35854256`): MFCG's small-town mode fails — *"The smaller the town, the
   less it resembles anything real. I don't claim that Village Generator produces realistic maps, but
   they definitely look better."* Honesty about aiming at *plausible-looking*, not *realistic*.
2. **Abstraction is a deliberate starting point** (`35854256`): *"This is a generator which generates
   relatively abstract maps of villages and small towns. In the future I'm planning to add some
   features, so the maps will probably become less abstract."*
3. **The detail-cascade problem** (`38498864`, on trees): *"I was reluctant to add trees, because if
   there are trees, then why there are no fields, hedges and all other 'rural details'? And I didn't
   want to add details, because **I would need to make assumptions about technological level, social
   organization and such.**"* Re-raised in `42144467`.
4. **Refusal to over-specialise** (`38498864` reply on fields): *"deriving a field size from population
   density makes sense, but some villages may have not real fields at all depending on location (fishing
   villages) or period (modern tourist villages)… it's hard to build a universal 'field generator' and I
   wouldn't like to make it something specialized."*
5. **Target the genre convention, not history** (`50688261`): *"I didn't try to make them historically
   accurate… Instead I wanted fields to look the way they are portrayed on fantasy village maps."*
   Same pattern for squares (`80494491`: medieval villages didn't really have squares — he built one
   anyway because the genre expects it).
6. **Everything on one page** (`38498864` reply): *"I would really like to have all the results of
   generation on a single screen/printed page."* — the constraint that blocked POIs for 3+ years.
7. **Legend fatigue** (`57968729`): *"I am sick and tired of implementing the legend in my every
   generator."*
8. **Ship only what you know how to build** (`44111493`): after a bad two weeks, *"I decided to release
   a new version with a small number of new features, **for each of which I had a clear idea how to
   implement it.**"*
9. **Removal is progress** (`44111493`): *"Removing anything doesn't sound like an exciting feature, but
   I had to do it to move forward."* (3 styles); repeated in 1.4.0 (3 of 4 tree methods) and 1.3.0
   (rotation, to unlock non-square maps).
10. **Printer-friendliness is a real user constraint** (`44111493`): the *Outlines* and *Minimal* presets
    exist because *"some concerns were expressed about the 'printer-unfriendliness' of the default
    style."*
11. **Standards scepticism, with cost reasoning** (`37407181`): GeoJSON is "too rigid, too limiting and
    overall awkward"; maintaining two export formats would be "too much code to maintain".
12. **Integration over duplication**: VG villages open in City Viewer (3-D), Procgen Mansion (interiors),
    and are reachable from Perilous Shores (region). Watermills would be *tagged existing buildings*,
    not generated ones.

---

## 6. Useful facts from the comment threads

| Post | Who | Fact |
|---|---|---|
| `35854256` | users | Zero-population villages are common enough to be a running joke ("Oakfont, population 0"). |
| `36199609` | Allen Varney | *"all these villages seem aloof from the water, like the people didn't even know it was there"* — the complaint that produced the port/pier feature and the water/village coupling work. |
| `36199609` | **watabou** | Water and the "potential village area" are generated **independently** (§3.8). Watermills will be **tagged existing buildings**, not generated. |
| `37407181` | **watabou** | (MFCG, but informs VG) farmhouses will be *"always touching and aligned to one of the field edges … more elongated"* — the same align-building-to-field-edge rule VG adopts for trail-end houses in 1.2.7. |
| `37407181` | Tom | Advocates GeoJSON, then CityJSON; posted a translation script on itch.io. watabou: "I'll have a look… My discontent with GeoJSON is just too strong to keep struggling." |
| `38498864` | Moritz Hackl | Long, well-informed field-design proposal (Rundling, density↔plot size, vegetable gardens near the centre, woodland further out). Several of these later appear: density↔field size (1.2.7), rings (1.2.7), orchards near houses (1.4.0). |
| `38498864` | **watabou** | POI plan: MFCG-style Google-Maps markers with hover descriptions — *but* he wants everything on one printed page. |
| `42144467` | Eric Scheid | "the individual trees version have gigantic trees as compared to the buildings" → **watabou**: *"This is not trees being gigantic, this is buildings being tiny!"* + the tree-count/performance tradeoff. |
| `42144467` | **watabou** | On clearings: villagers wouldn't clear land they don't use; forests hug villages on real fantasy maps "because it looks kind of more dramatic". Wooded areas will be *shrinkable*. |
| `42521165` | Allen Varney | "I can't tell the difference between 'Some' and 'Many' trees." → **watabou** gives the exact semantics (§3.13.2) — the single most algorithmically useful comment in the slice. |
| `50688261` | Allen Varney | Same confusion again → answered again + the new Shift+T reroll. |
| `50688261` | Maezar / **watabou** | Roundhouses request: *"It's very easy to replace rectangles with circles, but **that would look unnatural with grid-like road patterns**."* — a useful statement that VG's building shape and its road topology are coupled aesthetically. |
| `56941736` | Heath Rezabek | Cyan non-photo-blue grids/numbers tradition for GM handouts; watabou agrees the colour will be customizable and may default to cyan. |
| `84106820` | Johnn & Jochen / **watabou** | The map-size constants **300 / 500 / 800** and the **0.7 m per unit** JSON conversion (§3.16). |
| `84106820` | Sandbox Construction Kit | Requests 2-D overhead fortress/castle schematics (Judges Guild *Castle Book*); watabou: *"it should be fairly easy to add a scheme-like view to those castles of mine"* (Castle in the Mist). |

---

## 7. Open questions a re-implementer must decide

1. **Tracker field orientation.** Do village streets follow `∇H` or `∇H` rotated 90° (contour tangent)?
   The images strongly suggest contour-following for streets and free crossing for the highway, but the
   only statement says "gradient vector field". (§3.1) — *highest-impact unknown in the slice.*
2. **Tracker parameters**: step size, seed count and placement, branch rule, termination, and the
   near-miss snapping that produces closed blocks and T-junctions.
3. **Height-field construction**: sum of radial bumps vs low-octave noise; resolution; whether water
   modifies it.
4. **Density-field construction**: the exact highway ridge term; how Low/Med/High map to amplitude vs
   spread; whether the printed population is `∫D` or derived from building count.
5. **Whether the highway is generated before or after the density field** — the square lands "often on
   the highway", which reads as highway-first; but the density field must also decide where the village
   is at all.
6. **Field tiling**: strip-cut vs recursive OBB split vs polar sectoring; the compactness/aspect
   predicate thresholds; the inset distance that makes the lanes; how the "align to water edges" seeding
   works.
7. **Water shape generation** — completely undocumented in this slice for all three configurations.
   Also: how "narrower and more meandering" rivers (1.2.5) were achieved.
8. **Pier placement rule** — "if a layout allows" is never defined; and "they still get spawned at odd
   locations" means the quality predicate was never solved.
9. **Square sizing** — "a circle of a reasonable size"; and the distortion amplitude/spectrum.
10. **Tree candidate generation** — Poisson-disc? jittered grid? — and the "random patches" generator for
    the *Some* setting; the clearance radii around houses vs roads; the "Improved" method's rim/muted/
    interior band widths.
11. **Isoline extraction and even-resampling** — the "built more evenly across a map" fix in 1.3.0 is
    stated but not described; this is the difference between good and clumped hachures.
12. **Roof "Slope" fake-perspective maths** — a shear? a vertical offset of the ridge? — not described.
13. **Permalink encoding** — what exactly is in the URL (seed, tags, size, name, population override,
    style?) and therefore what must be deterministic.
14. **Per-subsystem RNG streams** — tree coverage is independently rerollable (Shift+T); which other
    subsystems have their own stream?
15. **The "ground vs sand" question raised by `84106820/04` and `71653886/05`**: in the *Hot* preset the
    entire built-up area reads as sand while the surroundings read as green. Is that (a) merged wide road
    ribbons, (b) a deliberate "settlement ground" polygon, or (c) the forest interior fill being green
    against a sand ground? Evidence favours (c) for `71653886/05` (the green areas are bounded by rim
    crowns) but (a) or (b) for `84106820/04` (the sand area follows the houses, not the tree line).
    Unresolved.
16. **"No empty roads"** — is a building-less road deleted, or is a building forced onto it?
17. **Why crossroads are hard.** `84106820` says two intersecting highways "turned out to be more
    difficult than I expected". Whatever couples the highway to the density field and the square is
    presumably single-highway-shaped; a re-implementer should design for N highways from the start.

---

## Appendix — files read (complete checklist)

| Directory | post.md | comments.json | images |
|---|---|---|---|
| `35854256` | ✔ | ✔ (2, subset of post.md) | 01–04 ✔ (01≈03 thumb, 02≈04 thumb) |
| `36199609` | ✔ | ✔ | 01–05 ✔ |
| `37407181` | ✔ | ✔ | 01–07 ✔ (`05`≡`04` by md5) |
| `38498864` | ✔ | ✔ | 01–08 ✔ |
| `42144467` | ✔ | ✔ | 01–06 ✔ |
| `42521165` | ✔ | ✔ | 01, 02, 11, 12 ✔ (images); **03–10 are JSON palettes**, transcribed in §4.1 |
| `44111493` | ✔ | ✔ | 01–04 ✔ |
| `50688261` | ✔ | ✔ | 01–09 ✔ (`09`≡`08`) |
| `56941736` | ✔ | ✔ | 01–04 ✔ |
| `57968729` | ✔ | ✔ | 01–05 ✔ (`04`≡`35854256/04`) |
| `66544756` | ✔ | ✔ | 01–04 ✔ |
| `71653886` | ✔ | ✔ | 01–08 ✔ |
| `80494491` | ✔ | ✔ | 01–04 ✔ |
| `84106820` | ✔ | ✔ | 01–04 ✔ |

No captured JavaScript bundle was opened at any point.

## Critic-2 addendum (VG/NG seat, 2026-09-25)

Rulings from `research/findings/_critic-vg-ng.md` against the live recordings (`profile-village.md` and its
addenda; 24 `calls.json` files re-derived). All `[STATED]` quotations spot-checked in this file were found verbatim
at source (S1–S7, S23, S25, S27 there).

1. **§3.2's `[INFERRED]` "low-octave smooth field … not multi-octave fBm" is refuted.** The height field is a
   5-octave fBm sampled exactly once per 128² cell (`Noise.get = a + b`, `Perlin.get = 5a + 6b`, `a = 16 384·E`
   in all 21 clean runs), plus `createGradient` and one radial primitive per water type (`digRiver`, `digFork`,
   `createHollow → createMount`, `createIsland → createMount`). The smooth contours in the images come from the
   base frequency and persistence, not from octave count.
2. **§3.10's tiling inference is superseded by the recorded construction** (`_critic.md` C9): Voronoi cells of the
   land, clipped by `PolyBool.and`, recursively OBB-bisected (`Bisector.partition/subdivide`, with
   `makeCut = split = PointExtender.project`), corners rounded by `semiSmooth/getArc`.
3. **§3.15 "unlit = colour × shadow colour" is approximate in the live build:** the measured multiplier is a
   shadow colour lightened ≈ 8 % (`dark = lit × lerp(white, shadow, ≈ 0.92)`); see `profile-village.md` Critic-2
   item 6.
4. **§3.21 POIs:** still unshipped in the 2026 builds — `Legend.hx:82` prints exactly two POIs per village to the
   console (`Note.new` = 2) and nothing is drawn.
5. **§3.13.2 / §7.14:** the "own RNG stream" for trees is supported by the URL's `&trees=` parameter and by
   `Random.reset` = 6 per regeneration; the stated "fill → carve" is consistent with the recorded
   `Forest.roll` (noise-thresholded Voronoi cells → `DCEL.floodFill` patches → `shrinkExcl` against
   roads/fields/buildings).
6. **§3.1 open question 1 (field orientation):** narrowed, not closed — trackers call `Elevation.g` only 1–5 times
   per village, so any slope term reads the pre-built gradient array inline or lives in `Tracker.flexibility`.
