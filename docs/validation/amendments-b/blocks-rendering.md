=== REPLACE ### 8.1 The display list (renderer-independent, columnar, incremental) ===
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
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 97 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  pinSeq: Uint32Array /* the pin's moveLabel seq (PinnedPlacement.seq, §9.1): the order of §9.2's pin pass */;
  knownTo: Uint8Array /* 0 public · 1 local · 2 secret: the target's knownTo (§2.5 to §2.7, with §7.7; a sealed plot's reads secret; a way, district, quarter, water, wood or gate label is public) — read by §9.2's knowledge filter and by nothing else */;
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
5. **Cache keys and render-time keys (LC-23).** Every derived artefact — roof geometry, label spine, footprint
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

=== REPLACE ### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===
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
  states: StateRow[];                                                    // decline, condition and layer-state classes (the table below); a family defines every row
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
interface StateRow {                 // one row per (kind, state) that §2.8's ladders and the state fields of §2.6 and §2.7 can produce; the shipped rows are the table below
  kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'plot'; state: string /* an Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7) or a plot's sealed exposure (§4.6) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[] }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
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
| entrance tick (`Entrance.role`, §2.6; item 29) | district and finer | paper | a tick across the footprint edge at the entrance vertex: `main` 1.5 px long at the outline weight; `side`, `rear`, `yard` and `service` 1 px at ½ the outline weight; at the building band the plan's door leaf | — |
| frontage treatment (`BuildingSlot.frontage`, §2.5; item 19) | district and finer | paper | a run along the main slot's frontage edge at ≤ ½ the outline weight: `lean_to` and `stall` as short ticks at bay spacing, `shopfront` a bar inset ½ px, `arcade` arcs at bay spacing; `none`, `gate` and `wall` draw nothing beyond the boundary treatment | — |
| passage arch (a `passage` face, §2.5; item 30) | district, neighbourhood | paper | an arch glyph on the front building's outline at each end of the face — where it meets its way and its court — 3 px wide at 1×, never below 2 px; the face's floor takes `road`; none at the city band, where the spanning wing's mass covers it (§8.5; J-A30.84) | — |
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
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple: the `ruined` state's program, with
the `none` roof kind, §2.6); `trace(kind)` (a footprint, ring or centreline drawn as a broken hairline with no fill — a
cleared building, a superseded wall's old line, a closed tunnel — at the district band and finer); `vault` (a barrel-vault
hatch along an underground cell's long axis over the `flat` roof kind, II.7.3); `symbol(glyph)` (a point symbol for every
`Pin.kind` of §2.7, for every `AccessPoint.kind` of II.7.4 where the point breaks the surface, for each end of a `passage`
face (an arch, §8.3) and for §8.5's change marker). Which states select these programs and which tone overrides they
take is the `states` table below, keyed by §2.8's ladders. A lane's body and casing end square at
the kerb of the way it meets; the junction wedge belongs to the higher-class way (GEO-21's renderer half). Hairlines and
casings are in paper px; ribbons and symbols follow the symbolisation table.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line, and clipped to the land faces in vector space before emission, so no contour
crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2)); `hillshade` runs on the same field.
VG-specific looks (spotlight vignette, dramatic forest) stay in the reserved `painterly` family.

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
enceinte's wall material. A material is a rendering attribute only (§2.6; item 19): its rows change colour and texture
roles and never a mark's geometry, so a `setAttr` of a material re-keys the same marks' look and moves nothing. The
view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
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
of the tile key (§8.8). Shipped: `live.selection` (overlay); `live.stale` (overlay: §8.5's change markers, one glyph per building or district whose
elaboration record reads `stale`, read from §2.8's records outside every digest; J-A28.81); `live.favourites` (base: the view state's `favourites` as a
thematic override); and, registered by the simulation module, `live.people` (overlay: favourite persons' positions from
the module's occupancy at the view-state hour, one categorical colour per person).

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code.

**Decline, condition and layer states (items 8, 11, 31; II.6, II.7; J-A8.81).** `StyleSheet.states` is a rule table
keyed by kind × state, read after an entity's programs are resolved: a `replace` row draws its programs instead of the
entity's at the row's bands, an `override` row lays its changes over them. The shipped rows, one set per family (`ink`
shown; `lit` and `hatched` keep the same geometry and glyphs with their own tones):

| kind | state (§2.8's value unless noted) | bands | row |
|---|---|---|---|
| building | `abandoned` (vacant) | all | override: roof tone lerped 30 % toward `ground`, no raised under-copy |
| building | `decayed` (derelict, roofless: `RoofSpec.kind 'none'`, §2.6) | all | override: no roof construction, the outline dashed by the entity-keyed pattern, fill at 60 % alpha |
| building | `ruined` | all | replace: the `ruin` program, with the `none` roof kind |
| building | `cleared` (a footprint trace) | district and finer | replace: `trace('footprint')` — a broken hairline, no fill; no mass at the city band |
| building | `reused` (a trace inside a garden, orchard or field part, or a shell under a new use) | district and finer | override: the trace drawn inside the host part's fill; a reused shell takes its new use's programs |
| building | `condition` `worn` / `neglected` (§2.6; item 31) | district and finer | override: `weathering` amplitude × 2 / × 4 and, at the neighbourhood band and finer, a roof `pattern` variant with patched courses — texture and colour only (item 19); no change at the city band |
| wall, gate | `abandoned` (neglected) | all | override: the wall stroke's casing dropped, its tone 20 % toward `ground` |
| wall, gate | `decayed` (breached or partly dismantled) | all | override: a gap glyph over each breached stretch; the towers of a dismantled stretch as trace discs |
| wall | superseded (`Enceinte.supersededBy`, §2.7) | all | replace: `trace('ring')` — the old line as a hairline lighter than a wall, under the new ring's stroke |
| tunnel (II.7) | in use, by `Tunnel.kind` | the underground layer | replace per kind: a cased band for a `main`, a hairline pair for a `drain` or `culvert`, a `passage` kind as a `main` with the arch glyph at its ends |
| tunnel | `abandoned` (silted) / `decayed` (caved in) / `ruined` (`Tunnel.closure` collapsed or sealed) | the underground layer | override: the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end |
| underground cell, vault (II.7.3) | any | the underground layer | replace: the footprint filled in `building`, the `vault` hatch for a vault class; access points and gratings as registry symbols on the ground layer where they break the surface |
| island (II.6) | `floating` / `waning` / `settled` (`SkyIsland.state`, §2.7) | the sky layer | override: none / alpha × 0.8 / alpha × 0.6 with the ghost share raised (§8.4); the shadow follows `elevationCm` by itself |
| island | `fallen` | the ground layer (the ruin face) | replace: the `ruin` program's rubble stipple over the ruin face |
| plot | `sealed` exposure (§4.6; item 30) | district and finer | override: the sealed passage's arch glyph drawn closed (a bar across the arch); the plot's buildings take their own rows |

No reference draws a declined, worn or hidden state (item 23): the rows are ours, they act only on an entity that
carries the state, and a town that never passes an epoch or a hand conversion renders as the references' would.
`builtBand` and the geometry floor (§4.11) are read by no render rule: condition follows `Building.condition`, and
labels and descriptions follow the prosperity field (J-P1).

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
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06; projected pass off), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in ink at α 0.5 on the roof colour, prism shadows at ink α 0.25 when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled | wings as ink outlines; the plan rung's storey (§8.5): walls by kind as hairlines (exterior at the outline weight, partitions at ½), openings as gaps with a door tick, windows as wall breaks, the stair core's flights, chimney squares, abstract furniture at ink α 0.5, room labels |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft projected shadows when on, hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light; the plan as `ink`'s, the storey's floor in the roof's lit tone |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching; the plan as `ink`'s |
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
names that script and its seed (§17.1 (5)); no third-party texture): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

=== REPLACE ### 8.3 Symbol catalogue and draw-style census ===
### 8.3 Symbol catalogue and draw-style census

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (§8.10);
clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer; tinted pattern textures with
per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph text with a role halo; a
point symbol for every `Pin.kind` of §2.7; screen-space furniture (§9.5); door ticks by entrance role, frontage-treatment runs and the passage arch (§8.2's rows;
items 19, 29, 30); trace hairlines, the vault hatch and the overrides of §8.2's `states` table; access-point symbols on
the ground layer (II.7.4); the change marker (§8.5). Every semantic visible at a band has exactly
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
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' cm coordinates and ranks in point-index order (§8.10) | all | as loaded in the generation and tile workers: equal to the stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| stamp-tile seams: per stamped class, all 256 2 × 2 arrangements of cells drawing its four tiles (every ordered pair side by side in both directions, every corner), for the full point sets and each band's rank subset (§8.10's r < s_b) | all | 0 pairs of points in different cells closer than r₀ (an integer test on tile cm); `plat/tools/stamptiles/` refuses to write a failing asset, and the PR tier re-runs the check on the loaded asset |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | 15–20 hatch triangles; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |
| states: every (kind, state) pair that §2.8's ladders, `Building.condition` and `SkyIsland.state` can produce resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand through every `DeclineOp` kind once (§4.11) draws every state's row |
| hidden courts (item 30): on B-CITY-lite seeds whose hidden share is > 0, every court face reached only through a passage (§4.6), at the city band | ink | drawn in `ground` under its block's masses and enclosed by drawn masses or outlines on ≥ 3 sides; 0 hidden plots drawn as `road` or `paper` voids; §8.5's figure-ground metrics within 0.01 of the same seeds at hidden share 0 |
| knowledge (item 30): a golden CITY rendered at the `public` tier and at `secret` (§9.2) | all | base tiles pixel-identical; the composed tiles differ only where label glyphs lie; at `public` no glyph run of a `local` name at the city or district band and none of a `secret` name above the building band; each tier's per-stop placement digests equal §13.3's |
| entrances (item 29): the golden views' district-band tiles | all | exactly one `main` tick per building, on its frontage or court side; every other tick on an access edge of its plot (§2.6's rules) |
| change markers (item 28): B-ZOOM over a document holding three `stale` rungs (a designation change, a re-let, a dossier event) | all | a marker at every band for each stale building and one for its district at the city band; none after the click; the base tiles unchanged by the marker |
| plots-only view (item 28; §8.5): the golden views at the city and district bands with `plotsOnly` on | all | every plot boundary drawn, 0 building marks; the default view's base tiles pixel-identical once the key is off |

=== REPLACE ### 8.4 Layers, shadows, heights ===
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
* **Toggles are visibility; existence is model (items 14, 15; II.6, II.7; J-A12.81).** The sewer control at CITY and
  METROPOLIS and the island view toggle set `LayerSpec.visible` of the `underground` and `sky` layers (the controls of
  §7.8); whether a network or an island exists is the model's — `Features.sewers` (II.7.1) and `recipe.layers.islands`
  (II.6) — so hiding a layer changes no digest and a toggle never creates what the settlement lacks. The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.7), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands inside the one underground arena (§2.1). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its projected shadow shortens by
  the ordinary projection below and §8.2's `states` row lowers its alpha.
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

=== REPLACE ### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint ===
### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical lanes
(below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields; quarter
labels (the city cut, §4.5, §9.4), water, major landmarks, gates. **district** — district names; footprints with
outlines, entrance ticks by role and frontage-treatment runs (§8.2's rows; items 19, 29); yards by role; boundary treatments; every way stroked; courts; greens; crowns; way names.
**neighbourhood** — the family's close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6).
**building** — wings and, once its plan rung exists (§2.6; item 28), the floor plan one storey at a time — the
per-viewer view key `storey` (§2.9) names it, default the ground storey, a basement or an upper storey by choice, the
other storeys' wing outlines faded beneath it — with walls by kind, openings and every entrance's door (§2.6's entrance
set), windows, the stair core, chimneys, abstract furniture by room role and room labels (§8.2's presets); a building
whose plan rung is `absent` draws its wings, a `stale` one its cached plan under the change marker below (J-A28.82). Way tiers: 1 = `through`, `primary`; 2 = `secondary`, `quay`; 3 = `lane`,
`cul_de_sac`, `alley`, `track`, `path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band
with hysteresis (entered at its threshold stop, left one stop past it); added detail cross-fades across that interval;
per-band detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM).

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and greens
   ≥ 0.3 ha show in `green`; enclosed courts stay `ground` and take `court` from the district band, keeping `ink`'s eight
   city-band tones, §8.2, N-25 — a hidden court reached only through a passage or a sealed one, §4.6, item 30, is such a
   court: it reads as a court behind the block's masses and never as a paper void, §8.3's census row), so inside the built area streets and squares are the only `road`-role voids.
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

**Views that are not the default (items 28, 30; J33 of `docs/PROGRESS.md`).** `plotsOnly`, a per-viewer view key
(§2.9), is the cadastral view: at the city and district bands it draws every plot's boundary (§2.5's cadastral outline
group) over the block ground and no building mark — masses, footprints, entrance ticks and roof detail off; walls,
ways, water, greenery and labels as they are. It is never the default: the default at city zoom is every footprint, MFCG's look, as J33 rules (§4.1).

**Change markers (item 28; J-A28.81).** A building whose elaboration record (§2.8) reads `stale` — an input of its wings
or plan rung changed since it was derived (§4.1) — carries a marker glyph at the building, neighbourhood and district
bands; a district holding any stale building carries one marker at the city band, so the user sees where the simulator
or the dossier has moved on and clicks at their own pace. The marker is the `live.stale` overlay layer (§8.2): composed
onto the tiles without re-rastering a base, never hashed, read from the records outside every digest; it vanishes when
the click re-derives the rung by mutating the cached state (§7.3).

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band —
with no S9 block preview on the one-click path (SCL-4; J-R7). Lazy work is only what the city band does not draw: yard
sub-parts, entrances, roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10), and the stage-3 rungs — wings and plans — by
click or by view (§4.1).
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map.

=== REPLACE ### 8.6 Stage-2 render tier and stage-3 LOD ===
### 8.6 Stage-2 render tier and stage-3 LOD

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family, and
the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user opening a
district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived on demand for the visible
tiles from the district's committed state and sub-seed — in the derivation pool, or in the generation worker when the
pool is off (it needs the kernel and the model) — and reaches the tile worker as `DisplayDelta` slices answering the
tile's band request (§8.9), into the same mark tables and tile pyramid. Stage 3 plugs in at the building band: marks
from `BuildingGenerator.compose(…)` and `plan(…)` (taking a `Kernel` and a `BuildingInput` with a `TerrainSampler`,
§2.6), derived there — on a click, or, under `elaborate: 'view'`, for the visible tiles (§4.1) — and kept in
the elaboration cache (§2.9: one entry per (building, rung, input digest), held by the generation worker and persisted as
non-canonical chunks), the only cache of derived rungs — no per-session (entity key, revision, lod) memo beside it; a
rung whose record (§2.8) reads `stale` is served from the cache until the click re-derives it by mutating the cached
result (§7.3; item 28 (c)); the tile draws the outline until its compositions arrive, and every other band draws the outline, which equals the
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

=== REPLACE ### 8.9 Backends, text, threads and the worker boundary ===
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
  `bbox`, `group` — all a hit test or a features-in-view list reads), holds the elaboration cache (§2.9), and hands stage-3 `compose()`, `plan()` and close-up
  derivation (§8.6) to the derivation pool — on a click under `elaborate: 'click'`, on the tile worker's band request
  under `'view'` (§4.1). (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
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
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks; the buildings whose rungs the band needs (`compose()`, `plan()`) — derived on the request under `elaborate: 'view'`, and under `'click'` served only from the elaboration cache (§4.1, §8.6) | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, `plan()` storeys, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model or the visible region changes | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers), the shadow sun, the light step and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile and vector backends (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
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
  interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }   // the SVG writer (§11.1): runs in the generation worker over the export's transient list
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

=== REPLACE ### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally ===
### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the label faces of §8.2, §17.2): `cmap`, `hmtx`,
  `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp` (small caps) and `onum`
  (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and kerning in font units
  become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin, ligatures off). Glyphs
  are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every backend and in SVG.
* **Font features, checked (N-12).** From M1 a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the same
  reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled to
  0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar uses the
  face's default figures. The style report names the path each face took, and the census's floors (§9.4) run on
  whichever path is active (J-R37).
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box
  × the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14);
  both implementations, what they call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist
  lint, so S13b's inputs are bit-identical on every engine and §13.3's placement digests compare across the five engines;
  a symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`. Between stops the view uses the
  placement of the stop at or coarser than the current scale: zooming in only shrinks every label's world box, so no
  collision can appear, and crossing below a stop switches to that coarser stop's placement. Zero collisions therefore
  hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band whose layer
  is visible (`LayerSpec.visible`, §8.4 — a hidden underground or sky layer's district, tunnel and cell labels are not
  candidates) and that the **knowledge filter** below admits, minus the labels §9.4's rung (5) hands to a quarter at this
  stop, plus the quarter candidates rung (5) creates (§9.4; N-11). Rung (5) is decided from geometry alone and the
  filter from one byte per row, so the set is known before any collision is tested.
* **The knowledge filter (item 30; the label policy's home; J-A30.81).** Knowledge is separate from geometry: a hidden
  or clandestine place is always on the map — its faces, masses, walls and doors draw at every band like any other — and
  what the map withholds is its name and its purpose. Every label row carries its target's `knownTo` (§8.1: `public`,
  `local` or `secret`, from the plot's, building's or institution's record, §2.5 to §2.7, with §7.7; a `sealed` plot's reads
  `secret`, §4.6; ways, districts, quarters, water bodies, woods and gates are `public`), and every viewer holds a
  **knowledge key** — the per-viewer view key `knowledge` (§2.9, §11.3): a tier `public`, `local` or `secret`, and
  `places`, the addresses of the places the viewer has learned. The table admits a row at a stop; the band is the stop's
  (§8.5), and a row is never admitted at a band its `lodMask` excludes:

  | the target's `knownTo` | tier `public` | tier `local` | tier `secret`, or the place in `places` |
  |---|---|---|---|
  | `public` | at its kind's bands | the same | the same |
  | `local` — known to those who grew up there | the neighbourhood band and finer only | at its kind's bands | at its kind's bands |
  | `secret` — known only to those who were told | the building band only, on that building's own view | the building band only | at its kind's bands |

  The filter is applied to the rows before rung (5) and before any pin or collision is tested, so the greedy's local
  evaluation is unchanged; a withheld row is not a candidate and blocks nothing, its area or way being labelled — where
  rung (5) allows — by its public quarter. A pinned or user-hidden label (§9.1) is filtered the same way. `knownTo` is
  model data (`setAttr(knownTo)` is a logged event, §7.1; a dossier-backed place's value is the dossier's, §7.7) while the
  knowledge key is view data, so the model digest never depends on who is looking; the reader — hover, the gazetteer, `hit` and
  `inView` (§11.2), the legend (§9.5) and every export (§11.1) — withholds the same names by the same table. No reference
  has knowledge or hidden places (item 23): every row of the references' towns is `public` and the filter admits all.
* **The greedy.** Candidates at a stop are totally ordered by `priority` (the numeric `LabelEntity.priority`; by default
  quarter / district > water > landmark > gate > way > address), then larger target area (`areaM2`), then id. A
  candidate takes its first alternate (its spines in order, then §9.4's ladder) that meets no placed higher candidate, no
  obstacle and no fixed pin; otherwise it yields. This whole-map greedy is **evaluated locally**: deciding c first
  decides (memoised) every higher candidate whose alternate boxes meet c's; the dependency graph is acyclic because the
  order is strict, so the result is the same whichever tiles are computed first and whatever the viewport.
* **Resumable placement.** S13b runs as a job the tile worker can stop between any two units and resume, as it does a
  raster (§8.9). Its input is the label rows, not the model record:

  ```ts
  // @plat/model (§14), beside LodBand, Role and ZoomStop: the rows S13b reads — §8.1's LabelTable with the StringTable and GeomTable
  // ranges it indexes. The tile worker's display list and each export's transient list implement it; LabelEntity stays the model record S13a writes and S14 reads
  interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }
  // @plat/labels (§14 points here)
  interface LabelPlacer {
    begin(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob;
    place(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet;   // begin(…) then step(Infinity): SVG exports and tests
  }
  interface PlacementJob {
    step(deadlineMs: number): boolean;   // runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after this call began; true when the stop's placement is complete
    result(): PlacementSet;              // once step() has returned true
    cancel(): void;                      // drops the job; the memo entries it wrote stay valid (keyed by stop, candidate id and revision)
    readonly spentMs: number;
  }
  ```

  A **unit** is one of: the rung-(5) test of one `LabelTable` row (building the candidate set); one pin of the pin pass
  (below); one step of the local evaluation, which runs on an explicit stack instead of recursion — push the highest
  undecided candidate whose alternate boxes meet those of the candidate on top, or, when every such candidate is
  decided, decide the top (its first alternate that meets no placed higher candidate, obstacle or fixed pin), write the
  memo and pop; or the glyph layout of one placed label. The job takes the scope's candidates as roots in the strict
  order, pins first, so most roots find every higher neighbour already decided and push nothing. The stack and the memo
  persist between steps, so the job can stop after any unit, and every decision reads only candidates already decided,
  so where the steps fall never changes the result: a stop placed whole and placed one unit per step give identical
  placement digests (§8.3, §13.3). A unit costs ≈ 1 µs on average and tens of µs at most (a long name trying every spine
  and rung), so a step overruns its deadline by one unit. The view's job reads the tile worker's list, which deltas
  change between steps: a delta applied between two steps drops the memo entries its dirty boxes invalidate
  (*Incremental*, below) and, when it changes a label row or an obstacle of the job's stop, the job is begun again,
  keeping every memo entry left valid. An export's job reads its own transient list, which nothing changes (§11.1)
  (J-R51).
* **Pinned labels (N-28).** A pinned label (`LabelEntity.pinned`, §9.1) is shown only in its bands. At its own stop and
  at every finer stop it is placed exactly as the user left it, before any other candidate, by the **pin pass**: the
  pins eligible at the stop — in their bands, with their own stop at this stop or a coarser one — are taken in the order
  of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1), and each whose box at the stop meets no
  pin already fixed there becomes a **fixed pin** — an obstacle every candidate avoids. A pin whose box meets an already
  fixed pin is not fixed at that stop: its only alternate is its own placement, which the fixed pin blocks, so it is
  **hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k"). The pass is a greedy in a strict
  order, evaluated locally like the main greedy — deciding a pin decides, memoised, every earlier pin whose box meets
  it — so its result does not depend on which tiles are computed first. A pin's box is sized in pixels, so zooming in
  only shrinks it in world units: a pin fixed at stop k meets nothing at a finer stop that it did not meet at k, and a
  pin hidden at k is fixed again at the finer stops where the two boxes part. `moveLabel`'s dry run (§7.1) refuses a
  placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position as
  the conflict's action — the **interactive guard**; the pin pass is the guarantee, because pins also come together
  without a `moveLabel`: a warp or vertex move carries them with the ground (§7.4), a `setAttr` rename or an ids-scoped
  `rerollLayer(naming)` lengthens a pin's text (§9.6), and a `setStyle` changes the label face's widths. At a **coarser**
  stop a pin's world box grows, so it is not fixed there: it keeps its anchor and spine and enters the greedy as a
  candidate, at its entity's priority, whose only alternate is that placement — drawn when it meets no higher candidate,
  obstacle or fixed pin, otherwise hidden at that stop and reported ("pinned label hidden at stops coarser than k").
  Zero collisions therefore hold at every zoom with pins included (J-R26, J-R45). **Test (B-ZOOM, §13.4):** two pins
  20 px apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text —
  at every stop 0 collisions, the later pin reported hidden at the stops where the boxes meet, and the per-stop placement
  digests (§13.3) identical after a replay of the log.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision) and held per knowledge key (a changed key re-places the
  stop); a stop's placement digest (§13.3) is therefore per (stop, knowledge key), the goldens taken at the `public` tier
  with no `places`.
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10):** §12.7 — in the tile worker from the label rows alone (§8.9); an export's placement in class-4
  steps (§8.9).

=== REPLACE ### 9.5 Furniture, framing and tools ===
### 9.5 Furniture, framing and tools

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); a 100 m bar is accurate to 0.5 % at
  every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town: its stream is keyed from
  the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass` and that
  concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws
  the same compass. **Auto-placement:** candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. The covers are
  computed where the display list is — in the tile worker, by `ObstacleSource.coverage` per candidate box — and reach
  the main thread through §8.9's furniture query. Dragging places the compass and the wheel rotates it; both are view
  state (§11.3) and pin the compass. Its view key `compass` is `trueNorth` (default: the needle points at model north,
  whatever the view's rotation) or `free`; the map's own rotation is the `rotation` view key about the frame centre
  (§2.9, §7.1: MFCG's Rotate as a view rotation, never a model change).
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT, the export's declared grid, §11.1); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** its text is the `title` label entity (§9.1); it is placed in the emptiest corner (NG's rule: the corner
  whose box covers the least mark area, the sum of its `coverage` record from the same furniture query); movable.
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem (the numbered and lettered lists honour §9.2's knowledge filter: a
  place the viewer's key does not admit at the stop gets no number, no letter and no row, item 30); border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d). Position, mode and border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a
  minimal generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or
  ordinaries (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge
  (roundel, lozenge, mullet), keyed from the town root's entity key with the concern `naming.emblem` and its salt
  (rerolled by `rerollLayer('naming.emblem')`); off by default; drawn in the legend or a corner (J-R13).
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode
  for a polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list
  index (8 px radius) — `RoleIndex.snap` in the tile worker, reached by §8.9's snap query and answered within one frame,
  the unsnapped point shown until the answer arrives; exact in world centimetres; a measurement is view data and can be
  saved as an annotation.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI
  scale; device pixels are handled by the tiles.

=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `unit` — the address of the household whose dwelling unit the room belongs to, or `shared`, `service` or `circulation` — and the unit's entry opening), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves), windows, stair cores and chimneys, with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's and a building's `exposure` and `knownTo` (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (§9.2 and §11.3) are withheld, the feature staying in the file; a fallen island's archived arena is not exported (II.6) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island; the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge`, `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` and an underground cell as a `Building` whose base lies below the datum (items 12, 29); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | — |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**Knowledge (item 30; J-A30.83).** Every export takes the requesting viewer's knowledge key with the view state (§11.3), so
a shared SVG, PNG, VTT scene or GeoJSON carries no name and no purpose of a local or secret place the key does not admit —
the place itself, its faces and its doors, stays in the file (§9.2).

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`). *SVG* needs a display list and label placement at the
export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's list (§8.1 item 6):
the SVG exporter builds a **transient list** for the export's band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — writes the file and releases the list (time: §12.7; the list is §12.8's export-time
peak). A district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly, streams the encoded bytes
and a progress message per band back, and releases the list; the generation worker wraps the VTT scene around the image.
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard` and `service`, each 1.2 m wide) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g).
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; the walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

=== REPLACE ### 11.2 The embedding API and the worker boundary (SCL-6) ===
### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[]): Promise<ApplyResult>;                    // an event may arrive with its `fates` filled (below)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown): Promise<ApplyResult>;                          // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (below)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query): Promise<QueryResult>;                                     // gazetteer, hit-test, whereIs, fates; ≤ 64 KB per page, paginated (kinds below); local and secret places' names withheld by the knowledge key (below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
}
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */ }
  | { status: 'conflict'; actions: ConflictAction[] }                // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */ };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number } | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number };               // the full fate list of a pending confirmation, then its renames
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83).** `query` answers — `gazetteer`, `hit`, `inView` — and hover content list every entity in
scope with its kind, address and geometry, but withhold the `name` and the purpose of a place (its `use`, or an
institution's kind) whose `knownTo` (§2.5–§2.7) the view's knowledge key does not admit under §9.2's table, marking the row
`withheld: true`; a secret place is admitted on its own building view. A content provider (§14) answering through `query`
gets the same filtered rows. A host that holds the dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking.

**Confirming fates.** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the report's new entries, §5.4: placement rejections and positive placements with their lapses, use openings, closings and relocations, mutation records and disruption reports; items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).

=== REPLACE ### 11.3 The host bridge — the host is the store (FTG-12) ===
### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist) and `MessagePortTransport` (any relay — a browser-extension content script, a SharedWorker, a
  chat-bus relay; COV-FTG-N06). Envelope: `{ plat: 1, type, session, seq, logHead?, body }`. The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }`, `query.result`,
  `report.changed { entries }` (§11.2's report event). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
  patches or proposes a change to the host's dossier: `doc.changed` carries map-document events only, `report.changed` the
  map's report, and the vocabulary has no message that addresses the dossier; a dossier change reaches the map as
  `doc.apply` events with `author: 'host'` and `EditBase.dossier` set (§7.1, §7.7, §11.4), in the host's order — the ordered
  dossier history of item 22 (c) — and the host stores the returned document as an opaque artifact of the map (item 20 (d)).
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** The document's view keys (§2.9's view section, outside the model hash; each last-writer-wins by
  (Lamport counter, session id)) travel as `view.set` / `view.changed`. The view key `time` is set by `view.set { time }`
  and advanced by the module-tier message `sim.advance { hours }` (§10.3). The per-viewer keys `knowledge` (§9.2: a tier
  `public`, `local` or `secret`, and `places`, the known places by address), `elaborate` (§4.1), `storey`, `depthBand` and
  `plotsOnly` (§8.4, §8.5) travel the same way. A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load`. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event; J-DET-42); every other client takes the replayed town for its own working state,
  reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget;
  counted in §12.8) until the mismatch is settled or its session ends; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (the install mechanics: §2.9 step 4); under
  §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation, a client
  still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without
  asking — so every client converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one — a host's
  own commands with `author: 'host'` (§7.1's `EditBase`); no bridge command changes the model any other way. Undo and
  redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's
  `session` is their `EditBase.session`, and a client never truncates a bridged log. A provider output refused at §2.9's
  cap returns the requesting edit as `doc.rejected { reason: 'invalid', conflicts }`.

=== REPLACE ### 11.4 Host inputs (DEF-11) ===
### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, character,
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged — a dossier change arrives as such events with
`author: 'host'` and `EditBase.dossier` set (§7.1), in the host's order, and mutates the current map under §7.7's dossier
contract (items 20, 22); a dossier's designation of a place as `local` or `secret` is one such input
(`Assignment.knownTo`, §7.7, which §9.2's label policy reads); no door opens the other way — the module never writes to
the dossier (§11.3); (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a registered `ContentProvider`
(§14), accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay; an output
that would pass §2.9's cap on pack data and host content is refused at the call as §2.9 states. So a document never needs
its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made deterministic by the
check and the record. The mapping of SettlementForge's own data onto these doors is staged (*Staged by the owner's roadmap*);
this contract is its hook.

=== REPLACE ### 12.4 CITY per-stage split (SCL-3) ===
### 12.4 CITY per-stage split (SCL-3)

Each stage's mechanism is its stage section's (§4); this table holds the work and the time each budget assumes.

| stage | mechanism | work at CITY; rates the budget assumes | p50 |
|---|---|---|---|
| S0 blueprint | parameter expansion, stream set-up | — | 2 ms |
| S1 site | §4.2 S1 (1), (3); hydrology grid §2.3; no contours here (extracted per render tile, §8.2) | ≈ 0.3 M noise evaluations at ≈ 27 ns; ≈ 102 000 hydrology cells (flood, flats, D8 and accumulation measured 15.9–17.2 ms, `fixall_kernel_r2_hydro.out`) | 25 ms |
| S2 / S3 programme, siting, reservations, the stage-1 boundary and trace | §4.2 S2–S3, §10.2; the S4 lattice and edge costs are built here (§4.3) | the roster on its Δ = 10 grid (≤ 100 classes); ≈ 2 000 candidate centres; the plaza-rooted Dijkstra and the gate-route solves ≈ 7 ms; the one travel-cost field `T` with the stage-1 level set, gates, castle weld and trace ≈ 4 ms (+ ≈ 4 ms only when a moat is carved and `T` is recomputed after S3's L0 batch) | 16 ms |
| S4 backbone | §4.3 (the lattice built at S3; S3's shortest-path tree reused for every plaza-anchored route at epoch 0) | ≈ 46 000 nodes | 10 ms |
| S5 growth (S5a–S5d per stage) | §4.4 (later boundaries are level sets of S3's one travel-cost field, re-settled incrementally — no per-stage field) | ≤ 8 µs per insertion including snap, attraction and re-walk (the first M0 measurement); ≈ 5 000 proposals | 40 ms |
| S6 districts + fields | §4.5 | 3 × 62 500 cells | 17 ms |
| S7 fortification furniture | §4.8 (one L1 batch per enceinte) | — | 4 ms |
| S8 infill | §4.6 | ≈ 1 500 cuts at ≈ 12 µs per cut | 20 ms |
| S9 corridors | `corridorUnion` on the kernel's arrangement per district (§3.7) — one engine on every host, no WebAssembly | per district: the kernel's M0 bar (§3.7) | 25 ms |
| S7b district and S10a block allocation (eager, LC-2) | §4.5, §4.7 | ≈ 80 classes × 25 districts | 8 ms |
| S12a hinterland siting (eager, no geometry) | §4.9 | — | 1 ms |
| S10 (0) shared-edge bands (eager, before the freeze; J-I9) | §4.7 S10 (0), §3.3 (then the rebuild of the L3 static partitions it touched) | ≈ 3 ms for the bands on the wall traces and ≈ 6 km of perimeter (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; build rate measured, `fixall_kernel_r3_bench.out` A) | 5 ms |
| S10 + S10b + S11 + per-district greenery (pooled) | §4.7, §4.9 | S10 ≈ 10 µs per plot of geometry plus ≈ 2 µs for the context vector (distance rasters at 16 m: ≈ 7 ms once); S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15); mean ≤ 6 µs; yard planting and parks ≈ 1 µs per plot; S10b's relation and supply scoring (§4.7; item 16): one more distance transform per producing class present (≈ 10–30 classes at CITY, ≈ 4–10 ms once, PLAUSIBLE) and ≤ r relation rows per candidate at O(1) raster reads each, absorbed in this row's p50 within its imbalance margin until M2b measures it (below); ≈ 116 ms of work on ≈ 5 500 plots, on 3 workers with 25 % imbalance | 48 ms |
| the hinterland unit's S10–S12b (generation worker, concurrent with the pool) | §4.1, §4.9 | ≈ 1 600 FTG-sized furlongs (≈ 2.5 ha) in the 39 km² margin at ≈ 8 µs per insertion (≈ 12 ms); outside lots and driveways ≈ 3 ms | (≈ 15 ms, hidden by the pool) |
| merge | §4.1, §3.3 (the frozen arena copied once to each pool worker; the overlays and the hinterland unit merged in lineage order) | copies ≤ ≈ 15 MB each with the static index partitions, ≈ 1.5 ms each (measured, `fixall_kernel_r4_bench.out` A) | 13 ms (8 merge + 5 copies) |
| the sewer network and underground stages (owner-staged; II.7.2, II.7.3) | II.7 | not on the one-click path until they are built and registered; measured at their intake — the drain connection's distance query counted with S10b's rasters, the underground cut at S10's per-plot rate on its own arena; a hidden layer costs nothing to draw | (staged) |
| S13a names + label candidates | §4.10, §9 | ≈ 3 500 names, ≈ 60 skeleton spines, way-label anchors, address numbering, names for every quarter-tree node | 12 ms |
| statistics core record | O(n) counts, sums and histograms (the expensive metrics on demand or in the bench; SCL-21) | — | 4 ms |
| model digest | per-batch digests inside each stage (SCL-1); finalisation | — | 5 ms |
| **critical path** | | | **≈ 255 ms p50; p95 ≤ 300 ms** |
| S14 city band (outside the model budget; counted in the first frame) | columnar build for every district (§8.1) | ≈ 60 000 marks | 20 ms |

Stated assumptions: stage rates include stream-key derivation at ≤ 0.1 µs per key (§6.1; the rows were costed at
0.3 µs, SCL-12), model-digest maintenance ≤ 5 % of each batch's time with finalisation ≤ 5 ms and a full recompute
≤ 150 ms at CITY (§6.2), and no whole-level static index rebuild per commit (SCL-2). There is one geometry engine on
every host (§3.7): S9 and S11 are budgeted once, for it, and the generation report names the engine that ran (SCL-22).
The single-worker CITY path is ≈ 334 ms p50 (the pooled 48 ms becomes 116 ms, the hinterland unit's ≈ 15 ms joins the
critical path, and no arena copies are made). METROPOLIS: raster and lattice work × ≈ 2.6 (frame area), entity work
× 2.5 — ≈ 609 ms p50 with the pool (copies ≈ 37 MB, ≈ 3.9 ms each, measured), ≈ 801 ms single-worker. TOWN: ≈ 76 ms p50
with the pool. The rows stay PLAUSIBLE until the fusion gate and the M0 site-and-fields spike measure them; the p95 laws
of §12.3 are the budget.

**Re-declared rows (items 16, 26; J-A16.81).** S10b's scoring is measured at M2b on B-CITY-lite, where the relation
templates and the one solver ship at generation (§4.7, §16); if the pooled row's p50 then exceeds 48 ms it is restated at
the measured value and §12.3's p50 column with it — the p95 laws are the budget and stay where they are. The hinterland
unit's row is unchanged: item 26's "drawn after" is a dependency order the pipeline already realises, and the unit's concurrent
execution stands (J-A26.41).

**M0 site-and-fields spike** (beside the fusion gate, which covers S4 + S5 + S8): S1 + S4 + S6 ≤ 50 ms at CITY with these
mechanisms, starting from redteam-scale §7's scripts. Pre-decided fallback: raster cells coarsen one step (fields and the
margin 32 → 48 m; hydrology 25 → 32 m at CITY, METROPOLIS 32 → 40 m, TOWN 16 → 20 m) and the spike re-runs.

=== REPLACE ### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) ===
### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (§12.5's re-raster rate);
  edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Assignments, dossier events and the evolution hooks (items 16–22, 30, 31; PLAUSIBLE until M3a's B-EDIT sequences
  time them):** a post-build placement of one item — an `assign`, a `placeAt`, a dossier addition or the re-placement a
  `rejectSite` triggers (§4.7 S10b, §7.7) — ≤ 30 ms of model work at CITY, one multi-source Dijkstra per provider class
  over the L1 way graph included, plus one designation mutation per placed plot (§4.7 S11) at the single-plot edit's
  bound above and the deltas; a use opened, closed or relocated by hand (§4.11) at most two such mutations; a
  `sealPassage` or `openPassage` the block's re-derivation at the scoped-regeneration law; a terrain or water conversion
  (`reclaim`, `silt`, `shiftCourse`, `digCanal`) the coarse-edit bound below; a due block's re-cut (fusion or splitting,
  §4.11, through §7.1's `split` and `join`) a block regeneration of its buildings with its neighbours fixed; `resizeIsland`,
  `settleIsland` and `fallIsland` their footprint like a carve; a `relet` one plan re-cut (§12.7). The hooks' rows are
  measured with the engine (M4), the base's hand forms at M3a; a miss re-declares the row for the owner's veto (D-18).
* **Coarse edits** (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences): a course-knot, moved-shore or
  drawn-water edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing
  search ≈ 1 ms, the L1 batch of kept-way routes, deck vertices and cuts ≈ 5 ms, S4 re-route of ≤ 3 arterials ≈ 5 ms, S5
  regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs
  per re-based entity + the field-brush law for the blocks its drivers re-derive.
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (a B-EDIT test:
  TOWN → CITY from M2a, TOWN → METROPOLIS from M2b, §13.2).
* **Replay and load verification (N-16, N-1).** A replay (§7.3 item 2's replay mode) folds the log on the model through
  the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta at each event
  that re-derives names costs ≤ 3 ms per such event. Its cost is therefore a sum over the log, not a constant:

  V = M(B) + Σ c(e) + S14(B) + 5 ms

  where M(B) is §12.3's model law for the document's size (the recipe is replayed from S0; checkpoints are session
  memory, §7.4, and are not saved), S14(B) ≈ 4 µs × B is one display-list build, 5 ms finalises the model and records
  digests, and c(e) is each event's replay cost — its model scope cost, plus succession matching (§6.3's budget), plus S13a's delta when it re-derives names: ≤ 0.5 ms for an event that re-derives nothing (attribute,
  label, lock, pin, style and table-row edits whose slices no entity reads); ≤ 8 ms for a plot-scale edit;
  ≤ 3 ms + 60 µs × the buildings in scope + matching + 3 ms for a scoped regeneration, a local operator (§7.3) or an
  epoch; ≤ M(B) for a Re-derive from Sk. For the **reference verification mix** of 300 edits on a CITY document of
  5 200 buildings — 200 light edits, 80 plot-scale edits, 15 block regenerations of ≤ 60 buildings and 5 district
  regenerations of ≤ 450 buildings — V ≈ 1.4 s p95 (`fixall_rendering_r2_budgets.out`); a log of 300 district
  regenerations takes ≈ 11 s. Verification never delays the picture or an edit (§2.9 step 3, which holds open-to-editable
  ≤ T(B); the recomputation of the saved copy's model and records trees measured ≈ 35–38 ms at CITY on a synthetic
  document, `fixall_det_r4_loaddigest.out`, `fixall_det_r5_recordsdigest.out`); the report shows the law's estimate and
  the progress. B-EDIT times the reference mix at M2a (pass: ≤ V + 10 %); pre-decided fallback: the per-kind costs c(e)
  are re-declared at their measured p95 and the reference mix's V restated here, reported for the owner's veto (the
  verification wait is off the path to the picture, so no mechanism changes) (J-R36).
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8); Apply ≤ the scoped-regeneration
  budget of the touched faces, counting §2.6's wing carry and check inside the whole-step validation — ≈ 0.4 ms per
  validation pass for 450 buildings on an assumed core mix and ≈ 3.6 ms in the worst case of a step and eight halvings
  (`fixall_pipeline_r5_wingcost.out`; §2.6 rule 4). *Measurement (M3a):* the Apply time of a 150 m brush over a CITY core
  on B-CITY-lite seeds, the carry and check counted. *Pre-decided fallback* if it exceeds the budget: the wing check
  leaves the whole-step validation — it runs once after the final step, and a building that fails it is re-derived by
  S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6 rule 4).
