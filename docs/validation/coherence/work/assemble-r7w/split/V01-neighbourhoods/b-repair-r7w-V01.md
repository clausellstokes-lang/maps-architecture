
=== REPLACE #### 3.17.3 Raised ways in the close-up (J-V1.65) ===
#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raisedWays.structure.stripMarginM` (V11 §3.24.2) each side, §4.6 S8's one strip — is a **hole** in the faces it
   crosses, as an S7b claim is (V01 §3.4.1): where it crosses a face from boundary to boundary it cuts it; no plot, block
   interior, seed or hood pin lies in it; the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they
   exist — none in a span §2.7's laws read `open` (law 1 (8); its worked example *beneath*) — and an `open` span stays
   open ground, a way passing under it, bare ground or a wall's run beneath it (§2.7's laws, law 1 (7), (8); its
   worked example *beneath*) (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   where §4.3's crossing rule admits it (*Lattice and costs*; §2.7's laws, law 1 (1), (8); its worked example the
   way-and-channel table's row (a)), a `vault` span read as §2.7's laws read it (law 1 (8); its worked example
   *beneath*). A seed that would cross elsewhere takes F-TEMPLATE
   rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest qualifying span); a bent-cut lane
   takes §4.6's ladder and, finding no span, ends at the strip's edge as at a reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **A raised way over a wall is no gate.** A raised way meets a wall by §2.7's laws (its worked example the crossing
   table), never with a gate or an opening (§2.7's laws, law 1 (1), (2)): an aqueduct crossing a curtain, over it on an
   arch or merged into it, and a deck over a wall laid after it give no gate portal, no `gate` rank or kind factor, no
   gate plaza, no wall-side feature and no S9b square — a gate standing beneath an aqueduct's arch that clears it
   (law 1 (5)) being a part-0 gate as any, with its portal, rank and plaza.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).
=== END ===

=== REPLACE #### 5.1.1 Per band ===
#### 5.1.1 Per band

| band | what `hatched` draws |
|---|---|
| city | block ground = paper; footprint masses in the lit roof tone (`building`) with the band's outline; the street stripe in `road` (ways at the band's selection, §8.5); `square` blocks and plazas in `road`; `green` blocks, parks and wood fills in `green` / `tree` (§8.5 (1), item 417); water in `water`; walls in `wall`; one prism shadow pass under the masses (§8.4 (h)); labels by §9 |
| district | as city, plus: two-tone roofs by the sheet's `roofConstruction` — `fakeGablePerWing` over the stored wings until stage 3 registers, then `roofscape('twoTone')` over each building's facets (V02 §5.2–§5.3; §8.6, item 406) — each face's or facet's tone by the roof law below, footprints outlined, yards by role, boundary treatments, entrance ticks, every way stroked with its casing, courts in `court`, crowns (lobed, two greens) |
| neighbourhood | as district, plus: the **hatch** program on every roof facet, the road **surface** programs, stair-stepped ticks, the hood pins and model pins as symbols with their prism shadows, the ground access symbols the viewer's key admits (V01 §3.8.8), chimneys, the large-tree pins under the buildings and block trees above them (item 58 (d)), place labels (openings included), every named way labelled, addresses (§9.3), the close-up's title and vignette when a district or an outline is opened |
| building | per-facet hatching as at the neighbourhood band; the plan rung as `ink`'s (§8.2's presets row) once stage 3 exists |

**Item 110's marks**: retaining walls from the district band (`retaining`); raised parts at every band by §8.5's way
selection, drawn above what they cross with their shadow (`raisedWay`; §8.2's slot 19a); stair and ramp intervals from
the district band
(`way.stair`); deck plots and their buildings as any plot and building; each stepped building's tiers in stack order with
their shadows (V01 §5.1.3).
=== END ===

=== REPLACE #### 5.1.2 The programs ===
#### 5.1.2 The programs

* **Roof law.** Each roof face or facet takes the lit roof colour or its dark variant `dark = lit × lerp(ambience,
  shadow, α)` by its normal against the light (`faceLight`, §8.2), `α` the sheet's shadow alpha — the law §8.3's
  `hatched` census row tests within ± 0.02. The lit colour per building is the `roof` role's pick (the role holds a list
  in `hatched`: index by §8.2's multi-colour rule) scaled by `2^(0.3 × s)` with `s` a centred bell of three uniforms from
  the building's `render.instances` stream (a gentle per-building tone variance, ours; NG 1.2.2 scales its roof colour by
  a power of two, provenance `ref:NG 1.2.2 roof tone (code)`), clamped per channel; so terraces read as separate houses.
