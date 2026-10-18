## §8 Rendering and the style system

*In plain words.* The town becomes one list of drawing instructions that every output uses — screen, SVG, PNG, print and
3-D. A style sheet is a data file saying how each kind of thing is painted, so one town can look like MFCG's clean ink
map, FTG's lit textured map or Neighbourhood's hatched close-up, and a new look is a file, not code. At city zoom the map
reads like MFCG's although our blocks hold plots and yards: blocks get their own ground tone so streets and squares are
the only paper-coloured gaps, walls, towers and gates are drawn at a legible symbol size (the model keeps their real
sizes), and houses too small to see merge into masses. Zoom uses a pyramid of picture tiles, so lines stay crisp; trees
keep their places at every zoom and can be moved one by one. One renderer (the browser's 2-D canvas) draws every look,
so screen, PNG and print agree. Layers and heights are the hooks for the staged sewers and floating islands (§8.4).
Receipts named `fixall_*.out` are in `docs/validation/bench/`.

### 8.1 The display list (renderer-independent, columnar, incremental)

```ts
// LodBand, Role (§8.2), ZoomStop (§8.8), and LabelTable, StringTable and GeomTable with §9.2's LabelRows, are declared in
// @plat/model (§14), so @plat/labels and @plat/render share them without either importing the other's code (N-22)
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore';
// one row per mark; every column a typed array, so any slice is transferable (§8.9); bytes per mark on the right
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index                                                          1
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', …)   2
  entity: Uint32Array;                 // interned handle (§2.1): session-local; routes deltas, hit-tests, edits; never hashed   4
  key: Uint32Array;                    // 2 per mark: the render key (item 5)                                     8
  layer: Uint8Array; z: Int32Array;    // model layer (§2.1) and order inside it                                  1 + 4
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band   1
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay: the order within a slot (item 3)   1
  group: Uint32Array;                  // district handle: unit of delivery and invalidation, never of raster caching   4
  bbox: Int32Array;                    // 4 per mark, world cm                                                    16
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids   8
  revision: Uint32Array;               // low 32 bits of the entity's §6.2 leaf digest (its inputs' content revision): the cache key (LC-23)   4
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, prosperity, class, block, bankKind, waterKind, exposure, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'custom' }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 96 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  pinSeq: Uint32Array /* the pin's moveLabel seq (PinnedPlacement.seq, §9.1): the order of §9.2's pin pass */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable;
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; type generated from the concern registry */; layers: LayerSpec[]; bounds: Box; version: number }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; dirty: Box[] }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand, groups?: number[]): DisplayList;             // full build (generation, load), or one band for the named districts (on-demand bands, §8.9)
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration, override resolution (§8.10)
}
```

1. **Built by S14** from the model through the entity registry (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only the marks emitted and the programs run
   change.
2. **Kinds.** `field` marks carry a world-space raster (terrain height for hillshade and contours, distance to shore
   for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore` marks are chains, one
   per maximal run of equal attributes along a water face's boundary: `bankKind` (§2.3), `waterKind`, `exposure` and
   `shoreClass` (bay / headland / straight, §2.3; read by the shore programs' per-class rows). `exposure` = `sheltered`
   where the segment bounds a harbour basin, moat, canal or pond or its fetch (longest straight run across water within
   ± 30° of the outward normal) is below 300 m, `river` on river and tributary faces, else `open` (VIS-13). `instances`
   marks carry a face or chain and one `InstanceTable` row — the offset, rotation and spacing S14 draws from the
   entity's `render.instances` stream, the species mix, the resolved overrides; their points are generated at raster
   time (§8.10), never stored. `text` marks carry one `LabelTable` row each, so S13b needs only the display list (N-4).
3. **Slot, pass, draw order (N-7).** The order is **slot-major across the whole scene**: every mark of slot s of the
   style's layer-order table (§8.2) draws before any mark of slot s + 1, in every tile; within a slot by `pass`, then
   `z`, then `key`. A mark's slot comes from its (semantic, pass) by §8.2's slot resolution, cached per style version as
   a (semantic index, pass) → slot table. S14 emits one mark per pass an entity draws in, as the registry declares per
   band: a cased ribbon is a pass-1 casing mark plus a pass-2 body mark over one geometry range (≈ 60 B for the second
   mark, never a second geometry copy; one extra mark per drawn way, a few thousand at CITY). The raised under-copy
   (slot 11) and the projected-shadow union (slot 10) are not marks but per-tile operations over the caster marks,
   placed by `derived` entries (§8.2). Way casings (slot 5) and way bodies (slot 6) are separate slots holding every way
   class, so every casing precedes every body across the scene and no district's drawing puts a casing over another's
   body (GEO-28); masses, fields, woods and shadows keep their slots after the roads (K16, NG's shadow order, MFCG's
   wards after roads). `group` only delivers and invalidates; rasters are cached per world-aligned tile (§8.8).
4. **Incremental.** After an edit or scoped regeneration the builder gets the changed handles (§7.3's locality closure)
   and emits a `DisplayDelta`: removed marks; new marks for the changed entities and those whose marks depend on them (a
   way's marks when a junction on it moved; a district's ground mark when one of its blocks changed); their label and
   instance rows; and dirty world boxes = the old and new marks' bboxes dilated by the largest cross-tile effect (§8.8).
   Cost O(changed marks). During a replay the builder is suppressed and runs once at the end (§7.3 item 2; SCL-9).
5. **Cache keys and render-time keys (LC-23, NF-D10).** Every derived artefact — roof geometry, label spine, footprint
   mass, instance set, tile raster, glyph run — is keyed by (the entity's `key` or the tile address, content revision,
   band, style version, roof construction where it applies), never by id alone: a `setAttr` on floors changes the
   building's revision and so its roof; a changed boundary street dirties both its sides. **Every render-time hash** — a
   multi-colour role's index, weathering, a stamp's tile variant, grid jitter, crown index, colour and scale jitter, hatch
   phase, roof detail, the `ruin` dash — is `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag (an index into a
   fixed render-tag table); the **render key** `key` = the low 64 bits (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.4 MB of
   attributes, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB. The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the columns `update()` reads (`entity`, `bbox`,
   `group`: 24 B per mark, ≈ 1.4 MB at CITY). An export that draws (SVG, PNG, print, the `.dd2vtt` image) builds its own
   transient list in the generation worker: SVG writes from it there; a raster export transfers it to the tile worker
   with its request; each releases it when done (§8.9, §11.1).

Judgment calls: J-R1, J-R2, J-R19, J-R20.

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

A style sheet maps (semantic, attribute predicates, band) to **paint programs** over a palette of **roles** and a
**symbolisation table**:

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly'|'graphic';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing';   // over stored wings (§2.6)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  shadows: { projected: 'off'|'drop'|'prism'; penumbraPx: number; sun: SunSpec;
             raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number } };
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  post: PostOp[];                                                        // per-tile post operations
  budgets: Record<LodBand, DetailBudget>;
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot {
  slot: number;                     // its row of the layer-order table below; several entries may share a row
  semantic: string;                 // a semantic ('way.pier') or a dotted prefix ending in '.*' ('way.*')
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass
  derived?: 'raised'|'shadow';      // instead of the matched marks' draws: the per-tile raised under-copy or projected-shadow union over them (§8.4)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `lights`. A role never changes meaning across the bands or the presets of one family; the
reference schemas (MFCG 13 keys, NG 26, VG 40) map onto it without loss.

**Contrast matrix (O12 f).** Pairs that must separate wherever both roles are drawn (the city band unless the row says
otherwise):

| pair | ΔE2000 ≥ | ΔL* ≥ |
|---|---|---|
| road / ground | 6 | 5 |
| ground / building | 12 | 12 |
| road / building | 15 | 15 |
| garden / building; green / building | 10 | — |
| tree / water | 10 | — |
| green / road; tree / green | 8 | — |
| water / road; water / ground | 8 | — |
| wall / water | 20 | — |
| field / road; field / ground | 4 | — |
| court / road (district band and finer: courts are drawn as `ground` at the city band, §8.5) | 4 | — |
| court / ground (district band and finer) | 3 | — |
| ink / road; ink / ground; ink / paper (text, its halo and outlines: the **label floor**, §9.4) | 40 | 50 |
| ink / building (outlines and landmark rims; text crosses masses only on a halo, §9.4) | 30 | 40 |
| ink / tree (crown outlines) | 25 | 30 |

Checked on every palette when loaded (built-in, user-edited, random) and on rendered city-band images in B-ZOOM (the
mean CIELAB of the pixels whose top mark, read from the pick buffer, has each role, for every pair in the view). A failing
user edit is shown with the failing pair and kept only with an explicit "accept low contrast" flag, recorded in the
report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water (0.0) — reference weaknesses not to
copy (VIS-2).

**Random styles and their bounded repair (N-26).** A random style draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 18] in `ink` and [0, 30] otherwise, any hue, keeping `road` = `paper` where the family ties
them — a style-time draw from the `style.random` stream (§6.1) written into the `setStyle` event as row operations, so a
replay never re-draws it. A failing draw is repaired in bounded steps: take the first failing pair in the matrix's row
order; raise its lighter role's L* by 1 (up to 97), or, if that is at 97, lower its darker role's L* by 1 (down to 3);
re-check every pair; stop when all pass or after 100 steps; the result must still pass after conversion to sRGB. A draw
whose repair fails is redrawn (attempts 0–2); after three failures the family's shipped palette is used and the report
says so — ≤ 300 steps by construction (J-R30). On 2 000 seeded draws per family (`fixall_rendering_r2_palette.out`):
4–18 % pass as drawn, 77–83 % after the first repair (median 5–17 steps), 99.1–99.6 % within three attempts; the fallback
fires for 0.4–0.9 %. **Confirmation (M3b, where random styles ship):** shipped-palette fallback ≤ 2 % of 10 000 draws
per family; pre-decided fallback: the L* window narrows to ± 8 and the run repeats.

**Role values** (our own; calibratable rows). Every matrix pair, outline rows included, passes on these sRGB values
(`fixall_rendering_r2_palette.out`; e.g. `ink` road / ground 6.9 / 10.0, ground / building 16.1 / 21.1, tree / water
20.7, court / ground 4.2, ink / building 41.9 / 47.9; `lit` ink / building 37.8 / 43.0; `hatched` 34.5 / 40.6):

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F6EDDE` | `#DED6CC` | `#D4CABF` |
| road | `#F6EDDE` (= paper) | `#D8D0C8` | `#B6A99B` |
| ground | `#DED0BB` | `#CBB9A2` | `#D4CABF` (= paper) |
| court | `#ECE0C6` | `#D1C5B2` | `#B7B898` |
| building / roof (lit side) | `#A49689` | `#AD8A72` | `#9D7D68` |
| ink / label | `#292522` | `#34281E` | `#2A231D` |
| wall | `#292522` (= ink) | `#857A6E` | `#685C51` |
| water | `#AABBC5` | `#6D9CB9` | `#98AFBB` |
| green | `#BCC8AB` | `#9AB37F` | `#B0B48C` |
| garden | `#C7CCAF` | `#8EA96D` | `#A8AF83` |
| tree | `#7E907A` | `#5B7A4F` | `#798C67` |
| field | `#ECDFBF` | `#D8BE89` | `#E5D6B5` |
| verge | `#D9DCC5` | `#ADBB95` | `#BBBEA1` |
| shadow | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |

`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and shadows the ink at an alpha; no role above CIELAB chroma 18 (`field` highest, 17.3)
(J-R3, J-R28, J-R29).

**Symbolisation table (VIS-1).** Drawn width px = clamp(k × model width × px per metre, minPx, maxPx) in `model` mode, or
a fixed paper width at 1× (× the device pixel ratio) in `paper` mode; no length is written in any reference's private
unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (model widths); styled SVG and PNG carry drawn
widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view scale (MFCG size 40 at 0.816 px/m,
1.23 m/px): walls 7.6 m wide, towers 15.2 m across, road cores 8 m, piers 4.8 m; its SVG writes them in its 4 m internal
unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on the band thickness (2.5 m → 7.5 m), minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = median footprint side in px at the zoom stop (MFCG's Thin lines as a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north, drawn length clamped to [0.3 px, 2.5 px] | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ the building outline weight, never filled, gaps at gates | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints, and the wall symbol is clipped on its inner side to the band's inner edge minus the
setback, so it overhangs only outward (berm, moat, glacis) and never covers a plot. **Dry ditch:** the `ditch` residue on
the town side of an `on_enceinte` bailey (§4.7 S10 (0), §4.8) takes the glacis parts' role in a dry-ditch variant — fill
5 ΔL* darker than the glacis fill and, at the district band and finer, a short inward hachure along its inner edge; at
the city band the glacis parts' plain fill; the overhang rule covers it.

**Paint programs.** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at `w + 2h` in the casing
pass, body at `w` in the body pass); `bands(N, W, exponent, ramp)` (VG's water law); `raised(offset)`;
`shadowPass(mode, colour, alpha, penumbraPx)` (§8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction,
dark = lit × lerp(ambience, shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`;
`pattern(texture, tintRole, metresPerTile)` (tinted seamless textures); `faceLight(dir)` (a per-face tone from the face
normal and the light: roof faces from the skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from
a field raster: water depth, terrain colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals
of the terrain field, water masked, strength from the `shadow` role's alpha, multiply-composited after fills and way
bodies and before buildings and trees, no blur); `contourMarks(levels, mode: contour | hachure | grass)`;
`foam(widthM, alpha)` (from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and
`quay`); `feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground, no bitmap blur; COV-FTG-I05);
`outlineMix(factor)`; `tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette`;
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple — the hook for the owner-staged
ruined state, with the `none` roof kind, §2.6); two tone overrides keyed by §2.8's decline states: `existence =
abandoned` (roof tone lerped 30 % toward `ground`, no raised under-copy) and `existence = decayed` (outline dashed, fill
at 60 % alpha); `symbol(glyph)` (a point symbol for every `Pin.kind` of §2.7). A lane's body and casing end square at
the kerb of the way it meets; the junction wedge belongs to the higher-class way (GEO-21's renderer half). Hairlines and
casings are in paper px; ribbons and symbols follow the symbolisation table.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line; `hillshade` runs on the same field. VG-specific looks (spotlight vignette,
dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list: an individual mark (building, roof, tree, stall) takes index
`RH32(role, key, salt[, instance ordinal], style id) mod n` (§8.1 item 5); aggregate fills (block ground, city-band
masses, wood fills) take index 0.

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) — hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°; method
`spectrum` (hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength
0–1; applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3); recomputed when the palette changes;
off in `ink` by default. `weathering`: each roof's RGB × (1 + u·w), u ∈ [−1, 1] from
`RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06 (hatched), 0.08 (lit).

**Materials, season, weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. The view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow}, which select override rows: autumn and winter re-skin deciduous crowns (by `leafType`,
deciduous when absent) through role variants (`tree@autumn`; winter a bare-crown symbol); snow lays the `snow` role over
ground, fields and roofs while `road` keeps its value; overcast turns the projected shadow pass off (the raised
under-copy stays). The model and its hash are untouched.

**Post operations (K07).** Applied once per tile after its marks, by Canvas2D in the tile worker (≈ 1–2 ms per 512²
tile): `greyscale`, `sepia`, `tint(colour, strength)`, `vignette` (on the view), `pixelate(cellPx)`,
`dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`, `crosshatchNoise(periodPx, alpha)`. PNG export applies them per
tile; SVG carries greyscale, sepia and tint as colour-matrix filters and omits the pixel operations, which the export
report lists.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; marks(view: ViewState, model: ModelView, region: Box): MarkTable }`
adds display-list groups that are view data (never hashed). Providers run in the generation worker, which calls one when
the view state it reads, the model or the visible region (dilated by one tile) changes, and delivers its marks as a
`DisplayDelta` of group `live.<id>` (§8.9). `overlay` marks are drawn in the tile worker's composition step (§8.8), so a
selection or a moving person re-composes tiles without re-rastering; a `base` provider (a thematic recolouring) is part
of the tile key (§8.8). Shipped: `live.selection` (overlay); `live.favourites` (base: the view state's `favourites` as a
thematic override); and, registered by the simulation module, `live.people` (overlay: favourite persons' positions from
the module's occupancy at the view-state hour, one categorical colour per person).

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code.

**Layer order** (data; `ink` shown; one list for the city and district bands). MFCG's recorded order (water → road casing
→ road body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title) is
a subsequence (order parity, §8.3); NG's (greens → roads → shadows → buildings → props → trees depth-sorted → title) is a
subsequence of the `hatched` sheet's slots.

| # | slot | reason |
|---|---|---|
| 1 | paper | background; streets and squares are paper by omission |
| 2 | water | MFCG: water |
| 3 | ground.block | new: the figure-ground contract (§8.5) |
| 4 | relief (hillshade, contour marks; off by default) | new: under everything built (VG) |
| 5 | way casings (`way.*`, pass 1), every class drawn at the band | MFCG: road casing |
| 6 | way bodies (`way.*`, pass 2) | MFCG: road body |
| 7 | river casing and body | MFCG: river |
| 8 | shore marks | new: on the water edge, after water and river |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 10 | projected shadows (off by default; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail | MFCG: wards |
| 14 | piers and bridges | MFCG: piers |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

A bridge or pier (slot 14) is cased along its sides only — its ends are open where it meets its way — so no later casing
crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot 25's world-space live marks and annotations are
composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and the measure overlay are screen-space furniture
drawn by the main thread over the composed tiles (§9.5). §8.3's census checks every tile's draw calls against this table.

**Slot resolution.** When a sheet is loaded (built-in, user-edited, random, host-supplied) the loader takes, per band,
every (semantic, pass) pair the entity registry says S14 emits at that band and the sheet paints, and resolves it against
the band's entries without `derived`: candidates are the entries whose pattern matches the semantic (equal, or a prefix
`x.*` with the semantic under `x.`) and whose `passes` include the pass or are absent; the winner is the most specific —
an exact semantic before any prefix, a longer prefix before a shorter. The sheet is **refused** when a pair has no
candidate, when two candidates tie at the highest specificity, or when one `derived` kind is placed in two slots of a
band. The result is §8.1 item 3's table, cached per style version. Shipped sheets: `{ slot: 5, semantic: 'way.*',
passes: [1] }` and `{ slot: 6, semantic: 'way.*', passes: [2] }` for way casings and bodies; exact pier and bridge-deck
entries in slot 14 outranking the prefix; one entry with no `passes` for a river's casing and body in slot 7. A CI test
loads every shipped sheet at every band (§8.3). A refused user edit is shown in the style dialog with each unresolved or
ambiguous pair and not applied; a `setStyle` event carrying a refused sheet fails its dry run with the conflict action
`invalid` (§7.1), so no document holds a sheet two loaders could order differently (J-R39).

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured, and cross-fades over the band's hysteresis interval (α 0 → 1, §8.5). **Role continuity:** B-ZOOM checks mean
roof and mean ground colour ΔE2000 < 2 across every band switch within a family, from the milestone that ships the
family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4, §16; N-23).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06; projected pass off), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in ink at α 0.5 on the roof colour, prism shadows at ink α 0.25 when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled | wings and rooms as ink outlines |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft projected shadows when on, hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role; monochrome; `lights` role with glow instances | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2: the default label face is IM FELL Great Primer in every family; small caps and old-style figures
come by §9.2's per-face path (N-12).

**`lit` on the reference backend (VIS-7).** Every `lit` program runs on Canvas2D: textures are `pattern` fills of
greyscale seamless tiles tinted by the role colour (multiply); lighting is `faceLight` per face from stored geometry, one
directional light from the sheet's sun (with a `path` sun, its light step, §8.4); soft shadows are `shadowPass` polygons
with `penumbraPx` — the shadow polygon plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓, vector, no
bitmap filter (avoiding Fantasy Manor's ≈ 90 % bitmap-shadow cost); canopy shading is baked into the crown sprites per
(style, light step) (§8.10); water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile
(≈ 1.3 ms per 512² tile). `lit` does not draw per-pixel normal-map relief on roofs and walls — per-face tones plus
texture instead, and the style dialog says so (J-R4). **Texture set** (our own, procedural: generated by
`plat/tools/textures/` in the product repository (§17.1 (3)) with fixed seeds; every file in `plat/assets/textures/`
names that script and its seed (§17.1 (5)); no third-party texture; NF-S11): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

### 8.3 Symbol catalogue and draw-style census

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (§8.10);
clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer; tinted pattern textures with
per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph text with a role halo; a
point symbol for every `Pin.kind` of §2.7; screen-space furniture (§9.5). Every semantic visible at a band has exactly
one registry glyph, from which the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). **Order parity** (VIS-16): the reference's recorded order is a subsequence of the preset's, and every semantic the
reference never drew sits at a declared slot with a reason (§8.2's `OrderSlot`s).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots |
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the slot table, then in pass, in every tile |
| sliced rasters: per preset and band, the golden views' densest district- and neighbourhood-band tiles and a whole-CITY city-band view, each tile rastered by one `step(Infinity)`, by `step(1)` until done, and by `step(1)` with another tile's job, a furniture query and a band answer for districts outside the tile served between every two steps (§8.9) | all | pixel-identical in the three runs; logged (slot, pass, z, key) call sequence identical |
| sliced placement: per preset, every golden view's stop and the stop of an A2 300-dpi export of a golden CITY, S13b by one `step(Infinity)` and by one unit per step, with a furniture query, a raster step and a band answer for districts outside the view served between every two steps (§8.9, §9.2) | all | identical placement digests (§13.3) |
| light steps: a METROPOLIS view in `lit` with `prism` shadows and a `path` sun advanced one 1° step per frame across three light steps, then stopped, on a tier with shadow layers and one without, both at tile DPR 1 (§8.4, §8.8) | lit | after the stop every cached `under` and `over` (or `base`) tile carries the final light step; the two tiers' tiles equal outside the projected-shadow pixels; the view pixel-identical to a fresh render at the final sun |
| slot resolution by §8.2's rule | every shipped sheet at every band in CI; every sheet at load | 0 unresolved, 0 ambiguous; each `derived` kind in one slot per band |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (§8.2), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | §8.2's bar |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders (NF-D10) | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' cm coordinates and ranks in point-index order (§8.10) | all | as loaded in the generation and tile workers: equal to the stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| stamp-tile seams: per stamped class, all 256 2 × 2 arrangements of cells drawing its four tiles (every ordered pair side by side in both directions, every corner), for the full point sets and each band's rank subset (§8.10's r < s_b) | all | 0 pairs of points in different cells closer than r₀ (an integer test on tile cm); `plat/tools/stamptiles/` refuses to write a failing asset, and the PR tier re-runs the check on the loaded asset |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | 15–20 hatch triangles; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |

### 8.4 Layers, shadows, heights

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky`
  marks above, their shadows projected onto the ground layer. Occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean; castsShadowOnto?: Layer; exportSeparately: boolean;
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen), tethered to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint. Island placement is §4.2 S1 (2)'s,
  `SkyIsland.placement`'s (§2.7) and II.6's; B-ZOOM reports the ground area sky layers occlude. The island generator is
  owner-staged; these fields are its hook.
