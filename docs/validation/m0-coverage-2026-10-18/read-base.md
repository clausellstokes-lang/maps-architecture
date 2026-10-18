# m0-coverage / read-base — what the base (docs/ARCHITECTURE.md) promises the kernel and the three levels

**Lane:** m0-coverage/read-base (opus; J394, Fable-validated). A reader: this record judges nothing; it records what
the base text says, with a cite (file:line) and READ (seen in the text) or INFERRED (my reading of what the text
implies, flagged). Started 2026-10-18 09:14Z.

**Files read** (line counts and md5 at read time):

| file | lines | md5 | what was read whole |
|---|---|---|---|
| docs/ARCHITECTURE.md | 24462 | 1f871a01961de8a4994125d7bb1993be | §2.1 (533–587), §2.2 (588–956), §2.3 (957–1087), §2.6's heights/ground datum paragraph (1710 ff.) and `Heights` (1331), §2.9 (3844–4280), §3 whole (4281–5633), §4.1 (5644–5860), §4.12 (9688–9743), §4.13 (9744–9801), §5.3 (9968–10059), §6.2–§6.5 (10403–11039), §7.3 (11641–12015), §12 (17749–18449); then every passage hit by the greps listed in the gaps section |

Cites are `A:<line>` for docs/ARCHITECTURE.md.

## Facts, in the order found

### §2.1 Layers, coordinates, units, ids (A:533–587)

1. Every model length is an integer number of centimetres (`i32`), world centred on (0,0), +x east, +y north, inside the arena frame of §3.2 (9); heights are centimetres; centidegrees (`Cdeg`, i32) are the one model angle unit; a schema lint refuses a length field without a unit in its name or type. A:535–541 READ.
2. One `Unit` vocabulary for every table column/metric/field (m, m2, ha, cm, cdeg, … z, none); V11 `ColumnSpec.unit` and V12 metric `Unit` are named subsets. A:542–553 READ.
3. `layer ∈ {underground, ground, sky, site}` is a field on every geometric entity and display item, with `z: i32` and `elevationCm: i32`. A:554–556 READ.
4. `site` layer: a world site's levels, one part per level numbered by `Document.nextSitePart` from 1 (no part 0); addresses `site<n>/kind:token`; level mapping is §2.2 rule 1's underground mapping; drawn by §8.4's underground view on its own `LayerSpec` (file k item 624); the kernel `Layer` type (`types/ids.ts`) is **appended**, K1's append-only test the bar (V14 Part E bar 1, T-V14-32); "the value is appended at M1's API pass and its parts exist only from M-SITE-A (V14 §2.1)". A:557–561 READ.
5. "The base populates only `ground`; `underground`, `sky` and `site` — and every staged record of §2.7 — are schema-complete and empty until their staged stages run" (volumes 4, 5, 14). A:562–564 READ.
6. "Layer" unqualified means one of the four model layers; display groups (labels, trees, …) are never a further model layer. A:564–566 READ.
7. Arena parts (G-R11): each layer has its own arena or arena parts keyed by `PlatKey`; ground part 0 plus one part per raised-way deck from 1; underground part 0 (sewers) plus one per underground system; one part per sky island. Every part number allocated once at creation and never reused; counters `nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`, `nextSitePart` never decrease (number is part of keys and addresses, §6.3). A:567–575 READ.
8. Whether a layer exists is decided by what the model holds, never by visibility (item 14). A:579–581 READ.
9. Ids: every entity has an address id `kind:token`, prefixed with its arena outside the ground layer (`under/`, `under<n>/`, `sky<n>/`); lineage key separate (§6.3); in memory interned `u32` handles; parent is a field, never parsed from the id; no record outside the kernel stores an arena slot (§2.2 rule 5). A:582–588 READ. (The `site<n>/` prefix is stated in item 4, A:558.)

### §2.2 The plat (A:588–956)

