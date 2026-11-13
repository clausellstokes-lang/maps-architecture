# Adversarial review of the contracts round (RL13 + RL15) — J631 (2) (a)

Reviewer's seat, 2026-11-13. Read whole: `draft.md`, `rulings-provisional.md`, the three entries (every line's
`required_change`), `README.md`; the code cited, on the design head (102ff939 / 75424cfb: tx/, facade/, site/, layout/,
bench/, testkit/ identical to the mirror's a6b04f90) and insert/ on `origin/wip/child-a05s14`. Probes ran in the scratch
mirror `/home/user/maps-scratch/gates-c05s4/plat` with Node 24, `nice -n 19`, one worker; logs in `logs/`, scripts in
`probes/` (copies of the mirror probe files) and `/home/user/maps-scratch/review-contracts/`.

## Verdict

**BIND AFTER THE NUMBERED CHANGES.** Both designs survive the attack in substance: the dry run is exactly a rejected
batch's undo (shown bit for bit, not argued), the widened `Kernel['tx']` compiles in all fourteen projects, and the
field is the right replacement for the regex. But the round as written would (a) land a red in M0-a-16's own exit-bar
test that no leg may edit and that the entry does not declare (F1), (b) add a §14 member to the façade without saying
how that squares with the owner's J558 ordering of a-16's public-API work or amending §14 (F2), (c) ship a NO-SHIFT
argument for the reader that is wrong on one branch (F4), (d) carry two pins that no mutant can turn red and one
mutant that its named pin does not kill (F7), and (e) fold a fourth leg (Q9) whose reader has no production caller
(F9). The measured answer to the sequence question (F3) is that no registered input depends today; the dry run is
still the only design exact by construction, and it is cheap (the plan charges 3–21 operations against a 10 000 000
limit). None of the changes redesigns either contract.

BLOCKER: none. CHANGE: F1, F2, F4, F6, F7, F8, F9, F10, F12. NOTE: F3, F5, F11, F13.

## Findings

### F1 — CHANGE (gating): the new façade member reds M0-a-16's exit-bar test, which no leg may edit and no line declares

`plat/packages/kernel/test/facade/reflection.test.ts`, test "§14's members are on the Kernel — plat, view, resolve,
geom, index, tx — beside rng, pool and assertCurrent":

    const names = sortedKeys(k);
    expect(names).toEqual(['assertCurrent', 'geom', 'index', 'plat', 'pool', 'resolve', 'rng', 'tx', 'view']);

`Kernel.dryRun` (leg 1, LINE 2) adds `dryRun` to `sortedKeys(createKernel(…))`, so this assertion turns red. The file is
M0-a-16's (`kernel/test/facade/`, M0-work.json) and the a-06 entry says "kernel/test/facade/ is read and run, never
edited"; LINE 3 declares "THE DECLARED SHIFT: NONE" and its seam list names no test of a-16's. The test header calls it
the reflection test of a-16's exit bar ("§14's `interface Kernel`"). As written the leg either lands a red on the head
in another item's exit-bar test or fails its own gates. Nothing in the draft or the rulings mentions it (the draft's
"compile-checked by the leg's build" covers types, not this runtime list).

CHANGE: leg 1's cross-item scope names this one assertion (the member list gains `'dryRun'`, sorted; the test title
unchanged or re-titled by the session), or the session edits it at the landing and the entry declares it as a known
red of the leg with its owner, file, test, before and after. The same line of the scope must also cover §14's design
text (F2).

### F2 — CHANGE: the façade member is a §14 / public-surface change; the rulings must meet J558 and J263 Q1 head-on

* `Kernel` is §14's interface (facade/types.ts header: "`Kernel` is §14's six members … plus … `rng()` … and `pool`");
  API.md §10: "**Façade = intended public surface.** The source designates `createKernel` / `Kernel` / `GeomOps` / …
  as the surface stages use." A new member is a change of the design's interface, not only of API.md §7. The draft
  lists amendments for §3.3 only.
* J263 Q1 freezes folder-index and barrel exports; the draft keeps "to the letter" (no index line). But the barrel
  DOES carry the module-level `tx` (tx/index.ts `export { … tx … } from './tx.js'`; API.md Appendix B lists `tx`), and
  leg 1 widens its return type too (LINE 1: "tx()'s return type … TxResult"), with `TxResult` reachable from the barrel
  only structurally. That is lawful under Q1's letter (no name added) but it is a public signature change and API.md
  §7.2 quotes it verbatim (`export function tx<T>(…): KernelResult<Committed<…>>`, its line marker `tx.ts:548`).
