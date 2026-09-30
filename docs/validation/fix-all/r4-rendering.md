# Fix-all round 4 — RENDERING area (§8 rendering and style, §9 labels and furniture, §11 export and interop, §12 performance budgets)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-rendering-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-rendering-r4` · 2026-09-26 · fix architect for the RENDERING area, round 4 (opus stand-in for the Fable
seat). Status: COMPLETE (2026-09-26).

## 0. How to read this file

**In plain words.** The round-3 check found seven small things still wrong in the drawing, labelling, export and speed
sections. All seven are fixed here; none is put off and none is waved away.

* **The first milestone no longer picks the slower setup by mistake.** A town is built with several background
  helpers working in parallel, or with one. The old rule dropped the helpers whenever a city took over 0.3 s, although
  the speed rule itself expects an ordinary city to take up to 0.34 s with them and 0.45 s without. The new rule times
  both setups on the same towns at a small, a middle and a large size and keeps whichever is faster at each size
  (NR3-1).
* **The background drawing thread can pause a map tile half-way.** It stops after at most a few milliseconds to answer
  the compass, legend or ruler, then carries on; a tile drawn in pieces is checked to be identical, pixel for pixel,
  to one drawn in one go (NR3-2).
* **Two labels you pinned can no longer end up on top of each other** after the map is warped, a street is renamed or
  the font changes. The label you pinned first stays; the other is hidden at the zoom levels where they would touch, and
  the report says so (NR3-3).
* **The "no town more than a quarter slower than its rule" check no longer fails on a hiccup of the test machine.** A
  slow result from the busy nightly run is timed again three times with nothing else running, and only a town that is
  slow every time counts. Every speed check that can fail a build is now timed that way (NR3-4).
* **Two per-building speed figures are corrected** — 75 and 58 millionths of a second, not 74 and 57 (NR3-5).
* **A large print no longer holds up the map you are looking at.** The map always comes first; the print carries on in
  small pieces in between and shows its progress, and it can no longer come out half before and half after an edit
  made while it was being produced (NR3-6).
* **The ready-made tree patterns are made once, when the product is built, and shipped with it** (about 31 KB),
  instead of being computed the first time you zoom in. One set of patterns per kind of greenery now serves every tree
  spacing by being stretched, where the old design needed a new set for every spacing a wood happened to draw (NR3-7).

**Format.** §1 is the disposition table, with the places where a required change was refined and why. §2 holds the
twelve replacement blocks, each starting with `=== REPLACE <section and exact heading> ===` and followed by the complete
new text of that subsection in the architecture's voice, with its review banner under the heading. §3 lists what other
areas must change (the integrator applies it), what this file folded in from the kernel's and determinism's round-4
requests, and the judgment-call rows (J-R17, J-R38, J-R40 and J-R42 restated; J-R44 – J-R49 new; J-P10, J-R18 and J-10
amended). Every new choice is recorded in its block as "chose X over Y because Z". §4 separates what was executed from
what is reasoning.

**Evidence.** The stamp-tile figures come from `docs/validation/bench/fixall_rendering_r4_stamptiles.mjs` (our own
code, plain Node; output committed as `.out`): ≈ 161 points per 64-m tile at 4 m, ≈ 2.8 ms of sampling and ≈ 1.8 ms of
ranking per tile with a software exponential (≈ 53 ms with a re-sum after every removal), ≈ 19 ms per class and
≈ 0.37 s for twenty spacings as a session build, ≈ 31 KB and ≈ 0.03–0.06 ms to load and hash as an asset. The budget
figures are re-derived from §12.3's and §12.5's laws (75 / 58 / 59 µs; 265–340 ms pooled against 351–454 ms single at
the default CITY request; the single worker's 300-ms knee at 3 768 buildings; the timing phase's ≤ 3.3 min of
re-timing). The item sources are `r3-verify-rendering.md` §4 (NR3-1 – NR3-7); no `r3-validate.md` exists. The
architecture was read at §8, §9, §11, §12 in full and at §4.1's pool paragraph, §4.9's greenery table, §6.1's registry
and decoration bullet, §7.1's `EditBase`, §13.2–§13.4, §13.7's O19 row, §13.8, §14, §15.1's B19, §16's M1 / M2b rows,
§17.1, D-11, D-18 and the J-rows named in §3.

**Output shifts, stated.** NR3-7 moves every stamped tree (the scaled library replaces the per-spacing one) and NR3-3
can hide a pin where two pins meet; both change pixels and placements, not the model's geometry. NR3-3 also adds a
stored `seq` to a pinned label's placement, so the model digest of a document with pins changes shape. No golden,
placement digest or saved document exists yet (goldens start at M1, §13.3), so nothing recorded moves; from M1 on the
first would be a `render.stampTiles` view shift and the second a schema migration. NR3-1, NR3-2, NR3-4, NR3-5 and NR3-6
change no output: pool size never changes the model, a sliced tile is pixel-identical, and an export's pixels depend
only on its transient list.

**Deferral scan.** A scan of every block for TBD, later, "at M0", open, defer, postpone, "to be decided", future,
eventually, "not yet", revisit, undecided, until, pending, provisional, placeholder and TODO finds only ordinary prose
("until its answer arrives", "a later edit", "a pending delta", the `open` exposure class, "leaving it deferred (D-8)"
in a reason) and measurement-plus-fallback pairs ("PLAUSIBLE until M1 measures them", with the fallback steps named).
Nothing is left open, and no item is staged by the owner.

## 1. Disposition table

