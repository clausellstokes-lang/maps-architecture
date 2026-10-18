# m0-coverage / read-kernel — what the kernel and packages provide today (reader's record)

Lane: m0-coverage/read-kernel (opus; J394, Fable-validated). Reader only: this record judges nothing; it records what
the texts and code say, each fact with its cite (file:line, paths relative to the repository root unless noted) and
marked READ (seen in the text or code) or INFERRED (drawn from what was read, not stated). Started 2026-10-18 09:13Z.
No git command was run; no Node 24 is on PATH (`node -v` = v22.22.0 at /opt/node22/bin/node) and none is in the lane
scratchpad, so no test was run — every test fact below is from reading test files, not from executing them.

## Files read (line counts and md5s; table filled as reading proceeds)

| file | lines | md5 | how read |
|---|---|---|---|
| plat/packages/kernel/API.md | 1059 | 468a2d1e353b46a955bed2c283ec28e7 | whole |

## Facts, in the order found

### A. plat/packages/kernel/API.md (read whole)

- A1. Only one package carries an API document: `plat/packages/kernel/API.md`; `model`, `site`, `layout`, `tables`,
  `testkit` have no API.md (directory listing `ls plat/packages/*/`; `find -name "API*.md"`). READ.
- A2. API.md documents `@plat/kernel` 0.0.0, source as of 2026-10-07, milestone M0; Appendix B generated 2026-10-07
  from `src/index.ts` (669 names: 419 values, 250 types); "a name added after this date is not listed until
  regenerated" (plat/packages/kernel/API.md:3, :9-10, :1006-1009). READ. Revised 2026-10-17 only to add the K11 row
  (API.md:12-14); Fable-reviewed 2026-10-18 PASS-WITH-CORRECTIONS (API.md:16). READ.
- A3. Scope statement: an exact-geometry library for a planar subdivision on an integer centimetre lattice; "no
  curves are stored (only straight edges between lattice points), no 3-D, no floating-point coordinates in the
  arena"; "not thread-aware" (API.md:22-25, :38-42). READ.
- A4. No domain knowledge in algorithms, but host vocabulary ships: 56 roles fixed at load from `src/arena/roles.json`
  with "no runtime API to supply your own registry" (API.md:44-50); role names the kernel branches on (`anchor`,
  `deck_end`, `gate_end`, `raised_foot`, `band`) fixed in source (API.md:52); `LINEAR_PARTS` (API.md:53); 93 RNG
  concerns and the stage registry (API.md:54); face kind `residue` (API.md:55). READ.
- A5. Level names are "design only": the kernel treats L0–L4 as five nested refinement levels; the host names them
  land/water, way skeleton, corridors/blocks, plots, footprints (API.md:56). READ.
- A6. Coordinates: integer cm, branded `Cm`; `+y` north; outer rings CCW, holes CW (API.md:91-94). Lattice constants:
  unitCm 1, minEdgeCm 25, attractCm 26, minFaceAngleCdeg 500, rangeCm 8 388 608 = 2^23, |x|,|y| < 2^23 (~83.9 km)
  (API.md:95-104). The range bound keeps differences < 2^24 and orientation determinants < 2^49 (API.md:106-107).
  Angles in centidegrees (i32); derived values not stored (skeleton nodes, OBB corners) are doubles (API.md:108-109).
  `snap` is the one door from number to lattice; rounds half away from zero; refuses NaN/inf/>=2^23 (API.md:110-112).
  READ.
- A7. `frameOf(areaM2, aspect, marginShare)` gives a centred rectangle; aspect in [0.5, 2] (API.md:116-120). READ.
- A8. Arena identity `PlatKey = { layer: Layer; part: number }`, `Layer = 'underground' | 'ground' | 'sky'`
  (API.md:131-134). The `Plat` holds five `LevelFaces`, one per level (API.md:136-139). READ.
- A9. Slots valid only until the next commit; never persisted (API.md:141-143). Spatial index required before any
  transaction (API.md:146-148). READ.
- A10. Levels: five refinement levels as views; every edge carries a birth level; level-n view = edges of level <= n;
  every level-(n+1) face has exactly one parent at level n; a transaction writes one level; writing coarser is
  `E_LEVEL`; Steiner vertices; kept content by stage rank, `E_KEPT` (API.md:151-166). READ.
- A11. Owners: one owner per face record per level, `Id = string`; roles as rows (role, entity, level, ordinal);
  `ChainProfile` (knotRole, values, interp linear|step) is the one "value along a chain" form (API.md:168-180). READ.
