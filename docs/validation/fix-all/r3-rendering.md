# Fix-all round 3 — RENDERING area (§8 rendering and style, §9 labels and furniture, §11 export and interop, §12 performance budgets)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-rendering-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-rendering-r3` · 2026-09-25 · fix architect for the RENDERING area, round 3 (opus stand-in for the Fable
seat). Status: COMPLETE (2026-09-25).

## 0. How to read this file

**In plain words.** The check of round 2 left eight things in the drawing, labelling, export and speed sections still
wrong or missing. All eight are fixed here; none is put off and none is waved away.

* **Speed is now stated honestly for building the town, not only for drawing it.** The improvement plan asks that a
  town's model be built in a tenth of a second, a city's in three tenths and a metropolis's in one second. That holds
  for towns up to about 4 500 people, cities up to about 17 700 and metropolises up to about 59 000; bigger ones take
  up to about 0.2, 0.5 and 1.9 seconds, and no single town may take more than a quarter longer than its size's rule.
  This is now written down for the owner to veto, like the first-map miss already is (NR-1), and the plain-words
  summary of the speed chapter now says exactly what the rules give (NR-2).
* **Two towns made from different seeds no longer share tree patterns and roof colours.** The random details drawn at
  display time were keyed by a building's place in the "family tree" of the town, which is the same in every town; they
  are now keyed by an identity that also includes the seed (VD2-6).
* **The same forest is drawn everywhere.** The ready-made tree-scatter patterns are now built from a fixed recipe that
  gives identical points on every computer and in both background threads, so a tree the user moved stays that tree in
  exports and after reopening (NR-6).
* **Style files can now say where street outlines go.** A style sheet's drawing-order table can place a street's
  outline and its body in different layers, and a sheet that leaves any drawing ambiguous is refused instead of being
  read two ways (NR-3).
* **The compass, title, legend and ruler know where things are again.** They ask the background drawing thread, which
  holds the drawing list, and get an answer within one screen refresh (NR-4).
* **SVG exports have a stated home.** The thread that holds the town builds a temporary drawing list for the export and
  throws it away afterwards; the memory it needs is counted (NR-5).
* **The 3-D city export declares its one extra field properly**, with a small companion file as the pre-decided
  fallback if a validator still objects (NR-7).

**Format.** §1 is the disposition table. §2 holds the replacement blocks, each starting with
`=== REPLACE <section and exact heading> ===` and followed by the complete new text of that subsection in the
architecture's voice, with its banner under the heading so the marking survives integration. §3 lists what other areas
must change (the integrator applies it), including the amended D-18 and J-R19 and the new judgment-call rows
J-R38 – J-R43. Every new choice is recorded in its block as "chose X over Y because Z".

**Evidence.** The numbers of NR-1, NR-2 and NR-5 come from `docs/validation/bench/fixall_rendering_r3_budgets.py`
(our own arithmetic, stdlib only), whose output is committed as `fixall_rendering_r3_budgets.out` and quoted in §12.3
and §12.8 (CONFIRMED: executed in this lane). The item sources are `r2-verify-rendering.md` §4 (NR-1 – NR-7) and
`r2-verify-determinism.md` (VD2-6); the architecture was read at §6.1, §6.3, §6.5, §8, §9, §11, §12, §14, D-18,
§15.2's O3 row, the J-R rows and `docs/IMPROVEMENTS.md` O3. NR-7's premise — that an undeclared `+` root property may
fail CityJSON validation — was not executed (no validator is available here), so it stays PLAUSIBLE and is fixed, not
ruled INVALID: the fix holds whichever way a validator behaves.

**Output shifts, stated.** VD2-6 changes every render-time draw (tile variants, jitters, species, crowns, colours) and
NR-6 fixes the stamp tiles' points; both change pixels, never the model or its digest. No golden PNG or placement
digest has been recorded yet (goldens start at M1, §13.3), so no recorded output moves; from M1 on, either change
would be a declared view shift that bumps the style version of every shipped sheet (§13.3, §3.3 S5 below).

