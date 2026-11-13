# THE CONTRACTS ROUND (RL13 + RL15) — spec draft, 2026-11-13

NOT BOUND. A spec seat's draft for the session's ruling and for the adversarial review J631 (2) (a) asks of a contract
change between items. Cites: files and function names are binding; line numbers are "read on <ref>, not binding".
Refs: the working tree at 102ff939 (design head) for every file except `plat/packages/kernel/src/insert/`, read on
`origin/wip/child-a05s14` @ 9354851f (the router round, in flight). Nothing here was run: no test, no build.

## 0. The finding that reshapes the round

**Neither contract's kernel side lies in M0-a-05's owns.** Q205 says "the field in insert/"; Q135 (a) says "M0-a-05's
insert/". The code says otherwise, and this draft follows the code:

* The only kernel refusal that names a body in its text and that a stage reads is made by the TRANSACTION, at commit,
  in `plat/packages/kernel/src/tx/tx.ts` `roleProblems` → `run` → `reject` — M0-a-06's owns (`plat/packages/kernel/src/tx/`).
  insertChain's refusals never name a body (§1.1 (e)).
* The read-only split plan Q135 (a) asks for ALREADY EXISTS and is public: `planSplitThrough` in
  `insert/splitThrough.ts` (M0-a-04's file), re-exported by `insert/index.ts` and the barrel, callable outside any batch
  on the shell `insertTx` (`insert/classes.ts`, M0-a-04's). It plans ONE split on the arena as it stands. The gate plan is
  a SEQUENCE whose later splits read the earlier ones (§1.3 (c)); a faithful plan that commits nothing for a sequence is
  a write-and-undo — a dry run — and only `tx/` can open and undo a batch frame (`open`, `markBatch`, `undoBatch`:
  M0-a-06's), with the façade (`facade/`, M0-a-16's) to hand it to a stage.

So the round has **no M0-a-05 leg** and need not wait for the router round or the a-05 residual round. Its kernel leg
is **M0-a-06 S11**, gated on M0-a-06 S10's landing (the RQ2 round's second leg, child ED, edits `tx/`). See Q1 in §4.

## 1. Findings — what the code does today

### 1.1 Every place a kernel refusal names a body in its text

Census by grep of every template naming a role, an entity or a key over `plat/packages/kernel/src` (on both refs),
then each hit read to see whether it is a REFUSAL (a `KernelResult` failure a caller receives) or a `check` (a throw).

(a) **The transaction's role-consistency rows — the one a stage reads.** `tx/tx.ts` `roleProblems` (:434–:464):

    if (branch) out.push(`(${k.role}, ${k.entity}) branches: a linear role forms simple chains or rings (§3.10 role consistency)`);
    if (declared !== null && parts > declared) out.push(`(${k.role}, ${k.entity}) lies in ${parts} parts, more than the ${declared} it declares (§3.10 role consistency; split it by rekey first, §3.4)`);

  run over the batch's role keys (`k: RoleKey` = `{ role, entity, ordinal }`, `types/refs.ts`) for the linear edge
  roles of `LINEAR_PARTS` (`way, wall, tunnel, gallery, rim, chamber_wall, deck, shore, bank, margin, border`). `run`
  (:628, :643): `const problems = [...roleProblems(t, provisional.roles), ...levelProblems(t), ...clearanceProblems(t)];`
  … `if (problems.length > 0) return reject(t, 'E_INVARIANT', problems[0]);`. `reject` (:141) builds
  `err<T>(code, detail)` — code and text only. **The kinds of body a batch refusal names: a linear chain's role key —
  a shore, a bank, a way, a wall (an enceinte), the margin, … — and only these.** Observed in pins: `(shore,
  water:river:0) branches` (site/test/water/slow-rings.test.ts:11, :191), `(wall, enceinte:2) branches`
  (testkit/test/edge/repins.test.ts:50, layout/test/growth/s5ab/q173.test.ts:59, bench/test/site/fold.test.ts:481),
  `(way, way:c1) branches` (kernel/test/insert/step3-5/reentry.test.ts:306), `lies in 2 parts`
  (kernel/test/gate/roles.test.ts:84).
(b) **The invariant suite's batch rows** (`invariants/batch.ts` `roleConsistency`, M0-a-14's): `(${k.role}, ${k.entity})
  branches: …` (:591), `… lies in ${parts} parts …` (:593), `the structural role (${k.role}, ${k.entity}) lost its last
  edge in a merge or absorption` (:573). They refuse a batch only through `TxEnv.invariants` (appended after the tx's own
  rows, so a branching key is always named by (a) first) or through a named `expect` check (`tx.ts` `failures` :403:
  `` `${e.name}: ${detail}` ``). Production wires neither: the runner's env is `{ ...options.env, rankOf, onCommit }`
  (layout/src/pipeline/runner.ts:288), and S1's spec has `expect: []` (site/src/water/faces.ts `spec`).
(c) **Whole-arena rows** (`invariants/whole.ts` :140–:202: knot keys, a vertex key `(role, entity, ordinal) finds n
  vertices`): stage-end check results (`checkStageEnd`), never a batch refusal.