- A12. Persistent reference forms FaceRef, ChainRef, EdgeSetRef, VertexRef, StretchRef (API.md:182-196). READ.
- A13. `KernelTx` fields: key (a `TransientKey` "is accepted by shape and refused: not built"), level, ops, expect,
  onFail, batch, stage, rederivesFrom, `clearRegion?` "refused notBuilt('M3a')", `prepared?` "refused
  notBuilt('M3a')", workLimit (API.md:202-216). `BatchScope` kinds stage | district | block | edit | entity
  (API.md:219-220). READ.
- A14. Two op forms (callback; declared with canonical order by op-kind rank, lineage key, index); atomic commit or
  reject; work limits are operation counts, machine-independent (API.md:222-249). Injected services via `TxEnv`:
  floors, appliesTo, width, checks, rankOf, repair, chainParts, invariants, onCommit; "The kernel imports no tables"
  (API.md:251-253). READ.
- A15. Determinism (section 4): exact predicates; no slot-dependent output; canonical op order (run 2026-10-07);
  dmath = fdlibm 5.3 "to the bit on every host"; xoshiro128** RNG keyed by 128-bit key; 128-bit MurmurHash3 level
  digests, "no double enters"; work not time; `ENGINE_VERSION`, `ARENA_BLOCK_FORMAT`, `ROLE_REGISTRY_VERSION` version
  output-moving changes (API.md:262-288). READ. Math lint is "enforced by a lint rule in the host project, not by the
  package — UNVERIFIED for your build" (API.md:276-277). READ.
- A16. Failure contract: `KernelResult`; 18 error codes; `E_LOCKED` and `E_SCOPE` declared, "no M0 operation
  produces them — their features are not built" (API.md:294-309). Warning codes include `W_HEIGHT_CLAMPED`
  (API.md:314-316). N-44 rule: no throw on valid input, no silent wrong result, counted capped refusal rate (target
  1 per 10^4); "the kernel exposes no runtime refusal counter"; measured rates UNVERIFIED in the doc (API.md:330-348).
  READ.
- A17. Getting-started example creates a 200 000 x 200 000 cm frame (2 km) and `attachIndex` with
  `gridCellCm: [800, 400, 200, 100, 50]` — one cell per level (API.md:363-366). READ.
- A18. Façade `Kernel`: plat, view, resolve, geom, index, tx, rng, `pool: NotBuiltStub<'M1'>`, assertCurrent
  (API.md:420-432). `ArenaKey = PlatKey | TransientKey` (API.md:442). READ.
- A19. Declared ops: 17 writer kinds in `OP_KINDS` (API.md:470-473). READ.
- A20. insertChain processing steps and class outcome table; fidelity bound 2·sqrt2·attractCm ≈ 73.5 cm
  (API.md:339-341, :489-517). READ.
- A21. `clearFiner` "Returns conflicts (always [] at M0: locks and pins are not built)" (API.md:563-564). READ.
- A22. Faces ops (splitFace, connectHole, mergeFaces, absorbSliver, radialSplit, ringBand, claimSubFace); claimSubFace
  score form "not built" (API.md:582-603). READ.
- A23. Booleans, buffer, offsetFace, insetRing, tileRings run on a scratch arrangement; round joins with chords of
  <= 2 cm sagitta (API.md:607-664). READ.
- A24. Bands: kerb, corridorUnion (commits at L2), bandUnion (API.md:668-702). READ.
- A25. Geometry services: hull, obb, lir, regularFit, sideRuns, sampleBoundary, faceRings, hexLattice, skeleton (use
  roof | spine | regions; typed downgrade; refuses only E_OUT_OF_RANGE; event limit >= 4(n+r)+64), simplify, orient,
  area2/area2Big; curves, dijkstra/astar, medialAxis, delaunay, voronoi; noise `noiseStream` octaves 1..16
  (API.md:706-756). READ.
- A26. Warp is the only door for moving vertices; strength halved at most 8 times then a reported no-op; refusal only
  E_WORK_LIMIT (API.md:760-776). READ.
- A27. Spatial index: `IndexConfig { gridCellCm: number | Five<number>; partitionOf? }` (district membership of L2–L4
  items); static packed partitions (flatbush) + dynamic grid; rebuilt at stage end, overflow, freeze
  (API.md:781-789). READ.
- A28. Serialisation: one routes chunk (levels <= 1) and one chunk per non-empty L2–L4 static partition, content
  addressed by H128; `decodeArena` corrupt cache is `E_INVARIANT` "corrupt-cache: " (API.md:866-882). READ.
- A29. RNG: `stream(entityKey, stage, concern, opts)`; (key, stage, concern, reroll, attempt, epoch, salt); Stream
  draws u32, float01, int, bool, normal, bell4, mean3, fuzzy, weighted; Deck (API.md:896-913). READ.
