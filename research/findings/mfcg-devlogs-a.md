# MFCG devlogs, older half (slice `mfcg-devlogs-a`)

Source: `research/devlogs/medieval-fantasy-city-generator/<id>-<slug>/post.md` + `images/NN.png`,
worklist entries `[0:23]` of `devlog-medieval-fantasy-city-generator` in `research/worklists.json`.

**Coverage:** 23 directories, 23 `post.md` read in full (body + comment thread), 30 image files opened
with the Read tool (29 unique: `67134-060-custom-colors-scale-bar-elevation/images/01.png` and
`67134-060-custom-colors-scale-bar-elevation./images/01.png` are byte-identical, md5
`f16a31634ff0fa931be7078220cfa067` — the scraper emitted the same devlog twice, once with a trailing
dot in the slug; the two `post.md` differ only in that the dotted copy captured one comment).
14 of the 23 posts have no images at all (the itch.io scrape dropped inline thumbnails for the
2017 posts 1206→7063); their visual claims are therefore text-only.

**Evidence tags:** `[STATED]` creator explicitly describes the method · `[SHOWN]` visible in an image
but not explained · `[INFERRED]` my reconstruction, reasoning given · `[NAMED-ONLY]` feature
announced with no method.

---

## 0. Provenance caveat on dates

Every `post.md` in this slice carries the line `date: 03 February 2025 @ 19:27 UTC`. That is the
**scrape timestamp, not the publication date** — 23 posts spanning three versions of a generator
cannot share a timestamp to the minute. Real dates were recovered from Twitter snowflake IDs embedded
in the post bodies (`timestamp_ms = (id >> 22) + 1288834974657`), which give hard anchors:

| Tweet id in post | Decoded UTC | Post |
|---|---|---|
| 899351022346350593 | 2017-08-20 19:22 | 8154 (0.4.3) |
| 913381840592998400 | 2017-09-28 12:36 | 11802 (0.5.0) |
| 949659413715046401 | 2018-01-06 15:10 | 31287 |
| 950440295044386816 | 2018-01-08 18:53 | 22794 (0.5.2) & 31287 |
| 952880064118640640 | 2018-01-15 12:28 | 22794 (0.5.2) |
| 957636174574743558 | 2018-01-28 15:27 | 22717 (Future plans) |
| 985535121699803139 | 2018-04-15 15:07 | 31287 |
| 986386922057732096 | 2018-04-17 23:32 | 31287 |
| 1062694558000132104 | 2018-11-14 13:11 | 59798 (0.5.5) |
| 1069622997365997568 | 2018-12-03 16:02 | 59798 (0.5.5) |
| 1089850543663693824 | 2019-01-28 11:39 | 67134 (0.6.0) |
| 1091056120377024514 | 2019-01-31 19:30 | 67134 (0.6.0) |

itch.io devlog ids are monotonically increasing, so the worklist order is chronologically correct.
Dates in the table below are `≈` where only bracketed by these anchors.

---

## 1. Chronological table

