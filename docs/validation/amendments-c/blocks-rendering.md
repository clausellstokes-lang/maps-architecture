Blocks of lane amendments-c/amend-rendering (opus stand-in for the Fable seat; bundled pass c + d + e). Generated
from the live docs/ARCHITECTURE.md (sha256 1c23190f040c8935…) by scratchpad/rend/gen.py with asserted single substitutions;
text before the first block line is ignored by the assembler. Report: docs/validation/amendments-c/amend-rendering.md.

=== REPLACE ### 8.1 The display list (renderer-independent, columnar, incremental) ===
### 8.1 The display list (renderer-independent, columnar, incremental)

```ts
// LodBand, Role (§8.2), ZoomStop (§8.8), and LabelTable, StringTable and GeomTable with §9.2's LabelRows, are declared in
// @plat/model (§14), so @plat/labels and @plat/render share them without either importing the other's code (N-22)
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore'|'light';
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
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, material, tintKey, …
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
  knownTo: Uint8Array /* 0 public · 1 local · 2 secret: the target's knownTo as §9.2's knowledge filter fills and reads it — read by that filter and by nothing else */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface LightTable {                // one row per `light` mark (§8.4; item 68): a placed LightSource (§2.7) or a derived light (a lit window, a room light, a shaft); ≤ 36 B per row
  count: number; mark: Uint32Array; x: Int32Array; y: Int32Array /* the source, world cm */; zCm: Int32Array /* its height above the datum: host ground + LightSource.heightCm */;
  intensityCd: Float32Array; radiusCm: Int32Array /* §8.4's cutoff */; sizeCm: Uint16Array /* the flame's or orb's radius: its penumbra */; colour: Uint32Array /* 0xRRGGBB */;
  flags: Uint8Array /* bit 0 fire (else magic) · bit 1 flicker · bit 2 lit at the drawn week and state · bit 3 downward (a shaft) · bit 4 underground */ }
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable;
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; type generated from the concern registry */; layers: LayerSpec[]; bounds: Box; version: number }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable; dirty: Box[] }
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
   time (§8.10), never stored. `text` marks carry one `LabelTable` row each, so S13b needs only the display list (N-4) — except a room label,
   which the plan draw sets inside its own room (building band only) and which S13b reads only as a protected obstacle
   (§8.5, §9.2; J-A28.85). `light` marks carry one `LightTable` row each (§8.4): a placed `LightSource` record's (§2.7)
   position, height, intensity, radius, colour and flicker, or a derived light's (a live layer's window, the plan draw's
   room light, a shaft); the light pass reads them and nothing else draws them but the vector rung's `glow` sprite
   (§8.2). A building's `eaveCm` and `ridgeCm` columns (its wing's, for a wing mark; §2.6) let the surface layer (§8.4)
   rebuild each roof face's elevation from the roof's own construction without the model.
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
   attributes, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; its light rows add ≤ 36 B
   per light (≈ 0.3 MB for 8 000 lights, PLAUSIBLE until §4.7's light table runs on B-CITY). The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the columns `update()` reads (`entity`, `bbox`,
   `group`: 24 B per mark, ≈ 1.4 MB at CITY). An export that draws (SVG, PNG, print, the `.dd2vtt` image) builds its own
   transient list in the generation worker: SVG writes from it there; a raster export transfers it to the tile worker
   with its request; each releases it when done (§8.9, §11.1).
7. **The drawn week, and concealed marks (items 67, 63).** The display list is built at the **drawn week** — the
   document's current week, or the week the per-viewer key `week` names (§2.9; §4.11's *Which week is drawn*): S14 writes
   a Works target's `worksStage` column from `stageAt(works, w)` and its height columns from `heightsAt` (§4.11), and emits
   the stage's marks (a dashed footprint, a pit, walls without a roof, a scaffold ring, rubble; §8.2's `states` rows) and
   the Works' pending and staked plot lines. When the drawn week changes — the clock advancing, a host's `view.set
   { week }`, a scrub — the generation worker re-emits, as a `DisplayDelta`, only the marks of the targets whose stage or
   heights differ between the two weeks and of the lights whose lit bit changes (O(changed Works)); no digest moves (§6.2).
   A mark of a concealed part — a concealed room, the concealed entrance's tick, a concealed access point or link down
   (item 63; §2.6, II.7.4) — carries `concealed` = 1 and the concealed use's `knownTo`, so the raster draws it only for a
   viewer whose knowledge key admits that use at the band (§9.2; the key then joins the tile key, §8.8); the building's
   mass and every public part carry the building's own `knownTo` and always draw.

Judgment calls: J-R1, J-R2, J-R19, J-R20, J-A67.81, J-A63.81.
=== END ===
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
  light: LightingSpec;                                                   // the lighting model, its sun and moon and the vector rung's look (§8.4; item 68)
  raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number;
            ratio: { semantic?: string; classes?: string[]; ratio: number }[] };   // K06: the base offset × the first matching class row's ratio (below; item 54)
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  states: StateRow[];                                                    // decline, condition, Works-stage and layer-state classes (the table below); a family defines every row
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
interface StateRow {                 // one row per (kind, state) that §2.8's ladders and the state fields of §2.5 to §2.7 can produce, the undeclined defaults excepted (§8.3's census); the shipped rows are the table below
  kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'passage'|'plotLine'|'access'|'gallery'|'chamber'|'link';
  state: string /* an Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7), 'superseded' for an enceinte whose supersededBy is set (§2.7), 'sealed' for a passage whose Passage.sealed is set (§2.5);
    a `WorksStage` (§4.11) for a target under a Works at the drawn week — the mark's `worksStage` column, §8.1 — which wins over the ladder state while the Works runs (item 67); 'pendingRemoval' or 'staked' for a plot line in transition (item 67 (g));
    an `AccessPoint.state` (II.7.4; item 64); a gallery's or chamber's system kind with its state (II.7.6; item 65); an `UndergroundLink.kind` (II.7.6; item 65) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[] }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `lights`. A role never changes meaning across the bands or the presets of one family; the
reference schemas (MFCG 13 keys, NG 26, VG 40) map onto it without loss. **The light roles (item 68):** `shadow` is the
vector rung's shadow tone (the ink at the family's alpha); `ambience` the vector rung's night wash and the two-tone
roof's dark mix; `light` a lit window's or a light mark's glyph tone; `lights` the vector rung's glow sprite. On rungs 1–2
of §8.4's ladder the light pass computes light over the albedo instead of those tones. **Night variants:** every family
carries `@night` variants of its roles (keyed like `tree@autumn`, below), read by the vector rung when the view is night;
rungs 1–2 light the day albedo, so a family's night look is its day palette under the night's light.

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
shipped value, chroma in [0, 34] in `ink` and [0, 60] otherwise (the families' role caps, below), any hue, keeping `road` = `paper` where the family ties
them — a style-time draw from the `style.random` stream (§6.1) written into the `setStyle` event as row operations, so a
replay never re-draws it. A failing draw is repaired in bounded steps: take the first failing pair in the matrix's row
order; raise its lighter role's L* by 1 (up to 97), or, if that is at 97, lower its darker role's L* by 1 (down to 3);
re-check every pair; stop when all pass or after 100 steps; the result must still pass after conversion to sRGB. A draw
whose repair fails is redrawn (attempts 0–2); after three failures the family's shipped palette is used and the report
says so — ≤ 300 steps by construction (J-R30). On 2 000 seeded draws per family around the role values below
(`docs/validation/bench/amendc_rendering_palette.out`): 9–27 % pass as drawn, 96–97 % after the first repair (median 4–12
steps, p95 16–39), 100 % within three attempts; the fallback does not fire. **Confirmation (M3b, where random styles ship):** shipped-palette fallback ≤ 2 % of 10 000 draws
per family; pre-decided fallback: the L* window narrows to ± 8 and the run repeats.

**Role values** (our own; calibratable rows; re-tuned on 2026-09-28 onto the palette targets below, item 69). Every matrix
pair, outline rows included, passes on these sRGB values (`docs/validation/bench/amendc_rendering_palette.out`, re-running
the pair check of `fixall_rendering_r2_palette.py` on them; e.g. `ink` road / ground 8.4 / 8.9, ground / building
16.7 / 21.2, tree / water 29.2, court / ground 4.7, ink / building 42.5 / 48.8; `lit` ink / building 41.4 / 46.1;
`hatched` 37.4 / 40.7), and every shipped family's paper and ink sit on the targets — paper luma 235.3 and warmth 36, the
ink's luma 35.8–36.3 and warmth 20:

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F7EAD3` | `#F7EAD3` | `#F7EAD3` |
| road | `#F7EAD3` (= paper) | `#DDCFC1` | `#C4A683` |
| ground | `#E8CFA6` | `#D4B78F` | `#F7EAD3` (= paper) |
| court | `#F4DFAC` | `#D8C4A3` | `#B5BC6A` |
| building / roof (lit side) | `#AE947B` | `#BD855B` | `#B9723D` |
| ink / label | `#2D2219` | `#2C2218` | `#2C2218` |
| wall | `#2D2219` (= ink) | `#8B7964` | `#74593D` |
| water | `#9ABDD1` | `#2DA0D3` | `#71B4D3` |
| green | `#B4CC94` | `#8AB85D` | `#A9B951` |
| garden | `#C4CF96` | `#7BAF43` | `#9DB541` |
| tree | `#70946A` | `#447F33` | `#5E9434` |
| field | `#F5DEA0` | `#E3BC5D` | `#F3D580` |
| verge | `#D7DEB1` | `#A5BF7C` | `#B7C278` |
| shadow (the vector rung) | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |

`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and the vector rung's shadows the ink at an alpha, and its light a change of value only
(`LightingSpec.mono`, §8.4); no role above CIELAB chroma 34 (`field` highest, 33.3) — the cap the palette targets set
(below; J-A69.82 re-rules J-R3's 18); walls in ink and courts as ground at the city band (J-R28, J-R29 kept).

**Palette targets — the owner-opened corpus bands (item 69; owner: "Adopt the corpus measured color targets"; J-A69.81 –
J-A69.84).** The owner released these bands of the corpus's measured palette on 2026-09-27 (item 69 (a); PROGRESS J64):
the only corpus content in this design, every other corpus fact staying with the staged calibration phase (§13.9) and
no corpus file read by the program (the bands came as figures within the owner's item). They are **targets** — bands a
rendered plate must land in — never a palette to copy; the role values above are our own, placed inside them.

| axis | the measure (our definition, J-A69.81) | band | target | provenance |
|---|---|---|---|---|
| paper lightness | the Rec. 601 luma of the median 8-bit sRGB colour of the pixels whose top mark (the pick buffer) is `paper` | 226–244 | 235 | `corpus`, "owner-opened corpus palette exception, 2026-09-27 (item 69)" |
| paper warmth | R − B of that median colour, in 8-bit sRGB units | 20–50 | pinned at 36 | the same |
| darkest ink | the Rec. 601 luma of the darkest 0.5 % of all pixels ("full ink") | ≤ 45 | — | the same |
| ink warmth | the mean R − B of those pixels | 15–25 (our tolerance) | 20 | the same; the tolerance `own` |
| plate chroma | the mean CIELAB C*ab (D65) over every pixel | 18–70 | median 43; `ink` 20–30 (J-A69.82) | the same; `ink`'s range `own` |

**Where they bind.** Every shipped family's paper and ink take the paper and ink targets (J-A69.84) — hence one paper
value for all three; the `ink` family's other roles keep their L* and hue and take the least chroma scale whose
plate chroma reaches 20, never past 30, keeping MFCG's restraint in the default map with the corpus's colour at its lower range
(J-A69.82); `lit`, `hatched` and the reserved `parchment` and `painterly` aim at the median (43), each by the chroma
scale nearest it that clips no role in sRGB and puts none above C* 60 (J-A69.83), which on today's values lands `lit`
at ≈ 29 and `hatched` at ≈ 30 — inside the band, short of the median; the dependent roles (road = paper, ground,
court, field, building, the shadow alpha) move with them and every contrast-matrix pair is re-checked by the bounded
repair's L* steps, which leave the new warmths as they are. The plate figures here are a **plate model**'s — the
city-band role shares of a plate-framed render, stated in the receipt — PLAUSIBLE until the **measurement render**
confirms them: a fixed render of the `ink`, `lit` and `hatched` families at plate-equivalent resolution and framing
(the golden TOWN and CITY of §13.3 framed by §9.5's framing rule at 300 dpi on A3, labels and furniture on, default view,
day, no pointer), measured on the resolution-stable axes only (paper luma and warmth, darkest-ink luma and warmth,
plate chroma) by our own measurement code written from the definitions above — no corpus instrument enters `plat/`.
Each family's chroma scale is re-found on that render by a scripted sweep at the milestone that ships its four bands
(`ink` at M1, where its values ship, and M2b; `lit` at M2b; the ink-family variants at M3b; `hatched` at M5; §13.4's
bar), the sweep and its receipt re-signing the table's values. The bands were measured by the corpus's own instrument,
whose definitions are not in this program's reach: a definitional mismatch is re-signed at the reconciliation stage
(§13.9), never by opening the corpus earlier. MFCG parity stays judged by style class (the `MFCG` preset needs no MFCG
colours), and §17.1 (5)'s palette audit — no three colours within ΔE2000 2 of a reference palette — compares with the
references' palettes only (the corpus is the owner's material, no reference).

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
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north × the class ratio — `raised.ratio`'s first matching row: landmark footprints (the landmark semantic of slot 12, `building.landmark`: keeps, temples, churches, halls) 2, the farmstead class and its outbuildings 0.6, every other building 1 (provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54), read from the mark's semantic and `class` column (§8.1), no model field — drawn length clamped to [0.3 px, 2.5 px] × the ratio | — |
| informal cluster structure (a plot of §4.7 S11's `cluster` arrangement; item 70) | city | model | each structure its own small roof mark over the plot's footpath web drawn in `ground`, never closed into one mass across the paths (§8.5 (2)'s exception); a structure below the 2-px floor a settlement dot; from the district band a footprint with its entrance tick like any building | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ the building outline weight, never filled, gaps at gates | — |
| entrance tick (`Entrance.role`, §2.6; item 29) | district and finer | paper | a tick across the footprint edge at the entrance vertex: `main` 1.5 px long at the outline weight; `side`, `rear`, `yard` and `service` 1 px at ½ the outline weight; at the building band the plan's door leaf | — |
| frontage treatment (`BuildingSlot.frontage`, §2.5; item 19) | district and finer | paper | a run along the main slot's frontage edge at ≤ ½ the outline weight: `lean_to` and `stall` as short ticks at bay spacing, `shopfront` a bar inset ½ px, `arcade` arcs at bay spacing; `none`, `gate` and `wall` draw nothing beyond the boundary treatment | — |
| passage arch (a `passage` face, §2.5; item 30) | district, neighbourhood | paper | an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the passage has none, §2.6's `BaseWing.spans`) at each end of the face — where it meets its way and its court — 3 px wide at 1×, never below 2 px; the face's floor takes `road`; none at the city band, where the spanning building's mass covers it (§8.5 (2); J-A30.84, J-A30.87) | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints, and the wall symbol is clipped on its inner side to the band's inner edge minus the
setback, so it overhangs only outward (berm, moat, glacis) and never covers a plot. **Dry ditch:** the `ditch` residue on
the town side of an `on_enceinte` bailey (§4.7 S10 (0), §4.8) takes the glacis parts' role in a dry-ditch variant — fill
5 ΔL* darker than the glacis fill and, at the district band and finer, a short inward hachure along its inner edge; at
the city band the glacis parts' plain fill; the overhang rule covers it.

**Paint programs.** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at `w + 2h` in the casing
pass, body at `w` in the body pass); `bands(N, W, exponent, ramp)` (VG's water law); `raised(offset, classRatio)`;
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
face (an arch, §8.3) and for §8.5's change marker); `glow(radiusPx, role)` (the vector rung's light sprite at a `light`
mark, §8.4); the **Works programs** (item 67) — `stake` (a dashed footprint with a material-pile glyph in the yard),
`pit` (a cellar pit or trench: a darker ground fill with a hachured rim, and a spoil-heap stipple beside it),
`scaffold(ringPx)` (a hatch ring outside a footprint's walls), `frame` (the roof construction's lines without fill:
rafters and ridge) and `charred` (a blackened roofless shell); and the **underground system programs** (item 65) —
`ossuary` (a catacomb gallery's band with niche ticks), `cavern` (a natural gallery's irregular fill with a rock
stipple), `quarry` (a worked gallery's band with pillar squares) and `chamber` (a chamber's floor, the undercity's in
`ground` with its buildings drawn as buildings). Which states select these programs and which tone overrides they take
is the `states` table below, keyed by §2.8's ladders and §4.11's Works stages. On rungs 1–2 of §8.4's ladder
`faceLight`, the two-tone `roof`, `hillshade` and the `lit` crowns emit the albedo — the lit side's tone, no face
shading — and write their normals into the surface layer, and the light pass lights them once; on rung 3 they light as
written here (J-A68.87). In the state the ladders leave undeclined, a tunnel draws by
its `Tunnel.kind` — a cased band for a `main`, a hairline pair for a `drain` or `culvert`, a `passage` as a `main` with
arch glyphs at its ends — and an underground building (one on the underground arena) draws its footprint in
`building`, a vault class with the `vault` hatch, both through the underground layer's cut-away (§8.4); access points and gratings are `symbol`s on the
ground layer where they break the surface. A lane's body and casing end square at
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
roles and never a mark's geometry, so a `setAttr` of a material re-keys the same marks' look and moves nothing.
**Wealth in the roof's colour, as FTG draws it (§2.6; items 19, 23; J-A19.81).** The `lit` family's default
sheet keys the `roof` role by the building's prosperity band — one override row per band of the band set
`prosperity.bands` (§4.5), keyed by the band's name and read from the mark's `prosperity` column banded by §4.5's rule
(the field, as labels and descriptions read it; never `builtBand`, below) — the richest roofs the deepest clay, the
poorest the greyest: `rich` `#C17C46`, `prosperous` `#C08051`, `comfortable` `#BD855B` (the role's own value),
`modest` `#BA8765`, `poor` `#B48B6E`, `squalid` `#AF8E78` — our own calibratable rows, moved by `lit`'s chroma scale with
its role values (item 69; `amendc_rendering_palette.out`), each passing every
contrast-matrix pair of the `building` role whose value the lit roof side shares (ground, road, garden, green, ink),
which the loader checks as it checks any palette. In `lit` the material picks the roof's `pattern` texture and the band
row its tint, so the two never contend; a sheet that also keys a roof colour by material applies it after the band
row; a band without a row of its own takes §4.5's interpolation between the nearest rowed bands. `ink` keeps MFCG's
one roof role and `hatched` NG's two tones. The view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and
`weather` ∈ {clear, overcast, snow}, which select override rows: autumn and winter re-skin deciduous crowns (by `leafType`,
deciduous when absent) through role variants (`tree@autumn`; winter a bare-crown symbol); snow lays the `snow` role over
ground, fields and roofs while `road` keeps its value; overcast removes the global light's direct term — its shadows go,
the ambient and the occlusion stay, and on the vector rung the projected pass is off (the raised under-copy stays).
The model and its hash are untouched.

