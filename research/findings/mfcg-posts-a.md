# MFCG — watabou Patreon "🏰 City Generator" collection, OLDER half (slice `mfcg-posts-a`)

Extraction pass. Sources: `research/patreon/watabou-city/<post_id>/post.md` (body + full comment thread) and
`research/patreon/watabou-city/<post_id>/images/NN.png`. 15 posts, 2019-06-11 → 2021-02-03, covering
MFCG **0.7.0 → 0.8.1**, plus City Viewer 1.0.2, Village Generator 1.1.1 and the City Painter prototype.

**Coverage receipt.** All 15 `post.md` files read in full including comment threads. All 69 images opened with the
Read tool. Two images are byte-identical duplicates of their neighbours (verified by md5): `37407181/images/05.png`
== `04.png` (md5 `68896502e4f4bfdc49694253027a17a1`), `40345972/images/08.png` == `05.png`
(md5 `710b71ca457ed3355a3978f2aec8a552`); both were nonetheless opened separately. No captured JS bundle was opened.

**Evidence tags used throughout:** `[STATED]` creator describes the method in words · `[SHOWN]` visible in an image
but not explained · `[INFERRED]` my reconstruction, reasoning given · `[NAMED-ONLY]` feature announced, no method.

---

## 1. Chronological table

| # | Date | Post id | Title | Version | What changed (relative to the previous iteration) |
|---|------|---------|-------|---------|---------------------------------------------------|
| 1 | 2019-06-11 | 27564017 | Medieval Fantasy City Generator 0.7.0: Districts | 0.7.0 | **Districts** replace the older *neighborhoods*. Districts carry a proper generated name each; neighborhoods did not. Release announcement only; method is in the linked itch devlog (85275), not in this post. |
| 2 | 2019-06-20 | 27776897 | Arced District Labels in MFCG | (tutorial) | Full algorithm write-up for curved district labels: OBB → two orthogonal cuts → circular arc whose radius is derived from the offset between label centre and polygon centroid. The single most method-dense post in this slice. |
| 3 | 2019-07-22 | 28565641 | MFCG 0.7.1: Editable district names | 0.7.1 | District names become user-editable. "Actually it's the only visible new feature." |
| 4 | 2019-08-29 | 29538966 | Progress on 0.7.2 | WIP | Palette widened to **7 colours** (paper/light/medium/dark + roofs/water/green). UI font switched from the bitmap "Maroubra" to vector **Archivo Narrow**. New **"Raised"** building style (drop-shadow relief). **Compass rose** added, and it is *functional* — it rotates the map. Announced intents: noise-based complex shorelines (explicitly *no* islands, *no* landlocked lakes) and "quadrilateral meshes" for less chaotic layouts. |
| 5 | 2019-09-08 | 29813424 | Complex shorelines and curved streets | WIP | Reveals that the **current shoreline is always "a rough parabola"**: facing the city centre ⇒ peninsula, facing away ⇒ bay. Shows 4 experimental complex shorelines and 2 experimental curved-street networks built in a *separate* application. Curved streets slip out of 0.7.2 because "this streets generation method works very differently comparing to the old one and adopting it will affect all parts of the generator". |
| 6 | 2019-09-25 | 30234656 | MFCG 0.7.2: lots of small visual changes | 0.7.2 | Ships the visual batch from #4. Comment thread yields the key structural fact: **roads are drawn only outside the city; inside the city roads are merely the gaps between buildings.** |
| 7 | 2019-12-01 | 32000161 | MFCG 0.7.3: bug fixes, GeoJSON export | 0.7.3 | **GeoJSON export.** Screenshot shows the export loaded in geojson.io: `Feature` objects with `properties.id` (e.g. `"rivers"`) and geometry types such as `MultiLineString`; coordinates are real lon/lat placed near 20.00°E / 40.01°N. |
| 8 | 2020-05-22 | 37407181 | MFCG, VG and CityViewer have been updated | 0.7.5 | Outskirt buildings now placed by a **Village-Generator-like algorithm** → sparser but *proper rectangles*. **Road becomes its own palette colour** (also applied to bridges and squares). District names editable inside the legend box. City Viewer 1.0.2 gains piers, small bridges, monuments, water gates, **square towers** (tower shape is an *environmental* parameter: "midlands"=5 always round, "desert"=6 always square). VG 1.1.1 gains JSON export. **Exchange format abandons strict GeoJSON** for a "GeoJSON-like" format. |
| 9 | 2020-06-09 | 38048182 | MFCG 0.7.6: landmarks | 0.7.6 | **Landmarks** — manually placed named POIs drawn as Google-Maps-style teardrop pins, optionally listed in the legend; bulk import from a JSON array of strings scatters them randomly. Legend refactored into a general element container. Also: farmhouses no longer land in the middle of fields; **city-wall shape improved, "fewer unrealistic sawtooths"**; better district ordering; outskirt blocks built faster; larger exported PNGs. |
| 10 | 2020-07-25 | 39697187 | City Painter prototype | (spin-off) | Manual editor built on "the same ideas as in MFCG". Its tool palette exposes MFCG's underlying data structure: cells, edges, and mesh surgery. States plainly what MFCG *cannot* do: islands, non-circular city outlines, non-radial roads, multiple/non-ring walls, multiple or freely-placed castles. |
| 11 | 2020-08-11 | 40345972 | MFCG 0.7.7: inner castles, improved warping | 0.7.7 | **Inner castles** (castle wholly inside the city rather than welded into the city wall) — "surprisingly hard" to make compatible with every parameter combination. **Greens** (ex-parks) become optional; greens are sometimes deliberately placed *in front of* an inner castle to give it breathing room. **Rivers made more curvilinear**, more secondary bridges (new bug: buildings overlap the river). Custom palettes editable in-app. **Warp mode gains 7 tools**: Displace, Liquify, Rotate, Relax, Bloat, Equalize, Measure. Map rotation decoupled from compass rotation. |
| 12 | 2020-09-17 | 41711473 | MFCG 0.8.0: new buildings, improved UI | 0.8.0 | **New lot/building algorithm based on a Voronoi diagram**, replacing recursive bisection of the block shape (whose defect was "a lot of triangles or triangle-looking quadrangles"). Ships **disabled by default** (`Options > Style > Buildings > Improved lots`) because it "crashes the generator occasionally". Context menu added (e.g. *Reroll geometry* on a castle); legend repositionable. Minor unlisted changes to complex buildings and street layouts. Note: the **curved streets of post #5 did not ship here** — the 0.8.x version bump is attributed to the lots algorithm. |
| 13 | 2021-01-10 | 46041997 | Desktop versions of MFCG, VG and 1PDG | — | Patron-only; body not archived. Attachment metadata shows Win+Mac builds: `mfcg.zip` 6.85 MB, `vg.zip` 6.56 MB, `1pdg.zip` 6.66 MB, `patientrogue.zip` 6.58 MB plus `-mac` variants (~6.8–7.1 MB). Teaser: "here are desktop offline versions of MFCG, VG and 1PDG…". |
| 14 | 2021-01-27 | 46685301 | Progress on 0.8.1 and plans for the desktop version | WIP | UI history stated in three eras (no UI → hotkeys+size buttons → hierarchical menu) and the replacement: three independent floating windows **Generate / Settlement / Style** plus a genuinely context-aware right-click menu. Desktop plan changes from "one big port of a finished algorithm" to incremental, because "that algorithmic basis keeps changing and today it is not more stable than it was 2 years ago". |
| 15 | 2021-02-03 | 47063541 | MFCG 0.8.1: major UI changes | 0.8.1 | New UI ships. Previously URL-only parameters surface: **size in wards** (min 5, max 200 — stated in comments), **explicit road count** (including zero roads), Copy URL / From URL round-trip (lossy: edits are not encoded). No new generation features. |

---

## 2. Techniques

### T1 — Arced district labels (OBB + double bisection + circular arc)
Source: `27776897/post.md`, images `01`–`07` (and `08`–`14`, the same figures at 960×720 / 1280×800).
**Tag: [STATED]** for the pipeline; **[INFERRED]** for the exact radius formula.

**Problem.** A district is an arbitrary polygon (often concave, elongated, banana-shaped). A horizontal label at the
centroid is "boring" and often falls outside the shape or across its thin waist. Wanted: a label that follows the
shape's spine, cartographer-style.

**Algorithm, as recoverable:**