| ≈ Date | id | Title / version | What changed relative to the previous iteration |
|---|---|---|---|
| ≈ May 2017 | 1206 | The First Post | No changes; devlog opened. Invites questions/suggestions. Comments already ask for a harbour/dock button and PNG/JPG export. |
| ≈ May–Jun 2017 | 1367 | Tiny fixes and preview of hatching | Mouse-wheel zoom **disabled** (crash reports, suspected OpenFL graphics-scaling bug; fullscreen button offered instead). Triangular buildings made **less frequent** "even in chaotic neighbourhoods" — not eliminated. Hatching previewed, shipping "next big update". |
| ≈ Jun 2017 | 1579 | Some answers and comments | No code changes — the single most method-dense post of the early era. States the *reasons* behind walls, castle, triangular buildings, ward semantics, and the plan for temples, water, export, and option checkboxes. 100k page views in one day after Twitter/Reddit virality. |
| ≈ Jun 2017 | 2062 | 0.2.2: Temples, wards overview | **Main temples/cathedrals** added — "big structures similar to castles usually overlooking the plaza". **Wards overview**: hold SHIFT to show all ward labels. Touchscreen tooltips improved. Permalinks attempted and abandoned (itch.io iframe can't reach the address bar). Considering a **building-less "block" mode**. |
| ≈ Jun–Jul 2017 | 3091 | 0.3.0: Wall-less layouts, city outskirts, smooth roads | Plaza, citadel, walls become **optional** (still randomly chosen, no UI). **Outskirts** spawn next to gates for walled cities. New `createBuilding` producing rectangles more often; **cloister plan** for temples sometimes. Outside roads drawn as **splines** not polylines. Gates redrawn as **passages in the wall**. Alley planning improved, esp. military wards. **Polygon offsetting (buffering) rewritten** — fixes streets that "suddenly narrow". Label key SHIFT→SPACE. **Forests removed.** Mirror site fantasycities.watabou.ru with shareable permalinks. |
| ≈ Jul 2017 | 4923 | 0.4.0: Coastal cities | **Coast/sea** (4-step algorithm, §2.14). Merriweather TrueType labels with outlining. Auto-hiding UI. 2 of 3 layouts coastal. Water caused a "serious negative impact on performance" → optimisation pass. |
| ≈ Jul–Aug 2017 | 6271 | 0.4.1: Options | Options menu: citadel/walls/plaza/coast toggles + colour scheme + hatching; persisted to local storage. All layout options become hard on/off (previously weighted-random, e.g. 9-in-10 plaza); offers On/Off/Random submenus if users object. "Very many parameters not exposed yet." |
| ≈ Aug 2017 | 6592 | Source code | TownGeneratorOS published on GitHub. |
| ≈ Aug 2017 | 7063 | 0.4.2: Shanty towns and more options | **Shanty towns** (off by default): "a lot of extramural wards", experimental, "sometimes produces weird results". **Block view** exposed. **Towers** shape option. **Random** master switch restoring pre-options behaviour. Hotkeys C/P/T/W/S/O + Enter (regenerate at same size group). |
| ≈ 20–25 Aug 2017 | 8154 | 0.4.3: Export | **PNG** hi-res export and **SVG** export (all visual options honoured). **"Continuous" layout** option: per-ward density parameter sets blended across ward borders. **Rectangular castles** ("consist of rectangles"), temples rectangular ~50% of the time. Largest-inscribed-rectangle tried on ordinary houses — "doesn't work entirely correctly". Isolines optional (slow). **Adaptive coast LOD** (jaggier near the centre). Wider quays. First 3D fly-through video + walking simulator (used to decide quay width). |
| ≈ Sep 2017 | 9958 | Some progress on 3D view | Image dump only: 8 renders. Shows pitched roofs, wall/citadel massing, top-down massing plan, trees/orchards, fog, coloured skyboxes. |
| ≈ 28 Sep–Oct 2017 | 11802 | 0.5.0: Rivers and basic house shapes | **Rivers** (one per map, constant width, no loops → no moats; bridges, river mouth). **House view** = largest-rectangle → cut into blocks → discard some. **Thin lines** option (strokes ⅓ width). **Simplified water** option (polylines not curves; no fractal coast). Generation "takes much more time" with a river. Six weeks since 0.4.3. |
| ≈ Nov 2017 | 15006 | Toy Town | Standalone 3D visualiser for MFCG released as a prototype. |
| ≈ 21–25 Dec 2017 | 19034 | 0.5.1 and Merry Christmas | **Labels** style option (persistent labels, exported to PNG/SVG). **More roads** option (up to 6 gates on a small town) — a by-product of a **reworked gate-generation algorithm**. **Shared courtyards** replace randomly-removed lots (inaccessible interior voids). Streets/house shapes improved (also castles, temples, farms). **Ward reroll** via cmd+click (type and shape kept, interior re-randomised). All layout parameters stored in the URL (non-itch build). |
| 2018-01-28/29 | 22717 | Future plans for MFCG | Strategy post: proposes a paid desktop app; enumerates the roadmap (multi-channel/looped rivers, islands, flexible castle placement, **multiple nested or independent wall sets**, better streets/alleys, extramural farms, editing, topography/topology editors, custom ward lists, POI generation, toponym generator, palettes/textures, decorations, Unity/UE4 3D). Online generator stays free. |
| 2018-01-29/30 | 22794 | 0.5.2: Warp tool | **Warp tool** — soft-brush displacement of the **underlying mesh** whose cells are districts and whose edges carry roads and rivers. **Winding alleys** (partially landed). Building count readout on SPACE. Faster generation from refactoring. |
| ≈ 18 Apr–May 2018 | 31287 | Experimenting | Research post: a **road-centric** generator loosely based on Parish & Müller *Procedural Modeling of Cities* "with all the unnecessary L-systems stuff scrapped", contrasted with MFCG's **block-centric** approach. Curvilinear streets, terrain-adaptive roads. Explicitly **not** adopted (implementation difficulty, performance, hard to merge). |
| ≈ May 2018 | 34104 | 0.5.3: Neighbourhoods, alleys and buildings | **Neighbourhoods** = clusters of adjacent same-type wards sharing one label; **Watercolours** palette option colour-codes them. Alleys/buildings materially better — "much fewer ugly triangular lots", buildings inscribed tighter. Buildings submenu Off/**Simple**/**Complex**. Every neighbourhood gets a **local temple** (large building + small plaza, unmarked). Buildings no longer touch city/castle walls. Large temples now mostly symmetrical. |
| ≈ Aug–Sep 2018 | 46967 | 0.5.4: FMG integration | Two-way integration with Azgaar's Fantasy Map Generator: FMG settlement → MFCG plan using **size and location**; MFCG → FMG "Overworld". Label placement improved; neighbourhood colouring improved for large maps; three label font sizes; coast/river drawn differently in hatching mode. |
| ≈ Dec 2018 | 59798 | 0.5.5: Farm fields, rotation tool and city names | **Farm fields** outside the walls (random count, disableable). **Rotation tool** (shift+drag in Warp mode). **City name generator** (English-sounding × heroic-fantasy blend, e.g. "Boridge Port", "Elmsword"; shift+click title to reroll). **Map legend** (numbered, corner selectable with arrow keys). **Smooth coast** curve replaces the fractal coastline. **Blocks** buildings mode. Archivo Narrow replaces Merriweather. Isolines changed. No-stroke buildings option. **Street width variation** across the three street classes. "Continuous" layout option **removed**. |
| ≈ Feb 2019 | 67134 (×2) | 0.6.0: Custom colors, scale bar, elevation | **Major refactoring** (faster, more robust; enables later features). **Elevation**: a "gradient field" perturbs alleys, strongest near castle/coast/river banks. **Custom 4-colour palettes** via drag-and-dropped SVG files. Editable city name. **Scale bar** (m/yd toggle, fixed bottom-left). Coast and river smoother; river **more likely to run through the city**; central square **more rectangular**; shantytowns **spread along coast, river and roads**; buildings more uniform in size. Announces intent to scrap the ward-type system. |
| ≈ mid/late 2019 | 85275 | 0.7.0: Districts | **Migration to a doubly-connected edge list (DCEL)** — the headline change, explicitly the reason for the minor-version bump. **Districts** replace neighbourhoods: grown organically from seeds around prominent city features, borders shaped by the landscape, diverse in size, with **random proper names**. New **curved district labels**. Legend exported to SVG; all text exported with the in-app fonts. Considers dropping SVG niceties (dual draw paths are "a real pain"). "tight" buildings option; improved elevation. Patreon launched. |

---

## 2. Techniques

### 2.1 Block-centric ("polygon-first") generation — the defining paradigm

**Problem.** Produce a plausible medieval street/block structure cheaply and robustly.

**[STATED]** (31287): "In contrast with MFCG's *block-centric* approach the traditional one is
*road-centric*, i.e. a settlement is defined by its roads which are grown kind of organically like
veins." MFCG inverts this: the **areas** are primary and the roads are the negative space between
them. **[STATED]** (22794): "Every map produced by the generator has an underlying mesh — districts
are the cells of this mesh, roads and rivers run along its edges."

**Algorithm as recoverable.** A planar subdivision of the city footprint into cells (wards/districts)
is built first; streets are then the *gaps* obtained by shrinking each cell (§2.2); each cell is
recursively subdivided into lots; lots become buildings (§2.4). Roads and rivers are assigned to
**edges** of the same mesh, which is why a river "runs between patches" rather than cutting through
them (§2.15).

**[SHOWN]** (22794/01) confirms the mesh is a real, first-class object: in Warp mode the map greys out
and a red planar graph is overlaid — round red nodes joined by red edges, with roughly degree-3
junctions in the interior and long edges running off to the map border. The citadel wall is drawn
highlighted as part of that same graph. Pale pink edges continue outside the two green brush circles,
so the mesh covers the **whole map**, not only the built-up area.

**[INFERRED]** The degree-3 junctions and the convex-ish cell shapes of the early maps are the
signature of a **Voronoi diagram / its dual Delaunay triangulation**. The 2017 open-source ancestor
(TownGeneratorOS, published in devlog 6592) is the place to confirm the exact construction; a commenter
(Glidias, 22717) refers to "the voronoi structure/neighbours" as if it were common knowledge, and
watabou does not correct him. Reproduction confidence for "Voronoi-like planar subdivision" is high;
for the *specific* seeding and relaxation, low.

**What changed.** 0.6.0 (67134) "major refactoring"; 0.7.0 (85275) migrated the whole project to a
**doubly-connected edge list** — a half-edge structure giving O(1) face/edge/vertex adjacency traversal.
That is exactly the data structure a block-centric generator needs once districts must be *grown* by
flood-filling across face adjacencies (§2.17) and once walls, rivers and roads must all be expressed as
edge chains in one topology.

**Unknown.** The seed distribution for the cells (Poisson-disc? jittered grid? radial?); how many
Lloyd relaxation steps, if any; whether the city footprint is a clipped region of an infinite mesh or a
mesh built to fit; whether the "size group" (the Enter hotkey in 7063 regenerates "a new city of the
same size group") maps to a cell count, a radius, or a population figure.

---

### 2.2 Polygon offsetting / buffering (street carving)

**Problem.** Turn cell boundaries into streets of controlled width, and inset a ward polygon before
subdividing it so buildings stand back from the street.

**[STATED]** (3091): "Improved polygon offsetting (buffering) algorithm… it took a lot of time to
implement and not without a reason. In practice it should fix that type of glitches when a street
suddenly narrows and similar ones."

**Algorithm.** Inward offsetting of a simple polygon by a distance *d*: each edge is translated inward
by *d* along its normal and neighbouring edges are re-intersected. The named failure — "a street
suddenly narrows" — is the classic naive-offset failure at **reflex vertices and self-intersections**,
where the offset boundary folds over itself and the surviving polygon bulges toward the street. A
correct implementation requires either a **straight-skeleton**-based offset or Clipper-style boolean
offsetting with self-intersection removal. **[INFERRED]** watabou's complaint that it "took a lot of
time" and the residual glitches are consistent with hand-rolling one of these rather than using a
library.

**[SHOWN]** (8154/01, the SVG opened in Illustrator at 1200%) is the strongest evidence for how streets
are represented in the output: streets are **filled ribbon polygons** (cream), not stroked polylines —
anchor points are visible along both sides of each ribbon, and ribbon edges are parallel with mitred
corners at junctions. Blocks are separate filled polygons (tan) with a dark stroke. So the renderer
draws *street area*, which is what an offsetting pipeline naturally yields.

**Parameters.** Three street classes with distinct widths — main streets, regular streets, alleys
(59798) — fixed until 0.5.5, then given "some variation".

**Unknown.** Whether the offset distance is per-edge (street class) or per-polygon; how junctions are
resolved (union of ribbons vs. face-based); whether the same routine performs the building setback.

---

### 2.3 Lot subdivision and the triangular-building problem

**Problem.** Subdivide a ward polygon into building lots without degenerate slivers. This is the single
most-discussed defect of the first year.

**[STATED]** (1367): "The generator should create triangular buildings less often now, even in
'chaotic' neighbourhoods. I can't eliminate them completely." **[STATED]** (1579): "Too many triangular
buildings. I agree, it's unfortunate and unintentional. This is a result of a rather silly algorithm
for creating alleys and buildings." A fix was planned via a linked Reddit comment
(`/r/rpg/comments/6d02cf/online_medieval_city_generator/di01mpw/` — **not captured locally**; this is
the highest-value missing primary source in the slice).

**[INFERRED]** The "rather silly algorithm" is recursive **bisection of a convex polygon by a random
cutting line**. If the cut line's endpoints are sampled on the perimeter without constraining the cut
to be roughly perpendicular to the polygon's long axis, a cut that clips a corner produces a triangle,
and the triangle then subdivides into more triangles. The standard fix — and what "buildings inscribed
into these lots much tighter" (34104) implies — is to bisect **perpendicular to the longest edge or to
the major axis of the oriented bounding box (OBB)**, so cuts run across the polygon rather than across
a corner. Reasoning: this is the only family of fixes that reduces triangles *without eliminating them*
(watabou: "I can't eliminate them completely"), because a ward polygon that is itself triangular still
yields triangular children.

**Interim mitigations.** (a) 2062: an alternative mode that **hides individual buildings** ("Block
view") offered explicitly "for those of you who are annoyed by triangular houses"; (b) 0.4.3/0.5.0:
replace the lot polygon with the **largest inscribed rectangle** (§2.4) so the *drawn* building is
rectangular even when the lot is not — which is precisely what commenter `agnate` (1367) proposed:
"make the building lots triangular, but the buildings themselves would be square… if you draw the
triangle shape as the fence, you could draw rectangles inside".

**Resolution.** 0.5.3 (34104) is the first release where watabou claims real success: "there are much
fewer ugly triangular lots and buildings are inscribed into these lots much tighter… All in all I'm
pretty content with the current state of this part of the generator." Every release from 0.3.0 to
0.5.3 claims an alleys/buildings improvement; watabou jokes it is "an obligatory item of every change
log" (22794).

**Unknown.** The actual cut rule, the stopping criterion (target lot area? min dimension?), the
per-ward "chaos" parameter that made chaotic neighbourhoods worse, and whether lots are cut before or
after the street offset.

---

### 2.4 Largest-inscribed-rectangle building fitting (`createBuilding`)

**Problem.** Make drawn structures read as *buildings* (orthogonal, with wings and courtyards) rather
than as arbitrary polygons.

**[STATED]** (3091): "New `createBuilding` function tends to produce rectangular structures more often
than the previous one." (8154): "castles are now strictly rectangular. It doesn't mean that they are
always rectangles… but they do consist of rectangles. I tried the same thing with temples, but it
didn't work quite as well (for different reasons), so I force them to be rectangular only half the
time." (11802): "It works the same way as castles get built: **I take an original polygon, then try to
find the largest rectangle which fits inside the polygon. After that if the rectangle is large enough
I cut it into smaller blocks and throw away some of them.** That's it."

**Algorithm (as given).**
1. Input: lot polygon *P*.
2. Find the maximum-area rectangle inscribed in *P* (orientation free or from *P*'s OBB).
3. If `area(R) < threshold`, reject (leave the lot empty / fall back to the raw polygon).
4. Else partition *R* into a small grid of sub-blocks.
5. Delete a random subset of sub-blocks.
6. The remaining union is the building footprint.

Step 5 is what generates the L-, U-, T- and cross-shaped footprints, and courtyards when an interior
sub-block is deleted. **[SHOWN]** (11802/02, 11802/03) confirms it directly: the khaki and mauve
close-ups are full of rectangles with rectangular notches bitten out of one corner or one side, plus
occasional ring-shaped buildings with an internal void. **[SHOWN]** (11802/01) the castle inside the
citadel is a **plus/cross-shaped** footprint; (19034/01) an **H-shaped** castle; (34104/02) a
**V/chevron-shaped** one; (85275/01) a stepped cross. All are grid-of-rectangles-minus-subset.

**Known failure mode. [STATED]** (8154): "The function, which finds the largest rectangle inside a
polygon, doesn't work entirely correctly and it's more obvious with houses than with the castle." The
resulting maps are "quite noisy so by default this option is switched off" (11802).

**Parameters mentioned.** A minimum rectangle area ("if the rectangle is large enough"); the
50% probability of forcing temples rectangular (8154); later a buildings-mode enum Off / Simple
("rectangular buildings where possible") / Complex (34104), plus Blocks (59798) and "tight" (85275).

**What changed.** 0.3.0 first `createBuilding`; 0.4.3 strictly-rectangular castles, temples 50%,
experiment on houses; 0.5.0 houses shipped behind "House view"; 0.5.1 improved (also for castles,
temples, farms); 0.5.3 much tighter inscription + mode enum; 0.6.0 "buildings are more uniform in
size"; 0.7.0 "tight" option.

**Unknown.** Exact max-inscribed-rectangle algorithm (rotating calipers on the convex hull? grid
search over orientations? the literature's O(n log n) result?); the sub-block grid dimensions; the
deletion probability; how "Simple" differs from "Complex" in the partitioning.

---

### 2.5 Shared courtyards

**Problem.** Lower building density without leaving visually arbitrary holes.

**[STATED]** (19034): "Until now I removed a small number of lots to make a map less dense, they were
supposed to represent undeveloped patches of land, tiny squares etc. Now these random empty spaces are
replaced with **'shared courtyards', areas which are not accessible from streets**. This kind of layout
is more realistic in my opinion."

**[INFERRED]** The change is a *placement constraint*, not a new primitive: instead of deleting a random
lot (which can be street-adjacent and reads as a gap-toothed terrace), delete lots only from the
**interior** of a block — i.e. lots with no edge on the block's outer boundary. Reasoning: "not
accessible from streets" is exactly the definition of an interior lot after the street offset.

**[SHOWN]** (19034/01) the hatched blocks contain crisp white rectangular voids fully enclosed by
hatched lots, never touching a street ribbon; the same voids appear as cream holes in 34104/01,
46967/02 and 59798/01. This is one of MFCG's most recognisable visual signatures.

---

### 2.6 Street hierarchy and widths

**[STATED]** (59798): "There are 3 types of streets in MFCG: **main streets, regular streets and
alleys**. Until now they all had fixed widths, now I've added some variation to them."

**[SHOWN]** Main streets are the widest ribbons and run from the plaza to the gates (11802/01,
59798/01); regular streets bound wards; alleys are the thin lines subdividing a ward into lots.
**[SHOWN]** (19034/01, 67134/01) roads *outside* the settlement are drawn as a thin double line (a
hairline casing with the background showing through), visually distinct from in-town street ribbons.

**[STATED]** (3091): roads outside the city are drawn as **splines**, not polylines — "I think this way
they look more natural, although sometimes you can notice a glitch when they are cut off horizontally
by a pixel or so." (A clipping/rasterisation artefact at the map border.)

**[NAMED-ONLY/partial]** "Winding alleys" (22794): "you won't see many of them, because this feature is
not quite ready yet… (not like [the linked tweet], but close)". Never explained. The linked tweet
(2018-01-08) is the road-centric experiment's "buildings along the streets", so the intent was to
import curvature from §2.19 into the block-centric alley planner.

**Unknown.** How the main-street network is chosen (shortest paths plaza→gates on the mesh? highest-
betweenness edges?); the actual widths; the variation distribution.

---

### 2.7 City walls, towers and gates

**[STATED]** (1579, design rationale): "Why there is always a wall? … I'm pretty sure that most
settlements large enough to be called cities did have walls. **What is more important is that walls
make a pile of polygons look like a fantasy city map** :)". Walls became optional in 0.3.0 once
wall-less layouts looked plausible.

**[STATED]** (3091): "New drawing style for gates. Now they are drawn as **passages in the wall**
instead of 'bricks' across a road. It should make them more visible."
**[STATED]** (7063): a **Towers** option "allows to choose the shape of the wall towers".
**[STATED]** (19034): "More roads… a small town may have up to 6 city gates, more for medium and large
ones. This feature is a byproduct of **reworking my gates generation algorithm**, which works better
now."
**[STATED]** (34104): "Buildings no longer touch city and castle walls." (A setback/buffer band inside
the wall.)
**[NAMED-ONLY]** (22717 roadmap): "Support for multiple sets of city walls, both nested and
independent." Not present in this slice's releases.

**[SHOWN]** — wall rendering conventions, consistent across every map image:
- The wall is a **closed polyline of long straight segments** (8–14 per city), drawn as a thick dark
  stroke, following the outer boundary of the outermost ring of wards.
- **Towers sit at the vertices**, drawn either as filled squares rotated to bisect the corner
  (8154/02, 11802/01, 19034/01) or as filled circles (34104/01, 46967/02, 59798/01, 67134/01) — the
  two settings of the Towers option.
- **Gates are gaps** in the thick stroke where a main street crosses it (11802/01, 59798/01), often
  with a small square tower flanking each side (34104/02).
- 3D (9958/01, 9958/02, 9958/04): the wall is an extruded prism with rectangular tower blocks and a
  crenellated top in the fantasy palette; in the top-down render (9958/04) the wall reads as a thick
  grey band with darker square towers at every vertex.

**Unknown.** How the wall polygon is derived (convex hull of the built area? offset of the union of
outer ward polygons? a separately generated closed curve the wards are clipped against?); how gate
positions are chosen (the 0.5.1 rework is unexplained); what determines the number of gates per size
class beyond "more for medium and large".

---

### 2.8 Citadel / castle

**[STATED]** (1579): "Why there is always a castle? … a castle **adds some asymmetry and makes a map
look better**. It's not hard to remove it, so I'm gonna make it optional." Placement discussion is
deferred to a Reddit comment (`/r/proceduralgeneration/comments/668sqb/…/dgk6h0i/` — **not captured
locally**).
**[STATED]** (3091): citadel becomes optional; "Improved layouts for castles".
**[STATED]** (8154): castles "strictly rectangular… they do consist of rectangles" (§2.4).
**[NAMED-ONLY]** (22717 roadmap): "More flexibility in castle placement: within city walls, outside
city walls, multiple castles per map."

**[SHOWN]** The citadel is a **small independent walled enclosure** with its own tower-studded wall,
containing one large multi-wing building and usually some open ground. It appears in three
configurations: fused to the outside of the main wall (11802/01 top-left; 59798/01 bottom-right, where
the main wall visibly detours around it), standing alone in a wall-less town (19034/01, 67134/01,
85275/01), and as a bulge of the main wall enclosing a keep (34104/02). In 9958/04 the citadel has an
internal courtyard subdivided into its own small blocks.

**Unknown.** The placement criterion (edge of the built area? highest "elevation"? adjacent to the
plaza? — 1579's link would say); whether the citadel displaces wards or is seeded before them.

---

### 2.9 Central plaza and market placement

**[STATED]** (3091 comment thread, in reply to `llynglas` who complained that multiple plazas end up
adjacent and that plazas should be rectangular): "It doesn't happen too often because **that's exactly
the criteria for a market placement: to be not adjacent to the central plaza**. When there are no
better place for it though, it does get accepted. **I can change it to discard such layouts but it will
increase generation time…**" — and on rectangularity: "I agree with you, but with the current algorithm
there is not much I can do about it."

This is a rare explicit statement of MFCG's **constraint-relaxation policy**: constraints are scored
preferences that degrade to acceptance rather than hard rejections, because rejection sampling costs
generation time. It also pins the root cause of non-rectangular plazas on the mesh: a plaza *is* a mesh
cell, so it can only be as rectangular as the cell.

**[STATED]** (67134, 0.6.0): "the central square is usually **more rectangular**" — three versions
later the mesh refactor finally allowed it.
**[STATED]** (2062): cathedrals are "big structures… usually **overlooking the plaza**".
**[STATED]** (34104): every neighbourhood gets a **local temple** — "a large building with a small
plaza in front of it", unmarked.

**[SHOWN]** The central plaza is an empty background-coloured polygon at the convergence of the main
streets, carrying a small filled **circle marker** at its centre (11802/01, 11802/02, 11802/03,
34104/01 where the circle sits beside the "Market" label). In 34104/02 a long narrow ring-shaped
building (a market hall) stands in the plaza. In 59798/01 two separate wards carry legend badge "1
Market", confirming market wards are a *type*, distinct from the geometric central plaza.

---

### 2.10 Wards: types, semantics and parameters

**[STATED]** (1579, the fullest statement of intent): "I need to clarify here what my wards are or
rather what their labels mean. For example **'Gate' doesn't mean that the whole ward is just er… gate.
It's a ward with gate-related venues — some taverns, cheap shops etc. People also may live there. The
same is true for other ward types as well: a craftsmen ward doesn't consist entirely of workshops,
there are also pubs, churches etc.**" And on the craftsmen dominance: "Medieval cities were all about
crafts and trade… They usually worked and lived at the same place, having a living space at the back of
the workshop or above it." Repeated to `Colt Hack` in 46967: "the name of this one is supposed to be
treated as a **hint, not as a literal explanation** what is there."

**Ward type list [SHOWN]** — from the 0.5.5 legend box (59798/01), which is definitive and ordered:
1 Market, 2 Merchant, 3 Craftsmen, 4 Temple, 5 Administration, 6 Docks, 7 Slum, 8 Patriciate, 9 Gate,
10 Castle. 46967/02 additionally shows **Military**; 34104/01 shows the same set. Craftsmen wards
dominate by count in every image.

**Per-ward layout parameters. [STATED]** (8154): "The generator used to use **separate independent sets
of density parameters (minimum building size, size variance etc) for each ward**." (34104 comment, the
clearest statement): "Every district has a set of parameters affecting its layout — **how regular is
the grid of its alleys, how big are the buildings** etc. This way different parts of a city has visibly
different layouts."

**Failure mode and fix.** "It… created unrealistic situations like when there were completely different
alleys patterns on opposite sides of the same street" (8154) / "on one side of a street buildings are
tiny and on the opposite side buildings are huge" (34104 comment). Fix = the **"Continuous"** option:
"the generator tries to **change these parameters across districts gradually to avoid abrupt shifts**."
**[INFERRED]** this is a diffusion/smoothing pass over the ward adjacency graph (repeatedly replacing
each ward's parameter vector with a blend of its own and its neighbours'), or equivalently sampling the
parameters from a smooth 2D field rather than i.i.d. per ward. Reasoning: "gradually across districts"
with neighbours agreeing at shared streets is precisely graph smoothing; a noise field would give the
same result and is cheaper.

**Lifecycle.** Off by default in 0.4.3, exposed in the Layout menu, **removed in 0.5.5** — "I think
nobody cared about it anyway". Ward types themselves were slated for removal in 0.6.0 ("I'm really
looking forward to scrap the current 'wards' system and finally get rid of all these Craftsmen, Gate,
Administration") and were replaced by named Districts in 0.7.0.

**[STATED]** (3091): "Slightly improved alleys planning, especially for **military wards**. To be
honest I don't remember what it means…" — ward type demonstrably drives the alley planner.

**Unknown.** The numeric ranges of the parameter set; how types are assigned to cells (distance to
centre? to gates? to water? adjacency rules?); why gate wards "often show up in the centre of town"
(46967 comment) — a placement bug watabou never explains.

---

### 2.11 Ward rerolling (determinism contract)

**[STATED]** (19034): "You can regenerate a ward by command+clicking it. The ward will **keep its type
and shape**, but **its inner structure will change randomly**."

**[INFERRED]** This is a strong architectural constraint, not a UI nicety: the interior of a ward must
be a **pure function of (polygon, type, parameter set, seed)** with no dependence on global generation
order or on neighbouring wards' interiors. Anything that couples interiors (e.g. alley alignment across
a shared street) would break under a local reroll. Notably the "Continuous" parameter smoothing (§2.10)
operates on the *parameters*, which are fixed at ward level and survive the reroll — consistent.

---

### 2.12 Outskirts, extramural wards and shanty towns

**[STATED]** (3091): "City outskirts get spawned for walled cities. **Right now only regions next to
the gates get populated**, in the future I'm going to enable generating as many extramural wards as
needed."
**[STATED]** (7063): "Shanty towns… check 'Shanty towns' (unchecked by default) and get a lot of
extramural wards. Probably not all of them should be shanty towns, maybe I'll interleave them with more
respectable craftsmen wards in future versions. It's kind of experimental and **sometimes it produces
weird results**."
**[STATED]** (67134): "shantytowns **tend to spread along the coast, river and roads**."
**[NAMED-ONLY]** (22717 roadmap): "More love for extramural farms."

**[SHOWN]** The extramural pattern is unmistakable and is one of MFCG's best readability tricks: outside
the wall, development forms **ribbons hugging the radial roads**, thinning with distance, plus isolated
single buildings scattered further out (19034/01, 34104/02, 59798/01, 67134/01). 9958/06 (3D, top-down)
shows it as a clear **star/asterisk silhouette** around an oval walled core. 34104/02 shows dense
extramural mass on the west/south-west and almost none on the east, i.e. the spread is anisotropic.

**[INFERRED]** "Spread along the coast, river and roads" plus the ribbon shape implies extramural ward
seeds are sampled with a probability that decays with distance to the nearest road/water edge and with
distance from the gate — a distance-field-weighted sampling rather than uniform scatter.

---

### 2.13 Farm fields

**[STATED]** (59798): "To fill the emptiness of the space outside city walls, a **random number of farm
fields** is now spawned. You can disable them in the Layout submenu. **If you think they are drawn
incorrectly, then you are not alone** :P" (An acknowledged, unfixed visual defect.) Two external
write-ups are linked — `r/FantasyCities/comments/a1wx6h/farm_fields/` and a 2018-12-03 tweet — **neither
captured locally**.

**[SHOWN]** (59798/01, 67134/01, 85275/01, 85275/02): fields are irregular convex quadrilaterals /
pentagons that tile the outskirts in a patchwork with narrow gaps between them, each filled with
**parallel hatch lines at a per-field angle** (the furrow direction), stroked in a tint of the building
colour, with no outline in 67134/01. Field size is broadly uniform within a map and much larger than a
building. They cluster beyond the outermost buildings and avoid the roads. In 3D (9958/08) the
equivalent is an **orchard: trees planted on a regular lattice in rows**.

**[INFERRED]** The patchwork is very likely the same mesh machinery reused — cells of the outer mesh,
inset by an offset (hence the visible gaps = field boundaries/hedges), each assigned a random hatch
angle. Reasoning: the cell shapes match the interior ward cells in character (convex, 4–6 sides,
similar size distribution), and reusing §2.1/§2.2 is far cheaper than a second subdivision system.

---

### 2.14 Coast / sea

**Problem.** Put a settlement on water without breaking the block-centric pipeline.

**[STATED]** (4923) — the clearest step-by-step algorithm in the whole slice:
> 1. "**Before building a city** MFCG **marks some part of the terrain as water**. Right now the
>    coastline it creates is far from perfect — sometimes not suitable for a real coastal settlement and
>    almost always **lacking interesting features such as bays and peninsulas**."
> 2. "Then it **builds the city normally, making sure no wards spawn in water**. In most cases it gives
>    the city a **'bitten apple' shape**. In theory it should be able to build cities on islands, but I
>    haven't tried that yet."
> 3. "**The section of the city wall which borders the water is removed** to provide the city access to
>    the shore. It's the most obvious and easy to implement layout for a port city, but not the only one
>    possible."
> 4. "**A number of seafront blocks are assigned to be 'docks'**, **piers are drawn next to them in the
>    water**. These blocks don't have to be exactly docks, just some water related wards e.g. fishermen
>    wards."

"Conceptually it is very simple. In practice it took much more time and much more refactoring than I
anticipated. Also **surprisingly adding a waterbody had a serious negative impact on performance** so I
needed to invest into optimization."

**Parameters.** "2 out of 3 layouts are coastal" before the options menu existed (4923); coast became a
checkbox in 0.4.1 and hotkey `O` in 0.4.2.

**Rendering evolution.**
- 0.4.3 (8154): "**Coast LOD is now adaptive**. It means that the coastline is much more jagged closer
  to the city center. Greatly improves drawing performance." → a **fractal/midpoint-displacement
  refinement whose recursion depth falls off with distance from the city centre**.
- 0.5.0 (11802): "Simplified water" option — "The coast doesn't get turned into a jagged fractal thing."
- 0.5.5 (59798): "If Simplified water is disabled the coastline is now drawn as a **smooth curve, not as
  an ugly fractal-ish thing**. I should have done it long time ago…" → fractal detail **abandoned** in
  favour of spline smoothing.
- 0.6.0 (67134): "The coast is made smoother."
- 0.4.3: "**Wider quays**. To give them more space for loading and unloading" — a decision made by
  walking the 3D model (§2.20).

**[SHOWN]** Sea is a solid flat fill (sage green in the default palette, dark brown/navy/grey in
others) bounded by a smooth curve; **piers are thin straight lines/rectangles** standing perpendicular
to the quay and projecting into the water in groups of 3–6 (8154/02, 11802/01, 46967/02, 59798/01).
In 9958/04 (3D top-down) the piers are long thin prisms. The "bitten apple" shape is visible in
11802/01 and 46967/02, where the ward mass stops dead along the shoreline.

**Unknown.** How the water region is chosen (a half-plane perturbed by noise? a large disc? a noise
threshold?) — "marks some part of the terrain as water" is all we have, and the admission that bays and
peninsulas are missing tells us it is *not* a general terrain/noise field in 0.4.0. Also unknown: how
many seafront blocks become docks, and the pier count/spacing rule.

---

### 2.15 Rivers

**Problem.** A linear water feature that cuts *through* the settlement rather than removing a region of
it.

**[STATED]** (4923, the design intent, stated before implementation): "Unlike sea they **won't take
whole patches of terrain, but will run between them similarly to roads**. This approach should allow me
to create narrow channels, I just hope it will be 'compatible' with existing coast feature."
**[STATED]** (11802, on shipping): "The problem with rivers is that they **affect everything they
'touch'**, so I needed to take care of **moving buildings away from them**, decide **where and how
bridges are placed**, create a decently looking **river mouth where it joins the ocean** etc. So the
whole task is not really hard, but as I said it is complex i.e. consisting of numerous nuances."

**Stated limitations (0.5.0).** "there can be **just one river per map**, it has a **constant, not very
large width**, it **can't be looped (so I can't make a moat of it)**." "Please keep in mind that with
the river generation takes **much more time**."
**[NAMED-ONLY]** (22717 roadmap): "Better rivers with support of **multiple channels per map,
tributaries and looped channels (e.g. moats)**."
**[STATED]** (67134, 0.6.0): "the river is made smoother and it's **more likely to run through the
city**" — so river/city coincidence was a tuned probability, and early rivers often missed the town.

**[INFERRED]** "Runs between patches, similarly to roads" + §2.1's "roads and rivers run along its
edges" means the river is a **path in the mesh's edge graph**, chosen from a source on one map border
to the sea or another border, presumably by a weighted shortest-path/greedy descent, then **smoothed to
a spline** and given a width by offsetting the path. "Moving buildings away from them" is then the same
offset/setback machinery as the street carving (§2.2). Reasoning: this is the only construction that
simultaneously explains (a) constant width, (b) inability to loop — a simple path in a graph has no
cycle, (c) why bridges land where streets cross, and (d) why adding a river costs so much time (every
ward on the path must be re-offset).

**[SHOWN]** (11802/01) the river is a constant-width band with a lighter casing line on each side,
entering at the top border, curving through the town and joining the sea at the bottom-left; the mouth
simply merges into the sea fill with no delta. **Bridges** are rendered as **interruptions in the river
band where a street ribbon passes over it** (11802/03 clearly; 67134/01). In 67134/01 the river is
noticeably wider and carries a separate **hairline tributary/creek** joining from the north-east — so by
0.6.0 there is at least a secondary thin channel. In 85275/01 the river is wide, smooth, and the town
straddles it with development on both banks.

---

### 2.16 Neighbourhoods (0.5.3) → Districts (0.7.0)

**Neighbourhoods. [STATED]** (34104): "Neighbourhoods are **groups of adjacent wards of the same
type**. The idea is to **reduce amount of labels on a map**: if there is a cluster of 3 'craftsmen'
wards, for example, labelling each of them is overkill. Instead, a single label can be placed somewhere
close to the centre of the cluster." → a **connected-component / union-find pass over the ward
adjacency graph keyed on ward type**. Colour coding via the **Watercolours** palette option.

**Districts. [STATED]** (85275): "Districts are shaped differently. Neighborhoods were just clusters of
wards of the same type… Because of that their shape and placement often seemed quite arbitrary.
**Districts are 'grown' more organically — they are seeded around prominent city features and their
borders are shaped by the landscape.** Also they **tend to be much more diverse in size** and I think
it's more realistic."

**[INFERRED]** "Seeded around prominent city features" + "grown" + "borders shaped by the landscape" =
a **multi-source region-growing / flood fill (or weighted Voronoi / Dijkstra partition) over the ward
adjacency graph**, seeded at the castle, cathedral, plaza, gates, docks and bridges, where edge costs
are raised by landscape barriers (river, coast, wall) so that borders snap to them. Reasoning: this is
the standard way to get size-diverse, feature-anchored, barrier-respecting regions from an adjacency
graph, and it explains why the migration to a DCEL (which makes face-adjacency traversal trivial) was
the *prerequisite* headline change of the same release.

**[SHOWN]** (85275/01) district borders visibly follow the river and the castle wall; district sizes
range from a few blocks ("LOSTFORD") to a third of the city ("OLD TOWN"). (85275/02, a two-panel
before/after) the same city with old vs. new labels; districts are colour-coded in strongly distinct
hues (magenta, red, olive, tan) in the Watercolours palette.

**District names. [STATED]** (85275, deadpan): "Districts get proper names based on super-complicated
historical and cultural simulation of the city life. **Districts get random proper names.** The
algorithm which generates district names is pretty simple, much simpler than the one which constructs
city names. Quite often it produces silly names, but I think it's OK."

**[SHOWN]** name grammar from 85275/01 and /02: `OLD TOWN`, `SOUTH TOWN`, `EAST TOWN`, `MILITARY TOWN`,
`CASTLE DISTRICT`, `OLD QUARTER`, `STONE TOWER`, `COBBLERS CROSSING`, `BRIGHTFORD`, `LOSTFORD`,
`HEATHER ROW`, `NOONCREST`, `NEWPOINT`, `CATDOCKS`, `WEAVER'S DOCKS`, `HAY CHAPEL`. The pattern is
`<modifier> <feature-noun>` (Town / Quarter / District / Row / Crossing / Docks / Chapel / Tower) plus
closed compounds on `-ford`, `-crest`, `-point`. Several are clearly feature-aware (`CASTLE DISTRICT`
on the citadel, `WEAVER'S DOCKS` and `CATDOCKS` on the waterfront, `COBBLERS CROSSING` at a bridge), so
the "random" generator is at least conditioned on the seeding feature.

---

### 2.17 Elevation as a gradient field

**[STATED]** (67134): "The maps are still 2D, but if the 'Layout > Elevation' option is checked,
**alleys get affected by a 'gradient field', which emulates a presence of height difference**. The
gradient is **stronger around the castle, close to the coast and on the river banks** — this is where
the effect is more visible. Some people on Twitter say that they don't see the difference though…"
**[STATED]** (85275): "improved 'elevation'."

**[INFERRED]** A scalar height field *h(x,y)* is synthesised from distance to features (a bump at the
castle, a drop toward coast and river), and its **gradient ∇h** biases the alley planner — plausibly by
rotating alley directions toward the contour lines (terracing), as real hill towns run streets along
the slope. Reasoning: only a directional (gradient) quantity can "affect alleys"; a scalar alone would
affect density or size, which watabou lists separately. The admission that users can't see it means the
bias magnitude is small.

**Unknown.** Whether the field affects only alley *direction*, or also lot size/building placement;
the functional form and the gradient magnitudes.

---

### 2.18 The warp (mesh distortion) and rotation tools

**[STATED]** (22794): "Every map produced by the generator has an underlying mesh — districts are the
cells of this mesh, roads and rivers run along its edges. **Using this tool it's possible to move the
nodes of the mesh, effectively distorting the map.** This is not 'the ultimate editing tool': you can
move and resize wards, twist roads, rivers and coastlines, but **you can't create an island or add a new
road**. Also **applying too much distortion may cause glitches**. To change the size of the 'soft brush'
use the mouse wheel or '+' and '-' keys."
**[STATED]** (59798): "**Rotation tool** — while in the Warp mode **shift+click any point and drag**"
rotates the map as a whole. "Shift+clicking in the Warp mode may not be obvious, but I wanted to avoid
creating new buttons."
**[NAMED-ONLY]** (22717 roadmap): "Improved warp tool with **undo history, 'liquify', 'bloat', 'pucker'
modes**" — deferred to the desktop app.

**[SHOWN]** (22794/01) The Warp UI: the map desaturates to grey; the mesh is overlaid in red (nodes as
small circles, edges as thin lines); **two concentric green circles** mark the brush — inner (full
displacement) and outer (zero) — i.e. a **radial falloff kernel** applied to every node inside the outer
circle, weighted by normalised distance. The citadel wall is highlighted in the overlay, confirming wall
vertices are mesh nodes and move with it. A small `Apply` / `Discard` button pair sits top-right.

**[INFERRED]** Geometry is re-derived from moved nodes rather than being dragged as pixels: "move and
resize wards" plus "coastlines twist" means the downstream offsets/subdivisions re-run. "Too much
distortion may cause glitches" = the offsetting step (§2.2) fails when a cell becomes non-convex or
self-intersecting, which is the same failure family as §2.2's narrowing streets.

---

### 2.19 The road-centric experiment (not adopted)

**[STATED]** (31287): "the traditional one is 'road-centric', i.e. a settlement is defined by its roads
which are **grown kind of organically like veins**. If you interested in algorithms, check the
'Publications' section [of CityEngine's Wikipedia page]. **My code is loosely based on *Procedural
Modeling of Cities* by Parish and Müller with all the unnecessary L-systems stuff scrapped.**"
"The most noticeable distinction is the **curvature of the streets**, although the algorithm is
perfectly capable of generating **rigid grid layouts** for example. Another nice thing is that because
generation happens on the level of single roads, they can easily **adapt to the terrain descending to
the water, going around a hill etc.**"

**Verdict. [STATED]** "I'm not planning to switch to this new approach, at least not anytime soon. **Many
things are much harder to implement with it** and I'm not even mentioning the **performance**. **Merging
these two techniques also seems problematic.** For now I'm going to put this thing on hold… hopefully
I'll find a way to implement curvilinear roads in MFCG this way or another."

Development sequence, from the linked (uncaptured) tweets with decoded dates: simple growing road
network (2018-01-06) → blocked-area/water avoidance (2018-01-07) → buildings along the streets
(2018-01-08) → following the terrain (2018-04-15) → with city walls (2018-04-17).

**[SHOWN]** (31287/01) coastal town: white roads with **round caps and round joins**, dead ends
terminating in a visible disc; a thick primary highway carrying **circular node markers** at intervals;
a dense organic web with a radial-plus-concentric character; a second island settlement with a clean
radial pattern. (31287/02) a ring "wall" road drawn as a thick white line with **square node markers**,
enclosing a curvilinear street web; **buildings are small dark rectangles placed individually along the
street edges, oriented to face them** — the defining difference from block-centric output, where
buildings tile a block interior. Both images use a painted terrain (green/sand gradients, paper grain),
which watabou flags as incidental: "ignore the colours, I'm just tired of monochrome maps :)".

**Relevance to a re-implementation.** This is watabou's own documented rejection of the road-first
approach on grounds of implementation cost, performance and non-composability with block-centric
features — a design datum worth more than the images.

---

### 2.20 3D view / Toy Town

**[STATED]** (8154): a fly-through video, "the level of detail is… quite low: no textures, no shadows,
solid colours skybox". "I've also implemented a **'walking simulator'** to see how it looks from inside
— it looks even rougher, than from above, but it **lets me check sizes and proportions (this way I
decided to make quays wider)**." → the 3D view is used as a **proportion-validation instrument** for the
2D generator, which is a reusable methodological idea.
**[STATED]** (15006): Toy Town is "a **3d-visualizer for MFCG**… a prototype of something that one day
may become a separate native application or a part of the generator itself, or both."
**[STATED]** (22717): future 3D would move to Unity3D/UE4 for AO, shadows, DOF, roof types, chimneys,
jetties, physics, elevation, 3D export — "although I'm planning to **stick to low-poly aesthetics**".

**[SHOWN]** across 8154/03–04, 9958/01–08, 15006/01:
- Footprints are **extruded prisms**; earliest renders (8154/03, 9958/04) are **flat-topped boxes**;
  later ones (9958/01, /02, /03, /07, /08, 15006/01) have **pitched gable and hip roofs** with visible
  ridge lines, and Toy Town (15006/01) adds **windows as small dark rectangles in rows** and a visible
  storey rhythm.
- Height varies per building; cathedral/castle masses are much taller; **cylindrical towers** appear
  (8154/04, 9958/02 with conical caps).
- Walls are extruded prisms with rectangular tower blocks and crenellation (9958/01, /02).
- Vegetation: **palms** (9958/01), **billowing deciduous canopies** (9958/02), **bare winter trees**
  (9958/03, /08), **regularly-planted orchard rows** outside the wall (9958/08).
- Atmosphere: strong **distance fog** matched to the sky colour; monochrome and duotone schemes
  (9958/03 winter blue-grey, /05 purple-green dusk, /06 magenta-on-sand, /07 violet night with a visible
  sun disc and **long cast shadows**, /08 pink-and-gold with yellow fields).
- 9958/04 (top-down) shows the **coarse triangulated terrain plane** as large flat facets with subtle
  shading differences — the ground is a low-poly triangle mesh, not a smooth surface.
- 9958/06 (aerial) is the single best plan-level image: oval walled core, one citadel at the north,
  the plaza as a void, and extramural ribbons forming a star along six radial roads.

---

### 2.21 Export (PNG / SVG) and the dual-rendering tax

**[STATED]** (8154): hi-res PNG "in most cases its resolution will be higher than you can get by taking
a screenshot unless you are using one of those 4k/5k monitors. The exporter supports all the visual
options including hatching, block view etc." SVG: "may be useful if you intend to edit or print it. If
you open an exported file in a browser, most likely the map will be displayed quite small — don't
worry, it retains all the details."
**[STATED]** (11802 comments, a hard limit): "**creating bitmap images larger than ~8MP is
problematic.** If you really need a higher resolution you should consider SVG export."
**[STATED]** (85275): "**Supporting SVG is a real pain for me because all the 'drawing' needs to be
implemented two times — as 'screen drawing' and 'svg drawing'.** I consider dropping the support of
niceties in SVG i.e. palettes, labels, isolines etc and leave just raw shapes." In the same release the
legend became SVG-exportable and "all text… is now exported using the same font(s) as displayed inside
the generator."
**[STATED]** (19034): labels are exported to both PNG and SVG when the Labels style option is on.

**Design lesson [INFERRED]:** MFCG has **two independent renderers** over one geometry model, and
watabou repeatedly names this as his largest ongoing maintenance cost. An original implementation should
target a **single retained-mode scene description** with PNG/SVG/canvas back-ends.

**[SHOWN]** (8154/01, the exported `huge.svg` at 1200% in Illustrator) — the SVG's actual structure:
street ribbons and block polygons are **filled paths with visible anchor points**; the coastline and the
isolines are **separate open curved paths**; piers are individual thin quads; blocks carry a dark stroke.
Nothing is a bitmap. The selection outline shows everything grouped ("Group" in the Illustrator
control bar).

---

### 2.22 Palettes, hatching and visual options

**[STATED]** (6271): colour scheme and hatching become options; "All these parameters get saved locally
and restored on startup."
**[STATED]** (67134): "You can now set your own palette (**which still consists of only 4 colors**). For
that you need define it **in an SVG file and drag and drop that file onto the generator**… examples:
sand.svg, spring.svg, patina.svg… **all you need to create a palette is to change color values**."
**[STATED]** (34104): "To enable colour coding of neighbourhoods check the new **Watercolours** option
in the Palette submenu which is unchecked by default." (46967): "Improved neighborhoods coloring. More
visible on large maps with too many tiny buildings."
**[STATED]** (11802): "**Thin lines**. All the strokes are drawn 3 times thinner. This was added
specifically for the 'house view' to reduce the level of visual noise. It works better with small maps.
**It doesn't work very well with hatching.**"
**[STATED]** (59798): "**No stroke** option for buildings. It works like the old Block view option."
**[STATED]** (1367): hatching previewed one release before shipping.
**[STATED]** (46967): "Coast and rivers are drawn slightly differently (better?) **in hatching mode**."

**The 4-colour model [INFERRED from images + the "only 4 colors" statement]:** background/land,
building/block fill, water, and ink (strokes, walls, text). Every default-palette image is consistent
with exactly this: e.g. 11802/01 = cream land, tan blocks, sage water, dark slate ink; 67134/01 = olive
land, mauve blocks, blue-grey water, near-black ink. Watercolours overrides the *block* colour per
neighbourhood/district while keeping the other three.

---

### 2.23 Isolines (bathymetric contours)

**[STATED]** (8154): "**Waterbody isolines are optional.** Sometimes they don't look good and also they
are **slow to draw**, so now you can switch them off." (11802): under "Simplified water", "Rivers and
isolines get drawn as **polylines, not as curves**." (59798): "Isolines are slightly changed."

**[SHOWN]** 3–5 thin curves in a lighter tint of the water colour, running **parallel to the coastline
and nested inside the water body**, spacing widening with depth (11802/01, 46967/02, 59798/01);
rendered in the land colour over dark water in 11802/02. **[INFERRED]** they are successive **inward
offsets of the coastline polygon** (cheap, and explains both the parallelism and the cost complaint),
not contours of a real depth field.

---

### 2.24 Labels, legend and annotations

**Evolution.**
- 2062: hold **SHIFT** to reveal all ward labels — "It's just a helper function, **not an attempt to
  implement proper mapmaking labelling. Not yet.**"
- 3091: key moved SHIFT→**SPACE** "because SHIFT messed up taking a screenshot on mac".
- 4923: "Nicer map labels (**Merriweather TrueType font with outlining**)".
- 19034: **Labels** style option makes them persistent and exportable.
- 34104: one label per **neighbourhood** instead of per ward; "The placement of labels is far from
  perfect and it can be easily improved, but I'm going to refrain from it now to see where all this is
  heading." Aspiration: "custom editable neighbourhood labels and autogenerated ones as an option. I
  think that toponyms such as **The Shades** or **Diamond District** may add a lot of character."
- 46967: "Improved labels placement. Still far from perfect." + **three font sizes** (Annotations
  submenu).
- 59798: **Archivo Narrow replaces Merriweather** — "I like Merriweather… but it's probably **too
  'fancy' for the current plain style** of the maps." Plus "Better labels. Some weird kerning is fixed."
- 59798: **Map legend** — "provides an **uncluttered (though maybe less readable) alternative to ward
  labels**. You can change the corner in which the legend is displayed using the **arrow keys**."
- 85275: **curved district labels**. "They are not perfect of course, **especially curved ones**. I'm
  not even sure they can be perfect and anyway it's a huge topic. I guess the current labels are good
  enough for the first iteration considering the fact that **all the techniques are invented from
  scratch**. Most likely I'll try to improve them with some **existing algorithms created by smarter
  people than me**."

**[SHOWN]** Label conventions:
- Ward/neighbourhood labels (34104/01, 46967/02): **italic serif**, dark ink, with a **light halo /
  outline** so they stay legible over blocks; placed near the cluster centroid; horizontal.
- Legend (59798/01): a bordered box in a map corner listing `1. Market … 10. Castle` in italic serif,
  with **dark filled circular badges carrying white numerals** placed on the wards themselves; the same
  number repeats on every ward of that type.
- City title (46967/02, 59798/01, 67134/01): centred at the top, **bold**, large, with a halo.
- District labels (85275/01, /02): **large uppercase, letter-spaced, bold sans-serif**, **baseline
  warped along a curve fitted to the district**, size scaled to the district's extent, some rotated to
  near-vertical (`HEATHER ROW`, `NEWPOINT`, `NOONCREST`). 85275/02 is an explicit A/B: the left panel's
  horizontal mixed-weight labels vs. the right panel's curved, spaced, size-graded ones.
- Stylised render (22717/01): serif display title with a drop-outline, an italic water label following
  the bay, italic road labels with arrows (`to Waverly`, `to Kingsford`), and a boxed numbered legend
  (`1. Citadel, 2. Cathedral, 3. Market square, 4. Town hall, 5. South gate`) with numbered pins — the
  aspirational target, not shipped output.

---

### 2.25 Name generators

**[STATED]** (59798): "I knew there were very many name generators around, but I didn't know there were
SO many of them. Still, I've created a new one to name generated cities. It's pretty simple and it
produces a **mixture of English sounding names (e.g. Boridge Port) and heroic fantasy names (e.g.
Elmsword)**. You can disable it in the Annotations submenu and you can **reroll the name without
creating a new city by shift+clicking the title**." (67134): plain click renames it to arbitrary text.
(85275): district names use a **simpler** algorithm than city names; editable "in the future".

**[SHOWN]** City names observed: `Crosperton` (59798/01), `Stormwind` (67134/01), `Tienweinau`
(46967/02 — imported from Azgaar's FMG, hence the German-flavoured morphology, not MFCG's generator),
`Randwick` (22717/01). Pattern: a stem + an English toponymic suffix (`-ton`, `-wick`, `-bridge`,
`-port`, `-ford`), or a compound of two evocative morphemes (`Storm`+`wind`, `Elm`+`sword`).

---

### 2.26 Interop: Azgaar's Fantasy Map Generator

**[STATED]** (46967): "you can **click any settlement on a map in FMG** (and then a tiny button with a
map icon on it) and **MFCG will build a plan of that settlement taking into account its size and
location**. And vice versa: you can click the **'Overworld'** button in MFCG and for the current city
FMG will generate a world around it with rivers and oceans, neighboring towns and states."

**Known defects from the comment thread.** `Glidias`: "the roads and coastlines **don't tally exactly**
with the overworld. So it's hard to do seamless transition from overworld to actual city as a single
world in itself." `Distraction Tactics`: the World→City→World round trip loads a *different* world each
time; watabou: "I'm pretty (like ~90% :)) sure that World→City→World should work as expected… Maybe
we've broken something." → the round trip is **URL-parameter-based and lossy**; only a small vector
(size, location, presumably water/river flags and a seed) crosses the boundary.

**[SHOWN]** 46967/01 = FMG's world map with the `Edit Burg: Tienweinau` dialog and its icon toolbar;
46967/02 = the MFCG plan generated from it, with coast and river matching the burg's coastal position.

---

### 2.27 Determinism, permalinks and state

**[STATED]** (2062): permalinks implemented and then found unusable on itch.io "because the generator
itself is loaded into an iframe and **can't access the address bar**". (3091): the mirror
`fantasycities.watabou.ru` exists specifically so permalinks work. (19034): "**All layout parameters are
stored in URL.**" (6271): options persisted to local storage.

**[INFERRED]** A map is fully reconstructible from `(seed, layout parameter vector)` packed into the
URL — which, combined with ward reroll (§2.11), implies a **hierarchical seeding scheme** (a global seed
deriving per-ward seeds) rather than one linear RNG stream, since a ward reroll must not disturb any
other ward.

---

### 2.28 Performance notes (scattered, but consistent)

- Adding a water body: "surprisingly… a **serious negative impact on performance**" → optimisation pass
  (4923).
- Adaptive coast LOD "**greatly improves drawing performance**" (8154).
- Isolines are "**slow to draw**" → made optional (8154).
- Rivers: "generation takes **much more time**" (11802).
- "**Faster generation** — a side effect of refactoring" (22794); 0.6.0 refactor "makes the generation
  process a bit faster and more robust" (67134).
- Per-building numbering rejected on performance grounds: "Even in a small town there are usually **more
  than 50 buildings** (just counted :)). **A large town may consist of hundreds** houses, so it would
  affect performance badly" (11802 comments) — a useful **scale datum**.
- Rejection sampling is explicitly avoided because it "**will increase generation time**" (3091
  comments).
- Bitmap export ceiling "**~8MP**" (11802 comments).
- Whole-city generation on a 2013 MacBook Pro (8 GB): "**it never takes longer than a fraction of a
  second** to generate even a large city. There may be some **memory leaks** though depending on a
  browser" (34104 comments).

---

### 2.29 Options / UI surface (complete inventory from this slice)

**Layout:** Citadel · Plaza · Walls · Temple · Coast · Shanty towns · More roads · Rivers (implicit) ·
Farm fields · Elevation · Continuous (0.4.3–0.5.4, then removed) · Random (master override).
**Buildings:** Off / Simple / Complex / Blocks / tight; No stroke.
**Style/Palette:** colour scheme · custom SVG palette · Watercolours · Hatching · Thin lines ·
Simplified water · isolines on/off.
**Annotations:** Labels · label font size (3) · Legend (+corner) · Scale bar (m/yd) · city name on/off.
**Tools:** Warp (mouse-wheel or +/- brush size; Apply/Discard) · Rotation (shift+drag in Warp) · ward
reroll (cmd+click) · name reroll (shift+click title) · rename (click title).
**Hotkeys:** `C` citadel, `P` plaza, `T` temple, `W` walls, `S` shanty towns, `O` coast (7063);
`B` buildings (34104); `SPACE` labels + building count (3091, 22794); `Enter` new city, same size group
(7063); arrow keys move the legend (59798).
**Export:** PNG (hi-res) · SVG.

---

## 3. Visual and style conventions observed in the images

**Palette (default "plain" style).** Exactly four roles — land/background, block fill, water, ink.
Default: cream/ivory land `≈#FBEFC8`, tan/ochre blocks `≈#D9A06B`, sage-green water `≈#8FA98B`, dark
slate ink `≈#3A4A44` (11802/01, 34104/01, 46967/02, 59798/01). Variants seen: khaki-on-olive (11802/02),
mauve-on-bone (11802/03), navy-on-warm-grey (8154/02, 85275/01), grey-on-grey (34104/02), olive/mauve/
steel-blue (67134/01). Everything is **flat fill — no gradients, no texture, no drop shadows** in the
shipped 2D style. (The two non-shipped styles break this: the road-centric experiment 31287/01–02 uses
painted terrain gradients plus paper grain; the aspirational 22717/01 uses a sepia wash, a vignette and
cast shadows.)

**Line weights.** A 3-tier ink hierarchy: hairline for alley/lot divisions, ~2× for block outlines and
street casings, ~6–10× for city and castle walls (which read as solid black bands). The "Thin lines"
option divides all strokes by 3. Buildings can be drawn with no stroke at all.

**Hatching.** 45° parallel lines at uniform spacing, applied per block/building, in ink over the
background (8154/02, 19034/01). Farm fields use the same primitive at a **per-field angle** and a
lighter tint (59798/01, 67134/01, 85275/01). Hatching and Thin lines are stated to interact badly.

**Walls.** Thick closed polylines of 8–14 straight segments; **towers at vertices** as filled squares
(rotated to bisect the corner) or filled circles, selectable; **gates as gaps** where a main street
crosses; castle enclosures use the same convention at smaller scale.

**Water.** Flat fill; smooth spline coastline (post-0.5.5) with 3–5 nested **isolines** in a lighter
tint, spacing widening outward; rivers as constant-width bands with a lighter casing line each side;
**bridges = the street ribbon drawn over an interruption in the river band**; **piers = groups of 3–6
thin straight bars perpendicular to the quay**, projecting into the water.

**Blocks and buildings.** Blocks are filled polygons subdivided by hairlines into lots; in buildings
mode each lot carries an orthogonal footprint — rectangle, L, U, T, cross or ring — with **white
interior voids** (shared courtyards) that never touch a street. Buildings stand clear of city and
castle walls (post-0.5.3).

**Plaza.** A background-coloured void at the convergence of the main streets, usually with a **small
filled circle** at its centre; occasionally a long ring-shaped market hall inside it.

**Roads outside town.** Thin **double lines** (a hairline casing with land showing through), drawn as
splines, running to the map border; extramural buildings ribbon along them.

**Labels.** Two families: (a) the "plain" style — italic serif (Merriweather → Archivo Narrow) with a
pale halo, horizontal, at cluster centroids, plus a bold centred title; (b) the 0.7.0 district style —
large, uppercase, letter-spaced, bold sans, **baseline curved to follow the district**, size graded by
district area. A boxed **numbered legend** with dark circular badges is the low-clutter alternative.

**Scale bar.** Bottom-left, a classic alternating-tick bar labelled `0 / 100 / 200 m`, toggling to
yards on click (67134/01).

**Trees.** Absent from the shipped 2D style (forests were **removed** in 0.3.0). They exist only in 3D
(palms, canopies, bare winter trees, orchard lattices) and in the aspirational stylised render, where
they are hand-drawn puffy cloud outlines in clusters (22717/01).

**3D style.** Low-poly, untextured, flat-shaded; flat-topped boxes early, pitched gable/hip roofs later;
windows as small dark rectangles (Toy Town only); terracotta or slate roofs on cream walls; heavy
distance fog matched to a gradient skybox; ground is a coarse triangulated plane.

---

## 4. Creator's stated design philosophy and constraints

1. **Plausibility over accuracy, legibility over realism.** "What is more important is that walls make a
   pile of polygons look like a fantasy city map" (1579). The castle is kept because "a castle adds some
   asymmetry and makes a map look better" (1579), not because cities had them.
2. **Labels are hints, not inventories.** "'Gate' doesn't mean that the whole ward is just er… gate"
   (1579); "the name of this one is supposed to be treated as a hint, not as a literal explanation"
   (46967). The generator produces *suggestive* structure for a GM to fill in.
3. **One click to a believable map; editing is secondary.** "Initially the goal of the generator was to
   produce reasonably believable maps with a single click. It changed over time…" (22717) — and proper
   editing was explicitly walled off into the (hypothetical) paid desktop app.
4. **Generation time is a first-class budget.** Constraints are preferences that degrade rather than
   reject, explicitly to avoid re-rolling: "I can change it to discard such layouts but it will increase
   generation time" (3091). Whole-city generation targets "a fraction of a second".
5. **Ship the ugly thing behind a default-off switch.** Shanty towns, House view, Buildings, Watercolours,
   Labels, Legend, Elevation and Farm fields all shipped **off by default** while imperfect. Features are
   also removed without ceremony (Forests in 0.3.0, Continuous in 0.5.5).
6. **Honest about defects.** Nearly every post names an unfixed problem: triangular buildings, the
   inscribed-rectangle function that "doesn't work entirely correctly", coastlines "lacking interesting
   features such as bays and peninsulas", farm fields "drawn incorrectly", labels "far from perfect",
   warp glitches, "some old bugs are fixed, some new bugs are introduced" as a running joke.
7. **Refactoring is a feature.** 0.6.0 and 0.7.0 both lead with invisible internal work (a general
   refactor, then the DCEL migration) and justify it as unlocking otherwise-impossible features.
8. **Abstract, not genre-locked.** Asked about sci-fi: "I don't know about sci-fi, but **I do want to
   keep it abstract**. The standalone generator would expose much more settings, hopefully they will be
   enough to create more diverse maps" (22717).
9. **Separate generators for separate settlement scales.** On village requests: "**villages need their
   own separate generator, because they are quite different from towns/cities.** It shouldn't be too
   hard though, maybe I'll try it when I get tired of cities" (1367) — the origin of Village Generator.
10. **Low-poly aesthetics are a deliberate choice**, not a limitation, and are to be kept even after a
    move to Unity/UE4 (22717).
11. **Dual rendering (screen + SVG) is the standing maintenance tax**, and he openly considers reducing
    SVG to raw shapes (85275).

---

## 5. Useful facts from the comment threads

- **`agnate` (1367)** proposes triangular lots with rectangular buildings inside — "if you draw the
  triangle shape as the fence, you could draw rectangles inside" — which is effectively the
  largest-inscribed-rectangle approach shipped in 0.4.3/0.5.0.
- **`llynglas` (3091)** raises adjacent plazas and non-rectangular plazas; watabou's reply gives the
  market-placement criterion and the rejection-cost argument (§2.9). Plaza rectangularity was not fixed
  until 0.6.0.
- **`watabou` (11802)** gives the bitmap ceiling: "creating bitmap images larger than ~8MP is
  problematic."
- **`watabou` (11802)** gives building counts: >50 in a small town, "hundreds" in a large one — and
  rejects per-building numbering on that basis.
- **`Beloid` (11802)** asks how the generator works; watabou points to
  `reddit.com/r/proceduralgeneration/comments/668sqb/…/dggkhnr/` — "**Here is my comment where I outline
  how the generator works… It's rather old and since then I've added many features, but the general
  approach is still the same.**" **This is the single highest-value uncaptured source referenced in the
  slice.**
- **`dracodruid` / `com2kid` (34104)** ask what "Continuous" does; watabou's reply is the best available
  description of the per-district parameter set (§2.10).
- **`watabou` (34104)** on performance: "On my decent, but pretty old MacBook Pro (2013, 8Gb) it never
  takes longer than a fraction of second to generate even a large city. There may be some memory leaks
  though depending on a browser."
- **`Colt Hack` (46967)** reports gate wards appearing "in the centre of town… or there are more than
  seems right"; watabou defends the concept but concedes "I'm planning to **replace them all with
  something more subtle in the future**" — foreshadowing the 0.7.0 district system.
- **`Glidias` (22717)** requests a JSON export exposing "the **voronoi structure/neighbours**" and
  proposes BVH culling for 3D; watabou does not dispute the Voronoi characterisation.
- **`Glidias` / `Distraction Tactics` (46967)** document the FMG round-trip defects (§2.26).
- **`Ealiom` (11802)** requests higher-resolution export; answer is the 8MP limit + SVG.
- **`watabou` (1367)** first states the village-generator plan (§4.9).
- **`watabou` (22717)** on why the paid product would be desktop, not web: "It would be much harder for
  me to implement a commercial (i.e. paid) version as a web app, than as a desktop app."
- **Community demand signal (22717)** is overwhelmingly for: editable/named districts, POI marking with
  icons and descriptions, a demographics generator tied to city size, and an open export format.

---

## 6. Open questions a re-implementer must decide

1. **The base subdivision.** Voronoi (and with what seeding — Poisson-disc, jittered grid, radial?),
   relaxed or not; or something else entirely. Nothing in this slice states it. → resolve against
   TownGeneratorOS (devlog 6592) and the uncaptured Reddit `dggkhnr` comment.
2. **How the city footprint and the wall polygon are derived** from the mesh, and how gates are chosen
   (the 0.5.1 "reworked gate generation algorithm" is never described).
3. **The lot-subdivision cut rule** (§2.3) — OBB bisection is my inference, not stated.
4. **The max-inscribed-rectangle algorithm**, its area threshold, the sub-block grid, and the deletion
   probability (§2.4).
5. **Ward type assignment**: what makes a cell Craftsmen vs. Slum vs. Patriciate; why gate wards
   sometimes land centrally.
6. **The per-ward parameter vector**: which parameters, what ranges, and how "Continuous" smoothed them.
7. **Water-region generation** (§2.14): "marks some part of the terrain as water" is the whole
   description. Also the dock-block count and the pier rule.
8. **River path selection** (§2.15): source/sink choice, the cost function on mesh edges, the width, and
   what changed in 0.6.0 to make it "more likely to run through the city".
9. **District growing** (§2.16): the seed set ("prominent city features" — which?), the growth cost
   function, and the stopping rule.
10. **The elevation field's** functional form and exactly how it perturbs alleys (§2.17).
11. **Farm-field geometry** — whether it reuses the mesh (my inference) or is a separate subdivision.
12. **Curved-label placement** (§2.24) — watabou says the techniques were "invented from scratch" and
    does not describe them.
13. **The seeding scheme** that makes per-ward reroll independent (§2.27), and the exact URL parameter
    vector.
14. **Size classes**: the Enter hotkey regenerates "a new city of the same size group" — what the groups
    are, and how size maps to cell count, radius, gate count and building count.
15. **Winding alleys** (0.5.2) — announced, partially shipped, never explained.

### Sources referenced by the posts but NOT captured locally (recommended follow-ups)
- `reddit.com/r/proceduralgeneration/comments/668sqb/…/dggkhnr/` — watabou's own outline of how the
  generator works (cited in 11802 as still accurate in substance).
- `reddit.com/r/proceduralgeneration/comments/668sqb/…/dgk6h0i/` — castle placement discussion (1579).
- `reddit.com/r/proceduralgeneration/comments/6cg1ol/…/dhucfi6/` — the wall-removal experiment (1579).
- `reddit.com/r/rpg/comments/6d02cf/…/di01mpw/` — the planned fix for triangular buildings (1579).
- `itch.io/post/422446` — watabou on the "Continuous" option (34104).
- `reddit.com/r/FantasyCities/comments/a1wx6h/farm_fields/`, `…/9ygosn/` (rotation),
  `…/9zofiw/` (city names) — 0.5.5 feature write-ups (59798).
- `reddit.com/r/DnD/comments/8jkf7z/…/dz0tlfg/` and `r/rpg/comments/8jkfj8/…/dz370sc/` — what a gate
  ward is (46967).
- The 13 Twitter/X posts decoded in §0 (videos of growing roads, water avoidance, buildings along
  streets, terrain following, mesh distortion, winding alleys, block view, farm fields, custom palettes,
  elevation, stylised render).
- `fantasycities.watabou.ru/sand.svg`, `spring.svg`, `patina.svg` — the 4-colour palette file format
  (67134); trivially small and would pin the palette schema exactly.
- `github.com/watabou/TownGeneratorOS` — the 2017 open-source ancestor (6592); authoritative for §§2.1–2.4.


## External-sources addendum (2026-09-25) — research/external/

*Closes critic gap §6.5 as far as the public web allows. Written by the managing session, not a reader agent. Live
`reddit.com` is login-walled to scripts (`old.reddit.com` → 302 to login; `www`/`api` → 403) and refused by the
built-in browser, so every Reddit item below comes from an Internet Archive snapshot; the extracted comment text is
kept next to each raw page as `*.comments.txt`. Creator statements are paraphrased with short quotes (clean-room:
documentation, not content to reuse). Fetch logs: `research/external/fetch-log.json` (2026-09-21 live fetches),
`reddit-wayback-2026-09-25.json`, `reddit-wayback-cdx-2026-09-25.json`, `reddit-wayback-subdomains-2026-09-25.json`.*

### E0. What was recovered

| source (as cited in §6 above) | result | file |
|---|---|---|
| `itch.io/post/422446` — watabou on "Continuous" (34104 comment) | fetched live | `raw/a7bb3529f1.html` |
| `itch.io/post/11304150`, `/11304350` (also linked from the posts) | fetched; **irrelevant** — comments on watabou's *Sails* generator | `raw/d4ad5c06c6.html`, `raw/4c49fad0c8.html` |
| `fantasycities.watabou.ru/heavy.svg`, `sand.svg` | fetched live — real palette files | `raw/d268a0a334.svg`, `raw/34d5f9c533.svg` |
| `…/patina.svg`, `…/spring.svg` | server returned the site's index HTML instead (files are HTML despite the name) | `raw/294116e532.svg`, `raw/c53d6b6e29.svg` |
| Reddit `668sqb/…/dggkhnr` — watabou's outline of the generator (Apr 2017) | Archive snapshot 2019-09-19 (old-reddit, single-comment page) | `raw/wayback-9db2390eac.comments.txt` |
| Reddit `6cg1ol` — MFCG 0.0.2 thread (May 2017), incl. the wall-less experiment (`dhucfi6`) | Archive snapshot 2023-06-06 (old-reddit): 45 comments, 17 by watabou | `raw/wayback-old-6cg1ol-ddb6a5a61b.comments.txt` |
| Reddit `6d02cf` (r/rpg, 0.0.2) — triangular-building fix (`di01mpw`) | Archive 2023-06-06: 36 comments, 2 by watabou (both duplicates of 6cg1ol replies) | `raw/wayback-old-6d02cf-73ddd0cc05.comments.txt` |
| Reddit `8jkf7z` (r/DnD, 0.5.3, May 2018) — gate wards (`dz0tlfg`) | Archive 2023-06-08: 72 comments, 9 by watabou | `raw/wayback-old-8jkf7z-adbc45c6e2.comments.txt` |
| Reddit `a1wx6h` (r/FantasyCities) — farm fields (Dec 2018) | Archive 2023-06-11: 8 comments, 4 by watabou | `raw/wayback-old-a1wx6h-01fc604279.comments.txt` |
| Reddit `9ygosn` (r/FantasyCities) — rotation tool (Nov 2018) | Archive 2023-06-11: 7 comments, 4 by watabou | `raw/wayback-old-9ygosn-6b8a003258.comments.txt` |
| Reddit `668sqb/…/dgk6h0i` — castle-placement comment | **not recoverable**: no old-reddit capture of the thread; the 2022 new-reddit capture carries only the post | `raw/wayback-b7ca6a67cb.html` (post only) |
| Reddit `9zofiw` (city names), `18t363o` (street colour), `8jkfj8` (r/rpg copy of the gate-ward thread) | **not recoverable**: 9zofiw blocked by the Archive (403), the other two never captured | — |
| 13 Twitter/X videos; truncated Patreon bodies `ftg/99652534`, `watabou-city/46041997` | not attempted (X requires login; Patreon bodies are truncated at source) | — |

### E1. What the sources say

**E1.1 "Continuous" layout option (itch 422446, watabou replying to com2kid on the 0.5.3 devlog) `[STATED]`.** Every
district has a parameter set that shapes its layout — the creator names "how regular is the grid of its alleys" and
"how big are the buildings" — so different parts of a city look visibly different. That can look wrong at a street
whose one side has tiny buildings and the other huge ones. With Continuous checked the generator "tries to change
these parameters across districts gradually". → Resolves open question 6 above (which parameters and how they were
smoothed): at least alley-grid regularity and building size; smoothing = gradual cross-district variation, not a global
average. The option existed 0.4.3–0.5.4 and was removed in 0.5.5 (§2 table) — a design choice a new generator can keep.