**Post operations (K07).** Applied once per tile after its marks, by Canvas2D in the tile worker (≈ 1–2 ms per 512²
tile): `greyscale`, `sepia`, `tint(colour, strength)`, `vignette` (on the view), `pixelate(cellPx)`,
`dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`, `crosshatchNoise(periodPx, alpha)`. PNG export applies them per
tile; SVG carries greyscale, sepia and tint as colour-matrix filters and omits the pixel operations, which the export
report lists.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; readsElaborations?: boolean; marks(view: ViewState, model: ModelView, region: Box, elaborations?: readonly ElaborationRecord[]): MarkTable }`
adds display-list groups that are view data (never hashed). Providers run in the generation worker, which calls one when
the view state it reads, the model, the visible region (dilated by one tile) or — for a provider that declares
`readsElaborations`, such as `live.stale` — the elaboration records (`Document.derived.elaborations`, §2.8, §2.9; passed
to it as `elaborations`) change, so a click that writes only the cache (§7.3) re-runs it; it delivers its marks as a
`DisplayDelta` of group `live.<id>` (§8.9). `overlay` marks are drawn in the tile worker's composition step (§8.8), so a
selection or a moving person re-composes tiles without re-rastering; a `base` provider (a thematic recolouring) is part
of the tile key (§8.8). Shipped: `live.selection` (overlay); `live.stale` (overlay: §8.5's change markers, one glyph per building or district whose
elaboration record reads `stale`, read from `Document.derived.elaborations` beside the model view, outside every digest;
J-A28.81); `live.favourites` (base: the view state's `favourites` as a
thematic override); `live.ghost` (overlay; item 101: the pending dry run's preview — the derived shape of a points form,
the plots and buildings the declaration would make or move in `ink` at α 0.5, its handles and the anchor of §9.5's count
badge — delivered while a declaration is being drawn or a clerk's proposal waits, removed on commit or cancel, never a
model change; R1, R3, R14); `live.windows` (base; item 68: a `light` mark for each lit window at the view's hour and
drawn week by §10.3's rule, read by the light-map bake, §8.4); and, registered by the simulation module, `live.people`
(overlay: favourite persons' positions from the module's occupancy at the view-state hour, one categorical colour per
person).

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code. A row keyed by `use` or `owner` skips a mark whose `knownTo` column (§8.1) the
view's knowledge key does not admit at the band (§9.2's table), drawing it unthemed, and a theme's legend key lists only
the values drawn, so no theme colour and no legend key names a withheld purpose; while such a row is active the
knowledge key joins the tile key (§8.8) (J-A30.85). A front's building themes as its front, and its concealed use
(item 63; §9.2) has no theme colour and no legend key for a key that does not admit it. **Character themes (item 72; J-A72.81):**
rows keyed by a district's `identity`, by the share of a power (`CircumstanceSlice.powers`, §7.7) or of a sector among
its significance-weighted lots, and by its band range (§4.5) — data rows like FTG D7's matchers, which stay override rows
of the same kind. **Conditions (item 88; staged):** a `ConditionOverlay` (§2.7) is drawn as a settlement-wide thematic
row — a settlement-wide post-operation tint plus a legend row, keyed by its archetype and severity, no geometry — the rows
schema-complete and empty in the base until the port fills the records.

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
| building | `reused` (a trace worked as the kind `Building.reusedAs` names — garden, orchard or field, §2.6; J-A8.22) | all | replace: the trace's face filled as that kind — `garden` (`ground` at the city band, a yard there), an orchard's `grid` instances, `field` — with `trace('footprint')` over it at the district band and finer; no mass; a successor raised on the old foundations is a building of its own (`Building.predecessor`) and takes its class's programs |
| building | `condition` `worn` / `neglected` (§2.6; item 31) | district and finer | override: `weathering` amplitude × 2 / × 4 and, at the neighbourhood band and finer, a roof `pattern` variant with patched courses — texture and colour only (item 19); no change at the city band |
| wall, gate | `abandoned` (neglected) | all | override: the wall stroke's casing dropped, its tone 20 % toward `ground` |
| wall, gate | `decayed` (breached or partly dismantled) | all | override: a gap glyph over each breached stretch; the towers of a dismantled stretch as trace discs |
| wall | `superseded` (`Enceinte.supersededBy` set, §2.7) | all | replace: `trace('ring')` — the old line as a hairline lighter than a wall, under the new ring's stroke |
| tunnel (II.7) | `abandoned` (silted) / `decayed` (caved in) / `ruined` (`Tunnel.closure` collapsed or sealed) | the underground layer | override: the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end |
| island (II.6) | `floating` / `waning` / `settled` (`SkyIsland.state`, §2.7) | the sky layer | override: none / alpha × 0.8 / alpha × 0.6 with the ghost share raised (§8.4); the shadow follows `elevationCm` by itself |
| island | `fallen` | the ground layer (the ruin face) | replace: the `ruin` program's rubble stipple over the ruin face |
| passage | `sealed` (`Passage.sealed`, §2.5; item 30) | district, neighbourhood | override: the arch glyph at each end drawn closed (a bar across the arch); the plots behind it take their buildings' own rows (vacant, §4.11) |
| building | Works `staked` (item 67; §4.11) | all | replace: `stake`; no mass at the city band, the stage glyph (§8.5) on the dashed footprint |
| building | Works `groundBroken` | all | replace: `pit` over the footprint; the stage glyph at the city band |
| building | Works `foundations` | district and finer | replace: the footprint's walls as low wall bands (outline weight × 2) or a sill frame, no roof; the city band a mass at 40 % alpha with the stage glyph |
| building | Works `wallsRising` | all | override: no roof construction, the interior floor in `ground`, `scaffold` round the walls; the heights of `heightsAt` (§4.11), so shadows grow storey by storey |
| building | Works `roofFramed` / `roofed` | all | override: `frame` without fill and `scaffold` / the roof drawn with `scaffold` still up; a work yard in `ground` |
| building | Works `emptied` / `stripped` / `rooflessShell` / `rubble` (a demolition) | all | override: openings as gaps / `frame` over bare rafters / the `decayed` row with rubble stipple inside / the `ruin` program as wall stubs with rubble heaps; `cleared` is the existing row |
| building | Works `decaying` (on the way to `decayed`) | all | override: the roof with gaps along its ridge, the outline dashed at 30 %; `abandoned`, `decayed`, `ruined`, `cleared` and `reused` are the rows above |
| building | `charred` (a fire, item 67) | all | replace: `charred` — the blackened roofless shell, until a clearance or repair Works starts |
| building | Works `refit` (a conversion without a geometry step) | district and finer | override: `scaffold` along the frontage |
| plotLine | `pendingRemoval` / `staked` (item 67 (g); §4.11's Works lines) | district and finer | replace: the old boundary treatment dashed / the new line as stakes, dashed, until its fence or wall stands |
| access | `open` / `locked` / `bricked` (`AccessPoint.state`, II.7.4; item 64) / collapsed (its derived reading while its element is closed, II.6) | the ground layer where it breaks the surface, and the underground layer | override: the kind's `symbol` / with a bar / filled solid in `wall` / as a trace with rubble stipple; a secret one drawn only for a key that admits it (§9.2) |
| gallery | its system's kind — `catacomb`, `cavern`, `quarry`, `vaults`, `buried` (a buried old town's street), `dug` — or an undercity walkway (II.7.5, II.7.6; item 65), with the closure states of II.6's table | the underground layer | replace: `ossuary`, `cavern`, `quarry`, the `vault` hatch, the old street as a lane's body in `ground` with its buried shells as `trace` outlines, a dug passage as a `passage` tunnel, a walkway as a lane's body in `ground`; its closure states as the tunnel row above, `flooded` in `water` |
| chamber | the system's kind — ossuary, cavern hall, quarry room, cistern or vault, undercity chamber (II.7.6; II.7.5) | the underground layer | replace: `chamber` with the system's fill; a flooded chamber in `water`; a collapsed one as a trace with rubble stipple |
| link | `UndergroundLink.kind` — `open` / `gated` / `secret` / `collapsed` / `flooded` (II.7.6; item 65) | the underground layer | replace: a hairline pair / with a gate bar / dashed and drawn only for a key that admits it / broken with rubble stipple / in `water` |

No reference draws a declined, worn or hidden state, a building in progress or an underground (item 23): the rows are
ours, they act only on an entity that carries the state or a running Works, and a town that never passes an epoch, a
scheduled edit or a hand conversion renders as the references' would.
`builtBand` and the geometry floor (§4.11) are read by no render rule: condition follows `Building.condition`, and
labels and descriptions follow the prosperity field (J-P1).

**Layer order** (data; `ink` shown; one list for the city and district bands). MFCG's recorded order (water → road casing
→ road body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title) is
a subsequence (order parity, §8.3); NG's (greens → roads → shadows → buildings → props → large-tree pins under buildings,
block trees above them → title; item 58 (d)) is a subsequence of the `hatched` sheet's slots.

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
| 10 | projected shadows — the vector rung only (§8.4; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
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
drawn by the main thread over the composed tiles (§9.5). **The light pass** (§8.4; item 68) runs over slots 1–20 and
before slot 21: labels, live overlays and furniture are never lit. §8.3's census checks every tile's draw calls against
this table.

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
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06), the lighting model's cast shadows on in value only (§8.4; J-A68.81), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in ink at α 0.5 on the roof colour, cast shadows by the light pass (prism shadows at ink α 0.25 on the vector rung), cobbles as ink stipple, pins as ink symbols, every named way labelled | wings as ink outlines; the plan rung's storey (§8.5): walls by kind as hairlines (exterior at the outline weight, partitions at ½), openings as gaps with a door tick, windows as wall breaks, the stair core's flights, chimney squares, abstract furniture at ink α 0.5, room labels |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft cast shadows (§8.4), hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light; the plan as `ink`'s, the storey's floor in the roof's lit tone |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching; the plan as `ink`'s |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role; monochrome; `night` — the `ink` family with the view key `light` at `night` by default (§8.4), its `@night` roles and `lights` glow sprites on the vector rung | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2: the default label face is IM FELL Great Primer in every family; small caps and old-style figures
come by §9.2's per-face path (N-12).

**Light by family (item 68; the model is §8.4's).** Every shipped family is lit by the field model with the cursor sun
by default and cast shadows on (J-A68.81): `ink` in value only (`mono`) and gently (ambient 1.3, so a day shadow on
open ground keeps roughly two thirds of its lit value — the ink family's shadow alpha 0.35), `lit` in colour (ambient 0.85), `hatched` by
its own vector prism pass at every rung (the look of NG 1.2.2, §8.4 (h)) with its night glow; each family's night is its
day albedo under the night's light (its `@night` roles on the vector rung). The `MFCG` preset draws no cast shadow and
no light; the `FTG` preset draws FTG's sun, moon, weather rule and entrance window lights (§8.4 (h)).

**`lit` on the reference backend (VIS-7).** Every `lit` program — every mark of every family — runs on Canvas2D: the
lighting comes as a post operation over the Canvas2D base, never a second drawing path (§8.4; J-R4 restated by J-A68.82).
Textures are `pattern` fills of greyscale seamless tiles tinted by the role colour (multiply); on rungs 1–2 the programs
emit albedo and normals and §8.4's light pass lights them per pixel; on the vector rung lighting is `faceLight` per face
from stored geometry, one directional light from the sheet's sun (with a `path` sun, its light step, §8.4), and soft
shadows are `shadowPass` polygons
with `penumbraPx` — the shadow polygon plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓, vector, no
bitmap filter (avoiding Fantasy Manor's ≈ 90 % bitmap-shadow cost); canopy shading is baked into the crown sprites per
(style, light step) (§8.10); water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile
(≈ 1.3 ms per 512² tile). Relief lighting across roofs and walls comes from the light pass and the surface layer's
normals; the programs draw no normal-map texture, and on the vector rung the style dialog says the light is per
face (J-R4). **Texture set** (our own, procedural: generated by
`plat/tools/textures/` in the product repository (§17.1 (3)) with fixed seeds; every file in `plat/assets/textures/`
names that script and its seed (§17.1 (5)); no third-party texture): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).
=== END ===
=== REPLACE ### 8.3 Symbol catalogue and draw-style census ===
### 8.3 Symbol catalogue and draw-style census

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (§8.10);
clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer; tinted pattern textures with
per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph text with a role halo; a
point symbol for every `Pin.kind` of §2.7; screen-space furniture (§9.5); door ticks by entrance role, frontage-treatment runs and the passage arch (§8.2's rows;
items 19, 29, 30); trace hairlines, the vault hatch and the overrides of §8.2's `states` table; access-point symbols on
the ground layer (II.7.4); the change marker (§8.5); the Works programs — stakes, pits, scaffolds, roof frames, the
charred shell — and the underground systems' programs (item 65, 67; §8.2); the vector rung's glow sprite at each light
mark and the lit picture of §8.4's light pass (item 68). Every semantic visible at a band has exactly
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
| light steps (the vector rung): a METROPOLIS view in `lit` on rung 3 with `prism` shadows and a `path` sun advanced one 1° step per frame across three light steps, then stopped, on a tier with shadow layers and one without, both at tile DPR 1 (§8.4, §8.8) | lit | after the stop every cached `under` and `over` (or `base`) tile carries the final light step; the two tiers' tiles equal outside the projected-shadow pixels; the view pixel-identical to a fresh render at the final sun |
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
| per wing, `hatched` | hatched | 15–20 hatch triangles per wing, counting the two filled tapers laid along the ridge, each 30 to 50 per cent of its length (item 58 (e)); no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |
| states: every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`, `Enceinte.supersededBy` and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs, and `demolished`, a tombstone that is never drawn — resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand once through every building, wall, gate and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel and one island record (§2.7's schema) draws the tunnel and island rows until their stages register |
| hidden courts (item 30): on B-CITY-lite seeds whose hidden share is > 0, every court face reached only through a passage (§4.6), at the city band | ink | drawn in `ground` under its block's masses and enclosed by drawn masses or outlines on ≥ 3 sides; 0 hidden plots drawn as `road` or `paper` voids; §8.5's figure-ground metrics within 0.01 of the same seeds at hidden share 0 |
| knowledge (item 30): a golden CITY rendered at the `public` tier and at `secret` under the shipped `knowledge.admit` rows (§9.2), with no thematic row and with a `use`-keyed one (§8.2) | all | with no theme the base tiles pixel-identical, with the `use` theme differing only on the marks of places `public` does not admit, which draw unthemed; the composed tiles differ only where label glyphs lie; at `public` no glyph run of a `local` name at the city or district band, none of a `secret` name above the building band and no legend key of a withheld use; each tier's per-stop placement digests equal §13.3's |
| entrances (item 29): the golden views' district-band tiles | all | exactly one `main` tick per building, placed where §2.6's rule 1 puts it (its frontage, the court or path from the plot's street gate, or a hidden plot's access face); every `side` or `rear` tick on an access edge of its plot beyond the frontage, every `yard` or `service` tick facing a yard or court part of its plot (§2.6's rules 2–3) |
| change markers (item 28): B-ZOOM over a document holding three `stale` rungs (a designation change, a re-let, a dossier event) | all | a marker at every band for each stale building and one for its district at the city band; none after the click; the base tiles unchanged by the marker |
| plots-only view (item 28; §8.5): the golden views at the city and district bands with `plotsOnly` on | all | every plot boundary drawn, 0 building marks; the default view's base tiles pixel-identical once the key is off |
| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` | ink | at the city band the span ring of every base wing that spans it (§8.5 (2)) inside its block's mass (0 `ground`, `road` or `paper` pixels over any); at the district band its floor in `road` with an arch glyph at each end, drawn closed where `Passage.sealed` |
| passages left uncovered (item 30; §8.2's row; §2.6's `BaseWing.spans`): B-CITY-lite seeds whose hidden share is > 0, every front building over a passage cleared by hand (`clear`), then each clear undone | ink | while a passage has no `frontBuilding`, no span mark over it in any band's mark table and no arch glyph at any band, its floor in `road` at the district band; after the undos every tile pixel-identical to the render before the clears |
| the plan draw (item 28; §8.5, §8.6): every B-PLAN fixture of §13.2, building band, `ink` and its `night` variant | all | every drawn room label inside its room's ring at a cap height within §9.4's room-label range, a room left unlabelled only where its label does not fit at the range's bottom, and 0 S13b glyphs over one; one light per lit room, at its spine summit, and none in an unlit room; one stack per `Chimney` and no decorative chimney on the building |
| roof by band (items 19, 23; §8.2): the `lit` default sheet on a golden CITY, textures off | lit | each building's roof tone, read through the pick buffer, is its prosperity band's row; every row passes the contrast matrix's `building` pairs |
| raised under-copy by class (item 54; §8.2's symbolisation row): a golden TOWN holding houses, landmarks and a farmstead | ink | each footprint's under-copy offset = the base offset × its class row's ratio (house 1, landmark 2, farm building 0.6) within ± 0.1 px before the clamp; the same offsets by day, at night and on every rung |
| palette targets on the measurement render (item 69; §8.2) — the check; the gate is §13.4's B-ZOOM bar | ink, lit, hatched | paper luma 226–244 and warmth 20–50 (at 36 ± 2 for the shipped values); darkest-0.5 % luma ≤ 45 and warmth 15–25; plate chroma 18–70, `ink` 20–30 |
| lighting, one spot lit from every side (item 68; §8.4 (c)): a caster at the centre of four equal lights at its four sides, night, CPU reference | ink, lit | at every ground pixel within the lights' radius outside the caster the summed visibility-weighted term ≥ 0.95 of the unoccluded sum — no dark shadow; each light's own term alone shows the caster's shadow away from it |
| lighting, a shadow never climbs a taller roof (item 68): a 4 m hovel beside a 30 m tower, the sun at 64 azimuths × 3 altitudes and the cursor sun at 100 pointer positions, CPU reference | ink, lit | 0 pixels of the tower's roof whose sun term the hovel lowers |
| lighting, the shadow on a lower roof is shortened by that roof's height (item 68): the same fixture | ink, lit | where the tower's shadow crosses the hovel's roof, its tip lies at the similar-triangles position — d × (h_tower − h_roof) ÷ (H − h_tower) past the tower for a source at height H and ground distance d, (h_tower − h_roof) × cot(altitude) for the fixed sun — within 1 px, and it continues beyond the hovel onto the ground |
| lighting, the cursor sun (§8.4 (d)): 200 pointer positions and `sunHeight` 1, 4, 64 on a golden TOWN | ink | every caster's shadow tip at d · h ÷ (H − h) from the sun's ground point within 1 px; at `sunHeight` 64 the shadow bearings of any two casters within 2° |
| lighting, CPU reference and GPU pass (item 68; §6.5 (9), §13.4): the golden views, day and night, fixed sun | ink, lit | the CPU reference byte-identical on the five engines; the GPU pass within §13.4's tolerance of it on the reference and low-end devices |
| lighting, the fallback ladder (F-LIGHT): each golden view forced onto each of the three rungs in turn, plus a lost GPU context mid-pan | all | a frame on every rung; the rung counted in the telemetry; no error; the model digest unchanged |
| lighting, night legibility (item 68; §9.4): the golden views at night | all | every placed glyph's text / halo pair at the label floor, read from the rendered pixels (labels composed after the pass) |
| night light by the rows (item 68; §4.7's light table; T68 schedules it): B-CITY-lite seeds at night, CPU reference | ink | the ground illuminance at every 2 m sample along each lit way's centre line ≥ its row's target at the way's band value; 0 lit pixels on a hidden or clandestine plot that no row lights |
| Works stages (item 67; §8.2's rows, §8.1 item 7): a golden TOWN with one Works of every kind scrubbed week by week forward and back through its span | ink, lit | every (kind, stage) resolves one `states` row; the tiles at a week byte-identical whether reached directly or by scrubbing; a pending plot line dashed until its clearing stage |
| informal clusters (item 70; §8.5 (2)): B-CITY-lite seeds whose shanty districts hold clusters, city band | ink | every structure ≥ 1 `building` pixel or a settlement dot; the footpath web in `ground`; 0 masses closed across a footpath; no cluster plot left as a blank block |
| concealed parts (item 63; §9.2): a golden CITY with one front of each mode, at the `public` tier and at `secret` | all | at `public` 0 pixels of a concealed room, the concealed entrance's tick, a concealed access point or link at every band, the building's mass and public parts drawn; at `secret` all drawn; the base tiles otherwise pixel-identical |
| access points and the underground systems (items 64, 65; §8.2's rows, §8.4's depth bands): a hand-built CITY fixture holding one access of each state, one gallery and chamber of each system and one link of each kind, the underground layer shown at each depth band | all | every (kind, state) resolves one row; a crossing of two parts drawn with the deeper one's trace under the upper; 0 pixels of a `secret` link or access at `public` |
=== END ===
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
  owner-staged; these fields are its hook. **The underground layer is one layer over several systems (item 65; II.7.6; J-A65.81):**
  the sewer network in arena part 0 and each other system — catacombs, caverns, quarries, vaults, the undercity, dug
  passages — in its own part, so their topologies stay apart while the view draws them as one layer: every item of every
  part is grouped into the depth bands of `depthBandCm` by the band that holds its floor, the cut-away draws the chosen
  band in full and the items of the bands directly above and below it as `trace` hairlines at α 0.5, and inside one band
  a shallower item draws over a deeper one (`z` by `elevationCm`). Where two parts cross in plan, the crossing therefore
  reads over and under — the upper passage drawn, the lower one's trace passing beneath it — and every link between parts
  (`UndergroundLink`, II.7.6) draws at its own depth with its kind's row (§8.2's `states`).
* **Toggles are visibility; existence is model (items 14, 15; II.6, II.7; J-A12.81).** The sewer control at CITY and
  METROPOLIS and the island view toggle set `LayerSpec.visible` of the `underground` and `sky` layers (the controls of
  §7.8); whether a network or an island exists is the model's — `Features.sewers` (II.7.1) and `recipe.layers.islands`
  (II.6) — so hiding a layer changes no digest and a toggle never creates what the settlement lacks. The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands inside the one underground arena (§2.1). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. A hidden layer's lights and casters are not
  drawn and light nothing on the visible layers, and they still exist (J-A12.81, J-A15.41).
* **Two different things (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy of each footprint
  beneath it, swept by an offset read from a class row — house 1, landmark (keep, temple, hall) 2, farm building 0.6 of
  the sheet's base offset (§8.2's symbolisation row; provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54) —
  ON by default in `ink`; not a shadow and not sun-dependent, so it is drawn identically by day, at night and on every
  rung of the ladder below. **Cast shadows** are the lighting model's (below): height-derived, the absence of one
  source's light.
* **The lighting model (item 68; owner: "a daytime view is the default. the global light is the cursor" … "shadows
  are gradients affected by light sources"; underground: "they don't have the sun or moon").** One model, stated here; its view keys are §2.9's (`light`, `sunMode`, `sunHeight`,
  `handLantern`, with their controls in §7.8), its records §2.7's (`LightSource`), its placement §4.7's light table, its
  failure row §5.2's F-LIGHT, its determinism §6.5 (9)'s and its budgets §12.5, §12.7 and §8.8's.

  ```ts
  interface LightingSpec {                // StyleSheet.light (§8.2)
    model: 'field'|'vector'|'none';       // field: the light pass (every rung of the ladder below); vector: rung 3 by the sheet's own choice (`hatched`); none: no cast shadow and no light (the `MFCG` preset)
    castShadows: boolean;                 // the one switch for the global light's shadows: true in every shipped family, false under the `MFCG` preset (J-A68.81)
    mono: boolean;                        // light changes value only, never hue: true in `ink` (its restraint, J-R3), false in `lit` and `hatched`
    sun: SunSpec; moon: MoonSpec;
    ambient: { day: number; night: number; underground: number };   // the sky's light relative to the global light's direct term on a surface facing it — by day ink 1.3, lit 0.85, hatched 1.05; at night 0.10; underground 0.02 (own)
    occlusion: { radiusM: number; strength: number };               // ambient occlusion from the surface: 6 m, 0.5 (own)
    bounce: { radiusM: number; share: number };                     // the indirect spill: 4 m, 0.15 (own)
    exposure: { nightLux: number };                                 // E_key at night and underground: 2 lx drawn at the albedo's full value (own); by day E_key is derived, (c)
    vector: { projected: 'drop'|'prism'; penumbraPx: number } }     // rung 3's look, and `hatched`'s own at every rung
  type SunSpec = { mode: 'cursor'|'fixed'|'path'; azimuthCdeg: number; altitudeCdeg: number /* the fixed sun: 31 500, 4 500 */;
    heightRatio: number /* h₀ of the cursor sun: 1 */; discCdeg: number /* the apparent radius: 27 */; colour: Color; intensityLux: number /* 100 000 */;
    latitudeDeg: number /* path mode; default 50 */ };
  type MoonSpec = { colour: Color; intensityLux: number /* a full moon: 0.25 */; phase: { at: number /* 0 new … 0.5 full … 1 */; factor: number }[] /* interpolated */; discCdeg: number /* 26 */ };
  ```

  (a) **The surface.** The tile worker rasters, beside each tile's base, a **surface layer** from the same marks
  (§8.8): per pixel the surface normal, its height above the tile's datum (the tile's lowest terrain sample) and the
  unlit coverage (below). Its writers: terrain `field` marks (height and normal from the field); roofs as surfaces from
  the roof construction of §8.6 — eave, ridge and the construction's own faces, never the straight skeleton directly, so
  §3.8's readers stay three (J-A28.32, KERNEL-C05); flat roofs, walls, towers and gatehouses as the tops of their prisms;
  bridge and pier decks at `deckCm`; tree crowns as domes to their crown height (the top-down view never shows the
  ground beneath a crown); water at its level; a building under Works at its stage heights (`heightsAt`, §4.11; item
  67); on the underground layer each floor, its walls and its ceiling. **Occluder slabs** hold what a single height per
  pixel cannot — a caster whose covered ground the view draws: a sky island under `ghost` or `offset` occlusion, the
  span marks of a building over a passage (§8.5 (2); their `baseCm` column the underside) and a bridge or pier deck over
  drawn water — each a per-tile record of its outline, its top and its underside, so the ground beneath is shaded from
  above and lit from the side, and an island's shadow falls from its underside (J-A68.83).
  (b) **The sources.** The **global light** — the sun by day, the moon at night (`LightingSpec.sun`, `.moon`); the
  **placed lights** — `LightSource` records (§2.7), placed by §4.7's light table or by hand (`placeLight`, §7.1), each a
  `light` mark (§8.1) with its height, intensity (cd), radius, colour and flicker; the **derived lights**, never
  records (J-A68.72) — lit windows (`live.windows`, §8.2's live layers, by §10.3's rule at the view's hour and week), the
  room lights of the plan rung (building band, §8.5), and **light shafts** (II.7.3, II.7.5, II.7.6: every access,
  grate, well or opening that breaks the surface, a downward source at its underground end whose intensity is the
  current global light's × the opening's area ÷ 1 m², a cosine lobe whose radius is its depth plus 4 m); finally the **hand lantern**
  — the viewer's own light (`handLantern`, underground only, off by default: a 20 cd source 1.5 m above the pointer's
  floor point, radius 6 m), never a record.
  (c) **Brightness.** At a pixel with albedo `A` (the base raster's colour in linear light), normal `n` and height `z`:
  L = A ⊙ (a · (1 − O) · E_g · c_g + Σ_s E_s · V_s · c_s + β · Spill) ÷ E_key. The sum runs over the global light —
  E = its intensity × max(0, n · l), no fall-off, since it stands for the sky's sun or moon — and over every point light
  whose radius reaches the pixel — E = I_s · max(0, n · l_s) ÷ d_s² × f(d_s ÷ r_s), the inverse-square law with the
  smooth cutoff f(x) = (max(0, 1 − x⁴))², so a light fades with distance and ends at its radius (the owner's "optimal
  distances and gradients of effectiveness"); `c` gives each source's colour; `a` the family's ambient share for day, night
  or underground; `O` the ambient occlusion — the mean over eight directions of the sine of the surface's horizon angle
  within `occlusion.radiusM`, × `occlusion.strength` (narrow alleys, courts and the foot of tall walls receive less sky);
  `Spill` the direct sum blurred over `bounce.radiusM` (three box passes, margin included) and weighted by
  `bounce.share` — the indirect light that "also helps to illuminate"; `E_key` by day is the illuminance of an unshadowed
  level surface under the fixed sun — E_g · (a + sin 45°) — so open level ground shows exactly its albedo and §8.2's palette
  targets hold on the lit map, a shadow there keeping a ÷ (a + sin 45°) of it (≈ 0.65 in `ink`, the ink family's shadow
  alpha 0.35; ≈ 0.55 in `lit`), a surface near the cursor sun reading a little brighter; at night and underground `E_key` is
  `exposure.nightLux`. In a `mono` family the bracket's colour is replaced by its luminance
  (Rec. 709 weights), so light moves value and never hue. The result is encoded back to sRGB and clamped.
  **Visibility** `V_s` is marched from the pixel toward the source through the surface layer's heights and the slab list,
  the ray's height rising linearly from `z` to the source's height: V_s = clamp(min over the march of (z_ray − h) ÷
  (t · σ_s), 0, 1), with `t` the distance marched and `σ_s` the source's apparent size as a slope (the sun's or moon's
  disc; a flame's radius ÷ its distance), stopping at the source or, for the global light, where the view ends. So a
  **shadow is one source's absence** and a gradient, never one shade: its edge softens with the source's size and
  distance; a spot every side of which other lights reach has no shadow; the spill lifts every shadow a little. And it is
  **height-aware** (the owner's point 4): a tall caster's shadow falls on a lower roof wherever the ray from that roof
  passes below the caster's top — shortened there by that roof's height — and continues beyond it onto open ground or the
  neighbouring building; a lower caster's shadow never climbs a taller neighbour, whose roof's rays pass above it; the shadow's
  length follows the source's height and distance.
  (d) **The cursor sun** (`SunSpec.mode 'cursor'`, the default; the owner: "the cursor moves the global light which
  creates different angles for every shadow"). With `V` the view centre on the ground, `D` the view's half-diagonal in
  metres, `C` the pointer's ground point, u = C − V and s = `sunHeight` (≥ 1; default 1), the sun stands at
  G = V + s · u, height H = h₀ · D · s (h₀ = `sun.heightRatio`). At s = 1 it stands over the pointer, and every caster's
  shadow falls straight away from it; a caster of height h at horizontal distance d from G throws its tip to
  d · h ÷ (H − h) beyond it (similar triangles), capped where the view ends when h ≥ H. As `sunHeight` rises the sun
  recedes along the line from `V` through `C` and rises in proportion, so the shadows turn from radial toward parallel,
  the pointer then setting the sun's bearing (from the view centre toward the pointer) and its elevation
  (atan(h₀ · D ÷ |u|)) — "very high: nearly parallel, realistic; lower: dramatic and radial". Where there is no pointer —
  the first map, a touch screen, every export, a still, a headless render — the sun is `fixed` (the sheet's 315° / 45°,
  its light falling from the upper left), or `path` when the view's `sunMode` is `path` (below). The pointer is a transient input,
  never stored, logged or hashed (§6.2). Because H scales with the view, a zoom changes the on-screen shadow lengths of
  the radial sun; the lengths of the fixed and path suns never depend on zoom (J-A68.84). The **moon** follows the same
  geometry at the night view's intensity and colour, its intensity × the `phase` row's factor at the phase of the drawn
  week and the `time` key's day on a 29.53-day cycle from week 0 (our stylisation).
  (e) **Day and night.** The per-viewer key `light` (§2.9): `day` (the default) — the sun; `night` — the moon and every
  point light, the scene dark but for them; `time` — day or night by the path sun's altitude at the `time` key, night
  below −6°, the two blended over −6° to +6°. By day point lights contribute nothing on the ground and sky layers (a lamp
  post stays a symbol). **Underground there is no global light at any setting** — the ambient is `ambient.underground`
  (near zero) and every lux comes from the point lights, the shafts and the hand lantern, dense in the undercity and
  around the dwellings below ground by the light table's underground rows (§4.7; II.7.3, II.7.5). How much light a night has is not a style value: it
  is the light table's rows (§4.7) with the era, `magic` and prosperity rows, so rich streets and magical districts are
  lit and poor alleys and hidden courts stay dark.
  (f) **The light pass** — one function with two implementations (J-A68.82). It is a **post operation over the base**
  (slots 1–20 of §8.2's order) and runs before labels, live overlays and furniture (slots 21–25), which keep their day
  colours, so the label floor holds at night (§9.4): the tile worker composes labels and `overlay` marks into the tile's
  one bitmap as before (J-R21 stands) and writes their pixels' coverage into the surface layer's unlit coverage, and the
  pass leaves a covered pixel at its composed colour (lit ⊕ composed, weighted by that coverage). The **CPU reference**
  runs in the tile worker for every export and still, the goldens and the tests, in float64 with its transcendentals
  through `dmath`, every sum in a fixed order — byte-identical on the five engines (§6.5 (9); J-A68.62). The **GPU pass**
  (WebGL2, WebGPU where available) is the main-thread compositor's (§8.9) for the interactive view and is held to
  the reference by §13.4's tolerance. The static lights and the occlusion are **baked** per tile into a **light map**
  (the Σ over point lights of their terms with their visibility, and `O`) by the tile worker, once per (tile, stop, tile
  DPR, style version, lights revision, drawn week, drawn hour, `light` key) — a light entering a tile's bake only when its
  radius reaches the tile, its march reading the surface of the tile dilated by that radius — so thousands of torches cost
  only what is on screen; per frame only the global light's term is evaluated, on the GPU over the visible tiles'
  surface layers assembled into one view texture, so a shadow crosses tile edges seamlessly. A fire light's **flicker**
  scales its baked term in the view by a pure function of its render key and the view's time (J-A68.61); the CPU
  reference draws it at its mean.
  (g) **The fallback ladder** (F-LIGHT, §5.2; J-A68.85). Rung 1 — the GPU pass at the tile DPR; rung 2 — the GPU pass with
  the global term at half resolution, upsampled by the surface layer's normals and heights; rung 3 — the **vector pass**,
  today's `ShadowPass(layer, sun)` (`drop` or `prism`, `vector.penumbraPx`) from the fixed or path sun, the family's
  night role variants (`@night`, §8.2) with a `glow` sprite at each light mark, and the light step (below) for
  `faceLight`, the two-tone roof, `hillshade` and the crowns. A tier's rung is chosen at app start from §8.8's canvas
  budget and the measured frame time (§12.5), lowered at run time on a lost GPU context or three consecutive frames over
  the pass's budget, never raised mid-session; every change is counted in the view telemetry, never an error and never a
  model change. Every export and still takes the CPU reference; an SVG draws rung 3's vector shadows, or with the export
  option `lighting: 'raster'` one embedded raster lighting layer from the CPU reference (§11.1). The `hatched` family
  draws rung 3 at every rung — its look is the prism pass of NG 1.2.2, below — while its night lights still come from the
  light marks.
  (h) **The parity presets and the families** (item 23; J-A23.71). `MFCG` — `model: 'none'`: the raised under-copy only
  (K06, above), no cast shadow, no night view and no light — our preset's behaviour, with no claim about the reference's
  (J-A68.86); `FTG` — the fixed or path sun and a low-intensity moon on the same path at night, one ambient term and the
  directional term only, and with it every shadow present only under `clear` or `snow` weather, and one window light
  at each lit building's main entrance (the anchor at which the FTG client as captured on 25 September 2026 draws its
  night lights, item 50; provenance `ref:FTG client (captured 25 September 2026) ambient-and-directional light (code)`,
  from its code reading's sections on light (2.2) and on night lighting (2.5.5 through 2.5.6), its P-id pending); `hatched` — the
  prism pass of NG 1.2.2, which offsets one shadow per wing by height against the light, shadows trees and pins the same
  way and multiplies them at the sheet's alpha, and at night an ambience wash with a glow per lit building (`ref:NG 1.2.2 prism shadow and night glow (code)`,
  from its code reading's section 2.11, P-id pending); the stage-3 building band under the parity presets — the
  per-facet diffuse-and-specular shading from one light, with a swept-silhouette shadow, as Fantasy Manor build 890 draws it
  (`ref:FM build 890 facet shading (code)`, from its code reading's sections 2.10–2.14, P-id pending). No constant of
  those readings enters a cell. Every default row of ours — the field model, the cursor sun, the moon, the point lights,
  the ambient, occlusion and spill terms — carries the `extension` marker, so the parity presets switch it off.
* **Shadow casters** (WC5; the surface layer's and the slab list's writers on rungs 1–2, projected on rung 3): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included; a building over a passage also casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm`
  plus the passage's `headroomCm` to that wing's eave over its span ring, projected from its underside like a bridge
  deck), towers and gatehouses (prism), curtain walls (prism of the band), bridges and piers (deck prism over water),
  trees (crown offset by the crown height), sky layers (the island outline projected by `elevationCm`); a building under
  Works casts at its stage heights (§4.11). On rung 3 every caster projects along the sun vector from its base elevation
  (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within FTG-13's plinth tolerance, so a flat
  projection from the base is exact to that tolerance — the height-aware receivers of (c) are rungs 1–2's. Rung 3's
  shadows are unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into
  a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun
  re-rasters only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth;
  `prism` draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec` (above): `cursor` by default where a pointer exists, `fixed` wherever none does (azimuth 315°,
  altitude 45°: light from the upper left); in `path` mode from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the view-state time
  (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign. The shadow pass
  reads the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude — on rung 3; on rungs 1–2 those programs emit albedo
  and normals and the light pass lights them once (J-A68.87). Below −6° the view is night by (e). Shadow length is
  capped at 8 × height near sunrise and sunset for the fixed and path suns. Rung 3's shadows are vector with no
  shadow-resolution setting; rungs 1–2's are sampled at the surface layer's resolution (§8.8).
* **Budget (AM-3; rung 3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
  `penumbraPx` is two vector rings, not a blur). **Measurement:** M2b times it on METROPOLIS tiles with `prism` shadows.
  **Pre-decided fallback:** a rung that misses draws `drop` instead of `prism` (same heights, one offset polygon per
  caster), reported. **A moving sun (N-8):** in `path` mode one 1° step re-rasters and re-composes the visible tiles'
  shadow layers — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside §12.5's settle budget — and a newer
  step cancels an older one's pending tiles (latest wins); on a tier with no room for shadow layers the step re-rasters
  the base tiles within the same settle budget. **Measurement:** M2b times steps on METROPOLIS views, one step per frame,
  on the reference and low-end devices. **Pre-decided fallback:** a tier whose step misses quantises the path sun to 3°
  instead of 1°, reported.
* **Light steps (rung 3).** When the path sun enters a new light step, a **light-step pass** bakes the `lit` crown sprites for it
  (§8.10), then re-rasters the visible tiles' `under` and `over` layers (or `base` on a tier without shadow layers) at
  that step, centre-out like a settle and within §12.5's settle bound, each tile swapped in when ready. A light-step pass is
  never cancelled by a newer light step: the newest waits and starts its own pass when the running one completes,
  skipping steps between, so the view reaches one light step within two settles; 1° shadow steps go on beside it (latest
  wins). Every raster of the view uses its **drawn light step** — the running pass's, or the last completed pass's —
  passed to each raster job as `TileRasterOpts.lightStep` (§8.9), so a tile exposed during a pass is rastered at the
  pass's step. Once a pass completes no tile keeps another light step, and tiers with and without shadow layers draw the
  same roof and crown tones (§8.3's light-step row). **Measurement (M2b, the moving-sun runs):** every light-step pass
  within the settle bound and the crown bake within §12.7's budget. **Pre-decided fallback:** in `path` mode `faceLight`, the
  two-tone roofs, `hillshade` and the crowns hold the sheet's fixed sun — only shadows follow the path — reported (J-R54).
* **Heights** of every building, wing, tower and roof are §2.6's — at a Works stage its derived stage heights (§4.11) —
  so the surface layer, the shadows, glTF and CityJSON agree (O17 g).
=== END ===
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
set), windows, the stair core, chimneys, abstract furniture by room role, room labels and lights (below; §8.2's presets) —
a clandestine building's concealed rooms, concealed door and way down only for a viewer whose knowledge key admits its
concealed use (§8.1 item 7, §9.2; item 63); a building
whose plan rung is `absent` draws its wings, a `stale` one its cached plan under the change marker below (J-A28.82). Way tiers: 1 = `through`, `primary`; 2 = `secondary`, `quay`; 3 = `lane`,
`cul_de_sac`, `alley`, `track`, `path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band
with hysteresis (entered at its threshold stop, left one stop past it); added detail cross-fades across that interval;
per-band detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM).

**Room labels and lights at the building band (item 28; J-A28.32, J-A28.85, J-A28.87).** The plan draw sets each room's label
itself: the room's role (§2.6's `RoomRole`, a §10.2 row's name) along the room's label spine — §3.8's `spine` reader on
the room's ring, its sampled medial axis on a downgrade — at the largest cap height in §9.4's room-label range whose
glyph boxes fit within the room's ring, and not at all below that range (hover still names the room). A room label is
a `text` mark with no `LabelTable` row (§8.1 item 2) and
never an S13b candidate: each lies inside its own room and the rooms of a storey never overlap (§3.10's seed-tiling
row), so room labels never collide with one another, and S13b reads their boxes as protected obstacles at the building
band (§9.2), so no placed label crosses one. A lit room (`Room.lit`, §2.6) has one light point at its spine summit —
the axis point of greatest clearance — a derived light of §8.4's light pass at the building band (on the vector rung a
`lights` glow in the night variants, §8.2's presets) and exported as the storey scene's light (§11.1). A derived plan's chimneys are drawn by
the roof construction (§8.6).

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
   between one mass's footprints at one third of that width, only where the footprint's short side is ≥ 4 px. **A
   building over a passage** (`Passage.frontBuilding`, §2.5) adds a **span mark** to its block's closing: one per base
   wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`; a stepped front's
   quads each), that wing's span ring — §2.6's cut of the `Passage` face under it — so its upper storeys cover the
   passage at the city band (J-A30.84, J-A30.87). S14 emits the span mark at every band, its `block` column the
   building's, its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its `heightCm` column
   that wing's `eaveCm` less that `headroomCm`, so the mark's top is that wing's eave; only the city band paints it,
   the finer bands reading it as a shadow caster alone (§8.4) while the passage's floor draws in `road` under its arch
   glyphs (§8.2). **An informal cluster is the exception (item 70; J-A70.81).** A plot of §4.7 S11's `cluster`
   arrangement is not closed into one mass across its footpaths: each shack, tent or lean-to draws as its own small roof
   mark in `building` with the band's outline (a structure below the 2-px floor as a settlement dot, item 3), and the
   footpath web between them in `ground` — a dense speckle of small roofs over a ground-toned path web, never an empty
   block and never a solid mass; the closing's other rules hold for every other plot of the block.
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

**Works stages by band (item 67; owner: "we should consider things being roofless or other visuals").** A building under a Works (§4.11) draws its stage at the drawn week (§8.1 item 7) by §8.2's
`states` rows: at the **city band** a **stage glyph** on its footprint mass — a scaffold hatch for the build, extension
and repair stages, a rubble stipple for the demolition stages, the ladder's rows for decay — cheap and legible; at the
**district** and **neighbourhood** bands the stage itself: the staked footprint, the pit, the low walls, the walls
rising without a roof inside a scaffold ring, the bare roof frame, the roof under scaffold, the stripped shell, the
rubble; at the **building band** the plan in progress (walls without doors or furniture; a ruin's fallen walls and open
rooms, §2.6). A plot boundary in transition draws dashed from the district band — the old line until the work clears it,
the new one as stakes (§4.11's *Works*, its step 7). Heights, and so shadows, follow the stage (§8.4).

**Views that are not the default (item 28; J-A28.42).** `plotsOnly`, a per-viewer view key
(§2.9), is the cadastral view: at the city and district bands it draws every plot's boundary (§2.5's cadastral outline
group) over the block ground and no building mark — masses, footprints, entrance ticks and roof detail off; walls,
ways, water, greenery and labels as they are. It is never the default: the default at city zoom is every footprint, MFCG's look, as J-A28.42 rules (§4.1).

**Change markers (item 28; J-A28.81).** A building whose elaboration record (§2.8) reads `stale` — an input of its wings
or plan rung changed since it was derived (§4.1) — carries a marker glyph at the building, neighbourhood and district
bands; a district holding any stale building carries one marker at the city band, so the user sees where the simulator
or the dossier has moved on — a Works stage changed since the building was last viewed among the inputs (item 67 (j)) —
and clicks at their own pace. The marker is the `live.stale` overlay layer (§8.2): composed
onto the tiles without re-rastering a base, never hashed, read from the records outside every digest; it vanishes when
the click re-derives the rung from its canonical prior — for a plan the stored plan, else the as-built plan carried
along §2.6's interior ladder; for wings the stored or as-built wings — never from the cache (§2.6, §7.3; J-A28.71).

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band —
with no S9 block preview on the one-click path (SCL-4; J-R7). Lazy work is only what the city band does not draw: yard
sub-parts, entrance ticks (the entrance set itself is S11's, §2.6), roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10), and the stage-3 rungs — wings and plans — by
click or by view (§4.1). **An unlit first map (item 68; J-A68.88):** the first map is composed without the light —
with the raised under-copy, as the `ink` look has always drawn it — and the tiles' surface layers and light maps follow
centre-out within §12.5's settle bound, the view then lit by the fixed sun until the pointer moves (§8.4 (d)); the time
to first map (§12.5) never includes them.
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map.
=== END ===
=== APPEND TO SECTION ### 8.6 Stage-2 render tier and stage-3 LOD ===
**A building in progress at the building band (item 67).** A building under a Works draws its wings at their stage
heights (`heightsAt`, §4.11) and, where its plan rung exists, the plan in progress — walls without doors or furniture,
a ruin's fallen walls and open rooms (§2.6) — from the committed composition, the parts §4.11's mutation steps have
reached at the drawn week drawn and the rest not yet; the composition is never re-derived per week, and a stage change
marks the rung stale through its elaboration record (§8.5's change markers; item 67 (j)).
=== END ===
=== REPLACE ### 8.8 Tiles, zoom stops, print and the canvas budget ===
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
  stop — and, for a light map, the largest radius among the lights that reach the tile (§8.4 (f)) — in §8.1 item 3's order, identical in every tile; each tile clips to its own square, so both sides of an edge yield
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
  light-step pass (J-R21) — the vector rung's machinery. **On rungs 1–2 of §8.4's ladder (item 68)** the tile worker
  also rasters, from the same draw sequence, the tile's **surface layer** — 4 B per pixel at the tile DPR: the octahedral
  normal in two bytes, the height above the tile's datum in one byte on a square-root scale to 160 m (h = (v ÷ 255)² ×
  160 m: ≈ 0.2 m steps at 5 m, ≈ 1.2 m at 100 m; a taller surface clamps and is counted), and the unlit coverage in one
  byte (the coverage of the label glyphs, halos and `overlay` marks it composed, so the light pass leaves them as
  composed) — and bakes its **light map** at half resolution (256² × 4 B: the point lights' term in three channels, the
  ambient occlusion in the fourth); both are transferred to the main thread with the composed bitmap, whose one bitmap
  per tile position stands (J-R21). The GPU pass reads the visible tiles' and a one-tile ring's surface layers, so a
  shadow cast from just outside the view still falls inside it. The CPU reference computes its surface from the marks
  directly into float32 arrays (height and octahedral normal, 12 B per pixel; its arithmetic in float64), never from the
  byte encoding, which is the GPU pass's approximation within §13.4's tolerance.
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change the layer's pixels: season, weather,
  shadows on or off and their mode, model-layer toggles, `plotsOnly` (city and district bands), `storey` (building
  band), `depthBand` (the underground layer), the knowledge key while a `use`- or `owner`-keyed thematic row is active
  (§8.2) or while the tile holds a concealed mark (§8.1 item 7), the drawn week where the tile holds a Works mark (§8.1
  item 7), the `light` key on the vector rung (its `@night` roles), `base` live layers; for the `shadow` layer — or, while projected
  shadows are on, `base` on a tier without shadow layers — the path-mode sun quantised to the tier's sun step (1°, or 3°
  after §8.4's fallback); for `under` and `over` — or `base` on a tier without shadow layers — of a sheet whose programs
  at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4); in
  `fixed` mode the sheet's sun belongs to the style version). Content version = the combination of the drawn marks'
  `revision`s. A composed bitmap is keyed by its base key plus the stop's label-placement revision and the `overlay`
  providers' versions. A `DisplayDelta`'s dirty boxes invalidate every cached tile they meet, at every stop and DPR. In
  path mode a new 1° step invalidates only the layers keyed by it, and a newer 1° step cancels an older one's pending
  re-rasters (latest wins); a new light step invalidates the layers keyed by it, which §8.4's light-step pass re-rasters
  to completion. A `surface` layer is keyed as its tile's base; a **light map** by §8.4 (f)'s tuple — (tile, stop, tile
  DPR, style version, the revisions of the `light` marks reaching the tile, the drawn week, the drawn hour, the `light`
  key) — so a moving pointer, a new `sunHeight` or a zoom inside a stop invalidates nothing cached: only the GPU's
  per-frame global term moves.
* **Canvas budget per hardware tier (N-9 b).** Counted: per visible tile position the worker's base (1 MB at 512²) and
  the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps kept for gestures (≤ 1 MB per visible
  position); fixed scratch — the shadow and post-operation buffers (2 MB), and the crown sprites and glyph atlases
  (≤ 5 MB), the crown sprites with a `path` sun in `lit` being one set per cached light step (the drawn step's set always,
  earlier sets while they fit, §8.10; a set a running export holds counts with that export's canvases, §12.8). With P the
  worst-case number of tile positions covering a W × H CSS-px view at tile DPR d,
  P = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and **4.25P + 7 MB** with path-mode shadow layers
  (`under` and `over` replace the base; the shadow layer adds ¼ MB), and **4.25P + 7 MB** with the light pass on rungs
  1–2 (item 68: per position the main thread's surface layer, 1 MB, and light map, ¼ MB; the path-mode shadow layers
  are the vector rung's and are then not held). Tier ceilings: low 72 MB, mid 128 MB, high 192 MB;
  tile-DPR caps: low 1, mid 2, high 3. The tile DPR is the device's pixel ratio capped by the tier, then stepped down
  (3 → 2 → 1.5 → 1) until 3P + 7 MB fits the ceiling — and, while the light pass is on, until 4.25P + 7 MB fits, the view
  taking the vector rung where that fails at DPR 1 (J-A68.89); path-mode shadow layers are used only where 4.25P + 7 MB
  also fits, otherwise a sun step re-rasters the base. Worked cases (`fixall_rendering_r2_budgets.out`): the reference view,
  1 440 × 900 CSS px at DPR 2, has P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end
  device at 1 366 × 768 or 1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB, fallback stop, scratch
  and atlases counted. Lit (rungs 1–2): the reference view keeps DPR 2 on the high tier (156 MB), steps to DPR 1.5 on the
  mid tier (P = 24, 109 MB); the low-end device at 1 366 × 768 is lit at DPR 1 (P = 12, 58 MB) and at 1 920 × 1 080
  (P = 20, 92 MB) draws the vector rung (PLAUSIBLE until M2b's canvas measurement, §12.8). Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes. The
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
  ≈ 14 MB); no canvas is larger than a tile band. A lit export (item 68) rasters each band's surface over the band
  dilated by the global light's march length and the largest light radius, runs §8.4's CPU reference light pass over the
  band's base, then composes its labels — one band's canvas and its float32 surface buffer at a time (≈ 14 MB and
  ≈ 43 MB at A2 300 dpi, plus the margin's rows, released per band; §12.8). Per-layer transparent PNGs use the same
  path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only tiles meeting the brush's dirty box re-raster (frame rate: §12.6). **Apply**
  commits the `warp` event (§7.1), whose invariants and re-derivation run then; **Discard** drops the copy (MFCG's staged
  warp, on our event model).
=== END ===
=== REPLACE ### 8.9 Backends, text, threads and the worker boundary ===
### 8.9 Backends, text, threads and the worker boundary

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and variants), on an
  `OffscreenCanvas` in the tile worker through the resumable raster jobs below; programs render typed-array paths, one
  `Path2D` per (program, semantic, variant) per tile, sprites by `drawImage`. SVG is written from the same display list
  (§11.1).
* **WebGL2 draws no marks.** It composites and, on rungs 1–2 of §8.4's ladder, lights: it uploads the composed
  Canvas2D tiles, their surface layers and their light maps as textures, composites them with the view transform, runs
  §8.4's global-light term and the composition of the baked light as fragment passes and then the post operations —
  no stroke tessellation, no SDF text, no look that differs by backend (VIS-7): the lit picture is the CPU reference's,
  to which the GPU pass is held by §13.4's tolerance (J-A68.82). WebGPU, where the browser has it, runs the same passes.
  While the light pass is off or on the vector rung the WebGL2 compositor stays the **pre-decided fallback compositor**
  it was: measured at M2b, pan and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at
  METROPOLIS scale (§12.5); enabled for a hardware tier only if Canvas2D misses ≥ 60 fps (reference) or ≥ 30 fps (low
  end) there.
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
  stages at every rung (§12.3) and, on request, `compose()`, `plan()` and close-up derivation from the committed state of the
  district it is handed; with the pool off the generation worker runs them. (3) The **tile worker holds no model and no
  terrain**: it holds the display list with its label, instance and string tables (the only full copy, §8.1 item 6) and
  from them rasters base layers and, with the light pass, surface layers and light maps (§8.4, §8.8), runs S13b (§9.2)
  and decoration instancing (§8.10), composes labels and `overlay` live marks (§8.8), runs post operations and every
  export's CPU reference light pass; it answers the main thread's furniture and snap queries and rasters raster
  exports from the transient list each request carries (§11.1) — all through the queue below, with everything arriving
  through the table below (J-R23). (4) The **main thread** runs the UI, compositing of the transferred tiles, pointer
  hit-testing on the hit-test slices, screen-space furniture (§9.5; placement scores and ruler snaps asked of the tile
  worker), input and, on rungs 1–2, the GPU light pass over the transferred textures, re-evaluated per frame while the
  pointer moves the cursor sun (§8.4 (d)). Nothing model-sized reaches the main thread (J-R10).
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the changed rows of the label, instance and string tables (candidates, priority, parent node, pinned placement, `hidden` and `knownTo` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: each slice copied into a fresh buffer and transferred; the generation worker keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 97 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks; the buildings whose rungs and the districts whose close-ups the band needs (`compose()`, `plan()`, close-up derivation) — derived on the request under `elaborate: 'view'`, and under `'click'` served only from the elaboration cache (§4.1, §8.6) | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, `plan()` storeys, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model, the visible region or — for a provider that reads them, `live.stale` — the elaboration records change (§8.2) | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles); with the light pass on rungs 1–2, each tile's surface layer and light map (§8.8) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile; + 1 MB surface and ¼ MB light map |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers, `plotsOnly`, `storey`, `depthBand`, the drawn week, `light`), the shadow sun, the light step, the lighting — the rung the export draws (the CPU reference for every raster export, §8.4 (g)) with its global light resolved to the fixed or path sun, since an export has no pointer — and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile and vector backends (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'|'surface'|'lightMap'; shadows: 'off'|'drop'|'prism' /* the vector rung's: StyleSheet.light.vector.projected (§8.2, §8.4) */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by the projected-shadow pass
    lightStep?: { azimuthCdeg: number; altitudeCdeg: number };  // the drawn light step (§8.4): read by faceLight, the two-tone roof, hillshade and the crowns on the vector rung
    lighting?: { rung: 1|2|3; light: 'day'|'night'; week: number; hour: number;   // item 68: rungs 1–2 draw albedo and write the surface; the `lightMap` layer bakes the tile's point lights at this week and hour
      reference?: { azimuthCdeg: number; altitudeCdeg: number } };                 // an export's or still's CPU reference light pass: the fixed or path global light
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
  | 3 | the visible view: S13b at the view's stop (§9.2); on the vector rung with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light-step pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); on rungs 1–2, after a tile's base, its surface layer and its light-map bake (one light per unit), then the next tile; re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list, its memo held by the job (§9.2, §11.1); in `lit` with a `path` sun on the vector rung, when the crown set of the request's light step is not cached, its bake (one sprite per unit), the set then held until the export completes; then, band by band, the band's raster jobs, its surface and the CPU reference light pass (64 rows per unit) when the export is lit, composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

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
=== END ===
=== REPLACE ### 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===
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
  r₀ = 400 cm (≈ 162 points each at the textbook annulus, `fixall_rendering_r5_seamstrip.out`; ≈ 175–180 at the shipped
  annulus below, PLAUSIBLE until `plat/tools/stamptiles/` builds the asset), each point carrying a **progressive rank**
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
  random source is `rng.stream` (§6.1, §14) under the `render.stampTiles` key and components of §6.1's registry entry
  (J-R42). **Sampling:** Bridson with k = 50 candidates, all evaluated, in the **candidate annulus** [r₀, (1 + a) r₀]
  on the torus the tile is, a = `poisson.annulus` = 0.1 — the thin annulus that packs the tile densely (provenance
  `ref:sampler annulus of MFCG 12710731, of NG 1.2.2, of VG 1.6.9 and of Dwellings itch 17195045 (code)`, P14; item 53; Bridson's
  textbook [r₀, 2 r₀], a = 1, is the alternative value, the one the measured receipts above used). Every accepted
  point is rounded at once to integer cm inside the 6 400-cm tile, so the spacing test is an exact integer comparison of
  squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active point is
  `int(0, n − 1)` over the active list in insertion order, a retired point replaced by the list's last; each candidate
  lies at radius r₀ × (1 + a × `float01`) along angle 2π × `float01` (cosine and sine from `dmath`, §6.5), tried in draw
  order. **The band (creation index 4):** a full toroidal tile sampled as above, cut to its points with e < 200 cm, in
  index order. **Each tile (creation index 0–3):** the band's points pre-placed in that order (in the spacing grid and as
  the initial active list), sampling then continuing over e ≥ 200 cm — no first point drawn, a candidate with e < 200 cm
  rejected like one too close; the tile is the band's points followed by its own in acceptance order. **Ranking**, per
  tile: each point's energy is the sum over the other points, in point-index order, of exp(−d² ÷ (2σ²)) (d the toroidal
  distance in cm, σ = r₀, `dmath.exp`); the highest-energy point (tie: lower index) is removed and takes the highest free
  rank (n − 1 first), and every remaining point has the removed point's term subtracted, in point-index order — the
  **removal update**: ≈ 1.5 n² exponentials (n(n − 1) + n(n − 1) ÷ 2, O(n²)), never a re-sum per removal (O(n³):
  ≈ 53 ms per tile against ≈ 1.8 ms at 161 points, measured cost model; ≈ 2.2 ms at 178 points by the same n² law). A
  needed square root is `Math.sqrt`, exact by
  specification (§6.5 (2)). The crown library's shapes use `dmath` the same way, so only their rasterisation into
  sprites is engine-specific. A class's band and four tiles build in ≈ 19.5 ms at the textbook annulus (measured cost
  model, `fixall_rendering_r5_seamstrip.out`) and ≈ 24 ms at the shipped one (the n² law; PLAUSIBLE until the asset is
  built). The annulus changes the density of the packing, never the tile construction, the seam band or the ranking
  (J-R11, J-R48, J-R50, J-R55 stand; J-A53.81).
* **The shipped asset.** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in registry order, its four
  tiles — each self-contained, band points first: a point count, then per point x and y as int16 cm and its rank as u16
  (6 B per point, ≈ 1.1 KB per tile, ≈ 34 KB for eight classes) — with a header naming the asset version, the format
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
  form is a report rendering, §14), drawn as sprites. On rungs 1–2 of §8.4's ladder a crown sprite carries its albedo
  and writes a dome's normals into the surface layer, and the light pass lights it — one bake per style, whatever the
  sun (item 68). On the vector rung a `lit` sheet bakes its sprites per (style, light step): once with
  a `fixed` sun, and with a `path` sun again at each light step, in the tile worker as one-sprite units of §8.9's queue;
  the drawn step's set is always kept, a set a running export needs is held until that export completes (§8.9, class
  4), and earlier sets are kept while they fit §8.8's crown-and-atlas scratch.
* **Edits (LC-20).** `instance` events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move`
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
=== END ===
=== REPLACE ### 9.1 What is model and what is view ===
### 9.1 What is model and what is view

* **Model** (S13a; in the model hash; persisted): every entity's name and short form; a `LabelEntity` per labelled thing
  with its candidates; the quarter merge tree (§9.4) and the region groups over it (item 101):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'region'|'way'|'landmark'|'place'|'water'|'wood'|'gate'|'title'|'annotation'|'address';
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    displayText?: string /* a map-side display text drawn instead of the name, which stays unchanged — a dossier-owned name above all (§7.7 item 11; item 20 (h)); set by `setAttr`, cleared by `revert` */;
    candidates: { spines: Polyline[] /* area and path labels, world cm, in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: PinnedPlacement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline;
    cityCut: boolean /* one of the min(N_q, L) quarters of the city cut (§4.5; L the number of districts): the city band's area labels */ }   // built by S6 (§4.5), named by S13a; every node has its own LabelEntity (kind 'quarter')
  interface RegionGroup { id: Id; name: NameRef /* set by its `group` event (§7.1), then like any name */; members: Id[] /* QuarterNode ids whose districts are disjoint: an Upper, Lower or Outer City */;
    spine: Polyline /* S13a, from the union of the members' faces by §9.3's area rule */ }   // item 101: a named region label group on the quarter tree; its LabelEntity has kind 'region'
  interface Placement {                    // a user placement, set by moveLabel (§7.1): model data (N-28)
    stop: number;                          // the zoom stop (§8.8) at which the user placed it
    sizePx: number;                        // cap height in display px at 1× (never below the kind's floor, §9.4)
    anchor: PointCm;                       // point labels: the text origin; area and path labels: the spine's midpoint
    spine?: PolylineCm;                    // area and path labels: the user's spine, world cm
    dirCdeg?: number; lines?: 1 | 2 }      // a point label's direction; two lines broken at the entity's first `breakAt`
  interface PinnedPlacement extends Placement {   // what LabelEntity.pinned holds
    seq: number }                          // the seq of the moveLabel event that set it (§7.1): applying the event writes pinned = { ...placement, seq }; a warp or vertex move that carries the pin keeps it; it orders §9.2's pin pass
  ```

  The `title` label entity carries the map title's text as model data; the title is placed by §9.5's furniture rule
  (layer-order slot 24, §8.2), not by S13b's greedy. **What the tree holds (items 65, 72, 82, 101, 70).** Node names
  and district names come from the dominant identity and character (§10.4, item 72), and a quarter the dossier
  claims carries its claimed name like any assigned name (§7.7 item 16, item 82) — S13a's naming, read here, never a
  second rule. An undercity neighbourhood (II.7.5; item 65) is a leaf of the tree under its parent district's node,
  named as the underside of that quarter, its labels candidates only while the underground layer is visible (§9.2); the
  sewer's pseudo-district stays a leaf in a family of its own (II.7.3). A **region group** (a `group` event, §7.1; J-A101.84) names
  any set of nodes whose districts are disjoint — its label drawn at the city band above the city cut (§9.4) — and is
  removed by `delete` or re-grouped by a new `group`; its registry row is §2.8's. An informal cluster (item 70) has one
  `LabelEntity` of kind `place` targeting its plot — a place name from §10.4, never one per structure — and a named court
  or yard may take the same kind. `displayText` is the drawing's text and nothing else: the reader, the gazetteer and
  every export give the name, with the display text beside it where one is set (§11.2).
* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size
  and glyph positions, the quarter cut, the halo roles. Pinned placements are honoured by §9.2's pin pass; a pinned
  placement moves with its target under a warp or vertex move (§7.4).
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — model hashes and per-stop placement digests are compared across Node, Chromium, Firefox and WebKit by
  §13.3's golden run. `moveLabel` (sets `pinned`) and `hideLabel` (sets `hidden`) are logged, hashed model events (§7.1);
  a scoped regeneration re-derives S13a only inside its scope (LC-17).

Judgment call: J-R12 (placement as view data, measured with our own font metrics).
=== END ===
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
  their drawn symbol extents at that stop, and the room labels the plan draw sets (§8.5) are obstacles at the
  building band too. S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14);
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
  what the map withholds is its name and its purpose. Every label row carries its target's `knownTo` (§8.1's byte:
  `public`, `local` or `secret`), which S14 fills from the plot's, building's or institution's record (§2.5 to §2.7, with
  §7.7; a plot's default from its exposure being §2.5's); ways, districts, quarters, water bodies, woods, gates, the title
  and annotations are `public`. Every viewer holds a **knowledge key** — the per-viewer view key `knowledge` (its tier and
  `places`, §2.9; its default and authority, §11.3). The **admission table** admits a row at a stop — the band is the
  stop's (§8.5) — and a row is never admitted at a band its `lodMask` excludes:

  | the target's `knownTo` | tier `public` | tier `local` | tier `secret`, or the place in `places` |
  |---|---|---|---|
  | `public` | at its kind's bands | the same | the same |
  | `local` — known to those who grew up there | the neighbourhood band and finer only | at its kind's bands | at its kind's bands |
  | `secret` — known only to those who were told | the building band only (its own view, J-A30.83) | the building band only | at its kind's bands |

  **The table is data (item 23; J-A30.86).** It is `knowledge.admit`, a §7.6 rule table keyed by (`knownTo`, tier)
  whose one cell is `coarsest: LodBand` — the coarsest band at which the row is admitted, `city` meaning at its kind's
  bands — read by S13b's candidate set, the reader (§11.2), the legend (§9.5) and every picture and interchange export
  (§11.1); its shipped rows are the table above, and a region, era or setting may change them (a village whose every
  name is `local`, say). Only `editTable` edits it — a logged event, which only the `owner` and `editor` roles send
  (§11.3) — never a style sheet or a viewer's `stylePreset`, through which a viewer could loosen its own
  admission. The loader refuses — and an `editTable` fails its dry run with `invalid` (§7.1) — a table in which a
  `public` row is not `city` or a higher tier admits a row at a finer band than a lower tier does, so more knowledge
  never shows less. An edit re-derives no entity, its readers being view passes, and re-places every stop (the memo is
  keyed by the table's version, below).

  The filter is applied to the rows before rung (5) and before any pin or collision is tested, so the greedy's local
  evaluation is unchanged; a withheld row is not a candidate and blocks nothing, its area or way being labelled — where
  rung (5) allows — by its public quarter. A pinned or user-hidden label (§9.1) is filtered the same way. `knownTo` is
  model data (`setAttr(knownTo)` is a logged event, §7.1; a dossier-backed place's value is the dossier's, §7.7) while the
  knowledge key is view data, so the model digest never depends on who is looking; the reader — hover and
  every `query` kind (§11.2), the legend (§9.5) and every picture and interchange export (§11.1) — withholds the same names
  by the same table, a reader without a band admitting as at the city band (§11.2). No reference
  has knowledge or hidden places (item 23): every row of the references' towns is `public` and the filter admits all.

  **Concealed parts (item 63; J-A63.81).** A clandestine building's hidden function is its own `Use` record (§2.7) with
  its own `knownTo` (default `secret`); one table therefore withholds it: its label row, its purpose in every reader
  and export, and — the one refinement of J-A30.83's "never its geometry" — the marks of its **concealed parts**: the
  concealed rooms of its plan, its concealed entrance's tick and door, and its concealed access down (§2.6, II.7.4),
  each carrying the concealed use's `knownTo` (§8.1 item 7). A viewer whose key does not admit that use at the band sees
  the building exactly as its front — its mass, walls, public rooms, main and service doors, the front's label, at every
  band — and no trace of the concealed parts; a viewer who holds the knowledge (tier `secret`, or the place in `places`)
  sees them all. The building itself is never withheld. **Secret ways down and between systems (items 64, 65):** an
  `AccessPoint` or `UndergroundLink` whose `knownTo` the key does not admit draws nothing and labels nothing, and a
  secret underground place (a guild seat in the undercity, a smugglers' passage) is withheld by the same table as a
  surface one; hiding the underground layer hides them all, and showing it admits them only by the key.
  **Which facts are the dossier's (item 20 (h); J-A20.82).** The reader (§11.2) gives, beside every fact it admits, its tier by
  §2.8's marker — `dossier` (immutable on the map; changed only by a dossier event), `declared` (an author's
  declaration, held, item 101) or `map` (derived) — so a user, a host and a clerk can tell the town's fixed facts apart
  from derived ones; the tier never widens what the key admits. **The clerk (item 101)** reads only through this reader with
  its viewer's key, so it knows and says no more than that viewer may know (§11.2; item 63 (c)).
* **The greedy.** Candidates at a stop are totally ordered by `priority` (the numeric `LabelEntity.priority`; by default
  region > quarter / district > water > landmark > place > gate > way > address), then larger target area (`areaM2`), then id. A
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
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision) and held per knowledge key, `knowledge.admit` version and view rotation (a changed key, table or rotation re-places the
  stop; the rotation because §9.3 orders an area label's stored spines by their on-screen horizontality, item 55); a
  stop's placement digest (§13.3) is therefore per (stop, knowledge key, rotation), the goldens taken at the `public` tier
  with no `places` under the shipped table, at rotation 0.
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10):** §12.7 — in the tile worker from the label rows alone (§8.9); an export's placement in class-4
  steps (§8.9).
=== END ===
=== REPLACE ### 9.3 Spines and candidates ===
### 9.3 Spines and candidates

* **Area labels** (districts, quarters, regions, places, water bodies, woods; GEO-39). The face is simplified with the kernel's
  topology-preserving Visvalingam (`simplify`, §3.4: a vertex removal is refused when the new edge would cross another
  edge of the face or of its holes, checked in the kernel's index) to half the label's cap height at the band's coarsest
  stop. The hole-aware straight skeleton (`skeleton(rings, 'spine')`, §3.8, gated by its validator: connected, one
  independent cycle per hole) is a planar graph with cycles around holes; each skeleton edge's clearance is the smaller
  event time of its two ends; the **maximum-clearance spanning tree** (Kruskal on edges by clearance, descending, ties by
  edge index) drops the lowest-clearance edge of every cycle — the narrow passage beside an islet or a clearing; the
  spine is the **longest path of that tree** by length (two linear passes), smoothed (Visvalingam → centripetal
  Catmull-Rom) and curvature-limited by §13.7's O13 (a) threshold and fallback. When the skeleton fails (F-SKELETON),
  the medial axis of boundary samples is processed the same way. Candidates per area, in order: the **horizontal spine**
  — among the tree's leaf-to-leaf paths, the one maximising its length plus its horizontal extent (evaluated over every
  pair of leaves when the tree has ≤ 64 leaves, else not offered), scored in model coordinates with model north up, so
  the candidate depends on the model only (provenance `ref:MFCG 12710731 label path choice (code)`, P16; item 55;
  J-A55.81) — then the spine; the spine trimmed to its central 80 %; the OBB-axis straight line; the OBB arc. The
  construction stays ours — hole-aware, clearance-first, and never retried with jittered vertices. Under a rotated view
  (the `rotation` view key, §9.5) S13b takes an area label's stored spines in descending order of their horizontal extent
  on the screen, a view-side order of model candidates (§9.2's memo is held per rotation); at rotation 0 the stored order
  stands.
* **Path labels** (streets — new to all four references —, rivers, walls): along the centreline at the district and
  neighbourhood bands, repeated per segment above 12 em of length, kept upright (flipped when the tangent points left).
* **Point labels** (gates, bridges, landmarks): eight anchor offsets; a leader line when the footprint is under 12 px —
  and, with the style sheet's `labels.leaders: 'always'` (default `'small'`, the 12-px rule), a leader line for every
  landmark label at the city band, the switch the authoring toolkit's T11 `name` exposes (item 101; J-A101.84; a style
  value, no model change).
* **Addresses:** the numbering is model data (S13a: monotone along each way, per side); the numbers are placed as view
  data at the neighbourhood band.
=== END ===
=== REPLACE ### 9.4 Sizes, floors, the ladder, quarters, overflow, halos ===
### 9.4 Sizes, floors, the ladder, quarters, overflow, halos

* **Legibility floors** (display px at 1×): area labels cap height ≥ 7 px (and ≤ 14 px, ∝ √area within the band); way
  labels cap ≥ 6 px; point labels ≥ 6 px; addresses ≥ 5 px; room labels cap 5–9 px, each sized within that range by
  §8.5's plan draw (J-A28.87); region labels (item 101) cap 1.25 × the city cut's largest quarter label and ≤ 18 px,
  letter-spaced 0.25 em, drawn at the city band only; place labels (item 70) as area labels, from the district band.
  Area labels are letter-spaced small caps (0.15 em).
* **The F-LABEL ladder, view side** (every rung reached is counted in the report): (1) the preferred spine at the size
  ∝ √area, never below the floor; (2) the short name form; (3) a straight label on the OBB axis, on one line or on two
  lines broken at a space (two lines at a `breakAt` position); (4) the OBB arc; (5) the **quarter tree** (N-11) —
  decided per stop before the greedy, from geometry alone: when none of rungs (1)–(4) fits the label's own face at the
  floor at this stop, the label yields to the smallest ancestor `QuarterNode` (following `LabelTable.parent`, §8.1)
  whose spine fits that node's own name at the floor. The yielding label is suppressed at that stop and reported ("named
  by quarter Q at stops k…k′"), and the ancestor's own `LabelEntity` becomes a candidate at that stop — once, however
  many members yield to it, and not again when the stop's cut already labels that node — with the highest priority among
  its yielding members, the node's area and the node's label id, so its place in §9.2's strict order is fixed before the
  greedy runs; it then takes its own alternates (its spines and rungs (3), (4), (6), (7)) like any candidate, and
  members whose own rungs fit keep their labels and are obstacles to it like any placed label (J-R27); (6) a declared
  **overflow**: ≤ 20 % of the glyph area outside the face, never over a protected obstacle or another label; (7) a
  **legend entry**: a numbered disc on the face and a row in the legend (§9.5).
* **Quarters (VIS-4, MFP-10).** S6 builds the merge tree of districts once per model by §4.5's rule. S13a gives each
  internal node a name from the grammar, conditioned on its members' dominant identity (item 72) and kind and on the
  naming feature of its largest member (§10.4), and a spine from its union (§9.3). The names, spines and the **city cut** — the `min(N_q, L)` nodes of §4.5's
  city cut (L the number of districts; `docs/validation/bench/fixall_pipeline_r2_quarters.out`, J-P28's column), MFCG's
  label count, flagged `cityCut` — are model data; the city band labels the city cut; a stop between the city and
  district bands may use a finer cut (the finest nodes whose spine fits the floor), which is view data; the district
  band labels districts. **Region groups (item 101)** sit above the tree: each is a candidate at the city band with the
  highest priority of §9.2's order, its spine from its members' union (§9.1), and the city cut's labels inside it are
  obstacles to it like any placed label — a region that cannot fit its floor at a stop is hidden there and reported,
  never rung (5)'s quarter substitution, which stays the tree's.
* **Halo (VIS-15, N-3).** Each glyph's halo, 1.5 px wide, takes the role of the area mark under the glyph's centre,
  looked up in the display-list index at the label's band (`ground`, `road`, `water`, `field`, `green`, …), **when** the
  text colour against that role passes the **label floor** (§8.2's ink / ground row); **otherwise it takes `ground`**,
  which passes by that same row in every accepted palette. Text is therefore always separated from what it crosses: over
  masses and woods its halo is the block's ground tone (J-R28). With the shipped palettes the local role is kept over
  paper, road, ground, court, field, verge and green in every family and over garden and water in `ink` and `hatched`;
  `ground` replaces building and tree in every family and garden and water in `lit`
  (`docs/validation/bench/fixall_rendering_r2_palette.out`). SVG writes the halo as a paint-order stroke per glyph in the
  halo's colour. A user palette accepted with "accept low contrast" (§8.2) may fail the floor; the report lists the
  failing text / halo pairs. **At night (item 68)** the halos and the text keep these day colours: labels, halos and
  furniture are composed after §8.4's light pass and never lit, and the halo's role is read from the day palette even
  where the vector rung draws the base in its `@night` roles, so the label floor holds in every light and on every rung.
* **Acceptance** (B-ZOOM; the default view of every rung; the bundled font): **every node of the city cut** —
  min(N_q, number of districts), §4.5 — labelled on the map at or above the floor, and at the matched sizes within ± 1 of
  the 9 / 12 / 18 district labels MFCG's plain sweep draws at sizes 40 / 80 / 130
  (`captures/mfcg/exports-sweep-2026-09-25/README.md`); 0 protected overlaps; 0 collisions at settled views and during a
  scripted zoom sweep, pinned labels included; every placed glyph's text / halo pair at or above the label floor, read
  from the rendered pixels (§8.3); overflows, legend fallbacks, quarter substitutions and hidden pins reported; ≥ 99 % of
  all area-label glyph area inside its face (O13 a); ≥ 90 % of named streets labelled at the neighbourhood band (O13 b).
  **Pre-decided fallback** if a rung labels fewer than its city cut at M1: the default framing percentile (§9.5)
  tightens from 95 % to 85 %, which enlarges every district on screen, and the check re-runs.
=== END ===
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
  whose box covers the least mark area, the sum of its `coverage` record from the same furniture query); movable. A
  dossier-bound map's word for its size is the dossier's own tier word — a SettlementForge "city" of 5 001 people is drawn
  on the TOWN rung and titled a city — a dossier fact (§7.7 item 15; item 81; J-A81.72); a standalone map's word is its
  rung's.
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
* **Authoring surfaces (item 101 (i); R3, R4, R14, R16).** While a declaration is being drawn, or a derived shape is
  selected, the main thread draws its **handles** — four to eight by default, more on the user's request — over the
  `live.ghost` preview (§8.2); dragging one is a new declaration of the same kind on the same entity (§7.1). The
  **feature snap** lights the candidate edge — a street centre-line, a shore, a wall, a ridge, a block edge — as the
  pointer comes within 8 px, answered by the tile worker's `RoleIndex.snap` exactly as the ruler's (§8.9), and holding
  Alt places freely; the snap is resolved into the event's points before its dry run (§7.1), while the kernel's own
  attraction still applies to every insertion (§3.6). The **count badge** beside the ghost shows what an area
  declaration (`quarter`, `fill`, `roster`) will hold — its plots, households and buildings from the dry run (§7.1) —
  with plus and minus that re-run the dry run at one more or one fewer; numbers show while drawing (a way's length, an
  area in hectares). All are screen-space furniture: never exported, never in the model, never read by the clerk.
* **Underlay (item 101, T12 `dress`; J-A101.81).** An image the user drops under the map to trace: the per-viewer view key
  `underlay` (§2.9: the image, its opacity 0–1 — default 0.5 — and its frame as a world-cm affine placement with four
  handles). The compositor draws it first and the composed tiles over it at 1 − its opacity, so the image shows through
  the map without re-rastering a tile; it is never exported and never in a digest, never crosses the bridge (§11.3), and
  no model code or clerk reads it.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI
  scale; device pixels are handled by the tiles.
=== END ===
=== APPEND TO SECTION ### 9.6 Names ===
**Names from character, places and claims (items 70, 72, 82).** A district's and a quarter node's names follow their
identity and character (§4.5, §10.4; item 72): a district whose identity changes past its hysteresis at an epoch
re-draws its unprotected name by §6.3's epoch case, the old name kept in `District.nameHistory`, which the reader shows
as a former name; this section's uniqueness rule resolves the new name like any other. An informal cluster takes one
place name, drawn once for its plot (§10.4; item 70), and its structures are unnamed. A quarter name the dossier claims
(§7.7 item 16; item 82) is a protected name, re-matched only past the identity hysteresis; a map-side display text a user sets
belongs to the label (`LabelEntity.displayText`, §9.1), never to the name.
=== END ===
=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; every record's fields with their tier by §2.8's marker — `dossier`, `declared` or `map` (item 20 (h)) — and each event's authorship with the log (item 101 R19, below); each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the document's week (item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (§9.2 and §11.3) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key; a fallen island's archived arena is not exported (II.6) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2); the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups and under the labels | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island; the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the document's week extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node. OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces; over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge`, `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` and an underground cell as a `Building` whose base lies below the datum (items 12, 29); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format under *Knowledge* (below): offered only to a key of tier `secret` |
| **skeleton** (item 101) | the document's **declared subset**: a `.plat` document with no model, whose log is the recipe's intent and, in log order, every event whose entities §2.8's marker labels `declared` — the author's declarations, the sugar events among them (§7.1) — each marked `creation`, so importing makes them the creation prefix of a new document, whose stages read its drawn declarations ahead (§4.1, §7.7) | with the same seed, a skeleton exported and imported again reproduces the city byte for byte (§6.5 (9)'s skeleton round trip); a clerk's transcript of tool calls is itself a valid skeleton; a document format under *Knowledge* |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), so a shared SVG, PNG, VTT scene or GeoJSON carries no name and no purpose of a
local or secret place the key does not admit — the place itself, its faces and its doors, stays in the file (§9.2) —
and none of a concealed use's concealed parts (its rooms, its concealed door, its way down; item 63) or of a secret access
or link (items 64, 65), which §9.2's refinement withholds as marks too (J-A63.81). A
picture admits at the band it draws (an SVG its declared band, a raster the band of its export stop, a storey's scene
the building band); a file without a band — GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries — admits as at the city
band (§11.2), so a file never names what the town view withholds. The document formats — `.plat`, the compact twin, the
JSON schema and a permalink (its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) — are
the model and carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs.
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**Authorship and tiers in every export (items 20 (h), 101 R19; J-A101.82).** Every model and interchange format carries,
per record or feature, the tier of each fact by §2.8's marker — `dossier` (the dossier's, immutable on the map),
`declared` (an author's declaration, held) or `map` (derived by rule) — and every format that carries the log (`.plat`,
the compact twin, the JSON schema, a skeleton) carries each event's author, its `proposedBy: 'clerk'` where a clerk
proposed it (§7.1) and its `dossierChange` where the dossier caused it (§7.7 item 13); a picture's metadata (SVG
`<metadata>`, the PNG's text chunk, the VTT scene's `plat` object) states the share of its entities in each tier and
whether any clerk-proposed event made them. The hobby reads what was hand-declared, what the rules derived and what an
AI clerk proposed from the file itself.