1. **Oriented bounding box (OBB).** Compute the minimum-area enclosing rectangle of the district polygon. Watabou:
   *"a rectangle of minimum area enclosing the shape. Oriented bounding box (obb) gives us a good estimation of the
   shape's orientation and how elongated it is. We are going to use its orientation as an orientation for the label."*
   Image `03`/`09` shows the OBB drawn as a thin rectangle tilted to the shape, its long axis and short axis drawn as
   dashed centre lines, plus a **green dot = the polygon centroid** (visibly *not* at the OBB centre).
   *Standard construction (not stated):* rotating-calipers over the convex hull — the minimum-area rectangle is flush
   with a hull edge, so testing one orientation per hull edge is exact and O(h). **[INFERRED]**
2. **Cut #1 — fixes the label's "vertical" position.** Intersect the polygon with the OBB's **central line along the
   short side** (i.e. the line through the OBB centre, parallel to the short side / perpendicular to the long axis).
   Take the resulting segment; its midpoint is the **"vertical position" of the label** (tiny blue dot in image
   `04`/`10`). This is what makes the label sit on the shape's *material* rather than on the box's geometric middle.
3. **Cut #2 — fixes the label's span.** Intersect the polygon with the line along the **other** axis (parallel to the
   OBB's long axis) — crucially **not through the OBB centre, but through the point found in step 2**. Image
   `05`/`11`. The resulting segment is the **span of the label**; its midpoint is the **label centre** (blue dot).
   So the label length budget is measured *inside the polygon*, not inside the box.
4. **Decide the bend.** Image `06`/`12` shows the straight label in place. The label is bent **towards the centroid**:
   *"we need to 'bend' it upwards, because the centroid is above the central point of the label i.e. there are more of
   the shape up there so to speak."* The arc is therefore convex toward the mass of the polygon.
5. **Arc radius.** *"I use a formula which produces infinity (i.e. we get a linear label) when the center of the label
   coincides with the centroid, and the height of the obb when they are on the opposite sides of it (vertically)."*
   Image `07`/`13` shows the finished arced label with the construction circle faintly drawn.

   **Recoverable constraints on the formula** (let `h` = OBB extent along the short axis, `d` = signed offset between
   label centre and centroid measured along the short axis, positive toward the centroid):
   - `R(d = 0) = ∞` ⇒ straight label;
   - `R` at maximum separation = `h`;
   - sign of `d` selects which way the arc bows.

   **[INFERRED]** The minimal function meeting both endpoints is `R = h² / |d|`, i.e. curvature `κ = |d| / h²`, with the
   arc centre placed on the opposite side of the label from the centroid at distance `R`. If "opposite sides of it"
   means opposite sides of the OBB *centre line* (so `|d|` maxes at `h/2`), the formula is instead `R = h² / (2|d|)`.
   Both are the same one-parameter family `R = C/|d|` differing only in `C`; a re-implementer must pick one and tune.
   The swept angle then follows from the span: `θ = L_span / R`, and glyphs are laid along that arc.

**Parameters / constants:** none numeric are given. Explicitly **not** used: font height — *"I don't take the size
(height) of the font into account, I assume it's more important to consider the length of a label."*

**Known failure modes and handling.**
- Creator's own framing: *"In many cases it produces results which are far from perfect… Simplicity is its advantage,
  not technical perfection."* No retry/discard machinery is described — the label is simply drawn as computed. **[STATED]**
- The worked example is chosen because it is *"relatively simple — no holes, no weird branches."* Holes and branchy
  shapes are the acknowledged hard cases. **[STATED]**
- **[INFERRED]** For a concave district, either cut line can meet the polygon in *several* disjoint segments; the post
  says "the resulting segment" (singular). A re-implementer must decide: longest segment, the segment containing the
  OBB centre, or union-span. This is a real divergence point.
- **[STATED]** No multi-line labels exist in MFCG: *"There are no multi-line labels in MFCG. That is a task for the
  future as most district names are two-word ones."* Two-word names are therefore set on a single arc, which is why
  letter-spacing is wide in the rendered maps.

**Alternative the creator points at:** Veltman's *centerline-labeling* (observablehq.com/@veltman/centerline-labeling),
credited to Azgaar — described as *"very complex, but still elegant"*. That method is straight-skeleton based; watabou
explicitly chose the cheap OBB approach instead. **[STATED]**

**Stated next step:** *"I'm going to try implementing non-arc labels roughly in the same way, it shouldn't be too hard."*

**Unknown for a re-implementer:** exact radius constant; segment-selection rule under concavity; how the label is
clipped/shrunk when the text is longer than the span (nothing is said — possibly it just overflows); whether the arc is
re-evaluated after warping.

---

### T2 — Districts as a named partition of the city
Source: `27564017/post.md`; visible in `29538966/04`, `38048182/01–03`, `40345972/01,06,07`, `46685301/01,03`,
`41711473/02,04`, `47063541/01,02`. **Tag: [NAMED-ONLY]** for the partition method; **[SHOWN]** for its rendering.

**Problem.** Give a city map legible sub-areas with names, instead of undifferentiated sprawl.

What is recoverable: districts supersede "neighborhoods"; each has a proper generated name; they are *editable*
(0.7.1) and editable from inside the legend (0.7.5); they are *ordered* ("Better district ordering (which is visible
only when the legend is on)", 0.7.6); they are numbered 1..N in the legend and marked on the map by a filled disc
bearing the number. Counts observed: 6 (Privenink Fort, Boake-Mily), 7 (Mourch Quay, Chary's Hill, Whater), 8
(Goldfire Castle). **[SHOWN]**

Rendering: every building inside a district is tinted with that district's colour. In *Whater* (`46685301/01,03`) the
district tints are strongly differentiated (violet, olive-green, warm brown, sage); in *Privenink Fort*
(`38048182/02,03`) they are values of one hue; in *Mourch Quay* (`40345972/06`) they are near-identical greys with the
distinction carried by the arced labels alone. So district colour appears to be a *style-level* choice, not fixed.
**[SHOWN]**

District names seen: Old District / Old Ward / Old Town, Military Ward, Feypole, North Road, The Port, East Road,
The Green, Castle Town, The Brooks, South Bank, Catrow, Lighthouse, Twilight Water, Westgate, Southway, Elmplace,
The Docks, Trade Town, Ivy Wall, Darkcliff, North District, Knight's Pass, Timber Meadow, The Crest, Storm Water,
South Way, Redbank, Vilven's Road, Darkbridge, Stormpark, Citadel, Fog Valley, Blackhorn, Highbridge, The Rocks,
Moonwood, Lost Mire, Winter Gate, Spicewood, The Ridge, Castle Quarter. The grammar is visibly
`{article?} {adj|noun} {noun}` with a strong bias toward: compass word, water word, tree/plant word, trade word, and
`<Name>'s Road`. Names are rerollable as a *set* (`Reroll names → Districts`). **[SHOWN]**

**Unknown:** how districts are derived from the mesh (one cell each? a clustering of cells? a flood fill from gates?);
what the "better ordering" key is (my guess: clockwise from north, or by area — not stated).

---

### T3 — The underlying mesh: cells, edges, and what a castle occupies
Sources: `40345972/03` and `40345972/09` (warp mode with the mesh drawn), `39697187/01–04` (City Painter tools),
and the creator comment in `41711473/post.md`. **Tag: [SHOWN] + [STATED]**.

This is the most load-bearing structural finding in the slice, and it comes from screenshots rather than prose.

- `40345972/09` (1920×960) shows Warp mode with the mesh overlaid in **red**: a planar subdivision of large polygons
  (roughly ward-sized, 6–9 sides each), vertices drawn as red square handles, edges as red double lines. The red edges
  **coincide with the roads/streets** — the cream gaps between building blocks lie exactly on mesh edges. The buildings
  fill the cell interiors. **[SHOWN]**
- The **castle occupies exactly one mesh cell**: in `40345972/03,09` the black castle wall traces a single red heptagon
  precisely. Confirmed verbally in `41711473` comments: *"It's not hard to make the size of a keep (the shape inside
  castle walls) adjustable, but not the size of the whole castle — **it always occupies one cell of the mesh**."*
  **[STATED]**
- Warping moves **vertices only**: *"warping is still just warping. You can't change the topology of a mesh, you can't
  merge or split cell as in City Painter."* **[STATED]**
- City Painter's tool list (`39697187/01–04`) enumerates the operations the data structure supports:
  **Paint cells · Draw edges · Select edges · Build path · Collapse edges · Merge cells · Cut cells · Selection ·
  Relax mesh · Pinch mesh · New mesh**, with a **Palette** of cell/edge paints (`Borough`, `Farm`, `Road`). **[SHOWN]**
  - `Paint cells` + paint `Borough` ⇒ that cell fills with a cluster of buildings (`39697187/02,04`).
  - `Paint cells` + paint `Farm` ⇒ that cell fills with hatched strip-fields (`39697187/02,04`).
  - Paints applied to **edges** produce roads and (in the tips) built paths: *"Build path tool doesn't draw the path,
    it only selects the edges it consists of. Choose Selection > Fill to draw a built path with the current edge
    paint."* ⇒ **a road is a selected chain of mesh edges that is then rendered.** **[STATED]**
  - `shift+click` on a cell = flood-fill an enclosed area; `ctrl+click` = eyedropper; `shift+click` while *selecting
    edges* = select the whole circumference of a cluster of same-painted cells ⇒ **a city wall is the boundary chain of
    a set of cells.** *"you can paint a city with 'Borough', then choose 'Select edges' and shift+click any cell of it
    to select the city border."* **[STATED]**