**Deferral scan.** `grep -i -E` over every block of §2 for TBD, later, "at M0", open, defer, postpone, "to be decided",
"not yet", revisit, pending, placeholder: the hits are ordinary prose ("the compositions arrive", "a later session and
host", "pending" tiles) or measurement-plus-fallback pairs; nothing is left open.

## 1. Disposition table

| id | sev | disposition | sections changed | mechanism (one line) |
|---|---|---|---|---|
| VD2-6 | minor | **FIX** | §8.1 (the `key` columns, item 5, reasoning), §8.2 (multi-colour roles), §8.3 (census row), §8.10 (per-instance look), §12.8 (wording); cross: §6.1 (determinism), J-R19 (scope) | `RH32` is keyed by the **render key** = the low 64 bits (words 0–1) of the entity key, which mixes the seed key with the lineage hash, layer and island and is already cached in the arena; a census row checks that entities with equal lineage in two seeds' towns get different render keys |
| NR-1 | major | **FIX** | §12.3 (new table, declaration, max clause, measurement, fallbacks), §12 plain words, §12.9; cross: D-18, §15.2 O3 (d), §1.1 table header, §13.2 / §13.8, §16, J-R38 (scope) | per rung: where O3 (d)'s bar holds for p95 (B ≤ 1 333 / 5 200 / 17 300) and for the max (each generation ≤ 1.25 × its own law: B ≤ 1 000 / 4 000 / 13 460), band-bottom / default / top values, single-worker thresholds; the miss above declared for the owner's veto with reason and reversal cost; laws confirmed by the cost-model sweeps, the max clause on the nightly B-CITY run, each with a pre-decided D-18 amendment as fallback |
| NR-2 | minor | **FIX** | §12 plain words | reworded to the laws: a town under a quarter second; a city under half a second up to ≈ 25 000 people and under 0.6 s at 30 000; a metropolis up to ≈ 48 000 people in about a second; plus the model-time sentence of NR-1 |
| NR-3 | minor | **FIX** | §8.1 item 3, §8.2 (`OrderSlot`, layer-order rows 5, 6, 10, 11, *Slot resolution*), §8.3 (census row); cross: J-R39 (scope) | `OrderSlot` gains `slot`, `passes?` and `derived?`; the loader resolves every emitted (semantic, pass) by most-specific-wins and refuses a sheet with an unresolved or tied pair; shipped `way.*` entries name passes [1] (slot 5) and [2] (slot 6); S14 emits one mark per pass; the raised under-copy and projected shadows are `derived` per-tile operations |
| NR-4 | minor | **FIX** | §8.9 (threads, four crossing rows, *Queries to the tile worker*), §9.5 (compass, title, ruler); cross: §14 comments, §16, J-R40 (scope) | main ↔ tile worker furniture-placement and snap queries, copied, ≤ 4 KB each way, served ahead of raster work with tile rasters cut at 8 ms, so an answer lands within one frame; measured at M1 / M2b, fallback 4-ms slices; the API's `hit` and `inView` queries run in the generation worker on its index |
| NR-5 | minor | **FIX** | §8.1 item 6, §8.9 (threads, export rows), §11.1 (SVG row, *Where exports run*), §12.7, §12.8 (*Export-time peak*); cross: §14 `Exporter`, §4.10 (pipeline), J-R41 (scope) | SVG exports build a transient list in the generation worker (`DisplayListBuilder.build(model, band)`), run S13b there through `@plat/labels` with render's `ObstacleSource` / `RoleIndex`, and release it; raster exports cross to the tile worker as requests; the peak (≈ 1.9 KB per building at the city band: 10 MB CITY, 26 MB METROPOLIS target, 67 MB at the cap) is counted in §12.8 with a measurement and a fallback |
| NR-6 | minor | **FIX** | §8.10 (new bullet *One construction everywhere*, *Where it runs*), §8.3 (census row); cross: §6.1 registry (determinism), §13.3, §13.8, J-R42 (scope) | stamp tiles from `rng.stream` with a constant entity key (domain, class index, spacing, tile index), `STAGE_VIEW` and the non-rerollable concern `render.stampTiles`; integer-centimetre points; `dmath` trigonometry and exponentials, `Math.sqrt`; sums and ties in point-index order; the builder under §6.5's lint; a census hash equal in both workers on the five engines and to a stored value |
| NR-7 | minor (PLAUSIBLE) | **FIX** | §11.1 (CityJSON row, *The CityJSON extension*); cross: §16 M3b, J-R43 (scope) | PLAT ships a CityJSON Extension (`Plat`) defining `+platGeoAnchor`, listed in `extensions` only when an anchor is written; CI validates with the local schema; pre-decided fallback: a `<name>.geoanchor.json` sidecar (not `<name>.city.json`, which is the export itself) |

**Totals:** 8 items — 8 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred. **Folded, not owned:** the §8.1 part of
determinism's VD2-5 (`DisplayList.salts` as `Record<RerollableConcern, number>`) is written into this area's §8.1 block
so the integrator edits §8.1 once (§3.0).

**Where a required change was refined, and why.** NR-6 asked for square roots through `dmath`; §6.5 (2) makes
`Math.sqrt` exact by specification and allowed by the lint, so the block routes trigonometry and exponentials through
`dmath` and keeps `Math.sqrt` — the same bits on every engine either way. NR-7 proposed a `<name>.city.json` sidecar;
that is the conventional name of the CityJSON file itself, so the sidecar is `<name>.geoanchor.json`. NR-3's
"(semantic, pass) maps to exactly one slot" would refuse the shipped sheets, whose raised under-copy (slot 11) and
building fill (slot 13) are both fills of the building semantic; the block therefore places the raised under-copy and
the projected shadows with `derived` entries — per-tile operations over the caster marks — outside the (semantic, pass)
resolution.

## 2. Replacement blocks

=== REPLACE 8.1 The display list (renderer-independent, columnar, incremental) ===

### 8.1 The display list (renderer-independent, columnar, incremental)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

```ts
// LodBand, Role (§8.2) and ZoomStop (§8.8) are declared in @plat/model (§14), so @plat/labels and @plat/render share them without either importing the other's code (N-22)
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore';
// one row per mark; every column is a typed array, so any slice is transferable (§8.9); bytes per mark on the right
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index                                                                              1
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', 'building.footprint', 'shore.segment', …)   2
  entity: Uint32Array;                 // interned entity handle (§2.1): session-local; routes deltas, hit-tests and edits; never hashed (item 5)   4
  key: Uint32Array;                    // 2 per mark: the entity's render key — the low 64 bits of its entity key (§6.1: the seed key mixed with the lineage hash, layer and island) — the key of every render-time hash (item 5; VD2-6)   8
  layer: Uint8Array; z: Int32Array;    // model layer (§2.1) and order inside it                                                      1 + 4
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band           1
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay — the order within a slot (item 3)   1
  group: Uint32Array;                  // district handle: the unit of delivery and invalidation, never a raster cache unit            4
  bbox: Int32Array;                    // 4 per mark, world cm                                                                        16
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids        8
  revision: Uint32Array;               // content revision of the entity's inputs (low 32 bits of its §6.2 leaf digest) — the cache key (LC-23)   4
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each where present: heightCm, baseCm, prosperity, class, block, bankKind, waterKind, exposure, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'custom' }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — everything S13b reads; ≤ 96 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: the LabelEntity's render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in order of preference */; anchors: Uint32Array /* 2 per row: range of point anchors */; breakAt: Uint32Array /* 2 per row: range of glyph indices */;
  parent: Uint32Array /* the row of the parent QuarterNode's label (§9.1, §9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable;
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; the type is generated from the concern registry (§6.1; VD2-5) */; layers: LayerSpec[]; bounds: Box; version: number }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; dirty: Box[] }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand, groups?: number[]): DisplayList;             // full build (generation, load), or one band for the named districts (on-demand bands, §8.9)
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration, override resolution (§8.10)
}
```

1. **Built by S14 from the model through the entity registry** (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only which marks are emitted and which programs
   run change.
2. **Kinds added.** `field` marks carry a raster in world space (terrain height for hillshade and contour marks,
   distance to shore for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore`
   marks are chains, one per maximal run of equal attributes along a water face's boundary, with the attributes
   `bankKind` (§2.3), `waterKind` (the water body's kind), `exposure` and `shoreClass` (bay / headland / straight, §2.3;
   read by the shore programs' per-class rows); `exposure` = `sheltered` when the segment bounds a harbour basin, moat,
   canal or pond or when its fetch (the longest straight run across water within ± 30° of the outward normal) is below
   300 m, `river` for river and tributary faces, else `open` (VIS-13). `instances` marks carry a face or chain and one
   `InstanceTable` row — the stamp's offset, rotation and spacing that S14 draws from the entity's `render.instances`
   stream, the species mix and the resolved overrides — and their points are generated at raster time by §8.10, never
   stored in the list. `text` marks carry one `LabelTable` row each, so label placement (S13b, §9.2) needs nothing but
   the display list (N-4).
3. **Slot, pass and the draw order (N-7).** The draw order is **slot-major across the whole scene**: every mark of
   slot s of the style's layer-order table (§8.2) is drawn before any mark of slot s + 1, in every tile; within a slot,
   marks draw in `pass` order (fills, casings, bodies, linework and symbols, overlay), then by `z`, then by `key`. A
   mark's slot is resolved from its (semantic, pass) by the style's `OrderSlot` entries when the sheet is loaded —
   exactly one slot per pair, or the sheet is refused (§8.2, NR-3) — and cached per style version as a table from
   (semantic index, pass) to slot. S14 emits one mark per pass an entity draws in, as the entity registry declares per
   band: a cased ribbon is a pass-1 casing mark and a pass-2 body mark over one geometry range (the second mark adds
   its columns, ≈ 60 B, never a second copy of the geometry: one extra mark per drawn way, a few thousand at CITY). The raised under-copy (slot 11) and the projected-shadow union (slot 10) are not marks of
   their own: they are per-tile operations over the caster marks, placed by `OrderSlot` entries with `derived` (§8.2).
   Way casings (slot 5) and way bodies (slot 6) are separate slots that hold every way class — the shipped sheets'
   entries `{ slot: 5, semantic: 'way.*', passes: [1] }` and `{ slot: 6, semantic: 'way.*', passes: [2] }` — so every way
   casing precedes every way body across the scene and no district's drawing can put a casing over another district's body (GEO-28);
   masses, fields, woods and shadows keep their slots after the roads (K16, the NG shadow order, MFCG's wards after
   roads). `group` is the district and is used only to deliver and to invalidate; rasters are cached per world-aligned
   tile (§8.8), never per district.
4. **Incremental.** After an edit or a scoped regeneration the builder receives the changed entity handles (the
   locality closure of §7.3) and emits a `DisplayDelta`: removed marks, new marks for changed entities and for the
   entities whose marks depend on them (a way's marks when a junction on it moved; a district's ground mark when a block
   in it changed), the label and instance rows of those entities, and the dirty world boxes = the old and new marks'
   bboxes dilated by the largest cross-tile effect (§8.8). Cost O(changed marks). During a replay (loading a log, undo
   beyond the scoped records, migration) the builder is suppressed and runs once at the end (SCL-9) — S13a is model data
   and runs at each event's log position (§7.3 item 2); only S14 and S13b wait for the end.
5. **Cache keys and render-time keys (LC-23, NF-D10).** Every derived artefact — roof geometry, label spine, footprint
   mass, instance set, tile raster, glyph run — is keyed by (the entity's `key` or the tile address, content revision,
   band, style version, roof construction where it applies), never by id alone: a `setAttr` on floors changes the
   building's revision and so its roof; a changed boundary street dirties the region on both of its sides. **Every hash
   drawn at render time** — a multi-colour role's index, weathering, the stamp's tile variant, a grid's jitter, crown
   index and colour and scale jitter, hatch phase, roof detail, the `ruin` dash pattern — is
   `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag naming the use, the mark's **render key** `key` — the
   low 64 bits (words 0 and 1) of the entity key of §6.1, which mixes the seed key with the lineage hash, the layer
   and the island and is cached in the arena beside the lineage hash (VD2-6) —, the concern's salt (§6.1), and the style id only for looks (colours, crowns, hatch), never for positions; `RH32` (the render
   hash; distinct from the string hash `H32` of §13.6) folds the words, the tag being an index into a fixed render-tag
   table, through MurmurHash3's 32-bit finaliser. It never reads the interned handle, which is session-local and changes
   with interning order across reloads and derivation orders. The entity key is a pure function of model data — the
   seed and the lineage (§6.2's leaf) — so it is the same in every session, derivation order and host, and an unchanged
   model renders pixel-identically after a reload (§6.2) and the golden PNGs hold (§13.3). Where a render rule orders entities (the tint colouring, §8.2) it uses address order
   (§6.3), which is stable too. A Regenerate (keep settings) re-mints the same lineage and so the same look; New random
   gives a successor a fresh lineage (§6.3) and so a fresh look — it is a new building under the old address. Another
   seed changes every entity key, so two towns whose derivation trees coincide in part — the same lineage at the same
   derivation position, which the lineage alone cannot tell apart because it descends from the fixed town lineage
   (§6.1) — draw different tile variants, jitters, species, crowns and colours (VD2-6); Enter's seed + 1 does the same.
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark for each attribute column the slice carries,
   the label and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns,
   ≈ 2.4 MB of attribute columns, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB. The
   tile worker holds the only full copy; after each transfer the generation worker keeps just the columns `update()`
   reads (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) (§8.9, §12.8). An SVG export builds a transient
   list of its own in the generation worker and releases it after writing (§11.1, §12.8; NR-5).

Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread
≈ 140 ms to deserialise (redteam-scale §7.3) while typed arrays transfer in constant time and slice cheaply into deltas;
chose world-aligned tile rasters over per-district rasters because district boundaries are streets (GEO-28) and a
district bitmap cannot follow continuous zoom (SCL-7). Chose the entity key's low 64 bits as the one render-time key
over the bare lineage hash, the address and the interned handle: over the lineage hash because it contains no seed, so
every town would repeat the same looks at the same derivation positions (VD2-6), while the entity key is the key every
stream of the entity is drawn from (§6.1), so the entity's render-time and model draws change together; over the
address because a New random that re-rolls a building's shape must also re-roll its look, where the address would
keep a re-rolled building's old colour; and over the interned handle because handles are session-local (NF-D10).
Chose 64 of the entity key's 128 bits because `RH32` folds 32-bit words and two words make an accidental repeat
between two entities of one town negligible (≈ 3 × 10⁻¹⁰ per 10⁵ entities, §6.1) at 8 B per mark. Chose a slot-major order with passes inside each slot over the
pass-major order ("every fill, then every casing, then every body") because pass-major drew every road casing over the
masses, fields, woods and shadows, against the slot table's own reasons (N-7), while slot-major keeps GEO-28's guarantee
through the separate casing and body slots.


=== REPLACE 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

A style sheet maps (semantic, attribute predicates, band) to **paint programs**, over a palette of **roles** and a
**symbolisation table** (the `Role` type is declared in `@plat/model`, §14, so `@plat/labels` and `@plat/render` share
it without either importing the other's code):

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
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass (NR-3)
  derived?: 'raised'|'shadow';      // instead of the matched marks' own draws: the per-tile raised under-copy or projected-shadow union over them (§8.4)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
```

**Roles.** `paper` (margin and background), `road` (way bodies, squares, bridges — equal to `paper` in the ink family,
so streets are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed
in-block courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`,
`verge`, `water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`,
`sand`, `plank`, `grid`, `snow`, `lights`. A role never changes meaning across the bands or the presets of one family.
The reference schemas (MFCG 13 keys, NG 26, VG 40) map onto this set without loss.

**Contrast matrix (replaces the luminance rule; O12 f).** Pairs that must separate wherever both roles are drawn — the
city band unless the row says otherwise — with floors on CIEDE2000 and on the lightness difference:

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

Checked (1) on every palette when it is loaded — built-in, user-edited or random — and (2) on rendered city-band images
in B-ZOOM: the mean CIELAB of the pixels whose top mark has each role (read from the pick buffer), for every pair
present in the view. A user edit that fails is shown with the failing pair and kept only with an explicit "accept low
contrast" flag recorded in the report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water
(0.0); both are recorded as reference weaknesses not to copy (VIS-2).

**Random styles and their bounded repair (N-26).** *Random style* draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 18] in `ink` and [0, 30] otherwise, and any hue, keeping `road` = `paper` where the family
ties them; the draw comes from the `style.random` stream (§6.1) with the `setStyle` event's `seq` as its creation index
and the attempt (0–2) as its attempt component — a style-time draw whose result is written into the event as row
operations, so a replay never re-draws it. A
failing draw is **repaired in bounded steps**: take the first failing pair in the matrix's row order; raise its lighter
role's L* by 1 (up to 97), or, when that role is already at 97, lower its darker role's L* by 1 (down to 3); re-check
every pair; stop when all pass or after 100 steps; a repaired palette must still pass after conversion to sRGB. A draw
that fails its repair is redrawn on the next attempt; after three failed attempts the family's shipped palette is used
and the report says so. The loop ends by construction (≤ 300 steps), where the old rule — raise the lighter role until
every pair passes — could cycle (raising `ground` for ground / building lowers road / ground) or never end (a darker
role above L* 50 against a ΔL* 50 floor). Measured on 2 000 seeded draws per family with every row of the matrix
(`docs/validation/bench/fixall_rendering_r2_palette.out`): 4–18 % pass as drawn, 77–83 % after the first repair (median
5–17 steps), 99.1–99.6 % within three attempts; the shipped-palette fallback fires for 0.4–0.9 %. **Confirmation (M3b,
where random styles ship with O12's extras):** the shipped-palette fallback ≤ 2 % of 10 000 draws per family;
pre-decided fallback: the L* window narrows from ± 12 to ± 8 and the run repeats. Chose a bounded repair with redraws
and a shipped-palette floor over the unbounded raise because O12 (f) asks that every presented style meet the floors
and only a bounded procedure can promise an answer.

**Role values (our own; PLAT 2026-09-25, retuned by fix-all round 2; calibratable table rows).** Every pair of the matrix,
the outline rows included, was computed on these sRGB values and passes its floor
(`docs/validation/bench/fixall_rendering_r2_palette.out`; e.g. `ink` road / ground 6.9 / 10.0, ground / building
16.1 / 21.1, tree / water 20.7, court / ground 4.2, ink / building 41.9 / 47.9 — `lit` ink / building 37.8 / 43.0,
`hatched` 34.5 / 40.6):

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

The ink family keeps its character by value steps: eight role colours at the city band — paper (= road), ground,
building, ink (= wall = label), water, green, tree and field; courts are drawn as `ground` at the city band (§8.5), and the
raised under-copy and shadows are the ink at an alpha, not further colours — and no role with CIELAB chroma above 18
(`field` is the highest at 17.3) (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose low-chroma value steps over
saturated hues for the default because the restraint clause asks for one ink and a few roles, and eight tones meet
every floor. Chose to draw walls in the ink itself and courts as `ground` at the city band over a ninth city-band tone
because the restraint clause names one ink and 4–8 roles, and at city zoom a court is enclosed by masses on every side,
where its small step from `ground` adds noise rather than information (N-25). Chose to darken `lit`'s and `hatched`'s
ink (L* 25 → 17 and 18 → 14) over lowering the outline floors because building outlines and text over masses need the
separation the `ink` family already has (N-3).

**Symbolisation table (VIS-1).** Drawn width in px = clamp(k × model width × px per metre, minPx, maxPx) in `model`
mode, or a fixed paper width at 1× (times the device pixel ratio) in `paper` mode; no length is written in any
reference's private unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (they carry model widths);
styled SVG and PNG carry drawn widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view
scale (MFCG size 40 at 0.816 px/m, 1.23 m/px): MFCG draws walls 7.6 m wide, towers 15.2 m across, road cores 8 m and
piers 4.8 m; its SVG writes the same numbers in its 4 m internal unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on the band thickness (2.5 m → 7.5 m), minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × the drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = the median footprint side in px at the zoom stop — outlines thin, then hold at one third (MFCG's Thin lines made a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north, drawn length clamped to [0.3 px, 2.5 px] | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ of the building outline weight, never filled, gaps at gates | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints (the order below) and the wall symbol is clipped on its inner side to the band's
inner edge minus the setback, so the exaggerated symbol overhangs only outward (over the ditch or glacis) and never
covers a plot.

**Paint programs (the vocabulary).** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at
`w + 2h` in the casing pass, body at `w` in the body pass — MFCG's most reusable trick); `bands(N, W, exponent, ramp)`
(VG's water law); `raised(offset)` (the constant-offset under-copy); `shadowPass(mode, colour, alpha, penumbraPx)`
(projected shadows, §8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction, dark = lit × lerp(ambience,
shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`; `pattern(texture, tintRole, metresPerTile)`
(tinted seamless textures); `faceLight(dir)` (a per-face tone from the face normal and the light: roof faces from the
skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from a field raster: water depth, terrain
colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals of the terrain field, water faces
masked, strength from the `shadow` role's alpha, multiply-composited after fills and way bodies and before buildings
and trees — VG's recipe without a blur); `contourMarks(levels, mode: contour | hachure | grass)`; `foam(widthM, alpha)`
(from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and `quay`);
`feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground — no bitmap blur; COV-FTG-I05);
`outlineMix(factor)`; `tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette`;
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple — the hook for the owner-staged
ruined state, with the `none` roof kind, §2.6), beside two tone overrides keyed by the decline states of §2.8:
`existence = abandoned` (the roof tone lerped 30 % toward `ground`, no raised under-copy) and `existence = decayed` (the
outline dashed, the fill at 60 % alpha); `symbol(glyph)` (point symbols for the whole pin vocabulary of §2.7: tent, stall,
well, fountain, large tree, cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire,
fire pit, lamp post). Lane ends: a lane's body and casing end square at the kerb of the way it meets; the junction wedge
belongs to the higher-class way (the renderer half of GEO-21). Hairlines and casings are in paper px; ribbons and
symbols follow the symbolisation table — MFCG's two coordinate spaces, now stated.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` mark by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line (`contourMarks`); `hillshade` runs on the same field. VG-specific looks (its
spotlight vignette and dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list; an individual mark (a building, a roof, a tree, a stall) takes
index `RH32(role, key, salt[, instance ordinal], style id) mod n` over the mark's render key (§8.1 item 5; VD2-6); aggregate fills (block ground, city-band masses,
wood fills) take index 0. Deterministic, so two renders of one model are pixel-identical (§6.2).

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) (hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°); method `spectrum`
(hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength 0–1;
applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3); recomputed when the palette changes; off in
`ink` by default. `weathering`: each roof's RGB scaled by 1 + u·w, u ∈ [−1, 1] from `RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06
(hatched), 0.08 (lit).

**Materials, season, weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. The view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow}; they select override rows: autumn and winter re-skin deciduous crowns (by the instance's
`leafType`, deciduous when absent) through role variants (`tree@autumn`; winter uses a bare-crown symbol); snow lays the
`snow` role over ground, fields and roofs while `road` keeps its value, so streets stay legible; overcast turns the
projected shadow pass off (the raised under-copy stays). Nothing in the model changes and the model hash is untouched.

**Post operations (K07).** `post` lists operations applied once per tile after its marks: `greyscale`, `sepia`,
`tint(colour, strength)`, `vignette` (on the view), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`,
`scanline(periodPx, alpha)`, `crosshatchNoise(periodPx, alpha)`; Canvas2D on the tile's pixels in the tile worker
(≈ 1–2 ms per 512² tile); PNG export applies the same operations per tile; SVG carries greyscale, sepia and tint as
colour-matrix filters and omits the pixel operations, which the export report lists. This replaces the "WebGL2 post
hooks" pointer.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; marks(view: ViewState, model: ModelView, region: Box): MarkTable }`
adds display-list groups that are view data (never in the model hash). Providers run in the **generation worker**, which
holds the model: it calls a provider when the view state it reads, the model or the visible region (dilated by one
tile) changes, and delivers the marks as a `DisplayDelta` of group `live.<id>` (§8.9). An `overlay` provider's marks are
drawn in the tile worker's composition step with the labels (§8.8), so a selection or a moving person re-composes tiles
without re-rastering them; a `base` provider (a thematic recolouring) is part of the tile key (§8.8). Shipped:
`live.selection` (overlay), `live.favourites` (base: favourite buildings as a thematic override keyed by the view
state's `favourites`) and, registered by the simulation module, `live.people` (overlay: favourite persons' positions
from the module's occupancy at the view-state hour, one categorical colour per person).

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code.

**Layer order (data; `ink` shown; the same list serves the city and district bands).** Each slot names its reason and
the reference step it matches; MFCG's recorded order (water → road casing → road body → river → landmarks → wards →
piers → fields → walls → towers → grid → scale bar → compass → labels → title) is a subsequence (order parity, §8.3):

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
| 10 | projected shadows (off by default; `derived: 'shadow'` over the casters) | new: shadows after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over the footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail | MFCG: wards |
| 14 | piers and bridges | MFCG: piers |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's recorded tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: yard walls and fences over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

NG's recorded order (greens → roads → shadows → buildings → props → trees depth-sorted → title) is the `hatched`
sheet's, again a subsequence of its slots. The order is **slot-major across the whole scene**, with casings before
bodies inside each slot (§8.1 item 3); "every casing before any body" holds for ways because their casings (slot 5) and
bodies (slot 6) are separate slots, and a bridge or pier (slot 14) is cased along its sides only — its ends are open
where it meets its way — so no later casing crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot
25's world-space live marks and annotations are composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and
the measure overlay are screen-space furniture drawn by the main thread over the composed tiles (§9.5). The census
checks that every tile's draw calls follow this table (§8.3).

**Slot resolution (NR-3).** When a sheet is loaded — built-in, user-edited, random or host-supplied — the loader takes,
per band, every (semantic, pass) pair that the entity registry declares S14 emits at that band and that the sheet
paints (binds a program to), and resolves it against the band's entries without `derived`: the candidates are the
entries whose pattern matches the semantic (equal to it, or a prefix `x.*` with the semantic under `x.`) and whose
`passes` include the pass or are absent; the winner is the most specific — an exact semantic before any prefix, a
longer prefix before a shorter. The sheet is **refused** when a pair has no candidate, when two candidates tie at the
highest specificity, or when one `derived` kind is placed in two slots of a band. The result is §8.1 item 3's table
from (semantic index, pass) to slot, cached per style version. The shipped sheets place `way.*` pass 1 in slot 5 and
pass 2 in slot 6, while the pier and bridge-deck semantics have exact entries in slot 14 that outrank the prefix, and a
river's casing and body share slot 7 through one entry with no `passes`; a CI test loads every shipped sheet at every
band (§8.3). A refused user edit is shown in the style dialog with each unresolved or ambiguous pair and is not
applied, and a `setStyle` event carrying a refused sheet fails its dry run with the conflict action `invalid` (§7.1),
so no document holds a sheet whose order two loaders could read differently. Chose explicit passes with
most-specific-wins over one slot per semantic, because a way's casing and body must sit in different slots (N-7)
while a river's share one, and over an order fixed in code, because sheets are data (G-R2) and must say where every
casing goes. Chose to place the raised under-copy and the projected shadows as `derived` per-tile operations over
the caster marks over emitting marks of their own, because they are unions computed per tile from the casters'
geometry and heights (§8.4), so extra marks would add a row per caster to the list for no information.

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured; added detail cross-fades over the band's hysteresis interval (α 0 → 1 across it); B-ZOOM checks role
continuity (mean roof and mean ground colour ΔE2000 < 2 across every band switch within a family) from the milestone
that ships the family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4,
§16; N-23).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06; the projected pass stays off), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | an ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in the ink role at α 0.5 on the roof colour, prism shadows at ink α 0.25 when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled | wings and rooms as ink outlines |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft projected shadows when on, hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role; monochrome; `lights` role with glow instances | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2's ruling — the default label face is IM FELL Great Primer in every family; small caps and old-style
figures come from the font's own substitution tables, or from the family's small-caps cut and lining figures when a
face lacks them (§9.2, N-12).

**`lit` on the reference backend (VIS-7).** Every `lit` program runs on Canvas2D: textures are `pattern` fills of
greyscale seamless tiles tinted by the role colour (multiply); lighting is `faceLight` per face from stored geometry,
one directional light from the sheet's sun; soft shadows are `shadowPass` polygons with `penumbraPx`: the shadow polygon
plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓ — vector, no bitmap filter, so Fantasy Manor's ≈ 90 %
bitmap-shadow cost is avoided; canopy shading is baked into the crown sprites once per session per light direction; the
water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512² tile). The one
thing not drawn is per-pixel normal-map relief on roofs and walls; `lit` uses per-face tones plus texture instead, and
the style dialog says so. **Texture set** (our own, procedural: generated by `plat/tools/textures/`, inside the product
repository (§17.1 (3)), with fixed seeds; every file in `plat/assets/textures/` names that script and its seed (§17.1
(5)); no third-party texture; NF-S11): tilled soil, grain, pasture, meadow, orchard ground, marsh, sand, pebble,
rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment — 15 greyscale 256 × 256 px
toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and livestock variants of the
arable and pasture tiles are chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27) and by the land-use kind
otherwise; authored in M2b (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.

**Style constraints.** The contrast matrix above; the option-interaction matrix test (no option silently disables
another — MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).


=== REPLACE 8.3 Symbol catalogue and draw-style census ===

### 8.3 Symbol catalogue and draw-style census

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (20 per
class per style, §8.10); clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer;
tinted pattern textures with per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph
text with a role halo; point symbols for the whole pin vocabulary of §2.7 (tent, stall, well, fountain, large tree,
cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire, fire pit, lamp post);
screen-space furniture (§9.5). Every semantic visible at a band has exactly one registry glyph, from which
the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). Order parity is defined, not assumed: *the reference's recorded order is a subsequence of the preset's order,
and every semantic the reference never drew sits at a declared slot with a reason* (§8.2's `OrderSlot`s) (VIS-16).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots, as defined above |
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the style's slot table, then in pass, in every tile |
| slot resolution: every (semantic, pass) pair the entity registry emits at a band and the sheet paints, resolved by §8.2's rule (NR-3) | every shipped sheet at every band in CI; every sheet at load | 0 unresolved, 0 ambiguous; each `derived` kind in one slot per band |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (ΔE2000 ≥ 40, ΔL* ≥ 50), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | mean roof and ground ΔE2000 < 2 |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and jittered `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer band's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders (NF-D10) | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes (VD2-6) | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, spacing, tile index) tile — its points' centimetre coordinates and ranks in point-index order — built in the generation worker and in the tile worker (NR-6) | all | equal in both workers on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit) and equal to the stored value; a moved stored value is a view shift (§13.3) |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | hatch triangles 15–20; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |


