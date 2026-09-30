# Village Generator — watabou Patreon "🏡 Village Generator" collection, NEWER half (slice `vg-posts-b`)

Extraction pass. Sources: `research/patreon/watabou-village/<post_id>/post.md` (body + full comment thread) and
`research/patreon/watabou-village/<post_id>/images/NN.{png,jpg}`. 14 posts, 2023-09-04 → 2026-09-17, covering
VG **1.5.1 → 1.6.8** (1.6.3 and 1.6.6 have no post in this collection), plus one plans post, one style-collection
post, and one joint MFCG/VG/Dwellings post.

**Coverage receipt.** All 14 `post.md` files read in full including comment threads. All **60** images opened with
the Read tool and described. Two images are byte-identical duplicates of a neighbour (verified by md5):
`91692684/images/04.png` == `03.png` (md5 `f3202d03aeed31c09b2e550003e50cf6`) and
`105215836/images/06.png` == `05.png` (md5 `3b74af65d16d3a373173403f5dc3d45f`); both were opened separately
anyway. `105215836` has no `03.png` — the archive numbering skips it and the post's own image list skips it too,
so it is missing upstream, not lost locally. **No captured JavaScript bundle was opened.** One non-post file was
consulted for corroboration of the URL parameter format only: `captures/village/2026-09-21T05-37-29/meta.json`
(recorded launch metadata, not code).

**Evidence tags:** `[STATED]` creator describes the method in words · `[SHOWN]` visible in an image/recording but
not explained · `[INFERRED]` my reconstruction, reasoning given · `[NAMED-ONLY]` feature announced, no method.

**Scale note.** Despite the name, VG in this era produces settlements from ~130 to ~1700 inhabitants
(`105215836/02` "Pop. 130" … `169696051/02` "Pop. 1700"). The 1700-person map is a small town with a full
radial-concentric street web. Any re-implementation should not assume "village = hamlet".

---

## 1. Chronological table

| # | Date | Post id | Title | Version | What changed relative to the previous iteration |
|---|------|---------|-------|---------|--------------------------------------------------|
| 1 | 2023-09-04 | 88749133 | Ponds and improved farm fields | 1.5.1 | New **`pond`** tag (1 round pond usually; sometimes 2–3; sometimes irregular; never gets piers). **Farm fields reworked**: fields group together; small villages get fields on *one side*; fields more often form *sectors centred on the village*; some fields get *curvilinear edges* (furrows still straight). **Trees**: the old "spiky" type is split into two new types, **Conifer** and **Palm**; new **`grove`** tag inverts tree placement (trees hug buildings, map edges left bare); wood edges made chaotic by applying **domain warping to the fractal noise** that drives tree density. New **`highway`** road tag; exactly one of `highway`/`dead end`/`isolated` is now always selected; isolated villages made more common. New **Flat** roof type; large flat-roofed buildings get a **dome** instead of a tower. Style preset *Hot* replaced by *Sand*. Island villages export to JSON correctly. Previous iteration was 1.5.0 (non-square maps, isolated villages — post 84106820, outside this slice). |
| 2 | 2023-09-16 | 89314043 | Improved rivers and bridges | 1.5.2 | **All river code rewritten from scratch** (not refactored) because the original 1.1.0 implementation was "a total mess" inside. Rivers now **meander** (usually >1 turn per map) instead of being "slightly bent stripes"; rivers **much narrower on average** (previously allowed up to half the map width); consequence: many rivers are now too narrow for piers — accepted. **Relief now follows rivers** rather than rivers following relief, which kills the old glitch of contour lines running into water. **Bridges**: secondary roads can now bridge (narrower, simpler "secondary" bridges); >1 bridge per map is now possible; bridge crossing angle is now "as right as possible"; bridges cast a shadow on the water. Also: **rectangular village squares** appear sometimes (round still more common, deliberately); **random style preset** (key `0`). |
| 3 | 2023-09-29 | 90033685 | Plans for the Village Generator | (plans) | No release. Declares three candidate directions: **more water configurations** (river mouth, confluence, river island, bayou, Esgaroth-style over-water settlements), **cliffs** ("not real… just fancy contour lines", requiring roads/houses to interact with them), and **palisades** (open design questions listed). States only *one* of the three will land next. |
| 4 | 2023-10-26 | 91692684 | New water features and other additions | 1.5.3 | **Coasts**: straight/broken coasts replaced by **coves and rarer headlands**; straight shores remain as degenerate cases. New **`confluence`** tag (river junction) — bridges near confluences still cross at wrong angles. New **`estuary`** tag, mechanically **"a combination of a regular river and a bay"**. Trees: the concentric "bands" a tree is drawn from now get a **vertical offset** (per tree type) for fake 3D; **Palm** reshaped ("less like starfish"); **Conifer shadows** switched from offset-silhouette to a drawn **jagged triangle**. New square centrepiece: a **tower** (square building with a longer shadow). Village square now **aligns to the highway** when they overlap. Piers drawn as plank rows like bridges. **Furrows become curvilinear**. PNG export outlines the title correctly. Road-branching bugs near bridges/docks fixed. More buildings spawn on river/pond banks. New **`ruin`** roof style (no roofs, incomplete wall sets). New **`district`** tag (affects only building and crossroads density). |
| 5 | 2023-12-05 | 94118928 | Collection of styles | — | Launch of `watabou.github.io/village_styles.html`, a shared user-style gallery identical in mechanism to the Perilous Shores one. 9 styles visible in the screenshot: *gis, gossamer, pencil, vivid, duskvol, capricorn, haunted, subtle, fall*. |
| 6 | 2024-05-14 | 104226049 | Spotlight and improved roads | 1.5.4 | **Spotlight**: soft radial gradient over the whole map, focus at the **point of maximum population density** by default (alternatives: map centre, or pushed to the edge per *shadow angle*); darkening uses the *shadow color*, highlighting uses its **complement**; darkening and lightening intensities independent; *size* parameter; toggle **L**. **Roads merge** instead of butting into each other (disable in *Style*; "implementation is quite crude"). **Driveways** connect mostly-larger buildings to the road they line (connecting *all* buildings "looked wrong, like modern suburbia"); toggle in *Layers*. Roads now prefer **isohypses**, climbing reluctantly as a function of slope steepness. New colour parameter **Thicket** (interior colour of tree groups), imported from Cave/Glade Generator. Gable-roof hatching restyled ("more rustic"). Flat roofs get **inner shadows** plus more detailed ground shadows. Trees draw "much faster". |
| 7 | 2024-05-23 | 104796798 | Palisades | 1.6.0 | Single feature: **`palisade`** tag. Enclosure shape derives from the **population density map** → `sparse` villages get smaller fences, `dense` ones get a larger radius on average. The fence **cuts through woods**, with a chance to leave trees inside ("doesn't make much sense, but it looks more interesting"). Same cut applied to farm fields → small fields/orchards inside the wall, but this path is "much more complex and more glitchy" and **fields commonly overlap**. Palisade is explicitly **not** meant to combine with water tags; combinations are allowed but unpolished. |
| 8 | 2024-05-30 | 105215836 | Palisades in JSON, small visual improvements | 1.6.1 | Palisade now exported to JSON — **"its data is just another list of polylines"** — and rendered in **City Viewer** as smooth low garden-style walls; **gates are ordinary houses placed where roads cross the wall**, in the Viewer and in VG itself. **Bug fix: roads were "unreasonably curvy"** — a regular right-angled road pattern was previously unobtainable even on perfectly flat land. Related: **population density maps are now generated very differently**, making villages denser on average. House drawing improved across all four roof types; gable still the most polished. |
| 9 | 2024-08-21 | 110526365 | Shading | 1.6.2 | **Ground shading (hillshade)**: sun-facing slopes highlighted, opposite ones darkened; functionally duplicates hachures but **also affects roads and fields**; strength tied to *shadow color*; can look "plastic" at extremes; toggle *Layers > Shading*. **Tree-group shading**: groups (not individual trees) shaded; strength depends on *shadow color* **and** *shadow length*; toggle *Layers > Trees > Shading*. |
| 10 | 2024-11-26 | 116745476 | Crossroads and numbered houses | 1.6.4 | New **`crossroads`** tag — village at a highway intersection or T-junction. "Much harder to implement than I expected", still glitchy: **highway branches loop back to the original road or get cut off by secondary roads**. **House numbering**: mark/unmark via context menu or *shift+click*; mark-all available; when all are numbered the order is "interesting, but maybe not the most convenient"; palisade **gates can be marked but square "towers" cannot** (implementation detail); permalinks do **not** store the marks (fixed next version). **Double-click a building → open it in Dwellings** (also works on gates, not towers). Street lights made brighter and less "blinding". |
| 11 | 2024-12-10 | 117634240 | Small improvements | 1.6.5 | **"Towers" become real buildings**, not props — so they can be numbered and opened in Dwellings. Numbered buildings now stored in permalinks. New *"Hide population"* checkbox in the *Village plate* dialog (name shown, population hidden). Three new styles added to the collection page (*parched*, *glen*, *morning*). Forward plan: **cliffs**, **better buildings** ("more diverse in size and shape… it seems like I'll have to abandon the 'fake perspective' style"), **points of interest** — then a from-scratch rebuild. |
| 12 | 2025-02-03 | 121415691 | Three generators updated | 1.6.6-era | VG: **cotton-tree shadows improved**; palm shadows slightly improved, only visible at large *shadow length*. **Roads can be hidden without hiding houses** (*Layers > Roads*) — suggested for camps or wilderness maps. (Also Dwellings furniture/hatching/gothic rooms, and an MFCG forest-export resolution fix.) Comment thread yields MFCG's size semantics (see §5). |
| 13 | 2026-09-09 | 169047704 | Improved trees | 1.6.7 | After an 18-month gap. **Gradient rendering for trees**, ported partly from Cave/Glade Generator and Urban Places; three options **None / Linear / Radial** in a new *Trees* dialog, which also holds *Zero / Random / Maximum* tree counts. New **"Top-down"** option disabling fake perspective on houses *and* trees — unchecked by default now, planned to become default and then permanent. **"Grass"** relief mode reworked into "noisier hachures" (creator doubts it is needed at all). Arcana build sizes the initial map to the **current window size** (no black bars). *Style* dialog gains a "More styles" link. Next: port the **"outline" idea from Perilous Shores** to (almost) everything. |
| 14 | 2026-09-17 | 169696051 | Improved contours and other visual changes | 1.6.8 | **Selective outlining**: contours drawn in *shades of the objects themselves* instead of solid black/Ink. New style parameter **Pressure** (*Style > Misc.*) controlling how much *Ink* affects the final outline colour, mixed with **"Hard Light" blend mode**. `Pressure = 1.0` is a special value reverting to solid-Ink outlines ("1 and 0.999 may produce very different results"); `Pressure = 0` is another special value disabling all outlines and most strokes (key **P**). Colour parameters for **roof hatching, tree details and field furrows replaced by numeric parameters** (e.g. *Style > Houses > Details* 0…1). All built-in and collection styles re-tuned. **Grid overlay** added (hidden by default; size in abstract units, adjustable opacity). **Village lights** now driven by "a single continuous map" so some streets are busy and others quiet, instead of switching independently. Two new colour parameters: text, and text outline. More house (hip/flat) and tree rendering polish. Next: **non-rectangular houses**, chimneys/dormers, and cliffs. |