* **Proxy thumbnails:** §7.8's budget.

=== REPLACE ### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===
### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates — ≈ 1 µs per candidate, the rate an export's placement is budgeted at too — run in resumable steps of one
  decision (§8.9, §9.2), the knowledge filter a one-byte test per row inside the candidate set's unit, no pass of its own; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (measurement and fallback: §8.9).
* **Trees:** placement ≤ 1 µs per instance (stamp, scale, rounding and point-in-polygon) and drawing ≤ 2 µs per instance
  as a sprite (§8.10). A district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles, and
  its tiles raster in ≤ 30 ms of tile-worker time (O19 e); the 200 000 trees of a METROPOLIS are never all instantiated —
  only visible tiles generate instances. The stamp-tile asset (§8.10) is loaded and hash-checked at worker start in
  ≤ 5 ms per worker per session, never on a settle (≈ 0.03–0.06 ms for 8–16 classes, measured cost model,
  `fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run time, so the first zoom to the district band
  carries no library build. **The crown library:** its build (20 crowns per class per style, once per session) and, in
  `lit` with a `path` sun, each light step's bake run in the tile worker as one-sprite units (§8.9), ≤ 20 ms of
  tile-worker time per (style, light step) for eight crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D,
  ≈ 3–10 ms for 160 sprites), started when the style loads so the first district-band raster finds it ready; a light
  step's bake runs at the head of §8.4's light pass, inside its settle bound. Measured with M2b's moving-sun runs (§8.4),
  where `lit` ships; pre-decided fallback: §8.4's (with a `path` sun the lit programs and the crowns hold the sheet's fixed
  sun, so the library is baked once), reported.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing, with the list
  released after it (§11.1). Inkscape opens it within §11.1's CI bound.
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine **with the view idle**, the peak canvas one tile
  band. Inside it: the transient list's build in the generation worker (≈ 4 µs per building at the city band — ≈ 21 ms
  at CITY — and more at the finer band a large print's scale selects; §8.7, §11.1); the export's placement in the tile
  worker (≈ 1 µs per candidate in the frame — ≤ 20 ms for 20 000 candidates, more than a whole CITY's label rows at any
  band: ≈ 3 500 names, §12.4, one address per building and the repeats of long street names — in class-4 steps, §8.9);
  and the encoding (§8.8's per-row filter rule, then the deflate), measured on a synthetic A2 map in Node 24
  (`fixall_rendering_r5_png.out`) at 3.5 s for flat `ink`-like colours, 5.4 s under smooth relief shading and 10.5 s for a
  textured `lit`-like look, of which the filter pass takes 2.7 to 3.4 s and the deflate the rest (PLAUSIBLE for browsers,
  whose filter pass is the same JavaScript and whose deflate is native code behind `CompressionStream`). View work
  pre-empts the export's steps (§8.9), so a pan or zoom during an export lengthens it by that work, which the export
  dialog's progress shows, and an animated view still leaves it one step in every 100 ms.
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at the
  city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths per
  (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a district-band
  SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time miss is answered
  per host, the same pixels in a larger file each time: **on every host** the row filter is fixed to type None for every
  row instead of §8.8's per-row rule — on the synthetic A2 the filter pass disappears and the unfiltered rows also deflate
  faster, so encoding falls from 3.5, 5.4 and 10.5 s to 0.6, 1.3 and 4.4 s for the flat, relief and textured looks, the
  file 4 % smaller to 10 % larger; **in Node**, whose `zlib` takes a level, a miss that remains deflates at level 3
  instead of 6 (a further 0.35–2.5 s on the synthetic looks, the file 8–51 % larger); **in browsers**, whose
  `CompressionStream` takes a format and no options — in Node 24's implementation of the same standard a `{ level }` option
  is ignored, 5.3 MiB with none, level 1 and level 9 alike — a miss that remains after the filter change re-declares the
  PNG budget at the measured p95 as a D-18 amendment for the owner's veto. On the synthetic looks None is faster than the
  fixed Sub filter and no larger (Sub spends ≈ 0.2 s filtering, deflates as slowly as the default, and its files are
  7–30 % larger than the default's), and the per-row rule gives the smallest file wherever rows carry gradients or
  texture — 6–9 % smaller than None's on the relief and textured looks (J-R53).
* **Export beside the view.** B-CITY's browser run at M1 adds, in §12.1's timing phase, a scripted pan and zoom during an
  A2 300-dpi export of a CITY, and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one
  step per frame — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte,
  the export made with the view idle, one during which an edit is made (§8.9, §11.1) and, for the `lit` export, the
  export made with the sun stopped at the request's time; pre-decided fallback: §8.9's `step(4)`.
* **The stamp-tile load** is timed with the first map at M1, per worker from worker start to the library ready;
  pre-decided fallback on a miss: the per-session hash check moves to CI and the release build, leaving typed-array views
  over the bundled bytes.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §12.4's S11 row; the kernel's M0 bar, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
  building median and its registration re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7);
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one
  tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool when the user clicks — or, under `elaborate: 'view'`, on the
  tile's band request (§4.1) — one plan for each click, inside a single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, opening the storey's transient arena (O(seed vertices)), the cuts and the
  read-back (§3.4). A re-cut of a `stale` plan (§7.3; item 28 (f)'s interior ladder, §2.6) runs as a chain of such
  steps — one per interior row or household changed, its length known before the first open, since the ladder has
  five rows and `relet` moves one household at a time (§4.11) — budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps
  p95. PLAUSIBLE until B-PLAN's spike (§13.2, §16) times it on its fixtures and the stage-3 intake confirms it;
  pre-decided fallback for a class that misses: its wing-local module row doubles (50 → 100 cm), a declared view shift
  (§13.3, a plan being derived data), and the measurement re-runs; a miss at run time is reported, never answered by a
  coarser plan (§12.1).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

=== REPLACE ### 12.8 Memory (what is counted, per rung) ===
### 12.8 Memory (what is counted, per rung)

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately by §8.8's canvas budget, which depends on the viewport, not the rung.
**Model working set, all threads, excluding canvases:** TOWN ≤ 40 MB, CITY ≤ 110 MB, METROPOLIS ≤ 260 MB.

What each thread holds is §8.9's (the tile worker holds no model) and §8.1 item 6's (the display list, ≈ 10 MB at CITY,
in the tile worker; the 24-B-per-mark index, ≈ 1.4 MB at CITY, in the generation worker); the tile worker also holds the
decoration memo and the placement memo, its glyph atlases and crown sprites being canvases; the derivation pool holds its
per-worker overlays (§4.1); the generation worker holds the elaboration cache (§8.6, §2.9) and the close-up caches. The lines assume one kernel arena per
layer (≈ 20 MB at CITY with its typed lookup tables, its spatial index and the index's home column, §2.2; PLAUSIBLE until
M1) plus one frozen arena copy per pool worker (≤ ≈ 15 MB each at CITY at the one-click freeze, ≈ 20 MB at a freeze after
edits; ≈ 37 MB at METROPOLIS) and each district overlay until it merges (§3.3), the compact entity store and the scoped
undo records of §2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at
≈ 11.4 MB at CITY across the two threads that hold any of it. The pool's frozen arena copies are ≈ 45 MB at CITY with
three workers at the one-click freeze and ≈ 60 MB at a freeze after edits (typed tables; `Map`-based tables would cost
each worker more heap and ≈ 10–20 ms of rebuild). While a loaded document is verified, one pool worker holds the replay's
model in place of the frozen copies (no frozen copy is made then, §4.1), its arena and entity columns about the copies'
size — or, with pool size 0, the generation worker holds it beside the working state (§2.9 step 3). **M2a's memory
measurement** (the milestone that builds the log and load verification over M1's document format, §16) includes the load
verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during
it; the load's digest trees (at CITY the model tree ≈ 1 MB — ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and
their interior nodes at 16 B each — and the records tree ≈ 0.25 MB, §6.2) sit in the entity-store line, and a bridged
client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3).
The lines stay PLAUSIBLE until M1 (generated towns at TOWN and CITY), M2a (that load-verification
case at CITY) and M2b (METROPOLIS) measure them, with the steps below as their pre-decided fallbacks.

**The elaboration cache (item 28; J-A28.83).** ≤ 1 KB per building at the `wings` rung and ≤ 4 KB for each storey of a
plan (rings and walls as integer cm, openings and windows as offsets along their walls), LRU-capped at 8 MB per document
in the generation worker — a session line counted on top of each rung's working set, never inside the rung lines above,
and evicting a rung to `absent`, which loses nothing because each rung is derived purely from its building's committed
state (§4.1); its persisted chunks (§2.9) count toward the document's size budget as non-canonical data and are dropped
first when that budget binds. Measured at the stage-3 intake on B-PLAN's fixtures (§13.2); pre-decided fallback: the cap
halves and the persisted chunks keep only the `edited` plans and the `current` plans of the buildings the view state
names.

**The CITY line, itemised (≤ 110 MB).** At the one-click freeze the fixed items are the arena (≈ 20 MB), three frozen
copies (≈ 45 MB) and the display list (≈ 11.4 MB across the tile worker's copy and the generation worker's index) —
≈ 76 MB — leaving ≈ 34 MB for the **entity-store line** — the compact entity store with the load's digest trees
(≈ 1.25 MB) and, on a bridged client during a load mismatch, the kept `doc.load` bytes (≤ 3 MB) — and for the terrain,
hydrology and field rasters, the district overlays until they merge, the scoped undo records, the decoration and
placement memos and each thread's runtime baseline. At a freeze after edits the copies are ≈ 60 MB and the fixed items
≈ 91 MB, leaving ≈ 19 MB; that case has its own first fallback step below. All PLAUSIBLE until M1 measures them.

**Export-time peak.** An export that draws holds a transient display list while it runs (§11.1) — SVG in the generation
worker while it writes; PNG, print and the `.dd2vtt` image in the tile worker, to which the list is transferred with the
request, until the last band is encoded (§8.9): ≈ 1.9 KB per building at the city band (§8.1 item 6's ≈ 10 MB for
≈ 5 200 buildings) — ≈ 2.6 MB at the TOWN target, ≈ 10 MB at CITY, ≈ 26 MB at the METROPOLIS target and ≈ 67 MB at the
35 000-building cap (`fixall_rendering_r3_budgets.out`) — plus the file being written (≤ 650 B per building for SVG at the
city band, §12.7; a PNG's streamed bytes), both released when the file is transferred out. It is counted on top of each
rung's line as a peak, not in the steady working set, and one export runs at a time. A district-band export's list — a
district-band SVG, or a large print whose scale selects the district band (§8.7) — enters the size estimate the export
dialog shows before it starts; its size per band is measured with the export budgets. A raster export also holds
canvases: one band (width × 512 × 4 B, ≈ 14 MB at A2 300 dpi, §8.8), the canvas of the tile job in progress (1 MB) and,
in `lit` with a `path` sun, the crown set it holds until it completes (§8.9), counted with the canvases below. Measured
with the export budgets (M1 TOWN and CITY, M2b METROPOLIS, §12.7) — pass: within the stated figure + 25 %. Pre-decided
fallback: the transient list is built with only the attribute columns the sheet's programs read at the export band, for
every export that draws (the attribute columns are up to ≈ 2.4 of the ≈ 10 MB at CITY, §8.1 item 6), the figure is
re-stated at the new measurement, and the export dialog's size estimate uses it.

**Canvases during a raster export.** The view's need is §8.8's (3P + 7 MB; the reference view 112 MB, the low-end device
43 or 67 MB), whose 7 MB of scratch holds the drawn light step's crown set with the atlases. A raster export's ≈ 15 MB of
band and tile canvases count on top of that need. The crown set an export in `lit` with a `path` sun holds (§8.9) is the
drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the
export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the
atlases (a set is §12.7's 160 sprites). The reference view on the mid tier (112 + 15 ≤ 128 MB) and the low-end
1 366 × 768 view (43 + 15 ≤ 72 MB) hold both, the latter with the extra set too (43 + 15 + 5 ≤ 72 MB); where the sum
passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB), and the mid tier's reference view once the
extra set is held (112 + 15 + 5 > 128 MB) — the coarser-stop fallback set is dropped for the export's duration (the need
falls to 2P + 7 MB: 47 + 15 = 62 MB on the low tier, 77 + 15 + 5 = 97 MB on the mid tier), and the export dialog refuses
a width whose band does not fit beside the reduced need, naming the widest that does.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS), and at
M2a on the reference 300-edit CITY document under load verification (§16). Pre-decided fallback if CITY exceeds its line
at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block
(SCL-20's archive) and are decoded only when inspected; if the line is still exceeded at a freeze after edits, that
freeze makes the laziness-contract copy of §3.3 step 1 — L0–L2, every L3 partition, and only the L4 partitions of the
districts the pool derives; if the line is still exceeded, the pool shrinks by one worker per step (identical digests by
construction, §3.3) and the memory test re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom
runs, its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached
tiles only where they remain. The document's size budget is §2.9's.

=== J-ROWS ===
| J-A30.81 | the knowledge filter on the label rows before the greedy, by a `knownTo` byte S14 fills from the target; a per-viewer tier and places; placement digests per (stop, knowledge key), goldens at `public` | §9.2, §8.1 |
| J-A30.82 | the knowledge key as per-viewer view state travelling like `stylePreset`; the tier defaults from the role (owner and editor `secret`, viewer `public`); the host sets it, a client never raises its own | §11.3 |
| J-A30.83 | the reader and every export withhold a place's name and purpose by the same table, never its geometry or kind; a secret place shows on its own building view | §9.5, §11.1, §11.2 |
| J-A30.84 | a passage drawn as an arch glyph per end at district and neighbourhood LOD and covered by the spanning wing's mass at city LOD; a hidden court legible as a court behind masses (a census row) | §8.2 (the row), §8.3, §8.5 |
| J-A8.81 | one style-sheet `states` table keyed by kind × §2.8 state (condition and island states included) that every family defines, replacing the two inline tone overrides; rows inert until an entity carries the state | §8.2 |
| J-A12.81 | the underground and sky toggles are `LayerSpec.visible`; one depth band drawn at a time by a per-viewer `depthBand` key, each underground entity on the level of its floor's band, `z` inside one arena | §8.4, §11.1 |
| J-A28.81 | the change marker as a shipped overlay live layer (`live.stale`) read from the elaboration records outside the digests, never a hashed mark | §8.2, §8.5 |
| J-A28.82 | the building band draws one storey at a time by a per-viewer `storey` key with the other storeys' outlines faded, never the storeys side by side | §8.5 |
| J-A28.83 | the plan budget (≤ 5 ms median, ≤ 20 ms p95 per building; a re-cut chain ≤ steps × that) with the cache's memory line (8 MB LRU, ≤ 4 KB a storey), adopted as PLAUSIBLE until B-PLAN's spike; the module doubling as the fallback | §12.7, §12.8 |
| J-A28.84 | the JSON schema's plan block and one VTT scene per storey in our own schema — rooms with their household unit and entry opening, walls, openings, stair cores and chimneys, with addresses and integer centimetres — never a cell grid | §11.1 |
| J-A29.81 | entrance ticks by role and frontage-treatment runs as symbolisation rows at the district band and finer; VTT portals at every entrance; basements below `baseCm` in glTF and CityJSON | §8.2, §11.1 |
| J-A16.81 | S10b's scoring absorbed in the pooled row's p50 until M2b measures it, then restated with §12.3's p50 column; the p95 laws unmoved; the hinterland row unchanged (J-A26.41) | §12.4 |
| J-A20.81 | the one-way rule as a vocabulary fact — no PLAT → host message addresses the dossier — with `report.changed` carrying the map's reports; dossier events through the host door in the host's order | §11.3, §11.2, §11.4 |
| J-A21.81 | the arm's-length bridge kept on design grounds under the owner's 2026-09-27 ruling (private for now); no licence wording in §11 | §11.3 |

=== RATIONALE-A ===
| J-A30.81 | Chose to make the label policy a knowledge filter on the candidate set — a one-byte `knownTo` column S14 fills on each `LabelTable` row from its target's record, tested against the viewer's key before §9.4's rung (5) and before any collision is checked — over a `knownTo` field on `LabelEntity` re-derived by S13a or a filter inside the greedy, because the candidate set must be known before any collision is tested for the local evaluation to stay order-independent, because a change of `knownTo` is already a logged model event on the target so a copy in the label record would be a second statement of one fact, and because the memo and the per-stop placement digest then simply become per (stop, knowledge key), the goldens taken at the `public` tier with no known places, so the model digest never depends on who is looking (§9.2, §8.1; item 30 (d)). |
| J-A30.82 | Chose to carry the viewer's knowledge as a per-viewer view key `knowledge` — a tier (`public`, `local`, `secret`) plus the addresses of individually learned places — that travels through the bridge like `stylePreset`, defaults from the role (`owner` and `editor` `secret`, `viewer` `public`), can be set for any viewer by the host, and can never be raised by a client above the tier its role or the host gave it, over a document setting or a per-place list of viewers in the model, because who knows a place is a fact about the reader and not about the town, because a game master must be able to tell one player a secret without editing the map, and because a viewer who could grant itself knowledge would make the filter decorative (§11.3, §2.9; item 30 (d)). |
| J-A30.83 | Chose that the reader — hover, the gazetteer, `hit`, `inView`, a content provider's answers — and every export withhold a local or secret place's name and purpose by exactly §9.2's table and never its geometry, kind or address, with a secret place admitted on its own building view, over hiding the place's marks or letting exports carry every name, because the owner's rule is that the place is on the map and only the knowledge of it is restricted, because a shared SVG or GeoJSON made from a `public` view must not leak what the view withholds, and because the building band is the building's own view — whoever stands inside it knows what it is (§11.2, §11.1, §9.5; item 30 (d)). |
| J-A30.84 | Chose to draw a passage as an arch glyph on the front building's outline at each end of the face at the district and neighbourhood bands and to let the spanning wing's mass cover it at the city band, and to prove a hidden court's legibility by a census row (drawn in `ground` under masses, enclosed on three sides, never a paper void, the figure-ground metrics unchanged), over an open-alley symbol at every band or an item-cited corpus bar, because the passage is covered ground under storeys that are solid at city zoom, because the district band is where a door in a wall reads, and because the legibility bar must be stated in the design's own terms and not by a corpus record id (§8.2, §8.3, §8.5; item 30 (c), (g)). |
| J-A8.81 | Chose one style-sheet table, `states`, keyed by kind × the state values of §2.8, §2.6 and §2.7 — buildings, walls and gates, tunnels, islands, sealed plots; `replace` rows and `override` rows — that every family defines and the census checks for completeness, replacing the two inline tone overrides, over per-program flags or a class list per family, because eight items (8, 11, 12, 15, 30, 31 and the sewers and islands rows) each add states and one data table keeps their look in one place, because a `replace` / `override` split lets a ruin swap its programs while a worn roof only changes tone, and because rows that act only when an entity carries the state leave the references' static picture untouched (item 23) (§8.2). |
| J-A12.81 | Chose to make the underground and sky toggles pure visibility (`LayerSpec.visible`, existence being the model's `Features.sewers` and `recipe.layers.islands`), to draw the underground one depth band at a time by a per-viewer `depthBand` view key with every underground entity on the level of the band that holds its floor and `z` ordering the bands inside the one underground arena, over one arena or one layer per depth level, because the sewers seat's II.7 already fixes one arena with depth per entity (J-A12.45) and the kernel confirms the band as a `z` ordering needs no second arena, because a cut-away that showed every depth at once would be unreadable, and because a view key that changes what is drawn but never what exists keeps every digest as it is (§8.4, §11.1; items 12, 14, 15). |
| J-A28.81 | Chose to draw the change marker of a stale rung as a shipped overlay live layer (`live.stale`) that the generation worker emits from §2.8's elaboration records, composed onto the tiles without re-rastering any base and never hashed, over a mark S14 emits from the model, because the determinism seat placed the elaboration record outside both digests (a click writes nothing a replay must reproduce, J-A28.62) so no hashed mark may depend on it, and because an overlay re-composes the tiles it touches at the label-composition cost while a base mark would re-raster every tile a staleness change meets (§8.2, §8.5; item 28 (c)). |
| J-A28.82 | Chose to draw a building's plan at the building band one storey at a time — the per-viewer `storey` key choosing the ground storey by default, a basement or an upper storey on request, the other storeys' wing outlines faded beneath — over the reference's side-by-side layout of every storey, because the plan sits inside the map at the map's scale and orientation, so a storey must occupy its building's footprint and no more, and because fading the other storeys' outlines keeps the wings rung readable through the plan (§8.5; item 28). |
| J-A28.83 | Chose to adopt the synthesis's plan budget — `plan()` ≤ 5 ms per building median and ≤ 20 ms p95, one plan per click, a re-cut chain bounded by steps × that with the step count known before the first open — and its cache line — ≤ 1 KB per wings rung, ≤ 4 KB per plan storey, an 8 MB LRU per document evicting to `absent` — as PLAUSIBLE rows confirmed by the B-PLAN spike and the stage-3 intake, with the wing-local module doubling (50 → 100 cm, a declared view shift) as the pre-decided fallback, over leaving the rung unbudgeted until stage 3, because §12.1 requires every budget to name its confirming milestone and its fallback now, because the reference's whole house costs 2–8 ms with a role search our cut does not need, and because the interior ladder's re-cut (item 28 (f)) must be priced as a chain of the same step or it would be an unbounded click (§12.7, §12.8; items 28, 28 (f)). |
| J-A28.84 | Chose to export a derived plan as a `plan` block of our own JSON schema — storeys of rooms carrying their address, integer-centimetre ring, role, household unit and entry opening, walls by kind, openings, windows, stair cores and chimneys, with the output version and the supersedes table — and as one virtual-tabletop scene per storey with the stair core as a named portal, over a cell-grid model in the reference's shape or one scene per building, because the base's rooms are polygons on a lattice and not cells, because the host holds the households and an exported plan must say who lives where (item 28 (f)), and because a tabletop scene is one level by construction (§11.1; item 28 (d)). |
| J-A29.81 | Chose to draw entrances as door ticks by role at the district band and finer (`main` at the outline weight, the others lighter, the plan's door leaf at the building band) and the slot's frontage treatment as a hairline run along the frontage edge, to open a tabletop portal at every entrance of the set, and to extrude basements below `baseCm` in glTF and CityJSON and underground cells at their depth, over one entrance mark per building and no basement in the 3-D export, because item 29 makes the entrance a set with roles the map should tell apart, because a scene's line of sight must break at every door a plan opens (item 28), and because heights are model data and the 3-D export must agree with the plan and the shadows (§8.2, §11.1; item 29). |
| J-A16.81 | Chose to re-declare S10b's row by naming its new work — one distance transform per producing class present and a bounded relation score per candidate — as absorbed within the pooled row's p50 and its imbalance margin until M2b measures it, then restating the row and §12.3's p50 column at the measured value, over raising the p50 now by an unmeasured estimate, because the p95 laws are the budget and do not move, because the estimate (≈ 4–10 ms once at CITY) is PLAUSIBLE and inside the pooled row's slack, and because the hinterland unit's row is unchanged by item 26 (J-A26.41) so nothing else in the table moves (§12.4; items 16, 26). |
| J-A20.81 | Chose to state the one-way flow at the bridge as a vocabulary fact — no PLAT → host message writes, patches or proposes a dossier change; `doc.changed` carries map-document events only; a new `report.changed` event carries the map's own reports (rejections, positive placements and their lapses, relocations, mutation records, disruption reports) through `subscribe` and the bridge; a dossier change enters as `doc.apply` events with `author: 'host'` and `EditBase.dossier` in the host's order — over an access rule enforced by the host alone, because a protocol whose vocabulary has no dossier-writing message cannot write the dossier by construction, and because the reports the host needs (what moved and why) must reach it without any message that could be mistaken for an instruction (§11.3, §11.2, §11.4; items 17, 20, 22). |
| J-A21.81 | Chose, under the owner's ruling of 2026-09-27 (private for now; the 2026-09-25 GPL-3 intent withdrawn), to keep the bridge as the module's arm's-length boundary — data only, the module a separate program in its own bundle — stated as a design choice that keeps the seams clean and every later licensing option open, and to put no licence wording into §11, over restating item 21's original licence consequences at the bridge, because the owner's later words supersede the earlier ones, because the boundary is worth keeping on engineering grounds alone, and because §17.3 is the licence's one home (§11.3; item 21 (d)). |

=== END ===