| id | sev | disposition | sections changed | mechanism (one line) |
|---|---|---|---|---|
| NR3-1 | minor | **FIX** | §12.3 (*Measurement and fallback*, new *Which configuration is primary*), §12.9 (last bullet); cross: §4.1 (pipeline), §16 M1 / M2b, D-18, J-P10 (scope) | the pool stays primary at a rung when (a) its p95 is within the pooled law + 10 % at the band's bottom, target and top, (b) it is faster than a single worker measured on the same generations at each of those sizes, and (c) digests are identical for pool sizes 0–3 on 200 seeds; (c) failing, or the single worker faster at all three sizes → single-worker column; (b) failing at some sizes only → each size range runs the configuration that was faster at the nearest measured size (pool size never changes the model); only (a) failing → the pooled law re-declared at the measured p95 (D-18) — a pool that runs exactly at its law now passes |
| NR3-2 | minor | **FIX** | §8.9 (new *Resumable rasters*, interface block), §8.3 (census row); cross: §14 `TileBackend` (scope) | `TileBackend.begin(tile, list, style, opts): RasterJob`; `RasterJob.step(deadlineMs): boolean`, `finish(): ImageBitmap`, `cancel()`; the draw sequence is fixed at `begin` in (slot, pass, z, key) order; JavaScript preparation is cut at mark boundaries and every 64 instances, a native call is never split, derived operations on the shared buffers run whole; deltas never compact a list under a live job; a tile rastered whole and in 1-ms slices is pixel-identical (census); the scheduler calls `step(8)` (`step(4)` after NR-4's fallback) |
| NR3-3 | minor | **FIX** | §9.2 (*Pinned labels*, reasoning), §9.1 (`PinnedPlacement`, the view bullet), §8.1 (`LabelTable.pinSeq`); cross: §13.4 B-ZOOM fixture, §16 M1 (scope) | a **pin pass** at every stop: eligible pins in the order of their `moveLabel` `seq` (then label id); a pin whose box meets an already fixed pin is not fixed there — it is hidden at that stop and reported ("pinned label hidden: overlaps pin P at stop k"); `moveLabel`'s refusal stays as the interactive guard; B-ZOOM fixture: a warp and a rename bring two pins together — 0 collisions, one pin reported hidden, replay identical |
| NR3-4 | minor | **FIX** | §12.3 (max clause), §12.1 (new *Timing on shared runners*); cross: §13.2, §13.8 nightly row, J-R38 (scope) | the nightly B-CITY run screens (records every ratio); each generation above 1.25 is re-timed three times alone on the runner under §12.1's protocol at its recorded pool size, and the clause fails only when the median of the three exceeds 1.25 (the 20 highest ratios when more than 20 are flagged); same rule at M1 / M2b; the D-18 fallback re-declares at the largest confirmed median; the same class of noise is closed for every gating timing by a **timing phase** that runs last and alone on the runner |
| NR3-5 | minor | **FIX** | §12.3 (first table), §12.9 (declared trade); cross: J-R17 (scope) | 75 µs (TOWN, 100 ÷ 1 333) and 58 µs (CITY, 300 ÷ 5 200) in §12.3's first table; "≈ 58–75 µs" in §12.9 and J-R17 |
| NR3-6 | minor | **FIX** | §8.9 (*The tile worker's queue*, crossing rows, threads), §11.1 (PNG row, *Where exports run*), §12.7 (PNG row, confirmation), §12.8 (export-time peak and canvases), §8.1 item 6; cross: §14 `Exporter`, §13.2 (scope) | fixed queue classes — (1) queries, (2) incoming deltas and band answers, (3) the visible view's rasters and compositions, (4) export tiles — one step at a time, so view work pre-empts an export within one step; an export that has waited 100 ms gets one step (no starvation under an animated view); exports raster from a **transient list** the generation worker builds and transfers with the request, so an edit during an export cannot tear it; the dialog shows progress; ≤ 20 s is stated for an idle view; B-CITY's browser run pans during an A2 export (settles within §12.5, the export completes pixel-identical to an idle-view export) |
| NR3-7 | minor | **FIX** | §8.10 (tiles, construction, new *The shipped stamp-tile asset*, stamp, where it runs, budgets), §8.3 (census row), §12.7 (asset load); cross: §6.1 registry and decoration bullet (determinism), §13.2, §13.3, §13.7 O19 (d), §13.8, §14 (scope) | the tiles are built at build time by `plat/tools/stamptiles/` with the `poisson` module and shipped as a versioned asset (int16 cm pairs + u16 rank, 6 B per point), bundled into both workers and hash-checked against the stored values; **one set of four tiles per stamped class at a reference spacing of 4 m, scaled by spacing ÷ 4 m per entity** — the spacing is drawn per entity in centimetres (wood 3–5 m, §4.9), so a (class, spacing) library was unbounded; the ranking's removal update is stated (≈ 1.5 n² exponentials, O(n²)); asset load ≤ 5 ms per worker (cost model: 0.03–0.06 ms); a mismatching tile is rebuilt in the worker as the pre-decided fallback |

**Totals:** 7 items — 7 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred.

**Folded from other areas' round-4 requests into this area's blocks** (so each subsection is replaced once; where the
owning lane's wording differs, the owning lane's wording governs and the integrator aligns these sentences to it):
kernel `r4-kernel.md` X-R1 (c) — §12.3's p50 column CITY 253 → 255 ms and METROPOLIS 606 → 609 ms (VK3-6) — into the
§12.3 block; kernel X-R2 — the arena and frozen-copy figures, the re-summed CITY line and the laziness-contract copy step
(VK3-6) — and determinism `r4-determinism.md` RR4-4 — the verification paragraph and M1's memory measurement (VD3-5,
VD3-1, VD3-4) — into the §12.8 block. Kernel X-R1 (a), (b) (§12.4) and determinism RR4-1 (§9.6), RR4-2 (§11.3) and
RR4-3 (§12.6) target subsections this file does not replace; the integrator applies them as written.

**Where a required change was refined, and why.**
* **NR3-1.** The required change covers the pool losing at every size or at none; it does not say what happens when
  the pool loses at some sizes only (fixed copy and merge costs can dominate at a band's bottom). The block runs each
  size range with the configuration that was faster at the nearest measured size, chosen at S0 from the request's
  population — safe because pool size never changes the model (§3.3 step 5) — so the product never keeps the slower
  configuration where it measured the faster one. Its
  condition (a) is read per generation (the p95 of T_i ÷ L(B_i) ≤ 1.10) because a size's building count varies by seed;
  §12.3's sweep pass rule is restated the same way.
* **NR3-3.** The required change lets a pin that meets an earlier fixed pin "enter the greedy like a coarser-stop pin,
  drawn when free". At its own stop such a pin always meets the fixed pin, which is an obstacle to every candidate, so
  it can never be drawn there; the block states the outcome directly — hidden and reported at that stop — and notes it
  may be fixed again at a finer stop, where pixel-sized boxes shrink apart. The order key needs the `moveLabel` `seq`
  in the model (a pin survives rebases that drop its event), so `Placement` gains a stored `seq` as
  `PinnedPlacement` and `LabelTable` a 4-B `pinSeq` column (88 of the row's ≤ 96 B).
* **NR3-6.** The required order put "answers to band requests" after the visible tiles; the block applies incoming
  deltas and band answers (class 2) before the visible view's rasters (class 3), because a visible tile that needs a
  band's marks cannot be rastered before its answer is applied and applying one is O(changed marks) copying. Pure
  priority would let an animated view (a `path`-mode sun, moving people) starve an export for ever, so an export that
  has waited 100 ms gets one step. Tracing the export's input exposed a second defect the priority change makes more
  likely: exports rastered "from its own list", which edits made during a long export change between bands, tearing the
  picture, and which holds finer bands only for districts the view has visited. Raster exports now use a transient list
  built by the generation worker, as SVG already does (NR-5), transferred with the request.
* **NR3-7.** The required change pre-builds the tiles per (class, spacing). The spacing of a stamped entity is drawn per
  entity in centimetres from its class's range (wood 3–5 m, garden 4–6 m; §4.9, §8.10's `render.instances` row), so
  (class, spacing) has hundreds of values per class: the session library it replaces was unbounded (≈ 19 ms per
  spacing at 4 m, ≈ 0.37 s for twenty spacings, measured cost model), and a pre-built one would be megabytes. The block
  builds one set of four tiles per class at a reference spacing of 4 m and scales it per entity by spacing ÷ 4 m (blue
  noise scaled is blue noise at the scaled spacing), which makes the asset ≈ 1 KB per tile.
* **NR3-4.** The required change fixes the max clause's screen; the same contention hits the cost-model sweeps (their
  "p95" over five seeds per size is in effect a maximum) and the first-map runs, which also run in the nightly tier
  beside the other suites. The block adds §12.1's timing phase so every timing that gates a budget is taken alone on
  the runner — one mechanism instead of one fix per check.

## 2. Replacement blocks

Twelve subsections are replaced whole. Each block starts with its heading and its review banner; the text between the
banner and the next block is the complete new subsection.

=== REPLACE 8.1 The display list (renderer-independent, columnar, incremental) ===

### 8.1 The display list (renderer-independent, columnar, incremental)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

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
  pinSeq: Uint32Array /* the pin's `moveLabel` seq (`PinnedPlacement.seq`, §9.1): the order of §9.2's pin pass (NR3-3) */;
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
   reads (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) (§8.9, §12.8). An export that draws —
   SVG, PNG, print, the `.dd2vtt` image — builds a transient list of its own in the generation worker: SVG writes from
   it there and releases it; a raster export transfers it to the tile worker with its request, which rasters from it
   and releases it (§8.9, §11.1, §12.8; NR-5, NR3-6).

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

=== REPLACE 8.3 Symbol catalogue and draw-style census ===

### 8.3 Symbol catalogue and draw-style census

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

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
| sliced rasters (NR3-2): per preset and band, the golden views' densest district-band and neighbourhood-band tiles and a whole-CITY city-band view, each tile rastered by one `step(Infinity)`, by `step(1)` until done, and by `step(1)` with another tile's job, a furniture query and a band answer for districts outside the tile served between every two steps (§8.9) | all | pixel-identical in the three runs; the logged (slot, pass, z, key) call sequence identical |
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
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' centimetre coordinates and ranks in point-index order (§8.10; NR-6, NR3-7) | all | as loaded in the generation worker and in the tile worker: equal to the asset's stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | hatch triangles 15–20; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |

=== REPLACE 8.9 Backends, text, threads and the worker boundary ===

### 8.9 Backends, text, threads and the worker boundary

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and their variants), running
  on an `OffscreenCanvas` in the tile worker, through the resumable raster jobs below (NR3-2); programs render typed-array paths, one `Path2D` per (program, semantic,
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
  every export (§11.1: SVG from a transient list it builds and releases; raster formats from a transient list it builds
  and transfers to the tile worker with the request; NR-5, NR3-6),
  answers the API's `hit` and `inView` queries (§11.2) from the model and the 24-B index it keeps (the entity, bbox and
  group columns — all a hit test or a features-in-view list reads), and hands stage-3 `compose()` and close-up
  derivation (§8.6) to the derivation pool. (2) The **derivation pool** — up to three
  workers — runs the per-district stages at every rung (§12.3; the merge protocol of §4.1) and, on request, `compose()`
  and close-up derivation from the committed state of the district it is handed; with the pool off the generation worker
  runs them itself. (3) The **tile worker holds no model**: it holds the display list with its label, instance and
  string tables — the only full copy (§8.1 item 6) — and from them rasters base layers, runs label placement (S13b,
  §9.2) and decoration instancing (§8.10), composes labels and `overlay` live marks onto each tile (§8.8) and runs the
  post operations; it answers the main thread's furniture and snap queries and rasters the generation worker's raster exports from the
  transient list each export request carries (§11.1; NR3-6), all of it through the queue below; everything it needs
  arrives through the table below. (4) The **main thread** runs the UI, compositing
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
  | generation → tile worker | raster-export requests — PNG, print and the `.dd2vtt` scene image: frame, scale, band, layers, post operations and the export's zoom stop (§8.7; NR-5) — each carrying the export's transient list: its mark, geometry, label, instance and string tables for the export's band and frame (§11.1; NR3-6) | the request copied; the list's columns transferred | ≤ 4 KB plus the list (≈ 1.9 KB per building at the city band, §12.8) |
  | tile worker → generation | the encoded raster: PNG bytes, streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog (NR3-6) | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters (NR3-2).** A worker serves its message queue only between two calls it makes, so a tile is
  rastered by a job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile backend (§14 declares the same). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at the export's stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the draw sequence on from where it stopped and returns after the first draw call that ends deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() has returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job and frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  ```

  `begin` finds the tile's content — every mark whose bbox meets the dilated tile (§8.8) — and fixes its **draw
  sequence**: the native calls in §8.1 item 3's (slot, pass, z, key) order, each a fill or stroke of one batched
  `Path2D` (≤ 80 per tile, §12.5), a run of ≤ 64 sprite draws (crowns, glyph copies), or a derived per-tile operation
  (the projected-shadow union, the raised under-copy, a post operation; §8.2, §8.4). `step` runs the sequence on from
  where the last step stopped. The JavaScript that prepares a call — appending the marks' rings to its `Path2D`,
  generating a stamp's instances (§8.10) — reads the clock after every mark and every 64 instances and can stop there;
  a native call is never split (a batched fill split in two would draw anti-aliasing seams between same-role
  neighbours, §8.8), and a derived operation, which uses the shared shadow and post-operation buffers (§8.8), runs
  whole inside one step. The overrun past the deadline is therefore at most one native call or one derived operation.
  Each job owns its canvas and its context state, and what it reads does not change under it: deltas are applied
  between steps, a removed mark becomes a dead row and an added mark a new row, and the tile worker compacts its list
  only while no job is live, so a live job's mark indices stay valid; a job whose tile a delta's dirty boxes meet is
  cancelled and queued again, its pixels being stale. Slicing therefore changes when the calls run, never which calls
  run or in what order: a tile rastered whole and in 1-ms slices is pixel-identical (§8.3's census row). The queue
  below calls `step(8)` — `step(4)` after the pre-decided fallback.

  **The tile worker's queue (NR-4, NR3-6).** Between two steps the tile worker serves its message queue, then runs one
  step of the highest class that has ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer (the table above) | a visible tile that needs a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop (§9.2), the visible tiles' raster jobs centre-out, their compositions and commits (§8.8), re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: the raster jobs of the current export band's tiles, then the band's composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs
  to completion before the next begins, so at most one raster job per class is live; a query waits for at most one
  step, and a pan or zoom during an export pre-empts the export within one step: newly exposed tiles are rastered at once, not
  behind the export's bands. **No starvation:** an export that has waited 100 ms since its last step runs the next
  step ahead of class 3 (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle then contains at most two
  export steps at CITY (≤ 150 ms) and three at METROPOLIS (≤ 250 ms), ≤ 16 and ≤ 24 ms beside the ≈ 42–83 ms settle
  rasters of §12.5. A newer sun step or a tile that leaves the view cancels its job (latest wins; §8.4, §8.8). The
  export dialog shows the tile worker's progress messages (bands done of bands total) and, while class 3 holds the
  worker, that the export is waiting for the view.

  **Queries to the tile worker (NR-4).** Compass, title and legend placement (§9.5) and the ruler's snapping read the
  display list, which only the tile worker holds, so the main thread asks for them through the query rows above and the
  tile worker answers with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses
  (§14). A query is class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived
  operation, and runs in ≤ 4 ms of tile-worker time: its answer arrives within one 16.7 ms frame. Most tiles are one
  step (a city-band tile of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight — a
  newer pointer position replaces a queued one — and shows the unsnapped point until the answer arrives; furniture
  placement is asked when the view settles, and the furniture keeps its previous place until its answer arrives.
  **Measurement** with the first map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: the query round
  trip p95 ≤ 16 ms during a settle raster, and ≤ 4 ms of tile-worker time per query, with each tile's longest native
  call and derived operation logged beside it; and a scripted pan and zoom during an A2 300-dpi export of a CITY
  (§12.7) — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte, the
  export made with the view idle and one during which an edit is made (the export's transient list, §11.1).
  **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`), which halves both a query's wait and an
  export step's share of a settle. Chose queries answered in the tile worker over copying the marks' kinds and vertices
  into the main thread's hit-test slices, because the slices would then carry model-sized geometry to the main thread
  (N-4, SCL-6), and over placing furniture in the generation worker, because its 24-B index has no kinds, vertices or
  placed labels.
  Chose a resumable job — `begin`, `step`, `finish` — over the synchronous `raster()` call it replaces, because a
  synchronous raster makes a query wait for the longest tile in progress and J-R40's one frame cannot be met by an
  implementation that follows it, and over splitting batched calls to bound the overrun, because a batched fill split
  in two draws anti-aliasing seams between same-role neighbours (NR3-2). Chose four fixed classes with a bounded export
  share over first-come order, because an A2 print's bands (up to ≈ 20 s, §12.7) would otherwise sit ahead of newly
  exposed tiles and every settle during the export would miss §12.5's bound, and over strict priority alone, because an
  animated view never empties class 3 and would stop an export for as long as it runs (NR3-6); chose to apply deltas
  and band answers ahead of the view's rasters, where the verifier's order put band answers after them, because
  applying one is O(changed marks) copying and every tile that waits for it is visible work.
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).

=== REPLACE 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (a wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting or scatter class) has one set of positions, in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's parameters — offset, rotation, and the spacing in whole centimetres inside its class's
  range (§4.9; 300–500 cm for woods, 400–600 cm for gardens) — from the entity's `render.instances` stream (§6.1) in
  the generation worker and carries them in the mark's `InstanceTable` row (§8.1).
* **Tiles (NR3-7).** Per stamped class: four toroidal blue-noise tiles of 6 400 × 6 400 cm at the **reference spacing**
  r₀ = 400 cm (≈ 161 points each; `docs/validation/bench/fixall_rendering_r4_stamptiles.out`), each point carrying a
  **progressive rank** (void-and-cluster order: every prefix of the ranked list is itself evenly spread — the quarter
  of lowest rank keeps ≈ 1.6 × r₀ between any two of its points, measured by the same benchmark). An entity whose spacing is r stamps them scaled
  by s = r ÷ r₀: blue noise scaled is blue noise at the scaled spacing, so the minimum distance is the entity's own
  spacing and one set of tiles serves every spacing of the class (a wood at 3 m stamps 48-m tiles, a garden at 6 m
  96-m tiles). The tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1 item 5),
  which breaks visible repetition. The tiles are built once, when the product is built, and shipped (below); nothing
  samples or ranks at run time.
* **One construction everywhere (NR-6, NR3-7).** A tile is a pure function of (class, tile index), built by
  `plat/tools/stamptiles/` — a build-time script in the product repository, like the texture set's (§8.2) — with
  `@plat/kernel`'s `poisson` module (§14), held to §6.5's allowlist lint like every model package, so any machine that
  runs the script builds the same bytes. Its random source is `rng.stream` (§6.1, §14) with a **constant entity key** —
  §6.1's four-lane finaliser over the words (a fixed stamp-tile domain constant, the decoration class's registry index,
  the reference spacing 400 cm, the tile index 0–3 as the creation index) —, the stage `STAGE_VIEW`, the non-rerollable
  concern `render.stampTiles` (§6.1's registry) and reroll, attempt, epoch and salt 0. **Sampling:** Bridson with
  k = 50 candidates, all evaluated (the reference variant, paid once per release instead of per tree). Every accepted
  point is rounded at once to integer centimetres inside the 6 400-cm tile, so the spacing test is an exact integer
  comparison of squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active
  point is `int(0, n − 1)` over the active list in insertion order, a retired point being replaced by the list's last;
  each candidate lies at a radius r₀ × (1 + `float01`) along the angle 2π × `float01`, whose cosine and sine come from
  `dmath` (§6.5), and candidates are tried in draw order. **Ranking:** every point's energy is the sum, over the other
  points in point-index order, of exp(−d² ÷ (2σ²)) with d their toroidal distance in centimetres, σ = r₀ and the
  exponential `dmath.exp`; the point of highest energy (equal energies: the lower point index) is removed and takes the
  highest free rank (n − 1 first), and every point still present then has the removed point's term subtracted from its
  energy, in point-index order — the **removal update**, so ranking costs n(n − 1) + n(n − 1) ÷ 2 ≈ 1.5 n²
  exponentials (O(n²)), never a re-sum after each removal (O(n³): ≈ 53 ms per tile against ≈ 1.8 ms at 161 points,
  measured cost model). A square root, where one is needed, is `Math.sqrt`, exact by specification (§6.5 (2)). The crown
  library's shapes (below) use `dmath` the same way, so only their rasterisation into sprites is engine-specific.
* **The shipped stamp-tile asset (NR3-7).** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in
  registry order, its four tiles — a point count, then per point its x and y as int16 centimetres and its rank as a
  u16, 6 B per point, ≈ 1 KB per tile, ≈ 31 KB for eight classes — with a header naming the asset version, the format
  version, the generating script and its constant key words (§17.1 (5)) and the stored H128 of every tile. `@plat/render`
  bundles the bytes into the code of both workers, so no host serves an extra file (§11.2); at worker start each worker
  takes typed-array views over them and checks every tile's H128 against the stored value (≈ 0.03–0.06 ms for 8–16
  classes, measured cost model). **Pre-decided fallback** when a tile's hash differs (a damaged bundle): that worker
  rebuilds the class's tiles with the same `poisson` construction at start-up, before its first district-band raster
  (≈ 19 ms per class at r₀, measured cost model), and the report says so; a rebuilt tile that still differs is a
  determinism defect, which the census's rebuild check (§8.3) fails in CI. **Release changes:** a new stamped class adds
  its four tiles and moves no stored hash, so no drawn wood moves; a change to the construction (r₀, σ, k, the tile
  side, the key words) moves stored hashes and is recorded as a `render.stampTiles` view shift (§13.3), bumping the
  style version of every shipped sheet that draws stamped classes. A new spacing needs nothing, being a scale. Chose a
  constant key over the seed or the document because the tiles are a library shared by every document, session and
  host — the per-town variety comes from the stamp's offset, rotation and spacing, drawn from the entity's
  `render.instances` stream, and from the seed-dependent tile variant — and a seed-keyed library would have to be
  rebuilt per document for no visible gain.
* **Stamp.** From the row: the offset o ∈ [0, 6 400)² reference centimetres, the rotation θ and the scale
  s = spacing ÷ 400 cm. Tile point t of cell (u, v) lies at the world point R_θ · (s · (6 400 · (u, v) + t + o)); the
  cells are those of the rotated, scaled lattice covering the entity's face, and a point survives if it lies in the
  face (point-in-polygon with holes) and, for woods, passes the edge test of a domain-warped density evaluated once per
  point in world metres. **Ordinal** = (u, v, p): stable — editing the face's boundary changes only which edge points
  survive, never the interior's ordinals or positions.
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
  **orphaned** and reported. Resolution reads each positional override's current position from its entity's `overrides` table (§2.7) — a
  `move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — which the event writes
  when it applies and a warp or vertex move displaces with the host face (§7.4; VK2-13); for stamp and grid layouts the
  recorded generated `point` stays world-anchored, as their instances are. An `add` stays while its point lies in the entity's face (or within 0.5 × the spacing of its
  line) and is orphaned otherwise. The resolved overrides — ordinal, op, position, style and state (`byOrdinal`,
  `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows (§8.1, §8.9). A tree brush
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and
  memoised per (key, revision, style version) for the session; they are never written to the document except as
  overrides. The generation worker runs the same function, on the same shipped stamp tiles (NR-6, NR3-7), for entities
  that carry overrides (to resolve them) and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest
  band with the overrides applied and write each instance's position, species, crown diameter and leaf type (§11.1;
  VN-158, XB32); the bench computes tree statistics from it (SCL-21).
* **Budgets.** Placement ≤ 1 µs per instance (stamp, scale and point-in-polygon), drawing ≤ 2 µs per instance as a
  sprite (§12.7); the stamp-tile asset ≤ 5 ms per worker per session, loaded and checked at worker start, never on a
  settle (§12.7).

Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10). Chose to build the tiles at build time and ship them over building them in each session because the session
build ran on the interaction path — the first zoom to the district band, under §12.5's ≤ 150 ms settle — with no
budget, in both workers, and NR-6 had already made the tiles a constant, so a build-time asset costs a bundled ≈ 31 KB
and a hash check instead (NR3-7). Chose one set of tiles per class scaled by the entity's spacing over one set per
(class, spacing) because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of
members per class (≈ 19 ms each in the session, measured cost model; megabytes as an asset), while uniform scaling
keeps the blue-noise property and the ordinals and costs one multiplication per point (NR3-7).

=== REPLACE 9.1 What is model and what is view ===

### 9.1 What is model and what is view

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revisions fixall/integrate-r3, fixall/integrate-r2, drafted by fixall/draft-rendering-r2

* **Model** (S13a; in the model hash; persisted): every entity's name and short form, and a `LabelEntity` per labelled
  thing with its candidates; the quarter merge tree (§9.4):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'way'|'landmark'|'water'|'wood'|'gate'|'title'|'annotation'|'address';
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    candidates: { spines: Polyline[] /* area and path labels, world cm, in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: PinnedPlacement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline;
    cityCut: boolean /* one of the `min(N_q, L)` quarters of the city cut (§4.5; L the number of districts): the city band's area labels */ }   // the tree is built by S6 (§4.5), named by S13a; every node has its own LabelEntity (kind 'quarter')
  interface Placement {                    // a user placement, set by moveLabel (§7.1): model data (N-28)
    stop: number;                          // the zoom stop (§8.8) at which the user placed it
    sizePx: number;                        // cap height in display px at 1× (never below the kind's floor, §9.4)
    anchor: PointCm;                       // point labels: the text origin; area and path labels: the spine's midpoint
    spine?: PolylineCm;                    // area and path labels: the user's spine, world cm
    dirCdeg?: number; lines?: 1 | 2 }      // a point label's direction; two lines broken at the entity's first `breakAt`
  interface PinnedPlacement extends Placement {   // what LabelEntity.pinned holds (NR3-3)
    seq: number }                          // the seq of the moveLabel event that set it (§7.1): applying the event writes pinned = { ...placement, seq }; a warp or vertex move that carries the pin keeps it; it orders §9.2's pin pass
  ```

* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size and
  glyph positions, the quarter cut, the halo roles. Pinned placements are honoured by §9.2's pin pass: fixed at their own
  stop and finer stops unless a pin set earlier is already fixed where they would stand (then hidden at that stop and
  reported), candidates that yield or hide at coarser ones. A pinned placement moves with its target under a warp or vertex move: its anchor and spine by §7.4's
  mean-value rule, re-seated inside the target, orphaned and reported when no room remains (VK2-13).
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — tested on the golden suite: identical model hashes headless (Node) and in Chromium, Firefox and WebKit,
  and identical S13b placements across them at every zoom stop (§13.3's per-stop placement digest). `moveLabel` (sets `LabelEntity.pinned`) and
  `hideLabel` (sets `hidden`) are logged model events (§7.1, §7.4), hashed. A
  scoped regeneration re-derives S13a only inside its scope (LC-17).

Chose "placement is view data, measured with our own font metrics" (GEO-29's options b and a together) over fitting
placement into the model because collisions change with the zoom inside a band (SCL-10), so a model placement would be
wrong between stops or recomputed per zoom anyway; and over measuring with the host's text engine because Chromium,
Gecko, WebKit and headless Node shape text differently.

=== REPLACE 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally ===

### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revisions fixall/integrate-r3, fixall/integrate-r2, drafted by fixall/draft-rendering-r2

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the default label face is IM FELL Great Primer,
  §17.2): `cmap`, `hmtx`, `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp`
  (small caps) and `onum` (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and
  kerning in font units become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin,
  ligatures off). Glyphs are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every
  backend and in SVG.
* **Font features, checked (N-12).** From M1, a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer, its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the
  same reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled
  to 0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar
  uses the face's default figures. The report of the style names the path each face took, and the census's floors
  (§9.4) run on whichever path is active.
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box ×
  the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14); both implementations, what they
  call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist lint, so S13b's inputs are
  bit-identical on every engine and the placement digests of §13.3 can be compared across the five engines (VS2-4); a
  symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`. Between stops the view uses the placement of the stop at or coarser than the
  current scale: zooming in only shrinks every label's world box, so no collision can appear, and crossing below a stop
  switches to that coarser stop's placement. Zero collisions therefore hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band, minus the
  labels that §9.4's rung (5) hands to a quarter at this stop, plus one candidate per `QuarterNode` that rung (5)
  activates — created once however many members yield to it, and not again when the stop's cut already labels that node
  — with the highest priority among its yielding members, the node's area and the node's own label id (N-11). Rung (5)
  is decided from geometry alone (whether a label fits its own face at the floor), so the set is known before any
  collision is tested.
* **The greedy.** Candidates at a stop are totally ordered by priority (title > quarter / district > water > landmark >
  gate > way > address), then larger target area, then id. A candidate takes its first alternate (its spines in order,
  then the ladder of §9.4) that meets no placed higher candidate, no obstacle and no fixed pin; otherwise it yields.
  This whole-map greedy is **evaluated locally**: deciding c first decides (memoised) every higher candidate whose
  alternate boxes meet c's; the dependency graph is acyclic because the order is strict, so the result is the same
  whichever tiles are computed first and whatever the viewport.
* **Pinned labels (N-28, NR3-3).** A pinned label (`LabelEntity.pinned`, a `PinnedPlacement`, §9.1) is shown only in its
  bands. At its own stop and at every finer stop it is placed exactly as the user left it, before any other candidate,
  by the **pin pass**: the pins eligible at the stop — in their bands, with their own stop at this stop or a coarser
  one — are taken in the order of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1), and each whose box at the stop meets no pin already fixed there becomes a **fixed
  pin** — an obstacle every candidate avoids. A pin whose box meets an already fixed pin is not fixed at that stop: as
  at a coarser stop, its only alternate is its own placement, which the fixed pin it meets blocks, so the pin is
  **hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k"). The pass is a greedy in a
  strict order, evaluated locally like the main greedy — deciding a pin decides, memoised, every earlier pin whose box
  meets it — so its result does not depend on which tiles are computed first. A pin's box is sized in pixels, so
  zooming in only shrinks it in world units: a pin fixed at stop k meets nothing at a finer stop that it did not meet at
  k, and a pin hidden at k is fixed again at the finer stops where the two boxes part. `moveLabel`'s dry run (§7.1)
  refuses a placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free
  position as the conflict's action — the **interactive guard**; the pin pass is the guarantee, because pins also come
  together without a `moveLabel`: a warp or vertex move carries them with the ground (§9.1, §7.4), a `setAttr` rename or
  an ids-scoped `rerollLayer(naming)` lengthens a pin's text (§9.6), and a `setStyle` changes the label face's widths.
  At a **coarser** stop a pin's world box grows, so it is not fixed there: it keeps its anchor and spine and enters the
  greedy as a candidate, at its entity's priority, whose only alternate is that placement — drawn when it meets no higher
  candidate, obstacle or fixed pin, and otherwise hidden at that stop and reported ("pinned label hidden at stops coarser
  than k"). Zero collisions therefore hold at every zoom with pins included. **Test (B-ZOOM, §13.4):** two pins 20 px
  apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text — at
  every stop 0 collisions, the later pin reported hidden at the stops where the boxes meet, and the per-stop placement
  digests (§13.3) identical after a replay of the log.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision).
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10).** ≤ 2 ms per stop for ≤ 2 000 visible candidates, in the tile worker (§12.7), from the
  `LabelTable` alone (§8.1, §8.9).

Chose fixed pins at their own and finer stops and yielding candidates at coarser ones over pins fixed at every stop,
because a pixel-sized box grows in world units as the view zooms out, so a pin fixed everywhere would collide at coarse
stops with other pins and higher labels, against "0 collisions at every zoom" (N-28). Chose a pin pass at placement
time over refusing, in their dry runs, the warps, renames, rerolls and style changes that bring two pins together,
because those edits are not about labels — a warp is continuous and a rename is the user's wording — so refusing them
for a label overlap would block edits the user means, while hiding a pin is a reported view change the user can undo
by moving either pin (NR3-3). Chose the `moveLabel` order over the greedy's priority order because `moveLabel`'s guard
already makes a new pin give way to the pins already there, so the pass keeps the pin that stood first, and a stored
`seq` does not change when a later edit changes a target's priority or area; the price is a `seq` on the pinned
placement and a 4-B `pinSeq` column (NR3-3). Chose to decide rung (5) from
geometry before the greedy over letting it fall out of collisions inside the greedy, because the quarter candidate must
have a fixed place in the strict order that the local evaluation relies on, and a candidate whose existence depended on
later outcomes would break that order (N-11).

=== REPLACE 11.1 Formats ===

### 11.1 Formats

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round trip byte-identical | the canonical form; import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and bridges as typed features; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (the §8.10 function at the finest band, overrides applied) with `species[]` (the §8.10 draw: the species kind of each instance), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below; NR-5) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13) by default as **outlines** — each glyph used is written once in `<defs>` as a path from the bundled face's own `glyf` outlines (quadratic segments as SVG `Q`), and each placed glyph is a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with the option `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | budgets at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for 837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) — and ≤ 60 000 elements; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | the band-streamed tile assembly of §8.8 at any DPI, rastered in the tile worker from the export's transient list (below; NR3-6); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
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
formats* — PNG, print and the `.dd2vtt` scene image — use a transient list too (NR3-6): the generation worker
builds it the same way, for the export's band and frame (including the live layers the export's layer set names, as
their providers stand at the request), and transfers it with the raster-export request (§8.9); the tile worker runs
S13b at the export stop over it with the export frame as the visible region, rasters the export's tiles from it by
§8.8's band-streamed assembly — each tile a resumable job in the queue's export class, below the view's work, and
each band's composition, read-back and encoding sliced the same way (§8.9) — streams the encoded bytes and a progress
message per band back, and releases the list; the generation worker wraps the VTT scene around the image. The export
therefore shows the model as it stood when it was requested, whatever is edited while its bands are rastered, and the
export dialog shows the bands done out of the bands total. Chose a transient list in the generation worker over
handing SVG to the tile worker because the SVG writer also reads the document (addresses, the supersedes table, layer
and entity metadata), which the tile worker never holds (N-4), and over keeping a second full list resident because
exports are occasional and the list is rebuilt in tens of milliseconds. Chose a transient list for raster exports as
well over rastering them from the view's list, because an A2 print takes up to ≈ 20 s and longer while the view
pre-empts it (§8.9), so an edit made meanwhile would reach the view's list between two bands and tear the picture —
bands above and below the edit drawn from two model states — and because the view's list holds the finer bands only
for the districts the view has visited, while the transient list is one model state, complete for the frame (NR3-6).

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

=== REPLACE 12.1 Reference hardware and how budgets are measured (SCL-15) ===

### 12.1 Reference hardware and how budgets are measured (SCL-15)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r2, drafted by fixall/draft-rendering-r2

* **Reference machine:** Apple M1 (4 performance + 4 efficiency cores) in a MacBook Air (MacBookAir10,1, fanless), 16 GB,
  macOS 14.7, Chrome stable and Node 24 — the machine on which every MFCG, FTG and NG bar in this document was recorded
  and on which the named mechanisms were timed (redteam-scale §7). The capture record
  (`captures/mfcg/2026-09-21T11-25-32/meta.json`) holds the CPU, 8 cores, arm64 and Node v24.12.0 but no memory size and
  no Chrome version (`chrome: null`); the model, memory and OS were read from the same host on 2026-09-25
  (`docs/validation/bench/fixall_rendering_r2_host.out`, N-27 b). Because the host is fanless, every timing batch starts
  after 30 s idle and runs ≤ 60 s, with `bench/calibrate` run before and after it; a batch whose two scores differ by
  more than 5 % is re-run.
* **Low-end device** (O12 b's ≥ 30 fps clause; the `low` hardware tier): Intel Core i3-10110U (2 cores, 4 threads, UHD
  Graphics 620), 8 GB, Chrome stable — or any machine whose calibration score is within ± 15 % of it.
* **Calibration benchmark** (`bench/calibrate`, fixed inputs): 5-octave fBm over 256² cells, a bucket-queue priority flood
  over 256², a 20 000-node Dijkstra, a 100 000-element typed-array sort, and, in browser runs, a Canvas2D raster of 32
  fixed tiles. Every score is stored with the host's CPU model and core counts, memory size, OS version, Node version
  and browser name and version (from the user-agent client hints), so a stored score always names its machine (N-27 b).
  CI divides every timing by (runner score ÷ reference score) before comparing it with a budget; the reference score is
  stored with the goldens.
* **Where each budget is measured (N-27 a):** model budgets in Node 24 (worker_threads for the pool) on every tier, and —
  in the nightly tier (§13.8) — again inside Chrome's worker on the same seeds and sizes; where the two figures differ
  by more than ± 15 %, the Chrome figure is the one checked against the budget (the product runs in browsers) and the
  difference is reported with both numbers. Frame, tile, first-map and label budgets are measured in Chrome
  (Playwright, GPU on). p50 and p95 are over B-CITY's seeds per rung and water setting.
* **Timing on shared runners (NR3-4).** A CI timing that gates a budget — the cost-model sweeps (§13.2), the first-map,
  settle and query runs (§12.5, §8.9), the export runs (§12.7), the pool comparison and the re-timing of a max-clause
  outlier (§12.3) — is taken in the **timing phase**: last in its tier, alone on the runner (no other suite, generation
  or browser running), in batches of ≤ 60 s with `bench/calibrate` before and after each, a batch whose two scores
  differ by more than 5 % re-run, and the pool size recorded with every timing. A timing taken while other suites share
  the runner — the nightly B-CITY set, which runs beside the invariant suite, B-FUZZ and B-EDIT (§13.8) — screens and
  never gates: a generation it flags is re-timed in the timing phase (§12.3). The phase costs ≤ 20 min of the nightly
  budget: the sweeps and the first-map runs are nine sizes × five seeds in Node and in Chrome (≈ 1–2 min of
  generating), while re-timing takes at most 20 generations × 3 runs per rung (≤ ≈ 3.5 min at the band tops). Chose one
  timing phase over a noise rule per check because runner contention inflates every gating timing the same way — a
  five-seed p95 is in effect a maximum — so every check that compares a time with a bound is protected once.
* **Confirming milestones.** Each budget of §12.3–§12.8 names the milestone that confirms it and the pre-decided change
  taken if it misses: model laws M1 (TOWN, CITY) and M2b (METROPOLIS), §12.3; first map, settle and re-raster M1 and
  M2b, §12.5; exports M1 (SVG, PNG) and M2b (METROPOLIS SVG), §12.7; memory M1 and M2b, §12.8.
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.

=== REPLACE 12.3 Model budgets on the one-click path ===

### 12.3 Model budgets on the one-click path

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

The primary configuration is one generation worker plus a **derivation pool** of up to three workers for the
per-district stages (S10 plots, S10b placement, S11 site plans, per-district greenery) — and the hinterland unit, which
runs the same stages on the generation worker concurrently (§4.1) — which run after the eager S10a allocation (LC-2) as
pure functions of eager upstream state and their district's own sub-stream, merged in district lineage order (§4.1,
§6.3; never address order, which a carried district does not share with its lineage — NF-D13, NF-P12). The
single-worker column is the pre-decided fallback: on the low tier, in hosts that forbid extra workers, and at every size
where the pool measures slower than a single worker or fails the digest check (*Which configuration is primary*, below;
NR3-1).

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 76 / 100 ms | 75 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 255 / 300 ms | 58 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 609 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95; used for every size inside a band, and fitted by the cost-model tests, §13.2): with the
pool, TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at
the 35 000-building cap: ≤ 1.9 s). Single-worker, through the fallback column's p95 at the same building counts: TOWN
≤ 20 ms + 71 µs × buildings; CITY ≤ 40 ms + 69 µs; METROPOLIS ≤ 100 ms + 67 µs. The table's rows are these laws at
1 333, 5 200 and 13 460 buildings — so its per-building column is 100 ÷ 1 333 = 75 µs, 300 ÷ 5 200 = 58 µs and
800 ÷ 13 460 = 59 µs (NR3-5) — and its p50 column is §12.4's critical path, the pool's frozen copies with their static
index partitions included (VK3-6); §12.5 adds the first frame to them.

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