=== REPLACE 8.9 Backends, text, threads and the worker boundary ===

### 8.9 Backends, text, threads and the worker boundary

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and their variants), running
  on an `OffscreenCanvas` in the tile worker; programs render typed-array paths, one `Path2D` per (program, semantic,
  variant) per tile, sprites by `drawImage`.
* **SVG** is written from the same display list (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor** that uploads the composed
  Canvas2D tiles as textures, composites them with the view transform and runs the post operations as one fragment pass
  — so there is no stroke tessellation, no SDF text and no look that differs by backend (VIS-7). Measurement at M2b: pan
  and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the
  WebGL2 compositor is enabled for a hardware tier only if the Canvas2D compositor misses ≥ 60 fps (reference) or
  ≥ 30 fps (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  is drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's own
  glyph outlines by default, or as text in the embedded face on request (§11.1, N-13). Chose Canvas2D glyphs composed
  onto the tiles over SDF text because, once tiles are composited, text never needs to be drawn by the GPU, and one text
  path keeps text identical on every output. Measurement at M1: a tile's label composition ≤ 3 ms at ≤ 150 glyph runs;
  pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands — the district, neighbourhood
  and building bands of the districts a band request names (`DisplayListBuilder.build(model, band, groups)`) —, writes
  every export (§11.1: SVG from a transient list it builds and releases, raster formats through the tile worker; NR-5),
  answers the API's `hit` and `inView` queries (§11.2) from the model and the 24-B index it keeps (the entity, bbox and
  group columns — all a hit test or a features-in-view list reads), and hands stage-3 `compose()` and close-up
  derivation (§8.6) to the derivation pool. (2) The **derivation pool** — up to three
  workers — runs the per-district stages at every rung (§12.3; the merge protocol of §4.1) and, on request, `compose()`
  and close-up derivation from the committed state of the district it is handed; with the pool off the generation worker
  runs them itself. (3) The **tile worker holds no model**: it holds the display list with its label, instance and
  string tables — the only full copy (§8.1 item 6) — and from them rasters base layers, runs label placement (S13b,
  §9.2) and decoration instancing (§8.10), composes labels and `overlay` live marks onto each tile (§8.8) and runs the
  post operations; it answers the main thread's furniture and snap queries and the generation worker's raster-export
  requests; everything it needs arrives through the table below. (4) The **main thread** runs the UI, compositing
  of the transferred tiles, pointer hit-testing on the hit-test slices, screen-space furniture (§9.5) — whose placement
  scores and ruler snaps it asks of the tile worker (below) — and input. Nothing model-sized ever reaches the
  main thread.
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the rows of the label, instance and string tables they change (candidates, priority, parent node, pinned placement and `hidden` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: the generation worker copies each slice into a fresh buffer and transfers it, and keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 96 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (it needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks, and the buildings needing `compose()` at the building band | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | the answers: on-demand band marks, `compose()` wings and rooms, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model or the visible region changes | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id (NR-4) | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none (NR-4) | copied | ≤ 4 KB per answer, within one 16.7 ms frame (below) |
  | generation → tile worker | raster-export requests — PNG, print and the `.dd2vtt` scene image: frame, scale, band, layers, post operations and the export's zoom stop (§8.7; NR-5) | copied | ≤ 4 KB per request |
  | tile worker → generation | the encoded raster: PNG bytes, streamed band by band (§8.8) | transferred | the file's size |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Queries to the tile worker (NR-4).** Compass, title and legend placement (§9.5) and the ruler's snapping read the
  display list, which only the tile worker holds, so the main thread asks for them through the query rows above and the
  tile worker answers with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses
  (§14). A query goes ahead of queued raster work. A tile raster that has run for 8 ms is cut after the draw call in
  progress (a batched path of ≤ 80 per tile, §12.5) and resumes after the worker has served its message queue (one
  `MessageChannel` round), so a query waits ≤ 8 ms plus that call and runs in ≤ 4 ms of tile-worker time: its answer
  arrives within one 16.7 ms frame. Most tiles are one slice
  (a city-band tile of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight — a
  newer pointer position replaces a queued one — and shows the unsnapped point until the answer arrives; furniture
  placement is asked when the view settles, and the furniture keeps its previous place until its answer arrives.
  **Measurement** with the first map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: the query round
  trip p95 ≤ 16 ms during a settle raster, and ≤ 4 ms of tile-worker time per query. **Pre-decided fallback:** the slice
  limit falls from 8 ms to 4 ms. Chose queries answered in the tile worker over copying the marks' kinds and vertices
  into the main thread's hit-test slices, because the slices would then carry model-sized geometry to the main thread
  (N-4, SCL-6), and over placing furniture in the generation worker, because its 24-B index has no kinds, vertices or
  placed labels.
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).


=== REPLACE 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (a wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting or scatter class) has one set of positions, in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's parameters — offset, rotation, spacing — from the entity's
  `render.instances` stream (§6.1) in the generation worker and carries them in the mark's `InstanceTable` row (§8.1).
* **Tiles.** Per (class, spacing): four toroidal blue-noise tiles of 64 × 64 m, built once per session by Bridson
  sampling (k = 50 candidates, all evaluated — the reference variant, now paid once per session instead of per tree),
  each point carrying a **progressive rank** (void-and-cluster order: every prefix of the ranked list is itself evenly
  spread); the tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1 item 5), which breaks
  visible repetition.
* **One construction everywhere (NR-6).** A tile is a pure function of (class, spacing, tile index), so the tile
  worker (which draws), the generation worker (which resolves overrides and writes exports) and every later session
  and host build the same points with the same ordinals. Its random source is `rng.stream` (§6.1, §14) with a
  **constant entity key** — §6.1's four-lane finaliser over the words (a fixed stamp-tile domain constant, the decoration
  class's registry index, the spacing in centimetres, the tile index 0–3 as the creation index) —, the stage
  `STAGE_VIEW`, the non-rerollable concern `render.stampTiles` (§6.1's registry) and reroll, attempt, epoch and salt 0.
  Every accepted point is rounded at once to integer centimetres inside the 6 400-cm tile, so the spacing test is an
  exact integer comparison of squared toroidal distances with r² (r = the spacing). The first point is
  (`int(0, 6 399)`, `int(0, 6 399)`); the active point is `int(0, n − 1)` over the active list in insertion order, a
  retired point being replaced by the list's last; each candidate lies at a radius r × (1 + `float01`) along the angle
  2π × `float01`, whose cosine and sine come from `dmath` (§6.5), and candidates are tried in draw order. The ranking
  sums each point's Gaussian energy over the others in point-index order with `dmath.exp`, and breaks equal energies
  by the lower point index; a square root, where one is needed, is `Math.sqrt`, exact by specification (§6.5 (2)). The
  builder is `@plat/kernel`'s `poisson` module (§14), held to §6.5's allowlist lint like every model package. The
  crown library's shapes (below) use `dmath` the same way, so only their rasterisation into sprites is engine-specific.
  The census (§8.3) hashes every tile in both workers on the five engines and against a stored value; a change of the
  tiles moves every wood and is recorded as a view shift, like a placement-digest move (§13.3). Chose a constant key
  over the seed or the document because the tiles are a library shared by every document of a session — the
  per-town variety comes from the stamp's offset and rotation, drawn from the entity's `render.instances` stream, and
  from the seed-dependent tile variant — and a seed-keyed library would be rebuilt per document for no visible gain.
* **Stamp.** Offset in [0, 64 m)² and rotation from the row; the cells (u, v) of the rotated lattice covering the
  entity's face; point p of cell (u, v) survives if it lies in the face (point-in-polygon with holes) and, for woods,
  passes the edge test of a domain-warped density evaluated once per point in world metres. **Ordinal** = (u, v, p):
  stable — editing the face's boundary changes only which edge points survive, never the interior's ordinals or
  positions.
* **Grid and line.** A `grid` places one point per cell (u, v) of the rotated lattice at the row's spacing, jittered by
  ± 15 % of the spacing in x and y from two `RH32` draws over (key, salt, u, v) (tags `grid.jitter.x` and `grid.jitter.y`),
  kept if it lies in the face; ordinal = (u, v). A `line` places point i at arc length (i + ½) × spacing from the line's
  start end — the end whose junction address sorts first (for an `along` row, the end at its way's first junction) —
  jittered along and across the line the same way; ordinal = i. Park paths are L3 `path` faces drawn by the path
  program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank
  ÷ its tile's point count; a `grid` point's r = the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² — the
  two-dimensional van der Corput order, every prefix of which is evenly spread over the lattice; a `line` point's r = the
  bit-reversal of i ÷ 2³² — the van der Corput sequence along the line. Band b draws the instances with r < s_b (city:
  none — the wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of
  the finer one for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep
  (LC-20, VIS-5); the census covers all three layouts (§8.3).
* **Per-instance look, keyed by (key, ordinal).** The instance's species, drawn by its share from the entity's
  `Greenery.species` mix (inner or outer share by the point's distance from the edge), picks the crown class; the crown
  index into the style's **crown library** (20 crowns per class per style, built once per session from `rng.stream`
  keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern `style.crowns` with its salt, and the
  class and the index i as the creation index — §6.1's structured components; the path form is a report rendering,
  §14 — drawn as sprites), colour jitter, scale jitter ± 15 %, and `leafType` (from the
  species when present, deciduous otherwise) are `RH32` draws over (the entity's render `key` — the low 64 bits of its entity key, which mixes in the
  seed (§8.1 item 5; VD2-6) —, ordinal, the concern's salt). Hatch phase and roof detail are keyed by the entity's `key`. Nothing is keyed by band or by the
  session's interned handle.
* **Edits (LC-20, NF-D11).** `{ t: 'instance', entity, ordinal | point, op: 'add'|'move'|'remove'|'restyle', to?, style? }`
  events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move` replaces its position, `add` appends
  a user ordinal `u<n>` at `point`, `restyle` sets its `InstanceStyle`. For an ordinal-addressed event the dry run also
  records the instance's generated position in `point`. **Resolution** runs in the generation worker whenever a commit
  touches an entity that carries overrides (it re-runs this section's function for that entity only): an override
  **applies by ordinal** when the entity's lineage is unchanged since the event — no `carry` lifecycle event and no
  supersession of the entity is recorded after the event's `seq` (§6.3) — **and** that ordinal's generated position
  lies within 0.5 × the spacing of the recorded `point`; otherwise — a carried successor with a fresh lineage, a
  superseded entity (its overrides move to the `supersededBy` successor), or an ordinal that moved (a line edited at its
  start end) — it **re-matches by position** to the nearest generated instance within 0.5 × the spacing of `point` that
  no other override has claimed (candidates in (distance, ordinal) order, overrides in log order), and else is kept
  **orphaned** and reported. An `add` stays while its point lies in the entity's face (or within 0.5 × the spacing of its
  line) and is orphaned otherwise. The resolved overrides — ordinal, op, position, style and state (`byOrdinal`,
  `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows (§8.1, §8.9). A tree brush
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and
  memoised per (key, revision, style version) for the session; they are never written to the document except as
  overrides. The generation worker runs the same function, on the same stamp tiles (NR-6), for entities that carry overrides (to
  resolve them) and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest band with the overrides applied and write each
  instance's position, species, crown diameter and leaf type (§11.1; VN-158, XB32); the bench computes tree statistics
  from it (SCL-21).
* **Budgets.** Placement ≤ 1 µs per instance (stamp plus point-in-polygon), drawing ≤ 2 µs per instance as a sprite
  (§12.7).

Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10).


=== REPLACE 9.5 Furniture, framing and tools ===

### 9.5 Furniture, framing and tools

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); earlier revisions fixall/draft-rendering-r1, fixall/integrate-r2

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); accurate to 0.5 % at every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town: its stream is keyed
  from the town root's entity key (§6.1, §14 `TOWN_ROOT` — the seed key alone) with the concern `style.compass` and that
  concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws
  the same compass (NF-D12). Auto-placement: candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. The covers are
  computed where the display list is — in the tile worker, by `ObstacleSource.coverage` for each candidate box — and
  reach the main thread through §8.9's furniture query (NR-4). Dragging places
  it and the wheel rotates it; both are view state (§11.3) and pin the compass. Its view key `compass` is `trueNorth`
  (default: the needle points at model north, whatever the view's rotation) or `free`; the map's own rotation is the
  `rotation` view key about the frame centre (§2.9, §7.1: MFCG's Rotate as a view rotation, never a model change).
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT 1.5 m / 5 ft); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** in the emptiest corner (NG's rule: the corner whose box covers the least mark area, the sum of its
  `coverage` record from the same furniture query); movable.
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem; border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d). Position, mode and border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a minimal
  generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or ordinaries
  (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge (roundel,
  lozenge, mullet), keyed from the town root's entity key with the concern `naming.emblem` and its salt (rerolled by
  `rerollLayer('naming.emblem')`; NF-D12); off by default; drawn in the legend or a corner. Chose a minimal own
  generator plus import over import only because the legend should be able to carry an emblem with one click (MFCG
  fetches one from a third-party service), at a fraction of a person-week; chose it over a full blazon engine because
  heraldic depth is not a map-parity item.
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode for a
  polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list index
  (8 px radius) — `RoleIndex.snap` in the tile worker, reached by §8.9's snap query and answered within one frame, the
  unsnapped point being shown until the answer arrives (NR-4); exact in world centimetres; a measurement is view data and can be saved as an annotation.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI scale;
  device pixels are handled by the tiles.


=== REPLACE 11.1 Formats ===

### 11.1 Formats

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round trip byte-identical | the canonical form; import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and bridges as typed features; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (the §8.10 function at the finest band, overrides applied) with `species[]` (the §8.10 draw: the species kind of each instance), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below; NR-5) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13) by default as **outlines** — each glyph used is written once in `<defs>` as a path from the bundled face's own `glyf` outlines (quadratic segments as SVG `Q`), and each placed glyph is a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with the option `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | budgets at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for 837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) — and ≤ 60 000 elements; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | the band-streamed tile assembly of §8.8 at any DPI; transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer (underground / ground / sky) with its elevation | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with the attributes `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Bridge`, `TINRelief` (terrain); no `referenceSystem` (a local metric CRS); when the export has a geo anchor it is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5, NR-7) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format; `&doc=` references resolve through the `DocResolver` of §11.5 | one line for unedited towns; refused, with the `.plat` file or `&doc=` offered, when the town needs a non-shipped setting pack, host content or a non-shipped style sheet (§6.4) |

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never
mistaken for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator
easting and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted
to WGS84 latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with
`dmath` so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member
`plat` records the anchor, whether
it is the default, the document id and the output version. The **metric** variant — offered "by prior arrangement"
(RFC 7946 §4) for tools that want the model's own metres — writes x east and y north in metres from the settlement
centre with 2 decimals (the centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar
`<name>.metric.json` giving the origin, the unit, the axes, the document id and the anchor if one is set. Chose a strict
WGS84 default with a documented default anchor over the local metric CRS with a `crs` member because the latter cannot
pass an RFC 7946 validator and would be read by GIS tools as degrees, placing the town at meaningless coordinates; the
metric file keeps the lossless path for tools that agree to it.

**SVG text (N-13).** The export dialog offers `text: 'outlines'` (the default) or `'embedded'`. Outlines are read from
the same bundled face the labels were measured with (§9.2), so every consumer draws the glyphs S13b placed; the
embedded face travels unmodified inside the file (OFL-permitted; no subsetting, §17.2) for users who want editable text.
Chose outlines as the default over embedded text because only outlines draw the same glyphs in every consumer — an
embedded `@font-face` is honoured by browsers but not reliably by desktop editors (PLAUSIBLE; CI renders each variant
in the consumer it targets, §11.1's SVG row), and a substituted face at our per-glyph positions changes widths and can
collide — which is what "text identical on every output" (§8.9) requires.

**Where exports run (NR-5).** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9).
*Model formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks —
read the model and §8.10's instance function (`Exporter.write(doc, null, opts)`). *SVG* needs a display list and label
placement at the export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's
list (§8.1 item 6): the SVG exporter builds a **transient list** for the export's band and frame with
`DisplayListBuilder.build(model, band)` (≈ 4 µs per building at the city band: ≈ 21 ms at CITY, ≈ 54 ms at the
METROPOLIS target), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s `ObstacleSource`
and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible region of §9.2's
scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement digests test the
code both run — writes the
file, and releases the list. The whole is inside §12.7's ≤ 2 s, and the list is §12.8's export-time peak (≈ 1.9 KB per
building at the city band). A district-band SVG's list is counted in the size estimate shown before writing. *Raster
formats* — PNG, print and the `.dd2vtt` scene image — are rastered by the tile worker from its own list by §8.8's
band-streamed assembly: a raster-export request crosses to it and the encoded bytes come back (§8.9), and the
generation worker wraps the VTT scene around the image. Chose a transient list in the generation worker over handing
SVG to the tile worker because the SVG writer also reads the document (addresses, the supersedes table, layer and
entity metadata), which the tile worker never holds (N-4), and over keeping a second full list resident because
exports are occasional and the list is rebuilt in tens of milliseconds.

**The CityJSON extension (NR-7).** By the CityJSON 2.0 convention a root property outside the core schema is named
with a leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects
an undeclared one was not executed here (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes
the schema beside the package; a file without an anchor — the default — has neither the property nor the member and
is plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check
fetches anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with
the extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside
`<name>.city.json` — the three numbers, the document id and the output version, checked against its own JSON schema
like the metric GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says
so. Chose a declared extension over a sidecar as the primary because it keeps the anchor inside the one file a GIS
user moves around, and the sidecar as the fallback because it leaves the CityJSON file valid by construction.

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 100 px per 1.5 m square, so ≈ 123 m); a larger
  scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) — the export
  dialog shows the choice before writing.
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at building entrances (1.2 m openings) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer, its elevation in the file name and in a `plat` extension object; coordinates
  exact to the grid (O11 g).
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

Chose to build CityJSON over leaving it deferred (D-8) because its integer-vertex-plus-transform encoding carries our
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3b), and it gives GIS users a standard
3-D city path that GeoJSON cannot.


