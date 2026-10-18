# m0-coverage / read-base — what the base (docs/ARCHITECTURE.md) promises the kernel and the three levels

**Lane:** m0-coverage/read-base (opus; J394, Fable-validated). A reader: this record judges nothing. It records what the
base text says, each fact with a cite and marked READ (seen in the text) or INFERRED (my reading of what the text
implies, flagged as such). Started 2026-10-18 09:14Z; cites re-verified against the file by `grep -n` at 09:23Z.

**Files read** (at read time):

| file | lines | md5 | read whole |
|---|---|---|---|
| docs/ARCHITECTURE.md | 24462 | 1f871a01961de8a4994125d7bb1993be | §2.1 (533–587), §2.2 (588–956), §2.3 (957–1087), §2.6's `Heights` (1331) and *Heights and the ground datum* (1710–1748), §2.9 (3844–4280), §3 whole (4281–5643), §4.1 (5644–5860), §4.12 (9688–9743), §4.13 (9744–9801), §5.3 (9968–10059), §6.2–§6.5 (10403–11039), §7.3 (11641–12015), §12 (17749–18449); then every line the nine greps hit outside those ranges (218 lines, `scratchpad/m0-coverage/greps-raw.txt`), each world/site/encounter/2.5D/transient-arena passage read with its paragraph: §0.2 (151–158), §1.1's table and router (296–312, 384–392), §2.5's `worldSite` reservation (1170–1171), §2.6's water table (1916), §2.7's staged records (3537), §2.8's registry rows (3778, 3825), §4.2 S1 (5917–5923, 6047), §5.2's rows (9963–9964), §6.1 (10160–10182, 10330–10333), §7.1 (11056, 11126, 11163–11170, 11451), §7.4 (12090–12091, 12116), §7.6 (12435–12438), §7.7 (12630, 12780–12783, 12898), §8.1–§8.8 (13273, 13423–13424, 14469, 14472, 14532, 15173), §9 (15739, 15944, 15974), §11 (16861–16864, 17009–17068, 17114, 17223, 17381), §13.1 (18630–18637), §14 (20884–20960, 21032–21044, 21082–21090), §16 (21661–21719), II.7.4 (22824–22828), II.7.6 (23172) |

Cites are `A:<line>` in docs/ARCHITECTURE.md. A range is the passage the fact is drawn from.

## Facts, in the order found

### §2.1 Layers, coordinates, units, ids (A:533–587)

1. Every model length is an integer number of centimetres (`i32`), the world centred on (0, 0), +x east, +y north, inside the arena frame of §3.2 (9); heights are centimetres; centidegrees (`Cdeg`, i32) are the one model angle unit; a schema lint refuses a length field without its unit. A:535–540 READ.
2. One `Unit` vocabulary for every table column, metric and field; V11 `ColumnSpec.unit` and V12 metric `Unit` are named subsets. A:541–553 READ.
3. `layer ∈ {underground, ground, sky, site}` is a field on every geometric entity and display-list item, with `z: i32` and `elevationCm: i32`. A:554–555 READ.
4. `site`: "a world site's levels, one part per level numbered by `Document.nextSitePart` from 1 (no part 0), addresses `site<n>/kind:token`, the level mapping §2.2 rule 1's underground mapping, drawn by §8.4's underground view on its own `LayerSpec` (file k item 624); the kernel's `Layer` type (`types/ids.ts`) **appended**, K1's append-only test the bar (V14 Part E bar 1, T-V14-32); the value is appended at M1's API pass and its parts exist only from M-SITE-A (V14 §2.1)". A:556–559 READ.
5. "The base populates only `ground`; `underground`, `sky` and `site` — and every staged record of §2.7 — are schema-complete and empty until their staged stages run" (II.6, II.7; volumes 4, 5 and 14). A:560–562 READ.
6. "Layer" unqualified means one of the four model layers; display groups are never a further model layer. A:562–564 READ.
7. Arena parts (G-R11): each layer has its own arena or parts keyed by `PlatKey`; ground part 0 plus one part per raised-way deck from 1; underground part 0 plus one per system; one part per sky island; every part number allocated once at creation and never reused; `nextUndergroundPart`, `nextSkyPart`, `nextGroundPart` and `nextSitePart` never decrease (the number is part of keys and addresses, §6.3). A:565–574 READ.
8. Whether a layer exists is decided by what the model holds, never by visibility (item 14). A:575–577 READ.
9. Ids: every entity has an address id `kind:token`, prefixed with its arena outside the ground layer (`under/`, `under<n>/`, `sky<n>/`; `site<n>/` per fact 4); in memory interned `u32` handles; the parent a field, never parsed from the id; no record outside the kernel stores an arena slot. A:578–587 READ.