- **[INFERRED]** Putting these together, MFCG's city is: a relaxed Voronoi-ish planar mesh over a disc; cells are
  typed (borough / farm / water / green / castle / plaza); edges are typed (road / wall / bridge / plain); the wall is
  the boundary cycle of the "inside" cell set; the castle is one cell whose boundary is walled; roads are edge chains
  from a gate outward. This matches the visible geometry in `40345972/09` and the affordances of City Painter exactly,
  and is consistent with the 2017 open-source ancestor's ward/Voronoi approach.
- Mesh hygiene tools exist because degenerate cells occur: **Relax** (*"may be useful to fix too short mesh edges"*),
  **Equalize** (*"Makes a single cell more regular in shape equalizing its angles. Use it to automatically fix weird
  shapes."*), **Bloat**, **Pinch**. **[STATED]**

**Unknown:** how the mesh is seeded (Poisson-disc? jittered polar grid? Lloyd relaxation count?), what the cell count
is per "ward", whether the mesh is generated in polar coordinates (which would explain the radial road pattern and the
"circular only" limitation), and what "quadrilateral meshes" (post #4) would have replaced it with.

---

### T4 — Warp mode: 7 vertex-level deformation tools
Source: `40345972/post.md`; UI shown in `40345972/03` and `40345972/09`. **Tag: [STATED]** (names + purpose),
**[SHOWN]** (brush geometry).

Tools, verbatim with hotkeys: **Displace (D)** — *"the default tool which works as the whole Warp mode worked before:
grab the nodes and pull"*; **Liquify (L)** — *"similar to the Liquify filter in Photoshop. Basically the same as
Displace but softer"*; **Rotate (R)** — rotates the whole map around its centre; **Relax (X)** — *"'Relaxes' the mesh,
may be useful to fix too short mesh edges"*; **Bloat (B)** — *"make individual cells or groups of cells larger"*;
**Equalize (E)** — *"Makes a single cell more regular in shape equalizing its angles"*; **Measure (M)** — not a warp;
measures distance between two points **in metres**.

The in-app menu in `40345972/09` lists them alphabetically — *Bloat, Displace, Equalize, Liquify, Measure, Rotate,
Relax* — followed by **Apply** and **Discard**, so warping is a **staged, committable edit** (a preview transform that
is applied or thrown away), not immediate mutation. **[SHOWN]**

Brush: `40345972/03,09` show a **green circle** = the effective brush radius, with additional thin red construction
lines beyond it (cell edges extending outside the brush). **[SHOWN]** ⇒ falloff-weighted displacement of vertices
within a radius, Liquify differing from Displace only in the falloff curve. **[INFERRED]**

Related: *"map rotation and compass rotation are decoupled now. Rotating a map doesn't affect the compass. To rotate
the compass hover the mouse cursor over it and roll the scroll wheel."* **[STATED]**

**Failure mode handled by design:** topology is immutable under warp, so no cell can invert or self-intersect
topologically — but geometry can still degenerate, which is exactly what Relax/Equalize are for. Oleg also shows a
patron how to resize a castle by bloating its cell (`http://watabou.ru/images2share/lionarch_castle.png`). **[STATED]**

---

### T5 — Lots / buildings inside a block: bisection → Voronoi
Sources: `41711473/post.md`; before-images `37407181/07` (0.7.5, old algorithm at 3026×2461) and
`38048182/02,03`; after-images `41711473/01,03` (0.8.0 at 1200×600). **Tag: [STATED]** for the change,
**[SHOWN]** for the geometry.

**Old (through 0.7.7): recursive bisection.** *"The problem with the old algorithm based on **recursive bisecting the
original shape of a block** was that it produced a lot of triangles (or 'triangle looking quadrangles')."* **[STATED]**
Visible in `37407181/07`: inside the walls, blocks are chopped into wedge-like quads and outright triangles, with many
acute corners radiating from block vertices.
**[INFERRED]** The classic form of this (and the form in the 2017 open-source ancestor) is: take the block polygon,
pick the longest edge (or the OBB long axis), cut perpendicular to it at a jittered position near the middle, recurse
on both halves until area < threshold; then inset each leaf by a small offset to create the wall gaps. The
"triangle-looking quadrangle" artefact is the signature of cutting a non-convex or already-wedge-shaped leaf again.

**New (0.8.0, opt-in): Voronoi lots.** *"The new one is based on **Voronoi diagram** and it results in a fair amount of
weird shapes, but overall layouts look more natural."* **[STATED]**
`41711473/03` at native 1200×600 shows the result clearly: lots are irregular convex polygons of 4–7 sides, packed so
they tile the block with a thin uniform gap, angles are generally obtuse, and each block commonly retains an interior
paper-coloured **courtyard/void**. Long narrow buildings and L/U/П-shaped "complex buildings" are also present, formed
by what look like merged neighbouring cells. **[SHOWN]**
**[INFERRED]** Reconstruction: scatter seeds inside the block (density set by the target lot size, probably
Poisson-disc or jittered-grid to avoid slivers), compute the Voronoi diagram, clip each cell to the block polygon,
discard cells below an area threshold, inset each remaining cell by a fixed offset to make the footprint, and
optionally union adjacent footprints to make complex buildings.

**Failure modes and how handled.** *"It is not perfect (anything rarely is) and I am going to keep working on it. Also
**it crashes the generator occasionally**. For all these reasons **this new thing is disabled by default** — look for
the Options > Style > Buildings > Improved lots to try it out."* ⇒ the handling is a **feature flag**, not a retry.
**[STATED]**

**The flag survives into the 0.8.1 UI.** `46685301/02,04` shows `Style > Buildings` with checkboxes:
**Tight**, **No triangles**, **Improved lots**, a **Simple** button, and in the right column **No outline**, **Raised**.
In that screenshot *No triangles* and *Improved lots* are both ticked. ⇒ "No triangles" is a *separate* mitigation
that predates and coexists with the Voronoi path — most likely a post-filter that drops or merges degenerate
three-sided lots. **[SHOWN]** / **[INFERRED]**

---

### T6 — Outskirt building placement (Village-Generator algorithm)
Source: `37407181/post.md`; shown at high resolution in `37407181/07`, `38048182/02,03`, `40345972/04,06`.
**Tag: [STATED]** for the swap and its trade-offs; the algorithm itself is **[NAMED-ONLY]** here (it lives in the VG
slice).

*"On the image above you may notice that buildings on the outskirts of the city look differently from the buildings in
the central parts. For their placement within a block I use a new algorithm similar to the one in Village Generator.
The con is that they are placed more sparsely, which is probably OK for semi-rural areas. The pro is that **they all
are proper rectangles**. We'll see how it works."* **[STATED]**

`37407181/07` shows the visual signature precisely: outside the wall, buildings are **free-standing axis-varied
rectangles** with clear ground between them, each rotated to roughly align with the nearest road; inside the wall they
are wall-to-wall irregular lots. Sizes vary about 3:1 within a cluster; a few notably larger rectangles sit at road
junctions. **[SHOWN]**

Follow-up in 0.7.6: *"Outskirt blocks are optimized (i.e. they are built faster)."* ⇒ the sparse-rectangle placement
was a performance cost worth fixing. **[STATED]**

**[INFERRED]** A rectangle-packing-with-rejection loop: sample a candidate position and an orientation snapped to a
nearby road/edge direction, test against already-placed rectangles and the block boundary, keep or reject, stop after
N failures. The "more sparsely" con is exactly what a rejection-sampling packer yields versus a subdivision.

---

### T7 — Farms, fields and farmhouses
Sources: `29538966/03,04,05,06`, `37407181/07`, `40345972/01,02,04,06`, `46685301/01,03`, `47063541/01,02`, plus
`37407181` and `38048182` prose. **Tag: [SHOWN]** for geometry, **[STATED]** for the two fixes.

Geometry, consistently across all releases in the slice: farmland is a **cluster of rounded, blobby convex polygons**
packed against each other in a patchwork, each filled with **unidirectional thin parallel hatch**; the hatch angle is
**constant within one field and varies field-to-field**, which is what sells the "strip fields" look. Field outlines
are drawn in a light tint, not black. Fields sit outside the built-up area, usually on one or two sides only, and are
attached to a road. In `40345972/09` and `47063541/01,02` the hatch is drawn in the palette's water/green colour, not
in the outline colour. **[SHOWN]**

`39697187/02,04` (City Painter) shows the same field patchwork produced by painting a *single mesh cell* with the
`Farm` paint — confirming that a farm patch is a cell-level fill whose internal subdivision is generated, and that the
subdivision is again a small polygon partition with per-part hatch. **[SHOWN]**

Two stated fixes:
- 0.7.6: *"Farmhouses are no longer placed in the middle of farm fields."* **[STATED]**
- 0.7.5 comments, answering a request for bigger farmhouses with adjacent barns: *"in the next update farmhouses will
  be **always touching and aligned to one of the field edges**. They will be of the same size more or less as now, but
  **more elongated**."* **[STATED]** — visible in `40345972/04,06` as tiny elongated rectangles glued to field borders.
- 0.7.7: *"Farms have been changed slightly."* (unspecified). **[STATED]**

A user complaint records a deliberate design constraint: *"I wish it generated more farms than it does… It never feels
like there are enough to support the population."* Oleg: *"In reality cities should be surrounded by farms, but **it
just doesn't look interesting**, not with a fantasy setting in mind anyway. With the new UI my hands are untied so
I'll probably add a parameter how many farms to spawn."* ⇒ **farm density is an aesthetic decision knowingly taken
against realism.** **[STATED]**

---

### T8 — Shorelines: parabola → noise-based complex coast
Source: `29813424/post.md` + images `01`, `03` (2048×1024, four experiment panels). **Tag: [STATED] + [SHOWN]**.

**Old method, stated outright:** *"In the current version of MFCG a **shoreline is always a rough parabola**. When it
faces the center of a city we get a peninsula, otherwise we get a bay."* ⇒ one curve family, one sign bit. **[STATED]**
This is confirmed by every pre-0.7.2 coastal map in the slice (`29538966/03`, `38048182/01–03`, `40345972/01,06`):
the water boundary is a single smooth convex/concave arc crossing the map.

**New experiments:** `29813424/01`/`03` shows four panels of much more complex coasts — lobed peninsulas, re-entrant
bays, a near-isthmus — all still **single-connected** (no islands, no enclosed lakes) and all still rendered with
parallel isolines. Watabou frames it as *"some results of my experiments with more complex shapes"* and flags real
bugs: *"there are many bugs to be fixed (e.g. for some reason **roads are not built when there is a city wall**)"*.
**[STATED]/[SHOWN]**

**Design constraint stated in the previous post (29538966):** *"an algorithm for more interesting **noise-based**
shorelines (**but still no islands or landlocked lakes**)"* ⇒ the method is a noise displacement of a base curve, and
the no-island rule is a deliberate constraint, not an accident. **[STATED]**

**[INFERRED]** A 1-D noise field (fBm/Perlin) evaluated along the parabola's parameter and applied as a normal offset
would produce exactly the lobed-but-simply-connected shapes shown, and would preserve the no-island invariant for
free, which is probably why it was chosen over a 2-D threshold field (marching squares over 2-D noise would generate
islands and lakes, which he explicitly does not want).

**Scheduling decision (a useful engineering data point):** *"I haven't decided about shorelines yet. I could try to
finish complex shorelines quickly, but then I'll have to remake them again after migrating to 'curved streets'."*
Complex shorelines are not announced as shipped anywhere in this slice. **[STATED]**

---

### T9 — Curved streets (experimental, never shipped in this window)
Source: `29813424/post.md` + images `02`, `04` (2048×2048, two panels). **Tag: [STATED]** for the properties,
**[SHOWN]** for the output, method **[NAMED-ONLY]**.

*"I've made good progress with curved streets: currently they look more or less as I wanted them to look and **I can
adjust how smooth or jagged, structured or chaotic they are**. I have yet to try them on a real map: the images above
are made in a **separate application** to not worry about city walls, rivers, coasts etc."* **[STATED]**

`29813424/04` shows the two test networks at 2048×2048: smooth white street ribbons of roughly constant width forming
an irregular, organically curving network; blocks between them are filled with small lots in several tints; a few
large pale polygons read as squares or major buildings. The left panel is visibly more regular/structured, the right
more chaotic — i.e. the two knobs are being demonstrated. **[SHOWN]**

**Two tunable axes are therefore known to exist: smooth↔jagged, structured↔chaotic.** **[STATED]**
**[INFERRED]** "Smooth↔jagged" reads as a subdivision/smoothing pass on a polyline (Chaikin or spline with a
tension/iteration count); "structured↔chaotic" reads as the angular snapping of new street directions (strong snap to
a local grid/parent direction vs. wide random deviation) — this is the standard tensor-field/L-system street knob pair.
Nothing in the post names the method.

**Why it slipped:** *"This streets generation method works very differently comparing to the old (current) one and
adopting it will affect all parts of the generator. I just won't have enough time… So it's more likely to become a
part (the only part?) of 0.8.0 somewhere in October."* — and 0.8.0 (post #12, a year later) shipped Voronoi lots
instead, with only *"some changes in complex building generation and street layouts which are probably not interesting
enough to list here."* ⇒ **curved streets were cut; MFCG's streets remained straight mesh-edge chains in this window.**
**[STATED]** (This is a notable negative result for anyone assuming MFCG has spline streets.)

---

### T10 — Roads: what they are, where they are drawn, how many
Sources: `30234656` comments (the key statement), `37407181/post.md`, `47063541/post.md` and `46685301/01,03`
(the `Roads` tab). **Tag: [STATED]**.

- **The structural fact.** Xariun asks for roads in a separate colour. Oleg: *"It would raise some questions.
  **Currently roads are drawn only outside a city, inside a city they are just gaps between buildings.** Should they be
  drawn with a separate color inside a city as well? If they should, then what about smaller roads, alleys, squares?"*
  ⇒ Inside the walls there is **no road geometry at all** — the street network is *negative space* left by inset lots.
  Only the exterior approach roads are real drawn polylines. **[STATED]**
- **The follow-through (0.7.5).** *"A separate colour can be used now for roads. In all the built-in palettes a 'paper'
  colour is used as a road colour, but in a custom palette you can specify a different value. On the image above roads
  (**along with bridges and squares**) are lighter than the background."* ⇒ the "road" colour channel covers roads +
  bridges + squares, and defaults to = paper so the change is invisible unless overridden. Reference palette shipped
  at `http://fantasycities.watabou.ru/heavy.svg`. **[STATED]**
- **Road count is a parameter.** 0.8.1: *"In addition to 'Default' and 'Maximum' number it is now possible to generate
  a city with a specific number of roads: Generate > Roads > Number. For example, **you can build a city without roads
  at all**."* A `Roads` tab sits beside `Features` in the Generate window (`46685301/01,03`, `47063541/01,02`).
  **[STATED]/[SHOWN]**
- Known bug reported by a user and confirmed by the creator: the road count is forgotten when pressing Enter to
  generate a new city (only *Rebuild* honours it) — *"That piece of logic with the number of roads and rebuilding etc
  is very confusing, but I think I've fixed it."* **[STATED]**
- Roads are **radial** and this is a hard limitation: City Painter's selling point includes *"You can draw roads
  wherever you want, **they don't need to be radial like in MFCG**."* **[STATED]**

**[INFERRED]** Combining with T3: an exterior road is a chain of mesh edges running from a gate outward to the map
border, rendered as a tapering band; "number of roads" = number of gates/spokes chosen on the wall ring.

---

### T11 — Rivers and bridges
Source: `40345972/post.md`; shown in `40345972/02,04,06`, `41711473/01,03`, `47063541/01,02`. **Tag: [STATED]+[SHOWN]**.

*"Rivers have been… improved. It's not something big, they are just a bit **more curvilinear** now i.e. more natural
looking. **Unfortunately sometimes this causes buildings to overlap the river.** It doesn't happen too often and will
be fixed in the future. Also **more 'secondary' bridges** are spawned now."* **[STATED]**

Two classes of bridge are therefore modelled: a primary bridge (where a main road crosses) and secondary ones.
`41711473/03` shows a thick black wall-like line crossing the river with small dark blocks at intervals (a fortified
bridge), and elsewhere plain paper-coloured crossings. **[SHOWN]**

Rendering: the river is a band of the water colour with a soft outline and, in some palettes, a thin centre line and
one or two isolines along the banks; width tapers along the course; it runs off both map edges. In `40345972/04,06`
the river makes a compact S-bend right through the town centre with a widened basin. **[SHOWN]**

**Failure mode, stated and left unfixed in this window:** buildings overlapping the river — i.e. the river is carved
*after* or independently of block filling, with no reconciliation pass. **[STATED]**

---

### T12 — Castles, citadels and inner castles
Sources: `40345972/post.md`, `41711473` comments; shown in `37407181/01,07`, `38048182/01–03`, `40345972/01,04,06`,
`46685301/01–04`, `47063541/01,02`, `39697187/01,03`. **Tag: [STATED]+[SHOWN]**.

- **Default placement:** a walled bailey welded into the city wall ring, protruding outward (`37407181/07`,
  `38048182/02`). The bailey is one mesh cell (T3), filled with the paper colour, containing a **keep** drawn as a
  single large roof-coloured building with a notched plan (T-, L-, П- or comb-shaped — see `40345972/04` and
  `39697187/02`, whose keep is a distinct П/comb outline). **[SHOWN]**
- **Inner castles (0.7.7):** *"castles situated entirely inside a city instead of being incorporated into the city
  walls. I used to call them 'urban castles', but apparently it's not a correct way of using the term. This is one of
  the most frequently requested features… I tried it before just to test if it was doable and it wasn't hard. But **to
  implement inner castles as a real option compatible with any parameter combination turned out to be surprisingly
  hard**. I'm not entirely happy about how they look… Probably it would be easier and more correct to implement inner
  castles as a **separate class of objects, not as unusually placed regular castles**."* Toggle: `Layout` menu (later
  the `Inner castle` checkbox). **[STATED]** — `40345972/01,06,07` shows one: a small walled pentagon with a keep,
  sitting inside the city wall with "THE GREEN" wrapped around it.
- **Greens as a spacing device:** *"In some cases **greens are placed in front of an inner castle to create some space
  around it**. That option will disable such greens as well."* ⇒ parks are used as a layout spacer, not only decoration.
  **[STATED]**
- **Sizing:** *"It's not hard to make the size of a keep… adjustable, but not the size of the whole castle — it always
  occupies one cell of the mesh. You can resize it manually in the warp mode either by moving its vertices individually
  or more conveniently using the 'bloat' tool."* **[STATED]**
- **Reroll:** 0.8.0 adds a context-menu *Reroll geometry* on the castle. **[STATED]**
- A standalone **citadel** with no city wall is possible: `47063541/01,02` (Boake-Mily) has `Citadel ✓ / Walls ✗` and
  shows a lone pentagonal walled enclosure with a keep beside the town. **[SHOWN]**
- Stated open request, not implemented in this window: finer control over castle big/small/keep, castle-ground size,
  and whether the plaza is attached to the castle grounds. **[STATED]**

---

### T13 — City walls
Sources: `38048182/post.md`; shown in essentially every walled map. **Tag: [STATED]+[SHOWN]**.

- 0.7.6: *"**Improved city walls shape — fewer unrealistic 'sawtooths'.**"* ⇒ the wall polyline previously zig-zagged
  where it followed mesh-cell boundaries; the fix smooths or merges near-collinear / reflex runs. **[STATED]**
  **[INFERRED]** consistent with T3: the wall is the boundary cycle of the inner cell set, and a raw cell-boundary
  cycle over an irregular mesh naturally produces 1-cell-deep notches; the fix is to absorb such notches.
- **Rendering:** thick dark polyline; **filled circular towers at (most) vertices**; gates rendered as a short
  perpendicular bar / a break where a road passes. `38048182/02,03` shows both round tower dots and square gate blocks.
  `46685301/02,04` shows a wall with square/rectangular towers on a different style. City Viewer gained *"Square towers
  … as an option. **Tower shape is one of the 'environmental' parameters**, so, for example, 'midlands' towers (5) are
  always round and 'desert' towers (6) are always square."* ⇒ there is an integer **environment/biome id** (at least
  values 5 and 6 named) that drives style choices. **[STATED]**
