# Integration check of stage group 10 — M0-a-16, M0-b-02, M0-d-05b, M0-a-15 (flow flow-7, 2026-10-06)

Lane `check/integration-flow-7-g10`. **Verdict: FAIL — one blocker (B-1), on M0-a-09, a passed dependency that is not
busy.** None of the four group items' files has to change.

**The seat.** This seat is Opus 5.5 in Claude Code on the owner's Windows PC. The machine check printed
`wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib` and the Node version is 24.12.0. The seat is independent
of the four items' authors, fixers and checkers. It changed no file of any item and ran no git command. Its ledger row
is **L-0222** (see `plat/CLEAN-ROOM.md`). It ran from 07:31 to __END__. The probes and logs are in
`~/maps-scratch/waves/integration-g10/` (logs in `logs/`).

**Busy state.** The brief lists no busy item. During this check, `build/M0-x-02` (layout `pipeline/`), `build/M0-e-03`
(site `water/`), `build/M0-c-02`, `build/M0-k-04` and `build/M0-a-06-fix-s3` were being built, and
`check/M0-a-05-close-s6` was checking insertChain. Every result below was taken on the tree as it stood.

**How it ran.** Each item had already passed its own check (`checks/M0-a-16.md` closing r3, `M0-b-02.md` closing r1,
`M0-d-05b.md` closing r1, `M0-a-15.md` closing r1). This check looks only at the points where the pieces meet. The
probes run with `tsx --conditions=plat-source` from `plat/`. They import the packages' `src/` and the items' read-only
test support (testkit `test/kernel/io/support.ts`'s `cityArena`, `indexConfigOf`, `print`, `sameBlock`; kernel
`test/io/support.ts`'s `randomArena`; `test/arr/bands/support.ts`'s `widthsOf`; M0-d-08's `constructiveSequence`,
`renumberSlots`, `fixtureSpec`) by absolute path. They write nothing in `plat/`.

## The meeting points

| # | where the pieces meet | promise checked | probe |
|---|---|---|---|
| A | M0-a-15's load (`decodeArena`, the index rebuilt) and `compactSlots` ⟷ M0-a-16's façade (`view`, `index`, `geom.pointLocate` / `faceNeighbours` / `signature`, `resolve`, `kerb`, writers, stamps) | §3.9 / §13.1: a loaded or compacted arena is the same arena; §3.3 "no output depends on slot numbers … identical results for the same next edit"; C-0207 (5): after a load the next operation equals the original's "in arena, digests, codes" | P1 |
| B | the façade's `kerb` (M0-a-09 through M0-a-16) and `Kernel.rng` (M0-d-01 through M0-a-16) ⟷ M0-b-02's `planCut`, on original, loaded, compacted and renumbered arenas; then S9's `corridorUnion` through the façade | §3.7 / §4.6 / §13.2: S8's working block is `kerb(F)` (the S8 ≡ S9 contract); §6.1: one mixer, keyed by lineage; §3.3 as in A | P2, P2d, P2e, P4 |
| C | M0-d-05b's `match` and `indexCandidates` ⟷ M0-a-15's load ⟷ the façade's views and `splitFace` (M0-a-07 through M0-a-16) | §6.3: a faithful re-derivation succeeds every address (no tombstone, no carry event); the overlap kinds' candidates come from the index (§3.3); §3.6 (5): the left child of a split through an anchor keeps the id; 0 duplicate ids | P3 |
| D | M0-d-05b's `SupersedesTable` ⟷ M0-a-16's `CarryMap` (C-0089) | the supersedes table is the kernel's `ReadonlyMap<Id, Id>`, both ways | P3c |

## Gates, run once

| gate | result |
|---|---|
| `corepack pnpm install --frozen-lockfile` | exit 0 |
| `corepack pnpm lint` (with `probe-red`) | exit 0. eslint checked 745 files with 0 errors and 0 warnings; `lint: probe-red ok`. |
| `corepack pnpm build` | exit 0 |
| `landed:verify -- flow-7 --item` M0-a-16 / M0-b-02 / M0-d-05b / M0-a-15 | ok, 1 record each (every record names flow-7). |
| near, full strength (PLAT_FUZZ_RUNS unset, W=3, 07:33–07:39): `kernel/test/facade/`, `layout/test/infill/planner/`, `model/test/match/`, `kernel/test/io/`, `testkit/test/kernel/io/` | 30/31 files and 367/368 tests passed. The one red is `kernel/test/io/roundtrip.test.ts` › "random batch arenas (default mix)": "Test timed out in 5000ms" (5123 ms) under a load average near 10. __REPLAY__ |
| related at PLAT_FUZZ_RUNS=1000 over the union of the group's 26 changed source files (M0-a-16's six `facade/` files, M0-a-15's seven `io/` files, M0-b-02's `planner.ts` and `sides.ts`, M0-d-05b's eleven `match/` files; W=6, 07:51–07:57) | 133/138 files and 2103/2110 tests passed. None of the 7 reds is a group file or on a path a group item changed. 3 are `layout/test/pipeline/core/{order,runner}.test.ts`: M0-x-02, being built (lane log 07:52–07:58). 1 is `site/test/terrain/range.test.ts`, which names `water/outfalls.ts`, an untracked file of M0-e-03, being built. 2 are the testkit agreements `agreement-buffer` / `agreement-faces` (insertChain's N-43 refusal, M0-a-05; the same reds as integration g8 N-6 and g9 N-1). These are notes for the session (N-2), not the group's. |
| whole suite once at reduced strength (J194: `PLAT_FUZZ_RUNS=1000 corepack pnpm test`, W=4, from 07:59) | __WHOLE__ |