* **Two different things (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy of each footprint
  beneath it at one constant offset (§8.2's symbolisation row) — ON by default in `ink`, not a shadow, not
  height-dependent. **Projected shadows** (`ShadowPass(layer, sun)`) are height-derived and OFF by default (owner:
  shadows optional).
* **Shadow casters** (WC5): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included), towers and gatehouses (prism), curtain walls (prism of the band), bridges and piers (deck prism over water),
  trees (crown offset by the crown height), sky layers (the island outline projected by `elevationCm`). Every caster
  projects along the sun vector from its base elevation (`baseCm`, FTG-13) onto the ground; the ground under a footprint
  lies within FTG-13's plinth tolerance, so a flat projection from the base is exact to that tolerance. Shadows are
  unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into a per-tile
  shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun re-rasters
  only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth; `prism` draws
  the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec = { azimuthCdeg; altitudeCdeg; colour: Color; intensity: number; mode: 'fixed'|'path'; latitudeDeg: number /* path mode; default 50 */ }`;
  `fixed` by default (azimuth 315°, altitude 45°: light from the upper left); in `path` mode from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the view-state time
  (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign. The shadow pass
  reads the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude. Below −6° the sheet switches to its night variant
  (`night` roles; `lights` glow instances from the module); shadow length is capped at 8 × height near sunrise and
  sunset. Shadows are vector: no shadow-resolution setting.
* **Budget (AM-3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
  `penumbraPx` is two vector rings, not a blur). **Measurement:** M2b times it on METROPOLIS tiles with `prism` shadows.
  **Pre-decided fallback:** a rung that misses draws `drop` instead of `prism` (same heights, one offset polygon per
  caster), reported. **A moving sun (N-8):** in `path` mode one 1° step re-rasters and re-composes the visible tiles'
  shadow layers — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside §12.5's settle budget — and a newer
  step cancels an older one's pending tiles (latest wins); on a tier with no room for shadow layers the step re-rasters
  the base tiles within the same settle budget. **Measurement:** M2b times steps on METROPOLIS views, one step per frame,
  on the reference and low-end devices. **Pre-decided fallback:** a tier whose step misses quantises the path sun to 3°
  instead of 1°, reported.
* **Light steps.** When the path sun enters a new light step, a **light pass** bakes the `lit` crown sprites for it
  (§8.10), then re-rasters the visible tiles' `under` and `over` layers (or `base` on a tier without shadow layers) at
  that step, centre-out like a settle and within §12.5's settle bound, each tile swapped in when ready. A light pass is
  never cancelled by a newer light step: the newest waits and starts its own pass when the running one completes,
  skipping steps between, so the view reaches one light step within two settles; 1° shadow steps go on beside it (latest
  wins). Every raster of the view uses its **drawn light step** — the running pass's, or the last completed pass's —
  passed to each raster job as `TileRasterOpts.lightStep` (§8.9), so a tile exposed during a pass is rastered at the
  pass's step. Once a pass completes no tile keeps another light step, and tiers with and without shadow layers draw the
  same roof and crown tones (§8.3's light-step row). **Measurement (M2b, the moving-sun runs):** every light pass within
  the settle bound and the crown bake within §12.7's budget. **Pre-decided fallback:** in `path` mode `faceLight`, the
  two-tone roofs, `hillshade` and the crowns hold the sheet's fixed sun — only shadows follow the path — reported (J-R54).
* **Heights** of every building, wing, tower and roof are §2.6's, so shadows, glTF and CityJSON agree (O17 g).

### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical lanes
(below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields; quarter
labels (the city cut, §4.5, §9.4), water, major landmarks, gates. **district** — district names; footprints with
outlines and entrances; yards by role; boundary treatments; every way stroked; courts; greens; crowns; way names.
**neighbourhood** — the family's close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6).
**building** — wings and rooms (stage 3). Way tiers: 1 = `through`, `primary`; 2 = `secondary`, `quay`; 3 = `lane`,
`cul_de_sac`, `alley`, `track`, `path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band
with hysteresis (entered at its threshold stop, left one stop past it); added detail cross-fades across that interval;
per-band detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM).

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and greens
   ≥ 0.3 ha show in `green`; enclosed courts stay `ground` and take `court` from the district band, keeping `ink`'s eight
   city-band tones, §8.2, N-25), so inside the built area streets and squares are the only `road`-role voids.