- A30. Not built (section 8, `STUB_TABLE`): `geom.transientArena`, `geom.readBack`, `geom.release` (stub, "M6-P");
  `KernelTx.key` as TransientKey throws; `geom.resolveVertexAt` stub; `Kernel.pool` stub; claimSubFace score form
  throws; `clearRegion`, `prepared` throw; `sampleProfile` of an Order-valued profile throws; "replaceable
  `Plat.frame`, multi-part `PlatKey.part` use — hooks (nothing refused)" (API.md:928-944). READ.
- A31. Performance: O(touched) checks; transaction before-image is O(arena) (C-0185 (1)); partitions rebuilt when
  overflow > max(256, 1/4 static size) (API.md:948-958). READ.
- A32. Stability: 0.0.0, private, UNLICENSED, "No compatibility promise"; raw arena primitives exported but "treat
  them as internal"; design-vs-code differences: `CommitRecord.key` typed PlatKey (design: ArenaKey)
  (API.md:964-981). READ.
- A33. API.md never mentions a Z coordinate, height, elevation or a datum in the arena; the only height word is the
  warning code `W_HEIGHT_CLAMPED` (API.md:315) — no arena field for it is listed in section 3.2 (API.md:136-139). READ
  (absence across the whole file read); what produces `W_HEIGHT_CLAMPED` is not stated in API.md. READ.

### B. The kernel as built (plat/packages/kernel/src; every file listed, `grep -n "^export"` of each kept at the lane
scratchpad `kernel-exports.txt`, 1,280 lines)

- B1. The kernel src has 21 module folders re-exported by `src/index.ts` (num, hash, dmath, rng, registry, arena, index,
  insert, tx, faces, arr, geom, skeleton, medial, warp, invariants, io, facade, noise, digest, types) plus an
  `adapters/` folder (delaunator, flatbush, robust-predicates, simplex-noise) reached through medial/num/noise/index
  re-exports, not directly (plat/packages/kernel/src/index.ts:3-23; plat/packages/kernel/src/medial/index.ts:5;
  src/num/index.ts:11; src/noise/index.ts:18). READ. 160 .ts/.json source files, 259,106 lines including tests and
  vectors in the package listing (lane scratchpad listing.txt). READ.
- B2. Levels: `type Level = 0 | 1 | 2 | 3 | 4` with the doc comment "L0 land/water · L1 way skeleton · L2 kerbs,
  corridors, blocks · L3 plots + residue · L4 footprints + yard parts" (plat/packages/kernel/src/types/ids.ts:10-11);
  `LEVELS = [0,1,2,3,4]` (src/arena/plat.ts:35); `isLevel` accepts only 0..4 (src/arena/plat.ts:238-240); `tx` open
  checks "a batch level is 0 … 4" (src/tx/tx.ts:85). The level count is fixed at five in the type, in `Five<T>`
  tuples (src/arena/plat.ts:32) and in every per-level column. READ.
- B3. Layers: `type Layer = 'underground' | 'ground' | 'sky'`; `PlatKey = { layer; part }` "allocated once and never
  reused" (src/types/ids.ts:13-17); `isPlatKey` requires part integer 0..0x7fffffff (src/arena/plat.ts:243-246). READ.
  Layer code exists in the RNG key and the arena block (src/rng/layer.ts:8; src/io/format.ts:27-41). READ.
- B4. Coordinates: vertex columns `x: Int32Array; y: Int32Array` — no third coordinate column; vertex `level`
  Uint8Array and `flags` Uint8Array (src/arena/plat.ts:52-62). READ. `snap` refuses `!(Math.abs(v) < 2**23)` in every
  build (src/num/snap.ts:13-19); `LATTICE.rangeCm: 8_388_608` (src/num/lattice.ts:16-22). READ. The lattice comment
  says "§3.2 (1)'s range bound is taken at the population cap and the extreme aspect" (src/num/lattice.ts:4). READ.
- B5. `frameOf` refuses a frame whose arena (frame plus marginShare of its side on every side) would reach |x| or |y|
  >= 2^23 (src/num/frame.ts:19-40). READ. With the base margin share 0.3 (src/num/frame.ts:15) the reach is 0.8 of a
  side, so the largest frame side is just under 2^23 / 0.8 ≈ 10 485 760 cm ≈ 104.9 km. INFERRED (arithmetic on
  src/num/frame.ts:33-36).
- B6. Frame: rectangles only, "frame growth at an epoch is M4's (§4b; `Plat.frame` stays replaceable)"
  (src/num/frame.ts:1-3); `Plat.frame` "replaceable by the frame growth of an epoch (M4) or a Re-derive"
  (src/arena/plat.ts:150-151). READ.
- B7. Integer policy: arena coordinates are i32 typed arrays bounded by 2^23 (B4); angles are `Cdeg` i32
  (src/types/units.ts:14-15); metres `M` are "a derived or reported length, never an arena coordinate"
  (src/types/units.ts:11-12); `CmArray = Int32Array` (src/types/units.ts:17-18); stage ranks are u8 — `rankOf`
  checks 0..255 "A u8 stage rank" (src/tx/tx.ts:70-75); face `stage: Uint8Array` (src/arena/plat.ts:90-91). READ.
