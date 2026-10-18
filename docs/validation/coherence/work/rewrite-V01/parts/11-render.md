## 5 Rendering, labels, exports

### 5.1 The `hatched` family at all four bands (item 405)

The family's roles and values are §8.2's (`hatched` column); its lighting is §8.4 (h)'s (the prism pass at every rung, the
night glow); the programs `retaining`, `raisedWay` and `way.stair` are §8.2's. This section states the `hatched` programs,
its order and its stage-2 marks at every band, so `hatched` can draw a whole town as well as a close-up (VIS-9: every
family defines all four bands).

#### 5.1.1 Per band

| band | what `hatched` draws |
|---|---|
| city | block ground = paper; footprint masses in the lit roof tone (`building`) with the band's outline; the street stripe in `road` (ways at the band's selection, §8.5); `square` blocks and plazas in `road`; `green` blocks, parks and wood fills in `green` / `tree` (§8.5 (1), item 417); water in `water`; walls in `wall`; one prism shadow pass under the masses (§8.4 (h)); labels by §9 |
| district | as city, plus: two-tone roofs by the sheet's `roofConstruction` — `fakeGablePerWing` over the stored wings until stage 3 registers, then `roofscape('twoTone')` over each building's facets (V02 §5.2–§5.3; §8.6, item 406) — each face's or facet's tone by the roof law below, footprints outlined, yards by role, boundary treatments, entrance ticks, every way stroked with its casing, courts in `court`, crowns (lobed, two greens) |
| neighbourhood | as district, plus: the **hatch** program on every roof facet, the road **surface** programs, stair-stepped ticks, the hood pins and model pins as symbols with their prism shadows, the ground access symbols the viewer's key admits (V01 §3.8.8), chimneys, the large-tree pins under the buildings and block trees above them (item 58 (d)), place labels (openings included), every named way labelled, addresses (§9.3), the close-up's title and vignette when a district or an outline is opened |
| building | per-facet hatching as at the neighbourhood band; the plan rung as `ink`'s (§8.2's presets row) once stage 3 exists |