2. At the city band footprints are drawn over the ground as **masses**: per block, closed across gaps narrower than 1.5 px
   at the zoom stop (offset +r then −r, r = 0.75 px × metres per px, in the kernel's integer offset, computed and cached
   per (block, stop, revision) in the tile worker from the footprint marks, which carry their block in the `block`
   column), never across the corridor of a way drawn at the band (the closing is clipped by those corridors, so an
   access-critical alley stays open), filled with `building` and outlined at the band's outline width; party lines
   between one mass's footprints at one third of that width, only where the footprint's short side is ≥ 4 px.
3. A mass smaller than (2 px)² that merged with nothing is a 2-px **settlement dot** in `building` with an ink rim — a
   symbol at the centroid, never an enlarged footprint (O12 a's 2-px floor).
4. Access-critical lanes are drawn as below.

**Metrics** (B-ZOOM, city band, default view, every rung). **Street-edge recoverability** — the share of intramural street
length (sampled every 2 px along corridor centrelines) with a road / non-road transition within (half-width + 1 px) on
both sides — ≥ MFCG's value on its size-40 / 80 / 130 plain sweep renders less 0.03; MFCG's value is measured
research-side at M-1 by this metric (§13.5 ⟨M-1⟩), and the product's implementation is cross-checked against it on M1's
golden renders within 0.01. Road / ground contrast is the matrix's (§8.2); gross footprint cover inside the walls is
reported beside MFCG's as information, not a target (§13.5; yards are the owner's plot-model ruling). **Pre-decided
fallback** if recoverability fails at M1: the ink city band adds kerb hairlines (0.25 px, `ink`) along every open
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and re-runs the metric (J-R5).