- B8. Arena size limits: every table starts small (defaults vertices 64, edgePairs 64, faces 16 …) and grows by
  doubling (src/arena/plat.ts:194-196, :323-330); `positive()` caps any requested capacity at 0x40000000
  (src/arena/plat.ts:207-210); role kind u16 with `MAX_ROLE_ID = 0x7ffe` (src/arena/registry.ts:32;
  src/arena/plat.ts:103-104); ordinals u16, `MAX_ORDINAL = 0xffff` (src/arena/rows.ts:18; src/arena/plat.ts:109-110);
  `IndexHome` partition columns are Int16Array, `MAX_PARTITIONS = 32_767` (src/arena/plat.ts:121-128;
  src/index/spatial.ts:47). No vertex-count ceiling other than the typed-array growth and Int32 slot ids is declared.
  READ (the absence: INFERRED from the whole of plat.ts:1-400 read).
- B9. A Plat is struct-of-arrays: "Typed-array tables only: no Map or Set is reachable from a Plat"
  (src/arena/plat.ts:147); the re-read rule after growth (src/arena/plat.ts:167-178). READ.
- B10. Transient arenas: `TransientKey = { transient: true; owner: Id; n: number }` declared
  (src/facade/types.ts:27-28); `Kernel.view` comment "a transient arena's (level 0 only) is M6-P's"
  (src/facade/types.ts:151); the façade's `platOf` throws `notBuilt('M6-P')` for any TransientKey
  (src/facade/kernel.ts:96-97); `tx` open throws `notBuilt('M6-P')` (src/tx/tx.ts:83); `geom.transientArena`,
  `readBack`, `release` are `NotBuiltStub<'M6-P'>` objects (src/facade/types.ts:111-113; src/facade/kernel.ts:256-258).
  `tileRings` (the seed clip) is built at M0 "though its reader, the transient arena, is M6-P's"
  (src/arr/tileRings.ts:1-4); the `seed-tiling` invariant row is declared for M6-P and vacuous on a plat
  (src/invariants/rows.ts:32; src/invariants/batch.ts:683-685). READ.