**E1.2 Palette file format (`heavy.svg`, `sand.svg`) `[SHOWN]`.** A palette is an SVG whose elements carry `id` =
colour role and `fill` = colour; nothing else in the file matters. `sand.svg` is the four-role form — `paper`, `ink`,
`medium`, `light` — which pins the role names of the "only 4 colors" model that §2 (line ≈768) could only infer.
`heavy.svg` is an eight-role form adding `roof`, `water`, `green`, `road`. Values, as documentation only: heavy —
paper `#f2dec2`, ink `#0d0d00`, medium `#7f7561`, light `#b9aa92`, roof `#b36859`, water `#616566`, green `#8c885b`,
road `#fff4e6`; sand — paper `#eae1d2`, ink `#2e2b22`, medium `#807057`, light `#d5b386`. `[INFERRED]` roles absent
from a four-role file are derived from the four (the 0.6.0 post says four colours suffice), so the style system needs a
role → colour map with derivation rules for the optional roles.

**E1.3 The 2017 outline (Reddit `dggkhnr`, watabou, April 2017) `[STATED]`** — the creator's own summary of the
monthly-challenge generator, cited in devlog 11802 as still accurate in substance:
1. a Voronoi diagram whose seeds are "placed spirally with random fluctuations" so the regions are evenly spread;
2. the first (central) region is the plaza, the next N regions are wards inside the walls, then a citadel; the rest are
   farms, plains and woods;
