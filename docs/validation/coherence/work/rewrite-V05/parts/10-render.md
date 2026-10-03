
## 5 Rendering, labels, exports

### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)

| semantic | kind | what | bands |
|---|---|---|---|
| `sky.island.land` | `area` | the land face, in the style's `sky.ground` role (one step lighter than the ground's block tone in `ink`; the patch tone of `hatched`) | all |
| the island's fabric | as any district's | ways, blocks, plots, buildings, greens, water — `layer: 'sky'`, `z` above the ground | as the ground's |
| `sky.island.rim` | `outline` | the rim chain with the `cliff` bank program's outward ticks | all |
| `sky.island.shadow` | `shadow` | the vector rung: the projected tier stack (V05 §5.3); `hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5; `research/findings/watabou-extra-a.md` §3) | all |
| `sky.island.underside` | `area` | `offset` occlusion only: the tier stack's silhouette swept along the offset vector — the rock hanging beneath the lifted island | all |
| `sky.island.tether` | `outline` | `offset` only: the true ground footprint dashed, and a hairline from the lifted centroid to the true one | district and finer |
| `sky.fall`, `sky.mist` | `glyph`, `area` | the waterfall's lip on the rim; a soft mist disc on the ground below it | district and finer |
| `sky.island.shadeStrip` | `outline` | the shade map view only (V09's thematic view of item 102 (f)), **outlines only — the veil of shade shares is V09's alone**: each island's held strip onto the ground at its basis as one solid ink line around the cells it blocks for at least three of the nine samples, traced by marching squares over the mask at the field cell, labelled with the island's name along it; a strip with `cells` 0 draws none | city and district |
| `sky.island.shadePending` | `outline` | the shade map view only, while the caster's `shadeBasis` differs from its live island (V05 §3.19 (8)): the strip the island would cast now, its three-sample area as a dashed ink line — so a dashed line always means "where the shade will move"; an island without a basis draws only this line | city and district |
| `sky.access.<kind>` | `glyph` + `ribbon` | hoist: a glyph at the top and at the foot, joined only in `offset`; stair: the same glyphs, and in `offset` the helix of V05 §2.2 as a stepped spiral line; rope line: a hairline from the top's world point to the foot; bridge of light: a glowing ribbon with `light` marks along it at night | district and finer (the foot glyph at the city band) |

**States** (§8.2's `states`, items 408, 415): the base's island rows stand, with the `fallen` row drawing its rubble over
the faces and bands of the `fallen_island` decoration's members (V05 §3.16 (5)); a settled island's buildings draw their
own existence rows; an access reads `closed` (a bar glyph), `unserved` (alpha 0.5) and is not drawn once `ruined`; the
landfall's covered kinds draw by V05 §3.16 (4)'s *drawn by* column; the deck plots tombstoned with their ruined decks
draw nothing. A `removed` island draws nothing, labels nothing and has no shadow. The island's own retaining walls (V05
§3.22 (4)) draw by the base's `retaining` program in the island's frame, on the sky layer's list, displaced with the
island under `offset`, their low-side shadow cast by the light pass on the island's sky surface layer. A degenerate sky
mark — a zero-area face, a zero-length rim stretch, a rope line whose top and foot coincide in plan — draws nothing and
never fails a tile.

**Slots and sheets** (§8.2, item 408). The sky layer composes its own list with §8.2's layer order; every shipped sheet
(`ink`, `lit`, `hatched`, `night` and the parity presets, which carry the rows though their recipes hold islands off)
resolves every sky semantic, so the loader never refuses one:

| semantic | layer-order slot (§8.2) | per-family facts (the values are V11's palette rows) |
|---|---|---|
| `sky.island.land` | 3 `ground.block` | role `sky.ground`: in `ink` one step lighter than `ground`; in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass |
| `sky.island.underside` | 2, with the water (under the land, so the lifted land covers its top) | role `sky.ground` darkened one step, `ink` outline; `offset` only |
| `sky.island.rim` | 8 shore marks | the `cliff` bank program's ticks in `ink` |
| `sky.island.shadow` | 10 projected shadows | role `shadow` (the vector rung); `hatched` the patch's drop shadow |
| `sky.island.tether` | 17 boundary treatments | `ink` hairline, dashed; `offset` only |
| `sky.fall`, `sky.access.*` | 19 towers and gate blocks | glyphs in `ink`; a bridge of light's ribbon in role `light` |
| `sky.mist` | 8 shore marks (after water) | role `water` lightened, alpha 0.5 |
| `sky.island.shadeStrip`, `sky.island.shadePending` | 25 live layers | `ink` lines, solid and dashed, label in role `label` |

The role **`sky.ground`** is §8.2's (the land of a sky island: never `ground` itself, so an island reads against the
ground beneath it in every family). The island's own fabric resolves by the ground's semantics.

### 5.2 Occlusion

`ghost` by default (§8.4), `opaque` and `offset` as the sky `LayerSpec` sets them or an island's own `occlusion`
overrides. In `offset` the island's marks, labels and shadow-free silhouette draw displaced by `elevation ×
offsetPerMetre`, while its cast shadow stays where the sun truly puts it; the sky base is **lit at the island's true
position** and drawn displaced (V05 §5.3 (2)), and every pointer and tool point on it is un-displaced before the anchor
conversion (V05 §4.2). With the sky layer hidden (§8.4's `LayerSpec.visible`), nothing of this section draws and no
island label is a candidate; the model is unchanged (II.6 (1)).

### 5.3 Light and shadow — the underside's shadow (the owner's J98; §8.4, items 415, 416)

1. **The slab list** holds, per island and **under every occlusion mode** — `opaque` as well as `ghost` and `offset`
   (§8.4 (a); an island is never written into the ground's surface layer as a column, whose shadow would start at the
   footprint's edge and lose the gap and the profile) — underside tier 0 and underside tiers 1 … n of V05 §3.9 (2), each
   its world ring, its top and its underside, so the island's shadow is the shadow of its whole rock: a `root` casts a
   long tapering tail under a low sun, a `flat` only its rim; the ground right beneath is shaded from above yet lit from
   the side through the gap under the root; and the penumbra widens with the distance from the underside, so a higher
   island's shadow is softer (§8.4 (c)'s law). A fallen or removed island has no slab.
2. **The sky surface layer.** Where an island's drawn land face touches a tile, the tile worker rasters that tile's sky
   marks into a second base and a second surface layer (the island's terrain at its datum, its roofs, towers and crowns),
   each with its max-height pyramid. The light pass lights the sky base over the sky surface layer — its rays reading the
   ground's pyramids, the other islands' slabs and its own island's surface — and the ground base over the ground surface
   layer with the whole slab list; then composes: `opaque`, the lit sky over its coverage; `ghost`, the lit sky × (1 −
   `ghostAlpha`) over the lit ground × `ghostAlpha`; `offset`, the lit ground everywhere and the lit sky over its
   displaced coverage. The CPU reference and the GPU pass run the same law. A tile no island's land touches takes no
   second base, but it is **re-lit where an island's shadow falls on it** — the shadow reaches up to 8 × the island's
   height from its footprint. **The global light's window** (§8.4 (c), item 416) reads the surface layers' own top
   (`surfaceLayerTopCm`), without the slabs, and each slab whose shadow sweep crosses the ray's plan is tested exactly over
   its own reach (J-V5.56), so an island lengthens no ground ray's window; a tile culls the slabs whose sweep's bounding
   box misses it.
3. **The vector rung** (rung 3): the island's shadow is the union over its underside tiers of each tier projected in the
   **`prism` form** — its ring swept along the sun vector from its underside's offset `b · c` to its top's `t · c`, then
   unioned — whatever `vector.projected` says for other casters, since an island is a floating solid (J-V5.55); the rim
   slab sweeps from its base to the surface top. So a `root`'s thin lower tiers join into one tapering tail instead of a
   row of beads. Only when §8.4's rung-3 budget fallback fires is the `drop` form used, and then the tiers are subdivided
   so that no tier's sweep `(t − b) · c` exceeds its ring's inradius, which keeps successive drops overlapping.
4. **The cursor sun under an island** (§8.4 (d), item 415). Whenever the sky layer is visible and the document holds an
   island that is not fallen, the cursor sun's height is `max(h₀ · D · s, 1.5 × the list's surfaceTopCm above the view's
   ground)` — whatever is in view — so no sun ever stands below a floating island and panning never changes it: it moves
   with the zoom alone (J-V5.14); the path and fixed suns are unchanged.
5. **The picture and the model agree.** The light pass's shadow (from the rough tiers, at any sun) and the model's strip
   (from the smooth tiers, at the sampler's fixed suns, V05 §3.19) read one solid: under the path sun set to the equinox
   at a sample's hour, the style's `sun.latitudeDeg` set to the site latitude, the vector rung's shadow of the smooth tiers
   on flat ground covers exactly the cells the strip marks for that sample, within one field cell at the boundary
   (T-V5-20) — so the shade map and the drawn shadow never disagree about where an island's shade falls.

### 5.4 Labels

The island's `quarter` label draws at the city band along its long axis (§9.3's area rule on its land face), its
districts' labels from the district band, an institution's `landmark` label, a landfall's `place` label; accesses carry
no label, and neither does a strip (the shade map view's legend names the islands). Candidates of sky entities are held
in the island's local frame and translated by S14 (§9.1, item 415). §9.2's candidate set: sky rows only while the sky
layer is visible; under `opaque`, a ground row whose anchor lies inside a visible island's drawn land face is no
candidate; under `ghost` both are candidates, the sky rows at 1.5 × their priority; under `offset`, sky candidates at
their displaced positions at the stop. An island too small at a stop for its label's spine (its long axis shorter than
the text) carries its name at the land centroid as a point label, or none where that too collides (§9.2's greedy).

### 5.5 Exports (§11.1's rows, item 415)

| format | the sky |
|---|---|
| `.plat`, JSON schema | island records with local geometry and `anchor` (a `removed` record with its `removed` field and no arena geometry, the arena in the archive); `SkyAccess` records; `removedAccesses`; every field's tier |
| compact twin | world coordinates (anchor added), `layer` and `elevationCm` per sky entity |
| GeoJSON | FeatureCollection `sky`: one feature per island — its projected land face, with address, name, reason, state, `areaHa`, `altitudeM`, `elevationM`, supply, `placement.over`, the underside's kind and depth — then its entities in world coordinates with `elevationM`, its accesses as LineStrings (top → foot) with kind, role and run, and its strip as three MultiPolygon features (`kind: 'shadeStrip'`, `samplesAtLeast` 1, 3 or 5 of 9, `basisCurrent`; none for a strip with `cells` 0); the island's own retaining walls as item 447's `retaining` LineStrings, in world coordinates, plus `elevationM` (V05 §3.22 (4)); a removed island is not exported; a landfall in the `ground` collection |
| SVG | `<g id="layer.sky">`, one `<g id="sky<part>">` per island; the shadow group; the underside and tether in `offset` exports; in an export of the shade map view, `<g id="sky<part>.shade">` with the strip's solid outline and any dashed pending outline (V09's veil in its own group) |
| PNG / tiles | the sky layer's own transparent PNG (§11.1's per-layer PNGs); lit by V05 §5.3 at the export's sun |
| VTT | one scene per island in its local frame, its elevation recorded; the rim a wall that blocks movement and not sight; each landing yard a note linked to its ground landing's note in the ground scene |
| glTF | per island a node at (`anchor`, `elevation`): its terrain draped over the land face, the rim wall down by the rim thickness, the underside lofted between the underside tier rings (each resampled to `export.gltfRingPoints` points by arc length from its point nearest the island's bearing; a `flat` island's rim slab closed by its base), its retaining walls as walls on its terrain, its buildings and trees, the river sloped, the fall as a mist quad `export.mistM` tall; hoist ropes and rope lines as thin cylinders, a stair's steps as boxes laid along its helix (V05 §2.2) with a slab at each landing, a light bridge as a translucent ribbon; `extras` with address, reason and state |
| CityJSON | the island as PLAT's extension object `+FloatingIsland` (its top TIN and its underside solid, attributes as GeoJSON's), its buildings as `Building`s based at its elevation, accesses as `+SkyAccess` lines — PLAT's extension schema carries both types |
| CSV / statistics | island count, areas, altitudes, carried households by band with each band's share of the island's land, supplies, states, district counts; per island its strip's area blocked for at least one, three and five samples, the mean prosperity inside its three-sample area and in the same district's cells outside it (item 102 (g)'s quantity), whether its basis is current, the trades left on the ground by `carry` with their reasons, the split shops carried, the coverage instances taken per island district, the S3 reservation handed over and its taker, the crypt's form, the count of cross-arena pulls and links by landing; the node term when it acts; per active chain (custom or `activeChains[]`) that crosses an island, its island nodes, the landing its links cross and their route lengths; per landfall, the covered walls, towers, bridges, reservations and ways, and the covered raised spans, raised-way piers and retaining walls with their new states, the deck plots tombstoned with their decks and the accesses re-landed; per island and epoch, each clearance raise (`reclearIsland`) with the caster that caused it; the removed islands and access ordinals |
| skeleton file | declared islands (T5 with `sky`) and placed accesses (T4) as declarations |

With the islands setting off, or the document holding no island, the `sky` collection, group, scene, node and rows are
absent (an export never writes an empty sky container); a fallen island exports its landfall only. **Knowledge:** a
`secret` access is withheld from every key that does not admit it (§9.2's `admit`, §11.1's *Knowledge*). The strip is
thematic: the PNG and tile layers, VTT, glTF and CityJSON carry the island's physical shadow through the light pass and
its solid, never the strip (J-V5.35).

## 6 Performance budgets

All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there. §12.4's sky row cites this table (item 476).

| work | CITY, three islands | METROPOLIS, three islands | basis |
|---|---|---|---|
| S7b (5): `S_town`, slots, reasons, fills | ≤ 3 ms | ≤ 5 ms | one mean over ≈ 24 000 / 62 000 field cells; ≤ 100 fill batches per slot |
| S7b (5): outlines and placement | ≤ 8 ms | ≤ 20 ms | the 64 m class raster once (≈ 6 000 / 15 600 cells); ≈ 15 600 / 40 000 candidates × ≤ 30 / 60 outline cells |
| S7b (5): the reachability transform (V05 §3.7 (2)) | ≤ 0.5 ms | ≤ 1 ms | one two-pass chamfer transform over the class raster, the raised parts' piers, dilated deck plans and deck faces rasterised into it once (≤ 40 raised parts at METROPOLIS); one read per rim cell of a candidate |
| SKY, per island | ≤ 7 ms | ≤ 10 ms | one L0 and one L1 batch; terrain ≈ 4 000–16 000 cells and `hydro` ≈ 1 700–6 500 on a 520–1 010 m frame (a disc to a grown spindle, V05 §3.8 (1)); the river; the claim search (≤ 2 000 sites at 10 m, each an O(1) fit and the crypt test); the ground landing claims |
| SKY: the island's gradient field (V05 §3.11) | ≤ 0.5 ms | ≤ 1 ms | ≤ 200 / 400 lattice cells: two ranks, one sort, the band map, ε and the three-box blur |
| the unit run, per island (V01 §6's sky row) | ≈ 8–12 ms, on the generation worker concurrent with the pool | ≈ 12–18 ms | ≤ 3 districts' worth, ≈ 2–5 % of the town's plots |
| SKY: the ground reference and the altitude, per island | ≤ 1 ms | ≤ 1 ms | ≤ 300 / 800 field cells under the projected solid, each a terrain read and a ceiling from the placed casters and the allocated tower rows |
| field pass 2: the strips onto the ground, per island (and per epoch) | ≤ 4 ms | ≤ 6 ms | ≈ 4 600 cell-sample tier walks at METROPOLIS's largest island (the low samples' long sweeps dominate), each ≤ 7 tiers × ≤ 20 steps of O(1) mask reads, most ending at the first hit, after the corridor's O(1) pre-test per cell (V05 §3.19 (5)); ring masks ≤ 60 000 / 160 000 bits, built once from `shadeBasis`; measured on the flat B-CITY fixtures and on a mountainous METROPOLIS fixture (relief class `mountainous`, island over a valley) |
| SKY's last step: strips onto islands and `shadeSky` | ≤ 1 ms | ≤ 1 ms | ≤ 500 lattice cells per receiving island, only under a higher island |
| the route distance (V05 §3.20) | ≤ + 5 % of the unit run's S10b and of the pooled S10b of the districts holding a landing | same | ≤ 3 accesses × 3 raster reads per pull that crosses arenas (a hand-placed access adds its own reads) |
| SKY-F | ≤ 3 ms | ≤ 4 ms | the clearance check over the projected faces; ≤ 60 lights per island |
| **the model's critical path** | **+ ≤ 55 ms p50, ≤ 68 ms p95** | **+ ≤ 84 ms p50, ≤ 104 ms p95** | the unit runs hidden by the pool while the generation worker's concurrent work (hinterland unit + islands) stays below the pooled time; the ground's work falls by the carried share |
| S14, per island | ≤ 4 ms, ≤ 5 000 marks | ≤ 6 ms | the district rate on its fabric plus rim, shadow, access and slab records (≤ 7 slabs, ≤ 256 vertices each) |
| rendering, a tile an island covers | ≤ + 30 % of that tile's raster and light-pass time | same | the second base and surface layer (V05 §5.3) |
| rendering, the light pass on tiles no island's land covers | ≤ + 5 % against the same map without islands | ≤ + 5 % with three islands | the window without slabs and the per-tile slab cull (item 416); measured at P3; **fallback:** cull the slabs per tile by the exact union of their shadow sweeps (not the bounding box), re-measured |
| `setAttr` altitude, occlusion, underside, name | ≤ 5 ms | ≤ 5 ms | the record, a marks delta and a slab delta |
| a move | ≤ 65 ms | ≤ 70 ms | 5 ms plus two post-build placements (§12.6's 30 ms each) |
| a resize, a rim reshape | ≤ 5 ms + §12.6's scoped regeneration of each receiving district and of the district whose institution claim is re-searched where it receives no face (at most k ≤ 3 in all; V01 §6's sky row) + §12.6's scoped-regeneration law once over the plots the event re-cuts outside those districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7); J-V5.81) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement | same | the buffer bisection (≤ 12 steps), one island L1 batch re-laying the strip and yards, the claim re-search (≤ 2 000 sites at 10 m, SKY's rate) only where the claim no longer fits; the re-cut plots' one scope — a yard (V05 §2.4's `landing` row) touches ≤ 3 plots, a shrink's the plots its eroded band and re-laid strip line cross (V01 §6's sky row leaves them to this row); each re-claimed yard's `sky_landing_top` use opened at its re-seated top by a positive placement (§7.7's `placeAt`); volume 1's `plantRimWalk` once (two `Greenery` records); V06 §6.2 prices an epoch's resize at this row |
| New random on an island | ≤ 40 ms | ≤ 55 ms | SKY plus its unit run |
| `placeSkyAccess`, an access `delete` | ≤ 35 ms | ≤ 40 ms | an island L1 batch, a local re-derive and one placement |
| declaring an island after generation | ≤ 120 ms | ≤ 160 ms | the fill with its relocations, SKY, the unit run |
| `fallIsland` | ≤ 80 ms | ≤ 110 ms | relocations, demolitions, the archive; + 30 ms per access of another island it re-lands |
| `IslandEpochStep`, per island | ≤ 2 ms plus its conversions at the rows above | same | the epoch's strips are the field pass 2 row |
| `sky.clearance`, per island and epoch (V05 §3.15 (7)) | ≤ 1 ms | ≤ 1 ms | the epoch scope's elements under the projected solid (≤ 300 / 800 field cells), each a footprint test and a top read; no geometry written |
| `skyAccessObstacles` and its callers' tests | ≤ 0.05 ms per call with the generated accesses (≤ 9 entries) | same | one entry per live access (V05 §2.3b), linear beyond nine; the raised-way solver tests each candidate span against them in O(entries), inside its own budget (§12's) |
| the shade map view's pending strip after an island edit | ≤ the field pass 2 row, computed only while that view is shown | same | never on the edit's own path |
| Update shade now | ≤ the field pass 2 row for one island + the field's recomputation over the two windows (≤ 2 ms) + §12.6's rate for the blocks it re-derives | same | a scoped evaluation, never a whole pass |
| memory | ≤ 5.2 MB for three islands (the strips ≤ 30 KB each, `shadeBasis` ≤ 2.5 KB each) | ≤ 9.3 MB (≤ 60 KB each; bases ≤ 2.5 KB each) | an island's arena ≈ 0.5 MB per district's worth; its rasters ≤ 0.1 MB; the sky surface layers only on covered tile positions, inside §8.8's canvas budget B |
| document | ≤ §2.9's 320 B per island building, plus ≤ 2 KB per island record and ≤ 2.5 KB for its `shadeBasis` (the rim copy ≤ 256 vertices × 8 B, the rest ≤ 0.5 KB) | same | |

The strip rows assume §4.5's default sampler (one point per cell); at its fallback of four points per cell they scale by
four — ≤ 16 ms at CITY and ≤ 24 ms at METROPOLIS per island — and the memory row's strips by two and a half (two bytes
per cell become five). The chain rule of V05 §3.20 (9) and the node term add no measurable work: the one is a filter on
the sky fill and the route reads already costed, the other one addend per evaluation. **Pre-decided fallbacks:** the
strip row missed → `shade.stepM` 8 → 16 m and `shade.ringMaskM` 4 → 8 m, re-measured (T-V5-20's one-cell agreement
re-checked), then the samples' reach cap for the strips 8 → 4, recorded as a declared shift of the term; the model rows
missed at M6-sky → the placement lattice coarsens 40 → 80 m and the island units join the pool as units (pool size ≥ 1),
re-measured; the rendering row missed → the sky surface layer at half resolution (rung 2's method), then the vector rung
for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value for the
owner's veto (D-18).