**Way selection at the city band (VIS-3, N-6).** Tiers 1–2 are always drawn. A tier-3 way is **bounded** when the
footprint-covered share of its frontage is ≥ 0.8 on **both** sides and its width is at least the closing's 1.5 px at the
stop (the gap between two continuous masses already reads as a street). It is drawn when **access-critical** — some plot
has all its access edges on it and fronts no other drawn way — and not bounded, i.e. covered below 0.8 on at least one
side (a lane with a row on one side and open gardens on the other) or narrower than the closing. Drawn tier-3 ways take
the lane symbol (body = max(model width, 1 px), casing h / 2); bounded intramural lanes and alleys stay unstroked gaps
between masses. Suburb offshoots, ribbon back lanes, farm tracks and extramural lanes are therefore drawn. Metric: the
share of city-band plots whose access way is drawn or bounded ≥ 95 %.

**Line greenery (VIS-14).** Avenues and street trees are not drawn at the city band; they appear from the district band,
where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band (§8.3; J-R6).

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band —
with no S9 block preview on the one-click path (SCL-4; J-R7). Lazy work is only what the city band does not draw: yard
sub-parts, entrances, roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10).
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map.

### 8.6 Stage-2 render tier and stage-3 LOD

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family, and
the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user opening a
district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived on demand for the visible
tiles from the district's committed state and sub-seed — in the derivation pool, or in the generation worker when the
pool is off (it needs the kernel and the model) — and reaches the tile worker as `DisplayDelta` slices answering the
tile's band request (§8.9), into the same mark tables and tile pyramid. Stage 3 plugs in at the building band: marks
from `BuildingGenerator.compose(…, 'wings' | 'rooms')` (taking a `Kernel` and a `BuildingInput` with a `TerrainSampler`,
§2.6), computed on demand for the visible tiles' buildings in the same place and cached there by (entity key, revision,
lod); the tile draws the outline until its compositions arrive, and every other band draws the outline, which equals the
union of the composed wings by contract (SCL-13), so the footprint hash is the same at every band. The tile worker never
runs `compose()` or close-up derivation (§8.9).

