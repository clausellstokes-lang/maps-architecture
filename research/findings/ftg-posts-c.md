# FTG (Fantasy Town Generator, Thomas Allerton) — Patreon dev posts, NEWEST THIRD
Slice `ftg-posts-c` = `research/worklists.json["ftg"][20:30]` → 10 posts, 2025-07-01 … 2026-07-25.

**Method / provenance note.** Every `post.md` in the slice was read in full including the complete comment
thread (the `post.md` comment section is *more* complete than `comments.json`, whose `data` array holds only
root comments — replies live in `included`; counts verified: e.g. 144226579 → 2 roots in JSON vs 11 flattened
in `post.md`). `post.json` is the raw Patreon API envelope and its `attributes.content` is empty for every
post in this slice, so `post.md` is the source of truth for body text.

**Image duplication (important for anyone re-auditing this slice).** Every post's `images/` folder contains
**exactly two copies of each image**: the inline copy Patreon downscales to ≤820 px (files `01..N`, in
`![IMAGE #n]` marker order) and the full-resolution gallery copy (files `N+1..2N`). Verified by 16×16
average-hash: all pairs at Hamming distance ≤ 12, nearly all at 0. 190 files → **77 unique images**. I read
the full-resolution copy of each. Pair map (marker # → hi-res file):

| post | markers | hi-res files in marker order |
|---|---|---|
| 133016301 | 5 | 06,07,08,09,10 |
| 137812814 | 13 | 14,15,16,17,18,19,20,21,22,23,24,25,26 |
| 144226579 | 8 | 09,10.jpg,11,12,13,14,15,16 |
| 147332188 | 20 | 22,23,21,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40 |
| 149103655 | 5 | 07,06,08,09,10 |
| 151265004 | 4 | 05,06,07,08 |
| 153121107 | 6 | 07,08,09,10,11,12.gif |
| 157283634 | 0 | (no images) |
| 159738553 | 11 | 12,13,14,15,16,20,21,22,17,18,19 |
| 164816716 | 5 | 06,07,08,09,10 |

No captured JavaScript bundle was opened. Evidence tags: **[STATED]** creator describes the method,
**[SHOWN]** visible in an image but unexplained, **[INFERRED]** my reconstruction (reasoning given),
**[NAMED-ONLY]** announced with no method.

---

## 1. Chronological table

| # | date | post id | title | what changed vs the previous iteration |
|---|---|---|---|---|
| 20 | 2025-07-01 | 133016301 | Development Update – July 2025 | **Lot→building subdivision rewritten.** Adds a pre-pass that cuts perpendicular to *interior corners* of a lot before the general division runs; replaces the "longest edge, cut from its midpoint" cut proposal with "edge nearest the centroid, cut through the centroid"; adds a narrow-section heuristic filter; tweaks wall generation. Fixes regressions introduced by the previous (June 2025) *suburb update*, which created many more interior corners. |
| 21 | 2025-08-31 | 137812814 | Development Update – August 2025 | **Castle districts rewritten** (random wall layout fitted into the castle's district lot, gatehouse, keep, internal paths, moat/cliff, connector road, decorated surround: park / plaza / buildings / cliff). **Post-processing render effects added**: greyscale, sepia, green tint, pixellation, dot screen, scanline, plus a hand-written crosshatch shader with optional noise. Effects apply to the 2D map, the 3D mode and PNG export. |
| 22 | 2025-11-23 | 144226579 | Development Update – November 2025 | **Forests**: trees are no longer persisted individually — a *tree-area shape* is stored and filled at render time; tree count raised, forest trees now cast shadows, per-tree colour variation. **New farmland mode 'Around perimeter'** (default for hamlets); old mode named 'Farmsteads' and reworked (house centred in its plot + driveway to the road, some residents live there). **Blurred field edges.** **Settlement perimeter expanded + rounded.** Basic create form gains farms toggle & layout preset. Sun direction/height/colour controls + shadow-resolution option. More building-validity checks (sharp triangles). |
| 23 | 2026-01-03 | 147332188 | Development Update – January 2026 | **Outside-settlement decorations**: ponds, copses, stone circles, ruins — procedural, some auto-connected to the road network by a generated path, farmland/forest generated around them, 3D models for all. **Day/night cycle** (moving sun, shadow direction, light colour, window lights for buildings containing an awake adult). **Weather**: clear / cloudy / snow-clear / snow-cloudy. **Seasons** (deciduous tree rendering + default sunrise/sunset). **Climate presets**: temperate (deciduous / coniferous / mix), desert (sand, palms, river-hugging fields), polar (permanent snow, no trees unless forests requested). |
| 24 | 2026-01-25 | 149103655 | Development Update – January 2026 (2) | **Premium races/religions deprecated**, replaced by cloud-saved *create-settlement form presets* with per-section save/merge (10 sections). Existing premium data migrated to section-scoped presets. **Race relations matrix** (pairwise partnering proportions; enables races with no children/parents). Save-to-cloud vs save-to-local-browser-storage. Minor UI polish, right-click settlement context menu. |
| 25 | 2026-02-20 | 151265004 | Development Update – February 2026 | New race presets (adds *5e fantasy*) and religion presets (adds *Forgotten Realms*, *Golarion*) after an OGL / WotC & Paizo fan-content review; creative licence updated. **Factions get arbitrary named roles** with member criteria (professions + new: races, genders, religions); same-named roles merge post-generation. **Advanced person search.** Basic create form now also exposes Climate, Building material, Races, Religions and a *Reserve natural area* toggle. |
| 26 | 2026-03-15 | 153121107 | Development Update – March 2026 | **Islands** (reuses coastline + pond + castle-moat code; 'coastal' checkbox → dropdown coastal/islands; one 'arm' instead of two). **Water depth shading + ocean foam + weaker river foam + water texture**; ocean-vs-river classification heuristic. **Map load ~2× faster** (metropolis ≈10 s vs ≈20 s) + progressive draw during load. Road-graph duplicate-intersection root cause found and existing settlements repaired server-side; self-intersecting layouts now blocked at draw time; 'ponds' added to the initial-state drawing tool. |
| 27 | 2026-05-03 | 157283634 | Development Update – May 2026 | District name tables expanded and **syllable counts encoded in name parts** (nickname ≤ 3 syllables). Feet/metres unit switch. **Initial water compass direction** (coast toward it, rivers perpendicular). Markdown in notes. District re-roll → **'Regenerate area'**, can now re-roll an area *as farmland*, and districts are **drawn** rather than lot-picked. **Residential district placement order** configurable (class order instead of population order). Map-download endpoint ≈50 % smaller. Several simulation-integrity bug fixes (carer deletion, faction meeting at a non-existent building, faction-driven job counts). |
| 28 | 2026-06-01 | 159738553 | Development Update – June 2026 | **User-definable map layers** with colour + matcher rules (building type / specific building type / specific building); defaults configurable pre-generation and saveable. **Favourite-people layer** (live positions, per-person colour, shared colour per building) and per-building colours + legend for favourite buildings. **Grid overlay** (2 m or 5 ft, off→light→dark cycle). **Bulk edit buildings** (edit fields, or regenerate contents while keeping footprints). |
| 29 | 2026-07-25 | 164816716 | Development Update – July 2026 | Person search by age (category or exact/range). **Simulation ~10 % faster; settlement files ~5 % smaller** (protobuf `int32` → `sint32` for coordinates). **Lot splitting rewritten again**: the lot is first *shrunk* and the inset border added as blocking edges, removing the mid-line "bend" and the cross-lot splits of the previous algorithm. **Sneak preview: building interiors / floorplans** (storage + UI infrastructure, basic room splitting, basic window/door placement). |

---

## 2. Techniques

### 2.1 Buildings-in-lot subdivision — the July 2025 algorithm
*Source: 133016301 body; images 06–10.*

**Problem.** After the June 2025 suburb update, settlements contained (a) too many *thin/sliver* buildings and
(b) *weird-shaped* buildings — L-shapes, arrowheads, hourglasses, and one spectacular six-pointed star.

- **[STATED] Core loop.** Verbatim (sic, including the author's typos): "The buildings-in-lot placement
  algorithm essentially works by repeatly dividing a lot area in to smaller plots, by taking a lot that is too
  large for a building, proposing a random cut, and then determining the new lots, repeating if necessary." So: recursive binary subdivision of a block polygon,
  driven by an area/size threshold ("too large for a building"), with a *randomised* cut proposal — i.e. it is
  a stochastic OBB-free slicing scheme, not a straight skeleton and not a Voronoi.
- **[STATED] Old cut proposal.** "looked at the longest edge in the lot polygon, and then proposed a cut that
  was perpendicular to that edge, originating from the center of the edge."
- **[STATED] Failure mode.** "it struggles to do anything with internal corners — which there are now a lot
  more of since the suburb update." Weird shapes "come from buildings wrapping around interior corners of the
  larger lot" (i.e. a child plot straddles a reflex vertex and becomes L-shaped or worse).
- **[STATED] Fix 1 — interior-corner pre-cut.** "I've now updated the algorithm to first cut perpendicular to
  interior corners, which now results in much more rectangular shaped lots given to the original division
  algorithm." Reading: for every **reflex (interior/concave) vertex** of the lot polygon, emit a cut
  perpendicular to one of its incident edges, run these first, then hand the resulting (convex-ish) pieces to
  the generic divider. This alone "fixed many of the weird shaped building issues".
- **[STATED] Fix 2 — new cut prioritisation.** "finding the edge that is closest to the centroid of the lot,
  and then proposing a cut from that edge through the centroid."
- **[SHOWN] Why the old rule failed** — `133016301/images/10.png` (marker #5) is a debug plot: a red lot
  polygon ≈2 units wide × 4 units tall whose two **long vertical sides are subdivided into four unit-length
  segments each**, while the top and bottom are single 2-unit edges. The blue proposed cut is **vertical**
  (splitting the tall lot the wrong way into two tall slivers).
- **[INFERRED] The real defect in the longest-edge rule.** Because collinear vertices are retained on the long
  sides (from neighbouring subdivisions/road intersections), the *longest single edge* is the short
  end-cap (length 2), not the long side (4, but split into 1+1+1+1). "Longest edge" is therefore a **proxy for
  extent that breaks whenever an edge has been subdivided** — a scale-free property. The centroid rule is
  immune: the nearest edge to the centroid is a mid-height side segment at distance 1 (vs 2 for the end caps),
  and a cut from it through the centroid is horizontal, i.e. across the long axis. *Reasoning:* it is the only
  reading of that figure consistent with both the drawn vertex markers and the stated old/new behaviours. A
  re-implementer should therefore either (a) weld collinear edges before measuring, or (b) adopt the
  centroid-distance rule, which is what Thomas did.
- **[STATED] Fix 3 — narrow-section heuristic** (kept as a cheap filter, not the primary fix): "check if a
  building edge is connected to two close-to-perpendicular edges, and if that middle edge is too short then
  this is a narrow segment". Secondary heuristic: "check if the angle between two edges is too sharp".
  **[STATED] Known gap:** "these do not detect everything (e.g. hourglass shaped buildings)."
- **[STATED] Rejected alternative.** Filtering invalid building shapes wholesale is "fairly annoying to
  efficiently detect" — an explicit performance-vs-quality trade: "this feels like a good balance of
  performance and the quality of the result… due to the random nature and the heuristic based approach to
  filtering, it's not impossible" to still get a bad building.
- **[STATED]** A "tweak to wall generation" was part of the same fix (unexplained).

**Failure-mode gallery (what a re-implementer must avoid).**
- `06.png` (#1): a long riverside block where every party wall converges → a fan of ~12 slivers.
- `07.png` (#2): a suburb block of parallel razor-thin strips.
- `08.png` (#3): concave/arrowhead buildings in a suburb with pale-green garden background.
- `09.png` (#4): a **six-pointed-star building** in a plaza — degenerate output of the subdivision.

**Parameters mentioned:** none numerically. Unknown: the "too large for a building" area threshold, the
minimum-width and sharp-angle thresholds, and how many retries occur before a plot is discarded.

### 2.2 Buildings-in-lot subdivision — the July 2026 rewrite (shrink-then-split)
*Source: 164816716 body; images 07, 08, 09.*

**[STATED] The algorithm being replaced** (stated explicitly, in three steps):
1. "Pick an outside edge, project a splitting line inside the lot from the outer edge (perpendicular, so
   right-angled)."
2. "Find the intersecting points between the lot and the splitting line."
3. "If the opposite side intersection isn't a perpendicular / right angled split, then bend the splitting line
   in the middle so that both lot intersections are right angled."

**[STATED] Design intent behind it:** "I wanted the building edges to be perpendicular to the roads — which
they are, but it results in this bend."

**[STATED] Two failure modes:**
- The visible mid-line kink in party walls — `07.png` (#2) shows a block where each wall leaves the street at
  90°, bends mid-block, and meets the opposite street at 90°.
- **Cross-lot splits**: "splits on one end affect the other side of the lot, even when that's far away,
  resulting in more weird shapes". `08.png` (#3) highlights them in blue: one near-vertical split runs the
  entire height of a large pale lot from the north road to the south road, and one horizontal split runs its
  entire width — every building on both frontages is distorted by a decision taken at the opposite frontage.

**[STATED] The new algorithm:** "The new algorithm now does an initial split by shrinking the lot, and adding
that internal border as blocking edges when splitting… Now the split algorithm can run as it did before (but
without the internal bend), and it produces much more consistent results, that are usually closer to
rectangular."

**[SHOWN]** `09.png` (#4) draws the construction: a pale lot polygon with a **blue inset outline** a roughly
constant distance inside its boundary, following the lot's shape (including its sharp eastern point, where the
inset rounds/blunts the apex). The inset outline is slightly wobbly rather than a clean mathematical offset.

- **[INFERRED] Geometry:** this is an **inward polygon offset / negative buffer** (erosion) of the lot,
  producing (i) a perimeter ring of depth *d* which is where buildings go, and (ii) an interior core which is
  the back-of-plot void. The inset edges are registered as **blocking edges** so a splitting ray fired inward
  from a street stops at the inset instead of continuing to the far frontage — which simultaneously removes the
  bend (the ray never needs to re-aim at the opposite side) and removes cross-lot coupling (a ray can no longer
  reach the opposite frontage). *Reasoning:* it is the only construction that yields both stated benefits from
  one change, and it matches the drawn figure. The wobble is consistent with offsetting a polygon whose
  boundary already carries per-edge jitter, or with an offset computed on a densified/noised boundary.
- **[STATED] Known failure cases of the new method:** "if the area is too small to shrink, or there is an odd
  corner shape". No fallback is described.
- **Unknown:** the offset distance *d* (fixed metres? a fraction of lot depth? sampled from the building-depth
  distribution?), whether the core void becomes garden/yard or is re-subdivided, and the miter/round join rule
  at convex corners.

**Relation to §2.1:** the July-2025 post described the *proposal* rule (which edge/where to cut) and the
July-2026 post describes the *projection* rule (how the cut is carried across the lot). They are the same
recursive subdivider seen from two angles; a re-implementation needs both: choose the cut source edge by
centroid distance, pre-cut reflex corners, fire the cut perpendicular to the source edge, and terminate it on
the inset blocking ring rather than on the far boundary.

### 2.3 Castle district generation
*Source: 137812814 body; images 14, 15, 16.*

**[STATED] Trigger:** castles are generated only when a **king/queen feudal government** is configured (also
restated in comments on 144226579).

**[STATED] Pipeline, in order:**
1. Create a **random wall layout**.
2. **Fit it inside the large district lot assigned to the castle.**
3. Add a **gatehouse area**.
4. **Place the keep and other buildings** inside.
5. **Connect them with paths.**
6. Place any **cliffs and moats**.
7. Place a **road connecting the castle to the road network**.
8. Compute the **surrounding area**.
9. **Decorate the surrounding area** per the chosen decoration option.
10. Park option specifically: "try to create a **perimeter path around the castle**, and then add other random
    paths, and then decorate the resulting areas with **trees and grass**."

**[STATED] Configuration:** "castle district settings of the create settlement form".

**[SHOWN] Geometry read from the three examples:**
- The curtain wall is a **closed convex-ish polygon of 5–7 vertices** drawn as a thick dark band, with
  **circular towers at every vertex** plus **intermediate towers subdividing long runs** (14.png: towers at
  ~5 vertices + 3 mid-wall towers). Wall thickness is constant; an inner highlight line runs inside it.
- The **gatehouse** is a short wall spur carrying a pair of larger towers, attached to one wall face and
  projecting *inward* into the bailey in 14.png and 16.png (a barbican-like stub), forming a short passage.
- The **keep** is a single large solid block — **octagonal** in 14.png, a rotated **rectangle** in 15.png, a
  **square** in 16.png — sitting away from the walls and casting the scene's largest shadow.
- The **bailey** is a pale courtyard surface with faint thin **path polylines** connecting keep, gate and wall
  stairs; in 15.png and 16.png a **secondary inner wall** cuts off a smaller inner ward with its own towers.
- **Moat** (15.png): a blue band following an **outward offset of the wall polygon**, with a thin green
  (berm/grass) strip between wall and water — i.e. two successive outward offsets at different distances.
- **Cliff** (16.png): a dark grey skirt band immediately outside the wall, again an outward offset, with city
  blocks abutting it directly.
- **Park** (14.png): a green annulus around the castle; a **winding perimeter path** loops around it, secondary
  paths branch off it, and the resulting sub-areas carry tree clusters (dense on two sides, sparse elsewhere)
  and plain grass — exactly the stated "perimeter path, other random paths, decorate resulting areas".
- **Plaza** (15.png): the castle stands in a very large pale open polygon; the plaza's outline is a rough
  rounded quadrilateral fitted between surrounding blocks.

**[INFERRED]** "Create a random wall layout, then fit it inside the district lot" implies the wall polygon is
generated in **local/normalised space and then scaled + rotated + translated** into the assigned lot (rather
than being derived from the lot outline) — which is why castle wall shapes look like a family of related
polygons across examples while the lots differ. *Reasoning:* the wall polygons in 14/15/16 are similar in
character (5–7 vertices, near-convex, no relation to the surrounding block geometry), and "fitting" is a
separate stated step from "creating".

**Unknown:** how the wall polygon is randomised (radial jitter? template library?), the tower spacing rule,
how the "surrounding area" polygon is derived (offset of the castle district lot? Voronoi-style claim of
adjacent space?), and the decoration option list beyond park / plaza+moat / buildings+cliff.

### 2.4 Post-processing render effects (2D map, 3D mode and PNG export)
*Source: 137812814 body; images 17–26.*

- **[STATED]** "I discovered that the rendering library I use for the map had some easy-to-add extensions that
  would add some interesting rendering effects": greyscale, sepia, green tint, pixellation, dot screen,
  scanline. **[STATED]** "I also discovered that I could write my own rendering effects (as a
  post-processing shader), so I tried my hand at a crosshatch shading effect", with optional **noise** on the
  crosshatch "which makes it look a bit more like a pencil line".
- **[STATED]** "These effects are done within the normal map render, so the map is still fully interactive,
  and can also be used in the 3D render mode — and are also applied when taking a PNG screenshot."
- **[INFERRED]** This is a **Three.js `EffectComposer` post-processing chain**; the exact named set
  (greyscale / sepia / colorify tint / pixelation / dot-screen / film-scanline) is the stock three.js
  `examples/jsm` shader collection, and "write my own … as a post-processing shader" = a custom `ShaderPass`.
  *Reasoning:* the set matches one-for-one, the render-settings panel exposes MSAA and an **SVG renderer**
  toggle (three.js `SVGRenderer`) and a **3D** toggle, and the project brief already establishes FTG renders
  with Three.js. This also means the 2D "map" is itself a WebGL scene viewed orthographically, not a canvas2D
  drawing — which is why every effect and the 3D mode share one pipeline.
- **[SHOWN] Effect appearance:** `21.png` dot screen is a hard 1-bit halftone at a fixed dot pitch (structure
  is nearly destroyed at town scale); `22.png` scanline is horizontal dark lines + grain over the green tint;
  `20.png` pixellation quantises to ~6 px blocks; `23.png`/`24.png` crosshatch converts luminance bands to
  hatch densities — water becomes dense cross-hatch, roofs single-direction diagonal hatch, roads white,
  tree crowns stipple; `25.png` shows the crosshatch + noise applied to the **3D perspective view**
  (buildings extruded, roofs as prisms, horizon visible).

**[SHOWN] Render settings panel** (`26.png`, and the later tabbed version in `144226579/images/14.png`) —
the most complete parameter list in the slice:

| control | value seen | note |
|---|---|---|
| Antialiasing | Multisample anti-aliasing (MSAA) | dropdown ⇒ other modes exist |
| Shadows | enabled (checkbox) | |
| Shadow resolution | `Sharp (16384x16384)` | tooltip: "how soft the shadows are / how much memory that takes up" (144226579) |
| Building roofs | `Flattened 3D` | dropdown, greyed out in that screenshot |
| Default text layer | None | |
| Percentage of trees | 100.00 (slider) | render-time tree decimation — ties to the 50 k perf cliff (§2.5) |
| District Text → Style | `Arced across district` | |
| District Text → Distance scaling | checked | label size vs zoom |
| District Text → Custom scale | 0.80 | |
| Effects → Color effect | None | greyscale/sepia/green tint live here |
| Effects → Pixelation | 0 (slider) | |
| Effects → Vignette / Dot screen / Scanline | checkboxes | |
| Effects → Crosshatch | None (dropdown) | ⇒ crosshatch has variants (noise on/off) |
| SVG Renderer | checkbox, "read warning!" | |
| 3D | checkbox, "Unstable" | |
| Sun direction / height / colour | Southeast / Medium / White | later tab (144226579) |
| tabs | General · Shadows/Sun · Districts · Effects | Nov 2025 reorganisation |

"Note: these settings use cookies to remember your preference." ⇒ render settings are **client-side only**,
not part of the settlement file.

**[INFERRED] "Flattened 3D" roofs** means roof geometry is built as a real 3D solid and then flattened for the
2D map. `133016301/06.png`, `147332188/30.png` and `164816716/07.png` all show roofs shaded as **hipped roofs
with a ridge and facets radiating from each footprint corner** — the classic output of a **straight skeleton**
over the footprint polygon. *Reasoning:* facet boundaries in the images emanate from footprint vertices and
meet in a central ridge segment, which is the straight skeleton's defining picture; and a "flattened 3D"
option only makes sense if a 3D roof exists to flatten.

### 2.5 Forests, tree areas, and the tree budget
*Source: 144226579 body; images 09, 11, 12; `147332188/23.png`, `36.png`.*

- **[STATED] Visual change:** "This essentially boiled down to just rendering more trees, and enabling shadows
  for the forest trees."
- **[STATED] Two hard constraints that had blocked it:**
  1. **Render budget** — "if I increased the number of rendered trees to above **50k**, the framerate of the
     app would drastically drop." ("the performance issue was actually fairly simple" — fix unstated.)
  2. **Storage budget** — "all the individual trees were saved in the settlement file on the server — each
     individual tree is saved as a coordinate, so **50k trees is almost 1MB** of storage (which adds up over
     all the settlements)."
- **[STATED] Storage fix — the important architectural move:** "instead of saving individual trees for
  forests, I save a **shape which is filled with trees when the map is rendered**. This **tree area** concept
  can be edited via the edit settlement layout tools."
  - **[INFERRED]** Filling a shape with trees at render time and getting a *stable* map across sessions
    requires a **deterministic, seeded scatter** keyed off the area (seed stored with the shape, or derived
    from the settlement seed + area id). The scatter itself is a blue-noise/Poisson-style placement:
    `09.png` shows uniform coverage with no clumping and no overlap-free gaps. *Reasoning:* the alternative
    (unseeded random) would make the same settlement look different on every load, which would be immediately
    visible and is contradicted by trees having stable identity across the season screenshots (§2.9).
  - Note the asymmetry a re-implementer must preserve: **forest** trees are *area-filled*, but individually
    placed/edited trees (hedgerows, copses, decorations) remain **per-coordinate** — the tooling exposes both.
- **[STATED]** Added "minor color variation to the trees", and "increased the number of trees in the main
  settlement, suburbs, and farmland edges".
- **[SHOWN]** `09.png`: a forest region is a **straight-edged polygon** (a sharp NW–SE boundary is visible
  cutting the canopy), filled edge-to-edge with individual crowns; crowns are drawn as scalloped blobs with a
  dark outline, an interior stipple, 4–6 green hues, and a soft drop shadow offset down-left.
- **[SHOWN]** `11.png`: **hedgerow trees follow field boundary polylines** — the trees sit *on* the boundary
  line, spaced irregularly with occasional doubling/tripling into small clumps.
- **[SHOWN]** `153121107/09.png`: an entire island lobe rendered as forest, with the forest polygon's
  boundary following the coastline, a stream drawn through it, and two small lake holes — so tree areas
  support **holes / are clipped against water**.

### 2.6 Farmland: 'Farmsteads' vs 'Around perimeter'
*Source: 144226579 body; images 10.jpg, 11; `147332188/25.png`, `39.png`; `153121107/07.png`, `08.png`.*

- **[STATED] New mode 'Around perimeter':** "only draws farmland on the **main roads leading out** of the
  settlement, and **around the settlement perimeter**." Made the **default for hamlets**, with the stated
  in-world rationale: "having less people means that less large scale farming is being done."
- **[STATED] Old mode renamed 'Farmsteads'** (configurable in the **Landscape** menu) and tweaked: "the
  buildings will now be generated in the **middle of a larger plot of land**, and will connect to a road via a
  **driveway**. Additionally, **some people will live in the farmsteads** — though some farmhands will still
  commute from the main settlement."
  - This is a genuine coupling between geometry and the population model: farmstead lots create residents.
- **[STATED] Desert variant (147332188):** "If farms are enabled, fields will be placed around the settlement
  perimeter (similar to hamlets), **unless there is a river present, in which case they will generate around
  those**."
- **[SHOWN] Field geometry.** Two distinct regimes:
  - *Around-perimeter* (`10.jpg`, `147332188/25.png`): fields are **individual rotated quadrilaterals**
    (roughly square, 1–2 building-blocks in size) scattered along the road and around the settlement capsule,
    sitting on plain grass with visible gaps between them.
  - *Farmsteads / full farmland* (`137812814/17.png`, `153121107/07.png`, `08.png`): fields **tile the whole
    surrounding area** as a planar partition of straight-edged convex-ish polygons — visually Voronoi-like /
    a subdivided ring — with hedgerow trees along shared edges and small circular markers at boundary
    junctions. Sizes vary by an order of magnitude; long thin strip fields appear along roads.
  - **[INFERRED]** The full-farmland partition is generated by subdividing the annulus between the settlement
    perimeter and the map/land boundary, with roads acting as partition seams (fields visibly abut roads and
    change orientation across them). *Reasoning:* field edges in `137812814/17.png` radiate from the
    settlement and terminate on roads and on the land boundary, and every road crossing the ring is a field
    edge; a pure Voronoi over random seeds would not respect roads this consistently.
- **[SHOWN] Crop rendering:** each field carries **parallel stripe hatching** (crop rows) at a per-field angle,
  with a colour vocabulary: pale-yellow striped = ripe cereal, pink/mauve striped = ploughed/fallow, mid-green
  = pasture (often unstriped), olive/dark green = another crop, and **outline-only rectangles with no fill**
  (see §4 — these are *fenced yards*, not fields, per the creator's comment).
- **[STATED] 157283634:** 'Regenerate area' gained "the ability to **re-roll area as farmland**, to help you
  generate fields like in the normal generation" — so the field generator is callable on an arbitrary
  user-drawn polygon.

### 2.7 Blurred field edges
*Source: 144226579 body; image 11.*

- **[STATED]** "Certain field edges are now blurred into the background underneath them." On by default "for
  devices with more powerful hardware"; toggleable in render options.
- **[SHOWN]** In `11.png` the pale-yellow field's SW edge dissolves into the green beneath over ~15–20 px
  while the *same field's* other boundaries stay crisp, and the crisp boundaries are thin blue-grey lines.
- **[INFERRED]** A per-edge feathered alpha ramp (or a blurred mask) applied only to edges that border
  *background* (grass) rather than edges shared with another field — which is exactly what "blurred into the
  background underneath them" says, and matches the observation that shared field/field edges stay sharp.
- **[STATED] Cost:** it is expensive enough to be hardware-gated, and the same post notes performance gains
  "immediately lost after adding the perimeter smoothing" — smoothing/blurring is the known hot spot.

### 2.8 Settlement perimeter: expand + round
*Source: 144226579 body; image 12; also `147332188/25.png`, `144226579/09.png`.*

- **[STATED]** "The settlement perimeter created **after suburb generation** is now slightly **expanded** to
  give the appearance of some **garden space behind houses**, and is also **rounded off** to feel more
  natural." Disable-able in the **suburb settings**.
- **[STATED] Cost:** "some performance improvements (which were immediately lost after adding the perimeter
  smoothing)."
- **[SHOWN]** `12.png`: the built-up area is wrapped in a pale-green ring 1–3 building-depths wide whose outer
  boundary is a smooth curve with large radii, while the building fronts inside it remain angular; the ring
  follows the dendritic outline of ribbon development along radial roads, bulging around each finger.
- **[INFERRED]** An **outward polygon offset (buffer) with round joins**, or an offset followed by corner
  smoothing (Chaikin/spline). *Reasoning:* the boundary is everywhere at a near-constant distance from the
  outermost buildings, preserves concavities between road fingers rather than taking a convex hull, and has
  uniformly rounded convex corners — the signature of a round-joined buffer. Ordering matters: it runs **after
  suburbs**, so the suburbs define the silhouette, and it is the surface that farms/decorations are then
  placed outside of.

### 2.9 Day/night cycle, weather, seasons
*Source: 147332188 body; images 26–35; settings in 29.png; `144226579/14.png`.*

- **[STATED] Day/night:** "the sun will now move throughout the day and set at night. This will change the
  **direction of the shadows**, as well as the **brightness / color of the light source** as the time changes.
  At night, people will start to **turn on lights** which will be visible on the map." And crucially:
  "**Only buildings that have an awake adult in them will have their light turned on.**" — the renderer reads
  the population simulation's per-hour state.
- **[STATED] Controls:** hemisphere (which direction shadows are cast), sunrise direction (sun moves E→W or
  W→E), sunrise & sunset times (manual or season defaults).
- **[SHOWN] Exact defaults (29.png, Winter):** Weather `Snow`, Season `Winter`, Hemisphere `Northern`,
  Sunrise direction `East`, `Use season defaults` ✔, Max sun height `Low`, **Sunrise hour `8`, Sunset hour
  `16`**. The panel also says "To turn off the day/night cycle, use the option in the render settings."
- **[SHOWN] Clock widget (28.png):** "13:00 Tuesday" with `Next Hour` and `Time Skip` — **1-hour simulation
  granularity**, named weekdays (calendar length is configurable: create-form section *Calendar — hours in
  day, days in week*).
- **[STATED] Weather matrix** (4 states, each a pair of orthogonal flags):

  | weather | ground | brightness | shadows |
  |---|---|---|---|
  | Clear (default) | normal | brighter | cast |
  | Cloudy | normal | darker | none |
  | Snow (clear skies) | snow-coated | brighter | cast |
  | Snow (cloudy) | snow-coated | darker | none |

- **[SHOWN]** `32.png` / `33.png`: in snow, buildings, trees, fields and open ground all go white/pale-blue
  but **roads stay brown** (cleared/muddy) — a deliberate legibility choice that keeps the street network
  readable; in the cloudy variant the whole image flattens to grey-lavender with zero cast shadows.
- **[STATED] Seasons** change "how **deciduous** trees are rendered, as well as the default sunrise and sunset
  times."
- **[SHOWN]** `34.png` (autumn) and `35.png` (winter) are the *same tree instances in the same positions*:
  autumn draws each crown in an individually randomised warm hue (red/orange/yellow/olive); winter replaces
  the crown sprite with a **dark radiating bare-branch star** at the same anchor. This confirms trees are
  persistent instances with a per-instance colour/variant index, re-skinned per season.
- **[SHOWN]** `26.png` sunset: warm pink-orange light, long shadows to the west, tree crowns take the light
  colour. `27.png` night: dark teal, buildings nearly black with a few **small yellow window lights**, fields
  faintly luminous.

### 2.10 Climate presets
*Source: 147332188 body; images 36–40; `151265004/05.png`.*

- **[STATED] Temperate** — deciduous / coniferous / mix. "Previously generated settlements are equivalent to
  the deciduous option." Coniferous trees "don't change their colour or shape as the seasons change. In snow,
  they become white."
- **[STATED] Desert** — "sand as the main background", palm trees instead of deciduous/coniferous; farm rule
  as in §2.6.
- **[STATED] Polar** — "no trees are placed (unless forests are requested), and the background is permanently
  snow."
- **[SHOWN]** `36.png` conifers: small dark-green crowns, tighter and rounder than deciduous, used both as
  suburb scatter and as a boundary hedgerow line. `38.png` desert: sand ground with fine noise, **flat-topped
  brown buildings**, **grey roads with cream casing** (inverted from the temperate scheme), palm trees drawn
  as green star-bursts with soft shadows, zero grass. `39.png` desert+river: a blue meander with a **band of
  small rectangular fields hugging both banks** (green / pale-yellow / brown chequer) and nothing green away
  from the water — an explicit hydrology→agriculture dependency. `40.png` polar: everything white, buildings
  reduced to grey-brown marks, roads as hairlines.
- **[SHOWN]** `151265004/05.png` shows the climate dropdown value `Temperate (deciduous trees)` and a sibling
  field **`Building material: Wood`** — building material is a first-class generation input.

### 2.11 Outside-settlement decorations (ponds, copses, stone circles, ruins)
*Source: 147332188 body; images 22, 23, 21, 24, 25.*

- **[STATED]** Four types, "All of these options are procedurally generated so that no two are alike."
  "Certain decoration types also have a **path generated to connect the decoration to the road network**."
  Generated for **all** settlement types (not just hamlets), and "farmland / forests will be generated around
  them". Count configurable in create form → **landscape settings**. All four also got a **3D model**.
- **[SHOWN] Pond** (`22.png`): an irregular **near-convex polygon of ~10 vertices** (a jittered ellipse) in
  flat blue with no depth shading, ringed by ~12 individually placed trees standing off the shore by a small
  margin — i.e. a shoreline tree band, denser than the surrounding scatter.
- **[SHOWN] Copse** (`23.png`): 2–3 loose clusters of 8–20 trees with varied crown sizes, cluster diameter
  ~⅓ of the frame, with stragglers between clusters — not a disc, more a clumped point process.
- **[SHOWN] Stone circle** (`21.png`): **~11 small grey rounded-rectangle stones evenly spaced on a circle**
  with slight radial/angular jitter and varied stone sizes, standing on a **pale circular clearing** that is
  soft-blended into the grass; a faint thin path runs from the road (left) to the circle; one tree sits just
  outside the ring to the SE.
- **[SHOWN] Ruins** (`24.png`): **two adjoining rectangles** of wall drawn as **short grey dashes with gaps**
  (a "broken wall" stroke), one rectangle carrying an internal partition, the pair offset and slightly rotated
  relative to one another — i.e. a tiny rectangular-building floorplan with a randomised fraction of each wall
  removed.
- **[SHOWN] In situ** (`25.png`): a hamlet at a crossroads with a pond ~1 settlement-width to the west joined
  by a visible path, a copse to the SE, a stone circle to the south joined by a path, perimeter fields as
  rotated quads, and a **low-density ambient tree scatter across the entire landscape** (roughly Poisson, much
  sparser than forest).
- **[INFERRED]** The pond generator, the coastline/island outline generator and the castle moat are the same
  primitive (Thomas states this in 153121107: the island code was "already written for the coastline
  generation (and the recent **pond / castle** work)"), so a re-implementation should build **one
  randomised-closed-outline routine** with a size/roughness parameter and reuse it for pond, lake, island,
  coast arm and moat.

### 2.12 Islands
*Source: 153121107 body; images 07, 08, 09.*

- **[STATED] Reuse:** "Remarkably, this was actually quite easy — the majority of the code I ended up needing
  to generate islands I had already written for the coastline generation (and the recent pond / castle work)."
- **[STATED] UI/params:** "The old coastal checkbox is now a dropdown, with options for 'coastal' and
  'islands'." "these share a lot of the same code as the coasts, so the options for configuring islands are
  very similar… You can configure the same defaults (**rocky / cliffs / beaches**), and manually configure the
  island coasts in the same way (**though there is only one 'arm', not two**)."
  - **[INFERRED]** A *coast* is modelled as a curve crossing the map with **two arms** anchored to the map
    border; an *island* is the same curve **closed on itself** (one arm). *Reasoning:* it is the only reading
    of "one arm, not two" that is consistent with a coastline being an open boundary between land and sea and
    an island being a closed one, and it also explains why the ocean/river classifier (§2.13) keys on
    map-border contact.
- **[STATED] Quality claim:** "I think they look pretty good, and there is a nice **diversity to the shapes**."
- **[SHOWN] Three shape families in three examples:** `07.png` a compact rounded triangle with a continuous
  **sand beach ring** all the way around; `08.png` an elongated lozenge with a **rocky, stippled/crenellated
  shoreline** and only short sandy pockets in bays; `09.png` a **dumbbell/bone** shape — two lobes joined by
  a narrow isthmus, with mixed rocky shore, beaches and grey cliff patches.
- **[SHOWN] Coast decoration vocabulary:** beach = a smooth tan band of roughly constant width inside the
  shoreline; rocky = a dense scatter of small dark blobs *straddling* the shoreline (both on land and in the
  shallows); cliff = flat grey patches. These are applied per-segment, not globally — one island carries all
  three.
- **[SHOWN] Island content:** the settlement occupies one lobe with a **harbour** (a comb of thin parallel
  jetties, `07.png` west shore); the remaining land is partitioned into fields with hedgerows, or filled as
  forest (`09.png` SE lobe, with a stream and two lake holes). Roads run from the town to the coast.
- **[STATED] Authoring path (and its bug):** islands can also be drawn by hand in the *initial map state* tool
  — "you just need to draw **two ocean shapes** to surround the islands (and those ones **can** intersect)".
  A user drawing an island as a **single self-intersecting ocean shape** "broke some of the logic in the
  server", so self-intersection is now prevented at draw time (§2.16).

### 2.13 Water bodies: classification, depth, foam, texture
*Source: 153121107 body; images 07, 08, 09, 10, 11.*

- **[STATED] Ocean-vs-river heuristic:** "There are some heuristics to decide if a water body is an ocean or a
  river (or sometimes like a lake) which basically boils down to '**if a significant portion of the body
  touches the map border, it's an ocean, otherwise it's a river**'."
  - Note the honesty of the fallback: lakes are lumped with rivers. Threshold ("significant portion") unstated.
- **[STATED] Effects:** a **water depth effect**; a **foam effect near ocean edges**; "a similar effect applied
  to river edges (though **less strong**)"; "Water bodies also have a subtle **texture** applied (which can be
  controlled with the texture option in the render settings)." All disable-able in render settings.
- **[SHOWN]** `07.png`/`08.png`/`09.png`: the sea is a smooth gradient — pale blue hugging the coast grading
  to deep blue outward over a distance several times the beach width, and it follows every concavity of the
  shoreline (bays are pale well into their mouths).
- **[SHOWN]** `10.png` (ocean foam, zoomed): a **white band of near-constant width immediately offshore**,
  soft-edged on its seaward side, tracking every wiggle of a jagged rocky coast; rocks scattered along the
  same line.
- **[SHOWN]** `11.png` (river): a constant-width light-blue band with a **narrow lighter margin** along both
  banks, then a pale-green bank strip of fixed width, then forest. River width is uniform along its run.
- **[INFERRED]** Both depth and foam are **distance-from-shore functions** — most simply a signed distance
  field (or an iterated blur of the land/water mask) sampled in the water shader, with foam = a narrow band at
  small distance and depth = a longer ramp. *Reasoning:* both features have widths independent of local
  coastline curvature and both penetrate concave bays uniformly, which an outline-stroke approach would not do.
- **[STATED] Architectural constraint that shapes all of this:** "These effects aren't animated — the maps
  currently only **render on demand (i.e. when you interact with the map in some way)** to conserve resources
  on the rendering device (so they don't need to run at 60fps all the time). This behaviour means that
  animating things are impossible." A re-implementer inheriting this design gets cheap idle cost but must
  forgo animated water, and must explicitly invalidate/redraw on every state change (time step, layer switch).

### 2.14 Road network as a graph; the duplicate-intersection bug
*Source: 153121107 body.*

- **[STATED]** "The **road network is basically a graph data structure (to support the fill tool)**."
- **[STATED] Bug:** "after some map editing, the **district re-roll** feature would stop working… it seemed
  that **two different intersections could have the same world position**, which is bad… so this breaks
  things. I *think* I've found the root cause, and have **corrected all of the existing settlements** to
  remove the duplicates."
- **[STATED] Fix (May 2026, 157283634):** "Improved intersection **snapping** when editing the layout,
  hopefully will reduce some errors when filling / re-rolling areas."
- **[INFERRED]** Node identity in the road graph is (or became) **position-keyed**, so two nodes at the same
  world position alias and the face-traversal used by the fill / re-roll tools (walking the planar subdivision
  to recover a closed lot) either loops or fails. *Reasoning:* "two different intersections could have the same
  world position, which is bad… the road network is basically a graph… so this breaks things" is precisely the
  failure signature of a planar-subdivision face walk over a degenerate vertex.
- **Lesson for a re-implementation:** the lot/block polygons are **recovered from the road graph by face
  traversal**, not stored independently — which is why a single duplicate vertex disables area re-rolling.
  Snap tolerance and vertex welding are load-bearing, and any editing path must maintain planarity.

### 2.15 Self-intersection prevention in drawing tools
*Source: 153121107 body.*

- **[STATED]** A user drew an island as one self-intersecting ocean shape; "This broke some of the logic in the
  server, and I also realised this was possible in the basic edit layout drawing (which **would not look right
  due to the way the geometry works**)." "The easiest way to fix this was just to **prevent it from happening
  as you draw**."
- **[STATED] 157283634:** "More validation when editing the settlement layout to try and ensure no invalid
  layouts are created."
- **[INFERRED]** The downstream geometry (polygon offsetting for perimeters/moats/coast bands, and area fill)
  assumes **simple polygons**; rather than robustify, the chosen strategy is **input validation at the UI
  boundary**. That is a defensible, cheap architecture choice worth copying: keep one invariant ("all authored
  polygons are simple") and enforce it at the only place polygons are authored.

### 2.16 'Ponds' in the initial-state drawing tool
*Source: 153121107 body.* **[STATED]** "these behave the same as oceans, but they **don't get decorated with
the ocean decorations** (like rocks / cliffs / beaches / etc.)." ⇒ water bodies carry a *decoration class*
independent of their geometry class.

### 2.17 District name generation
*Source: 157283634 body (no images).*

- **[STATED]** "I added **more options to the tables**, to encourage more diverse names. I also **encoded the
  number of syllables in the name parts**, so if a **nickname** is used it should always be **at most 3
  syllables**, which improves the readability of the names."
- **[INFERRED]** Names are assembled from **weighted tables of name *parts*** (a Markov-free, concatenative
  generator), and each part row now carries a `syllables` integer so the assembler can **budget total
  syllables** for certain name roles. *Reasoning:* "name parts" + "encoded the number of syllables in the name
  parts" + a role-specific cap ("if a nickname is used") only makes sense as a per-part metadata field
  consumed by a constraint at assembly time.
- **[SHOWN]** District labels observed: *Ashpoint*, *Linledge* (`159738553/12.png`), *Hearth Clearing*
  (`164816716/08.png`) — i.e. `<A><B>` compounds and `<Noun> <Noun>` forms.

### 2.18 Map layers (user-definable) and thematic rendering
*Source: 159738553 body; images 12, 13, 14, 15, 16.*

- **[STATED] Built-in layers** (`12.png` dropdown): **Satellite, Building type, Useful shops, Districts,
  Favourite buildings, Favourite people, Edit layers**.
- **[STATED] Custom layers:** "For each layer, you can customise every entry with a **colour**, and **selection
  criteria**… The selection criteria options are **building type**, **specific building type**, and **specific
  building**. You can have **multiple matchers** for a specific entry." Customisable built-ins: 'Building type'
  and 'Useful shops'.
- **[STATED] Scope:** "The customised layers are **attached to the given settlement** — which means they won't
  be shared between settlements." Reusable defaults live in create form → general → **Default layers**
  (`14.png`) and travel via the save-settings feature.
- **[SHOWN]** `13.png` — Edit Layers dialog: Label, Color (hex, e.g. `#4f751a`, with palette picker),
  Matchers / Add matcher, Selection type dropdown (Building type | Specific building type | Specific building),
  delete, Save Layers.
- **[STATED] Favourite people layer:** "will highlight where all of the starred people are on the map **at the
  given time, and will update as time progresses**. Each favourited person gets their own colour (though
  **people in the same building will get the same colour**)."
- **[STATED] Favourite buildings layer:** upgraded from "a single colour (red) for all favourited buildings,
  with no legend" to per-building colours + legend.
- **[SHOWN] Thematic rendering convention** (`15.png`, `16.png`): when a thematic layer is active the base map
  is **desaturated to a white/grey rendering** (buildings white with grey outlines, roads grey) while trees
  keep colour, and only matched features are drawn in saturated colour — with a **legend card** (serif
  small-caps "LEGEND", colour swatch + label rows) docked top-right. Legend entries are person names
  (*Reondoresin Surast*, *Ormo Squigglecheek*…) or building names (*Majestic Stones*, *Pantheon of Zyneas*,
  *Thugar's Fiber Shop*…).

### 2.19 Grid overlay, units and scale bar
*Source: 159738553 body; images 20, 21, 22; 157283634 body.*

- **[STATED]** "The bottom button lets you toggle between using **meters and feet**… the top lets you toggle a
  **grid display**. The size of the grid will depend on the unit of measurement selected. For meters, it's a
  **2x2** grid, and for feet it's a **5x5** grid. When you toggle the grid, it'll cycle between **off > light >
  dark > off**."
- **[STATED] Known limit:** "you'll need to **zoom in a fair way** to get the proper grid effect — if you're too
  far out some of the lines may be **too thin and won't be rendered**." (A sub-pixel line-culling artefact —
  worth designing around, e.g. by fading the grid out below a zoom threshold.)
- **[STATED] 157283634:** feet also change "the scale in the bottom right of the map, as well as the unit shown
  when using the **ruler tool**"; unit set in render settings. (A patron later asked for imperial units in
  Aug 2025 and Thomas added it here — see §6.)
- **[SHOWN]** `20.png`: scale bar = plain black bar with end ticks labelled `100m`; buttons stack = grid,
  pencil (edit), `m` (unit); `21.png`/`22.png`: the grid is a uniform square lattice drawn **over everything
  including buildings and water**, light (white) or dark (grey) variant.

### 2.20 Regenerate area / bulk edit buildings (authoring on top of generation)
*Source: 157283634 and 159738553 bodies; images 17, 18, 19; comments.*

- **[STATED]** District re-roll renamed **'Regenerate area'** (hammer-and-wrench icon above the settlement
  name); can re-roll an area **as farmland**; "The district form has been **reworked to let you draw district
  areas** instead of needing to select individual lots."
- **[STATED] Bulk edit buildings** — two modes:
  - **Edit**: set shared general details across a selection; "The name and sub-locations are optional, if you
    want to leave them unchanged. Note that **people linked to the buildings are not updated in any way**."
  - **Regenerate**: "instead of completely demolishing a lot and recreating it with new buildings, roads, and
    decorations, this just **regenerates existing buildings (without changing the look of the building)**" —
    i.e. re-rolls building *function/contents* while keeping footprints. "regenerating buildings will delete
    any residents and may update other people."
- **[SHOWN]** `18.png` — Bulk Edit ▸ Edit Details tabs reveal the **building data model**: *General*
  (Building name, Building type [e.g. `Residence`], Specific building type, Description, Religion) ·
  *Opening times* · *Stock* · *Services* · *Sub-locations* · *Resources*.
- **[SHOWN]** `19.png` — Bulk Edit ▸ Regenerate parameters: warning "Regenerating buildings will delete any
  residents, and new people will be created. **This action cannot be undone.**"; **Overall lifestyle**
  (`Wealthy`); **Create residences automatically** ✔; **Create schools** ✔; **Use existing schools** ✔;
  **Distribution type**: `PRESET | OVERALL TYPE | SPECIFIC TYPE`; **Preset**: `Commercial`.
- **[STATED] Known gaps (comments, 157283634):** no control over **building density** in area regeneration; no
  control over **road padding**; and a bug where regenerated buildings would line **invisible edges** — fixed
  same-day, "unless the *place anywhere* option is enabled". A patron reports regenerated blocks come out
  visibly denser than the original generation with the same settings.

### 2.21 Persistence, wire format and performance
*Source: 164816716 body; 157283634 body; 153121107 body; 144226579 body.*

- **[STATED] Format:** "the settlement is saved as a **protobuf file**".
- **[STATED] Coordinate encoding fix:** "I was using two **int32**s for the x and y coordinate of positions. I
  realized that the encoding of those numbers when negative was inefficient, and as **the FTG map is centered
  around 0,0**, roughly half of those numbers are negative. Switching to the **sint32** type is what results in
  that size reduction." → **≈5 % smaller settlement files**.
  - (Protobuf `int32` varint-encodes negatives as 10 bytes; `sint32` zig-zags them. This is a real, copyable
    lesson for anyone storing centred integer coordinates.)
  - Corollary: **positions are integers**, and the world origin is the map centre.
- **[STATED] Simulation speed:** "+~10 %… mostly from very small tweaks to the way that **people are read from
  the settlement file** to reduce the amount of work needed to be done." ⇒ the simulation reads people out of
  the serialised settlement rather than from a separate live store.
- **[STATED] Download size:** 157283634 — "I've optimised the **endpoint that the client calls to download the
  settlement map**. This resulted in a **~50 % decrease in the download size**."
- **[STATED] Load/render time:** 153121107 — "I've improved the loading time to render a settlement (turns out
  I was doing some not-great things that were very inefficient) — this is especially noticeable on larger
  settlements… This took **~10s** for me to render (this is a **metropolis**) — previously this would have
  taken roughly **20s**." Plus a **progressive draw** during load ("You can see the progress of the map loading
  visually… I just think it's neat"). `12.gif` frame 1 shows the "Downloading Settlement Map …" spinner that
  precedes it.
- **[STATED] Storage pressure as a design driver:** the 50 k-trees ≈ 1 MB figure (§2.5) and "which adds up over
  all the settlements" — FTG is server-hosted and per-settlement storage cost directly constrains what can be
  procedural-at-save vs procedural-at-render.
- **[STATED] Render budget:** >50 k rendered trees ⇒ framerate collapse; mitigations shipped = tree-area fill,
  *Percentage of trees* slider, shadow-resolution option, on-demand rendering (§2.13).

### 2.22 People / economy model (as revealed by this slice)
*Sources: 149103655, 151265004, 157283634, 164816716 bodies + comments; images `149103655/10.png`,
`151265004/06.png`, `151265004/08.png`, `164816716/06.png`.*

- **[STATED] Race relations matrix** — create form ▸ People ▸ Relations. "used to configure **how and when
  different races will partner up with one another**… this will allow you to create races that **do not have
  children / parents**, or have more complicated lineage."
  - **[SHOWN]** `149103655/10.png`: a pairwise table `Human-Human`, `Human-Elf`, … with a 0–100 **Proportion**
    slider per pair; **9 races → 45 unordered pairs** ("1–10 of 45"); defaults are **same-race 100.00,
    cross-race 0.00**. Tabs on the People section: `RACES | GENDERS | RELATIONS | EDUCATION | STATS`.
- **[STATED, from comments] Gender partner config:** "When a person is generated, they are also given a
  **gender that they'd like to partner up with**. That gender is **picked from a weighted config** (e.g. in the
  default settings a male is more likely to partner up with a female)."
- **[STATED] Factions:** arbitrary named **roles**, each with a headcount and **member criteria** — professions,
  races, genders, religions; "Only people meeting **all** of these criteria will be added to that role."
  "You can create **multiple roles with the same name, with different requirements**, and the roles will be
  **merged together** once the settlement is generated."
  - **[SHOWN]** `151265004/06.png`: Title `Adventurer`, **Limit** slider `25`, "Only people who work at faction
    buildings" ✔, profession chips (`Adventurer`, `Alchemist guild`, `Blacksmith`), race chips
    (Human, Elf, Dwarf, Halfling, Gnome, Half-Orc, **Dragonkin, Demonkin**, Half-Elf — the *generic fantasy*
    naming), gender chips (male, female, non-binary, agender), religion chips (Fantasy Good/Evil/Neutral).
    Tabs `RANDOM | CUSTOM`.
- **[STATED] The faction/building headcount bug** (comments, 151265004 and 153121107): "the faction controls
  how many people will join a faction. The **adventurers guild building** that is created with it will
  **always create 22 people**, just some won't join the faction" (a second patron reports 20). Fixed
  2026-03-22, and generalised in 157283634: "Factions-based-buildings will create the number of roles based on
  the **faction request, not a constant**."
  - This is a concrete coupling bug worth designing against: **building templates carry fixed job counts**
    while factions carry requested membership, and the two must be reconciled.
- **[STATED] Person model facets** (from Advanced Person Search, `151265004/08.png` + `164816716/06.png`):
  **Person type** = `Unemployed | Delegating | Working | Studying | Retired`; race; gender; religion;
  profession (incl. *custom professions*); **works at** a building; **age** (category *young adult / adult /
  elderly*, or exact / range e.g. `25-30`); free-text notes. Search limit up to 100 (default 50).
- **[STATED] Simulation fragility:** 157283634 — "Fix an issue where **bulk editing people could result in a
  carer being deleted** (which would **break simulation as the caree would become confused**)" and "Fix an
  issue where a **faction meeting would be at a building that doesn't exist**." ⇒ people hold references to
  other people (carer/caree) and to buildings, and dangling references are a live failure class.
- **[STATED] Supply chain is a real constraint on map generation** (comments, 144226579): on adding new
  terrains/climates — "the main challenge is coming up with **new buildings and layouts to keep the supply
  chain happy**. (E.g. how do people get food in a desert town with no rivers)." This is the single most
  important economy fact in the slice: **the map generator's biome choices are gated by an economic
  production/consumption model that must remain solvable.**
- **[STATED] Residential district ordering** (157283634): "Previously the district with the **largest
  population** in the settlement would be placed first (which tended to align with the overall lifestyle
  option). This means that that district would be placed **closer to the settlement center**. You can now
  specify if you specifically want the order to be upper class – middle class – lower class, or vice versa."
  ⇒ **district placement order = distance from centre**, and the default ordering was an emergent side effect
  of population size, not a designed social geography — now explicitly controllable.

### 2.23 Building interiors / floorplans (in development)
*Source: 164816716 body; image 10.*

- **[STATED] Status:** "I have set up the **infrastructure to support storing the buildings**, as well as the
  basic UI for displaying them… **a very basic room splitting algorithm**, along with **very basic logic for
  placing windows and doors**."
- **[SHOWN]** `10.png`: a building footprint (a slightly non-rectangular quad) with **thick brown walls**
  subdivided into **8 rooms**. The subdivision is clearly a **recursive slicing/BSP**: one dominant horizontal
  cut across the full width, then vertical cuts within each band, then further horizontal cuts — every internal
  wall runs from one wall to another without a T-free floating end. Internal walls are **slightly skewed**,
  inheriting the footprint's non-orthogonality (i.e. the split is done in the footprint's own frame, not
  world-axis-aligned). **Windows** appear as short pale gaps in the exterior wall (3 on the left, 2 on the
  right). **Doorways** are plain gaps in walls. The **entrance** at the bottom is drawn as a small hatched
  rectangle with a downward arrow (a stair/threshold glyph). No furniture, no floor texture.
- **[STATED] Explicit to-do list** (the author's own roadmap, useful as a feature checklist): floor textures;
  decorations (tables, fireplaces, chairs, forges); floor-plan options (**interconnected rooms or corridors**);
  show people in the building; edit interiors after generation; lighting options; complex multi-level buildings
  like castles; settle the art style ("multiple options?") and have it drawn; 3D rendering.
- **[STATED] Scope intent:** "I want this feature to be supported for **all the buildings that FTG can generate
  by default**", art effort undecided, "the initial version may not support 3D", no release estimate.

### 2.24 Initial water direction
*Source: 157283634 body; also comment on 137812814.*

**[STATED]** "you can now configure the **compass direction** that you want the rough water direction to be in
(e.g. to the north, to the southeast, etc.). If only coasts or rivers are enabled, then they will appear in
that direction, **relative to the center of the settlement**. If **both** are enabled, then the **coastline will
be in that direction and rivers will be perpendicular to that**." (Requested by a patron in Apr 2026: "Is it
possible to pick which side (N, E, S, W) a beach is on" — Thomas: "You can draw the initial water state. I'd
like to add an option for the initial direction, but haven't gotten around to it yet.")

### 2.25 Create-settlement form = the generator's full input schema
*Sources: `144226579/13.png`, `149103655/07.png`, `149103655/08.png`, `151265004/05.png`,
`159738553/14.png`.*

**Basic form, Nov 2025** (`144226579/13.png`): Name (blank ⇒ random) · Size (`Town (~4000 people)`) ·
Layout preset (`Medieval europe`) · Average Lifestyle (`Comfortable`) · Coastal ☐ · Rivers ☐ · Farms ☑ ·
Forests ☐ · Walled ☐.

**Basic form, Feb 2026** (`151265004/05.png`) — additions in bold: Name · Size · Layout preset · **Climate
(`Temperate (deciduous trees)`)** · **Building material (`Wood`)** · **Races (`Generic fantasy`)** ·
**Religions (`Golarion (unofficial)`)** · Average Lifestyle · Coastal · Rivers · Farms ☑ · Forests ·
**Reserve natural area** ☐ · Walled.

**All-settings landing page** (`149103655/07.png`) — 12 sections, with the creator's own one-line summaries:

| section | summary shown |
|---|---|
| General | Name, size, lifestyle, guards |
| Settlement layout | **Road & building placement, walls** |
| Districts | **Decorations, growth, and placement** |
| People | Races, genders, education, stats |
| Government | Pick types, titles, leader names |
| Factions | Guilds, mercenaries |
| Landscape & climate | **Farms, forests, place-in-world, decorations** |
| Water | **Rivers, oceans, draw water** |
| Religion | Religions, gods |
| Calendar | Hours in day, days in week |
| Items and services | Items, services, global prices |
| Buildings | **Limits, initial numbers, proportion of each** |

Footer controls: `Show estimate` · docs (book) · save · load · (later) reset · `All settings` toggle ·
`Create Settlement`.

**Save settings** (`149103655/06.png`): Label · Save location (`Cloud`) · **Sections to save** (10 checkboxes:
General, Layout, Districts, People, Government, Factions, **Landscape & water**, Religion, Calendar,
**Buildings & items**) — i.e. the 12 UI sections collapse to 10 save units. **Load settings**
(`149103655/09.png`): named entries with a cloud badge for cloud-stored ones, download + delete per row, and
"Upload from file".

**[STATED] Partial-overwrite semantics:** "a new option to **only save specific sections** in the form, so
that when you load the values, **only those sections are overwritten**." Migration used exactly this: premium
races → a preset overriding only the *people* section; premium religions → only the *religion* section.

**[STATED] Why premium races/religions were killed** (149103655) — a clean statement of schema-coupling debt:
races are "no longer as isolated as they once were" now that gender config, gender partners and race partners
exist; other config (factions, layout settings, custom items) deserves the same treatment; auto-insertion into
the form fought with user settings; "It's another form for me to maintain, and keep in sync with the create
settlement form."

---

## 3. Visual / style conventions (from the images)

**Ground & palette (temperate).** Grass `#a8c08a`-ish sage green with fine noise; settlement interior ground
and plazas pale warm grey-cream; roads cream/white **fill** with a light-grey **casing** on each side and a
faint dark outline; buildings a desaturated chocolate brown `#6b5240`-ish. Water mid slate-blue.
Fields: pale straw-yellow (ripe cereal), pink/mauve (ploughed), mid-green (pasture), olive (other crop).
Forest canopy a darker, more saturated green than open grass.

**Palette swaps by climate/weather.** Desert: sand `#e8d5a0`-ish ground, roads become **grey with cream
casing** (inverse of temperate), buildings stay brown, vegetation = palm star-bursts. Polar / snow: everything
to white and pale blue, **roads stay brown** for legibility. Night: global blue-black multiply with tiny
warm window lights. Sunset: global warm orange grade, tree crowns take the light colour.

**Buildings.** Convex-ish quads/pentagons, drawn as a flat fill with **hipped-roof facet shading** — a ridge
plus facets radiating to each corner, each facet a slightly different brightness (straight-skeleton roof,
"Flattened 3D"). Party walls between adjacent buildings in a row are shared straight edges. Landmark/civic
buildings render **pale cream/white** with more complex footprints — crosses, stars (temples), L- and
U-shapes — and are visually the "highlights" of a map. Some buildings sit in **fenced yards**: thin
outline-only rectangles with no fill adjoining a building (confirmed by the creator in comments, §6).

**Roads.** Width encodes hierarchy (main radials noticeably wider than back lanes); ends have **rounded caps**
(visible as lollipop stubs on dead ends, `133016301/08.png`); junctions mitre; a small circular node glyph
appears at some intersections and on plazas (`159738553/21.png`, `164816716/09.png`) — map pins/markers.

**Trees.** Deciduous = scalloped cloud outline, dark green stroke, lighter fill, interior stipple marks,
soft drop shadow offset down-left. Autumn = per-tree random warm hue. Winter = dark radiating bare-branch
star at the same anchor. Coniferous = smaller, rounder, darker crowns. Palm = green star-burst of 6–8 fronds.
Hedgerow trees sit *on* field boundary lines, irregularly spaced with occasional clumping.

**Water.** Depth ramp from pale at shore to deep offshore; a white foam band of near-constant width just
offshore (weaker along rivers); subtle texture; rocky coasts get a scatter of small dark blobs straddling the
waterline; beaches are constant-width tan bands; cliffs are flat grey patches; ponds are flat blue with no
depth ramp.

**Fields.** Parallel stripe hatching at a per-field angle; some edges feathered into the ground, others crisp
thin blue-grey lines; small circular markers at boundary junctions.

**Castles.** Dark grey curtain walls of constant thickness with an inner highlight line; **circular towers**
at vertices and at intervals; pale bailey with thin path polylines; a large solid keep (octagon / rectangle /
square) with the scene's biggest shadow; moat = blue offset band with a green berm between; cliff = grey
offset skirt.

**Typography & chrome.** District labels in a serif face, **arced along a curve across the district**, with a
white halo (style options exist; default scale 0.80 with distance scaling). Legend card top-right: "LEGEND" in
navy serif small-caps, colour swatch + label rows on cream. Clock card bottom-right: large `13:00 Tuesday`
plus red `Next Hour` / `Time Skip` actions and a sun icon. Scale bar: plain black bar labelled `100m`.
Grid overlay: uniform square lattice, light (white) or dark (grey), drawn over all layers.
App UI: parchment/cream `#f6f2e6` panels, navy serif small-caps headings, crimson `#a33` accents and buttons,
red-outlined inputs, blue-grey labels, rounded corners (added Jan 2026).

**Thematic-layer convention.** Activating a thematic layer desaturates the whole base map to white/grey
(trees keep colour) so that a handful of saturated highlights + a legend carry the information.

**Shadows.** One global directional light; shadows are soft, short at midday, long and directional at
sunrise/sunset; disabled entirely under cloudy weather. Trees, buildings, walls and decorations all cast.

---

## 4. Creator's stated design philosophy / constraints

1. **Heuristics over correctness, explicitly.** On building shape filtering: "this feels like a good balance of
   performance and the quality of the result. Now, due to the random nature and the heuristic based approach to
   filtering, it's not impossible [to still get bad buildings]" (133016301). Also "I *think* I've found the root
   cause" (153121107) — he ships probable fixes plus a data repair.
2. **Fix the generator, not the output.** The stated first instinct (filter invalid buildings) was rejected in
   favour of finding *why* bad shapes arise (interior corners) and changing the proposal rule (133016301). The
   2026 rewrite does the same thing again (shrink so that the bad case cannot be proposed).
3. **Storage cost per settlement is a first-class constraint**, because settlements are server-hosted: 1 MB of
   trees "adds up over all the settlements" (144226579); protobuf encoding micro-optimisation for 5 %
   (164816716); a 50 % smaller download endpoint (157283634). Procedural-at-render is chosen over
   procedural-at-save specifically to buy storage.
4. **Render on demand, never idle at 60 fps** — an explicit device-resource decision, accepted even though it
   forecloses animation (153121107).
5. **The simulation constrains the map.** New biomes are gated by "keeping the **supply chain** happy…
   how do people get food in a desert town with no rivers" (comment, 144226579). Lighting is driven by
   simulation state ("only buildings that have an **awake adult**"). Farmsteads create residents; commuting is
   modelled.
6. **Broad strokes *and* fine control.** Almost every generated feature grows a manual counterpart: draw the
   initial water state, draw district areas, regenerate an area, bulk-edit buildings, edit tree areas, custom
   layers. A patron's summary, unchallenged by the creator: "I can use the generation's broad strokes or get
   super specific whenever I want! Other tools are basically one or the other" (157283634 comments).
7. **Validate at the authoring boundary** rather than harden downstream geometry (self-intersection
   prevention, layout validation, intersection snapping).
8. **Config surface is deliberately enormous and must stay coherent** — the premium-races deprecation is
   justified almost entirely by schema-coupling and maintenance cost (149103655).
9. **Honest roadmap slippage.** "As is now almost predictable, I did not work on all of the things I said I
   would in the last update" (144226579) — and the January 2026 post opens by noting that, for once, he did.
10. **Legal caution as a feature gate.** Race/religion presets waited on a read of the WotC fan-content policy,
    the OGL and the Paizo policy, and shipped with a licence update (149103655 → 151265004).
11. **Monthly cadence** with a visible pattern: alternating *generation-geometry* months and
    *simulation/UI* months.

---

## 5. Cross-cutting: recoverable generation pipeline order

Assembled from statements across the slice (each step cited):

1. **Layout stage** — "the **first stage of generation** (layout settings)"; grows the settlement in **rings**
   ("If you set the first stage of generation (layout settings) to be large enough, the castle will be
   generated within the **first ring**", comment on 144226579). Produces the **road graph** (a graph structure,
   §2.14) and therefore the block/lot faces. Layout presets exist (`Medieval europe`).
2. **Water** — coasts/rivers/ponds/islands, from the initial map state (drawable by hand), with a compass
   direction control; coasts and rivers are perpendicular when both are present (§2.24).
3. **Districts** — placement (ordered by distance from centre, §2.22), growth, decorations; special districts:
   castle (king/queen government), university (Aug 2025 plan; Nov 2025 fix "not to fill with all the remaining
   landmark buildings"), parks (planned).
4. **Lots → buildings** — recursive subdivision (§2.1, §2.2), building-type distribution from the Buildings
   section ("limits, initial numbers, proportion of each"), roof colours configurable per district and in
   layout settings.
5. **Suburbs** — after which the **settlement perimeter** is computed, expanded and rounded (§2.8).
6. **Castle** fitted into its district lot, with moat/cliff, connector road and decorated surround (§2.3).
7. **Landscape** — farms (farmsteads or around-perimeter), forests as tree areas, outside decorations with
   connector paths, reserved natural area (§2.5, §2.6, §2.11).
8. **People, government, factions, religion, items/services** generated over the built world; calendar defined;
   simulation then steps hourly (§2.22).
9. **Persist** as a protobuf settlement file server-side; client downloads it and renders (§2.21).

---

## 6. Useful facts from comment threads

- **Fenced yards explained** (144226579, 2025-12-04). Patron: "when you create a map, what are the empty
  spaces for? like it has a box drawn there but you can't click on it". Thomas: "That's an **area surrounded by
  a fence**, you can demolish it in the **edit layout wall menu**, or turn it off in the **district decoration
  settings**." → the outline-only rectangles in the maps are fence decorations, not buildings or fields.
- **Layout grows in rings; castle lands in the first ring if it is big enough** (144226579, 2025-12-03) —
  see §5 step 1. Also: a ringed city around a castle is "possible to configure, but it'll be tricky — it might
  be easier to manually place a castle after generation."
- **Roof colours** are configurable in the **pre-generation layout settings**
  (`docs.fantasytowngenerator.com/createSettlement/settlement_layout#buildings`) and when you **randomise a
  new district**; there is no per-building colour picker post-generation (144226579; 149103655 —
  "They can't change the colours of buildings, but they can put **pins** down to mark locations").
- **No regeneration path for old settlements** (151265004, 2026-03-13): "You can **manually edit** settlements
  to add the new decoration types / layout options, but otherwise there is **no way to automatically
  regenerate** settlements with these features." ⇒ no migration of generated content; only data repairs
  (like the duplicate-intersection fix) are applied retroactively.
- **Adventurers-guild headcount bug** (151265004 → 153121107): the guild *building* created a constant 22 (or
  20) adventurer jobs regardless of the faction's requested size; fixed 2026-03-22 and generalised in May 2026.
- **"Small screen" threshold ≈ 900 px wide** (151265004, 2026-03-14) — below it the map editor is disabled;
  the page must be reloaded after maximising.
- **Underground / Underdark settlements are not supported**; "different map effects / colours is something I'd
  like to add, as well as for **different biomes**" (133016301, 2025-08-11). Requests logged for darker stone
  textures, mushroom farms, giant mushroom forests (137812814).
- **Mountains / cliffs / ravines are not supported** as terrain (137812814, 2026-04-01; 147332188, 2026-01-07:
  "Mountains aren't properly supported yet, that's something I'd like to work on later").
- **Initial water side is drawable now, direction option came later** (137812814, 2026-04-01 → shipped in
  157283634).
- **Imperial units** requested 2025-11-18, shipped 2026-05 (137812814 → 157283634).
- **Regeneration density mismatch** (157283634, 2026-05-04): regenerated areas come out denser than the
  original generation with the same settings; no building-density or road-padding control exists in the
  regeneration tool; buildings lining *invisible* edges was a bug, fixed the same day (unless the "place
  anywhere" option is on).
- **No preview of race/appearance settings** without generating a whole settlement (144226579) — still a gap.
- **Gender partner semantics** clarified (149103655): a weighted per-gender preference assigned at person
  generation, not a birth rate.
- **Feature request intake** is via Patreon DM or the Discord (149103655).

---

## 7. Open questions a re-implementer must decide

1. **Subdivision thresholds.** What is "too large for a building"? What is the minimum acceptable building
   width/edge length, and the "too sharp" angle? How many cut proposals are retried before a plot is accepted
   or discarded, and is a failed plot left empty (→ becoming a fenced yard?) or merged with a neighbour?
2. **The shrink distance** in the 2026 algorithm — absolute, or a fraction of lot depth / the target building
   depth? What happens to the inner core (garden? unbuilt?)? What is the fallback when "the area is too small
   to shrink"?
3. **How the reflex-corner pre-cut chooses which incident edge to be perpendicular to**, and the order in which
   multiple reflex corners are processed.
4. **Whether the cut is exactly perpendicular or jittered** — the maps show slight non-orthogonality, but that
   could come from non-straight roads rather than jitter.
5. **Tree-area fill determinism** — is the seed stored per area, derived from the settlement seed, or is the
   scatter recomputed and simply tolerated as unstable? (My inference says seeded; not stated.)
6. **The Poisson/blue-noise parameters** for forest fill, ambient landscape scatter, copse clustering, and the
   shoreline tree band around ponds.
7. **Castle wall polygon generation** — template library vs radial randomisation; tower spacing rule;
   how "fitting inside the district lot" is solved (scale-to-fit? largest inscribed?); the full decoration
   option list.
8. **The ocean/river threshold** — what fraction of a water body's boundary touching the map border counts as
   "a significant portion"? How are true lakes distinguished, if at all?
9. **Coast/island outline generation** — the actual curve construction (midpoint displacement? noise-warped
   ellipse? spline through jittered radial samples?) and the roughness/arm parameters. Only "one arm vs two"
   and "diversity to the shapes" are stated.
10. **Foam/depth implementation** — SDF vs iterated blur vs per-vertex distance attribute; foam band width and
    depth ramp length in world units.
11. **Field partition algorithm** — how the outside ring is subdivided, how roads seam it, the size
    distribution, and crop-type assignment (random? driven by the economy's food demand?).
12. **How the settlement perimeter offset distance and corner radius are chosen**, and why smoothing is
    expensive enough to erase a round of performance work.
13. **What "Reserve natural area" does** (Feb 2026 basic-form checkbox — never explained in any post in this
    slice).
14. **What "Show estimate" computes** (population? generation time? building counts?).
15. **What "Building roofs: Flattened 3D"'s alternatives are** — is there a true-2D/flat-colour roof mode, and
    is the roof a straight skeleton or something simpler?
16. **The `Layout preset` catalogue** beyond `Medieval europe`, and what a preset actually parameterises.
17. **The interior room-splitting rule** — split-axis choice, minimum room area, how door graph connectivity is
    guaranteed (the shown plan has gaps but no stated reachability rule), and window placement policy.
18. **Where generation runs and how long it takes** — FTG generates server-side, but no generation-time figure
    appears in this slice (only *render* times: ~10 s for a metropolis client-side).
19. **The 50 k-tree performance fix** — stated as "actually fairly simple" but never described (instancing?
    merged geometry? LOD?).
20. **Whether tree areas support explicit holes** or whether the island forest's lakes are clipped by the water
    layer at render time.
21. **Simulation tick semantics** — the clock advances in 1-hour steps with a "Time Skip"; how state is
    persisted between steps, and what "Delegating" person-type means mechanically.
22. **The supply-chain/economy model itself** — named as the gating constraint for new biomes, but never
    described in this slice. (Likely covered in the earlier two-thirds of the FTG posts.)

## Critic-2 addendum (FTG seat, 2026-09-25)

Rulings from `research/findings/_critic-ftg.md` (§1 F14, F17, F18, F20, F21; §2; §3 #18, #21).

1. **§5 "Cross-cutting: recoverable generation pipeline order" is wrong at step 1 and must not be used.** Its step 1
   rests on the 144226579 comment "If you set the **first stage of generation (layout settings)** to be large enough,
   the castle will be generated within the **first ring**" (L141, verified). "First stage" there is the first
   *layout stage* of the `stages[]` table in the layout settings (its lots form the innermost ring), not the first phase
   of generation. The documented order (`createSettlement__algorithm.md` L8, L80, L127, verified; `ftg-docs-params.md`
   §0.2; `_critic.md` C12) is: **phase 1 = buildings and people** (forced buildings → dependency-graph loop → factions,
   friendships, rivalries); **phase 2 = map**: (2.1) water bodies generated or imported, (2.2) road network and districts
   in the configured stages, suburb stage last, (2.3) outer settlement: main roads extended to the border, outside lots
   subdivided, farms / forests / landscape features placed. The creator's own invariant (127128581 L111, verified):
   "generates the details before the layout … I don't see this ever changing". Steps 2–9 of §5 are otherwise sound
   as a list of *what* exists; only their order relative to people is wrong (people are first, not eighth), and
   perimeter expansion (§2.8) happens after the suburb stage within 2.2.
2. **§2.21 confirmed on the captured payload.** The Galeiaward protobuf (captured 2026-09-21, after this post) stores
   positions as zig-zag `sint32`: field 5 decodes to the four corners of a ±250000 cm square and the map is centred on
   (0,0) exactly as stated. `ftg-payload-visual.md` had decoded it unsigned; see its addendum for the corrected
   dimensions (ordinary buildings ≈ 10 × 10 m, 103 m² median).
3. **§7 open questions answered elsewhere in the corpus:** 13 "Reserve natural area" → `createSettlement__overview.md`
   L143 ("some of the available space will not be used for farmland or forests"); 15 roof modes → `Flat / Flat – roof
   shape texture / 3D roofs / Flattened 3D` (`useSettlements__map.md` L122–139); 16 layout presets → Custom, Medieval
   europe, Medieval europe (more twisty), American, Ringed, Ringed (no suburbs) (`ftg-docs-params.md` §1.2); 18
   generation time → ≈ 300 s server-side for a CITY (`ftg-payload-visual.md` §1); 21 Delegating → "people who cannot be
   independent (like babies). They need a caregiver to follow at every hour" (`editSettlement__people.md` L111–113);
   22 supply chain → the 80-node dependency graph and virtual-population loop (`ftg-docs-params.md` §3.3). Still open:
   1–12, 14, 17, 19, 20 (the payload's two forest outlines have no hole rings; the island's lakes must be water drawn
   above forest).
4. **§2.6 farmland modes** are a version ladder with the guide: the January 2026 desert rule ("around the perimeter
   unless there is a river present") shipped as the fourth option `Around rivers` alongside `Default / Farmsteads /
   Around perimeter` (`createSettlement__overview.md` L115–122).
5. **§2.14 / §2.12 corroboration from the wire:** the road graph carries the water outline as its own edge type
   (type 14, 348 edges at the 50 m water-resampling step) and the map border as edges (type 3), and the piers as
   edges (type 12) — the "graph data structure (to support the fill tool)" holds every linear feature, not only
   streets.