- **Water gates** and **piers** are separately modelled elements (added to City Viewer in 1.0.2). **[STATED]**
- Multiple wall rings are *not* possible in MFCG — City Painter advertises *"There can be several rings of walls, but
  actually they don't need to be rings"* as a thing MFCG cannot do. **[STATED]**

---

### T14 — Palettes: 7 then 8 named colour slots, with real hex values
Sources: `29538966/post.md` (the 7-colour statement), `37407181/post.md` (road added),
`40345972/post.md` (in-app editor), and `47063541/01,02` (the actual dialog with hex). **Tag: [STATED]+[SHOWN]**.

*"Both standard and custom palettes can now consist of up to **7 colours — 4 general-purpose colours (paper, light,
medium, dark) and 3 specialized ones (roofs, water, green)**. For now it seems sufficient."* (0.7.2 WIP) **[STATED]**
0.7.5 adds **road** as an 8th. **[STATED]**

The 0.8.1 `Color scheme` dialog (`47063541/01`, and at 1200×1200 in `02`) shows the eight rows with editable hex
fields and swatches, plus buttons **Preset / Load / Apply / Save**. Values captured for the "Boake-Mily" scheme:

| Slot | Hex | Swatch as rendered |
|---|---|---|
| Paper | `D6CCA8` | pale sand |
| Light | `947A69` | mauve-brown |
| Medium | `827968` | grey-olive |
| Dark | `332C24` | near-black brown |
| Roof | `A0846E` | warm brown |
| Water | `CAC3B3` | pale grey-sand |
| Green | `9EA885` | sage |
| Road | `D8CFB0` | cream, ~paper+2% |

