# Q181: rule 3 (b)'s run test (a ruling draft)

**Seat.** This is the ruling seat's draft on queue row Q181. It is DRAFT ONLY and binds nothing until the session rules it. The design head is e5029a5f (J783), the head of the design branch the session named. The patched mirror is `/home/user/maps-scratch/q181/tree` and the unchanged mirror is `/home/user/maps-scratch/q181/base`, both detached at e5029a5f. Everything named below lives under `/home/user/maps-scratch/q181/`.

| file | what it holds |
|---|---|
| `patch.diff` | the amendment: the mirror's change to `plat/packages/kernel/src/tx/relevel.ts`, and nothing else |
| `rq2-emulation.diff` | SCRATCH ONLY, applied to both mirrors and gated by the environment variable `Q181_MAINT`. It emulates RQ2's M1 – M4 on a proxy vertex role, the review's `junction`, after (b) and before (c). The commit-time hook is not emulated. |
| (in `tree` only) | SCRATCH-ONLY mutants of the flag step, gated by `Q181_MUT` (`rowoff`, `before`) |
| `probes/lib.mts` | the review's `lib.mts`, with `W` pointing at a mirror (`KW=tree` or `KW=base`) |
| `probes/p1-forms.mts` | the Q181 forms and the mixed-level forms; logs `p1-forms.{base,tree}.log` |
| `probes/p2-rq2.mts` | the composition with RQ2's row and M1 – M4 (emulated); logs `p2-rq2.{base,tree}.log` |
| `probes/p3-kin.mts` | the kin; logs `p3-kin.{base,tree}.log` |
| `probes/p4-pins.mts` | the line's pins against the mutants OLD, ROW-OFF and BEFORE; log `p4-pins.log` |
| `probes/fuzz.mts` | the sequence fuzzer; logs `fuzz-3000-rq2off.log` and `fuzz-3000-rq2junction.log` |
| `probes/p6-writers.mts` | the review's probe, copied for reference (it runs on the review's own mirror path) |
| `tests-tx.tree.log`, `tests-related.tree.log` | the kernel test folders on the patched mirror |
| `line-fold.json`, `spec-a06-s11.json` | the two ways for the rule to land (section 4) |

**The rule in one sentence.** A `split` vertex keeps its flag while some pair of its incident edges of its lowest incident level, on a run it split, is after the batch two edges of one level that carry at least one row of that level in common: the run's own row, whatever else rides along on either side.

## 1. The rule

### 1.1 What the code does today

`rewriteRows` is in tx/relevel.ts at :348.

- **The candidate pairs.** `runsBefore` (:405 – 432) holds, for each split vertex in `vstar`, the pairs of its incident edges of its lowest incident level m0 whose level-m0 rows were identical before the batch. That comparison leaves out the batch's stripped rows (`levelRows(p, h, m0, strip)`, C-0287 (1)).
- **The flag step (b)** (:649 – 659) keeps the flag when one such pair is still live after the batch, at one level, with identical rows of that level (`sameList(levelRows(...))`), and lies on a run (`isOn`: `onRunBefore` :404 – 418 and the second reading `onStretch` :629 – 648).
- **Otherwise** the flag is cleared and the vertex is pushed to `t.log.unflagged` (:656 – 657).

Two further facts matter.

1. **The before-comparison only matters through adds.** Without adds, the rows after the batch are the rows before it minus the strip. A pair that is identical after the batch was therefore identical before it with the strip left out. The before-comparison changes the answer only when the batch adds rows: a rekey (`retypeEdgesIn` :431 – 439) or a retype `add`. In those cases it can clear the flag of a run the batch rewrites on one side only. This is N-19's case, `removals.test.ts`.
2. **The after-comparison is the narrow part.** It demands that the two sides' whole row sets are identical. So a run with a different chain on each side clears the flag. That happens when one chain ends at the vertex along the run, when a stretch of such a chain is removed up to the vertex, or at a rekey cut.

### 1.2 The amended test (patch.diff)

> (b) *flags:* a `split` vertex keeps its flag only while a run it split survives the batch whole: a pair of its incident edges of its lowest incident level, on a run it split, is after the batch two edges of one level that carry a row of that level in common. That row is the run's own row. Whatever else rides along on either side does not matter, and a row the batch wrote on both sides (a rekey) counts. A crossing has two such pairs and a T-junction one. Otherwise the flag is cleared.

