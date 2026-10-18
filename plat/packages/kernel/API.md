# @plat/kernel — public API reference

Version documented: `@plat/kernel` 0.0.0 (`package.json`), source tree as of 2026-10-07, milestone M0.
All paths below are relative to `packages/kernel/`. Every signature is copied from the source; the HTML comment beside
it gives the file and line it was copied from. Statements marked **UNVERIFIED** could not be confirmed from source or
by running code. Statements marked **(run)** were confirmed by executing the example against the source tree on
2026-10-07 (Node 24.12.0, `tsx`).
Placed in the package by the kernel reuse round (build/M0-s-01-fix-s1, 2026-10-07) after a check of its own: each of
the 106 signatures with a line comment was compared with the source at that line, the example script was re-run with
the outputs shown, ten cited line references and the registry counts were re-read, and Appendix B was generated from
the TypeScript compiler's view of `src/index.ts` (669 names, every one of them listed there).

Revised 2026-10-17 (lane coherence/vtt-l-and-k11; `docs/build/choices.md` C-0374): §1's reuse table gains the row of the
role names the kernel branches on (the M0 world-sites gate's K11). No signature, source file or line reference elsewhere
in this document changed.

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — applied as recorded; the held-set clause and six wording and evidence points corrected (lane retrovalidation/small; J392)

---

## 1. What the kernel is, and what it is not

`@plat/kernel` is an exact-geometry library for building and editing a **planar subdivision** — vertices, edges and
faces with no crossings — on an integer centimetre lattice, together with the services that operate on it:
polygon booleans, buffers, offsets and insets, band construction, straight skeleton, oriented boxes, hulls, spatial
queries, deterministic hashing and serialisation, a deterministic RNG and deterministic transcendental math.

Its design goals, as stated in the code and in the design document it implements:

- **Exactness.** Coordinates are integers. Orientation and area are decided exactly (no float comparison decides
  topology). A computed point (a crossing, an offset corner) enters the subdivision only by being placed on the
  lattice through the insertion rules.
- **Never a silent wrong result.** An operation that cannot produce a valid result returns a typed refusal
  (`KernelResult` with `ok: false`) and changes nothing.
- **Transactions.** Every change to a subdivision happens inside a transaction that commits whole or is rejected
  whole.
- **Determinism.** The same inputs give the same arena, bit for bit, on every host.

What it is **not**:

- It holds **no domain knowledge of towns or maps in its algorithms**: no operation decides where a street, wall or
  building goes. Callers decide what to insert; the kernel decides only whether and how it can be inserted validly.
- It is **not** a general CAD kernel: no curves are stored (only straight edges between lattice points), no 3-D,
  no floating-point coordinates in the arena.
- It is **not** thread-aware; nothing in the source manages workers or concurrency.

**Reuse caveat — host vocabulary that ships inside the package (important for an outside user).** Although no
algorithm contains town logic, the package bundles data and a few defaults from the settlement generator it was
written for. An outside user inherits them:

| What | Where | Effect |
|---|---|---|
| The role registry: 56 named roles (`way`, `kerb`, `wall`, `shore`, `margin`, `border`, `plot_line`, `claim`, `invisible`, `junction`, `entrance`, … `deck_order_knot`) | `src/arena/roles.json`, loaded at module load by `src/arena/registry.ts:78` | Every role row you write must name a role in this file; an unknown role name is a programming error (throws). There is **no runtime API to supply your own registry** — `parseRoleRegistry` validates a document but `ROLE_REGISTRY` is fixed at load. To use other role names you must edit `roles.json` (append-only by its own rule). |
| Default role names written by operations | `faces/common.ts:460` (`plot_line` for `splitFace`/`connectHole`/`radialSplit`/`ringBand` cuts when no `rows` given), `faces/claim.ts:137` (`claim` for `claimSubFace`), `arr/bandUnion.ts:236` (`corridor_split`), `arr/corridorUnion.ts:43` (`kerb`), `arr/winding.ts:54` (`invisible`, scratch arenas only) | Pass explicit `rows` where the API allows it; `corridorUnion` and `bandUnion` always write these role names. |
| Default role names the kernel branches on, beyond those it writes (K11; `docs/build/choices.md` C-0374) | `insert/splitThrough.ts:116, 139` and `invariants/batch.ts:503` (`anchor`); `warp/held.ts:204–205` (`deck_end`, `gate_end`, `raised_foot`); `arr/bandUnion.ts:507, 757, 760` (`band`, the second value of `bandUnion`'s `edgeRole`) | A row of role `anchor` given without an ordinal gets one allocated by the kernel for that role alone (the design's contact names, §3.3 rule 2), and the prepared-contacts invariant row reads it; a vertex carrying `deck_end` or `gate_end` is held by `warp` unless the batch's level is 0, and one carrying `raised_foot` always (the design's held set, §3.6 (2)–(3)); `bandUnion` writes its outline as `kerb` or `band`, the caller's choice, and any other value throws. These names are fixed in the source — there is no runtime API to rename them (an injection through `TxEnv` would be an exported-API change, M1's if needed). |
| Linear-role part counts | `tx/tx.ts:418` `LINEAR_PARTS` (`way: 1, wall: 1, tunnel: 1, gallery: 1, rim: 1, chamber_wall: 1, deck: 1, shore/bank/margin/border: any`) | The commit check requires each entity of those roles to form that many simple chains. Override per transaction with `TxEnv.chainParts`. |
| RNG concern and stage registries (93 concerns such as `terrain.noise`, `water.river`, `reserve.castle`; stages `S0 Blueprint` …) | `src/registry/concerns.json`, `src/registry/stages.json`, generated constants `src/registry/ids.ts` | `Rng.stream` keys streams by a registered concern id and stage id. |
| Face kind `residue` | `faces/merge.ts:39` `FACE_KIND_RESIDUE = 1` | Written by `absorbSliver` when a sliver cannot be merged. |
| Level names | design only | The kernel treats L0–L4 as five nested refinement levels; the host generator names them land/water, way skeleton, corridors/blocks, plots, footprints. |

---

## 2. Installing and importing

```jsonc
// package.json (verbatim excerpt)
"name": "@plat/kernel", "version": "0.0.0", "private": true, "license": "UNLICENSED", "type": "module",
"sideEffects": false,
"exports": { ".": { "plat-source": "./src/index.ts", "types": "./dist/types/src/index.d.ts", "default": "./dist/index.js" } },
"dependencies": { "delaunator": "workspace:5.1.0", "flatbush": "workspace:4.6.2",
                  "robust-predicates": "workspace:3.0.3", "simplex-noise": "workspace:4.0.3" }
```

- There is **one entry point**, the package root. `src/index.ts` re-exports every module folder (`num`, `hash`,
  `dmath`, `rng`, `registry`, `arena`, `index`, `insert`, `tx`, `faces`, `arr`, `geom`, `skeleton`, `medial`, `warp`,
  `invariants`, `io`, `facade`, `noise`, `digest`, `types`). There are no sub-path exports.
- Under the custom export condition `plat-source` the package resolves to its TypeScript source (no build step);
  otherwise to the compiled `dist/`. The examples below were run from source (`tsx`, importing `src/index.ts`
  directly). Importing the compiled `dist/index.js` (after `corepack pnpm build`) was confirmed on 2026-10-07: its 419
  value exports are exactly the source's, and `hull` and `dmath.pow` ran from it.
- The package is `private` with licence `UNLICENSED`; the four runtime dependencies are pinned and vendored in the
  workspace (`workspace:` protocol). Publishing outside the workspace would need those resolved — **UNVERIFIED**.
- The source imports JSON (`roles.json`, `concerns.json`, `stages.json`); your toolchain must support JSON imports.
- **Licence and notices.** The packed package (`"files": ["dist", "API.md"]`) carries `dist/LICENSE` and
  `dist/THIRD-PARTY-NOTICES.txt`, which the build copies from `plat/`. The latter credits the vendored runtime
  libraries, Sun's fdlibm notice (dmath is a port of fdlibm 5.3; the eight ported files also keep Sun's notice as
  `/*! */` comments, which survive into `dist/index.js`), xoshiro128** (Blackman and Vigna, public domain; the RNG
  stream) and MurmurHash3 (Appleby, public domain; the hash). Anyone redistributing the kernel must keep those
  notices.
- Build flag `PLAT_DEBUG_BUILD` (a free identifier, `invariants/debug.ts`): a production bundle should `define` it
  as `false`; any build that leaves it undefined runs the debug-build assertions (§6.4).

---

## 3. The core model

### 3.1 Lattice, units and coordinates

- Every coordinate in an arena is an **integer centimetre**. The type `Cm` is a branded number
  (`number & { readonly __brand: 'Cm' }`, `types/units.ts:9`); a plain `number` is not a `Cm`. A position is
  `LatticePoint = { x: Cm; y: Cm }` (`types/units.ts:21`). `+y` is north; rings are counter-clockwise for outer
  boundaries and clockwise for holes.
- The lattice constants are fixed (`num/lattice.ts`):

  | constant | value | meaning |
  |---|---|---|
  | `LATTICE.unitCm` | 1 | one lattice unit |
  | `LATTICE.minEdgeCm` | 25 | the shortest edge any writer may create or leave |
  | `LATTICE.attractCm` | 26 | `minEdge` + 1 cm: points within this distance of an existing vertex or edge are attracted onto it |
  | `LATTICE.minFaceAngleCdeg` | 500 | 5°: the minimum face corner (soft for mandatory chains, hard for optional) |
  | `LATTICE.rangeCm` | 8 388 608 | 2²³: every coordinate satisfies \|x\|, \|y\| < 2²³ (≈ 83.9 km) |

- The range bound is what makes predicates exact in ordinary doubles: every coordinate difference is below 2²⁴ and
  every orientation determinant below 2⁴⁹ (design §3.2 (1)).
- Angles are **centidegrees** (`Cdeg`, i32). Derived values that no arena stores (skeleton nodes, OBB corners, fit
  targets) are doubles and are documented as such.
- `snap(x, y)` is the one door through which a `number` becomes a lattice coordinate: it rounds half away from zero
  and refuses NaN, ±∞ and anything at or past 2²³ with `E_OUT_OF_RANGE`.
  The arena-writing operations accept `{ x: number; y: number }` input points and snap them themselves.

```ts
export function snap(x: number, y: number): KernelResult<LatticePoint> {   // <!-- src/num/snap.ts:13 -->
export function frameOf(areaM2: number, aspect: number, marginShare: number): KernelResult<Frame> {   // <!-- src/num/frame.ts:25 -->
```

`frameOf` computes a centred rectangular `Frame` (`{ widthCm, heightCm, aspect, marginShare }`, `num/frame.ts`) of
area A m² at aspect ∈ [0.5, 2]; refusals `E_OUT_OF_RANGE` with detail `area`, `aspect`, `margin` or `range`.

```ts
snap(Number.NaN, 0)   // { ok: false, code: 'E_OUT_OF_RANGE', detail: 'x' }                (run)
snap(1.5, -1.5)       // { ok: true, value: { x: 2, y: -2 }, warnings: [] }                (run)
```

### 3.2 The arena (`Plat`)