Roof construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6): a `rect` wing takes exact OBB
ridges with hips from its four corners (`BaseWing.corners` when its sides carry other vertices), a rect a warp
de-rectangled being a `quad` by §2.6's carry rule; a `quad` takes the exact OBB path when it passes the near-rectangle
test (§3.8), the validated skeleton otherwise, and the gable constructions draw its stored ridge (the arc-length
midpoints of the two side chains its `ridgeAxis` names, sides delimited by `BaseWing.corners`, §2.6); a `polygon` wing
takes a pyramid, cone or dome; the plain roof (no ridge or hip lines) is the downgrade (§3.8). Two-tone lit / shadow
faces are assigned per roof face by its normal against the light (`faceLight`) for any face set a construction yields.
The derived-roof cache key includes the construction (§8.1 item 5), so switching `ink`'s hipped roofs to `hatched`'s
per-wing gables needs no regeneration.

### 8.7 Export resolution

SVG is resolution-free and layered, written at a declared band (§11.1). PNG and print render by §8.8's band-streamed
tile assembly at any DPI, with labels placed at a zoom stop computed for the export's own scale (§9.2); paper-unit rules
keep hairlines at their paper width at every scale, and symbol widths come from the symbolisation table (§8.2) at the
export scale. VTT exports carry model widths only, on a declared grid with exact pixels per cell (§11.1). The scale bar's
accuracy is §9.5's.

### 8.8 Tiles, zoom stops, print and the canvas budget