---

## 2. Techniques

### 2.1 Tag system / map templates

**Problem.** Let the user request a class of settlement without exposing internals, and let the generator pick a
coherent combination when the user does not.

- `[STATED]` Tags are selected in a *Tags (Map parameters)* dialog. Tags attested across this slice:
  water — `coast`, `river`, `island`, `pond` (1.5.1), `confluence` (1.5.3), `estuary` (1.5.3);
  roads — `highway`, `dead end`, `isolated` (1.5.1), `crossroads` (1.6.4);
  vegetation — `grove` (1.5.1), `uncultivated`;
  density/structure — `sparse`, `dense`, `district` (1.5.3), `palisade` (1.6.0).
  (88749133, 89314043, 91692684, 104796798, 116745476.)
- `[STATED]` **Exactly one road tag is always selected** from {`highway`, `dead end`, `isolated`}, and isolated
  villages were made more common in 1.5.1 (88749133). This is a mutually-exclusive enumerated slot, not a free flag.
- `[STATED]` Tags compose, including combinations the author never polished: "The *palisade* tag is not supposed to
  be used with any kind of water features! But you can still select it and the *coast* for example. The result will
  look not unlike a coastal city in the city generator." (104796798). So the tag system is permissive, with
  documented-unsupported regions rather than hard rejections.
- `[STATED]` `district` "only affects the density of buildings and crossroads", and the author suggests pairing it
  with `uncultivated` and `dense` (91692684) — i.e. a tag can be a pure parameter nudge with no geometry of its own.
- `[SHOWN]` Tags travel in the URL as a comma-separated list alongside a seed:
  `?seed=4242&tags=confluence,palisade,highway` (`captures/village/2026-09-21T05-37-29/meta.json`). Corroborates
  that tags are a small closed vocabulary of string ids and that seed+tags is the full reproducible state.
- **Unknown for a re-implementer.** The prior distribution over tags when the user requests nothing; whether
  incompatible tags are silently dropped or merely unhandled; whether `pond`/`river`/`coast`/`island` are mutually
  exclusive or stackable (the `estuary` composition implies at least some stacking is internal, not user-facing).

### 2.2 Ponds

**Problem.** Add a water feature that does not impose a shoreline across the whole map.

- `[STATED]` Tag `pond`. "Usually, there is only one round pond, but sometimes 2-3 of them are spawned and sometimes
  they are more irregular in shape. If a large enough pond is placed off-centre, it may look like an edge of a larger
  lake or a fjord" (88749133). So: count ∈ {1, 2, 3} with 1 dominant; shape = round by default with an irregular
  variant; position biased to the centre but not fixed.
- `[STATED]` **Piers are never created on ponds** (88749133) — an explicit per-feature suppression rule.
- `[STATED]` Aesthetic guidance from the author: "ponds look best if they are closely surrounded by trees" — not
  enforced, an observation.
- `[SHOWN]` `88749133/01,04` (Sand preset): a single rounded, slightly irregular pond, roughly 1/6 of the map width,
  just off-centre, with the village road loop wrapping it. `90033685/01,03`: a similar pond in the autumn style with
  a partial sand rim on one side only.
- `[INFERRED]` The pond outline is a smoothed closed loop with low-amplitude radial noise (a circle whose radius is
  perturbed by 1–2 harmonics), because the outline in `88749133/04` is convex, near-circular, and has 3–4 gentle
  undulations with no sharp features — consistent with radius-noise, inconsistent with a noise-threshold contour
  (which would produce lobes and occasional pinch-offs).
- **Unknown.** Pond radius distribution; the rule that decides "round" vs "more irregular"; how a pond interacts
  with the fields/roads passes (the loop road around the pond in `88749133/04` implies the pond is inserted before
  roads, but nothing states it).

### 2.3 Rivers — meandering

**Problem.** The 1.1.0 river implementation produced "slightly bent stripes" and was internally unmaintainable.

- `[STATED]` Rewritten from scratch in 1.5.2 rather than refactored (89314043). Result: "they meander. Occasionally,
  you may encounter rivers which flow almost straight or make a very large turn, but in most cases, rivers turn more
  than once per map. The way they do it is not perfect".
- `[STATED]` Meandering **required** narrowing: "This wouldn't be possible without making rivers more narrow on
  average. To be honest, I don't remember why in previous versions I allowed rivers to be half the map wide."
  For a wide waterbody the user is told to choose `coast` instead. This is a real design constraint: meander
  amplitude and river width are coupled — a wide channel cannot turn inside a small map without self-intersecting.
- `[STATED]` Consequence accepted rather than fixed: "it's often the case that a river is just too narrow to place
  piers on it… riverside villages without piers do not look wrong, especially if bridges are present."
- `[SHOWN]` `89314043/01,03`: an S-shaped channel with two clear inflections, width ≈ 1/12 map width.
  `169047704/01,03` (RIVERFORGE): a much stronger meander with an almost-omega loop in the south-west, showing the
  meander generator can approach self-tangency. `110526365/01,03`: two broad bends through the village.
- `[INFERRED]` The centreline is a smooth curve through a small number of control points with alternating lateral
  offsets, then thickened to a ribbon of slowly-varying width — not a physical meander simulation. Reasoning: the
  bends are of similar wavelength and amplitude within a map and never show cut-off oxbows, point-bar asymmetry, or
  width changes at bends, all of which a migration simulation produces. The "almost straight" and "one very large
  turn" degenerate cases are what a random offset sequence yields when the offsets happen to be small or monotone.
- **Unknown.** Whether the centreline is a spline, a Chaikin/subdivision chain, or a random walk with smoothing;
  the width distribution and whether width varies along the channel; whether the river ever exits the same map edge
  it entered.

### 2.4 Relief follows rivers (not vice versa)

**Problem.** Contour lines used to run into the water, implying a non-horizontal water surface.

- `[STATED]` "**Rivers follow relief** now, going around hills. OK, it's not exactly true. In fact, it's the other
  way around: relief follows rivers. In any case, such glitches as contour lines going into the water… do not happen
  anymore." (89314043). This is one of the most load-bearing statements in the slice: **the height field is
  constructed after and from the water geometry**, not sampled independently.
- `[SHOWN]` `89314043/03`: the faint contour lines run parallel to the channel near it and close into loops only
  away from it. `110526365/03`: the hillshade's light/dark boundary follows the river corridor.
- `[INFERRED]` Implementation is most likely: build the water mask first; seed a scalar field with height ≈ water
  level along the channel; add hills away from it; then any contour extraction naturally parallels the bank. An
  equivalent formulation is `h(p) = base(p) + f(distance_to_water(p))` with `f(0)=0` and `f` increasing —
  a distance-transform-driven valley. Reasoning: the contours hug the bank at a constant offset, which a distance
  transform gives for free and which additive noise alone does not.
- **Unknown.** Whether the height field is a grid or an analytic sum; whether lakes/ponds get the same treatment;
  how the confluence case blends two valleys.

### 2.5 Coasts — coves and headlands

**Problem.** "In previous versions, *coasts* looked unrealistically straight (even if broken)."

- `[STATED]` 1.5.3 replaced them with **coves and rarer headlands**; "straight shores still happen occasionally as
  degenerate cases" (91692684). So the shoreline family is parameterised such that straightness is the zero case of
  a curvature parameter, with concave (cove) more probable than convex (headland).
- `[SHOWN]` `104226049/02,04` (LITTLE BAY): a single smooth concave cove occupying the east of the map, with the
  village plaza sitting directly on the beach at the cove's apex.
- `[INFERRED]` This is close to MFCG's older "rough parabola" shoreline (documented in the MFCG slice) but with the
  sign and curvature randomised and the result smoothed: a low-order curve across the map, bowed toward or away from
  the settlement. Reasoning: a single dominant curvature per map, no islands or multiple bays in any coastal image
  in this slice, and the author's own framing of straight shores as the *degenerate* case of the new family.
- **Unknown.** Whether cove/headland is a discrete flag or a signed continuous parameter; the secondary
  irregularity applied on top (the beach line in `104226049/04` is smooth at map scale but slightly wobbly at pier
  scale, implying at least one octave of small noise).

### 2.6 Confluence

- `[STATED]` Tag `confluence`; village at a river junction. "Bridges near confluences tend to cross the water at
  wrong angles, I hope to find a way to fix it later." (91692684) — a known, shipped defect.
- `[SHOWN]` `91692684/01,07` (ABEHORN, Pop. 240): two arms entering from NW and NE, merging at the top-centre into a
  single channel flowing S/SW. The village occupies the **wedge of land between the two arms**, immediately
  downstream of the junction. The junction area is wider than either arm. Both bridges in this particular map happen
  to be near-perpendicular.
- `[INFERRED]` A confluence is two instances of the river generator sharing a junction point, with the downstream
  arm's width derived from the two upstream widths. Reasoning: the two arms have visibly different widths and
  independent meander phases, and the merged channel is wider than either — consistent with three separately
  generated ribbons stitched at a node, inconsistent with a single channel that forks.
- `[INFERRED]` The stated bridge-angle failure is explained by the same machinery: the right-angle rule (§2.8) must
  pick *a* local channel direction, and near a junction the direction is ambiguous/discontinuous, so the chosen
  normal is wrong for whichever arm the bridge actually spans.
- **Unknown.** Whether the settlement is always placed in the wedge, and how the wedge is chosen among the three
  land regions a Y-junction creates.

### 2.7 Estuary

- `[STATED]` "Mechanically, an estuary is a combination of a regular river and a bay." (91692684) — i.e. it is
  literally the composition of two existing generators, not a new geometry type. The river flows into a
  "much larger waterbody (sea/lake/much larger river)".