## Composition probes

**P1 — the façade over a loaded and a compacted arena** (`p1-io-facade.mts`). The probe builds three kernels: one over
the original arena, one over its decoded block (the index rebuilt by the load) and one over `compactSlots`'s copy. It
compares every keyed read slot-free. Rings are rotated to their lowest-leftmost point, faces are named by their rings,
edges by their endpoints and vertices by their points.

- **CITY** (`city 7001`): 0 differences. That covers `view(key, n).faces()` / `rings` / `owner` at L0–L4 (2, 36, 87,
  140 and 280 faces), 545 neighbour sets (`view.neighbours` and `geom.faceNeighbours`), 7 500 `pointLocate`s through
  `index`, `geom` and `view` (6 340 in faces, 527 on vertices, 161 on edges), 1 000 index queries, 1 033 lattice-point
  signatures (230 non-empty; the decoded arena without an index takes the scan branch and agrees), `resolve` of six
  chains, `kerb` of all 36 L1 faces inside a façade transaction, and a next transaction (an L2 lane plus a `setOwner`,
  through `geom.insertChain` / `geom.setOwner`). After that transaction the three arenas print alike and save to
  byte-identical blocks. A view taken before it is refused by `assertCurrent` on all three (the debug stamp works on a
  version-0 loaded arena).