### §2.2 The plat (A:588–956)

10. `Cm` integer cm, a number becomes an arena coordinate only through `snap()` (§3.2 (7)), in every build; `Level = 0..4` (L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots + residue · L4 footprints + yard parts). A:592–593 READ.
11. `PlatKey = { layer; part }`; "site parts ≥ 1 = one arena per level of a world site (V14 §2.1), numbered by Document.nextSitePart, round-tripping as any part (K2 unchanged; a site part's level mapping is rule 1's underground mapping)". A:594 READ.
12. `Plat`: typed-array vertices and half-edges (twin = h ^ 1), `roles: RoleTable`, five `LevelFaces`, five `LevelIndex`, `indexHome`, `version` bumped by every committed batch; `frame` set at creation, grown by an epoch's upward rung crossing, never shrunk below protected content by a Re-derive. A:596–609 READ.
13. `LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500; rangeCm: 8_388_608 (2²³) }`; the lattice is fixed for the arena's life, its range bound taken at the population cap and the extreme aspect. A:599, A:610 READ.
14. `RoleHeadTable`/`OwnerTable` are typed-array open-addressing hash tables (load ≤ 0.5, backward-shift deletion; J-K22); "nothing iterates a table — so its layout never reaches an output". A:619–623 READ.
15. `LevelIndex`: static `PackedIndex[]` partitions (one per arena at L0–L1; one per district + one outside at L2–L4), a dynamic `UniformGrid`, per-partition tombstones. A:624–628 READ.
16. The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry: `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef` (batch-local, never stored), `LatticePoint`; `VertexSig`; `ChainProfile<T>` (knot role, values, `linear`|`step`; never a vertex-indexed array). A:631–643 READ.
17. Rule 1: everything with a boundary is a face, everything linear an edge chain. Ground L0 land and water only — terrain contours and drainage lines are raster products, never plat edges; L1 spines, walls, setbacks, shores, border, perimeter, district boundaries; L2 by `corridorUnion`; L3 plots, courts, passages, bands, hinterland furlongs; L4 footprints and yard parts. A:645–670 READ.
18. "The other arenas take the same five views with their own meanings": underground part 0 (rock; `tunnel` chains; bands; frontage plots; buildings flush on the kerb); a further underground part (rock face bounded by the ground's frame + margin; `gallery` centrelines and closed `chamber_wall` chains at L1; gallery bands by `corridorUnion`; plots; buildings under `Chamber.ceilingCm`); a sky island part in its own local frame (rim; void face kind `sky`, never cut or plotted); a raised ground part (outer ring, one spine, its corridor band, no L3/L4). A:672–699 READ. Rule 1 lists no `site` part; a site part's mapping is stated only as "rule 1's underground mapping" (A:557, A:594) READ.
19. The underground and the ground never share topology; two parts never share a vertex; a cross-part link names one vertex in each (`UndergroundLink`'s `link_end`; a raised way's `raised_foot`); two systems crossing in plan without meeting are two parts. A:701–705 READ.
20. Rule 2 (J-K1): one arena per `PlatKey`, the five levels its views; each edge carries its birth level; nesting by construction, checked by index (§3.10); separate arenas never share topology, cross-arena links are entity ids, each end naming at most one vertex in its arena. A:706–717 READ.
21. Rule 3: finer levels never move coarser geometry, except `splitThrough`'s Steiner vertex (≤ half a lattice diagonal, 0.71 cm); the level-n route; promotion (J-K11); dissolution; the `split` flag; demotion (J-K28) with steps (a)–(c) and split restoration (100 000 of 100 000 random routes, `fixall_kernel_r4_checks.out` A). A:718–791 READ.
22. Rule 4: edges enter only through `insertChain`; faces never re-walked globally. A:792–795 READ.
23. Rule 5 (J-K3, J-K9): topology by index; no record outside the kernel stores slots and no entity record stores a vertex position (except a building's wing rings, stored stage-3 composition and plan rings and tower centres); references by role resolved by `resolve`; stretches by `StretchRef` (J-K31). A:796–838 READ.
24. Chain attributes are knot profiles (J-K10); cut and join by `retypeEdges`' `rekey` with cut knots (J-K23; ≤ 6.8 × 10⁻¹³ cm over 20 000 random ways); stretch-state profiles (canonical form, write, read by `sampleProfile`, regenerate by `retaining.settings.stateSnapCm`, undo, migrate). A:827–888 READ.
25. Positions in the log (GEO-5 (b)): `moveVertex` stores `LatticePoint` + `VertexSig`; replay `resolveVertexAt(key, at, sig)` binds exact, then nearest-by-signature within the rebind radius, else orphaned — never by distance alone. A:889–898 READ.
26. Rule 6: refinement is a pure function `L(n+1) = refine_n(level-n view, params, streams)`, streams keyed from the scope's lineage. A:899–901 READ.
27. Rule 7: the role registry is a versioned data table; the edge row includes **`passage`** — "structural, non-indexed, on `site` parts: the tunnel role's twin, its half-width answered by the site kernel's `SpineWidths` callback — `passage.widthCm[widthClass] ÷ 2 + wallCm`, V14 §1.1 — so `corridorUnion` reads a site's widths as the sewer's; `chamber_wall`, `access_point`, `link_end` and `margin` are reused on `site` parts; appended without digest change, K5, read only from M-SITE-A; file k item 602". A:909 READ.
28. The vertex row includes `access_point`, `link_end`, `raised_foot`, `sky_access` and the indexed knot roles. A:910 READ.
29. Structural roles are never removed by sliver absorption or face merge; coincident features are one edge with several roles; the deck; anchors, contact names and gate ends (J-K29). A:912–938 READ.
30. Rule 8: every committed batch validates its declared invariants, writes a report and a `CommitRecord`; a failed batch leaves the arena at the previous `version`. A:939–940 READ.
31. *Size*: one arena at CITY ≈ 80 k vertices, ≈ 240 k half-edges, ≈ 12 MB "(PLAUSIBLE until M0)"; the index 38.4 B per item, ≈ 7–8.5 MB at a finished CITY "(PLAUSIBLE until M1)"; the generation worker's arena with its index ≈ 19.5–21 MB. A:942–956 READ.

### §2.3 Terrain and water (A:957–1087)

32. `Terrain` is keyed by `PlatKey` ("the ground, or one sky island's own terrain"); height raster over frame + margin. A:960–961 READ.
33. `Terrain.datumCm`: "the world datum (V13 §2.1); one per document (per island for sky terrain); set by S1 (§4.2) and by nothing else — a placement never writes it; READ ONLY THROUGH `datumOf(doc)` (item 140 M3; V13 §2.2), which on a placed frame answers the world's DEM at the placement's origin read through `Document.worldRef` at call time, a derived reading (C13-01)". A:962 READ.
34. `heightCm: Int32Array` above datum; `reliefLimitCm` 1 000 000 (10 km), every write checked. A:963 READ.
35. `hydro` raster with `flowDir` (D8 on every land cell of frame and margin), `flatRank`, `flowAccum`; `outfalls` per 50 m bank stretch or frame edge. A:964–967 READ.
36. `wind`: S1's write, "read only through `windOf(doc)`, which on a placed frame answers the charter's wind in frame terms through `worldRef` (V13 §3.11.5)". A:968 READ.
37. `carveDeltaCm: Map<number, Cm>` (item 140 M2): per hydro cell the depth S1 (3)'s carve cut; `preCarveHeightAt(doc, p) = heightAt(p) − carveDeltaCm[cell(p)]`; empty on a document saved before V13. A:969 READ.
38. `surfaces: WaterSurface[]` (item 140 M2): one surface per WaterBody at generation plus every dated surface; "never carved into the heightfield (V13 §2.2, V13 §3.12.1)". A:970 READ.
39. `groundwater: GroundwaterField` (item 140 M4): read only through `waterTableAt(doc, p, when?)`; "the record forms `WaterSurface` and `GroundwaterField` are V13 §2.2's — the three fields are declared at M1's API pass and read as absent until M-W0h's steps write them". A:971 READ.
40. `geology` and `mining` are read only by II.7.6's cavern rule. A:972–973 READ.
41. `HydroGrid.cellCm` TOWN 1 600, CITY 2 500, METROPOLIS 3 200, kept through frame growth. A:975 READ.
42. `TerrainSampler { heightAt (bilinear; the 2.5 m refinement on demand, never stored); slopeAt; flowAt }`. A:987–988 READ.
43. Height raster by size class TOWN 5 m, CITY 8 m, METROPOLIS 10 m over frame + margin; an epoch's frame growth extends every raster by whole cells keeping `cellCm` (J-A81.31). A:1006–1011 READ.
44. The hydrology grid (J-K12): 16 / 25 / 32 m, 200² / 320² / 400² cells; integer flood; measured CITY 15.9–17.2 ms, METROPOLIS 25.3–26.5 ms, TOWN 6.2–7.0 ms; its pre-decided coarsening is §12.4's M0 site-and-fields fallback. A:1013–1024 READ.
45. Heights (GEO-15; J-K7): Int32 cm relative to the per-document datum; every height or depth raster write range-checked, clamped and reported (`W_HEIGHT_CLAMPED`), never wrapped. A:1026–1030 READ.
46. Flats: priority flood keeps exact flats; two-gradient flat resolution into `flatRank`; D8 ties in fixed order E, NE, N, NW, W, SW, S, SE. A:1032–1036 READ.
47. Terrain is not in the plat; contours per render tile and export; drainage queryable per `hydro` cell; "A sky island's terrain is its own `Terrain` with its own key, datum, frame and `hydro` grid". A:1038–1044 READ.
48. Slow change (item 25): `siltReach`, `reclaim`, `shiftCourse`, `digCanal`, each a lifecycle event `convert:<kind>`. A:1067–1087 READ.

### §2.6 Heights and the ground datum (A:1331, A:1710–1748)

49. `Heights { baseCm (ground datum); floors; floorsBelow? (derived); eaveCm; ridgeCm; towerCm? }` — the owner's HEIGHT ruling: always populated. A:1331 READ.
50. Every building, wing, tower, keep, wall run, gate and bridge carries heights; one per-entity function `deriveBase(entity, sampler)` computes every ground datum, called by S11, S7, S1's terrain operator and the edit layer after a warp or vertex move. A:1710–1713 READ.
51. A ground wing's `baseCm = max(samples) + plinthCm` (default 30 cm), sampled by `levelledGroundCm(doc, key, p)` on the arena `key` its plot lies on, with the `terrace.wallBandCm` (250 cm) retaining-wall rule; a wing on a deck takes the deck's surface; a stacked building by `rebaseStack`. A:1714–1737 READ.
52. The fall under a ground wing is a foundation skirt; a row footprint whose fall exceeds `skirtMaxCm` (300 cm) splits into stepped wings; walls store base as a knot profile; shadows and the 3-D export read the same numbers. A:1738–1748 READ.