- `[SHOWN]` `110526365/02,04`: the channel narrows upstream (north) and opens smoothly into a large water body
  filling the south of the map. The large body carries its own concentric depth bands following its shore, while the
  river carries a centre highlight; the two water renderings meet without a visible seam.
- `[INFERRED]` Union of the two water masks, then a single shoreline extraction over the union — otherwise the
  seam would be visible where the river ribbon meets the bay polygon. Nothing in `110526365/04` shows a double
  outline at the junction.
- **Unknown.** Whether the bay is the `coast` shoreline reused, and whether tidal/delta variants exist.

### 2.8 Bridges

**Problem.** "Bridges are a very important feature of riverside villages, they are what makes villages look like
they interact with a river, not just stand next to it." (89314043) — the design rationale, stated outright.

- `[STATED]` Four changes in 1.5.2 (89314043):
  1. **Secondary bridges**: secondary roads may now cross a river, producing bridges that "look slightly
     differently — simpler and narrower". Called out as "particularly important for *isolated* villages" —
     i.e. a village with no highway still needs a river crossing to look inhabited.
  2. **Multiple bridges per map** are now possible; usually the extras are secondary, but "sometimes a highway
     crosses a river more than once, spawning several large bridges".
  3. **Crossing angle** "is always as right as possible" — a constraint, not a preference.
  4. Bridges **cast a shadow on the water**.
- `[STATED]` 1.5.3 fixed "odd road forks around bridges and docks" (91692684) — bridge endpoints were producing
  spurious branches in the road graph.
- `[SHOWN]` `89314043/03` carries four bridges on one map: one wide plank-hatched highway bridge, two narrower
  secondary ones, one more at the map edge — confirming both the multiplicity and the primary/secondary visual
  distinction (width and plank count). `117634240/03` (KILRARY) and `169047704/03` (RIVERFORGE): single
  perpendicular plank bridge each. `110526365/03`: two, both perpendicular, both with a dark shadow band on the
  water directly under the deck.
- `[INFERRED]` "As right as possible" is implemented by choosing the crossing *point* to optimise the angle rather
  than by rotating the deck: in every image the deck is straight, the road bends slightly on both approaches, and
  the crossing sits where the channel is locally straightest (e.g. `169047704/03`, where the bridge is at the one
  straight reach between two bends). Reasoning: if the deck were simply rotated to the normal, the road would kink
  at the bridge ends; instead the kink is distributed over the approach.
- **Unknown.** How many bridges are permitted; whether a minimum spacing is enforced; whether a bridge forces the
  road graph on both banks to connect (topological guarantee) or is only opportunistic.

### 2.9 Piers / docks

- `[STATED]` Suppressed on ponds entirely (88749133); suppressed on narrow rivers as a side effect of narrowing
  (89314043); drawn "as if made of tiny planks, same as bridges" from 1.5.3 (91692684).
- `[SHOWN]` Piers are straight, narrow, plank-hatched rectangles perpendicular to the local shoreline, in groups of
  1–5: `91692684/07` (3 on the inner bank of the eastern arm), `116745476/02,03` (3 on the east coast of the
  island), `104226049/03` (2), `169696051/02,04` (4–5 on the west shore of ALBERVEN), `121415691/02,05` (2).
  They start at the waterline and extend a fixed-ish distance into the water.
- `[SHOWN]` In the *glen* style (`117634240/02,04`) piers are rendered in a saturated warm orange against cold water
  — the palette treats pier/bridge timber as its own colour slot, not as a road colour.
- `[INFERRED]` Piers are placed along the settlement-facing stretch of shoreline at roughly even spacing, with the
  direction taken from the shoreline normal. Reasoning: in `116745476/03` the three piers are parallel, evenly
  spaced, and all on the shoreline segment nearest the built-up area; none appear on the wooded shores.
- **Unknown.** The width threshold below which a river gets no piers; whether piers connect to the road graph
  (no driveway-like connector is visible to them in any image).

### 2.10 Water rendering — nested offset bands

**Problem.** Convey depth and give the water body a soft, hand-drawn edge without a texture.

- `[SHOWN]` Every water body in this slice is drawn as a **stack of concentric bands derived from the shoreline**,
  each successively inset and successively darker/bluer. Clearest instances:
  - `89314043/02,04` (island): ~8 bands from near-white mint at the beach to open-sea teal; the outer bands are
    visibly **smoother and rounder than the coastline itself**, i.e. each offset is also smoothed, not a pure
    Minkowski inset; two adjacent islets' halos merge where they overlap.
  - `88749133/01,04` (pond): ~10 bands, mint rim → teal centre, plus two thin light strokes near the rim.
  - `104226049/04` (cove): ~15 fine bands producing an almost continuous gradient.
  - `169696051/02,04` (night): the bands degenerate to 3–4 thin light **contour strokes** on near-black water.
  - *duskvol* in `94118928/01`: the band ramp is **inverted** (light at the shore fading to black offshore), showing
    the ramp is a palette function, not a hardcoded direction.
- `[SHOWN]` Above the bands sit two more elements: a **beach/bank strip** in a sand colour on the land side
  (`89314043/04`, `104226049/04`, `116745476/03`), and a thin light **surf stroke** just outside the shoreline.
- `[INFERRED]` Implementation is iterated polygon offsetting with per-step smoothing (inset by δ, then relax/Chaikin,
  repeat N times), each ring filled with a colour interpolated along a two-stop ramp. Reasoning: the outer rings
  losing the coastline's small features while keeping its gross shape is the signature of repeated
  offset+smoothing; a distance-field threshold would preserve feature scale, and a blur would not produce the
  crisp banded edges visible in `88749133/04`.
- `[INFERRED]` This is the same machinery as the relief contour bands (§2.16): both are "nested offset loops of a
  region boundary", which is why ponds, coasts and hills all read as the same visual language.
- **Unknown.** Band count and spacing rules (they clearly scale with the body's size — the small pond gets ~10 tight
  bands, the open sea gets ~3 wide ones); whether the bands are true polygons or a pre-rendered gradient clipped to
  the water mask.

### 2.11 Farm fields — grouping and sector layout

**Problem.** "The part of the generator which is responsible for creating fields was (and still is) quite messy."

- `[STATED]` 1.5.1 changes (88749133), all stated as tendencies rather than rules:
  - "The fields tend to be **grouped together**, more than they did before. If the size of a village requires many
    fields, they just surround it, but **in small villages fields are usually located on one side of it**."
  - "The fields look like **sectors centred on the village** more often now. This is especially noticeable on maps
    without water features or large roads. **It's probably not a very realistic layout, but it looks nice.** I may
    want to tone this effect down in the future." — an explicit aesthetics-over-realism ruling.
  - "Some fields have **curvilinear edges** now."
- `[SHOWN]` `88749133/01,04`: a clean fan of wedge-shaped fields radiating S and SE from the village, all sharing
  the village as their apex — the sector layout at full strength, on a map with no river and no highway, exactly as
  the author predicts. `104226049/04` (LITTLE BAY): sector fields radiating west from the plaza, separated by
  cream lanes. `91692684/07`: a block of ~6 fields SE subdivided by narrow lanes, plus a second group N — grouping
  on two sides for a larger village.
- `[SHOWN]` Fields are separated by **narrow access lanes** in the road colour (`91692684/07`, `110526365/03`,
  `104226049/04`), so a field group is a subdivided polygon, not a set of independent polygons.
- `[INFERRED]` A field group is produced by taking an annular sector around the settlement (bounded inside by the
  built-up radius and outside by available space), then subdividing it — the subdivision lines in `91692684/07` are
  mostly radial with occasional cross-cuts, which is what recursive bisection of a sector produces. Reasoning:
  the lanes meet at T-junctions, not at a shared apex, and the resulting cells are quadrilateral-ish with two curved
  (arc) edges — the signature of splitting a sector rather than of a Voronoi or a strip layout.
- `[INFERRED]` The "curvilinear edges" are the arc edges inherited from the annulus; the straight edges are the
  subdivision cuts.
- **Unknown.** What determines the number of fields from population; whether field area is normalised;
  the priority order when fields compete with woods and water for space.

### 2.12 Furrows

- `[STATED]` 1.5.1: "Unfortunately, furrows are still straight and making them curved seems too difficult."
  1.5.3: "Farmfield furrows are drawn as slightly curvilinear now. Individual fields may look a bit odd, but overall
  this makes the whole map look more organic." (88749133, 91692684). A two-release arc from "too difficult" to
  shipped, with an acknowledged per-field cost accepted for a global gain.
- `[SHOWN]` Straight furrows in 1.5.1/1.5.2 images (`88749133/05`, `89314043/03`); gently curved furrows from 1.5.3
  onward (`105215836/04`, `110526365/03`, `169047704/03`). Furrow **direction is constant within a field and differs
  between adjacent fields** in every image — the single strongest cue that reads as "cultivation" on these maps.
- `[SHOWN]` Furrow spacing is roughly constant in screen units across field sizes, so large fields simply get more
  furrows.
- `[STATED]` 1.6.8 replaced the furrow **colour** parameter with a numeric intensity parameter (169696051).
- `[INFERRED]` Furrows are a clipped hatch: a family of parallel (then slightly warped) lines generated over the
  field's bounding box at a per-field random angle and clipped to the polygon. The "slightly odd individual fields"
  the author mentions is what happens when a warped hatch meets a field whose edges nearly parallel the furrows.
- **Unknown.** Whether the furrow angle is random per field or aligned to the field's longest edge/OBB (images show
  both cases); the warp function used for curvilinearity.

### 2.13 Orchards

- `[SHOWN]` Distinct from woods and from fields: a **regular rectangular grid of individual tree crowns**, evenly
  spaced in rows and columns. Clear instances: `89314043/02,04` (a 5×5–6 grid north of the diamond plaza),
  `110526365/03` (a grid of small crowns at the top-right). Not described in any post in this slice — orchards were
  introduced in 1.4.0 (post 80494491, previous slice).
- `[STATED]` (indirect) 1.6.0 mentions "several small fields or orchards inside the palisade" (104796798), so
  orchards are handled by the same field-cutting machinery as farm fields.
- `[INFERRED]` An orchard is a field polygon whose fill is a point grid of tree instances instead of a furrow hatch —
  same container, different renderer. Reasoning: orchards occupy field-shaped polygons, appear in the same places
  fields do, and are enumerated alongside fields by the author.

### 2.14 Trees — types and glyph construction