- B11. The stub table (`STUB_TABLE`, 12 rows): transientArena/readBack/release (M6-P stub), KernelTx.key TransientKey
  (M6-P refused, tx/tx.ts), resolveVertexAt (M2a stub), pool (M1 stub), claimSubFace score form (M1 refused),
  KernelTx.clearRegion (M3a refused), KernelTx.prepared (M3a refused), sampleProfile Order-valued (M2b refused),
  `Plat.frame (replaceable)` (M4 hook), `PlatKey.part (multi-part arenas)` (M6-U hook: "the underground parts'
  fixtures (item 65)") (src/facade/notBuilt.ts:55-72). The clear-region deferral text reads "clear regions, prepared
  contacts, carves, S1's water operator; the raised ways and their arena parts" (src/facade/notBuilt.ts:53). READ.
- B12. `Milestone = 'M1' | 'M2a' | 'M2b' | 'M3a' | 'M4' | 'M6-P' | 'M6-U'` — the only milestones the kernel stages to
  (src/facade/types.ts:36-37). No milestone in the type names the world (V13) or sites (V14). READ.
- B13. Façade `GeomOps` is "§3.4's complete list": 17 writers, services (resolve, resolveVertexAt stub, signature,
  sampleProfile, kerb, booleans, tileRings, buffer, offsetFace, insetRing, skeleton, simplify, hexLattice, obb, hull,
  lir, sideRuns, sampleBoundary, pointLocate, faceNeighbours, area2, area2Big, orient, regularFit) and the three
  transient stubs (src/facade/types.ts:55-114). `pointLocate` and `faceNeighbours` take `ArenaKey` (so a TransientKey
  by type) (src/facade/types.ts:104-105). READ.
- B14. `KernelTx` as code: key `TxKey = PlatKey | TransientKeyShape`, level, ops, expect, onFail, batch, stage,
  rederivesFrom, clearRegion? (notBuilt M3a), prepared? (notBuilt M3a), workLimit (src/tx/types.ts:30-57); BatchScope
  stage | district | block | edit | entity (src/tx/types.ts:14-21). `CommitRecord.key: PlatKey` (src/tx/types.ts:102).
  `Conflict.reason: 'locked' | 'pinned'` — "Locks and pins are M2a's" (src/tx/types.ts:137-141). READ.
- B15. `TxEnv` injected services: floors, appliesTo, width, checks, rankOf, repair, chainParts, invariants, onCommit;
  "the kernel imports no table and no later item, §14" (src/tx/types.ts:172-198). READ.
- B16. `OP_KINDS` = 17 writers in rank order: insertChain, splitThrough, removeEdges, clearFiner, retypeEdges, setOwner,
  splitFace, connectHole, mergeFaces, absorbSliver, claimSubFace, radialSplit, ringBand, corridorUnion, bandUnion, warp,
  pinVertices (src/tx/types.ts:64-68). READ.
- B17. `LINEAR_PARTS` = way 1, wall 1, tunnel 1, gallery 1, rim 1, chamber_wall 1, deck 1, shore/bank/margin/border
  any (src/tx/tx.ts:412-414) — the API cites :418 (API.md:53); the line moved by 6. READ.
- B18. Z axis / datum: the kernel src has no height, elevation, z or datum field anywhere in the arena; a grep of
  src for `elevation|datum|zCm|height` finds only frame width/height, skeleton offset-time "heights", and comments
  (grep over plat/packages/kernel/src; hits listed: src/num/frame.ts:12, :19; src/skeleton/validate.ts:10, :239;
  src/skeleton/coalesce.ts:17-18). READ. `W_HEIGHT_CLAMPED` is declared in the kernel's warning union
  (src/num/result.ts:37) but produced only in @plat/site (plat/packages/site/src/terrain/range.ts:3, :72;
  site/src/terrain/heightfield.ts:84; site/src/hydro/carve.ts:81). READ.
- B19. API.md line cites that moved in the code (signature unchanged where checked): createPlat API :245 vs code
  src/arena/plat.ts:259; createKernel API :75 vs src/facade/kernel.ts:83; tx API :548 vs src/tx/tx.ts:530; insetRing
  API :120 vs src/arr/insetRing.ts:125; removeEdges API :274 vs src/tx/writers.ts:261; levelDigest API :756 vs
  src/digest/levelDigest.ts:778; encodeArena API :181 vs src/io/encode.ts:187; decodeArena API :240 vs
  src/io/decode.ts:250; warp API :325 vs src/warp/warp.ts:336 (API.md:384, :411, :450, :652, :531, :853, :868-869,
  :763; kernel-exports.txt). READ.
- B20. Exports added since Appendix B (2026-10-07): `tx/index.ts` exports `restoreGeneration`, `restoreSavepoint`,
  `takeSavepoint`, `Savepoint` (src/tx/index.ts:52), which Appendix B's tx list (API.md:1021) does not name. READ.
- B21. Spatial index: per level, static packed partitions over flatbush — "one per arena at L0–L1; at L2–L4 one per
  district plus one for everything outside districts" — each with a tombstone set, plus one dynamic uniform grid;
  rebuilt at stage end, grid overflow past max(256, 1/4 static size), pool freeze ("the pool and its frozen copy are
  M1's") (plat/packages/kernel/src/index/spatial.ts:1-14); `gridCellCm: number | Five<number>` from "the base
  settings row's `index.gridCellM` × 100" (src/index/spatial.ts:59-67); partition numbers Int16, `MAX_PARTITIONS =
  32_767` (src/index/spatial.ts:46-47); a transaction needs an attached index (src/tx/tx.ts:94). READ.
- B22. Numeric core: orient2d exact because |x|,|y| < 2^23 makes differences < 2^24, products < 2^48, determinants
  < 2^49 (src/num/predicates.ts:1-4, :15-17); area2 flushes to a BigInt accumulator at 2^52 (src/num/predicates.ts:8).
  `BOX_RANGE = 16_777_216` (2^24) and `PI` constant (src/num/exact.ts:239-242). READ.
- B23. Owner and role-head tables are typed-array open-addressing hash tables, load <= 0.5, "Lookups only — nothing
  iterates a table — so its layout never reaches an output" (src/arena/tables.ts:1-6); owner table: owner handle ->
  first face per level (src/arena/tables.ts:21-26); capacities power of two <= 0x40000000 (src/arena/tables.ts:39-42).
  READ.
- B24. Straight skeleton is present (M0-a-11): `skeleton(rings, use)` with uses roof | spine | regions and downgrades
  plainRoof | medialAxis | reflexPreCut; never a crash, never unvalidated output, nothing stored
  (src/skeleton/skeleton.ts:1-31; src/skeleton/types.ts:1-8, :72). Skeleton nodes are "a point in world centimetres
  (doubles, never arena coordinates) and its offset time in cm" `t` (src/skeleton/types.ts:10-17); validator checks
  include 'heights' (src/skeleton/types.ts:63). `exactRoof` with `RoofForm = 'hip' | 'gable' | 'pyramid'`
  (src/skeleton/roof.ts:32, :165). READ. The skeleton's `t` is the only third-dimension-like value the kernel
  computes, and it is a derived double, not stored. INFERRED (from B18 and src/skeleton/types.ts:10-17).
- B25. Role registry: version 1, 56 rows (ids 0..55), append-only; includes underground/raised roles `tunnel`,
  `gallery`, `chamber_wall`, `rim`, `deck`, `deck_end`, `raised_foot`, `sky_access`, and knots `base_knot`,
  `invert_knot`, `width_knot` (plat/packages/kernel/src/arena/roles.json:1-61). READ. No role names a world entity
  (e.g. a region, realm, route between settlements) or a site/encounter entity. READ (whole file).
- B26. Stage registry: version 1, 25 rows — S0 Blueprint … S15 Simulation, plus SKY (reservedUntil M6-sky), S7c, S9b,
  S8.seed (reservedUntil M5); "the evolution engine's EVO_* stages and the village product's VS* stages are appended
  when their milestones land"; STAGE_VIEW 0xffff (plat/packages/kernel/src/registry/stages.json:1-32). READ. No W*
  (world) or G*/E* (site, encounter) stage row exists; the registry is append-only so adding one "moves no existing
  key" (stages.json:2). READ.
- B27. Concern registry: version 1, 93 rows; first-reader milestones span M1, M3a, M3b, M4, M4b, M5, M6, M6-P, M6-U,
  V-M1 (`reservedUntil` per row; plat/packages/kernel/src/registry/concerns.json, read through a JSON dump of its
  rows' names and reservedUntil). No concern is named for the world (V13) or sites (V14). READ.
  `REGISTRY_MILESTONES` = M-1, M0, M1, M2a, M2b, M3a, M3b, M3c, M4, M4b, M5, V-M0 … V-M4, M6-E, M6-P, M6, M6-U,
  M6-sky, M-CAL, M-SF (src/registry/index.ts:23-27) — no world or sites milestone name. READ.
- B28. Stage id and concern id are u16, "never renumbered or reused" (src/types/ids.ts:22-29;
  src/registry/index.ts:1-5). READ.

### C. @plat/model as built (plat/packages/model/src; exports at the lane scratchpad `model-exports.txt`, 308 lines)

- C1. No API.md; the package index re-exports types, records, schema, stage, identity, match, digest
  (plat/packages/model/src/index.ts:3-9). READ.
- C2. The Z axis and datum live in the model's `Terrain` record, not in the arena: `datumCm` "The elevation that
  height 0 represents, relative to mean sea level; set by S1"; `heightCm: Int32Array` "Above datum"; `reliefLimitCm`
  "1 000 000 (10 km): the declared range every write is checked against"; `seaLevelCm` "In the datum frame"; a height
  raster `cellCm, cols, rows, originX, originY` over "frame + margin"; a coarser `HydroGrid` with flowDir / flatRank /
  flowAccum (plat/packages/model/src/records/site.ts:22-77). `TerrainSampler` heightAt / slopeAt / flowAt, bilinear,
  "the 2.5 m refinement is computed on demand, never stored" (records/site.ts:79-85). "terrain is not in the plat
  (§2.3)" (records/site.ts:13-15). `Terrain.key: PlatKey` — "the ground's, or one sky island's own"
  (records/site.ts:47-50). READ.
- C3. M0 record kinds (15): terrain, waterBody, way, junction, district, block, frontage, plot, reservation,
  allocation, fieldBands, enceinte, gate, bridge, seam; "The registry itself, with its path-completeness test, is
  M1's" (plat/packages/model/src/schema/kinds.ts:1-61). READ. No world record kind (region, settlement-in-world,
  route) and no site/encounter record kind is declared. READ (whole file).
- C4. Staged fields (`STAGED`, 44 rows) — e.g. Terrain.geology and Terrain.mining (M1), Way.surface (M2b),
  Way.slopeP95 (M1), Enceinte.heightCm (M1), Gate.heights (M1), Enceinte.condition (M2b), Enceinte.laidAt (M3a)
  (plat/packages/model/src/schema/staged.ts:17-61). `RaisedWayRecord = NotBuilt<'M3a'>`
  (plat/packages/model/src/types/staged.ts:7-10). READ.
- C5. Stage vocabulary `STAGE_IDS` = the 25 kernel registry names, S0 … S8.seed (plat/packages/model/src/stage/vocab.ts:10-37);
  `DATA_KEYS` = terrain, water, roster, reservations, reservations.landing, allocations, allocations.landing, raised
  (stage/vocab.ts:42-51). READ.
- C6. `StageDecl` (id, inputs, outputs, streamKeys, invariants, ladder, workLimits, budgetMs per `Rung`, batch,
  lineageUnit, lazy, txForm, phase) and `StageEnv` slots doc ("§2.9's Document (M1, §4b)"), plat, stream, kernel,
  tables, rung, report, model (plat/packages/model/src/stage/decl.ts:84-128). `Scope` kinds all | entities | region
  (ring, key, level) | epoch (stage/decl.ts:71-76). READ.
- C7. `Rung = 'TOWN' | 'CITY' | 'METROPOLIS' | 'THORP' | 'HAMLET' | 'VILLAGE'` (plat/packages/model/src/types/vocabulary.ts:33). READ.
- C8. Addresses: `[prefix]kind:token`, prefix '' on ground, `under/` or `under<n>/`, `sky<n>/`
  (plat/packages/model/src/identity/address.ts:54-80); `GROUND = { layer: 'ground', part: 0 }`
  (identity/lineage.ts:126); `TOWN_KIND = 'town'`, `mintTownRoot` (identity/mint.ts:264-270). READ. The identity root
  is a town root; no world-root minting function is exported. READ (model-exports.txt, whole).
- C9. Model digest layers: site, network, districts, hinterland, content, names, closeups, underground, sky, identity,
  plats; "hinterland, names, closeups, underground and sky hold no M0 kind (empty)"
  (plat/packages/model/src/digest/leaf.ts:15-40). No 'world' layer. READ.
- C10. The matcher's coordinate check allows |v| <= 2^24 (`COORD_LIMIT = 16_777_216`, "the frame's range, §3.2 (1)")
  (plat/packages/model/src/match/geometry.ts:4, :11-21), where the kernel's snap allows |v| < 2^23 (B4). READ (both);
  the two bounds differ by a factor of two. READ.
- C11. Record types present also include `WaterBody` with 13 kinds and `depthCm?: Int16Array` per course vertex
  (plat/packages/model/src/records/site.ts:87-131), `District`, `Block`, `Plot`, `SitePlan`, `BuildingSlot`,
  `ContextVector` (records/districts.ts:30-285), `Way`/`WayClass`/`Junction` (records/network.ts), `Enceinte`, `Gate`,
  `Bridge` (records/walls.ts), `Seam`, `SeamEdge`, `Portal` (records/seam.ts); `RaisedKind = 'viaduct' | 'elevated' |
  'aqueduct'` (types/identity.ts:20). READ (export lines; site.ts read whole).

### D. @plat/site as built (plat/packages/site/src; exports at the lane scratchpad `site-exports.txt`, 295 lines)

- D1. No API.md; index re-exports terrain, hydro, water (plat/packages/site/src/index.ts:3-5). READ.
- D2. Heights: the range check is "the one door every write to a height raster goes through"; rounded to the cm,
  checked against `reliefLimitCm` (10 km), clamped and counted as W_HEIGHT_CLAMPED; "No other module of @plat/site
  writes a height raster's cells" (plat/packages/site/src/terrain/range.ts:1-6); heights are "Int32 cm above the
  datum" (range.ts:11-12); `INT32_HEIGHT_MAX = 2147483647` (range.ts:77). READ.
- D3. Heightfield: 5-octave fBm on a 32 m coarse grid over frame + margin plus authored primitives (hill, valley,
  terrace, cliff; "spur, ravine and hollow are M1's"), stored Int32 cm above the datum; slope at 2.5 m via the sampler
  (plat/packages/site/src/terrain/heightfield.ts:1-10; site/src/terrain/types.ts:64-65). `SiteRequest.baseElevationM`
  is the site's base elevation above mean sea level, `datumCm` on a site with no coast, 0 when absent
  (site/src/terrain/types.ts:72-79). READ.
- D4. The terrain spec's arena is "the ground's, or a sky island's (§2.3)"; `GROUND_KEY = { layer: 'ground', part: 0 }`
  (plat/packages/site/src/terrain/heightfield.ts:20-34). READ.
- D5. The frame: `siteFrame` uses the `base` frame law only — "if (rung.frameLaw !== undefined && rung.frameLaw !==
  'base') return err('E_OUT_OF_RANGE', 'frameLaw')"; "The village rungs' `territory` law is volume 7's"; area from
  `areaHa` or the rung's `frameAreaKm2AtTarget` x population share; through the kernel's `frameOf`
  (plat/packages/site/src/terrain/strategy.ts:30-51). READ. `baseTerrain` "S1 (1) writes no arena"
  (strategy.ts:50-53). READ.
- D6. The raster covers the arena: reach ⌈w·(½+m)⌉ each side; cells row-major from the south-west corner
  (plat/packages/site/src/terrain/grid.ts:1-31). READ.
- D7. Hydrology: priority flood, flats, D8, accumulation, river tracing with meanders, carving, estuary split; S1 stage
  `runS1` / `s1Stage` writes L0 faces through the kernel façade (`outerRingBatch(k: Kernel, …)`, `waterFaces(…, k:
  Kernel, …)`) (plat/packages/site/src/hydro/index.ts:10-58; site/src/water/faces.ts:58, :211;
  site/src/water/stage.ts:92, :237). READ. Rivers are "town-scale": `ESTUARY_LENGTH_M = 400`, `SIMPLIFY_CM = 50`,
  `RING_CLEAR_CM = 60` (site/src/hydro/params.ts:43; site/src/water/polygons.ts:213; site/src/water/offset.ts:440).
  READ.
- D8. Site resources: ore, stone, timber, fish, clay, fertile, wellYield, slope per cell (Float32Array)
  (plat/packages/site/src/terrain/types.ts:112-129). READ.

### E. @plat/layout as built, and the spike harnesses (plat/packages/layout/src; plat/bench/src)

- E1. No API.md; index re-exports fixtures, siting, enceinte, backbone, growth, districts, fields, infill, pipeline
  (plat/packages/layout/src/index.ts:3-11); 78 source files (lane scratchpad `layout-exports.txt`). READ.
- E2. The base registration names "every M0 stage": six stages S1, S3, S4, S5, S6, S8 (S1 terrain → water → L0 batch →
  resources; S3 slice on the flat fixture; S4 backbone; S5 k = 1 … K; S6 districts + fields pass 1; S8 bent-cut
  infill); "M0 builds the flat fixture and its river variant at CITY (`FLAT_BLUEPRINT`, `RIVER_BLUEPRINT`); S0's
  expansion — any other rung, population or aspect — is M1's and refused by name"
  (plat/packages/layout/src/pipeline/base.ts:1-27; registerBase at base.ts:843-852). READ.
- E3. `baseArena` creates the ground arena over the blueprint's frame with `attachIndex(p, { gridCellCm: 5000 })`
  (plat/packages/layout/src/pipeline/base.ts:857-863). READ.
- E4. The runner derives "the base product once, eagerly"; "Only scope `all` is built: a scoped re-derivation is the
  edit log's (M2a) and an epoch's is M4's, refused here by name"; "the pool and the lazy tiers are M1's"
  (plat/packages/layout/src/pipeline/runner.ts:1-29). READ.
- E5. `stageOrder(registry, product: 'base' | 'village' = 'base')` — Kahn's sort by declared I/O with the u16 id
  tie-break; a hook registration refuses `notBuilt('M2b')` (plat/packages/layout/src/pipeline/order.ts:1-12,
  :141-156). READ. The only product names the order accepts are 'base' and 'village' (order.ts:147). READ.
- E6. `StrategyRegistry` kinds: terrain, coast, river, manifest, network, enceinte, fabric, plots, sitePlan, building,
  evolution, sky, sewer, underground; hooks never registered before M2b
  (plat/packages/layout/src/pipeline/registry.ts:1-18). READ. No world or site/encounter strategy kind. READ.
- E7. The bent cut (`BentCutFabric`, M0-b-03): one callback-form L1 transaction per district; per coarse L1 face: kerb,
  reflex pre-cut and antenna split, planCut and a ladder (attempts 0–2, mean normal, sliding cut W_CUT_SLID, court-block
  substitution), judged then `splitFace`/`connectHole`, lane width, T-junctions, portals, recursion, deep-interior rule;
  F-WORK counters cut.recursionDepth, cut.kernelCalls, cut.candidates; "levelledUnits returns [] and terracedEdges is
  true at M0 (their readers are M3a's)" (plat/packages/layout/src/infill/bentCutFabric.ts:1-37, :293, :1491-1498).
  READ.
- E8. Fusion: `plat/bench/src/fusion/index.ts` is 2 lines, "Created empty by the scaffold … belongs to M0-c-06"
  (bench/src/fusion/index.ts:1-2); `plat/bench/src/fusion-ng/index.ts` is 4 lines, empty, belongs to M0-c-07
  (bench/src/fusion-ng/index.ts:1-4). READ. The fusion harnesses are not built. READ.
- E9. The site spike harness is built (M0-e-06): CITY, a river on 60 m and on 3 000 m relief, seeds 200 from 1, through
  the base registration and the runner (S1, the S3 slice, S4, S5, S6 with the fields) (plat/bench/src/site/index.ts:1-15).
  READ.
- E10. M0 work items: 72 (plat/docs/build/M0-work.json `itemCount`, `items`). A landed record file
  `plat/docs/build/landed/<id>.json` exists for 58 of them; none exists for M0-c-06 (fusion gate harness), M0-c-07
  (fusion statistics harness), M0-f-03b (work-limit coefficients from the spikes), M0-t-00, M0-t-01, M0-t-02 (timing
  phase), M0-x-01 (the M0 record), M0-x-03, M0-b-05a, M0-b-05b, M0-c-07a, M0-c-07b (AFTER-M-1 items), M0-f-02b
  (nightly/milestone tiers), M0-k-07 (AFTER-M-1 deny-list scan) (listing of plat/docs/build/landed against
  M0-work.json item ids). READ (the listing); that a missing landed file means "not landed" is INFERRED.