**Item 110's marks**: retaining walls from the district band (`retaining`); raised parts at every band by §8.5's way
selection, drawn above the ground ways with their shadow (`raisedWay`); stair and ramp intervals from the district band
(`way.stair`); deck plots and their buildings as any plot and building; each stepped building's tiers in stack order with
their shadows (V01 §5.1.3).

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
  landing, V02 §5.2–§5.3), each of the building's `RoofFacet`s. **The NG parity sheet** keeps `fakeGablePerWing` from M6a;
  at M6b the NG draw-style bars are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps
  `fakeGablePerWing`, reported (V02 §5.3; J-VI.17 H8); every other `hatched` sheet switches to `roofscape('twoTone')` and
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
  its height the derived step (`stepProfile`, §2.7); a raised part's piers take slot 11 and its deck slot 14, its shadow by
  the prism law from the deck's height in the pass before slot 14.
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
| 10 | pins: model pins, hood pins and ground access symbols, large-tree pins among them (layer `pins`) | NG: pins under the houses |
| 11 | landmark footprints; raised-way piers (in `wall`) | — |
| 12 | buildings: roof faces, outlines, hatching — each building's wings in stack order, with its upper tiers' shadows (below) | NG: houses |
| 13 | chimneys and roof detail | NG: props |
| 14 | piers and bridges; raised decks (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs included | a deck may stand above the roofs beside it |
| 15 | fields | — |
| 16 | block trees (Greenery instances; layer `trees`) | NG: trees above the houses |
| 17 | boundary treatments | — |
| 18 | curtain walls | — |
| 19 | towers and gate blocks | — |
| 20 | grid | — |
| 21–25 | scale bar, compass, labels, title and legend, live layers | as §8.2's list |

**Stacks in slot 12** (item 110 (c), (f)). A building's wings are drawn in stack order by `BaseWing.on` depth
(V02 §2.6; §8.6, items 227, 419) — a wing before the wings standing on it, ties by wing key (V02 §2.1's canonical order; item 216) — and
after each wing that carries others, the prism shadows of the wings standing on it are drawn clipped to that wing's roof,
in the shadow tone at the sheet's shadow alpha (slot 9's law), so each tier casts its own visible shadow on the tier below;
slot 9 keeps only the building's ground shadow, cast from its stack's envelope. A stair flight is drawn after the wing it
rises from and before the wing it lands on. The light pass (§8.4) runs over slots 1–20 as in every family. §8.2's
slot-resolution rule applies per band, so the loader refuses a `hatched` sheet whose neighbourhood list leaves a semantic
unplaced. **Layer toggles** (T12's `setLayer`; NG F1): the hood pins, model pins and access symbols belong to the `pins`
layer and block trees to the `trees` layer, so the view bar hides them as Neighbourhood's keys do; the access symbols obey
the `pins` toggle and the key's admission both.

#### 5.1.4 Night and states

`hatched`'s night is §8.4 (h)'s — the ambience wash and a glow per lit building at the vector rung; the placed lights
(§4.7) light the streets. §8.2's `states` rows apply with `hatched`'s tones; a ruined or Works-stage building's hatch is
replaced by its state's program.

#### 5.1.5 The close-up's framing (V01 §3.8.7)

`closeup.vignette` (a style value): `none` (default); `fade` — every mark outside the opened district drawn at α 0.45
through the compositor (never re-rastered); `plateau` — NG's raised patch: the opened district's footprint cloud's hull
dilated by one block depth, drawn as a paper face over a drop shadow (the sheet's shadow tone, offset by the sun's
direction by 1.5 m at the scale) with everything outside at α 0.25. View data only: never in a digest, never exported
unless the export's style carries it. A district with no footprint takes its boundary for the hull.

#### 5.1.6 `ink`'s close-up and the other families

`ink`'s neighbourhood band (M2b, §8.2's row) takes the stage-2 marks the same way: hood pins and pin symbols as ink
symbols, road surfaces as ink stipple at α 0.35 (cobbles) or hairline setts, place labels, stair-stepped ticks, retaining
walls as one ink line with low-side ticks, raised decks as ink double lines with dashed spans; `lit` draws them pre-shaded
(§8.2's row). A family that lacks a stage-2 program for a semantic draws its base program — never nothing (§8.2's
resolution refuses the sheet otherwise).

#### 5.1.7 The `hatched` palette and role continuity

The palette is §8.2's (on the owner-opened targets, item 69; its chroma scale re-found on the measurement render at M5,
§8.2); B-ZOOM checks mean roof and ground ΔE2000 < 2 across every band switch of `hatched` from M5 (§8.2, §13.4), and the
contrast matrix on every palette. Every thematic view the family draws carries §8.2's second cue for meaning in colour
(item 112), as every family does.

### 5.2 Labels

#### 5.2.1 The hood title

When a district is opened, the view draws its **title** — the district's name, and under it its identity row's label (a
QUARTER ladder record's label where the dossier gives one, "the Apothecary district", item 108) and its population (e.g.
"the weavers' quarter · 2 400 people") — as furniture in the corner of the close-up frame whose box covers the least mark
area (§9.5's title rule, over the close-up's frame), in the label face at a cap height of `clamp(0.045 × the frame's short
side, 18 px, 42 px)`, `label` role, with the halo rule (§9.4). It is view data (never model, never hashed) — except in a
**district export**, whose title is the export's title label (§9.5), and in a **standalone neighbourhood document**, whose
`title` `LabelEntity` holds the hood's name as model data (S13a, V01 §3.10.1). A district with no name yet (before S13a's
naming) shows its identity row's label alone.

#### 5.2.2 Place labels

Each `HoodPlace` has one `LabelEntity` of kind `place` (V01 §3.7.1; §9.1, item 422): an area label on its host face by
§9.3, floors §9.4's area floors (7 px cap), priority §9.2's `place` rank (after landmarks, before gates and ways), bands
by its kind (squares and greens: district and neighbourhood; courts and yards: neighbourhood). Its `knownTo` row byte is
the place's (§9.2's admission), so a `local` court's name is admitted for a public key only at the neighbourhood band and
finer; a `secret` place's name only at the building band.

Hood pins carry no label of their own: the place they stand in carries it (a well square's name, a court's name), and a
square's model centrepiece is named through its square's `HoodPlace`. An **opening** place is labelled at its symbol (a
point label, §9.3, at the neighbourhood band — at `ground.at` where the access draws no symbol, V01 §3.8.8; a `mouth` or
`ruin_entrance` of `public` knowledge also at the district band); a catacomb entrance's label is its catacomb's name
("the Catacombs of St Anne's"); a dug access has no label. A place whose label fits no candidate is dropped by §9.4's
floors, never shrunk below them.