* **Pyramid (N-9 a).** Zoom stops (`ZoomStop`, §8.1) at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000 →
  1:500 in 27 stops; stop k has m_k metres per **CSS** pixel. Tiles are 512 × 512 device px at the view's **tile DPR** d
  (the device pixel ratio after the tier's cap, below), **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres with corner (i, j) × 512 × m_k ÷ d from the world origin — stable under panning,
  shared between views and exports at that stop and DPR. The view settles on exact stops: the settled scale is within
  ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and a collision-free label set
  (J-R8).
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by m = the largest of the casing
  half-width, the drawn wall half-width, the projected-shadow length, the largest crown radius and the halo width at the
  stop, in §8.1 item 3's order, identical in every tile; each tile clips to its own square, so both sides of an edge yield
  the same pixels — no seams, no casing bar across a junction on a district boundary. Fills of one semantic within a tile
  are one `Path2D` with the non-zero rule (no anti-aliasing seam between same-role neighbours); semantics declared
  `seamClose` (ground, masses, yard parts, the shadow union) also get a ½-px same-colour stroke underneath (NG's seam
  dilation). Tested by §8.3's junction-mouth and draw-order rows.
* **Layers of a tile and composition (N-5).** The tile worker rasters and keeps a **base** layer per tile (slots 1–20 of
  §8.2), then **composes** the base, the glyphs of the labels placed at that stop (§9.2) and the `overlay` live marks
  into one bitmap per tile position, transferred to the main thread. A label edit or toggle, a selection or a moving
  person re-composes the tiles it touches (§12.5's composition cost) and never re-rasters a base. In `path` sun mode
  (§8.4), on a tier whose budget admits it, the base is rastered as `under` (slots 1–9) and `over` (slots 11–20) with the
  projected shadows (slot 10) in their own layer at half resolution (256² per tile, bilinear-scaled when composed), so a
  1° sun step re-rasters only the shadow layers and only a new light step re-rasters `under` and `over`, through §8.4's
  light pass (J-R21).
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change the layer's pixels: season, weather,
  shadows on or off and their mode, model-layer toggles, `base` live layers; for the `shadow` layer — or, while projected
  shadows are on, `base` on a tier without shadow layers — the path-mode sun quantised to the tier's sun step (1°, or 3°
  after §8.4's fallback); for `under` and `over` — or `base` on a tier without shadow layers — of a sheet whose programs
  at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4); in
  `fixed` mode the sheet's sun belongs to the style version). Content version = the combination of the drawn marks'
  `revision`s. A composed bitmap is keyed by its base key plus the stop's label-placement revision and the `overlay`
  providers' versions. A `DisplayDelta`'s dirty boxes invalidate every cached tile they meet, at every stop and DPR. In
  path mode a new 1° step invalidates only the layers keyed by it, and a newer 1° step cancels an older one's pending
  re-rasters (latest wins); a new light step invalidates the layers keyed by it, which §8.4's light pass re-rasters to
  completion.
* **Canvas budget per hardware tier (N-9 b).** Counted: per visible tile position the worker's base (1 MB at 512²) and
  the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps kept for gestures (≤ 1 MB per visible
  position); fixed scratch — the shadow and post-operation buffers (2 MB), and the crown sprites and glyph atlases
  (≤ 5 MB), the crown sprites with a `path` sun in `lit` being one set per cached light step (the drawn step's set always,
  earlier sets while they fit, §8.10; a set a running export holds counts with that export's canvases, §12.8). With P the
  worst-case number of tile positions covering a W × H CSS-px view at tile DPR d,
  P = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and **4.25P + 7 MB** with path-mode shadow layers
  (`under` and `over` replace the base; the shadow layer adds ¼ MB). Tier ceilings: low 72 MB, mid 128 MB, high 192 MB;
  tile-DPR caps: low 1, mid 2, high 3. The tile DPR is the device's pixel ratio capped by the tier, then stepped down
  (3 → 2 → 1.5 → 1) until 3P + 7 MB fits the ceiling; path-mode shadow layers are used only where 4.25P + 7 MB also fits,
  otherwise a sun step re-rasters the base. Worked cases (`fixall_rendering_r2_budgets.out`): the reference view,
  1 440 × 900 CSS px at DPR 2, has P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end
  device at 1 366 × 768 or 1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB, fallback stop, scratch
  and atlases counted. Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes. The
  tier is chosen at app start from the Canvas2D part of `bench/calibrate` (§12.1) and the host's reported device memory,
  can be overridden in the advanced panel, and is shown with the tile DPR in the view status (J-R22).
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed tiles
  scaled (the labels scale with them); 120 ms after input stops the view animates (≤ 150 ms) to the nearest stop and the
  tile worker re-rasters the visible tiles centre-out, swapping each in when ready. Panning composites cached tiles and
  shows newly exposed ones from the next coarser cached stop until rastered. While a gesture runs at most 4 new bitmaps
  are committed per animation frame; at first paint and at settle every ready tile is committed in the frame it arrives
  (§12.5).
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the export
  scale; each band's scanlines are streamed into the PNG encoder — each row filtered by the **per-row rule** (of PNG's
  five filter types, the one whose filtered bytes have the smallest sum of absolute values, bytes read as signed), then
  one zlib stream (`CompressionStream` in browsers, `zlib` at level 6 in Node) — and written as IDAT chunks band by band;
  §12.7 holds the encoding's time and fallback. Peak canvas memory is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B
  ≈ 14 MB); no canvas is larger than a tile band. Per-layer transparent PNGs use the same path with the layer set
  restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only tiles meeting the brush's dirty box re-raster (frame rate: §12.6). **Apply**
  commits the `warp` event (§7.1), whose invariants and re-derivation run then; **Discard** drops the copy (MFCG's staged
  warp, on our event model).

### 8.9 Backends, text, threads and the worker boundary

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and variants), on an
  `OffscreenCanvas` in the tile worker through the resumable raster jobs below; programs render typed-array paths, one
  `Path2D` per (program, semantic, variant) per tile, sprites by `drawImage`. SVG is written from the same display list
  (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor**: it uploads the composed Canvas2D
  tiles as textures, composites them with the view transform and runs the post operations as one fragment pass — no
  stroke tessellation, no SDF text, no look that differs by backend (VIS-7). Measured at M2b: pan and zoom frame rates of
  the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the WebGL2 compositor is
  enabled for a hardware tier only if Canvas2D misses ≥ 60 fps (reference) or ≥ 30 fps (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's glyph
  outlines by default, or as text in the embedded face on request (§11.1, N-13) (J-R9). Measured at M1 against §12.7's
  label-composition budget; pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands (the district, neighbourhood
  and building bands of the districts a band request names, `DisplayListBuilder.build(model, band, groups)`), writes every
  export (§11.1), answers the API's `hit` and `inView` queries (§11.2) from the model and its 24-B index (`entity`,
  `bbox`, `group` — all a hit test or a features-in-view list reads), and hands stage-3 `compose()` and close-up
  derivation (§8.6) to the derivation pool. (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
  stages at every rung (§12.3) and, on request, `compose()` and close-up derivation from the committed state of the
  district it is handed; with the pool off the generation worker runs them. (3) The **tile worker holds no model and no
  terrain**: it holds the display list with its label, instance and string tables (the only full copy, §8.1 item 6) and
  from them rasters base layers, runs S13b (§9.2) and decoration instancing (§8.10), composes labels and `overlay` live
  marks (§8.8) and runs post operations; it answers the main thread's furniture and snap queries and rasters raster
  exports from the transient list each request carries (§11.1) — all through the queue below, with everything arriving
  through the table below (J-R23). (4) The **main thread** runs the UI, compositing of the transferred tiles, pointer
  hit-testing on the hit-test slices, screen-space furniture (§9.5; placement scores and ruler snaps asked of the tile
  worker) and input. Nothing model-sized reaches the main thread (J-R10).
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the changed rows of the label, instance and string tables (candidates, priority, parent node, pinned placement and `hidden` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: each slice copied into a fresh buffer and transferred; the generation worker keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 96 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks; the buildings needing `compose()` at the building band | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model or the visible region changes | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers), the shadow sun and the light step, which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile backend (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by the projected-shadow pass
    lightStep?: { azimuthCdeg: number; altitudeCdeg: number };  // the drawn light step (§8.4): read by faceLight, the two-tone roof, hillshade and the crowns
    tier: 'low'|'mid'|'high'; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the sequence on from where it stopped; returns after the first draw call ending deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job, frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  ```

  The queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected
  shadows are drawn; an export's jobs get its request's sheet, switches, shadow sun and light step. `begin` finds every
  mark whose bbox meets the dilated tile (§8.8) and fixes the **draw sequence**: the native calls in §8.1 item 3's
  (slot, pass, z, key) order, each a fill or stroke of one batched `Path2D` (§12.5's per-tile bound), a run of ≤ 64
  sprite draws (crowns, glyph copies), or a derived per-tile operation (projected-shadow union, raised under-copy, post
  operation; §8.2, §8.4). The JavaScript preparing a call (appending rings to its `Path2D`, generating a stamp's
  instances, §8.10) reads the clock after every mark and every 64 instances and can stop there; a native call is never
  split (a split batched fill would draw anti-aliasing seams, §8.8), and a derived operation, which uses the shared
  shadow and post-operation buffers (§8.8), runs whole inside one step — so the overrun past the deadline is at most one
  native call or derived operation. Each job owns its canvas and context state, and what it reads does not change under
  it: deltas are applied between steps, a removed mark becomes a dead row and an added mark a new row, and the tile
  worker compacts its list only while no job is live; a job whose tile a delta's dirty boxes meet is cancelled and
  queued again. Slicing changes when calls run, never which or in what order: a tile rastered whole and in 1-ms slices is
  pixel-identical (§8.3). The queue calls `step(8)` — `step(4)` after the pre-decided fallback below.

  **The tile worker's queue.** Between two steps the tile worker serves its message queue, then runs one step of the
  highest class with ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer | a visible tile needing a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop (§9.2); with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list, its memo held by the job (§9.2, §11.1); in `lit` with a `path` sun, when the crown set of the request's light step is not cached, its bake (one sprite per unit), the set then held until the export completes; then, band by band, the band's raster jobs, composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs to
  completion before the next begins (at most one raster job per class live); a query waits at most one step, and a pan or
  zoom during an export pre-empts it within one step (newly exposed tiles are rastered at once, not behind the export's
  bands). **No starvation:** an export that has waited 100 ms since its last step runs its next step ahead of class 3
  (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle (§12.5) then contains at most
  two export steps at CITY and three at METROPOLIS, ≤ 16 and ≤ 24 ms. A newer sun step or a tile leaving the view cancels
  its job (latest wins; §8.4, §8.8). The export dialog shows the progress messages (bands done of total) and, while class
  3 holds the worker, that the export is waiting for the view (J-R46).

  **Placement and crown bakes are stepped like a raster.** S13b — the view's in class 3, an export's in class 4 — is a
  `PlacementJob` whose unit is one decision (§9.2), called with the queue's step limit; a crown bake is stepped one sprite
  per unit. A print's placement over its whole frame therefore runs as a few class-4 steps (§12.7) with queries, deltas
  and the view served between them, and every bound above holds while an export places its labels (J-R51).

  **Queries to the tile worker.** Compass, title and legend placement (§9.5) and the ruler's snapping read the display
  list, which only the tile worker holds; the main thread asks through the query rows above and the tile worker answers
  with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses (§14). A query is
  class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived operation, runs in
  ≤ 4 ms of tile-worker time, and its answer arrives within one 16.7 ms frame; most tiles are one step (a city-band tile
  of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight (a newer pointer position
  replaces a queued one) and shows the unsnapped point until the answer arrives; furniture placement is asked when the
  view settles, the furniture keeping its previous place until its answer arrives (J-R40). **Measurement** with the first
  map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: query round trip p95 ≤ 16 ms during a settle
  raster and ≤ 4 ms of tile-worker time per query, each tile's longest native call and derived operation logged beside it;
  exports beside the view are §12.7's run. **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`),
  halving a query's wait and an export step's share of a settle.

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting, scatter class) has one set of positions in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's offset, rotation and spacing (whole cm inside its class's range, §4.9: 300–500 cm for
  woods, 400–600 cm for gardens) from the entity's `render.instances` stream (§6.1) in the generation worker and carries
  them in the mark's `InstanceTable` row (§8.1).
