# watabou-extra-b — Patreon posts outside the two collections, NEWER half (2022-07 → 2026-08)

Slice: `research/patreon/watabou-extra` indices [33:65] of `research/worklists.json` — 32 directories.
All 32 `post.md` files read in full (body + links + complete comment thread). All 120 images opened and
described. Three directories contain no images (73450463, 95796287, 96122791); two more (95796287,
96122791, plus 91285519 and 164387414) are paywalled teasers with no visible body.

Evidence tags used throughout: **[STATED]** creator explicitly describes the method · **[SHOWN]** visible
in an image but not explained · **[INFERRED]** my reconstruction, reasoning given · **[NAMED-ONLY]**
feature announced with no method.

Generator abbreviations: **MFCG** Medieval Fantasy City Generator · **VG** Village Generator ·
**NG** Neighbourhood Generator · **UP** Urban Places (NG's successor) · **PS** Perilous Shores ·
**1PDG** One Page Dungeon Generator · **PM** Procgen Mansion · **CV** City Viewer.

---

## 1. Chronological table

| # | Date | Post id | Title | What changed / what it adds to the record |
|---|------|---------|-------|--------------------------------------------|
| 33 | 2022-07-12 | 68936414 | ☠️PS 1.4.1: compass rose and other visual changes | Purely-visual PS release. Compass rose (rerollable, wheel-rotated, auto-placed to occlude fewest map *features*). "Hollow" rivers = outlined wavy shapes in shallow colour + new `Rivers` stroke-width param. Coastal contour lines now also around sea rocks; new `Waves` colour. Mountains: thick silhouette strokes, **radial** gradient replaces linear, rounder bases. Woods: light trees wider, fir trees taller, less hatching. **Forest "blobs" reworked and now respond to `cluster scale`.** Town icons shifted partly below baseline for a bird-view read; `Random icons` rerolls the "architectural style" of all towns. Grid colour unified with hex numbers; grid can skip ocean tiles. **Announces intent to delete the legend** and show everything as map labels. |
| 34 | 2022-08-24 | 70917627 | 📍NG 1.2.0: new template, integration with mansions, lots of visual changes | **Ring template** (concentric ring roads; degenerate centre → square/grove/large building). Ring template existed only as a **test-bed for "twisted bisection of polygons with holes"** — the generalisation of the MFCG bisection primitive from simple polygons to polygons with holes; described as "still pretty glitchy" and explicitly destined for MFCG. NG→PM handoff now passes **house shape**, not just size. Road surfaces Plain/Cobbles/**Tiles** (rectangles aligned to the road course); `Outlined roads`, `Twisting roads`, `Road width` ratio (drawn centre vs. true building-to-building width); roads can be drawn as dashed schematic lines. Large buildings get **spires** (round/square in plan) and **dormers** as alternatives to domes; trees planted around them when the plot is much bigger than the building; more of them, mutually spaced apart; `secular` tag disables. **Multi-colour style parameters** introduced. `Details` checkbox toggles roof hatching + tree shading (also a speed lever). More pronounced roof ridges; chimneys; tighter framing; Shift+Enter = new map + random style. |
| 35 | 2022-10-18 | 73450463 | Recent lack of posts, plans for a month | No images. Personal/context post (fled the country). Notes "a number of technologies ready to be implemented" in MFCG. Confirms the practice of parking tech until a generator's turn. |
| 36 | 2022-12-19 | 76106823 | 🌊Lighthouses | PROCJAM 2022 jam generator. Elevation line-art; a real book used both as shape reference and as visual-style model. No map technique; style note only. |
| 37 | 2023-01-20 | 77490818 | WIP: area labels in ☠️PS | **Area-label placement**, explicitly "reusing as much code from MFCG as possible". Straight vs **arced** labels. **Debug view published** showing per-area simplified polygon + oriented bounding box + label axis + anchor points. Flags the coming **naming-language ("conlang") system** as a parallel option to "legacy" names. Compass must switch from avoiding *features* to avoiding *labels*. |
| 38 | 2023-02-17 | 78826680 | 🗝️1PDG 1.2.4 | Stairs in connection cells (visual-only elevation hint) with `deep`/`flat` tags; `string` tag = linear room sequence; `round` tag biases round rooms; `export=png\|svg\|json\|vox\|md` URL param; JSON marks the "final" room; **"broken" grid mode** (uneven floor-tile look); draggable notes. Comment: exported JSON note order is the *unsorted natural* order, drawn order is sorted — a data-model tell. |
| 39 | 2023-07-14 | 86093774 | Floor plans | The **recursive-bisection floor-plan method**, v2. Originally conceived for PM, rejected there, shipped in *Dark Clues*. Tweaks to how the shape is bisected and how doors are placed; **corridors now merge where possible to avoid unnecessary doorways**. Works on large chaotic rectilinear outlines with strictly rectangular rooms; "small ones look much better". |
| 40 | 2023-10-19 | 91285519 | Coming soon | Paywalled teaser, blurred VG-tagged night image. No content. |
| 41 | 2023-12-01 | 93887809 | Collection of styles for ☠️PS | Styles are shareable data objects; 9 curated + 5 standard presets published on Arcana. VG has an equivalent on itch. Comment: **custom names cannot be saved**; the only way to make GM/player versions is export-then-hide-then-export. |
| 42 | 2023-12-11 | 94469350 | 🍺Tiny Pubs | PROCJAM 2023, ~1 day of work. Facade-elevation generator. Style reference only. |
| 43 | 2024-01-03 | 95796287 | Desktop versions (poll) | Paywalled, no body. |
| 44 | 2024-01-08 | 96122791 | Desktop versions — results | Paywalled, no body. |
| 45 | 2024-02-24 | 99067664 | 📍NG 1.2.1 | **Pure code transplant from MFCG and other generators** — no new features, "faster and more stable". Gradients dropped for trees. Presets given more contrast. **"Internal settings adjusted to make streets and buildings look more like their counterparts in the city generator."** Announces NG will be excluded from Arcana. |
| 46 | 2024-03-28 | 101173551 | **Straight skeletons** | Own O(n²) straight-skeleton algorithm, written because the papers were unreadable; glitches in special cases. Three uses named: **hip-roof ridges in MFCG** (good on medium maps, bad on small and large), a **modified variant for gable ridges** that only works on "clean" shapes (reserved for grid-based buildings: donjons, temples, farm houses), and **NG's "fake" gable roofs preferred by eye over mathematically correct hip roofs**. VG buildings are strictly rectangular so it needs nothing. Two further ideas: **curvilinear map labels** (Azgaar-style) and **mountain ridges from an island polygon**. |
| 47 | 2024-04-30 | 103335095 | 🍺Tiny Pubs 1.3.0: Universal Pub Profile | Random fachwerk overlay on facades. Universal Pub Profile = McDowall's *roll 5d6, drop the highest, read the rest* stat system (1/2/3 = a bit/some/lots, 4/5/6 = null/hazardous/super), stats Renown/Rowdy/Menu/Hubbub, encoded as a 4-character string. Reusable **content-tagging idiom**. |
| 48 | 2024-06-27 | 106975409 | ⛏️Cave/Glade Generator joins Arcana | NG formally demoted out of Arcana. **Seed of Urban Places**: a new generator "focused less on filling an area with blocks (because it's clearly a domain of MFCG), more on creating relatively small urban locations with their own character". Comment: cave entrance counts are requested categorically — 0 `sealed`, 1 `entrance`, 2 `passage`, >2 `junction`. SVG masks exported as real masks (Gwenview renders them as red fill). |
| 49 | 2024-07-30 | 109092851 | ☠️PS 1.6.5: fjords and curved labels | **Curved labels** added beside straight and arced: "bend more freely and follow the shape of the area more accurately". Three named failure modes: **holes are not considered** (a village inside a forest gets overlapped by the forest's label), occasional wild curvature (deliberately not smoothed, because smoothing collapses them back to arcs), and rare mis-draws. **`fjord` tag**: inverting a peninsula was not enough — fjords made narrower, occasionally branching, with more pointed tips; pairs with `highland` to put mountain ridges along the coast. **Coastlines made more fractal-like**, visible mainly with `Rugged`. Town icons boldly outlined. |
| 50 | 2024-11-05 | 115426745 | ⛵️Sails | PROCJAM 2024. **3 exposed parameters expand into ~20 internal parameters** that precisely describe a ship. |
| 51 | 2024-11-08 | 115606722 | More ⛵️Sails | **Ships drawn as stencils (single silhouette) so draw order between parts never has to be decided.** `Curvature` parameter for hull bend. **Some internal parameters randomised so identical exposed parameters still differ.** |
| 52 | 2025-03-11 | 124128668 | March 2025 | Roguewood (7DRL), Sails + Tiny Pubs updates, style collections for MFCG and PS expanded (with an idea to expose them inside the generators). Announces intent to add **map export and import** to PS and to research existing hex-map formats. "Ideas for two new generators" — one of these becomes Urban Places. |
| 53 | 2025-08-08 | 136013772 | **WIP: Urban Places** | New generator to replace NG. Claimed advantages of its approach: diverse content (water, fortifications) drops in naturally; an **editor** to mark blocks/water is easy; **warp tools** apply. Initial release to add trees (in-block and as groves/parks), squares, a way to request area features (river, coast, major crossroads), light visual niceties. Later: plan editor, warp tool, non-rectangular buildings, fortifications/ponds/fields/large walled buildings/railroads, "3D". **Image #4 is the only published picture of the base mesh.** |
| 54 | 2025-08-29 | 137631332 | ⛲️Urban Places 1.0 | Hotkey-only, no UI. Planned: menus/dialogs, SVG + **JSON export specifically so places can be viewed in City Viewer**, shaded roofs and more detailed roads/trees. |
| 55 | 2025-09-04 | 138099329 | ⛲️UP 1.1.0 | Context-menu UI; **JSON export for City Viewer or your own tools**; SVG export; small `Tags` dialog (river, coast); `Style` dialog with save; **"Once the map is created, the base mesh is 'fixed' in a number of ways… for example, rivers now tend to be more uniform in width."** Next-update candidates named and ranked: city walls (most interesting), farm fields (easiest), large buildings. Also names the geometry gap: *all* streets are curvilinear; wants occasional honest straight roads and right angles. |
| 56 | 2025-09-23 | 139540343 | ⛲️UP 1.1.1: ramparts | **Rectangle constraint on the place extent removed** (it was a debugging artefact) → organic blob shapes, less jagged borders. **Rivers constant width**, width varies more between maps; **multiple bridges, each correctly perpendicular to flow**. Squares get more right angles + a **fountain at the square's "nexus"**. **`RIGID`** tag: 90° turns where arcs would otherwise be, longer roads straightened. **`WALL`** tag: the place is divided in two by a city wall — "implementing this turned out to be much harder than I could expect. There's nothing special about the algorithms, but for a long time, all the results looked wrong". **`STREET`** tag: one long street across the whole map. Blocks spawned more evenly and more regularly shaped; coasts more diverse (promontories); `Paving` option; `Shading` for roofs and trees (simpler than VG's); all settings persisted. |
| 57 | 2025-10-15 | 141198168 | WIP: new buildings in ⛲️UP | **The new building-placement method.** Old method = VG-style rectangles at slightly varying distances along a street; the residual gaps become obvious where a street bends, so no streetwall forms and the place doesn't read as urban. New method places buildings **wall-to-wall along curved streets**; some come out not exactly rectangular. **"Initially I tried the 'twisted bisection' method, which is used in MFCG. This method has some issues and here they were too obvious (more obvious than in the city generator)."** Right angles look better → will be made more common. Non-rectangular buildings may force a switch to **straight-skeleton roofs**. Detached houses preserved as a rare "semi-rural" block type. |
| 58 | 2025-10-23 | 141879891 | ⛲️UP 1.2.0: place names and new buildings | Two block types shipped: **urban blocks (tight new buildings) and rarer semi-rural blocks (detached old-style houses)**. Complex shapes from the new algorithm still unsolved — "almost rectangles will do". Place names (motivation: naming makes a generated object less disposable; also fixes ugly export filenames). Mobile menu button. `Night` preset gains **hard-edged city lights** (deliberately unlike VG/NG). Grid: Hidden / Regular / **Mesh**; regular grid ≈ **25 metres**. Shaded trees slightly more 3-D. Next: piers, ships, deeper water, islands, block-sized large buildings. |
| 59 | 2025-12-01 | 144816210 | Hair | PROCJAM 2025. Two-stage: (1) **average head described by numeric parameters, perturbed slightly**; (2) **hair grown with a particle system with random parameters**. Also: progress on a Fantasy Manor remake was folded into Dwellings as nicer roofs. |
| 60 | 2025-12-16 | 145997186 | ⛲️UP 1.2.1: permalinks | Permalinks (same scheme as the other generators). **Hexagonal grid** option; grid cell size customisable in metres, shared by square and hex grids, not persisted. Renaming (the **only** editable property of a place) and it is stored in the permalink. **"Place plate"** title block gains a **scale bar**. `Dashed` roads added to Hidden/Simple/Paved. B&W preset made truly black and white. Gradient-less street lights reverted to soft VG-style lights. Fountains in squares replaced with **"monuments"** (human figures were too small at map scale → sets of simple shapes). |
| 61 | 2026-01-30 | 149496680 | ☠️PS 1.7.3: farmlands | **Farmlands**: "Every cell with a settlement (and a few empty adjacent cells for towns and cities) I cover with tiny fields, each being just a few parallel strokes for furrows." Biome colours (swamp, desert) as extra values of multi-colour `Earth`. Multi-colour light/dark woods (area fills always use value #1, so the effect shows mainly with `Individual trees`). **`Outline` parameter**: every object is outlined with a *mix* of `Linework` and the object's own colour; the parameter is the mix weight; <1 is softer. `Full colour` preset. Light/dark forests spawned "less chaotically"; dead trees much sparser; front trees lose their own shadows; edge trees smaller. |
| 62 | 2026-04-02 | 154598538 | Roguewood again | Colour-scheme inversion + minor gameplay tweaks. No map technique. |
| 63 | 2026-07-21 | 164387414 | ☠️PS 2.0.0-preview: JSON import | Paywalled teaser, one blurred screenshot. The **context menu is partly legible** and shows a restructured PS menu: `Parameters…`, **`Blueprint…`**, `Rotate ▸`, `Style…`, `Details…`, `Grid…`, `Labels ▸`, `Elements ▸`, **`Import`**, `Export as ▸`. |
| 64 | 2026-08-01 | 165462094 | Sails, Lighthouses, Runes | Minor-generator round-up. **Urban Places named "a candidate for Arcana"**. Next city-related work will be MFCG *or* UP. Comment asks about a river-delta MFCG option (previously mentioned by watabou, still unbuilt). |

---

## 2. Techniques

### T1 — Twisted bisection of polygons **with holes**
**Source:** 70917627 (NG 1.2.0). **Feeds: MFCG (target), NG (test-bed); UP tried and rejected it (141198168).**
**Tag: [STATED]** for the existence, limitation and destination; **[INFERRED]** for the algorithm body.

*Problem.* The recursive-bisection-with-a-bend primitive (defined in the older post 49191011, outside this
slice) cut only **simple** polygons. A block that contains a hole — a courtyard, a ring road's inner void, a
central square, a keep — could not be subdivided. In NG this was routable around; "for MFCG it was a more
serious limitation".

*Algorithm, as far as recoverable.* Recursive bisection with a bend: pick a cut through the polygon, bend it
once somewhere in the middle so that it meets both boundary edges **at right angles**, split, recurse until
a stopping predicate (piece small enough). The generalisation must additionally: (a) detect when a candidate
cut crosses a hole, (b) route the cut *around* or *into* the hole so that the two resulting pieces remain
valid polygons — a cut that touches a hole either converts the annulus into a simply-connected polygon (a
"slit") or must be rejected. **[INFERRED]** the ring-template evidence (image 05) is consistent with the
*slit* interpretation: the ring between two concentric roads is opened by radial cuts and then subdivided
normally, and the resulting lots are deep, narrow, and everywhere perpendicular to the ring road.

*Parameters mentioned.* None numerically. Stopping condition is "pieces small enough"; NG's block/lot sizes
come from the per-neighbourhood knobs in T23.

*Failure modes.* "The new version of the algorithm is still pretty glitchy, but it works." In UP the same
primitive's artefacts were "too obvious (more obvious than in the city generator)" and it was abandoned for
building placement (T25f).

*Changed vs. previous.* Simple polygons → polygons with holes; announced as transplantable into MFCG.

*UNKNOWN for a re-implementer.* Where the bend point is chosen along the cut; how the cut's two endpoints
are chosen (longest-edge? area-balancing? random weighted?); the perpendicularity constraint's tolerance;
the aspect-ratio/area stopping thresholds; how holes are handled (slit vs. reject vs. ring-decomposition);
what the "glitches" actually are.

---

### T2 — Ring template (concentric ring roads)
**Source:** 70917627 (introduced), 99067664 (mature examples), 145997186 image 01/03 (radial variant).
**Feeds: NG; conceptually UP's street templates.** **Tag: [STATED]** for the rule, **[SHOWN]** for geometry.

*Problem.* NG's organic templates all looked like the same organic thing; a planned-looking layout was
wanted, and a hole-bearing block was needed to exercise T1.

*Algorithm.* "Neighbourhoods of this type contain one or more concentric ring roads. **If the smallest ring
is too small to be cut into blocks, a square, a grove or a single large building is placed there
instead.**" That degenerate-centre fallback is the only explicitly stated rule and it is a clean, copyable
pattern: *try to subdivide; if the piece fails a minimum-size test, substitute a content object.*

*Shown geometry* (70917627 images 01/05, 99067664 images 01/03): 3–5 concentric rings, approximately
circular but not perfectly so; radial streets connect adjacent rings and do **not** all run to the centre —
they are staggered between rings, so each annulus is cut into a different number of sectors. Each sector is
filled with lots facing the ring road, houses abutting one another, tree-filled interiors. The central
plaza in the examples holds a large building with a hip roof drawn as an X (straight-skeleton ridges) or a
dome.

*UNKNOWN.* Ring count distribution; ring spacing law (constant? geometric?); how far the rings are perturbed
from circles; how radial streets are placed and whether they are staggered deliberately; the numeric
"too small to be cut" threshold.

---

### T3 — Straight skeletons (own algorithm)
**Source:** 101173551. **Feeds: MFCG (roof ridges), NG (compared against fake gables), potentially UP
(141198168), potentially label placement (T6) and island mountain ridges (T7).**
**Tag: [STATED]** for existence, complexity, purpose and failure; **[INFERRED]** for the algorithm body.

*Problem.* Given a building footprint polygon, produce the ridge lines of a hip roof. More generally, produce
a "medial twig" of any polygon.

*Creator's own definition.* "If you take a polygon and start to *dehydrate* it, it will gradually get
thinner, but its overall dimensions will remain the same. The twig-like thing that remains in the end is the
straight skeleton." This is the standard **inward-offset / wavefront** characterisation: shrink every edge
inward at unit speed along its normal; vertices trace the skeleton's arcs; the process terminates in edge
events (an edge shrinks to zero) and split events (a reflex vertex hits an opposite edge).

*Implementation facts.* Home-grown ("it's easier to come up with my own algorithm than deciphering academic
papers or someone else's code"); **O(n²)**, which he explicitly says "is fine for my use cases"; possibly not
novel; **"it glitches in special cases and I hate dealing with special cases"**. The O(n²) bound is the
signature of a naive wavefront loop: at each step, compute all candidate events (O(n) per vertex against
O(n) edges is O(n²) once, or O(n) events × O(n) rescan), take the earliest, apply it, repeat. A
re-implementer should assume a straightforward event-loop, not a priority-queue-with-kinetic-triangulation
implementation.

*Image evidence* (images 01/05, three panels): panel 1 = input simple polygon, ~12 vertices, at least one
reflex notch. Panel 2 = the skeleton in **red** plus a dense family of **thin black lines inside each face,
each parallel to that face's defining edge** — i.e. the successive inward offsets, drawn as literal proof of
the dehydration definition; each roof facet is therefore the region swept by one edge. Panel 3 = a 3-D
render of the resulting roof, each facet shaded differently, with a valley at the reflex vertex. Height is
proportional to distance from the boundary (constant-pitch roof).

*Named failure modes.* Glitches on special cases (unspecified; standard culprits are parallel/collinear
edges, simultaneous events, and symmetric polygons where several events coincide). Visual failure modes in
use are separate and stated: on **small** MFCG maps ridges make imperfections in building shapes more
visible; on **large** maps all the ridge detail blends into noise; the sweet spot is **medium-sized city
maps**.

*UNKNOWN.* Whether holes are supported (nothing says so; hip roofs rarely need them); whether the skeleton
carries the time/height value per node (needed for 3-D and for T6); how the special cases are worked around
(retry with jitter? discard the building? fall back to a simple ridge?).

---

### T4 — Modified straight skeleton for **gable** ridges
**Source:** 101173551 (text + images 03/07). **Feeds: MFCG.** **Tag: [STATED]** (existence and constraint),
**[SHOWN]** (appearance), **[INFERRED]** (mechanism).

*Problem.* A pure straight skeleton yields a hip roof. Medieval buildings are more often gabled: a single
ridge with two slopes and vertical gable ends.

*Stated.* "The second image is generated using a **modified algorithm** to produce ridges of gable roofs.
Unfortunately, this modified algorithm works well only with 'clean' shapes, so maybe I'll reserve it for
such **grid-based buildings as donjons, temples and farm houses**."

*Shown.* In image 07 most footprints carry one long central ridge with short rafter strokes running
perpendicular from ridge to eave on both sides; a handful of larger/irregular footprints still show hip
(X/Y) skeletons. The citadel keep is a plus/cross-shaped footprint with a branching ridge.

*[INFERRED] mechanism.* The standard trick is to mark the two **short end edges as gables** — i.e. exclude
them from the wavefront (give them zero speed, or delete them and let the two long edges propagate until
they meet). The result is a skeleton degenerated into a single spine. This works only when the polygon has a
clear long axis and near-parallel long edges — exactly "clean shapes" — and degenerates unpredictably on
irregular footprints, which matches the stated limitation.

*Policy implication for a re-implementer:* choose roof type **per building class**, not per shape: grid-aligned
institutional buildings (donjon, temple, farm house) get gables; organically-shaped lot buildings get hips.

*UNKNOWN.* Which edges are selected as gable ends (longest pair? the pair perpendicular to the OBB long
axis?); the "cleanliness" test that decides whether a shape qualifies.

---

### T5 — NG's "fake" gable roofs (preferred over correct hips)
**Source:** 101173551 text + image 04/08; 70917627 ("roofs are drawn a bit differently now, with more
pronounced ridges"). **Feeds: NG, and by inheritance UP's simple ridge style.** **Tag: [STATED]** for the
preference, **[SHOWN]** for the drawing.

*Stated.* "The current version of NG draws **'fake' gable roofs, and for my eye they look better than
mathematically correct hip roofs.**"

*Shown.* Each building is drawn as two trapezoidal slopes meeting at a straight ridge along the footprint's
long axis, with the left/upper slope lighter and the right/lower slope darker (a fixed light direction),
plus optional hatching strokes running down-slope. No attempt to resolve the roof for a non-convex footprint.

*This is the single most quotable design ruling in the slice:* the geometrically correct solution was built,
compared, and **rejected on aesthetics** for one generator while being kept for another. A re-implementer
should treat "hip skeleton vs. fake gable" as a **style parameter**, not a correctness question.

*UNKNOWN.* How the ridge axis is chosen for a non-rectangular footprint (OBB long axis is the obvious guess);
the eave-overhang amount.

---

### T6 — Straight skeletons as label spines (curvilinear labels)
**Source:** 101173551 (idea), 109092851 (shipped "curved labels" + their failure modes), images 109092851
01/04. **Feeds: PS; MFCG's arced labels are the predecessor.** **Tag: [STATED]** for the idea and the
shipped feature's behaviour; **[INFERRED]** for the link between the two.

*Stated (101173551).* "I can also try using them to draw nicer curvilinear map labels similar to the ones in
Azgaar's Fantasy Map Generator. The 'arced' labels in MFCG and PS are not great, but replacing them is not
my top priority atm."

*Stated (109092851, four months later).* "In addition to *straight* and *arched* labels, there are now
*curved* labels as well. Unlike arched labels, they can **bend more freely and follow the shape of the area
they're labelling more accurately**." Three failure modes, all stated:
1. **"My algorithm doesn't take holes into account."** A village inside a forest will be overlapped by the
   forest's label. "I expect this to be quite difficult to fix." → the spine is computed from the area's
   **outer boundary only**.
2. "Sometimes they curve too wildly. **I can smooth and straighten their shapes, but it would make them look
   too much like arched or even straight labels**, so for now I'm going to refrain."
3. "Sometimes (rarely) they are simply drawn incorrectly."

*[INFERRED] that curved labels are skeleton-driven.* Timing (four months after the skeleton post, which
names exactly this use), the "follows the shape accurately" description, the hole-blindness (a straight
skeleton of a polygon with holes is a materially harder object — consistent with "difficult to fix"), and
the wild-curvature failure (a skeleton branch on a lumpy coastline oscillates) all fit. **Image evidence:**
"Woodland Of Amran" tracks the long sinuous axis of an irregular forest; "Lightwoods" runs down a narrow
strip exactly along its centreline; "Ter's Marshes" curves into a tapering peninsula. These are medial-axis
paths, not circular arcs. Confidence: moderate-high, but it is an inference, not a statement.

*Rendering.* Glyphs are individually rotated to the local tangent and letter-spaced generously; a white halo
(outline) is drawn behind the glyphs so they read over any fill (visible in every PS image).

*UNKNOWN.* How the longest/most central skeleton branch is selected; how the spine is trimmed to the text's
measured length; how font size is chosen relative to area size; how the spine is smoothed (the post says
smoothing is *available* and deliberately not applied); whether the text is fitted by arc-length
parameterisation or by per-glyph advance along the polyline.

---

### T7 — Straight skeletons for mountain ridges from a landmass polygon
**Source:** 101173551. **Feeds: a hypothetical future island generator; relevant to PS's `highland` ridges.**
**Tag: [NAMED-ONLY].**

"Another idea is to use straight skeletons to build mountain ridges with the shape of an island/continent as
the source polygon. If I ever decide to make another island generator, this method would be interesting to
try." No method beyond the idea. Note it is the natural dual of the roof case: the skeleton is the crest, the
distance-from-coast is the elevation.

---

### T8 — Area-label placement: simplified polygon → oriented bounding box → axis
**Source:** 77490818, especially the published **debug image** (images 03/06). **Feeds: PS explicitly by
"reusing as much code from MFCG as possible", so MFCG too.** **Tag: [SHOWN]** (the debug overlay),
**[STATED]** (the MFCG-reuse and simplicity policy), **[INFERRED]** (the reading of the overlay).

*Stated.* "Labels placing is a big topic and area labels placing is the biggest part of it… I intend to keep
this as simple as possible, which means **reusing as much code from MFCG as possible**. Implementing something
fancier is not off the table, but for now I keep tinkering with my home-brew 'arced' labels. It's not that
they perform great, it just doesn't look like any more advanced algorithm I am aware of would perform much
better here."

*What the debug view shows,* per named area (Long Forest, Kazgarjhak Forest, Chaos Woods, Downs of Sword,
Thicket of Crest, Reonwoods), each in its own colour:
1. A **simplified boundary polygon** — a low-vertex-count (≈8–14) outline of the area, clearly a
   decimated/hull-ish version of the true cell-union boundary, not the boundary itself.
2. A **rotated rectangle** (oriented bounding box) aligned with the area's long axis.
3. A **long thin axis line through the box**, with a **small circle at the centre** (anchor/pivot) and in some
   cases a second perpendicular line through the same centre (the box's two principal axes).
4. **Small square markers at the extremes** of the axis, and axis lines that extend well beyond the area
   (clipped infinite lines, or the shared axis of a multi-part area).

*[INFERRED] pipeline:* collect the area's constituent cells → union → simplify the outline → compute an OBB
(principal-component or rotating-calipers minimum-area rectangle) → take its long axis as the label baseline
→ for an *arced* label, bow that baseline into a circular arc (the arc's sagitta presumably chosen from the
area's shape or a random/heuristic amount) → set the glyphs along it with individual rotation → collision-test
against other labels and features.

*Failure modes visible/stated.* Hitboxes are being debugged because collisions were the problem; a commenter
("Dustin Freeman") notes he abandoned the same problem himself, and watabou answers nothing about the method.
The compass rose collides with labels (T9).

*UNKNOWN.* Simplification algorithm and tolerance (Douglas–Peucker? convex hull? a fixed vertex budget?);
OBB method; the arc's curvature rule; the collision resolution strategy (reject, shrink, move, drop label?);
whether a label may be split across lines.

---

### T9 — Compass-rose auto-placement
**Source:** 68936414 (v1), 77490818 (the stated defect and the fix direction). **Feeds: PS; MFCG has a
simpler rose.** **Tag: [STATED].**

*v1 rule (68936414).* "On each map the location of the rose is chosen to **block out as few map details as
possible, preferably away from the centre**, but **the shape of the legend is not taken into account**. As a
result, when both of them are displayed, they more often overlap each other than they don't."

*Stated defect and planned fix (77490818).* "In the current version, the compass is placed to overlap as few
**map features** as possible. I'll need to remake it to overlap as few **labels** as possible. Or maybe it
would be easier to implement manual placing." Plus: add scale and rotation controls.

*So the objective function is explicit and copyable:* minimise occluded content, with a bias away from the
map centre; the open design question watabou himself poses is *which* content counts (features vs. labels).
Other roses' properties: rerollable design (`shift`+click or context menu), mouse-wheel rotation, and
stylistically uniform regardless of reroll ("don't expect much variety — stylistically they all are
identical"). Self-critique worth recording: "for these maps they are probably too modern or… formal?
Perhaps something fancier or simpler (e.g. an arrow) would be more appropriate."

---

### T10 — Deleting the legend in favour of in-map toponyms
**Source:** 68936414. **Feeds: PS; contrast with MFCG.** **Tag: [STATED]** (intent + rationale).

"Unlike city maps where **the important stuff is almost always in the centre**, on regional maps the legend
is hard to place well. The idea is to show all the names as regular map labels — after all, that's how it is
usually done on real maps."

This is the causal chain for the whole 2023 label programme: kill the legend → every name becomes a placed
label → area-label placement becomes the hard problem (T8) → the naming system's weakness becomes visible
(T11) → the compass must avoid labels (T9). A re-implementer building a legend-less map must budget for all
four.

---

### T11 — Naming: the "conlang" plan
**Source:** 77490818. **Tag: [NAMED-ONLY].**

"I like how maps look when they are filled with toponyms, but the toponyms themselves… they are pretty
terrible. The more names there are, the more obvious it gets. **Why they are terrible and why the
straightforward way of fixing it by extending the vocabulary and the rules doesn't help is a topic for
another post.** What I will try to do instead is to create a new naming system based on a concept of **naming
language**." Both systems to coexist as `legacy` and `conlang`. No method. The diagnosis — that a bigger
word list makes a generator *worse*, not better, once name density is high — is the transferable insight.
(See also 141879891: naming a generated object "makes it more meaningful and less disposable".)

---

### T12 — "Hollow" rivers
**Source:** 68936414. **Feeds: PS.** **Tag: [STATED].**

*Problem.* Rivers drawn as thick wavy solid strokes read as lines, not water.
*Method.* Draw the river as an **outlined wavy shape filled with the "shallow" colour** instead of a stroked
path. Default on. New numeric style parameter **`Rivers` on the Strokes tab** = river width/thickness;
applies to both modes but "makes more sense for hollow rivers". Known bug flagged in-post: there are now two
`rivers` parameters, one on the Water tab and one on the Strokes tab.
*[INFERRED]* the hollow river is the stroked centreline converted to a polygon (offset ±w/2) and then filled,
which is also the natural representation for a constant-width river — compare UP's later constant-width
rivers (T25d).

---

### T13 — Coastal contour lines and waves
**Source:** 68936414; visible in almost every PS image. **Feeds: PS.** **Tag: [STATED] + [SHOWN].**

*Stated.* Contour lines are now drawn around **small sea rocks** as well as real islands ("that's much more
noticeable than one would expect"). "Contour lines between close land areas overlap more correctly." New
`Waves` colour parameter exists mainly to allow **light contour lines over dark water** (the `Cartoon` preset).
*Shown.* 3–7 concentric offsets of the coastline, spacing increasing outward, each thinner/fainter than the
last; in some styles they are replaced or supplemented by a soft white glow (109092851 image 01/04) or a
wave-hatch band. Where two land masses are close, the offsets merge/clip rather than crossing.
*[INFERRED]* successive **polygon offsetting** of the coast polygon with clipping against other land, which is
exactly what "overlap more correctly" implies was fixed.

---

### T14 — Mountain rendering: radial gradient, rounded bases, thick silhouettes
**Source:** 68936414. **Feeds: PS.** **Tag: [STATED].**
"Mountain silhouettes are drawn in thick strokes to give them the same level of prominence as coastlines. If
the 'mountain' colour is different from the 'earth' colour, it is applied as a **radial gradient (vs. linear
as it used to be)** to make individual mountains look more like **solid objects, less like billboards**. For
the same purpose the bottom part of rugged mountains made rounder." A precise, copyable note: linear
gradients read as flat cards; radial gradients read as volumes.

---

### T15 — Forest "blobs" / clouds and `cluster scale`
**Source:** 68936414; 149496680 (later tuning); shown in nearly every PS image. **Feeds: PS; VG's tree
clusters are cousins.** **Tag: [STATED]** (partially — he explicitly declines to explain), **[SHOWN]**.

*Stated.* "Forest 'blobs' (or 'clouds') are reworked and now they look better. Yeah, I know it sounds…
nebulous? **One of the few changes I am capable to describe without going into technical details is that they
now respond to the `cluster scale` parameter.** So if you want your forests fluffier, try higher values. If
woods start looking silly, try lower values." Also: light (deciduous) trees made wider, dark (fir) trees made
taller, hatching on both reduced "to make it all less noisy".
*Later (149496680).* "Light and dark forests are spawned **less chaotically** now." "**Dead trees are placed
much less densely** than light and dark ones." "Front trees are drawn more neatly **without their own
shadows**." "Edge trees are drawn slightly smaller."
*Shown.* A forest area is a filled polygon whose **outline is scalloped by the canopies of the trees on its
edge** (edge trees), with individual tree sprites scattered inside; the silhouette reads as a cloud. Fir
forests use a sawtooth edge (triangular canopies), deciduous a bumpy edge (round canopies).
*The three-class tree taxonomy is explicit and worth copying:* **area fill**, **edge trees** (define the
silhouette, drawn smaller), **front trees** (drawn over the fill, no own shadow), plus **individual trees**
as a toggle and **dead trees** as a sparse fourth class.
*UNKNOWN.* What `cluster scale` scales (canopy radius? cluster radius? Poisson-disc spacing? noise
frequency?); the blob construction (metaballs? union of disks? noise-warped polygon?). He deliberately
withholds this.

---

### T16 — Town icons: pseudo-bird-view by baseline offset
**Source:** 68936414; 109092851 (outlining); icons visible in 149496680. **Feeds: PS.** **Tag: [STATED].**

"I limited myself to making the icons a bit more **'bird-view'-style by shifting some of icon's buildings
below the baseline**. Surprisingly, it worked, **despite the fact that images of separate buildings are still
strictly side-view.**" A cheap, high-leverage trick: side-view sprites + vertical offsetting reads as
oblique/aerial. Also: `Details > Towns > Random icons` rerolls the "architectural style" of all towns at once
— a feature that was originally automatic per-map and **removed because the effect was "too underwhelming"**,
then resurrected as a user action. 109092851: icons "more boldly outlined now to make them more prominent",
toggleable via `Details > Towns > Outline`.

---

### T17 — Grid policy (regional maps)
**Source:** 68936414. **Feeds: PS.** **Tag: [STATED].**
Hex numbers and the grid lines are now drawn in **the same colour**, chosen between "black" (the style's
linework, so the grid blends) and a separate colour (so it doesn't, e.g. a blue grid over a B&W map).
`Grid > Ocean tiles` can be disabled — "usually in games all the action happens on land", so hiding the grid
over water makes the map cleaner while keeping it where it is needed. Compare UP (T25k): grid Hidden /
Regular / Mesh / Hex, cell size in metres, regular ≈ 25 m.

---

### T18 — Recursive-bisection floor plans with corridor merging
**Source:** 86093774 (+ the older 49191011 lineage). **Feeds: Dark Clues, Dwellings; the same primitive
family as MFCG's block→lot subdivision.** **Tag: [STATED]** for the changes, **[SHOWN]** for the output.

*History.* Invented ~early 2022 ("one and a half years ago") for **Procgen Mansion**, judged "not good
enough to bother with mansion", shipped instead in the game **Dark Clues**, where "it performed well,
producing a reasonably maze-y mix of rooms and corridors". Revived in 2023 "to see if I can improve it for
using… somewhere else", with no destination — he asks readers for ideas.

*What changed in v2.* "A number of tweaks were made to **how the original shape is bisected** and **how the
doors are placed**. Not the biggest, but **the most noticeable change is that the corridors are now get
merged together where it's possible to avoid spawning unnecessary doorways.**" Corridor merging as a
post-pass over a bisection partition is the single most transferable idea here.

*Shown* (images 01/04, 02/05, 03/06): the input is a **rectilinear** outline (a union of axis-aligned
rectangles, sometimes very chaotic); the partition produces **strictly rectangular rooms** when so
constrained; long thin corridor slots thread between them; walls are thick black; doors are white gaps in
shared walls; windows are small double-tick slots in exterior walls only; stairs are hatched rectangles,
sometimes protruding outside the footprint; a fine **dotted unit grid** underlies everything (so the geometry
is snapped to a lattice); small plans (image 03/06, a 3×3 sampler) read far better than large ones.

*Stated failure mode.* "While the method is capable of generating fairly large layouts, **small ones look
much better**" — the large test is described by the author as "an ugly result".

*UNKNOWN.* The bisection cut rule (axis-aligned only? area balance? aspect-ratio guard?); the recursion stop;
which cells become corridors vs. rooms and when (before or after bisection); the merge predicate for
corridors; door placement rule; the lattice pitch.

---

### T19 — Multi-colour style parameters
**Source:** 70917627 (introduced in NG), 149496680 (extended in PS). **Feeds: NG, PS, VG, UP.**
**Tag: [STATED].**

"A new type of parameters is now supported in the `Style` dialog: **multi-colour**. It allows you to assign
more than one colour to a specific type of elements. When individual elements of that type are drawn, **a
random colour from the list is chosen**. For example, picking red and yellow as tree colours results in much
nicer autumn images than picking any single colour."

PS 1.7.3 adds two refinements: (a) **biome colours** ride on the same mechanism — swamp and desert are
*additional values* of the multi-colour `Earth` parameter rather than new parameters; (b) **"Forest areas are
always painted using the first value of the respective multi-colour parameters"**, so the multi-colour effect
is only strongly visible when `Individual trees` is on. That fallback rule (index 0 = the canonical colour for
aggregate fills, random pick for individual sprites) is precise and copyable.

---

### T20 — The `Outline` parameter: per-object outline colour as a mix
**Source:** 149496680, with a published before/after comparison (images 02/05). **Feeds: PS; the idea is
generator-agnostic.** **Tag: [STATED] + [SHOWN].**

*Problem.* Outlining everything in a single `Linework` colour (usually black) makes a colourful map harsh.
*Method.* "In this version, **each object is outlined with a colour that is the mixture of `Linework` and the
colour of the object itself**. For example, if the trees are green, they are outlined with a dark green
colour. If two different trees are different colours, they're also outlined with different colours. The
`Outline` parameter (`Style > Basic > Outline`) **controls how much of the `Linework` colour is mixed with the
object colour**. Using values less than 1 produces softer and (usually) more pleasing results."
So: `stroke = lerp(objectColour, linework, outlineParam)`, with `outlineParam = 1` reproducing the old
behaviour. The comparison image confirms it: at 1.0 the coast, hatch strokes, tree outlines and mountain
lines are all pure black; below 1.0 each becomes a darkened version of its own fill.

---

### T21 — Farmlands as per-cell furrow strokes
**Source:** 149496680 (+ image 01/04). **Feeds: PS; MFCG has its own field system with fan-arranged hatch
stripes, visible in 101173551 images 02/06 and 106975409 image 01.** **Tag: [STATED] + [SHOWN].**

*Stated rule, verbatim in method form:* "**Every cell with a settlement (and a few empty adjacent cells for
towns and cities) I cover with tiny fields, each being just a few parallel strokes for furrows.**"
So: the unit of placement is the **hex/map cell**; the trigger is *settlement present*; the radius scales with
settlement rank (village = own cell; town/city = own cell + a few adjacent empties).
*Stated design judgement:* "these simple details make a map look **busier, but not noisier**, which is a good
thing." And the prior position, which he reversed: "farm fields are simply not interesting or important in the
context of fantasy maps"; he only tried it because he had promised someone.
*Shown.* Each field is ~5–8 short parallel strokes; adjacent fields alternate orientation (horizontal /
vertical / diagonal) producing a patchwork quilt; fields are small relative to the hex and are scattered, not
tiling it. MFCG's equivalent (different technique) is larger, fan-arranged stripe groups radiating outward
from the town, outside the wall.
*UNKNOWN.* Field count per cell; stroke count/length/spacing; orientation selection; whether fields avoid
forest/water within the cell (they appear to).

---

### T22 — Fjords (`fjord` tag) and fractal coastlines
**Source:** 109092851 (+ images 02/03). **Feeds: PS.** **Tag: [STATED].**

*Stated, including the failed first attempt:* "Initially I thought that simply **'inverting' a peninsula**
would be enough, but that didn't look right. So I had to make fjords **narrower, occasionally branching, and
with more pointed 'tips'**." Combine with `highland` to "spawn mountain ridges along the coastline". The same
tag also yields narrow lakes.
Separately: "**Coastlines are made more fractal-like.** It is hardly noticeable when the `Rugged` option is
unchecked, but clearly visible otherwise." So coastline roughness is a two-level system: a base coastline plus
a `Rugged`-gated subdivision/fractalisation pass.
*Shown.* The fjord map's water is a long branching inlet with 5–6 concentric contour offsets, mountain
clusters lining both shores, and the compass placed in the water with radiating rhumb lines.

---

### T23 — Urban Places: the base mesh (the core new architecture)
**Source:** 136013772 image 04/08 ("I wanted also to describe briefly **how this works**, but here is an image
instead"), 138099329, 139540343, 141879891. **Feeds: UP; it is the explicit successor architecture to NG,
and watabou frames MFCG as the owner of the "fill an area with blocks" problem (106975409).**
**Tag: [SHOWN] + [INFERRED]**, with several [STATED] corroborations.

This is the highest-value reconstruction in the slice, because watabou substituted an image for the
explanation and then corroborated the data structure piecemeal across four later posts.

**What the image shows (136013772 image 08, full resolution).** Under the finished map lies a **planar,
quad-dominant irregular mesh** of cells — mostly 4-sided, some 5-sided, roughly equal in area, with straight
edges and gently varying orientation, covering an area **larger than the place itself** (mesh lines continue
out past the green blob into the empty background). The **streets run along chains of mesh edges** and are
rendered as smooth curves with **filleted corners** where the underlying edge chain kinks. Cells not touched
by a street stay empty. Buildings line the streets on both sides.

**Corroborations that the mesh is a first-class persistent structure, not scaffolding:**
- 141879891: the `Grid` submenu offers `Hidden` / `Regular` / **`Mesh`** — the mesh is a *displayable layer*.
- 138099329: "**Once the map is created, the base mesh is 'fixed' in a number of ways** to produce a more
  (subjectively) correct result. For example, **rivers now tend to be more uniform in width**." A river whose
  width is a property of the underlying cells is a river made of cells; "fixing the mesh" then means moving
  vertices to regularise it. This is decisive evidence that **water is mesh-borne**.
- 136013772: "More diverse content (e.g. water, fortifications) can be added naturally" and "an **editor** (to
  mark blocks, water areas etc.) can be implemented relatively easily" — i.e. content is an **attribute
  painted onto cells**.
- 136013772: "The concept of the **warp tools** is also applicable here" — warping is a vertex-space
  operation on the mesh.

**[INFERRED] pipeline**, consistent with everything above and with every image in posts 53–60:
1. Build an irregular quad-dominant mesh over a region larger than the target place. (Construction method
   unknown; a jittered/relaxed quad grid fits the images better than a Voronoi diagram — cells are
   predominantly 4-sided with roughly parallel opposite edges, which Voronoi cells are not.)
2. Choose a connected set of cells as the **place extent** — drawn in the images as a pale blob with a
   scalloped/softened outline. Before 1.1.1 this was additionally **clipped to a rotated rectangle** (drawn as
   the red dashed rectangle in the WIP images) — confirmed as a debugging artefact and removed.
3. Mark cells (or cell chains) as content: **water** — a lake/coast is a cell region, a **river is a chain of
   cells** (in 136013772 image 07 the river is visibly two straight quads meeting at the crossroads, which is
   exactly why pre-1.1.0 widths varied).
4. **Fix the mesh**: relax/snap vertices so marked features are regular (uniform river width, more evenly
   spread and more regular blocks — 139540343: "City blocks are now spawned more evenly across the map and
   (mostly) have a more regular shape").
5. Select a **sub-network of mesh edges** as the street network; smooth each street polyline into a curve,
   filleting junctions. `RIGID` replaces fillets with hard 90° turns and straightens long runs; `STREET`
   forces one long cross-map run.
6. Cells bounded by streets are **blocks**; blocks are typed (urban / semi-rural / square / grove).
7. Place buildings along street frontages (T24), trees in and between blocks, bridges where a street crosses a
   river cell (each oriented perpendicular to flow), a wall along a chain of edges for `WALL`.

*Why this matters for a re-implementer:* the mesh is the reason UP can add water, walls, squares, parks and a
future editor "naturally", where NG (an area-filling subdivider) could not. It is a fundamentally different
architecture from MFCG's Voronoi-wards-then-bisected-blocks and from VG's roads-then-houses.

*UNKNOWN.* Mesh construction (jittered grid + Lloyd relaxation? conformal quad meshing? something bespoke);
cell size; how the place extent is chosen; the street sub-network selection rule (spanning tree? random walk?
weighted by cell adjacency?); the smoothing/fillet method (Chaikin? circular arcs? Catmull-Rom?); the "fixing"
operations; how the blob outline is softened.

---

### T24 — Urban Places: the new building method (streetwall from a frontage band)
**Source:** 141198168 (the WIP explanation, with the rejection of twisted bisection), 141879891 (shipped),
images 141198168 01/03 and 02/04, 141879891 01/03, 145997186 02/04. **Feeds: UP; the failure diagnosis
applies directly to VG and NG.** **Tag: [STATED]** (problem, comparison, constraint), **[SHOWN]** (geometry),
**[INFERRED]** (construction).

*Problem, stated precisely.* "The old method places rectangular houses at **slightly varying distances from
each other along a street** (similarly to Village Generator). Even when these distances are very small
(**they can't be zero**), **gaps are visible where the street turns or bends**. As a result, the old buildings
**fail to form a streetwall**, making the place look not so urban."

*Rejected alternative, stated.* "Initially I tried the **'twisted bisection' method, which is used in MFCG**.
This method has some issues and here they were **too obvious (more obvious than in the city generator)**."

*New method, stated properties.* Places buildings "**much more densely (wall-to-wall in most cases) even along
curved streets**"; "**sometimes they end up being not exactly rectangular**"; "right angles look better, so
I'm going to make them more common"; "I still have to figure out how to **generate more complex shapes** using
the new algorithm, but for now, '**almost rectangles**' will do"; non-rectangular results may force a switch to
**straight-skeleton roofs** because "the current style of drawing them with a single straight ridge is not
always a good fit".

*[INFERRED] construction.* Offset the street centreline by half the road width to obtain the **frontage
polyline**; offset again by a block-depth to obtain the back line; the band between them is the buildable
strip; **cut the strip transversally** at intervals to produce plots. Because the strip follows a curve, the
cuts fan and the plots are trapezoids/wedges rather than rectangles — which is exactly what "not exactly
rectangular" and the **fan of wedge-shaped buildings around the cul-de-sac at the harbour** (141198168 image
01/03, bottom centre) show. Straight runs give near-rectangles; sharp convex bends give wedges; the strip is
clipped against the block interior and against neighbouring streets' strips.

*The glitchy sibling* (141198168 image 02/04, "houses of parallel orientation (glitchy!)"): buildings there
are **thick rectilinear polylines** — L, Z, U and comb shapes of constant width, drawn with a fake extrusion
(a darker offset band on the shaded side). These are stroked paths converted to polygons, not street-derived
strips; the orientation is shared across a block ("parallel orientation") rather than inherited from a street.

*Shipped policy.* Two block types coexist: **urban blocks** with tight new buildings, and **rarer semi-rural
blocks** with the old detached houses — "Together they create a nice variety across the map." Keeping the
old, worse algorithm as a deliberate minority variant is itself a design technique.

*UNKNOWN.* Plot-width distribution; how party walls are decided (always? with occasional alley gaps — gaps
are visible in the images); the block-depth rule; how corner plots are resolved where two strips meet; the
"more complex shapes" he cannot yet generate; how right angles will be made "more common".

---

### T25 — Urban Places: the rest of the content system
**Source:** 137631332, 138099329, 139540343, 141879891, 145997186 + their images.
**Feeds: UP.** All **[STATED]** unless marked.

- **a. Squares.** Implemented before 1.0 but "they don't look good enough yet" (136013772). 1.1.1: "To make
  city squares look more like **planned features rather than random empty spaces**, their shape now includes
  **more right angles**. A **fountain in the 'nexus' of a square** serves the same purpose." 1.2.1: fountains
  replaced by **"monuments"** — "Initially, I wanted to depict them as tiny human figures on pedestals, but
  soon realised **they were too small**, so they ended up looking like sets of simple shapes." *[SHOWN]:* the
  monument is a small circle-in-square glyph; in the B&W style it is a concentric square with corner ticks.
- **b. Rivers.** 1.1.0 mesh-fixing made widths "more uniform"; 1.1.1 made them **constant per map with more
  variation between maps**. **Multiple bridges** can spawn on one river ("although typically there is only
  one"), **all correctly oriented perpendicular to the flow**, drawn with more detail. *[SHOWN]:* bridges are
  short perpendicular bands, sometimes gold/ochre, sometimes a pale double line at night.
- **c. Coasts.** 1.1.1: "more diverse, sometimes they even make a place look like a **promontory**."
  *[SHOWN]:* a shallow band of lighter water hugs the shore, then a beach strip, then the land blob.
- **d. `WALL` tag / ramparts.** "Places created with this tag are **divided into two parts by a city wall**.
  Implementing this turned out to be **much harder than I could expect**. **There's nothing special about the
  algorithms, but for a long time, all the results looked wrong**, and now I can't say I'm happy either."
  *[SHOWN]* (139540343 images 01/03): the wall is a wide grey band with fine perpendicular tick marks along
  both edges (merlons), running across the map on a smooth curve; **square tower bastions at intervals, each
  roofed with an X (a straight-skeleton hip)**; buildings abut it; roads pass through it. In the B&W style
  (145997186 images 02/04) the wall is a double line filled with small square merlons, with square towers
  drawn as square-in-square glyphs. The honest note that the *algorithms* were easy and the *results* were
  wrong is a warning: wall placement is a judgement problem, not a geometry problem.
- **e. `RIGID` tag.** "Makes the generator create **90° turns in places where otherwise it would create smooth
  arcs**. Also it **straightens longer roads** for a more planned/mechanical look. **On average, places without
  this tag look better**, but it can be useful for variety." Confirms fillets/arcs are the default junction
  treatment (T23 step 5).
- **f. `STREET` tag.** "Each of the places created with this tag contains **a longer street running across the
  entire map**. Maybe I should rename the tag *highway*."
- **g. Non-rectangular extent.** 1.1.1: "The generator **no longer attempts to constrain the place to a
  rectangle**, as it did in previous versions. **This was a debugging feature that served no real purpose.**
  Now, places tend to have a more organic, blob-like shape, with less jagged borders." The red dashed rectangle
  in the WIP images is that constraint made visible.
- **h. Trees.** From 136013772's plan: "**both inside the blocks and as separate groves/parks**". *[SHOWN]:*
  groves are dense masses of overlapping scalloped canopies with an internal light/dark two-tone and occasional
  "clearing" marks; block trees are small isolated clusters.
- **i. Roads rendering.** `Hidden` / `Simple` / **`Paved`** ("not as solid lines, but as **paved stripes**";
  also affects squares) / **`Dashed`** (1.2.1, "useful for creating more schematic images"). *[SHOWN]:* paved
  roads are a smooth cream band with a stippled dot border; dashed roads are grey dashes that double as block
  boundaries; **all roads end in a short dotted tail at the map boundary** — the convention for "continues
  off-map".
- **j. Shading.** `Details > Shading` shades roofs and trees — "a much simpler feature than the similar one in
  the Village Generator"; 1.2.0 redraws shaded trees "a little differently now to make them look slightly more
  3D".
- **k. Grid.** `Hidden` (default) / `Regular` / **`Mesh`** (1.2.0); **hexagonal** added in 1.2.1; cell size
  customisable in **metres**, shared between square and hex grids, **not persisted**; the regular grid is
  **~25 metres**. This is the only absolute scale figure anywhere in the slice.
- **l. City lights.** 1.2.0 `Night` preset gains city lights "made **hard-edged**" to differentiate UP from VG
  and NG; 1.2.1 reverses it — "I wasn't happy with how my experimental gradient-less street lights turned out,
  so I fixed them to look **soft like the lights in Village Generator**." *[SHOWN]* (141879891 images 02/04):
  overlapping warm circular pools along the streets, occluded by buildings so some read as crescents.
- **m. Place plate.** A title block below the map carrying the **place name** (serif small caps) and, from
  1.2.1, a **scale bar** (alternating black/white segments labelled with a number, e.g. "125"), hideable.
- **n. Permalinks.** Same mechanism as the other generators: copy to save, paste + Generate to restore. The
  **name is the only editable property and it is carried in the permalink**.
- **o. Export.** SVG "because it's too easy to implement" and **JSON "because I want to see how these places
  will look in City Viewer"**; JSON is also offered "for your own tools".

---

### T26 — City Viewer as the 3-D consumer, and what it implies about the data model
**Source:** 137631332 (intent), 138099329 images 02/06 (a CV render of a UP place). **Feeds: UP, MFCG, VG —
CV consumes all of them.** **Tag: [SHOWN] + [INFERRED].**

The render shows: building footprints **extruded to varying heights (roughly 2–4 storeys)**, white/grey walls
with regular window dots, **terracotta gable roofs with the ridge along the long axis and vertical gable
ends**, individually rotated to their street; **trees as spheroid/polyhedral canopies on trunks**, in two
greens; the **river flat grey with a tan embankment strip on both banks**; roads as flat tan bands; the
**square as a flat tan polygon**; ground green.

*[INFERRED] the exported JSON must therefore carry, per object:* building footprint polygon + height (or
storey count) + roof type/orientation; road polylines with widths; water polygons (plus embankment); tree
positions with size/species; open-space polygons. Nothing in the render requires per-building interior data.
Roofs in CV are **gables, not skeletons**, matching T5 and explaining why non-rectangular UP buildings
(T24) create a roof problem that pushes toward straight skeletons.

---

### T27 — Stencil rendering to eliminate draw-order decisions
**Source:** 115606722 (Sails). **Feeds: any generator with overlapping sprite parts — town icons,
building clusters, tree groves, ships in a harbour.** **Tag: [STATED].**

"By default, ships are drawn as **stencils**. This way they look nicer, and **I don't need to care in what
order to draw their different parts** (like should the rope ladders be drawn in front of sails or behind
them?)." The union silhouette is filled as one shape; internal part boundaries disappear. The before/after
images make the cost explicit: the line-art version needs a correct z-order for masts, sails, rigging, hull
and rails; the stencil version needs none. A genuinely reusable rendering strategy for any procedural
assembly whose parts overlap ambiguously.

---

### T28 — Parameter expansion and hidden randomisation
**Source:** 115426745 and 115606722 (Sails); 144816210 (Hair). **Feeds: every generator's tag/parameter UI.**
**Tag: [STATED].**

- "The values of these **3 parameters are converted into around 20 internal parameters** precisely describing
  a ship. This means that in theory the generator is capable of building more diverse ships than it's
  currently achievable via the UI."
- "To add more variety, **some internal parameters are now randomized. This means that ships with the same
  exposed parameters (length, height etc.) may look different.**"
- Hair: "I take an **average head described by a number of numerical parameters** and then I **change these
  parameters a little** to get a less average head."

The pattern — a small exposed vocabulary mapped onto a large internal parameter vector, with part of that
vector left stochastic — is exactly how MFCG/VG/NG/UP tags behave, and the Sails posts are the only place
watabou states it numerically (3 → ~20).

---

### T29 — Particle system for organic growth
**Source:** 144816210 (Hair). **Feeds: nothing in the settlement generators directly; recorded as a candidate
technique for forest/hedge/thatch generation.** **Tag: [STATED], method unspecified.**
"The second part **grows hair on the shape generated on the previous step using a particle system with random
parameters**." No details beyond that.

---

### T30 — Style collections as shareable data
**Source:** 93887809, 124128668. **Feeds: PS, MFCG, VG.** **Tag: [STATED].**
Styles are serialisable objects that can be published, listed on a web page and applied. PS has 9 curated
styles + 5 standard presets on Arcana; VG's equivalent lives on itch ("inconvenient to use"); MFCG's list was
later expanded. "Actually, I have **dozens of styles saved on my computer**, but of course not all of them are
good enough to be shared." 124128668 floats exposing the collections **inside** the generators. Design
implication: the style system must be complete enough that a style is a portable value.

---

### T31 — Cross-generator code transplanting as a maintenance discipline
**Source:** 99067664 (explicit), 73450463, 101173551, 70917627, 109092851. **Tag: [STATED].**
NG 1.2.1 exists *only* to "transplant some of the code from the latest versions of MFCG (and my other
generators)" — result: "faster and more stable", gradients dropped for trees, presets given more contrast,
and "**internal settings have been adjusted to make streets and buildings look more like their counterparts in
the city generator**". Elsewhere: PS's area labels reuse MFCG code (77490818); straight skeletons are built
once and then shopped around three generators (101173551); "a number of technologies ready to be implemented"
in MFCG (73450463). The generators are a **shared library with per-product tuning constants**, and visual
convergence between them is a deliberate act.

---

### T32 — 1PDG techniques worth noting (sibling generator)
**Source:** 78826680. **Tag: [STATED] + [SHOWN].**
- **Stairs as purely visual elevation hints** in connection cells: "It's a purely visual feature: **if you
  look at them too closely, they stop making any sense**." Density controlled by tags `deep` (many, "something
  escheresque") / `flat` (none).
- **`string` tag**: "a dungeon that looks like a **linear sequence of rooms — no branching and very few
  loops**. I recommend using it with the `chaotic` tag, otherwise results look super-boring." A tag-interaction
  note: a structural constraint needs a compensating variety knob.
- **"Broken" grid mode**: "supposed to look **less like a grid, more like floor tiles — broken and slightly
  uneven**." *[SHOWN]:* grid lines are jittered/segmented rather than continuous. Directly comparable to UP's
  `Mesh` grid display and to the hand-drawn map aesthetic generally.
- **`export=` URL parameter** with formats `png|svg|json|vox|md` — note **`vox`**, i.e. a voxel export exists
  for dungeons.
- **Notes are draggable** because "automatic notes placement is far from perfect" — the same concession
  watabou considers for the compass rose (T9): when auto-placement is imperfect, ship manual override.
- Comment thread: exported JSON lists notes in their **natural unsorted order** while the drawing sorts them —
  acknowledged as a bug. A data-model tell: display order is a rendering concern computed late.

---

### T33 — Content tagging: the Universal Pub Profile idiom
**Source:** 103335095. **Feeds: nothing geometric; recorded as a content-generation idiom.** **Tag: [STATED].**
Chris McDowall's system: roll 5d6, drop the highest, read the remaining four as subject-specific stats where
**1/2/3 mean "a bit"/"some"/"lots"** and **4/5/6 mean "null"/"hazardous"/"super"** — "these last three values
are not just extremes, they are special and they are what make this system interesting." Pub stats chosen:
Renown, Rowdy, Menu, Hubbub; encoded as a 4-character string. Watabou's own critique: the stat names "need to
be easy to remember — short and expressive, ideally mnemonic", and his are not. A compact way to give a
generated place *character* without simulation.

---

## 3. Visual and style conventions observed in the images

**Perilous Shores / regional maps** (68936414, 77490818, 93887809, 109092851, 149496680):
- *Palette families seen by name:* bright, winter, murky, stockholm, stormy, manual, pulp, arda, medieval,
  cartoon, full colour, B&W. Land is olive/sage/tan; water is slate blue, pale blue or teal; linework is
  black or (post-1.7.3) a darkened mix of the object colour.
- *Coast:* a thick silhouette stroke plus 3–7 concentric contour offsets, or a soft white glow, or a
  wave-hatch band; small sea rocks get their own contours.
- *Rivers:* thin blue polylines with a lighter casing, or hollow outlined shapes in the shallow colour.
- *Mountains:* clustered triangles with a light (cream/white) face and hatched shadow face; radial gradient
  when coloured; rounder bases for rugged mountains; `highland` puts ridges along coasts.
- *Forests:* filled polygons whose edge is scalloped by edge-tree canopies (sawtooth for firs, bumpy for
  deciduous), with individual tree sprites scattered inside; multi-colour autumn variants; dead trees sparse.
- *Grass/marsh/desert:* tiny tuft glyphs ("w"/"vı" marks) scattered on the fill; reeds for swamp; dune marks
  for desert.
- *Farmlands:* small clusters of 5–8 parallel furrow strokes, orientation alternating between neighbours.
- *Settlements:* side-view building sprites with some buildings pushed below the baseline for an aerial read;
  white walls, red/brown roofs, a tower with a red pennant for larger places; bold outline toggle. Landmarks:
  a skull glyph for dungeons; red/white diamonds for towns; red dots for villages; coloured diamonds for
  landmark categories.
- *Roads:* red or black **dotted** lines. *Sea routes:* long grey **dashed** curves.
- *Compass rose:* 4-, 8- or 16-point star with fine hatching, gold or slate; often accompanied by **radiating
  rhumb lines** spanning the whole map.
- *Labels:* letter-spaced serif small caps (settlements) and larger letter-spaced caps or italic script for
  areas; **white halo behind glyphs**; straight, arced or curved baselines with per-glyph rotation.
- *Frames:* double or triple rules with an inner gold/tan line in the decorative styles; a scroll/banner
  cartouche for the title in the `manual` style.
- *Hexes:* hex grid with numbers, grid and numbers sharing one colour, optionally suppressed over ocean.

**Neighbourhood Generator** (70917627, 99067664, 101173551 image 04/08):
- Cream or dark backgrounds; roofs in slate blue, terracotta, red-brown; yards/greens in yellow-green.
- *Roads:* Plain (flat band), **Cobbles** (scattered outlined pebbles), **Tiles** (small rectangles aligned to
  the road course); optional outline; optional dashed schematic mode.
- *Roofs:* pronounced ridge lines; fake gables with a fixed light direction (lighter up-slope, darker
  down-slope) and optional hatching; hip X-ridges on large/square buildings.
- *Shadows:* grey drop shadows offset down-right, per building.
- *Large buildings:* dome (a filled circle with concentric rings, gold/blue/grey), spire (round or square in
  plan), or dormers; trees planted around them when the plot is generous.
- *Trees:* solid blobs with a darker outline (gradients removed in 1.2.1); chimneys as tiny rectangles.
- *Night style:* dark slate ground, warm sand roads, soft glow pools around street lights, near-black trees.

**Urban Places** (136013772 → 165462094):
- *Backgrounds:* warm paper with a visible paper texture; the "place blob" as a pale green/tan field with a
  softened scalloped edge; cream, sage, autumn-tan and midnight-blue presets; a pure B&W/line style.
- *Buildings:* small rectangles with 2–8 short parallel roof-hatch strokes (later), graded per block through
  an ochre→orange→brown ramp; urban terraces abut wall-to-wall with cross-strokes marking individual houses;
  semi-rural blocks use detached rectangles.
- *Roads:* cream bands with a slightly darker centre line; `Paved` adds a stippled dot border; `Dashed` uses
  grey dashes; **every road terminates in a short dotted tail at the blob edge**.
- *Water:* flat blue-grey body, a lighter shallow band along the shore, a cream beach strip; rivers of constant
  width; bridges perpendicular to flow.
- *Walls:* wide grey band with merlon ticks (colour styles) or a double line of small square merlons (B&W),
  with square roofed tower bastions at intervals.
- *Squares:* light polygons with more right angles than the blocks, a monument glyph at the nexus.
- *Trees:* dense groves of overlapping scalloped canopies in two greens with internal clearing marks; small
  clusters and singles elsewhere.
- *Night:* hard-edged then soft warm light pools along streets; near-black trees and water.
- *Place plate:* name in serif small caps beneath the map, plus a segmented scale bar labelled in metres.

**Cross-generator conventions worth copying:** white halo behind map text; a single fixed light direction for
all roof/tree shading; drop shadows offset consistently down-right; dotted tails for features leaving the map;
alternating-segment scale bars; stippled dots to read as paving/gravel; short parallel strokes as the universal
texture primitive (roof rafters, furrows, hatching, grass tufts, merlons).

---

## 4. Creator's stated design philosophy and constraints

1. **Correctness loses to appearance, explicitly and repeatedly.** NG's "fake" gable roofs "look better than
   mathematically correct hip roofs" (101173551). `RIGID` produces more planned-looking maps but "on average,
   places without this tag look better" (139540343). Curved labels are deliberately *not* smoothed because
   smoothing would make them look like arcs (109092851).
2. **He builds the technique first and decides where it lives afterwards.** "This is not a new generator or a
   new feature for an existing generator, but something that can be used in some of them. I'm still deciding
   where exactly and how" (101173551). Same with floor plans: "this version of the algorithm works better than
   the previous one, but for now I don't know where to use it" (86093774). Same with "a number of technologies
   ready to be implemented" in MFCG (73450463).
3. **A feature is often shipped as a test harness for an algorithm.** "In fact, adding this template wasn't my
   goal, but a mean to test 'twisted bisection of polygons with holes'" (70917627).
4. **He avoids academic literature when he cannot follow it.** "I couldn't find a single paper on the topic I
   was capable of understanding… it turns out that **it's easier to come up with my own algorithm than
   deciphering academic papers or someone else's code**. It's quite possible that this algorithm is not
   something new. Anyway, **its only advantage is that I understand how it works**" (101173551).
5. **Asymptotic efficiency is a non-goal.** "As far as I can judge, its efficiency is O(n²) **which is fine for
   my use cases**" (101173551).
6. **He hates special cases and says so.** "The drawback of the algorithm, or rather its current
   implementation, is that it glitches in special cases and **I hate dealing with special cases**" (101173551).
7. **Scale-dependent detail is a real constraint.** Roof ridges "look well on medium-sized city maps. On small
   maps, roof ridges make imperfections of building shapes more visible, and on large maps all the roof
   details blend together" (101173551). Monuments as human figures were abandoned because "they were too
   small" (145997186). Small floor plans "look much better" than large ones (86093774).
8. **Busier is fine; noisier is not.** Farmlands "make a map look busier, but not noisier, which is a good
   thing" (149496680); tree hatching was reduced "to make it all less noisy" (68936414).
9. **Ship the imperfect auto-placement plus a manual override.** Draggable dungeon notes (78826680); manual
   compass placement floated (77490818); renaming a place (145997186).
10. **Division of labour between generators is deliberate.** UP exists because NG competed with MFCG: a new
    generator "focused less on filling an area with blocks (**because it's clearly a domain of MFCG**), more on
    creating relatively small urban locations with their own character" (106975409).
11. **Small-scope projects are a deliberate relief valve.** "I know no one cares about them, but I enjoy
    working on them… there is **no pressure of prioritising frequently requested features, no fear of breaking
    a tool used by many people**. Also, both have a very small scope, which makes them more comfortable to work
    with" (124128668). Same reasoning for preferring PS over MFCG in 73450463.
12. **Naming a generated object is a design act.** "I just think that **naming a generated object (city,
    dungeon, inn) makes it more meaningful and less disposable**, even if the name is rather mundane"
    (141879891).
13. **Data-model honesty about what cannot be edited.** In PS "it is not possible to save custom names at the
    moment" (93887809 comment); in UP the name is "the **only** thing about the place you can currently change"
    (145997186). Editability is bolted on late and is expensive.
14. **The hardest problems are stated to be judgement, not maths.** On the city wall: "**There's nothing
    special about the algorithms, but for a long time, all the results looked wrong**, and now I can't say I'm
    happy either" (139540343).
15. **Integration is expected to be lossy.** On merging MFCG and NG: "**Most likely, it won't be possible to
    reproduce a district in Neighbourhood Generator exactly as it looks in MFCG, and it really bother me**"
    (70917627 comment).

---

## 5. Useful facts from the comment threads

- **70917627, watabou replying to a request for socio-economic neighbourhood classes:** "The generator does try
  to convey a different feeling (**it's a little broader than 'class'**) for different neighbourhoods. However,
  with the current algorithm/approach, **there aren't many tools for this: it can only choose different values
  for the minimum and maximum street widths, the average building and block size, and some other variables.**"
  — the closest thing in the slice to an explicit parameter list for NG's neighbourhood character.
- **70917627, on MFCG↔NG integration:** popular request, "will be implemented in some form", but exact
  reproduction of an MFCG district inside NG is judged unlikely.
- **68936414, on PS↔MFCG/VG integration:** already one-directional — right-click a settlement icon in PS and
  "Open in MFCG/VG". The reverse is deliberately absent because two "open in…" buttons (Perilous Shores and
  Azgaar's) "would be confusing".
- **106975409, cave entrances:** requested **categorically**, not numerically — 0 `sealed`, 1 `entrance`,
  2 `passage`, >2 `junction`. A good model for tag-shaped parameters.
- **106975409, SVG export:** the solid red region a user saw is **a mask** that the viewer failed to honour;
  watabou is unsure whether it is the viewer's bug or his own SVG being non-conformant, and does nothing.
  Relevant to anyone parsing watabou SVG exports.
- **78826680, JSON note ordering:** notes are sorted before drawing and exported unsorted — an acknowledged bug
  and a clue that drawing order is computed at render time, not stored.
- **93887809, saving custom names:** not possible; the documented workaround for GM/player map variants is
  export → hide landmarks → export again.
- **109092851, uninhabited regions:** no tag exists; the workaround is to hide settlements, roads and sea
  routes via the `Details` submenu.
- **103335095, a power user's integration wishlist** (Javin Bond): per-building objects in the JSON so a
  mansion can be dropped into a neighbourhood; neighbourhoods droppable into cities; cities droppable into the
  realm map; SVG masks for every layer; simple OBJ export for shadow maps; layered, UV-mapped OBJs. Unanswered,
  but it is the clearest external statement of what the cross-generator data model would need to be.
- **141198168, T Mexx** asks for economic tags changing density, building size, proximity and alley frequency —
  unanswered, and the same request as the 2022 NG one above.
- **165462094, Steve Mangione** asks whether the previously-mentioned **river-delta option for MFCG** is still
  planned — unanswered here; recorded as an announced-but-unbuilt MFCG feature.
- **136013772, Ash Nazg** compares UP to Campaign Cartographer's City Designer 3; watabou has never used it.
- **86093774**, readers suggest inns, ziggurats, labelled+furnished rooms, and linking small plans to the city
  and neighbourhood generators; watabou judges the plans "a little too chaotic or just too small to be inns"
  and says furniture "may be a problem".

---

## 6. Open questions a re-implementer must decide

**Twisted bisection (T1).** Cut-endpoint selection rule; bend location and bend angle policy; the
perpendicularity constraint and its tolerance; recursion stop criteria (area? min dimension? aspect ratio?);
exactly how holes are handled; what the acknowledged glitches are; why its artefacts are more visible in a
street-frontage context (UP) than in a ward-subdivision context (MFCG).

**Straight skeleton (T3/T4).** The special cases that glitch and the fallback when they do; whether node
height/time is retained; whether holes are supported; the gable variant's edge-selection rule and its
"cleanliness" test; whether roof pitch is constant or per-building.

**Labels (T6/T8).** The boundary-simplification algorithm and tolerance; the OBB method; the arc-curvature
rule for arced labels; whether curved labels really use the skeleton (inferred, not stated) and how a branch
is chosen and trimmed; font-size selection; the collision-resolution policy; how holes would be incorporated
(watabou expects this to be "quite difficult").

**Urban Places mesh (T23).** How the mesh is built (the single biggest unknown in the slice); cell size
relative to the ~25 m grid; how the place extent is chosen and how its outline is softened; how the street
sub-network is selected from mesh edges; the smoothing/fillet method and its radius; what "fixing the mesh"
does operation-by-operation; whether river cells are a marked chain or a separately generated shape snapped to
the mesh.

**Urban Places buildings (T24).** Plot-width distribution and the party-wall/alley rule; block depth;
corner-plot resolution; what "more complex shapes" means and why the current method cannot make them; how
right angles will be made more common; the exact geometry of the "parallel orientation" variant.

**Walls (T25d).** How the wall's course is chosen (it "looked wrong" for a long time — so the rule matters
more than the geometry); tower spacing; gate placement; how buildings are re-fitted against the wall.

**Forest blobs (T15).** Deliberately unexplained. What `cluster scale` scales; blob construction; tree
scattering distribution; the edge/front/individual/dead tree class rules and their densities.

**Farmlands (T21).** Fields per cell; stroke geometry; orientation selection; avoidance of other features;
how "a few empty adjacent cells" is chosen for towns vs. cities.

**Export formats.** The exact UP/MFCG/VG JSON schema (only inferable from the City Viewer render); whether SVG
exports use real masks and how; the `vox` export's structure in 1PDG.

**Numbers.** Almost no constants are published anywhere in this slice. The only absolute figures are the UP
regular grid at **~25 metres**, Sails' **3 exposed → ~20 internal** parameters, the straight skeleton's
**O(n²)**, PS's **9 + 5** published styles, and the UP scale bar's **125**-unit label. Everything else —
block sizes, street widths, plot depths, tree densities, ring counts, offsets — must be tuned from the images.