=== REPLACE §12 Performance budgets — the section heading and its *In plain words* paragraph (the text before 12.1) ===

## §12 Performance budgets

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

*In plain words.* A town appears in under a quarter of a second, a city in under half a second up to about 25 000
people and in under 0.6 s at 30 000, and a metropolis of up to about 48 000 people in about a second — the bar MFCG
sets for itself and FTG misses by several seconds. Because a bigger town has more buildings, each size gets a rule
rather than a single number: a fixed part plus a cost per building. Under that rule every town and every city appears
within one second, and so does a metropolis of up to about 48 000 people; the largest metropolises, up to 120 000
people, take up to about 2.3 seconds. The same is true of building the town before it is drawn: the improvement
plan's targets — a tenth of a second for a town, three tenths for a city, one second for a metropolis — are met up to
about 4 500, 17 700 and 59 000 people, and the largest towns, cities and metropolises take up to about 0.2, 0.5 and
1.9 seconds; no single town may take more than a quarter longer than its size's rule. Both misses are stated here for
the owner to veto rather than hidden behind a half-finished picture or a thinner town. Every step has its own budget,
with the method that makes the budget possible named beside it, measured on one named machine so the numbers can be
checked. Compared with MFCG drawing the same number of buildings, PLAT takes about twice as long for towns and cities
and about five times as long for a metropolis, because it builds what MFCG does not — real terrain and rivers, plots
with yards, a plan for every plot, a roster of trades placed by rule, greenery and non-colliding labels. That trade is
stated here so the owner can veto it too.

