# Repair round 1 — rendering (restore only, J130)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r1; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-rendering-r1`, cloud continuation 2026-10-03)
- R1 issues read in docs/validation/coherence/verify-rendering-r0s.md; archive and live text of §3.2 (1) and (9), §3.8, §8.1, §8.2, §8.4, II.7.1, §7.8, §12.2, §12.7 and §12.10 read: done
- R2 the five REPLACE blocks built mechanically from the live subsections (each taken whole, every edit an exact single match): done
- R3 dry run of docs/validation/amendments-b/apply-blocks.py on scratch copies (all blocks applied, audit clean): done
- R4 results file, LANDED: done

Six issues, all restored; no ruling request. Each block is the live subsection with only the sentences below changed.

| issue | subsection | what is put back (archive → current terms) |
|---|---|---|
| VR0-01 | §12.7 *Plan rung* | the budget's PLAUSIBLE status: "— PLAUSIBLE until R12-23 measures it". The measuring clause the archive gave with it (§13.2's T28-8 on B-PLAN's fixtures, confirmed at the stage-3 intake) is R12-23's *measured at* cell, so it is cited through the row in the form §12's other 18 markers use ("PLAUSIBLE until R12-n measures …"), not restated |
| VR0-02 | §12.2 | the cap's frame figures, whose home §3.2 (9) names as §12.2: the square 12.4 km (19.8 km with the margins) and the aspect-2 frame 17.5 × 8.8 km with its ≈ 6× headroom under the 2²³-cm range; the \|x\| bound itself (1 402 000 cm) is cited at its home §3.2 (1), not restated; §3.2 (9) keeps "the cap: §12.2" |
| VR0-03 | §8.4 *Toggles are visibility* | the rung qualifier and the layers: the *Sewers* control at CITY and METROPOLIS (at TOWN II.7.1's model feature) and the island view toggle set the `underground` and `sky` layers' `LayerSpec.visible` (§7.8's controls) |
| VR0-16 | §12.2 | "river **and** coast" (the 15 392-building size-80 city had all three options on) and the profile's counts as size-80 counts under such option sets; the "earlier exports" narration stays removed (RENDERING-NARRATION-007) |
| VR0-17 | §8.2 *`lit` on the reference backend* | the textures' case and "per pixel": on rungs 1–2 the programs, these textures included, emit albedo and normals and §8.4's light pass lights them per pixel (*Paint programs* for the four programs it names) |
| VR0-22 | §8.1 item 5 | the re-fitted footprint case and N-19 (cut from §3.8, whose pointer names §8.1 (5) the home): "never by id alone (N-19): a `setAttr` on floors or a re-fitted footprint changes the building's revision and so its roof" |

Words: +81 over the five subsections (restored content only; wc -w of the base 414 374 → 414 455 on the dry run). Text before the first block line is ignored by the applier.

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
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, worksKind, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'daylightShare' /* the `live.shade` provider's, from `fieldDriver('daylight')`, read by its stepped `ramp` veils (§8.2) */ }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 97 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  pinDirCdeg: Int32Array /* PinnedPlacement.dirCdeg: a pinned point label's direction */; pinLines: Uint8Array /* PinnedPlacement.lines: 1 | 2 */;   // both written by S14 from LabelEntity.pinned (§9.1), read by §9.2's pin pass; the row stays ≤ 97 B
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
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; type generated from the concern registry */; layers: LayerSpec[]; bounds: Box; version: number;
  surfaceTopCm: Cm /* the greatest elevation above the document's datum (`Terrain.datumCm`, §2.3) that a caster of the city band's list writes into the surface layer, a pyramid or the slab list (a slab's top: an island's, a span mark's, a deck's; §8.4 (a), §8.8) — the cursor sun's floor (§8.4 (d)); S14 derives it on the city band's list, which carries every caster (item 2), a delta raising it and a full build re-deriving it, and every other list — a finer band's, an export's transient one — carries that value, never one of its own (item 6; J-A68.93) */;
  surfaceLayerTopCm: Cm /* the same over the surface layers and pyramids only, without the slab list — §8.4 (c)'s Z, the reach of the global light's window; derived, carried and raised exactly as `surfaceTopCm` (M6-sky; file f item 416) */ }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable; rasters?: FieldRaster[] /* new or changed field rasters, as §8.9's delta row carries */;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable; dirty: Box[]; surfaceTopCm?: Cm; surfaceLayerTopCm?: Cm /* each present when the delta raises it */ }
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
   which the plan draw sets inside its own room (building band only) and which S13b reads only as a protected obstacle,
   through `ObstacleSource.protectedExtents` kind `room`, implemented by `@plat/render` from these marks (§14; §8.5, §9.2;
   J-A28.85). `light` marks carry one `LightTable` row each (§8.4): a placed `LightSource` record's (§2.7)
   position, height, intensity, radius, colour and flicker, or a derived light's (a live layer's window, the plan draw's
   room light, a shaft); the light pass reads them and nothing else draws them but the vector rung's `glow` sprite
   (§8.2). A building's `eaveCm` and `ridgeCm` columns (its wing's, for a wing mark; §2.6) let the surface layer (§8.4)
   rebuild each roof face's elevation from the roof's own construction without the model. **The city band carries every
   caster (item 68; J-A68.93).** Every caster of §8.4's *Shadow casters* has a mark in the city band's list — a tree
   line's `instances` mark too, its city-band rank subset empty so that band draws none of its crowns (§8.5's line
   greenery, §8.10); each base wing of a building of several has a caster mark in the city band carrying its own `Heights`, drawn by no program there (as a tree line's crowns), a building of one wing casting by its footprint mark; and the city band carries the caster marks of every composition's wings and towers and every close-up's casters that the elaboration cache holds (§2.9, §8.6) — added in the `DisplayDelta` that answers the band request deriving them, removed with the cache entry, and included in every full build — a composed building's replacing its base wings'; so the city band carries every caster any band draws at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one list the tile worker always holds.
3. **Slot, pass, draw order (N-7).** The order is **slot-major across the whole scene**: every mark of slot s of the
   style's layer-order table (§8.2) draws before any mark of slot s + 1, in every tile; within a slot by `pass`, then
   `z`, then `key`. A mark's slot comes from its (semantic, pass) by §8.2's slot resolution, cached per style version as
   a (semantic index, pass) → slot table. S14 emits one mark per pass an entity draws in, as the registry declares per
   band: a cased ribbon is a pass-1 casing mark plus a pass-2 body mark over one geometry range (≈ 60 B for the second
   mark, never a second geometry copy; one extra mark per drawn way, a few thousand at CITY). The raised under-copy
   (slot 11) and projected shadows (`shadowPass`, slot 10) are not marks but per-tile operations over the caster marks,
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
   band, style version, roof construction where it applies), never by id alone (N-19): a `setAttr` on floors or a
   re-fitted footprint changes the building's revision and so its roof; a changed boundary street dirties both its sides. **Every render-time hash** — a
   multi-colour role's index, weathering, a stamp's tile variant, grid jitter, crown index, colour and scale jitter, hatch
   phase, roof detail, the `ruin` dash — is `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag, an index into the
   fixed **render-tag table** — `role.<name>` (one per multi-colour role: its pick, §8.2), `weathering` (§8.2),
   `hatch.phase` (the `hatch` program), `ruin.dash` (the entity-keyed dash of the `ruin`, `trace` and dashed state rows),
   `stamp.variant`, `grid.jitter.x`, `grid.jitter.y`, `line.jitter.along`, `line.jitter.across`, `crown.species`,
   `crown.index`, `crown.tone`, `crown.scale` and `roof.detail` (§8.10), each read by the program it names; a new tag is
   appended, so no existing look moves; the **render key** `key` = the low 64 bits (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.4 MB of
   attributes, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; the undrawn caster marks of item 2 add 54 B each and their coordinates, and the slab list (§8.8) 16 B per record and 8 B per outline vertex, both counted on B-CITY at M2b; its light rows add ≤ 36 B
   per light (≈ 0.3 MB for 8 000 lights, PLAUSIBLE until §4.7's light table runs on B-CITY). The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the **24-B index** — the columns `update()`, `hit`
   and `inView` read (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) — and the city band's two surface tops,
   which every export's list carries (the `DisplayList` comment). An export that draws (SVG, PNG, print, the `.dd2vtt`
   image) builds its own **transient list** in the generation worker: SVG writes from it there; a raster export transfers
   it to the tile worker with its request; each releases it when done — the one statement of its lifecycle, which §8.9,
   §11.1 and §12.8 cite.
7. **The drawn week, and concealed marks (items 67, 63).** The display list is built at the **drawn week** (§4.11's
   *Which week is drawn*; the view key `week`, §2.9): S14 writes
   a Works target's `worksStage` column from `stageAt(works, w)`, its `worksKind` column from the running Works' kind (§4.11's
   `WorksRow.kind`, read by the `states` rows of §8.2 that name one) and its height columns from `heightsAt` (§4.11), and emits
   the stage's marks (a dashed footprint, a pit, walls without a roof, a scaffold ring, rubble; §8.2's `states` rows) and
   the Works' pending and staked plot lines. When the drawn week changes — the clock advancing, a host's `view.set
   { week }`, a scrub — the generation worker re-emits, as a `DisplayDelta`, only the marks of the targets whose stage or
   heights differ between the two weeks and of the lights whose lit bit changes (O(changed Works)); no digest moves (§6.2).
   A mark of a concealed part — a concealed room, the concealed entrance's tick, a concealed access point or link down
   (item 63; §2.6, II.7.4) — carries `concealed` = 1 and the concealed use's `knownTo`, so the raster draws it only for a
   viewer whose knowledge key admits that use at the band (§9.2; the key then joins the tile key, §8.8); the building's
   mass and every public part carry the building's own `knownTo` and always draw. **A light draws only where its host
   draws (items 63 (c), 64, 68; J-A63.82).** A `light` mark carries its host mark's `concealed` and `knownTo` columns, so
   the light of a concealed room, a lit window of one, a `LightSource` hosted by a concealed part or by an `AccessPoint`
   or `UndergroundLink` (II.7.4, II.7.6) and the shaft of such an access (§8.4 (b)) are taken by the light pass, the
   light-map bake, the vector rung's `glow` and every export's lights (§11.1) where their host draws at the band under
   the viewer's knowledge key (§9.2; §8.2's `access` and `link` rows), that key then joining the tile key and the
   light-map key (§8.8); a key that does not admit the host sees none of their light, glow or shaft, while a light
   whose host always draws always lights.

Judgment calls: J-R1, J-R2, J-R19, J-R20, J-A67.81, J-A67.83, J-A63.81, J-A63.82, J-A68.90, J-A68.93.
=== END ===

=== REPLACE ### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===
### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

A style sheet maps (semantic, attribute predicates, band) to **paint programs** over a palette of **roles** and a
**symbolisation table**:

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  variants?: Partial<Record<CvdVariant, Partial<Record<Role, Color | Color[]>>>>;   // the checked colour-deficiency variants (item 112, below)
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing'|'roofscape';   // over stored wings (§2.6); 'roofscape' (V02 §5.2): every shipped family's default once stage 3 registers (M6; file f item 406)
  roads?: { mode: 'full'|'outlined'|'dashed'|'hidden'; widthRatio: number /* hatched 0.4 */ };   // the close-up's road surfaces (V01 §5.1; M5, file f item 405)
  hatch?: { pitchM: number /* a world length, calibrated at M5 */; minPx: number /* 1.5: below it every second line */; details: boolean };   // the per-facet hatch (V01 §5.1; M5)
  closeup?: { vignette: 'none'|'fade'|'plateau' };                       // the close-up's framing (V01 §5.1; M5)
  plate?: { waterQualifier: boolean; populationRound: number /* 1; 10 under the `VG` preset */ };   // the title plate (§9.5; V07 §5.3; the village product, file f item 424)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  light: LightingSpec;                                                   // the lighting model, its sun and moon and the vector rung's look (§8.4; item 68)
  raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number;
            ratio: { semantic?: string; classes?: string[]; ratio: number }[] };   // K06: the base offset × the first matching class row's ratio (below; item 54)
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  states: StateRow[];                                                    // decline, condition, Works-stage and layer-state classes (the table below); a family defines every row
  post: PostOp[];                                                        // per-tile post operations
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
type CvdVariant = 'protan'|'deutan'|'tritan';
interface LabelStyle { face: string /* the label face (§17.2) */; smallCapsCut?: string /* the family's bundled OFL small-caps cut, where one exists (§9.2's per-face path) */;
  floorsPx?: Partial<Record<LabelEntity['kind'], number>> /* raises §9.4's floors per kind; never below them */; haloPx: number /* 1.5, §9.4 */;
  leaders: 'small'|'always' /* §9.3: 'small' the 12-px rule */ }       // read by S13b (§9.2) and the tile worker's composition (§8.8)
interface ThematicRow { id: string; key: 'prosperity'|'use'|'epoch'|'owner'|'material'|'identity'|'power'|'sector'|'bandRange'|'season'|'weather'|'condition'|'favourite';
  match: string | [number, number];      // the attribute value, or a numeric range
  bands?: LodBand[]; paint: Partial<{ role: Role; colour: Color; pattern: string; alpha: number }>;   // the tone or texture laid over the mark's programs
  cue?: { kind: 'pattern'|'lineStyle'|'label'|'shape'; value: string };   // item 112's second cue (below)
  legend?: string }                      // the legend key's words (§9.5); absent: the row draws no key
type PostOp = { op: 'greyscale'|'sepia' } | { op: 'wash'; colour: Color; strength: number } | { op: 'edgeFade'; strength: number }
  | { op: 'pixelate'; cellPx: number } | { op: 'dotScreen'; cellPx: number; angleCdeg: number } | { op: 'scanline'; periodPx: number; alpha: number }
  | { op: 'crosshatchNoise'; periodPx: number; alpha: number };  // read by the tile worker, the GPU pass and the CPU reference in §8.4 (f)'s order
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot {
  slot: number;                     // its row of the layer-order table below; several entries may share a row
  semantic: string;                 // a semantic ('way.pier') or a dotted prefix ending in '.*' ('way.*')
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass
  derived?: 'raised'|'shadow';      // instead of the matched marks' draws: the per-tile raised under-copy or projected shadows over them (§8.4)
  seamClose?: boolean;              // its fills also get a ½-px same-colour stroke underneath (§8.8's seam rule); set in the shipped sheets on ground.block, masses, yard parts and the `shadow` entry; read by the tile backend's draw sequence (§8.9)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
interface StateRow {                 // one row per (kind, state) that §2.8's ladders and the state fields of §2.5 to §2.7 can produce, the undeclined defaults excepted (§8.3's census); the shipped rows are the table below
  kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'passage'|'plotLine'|'access'|'gallery'|'chamber'|'link'|'retaining'|'raised'|'deck'|'skyAccess'|'landUse';
  state: string /* an Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7), 'superseded' for an enceinte whose supersededBy is set (§2.7), 'sealed' for a passage whose Passage.sealed is set (§2.5);
    a `WorksStage` (§4.11) for a target under a Works at the drawn week — the mark's `worksStage` column, §8.1 — which wins over the ladder state while the Works runs (item 67); 'pendingRemoval' or 'staked' for a plot line in transition (item 67 (g));
    an `AccessPoint.state` (II.7.4; item 64); a gallery's or chamber's system kind with its state (II.7.6; item 65); an `UndergroundLink.kind` (II.7.6; item 65) */;
  worksKind?: WorksRow['kind'] /* the row matches only a target whose running Works is of this kind (§8.1's `worksKind` column) and is an `override` laid over the row the stage resolves without it (J-A67.83) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[] }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `glow`; the wall-material roles `wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` (item
110 (a); file f item 412); `furniture` (the plan draw's furniture, V03 §5.1; M6-P); `rock` and `void` (the underground's
halo and floors, V04 §5; M6-U); `sky.ground` (a sky island's land, never `ground` itself, V05 §5.1; M6-sky). A role never
changes meaning across the bands or the presets of one family; the reference schemas (MFCG 13 keys, NG 26, VG 40) map
onto it without loss. **The light roles (item 68):** `shadow` is the vector rung's shadow tone (the ink at the family's
alpha); `ambience` the vector rung's night wash and the two-tone roof's dark mix; `light` a lit window's or a light mark's
glyph tone; `glow` the vector rung's glow sprite (E-16). On rungs 1–2 of §8.4's ladder the light pass computes light over
the albedo instead of those tones. **Night and season variants:** a role's `@night` value is read by the vector rung when
the view is night (rungs 1–2 light the day albedo, so a family's night look is its day palette under the night's light);
a sheet may state it, else it is derived — the day value in linear light × 0.4, mixed 20 % toward `ambience` — with
`ink`, `label`, `light` and `glow` keeping their day values (labels are composed after the light, §8.4 (f)). `tree@autumn`
re-skins deciduous crowns (below); winter draws the bare-crown symbol in `tree`.

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
| snow / road (snow lies on ground, fields and roofs while `road` keeps its value) | 8 | 5 |
| sand / water; plank / water | 8 | — |
| grid / paper | 10 | — |

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

**Role values** (our own; calibratable rows; placed on the palette targets below, item 69). Every matrix
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
| ambience | `#5A5048` | `#3E4A63` | `#4A4A5A` |
| light | `#FFF1CF` (a value, `mono`) | `#F5C45A` | `#F2C15A` |
| glow | `light`, α 0.6 at the centre falling to 0 at the sprite's radius | the same | the same |
| sand | `#EADBB0` | `#E6CF96` | `#EDDCA9` |
| plank | `#B39B78` | `#9A7650` | `#A07A4C` |
| grid | ink at α 0.25 | ink at α 0.25 | ink at α 0.25 |
| snow | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| tree@autumn | `#9A8A5E` | `#B8782F` | `#B0843C` |
| wall.dry_stone / wall.earth_bank / wall.timber_crib | `wall` / `ground` lerped 30 % toward ink / `plank` | `#8E8574` / `#9C8460` / `#8A6A45` | `#7E6A50` / `#8C7450` / `#7A5A38` |
| furniture; rock; void; sky.ground | ink at α 0.5; V04 §5 (the 40 %-ink cross-hatch at 1.2 paper px); `paper`; one step lighter than `ground` | a wood tone of the sheet (`plank`); V04 §5 (a dark stone fill); V04 §5; `ground`'s albedo | ink at α 0.5; V04 §5 (its dense hatch); V04 §5; the patch tone (V05 §5.1) |

