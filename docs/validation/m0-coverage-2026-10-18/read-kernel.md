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
| plat/packages/kernel/src/** (155 .ts + 3 .json) | — | — | listed whole; `grep -n "^export"` of every file (lane scratchpad kernel-exports.txt) |
| plat/packages/kernel/src/arena/plat.ts | 732 | ba8d43e79fe1f9356f4ca81b38b32a1a | head :1-400 |
| plat/packages/kernel/src/facade/types.ts | 172 | cfb7444c833e4715820dc5870d4c23d2 | whole |
| plat/packages/kernel/src/facade/notBuilt.ts | 75 | 24764ab3735e87d5b7d08cf7f7a2cf14 | whole |
| plat/packages/kernel/src/facade/kernel.ts | 377 | 633a9f45643ba0da064321fa1bf1abbb | head :1-140 |
| plat/packages/kernel/src/tx/types.ts | 201 | a8b95a2593250224fde8969fa45809c0 | whole |
| plat/packages/kernel/src/tx/tx.ts | 644 | ab446edef81625a152cf30154fb27a72 | :70-100, :400-440, :525-600 |
| plat/packages/kernel/src/types/{ids,units,refs,rows}.ts | 29/32/54/29 | 69110cd8…/bcccb989…/d73950ef…/9474c359… | whole |
| plat/packages/kernel/src/num/{lattice,snap,frame}.ts | 31/19/40 | 9481267d…/b9e2999d…/42f6b667… | whole |
| plat/packages/kernel/src/num/predicates.ts | 138 | 2fc27e49f46ad0a1707e69a36c12aa9b | head :1-60 |
| plat/packages/kernel/src/index/spatial.ts | 390 | c5bd07446c814cbd246e64a04253cd29 | head :1-140 |
| plat/packages/kernel/src/arena/tables.ts | 221 | 08923457fa3d0f664434f087043b8370 | head :1-45 |
| plat/packages/kernel/src/skeleton/{skeleton,types}.ts | 128/105 | 490a59d9…/5967d139… | heads :1-60 |
| plat/packages/kernel/src/arena/roles.json | 62 | 58f79984f4d2fe55e253cecaa5dddef7 | whole |
| plat/packages/kernel/src/registry/stages.json | 33 | 29a2aebc6ddcfd846dc70f26d14759b0 | whole |
| plat/packages/kernel/src/registry/concerns.json | 1200 | ca045fe940950c3fa92c8c7f25bb6fda | rows' name/reservedUntil dumped; five rows whole |
| plat/packages/kernel/src/registry/index.ts | 170 | 355dc2e5b81ab6c6dc3e6441552e0afe | head :1-30 |
| plat/packages/kernel/src/rng/mixer.ts, rng/layer.ts | 185/19 | b5efab55…/03c0ef10… | :112-145; whole |
| plat/packages/kernel/src/io/format.ts | 89 | c17e3c3f321210f33ffd7df117d11006 | :1-58 |
| plat/packages/kernel/src/digest/levelDigest.ts | 857 | 195e0eb0997f0d425ab7a6672f5d7b37 | :762-790 |
| plat/packages/kernel/test/gate/*.ts (6 files) | 61-154 | see G2 | whole |
| plat/packages/{model,site,layout,tables,testkit}/src/** | — | — | listed whole; `grep -n "^export"` of every file (lane scratchpad <pkg>-exports.txt) |
| plat/packages/model/src/records/site.ts | 132 | 9857ca36aba7989f34f7fa3507626e9a | whole |
| plat/packages/model/src/schema/{kinds,staged}.ts, types/staged.ts | 61/61/10 | bcdeaf18…/ca37ecb1…/c7daa0f8… | whole |
| plat/packages/model/src/stage/vocab.ts | 79 | 7ba89693b967d6941fbe20a6a48f1bb3 | whole |
| plat/packages/model/src/stage/decl.ts | 172 | 3c874055ce7b9fb8ab14f7fb559cc36e | :1-130 |
| plat/packages/model/src/identity/address.ts | 117 | 734a9ad6e41e397a73a7767618984625 | :50-80 |
| plat/packages/model/src/digest/leaf.ts | 152 | fd730d5147c820790bec23ad6a329690 | :1-40 |
| plat/packages/model/src/match/geometry.ts | 422 | 9d8a46910544260a648f69bf1ae861c8 | :1-30 |
| plat/packages/site/src/terrain/{range,heightfield,strategy,grid,types}.ts | 88/199/65/95/129 | eabd1126…/b7fa1fe3…/6a680a7e…/24f4e355…/fd330430… | range :1-30; heightfield :1-40, :84-100; strategy whole; grid :1-35; types :60-129 |
| plat/packages/layout/src/pipeline/{base,runner,order,registry}.ts | 875/392/156/239 | 7ea993b7…/3882d172…/3caa067e…/46758bdb… | base :1-50, :830-875; runner :1-60; order :1-50, :140-156; registry :1-40 |
| plat/packages/layout/src/infill/bentCutFabric.ts | 1498 | f4226bf77c9c87392148387d8e796a20 | head :1-60; exports |
| plat/bench/src/fusion/index.ts, fusion-ng/index.ts | 2/4 | 3ea758e3…/86b25a09… | whole |
| plat/bench/src/site/index.ts | 242 | ab7724b3141057a54260a0234a921b0f | head :1-40 |
| plat/packages/tables/src/loader/{ladder,registry}.ts | 179/61 | 44174c30…/7681a59a… | ladder :1-40; registry :15-40 |
| plat/packages/tables/data/ladder.json | 97 | b26b93e61b47fecc34e3efe88642f5aa | :1-60, grep of band/area rows |
| plat/packages/testkit/src/*/index.ts (11) | — | — | heads |
| plat/packages/testkit/src/constructive/cases/deferred.ts | 51 | 8248b7de7009c83344c9a6fb0fce427b | whole |
| plat/docs/build/M0-world-sites-gate.md | 45 | b6c5be2a5d89fbd19035a3c606194fb9 | whole |
| plat/docs/build/checks/M0-world-sites-gate.md | 476 | 1e29aadca96f2cfcb96cdbe82c0181ef | whole |
| plat/docs/build/M0-work.json | 5219 | 4adde34c04ef6af345bc7c766dcff7bb | ids and titles of the 72 items (script) |
| plat/docs/build/landed/ | 340 files | — | listing |
| plat/docs/build/checks/hardening-inventory.md | 2445 | 90fff18fb3fc2a66950a8a2145136679 | §0 head :1-40 only |
| docs/validation/consistency/inventory-kernel.md | 486 | 19fe2531122430222ee5e878be8da78c | whole |
| workflows/lane-prompts/session-fix-cloud/specs.json | 3883 | f18a7e728df537dab545315251ed3fe0 | the in-flight rounds' `session` heads (script) |
| docs/PROGRESS.md | 1067 | — | J390 row (:449) whole; grep of wip/child names |
| docs/HANDOFF.md | 781 | — | grep of wip/child names (:174-184) |

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