=== REPLACE 12.3 Model budgets on the one-click path ===

### 12.3 Model budgets on the one-click path

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

The primary configuration is one generation worker plus a **derivation pool** of up to three workers for the
per-district stages (S10 plots, S10b placement, S11 site plans, per-district greenery) — and the hinterland unit, which
runs the same stages on the generation worker concurrently (§4.1) — which run after the eager S10a allocation (LC-2) as
pure functions of eager upstream state and their district's own sub-stream, merged in district lineage order (§4.1,
§6.3; never address order, which a carried district does not share with its lineage — NF-D13, NF-P12). The
single-worker column is the pre-decided fallback: on the low tier, in hosts that forbid extra workers, and everywhere if
the pool fails its M1 measurement.

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 75 / 100 ms | 74 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 251 / 300 ms | 57 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 600 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95; used for every size inside a band, and fitted by the cost-model tests, §13.2): with the
pool, TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at
the 35 000-building cap: ≤ 1.9 s). Single-worker, through the fallback column's p95 at the same building counts: TOWN
≤ 20 ms + 71 µs × buildings; CITY ≤ 40 ms + 69 µs; METROPOLIS ≤ 100 ms + 67 µs. The table's rows are these laws at
1 333, 5 200 and 13 460 buildings; §12.5 adds the first frame to them.