The matrix's snow, sand, plank and grid rows pass on these values (snow / road ΔE2000 10.7 / 12.6 / 25.1, ΔL* 6.8 / 16.1
/ 30.1 in `ink` / `lit` / `hatched`; sand / water ≥ 29.0; plank / water ≥ 28.5; `tree@autumn` against water, green and
ink ≥ 21.2 / 21.2 / 38.3; each wall-material role against water ≥ 28.5; computed by our CIEDE2000 on the sRGB values, the
loader re-checking them).
`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and the vector rung's shadows the ink at an alpha, and its light a change of value only
(`LightingSpec.mono`, §8.4); no role above CIELAB chroma 34 (`field` highest, 33.3) — the cap the palette targets set
(below; J-A69.82); walls in ink and courts as ground at the city band (J-R28, J-R29).

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
| plate chroma | the mean CIELAB C*ab (D65) over every pixel | 18–70 | median 43; `ink` 20–30 (J-A69.82; J-C2) | the same; `ink`'s range `own` |

**Where they bind.** Every shipped family's paper and ink take the paper and ink targets (J-A69.84) — hence one paper
value for all three; the `ink` family's other roles keep their L* and hue and take the least chroma scale whose
plate chroma reaches 20, never past 30, keeping MFCG's restraint in the default map with the corpus's colour at its lower range
(J-A69.82; J-C2); `lit`, `hatched`, `parchment` — a shipping ink-family variant (the presets table) whose plate is the one
exception to `ink`'s 20–30 (RIC-01) — and the reserved `painterly` aim at the median (43), each by the chroma
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
| raised way (`way.*` on a ground part ≥ 1; item 110 (b)) | all | model | deck k = 1, minPx 1.5, a parapet line each side at the outline weight; piers their model footprints, minPx 1 | — |
| retaining wall (item 110 (a)) | all | paper | city band: one line at 2 × the building outline weight with low-side ticks 1 px long every 4 px; district and finer: the `retaining` program | — |
| stair and ramp intervals of a way (item 110 (a)) | district and finer | paper | the `way.stair` program over the way's body | — |
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
`outlineMix(factor)` (an outline's ink lerped toward its district's tint by `factor`: the tint rule's 0.3, below);
`tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette` (a program: the painterly
family's spotlight vignette, drawn per mark in its slot; distinct from the post operation `edgeFade`, E-16);
`retaining` (item 110 (a): the wall as a double line in `wall` — its face and its coping — with short ticks toward the low
side every 1 m, buttresses as small filled rectangles on the low side; drawn by its run's state row); `raisedWay` (item
110 (b): the deck body in `road` — an aqueduct's channel in `water` between two `wall` lines — with a parapet line in
`wall` along each side, the piers as filled footprints in `wall`, the spans' openings as a dashed outline in the strip at
the district band and finer; the MFCG under-copy keeps the name `raised`); `way.stair` (item 110 (a): a way's stair
interval draws step ticks across the way over the interval only, every 1.2 m of ground length at the thin stroke; a ramp
interval draws the way's body with two hairlines converging toward its upper end; neither changes the way's shape or its
other marks); `roofscape(tone)`, `dormer`, `porch`, `towerRoof` (V02 §5.3; M6); `surface(kind)` (a shared stamp tile per
road-surface kind), `steps`, the hood pin symbols and the ground-access symbols (V01 §5.1; M5); `planWallShade` (a soft
band inside each plan wall, broken at openings; V03 §5.1; M6-P);
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
stipple), `quarry` (a worked gallery's band with pillar squares, laid at `roomM` pitch with side √pillarShare × `roomM`
along a `workings` chamber's OBB axis, V04 §5), `ruinMasonry` (g item 109 (g): an ancient ruin system's double-lined
masonry walls 30 cm apart, 60 cm column dots in halls and temples, rubble stipple where collapsed; M6-U, file f item
407), `unexcavated` (g item 109 (j) (2): dashed kerbs at 40 % alpha, no fill, no light; drawn only for a `secret` key
while the view key `showUnexcavated` is on; M6-U) and `chamber` (a chamber's floor, the undercity's in
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
0–1; applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3) (`outlineMix(0.3)`); recomputed when the
palette changes; off in `ink` by default. S14 writes each mark's district colouring index into the `tintKey` column
(§8.1), which the `tint` and `outlineMix` programs read. `weathering`: each roof's RGB × (1 + u·w), u ∈ [−1, 1] from
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
one roof role and `hatched` NG's two tones. The view keys `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow} (§2.9) select override rows: autumn and winter re-skin deciduous crowns (by `leafType`,
deciduous when absent) through role variants (`tree@autumn`; winter a bare-crown symbol); snow lays the `snow` role over
ground, fields and roofs while `road` keeps its value; overcast removes the global light's direct term — its shadows go,
the ambient and the occlusion stay, and on the vector rung projected shadows are off (the raised under-copy stays). The
retaining walls' material roles (`wall.dry_stone`, `wall.earth_bank`, `wall.timber_crib`) are picked by
`RetainingWall.material` (V11's `MaterialRow` key) as the wall-material rows are. The model and its hash are untouched.

**Post operations (K07; `PostOp`).** `greyscale`, `sepia`, `wash(colour, strength)` (a whole-tile tint), `edgeFade` (the
view's vignette), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`,
`crosshatchNoise(periodPx, alpha)` — named apart from the per-mark programs `tint` and `vignette` (E-16) — each applied once to a
tile's base picture (slots 1–20, below), never to the labels, live overlays and furniture composed over it: by Canvas2D
in the tile worker after the base's marks (≈ 1–2 ms per 512² tile) where the light pass does not run, and after the light
pass where it does, in the order §8.4 (f) states, so no light re-colours a greyscale, sepia or tinted base. The cell operations
(`pixelate`, `dotScreen`) take their cells and weights by §8.4 (f), so a view and an export of one frame agree. PNG export
applies them per tile; SVG carries greyscale, sepia and wash as one colour-matrix filter over its lit base — the wrapper
group of §11.1's SVG row — and omits the pixel operations, which the export report lists.

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
drawn week by §10.3's rule, read by the light-map bake, §8.4); `live.shade` (base; g item 102 (f): the daylight-share
driver's raster as six stepped ink veils under the building fills, an island's shade strip outlined by V05's
`sky.island.shadeStrip` and `sky.island.shadePending` rows — V09 §5.4); `live.links` (overlay; g item 105 (j): the bound
supply links as curved provider-to-consumer arcs by volume and good — V09 §5.4); `live.coverage` (overlay; g item 103 (f):
for a selected class, the catchments that lack a member, from V01's `catchmentOf`); `live.voids` (overlay: the
underground systems' footprints on the ground with the districts above them, from V01's `districtsAbove`, admitted by
§9.2's function); `live.history` (overlay; V06 §5: then-and-now between two weeks — `live.history.added`, `.removed` as
a dashed ghost from the earlier frame, `.changed` as a tint; M6-E); and `live.people` (overlay: favourite persons'
positions from the occupancy at the view-state hour, one categorical colour per person), which the simulation module
registers through §14's `LiveLayerProvider` registry (§10.3). The model view a provider receives offers
`fieldDriver(id: 'daylight'): { cellCm: number; origin: PointCm; w: number; h: number; values: Uint8Array }` — the
field's driver raster as §4.5 holds it, or computed on demand by g item 102 (a)'s sampler and cached per document state
when the field skipped it; read-only (file f item 411). A ghost a clerk's `preview` delivers carries `source: 'clerk'` and
draws the AI mark beside its count badge (R19; file f item 518).

**Thematic layers.** FTG D7's matchers are override rows (`ThematicRow`) keyed by entity attributes (`prosperity`, `use`,
`epoch`, `owner`, `material`) — data, not code; the tile worker applies them over a mark's programs from its `attrs`
columns, and §9.5's legend reads their `legend` and `cue` cells. A row keyed by `use` or `owner` skips a mark whose
`knownTo` column (§8.1) §9.2's admission function does not admit at the band, drawing it unthemed, and a theme's legend key lists only
the values drawn, so no theme colour and no legend key names a withheld purpose; while such a row is active the
knowledge key joins the tile key (§8.8) (J-A30.85). A front's building themes as its front, and its concealed use
(item 63; §9.2) has no theme colour and no legend key for a key that does not admit it. **Character themes (item 72; J-A72.81):**
rows keyed by a district's `identity`, by the share of a power (`CircumstanceSlice.powers`, §7.7) or of a sector among
its significance-weighted plots, and by its band range (§4.5) — data rows like FTG D7's matchers, which stay override rows
of the same kind. **Conditions (item 88; staged):** a `ConditionOverlay` (§2.7) is drawn as a settlement-wide thematic
row — a settlement-wide `wash` plus a legend row, keyed by its archetype and severity, no geometry — the rows
schema-complete and empty in the base until the port fills the records; the shipped rows `condition.siege`,
`condition.quarantine` and `condition.occupation`, the view `supplyChains` (a chain drawn only when §9.2's function admits
every joined node) and the `states` row `worked-out` are V08 §5.2's, in every shipped family (SettlementForge stage; file f
item 410). **Oases (g item 111):** a spring-fed water body draws as water with a `symbol('spring')` at its spring point;
its grove is a `Greenery` wood drawn by the `instances` program with the climate row's species; its irrigated gardens
are `garden` and `field` land-use faces with their channels as `water` hairlines — existing roles and programs, one new
point symbol (§8.3's catalogue).

**Colour-deficiency safety (g item 112; J122).** Every family and thematic view that encodes a meaning in colour carries a
second cue, so no meaning rests on hue alone:

| colour-coded meaning | second cue |
|---|---|
| district tints (`tint`) | the district's name label (§9.4) and, at a tint change, the district boundary's line style |
| prosperity (`lit`'s roof-by-band rows; the prosperity theme) | a hatch density by band — none for the richest band, one step denser per band down |
| ownership (`owner`-keyed rows) | a pattern per owner category (dots, stripes, crosshatch, grid, wave, cycling in legend order) |
| knowledge (the admitted tiers of a thematic or game-master view) | the outline's line style: `local` dashed, `secret` dotted |
| the underground's systems (§8.2's gallery, chamber and link rows) | the system's program glyph (niche ticks, rock stipple, pillar squares, masonry double lines, vault hatch) |
| water classes (`waterKind`) | the shore program's line style and the water body's label |
| ground classes (land-use kinds) | the land-use `pattern` texture in textured families, a glyph stipple per kind in `ink` |

The cues are drawn at the legend-bearing zoom stops (those at which §9.5's legend shows the meaning) and in every
thematic view; elsewhere the default sheets keep their look. Each such sheet ships a checked variant per common
deficiency — `StyleSheet.variants` for `protan`, `deutan` and `tritan`: role substitutions the loader lays over the
palette — selected by the per-viewer view key `cvdVariant` (`'none'` default; V09's view settings), which joins the tile
key (§8.8). A missing variant draws the sheet's palette with its cues and is reported by the loader. §13's style check
(the simulated-deficiency contrast between every pair of categories a legend distinguishes, against its table threshold)
measures every variant; §9.5's legend shows each category's cue.

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
| wall, gate | `decayed` (breached or partly dismantled) | all | override: a gap glyph over each `breached` run of `Enceinte.condition` (§2.7; file f item 575); the towers of each `dismantled` run as trace discs |
| wall | `superseded` (`Enceinte.supersededBy` set, §2.7) | all | replace: `trace('ring')` — the old line as a hairline lighter than a wall, under the new ring's stroke |
| tunnel (II.7) | `abandoned` (silted) / `decayed` (caved in) / `ruined` (`Tunnel.closure` collapsed or sealed) | the underground layer | override: the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end |
| island (II.6) | `floating` / `waning` / `settled` (`SkyIsland.state`, §2.7) | the sky layer | override: none / the layer's alpha × 0.8 / × 0.6 — under `ghost` occlusion the island drawn at (1 − `ghostAlpha`) × that factor, the covered ground showing through at the rest (no separate raise) (§8.4); the shadow follows `elevationCm` by itself |
| island | `fallen` | the ground layer (the `fallen_island` decoration's members, V05 §3.16) | replace: the `ruin` program's rubble stipple over the members' faces and bands (M6-sky; file f item 408) |
| island | `removed` | the sky layer | replace: nothing drawn, no label, no shadow (V05 §4.2) |
| skyAccess | its states (V05 §5.1) | the sky and ground layers | V05 §5.1's rows (M6-sky; file f item 415) |
| retaining (item 110 (a)) | per run of `RetainingWall.state` (§2.7): `standing` / `decayed` / `ruined` | all | override: none / a bulged, broken stretch (the double line wavered, ticks broken) / replace: the bank alone (the low side's ticks as a hachure, no wall line) |
| raised (item 110 (b)) | in use / `abandoned` (neglected: no traffic, weathered; an aqueduct run dry) / a span `ruined` (fallen) / supports alone | all | override: none / the deck's casing dropped, its tone 20 % toward `ground` / replace the span: rubble stipple at the span's foot, the arch gone, the supports standing; a vault under a fallen span not drawn (collapsed) / the piers alone as filled footprints |
| deck (item 110 (d)) | its host's existence (file f item 246): `decayed` / `ruined` | all | override: a charred timber deck (the deck in `ground` lerped 40 % toward ink) / replace: the carriageway broken (dashed), the piers or the mole standing; the buildings on its deck plots by their own ruined rows until tombstoned |
| landUse (a deposit) | `worked-out` (V08 §5.2) | district and finer | as V08 §5.2 states (SettlementForge stage) |
| passage | `sealed` (`Passage.sealed`, §2.5; item 30) | district, neighbourhood | override: the arch glyph at each end drawn closed (a bar across the arch); the plots behind it take their buildings' own rows (vacant, §4.11) |
| building | Works `staked` (item 67; §4.11) | all | replace: `stake`; no mass at the city band, the stage glyph (§8.5) on the dashed footprint |
| building | Works `groundBroken` | all | replace: `pit` over the footprint; the stage glyph at the city band |
| building | Works `foundations` | district and finer | replace: the footprint's walls as low wall bands (outline weight × 2) or a sill frame, no roof; the city band a mass at 40 % alpha with the stage glyph |
| building | Works `wallsRising` | all | override: no roof construction, the interior floor in `ground`, `scaffold` round the walls; the heights of `heightsAt` (§4.11), so shadows grow storey by storey |
| building | Works `roofFramed` / `roofed` | all | override: `frame` without fill and `scaffold` / the roof drawn with `scaffold` still up; a work yard in `ground` |
| building | Works `emptied` / `stripped` / `rooflessShell` / `rubble` (a demolition) | all | override: openings as gaps / `frame` over bare rafters / the `decayed` row with rubble stipple inside / the `ruin` program as wall stubs with rubble heaps; `cleared` is the existing row |
| building | Works `decaying` (on the way to `decayed`) | all | override: the roof with gaps along its ridge, the outline dashed at 30 % |
| building | Works `roofless` / `collapsed` / `overgrown` (a decay Works' ruin stages, item 67 (f); §4.11's *Works* (4)) | all | as the `decayed` row / as the `ruined` row / replace: the footprint as a grassy mound — a `green` stipple fill, `trace('footprint')` over it at the district band and finer — with no mass |
| building | a `repair` Works at any stage of the decay ladder — `abandoned`, `decaying`, `roofless`, `collapsed`, `overgrown` (`worksKind: 'repair'`; §4.11's *Works* (4): the decay stages backwards under a scaffold; item 67) | all | override, laid over the row the stage resolves: `scaffold` round the walls and a work yard in `ground`; the city band's stage glyph (§8.5) |
| building | `charred` (a fire, item 67) | all | replace: `charred` — the blackened roofless shell, until a clearance or repair Works starts |
| building | Works `refit` (a conversion without a geometry step) | district and finer | override: `scaffold` along the frontage |
| plotLine | `pendingRemoval` / `staked` (item 67 (g); §4.11's Works lines) | district and finer | replace: the old boundary treatment dashed / the new line as stakes, dashed, until its fence or wall stands |
| access | `open` / `locked` / `bricked` (`AccessPoint.state`, II.7.4; item 64) / collapsed (its derived reading while its element is closed, II.6) | the ground layer where it breaks the surface, and the underground layer | override: the kind's `symbol` / with a bar / filled solid in `wall` / as a trace with rubble stipple; a secret one drawn only for a key that admits it (§9.2) |
| gallery | its system's kind — `catacomb`, `cavern`, `quarry`, `vaults`, `buried` (a buried old town's street), `dug` — or an undercity walkway (II.7.5, II.7.6; item 65), with the closure states of II.6's table | the underground layer | replace: `ossuary`, `cavern`, `quarry`, the `vault` hatch, the old street as a lane's body in `ground` with its buried shells as `trace` outlines, a dug passage as a `passage` tunnel, a walkway as a lane's body in `ground`; its closure states as the tunnel row above, `flooded` in `water` |
| chamber | its `Chamber.kind` (V04's `ChamberKind`; II.7.6, II.7.5) | the underground layer | replace: `chamber` with the kind's fill — `ossuary` niche ticks densening with its complex's `fill`, `workings` the quarry pillars, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `storey` and `square` as buried-town floors, `cellar` and `storage` as `dug`, the ruin's kinds by `ruinMasonry`; a flooded chamber in `water`; a collapsed one as a trace with rubble stipple; an unexcavated one by `unexcavated` (M6-U; file f item 407) |
| link | `UndergroundLink.kind` — `open` / `gated` / `secret` / `collapsed` / `flooded` (II.7.6; item 65) | the underground layer | replace: a hairline pair / with a gate bar / dashed and drawn only for a key that admits it / broken with rubble stipple / in `water` |

A Works stage named like a ladder state — the decay Works' `abandoned` and the demolition's `cleared` — takes that
state's row above; `before` draws the target's prior state and `finished` the target's own programs, the two stages
§8.3's census exempts as undeclined (item 67 (f)). A row that names a `worksKind` is the one exception to one row per
(kind, state): it matches only a target whose running Works is of that kind and is laid over the row its stage resolves
without it (J-A67.83), so a repair draws the decay stages backwards under its scaffold.
No reference draws a declined, worn or hidden state, a building in progress or an underground (item 23): the rows are
ours, they act only on an entity that carries the state or a running Works, and a town that never passes an epoch, a
scheduled edit or a hand conversion renders as the references' would.
`builtBand` and the geometry floor (§4.11) are read by no render rule: condition follows `Building.condition`, and
labels and descriptions follow the prosperity field (J-P1).

**Layer order** (data; `ink` shown; one list for the city and district bands). MFCG's recorded order (water → road casing
→ road body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title) is
a subsequence (order parity, §8.3); NG 1.2.2's (greens → roads → shadows → buildings → props → large-tree pins under buildings,
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
| 9b | retaining walls (`retaining`; item 110 (a)) | new: over the ground they hold, under the shadows |
| 10 | projected shadows — the vector rung only (§8.4; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink); raised-way piers (in `wall`) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail — each building's wings in stack order (`BaseWing.on`, §8.6), a tier over the tier below | MFCG: wards |
| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung their shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a deck may stand above the roofs beside it |
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
passes: [1] }` and `{ slot: 6, semantic: 'way.*', passes: [2] }` for way casings and bodies; exact pier, bridge-deck and
raised-deck entries in slot 14 outranking the prefix, and `way.stair` in slot 6's pass 3; one entry with no `passes` for a
river's casing and body in slot 7; and the sky's entries in every shipped sheet (`ink`, `lit`, `hatched`, `night` and the
parity presets) — `sky.island.land` slot 3, `sky.island.underside` slot 2, `sky.island.rim` and `sky.mist` slot 8,
`sky.island.shadow` slot 10, `sky.island.tether` slot 17, `sky.fall` and `sky.access.*` slot 19,
`sky.island.shadeStrip` and `sky.island.shadePending` slot 25, each with the per-family facts of V05 §5.1's slot table
(M6-sky; file f item 408). A CI test
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
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (V02 §5.3) | hatching per roof facet of the sheet's roof construction at a world pitch (`StyleSheet.hatch`), each sloped facet's lines parallel to its eave and clipped to the facet (a gable or hip wing's parallel to its ridge), with two ridge tapers per ridge-bearing wing (15–20 triangles per gable or hip wing), one prism shadow pass, lobed crowns in two greens, large-tree pins under the buildings and block trees above them (item 58 (d)), chimneys, pin and ground-access symbols, road surfaces and modes, stepped ticks; its neighbourhood and building bands take V01 §5.1's order list (the `pins` and `trees` layers named; slot 8b retaining walls, the piers in slot 11, raised decks in slot 14 with their shadow pass before it, slot 12's stack order with tier shadows) (M5; file f item 405) | per-wing hatching; the plan as `ink`'s |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role, its plate chroma aimed at the median (above); monochrome; `night` — the `ink` family whose sheet opens the view at night (`LightingSpec.defaultLight`, §8.4 (e)), its `@night` roles and `glow` sprites on the vector rung | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2 (the default label face, D-1); small caps and old-style figures come by §9.2's per-face path (N-12).

**Light by family (item 68; the model is §8.4's).** `ink` and `lit` are lit by the field model with the cursor sun by
default and cast shadows on (J-A68.81; J-C1): `ink` in value only (`mono`) and gently (ambient 1.3, so a day shadow on
open ground keeps roughly two thirds of its lit value — the ink family's shadow alpha 0.35), `lit` in colour (ambient
0.85); `hatched` by its own vector prism pass (`LightingSpec.model 'vector'`, §8.4 (g); the look of NG 1.2.2, §8.4 (h))
with its night glow (RIC-02); each family's night is its
day albedo under the night's light (its `@night` roles on the vector rung). The `MFCG` preset draws no cast shadow and
no light; the `FTG` preset draws FTG's sun, moon, weather rule and entrance window lights (§8.4 (h)).

**`lit` on the reference backend (VIS-7).** Every `lit` program — every mark of every family — runs on Canvas2D: the
lighting comes as a post operation over the Canvas2D base, never a second drawing path (§8.4; J-R4, J-A68.82).
Textures are `pattern` fills of greyscale seamless tiles tinted by the role colour (multiply); on rungs 1–2 the
programs, these textures included, emit albedo and normals and §8.4's light pass lights them per pixel
(*Paint programs*); on the vector rung lighting is `faceLight` per face
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

=== REPLACE ### 8.4 Layers, shadows, heights ===
### 8.4 Layers, shadows, heights

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky`
  marks above, their shadows projected onto the ground layer. Occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean;
    castsShadowOnto?: Layer;                // rung 3: the layer whose base this layer's projected shadows are composited into (the sky's onto the ground); absent: its own
    exportSeparately: boolean;              // read by §11.1's layered exports (its *Layers* rule)
    showCircuit?: boolean;                  // the wall layer: each committed enceinte's barrier-closed arcs as a faint dashed line with anchor ticks (g item 106 (g)); off by default; V09 §5.4 (M3a; file f item 413)
    underView?: 'cutaway'|'overlay'|'solo'; // the underground layer: the ground ghosted beneath, the ground at full, or the underground alone; default cutaway (M6-U; file f item 413)
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen), tethered to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint. Island placement is §4.2 S1 (2)'s,
  `SkyIsland.placement`'s (§2.7) and II.6's; B-ZOOM reports the ground area sky layers occlude. The island generator is
  owner-staged; these fields are its hook. **The underground layer is one layer over several systems (item 65; II.7.6; J-A65.81):**
  the sewer network in arena part 0 and each other system — catacombs, caverns, quarries and mine voids, vaults, a
  buried old town, dug passages — in its own part, the undercity in the part of its void (II.7.5), so their topologies stay apart while the view draws them as one layer: every item of every
  part is grouped into the depth bands of `depthBandCm` by the band that holds its floor, the cut-away draws the chosen
  band in full and the items of the bands directly above and below it as `trace` hairlines at α 0.5, and inside one band
  a shallower item draws over a deeper one (`z` by `elevationCm`). Where two parts cross in plan, the crossing therefore
  reads over and under — the upper passage drawn, the lower one's trace passing beneath it — and every link between parts
  (`UndergroundLink`, II.7.6) draws at its own depth with its kind's row (§8.2's `states`).
* **Toggles are visibility; existence is model** (the rule's home is II.7.1 and II.6; J-A12.81): the *Sewers* control at
  CITY and METROPOLIS (at TOWN it is II.7.1's model feature) and the island view toggle set the `underground` and `sky`
  layers' `LayerSpec.visible` (§7.8's controls), so hiding a layer changes no digest. The per-viewer view key
  `showUnexcavated` (§2.9) draws unexcavated voids for a key that admits them (file f item 413; the `unexcavated`
  program, §8.2). The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. A hidden layer's lights and casters are not
  drawn and light nothing on the visible layers, and they still exist (J-A12.81, J-A15.41).
* **Two different things (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy of each footprint
  beneath it, swept by an offset read from a class row (§8.2's symbolisation row; item 54) — ON by default in `ink`; not a shadow and not sun-dependent, so it is drawn identically by day, at night and on every
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
    defaultLight?: 'day'|'night'|'time';                            // the `light` key a viewer takes when this sheet becomes its drawn style, (e): `night` in the `night` preset; absent in every other shipped sheet
    vector: { projected: 'drop'|'prism'; penumbraPx: number } }     // rung 3's look, and `hatched`'s own at every rung
  type SunSpec = { mode: 'cursor'|'fixed'|'path' /* the family's default */; admits: ('cursor'|'fixed'|'path')[] /* the modes a viewer's `sunMode` may choose, (d): all three by default; a parity preset only its own */; azimuthCdeg: number; altitudeCdeg: number /* the fixed sun: 31 500, 4 500 */;
    heightRatio: number /* h₀ of the cursor sun: 1 */; discCdeg: number /* the apparent radius: 27 */; colour: Color; intensityLux: number /* 100 000 */;
    latitudeDeg: number /* path mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler reads the recipe's latitude itself (§4.5) (file f items 296, 391) */ };
  type MoonSpec = { colour: Color; intensityLux: number /* a full moon: 0.25 */; phase: { at: number /* 0 new … 0.5 full … 1 */; factor: number }[] /* interpolated */; discCdeg: number /* 26 */ };
  ```

  (a) **The surface.** The tile worker rasters, beside each tile's base, a **surface layer** from the same marks
  (§8.8): per pixel the surface normal, its height above the tile's datum (the tile's lowest terrain sample) and the
  unlit coverage (below). Its writers: terrain `field` marks (height and normal from the field); roofs as surfaces from
  the roof construction of §8.6 — eave, ridge and the construction's own faces, never the straight skeleton directly, so
  §3.8's readers stay three (J-A28.32, KERNEL-C05); flat roofs, walls, towers and gatehouses as the tops of their prisms;
  bridge and pier decks at `deckCm`; tree crowns as domes to their crown height (the top-down view never shows the
  ground beneath a crown); water at its level; a building under Works at its stage heights (`heightsAt`, §4.11; item
  67); a retaining wall as the top of its prism at its high side's level (its step from `stepProfile`, §2.7); raised-way
  piers as prisms; on the underground layer each floor, its walls and its ceiling. **The slab list** holds what a single
  height per pixel cannot — a caster whose covered ground the view draws: a sky island, under every occlusion mode, as
  its underside's tiers (V05 §3.9), each a slab (M6-sky; file f item 415), the span marks of a building over a passage
  (§8.5 (2); their `baseCm` column the underside), a bridge or pier deck over drawn water and a raised way's deck over
  the ground (its soffit the underside; item 110 (b)) — each a **slab** of the document's slab list (§8.8): its
  outline, its top and its underside, so the ground beneath is shaded from above and lit from the side, and an island's
  shadow falls from its underside (J-A68.83).
  (b) **The sources.** The **global light** — the sun by day, the moon at night (`LightingSpec.sun`, `.moon`); the
  **placed lights** — `LightSource` records (§2.7), placed by §4.7's light table or by hand (`placeLight`, §7.1), each a
  `light` mark (§8.1) with its height, intensity (cd), radius, colour and flicker; the **derived lights**, never
  records (J-A68.72) — lit windows (`live.windows`, §8.2's live layers, by §10.3's rule at the view's hour and week), the
  room lights of the plan rung (building band, §8.5), and **light shafts** (II.7.3, II.7.5, II.7.6: every access,
  grate, well or opening that breaks the surface, a downward source at its underground end whose intensity is the
  current global light's × the opening's `areaM2` × its `lightTransmission` (V04's `UnderLayoutRule.openings`) × its
  direct-light visibility — the ground pass's shadow term at its `ground.at` under the current sun, every caster
  included, a sky island's slabs among them (V05 §5.3 (1)) — plus its sky-ambient share, a cosine lobe whose radius is
  its depth plus 4 m (M6-U; file f item 414: the render's shadow term only, never item 102's model share)); finally the
  **hand lantern** — the viewer's own light (`handLantern`, underground only, off by default: a 20 cd source 1.5 m above
  the pointer's floor point, radius 6 m), never a record. Every light lights only where its host draws (§8.1 item 7).
  (c) **Brightness.** At a pixel with albedo `A` (the base raster's colour in linear light), normal `n` and height `z`:
  L = A ⊙ (a · (1 − O) · E_g · c_g + Σ_s E_s · V_s · c_s + β · Spill) ÷ E_key. The sum runs over the global light —
  E = its intensity × max(0, n · l), no fall-off, since it stands for the sky's sun or moon — and over every point light
  whose radius reaches the pixel — E = I_s · max(0, n · l_s) ÷ d_s² × f(d_s ÷ r_s), the inverse-square law with the
  smooth cutoff f(x) = (max(0, 1 − x⁴))², so a light fades with distance and ends at its radius (the owner's "optimal
  distances and gradients of effectiveness"); `c` gives each source's colour; `a` the family's ambient share for day, night
  or underground; `O` the ambient occlusion — the mean over eight directions of the sine of the surface's horizon angle
  within `occlusion.radiusM`, × `occlusion.strength` (narrow alleys, courts and the foot of tall walls receive less sky);
  `Spill` = max(0, B(D) − D), D the pixel's direct sum (the Σ term) and B its blur over `bounce.radiusM` (three box
  passes, margin included), weighted by `bounce.share` — the indirect light that "also helps to illuminate": light
  bounced from lit surroundings into a darker pixel, nothing on uniformly lit ground and never a darkening; `E_key` by day
  is the illuminance of an unshadowed level surface under the fixed sun — E_g · (a + sin 45°), exactly, since such ground
  takes neither spill nor occlusion — so open level ground shows exactly its albedo and §8.2's palette targets hold on the
  lit map, a shadow there keeping a ÷ (a + sin 45°) of it before the spill's lift (≈ 0.65 in `ink`, the ink family's
  shadow alpha 0.35; ≈ 0.55 in `lit`; `docs/validation/bench/amendc_repair_rendering_r1_light.out` (C)), a surface near
  the cursor sun reading a little brighter; at night and underground `E_key` is
  `exposure.nightLux`. In a `mono` family the bracket's colour is replaced by its luminance
  (Rec. 709 weights), so light moves value and never hue. The result is encoded back to sRGB and clamped.
  **Visibility** `V_s` is found along the ray from the pixel toward the source, over the surface layer's heights and the
  slab list, the ray's height rising linearly from `z` to the source's height with slope m: V_s = clamp(min over the ray
  of (z_ray − h) ÷ (t · σ_s), 0, 1), with `t` the ground distance along the ray and `σ_s` the source's apparent size as a
  slope (the sun's or moon's disc; a flame's radius ÷ its distance). **The traversal** — one law, used alike by the CPU
  reference, the GPU pass and the light map's bake (J-A68.83) — takes that minimum over the surface as a field of
  constant-height texels, read through the **max-height pyramid** each surface layer carries (§8.8: level 0 its texels,
  each level above never lower than the four cells beneath it, up to one cell per tile, and beyond the view's first ring
  the **ring blocks**, whose levels continue above that; each tile's and block's heights raised by its datum, so every
  cell compares in one frame). A cell the ray crosses over [t_a, t_b] whose greatest height
  h_max lies above `z` bounds every value inside it from below by (z + t_a · m − h_max) ÷ (t_a · σ_s); the cell is
  **resolved** — that bound taken as its value — at level 0, where the bound is the texel's exact minimum, or at the
  **resolution floor** ℓ(t_a) = max(0, ⌊log₂(4 · t_a ÷ S)⌋), S the tile side (§8.8's world-aligned tiles at the stop and
  DPR drawn; for the point lights one level more on every host once §12.7's pre-decided bake fallback is taken), and is
  otherwise divided into its four cells. So a caster within half a tile side of the pixel is resolved to its texel and one
  at distance t to a **floor cell** of side at most t ÷ 128, its shadow lengthened by at most that cell's diagonal —
  √2 × its side (≤ t ÷ 90), the chord a ray crossing it corner to corner runs — and never shortened, the same length at
  every stop to within it. Evaluated front to back from the pixel, a cell whose bound
  cannot lower the minimum found so far is skipped whole, and the traversal ends at V_s = 0; neither changes the value,
  since no cell's bound exceeds its four cells'; the result is therefore the law's, whatever the order of evaluation, and
  every caster the ray crosses is met, however narrow (`docs/validation/bench/amendc_repair_rendering_r2_traversal.out` (2): one
  unbroken shadow behind towers 2, 6 and 12 m wide under a 15° sun). The ray runs to the **window** R: for a point light
  its ground distance from the pixel; for the global light the distance past which the ray clears the highest surface the
  document holds by t · σ_s, so no penumbra is cut — R = (Z − z) ÷ (m − σ_s), Z − z being the display list's
  `surfaceLayerTopCm` (§8.1) less the pixel's elevation, with m = max(tan altitude, ⅛) for the fixed and path suns (*Sun*'s cap
  of a shadow at 8 × its caster's height, below) and, for the cursor sun, m = (H − z) ÷ |P − G| toward its ground point
  G, R there at most |P − G| and |P − G| itself where m ≤ σ_s (P the pixel's ground point); the ray also ends where it
  leaves the list's `bounds` (§8.1), beyond which nothing is drawn. The window is a world distance, so a shadow crosses every tile
  line at its similar-triangles length and never depends on the tile grid (receipt (1): the start within 1 px of the
  similar-triangles point on every grid offset, the floor adding at most its cell's diagonal — 1.33 × its side under a
  15° diagonal sun, `amendc_verify_rendering_r2_diag.out`). Each slab whose shadow sweep — its outline swept away from
  the sun from (underside − z) ÷ m to (top − z) ÷ (m − σ_s) — crosses the ray's plan is tested exactly by its outline
  over that reach, whatever R is, and a tile culls the slabs whose sweep's bounding box misses it (V05 §5.3 (2); file f
  item 416). R, the floor and the resolved cells depend on the source, the pixel and the surface
  only — never on the device, the rung, the frame time or the view's extent, and never on where a cell is held (a visible
  tile's pyramid, a first-ring position's or a ring block, §8.8), since each is held from a level at or below the floor
  it serves and every level is a greatest height by one rule (`amendc_repair_rendering_r3_blocks.out` (1): 0 of 672
  pixels differ from the law over a pyramid held whole, a 3 000 m hill under a 7° sun among them) — so the CPU reference
  and the GPU pass resolve the same cells and differ only by the GPU's arithmetic and the encoding of the surface, its
  pyramids and the blocks, which §13.4's tolerance bounds; §12.5 and §12.7 cost this traversal and restate none of its terms. So a
  **shadow is one source's absence** and a gradient, never one shade: its edge softens with the source's size and
  distance; a spot every side of which other lights reach has no shadow; the spill lifts a shadow from its lit surroundings, a narrow one most. And it is
  **height-aware** (the owner's point 4): a tall caster's shadow falls on a lower roof wherever the ray from that roof
  passes below the caster's top — shortened there by that roof's height — and continues beyond it onto open ground or the
  neighbouring building; a lower caster's shadow never climbs a taller neighbour, whose roof's rays pass above it; the shadow's
  length follows the source's height and distance.
  (d) **The cursor sun** (`SunSpec.mode 'cursor'`, the default; the owner: "the cursor moves the global light which
  creates different angles for every shadow"). With `V` the view centre on the ground, `D` the view's half-diagonal in
  metres, `C` the pointer's ground point, u = C − V and s = `sunHeight` (≥ 1; default 1), the sun stands at
  G = V + s · u, height H = max(h₀ · D · s, 1.5 × the list's `surfaceTopCm` above the view's ground whenever the sky layer
  is visible and the document holds an island that is not fallen, whatever is in view) (h₀ = `sun.heightRatio`; the
  floor V05 §5.3 (4), M6-sky). At s = 1 it stands over the pointer, and every caster's
  shadow falls straight away from it; a caster of height h at horizontal distance d from G throws its tip to
  d · h ÷ (H − h) beyond it (similar triangles), capped where the view ends when h ≥ H. As `sunHeight` rises the sun
  recedes along the line from `V` through `C` and rises in proportion, so the shadows turn from radial toward parallel,
  the pointer then setting the sun's bearing (from the view centre toward the pointer) and its elevation
  (atan(h₀ · D ÷ |u|)) — "very high: nearly parallel, realistic; lower: dramatic and radial". **Which sun draws** (one
  rule; J-A68.84): the sheet's `SunSpec.mode` is the family's default and `SunSpec.admits` the modes it offers — a parity
  preset admits only its own, the `FTG` preset `fixed` and `path`; the per-viewer `sunMode` (§2.9) chooses among the
  admitted modes, and a value the sheet does not admit (the key's `cursor` default under the `FTG` preset) draws the
  sheet's `SunSpec.mode`; a drawn `cursor` sun where there is no pointer — the first map, a touch screen, every export, a
  still, a headless render — or on rung 3 is `fixed` (`SunSpec`'s fixed sun). The pointer is a transient input,
  never stored, logged or hashed (§6.2). Because H scales with the view, a zoom changes the on-screen shadow lengths of
  the radial sun; the lengths of the fixed and path suns never depend on zoom (J-A68.84). The **moon** follows the same
  geometry at the night view's intensity and colour, its intensity × the `phase` row's factor at the phase of the drawn
  week and the `time` key's day on a 29.53-day cycle from week 0 (our stylisation).
  (e) **Day and night.** The per-viewer key `light` (§2.9): `day` (the default) — the sun; `night` — the moon and every
  point light, the scene dark but for them; `time` — day or night by the path sun's altitude at the `time` key, night
  below −6°, the two blended over −6° to +6°. A sheet may carry `LightingSpec.defaultLight`: when that sheet becomes a
  viewer's drawn style — chosen as its `stylePreset` (§11.3), or the document's own style opened by a viewer whose view
  state holds no `light` value — the viewer's `light` key is set to it, a view change like any other that the viewer can
  change back; so the `night` preset opens at night and §2.9's `day` default stands everywhere else. By day point lights contribute nothing on the ground and sky layers (a lamp
  post stays a symbol). **Underground there is no global light at any setting** — the ambient is `ambient.underground`
  (near zero) and every lux comes from the point lights, the shafts and the hand lantern, dense in the undercity and
  around the dwellings below ground by the light table's underground rows (§4.7; II.7.3, II.7.5). How much light a night has is not a style value: it
  is the light table's rows (§4.7) with the era, `magic` and prosperity rows, so rich streets and magical districts are
  lit and poor alleys and hidden courts stay dark.
  (f) **The light pass** — one function with two implementations (J-A68.82). It is a **post operation over the base**
  (slots 1–20 of §8.2's order; what it never lights is §8.2's layer-order rule), so the label floor holds at night
  (§9.4): the tile worker composes labels and `overlay` marks into the tile's
  one bitmap (J-R21) and writes their pixels' coverage into the surface layer's unlit coverage, and the
  pass leaves a covered pixel at its composed colour (lit ⊕ composed, weighted by that coverage). **§8.2's post operations
  run after the light** wherever it runs (J-A68.87): on rungs 1–2 the tile worker leaves them off the base it rasters and
  the GPU pass applies them to the lit base after the global term and the baked light; an export or still applies them
  after its CPU reference pass, band by band, before its labels are composed (§8.8); on rung 3, and under a sheet with no
  light, the tile worker applies them to the base after its marks. On every path they act on the base picture alone — a
  covered pixel keeps its composed colour — and a **cell operation** (`pixelate`, `dotScreen`) takes its cells on each
  tile's own grid from the tile's corner (a partial cell at its far edges where the cell does not divide the tile) and
  averages only the base in each, every pixel weighted by 1 − its unlit coverage — the tile worker and the CPU reference
  taking the coverage of the labels and overlays they will compose, the GPU the coverage the surface layer carries — and
  puts that average into the cell's uncovered share alone (J-A68.91); so a coloured light never re-colours a greyscale,
  sepia or tinted base, and a view agrees with a CPU-reference export of the same frame. The **CPU reference**
  runs in the tile worker for every export and still, the goldens and the tests, in float64 with its transcendentals
  through `dmath`, every sum in a fixed order — byte-identical on the five engines (§6.5 (9); J-A68.62). The **GPU pass**
  (WebGL2, WebGPU where available) is the main-thread compositor's (§8.9) for the interactive view and is held to
  the reference by §13.4's tolerance. The static lights and the occlusion are **baked** per tile into a **light map**
  (the Σ over point lights of their terms with their visibility, and `O`) by the tile worker, once per **light-map key** (§8.8): its tile's surface key — §8.8's base key, its content version
  taken over the tile dilated by the largest radius among the lights that reach it — plus the revisions of the `light`
  marks reaching the tile, the drawn week, the drawn hour and the `light` key, so a view switch or an edit that changes the
  surface a light's traversal reads or the lights that draw (a model-layer toggle, `plotsOnly`, `storey`, `depthBand`, the
  knowledge key while a concealed mark, a mark drawn only for a key that admits it or a light whose host is either lies in
  the dilated tile, §8.1 item 7) re-bakes it — a light entering a tile's bake only when its
  radius reaches the tile, its traversal reading the surface of the tile dilated by that radius — so thousands of torches
  cost only what is on screen. Per frame the global light's term — and, underground with `handLantern` on, the hand
  lantern's, a point light by (c)'s law and traversal over the pixels within its radius (J-A68.92) — is evaluated on the
  GPU over the visible tiles' surface layers and pyramids, assembled into one view texture with the first ring's
  positions and the ring blocks round them that the global light's window reaches (§8.8), so a shadow crosses tile edges
  seamlessly; an export or still, which has no pointer, draws no lantern, and the CPU reference evaluates the lantern
  only at a pointer point a test supplies, by (c)'s law and traversal, as it evaluates the cursor sun for §13.4's
  stills (§8.3's hand-lantern row; J-A68.92). A fire light's **flicker**
  scales its baked term in the view by a pure function of its render key and the view's time (J-A68.61); the CPU
  reference draws it at its mean. A tile an island's drawn land face touches carries a second base and surface layer for
  the sky, lit by the same law at the island's true position and composed by the occlusion mode; a tile no island's land
  touches is re-lit where an island's shadow falls (V05 §5.3 (2); M6-sky).
  (g) **The fallback ladder** (F-LIGHT, §5.2; J-A68.85). Rung 1 — the GPU pass at the tile DPR; rung 2 — the GPU pass with
  the global term at half resolution, upsampled by the surface layer's normals and heights; rung 3 — the **vector rung**:
  projected shadows (§8.2's `shadowPass` program, `drop` or `prism` by `vector.projected`, `vector.penumbraPx`) from the fixed or path sun, the family's
  night role variants (`@night`, §8.2) with a `glow` sprite at each light mark, and the light step (below) for
  `faceLight`, the two-tone roof, `hillshade` and the crowns. A tier's rung is chosen at app start from §8.8's canvas
  budget and the measured frame time (§12.5), lowered at run time on a lost GPU context or three consecutive frames over
  the pass's budget, never raised mid-session; every change is counted in the view telemetry, never an error and never a
  model change; these are F-LIGHT's triggers (§5.2 cites them). **A tier whose GPU pass misses §13.4's tolerance** at its milestone transfers its surface layers at full
  precision — the height and the octahedral normal's two components in float32 with the unlit coverage byte beside them,
  13 B per pixel (3.25 MB per position at 512² instead of 1 MB) — and its pyramids, its first ring's heights and its ring
  blocks in 16 bits: whole centimetres above each one's datum, rounded up, 2 B per cell, the step widening to
  ⌈range ÷ 65 535⌉ cm only where one's range passes 655.35 m (§8.8 counts them in Q_f). The GPU then reads every height
  the reference reads to within one step — 1 cm wherever a range stays under 655.35 m — whereas one byte's square-root
  step, ≈ 0.67 m at 45 m, would move a far caster's shadow tip by that step × cot(altitude) (≈ 10 px at the 1:500 stop
  under the fixed sun). The traversal is unchanged, since the reference resolves the same cells ((c)); the tier is
  re-measured and, still missing, draws rung 3 (J-A68.85). Every export and still takes the CPU reference; an SVG draws rung 3's vector shadows, or with the export
  option `lighting: 'raster'` one embedded raster lighting layer from the CPU reference (§11.1). The `hatched` family
  draws rung 3 at every rung — its look is the prism pass of NG 1.2.2, below — while its night lights still come from the
  light marks.
  (h) **The parity presets and the families** (item 23; J-A23.71). `MFCG` — `model: 'none'`: the raised under-copy only
  (K06, above), no cast shadow, no night view and no light — our preset's behaviour, with no claim about the reference's
  (J-A68.86); `FTG` — the fixed or path sun and a low-intensity moon on the same path at night, one ambient term and the
  directional term only, and with it every shadow present only under `clear` or `snow` weather, and one window light
  at each lit building's main entrance (the anchor at which the FTG client as captured on 25 September 2026 draws its
  night lights, item 50; provenance `ref:FTG client (captured 25 September 2026) ambient-and-directional light (code)`, P22); `hatched` — the
  prism pass of NG 1.2.2, which offsets one shadow per wing by height against the light, shadows trees and pins the same
  way and multiplies them at the sheet's alpha, and at night an ambience wash with a glow per lit building (`ref:NG 1.2.2 prism shadow and night glow (code)`, P23); the stage-3 building band under the parity presets — the
  per-facet diffuse-and-specular shading from one light, with a swept-silhouette shadow, as Fantasy Manor build 890 draws it
  (`ref:FM build 890 facet shading (code)`, P24). No constant of
  those readings enters a cell. Every default row of ours — the field model, the cursor sun, the moon, the point lights,
  the ambient, occlusion and spill terms — carries the `extension` marker, so the parity presets switch it off.
* **Shadow casters** (WC5; the surface layer's and the slab list's writers on rungs 1–2, projected on rung 3): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included; a building over a passage also casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm`
  plus the passage's `headroomCm` to that wing's eave over its span ring, projected from its underside like a bridge
  deck), towers and gatehouses (prism), curtain walls (prism of the band), bridges and piers (deck prism over water),
  trees (crown offset by the crown height), sky layers (each island's underside tiers projected from their undersides,
  at rung 3 in the `prism` form whatever `vector.projected` says, V05 §5.3 (3)), retaining walls (a prism from the low
  side's ground to the high side's level, casting onto the low side only), raised ways (piers as prisms; the deck a slab
  projected from its soffit, like a bridge deck), a stepped building's tiers (each tier from its own base — the top of
  the tier below — so each casts its own shadow, onto the tier below and beyond; item 110 (c)); a building under
  Works casts at its stage heights (§4.11). On rung 3 every caster projects along the sun vector from its base elevation
  (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within FTG-13's plinth tolerance, so a flat
  projection from the base is exact to that tolerance — the height-aware receivers of (c) are rungs 1–2's. Rung 3's
  shadows are unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into
  a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun
  re-rasters only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth;
  `prism` draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec` (above; which mode draws is (d)'s rule): the `fixed` sun (light from the upper left); in
  `path` mode from `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the
  view-state time (§2.9's `time` key; the simulation module's clock when it runs), the hemisphere following the latitude's
  sign. The same `sunPath` is the model's daylight sampler (§4.5 *Fields*, g item 102 (a)), evaluated at the site latitude
  on the model's fixed hours and never at the view's time, latitude or sun mode, so no view setting moves a model value
  (g item 102; file f item 296). Projected shadows
  read the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude — on rung 3 (on rungs 1–2, §8.2's *Paint programs*).
  Below −6° the view is night by (e). Shadow length is
  capped at 8 × height near sunrise and sunset for the fixed and path suns. Rung 3's shadows are vector with no
  shadow-resolution setting; rungs 1–2's are resolved by (c)'s traversal at the surface layer's resolution, to its floor
  cell beyond half a tile side (§8.8).
* **Budget (AM-3; rung 3).** Projected shadows cost ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
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
* **Heights** are §2.6's (at a Works stage §4.11's stage heights), so the surface layer, the shadows, glTF and CityJSON
  agree (O17 g).
=== END ===

=== REPLACE ### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2) ===
### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table (frames: §3.2
(9)); this table adds the matched MFCG reference at each rung and the cap above METROPOLIS's target.

| rung (§1.1) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|
| TOWN | 40 | 1 475 / 58 | 57 ms |
| CITY | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target — up to the population cap of 120 000: ≤ 35 000 buildings, a frame ≤ 153.6 km² (≤ 12.4 × 12.4 km) | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE). **The
  default request** of a rung is its target population, whose building count §1.1's rung table gives as a range; a band's
  bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table).
* Within a rung the frame scales with the requested population (§3.2 (9)). At the cap the square frame is 12.4 km
  (19.8 km with the margins); at the extreme aspect 2 it is 17.5 × 8.8 km, whose |x| with the margins is §3.2 (1)'s
  bound — ≈ 6× headroom under its 2²³-cm range. Requests outside the ladder are routed or clamped by §1.1's `LadderRouter`; a dossier's are §7.7 item 15's.
* The matched counts come from the MFCG size sweep (`captures/mfcg/exports-sweep-2026-09-25/README.md`). MFCG's GeoJSON
  export is in metres and only its SVG uses its 4 m internal unit (road width 8 in the JSON, 2 in the SVG). MFCG counts
  with shanty town, river and coast switched on (15 392 buildings at size 80; the 13 349–36 480 size-80 counts of its
  profile, under such option sets) are stress comparisons, not the CITY bar.
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
  step's bake runs at the head of §8.4's light-step pass, inside its settle bound (R12-17).
* **Lighting (item 68; §8.4).** In the tile worker, per visible tile after its base: the **surface layer** ≤ the base
  raster's own time at the band (the same draw sequence writing normals, heights and coverage; PLAUSIBLE), and the
  **light-map bake** ≤ 2 ms per tile for up to 50 lights reaching it and ≤ 4 ms for up to 200 (PLAUSIBLE: 256² texels ×
  the lights whose radius covers them × §8.4 (c)'s traversal toward each, plus the eight-direction occlusion), each light a unit of
  §8.9's class 3; then per **first-ring position** its heights raster ≤ the surface layer's time at the band (the same
  draw sequence writing heights alone), and per **ring block** ≈ 1 µs per city-band mark meeting it, ≈ 2 ns per
  terrain-field sample meeting it and ≤ 0.05 ms for its ≤ 21 845 cells (PLAUSIBLE; one block per unit of class 3) — each mark read
  by about one block of a view's partition, so the blocks of a window reaching a whole frame from the 1:500 stop cost
  ≈ 39 / 85 / 181 / 433 ms at the TOWN, CITY and METROPOLIS targets and the population cap
  (`amendc_repair_rendering_r3_blocks.out` (6)), cached per stop and paid again only for the blocks a pan exposes or a
  delta dirties; so a lit settle stays within §12.5's settle bound for the city and district bands of the golden views
  (the mountainous fixture's: §12.5).
  **A lit export** adds the CPU reference light pass: ≤ 60 ms per 512² tile of the export (PLAUSIBLE: ≈ 262 000 pixels ×
  §8.4 (c)'s global-light traversal, the baked point lights and the occlusion, in float64, with its window's first ring
  and blocks, §8.8 — its first ring rastered per tile, and each block computed a single time as long as the export's
  16-MB block cache holds it, at the ring block's rate above), so A2 at 300 dpi of a
  CITY lit takes ≤ 30 s with the view idle (unlit, the ≤ 20 s below) (R12-18).
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing (§11.1).
  Inkscape opens it within §11.1's CI bound.
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
* **Confirmation of the export budgets (N-27 c; R12-19).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
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
* **Export beside the view:** R12-20. **The stamp-tile load:** R12-21.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (the kernel's
  M0 bar, §3.7; §12.4's S11 row); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
  building median over the town, ≤ 60 µs median and ≤ 250 µs p99 over its composed classes, and ≤ 12 µs mean (V02 §6.1),
  and its registration re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7; file f item 223; R12-22);
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool as §4.1's policy says (§8.6, §8.9), streamed
  to the tiles centre-out — one tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its
  compositions arrive). A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test
  instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included — so the 1 ms
  `compose()` bound has headroom (item 59).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool as §4.1's policy says — one plan for each click, inside a
  single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay),
  opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4). A re-cut — of a `stale`
  plan at its click, or of a stored plan inside the event that changes its
  inputs (§7.3; J-A28.72) — runs as §2.6's chain of such steps along item 28 (f)'s interior ladder: one per band row
  crossed and one per household added or removed, from the as-built plan's row and count for a stale plan (the canonical
  chain) or from the stored plan's, fewer where the cache holds a memoised step (§2.9); its length — at most the band
  set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6) — is known
  before the first open; budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95 — PLAUSIBLE until R12-23 measures it;
  a miss at run time is reported, never answered by a coarser plan (§12.1).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker (R12-24); never
  on the one-click path.
=== END ===