3. close vertices are merged to break the Voronoi look and create proper crossroads;
4. the border of the ward set is the city wall, smoothed to a rounder shape;
5. some wall vertices become gates; each gate is joined to the closest plaza corner by a wider street, which is then
   extended beyond the city;
6. last, each ward's inner structure: mostly cutting the ward into smaller pieces with or without gaps, with
   per-ward parameters.
An update to the comment says ward types and terrain/rivers were planned but not yet done. → This is exactly the
TownGeneratorOS pipeline described in `os-model.md` (spiral seeds → Voronoi → plaza/wards/citadel assignment →
junction merge → wall = ward border, smoothed → gates → streets → per-ward slicing). `[INFERRED]` the 2017 source *is*
the design the outline describes, which raises algorithm-identity confidence for the stages that the live build still
names (`buildPatches`, `optimizeJunctions`, `buildWalls`, `buildStreets`, `createWards`).

**E1.4 MFCG 0.0.2 thread (Reddit `6cg1ol`, May 2017) `[STATED]`.**
- Visual: colours lightened for readability using a real old map as reference; castle and outside roads drawn
  differently. Hatching was tried as a replacement for grey fills: it is "bitmap filling, not real vector hatching",
  the standalone build was extremely slow with it, and at the fineness large maps need it produces moiré on
  non-retina screens — shipped later as an option. → A renderer that hatches must work at the device pixel ratio.