**[SHOWN]** — this is a directly usable reference palette and confirms the default relationship `road ≈ paper`
(D8CFB0 vs D6CCA8) stated in 0.7.5.

Custom palettes: originally authored as **SVG files** dropped into the generator (documented in itch devlog 67134,
"0.6.0 custom colors, scale bar, elevation"; sample at `http://fantasycities.watabou.ru/heavy.svg`); 0.7.7 adds
in-app editing with persistence (*"Your custom palette gets saved… but currently it's not possible to export palette as
a file… So if you want to use several custom palettes, you still need to keep them as SVG files."*). 0.7.7 also:
*"Night palette is made nicer."* — see the night scheme in `41711473/02,04` (Chary's Hill: near-black plum paper,
gold walls/labels/markers, desaturated indigo buildings, grey-brown river). **[STATED]/[SHOWN]**

---

### T15 — "Raised" buildings and other building style flags
Sources: `29538966/post.md` + image `03`; flags in `46685301/02,04`. **Tag: [STATED]+[SHOWN]**.

*"'Raised' style for buildings… This effect is used on many old (but not medieval of course) maps and I hope it will
help making generated maps more visually interesting."* **[STATED]** `29538966/03` shows it: each building footprint is
drawn twice — a dark copy offset by a small constant vector (down-right) beneath the fill — giving a uniform extruded
relief across the whole map. The offset is constant for every building, i.e. an orthographic "lift", not a real
shadow. **[SHOWN]**

The full set of building style toggles in 0.8.1 (`Style > Buildings`, `46685301/04`): **Tight**, **No triangles**,
**Improved lots**, **[Simple]**, **No outline**, **Raised**. **[SHOWN]**
**[INFERRED]** "Tight" = smaller inset between lots (denser blocks); "No triangles" = suppress/merge 3-gons;
"Improved lots" = the Voronoi path (T5); "Simple" = a button that presumably resets to the plain style;
"No outline" = drop the stroke; "Raised" = T15's relief. Only "Improved lots" is confirmed by prose.

---

### T16 — Legend, landmarks, and map furniture
Sources: `38048182/post.md`, `37407181/post.md`, `41711473/post.md`; shown in `38048182/01–03`, `40345972/02,04`,
`41711473/02,04`, `46685301/01–04`, `47063541/01,02`. **Tag: [STATED]+[SHOWN]**.

- **Landmarks (0.7.6).** *"named locations on a map. I made them look like **Google Map markers**… Their names are
  displayed in the legend if Landmarks→Legend is checked (unchecked by default), otherwise on a map they are shown only
  as tooltips."* Interactions: right-click to create, drag to move, click to rename, click + Delete to remove.
  **Landmarks are not generated** — *"for now you can only create them manually"* — but you may **drop a JSON file
  containing an array of strings** (`http://fantasycities.watabou.ru/pois.json`) and landmarks with those names are
  **placed randomly across the city**. Planned but not done: generated names like *"The Shrine of Azgara"* and
  *"The Hammer and Barrel Inn"*. **[STATED]** In 0.8.1 this surfaces as `Settlement > Points of interest > Load /
  Clear`. **[SHOWN]**
  `38048182/02` renders them as white teardrop pins with a black letter (a–h) keyed to an alphabetical legend list,
  while districts get black discs with old-style numerals (1–6) keyed to a numbered list. **[SHOWN]**
- **Legend refactor (0.7.6).** *"I worked on displaying landmark names in the legend and got carried away. It resulted
  in serious refactoring… the only visible change… is that the map title can be embedded into the legend, but there is
  much potential. Now more or less any elements can be added to the legend (I am planning to add the scale bar), the
  legend border can be customized."* ⇒ the legend became a **generic element container**. **[STATED]** By 0.8.1 the
  scale bar *is* inside the legend box (`41711473/02,04`; `47063541/01,02`). **[SHOWN]**
- **Legend positioning.** 0.8.0: *"it is now possible to reposition the legend: right-click it and choose at what
  corner of the map you want it to be."* Previously impossible, along with repositioning the compass and scale bar.
  **[STATED]**
- **Legend context menu** (`46685301/02,04`; `47063541/01,02`): *Metric units / Imperial units*, *Default style /
  Alternative style / Hide*, *Position >*, *Hide*, then global items *New city*, *Warp*, *Color scheme…*,
  *Export as PNG*, and window toggles *Generate / Settlement / Style*. In 0.8.1 the legend menu also offers
  *Edit name* and *Reroll all*. **[SHOWN]**
- **Compass rose (0.7.2).** *"The compass rose is **not purely decorative, it is used for rotating a map**. Initially I
  wanted to integrate my compass rose generator to MFCG, but **most generated compasses look too fancy for pretty
  minimalistic city maps**. Maybe I'll try to implement a greatly simplified compass generator within MFCG or maybe it
  will be just the fixed compass you see on this image."* **[STATED]** — the WIP image `29538966/04` shows a plain
  4-point star; every shipped map from 0.7.2 on shows a fixed **8-point star in a thin circle** with alternating
  light/dark facets and a single cardinal letter at the top (N, W or E depending on rotation). ⇒ the "fixed compass"
  option won. **[SHOWN]**
- **Scale bar.** Two styles observed: alternating filled/hollow segments with labels `100 200 300 400 500yd`
  (`37407181/07`, `29538966/03`) and a plain ruler with ticks `0 100 200m` (`38048182/02`, `41711473/02`). Units
  toggle metric/imperial. **[SHOWN]/[STATED]**

---

### T17 — Export formats and the settlement JSON
Sources: `32000161/post.md` + images, `37407181/post.md` + comment thread. **Tag: [STATED]+[SHOWN]**.

- 0.7.3 adds **GeoJSON export**. `32000161/02` (1417×926) shows the output opened in geojson.io over a Mapbox
  basemap: the town "Fushë Vërri" drawn from the file, with the raw JSON pane visible — `Feature` objects with
  `"geometry": {"coordinates": [...], "type": "MultiLineString"}` and `"properties": {"id": "rivers"}`. Coordinates are
  full lon/lat doubles clustered around **20.0009…°E / 40.0084…°N**, spanning ~0.0025° (~250 m) for the visible
  feature. ⇒ **the exporter maps local metres onto a lon/lat frame anchored near (20, 40)**, and features are typed by
  a string `id` such as `rivers`. **[SHOWN]**
- 0.7.5 **abandons strict GeoJSON**: *"I finally decided to move away from the strict GeoJSON format. I mentioned
  before that I found it too rigid, too limiting and overall awkward. For now the changes are minimal: there are still
  the same object types, points are still two-element arrays etc."* The format is shared between MFCG, VG and City
  Viewer. **[STATED]**
- Pushback and the reply are worth recording as design rationale: Tom argues for standards (and later suggests
  CityJSON); Oleg: *"They are still 'GeoJSON-like' with some weird restrictions of the original format removed.
  Ideally there would be two different formats… unfortunately that would be too much code to maintain."* and
  *"My discontent with GeoJSON is just too strong to keep struggling."* **[STATED]**
- **Height-maps are NOT exported** as of 0.7.5: *"Another shortcoming of the current JSON export is that height-maps
  are not exported. Of course, it's not hard to export them, but they are not yet supported in City Viewer. When they
  are implemented, they should greatly improve the quality of the final image."* ⇒ **MFCG/VG maintain an internal
  height-map** even though elevation is barely rendered. **[STATED]** — corroborated by the `Apply elevation` checkbox
  in the 0.8.1 Generate window (`46685301/01,03`; `47063541/01,02`). **[SHOWN]**
- PNG and SVG export both exist; 0.7.6: *"Exported PNGs are larger now."* 0.7.7 shipped with a PNG-export regression:
  *"It looks like for some people PNG export has stopped working… Most likely PNG export will work normally for maps
  **without water** (rivers are probably fine). SVG export works as before."* — later *"Fixed!"*. A patron reported the
  symptom as *"the exported map has a monochromatic background for both land and water together"*. **[STATED]**
- A user asked for transparent-background PNG; Oleg: *"Technically, it's trivial. The problem is that most people need
  opaque background, so I'll have to provide a choice and it needs UI for making that choice."* **[STATED]**

---

### T18 — The city-as-3D pipeline (City Viewer) and what it implies about the data
Source: `37407181/post.md` + images `02`, `03`, `04/05`, `06`. **Tag: [STATED]+[SHOWN]**.

City Viewer 1.0.2 consumes the same JSON. Images `02`/`06` (2560×1377) show an MFCG coastal city extruded: every lot
becomes a flat-roofed prism of varying height, squares/plazas are flat pads, piers are thin planks over the water,
and one large multi-block structure (the castle keep) dominates. Images `03`/`04` show a VG village extruded: houses
here have **pitched/gabled roofs** and free-standing footprints, with a faint road/stream network on bare ground and a
visible horizon — i.e. **the village model has roof geometry that the city model does not**. **[SHOWN]**

Stated limitations that reveal data gaps: *"there is literally nothing beyond the map borders and in 3D it doesn't
look good — roads, waterbodies end right where the original map ends. In the future I hope to find a way to extend
them **visually** without additional generation."* **[STATED]** ⇒ the map is a hard-bounded square with no surrounding
context data.

Newly supported elements in 1.0.2 — **piers, small bridges, monuments, water gates** — plus fixes to *roads, squares,
coastal castles*. These are therefore all **named entity types in the exchange format**. **[STATED]**

---

### T19 — City Painter: the explicit list of what MFCG cannot generate
Source: `39697187/post.md` + images `01`–`04`. **Tag: [STATED]**. This is the single best enumeration of MFCG's
generative constraints, because it is phrased as "things you can do here that you can't do in MFCG":

- *"You can paint **ocean islands, river islands, groups of islands, confluences of rivers, ponds** etc."* ⇒ MFCG has
  none of these.
- *"You can make a city of **any shape, not only circular like in MFCG**. It doesn't need to be continuous and can
  consist of **multiple clusters** of buildings."* ⇒ MFCG cities are circular and single-cluster.
- *"You can draw roads wherever you want, **they don't need to be radial like in MFCG**."*
- *"Walls as well can be drawn wherever you want. There can be **several rings of walls**, but actually they don't need
  to be rings."* ⇒ MFCG: exactly one wall, and it is a ring.
- *"You can attach a castle to a city wall like in MFCG, or you can place it in the center or outside of a city.
  **There can be more than one castle.**"* ⇒ MFCG: at most one castle, ring-attached (inner castles arrive a month
  later in 0.7.7).

