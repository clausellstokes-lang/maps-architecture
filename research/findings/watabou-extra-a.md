# watabou-extra-a — Patreon posts outside the two collections, older half (33 posts, 2019-07 → 2022-04)

Source root: `/Users/cstokes/Desktop/Maps/research/patreon/watabou-extra/<post_id>/`
(`post.md` = title/date/body/links/comments; `images/NN.ext` in marker order, then high-resolution duplicates of the same images.)

Every post body **and** its full comment thread was read. Every distinct image was opened
(the files after the marker count are larger re-encodings of the same pictures; where I cite an
image I cite the file I actually looked at). Two files that the archive stored as `.jpg`
(`43602231/images/03.jpg`, `04.jpg`) are in fact **JSON palette attachments** — their full
contents are transcribed in §2.15 and they are the single most literal artefact in this slice.

Evidence tags used throughout: **[STATED]** creator describes the method in words ·
**[SHOWN]** visible in an image/recording but not explained · **[INFERRED]** my reconstruction
(reasoning given) · **[NAMED-ONLY]** feature named, no method given.

Generator abbreviations: **MFCG** Medieval Fantasy City Generator · **VG** Village Generator ·
**NG** Neighbourhood Generator · **PS** Perilous Shores · **1PDG** One Page Dungeon Generator ·
**CV** City Viewer (a.k.a. Toy Town 2) · **PM** Procgen Mansion.

---

## 1. Chronological table

| # | Date | Post id | Title | What changed / what it adds to the record |
|---|------|---------|-------|-------------------------------------------|
| 1 | 2019-07-04 | 28088976 | Plans for July | First statement of the three MFCG research threads that dominate the next 3 years: **curvilinear streets**, **alternative block→lot cutting with side walls perpendicular to the street**, **switch to SVG drawing**. Announces districts *renaming* (not district border editing). SVG would bring zoom, one drawing path instead of two, Electron desktop build, some JS instead of pure Haxe. |
| 2 | 2019-08-01 | 28827167 | WIP: Procedurally generated tank doodles | Unrelated generator. Only reusable idea: a **hand-drawn line style** (see §2.23). |
| 3 | 2019-08-14 | 29161908 | Plans for the rest of August and September | MFCG 0.7.2 aims at *looking* better: changed drawing of buildings, roads, rivers, greens/parks; **alternative scalebar style**; **integrated compass rose**; **more colours on a single map**. Image is the canonical 0.7.2-era map (§3). Either lot partitioning or curved streets to land by end of Sept. |
| 4 | 2019-10-07 | 30565716 | Plans for October | Curved streets slip to "end of November"; explicitly: *"The whole task is much, much more than just drawing curves instead of polylines."* First 1PDG dungeon shown. |
| 5 | 2019-11-11 | 31488942 | 1PDG 1.0.2 and plans | 1PDG gains **rotate-to-fit**, **round rooms**, **flooded areas**. Promises the Dyson-hatching write-up. |
| 6 | 2019-11-20 | 31716880 | **Hatching in 1PDG** | Full algorithm for Dyson hatching (§2.7). Comment thread adds the **two-layer / clipPath mask** trick (§2.8). |
| 7 | 2019-12-27 | 32650629 | WIP: Toy Town 2 | MFCG gets a **separate 3-D viewer that only imports data, generates nothing**. Buildings = untextured prisms; greens and piers not yet displayed; elevation/hilly projection experiment. |
| 8 | 2020-02-06 | 33794567 | City Viewer aka Toy Town 2 | Release. Image confirms the exported data model (§2.17). |
| 9 | 2020-02-15 | 34061942 | City Viewer 1.0.1 | **Gable roofs** (key G), **Wavefront OBJ export** (key O, buildings + walls only, merged into one mesh), improved navigation, and the **top-down 3-D view that mimics the MFCG map** — origin of the idea of giving MFCG a zoom. |
| 10 | 2020-03-12 | 34822131 | Book Hunter and plans | 7DRL game (not map-related). Plans: MFCG alternative zoomable view; **curved streets to be built in a separate "alternative city generator-editor"** because retrofitting was too risky. |
| 11 | 2020-05-08 | 36885895 | Full Moon Coffee | Adventure-jam game. No reusable technique. |
| 12 | 2020-05-13 | 37063263 | Rune Generator source code | `RuneGeneratorOS` on GitHub (Haxe + OpenFL). Shows a **bitmap glyph → hand-drawn glyph** restyling (§2.23). |
| 13 | 2020-07-13 | 39279370 | Teen Island Simulator | Zero-player narrative sim. Ends with *"The next is City Painter!"*. No map technique. |
| 14 | 2020-08-22 | 40742440 | WIP: Regional Maps | First appearance of what becomes **Perilous Shores**. Hand-drawn B/W style, wave hatching, hachured mountains, two tree symbols, hex overlay (§3). |
| 15 | 2020-09-01 | 41103311 | **Generation in Perilous Shores** | The complete step-by-step generation pipeline, 9 illustrated steps (§2.9). |
| 16 | 2020-11-06 | 43602231 | POLL: visual styles in Village Generator | VG had 4 styles (*Vivid, Calligraphy, Scribble, Minimalist*); proposes keeping only **Vivid** because it is the most parameterised and the others are "similar but separate pieces of code" blocking SVG export. Attaches two real palette JSON files → exact style model (§2.15). |
| 17 | 2020-11-28 | 44405211 | PS 1.1.0: legend, visual & UI improvements | **Legend** replaces map labels (labels got too noisy). **New mountains** (old ones "resembled pimples"). Three map sizes via tags *small/medium/large*. **Style dialog identical to VG's**; style settings persistent. Tag vocabulary visible (§2.13). |
| 18 | 2020-12-23 | 45360377 | CV 1.1.0: trees and islands | **Waterbody edge stretching** to fake a bigger world around VG maps (§2.19). Trees imported from JSON, drawn as simple 3-D models (sprites were too slow). MFCG does not export trees; watabou plans trees only on city greens and some farms. |
| 19 | 2021-03-25 | 49191011 | **Recursive bisection with a twist** | The bent-cut primitive (§2.1). Two code generations shown, plus smooth-boundary variant, plus the first neighbourhood maps ("Raven Cross", "The Docks"). |
| 20 | 2021-06-02 | 52012066 | 1PDG 1.2.1 | Hatching settings folded into the **Style dialog**; removes "improved strokes" and "precise hatching" checkboxes; adds **Bricks** mode next to *Default* (Dyson) and *Stonework*. Tags dialog: alphabetised, shift-click shows effect, collapsible, remembered. Notes mode **Numbers** added to *Default/Tailed/Legend*. |
| 21 | 2021-06-30 | 53106327 | PS 1.1.2: lakes, editable names | **Lake** map template (all rivers flow into the lakes — acknowledged as unrealistic "closed lakes"); small lakes as a side effect on island/coast maps. Fourth colour *Paper* added (Strokes, Paper, Earth, Water). Rivers meander better; "shallow areas" no longer cover large bays. Previews of postponed features: more colours, map labels instead of legend, roads. Comment confirms NG's purpose: **a test-bed for bent bisection before transplanting into MFCG**. |
| 22 | 2021-07-09 | 53482923 | WIP: forest blobs in PS | Forest blobs (§2.10); "in PS shapes are simpler than in VG, but they are a bit harder to generate". Known shortcoming: hard edges make a lone mountain inside a blob read as standing in a clearing. |
| 23 | 2021-07-13 | 53649165 | PS 1.1.3: forest blobs, expanded palette | Blobs shipped, off by default (*Details > Individual trees*). New *Reveal rivers* option cuts rivers through forest masses. Presets **Chocolate** and **Cartoon**. Rivers "more diverse in length", fixes a glitch that spawned parallel rivers side by side. |
| 24 | 2021-08-19 | 55050649 | PS 1.2.0: landlocked regions and SVG export | Fourth template **land**; rivers subsystem rewritten so rivers may start/end off-map. Mountain generation changed for landlocked maps (fewer standalone peaks, more connected highland). **Generic SVG export library** (§2.16) — no text, no gradients yet, and gradients are what mountains use. Eight new numeric style parameters with exact ranges (§2.15). Feature context menu: Edit name / Add-Remove from almanac / **Open in MFCG**. Tags *lawful/chaotic* now shape the landscape; *safe/perilous* added. |
| 25 | 2021-09-09 | 55959636 | 1PDG 1.2.2: seeds, SVG export | URL seed / permalink (non-itch build), so PS can "Explore in 1PDG". SVG export needed clipping + multiline text added to the library; dashed lines export as many solid segments. **Shadow layer** for a 3-D feel; **new water with wobbly edges** replacing grid-aligned water. Bonus VOX export. |
| 26 | 2021-10-26 | 57890525 | The Haunting of… | Pictorial **side-view** building plans. Notes their weakness: they are rarely usable as maps. Announces VG update whose main feature is **improved fields**. |
| 27 | 2021-11-17 | 58808794 | **Neighbourhood Generator** (release) | Rewritten from scratch with a better bisection implementation. Bent cuts used for **district→blocks *and* blocks→buildings**; weird shapes must be **filtered out**. **Uneven streetwall** introduced and slated for MFCG. Streets drawn as faint filled lines rather than gaps. District names = simplified MFCG district names, here purely random. |
| 28 | 2021-11-23 | 59046807 | NG 1.0.1 | **Cobbled street stripes** option; **shaded building roofs** driven by *Shadow opacity* and *Shadow length*; night colour preset; export PNG/SVG/**JSON (for City Viewer)**. Long reflection on whether the generator is useful; notes NG maps "look better, but they don't provide more information per square unit" than MFCG. |
| 29 | 2021-12-13 | 59864807 | Castle in The Mist | Complete castle algorithm in one paragraph (§2.20) — the same cut-a-polygon-into-blocks family. |
| 30 | 2021-12-21 | 60165082 | PS 1.3.0: roads and permalinks | **Roads = relative neighbourhood graph + connectivity guarantee + virtual off-map towns** (§2.11). Pen sets replaced by four explicit stroke thicknesses; *Alpha* replaced by *Density*; *Jagged* toggle for mountains; *Rough* toggle for coastlines. Hex numbering deferred — a thousand text labels visibly slowed the map. "Perspective view" floated. |
| 31 | 2022-03-18 | 63952852 | Dark Clues | Patron-only teaser, body hidden; images are a blurred dark-themed floor plan. Later referenced as **"an alternative way of room generation (like in Dark Clues)"** for Procgen Mansion. |
| 32 | 2022-03-28 | 64375271 | NG 1.1.0: templates, large buildings | **Templates** *Area / Street / Square* (planned: Junction, Park, River bank, Bridge, Port). **Large buildings** as block-filling landmarks with cupolas; tag *secular* disables them. Size tags small/medium/large; *leafy* tag for more trees; map rotation on mouse wheel; finer roof hatching; stronger tree shading; better lit ground at night. |
| 33 | 2022-04-07 | 64845431 | CV 1.2.0 | **Windows** (dark, or lit at night); **roofed towers** (conical/pyramidal, same pitch as house roofs); **Tree shape** style parameter *Ellipsoid*/*Cone*; **orthographic "Macro" view**; fly-through works with VG and NG data. |