- **The constructive set** (166 arenas, M0-k-02's M0 cases at seeds 0 and 1 through `constructiveSequence`; `constructive 7200`)
  and **40 random batch arenas** (`randomArena`, 30 batches; `random 7100 40`): every view, neighbour, locate, query,
  signature and next-transaction print is equal. **But `kerb(F)` differs on the decoded arena for 23 constructive
  arenas and 6 random ones, for the same face rings**, and never on the compacted copy. For example, on
  `geom/on-segment-split#0` the hole of the kerb runs `5321779,3682714 5321711,3682715 …` on the original and
  `5321779,3682714 5321730,3682744 …` on the decoded arena. On `geom/one-point-touch#1` the original refuses with
  E_INVARIANT and the decoded arena gives a kerb. That is B-1.
- One P1 line, `move/pinch-halves#1` "view L1 faces differ", is the probe's own artifact. The hole visits its
  lowest-leftmost vertex twice, so the probe's rotation is ambiguous. The two rings `A B A C D C E C` and `A C D C E C A B`
  are one cyclic ring.

**P2 — kerb → planner → S9 through the façade, on five copies of each arena** (`p2-kerb-planner.mts`). Every L1 face
gets an owner. Then, through one kernel per copy, the probe reads every L1 face's `kerb` inside a transaction and plans
it with `planCut`. The streams come from `Kernel.rng()`, keyed by a slot-free face key (`H128("face:<canonical
index>")`). After that, `corridorUnion` runs at S9 over all L1 faces. The copies are: the original, its decoded block,
`compactSlots`, `renumberSlots` (seed 7 and reversed), and `renumberSlots` with starts re-drawn (seeds 7 and 11, C-0199 (2)).

- The one mixer: 500 random keys × concerns × options give equal draws from `Kernel.rng().stream`, `createRng().stream`
  and `new Stream(streamKey(…))`. The planner's ladder (cut.json `maxFrames` 3, so attempts 0–2) fits the registry's
  caps: cut.t 2, cut.arc 2, cut.stop 0.
- CITY: 36 faces planned (36 cuts), identical on every copy. The S9 commit is E_KEPT on every copy, which C-0212 (6)
  stages to M3a for kept content inside an L1 face.
- **Constructive set (166 arenas, 388 faces; 243 cuts, 38 blocks, 99 empty kerbs, 7 E_NOT_TWO_CROSSINGS): the
  compacted and slot-renumbered copies are identical everywhere. The decoded copy differs: kerb on 23 arenas, the
  planner's plans on 12, and the S9 commit (slot-free print, or its outcome) on 27. The start-re-drawn renumberings
  differ in the S9 commit on 9 and 8 arenas.** Receipts are in `logs/p2-constructive.log`. Minimal repros (`p2d-diff.mts`):
  - `geom/on-segment-split 0 dec`: "prints equal before S9: true", both commit, "only orig 87, only dec 90" lines.
  - `geom/one-point-touch 1 dec`: "prints equal before S9: true". The original refuses with "insert: no route … (N-43)",
    and the decoded arena commits.
  - `geom/collinear-overlap-same 1 starts7`: no load at all, only M0-d-08's start re-draw. "prints equal before S9:
    true", then "only orig 7, only dec 7". The L1 ring's Steiner vertex lands at `2308287,1618980` instead of
    `2308314,1618982`.

**Diagnosis (P1d, P1e, the mirror control, P2e).**

- P1d: `routeLines` of every spine is the same on the original and decoded arenas. The kerb difference is not in the
  geometry read.
- P1e: the load re-interns the address ids in the block's sorted order, so the entity handles change. For example,
  `way:probe` is handle 3 on the original and 1 on the decoded arena; `way:segment` 1 → 2; `way:spur` 2 → 3.
  `kerb.ts` keys each spine as `${role id}:${entity handle}` (`rowKeyOf`, line 165) and orders the spines' buffer parts
  by that text (`kerbParts`, line 262). So the overlay's second operand changes order with the handles, and the
  snap-rounded result changes with it. `bandUnion.ts:285` builds the same key.
- The control: in a scratch mirror (`mirror/`, diff in `logs/mirror-patch.diff`), the key was changed to
  `${role id}:${entity id text}` in those two places and nothing else. The decoded copy's kerb differences fell from
  23 to 3, its plan differences from 12 to 0, and its S9 differences from 27 to 11 (`logs/p2c-control-patched*.log`).
- P2e, in the mirror with that key and with `bandUnion.ts` instrumented to log each `insertChain` call: every remaining
  S9 difference (dec 11, starts-re-drawn 11 and 9) comes with a different sequence of insertChain calls from
  corridorUnion. In 26 of those 31 cases it is the same chains in another order; in the rest, other outline pieces.
  **No case has the same calls and a different commit.** So insertChain is not the cause.
- `bandCore` inserts each face's outline pieces and its corridor_split chains in walk order (`readKerb`'s
  `junctionsOf` / `outlinePieces`). The walk starts at the face record's stored `outer` / `out` half-edge. A load
  sets that start to the key's half-edge (C-0207 (5)), and M0-d-08's `starts: true` re-draws it, so the insertion
  order moves with it.

**P3 — matching across a load and a split** (`p3-match.mts`). 0 bad.

- Entities are read through the façade from CITY: 36 L1 blocks (point anchors at their centroids), 140 L3 plots and
  140 L4 footprints (overlap anchors). The fresh side is read from the decoded block, with `indexCandidates` over the
  decoded arena's rebuilt index. Result: `{"survive":0,"succeed":316,"tombstone":0,"fresh":0}`. Every succession is
  the entity's own address, at distance 0 or IoU 1, with 0 carry events.
- Over 400 random boxes, `indexCandidates` gives the same ids in the same order on the original and decoded arenas
  at L1, L3 and L4 (1 200 box reads, 906 non-empty), and so does the `way` role source.
- §3.6 (5) end to end, 40 cases: a footprint is split by the façade's `geom.splitFace` along a boundary-to-boundary
  cut through its centroid. The cut is vertical or horizontal, skewed or not, in either direction. The probe checks
  that splitFace's first child lies left of the directed cut. The two children go to `match` as `splits` in
  splitFace's order. In all 40 cases the left child keeps the id (`by: 'split'`), the right child is fresh, there are
  0 duplicate addresses, and `rebind` keeps the old reference on the left child. The original and decoded arenas give
  identical results.

**P3c — the type meeting** (`zz-g10-type.ts`, compiled in the mirror with `tsc -p packages/model`). `SupersedesTable`
→ `CarryMap`, `CarryMap` → `SupersedesTable`, `MatchResult['supersedes']` → `CarryMap`, and model `Id` ↔ kernel `Id`
all compile. The negative control (`ReadonlyMap<number, number>` → `CarryMap`) fails with TS2322, as it should.

**P4 — the Rng's continuation and the planner** (`p4-rng-replan.mts`). Planning one face twice on one `Kernel.rng()`
continues the streams: g 0.139 then 0.309. A fresh Rng repeats the first plan (g 0.139). This is §6.1's documented
behaviour ("streams are created on first request and continued after"), not a defect; see N-3.