Honest post-mortem, delivered a month later in 0.7.7: *"I am kind of disappointed in the idea… **Drawing over a mesh
with large cells turned out to be not user friendly at all.** Probably it may be mitigated with a good UI… but at this
moment I'm not sure it's worth trying."* And in the prototype post itself: *"The main problem is that before (and also
after and during) painting over the mesh **you need to adjust that mesh** and it's not particularly exciting."*
**[STATED]** — the mesh being coarse and ward-sized is both the engine's strength and the editor's downfall.

---

### T20 — Size, population and building-count model
Source: `47063541/post.md` + comments; numbers read off `46685301/01,03` and `46685301/02,04` and `47063541/01,02`.
**Tag: [STATED]** for the size range, **[SHOWN]** for the counts, **[INFERRED]** for the ratio.

- *"You can specify the size of a city **in 'wards'**: Generate > Size. It's not a much more precise method than using
  'Small', 'Medium' and 'Large' buttons, but this way you can create cities larger than 'Large' (e.g. 100)."*
  **[STATED]** — and in the comments: *"**The minimum size is 5 and the maximum is 200.**"* **[STATED]**
  ⇒ the primary size parameter is an integer **ward count in [5, 200]**, which (with T3) equals a mesh-cell budget.
- Observed `Settlement` window readouts **[SHOWN]**:

  | Map | Image | Buildings | Population | pop/building |
  |---|---|---|---|---|
  | Boake-Mily | `47063541/01,02` | 286 | ~1800 | 6.29 |
  | Goldfire Castle | `46685301/02,04` | 856 | ~5200 | 6.07 |
  | Whater | `46685301/01,03` | 3423 | ~21000 | 6.13 |

  **[INFERRED]** `population ≈ 6 × buildings`, then rounded to a display precision that grows with magnitude
  (nearest 100 up to ~10k, nearest 1000 above). 286·6=1716→1800, 856·6=5136→5200, 3423·6=20538→21000 all fit
  "round to 2 significant-ish figures". A re-implementer can safely use 6 persons/building.