#### 5.2.3 Street names and addresses

The base's: path labels at the district and neighbourhood bands (§9.3), ≥ 90 % of named streets labelled at the
neighbourhood band (§9.4, O13 b); addresses at the neighbourhood band. The names carry V01 §3.7.2's local meaning; the
labels change nothing.

### 5.3 Exports

| format | stage-2 content (§11.1's rules otherwise) |
|---|---|
| SVG | a district scope — or an outline's — at the neighbourhood band (§11.1 allows it for a district-sized scope): the transient list is built with the close-up derived (a pure function, V01 §3.8) — hood pins in `<g id="sem.pin.hood.<kind>">`, ground access symbols in `<g id="sem.access.<kind>">` (the export key's admission applied), squares and greens by semantic, the hatch as filled paths, place labels, the title; retaining walls in `<g id="sem.wall.retaining">` with their shadows, raised parts in `<g id="sem.way.raised.<class>">` above the ground ways inside the layer group `layer.ground.raised`, piers in `<g id="sem.raised.pier">` (§11.1, item 447), and the deck plots and buildings the district owns (V01 §3.17.6); ids preserved |
| PNG, print | the same list through the tile assembly (§8.8, §11.1) |
| VTT (scene JSON, `.dd2vtt`) | scope a district or a rectangle (§11.1); the scene image drawn with the close-up; walls from footprints and boundary treatments as the base's; lights as the base's; hood pins in the image only (no wall, no light of their own); retaining walls and raised supports in `line_of_sight` by §11.1's VTT rule (items 447, 448: a wall whose derived step is ≥ `vtt.retainingMinCm`, broken over its stair and ramp intervals; supports' footprints as closed polylines), so no token walks off a terrace or through a pier; the decks the district owns in the scene |
| GeoJSON | model entities: blocks with `content` and `squareType`; squares, greens and yards as polygons of those kinds; `HoodPlace`s as features (`kind: 'place'`, its place kind and subtype, name, the knowledge admission applied, §11.1) — an opening as a point at its `AccessPoint`; with the option `closeup: true` on a district or outline scope, hood pins as point features `{ kind: 'hoodPin', pin, sizeM, derived: true }` in a `presentation` collection; retaining walls (kind `retaining`, per run), raised ways, their supports (kind `raisedSupport`, per support) and spans, stairs and ramps, and deck plots and buildings as §11.1 states them (item 447; J-VI.18) — a wall's derived step reaches GeoJSON only as that item's step bounds |
| JSON (full schema) | `Block.content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`; `HoodPlace` (with `subtype`); the `closeups` block's records; `Recipe.product` and `Recipe.hood`; `District.fabric`, `fabricParams` and `terrace`; the `hood.constants` cells, their `NG` entries among them, a document pins (§7.6) |
| glTF / OBJ, CityJSON | model entities only: square and green faces as ground surfaces; model pins as §11.1's props; hood pins excluded (presentation); retaining walls as prisms from the low side up to the high side's level; raised decks at their height on their piers; deck buildings on their decks |
| skeleton file (§11.1) | the declared subset gains `setAttr` of `fabric`, `fabricParams`, `terrace`, `content`, `squareType`, `surface`, a place's name and knowledge (a new place's included), a `quarter`'s `fabric` (item 349) and `terrace` (item 350), `closeup` and `instance` events on hood pins, and a standalone recipe's `hood` |
| a standalone neighbourhood document | every format, as a town (it is a document) |

Every export honours §9.2's knowledge admission (a court's local name withheld from a public export above the
neighbourhood band) and records declared, derived and clerk-proposed provenance (§11.1; item 101 R19). A scope holding no
stage-2 content (a district before M5, a hinterland rectangle with no close-up) exports the base's content only. An export
of a district whose close-up was never opened derives it for the export (a pure function), never stores it.

## 6 Performance budgets