**Where O3 (d)'s bars hold, and the declared miss (NR-1).** `docs/IMPROVEMENTS.md` O3 (d) asks for model time "p50 /
p95 / max per size class within budget" at TOWN ≤ 100 ms, CITY ≤ 300 ms and METROPOLIS ≤ 1 s. Size follows population
inside a rung (§1.1), so — as for the first map (§12.5, N-2) — the bars are read over every size a rung builds, never
at its target alone, and checked against the laws above. The **max clause**: no generation takes more than 1.25 × its
own law, T_i ≤ 1.25 × L(B_i) with B_i its building count. p50 has no law of its own; since p50 ≤ p95, the bar is claimed
for p50 wherever it holds for p95. Values (`docs/validation/bench/fixall_rendering_r3_budgets.out`):

| rung (O3 (d) bar) | p95 at the band bottom / the default request / the top | p95 bar holds up to | max bound at the top | max bar holds up to | single worker: p95 bar holds up to |
|---|---|---|---|---|---|
| TOWN (100 ms) | 46 ms / 92–110 ms / 196 ms | B ≤ 1 333 (≈ 4 500 people) | 246 ms | B ≤ 1 000 (≈ 3 400 people) | B ≤ 1 127 (≈ 3 800 people) |
| CITY (300 ms) | 187 ms / 265–340 ms / 481 ms | B ≤ 5 200 (≈ 17 700 people) | 601 ms | B ≤ 4 000 (≈ 13 600 people) | B ≤ 3 768 (≈ 12 800 people) |
| METROPOLIS (1 s) | 559 ms / 724–880 ms / 1 920 ms | B ≤ 17 300 (≈ 58 800 people) | 2 400 ms | B ≤ 13 460 (≈ 45 800 people) | B ≤ 13 433 (≈ 45 700 people) |