- The UI also offers `Reroll names → Town` and `Reroll names → Districts` as separate actions, i.e. the name generator
  is decoupled from the geometry. **[SHOWN]**

---

### T21 — The full generation parameter surface (as of 0.8.1)
Source: `46685301/01,03` and `47063541/01,02`. **Tag: [SHOWN]** (read directly off the dialogs).

`Generate` window, tab **Features** — a `Random` master checkbox plus ten feature toggles in two columns:

| Left column | Right column |
|---|---|
| Citadel | Temple |
| Inner castle | Plaza |
| Walls | Shanty town |
| River | Farms |
| Coast | Greens |

plus a separate **Apply elevation** checkbox below the rule. Buttons down the right edge: **Small / Medium / Large /
Size / Rebuild / From URL**. A second tab, **Roads**, holds the road-count control.

`Settlement` window: editable name field; `Number of buildings:` and `Population:` readouts; **Reroll names → Town |
Districts**; **Points of interest → Load | Clear**; and buttons **Warp**, **Overworld**, **Copy URL** (0.8.1 only),
**Export as**. (The 0.8.1-WIP screenshot `46685301/01,03` has no *Copy URL*; the release `47063541/01,02` does — a
clean iteration marker.) **[SHOWN]**

`Style` window tabs: **Colors · Elements · Buildings · Misc**. The `Buildings` tab is enumerated in T15.

Earlier (0.7.2-era) UI for comparison, from `29538966/02`: buttons **Small / Medium / Large / Warp / Options /
Export**, with `Options` opening a hierarchical menu containing **Style** and **Layout** submenus, and a checkbox list
**More roads · Farm fields · Elevation · Random / Citadel · Plaza · Temple · Walls · Shanty town · River · Coast**,
plus an **Overworld** button. ⇒ between 0.7.2 and 0.8.1 the feature set gained *Inner castle* and *Greens* and renamed
*More roads* into a numeric road count. **[SHOWN]**

**"Overworld"** is a button in both eras — a companion regional view; no method is given anywhere in this slice.
**[NAMED-ONLY]**

---

### T22 — Persistence, URLs and the zoom limitation
Sources: `47063541/post.md`, `38048182/post.md`, `46685301/post.md`, `27564017` comments. **Tag: [STATED]**.

- Through this entire window **there is no save/load**: *"Since currently it's not possible to save/restore a map,
  this functionality [landmarks] is probably not super-useful."* (0.7.6). 0.8.1 adds a **lossy** URL round-trip:
  *"A generated city can be stored (Settlement > Copy URL) and restored later (Generate > From URL). As in the non-itch
  version, **any changes made to a city are not encoded into the resulting URL**, so it's not a replacement for a real
  save/load feature."* ⇒ the URL carries the **seed + parameters only**, not the warped/edited state. **[STATED]**
  It shipped broken (clipboard access) and was hot-fixed twice.
- The desktop plan (post #14) makes the first desktop feature **saving and loading**, targeted at March. **[STATED]**
- **No zoom, and it is a known architectural limitation:** *"Currently there is no way to zoom in/out. I know it's a
  big flaw, but **there are technical reasons for it**. I hope to find a workaround eventually."* (2020-06-12,
  `27564017` comments). Repeated request in `47063541` comments (*"the ability to zoom… I sometimes don't want an
  entire town, just a local map"*), answered *"Currently this is not possible and it's probably **harder to implement
  than it seems**, but I'll try."* **[STATED]** **[INFERRED]** consistent with a fixed-resolution raster/stage
  composited once per generation, with hatching and line weights baked in device space.
- Another user notes *"the warp function seems to be better on the pc version"* — i.e. platform-dependent behaviour.
  **[STATED]**

---

### T23 — Elevation: present in the pipeline, deliberately absent from the map
Sources: `41711473` comments, `37407181/post.md`, the `Apply elevation` checkbox. **Tag: [STATED]**.

Asked about hills, cliffs and varying altitudes: *"For now I don't have plans to add any elevation features. There are
several reasons for that. **The main one is that such features are rarely present on city maps anyway**, with the
exception of really dramatic ones like cliffs or ravines."* **[STATED]**

Yet: an `Apply elevation` generation checkbox exists (`46685301/01,03`), an `Elevation` option existed back in the
0.7.2 menu (`29538966/02`), and height-maps exist internally but are not exported (T17). ⇒ **elevation is generated and
used to bias layout (probably street/river/coast placement) but is not drawn as terrain.** **[INFERRED]** from the
combination of those three stated facts.

---

## 3. Visual / style conventions observed in the images

Read directly off the shipped maps: `37407181/07` (3026×2461), `38048182/02,03` (2048×1920), `40345972/06`
(5127×3035), `41711473/03` (1200×600), `41711473/04`, `47063541/02`, `29538966/05,06,08,09`, `30234656/02`.

**Paper and frame.** Flat un-textured paper fill (no grain, no vignette, no torn edges). Some styles add a thin
double rule inset a few pixels from the canvas edge (`38048182/02,03`); most have none. The title sits **above the
map, centred**, in a serif display face with generous tracking (`Flourt Keep`, `Mourch Quay`), or is **absorbed into
the legend box** from 0.7.6 on.

**Line weights.** Three weights only: hairline (field outlines, water isolines, road edges, legend rules), normal
(building outlines), heavy (city wall, piers, bridge parapets). Building outlines are the same weight at every zoom —
consistent with the no-zoom limitation.

**Buildings.** Filled polygons with a dark outline of the same colour family. Central blocks: wall-to-wall irregular
lots with ~1–2 px gaps standing in for alleys, frequently arranged around an interior courtyard void. Outskirts:
free-standing rectangles, oriented to the nearest road, with visible ground between them. A handful of oversized
footprints per district read as civic buildings. "Raised" style adds a constant-offset dark under-copy. An alternative
style (`46685301/02,04`) fills every building with **diagonal hatch** over paper and keeps only the outline — an
engraving look — and uses square towers on the wall.

**Roofs.** In the 2-D map, roofs are a flat colour slot only (no ridge lines, no hip geometry). Pitched roofs exist
only in the 3-D City Viewer and only for the *village* model (`37407181/03,04`).

**Hatching.** Used for exactly two things: farm fields (unidirectional thin parallel lines, one angle per field,
angle varying field-to-field, ~6–10 px pitch at the shipped resolutions) and the alternative building style. There is
**no cross-hatching anywhere**.

**Water.** Flat fill plus **3–6 isolines running parallel to the shoreline**, spaced with increasing gaps outward
(`38048182/02`, `40345972/06`, `39697187/01,03`). Rivers are tapering bands, sometimes with a centre line. 0.7.7:
*"Water isolines are drawn differently now (but maybe I'll have to revert it back)."* **[STATED]** Sea colour is
palette-dependent: pale green (`38048182`, `40345972`), grey (`39697187`), sand-grey (`47063541`).

**Shore furniture.** Piers = heavy dark strokes perpendicular to the shore, evenly spaced along a quay. Wharf = a
paper-coloured band between the buildings and the water. A "Knight's Pass"-style paper area marks a landing.

**Greens / parks.** Solid sage-green polygons, no tree symbols at all. MFCG in this window has **no tree glyphs, no
stipple, no forest texture** — greenery is pure flat colour. (Trees appear only in the blurred non-MFCG panel of
`46041997/01`.)

**Plazas / squares.** Paper-coloured polygons, often with a **tiny filled circle at the centre** = a monument
(`37407181/07`, `40345972/06`, `46685301/02,04`).

**Roads.** Cream/paper bands with hairline edges, gently tapering, drawn only outside the walls, running off the map
edge. Bridges are short bands crossing the river; fortified bridges get the wall treatment.

**Walls.** Heavy dark polyline, filled circular (or square, by biome) tower dots at vertices, gates as short
perpendicular bars or breaks.

**Labels.** District names in **small caps, letter-spaced, following the arc of T1**, in the dark colour with a
paper-coloured halo/knockout so they read over buildings (`40345972/06`, `29538966/04`). Some are so tightly tracked
they read as `D A R K C L I F F`. Legend and title use a **serif with old-style (text) figures** — note the lowercase
`0`/`5`/`7` shapes in `100 200 300 400 500yd` and in the numbered legend list. UI chrome uses a narrow sans
(Archivo Narrow from 0.7.2).

**Legend.** Framed rectangle, title, horizontal rule, then a numbered district list; landmarks as a separate
lettered list below a second rule. Scale bar may sit inside the box under the title. Map markers: **black disc with a
light numeral** for districts, **white teardrop pin with a dark letter** for landmarks.

**Compass.** Fixed 8-point star with alternating light/dark facets inside a thin circle, cardinal letter above.
Independent of map rotation from 0.7.7.

**Night palette** (`41711473/02,04`): near-black plum paper; gold for the wall, district markers, compass, legend rule
and title; buildings in low-chroma indigo with faint warm edges; river in warm grey. Proves the palette slots are
enough to carry a full inversion without a separate stylesheet.

---

## 4. Creator's stated design philosophy and constraints

- **Simplicity over correctness, explicitly.** On the arced-label algorithm: *"In many cases it produces results which
  are far from perfect and there are many ways to improve it even without changing the approach. **Simplicity is its
  advantage, not technical perfection** :)"* He links the rigorous alternative (centerline labeling) and declines it.