* **Tiles.** Per stamped class, four toroidal blue-noise tiles of 6 400 × 6 400 cm at the **reference spacing**
  r₀ = 400 cm (≈ 162 points each; `fixall_rendering_r5_seamstrip.out`), each point carrying a **progressive rank**
  (void-and-cluster order: every prefix is itself evenly spread; the lowest-rank quarter keeps ≈ 1.5–1.8 × r₀ between
  any two points). The tiles are **seam-compatible**: they share one **border band** — every point whose edge distance
  e = min(x, 6 400 − x, y, 6 400 − y) is below r₀ ÷ 2 — and differ only inside it. An entity of spacing r stamps them
  scaled by s = r ÷ r₀ (scaled blue noise is blue noise at the scaled spacing), so one set serves every spacing of the
  class (a wood at 3 m stamps 48-m tiles, a garden at 6 m 96-m tiles). **No two instances of one stamp lie closer than the
  entity's spacing** (less ≤ 1.5 cm of rounding, *Stamp* below): inside a cell because each tile is spaced at r₀
  toroidally; across every seam, between any two variants, because a point outside the band lies ≥ r₀ ÷ 2 from its
  cell's edges, while a band point is present at the same position in the other point's own tile and was spaced against
  it there (toroidally, never farther than across the seam). Every band draws a subset (ranks below s_b), so this holds at
  every band. Measured on five seed sets (`fixall_rendering_r5_seamstrip.out`): 0 pairs closer than r₀ across cells in all
  256 arrangements of 2 × 2 cells, for all ranks and the rank < 0.6 and < 0.25 subsets, where four independent tiles have
  3.5–5 such pairs per 64-m seam. A stamp cell's tile variant is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1
  item 5): only the band, ≈ 11–14 % of a tile's points, repeats in every cell. The tiles are built once, when the product
  is built, and shipped; nothing samples or ranks at run time (J-R11, J-R48, J-R50, J-R55).
* **One construction everywhere.** A class's band depends on the class alone, each tile on (class, tile index) and the
  band; all are built by `plat/tools/stamptiles/` (a build-time script in the product repository, like the texture set's)
  with `@plat/kernel`'s `poisson` module (§14), held to §6.5's allowlist lint, so any machine builds the same bytes. Its
  random source is `rng.stream` (§6.1, §14) under the `render.stampTiles` concern's constant entity key (§6.1's four-lane
  finaliser over its words; creation index 0–3 for the four tiles, 4 for the band), with reroll, attempt, epoch and
  salt 0 (J-R42). **Sampling:** Bridson with k = 50 candidates, all evaluated. Every accepted
  point is rounded at once to integer cm inside the 6 400-cm tile, so the spacing test is an exact integer comparison of
  squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active point is
  `int(0, n − 1)` over the active list in insertion order, a retired point replaced by the list's last; each candidate
  lies at radius r₀ × (1 + `float01`) along angle 2π × `float01` (cosine and sine from `dmath`, §6.5), tried in draw
  order. **The band (creation index 4):** a full toroidal tile sampled as above, cut to its points with e < 200 cm, in
  index order. **Each tile (creation index 0–3):** the band's points pre-placed in that order (in the spacing grid and as
  the initial active list), sampling then continuing over e ≥ 200 cm — no first point drawn, a candidate with e < 200 cm
  rejected like one too close; the tile is the band's points followed by its own in acceptance order. **Ranking**, per
  tile: each point's energy is the sum over the other points, in point-index order, of exp(−d² ÷ (2σ²)) (d the toroidal
  distance in cm, σ = r₀, `dmath.exp`); the highest-energy point (tie: lower index) is removed and takes the highest free
  rank (n − 1 first), and every remaining point has the removed point's term subtracted, in point-index order — the
  **removal update**: ≈ 1.5 n² exponentials (n(n − 1) + n(n − 1) ÷ 2, O(n²)), never a re-sum per removal (O(n³):
  ≈ 53 ms per tile against ≈ 1.8 ms at 161 points, measured cost model). A needed square root is `Math.sqrt`, exact by
  specification (§6.5 (2)). The crown library's shapes use `dmath` the same way, so only their rasterisation into
  sprites is engine-specific. A class's band and four tiles build in ≈ 19.5 ms (measured cost model,
  `fixall_rendering_r5_seamstrip.out`).