## Failing line

**B-1 (blocker; the item whose files must change: M0-a-09).** The band ops' results depend on the arena's
representation, not only on its geometry, so the same arena gives a different kerb, S8 plan and S9 commit after a
save/load.

- **What happens.** `kerb(F)` and `corridorUnion` (`plat/packages/kernel/src/arr/kerb.ts`, `bandUnion.ts`) order
  their work by two representation choices:
  1. the spines by `${role id}:${entity handle}` (kerb.ts:102/165/262, bandUnion.ts:285), where the handle is an
     intern number, not the entity id;
  2. the outline pieces and corridor splits by walk order from the face record's stored start.
- **What it breaks when composed.** A block saved and loaded by M0-a-15 keeps the same arena (print, digests, every
  façade read: P1). It re-interns the ids and re-chooses the starts. The next kerb read through M0-a-16's façade
  then differs (23/166 constructive arenas, 6/40 random ones). M0-b-02's plan on that kerb differs (12/166). The S9
  `corridorUnion` commit differs (27/166), including a refusal on the original against a commit on the loaded copy.
  M0-d-08's start re-draw alone reproduces the S9 difference (9/166 and 8/166).
- **The promises it breaks.** §3.3: "Every tie-break in the kernel uses lattice positions (y, then x), canonical item
  keys … or entity ids, never a VertexId, HalfEdgeId or FaceId … identical results for the same next edit". C-0207 (5):
  "the loaded arena's next operation equals the original's in arena, digests, codes". N-45 (no output that depends on
  the representation; the S8 ≡ S9 contract).
- **Required change (M0-a-09).**
  - Key and order the spines by the role and the entity **id** (or another slot-free key), never the handle.
  - Order the outline pieces and the corridor-split chains canonically: start each ring's walk at its canonical key
    (§3.3), or sort the pieces by lattice position, never by the record's stored start.
  - Add a test that runs kerb and `corridorUnion` on an arena and on its `decodeArena(encodeArena(…))` copy and on
    `renumberSlots(…, { starts: true })` copies, and asserts the same kerb and the same committed print. The
    constructive cases named above are ready-made fixtures.
- **Not the cause.** M0-a-15's load is correct. Re-choosing the start is its declared reading (C-0207 (5)), and the
  design stores no handle ("entities as document ids", §3.9). insertChain is not the cause either: with the same
  calls, the commits agree (P2e).

## Notes (not blockers)

- **N-1 (the near red is a load timeout).** __REPLAYNOTE__
- **N-2 (foreign reds in the related and whole runs).** The reds are in M0-x-02's `layout/test/pipeline/core/`
  (being built), in M0-e-03's `site` water `outfalls.ts` (`site/test/terrain/range.test.ts`, being built), and the
  testkit agreements on insertChain's N-43 (M0-a-05, `check/M0-a-05-close-s6` running). No group file is on their
  path. They are notes for the session.
- **N-3 (a hand-off fact for M0-b-03).** The planner draws from `streams.rng.stream(…)`. A derivation's `Rng`
  continues a stream on its second request (P4). So M0-b-03 must plan each (face, attempt) once per Rng, or replay a
  stored plan, and must pass `ctx.stop` on a re-plan (the planner already refuses attempt > 0 without it). Planning the
  same face twice at one attempt on one Rng draws different uniforms.
- **N-4 (insertChain is order-sensitive).** The same chains inserted in another order commit different Steiner
  positions (P2e). §3.3 names attraction as "the one order-sensitive rule" and asks every caller for a canonical issue
  order, so this is the callers' duty (B-1), not M0-a-05's defect. It is recorded so a later band or recursion op
  remembers it.
- **N-5 (load).** Other seats kept the load average at 6–12. `test_budget.py` gave W=3 (near), 6 (related) and 4
  (whole). The timings in the logs are informative only (J198).

## Probes and logs

`~/maps-scratch/waves/integration-g10/`: `lib.mts`, `p0-smoke.mts`, `p1-io-facade.mts`, `p1d-kerb-diag.mts`,
`p1e-handles.mts`, `p2-kerb-planner.mts`, `p2d-diff.mts`, `p2e-insert-order.mts` (mirror only), `p3-match.mts`,
`p4-rng-replan.mts`, `zz-g10-type.ts`, `zz-g10-neg.ts`; the control mirror `mirror/plat` (node_modules deleted;
`logs/mirror-patch.diff`); logs `logs/{install,lint,build,near,related,whole,p1-city,p1-random,p1-constructive,p2-city,p2-constructive,p2c-control-patched,p2c-control-patched2,p2e-insert-order,p3}.log`.