- **Aesthetics beat realism when they conflict.** Farms: *"In reality cities should be surrounded by farms, but **it
  just doesn't look interesting**, not with a fantasy setting in mind anyway."* Compass: generated compasses are
  rejected because they *"look too fancy for pretty minimalistic city maps"*. Elevation: rejected because *"such
  features are rarely present on city maps anyway"*.
- **Ship partial features behind flags rather than hold them.** The Voronoi lots ship crashing-but-off-by-default.
  City Painter ships as an explicitly labelled prototype — *"I don't want you to think that it's by design"* — with a
  frank bullet list of everything missing, in order to *"receive your feedback as early as possible"*.
- **The algorithmic basis is admitted to be permanently in flux.** *"That algorithmic basis keeps changing and today it
  is not more stable than it was 2 years ago. Turning the web generator into a feature complete desktop application as
  an intense but relatively short project doesn't seem a good idea now."* He explicitly regrets not splitting the UI
  redesign into iterations: *"Even the current UI redesign probably should have been split into several iterations to
  have time to reflect on and collect feedback after each of them."*
- **Refactors are acknowledged as scope hazards.** *"I worked on displaying landmark names in the legend and got
  carried away. It resulted in serious refactoring, which has taken more time than I had anticipated."*
- **Interoperability loses to maintenance cost.** On dropping GeoJSON: *"Ideally there would be two different formats…
  unfortunately that would be too much code to maintain."*
- **Feature requests are resisted, then implemented.** Inner castles: *"This is one of the most frequently requested
  features, so I was forced to implement it (I have resisted long enough…)"* — and he immediately flags the
  architectural smell: *"Probably it would be easier and more correct to implement inner castles as a separate class
  of objects, not as unusually placed regular castles."*
- **UI scalability is a first-class concern.** The three-era UI history (nothing → hotkeys → hierarchical menu →
  floating windows + context menu) is narrated as a response to feature growth: *"Today the menu has grown too large
  and it's time to replace it with something more scalable."* The context menu is designed to be genuinely
  object-aware: *"it will contain actions related to the object over which it was activated."*
- **Hard invariants he chose to keep in this window:** circular single-cluster city; one ring wall; radial roads;
  simply-connected water (no islands, no lakes); no zoom; no save/load; no generated landmarks; no multi-line labels.

---

## 5. Useful facts from the comment threads

| Post | Fact |
|---|---|
| 27564017 | *"Currently there is no way to zoom in/out. I know it's a big flaw, but **there are technical reasons for it**."* (2020-06-12) |
| 27564017 | A user reports the warp function behaves better in the PC (desktop) build than on the web. |
| 29538966 | Transparent-background PNG: *"Technically, it's trivial. The problem is that most people need opaque background, so I'll have to provide a choice and it needs UI."* |
| 30234656 | **The key structural disclosure:** *"Currently roads are drawn only outside a city, inside a city they are just gaps between buildings."* plus the design question that followed it — *"what about smaller roads, alleys, squares?"* — which 0.7.5 answered by making road colour cover roads + bridges + squares. |
| 37407181 | Custom palettes are documented in itch devlog `67134` ("0.6.0 custom colors, scale bar, elevation"). |
| 37407181 | Pre-announcement of the farmhouse rule: *"always touching and aligned to one of the field edges… more elongated."* |
| 37407181 | GeoJSON debate; a patron published a translation script on itch.io; CityJSON suggested; Oleg: *"My discontent with GeoJSON is just too strong to keep struggling."* |
| 40345972 | PNG export regression triaged live: fails on maps **with water**, works without coast; SVG unaffected; later fixed. |
| 40345972 | Compass, legend and scale bar could not be repositioned at 0.7.7 (legend becomes repositionable in 0.8.0). |
| 41711473 | **Castle = exactly one mesh cell**; keep size is adjustable in principle, castle size is not; resize via warp/bloat. Demo link: `http://watabou.ru/images2share/lionarch_castle.png`. |
| 41711473 | Outstanding castle requests not yet implemented: big/small/keep control, castle-grounds size, plaza-attached-to-castle toggle. |
| 41711473 | Elevation declined with reasoning (see T23). |
| 47063541 | **Size range: minimum 5 wards, maximum 200.** |
| 47063541 | Road-count/rebuild interaction bug confirmed and fixed: pressing Enter regenerated with a different road count than the field showed. |
| 47063541 | Farm density is an aesthetic choice; a farm-count parameter was promised *"With the new UI my hands are untied"*. |
| 47063541 | Font choice is not user-configurable; a request for a few selectable web fonts was left open. |

---

## 6. Open questions a re-implementer must decide

1. **Arc radius constant.** Is it `R = h²/|d|` or `R = h²/(2|d|)` (or some other `C/|d|`)? Only the two endpoint
   conditions are stated. Also: is `h` the OBB's short-axis extent, or the extent of the *cut* segment?
2. **Cut-segment selection under concavity.** When a cut line meets the district polygon in multiple segments, which
   one is "the" segment? Longest, centre-most, or the union span?
3. **Label overflow.** What happens when the district name is longer than the span from cut #2 — shrink, clip,
   overflow, or fall back to a straight label? Never stated.
4. **Mesh construction.** How is the ward mesh seeded and relaxed? Voronoi over Poisson-disc seeds? Polar seeding
   (which would explain "circular only" and "radial roads")? How many Lloyd iterations? What is the cell-count ↔ ward
   relationship given size ∈ [5, 200]?
5. **District derivation.** Are districts single cells, connected groups of cells, or a separate partition? What is
   the "better district ordering" sort key (0.7.6)?
6. **Old bisection details.** Cut axis (longest edge vs OBB), split-position jitter distribution, stop criterion
   (area? aspect?), and the inset/alley width. Only the *defect* (triangles) is stated.
7. **Voronoi lots details.** Seed distribution and density, clipping, minimum-area discard threshold, inset offset,
   and the rule for merging cells into L/U/П "complex buildings". Also: what exactly does "No triangles" do, and what
   does "Tight" change?
8. **Wall-shape de-sawtoothing.** What is the actual smoothing rule that produced "fewer unrealistic sawtooths"?
9. **Gate/road spoke selection.** How are gate positions chosen on the wall ring, and what does "Default" vs
   "Maximum" road count mean numerically?
10. **Shoreline noise.** Which noise, what octaves/amplitude relative to city radius, and how is the no-island
    invariant enforced?
11. **Curved-street method.** Completely unspecified — and it never shipped in this window, so the live generator's
    street code may still be the straight mesh-edge chains. Needs confirmation from the newer-half slice.
12. **Environment / biome ids.** At least `5 = midlands` and `6 = desert` exist and drive tower shape. What is the full
    enumeration, and what else does it drive (palette? vegetation? roof pitch?)?
13. **Elevation.** What does `Apply elevation` actually do to the layout if it is never drawn? Is the height-map used
    for river routing, coast placement, or district value shading?
14. **"Overworld".** A button in every UI generation; no method described anywhere in this slice.
15. **Population constant.** Is it exactly 6 persons/building, and is the rounding to 2 significant figures?
16. **Settlement JSON schema.** Only `properties.id = "rivers"` and `MultiLineString` are directly observed, plus the
    named element types piers / small bridges / monuments / water gates / roads / squares / coastal castles. The full
    post-GeoJSON schema is not recoverable from this slice — it is in the FTG/capture material instead.
17. **Name generators.** Town names and district names are rerollable independently; no grammar is published. The
    observed district-name corpus (≈42 names, §T2) is the only evidence here.