- **Wards become semantic**: the final generation step assigns a ward type (market, castle, craftsmen, administration,
  slum, …) to a patch, and the patch is sliced into buildings differently per type, e.g. a patriciate ward = large,
  fairly regular buildings with empty space between them; hovering shows the type; the creator planned to use the
  types for "improved visualisation (3d?)" or a more detailed city model.
- **The wall-less experiment (the `dhucfi6` item)**: small settlements without walls "look… like settlements, but
  layouts are wrong" — "the borders are too well defined"; the creator did not yet know how they should look.
  (Resolved in 0.3.0 by outskirts and, much later, by the Village Generator.)
- Ward semantics (reply, repeated in r/rpg `6d02cf`): a "Gate" ward is a ward with gate-related venues — taverns,
  cheap shops — and people live there; a craftsmen ward also has pubs and churches; no purely residential wards except
  the rich patriciate ones, because craftsmen lived where they worked.
- Triangular buildings "are a problem": the plan is to treat tiny shapes as plots and place buildings of the desired
  shape inside them — the origin of the lots-then-buildings model realised years later (§2 of `mfcg-posts-b.md`).
- Also stated: more buildings along roads (taverns, smithies) planned; small temples not distinguished, a main
  temple/cathedral planned; water planned; castles "deserve their own generator"; zooming disabled because there are
  no details to zoom into.