**All the common rows, or at least one?** At least one, read AFTER the batch. Reading "all of them" is either vacuous or wrong:

- With the batch's strip left out, every row the two edges had in common is still on both after the batch, because rows only leave by the strip. "All" then adds nothing.
- With the strip counted, "all" fails on a removed rider. That is C-0287's case (fixtures 1630 and 2337 in `restore.test.ts`), which the kernel already fixed.

**Why "after", not "had in common before".** Requiring a row that both carried before the batch is mutant BEFORE in `p4-pins.log`. It clears the flag when the batch renames the run on both sides. Pin Q4 shows this: a T on C at v, a rider D west of v, then C rekeyed whole to K. The run survives whole (as K), yet BEFORE clears the flag. With D and X later removed, v then stays on K. This is a Q181 form of the rekey that today's code also gets wrong (OLD red on Q4).

**The case by case reading.**

- **A crossing** (two pairs, A's and X's). Either pair surviving keeps the flag. Form F3 (`p1-forms`): A crossed by X at v, a rider B along A ending at v, X removed. The X pair is gone. The A pair is {A} beside {A, B}, which share A, so the flag is kept. Then B is removed and v dissolves. A is restored.
- **A T-junction** (one pair, the run's two sides). This is F3b, the same as F3 with the T's single edge never forming a pair.
- **Mixed levels.** Only pairs of the vertex's LOWEST incident level before the batch are candidates, as today. After the batch the two edges must be of ONE level, as today. The common row is read at that level.
  - A mixed pair is never a candidate. That is what keeps C-0287's inverse control right: §2.2 rule 3 (b)'s quay, where an L1 way that leaves an L0 shore at v keeps v as its own shape vertex once the shore goes (`restore.test.ts`, green under the patch).
  - The cost is that form F5 stays open. In F5, A is L1, C is L2 along A's whole run, and a crossing Y of L1 sits at v. A's stretch up to v is removed, so that side is demoted to L2. Then Y and A's rest are removed, and v stays on C (`p1-forms.{base,tree}.log` F5 false on both). Section 3 covers it.
  - Reading the common row at the finer edge's level, with the two levels allowed to differ, buys nothing. The next batch that touches v drops the mixed pair, because it is not of v's lowest incident level, and the flag is cleared there. The one-level demand is kept.
- **Edges whose level changes in step (a) of the same batch.** The after-test reads the levels step (a) left. A pair whose rows of m0 all left on both sides passes when both edges are now of one level ℓ and share a row of level ℓ. Example: the quay that shares the whole old shore stretch on both sides of a street end. Rule 3 (b) itself says that end "keeps that end restorable", and it is kept, as today. A pair left at two different levels is cleared, as today.

### 1.3 What the flag means after the change, and why a kept flag never dissolves what a survivor needs

The flag still means "dissolution restores exactly the edge it was created on". The amendment never SETS a flag. It only keeps a flag that today's step would clear, and only for these vertices: v lies on a run of a pair of its lowest-level edges (the on-run test, unchanged), and after the batch both edges carry a common row r at their one level. A kept flag acts only through `dissolve` (:1208) and `restoreSplit` (:1287). Both still demand, at the moment they act, all of the following:

- degree 2 at the relevant level;
- one level;
- identical rows;
- no vertex row;
- no pin;
- `wasOnRun`.

So a vertex the amendment keeps is dissolved later only once every chain but r's has left both sides and r runs straight through v. The cases follow.

- **A chain's own shape vertex.** Such a vertex carries no flag, because own points are never created on an existing edge, unless the chain's own point LANDED on another chain's run. That is exactly RQ2's class, and RQ2's `(shape, e)` row and M1 – M4 guard it.
  - The guard probe G (`p1-forms.tree.log`) shows the dependence. C has its own point v on A's run, A's stretch up to v is removed, then A's rest is removed.
  - With NO row (today's head), the amended step keeps the flag, and v (C's own point) dissolves. The old step cleared the flag at the stretch by accident, so OLD keeps v. G is false on tree and true on base.
  - With RQ2's row and M1 – M4 (`p2-rq2.tree.log` G and G2): the stretch keeps the flag and the row (M4, A still on one side), and A's rest gives M3 (the row stripped and the flag cleared). The arena equals C alone. G and G2 are true on both mirrors.
  - **So the amendment must land with or after RQ2's row, never before it.** This is the strongest constraint on how it lands (section 4).
- **The same class without a row.**
  - A leave vertex is a chain's own point on another's run where the chain runs along it on one side only. W writes nothing there (J776 R2). The amended step can keep its flag across a stretch of the other chain, and a later removal can dissolve it when the leave is within the hot pixel of straight.
  - Today's code ALREADY dissolves such a vertex when the other chain is removed whole in one batch (its strip-excluded before-reading sees both sides identical). The amendment makes the two-step order agree with the one-step order. It does not open a new class.
  - No such case appeared in the fuzzer with RQ2 emulated. Its one-bend chains leave the line at angles far outside the hot pixel. This is still a weak point (section 5).
- **A stretch end that a later promotion made a coarse chain's own.** A promotion that makes a vertex a coarse chain's own clears the flag in its own step: `promoteEnds` (writers.ts :336, a finer stretch end) and (c)'s :686 – 689 (a vertex left an END of a coarser run). Both run after or outside (b) and are unchanged. A flag the amendment keeps in (b) is therefore still cleared by (c) on such a vertex in the same batch.
- **A pinned or role-carrying vertex.** `dissolvable` (:234), `dissolve` and `restoreSplit` refuse any vertex row and any pin, as today. The pin step is unchanged.

## 2. The proof in the mirror

### 2.1 The patch

`patch.diff` changes one function, `rewriteRows`, in two places:

- `runsBefore` keeps every pair of the lowest incident level, with no row comparison.
- The flag step's `survives` reads: both live, one level, `isOn`, and a row of that level in common.

Notes for the builder:

- `levelRows`' `except` parameter (C-0287's reader) has no caller left.
- `sameList` is still used elsewhere.
- The `rq2-emulation.diff` and the env-gated mutants in the tree are scratch only. They are not part of `patch.diff`.