An **arena** is one planar subdivision, stored as typed arrays (struct of arrays; "no Map or Set is reachable from a
Plat", `arena/plat.ts:147`). It is identified by a `PlatKey`:

```ts
export type PlatKey = { layer: Layer; part: number };   // <!-- src/types/ids.ts:17 -->
// Layer = 'underground' | 'ground' | 'sky'  (types/ids.ts)
```

The `Plat` interface (`arena/plat.ts:148`) holds: `key`, `frame`, `lattice`, `vertices` (x, y, one outgoing
half-edge, birth level, flags), `halfEdges` (origin, next, prev, per-pair birth level; `twin(h) = h ^ 1`), `roles`
(role rows), `faces` (five `LevelFaces`, one per level: outer half-edge, holes, kind, owner, parent, stage rank),
`indexHome`, `version` (bumped by every committed batch), `handles` and `slots`.

**Slots are kernel-internal.** `VertexId`, `HalfEdgeId` and `FaceId` are plain numbers indexing the tables. A slot
you receive from an operation is valid **only until the arena's next commit**. Never persist one; refer to geometry
persistently through the reference forms of §3.5. No kernel output depends on slot numbers (§5).

Two further structures are attached to an arena by separate calls:
- the **spatial index** (`attachIndex`, §7.11) — required before any transaction, query or insertion
  (`indexOf` throws `'the arena has no spatial index (attachIndex)'`, `index/spatial.ts:141`);
- the **maintained level digests** (`attachLevelDigests`, §7.12) — optional.

### 3.3 Levels L0 – L4

One arena holds **five refinement levels** as views (design §2.2 rule 2). Every edge carries a **birth level**; the
**level-n view** is the subdivision formed by the edges of level ≤ n. Every face record of level n + 1 has exactly
one parent face at level n (nesting). Consequences you will see in the API:

- A transaction writes **one level** (`KernelTx.level`). New edges, owners and role rows are of that level. Writing a
  coarser level returns `E_LEVEL`.
- A finer vertex on a coarser edge is a **Steiner** vertex (flag `VERTEX_STEINER`); removing the finer edge that needed
  it dissolves it and restores the coarser edge exactly (flag `VERTEX_SPLIT`).
- Where level n adds nothing inside a coarser face, that coarser face is its own child at level n and **holds no
  level-n record**: `LevelView.faces()` does not list it, `pointLocate` reports the coarser record and its level
  (`facade/types.ts:118ff`, `index/query.ts:70`).
- **Kept content** (design §3.3): every face records the rank of the stage whose batch created or last re-owned it. A
  batch may clear or cross finer content only where that content's rank is at least `KernelTx.rederivesFrom`'s;
  otherwise the op is refused `E_KEPT`. Stage ranks come from `TxEnv.rankOf` (default: the stage id).

### 3.4 Roles and owners

- **Owners.** Each face record may have one owner, an entity address id (`Id = string`, `types/ids.ts:5`). Owners are
  per level. `setOwner` re-owns faces; `FaceRef { owner, level }` names all faces an entity owns at a level.
- **Roles.** Edges and vertices carry **role rows** `(role, entity, level, ordinal)`. A writer adds
  `RoleRow = { role: RoleName; entity: Id; ordinal?: number }` (`arena/rows.ts:15`). Each role in the registry
  (`RoleInfo`, `arena/registry.ts:14`) has a `kind` (`'edge' | 'vertex'`), a `rank` (output order), and flags:
  `structural` (never removed by a merge or sliver absorption — `E_STRUCTURAL`), `indexed` (rows carry an ordinal),
  `knot` (a profile knot role). An edge with no role row left is deleted (design §2.2 rule 3).
- **Profiles.** A value that varies along a chain is a `ChainProfile` (`types/refs.ts:48`): `knotRole`, `values`
  (values[i] belongs to the chain vertex carrying (knotRole, entity, i)), `interp: 'linear' | 'step'`.

### 3.5 Referring to geometry

Outside a transaction, geometry is referred to only by these five forms (`types/refs.ts`):

```ts
export type FaceRef = { owner: Id; level: Level };                                    // <!-- src/types/refs.ts:16 -->
export type ChainRef = { role: RoleName; entity: Id };                                // <!-- src/types/refs.ts:19 -->
export type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };            // <!-- src/types/refs.ts:22 -->
export type VertexRef = { role: RoleName; entity: Id; ordinal?: number };             // <!-- src/types/refs.ts:25 -->
export type StretchRef = { chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint };  // <!-- src/types/refs.ts:28 -->
export type GeomRef = FaceRef | ChainRef | EdgeSetRef | VertexRef | StretchRef;       // <!-- src/types/refs.ts:31 -->
```

`resolve(ref, key)` turns one into current slots (§7.10). A reference that finds no geometry resolves **empty**
(never an error). `StretchRef` is batch-local and must not be stored.

### 3.6 Transactions and batches

Every write goes through `Kernel.tx` (or the module-level `tx`, §7.2). A transaction is described by a `KernelTx`:

```ts
export interface KernelTx {                       // <!-- src/tx/types.ts:37 -->
  key: TxKey;                 // a PlatKey (a TransientKey is accepted by shape and refused: not built)
  level: Level;               // the batch's one level
  ops: KernelOp[];            // declared form only; [] in the callback form
  expect: Invariant[];        // batch-scope hard rows (class floors and named checks)
  onFail: OnFail;             // 'reject' | 'repair' | 'downgrade'
  batch: BatchScope;
  stage: StageId;             // the issuing stage (its rank becomes the faces' stage when re-owned)
  rederivesFrom: StageId;     // finer faces of a stage ranked before it are kept content
  clearRegion?: Polygon[];    // declared; refused notBuilt('M3a')
  prepared?: VertexRef[];     // declared; refused notBuilt('M3a')
  workLimit: number;          // operations, never a clock; any finite value ≥ 0
}
```

(Comments abbreviated from the source's doc comments.) `BatchScope` (`tx/types.ts:15`) is
`{ kind: 'stage'; stage } | { kind: 'district'; id } | { kind: 'block'; id } | { kind: 'edit'; edit: number } | { kind: 'entity'; id }`.

**Two op forms** (exactly one per transaction; supplying both is a programming error that throws):

- **Callback form** — `kernel.tx(spec, (overlay) => …)`: the callback receives the open `Overlay` and calls writers
  on it; each writer applies at once and later calls see its result. The callback returns a `KernelResult`; a refusal
  rejects the batch.
- **Declared form** — `spec.ops` lists independent `KernelOp`s. The kernel applies them in **canonical order**
  (op-kind rank in `OP_KINDS`, then the owning entity's 64-bit lineage key, then the op's index; two ops with one key
  are refused), so the result depends on the op *set*, not the order you listed them. Build ops with the `op…`
  constructors (`opInsertChain`, `opSplitFace`, …) or `kernelOp`.

**Commit or reject, atomically.** After the ops: a work-limit check, the `expect` entries (under `onFail`), the
kernel's own batch-local invariants (role consistency, level consistency, clearance, index freshness) and, if
injected, `TxEnv.invariants`. Any failure **rejects**: the arena returns to its prior version. A batch that wrote
nothing commits nothing, keeps the version and returns `record: null`. On commit the version increments, a
`CommitRecord` (`tx/types.ts:100`: dirty faces per level, edge and Steiner counts, `work`, `moved`, `promoted`,
`demoted`, `unflagged`, `owners`, `roles`, `warnings`) is returned, and `TxEnv.onCommit` is called.

`onFail: 'repair'` runs the injected `TxEnv.repair` (normally `absorbSliver`) on each face below its width or area
floor, then re-checks; `'reject'` and `'downgrade'` both commit nothing and return the code (`tx/tx.ts` `run`;
the difference is for the caller's own retry ladder).

**Work limits.** Operations charge counts (points snapped, attraction queries, placement candidates, crossings, faces
walked, …) to the transaction; exceeding `workLimit` returns `E_WORK_LIMIT` with the counter name in `detail`.
Counts are machine-independent.

**Injected services** (`TxEnv`, `tx/types.ts:179`, passed once to `createKernel`): `floors`, `appliesTo`, `width`,
`checks`, `rankOf`, `repair`, `chainParts`, `invariants`, `onCommit`. The kernel imports no tables; everything
domain-specific is injected.

**Slot stamps.** In a debug build every object a façade call returns is stamped (in a WeakMap) with its arena key and
version; passing a stale or foreign-arena value to a stamped check throws. `Kernel.assertCurrent(value, key?)` runs
that check explicitly. Production bundles (`PLAT_DEBUG_BUILD = false`) skip it.

---

## 4. Determinism guarantees

What the source and its design state, and what was confirmed by running code:

1. **Integer geometry, exact predicates.** `orient2d`, `area2` (exact up to 2⁵³, with a BigInt fallback `area2Big`)
   and the lattice range make every topological decision exact (`num/predicates.ts`).
2. **No slot-dependent output.** "Every tie-break in the kernel uses lattice positions (y, then x), canonical item keys
   … or entity ids, never a VertexId, HalfEdgeId or FaceId" (design §3.3). `compactSlots` exists so that a renumbered
   arena gives identical results for the same next edit (`io/compact.ts`).
3. **Canonical op order** in declared batches. **(run)**: three `opInsertChain` ops issued in order [0,1,2] and in
   order [2,0,1] gave the same arena version and the same level-1 digest
   `849244311,1260049561,693924550,3068395885`, identical across two separate processes.
4. **Deterministic transcendentals.** `dmath` (`pow`, `log`, `exp`, `sin`, `cos`, `atan2`, `atan`) reproduces fdlibm
   5.3 "to the bit on every host" (`dmath/index.ts:14`). Kernel code does not use `Math.PI` or other non-allowlisted
   `Math` functions (enforced by a lint rule in the host project, not by the package — **UNVERIFIED** for your build).
5. **Deterministic RNG.** xoshiro128** streams keyed by a 128-bit key; no float on the state (`rng/stream.ts`).
   **(run)**: the same seed key, stage and concern gave the same first draws in two processes.
6. **Digests.** `levelDigest(plat, n)` is a 128-bit MurmurHash3 over the level-n content in canonical order; "no
   double enters" (`digest/levelDigest.ts`). It is a pure function of content: **(run)** it was identical after an
   `encodeArena`/`decodeArena` round trip and after `compactSlots`.
7. **Work, not time.** Budgets are operation counts, so a slow machine produces the same output as a fast one.

A kernel change that moves output is meant to be declared: `ENGINE_VERSION` (`facade/engine.ts`) "raised by one on
every change that moves an integer output of the booleans, buffers or bands", and `ARENA_BLOCK_FORMAT` /
`ROLE_REGISTRY_VERSION` version the serialised form.

---

## 5. The failure contract

### 5.1 `KernelResult`

```ts
export type KernelResult<T> =                                                  // <!-- src/num/result.ts:43 -->
  | { ok: true; value: T; warnings: Warning[] }
  | { ok: false; code: KernelError; detail: string; partial?: T };
export type Warning = { code: WarningCode; count: number; at?: LatticePoint }; // <!-- src/num/result.ts:41 -->
```

Constructors (`num/result.ts:51–61`): `ok(value, warnings?)`, `err(code, detail, partial?)`,
`degenerate(detail, partial?)`.

**Error codes** (`KernelError`, `num/result.ts:7`): `E_OUT_OF_RANGE`, `E_DEGENERATE`, `E_LEVEL`, `E_LOCKED`,
`E_KEPT`, `E_SCOPE`, `E_STRUCTURAL`, `E_NOT_TWO_CROSSINGS`, `E_HOLE_CONTACT`, `E_SELF_INTERSECT`,
`E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_BELOW_MIN_AREA`, `E_BELOW_MIN_WIDTH`, `E_NON_CONVEX`, `E_NO_PATH`,
`E_WORK_LIMIT`, `E_INVARIANT`. (`E_LOCKED` and `E_SCOPE` are declared; no M0 operation produces them — their
features are not built.)

`E_DEGENERATE`'s `detail` names a row (`DegenerateDetail`, `num/result.ts:48`): `ratio`, `collinear`, `fit`,
`empty`, `collapsed`, `stretch`, `seed`, `fixed`, `overlap`.

**Warning codes** (`WarningCode`, `num/result.ts:28`): `W_ATTRACTED`, `W_STRETCH_SHARED`, `W_WEDGE_ROUTED`,
`W_PLACED`, `W_PROMOTED`, `W_SNAP_PASSES`, `W_ACUTE_CORNER`, `W_SLIVER_RETYPED`, `W_HEIGHT_CLAMPED`,
`W_DOWNGRADE`, `W_CUT_SLID`. A warning means the result committed but something moved or was simplified; `count`
aggregates occurrences.

### 5.2 Refusal versus programming error

The kernel separates two kinds of failure:

| | **Refusal** | **Programming error** |
|---|---|---|
| Cause | the geometry cannot be done validly (too short, would cross kept content, empty result, over budget, …) | the call breaks a precondition: unknown role name, vertex role passed where an edge role is required, a face slot not live at the batch's level, both op forms in one transaction, a service that needs an open transaction called outside one, a stale or foreign slot in a debug build, `kerb`/`corridorUnion` without `spineWidths`, a bad distance list for `offsetFace`, a `notBuilt` branch |
| Form | returned `KernelResult` with `ok: false` | thrown `Error` (or `RangeError` where documented) |
| Arena | unchanged (writers decide every refusal before writing, or undo their own writes; the transaction then rolls back) | the transaction restores its savepoint, then re-throws (`tx/tx.ts:553`) |

### 5.3 The N-44 rule: no throw, no silent wrong result, counted refusals

The project adopted a rule (its spec note N-44) for every operation:

1. **No throw on valid input.** Every failure is a typed refusal. `insertChain` enforces this at its boundary: an
   invariant check that throws inside the op is caught and returned as `E_INVARIANT` with the check's message
   (`insert/insertChain.ts:1081`).
2. **No silent wrong result.** A result is committed only if it keeps every bar checked at commit — the clearance rule
   (every vertex at least `minEdge` from every edge outside its one-ring) and, for `insertChain`, a **fidelity bound**:
   each committed route lies within 2·√2·`attractCm` (≈ 73.5 cm) of the input segment, Hausdorff distance both ways.
   Otherwise the chain is refused (`E_INVARIANT`, or `E_BELOW_MIN_EDGE` for an optional chain, detail ending
   `leaves the fidelity bound (N-43)`). There is no "best effort" commit.
3. **A counted, capped refusal rate.** Refusals on random input are expected to be rare but are not zero. The
   project's randomized tests (B-FUZZ and the boolean/buffer agreement tests) count refusals per operation and per
   input family and fail the build above a cap (target 1 per 10⁴ cases). **This counting is a test-suite discipline;
   the kernel exposes no runtime refusal counter.** Callers should count `ok: false` results themselves. The measured
   residual rates are **UNVERIFIED** in this document (they live in the project's check records, not in source).

Operations built on `insertChain` (booleans, buffer, offsetFace, insetRing, kerb, bands, face splits) inherit its
refusals: the arrangement engine inserts every operand segment through `insertChain` on a scratch arena.

---

## 6. Getting started (verified example)

```ts
import {
  createPlat, attachIndex, createKernel, attachLevelDigests, updateLevelDigests,
  type KernelTx, type PlatKey, type StageId, type LatticePoint, type Cm,
} from '@plat/kernel';

const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
const key: PlatKey = { layer: 'ground', part: 0 };

// 1. An empty arena, its spatial index, (optionally) its maintained digests.
const plat = createPlat(key, { widthCm: 200000 as Cm, heightCm: 200000 as Cm, aspect: 1, marginShare: 0.3 });
attachIndex(plat, { gridCellCm: [800, 400, 200, 100, 50] });
attachLevelDigests(plat);

// 2. A kernel over it; the digest listener keeps the digests current on every commit.
const kernel = createKernel(new Map([[key, plat]]), {
  env: { onCommit: (p, dirty, record) => updateLevelDigests(p, dirty, record) },
});

const S = 1 as StageId;
const batch = (level: 0 | 1 | 2 | 3 | 4): KernelTx => ({
  key, level, ops: [], expect: [], onFail: 'reject',
  batch: { kind: 'stage', stage: S }, stage: S, rederivesFrom: S, workLimit: 1_000_000,
});

// 3. The arena's outer ring at L0 (callback form). The first batch writes it.
const r0 = kernel.tx(batch(0), (o) =>
  kernel.geom.insertChain(o, [P(0, 0), P(4000, 0), P(4000, 4000), P(0, 4000)],
    [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true }));
// r0.ok === true, r0.value.record.version === 1                                    (run)

// 4. An L1 chain across it: two L1 faces result.
const r1 = kernel.tx(batch(1), (o) =>
  kernel.geom.insertChain(o, [P(0, 2000), P(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
// r1.value.value  -> { placed: [4, 5] }   (slots; valid until the next commit)     (run)
// kernel.view(key, 1).faces().length -> 2                                           (run)

// 5. A refusal: an optional chain shorter than minEdge. Nothing changes.
const r2 = kernel.tx(batch(1), (o) =>
  kernel.geom.insertChain(o, [P(100, 100), P(110, 100)], [{ role: 'way', entity: 'way:2' }], 'optional'));
// r2 -> { ok: false, code: 'E_BELOW_MIN_EDGE',
//         detail: 'fewer than two distinct points after decimation' }; plat.version still 2   (run)
```

Note that `'margin'` and `'way'` are role names from the bundled registry (§1). The examples were executed with the
import specifier pointed at `packages/kernel/src/index.ts` (the `plat-source` resolution); the `'@plat/kernel'`
specifier shown is the package name and resolves to the same module under that condition.

---

## 7. API reference by area

Conventions: "Refusals" lists the `KernelResult` codes an operation documents. "Throws" lists documented
programming errors. Writers take the open `Overlay` as first argument and may only be called inside a transaction
on the arena that overlay belongs to.

### 7.1 Creating an arena and a kernel

```ts
export function createPlat(key: PlatKey, frame: Frame, capacity: Partial<PlatCapacity> = {}): Plat {   // <!-- src/arena/plat.ts:245 -->
```
An empty arena (no vertex, edge, face or role row; version 0). `capacity` sizes the initial tables (each still grows
by doubling; `PlatCapacity`, `arena/plat.ts:167`). Throws on a malformed key or frame (non-positive or non-integer
sides, aspect outside [0.5, 2], negative margin). The outer ring is written by your first batch.

```ts
export function createKernel(plats: ReadonlyMap<PlatKey, Plat>, options: KernelOptions = {}): Kernel {   // <!-- src/facade/kernel.ts:75 -->
export interface KernelOptions {                                                                         // <!-- src/facade/kernel.ts:44 -->
  readonly env?: TxEnv;
  readonly spineWidths?: SpineWidths;
}
```
The façade over a set of arenas. Each map entry's key must equal its arena's key; two entries naming one arena throw.
`env` is injected into every transaction; `spineWidths` is required by `geom.kerb` and `geom.corridorUnion` (calling
them without it throws). The returned object and its `geom` and `index` members are frozen.

```ts
export interface Kernel {                                                                   // <!-- src/facade/types.ts:148 -->
  plat(key: PlatKey): Plat;                                                                 // <!-- :150 -->
  view(key: ArenaKey, level: Level): LevelView;                                             // <!-- :152 -->
  resolve(ref: GeomRef, key: PlatKey): Resolved;                                            // <!-- :154 -->
  readonly geom: GeomOps;
  readonly index: IndexOps;
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>>;  // <!-- :161 -->
  rng(options?: RngOptions): Rng;                                                           // <!-- :163 -->
  readonly pool: NotBuiltStub<'M1'>;
  assertCurrent(value: unknown, key?: PlatKey): void;                                       // <!-- :171 -->
}
```
- `plat(key)` returns the arena (throws for a key the kernel does not hold).
- `view(key, level)` — a `LevelView` (§7.10).
- `resolve` — §7.10.
- `tx` — §7.2.
- `rng(options?)` — a new derivation RNG (`createRng`, §7.13).
- `pool` — not built (see §8).
- `assertCurrent` — the debug build's stamp check; a no-op in production builds.

Related: `isTransientKey(k)` (`facade/kernel.ts:63`), `ArenaKey = PlatKey | TransientKey` (`facade/types.ts:31`).

### 7.2 Transactions

```ts
// Kernel.tx (façade)                                                                       <!-- src/facade/types.ts:161 -->
tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>>;
// module form, on an arena directly
export function tx<T>(p: Plat, spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>, env: TxEnv = {}): KernelResult<Committed<T | KernelResult<unknown>[]>> {   // <!-- src/tx/tx.ts:548 -->
export interface Committed<T> {                                                             // <!-- src/tx/tx.ts:60 -->
  readonly record: CommitRecord | null;
  readonly value: T;
}
```
Returns the commit record (null when nothing was written) and the callback's value (callback form) or the ops'
results in issue order (declared form). Refusals: any op's or the callback's code (declared form: detail prefixed
`<kind> (op <i>): `), `E_WORK_LIMIT`, a failed `expect` entry (`E_BELOW_MIN_WIDTH` / `_AREA` / `_ANGLE` for class
floors, `E_INVARIANT` for named checks), `E_INVARIANT` for a failed kernel row. Throws: both forms supplied; a
`TransientKey`, `clearRegion` or `prepared` (not built); a programming error raised inside the batch (after restoring
the arena).

Declared ops:
```ts
export function kernelOp<T>(kind: KernelOp['kind'], lineage: readonly [number, number], index: number, apply: (overlay: Overlay) => KernelResult<T>): KernelOp<T> {   // <!-- src/tx/tx.ts:644 -->
export function canonicalOrder(ops: readonly KernelOp[]): number[] {                         // <!-- src/tx/tx.ts:147 -->
export function opInsertChain(lineage: LineageHash, index: number, points: readonly LatticePoint[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelOp<ChainInsert> {   // <!-- src/tx/ops.ts:16 -->
```
Also `opSplitThrough`, `opRemoveEdges`, `opClearFiner`, `opRetypeEdges`, `opSetOwner` (`tx/ops.ts:117–152`),
`opSplitFace`, `opConnectHole`, `opMergeFaces`, `opAbsorbSliver`, `opClaimSubFace`, `opRadialSplit`, `opRingBand`,
`opPinVertices` (`faces/ops.ts:14–42`), `opCorridorUnion` (`arr/corridorUnion.ts:54`), `opBandUnion`
(`arr/bandUnion.ts:344`). Each takes `(lineage, index, …the writer's arguments after the overlay)`.
`LineageHash` is `[number, number]` (two u32 words, `hash/types.ts:12`). `OP_KINDS` (`tx/types.ts:64`) lists the
seventeen writer kinds in rank order. `touchedFaces(record)` (`tx/tx.ts:311`) sums a record's dirty faces.

Example (declared form; **(run)**: same digest for op orders [0,1,2] and [2,0,1]):
```ts
import { opInsertChain } from '@plat/kernel';
const ops = [
  opInsertChain([1, 0], 0, [P(0, 2000), P(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'),
  opInsertChain([2, 0], 0, [P(2000, 0), P(2010, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'),
];
const r = kernel.tx({ ...batch(1), ops });   // no callback: declared form
```

### 7.3 Inserting and removing chains

All are **writers** (first argument: the open `Overlay`). Through the façade the type is `OnTx<typeof fn>`
(`facade/types.ts:50`), i.e. the same signature with the overlay first.

**insertChain** — the one door for new edges.
```ts
export function insertChain(tx: InsertTx, points: readonly { readonly x: number; readonly y: number }[], roles: readonly RoleRow[], cls: ChainClass, opts: InsertChainOpts = {}): KernelResult<ChainInsert> {   // <!-- src/insert/insertChain.ts:849 -->
export type ChainClass = 'mandatory' | 'optional';                                          // <!-- src/insert/classes.ts:20 -->
export interface InsertChainOpts {                                                          // <!-- src/insert/insertChain.ts:98 -->
  readonly closed?: boolean;
  readonly pinned?: readonly number[];   // chain indices exempt from decimation
  readonly knots?: readonly Knot[];      // vertex role rows on the chain's own vertices
}
export interface ChainInsert {                                                              // <!-- src/insert/insertChain.ts:107 -->
  readonly placed: VertexId[];           // per input point, in input order; valid until the next commit
}
```
Processing (module comment, `insert/insertChain.ts:1–40`): (1) snap and decimate, split into simple runs;
(2) each point lands by **attraction** — onto the nearest vertex within `attractCm`, an edge endpoint, or a split
of the nearest edge at its placement point; (3)–(4) each segment is routed through the vertices it passes, shares
the stretches it runs along, and is split at exact crossings (snap rounding, ≤ 3 passes); (5) affected faces are
re-walked. `roles` must be **edge** roles (vertex rows go in `opts.knots`); every new and shared edge gains them at
the batch's level.

Chain classes decide what happens at a precision limit (`CLASS_OUTCOMES`, `insert/classes.ts:43`):

| reason | mandatory | optional |
|---|---|---|
| fewer than two distinct points left | refuse `E_DEGENERATE` `empty` | refuse `E_BELOW_MIN_EDGE` |
| a corner below `minFaceAngle` | commit, `W_ACUTE_CORNER` | refuse `E_BELOW_MIN_ANGLE` |
| wedge routing would move it more than `attractCm` | commit, `W_WEDGE_ROUTED` | refuse `E_BELOW_MIN_EDGE` |
| a ring that must be simple crosses itself | refuse `E_SELF_INTERSECT` | refuse `E_SELF_INTERSECT` |

Refusals overall: `E_DEGENERATE` `empty`, `E_KEPT`, `E_LEVEL`, `E_OUT_OF_RANGE`, `E_WORK_LIMIT`, `E_INVARIANT`
(no route keeps clearance within the fidelity bound — counted, §5.3); optional chains also `E_BELOW_MIN_EDGE`,
`E_BELOW_MIN_ANGLE`. The op is atomic: a refusal undoes all its writes, index entries, journals and warnings.
Warnings: `W_ATTRACTED`, `W_STRETCH_SHARED`, `W_WEDGE_ROUTED`, `W_PLACED`, `W_PROMOTED`, `W_SNAP_PASSES`,
`W_ACUTE_CORNER`. Throws: an unknown or vertex role in `roles`, an indexed role without its ordinal, a bad ordinal.

**splitThrough** — a vertex on an existing edge.
```ts
export function splitThrough(tx: InsertTx, at: HalfEdgeId, p: LatticePoint, row?: RoleRow): KernelResult<VertexId> {   // <!-- src/insert/splitThrough.ts:326 -->
```
The vertex at `p` on the edge of half-edge `at`, with `row` on it. Refusals (writing nothing): `E_OUT_OF_RANGE`,
`E_LEVEL`, `E_WORK_LIMIT`.

**removeEdges** — strip a role from edges (the removal door).
```ts
export function removeEdges(o: Overlay, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef, profiles: readonly AnyProfile[] = []): KernelResult<RemoveResult> {   // <!-- src/tx/writers.ts:274 -->
```
Strips `(role, entity)` from the ref's edges (a `StretchRef`: only that stretch, after cut knots at its ends) or a
vertex role row; edges left with no row are deleted, then re-levelling and Steiner dissolution follow. Hand in the
chain's profiles to receive the remaining part's (`RemoveResult`, `tx/types.ts:155`). Refusals: `E_DEGENERATE`
`stretch`, `E_LEVEL`, `E_KEPT`, `E_WORK_LIMIT`.

**retypeEdges** — add / strip / re-key roles on a chain.
```ts
export function retypeEdges(                                                               // <!-- src/tx/writers.ts:368 -->
  o: Overlay,
  ref: ChainRef | EdgeSetRef | StretchRef,
  add: readonly RoleRow[],
  remove: readonly RoleName[],
  rekey?: { from: Id; to: Id; profiles?: { from?: AnyProfile; to?: AnyProfile }[] },
): KernelResult<RetypeResult> {
```
Refusals: `E_DEGENERATE` `stretch`, `E_LEVEL`, `E_KEPT`, `E_WORK_LIMIT`. Returns both entities' new profiles.

**clearFiner** — remove finer content inside faces.
```ts
export function clearFiner(o: Overlay, faces: FaceRef, level: Level): KernelResult<Conflict[]> {   // <!-- src/tx/writers.ts:546 -->
```
Clears every face record finer than `level` nested in the FaceRef's faces, except kept content. Returns conflicts
(always `[]` at M0: locks and pins are not built). Refusals: `E_LEVEL` (level below the batch's), `E_WORK_LIMIT`.

**setOwner**
```ts
export function setOwner(o: Overlay, faces: readonly FaceId[], owner: Id): KernelResult<void> {   // <!-- src/tx/writers.ts:611 -->
```
Re-owns faces of the batch's level; each takes the batch's stage rank. Throws for a face not live at that level or
an empty owner. Refusal: `E_WORK_LIMIT`.

**pinVertices**
```ts
export function pinVertices(o: Overlay, refs: readonly VertexRef[]): KernelResult<void> {   // <!-- src/faces/claim.ts:203 -->
```
Sets the kernel `pinned` flag (exempt from smoothing moves). Refusals: `E_LEVEL`, `E_WORK_LIMIT`.

Profile helpers (`tx/profile.ts`): `sampleProfile(plat, profile, owner, key, atCm)` (`:265`) samples a chain profile
at a spacing or per vertex; also `cutKnot`, `joinProfiles`, `renumberKnots`, `routeLines`, `knotLines`,
`sampleChain`, `sameValue`, `JOIN_TOLERANCE_CM`. `resolveStretch(p, key, ref)` (`tx/chains.ts:159`) resolves a
`StretchRef`.

### 7.4 Faces: split, merge, partition

```ts
export interface CutOpts {                                                                  // <!-- src/faces/split.ts:26 -->
  readonly rows?: readonly RoleRow[];   // the cut's edge rows (default: the face owner's `plot_line`)
  readonly faceLevel?: Level;           // the face's level when it is a coarser record that is its own child here
}
export function splitFace(o: Overlay, face: FaceId, cut: readonly { readonly x: number; readonly y: number }[], opts: CutOpts = {}): KernelResult<[FaceId, FaceId]> {   // <!-- src/faces/split.ts:170 -->
export function connectHole(o: Overlay, face: FaceId, cut: readonly { readonly x: number; readonly y: number }[], opts: CutOpts = {}): KernelResult<FaceId> {   // <!-- src/faces/split.ts:203 -->
export function mergeFaces(o: Overlay, a: FaceId, b: FaceId): KernelResult<FaceId> {       // <!-- src/faces/merge.ts:90 -->
export function absorbSliver(o: Overlay, face: FaceId, floor: { minWidthCm: Cm | number; minAreaCm2: number }): KernelResult<FaceId> {   // <!-- src/faces/merge.ts:142 -->
export function radialSplit(o: Overlay, face: FaceId, apex: { readonly x: number; readonly y: number }, raysCdeg: readonly number[], opts: CutOpts = {}): KernelResult<FaceId[]> {   // <!-- src/faces/fan.ts:106 -->
export function ringBand(o: Overlay, face: FaceId, widthCm: Cm | number, opts: CutOpts = {}): KernelResult<{ band: FaceId[]; core: FaceId }> {   // <!-- src/faces/fan.ts:256 -->
export function claimSubFace(o: Overlay, claim: SubFaceClaim, owner: Id, opts: { readonly rows?: readonly RoleRow[] } = {}): KernelResult<FaceRef> {   // <!-- src/faces/claim.ts:119 -->
```

| op | result | refusals (each writes nothing) |
|---|---|---|
| `splitFace` | the two children, the face left of the directed cut first | `E_NOT_TWO_CROSSINGS`, `E_HOLE_CONTACT` (cut joins outer ring to a hole, or two holes), plus insertChain's `E_KEPT`, `E_LEVEL`, `E_OUT_OF_RANGE`, `E_WORK_LIMIT` |
| `connectHole` | the same face, one hole fewer | `E_HOLE_CONTACT`, `E_NOT_TWO_CROSSINGS`, insertChain's codes |
| `mergeFaces` | the merged face; −1 when the merged region is its parent's own child again | `E_STRUCTURAL`, `E_LEVEL`, `E_DEGENERATE` `empty` (no shared edge, or a = b), `E_WORK_LIMIT` |
| `absorbSliver` | the face itself (above both floors), the merged face, or the face retyped `residue` (`W_SLIVER_RETYPED`) | `E_WORK_LIMIT` only |
| `radialSplit` | the sectors, counter-clockwise | `E_DEGENERATE` `empty` (no ray), `E_NOT_TWO_CROSSINGS`, `E_HOLE_CONTACT`, the doors' codes |
| `ringBand` | band faces counter-clockwise from the lowest-leftmost corner, and the core | `E_NON_CONVEX`, `E_BELOW_MIN_WIDTH`, `E_DEGENERATE` `collapsed`, `E_NOT_TWO_CROSSINGS`, the doors' codes |
| `claimSubFace` (ring form) | the claim's `FaceRef { owner, level }` | `E_DEGENERATE` `empty` / `collapsed`, `E_SELF_INTERSECT`, insertChain's codes, `E_WORK_LIMIT` |

`mergeFaces ∘ splitFace` restores the ring and the face id (`faces/split.ts` module comment). Every multi-cut op is
atomic. `SubFaceClaim` (`faces/claim.ts:46`) also declares a score form `{ areaCm2, within, score }` that is not
built; the façade types `claimSubFace` with the ring form only (`RingClaim`, `facade/types.ts:53`).
`isPinned(p, v)` (`faces/claim.ts:228`).

### 7.5 Booleans, buffers, offsets, insets

These run on a private **scratch arrangement**: every operand segment is inserted through `insertChain` on a
throw-away one-level arena, faces are labelled by winding number, and the kept region is traced. Output rings obey
the insertion rules (attraction, `minEdge`, clearance). Outer rings are counter-clockwise, holes clockwise, each
started at its lowest-leftmost vertex. `Ring = Polygon` = `PointCm[]`, closing vertex not repeated
(`arr/winding.ts:48`).

```ts
export type BooleanOp = 'union' | 'intersection' | 'difference' | 'xor';                   // <!-- src/arr/booleans.ts:14 -->
export type FillRule = 'nonzero' | 'evenodd';                                               // <!-- src/arr/booleans.ts:17 -->
export function booleans(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): KernelResult<Ring[]> {   // <!-- src/arr/booleans.ts:39 -->
```
Refusals: `E_DEGENERATE` `empty` (an empty result; the refusal carries the overlay's warnings, type `EmptyResult`,
`arr/winding.ts:732`), `E_OUT_OF_RANGE`. Pure: needs no arena or transaction.

```ts
// (run)
const sq = (x0: number, y0: number, s: number) => [P(x0, y0), P(x0 + s, y0), P(x0 + s, y0 + s), P(x0, y0 + s)];
booleans('union', [sq(0, 0, 1000)], [sq(500, 500, 1000)], 'nonzero');
// -> ok, one 8-vertex ring starting (0,0),(1000,0),(1000,500),(1500,500),(1500,1500),(500,1500),(500,1000),(0,1000)
booleans('intersection', [sq(0, 0, 100)], [sq(500, 500, 100)], 'nonzero');
// -> { ok: false, code: 'E_DEGENERATE', detail: 'empty', ... }
```

```ts
export type JoinKind = 'round' | 'square' | 'miter';                                        // <!-- src/arr/buffer.ts:30 -->
export type EndKind = 'round' | 'square' | 'flat';                                          // <!-- src/arr/buffer.ts:33 -->
export function buffer(                                                                     // <!-- src/arr/buffer.ts:345 -->
  chains: readonly (readonly LatticePoint[])[],
  halfWidthCm: Cm | number | readonly (Cm | number)[],
  joins: JoinKind,
  ends: EndKind,
): KernelResult<Ring[]> {
```
The union of per-segment strips and per-vertex joins. Round joins/ends use chords of at most 2 cm sagitta
(`SAGITTA_CM`). Half-width is one non-negative number or one per input point; anything else is a `RangeError`.
Refusals: `E_DEGENERATE` `empty`, `E_OUT_OF_RANGE`. Pure. **(run)**
`buffer([[P(0,0), P(1000,0)]], 100, 'round', 'flat')` → one 4-point ring. Helpers: `bufferParts`, `ringEdgeParts`,
`arcSteps`, `maxArcStep`, `UNION_FAN_IN`.

```ts
// façade forms (bind the open transaction)
readonly offsetFace: (face: FaceId, perEdgeCm: readonly (Cm | number)[]) => KernelResult<Ring[]>;   // <!-- src/facade/types.ts:92 -->
readonly insetRing: (face: FaceId, dCm: Cm | number) => KernelResult<Ring[]>;                       // <!-- src/facade/types.ts:93 -->
// module forms
export function offsetFace(tx: InsertTx, face: FaceId, perEdgeCm: readonly (Cm | number)[]): KernelResult<Ring[]> {   // <!-- src/arr/offsetFace.ts:88 -->
export function insetRing(tx: InsertTx, face: FaceId, dCm: Cm | number): KernelResult<Ring[]> {                       // <!-- src/arr/insetRing.ts:120 -->
```
- `offsetFace` — the face minus the union of each edge's round-ended buffer by its own distance; works on concave
  faces with holes. Edge order is `faceEdges`' (outer ring from its lowest-leftmost vertex counter-clockwise, then each
  hole). A list of the wrong length or a negative / non-finite distance is a `RangeError`. Refusal: `E_DEGENERATE`
  `empty`.
- `insetRing` — a uniform inset of a **convex** face by half-plane clipping; `dCm = 0` returns the face's ring,
  negative insets outward. Refusals: `E_NON_CONVEX`, `E_DEGENERATE` `collapsed` (type `InsetCollapsed`,
  `arr/insetRing.ts:30`: carries `lastCm`, the largest whole distance whose inset is non-empty, and that inset as
  `partial`). A non-integer `dCm` is a `RangeError`.
- Both are **services that read the open transaction**: through the façade they must be called inside `kernel.tx`
  (outside, they throw `…reads the open transaction's arena and is called only inside one`).

```ts
export function tileRings(rings: readonly (readonly LatticePoint[])[]): KernelResult<Ring[][]> {   // <!-- src/arr/tileRings.ts:133 -->
```
Per input ring, its pieces not covered by earlier rings (counter-clockwise); `[]` for no rings. Refusals:
`E_DEGENERATE` `overlap` (a piece with a hole; type `TileOverlap` with `ring` and `at`), `E_OUT_OF_RANGE`. Pure.

Lower-level arrangement access: `buildOverlay`, `windingLabels`, `ScratchOverlay`, `WindingLabels`
(`arr/winding.ts`), `canonicalFaceRings`, `faceEdges` (`arr/offsetFace.ts`).

### 7.6 Bands: kerb, corridor, band union

Callers declare the half-width of each spine chain through a callback:
```ts
export type SpineEnd = 'round' | 'square';                                                  // <!-- src/arr/kerb.ts:49 -->
export interface SpineWidth {                                                               // <!-- src/arr/kerb.ts:55 -->
  readonly halfWidthCm: Cm | number | ChainProfile<number>;
  readonly ends?: SpineEnd;
}
export type SpineWidths = (chain: ChainRef) => SpineWidth | null | undefined;              // <!-- src/arr/kerb.ts:64 -->
```

```ts
readonly kerb: (face: FaceId) => KernelResult<Ring[]>;                                      // <!-- src/facade/types.ts:88 -->
export function kerb(tx: InsertTx, face: FaceId, widths: SpineWidths): KernelResult<Ring[]> {   // <!-- src/arr/kerb.ts:386 -->
```
For an L1 face F: `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding spines (round joins on the convex
side, square ends where declared). Read-only. A face with no bounding spine gives its own rings; a face wholly
within its bands gives `ok([])`. Requires an open transaction (façade) and `spineWidths` on the kernel.

```ts
readonly corridorUnion: (tx: Overlay, l1Faces: FaceRef | readonly FaceId[]) => KernelResult<BandResult>;   // <!-- src/facade/types.ts:78 -->
export function corridorUnion(o: Overlay, l1Faces: FaceRef | readonly FaceId[], widths: SpineWidths): KernelResult<BandResult> {   // <!-- src/arr/corridorUnion.ts:35 -->
export function bandUnion(o: Overlay, chains: readonly BandChain[], faces: readonly FaceId[], edgeRole: 'kerb' | 'band', owner: Id): KernelResult<BandResult> {   // <!-- src/arr/bandUnion.ts:317 -->
export interface BandChain { readonly ref: ChainRef; readonly halfWidthCm: Cm | number | ChainProfile<number>; readonly ends: SpineEnd; }   // <!-- src/arr/bandUnion.ts:67 -->
```
- `corridorUnion` commits `kerb(F)` at **L2** for the given L1 faces: kerb edges (role `kerb`), `corridor_split`
  edges at junctions, half-corridor strips, junction wedges and the remaining blocks. Refusals: `E_LEVEL` (batch not
  at L2), insertion refusals such as `E_KEPT`; atomic. Throws for an L1 face with no owner.
- `bandUnion` commits the band of the chains inside the L1 faces at the batch's level, outline edges carrying
  `edgeRole`, band faces owned by `owner`. Refusal: `E_LEVEL` below L2, and as the engine does.
- `BandResult` (`arr/bandUnion.ts:48`): `band`, `strips`, `wedges`, `blocks`, `whole`, `wholeBand` — face slots,
  valid until the next commit.

### 7.7 Geometry services (pure unless noted)

```ts
export function hull(points: readonly LatticePoint[]): KernelResult<LatticePoint[]> {       // <!-- src/geom/hull.ts:20 -->
export function obb(ring: readonly LatticePoint[]): KernelResult<Obb> {                      // <!-- src/geom/obb.ts:106 -->
export function lir(ring: readonly LatticePoint[], axes?: readonly XY[], opts: { levels?: number; path?: 'auto' | 'slabs' } = {}): KernelResult<Lir> {   // <!-- src/geom/lir.ts:264 -->
export function regularFit(ring: readonly LatticePoint[]): KernelResult<RegularFit> {       // <!-- src/geom/regular-fit.ts:55 -->
export function sideRuns(face: FaceRings, turnTolCdeg: number, opts: SideRunOptions = {}): Run[] {   // <!-- src/geom/side-runs.ts:150 -->
export function sampleBoundary(face: FaceRings, stepCm: number): XY[][] {                   // <!-- src/geom/boundary.ts:28 -->
export function faceRings(p: Plat, level: Level, face: FaceId): LatticePoint[][] {          // <!-- src/geom/boundary.ts:15 -->
export function hexLattice(region: FaceRings, spacingCm: number, jitterCm: number, rng: Stream): HexLattice {   // <!-- src/geom/hex-lattice.ts:57 -->
export function skeleton<A = unknown>(rings: readonly Polygon[], use: SkeletonUse, opts: SkeletonOptions<A> = {}): KernelResult<Skeleton<A>> {   // <!-- src/skeleton/skeleton.ts:126 -->
export function simplify(chain: readonly Point[], minSegmentCm: Cm, minAngleCdeg: number, obstacles: readonly Polygon[], pinned: readonly number[]): KernelResult<Point[]> {   // <!-- src/warp/simplify.ts:38 -->
export function orient(ring: readonly LatticePoint[]): number;                              // <!-- src/num/predicates.ts:33 -->
export function orient(a: LatticePoint, b: LatticePoint, c: LatticePoint): number;           // <!-- src/num/predicates.ts:34 -->
export function area2(ring: readonly LatticePoint[]): number {                              // <!-- src/num/predicates.ts:93 -->
export function area2Big(ring: readonly LatticePoint[]): bigint {                           // <!-- src/num/predicates.ts:118 -->
```

| function | result / refusals |
|---|---|
| `hull` | strict convex hull, CCW from lowest-leftmost; `E_DEGENERATE` `collinear` (< 3 distinct or collinear), `E_OUT_OF_RANGE`. **(run)** `hull` of five points → 4 corners; of three collinear points → `collinear`. |
| `obb` | minimum-area oriented box (`Obb`: `centre`, `major`, `minor`, `majorCm`, `minorCm`, `corners`; doubles); `collinear`, `E_OUT_OF_RANGE` |
| `lir` | largest inscribed rectangle over candidate axes (default `lirAxes` of the OBB); `levels` 1…64 (default `LIR_LEVELS` = 8) |
| `regularFit` | best-fit regular polygon (`RegularFit`: `n`, `centre`, `radiusCm`, `phaseCdeg`, `targets`, `compactness`); `E_DEGENERATE` `fit`, `E_OUT_OF_RANGE` |
| `sideRuns` | a face boundary split into straight-ish runs (`Run[]`); throws `RangeError` for `turnTolCdeg` ∉ [0, 9000] or a bad `arcMaxCm` |
| `sampleBoundary` | points along each ring, every vertex included, no gap > `stepCm`; throws `RangeError` unless `stepCm` ≥ 1 |
| `faceRings` | a face's rings at a level (outer CCW, then holes) as values that outlive the commit |
| `hexLattice` | jittered hexagonal lattice points inside a region with 6-neighbour adjacency; empty region → no points; throws `RangeError` if spacing < 25 cm, jitter ∉ [0, spacing/2) or a ring point is off-lattice |
| `skeleton` | validated straight skeleton (`SkeletonGraph`) or the reader's typed downgrade (`SkeletonDowngrade`, warning `W_DOWNGRADE`) for `use` ∈ `'roof' \| 'spine' \| 'regions'`; refuses only `E_OUT_OF_RANGE`. `opts.maxEvents` raises the event limit (never below 4·(n + r) + 64); `opts.medialAxis` injects the spine downgrade's sampler. |
| `simplify` | topology-preserving Visvalingam–Whyatt simplification avoiding `obstacles`, keeping `pinned` indices; `E_OUT_OF_RANGE`, `E_DEGENERATE` `empty`; throws for a negative segment or an angle outside 0…18 000 |
| `orient` | 1 CCW, −1 CW, 0 degenerate — exact |
| `area2` / `area2Big` | twice the signed area, exact (double up to 2⁵³; BigInt for any snap-able ring) |

Through the façade, `sideRuns` and `sampleBoundary` also accept a `FaceId`, read from the open transaction
(`facade/types.ts:100–101`). Further exports in `geom`: `lirAxes`, `runTangent`, curves (`chaikin`, `catmullRom`,
`sampleCubics`, `laplacianPinned`, `fillet`), path search (`dijkstra`, `astar` — `E_NO_PATH`, `dijkstraTree`,
`graphFromEdges`), `BinaryHeap`. Skeleton extras: `validateSkeleton`, `skeletonEventLimit`, `exactRoof`,
`convexNearRectangle`, `DOWNGRADE_OF`. Medial axis (not a façade member): `medialAxis(rings, stepCm?)`
(`medial/axis.ts:326`), `delaunay`, `circumcentres`, `voronoiEdges`.

Numeric helpers (`num/`): `ratio(num, den, kind)` (checked division, `E_DEGENERATE` `ratio` below the quantity's
floor), `orient2d`, `incircle`, `unitVec`, `cdeg`, `dist`, `dist2`, `withinCm`, `withinAttract`, `belowMinEdge`,
`LATTICE`, `RATIO_FLOOR`. Deterministic math: `dmath.{pow, log, exp, sin, cos, atan2, atan}`.
Noise: `noiseStream(stream, shape, octaves)` (`E_OUT_OF_RANGE` for octaves ∉ 1…16 or a non-positive shape),
`fbm`, `fbmRow`, `octaveTerm`, `octaveRow`, `octaveNorm` (`noise/index.ts`).

### 7.8 Warp (moving vertices)

```ts
export function warp(o: Overlay, field: DisplacementField, fromLevel: Level, region: readonly Point[], recordCheck?: (step: MoveReport) => boolean, opts: WarpOptions = {}): KernelResult<MoveReport> {   // <!-- src/warp/warp.ts:325 -->
export interface DisplacementField {                                                         // <!-- src/warp/types.ts:13 -->
  displacement(x: number, y: number): { readonly x: number; readonly y: number };
}
export function smoothCommitted(o: Overlay, chain: ChainRef, passes: number, opts: SmoothOptions = {}): KernelResult<MoveReport[]> {   // <!-- src/warp/smooth.ts:44 -->
export function heldSet(o: Overlay, region: readonly Point[], opts: WarpOptions = {}): HeldSet {   // <!-- src/warp/warp.ts:391 -->
```
`warp` is the only door for moving existing vertices. It moves every vertex of level ≥ `fromLevel` inside `region`
by the field (rounded to the lattice); finer vertices on a route slide along it or are re-seated; held vertices
(field zero, injected `opts.held`, kernel-pinned during smoothing) do not move. The whole step is validated
(`minEdge`, clearance, one vertex per lattice point, placement bound, then `recordCheck`); on failure the strength
is halved, at most `MAX_HALVINGS` = 8 times, after which the step is a **reported no-op** (`applied: false`), not a
refusal. Refusal: `E_WORK_LIMIT` only. `MoveReport` (`warp/types.ts:54`): `applied`, `halvings`, `strength`,
`moves`, `held`, `heldEntities`, `unflagged`, `flagCleared`, `lastFailure`, `warnings`.
`smoothCommitted` runs `passes` warp steps with a pinned-vertex Laplacian field (`SMOOTH_WEIGHT` = 0.5); refuses
`E_DEGENERATE` for a non-edge role. Also `nearestLattice`, `insideRegion`.

### 7.9 Queries and the spatial index

```ts
export function attachIndex(p: Plat, config: IndexConfig): SpatialIndex {                    // <!-- src/index/spatial.ts:192 -->
export interface IndexConfig {                                                               // <!-- src/index/spatial.ts:59 -->
  gridCellCm: number | Five<number>;      // the dynamic grid's cell per level, cm
  partitionOf?: PartitionResolver;        // district membership of L2–L4 items (default: all outside)
}
```
Attaches an empty index and builds every partition from the arena's live items (re-attaching rebuilds). Per level:
static packed partitions (flatbush) with tombstones, plus a dynamic uniform grid for items added since the last
build. Partitions are rebuilt at three moments (stage end, overflow, freeze).

```ts
export interface IndexOps {                                                                  // <!-- src/facade/types.ts:138 -->
  query(key: PlatKey, level: Level, box: Box, kinds?: QueryKinds): QueryResult;
  pointLocate(key: ArenaKey, level: Level, at: LatticePoint): Location;
  rebuildAtStageEnd(key: PlatKey, district?: string): number;
}
export function query(p: Plat, key: PlatKey, level: Level, box: Box, kinds: QueryKinds = ALL): QueryResult {   // <!-- src/index/query.ts:218 -->
export function pointLocate(p: Plat, key: PlatKey, level: Level, at: LatticePoint): Location {                 // <!-- src/index/query.ts:258 -->
export function faceNeighbours(p: Plat, key: PlatKey, face: FaceId, level: Level): FaceNeighbours {            // <!-- src/geom/neighbours.ts:141 -->
```
- `Box` = `{ minX, minY, maxX, maxY }` (closed, whole cm; `index/items.ts:43`). `QueryKinds` selects `vertices`,
  `edges`, `faces` (all by default).
- `QueryResult` (`index/query.ts:59`): stamped `{ key, version, level, vertices, edges, faces }`, each list in a
  canonical order (vertices by (y, x); edges by endpoints; faces by canonical face key). A box meeting nothing gives
  empty lists.
- `Location` (`index/query.ts:70`): `{ on: 'vertex', vertex } | { on: 'edge', edge } | { on: 'face', level, face } | { on: 'none' }`, stamped.
- `faceNeighbours` — faces of the level sharing an edge with `face`, canonical order, `face` excluded.
- `rebuildAtStageEnd` rebuilds dirty partitions (all, or one district's L2–L4); returns the count rebuilt.

**(run)** on the getting-started arena:
```ts
kernel.view(key, 1).pointLocate(P(1000, 1000))
// { key: {layer:'ground', part:0}, version: 2, on: 'face', level: 1, face: 1 }
kernel.index.query(key, 1, { minX: 0, minY: 0, maxX: 100, maxY: 100 })
// { key: {...}, version: 2, level: 1, vertices: [0], edges: [0, 7], faces: [1] }
```

### 7.10 Views, resolve, signature

```ts
export interface LevelView extends Stamp {                                                   // <!-- src/facade/types.ts:118 -->
  readonly level: Level;
  faces(): FaceId[];                        // live face records of this level, canonical order
  rings(face: FaceId): LatticePoint[][];    // outer CCW, then holes; values outlive the commit
  owner(face: FaceId): Id | null;
  query(box: Box, kinds?: QueryKinds): QueryResult;
  pointLocate(at: LatticePoint): Location;
  neighbours(face: FaceId): FaceNeighbours;
}
```
A view is valid until the arena's next commit; in a debug build every read asserts that. `rings`/`owner` throw for
a face not live at the level.

```ts
readonly resolve: (ref: GeomRef, key: PlatKey) => Resolved;                                 // <!-- src/facade/types.ts:83 -->
export type Resolved = Stamp & (                                                             // <!-- src/arena/resolve.ts:22 -->
  | { readonly view: 'faces'; readonly level: Level; readonly faces: FaceId[] }
  | { readonly view: 'edges'; readonly runs: HalfEdgeId[][] }
  | { readonly view: 'vertices'; readonly vertices: VertexId[] }
);
readonly signature: (key: PlatKey, v: VertexRef | LatticePoint) => VertexSig;               // <!-- src/facade/types.ts:86 -->
readonly sampleProfile: (p: AnyProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex') => number[] | string[];   // <!-- src/facade/types.ts:87 -->
```
`resolve` returns current slots in canonical order (edge runs directed, ordered by their first vertices). A ref that
finds nothing resolves empty; an unknown role throws. `signature` gives a vertex's own role rows and the structural
rows of its incident edges (`VertexSig`, `types/refs.ts`), empty when there is no vertex. Module forms:
`resolve(p, ref, key)` (`arena/resolve.ts:154`), `signature(p, v, key)` (`:204`), `vertexAt`, `vertexSignature`,
`isCurrent`, `assertStamp`, `Stamp` (`:16`).

### 7.11 Digest and serialisation

**Digests** (`digest/levelDigest.ts`):
```ts
export function attachLevelDigests(p: Plat): void {                                          // <!-- src/digest/levelDigest.ts:599 -->
export function updateLevelDigests(p: Plat, dirty: DirtySet, record: CommitRecord): void {   // <!-- src/digest/levelDigest.ts:628 -->
export function levelDigest(p: Plat, level: Level): Hash128 {                                // <!-- src/digest/levelDigest.ts:756 -->
export function recomputeLevelDigest(p: Plat, level: Level): Hash128 {                       // <!-- src/digest/levelDigest.ts:761 -->
```
`Hash128` = four u32 lanes (MurmurHash3 x86 128). A level-n digest covers vertices, role rows, face owners and kinds
of level ≤ n in canonical order, never slots; a finer level's changes never change a coarser level's digest.
Maintenance is O(touched) per commit when `updateLevelDigests` is wired as `TxEnv.onCommit`; an arena that missed a
commit is rebuilt on next read. Also `levelDigests(p)` / `freshLevelDigests(p)` (a view with `level(n)` and
`ref(ref)`), `changedEntities(p, version)`, `hasLevelDigests`, `levelDigestBuilds`, `DIGEST_BUCKETS` (64).

**Serialisation** (`io/`): the arena block, as bytes in memory.
```ts
export function encodeArena(plat: Plat): Chunk[] {                                           // <!-- src/io/encode.ts:181 -->
export function decodeArena(chunks: readonly Chunk[], key: PlatKey, opts: DecodeOptions = {}): KernelResult<Plat> {   // <!-- src/io/decode.ts:240 -->
export function compactSlots(plat: Plat): Plat {                                             // <!-- src/io/compact.ts:41 -->
export interface Chunk { readonly ref: ChunkRef; readonly bytes: Uint8Array; }               // <!-- src/io/types.ts:11 -->
export interface DecodeOptions { readonly index?: IndexConfig; readonly digests?: boolean; }  // <!-- src/io/types.ts:21 -->
```
- `encodeArena` writes one routes chunk (levels ≤ 1) and one chunk per non-empty L2–L4 static partition, each
  content-addressed by H128 over its bytes; no slot and no text-order dependency, so two arenas differing only in
  slots encode to identical bytes. Throws on an arena that breaks structural rules (a programming error).
- `decodeArena` rebuilds the arena (version 0, dense slots); with `opts.index` it attaches the index; with
  `opts.digests` the maintained digests. A chunk that does not hash to its ref, fails to parse, or does not fit is a
  **corrupt cache**: `E_INVARIANT` with detail prefix `corrupt-cache: ` (`isCorruptCache`, `CORRUPT_CACHE`), never
  a partial arena.
- `compactSlots` returns a dense, canonically renumbered copy; the original is unchanged. Throws while a batch is
  open on it.
- Also `describeChunk`, `ByteReader`, `ByteWriter`, `ChunkFormatError`, `ARENA_BLOCK_FORMAT` (= 1), `ringKey`.

**(run)**
```ts
const d1 = levelDigest(plat, 1);
const back = decodeArena(encodeArena(plat), key, { index: { gridCellCm: [800, 400, 200, 100, 50] }, digests: true });
back.ok && levelDigest(back.value, 1).join() === d1.join();        // true
levelDigest(compactSlots(plat), 1).join() === d1.join();            // true
decodeArena([{ ref: [0, 0, 0, 0], bytes: encodeArena(plat)[0].bytes }], key);
// { ok: false, code: 'E_INVARIANT', detail: 'corrupt-cache: chunk 0 does not hash to its ref' }
```

Hashing primitives (`hash/`): `murmur128`, `H128`, `Murmur128`, `fmix32`, `H32`, `LaneWriter`, UTF-8 helpers.

### 7.12 RNG

```ts
export interface Rng {                                                                       // <!-- src/rng/rng.ts:14 -->
  stream(entityKey: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts): Stream;
  readonly streams: number;
}
export function createRng(options: RngOptions = {}): Rng {                                   // <!-- src/rng/rng.ts:88 -->
```
One `Rng` is one derivation: the first request for a (key, stage, concern, reroll, attempt, epoch, salt) creates a
stream; later requests return the same stream, continued. `Stream` (`rng/stream.ts:39`) is xoshiro128** with
`u32()`, `float01()`, `int(lo, hi)` (unbiased, inclusive), `bool(p)`, `normal()`, `bell4()`, `mean3()`,
`fuzzy(f)`, `weighted(weights)`; `Deck<T>` draws without replacement. Key builders (`rng/mixer.ts`): `seedKey(seed)`,
`entityKey(seed, lineage, arenaKey)`, `streamKey(...)`, `laneKey(words)`. `ConcernId` and `StageId` must be
registered ids (`CONCERNS`, `STAGES`, `STAGE_VIEW`; §1 caveat). **(run)**:
```ts
const s = kernel.rng().stream(seedKey(42), 1 as StageId, CONCERNS['route'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
s.u32(); s.float01(); s.int(1, 6);   // 2503218776, 0.2874930500984192, 2 — identical in two processes
```

### 7.13 Invariant suite (advanced)

`invariants/` exposes the batch-local and whole-arena checks the transaction runs, for tests and tooling:
`checkStageEnd`, `checkSave`, `checkCI`, `checkFreeze`, `eulerCounts`, `checkBatch`, `kernelChecks`,
`kernelExpect`, `expectRow`, `classFloorRow`, `suiteEnv` (a `TxEnv` that wires the suite), `suiteReport`,
`hardProblems`, `KERNEL_ROWS`, and the debug switches `DEBUG_BUILD`, `debugMode()`, `debugAssertSlot`
(`invariants/debug.ts`) and `setDebugAssertions` / `debugAssertions` (`arena/debug.ts`). Their exact contracts are
not documented here beyond the names — treat them as tooling (**UNVERIFIED** as a stable surface).

---

## 8. Not built yet (stubs)

Façade members and branches staged to later milestones (`facade/notBuilt.ts` `STUB_TABLE`). A stub member is a
frozen, non-callable object `{ notBuilt, member, why }` (calling it is a type error; through a cast, a `TypeError`).
A staged branch throws `notBuilt('<milestone>'): …` when reached. `isNotBuilt(v)` tests for a stub.

| member / branch | form |
|---|---|
| `geom.transientArena`, `geom.readBack`, `geom.release` | stub (**(run)**: `kernel.geom.transientArena` → `{"notBuilt":"M6-P","member":"transientArena",…}`) |
| `KernelTx.key` as a `TransientKey` | throws |
| `geom.resolveVertexAt` | stub |
| `Kernel.pool` (derivation-pool overlays) | stub |
| `claimSubFace` score form | throws |
| `KernelTx.clearRegion`, `KernelTx.prepared` | throws |
| `sampleProfile` of an `Order`-valued profile | throws |
| replaceable `Plat.frame`, multi-part `PlatKey.part` use | hooks (nothing refused) |

---

## 9. Performance notes (as stated in code and design; no timings)

- Storage is struct-of-arrays typed tables; tables grow by doubling (`createPlat`).
- A batch's checks read only touched faces, moved / promoted / demoted vertices, new and changed edges and their
  one-ring: **O(touched), never O(arena)** (design §3.10). Digest maintenance is O(touched) per commit.
- The transaction's before-image is O(arena) (`tx/tx.ts` comment, C-0185 (1)).
- Queries combine static packed partitions with a dynamic grid; a partition is rebuilt when its grid overflow
  exceeds max(256, ¼ of its static size) (`overflowThreshold`, `index/spatial.ts:350`).
- Buffers unite parts in groups of `UNION_FAN_IN` = 8 per overlay, level by level.
- `decodeArena` is "O(E log d) but for the lookups' hashing" (`io/decode.ts` comment).
- Budgets are operation counts (`workLimit`); `skeleton`'s event limit is at least 4·(n + r) + 64.
- No measured timing is claimed here.

---

## 10. Stability notes

- **Version 0.0.0, private, UNLICENSED.** No compatibility promise exists yet.
- **Façade = intended public surface.** The source designates `createKernel` / `Kernel` / `GeomOps` / `IndexOps` /
  `LevelView` (M0-a-16) plus the types they mention as the surface stages use. Everything else is exported from the
  same root (the package re-exports every module), including raw arena primitives (`allocVertex`, `allocEdgePair`,
  `allocFace`, `freeVertex`, `setFaceOwner`, `addRoleRow`, …), index internals (`indexAdd`, `tombstone`,
  `gridInsert`, …) and insertion internals (`snapRound`, `planAttraction`, `rewalk`, …). Calling raw primitives
  bypasses transactions, journals and checks and can corrupt an arena — **treat them as internal**.
- **Slots are internal and unstable.** `VertexId`, `HalfEdgeId`, `FaceId` values, `Plat` table layouts, `handles`,
  `slots` and `CommitRecord` contents are valid within one batch / until the next commit and are never persisted.
- **Persisted forms are versioned:** `ARENA_BLOCK_FORMAT` (block bytes), `ROLE_REGISTRY_VERSION` (role ids are
  append-only), registry versions in `concerns.json` / `stages.json`, `ENGINE_VERSION` / `ENGINE_ID`
  (`plat-arrangement@1`) for the boolean/buffer/band engine.
- **Design-vs-code differences noticed:** `CommitRecord.key` is typed `PlatKey` in code (design: `ArenaKey`);
  `corridorUnion`, `kerb`, `offsetFace`, `insetRing` take the transaction (and `widths`) as extra leading/trailing
  parameters at module level — the façade binds them to the design's shorter forms.

---

## Appendix A. Export inventory by module

The principal names `src/index.ts` re-exports, by module folder (types in *italics* where the index marks them
`type`). Appendix B lists every exported name.

- **num**: `LATTICE`, *LatticeSpec*, `frameOf`, *Frame*, `snap`, `area2`, `area2Big`, `orient`, `orient2d`, `ratio`,
  `RATIO_FLOOR`, *RatioKind*, `belowMinEdge`, `cdeg`, `dist`, `dist2`, `unitVec`, `withinAttract`, `withinCm`,
  `incircle`, `degenerate`, `err`, `ok`, *DegenerateDetail*, *KernelError*, *KernelResult*, *Warning*, *WarningCode*.
- **types** (types only): `Cm`, `M`, `Cdeg`, `CmArray`, `LatticePoint`, `PointCm`, `Point`, `VecCm`, `Polygon`,
  `PolygonCm`, `Id`, `Handle`, `Level`, `Layer`, `PlatKey`, `Seed`, `ConcernId`, `StageId`, `RoleName`, `RoleKey`,
  `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef`, `GeomRef`, `VertexSig`, `Order`, `ChainProfile`,
  `Invariant`, `StreamOpts`.
- **arena**: see `arena/index.ts` (debug switches; role registry; owner/role-head tables; handles; `createPlat` and
  raw slot primitives; role rows; walks and canonical orders; `resolve`, `signature`, `vertexAt`, `vertexSignature`,
  `isCurrent`, `assertStamp`; `compareKeys`, `sortedKeys`).
- **index**: see `index/index.ts` (items and boxes; grid; `attachIndex` and index maintenance/rebuild functions;
  `query`, `pointLocate`, `faceMeetsBox`, `pointInBox`, `segmentMeetsBox`; freshness checks).
- **insert**: see `insert/index.ts` (`insertChain`, `splitThrough`, chain classes, work counters
  `INSERT_POINTS` / `INSERT_ATTRACT_QUERIES` / `INSERT_PLACEMENT_CANDIDATES` / `INSERT_CROSSINGS` /
  `TX_FACES_WALKED`, `MAX_PASSES`, and the internal steps).
- **tx**: `OP_KINDS`, the tx types, `canonicalOrder`, `kernelOp`, `LINEAR_PARTS`, `touchedFaces`, `tx`, the `op…`
  constructors, `clearFiner`, `removeEdges`, `retypeEdges`, `setOwner`, profile helpers, `resolveStretch`,
  `runsOfPairs`.
- **faces**: `connectHole`, `splitFace`, *CutOpts*, `absorbSliver`, `FACE_KIND_RESIDUE`, `mergeFaces`,
  `radialSplit`, `ringBand`, `claimSubFace`, `isPinned`, `pinVertices`, *ScoreRaster*, *SubFaceClaim*, the `op…`
  constructors.
- **arr**: `buildOverlay`, `windingLabels`, `booleans`, `arcSteps`, `buffer`, `bufferParts`, `maxArcStep`,
  `ringEdgeParts`, `SAGITTA_CM`, `UNION_FAN_IN`, `canonicalFaceRings`, `faceEdges`, `offsetFace`, `insetRing`,
  `kerb`, `corridorUnion`, `opCorridorUnion`, `bandUnion`, `opBandUnion`, `tileRings`, and their types.
- **geom**: `hull`, `obb`, `lir`, `lirAxes`, `LIR_LEVELS`, `LIR_MARGIN`, `regularFit`, `runTangent`, `sideRuns`,
  `faceRings`, `sampleBoundary`, `faceNeighbours`, `hexLattice`, curves, `BinaryHeap`, path search.
- **skeleton**: `skeleton`, `DOWNGRADE_OF`, `validateSkeleton`, `skeletonEventLimit`, `COALESCE_CM`, roof helpers,
  skeleton types.
- **medial**: `delaunay`, `nextHalfEdge`, `circumcentres`, `voronoiEdges`, `medialAxis`, `MEDIAL_*` constants.
- **warp**: `MAX_HALVINGS`, `WARP_HALVINGS`, `heldSet`, `nearestLattice`, `warp`, `insideRegion`,
  `smoothCommitted`, `SMOOTH_WEIGHT`, `simplify`, and warp types.
- **invariants**, **io**, **digest**, **hash**, **dmath**, **rng**, **registry**, **noise**: as listed in §7.11–§7.13
  and §7.7.
- **facade**: `createKernel`, `isTransientKey`, *KernelOptions*, `isNotBuilt`, `notBuilt`, `STUB_TABLE`,
  *StubForm*, *StubRow*, `ENGINE_ID`, `ENGINE_VERSION`, `stampOf`, *ArenaKey*, *CarryMap*, *GeomOps*,
  *IndexOps*, *Kernel*, *LevelView*, *Milestone*, *NotBuiltStub*, *OnTx*, *RingClaim*, *TransientKey*.

## Appendix B. Complete export inventory

Generated on 2026-10-07 from the TypeScript compiler's view of `src/index.ts` (669 names: 419 values, which the
compiled `dist/index.js` exports exactly, and 250 types). Grouped by the module folder whose `index.ts` re-exports
the name, in `src/index.ts`'s order; values in `code`, types in *italics*. A name added to the kernel after this date
is not listed here until the document is regenerated.

- **num** (20 values, 8 types): `LATTICE`, `RATIO_FLOOR`, `area2`, `area2Big`, `belowMinEdge`, `cdeg`, `degenerate`, `dist`, `dist2`, `err`, `frameOf`, `incircle`, `ok`, `orient`, `orient2d`, `ratio`, `snap`, `unitVec`, `withinAttract`, `withinCm`, *DegenerateDetail*, *Frame*, *KernelError*, *KernelResult*, *LatticeSpec*, *RatioKind*, *Warning*, *WarningCode*.
- **hash** (9 values, 3 types): `H128`, `H32`, `LaneWriter`, `Murmur128`, `encodeUtf8Into`, `fmix32`, `murmur128`, `utf8Bytes`, `utf8Length`, *Hash128*, *Hash64*, *LineageHash*.
- **dmath** (1 values, 1 types): `dmath`, *Dmath*.
- **rng** (18 values, 5 types): `Deck`, `KeyCensus`, `SEED_SALTS`, `Stream`, `ZERO_STATE_NUDGE`, `concernText`, `createRng`, `entityKey`, `keyText`, `laneKey`, `layerCode`, `mixInto`, `packComponents`, `packInto`, `seedKey`, `stageText`, `streamFromKey`, `streamKey`, *CensusCollision*, *CensusResult*, *KeyComponents*, *Rng*, *RngOptions*.
- **registry** (15 values, 7 types): `CONCERNS`, `CONCERN_COUNT`, `CONCERN_REGISTRY`, `DEFAULT_ATTEMPT_CAP`, `REGISTRY_MILESTONES`, `STAGES`, `STAGE_COUNT`, `STAGE_REGISTRY`, `STAGE_VIEW`, `attemptCap`, `concernRow`, `isReserved`, `isStreamStage`, `rerollableWithoutReader`, `stageRow`, *ConcernName*, *ConcernRow*, *RegistryFile*, *RerollableConcernName*, *StageName*, *StageRegistryFile*, *StageRow*.
- **arena** (82 values, 23 types): `FREE_KIND`, `LEVELS`, `MAX_ORDINAL`, `MAX_ROLE_ID`, `MIN_TABLE_CAPACITY`, `ROLE_REGISTRY`, `ROLE_REGISTRY_VERSION`, `VERTEX_FREE`, `VERTEX_PINNED`, `VERTEX_SPLIT`, `VERTEX_STEINER`, `addRole`, `addRoleRow`, `allocEdgePair`, `allocFace`, `allocVertex`, `assertStamp`, `commitVersion`, `compareFaces`, `compareHandleIds`, `compareKeys`, `compareRoleRank`, `compareRowKeys`, `compareVertices`, `createHandleTable`, `createOwnerTable`, `createPlat`, `createRoleHeadTable`, `debugAssertions`, `dest`, `edgeLevel`, `faceHoles`, `faceKey`, `faceWalk`, `facesOfOwner`, `freeEdgePair`, `freeFace`, `freeVertex`, `handleOf`, `handleOfId`, `idOf`, `idOfHandle`, `intern`, `internId`, `isCurrent`, `isFaceLive`, `isHalfEdgeLive`, `isLevel`, `isPlatKey`, `isRoleRowLive`, `isVertexLive`, `nextAt`, `outgoing`, `ownerDelete`, `ownerGet`, `ownerSet`, `parseRoleRegistry`, `pointOf`, `removeRoleRow`, `resolve`, `roleHeadDelete`, `roleHeadGet`, `roleHeadSet`, `roleIdOf`, `roleInfo`, `roleKeyWord`, `roleNamed`, `rowElement`, `rowKey`, `rowsOfKey`, `rowsOn`, `sameKey`, `setDebugAssertions`, `setFaceHoles`, `setFaceOwner`, `signature`, `sortedKeys`, `tableCapacityFor`, `twin`, `vertexAt`, `vertexSignature`, `walkRing`, *FaceId*, *FaceInit*, *Five*, *HalfEdgeId*, *HalfEdgeTable*, *HandleTable*, *IndexHome*, *LevelFaces*, *OwnerTable*, *Plat*, *PlatCapacity*, *PlatSlots*, *Resolved*, *RoleHeadTable*, *RoleInfo*, *RoleKind*, *RoleRegistryDoc*, *RoleRow*, *RoleTable*, *SlotCounter*, *Stamp*, *VertexId*, *VertexTable*.
- **index** (54 values, 20 types): `HOT_PIXEL_CM`, `INDEX_REBUILDS`, `ITEM_EDGE`, `ITEM_FACE`, `ITEM_VERTEX`, `MAX_ITEM_CELLS`, `MAX_PARTITIONS`, `OUTSIDE`, `OVERFLOW_FLOOR`, `attachIndex`, `beginIndexBatch`, `boxCovers`, `boxesMeet`, `checkIndexBatch`, `checkIndexState`, `createGrid`, `endIndexBatch`, `faceBox`, `faceMeetsBox`, `faceRouteRings`, `gridCandidates`, `gridDelete`, `gridInsert`, `homeOf`, `indexAdd`, `indexChange`, `indexDelete`, `indexOf`, `indexRelevel`, `isDirty`, `isItemLive`, `itemBox`, `itemKey`, `keyKind`, `keySlot`, `levelItems`, `overflowThreshold`, `partitionById`, `partitionKeyOf`, `pointInBox`, `pointLocate`, `query`, `rebuildAtStageEnd`, `rebuildDirty`, `rebuildForFreeze`, `rebuildOverflowing`, `rebuildPartition`, `routeHandlePair`, `routePieces`, `routeRun`, `runBox`, `segmentMeetsBox`, `tombstone`, `tombstonesOf`, *BatchIndexFacts*, *Box*, *ChangedItem*, *GridEntry*, *IndexBatchLog*, *IndexConfig*, *IndexWork*, *IndexWrite*, *ItemKind*, *ItemRef*, *LevelIndex*, *Location*, *PackedIndex*, *PartitionResolver*, *QueryKinds*, *QueryResult*, *RoutePiece*, *RouteRun*, *SpatialIndex*, *UniformGrid*.
- **insert** (34 values, 28 types): `CHAIN_CLASSES`, `CLASS_OUTCOMES`, `INSERT_ATTRACT_QUERIES`, `INSERT_CROSSINGS`, `INSERT_PLACEMENT_CANDIDATES`, `INSERT_POINTS`, `MAX_PASSES`, `TX_FACES_WALKED`, `addWarning`, `allocateAnchor`, `applyAttraction`, `applySplitPlan`, `attractRun`, `attractStretch`, `attractVertex`, `chainCorner`, `chainJournal`, `charge`, `classOutcome`, `classRefusal`, `decimate`, `exactCrossings`, `insertChain`, `insertTx`, `placePoint`, `planAttraction`, `planSplitThrough`, `promote`, `resolveCrossings`, `rewalk`, `simpleRuns`, `snapRound`, `splitThrough`, `wedgeBound`, *Attraction*, *AttractionPlan*, *ChainClass*, *ChainCorner*, *ChainCtx*, *ChainInsert*, *ChainJournal*, *ChainRun*, *ClassOutcome*, *ClassReason*, *Crossing*, *DecimateOpts*, *Decimated*, *ExactCrossing*, *FaceDelta*, *FirstCrossing*, *InsertChainOpts*, *InsertJournal*, *InsertTx*, *Knot*, *Landing*, *Placement*, *PlannedRow*, *RunVertex*, *SplitPlan*, *StretchObstacle*, *Touched*, *WorkCharged*.
- **tx** (27 values, 25 types): `JOIN_TOLERANCE_CM`, `LINEAR_PARTS`, `OP_KINDS`, `canonicalOrder`, `clearFiner`, `cutKnot`, `joinProfiles`, `kernelOp`, `knotLines`, `opClearFiner`, `opInsertChain`, `opRemoveEdges`, `opRetypeEdges`, `opSetOwner`, `opSplitThrough`, `removeEdges`, `renumberKnots`, `resolveStretch`, `retypeEdges`, `routeLines`, `runsOfPairs`, `sameValue`, `sampleChain`, `sampleProfile`, `setOwner`, `touchedFaces`, `tx`, *AnyProfile*, *BatchScope*, *ClassFloor*, *CommitRecord*, *Committed*, *Conflict*, *DirtySet*, *ExpectView*, *KernelOp*, *KernelTx*, *KnotLine*, *LevelDirt*, *OnFail*, *OpKind*, *Overlay*, *ProfileKnot*, *ProfileOut*, *ProfileValue*, *RemoveResult*, *RetypeResult*, *RouteLine*, *Span*, *TransientKeyShape*, *TxEnv*, *TxKey*.
- **faces** (18 values, 3 types): `FACE_KIND_RESIDUE`, `absorbSliver`, `claimSubFace`, `connectHole`, `isPinned`, `mergeFaces`, `opAbsorbSliver`, `opClaimSubFace`, `opConnectHole`, `opMergeFaces`, `opPinVertices`, `opRadialSplit`, `opRingBand`, `opSplitFace`, `pinVertices`, `radialSplit`, `ringBand`, `splitFace`, *CutOpts*, *ScoreRaster*, *SubFaceClaim*.
- **arr** (20 values, 16 types): `SAGITTA_CM`, `UNION_FAN_IN`, `arcSteps`, `bandUnion`, `booleans`, `buffer`, `bufferParts`, `buildOverlay`, `canonicalFaceRings`, `corridorUnion`, `faceEdges`, `insetRing`, `kerb`, `maxArcStep`, `offsetFace`, `opBandUnion`, `opCorridorUnion`, `ringEdgeParts`, `tileRings`, `windingLabels`, *BandChain*, *BandResult*, *BooleanOp*, *EmptyResult*, *EndKind*, *FaceEdge*, *FillRule*, *InsetCollapsed*, *JoinKind*, *Ring*, *ScratchOverlay*, *SpineEnd*, *SpineWidth*, *SpineWidths*, *TileOverlap*, *WindingLabels*.
- **geom** (23 values, 13 types): `BinaryHeap`, `LIR_LEVELS`, `LIR_MARGIN`, `astar`, `catmullRom`, `chaikin`, `dijkstra`, `dijkstraTree`, `faceNeighbours`, `faceRings`, `fillet`, `graphFromEdges`, `hexLattice`, `hull`, `laplacianPinned`, `lir`, `lirAxes`, `obb`, `regularFit`, `runTangent`, `sampleBoundary`, `sampleCubics`, `sideRuns`, *CostRaster*, *Cubic*, *FaceNeighbours*, *FaceRings*, *Fillet*, *HexLattice*, *Lir*, *Obb*, *RegularFit*, *Run*, *SearchGraph*, *SearchPath*, *SideRunOptions*.
- **skeleton** (9 values, 19 types): `COALESCE_CM`, `DOWNGRADE_OF`, `NEAR_RECT_AREA_SHARE`, `NEAR_RECT_CORNER_CM`, `convexNearRectangle`, `exactRoof`, `skeleton`, `skeletonEventLimit`, `validateSkeleton`, *ContractRefusal*, *DowngradePath*, *ExactRoof*, *ExactRoofResult*, *NearRectangle*, *NearRectangleFail*, *RoofForm*, *RoofWing*, *Skeleton*, *SkeletonArc*, *SkeletonDowngrade*, *SkeletonEdge*, *SkeletonFailure*, *SkeletonGraph*, *SkeletonNode*, *SkeletonOptions*, *SkeletonUse*, *SkeletonVerdict*, *ValidatorCheck*.
- **medial** (13 values, 5 types): `MEDIAL_CROSS_SLACK_CM`, `MEDIAL_MERGE_CM`, `MEDIAL_PRUNE_RATIO`, `MEDIAL_REFINE_CAP`, `MEDIAL_REFINE_FLOOR_CM`, `MEDIAL_REFINE_MARGIN_CM`, `MEDIAL_STEP_CM`, `MEDIAL_TOUCH_CM`, `circumcentres`, `delaunay`, `medialAxis`, `nextHalfEdge`, `voronoiEdges`, *Delaunay*, *MedialArc*, *MedialAxis*, *MedialNode*, *VoronoiEdge*.
- **warp** (9 values, 8 types): `MAX_HALVINGS`, `SMOOTH_WEIGHT`, `WARP_HALVINGS`, `heldSet`, `insideRegion`, `nearestLattice`, `simplify`, `smoothCommitted`, `warp`, *DisplacementField*, *HeldRef*, *HeldSet*, *Move*, *MoveKind*, *MoveReport*, *SmoothOptions*, *WarpOptions*.
- **invariants** (28 values, 13 types): `DEBUG_BUILD`, `KERNEL_ROWS`, `acuteCorners`, `batchCost`, `checkBatch`, `checkCI`, `checkFreeze`, `checkSave`, `checkStageEnd`, `classFloorRow`, `debugAssertSlot`, `debugMode`, `eulerCounts`, `expectRow`, `faceArea2`, `frozenBaseProblems`, `hardProblems`, `kernelChecks`, `kernelExpect`, `poolScopeProblems`, `roleKeysOn`, `rowNamed`, `rowsOfScope`, `seedTilingProblems`, `suiteEnv`, `suiteReport`, `touchedSet`, `wholeRecord`, *BatchContext*, *BatchReportLine*, *BatchTouched*, *Checked*, *FaceBefore*, *InvariantResult*, *KeptBefore*, *OverlayScope*, *RowDecl*, *SlotRef*, *StoredProfile*, *SuiteReport*, *WholeContext*.
- **io** (12 values, 4 types): `ARENA_BLOCK_FORMAT`, `ByteReader`, `ByteWriter`, `CORRUPT_CACHE`, `ChunkFormatError`, `compactSlots`, `corruptCache`, `decodeArena`, `describeChunk`, `encodeArena`, `isCorruptCache`, `ringKey`, *Chunk*, *ChunkRef*, *ChunkSummary*, *DecodeOptions*.
- **facade** (8 values, 14 types): `ENGINE_ID`, `ENGINE_VERSION`, `STUB_TABLE`, `createKernel`, `isNotBuilt`, `isTransientKey`, `notBuilt`, `stampOf`, *ArenaKey*, *CarryMap*, *GeomOps*, *IndexOps*, *Kernel*, *KernelOptions*, *LevelView*, *Milestone*, *NotBuiltStub*, *OnTx*, *RingClaim*, *StubForm*, *StubRow*, *TransientKey*.
- **noise** (9 values, 3 types): `MAX_NOISE_OCTAVES`, `NOISE_DRAWS_PER_OCTAVE`, `SIMPLEX2_DRAWS`, `fbm`, `fbmRow`, `noiseStream`, `octaveNorm`, `octaveRow`, `octaveTerm`, *NoiseShape*, *NoiseStream*, *Simplex2*.
- **digest** (10 values, 1 types): `DIGEST_BUCKETS`, `attachLevelDigests`, `changedEntities`, `freshLevelDigests`, `hasLevelDigests`, `levelDigest`, `levelDigestBuilds`, `levelDigests`, `recomputeLevelDigest`, `updateLevelDigests`, *LevelDigestView*.
- **types** (0 values, 31 types): *Cdeg*, *ChainProfile*, *ChainRef*, *Cm*, *CmArray*, *ConcernId*, *EdgeSetRef*, *FaceRef*, *GeomRef*, *Handle*, *Id*, *Invariant*, *LatticePoint*, *Layer*, *Level*, *M*, *Order*, *PlatKey*, *Point*, *PointCm*, *Polygon*, *PolygonCm*, *RoleKey*, *RoleName*, *Seed*, *StageId*, *StreamOpts*, *StretchRef*, *VecCm*, *VertexRef*, *VertexSig*.