**E1.5 0.5.3 thread (Reddit `8jkf7z`, r/DnD, May 2018) `[STATED]`.**
- Buildings never touch the curtain wall, inside or outside, and this is hardcoded — chosen "from the defenders' point
  of view". → A hard constraint for wall wards, not an option.
- What a gate ward is: the creator reposts an excerpt from an unnamed RPG book — gate wards are bustling, second only
  to market wards in activity, exist only where the city has gates, and are where inspection or taxation of merchants
  happens. → Confirms gate wards are a venue mix keyed to a gate, consistent with E1.4.
- No save/load; the permalink of the non-itch build is the closest thing. Points of interest with names and short
  descriptions "probably" to be autogenerated later (realised as the legend / POIs in 0.5.5+).

**E1.6 Farm fields (Reddit `a1wx6h`, Dec 2018) `[STATED]`.** The creator was unhappy with the first fields and
summarised the crowd's fixes: make them smaller and more diverse in size; fewer and grouped, so there are large areas
full of fields or free of them; borders more visible, by wider gaps or hedges. An off switch was promised; a
High/Low/Off switch was rejected because it needs a submenu. Forests had existed and were removed as ugly (and
historically cut down around settlements). Hedges were rejected on a level-of-detail argument: if fields get hedges,
why no bushes, trees, fences and chimneys — "too much work". → Two design constraints for the improvement ledger: field
grouping/size diversity/visible borders, and a *consistent* level of detail per style rather than isolated detail.

**E1.7 Rotation tool (Reddit `9ygosn`, Nov 2018) `[STATED]`.** Rotation was implemented as SHIFT-drag inside the warp
tool rather than as its own tool because "there are just too many buttons"; the creator was already thinking about
remaking the whole UI. → The reference deliberately rations its tool count; an "improved" editor must not just add
buttons.

### E2. What changes for an assessor or designer
1. Algorithm identity for the 2017-era stages is now `[STATED]` twice (source + creator outline), not only `[SHOWN]`
   from the source.
2. Data model: ward type = venue mix with residents, never zoning; buildings keep a clearance from curtain walls on
   both sides.
3. Style system: palette = role→colour map in a tiny SVG with four mandatory roles and four optional ones; hatching is
   raster-filled and device-pixel-ratio-sensitive; detail level must be consistent across the whole map.
4. Product: tool count is a design budget; per-district parameter smoothing ("Continuous") is a removed feature worth
   re-evaluating with a measurable criterion (no abrupt building-size jump across one street).
5. Still unknown after this pass: the castle-placement discussion (`dgk6h0i`), the city-name generator write-up
   (`9zofiw`) and the street-colour request (`18t363o`).