On §12.1's reference hardware, measured as §12 measures (p95 over the bench's seeds unless a line says otherwise); every
line is PLAUSIBLE until its milestone measures it, with its pre-decided fallback (§12.10's register shape). "B" is the
building count in scope.

| line | budget | where it sits in §12 | measured | pre-decided fallback |
|---|---|---|---|---|
| S7c fabric selection (S7b's hook) and its land estimate | ≤ 0.07 ms per district (context from cached records; χ̃ over ≤ 100 allocation rows and their allocation-level links; ≤ 12 rows' predicates; `templateLandM2` closed-form) — ≈ 1.8 ms at CITY, ≈ 3 ms at METROPOLIS; S7b's reconcile with the template land adds ≤ 1 ms at CITY | a row of §12.4's CITY split, inside S7b's line and the one-click model budget (item 474) | M5, B-CITY | the context's portal and landmark lists are cached per district from the greedy pass; if still over, eligibility tests the cheap predicates (areas, shares) before the geometric ones (crossing pairs) |
| template seeds (S8) | spine or parallel spine ≤ 0.3 ms per seed; a contour series ≤ 1.5 ms per district (≤ 31 level lines per flank by marching squares over the face's box); plaza ≤ 0.5 ms; ring series ≤ 2 ms per district (≤ 6 courses of 48 vertices with validation); the holed bent cut of ring bands ≤ 2.5 × a plain cut per street (NG measured 2–3 ×, `profile-neighbourhood.md` RA-6) | inside §12.4's S8 row: at the default 15–35 % template share, ≤ + 4 ms at CITY | M5 (spike S-V1-a) | the ring validation runs once per series instead of per course; a ring district's bands cut at the `landmark` variant's one-ring minimum when the series exceeds 2 ms |
| S9b block dispatch (S10a's hook) | ≤ 0.18 ms per district (≈ 60–150 blocks; junction and frontage lookups through the L2 index; the siting pushes over S10a (i)'s filled blocks by the family rows' radii; the island strips evaluated once per shade evaluation at S9b's first read and shared with field pass 2, V01 §3.5.5) — ≈ 5 ms at CITY | a row of §12.4 (item 474) | M5 | candidate lists by type built once per district from one junction scan; the pushes read a per-district list of emitter blocks |
| the services of V01 §3.16 (`catchmentOf`, `districtsAbove`, `fabricSignature`) | ≤ 1 ms per call at CITY, memoised per commit; `catchmentOf('walk')` ≤ 2 ms at METROPOLIS | inside the callers' lines (S10b's coverage term, volume 4's stage, the reader) | M5 | the way-graph distances cached per district per commit |
| surface rule, local-place step, naming context | ≤ 1 ms, ≤ 1 ms + §12.4's S13a naming rate per place, ≤ 0.2 µs per way at CITY | §12.4's S10a and S13a rows | M5 | — |
| **one-click total added by stage 2** | ≤ 12 ms at CITY, ≤ 20 ms at METROPOLIS (the model path; nothing added to the city band's first map beyond the square and green fills) | §12.3's model law gains this term, declared (D-18's rule for a declared cost) | M5 | the parity presets pay 0 (no template, all ordinary); if the default exceeds it, S9b's phase 2 moves to the pooled S10 (it is block-local) |
| opening a district (refine close-up) — **model and display list** | the close-up derivation (hood pins over sites) plus S14's neighbourhood-band display list for the district: **non-ring fabrics ≤ 6 ms + 0.06 ms × B** (≤ 33 ms at 450, ≤ 51 ms at 750), **`ring` ≤ 10 ms + 0.07 ms × B** (≤ 100 ms at 1 300) — against NG's reset of 10–52 ms for medium area, street and square hoods (600–779 buildings) and 78–96 ms for ring (1 209–1 287), whose figures exclude raster (`docs/confidence/ng.md` H1; J-V1.48) | §12.5's neighbourhood-band line, made a law per fabric class (item 474) | M5, B-ZOOM | hood-pin symbols stamped per kind and size class (one sprite draw each) instead of drawn as paths |
| opening a district — **first visible tiles rastered** (measured separately) | ≤ NG's 73–111 ms raster at comparable counts (H1) | §12.5 | M5, B-ZOOM | the surface stamps drawn at the district band's flat tone on the first frame, the stipple on the next |
| the surface marks of one opened district (stamps, kerb dots, stair-stepped ticks) | ≤ 3 ms at 450 buildings | inside the display-list line above | M5 | a flat surface tone at the district band until the view settles |
| the walls and raised parts of one opened district (item 110) | ≤ 1 ms at 450 buildings, inside the display-list line; the same per district at METROPOLIS | §12.5 | M5, B-ZOOM | one path per district for all its walls |
| METROPOLIS: the largest district's open; its replace close-up; a large standalone neighbourhood document's first map (≈ 1 300 buildings) | open: the law above at its B; replace: §12.6's scoped law × the fabric's factor at its B; first map ≤ 0.8 s p95 | §12.5, §12.6 | M5, B-CITY (METROPOLIS) | open: hood pins derived for the visible blocks first, the rest on idle; replace: the dry run's overlay reused at commit; the hood: the one-district pool path skipped |
| per building (S5 (b)) | generation ≤ 75 µs (the standalone path, model only) and rendering ≤ 85 µs at the neighbourhood band | §12.5 | M5 on medium standalone neighbourhood documents | as above |
| draw calls and uploads (S5 (c)) | ≤ 80 path calls per tile (hatch batched per role) and ≤ 25 canvas operations per wing as the ceiling (II.4); uploads within §12.5's ≤ 4 per frame while moving | §12.5 | M5 census | the hatch's parity rule starts at 2 px instead of 1.5 px on screen (every second line drawn sooner) |
| a replace close-up (a fabric change, New random on a district) | §12.6's scoped law × the template's factor — `ring` 1.5, `crossroads`, `landmark` 1.2, others 1.1 — plus S9b's and S13a's deltas: ≤ 45 ms for a ring district of 450 buildings; its dry run the same, the commit reusing the dry run's overlay (≤ 2 ms) | §12.6 | M5, B-EDIT | as §12.6's fallbacks |
| a block's content edit | D from S10a: ≤ 3 ms + 60 µs × the buildings of the blocks whose allocation changes | §12.6 | M5 | — |
| a hood-pin edit | ≤ 1 ms model, the district's chunk re-derived ≤ its open line | §12.6's single-plot line | M5 | — |
| the stage-2 switch's edit (V01 §3.15) | a Re-derive from S2 of the whole document: §12.6's ≤ M(B) for a Re-derive from Sk, stage 2's per-district lines above included, the underground tail's after it | §12.6 | M5 (T-V1-4's switch clause, timed) | none needed: a rare parity edit whose dry run shows its fates before it commits |
| a standalone neighbourhood document | first map ≤ 0.5 s p95 for a medium one (`size.medium` buildings, V01 §3.14; S6 (b)); model ≤ 75 µs × B | §12.5's first-map law applied to the unit | M5 | the one-district pool path is skipped (the unit runs single-worker) when that is faster, measured |
| a sky island's districts | **generation**: the unit run ≈ 8–12 ms per island at CITY, ≈ 12–18 ms at METROPOLIS (≤ 3 districts' worth, ≈ 2–5 % of the town's plots, at this table's per-district rates), on the generation worker concurrent with the pool — the figure V05 §6 cites for its critical path; **after generation** (V01 §3.10.3 (6)): a raise, a late declaration or New random on an island runs the unit run inside its commit at these rates plus §12.6's commit overhead (II.6's `raiseIsland` line); a growing resize or a rim reshape costs §12.6's scoped law once per receiving district — for a resize every district bordering the rim — plus once for the district whose institution claim is re-searched where that district receives no face, at most k ≤ 3 in all, and a shrinking resize none but the district whose claim is re-searched, where one is (its plot clearing, re-cut and way cut-back are volume 5's, V05 §6); `plantRimWalk` adds ≤ 0.2 ms, once per event and once per unit run | §12.4 (inside SKY's line, V05 §6); §12.6 | with volume 5's stage (its fixture island first, T-V1-21) | the island's S12b and S13a join the ground's pooled batch instead of running serially on the worker |
| memory | the close-up chunk ≤ `closeup.chunkKB` per district inside §12.8's 8 MB elaboration cache (LRU); `Block.content` and flags 2 B per block; `HoodPlace` ≈ 80 B; `CloseupRecord` ≈ 40 B + 24 B per override row | §12.8 | M5 | the cache's existing halving fallback |
| document size | ≤ 1 KB per edited close-up; the town's document growth from stage 2 ≤ 2 % at CITY (places and flags) | §12.8's document line | M5 | place names stored by naming-record reference only |