(d) **Assertion texts** (`check`) naming keys — `arena/rows.ts:125` ``the element already carries (${info.name}, ${id …},
  ${ordinal})``, `tx/profile.ts`, `arr/kerb.ts:272`, … — throws, not refusals; but insertChain converts a throw whose
  message opens `insert: | arena: | index: ` into a refusal: `INVARIANT_THROW = /^(insert|arena|index): /` (insertChain.ts
  :120 on the router ref) and `return refuse({ code: 'E_INVARIANT', detail: e.message })` (:1872). Such a text can carry
  `(shore, <id>, 0)`; it is the assertion class (a programming error made a refusal, C-0215), not a body named.
(e) **insertChain's own refusals** name points, never a body: its texts are `insert: no route from (x, y) to (x, y) …`
  (:1322), `insert: ${problem}` (:1828), `REENTRY_DETAIL`, `RETRACE_DETAIL`; `passOn` (insert/classes.ts :167) re-makes
  `err(r.code, r.detail)`. The caller of insertChain holds the chain's roles already.
(f) `faces/merge.ts:61` names a ROLE (`the structural role ${info.name}`), not an entity.

### 1.2 Every reader of refusal text in plat/

Grep of `.exec(`, `.test(`, `.match(`, `includes`, `startsWith`, `indexOf`, `split`, `slice` over `detail` / `message` /
`why` in the sources (tests excluded unless named) of site/, layout/, bench/, testkit/, model/, tables/ and kernel/:

| # | Reader | What it reads | Whose text | Owner |
|---|---|---|---|---|
| R1 | `site/src/water/stage.ts` `runS1` :129 `const named = /\(shore, ([^)]+)\)/.exec(attempt.detail)?.[1];` | the refused body's id | the tx's (1.1 (a)) through `waterFaces`'s prefix `S1 water: ` | M0-e-03 — RL13's subject |
| R2 | `layout/src/pipeline/runner.ts` `expectVerdicts` :243 ``expect.findIndex((row) => r.detail.startsWith(`${row.name}: `))`` | which `expect` row refused the batch | the tx's `failures` (:403, :411–:415) | M0-x-02 — a message contract of the same class (names a ROW, not a body); not RL13's; noted for the session |
| R3 | `testkit/src/invariants/constructive.ts` :1050 `/role consistency|role-consistency|branches/.test(last.detail)` and :1059 `/runs along the boundary edge/.test(last.detail)` | a refusal's class in a test oracle | the tx's / the suite's / splitFace's | M0-k-04 — a test oracle; reads suite texts the field would not cover (1.1 (b)) |
| R4 | `testkit/src/invariants/primitives.ts` :340 `rm.detail.startsWith('index-freshness')` | a note's word | the suite's row name | M0-k-04 — a note, test-side |
| R5 | `site/src/water/stage.ts` :72, :78 `why.indexOf(KERNEL_RING)`, `f.why.startsWith(PART_DROPPED)` | its own fallback texts | the stage's own (polygons.ts `KERNEL_RING`, `PART_DROPPED`) | M0-e-03 — internal, not a kernel contract |
| R6 | kernel-internal: `arr/kerb.ts:1449` `r.detail.startsWith(NO_ROUTE)`; insertChain `isBoundRefusal` (:760 `r.detail.includes(BOUND_DETAIL)`), :1197 `=== REENTRY_DETAIL`, :1202 `startsWith(RETRACE_DETAIL)`, :1872 `INVARIANT_THROW.test(e.message)`; `io/types.ts:39` `startsWith(`${CORRUPT_CACHE}: `)`; `io/decode.ts:268` | the kernel's own constants | inside the kernel | not cross-package |
| R7 | display only: `testkit/src/edge/observe.ts:56`, `ep01.ts:344`, `rows.ts:74, :78, :226, :288, :412` (`detail.slice(0, 160)`) | quote, never parse | — | M0-x-06 — no contract |

R1 is the only cross-package reader that parses a body out of a kernel text. R2 is the only other cross-package
reader that parses kernel text at all; it is outside both rulings (Q9 in §4).

### 1.3 The gate plan's rejected batch