* J558 (the owner's word) orders "a-16's two public-API rows" AFTER the Mac steps (Q145 is held there: "HELD BACK —
  a-16's public-API rows follow the Mac steps (J558)"). A façade member added now by another item's cross-item scope is
  not one of those two rows, but it is exactly the kind of change J558 sequenced, and the provisional Q7 rules the
  vehicle without addressing the ordering.

CHANGE: the final rulings (Q7) state in one sentence why a new `Kernel` member is lawful before the Mac steps under
J558 (it is the RL15 ruling's own contract, not one of a-16's held rows) and under J263 Q1 (no export name moves; the
§14 interface gains one member by RL15); the round's seam list adds the §14 amendment (the `Kernel` interface:
`dryRun`) beside §3.3's; API.md's seam list adds §7.2's module `tx` signature and §10's façade sentence. If the session
will not widen §14 before the Mac steps, the fallback is F3's (a-1) with an exact dependence test — then RL15 waits.

### F3 — NOTE (measured answer to attack 1): no registered input depends; the dry run is still the only exact design

MEASURED (probe `zzReviewProbe` in the mirror's boundary.ts: after the gate plan, each crossing re-planned ALONE on the
untouched arena by the same `placeGateVertices` in its own rejected batch — that is (a-1)'s per-split plan with the
snap and the bridgehead logic included — compared with the sequence's point; the untouched nearest way edge of every
crossing recorded; every pair of crossings sharing that edge or within 229 cm (2·attractCm + minEdge + 2·TOUCH_CM = 129 cm, plus a
metre's margin) listed):

| sample | walled stages k ≥ 2 planned | crossings (split / snap) | pairs on one edge or ≤ 229 cm | closest pair | per-crossing ≠ sequence | plan work (ops) |
|---|---|---|---|---|---|---|
| flat CITY fixture, seeds 1–40 (s5ab bar's `grow(flatFixture)`) | 40 | 320 (248 / 72) | 0 | 385.8 m | 0 | 9–21 |
| site, TEST size: relief-60, relief-3000 × default, coarse × seeds 1–8 | 32 | 128 (84 / 44) | 0 | 36.0 m | 0 | 3–9 |
| site, CITY: relief-60, relief-3000 default × seeds 1–3 | 6 | 48 (30 / 18) | 0 | 16.9 m | 0 | 9–18 |

Logs: `logs/dep-*.jsonl` (one line per plan: every crossing's kind, untouched edge, sequence point, isolated point) and
`logs/dep-*.summary.txt`. One plan per derivation everywhere (stage k = 2 only), which supports the draft's ≈ 200 plan
batches per 200-seed group (weak point 5) without counting the summary itself. No crossing met a bridge span.

So the draft's §1.3 (c) mechanism is real (a later crossing reads the earlier splits: shown in the prototype test
`zz-review-dryrun.test.ts` — a second split on a sub-edge — and in the snap rule `vtxD <= 4·TOUCH_CM²`, which makes a
crossing within 52 cm of an earlier gate's NEW vertex take that vertex), but on the registered families the crossings of
one walled stage are one per radial way and metres apart: the per-split plan would have been exact on every input
measured.

Whether exactness on every LAWFUL input needs the dry run: yes. Two crossings of one way within 52 cm are lawful input
(a boundary that grazes a way: span.test.ts's own "two gates at one bridgehead" builds crossings 10 cm apart), and on
it the per-split plan and the sequence differ by construction (the second snaps to the first's new vertex in the
sequence, splits on its own point alone), so (a-1) refuses it at the trace's `not where it was planned` check — a new
refusal of lawful input (J264 (2)) — unless c-04 adds a dependence test with a fallback, which re-creates a batch for
the fallback or refuses. The dry run is exact by construction and costs the same work as today's plan. The measurement
does not argue for (a-1); it says the dry run's correctness gain is latent (no family exercises it) and its real gain is
the receipts' (F6). RL15's own rationale (no rejected batch in any receipt) holds either way. (Whether today's SEQUENCE then succeeds on
such an input — two gates at one vertex — was not constructed; the claim is only that the dry run's plan equals the
trace batch's re-made splits there and the per-split plan does not.)

### F4 — CHANGE: RL13's NO-SHIFT argument is wrong on the estuary branch; and two producers it omits

The draft (§2.1) argues: "the assertion class (1.1 (d)) prints `(shore, <id>, 0)`, whose regex capture `<id>, 0` is no
body id (`at = -1`, stop) while the field is absent (`at = -1`, stop) — the same branch". The code takes the estuary
branch BEFORE the `findIndex`:

    const named = /\(shore, ([^)]+)\)/.exec(attempt.detail)?.[1];
    if (named !== undefined && named.startsWith('water:estuary:') && mouth !== undefined && mouth !== 'none') {
      refused.push({ id: named, reason: 'refused' });
      mouth = 'none';

On `S1 water: water:estuary:0 ring 0.0: arena: the element already carries (shore, water:estuary:0, 0)` (arena/rows.ts
:125's assertion text, made a refusal by insertChain's `INVARIANT_THROW = /^(insert|arena|index): /` on the router
ref, then prefixed by waterBatch `${body.id} ring …: ${ins.detail}`), the regex captures `water:estuary:0, 0`, which
starts with `water:estuary:` → the estuary is dropped (with a bogus id `water:estuary:0, 0` in `report.dropped`) and the
river re-run; the field is absent → `at = -1` → the stage refuses. The two DISAGREE. Reachability is unproven (it is
the assertion class), but the argument as written claims the opposite, and the equivalence oracle only sees the
declared sample.

Two other producers of `(shore, X)` text that can reach `attempt.detail` and that the draft's case list omits:
(i) M0-a-14's suite rows through `env.invariants` — `invariants/batch.ts:573` `the structural role (${k.role},
${k.entity}) lost its last edge in a merge or absorption` is a row the transaction's own `roleProblems` never makes, so
a batch whose only problem is that row would be named by the regex and not by the field; production S1 runs on the
runner's env (`{ ...options.env, rankOf, onCommit }`), but testkit's `kernelOn` / `suiteEnv` wires the suite (no S1 run
uses it today — grep); (ii) planted callback refusals in tests (`slow-rings.test.ts` `refusingFirstRiverShore`: text
`role consistency: (shore, water:river:0) branches (planted)`) — the draft covers these (no field, not reached).

CHANGE: e-03's LINE 1 states the estuary case as a DECLARED behaviour change of an unreached (assertion-class) branch:
with the field the stage stops and refuses where the regex dropped the estuary under a non-id — the field's behaviour
is the correct one — and adds a pin P6: a text printing `(shore, water:estuary:0, 0)` with no field, with a mouth set,
refuses (red with the regex: the estuary branch fires). a-06's LINE 1 P3 adds the suite's row: under `suiteEnv` a refusal
by the merge/absorption row carries no key. The NO-SHIFT claim is narrowed to "every refusal the transaction's own rows
make, and every text with no `(shore, `"; the oracle's count of named refusals is reported (below).

MEASURED (the prototype field in the mirror's kernel; `waterFaces` logging every water-batch refusal with the regex's
name and the field's; `runS1` logging every visit of the naming line): x-06's EP-01/S1 cells at 10 seeds (5 kinds) —
20 water-batch refusals: 10 `E_DEGENERATE … ring 0.0: empty` (no name either way) and 10 commit-time `(shore,
water:river:0) branches` (regex = field = `water:river:0` on all 10); the naming line visited ONCE (the river named →
the stage's refusal), so the oracle's population is real but small (`logs/rl13-ep01-s1.*`). The site families: 32
test-size derivations (relief-60 / relief-3000 × default / coarse × seeds 1–8) — ZERO water-batch refusals, the naming
line never visited (`logs/rl13-site-test-1-8.*`); 6 CITY derivations (relief-60 / relief-3000 default, seeds 1–3) — zero as well (`logs/rl13-site-city-1-3.*`). So the draft's "the naming branch IS exercised … by
the site families" is not borne out on this sample: only EP-01's planted cells reach it.

### F5 — NOTE: the dry run's undo IS the rejected batch's, bit for bit (attack 5, shown)

Prototype in the mirror (draft's shape: `open`, `fn`, `overWork`/`workDetail`, `undoBatch`, `closed`, `rethrown(…,
'dry')`; façade member built like `runTx` with `within` and `{ key, version: -1 }` stamps). Probe
`kernel/test/tx/zz-review-dryrun.test.ts` (log `logs/dryrun-proto.log`, 6/6 green; the sixth is F7's):
* two splits on one way edge (the second on the sub-edge the first made) in a rejected batch on arena A and in a dry
  run on a twin B: `bits(A)` (support.ts: every column to capacity, slot counters, handle tables, frame, version, and the
  index's grids, tombstones, partitions, byKey, log state, work counts) equal to before and to `bits(B)`; the same slot
  ids returned by both; `restoreGeneration` and `version` unmoved; the next committed split takes the same slot on both
  and leaves `bits` equal;
* a dry run inside an open batch on the same arena throws `tx: another batch is open on this arena` (from `open`, so
  outside `tx`'s rethrow: the OUTER batch's rethrow prefixes it), and the arena is untouched;
* `workLimit: 0`: `{ ok: false, code: 'E_WORK_LIMIT', detail: 'the dry run exceeded its work limit' }` — splitThrough
  does not refuse at the limit itself, so the declared edge's mechanism is real; a throw in `fn` is rethrown as
  `tx 8/L1/dry/fn: boom` with the arena untouched;
* through the façade: a `{ ...k, tx }` watcher sees nothing, `onCommit` is never called;
* RL13: a way inserted to branch is refused `(way, way:1) branches: …` (byte-equal) with `refused: { role: 'way',
  entity: 'way:1', ordinal: 0 }`; a callback refusal has no `refused` property.
What the bits do NOT cover, and neither does a rejected batch: per-arena side tables outside the undo log —
`arr/kerb.ts` `CENSUS` (the last read), `arr/bandUnion.ts` `CLOSINGS`, `geom/neighbours.ts` `maps`,
`digest/levelDigest.ts` `STATES`. A rejected batch that ran `kerb` or `corridorUnion` can leave the first two changed today (read, not run);
a public dry run makes "always undone" the normal case. See F8 for the doc and the pin.
The undo oracle (`PLAT_UNDO_ORACLE=1`, kernel/test/tx/support.ts) observes every `markBatch`/`undoBatch` — a dry run built
from them is covered without a change; the determinism harness (bench/src/determinism/spike.ts, committed batches only)
never sees a dry run and needs nothing, since nothing a dry run does reaches a commit.

### F6 — CHANGE: the receipts — what the unwatched dry run loses, and two watchers the draft does not list (attack 2)

Today's plan is a refused S5 batch charging `insert.points` / `insert.attractQueries` / `insert.placementCandidates`
(3–21 operations, F3). Followed through:
* e-06: compose.ts `watchedKernel` → receipts.ts `runRecord` (`kernelBatches`, `batches.S5.refused`) → report.ts
  `stageSamples` (`b.committed || b.code !== null`: one sample per refused batch; `units.n` 1804/1790/1725/1733 =
  committed + refused) → anchor.ts `chargedWork` → `canaryIndex`, `recordDigest`. After the round: the S5 population
  falls ≈ 11 % (≈ 200 of ≈ 1 800 per group), the per-unit quantiles move, `chargedWork` falls by ≤ 21 per walled record
  (the canary can move only between candidates that close).
* f-03b: fit.ts takes `committed + refused` as the population and `stages.S5.refused.E_WORK_LIMIT` as the numerator of
  "≤ 1 cut per 1 000 batches". Nothing becomes WRONG: the plan never ran under S5's law (`l1Spec`'s constant
  10 000 000), so the population becomes more honest; the pins move at the re-run (Q10).
* Misleading, not wrong: `stageMs.S5` (compose.ts `timed`) keeps the dry run's time while `stageWork.S5` drops its work
  (no bench reader divides the two today). A note for Q129.
* Watchers the draft omits (it says three): `bench/src/fusion/runs.ts` `watchedKernel` (M0-c-06; `fusion/measure.ts`
  `stageRows` samples every committed or refused batch of WATCHED_STAGES, S5 included; off by default — the committed
  `M0-c-06.json` has no S5 kernel-counter block, so nothing moves today) and `bench/src/determinism/spike.ts` (M0-d-09,
  committed only). Both spread `...kernel` and override `tx` alone.
* A dry run as its own class is possible without c-04 (any watcher can wrap the `dryRun` member: e-06's three files,
  x-04's base.ts, x-06's plant.ts, c-06's runs.ts) but not needed: J264's census is unaffected (a dry run's refusal is
  S5a's own stage refusal) and no law covered the plan. Not in this round.
CHANGE: §1.3 (d) and c-04 S8 LINE 2's evidence list the two watchers; Q10 names c-06's watched mode as a latent reader;
Q3's routing says "the dry run's work is spent and unreceipted; a re-profile that needs it wraps `Kernel.dryRun`".

### F7 — CHANGE: pins and mutants of leg 1's LINE 2 that do not work as written

* **M6 is not killed by P1.** LINE 2: "M6 the façade's member without `within` (a geom writer inside refuses: P1 red)".
  A façade writer checks `isOpenTx(o)` (facade/kernel.ts `writer`: `if (!isOpenTx(o)) fail(…)`), and the module
  `dryRun`'s overlay is minted by `open` → `markOpen(t)`, so `kernel.geom.splitThrough(o, …)` WORKS without `within`
  (measured: the module `dryRun` with the façade's `splitThrough` inside — M6 exactly — splits ok, and the writer's returned object then reads CURRENT under `assertCurrent`: `logs/dryrun-proto.log`). What `within` provides is (i)
  `current()` for the services that read the open transaction (`kerb`, `offsetFace`, `insetRing`, `sideRuns` /
  `sampleBoundary` on a face id) and (ii) `batchLists.set(o, frame.stamped)`, without which a writer's returned value
  stays stamped at the arena's version — which a dry run leaves unchanged — so after the dry run the freed slot's value
  reads CURRENT in the debug build. M6 must be killed by a pin that calls `kernel.geom.offsetFace` (or `kerb`) inside the
  dry run, AND by P5's stamp check on a writer's returned object.
* **A stale-slot hole the dry run opens (new).** The −1 restamp reaches only WRITER values (`batchValue` → the frame's
  list). A `kernel.resolve`, `view`, `index.query` or `pointLocate` made INSIDE the dry run is stamped at the arena's
  version, which the dry run leaves unchanged, so after it the value reads CURRENT in the debug build although it names
  freed slots — measured: `k.resolve({ role: 'way', entity: 'way:1' })` inside a dry run that split way:1 returns runs
  `[[12, 14]]` (the split's sub-edges, freed by the undo, and the very slots the trace batch's re-made split takes) and
  `k.assertCurrent(res)` passes afterwards (`logs/dryrun-proto.log`). Inside a real batch the commit moves the version,
  and a rejected batch's caller never expected its reads to survive; a dry run's purpose is to return what it read.
  c-04's plan returns lattice points only (safe), but the public member does not say so. CHANGE: the façade re-stamps
  every value its services return inside an open dry run (resolve, view, query, pointLocate, faceNeighbours, signature
  through the frame's list), or the doc states that values read inside a dry run are invalid after it, with a pin either
  way (a resolve inside, `assertCurrent` after: throws, or the doc's sentence quoted in API.md).
* **P5's "a slot value it returned fails assertCurrent"**: a slot is a number; `stampOf(number)` is undefined, so
  `assertCurrent` throws "carries no stamp" whether or not M7 is applied — vacuous. Reword: in the debug build,
  `kernel.assertCurrent(r)` on the dry run's RESULT object and on a writer's returned object (e.g. the façade
  `splitThrough`'s KernelResult) throws, naming version −1 — red under M7 and under M6.
* **P7 can never be red.** "Through the façade a `tx` wrapper in base.ts `watched`'s pattern sees no batch for a dry
  run": the wrapper intercepts calls to ITS `tx`; the inner kernel's `dryRun` never calls the wrapper's `tx` whatever it
  does internally (M1 "dryRun commits" leaves P7 green). Drop P7; the real pin is c-04's span.test.ts re-pin (leg 3 P1).
* **P1's oracle** should be named: `bits(p)` from kernel/test/tx/support.ts (it covers the slot counters, the handle
  tables, the frame, the version and the index's whole mutable state) — the entry's hand list ("version, restore
  generation, level digests, slot counters, index …, tables") is weaker than an existing helper.
* **P4** "one with ops or expect rows throws": add the dry run inside an open batch on ANOTHER arena of the same kernel
  (allowed by `open`, and then the façade's `current()` reads the dry run's overlay for the services) — the doc must say
  which transaction the services read inside a nested dry run.

### F8 — CHANGE: the dry run's doc comment over-claims; name and term collide with existing kernel vocabulary

* "then EVERYTHING undone … the arena, its index, its slot counters and its version as they were" (draft §2.2): true for
  what the undo log covers (F5), false for the per-arena side tables outside it (`CENSUS`, `CLOSINGS`, the neighbour
  maps, the level-digest states). For the gate plan (splitThrough only) none is touched; for a general public member it
  matters. CHANGE: the doc says "undone exactly as a rejected batch is (§3.3's frames): what a writer's per-arena
  diagnostics record — kerb's last read, bandUnion's closings — is not undone", and P1 adds: after a dry run that runs
  only `splitThrough`, `kerbCensus(p)` and `bandClosings(p)` unchanged (the 2B "nothing left behind" oracle's two side
  tables).
* `dryRun` is already the name of a private function in `arr/kerb.ts` (`function dryRun(t, face, …): Dry`, the kerb read
  on the real arena), frames.ts's header uses "dry run" for op savepoints, and round 2B adds "the lay on its view". A
  public `Kernel.dryRun` beside them invites misreading. NOTE: either a distinct public name (e.g. `trial`) or the API.md
  entry defines the term against the kerb read's.

### F9 — CHANGE (REVERSE Q9): the runner's `expectVerdicts` has no production caller

* `expectVerdicts` runs only inside `PipelineContext.batch` (runner.ts: `const r = kernel.tx(tx, fn);
  expectVerdicts(expect, r, env.floors)…`). Grep of every `src` of packages/ and bench/: NO stage calls `ctx.batch` —
  only layout/test/pipeline/core/ (rows.test.ts, runner.test.ts, support.ts) does. Every production stage calls
  `kernel.tx` directly.
* The stages' batch-scope hard rows (`expect` = `stage.invariants.filter(scope === 'batch' && class === 'hard')`): only
  M0-c-05's infill registers one (`BLOCK_FLOOR_ROW`, a `classFloor` whose code is `E_BELOW_MIN_*`, read by its CODE),
  and infill does not use the door either; water's `REFERENCES_ROW` and infill's `SEAM_PORTAL_ROW` are stage-scope.
* On a miss (`named < 0`) every row reads `null` ("tells nothing"), the safe direction; a structured row name would move
  no production verdict. So the "NO-SHIFT, shown as RL13's reader's is" of Q9 is trivially true and proves nothing, the
  fourth leg has no reader to protect, and it adds a second field, a third pin family and an x-02 round to a merged round
  that already spans three items.
* One real ambiguity of the text contract the field would fix, for the queue row: a kernel row's own text can open with
  a row's name — `clearanceProblems` texts open `clearance: …`, checkIndexBatch's `index-freshness …` — so a stage that
  declared an `expect` check named `clearance` would have the kernel's own clearance refusal read as its row's failure.
REVERSE Q9: a queue row (M0-a-06 + M0-x-02: a structured `row` on the expect refusal; the ambiguity above its evidence;
due when a production stage first uses the door), not a fourth leg.

### F10 — CHANGE: Q2's "leg 3 launches when leg 2 has ended, whatever its verdict" on one branch

The legs share no FILE, but they are not independent: `@plat/layout` depends on `@plat/site` (layout/package.json), and
layout's tests run S1 (layout/test/pipeline/base/run.test.ts, table.test.ts). On ONE tree and ONE branch, a leg 2 that
returned FAIL leaves its site/water diff in the tree leg 3 builds, checks (NEAR, RELATED@1000 over layout — which
reaches site) and lands on. CHANGE: Q2 says what happens to a failed leg 2's diff before leg 3 launches (reverted on the
branch, with the revert in leg 3's base mirror), or legs 2 and 3 run as two children off leg 1's landing.

### F11 — NOTE: neighbours (attack 7)

* **M0-a-06 S10** (specs.json round 185) edits `tx/tx.ts` `run`: LINE 1 (ii) inserts the `shape`-row maintenance "at the
  COMMIT of ANY batch … after `t.op = 'commit'` and before sweepVertexRows" — the draft's line cites for `run` move; no
  design collision (a dry run never reaches the commit; nor does a rejected callback batch). LINE 3 changes the restore
  generation of COPIES (negative tokens): the dry run's "restore generation unmoved" pin must compare
  `restoreGeneration(p)` before/after, never a literal 0. LINE 6 adds a throw to `removeEdges` on a `shape` VertexRef —
  irrelevant to both contracts. The gate on S10's landing (Q1) is right.
* **Round 2B's lay on its view** (spec-a09-s21.json LINE 3) is NOT the same facility: it is op-level, INSIDE an open L1
  batch, kernel-internal and unserved, its view an un-minted copy of the OpenTx with its own work, journal and log, undone
  by `opSave`/`rollback` while the batch continues; `dryRun` is batch-level, OUTSIDE any batch, served, minted (so the
  writers accept it), undone by `undoBatch`. They should not be one (a lay cannot open a batch inside a batch; a stage
  cannot hold an op savepoint outside one). They should share (a) the "nothing left behind" oracle (2B's pin (i): bits,
  state, work, journal, log, frame count, index-log length, `bandClosings`, `kerbCensus`) and (b) the vocabulary (F8).
* **Q181's round** was drafted as `M0-a-06 S11` (docs/validation/q181-ruling-2026-11-12/spec-a06-s11.json); this round
  takes S11. Both are "the next a-06 round after S10" and both edit tx/ (Q181: relevel.ts; this: tx.ts, types.ts). Q181's
  declared shift ("flag bytes and roots of every derivation with water at the frame") touches S1's arenas, so whichever
  lands second re-takes its baselines (e-03's leg-2 before/after; Q181's flag-masked comparison). The final Q1 orders them.

### F12 — CHANGE: the entries line by line (attack 8)

* **a-06 S11 LINE 1, M5** ("the ordinal hard-coded 0 — if no linear role is indexed … drop M5"): resolved now —
  arena/roles.json has `indexed: false` for all eleven roles of `LINEAR_PARTS`, so every linear key's ordinal is 0 and M5
  is EQUIVALENT. Write "M5 dropped (no linear role is indexed)" instead of leaving the seat to find it.
* **a-06 S11 LINE 1, P3** lacks the one producer on which the regex and the field can disagree on a kernel row: a suite
  row through `env.invariants` (F4 (i)); add it.
* **a-06 S11 LINE 2**: F7's three pin defects (M6/P1, P5, P7) and F8's doc and side-table pin.
* **a-06 S11 LINE 3**: "THE DECLARED SHIFT: NONE" is false by F1 (reflection.test.ts). The compile clause is
  provable and passes (F13).
* **e-03 S6 LINE 1, P1–P3**: "a façade whose FIRST water batch … returns {…} on a river and a tributary with no fast
  ring left to retry". With a fast ring standing, the loop's first step is the slow-only RETRY (`if (attempt.fast) {
  attempt = water(…, true); … }`), whose batch the plant does not refuse, so the naming line is never reached: the retry
  commits both bodies and P1's expectation (the tributary dropped) fails on the FIXED reader as on the regex. The entry must say HOW the first attempt is made non-fast (both
  bodies' fast rings refused before the batch — e.g. hardening-s4.test.ts's `near the edge` construction — or the plant
  refuses EVERY water batch until its named body is gone) and assert `report.retried === false` (the naming path, not
  the retry). Add P6 (F4: the estuary text with no field).
* **e-03 S6 LINE 1, NO-SHIFT sample**: the size of "relief-60 and relief-3000, default configuration, seeds 1–40" is not
  stated (test or CITY); say CITY (the summary's size) or test, explicitly.
* **c-04 S8 LINE 2, the declared site sample "at the test size"**: adequate for the COUNT — MEASURED, every test-size
  derivation of the probe reaches a walled stage k = 2 (32 of 32 derivations, one plan each, 4 crossings each) — but a test-size stage has 4 crossings where
  CITY's have more, so the per-counter sample sizes it predicts are test-size ones; the summary is at CITY (compose.ts
  `deriveSpike(…, size = 'city')`). CHANGE (small): state that the prediction is per plan (one plan per walled stage
  k ≥ 2 that reached its trace) and give the CITY count of a few seeds beside it.
* **c-04 S8 LINE 1, the declared edge**: measured — the plan charges 3–21 operations (F3) against `l1Spec`'s
  10 000 000: no input comes within five orders of magnitude; "no pin" is right. The rethrow prefix of a throw inside
  the plan changes from `tx 5/L1/callback/fn:` to `tx 5/L1/dry/fn:` — a programming-error text, no pin found by grep;
  say so in the choices row.
* **Write scopes** match plat/docs/build/M0-work.json (a-06: tx/ + test/tx/; e-03: site/src/water/ + test/water/;
  c-04: growth/boundary.ts, growth/mainRoads.ts, test/growth/s5ab/) — except F1's test and F2's design text, which no
  seat may touch: the session's.
* **Asked of a seat that only the session can do**: none beyond F1 (re-landing a-16's record is already the session's).

### F13 — NOTE: the widened `Kernel['tx']` and the new member compile everywhere (weak point 3, refuted as a risk)

Mirror edits: `TxResult<T>` in tx/types.ts (the draft's exact shape); `reject`/`run`/`tx` returning it; façade
`tx<T>(…): TxResult<Committed<…>>` and `dryRun<T>(tx, fn): KernelResult<T>` in facade/types.ts; `runTx`'s two
annotations and a `dryRun` member in facade/kernel.ts. `corepack pnpm exec tsc -b` over all fourteen projects
(packages/kernel, model, tables, site, layout, testkit, bench and their test projects): **0 errors**
(`logs/tsc-widened.log`, exit 0). Why: every wrapper (base.ts `watched`, compose.ts and fusion/runs.ts `watchedKernel`,
plant.ts `plantKernel`, boundary.ts `withinTraceBatch`, spike.ts, span.test.ts's `tx`) builds `Object.freeze({ ...kernel,
tx }) as Kernel` — the cast and the spread carry `dryRun` and accept the narrower declared return; no code builds a
`Kernel` literal without a spread. The flip side: those wrappers' declared `KernelResult<…>` return types hide
`refused` from a caller typed through them (it survives at run time: they return the kernel's object). API.md must say
(§5.1, §7.1, §7.2): the batch's refusal arm `TxResult`, `refused?: RoleKey` set only by a §3.10 role-consistency row
at commit, the key the detail prints; `Kernel.dryRun`'s signature, that it is no batch (no record, no `onCommit`, seen
by no `tx` watcher), that it is undone exactly as a rejected batch (F8's side tables named), that it throws inside an
open batch on the same arena, and that its values are stamped version −1.

## The provisional rulings

| # | Verdict | Reason (one line) |
|---|---|---|
| Q1 | AMEND | The owner and gate stand (the code: tx/ makes both); add the ORDER against Q181's round, which also claimed "a-06 S11" and edits tx/ after S10 (F11), and say whose baselines re-take. |
| Q2 | AMEND | One merged round stands, but "leg 3 whatever leg 2's verdict" on one branch leaves a failed leg 2's site diff under leg 3's layout gates (layout depends on site): revert it first, or two children (F10). |
| Q3 | STANDS | Measured cost: the plan charges 3–21 operations per walled stage (F3); add one sentence that the dry run's work is spent and unreceipted (F6). |
| Q4 | STANDS | `TxResult` in tx/types.ts by path is right (one producer); add that the barrel's module `tx` signature widens too and API.md §7.2 says so (F2). |
| Q5 | STANDS | No pass-through: the regex never read a callback's key either (planted texts are callback refusals). |
| Q6 | STANDS | Shore only is the regex's reading — but the estuary branch's disagreement on an assertion-class text must be declared, not denied (F4). |
| Q7 | AMEND | The cross-item scope is the right vehicle, but it must include the reflection test's member list (F1) and the §14 amendment, and the ruling must answer J558's ordering of a-16's public API (F2). |
| Q8 | STANDS | Cheap and exact; the pin must cover BOTH seams `withinTraceBatch` makes (the trace's and the strips'), and say whether a refused dry run counts in `opened`. |
| Q9 | REVERSE | No production stage uses the runner's door; the only batch-scope hard row is infill's class floor, read by code (F9). A queue row, not a fourth leg. |
| Q10 | AMEND | Add M0-c-06's fusion watcher (watch mode) to the latent readers; c-04's sample predicts per plan, with a CITY count (F6, F12). |
| Q11 | STANDS | Not wired in production; but a-06's P3 pins that a suite row carries no key (F4). |

## THE NUMBERED CHANGES (for the spec seat to fold)

1. (F1) a-06 S11: the cross-item scope adds `kernel/test/facade/reflection.test.ts`'s one assertion (`'dryRun'` in the
   sorted member list) — or the entry declares it a known red with owner/file/test/before/after for the session's
   landing; LINE 3's "THE DECLARED SHIFT: NONE" becomes "none but that list".
2. (F2) The rulings' Q7 says why a §14 member is lawful before the Mac steps (J558) and under J263 Q1; the seam list adds
   §14's `Kernel` interface, API.md §7.2's module `tx` signature and §10's façade sentence.
3. (F4) e-03 S6 LINE 1 declares the estuary branch's behaviour change on an assertion-class text and adds P6; the
   NO-SHIFT claim is narrowed to the transaction's own rows and texts with no `(shore, `; the draft §2.1's sentence on
   the assertion class is corrected.
4. (F4, F12) a-06 S11 LINE 1 P3 adds "a suite row through `env.invariants` that prints `(shore, X)` carries no key";
   M5 is written as dropped (no linear role is indexed).
5. (F7) a-06 S11 LINE 2: M6 killed by a pin calling a service that reads the open transaction (`geom.offsetFace` or
   `kerb`) inside the dry run AND by the stamp check of change 6; P1's oracle is `bits(p)`; P7 dropped; P4 adds the
   nested dry run on another arena with the doc saying which transaction the services read.
6. (F7) a-06 S11 LINE 2 P5 reworded: in the debug build `assertCurrent` on the dry run's result object and on a writer's
   returned object throws naming version −1 (kills M6 and M7); never "a slot value". And the services' values read
   inside a dry run (resolve, view, query, pointLocate) are re-stamped −1 by the façade, or the doc says they are
   invalid after it — with a pin (F7's stale-slot hole).
7. (F8) The dry run's doc: "undone exactly as a rejected batch (§3.3's frames)", naming the per-arena side tables it
   does not undo; P1 adds `kerbCensus(p)` and `bandClosings(p)` unchanged after a splitThrough-only dry run. The public
   name either differs from arr/kerb.ts's private `dryRun` or API.md defines the term.
8. (F9) Q9 reversed: no fourth leg, no expect-row field; a queue row (M0-a-06 + M0-x-02) with F9's ambiguity as evidence.
9. (F10) Q2: a failed leg 2's diff is reverted on the branch before leg 3 launches (its base mirror after the revert),
   or legs 2 and 3 run as two children off leg 1's landing.
10. (F12) e-03 S6 LINE 1 P1–P3 say how the first attempt is made non-fast (or plant every water batch) and assert
    `report.retried === false`; the NO-SHIFT sample's size is stated.
11. (F6) The draft's §1.3 (d) and c-04 S8 LINE 2's evidence list `bench/src/fusion/runs.ts` (M0-c-06) and
    `bench/src/determinism/spike.ts` (M0-d-09) as watchers; Q10's list names c-06's watched mode as a latent reader;
    Q3's routing sentence says the dry run's work is spent and unreceipted.
12. (F11) Q1 orders this round against Q181's (both "a-06 S11" after S10) and says whose baselines re-take; the dry run's
    generation pin compares `restoreGeneration(p)` before/after (S10 LINE 3 makes copies negative).
13. (F12) c-04 S8 LINE 2: the prediction stated per plan with a CITY count beside the test-size sample; LINE 1's choices
    row notes the rethrow prefix `…/callback/…` → `…/dry/…` of a throw inside the plan.
14. (Q8) c-04 S8 LINE 1 P3 covers both seams (`traceStage`'s and the strips') and says whether a refused `dryRun`
    counts in the seam's `opened`.

## What I could not check, and why

* The router round's insert/ (origin/wip/child-a05s14) is not in the mirror (a6b04f90): the probes ran on the head's
  insert/; the cites I used from the router ref (`INVARIANT_THROW`, the conversion at insertChain's `run`) were read, not
  run.
* Reachability of the estuary disagreement (F4): it needs an insertChain that throws the arena's "already carries" check
  on an estuary ring — the assertion class; not constructed.
* The census at full strength: dependence was measured on 78 plans (F3's table), not on the 1 000-seed sweeps or the s5ab
  folder's hand-built sites (span.test.ts's slot outline builds crossings 10 cm apart on a SPAN, which the bridgehead
  rule answers before any split).
* M0-a-06 S10 is unlanded (child ED): its edits to `run` were read from its entry, not merged into the prototype.
* No timing: the stage wall-clock effect of F6 is argued from compose.ts, not measured (the box is shared).
* The e-06 summary's "≈ 198–200 plans per group" (weak point 5): one plan per derivation in all 78 probe runs (F3)
  supports it; the committed summary itself was not re-run.

## Mirror files changed, and restored

Changed and restored (each written back from `git -C /home/user/maps-scratch/gates-c05s4 show HEAD:<path>`):
`plat/packages/kernel/src/tx/tx.ts`, `tx/types.ts`, `facade/types.ts`, `facade/kernel.ts` (the prototype),
`plat/packages/layout/src/growth/boundary.ts` (the dependence probe), `plat/packages/site/src/water/faces.ts`,
`stage.ts` (the RL13 logging). Added and deleted: `packages/kernel/test/tx/zz-review-dryrun.test.ts`,
`packages/layout/test/growth/s5ab/zz-review-dependence.test.ts`, `bench/test/site/zz-review-dependence.test.ts` (copies
and the whole diff in `probes/`). `git status` of the mirror is clean; `tsc -b` re-run after the restore (exit 0,
`logs/tsc-restored.*`) so `dist/types` matches the sources again. Nothing in the repository's tree was edited outside
this folder.