---

## 2. Techniques

### 2.1 Recursive bisection with a bend ("with a twist") — the NG/MFCG street-and-lot primitive
Sources: `49191011/post.md`; images `49191011/images/06.png` (first code generation),
`09.png` (improved), `11.png` (smooth shapes), `07.png`/`08.png` (first neighbourhood maps);
`58808794/post.md`; `53106327` comment (2021-07-03).
**Feeds: NG (entirely), MFCG (intended transplant), and by extension VG's block/lot logic.**

**Problem.** [STATED] Plain recursive bisection (what MFCG used to cut *wards* into *blocks*)
makes cuts that are straight lines. That produces junctions that look unnatural and, worse,
"its simple recursive nature is …visible for the naked eye" — you can read the binary tree off
the map. It also meets block boundaries at arbitrary angles, giving wedge-shaped lots.

**The idea.** [STATED] *"Recursive bisection is bisecting a polygon… recursively. We cut a given
polygon into two parts. And then we cut each half in two again and again until a certain
condition is met, e.g. until our pieces are small enough. … For 'bisection with a bend' we add a
turn to a cut somewhere in the middle to start and end at the right angle to the edges of the
polygon."* He is explicit that this is *"just an idea, not an algorithm or mathematical
definition. It can be implemented in different ways for different results."*

**Recoverable algorithm.**
1. Maintain a polygon (the ward/district, then recursively each part).
2. Pick two boundary points on (generally) different edges — the cut's endpoints. [INFERRED]
   From `09.png`, endpoints are spread so the two children are comparable in area; very small
   slivers do occur, so the balance constraint is loose.
3. Build the cut as a **polyline with one interior bend** (occasionally two — several three-segment
   cuts are visible in `09.png`): the first segment leaves the boundary **perpendicular to the
   edge it starts on**, the last segment arrives **perpendicular to the edge it ends on**, and a
   middle segment joins them. [STATED for the perpendicularity; SHOWN for the one-bend default.]
4. Recurse on both halves until a size/area predicate is met.
5. Give the cut a **width** to turn it into a street: in `06.png` the cuts are rendered as white
   gaps of visibly varying width (wide avenues and hairline alleys in the same map), so street
   width is per-cut, plausibly a function of recursion depth. [SHOWN + INFERRED]

**Smooth-boundary generalisation.** [SHOWN] `11.png`: for polygons with curved boundaries the cut
is drawn as a **smooth curve** that still leaves and meets the boundary at right angles; where the
boundary is a straight segment the cut is straight, where it curves the cut curves. This is the
same object as the curvilinear-streets prototype of 2019 (§2.3) and is the reason watabou says
the method "also works for smooth shapes".

**What changed between iterations.** [STATED] Comparing `06.png` (first version) to `09.png`
(current): *"I think they look much better, although I can't really put my finger on what exactly
is better here. The overall shape is more clearly propagated to inner lines... sort of?"*
[SHOWN] Concretely, in `09.png` long cuts run the whole width of the shape and shorter cuts
branch off them at right angles, so the partition reads as a street hierarchy; in `06.png` cuts
are more uniformly sized and the blocks are more "cell-like".

**Junction character.** [SHOWN] Almost every junction is a **T**, not an **X** — a direct
consequence of recursive bisection (a cut terminates on an existing cut). A commenter
(Heath Rezabek, 2021-03-25) names this exactly and suggests planned wide streets crossing in X
shapes with organic streets filling in; watabou does not adopt it in this slice.

**Two uses, one primitive.** [STATED, `58808794`] *"'Bent cuts' are good not only for cutting
districts into blocks, but also for cutting blocks into buildings."*

**Failure modes and handling.** [STATED] (a) *"occasionally they spawn very weird ones which need
to be filtered out"* — degenerate building footprints are **discarded**, not repaired. (b) In
March 2021 the method was *"too slow and too unstable"* to go into MFCG; NG was created as a
disposable harness to stabilise it. [SHOWN] (c) Near-parallel adjacent cuts produce hairline
slivers (visible as doubled lines in `09.png` centre shape and `11.png` left shape) — in NG these
survive as alleys rather than being removed.

**UNKNOWN for a re-implementer.** Where exactly the bend point is placed (fraction along the cut,
lateral offset, any noise); how the two endpoint edges are chosen (longest edges? opposite edges?
weighted by length?); the stopping predicate (area, min dimension, depth, or a mix); how street
width is assigned; whether the "improved" version changed the endpoint choice, the bend placement,
or added a straightening/merging pass; the exact filter that rejects "weird" building shapes
(aspect ratio? min interior angle? min area?).

---

### 2.2 Block → lots with side walls perpendicular to the street
Sources: `28088976/post.md`; image `28088976/images/07.png` (new vs old, 960×480).
**Feeds: MFCG (lot/building generation), and the same shape logic appears in NG blocks.**

**Problem.** [STATED] *"I am trying to invent a better way to cut blocks into lots with a goal to
have side walls being perpendicular to the street."* In July 2019 he declares he is no longer
content with the 2018 MFCG building generation.

**What the comparison image shows.** [SHOWN] A pentagonal block, old on the left, new on the
right. Both are a **ring of lots around an empty courtyard** — the core MFCG block topology.
- Old: lot side walls run at arbitrary angles; lots are trapezoids; the inner courtyard boundary
  is ragged and, at the top vertex, a **sharp V-shaped wedge stabs into the ring** — the classic
  artefact of offsetting/bisecting a ring near a convex corner.
- New: each lot has **two sides perpendicular to the block edge it fronts**; lots read as
  rectangles standing on the street; lot depth varies from lot to lot so the courtyard boundary is
  a clean **stair-step polygon**; the wedge artefact is gone.

**Recoverable algorithm.** [INFERRED] For each boundary edge of the block, subdivide the edge into
frontages; for each frontage erect a rectangle inward, normal to that edge, with an
independently randomised depth; the union of rectangles is the built ring and the residue is the
courtyard. This reproduces every visible property of the right-hand picture (perpendicular side
walls, per-lot depth variation, stair-stepped courtyard, no wedge at corners) and nothing in it
contradicts the text. Corner handling — where two edges meet at an angle, their rectangles must
overlap or leave a gap — is the one place the picture is ambiguous; in the image the corner lots
are simply clipped against each other.