10. `Cm` integer centimetres, a number becomes an arena coordinate only through `snap()` (§3.2 (7)); `Level = 0..4` (L0 land/water · L1 way skeleton · L2 kerbs/corridors/blocks · L3 plots+residue · L4 footprints+yard parts). A:592–594 READ.
11. `PlatKey = {layer, part}`; site parts ≥ 1 = one arena per level of a world site (V14 §2.1), numbered by `Document.nextSitePart`, "round-tripping as any part (K2 unchanged; a site part's level mapping is rule 1's underground mapping)". A:595 READ.
12. `Plat` holds typed-array vertices/half-edges (twin = h^1), a `RoleTable`, five `LevelFaces`, five `LevelIndex`, `indexHome`, `version` bumped by every committed batch; `frame` set at creation and only grows (epoch rung crossing; Re-derive never shrinks below protected content). A:597–611 READ.
13. `LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500; rangeCm: 8_388_608 (2^23) }`; lattice fixed for the arena's life, range bound taken at population cap and extreme aspect so a grown frame keeps every old lattice point. A:600, A:612 READ.
14. `RoleHeadTable`/`OwnerTable` are typed-array open-addressing hash tables (load ≤ 0.5, fixed integer hash, backward-shift deletion); "nothing iterates a table — so its layout never reaches an output" (J-K22). A:622–626 READ.
15. `LevelIndex`: static `PackedIndex[]` partitions (one per arena at L0–L1; one per district + one outside at L2–L4), a dynamic `UniformGrid`, per-partition tombstones. A:627–630 READ.
16. The only forms in which an entity, seam contract, edit event or API scope refers to geometry: `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef` (batch-local, never stored), `LatticePoint`; `VertexSig`; `ChainProfile<T>` (knot role + values + interp linear|step; never a vertex-indexed array). A:633–648 READ.
17. Rule 1: everything with a boundary is a face, everything linear an edge chain; ground L0 land and water only (terrain contours and drainage lines are raster products, never plat edges); L1 spines/walls/setbacks/shores/border/perimeter/district bounds; L2 corridors by `corridorUnion`; L3 plots, courts, passages, bands, hinterland furlongs; L4 footprints and yard parts. A:652–681 READ.
18. The other arenas take the same five views with their own meanings: underground part 0 (rock, tunnels, bands, frontage plots, buildings); a further underground part (rock face, gallery centrelines + `chamber_wall` chains, gallery bands by `corridorUnion`, plots, buildings under `Chamber.ceilingCm`); a sky island part in its own local frame (rim, void face kind `sky` never cut or plotted); a raised ground part (outer ring, one spine, its corridor band, no L3/L4). A:683–698 READ. (Site parts are said to take "rule 1's underground mapping", A:559, A:595 READ; rule 1 itself names no site part, A:683–698 READ.)
19. Rule 1/2: two arena parts never share topology or a vertex; a cross-part link names one vertex in each (`UndergroundLink` with `link_end`; raised-way feet with `raised_foot`). A:700–704, A:712–717 READ.
20. Rule 2 (J-K1): one arena per `PlatKey`, the five levels are views; each edge carries its birth level; level-n subdivision is edges of level ≤ n; nesting holds by construction and is checked by index (§3.10). A:705–711 READ.
21. Rule 3: finer levels never move coarser geometry except `splitThrough`'s Steiner vertex (≤ half a lattice diagonal, 0.71 cm); level-n route; promotion (J-K11), dissolution, the `split` flag, demotion (J-K28) with its (a) edges, (b) flags, (c) vertices steps and split restoration (validated 100 000 of 100 000 random routes, fixall_kernel_r4_checks.out A). A:718–797 READ.
22. Rule 4: edges enter only through `insertChain`; faces never re-walked globally. A:798–801 READ.
23. Rule 5 (J-K3, J-K9): topology by index; no record outside the kernel stores slots and no entity record stores a vertex position (except a building's wing rings, stored stage-3 composition/plan rings, tower centres); references by role resolved by `resolve`; stretches by `StretchRef` (J-K31). A:802–836 READ.
24. Chain attributes are knot profiles (J-K10); cutting/joining by `retypeEdges` with `rekey` and cut knots (J-K23; ≤ 6.8e-13 cm over 20 000 random ways); stretch-state profiles with canonical form, write, read (`sampleProfile`), regenerate (`retaining.settings.stateSnapCm`), undo, migrate. A:826–895 READ.
25. Positions in the log (GEO-5 (b)): `moveVertex` stores `LatticePoint` + `VertexSig`; replay `resolveVertexAt(key, at, sig)` binds exact, then nearest-by-signature within the rebind radius, else orphaned; never by distance alone. A:896–906 READ.
26. Rule 6: refinement is a pure function `L(n+1) = refine_n(level-n view, params, streams)`, streams keyed from the scope's lineage. A:907–909 READ.
27. Rule 7: role registry is a versioned data table; the edge role list includes **`passage`** — "structural, non-indexed, on `site` parts: the tunnel role's twin, its half-width answered by the site kernel's `SpineWidths` callback — `passage.widthCm[widthClass] ÷ 2 + wallCm`, V14 §1.1 — so `corridorUnion` reads a site's widths as the sewer's; `chamber_wall`, `access_point`, `link_end` and `margin` are reused on `site` parts; appended without digest change, K5, read only from M-SITE-A; file k item 602". A:910–918 READ.
28. Vertex roles include `access_point`, `link_end`, `raised_foot`, `sky_access` and indexed knot roles (`width_knot` … `deck_order_knot`). A:919 READ.
29. Structural roles never removed by sliver absorption or face merge; coincident features are one edge with several roles; the deck, anchors/contact names/gate ends (J-K29). A:921–953 READ.
30. Rule 8: every committed batch validates declared invariants, writes a report and a `CommitRecord`; a failed batch leaves the arena at the previous `version`. A:954–955 READ.
31. Size: one arena at CITY ≈ 80 k vertices, ≈ 240 k half-edges ≈ 12 MB "(PLAUSIBLE until M0)"; index 38.4 B/item, ≈ 7–8.5 MB at finished CITY "(PLAUSIBLE until M1)"; generation worker's arena with index ≈ 19.5–21 MB; frozen copy copy ≈ 1.1–2 ms. A:957 (the *Size* paragraph, A:944–956 of the file listing) READ.

### §2.3 Terrain and water (A:957–1087)

32. `Terrain` keyed by `PlatKey` (the ground or one sky island); height raster over frame + margin (§3.2 (9)). A:960–962 READ.
33. `Terrain.datumCm`: "the elevation that height 0 represents, relative to mean sea level — the world datum (V13 §2.1); one per document … set by S1 (§4.2) and by nothing else — a placement never writes it; READ ONLY THROUGH `datumOf(doc)` (item 140 M3; V13 §2.2), which on a placed frame answers the world's DEM at the placement's origin read through `Document.worldRef` at call time, a derived reading (C13-01)". A:963 READ.
34. `heightCm: Int32Array` above datum; `reliefLimitCm` 1 000 000 (10 km), every write checked. A:964 READ.
35. `hydro` raster (D8 `flowDir` on every land cell incl. flats, `flatRank`, `flowAccum`), `outfalls` per 50 m bank stretch or frame edge. A:965–968 READ.
36. `wind` is S1's write, "read only through `windOf(doc)`, which on a placed frame answers the charter's wind in frame terms through `worldRef` (V13 §3.11.5)". A:969 READ.
37. `carveDeltaCm: Map<number, Cm>` (item 140 M2): per hydro cell the depth S1 (3)'s carve cut; `preCarveHeightAt(doc,p) = heightAt(p) − carveDeltaCm[cell(p)]`; empty on a document saved before V13. A:970 READ.
38. `surfaces: WaterSurface[]` (item 140 M2): one surface per WaterBody at generation plus dated surfaces; never carved into the heightfield (V13 §2.2, §3.12.1). A:971 READ.
39. `groundwater: GroundwaterField` (item 140 M4): water table derived after S1 (3) and after every terrain/water operator (V13 §3.12.3), read only through `waterTableAt(doc, p, when?)`; "the record forms `WaterSurface` and `GroundwaterField` are V13 §2.2's — the three fields are declared at M1's API pass and read as absent until M-W0h's steps write them". A:972 READ.
40. `geology` and `mining` fields read only by II.7.6's cavern rule. A:973–974 READ.
41. `HydroGrid.cellCm`: TOWN 1 600, CITY 2 500, METROPOLIS 3 200, kept through frame growth. A:976 READ.
42. `TerrainSampler { heightAt (bilinear; 2.5 m refinement on demand, never stored), slopeAt, flowAt }`. A:987–988 READ.
43. Height raster resolution by size class: TOWN 5 m, CITY 8 m, METROPOLIS 10 m, over frame + context margin; epoch frame growth extends every raster by whole cells keeping `cellCm` (J-A81.31). A:1012–1018 READ.
44. Hydrology grid (J-K12): 16/25/32 m, 200²/320²/400² cells; integer flood; measured CITY 15.9–17.2 ms, METROPOLIS 25.3–26.5 ms, TOWN 6.2–7.0 ms (fixall_kernel_r2_hydro.out); grid's pre-decided coarsening is §12.4's M0 site-and-fields fallback. A:1020–1032 READ.
45. Heights (GEO-15; J-K7): Int32 cm relative to the per-document datum; every write to a height/depth raster range-checked, clamps and reports `W_HEIGHT_CLAMPED`, never wraps. A:1034–1038 READ.
46. Flats: priority flood keeps exact flats; two-gradient flat resolution into `flatRank`; D8 ties fixed order E, NE, N, NW, W, SW, S, SE. A:1040–1044 READ.
47. Terrain is not in the plat; contours extracted per render tile/export; drainage is queryable per `hydro` cell; a sky island's terrain is its own `Terrain` with its own key, datum, frame and hydro grid. A:1046–1054 READ.
48. Slow change (item 25): siltReach, reclaim, shiftCourse, digCanal — each a lifecycle event `convert:<kind>`. A:1075–1087 READ.

### §2.6 Heights and the ground datum (A:1331, A:1710–1734)

49. `Heights { baseCm (ground datum: floor level in terrain cm); floors; floorsBelow? (derived); eaveCm; ridgeCm; towerCm? }` — owner HEIGHT ruling: always populated. A:1331 READ.
50. Every building, wing, tower, keep, wall run, gate and bridge carries heights; one per-entity function `deriveBase(entity, sampler)` computes every ground datum, called by S11, S7, S1's terrain operator and the edit layer after a warp or vertex move. A:1710–1713 READ.
51. Ground-wing `baseCm = max(samples) + plinthCm` (default 30 cm), samples by `levelledGroundCm(doc, key, p)` on the plot's arena `key` (levelled platform datum, else unlevelled raster, bilinear on the refined 2.5 m raster), with the `terrace.wallBandCm` (250 cm) retaining-wall rule; wings on a deck take the deck's surface height; stacked wings by `rebaseStack`. A:1714–1735 READ.
52. Fall under a ground wing is a foundation skirt; a row footprint whose fall exceeds `skirtMaxCm` (default 300 cm) is split along the contour into stepped wings; walls store base as a knot profile; shadows and the 3-D export read the same numbers. A:1736–1748 READ.

### §2.9 The document (A:3844–4280)

53. A document is a base (recipe or rebased materialised state) plus an ordered log; everything else is canonical style state, recorded input (packs, host outputs), a verified cache, "a world document's host-fed plate cache (`lensPlates`, kept as the host sent it, never verified or rebuilt)", or per-user state. A:3846–3850 READ.
54. `Document.worldRef?: { world: Uuid; placement: Id }` (file k item 608; item 140 M6): "written only by the frame's own `charter` event, author `world`"; absent on a standalone frame. A:3861 READ.
55. `Document.namespace: string` — the address namespace segment (§6.3; V13 §2.5), minted once at creation, kept on clone and save-as; read from `docId` on an older document. A:3862 READ.
56. `Document.nextSitePart: number` — "the canonical form's fourth part counter: the part the next level of a world site takes (1 at creation; §2.1 Arena parts, V14 §2.1); never decreasing". A:3863 READ.
57. The four part counters never decrease; an arena created after generation carries its number in the address its event records; replay reads it there, never recomputes it. A:3866–3871 READ.
58. `Document.lensPlates?: LensPlate[]` (file p item 890, BCR-V13-38): world document only, never canonical, outside every digest, kept across loads/saves, never rebuilt. A:3881 READ.
59. `Recipe.product?: 'town'|'hood'|'world'|'site'` (absent reads 'town'; 'world' a world document (V13); 'site' a world-site document (V14 §3.1)); `Recipe.world?: WorldRecipe` present exactly when product is 'world' ("its `snapshot` names every version, K10, V13 §2.7"). A:3894 READ.
60. `Recipe.charter?: FrameCharter` — "a placed frame's one boundary record (item 140 M5; V13 §2.2): a recorded input of S0 and S1, in the records digest, never the model digest". A:3895 READ.
61. `Recipe.rung` "widened by the village rows: the replay runs the stage set of the product that registered the rung; a reader without that product refuses to replay, naming it (§7.5)". A:3893 READ.
62. `ChunkRef.block ∈ geometry|entities|archive|history|fields`; `partition` = PlatKey and 'L0-1' or a static-index partition or a block group or 'town'. A:3925 READ.
63. Load: newer schema → read-only; outputVersion outside retention window → frozen view (never root-checked, J-DET-44); otherwise decode, recompute both digest trees and compare; corrupt cache → replay; verification replay in a pool worker; open-to-editable ≤ T(B) (CITY ≤ 60 ms + 60 µs × B). A:3973–4085 READ.
64. Snapshot holds geometry once per arena (`PlatKey`) with birth levels; faces/twins/parents rebuilt on load (§3.9); fields not stored at full resolution (Uint8 32 m copy only); provenance not stored; neither digest tree stored. A:4113–4127 READ.
65. Content-addressed chunks: one per arena for its level-≤ 1 routes and one per static-index partition. A:4128–4135 READ.
66. Document size budget: TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, ≤ 320 B per building at CITY; "This section holds the document budget (§12 carries memory, not the document)"; fallbacks second-order delta coding, block-group chunking. A:4136–4151 READ.
67. Canonical form: "`docId`, `schemaVersion`, `outputVersion`, `nextSeq`, the three part counters (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`), `base`, `log`, `packs`, `hostContent`, `dossier` (when present), `style` and `model` (when present)"; four digests (model, records, provenance, document). A:4158–4164 READ. (This list names three counters and not `nextSitePart`, `worldRef` or `namespace`, while A:3863 calls `nextSitePart` "the canonical form's fourth part counter" — READ both; see gaps.)
68. World's and site's view keys (file k item 608): per viewer `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens`, `lensWeek`; per viewer `projection` (V14 §2.6; default flat, item 141; never in a digest, export model or the log; "the key reserved at M1's API pass, its renderer M-25D's") and `siteOpen`; **shared** `encounter` ("one open encounter per document, last-writer-wins by Lamport and session; M-ENC") and `party: { tier; places }` (C14-17; M-SITE-A). A:4200–4207 READ.
69. "A world document's `base` holds its rasters as `fields` chunks and its records in the entities block, its log V13 §4.1's events; a site document's creation prefix holds its drop and charter (V14 §3.1)." A:4207–4208 READ.
70. The encounter is a view key (shared), not a model record, per A:4205–4206 READ; INFERRED from that: the base places the open encounter outside every digest (the View-state paragraph says view keys are "outside every digest", A:4196–4197 READ).

### §3 The geometry kernel — §3.1 build-versus-adopt (A:4281–4356)

71. Plain-words contract: integer centimetres, exact side-of-line, snap every new line, typed reason instead of throwing; every stage changes geometry only through transactions accepted or rejected whole. A:4283–4287 READ.
72. Built: lattice/snapping/attraction; `orient2d`; the planar subdivision (struct-of-arrays, allocation-free); polygon booleans/buffers/offsets/insets/bands on the kernel's arrangement (J-K4; Clipper2 and polygon-clipping only CI oracles / §3.7 fallback); straight skeleton (J-K5; CGAL refused on licence); OBB/hull/LIR; `regularFit`; Poisson-disc (Bridson k = 50, product-build-time stamp tiles); curves (Chaikin, Catmull-Rom, Laplacian, Visvalingam–Whyatt, fillets); distance transform; binary-heap A*/Dijkstra on rasters and the subdivision graph; `dmath`; RNG and hashing. A:4291–4310 READ.
73. Adopted: `robust-predicates` 3.0.3 (Unlicense) `incircle` (never on the topology path); `delaunator`, `d3-delaunay` (site sampling, Lloyd, field seeds, medial axes — never the street source); `simplex-noise`; `flatbush` (static index), `rbush` (screen labels only); `d3-contour` marching squares; `earcut`. A:4293, A:4300, A:4302, A:4304–4305, A:4307 READ.
74. Every primitive returns `KernelResult<T>` and never throws for a geometric reason; `KernelError` codes: E_OUT_OF_RANGE, E_DEGENERATE, E_LEVEL, E_LOCKED, E_KEPT, E_SCOPE, E_STRUCTURAL (incl. "a transient arena's fixed edge"), E_NOT_TWO_CROSSINGS, E_HOLE_CONTACT, E_SELF_INTERSECT, E_BELOW_MIN_EDGE, E_BELOW_MIN_ANGLE, E_BELOW_MIN_AREA, E_BELOW_MIN_WIDTH, E_NON_CONVEX, E_NO_PATH, E_WORK_LIMIT, E_INVARIANT; warnings W_ATTRACTED … W_CUT_SLID. A:4312–4336 READ.
75. `E_DEGENERATE` details: ratio, collinear, fit, empty, collapsed, stretch, seed (transientArena), fixed (transientArena), overlap (transientArena, tileRings). A:4338–4348 READ.

### §3.2 Numeric policy (A:4358–4491)

76. `Frame { widthCm; heightCm; aspect 0.5–2; marginShare }` (0.3 under `base`; `territory.marginShare` under `territory`; VG parity preset). A:4360–4362 READ.
77. (1) All persisted geometry integer cm; **range invariant |x|,|y| < 2²³ cm (83.9 km)** enforced by `snap`, so `orient2d` is exact in doubles; largest arena (METROPOLIS at cap, aspect 2, 17.53 × 8.76 km + 30 % margin) |x| ≤ ≈ 1 402 000 cm ≈ 2^20.4, ≈ 6× headroom; "Every exactness argument below rests on the range invariant, never on the frame table". A:4365–4376 READ.
78. (2) Tolerances are world lengths; `minEdge` 25 cm, `attractCm` = minEdge + 1; class floors (width, area, angle) are §4.7's and none is `minEdge`; one minimum-edge rule for every writer (GEO-35); no weld tolerance (J-K2). A:4377–4388 READ.
79. (3) No float comparisons for topology; ties on lattice positions never slot ids; a float deciding topology is quantised (cm, Cdeg). A:4389–4395 READ.
80. (4)–(5) Cross-platform reproducibility is §6.5's; angles are unit vectors in doubles from integer endpoints, headings stored in centidegrees. A:4396–4399 READ.
81. (6) Exact areas (GEO-32; J-K13): `area2(ring)` exact integer for every ring `snap` can produce via bounding-box-relative shoelace and a BigInt flush at 2⁵²; `area2Big` for self-crossing operands; orientation by `orient2d` at the lowest-leftmost vertex. A:4400–4412 READ.
82. (7) `snap(x, y)` is the only door; rejects `!(Math.abs(v) < 2**23)` with `E_OUT_OF_RANGE` in every build (GEO-7). A:4413–4418 READ.
83. (8) Checked ratios: `ratio(num, den, kind)` with floors (1 cm, 1 cm², 1 cdeg, count 1); lint flags any other division by a computed value. A:4419–4422 READ.
84. (9) Frames are rectangles; area by `RungProfile.frameLaw` (`base` or `territory`); width = √(A·aspect); arena = frame + `marginShare` per side; range bound taken at the population cap and extreme aspect. A:4423–4436 READ.
85. Frame growth at an epoch (item 81 (b); J-A81.31): frames and arenas never shrink; growth runs as §3.3's declared sequence of single-level batches with one clear region — (a) clearing L1, (b) margin L0, (c) border L1; every other part whose outer ring is the frame + margin grows by (a) and (b) on its own key; rasters extend by whole cells; kernel part draws no stream; fallback re-grid if M4's memory measure of extreme growth exceeds §12.8. A:4438–4491 READ.

### §3.3 The transaction protocol (A:4492–4794)

86. `KernelTx { key: ArenaKey /* a PlatKey, or a transient arena's TransientKey (§3.4) */; level; ops; expect; onFail: reject|repair|downgrade; batch; stage; rederivesFrom; clearRegion?; prepared?; workLimit }`. A:4495–4504 READ.
87. `BatchScope` kinds: stage, district, block, edit, and `{ kind: 'entity'; id }` — "a transient arena's batches: the entity whose derivation opened it". A:4505–4506 READ.
88. `CommitRecord` (version, key, per-level dirty faces, counts, moved, promoted, demoted, unflagged, owners, roles, warnings) — "kernel-internal slots, never persisted". A:4507–4519 READ.
89. Batches apply to a scratch overlay, validate §3.10's batch-local invariants and `expect`, commit or reject atomically; an empty batch commits nothing. A:4521–4527 READ.
90. A transient arena's batches use this protocol with `level` 0 (its one level), `batch {kind:'entity'}`, `stage` = `rederivesFrom` = the stage under which the opening rung draws its streams (so no face on it is kept content), either op form, the caller's `workLimit`, no `clearRegion` or `prepared`. A:4527–4530 READ.
91. One level per transaction (else `E_LEVEL`); kept content by stage rank (J-K14) → `E_KEPT`; clear rule (only locked/pinned content conflicts). A:4542–4564 READ.
92. Clear regions and prepared contacts (LC-7; J-I10, J-I12, J-I13, J-K24): coarse insertions into finished fabric run as declared single-level batch sequences sharing one clear region; rules 1 clearing, 2 preparation (deck_end, gate_end, anchor contact names with kernel-allocated ordinals), 3 contact; fallback = clear whole L0 land face. A:4565–4625 READ.
93. Two op forms (GEO-11; J-K15): declared (sorted by op kind rank, lineage key, stream index — arena is a function of the op set) and callback `tx(tx, fn)` (issue order a function of inputs, streams and canonically sorted queries). A:4626–4641 READ.
94. No output depends on slot numbers (slot-renumbering test §13.1). A:4642–4645 READ.
95. Work limits instead of clocks (GEO-2): operation counts → `E_WORK_LIMIT`; identical on any machine. A:4646–4649 READ.
96. Commit record feeds invariants, index maintenance, display-list dirty set and incremental digest update; O(touched) cost-model test; never persisted. A:4650–4660 READ.
97. Derivation pool (J-K16): frozen base (J-K25) sent as transferred `ArrayBuffer`s (no `SharedArrayBuffer`), one overlay per district, scope check `E_SCOPE`, merge in district lineage order, pool size 0 runs the same path (identical digests by construction). A:4662–4732 READ.
98. Spatial indexes (SCL-2; J-K6): static flatbush partitions + dynamic uniform grid (`index.gridCellM`); route-edge items; no item changes in place (J-K34, tombstones); queries sorted by canonical key (vertex y,x; edge by its level-n route endpoints; face by first two level-≤n vertices); rebuild only at stage end, grid overflow > max(256, ¼ static), and pool freeze; flatbush 0.24 ms/1 000, 2.3 ms/8 000, 4.9 ms/17 000 items. A:4734–4794 READ.

### §3.4 Kernel operations — the complete list, and transient arenas (A:4795–5053)

99. Writers (the only writers of any arena): `insertChain` (mandatory|optional, closed, pinned indices, knots), `splitThrough`, `removeEdges` (ChainRef|EdgeSetRef|StretchRef|VertexRef), `clearFiner`, `retypeEdges` (with `rekey`, the EVO conversion primitive), `setOwner`, `splitFace` (bent cut 2–3 vertices), `connectHole`, `mergeFaces`, `absorbSliver`, `claimSubFace`, `radialSplit`, `ringBand`, `corridorUnion`, `bandUnion`, `warp`, `pinVertices`. A:4797–4836 READ.
100. Services (read-only): `resolve(ref, key: PlatKey)`, `resolveVertexAt`, `signature`, `sampleProfile`, `kerb`, `booleans` (union/intersection/difference/xor; nonzero/evenodd), `tileRings`, `buffer`, `offsetFace`, `insetRing`, `skeleton(rings, 'roof'|'spine'|'regions')`, `simplify`, `hexLattice`, `obb`/`hull`/`lir`, `sideRuns`, `sampleBoundary`, `pointLocate(key: ArenaKey, level, p)`, `faceNeighbours(key: ArenaKey, face, level)`, `area2`, `area2Big`, `orient`, `regularFit`. A:4837–4852 READ.
101. The doors: `insertChain` the only door for new plat edges; `removeEdges`/`clearFiner` the only doors for removal; `opts.knots`/`splitThrough`'s row the only doors for vertex role rows (plus `rekey`); `warp` the only door for moving vertices; "Every other writer is built from these, which is why planarity, `minEdge`, clearance and the kept-content rule are properties of this list rather than of every stage". A:4854–4866 READ.
102. `setOwner` and `retypeEdges` are §6.3's succession calls (geometry and address move together); `buffer`'s per-point widths only for transient chains. A:4868–4876 READ.
103. `regularFit` (item 45; J-A45.31): O(n), reads no arena, writes nothing; `dmath` trig; `E_DEGENERATE fit`. A:4878–4898 READ.
104. Stretches (J-K31): resolved at batch state; ends must be two vertices of one part, else `E_DEGENERATE stretch`. A:4899–4907 READ.
105. Arenas, keys and services (J-A12.32): every writer acts on the arena its `key` names; `pointLocate`/`faceNeighbours` take an `ArenaKey`; `resolve`/`resolveVertexAt`/`signature`/`sampleProfile` a `PlatKey` ("role references exist only on plats"); a slot from another arena is a programming error (debug build stamps slots with key and version); "A stage on one arena reads another through the services alone and never writes it". A:4909–4922 READ.
106. A layer's several arenas (item 65, J-A65.31; item 110 (b)): geometry passing over/under other geometry never shares its arena; underground systems and raised ways each their own part. A:4924–4940 READ.
107. "The kernel adds no operation for either: J-A12.32 holds across parts as between layers"; every entity's geometry lies in the one part its `Identity.key` names, except link records (`link_end`, `raised_foot`) whose ends each name a part; each part has its own index partitions, snapshot block and level digests under §6.2's per-arena `plats` node; re-deriving one part leaves every other byte-identical (§3.10 arena-isolation row) but for join vertices. A:4941–4959 READ.
108. Transient arenas (J-A28.31): for composition rungs (stage-3 `compose()`, plan storeys) — "a one-level scratch subdivision on the world lattice under §3.2's numbers, §3.6's insertion rules and §3.10's invariants, opened for one derivation call and gone at its end — or, opened by a view (an encounter, V14 §3.10), living while the view does, released by `encounter.close` and never at a derivation call's end (K9; file k item 609): an owner-less arena's `owner` is an `Id` of the form `view:<hash64>` naming no entity, the arena stays never persisted, digested or frozen, its seed is one ring and the model's faces enter as `fixed` rings (the forms below); the kernel's stub row (`API.md` §8) builds the form at M6-P, its first view owner is M-ENC's". A:4961–4966 READ.
109. `TransientKey = { transient: true; owner: Id (or `view:<hash64>` … "K1–K13 unchanged"); n }`; `ArenaKey = PlatKey | TransientKey`; `transientArena(owner, seed, fixed, workLimit)`; `readBack(key)` → faces (ring, holes, owner, fixed) and edges (a, b, left, right|'outside', seed side, joint); `release(key)`. A:4968–4976 READ.
110. Opening inserts seed then fixed rings as exact topology (shared lattice point one vertex; hot-pixel split; no attraction); refusals `E_DEGENERATE seed|fixed|overlap` naming the vertex (F-PLAN tier 1); `tileRings` seed clip for overlapping wings. A:4978–5000 READ.
111. Transient arena fixed edges: `mergeFaces` refuses (`E_STRUCTURAL`), `absorbSliver` never deletes, no writer moves a vertex there (`warp` not offered). Writers offered: `splitFace`, `connectHole`, `radialSplit`, `ringBand`, `mergeFaces`, `absorbSliver`, `setOwner`; services: `booleans`, `offsetFace`, `insetRing`, `obb`, `lir`, `sideRuns`, `skeleton`, `faceNeighbours`, `pointLocate`, `area2`, `readBack`, §14's `view`. **Not offered**: `insertChain`, `splitThrough`, `removeEdges`, `clearFiner`, `retypeEdges`, `claimSubFace`, `corridorUnion`, `bandUnion`, `warp`, `pinVertices`, `resolve`. No static partitions, no stage ranks, no kept content, no role rows beyond owners, no `PlatKey`, no entity; never persisted, digested or frozen; `readBack` in canonical order; opening O(seed vertices), "tens of vertices per storey; §12.7's stage-3 rows count it". A:5001–5019 READ.
112. INFERRED from 108–111: an encounter crop's transient arena, as the base defines it, can be cut only by face partitioners on a seed ring plus the model's faces as `fixed` rings; it carries no role rows, so no chain role (way, passage, …) can be written on it, and `resolve` is not offered on it. A:5001–5012 READ for the lists; the conclusion INFERRED.
113. Input sides are the arena's routes (J-A28.34); a re-cut is the same call (item 28 (f); J-A28.33): fresh arena from the same seed rings, kept rings as `fixed`. A:5021–5053 READ.

### §3.5 Failure classes closed (A:5054–5072)

114. Traceability table: each creator failure (collapsed edges, silent 2017 cut no-op, null OBB, coincident intersections, stale graph state, hourglass footprints, self-intersecting strokes, NG retries, boolean thorns, buffer steps, skeleton glitches, identity-keyed topology, allocation hot spot) mapped to its closing mechanism; the last "measured in M0". A:5056–5072 READ.

### §3.6 Insertion, contact and move semantics (A:5074–5313)

115. Attraction (GEO-3; J-K2): candidates (a) vertices/edges of level ≤ batch, (b) finer vertices on those routes where the chain ends/joins, (c) prepared vertices in a clear-region batch; five steps — snap and decimate; vertex attraction (onto endpoint if foot within `attractCm`); segment and stretch attraction (shared stretches gain roles); crossings by iterated snap rounding (≤ 3 passes, `W_SNAP_PASSES`), wedge routing only where the move ≤ 2·√2·attractCm ≈ 73.5 cm (θ ≥ 19.3°); local re-walk. A:5076–5141 READ.
116. Placement rule (GEO-3, GEO-35; J-K17): nearest lattice point within 0.71 cm of the route, ≥ minEdge from endpoints, keeping clearance; search never beyond `attractCm`; measured 200 000 crossings 0 short edges, ≤ 0.84 cm move. A:5143–5162 READ.
117. Same-level route changes may leave finer vertices up to ≈ 1.25–1.49 cm off (J-K32); only the index reads it. A:5164–5170 READ.
118. Existing geometry wins: an incoming vertex moves ≤ √2·attractCm ≈ 36.8 cm (or the step-4 corner bound); no existing vertex moves; an existing edge moves only its hot pixel; every created edge ≥ minEdge (measured 400 000 vertices, shortest 25.50 cm). A:5172–5187 READ.
119. Fidelity bound: a mandatory chain segment's committed route within 2·√2·attractCm ≈ 73.5 cm Hausdorff of the input; else refused. A:5189–5197 READ.
120. Chain classes: mandatory (coast, shore, bank, river, wall trace, arterial, band, kerb, plot lines, user-drawn) refused for precision only where no in-bound clearance-keeping route exists (`E_INVARIANT`); optional (growth proposals, optional lanes, decorative lines) also rejected with E_BELOW_MIN_ANGLE / E_BELOW_MIN_EDGE / E_SELF_INTERSECT. A:5199–5206 READ.
121. Clearance: a setback smaller than `minEdge` collapses to zero. A:5208–5210 READ.
122. Roles on shared stretches (GEO-4): one edge, several roles, never duplicate or overwrite; a re-given chain under a key that carries a run is that run (item 130 (e)); `absorbSliver` merges across partition-role boundaries only, else `residue` (`W_SLIVER_RETYPED`). A:5212–5224 READ.
123. `splitFace` contact semantics (GEO-6): exactly two boundary contacts by exact `orient2d`, else `E_NOT_TWO_CROSSINGS`; antennae count as boundary; outer-to-hole cut is `connectHole` (`E_HOLE_CONTACT`); children in canonical order, left of the directed cut first. A:5226–5243 READ.
124. Moves (GEO-10, GEO-35, GEO-5 (c)): `warp(field, fromLevel, region)` moves vertices of level ≥ fromLevel; a move batch keeps nothing (J-K27); held set (locked/pinned entities' geometry, deck/gate ends unless fromLevel 0, a raised way's part-0 feet, pinned vertices when smoothing, closure by level); slides on fixed routes (J-K18); re-seats (J-K17); order within a step (J-K30); split flag under moves (J-K26); whole-step validation with ≤ 8 global halvings then a reported no-op. A:5245–5309 READ.

### §3.7 Booleans, buffers and the kerb on the arrangement (A:5315–5443)

125. Decision (GEO-9, DEF-2; J-K4): booleans/buffers/insets/bands on the kernel's own arrangement; winding-number labelling; `round` joins ≤ 2 cm sagitta; outputs integer and produced by the same insertion rules; "on every host it is the same TypeScript code producing the same integers". A:5317–5333 READ.
126. The kerb defined once (GEO-20): `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)`; half-widths from the way's width profile, a sewer tunnel's `widthCm ÷ 2 + wallCm`, a gallery's `Gallery.widthCm ÷ 2 + Gallery.wallCm`; `corridorUnion` commits exactly this at L2; `kerb` is also a read-only service on an open overlay so S8's planned block and S9's committed block are one face. A:5335–5367 READ.
127. Insets: `insetRing` only for a face checked convex (`E_NON_CONVEX` else); `offsetFace` for per-edge distances; wall bands etc. by `bandUnion`. A:5369–5378 READ.
128. The same functions on every arena (J-A12.31): `kerb`, `corridorUnion`, `bandUnion` take the arena from `key` and a chain from its `(role, entity)` row — sewer part (`tunnel`), other underground parts (`gallery`, `chamber_wall` closed chains at L1, J-A65.32), a sky island and a raised part "need nothing of their own"; "No arena-specific band operation exists". A:5380–5401 READ. (This paragraph names no `site` part; the `passage` role row says `corridorUnion` reads a site's widths through the site kernel's `SpineWidths` callback, A:918 READ.)
129. Oracles not fallbacks (J-K19): Clipper2 (WASM, Node) and polygon-clipping are `@plat/testkit` dev dependencies only; B-FUZZ splits unattracted cases (equal face counts, sym-diff ≤ perimeter × 1 cm) from attracted cases (hard invariants, sym-diff ≤ perimeter × √2·attractCm). A:5403–5421 READ.
130. M0 confirmation: (i) differential correctness on 10⁶ fuzzed + constructive inputs per operation — 0 crashes, 0 invalid outputs (no fallback: a failure is a kernel bug fixed before M1); (ii) speed: S9's corridor bands over the CITY face set vs §12.4's S9 row and **one district ≤ 3 ms on reference hardware**, and S11's geometry share vs its §12.4 row on B-CITY-lite; pre-decided fallback if (ii) fails after one optimisation pass: Clipper2-as-WASM as the only engine on every host, a declared golden shift. A:5426–5446 READ.
131. No WASM kernel (DEF-13; J-K8): TypeScript on every host; M0 (a) measures per-op costs (S5 insert+snap+attract+re-walk per proposal, S8 `splitFace` per bent cut, band and S11 costs); miss > 2× → that loop gets a WebAssembly accelerator behind the façade; ≤ 2× → declared budget amendment; still missing → D-18 re-declaration for the owner's veto; accelerator must pass §6.5 (10) byte-identically. A:5448–5462 READ.

### §3.8 The straight skeleton (A:5445–5518)

132. Decision (DEF-3; J-K5): built in-house; never writes an arena; nothing stored; readers `roof` (downgrade plain roof), `spine` (downgrade sampled medial axis; label spines, S1 coast clamp, plan-rung room labels), `regions` (downgrade reflex pre-cut partition). A:5447–5466 READ.
133. Numeric contract (GEO-8): + − × ÷ √ only, bbox-relative; spur clean to a fixpoint; corner bounds 5° for `roof`, 1° for `spine`/`regions` (N-61 (7), item 130 (f)); event work limit 4·(n + r) + 64. A:5468–5482 READ.
134. Convex near-rectangles take the exact path (J-K21): convex, four OBB corners matched within 30 cm, area ≥ 0.97 of OBB. A:5484–5502 READ.
135. Post-condition validator (planarity, one face per input edge, heights within 1 cm, h cycles) → `W_DOWNGRADE`, F-SKELETON. A:5504–5511 READ.
136. M0 confirmation: §13.1 fixtures + B-CITY-lite corpus; pass 0 crashes, 0 validator failures, downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %, ≤ 20 µs median per footprint; fallback: downgrades become default paths, skeleton leaves the product. A:5513–5518 READ.

### §3.9 Geometry in the document (A:5520–5574)

137. One snapshot block per `PlatKey`, never per level: vertices (delta + zig-zag varint, birth levels, flags), edges (origin, destination, birth level), roles (incl. indexed/knot roles; no anchor contact names), faces (boundary half-edge, owner, kind, stage rank); no per-level digest stored; "An arena that holds only its outer ring writes its level-≤ 1 chunk alone and loads to that one face". A:5522–5542 READ.
138. Chunks: per arena one level-≤ 1 routes chunk + one per L2–L4 static-index partition; cross-chunk vertex references by lattice point (J-DET-36). A:5544–5563 READ.
139. Load: rebuild next/prev by exact angle sort, re-walk faces level by level, recover parents, rebuild role reverse index and static partitions — O(E log d), deterministic; failure → corrupt cache → replay; fallback lazy partition rebuild. A:5565–5574 READ.

### §3.10 Kernel invariants (A:5576–5615)

140. Hard rows: lattice/range at `snap`; no edge < minEdge (any writer); clearance; one vertex per lattice point; faces simple except antennae, no two edges cross; nesting; placement bound (incl. transient arena fixed-edge form); level consistency (item 130 (c)); held vertices; prepared contacts; kept content; role consistency; stored references resolve (stage end, save); frozen base complete; index levels and freshness; pool scope; arena isolation; seed tiling on a transient arena; soft-for-mandatory `minFaceAngle`; Euler characteristic per level (CI). A:5578–5600 READ.
141. The arena-isolation row lists "the ground and each raised part of the ground layer, each part of the underground layer, each sky island" — it names no `site` part. A:5595 READ. (INFERRED: a site part, being a `PlatKey` arena, falls under the row's first clause "a batch wrote only the arena its `key` names", which is not layer-specific.)
142. Batch-local checks cost O(touched), never O(model) (SCL-1); whole-arena checks at stage end, save or CI. A:5602–5607 READ.
143. Nesting admits no exception (J-A30.31): passages are L3 faces; rooms are never plat faces (transient arena), "so no clicked building's plan enters an arena, an index partition or the model digest". A:5609–5615 READ.

### §3.11 The kernel at its limits (A:5617–5632)

144. Limits table: no input; one item; the caps (range, workLimit, skeleton events, ≤ 3 snap passes, ≤ 8 halvings, closure ≤ 4 rounds, area2 flush, rebuild threshold, the largest arena METROPOLIS at the cap "whose frame grows no further"); degenerate geometry; missing/contradictory data ("the kernel reads no dossier field"); "every rung, THORP to the METROPOLIS cap — one kernel with no rung-specific number"; every toggle and preset ("the kernel reads no toggle, preset or style"); save/load/undo/redo/regenerate/migrate ("only the arenas persist … transient arenas and skeleton output are never stored"). A:5619–5632 READ.
145. The limits table's largest arena is METROPOLIS at the cap (≈ 17.53 km × 8.76 km + margin, A:4371–4374); the range invariant is 83.9 km (A:4369). INFERRED: a single plat arena cannot hold a frame wider than ≈ 167 km edge to edge (|x| < 2²³ cm each side of the centred origin); any world-scale geometry larger than that must live outside one plat arena (e.g. rasters or another frame) — the base text itself says nothing about a world-scale arena. A:4365–4376 READ for the bound; the consequence INFERRED.

### §4.1 Stage graph, laziness, the worker (A:5644–5860)

146. The stage graph S0 Blueprint → S1 Site → S2 Programme → S3 Siting/reservations/trace → S4 Backbone → S5 stages (S5a–d) → S6 Districts → S7 Wall strips → S7b Allocation → SKY (staged) → S12a Hinterland siting → S8 Infill → S9 Corridors → S10a Block allocation → S10 (0) shared-edge bands → pooled S10/S10b/S11/S12b → S12c Character → S13a Names → S14 Display list → S15 Simulation → the tail (underground, staged). A:5646–5667 READ.
147. Hooks S7c/S9b (stage 2, M5), SKY (V05, M6-sky), way-surface rule (M2b), the tail (M6-U): "Before its milestone each is absent and the stages around it are unchanged". A:5669–5671 READ.
148. Registration (COV-VG-VN-002): each stage registers a `StageDecl`; the pipeline is the DAG of declared I/O, topologically sorted with stage id tie-break; cycles a registration error at load; "A product registers its own stage set (`ProductDecl.stages`, §4.12)". A:5673–5679 READ.
149. Op forms: callback for S5c, S8, S10 (and S6, S7b, S12b, hinterland unit); declared for S3, S4, S5a, S5b, S7, S9, S11, an edit's inserted feature. A:5679–5682 READ.
150. SKY's data keys (`reservations.landing`, `allocations.landing`) and the `raised` data key with `RaisedRead` (derived on read, never stored) show the pattern by which a staged layer adds keys without moving the base order. A:5682–5706 READ.
151. Why this order: water before roads; programme before layout; large claims before streets; walls before streets; districts before infill; raised parts before S7b (1). A:5708–5724 READ.
152. Laziness contract (LC-2, FTG-1; J-P9): a stage may run lazily for a scope only if its output is a pure function of eager upstream state and the scope's own sub-streams, reads no other scope's lazy output and writes nothing outside the scope; content-deciding stages are eager and town-wide; any derivation order gives the same model (derived-complete digest test §6.5 (9)). A:5725–5743 READ.
153. One-click first map is the complete city LOD (SCL-4): S0–S13a eager for every district and the hinterland; laziness only for what the city band does not draw (incl. stage-2 close-up detail and stage-3 compositions). A:5744–5751 READ.
154. Quality budget (item 119; J130): a slower quality path only where a `perf.qualitySpend` row names it (shipped empty), within ten seconds total of one-time waits. A:5752–5761 READ.
155. The tail (V04; M6-U): `phase: 'tail'` stages run after the first map, eagerly and serially on the generation worker, writing no ground geometry except the reconcile stage's uses; digests finalised after them; `timings.tail`. A:5762–5769 READ.
156. Per-stage batch table: each writes one level; L0 written by S1, S3, S4, S5b (extra bridge), S5a (outer moat); L1 by S3, S4, S5, S6, S7, S7b, SKY, S8 and no generation stage after S9 (J-P46); village rungs' VS stages likewise; SKY writes "on the island's key". A:5770–5803 READ.
157. Generation worker + derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`); frozen copy ≤ ≈ 15 MB at CITY; hinterland unit on the generation worker; "Other units of the same kind: each sky island's districts run as a unit … on the island's own arena … and a standalone neighbourhood document runs this pipeline on its own outline (V01 §3.10)". A:5805–5830 READ.
158. Elaboration by click (item 28; J-A28.41/42): the `elaborate` view key decides only the moment a pure rung is derived; rungs outline → wings → rooms → plan; a derived rung is saved, then stale until clicked. A:5839–5853 READ.
159. Declarations read ahead (item 101; J-A101.41): a skeleton file's drawn declarations are read ahead by the stage owning their subject; "one seed replays it byte for byte". A:5854–5871 READ.
160. §4.1 names no world stage, no site stage and no encounter stage; it names the village rungs (VS1…), SKY, the tail and the hood document as other stage sets/units. A:5646–5871 READ (absence noted by reading the whole section).

### §4.12 Strategies, registration, products (A:9688–9743)

161. Every layout stage runs behind a strategy in `StrategyRegistry` (Terrain, Coast, River, Manifest, Network, Enceinte, Fabric, Plot, SitePlan, BuildingGenerator, Evolution, PlacementSolver, DesignationMutator); a product (`ProductDecl`, V07 §2.1) registers in `StrategyRegistry.products` (item 202); a product may register another implementation of any of them by name. A:9690–9697 READ.
162. `StageId` comments: "a product's stage (V07 §3.0; the world's W0 … W9 and the site's G1 … G8, E1 … E4, R1 … R4, §6.1), a tail stage (II.7; V04 §3.1's U-NET … U-LINK) — the stream keys' stage component (§6.1)". A:9700 READ.
163. `StageDecl { id, inputs, outputs, streamKeys, invariants, ladder, workLimits (laws over the batch scope's population-derived counts), budgetMs (reporting only), batch, lineageUnit, lazy, txForm, phase? }`. A:9701–9702 READ.
164. `txForm: 'declared'|'callback'|'records'` — "'records': a stage that writes records and rasters and no arena — no kernel transaction, no K12 entry; the world's own `WorldCommitRecord` stands in (V13 §3.0); file k item 611". A:9703 READ.
165. "`ProductDecl` (V07 §2.1) carries `coordinateRegime: 'frame'|'world'` (V13 §2.1), read by the view's transform and the exports; the `site` product's G- stages register by declared I/O in `@plat/layout`'s registry with the concern `site` (§6.1)". A:9703 READ.
166. `StageHookDecl` (host hook points `S7b.afterGreedy`, `S10a.afterDrivers`); `DataKey` strings ('terrain', 'water', … 'raised'). A:9704–9706 READ.
167. `Destination.kind` admits `'worldSite'` "for S4 after adoption only — the adopted site's gate as a frame-scale destination inside the settlement's frame (V14 §3.9 (e)); V13's siting reads the card's `attraction` and `routed`, never a destination (C14-04)". A:9718 READ.
168. Pipeline order is the topological order of the routed product's stage set, "so a product may add a stage by registration alone"; every district's `SeamContract` complete from milestone 1 (G-P1). A:9731–9736 READ.
169. Owner-staged layers (SKY; tail U-NET … U-LINK) register the same way "and the base registers none of them". A:9738–9742 READ.

### §4.13 Edges and meeting points (A:9744–9801)

170. Every stage commits through kernel transactions; degenerate results go to the stage's failure class, never a whole-map retry; edge suite B-EDGE rows EP-01…EP-27 (hard, 0 per 1 000, every rung named and every preset) and the combination suite (raised way, retaining wall, deck plot, frame × cliff, water, harbour, wall, bridge, square, hinterland, oasis, plots). A:9746–9801 READ.
171. No EP row and no combination cell names the world, a world site, an encounter or a 2.5D view. A:9753–9801 READ (absence noted by reading the whole section).

### §5.3 The invariant suite (A:9968–10059)

172. Every invariant declares a scope — batch, stage, save, load, ci; an edit's dry run evaluates batch-local and stage-end rows once on the scratch overlay and the commit reuses it; chained-batch edits evaluate batch-local rows once after the chain's last batch. A:9970–9983 READ.
173. `Invariant { name; scope; class: hard|soft; kind: classFloor|check; faceClass?; check? }`. A:9985–9993 READ.
174. The basement row reads `waterTableAt(doc, p, constructionWeek(building))` (V13 §3.13.5; `constructionWeek` a derived reading in `@plat/model`); "a present-week violation under a lawful `setSurface` or placement is a `lockedBelowTable` report in the cascade's change list, never an invariant failure (item 137 (c))". A:10001 READ.
175. Staged-layer rows: "the underground stages write nothing on the ground `PlatKey` and each only its own system's part and the far `link_end` vertices … (CI-only cross-arena write count)"; sky rows ("no raised part with an endpoint, a deck or a source on a sky arena"). A:10014–10015 READ.
176. No row of the suite names the world, a site part, a world site's levels, or an encounter. A:9995–10052 READ (absence by reading the whole table).
177. Cost rule: O(touched faces × log n), never O(model); per-edit validation flat TOWN → METROPOLIS within ± 20 %; fallback moves a row to stage-end; "a row whose subject a rung lacks … holds vacuously and reports its count as 0". A:10054–10059 READ.

### §6.2 What a seed determines, and the model digest (A:10403–10574)

178. `model = G(outputVersion, base, log)`, a pure function; nothing else reaches the model — no wall clock, no host text engine, no viewing order, no worker timing, one boolean/offset engine per output version, no host code, no installed pack, no machine preference, no host seed, no pointer, no session seed. A:10405–10431 READ.
179. Two machines produce identical model digests (O2 a); two renders pixel-identical at a given backend, DPR and style version. A:10433–10435 READ.
180. Model digest = Merkle digest over the **eager model** only; lazy content (close-ups, people, stage-3 compositions) enters when an edit materialises it. A:10437–10439 READ.
181. Root per layer: `site` (terrain raster, fields, L0 water), `network`, `districts`, `hinterland`, `content` (… the staged ConditionOverlay, DepositSite and PowerRelation records — empty in the base), names/labels, `closeups`, `underground`, `sky`, `identity`, `plats` (per arena and per level, the kernel's level digests). A:10441–10456 READ. (The tree as written names no world node, no world-site/`site`-layer record node and no encounter node; the `site` node here is the settlement's S1 site — READ; that a world site's parts would hash under `plats` "per arena" is INFERRED from A:4955–4957 and A:10456.)
182. Geometry hashed once, by the kernel, per level over each arena's level-n route; integers as 32-bit lanes, doubles as IEEE-754 bits (−0 → +0, NaN refused), strings UTF-8; no text serialisation on the digest path. A:10458–10468 READ.
183. H128 = MurmurHash3 x86 128-bit, seed 0, own implementation tested against published vectors. A:10469–10471 READ.
184. Excluded from the model digest: provenance, derivation/naming records, `laidAt`/`courseAt` (records digest), `style`, `view`, `derived`, `hostContent`, `dossier`, telemetry, lighting, label placement, unedited close-ups. A:10472–10481 READ.
185. Maintenance O(touched × depth) at each commit; tree built by generation or by the load's one full recomputation. A:10482–10489 READ.
186. Records digest: second Merkle tree over derivation/naming records and order fields; leaf encoding belongs to the file schema, not an output version; recomputation ≈ 4 ms CITY / ≈ 11 ms METROPOLIS "PLAUSIBLE until M0 (d) times it in the engine". A:10490–10506 READ.
187. Bars (M0 d, decided before any golden is signed): digest maintenance ≤ 5 % of each batch's own time at CITY; root finalisation at a stage end ≤ 5 ms at CITY; full recomputation ≤ 150 ms at CITY (records tree included); measured ≈ 31–34 ms CITY, ≈ 95–101 ms METROPOLIS "PLAUSIBLE until M0 (d)"; fallbacks (i)–(iii), none moves a golden. A:10507–10539 READ.
188. Histories, not states (item 22 (c); J-A22.71): the map is a function of seed, ordered dossier history and edits; draws keyed by plots touched and `seq`, never dossier values. A:10541–10553 READ.
189. Works, LightSource are model data; character vector and band range recomputed, never hashed. A:10555–10565 READ.
190. The elaboration cache is outside both digests (item 28 (c); J-A28.62): a click logs nothing. A:10567–10583 READ.

### §6.3 Identity (A:10576–10839)

191. The namespace segment (item 140 M1; V13 §2.5; file k item 616): every address carries a leading namespace segment — eight base-32 characters of the first 40 bits of `H128(docId)` at creation, kept on clone and save-as — "so two documents merged into one package never collide (V13 Part E bar 7); a reference form without the segment resolves inside its own document (the base's forms unchanged), with it across documents (V14's `SiteReach`, the world's `Placement.subject`; a document's own references, the anchor's among them, stay bare — V14 §2.8); adoption rewrites the segment to the settlement's (V14 §3.9 (e)). The segment is minted at creation from M1's API pass and read from `docId` on an older document at load (§7.5)". A:10580 READ.
192. Lineage key = (arena key — layer and part —, derivation unit's lineage hash, stage, creation epoch, creation index, reroll[, dup]); derivation units per stage listed. A:10582–10598 READ.
193. `EntityKind` includes "the world's lineage units 'placement' and 'territory' (V13 §2.5; §2.8's world rows)". A:10601 READ.
194. Address id = `kind:token`, prefixed `<layer><part>/` outside the ground layer (sky2/, under/, under3/); a part number never reused; token = base-32 of lineage hash (13 chars) or hash of creating event's `seq` and ordinal. A:10604–10611 READ.
195. Never reused; one collision rule (`~k`, `dup`), resolved in canonical order. A:10612–10621 READ.
196. Carry-over: survival (not re-derived), succession by anchor within the kind's hysteresis radius (`carry` event; `setOwner`/`retypeEdges` re-own geometry), tombstones with `supersededBy`; lifecycle events only for changes (J-DET-2). A:10622–10651 READ.
197. Names follow the address; S13a draws a name only in five cases; case (4) renames confirmed like fates. A:10652–10701 READ.
198. Anchor table includes world kinds: reach (V13 §2.5; from M-W1: course overlap ≥ 50 % within one fine cell), territory (its seat), placement (its subject), water surface (its body and date), world route (its ends), and "the world site's card and anchor (V14 §2.8; from M-SITE-A) — V14 §2.8's lineage parents: the card is a site document's town root". A:10733–10739 READ.
199. Matching routine: point-anchored kinds via uniform grids, overlap-anchored via the kernel's spatial index; budget ≤ 2 µs / ≤ 20 µs median; measured 0.59–0.60 µs; "Measurement (M0 d, then M1 …): the routine inside the engine, on real anchors, per kind"; fallback per-partition matching (declared shift). A:10748–10768 READ.
200. JOIN/SPLIT continue lineage (item 31 (c); J-A31.73); plan damage one threshold per element (g item 123; J136); dossier bindings never re-key (item 74). A:10769–10822 READ.
201. Document identity: `docId` UUID; addresses document-scoped; at the API and bridge boundary every id rendered `<docId>/<id>`. A:10823–10827 READ.
202. Workers merge in lineage order, never arrival order. A:10828 READ.
203. Scope of stability (O2 b, e) 1–4; measurement M0 d and M1: 0 duplicate ids, 0 silent re-binds. A:10830–10839 READ.

### §6.4 Version axes, permalinks, retention, goldens (A:10841–10907)

204. Version axes: output version `o<k>` (bumps exactly when a release declares a shift); generator version (informational); schema version; preview flag (before o1, fixed at M4's exit); table versions pinned by version and hash; pack versions by id, version, content hash; style version (pixels, never the model digest). A:10843–10860 READ.
205. Permalinks: `?o=&s=&z=`, `&r=` deflated CBOR recipe delta, `&l=` log, `&st=`; emitted only when the link can rebuild the same town on any machine (shipped packs, base is the recipe, empty `hostContent`, ≤ 2 000 chars). A:10862–10891 READ.
206. Retention: browser ships current + N−1 + N−2 output versions; outside → frozen view; CLI replays any version; measurement M3a ≤ 150 KB gzipped per retained version. A:10893–10903 READ.
207. Goldens: stage-isolated goldens on frozen upstream outputs; cascade records for end-to-end; §13.3 builds the tooling from M1. A:10905–10907 READ.

### §6.5 Floating-point policy, lint, determinism tests (A:10909–11039)

208. (1) Topology is §3.2's; (2) fields, costs, weights IEEE doubles, + − × ÷ √ exact, every other real function through `dmath` (vetted fdlibm port; D-23). A:10911–10913 READ.
209. (3) The lint is an allowlist of `Math` members (abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround); `**` only with literal exponent 0–4; forbidden `Math.random`, `Date`, `performance`, timers, `crypto.getRandomValues`, DOM, locale ops, comparator-less sort, Map/object order beyond insertion; scope covers model packages and digest-reaching view code (labels, ObstacleSource, RoleIndex, S14 column writers, §8.10 instance function, CPU light pass, weather timeline); the dossier-key scan. A:10914–10938 READ.
210. (4) Vendored dependencies scanned; (5) total-order comparators; (6) pool workers by overlay-and-merge; (7) one boolean/offset engine per output version on every host (D-14); (8) host providers double-run checked and recorded in `hostContent`. A:10940–10953 READ.
211. (9) Determinism tests (CI), one fixture per base rung plus METROPOLIS at the cap: cross-host (Node x86/arm64, Chromium, Firefox, WebKit; workers on/off; pool 0–3), time dilation ×10/×0.1, derived-complete digest, op-order, placement digests, headless = UI, replay = session (model + records digests), truncation identity, links without inputs, checks under the recording version, provider double-run, click-order identity, history determinism, epoch keys, session-history independence, dossier fixtures, works stages, lighting, plan damage, weather timeline, skeleton round trip. A:10954–11029 READ.
212. (10) Second implementations: WASM accelerator byte-identical per-stage digests; Clipper2-WASM a different engine, declared golden shift. A:11030–11039 READ.
213. §6.2–§6.5 name no determinism test of a world document, a world-site document or an encounter view. A:10403–11039 READ (absence by reading the whole range).