- `[STATED]` Types named across the slice: the pre-1.5.1 **"spiky"**, replaced in 1.5.1 by **Conifer** ("fluffier,
  their shading implies a conical shape") and **Palm** ("'spikes' … thicker and slightly bent… supposed to look like
  large pointy leaves"); **Cotton** is named in 1.5.3 and 2025 (88749133, 91692684, 121415691).
- `[STATED]` **The glyph is built from concentric bands**: "Individual trees in the generator are drawn as sets of
  concentric 'bands'. Now these bands are drawn with a **slight vertical offset (different for different types of
  trees)** to make them look a bit more three dimensional. The effect is more noticeable for *cotton* trees."
  (91692684). This is the single most useful rendering statement in the slice: a tree crown = N nested rings of the
  same silhouette, each scaled down and each shifted by a per-type vertical delta.
- `[STATED]` 1.5.3 also reshaped Palm "to look more like palms and less like starfish".
- `[SHOWN]` Silhouette families visible:
  - *cotton/broadleaf*: a bumpy circle (scalloped, ~8–14 lobes) — `105215836/04`, `89314043/04`, `116745476/03`.
  - *conifer/spiky*: an irregular star with sharp points — `88749133/05`, `104796798/02`, `94118928/01` (*haunted*).
  - *lobed/maple*: 5–7 rounded lobes — `88749133/04`, `121415691/05`.
  Each crown carries 1–2 visible inner rings offset upward from the outline, exactly as stated.
- `[SHOWN]` Crown **colour varies per tree** within a wood (2–4 greens, or a full autumn ramp in
  `90033685/03`: dark green, olive, yellow, gold, orange, crimson).
- `[STATED]` 1.5.4: "Trees are drawn much faster now" (104226049) — a pure performance change, no method given.
- **Unknown.** Number of bands per type and the exact offset magnitudes; how the silhouette is generated (a
  per-instance random polygon vs a small set of pre-built shapes, randomly rotated/scaled — the crowns in
  `116745476/03` look individually distinct, favouring per-instance generation).

### 2.15 Tree placement — noise field with domain warping

**Problem.** Put woods where a village would not clear them, and make the wood *edges* look natural.

- `[STATED]` "Normally the generator **grows trees away from houses and busy roads**. If you request a newly added
  tag *grove*, this behavior will be **reversed**: trees will be placed as close to buildings as possible, but the
  edges of the map will be left empty." (88749133)
- `[STATED]` "the edges of the woods are made much more chaotic now. Technically, it's implemented by applying
  **'domain warping' to the fractal noise used as a source of trees density**." (88749133)
  So the pipeline is: density = fBm(warp(p)) modulated by a settlement-avoidance term; trees are then sampled from
  that density.
- `[SHOWN]` `88749133/05` and `105215836/04`: wood boundaries are ragged and re-entrant, with detached clumps and
  narrow tongues — the signature of thresholding warped fBm rather than an offset polygon.
- `[SHOWN]` `121415691/02,05` shows the `grove` extreme: an island almost entirely covered by wood, with the
  buildings sitting in a narrow clearing and trees pressed right against them.
- `[SHOWN]` Trees also form **linear belts along field boundaries and river banks** (hedgerows) —
  `91692684/07`, `169047704/03`, `110526365/03`. This is not explained anywhere.
- `[INFERRED]` The hedgerows come from the avoidance term, not from an explicit hedgerow feature: field interiors
  and road corridors are suppressed, so the surviving density maxima are exactly the seams between them.
  Reasoning: the belts are always *between* two land uses and their width matches the gap between those polygons.
- `[INFERRED]` Individual trees are then placed by rejection/dart-throwing against the density field with a minimum
  separation (Poisson-disc-like): crowns overlap but never coincide, and spacing loosens smoothly toward the wood
  edge in `105215836/04`.
- **Unknown.** Number of octaves, warp amplitude, the exact form of the settlement-avoidance falloff, and whether
  `grove` flips the sign of that term or replaces it with a map-edge penalty (the stated "edges of the map will be
  left empty" implies an added edge term, not just a sign flip).

### 2.16 Woods as a two-part rendering: flat interior + crown boundary

- `[STATED]` 1.5.4 added the colour parameter **Thicket** — "As in the Cave/Glade Generator, it's the colour of
  inner parts of tree groups." (104226049)
- `[SHOWN]` Every wood is drawn as (a) a flat fill of the group's silhouette in the thicket colour, plus (b)
  individual crowns drawn along the boundary and scattered over the interior. In the line-art styles
  (`88749133/03,06`, *pencil* in `94118928/01`) the interior fill vanishes and only the boundary crowns remain,
  proving the two layers are independent.
- `[SHOWN]` Distant/background woods beyond the settlement's clearing are drawn as a **flat tinted region bounded by
  a scalloped ("cloud") line** with no individual crowns at all — `90033685/03` (dark green), `91692684/07` (brown),
  `117634240/03` (brown). So there are effectively three levels of detail for vegetation: crowns, thicket fill,
  and a far-field tint.
- `[INFERRED]` The group silhouette is the union of the crowns' discs (or an alpha-threshold of their coverage),
  since the thicket fill in `104226049/03` follows the crown outlines' outer envelope exactly.

### 2.17 Tree shadows

- `[STATED]` 1.5.3: "Shadows of *conifer* trees are drawn completely differently now. Instead of **duplicating an
  outer shape of a tree (an irregular star in the case of a conifer) with a small offset**, a **jagged triangle** is
  drawn. It looks much better and I will consider doing something similar for cotton trees as well." (91692684)
  — this tells us the *old* universal method (offset silhouette) and the *new* special case.
- `[STATED]` 2025: "The shadows of 'cotton' trees have been improved… Palm trees shadows have been slightly improved
  too, but it's only visible when *Shadow length* is large enough." (121415691)
- `[SHOWN]` `104796798/02` (conifers): each tree casts a long **jagged triangle** to the SW, and tree groups cast
  large merged jagged shadows — exactly as described.
- `[SHOWN]` `121415691/02,05` (cotton, post-improvement): the shadows form **large contiguous grey shapes** in the
  gaps between crowns rather than a stack of per-tree silhouettes. This is the improvement: the group's shadow is
  drawn once as a union of offset crowns, so overlapping shadows no longer darken cumulatively.
- `[SHOWN]` Shadow direction is a global style parameter, not fixed: SE in most maps, **SW** in `104796798/02`.
  *Shadow angle* and *shadow length* are named style parameters (104226049, 110526365).
- **Unknown.** Whether the jagged triangle is derived from the crown's spikes or generated fresh; the shadow's
  colour derivation (it is clearly a darkened/desaturated ground colour, not a constant).

### 2.18 Tree-group shading (1.6.2) and tree gradients (1.6.7)

- `[STATED]` 1.6.2: "groups of trees are now drawn shaded (**but not individual trees**). The strength of this
  effect depends on the *shadow color* **and** *shadow length*." (110526365) So the shading gradient's magnitude is
  tied to the same light model as the cast shadows.
- `[STATED]` 1.6.7: gradients are now used when rendering trees, with three options **None / Linear / Radial**
  in a new *Trees* dialog; partly ported from Cave/Glade Generator and Urban Places; "shaded trees generally look
  better, but they may make the rest of the map look somewhat not detailed enough." (169047704)
- `[SHOWN]` `169047704/02,04` is a three-panel None|Linear|Radial comparison at identical seed: panel 1 crowns are
  flat-filled; panel 2 crowns carry a linear ramp with a consistent direction across the map; panel 3 crowns carry a
  radial ramp with a lighter core, reading as domed. Group-level shading and cast shadows are present in all three,
  confirming these are three independent layers (group gradient, per-crown gradient, cast shadow).
- `[SHOWN]` `110526365/01,03`: whole wood masses carry a light-to-dark ramp across the group silhouette.

### 2.19 Road tags and topology

- `[STATED]` One of `highway` / `dead end` / `isolated` is always active (88749133). `crossroads` added in 1.6.4 for
  "a village at a highway intersection (a crossroads or a T-junction)" (116745476).
- `[STATED]` `crossroads` failure modes, shipped: "**sometimes highway branches loop back to the original road or
  get cut off by secondary roads**." (116745476) This is diagnostic — it says highway branches are grown
  independently and then reconciled against the secondary network, with no guard against re-joining their parent.
- `[STATED]` 1.5.3 fixed bugs causing "odd road forks around bridges and docks" (91692684).
- `[SHOWN]` Two distinct settlement plans recur:
  - **Radial-concentric web**: a round plaza with 6–10 radial spokes plus 2–4 concentric ring streets.
    `88749133/06` (B/W, very clear), `91692684/07`, `169696051/02,04` (ALBERVEN, the largest and clearest —
    an almost textbook radial-concentric web with buildings in curved rows between rings).
  - **Crossroads/linear**: two or three near-straight roads meeting at one junction, buildings strung along them.
    `105215836/02,04` (CLOVERTON), `169047704/03` (RIVERFORGE), `110526365/02,04` (estuary, purely linear along
    the banks).
- `[SHOWN]` Roads leaving the map degrade into **dotted trails** whose dots grow more widely spaced toward the edge
  (`105215836/04`, `169047704/03`) — a deliberate "peters out" convention rather than a hard cut.
- `[INFERRED]` Buildings line roads with their **long axis parallel to the street** and are set back by a roughly
  constant distance (visible in every village image), i.e. buildings are placed by walking the road polyline and
  offsetting to both sides — not by subdividing blocks as MFCG does. This also explains why "hide roads" (§2.27)
  leaves a coherent settlement: the buildings' arrangement already encodes the streets.

### 2.20 Road merging (1.5.4)

- `[STATED]` "The roads **merge** now instead of just bumping into each other. This makes them look more organic
  which is appropriate for village maps. If that's not what you need, you can disable merges in the *Style* dialog
  (since I guess it's a matter of style). **The implementation is quite crude**, so I may want to try improving it."
  (104226049)
- `[SHOWN]` `104226049/03`: side roads curve tangentially into the trunk road, producing rounded Y-junctions with a
  fillet, rather than square T-junctions. Contrast `105215836/04` (1.6.1, post-"curvy" fix) where junctions are
  near-right-angled — showing merging and orthogonality are independent knobs.
- `[INFERRED]` "Crude" + "a matter of style" together suggest a *rendering-time* treatment (widening/filleting the
  junction area of the road ribbon) rather than a change to the road graph — a graph change would not sit in the
  *Style* dialog. Reasoning: the *Style* dialog elsewhere in VG holds only appearance parameters.

### 2.21 Driveways (1.5.4)

- `[STATED]` "Some buildings (**mostly larger ones**) are now explicitly connected by 'driveways' to roads **they
  are lining**. I tried to connect **all** the buildings, but it looked wrong, **like modern suburbia**." Toggle
  lives in *Layers*, not *Style*. (104226049)
- `[SHOWN]` `104226049/04` (LITTLE BAY) and `104226049/03`: short perpendicular stubs in the road colour from a
  building's street-facing side to the road edge. Length is a small multiple of the building's setback.
- `[INFERRED]` The selection rule is a probability weighted by building footprint area, since the author says
  "mostly larger ones" rather than "all buildings above size X", and both small and large buildings have stubs in
  `104226049/04`.
- **Note for a re-implementer.** This is a rare explicit statement of a *negative* aesthetic constraint: full
  connectivity is achievable and was rejected because it reads as modern suburbia. Partial connectivity is the
  feature.

### 2.22 Roads and terrain — isohypse preference (1.5.4)

- `[STATED]` "Roads run uphill and downhill more reluctantly now, preferring **isohypses** depending on the
  steepness of a slope. I see that the resulting road networks look different, but **I'm not 100% sure if they look
  better/more correct** than before…" (104226049)
- `[INFERRED]` A least-cost path over the height field where the step cost includes a term in the height difference
  (or in |∇h·direction|) scaled by local steepness — i.e. an A*/Dijkstra edge weight of the form
  `len * (1 + k * |Δh| / len)`. Reasoning: "preferring isohypses *depending on the steepness of a slope*" means the
  penalty is itself slope-dependent, which is what happens when the cost is a function of gradient magnitude rather
  than a fixed contour-following bias.
- `[STATED]` Related author position on hairpins (comment thread, 90033685): "The lack of hairpin turns in the
  current version doesn't seem to be a problem to me, because slopes there are not steep enough to make them
  necessary. Cliffs would imply larger height differences though, so I'll have to come up with something…"
  So serpentines are explicitly *not* implemented, and are a known prerequisite for cliffs.
- **Unknown.** The cost function's exact shape and the search substrate (grid vs road-graph candidates).

### 2.23 The "unreasonably curvy roads" bug and the density-map rewrite (1.6.1)

- `[STATED]` "*The most important one* of these 'other changes' is that the bug that made roads **'unreasonably
  curvy'** is fixed — **it was hard to get a regular right-angled road pattern even on a perfectly flat land**.
  Another related change is that **population density maps are generated very differently now**. As a result,
  villages tend to be more densely built now, although I'm not sure it's a good thing." (105215836)
- `[INFERRED]` The two are linked because road routing consumes the density map: if the density field was noisy at
  small scale, the least-cost path would wander even on flat ground. Reasoning: the author presents the density-map
  change as "related" to a road-curvature fix with no other connection offered, and §2.22 establishes that roads
  follow a cost field.
- `[SHOWN]` `105215836/02,04` (CLOVERTON, the release's own illustration) shows straight road segments meeting at
  near-right angles on rolling terrain — the fix's advertised result.
- **Note.** This is a behaviour-shift release: the same seed would not reproduce a pre-1.6.1 map. The author flags
  the density change's side effect (denser villages) and is ambivalent about it.

### 2.24 Population density map

**Problem.** One scalar field drives several unrelated features, which is why it appears in three separate posts.

- `[STATED]` Consumers of the density map named in this slice:
  1. **Spotlight focus** — "by default it's at the **point of maximum population density** — the idea is to
     highlight the busiest part of the village" (104226049).
  2. **Palisade shape** — "The shape of the enclosure depends on the 'population density map'. As a result,
     *sparse* villages tend to be surrounded by smaller fences and vice versa" (104796798).
  3. **Building placement density** — implied by the 1.6.1 note that regenerating the map differently made
     "villages… more densely built" (105215836).
- `[STATED]` The `district` tag "only affects the density of buildings and crossroads" (91692684), and `dense` /
  `sparse` are tags — so the density field has user-facing scalar controls.
- `[INFERRED]` A smooth 2D scalar field peaking at the settlement centre, modulated by roads and water; the palisade
  is a level set of it (§2.25). Reasoning: the palisade outlines in `104796798/02` and `116745476/04` are smooth,
  convex-ish, slightly irregular ovals — exactly what a level set of a smooth radial field with mild noise gives.
- **Unknown.** Whether it is a grid or analytic; what "generated very differently" changed to; whether the field is
  regenerated or merely re-sampled when the user changes `dense`/`sparse`.

### 2.25 Palisades (1.6.0 / 1.6.1)

**Problem.** From the plans post: "Should I generate a village first and then surround it with a wall or vice versa?
How many roads should be allowed to 'pierce' a wall and create a gate? How the wall is supposed to look on a map of
a village scale?" (90033685). The shipped answers:

- `[STATED]` **Village first, wall second.** The enclosure is derived from the density map (104796798), which only
  exists once the settlement is laid out.
- `[STATED]` **The wall cuts other features.** "The fence cuts through woods with a chance to leave some trees
  inside. It doesn't make much sense, but it looks more interesting this way. The same thing is done to farm fields,
  so usually there are several small fields or orchards inside the palisade. However, the implementation of this is
  much more complex and more glitchy, so it's **quite common to get fields overlapping each other**." (104796798)
  — a shipped known defect, stated plainly.
- `[STATED]` **Gates are houses.** "There are no real gates — they are portrayed by **regular houses placed where
  roads cross the wall** (same as in Village Generator itself)." (105215836). Corroborated by the 1.6.4 note that
  gates can be numbered and opened in Dwellings **because** they are buildings (116745476).
- `[STATED]` **Export**: "its data is just another **list of polylines**" (105215836) — the palisade is not a
  polygon in the exchange format. A commenter asks whether it is "a new kind of 'walls' (GeometryCollection/
  Polygon)"; the author does not answer in-thread.
- `[SHOWN]` Rendering in VG: a **closed, smooth, egg-shaped/elliptical loop drawn as a dense row of small circles**
  (stake tops seen from above) over a continuous darker band, with a slightly darker cleared strip just inside.
  `104796798/02` (WYMA'S RISE), `116745476/01,04` (ASTFIN), `117634240/03` (KILRARY, four gates),
  `117634240/04` (*morning* style thumbnail).
- `[SHOWN]` Gate buildings straddle the wall, oriented across it; 3–4 per map in the examples.
- `[SHOWN]` Rendering in City Viewer (`105215836/01,05,06`): a smooth white extruded ribbon — "palisades that look
  more like smooth, low garden walls (made of stone or something), than rows of wooden stakes", acknowledged by the
  author as a compromise forced by the Viewer's minimalist style.
- `[STATED]` A patron notes the JSON export still reported version 1.5.4 and lacked the palisade; the author
  replies: "**exporting a palisade as a city wall would make it look really weird in the City Viewer**" — i.e. he
  deliberately did not reuse the existing wall channel, and shipped a dedicated one a week later (104796798 thread).
- `[INFERRED]` The enclosure is a level set of the density map, smoothed, then resampled to a closed polyline; the
  bead rendering places circles at fixed arclength intervals along it. Reasoning: the beads are evenly spaced
  regardless of curvature, and the loop is C1-smooth with no vertices.
- **Unknown.** How the level threshold is chosen; the rule for which road crossings become gates (all of them, in
  every image examined); how the "chance to leave some trees inside" is parameterised.

### 2.26 Village square and centrepieces

- `[STATED]` 1.5.2: "Sometimes, a **rectangular village square** is spawned instead of a round one… This adds some
  variety, but **in my opinion round squares look more natural, so I made them more common**." (89314043)
- `[STATED]` 1.5.3: a new centrepiece type, a **tower** — "a square building with a longer shadow to make it look
  high"; and "When a village square overlaps a 'highway' (on *highway* and *dead end* maps), they **always get
  aligned** now to prevent the highway from entering the square at an oblique angle." (91692684)
- `[STATED]` 1.6.4/1.6.5: towers were initially *props*, not buildings — they could not be numbered or opened in
  Dwellings; 1.6.5 made them real buildings (116745476, 117634240).
- `[SHOWN]` Centrepiece variants observed: a small dark **dot/well** at the plaza centre (`91692684/07`,
  `116745476/04`, `169696051/04`, and as a white cylinder in City Viewer `105215836/05`); a **tree**
  (`110526365/03` — a single crown at the exact centre of the round plaza); **nothing at all**
  (`104226049/04`, where the plaza is unusually large).
- `[SHOWN]` Plaza shapes: circle (most), ellipse (`116745476/04`, `105215836/05`), and a **rotated square /
  diamond** (`89314043/02,04`) — the 1.5.2 rectangular variant.
- `[SHOWN]` Plaza size varies a lot relative to the village: tiny in `169047704/03` (none visible), very large in
  `104226049/04`.
- `[SHOWN]` Large buildings may carry a **dome**: a circle filled with a tight spiral of concentric arcs, a
  highlight, and a cast shadow — `105215836/04` (CLOVERTON, a big slate hall), `169047704/03` (RIVERFORGE, two such
  buildings), `116745476/04` (ASTFIN, a red one). This is the 1.5.1 "large buildings with a flat roof have a dome on
  top instead of a tower" rule, rendered.
- **Unknown.** Probability split between round/rectangular; how the centrepiece type is chosen; whether the plaza is
  placed before or after the roads (the highway-alignment rule implies the square can be moved/rotated after the
  highway exists).

### 2.27 Roofs and house rendering

- `[STATED]` Roof styles named: **gable**, **hip**, **flat** (1.5.1, with a **dome** on large flat-roofed
  buildings), **ruin** (1.5.3: "buildings are drawn without roofs at all and with an **incomplete set of walls**").
  (88749133, 91692684)
- `[STATED]` 1.5.4: "Gable roofs are hatched differently now. The new look is **more rustic** and I like it, but
  probably I should keep both variants." "Flat roofs got **'inner shadows'** and a bit more detailed ground shadows
  to make them look less like plain rectangles." (104226049)
- `[STATED]` 1.6.1: "A number of improvements have been made to *the way houses are drawn*, all kinds of houses…
  I wanted all of them to be more or less equally appealing, but **I guess gable roofs are still the most
  polished**." (105215836)
- `[STATED]` 1.6.8: roof-hatching colour parameters replaced by a numeric **Details** parameter, 0 = no hatching,
  1 = very prominent (169696051).
- `[SHOWN]` Gable = a rectangle with a ridge line along its long axis and hatch strokes perpendicular to the ridge,
  often with one slope lighter (`91692684/07`, `105215836/04`, `169047704/03` where the hatching reads as planks).
  Hip = a rectangle with diagonals from the corners meeting in a short ridge, four facets differently toned
  (`90033685/04`, `104226049/03`). Flat = a plain rectangle with a doubled inset outline and an inner shadow on the
  lower-right (`104226049/04`, `88749133/04`). Ruin = broken L- and U-shaped wall fragments with no fill
  (*parched* style, `117634240/04`).
- `[SHOWN]` Roof **colour varies per building** from a small palette (tan / salmon / slate blue / mauve / rust in
  `104226049/03`; red-orange in `110526365/04`; two browns in `116745476/03`).
- `[STATED]` 1.6.8 added "numerous small improvements… to the rendering of houses (hip- and flat-roofed)"
  (169696051).
- `[STATED]` Forward-looking constraint (117634240): "**Better buildings** i.e. more diverse in size and shape.
  Unfortunately, it seems like **I'll have to abandon the 'fake perspective' style**." Restated in 1.6.8's plans as
  "introducing non-rectangular houses… small details like chimneys and dormers". So rectangularity is a *consequence
  of the fake-perspective renderer*, not an independent choice.

### 2.28 Fake perspective, and the Top-down option

- `[SHOWN]` Houses are drawn as oblique extrusions: a roof polygon, one or two visible wall quads on the
  down-screen side, and a cast shadow. The extrusion direction is **globally constant across the map** (not
  per-building, not radial from the map centre). Best seen in the minimalist blue style `90033685/02,04`, where each
  building is unmistakably a box with a lit top face, a darker lower wall face, and a shadow; and in
  `169696051/02,04` (ALBERVEN) where hundreds of dark blocks all lean the same way.
- `[STATED]` 1.6.7 added a **"Top-down"** option that "disables the 'fake perspective' on houses **and trees**. The
  effect is quite subtle but noticeable. In the current version, the option is unchecked by default; later I'll make
  it checked by default and eventually I'll remove it and make its effect permanent." (169047704)
  Note this confirms trees are also drawn with the same fake perspective — consistent with the per-type vertical
  band offset of §2.14.
- `[INFERRED]` The house glyph is: base rectangle → offset copy by a constant vector `(0, -h)` for the roof →
  side quads between corresponding edges → roof detail (ridge/hatch) → separate shadow from the base offset by the
  shadow vector. Reasoning: the walls in `90033685/04` are parallelograms between two congruent rectangles, and the
  shadow direction (§2.17) is independent of the extrusion direction.

### 2.29 Spotlight (1.5.4)

**Problem, stated verbatim.** "The main purpose of the spotlight is to fight the monotony of empty spaces on a map:
in most cases, **an empty patch of a subtle gradient looks better than an empty patch of solid colour** (although
some kind of ground clutter would help more)." (104226049)

- `[STATED]` A soft radial gradient over the map; "similar to vignetting, but more customizable and sort of
  smarter". Parameters, all stated:
  - **Focus position**: default = the point of maximum population density; alternatives = map centre, or pushed to
    the map edge according to the *shadow angle* style parameter.
  - **Colours**: periphery darkened with the *shadow color*; focus highlighted with its **complementary colour**.
    Neither is directly settable; only their **saturation** is adjustable.
  - **Intensity**: darkening and lightening amounts are independent.
  - **Size**: how large the illuminated area is.
  - Dialog *Layers > Spotlight…*; toggle key **L**.
- `[SHOWN]` `116745476/01,04` (ASTFIN) is the strongest example: inside the palisade the ground is bright
  cream-yellow, the map corners are dark teal — a warm/cool complementary pair exactly as described.
  `104226049/01,03` (RAMODEN): the effect crosses land *and* water, so it is composited over the finished map, not
  baked into the ground fill. `121415691/05`: a bright clearing fading to dark at the island's rim.
- `[INFERRED]` Composited as a full-frame two-stop radial gradient (multiply/screen or an equivalent soft-light
  pair) after all layers are drawn, since no object is exempt in any image.

### 2.30 Ground shading / hillshade (1.6.2)

- `[STATED]` "the ground is now drawn shaded: **sun-facing slopes are highlighted and the opposite ones are
  darkened**. In a sense, this feature **functionally duplicates hachures**, but unlike hachures, it also affects
  **roads and fields**. How pronounced the effect depends on the *shadow color*, and in some extreme cases it can
  make the ground look… **plastic**." Toggle *Layers > Shading*. (110526365)
- `[SHOWN]` `110526365/01,03`: large smooth light/dark regions whose boundaries follow the terrain and which darken
  the maroon fields and the roads identically to the grass — i.e. the shading is applied to the whole ground stack,
  above fields and roads but below trees/houses. Water appears exempt (the river stays bright through a shaded
  region). `110526365/02,04`: the same on a gold palette.
- `[INFERRED]` Classic Lambert hillshade: `shade = dot(normalize(∇h ⊕ 1), L)` mapped through the shadow colour's
  value, using the same light azimuth as the cast shadows (*shadow angle*). Reasoning: the author ties the strength
  to *shadow color* and the highlight/shadow polarity matches the cast-shadow direction in the same images.

### 2.31 Relief visualisation modes: hachures, contours, grass

- `[STATED]` Three named modes exist: **Hachures**, **Contours**, and **Grass**. 1.6.7: "The **'Grass'** relief
  visualization option has been reworked and now it looks like **noisier hachures**. Perhaps it is not needed at
  all, and *Hachures* and *Contours* are enough." (169047704)
- `[SHOWN]` **Hachures** (`105215836/02,04`, CLOVERTON): the open ground is covered with rows of tiny dashes laid
  *along* contour lines, forming nested closed loops around each hill — a dense, low-contrast field of ticks.
  This is the clearest relief rendering in the slice.
  **Contours** (`89314043/03`, `169047704/03`): thin continuous wavy lines, sparse, low contrast.
  **Grass** (`169047704/02,04`, `121415691/05`): scattered small "u"/"v" tick marks, noisier and less obviously
  aligned to contours.
- `[INFERRED]` All three are the same extraction (iso-lines of the height field, i.e. marching-squares or the same
  nested-offset machinery as §2.10) with three different stroke renderers: continuous line, tick-row along the line,
  and jittered tick-row. Reasoning: in `105215836/04` the dash rows are perfectly nested and equally spaced in
  height, exactly like the contour lines in `89314043/03` but stippled.
- `[STATED]` **Cliffs** remain unimplemented across the whole slice, from the 2023 plans post to 1.6.8's "what's
  next" (90033685, 117634240, 169696051). The 2023 description is method-bearing: "These cliffs are **not real,
  they are just fancy contour lines**. To implement cliffs properly, I'll have to make all map objects interact with
  them — roads should go around them, houses shouldn't overlap them etc." `[NAMED-ONLY]` as a shipped feature.

### 2.32 Selective outlining and the Pressure parameter (1.6.8)

**Problem.** Solid black outlines make the map hard and "inky".

- `[STATED]` "The contours of visual objects… are now rendered using **shades of the objects themselves**, rather
  than solid black (or any other fixed colour). Apparently, the technique is called **'selective outlining'**,
  although I'm not sure if the term is used outside of pixel art… the change makes maps look **softer, more natural
  and… just better**." Previously implemented in Perilous Shores (post 149496680). (169696051)
- `[STATED]` The **Pressure** parameter (*Style > Misc.*) defines "how much the *Ink* color affects the final
  outline color. **'Hard Light' blend mode** is used for mixing."
  - `Pressure = 1.0` → solid *Ink* outlines everywhere (legacy look). "Setting this parameter to 1 and to 0.999 may
    produce very different results!" — i.e. 1.0 is a discontinuous special case, not the limit of the ramp.
  - `Pressure = 0` → **disables all outlines and most strokes** (e.g. furrows). Key **P**.
- `[SHOWN]` `169696051/01,03` is a same-seed before/after pair. BEFORE: heavy black shoreline; every crown, house,
  field and pier outlined in black. AFTER: the shoreline's black line is gone (replaced by the beach strip and a
  subtle darker-green edge); crowns are outlined in a darker shade of *their own* green (so pale crowns get a mid
  green, dark crowns keep a near-black edge, and the mass reads as more three-dimensional); houses get dark versions
  of their roof colour; fields get dark browns; the ground's grass ticks are much subtler.
- `[INFERRED]` Outline colour = HardLight(darken(object_fill), Ink) lerped by `pressure`, with `pressure==1`
  short-circuited to `Ink`. Reasoning: this is the only formulation that satisfies all three stated facts —
  continuous influence of Ink, a discontinuity precisely at 1.0, and a separate meaning at 0.
- `[STATED]` Simultaneously, roof hatching / tree detail / field furrow **colour** parameters were replaced by
  **numeric** parameters (169696051) — the detail strokes are now derived from the base colour by the same
  shade-of-itself logic, with a scalar for prominence.

### 2.33 Village lights / street lights

- `[STATED]` 1.6.4: "'Street lights' are made **brighter and at the same time less 'blinding'** i.e. they don't
  obscure details below as much as before." (116745476)
- `[STATED]` 1.6.8: "'Village lights' now switch on and off **not independently, but based on a single continuous
  map**. This makes some 'streets' look busy and others quiet." (169696051)
- `[SHOWN]` `169696051/02,04` (ALBERVEN at night): warm yellow glows hug the street lines; the southern half of the
  town is strongly lit in continuous ribbons while the north and east are dark. Within a lit region the light is
  continuous along the street, not a row of independent points. `88749133/02,05` (pre-1.6.8) shows the older
  behaviour: isolated warm blobs scattered along roads with no large-scale grouping. `117634240/04` (*glen*):
  warm lights along a riverside street.
- `[INFERRED]` A smooth scalar field (very plausibly the population-density map of §2.24, or a low-frequency noise
  field) sampled at each lamp position and thresholded — which converts an i.i.d. per-lamp Bernoulli into spatially
  correlated on/off runs, exactly the stated effect.

### 2.34 House numbering (1.6.4 / 1.6.5)

- `[STATED]` Origin: "Initially, I implemented 'number all houses' as a **debug feature**", then repurposed after
  public feedback that numbering a *subset* would be more useful (116745476).
- `[STATED]` Interactions: mark/unmark via context menu or **shift+click**; mark-all still available;
  "When all the houses are numbered, they are **ordered in an interesting, but maybe not the most convenient way**";
  gates can be marked but towers cannot (1.6.4) — fixed in 1.6.5 when towers became real buildings; permalinks did
  not store marks in 1.6.4, and do from 1.6.5 (116745476, 117634240).
- `[SHOWN]` `116745476/02,03`: 133 numbered buildings on an island. Labels are small dark rounded rectangles with
  white numerals, placed on the building. Reading the order: **1–3 sit at the village core**, then the numbers walk
  outward *along streets* in contiguous runs (4–17 down one street, 18–36 around the south, 37–50 up the east side,
  51–65 around the north-east, 66–80 across the north, 81–102 down the west), and the **last block, 119–133, is the
  scattered peripheral/outlying buildings**.
- `[INFERRED]` The numbering is simply the internal **creation order** of the building list, which is itself
  centre-outward and street-by-street, with outliers appended by a later outskirts pass. Reasoning: the order is
  neither a spatial sort (not by x, y, angle or radius — it jumps between quadrants at run boundaries) nor a
  contiguous spiral, but it *is* locally coherent along streets, and the trailing 119–133 block is exactly the set
  of isolated buildings a final pass would add. This also explains the author's "interesting, but maybe not the most
  convenient" — it is an implementation artefact, not a designed ordering.

### 2.35 Grid overlay (1.6.8)

- `[STATED]` "You can now enable the **grid overlay** (hidden by default). The grid size and its opacity can be
  adjusted in a dedicated window. The grid size is specified in **abstract units; I might replace them with meters
  or feet later**." (169696051) — so VG has no committed real-world scale at this point.
- `[SHOWN]` Ambiguous. In `169696051/02,04` (ALBERVEN) the north-east quadrant carries a faint, perfectly regular
  lattice of uniform pale rectangles. This is consistent with either (a) the new grid overlay at low opacity,
  visible only over the mid-tone ground and lost against the dark water and trees, or (b) a regular block district.
  I could not resolve it from the image; see §6.

### 2.36 Styles, palettes and the style collection

- `[STATED]` 1.5.1 replaced the *Hot* preset with **Sand** ("quite similar, but a bit brighter") (88749133).
- `[STATED]` 1.5.2 added a **random preset** (*Style* dialog, or key `0`), with a candid caveat: "As always, random
  styles don't look great here. **It's surprisingly hard to generate a colour scheme that looks good**, maybe I
  should try googling some theory on the subject…" (89314043). A patron replies that random presets are "correct"
  in practice.
- `[STATED]` A shared **style collection page** (`watabou.github.io/village_styles.html`), identical in mechanism to
  the Perilous Shores one, linked from itch.io and Arcana (94118928); 1.6.5 added three more styles (117634240);
  1.6.7 added a "More styles" link inside the *Style* dialog (169047704); 1.6.8 re-tuned every built-in and
  collection style for selective outlining (169696051).
- `[SHOWN]` Named styles in the gallery screenshot `94118928/01`: **gis** (white ground, roads as thin grey
  casings with no fill, buildings as small unfilled rectangles, flat mint tree blobs with no crowns, flat cyan
  water, no shadows — a deliberate modern-GIS look); **gossamer** (ochre ground, slate water, charcoal buildings);
  **pencil** (pure line art, everything unfilled); **vivid** (saturated chartreuse/forest green/teal with banded
  water); **duskvol** (white ground, near-black water with an *inverted* shore ramp); **capricorn** (island, cream
  sand, wide white-to-mint water glow); **haunted** (dark slate, black spiky conifers, long jagged shadows);
  **subtle** (beige monochrome, outline-only trees, visible contour lines); **fall** (autumn).
  `117634240/02,04` adds **parched** (sepia, ruin-style buildings), **glen** (dark teal night, warm orange piers and
  street lights), **morning** (island with a palisade, blue water, red roofs).
- `[STATED]` Colour parameters named across the slice: *shadow color*, *shadow angle*, *shadow length*, *Ink*,
  *Thicket*, *Pressure*, text colour, text-outline colour, plus numeric *Details* for roof hatching, tree details
  and field furrows.

### 2.37 Nameplate / village plate

- `[STATED]` 1.5.3 fixed the map title's outline in PNG export (91692684). 1.6.5 added a **"Hide population"**
  checkbox in the *Village plate* dialog, letting the name show without the number (117634240).
- `[SHOWN]` The plate is two lines — a large serif small-caps name over a smaller "POP. N" — placed in a corner or
  at the bottom, with the placement varying per map: top-left (`91692684/07`, `169047704/03`, `169696051/04`),
  top-right (`104226049/04`, `116745476/04`), bottom-left (`105215836/04`). Text is filled in one style colour with
  a contrasting outline and a soft drop shadow; both polarities occur (cream-on-dark outline, and dark-on-cream).
  `117634240/03` (KILRARY) shows the name with **no population line** — the 1.6.5 feature.
- `[INFERRED]` The corner is chosen to avoid the settlement (in every image the plate sits over empty ground or
  water), so there is some emptiness metric per candidate corner.

### 2.38 Map dimensions

- `[STATED]` 1.6.7: "The Arcana version of the generator creates the **initial map using the current window size**.
  As a result, you don't get the usual black bars on the sides. Then you can select the dimensions you need as usual
  (via the *Map parameters* dialog)." (169047704)
- `[SHOWN]` Aspect ratios in this slice range from square (`104796798/02`, 2560×2560) through 2:3 portrait
  (`91692684/07`, 1280×2048) to 3:2 landscape (`104226049/03`, 2400×1600) — non-square maps arrived in 1.5.0,
  immediately before this slice.
- `[SHOWN]` The generated content adapts to the aspect: portrait maps place the settlement's long axis vertically
  (`117634240/03`), so the layout is not a square design cropped.

### 2.39 Export and interchange

- `[STATED]` JSON export: fixed for island villages in 1.5.1 (88749133); palisade added in 1.6.1 as
  "just another list of polylines" (105215836); a patron reports the exporter still self-identified as 1.5.4 in
  1.6.0 (104796798 thread). SVG and PNG export both exist (91692684, and MFCG's SVG fallback advice in 121415691).
- `[STATED]` **City Viewer** consumes the JSON and renders it in 3D; adding palisade support "was a bit more complex
  … because I always struggle with 3D" and it was "unclear what palisades were supposed to look like there, given
  the 'super-minimalist' style of the Viewer" (105215836).
- `[STATED]` **Dwellings** integration: double-click a building to open it there (works on gates, and on towers from
  1.6.5) (116745476, 117634240).
- `[STATED]` **Permalinks**: the address bar encodes the map; from 1.6.5 it also encodes which buildings are
  numbered (117634240). Corroborated by the recorded launch URL form `?seed=…&tags=…`
  (`captures/village/2026-09-21T05-37-29/meta.json`).
- `[SHOWN]` City Viewer conventions (`105215836/01,05`): palisade as a smooth extruded white ribbon; gates as
  ordinary gabled houses straddling it; square as a flat tan ellipse with a small white cylinder; buildings as white
  boxes with brown gable roofs and tiny square windows; trees as green ellipsoids; fields as flat brown polygons;
  soft ambient shading with no cast shadows.

---

## 3. Visual and style conventions observed in the images

**Palette structure.** Every style resolves to roughly the same slots: paper/ground, a second ground tint for
woods, thicket (wood interior), field, road, water (two-to-three stop ramp), roof colours (a small per-building
palette), ink/outline, shadow, text, text outline. Styles differ by filling those slots, not by changing the
drawing. *gis* and *pencil* prove the renderer degrades gracefully to zero-shadow, zero-fill line art.

**Line weights.** One hairline weight for outlines; a slightly heavier weight for the shoreline (pre-1.6.8) and the
palisade's underlying band; detail strokes (roof hatch, furrows, hachures) are thinner than outlines and, from
1.6.8, tinted rather than black.

**Hatching vocabulary.** Four distinct hatches, all clipped to their polygon: roof planks (parallel, perpendicular
to the ridge, sometimes fanned on hip roofs), field furrows (parallel, per-field angle, slightly curved from 1.5.3),
bridge/pier planks (short ticks across the deck), and relief hachures (tick rows along contours).

**Shadows.** One global direction and length per map (*shadow angle*, *shadow length*). Houses cast hard-edged
offset silhouettes; conifers cast jagged triangles; cotton/broadleaf groups cast a single merged offset silhouette;
bridges cast a dark band on the water; the palisade casts a band along its length; the dome casts its own shadow.
Towers are distinguished from ordinary buildings purely by a **longer** shadow.

**Water.** Nested offset bands from the shoreline (§2.10), a sand/bank strip on the land side, a thin surf stroke,
and — on rivers — a lighter streak down the middle. Night styles reduce the bands to 3–4 light contour strokes on
near-black water.

**Trees.** Concentric bands per crown with a per-type vertical offset; per-crown colour variation; flat thicket fill
under the group; scalloped "cloud" boundary for far-field woods; grid layout for orchards; linear belts along field
and river edges.

**Roads.** Filled ribbons slightly lighter than the ground (near-white in `169047704/03`, cream elsewhere), with a
soft edge; junctions filleted when merging is on; roads leaving the map degrade into dotted trails with increasing
dot spacing; short driveway stubs connect some buildings.

**Labels and legends.** Serif small-caps for the settlement name; "POP. N" beneath in a smaller size; both cream-on
-dark and dark-on-cream polarities; corner placement chosen to avoid content. House numbers are white numerals in
small dark rounded plates on the building. VG itself has no legend or scale bar in any image in this slice — the
legend-with-scale-bar convention (a cream box, an alternating black/white scale bar reading "100 200 300 400 m",
and a numbered district list with black circular markers) appears only on the MFCG map in `121415691/03,06`.

**Off-slice note.** `91692684/02–06` are Wreath Generator images (Halloween). They are worth one line only because
they show the same glyph vocabulary reused elsewhere: radial fans of tapered strokes, concentric scale stacks for
cones, and recursive branch structures — the same "stroke families along a path" approach the tree and hachure
renderers use. `121415691/01,04` are Dwellings floor plans (hatched walls, labelled rooms, fan-glyph stairs).

---

## 4. Creator's stated design philosophy and constraints

1. **Looks over realism, stated explicitly.** On sector fields: "It's probably not a very realistic layout, but it
   looks nice." On palisades cutting woods: "It doesn't make much sense, but it looks more interesting this way."
   (88749133, 104796798)
2. **Partial is better than complete.** Driveways connect only some buildings because connecting all "looked wrong,
   like modern suburbia" (104226049). Piers are omitted on narrow rivers rather than forced.
3. **Ship known defects, name them.** Confluence bridge angles, overlapping fields inside palisades, crossroads
   branches looping back — each is announced in the release post that ships it (91692684, 104796798, 116745476).
4. **Rewrite when the internals are the problem.** Rivers were rebuilt from scratch rather than refactored because
   "*inside* it was a total mess" (89314043).
5. **Features must interact, or they are not done.** The cliffs plan is blocked precisely on interaction: "I'll have
   to make all map objects interact with them — roads should go around them, houses shouldn't overlap them" — which
   is why cliffs stayed unimplemented across three years of this slice (90033685 → 169696051).
6. **Batch size is a deliberate constraint.** "There could be more of them, but I didn't want to pile them up"
   (88749133). Updates alternate between a feature release and a follow-up fix release.
7. **Empty space is a design problem.** The spotlight exists to fight "the monotony of empty spaces"; the author
   notes the better answer would be "some kind of ground clutter" (104226049).
8. **Honest uncertainty about his own changes.** On isohypse roads: "I'm not 100% sure if they look better/more
   correct than before." On denser villages after the density rewrite: "although I'm not sure it's a good thing."
   On the Grass relief mode: "Perhaps it is not needed at all." (104226049, 105215836, 169047704)
9. **A rebuild is anticipated, not promised.** "There are just a few things that I'd like to implement in this
   generator before I decide that it needs to be remade from scratch"; and to a worried patron: "I will only
   rebuild it from scratch if I expect the new incarnation to be better than the current one (that's the whole
   point)… I will not start doing this for at least a few months." (117634240) As of 1.6.8 (2026-09) the rebuild has
   still not happened.
10. **The fake-perspective style is a known dead end.** Better, more varied buildings require abandoning it
    (117634240); non-rectangular houses are the 1.6.8 forward plan (169696051).
11. **Cross-generator transplantation is routine.** Thicket colour and tree gradients came from Cave/Glade Generator
    and Urban Places; selective outlining came from Perilous Shores; the style-collection page is shared with
    Perilous Shores (104226049, 169047704, 169696051, 94118928).

---

## 5. Useful facts from comment threads

- **MFCG size semantics** (121415691, author reply 2025-03-11, in answer to "is that 60 determining the number of
  buildings?"): "It's the latter. A 'medium'-sized city is usually made of **1000-2000 buildings** (you can see the
  exact number in the Settlement window). The **'size' parameter determines the number of 'cells'** with each cell
  divided into blocks and subsequently individual buildings." — MFCG's size is a mesh-cell count, not a building
  count, which is why building counts vary at fixed size.
- **Palisade export decision** (104796798, author reply 2024-05-24): asked about the missing JSON, the author says
  "exporting a palisade as **a city wall** would make it look really weird in the City Viewer" — he rejected reusing
  the existing wall channel, then shipped a separate polyline channel a week later. A follow-up comment asks whether
  it will be "A new kind of 'walls' (GeometryCollection/Polygon)?" — unanswered in-thread.
- **Serpentine roads** (90033685, author reply 2023-10-02): two patrons independently ask for hairpin turns on
  slopes. Author: "The lack of hairpin turns in the current version doesn't seem to be a problem to me, because
  slopes there are **not steep enough** to make them necessary. Cliffs would imply larger height differences though,
  so I'll have to come up with something…" — establishes that current terrain is deliberately gentle.
- **Gate shadows** (104796798, 2024-05-25): a patron specifically praises that "the shadows of the wall gates show
  the arch of the opening" — so the gate building's shadow includes an arch cut-out, a detail not visible at the
  resolutions in this archive.
- **Random palettes** (89314043): a patron reports "Random preset do not look that bad. I played a bit with it,
  it's correct", pushing back on the author's own low opinion.
- **Archival worry** (117634240, 2024-12-10): a patron asks whether a pre-rebuild "benchmark build" with the
  fake-perspective style would be preserved; the author says yes.
- **Feature requests not taken up in this slice**: a manor or small castle for a fiefdom (91692684); a ruin
  *slider* for partial ruination (91692684); a palisade texture to read as stakes rather than a smooth wall
  (105215836); a granular JSON + picking UI + query/edit API for third-party tools (169696051, unanswered).
- **Still live in 2026**: the generator is web-based at `watabou.itch.io/village-generator`; a 2026-06 commenter
  asks where to download and is told it runs in the browser (117634240).

---

## 6. Open questions a re-implementer must decide

1. **River centreline representation.** Spline, subdivision chain, or smoothed random walk? Width distribution, and
   whether width varies along the channel. Nothing states it.
2. **Height field construction.** "Relief follows rivers" is stated but not specified. Grid or analytic? Is it a
   distance-transform valley, and what is the profile function?
3. **Population density map.** Its form before and after the 1.6.1 rewrite is entirely unknown, yet it drives
   spotlight focus, palisade shape and building density. This is the single largest gap in the slice.
4. **Palisade level-set threshold.** How the enclosure radius is picked from the density map, and how `dense` /
   `sparse` shift it.
5. **Field subdivision algorithm.** Recursive bisection of an annular sector is my inference; the actual method,
   the field-count rule, and the priority order against woods and water are unstated.
6. **Furrow angle rule.** Per-field random vs aligned to the field's OBB — the images support both.
7. **Tree glyph internals.** Band count per type, the per-type vertical offsets, and whether silhouettes are
   generated per instance or drawn from a small prebuilt set.
8. **Tree density field constants.** Octaves, warp amplitude, the settlement-avoidance falloff, and whether `grove`
   flips its sign or adds a map-edge term.
9. **Road cost function.** The isohypse preference's exact shape and whether the search runs on a grid or on
   candidate road segments.
10. **Road merging.** Whether it is a graph operation or a junction-rendering treatment (I infer the latter from its
    placement in the *Style* dialog, but this is not stated).
11. **Building placement.** Setback distance, spacing along the street, and how the outskirts pass (the trailing
    119–133 block in the numbering) differs from the main pass.
12. **Village square.** Round/rectangular probability, centrepiece selection (dot/well, tower, tree, dome, none),
    and whether the square can move after the highway is routed (the alignment rule implies it can).
13. **Crossroads reconciliation.** How highway branches are meant to avoid looping back to their parent and being
    cut by secondary roads — the author had not solved this as of 1.6.4 and no later post revisits it.
14. **Grid overlay vs block district** in `169696051/02,04`: I could not determine whether the faint north-east
    lattice is the new grid overlay at low opacity or a regular block quarter. Resolvable by regenerating that map
    with the overlay explicitly off/on, or by a draw-call capture.
15. **Selective outlining formula.** `HardLight(darken(fill), Ink)` lerped by pressure is my reconstruction; the
    darkening function (fixed value delta? HSV multiply? a per-slot "dark" palette entry?) is unstated, as is why
    1.0 is discontinuous.
16. **Spotlight compositing.** Which blend operators produce "darken with shadow colour / lighten with its
    complement" with independent intensities.
17. **Scale.** The grid is in "abstract units"; no map in this slice carries a scale bar. VG has no committed
    metric, unlike MFCG (whose legend reads in metres).
18. **Pond internals.** Radius distribution, the round-vs-irregular decision, and pipeline order relative to roads.
19. **Pier rules.** The river-width threshold below which piers are suppressed; spacing; whether piers attach to the
    road graph.
20. **Tag priors.** The distribution over tags when the user requests none, and the behaviour of documented-
    unsupported combinations (`palisade` + water).

## Critic-2 addendum (VG/NG seat, 2026-09-25)

Rulings from `research/findings/_critic-vg-ng.md` §1 (rows V2, V3, V8–V12, V14–V17) against the recordings. All
`[STATED]` quotations checked in this file (S8–S14, S24, S26) were found verbatim at source.

1. **§2.4 `[INFERRED]` "build the water mask first" is refuted; the formula survives.** `River.new` produces the
   course polyline inside `createElevation` before any noise object exists; `digRiver → dist2poly` carves the
   5-octave field to that polyline (one clamped point-to-segment test per cell per segment); `createWater` then
   extracts the water body from the carved field. `h = base + f(distance)` is right, with distance to the course.
2. **§2.3 / §6.1 river centreline:** `River.new → PolyUtils.resample → Chaikin.render → calculateCurvature`
   (old build); no spline evaluator executes anywhere in VG. Control points with lateral offsets remain
   admissible, the smoother is Chaikin. On the 2026-09-25 build the course carries ≈ 2× the segments and
   `calculateCurvature` no longer runs (`profile-village.md` Critic-2 item 1).
3. **§2.2 pond:** a level set of a radial hollow (`createHollow → createMount`) extracted by the shared
   `setLevel → createDeflection → buildCurves` path — which is why it looks like a perturbed circle. The
   appearance argument against a threshold contour does not discriminate.
4. **§2.10 water bands:** in the live build the bands are `shallowBands` boundary **strokes** of width `W·k^1.5`
   (5.196 : 2.828 : 1 in all three draw records), masked by the water polygon — not iterated offset polygons. The
   8/10/15-band images are other palettes (`shallowBands` 5 and 10).
5. **§2.20 / §2.21 confirmed:** road merging (`RoadsView.buildMerges/addMerge`, palette `mergeRoads`) and driveways
   (`RoadsView.buildDriveways`) are view-side.
6. **§2.22 / §2.23:** no A*/Dijkstra/graph-search class runs; roads are `Tracker.advance` loops and
   `Elevation.g` is called only 1–5 times per village. The isohypse preference lives in per-step steering.
7. **§2.25 / §2.24 palisade "level set":** the recorded construction is a smoothed convex hull
   (`ConvexHull.ofSet` → 32-segment cubic spline) pushed off buildings by a raster test; the density map enters
   through `Palisade.getPopulated`. Which points are hulled is open.
8. **§2.15:** the stated domain warping is on the tree-density fBm; `PoissonPattern.warp` is a per-candidate step
   of the shared dart-throwing sampler (k = 50) and should not be credited with the ragged wood edges.
9. **§2.26 towers:** the live build still runs `model.props.Tower.new/draw` as a square centrepiece, not counted in
   "Buildings: N"; "real buildings" (117634240) means numberable/openable, not a model-class change.
10. **§6.17 "no committed metric":** reconcile with `vg-posts-a.md` §3.16 — the on-screen grid is abstract, the
    JSON export is 0.7 m per unit (84106820, verified).