**Measurement and fallback.** The laws are confirmed by the cost-model sweeps (§13.2, §13.8: every band's bottom,
target and top, five seeds each), taken in §12.1's timing phase, at M1 for TOWN and CITY and at M2b for METROPOLIS —
pass: at every size, the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10, each generation read against the law
at its own building count, since a size's building count varies with the seed. **Pre-decided fallback:** a miss
re-declares the law at the measured p95 as a D-18 amendment for the owner's veto (§12.5's path), and the tables here
and in §12.5 are re-derived from it.

**Which configuration is primary (NR3-1).** At the same milestones the timing phase runs every size of the sweep — the
band's bottom, target and top — with the pool (three workers) and with a single worker (pool size 0) on the same
generations (B-CITY-lite's 50 seeds × 4 water settings at that size, paired by seed and water setting), and the golden
run generates 200 seeds at pool sizes 0–3. The pool is primary at a size when (a) it passes the sweep rule above
against the pooled law, (b) its p95 there is below the single worker's p95 on the same generations, and (c) the model
digests are identical for pool sizes 0–3 on the 200 seeds. The outcomes are pre-decided:

* **(c) fails, or the single worker is faster at all three sizes of a rung** → the single-worker column becomes that
  rung's declared budget, the tables of this section are restated from the single-worker law, and O3 (d)'s clause is
  reported missed by the difference;
* **(b) fails at one or two sizes only** → each size range runs the configuration that was faster at the nearest
  measured size — the switch at the midpoint, in buildings, between two measured sizes whose winners differ — chosen at
  S0 from the request's population ÷ 3.4 persons per building (§12.2); pool size never changes the model (§3.3 step 5),
  so the choice is configuration, not output, and each range is budgeted by its configuration's law;
* **only (a) fails** → the pooled law is re-declared at the measured p95 as a D-18 amendment (the fallback above), and
  the pool stays primary wherever (b) holds.

A pool that runs exactly at its law passes (a): the default CITY request lands at 265–340 ms (the law at 4 500–6 000
buildings), where the single worker's law gives 351–454 ms, so the rule keeps the faster configuration. Chose to keep
the pool wherever it measures faster than a single worker, judged against its own law, over one bar at the target (the
pool's p95 ≤ 300 ms), because the law itself puts the default CITY request above 300 ms, so that bar would have
replaced the pool by the slower single worker exactly when the pool met its budget (NR3-1).

**The max clause, judged on confirmed outliers (NR-1, NR3-4).** The nightly B-CITY run (1 000 seeds × 4 water settings
per rung, §13.8) **screens** the clause: it records every generation's ratio T_i ÷ L(B_i) with its pool size. Those
timings are taken beside other suites, so each generation whose ratio exceeds 1.25 is **re-timed** three times in
§12.1's timing phase — alone on the runner, at its recorded pool size, with the calibration before and after — and is
a **confirmed outlier** when the median of its three re-timed ratios exceeds 1.25. When more than 20 generations of a
rung exceed 1.25, the 20 with the highest ratios are re-timed and the flagged count is reported: a regression slows
most generations, so the highest confirm it, while a contended runner flags a handful. Pass: no confirmed outlier. The
same rule judges the clause at its confirming milestones (M1 for TOWN and CITY, M2b for METROPOLIS). **Pre-decided
fallback:** a confirmed outlier re-declares the max clause at the largest confirmed median ratio (for example 1.4 × the
law) as a D-18 amendment, and this section's max columns are re-derived from it. Chose a max clause relative to each
generation's own law over one absolute maximum per rung because a generation's building count varies with its seed,
so only a ratio to its own law separates a slow generation from a large one. Chose confirmation by the median of three
solo re-timings over the maximum of the contended screen because one garbage-collection pause or scheduling stall of
≈ 60 ms on a ≈ 240-ms CITY generation — exactly the tail a maximum over 12 000 contended timings picks up — would
otherwise fail the gate with no change to the generator, and its fallback would then loosen the owner-facing promise
on noise; a generation that is really slow is slow three times out of three (NR3-4).

=== REPLACE 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (§8.9).
* **Trees:** placement ≤ 1 µs and drawing ≤ 2 µs per instance. A district-band view with 10 000 visible trees composes in
  one 16 ms frame from cached tiles, and its tiles raster in ≤ 30 ms of tile-worker time (O19 e, restated); the 200 000
  trees of a METROPOLIS are never all instantiated — only visible tiles generate instances. The stamp-tile asset (§8.10)
  is loaded and hash-checked at worker start in ≤ 5 ms per worker per session (≈ 0.03–0.06 ms for 8–16 classes,
  measured cost model, `docs/validation/bench/fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run
  time, so the first zoom to the district band carries no library build (NR3-7).
* **SVG** at METROPOLIS, city band: ≤ 650 B per building plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB
  per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face) (§11.1, N-13) — and ≤ 60 000
  elements, written in ≤ 2 s in the generation worker — the transient list's build (≈ 4 µs per building, ≈ 54 ms at the
  METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing, with the list released
  after it (§11.1; NR-5); Inkscape opens it within 120 s (§11.1).
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine **with the view idle**, the peak canvas one tile
  band; the transient list's build in the generation worker (≈ 4 µs per building at the city band — ≈ 21 ms at CITY —
  and more at the finer band a large print's scale selects; §8.7, §11.1) is inside it. View
  work pre-empts the export's steps (§8.9), so a pan or zoom during an export lengthens it by that work, which the
  export dialog's progress shows, and an animated view still leaves it one step in every 100 ms (NR3-6).
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at
  the city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths
  per (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a
  district-band SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time
  miss encodes the bands with zlib level 3 instead of 6 (the same pixels, a larger file). **Export beside the view
  (NR3-6):** B-CITY's browser run at M1 adds a scripted pan and zoom during an A2 300-dpi export of a CITY, in §12.1's
  timing phase — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte, the
  export made with the view idle and one during which an edit is made (§8.9, §11.1); pre-decided fallback:
  §8.9's `step(4)`. **The stamp-tile load (NR3-7)** is timed with the first map at M1, per worker from worker start to
  the library ready; pre-decided fallback on a miss: the per-session hash check moves to CI and the release build,
  leaving typed-array views over the bundled bytes.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration
  re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7); `compose()` ≤ 1 ms per building median at
  `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one tile's
  compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

=== REPLACE 12.8 Memory (what is counted, per rung) ===

### 12.8 Memory (what is counted, per rung)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

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
and the on-demand `compose()` and close-up caches (§8.6). These lines assume one kernel arena per layer (≈ 20 MB at
CITY with its typed lookup tables and its spatial index, §2.2; PLAUSIBLE until M1) plus one frozen arena copy per pool
worker (≤ ≈ 15 MB each at CITY at the one-click freeze, ≈ 20 MB at a freeze after edits; ≈ 37 MB at METROPOLIS; VK3-6) and each district overlay until it merges (§3.3), the compact entity store and the scoped undo records of
§2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at ≈ 11.4 MB at CITY
across the two threads that hold any of it. The earlier "≈ 6 MB per thread that holds it" undercounted the fixed
columns — 46 B per mark, now 54 B with the render key (N-9 c; §8.1 item 5) — and assumed a full copy in both the generation worker
and the tile worker (≈ 12 MB); keeping one full copy brings the corrected display list back under that figure. The pool's
frozen arena copies (≈ 45 MB at CITY with three workers at the one-click freeze, ≈ 60 MB at a freeze after edits;
`Map`-based tables would have cost each worker more heap and ≈ 10–20 ms of rebuild, VK2-9) are new in round 2 (§3.3); while a loaded document is verified, one pool worker holds
the replay's model in their place — no frozen copy is made while verification runs, because every edit made meanwhile
runs its per-district stages in the generation worker by the pool-size-0 path (§2.9 step 3; VD3-5), and the replay's
arena and entity columns are about the copies' size — or, with pool size 0, the generation worker holds it beside the working state (§2.9 step 3;
NR-8), and M1's memory measurement below includes the load verification of the reference 300-edit CITY document with a district
regeneration and a Re-derive from S3 made during it; the load's digest tree (≈ 1 MB at CITY, §6.2) sits in the
entity-store line, and a bridged client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until
the mismatch is settled (§2.9 step 4); the lines are kept and stay
PLAUSIBLE until M1 measures them, with the steps below as their pre-decided fallbacks.

**The CITY line, itemised (≤ 110 MB; VK3-6).** At the one-click freeze the fixed items are the arena (≈ 20 MB), three
frozen copies (≈ 45 MB) and the display list (≈ 11.4 MB across the tile worker's copy and the generation worker's
index) — ≈ 76 MB — leaving ≈ 34 MB for the **entity-store line** — the compact entity store with the load's digest tree
(≈ 1 MB) and, on a bridged client during a load mismatch, the kept `doc.load` bytes (≤ 3 MB) — and for the terrain,
hydrology and field rasters, the district overlays until they merge, the scoped undo records, the decoration and
placement memos and each thread's runtime baseline. At a freeze after edits the copies are ≈ 60 MB and the fixed items
≈ 91 MB, leaving ≈ 19 MB; that case has its own first fallback step below. All PLAUSIBLE until M1 measures them.

**Export-time peak (NR-5, NR3-6).** An export that draws holds a transient display list while it runs (§11.1) — SVG
in the generation worker while it writes; PNG, print and the `.dd2vtt` image in the tile worker, to which the list is
transferred with the request, until the last band is encoded (§8.9): ≈ 1.9 KB per building at the city band (§8.1 item 6's ≈ 10 MB for ≈ 5 200 buildings) — ≈ 2.6 MB at the TOWN
target, ≈ 10 MB at CITY, ≈ 26 MB at the METROPOLIS target and ≈ 67 MB at the 35 000-building cap
(`docs/validation/bench/fixall_rendering_r3_budgets.out`) — plus the file being written (≤ 650 B per building for SVG at
the city band, §12.7; a PNG's streamed bytes), both released when the file is transferred out. It is counted on top of
each rung's line as a peak, not in the steady working set, and one export runs at a time. A district-band export's
list — a district-band SVG, or a large print whose scale selects the district band (§8.7) — enters the size estimate
the export dialog shows before it starts; its size per band is measured with the export budgets below. A raster export
also holds canvases: one band (width × 512 × 4 B, ≈ 14 MB at A2 300 dpi, §8.8) and the canvas of the tile job in
progress (1 MB), counted with the canvases below. Measured
with the export budgets (M1 TOWN and CITY, M2b METROPOLIS, §12.7) — pass: within the stated figure + 25 %.
Pre-decided fallback: the transient list is built with only the attribute columns the sheet's programs read at the
export band, for every export that draws, (the attribute columns are up to ≈ 2.4 of the ≈ 10 MB at CITY, §8.1 item 6), the figure is re-stated at
the new measurement, and the export dialog's size estimate uses it.

**Canvas budget (N-9 b).** The need is 3P + 7 MB (4.25P + 7 MB with path-mode shadow layers), P being the worst-case
tile positions of the viewport at the tile DPR; each tier has a ceiling, and the tile DPR steps down until the need
fits it (§8.8). The reference view (1 440 × 900 at DPR 2) needs 112 MB; the low-end device's 1 366 × 768 or
1 920 × 1 080 at DPR 1 needs 43 or 67 MB. **During a raster export (NR3-6)** its ≈ 15 MB of canvases count on top of the
view's need: the reference view on the mid tier (112 + 15 ≤ 128 MB) and the low-end 1 366 × 768 view (43 + 15 ≤ 72 MB)
hold both; where the sum passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB) — the coarser-stop
fallback set is dropped for the export's duration (the need falls to 2P + 7 MB: 47 + 15 = 62 MB), and the export
dialog refuses a width whose band does not fit beside the reduced need, naming the widest that does.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS).
Pre-decided fallback if CITY exceeds its line at M1: the provenance and lifecycle-history columns leave the working set
for the document's on-demand block (SCL-20's archive) and are decoded only when inspected; if the line is still
exceeded at a freeze after edits, that freeze makes the laziness-contract copy of §3.3 step 1 — L0–L2, every L3
partition, and only the L4 partitions of the districts the pool derives (VK3-6); if the line is still exceeded, the
pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test
re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom runs, its coarser-stop fallback set is
dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached tiles only where they remain. The
document's size budget is §2.9's.

=== REPLACE 12.9 Reference comparisons and the declared trade ===

### 12.9 Reference comparisons and the declared trade

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

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
* **Declared trade (MFP-5, N-2, NR-1).** Chose a per-building cost of ≈ 58–75 µs at p95 (§12.3's laws at 1 333, 5 200 and 13 460 buildings; NR3-5) over
  matching MFCG's 12–39 µs because
  PLAT builds what MFCG does not — a heightfield with hydrology, frontage-first plots with yards and party walls, site
  plans with heights, roster siting, greenery by rule and collision-checked labels — which D-7 ranks above speed. The
  first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings
  (≈ 48 000 people); above that it grows to ≈ 2.3 s at the 120 000 cap, a miss of O12 (g) declared in §12.5 for the
  owner's veto. The model alone meets O3 (d)'s bars at p95 up to ≈ 4 500, 17 700 and 58 800 people and is slower above
  them — up to ≈ 0.2 s, 0.48 s and 1.9 s at the band tops — a miss declared in §12.3 for the owner's veto. Reversing the trade would mean dropping plot and site-plan detail from the one-click path, which the
  owner's plot-model ruling forbids.
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (≈ 17 700
  people), where a single worker holds it only up to ≈ 3 770, and moves the METROPOLIS one-second knee from ≈ 11 400 to
  ≈ 14 200 buildings (§12.5). M1 and M2b keep it primary only at the sizes where it measures faster than a single
  worker, with identical digests (§12.3; NR3-1).

## 3. Cross-area requests

The integrator applies these in the owning areas' sections. Every quoted "before" text was found exactly once in the
current `docs/ARCHITECTURE.md` (9 546 lines) by a whitespace-normalised search (33 strings). Each request names the
item it serves.

### 3.0 Other areas' round-4 requests to this area, and where they went

| from | request | where |
|---|---|---|
| kernel X-R1 (c) (VK3-6) | §12.3's p50 column CITY 253 → 255 ms, METROPOLIS 606 → 609 ms | folded into this file's §12.3 block (first table), with a pointer to §12.4's critical path |
| kernel X-R1 (a), (b) (VK3-6) | §12.4's merge row, critical path and the paragraph below | not in this file: §12.4 is not replaced here; the integrator applies X-R1 (a), (b) as written |
| kernel X-R2 (VK3-6) | §12.8's arena and copy figures; re-sum the CITY line; add the laziness-contract copy step for a freeze after edits | folded into this file's §12.8 block verbatim, with the re-sum written as *The CITY line, itemised* (≈ 76 MB fixed at the one-click freeze, ≈ 91 MB after edits, the rest named) and the step placed before the pool-shrinking step |
| determinism RR4-4 (VD3-5, VD3-1, VD3-4) | §12.8's verification paragraph and M1's memory measurement | folded into this file's §12.8 block verbatim; "the entity-store line" it names is the itemisation's |
| determinism RR4-1 (§9.6), RR4-2 (§11.3), RR4-3 (§12.6) | — | not in this file: those subsections are not replaced here; the integrator applies them as written |

### 3.1 Kernel (§3.1)

| # | section | request |
|---|---|---|
| K1 | §3.1, row **Poisson-disc / blue noise** (NR3-7) | replace "run once per session per scatter class to build the small set of ranked, periodic blue-noise tiles of §8 (MFCG's precomputed-tile trick); per-instance placement is the §8 stamp — the tile with a per-entity offset and rotation drawn from the entity's stream," with "run once per stamped class when the product is built (`plat/tools/stamptiles/`) to build the small set of ranked, periodic blue-noise tiles of §8.10 at a reference spacing of 4 m, shipped as a hash-checked asset (MFCG's precomputed-tile trick, moved to build time); per-instance placement is the §8.10 stamp — the tile with a per-entity offset, rotation and scale (the entity's spacing ÷ 4 m) drawn from the entity's stream,". |

### 3.2 Determinism (§6.1)

| # | section | request |
|---|---|---|
| D1 | §6.1 **Concern registry**, the `render.stampTiles` entry (NR3-7) | replace "(the stamp-tile library of §8.10: non-rerollable, attempt cap 0; its stream is keyed by a constant entity key over (stamp-tile domain, decoration class index, spacing in cm, tile index), with `STAGE_VIEW`; read by `@plat/kernel`'s `poisson` builder in the tile worker and the generation worker; NR-6 — appended, so no other key moves)" with "(the stamp-tile library of §8.10: non-rerollable, attempt cap 0; its stream is keyed by a constant entity key over (stamp-tile domain, decoration class index, the reference spacing 400 cm, tile index), with `STAGE_VIEW`; read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and in a worker only by the fallback rebuild of a tile whose hash differs; NR-6, NR3-7 — appended, so no other key moves)". The key's word order and count are unchanged, so the entry's position and every other key stay put. |
| D2 | §6.1 **Decoration** bullet (NR3-7) | replace "the stamp tiles themselves are a session library built from a constant key (§8.10; NR-6); the stamp's offset and rotation come from the entity's `render.instances` stream," with "the stamp tiles themselves are a library built from a constant key when the product is built and shipped as a hash-checked asset, one set per stamped class scaled by each entity's spacing (§8.10; NR-6, NR3-7); the stamp's offset, rotation and spacing come from the entity's `render.instances` stream,". |

### 3.3 Pipeline (§4.1, §4.10)

| # | section | request |
|---|---|---|
| P1 | §4.1, the pool paragraph's **Measurement** sentence (NR3-1) | replace "**Measurement:** M1 runs CITY with the pool and with one worker on B-CITY-lite; the pool stays primary if its p95 ≤ 300 ms and the model digests are identical for pool sizes 0–3 on 200 seeds (§12.3); M2b repeats the single-threaded METROPOLIS measurement as a second check." with "**Measurement:** M1 (TOWN and CITY) and M2b (METROPOLIS) run each band's bottom, target and top with the pool and with one worker on the same B-CITY-lite generations, in §12.1's timing phase; the pool stays primary at a size when its p95 is within the pooled law + 10 %, below the single worker's p95 there, and the model digests are identical for pool sizes 0–3 on 200 seeds, with §12.3's pre-decided outcomes — a size range where the single worker measured faster runs with pool size 0, which gives the same model (§3.3 step 5) (NR3-1)." |
| P2 | §4.1, *Judgment (J-P10 …)* (NR3-1) | replace "and the pool keeps CITY within 300 ms at its target and moves METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5)." with "and by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (a single worker: ≈ 3 770) and moves METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5)." |
| P3 | §4.10, the S14 sentence (NR3-6) | replace "a transient list for an SVG export in the generation worker (§11.1)," with "a transient list for each export that draws — SVG, PNG, print, the `.dd2vtt` image — in the generation worker (§11.1; a raster export's list is transferred to the tile worker with its request, §8.9),". |

### 3.4 Scope (§13.2, §13.3, §13.4, §13.7, §13.8, §14, §15.1, §16, Delegated decisions, Judgment calls)

| # | section | request |
|---|---|---|
| S1 | §14, `@plat/render` interfaces (NR3-2) | replace the line "`interface TileBackend { raster(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; tileLayer: 'base'\|'under'\|'shadow'\|'over'; shadows: 'off'\|'drop'\|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'\|'mid'\|'high'; dpr: number }): ImageBitmap }`" (two lines in the file) with §8.9's declarations, verbatim: `type TileAddress = { stop: number; i: number; j: number; dpr: number };` · `interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'\|'under'\|'shadow'\|'over'; shadows: 'off'\|'drop'\|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'\|'mid'\|'high'; dpr: number }` · `interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing (§8.9)` · `interface RasterJob { step(deadlineMs: number): boolean /* runs on from where it stopped; returns after the first draw call that ends deadlineMs or more after the call began; true when complete */; finish(): ImageBitmap; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between steps (§8.9; NR3-2)`. |
| S2 | §14, `@plat/export`, the `Exporter` comment (NR3-6) | replace "list = the transient export list for SVG; null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) and for raster formats, which send a raster-export request to the tile worker (§8.9)" with "list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms)". |
| S3 | §14, package map (NR3-7) | `@plat/kernel`: replace "poisson (stamped ranked tiles, built from a constant stream key, §8.10)" with "poisson (the stamped ranked tiles' construction from a constant stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10)". `@plat/render`: replace "shadow pass, decoration stamps, live layers" with "shadow pass, decoration stamps over the bundled stamp-tile asset (§8.10), live layers, the tile worker's queue of resumable raster jobs (§8.9)". |
| S4 | §13.2 **Cost-model tests** (NR3-4, NR3-6) | (a) replace "**The model max clause (NR-1):** every nightly B-CITY generation's model time ÷ its rung's law at its own building count ≤ 1.25 (§12.3), gating TOWN and CITY from M1 and METROPOLIS from M2b. All timings are normalised by §12.1's calibration score." with "**The model max clause (NR-1, NR3-4):** every nightly B-CITY generation's model time ÷ its rung's law at its own building count is recorded as a screen; a generation above 1.25 is re-timed three times in §12.1's timing phase and fails the clause only when the median of its three ratios exceeds 1.25 (the 20 highest when more than 20 are flagged; §12.3), gating TOWN and CITY from M1 and METROPOLIS from M2b. Every gating timing — the sweeps, the first-map runs, §12.3's pool comparison and these re-timings — is taken in §12.1's timing phase and normalised by its calibration score." (b) After "and fit §12.5's first-map laws (M1 for TOWN and CITY, M2b for METROPOLIS; nightly thereafter)." add "The same runs pan and zoom during an A2 300-dpi export of a CITY: every settle within §12.5's bound, the export completed and byte-identical to the idle-view export and to one during which an edit is made (§8.9, §12.7; NR3-6)." |
| S5 | §13.2 **Stage contract tests** (NR3-7, NR3-2) | replace "the stamp-tile hashes of §8.3 are equal in the generation worker and the tile worker on the five engines and equal to their stored value (NR-6)." with "the stamp-tile asset's tiles hash to their stored values in the generation worker and the tile worker, and `plat/tools/stamptiles/` rebuilds the asset byte-identical on the five engines (§8.3; NR-6, NR3-7); a tile rastered whole and in 1-ms slices is pixel-identical (§8.3; NR3-2)." |
| S6 | §13.3, `ShiftRecord.tiles` and the view-shift paragraph (NR3-7) | (a) "tiles?: { tile: string /* class, spacing, tile index (§8.10) */;" → "tiles?: { tile: string /* class, tile index (§8.10) */;". (b) Replace "The stamp-tile hashes of §8.3 are stored with the placement digests; a stored hash that moves while every model digest holds is a view shift of the same kind — a `ShiftRecord` with stage `render.stampTiles` and `outputVersion: null`, bumping the style version of every shipped sheet that draws stamped classes (NR-6)." with "The stamp-tile asset's stored hashes (§8.10) are kept with the placement digests; a release whose asset moves a stored hash while every model digest holds is a view shift of the same kind — a `ShiftRecord` with stage `render.stampTiles` and `outputVersion: null`, bumping the style version of every shipped sheet that draws stamped classes (NR-6, NR3-7); an asset that only adds a new class's tiles moves no stored hash and needs no record." |
| S7 | §13.4 **B-ZOOM** (NR3-3) | after "0 collisions at settled views and through a scripted zoom sweep," insert "the pin pass's fixture — two pins brought together by a warp and two by a rename that lengthens the earlier pin's text: 0 collisions at every stop, the later pin reported hidden where the boxes meet, and the placement digests identical after a replay (§9.2; NR3-3) —". |
| S8 | §13.7, row **O19 (d) canopy**, fallback column (NR3-7) | replace "the stamp tiles' minimum distance is raised to the threshold (a table value)" with "the class's stamp spacing range (a table value, §4.9) is raised until its lower end meets the threshold — the scaled tiles' minimum distance is the entity's own spacing (§8.10), so the shipped asset does not change". |
| S9 | §13.8 tiers (NR3-4, NR3-7, NR3-1) | Nightly row: (a) "B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and §12.3's model max clause on every generation;" → "B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and the screen of §12.3's model max clause on every generation;"; (b) "the placement digests and the stamp-tile hashes in both workers (§8.3);" → "the placement digests, the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, and the sliced-raster census rows (§8.3);"; (c) "cost-model sweeps (nine sizes — every band's bottom, target and top — × five seeds, with the F-WORK flatness check) and the first-map runs at the same three sizes per rung (§12.5);" → "and, last and alone on the runner, **the timing phase** (§12.1; ≤ 20 min): the cost-model sweeps (nine sizes — every band's bottom, target and top — × five seeds, with the F-WORK flatness check), the first-map runs at the same three sizes per rung (§12.5), the model budgets inside Chrome's worker and the re-timing of the max clause's flagged generations (§12.3);" (move "the model budgets re-measured inside Chrome's worker on the same seeds …" into it). Milestone row: before "memory and document-size tests at every rung" add "§12.3's pool comparison in the timing phase at every rung the milestone confirms;". PR row: add "the stamp-tile asset's loaded hashes against their stored values (§8.10)". |
| S10 | §15.1, row **B19** (NR3-7) | "§8.10 stamped ranked tiles (Poisson k = 50, built once per session)" → "§8.10 stamped ranked tiles (Poisson k = 50, built when the product is built and shipped; scaled per entity by its spacing)". |
| S11 | §16 build plan (NR3-1 – NR3-4, NR3-6, NR3-7) | M1 exit: (a) replace "(the pool stays primary if its CITY p95 ≤ 300 ms and digests are identical for pool sizes 0–3 on 200 seeds, else the single-worker column is declared)" with "(the pool primary at each size where §12.3's rule keeps it — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes)"; (b) "the model max clause at TOWN and CITY (§12.3);" → "the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3);"; (c) after "the furniture and snap query round trip (§8.9);" add "the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the pin-pass B-ZOOM fixture (§9.2);". M2b exit: "the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8);" → "the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8);". |
| S12 | Delegated decisions, **D-18** (NR3-1, NR3-4) | replace "with the derivation pool as the primary configuration and the single worker as the pre-decided fallback (measured at M1 at CITY and at M2b at METROPOLIS);" with "with the derivation pool as the primary configuration at every size where it measures within its law + 10 %, faster than a single worker and with identical digests, and the single worker as the pre-decided fallback elsewhere (§12.3's rule, measured at M1 at TOWN and CITY and at M2b at METROPOLIS); the max clause judged on outliers confirmed by solo re-timing (§12.3);". |
| S13 | Delegated decisions, **D-11** (NR3-7) | "**Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once per session; per-instance placement is the stamp (§8.10)**" → "**Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once, when the product is built (a hash-checked shipped asset, scaled per entity by its spacing); per-instance placement is the stamp (§8.10)**". |
| S14 | Judgment calls (all) | restate J-R17, J-R38, J-R40 and J-R42 and append J-R44 – J-R49 as §3.5 gives them; amend J-P10, J-R18 and J-10 as §3.5 gives them; the preface's round list gains "Round 4 (rendering) added J-R44 – J-R49 and restated J-R17, J-R38, J-R40 and J-R42 (and amended J-P10, J-R18 and J-10)" after "Round 3 added J-K22 – J-K27, J-DET-29 – J-DET-39, J-P34 – J-P40, J-R38 – J-R43 and J-S28 – J-S32 …". |
| S15 | §14, the `@plat/labels` comment under `RoleIndex` (NR3-6) | replace "and in the generation worker over an SVG export's transient list (§11.1);" with "in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1);". |

### 3.5 Judgment-call rows (restated, amended and new)

| id | row |
|---|---|
| J-R17 (restated) | Chose a per-building cost of ≈ 58–75 µs at p95 over matching MFCG's 12–39 µs because PLAT builds what MFCG does not, which D-7 ranks above speed; the first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), and the slower first map above that — ≈ 2.3 s at the 120 000 cap — is declared for the owner's veto rather than hidden behind a preview (§12.5, §12.9; NR3-5). |
| J-R38 (restated) | Chose to read O3 (d)'s model-time bars over every size a rung builds and to declare where they hold — p95 up to ≈ 4 500 / 17 700 / 58 800 people, the max (each generation ≤ 1.25 × its own law) up to ≈ 3 400 / 13 600 / 45 800 — and the miss above them for the owner's veto, over reading them at the targets only, because size follows population inside a rung, as N-2 ruled for the first map, and a reading at the targets hides the miss; and chose to judge the max on outliers confirmed by the median of three solo re-timings over the maximum of the contended nightly screen, because one scheduling stall on a shared runner would otherwise fail the gate and, through the fallback, loosen the promise on noise (§12.3; NR-1, NR3-4). |
| J-R40 (restated) | Chose furniture-placement and snap queries answered by the tile worker within one frame — the first class of its queue, served between the steps of resumable raster jobs (`TileBackend.begin` → `RasterJob.step(8)`) — over copying mark kinds and vertices into the main thread's hit-test slices or placing furniture in the generation worker, because the slices would carry model-sized geometry and the generation worker's index has no kinds, vertices or placed labels; and chose the resumable job over a synchronous raster call because a worker serves its message queue only between calls (§8.9; NR-4, NR3-2). |
| J-R42 (restated) | Chose a constant stream key for the stamp-tile library — (class, reference spacing, tile index), `STAGE_VIEW`, `render.stampTiles` — with integer-centimetre points, `dmath` transcendentals, index-order sums and ties and the stated removal update, built when the product is built by `plat/tools/stamptiles/` and shipped as a hash-checked asset, over a seed- or document-keyed library and over building it in each session, because the tiles are shared by every document, session and host, the per-town variety comes from the stamp's offset, rotation, spacing and seed-dependent variant, and a session build ran unbudgeted on the first district-band settle in both workers (§8.10; NR-6, NR3-7). |
| J-R44 | Chose to keep the derivation pool primary at each size where it runs within its law + 10 %, measures faster than a single worker on the same generations and gives identical digests for pool sizes 0–3 — each size range otherwise running the configuration faster at the nearest measured size — over one bar of p95 ≤ 300 ms at the CITY target, because the pooled law itself puts the default CITY request at 265–340 ms, so that bar would have replaced the pool by a single worker ≈ 85–115 ms slower exactly when the pool met its budget, and pool size never changes the model, so choosing per size range is configuration only (§12.3; NR3-1). |
| J-R45 | Chose a pin pass at placement time — a stop's pins in `moveLabel` order, a pin meeting an earlier fixed pin hidden at that stop and reported — with `moveLabel`'s refusal kept as the interactive guard, over refusing the warps, renames, rerolls and style changes that bring pins together, because those edits are not about labels and must not be blocked by one, while hiding a pin is a reported view change; and chose `moveLabel` order over priority order because the guard already gives the pin that stood first precedence and a stored `seq` does not move when priorities or areas change (§9.1, §9.2; NR3-3). |
| J-R46 | Chose four fixed classes in the tile worker's queue — queries, incoming deltas and band answers, the visible view, exports — run one resumable step at a time, with an export that has waited 100 ms given one step, over first-come order and over strict priority alone, because an A2 print's bands would otherwise hold newly exposed tiles behind up to ≈ 20 s of export work and strict priority lets an animated view stop an export; and chose to apply deltas ahead of the view's rasters because every tile that waits for one is visible work (§8.9; NR3-6). |
| J-R47 | Chose a transient display list, built by the generation worker and transferred with the request, for PNG, print and `.dd2vtt` exports, over rastering them from the view's list, because an edit made during a long export would change the view's list between two bands and tear the picture, and the view's list holds finer bands only for the districts the view has visited; the price is the export-time peak §12.8 already counts for SVG, now held in the tile worker, and its canvases counted against the tier's ceiling (§11.1, §12.8; NR3-6). |
| J-R48 | Chose one set of four stamp tiles per class at a reference spacing of 4 m, scaled per entity by its spacing ÷ 4 m, over a set per (class, spacing), because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of members per class (≈ 19 ms each to build, megabytes as an asset), while uniformly scaled blue noise keeps its property, its ranks and its ordinals at one multiplication per point (§8.10; NR3-7). |
| J-R49 | Chose a timing phase — every gating CI timing taken last in its tier and alone on the runner, in calibrated batches — over a noise rule per check, because runner contention inflates every gating timing the same way (a five-seed p95 is in effect a maximum), so one mechanism protects the sweeps, the first-map runs, the pool comparison and the max-clause re-timings at ≤ 20 min of the nightly budget (§12.1; NR3-4). |
| J-P10 (amended) | replace "the pool is the primary configuration once M1 measures identical digests for pool sizes 0–3 and CITY p95 ≤ 300 ms, and the single worker is the pre-decided fallback (§12.3), with M2b measuring METROPOLIS single-threaded." with "the pool is the primary configuration at each size where M1 (TOWN, CITY) or M2b (METROPOLIS) measures it within its law + 10 %, faster than a single worker on the same generations and with identical digests for pool sizes 0–3, and the single worker is the pre-decided fallback elsewhere (§12.3; J-R44)." |
| J-R18 (amended) | replace "so they run in parallel without shared writes (§12.9). \|" with "so they run in parallel without shared writes; M1 and M2b keep it primary only at the sizes where it measures faster than a single worker (§12.3, §12.9; J-R44). \|". |
| J-10 (amended) | replace "the ranked tiles are built once per session (§8.10);" with "the ranked tiles are built once, when the product is built, and shipped (§8.10; J-R42);". |

## 4. CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED (executed in this lane).** (1) `fixall_rendering_r4_stamptiles.mjs` run on the reference machine (Apple M1,
Node 24.12), its output committed; the figures quoted in §8.10 and §12.7 are its medians. (2) The twelve blocks applied
to a copy of `docs/ARCHITECTURE.md` by script and `docs/validation/bench/doc_checks.py` run on that copy over the
twelve changed subsections: exit 0 — identifiers 5 hits, colours 0, token 3-grams 28 hits, all already reviewed in the
allow file (six first-run hits of ordinary phrasing were reworded, not allowed), tables 0, pointers 2 already reviewed.
(3) Every "before" string of §3 (33) found exactly once in the current file, whitespace-normalised. (4) The arithmetic
re-derived: 100 ÷ 1 333 = 75.0, 300 ÷ 5 200 = 57.7, 800 ÷ 13 460 = 59.4 µs; the pooled and single-worker laws at
4 500–6 000 buildings (265–340 and 351–454 ms) and the single worker's CITY knee (3 768 buildings); the itemised CITY
line (20 + 45 + 11.4 ≈ 76 MB, and ≈ 91 MB after edits); the canvases during an export (112 + 15 ≤ 128, 43 + 15 ≤ 72,
67 + 15 > 72 → 47 + 15 = 62 MB); the timing phase (≈ 74 s of sweeps and first-map runs, ≤ ≈ 195 s of re-timing at the
band tops). (5) A diff of every block against the section it replaces shows only the changes §1 lists.

**PLAUSIBLE (this seat's reasoning; no engine exists).** That each mechanism defeats its scenario in an implementation:
that one native call or derived operation bounds a step's overrun well inside a frame (the measurement logs the
longest call per tile); that one export step per 100 ms keeps settles inside §12.5 (≤ 16 / 24 ms beside 42–83 ms of
raster); the remainder of the itemised memory line (the entity store, rasters, overlays, undo records and baselines
inside ≈ 34 MB, ≈ 19 MB after edits — the fallback steps are there for the second); the size of a district-band
transient list for a large print (measured at M1 with the export budgets); that scaled blue noise looks as good as
per-spacing tiles (it is the same point set at another scale, so its spacing statistics scale exactly). The benchmark
is a cost model — a software exponential standing in for `dmath.exp`, a mixer standing in for H128 — not the
product's code.

**What a Fable reviewer should re-check first.** (1) **NR3-7's redesign** beyond the required change: one tile set per
stamped class at a 4-m reference spacing, scaled per entity, because the spacing is drawn per entity in centimetres
(§4.9's ranges, §8.10's `render.instances` row) and a per-(class, spacing) library is unbounded — confirm the premise
and that scaling is acceptable to the owner's eye (J-R48). (2) **NR3-6's transient list for raster exports**, which
changes NR-5's accepted "rastered from its own list" to close a torn-export defect the new priorities make likelier —
check the moved memory peak (now in the tile worker) and the low-tier canvas rule (J-R47). (3) **NR3-3's order key**:
the `moveLabel` `seq` stored on the pinned placement (a model-schema addition) over the greedy's priority order (J-R45).