(a) **How it is made.** `layout/src/growth/boundary.ts` `traceStage` (:512–:523):

    const probe = kernel.tx(l1Spec(arena, STAGES.S5), (o) => {
      const r = placeGateVertices(kernel, arena, o, crossings, outline, wet);
      if (!r.ok) return r;
      plan = r.value;
      return err('E_INVARIANT', 'S5a: the gate plan (a batch always rejected)');
    });

  The kernel's `tx` → `run` → `if (!r.ok) return reject(t, r.code, r.detail);` (tx.ts :600) → `undoBatch` (the frames
  of M0-a-06 S9): the arena, its index, its slot counters and its version come back as they were. The plan is used
  (`planned.placed`, `.along`, `.decks`) to build the outline and the gate sites; then the trace's one armed batch
  re-makes the splits in `withinTraceBatch`'s `before` (:552–:557) and refuses `S5a: the gate vertex of crossing i landed
  at (…), not where it was planned (…)` if any moved.
(b) **What it costs** — run twice per walled stage k ≥ 2 (once in the rejected batch, once in the trace's): the batch
  open and its undo (`open`: `markBatch`, `beginIndexBatch`; `reject`: `undoBatch`), and inside
  `placeGateVertices` per crossing `kernel.plat`, `kernel.resolve({ role: 'way', entity })`, the nearest-edge and
  nearest-vertex scans, `decksAt` ×2, the water test, and for a crossing that is no existing vertex and no bridgehead
  `kernel.geom.splitThrough(o, best, c.at)` = `planSplitThrough` (snap, `insert.points`, attraction, `placePoint`'s
  candidates and index queries) then `applySplitPlan` (the writes, the index items, the journal) — and the writes are
  undone. `waterRings` is computed once (`wet`) and read by both.
(c) **Why the plan is a sequence.** `placeGateVertices` (:635–:705) works crossing by crossing on the open overlay, each
  reading the arena as the earlier splits left it: `kernel.resolve` of the way returns the sub-edges an earlier split
  made; the nearest-vertex snap (`vtxD <= 4 * TOUCH_CM * TOUCH_CM`) sees an earlier gate's new vertex; and
  `planSplitThrough` (splitThrough.ts :193 on the router ref) reads `routeRun(p, at)` — a same-level split "cuts the run
  in two (§3.3)" (`applySplitPlan`), so a later crossing on the same way edge gets a different run A–B, a different foot
  `footOnSegment(X[A], Y[A], X[B], Y[B], …)` and a different `placePoint` candidate set; `placePoint`'s clearance (iii)
  queries the index within `attractCm`, which holds an earlier split's vertex. Two crossings depend iff they lie on one
  way edge, or within the placement's reach (attractCm + minEdge, plus 2·TOUCH_CM for the snap) of each other. Hence a
  per-crossing read-only plan (`planSplitThrough` on an `insertTx` shell) is exact only when no two crossings depend.
(d) **Where the receipts count it.** Three watchers wrap `kernel.tx`:
  * `bench/src/site/compose.ts` `watchedKernel` (:104–:140, M0-e-06): `cap.batches.push({ stage, …, committed: rec !==
    null, code: r.ok ? null : r.code, counts: countsOf(seen), … })`; `receipts.ts` `runRecord` (:969–:977) folds them
    into `kernelBatches` and `batches[stage] = { committed, refused, maxShare }` (`else if (b.code !== null) row.refused
    += 1;`); `report.ts:471` feeds refused batches' counts into `stageWork` (`b.committed || b.code !== null`);
    `anchor.ts` `chargedWork` (:103) sums every batch's counts — the canary's choice — and `recordDigest` hashes the
    whole record. Committed summary `plat/docs/build/summaries/M0-e-06.json`: S5 `batches` per group `{ committed: 1603,
    refused: 201 }`, `{ 1589, 201 }`, `{ 1526, 199 }`, `{ 1533, 200 }` against stage outcomes S5 refused 1, 2, 3, 3 — so
    ≈ 198–200 of each group's refused S5 batches are the plan (one per seed with a walled stage k ≥ 2).
  * `layout/src/pipeline/base.ts` `watched` (:249–:258, M0-x-04): `onBatch({ …, committed: r.ok && r.value.record !==
    null })` — the plan shows as an uncommitted S5a batch. Readers: `bench/src/determinism/spike.ts` (:166, committed
    only — unaffected) and `layout/test/pipeline/base/run.test.ts` (:142–:166: forms, sub-stage order, k = 1's commits —
    no count of S5a's k ≥ 2 batches).
  * `testkit/src/edge/plant.ts` `plantKernel` (:121–:137, M0-x-06): `log.batches.push(…)`; EP-01 reads `plant.batch`,
    `plant.after.filter((a) => a.committed)` (ep01.ts :124–:125) and `plant.batches` for S6 only (:297) — the S5a cells do
    not read the plan.
  * The runner's door (`runner.ts`, M0-x-02) reports committed batches' work and E_WORK_LIMIT hits; an E_INVARIANT
    batch enters the report only through `expectVerdicts` (S5's expect is empty), so the GenerationReport never counted
    the plan.
  * c-04's own pin of the sequence: `layout/test/growth/s5ab/span.test.ts` (:383–:400) 'the trace makes one callback
    batch and the strips one, after the gate plan; nothing else is opened' — `expect(seen).toEqual([{ level: 1, form:
    'callback', ok: false, detail: 'S5a: the gate plan (a batch always rejected)' }, …])`.

### 1.4 Where the consumers stand

* **The water stage** (`site/src/water/stage.ts` `runS1` :118–:141): on an E_INVARIANT attempt it retries the slow
  rings when a fast ring stood, then names the refused body: an estuary → `mouth = 'none'`, dropped `refused`; another
  body at index > 0 → dropped `refused`, the water re-run; the river (index 0) → `riverRefused`, the stage's refusal
  `… no further rung — ${attempt.detail}`; no name → stop. The detail it parses is `S1 water: ${r.detail}`
  (`faces.ts` `waterFaces` :213–:214), whose `r` is the façade's `k.tx` result. **No e-03 test reaches the naming branch
  by a body-naming refusal**: the two planted refusals (`slow-rings.test.ts` `refusingFirstRiverShore` :236–:250, text
  `'role consistency: (shore, water:river:0) branches (planted)'`) take the fast → slow retry (:125–:127) and the naming
  line is not reached. The naming branch IS exercised by M0-x-06's EP-01/S1 cells (`self-touching`: 9 laddered, 1
  refused-safe in `M0-x-06.json`) and by the site families.
* **The trace**: `traceStage` is M0-c-04's (`growth/boundary.ts`); the strategy (`enceinte/trace.ts` `traceBase`, M0-c-02's)
  reads the arena (`waterRings`, `arenaVertices`, `crossWater`) and computes its whole line BEFORE `k.tx` (:307), so the
  gate points must exist before its batch opens — C-0285 (2), C-0452 (10).

## 2. The two designs

### 2.1 RL13 — the refusal names its body

**Recommended shape.**

* `plat/packages/kernel/src/tx/types.ts` (M0-a-06) declares, beside `Committed`:

      /** A batch's result (§3.3): KernelResult's two arms; the refusal arm carries, when a §3.10 role-consistency row of
       *  the batch's own commit refused it, the role key that row names — the chain the detail prints as
       *  '(role, entity)' (RL13). Absent on every other refusal. */
      export type TxResult<T> =
        | Extract<KernelResult<T>, { ok: true }>
        | (Extract<KernelResult<T>, { ok: false }> & { readonly refused?: RoleKey });

  read BY PATH by the façade (no line in `tx/index.ts` or the barrel: J263 Q1's freeze kept to the letter; the public
  surface that changes is the return type of `Kernel.tx`). `RoleKey` is `types/refs.ts`'s (already exported).
* `tx/tx.ts`: `roleProblems` returns `{ detail: string; key: RoleKey }[]` (each detail BYTE-IDENTICAL); `run` keeps
  `problems` in the same order (its other sources wrapped `{ detail }`), and the commit's refusal becomes `reject(t,
  'E_INVARIANT', problems[0].detail, problems[0].key)`; `reject` gains the optional key and returns `{ ok: false, code,
  detail, refused: key }` when one is given, else exactly `err(code, detail)` (no `refused` property at all — so every
  existing `toEqual` on a refusal object holds). `tx()`'s return type is `TxResult<Committed<…>>`. The op path (:592),
  the callback path (:600), work limits, `failures`, the repair path, `levelProblems`, `clearanceProblems`, the index
  rows and `env.invariants` set NO key. Pass-through of a key an op or callback returned: none (Q5).
* `facade/types.ts` (M0-a-16; cross-item scope of the a-06 leg): `tx<T>(…)`'s return type `TxResult<Committed<T |
  KernelResult<unknown>[]>>`, `TxResult` imported by path; `facade/kernel.ts` `runTx`'s two annotations likewise (type
  only; `stamp` returns its argument, so the field already survives at run time).
* Every wrapper of `kernel.tx` (base.ts `watched`, compose.ts `watchedKernel`, plant.ts, boundary.ts `withinTraceBatch`,
  span.test.ts's `tx`) returns the kernel's object, so the field passes through them; their declared return types
  (`KernelResult<Committed<…>>`) stay assignable to `Kernel['tx']` (the added property is optional) — compile-checked by
  the leg's build, never assumed.
* **Byte-identical:** every code and detail text (J263 Q6); every committed outcome, digest, golden and record (no
  committed path is touched); every refusal object that is not a commit-time role-consistency refusal (no new property).

**Alternatives weighed.**
* (N) `refused?: RoleKey` on `KernelResult`'s failure arm in `num/result.ts` (M0-a-01). One line, no façade edit — but
  it changes §3.1's universal result for one producer, and every `err`/`passOn` re-wrap (insert/classes.ts `passOn`,
  every stage) silently drops it: a field that looks universal and is set in one place. Not taken; Q4.
* A separate channel (`kernel.lastRefusal()`): state beside the result, order-dependent. Rejected.
* A structured field on insertChain's refusals ("the refused chain's rows", queue L26's wording): insertChain never names
  a body (1.1 (e)) and its caller holds the roles; the refusal the stage parses is the commit's. Not taken.
* The suite's rows (1.1 (b)) and named `expect` checks carrying the key: they return strings through `TxEnv.invariants`
  / `TxEnv.checks` (M0-a-14's and the env's contracts) and production wires neither. Not taken; Q11.

**The consumer (M0-e-03).** `water/faces.ts` `waterFaces` returns its refusal with the batch's `refused` kept
(`{ ...err(r.code, `S1 water: ${r.detail}`), refused: r.refused }` when present); `stage.ts`'s `Attempt` failure arm
gains `refused?: RoleKey`, carried by `water()`; the loop reads

    const named = attempt.refused?.role === 'shore' ? attempt.refused.entity : undefined;

and the regex, with its comment ("a message contract with @plat/kernel"), goes. **Shore only** keeps the reader's
behaviour exactly: the regex matched `(shore, …)` and nothing else (Q6 on banks).

**NO-SHIFT argument (to be SHOWN, §2.3).** For every attempt the loop reads, the regex's name equals the field's: the
detail of a commit-time role refusal is `S1 water: ` + `problems[0]`, which prints exactly one `(role, entity)` — the
key the field carries; a text with no `(shore, ` gives `undefined` both ways (level, clearance, index rows; the
stage's own texts; insertChain's texts); the assertion class (1.1 (d)) prints `(shore, <id>, 0)`, whose regex capture
`<id>, 0` is no body id (`at = -1`, stop) while the field is absent (`at = -1`, stop) — the same branch; the riverPolygon
attempt (stage.ts :70–:74) carries no field and stops through `attempt.riverPolygon === true` either way. Ids holding
`)` would differ — none does (`water:<kind>:<n>`).

**What moves in other items' tests:** nothing by design. e-03's planted refusals (`slow-rings.test.ts`
`refusingFirstRiverShore`) keep their texts and gain nothing — they plant at `insertChain`, a callback refusal that
carries no key, and do not reach the naming line (1.4). Grep-confirmed: no test `toEqual`s a commit-time role
refusal object (the hits for `toEqual({ ok: false, code: 'E_INVARIANT'` are `arr/…/booleans.test.ts:404` and
`layout/test/pipeline/base/table.test.ts:406, :409`, neither a tx refusal) — re-confirmed by the leg's RELATED.

### 2.2 RL15 — the gate plan commits nothing and is no batch

**Seam (a) checked against the code.** Its intent holds (the kernel gives a plan that commits nothing; the strategy
untouched; no watcher edited); its location does not:
* (a-1) **as worded — a read-only split plan from insert/** — already exists: `planSplitThrough(insertTx(p, 1, { key
  }), best, c.at)` reads and writes nothing (`placePoint` "writes nothing: its result is a plan", placement.ts header).
  No kernel change would be needed — but it plans one split on the untouched arena, and the gate plan is a sequence
  (1.3 (c)): wherever two crossings depend, the trace batch's re-made splits land elsewhere and the trace is REFUSED
  (`… not where it was planned …`) — a new refusal of lawful input (J264 (2)), unless c-04 adds a dependence test and
  falls back to today's rejected batch (a residual of the very class). It also puts an `insertTx` shell over the LIVE
  arena in production code — a shell whose doc reads "what the tests and a scratch-arena op hand the writers" — and the
  next reader may hand it a writer.
* (a-2) **RECOMMENDED — the kernel's dry run.** The kernel already undoes a batch exactly (S9's frames: "the undo log
  replaces the before-image for every op savepoint and dry run, and for the batch itself", tx/frames.ts header). Expose
  it: a callback on an open overlay, always undone, never a batch.

**Recommended shape.**

* `tx/tx.ts` (M0-a-06) exports, beside `tx` and read BY PATH by the façade (no index or barrel line):

      /** A dry run (RL15; §3.3's frames): `fn` on an open overlay of the arena at `spec.level`, charged against
       *  `spec.workLimit`, then EVERYTHING undone — whatever `fn` returned — to the frame `open` marked: the arena, its
       *  index, its slot counters and its version as they were, the restore generation unmoved, no commit row run, no
       *  commit record, `env.onCommit` never called. Returns `fn`'s result (E_WORK_LIMIT when the work passed the limit).
       *  Callback form only, `spec.expect` empty (assertions); a throw is undone and rethrown as `tx` rethrows it. */
      export function dryRun<T>(p: Plat, spec: KernelTx, fn: (overlay: Overlay) => KernelResult<T>, env: TxEnv = {}): KernelResult<T>

  built from `open` (its checks: one batch per arena — `check(indexOf(p).log === null, 'another batch is open on this
  arena')` —, the level, the key, the work limit), `overWork` / `workDetail`, `undoBatch` and `rethrown` (its form
  `'dry'`); ~20 lines.
* `facade/types.ts` / `facade/kernel.ts` (M0-a-16, cross-item scope): `Kernel` gains the member
  `dryRun<T>(tx: KernelTx, fn: (overlay: Overlay) => KernelResult<T>): KernelResult<T>`; `kernel.ts` builds it as `runTx`
  builds `tx` — the overlay registered as this kernel's open transaction (`within`, so `geom` writers accept it inside),
  the frame popped after, and every value stamped `{ key, version: -1 }` as a rejected batch's are (C-0220 (3)). It is
  NOT `tx`: no `tx` watcher sees it (base.ts `watched`, compose.ts `watchedKernel`, plant.ts, the runner's door spread
  `...kernel` and wrap `tx` alone).
* `growth/boundary.ts` `traceStage` (M0-c-04): the probe becomes

      const probe = kernel.dryRun(l1Spec(arena, STAGES.S5), (o) => placeGateVertices(kernel, arena, o, crossings, outline, wet));
      if (!probe.ok) return err(probe.code, `S5a: the gate vertices could not be put on their ways: ${probe.detail}`);
      const planned: GatePlan = probe.value;

  — the refusal text `S5a: the gate vertices could not be put on their ways: <detail>` unchanged for every refusal
  `placeGateVertices` makes (its `'the plan was not made'` branch had no reachable case: the callback always returned
  `err` after setting `plan`); the trace batch's re-made splits and its `… not where it was planned …` check stay as
  the backstop. One declared edge: today a plan whose batch ended E_WORK_LIMIT AFTER `placeGateVertices` returned ok
  still yields the plan (`plan` was set; :523 tests `plan === null`); under the dry run that run refuses S5a. With
  `l1Spec`'s `workLimit: 10_000_000` (enceinte/trace.ts :112) no registered input comes near it; leg 3 says so and pins
  nothing for it. `withinTraceBatch`'s seam kernel must also refuse a `dryRun` through it (the seam arms exactly one
  callback batch, C-0452 (14)) — or pass it: Q8.
* **Byte-identical:** every committed outcome — the same `placeGateVertices` on the same overlay, the same undo, the same
  slot counters after (the rejected batch undid exactly as the dry run undoes), so the trace batch allocates the same
  slots; the arena version (a rejected batch never moved it); every digest, golden and refusal text and code; the
  refusal census (the plan's refusal was never a stage refusal).

**What moves — and only this.**
1. c-04's `span.test.ts` (:396): the sequence a watching `tx` sees loses its first entry (the plan) — the leg's pin,
   re-pinned by its own item.
2. In M0-e-06's records at the session's next re-run of the site summary (no e-06 source changes): per run record
   `kernelBatches` loses one row per walled stage k ≥ 2 that reached the trace; `batches.S5.refused` falls by the same
   number (the committed summary: ≈ 198–200 per group, to the 1–3 real S5 refusals); `stageWork.S5`'s blocks for the
   counters the plan charged (`insert.points`, `insert.attractQueries`, `insert.placementCandidates` — the leg measures
   which) lose those samples; `chargedWork` falls for every record with a walled stage, so the canary's record digest
   moves and its CHOICE may move. `bench/test/site/summary.test.ts`'s canary is already a declared red of the head
   (J772 (7)) until that re-run.
3. At that re-run, M0-f-03b's `bench/src/worklimits/fit.ts` reads S5's batch population (committed + refused) and its
   blocks from `M0-e-06.json`: `bench/test/worklimits/fit.test.ts`'s pins against the committed summaries are re-read
   then (the session's seam), not in this round.
4. Nothing else by reading: base.ts's `BaseBatch` stream (x-04's run.test.ts asserts no S5a k ≥ 2 count), the
   determinism spike (committed only), x-06's EP-01 S5a cells (they read the fired batch and the committed ones after;
   `M0-x-06.json` holds no batch count), the runner's GenerationReport. Each confirmed by the legs' RELATED@1000; any
   other red is a seam for the session, never edited by a leg.

**What does NOT move:** the planning work is still spent twice (dry run + trace batch); only its counting stops. That
half of Q135 is a cost, routed to Q129's re-profile of S5 (Q3 in §4).

**Alternatives weighed.**
* (a-1) above — no kernel change, inexact on dependent crossings; a fallback keeps the class alive. Second choice if
  the session will not widen the façade: then c-04 alone, with an exact dependence test and a measured fallback count.
* (b) c-02's TraceOptions prelude hook (C-0285's own note): the only seam that also removes the double work, but the
  strategy would compute its line INSIDE its batch after the gate splits — `arenaVertices` and `crossWater` then see the
  gate vertices (trace.ts :148–:154), a behaviour shift of every walled trace, and the whole of `traceBase`'s pre-batch
  work moves into a callback of c-02's file. Not a small additive contract.