### F. @plat/tables and @plat/testkit as built

- F1. @plat/tables: no API.md; index re-exports loader, cell, workLimits (plat/packages/tables/src/index.ts:3-5);
  M0's 13 tables `ladder, granularity, faces, regimes, ways, cut, interior, walls, lattice, district, fields, bands,
  terrain` plus `workLimits` (plat/packages/tables/src/loader/registry.ts:20-34; src/workLimits/table.ts:24;
  plat/packages/tables/data/*.json, 14 files). READ.
- F2. Rungs: `BASE_RUNGS = ['TOWN', 'CITY', 'METROPOLIS']`; "M0 ships the base's three rows … the village rows are
  volume 7's (V07 §2.1; deferred)"; requests outside the ladder are LadderRouter's (M1)
  (plat/packages/tables/src/loader/ladder.ts:1-15). ladder.json rows: TOWN band [1500, 10000], frame 400 ha at
  target; CITY [10000, 30000], 2500 ha; METROPOLIS [30000, 120000], 6400 ha; frameLaw `base`, frameMarginShare 0.3
  (plat/packages/tables/data/ladder.json:7, :10-13, :41, :44, :68-72). READ. METROPOLIS at target is 64 km² — about
  8 km a side at aspect 1 before margin — far inside the kernel's ≈104.9 km frame bound (B5). INFERRED (arithmetic).
- F3. terrain.json rows: TOWN, CITY, METROPOLIS, settings, fbm, relief, river, crossing, shoreSetback, resources
  (plat/packages/tables/data/terrain.json, row keys). READ (keys only; the file was not judged further).
- F4. @plat/testkit: folders fuzz, constructive, oracles, invariants, metrics, parity, crosshost, determinism, scanner,
  ladders, edge (plat/packages/testkit/src/index.ts:4-14); the cross-host legs are Node arm64, Node x86-64 under
  Rosetta 2, Chromium, Firefox and WebKit, workers off and on (plat/packages/testkit/src/crosshost/index.ts:1-6);
  oracles Clipper2-WASM 0.4.0 and polygon-clipping 0.15.7, dev-only (src/oracles/index.ts:1-5). READ.
- F5. The constructive degeneracy set tags cases by milestone; tag counts in constructive/ and edge/: M0 1, M1 24,
  M2b 1, M3a 7, M4 1, M4b 2, M5 2, M6-E 1, M6-U 2 (grep of `milestone: '…'` over plat/packages/testkit/src/constructive
  and src/edge). Two §13.1 bullets land wholly after M0: "kept content, carves and water edits" (M3a, 11 stub cases)
  and "stretch-state writes" (M2b, 3 stub cases) (plat/packages/testkit/src/constructive/cases/deferred.ts:1-51).
  READ. No case is tagged for a world or sites milestone. READ (the grep).

### G. The test tree, and the M0 close gate's kernel tests

- G1. Kernel test folders: arena, arr (bands, booleans-buffers), digest, dmath (fdlibm KAT vectors arm64 and x86_64),
  facade, faces, gate, geom, hash, index, insert (step1-2, step3-5), invariants, io, medial, noise, num, rng (xoshiro
  KAT vectors), scaffold, skeleton, tx, types, vectors, warp (lane scratchpad listing.txt, lines for
  plat/packages/kernel/test/). Model tests: digest, identity, match, records, scaffold, schema, stage, types; site:
  hydro, terrain, water; layout: backbone, districts, enceinte, fields, growth (s5ab, s5cd), infill (bands, fabric,
  planner), pipeline (base, core), siting; tables: cell, data, loader, workLimits; testkit: constructive, crosshost,
  determinism, edge, fuzz, kernel (arr-bands, arr-booleans-buffers, io), ladders, layout, oracles, parity, runner,
  scanner (same listing). READ (file names; the files were not each read).
- G2. `plat/packages/kernel/test/gate/` holds six files: support.ts (61 lines, md5 70c55a70…), layers.test.ts (80,
  b015d1d0…) for K1, parts.test.ts (154, 7a4268dc…) for K2 and K8, roles.test.ts (90, ba7bc43d…) for K5,
  registries.test.ts (88, b016e2d9…) for K6, no-elevation.test.ts (82, df69d5b7…) for K13 — each read whole. READ.
- G3. K1 test: layer codes ground 0, underground 1, sky 2 agree between the block header (`layerCodeOf`) and the
  entity key (`layerCode`); code 3 unassigned; `'world' as Layer` throws in both and `isPlatKey` is false; the layer
  byte sits at offset 7 of the routes chunk; a document whose only arena is underground or sky round-trips and runs a
  kernel (plat/packages/kernel/test/gate/layers.test.ts:1-80). Its header: "The kernel keeps no layer registry … The
  spec's 'append a fourth value in a test registry' cannot be written against this code: the report records the gap"
  (layers.test.ts:1-8). READ.
- G4. K2/K8 test: arenas ground/0, ground/7, underground/3, each with its own frame (16 ha, 25 ha, 9 ha), encode,
  decode, re-encode byte for byte; a block under another key is a corrupt cache ("another arena"); every reference
  form resolves on its part and empty elsewhere; digests re-attached on load; compactSlots deterministic
  (plat/packages/kernel/test/gate/parts.test.ts:1-154). READ.
- G5. K5 test: a role appended (`site_anchor`, vertex, indexed) keeps every existing row; LINEAR_PARTS overridable by
  `TxEnv.chainParts` (plat/packages/kernel/test/gate/roles.test.ts:1-90). K6 test: a concern `site.world` and a stage
  `SITE` appended to copies keep every existing id; a stream keyed by the next unregistered (stage, concern) is
  distinct from every registered one; `packComponents` refuses it today (plat/packages/kernel/test/gate/registries.test.ts:1-88).
  READ.
- G6. K13 test: a grep lint over every .ts/.json of kernel/src for z-like member names (z, zCm, elev…, altitude…,
  datum…, storey…, floorCm, baseCm, topCm, surfaceCm, depth…) with one allowlist entry (`geom/lir.ts` `depthCm`);
  type pins: `keyof LatticePoint = 'x' | 'y'`, `keyof Frame` the four plan fields, `keyof PlatKey = 'layer' | 'part'`;
  vertex table columns exactly x, y, out, level, flags (plat/packages/kernel/test/gate/no-elevation.test.ts:1-82).
  READ.
- G7. Not run here: no Node 24 is available in this lane (header). The checker's record says the gate folder ran
  "5 files, 20 tests, all pass (2.6 s)" under Node 24.12.0 on 2026-10-17
  (plat/docs/build/checks/M0-world-sites-gate.md:20-24, :446-457). READ (as that record's claim).

### H. The M0 close gate: its spec and its checker's record (read whole)

- H1. Spec: plat/docs/build/M0-world-sites-gate.md (45 lines, md5 b6c5be2a5d89fbd19035a3c606194fb9): "No row adds a
  feature"; a K row resolved before M0 commits or carried to M1's API pass; K1–K13 and M1–M11 with their
  verifications (M0-world-sites-gate.md:1-45). READ.
- H2. Checker's record: plat/docs/build/checks/M0-world-sites-gate.md (476 lines, md5
  1e29aadca96f2cfcb96cdbe82c0181ef), lane check/M0-world-sites-gate, Fable 5.1, 2026-10-17; verdict: "the gate holds
  with these rows carried to M1: K10 (persisted versions), K12 (the commit journal's stage, scope and reads), M1 (the
  address namespace), M2 (the carve delta), M4 (the water-table accessor); K11's fix is a documentation row
  (fixed-in-M0)" (checks/M0-world-sites-gate.md:1-31). READ.
- H3. Row verdicts as recorded: K1 PLAUSIBLE (no layer registry; a fourth layer is "a four-site source edit" plus the
  model's arenaPrefix/parseAddress), K2 CONFIRMED, K3 CONFIRMED (Frame local, centred on (0,0); no absolute position
  hashed), K4 CONFIRMED, K5 CONFIRMED (recommends a roles.snapshot.json), K6 CONFIRMED, K7 PLAUSIBLE (stage rank
  persisted as u8 with no rank-table version in the block), K8 CONFIRMED, K9 CONFIRMED type-level (a `view:<hash>`
  owner string fits `owner: Id`), K10 FAIL carried-to-M1 (chunk header names only FORMAT_VERSION and
  ROLE_REGISTRY_VERSION; ENGINE_VERSION and the stage registry version are persisted nowhere), K11 FAIL
  (documentation) fixed-in-M0, K12 FAIL carried-to-M1 (CommitRecord has no stage, batch scope, concern or reads),
  K13 CONFIRMED (checks/M0-world-sites-gate.md:35-249, closing table :411-437). READ.
- H4. Model rows as recorded: M1 FAIL by design carried-to-M1 (address prefix names the arena only; lineage key's ten
  lanes have no document or world lane, "two documents generated from one seed mint identical lineage hashes and
  identical addresses"); M2 FAIL in part (the carve's pre-carve heights not kept; water surfaces separable); M3
  PLAUSIBLE (`datumCm` read by no other code); M4 PLAUSIBLE, carried (no water-table function; stand-in inline);
  M5 PLAUSIBLE (three entry points); M6 CONFIRMED kernel / PLAUSIBLE model (no `world` digest layer); M7 PLAUSIBLE;
  M8 CONFIRMED model; M9 PLAUSIBLE with a gap list (waterBody level, PlotBound base, enceinte base/top staged, gate no
  elevation, bridge deck); M10 PLAUSIBLE (no vertical-link record exists); M11 PLAUSIBLE (no projection state)
  (checks/M0-world-sites-gate.md:251-409). READ.
- H5. The record's K11 fix landed as choices row C-0374 (2026-10-17) and API.md §1's new reuse-table row
  (plat/docs/build/choices.md:381; plat/packages/kernel/API.md:12-14, :52). READ. Its K1 "smallest addition" (one
  frozen LAYERS list) and K5's roles.snapshot.json: `src/types/ids.ts:14` still holds the closed union and no
  `roles.snapshot.json` exists beside `src/arena/roles.json` (lane listing.txt: src/arena has debug, handles, index,
  keys, plat, registry, resolve, roles.json, rows, tables, walk). READ.
- H6. K12 confirmed against the code read here: `CommitRecord` fields are version, key, level, faces, edgesAdded,
  edgesRemoved, steinerAdded, steinerDissolved, work, moved, promoted, demoted, unflagged, owners, roles, warnings —
  no stage, no batch (plat/packages/kernel/src/tx/types.ts:99-122). READ.

### I. The mid-flight hardening rounds (read from J390, the round specs and the branch names; no branch checked out)

- I1. J390 (the owner's word 2026-10-17 ~23:45Z; the session's state record): "the twelve M0 hardening rounds in flight
  at J373 all stopped at CHECKPOINT lines between 11:04Z and 11:15Z on 2026-10-14, their branches unchanged since"; the
  list: c-03 s3 (wip/cloud-autosave-c 8c44c6a9), a-09 s7 check (wip/child-a09s6b), b-03 c1 check (wip/child-b03c1),
  a-05 s9 build (wip/child-a05s9), a-11 s4 (wip/child-a11s3: "the s4 build LANDED 11:05Z … its check started 11:06Z"),
  a-08 s4 check (wip/child-a08s4; build LANDED 10:00Z), c-01 s2 (wip/child-c01s2), e-04 s3 (wip/child-e04s3), c-05 s2
  (wip/child-c05s2), k-04 s1 (wip/child-k04s1), m-01 s1 (wip/child-m01s1), e-02 s1 (wip/child-e02s1), e-01 s1
  (wip/child-e01s1, held); "Hardening stands at 9 of the 14 launched rounds landed (a-13 s1, a-03 s1, a-15 s1, a-01
  s1, a-02 s3, a-14 s3+s4, a-10 s2, a-06 s7, a-04 s5) of the 22 specs rendered 2026-10-14 (6d49e2e); pass A at 37 of
  39 (b-03 c1 and x-04 c1 remain)"; main's head 8c24a846 (docs/PROGRESS.md:449). READ.
- I2. Every `wip/child-*` name in docs/HANDOFF.md and docs/PROGRESS.md (grep): a01c2, a01c3, a02c1, a02c1b, a03c1,
  a05s7, a05s9, a06c1, a06c1b, a06s5, a06s6, a07c1, a08s4, a09s6, a09s6b, a10c1, a10s1, a11c1, a11s3, a14c1, a14s3,
  a15c1, a15c1b, a16c1, a16c1b, b02c1, b03c1, b03s5, c01c1, c01s2, c02c1, c02s4b, c03c1, c04c1, c04c1b, c05c1, c05c1b,
  c05s2, c06f0b, c06f0c, c06f0d, d04s1, d05bc1, e01s1, e02c1, e02s1, e03c1, e04c1, e04c1b, e04s3, e05c1, k04s1, m01s1,
  x02c1, x06f2 (docs/HANDOFF.md:174-184; docs/PROGRESS.md:312-449). READ (names only).
- I3. The round specs live in workflows/lane-prompts/session-fix-cloud/specs.json (104 rounds). The hardening rounds
  are "opened by the SESSION as M0-<item>'s HARDENING ROUND (J237 (2) …; the owner 2026-10-07: 'make sure you do the
  hardening phase for m0 before m1')" on the FIX-NOW rows of plat/docs/build/checks/hardening-inventory.md (2,445
  lines; 512 FIX-NOW items of 1,922 classed) (specs.json rounds[77], [80]-[85], [97], [102], [103];
  hardening-inventory.md:1-30). READ (the spec heads and the inventory's §0; the inventory body was not read).
- I4. Subjects of the in-flight kernel rounds, as their spec heads state: a-05 s9 (insertion II) — 21 FIX-NOW notes,
  queue L26 (a structured refusal field) and L8, census Q44 / KI-1 "insertChain router, MAKE-IT-SUCCEED expected"
  (specs.json rounds[77]); a-08 s4 (arrangement I) — 14 notes, census KI-7 "insetRing reads an overlay refusal as
  empty" (rounds[80]); a-09 s3/s6 (arrangement II) — the kerb/bandUnion "silently wrong committed record" class found
  by M0-c-06's 50-seed CITY smoke: dangling `kerb` chains and drift-beyond blocks, rulings N-57 (2), J318, C-0333
  (rounds[34], [63]); a-11 s3 (skeleton) — census Q63 "skeleton planarity downgrade on two corpus footprints,
  MAKE-IT-SUCCEED" (rounds[79]); a-11 c1 — skeleton consolidation onto num/exact.ts helpers (rounds[48]). READ.
- I5. Subjects of the other in-flight rounds: c-03 s3 (S4 backbone; 14 notes; census Q52 class A spines role
  consistency) (rounds[81]); e-04 s3 (S6 districts; 16 notes; Q64 "S6 perimeter at 180 m") (rounds[82]); k-04 s1
  (B-FUZZ runner; 18 notes) (rounds[83]); e-01 s1 (terrain; 6 notes; queue L27 (a)) (rounds[84]); e-02 s1 (hydrology;
  8 notes; L27 (b)) (rounds[85]); m-01 s1 (model; 2 notes; L3, L4 re-exports into @plat/model, L30 generatedLifecycle
  builder) (rounds[97]); c-01 s2 (S3 slice; 4 notes; Q52 classes C/F) (rounds[102]); c-05 s2 (S5c/S5d; 2 notes; L29;
  Q55 S5c inner refusals) (rounds[103]); b-03 c1 (bent-cut consolidation R6, layout consolidation plan 8167d462,
  rulings J302) (rounds[59]). READ.
- I6. No in-flight round's stated subject is a coordinate range, the level count, arena size, transient arenas, the Z
  axis, the datum, a world or a site/encounter regime. INFERRED (from I4-I5, the spec heads read; the FIX-NOW rows'
  source notes were not read).

### J. The correction records under docs/validation/ (what was read whole, what was not)

- J1. docs/validation/consistency/inventory-kernel.md (486 lines, md5 19fe2531122430222ee5e878be8da78c) read whole: the
  2026-09-26 inventory of the design's §3 (ARCHITECTURE.md lines 2123–3351 as of then), 386 items, 13 internal
  conflicts; "Fable-reviewed 2026-09-26: CONFIRMED" (inventory-kernel.md:1-16). READ.
- J2. The design's range derivation as inventoried: METROPOLIS target at aspect 2 is 11.31 × 5.66 km, |x| ≤ 905 097 cm
  ≈ 2^19.8; "the largest arena is METROPOLIS at the population cap 120 000 (153.6 km², §12.2) at aspect 2 — 17.53 km ×
  8.76 km, |x| ≤ ≈ 1 402 000 cm ≈ 2^20.4" (KERNEL-068, inventory-kernel.md:128); the 2^23 bound gives "≈ 6× headroom
  over the largest arena (≈ 9× at the METROPOLIS target)", and "Every exactness argument rests on this invariant
  (enforced by snap), never on the frame table" (KERNEL-069, :129); "The range bound of (1) is derived from the largest
  frame at the extreme aspect" (KERNEL-093, :153). READ (as the 2026-09-26 inventory states the design).
- J3. Frames as rectangles: TOWN 4 km², CITY 25 km², METROPOLIS 64 km², aspect [0.5, 2] (KERNEL-092,
  inventory-kernel.md:152). The design's grid cells: 25 m at L0–L1, 10 m at L2, 5 m at L3–L4 (KERNEL-157, :221) —
  where the built `baseArena` passes one 50 m cell (`gridCellCm: 5000`) for every level (E3). READ (both).
- J4. Under §2.9's size fallback "the partition chunks are cut per block group (the 200 m world-grid cell of each
  block's lowest-leftmost vertex)" (KERNEL-358, inventory-kernel.md:452). READ. ("world-grid" there names the arena's
  own coordinate grid, not V13's world. INFERRED.)
- J5. The design's snapshot persists a 1-byte stage rank per face "because the kept-content rule must decide the same
  way after a reload" (KERNEL-352, :446; KERNEL-365, :459) — the u8 rank of B7 and H3's K7. READ.
- J6. NOT read (gaps, see the gaps section): docs/validation/fix-all/ r1–r5 kernel and determinism rounds (r1-kernel
  914, r2-kernel 1,292, r3-kernel 1,138, r4-kernel 1,461, r5-kernel 1,587; r1–r5 determinism 1,390–2,019 lines each),
  consistency/inventory-determinism.md (913), consistency/rewrite-kernel.md (520) and repair/verify-kernel records,
  m1-corrections-1/2/3 (calibration cells, read only to their heads: "M-1 design corrections … DC-01 … DC-35",
  m1-corrections-1.md:1-12; m1-corrections-2.md:1-10), clean-room-*.md (heads only: a clean-room re-check and a
  clean-room fix of 2026-10-03, clean-room-mac-2026-10-03.md:1-10, clean-room-fix-2026-10-03.md:1-10), bench/ (scripts
  and outputs, not opened). READ (heads named; bodies not read and not characterized).

### K. Sizes of the code and test trees (plat/)

- K1. Source and test file counts: kernel 155 src .ts / 166 *.test.ts; layout 78 / 104; model 42 / 20; site 33 / 21;
  tables 17 / 11; testkit 138 / 105; bench 68 / 51 (find over plat/packages/*/src, */test and plat/bench). READ.

### L. Identity and persisted keys (read last)

- L1. The entity key mixes the seed key, the lineage hash and the arena key only: "one finaliser round over seedKey ⊕
  (lineage₀, lineage₁, layer code, part)" (plat/packages/kernel/src/rng/mixer.ts:123-139); the seed is a u32
  (`seedKey(seed: Seed)`, mixer.ts:117-121; `Seed` "A u32, 0 … 2³² − 1", src/types/ids.ts:19-20). No document, world
  or site identifier enters the key. READ.
- L2. Layer codes live in two closed lists in the kernel: the block header's `LAYERS = ['ground', 'underground',
  'sky']` (plat/packages/kernel/src/io/format.ts:24-36) and the entity key's `layerCode` switch, ground 0 / underground
  1 / sky 2, refusing anything else (src/rng/layer.ts:7-19), plus `isPlatKey` (src/arena/plat.ts:243-246). The level
  digest hashes `TAG_LEVEL, layerCode, part, n` then the per-level roots (src/digest/levelDigest.ts:765-774). READ.
- L3. The block format's lattice-point numbering is built on the 2^23 range: `pointKey(x, y) = (y + 2^23) · 2^24 + (x +
  2^23)`, "exact below 2⁴⁸" (plat/packages/kernel/src/io/format.ts:38-46); a chunk header carries magic, format
  version, kind, role-registry version, layer code, part, then the frame (format.ts:1-9). READ.

---

## Gaps (what this reader did not read, could not run, or found absent)

1. **No test was run.** No Node 24 is on PATH (v22.22.0) or in the lane scratchpad; every "covered by test" fact is
   from reading test files, and the only pass counts quoted are the gate checker's own record of 2026-10-17 (G7).
2. **Kernel src read by exports and heads, not whole.** Every kernel file's exports were listed, but only the files
   marked "whole" in the header table were read whole; algorithm bodies (insert/, arr/, warp/, skeleton/engine.ts,
   invariants/, io/encode/decode, digest/levelDigest.ts beyond :762-790) were not read and nothing about their
   internals is characterized here beyond their own header comments and signatures.
3. **The other packages read by exports and heads.** model, site, layout, tables and testkit have no API.md (A1); their
   facts come from export lists, index files and the file heads named in the table. The layout stages (S3–S8 bodies),
   the hydrology bodies and the testkit harness bodies were not read.
4. **The test tree read by file names, plus the six gate files whole.** The 478 other test files (kernel 160, layout
   104, model 20, site 21, tables 11, testkit 105, bench 51, less the gate six) were not opened; what each covers is
   stated only by folder name (G1).
5. **Correction records not read** (J6): docs/validation/fix-all/ (r1–r5 kernel, determinism, pipeline, scope,
   rendering, verify and integration logs, index.md — ≈ 40 files, tens of thousands of lines), consistency/ beyond
   inventory-kernel.md (inventory-determinism 913, rewrite-kernel 520, repair/verify kernel and determinism rounds,
   SUMMARY), m1-corrections-1/2/3 bodies, clean-room-* bodies, bench/ scripts and outputs. Nothing in them is
   characterized. Note: these are design-side records of 2026-09 / 2026-10-03/04 (their heads say so), not records
   of the code's hardening.
6. **The code hardening records not read whole:** plat/docs/build/checks/hardening-inventory.md (2,445 lines; only §0
   read), refusal-census.md (292), rulings-hardening-1.md (370), the 53 checks/M0-*-notes.md files the FIX-NOW rows
   cite, and the 247 files of plat/docs/build/checks/. The in-flight rounds' subjects are recorded from their spec
   heads only (I4–I5), not from the source notes.
7. **The design text was not read:** docs/ARCHITECTURE.md, V13 and V14 are other lanes' (read-v13, read-v14,
   read-base); every design statement here is quoted from API.md, code comments, the gate spec, its checker record or
   the 2026-09-26 inventory (whose line numbers refer to ARCHITECTURE.md as it stood then).
8. **plat/docs/build/M0.md (1,287 lines) not read** (the read-m0 lane's); the §4b deferral rows are quoted only as the
   kernel's `STUB_TABLE` cites them (B11).
9. **Branches not inspected:** the wip/child-* branches were named from HANDOFF/PROGRESS only (I2); their contents and
   any landed-but-unmerged fixes on them are unknown here. Whether main's plat/ tree equals this branch's plat/ was not
   checked (no git command).
10. **Absent in the code (found by reading, recorded as facts above, listed here for the verifier):** no Z/elevation
    in the arena (B18, G6); no world, site or encounter stage, concern, role, record kind, digest layer, strategy kind,
    product or milestone name (B12, B25–B27, C3, C9, E5–E6); transient arenas stubbed to M6-P (B10–B11); the fusion
    harnesses empty (E8); M0-x-01 (the M0 record) and the timing phase not landed (E10); Layer a closed union with no
    registry (L2, H3 K1); CommitRecord without stage/batch/reads (H6); address and entity key without a document or
    world segment (C8, L1, H4 M1); the coordinate bound 2^23 cm (≈ 83.9 km; frame side ≤ ≈ 104.9 km at margin 0.3) is
    a fixed constant used by snap, the predicates' exactness argument and the block's pointKey (B4–B5, B22, L3).
11. **API.md drift not exhaustively checked:** nine moved line cites (B19) and four new tx exports (B20) were found by
    comparing against the export listing; the remaining 97 line comments of API.md were not each re-checked.

Lane landed 2026-10-18 (see docs/lane-events.log).