**UNKNOWN.** Frontage-width distribution; depth distribution and whether depth correlates with
frontage; how corners are resolved; what happens when the block is too thin to hold a ring
(MFCG's degenerate-block case is not shown here).

---

### 2.3 Curvilinear streets
Sources: `28088976/post.md` + image `28088976/images/04.png` (prototype, 960×480);
`29161908`, `30565716`, `34822131`; and `49191011/images/11.png` as the 2021 successor.
**Feeds: MFCG (target), NG (delivered form).**

**Problem.** [STATED] *"When looked from a distance, lack of curves is one of the things
distinguishing generated maps from real ones most prominently — everything consists of straight
segments. Curved district labels from the last release were designed to hide it, but I'd like to
find a real solution."*

**Prototype (2019-07).** [SHOWN] `04.png`: dense urban fabric where every street is a **smooth
curve of roughly constant width** (cream ribbons on a dark-red lot field). Blocks are rounded,
teardrop/oval-ish closed cells. Inside each block, lots pack as a ring around a **rectilinear,
stair-stepped courtyard** (same topology as §2.2) — i.e. the *streets* are curved but the *lot
partition* stays polygonal. Lot fill colours vary slightly in hue and lightness around a red-brown
(this is the "colour variance" idea that later becomes an explicit style parameter, §2.15).

**Cost.** [STATED] *"in the code of the prototype I didn't need to deal with all the complications
of the real generator. The whole task is much, much more than just drawing curves instead of
polylines"* (30565716); and eight months later *"this task turned out to be even more complex than
I expected and implementing all the changes in the current generator would be too risky"*, so it
moves to *"an alternative city generator-editor"* (34822131). That alternative is, in the end,
Neighbourhood Generator.

**UNKNOWN.** Whether the 2019 prototype curves were splines fitted to a polyline street graph, or
streets generated as curves natively; how curve offsetting produced constant-width ribbons; how
block boundaries were derived from curved street centrelines.

---

### 2.4 Uneven streetwall
Source: `58808794/post.md`; images `58808794/images/03.png` ("Old Ward"), `59046807/images/03.png`
("Fairy Pass"). **Feeds: NG, and explicitly earmarked for MFCG.**

[STATED] *"One of the ideas I tested here that is not related to bisection is uneven streetwall.
I like the result a lot, although I have my doubts about the method I use for it. Anyway, this is
going to be transplanted to the city generator as well."* — feature named, method withheld,
and the creator himself flags the method as dubious. **[NAMED-ONLY] for the method.**

[SHOWN] What it looks like: along one side of a street the building fronts are *not* collinear.
Individual buildings sit a little forward or back of the mean frontage line (roughly ±10–25 % of a
building depth), and occasionally one juts well forward. Buildings remain a continuous terrace —
there are no gaps between neighbours — so it is the *front line* that jitters, not the packing.

[INFERRED] The cheapest implementation consistent with the pictures: after lots are cut, offset
each building's street-facing edge inward by an independent random amount while keeping the side
walls on the lot boundaries. "Doubts about the method" plausibly refers to this making the street
polygon and the building polygons disagree (the street no longer touches every façade).

---

### 2.5 Large buildings / landmarks
Source: `64375271/post.md`; image `64375271/images/03.png` ("Olill Square"). **Feeds: NG.**

[STATED] *"Large buildings are supposed to be landmarks… A large building takes a whole block, but
often fails to fill it all."* Rules given: some districts get more than one, some get none; they
**tend to be at some distance from each other**; a large building occupies an entire block; when
it fails to fill the block, watabou plans to add trees around it. To increase visibility they get
**additional details, most notably cupolas** — which he concedes makes them read as temples. Their
shapes are *"not diverse enough"*. Tag `secular` suppresses them. They can be toned down by
setting the cupola colour equal to the roof colour.

[SHOWN] In "Olill Square" the landmark is a cruciform footprint with a **circular domed cupola**
drawn as concentric rings at the crossing, roof hatch running along each arm.

[INFERRED] Placement is a Poisson-like or greedy min-distance selection over blocks (from "tend to
be at some distance from each other"), with a per-district count drawn from a distribution that
includes 0.

**UNKNOWN.** The footprint generator for large buildings; the min-distance constant; the
probability of 0/1/2+ per neighbourhood.

---

### 2.6 Neighbourhood templates
Source: `64375271/post.md`; images `64375271/images/03.png` (Square), `04.png` (Street);
`59046807/images/03.png`, `04.png` (Area). **Feeds: NG.**

[STATED] Three templates, chosen in the Tags dialog:
- **Area** — generic, i.e. the pre-1.1.0 behaviour.
- **Street** — *"a notable street and its immediate surroundings, usually no more than a couple of
  blocks away from it."*
- **Square** — *"defined by an open rectangular area at its center. In contrast with other empty
  areas created organically, this square is supposed to look like a planned urban feature."*
Planned but not built: *Junction, Park, River bank, Bridge, Port*. **[NAMED-ONLY]** for those.

[SHOWN] "Merchant Street" (`64375271/images/04.png`) is a long sinuous spine street with the built
area hugging it and thinning out perpendicular to it — the overall silhouette is a thick ribbon,
not a blob. "Olill Square" has an explicit cobbled rectangle at the centre with streets radiating
from its corners and sides.

[INFERRED] A template is a **boundary-shape + seed-feature prescription** fed to the same bisection
machinery: *Area* = blob boundary, no seed; *Street* = boundary elongated along a pre-placed
spine cut that is exempt from further subdivision; *Square* = a rectangle removed from the
partition before bisection so it survives as an untouched void. This matches "in contrast with
other empty areas created **organically**" — the square is carved deliberately, other voids fall out.

---

### 2.7 Dyson hatching (Poisson-disc stroke clusters)
Source: `31716880/post.md` (the whole post is the algorithm); images
`31716880/images/01.png`, `02.png`, `03.gif` (frame 2 extracted), `04.png`, `05.png`, `06.png`,
`07.gif` (frames extracted). Reused in 1PDG `52012066`, `55959636`, and stylistically in PS.
**Feeds: 1PDG directly; the same "fringe band around a shape" idea drives PS coast waves and
forest-blob outlines; not used in MFCG/VG/NG.**

**Problem.** [STATED] Reproduce Dyson Logos' hand crosshatching, whose hand-drawn recipe is
*"sets of three short strokes 'pushing' each next set against previous ones"*. Watabou calls a set
a **cluster**.

**Algorithm, exactly as given.** [STATED]
1. *Naive:* place N clusters at random positions and random angles. `01.png` shows the two
   failures: **clusters overlap and cross**, and **empty areas remain**. Tuning N cannot fix both —
   more clusters ⇒ more overlap, fewer ⇒ more holes.
2. *Poisson-disc sampling* of cluster centres with the minimum distance set to the cluster size.
   `02.png`: even coverage, almost no overlap. Two residual defects, both named: lines still cross
   occasionally *"because we treat clusters as circles while in reality they are more like squares.
   I think it may be ignored"*; and **gaps remain because Poisson-disc never packs tightly** — the
   separation is always somewhat larger than the radius parameter.
3. *Per-cluster rescaling:* *"It is safe to make its 'diameter' equal to the distance between the
   center of this cluster and the center of the closest one."* Scale = lengthen the strokes **and**
   widen the spacing between the strokes of that cluster. `03.gif` frame 2 shows the result: holes
   are mostly gone at the price of more crossings, which he prefers.
4. That is the whole shipped method: *"That's all, that's how Dyson hatching is implemented in
   1PDG."*

**A discarded refinement.** [STATED] He tried to choose angles so neighbouring clusters are less
often near-parallel, *"but now I see that my method doesn't produce much difference, so I'm not
going to describe it here."* — an explicit dead end a re-implementer can skip.

**Cosmetics.** [STATED] *"imperfections are less visible with smaller clusters and relatively thick
strokes"*; strokes are drawn *"not like plain lines, but like actual strokes — slightly curved and
a bit thicker in the middle"*, which makes the hatching read as casual and its defects forgivable.
[SHOWN] `04.png` confirms tapered, slightly bowed strokes.

**Parameter: strokes per cluster.** [SHOWN] `05.png` = 2 strokes (scratchy, sparse),
`06.png` = 4 strokes (dense, combed). Default per the Dyson reference is 3.

**Geometry of application.** [SHOWN] `04.png`: the hatch band lies **entirely outside** the room
outline, is roughly 0.5–1 cluster-diameters deep… actually a band of several cluster rows (~4–5
stroke lengths), and its outer edge is ragged because it ends wherever clusters end. `05/06.png`
do the same around a circle, so the band follows arbitrary curvature.

**UNKNOWN.** The Poisson radius relative to room size; band depth; stroke length : spacing ratio;
the curvature/taper profile of a stroke; whether cluster angle is uniform or biased by the local
boundary normal (the circle images hint at no boundary alignment — angles look uniform).

**A third-party alternative** recorded in the comments (Arno, 2025-11-06): generate parallel lines
at a random orientation and clip them with a **Voronoi** mask
(`rougier/scientific-visualization-book … dyson-hatching.pdf`). Not watabou's method; worth knowing
as a different cost/quality point.

---

### 2.8 Hatching as a two-layer mask (the "cave painter")
Source: `31716880` comments by Oleg Dolya, 2020-03-15 and 2025-01-09; image `31716880/images/07.gif`
(frames 40/110/214 extracted). **Feeds: 1PDG; directly transferable to any "fringe outside a
region" rendering, including PS coast hatching.**

[STATED] *"the image consists of two layers: one for hatching and one for caves. The caves layer is
just shapes… On the hatching layer strokes fill the same but slightly enlarged shapes. They don't
'bump' into the edges of caves, they go under them. For example, if there is a single round cave on
the map, on the hatching layer a bit larger circle is filled with strokes."*

So: **hatch a dilated copy of the region, then paint the un-dilated region opaquely on top.** The
visible band is exactly the dilation width, its inner edge is perfectly clean (it is the region
outline), and its outer edge is ragged (wherever the strokes happen to end). No per-stroke clipping
is needed.

[STATED, 2025-01-09] The same masking idea covers the interior grid: *"you can draw a large enough
grid on one layer and use another layer as a 'mask' (clipPath in SVG) to show only part of the
grid. Another option is to actually draw only the part of the grid that has to be visible. Since a
regular grid is just a set of horizontal and vertical lines, this is easy enough."*

[SHOWN] Frame 214: cave blobs with a dotted square grid inside, a hatch band outside, a pale grey
**drop shadow** offset down-right under the outline, and interior "pillar" holes that each carry
their own hatch band on their own outside. The code no longer exists (*"It's a five years old
experiment, there is no code left :)"*).

---

### 2.9 Perilous Shores generation pipeline (complete)
Source: `41103311/post.md` — the single most complete algorithm description in this slice.
Images `41103311/images/01.png`…`09.png`. **Feeds: PS; the region layer that hands seeds to
MFCG/VG/1PDG.**

Framing [STATED]: *"The generation process consists of a series of more or less trivial steps…
Don't expect any tricks or obscure algorithms: everything is very simple and straightforward.
Drawing is a bit more complicated."*

**Step 0 — mesh.** [STATED] *"a hexagonal mesh is created. All the objects on a map are placed
either into its cells, or on the edges separating those cells."* And: *"In fact it doesn't have to
be a hexagonal mesh — any mesh will do"*, with a Voronoi variant linked on Twitter.
[SHOWN] `01.png`: a honeycomb drawn with only the **middle portion of each edge** inked (dashes
centred on edge midpoints, vertices left open) — that dash-per-edge rendering is what gives the
grid its light "stitched" look on finished maps.

**Step 1 — height field.** [STATED] *"Perlin noise is generated to be used as a height map. To get
a pronounced central Island a circular gradient is added to the original noise map."* Plus two
notes: raw Perlin is *"considered too simplistic these days. For me it's the perfect amount of
simplicity"*; and *"It is possible to use other gradient types to produce other types of maps:
bays, peninsulas, archipelagos."*
[SHOWN] `02.png` is a four-panel strip: (1) Perlin greyscale, low frequency — roughly 3–4 blobs
across the map; (2) a smooth radial gradient, white at centre falling to black at the corners;
(3) their **sum**; (4) the binary threshold of the sum — one main island plus a satellite. Note
the threshold is taken on the *continuous* field, before any mesh quantisation.

**Step 2 — land/water.** [STATED] *"The height map is projected onto the mesh. Cells with values
higher than a certain limit are 'land', the rest are 'water'."*
[SHOWN] `03.png`: the landmass boundary is exactly the union of hex cell edges — a hard zigzag.
Every softened or roughened coastline seen later is a **drawing-stage** treatment of this polygon.

**Step 3 — mountains.** [STATED] *"Each land cell is checked and marked as a 'mountain' with a
chance depending on its altitude."* With the design note: *"A simpler and more traditional way is
to mark all the cells higher than a certain level. This produces too 'thick' mountain areas for my
taste."* — i.e. stochastic thresholding deliberately produces ragged, porous ranges.

**Step 4 — rivers.** [STATED] *"For each island a number of rivers are created depending on the
island size. To build a river, we start from an eligible point on the coast … and move uphill along
the edges."* Notes: *"It's more common to place rivers inside cells, not on their edges. I am more
used to edges because that's how rivers work in MFCG."* and *"Among all possible rivers the longest
are chosen. Long rivers are more interesting."*
[SHOWN] `05.png`: red dots mark eligible coastal **vertices**; rivers are polylines along cell
edges, drawn smoothed rather than as raw hex zigzags.
So the procedure is: enumerate candidate mouths → greedy/uphill walk along the dual edge graph →
**rank candidates by length and keep the top k**, k ∝ island size.
Later fixes: [STATED, `53649165`] rivers became *"more diverse in length and… less prone to a glitch
that caused all of them to be spawned very close to each other"* (parallel rivers side by side);
[STATED, `55050649`] the subsystem was **rewritten** for landlocked maps so rivers can start or end
off-map, which also changed lake maps; [STATED, `53106327`] *"better rivers meandering"*.

**Step 5 — forests.** [STATED] *"Depending on the island size a number of seed cells are chosen and
marked as forests. Then these forests grow propagating onto neighbouring cells with a certain
probability."* Notes: *"A forest less likely propagates from one cell to another if they are
separated by a river."*; *"There are two types of forest: light forest and dark forest. Currently
the difference is visual only."*

**Step 6 — swamps.** [STATED] Same growth model, different probabilities: *"Swamps are more likely
to grow along rivers and on low-altitude cells."* Crucially: *"In reality, these are not separate
steps. Forests and swamps grow simultaneously competing for the same empty cells."* Dunes planned
the same way. [NAMED-ONLY] for dunes.

**Step 7 — settlements.** [STATED] *"Settlements are placed on random cells including mountains,
forests, and swamps. They are not allowed to be closer than two cells apart."*

**Closing design statement.** [STATED] *"it's a pretty naive map generator — no tectonics, no fancy
precipitation models, no erosion. I don't think introducing any of them would make these maps more
naturalistic (let alone more interesting). With such a low mesh resolution, apophenia works better
than detailed simulation."*

**Reproducibility caveat he volunteers.** [STATED] The step images and the final map diverge because
*"apparently I missed a random generator call and from some point generation went differently"* —
a live demonstration that the pipeline is a single seeded RNG stream, so any extra/missing draw
desynchronises everything downstream.

**UNKNOWN.** Perlin octaves/frequency/persistence; the exact radial gradient profile and its weight
relative to the noise; the land threshold; the altitude→mountain probability curve; river count vs
island size; forest seed count and propagation probability; the river-crossing penalty; the
swamp probability terms; mesh resolution in cells per map for small/medium/large.

---

### 2.10 Forest blobs
Sources: `53482923/post.md` + images `01.png`…`06.png`; `53649165/post.md` + `03.png`, `04.png`;
`43602231` ("a new method for drawing woods"). **Feeds: PS and VG (VG got it first).**

[STATED] *"a new mode of drawing woods where individual trees are replaced with larger cotton-like
shapes. Something similar is already implemented in Village Generator. In PS shapes are simpler
than in VG, but they are a bit harder to generate."*

[SHOWN] Geometry: the blob outline is a chain of **convex scallops** (circular-arc bumps) walked
around the perimeter of the union of forest cells, so the silhouette is lumpy like a cloud. Blobs
can contain **holes** (interior clearings drawn as inward-scalloped rings — clearly visible in
`53649165/images/03.png`). Interior gets a flat fill plus a few internal scallop arcs suggesting
canopy relief, and a **drop shadow** offset down-right. In VG (`43602231/images/05.png`) the same
idea is rendered with many more, smaller lobes and two green tones.

[INFERRED] Construction: take the boundary of the union of forest hex cells, resample it at a
roughly constant arc step, and replace each step with an outward circular arc (a "scallop"),
jittering radius; holes are the same operation on inner boundary rings with the arcs inverted.
That reproduces the look and explains "simpler than in VG but a bit harder to generate" — PS blobs
must be derived from a cell union, whereas VG grows its woods as shapes to begin with.

**Options.** [STATED] Default is individual trees; blobs are enabled by unchecking
*Details > Individual trees*. *Reveal rivers* (only meaningful with blobs) makes **rivers cut
through forest masses**, *"This is how rivers are usually drawn on fantasy maps, but this makes
forests look more fragmented."*

**Known failure mode, stated.** *"The main one… is their clear edges. For example, on map a lone
mountain surrounded by individual trees looks like it is a part of the forest. But with blobs this
would look like a mountain standing in the middle of a clearing and usually it doesn't seem right."*
Mitigation ideas floated but not shipped: improve blobs visually; **combine blobs and individual
trees**. [NAMED-ONLY]

Rationale for existence: *"These forest blobs create less visual noise and for this reason they can
be a good choice for large maps."*

---

### 2.11 Roads as a relative neighbourhood graph
Source: `60165082/post.md`; images `60165082/images/01.png`, `02.png`. **Feeds: PS. Directly
applicable to any settlement-connecting road layer.**

[STATED] Two requirements: (a) **connectivity** — *"All the settlements on the same piece of land
must be connected, so that following roads a traveller could get from any town to any other town."*
(b) **reasonable density** — *"we don't need every pair of towns to have a direct route… at the same
time there should be enough roads to travel anywhere without detouring too much. My first idea was
to connect close locations randomly until the road graph is connected and then add some more links,
but then I found that the relative neighbourhood graph looked pretty much like what I needed."*

So: build the **RNG** (edge *uv* exists iff no *w* is simultaneously closer to *u* and to *v* than
*u* and *v* are to each other) over settlement positions per landmass. The RNG is connected by
construction and is a supergraph of the EMST, sitting between the MST and the Gabriel graph in
density — exactly the "connected but not complete" property he wanted.

[STATED] Edges are realised as **shortest paths that account for mountain cost**: *"To calculate the
shortest path between two locations I take mountains into account, but not forests, swamps and
deserts."* — i.e. a weighted-grid shortest path (A*/Dijkstra on the hex graph) with terrain costs,
currently only mountains weighted.

[STATED] Edge-of-map handling: *"To make resulting maps look less like board games, some settlements
close to the map edges are connected to 'virtual towns' outside the map."*

**Stated dissatisfactions / planned tweaks (not shipped in this slice).**
- Too many roads; idea: *"remove as many roads to villages as possible without breaking the
  connectivity of the graph."*
- Should probably weight forests, swamps and deserts too.
- Sea/river routes would justify apparently disconnected settlements, but a missing visible link
  "may look wrong on a map".
- Dangers (dungeons) sometimes end up next to roads; idea: raise their cell cost *"to make the
  roads come around dangerous places as if people don't really want to come near them."*

[SHOWN] Roads render as **fine dotted lines**, not solid ribbons.

---

### 2.12 Map templates (island / coast / lake / land) and tag-driven terrain
Sources: `53106327`, `55050649`, `41103311`, `44405211`. **Feeds: PS.**

[STATED] Four templates, all requested through the Tags dialog:
- **island** and **coast** — original; produced by the choice of gradient added to the noise
  (§2.9 step 1: *"other gradient types to produce other types of maps: bays, peninsulas,
  archipelagos"*).
- **lake** (`53106327`) — *"one or more relatively large water bodies in the center. All the rivers
  on a lake map flow into those lakes, which is not very good because in real life there are much
  fewer closed lakes than open ones."* Side effect: island/coast maps may now contain small lakes,
  and he is undecided whether that is good.
- **land** / landlocked (`55050649`) — required rewriting rivers so they can start or end off-map.
  Also *"I tried to fix [overcrowding] by changing the way of how mountains are generated. There are
  much fewer standalone mountains and short ridges there now and highland areas are more connected,
  but not too solid."* [STATED, method not given → the mountain rule for `land` maps is
  **[NAMED-ONLY]** beyond "more connected".]

[STATED, `55050649`] Alignment tags reshape terrain: *"Chaotic regions are supposed to look more
'twisted' with fjords, weirdly shaped lakes etc. Lawful regions rarely have a jagged coastline,
rivers there are more straight. The effect is not too pronounced and only visible when comparing
series of maps."* Tags `safe` (no dangers at all) and `perilous` (more dungeons) added; and
*"Settlements of dangerous regions are more likely to have city walls when opened in MFCG"* — a tag
propagating across generators.

---

### 2.13 The tag system as a generation interface
Sources: `44405211` + image `44405211/images/04.png`; `52012066`; `55050649`; `64375271`.

[SHOWN] PS 1.1.0 Tags dialog, verbatim: selected row **lowland · lawful · large**; available
**highland, wetland, woodland, barren, civilized, difficult, good, neutral, chaotic, evil, small,
medium**; a **Random** checkbox and a **Generate** button. (In 1.1.2 the checkbox became a push
button — *"for my taste it feels much more intuitive"*.)

[STATED] Tag-dialog UX rules he converged on across generators (1PDG 1.2.1, mirrored into PS):
last selected tags are saved and restored; tags sorted alphabetically; **shift-click a tag shows a
very short description of its effect**; the dialog is collapsible so you can regenerate without
covering the map.

NG tags (`64375271`): templates *Area/Street/Square*; sizes *small/medium/large*; *leafy* for more
trees; *secular* to suppress large buildings.

[INFERRED] A tag is a named bundle of parameter overrides + hard constraints applied before
generation; the "series of maps" caveat for lawful/chaotic implies most tags bias distributions
rather than switch branches.

---

### 2.14 Naming, legends, almanac, labels
Sources: `44405211`, `53106327` (+ images 02, 04), `55050649` (+ images 02, 03), `58808794`.

- **Legend vs labels.** [STATED] *"I think that on average, regular map labels look better than a
  legend, but in this case I couldn't find a way to make them readable (everything got too noisy)."*
  So PS ships numbered pins + a legend list. Map labels return later as an *option* for large maps.
  [SHOWN] `53106327/images/04.png`: labels are set in a handwritten face directly beside the feature
  ("Blue Heights", "Iron Caves", "Lolystrand Town"); `55050649/images/03.png`: labels in bordered
  name-plates joined to the feature by a leader line.
- **Pins.** [SHOWN] dark filled circles (later hexagons) with white numerals.
- **Feature granularity.** [STATED] *"'Map features' here are named entities on a map: a village is
  a feature, a mountain range is a feature, but a single mountain in a range is not."*
- **Editing.** [STATED] Right-click a legend entry or the feature itself → *Edit name*,
  *Reroll names* (all at once — individual rerolls are not possible), *Add to / Remove from
  almanac*, *Open in MFCG*.
- **Almanac.** [STATED] Term borrowed from *The Perilous Wilds* (Jason Lutes). Intended as "a list
  of a number of features and their short descriptions" shown on click-able **stickers**, like 1PDG
  notes; shipped in this slice as names only, because he could not decide what the descriptions
  should be (parameters vs sensory detail vs situation hooks). Key design constraint he articulates:
  *"The important difference of regional notes from dungeon notes is that they need to be
  consistent. In a fantasy dungeon two neighbouring rooms can have drastically different content —
  that's silly but acceptable. On a regional map two neighbouring settlements should be at least
  aware of each other and of each other's problems."*
- **Settlement nouns.** [STATED, comment 2022-01-13] *"'village', 'town' and 'city' used to be a
  part of a settlement name, but they are not anymore"* — they are a separate field re-attached for
  the legend. A re-implementer should model `name` and `kind` separately.
- **NG titles.** [STATED] *"For the title I use a simplified version of district names from MFCG.
  In the city generator these names are chosen depending on a district location and adjacent
  features, but here they are generated purely randomly."* (Observed titles: Old Ward, Pearl Ward,
  Fairy Pass, Cheese Gate, Olill Square, Merchant Street, Raven Cross, The Docks.)
- **Fonts.** [SHOWN] `53106327/images/02.png` Style ▸ Text tab: *Title font* `Playfair Display 50, b`,
  *Legend font* `Playfair Display 30`, *Pin font* `Impact 25`, *Line spacing* `0`, *Outline* ✓.
  Title/legend/pin fonts are independently settable (same feature exists in VG and 1PDG).

---

### 2.15 The style/palette model — exact keys and ranges
Sources: `43602231/images/06.png` (Palette dialog, three side-by-side states),
`43602231/images/03.jpg` and `04.jpg` (**actually JSON**), `55050649/post.md`,
`53106327/post.md`, `59046807/post.md`, `64845431` + `45360377/images/06.png`.
**Feeds: VG primarily; PS has "a Style dialog identical to Style settings in VG"; NG and 1PDG
adopt the same pattern.**

**Village Generator palette — the exact schema (from the attached JSON).**

```json
// 43602231/images/03.jpg  — "black & white / filled buildings" preset
{ "ground":"#FFFFFF", "hachureLight":"#FFFFFF", "hachureDark":"#FFFFFF",
  "roofLight":"#000000", "roofDark":"#000000", "sand":"#000000", "ink":"#000000",
  "waterShallow":"#DDDDDD", "waterDeep":"#DDDDDD", "waterTide":"#DDDDDD",
  "forestDark":"#EEEEEE", "forestLight":"#EEEEEE",
  "shadowAlpha":"0.0", "strokeNormal":"0.8", "strokeThin":"0.1" }

// 43602231/images/04.jpg  — "outlines only" preset
{ "ground":"#FFFFFF", "hachureLight":"#FFFFFF", "hachureDark":"#CCCCCC",
  "roofLight":"#FFFFFF", "roofDark":"#FFFFFF", "sand":"#FFFFFF", "ink":"#000000",
  "waterShallow":"#CCCCCC", "waterDeep":"#DDDDDD", "waterTide":"#888888",
  "forestDark":"#EEEEEE", "forestLight":"#EEEEEE", "shadowAlpha":"0.1" }
```

**The dialog's own labels, in order** (`43602231/images/06.png`, middle and right panels), with the
values shown for the "outlines only" and "filled" states respectively:

| UI label | JSON key | outlines-only | filled |
|---|---|---|---|
| Ink | `ink` | 000000 | 000000 |
| Ground | `ground` | FFFFFF | FFFFFF |
| Light hachures | `hachureLight` | FFFFFF | FFFFFF |
| Dark hachures | `hachureDark` | CCCCCC | FFFFFF |
| Sand | `sand` | FFFFFF | 000000 |
| Light roof | `roofLight` | FFFFFF | 000000 |
| Dark roof | `roofDark` | FFFFFF | 000000 |
| Shallow water | `waterShallow` | CCCCCC | DDDDDD |
| Deep water | `waterDeep` | DDDDDD | DDDDDD |
| Ripples | `waterTide` | 888888 | DDDDDD |
| Light forest | `forestLight` | EEEEEE | EEEEEE |
| Dark forest | `forestDark` | EEEEEE | EEEEEE |
| Lights | *(not in either JSON)* | 000000 | 000000 |
| Shadow | `shadowAlpha` | 0.1 | 0 |
| Normal stroke | `strokeNormal` | 1 | 0.8 |
| Thin stroke | `strokeThin` | 0.5 | 0.1 |
| Colour variance | *(not in either JSON)* | 0.2 | 0.2 |

Buttons: **Load**, **Apply** (and in PS/CV: **Preset**, **Load**, **Apply**, **Save**).
Note `Lights` and `Colour variance` appear in the UI but not in the two attached files — omitted
keys evidently fall back to defaults, which is a useful robustness requirement for any clone.
`Lights` is the **street-lamp glow colour used by night presets** (see `59046807/images/04.png`,
"Cheese Gate": a yellow halo bleeds from every street). `Colour variance` is the per-object hue /
lightness jitter visible on roofs since 2019 (§2.3).

**The design claim behind the poll.** [STATED] *"Vivid style is the most customizable of them. It
can approximate the other ones pretty well, especially if the list of its adjustable parameters
will be expanded… These 4 styles are implemented as similar but separate pieces of code, and
supporting them all is tiresome. This is one of the reasons why there is still no SVG export."*
And he demonstrates it: *"You can easily make Vivid 'black and white' and/or 'outlines only' by
editing its colors."* — i.e. **one parameterised renderer, styles expressed as palettes**, which
is the architectural lesson of this post.

**PS palette evolution.** [STATED] 1.1.2: four colours — *Strokes, Paper, Earth, Water*; Paper
"only used for the matte and labels, so it's not yet possible to generate full-colour maps".
1.1.3: *"significantly expanded palette… separate colours for mountains, buildings, trees etc."*,
presets **Chocolate** and **Cartoon**, plus a caution: *"I'm not sure that adding a bazillion of
parameters to customize is a good idea, but after adding one it's hard to stop."*

**PS 1.2.0 numeric parameters — exact ranges [STATED].**

| Parameter | Meaning | Range / default |
|---|---|---|
| Shallow edge | density of the dashed edge of shallow water | 1 = solid line, 0 = no edge |
| Shallow width | how far shallow water stretches from the coast | 0 = none, max 2, *"normally around 0.4"* |
| Waviness | how wavy the waves are | 0 = straight lines, 1 = almost zigzags |
| Wave distance | spacing between wave rows | 0 removes waves, max 20 |
| Trees density | density of individual trees | min 0.1, max 1 |
| Trees regularity | regular vs chaotic tree distribution | 0.1 very chaotic, 1 very regular |
| Town scale | size of town icons | default 1; *"probably one of the most important parameters… For less toyish look… around 0.5–0.8"* |
| Danger scale | size of danger icons | as above |

Only relevant with *Individual trees* on. He adds: *"I consider replacing some of input fields with
sliders… For now I just made it possible to adjust these values using a mouse wheel."*

**PS 1.3.0 stroke model.** [STATED] The single *"Pen set"* setting was replaced with **four explicit
thicknesses: Normal, Thick, Thin, Ultra-thin**; pen sets survive only as hotkeys `~ 1 2 3` and are
no longer part of a saved style. *"Alpha"* was replaced by **Density**, which controls transparency
when *Shading = Transparent* and **stroke density when *Shading = Hatching***. New booleans:
*Jagged* (uncheck → smooth mountains as in older versions) and *Rough* (rougher coastlines, "more
appropriate for mountainous island and similar regions").

**Why the drawing code got simpler.** [STATED, `60165082`] *"When PS was initially created, I wanted
to reproduce a specific visual style of hand-drawn maps with more attention to quality of strokes
than I think it is needed now. Instead today I'd like the generator to be able to generate more
visually diverse maps. For that I had to simplify some parts of the generator responsible for
drawing. As a result, maps have lost a few nuances, but I don't think anybody will notice it."*
A deliberate trade of stroke fidelity for parameter space.

**NG style parameters.** [STATED] *Shadow opacity* and *Shadow length* control how pronounced the
shaded roofs are; cobbled roads are a style toggle; colour themes can be edited, saved and loaded;
five presets including a **night** one.

**City Viewer style.** [SHOWN, `45360377/images/06.png`] Tabs **General / Sky / Buildings**; the Sky
tab holds *Zenith color* `3A3D44`, *Horizon color* `814A43`, *Sun color* `FFBB99`,
*Sun altitude* `8`, *Ambient light* `0.7`, with Preset / Load / Apply / Save.
[STATED, `64845431`] *Tree shape* ∈ {Ellipsoid, Cone}; roofed towers on/off.

---

### 2.16 SVG export as a reusable capture library
Sources: `55050649`, `55959636`, `43602231`, `59046807`.

[STATED] The export is written once as a **generic converter from his drawing calls to SVG**, not
per-generator: *"I've spent a lot of time on SVG export in this generator, more than I usually do.
I hope it was worth it because supposedly I won't need to update its code in the future to make it
work with new features. Moreover, I probably can transplant it into my other applications without
many/any changes."* Confirmed a month later in 1PDG: *"I had to add to my library a couple of
missing features (like clipping and multiline text), but overall it went pretty smoothly."*

Limitations named: at PS 1.2.0 **no text and no gradients** (so the legend is not exported, and
mountains — which use gradients — are affected); dashed lines come out as *"multiple solid
segments (because that's how they are drawn in the generator itself)"*.

[STATED] Having four hand-written visual styles in VG was itself *"one of the reasons why there is
still no SVG export"* — the architectural argument for one parameterised renderer.

**Lesson for a re-implementer.** Draw through a thin retained command interface (fill/stroke/path/
clip/text/transform); an SVG writer and a canvas/GPU writer then consume the same stream, and the
export is not a second implementation of the map.

---

### 2.17 The 3-D data model implied by City Viewer
Sources: `32650629`, `33794567` + `images/02.png`, `34061942` + `images/02.png`, `03.png`,
`45360377` + `images/04.png`, `05.png`, `64845431` + `images/03.png`, `04.png`, `05.png`.
**Feeds: MFCG/VG/NG export format; tells you what the 2-D generators actually keep.**

[STATED] *"it doesn't generate anything, it only builds 3D models from imported data. This way I can
develop two applications independently."* The transport is **JSON**; NG explicitly exports *"JSON
(for opening them in the City Viewer)"*.

What is and is not in the payload, stated over time:
- v0 (2019-12): buildings as *"simple untextured prisms"*; *"some objects are not displayed at all
  (greens, piers)"*.
- 1.0.1 (2020-02): **gable roofs**; *"Gable roofs work best with 'simple' buildings of MFCG.
  'Complex' ones look a bit weird, which is especially apparent with castles."* → buildings carry a
  simple/complex distinction. **OBJ export** covers *"only buildings and city walls… and everything
  is merged into a single mesh"* — no roads, water-bodies or fields.
- 1.1.0 (2020-12): **trees** appear *"if an imported JSON contains trees data"*; *"Currently MFCG
  doesn't include trees data into exported files and I am not planning to add woods to the city
  generator, but probably a number of trees will be spawned on city greens ('parks') and on some
  farms."* Trees are 3-D models, not sprites — *"surprisingly it worked too slowly"* with sprites.
  Island maps supported.
- 1.2.0 (2022-04): windows; roofed towers; tree shape; orthographic "Macro" view.

[SHOWN] `33794567/images/02.png` and `34061942/images/03.png` give the entity list directly:
**buildings** (flat-roofed prisms pre-1.0.1), **city wall** as an extruded band with **cylindrical
towers at vertices** and a taller gate block, **streets/plazas** as flat polygons, **greens/parks**
as a distinct flat polygon colour, **water** as a flat polygon, and **fields** outside the wall as
large **rounded-corner polygons** tiling the hinterland. `45360377/images/05.png` shows the fields
clearly as a radial tessellation of rounded quads/pentagons.

[INFERRED] The exported model is therefore: a set of named polygon layers (water, fields, greens,
plazas/streets, wall polyline + tower positions + gate positions) plus a building list of
(footprint polygon, height or storeys, flags: simple/complex, maybe type), plus optional tree
points. Elevation is *not* in the payload — CV's hilly experiment (`32650629`) projects onto a
surface it invents itself.

---

### 2.18 Roof and building rendering (2-D and 3-D)
Sources: `34061942`, `59046807`, `64375271`, `64845431`; images `59046807/images/03.png`,
`64375271/images/03.png`, `58808794/images/03.png`, `64845431/images/04.png`.

- [STATED] **Gable roofs** in 3-D (2020-02) — *"from afar they look much more like real (medieval)
  houses now… the skyline did become more believable"*; toggled with **G**.
- [STATED] **Shaded roofs** in NG (2021-11) — *"Building roofs are drawn shaded now. How much this
  effect is pronounced depends on the style parameters Shadow opacity and Shadow length."*
- [STATED] **Finer roof hatching** in NG 1.1.0.
- [SHOWN] In NG the top-down roof is drawn as: a polygon with a heavy outline, filled with the roof
  colour, overlaid by **fine parallel lines running perpendicular to the ridge** (the "tiles"), with
  the two roof planes given slightly different tones so the ridge reads as a line. Long terraces get
  a hatch run per building, so the terrace reads as separate houses.
- [SHOWN] In the 2021-03 proto-NG (`49191011/images/07.png`) roofs are instead drawn as **short
  diagonal strokes running inward from each corner** — the classic top-view hip-roof diagram. This
  was replaced by the parallel-hatch treatment in the released NG.
- [STATED] **Roofed towers** (CV 1.2.0): conical or pyramidal, *"of roughly the same pitch as house
  roofs"*.
- [STATED] **Windows** (CV 1.2.0): *"just dark (or occasionally light if it's a night-time)
  rectangles, but they liven up a scene a lot. Unfortunately, windows look odd on large buildings,
  turning them into skyscrapers or bee hives."*

---

### 2.19 Waterbody edge stretching (making a bounded map look unbounded)
Source: `45360377/post.md`. **Feeds: CV; a general fix for any generator that clips its world to
the frame.**

[STATED] *"In contrast with MFCG, Village Generator doesn't create anything outside map bounds. For
example, if you see a bend of a river there it means there is only that bend and nothing else —
there is no actual river. It's not a problem in VG, but when you export such map and then import it
in City Viewer this lack of a 'bigger world' becomes clearly visible and it looks very silly. …
In this update I tried to fix it by stretching edges of waterbodies. This method works pretty well
with coastal maps turning small water areas onto 'endless' seas. With rivers the effect is not very
convincing."* Roads would be *"easy"* to do the same way, woods *"probably harder"*. [NAMED-ONLY]
for the road/wood versions.

[INFERRED] "Stretching edges" = detect the polygon edges that lie on the map boundary and push those
vertices far outward along the boundary normal, so a clipped sea becomes a huge sea. It works for
seas (one boundary contact, large area) and poorly for rivers (two boundary contacts, thin shape —
stretching both ends just makes a long trough).

**Note this is an important structural difference between MFCG and VG:** MFCG models things beyond
the frame; VG does not. Any unified engine must decide which convention it follows.

---

### 2.20 Castle generation ("Castle in The Mist")
Source: `59864807/post.md`; images `59864807/images/03.png`, `04.png`. **Feeds: nothing in
MFCG/VG/NG directly, but it is the same "cut a polygon into blocks" family and is the clearest
statement of how watabou builds a walled compound.**

[STATED], complete: *"It creates a random polygon (sometimes regular, sometimes irregular) as an
overall shape of the castle. Then it cuts it into blocks. Inner blocks are discarded to create a
courtyard. Some of the remaining blocks (rectangular ones) are turned into halls, the rest are
turned into towers and parts of the curtain wall. Battlements are added to outer edges of blocks and
turrets are perched on sharp vertices. Most importantly, this all is placed on a hill with a road."*

Note the structure is identical to MFCG's block topology: **cut a polygon, discard the interior, keep
the ring** (§2.2). The classification step — *rectangular blocks become halls, the rest become
towers/curtain wall* — is a cheap and reusable heuristic. "Turrets on sharp vertices" means small
cylinders at vertices whose interior angle is below some threshold.

Design intent [STATED]: *"a group of vertical blocks already looks like a castle, I just needed to
add crenellations and stuff to strengthen the impression"*; aesthetic target was real Scottish
castles (reference: **Doune Castle**), not high fantasy or Gothic.
[SHOWN] `59864807/images/03.png`: blocky towers with square merlons, a couple of dark gable-roofed
halls, conical corner turrets, tiny square windows, all on a smooth dome of a hill with a single
pale road running to the gate.

Unbuilt ideas [NAMED-ONLY]: stepped gables, stairs, Gaelic-sounding castle names.

---

### 2.21 Seeds, permalinks, and cross-generator linking
Sources: `55959636`, `60165082`, `64375271`, `55050649`, `52012066`, `32650629` comments.

[STATED] A permalink is simply the URL of the non-itch (`watabou.github.io/...`) build: *"All you
need to do is to copy a URL from your browser address bar."* The itch-hosted build needs an explicit
*Permalink…* menu item because of the iframe. Coverage in this window: MFCG, VG, 1PDG (1.2.2), PS
(1.3.0), NG (1.1.0).

[STATED] What a permalink does *not* capture in PS: *"Changes in the legend (to the list of features
and their names) are not saved in the permalink, but the name of the region (when it's edited or
rerolled) is saved."* A useful warning about which state belongs in the seed and which is user data.

[STATED] Linking: PS's feature context menu has *Open in MFCG* (towns/cities) and, after 1PDG got
seeds, *"Explore in 1PDG"* for dungeons; he plans to generalise the item to *"Explore"*. Also the
`perilous` tag makes MFCG more likely to give those settlements city walls — so the link carries
parameters, not just a seed.

[STATED, `32650629` comments, 2020-01-14] On saving/loading cities as JSON: *"That's on my todo list.
Proper saving/loading is not very hard to implement, but I don't want to do it before the
architecture is stable (currently it is not)."*

---

### 2.22 1PDG rendering pieces that transfer
Sources: `31488942`, `52012066`, `55959636`; images `30565716/images/02.png`,
`52012066/images/03.png`, `55959636/images/02.png`.

- [STATED] **Rotate-to-fit** (1.0.2): rotate the whole map to the angle that best fits the page.
  [SHOWN] every 1PDG map sits at a slight angle.
- [STATED] **Round rooms** and **flooded areas** (1.0.2).
- [STATED] **New water with wobbly edges** (1.2.2): *"I don't know why when I first implemented
  water, I thought that its shape should be aligned to the grid. It didn't look much like water. New
  water with its wobbly edges looks pretty much like how I would draw water by hand."* — a direct
  statement of the general principle: **snap the simulation to the grid, never the drawing.**
- [STATED] **Shadow layer** (1.2.2): *"a simple shadow which adds a bit of 3D feel to a map. You can
  specify the size and color of the shadow… disabled either by unchecking Layers > Shadow or by
  setting its color to white."* The same shadow idea appears in NG, VG and PS.
- [STATED] Hatching modes: *Default* (Dyson), *Stonework*, and new *Bricks* (1.2.1). Removed
  *"improved strokes"* and *"precise hatching"* checkboxes *"because nobody used them anyway"*.
- [STATED] Notes modes: *Default*, *Tailed*, *Legend*, *Numbers*. In *Numbers*, notes are hidden and
  **every** room gets a number; a note linked to a hidden secret room is hidden with it.
- [SHOWN] Note bubbles are rounded rectangles with a thin leader line to a point inside the room;
  the "Legend" mode moves them to a column beside the map.
- [STATED] **Long-press opens the context menu** — the touch-device affordance adopted across
  generators.

---

### 2.23 Hand-drawn restyling of a symbol set (Rune Generator)
Source: `37063263/post.md` + `images/02.png`. Source code published:
`https://github.com/watabou/RuneGeneratorOS` (Haxe + OpenFL, GPL as usual).

[SHOWN] The image is a 8×3 alphabet drawn twice: above in the original **bitmap/pixel** form, below
in a **hand-drawn** form with identical topology — the same strokes, but with rounded joins, round
caps, slight curvature and small overshoots. Nothing changes structurally; only the stroke
realisation.

[STATED] *"For some reason I find it an interesting problem to 'hand-draw' anything :)"* and the rune
algorithm is *"very straightforward"*. Later (`52012066`, `53106327`) he tries to generalise it into a
**Glyph Generator**, twice, and shelves it: *"It is relatively easy to make a generator for a specific
type of symbols… What is a really interesting task is to make a generator capable of producing
diverse, internally consistent sets of symbols."* [NAMED-ONLY]

Relevance to settlement maps: this is the same "vector skeleton → hand-drawn realisation" separation
that PS uses for its map symbols, and it argues for keeping symbol *topology* and symbol *stroke
style* as two independent layers.

---

### 2.24 Small things worth stealing
- **Building counter.** [STATED, `28088976` comment] In MFCG, *"To get a total count you can press
  and hold the space bar - it will be displayed at the top left corner of the window."* Later
  (`64375271` comment, 2022-03-30) he agrees to add building counters to NG and VG, wondering only
  *"how to display the value because a window with a single number looks... sad."*
- **Map size as a tag, and its cost.** [STATED, `44405211`] *"Small maps are probably useless, but
  cute. The default size is medium. Large maps are slower to generate (or to draw - I didn't check)
  and they usually contain too many villages and towns."*
- **Label count is a real performance limit.** [STATED, `60165082`] Hex numbering was postponed
  because *"placing a thousand text labels on a map visibly slowed everything"*.
- **Perspective / tilted view.** [NAMED-ONLY, `60165082`] Suggested on Twitter, tested, *"surprisingly
  good"*, deferred. PS already had a "map tilting" toggle in 2020 (`41103311` P.S.).
- **Grid over vs under.** [STATED, `41103311` P.S.] *"The grid can be displayed **over** the islands,
  not only **under** them."* [SHOWN] `60165082/images/02.png` shows the hex grid drawn over land and
  sea alike.
- **Matte.** [SHOWN, `55050649/images/02.png`] A toggleable *Matte* — the paper-coloured border frame
  around the map.

---

## 3. Visual and style conventions observed

**MFCG, 0.7.2 era** (`29161908/images/02.png`, "Flowerton", 2832×2961 — the best single reference
in this slice):
- Paper: warm pink-beige. Buildings: grey-green fill, thin darker outline, no hatching. Streets,
  plazas and block courtyards: a lighter cream than the paper. One district highlighted in olive
  (selection state).
- City wall: a thick near-black band with small crenellation ticks on the outer face, square towers
  at the polygon vertices, gates where radial roads pierce it. The wall polygon is ~16-sided,
  roughly circular.
- River: pale sage band, darker outline, a lighter core stripe; it runs off both edges of the frame.
- Farmland: polygons filled with **parallel line hatching**, the hatch angle randomised per field;
  fields tile the hinterland with a stretched, roughly rectangular grain.
- Roads outside the wall: thin double lines.
- **Labels are the signature.** District names, street names and the river name are set in an
  outlined serif **small-caps**, letter-spaced and **rotated glyph-by-glyph along a curved spine**
  (district labels follow the district's long axis; the river label follows the river). Every label
  carries a light halo so it survives over texture.
- Title top-centre in a serif face; compass rose top-right (8-point star inside a segmented ring);
  scale bar bottom-left with alternating filled/empty cells labelled 100…500 yd.
- Suburbs spill outside the gates along the roads; blocks everywhere are **rings of buildings around
  a cream courtyard**.

**MFCG rendered through City Viewer's top-down mode** (`34061942/images/03.png`): the same map logic
with orange-tan buildings, **soft gradient cast shadows to the lower-right**, dark teal wall with
round towers, cream streets, a green park polygon, a pale grey plaza, teal river. This is where the
"shadowed buildings" look that later pervades VG/NG comes from.

**Village Generator, "Vivid"** (`43602231/images/05.png`, "Ottersund, Pop. 810"):
- Ground light green with a lighter clearing tint; parcel boundaries as plain thin dark lines
  subdividing the ground.
- Woods as **bubbly canopy clusters**: many overlapping small lobes, dark outline, two greens
  (`forestLight`/`forestDark`), each with a soft drop shadow down-right.
- Buildings: small rose/pink rectangles, dark outline, fine roof hatch; mostly aligned to the road.
  One larger hatched building near the centre.
- Roads: pale tan ribbons with a thin dark outline, width varying by importance; **dashed lines are
  footpaths**.
- Water: teal, a lighter **shallow band** at the shore, a dashed off-white line just offshore
  (`waterTide`/Ripples), and a narrow **sand** strip at the waterline. Piers are plain tan bars.
- A diagonally hatched pale-green patch = fields (`hachureLight`/`hachureDark`).
- Title top-left: serif small-caps name + "POP. nnn".

**Neighbourhood Generator** (`58808794/images/03.png`, `59046807/images/03.png`, `04.png`,
`64375271/images/03.png`, `04.png`):
- Warm grey-beige ground; streets as pale cream ribbons with a thin outline and varying width, or —
  with the cobbles option — filled with **small grey pebble ellipses**, each outlined.
- Buildings: brown/terracotta (or slate in the night preset), heavy outline, **fine parallel roof
  hatch perpendicular to the ridge**, two roof tones per building, drop shadow to the lower-right.
  They form **continuous terraces with an uneven front line** (§2.4).
- Block interiors that are not built: pale sage **yards** with clusters of round tree canopies
  (dark-outlined, shaded, shadowed).
- Landmarks: a block-filling building with a **circular cupola** drawn as concentric rings.
- Small square marker at plazas (a well/monument).
- Night preset: dark blue-grey ground, slate buildings, pale blue cobbles, and a **yellow glow
  bleeding from every street** (the `Lights` colour), plus a large soft dark shadow under the whole
  neighbourhood.
- Title top-left in a condensed geometric sans (NG) — note the 2021-03 prototypes instead used a
  centred serif title inside a thin rectangular frame.
- **The layer stack is palette-invertible, and this is worth noting explicitly.** In "Old Ward"
  (`58808794/images/03.png`) the paper is the ground and the **streets are filled cream ribbons**
  drawn on top. In "Pearl Ward" (`58808794/images/04.png`) the same generator renders the **block
  polygons as filled tan shapes** and leaves the streets as bare paper, so the ward reads as a
  landmass floating above the page — complete with a drop shadow under the block polygons
  themselves. Both are the same stack
  `paper → block/yard fill → street fill → trees → buildings+roofs → shadows`
  with different colours assigned; a re-implementation must keep all of those as separately
  colourable layers rather than deciding once whether streets or blocks are "the filled thing".
- [SHOWN] "Pearl Ward" also contains several **hollow building rings** — a closed rectangle of
  terraced buildings around a small internal void — i.e. the block→building bisection sometimes
  produces a courtyard building rather than a solid terrace.

**Perilous Shores / Regional Maps**:
- 2020-08 prototype (`40742440/images/04.png`, `06.png`): pure black on white, double-ruled frame.
  Water = rows of short **wavy strokes parallel to the coast**, dense near shore, fading outward.
  Coast = one bold irregular line, sometimes with a **dashed offset contour just inside** it.
  Mountains = outlined peaks with parallel hachure on one flank, overlapped into ranges. Two tree
  symbols: deciduous (small oval on a stem with two ground ticks) and conifer (tiered triangle).
  Grass = three short strokes. Settlements = 2–3 little gabled buildings, one with a spire, walls
  filled with vertical hatch, roofs left white. Hex grid as a light grey overlay, sometimes only
  over water.
- 2020-11 onward: **new mountains** — two-tone filled triangles (lit face vs shaded face) or
  gradient-filled peaks, with a *Jagged*/smooth toggle from 1.3.0.
- Colour presets from 1.1.3: "Chocolate" (brown land, cream paper), "Cartoon" (tan land, sage sea,
  dark green forest blobs, white-walled red-roofed houses), sepia, grey-blue.
- Coast band: land edge gets a pale **shore band**, then the dashed shallow edge, then wave rows.
- Icons: settlement = gabled houses (+ red pennant for towns/cities), danger = **white skull**,
  castle/keep = crenellated block. Legend pins = dark filled circles/hexagons with white numerals.
- Legend set in a handwritten face; title in Playfair Display; matte frame around everything.
- Roads = fine dotted lines.
- The whole island can carry a soft **drop shadow** on dark backgrounds.

**1PDG** (`30565716/images/02.png`, `31488942/images/02.png`, `52012066/images/03.png`,
`55959636/images/02.png`): rooms as white polygons with a dotted square grid inside, a heavy
outline, and a **Dyson hatch band outside**; doors as small light rectangles in the wall; secret
doors as small black squares; water as pale wobbly shapes inside rooms; a compass-star medallion in
special rooms; note bubbles with leader lines; a thin outer frame and an italic serif story hook
under the title. Colour is a single hue (blue-grey, ink-blue) plus paper.

**City Viewer** (`33794567/images/02.png`, `45360377/images/04.png`, `05.png`,
`64845431/images/03.png`, `04.png`, `05.png`): flat-shaded low-poly, no textures; ground a single
colour; fields as **rounded-corner polygons**; roads as flat ribbons; trees as ellipsoids or cones;
sky a vertical gradient from `Zenith color` to `Horizon color` with a soft sun disc; distance fog
toward the horizon colour; windows as small dark squares. The "Macro"/orthographic view renders NG
neighbourhoods as a tabletop diorama.

---

## 4. Creator's stated design philosophy and constraints

1. **Simplicity over simulation.** [`41103311`] *"it's a pretty naive map generator — no tectonics,
   no fancy precipitation models, no erosion. I don't think introducing any of them would make these
   maps more naturalistic (let alone more interesting). With such a low mesh resolution, apophenia
   works better than detailed simulation."* And on raw Perlin: *"For me it's the perfect amount of
   simplicity."*
2. **Legibility beats realism, and the map is a picture first.** [`44405211`] map labels were
   abandoned for a legend purely because *"everything got too noisy"*. [`55959636`] water stopped
   being grid-aligned because *"It didn't look much like water."*
3. **One parameterised renderer, styles as data.** [`43602231`] Four hand-written styles were killed
   because they blocked SVG export and because *"Vivid … can approximate the other ones pretty well"*
   through palette editing alone.
4. **Prototype in a throwaway app before touching the flagship.** [`34822131`] curved streets moved
   to *"an alternative city generator-editor"* because retrofitting MFCG was *"too risky"*;
   [`53106327` comment] NG exists *"to use it for testing the 'recursive bisection with a twist'
   algorithm before transplanting it into MFCG."*
5. **Architecture stability gates features.** [`32650629` comment] JSON save/load waits because
   *"I don't want to do it before the architecture is stable (currently it is not)"*;
   [`34822131` comment] user-placed castles wait because the feature *"is closely intertwined with
   the basic architecture of the generator and that architecture is changing constantly."*
6. **Parameter creep is acknowledged and half-resisted.** [`53482923`] *"I'm not sure that adding a
   bazillion of parameters to customize is a good idea, but after adding one it's hard to stop."*
   Counterweight: unused options are deleted (1PDG's "improved strokes", "precise hatching")
   *"because nobody used them anyway."*
7. **Diversity of output now outranks fidelity of stroke.** [`60165082`] He deliberately simplified
   the drawing code, losing nuances, to make new visual features cheap.
8. **Information density, not prettiness, is the measure of a map.** [`59046807`] *"I know these
   neighbourhood maps are perceived as more detailed than MFCG's city maps, but in reality they are
   not. They look better, but they don't provide more information per square unit."* And his test for
   whether a generator is worth building is *"what kind of action takes place exactly in a
   neighbourhood?"*
9. **Visual noise is a hard ceiling on detail.** [`58808794` comment, 2022-02-05] *"a whole city drawn
   like this with all these trees and cobblestones would look too visually noisy, wouldn't it?"*
10. **Named things feel real.** [`59864807`] *"giving a name to anything makes it more legitimate."*
11. **Consistency requirement scales with map scale.** [`55050649`] neighbouring dungeon rooms may be
    arbitrary; neighbouring settlements may not.
12. **Tech stack, stated repeatedly.** Haxe + OpenFL (`53482923` comment, `37063263`); a move toward
    SVG-based drawing and an Electron desktop build was contemplated in 2019 (`28088976`).

---

## 5. Useful facts harvested from comment threads

- **`31716880` (2020-03-15, creator)** — the two-layer hatch mask, quoted in full in §2.8. The single
  most valuable comment in this slice.
- **`31716880` (2025-01-09, creator)** — grid drawing: either a full grid plus an SVG `clipPath`
  mask, or draw only the visible part, *"Since a regular grid is just a set of horizontal and
  vertical lines, this is easy enough."* Also: the cave-painter code no longer exists.
- **`53106327` (2021-07-03, creator)** — NG's charter: *"There will be a neighbourhood generator, but
  it will be a pretty compact thing… I'm going to use it for testing the 'recursive bisection with a
  twist' algorithm before transplanting it into MFCG."*
- **`28088976` (2019-07-04, creator)** — hold space bar in MFCG for a total building count.
- **`32650629` (2019-12-29, creator)** — Procgen Mansion *"was created to generate more interesting
  buildings in Toy Town (in the original one). In practice it may be too difficult to integrate."*
- **`34822131` (2020-03-22, creator)** — user-editable placement of castles etc. is blocked by
  architecture churn; *"Lately people started asking about it more often, so I guess I need to raise
  the priority."*
- **`49191011` (2021-03-25, Heath Rezabek)** — the T-vs-X junction critique and the
  planned-vs-organic street-hierarchy proposal. Watabou's reply (2021-03-26) on shaping a district:
  *"I can generate a 'district' of any shape this way, so..."* — i.e. the bisection accepts an
  arbitrary boundary polygon.
- **`43602231` (2020-11-06/07, multiple)** — the users' reason for wanting non-Vivid styles is
  round-tripping into Photoshop / Campaign Cartographer / Inkarnate, not aesthetics; several change
  their vote once the palette JSONs are attached. Argument for making *export-friendly monochrome a
  preset*, not a separate renderer.
- **`45360377` (2021-01-09, creator)** — a modern/futuristic City Viewer *"wouldn't look much
  different from medieval ones"* at his level of detail; also mentions generating script-like images
  *"with a tweaked version of my code for trees"* — trees and glyphs share a branching generator.
- **`60165082` (2021-12-21, creator)** — asked about updating the open-source `TownGeneratorOS`:
  *"Won't happen anytime soon, sorry :)"*. The 2017 ancestor is frozen.
- **`60165082` (2022-01-13, creator)** — settlement *kind* is no longer part of the name string.
- **`64375271` (2022-04-07/08, creator)** — on ruined buildings: *"in MFCG everything is pretty
  abstract and I could draw ruined buildings just lighter (or darker). But in Neighbourhoods this
  needs to be more concrete."* Suggested by the user: a hollow, fragmented footprint plus a rubble
  underlay. He puts NG first in line for it.
- **`64845431` (2022-04-08, creator)** — Procgen Mansion will get *"an alternative way of room
  generation (like in Dark Clues)"*, and he wants to keep PM's focus on the exterior.
- **`58808794` / `59046807` (multiple users)** — the strongest recurring feature request in this
  slice is **MFCG districts rendered at NG fidelity, stitched into a whole city**, with matching
  roads across seams. Watabou resists it on visual-noise grounds.

---

## 6. Open questions a re-implementer must decide

**Bent bisection (highest value, least specified).**
1. How are the two endpoint edges of a cut chosen (longest? opposite? area-balancing?), and where on
   each edge does the cut land?
2. Where is the bend placed and how large is the lateral deviation? Is it one bend, or one per
   "leg" with the count depending on cut length?
3. What is the recursion stopping predicate — area, minimum width, depth, or a mixture — and how does
   it differ between district→block and block→building?
4. How is street width assigned per cut? Recursion depth seems likely but is never stated.
5. What is the rejection filter for "very weird" building shapes, and what happens to the rejected
   lot — discarded, merged with a neighbour, or re-cut?
6. On smooth boundaries, is the cut a Bézier/Catmull-Rom through perpendicular tangents, an arc
   blend, or a Chaikin-smoothed polyline? The images are consistent with any of these.

**Perilous Shores.**
7. Perlin parameters (octaves, base frequency, persistence), the radial gradient's exact profile and
   weight, and the land threshold.
8. The altitude→mountain-probability curve, and what "more connected highland" means for the
   landlocked template.
9. River count vs island size; the definition of an "eligible" coastal vertex; whether the uphill
   walk is greedy or a search; how "the longest are chosen" interacts with the anti-parallel fix.
10. Forest/swamp seed counts, propagation probabilities, the river-crossing penalty, and how the two
    compete for the same cell.
11. Mesh resolution per map size, and the hex orientation (the drawn grids in `41103311/images/01.png`
    and `40742440/images/05.png` do not obviously agree; I could not settle flat-top vs pointy-top
    with confidence).

**Rendering.**
12. Dyson hatching: Poisson radius relative to feature size, band depth, stroke length : intra-cluster
    spacing ratio, stroke curvature/taper profile, cluster angle distribution.
13. Forest blobs: scallop arc length and radius distribution, how holes are chosen, whether the
    scallops are arcs or quadratic Béziers.
14. The uneven-streetwall method (the creator himself calls it doubtful and never describes it).
15. Exact meaning of `Colour variance` (HSL jitter? which channels? clamped how?) and of `Lights`
    (glow radius, falloff, blend mode).
16. Shadow model: offset vector vs "Shadow length", blur radius, and whether `shadowAlpha` 0 removes
    the layer or just makes it transparent.

**Data model.**
17. The precise JSON schema MFCG/VG/NG export for City Viewer — field names, whether building height
    is storeys or units, what "simple" vs "complex" buildings means structurally, how walls encode
    towers and gates.
18. Whether fields/farms are generated as rounded polygons or rounded at draw time (CV shows rounded
    corners; the MFCG 2-D map shows hatched polygons with sharp corners — suggesting the rounding is
    a rendering choice, but this is unverified).
19. Whether MFCG's "outside the frame exists" and VG's "nothing outside the frame" difference is a
    data-model difference or only a generation-extent difference.

**Not in this slice — expect it elsewhere.** The straight-skeleton post (`101173551`), the Urban
Places posts, the MFCG devlogs, and the two curated collections should carry: roof construction from
straight skeletons, curved-label spines, ward/district typing, wall and gate placement, and the
post-2022 NG/MFCG convergence.