* (c) watchers skip a marked batch: three watchers (x-04, e-06, x-06) and the runner learn a mark; the work is still
  spent and still counted wherever a watcher forgets the mark; c-04 S4 withdrew its in-owns form of it. Rejected.
* Reusing the dry run's plans in the trace batch (`applySplitPlan`, public) to save the second search: bypasses the
  façade's writer door (C-0290) and needs version-checked plans. Out of this round (Q3).

### 2.3 How each NO-SHIFT is shown

* RL13, kernel: every existing message pin green unchanged (reentry.test.ts:306, gate/roles.test.ts:84, q173.test.ts:59,
  repins.test.ts:46/:50, fold.test.ts:481 …); B-FUZZ/register goldens and level digests identical before/after on the
  leg's own registered families (the S9 practice: the leg's mirror at the base vs the leg's tree).
* RL13, consumer: before/after on the registered S1 families — x-06's EP-01/S1 cells (its five kinds × 10 seeds: the
  handling counts and every refusal's code and detail), e-03's exit-bar seeds, and a declared S1 sample of the site
  fixtures (relief-60 and relief-3000, default, seeds 1–40: per seed the S1 report's `dropped`, `retried`, `fallbacks`
  and the S1 arena's level digests): identical. Plus the consumer-side EQUIVALENCE ORACLE (a test keeping the old regex
  as the oracle): over those runs, every water-batch refusal through a watching façade has
  `regexName(detail) === (refused?.role === 'shore' ? refused.entity : undefined)`.