**Inert exports (item 85 (c); J-A85.81).** Every text node, attribute value and metadata string an exporter writes is
escaped by its format's own rule — XML escaping in SVG and every XML text, JSON string escaping, the VTT formats' JSON —
so a name from a dossier or from another user's edit can never become active content; the SVG writer emits no script
element, no event attribute, no `foreignObject` and no external reference (its fonts and images are data URIs, §17.2), and
§9.5's emblem imports stay sanitised. The bar — CI runs hostile names through every exporter and asserts inert,
well-formed output — is §13.2's. **Display names (item 85 (b)).** A host may pass `HostContext.displayNames` (dossier key
→ text; §14) with one export request: the exporter draws those texts for that request only and writes them nowhere else —
never into the document, a cache or a later export.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. For a dossier-bound map whose host supplies the optional realm block (item 77; §14), the port's realm
fit sets the anchor's `bearingDeg` — the turn of model north that fits the derived gates to the partners' true
bearings (§7.7 item 2) — as the key's documented default; no geometry moves for it. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
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
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the
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
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` — a concealed door only for a key
  that admits its use (item 63); `lights` — the model's lights in the scope (item 68): every `LightSource` lit at the
  export's drawn week and every lit window at the export's hour (§10.3), `{ position, range in squares (its radius),
  intensity: 1, color, shadows: true }`, and on the underground layer its shafts; `environment { baked_lighting: true,
  ambient_light }` with the ambient of the export's light setting; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in, lit by §8.4's CPU reference at the export's light setting (a day or a
  night scene).
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g).
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; `lights` — one per lit room (`Room.lit`, §2.6) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `lights` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.
=== END ===
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
  preview(h: DocHandle, e: EditEvent | EditEvent[], opts?: { view?: ViewHandle }): Promise<PreviewResult>;   // item 101: the dry run alone — nothing committed; with a view, its ghost drawn as `live.ghost` (§8.2)
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
type PreviewResult = { status: 'ok'|'conflict'; actions?: ConflictAction[]; fates: EditFate[] /* the first 1 000 */; renames: Rename[];
  counts: { plots: number; households: number; buildings: number; byFate: Record<EditFate['fate'], number> } /* §9.5's count badge */;
  shape?: PolygonCm | PointCm[] /* a points form's derived shape, resolved as the event would store it (§7.1) */; bent?: string /* the one-line reason a declaration was bent to the nearest lawful one (R2) */ };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number } | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number }                // the full fate list of a pending confirmation, then its renames
  | { kind: 'why'; id: Id; path?: string };                       // item 101: the oracle — the rule, its inputs and the alternatives it weighed, from provenance and §2.8's derivation records
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83, J-A30.85).** `query` answers of every kind — `gazetteer`, `people`, `whereIs`,
`relations`, `hit`, `inView` — and hover content list every entity in scope with its kind, address and geometry, but
withhold the `name` and the purpose of a place (its `use`, or an institution's kind) whose `knownTo` (§2.5–§2.7) the
view's knowledge key does not admit under §9.2's table, marking the row `withheld: true`; a person's workplace or
household that is a withheld place is given by its address only, and the person's profession is withheld with it where
that profession is the place's use. A view-bound reader (`hit`, `inView`, hover) admits at its view's band — a secret
place at the building band (§9.2's table); a band-less one — the gazetteer, `people`, `whereIs`, `relations`, and
every export without a band (§11.1) — admits as at the city band, so a list or a file never names what the town view
withholds. `fates` pages and a `confirm` result go only to an editing role and are not filtered: `confirm` needs the
lists back unchanged (*Confirming fates*, below), and an editing client holds the document it loaded (`open`, above,
or §11.3's `doc.load`), for which the key is no secrecy boundary (§11.1). A content provider (§14) answering through
`query` gets the same filtered
rows. A host that holds the dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking. A concealed use (item 63) is a place like any other here: its rows,
its rooms and its way down are withheld where the key does not admit it, and the front's rows stand. **Tiers (item 20
(h)).** Every row of every answer marks each fact it gives with its tier by §2.8's marker — `dossier`, `declared` or
`map` — and a `why` answer names, for a derived fact, the derivation table's row that made it (§7.7 item 10), so the
reader keeps the town's fixed facts apart from derived ones; a label's display text is given beside the name (§9.1).

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

**The clerk's tool API (item 101 (b), (d); R10, R19; J-A101.83).** The tool API a clerk — the host's own, as
SettlementForge's will be, or the staged built-in one — drives is this API, with nothing added for it: the declarations
are §7.1's events and sugar events through `edit`; the reader is `query`; the **oracle** is `query({ kind: 'why' })`,
answered from provenance and §2.8's derivation records — the rule, its inputs and the alternatives it weighed (the
closest acceptable sites of §4.7 S10b, the rows a derivation fell back through, §7.7 item 10); and a proposal is a
`preview` — the dry run's fates, renames, counts and derived shape, drawn as a ghost in the viewer's view (§8.2's
`live.ghost`), nothing committed — which the user accepts as an `edit` carrying `proposedBy: 'clerk'` or drops (J-A101.74,
§7.1). A clerk is a client like any other: it holds a role and a knowledge key given by its host (§11.3), so it never
bypasses the dry run or the undo, never writes a dossier fact (a `dossier-owned` refusal stands, §5.2) and reads and says
only what its viewer's key admits (§9.2). Its transcript of `edit` calls is a skeleton (§11.1).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `preview` | in: events; out: `PreviewResult` (the ghost reaches the view as a `live.ghost` delivery, §8.9) | copy | < 64 KB; the preview's time §12.6's |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery, a dossier event's entries naming its `changeId` and reason (§5.4; item 75); items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).
=== END ===
=== REPLACE ### 11.3 The host bridge — the host is the store (FTG-12) ===
### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist, and — item 85 (d) — the message's source window checked to be the embedding window it was bound to,
  so a second frame of the same origin cannot speak for the host) and `MessagePortTransport` (any relay — a
  browser-extension content script, a SharedWorker, a chat-bus relay; COV-FTG-N06). Envelope:
  `{ plat: 1, type, session, seq, re?, logHead?, body }` — `re` on every reply (`query.result`, `export.ready` /
  `export.refused`, `doc.applied` / `doc.rejected`) is the `seq` of the request it answers, so a host with several
  requests in flight matches each answer to its question (item 85 (d)); host messages that arrive before the module has
  sent `ready` are queued and delivered in order after it, never dropped. **SettlementForge's configuration** is the module
  in an iframe on its own origin, speaking through `WindowPostMessageTransport` (item 85 (e)); a worker or a service
  remains the configuration for other hosts (J-A85.82). The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`,
  `report.changed { entries }` (§11.2's report event; a dossier event's entries name the `changeId` and the reason of the
  change that caused them, so the host sees why — never a request back; item 75). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
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
  and advanced by the module-tier message `sim.advance { hours }` (§10.3). The per-viewer keys `knowledge` (§2.9; admitted by
  §9.2's table), `elaborate` (§4.1), `storey`, `depthBand` and
  `plotsOnly` (§8.4, §8.5) travel the same way, and so do the light keys `light`, `sunMode`, `sunHeight` and
  `handLantern` (§8.4; item 68) and the drawn week `week` (§4.11; item 67); the pointer that moves the cursor sun and the
  `underlay` image (§9.5) never cross the bridge. **The host's clock (item 67; J-A67.82).** The clock the design calls
  "the simulator's" — the one whose weeks move the map's history — is the host's: its advance reaches the map only as
  dossier events and epochs, which the port dates and groups by §4.11's week and cadence (§7.7 items 1 and 6; §11.4),
  and a host shows its campaign's current week by `view.set { week }`; the module's `time` key counts hours and never
  moves the map (§10.3). A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load` — for SettlementForge by the audience table of the port's
  host glue (DM, co-DM, player, anonymous; §14, item 85 (f)), never a rule of the model. A viewer's client never emits `doc.changed` (model edits
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
=== END ===
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
check and the record.

**A dossier comes through the port (items 73–87; §14).** For a dossier, door (1)'s blueprint and the log's creation
prefix, and door (2)'s events and epochs, are produced by `@plat/port` (§14, item 73): the host passes the whole dossier
and, when it has them, the optional fields of `HostContext` — the week, the realm block, the audience, display names, the
product line — and nothing else; SettlementForge uses doors (1)–(3) through the port, door (4) serving in-page
embedders. The port refuses a dossier whose population lies below 1 500 with `E_RUNG_UNAVAILABLE`, naming the village
product, while none is registered (§7.7 item 15; item 81) — §1.1's clamp serves only a request that carries no dossier.
Door (2)'s events carry the element's binding key in `EditBase.dossier.element` (§7.7 item 12; item 74) and the change
envelope in `EditBase.dossierChange` (§7.7 item 13; item 75), dated and grouped into epochs by §4.11's week and cadence.
**Optional only (item 20 (h) (iv); J-A20.79):** every field these doors accept beyond what the dossier holds today is
optional — a stable id, a location hint, a class; whatever the dossier does not give, the map derives by §7.7's
derivation table; no door, message or report asks the host for a fact. What a host's data the module never reads is
§7.7 item 1's list (item 86), and the port's adapter reports every key it dropped. A host's own undo arrives as a
dossier change like any other and converges by the solver's order; the port's report names the earlier absorbed state
the dossier now equals, `state_matches_absorbed` (§7.7 item 5; item 87). **No door opens the other way (owner, J86 Q2;
J-A73.81):** the host's simulator never reads the map's geometry — the module writes no geometry, layout or district
read for the host, now or by default later (the plan's "door 1", closed); because the map follows purely from its seed
together with the ordered dossier history (§7.7 item 6), a canonical-only geometry export could be added later without redesign,
and only on the owner's explicit word. The port's wiring to a live host bridge is staged (*Staged by the owner's
roadmap*); the port itself is §14's, its creation half built at M1 and its absorb half at M3a (§16).
=== END ===
=== APPEND TO SECTION ### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6) ===
**Lighting (item 68; §8.4).** The first map above is composed unlit and its time never includes the light (§8.5; the
laws stand); the surface layers and light maps of the visible tiles follow centre-out, lighting the view within the
settle bound above (≤ 150 ms for a CITY view, ≤ 250 ms for a METROPOLIS view, §12.7's bake inside it). While the pointer
moves the cursor sun, the global light's term runs every frame on the GPU: ≤ 1 ms of main-thread work per frame (its
uniforms and one draw per visible tile set) inside the ≤ 4 ms above, and the GPU pass ≤ 8 ms per frame at the reference
viewport on the reference machine (rung 1: ≤ 48 march samples per pixel), ≤ 16 ms per frame for the low-end device (PLAUSIBLE),
so pan and the moving sun keep ≥ 60 fps and ≥ 30 fps; the moving pointer re-rasters and re-bakes nothing (§8.8's keys).
**Measurement (M2b, in B-CITY's browser runs):** the GPU pass's frame time while the pointer sweeps the reference and
low-end views at every rung. **Pre-decided fallback:** a tier that misses drops one rung of §8.4's ladder (1 → 2 → 3),
fixed at the milestone and reported, and the run repeats.
=== END ===
=== APPEND TO SECTION ### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) ===
* **Previews and the authoring toolkit (item 101).** A declaration's preview — its dry run with the ghost, the handles
  and the count badge (§7.1, §8.2's `live.ghost`, §9.5, §11.2's `preview`) — costs its scope's edit budget above (a
  quarter or a fill the scoped regeneration's law over the buildings it holds; for a place the single-plot bound, for a road the
  coarse-edit bound), plus ≤ 3 ms to deliver the ghost; while a declaration is drawn the preview re-runs at most once per
  settle of the pointer (120 ms after it stops), the latest winning. T1 `intend`'s sliders are basic-panel controls whose
  change is a regeneration — within §12.3's model law and §12.5's first-map law, as any Adjust of an early parameter
  (§7.8's proxies for the site cards). Measured with B-EDIT at M3a, where the toolkit's area tools ship; pre-decided
  fallback: the preview re-runs only on release, reported.
=== END ===
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
  carries no library build. **The crown library:** its build (20 crowns per class per style, once per session) and, on
  the vector rung in `lit` with a `path` sun, each light step's bake run in the tile worker as one-sprite units (§8.9), ≤ 20 ms of
  tile-worker time per (style, light step) for eight crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D,
  ≈ 3–10 ms for 160 sprites), started when the style loads so the first district-band raster finds it ready; a light
  step's bake runs at the head of §8.4's light-step pass, inside its settle bound. Measured with M2b's moving-sun runs (§8.4),
  where `lit` ships; pre-decided fallback: §8.4's (with a `path` sun the lit programs and the crowns hold the sheet's fixed
  sun, so the library is baked once), reported.
* **Lighting (item 68; §8.4).** In the tile worker, per visible tile after its base: the **surface layer** ≤ the base
  raster's own time at the band (the same draw sequence writing normals, heights and coverage; PLAUSIBLE), and the
  **light-map bake** ≤ 2 ms per tile for up to 50 lights reaching it and ≤ 4 ms for up to 200 (PLAUSIBLE: 256² texels ×
  the lights whose radius covers them × ≤ 24 march samples, plus the eight-direction occlusion), each light a unit of
  §8.9's class 3, so a lit settle stays within §12.5's settle bound for the city and district bands of the golden views.
  **A lit export** adds the CPU reference light pass: ≤ 60 ms per 512² tile of the export (PLAUSIBLE: ≈ 262 000 pixels ×
  the global term's march of ≤ 32 samples, the baked point lights and the occlusion, in float64), so A2 at 300 dpi of a
  CITY lit takes ≤ 30 s with the view idle (unlit, the ≤ 20 s below). **Measurement (M2b, where the light pass ships with
  `lit`):** the bake and the export pass on METROPOLIS views and on B-CITY's A2 exports. **Pre-decided fallbacks:** a
  bake that misses halves its march-sample cap (24 → 12); an export that misses computes its light pass at half
  resolution, bilinearly upsampled — the reference defined at that resolution on every host, a declared view shift
  (§13.3) — reported.
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
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool — for a neighbourhood's buildings on its
  click under `elaborate: 'click'`, streamed to the tiles centre-out, or, under `'view'`, per band request of a tile (§8.6
  and §8.9, by §4.1's policy) — one tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its
  compositions arrive). A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test
  instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included — so the 1 ms
  `compose()` bound has headroom; SCL-13's basis were cold first-build samples (item 59).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool when the user clicks — or, under `elaborate: 'view'`, on the
  tile's band request (§4.1) — one plan for each click, inside a single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay),
  opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4). A re-cut — of a `stale`
  plan at its click, or of a stored plan inside the event that changes its
  inputs (§7.3; J-A28.72) — runs as §2.6's chain of such steps along item 28 (f)'s interior ladder: one per band row
  crossed and one per household added or removed, from the as-built plan's row and count for a stale plan (the canonical
  chain) or from the stored plan's, fewer where the cache holds a memoised step (§2.9); its length — at most the band
  set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6) — is known
  before the first open; budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95. PLAUSIBLE until §13.2's T28-8 measures
  it on B-PLAN's fixtures and the stage-3 intake confirms it;
  pre-decided fallback for a class that misses: its wing-local module row doubles (50 → 100 cm), a declared view shift
  (§13.3, a plan being derived data), and the measurement re-runs; a miss at run time is reported, never answered by a
  coarser plan (§12.1).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.
=== END ===
=== APPEND TO SECTION ### 12.8 Memory (what is counted, per rung) ===
**Lighting (item 68).** The light pass's per-position textures — the surface layer (1 MB at 512²) and the light map
(¼ MB) on the main thread — are canvases, counted by §8.8's canvas budget (4.25P + 7 MB while the pass runs on rungs
1–2; J-A68.89), never in the rung lines above; the `light` marks' rows sit in the display list's line (≤ 36 B per light,
§8.1 item 6). A lit raster export holds, beside its band canvas, the band's float32 surface buffer (≈ 43 MB at A2 300 dpi
plus the margin's rows, §8.8), released per band and counted with the export-time peak above. Measured with the canvas
runs at M2b; pre-decided fallback: the tier's rung drops (§8.4's ladder) or its tile DPR steps down, as §8.8 states.
=== END ===
=== J-ROWS ===
| J-A53.81 | §8.10's sampler takes its candidates from the thin annulus between r₀ and 1.1 r₀ on the tile's torus (`poisson.annulus` 0.1, the references' own, P14; Bridson's [r₀, 2 r₀] the alternative value); the tile construction, seam band and ranking unchanged; point counts and build time restated PLAUSIBLE until the asset is built | §8.10 |
| J-A54.81 | the raised under-copy's offset × a class row's ratio — house 1, landmark 2, farm building 0.6 (P15) — read off the display list's semantic and class, no model field; the swept construction stays ours | §8.2, §8.4 |
| J-A55.81 | the horizontal spine first among an area label's candidates, scored in model coordinates so candidates stay model data; under a rotated view S13b orders the stored spines by on-screen horizontal extent, the placement memo and digests held per rotation, goldens at rotation 0 | §9.3, §9.2 |
| J-A68.81 | the default view: day, the cursor sun and cast shadows on in every shipped family — `ink` gently and in value only — the `MFCG` preset without; over the item's reading (the ink default without cast shadows, one switch away) | §8.4, §8.2 |
| J-A68.82 | one drawing path: the light a post operation over the Canvas2D base, its CPU reference defining the lit picture (exports, stills, goldens, tests) and the GPU pass accelerating the interactive view within §13.4's tolerance; D-1's rejected WebGL2 reference backend and J-R4 stand, restated; WebGL2 still draws no marks | §8.4, §8.2, §8.9 |
| J-A68.83 | the light model: a per-tile surface layer (normal, height, unlit coverage) plus a slab list for casters over drawn ground; brightness a sum over sources of inverse-square light with a smooth cutoff, soft visibility marched at the source's height, ambient occlusion and a blurred spill; light in value only in `ink` | §8.4 |
| J-A68.84 | the cursor sun at G = V + s·u, height h₀·D·s — over the pointer at `sunHeight` 1, receding toward a parallel sun as it rises; on-screen lengths view-derived and nothing stored; fixed and path suns zoom-independent and the only suns of exports and stills | §8.4 |
| J-A68.85 | the fallback ladder: the GPU pass at the tile DPR → with a half-resolution global term → the vector pass; chosen per tier at app start, lowered on a lost context or three frames over budget, never raised mid-session; exports always on the CPU reference; `hatched` on its vector prism pass by design | §8.4 |
| J-A68.86 | the `MFCG` preset draws no cast shadow, no night view and no light, stated as our preset's behaviour with no claim about the reference (the held absence clause of item 68 (g)) | §8.4 |
| J-A68.87 | on rungs 1–2 the lit programs emit albedo and normals and the pass lights them once, the light-step machinery serving the vector rung; labels, halos, overlays and furniture never lit — composed after the pass in day colours, J-R21's one bitmap per tile kept by the surface layer's unlit coverage | §8.4 (with §8.2's roles, §8.8's canvas and §9.4) |
| J-A68.88 | the first map composed unlit, its time excluding the light, the lit view following within the settle bound; a moving pointer re-rasters and re-bakes nothing | §8.5, §12.5 |
| J-A68.89 | the canvas need with the light pass is 4.25P + 7 MB; the tile DPR steps down until it fits, else the vector rung | §8.8, §12.8 |
| J-A69.81 | the palette targets' measures in our own words — paper by the pick buffer's paper pixels, the darkest 0.5 % of pixels, plate chroma as mean CIELAB C*ab — with a definitional mismatch re-signed at reconciliation, never by opening the corpus | §8.2 |
| J-A69.82 | `ink`'s other roles take the least chroma scale whose plate chroma reaches 20 (≤ 30): its role cap rises from 18 to 34, re-ruling J-R3; J-R28's darker inks and J-R29 re-checked and kept; J-R30's repair re-run | §8.2 |
| J-A69.83 | `lit`, `hatched` and the reserved families aim at the median plate chroma (43) under a restraint rule — no role clipped by sRGB, none above C* 60 — landing ≈ 29–30, inside the band, the median not forced | §8.2 |
| J-A69.84 | every shipped family's paper and ink on the targets, one paper value for all three; the bar is §13.4's B-ZOOM bar, §8.3 its census row; the re-signing sweep per family at the milestone that ships its bands | §8.2, §8.3 |
| J-A63.81 | a concealed use's parts — its rooms, its concealed door, its way down — carry its `knownTo` as marks and draw only for a key that admits it: J-A30.83's "never its geometry" refined for concealed sub-parts; the building's mass and public parts always drawn | §9.2, §8.1, §11.1 |
| J-A65.81 | the underground layer drawn as one over its systems' parts by depth band, the adjacent bands as traces, a crossing over and under; a secret access or link withheld as a mark like a concealed part | §8.4, §9.2 |
| J-A67.81 | the display list built at the drawn week — S14 writes each Works target's stage and stage heights, a week change re-emits only the changed targets' marks, and the drawn week joins the key of a tile holding a Works mark | §8.1, §8.8 |
| J-A67.82 | "the simulator's clock" read as the host's: its weeks reach the map only as dossier events and epochs through the port, and a host shows its campaign week by `view.set { week }`; the module's hours never move the map | §11.3 |
| J-A70.81 | an informal cluster is the city band's exception to the mass closing — each structure its own roof mark over a ground-toned path web — with one `place` label per cluster | §8.5, §9.1 |
| J-A72.81 | a district's identity, a power's share, a sector's share and the band range as thematic override rows beside FTG D7's matchers; district and quarter labels read §10.4's identity-driven names, no second rule | §8.2 with §9.1 and §9.4 |
| J-A20.82 | item 20 (h): the reader, every answer and every export mark each fact's tier by §2.8's marker (`dossier`, `declared`, `map`); a label's `displayText` is the map-side display over a name the dossier owns | §9.2 with §9.1, §11.1 and §11.2 |
| J-A73.81 | owner Q2 (J86): no door opens the other way — the host's simulator never reads the map's geometry; a canonical-only geometry export stays possible later, only on the owner's word | §11.4 |
| J-A85.81 | the inert-export rule at §11.1 — every exporter escapes by its format's rule, the SVG writer emits no script, event attribute, `foreignObject` or external reference — and display names applied inside one export request, written nowhere | §11.1 |
| J-A85.82 | bridge correlation at §11.3: `re` on every reply, the source-window check, host messages queued before `ready`; SettlementForge's configuration an iframe on the module's own origin | §11.3 |
| J-A101.81 | the underlay as a per-viewer view key drawn by the compositor beneath the tiles, never exported, sent over the bridge, hashed or read by the model or the clerk | §9.5 |
| J-A101.82 | every export carries each fact's tier and each event's authorship — declared, derived by rule, clerk-proposed — and a picture's metadata their shares | §11.1 |
| J-A101.83 | the clerk's tool API is the embedding API with `preview` and the `why` query added and nothing clerk-specific; its proposals are previews drawn as `live.ghost`, accepted as edits | §11.2, §8.2 |
| J-A101.84 | region groups as a `RegionGroup` record over the quarter tree with `region` labels at the city band; the leader-line switch a style value stated at §9.3's point labels (over §9.4) | §9.1 with §9.3 and §9.4 |
=== END ===
=== RATIONALE-A ===
| J-A53.81 | Chose to draw the stamp tiles' Poisson candidates in the thin annulus [r₀, 1.1 r₀] on the tile's torus (`poisson.annulus` = 0.1) over Bridson's textbook [r₀, 2 r₀], because the four references' samplers (MFCG 12710731, VG 1.6.9, NG 1.2.2, Dwellings itch 17195045) all use it (P14, re-derived by the critic) and it is a real parameter that sets how densely woods and gardens pack, while the textbook value — which the earlier measured receipts used — stays the documented alternative; the annulus changes only the packing density, never the seam-compatible construction, the border band or the ranking (J-R11, J-R48, J-R50, J-R55 stand), so the denser tiles' point counts (≈ 175–180) and build time (≈ 24 ms per class by the n² law) are restated PLAUSIBLE until `plat/tools/stamptiles/` builds the asset; the old note that the references' variant was "domain-warped" was a torus wrap (§8.10; item 53; the kernel's §3.1 row points here). |
| J-A54.81 | Chose to keep our swept raised under-copy and multiply its offset by a class row's ratio — house 1, landmark (keep, temple, hall) 2, farm building 0.6 of the sheet's base offset — over one constant offset, because MFCG 12710731 raises each class's front by its own height (P15: houses, keeps and cathedrals, farmhouses in those proportions), which reads as taller buildings showing taller fronts, and the swept copy is visually equivalent for the viewer-facing fronts; the ratio is read from the display list's semantic and `class` column, so no model or pipeline field is needed (§8.2, §8.4; item 54; K06 kept — the under-copy is still not a shadow). |
| J-A55.81 | Chose to add the horizontal spine — the leaf-to-leaf path of the maximum-clearance tree maximising its length plus its horizontal extent, for trees of ≤ 64 leaves — as an area label's first candidate while keeping our hole-aware, clearance-first construction with no jittered retries, because MFCG 12710731's curved labels prefer horizontal spread (P16) and horizontal labels read faster (the legibility floor); and chose to score it in model coordinates (model north up), so the candidate stays model data a pure function of the model (label candidates are hashed, §6.2), letting S13b re-order the stored spines by their on-screen horizontality only under a rotated view — with the placement memo and digests held per rotation and every golden at rotation 0 — over scoring in view coordinates, which would have made a hashed record depend on the view (§9.3, §9.2; item 55; J-R12, J-DET-15 kept). |
| J-A68.81 | Chose, for the default view, the day with the cursor sun and cast shadows ON in every shipped family — `ink` lit in value only and gently (its ambient 1.3, so a day shadow on open ground keeps about two thirds of the lit value, the ink family's shadow alpha 0.35), `lit` in colour, `hatched` by its prism pass — and the `MFCG` parity preset without, over the item's own reading (cast shadows on in `lit` and `hatched` but `ink` keeping only its raised under-copy, one switch away), because the owner's words describe the default view itself ("a daytime view is the default. the global light is the cursor. every shadow moves …") and his standing rule of 2026-09-25 asked for shadows that use the height number, while the ink look adopted under delegation (J10, D-1) is a palette and a symbolisation that value-only shadows keep, and MFCG's own look stays exactly reproducible by the parity preset (item 23); the first map stays unlit (J-A68.88), so no budget moves; vetoable — the scope part puts this reading to the owner in plain words, and the switch (`LightingSpec.castShadows`) restores the other reading for `ink` in one row (§8.4, §8.2; item 68, ruling 2; D-19 and §1.2 restated by the scope part). |
| J-A68.82 | Chose to make the light a post operation over the Canvas2D base — its CPU reference in the tile worker defining the lit picture for every export, still, golden and test, byte-identical on the five engines, and a GPU pass (WebGL2, WebGPU where available) accelerating only the interactive view, held to the reference by §13.4's tolerance — over a GPU or WebGL2 drawing path for the lit look, because the design's central rendering decision (J-R4, D-1, VIS-7) is one drawing path so that screen, PNG and print agree, and a light computed after the marks keeps every mark on Canvas2D while the owner's moving cursor light still runs per pixel at frame rate; D-1's rejection of a WebGL2 reference backend stands as written, J-R4's "normal-mapped relief is the only loss" now reads "per-pixel light comes from the post operation", and WebGL2 still draws no marks (§8.4, §8.2, §8.9; item 68, ruling 1; J-A68.62 is the determinism part's lint of the reference). |
| J-A68.83 | Chose one light model over a per-tile surface layer — per pixel a normal, a height above the tile's datum and the unlit coverage — with a slab list for casters whose covered ground the view draws (a sky island under ghost or offset occlusion, the span marks over a passage, a deck over drawn water), brightness the sum over sources of inverse-square light with the smooth cutoff (1 − x⁴)² at each light's radius, a soft visibility marched from the surface toward the source at the source's height, ambient occlusion from the horizon in eight directions and a blurred spill of the direct light, over a single-valued height field alone or ground-only projected shadows, because the owner's points 3 and 4 ask for exactly these properties — shadows as gradients and the absence of one light, cancelled where other lights reach, indirect light lifting them, a tall shadow crossing and shortened on a lower roof but never climbing a taller one, fall-off with "optimal distances" — while a slab is needed only where the ground under an overhang is drawn (a crown's ground is never seen from above, so crowns stay in the field); `ink` takes the light in value only, keeping its restraint (§8.4; item 68, rulings 3 and (a)–(c)). |
| J-A68.84 | Chose to place the cursor sun at G = V + s·u, height h₀·D·s (V the view centre, D its half-diagonal, u the pointer's offset, s = `sunHeight` ≥ 1): over the pointer at s = 1 and receding along the line through the pointer, rising in proportion, as `sunHeight` grows, over a sun that only rises above the pointer, because a sun rising straight above the pointer shortens every shadow to nothing instead of making them parallel, while the owner's control asks for "very high: nearly parallel, realistic; lower: dramatic and radial" and his confirmation for "different angles for every shadow" at the default; on-screen lengths of the radial sun therefore follow the view (a zoom changes them), which is view-derived and stores nothing, and the fixed and path suns — the only suns of exports and stills, which have no pointer — never depend on zoom (§8.4; item 68, ruling 4). |
| J-A68.85 | Chose a three-rung fallback ladder — the GPU pass at the tile DPR, the GPU pass with a half-resolution global term, the vector pass of today (projected shadows, night roles and glow sprites) — chosen per hardware tier at app start from the canvas budget and the measured frame time, lowered at run time on a lost GPU context or three consecutive frames over budget and never raised mid-session, with every export on the CPU reference and `hatched` on its prism pass by design, over refusing the lit view to devices without a capable GPU or letting the rung flicker with load, because the owner's day and night views must reach every device the base supports and a picture that changes rung under a moving pointer would read as a defect; each rung is counted, never an error, and never a model change (§8.4; item 68; F-LIGHT is §5.2's). |
| J-A68.86 | Chose to state the `MFCG` preset's light as our preset's behaviour — the raised under-copy only, no cast shadow, no night view and no light — with no claim about the reference, over writing that MFCG draws no cast shadows, because that absence was inferred from a full read of MFCG 12710731 rather than read as a fact and is held for Fable's retrovalidation under the evidence gate; the FTG, NG and Fantasy Manor cells carry their builds and their readings' sections, their P-ids (P22–P24) to be appended to the reader-tier provenance table before a cell cites them, and no constant of those readings enters a cell (§8.4 (h); item 68 (g); critic R5). |
| J-A68.87 | Chose that on rungs 1–2 `faceLight`, the two-tone roof, `hillshade` and the `lit` crowns emit the albedo and write normals for the light pass to light once, the light-step machinery (J-R54) serving the vector rung, and that labels, halos, live overlays and furniture are never lit — composed after the pass in their day colours, the tile worker writing their coverage into the surface layer so the pass leaves those pixels as composed — over lighting the programs' already-shaded output again or splitting the tile's bitmap into a base and a label layer, because double lighting would darken every roof twice, a night that dims the labels would break the label floor (§9.4), and the coverage byte keeps J-R21's one composed bitmap per tile position and its canvas budget (§8.2, §8.4, §8.8, §9.4; item 68, ruling 8). |
| J-A68.88 | Chose to compose the first map unlit — with the raised under-copy, as the ink look has always drawn it — and to light the view within the settle bound after it, over lighting the first map, because the time to first map is a declared law of the building count (§12.5) that the owner's plot-model ruling already strains, and the light, a per-tile surface raster and light-map bake, would lengthen it on every request while the picture is readable without it; a moving pointer then re-rasters and re-bakes nothing, only the GPU's per-frame term moving (§8.5, §12.5; item 68, ruling 9). |
| J-A68.89 | Chose to count the light pass's per-position textures (a 1 MB surface layer and a ¼ MB light map on the main thread) in the canvas budget as 4.25P + 7 MB, stepping the tile DPR down until it fits and drawing the vector rung where it does not fit even at DPR 1, over holding the DPR and dropping to the vector rung first, because the owner's default view is the lit one and a lit picture at DPR 1.5 reads better than an unlit one at 2, while the tier ceilings of J-R22 stay as they are (worked: the reference view lit at DPR 2 on the high tier and 1.5 on the mid tier; the low-end 1 920 × 1 080 view on the vector rung) (§8.8, §12.8; item 68, ruling 9). |
| J-A69.81 | Chose to define the palette targets' measures in our own words — paper as the Rec. 601 luma and R − B of the median colour of the pixels whose top mark is paper; the darkest ink as the darkest 0.5 % of all pixels; plate chroma as the mean CIELAB C*ab over every pixel of a fixed plate-framed measurement render — and to record that the bands were measured by the corpus's own instrument, a definitional mismatch being re-signed at the reconciliation stage, over waiting for the definitions or opening the walled-off preview, because the owner released the bands as numbers only and this program may not read the corpus, while the targets must be checkable now (§8.2; item 69, ruling 1). |
| J-A69.82 | Chose for the default `ink` family the least chroma scale of its other roles (L* and hue kept) whose plate chroma reaches 20 and does not pass 30, raising its role-chroma cap from 18 to 34 and re-ruling J-R3, over aiming `ink` at the band's median, because the owner's tiebreaker asks to lean into the corpus "with constraint and precision" and the default map should keep MFCG's restraint while taking the corpus's colour at the band's lower range; J-R28's darker inks for `lit` and `hatched` and J-R29's walls in ink and courts as ground are re-checked on the new values and kept, J-R30's bounded repair re-run (100 % within three attempts on 2 000 draws per family), and `lit`'s roof rows by band (J-A19.81) moved by `lit`'s own chroma scale; vetoable — the owner may prefer the median for the default too (§8.2; item 69, ruling 2; `docs/validation/bench/amendc_rendering_palette.out`). |
| J-A69.83 | Chose to aim `lit`, `hatched` and the reserved families at the median plate chroma (43) under a restraint rule — no role clipped by the sRGB gamut and none above C* 60 — which lands them at ≈ 29–30, inside the band and short of the median, over forcing the median, because on our plate model the median is reachable only with clipped, saturated roles (a pure-green tree, a neon blue sea) that no historical plate and no FTG-like look shows, which suggests the corpus's chroma measure differs from our definition — a mismatch the reconciliation stage re-signs — and every family inside the band already meets the owner's targets (§8.2; item 69 (b)). |
| J-A69.84 | Chose to bind every shipped family's paper and ink to the targets — one paper value (luma 235.3, warmth 36) for all three families, each family's ink at luma ≈ 36 and warmth 20 — with the acceptance bar at §13.4's B-ZOOM and §8.3's census row as its check, re-signed by a scripted sweep on the measurement render at the milestone that ships each family's bands, over binding the `ink` family alone or placing the bar among §13.5's parity rows, because the item asks that "every shipped family" land inside its targets, one target point gives one paper, and §13.5 reads only the references' baselines while the corpus reaches §13 only through §13.9's staged adapter (§8.2, §8.3; item 69, rulings 3 and 4). |
| J-A63.81 | Chose to draw a concealed use's parts — its concealed rooms, its concealed entrance's tick and door, its way down — only for a viewer whose knowledge key admits that use, each mark carrying the concealed use's `knownTo`, over drawing them for everyone as J-A30.83's "never its geometry" would, because the owner's clandestine rule ("it would obviously not parade itself") is broken by a secret door drawn on the public map, while the building's mass, walls, public rooms and doors — the front — stay on the map at every band, so knowledge still never removes a place; every export and the reader withhold the same parts (§9.2, §8.1, §11.1; item 63; J-A30.83 refined for concealed sub-parts). |
| J-A65.81 | Chose to draw the underground layer as one layer over its systems' separate arena parts, grouping every item by the depth band that holds its floor, the chosen band in full and the bands directly above and below as traces, a shallower item over a deeper one, and a secret access or link withheld as a mark like a concealed part, over one drawing per system or a band-less stack, because the owner wants the catacombs, caverns, sewers and the undercity "in the same level with varying degrees of connections", which one layer with depth bands shows while crossings of systems at different depths read over and under (§8.4, §9.2; item 65). |
| J-A67.81 | Chose to build the display list at the drawn week — S14 writing each Works target's stage and stage heights, a change of week re-emitting only the targets whose stage or heights change and the lights whose lit state changes, the drawn week joining the key of a tile holding a Works mark — over emitting every stage's marks and filtering them at raster time, because a Works has up to seven drawn stages and scrubbing touches few buildings, while a stage is a pure function of its record and the week (§4.11), so no digest moves and a scrub is byte-identical in either direction (§8.1, §8.8; item 67). |
| J-A67.82 | Chose to read "our simulator advances by units of one week" as the host's clock — its weeks reaching the map only as dossier events and epochs that the port dates and groups (§7.7, §4.11), a host showing its campaign's current week by `view.set { week }` — and never the module's `time` key, which counts hours and never moves the map, because the owner's simulator is SettlementForge's, whose tick is one week, while the module's hour clock only animates occupancy (§11.3; item 67; the route's reading of "the simulator"). |
| J-A70.81 | Chose to make an informal cluster the one exception to the city band's mass closing — each shack, tent or lean-to its own small roof mark over a ground-toned footpath web, one `place` label per cluster — over closing it into a block mass or leaving it as an empty yard, because the owner describes a lot where shacks "congregate together … each one deserving of a door", which reads as a dense speckle of small roofs, while a solid mass would hide the clusters and an empty block would misread them as open ground (§8.5, §9.1; item 70 (f)). |
| J-A72.81 | Chose to offer a district's identity, the share of a power, the share of a sector and the band range as thematic override rows beside FTG D7's matchers, and to let district and quarter labels read the names §10.4 draws from identity and character with no rule of their own, over a separate identity layer or naming in the label code, because the owner says the character "also helps to assign names to neighborhoods" — a naming input, which §10.4 owns — and a theme is already data (§8.2, §9.1, §9.4; item 72). |
| J-A20.82 | (h) Chose to mark, in every reader answer and every export, each fact's tier by §2.8's marker — `dossier`, `declared` or `map` — and to give a label a map-side `displayText` drawn instead of a name the dossier owns, over showing facts without their tier or letting a user rename a dossier-named place on the map, because the owner's one-directional rule makes the dossier the only immutable truth, so a user, a host and a clerk must be able to tell those facts from the map's own, while a user may still change what the drawing says without touching the dossier (§9.1, §9.2, §11.1, §11.2; item 20 (h), ruling 2's display side). |
| J-A73.81 | Chose, as the owner ruled (J86, Q2), that no door opens the other way — the module writes no geometry, layout or district read for the host's simulator, now or by default later — and to record that a canonical-only geometry export could be added later without redesign, only on the owner's explicit word, over a geometry export for SettlementForge's simulator, because a map read by the simulator would make the map an input of the dossier's history and so part of the truth, against the owner's one-directional rule (§11.4; item 73). |
| J-A85.81 | Chose to state the inert-export rule at §11.1 — every exporter escaping by its format's own rule, the SVG writer emitting no script element, event attribute, `foreignObject` or external reference — and to apply a host's display names inside one export request and write them nowhere, over leaving escaping to each writer's defaults or storing display names in the document, because names come from a dossier or another user's edit and our SVG is shipped by the host "as data", so a name must never become active content, while a per-request display name must not leak into the canonical document (§11.1; item 85 (b), (c)). |
| J-A85.82 | Chose to carry `re` — the request's `seq` — on every bridge reply, to check the message's source window as well as its origin, to queue host messages that arrive before `ready`, and to name an iframe on the module's own origin as SettlementForge's configuration, over unnamed replies and an origin check alone, because the host will keep several requests in flight beside a paying product's session and another frame of the same origin must not speak for it (§11.3; item 85 (d), (e)). |
| J-A101.81 | Chose to make the tracing underlay a per-viewer view key drawn by the compositor beneath the composed tiles — the tiles over it at one minus its opacity, no tile re-rastered — never exported, sent over the bridge, hashed or read by the model or the clerk, over an image layer in the model or a traced import, because the owner's tracing aid ("drop an image under the map to trace") must not carry someone else's picture into the map, its exports or the host (§9.5; item 101 (c) T12). |
| J-A101.82 | Chose to carry each fact's tier and each event's authorship — hand-declared, derived by rule, clerk-proposed — in every model and interchange export, and the shares in a picture's metadata, over provenance kept inside the program, because the survey's R19 finds that the hobby asks where a map came from and a file that says what was declared, derived and AI-proposed answers it from the file itself (§11.1; item 101 R19). |
| J-A101.83 | Chose that the clerk's tool API is the embedding API with only a `preview` call and a `why` query added — nothing clerk-specific — its proposals previews drawn as `live.ghost` and accepted as edits with `proposedBy: 'clerk'`, over a separate clerk interface, because the owner asks for one set of tools "for both an ai clerk and a user", which one API guarantees: the clerk can do nothing a user cannot, never bypasses the dry run or the undo and reads only what its viewer's key admits (§11.2, §8.2; item 101 (b), (d)). |
| J-A101.84 | Chose region label groups as a `RegionGroup` record over the quarter tree, labelled at the city band at the highest priority, and the leader-line switch as a style value stated with §9.3's point-label leader rule, over nesting regions inside the binary merge tree or stating the switch at §9.4 as the route placed it, because a region names any set of disjoint quarters (an Upper, Lower or Outer City) that the binary tree cannot hold, and the leader rule already lives at §9.3, so one statement serves both (§9.1, §9.3, §9.4; item 101 (c) T11). |
=== END ===