* **Hatch** (item 58 (e); J-V1.47, J-V1.69, J-V1.73). The hatch runs **per roof facet** of the sheet's
  `roofConstruction`: under `fakeGablePerWing` (every sheet before stage 3 registers), each wing's faces by its
  `RoofSpec.kind` (§2.6) — a gable or hip wing's two faces split at its ridge line, a flat wing's one level face, a
  pyramid, tent or skeleton wing's one face per eave, a cone or dome as one surface; under `roofscape` (from stage 3's
  landing, V02 §5.2–§5.3), each of the building's `RoofFacet`s. **The NG parity sheet** takes its roof
  construction by V01 §7's rule (V02 §5.3 supplies `roofscape`; J-VI.17 H8); every other `hatched` sheet switches to `roofscape('twoTone')` and
  the per-facet hatch when stage 3 registers. Lines at a **world pitch** `hatch.pitchM` — a model length, as
  Neighbourhood's spacing is (`code-neighbourhood.md` §2.11), so a facet has the same lines at every zoom; its default is
  calibrated at M5 so the census mean is 17–19 per wing on B-ZOOM's neighbourhood-band reference viewport, starting at
  0.8 m (ours; NG's unit-to-metre reading is HOLD). **Direction:** a sloped facet's lines run parallel to its **eave** (its
  lowest horizontal edge) — so a long facet's run parallel to its wing's ridge, NG's law (under `fakeGablePerWing` a gable
  or hip wing is hatched parallel to its ridge across its whole footprint, as Neighbourhood hatches), and a hip, pyramid,
  tent, pent-band or skeleton facet's parallel to its own eave; a level (flat) facet's parallel to its wing's OBB major
  axis; a cone's or dome's facets as concentric rings about the apex at the world pitch. **Every line is clipped to its
  facet**, so it stops at a valley line, a hip line and the outline of a wing standing on the wing. Each line's two
  crossings with its facet's boundary each carry one filled tapered triangle, base one stroke width (0.5 px at 1×) on the
  crossing, pointing inward along the line to a point at `½ × m3 × chord` from it (a ring: two tapers where it crosses the
  light axis); then, per ridge-bearing wing (gable, hip), two heavier tapers from the ridge's ends inward along the ridge,
  each `(0.3 + 0.2 u) ×` the ridge length, base 1 px — unchanged by the construction; a flat, pyramid, tent, skeleton,
  cone or dome wing has none — the taper and ridge-taper laws NG 1.2.2's (provenance `ref:NG 1.2.2 hatch (code)`),
  restated in our words. A flat facet adds its parapet (V02 §2.6's `parapetCm` on a flat tier) as one inset outline at
  its plan offset, in the lit tone of the up normal (`faceLight`); a `none` roof has no hatch (its state program,
  V01 §5.1.4); a facet of zero area (a degenerate wing) draws nothing. Where the on-screen pitch falls below `hatch.minPx`
  (1.5 px), the program draws every second line by index parity — a zoom-stable subset, never a re-spacing. No ridge
  stroke; the outline is the footprint only (NG BG-3). The draws are the wing's render key's (§6.1's decoration rule:
  hatch phase and lengths never re-scatter with zoom). A wing's triangles are emitted into its tile's one `hatch` path per
  role (§8.1's `hatch` mark kind), so a tile's draw calls stay within §12.5's 80 (instanced hatching, II.4); the census
  (§8.3) counts per wing (the lines of all its facets) — 15–20 per gable or hip wing on the NG parity sheet, the two ridge
  tapers included — and the line count per wing is invariant across the band's zoom for every kind. With the style's
  `details` off **no hatching draws**, the ridge tapers included (NG E1, E6); with `shadows` off the hatch turns 90° to the
  eave (NG's own switch). The parity subset below `hatch.minPx` and the `details` and `shadows` switches apply to every
  facet.
* **Stair flights** (volume 2's `stairFlight`, V02 §2.6). The flight's facet as volume 2 paints it, its treads hatched
  across the flight by volume 2's `stairTreads(w)` (its `n − 1` lines at its `goingCm`, V02 §2.6), no ridge tapers; below
  2 px of plan per tread the lines are omitted as volume 2's `stairFlight` omits them; drawn after the wing it rises from
  and before the wing it lands on (V01 §5.1.3).
* **Crowns.** A **lobed crown**: `k = 5 + ⌊4u⌋` lobes, each a circular arc centred on a point of a jittered k-gon at 0.55
  of the crown radius (radial jitter ± 0.1), lobe radius 0.5 of the crown radius, their union's outline filled at the
  crown's shaded tone; a lit cap — the same construction at 0.65 scale — offset toward the light by 0.15 of the radius in
  the lit tone; with `details` on, two inner rings of short arcs. Two greens (the `tree` role's list) by §8.2's pick rule.
  Our construction (J-V1.27), stamped per crown size class like §8.10's library (so no crown is built at raster time).
  Order: large-tree **pins** in the pins slot under the buildings; **block trees** (Greenery instances) in the tree slot
  above them, smaller crowns first within a block (item 58 (d)).
* **Road surfaces** (§8.2's `surface(kind)`, by `Way.surface`, V01 §3.7.3; square faces by their residue's surface):
  `cobble` — the `road` fill with a stipple of small irregular polygons (5–7 sides, 0.35–0.5 m across) at 0.6 m spacing,
  stroked in `ink` at α 0.35, and a kerb line of dots at 1.2 m along each kerb; `paved` — setts: rows of 0.6 × 0.3 m
  rectangles across the way, staggered by half a sett row to row, stroked at α 0.3; `dirt` — the plain `road` fill;
  `planks` — bars across the way at 0.3 m, stroked at α 0.4. **One shared stamp tile per surface kind** (§8.10's stamp
  mechanism; a 12 m world-anchored tile generated once per sheet) is drawn as a clipped pattern fill of the way's body,
  never generated per way; the kerb dots are per way. The street stripe is the way's model width × `roads.widthRatio`
  (the `hatched` default 0.4 — a narrow stripe in a cream gap, provenance `ref:NG 1.2.2 road width ratio (code)`), read by
  the `full` and `outlined` modes. The style row `roads.mode`: `full` (default: fill and surface), `outlined` (a casing
  pass of 2 × the thin stroke, then fill and surface), `dashed` (the centreline dashed 9 : 6 × the stroke, no fill — the
  dash NG 1.2.2's, `ref:NG 1.2.2 road dash (code)`), `hidden`. NG 1.2.2's road modes and surfaces (plain, cobbles, tiles,
  outlined, dashed, hidden) are the reference (II.4); the stone shapes and spacings are ours.
* **Stair-stepped ticks** (§8.2's `steps`): across a stair-stepped way (V01 §3.6 (3)) every 1.2 m of ground length, a
  line at the thin stroke across the way's body, drawn from the district band.
* **`way.stair`, `retaining`, `raisedWay`** (§8.2's programs, item 110): in `hatched`, a retaining wall's shadow is drawn
  in slot 9, cast from the high side's level onto the low side along the sheet's light vector by the pins' prism law,
  its height the derived step (`stepProfile`, §2.7); a raised part's piers take slot 11 and its deck slot 19a (§8.2's
  slot 19a), its shadow by the prism law from the deck's height in the pass before slot 19a.
* **Pin symbols** (model pins and hood pins alike, sized by their model size): `well` — a round (by the render key's
  parity) or square stone rim in `wall` with an `ink` α 0.8 shaft; `pump` — a small square with a handle tick; `trough` —
  a thin rectangle in `wall` with a `water` inner strip; `fountain` — a stone disc with a `water` basin shaded toward its
  far side from the light; `large_tree` — a lobed crown at its size; `statue` — a plinth square with a figure dot;
  `monument` — a plinth with a slender triangle; `bandstand` — an octagon hatched like a roof; `cross` — a cross glyph on a
  plinth; `shrine` — a small square with a ridge hatch. Every symbol casts its prism shadow at its row's `heightM` (§8.4
  (h); a tree's shadow its crown's outline shifted), which S5 (e) reads.
* **Ground access symbols** (V01 §3.8.8; drawn from the model, sized by `access.<accessSymbolKind>M`; only accesses
  opening on a ground face outside every footprint draw one — a cellar stair, shaft, ladder, hatch or broken well where
  it opens in a yard, none where the building or its basement hosts it, the plan drawing its head). The symbol is
  `accessSymbolKind(a)`'s: the access's kind's, except a catacomb entrance (V01 §3.7.1's selection: a `stair` of a
  catacomb system), which draws `catacomb`: `stair` (a neighbourhood or lifeline stair on public ground, volume 4) — a
  rectangular rim in `wall` round four step ticks narrowing toward its lower end; `ladder` — two short rails with three
  rungs inside a square rim; `hatch` — a small square with a hinge line along one side and one diagonal; an arch vault's
  `door` — no symbol, the vault's infill being the base's drawing; `cellar_stair` — a small rectangle with three step
  ticks; `shaft` — a square rim in `wall` with an `ink` α 0.9 void; a broken-through `well` — the well rim with a dark
  shaft and a crack tick; `grating` — a small square crossed by three bars; `sinkhole` — an irregular ring of rubble
  stipple round a dark centre shaded away from the light; `mouth` — a dark arc opening in the slope's face with a rock
  fringe; `collapsed_shaft` — a rubble disc with a dark hollow; `ruin_entrance` — two short double-lined walls flanking a
  stair of step ticks (the ruin's masonry style, item 109 (g)); `catacomb` — a small pitched hood over a stair of step
  ticks with a cross tick. Its state form is §8.2's access row (V01 §3.8.8). They sit in the pins slot and cast no shadow
  but the `mouth`'s and the catacomb hood's.
* **Titles**: V01 §5.2.1.
=== END ===

=== REPLACE #### 5.1.3 Layer order at the neighbourhood and building bands (`hatched`) ===
#### 5.1.3 Layer order at the neighbourhood and building bands (`hatched`)

`StyleSheet.order` is per band (§8.2); `hatched`'s city and district bands take the shared list, and its neighbourhood
and building bands take this one, of which NG 1.2.2's order (greens → roads → shadows → pins, large-tree pins under the
buildings → buildings → chimneys → block trees → title) is a subsequence (§8.3's order parity):

| # | slot | reason |
|---|---|---|
| 1 | paper | background |
| 2 | water | — |
| 3 | ground.block (= paper) | the figure-ground contract (§8.5) |
| 4 | relief | off by default |
| 5 | greens, parks, green blocks, yard parts by role, courts | NG: greens first |
| 6 | way casings (`way.*`, pass 1) | — |
| 7 | way bodies, square faces and road surfaces (`way.*`, pass 2; `ground.square`) | NG: roads |
| 8 | river casing and body; shore marks | — |
| 8b | retaining walls (`retaining`; item 110 (a)) | under the shadows, over the river |
| 9 | prism shadows (each building's ground shadow, cast from its stack's envelope; walls, towers, pins, crowns; each retaining wall's shadow from its high side onto its low side) | NG: shadows after roads, before buildings |
| 10 | pins: model pins, hood pins and ground access symbols, large-tree pins among them (group `pins`) | NG: pins under the houses |
| 11 | landmark footprints; raised-way piers (in `wall`) | — |
| 12 | buildings: roof faces, outlines, hatching — each building's wings in stack order, with its upper tiers' shadows (below) | NG: houses |
| 13 | chimneys and roof detail | NG: props |
| 14 | piers and bridges | — |
| 15 | fields | — |
| 16 | block trees (Greenery instances; group `trees`) | NG: trees above the houses |
| 17 | boundary treatments | — |
| 18 | curtain walls | — |
| 19 | towers and gate blocks | — |
| 19a | raised decks (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs, walls, towers and gate blocks included | drawn above what it crosses, as §8.2's slot 19a, this order's one home, places it (item 110 (b)) |
| 20 | grid | — |
| 21–25 | scale bar, compass, labels, title and legend, live layers | as §8.2's list |

**Stacks in slot 12** (item 110 (c), (f)). A building's wings are drawn in stack order by `BaseWing.on` depth
(V02 §2.6; §8.6, items 227, 419) — a wing before the wings standing on it, ties by wing key (V02 §2.1's canonical order; item 216) — and
after each wing that carries others, the prism shadows of the wings standing on it are drawn clipped to that wing's roof,
in the shadow tone at the sheet's shadow alpha (slot 9's law), so each tier casts its own visible shadow on the tier below;
slot 9 keeps only the building's ground shadow, cast from its stack's envelope. A stair flight is drawn after the wing it
rises from and before the wing it lands on. The light pass (§8.4) runs over slots 1–20 as in every family. §8.2's
slot-resolution rule applies per band, so the loader refuses a `hatched` sheet whose neighbourhood list leaves a semantic
unplaced. **Group switches** (T12's `setStyle` of `StyleSheet.groups`, §8.2; NG F1): the hood pins, model pins and access
symbols belong to the `pins` group and block trees to the `trees` group, so the view bar hides them as Neighbourhood's
keys do; the access symbols obey the `pins` switch and the key's admission both.
=== END ===


