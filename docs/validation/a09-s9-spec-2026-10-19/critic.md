# a09-s9-spec / critic — the refutation of spec-a09-s9.json (M0-a-09 round S9: Q18 + Q19 + Q84)

Seat `a09-s9-spec/critic` (Fable 5.1 / high), 2026-10-19 02:26–02:40. Read whole: spec-a09-s9.json, spec-a09-s9.md,
read-code.md, read-records.md, spec-a09-s6-model.json; then the code the spec names, re-read on this tree (branch
claude/great-galileo-b4mzbq). No test, build or git was run; nothing was measured. Tags: [OBSERVED] this seat checked the
repository; [STATED] the cited text says it; [INFERRED] this seat's reading. `K` = plat/packages/kernel/src/, `KT` =
plat/packages/kernel/test/arr/bands/, `TK` = plat/packages/testkit/test/kernel/arr-bands/.

**Verdict: FIX-FIRST** — the construction is implementable inside the owns with the kernel's exported API as it stands
(§2), every API it names exists (§1, one stale line cite), the perf pin is machine-independent (§3), Q84's pin is in
the right file (§5), the JSON is valid and in the model's form (§7); but two things only the spec can say are missing
(§6): the DECLARED SHIFT of kerb(F) that the real-arena attractors cause (and what the builder does with another
item's golden that moves), and a Q19 bar (≥ 0.95 on the random networks) set as a red test without a baseline. Both are
one-paragraph fixes (gaps G1, G2). Six minor gaps follow (G3–G8).

## 1 Every API, file, function and line the spec names — [OBSERVED] on this tree

| cited | found | status |
| --- | --- | --- |
| kerb.ts:564–568 `kerb(tx: InsertTx, …)` → `readKerb(tx.plat, …)` | :564 export, :565 readKerb(tx.plat…), :567 ok(…) | ✓ |
| kerb.ts:532–558 `readKerb(p: Plat, …)` | :532 signature; :535 `f.base ?? kerbOf`; :542 clearOf guard; :556–557 return | ✓ |
| kerb.ts:492–501 `kerbOf` → `overlayRegion([rings, parts], w0≠0 ∧ w1=0)` at :498 | :492 export; :498 overlayRegion | ✓ |
| kerb.ts:259–293 the J318 census, `kerbOf` at :287, C-0381 comment :292 | :259 `own` set from faceWalk; :287 `const base = kerbOf(rings, spines)`; :292 | ✓ |
| kerb.ts:442–455 `lessParts`, overlayRegion :452; :470 `clearOf`; :417 `kerbParts`; :508 `unspiked` | :442, :452, :470, :417, :508 | ✓ |
| kerb.ts imports (:49–57): faceWalk/rowsOn/outgoing from arena, InsertTx type, overlayRegion from winding | :49–57 | ✓ |
| winding.ts:112 `buildOverlay`; :156 createPlat; :157 attachIndex; :158 `insertTx(plat, 0)`; :162–176 frame; :179–190 per-segment insertChain; :185–188 E_DEGENERATE 'empty' → W_ATTRACTED; :607 dropStraight; :687 simpleLoops; :706 overlayRegion | all at the cited lines; createPlat is imported from `../arena/index.js` (:28–39) | ✓ |
| bandUnion.ts:523–545 `bandCore` (opSave :533, rollback :535); :553 `writeOutlines(t: OpenTx, …)`; :564–568 the re-read `readKerb(p, f, …)` at :565; :599 and :635 `insertChain(t, …)`; :117 `insideRings`; :173 `interiorPoint(p, level, c)` | all at the cited lines; bandUnion already imports opSave/rollback (:62), insertChain (:63), readKerb (:73) | ✓ |
| tx/state.ts:96 `openTx(o: Overlay): OpenTx` (throws on a non-open or closed tx); :91 `isOpenTx(o: object)` | :96, :91 | ✓ — note G6: the parameter is `Overlay`, not `InsertTx` |
| faces/common.ts:447 'Work charged stays charged'; :459 `opSave(t: OpenTx)`; :486 `rollback(t, s, refusal)` | :447, :459, :486; opSave records `indexWrites: t.indexLog.writes.length` and rollback cuts it (:479, :528) | ✓ |
| insert/classes.ts:132 `insertTx(plat, level, opts)`: key defaults to `plat.key` and is checked `sameKey` (:133–134), workLimit MAX_SAFE_INTEGER (:136), its own `warnings`/`journal` (:144–145); :154–158 `charge()`; :96 `InsertJournal.split` | :132–150, :154–158, :96 | ✓ |
| tx/tx.ts:124 `overWork` | :123–125 | ✓ |
| insert/insertChain.ts:112 `ChainInsert.placed`; :847 `insertChain`, :850 closed check, :852 `n = tx.level` | :112, :847, :850, :852 | ✓ |
| insert/stretch.ts:111 `chainJournal(tx)` (WeakMap per tx) | :108 WeakMap, :111 export | ✓ |
| index/index.ts:67 `pointLocate` re-export (query.ts:260 `pointLocate(p, key, level, at)`) | :67; query.ts:260 | ✓ |
| arena/roles.json:33 `invisible` (edge, structural false) | :33; `SCRATCH_ROLE = 'invisible'` winding.ts:55 | ✓ |
| attractVertex.ts:105 `planAttraction`; :118–126 `query(plat, tx.key, n, box, …)` nearest level ≤ n vertex within attractCm | :105, :118–126 | ✓ |
| bentCutFabric.ts:510–514 `kerbFace` (`kerb(this.o, …)` :512); :587–598 `kerbSeed(o: Overlay, …)` (:588); :1359 `workLimit: districtTxLimit(…)` (fn :1331) | all | ✓ |
| facade/kernel.ts:217–220 `kerb: (face) => batchValue(o, kerb(o, face, …))` | :217–220 | ✓ |
| planner.ts:103 (doc comment of `KerbFace`, no call) | :103–110 | ✓ (the spec says "planner.ts … change nothing") |
| KT corridor.test.ts:95–129 §13.2 (toEqual at :126); :228–296 random networks (`tally.exact ≥ ⌈cases/10⌉` at :296); :549–562 `kerbRead` (kerb at :555) | all | ✓ |
| KT vertexcontact.test.ts:106–216 J318 cases; :305 fusion fixture describe | :106; :305 | ✓ |
| KT bfuzz.test.ts:101–102 'the read-only service writes nothing' `expect(state(p)).toBe(b0)`; :96 `readKerb(o.plat, …)`; `state(p)` kernel/test/tx/support.ts:60 | :101–102, :96; :60 | ✓ |
| KT replay.ts:141–148 `replayKerb` (= readFace + kerbParts + replayOverlay); "replayCommit's form, :10–17" | `replayKerb` :141–148 ✓; **`replayCommit` is at :331** (its header :325–330; the module header's commit paragraph :11–19) — "a fresh copy of the arena" comes from `c.build()` (:334), the spec's builder-callback form | one stale cite → G4 |
| TK support.ts:69–77 `Harness` (no `invalid`); :90–92 `own`; :95 `judge`, :97 `own(ours)`, :100 keep 'ours invalid', :101 compareSplit; :112 `verdict`, :118 `expect(h.failures).toEqual([])`, :130 unattracted guard; :416 `oursCorridor`, :460 `warnings.push(...k.warnings)`; :628 `splitOf(ours.warnings)` | all; the spec's ":119" is :118 and ":89–92" is :90–92 (off by one, harmless) | ✓ |
| arr-booleans-buffers/harness.test.ts:82–96 (a-08's model pin: `[SQUARE, SQUARE, tri]`, `h.invalid`, verdict throws) | :82–98 | ✓ |
| checks/M0-a-08-s4.md:59 (N1 row) and :103 (Z26 row); M0-a-08-notes.md:402 (X16) | all | ✓ |
| profile-city-stages.md §0 (3) (:14), §3.3 (:238), §3.7 (:277), §4 A1 (:287) / A4 (:302), §5 rows 1/2/5 (:353/:354/:357), §6 (:377) | all | ✓ |
| hardening-inventory.md:2197 item 1; M0-spec-notes.md:63 N-52; KNOWN-ISSUES.md:29–30; M0-FIX-QUEUE.md:45/:46/:98 | all | ✓ |
| ids: "C-0386 and L-0580 exist today" | choices.md's highest row C-0386; CLEAN-ROOM.md's highest L-0580 → next free C-0387 / L-0581 | ✓ (the spec rightly says "the next free ids the seat finds") |
| kerb.ts cites C-0380 (:9, …) and C-0381 (:28, …) | ✓ |

No invented API: every function the dry-run uses is exported from a kernel module kerb.ts can import — `opSave`/`rollback`
(faces/common.ts:459/:486; bandUnion.ts:62 imports them already), `insertTx` (classes.ts:132), `insertChain`
(insertChain.ts:847), `openTx`/`isOpenTx` (state.ts:96/:91), `pointLocate` (index/index.ts:67), `dropStraight`/
`simpleLoops` (winding.ts:607/:687, both `export function`), `faceWalk`/`rowsOn`/`outgoing` (already imported :49).
`regionOf(t, face, faceLevel)` (faces/common.ts:97, M0-a-07's reader of a face's region at the batch's level) also exists
and is not named; optional.

## 2 Is the design implementable inside M0-a-09's owns with the tx API as it stands? — YES [OBSERVED], with one typing note

* **The shell inside a batch.** `insertTx(t.plat, t.level)` mints a shell whose `key` is `plat.key` (classes.ts:133 —
  the batch's key must equal it too, so `planAttraction`'s `query(plat, tx.key, n, …)` (attractVertex.ts:118) sees the
  same layer), `workLimit` MAX_SAFE_INTEGER (:136), its own `warnings` and `journal` (:144–145), `closed` unset.
  `insertChain(sh, …)` throws only on `closed === true` (insertChain.ts:850) and needs no `OpenTx` field. ✓
* **Undo.** The index log is the index's (`idx.log.writes.push`, index/spatial.ts:143), opened by `beginIndexBatch` at
  tx open (tx.ts:97) and the same object as `t.indexLog` (tx.ts:112), so the shell's index writes land in the batch's
  log and `rollback` cuts them to the saved length (common.ts:479/:528); `takeSavepoint` copies every table and the
  index's mutable state (savepoint.ts:152–198) and does NOT call `createPlat` (so the createPlat = 0 pin is sound);
  `restoreSavepoint` accepts an image taken inside the open batch (its log check, :222–227). The batch's `work`,
  `warnings`, `journal` and `chainJournal(t)` are untouched by the shell (its own objects; `chainJournal` is a WeakMap
  keyed by tx, stretch.ts:108). The designer's §3.1/§3.4 claims hold. ✓
* **Levels and roles.** `insertChain` inserts at `tx.level` (:852); `invisible` is an edge role with no level
  restriction (`since` is the registry version, arena/registry.ts:70, not a level); a chain along an existing edge is
  §3.11's collinear overlap, a shared edge gaining the chain's rows at the batch's level (insertChain.ts:19–20, :41) —
  so the L2/L3 dry-runs whose part edges run along F's L1 boundary or a committed L2 kerb edge are the kernel's normal
  case, not a refusal. ✓
* **Nothing outside the owns is needed.** No change to tx/, faces/, insert/, index/ or winding.ts is required by the
  mechanism; the spec's REPORTED list (the O(arena) image, fix 5; the insertion's constant factors, fix 2) is the
  remainder, correctly placed. ✓
* **One typing note (G6).** `openTx(o: Overlay)` takes `Overlay = InsertTx & {open: true}` (tx/types.ts:201), not an
  `InsertTx`: "kerb(tx, face, widths) keeps its signature" is true for every caller (bentCutFabric.ts:512/:588 pass
  `Overlay`; facade kernel.ts:219 the current overlay; testkit's invariants go through the façade), but kerb.ts must either
  narrow the parameter's TYPE to `Overlay` or keep `InsertTx` with `check(isOpenTx(tx))` and a cast. Either is inside
  kerb.ts; the spec should say which so the builder does not widen into callers.
* **Decimation (G3).** The scratch inserts every segment as its own two-point chain (winding.ts:179–190), so step 1's
  decimation never drops a part vertex (two points either stand or collapse to E_DEGENERATE 'empty' → W_ATTRACTED). "One
  closed mandatory insertChain per part" runs decimation over the whole ring: consecutive points closer than `minEdge`
  are DROPPED unless pinned (decimate.ts:4–6; `opts.pinned`, insertChain.ts:104) — a round join's arc at SAGITTA_CM
  spacing can lose vertices and the W_ATTRACTED semantics of a collapse change. The spec must say: every index of the part
  pinned (`opts.pinned = [0..n)`), so two exempt points closer than minEdge merge with W_ATTRACTED (decimate.ts:6–7) —
  the scratch's behaviour — or insert segment-wise as `buildOverlay` does; and which.
* **The walk before the dry-run (G5).** At L1 the parts' insertion splits F's own L1 record (its faces re-walked), so
  "F's walk's pairs" must be read BEFORE the dry-run; and "the halves tx.journal.split made of them" are the SHELL's
  `sh.journal.split` (classes.ts:96) — the batch's `t.journal.split` holds none of the dry-run's halves.

## 3 Does the perf pin pass or fail by accident of the machine? — NO [OBSERVED]

The pins are counts: `createPlat` calls = 0 during the reads (today 1 per non-trivial read, winding.ts:156), the
`insertChain` calls per read, one `takeSavepoint` per read; the refusal census; the shares. Wall time is "reported, not
gated, CONTENDED-labelled" — consistent with the brief's MACHINE text (23-build-m0-waves.js:85). Machine-independent. Two
mechanics the spec should state so the pin is red today and green after (G7): (a) the module mock must target the file
winding.ts imports (`src/arena/index.js`, winding.ts:28–39), and kerb.ts's NEW `insertChain` import must be from
`src/insert/insertChain.js` (the module the mock intercepts), or the per-read insertion count is read from the shell's
`work.counts` (classes.ts:155) through a test-only export; (b) the fixture builders themselves call `createPlat`
(bfuzz's `network(chords)`, vertexcontact's `build(fx)`, deadend's), so the counter is reset after the build and read
after the reads.

## 4 Does the Q19 pin prove 'read and commit see the same attractors', or only re-measure the share? — BOTH, with a bar set blind

* The hand-built case (a) is a genuine proof of the mechanism: u (F's L1 vertex, not on e) is within attractCm of T's
  inner edge; today F's scratch holds u (F's rings are an operand) and G's does not, so the two contacts on e differ and
  the second L2 commit attracts to the first's (bandUnion.ts:599 at L2 sees L0–L2 within 26 cm); after the change both
  dry-runs attract to the arena's u and give one contact c, and both commits land on c exactly. Red today, green after,
  for a reason the construction gives. ✓ [INFERRED from attractVertex.ts:118–126 and winding.ts:112–190]
* The §13.2 case (c) holds S8 ≡ S9 by the same argument (no L2 content at read time). ✓
* **(b) is a bar without a baseline (G2).** corridor.test.ts:228–296 today counts `tally.exact` only over faces where
  neither the overlay nor the commit moved a vertex, and asserts ≥ ⌈cases/10⌉ with the comment that "a face beside a
  chord's end is mostly an attracted case" (:293–296). The share over EVERY face (attracted included) has never been
  measured on this corpus; the 0.913–0.935 and 0.988 figures are c-06's fusion seeds and a-09's s6 fixture faces, not
  these networks; N-52 (5)'s ≥ 0.95 is c-06's measure on seeds 1–2. Asserting ≥ 0.95 "red without the change" on an
  unmeasured corpus can leave a 3-hour seat BLOCKED on a number nobody set from evidence — or pass vacuously if the
  networks are nearly all exact after the change. The fix: the HARD pin is the ratchet (the share over every face ≥ the
  share measured before the round on the same seed, measured FIRST, before any edit) plus every residual classed (b)
  with its seed, face, contact and the L2 vertex; ≥ 0.95 is the TARGET the builder reports in its choices row and the
  checker re-measures — a share below it with every residual classified is BLOCKED-for-ruling in the record, not a red
  test the builder must satisfy by widening.
* The residual class (b) survives by construction where S8's L1 read cannot see L2 content; the spec says so honestly
  (§3.3). ✓

## 5 Is Q84's fix in the right file and pinned by X16? — YES [OBSERVED]

TK support.ts:95–101 already applies `own(ours)` on every case and keeps 'ours invalid' in `h.failures` (no `h.invalid`,
Harness :69–77); the arr-bands folder has no harness test. The spec's NEW `TK/harness.test.ts` modelled on a-08's
harness.test.ts:82–98 but asserting `h.failures` is the one missing piece, inside the owns; the mutant (own() guarded by
`splitOf(warnings) === 'attracted'`, `splitOf` imported at support.ts:46) is X16/Z26 (M0-a-08-s4.md:103, notes :402). The
test's ingredients exist: `judge(h, op, source, ours, oracle, warnings, input)` (:95), `OracleReport.line(op)`
(testkit/src/oracles/report.ts:133), `compareSplit` (:42). ✓

## 6 Does the spec repeat the template, or omit what only it can say?

Repetition: the closing-check sentence restates the verdict file (render.mjs:46) — harmless. The clean-room: the session
text cites "23:85" (the host workflow file) for the no-timing rule; the build seat may not read it — say "the brief's
MACHINE text" (G8). Everything else the spec carries inline (KI-12/13's content, N-52's classes, J264 (5)'s counts).

**Omitted — only the spec can say it (G1, blocking):** the DECLARED SHIFT. The dry-run's attraction sees content the
scratch never did: L0 content inside F (the frame, water, the district's own L0 edges), other chains' vertices within
attractCm of a part edge OUTSIDE F (a neighbour's lanes, a T-junction just beyond F's edge), in S9's L2 read the earlier
batches' L2 kerbs across the corridor, and in bandUnion's L3 read the committed L2 kerb edges its band edges run along.
So kerb(F)'s rings, bandUnion's rings, refusals.json's details and the warnings' attracted split CAN move on some faces —
read-records (h) names "the pins and the declared shift (what may move, how it is stated)" as the spec's job, the S6
model entry did it (J260 (3)'s declared form), and profile §5 row 1 flags exactly this SHIFT risk. The S9 entry never
says what may move, in which class, or what the builder does when a golden OUTSIDE the owns moves in RELATED@1000
(layout/test/infill/fabric/city-split-seeds.json and b-03's fabric goldens, b-04's summaries read kerb(F) through S8's
cuts). Without it the builder either re-records a foreign golden silently (forbidden by N-52 (2)'s clause, and by the
WORKING RULES) or ends BLOCKED on a red it has no instruction for. Also Q19 (c)'s "the §13.2 case unchanged" is
ambiguous: the equality S8 ≡ S9 holds; the rings themselves may move with the frame as an attractor.

## 7 JSON validity and the model's form — ✓ [OBSERVED]

`python3 -I json.load` parses it; keys `id, from, round, session, lines`; `from` is the integer 9; `round` "S9"; 3 lines
each with `line, evidence, required_change` (the model's three keys); session 5 993 chars. The renderer
(render.mjs:48–55) embeds `session` after "opened by the SESSION, not by a failed check of the item." and the lines as raw
JSON once in each brief — the entry fits.

## Gaps

| id | severity | gap and fix |
| --- | --- | --- |
| G1 | blocking | No declared-shift clause. ADD to the session text (after "(3) The same arena state and face give the same kerb"): "DECLARED SHIFT (J260 (3)'s form, N-52 (2)'s clause): kerb(F) and bandUnion's rings may move only where the dry-run met an attractor the scratch never held — an arena vertex or edge of level ≤ the batch's within attractCm of a part's edge: L0 content inside F, a neighbour's L1 vertex beyond F's edge, an earlier batch's L2 kerb in S9's read, the committed L2 kerb edge a band edge runs along in bandUnion's — and the builder LISTS every registered case, fixture face and refusals.json detail that changed with its attractor (level, vertex, distance); a changed output with no such attractor is a defect. A golden of another item that moves in RELATED@1000 (layout's fabric tests: city-split-seeds.json, b-04's summaries) is REPORTED to its owner with the count and the class, never re-recorded by this seat; the checker records it as that item's re-record (J260 (3)), not a blocker, when every moved face is in the declared class." And in Q19 (c) replace "the §13.2 case unchanged" by "the §13.2 case still S8 ≡ S9, its rings listed if they moved". |
| G2 | blocking | Q19 (b)'s ≥ 0.95 on the random networks is a red test without a baseline (corridor.test.ts:228–296 counts exact only among unattracted faces today and says most faces attract). REPLACE in line 2's required_change (b): the hard pin is the ratchet — the share over EVERY face ≥ the share measured before the round on the same seed (measured first, before any edit, in a CHECKPOINT) — plus every residual classed (b) with seed, face, contact and L2 vertex; ≥ 0.95 is the TARGET reported in the choices row and re-measured by the checker; a share under 0.95 with every residual classified is BLOCKED-for-ruling in the record, not a red the builder widens to satisfy. |
| G3 | minor | One closed chain per part runs step-1 decimation over the ring (decimate.ts:4–7): unpinned points closer than minEdge are dropped, and a collapse is no longer per segment. ADD to THE FIX (1): "every index of the part pinned (`opts.pinned`, insertChain.ts:104), so two near points merge with W_ATTRACTED as the scratch's segment collapse did (decimate.ts:6–7) and no arc vertex is decimated". |
| G4 | minor | "replayCommit's form, :10–17" — `replayCommit` is at replay.ts:331 (header :325–330; the commit paragraph of the module header :11–19); its fresh copy comes from the `build()` callback (:334). Cite :331 and say replayKerb takes the same builder-callback form. |
| G5 | minor | "the halves tx.journal.split made of them" → "the halves the SHELL's `sh.journal.split` (classes.ts:96) made of them"; and "F's walk's pairs" read BEFORE the dry-run (the L1 insertion splits F's own record). |
| G6 | minor | `openTx(o: Overlay)` (state.ts:96) takes `Overlay` (tx/types.ts:201), not `InsertTx`. Say: kerb's parameter type narrows to `Overlay` (every caller passes one: bentCutFabric.ts:512/:588, facade kernel.ts:219) or stays `InsertTx` with `check(isOpenTx(tx))` and a cast — either inside kerb.ts, no caller touched. |
| G7 | minor | The count pins' mechanics: the createPlat mock targets `src/arena/index.js` (winding.ts:28–39 imports it there); kerb.ts's NEW insertChain import is from `src/insert/insertChain.js` so a mock there counts it (or the shell's `work.counts` is read through a test-only export); the counter is reset after the fixture builders' own `createPlat` and read after the reads. |
| G8 | minor | Clean-room: "23:85" names the host workflow file the build seat may not read; write "the brief's MACHINE text (never take or gate on a timing)". Also state once that the before-measurements (wall time, the memo hit rate, the exact share) are taken FIRST, before any edit. |

Not gaps (checked and held): the shell's key equals the batch's (classes.ts:133); the index log is cut by rollback
(common.ts:528); takeSavepoint makes no arena (savepoint.ts:160–198); `invisible` has no level restriction; a chain
along an existing edge is the kernel's shared-edge case (insertChain.ts:19–20, :41); every kerb() caller outside the
owns passes an open overlay (bentCutFabric.ts:512/:588, kernel.ts:219, the testkit invariants through the façade at
constructive.ts:692 / primitives.ts:583 inside `s.k.tx(spec(1), …)`); the ids note is current (C-0386 / L-0580 exist);
the JSON is the model's form.