### 2.2 (a) The Q181 forms end equal to A alone

Each arena is compared by `contentPrint` with the survivors inserted fresh, and `allProblems` is empty at every end. There is no proxy row, so these run on the head's rules alone.

| form | `p1-forms.base.log` | `p1-forms.tree.log` |
|---|---|---|
| F1: the stretch of C ending at C's own point v = (2400, 2891), then C's rest removed | false: 7 vertices against 6, v f0 | TRUE. After the stretch the arena equals A plus C's rest fresh, with v kept f4 as a fresh split foot has it. |
| F2: the rekey cut at v, then C and K removed | false: 7 against 6 | TRUE. After the rekey it equals A, C's rest and K fresh. |
| F3: your second form (A crossed by X at v, a rider B along A ending at v, X removed, B removed) | **CONFIRMED** false: after X the flag is cleared (the pair {A} \| {A, B}); after B, 7 against 6 | TRUE |
| F3b: the same with a T | false | TRUE |
| F4: the same, with X's far half removed by a stretch ending at v first | false | TRUE |

With RQ2's row and M1 – M4 emulated (`p2-rq2.{base,tree}.log`, `Q181_MAINT=junction`, the row written after each insertion exactly where W writes it):

| case | base | tree |
|---|---|---|
| W1: stretch end → rest | false | true |
| W2: stretch end → the stretch re-inserted → all of C removed | false | true |
| W3: rekey cut → C → K | false | true |
| G, G2: the guard | true | true |
| G3: three coincident chains | true | true |

In W2 under the patch, W writes the row at v1 on the re-insert, because the flag is still there. Under today's code W writes nothing there, because the flag is gone, and v1 stays for ever.

### 2.3 (b) The kernel test folders under the patch, one worker

**`packages/kernel/test/tx` whole** (both projects, kernel and kernel-tiny; `tests-tx.tree.log`): 38 files, 660 tests. **2 red, 657 green, 1 skipped.** The two reds are ONE test in two projects:

- `test/tx/removals.test.ts` 'C-0185 (4) … > N-19: a split vertex whose run the batch retypes on one side only (a shore row east of it): no run survives whole with identical rows, so (b) clears its flag and lists it'.
- It reports `expected 4 to be +0`: the flag is kept.
- **It is a pin of the old narrowness, not a regression.** In N-19's case (an L0 way split by an L0 T, a shore row added east of v) the way's run survives whole. The amended rule keeps the flag. The fresh form agrees: the shore inserted along the way from v ends on the way's edge, a split foot, so the fresh v is flagged.
- **To be re-recorded by M0-a-06**, which owns `plat/packages/kernel/test/tx/` in `plat/docs/build/M0-work.json` (inside leg 2's write scope), in the same round as the rule. The re-record (line-fold.json Q6) expects the flag kept and `unflagged` empty.
- Its mutant S06 (M0-a-06-notes.md :465) is retired. Its role passes to ROW-OFF, killed by Q5.
- The same file on the base mirror is green: 32 of 32 in project kernel (run in the base mirror).

C-0287's inverse control (the quay) and the 1630 and 2337 fixtures (`restore.test.ts`) are green under the patch. The tx fuzz families (`fuzz.test.ts`) are green.

**The related folders** (`tests-related.tree.log`, project kernel): tx, insert (step1-2, step3-5), faces, arr, warp, invariants. The result is in §2.3a below.

**Not run:** digest, facade, io and the other packages. They were left out to stay at one worker. RELATED@1000 is the round's gate.

### 2.3a Related folders

Project kernel, one worker, 2 380 s: 87 files, 1 465 tests, **7 red, 1 458 green.**

- **One red is the patch's:** N-19, as above.
- **Six reds are the head's own, not the patch's.** They sit in M0-a-09's band tests:
  - `arr/bands/closing.test.ts` (2);
  - `arr/bands/dryrun.test.ts` (1);
  - `arr/bands/hardening-s15.test.ts` (1);
  - `arr/bands/restage.test.ts` (2: N1, N2).
- **The same six are red on the unchanged mirror.** The four files rerun there gave 6 red and 30 green, with the same test names (`tests-arrbands.base.log`).
- **insert, faces, warp and invariants are green under the patch.** That covers the lifecycle and fuzz families of step3-5, `bandUnion`'s and `merge.ts`'s calls of `rewriteRows`, and the invariant fuzz.

**So the patch's only red is N-19, a pin of the old narrowness. It is re-recorded by M0-a-06.** No real regression was found.

### 2.4 The pins and their mutants (`p4-pins.log`)

`p4-pins.log` runs Q1 – Q6 on the head (mutant OLD) and on the patched tree with `Q181_MUT` unset, `rowoff` and `before`.

- OLD: red on Q1, Q2, Q3, Q4 and Q6.
- ROW-OFF (live, one level, on-run, no row test): red on Q5. Two riders round a T: A west, B east, nothing in common, so the flag must clear when C goes.
- BEFORE: red on Q4.
- The amendment: green on all six.

### 2.5 (c) The fuzzer (`probes/fuzz.mts`)

**Design.** It runs 3 000 sequences per mode (seed 11), one process. Each sequence holds 2 – 4 chains on or across the line y = 2000:

- straight, with 0 – 2 own interior points on the line;
- one-bend, arriving or leaving off the line;
- crossing or T.

The first chain is L1 with probability 0.3. Then come 2 – 5 ops: end stretches removed, end stretches rekeyed to a fresh entity, whole removals and insertions. The same sequence runs on OLD (the base mirror) and NEW (the tree).

**The fresh form.** It is the survivors inserted in EVERY order (all orders up to 4 survivors, 31 otherwise), with the least distance taken. The kernel's fresh form depends on order (N-13), so one order would be noise.

| measure | RQ2 off (`fuzz-3000-rq2off.log`) | RQ2 emulated (`fuzz-3000-rq2junction.log`) |
|---|---|---|
| sequences completed | 2 864 | 2 863 |
| ops | 10 342 | 10 340 |
| OLD = NEW | 2 065 | 2 049 |
| differ | 799 | 814 |
| NEW = some fresh order, OLD = none | 157 | 216 |
| OLD = some fresh order, NEW = none | 70 | 80 |
| neither | 572 | 518 |
| NEW's full print closer to fresh / further | 334 / 165 | 361 / 173 |
| NEW's VERTEX SET closer to fresh / further | 89 / 13 | **94 / 0** |
| NEW lacks a vertex every fresh order and OLD have (a dissolved owned vertex) | 13 | **0** |
| OLD lacks such a vertex | 1 | 2 |
| `allProblems` on either kernel | 0 | 0 |

Reading the table:

- **With RQ2's row** the patched kernel never has a vertex set further from the fresh form than the old one, and never dissolves a vertex every fresh order keeps.
- **Every one of the 173 "further" cases** differs from OLD only in vertex lines where NEW has `f4` (sometimes with W's row written later because the flag stood) and OLD has `f0`, on the same vertex set. Counted in the log: 0 edge lines and 0 other kinds. A kept flag is "further" from a fresh order in which that vertex is a chain's own end: the order class of N-13, not a regression of shape.
- **Without the row**, all 13 "lacks" cases are the guard class G: a chain's own interior point on another's run, with a stretch of the other chain ending there. For example, `seed 11000729` lacks 2555,2000, c:1's own point, and `seed 11000806` lacks 3135,2000. This confirms the dependence on RQ2 in §1.3.

**A side finding** (both kernels, not Q181): 136 of 3 000 sequences threw `tx: a run has route vertices at its own level`. 70 came from `removeEdges` and 66 from `retypeEdges` (the rekey). Each was a StretchRef of an L1 chain whose end is an L2 Steiner vertex on its route.

- The throw is in `chains.ts` :53 `linesOfRuns`, reached from writers.ts :313. That is BEFORE `promoteEnds` (:329), which §3.4 says promotes such an end first.
- `p1-forms` F6 reproduces it on the head.
- It is a throw, not a refusal. It is a queue candidate for M0-a-06 and is not part of this ruling.

## 3. The kin

**The reverse order** (C first with its own point v, A laid along C's run through v later, C removed; `p3-kin.{base,tree}.log` K1). Both mirrors leave v on A: 7 against 6. v is C's own vertex, so it never carried the flag, and the amended (b) cannot fix it. It only keeps flags.

K1b adds a crossing X at v laid after A and removed before C. It still fails on both, because X lands on an existing vertex and sets no flag.

**What closing it would take.** The flag would have to be SET when a later chain's run comes to pass through an existing own vertex of another chain: "this vertex is restorable along A once C goes". That changes what the flag means. Today the flag is a birth fact (created on an existing edge). It would become a relation (removing the vertex's owner restores the passer's run). It would also need the inverse of RQ2's row (which chain owns the point), written at A's insertion.

**Recommendation:** it stays out of M0's contract, as a notes row in N-13's canonical-form class (J776 already routes it there). It does not fall out of the rule for free.

**Three coincident chains, the base removed first** (`p2-rq2` G3, with RQ2's row). The ends are right on both mirrors: D removed gives C alone, and C removed gives D alone. The middle state differs from C and D inserted fresh by the flag and the row on C's own point (`f4 [shape c]` against `f0 []`), because the run survives (C and D on both sides). Both rules keep the flag, so the amendment neither fixes nor changes it. It is the same class: the fresh form depends on which chain came first.

**Found here, beyond the queue's two kin** (both mirrors, so the amendment does not touch them):

- **K3** (`p3-kin` K3): a finer chain B (L2) crossing a coarser one A (L1) at v, an L2 Steiner vertex. When A is removed, v stays on B for ever, still carrying `VERTEX_STEINER` (print `f2`).
  - Only A's pair is of v's lowest incident level, so B's pair never counts.
  - At one level the same crossing dissolves (K4 true): a crossing has two pairs only when both are of the lowest level.
  - Reading pairs of one level at EVERY level, not only the lowest, would close it. That still excludes mixed pairs, so the quay is safe. But it widens the rule beyond Q181, and it would dissolve a finer chain's own point placed within the hot pixel at such a crossing, exactly as today's same-level rule does.
  - Recommended as its own queue row (M0-a-06, N-13's class), not folded.
- **F5**: a mixed-level run (a coarse chain's stretch removed up to v, a finer chain along both sides). The lowest-level selection excludes the mixed pair at the next batch. It is not closed, for the reason given in §1.2. A notes row in the same class.

## 4. How it lands: F (recommended) or S

**Recommendation: F.** Fold it into the RQ2 round as ONE added line of leg 2, LINE 8. The line itself and every edit are in `line-fold.json`. The reasons:

1. **It must not land before RQ2's row** (§1.3, G and the fuzzer's 13). The merged round lands its three legs on one tree, with W (leg 3) and M1 – M4 (leg 2) together. Folding gives exactly that order and no intermediate landed state.
2. **It is the same function and the same step M1 – M4 read.** M1 – M4 run "AFTER rule 3 (b)'s flag step" (J777). A separate round would re-open `rewriteRows`' flag step under rules that M1 – M4 were reviewed against.
3. **The round already builds the fixture.** Leg 2's pins (e) and (f) build the stretch end and the rekey cut and today stop short ("its flag is left as rule 3 (b) leaves it … F8: the queue's"). Folding turns them into "equal to A alone", which is the restoration the round's design sentence 997 claims.
4. **It saves a whole round** (build plus three closing checks).

**What the fold touches.** It adds LINE 8 and changes the wording of:

- LINE 1's pins (e) and (f), from "reported" to "the flag KEPT, then the rest → equal to A alone";
- LINE 1's text, a pointer to LINE 8;
- LINE 7: its "no output moves without a `shape` row" claim now excepts LINE 8, and golden-probe batches and CITY roots can move;
- leg 2's session text;
- amendment ab: a new item (1007, the sentence of rule 3 (b)), 1006's open clause removed, and 997's scope sentence widened to "removed whole, by a stretch through or ending at the point, or rekeyed with its cut there".

N-19 is re-recorded in M0-a-06's own file.

**What it cannot disturb:**

- M1 – M4 (no change, walked in W1 – W3 and G);
- W (leg 3 reads the flag at the commit; with the kept flag it writes where it otherwise would not, as in W2, which is correct);
- LINES 2 – 6;
- legs 1 and 3's entries;
- the measured list (no registry change);
- rulings R1 – R17 except R3's scope note.

**The fold's cost.** It changes a spec reviewed twice. LINE 7's shift becomes real on arenas without a `shape` row, so the round's golden probe and roots must be re-measured with LINE 8 in. The ruling seat has not measured whether a CITY derivation reaches the forms; see section 5.

**M1 – M4 need no change.** Two walk-throughs (`p2-rq2.tree.log`):

- **Stretch end, then the rest removed.** The stretch strips C's row at v1 (M1: C on one edge). The amended (b) keeps the flag (A on both sides). v1 is then A's split vertex with C's end on it, which is the fresh form. C's rest goes and v1 dissolves: A alone.
- **Stretch end, then the stretch re-inserted, then all of C removed.** The re-insert puts C on both sides of v1 again. W writes `(shape, C)` there because the flag stood. Without the amendment the flag is gone and W writes nothing. C's removal strips the row (M1), and the flag dissolves v1: A alone.

**Option S** is `spec-a06-s11.json`: the same line as M0-a-06 S11, launched after the merged round lands. It is clean and gated alone. It costs a round, and it leaves the merged round's pins (e) and (f) asserting a defect for its lifetime.

## 5. Weak points and what is not verified

1. **The leave vertex within the hot pixel** (§1.3). The amended step keeps a flag that a later removal can use to dissolve a chain's own nearly-straight leave point, which W leaves without a row. Today's code does the same in the one-batch order, so this is not new. The fuzzer did not build such a vertex (its bends are wide), so it is REASONED, not measured.
2. **RQ2 emulated, not built.** The emulation is a proxy role (`junction`) planted where W would write. M1 – M4 run in `rewriteRows` only (no commit hook, no pin interaction). A real `shape` row also has `nonKnotLost` exclusion and other effects that are not tested here.
3. **The roots and the golden probe were not measured.** Whether M0's pipelines reach a stretch end, rekey cut or rider at a split vertex is open. If they do, CITY roots move under LINE 8. Only the round's LINE 7 measurement can say.
4. **Test coverage at one worker.** Only kernel tx (both projects) and the related kernel folders (project kernel) were run. Digest (`levelDigest.test.ts` oracle sequences), facade, io, testkit and layout were not. RELATED@1000 was not run.
5. **The fuzzer's fresh form is the best over insertion orders.** A flag difference counts against whichever kernel the chosen order disfavours. The vertex-set measure is the robust one. The line class (no edge or face lines among the 173) was checked by grep.
6. **Q9 (ONE-LEVEL-OFF's pin) was not run.**
7. **The amendment's "row in common" is per row text** (kind, entity, ordinal, level). Two chains of one entity and ordinal are not told apart, as everywhere in the kernel.
8. **K3 and F5 stay open** (§3), and the StretchRef throw at a finer end (§2.5) is unrouted. A reviewer should press whether the "lowest incident level" selection itself is the deeper narrowness. The ruling seat's answer is that it is what keeps the quay's leave point, and it stays.