* **The shipped asset.** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in registry order, its four
  tiles — each self-contained, band points first: a point count, then per point x and y as int16 cm and its rank as u16
  (6 B per point, ≈ 1 KB per tile, ≈ 31 KB for eight classes) — with a header naming the asset version, the format
  version, the generating script and its constant key words (§17.1 (5)) and the stored H128 of every tile.
  `@plat/render` bundles the bytes into both workers' code, so no host serves an extra file (§11.2); at worker start each
  worker takes typed-array views and checks every tile's H128 against the stored value (≈ 0.03–0.06 ms for 8–16 classes,
  measured cost model; budget §12.7). **Pre-decided fallback** when a tile's hash differs (a damaged bundle): that worker
  rebuilds the class's band and tiles with the same construction at start-up, before its first district-band raster
  (≈ 19.5 ms per class), reported; a rebuilt tile that still differs is a determinism defect, which the census's rebuild
  check (§8.3) fails in CI. **Release changes:** a new stamped class adds its four tiles and moves no stored hash (no
  drawn wood moves); a change to the construction (r₀, σ, k, the tile side, the band width, the key words) moves stored
  hashes and is a `render.stampTiles` view shift (§13.3); a new spacing needs nothing (a scale).
* **Stamp.** From the row: offset o ∈ [0, 6 400)² in whole reference cm, rotation `rotationCdeg` ∈ [0, 36 000) (S14 draws
  `int(0, 35 999)`), scale s = spacing ÷ 400 cm. R_θ's cosine and sine are `dmath.cos` and `dmath.sin` of `rotationCdeg`
  × (π ÷ 18 000), the factor a double literal. Tile point t of cell (u, v) lies at R_θ · (s · (6 400 · (u, v) + t + o)),
  each coordinate rounded to whole cm (`Math.round`): that integer point is the instance's **world position**, the one
  the face test, the density test, drawing, override resolution and every export read. The cells are those of the
  rotated, scaled lattice covering the entity's face (its bbox taken into lattice coordinates by the same cosine and sine,
  widened by one cell); a point survives if its world position is inside the face (exact point-in-polygon with holes on
  integer cm, §3.2) and, for woods, passes the edge test of a domain-warped density evaluated once per point at its world
  position in metres. Rounding moves a point ≤ 0.71 cm, so instances keep the entity's spacing less ≤ 1.5 cm. **Ordinal**
  = (u, v, p): stable — editing the face's boundary changes only which edge points survive, never interior ordinals or
  positions. **One result on every engine:** this whole function — stamp, grid and line layouts, the per-instance look
  draws and the density test, with everything they call — is held to §6.5 (3)'s allowlist lint, so every engine computes
  the same integer positions and draws, and a GeoJSON, glTF or CityJSON file with trees is byte-identical on every host
  (§11.1; the five-engine golden run compares one, §13.3) (J-R52).
* **Grid and line.** A `grid` places one point per cell (u, v) of the rotated lattice at the row's spacing, jittered
  ± 15 % of the spacing in x and y by two `RH32` draws over (key, salt, u, v) (tags `grid.jitter.x`, `grid.jitter.y`),
  rounded to whole cm, kept if inside the face; ordinal = (u, v). A `line` places point i at arc length (i + ½) × spacing
  from its start end — the end whose junction address sorts first (for an `along` row, the end at its way's first
  junction) — jittered along and across the line the same way, rounded to whole cm; ordinal = i. Park paths are L3 `path`
  faces drawn by the path program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank ÷
  its tile's point count; a `grid` point's the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² (2-D van der
  Corput); a `line` point's the bit-reversal of i ÷ 2³² (J-R25). Band b draws the instances with r < s_b (city: none — the
  wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of the finer
  for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep (LC-20, VIS-5).
* **Per-instance look, keyed by (key, ordinal).** The species, drawn by its share from the entity's `Greenery.species` mix
  (inner or outer share by the point's distance from the edge), picks the crown class; the crown index into the style's
  crown library, colour jitter, scale jitter ± 15 % and `leafType` (from the species when present, deciduous otherwise)
  are `RH32` draws over (render key, ordinal, the concern's salt). Hatch phase and roof detail are keyed by the render
  key. Nothing is keyed by band or interned handle. The **crown library** holds 20 crowns per class per style, built once
  per session from `rng.stream` keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern
  `style.crowns` with its salt, and the class and index i as the creation index (§6.1's structured components; the path
  form is a report rendering, §14), drawn as sprites. A `lit` sheet bakes its sprites per (style, light step): once with
  a `fixed` sun, and with a `path` sun again at each light step, in the tile worker as one-sprite units of §8.9's queue;
  the drawn step's set is always kept, a set a running export needs is held until that export completes (§8.9, class
  4), and earlier sets are kept while they fit §8.8's crown-and-atlas scratch.
* **Edits (LC-20, NF-D11).** `instance` events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move`
  replaces its position, `add` appends a user ordinal `u<n>` at `point`, `restyle` sets its `InstanceStyle`; for an
  ordinal-addressed event the dry run records the instance's generated position in `point`. **Resolution** runs in the
  generation worker whenever a commit touches an entity carrying overrides (re-running this function for that entity
  only): an override **applies by ordinal** when the entity's lineage is unchanged since the event — no `carry` lifecycle
  event and no supersession recorded after the event's `seq` (§6.3) — **and** that ordinal's generated position lies
  within 0.5 × the spacing of the recorded `point`; otherwise — a carried successor with a fresh lineage, a superseded
  entity (its overrides move to the `supersededBy` successor), or an ordinal that moved (a line edited at its start end) —
  it **re-matches by position** to the nearest generated instance within 0.5 × the spacing of `point` that no other
  override has claimed (candidates in (distance, ordinal) order, overrides in log order), else it is kept **orphaned** and
  reported (J-R24). Resolution reads each positional override's current position from its entity's `overrides` table
  (§2.7) — a `move`'s `to`, an `add`'s `point`, for a `line` layout the recorded generated `point` — which the event
  writes when it applies and a warp or vertex move displaces with the host face (§7.4); for stamp and grid layouts the
  recorded generated `point` stays world-anchored, as their instances are. An `add` stays while its point lies in the
  face (or within 0.5 × the spacing of its line), and is orphaned otherwise. Resolved overrides — ordinal, op, position,
  style, state (`byOrdinal`, `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows
  (§8.1, §8.9). A tree brush is a batch of instance events (COV-FTG-M04).
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and memoised
  per (key, revision, style version) for the session; they are never written to the document except as overrides. The
  generation worker runs the same function on the same shipped tiles for entities carrying overrides (to resolve them)
  and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest band with overrides applied and write
  each instance's position, species, crown diameter and leaf type (§11.1; VN-158, XB32); the bench computes tree
  statistics from it (SCL-21). Budgets: §12.7.