* RL15: before/after on c-04's registered families (`fixtureRun` CITY seeds and the s5ab folder): every S5 output, the
  arena's model root and version at S5's end, the S5 refusal census — identical; and the watched batch sequence shows
  exactly one uncommitted batch fewer per walled stage k ≥ 2, nothing else changed (the per-batch `{ level, form, ok,
  detail }` list with the plan's entries removed equals the new list).

## 3. The legs (a merged round, J443: one tree, one branch, each leg its own build, check, LANDED line and record)

| Leg | Item, round | Write scope | Lines (one sentence each) | Checker |
|---|---|---|---|---|
| 1 | **M0-a-06 S11** (specs.json's highest a-06 round is S10, the lane log's s9; S10 is the RQ2 round's second leg in flight) | own: `kernel/src/tx/`, `kernel/test/tx/`; CROSS-ITEM: `kernel/src/facade/types.ts` (the `tx` member's return type, the new `dryRun` member, their imports), `kernel/src/facade/kernel.ts` (`runTx`'s two annotations; the `dryRun` member beside `tx`) | L1 RL13: the commit's role-consistency refusal carries `refused: RoleKey` (TxResult), texts byte-identical. L2 RL15: `dryRun` in tx.ts and `Kernel.dryRun` on the façade. L3 the leg's NO-SHIFT shown and the seam list written. | STRONGER (kernel source) |
| 2 | **M0-e-03 S6** (highest S5 in specs.json; s4 in the lane log) | own: `site/src/water/`, `site/test/water/` | L1 RL13's reader: the field, carried through `waterFaces`, replaces the regex; pins on the consumer's side and the equivalence oracle; NO-SHIFT shown. | STRONGER (stage source) |
| 3 | **M0-c-04 S8** (highest S7 in specs.json; s6 in the lane log) | own: `layout/src/growth/boundary.ts`, `mainRoads.ts` (comment only), `layout/test/growth/s5ab/` | L1 RL15's consumer: the gate plan by `kernel.dryRun`; span.test.ts re-pinned; the choices row superseding C-0285 (2)'s and C-0452 (10)'s planning sentence. L2 the declared receipt shift measured and named, outcomes NO-SHIFT shown. | STRONGER (stage source) |

Order: leg 1 first; legs 2 and 3 each need leg 1 and nothing of each other (disjoint files, different packages) — the
merged-round rule runs them in the order 2 → 3 on one tree, but either order is sound and a failure of one need not
hold the other (Q2). No leg for M0-a-05 (no file), M0-a-16 (cross-item scope of leg 1; Q7), M0-x-02, M0-x-04, M0-x-06,
M0-e-06 (no source change; their tests are confirmed by RELATED; the e-06 summary is the session's batched re-run,
J648 (1)), M0-f-03b (its pins re-read at that re-run), M0-c-02 (seam (b) not taken).

## 4. Open questions for the session's ruling

1. **The round's owner and gate.** No file of M0-a-05's is touched. Recommend: name it the contracts round of
   M0-a-06 (leg 1 = S11), gated on M0-a-06 S10's landing (child ED), not on the router round, the a-05 residual round or
   RQ2's third leg. Hangs on it: when it can launch (sooner), and whether the queue rows' "a-05" wording is corrected.
2. **Merged or split.** Recommend one merged round of three legs (1 → 2 → 3). Alternative: leg 1 alone, then legs 2
   and 3 as two one-leg rounds in parallel children. Hangs on it: wall time, and whether a stage failure holds the
   other stage's leg.
3. **The double work.** Recommend accept it as a named cost of S5 (a few splits per walled stage), routed to Q129's
   re-profile; Q135 closes on the counting. Hangs on it: whether Q135 closes whole or stays open in part.
4. **RL13's field home.** Recommend the batch's result type (`TxResult`, tx/types.ts, by path) over §3.1's
   `KernelResult` (num/result.ts). Hangs on it: a-01 in or out of the round; the design text amended at §3.3 vs §3.1.
5. **Pass-through.** Recommend the tx does NOT carry a `refused` an op or callback returned (only its own commit rows
   set it). Hangs on it: one mutant fewer; e-03's planted tests plant at `kernel.tx`, not at insertChain.
6. **The reader's roles.** Recommend `shore` only (NO-SHIFT). A `(bank, X)` refusal names body X too; reading it would
   drop X where the stage now stops — a behaviour change, for e-03's owner later if a census finds one.
7. **The façade by cross-item scope.** Recommend leg 1 writes the two façade files under a stated scope (M0-a-06 S10's
   io/ precedent), the session re-landing M0-a-16's record. Alternative: an M0-a-16 leg between 1 and 2. Hangs on it:
   one build/check cycle.
8. **`dryRun` through S5a's seam kernel.** Recommend `withinTraceBatch`'s kernel refuses `dryRun` as it refuses a second
   `tx` (C-0452 (14)) — a dry run there would bypass nothing (it commits nothing) but the seam stays exact. Hangs on it:
   one line and one pin in leg 3.
9. **R2 — the runner's `expectVerdicts`** reads the tx's text (`<row name>: `) to name the failed `expect` row: the same
   class of contract as L26, outside both rulings. Recommend a queue row (a structured `row` on the expect refusal,
   M0-a-06 + M0-x-02), not this round.
10. **The site summary.** Recommend the contracts round declares the S5 batch-count shift (2.2 (2)) and the session's
    batched re-run (J648 (1)) re-anchors after it; leg 3 measures it on a declared sample so the re-run's numbers are
    predicted. Hangs on it: whether the canary red's reason is re-worded.
11. **The suite's and the checks' texts** (1.1 (b), R3): recommend no field there now (not wired in production).

## 5. Weak points (attack these first)

1. **The dependence claim (1.3 (c)) is read, not measured.** If no two crossings of the registered families share a way
   edge or come within reach, (a-1) — no kernel change at all — is exact there, and the reviewer should say whether a
   new façade member is worth more than a dependence test with a fallback that never fires. Probe: count, over the
   site families, the crossings per stage that share a way edge or lie within 2·attractCm + minEdge of another.
2. **`dryRun` widens the API beyond "a split plan".** Any stage could explore with it, and its work reaches no receipt or
   work limit of the stage (only `spec.workLimit` inside). Is that a hole in J264's census or the work-limit laws? A
   narrower member (`planSplits` taking the gate logic as a callback is the same thing) does not exist.
3. **Type assignability** of the five `tx` wrappers to the widened `Kernel['tx']` is reasoned, not compiled.
4. **The NO-SHIFT of the reader** rests on "problems[0] prints exactly one key" and on the riverPolygon branch; a
   reviewer should hunt a text where the regex finds a `(shore, ` that is not problems[0]'s key (e.g. a level or
   clearance problem quoting a row by name — I found none: they print `kind/entity/ordinal` numbers).
5. **The e-06 numbers** (≈ 198–200 plan batches per group) are inferred from the summary's totals, not counted.
6. **No e-03 test reaches the naming branch today** (by my grep); if one does by a path I missed, its pins move.
7. **Ownership of the façade edit** by cross-item scope is a judgment; an a-16 checker may disagree with a member added
   by another item's leg.

## 6. Corrections after the review (J803)

The sections above stand as first written. Where the review showed them wrong, these lines correct them. The entries follow rulings-final.md.

1. **§2.1, the assertion-class sentence, was wrong** (review F4). The estuary branch is tested BEFORE `findIndex`. So on `… already carries (shore, water:estuary:0, 0)` the regex drops the estuary under the non-id `water:estuary:0, 0`, while the field stops the stage: the two disagree. The NO-SHIFT claim is narrowed to refusals made by the transaction's own rows and to texts with no `(shore, `. The estuary case is a declared behaviour change, pinned by e-03's P6 (J803 R6). The same review finding adds a second producer the draft omitted: suite rows reaching a batch through `TxEnv.invariants` (a-06's P3).
2. **§1.3 (d) omitted two watchers of `tx`** (review F6): `bench/src/fusion/runs.ts` `watchedKernel` (M0-c-06, off by default) and `bench/src/determinism/spike.ts` (M0-d-09, committed batches only). Both are now named in c-04 S8 LINE 2 and as latent readers (J803 R10).
3. **"The naming branch IS exercised … by the site families" (§1.4) is not borne out** (review F4). The 32 test-size and 6 CITY derivations met zero water-batch refusals. Only the planted EP-01/S1 cells reach the naming line: one visit, and 10 of 10 named refusals equal between the regex and the field (`review/logs/rl13-*.summary.txt`).
4. **Weak point 1 now has a measured answer** (review F3): no registered input has dependent crossings. Across 78 plans and 496 crossings the closest pair is 16.9 m apart, and the per-split plan equals the sequence every time (`review/logs/dep-*.summary.txt`). The dry run stands as the only design exact by construction on every lawful input; today its gain is in the receipts (J803 R3).
5. **Q9 is reversed** (review F9; J803 R9). The runner's `expectVerdicts` has no production caller, so this round adds no fourth leg and no field on it; the matter becomes a queue row. R2 (§1.2) is a message contract with no production reader today.
6. Also corrected by the review and ruled: P7 dropped and P5 reworded (F7); P1's oracle is `bits(p)` plus `kerbCensus(p)` and `bandClosings(p)` (F7, F8; J803 R13); values the services read inside a dry run are re-stamped −1 (F7; J803 R12); the reflection-test assertion is leg 1's declared shift (F1; J803 R7); a leg launches only if the leg before it PASSED (F10; J803 R2); Q181's round is M0-a-06 S12 (F11; J803 R1).