The band ends are §12.5's (440 → 2 940, 2 940 → 8 820 and 8 820 → 35 000 buildings); "the default request" is each
rung's target population over §12.2's building range, so the default TOWN request itself lands at 92–110 ms and the
default CITY request at 265–340 ms — the first table's 100 and 300 ms are the laws at 1 333 and 5 200 buildings.

**Declared for the owner's veto:** chose to keep every plot, site plan and building on the one-click model path at every
size (J-R7, J-I2; the owner's plot-model ruling) over holding O3 (d)'s bars across each band, so the bars are met for
p95 up to the sizes in the table and missed above them — by up to 96 ms at the TOWN band top (196 ms), 181 ms at the
CITY top (481 ms) and 0.92 s at the METROPOLIS cap (1.92 s) — and met for the max up to the smaller sizes of the fifth
column. The reason is §12.5's: the model's cost is linear in buildings at 50–60 µs each, while holding the bars at the
band tops would need a p95 of ≤ 27 µs (TOWN), ≤ 30 µs (CITY) and ≤ 26 µs (METROPOLIS) per building — MFCG's own range
(§12.9) — which only taking plot and site-plan detail off the one-click path could reach. Reversal cost: high as a
mechanism (the plot model leaves the one-click path, against the owner's ruling); nil as a reading — reading O3 (d) at
the targets alone, as D-18 did before, reports "met" with the same numbers and hides the miss. D-18 and §15.2's O3 (d)
row carry the same declaration.

**Measurement and fallback.** M1 runs CITY with the pool and with a single worker on B-CITY-lite; the pool stays primary
if its p95 at the target ≤ 300 ms and the model hashes are identical for pool sizes 0–3 on 200 seeds; otherwise the
single-worker column becomes the declared budget, the table above is restated from the single-worker laws and O3 (d)'s
CITY clause is reported as missed by the difference. The laws are confirmed by the cost-model sweeps (§13.2, §13.8:
every band's bottom, target and top, five seeds each) at M1 for TOWN and CITY and at M2b for METROPOLIS — pass: every
p95 within its law + 10 %. The max clause is checked on the nightly B-CITY run (1 000 seeds × 4 water settings per
rung, §13.8), each generation against its own law, at the same milestones — pass: max_i T_i ÷ L(B_i) ≤ 1.25.
**Pre-decided fallbacks:** a p95 miss re-declares the law at the measured p95 as a D-18 amendment for the owner's veto
(§12.5's path); a max miss re-declares the max clause at the measured maximum ratio (for example 1.4 × the law) as a
D-18 amendment, and this table's max columns are re-derived from it. Chose a max clause relative to each generation's
own law over one absolute maximum per rung because a generation's building count varies with its seed, so only a ratio
to its own law separates a slow generation from a large one.

=== REPLACE 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (§8.9).
* **Trees:** placement ≤ 1 µs and drawing ≤ 2 µs per instance. A district-band view with 10 000 visible trees composes in
  one 16 ms frame from cached tiles, and its tiles raster in ≤ 30 ms of tile-worker time (O19 e, restated); the 200 000
  trees of a METROPOLIS are never all instantiated — only visible tiles generate instances.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB
  per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face) (§11.1, N-13) — and ≤ 60 000
  elements, written in ≤ 2 s in the generation worker — the transient list's build (≈ 4 µs per building, ≈ 54 ms at the
  METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing, with the list released
  after it (§11.1; NR-5); Inkscape opens it within 120 s (§11.1).
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine, the peak canvas one tile band.
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at
  the city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths
  per (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a
  district-band SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time
  miss encodes the bands with zlib level 3 instead of 6 (the same pixels, a larger file).
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration
  re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7); `compose()` ≤ 1 ms per building median at
  `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one tile's
  compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.


=== REPLACE 12.8 Memory (what is counted, per rung) ===

### 12.8 Memory (what is counted, per rung)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately.

| rung | model working set, all threads, excluding canvases | canvas budget: need at the reference viewport; tier ceilings low / mid / high |
|---|---|---|
| TOWN | ≤ 40 MB | 3P + 7 MB = 112 MB at P = 35; 72 / 128 / 192 MB |
| CITY | ≤ 110 MB | the same (the canvas need depends on the viewport, not the rung) |
| METROPOLIS | ≤ 260 MB | the same |

**The tile worker holds no model (N-4).** It holds the display list — the only full copy, ≈ 10 MB at CITY with its
label, instance and string tables (§8.1 item 6) — the decoration memo and the placement memo; its glyph atlases and
crown sprites are canvases, counted in the canvas budget. The generation worker holds the model and keeps a
24-B-per-mark index of the display list (≈ 1.4 MB at CITY); the derivation pool holds its per-worker overlays (§4.1)
and the on-demand `compose()` and close-up caches (§8.6). These lines assume one kernel arena per layer (≈ 10 MB at
CITY, §2.2; PLAUSIBLE until M0) plus one frozen arena copy per pool worker (≈ 10 MB each at CITY, ≈ 25 MB at
METROPOLIS) and each district overlay until it merges (§3.3), the compact entity store and the scoped undo records of
§2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at ≈ 11.4 MB at CITY
across the two threads that hold any of it. The earlier "≈ 6 MB per thread that holds it" undercounted the fixed
columns — 46 B per mark, now 54 B with the render key (N-9 c; §8.1 item 5) — and assumed a full copy in both the generation worker
and the tile worker (≈ 12 MB); keeping one full copy brings the corrected display list back under that figure. The pool's
frozen arena copies (≈ 30 MB at CITY with three workers) are new in round 2 (§3.3); the lines are kept and stay
PLAUSIBLE until M1 measures them, with the pool-shrinking step below as their pre-decided fallback.

**Export-time peak (NR-5).** An SVG export holds a transient display list in the generation worker while it writes
(§11.1): ≈ 1.9 KB per building at the city band (§8.1 item 6's ≈ 10 MB for ≈ 5 200 buildings) — ≈ 2.6 MB at the TOWN
target, ≈ 10 MB at CITY, ≈ 26 MB at the METROPOLIS target and ≈ 67 MB at the 35 000-building cap
(`docs/validation/bench/fixall_rendering_r3_budgets.out`) — plus the file being written (≤ 650 B per building at the
city band, §12.7), both released when the file is transferred out. It is counted on top of each rung's line as a peak,
not in the steady working set; a district-band export's list enters the size estimate shown before writing. Measured
with the export budgets (M1 TOWN and CITY, M2b METROPOLIS, §12.7) — pass: within the stated figure + 25 %.
Pre-decided fallback: the transient list is built with only the attribute columns the sheet's programs read at the
export band (the attribute columns are up to ≈ 2.4 of the ≈ 10 MB at CITY, §8.1 item 6), the figure is re-stated at
the new measurement, and the export dialog's size estimate uses it.

**Canvas budget (N-9 b).** The need is 3P + 7 MB (4.25P + 7 MB with path-mode shadow layers), P being the worst-case
tile positions of the viewport at the tile DPR; each tier has a ceiling, and the tile DPR steps down until the need
fits it (§8.8). The reference view (1 440 × 900 at DPR 2) needs 112 MB; the low-end device's 1 366 × 768 or
1 920 × 1 080 at DPR 1 needs 43 or 67 MB.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS).
Pre-decided fallback if CITY exceeds its line at M1: the provenance and lifecycle-history columns leave the working set
for the document's on-demand block (SCL-20's archive) and are decoded only when inspected; if the line is still
exceeded, the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test
re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom runs, its coarser-stop fallback set is
dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached tiles only where they remain. The
document's size budget is §2.9's.


=== REPLACE 12.9 Reference comparisons and the declared trade ===

### 12.9 Reference comparisons and the declared trade

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r3); drafted by fixall/draft-rendering-r2

* **MFCG at matched building counts** (§12.2): model time 1.8× (TOWN), 2.3× (CITY) and 5.1× (METROPOLIS) MFCG's
  generation; time to first map, by §12.5's laws at MFCG's counts, ≈ 2× MFCG's generation plus canvas replay at TOWN
  and CITY (143 ms against 73–79 ms at 1 475 buildings; 374 ms against 189–210 ms at 5 242; MFCG's replay ≈ 11–15 µs per
  building, from its size-80 profile) and ≈ 3× at METROPOLIS (932 ms against 300–352 ms at 13 091); at MFCG's size-200
  stress count (31 951 buildings, 236 ms plus replay) PLAT's law gives ≈ 2.1 s, ≈ 3–3.6×.
* **FTG (NF-S7).** The side-by-side sizes are FTG's BIG_TOWN and BIG_CITY, from M-1's free captures (§13.6, D-31), and
  METROPOLIS per D-31. The timed capture so far is FTG's CITY preset (9 500 people, 2 798 buildings): the server answers
  in 2.9–3.2 s, the client is building the scene 6.4–7.0 s after the click, and loading a finished settlement costs 2.0 s
  of busy time (ftg-payload-visual, Critic-2 addendum part 2; the 4.6 s "client busy during create" figure is not a time
  to first map). PLAT's first map at that size (the TOWN law at 2 798 buildings) is ≈ 0.24 s, ≈ 27–30× sooner; FTG's
  creator gives ≈ 10 s to render a metropolis (49 500 people) client-side, ≈ 10× PLAT's ≈ 1.0 s at that population.
  M-1's BIG_TOWN and BIG_CITY captures add their timings to §13.5's timing row.
* **Declared trade (MFP-5, N-2, NR-1).** Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because
  PLAT builds what MFCG does not — a heightfield with hydrology, frontage-first plots with yards and party walls, site
  plans with heights, roster siting, greenery by rule and collision-checked labels — which D-7 ranks above speed. The
  first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings
  (≈ 48 000 people); above that it grows to ≈ 2.3 s at the 120 000 cap, a miss of O12 (g) declared in §12.5 for the
  owner's veto. The model alone meets O3 (d)'s bars at p95 up to ≈ 4 500, 17 700 and 58 800 people and is slower above
  them — up to ≈ 0.2 s, 0.48 s and 1.9 s at the band tops — a miss declared in §12.3 for the owner's veto. Reversing the trade would mean dropping plot and site-plan detail from the one-click path, which the
  owner's plot-model ruling forbids.
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; the pool keeps CITY within 300 ms at its target and moves the METROPOLIS one-second
  knee from ≈ 11 400 to ≈ 14 200 buildings (§12.5).


## 3. Cross-area requests

The integrator applies these in the owning areas' sections. Each names the item it completes.

### 3.0 Folded here from another area's item

| from | request | folded into |
|---|---|---|
| determinism VD2-5 (`r2-verify-determinism.md`: stale enumerations of the rerollable concerns), its §8.1 part | `DisplayList.salts` names every rerollable concern | §8.1's interface: `salts: Record<RerollableConcern, number>` (the registry-generated type of §6.1). If determinism's round-3 draft names the type differently, the integrator uses its name in this one line; nothing else in §8.1 depends on it. |

### 3.1 Determinism (§6.1)

| # | section | request |
|---|---|---|
| D1 | §6.1 **Concern registry**, the initial-concerns list (NR-6) | append `render.stampTiles` — "(the stamp-tile library of §8.10: non-rerollable, attempt cap 0; its stream is keyed by a constant entity key over (stamp-tile domain, decoration class index, spacing in cm, tile index), with `STAGE_VIEW`; read by `@plat/kernel`'s `poisson` builder in the tile worker and the generation worker)". Append-only, so no other key moves; the CI test that a rerollable concern has a reader does not apply (it is not rerollable). |
| D2 | §6.1 **Decoration** bullet (VD2-6, NR-6) | replace "are keyed by the entity's lineage and the **instance ordinal**, never by LOD band" with "are keyed by the entity's **render key** — the low 64 bits of its entity key, which mixes the seed key with the lineage (§8.1 item 5; VD2-6) — and the **instance ordinal**, never by LOD band; the stamp tiles themselves are a session library built from a constant key (§8.10; NR-6)". |

### 3.2 Pipeline (§4.10)

| # | section | request |
|---|---|---|
| P1 | §4.10, the S14 sentence (NR-5, NR-3) | after "the finer bands on demand, per district, when the tile worker's band requests name them (§8.9)," insert "a transient list for an SVG export in the generation worker (§11.1)," and after "S14 builds the columnar display list (§8.1)" insert "— one mark per pass an entity draws in, as the entity registry declares per band (§8.1 item 3) —". |

### 3.3 Scope (§1.1, §13.2, §13.3, §13.8, §14, §15.2, §16, Delegated decisions, Judgment calls)

| # | section | request |
|---|---|---|
| S1 | Delegated decisions, row **D-18**, decision column (NR-1) | replace "(100 / 300 / 800 ms at the targets)" with "(100 / 300 / 800 ms at the targets; O3 (d)'s bars — 100 ms, 300 ms, 1 s — hold for p95 up to ≈ 1 333 / 5 200 / 17 300 buildings (≈ 4 500 / 17 700 / 58 800 people) and, with the max clause that no generation exceeds 1.25 × its own law, up to ≈ 1 000 / 4 000 / 13 460 buildings; above them a declared miss of O3 (d): p95 ≈ 196 ms and ≈ 481 ms at the TOWN and CITY band tops and ≈ 1.92 s at the METROPOLIS cap, §12.3)"; replace "— *owner veto on the miss above the knee*" with "— *owner veto on the misses above the knees (the first map's, §12.5, and the model's, §12.3)*"; rationale column: append "; O3 (d)'s model bars are read over every size of a rung, like O12 (g)'s first-map bar". |
| S2 | §15.2, row **O3**, clause (d) (NR-1) | replace "(d) model p95 TOWN ≤ 100 ms, CITY ≤ 300 ms, METROPOLIS ≤ 800 ms (§12.3) [P — MFCG at matched sizes, with §12.9's declared trade]" with "(d) model time per §12.3's laws — p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B; every generation ≤ 1.25 × its own law — so O3 (d)'s bars (100 ms / 300 ms / 1 s) hold for p95 up to ≈ 4 500 / 17 700 / 58 800 people and for the max up to ≈ 3 400 / 13 600 / 45 800, and are missed above them, a miss declared in §12.3 for the owner's veto [P — MFCG at matched sizes, with §12.9's declared trade]". |
| S3 | §1.1 rung table, column header "model p95" (NR-1) | "model p95" → "model p95 at the target (§12.3's law; O3 (d) read over the band, §12.3)". The 100 / 300 / 800 ms cells stay. |
| S4 | §13.2 **Cost-model tests** and §13.8 nightly tier contents (NR-1, NR-6, NR-3, VD2-6) | nightly adds: "the max clause of §12.3 — every B-CITY generation's model time ÷ its rung's law at its own building count ≤ 1.25 (normalised by §12.1's calibration score); the stamp-tile hashes of §8.3 in the generation worker and the tile worker on the five engines". PR tier adds: "every shipped style sheet loaded at every band by §8.2's slot resolution (0 unresolved, 0 ambiguous pairs); the render-keys-across-seeds check of §8.3 on two B-CITY-lite seeds per rung". |
| S5 | §13.3, the **view shift** rule under *Placement digests* (NR-6) | append: "The stamp-tile hashes of §8.3 are stored with the placement digests; a stored hash that moves while every model digest holds is a view shift of the same kind — a `ShiftRecord` with stage `render.stampTiles` and `outputVersion: null`, bumping the style version of every shipped sheet that draws stamped classes." |
| S6 | §14, the `@plat/labels` interface comments (NR-4, NR-5) | after `interface RoleIndex { … }` add the comment line `// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap through §8.9's queries), and in the generation worker over an SVG export's transient list (§11.1)`. |
| S7 | §14, `@plat/export` interface (NR-5) | `interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList \| null, opts: Opts): Promise<Uint8Array \| string> }` gains the comment `/* runs in the generation worker (§11.1): list = the transient export list for SVG; null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) and for raster formats, which send a raster-export request to the tile worker (§8.9) */`. |
| S8 | §14, the `@plat/kernel` package line (NR-6) | "poisson (stamped ranked tiles)" → "poisson (stamped ranked tiles, built from a constant stream key, §8.10)". |
| S9 | §16 build plan, exit lists (NR-1, NR-4, NR-5, NR-7) | M1 exit adds: "the model max clause at TOWN and CITY (§12.3); the furniture and snap query round trip (§8.9); the SVG export's transient-list peak (§12.8)". M2b exit adds: "the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9)". M3b exit adds: "the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1)". |
| S10 | Judgment calls, row **J-R19** (VD2-6) | replace with: "Chose the low 64 bits of the entity key — the seed key mixed with the lineage hash, layer and island — as the one key of every render-time hash over the bare lineage hash, the address and the interned handle, because the lineage alone carries no seed and would repeat the same looks at the same derivation positions in every town (VD2-6), the entity key is what every stream of the entity is drawn from, so a New random re-rolls its look with its shape, and handles are session-local, which broke pixel identity across reloads (§8.1; NF-D10)." |
| S11 | Judgment calls — append rows J-R38 … J-R43 after J-R37 | see §3.4 |

### 3.4 New judgment-call rows (for the scope area to append after J-R37)

| id | row |
|---|---|
| J-R38 | Chose to read O3 (d)'s model-time bars over every size a rung builds and to declare where they hold — p95 up to ≈ 4 500 / 17 700 / 58 800 people, the max (each generation ≤ 1.25 × its own law) up to ≈ 3 400 / 13 600 / 45 800 — and the miss above them for the owner's veto, over reading them at the targets only, because size follows population inside a rung, as N-2 ruled for the first map, and a reading at the targets hides the miss (§12.3; NR-1). |
| J-R39 | Chose explicit passes on `OrderSlot` with most-specific-wins resolution and refusal of any unresolved or tied (semantic, pass), with `derived` entries for the raised under-copy and projected shadows, over one slot per semantic or an order fixed in code, because a way's casing and body must sit in different slots while sheets stay data (§8.2; NR-3). |
| J-R40 | Chose furniture-placement and snap queries answered by the tile worker within one frame — ahead of raster work, tile rasters cut at 8 ms — over copying mark kinds and vertices into the main thread's hit-test slices or placing furniture in the generation worker, because the slices would carry model-sized geometry and the generation worker's index has no kinds, vertices or placed labels (§8.9; NR-4). |
| J-R41 | Chose a transient display list built in the generation worker for SVG exports and released after writing, over handing SVG to the tile worker or keeping a second resident list, because the SVG writer reads the document, which the tile worker never holds, and exports are occasional (§11.1, §12.8; NR-5). |
| J-R42 | Chose a constant stream key for the stamp-tile library — (class, spacing, tile index), `STAGE_VIEW`, `render.stampTiles` — with integer-centimetre points, `dmath` transcendentals and index-order sums and ties, over a seed- or document-keyed library, because the tiles are shared by every document of a session and the per-town variety comes from the stamp's offset, rotation and seed-dependent variant (§8.10; NR-6). |
| J-R43 | Chose a declared PLAT CityJSON Extension for `+platGeoAnchor`, validated in CI against the repository's schema, over a sidecar as the primary, with a `<name>.geoanchor.json` sidecar as the pre-decided fallback, because the extension keeps the anchor inside the one file a GIS user moves around and the sidecar leaves the CityJSON file valid by construction (§11.1; NR-7). |
