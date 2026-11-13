# M0-a-05 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-05 (lane `check/M0-a-05-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. The finding below is not a
blocker, and it is not a defect of the item: it concerns the command form the gates and the memory rule use. Its row
names its handling and where it belongs. The verdict and its evidence are in `checks/M0-a-05.md` (the closing round is
at the top).

The first check's notes (N-1 – N-10: the W_SNAP_PASSES reading, the equivalent and unreached mutants, the four edge
kinds' (c) fixture, the routing of "remove(insert(x)) ≡ id", the timing workload, M0-a-04's `applySplitPlan` defect,
L-0115's reads, the nightly size, the 25 – 26 cm mandatory chain, the closed M0-a-04 notes) are bullets in
`checks/M0-a-05.md` round 1. This file starts its own numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **`corepack pnpm test -- <flags>` drops the flags: vitest parses nothing after `--`.** Round 1's gate log starts `> vitest run -- --project kernel --maxWorkers=2` and ends `Test Files  163 passed`. The fix's record says "test --project kernel 0 (163 files 1806 tests)". But `corepack pnpm exec vitest run --project kernel --maxWorkers=2` runs `87 passed (87)` · `791 passed (791)`, and `corepack pnpm exec vitest run --maxWorkers=2` (the whole workspace) runs `163 passed (163)` · `1806 passed (1806)`. So the "kernel" figure is the whole workspace (CONFIRMED, executed 2026-10-04). vitest 5.0.3's CLI parser (`node_modules/.pnpm/vitest@5.0.3_…/dist/chunks/cac.DfDGTQ9W.js` 560 – 573) moves every argument after `--` into `options['--']` and parses none of them as options, and nothing in vitest's `dist/` reads `options['--']` (grep; CONFIRMED by reading). `--maxWorkers=2` written after `--` is therefore ignored too, and the run uses vitest's default worker count. That count was not measured (PLAUSIBLE: more than two on this 8-core machine). The form without `--`, `corepack pnpm test --project kernel --maxWorkers=2 packages/kernel/test/insert/step3-5/rewalk.test.ts`, passes them: `> vitest run --project kernel --maxWorkers=2 packages/…/rewalk.test.ts` → `Test Files  1 passed (1)` (CONFIRMED). J168's example in the lane briefs ("corepack pnpm test -- --maxWorkers=2") is the dropping form. | The session should write J168's example and M0.md §3 step 3's `test --project <package>` as `corepack pnpm test --project <p> --maxWorkers=2` (no `--`) or `corepack pnpm exec vitest run --project <p> --maxWorkers=2`. Records that quote "test --project kernel … 163 files" should read them as whole-workspace runs. They are green either way, and no verdict changes. | now (the session's run rules, J168); not an M4 item |
| N-2 | *(closing check `check/M0-a-05-close-s1`, 2026-10-05; session fix round S1)* **The wedge cap's equality case is not pinned.** Mutant K5 (`moveCm * moveCm >= WEDGE_CAP_SQ` for `>`, wedge.ts) survives the item folder at 10³ (`Tests  116 passed (116)`). It is not equivalent: `Math.sqrt(5408) ** 2 === 5408` in V8 (executed), and a chain-corner landing at a lattice offset of distance² 5 408 (for example (52, 52) or (28, 68)) moves exactly 2 · √2 · attractCm, which the code wedge-routes and the mutant places in turn. The cases are contrived (an exact irrational boundary); 73 cm and 74 cm are pinned. | A test of a chain's own corner whose landing lies exactly at distance² 5 408 (W_WEDGE_ROUTED kept), killing K5. | M4 (or the item's next fix round) |
| N-3 | *(close-s1)* **routeSegment's E_INVARIANT refusal is untested.** Mutant K8 (the final `return err('E_INVARIANT', …)` replaced by `throw new Error(…)`) survives at 10³. The branch was reached by no input this check found: 0 in 30 000 B-FUZZ cases (seed 777, PR size, instrumented counter), 0 in 15 000 buffer cases of M0-a-08's `bufferCaseArb` (seeds 23 and 2027; 77 endpoint-route commits, all clear). So no input distinguishes K8 from the code (PLAUSIBLE equivalent on reachable inputs), and N-37's "never a bare Error" stands only by reading. | A white-box test that forces every fallback to fail (for example a test-only hook on `ChainCtx`) and asserts E_INVARIANT, atomicity and no throw. | M4 |
| N-4 | *(close-s1)* **"A refusal of the strict route is the segment's" is not pinned.** Mutant K9 (insertChain.ts `if (!r2.ok) return r2;` removed, so the endpoint route runs after a refused strict route) survives at 10³. Its B-FUZZ digest at seed 777 equals the fix's byte for byte in all 30 000 cases (the path, a refused strict route with no route along existing edges, was never reached). | A constructed case where the design route breaks clearance and the strict route refuses (E_KEPT), asserting the refusal. | M4 |
| N-5 | *(close-s1)* **The run walk's overshoot guard is not pinned.** Mutant K15 (walkRun's `dir * (tw - tk) > 0` test removed) survives at 10³. PLAUSIBLE equivalent on known inputs: the walk observed once in 30 000 B-FUZZ cases and once in 3 000 buffer cases; an overshoot would end in `null` and the ordinary route. K16 (the cap test moved outside `moveCm > attractCm`) is equivalent (the cap exceeds attractCm). | A walk case with a run vertex beyond the leave point. | M4 |
| N-6 | *(close-s1)* **insertChain's last clearance check still throws.** `checkClearance` (snapRound.ts) after all segments is a `check`, a bare Error, not E_INVARIANT; per-segment `clearSince` makes it unreachable in every run here (0 throws in 45 000 cases). N-37 names routeSegment's throw only. | Return E_INVARIANT there too, or record the reading that it is an assertion. | M4 |
| N-7 | *(close-s1)* **N-37's "nothing changes for chains that commit today" is held by receipts, not a test.** The before/after B-FUZZ digest (C-0202 (6); this check's at seed 777) is a one-time run. | A golden digest of a fixed B-FUZZ slice under the insert code, re-recorded only with a choices row. | M4 |
| N-8 | *(re-check `check/M0-a-05-close-s2`, 2026-10-05; fix round S2)* **The endpoint route can leave a chain's rows on a there-and-back edge, as C-0205 (3) records; this seat confirmed it with its own probe.** After M0-a-08's seven chains (`routerGap.test.ts`'s ring), s6, (−48140, 46382) → (−48863, 44833), carries its row on four edges: (−48140,46382)–(−48450,45728), (−48450,45728)–(−48522,45607), (−48522,45607)–(−48863,44833) and (−48450,45728)–(−48389,45801), the last shared with s4. Its degree-1 vertices are the two ends and (−48389,45801), and (−48450,45728) has degree 3. So the route is A → P → Q → P → R → B: Q, the vertex attracted 20.10 cm off the segment at t ≈ 0.37, comes after P, the nearer-end landing at t ≈ 0.42. Chains s0 – s5 are simple paths. §3.10 holds (`allProblems` is empty) and no edge is new. The behaviour follows §3.6's "moves onto the nearer endpoint … re-enter step 3". The snapshot code threw on this input, and the farther end (K7) breaks the attracted bound. CONFIRMED geometry (scratch probe, mirror only); the effect downstream is PLAUSIBLE. | The session rules whether a chain's committed rows may retrace an edge, or whether the route drops an attracted vertex the endpoint landing has passed. It should do so before M0-a-08 lands, because M0-a-08's winding over chain rows may read the retraced edge as boundary. No change belongs in M0-a-05 under N-37's text. | the session (before M0-a-08); otherwise M4 |
| N-9 | *(closing check `check/M0-a-05-close-s3`, 2026-10-05; fix round S3)* **N-43 B's far landings, and s3-inflight (b), come from the design route, not from a fallback.** An instrumented copy of the kernel source traced s25 (`r6/offsetface-4b-segments.json`) and s60 (`r6/offsetface-segments.json`). In both, `routeSegment`'s first route (`r1`, the design route) commits. A step-4 crossing goes to M0-a-04's `placePoint`, which returns `endpoint`, and the crossing lands on that endpoint: 2 725 cm along the edge for s25, from (11810.3, 41271.3) to (11375, 43961); 2 843 cm for s60, from (38344.2, 42704.2) to (35530, 43112). N-37's endpoint route, S3's sliver route and the re-landing are not reached. | The fix for N-43 B sits where the design route takes `placePoint`'s endpoint fallback, which is `planLanding` in M0-a-05's `stretch.ts`. M0-a-05 can bound it there; `placement.ts` (M0-a-04's) need not change. The session should confirm the owns before the next round. | session (before the next M0-a-05 round) |
| N-10 | *(close-s3)* **M0-a-09's in-flight band B-FUZZ reaches insertChain's `E_INVARIANT`.** The kernel project gate, run at 19:24 with M0-a-09's `test/arr/bands/` present (in flight, J200), failed `bfuzz.test.ts` "kerb, corridorUnion and bandUnion on random street networks" with `expected [ 'E_KEPT', 'E_INVARIANT' ] to include 'E_DEGENERATE'` (seed −255613264, path 1103:…). It also failed `corridor.test.ts`'s area bound (seed −975445129). The first is very likely N-42's class reaching a band op; this seat did not reduce it. | M0-a-09's seat or checker reduces it to its `insertChain` calls. If a mandatory chain is refused `E_INVARIANT`, the case goes to M0-a-05's next round with N-42's other cases. | session / M0-a-09 |
| N-11 | *(close-s3)* **Survivors this seat does not rule blockers.** These are KD (the sliver route judged by `clearSince`; the author's equivalence argument was not refuted), KI (`alongEdge` without its `dot < l2` bound; equivalent on a valid arena), KL (the re-landing candidate filter removed; plausibly unreachable, because two unjoined vertices within `minEdge` already break §3.10), KO (re-landing allowed when the point was landed earlier in the op; it still moves a free vertex the op placed), KQ (one re-landing candidate instead of eight; consistent with "at most 8") and KR (the endpoint route's non-`E_INVARIANT` refusal dropped; this is S1's line, of N-4's class). Each survives the item folder at 10³ and all seven repros unchanged. | Constructed fallback-route cases: a free end whose nearest candidate fails and whose second routes; a split sub-edge clearance case for `placeAcross`; an endpoint route refused `E_KEPT`. | M4 |
| N-12 | *(close-s3)* **A failing B-FUZZ seed looks like a hang.** At seed 31337, the random family failed at case 3 624. fast-check then shrank a case holding 300-point walks for more than 45 minutes: 12 843 evaluations, still shrinking when stopped. Vitest's per-test hard timeout cannot interrupt synchronous shrinking. Every other seed finished the whole file in about 10 minutes. | Give B-FUZZ's properties a shrink cap (for example fast-check's `interruptAfterTimeLimit` / `markInterruptAsFailure`, or `endOnFailure` at the PR size), so that a red seed reports its case. | M4 (tooling; the session may move it earlier) |
| N-13 | *(closing check `check/M0-a-05-close-s3` re-run on round S5's code, 2026-10-06)* **`remove(insert(x))` leaves face records behind on about a third of ordinary commits, and on third-pass commits alike.** This seat replayed 203 B-FUZZ cases through M0-a-06's transaction with M0-a-14's suite wired in (role `invisible`, so the suite's linear-role row stays out of it). The cases were 150 ordinary commits, 40 first-pass `W_PLACED` commits, 4 third-pass commits found by a 6 000 + 3 000 case scan, and the 9 cases of `register/s5-rescues.json`. Each target chain was then removed with `removeEdges` in a later batch. The remove path did not restore the content print on 50 of 150 ordinary commits, 19 of 40 first- and second-pass `W_PLACED` commits, and 3 of 13 third-pass commits. Two further ordinary removals were refused (an L2 batch writing the L1 index; a clearance row). The dominant difference is an intermediate-level face record, for example `f1 0,0 4000,0 4000,4000 0,4000 | …`, which the finer chain's insertion created and its removal did not delete. The arena is valid in both states (`allProblems` empty after the removal), so it is a canonical-form question and not an invalid arena. The undo path (a batch refused after the insert wrote) restored the arena exactly in all 203 cases. Simple cases restore (four hand-built chains at L0 and L1: green). Examples are in `~/maps-scratch/waves/check-M0-a-05/s5/remove-residue-examples.json`. | A session question for M0-a-06 (`removeEdges`) and M0-a-05 (`rewalk.ts`, which creates the parent records): should removal delete a face record its level no longer needs, or is record persistence lawful? Until that is ruled, N-46 (6) (e)'s remove-path test can only pin "as for an ordinary commit". Not caused by S5. |
| N-14 | *(close-s3, S5)* **Mutant survivors that a safety net covers, or that are equivalent.** Mutants were run at `PLAT_FUZZ_RUNS=1000` and `PLAT_FUZZ_SEED=4242` (BASE 185/185), plus the repro set. These five survive, and this seat judges them not to be blockers. Q11 (the free spot searched out to twice the bound) and Q13 (`placeOnRun`'s `admit` filter dropped): any landing beyond the input's bound makes `inFidelity` refuse the route, and Q24 (the bound skipped in the third pass) is killed, so the net is pinned. Q14 (`passOver` ending the search with null): this only loses rescues. Q15 (`stripLanding`'s vertex search without its in-bound skip): the post-check returns the fallback, so this only loses rescues. Q16 (`ctx.strip` not restored after `routeSegment`): equivalent, because every caller re-sets it per segment and no reader looks at it after a nested return. | Hardening (M4): pin the rescue-rate readings (Q14, Q15) if the refusal caps are tightened. |
| N-15 | *(close-s3, S5)* **B-FUZZ's counts are invisible on a passing run.** Vitest's default reporter prints no `console.log` of a passing test, so the per-property refusal counts appear only when a property fails. C-0217's table therefore carries `≤ 1` entries in place of counts for several of S4's 21 seeds. This seat counted through an instrumented copy that appended every count to a file. | Write the per-property counts to a machine-readable artefact (or a reporter line), so the ratchet's baseline and every re-measure read real counts. Before M1. |
| N-16 | *(close-s3, S5)* **C-0217 has no per-map projection for the M0-a-08 families (N-46 (7)).** This seat measured them on S5's code, at the PR size, with its own seeds, through an instrumented copy of the agreement harness. **buffer:** 549 `E_INVARIANT` refusals over 8 seeds × 10⁴ cases, 56 – 78 per seed, 68.6 per 10⁴. **offsetFace:** 260 over the same 8 seeds, 26 – 42 per seed, 32.5 per 10⁴. In every run, drawn − passed equals the count of our `E_INVARIANT` refusals, so no committed result disagreed with the oracles. The tree's testkit gate gave buffer 9 920 / 10 000 and offsetFace 9 967 / 9 997. A per-town projection needs the number of insertChain calls a town makes, which M0 does not have (KI-4). | The session indexes these residuals for N-46 (5). |
| N-17 | *(re-check `check/M0-a-05-close-s6`, 2026-10-06; fix round S6)* **No test asserts N-46 (4)'s family cap per 10⁴, which is the ratchet baseline, across seeds.** One B-FUZZ run asserts only `refusalCap`. That is the 99.9 % Poisson point of the family cap scaled to the run: 12 / 8 / 8 / 3 at 10⁴, against family caps of 4.45 / 2.14 / 2.26 / 0.26 per 10⁴, about 2.7 – 11× higher. A drift of the random family to 8 per 10⁴ would pass about 94 % of PR runs (P(X ≤ 12 \| mean 8) ≈ 0.94). This seat's 12 fresh seeds sit under every family cap (3.08 / 1.08 / 1.42 / 0.08). | Add a nightly or multi-seed aggregate: ≥ 10 seeds, the summed count of each family against `capPer1e4(family) × seeds`, written with `PLAT_FUZZ_COUNTS`. C-0221's ratchet then has a test that can fail. | M4 (or the session's nightly) |
| N-18 | *(close-s6)* **The optional N-43 class's final refusal names the bound even when the third pass was stopped by §3.6's optional precision rules.** C-0221 counts 60 of 66 residual cases this way. This seat's probe saw it on the register cases 5309, 5501 and 5701: the third and fourth readings end "wedge routing would move it more than attractCm (147.2 / 114.9 cm)", "(64.5 cm)" and "a corner below minFaceAngle". The refusal returned is still pass 2's "… leaves the fidelity bound (N-43)". The choice is deliberate and conservative: the case is counted, never hidden. But a consumer that reads the detail cannot tell the bound from the wedge or corner rule. | In the hardening pass, carry the third pass's reason as a sub-detail and keep the code and the "(N-43)" tally key, so the KI-1 cause table can read it. | M4 |
| N-19 | *(close-s6)* **The lifecycle register has no commit made by a free-spot landing.** Mutant Q19 (the free landing not journalled, so a rollback would leave the vertex) is killed only by `routerGapS6.test.ts`'s unit test. `lifecycle.test.ts` stays green under it. Either its `pass4` fixture does not take the free-landing branch, or the transaction's undo does not read the journal for that vertex (PLAUSIBLE; not traced). Either way, N-46 (6) (e)'s undo path for that kind is held by the unit test's journal assertion, not end to end. | Add a `pass4-free` lifecycle fixture whose last chain commits through reading 1's free spot (found with the same dev probe), with undo exact. | M4 |
| N-20 | *(close-s6)* **A foreign red in the `site` importer project.** In the kernel-importer gate at about 08:15, `site/test/terrain/range.test.ts` "no source of @plat/site writes an Int32Array's cells but range.ts" failed. It names `water/outfalls.ts` (`new Int32Array(n).fill()`, `bodyOf[c]` twice), in `packages/site/src/water/`, a folder written at 08:12. S6 changed no `site` file, so the red is not M0-a-05's. | For the session: route it to the seat building `site/src/water/` (the range door's rule) before that item's check. | the owning item |
| N-21 | *(close-s6)* **J208's residual after S6, for the session's record.** Constructive went 48 → 17 → 12 counted on S4's six seeds (75 %, below 90 %). Its residual is S5's E_INVARIANT classes plus the optional class whose third pass meets §3.6's precision rules; each resisted one attempt. Buffer stays at about 66.5 per 10⁴ (84 % from S4 to S5; S6 is byte-identical to S5 at seed 5101). It is above 10 per 10⁴, so it is not a ghost (N-46 (4)), and it is stated as resisting S5's attempt. offsetFace is at 94 %. The rule as written lets the round close. The residuals still sit above the owner's 1 per 10⁴ target (KI-1) and N-46 (7)'s per-map projection waits on KI-4. | The session should weigh whether buffer (66.5 per 10⁴, mandatory walls and kerbs downstream) needs an owner look before M1. That is a decision, not a fix for this item. | session / M1 |
| N-22 | *(closing check `check/M0-a-05-close-s7`, 2026-10-11; session fix round S7)* **`ownShapeVertex`'s pair and level clauses have no test that can fail.** Mutants M5 (the pair test dropped: a sub-edge's pair this op did not write no longer keeps the flag) and M10 (the level test dropped: a row of the chain's key at another level no longer keeps it) survive the item folder at 10³ (`19 passed (19)` · `225 passed (225)` each; `waves/check-M0-a-05/mutants.jsonl`). The rows test (M4) and the call itself (M3, M6) are killed. This seat judged them, not the author: both differ from the code only when a SECOND op writes rows of the SAME role / entity / ordinal key. Probe (mirror): kerb `base:0` L2 (3142, 2862) – (499, 2966), then `base:0` L2 (2430, 2874) → (2400, 1500) landing at (2431, 2890) on the first op's edge — code `isSplit: true`, M5 `false`; `base:0` L1 along y = 2000 crossed twice by a `base:0` L2 chain — code both crossings flagged, M10 the second (on the pair this op made) not, in one direction. In every case `allProblems` and `dissolvableProblems` are empty, a third chain attached and removed leaves the vertex (degree ≥ 3 while the key lives), and the key's removal takes both chains and the vertex. CONFIRMED different on the same-key input; PLAUSIBLE equivalent on every honest input (one key per op: every test, the register, every pipeline caller read). Not a blocker: a flag bit with no outcome this seat could make observable. | A same-key second-op pin for each clause (the probe's two inputs, asserting the flag as the code has it), or a refusal of a same-key re-insert at `checkRows` if the session rules an entity is one op's. | M4 |
| N-23 | *(close-s7)* **C-0302 (3)'s open case, judged here: the coincident fold-back vertex is dissolved by a later chain's removal — a notes row, not a blocker.** Probe P3 (mirror; `probe-coincident.json`): `base:A` L2 (3142, 2862) – (499, 2966); `base:C` L2 (3142, 2862) (499, 2966) (2430, 2874) shares A whole (`W_STRETCH_SHARED` ×2) and folds back onto the shared edge at (2431, 2890) (`W_ATTRACTED` ×1) — the vertex is C's `placed[2]` and a split of A's run, flag kept by C-0302 (3)'s two-key rule (degree 2, `dissolvableProblems` empty); `x:1` L2 (0, 3501) (735, 705) (2456, 2886) attaches there (degree 3) and is removed in a later batch: the vertex is dissolved (7 → 6 vertices; print, chunk refs and digests differ from before x by that vertex only; the edge carries `base:A` and `base:C` as before). `allProblems` empty at every step; `base:C`'s removal restores A exactly; deterministic. CONFIRMED. Every committed result is valid and the geometry is unchanged (the vertex lay on A's edge within the hot pixel between C's collinear rows); what changes is whether C's fold-back vertex survives another chain's lifecycle — a canonical-form question of N-13's shape, in a class no register kind, N-47 case or pipeline path reaches. Clearing the flag would leave Q9-shaped residue on A when C goes, so the one flag cannot carry both meanings (C-0302 (3)): design the seats may not add (J156). | The session decides the reading (a second flag or a per-key owner of a split vertex; or the rule "a vertex that is a shape vertex of any live chain is never dissolved", which the dissolution could read from the vertex's rows at removal time); then a register kind `coincident-foldback` with exact restoration. | the session; else M4 |
| N-24 | *(close-s7)* **`test/tx/restore.test.ts` (M0-a-06's file) still asserts `foldedBase ≤ max(2, n / 1000)` (lines 525, 652) and `≤ max(2, (nearEnd + inner) / 50)` (826), with comments waiting on this round.** With Q10 fixed the count is 0: this seat's copy of the file with the three assertions set to `toBe(0)` passed at the PR size in the mirror (`FOLDED0 {"inserted":1727,…,"foldedBase":0,…}`, `{"inserted":1916,…,"foldedBase":0,…}`, `{"candidates":170192,"nearEnd":20,"inner":2,…,"foldedBase":0,…}`; `22 passed (22)`). The round's required change "foldedBase asserted 0" is met in substance; the assertion lies outside M0-a-05's owns. | M0-a-06's next round (or the session's steward) sets the three assertions to `toBe(0)` and drops `holdsDissolvable`'s "counted, not judged" comment. | M0-a-06 (now); not an M4 item |

## Consolidation round R3 (lane `build/M0-a-05-consolidate-1`, 2026-10-11; the builder's map and notes)

The round applies the R3 halves of I-1 – I-4, the findings I-7 – I-16, the comment rewrite C-insert-3 – C-insert-8 and the
test plan T-step3-5 of `plat/docs/build/consolidation/kernel-plan.md` (§1.1, §1.2, §2, §3.2; J260, J263 Q1, Q2, Q6, Q8;
J270 (a), (b); J276 (2) – (4); J286, C-0321), as fix round C1 of `checks/M0-a-05.md`'s consolidation lines. It changes
no behaviour. The row is C-0328. NO-SHIFT evidence (the builder's scratch mirrors;
quoted in the landed record and the lane log):

* **A seeded differential probe** (a test file in the mirrors only, never in the tree): 40 000 seeds, each a framed
  800 or 4 000 cm square and one to five chains of gen.ts's random and constructive kinds at non-decreasing levels —
  119 922 insertions, each line its outcome, refusal code and detail, the op's warnings and the transaction's, the
  placed points, every work counter and a hash of the content print. The pre-round tree and the consolidated tree give
  byte-identical files (sha256 `5ad4e630ebe47cb7…` both; 113 859 commits, 486 with W_PLACED, 1 365 W_WEDGE_ROUTED,
  2 060 E_BELOW_MIN_ANGLE, 3 250 E_BELOW_MIN_EDGE, 752 E_DEGENERATE, 1 E_INVARIANT — N-c1-1).
* **The folder at the PR size, seed 4242**: before (pre-round tree, `kernel`) 19 files, 225 tests green; after (the tree,
  `kernel` and `kernel-tiny`) 11 files, 225 tests each, 450 green. Every expanded `describe › it` title of the 225 is
  present in each project after, none added; the static listing (`vitest list`, title templates) is 148 = 148, the
  describes 67 = 67. The register JSONs are byte-untouched (sha256 of the ten files equal before and after).
* **Refusal counts of the registered families** (B-FUZZ's three properties and the fidelity property, `PLAT_FUZZ_COUNTS`,
  seed 4242, 10⁴ each): before random 1, constructive 1, mandatory 2, fidelity 0; after the same in `kernel` and in
  `kernel-tiny`. Each is the counted bound class (caps 12 / 8 / 8 / 3), none new.
* **Exports**: `insert/index.ts`'s export list and `src/index.ts` are text-identical; at run time `insert/index.ts` gives
  34 = 34 names and the barrel 422 = 422. File level: `stretch.ts` loses `MIN_EDGE` (I-8: not in the index, no reader in
  any package) and gains `pieceFrom` and `subEdgeHolding` (imported by path); `footOnSegment`, `nearerVertex` and
  `splitBreaksClearance` stay exported from `stretch.ts` as re-exports. The other five files' runtime exports are equal.

### What was found and done, finding by finding

| finding | done | how, and the equivalence |
|---|---|---|
| I-1 (R3 half) | done | `stretch.ts` imports `footOnSegment` / `nearerVertex` from `splitThrough.js` and re-exports them (its copies deleted; the bodies were token-identical, C-0321 (1)). `insertChain.ts`'s knot loop resolves the entity's handle and calls `carriesRow` (its `vertexCarries` and the `rowsOfKey` / `rowElement` imports deleted): the same rows of the same key, the element read by walking each row's set to its mark — on a valid arena equal to `rowElement`; only a malformed set differs, in which assertion text throws (both prefixes are E_INVARIANT's). A new pin in insertChain.test.ts (below) holds the carry check. |
| I-2 | done | `crossings.ts` imports `inSweptWedge` from `placement.js`; its private copy deleted (identical, `o` for `a`). Not added to the index. |
| I-3 (J263 Q2, J286 (1)) | **not adopted: placeOnRun keeps its own loop** | `placementCandidates` yields the nearest of four FIRST and filters (i) before a candidate is charged; `placeOnRun` ranks that point inside its band, charges a band point that (i) then refuses, and admits by `opts.admit` before the charge (N-c1-2 of M0-a-04's notes). Adopting the generator would change `insert.placementCandidates` counts (and, through E_WORK_LIMIT, possibly an outcome); parameterising it is a change to `placement.ts`, M0-a-04's file, outside this item's owns. `placeOnRun`'s comment says why. `splitBreaksClearance` there reads `splitEndsBreachClearance` from `placement.js` directly. |
| I-4 (J286 (2)) | **not adopted: nearestPiece kept** | `nearestRoutePiece` ranks by the rounded quotient `ratio(o², |ab|²)`, `nearestPiece` by the exact cross-multiplied `o² · |cd|² < o'² · |ab|²`; they can differ on near-ties and past 2⁵³, and `nearestPiece` returns a `Piece` (with the run's ends) where `nearestRoutePiece` gives `{edge, a, b}`. No equivalence proof over every input exists, so step 2's landing beside a finer vertex keeps its comparison; its comment says so (C-0321 (5)). |
| I-7 | done | `export { splitEndsBreachClearance as splitBreaksClearance } from './placement.js'` with one line naming it (C-0284 (2)); the wrapper and its history comment deleted. Its readers: `faces/common.ts` (unchanged), lifecycle.test.ts's C-0284 (3) section. The equality case there is now an identity (one function, two names): kept, and an assertion added that the two names are one function; the breaching count (P–E alone, only at 16 cm) still pins the rule. |
| I-8 | `vertexDist2` kept; `MIN_EDGE` re-export dropped; `lattice` comment only | grep: `insert/index.ts` does not export `MIN_EDGE` and nothing imports it from `stretch.ts` (kernel, model, layout, testkit, bench), so the re-export went; the local constant stays (step 3's strict reach reads it). `vertexDist2` has no reader in the kernel (grep) — kept as the brief says (N-c1-4). `lattice`: a comment names `faces/common.ts`'s and `geom/common.ts`'s `lp` and its home in num/ as M0-a-01's (J276 (3)). |
| I-9 | done | `classes.ts` exports `cloneWarnings` (R2): `insertChain.ts` imports it for the marks and the rollback; its `copyWarnings` (the same body) deleted. |
| I-10 | done for three of four callers | One `subEdgeHolding(ctx, piece, x, y)` beside `pieceOf` in `stretch.ts`: the walk of `crossings.ts` `subEdgeAt`, token for token (the position projected along a → b as a dot product; advance past each run vertex whose projection is `<=` the position's; `i + 2 < vs.length` keeps the last sub-edge for a position beyond the piece; null when no piece joins a and b). **Per caller:** `subEdgeOf`, `stripPartner`, `placeAcross` called `subEdgeAt` — the same function; `cornerBeside` ran the identical walk on the crossing's (x, y) (its `path === null → −1` kept as `sub === null → −1`, its neighbour test and `nearerVertex` tie in the caller); `fallbackEnd` ran the identical walk and asserted the path (`check(sub !== null, 'a piece joins its two ends')`, the same text, thrown at the same point — nothing read or written between), its `onPath` exclusion and nearer / far choice in the caller. **`otherEnd` is not done**: it steps from v by comparing the position's projection with v's (`tq > tv`), so a position projecting exactly onto v takes the vertex before v where the walk takes the sub-edge after it — a different question (the neighbour of v on the position's side), kept with a comment saying so. ALONG_REACH = 4 · attractCm and ALONG_MAX = 256 untouched. |
| I-11 | done, through the walker `routeBetween` already used, not through `pieceOf` / `routeRun` | One `pieceFrom(p, h, n)` in `stretch.ts`: `routeBetween`'s inner walk, token for token (the level m of h; through every finer vertex by its LAST onward edge of level m in rotation order; the `onward` check text; the `'a run does not end'` guard), returning the piece's far vertex and half-edges. `routeBetween` is `pieceFrom` over a's outgoing edges of level ≤ n until the far end is b (same order, same first match); `pieceNeighbours` is `pieceFrom` over v's outgoing edges of level ≤ n (its body was the same walk, the guard included); `exitTowards` reads `pieceFrom(...).w` (its walk was the same but without the guard: the guard only throws where a run does not end, which no valid arena has — where the old walk terminated the answers are equal). Expressing them through `pieceOf` / `routeRun` (the index's run walk from the handle end) would change the walk's order and its reads, so the plan's equivalence is held by keeping the one walk the three already ran. |
| I-12 – I-14 | comments only | the pass structure (insertChain's last block: passes 1 – 4 and which refusal each serves), the `ChainCtx` gates (one sentence each: what it admits, its C-row), `routeOne`'s ordered reading table (r1 – r7, the pass each needs, its row) above it, and the recursion bounds (`MAX_DEPTH_THIRD`: the third and fourth passes). `boundRefusal` and caps.ts's `countedRefusal` stay two writings; `boundRefusal`'s comment names the other. |
| I-15 | every export of `insert/index.ts` kept | text-identical below its comment; `insertChain.test.ts:25–30` green (and `tx/forms.test.ts` in RELATED). |
| I-16 | comment only | the insert-specific predicates (`nearParallel`, `onRouteOfLevel`, `passesWithin`, `withinSegment`) and `segmentBox` stay on `stretch.ts`; its module comment names them and `segmentBox`'s comment names its home in num/exact.ts as M0-a-01's. `stretch.ts` and `crossings.ts` import `BOX_RANGE` from num/exact.ts (the one value, 2²⁴) in place of their local constants. |
| N-c2-4 (M0-a-01's notes; J276 (4)) | replaced | `wedge.ts`'s `ratio(MIN_EDGE · cos · SCALE, 2 sin · SCALE, 'length')` and `divScaled(MIN_EDGE · cos, 2 sin, 'length')` compared on every whole centidegree 1 – 17 999 and seven fractional and boundary inputs: 18 006 inputs, 0 differ (`Object.is`), and below 1 cdeg wedgeBound's own range check throws first in both; the products are formed in the same order (`(MIN_EDGE · cos) · 2²⁰`, `(2 sin) · 2²⁰`). Replaced; the local `SCALE` deleted; crossings.test.ts "wedgeBound: 0.47 m at the 30° junction floor …" pins the four exact doubles at 1, 1 200, 3 000 and 17 999 cdeg (mutant WB1 red). |
| I-5 | ruled (J270 (a)) | `check` / `notBuilt` stay. |
| N-c2-1 (M0-a-04's notes; J286 (4)) | noted, not edited | step1-2's parity case "footOnSegment and nearerVertex answer as stretch.ts's copies …" now compares one function with itself (stretch.ts re-exports the originals); it is M0-a-04's file — for M0-a-04's next round and the session (N-c1-3). |
| R14 (J286 (5)) | kept | step3-5's `support.ts` keeps its own generator re-export from step 1–2's support; `snapshot()` lives in step3-5's `support.ts` (test/tx/support.ts is M0-a-06's, R6 decides); `vertexAtPoint` stays here (R5). |

Comments (C-insert-3 – C-insert-8): `insertChain.ts`'s module comment is §2's — the door, the readings in order, the
fidelity bound 2 · √2 · attractCm, the refusals, the passes, atomicity and the closed overlay, one `Readings:` line and
one `Rulings:` line; every per-line `(N-xx)` went where a C-row is cited, and the history sentences (the "S1 – S3 test",
"the wrapper here is gone", "reached it in none of 40 000 scanned cases") with them. `stretch.ts`, `snapRound.ts`,
`crossings.ts`, `wedge.ts`, `rewalk.ts` (C-0178 named) and `insert/index.ts` likewise; internal names that told a round
(`S5Landing`, `landS5`, the locals `s5`) are `InBoundLanding`, `landInBound`, `inBound`. `grep -n "(N-" src/insert/`
finds the `Rulings:` line's ids (no parenthesis) and two message texts: `BOUND_DETAIL` = 'leaves the fidelity bound
(N-43)' and the E_INVARIANT text '… keeps clearance (§3.10) within the fidelity bound (N-43)' — pinned by the registers
and router.test.ts, kept byte-identical (J263 Q6).

### Old file → new file map (J263 Q8)

| old file (the tree read on 2026-10-11) | new file | what moved |
|---|---|---|
| `routerGap.test.ts`: "N-37: the router's endpoint-fallback route before any refusal", "N-37: a stretch whose join point's route split the piece …"; `RING`, `FRAME_391`, `CHAINS_391`, `chainMove` | `router.test.ts`, its section "the endpoint route and the stretch walk (C-0202)" | both describes verbatim; `wideArena` and `segDist` to `support.ts`; `ATTRACTED_BOUND` and `chainMove` once at the top |
| `routerGapS3.test.ts`: "N-42 (a): a crossing on the near side of a sliver …", "N-42 (b): a free end no route reaches …", "C-0210: a route that would run back over an edge …" | `router.test.ts`, section "the step across a sliver and the re-landing (C-0209)" | verbatim; `FRAME` / `CHAINS` renamed `SLIVER_FRAME` / `SLIVER_CHAINS` (one file now holds `FRAME_391`); `WALK` / `WALK_POINTS` once at the top (S4's identical copy dropped); `wideArena(cell)`, `segDist` to `support.ts` |
| `routerGapS4.test.ts`: "N-43 B: the fidelity bound …"; "insertChain's second pass (C-0215) …" (`Pass2Case`, `PASS2`, `replayPass2`); "N-44 (1): an invariant failure …"; C-0209's describes (KA / KP, KC, KF, KG, KE, KN; `SLIVER`) | `router.test.ts`: the bound's measure first; C-0209's describes beside the sliver and re-landing ones; the safety nets after C-0210; the second pass after the first pass's fallbacks | verbatim; `SQUARE`, `square`, `free`, `ctxOf`, `at`, `codes` once at the top |
| `routerGapS5.test.ts`: "S5: the bound of the input segment and the strip's far side"; the rescues (`s5-rescues.json`); "N-44 (4): S5's residual register …"; "N-44 (3) … caps" | `router.test.ts`: section "the third pass (C-0217)", the rescues, the residual register; the caps last | verbatim; `STRIP` at the top; `replayFuzz` → `replay(c)` (the one replay, role `way` by default); the case types are `FuzzChain` / `FuzzCase` / `Rescue` / `Residual` (types only); `wideArena` to `support.ts` |
| `routerGapS6.test.ts`: the two F4 describes; "N-46 (3) …"; "F2: optional chains …" (`s6-lifecycle.json`); "N-44 (4): S6's register …" (`s6-register.json`) | `router.test.ts`: F4 with the third pass's units; N-46 (3), F2 and S6's register in section "the optional chain the bound refuses (C-0221)" | verbatim; its `ctxOf(p, level, strip)` is the one `ctxOf` (strip `null` by default adds no `extended` / `strip` keys — the router reads `=== true` and `!= null`, so absent and `false` / `null` are one reading); its `replay(c, role)` is the one `replay`; its case type is `RegisterCase` |
| `foldback.test.ts` | `lifecycle.test.ts`, section "a chain's own fold-back point (C-0302)" | verbatim; its `insert` / `remove` renamed `insertKerb` / `removeKerb` (lifecycle has its own `insert`); `snapshot` to `support.ts` |
| `placementEnds.test.ts` | `lifecycle.test.ts`, section "a split's own-end breach at the doors (C-0284 (3))" | verbatim; one assertion added to its first case (the two names are one function, I-7) |
| `lifecycle.test.ts` | `lifecycle.test.ts` | `chunkRefs` / `digests` → `support.ts` `snapshot(p).refs` / `.digests` (the same expressions) |
| `chaikin.test.ts` | `snapRound.test.ts`, section "the Chaikin×2 spine cut-endpoint fixture" | verbatim |
| `farWedge.test.ts` | `crossings.test.ts`, section "the wedge cap (C-0202 (3))" | verbatim; `segDist` to `support.ts` (its `chainMove`, over a polyline, stays) |
| `crossings.test.ts` | `crossings.test.ts` | wedgeBound's four exact values (N-c2-4) |
| `insertChain.test.ts` | `insertChain.test.ts` | "a knot point that vertex attraction lands on an EXISTING vertex …" gains a later op of the same entity whose knot of the same key lands there: no second row (I-1's `carriesRow`; mutant KC1 red) |
| `register.test.ts` | `register.test.ts` | `wideArena` from `support.ts` |
| `support.ts` | `support.ts` | gains `wideArena(cell = 64)`, `segDist` (one copy of the three identical ones; the exact oracles stay apart) and `snapshot(p)` |
| `bfuzz`, `fidelity`, `promote`, `rewalk`, `stretch` tests; `caps.ts`, `fidelity.ts`, `gen.ts`; `register/*.json` | the same files, byte-unchanged | nothing |

23 files and 10 registers before; 15 files (11 test files) and the 10 registers after. Every helper deduplicated was
byte-compared first (`WALK`, `STRIP`, `SQUARE`, `chainMove`, `segDist` ×3, `wideArena` ×3 equal).

### Mutant map: the earlier rounds' mutants → the case that kills them now

Each was re-introduced in the self-check mirror (`waves/selfcheck-build-M0-a-05-consolidate-1`, isolation proven: no
link out of the mirror, the workspace packages resolving inside it), run on its named file(s) at the PR size with
`--maxWorkers=1 --bail=1`, restored from the tree and `cmp`-checked.

| mutant (its check) | mutation | red now on |
|---|---|---|
| K04 (M0-a-04) | `nearerVertex`'s tie reversed (the one body, splitThrough.ts) | step1-2 `splitThrough.test.ts` "a foot exactly as far from both ends (25 cm each) …" |
| K03 (M0-a-04) | step 2's endpoint tie reversed | step1-2 `attract.test.ts` "a foot exactly as far from both ends of the edge …" |
| K06, K08 (M0-a-04) | the band's tie reversed; the nearest of four, the last on a tie | step1-2 `placement.test.ts` (C-0321's describe) |
| F1a (M0-a-04) | the fallback onto the farther endpoint | `router.test.ts` "the seventh chain's endpoint route lands its crossing on the nearer end …" (and step1-2) |
| F1b, F1c (M0-a-04) | the fallback without W_PLACED; its tie reversed | step1-2 `placement.test.ts` "no point qualifies on a 49 cm edge …" |
| M9 (s7) | (iii) at the split's own ends disabled in `placePoint` | `lifecycle.test.ts` "step 3's landing at L1 (planLanding, …)" (C-0284 (3) section) |
| KA, KP, KC, KE, KF, KG, KN (S4) | C-0209's bounds | `router.test.ts`, each by its own describe ("… (mutants KA, KP)", "… (mutant KC)", …) |
| R1, R2 (S6) | `boundRefusal` = E_INVARIANT only; the third pass gated on E_INVARIANT | `lifecycle.test.ts` `pass3-optional` (and router F2 / the agreement unit) |
| R4, R6 (S6) | the optional detail loses "(N-43)"; `countedRefusal` = E_INVARIANT (test side) | `router.test.ts` "boundRefusal (the router's gate) and countedRefusal … agree" |
| R5 (S6) | the fourth reading's refusal replaces the kept code | `router.test.ts` the S5 residual register |
| K1 (S6) | the third pass off | `router.test.ts` (with bail, first red: the buffer case 391; the 19 rescue / residual cases behind it) |
| ST3 (r1) | `nearParallel` at 2 · sin θ | `stretch.test.ts` "at 5.1°: one crossing vertex, nothing shared" |
| SJ1 (r1) | `share` does not journal the pair | `router.test.ts` "the seventh chain's endpoint route …" |
| M3, M4 (s7) | `ownShapeVertex` a no-op; its rows test dropped | `lifecycle.test.ts` register kinds (`control-refused`; `sliver-route`) |
| this round's own: CW, KC1, FE1, WB1, I2t2 | `cloneWarnings` returns its argument; the knot carry check off; `fallbackEnd` takes the far end; `wedgeBound` through a bare `ratio`; `inSweptWedge`'s no-turn rule `true` | `router.test.ts` (second pass, r6); `insertChain.test.ts` (the new pin); `router.test.ts` (seventh chain); `crossings.test.ts`; `router.test.ts` (C-0210 grid 64) |

Survivors, each judged (notes N-c1-5, N-c1-6 below): RT1 (r1: a finer vertex step 3 routes through not promoted)
survives the whole folder at seed 4242 on the consolidated tree AND on the pre-round tree (19 files, 225 green with
it), so its earlier kill was the fuzz seed's, not a case this round lost; SH1 (`subEdgeHolding`'s `<=` → `<`), PF1
(`pieceFrom` keeps only a piece's first and last half-edges) and EX1 (`exitTowards` takes the farther neighbour)
survive router / crossings / stretch / snapRound and B-FUZZ at seed 4242 — the code they mutate behaves byte-identically
to the pre-round walks (the probe), so these are gaps the earlier rounds left, not this round's; I2turn as first written
(the no-turn line deleted) is equivalent (with `turn` 0 both later conditions are false) and was re-run as I2t2.

### Notes (not failing lines)

| id | note | handling | where |
|---|---|---|---|
| N-c1-1 | **A lawful-input refusal in the probe, the same before and after.** Probe seed 26 800, its fourth chain: an L4 mandatory random chain on the 800 cm square refused E_INVARIANT 'insert: no route from (78, 283) to (762, 407) keeps clearance (§3.10) within the fidelity bound (N-43)' (17 570 work units). It is the counted bound class B-FUZZ caps; ZERO REFUSALS (J264) makes it a defect for the session, with its seed (the probe file is in this round's scratch: `a05c1/probe/zz-probe.test.ts`, PLAT_PROBE_SEEDS=26800 reaches it). | the session (J264) | the router |
| N-c1-2 | **I-3 and I-4 not adopted** (above): `placeOnRun`'s loop and `nearestPiece`'s comparison stay; sharing them needs a parameter on `placementCandidates` (M0-a-04's file) or an equivalence proof the rounded quotient cannot give. | R10 or a later M0-a-04 round, if the session wants one engine | — |
| N-c1-3 | **N-c2-1 of M0-a-04's notes stands**: step1-2's parity case compares `footOnSegment` / `nearerVertex` with themselves now. Not edited (M0-a-04's file). | M0-a-04's next round | step1-2 |
| N-c1-4 | **`vertexDist2` has no reader** in the kernel (grep of src/ and test/); kept as the brief says. | a later round may drop it | stretch.ts |
| N-c1-5 | **RT1 is held by no fixed case.** Its kill was B-FUZZ's at some random seed (r1); at seed 4242 both trees pass with it. A unit pin (a step-3 route through a finer vertex on a coarser route, its level after the commit) would hold it at any seed. | hardening pass (KI) | snapRound.test.ts |
| N-c1-6 | **The walks' unpinned corners.** PF1 (a piece through two or more finer vertices shares only its first and last sub-edges), EX1 (an acute corner's tip leaves by its farther route neighbour) and SH1 (a position projecting exactly onto a run vertex takes the earlier sub-edge) survive the folder: no fixture has a shared piece with two finer vertices, a tip with two route neighbours at different distances, or an exact projection tie. The walks are byte-identical in behaviour to the pre-round code (the probe); pins are hardening. | hardening pass (KI) | stretch.test.ts, snapRound.test.ts |

## Closing check of R3 (lane `check/M0-a-05-consolidate-close-1`, 2026-10-12; verdict in `checks/M0-a-05-c1.md`)

None of these is a blocker (the verdict says why for each). Mutant names are this check's (`checks/M0-a-05-c1.md`,
"Mutants"); "pre-round" means the s7 sources and test folder (hash-equal to the s7 landed record) beside the tree's
other files.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c2-1 | **RT1 (a finer vertex step 3 routes through is not promoted, snapRound.ts `if (L[ob.vertex] > n) promote(…)` removed) survives the folder, before the round and after it.** It survives the consolidated folder (9 fast files at full strength, then B-FUZZ + fidelity at the PR size, random seed) and the pre-round folder (17 files, then the same B-FUZZ set), so this round lost no kill. The path is reachable by a lawful input: promote.test.ts's `neighbourStep()` (L1 street y = 2 000, L3 plot line ending on it at (2 000, 2 000)), then an L2 mandatory chain (1 000, 1 950) → (3 000, 1 990). The code commits it with W_PROMOTED and the vertex at L2; under RT1 the op refuses `E_INVARIANT 'index: vertex 7 (L3) lies on edges of two levels coarser than it'` (fail-safe, but a lawful input refused). | A pin in promote.test.ts: that chain on `neighbourStep()` commits, W_PROMOTED, the vertex at L2, `allProblems` empty. | next round touching step3-5, else M4 |
| N-c2-2 | **The walks' exact ties stay unpinned, before and after.** SH1 (`subEdgeHolding`'s `<=` → `<`), OE1 (`otherEnd`'s `tq > tv` → `>=`: the tie the new comment states, "a position projecting exactly onto v takes the vertex before v") and EX1 (`exitTowards` takes the last neighbour, not the nearer) survive the consolidated folder and B-FUZZ, and their pre-round equivalents (SH1 applied to all three copies of the walk) survive the pre-round folder. The comments are true of the code (read); nothing fails if the tie flips. Confirms the builder's N-c1-6. | Constructed pins (an exact projection onto a run vertex; a corner tip with two route neighbours at different distances). | M4 |
| N-c2-3 | **Two stated rules of code this round left unchanged have no failing test.** PO1 (`placeOnRun` without `passOver` passes over a sub-edge that cannot be split, instead of ending with null as `placeAcross` asks) and NP1 (`nearestPiece`'s strict `<` → `<=`: two equally near pieces resolve to the last in the query's order, not the first, which its new comment states) survive the folder and B-FUZZ, before and after. | Pins: a sliver whose near sub-edge cannot be split (placeAcross → null); two route pieces equally near a step-2 point beside a finer vertex. | M4 |
| N-c2-4 | **One sentence of insertChain.ts's module comment reads wider than the code.** "Only a pass's commit replaces the refusal before it, so a refused chain keeps the second pass's code." A chain the first pass refuses with a code other than E_INVARIANT (E_KEPT, E_LEVEL, a precision code) never gets a second pass and keeps the first pass's code. In context the sentence follows the description of passes 3 and 4, and the comment at the passes (`let result = attempt(false)`) states the rule exactly ("a refusal keeps pass 2's refusal" for a chain pass 2 refused for the bound), so the code is not misdescribed where it is written. The plan's §2 suggested this wording. | Reword: "… so a chain the later passes refuse keeps the second pass's code". | next comment pass on insertChain.ts |
| N-c2-5 | **Lawful-input refusals the probe met (ZERO REFUSALS, J264), the same before and after.** They are counted-class E_INVARIANT ('insert: no route from … keeps clearance (§3.10) within the fidelity bound (N-43)'), all mandatory. The probe is `scratchpad/waves/check-M0-a-05/c1/probe/zzprobe.test.ts`: constructive = `generator(seed · 7919 + 13)` over `framed(4000)`; dense = `generator(seed · 104729 + 7)` over `framed([800, 1200, 2000][seed % 3])`. The cases, as seed/chain-index, level and points: cons 3944/5 L1 (3970, 1564) (3557, 895) with a knot; cons 13184/3 L2 (3970, 679) (3846, 180) (3970, 698); cons 18036/3 L3 six points from (271, 1284); dense 6738/11 L1 closed (30, 321) (400, 329) (770, 350); dense 10209/8, 14135/7 L2; dense 14508/8 L1; dense 14563/8 L3; dense 14564/3 L1 (a 7-point near-straight chain at y ≈ 1 470); **dense 17560/0, the first chain into an empty framed 1 200 cm square**: L0 (621.5, 298) (737, 593) (398, 257) (875, 683) (316, 944) (509, 264) (496, 511), a self-crossing chain, refused at work 272; dense 17791/2 L2 (775, 30) (782, 600) (800, 1170); dense 18085/8 L3 five points along x ≈ 730. Totals: 3 refused of 109 465 constructive and 9 of 159 639 dense insertions (kernel project, 20 000 seeds each). | The session, for the zero-refusal programme (the router). | the session |
| N-c2-6 | **Two assertions change on paths no valid arena reaches.** (a) `exitTowards` now walks through `pieceFrom`, which asserts `'a run does not end'`. The old walk had no guard, so a run that never ends would have looped; now it throws an `insert:` assertion, which the op refuses as E_INVARIANT. (b) The knot loop's `carriesRow` walks each row's set to its element mark, but not through `rowElement`'s two assertions (the row is live; the set has an element mark). On a malformed set it answers "not carried" where `rowElement` threw an `arena:` assertion. Neither is reached on a valid arena: the probe is byte-identical over 324 000 operations. (a) is a gain. (b) loses an assertion that only fires on corrupt state. | (b): let `carriesRow` assert the mark (`e <= -2`) as `rowElement` does. That is M0-a-04's file. | M4 |
| N-c2-7 | **I-7's alias is pinned by identity, and faces' reading of it is not pinned.** Under SB1 (`splitBreaksClearance` a function answering false) only lifecycle.test.ts's C-0284 (3) case fails, on its new identity assertion and its every-edge equality. faces/split.test.ts "a cut leaving its end along the boundary edge" stays green. This round leaves faces' use as it was. | A faces pin where the boundary split must be refused. That is M0-a-07's folder (R7). | R7 / M4 |
| N-c2-8 | **A foreign RELATED red, identical on the pre-round sources.** `layout/test/enceinte/water.test.ts` "through the strategy: the oblique crossing has no chord, so the trace is refused E_INVARIANT `water` …" fails with `expected true to be false`, in RELATED and when replayed alone at 10³. The replay gives the same failure with the s7 insert sources (mirror B) and with the consolidated ones (mirror A). The builder saw it too. | The session: layout's N-54 work (M0-e-03 / M0-e-04 in flight). | the session |

## Session fix round S8 (lane `build/M0-a-05-fix-s8`, 2026-10-13; J335, queue row Q53, `checks/diagnosis-a09-sliver.md`; C-0349)

**The fix.** `rewalk.ts` `coarserRegion` finds the coarser record topologically (`holderAt`: an old half-edge of the
cycle of level ≤ m names the level-m face on its left; its record is the one whose level-m walk holds it, the index
asked `WALK_REACH_CM` = 3 cm round its origin); only a cycle of new edges alone is placed by a midpoint (box widened by
the same reach). `recordUnder` checks the own-child premise before any write: a live record of a level m + 1 … n under
the coarser record round the new edge refuses the op E_INVARIANT with the text pinned in `sliver.test.ts`.

**Survey of the level-m face lookups (the diagnosis's open question (2)).** Every `query(…, { faces: true })` and
`pointLocate` in `packages/*/src` read whole at its site. "Route" = the index's candidate filter (a record read on the
query level's route); "walk" = an exact test on `faceWalk` (through every Steiner vertex) or on ring membership.

| caller (file:line) | level asked vs the batch | candidates → exact test | verdict |
|---|---|---|---|
| `kernel/src/insert/rewalk.ts` `coarserRegion` (pre-round 272–303) | coarser (m < n) | 1 cm midpoint box on the level-m route → `insideRing(faceWalk)` | **the Q53 defect — fixed** (topological, reach 3 cm, premise guard) |
| `kernel/src/insert/rewalk.ts` the level-n records round the new edges (pre-round 176) | the batch's own (n) | segment box + 1 cm on the level-n route → old rings by walk | same class where finer kept Steiner vertices (levels n + 1 … 4) bound the record; **widened to the reach** (owns) |
| `kernel/src/insert/snapRound.ts` `recordHolding` (272; callers snapRound.ts:352, insertChain.ts:354, 500) | finer (n + 1) — the kept-content test | 1 cm box on the level-(n + 1) route → `faceWalk` containment | same class (a level-(n + 1) record read through level n + 2 … 4 Steiner vertices); **widened to the reach** (owns); a miss would let a chain into a finer record without E_KEPT |
| `kernel/src/insert/rewalk.ts` `reparent` (pre-round 465) | finer (n + 1) | the split record's parts' box + 1 cm → topological, else the part's walk | consistent: every child lies inside the parts' bounding box; unchanged |
| `kernel/src/insert/splitThrough.ts:324` (M0-a-04) | n … 4 | ± 4 cm round the new vertex → walk holds the vertex | consistent (4 cm > the 2.84 cm reach); not edited |
| `kernel/src/warp/warp.ts:411` | fromLevel … 4 | ± 4 cm round a mover → walk holds it | consistent; not edited |
| `kernel/src/warp/held.ts:134` `nestedVertices` | finer | the face's box + 1 → parent chain; route rings read | route throughout (no walk test); consistent |
| `kernel/src/invariants/common.ts:111` `faceLeftOf` (M0-a-14; caller invariants/batch.ts:368) | the checked face's level | **segment box + 0 cm** → ring membership (walk) | **same class, outside the owns — routed to the session**: a half-edge whose ends are finer Steiner vertices off the route can miss its record (a false "island face lies in no record" at the commit check → a lawful batch refused); unreached by every registered family |
| `kernel/src/tx/relevel.ts:168` `recordLeftOf` (M0-a-06; callers 537 – 552, the demotion's materialise plan, which reads **coarser** levels) | the demoted edge's new level and coarser | **segment box + 1 cm** → ring membership (walk) | **same class, outside the owns — routed to the session**: below the 2.84 cm multi-level reach a miss reads as an own child and plans a materialisation (the phantom's class on the removal path); unreached by every registered family |
| `kernel/src/tx/relevel.ts:465` `saveRecord` children; `kernel/src/tx/writers.ts:549` `childrenOf` | finer (+ 1) | the record's ring / face box (+ 1 / the stored box) → parent filter | consistent (children lie inside the parent's box); not edited |
| `kernel/src/index/query.ts:271–280` `pointLocate`'s coarser fallback, and its callers (layout growth/capacity, enceinte, infill, site water, testkit) | coarser than the query's level | route → route (`faceRouteRings` on the query's level n) | consistent by contract (§2.2 rule 3: a level-n query reads the level-n route); not the mismatch |
| `model/src/match/source.ts:29` | the asked level | route → owner (no exact test) | consistent; not edited |

**NO-SHIFT and census (J264, N-58).** A differential probe in the lane's mirror (a copy of `bfuzz.test.ts` logging,
after every insertion, the level, class, outcome code and detail and the sha-256 of `contentPrint` — vertices, edges,
rows and every face record with its rings, kind, owner, stage and parent's ring): the three B-FUZZ families and the four
replays at the PR size, `PLAT_FUZZ_SEED=4242`, on the pre-round sources (rewalk.ts and snapRound.ts hash-equal to the
landed record, `0c82afba…`, `0c132a19…`) and on the round's: **89 409 insertions, byte-identical** (sha-256 of the log
`15937fec5b53a492…` both). Outcomes, identical before and after: committed 70 563; E_KEPT 6 335, E_BELOW_MIN_ANGLE 3 222,
E_BELOW_MIN_EDGE 3 026, E_OUT_OF_RANGE 2 835, E_LEVEL 1 981, E_DEGENERATE 1 444 (UNLAWFUL input classes the families
draw on purpose — kept content, an optional chain's precision, out-of-range values, a chain leaving every L0 face,
degenerate chains; REFUSE, typed, as before); **E_INVARIANT 3** — 'insert: no route from (1157, 44) to (3314, 3203)',
'(1629, 3817) to (898, 1931)', '(884, 3957) to (2159, 3311) keeps clearance (§3.10) within the fidelity bound (N-43)',
all mandatory, LAWFUL, the counted N-43 bound class (KI-1; verdict MAKE-IT-SUCCEED in insertChain's class, N-c1-1 /
N-c2-5), unchanged; **the new E_INVARIANT (`… lies under the L… face …`) 0**. The bands family (M0-a-09's B-FUZZ
corridor networks, `PLAT_FUZZ_RUNS=2000`, `PLAT_FUZZ_SEED=4242`, a copy of its `bfuzz.test.ts` logging corridorUnion's
and bandUnion's outcome, classes and `contentPrint` hash): 3 753 lines byte-identical (`99a80bded95e01cb…`; corridorUnion
2 000 committed, bandUnion 1 752 committed and 1 E_INVARIANT, both runs); the new E_INVARIANT 0. Q53 itself: pre-round a
phantom commit (four record rows of `allProblems`), now committed healthy.

**Mutants (J183; the lane's mirror, `--bail=1`, `packages/kernel/test/insert/step3-5/` on the kernel project, B-FUZZ
included at the PR size; each mutated file restored from the tree and `cmp`-checked).**

| id | mutant | result |
|---|---|---|
| M1 | the pre-round lookup (1 cm midpoint box, route-filtered, walk-tested), the guard kept | **killed** by sliver.test.ts 'Q53: corridorUnion …' (`r.ok` false): Q53 now REFUSES — corridorUnion and insertChain alone both `E_INVARIANT insert: the L1 record 0 lies under the L0 face 0 that a region of the L2 batch would be materialised from (§2.2 rule 2)`, `allProblems` [], L1 records [0 … 4] — never a phantom |
| M2 | the pre-round lookup and no guard (the pre-round behaviour) | **killed** by 'Q53: corridorUnion …' (classes {band [1, 3, 2, 8] …}, the phantom) |
| M3 | the guard removed (`recordUnder` answers null) | **killed** by 'a coarser record with records of a finer level under it …' |
| M4 | the guard's text changed ('lies under' → 'lies beneath') | **killed** by the same test (text pinned verbatim) |
| M5 | the own-child exemption removed | survives — equivalent under the new lookup (N-s8-2) |
| M6 | the topological candidates asked at the origin only (no reach) | **killed** by B-FUZZ random: 736 E_INVARIANT refusals (the guard caught every miss; 0 invalid outputs) against the cap 12 |
| M7 | the guard's parent climb one level short | **killed** by B-FUZZ random (55 false E_INVARIANT against the cap 12) |
| M8 | the guard's refusal not returned at the call site | **killed** by the guard test (E_LEVEL instead of E_INVARIANT) |
| M9 | the midpoint fallback unwidened | survives (N-s8-3) |
| M10 | the level-n record query round the new edges back to + 1 cm | survives (N-s8-3) |
| M11 | `recordHolding` unwidened | survives (N-s8-3) |

The Q53 pins on the pre-round sources (the mirror before any edit): both Q53 cases red ('two L1 records share one view
face', 'L2 face 0/1 does not lie in its parent (L1 face 5)'); on the round's sources green.

### Notes (not failing lines)

| id | note | handling | where |
|---|---|---|---|
| N-s8-1 | **Two lookups outside the owns read the same mismatch** (survey above): `invariants/common.ts:111` `faceLeftOf` (± 0 cm) and `tx/relevel.ts:168` `recordLeftOf` (± 1 cm; coarser levels on the demotion path) ask the index below the 2.84 cm multi-level reach while their exact test reads the walk. Not reached by any registered family; the fix is the reach (`WALK_REACH_CM`, exported by `insert/rewalk.ts`) in each. | the session: M0-a-14's and M0-a-06's next rounds (KI) | invariants/, tx/ |
| N-s8-2 | **The guard's own-child exemption is unpinned** (mutant M5 survives): a record this batch materialised from the coarser face is found by the topological lookup at its own level first, so the guard never meets it — equivalent under the new lookup; kept as defence against a lookup gap. | none (equivalent) | rewalk.ts `recordUnder` |
| N-s8-3 | **The widened boxes outside Q53's path are unpinned** (M9, M10, M11 survive): the midpoint fallback (cycles of new edges alone), the level-n record query round the new edges and `recordHolding` answered rightly on every registered case before (the probe is byte-identical; CONFIRMED), and a case that needs the reach — a record read through Steiner vertices two or more levels finer, a cycle of new edges alone inside a sub-hot-pixel sliver, or a point inside such a sliver of a finer record — is not reached by insertChain's families (PLAUSIBLE: step 2 attracts a vertex that near an edge onto it, and step 3 shares a segment that close as a stretch). A constructed arena pinning each is a hardening test. | hardening pass (KI) | rewalk.ts, snapRound.ts |

## Closing check of S8 (lane `check/M0-a-05-close-s8`, 2026-10-13; verdict PASS in `checks/M0-a-05-s8.md`)

None of these is a blocker (the verdict says why for each). Mutant names are this check's (`checks/M0-a-05-s8.md`,
"Targeted mutants"); "pre-round" means the reconstruction the verdict describes (the pre-round sources are not on this
machine), "the differential" the verdict's instrumented run over the step3-5 families (2 000 runs, seed 20261013) and
the bands family (1 000 runs).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s8c-1 | **The survey, re-done by the closing seat, routes the same two sites** (`checks/M0-a-05-s8.md`, "The survey"): `packages/kernel/src/invariants/common.ts:111` `faceLeftOf` (segment box ± 0 cm, ring-membership test; a sub-edge whose both ends are Steiner vertices off the route on one side has a box the route misses and a corner the other face holds → −1 where a record holds the edge: a false "no record" at the commit check) and `packages/kernel/src/tx/relevel.ts:168` `recordLeftOf` (± 1 cm; callers `relevel.ts:544`, `:553`, the demotion's materialise plan reading coarser levels; a miss below the multi-level reach plans own children — the phantom's class on the removal path). Every other site is consistent by its box (the walk's box, ± 4 cm, or the route by contract). Confirms the builder's N-s8-1 independently. | the session: `WALK_REACH_CM` (exported by `insert/rewalk.ts`) in both, with a constructed pin each (two finer Steiner vertices on one route edge inside a sliver), in M0-a-14's and M0-a-06's next rounds | the session (KI) |
| N-s8c-2 | **The widened level-n candidate box can reorder the re-walk's regions.** The differential's INSTR2 pass: every record a cycle was given lies in the + 1 cm union too (0 regions found only through the reach, 20 801 + 395 842 re-walks), but in one bands case (three logged lines: its commit and two replays) the records are processed `[0,1,5,6]` where the + 1 cm box orders them `[0,5,1,6]` (an L0 batch; a record meets an earlier edge's wide box only). `allocFace` then numbers the new faces in another order — a face SLOT renumbering, nothing else: `contentPrint` is sorted and the determinism print is slot-free by §3.3 (`testkit/src/determinism/print.ts`), so no digest or persisted output moves; an op's result that names faces by slot (bandCore's classes) names the same faces under other numbers. | none now; recorded so a future slot-visible digest or a register pinning slot ids knows the cause (the author's NO-SHIFT probe at seed 4242 could not see it, by design) | M4 (if a slot-visible output ever appears) |
| N-s8c-3 | **`coarserRegion` charges more work.** The differential measured the new lookup's `tx.facesWalked` at 20 800 against the pre-round midpoint lookup's 15 322 over the step3-5 families (+36 %), 3 978 against 3 414 on bands; at both work-limit checks of `rewalk` the verdict never changed (0 flips). A timing-phase observation for §12.4's "≤ 8 µs per insertion" bar, not a gate here (this machine is not §12.1's). | the timing phase (M0-t-01 / M0-t-02) reads it with the bar | timing-phase |
| N-s8c-4 | **MK and ML survive at 1 000 runs, equivalent on lawful input.** MK (the level-n record query round the new edges back to + 1 cm): a record whose old ring bounds a cycle passes through one of the new edge's level-n endpoints, which lie on its level-n route, so the + 0 box already meets it; a floating new edge lies ≥ `minEdge` from the record's boundary by §3.10's clearance row, so the route-versus-walk strip (≤ 2.84 cm) never holds its box corner. ML (`recordHolding` back to 1 cm): a new level-n edge whose midpoint lies inside a finer record's strip passes within 2.84 cm of a finer edge, which `checkEdge`'s attractCm row refuses E_KEPT first. CONFIRMED on the families by the differential (`recordHolding` 0 differences at reach 3 / 1 / 0 over 470 794 insertions). Same handling as the builder's N-s8-3, for a stated reason. | a constructed arena (a Steiner vertex two levels finer inside a sliver, a cycle of new edges alone beside it) as the hardening pin | M4 |
| N-s8c-5 | **The Q53 pin's two doors are not redundant** (mutant ME, no reach in `holderAt`): the chain alone refuses E_INVARIANT (the guard catches the miss) while the corridorUnion batch still commits healthy — its earlier chains leave a route vertex at the old half-edge's origin, so the point box meets the sliver's record (PLAUSIBLE, from the logged candidates). A third door — the sliver chain after one unrelated L2 chain in the same transaction — would pin the reach through the batch path too. | one more case in `sliver.test.ts` | M4 |


## Hardening round S9 (lane `build/M0-a-05-fix-s9`, 2026-10-14 – 2026-10-20; J237 (2), J264, J290 / N-58, N-61 (1) – (3); census R-04 – R-06, R-42; queue rows L26, L8; C-0423)

The session's hardening round for the router: the census's router classes and the rulings RQ1 – RQ3 first, then the
inventory's FIX-NOW rows of this file (N-2 … N-s8c-5) and M0-a-15's note 1. Every change lies in `insert/` and
`test/insert/step3-5/` (the item's owns). Source files changed against the S8 record: `insert/insertChain.ts`,
`insert/snapRound.ts`, `insert/stretch.ts`; `crossings.ts`, `wedge.ts`, `rewalk.ts`, `index.ts` are hash-equal to it. No
folder index or barrel export was added, removed or renamed (J263 Q1); `ChainCtx` gains optional fields only (`own`,
`strictEnds`, `path`, `provenance`); `walkRun` became a file-level export of `snapRound.ts` for N-5's unit pin (not in
the index). The round ran on four Claude Code cloud containers in turn (2026-10-14, -18, -19, -20; the scratch of each was
lost at its restart, so the census rests on the tree's `caps.ts` table and the lane's CHECKPOINT lines, and the mutant
table below was re-run on this container from a mutant set re-derived from the pins' own comments).

**What the round changed.**

1. **RQ1 / N-8 — a route never retraces an edge (item 130 (d), §3.6 step 4).** `snapRound.ts` keeps the segment's path
   (`SegmentPath`: the vertices in order, a mark at each); where a landing or an attraction would lead the route back
   through a vertex x already on it, the path is cut back to x (everything written since undone, `back`) and routed on
   from x to the segment's end with the cut-off vertices left out of step 3. The cut unwinds to `snapRound`, which
   restarts the route from x in a loop (`restart`; never deeper on the stack), capped at `MAX_CUTS` = 256 (past it the
   reading is refused, `RETRACE_DETAIL`, a route keeping nothing, and insertChain tries its next reading). A cut whose
   cut-off part holds a vertex the route placed before x's mark (`placedBefore`) would leave that vertex off the route:
   the route goes on from where it stands with x excluded instead, and a second such re-entry refuses the reading. A
   function of the arena and the input; it moves nothing. N-8's ring commits as a simple path under `invisible` and
   under seven `way` keys in one L0 batch.
2. **RQ3 / R-42 — a chain given again under its own key is that run (item 130 (e), §3.6 *Roles on shared stretches*).**
   For the roles of one chain per entity (tx's `LINEAR_PARTS` = 1, held in `stretch.ts` by registry id, `oneChainRole`,
   so the insert folder does not import `tx/`), `ChainCtx.own` is the run the key carries: step 2 lands a point on the
   run's vertex nearest it within √2 · `attractCm` (`nearestOwn`), and a segment between two such landings follows the
   run (reading r0, `ownWalk`: the shortest path along the key's pieces through vertices within the fidelity bound).
   Copies at 0, 10, 19.2, 29.7 and 36.1 cm commit as the run, nothing written (the content print byte-identical); a
   40.3 cm copy is another chain under the key, refused by role consistency at the commit.
3. **R-04 / R-05 — the strict route's second reading (C-0423).** After the strict route as it stood (r2) and before the
   route along existing edges, r2b: the strict route passing over the neighbours of the segment's own ends (they lie in
   the new edge's one-ring, which §3.10's clearance exempts). r2 keeps its place, so a segment r2 kept routes as before
   (N-37); r2b's refusal is never the segment's (r2's is). The order is the census's finding: with r2b in r2's place,
   seed 7507's case 6 789 and the register's −5203 case were lost.
4. **Every remaining refusal for the bound names its class (§13.1 (3); N-58).** `refusalClass` reads the design route
   before it is undone and appends `class S | D | W | P | A | E | V | C (notBuilt #2, M4): …` to the detail (the
   farthest vertex's provenance, `ChainCtx.provenance`, tagged as the route places it); the code and the detail's
   prefix are unchanged. An optional chain's refusal keeps E_BELOW_MIN_EDGE and '(N-43)' and appends the in-bound
   passes' precision stops (N-18).
5. N-6: the last clearance check refuses E_INVARIANT (`insert: <problem>`), never a bare Error. N-12: B-FUZZ's
   properties take `FUZZ_PARAMS` (`endOnFailure`). N-c1-4: `vertexDist2` dropped. N-c2-4: the module comment reworded.

### The refusal census (J264 (4), N-58)

The measure is C-0221's: the three step3-5 B-FUZZ properties and the fidelity property, 31 seeds × 10⁴ cases each at the
PR size, counted by `countedRefusal` (E_INVARIANT, and an optional chain's E_BELOW_MIN_EDGE naming '(N-43)'), plus the
census's own seed 20261013 (refusal-census.md §1.1). The after-run is the round's final sources (2026-10-19 02:23 –
08:47, W = 1, exit 0; the lane's CHECKPOINT lines 10457 – 10469); its per-seed table is `caps.ts`'s, which this round
lowered to it (J207's ratchet). **No cell rose, seed by seed and property by property.**

| property | before (C-0221, S6's code) | after (S9) | change |
|---|---|---|---|
| random | 58 + 49 = 107 (max 9) | 55 + 48 = 103 (max 8) | −4 |
| constructive | 31 + 15 = 46 | 31 + 14 = 45 | −1 |
| mandatory-only | 47 + 2 = 49 | 47 + 2 = 49 | 0 |
| fidelity | 3 | 3 | 0 |
| seed 20261013 (census) | random 0 + 3, constructive 0 + 1, mandatory 2 + 0, fidelity 0 | random 0 + 2, constructive 0 + 1, mandatory 2 + 0, fidelity 0 | −1 |
| registers | fix1-case1 s36, fix1-case2 s31 refused E_INVARIANT (R-04) | both commit within the bound, the arena valid | −2 |
| bands family (M0-a-09's `arr/bands/bfuzz.test.ts`, run as a gate, seed 20261013, 10⁴) | kerb 6, corridorUnion 8, bandUnion 6 (R-06's 20), own 0, tileRings 0 | kerb 6, corridorUnion 8, bandUnion 6, own 0, tileRings 0 | 0 |

The after-run's 205 counted refusals (31 seeds + 20261013) by class: **S 100, E 52, D 22, W 17, V 10, P 4, A 0, C 0**;
the bands family's 20: S 10, E 8, D 2. Every one is LAWFUL input (R-04: a mandatory chain cannot fail for precision;
R-05: the optional chain has a lawful place; R-06: OUR OWN INTERMEDIATE, the overlay's chains replay on insertChain
alone). Verdict MAKE-IT-SUCCEED for every class; the round made it succeed where an in-bound route exists under the
design as written (the retrace cut, the own-run landing, r2b: −8 counted, the two registers), and names the remainder
**notBuilt #2, milestone M4**, class by class (N-s9-4 below has each class's geometric cause and what success needs). No
refusal is capped silently: every counted refusal carries its class in its detail, and B-FUZZ fails above the lowered caps
(12 / 8 / 8 / 3 at 10⁴).

### Row-by-row outcome

| row | outcome | evidence (the pin, its file; the mutant it kills, table below) |
|---|---|---|
| census R-04, R-05 (KI-1 / Q44) | **fixed** where an in-bound route exists (−8 counted, 2 registers rescued); the remainder **named notBuilt #2 (M4)** by class (N-s9-4); caps lowered 107 → 103, 46 → 45 (49, 3 held) | the census above; `register.test.ts` fix1-case1 / fix1-case2 commit (STRICT); `router.test.ts` S9 register strict-first (ORDER), `bfuzz.test.ts` seed 7507 case 6 789 (ORDER); the class text in every register detail (CLS); `router.test.ts` N-46 (4) caps at S9's measure |
| census R-06 (bands overlays) | the same router class; **held** (20 = 20), every one classed; the overlay's own construction (M0-a-09's arr/) unchanged and not edited | the bands gate at seed 20261013 (above) |
| RQ1 (N-61 (1); item 130 (d)) | **fixed** | `router.test.ts` 'RQ1 …': N-8's ring under `invisible` (s6 a simple path, the spur P–Q carrying s4 alone) and under `way` keys through M0-a-06's transaction (RQ1-cut); `bfuzz.test.ts` seed 5309 case 9 852 (DEEP), constructive 5309 case 9 765, the three second-re-entry cases (RETR); the S9 register's cut-to-end (CUTLOCAL); ORPH, ORPH2, MAXCUT; M0-a-08's booleans fixture PROPOSED (below) |
| RQ2 (N-61 (2)) | **REPORTED** — the `(shape, chain)` vertex row needs the registry role `shape` (M0-a-01 / M0-a-02's `arena/roles.json`, a registry version raise: a persisted format) and tx's strip in `removeEdges` / `clearFiner` (M0-a-06's `tx/writers.ts`); neither is this item's file and the row cannot be written without them (the exact lines below). The pin waits for a-06's round | — |
| RQ3 (N-61 (3); R-42, Q68) | **fixed** | `stretch.test.ts` 'RQ3 …': copies at 0, 10, 19.2, 29.7, 36.1 cm commit as the run (content print byte-identical; RQ3-own, RQ3-band), the same-batch copy through the transaction, the 50 cm zig-zag walk (RQ3-walk), the 40.3 cm copy refused by role consistency; `bfuzz.test.ts` the RQ3 constructive property; `insertChain.test.ts` oneChainRole = LINEAR_PARTS (RID); x-06's re-pin PROPOSED (below) |
| N-2 | **pinned** | `crossings.test.ts` 'N-2: the wedge cap's equality' (K5) |
| N-3 | **pinned** end to end | the S5 register's six cases each reach `readings`' final E_INVARIANT (every reading refused) and assert the code, the exact detail, nothing written, no throw (`router.test.ts` 'N-44 (4): S5's residual register'; K8). The census shows the branch is reached by lawful input (200 times in 31 × 4 × 10⁴), so no test-only hook was added |
| N-4 | **pinned** | S9 register strict-refused (−6421 random case 7 448: the strict route refuses E_BELOW_MIN_ANGLE, the chain's outcome; K9) |
| N-5 | **pinned** | `stretch.test.ts` 'N-5: the stretch walk from j takes the step to its leave point k' (K15) |
| N-6 | **fixed** | `router.test.ts` 'the final clearance check: … refuses the op E_INVARIANT' (N6) |
| N-7 | **pinned** | `bfuzz.test.ts` 'N-7: the golden digest of a fixed B-FUZZ slice' (`3e8ec437…`, first recorded here, C-0423; re-recorded only with a choices row; GOLD2) |
| N-8 | **fixed** as RQ1 (the ruled form: the cut) | as RQ1 |
| N-11 | **pinned** KR, KQ; KD obsolete (its subject, `clearSince`, is gone since R3: every reading is judged by one `kept()`); KI, KL equivalent (N-s9-2); KO survives, unreached (N-s9-1) | S9 register endpoint-refused (KR); KQ as the table says |
| N-12 | **fixed** | `caps.ts` `FUZZ_PARAMS`; `router.test.ts` 'N-12: a failing B-FUZZ property reports its first failing case unshrunk' (N12) |
| N-14 | **pinned** Q14; Q15 net-covered (N-s9-3) | S9 register passover-rescue (Q14) |
| N-18 | **fixed** | the S6 register's details carry the stops (`router.test.ts` 'S6's register', exact detail; N18) |
| N-19 | **pinned** | `lifecycle.test.ts` kind `pass3-free` (B-FUZZ constructive seed 5101; NOFREE shows the fixture takes the free spot); Q19 killed by `router.test.ts` 'reading 1 lands the point at a free spot' (the journal); the undo path restores by savepoint (N-s9-6) |
| N-22 | **pinned** | `lifecycle.test.ts` 'N-22: ownShapeVertex on a second op of the chain's key' (M5, M10) |
| N-23 | **REPORTED** as RQ2 | as RQ2 |
| N-c1-4 | **fixed** (`vertexDist2` dropped; comment-only class) | the source |
| N-c1-6 | **pinned** | `stretch.test.ts` SH1, OE1, EX1, PF1 (SH1, OE1, EX1, PF1) |
| N-c2-1 | **pinned** | `promote.test.ts` 'N-c2-1: a finer vertex step 3 routes a segment through is promoted' (RT1) |
| N-c2-3 | **pinned** | `crossings.test.ts` 'N-c2-3 PO1' (PO1); `stretch.test.ts` NP1 (NP1) |
| N-c2-4 | **fixed** (comment) | insertChain.ts's module comment now reads as the code does: "The first pass's refusal other than E_INVARIANT, and the second pass's other than one for the bound, are final; otherwise only a later pass's commit replaces the refusal before it, so a chain the third and fourth passes refuse too keeps the second pass's code." |
| N-s8-3 | **pinned** M9; M10 / M11 equivalent on lawful input (N-s8c-4's reading, unchanged) | `sliver.test.ts` 'N-s8-3: the midpoint fallback reads its holder within WALK_REACH_CM' (M9) |
| N-s8c-5 | **pinned** (the third door added; ME is killed by the chain-alone door, not by the third, which commits under ME: N-s9-7 — the note's expectation shown wrong by the probe) | `sliver.test.ts` 'Q53 through insertChain after an unrelated L2 chain in the same transaction' (the batch path's outcome); ME killed by 'Q53 through insertChain alone' and lifecycle split-route |
| M0-a-15 note 1 | **REPORTED** — making the re-walk's record and work independent of the stored outer start moves face slots that M0-a-09's dead-end tests pin (tried 2026-10-14 and reverted; the lane's CHECKPOINT 10431): a declared shift in another item's pins, or the session's reading that a load is outside §3.3's identical-next-edit list (C-0207 (5)). The session's ruling | — |
| L8 (queue) | **judged and pinned**: split faces take the split face's stage rank (§2.2 rule 4: "a split face's parts both inherit its owner and stage rank until the stage re-owns one") — the code is right | `rewalk.test.ts` 'a split face's two parts both inherit its kind, owner and stage rank' — a test already in the folder, unchanged this round, which kills mutant L8 (the stage rank not inherited) |
| L26 (queue) | **REPORTED** — the `(shore, <id>)` text the water stage reads is the commit's role-consistency message (`tx/tx.ts:442`, `invariants/batch.ts:571`), not insertChain's; a structured field on the refusal is a `KernelResult` change (`num/result.ts`, M0-a-01) written by tx (M0-a-06) and read by M0-e-03 — an exported API (J263 Q1), the session's ruling | — |

### The round's mutant table (J169, J183)

43 targeted mutants, each aimed at a row's promise or a pin's claim, run on this container (2026-10-20 19:15 – 20:20) in
the lane's one mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s9/plat`, a `cp -a` copy: no link into
the tree, testkit's `@plat/kernel` resolving inside it; every mutated file copied back from the tree and `cmp`-checked
before the next). Each ran `vitest run --project kernel --maxWorkers=1 --bail=1` on its pin first and, where the pin
survived, on the whole item folder `test/insert/step3-5/` (B-FUZZ included). The base run on the unmutated mirror (equal
to the tree by `diff -rq`) had every pin green and running more than 0 tests. **39 of 43 killed; KI, KL (equivalent,
N-s9-2), KO (unreached, N-s9-1) and Q15 (net-covered, N-s9-3) survive the folder (270 / 270 each).**

| mutant | row | file | change | result | the test that kills it |
|---|---|---|---|---|---|
| RQ1-cut | RQ1 / N-8 | snapRound.ts | `const reenters = (x: VertexId): boolean => trail !== null && x !== a &…` → `const reenters = (x: VertexId): boolean => false && trail !== null && …` | killed (pin) | router.test.ts 'RQ1': N-8's ring under `invisible`: s6's rows form a simple path (its two ends of degree 1, every other vertex 2); t… |
| ORPH | RQ1 | snapRound.ts | `t.back(t.marks.get(x));` → `(removed)` | killed (pin) | router.test.ts 'RQ1': N-8's ring under `invisible`: s6's rows form a simple path (its two ends of degree 1, every other vertex 2); t… |
| ORPH2 | RQ1 | snapRound.ts | `t.restart = { from: x, pass, exclude: withAll(exclude, ...cut.filter((…` → `t.restart = { from: x, pass, exclude };` | killed (folder) | the folder: 400 random cases (seed 4242) and 200 constructive sequences (seeds 1 – 200): the digest of every outcome and a… |
| MAXCUT | RQ1 | snapRound.ts | `const MAX_CUTS = 256;` → `const MAX_CUTS = 0;` | killed (pin) | router.test.ts 'RQ1': N-8's ring under `invisible`: s6's rows form a simple path (its two ends of degree 1, every other vertex 2); t… |
| DEEP | RQ1 | snapRound.ts | `t.restart = { from: x, pass, exclude: withAll(exclude, ...cut.filter((…` → `return route(ctx, x, t.end, pass, withAll(exclude, ...cut.filter((v) =…` | killed (pin) | bfuzz.test.ts 'seed 5309, its 9 852nd case': the random family's seed 5309, its 9 852nd case replayed (round S9): the retrace cut unwinds, no crash, every … |
| CUTLOCAL | RQ1 | snapRound.ts | `t.restart = { from: x, pass, exclude: withAll(exclude, ...cut.filter((…` → `return route(ctx, x, b, pass, withAll(exclude, ...cut.filter((v) => is…` | killed (pin) | router.test.ts 'cut-to-end': cut-to-end: constructive seed 6101 (5 chains) — commits 139ms |
| RETR | RQ1 | snapRound.ts | `if (exclude.has(x)) return err('E_INVARIANT', `${RETRACE_DETAIL} at ($…` → `(removed)` | killed (pin) | bfuzz.test.ts 'a second re-entry refuses that reading': the census's seed −5801 case 21302 (round S9): a second re-entry refuses that reading, a later one commits, ev… |
| RQ3-own | RQ3 | insertChain.ts | `if (ctx.own != null) { ⏎     const o = nearestOwn(ctx, pt);` → `if (false) { ⏎     const o = nearestOwn(ctx, pt);` | killed (pin) | stretch.test.ts 'RQ3': moved (22, 20), 29.7 cm, in a later batch: committed as the run — every point on the first copy's vertex, the … |
| RQ3-band | RQ3 | insertChain.ts | `if (d > RELAND_SQ) continue; ⏎     if (d < bestD` → `if (d > ATTRACT_SQ) continue; ⏎     if (d < bestD` | killed (pin) | stretch.test.ts 'RQ3': moved (22, 20), 29.7 cm, in a later batch: committed as the run — every point on the first copy's vertex, the … |
| RQ3-walk | RQ3 | insertChain.ts | `if (ctx.own != null && ctx.own.vertices.has(a) && ctx.own.vertices.has…` → `if (false) {` | killed (pin) | stretch.test.ts 'zig-zag': given again by every other point of a 50 cm zig-zag: each segment walks the run through the skipped vertex, no… |
| RID | RQ3 | stretch.ts | `new Set([0, 4, 20, 24, 25, 26, 27])` → `new Set([0, 4, 20, 24, 25, 26])` | killed (pin) | insertChain.test.ts 'oneChainRole': equals LINEAR_PARTS' rows of one part over the whole registry 13ms |
| STRICT | R-04 / R-05 | stretch.ts | `ctx.strict && ctx.strictEnds === true ?` → `false ?` | killed (pin) | register.test.ts 'fix1-case': fix1-case1 (M0-a-08 fix1, buffer case 1): s36 (−17146, 12375) → (−17837, 10679), refused E_INVARIANT through r… |
| ORDER | R-04 / R-05 | insertChain.ts | `ctx.strict = true; ⏎   const r2 = routed(ctx, log, a, b); ⏎   ctx.stri…` → `ctx.strict = true; ⏎   ctx.strictEnds = true; ⏎   const r2 = routed(ct…` | killed (pin) | bfuzz.test.ts 'seed 7507, its 6 789th case': the random family's seed 7507, its 6 789th case replayed (round S9): the strict route before its second readin… |
| CLS | R-04 / R-05 (class named) | insertChain.ts | `return `class ${k} (notBuilt #2, M4): the design route's farthest vert…` → `return `class ${k}: the design route's farthest vertex` | killed (pin) | router.test.ts 'register': oob:crossing-fallback: random seed 51961 case 6288 — insert: no route from (3475, 506) to (3374, 3459) keeps c… |
| N18 | N-18 | insertChain.ts | `if (stops.length > 0) result = err(` → `if (false) result = err(` | killed (pin) | router.test.ts 'S6's register': random seed 5309 case 7977: every route from (2247, 2237) to (1769, 2634) keeping clearance leaves… 252ms |
| K5 | N-2 | wedge.ts | `if (moveCm * moveCm > WEDGE_CAP_SQ) return ok(false);` → `if (moveCm * moveCm >= WEDGE_CAP_SQ) return ok(false);` | killed (pin) | crossings.test.ts 'N-2': mandatory: √5 408 (its square exactly 5 408) is routed, W_WEDGE_ROUTED at the corner; the next double above is… |
| K8 | N-3 | insertChain.ts | `return err('E_INVARIANT', `insert: no route from` → `throw new Error(`insert: no route from` | killed (folder) | the folder: the random family's seed −1863295922, its 8 346th case replayed (N-42 (b)): 0 crashes, 0 invalid outputs 120ms |
| K9 | N-4 | insertChain.ts | `if (!r2.ok && !retraced(r2)) return r2;` → `(removed)` | killed (pin) | router.test.ts 'strict-refused': strict-refused: random seed -6421 (2 chains) — refused E_BELOW_MIN_ANGLE 425ms |
| K15 | N-5 | snapRound.ts | `if (dir * (tw - tu) <= 0 \|\| dir * (tw - tk) > 0) continue;` → `if (dir * (tw - tu) <= 0) continue;` | killed (pin) | stretch.test.ts 'N-5': N-5: the stretch walk from j takes the step to its leave point k, not the one nearer the line past k 27ms |
| N6 | N-6 | insertChain.ts | `if (problem !== null) return refuse({ code: 'E_INVARIANT', detail: `in…` → `if (problem !== null) throw new Error(problem);` | killed (pin) | router.test.ts 'the final clearance check': the final clearance check: a breach round the chain's writes refuses the op E_INVARIANT with the check's messa… |
| GOLD2 | N-7 | stretch.ts | `const reach = ctx.strict ? MIN_EDGE : ATTRACT;` → `const reach = ctx.strict ? MIN_EDGE : ATTRACT - 1;` | killed (pin) | bfuzz.test.ts 'N-7': 400 random cases (seed 4242) and 200 constructive sequences (seeds 1 – 200): the digest of every outcome and a… |
| KR | N-11 | insertChain.ts | `if (!r4.ok && r4.code !== 'E_INVARIANT') return r4;` → `(removed)` | killed (pin) | router.test.ts 'endpoint-refused': endpoint-refused: random seed -5407 (2 chains) — refused E_BELOW_MIN_ANGLE 216ms |
| KQ | N-11 | insertChain.ts | `const RELAND_MAX = 8;` → `const RELAND_MAX = 1;` | killed (pin) | router.test.ts: round (2 000, 2 000) at L0: (2 036, 2 000) at 36 cm and (2 030, 2 020) at 36.06 cm are candidates; (2 037, 2 0… |
| KI | N-11 | snapRound.ts | `dot > 0 && dot < l2) return t;` → `dot > 0) return t;` | survives | — (pin 83 passed (83); folder 270 passed (270)) |
| KL | N-11 | insertChain.ts | `if (other >= 0 && belowMinEdge(X[v], Y[v], X[other], Y[other]) && rout…` → `(removed)` | survives | — (pin 83 passed (83); folder 270 passed (270)) |
| KO | N-11 | insertChain.ts | `if (r.code !== 'E_INVARIANT' \|\| !landedNow \|\| (mark === null && pr…` → `if (r.code !== 'E_INVARIANT' \|\| (mark === null && prevMark === null)…` | survives | — (pin 83 passed (83); folder 270 passed (270)) |
| Q14 | N-14 | crossings.ts | `if (opts.passOver === true) continue; ⏎       return ok(null);` → `return ok(null);` | killed (pin) | router.test.ts 'passover-rescue': passover-rescue: constructive seed 5309 (4 chains) — commits 207ms |
| Q15 | N-14 | snapRound.ts | `(u) => u === l.vertex \|\| onPath(u) \|\| !inInputBound(ia, ib, P.x[u]…` → `(u) => u === l.vertex \|\| onPath(u))` | survives | — (pin 83 passed (83); folder 270 passed (270)) |
| Q19 | N-19 | insertChain.ts | `indexAdd(p, { kind: ITEM_VERTEX, level: n, slot: v }); ⏎       tx.jour…` → `indexAdd(p, { kind: ITEM_VERTEX, level: n, slot: v });` | killed (pin) | router.test.ts 'reading 1 lands': reading 1 lands the point at a free spot outside the strip, within the bound, keeping minEdge from both arms —… |
| NOFREE | N-19 | insertChain.ts | `return ok(f.value === null ? null : { kind: 'free', at: f.value });` → `return ok(null);` | killed (pin) | lifecycle.test.ts 'pass3-free': pass3-free (constructive, pass 3, 4 chains): undo restores the arena exactly; remove restores it exactly (prin… |
| M5 | N-22 | stretch.ts | `if (!ctx.journal.newPairs.slice(ctx.pairsFrom).includes(e) && !ctx.tx.…` → `(removed)` | killed (pin) | lifecycle.test.ts 'N-22': the pair clause: a second `base:0` op landing on the first op's edge at (2431, 2890) splits it with the flag k… |
| M10 | N-22 | stretch.ts | `if (p.roles.level[r] !== ctx.n \|\| !own.has(` → `if (!own.has(` | killed (pin) | lifecycle.test.ts 'N-22': the level clause, west to east: an L2 `base:0` V crossing the key's L1 run twice keeps both crossings' split f… |
| SH1 | N-c1-6 | stretch.ts | `<= tq) i += 1;` → `< tq) i += 1;` | killed (pin) | stretch.test.ts 'SH1': SH1: a position projecting exactly onto the run vertex M takes the sub-edge after it, M – B; one just before M… |
| OE1 | N-c1-6 | snapRound.ts | `const j = tq > tv ? i + 1 : i - 1;` → `const j = tq >= tv ? i + 1 : i - 1;` | killed (pin) | stretch.test.ts 'OE1': OE1: from M, a position projecting exactly onto M takes the vertex before it (A); one beyond M takes B 21ms |
| EX1 | N-c1-6 | snapRound.ts | `best = best < 0 ? w : nearerVertex(p, best, w, x, y);` → `best = w;` | killed (pin) | stretch.test.ts 'EX1': EX1: from a vertex with two route neighbours at different distances, the exit is the one nearer the target — e… |
| PF1 | N-c1-6 | stretch.ts | `g = onward; ⏎     path.push(g);` → `g = onward; ⏎     path[1] = g;` | killed (pin) | stretch.test.ts 'PF1': PF1: an L1 chain along an L1 street through two L3 plot-line ends shares every sub-edge of the piece between i… |
| RT1 | N-c2-1 | snapRound.ts | `if (L[ob.vertex] > n) promote(tx, ob.vertex, n, ctx.warnings, ctx.undo…` → `(removed)` | killed (pin) | promote.test.ts 'N-c2-1': an L2 mandatory chain passing the plot line's end 20 cm off commits through it, W_PROMOTED, the vertex at L2 w… |
| PO1 | N-c2-3 | crossings.ts | `if (opts.passOver === true) continue; ⏎       return ok(null);` → `continue;` | killed (pin) | crossings.test.ts 'PO1': the nearest qualifying point (1 975, 2 000) lies on s – t: null; passing over, (2 025, 2 000) on t – u 33ms |
| NP1 | N-c2-3 | insertChain.ts | `o * o * bestL2 < bestO2 * l2` → `o * o * bestL2 <= bestO2 * l2` | killed (pin) | stretch.test.ts 'NP1': NP1: of two L1 pieces equally near a point (20 cm above and below), nearestPiece names the first in the index … |
| M9 | N-s8-3 | rewalk.ts | `{ minX: x0 - REACH, minY: y0 - REACH, maxX: x0 + 1 + REACH, maxY: y0 +…` → `{ minX: x0, minY: y0, maxX: x0 + 1, maxY: y0 + 1 }` | killed (pin) | sliver.test.ts 'N-s8-3': an L1 triangle of new edges alone inside the frame walk's 3 cm dip below its route: placed under the L0 face, … |
| ME | N-s8c-5 | rewalk.ts | `{ minX: X[v] - REACH, minY: Y[v] - REACH, maxX: X[v] + REACH, maxY: Y[…` → `{ minX: X[v], minY: Y[v], maxX: X[v], maxY: Y[v] }` | killed (folder) | the folder: split-route (constructive, pass 2, 6 chains): undo restores the arena exactly; remove restores it exactly (pri… |
| N12 | N-12 | caps.ts | `export const FUZZ_PARAMS = { endOnFailure: true } as const;` → `export const FUZZ_PARAMS = {} as const;` | killed (pin) | router.test.ts 'N-12': a property over 300-point walks failing at its third case stops there: no shrink step, the case and its seed r… |
| L8 | L8 | rewalk.ts | `stage: r.base.stage, parent });` → `stage: 0, parent });` | killed (pin) | rewalk.test.ts 'stage rank': a split face's two parts both inherit its kind, owner and stage rank (§2.2 rule 4) 60ms |

ME is killed by `sliver.test.ts`'s chain-alone door (S8's), confirmed separately in the mirror (`1 failed | 4 passed`), and
in the folder first by `lifecycle.test.ts`'s split-route kind; N-s8c-5's third door commits under it (N-s9-7).

### PROPOSED for other items' rounds (not edited)

1. **M0-a-08 `packages/kernel/test/arr/booleans-buffers/booleans.test.ts:295 – 336` (Q74; RQ1's declared shift).** The
   fixture pins C-0205 (3)'s spur, which RQ1 removes: s6 now commits A–P–R–B, a simple path, and P–Q carries s4 alone
   (this item's `router.test.ts` 'RQ1 …' pins the same arena). Proposed: the describe reads "s6 commits without a spur
   (item 130 (d): a route never retraces an edge); P–Q carries s4's flow alone"; in the loop (lines 318 – 327) the P–Q
   test moves above the `if (!rows.includes(handleOf(p, 'arr:s6'))) continue;` line and gains
   `expect(rows).not.toContain(handleOf(p, 'arr:s6'));` beside its `toContain(handleOf(p, 'arr:s4'))`; lines 328 – 331
   become `// the ruled form (item 130 (d)): s6's edges form a simple path` · `expect(spur).toBeGreaterThanOrEqual(0);` ·
   `expect(s6Degree.get(`${String(Q.x)},${String(Q.y)}`)).toBeUndefined();` ·
   `expect(s6Degree.get(`${String(P.x)},${String(P.y)}`)).toBe(2);`; the net and label lines (332 – 335) unchanged (s4
   runs P → Q once: `sgn * net[spur]` = 1). RELATED@1000 on this round's sources reds exactly this test (`booleans.test.ts:329`, `expected -1 to be greater
   than or equal to 0`: no s6 row on P–Q).
2. **M0-x-06 `packages/testkit/test/edge/repins.test.ts:40` and `src/edge/ep01.ts:110 – 113` (RQ3's declared shift).**
   RELATED@1000 reds `repins.test.ts:77` for `EP-01/S5a/coincident` at seed 1658509524 (`expected 'absorbed' to be
   'refused-safe'`): the doubled wall trace is now absorbed as its run (item 130 (e); R-42), as the rulings expect. A probe
   in the lane's mirror ran the pin's five seeds (1658509524, 3650193777, 3114039644, 2262416935, 57196073) on the
   round's sources: every one `absorbed`, 'S5a: the batch committed', tries 1, `lawful` []. Proposed for x-06's round:
   `ep01.ts:374 – 381` (S5a's `coincident` pin) drops out of the pin table once x-06 re-measures the cell's share at
   1 000 (these five are its only refusing seeds); `repins.test.ts:40` leaves `REFUSED`; the rare list at line 70 loses
   'EP-01/S5a/coincident'; the absorbed test at lines 107 – 114 gains the five seeds ("absorbed on its first state —
   M0-a-05 S9, item 130 (e)"). `lawfulPlant` (`ep01.ts:110 – 113`) needs no change in form: `kernelTook` is now true for a
   coincident wall plant, so the plant reads lawful and the cell absorbed.
3. **RQ2 (M0-a-01 / M0-a-02, M0-a-06).** (a) `packages/kernel/src/arena/roles.json`: append
   `{ "id": 56, "name": "shape", "kind": "vertex", "rank": 56, "structural": false, "indexed": false, "knot": false, "since": 2 }`
   and raise `version` to 2 (a registry append: §2.2 rule 7's versioned table, so `encodeArena` and the digests of arenas
   holding such rows shift once — a persisted format, the session's). (b) `packages/kernel/src/tx/writers.ts:278 – 281`
   (`removeEdges`, the whole-chain branch): beside the knot rows, `for (const r of rowsOn(p, 'vertex', v)) if (p.roles.kind[r] === roleIdOf('shape') && p.roles.entity[r] === h) strip.add(r);`
   — and the same strip of the cleared key's `shape` rows in `clearFinerIn` (`writers.ts:589 – 597`, the vertex rows of
   a cleared level). (c) Then this item writes `(shape, <chain key>)` at the landing (`stretch.ts` `ownShapeVertex`'s
   caller, `applyLanding`: a landing that splits a run carrying another key's rows and is the chain's own input point
   keeps VERTEX_SPLIT and adds the row with the transaction's row writer), registers kind `coincident-foldback` (N-23's P3: A, C
   folding back, x attached at v and removed — print, chunk refs and level digests equal to before x; then C removed —
   A restored exactly), and M0-a-14's `dissolvableProblems` gains "a flagged degree-2 vertex between identical rows of
   two or more keys carrying no `shape` row".
4. **L26 (M0-a-01, M0-a-06, M0-e-03).** On `KernelResult`'s refusal arm (`num/result.ts:45`, `{ ok: false; code; detail; partial? }`)
   a field `rows?: readonly { role: string; entity: string }[]` (the refused key) set by `tx.ts`'s role-consistency refusal and `invariants/batch.ts:571`, read by `water/stage.ts:124` in
   place of the regex; the message texts unchanged (J263 Q6).

### Notes (not failing lines)

| id | note | handling | where |
|---|---|---|---|
| N-s9-1 | **KO survives** (`!landedNow` dropped, so a refused segment whose end this chain landed earlier — a closed run's first vertex — may re-land): no family case or register reaches it (the folder green under it, table above); the re-landing still moves only a vertex the op placed free (`freeSince` on the marks), so the mutant can change only which refusal a rare chain gets, never a committed result's validity (PLAUSIBLE; not traced to an input). | none now; a constructed case at M4 if `reland` changes | insertChain.ts |
| N-s9-2 | **KI and KL are equivalent on a valid arena** (N-11's readings, re-checked): `alongEdge`'s `dot < l2` bound only excludes a vertex beyond o on the line, which an arena keeping §3.10 cannot hold beside a level-≤ n edge to o; the re-landing filter excludes two unjoined vertices within `minEdge`, which §3.10 already forbids. | none (equivalent) | snapRound.ts, insertChain.ts |
| N-s9-3 | **Q15 is net-covered**: `stripLanding`'s nearest-vertex search without its in-bound skip returns an out-of-bound vertex only to the post-check, which returns the fallback; the census's candidate (seed 20261013 case 7 982) does not kill it, so no pin was kept. | none (net-covered) | snapRound.ts |
| N-s9-4 | **notBuilt #2 (M4) — the router's residual, by class** (KI-1). S (100 + 10): the crossing falls on the placement rule's endpoint fallback and no point of the crossed run near it keeps clearance — a sliver or fan of edges closer than `minEdge`, typically one an earlier chain's own acute corner made, its near-parallel incident piece never shared by step 3 (C-0177 (2)) and its sub-edge unsplittable (C-0284's split-ends rule): success needs step 3 to share a piece meeting the chain below `minFaceAngle`, or a rounding move of committed geometry, neither in the design as written. D (22 + 2): a step-3 contact carries the route beyond the bound along near-parallel geometry. W (17): a wedge corner or a corner's exit beyond the bound. P (4): a crossing placed on its run beyond the bound. E (52 + 8): the segment's own end, landed by step 2 off its input segment, so every route from it leaves the bound. V (10): every vertex within the bound, the segment not covered (the bound's segment-to-route half). A, C: 0. Each class's detail is pinned in the S5 / S6 registers. | M4 (notBuilt #2): the design's rounding moves on committed geometry and step 3 below `minFaceAngle` | insertChain.ts `refusalClass` |
| N-s9-5 | **MAX_CUTS is met in the families, never as the cause of a refusal**: the 2026-10-14 census run met it 6 times, each chain committing on a later reading; in the final run seed 6703's random case 1 372 refuses a chain whose design route met it, class S — the same outcome at 256 and at 4 096 cuts (the lane's CHECKPOINT 10470). | none; a KI row if a family ever refuses for the cap | snapRound.ts |
| N-s9-6 | **N-19's open question answered**: M0-a-06's transaction undoes a free-spot vertex by its savepoint, not by insert's journal, so Q19 (the vertex not journalled) is invisible to `lifecycle.test.ts`'s undo path; the journal's own assertion (`router.test.ts`) holds it. | none | insertChain.ts `landInBound` |
| N-s9-7 | **N-s8c-5's third door does not reach `holderAt`'s reach.** The door is added as the row asks (the sliver chain after an unrelated L2 chain in one transaction: both commit, the sliver's L2 records under L1 f4), but under mutant ME (no reach) it still commits — the pinned door itself, and every first-chain position probed in the mirror (a 169-point 300 cm grid of 150 × 100 cm first chains over the square: without ME all 169 batches commit; under ME 167 commit and at (3800, 2900) and (3800, 3500) the first chain itself is refused, the sliver chain never reached). With an earlier L2 edge in the batch, the sliver cycle's first old half-edge of level ≤ 1 is another one, whose origin lies on the L1 route, so the box without reach already meets the record (PLAUSIBLE, not traced further). So the note's expectation ("would pin the reach through the batch path too") does not hold; the reach stays pinned by the chain-alone door (ME red there). | none; the door's comment states it | sliver.test.ts |
| N-s9-8 | **The gates on this container's final sources (2026-10-20).** install --frozen-lockfile 0; lint 0 (eslint, probe-red ok); build 0; NEAR: the item folder with `kernel` and `kernel-tiny`, 24 files 540 / 540 at full strength (W = 1, 1 194 s); RELATED@1000 over `insert/insertChain.ts`, `insert/snapRound.ts`, `insert/stretch.ts` (W = 1): 434 files, 5 697 passed, 2 failed (11 776 s) — both reds the round's declared shifts in other items' pins, PROPOSED above: M0-a-08 `booleans.test.ts:329` (RQ1: no s6 row on P–Q) and M0-x-06 `repins.test.ts:77` (RQ3: EP-01/S5a/coincident at seed 1658509524 now `absorbed`, not `refused-safe`). No J176 bench red; neither foreign KI red (hausdorff, ladder-coverage) appeared in the selection. | the session: the two PROPOSED re-pins in a-08's and x-06's rounds | — |

## Closing check of S9 (lane `check/M0-a-05-close-s9`, 2026-10-20 – 2026-10-21; verdict FAIL in `checks/M0-a-05-s9.md` — RQ1 still failing across a chain's segments; the other 25 lines confirmed)

The one failing line is in the verdict (RQ1: a chain's next segment re-enters a vertex its earlier segment routed
through — the chain's own corner V beside an existing vertex W — and the rows retrace V–W and branch at W; the per-segment
cut does not see it). The rows below are NOT failing lines (the verdict says why for each). Mutant names are this check's
(`checks/M0-a-05-s9.md`, "The mutants"); the probes are `waves/check-M0-a-05/s9/probe/` (the mirror only, deleted).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s9c-1 | **The failing line's data (RQ1 across segments), for the fix round.** Probe `zzreenter.test.ts` (mirror): the framed 4 000 cm square, an L0 `way` from W east to (3 500, 2 000) or west / north as noted; the mandatory chain A → V → B with V 30 cm from W and both arms within `attractCm` of W. Four arrangements — W (2 030, 2 000) east of V (2 000, 2 000), arms to (2 500, 2 400) / (2 500, 1 600) (±38.7°) and to (2 400, 2 300) / (2 400, 1 700) (±36.9°); W (1 970, 2 000) west, arms to (1 500, 2 400) / (1 500, 1 600); W (2 000, 2 030) the dead end of a `way` from (2 000, 3 500), arms to (1 600, 2 500) / (2 400, 2 500). Under `invisible` each commits rows A–W, W–V, W–B (W degree 3, V degree 1), `W_ATTRACTED ×2` at W, `W_STRETCH_SHARED ×1` at V; under a `way` key through M0-a-06's transaction each is refused `(way, way:c1) branches`. In the constructive family at seed 20261013 (the class dump): `way:3` L2 mandatory (1237, 474) (286, 846) (1688, 3058) branches at (315, 855) (30.4 cm from the corner; edges 286,846–315,855 [way:3], 315,855–1107,553 [way:2; way:3], 315,855–1546,2829 [way:3]); `way:6` L4 mandatory (1554, 2783) (1708, 3030) (3513, 470) at (1705, 3001) (29.2 cm); `way:2` L4 optional (1796, 1447) (1712, 1533) (478, 258) at (1705, 1505) (28.9 cm). | the fix round: the cut over the chain's path; these seven as pins | the fix round (not M4) |
| N-s9c-2 | **The ORDER pin's reach.** This seat's mutant C10-ORDER (r2b run in r2's place and r2 after it) is killed by `bfuzz.test.ts`'s seed 7507 case 6 789 replay and NOT by the s9 register's strict-first case (−5203), which commits under it too (`1 passed`). The register row says the chain is lost "with ORDER" — true of the author's form of the mutant (r2b replacing r2), not of the swap. The promise (r2 keeps its place, r2b after) is pinned by the 7507 replay. | reword the strict-first row's claim, or add the case the swap alone changes | M4 |
| N-s9c-3 | **KO (`!landedNow` dropped) re-judged: fail-safe, not a stated promise's failure.** The clause differs only when the segment's end was landed by an EARLIER run of the same chain (a self-touching chain's shared vertex, `landed[idx] >= 0` on entry) and the segment's start is a free vertex this op placed: the mutant then re-lands that free start, which C-0209's rule ("a free end no route reaches with clearance") itself allows; every result is still judged by `wholeProblem` and `inFidelity`. Survives the pin and the folder@1000 (270 / 270); no family case reaches it (the author's N-s9-1 agrees). | none now; a constructed self-touching case at M4 if `reland` changes | M4 |
| N-s9c-4 | **N-3's "no throw" is pinned against a bare Error.** insertChain.ts:1284 – 1289 catches a thrown `Error` matching `/^(insert\|arena\|index): /` and refuses it E_INVARIANT with the message (N-44 (1)); so a mutant that throws `readings`' final refusal WITH the `insert:` prefix is caught and is the same refusal (equivalent but for the path through `refuse`), while this seat's C14-K8 (no prefix) is killed by the S5 register (7 failed). The S5 register's seven cases reach the final line on lawful input, so the inventory's white-box hook was not needed. | none | — |
| N-s9c-5 | **A chain whose next segment is attracted back through its own previous vertex commits as a re-ordered simple path.** At seed 20261013, 254 open simple well-separated chains (no two non-adjacent segments within 52 cm) whose first segment is 26 – 37 cm long and whose next segment passes within `attractCm` of the first vertex A commit as the path B–A–C: rows A–B and A–C, `W_STRETCH_SHARED ×1` (the second segment shares the chain's own edge A–B back to A). The row set is simple (A degree 2, B and C degree 1) and `placed` names A, B, C — the vertex order along the committed path differs from the input's. §3.6 and §3.10 say nothing of order; under a linear key the batch commits. Noted, not failed. Example: `way:x` L1 mandatory (2632, 2712) (2610, 2734) (2517, 2280): B (2610, 2734) is the path's end, A (2632, 2712) between it and C. | the session: whether "the connected simple chains the entity declares" means the input's order too (then the cut over the chain's path, N-s9c-1, gives A–B–C as drawn) | the session |
| N-s9c-6 | **A simple-run oracle over B-FUZZ's commits needs a simple-input filter.** The probe's oracle (a degree-1 vertex other than the chain's ends, or a degree ≥ 3 vertex, in the chain's own row set) flagged 27 194 of ≈ 27 000 commits at seed 20261013: the random family's chains cross and touch themselves by construction (random 6-point polylines mostly self-cross; thin rings fold), step 1 splits them into runs, and the constructive family's acute `vee`s share a stretch from the apex (a 15.8° closed triangle (1344, 858) (3278, 960) (3424, 1567) branches at (1407, 861) where its arms part — §3.11's self-touching reading, lawful as the design stands). The rulings' RQ1 "dead-end interior vertex" oracle would have the same reach; the round's not adding it is right. Filtered to simple inputs with every corner ≥ 60°, every segment ≥ 60 cm and no two non-adjacent segments within 80 cm, it isolates N-s9c-1's class exactly (3 of 3, 0 at ≥ 90°). | an oracle with that filter in B-FUZZ when RQ1's fix lands (the constructive family then holds the class at 0) | the fix round / M4 |
| N-s9c-7 | **The author's ledger row L-0651 names `packages/layout/src/water/stage.ts` as L26's reader; the reader is `packages/site/src/water/stage.ts:124`** (`/\(shore, ([^)]+)\)/`). A path slip in the row's text; the notes' PROPOSED (4) has the right file. | the steward corrects the row text with the author | — |
| N-s9c-8 | **The chain's own acute V branches its row set** (from N-s9c-6's probe): a closed or open chain whose corner is sharper than about 20° has its arms within `attractCm` of each other out to several times `minEdge` from the apex; step 3 shares that stretch, so the rows meet at the stretch's far end X with degree 3 (apex–X, X–arm 1, X–arm 2). Under a linear key the batch is refused `branches`; the constructive class `vee` commits it under `way` entities in B-FUZZ's `ins` path (no role consistency there). Whether a wall or way may be drawn with a 15° corner is a design question (§3.6 *Chain classes*: a corner below `minFaceAngle` commits with `W_ACUTE_CORNER` on a mandatory chain) — lawful by that sentence, refused at the commit by §3.10. | the session: a reading (the arms' shared stretch is the corner's own geometry, one run) or a named class | the session / M4 |
| N-s9c-9 | **Q15 (`stripLanding`'s nearest-vertex search without its in-bound skip) loses no rescue at the census seed.** Re-measured by this seat at the PR size: the three step3-5 properties at 10⁴, seed 20261013, under the mutant — random 0 + 2, constructive 0 + 1, mandatory 2 + 0, identical to the unmutated run (3 / 3 green, 287 s). The mutant is not equivalent in principle (an out-of-bound nearest vertex ends the search where the code would take the next in-bound one), only unreached by the registered seed; its effect, if reached, is a lost rescue counted by the census, never an invalid commit. | none now; a constructed case (a strip landing whose nearest vertex is out of bound and the next in bound) at M4 | M4 |

## Fix round S10 (lane `build/M0-a-05-fix-s10`, 2026-10-21 – 2026-10-25; the S9 closing check's failing line, RQ1 across a chain's segments; N-61 (1), item 130 (d); C-0424)

The S9 closing check (`checks/M0-a-05-s9.md`, N-s9c-1) failed the round on one line. The per-segment cut was real, but
`routed()` opens a fresh `SegmentPath` for every segment, so a vertex an earlier segment of the chain routed through was
an ordinary step-3 contact for the next one. The route then went back through it. In the probe the chain A → V → B,
whose corner V stands 30 cm from an existing vertex W and whose arms both pass within `attractCm` of W, committed the
rows A–W, W–V and W–B: W had degree 3, V was a dead end, and `W_STRETCH_SHARED` fell on the chain's own edge V–W. Under
a `way` key through the transaction it was refused `branches`. Every change of this round lies in
`insert/insertChain.ts` and `insert/stretch.ts` (`ChainCtx`'s optional fields `chainPath`, `reentry`, `runStart`), plus
`test/insert/step3-5/`. `snapRound.ts`, `crossings.ts`, `wedge.ts`, `rewalk.ts` and `index.ts` are byte-equal to the S9
record. No folder index or barrel export changed (J263 Q1). The round ran on three Claude Code cloud containers
(2026-10-21, 2026-10-24 and 2026-10-25). The scratch of the first two was lost, so this section rests on the tree, the
lane's CHECKPOINT lines and the runs of 2026-10-25.

**What the round changed (C-0423 (1) as amended; C-0424).**

1. **The passes watch the chain's path.** `insertChain` runs its passes with `ctx.chainPath = 'watch'`. Each run of the
   chain records where it starts in the journal (`ctx.runStart`). A kept reading of a later segment that shares a pair
   of the run's committed route so far again (`priorPairs`) marks `ctx.reentry`. That is a retraced edge: the segment
   was attracted back through a vertex an earlier segment routed through. A watching pass whose commit would carry a
   retrace refuses with `REENTRY_DETAIL` instead. This refusal is internal and never returned by the op.
2. **Cut back across segments (`cutBack`).** A chain the watching passes refused for a retrace is routed again with
   `chainPath = 'back'`. At the segment that retraced, the path is cut back to a vertex x of the run's route before it
   (`priorPath`), taken nearest first (ties y then x, at most 8). x must lie within √2 · `attractCm` of the segment's
   start point (prev's input point) and must not be pprev, the vertex before prev. √2 · `attractCm` is the bound by which
   attraction moves an incoming vertex, and C-0423's own-run landing and wedge corner use the same bound. Everything since
   prev's own landing is undone. Then pprev → x is routed, the next point is landed again after x, and x → it is routed.
   Neither route may retrace the path again. prev's input point (and any run point merged into prev) lands on x and is
   reported `W_ATTRACTED`. So no landed input point is left off the route, and the path is A–W–B with the corner's point
   on W.
3. **notBuilt #3 (M4): a retrace no cut back routes is routed as before.** If no candidate x routes, the chain is routed
   with `chainPath = null`, as S9 routed it. This happens when the corner stands farther than √2 · `attractCm` from every
   vertex of the path before it, or when the only near vertex is pprev, the segment's own start. Nothing a chain
   committed before the round is refused because of the round.

**Why the cut back, and not the checker's exclusion-first form.** The checker's required change offered a second form:
where the cut would leave a landed input point off the route, exclude the vertex from step 3 and take the strict route,
so that A–V–B commits as drawn. This lane built and measured that form at the census seed on 2026-10-21 (CHECKPOINT
13:18; the scratch is lost, so these numbers are the lane's receipt). It changed 970 outcomes and raised the counted
refusals at seed 20261013 from 2 to 16. Later chains were refused on the thin faces left by the spikes the form keeps.
J264 (4) forbids that, so the form was rejected. Re-routing every retracing chain with the cut alone also raised later
chains' refusals (35 against 2, CHECKPOINT 12:39). The form kept here, cut back per segment and otherwise as before,
changed 67 outcomes at 20261013 with the counted refusals 2 = 2 (CHECKPOINT 13:10). §3.6 step 4 supports this reading:
"the path is cut back to that vertex and routed on from it, so every committed run is a simple path or ring … The cut is
a function of the arena and the input and moves nothing". The cut moves no committed geometry. It drops the cut-off
corner, and the corner's point lands on the cut-to vertex within the attraction bound. The residual, a corner whose
simple route would need V kept on the route with W left out of step 3, is named as **notBuilt #3 (M4)** with its cases,
as the required change allows ("If the session reads item 130 (d) otherwise, name the class notBuilt by number with
these cases").

**Pins (`test/insert/step3-5/reentry.test.ts`, new; each red before the round or under its mutant).**

- The S9 check's four probed arrangements (W east of V at ±38.7° and ±36.9°, W west, W the dead end of a `way` to the
  north). Under `invisible` each commits A–W–B with the corner's point on W, every vertex of the row set of degree ≤ 2,
  W of degree 2, V gone, and the warnings exactly `W_ATTRACTED ×1` at V's input point, with no `W_STRETCH_SHARED`.
  `allProblems` and `dissolvableProblems` are empty. Under a `way` key through M0-a-06's transaction with the suite
  wired in, the batch commits and the key is a simple run. That makes 8 cases.
- The constructive family's three cases at seed 20261013 (the S9 check's class dump: `way:3` branch at (315, 855),
  `way:6` at (1705, 3001), `way:2` at (1705, 1505)). Each sequence is replayed from its generator seed (577 274 053,
  1 991 312 356, 1 683 288 088; located by this lane on 2026-10-21, CHECKPOINT 11:32). The named chain commits, its row
  set a simple run with no degree-3 vertex at the old branch point. That makes 3 cases.
- Nearest first (added 2026-10-25). An L0 way W2 (2 020, 2 028) – W (2 030, 2 000) – (3 500, 2 000) and the chain
  (2 300, 2 500) → (2 000, 2 000) → (2 500, 1 600). Both W (30.0 cm) and W2 (34.4 cm) are candidates. The corner lands
  on W and the route is A–W2–W–B.
- notBuilt #3, first form. The same arrangement with W at (2 040, 2 000), 40 cm from V, beyond √2 · `attractCm`: it is
  committed as before (W of degree 3, V a dead end), and refused '(way, way:c1) branches' under a `way` key. The class
  is named, not fixed. `crossings.test.ts`'s 'through' V (s = 226; its tip 61 cm from the crossing) is the same form.
- notBuilt #3, second form (added 2026-10-25; the checker's N-s9c-5). A (2 031, 2 000) → V (2 000, 2 000) →
  B (2 433, 2 250): a 31 cm first arm, a 30° corner, and the second arm folded back through A. The only near vertex is
  pprev, which the cut back never takes. It is committed as before: rows V–A and A–B, a simple run (every vertex of
  degree ≤ 2, so it commits under a linear key), with V the run's end, A inside it, and `W_STRETCH_SHARED` at V.

**Declared shifts (J263 Q6).** (a) A chain whose later segment retraced its own path, and whose corner stands within
√2 · `attractCm` of the re-entered vertex, now commits A–W–B with the corner's point on W (`W_ATTRACTED`). Before, it
committed A–W, W–V, W–B (`W_ATTRACTED ×2`, `W_STRETCH_SHARED ×1`), or was refused `branches` under a linear key. At the
census seed this changed 67 outcomes with no count rising (above). (b) `crossings.test.ts`'s 'through' V: its
`INSERT_CROSSINGS` work count is 3 (1 before). The chain is notBuilt #3's first form, and each of the three passes that
route it counts its crossing: watched, cut back refused, as before. (c) N-7's golden digest of the fixed B-FUZZ slice
(`3e8ec437…`) is unchanged; it is green in the round's NEAR run. No register case changed.

**The refusal census (J264 (4), N-58), before (S9, C-0423) → after.**

| family (10⁴ per property per seed) | S9 (C-0423's table; the S9 check's re-measure) | S10 | |
|---|---|---|---|
| random, 31 seeds | 55 + 48 = 103, max 8 | 55 + 48 = 103, max 8 | held, cell for cell |
| constructive, 31 seeds | 31 + 14 = 45, max 3 | 31 + 14 = 45, max 3 | held, cell for cell |
| mandatory-only, 31 seeds | 47 + 2 = 49, max 4 | 47 + 2 = 49, max 4 | held, cell for cell |
| fidelity, 31 seeds | 3, max 2 | 3, max 2 | held, cell for cell |
| seed 20261013 (random / constructive / mandatory / fidelity) | 0 + 2 / 0 + 1 / 2 + 0 / 0 | 0 + 2 / 0 + 1 / 2 + 0 / 0 | held |
| bands gate, seed 20261013 (kerb / corridorUnion / bandUnion insertChain's; own) | 6 / 8 / 6; 0 (classes S 10, E 8, D 2) | 6 / 8 / 6; 0 (classes S 10, E 8, D 2) | held |

How it was measured: `bfuzz.test.ts` and `fidelity.test.ts` at the PR size with PLAT_FUZZ_COUNTS, W = 1, in the
mirror, which equals the tree. Seeds 5101 … −7411 (1 – 24 of `caps.ts`'s 31) were measured on 2026-10-21 on the round's
final sources (CHECKPOINT lines 13:33 – 17:13, "every cell equal to caps.ts's table", RISES none). Their count files
went with that container. The re-run of 2026-10-24 confirmed seeds 1 – 12 again (CHECKPOINT lines to 01:39). Seeds 7507,
−7603, 7703, −7817, 7901, −8009 and 8101 (25 – 31) were measured on 2026-10-25 on this container, each equal to its
cell: 0+3 / 2 / 0 / 1, 1 / 0+1 / 0 / 0, 0+1 / 0+1 / 1 / 0, 1 / 2 / 2 / 0, 0+2 / 0 / 0 / 0, 0+4 / 1+1 / 3 / 0,
4+4 / 0 / 2 / 0 (random / constructive / mandatory / fidelity). The rate did not fall, so `caps.ts` is unchanged (J207's
ratchet holds; nothing to lower). Every refusal counted keeps its S9 class text (`class S | D | W | P | A | E | V | C
(notBuilt #2, M4)`). The round adds one class of its own, notBuilt #3 (M4), whose chains commit as before and so are
not refusals in these families. Under a linear key through the transaction its first form is refused `branches`, as it
was before the round (`reentry.test.ts`).

**Row-by-row outcome.**

| line | outcome | evidence |
|---|---|---|
| RQ1 across a chain's segments (S9 check, N-s9c-1) | **fixed** within √2 · `attractCm` (the cut applies to the chain's path); the remainder **named notBuilt #3 (M4)** with its two forms and their cases | `reentry.test.ts` (15 cases: 4 arrangements × `invisible` and `way`, the 3 constructive cases, nearest first, notBuilt #3's two forms); the mutant table below; the census above |
| C-0423 (1) amended to say the cut applies to the chain | **done** | `choices.md` C-0423 (1) ("The cut is the chain's, not one segment's (amended by round S10, C-0424)"); C-0424 |

**The round's mutant table (J169, J183).** Each mutant is a string replacement asserted to occur once in the tree's
`insertChain.ts`, applied to the scratch mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s10`, isolation
proven: no link into the tree, and the `@plat` dependencies resolve inside it), then run with `vitest run --maxWorkers=1
--bail=1`. Before the next mutant the file was restored from the tree and compared with `cmp`. A mutant that survived
`reentry.test.ts` was run against the folder's eleven fast files. The two probe grids are 58 two-candidate arrangements
and 60 short-arm arrangements, diffed against the unmutated output.

| mutant | change | result |
|---|---|---|
| R10-OFF | `if (reentered(result))` → `if (false && …)` (the round off) | killed: reentry 'W east, ±38.7°' |
| R10-DETECT | `if (retraces()) ctx.reentry = true;` dropped | killed: the same |
| R10-BOUND | `d <= RELAND_SQ` dropped from the candidate filter | killed: notBuilt #3 first form (the 40 cm corner cut back) |
| R10-FALLBACK | `back.ok ? back : passes(null)` → `back` | killed: notBuilt #3 first form |
| R10-FINAL | the watching pass's `REENTRY_DETAIL` refusal at the commit dropped | killed: reentry 'W east, ±38.7°' |
| R10-ONPREV | the run's points on prev not moved onto x | killed: the same |
| R10-ORDER | candidates farthest first | killed: 'nearest first' (pin added 2026-10-25) |
| R10-PP | `x !== pp` dropped | survives the pin, the fast folder (267 / 267) and the short-arm grid (diff 0): PLAUSIBLE equivalent. x = pprev routes pprev → pprev, and the landing after it merges or collapses onto x (`merged \|\| bv === x`, skipped). N-s10-1 |
| R10-CB1 | `\|\| retracedNow(ctx)` dropped after pprev → x | survives (folder 267 / 267; both grids diff 0): net-covered. A cut-back route that retraces again leaves `ctx.reentry` set, and the commit's `REENTRY_DETAIL` check (R10-FINAL, killed) refuses the pass. Only a rescue by a later candidate is lost. N-s10-1 |
| R10-CB2 | `!retracedNow(ctx)` dropped after x → next | survives: net-covered, as R10-CB1 |
| R10-SEGMARK | `!segMark.reentry` dropped | survives (folder; grids diff 0): unreached. The flag is set before a segment only by a retrace that was neither cut back nor refused, i.e. a re-landing's route, and the commit check refuses that pass. N-s10-1 |
| R10-LIVE | `priorPath`'s `isHalfEdgeLive` skip dropped | survives (folder; grids diff 0): PLAUSIBLE equivalent. A dead pair of the run is a split edge, whose ends stay ends of its halves, and a candidate that is not live is skipped (`isVertexLive`). N-s10-1 |

7 of 12 killed; 5 equivalent, net-covered or unreached as stated.

**Gates (2026-10-25, this container; W = 1 from `tools/test_budget.py`).** `install --frozen-lockfile` exit 0; `lint`
exit 0 (`lint: probe-red ok`); `build` exit 0; NEAR, the step3-5 folder at the PR size, PLAT_FUZZ_SEED=20261013:
13 / 13 files, 285 / 285 tests, exit 0; the bands gate (`arr/bands/bfuzz.test.ts`, never edited) exit 0 at its
counts above; RELATED@1000 in the tree (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/kernel/src/insert/insertChain.ts packages/kernel/src/insert/stretch.ts`): `Test Files  2 failed | 434 passed (436)` · `Tests  2 failed | 5727 passed (5729)` · `Duration  8277.02s`, exit 1. The two reds are exactly the two the S9 check read as the S9 round's DECLARED shifts in other items' pins, routed to those items' rounds (§ Hardening round S9, 'PROPOSED' (1), (2)): `|kernel| test/arr/booleans-buffers/booleans.test.ts:329` 's6 walks out along P–Q and back …' — `expected -1 to be greater than or equal to 0` (M0-a-08's N-41 (3) fixture, RQ1's ruled shift) and `|testkit| test/edge/repins.test.ts:77` 'EP-01/S5a/coincident at seed 1658509524 …' — `expected 'absorbed' to be 'refused-safe'` (M0-x-06's pin, RQ3's ruled shift). No other red, no J176 bench red, and neither foreign KI red.

### Notes (not failing lines)

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s10-1 | **The cut back's five unkilled guards** (R10-PP, CB1, CB2, SEGMARK, LIVE; the table above). Each guard is fail-safe: a retrace that slips past it is refused at the commit (R10-FINAL, killed), and the chain is then routed as before. None can commit an invalid or retracing route. | constructed cases if M4's notBuilt #3 work reaches them | M4 |
| N-s10-2 | **A retracing chain is routed up to three times** (watched, cut back, as before), so its work count is up to three times one pass's (`crossings.test.ts`'s 'through' V: 3 crossings for 1). Under a tight work limit such a chain could reach E_WORK_LIMIT where S9 committed it. No registered family's count rose (the census and the bands gate above); E_WORK_LIMIT is a typed outcome B-FUZZ allows and does not count, so a rise there is unmeasured. | read the passes' work under §12.4's budget at the timing phase | timing phase |
| N-s10-3 | **notBuilt #3 (M4), the class named** (amended by round S11, C-0425: the class is every retrace of the chain's own path that the cut back does not route, in five forms — (1) and (2) below, and (3) a closed run's seam, (4) a cut back refused at every candidate, an optional chain's by its precision rules, (5) a re-entered vertex the chain's own earlier segment placed; § Fix round S11). (1) A corner farther than √2 · `attractCm` from every vertex of the path its later segment re-enters (`reentry.test.ts`'s 40 cm arrangement; `crossings.test.ts`'s 'through' V, 61 cm). It is committed as before, with a branch at the re-entered vertex, and refused `branches` under a linear key through the transaction. (2) A first arm shorter than √2 · `attractCm` that the second arm folds back over (N-s9c-5's 254 chains at seed 20261013; `reentry.test.ts`'s 31 cm case). It commits as a re-ordered simple run. Success for both needs the corner kept on a simple route with the re-entered vertex left out of step 3. That form, tried for every retrace, raised the counted refusals at 20261013 from 2 to 16, so it needs M4's thin-face handling first. LAWFUL input; verdict MAKE-IT-SUCCEED, carried as notBuilt #3. | M4's hardening pass | M4 |

## Closing check of S10 (lane `check/M0-a-05-close-s10`, 2026-10-25 – 2026-10-26; verdict FAIL in `checks/M0-a-05-s10.md` — RQ1 still failing in part: the ring's seam and two cut-back fall-backs outside notBuilt #3's two named forms)

The S10 round's cut across an open chain's segments is real and pinned: the S9 check's four arrangements in both
directions, 256 swept arrangements, seven variants and the three constructive cases of seed 20261013 commit as simple
runs (all red under the round switched off); 10 of this seat's 14 targeted mutants killed; every gate green; the census
held at seed 20261013 (0 + 2 / 0 + 1 / 2 + 0 / 0), at four of `caps.ts`'s seeds and in the bands gate (6 / 8 / 6, own
0). The line fails on its residual, below. Rows (not failing lines unless the verdict says so):

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s10c-1 | **The failing line's data (RQ1's residual), for the fix round.** notBuilt #3 is named with two forms (C-0424 (3), N-s10-3); the routed-as-before residual has at least three more, each lawful, the corner within √2 · `attractCm`, committed with a degree-3 vertex in the chain's own rows and refused `branches` under a linear key. (A) **The ring's seam**: the closing segment (`insertChain.ts:1379`) has no cut back; constructed — L0 `way` (2 030, 2 000)–(3 500, 2 000), the closed mandatory chain (2 000, 2 000) → (2 500, 1 600) → (2 500, 2 400): `invisible` commits with W of degree 3 (`W_ATTRACTED ×2`, `W_STRETCH_SHARED ×1` @ (2030, 2000)), `way` through the transaction refused `(way, way:c1) branches` — likewise reversed, W west, and the corner as the ring's last point; constructive: seed 8101 generator seeds 1 677 770 628 (step 3) and 1 665 516 641 (step 5), seed −5203 generator seed 1 720 240 219 (step 4). (B) **A cut back refused by the optional class's precision rules** (`E_BELOW_MIN_ANGLE` on the cut back's route): seed 5101 generator seed 1 300 412 224 (step 5, candidate (1 820, 2 012) at 35.0 cm), seed −5203 generator seed 1 880 377 805 (step 2, (2 279, 1 267) at 29.0 cm). (C) **A re-entered vertex the chain's own earlier segment placed**: `cutBack` rolls back to `prevLand` and then skips the dead candidate; seed 8101 generator seed 823 490 252 (step 4, the wedge vertex (3 691, 2 339) at 33.0 cm). Probes `s10/probe/zzs10probe.test.ts`, `zzs10replay.test.ts` and the stderr instrumentation `s10/mut/instr.py` in this seat's mirror. | fix (seam cut back; a candidate the earlier segment placed; the next candidate after a precision refusal) or name the residual exactly as notBuilt #3's forms with these cases as pins | this round (the failing line) |
| N-s10c-2 | **The chain's path is read per run, and that scoping is unpinned.** Mutant RUNSTART0 (`ctx.runStart = { newPairs: 0, shared: 0 }`: the path read from the op's start) survives the step3-5 folder at 10³ (285 / 285). No test has a chain split into runs (§3.6 step 1) whose later run shares an earlier run's edge — where §3.6's preamble lets a chain attract onto itself and the per-run reading leaves it alone. Not judged equivalent. | a pin: a self-crossing chain whose later run follows an earlier run's edge, its outcome asserted | M4 |
| N-s10c-3 | **A simple-run oracle over the constructive family counts many own-row branches on chains that are not well separated.** At seed 20261013, 1 827 of 38 484 commits carry a vertex of degree 3 in their own row set (OFF: 1 858); 1 823 are on chains with a corner below 60°, a segment below 60 cm or two non-adjacent segments within 80 cm (`zigzag` 1 041, `random` 522, `vee` 226, `ring` 29, `coincident` 5, `collinear` 4) — chains that double back near themselves, which §3.6's preamble lets attract onto themselves, while item 130 (d) says every committed run is simple and §3.10's role consistency refuses a linear key's branch. B-FUZZ's `ins` path runs no role consistency, so the census does not count them. Whether they are lawful input under a linear key (then a refusal class of our own making) or a self-touching chain the design splits into runs is a design reading this seat does not make. | the session's reading (item 130 (d) vs §3.6's preamble for a chain near itself); then a census row | session |

## Fix round S11 (lane `build/M0-a-05-fix-s11`, 2026-10-26; the S10 closing check's failing line, RQ1's residual; N-61 (1), item 130 (d); C-0425)

The S10 closing check (`checks/M0-a-05-s10.md`, N-s10c-1) failed RQ1 on three lawful retrace forms outside notBuilt #3's
two named forms: (A) a closed run's seam, (B) a cut back refused by the optional class's precision rules, (C) a
re-entered vertex the chain's own earlier segment placed. Its required change allowed (a) a fix or (b) the residual named
exactly with a pin per form. **This round takes (b).** Reasons: the brief's FAIL SAFE NOW rule (a rare case in a fix
round prefers a named, typed outcome to a new behaviour; these forms appear 0 – 3 times per 10⁴ constructive sequences),
the S10 round's measure that the wider fix shape raised the census (2 → 16 at seed 20261013), and that (a) changes
committed output in three new places, which wants M4's thin-face handling first. Nothing is routed differently: the
source change is comments only (`insertChain.ts`; esbuild's transform of the file before and after hashes equal,
`3fd2e9cd…`, CONFIRMED), so the census and every committed outcome are unchanged by construction.

### Row-by-row outcome

| line | outcome | evidence |
|---|---|---|
| RQ1's residual (N-s10c-1) | **NAMED and PINNED** — notBuilt #3 (M4) is now *every retrace of the chain's own path that the cut back does not route*, in five forms: (1) a corner farther than √2 · `attractCm` from every vertex of the path it re-enters; (2) a first arm shorter than that bound folded back over by the second (only pprev near); (3) a closed run's seam (the closing segment is never cut back); (4) a cut back whose routes are refused at every candidate, an optional chain's by its precision rules; (5) a re-entered vertex the chain's own earlier segment placed (the cut back's undo to prev's landing removes it). C-0424 (3) amended in place, N-s10-3 amended in place, C-0425 appended; `insertChain.ts`'s module comment, `cutBack`'s doc, the closing segment and the passes' comment name the forms. | `reentry.test.ts` +17 cases (15 → 32): form (3)'s constructed ring in four arrangements (V first east, reversed, W west, V last) under `invisible` (W of degree 3, V a spur, `W_ATTRACTED ×2` + `W_STRETCH_SHARED ×1`) and under a `way` key through M0-a-06's transaction (refused `E_INVARIANT (way, way:c1) branches: …` verbatim); the six constructive cases replayed from their generator seeds (forms (3): 1 677 770 628 / 1 665 516 641 at 8101, 1 720 240 219 at −5203; (4): 1 880 377 805 at −5203, 1 300 412 224 at 5101; (5): 823 490 252 at 8101) — points, placed vertices, warnings, the own-row vertex of degree 3, `allProblems` empty — and, where the chain's own key is the one refused, the transaction's `(way, way:<step>) branches` (1 677 770 628, 1 720 240 219, 1 300 412 224; the other three replays' earlier chains, inserted without role consistency, already branch, so the refusal names their key). Forms (1) and (2) keep their S10 pins, now numbered. |

**The forms' causes, read in this lane's mirror (CONFIRMED).** The S10 check's stderr instrumentation of `cutBack`
(`s10/mut/instr.py`, re-pointed at this lane's mirror; the file restored from the tree and `cmp`-equal after): the four
seam rings and the three ring replays show `PASS watch` and `PASS back` both refusing "the chain re-enters its own path"
with no `CB trigger` (the closing segment never calls `cutBack`); 1 880 377 805 — one candidate (2 279, 1 267) at 29.0 cm,
`r1` refused `E_BELOW_MIN_ANGLE a corner below minFaceAngle at (3747, 806)–(2279, 1267)`; 1 300 412 224 — one candidate
(1 820, 2 012) at 35.0 cm, `r1` ok, `r2` refused `E_BELOW_MIN_ANGLE … at (1820, 2012)–(622, 1229)`; 823 490 252 — one
candidate (3 691, 2 339) at 33.0 cm, `live false` after the rollback (one more debug line in the candidate loop), no
route tried.

### The round's mutant table (J169, J183; the lane's mirror, `vitest run --project kernel --maxWorkers=1 --bail=1 packages/kernel/test/insert/step3-5/` at PLAT_FUZZ_RUNS=1000, insertChain.ts restored and `cmp`-equal after each)

Each mutant is a model of the M4 fix of one form (or of the fallback removed), so a pin red under it is a later fix
showing as a declared shift:

| mutant | change | reentry.test.ts alone | folder |
|---|---|---|---|
| FALLBACK | a refused back pass returned instead of the as-before pass (`result = back`) | 20 failed / 32 — every form (1) – (5) | KILLED (bail at reentry.test.ts) |
| ROT | a closed run started at its second point (the seam moved off the corner, so the open loop's cut back reaches it: the model of form (3)'s fix) | 10 failed — the four seam arrangements under `invisible`, the last-point one under the transaction, and all five ring-replay pins (three committed, two transaction) | KILLED |
| PREC | the cut back's two routes taken under the mandatory class (no optional precision refusal: the model of form (4)'s fix) | 3 failed — both form (4) replays and 1 300 412 224's transaction pin | KILLED |
| DEAD | a candidate the undo removed re-landed at its position read before the rollback (the model of form (5)'s fix) | 1 failed — 823 490 252 | KILLED |

4 of 4 killed; under ROT, PREC and DEAD only their own form's pins turn red (the other 29 – 31 stay green), so each form
is held by its own pins.

### Gates and census

- `corepack pnpm install --frozen-lockfile --offline` exit 0; `corepack pnpm lint` → `lint: eslint 1141 files, 0 errors, 0 warnings` · `lint: probe-red ok` · `lint: kernel-boundary ok`, exit 0; `corepack pnpm build` exit 0.
- NEAR (the tree, W = 1, full strength): `corepack pnpm exec vitest run --maxWorkers=1 packages/kernel/test/insert/step3-5/` → `Test Files  26 passed (26)` · `Tests  604 passed (604)` (570 + 2 × 17), exit 0.
- **The census (J264 (4), N-58)** at the census seed in the mirror (= the tree's tests), PLAT_FUZZ_SEED=20261013, 10⁴ per property, PLAT_FUZZ_COUNTS: random 0 + 2, constructive 0 + 1, mandatory 2 + 0, fidelity 0 — equal to S9 / S10 (held), `Test Files 13 passed (13)` · `Tests 302 passed (302)`. Every other cell (`caps.ts`'s 31 seeds, the bands gate's 6 / 8 / 6) holds by construction: the compiled `insertChain.ts` is byte-identical to S10's (above), and no other source file changed; `caps.ts` unchanged. The residual's refusals are not in the census's counted codes (B-FUZZ's `ins` path runs no role consistency, N-s10c-3).
- RELATED@1000 (the tree, W = 1): `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/kernel/src/insert/insertChain.ts` → `Test Files  2 failed | 432 passed (434)` · `Tests  2 failed | 5729 passed (5731)` · `Duration  8139.65s`, exit 1. The two reds are exactly the S9 round's DECLARED shifts in other items' pins, as the S9 and S10 checks read them: `|kernel| test/arr/booleans-buffers/booleans.test.ts:329` 's6 walks out along P–Q and back …' (`expected -1 to be greater than or equal to 0`; M0-a-08's fixture, RQ1's ruled shift) and `|testkit| test/edge/repins.test.ts:77` 'EP-01/S5a/coincident at seed 1658509524 …' (`Received: "absorbed"`; M0-x-06's pin, RQ3's ruled shift). Nothing new (the run selects 434 files, S10's 436 less the two reached only through `stretch.ts`, unchanged this round).

### Refusal verdicts (J290 / N-58)

Forms (3) – (5), like (1) and (2): LAWFUL input (well-separated chains, the corner within the bound for (3) – (5)),
committed with a branch in the chain's own rows under a non-linear role and refused `branches` under a linear key —
verdict MAKE-IT-SUCCEED, carried as notBuilt #3 (M4). Fix shapes for M4 (the S10 check's (a)): cut the seam's input point
back onto the re-entered vertex and re-route the run's first segment from it (under ROT, a moved seam, every
constructed ring's and ring replay's committed outcome changes); read a candidate's position before the rollback and re-land there
(DEAD); let the cut back's routes past the optional precision rules or go on to a farther candidate (PREC) — each then
re-measured on the census (never rising) and the bands gate.

## Closing check of S11 (lane `check/M0-a-05-close-s11`, 2026-10-26; verdict PASS in `checks/M0-a-05-s11.md` — RQ1's residual named whole as notBuilt #3's five forms and pinned; gates green; census held)

The S11 round's option (b) is confirmed: C-0424 (3), N-s10-3 and `insertChain.ts`'s comments name notBuilt #3 (M4) as
every retrace of the chain's own path that the cut back does not route, in five forms; `reentry.test.ts` pins the seam
ring (four arrangements, `invisible` and a `way` key through the transaction) and the six constructive replays; the
source change is comments only (diff against S10's mirror). This seat's models of the three fixes (SEAMROT, PRECM,
DEADPOS) each turn exactly their form's pins red, and FB turns every form red. Census at 20261013 0 + 2 / 0 + 1 / 2 + 0 /
0 and the bands gate 6 / 8 / 6 (own 0): held. One row:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s11c-1 | **The cut back on a closed ring's interior corner is right but unpinned.** Mutant SEAMOFF (`let result = passes(dec.runs.some((r) => r.closed) ? null : 'watch')`: the watch off for any chain with a closed run) survives the whole step3-5 folder at 10³ (302 / 302). It is not equivalent. This seat's probe (`/home/user/maps-scratch/waves/check-M0-a-05/s11/probe/zzs11probe.test.ts`, mirror only) used the S9 arrangement with the corner V (2 000, 2 000) at a ring's interior index: L0 `way` (2 030, 2 000)–(3 500, 2 000) with the closed mandatory chain (2 500, 2 400) → (2 000, 2 000) → (2 500, 1 600); the same with W west, (500, 2 000)–(1 970, 2 000) and (1 500, 2 400) → V → (1 500, 1 600); and the four-point ring (2 500, 2 400) → V → (2 500, 1 600) → (3 000, 2 000). Now each commits as a simple ring (`W_ATTRACTED ×1` @ V, every own-row vertex of degree 2), and under `way` the transaction commits. Under SEAMOFF each branches (W of degree 3, V of degree 1, `W_STRETCH_SHARED ×1`) and is refused `(way, way:c1) branches`. No fixture in `reentry.test.ts` has a closed chain whose retrace is away from the seam. | add the three probe rings to `reentry.test.ts` as pins (simple ring under `invisible`; the transaction commits under `way`), killing SEAMOFF | M4 (or the next round touching insertChain) |

## Fix round S12 (lane `build/M0-a-05-fix-s12`, 2026-10-27 – 2026-10-28; the session's round — Q104 (N-63 (2)) with Q58's partner draw 1 524, notBuilt #3's forms (N-64, J515), the routed row Q112 (J532); C-0456)

Three lines and one routed row, all inside the item's owns (insert/ and test/insert/step3-5/); a-09's kerb, corridorUnion
and bandUnion and its bands harness were read and run, never edited. The lane ran across four Claude Code cloud
containers in turn (three restarts: 19:4x, 22:47 and 23:43 on 2026-10-27; the mirror rebuilt or kept, isolation proven
each time; every gate, the mutant table, the census and the bands gate re-run on the final engine on the last container;
the CONTINUE RULE).

### Row-by-row outcome

| line | outcome | evidence |
|---|---|---|
| Q104 (N-63 (2)), Q58's draws 8 897 / 1 524 | **FIXED where a lawful seat exists (sub-class W); sub-classes A and B REFUSED with the proof that none exists (notBuilt #4, REPORTED).** Q104's cases read in this lane's mirror: a kerb piece's contact on F's boundary edge E where E runs within `minEdge` of other geometry, so the placement rule seats no vertex on E within `attractCm` and falls back onto E's far end; the fidelity bound refuses that route and the in-bound passes put the piece's end at a free spot 25 – 26 cm into F (the dangling tip). Sub-class W (the contact on a wedge side: case (b)) — the end rule W (`endLanding`) keeps the end on the edge it meets within the bound: commits. Sub-classes A (the end segment along E: case (a), seed 4 draw 9 373) and B (a way's centreline within `minEdge` of the frame over metres, met by another way's kerb: seed 1 draw 8 419, seed 3 draw 7 294, seed 14 draw 8 616; Q58's partner 1 524 at the kerb's read) — no vertex can stand on F's boundary within the fidelity bound of the contact (`seatsNear`, from §3.6's placement tests and §3.10's clearance); every route ends at a vertex, so no insertion can make it succeed within the bound: REFUSE, typed (N-57 (2)'s code; UNLAID_DEEP at the read), its alternative another item's (N-57 (2)'s contract for a contact with no lawful seat, or the network's sub-`minFaceAngle` T-junction), REPORTED. The round's first engine committed sub-class A by a second end rule (A, `endHugs`); census run 3 found it moving a mandatory chain's end 166 cm, beyond the bound (below), so it is withdrawn. | `q104.test.ts` (new): case (b) and Q58's 8 897 commit — healthy, tiling, no spur, every closing by kerb(F), F's blocks within the fidelity bound of kerb(F) (case (b)); the end rule W stays on the edge it meets (the widened 20261011 network, the chord seed-4 network); sub-classes A and B's five draws and 1 524 pinned refused with the no-seat proof (the control: case (b) has a seat); the retry's two census chains committed as on S11; the census-7307 chain committed within the bound |
| notBuilt #3's forms (3) – (5) (C-0424 (3) as C-0425 amended it) | **BUILT.** (3) the seam re-walk (`walk`, `SEAM`: the ring walked again from its last point, then the point before it); (4) the cut back's routes along an edge at x (`ChainCtx.cutStretch`; stretch.ts, snapRound.ts); (5) a removed candidate re-landed at its position read before the rollback | `reentry.test.ts`: the S11 refusal pins turned into commit pins on the same fixtures — the four seam arrangements (a simple ring under `invisible`; the transaction commits under `way`), the six constructive replays from `register/s12-forms.json` (the S11 arenas dumped: the earlier chains of those sequences now commit otherwise, so each step is pinned on the arena S11 left) committed with no vertex of degree 3 in their own rows, and through M0-a-06's transaction committing (823 490 252 refused 'branches' for its own self-crossing only — a vertex of degree 4 at (2 427, 2 893), split into simple runs by step 1 — the branch at the wedge vertex gone); N-s11c-1's three interior-corner rings pinned |
| notBuilt #3's forms (1) – (2) | **Form (1) BUILT within the corner bound** (a tip of at most 90°, the cut back within 2 · √2 · `attractCm`, §3.6 *Existing geometry wins*); **(1′) and (2) KEPT with J238 (1)'s proof** in C-0456 (3): (1′) beyond the corner bound — moving the corner breaks the fidelity bound, keeping it needs step 3 to ignore the chain's own path (which §3.6's preamble forbids) and measured a census rise at 20261013 (random 2 → 13, constructive 1 → 8): the design's call on that conflict and M4's thin-face handling; (2) commits under every key (a re-ordered simple run, no refusal). Both listed for re-check at M1's first towns | `reentry.test.ts`: form (1) commit pins (W 40 cm from the corner: A–W–B, the transaction commits); `crossings.test.ts`'s 'through' V cut back onto its crossing (61 cm); (1′) kept pins (W 80 cm: W of degree 3, refused '(way, way:c1) branches' under a linear key); (2) kept pins (committed, a simple run under every key) |
| Q112 (routed, J532, N-65 (6)) | **RE-RECORDED.** `sliver.test.ts`'s Q53 pins (kernel + kernel-tiny) against the landed kerb of a-09 S14 – S17: face 0's kerb way:0 read faithfully 29.9 → 5.0 cm deep, so L1 f1 is band whole; the pin stays the three-chord sliver committed and healthy three ways; C-0349's premise guard text unchanged | `sliver.test.ts` green on the tree (NEAR); the same classes on the S11 model in the mirror |

### What the round's own measures found and fixed (CONFIRMED)

- The census's first run (31 seeds × 10⁴, 2026-10-27 14:54 – 16:55) met two rises (constructive 6521 1 → 1 + 1,
  fidelity −6421 0 → 1): an open chain's end the end rule landed whose route then kept nothing in bound. Fixed by the
  retry (`inBound`: a pass the end rule led to a refusal runs again without it); both chains pinned committed exactly as
  S11 committed them (`q104.test.ts`).
- The bands measure (20:49) found the widened family at 20261011 rise kerb / corridorUnion insertChain 7 / 7 → 8 / 8: the
  end rule W's vertex alternative landed a dead end's kerb part on the antenna's tip vertex 67.6 cm off (KEPT_DEEP).
  Fixed: W's vertex alternative counts only a vertex on the piece the end meets (`onPiece`).
- The S11 model's bands measure (21:49) found chord seed 4 corridorUnion insertChain 8 → 9 on the round's first engine:
  W's edge landing taken before the first reading's strip seat. Fixed: the first reading's order across, nearest,
  onEdge, free. Both networks pinned (`q104.test.ts`; mutants O and V kill them).
- After those changes the engine routes `register/s9-register.json`'s passover-rescue case (5309) exactly as S9
  recorded it, so that case's earlier re-record by this round is undone (router.test.ts 166 / 166).
- **Census run 3 (2026-10-27 23:02 – 2026-10-28 02:38, resumed after the third restart) red at 7307** (the constructive property, fast-check path 2026, generator
  seed 1 102 909 027): the end rule A absorbed the mandatory collinear chain way:4's first point (3 265, 30) into its
  second's landing on the frame at (3 431, 30), 166 cm off — the route vertices (3 431, 30) and (3 414, 57) beyond
  73.54 cm of every segment, the first segment 139.8 cm from its route: a silently wrong commit (bfuzz's fidelity judge).
  Read in the mirror with the round's features switched off one at a time: only the end rules' switch changes it. With A
  bounded to the fidelity bound it fired 0 times at 7307 and 5101 at 10⁴ (2 absorptions rejected at 7307), and the two
  networks it was built for (case (a), seed 4 draw 9 373) need the out-of-bound absorption (the no-seat proof holds on
  both), so A is withdrawn (`endHugs` and its two sites removed) and those two join sub-class B's refusal. The chain is
  pinned committed within the bound as on S11 (its first point at (3 265, 75), W_PLACED); mutant A-BACK (the earlier
  engine) turns it and the two refusal pins red. The census was then run again whole on the final engine (run 4).

### The round's mutant table (J169, J183; the lane's mirror, `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=1 --bail=1 packages/kernel/test/insert/step3-5/` (kernel and kernel-tiny), the mutated file restored from the tree and `cmp`-equal after each; the final engine, 2026-10-28)

BASE (no mutant): 28 files, 656 / 656 green.

| id | line | file | mutant | result | killed by |
|---|---|---|---|---|---|
| A-BACK | Q104 | insertChain.ts | the round's earlier engine (the end rule A, unbounded) | killed (3 pins) | `q104.test.ts`: case (a) and seed 4 draw 9 373 refusal pins; the census-7307 chain |
| Q104-W | Q104 | insertChain.ts | `stepTwoStrip`'s `onEdge` returns null (the end rule W off) | killed | `q104.test.ts` case (b) commits |
| RETRY | Q104 | insertChain.ts | `inBound` without the retry | killed | `q104.test.ts` the retry's constructive 6521 chain |
| O | Q104 | insertChain.ts | the first reading's order onEdge, across, nearest, free | killed | `q104.test.ts` the chord seed-4 network |
| V | Q104 | insertChain.ts | `endLanding(…, false)` (any vertex within the bound, not only on the met piece) | killed | `q104.test.ts` the widened 20261011 network |
| BOUNDW | Q104 | insertChain.ts | `endLanding`'s edge landing taken without its own within-the-bound test | survives — net-covered: a landing beyond the bound fails `inFidelity` on its route and the pass's retry runs as before (bfuzz's fidelity judge holds the result) | — |
| SEAM | form (3) | insertChain.ts | no seam re-walk (`turn <= 0`) | killed | `reentry.test.ts` the seam ring, V the first point |
| SEAM1 | form (3) | insertChain.ts | one re-walk only | killed | `reentry.test.ts` the seam ring, V the last point |
| SEAMROT | form (3) | insertChain.ts | S11's check model: the ring walked from its second point | killed | `reentry.test.ts` the seam ring, V the second point |
| CUTEND | form (4) | insertChain.ts | `cutStretch = 'end'` → null | killed | `reentry.test.ts` form (4) −5203 / 1 880 377 805 |
| CUTSTART | form (4) | insertChain.ts | `cutStretch = 'start'` → null | killed | `reentry.test.ts` form (4) 5101 / 1 300 412 224 |
| STR-END | form (4) | stretch.ts | `atEnd` off | killed | as CUTEND |
| STR-START | form (4) | stretch.ts | `atStart` off | killed | as CUTSTART |
| SR-END | form (4) | snapRound.ts | `leavesAtEnd` off | killed | as CUTEND |
| SR-START | form (4) | snapRound.ts | `joinsAtStart` off | killed | as CUTSTART |
| PRECM | form (4) | insertChain.ts | S11's check model: the cut back's route to x under the mandatory class | survives — equivalent: a differential probe over the constructive and random families (mirror only, deleted) found 0 outcome differences; form (4)'s cut backs pass the precision rules by `cutStretch` | — |
| RELAND | form (5) | insertChain.ts | a removed candidate passed over, not landed again (S11's DEADPOS inverted) | killed | `reentry.test.ts` form (5) 8101 / 823 490 252 |
| FAR | form (1) | insertChain.ts | no corner-bound tier | killed | `reentry.test.ts` form (1) W 40 cm |
| ACUTE | form (1) | insertChain.ts | the corner-bound tier at every corner, not only a tip of at most 90° | survives — plausible equivalent: a corner both of whose arms pass within `attractCm` of a vertex beyond √2 · `attractCm` stands at most 90° wide (each arm within 45° of the line to it), so the test never cuts a candidate | — |
| FB | S11 check | insertChain.ts | `result = back` (the as-before fallback removed) | killed | `bfuzz.test.ts` the random family |
| Q14 | S9 register | crossings.ts | `passOver` ends the search with null | killed | `router.test.ts` passover-rescue 5309 |
| CUTLOCAL | S9 register | snapRound.ts | the cut back routes on at once, not by restart | killed | `router.test.ts` cut-to-end 6101 |

19 killed; BOUNDW net-covered, PRECM equivalent, ACUTE plausible equivalent (one line each, J169). S11's DEADPOS is
the built form (5) itself; its inverse is RELAND.

### Gates and census

All on the last container (linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib, Node 24.12.0), on the final engine:

- `corepack pnpm install --frozen-lockfile` exit 0 ("Already up to date").
- `corepack pnpm lint` exit 0 — eslint 1 185 files, 0 errors, 0 warnings; `lint: probe-red ok` (the probe's ten lines red
  as required); 9 whole-tree checks ok (kernel-boundary, bench-boundary among them).
- `corepack pnpm build` exit 0 (tsc -b ok; the six packages' esbuild bundles).
- NEAR (the item's folder `packages/kernel/test/insert/step3-5/`, kernel and kernel-tiny, PR size 10⁴, W = 1): exit 0 — 28 files, 656 / 656, 1 018 s (2026-10-28 10:33, the final tree; the run before the caps ratchet and the comment edits, 03:18, 878 s, likewise 656 / 656).
- RELATED (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run` over insertChain.ts, stretch.ts, snapRound.ts,
  J499's full 1 000, W = 1): exit 1 — 474 files (6 failed | 468 passed), 6 500 tests (8 failed | 6 492 passed), 7 329 s. The eight reds: `testkit` `test/edge/repins.test.ts` EP-01/S5a/coincident 1 658 509 524 and `kernel` `test/arr/booleans-buffers/booleans.test.ts` s6 — S9's declared shifts (red at S11's closing check too; its PROPOSED re-pins stand); six of a-09's `test/arr/bands/` pins, read in the mirror with the round's features switched off one at a time (below, *RELATED's bands reds*): three are this round's declared shifts with every outcome law holding, three are red on the S11 model too (foreign to this round). No J176 bench red appeared in the selection's failures.
- The census (J238 (2) – (3): `bfuzz.test.ts` and `fidelity.test.ts`, `PLAT_FUZZ_SEED` each of caps.ts's 31 seeds and
  20261013, 10⁴ per property, `PLAT_FUZZ_COUNTS` read, W = 1, the tree; run 4, 2026-10-28): every seed exit 0;

  | family | S11 (caps.ts before) | S12 (run 4) | cells changed |
  |---|---|---|---|
  | random | 55 + 48 = 103 | 55 + 48 = 103 | none |
  | constructive | 31 + 14 = 45 | 30 + 13 = 43 | 6907 0 + 2 → 0 + 1, 7507 2 → 1 (falls) |
  | mandatory-only | 47 + 2 = 49 | 47 + 2 = 49 | none |
  | fidelity | 3 | 3 | none |
  | 20261013 | 0 + 2 / 0 + 1 / 2 + 0 / 0 | 0 + 2 / 0 + 1 / 2 + 0 / 0 | none |

  No cell rose. `caps.ts`'s constructive row lowered to the measure (J207's ratchet; cap per 10⁴ 2.10 → 2.02, the PR
  and 10³ caps 8 and 3 unchanged, nightly 256 → 247) and `router.test.ts`'s caps pin re-recorded (6 / 6).
- The bands gate (a-09's `test/arr/bands/bfuzz.test.ts`, read-only, `PLAT_FUZZ_SEED` 20261011 / 1012 / 1 / 2 / 3 / 4,
  10⁴ chord + 2 000 widened, the tree), against the S11 model (the round's features switched off in the mirror):

  | seed | chord kerb / corridorUnion / bandUnion insertChain, corridorUnion own | widened kerb / corridorUnion insertChain, corridorUnion own |
  |---|---|---|
  | 20261011 | 5 / 11 / 6, 0 (= before) | 7 / 7, 3 (= before) |
  | 1012 | 7 / 10 / 2, 0 (=) | 10 / 10, 2 (=) |
  | 1 | 2 / 6 / 1, 1 (=; sub-class B) | 8 / 8, 0 (=) |
  | 2 | 5 / 8 / 1, 0 (=) | 2 / 2, 4 (=) |
  | 3 | 3 / 8 / 3, 1 (=; sub-class B) | 12 / 12, 2 (=; kerb own 1 =) |
  | 4 | 5 / 8 / 1, 1 (=; sub-class A) | 12 / 12 → 11 / 11, 1 (=) |

  No cell rose; one fell (the end rule W).

### RELATED's bands reds (a-09's pins, read in the lane's mirror; PROPOSED re-pins, not edited)

a-09's S14 – S17 pins (`packages/kernel/test/arr/bands/`) were recorded on a branch whose base predates M0-a-05's
S9 – S11 landing (dcf05e0c; the branch's choices ids C-0423 – C-0426 were renumbered C-0428 – C-0431 at its landing,
9f631a41), and no seat had run them against S9 – S11's engine before this round's RELATED. Each red was read with
`S12F` switches in the mirror (E the end rule W, S the seam re-walk, F the corner-bound tier, R the re-landing, C
`cutStretch`; ESFRC = the S11 model):

| test | red on S12 | red on the S11 model | cause | outcome on S12 | handling |
|---|---|---|---|---|---|
| `closing.test.ts` 'seed 20261011 draw 1109' | yes | no (E alone restores it) | the end rule W | committed, healthy, tiling; `bandClosings` [] (no along closing to (0, 1 631) now); `closingsBeyond` [] | DECLARED SHIFT of this round — PROPOSED re-pin for a-09: closings [] , kerb(0) `272,0 4000,0 4000,4000 0,4000 0,1631 15,887` |
| `dryrun.test.ts` 'draws 389 and 1109' | yes | no (E restores it) | the end rule W | face 1 reads EMPTY, no block in it (S8 ≡ S9 holds), committed as band through a wedge: wholeBand [2], band [3, 1, 0], wedges [1], 1 block | DECLARED SHIFT — PROPOSED re-pin: `wholeBand` [2] (face 1 in `band` and `wedges`) |
| `restage.test.ts` 'N2' | yes | no (F or R off restores it) | forms (1) and (5) built (the cut back's corner-bound tier, the re-landing) | face 0's kerb the same outline with way:1's strip-edge vertices kept (3 972, 150) … (3 947, 3 330) and (3 482, 3 932); 4 savepoints, census `faithful: 'taken'`; `clear`, no sliver kept, the other faces EMPTY, S8 ≡ S9, wholeBand [1, 2], 1 block, the band | DECLARED SHIFT — PROPOSED re-pin of the kerb string, `saves` 4 and `faithful: 'taken'` |
| `hardening-s15.test.ts` 'network 561' | yes | yes | S9 – S11's engine against S8's pin (PLAUSIBLE: the S11 model reproduces N-7's 3e8ec437, not every S11 byte) | `k.kerb.length` 2 (pinned 3) | foreign to S12 — REPORTED (N-s12-4) |
| `closing.test.ts` "fast-check's shrunk counterexample of seed 20261011" | yes | yes | as above | face 1's kerb string differs past (2 935, 3 961) | foreign to S12 — REPORTED (N-s12-4) |
| `restage.test.ts` 'N1' | yes | yes | as above | face 2's kerb `2482,0 4000,0 4000,2553 447,69 448,15 2390,92 2425,85 2455,65 2475,35` (pinned `449,0 712,0 2390,92 … 447,72`) | foreign to S12 — REPORTED (N-s12-4) |

### Refusal verdicts (J290 / N-58)

| class | input kind | verdict | where |
|---|---|---|---|
| Q104 W (the end's fallback beyond the bound, a seat within it) | LAWFUL | MAKE-IT-SUCCEED — fixed | the end rule W, C-0456 (1) |
| Q104 A and B (no seat on F's boundary within the bound, §3.10) and Q58's 1 524 | LAWFUL networks; the request (a contact pinned within `attractCm` on F's boundary) unsatisfiable under §3.10 and the fidelity bound | REFUSE, typed (N-57 (2)'s code, UNLAID_DEEP at the read), the proof pinned; the alternative layer is a-09's contract or the family's generator — REPORTED (notBuilt #4) | C-0456 (2) |
| notBuilt #3 (1), (3) – (5) | LAWFUL | MAKE-IT-SUCCEED — built | C-0456 (3) |
| notBuilt #3 (1′) | LAWFUL | MAKE-IT-SUCCEED, kept with J238 (1)'s proof (the design's call; M4's thin-face handling); re-check at M1's first towns | C-0456 (3), C-0424 (3) |
| notBuilt #3 (2) | LAWFUL | commits (no refusal); its drawn order kept as (1′) | C-0456 (3) |
| the widened family's own refusals (all at the input dead end's own tip) | LAWFUL | a-09's class (not the placement) — unchanged, noted | the bands gate above |

### Notes (not failing lines)

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s12-1 | **Q104's residual (notBuilt #4) for the session.** corridorUnion's own refusals on a-09's measurement seeds re-measure 0 / 0 / 1 / 0 / 1 / 1 (seeds 20261011 / 1012 / 1 / 2 / 3 / 4), not 0: seeds 1, 3 and 4 are sub-classes B and A, where no vertex can stand on F's boundary within the fidelity bound of the contact (`q104.test.ts`'s proof). No insert/ change can seat one or commit beyond the bound. | a ruling: N-57 (2)'s contract for a contact with no lawful seat (a-09), or the bands family's generator (a T-junction below `minFaceAngle`) | the session (a-09's next touch) |
| N-s12-2 | **PRECM equivalent on the final engine.** The S11 check's PRECM changes no pin and no outcome (the differential probe above). | none (an equivalent survivor, one line) | — |
| N-s12-4 | **a-09's S14 – S17 pins against M0-a-05's S9 – S11 engine.** Three bands pins (`hardening-s15.test.ts` network 561, `closing.test.ts`'s shrunk counterexample of 20261011, `restage.test.ts` N1) are red on the lane's S11 model as on S12: the two items landed in an order no seat had tested together (above). | the session: a-09's next touch re-pins them on the landed engine (or a ruling that M0-a-05 restores S8's reads there) | the session |
| N-s12-3 | **The end rule A's lesson.** A rule that lands an input point onto another vertex must hold that vertex within the fidelity bound of the point; bfuzz's fidelity judge caught it only at 10⁴ on one seed of 31. | none now (A withdrawn); a KI row for the hardening pass if a later end rule absorbs points | hardening |

## Closing check of S12 (lane `check/M0-a-05-close-s12`, 2026-10-28 – 2026-10-30; verdict FAIL in `checks/M0-a-05-s12.md` — notBuilt #3's form (1) at an obtuse tip within the corner bound neither built nor kept with J238 (1)'s proof; Q104, forms (3) – (5), (1′), (2) and Q112 confirmed; gates green; census held)

Q104's fix (the end rule W) is confirmed with this seat's own no-seat proof over the six residual networks (0 seats; the
control 417) and a-09's harness re-run read-only at 7 seeds (corridorUnion own 0 / 0 / 0 / 1 / 0 / 1 / 1, no cell rose, seed
4's widened 12 / 12 → 11 / 11); forms (3) – (5) are confirmed by the commit pins, this seat's S11 model (the five features
off reproduces N-7's `3e8ec437…` exactly) and its mutants (SEAMROT killed by 4, PRECM equivalent by a differential of
9 · 10⁴ cases, 0 changes); Q112's re-pin is green under `kernel` and `kernel-tiny`. The failing line: the round's claim
that a retrace within the corner bound stands at most 90° wide is false — this seat's targeted family T found lawful
V-chains beside a junction whose cut back reaches the corner-bound tier at an obtuse tip (seed 503 740: V 41 cm from W,
the corner 99°, committed with W of degree 3 and refused `(way, way:c1) branches`; under the far tier at every corner it
commits A–W–B simple), and the registered families reach the same decision point (bfuzz at 20261013: 718 far-tier cut backs,
39 at an obtuse tip). The class is neither built nor kept with a proof (N-64 (4)). Four rows:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s12c-1 | **Q104's three residual own refusals, routed to the session (ZERO REFUSALS, J264).** On a-09's chord family at PLAT_FUZZ_SEED 1 (draw 8 419, the pinned contact (20, 2 116)), 3 (draw 7 294) and 4 (draw 9 373) corridorUnion refuses one lawful network each under N-57 (2)'s clause texts; the harness does not re-measure to 0. This seat's probe P2, written from §3.6's placement tests (i) – (iii) and §3.10's clearance without the code under test, finds no seat on F's boundary within 2 · √2 · `attractCm` of the contact in any of the six residual networks (the control, case (b), 417 seats), so no insert/ change can commit them within the fidelity bound: the round's REFUSE with the proof (notBuilt #4, C-0456 (2), N-s12-1) is the lawful outcome of the request as made. | the session's ruling: N-57 (2)'s contract for a contact with no lawful seat (a-09), or C-0177 (2)'s sub-`minFaceAngle` T-junction in the bands generator; until then a-09's gates keep N-63 (3)'s known class under notBuilt #4's text | the session (a-09's next touch) |
| N-s12c-2 | **kernel-tiny `fidelity.test.ts` E_INVARIANT 2 > cap 1 at a random seed (RELATED@1000's one new red).** The fidelity property's cap at 10³ is 1 (`refusalCap`: Poisson 99.9 % of 0.026, at least 1) and its refusals come in clusters — this seat's scan of 2 · 10⁵ case seeds (1 000 001 …, `kernel-tiny`, the mirror) met 5 refusing cases carrying 8 E_INVARIANT (1 014 918 ×3, 1 084 572 ×2, 1 062 924, 1 189 337, 1 192 055), each identical digest for digest on S12 and on this seat's S11 model — the pre-existing KI-1 residual at 0.40 per 10⁴ at random seeds (caps.ts's 0.10 over the 31 seeds), not the round's. A RELATED run at a random seed can meet one refusing case with two refusals and go red on a count the 31-seed measure never saw. | the session (J207: raising a cap is the session's call, never a seat's): count refusing cases rather than refusals against the 10³ cap, or set the fidelity property's 10³ cap to 2; otherwise a KI row for the hardening pass | the session; M4 |
| N-s12c-3 | **a-09's three foreign bands pins (N-s12-4): attribution CONFIRMED.** On this seat's S11 model (the round's features Q1 + F3b + F1 + F5 + F4a switched off in the mirror; it reproduces N-7's `3e8ec437…` exactly) `hardening-s15.test.ts` network 561, `closing.test.ts`'s shrunk counterexample of 20261011 and `restage.test.ts` N1 stay red while the round's three declared shifts (`closing.test.ts` 1109, `dryrun.test.ts` 389 / 1109, `restage.test.ts` N2) go green: the three are S9 – S11's engine against pins recorded on S8's, foreign to S12. A soft run of the three shifted pins on S12 fails only their exact kerb / closing / class lines; every outcome law after them holds. | a-09's next touch re-pins all six on the landed engine (the round's PROPOSED re-pins for its three; the other three need a-09's own reading) | the session (a-09's next touch) |
| N-s12c-4 | **A targeted family for notBuilt #3's class (this seat's T; `/home/user/maps-scratch/waves/check-M0-a-05/s12/zzs12t.test.ts`, mirror only, C-0106).** V-chains and small rings beside a `way` whose end, bend or junction W stands within the corner bound of the corner V (37 – 73 cm), the arms aimed within asin(`attractCm` / |VW|) of W, existing geometry planted near the first arm's start: on the tree 441 of 19 998 lawful chains commit with a vertex of degree 3 in their own rows and are refused `branches` under a linear key (open 3-point 66, closed 132, open 4-point 243; mandatory 329, optional 112; 153 with the branch at W itself; 16 with an obtuse input corner — the retraces the cut back does not route, notBuilt #3's class by C-0424 (3)'s rule, (1′) and (2) among them); the optional class's 537 refusals are its own precision rules (453 a wedge beyond `attractCm`, 84 a corner below `minFaceAngle`: the generator's degenerate corners); no `allProblems`, no mandatory refusal. A fit register for the class's re-check at M1's first towns and for M4's hardening; its generator is in the lane's scratch, not the tree. | add T (or its arrangements) as a counted family of the class at M4, with the per-form counts; the re-check at M1's first towns counts the same forms in the towns' ways | M4 (and the re-check at M1's first towns) |

## Fix round S13 (lane `build/M0-a-05-fix-s13`, 2026-10-30; the S12 closing check's failing line — notBuilt #3's form (1) at an obtuse tip within the corner bound; N-64 (3) – (4), J238 (1) – (3), J264, J290 / N-58, J499; C-0455)

One line, inside the item's owns (insert/insertChain.ts and test/insert/step3-5/reentry.test.ts); a-09's kerb,
corridorUnion and bandUnion and its bands harness were run read-only, never edited. One Claude Code cloud container
(linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib, Node 24.12.0), no restart.

### Row-by-row outcome

| line | outcome | evidence |
|---|---|---|
| notBuilt #3's form (1) at a tip wider than 90° within the corner bound (the S12 check's family T seed 503 740; F1b not equivalent) | **BUILT** (C-0455) — the cut back's corner-bound tier (candidates beyond √2 · `attractCm`, within 2 · √2 · `attractCm` of the corner's input point) at every corner after the √2 · `attractCm` tier, the S12 check's F1b; `acute` removed; a declared deviation from §3.6 *Existing geometry wins*'s "at an acute tip", every placed vertex still within the fidelity bound (`tryCuts` bound `FIDELITY_SQ`). The "at most 90° wide" claim struck from C-0456 (3)'s premise (in place), insertChain.ts's comments above `near` / `far` and the passes' header, and reentry.test.ts's form (1) comment; C-0424 (3)'s list amended in place (form (1″) BUILT) | `reentry.test.ts` § form (1″) (new, three cases × kernel and kernel-tiny): seed 503 740's arrangement (the four existing ways, W (1 635, 2 421) a junction; the mandatory open chain A (1 445, 2 274) → V (1 644, 2 461) → B (2 135, 2 081)) — the corner 99° and within the corner bound (41.0 cm); under `invisible` placed (1 461, 2 257) · (1 635, 2 421) · (2 126, 2 067), no vertex of degree ≥ 3, W of degree 2, V gone; through M0-a-06's transaction under `way` the batch commits. Red on the S12 engine (placed V kept at (1 644, 2 461); the transaction refused `E_INVARIANT (way, way:c1) branches`), exactly the S12 check's tree row; green now |

### Self-check (J183; the lane's mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s13`, isolation proven — no link into the tree, the workspace dependency's realpath inside the mirror)

| id | the fault re-introduced | result |
|---|---|---|
| ACUTE (the S12 engine; F1b's inverse) | `cutBack`'s far tier gated again on the corner at prev's input point being at most a right angle (`dot(pp − at, next − at) ≥ 0 ? far : []`) | **KILLED** by the form (1″) pin — `reentry.test.ts` alone and on the item's folder (`PLAT_FUZZ_RUNS=1000 … vitest run --maxWorkers=1 --bail=1 packages/kernel/test/insert/step3-5/`: 1 failed, the `invisible` pin); insertChain.ts restored from the tree and `cmp`-equal after |

### Gates and census (the tree, this container, the final engine)

- `corepack pnpm install --frozen-lockfile` exit 0; `corepack pnpm lint` exit 0 (`lint: probe-red ok`, 9 whole-tree checks);
  `corepack pnpm build` exit 0.
- NEAR (the item's folder, kernel and kernel-tiny, PR size 10⁴, W = 1): exit 0 — 28 files, 662 / 662 (S12's 656 and the
  new pin's 3 × 2), 870 s.
- RELATED (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over insertChain.ts, J499's full
  1 000): exit 1 — 472 files (6 failed | 466 passed), 6 470 tests (8 failed | 6 462 passed), 6 331 s. The eight reds are exactly S12's set (§ Fix round S12, *Gates and census*; the S12 closing check): `testkit` `test/edge/repins.test.ts` EP-01/S5a/coincident 1 658 509 524 and `kernel` `test/arr/booleans-buffers/booleans.test.ts` s6 (S9's declared shifts), and a-09's six `test/arr/bands/` pins (closing ×2, dryrun, hardening-s15, restage ×2: three S12's declared shifts with PROPOSED re-pins, three red on the S11 model too — foreign, REPORTED). No new red; the kernel-tiny fidelity KI-1 red the S12 check met at a random seed did not appear at this run's seed. No J176 bench red in the selection's failures.
- The census (J238 (2) – (3): `bfuzz.test.ts` and `fidelity.test.ts`, `PLAT_FUZZ_SEED` each of caps.ts's 31 seeds and
  20261013, 10⁴ per property, `PLAT_FUZZ_COUNTS` read, W = 1, the tree): every seed exit 0; all 124 cells equal to
  `caps.ts`'s table cell for cell — random 55 + 48 = 103, constructive 30 + 13 = 43, mandatory-only 47 + 2 = 49,
  fidelity 3 (S12 → S13: no rise, no fall); 20261013 0 + 2 / 0 + 1 / 2 + 0 / 0 held, N-7's golden digest (045e8cc2…)
  unchanged in the same runs. `caps.ts` unchanged.
- The bands gate (a-09's `test/arr/bands/bfuzz.test.ts`, read-only, `--silent=false` to read its counts,
  `PLAT_FUZZ_SEED` 20261011 / 1012 / 1 / 2 / 3 / 4, 10⁴ chord + 2 000 widened): every seed exit 0, every cell equal to
  C-0456 (4)'s S12 column (chord kerb / corridorUnion / bandUnion insertChain, own: 5 / 11 / 6, 0; 7 / 10 / 2, 0;
  2 / 6 / 1, 1; 5 / 8 / 1, 0; 3 / 8 / 3, 1; 5 / 8 / 1, 1 — widened kerb / corridorUnion insertChain, own: 7 / 7, 3;
  10 / 10, 2; 8 / 8, 0; 2 / 2, 4; 12 / 12, 2 (kerb own 1); 11 / 11, 1).

### Refusal verdicts (J290 / N-58; the counts BEFORE → AFTER the round)

| class | input | verdict | count |
|---|---|---|---|
| notBuilt #3 form (1″) — an obtuse corner within the corner bound re-entering a vertex of its own path (T seed 503 740) | LAWFUL | **MAKE-IT-SUCCEED: built** (C-0455) | the S12 check's family T: 1 refused 'branches' → 0 on its replay (pinned); the registered families' counted cells unchanged (no counted refusal was of this class) |
| the census's counted cells (random, constructive, mandatory, fidelity) | LAWFUL | KI-1's residual, notBuilt #2 (M4, C-0423), unchanged | 103 / 43 / 49 / 3 → 103 / 43 / 49 / 3 (198 → 198) |
| notBuilt #3 (1′), (2) | LAWFUL | KEPT with J238 (1)'s proof (C-0456 (3)), re-check at M1's first towns | unchanged |
| corridorUnion's own (bands chord family; Q104's sub-classes A and B, notBuilt #4) | LAWFUL networks, no seat within the bound | REFUSE with the proof, REPORTED (C-0456 (2), N-s12c-1) | 0 / 0 / 1 / 0 / 1 / 1 → the same |

## Closing check of S13 (lane `check/M0-a-05-close-s13`, 2026-10-31; verdict PASS in `checks/M0-a-05-s13.md` — notBuilt #3's form (1″) BUILT, confirmed)

The S12 closing check's one failing line is fixed: on the S13 engine the S12 seat's family T (19 998 lawful cases) equals
that seat's mutant F1b case for case and differs from the S12 engine only at seed 503 740 (refused `branches` → commits
A′–W–B simple), pinned in `reentry.test.ts`; the census (32 seeds × 4 cells at 10⁴) and the bands gate (7 seeds) held cell
for cell; RELATED@1000's eight reds are the S12 round's declared / foreign set. Two rows:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s13c-1 | **FAR1 survives — the corner-bound tier's breadth is unpinned.** This seat's mutant FAR1 (`far … .slice(0, 1)`: only the nearest candidate beyond √2 · `attractCm` tried) changes no pin, no NEAR test at the PR size and no RELATED@1000 test (its reds the known eight); on family T it changes one case, seed 516 267 (an acute 25.5° open chain beside a junction W 59 cm from V: the tree cuts V back through the second far candidate and commits simple; the mutant commits W of degree 3 and the transaction refuses `(way, way:c1) branches` — fail-safe). Not equivalent; it bears on S12's acute-tip tier, not on this round's change. | pin T 516 267's arrangement in `reentry.test.ts` (commit, a simple path, under `invisible` and a `way` key) so the "at most 8 per bound" breadth is held | next a-05 round, else M4 |
| N-s13c-2 | **LOOSE equivalent.** Gathering cut-back candidates within 4 · `FIDELITY_SQ` changes one T case (506 010) whose moved vertex stays within the fidelity bound (71.2 cm < 73.5 cm): the landing's bound check holds the promise. | none (an equivalent survivor, one line) | — |

## Hardening round S14 (lane `build/M0-a-05-fix-s14`, 2026-11-11 – 2026-11-12; THE ROUTER ROUND — notBuilt #2's classes in a fifth pass (Q83 with Q44 and Q64; RL1), Q77's 2⁵³ tie, MK / ML, Q62's R-12, Q142's FAR1, Q152's group B; J637, J693, J697, J742, J744; C-0489)

Three build seats of one lane in one Claude Code cloud container (linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib,
Node 24.12.0), two waiter hand-offs (the BEFORE chain `/home/user/maps-scratch/waves/s14-before`, the AFTER chain
`/home/user/maps-scratch/waves/s14-after`; their HANDOFF.md files name every path). Edited inside the owns only:
`src/insert/{stretch,snapRound,insertChain}.ts` and `test/insert/step3-5/` (`caps.ts`, `bfuzz.test.ts`,
`fidelity.test.ts`, `stretch.test.ts`, `crossings.test.ts`, `reentry.test.ts`, `router.test.ts`,
`register/s14-rescues.json` NEW, `register/s5-register.json`); `crossings.ts`, `wedge.ts`, `rewalk.ts`, `index.ts`
unchanged; no export of `insert/index.ts` or the barrel added, removed or renamed; ChainCtx gains optional fields only
(`fifth`, `endStretch`, `fifthPick`); no refusal code or message text changed. Every other file was read and run, never
edited. THE BASE MIRROR `/home/user/maps-scratch/waves/base-build-M0-a-05-fix-s14/plat` (`cp -a` of the tree at the RESUME
head before the first edit, never written); the probe copy `/home/user/maps-scratch/waves/s14-probe-base/plat` (its
`packages/*/src` `diff -r`-identical to the base; only the three instrumented census test files copied in).
Preconditions: arena/write.ts, tx/frames.ts and kernel/test/tx/write-door.test.ts present, the guard green; the owns are
the eight entries; `corepack pnpm landed:verify -- flow-7 --item M0-a-05` printed ok.

### THE FIFTH PASS (LINE 1) as built

`insertChain`'s `passes` and its watch / back / null sequence are unchanged. After the sequence, when its final result
is `boundRefusal` and not `reentered`, ONE `attempt(true, null, true)` runs with `ctx.chainPath = 'back'` and
`ctx.endRules = true` (pass 3's end rule), `ctx.fifth = { a: null, b: null }` set for its whole run (its a / b set per
segment by `routeSegment` and restored after, null in step 2), reset by every `attempt`. Its result replaces the base's
ONLY when `ok` (a retrace is never ok); anything else is discarded and the base's result returned unchanged (code and
full detail, an E_BELOW_MIN_EDGE's stops suffix included). The four strip-gated sites read `ctx.strip ?? ctx.fifth`:
`stepTwoStrip`, `readings`' ends, the wedge corner gate, `stripLanding`. Pass 5's readings (stretch.ts `beyondFifth`,
`endStretchAt`; snapRound.ts `fifthExit`, the D gates and the step-4 landing gate; insertChain.ts r8 / r8-anchored, the
step-2 landing list with `ctx.fifthPick`, the walk's `turns`, `exactlyCovered` / `exactlyWithin`) read the field and
nothing else, so passes 1 – 4 are byte-for-byte the base's (LINE 12 (a) below: no committed case moved).

### Row-by-row outcome

| line | outcome | evidence / mutant |
|---|---|---|
| LINE 1 (the vessel) | **BUILT** as above | (a) every rescue in `register/s14-rescues.json` judged by `fidelity.ts` `fidelityProblems` = [], `allProblems` = [], `dissolvableProblems` = [] (router.test.ts describe "S14's fifth pass …"); (b) **CODE** (pass 5's own refusal returned) KILLED by the s5 residual register's exact base detail; (c) **P5-INSIDE** (pass 5 inside `passes()` after `inBound(1)`) KILLED by the D rescue −5203 mandatory 7499; and LINE 12 (a)'s per-case diff shows no committed → differently-committed case; (d) E- / S- / DWPV-EARLY NOT RUN as mutants this round (their kill is LINE 12 (a)'s per-case diff; owed to the next round's table) |
| LINE 2 (class E) | **BUILT** in pass 5: step 2's in-bound landing list (across, nearest, onEdge, free, each vertex within the bound), nearest first ties y then x, ≤ RELAND_MAX, routed from each in turn (`turns`; a two-point chain's ends jointly) | rescue E 5309 constructive 1390 pinned; **E-OFF** KILLED; **E-FIRST** = E-OFF here (the walk's own landing is the nearest, k = 0; "first only" removes `turns`), killed by the same pin; **E-WIDE and the `noSeat` certificate NOT BUILT** (owed; see Open below) |
| LINE 3 (class S) | **BUILT** r8 in pass 5 (stretch.ts `endStretchAt`: the segment's own ends and provenance 'fallback'; a piece shared INTO x never the piece shared out of x) | rescues S 6907 random 8147 and S5's M0-a-08 overlay case (oob:crossing-fallback, W_STRETCH_SHARED) moved to `s14-rescues.json`; **S-OFF** KILLED; diagnosis: of pass 5's 95 'no route' ends over the 203 counted base refusals most are class S with a crossed run holding no qualifying point within the bound (placeOnRun finds none; the fallback stands far off, e.g. 458 cm) — the count of r1 failures at a pair's end beside a near-parallel incident piece was NOT taken; **S-SEGEND, S-ANGLE, S-FOLD fixtures, `noSeat-S` and the 243 / 310 / 751 / 999 captures NOT BUILT** (owed) |
| LINE 4 (D / W / P / V / C) | **BUILT** in pass 5: D (a contact or stretch landing beyond the input segment's bound is none), W (`fifthExit`; the wedge corner gate on the field), P (every step-4 landing beyond the bound through `stripLanding`, splits included), V (`exactlyCovered`: the segment-to-route half exact, BigInt, no budget) | D rescues −5203/7499, −6203/5217, −8009/1418 and S5's overlay D case; fidelity 5903 V 3426 and D 4185 rescued; **W-STRIP**, **P-STRIP** KILLED; **V-HALF** KILLED (router.test.ts 'LINE 4 V' 1 cm further: 1 failed); **V-BUDGET / V-2X** EQUIVALENT on lattice input (router.test.ts's comment: an end piece's distance is monotone, a tie only at t = 0 or 1, reached by the halving's degenerate interval within ~1 075 evaluations); **D-OFF SURVIVES** (the D gating moves no census case: the replay of the 202 base-refused cases under D-OFF equals the tree's; a constructed fixture owed); C: no reading beyond r1 – r8 built; **the 73 / 183 / 77 captures and the per-class J238 (1) certificates NOT BUILT** (owed) |
| LINE 5 (measures) | (i) **MEASURED** — `caps.ts` `recordCounts` gains `classes` and `unclassed` (`ClassTally`, `refusalClassOf`), the per-case log `CaseLog` (PLAT_FUZZ_CASELOG); BEFORE / AFTER below; the table, MEASURED_* and the ratchet lowered; (ii) **MEASURED** — the trio below; (iii) q133.test.ts 7 / 7 green on base and tree (no set input moved its rung); the six flat outlines probe NOT RUN (owed); (iv) the proof per class NOT GIVEN (owed) | figures below |
| LINE 6 (Q77) | **FIXED** — stretch.ts `squareWithin(o, r2, l2)` (inclusive; past 2⁵³ on the doubles' tie BigInt(o)² ≤ BigInt(r2)·BigInt(l2); a non-integer tie keeps the doubles' answer) used by `withinSegment`, `passesWithin`, `inInputBound` and `inFidelity`'s route-to-segment test; the comment reworded; nearestPiece's rank, crossings.ts :339 and walkRun's band STATED unchanged; crossings.ts :219 keeps a-01's shape (pin only) | **Q77-DBL, Q77-STRICT, Q77-THROW, Q77-HALF** KILLED (stretch.test.ts describe 'Q77 (round S14) …'); the r = 51 pin past 2⁵³ in crossings.test.ts; no tie past 2⁵³ in the census (LINE 12 (a): no committed case moved) |
| LINE 7 (MK / ML) | **NOT DONE** (owed) — no constructed arena and no proof this round. One gap in N-s8c-4's equivalence reading found for the next seat: `checkEdge`'s attractCm row skips a finer edge SHARING an end with the new edge (`shared === 1` → `continue`, snapRound.ts :327-337), and `recordHolding` (:364) runs before the face-corner rows, so ML's 'the attractCm row refuses first' does not cover a new edge whose midpoint lies in a finer record's route-to-walk strip beside a finer edge incident to its own end — the arena to try for ML | — |
| LINE 8 (R-12) | **RE-MEASURED AND PINNED** — the along family at seed 648 replayed by a probe outside the tree on base and tree: batch 13 commits on both through the 'back' pass; way:13's input chain (3640, 0) → (974, 1102) → (2968, 4000), SHA-256 of its JSON eb34c32335f36ffe92447aec5224480c23af0c16680ea28df05f537c0d210b95; it RETRACES; pinned in reentry.test.ts describe "Q62's R-12 (round S14) …" (form (1″)'s shape: invisible — placed 3640,0 · 998,1092 · 2968,4000, Q cut back onto P, a simple path; the way key through tx commits a simple run); the 26.000 cm tie pinned in stretch.test.ts | **Z13** (`reentered` → false) KILLED by reentry.test.ts form (1′); the R-12 pin itself stays green under Z13 (pass 5 then commits the chain identically — a statement, not a survivor of the line's promise); a-06's pins at 648 @13 did not move (LINE 12 (e)) |
| LINE 9 (FAR1) | **NOT DONE** (owed): no constructed arrangement, family T not regenerated | — |
| LINES 10 – 11 (Q152 group B) | **NOT DONE** (owed): the S8 model mirror, the one-switch isolation and the two-sided judgment were not run this round; the three reds reproduce on base and tree with identical messages (below) | — |
| LINE 12 (the shift) | **MEASURED AND DECLARED** below — (a) per-case; (b) re-recorded files; (c) the bands gate; (d) roots not run (owed: CITY roots / fusion 3 / integrated 4); (e) other items' tests; (f) work | figures below |

### Figures (BEFORE in the probe copy / base mirror, AFTER on the tree; commands in the two HANDOFF.md files)

- **The census (LINE 5 (i), J264 (4))** — `PLAT_FUZZ_SEED=<s> PLAT_FUZZ_CASELOG=… PLAT_FUZZ_COUNTS=… corepack pnpm exec
  vitest run --project kernel --maxWorkers=1 packages/kernel/test/insert/step3-5/bfuzz.test.ts
  packages/kernel/test/insert/step3-5/fidelity.test.ts` and `--project kernel-tiny` over fidelity.test.ts, caps.ts's 31
  seeds and 20261013, three seeds in parallel. Every seed exit 0 both sides, unclassed 0 both sides. BEFORE = caps.ts cell
  for cell: random 55 + 48 {E 41, S 42, D 8, W 7, V 4, P 1}, constructive 30 + 13 {S 21, E 9, D 6, W 3, V 3, P 1},
  mandatory 47 + 2 {S 32, D 7, W 7, E 2, P 1}, fidelity 3 {D, S, V}; AFTER: random 54 + 48 {S 41, …}, constructive
  27 + 13 {E 8, D 4, …}, mandatory 46 + 2 {D 6, …}, fidelity 1 {S}; 20261013 0 + 2 / 0 + 1 / 2 / 0 both. **Lowered by 7
  on four families, none raised**: random 6907 2+4 → 1+4 (S); constructive 5309 3 → 2 (E), −6203 3 → 2 (D), −8009 1+1 →
  0+1 (D); mandatory −5203 1 → 0 (D); fidelity 5903 2 → 0 (V, D); kernel-tiny fidelity 5903 2 → 0 (the same two). Per-case
  logs: 4 815 156 kernel lines + 1 895 231 kernel-tiny; `sha256sum census/*.tsv | sha256sum` BEFORE 84a3abc1539483b3e80a774397c7b4fd26702c66d2825e7766f6aa759f96ed59, AFTER
  0d24fe45fee6466124fa7b5916b197b99428b56a0a78d65ec9787551636f46aa.
- **LINE 12 (a) NO-SHIFT**: base → tree, key (seed, property, case, chain): 4 815 148 identical, 7 refused → committed
  (the rescues above), 1 changed — −6203 constructive 5217 chain 7, E_KEPT → E_KEPT with another detail ('inside a finer
  face at (1568, 124)' → 'within attractCm of a finer vertex at (2631, 1909)'), a LATER chain of the rescued sequence;
  nothing else. No committed → differently-committed case. The N-7 slice's 1 862 per-insertion lines per seed identical;
  N-7's GOLDEN (045e8cc2…) unchanged and green.
- **The trio (LINE 5 (ii))** — a-08's harness at 8611 × 1 000 read-only: BEFORE 88 lines, sorted SHA-256
  897f3852762a86c35c9dbcba9f61e1c4d029b34b454a34a80d8b2190c66883a0 (= a-08's; buffer S 26 D 7 E 7 W 5, offsetFace S 32 E
  6 D 3 W 1 C 1); AFTER 83 lines, sorted SHA-256 e77dec17ca7eda6affd8243b66b652589eab18152f42be65c9064f5399bb2da3
  (buffer S 28 D 3 E 6 W 5, offsetFace S 32 E 6 D 1 W 1 C 1); 96 / 96 tests green both sides (every oracle holds on every
  commit). Leaving: 5 inputs now CLEAN COMMITS (buffer arb-stroke D, arb-thin D ×2, offsetFace arb D ×2) — REPORTED for
  a-08's re-record (N-s5c-4); 2 inputs (buffer arb-stroke, base E (−55472, 1189)→(−54627, 1202) and D (35699, 3891)→
  (35872, 5878)) whose refused chain pass 5 now commits and whose LATER chain is refused class S ((−55333, 1151)→(−55331,
  1234), (37693, 4221)→(37649, 4342)) — a later chain of the same sequence (LINE 12 (a)'s source), DECLARED for a-08's
  re-record. No oracle failure.
- **The router's set (LINE 5 (iii))**: layout/test/districts/q133.test.ts 7 / 7 green on base and tree (no set input
  moved its rung expectation).
- **The bands gate (LINE 12 (c))** — the folder in the base mirror with PLAT_FUZZ_SEED unset printed seed −906380766; the
  tree at PLAT_FUZZ_SEED=−906380766 (kernel, JSON reporter): 221 passed / 6 failed both sides, the six = Q152's six,
  every test's status and failure message identical base → tree (paths normalised); the folder's files' SHA-256 (sorted
  names, `sha256sum * | sha256sum`) fd4688a450c8f4915d90d6afa29c17a1476ba5d3d42b4f94bb037078cbf069f3 base = tree. No
  re-pin rehearsal was run (no declared red moved). bfuzz.test.ts at 20261011 / 1012 / 1 / 2 / 3 / 4 (10⁴ chord + 2 000
  widened, `--silent=false`): widened cells all equal; chord kerb / corridorUnion equal; **chord bandUnion insertChain
  MOVED**: 20261011 6 → 7, 1012 2 → 3, 1 1 → 1, 2 1 → 4, 3 3 → 5, 4 1 → 1 (+7, 'replays'); seed 2's kerb and corridorUnion
  cause tallies moved (no-route 2 → 1, displaced 2 → 3; counts equal: the replay on insertChain alone now commits that part
  through pass 5 and reads 'displaced'). DECLARED (LINE 1 / LINE 2's pass 5, a later chain of the same op): a probe in
  the lane mirror (pass 5 switched by an env flag in the MIRROR's insertChain only) replayed the 7 new networks — with
  pass 5 off all 7 bandUnion commit; with it on, pass 5 commits one insertion of bandUnion's that the base refused class E
  (where the base went on to its retry), and a later insertion of the same op is then refused (base detail class E; pass 5 there ends E_DEGENERATE 'empty' ×4 or E_LEVEL ×3, discarded). The 7 inputs are
  the REFUSAL lines new in `/home/user/maps-scratch/waves/s14-after/bandsbfuzz-{20261011,1012,2,3}.log`. REPORTED to
  M0-a-09 (arr/bandUnion.ts: which of its insertions — the along closing :436, the chord :451, the piece :514 / :667 —
  is the rescued one is to be read by its owner from the 7 inputs; the op could treat a later refusal after a rescued
  step as it treats the base's refusal of that step). Every bands bfuzz seed exit 0 both sides.
- **RELATED@1000 (LINE 12, gates)** — `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1`
  over stretch.ts, snapRound.ts, insertChain.ts (the three changed sources): exit 1, 7 361 tests, 10 failed, 7 350 passed,
  1 skipped, 12 100 s. The reds: a-09's six bands pins (Q152, identical messages to the base) and four bench tests —
  `bench/test/site/compose.test.ts` 'relief-60 default seed 2 (test size) refuses at S5 …' and
  `bench/test/site/spike.test.ts` ×3 (the river fixture's water gates; the strip receipt; containment at relief-60 seed
  2) — **red on the BASE mirror alike with identical messages** (`/home/user/maps-scratch/waves/s14-fin/bench-base.json`:
  4 failed | 18 passed): not this round's; a note for the session (they were not in a-06 S9's RELATED reds). The item's
  own folder, kernel/test/tx/cost.test.ts, door.test.ts and write-door.test.ts green in it.
- **NEAR** (step3-5, kernel + kernel-tiny, PR size, W = 1): exit 0, 28 files, 694 / 694, 766 s (before this seat's caps /
  ratchet edit; the ratchet describe re-run green after it).
- **PLAT_UNDO_ORACLE=1** over step3-5 + kernel/test/tx/write-door.test.ts + door.test.ts (kernel): exit 0, 16 files,
  360 / 360, 392 s. write-door.test.ts and door.test.ts untouched, no allowlist entry.
- **LINE 12 (f) work**: E_WORK_LIMIT in the census per-case logs 0 → 0; cost.test.ts green in RELATED; no limits table
  edited. Pass 5's charge per segment is bounded by its readings: r1 – r8 (+ r8-anchored) per landing pair, at most
  RELAND_MAX² landing pairs at a segment's two ends (the run's first) or RELAND_MAX at one end, each route charged as any
  pass's — a bound, not a measurement (the measured worst per segment is owed).
- **LINE 12 (b) this item's re-recorded files**: caps.ts (table, MEASURED_PER_1E4, MEASURED_COUNT: 102 / 40 / 48 / 1;
  caps 12 / 7 / 8 / 2 at 10⁴, 3 / 2 / 3 / 1 at 10³, 492 / 234 / 269 / 25 at 10⁶), router.test.ts's ratchet (103 / 43 / 49 /
  3 → 102 / 40 / 48 / 1), `register/s14-rescues.json` (5 census cases + 2 overlay cases moved from s5-register.json, each
  with `refusedOnBase`), s5-register.json (the two cases removed, its `source` names the move). The N-7 golden unchanged.

### The round's mutant table (lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s14/plat`, isolation proven; `s14-tools/runmut.sh`, `vitest run --project kernel --maxWorkers=1 --bail=1 <file>`, restored and `cmp`-equal after each)

| id | fault | result |
|---|---|---|
| Q77-DBL / Q77-STRICT / Q77-THROW / Q77-HALF | squareWithin doubles only / BigInt strict / non-integer guard removed / inInputBound and inFidelity back to doubles | KILLED (stretch.test.ts Q77) |
| Z13 | `reentered` → false | KILLED (reentry.test.ts form (1′)) |
| CODE | pass 5's refusal returned | KILLED (s5 residual register's exact detail) |
| P5-INSIDE | pass 5 inside `passes()` after inBound(1) | KILLED (s14 rescue D −5203 / 7499) |
| E-OFF (= E-FIRST) | the walk's `turns` gate false | KILLED (s14 rescue E 5309 / 1390) |
| S-OFF | r8's `endStretch` off | KILLED (s14 rescue, overlay class S) |
| W-STRIP | wedge gate on ctx.strip alone + fifthExit off | KILLED (s14 rescues) |
| P-STRIP | step-4 landing gate on ctx.strip alone | KILLED (s14 rescues) |
| V-HALF | pass 5 skips the segment-to-route half (`return true`) | KILLED (router.test.ts 'LINE 4 V', 1 cm further) |
| V-BUDGET / V-2X | the bisection restored / doubled in pass 5 | EQUIVALENT on lattice input (argued in router.test.ts) |
| D-OFF | the D gates off | SURVIVES (no census case moves; constructed fixture owed) |
| E-WIDE, S-SEGEND, S-ANGLE, S-FOLD, E- / S- / DWPV-EARLY, MK, ML, FAR1, FAR2 | — | NOT RUN (their pins are owed) |

### Refusal verdicts (J290 / N-58; BEFORE → AFTER)

| class | input | verdict | count |
|---|---|---|---|
| notBuilt #2 classes E, S, D, W, P, V (census) | LAWFUL | MAKE-IT-SUCCEED: built in pass 5; residual KEPT as '(notBuilt #2, M4)' WITHOUT the per-class J238 (1) certificates this round (owed — a failing state of LINES 2 – 5 until given) | 198 → 191 (kernel), tiny fidelity 3 → 1 |
| the trio's notBuilt #2 refusals | LAWFUL | as above | 88 → 83 |
| a-09's bandUnion after a pass-5 along closing | LAWFUL networks | DECLARED shift, REPORTED to M0-a-09 | chord bandUnion insertChain 14 → 21 over the six seeds |

### Open (owed to the next round of this item; nothing here is claimed done)

E-WIDE with the test-side `noSeat` certificate; S-SEGEND / S-ANGLE / S-FOLD fixtures, `noSeat-S` and the class-S
diagnosis count; D-OFF's constructed fixture; the router set's chain captures (73, 243, 310, 751, 999, relief-60 183,
relief-3000 77) and the six flat outlines at 180 m; the per-class certificates (LINE 5 (iv)); E- / S- / DWPV-EARLY as
mutants; LINE 7 (MK / ML: arenas or proofs — the shared-end gap above); LINE 9 (FAR1 / FAR2); LINES 10 – 11 (the S8
model, the one-switch isolation, the two-sided judgment); LINE 12 (d) the roots and (f)'s measured worst charge.

## Closing check of S14 (lane `check/M0-a-05-close-s14`, 2026-11-12; verdict FAIL in `checks/M0-a-05-s14.md` — the fifth pass (LINE 1), Q77's fix (LINE 6) and R-12 (LINE 8) confirmed; LINES 2 – 5, 6's r = 51 pin, 7, 9, 10, 11 and 12 still failing; gates green, the census lowered by 7 and nowhere raised)

Two sittings of one lane with one waiter hand-off (J714); the checker's own base, mirrors, mutants (52: 29 killed, 23
survive — the table in the verdict's §3) and the measuring chain under `/home/user/maps-scratch/waves/check-M0-a-05/`.
Re-measured on that base and on the tree, equal to the round's own figures: the census (BEFORE log hash 84a3abc1…
recomputed, four seeds of the checker's reproduced byte for byte; AFTER 32 seeds, 64 runs exit 0: 7 refused →
committed, 1 later chain, no committed case moved, E_WORK_LIMIT 0), the trio (88 → 83, 897f3852… → e77dec17…), q133
(7 / 7 both), the bands folder (six reds, identical messages, at the base's printed seed −1 872 225 363), the bands
bfuzz cells at six seeds (chord `bandUnion` 14 → 21), the undo oracle (360 / 360), NEAR (694 / 694) and RELATED@1000
(7 361 tests, 10 red: Q152's six and four bench/test/site reds red on the base alike). The failing lines and their
required changes are in the verdict's §1 and §6; the rows below are notes, none a blocker:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s14c-1 | **FOR THE SESSION (ZERO REFUSALS, J264).** a-09's bands bfuzz, chord family: `bandUnion` insertChain refusals rose 14 → 21 over the six seeds (20261011 6 → 7, 1012 2 → 3, 2 1 → 4, 3 3 → 5; seeds 1 and 4 equal; each new line 'no route … class E', cause 'replays'; committed networks equal) — the checker's figures from `chain/bbf-{base,tree}-<seed>.log` equal the round's. Pass 5 commits an insertion the base refused, bandUnion goes on where the base took its retry, and a later insertion of the op is refused: seven lawful networks whose `bandUnion` committed on the base are refused on the tree (typed, fail-safe). This item's census fell by 7 while another item's registered family rose by 7. Also at seed 2 one network's kerb / corridorUnion CAUSE tally moved (no-route → displaced 25 cm), refused on both sides with the same code. | the session rules whether S14 may land with this rise (a-09's op adapting in its own round), or whether the fifth pass must not change what a retrying caller sees (a contract question, not a-05's alone); the next a-05 round names, per network, the chain pass 5 commits and the chain refused after it | the next a-05 round / M0-a-09's round |
| N-s14c-2 | **P5-INSIDE survives; the round's table says KILLED.** The checker's form — the same block (chainPath 'back', endRules, `attempt(true, null, true)`) run inside `passes()` after `inBound(1)`, the outer block off — survives the twelve pin files (331 / 331), bfuzz + fidelity at 10³ and the per-case census on six seeds (−5203, 5309, 6907, −6203, −8009, 5903: 903 599 lines, none differing from the tree's). LINE 1 (c) allows a survivor with the search made; pass 5 is called only after the sequence (read). | correct the notes' table and C-0489's last cell to 'survivor, the search made', the mutant's exact text recorded; or pin it with a constructed form (1′) / (2) case whose 'back' refuses for the bound and whose `passes(null)` commits | the next a-05 round |
| N-s14c-3 | **The R-12 pins are green under Z13.** With `reentered` → false the watch pass's retrace refusal is an E_INVARIANT, `boundRefusal` holds and the fifth pass (run as 'back') cuts the chain back to the same simple path. Z13 is killed by 28 other pins; the R-12 pins are killed by CUT-OFF (`tryCuts` trying no candidate, 46 reds). LINE 8's letter 'red under Z13' cannot hold beside LINE 1; judged met. | none (a statement); the next spec names CUT-OFF as R-12's mutant | — |
| N-s14c-4 | **V-BUDGET / V-2X are not equivalent** (with LINE 4, failing there). A route parallel to the input segment whose start stands exactly √5 408 from the input point (offset (52, 52)), the segment along (−3, 4), (−10, 11), (−100, 101) or (−1 000, 1 001): `inFidelity` reads true with `ctx.fifth` (the exact half) and false without it (the bisection: at a tie d0 + d1 + Δ · len ≤ 2 · FIDELITY never holds); under either mutant all four read false while the item's 331 tests stay green. The scratch probe `probes/zz-vprobe.test.ts` is kept in the checker's scratch. | the fixture goes into router.test.ts 'LINE 4 V' (the line asked for a segment-to-route distance equal to the bound at a rational breakpoint); the 'equivalent' argument is withdrawn from the test's comment | the next a-05 round |
| N-s14c-5 | **`fifthExit` (W's twin exit) has no pin**: W-EXIT (`fifthExit` → `exitTowards` at both sites) survives the pins, bfuzz + fidelity at 10³ and the per-case census on six seeds. | a constructed twin-exit fixture, or the reading removed if no case reaches it | the next a-05 round |
| N-s14c-6 | **The r = 51 pin does not reach `stripPartner`** (with LINE 6, failing there): crossings.test.ts's new test calls num/exact.ts's `segmentCloserThan` (re-exported by placement.js) directly; Q77-219 (crossings.ts :219 back to a doubles' strict test) survives every pin and bfuzz at 10³. | an arrangement whose far sub-edge is longer than 18.6 km and whose crossing is the lattice tie, run through `stripPartner` | the next a-05 round |
| N-s14c-7 | **A comment names a function that does not exist**: insertChain.ts's fifth-pass comment ('its own readings … run (`fifthReadings`)') and stretch.ts's `fifth` doc; the readings are r8 in `readings`, the walk's `turns`, `stepTwoStrip`'s list and `exactlyCovered`. | reword (comment-only) | M4 |
| N-s14c-8 | **FAR1 is killed only by accident**: by the s14 rescue D −5203 mandatory 7499 (pass 5's cut back takes its second far candidate), not by LINE 9's constructed arrangement; FAR2 (`.slice(0, 2)`) survives the pins and bfuzz at 10³ and is unstated. | LINE 9 as specced (still failing) | the next a-05 round |
| N-s14c-9 | **The two fidelity-family rescues are in no register** (5903: V 3426 chain 6, D 4185 chain 6): the only V commit the round makes is unpinned as a fixture — `LINE 4 V` tests `inFidelity` on a synthetic route. | capture 5903 / 3426 as a step3-5 fixture in `s14-rescues.json` | the next a-05 round |
| N-s14c-10 | **FOR THE SESSION.** RELATED@1000 over the three changed insert/ sources shows four bench reds — bench/test/site/compose.test.ts 'relief-60 default seed 2 (test size) refuses at S5 …' (expected +0 to be 1) and spike.test.ts ×3 (containment at relief-60 seed 2; the river fixture's water gates 4 vs 2; the strip receipt 466 vs 138) — red on the checker's base alike with identical messages (`PLAT_FUZZ_RUNS=1000` over the two files in the base copy: 18 passed / 4 failed). Not this round's; in no known set. | an owner and a queue row | the session |
| N-s14c-11 | **'extended true … endRules as pass 3's' has no pin**: P5-ENDRULES (`ctx.endRules = false` in pass 5), P5-NOEXT (`attempt(false, null, true)`) and DEPTH (the router's depth limit on `ctx.strip` alone) each survive the pins and bfuzz + fidelity at 10³. | hardening pins, or each stated equivalent with its reasoning | M4 |
| N-s14c-12 | **Four stated clauses of LINE 2 are unpinned**: E-JOINT (a two-point chain's ends jointly), E-VERT (the existing vertices within the bound), E-ORDER (nearest first) and E-TIES (ties y then x) survive the pins and bfuzz + fidelity at 10³ — the one E pin (5309 constructive 1390) holds none of them. | with LINE 2's fixtures (E-FIRST's 'a later candidate routes' fixture pins the order) | the next a-05 round |
| N-s14c-13 | **D and S per site**: of the six D gates only D-V (stretch.ts's vertex contact) and D-RS (snapRound's stretch landing) are pinned — D-SJ, D-SC, D-RC, D-RL survive; D-OFF as a whole IS killed by two s14 rescues (the round's 'D-OFF SURVIVES' does not reproduce for the whole gate). S-ANCH and S-PLAIN both survive (either r8 reading alone commits the one S pin); S-OWN is killed. | with LINE 3's and LINE 4's fixtures | the next a-05 round |

## Hardening round S15 (lane `build/M0-a-05-fix-s15`, 2026-11-12; the S14 closing check's failing lines — LINES 2 – 5, 6's r = 51 pin, 7, 9, 10, 11, 12; C-0490)

One build seat in a Claude Code cloud container (linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib, Node 24.12.0).
**No `insert/` source was edited this round**: every change is test-side (`test/insert/step3-5/`), so S14's sources — the
ones the S14 closing check re-measured (census 203 → 196, none raised; RELATED@1000's known set; the undo oracle) — stand
unchanged, and so do those figures. Edited: `router.test.ts`, `snapRound.test.ts`, `stretch.test.ts`,
`crossings.test.ts`, `reentry.test.ts`, `register/s14-rescues.json` (+3 cases), `register/s15-routerset.json` (NEW),
`noseat.ts` (NEW, the test-side certificates). Base = the S14 build seat's never-written base mirror
`/home/user/maps-scratch/waves/base-build-M0-a-05-fix-s14/plat` (the RESUME head of S14); probes in copies of it and of
the tree (`s15-probe-base`, `-base2`, `-tree`, `-tree2`, `-T`, `s15-s8m`: src identical, or instrumented with logging
only, named per figure); mutants in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s15/plat`
(isolation proven: no link into the tree, `@plat/kernel` resolving inside it), tools `/home/user/maps-scratch/waves/s15-tools`
(`mut.py` = the S14 checker's 52 mutants + S-ANGLE, `run.sh`).

### Row-by-row outcome

| line | outcome | evidence / mutant |
|---|---|---|
| LINE 2 (class E) | **PINNED in part; residual REPORTED with the certificate's measure** | (a) the trio's class-E case captured (a-08's buffer arb-stroke at 8611, its overlay's 102nd chain, base 'class E … (−54627, 1202), 704.2 cm off') as `s14-rescues.json`'s segments-form case: it COMMITS on the tree (W_PLACED ×2, W_ATTRACTED ×2) judged by `fidelityProblems` / `allProblems` / `dissolvableProblems` = []; **E-OFF** KILLED (2), **E-FIRST** KILLED (3), **E-VERT** KILLED (1), **E-ORDER** KILLED (1) by it. (b) `noseat.ts` `seatsOf` / `noSeat` BUILT (test-side, seatsNear's form: (a) split seats on level-≤ n edges keeping (ii) / (iii), (b) free spots, (c) vertices of level ≤ n or finer on a route); **measured FALSE at both input points of every router-set refusal** (14 cases, flat-16's class E included: 125 seats, 3 952 free spots at its fallback end) — no class-E residual is certified. (c) **E-WIDE: no fixture** — a noSeat-true class-E end does not exist under noSeat's definition in a valid arena: class E fires where step 2 attracts the point to a level-n piece within attractCm, so the piece's chord through the 73.5 cm disc is ≥ 137 cm; §3.10 keeps every vertex and every non-incident edge ≥ minEdge from the piece, so every lattice point of that chord ≥ minEdge from its sub-edge ends (> 87 cm of it) keeps (ii) / (iii) as noSeat reads them — noSeat is false wherever class E fires; the line's fixture cannot be built, stated (not a survivor of a built pin). **E-JOINT, E-TIES SURVIVE** (no constructed case found; the trio case and 5309 / 1390 route on the first pair and break no tie) |
| LINE 3 (class S) | **DIAGNOSED; PINNED in part; residual REPORTED** | DIAGNOSIS (the base probe `s15-probe-base`, src identical to the base; the 202 base-refused census cases replayed, each refused chain's landed ends read before the refusal's undo): **0 of 82** class-S 'no route' refusals have a level-≤ n piece within minFaceAngle (5°) incident at an end of the refused pair (E: 2 of 9; D 0 / 13, W 0 / 16, P 0 / 3, V 0 / 1); the router set's 8 class-S refusals likewise 0 (least incident angles 78° – 179°: the ring's own previous segment, not a near-parallel piece). The hypothesis is FALSE on every measured case: the S residual's mechanism is the crossing placement (S14's pass-5 diagnosis: a crossed run with no qualifying point within the bound, `placeOnRun` none, the fallback far off), not the end sharing. FIXTURES (stretch.test.ts 'S15: step 3's fifth-pass gates', `attractStretch` on constructed arenas): a provenance-'fallback' end shares a 3.8° piece — **S-SEGEND** KILLED; the piece already shared into the end is never shared out — **S-FOLD** KILLED; a 30° piece at the end is no stretch (the corner kept) — **S-ANGLE** (the near-parallel test skipped for end forms) KILLED. `noSeatS` (`seatsOfSegment`) BUILT: true on **integrated-751** (S: one crossed run, spanning the bound region, no seat on it within the bound, no route vertex) and **flat-16** (E), false on the other 12 (pinned in router.test.ts). THE SET: 243, 310, 751, 999 captured (below), each REFUSED on the tree with the base's exact detail — pinned and REPORTED (J697 (4)); 751's refusal carries noSeatS's proof |
| LINE 4 (D / W / P / V / C) | **PINNED in part; residual REPORTED** | V: router.test.ts 'LINE 4 V (round S15)' — the route parallel to the input segment, its start (52, 52) off the input point, the segment along (−k, k + 1), k = 30, 100, 300, 1 000: the bisection (passes 1 – 4) reads FALSE, the exact half TRUE — **V-BUDGET** and **V-2X** KILLED (5 each, with the V commit below); the V commit captured: the fidelity family's 5903 / 3426 (class V, base 'farthest vertex (2244, 1681), 31.3 cm off') and 5903 / 4185 (class D) in `s14-rescues.json` (log form, role `invisible`), both committing, judged as LINE 1 (a). W: snapRound.test.ts 'LINE 4 W (round S15)' — V's twin T 14 cm off, exits E1 on the input segment and E2 nearer the target: pass 5 leaves by E1, passes 1 – 4 by E2 — **W-EXIT** KILLED. D: stretch.test.ts — a crossing piece's stretch whose leave lies beyond the bound (**D-SJ** KILLED), a contact point beyond (**D-SC** KILLED); snapRound.test.ts 'LINE 4 D (round S15)' — a contact within the bound whose landing (the piece's end W, the endpoint fallback) lies beyond: pass 5 routes straight, passes 1 – 4 through W (**D-RC** KILLED). **D-RL SURVIVES**: no constructed case; a differential harness (snapRound with the field on 35 680 random arenas, `s15-diff`) moved nothing under it (nor under D-RC / D-RS / D-SJ / D-SC — the harness is weak, stated). THE SET: 73 (W), relief-60 183 ×2 (W), relief-3000 77 (D), flat 10 (W) captured and REFUSED as on the base — pinned and REPORTED (J697 (4)); the router set's 73 / 183 / 77 have the near-parallel incident piece at the start (183: 1.0°, 77: 1.6°) that their W / D class reads. C: no reading after r1 – r8 built and no certificate — C's trio case (offsetFace, 1) stays REPORTED |
| LINE 5 (measures) | (i), (ii) as S14 (CONFIRMED by the S14 check; no source changed); **(iii) MEASURED**; **(iv) GIVEN** in C-0490 | (iii) the six flat outlines at 180 m (`flatFixture(s)` → `s3Slice` → `settlementPerimeterRung(outline, kernel(), { offsetCm: 18 000, frame })`, and `cityRun(s)`), base probe and tree probe: outlines 3, 8, 9, 10, 11, 16 each on the **buffer** rung (W_PERIMETER_BUFFER 1), `cityRun` ok, BEFORE = AFTER (summary lines identical); the overlay refusal of each (3, 8, 9, 11 S; 10 W; 16 E) identical; every router-set input's overlay insert log byte-identical base → tree (`sha256sum *.jsonl | sha256sum` 9c818f83…981d2fa both sides, 14 runs, 33 000+ insertions). Each set input left refused is pinned refused (register/s15-routerset.json, frame + the chains within 2 000 cm of the refused one, replaying to the base's exact detail on base and tree, kernel and kernel-tiny) and REPORTED |
| LINE 6 (r = 51 pin) | **PINNED through `stripPartner`** | crossings.test.ts 'through stripPartner': A – B a 30 km L0 edge, the near piece u – w crossed at its midpoint P (t = ½ exactly, a lattice point), P a hair inside 51 cm (o² = 51² · \|AB\|² − 2, the doubles tied) — `stripPartner` returns A – B's sub-edge; **Q77-219** KILLED (1) |
| LINE 7 (MK / ML) | **NOT DONE** — no constructed arena, no proof (owed; the S14 notes' shared-end gap stands as the arena to try) | — |
| LINE 8 | unchanged (S14, confirmed) | — |
| LINE 9 (FAR1) | **PINNED; Q142 CLOSED** | family T regenerated in `s15-probe-T` after the S12 check's recipe (88 787 lawful cases, case seeds 500 001 – 700 000; a hook in that copy's `tryCuts` only): 2 cut backs routed through the SECOND far-tier candidate, none through a later one. Both pinned in reentry.test.ts 'Q142 / FAR1 (round S15)': 602 957 (W (1 149, 1 965) a junction, V 69.9 cm from it, the corner 33°; far tier X (1 177, 1 970) — the first arm's crossing of W's way — then W) and 648 102 (V 72.1 cm, 39°): the arrangement asserted (junction degree 3, distances in (√2 · attractCm, 2 · √2 · attractCm], X before W, X on the first arm, the corner acute), A – W – B committed a simple path under `invisible` (W_ATTRACTED at V) and through tx under a `way` key, kernel and kernel-tiny — **FAR1** KILLED (4); **FAR2 SURVIVES** with its reason: no case of the family routes through a third far candidate |
| LINE 10 (Q152 B, the cause) | **DONE** | the S8 MODEL in `s15-s8m` (a copy of the tree, env switches only): S9's in-segment retrace cut (snapRound `reenters`), r0 / `nearestOwn`, r2b; S10 – S11's watch / back / null (and with it S12's cut-back forms and S13's corner bound, reachable only there); S12's end rule; S14's pass 5 — ALL OFF turns all SIX bands reds green. ONE SWITCH: closing "shrunk counterexample of 20261011" ← the in-segment retrace cut (off alone restores it, on alone from the S8 model breaks it); hardening-s15 'network 561' ← S10 – S11's chainPath (the cut back); restage 'N1' ← r2b; (group A, for the record: closing 1109 and dryrun 389 / 1109 ← S12's end rule; restage N2 ← S10's cut back). THE CHAINS (a trace probe logging every `insertChain` call of the read, tree vs the switch off, the first differing call): closing — call 46, the L2 mandatory open chain [(2 546, 3 998), (2 545, 3 971), (4 000, 3 933), (4 000, 3 960)], placed alike, routed otherwise (tree W_ATTRACTED 14, W_STRETCH_SHARED 23, W_ACUTE_CORNER 4; off W_ATTRACTED 17, W_STRETCH_SHARED 28, W_WEDGE_ROUTED 1); 561 — call 20, the L2 closed ring [(741, 1 615), (741, 1 879), (741, 2 143), (700, 2 143), (700, 1 879), (700, 1 615)] committed through the 'back' pass with (741, 2 143) cut back onto (730, 2 119) (off: kept, pass 1); N1 — call 12, the L2 open chain [(449, 0), (450, 10), (51, 0)] committed in pass 3 by r2b at (448, 15) (off: refused). The bands folder's 27 files SHA-256 base = tree (S14's figure; no file edited) |
| LINE 11 (the judgment) | **DONE**: closing (b), 561 (b), N1 (c) | the oracle: a-09 S18's exact kerb `exactRegionOfFace` (kerbExact.ts; the definition oracle's differential pin in derived.test.ts) — F minus its spines' buffers — and the two-sided Hausdorff distance of the read's outlines to it (each outline sampled every 0.25 cm, each sample's exact distance to the other's segments; error e ≤ 0.125 cm) against DRY_MOVE_CM 75.54; the pinned read measured the same way (the control). (i) every law before the exact line holds (soft runs of the four files, base and tree: every assertion's status and message identical, 36 tests); (ii) each chain reports its moves (above). (iii): closing face 1 after-read 8.93 / 9.82 cm (control, the before-read: 8.93 / 9.82) — the after-read drops two near-collinear vertices (2 732, 3 967), (2 630, 3 969): **(b) LAWFUL**, declared for a-09's re-pin; 561 face 1: 28.99 / 73.76 cm (control 28.99 / 42.01) — the 1 436 cm² island VANISHED (area difference 5 405 → 6 841 cm²), within DRY_MOVE_CM − e: **(b) LAWFUL by the gate**, declared with the island's loss named; N1 face 2: 8.25 / 7.89 cm (control 32.30 / 32.29 — the new read is nearer the exact kerb): the read is lawful, BUT the test's own S8 ≡ S9 law (restage.test.ts `s8s9`, after the exact line) breaks on base and tree alike — face 2's committed block '448,0 2390,92 … 447,69' against the read '… 447,69 448,15 2390,92 …' (the dry-run's chain committed at (448, 15) by r2b where corridorUnion's commit keeps (448, 0)): **(c) REPORTED to M0-a-09** (the dry-run's read and corridorUnion's commit route one part differently on two arenas; minimal reproduction: restage.test.ts N1's three chords; the S8 model reads both alike) |
| LINE 12 (the shift) | **MEASURED** | (c) THE RE-PIN REHEARSAL in the lane mirror (`s15-tools/mk-rehearsal.py`: scratch copies of the four files, each declared red's assertions set to the tree's read — closing :134, :225; dryrun :314; hardening-s15 :65, :66, :71; restage :104, :107, :108, :134, :135, :136): **35 / 36 green to their ends**; the one red is N1's S8 ≡ S9 law (a law, not a literal: LINE 11 (c)). The masked assertions of the six (soft runs): hardening-s15 network 561 :66, :71 and restage N1 :107, :108, N2 :135, :136 also differ from their pins — identical base → tree. THE BANDUNION RISE, per network (`s15-band/declare.txt`, `insertChain` logged in probe copies): in each of the seven networks pass 5 COMMITS one of bandUnion's frame-closing two-point insertions that the base refused class E (net 0: insertion 11 [(2 579, 4 000), (2 538, 3 982)] placed (2 538, 3 957); net 1: 8 [(3 642, 4 000), (3 619, 3 978)]; net 2: 5 [(3 189, 4 000), (3 125, 3 977)]; nets 3 – 6: insertion 6 at x = 3 156, 3 140, 3 425, 3 281), and the later symmetric insertion ([(x − 20 ± 3, 3 978 – 3 984), (x, 4 000)]) is refused class E; the base, refusing the first, went on and committed. REPORTED to M0-a-09 for the re-pin. (d) THE ROOTS (`corepack pnpm bench -- profile --seed N --run R --mode plain`, base probe and tree probe): fusion 3 db72c0bf…, integrated 4 e9e96e0e…, fusion 1 ee1e0f22…, integrated 1 be9e88bf… — **equal base = tree** (blocks, lanes equal). (f) WORK (`insertChain` instrumented in probe copies to log each call's work delta and pass 5's spend): the 202 base-refused census cases replayed — 987 calls each side, pass 5 ran **203** times (7 commits), its spend **1 292 837** of the tree's 5 743 554 (base 4 450 719), worst **16 891 a segment** (a one-segment chain, refused), median 196; **E_WORK_LIMIT 0 / 0**; cost.test.ts's families: 11 867 calls identical base = tree, work 267 161 both, no pass 5 run; fusion 3's derivation: 118 248 calls identical, work 2 550 600 both, no pass 5 run. Stage fixtures beyond the CITY derivations: not run |

### The round's mutant table (lane mirror; `s15-tools/run.sh <mutant> <file> -t <describe>`, restored and `cmp`-equal after each)

| mutant | fault | result |
|---|---|---|
| V-BUDGET / V-2X | the bisection restored / doubled in pass 5 | KILLED (5 / 5: router.test.ts 'LINE 4 V (round S15)' ×4, the 5903 / 3426 V rescue) |
| V-HALF | pass 5 skips the segment-to-route half | KILLED (1) |
| W-EXIT | `fifthExit` → `exitTowards` | KILLED (1: snapRound.test.ts 'LINE 4 W') |
| Q77-219 | crossings.ts :219 in doubles | KILLED (1: crossings.test.ts 'through stripPartner') |
| FAR1 / FAR2 | the far tier cut to 1 / 2 | KILLED (4) / SURVIVES (no third-candidate case in 88 787) |
| E-OFF / E-FIRST / E-VERT / E-ORDER | pass 5's step-2 list off / `turns` off / no vertices within / unsorted | KILLED (2 / 3 / 1 / 1: the trio class-E case, 5309 / 1390) |
| E-JOINT / E-TIES | joint ends off / ties reversed | SURVIVE (no case found) |
| D-SJ / D-SC / S-SEGEND / S-FOLD / S-ANGLE | the gates in `attractStretch` | KILLED (1 each: stretch.test.ts 'S15') |
| D-RC | snapRound's contact landing gate off | KILLED (1: snapRound.test.ts 'LINE 4 D (round S15)') |
| D-OFF | all six D gates off | KILLED (3 in snapRound.test.ts / stretch.test.ts's S15 fixtures; 2 S14 rescues besides) |
| D-RL | the leave-after-join gate off | SURVIVES (no case; harness 35 680 cases unchanged) |
| MK / ML | — | NOT RUN (LINE 7 not done) |

### Open (owed; nothing here is claimed done)

LINE 7 (MK / ML); E-JOINT, E-TIES and D-RL fixtures; E-WIDE (no fixture can exist under noSeat's definition — stated
above for the checker to re-read); C's readings or certificate; the census residual of classes E, S, D, W, P, V carried
WITHOUT J238 (1)'s proof except where noSeatS certifies (751, flat-16) — RL1's failing state for those classes stands
and is routed to the session (C-0490 (4)); the stage fixtures' work (LINE 12 (f)).

### Gates (the tree, this seat's final files)

`corepack pnpm install --frozen-lockfile` 0; `corepack pnpm lint` 0 (eslint 1 305 files, 0 errors, the probe-red check,
licences ok); `corepack pnpm build` 0 (after typing the S15 attractStretch arena's levels as `Level`); NEAR —
`vitest run --project kernel --project kernel-tiny --maxWorkers=1 packages/kernel/test/insert/step3-5` — exit 0, 28 files,
**772 / 772** (S14: 694), 919 s, the run's seed −1608047415; `PLAT_UNDO_ORACLE=1` over step3-5 + kernel/test/tx/write-door.test.ts
+ door.test.ts (kernel) exit 0, 16 files, **399 / 399**, 456 s (write-door.test.ts and door.test.ts untouched, no allowlist
entry). RELATED@1000 — `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/kernel/src/insert/{stretch,snapRound,insertChain}.ts`
(the three insert/ sources the item's build changed in S14; no packages/*/src file changed in S15), run on the tree by the
chain `/home/user/maps-scratch/waves/s15-related` (log, JSON reporter, exit file there; the src tree-hash 515c817b… equal at
its start and end): exit 1 by the known-set rule, **532 files (526 passed, 6 failed), 7 439 tests (7 428 passed, 10 failed,
1 skipped)**, 12 481 s. The 10 reds are EXACTLY the known set: a-09's six Q152 bands reds (closing.test.ts 'seed 20261011
draw 1109' and "fast-check's shrunk counterexample of seed 20261011", dryrun.test.ts 'draws 389 and 1109',
hardening-s15.test.ts 'network 561', restage.test.ts 'N1' and 'N2'; messages as S14's and the base's) and the four
bench/test/site reds red on the base alike (compose.test.ts 'relief-60 default seed 2 (test size) refuses at S5 …';
spike.test.ts ×3: 'relief-60, seed 2: two water gates …', 'the strip receipt is not blind …', 'relief-60, seed 2 (S5
refused, S6 not reached) …'); no red outside the known set, no finding; none of J176's five Mac-reference files was selected. The census was not
re-run for the same reason (S14's AFTER, re-measured by the S14 check: 203 → 196 over 32 seeds, none raised).


## Hardening round S16 (lane `build/M0-a-05-fix-s16`, 2026-11-12; the S15 closing check's failing lines — LINES 2, 3, 4, 5 (iv), 7, 12 (f); C-0491)

One build seat in a Claude Code cloud container (linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib, Node 24.12.0).
The pins are test-side (`test/insert/step3-5/`: `router.test.ts`, `snapRound.test.ts`, `rewalk.test.ts`); ONE `insert/`
line changed, by the round's second seat after the waiter (below, 'The source fix'): the first seat's NEAR on the tree
turned D-RL's fifth-pass test red in kernel-tiny, exposing a re-read-rule breach in S14's pass-5 code. So NEAR, RELATED@1000,
the undo oracle, the census, the trio, the bands folder and its bfuzz cells and the stage fixtures' work were re-run on the
final sources (chain `/home/user/maps-scratch/waves/s16-fix`, below). Base = the S14 build seat's
never-written base mirror `/home/user/maps-scratch/waves/base-build-M0-a-05-fix-s14/plat`; its copy
`/home/user/maps-scratch/waves/s16-basepins/plat` (`diff -rq` of `packages/kernel/src`: empty) runs the new pins on the
base. Mutants in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-05-fix-s16/plat` (isolation proven:
no link into the tree, `@plat/kernel` resolving inside it), tools `/home/user/maps-scratch/waves/s16-tools` (`mut.py` =
the S15 checker's mutant table, its exact replacements; `run.sh <mutant> <files> -t <describe>` restores and `cmp`s).

### Row-by-row outcome

| line | outcome | evidence / mutant |
|---|---|---|
| LINE 2 (class E) — E-JOINT | **PINNED** | router.test.ts 'LINE 2 E (round S16): a two-point chain's ends jointly …': the two segments-form cases of `s14-rescues.json` (the M0-a-08 overlay's class-S case, the trio's class-E case) with their LAST segment REVERSED. The base copy refuses both for the bound (overlay: class S, "the design route's farthest vertex (-51876, -21450), 97.5 cm off"; trio: class E, "(-54627, 1202), 704.2 cm off"); on the tree pass 5 commits each ONLY through `turns`' joint branch — a probe in the lane mirror logged the committing pair (k0, k1) = (1, 0) of 2 × 1 landings (overlay) and (2, 0) of 3 × 4 (trio): the start landed again on a later landing of its list. Judged as LINE 1 (a) (`fidelityProblems` = [], `allProblems` = [], `dissolvableProblems` = []), warnings and placed points pinned. **E-JOINT** KILLED (2) |
| LINE 2 — E-TIES | **PINNED** | router.test.ts 'LINE 2 E (round S16): pass 5's step-2 landings in turn …': `land` in pass 5's step 2 (the field set, `fifthPick` k = 0 … 3) on an L0 edge s (1 000, 2 000) – t (1 200, 2 000) that cannot be split at all (s's other edge s – u, u (1 400, 1 960), passes 19.9 cm from t: (iii) at the split's own ends), the point (1 100, 2 012) falling back on s 100.7 cm off: the list is the free spot (1 100, 2 025), then V1 (1 055, 2 052) and V2 (1 145, 2 052) at the SAME distance √3 625 (the tie broken by y, equal, then x), count 3; k = 3 keeps the fallback. **E-TIES** KILLED (2) (E-WIDE also reds it: t enters the widened list, count 4) |
| LINE 2 — E-WIDE | **PINNED on the checker's construction** | router.test.ts 'LINE 2 E (round S16): a noSeat-certified class-E end with a seat in (bound, √2 · bound] …': the S15 check's arena (`s15/probe/ewide.py`: the L0 piece (1 000, 1 900) – (3 000, 1 910), twelve L1 edges 25.0047 cm apart) plus one L0 vertex V (969, 1 920) on an L0 edge to (500, 1 920); c (1 071, 1 920): `allProblems` = []; **noSeat TRUE at c** (no seat, no free spot, no vertex within the bound), **FALSE at the control** (the chain's other end (2 600, 1 922), its seat (2 600, 1 908)); within 2 · FIDELITY_SQ the piece's end (1 000, 1 900) and V (102.0 cm, in (bound, √2 · bound]); the chain c → (2 600, 1 922) and its reverse refused E_INVARIANT class E with the base's exact detail ("… the design route's farthest vertex (1000, 1900), 73.8 cm off" — the same on the base copy), writing nothing; pass 5's step-2 list at c empty (count 0, the fallback kept). **E-WIDE** (the S15 check's three replacements) KILLED (5): V enters the widened list and c lands on it. WHAT THE FIXTURE ADDS to the checker's construction (`s15/probe/ewide.py`, read in the fixture's frame, translated by (1 000, 1 900): its chain point c′ (1 100, 1 920)): c moved to (1 071, 1 920) (19.6 cm off the piece, the fallback (1 000, 1 900) 73.8 cm off) and the L0 vertex V (969, 1 920) on its L0 edge to (500, 1 920). WHY THE CONSTRUCTION ALONE DOES NOT KILL E-WIDE: at c′ the only seat in (bound, √2 · bound] is the on-line split (1 200, 1 901), 101.8 cm off, which `placeOnRun`'s own admit (FIDELITY_SQ, which the mutant does not widen) excludes, and the only vertex there is the endpoint fallback (1 000, 1 900) itself, 102.0 cm off c′, which the list skips (u = v): the widened list stays empty and the mutant passes. V is the vertex seat the mutant reads (from c: 102.0 cm, in (73.54, 104.0]; the split (1 200, 1 901) is 130.4 cm off c, beyond √2 · bound). The same is stated in router.test.ts's comment above `stripedE`. C-0490 (2)'s sentence "noSeat is false wherever class E fires" is WITHDRAWN (C-0491 (1)) |
| LINE 2 — the residual | **MEASURED; OPEN IN M0 (J796 R-1)** | the certificate over the census residual (below, 'THE CERTIFICATES PER CASE'; on the final sources, LINE 5 (d)'s file): noSeat holds at NO input point of any class-E refusal — no J238 (1) proof holds for class E. Each class-E refusal is refused today with its typed code; a seat, a free spot or a route vertex stands within the bound, so no J238 (1) proof holds; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1); '(notBuilt #2, M4)' in the registers and details is the class's NAME (J697), not a carry |
| LINE 3 (class S) | **MEASURED; OPEN IN M0 (J796 R-1)** | noSeatS holds on the refused segment of NONE of the census's class-S refusals (on no segment of the chain at all), so no J238 (1) proof holds for class S; the r1 – r8 out-of-bound record is moot for the census; each class-S refusal is refused today with its typed code; a seat, a free spot or a route vertex stands within the bound, so no J238 (1) proof holds; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1). The router set's S cases as S15 pinned them (751 the one noSeatS-certified, REPORTED under C-0490 (2) — the router set, not the census) |
| LINE 4 — D-RL | **PINNED** | snapRound.test.ts 'LINE 4 D (round S16): … (D-RL)': the L0 run U (1 197, 2 056) – S (1 621, 2 030) – W (2 821, 1 944), S an L1 Steiner vertex off its chord, `allProblems` = []; the routed segment (1 000, 2 000) → (3 000, 2 000) shares a stretch joined at S (promoted) and left near (2 385.1, 1 974.1): planned before the join the leave is the split (2 385, 1 974), landed after it (the run now S – W, its chord tilted) (2 385, 1 975). The input segment (1 466, 1 968) → (2 529, 1 890) holds S, the planned leave and the exact join and leave within its bound, (2 385, 1 975) 74.2 cm off: pass 5 refuses "a stretch's leave at (2385, 1975) lands beyond the fidelity bound"; passes 1 – 4 share the stretch (new edges (1 000, 2 000) – S and (2 385, 1 975) – (3 000, 2 000), W_PROMOTED, W_ATTRACTED, W_PLACED, W_STRETCH_SHARED — the same on the base copy). Found by a probe in the lane mirror (a hook at the gate logging the planned and the landed leave over 20 000 random runs with a Steiner vertex at the join: 206 differ by one lattice step), the input segment then chosen to separate the two. **D-RL** KILLED (1) |
| LINE 4 — C | **NOT BUILT; OPEN IN M0 (J796 R-1)** | no census refusal of class C exists on the tree (the census's classes: below); C's one case is the trio's (offsetFace, M0-a-08's harness) — no reading after r1 built for it, no certificate: refused today with its typed code, no J238 (1) proof; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1; C-0491 (3)) |
| LINE 4 — the D / W / P / V residual | **MEASURED; ONE CASE CARRIED WITH ITS CERTIFICATE; the rest OPEN IN M0 (J796 R-1)** | noSeatS holds on the refused segment of ONE census refusal: seed −6803, random case 1707, way:b1, class D (the input segment (1 504, 2 188) → (1 463, 2 201), refused '… (1508, 2188) to (1463, 2201) …'): one crossed run spanning the bound region, no seat on it within the bound of the segment, no route vertex within it — CARRIED with that certificate (C-0491 (2); §3.6 'no existing vertex moves'; M4's rounding move of committed geometry the later material); noSeat at no input point of any D / W / P / V refusal; every other D, W, P and V refusal is refused today with its typed code; a seat, a free spot or a route vertex stands within the bound, so no J238 (1) proof holds; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1) |
| LINE 5 (iv) | **GIVEN per class, in C-0456 (3)'s form, in C-0491 (2)** — taken on the FINAL sources from LINE 5 (d)'s file `checks/M0-a-05-s16-evidence/residual-cases.tsv` (below, 'LINE 5: the census residual as ruled') | the one certified D case carried with its certificate; every other counted refusal refused today with its typed code; a seat, a free spot or a route vertex stands within the bound, so no J238 (1) proof holds; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1) |
| LINE 7 — MK | **PINNED** | rewalk.test.ts 'LINE 7 (round S16): … (MK)': a hand-built arena no lawful input reaches (N-s8-3's kind): the frame's bottom L0 run through an L2 Steiner vertex z (2 000, −6), an L1 chord (4 000, 3 000) – (3 000, 4 000) (L1 records: the square, walked through z, and the corner); an L1 triangle of new edges alone (1 900, −4) (2 100, −4) (2 000, −2) linked by the raw primitives inside the 6 cm dip and re-walked: three L1 records (the square with the triangle as its hole, rings 6 / 3; the corner; the triangle, created; none materialised), every one under the L0 face. Under MK (both `segmentBox(…, REACH)` back to 1 cm) the square is missed at (2) and `recordUnder` finds nothing under the frame face round the new edge: a phantom L1 record is materialised — four L1 records. **MK** KILLED (1); green on the base copy and the tree. N-s8c-4's MK reading ("a record whose old ring bounds a cycle passes through one of the new edge's endpoints … a floating new edge lies ≥ minEdge from the record's boundary by §3.10") holds on lawful arenas only; the pin is the hardening pin N-s8c-4 asked for |
| LINE 7 — ML | **PINNED** | snapRound.test.ts 'LINE 7 (round S16): … (ML)': the same dip arena; `recordHolding(ctx, 1, 1 900, −5)` (the point (950, −2.5), strictly inside the L1 square's walk, 2.5 cm below its route's box) = the square; the new L0 edge (0, 0) → b (1 900, −5): snapRound refuses E_KEPT "the chain would split a finer face at (950, -2.5) (kept content)", nothing written. N-s8c-4's ML reading ("such a midpoint passes within 2.84 cm of a finer edge, which checkEdge's attractCm row refuses first") fails here: the dip's edges are L0 (not finer) and the one beside a is incident to a (the row skips a shared end — the S14 notes' gap). Under ML (reach 1 cm) `recordHolding` returns −1 and snapRound commits the edge with W_ACUTE_CORNER. **ML** KILLED (2); green on the base copy and the tree |
| LINE 4 D — the source fix (found by D-RL) | **FIXED; PINNED** | snapRound.ts's pass-5 gate on a stretch's leave landed after the join (S14's) read k's point from `route`'s X / Y, cached at its entry; `planLandingAfter` / `applyLanding` may allocate k, and an allocation that grows the vertex table replaces `p.vertices` (C-0286 (4), arena/plat.ts's re-read rule) — the cached columns are dead copies, k's point read (undefined, undefined), `inInputBound` false, the gate refused. In kernel-tiny (every allocation a growth) D-RL's fifth-pass test received "a stretch's leave at (undefined, undefined) lands beyond the fidelity bound" (NEAR of the first seat, `s16-chain/near.json`: kernel 402 / 402, kernel-tiny 1 red); in the kernel the same refusal fires when the landing doubles the table. Fail-safe (pass 5's refusal is discarded, the base's code and detail returned) but capacity-dependent, so a lawful chain's outcome depended on when the table grew. Fixed: k's point re-read from `p.vertices` after the landing (one gate, its message the same text). **STALE-K** (the S14 line restored) KILLED (1: D-RL's fifth-pass test, kernel-tiny) — the first seat's NEAR on the unfixed tree is that run; green after the fix in both projects (`snapRound.test.ts`, kernel + kernel-tiny, 50 / 50). The two other cached reads S14 added in `route` (`fifthExit(ctx, a, X[b], Y[b])`, `fifthExit(ctx, b, X[a], Y[a])`) precede every allocation of the call; stretch.ts's and insertChain.ts's (`attractStretch`, `verticesWithin`, `exactlyCovered`) are in functions that allocate nothing — audited, unchanged |
| LINE 12 (f) | **MEASURED** (the chain below) | the stage fixtures' work base → tree on the final sources: below, 'LINE 12 (f): the stage fixtures' work' (chain `/home/user/maps-scratch/waves/s16-fix`, steps `work/chunk-NN` and `an-work-final.txt`) |

### THE CERTIFICATES PER CASE (LINES 2 – 5 (iv); the census residual on the tree)

Probe copy `/home/user/maps-scratch/waves/s16-cert/plat` (a `cp -a` of the tree; its `zzreplay.test.ts` — S15's replay
of the base-refused cases, from `s15-probe-tree2`, never in the tree — evaluates at every counted refusal, on the arena as
it stands after the op's rollback, `noseat.ts`'s `noSeat` at every input point of the refused chain (rounded to the
lattice) and `noSeatS` on every input segment): `ZZCERT=… PLAT_REPLAY=/home/user/maps-scratch/waves/s14-work/refused-kernel.tsv
corepack pnpm exec vitest run --project kernel --maxWorkers=1 packages/kernel/test/insert/step3-5/zzreplay.test.ts -t 'zz replay'`
(the S14 base's 202 refused census cases over the 32 seeds; the 7 the fifth pass rescues commit and log nothing): **196
counted refusals** (= the S14 AFTER census's 196), `cert-kernel.tsv` + `cert-fid-kernel.tsv`. By class:

| class | refusals | noSeat at any input point | noSeatS on the refused segment | carriable (J238 (1)) |
|---|---|---|---|---|
| E | 51 | 0 | 0 | 0 |
| S | 98 (97 + fidelity 7507 / 837) | 0 | 0 | 0 |
| D | 18 | 0 | 1 (−6803 random 1707) | 1 |
| W | 17 | 0 | 0 | 0 |
| V | 8 | 0 | 0 | 0 |
| P | 4 | 0 | 0 (6301 mandatory 4014's noSeatS holds on another segment, not the refused one) | 0 |
| C, A | 0 | — | — | — |

So no J238 (1) proof holds for 195 of the 196 counted refusals: at each a seat, a free spot or a route vertex stands
within the bound of an input point, or the crossed run has a seat within the bound of the segment. Under the session's
ruling J796 R-1 (binding on this round): each of the 195 is refused today with its typed code, NOT carried to M4 and NOT
closed — OPEN IN M0 on the session's queue row opened at this round's landing, owed to this item's RESIDUAL ROUND (a
source round the session specs from LINE 5 (d)'s per-case file). The one certified case (−6803 random 1707, class D) is
carried with its certificate (C-0491 (2)). The certificates are sufficient conditions only (no seat ⇒ no in-bound
route); their falsity shows a seat, not a route. Kernel-tiny's one counted refusal (7507 / 837, class S) is likewise
not certified and OPEN IN M0. This table is the first seat's, taken on the pre-fix sources; the table on the FINAL
sources is LINE 5 (a) below.

### The round's mutant table (lane mirror; `s16-tools/run.sh`, restored and `cmp`-equal after each)

| mutant | fault | result |
|---|---|---|
| MK | rewalk.ts's two `segmentBox(…, REACH)` at 1 cm | KILLED (1: rewalk.test.ts 'LINE 7 (round S16)') |
| ML | recordHolding's reach at 1 cm | KILLED (2: snapRound.test.ts 'LINE 7 (round S16)') |
| D-RL | the leave-after-join gate off | KILLED (1: snapRound.test.ts 'LINE 4 D (round S16)') |
| E-WIDE | pass 5's list, `verticesWithin` and its query at 2 · FIDELITY_SQ / √2 · bound | KILLED (5: router.test.ts E-WIDE's land test, E-TIES's four) |
| E-TIES | ties reversed (y then x descending) | KILLED (2: router.test.ts E-TIES k = 1, 2) |
| E-JOINT | `joint` false | KILLED (2: router.test.ts E-JOINT, both reversed cases) |
| STALE-K | snapRound.ts's leave gate reading k from `route`'s cached X / Y (the S14 line, before the source fix) | KILLED (1: snapRound.test.ts 'LINE 4 D (round S16)' fifth pass, kernel-tiny — the first seat's NEAR on the unfixed tree, `s16-chain/near.json`) |
| NONE (control) | — | the S16 describes 16 / 16 (kernel) |

The new pins on the base copy (`s16-basepins`, kernel, `-t S16`): MK, ML, E-WIDE (arena, the two refusals with the base's
detail, the empty list) and D-RL's passes-1 – 4 test GREEN; D-RL's fifth-pass test, E-TIES and E-JOINT red there (pass 5
does not exist on the base: they pin S14's pass 5).

### Open (owed; nothing here is claimed done)

The census residual of notBuilt #2 but its one certified case — every other counted refusal of the final census (LINE 5
(a)) and the trio's one class-C case: refused today with its typed code, no J238 (1) proof, NOT carried to M4, NOT closed —
OPEN IN M0 on the session's queue row, owed to this item's RESIDUAL ROUND (J796 R-1; its per-case evidence LINE 5 (d)'s
file). FAR2 (stated in S15). The surviving mutants S-ANCH, S-PLAIN, P5-INSIDE, P5-ENDRULES, P5-NOEXT, DEPTH and FAR2 of
the S15 verdict's table: queued by the session at the landing (no line of this round).

### THE RESUME (seat 3, 2026-11-13; J796 R-1)

The container restarted at about 00:29Z with the chain `s16-fix` running; its finished steps (`near.rc` 0, `undo.rc` 0,
eighteen census seeds with their `.done`) stand, its partial ones (RELATED's single run, the stage-work run) were set
aside (`related-partial-run1.log`, `work-tree2-partial-run1.log`) and re-run re-entrantly: `s16-fix/chain.sh` (run 2) —
RELATED@1000 in chunks of 12 files under ONE recorded seed (PLAT_FUZZ_SEED=20261113; the file list from `vitest related
--run -t '^__no_such_test__$'` with the JSON reporter, `related/list.json`, `related/chunk-NN.{files,json,log,rc}`), the
census's remaining seeds (`census/<seed>{,.tiny}.{tsv,counts.jsonl,rc,done}`), LINE 5 (d)'s replay (`resid/`), the stage
work PER FIXTURE on both sides in 18 chunks (`work/{base,tree}-chunk-NN.{jsonl,json,log,rc}` in the probe copies
`s16-work/{base,tree}/plat`, each insertChain record carrying its test file; `an-work3.py` → `an-work-final.txt`), the
trio, the bands folder and its bfuzz seeds — every step skipped when its exit-code file exists. The session's ruling J796 R-1 (THE CENSUS
RESIDUAL OF notBuilt #2 IS SPLIT FROM THIS ROUND) governs every row above that names the residual.

### LINE 2 (b): the source change, alone

`diff -rq` of `packages/<p>/src` for every package between the S15 re-check's tree mirror
`/home/user/maps-scratch/waves/check-M0-a-05/mirror/plat` (a `cp -a` of the S15 tree = the S14 sources, its `insert/`
sources restored and `cmp`-equal after its sweep) and the final tree prints ONE line (`s16-fix/line2b-diff.txt`):
`Files …/mirror/plat/packages/kernel/src/insert/snapRound.ts and …/plat/packages/kernel/src/insert/snapRound.ts differ`;
and within it the gate alone:

```
670,671c670,675
<     // The leave landed after the join (r8's 'start' form among them) stays within the bound in the fifth pass.
<     if (beyondFifth(ctx, X[k], Y[k])) return err('E_INVARIANT', `a stretch's leave at (${X[k]}, ${Y[k]}) lands beyond the fidelity bound`);
---
>     // The leave landed after the join (r8's 'start' form among them) stays within the bound in the fifth pass. k may be
>     // a vertex the landing just allocated, so its point is read from the tables as they stand now (C-0286 (4)'s re-read
>     // rule: X / Y above are dead copies once a landing grows the vertex table; round S16).
>     const kx = p.vertices.x[k];
>     const ky = p.vertices.y[k];
>     if (beyondFifth(ctx, kx, ky)) return err('E_INVARIANT', `a stretch's leave at (${kx}, ${ky}) lands beyond the fidelity bound`);
```

The message text is the same template (`a stretch's leave at (x, y) lands beyond the fidelity bound`).

### LINE 2 (c): the audit of the fifth pass's reads from cached columns (the final tree, file:line)

The vertex table grows only in `allocVertex` (arena/plat.ts:487, `growVertices` :402, C-0286 (4)); in `insert/` it is
reached through `applyLanding` (stretch.ts:731), `planLandingAfter` (snapRound.ts:774, which ends in `applyLanding`) and
`land` (insertChain.ts:160: `allocVertex` :172, :261; `applyLanding` :181, :208, :245, :257). crossings.ts, wedge.ts and
placement.ts call none of them (their imports: no allocating function). Per site:

| site | the cached columns | what may allocate before the read | verdict |
|---|---|---|---|
| snapRound.ts:596 `fifthExit(ctx, a, X[b], Y[b])` | `route`'s X / Y, :547 – :548 | nothing: the frame's only call before it is `routeBetween` (:582, a walk of existing edges); its `share` branch returns (:585) | precedes every allocation of the call |
| snapRound.ts:602 `fifthExit(ctx, b, X[a], Y[a])` | the same | the same (:596's branch returns at :599) | precedes every allocation |
| snapRound.ts:943 – :956 `fifthExit` / :239 `exitTowards` | none: `ctx.p.vertices` and `nearerVertex(p, …)` read per access | — | no cached column |
| snapRound.ts:630 – :631 contact landing (`landingPoint(p, l.value)`, `beyondFifth`) | none (`landingPoint` reads `p.vertices`) | — | fresh; before :636's `applyLanding` |
| snapRound.ts:657 – :659 the stretch's join and leave planned | none (`landingPoint`) | — | fresh; before :663's `applyLanding` |
| snapRound.ts:673 – :675 the leave landed after the join | none since round S16 (`p.vertices.x[k]`) | :663 `applyLanding` (j), :668 `planLandingAfter` (k) | FIXED (LINE 2 (b)); STALE-K pins it |
| snapRound.ts:776 – :794 `planLandingAfter` | its own X / Y, :776 – :777, taken after j's allocation | `applyLanding` only at :794, its last statement | every read precedes the call's allocation |
| snapRound.ts:703 – :704 the wedge corner's bound (`inInputBound(st.a, st.b, X[k], Y[k])`, `ctx.fifth` read as `st`) | `route`'s X / Y | nothing: every allocating branch above it returns (:636 → :639, :663 → :689); `resolveCrossings`, `cornerMove`, `wedgeOutcome` (crossings.ts, wedge.ts) allocate nothing | precedes every allocation of the call |
| snapRound.ts:899 – :937 `stripLanding` (`P = ctx.p.vertices`, :906; reads :933, :936) | `P`, its entry | `sliverPartner`, `stripPartner`, `placeOnRun` (crossings.ts), `nearestVertexWithin` (stretch.ts:965) — none allocates | a function that allocates nothing |
| stretch.ts:864 – :954 `attractStretch` (X / Y :866 – :867; `beyondFifth` :904, :941, :946) | its entry | its calls (`query`, `charge`, `pieceOf`, `passesWithin`, `withinSegment`, `bandInterval`, `footOnSegment`, `endStretchAt`, `firstFrom`, `onRouteOfLevel`, `nearParallel`) — none allocates | a function that allocates nothing |
| stretch.ts:965 – :986 `nearestVertexWithin` | its entry | `charge`, `query` | allocates nothing |
| stretch.ts:415 / :430 `inInputBound` / `beyondFifth` | none (arguments only) | — | — |
| insertChain.ts:489 – :617 `stepTwoStrip`, the fifth pass's landing list :584 – :610 (X / Y :493 – :494; `all`, its `at` points, the sort :604, `fifthPick` :606 – :608) | its entry | `across` / `nearest` / `onEdge` / `free` (`placeOnRun`, `nearestVertexWithin`, `endLanding`, `freeSpot` :416), `verticesWithin` — none allocates ("Nothing written; refuses only E_WORK_LIMIT") | a function that allocates nothing; the landing it returns is written by `land` after it returns |
| insertChain.ts:625 – :638 `verticesWithin` (X / Y :627 – :628) | its entry | `charge`, `query` | allocates nothing |
| insertChain.ts:160 – :262 `land` (`landInBound` :168 – :184) | none: `p` is the Plat, every read `p.vertices.x[…]` per access (:162, :192, :209) | its allocations :172, :181, :208, :245, :257, :261 | no cached column |
| insertChain.ts:1628 – :1675 `turns`, :1727 – :1745 the walk's joint branch, `fifthPick` :1638 – :1654, :1711 – :1714 | none: points by `pointOf(p, …)` and `dec.points` (the input) | `land`, `routeSegment` | no cached column |
| insertChain.ts:914 – :… `inFidelity` (X / Y :916 – :917) and :1024 – :1081 `exactlyCovered` (X / Y :1025 – :1026) | their entries | nothing (pure arithmetic; `exactlyCovered` reads `p` afresh at its own entry) | allocate nothing |
| insertChain.ts:1301 – :1311 r8 (`routed`, then `kept` → `wholeProblem` :881 / `inFidelity` :914) | each judge caches at its own entry, after the route | `routed` (the route's writes) | the reads follow the allocation and are taken after it |

No other stale read in the fifth pass's code. The mechanical half — NEAR's kernel-tiny project, where every allocation
is a growth — is the chain's `near.json` (below, 'Re-runs on the final sources'). Noted, not of the fifth pass (every
pass): `route`'s `cutTo` (snapRound.ts:573) reads `X[x]`, `Y[x]` into a refusal's detail after :663's `applyLanding`
(`reenters(j)` → `cutTo(j)`); j is a vertex on the segment's trail (`trail.marks`), so it stood before the frame's entry,
and a growth copies the old rows unchanged — listed for the checker, not judged here.

### LINE 3 (the S15 check's LINE 7): N-s8c-4 corrected (append-only) and FOR THE SESSION

N-s8c-4 (the S8 closing check's row, above, unchanged) read MK and ML as "equivalent on lawful input". What the S16
arenas show (measured in the probe copy `s16-cert/plat`, `zzreach.test.ts`, never in the tree — `allProblems` on each):

- **MK's reading is CORRECTED** to: the + 0 / + 1 cm box misses a record only where its route and its walk part by more
  than the box — here 6 cm (z (2 000, −6), an L2 vertex on the L0 route (0, 0) – (4 000, 0)) — and a floating cycle of
  new edges sits inside that strip: the triangle's vertices stand 2 – 4 cm from the frame's edges, which `allProblems`
  names ("vertex (1900, -4) stands within minEdge of edge (0, 0)–(2000, -6)" and three more). The reading's two
  premises — §3.10's clearance row and a route-versus-walk strip ≤ 2.84 cm — are exactly what the arena breaks; on an
  arena keeping both, the reading is an argument this round neither shows nor refutes. MK is KILLED off them only.
- **ML's reading is CORRECTED** to: "such a midpoint passes within 2.84 cm of a finer edge, which `checkEdge`'s attractCm
  row refuses first" does not hold as stated — the strip's edges here are L0 (the record is L1, walked through z on the
  L0 run), not finer than the new L0 edge, and the edge beside a is incident to a (the row skips a shared end). The dip
  arena alone passes `allProblems` ([]; the validator reads no route-to-walk offset); with b (1 900, −5) — ML's
  refusal test — it breaks §3.10 ("vertex (1900, -5) stands within minEdge of edge (0, 0)–(2000, -6)"). ML is KILLED
  on the dip (`recordHolding`'s test, a validator-clean arena whose z stands 6 cm off its route).

FOR THE SESSION: neither arena is reachable by lawful input as built — both stand on a finer vertex 6 cm off its coarser
route, beyond the hot-pixel bound every kernel write keeps (§3.6's placement moves a route by at most 0.71 cm per finer
level; N-s8c-4's ≤ 2.84 cm strip), and MK's triangle and ML's b also break §3.10; no lawful input on which the kernel's
outcome hangs on either reach is known to this round (none was searched beyond the families' differential N-s8c-4
records: 0 differences over 470 794 insertions), so this round opens no queue row for it.

### LINE 5: the census residual as ruled (J796 R-1)

(d) THE FILE: `checks/M0-a-05-s16-evidence/residual-cases.tsv` (claimed by this round's notes record), one line per
counted refusal of the FINAL census (`s16-fix/census`, both projects): project, seed, property, case, way, r1's class
letter, the returned code and detail, the fifth pass's own discarded end for that chain, noSeat's and noSeatS's
outcomes; a field longer than 2 000 characters cut at 2 000 with its length noted. The fifth pass's end is logged by a
hook in the probe copy `/home/user/maps-scratch/waves/s16-cert/plat`, whose sources are the final tree's but for the
hook (`diff -r` of every package's `src`: insertChain.ts alone — two lines setting `globalThis.__zzP5` after pass 5's
`attempt` (its code and detail, 'commit' or 'retrace') and, where pass 5 does not run, the reason — never in the tree);
its `zzreplay.test.ts` (S15's replay, extended: the code, the hook's reading, the project) replays each counted case of
the final census (`s16-fix/resid/list-<project>.tsv`, from `mk-resid-list.py`) and evaluates `noSeat` at every input
point and `noSeatS` on every input segment on the arena as the op's rollback leaves it; `s16-fix/mk-resid.py` joins the
census's k-th counted refusal of a case with the replay's k-th (the census's detail, code and class equal to the
replay's, every mismatch printed). The replay (`resid/replay-kernel.rc` 0, `resid/replay-tiny.rc` 0, `resid/replay.rc` 0;
seat 4, after the restart of ~03:08Z, read them): 197 lines below the header — the kernel's 196 counted refusals (random
104, constructive 41, mandatory-only 50, fidelity 1) and kernel-tiny's 1 (the fidelity property's 7507 / 837, the same
input and the same detail as the kernel's fidelity row) — 0 mismatches (every census detail, code and class equal to the
replay's); no field over 2 000 characters (the longest line 711); SHA-256
56969110a86719f3072443f40bb53b25dc9cf0e65becd3ad590d629e57474792. THE TALLY, class × the fifth pass's end (both projects,
from the file; 'retrace' = pass 5's attempt retraced, and no row ends in a pass-5 commit, as a counted refusal cannot):

| class | E_BELOW_MIN_ANGLE | E_BELOW_MIN_EDGE | E_INVARIANT | E_LEVEL | retrace | total |
|---|---|---|---|---|---|---|
| D | 1 | 6 | 3 | 4 | 4 | 18 |
| E | 6 | 4 | 6 | 1 | 34 | 51 |
| P | 0 | 0 | 2 | 0 | 2 | 4 |
| S | 1 | 7 | 68 | 11 | 12 | 99 (kernel 98 + kernel-tiny 1) |
| V | 3 | 2 | 0 | 0 | 3 | 8 |
| W | 0 | 1 | 11 | 2 | 3 | 17 |
| total | 11 | 20 | 90 | 18 | 58 | 197 |

No row's fifth-pass end is E_WORK_LIMIT and none is 'not run' (pass 5 ran on every counted refusal of the census: each
is a refusal for the bound).

(a) THE TABLE on the final sources (from the file; C-0491 (2)) — refusals / noSeat at any input point / noSeatS on the
refused segment / carriable, the kernel's census (kernel-tiny's one row, S, adds 1 / 0 / 0 / 0 to S):

| class | refusals | noSeat at an input point | noSeatS on the refused segment | carriable |
|---|---|---|---|---|
| E | 51 | 0 | 0 | 0 |
| S | 98 | 0 | 0 | 0 |
| D | 18 | 0 | 1 | 1 |
| W | 17 | 0 | 0 | 0 |
| V | 8 | 0 | 0 | 0 |
| P | 4 | 0 | 0 | 0 |
| C, A | 0 | — | — | — |
| total | 196 | 0 | 1 | 1 |

The file reproduces C-0491 (2)'s counts cell for cell (`awk -F'\t' 'NR>1 && $1=="kernel"{print $6}' … | sort | uniq -c`).

(b) THE ONE CERTIFIED CASE (C-0491 (2)): −6803, random 1707, way:b1 (level 1), class D; the input segment (1 504, 2 188)
→ (1 463, 2 201) crosses ONE level-≤ 1 edge, the L1 run (1 486, 2 309) – (1 537, 1 535) (probe `zzcross.test.ts` in
`s16-cert`, `s16-tools/out/cross.txt`): `seatsOfSegment` = {crossed 1, notSpanning [], seats [], vertices []} — carried
with that certificate (§3.6 'no existing vertex moves'; M4's rounding move of committed geometry the later material).

(c) THE REST: every other counted refusal of the final census, and the trio's one class-C case — refused today with its
typed code; no J238 (1) proof; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue row, owed to this item's
RESIDUAL ROUND (C-0491 (3)). '(notBuilt #2, M4)' in the registers and details is the class's NAME (J697), not a carry.

### Re-runs on the final sources (chain `s16-fix`; seats 3 – 4)

All on the final sources (the tree after the leave gate's re-read; `packages/*/src` byte-identical to the tree in every
copy named, but the probes' stated hooks). Seat 4 re-started the chain after the container restart of ~03:08Z (every
finished step kept by its exit-code file).

- NEAR (`near.json`, `near.rc` 0): `corepack pnpm exec vitest run --project kernel --project kernel-tiny --maxWorkers=1
  packages/kernel/test/insert/step3-5` — 28 files, **804 / 804** green (kernel 402, kernel-tiny 402).
- THE UNDO ORACLE (`undo.log`, `undo.rc` 0): `PLAT_UNDO_ORACLE=1 corepack pnpm exec vitest run --project kernel
  --maxWorkers=1 packages/kernel/test/insert/step3-5 packages/kernel/test/tx/write-door.test.ts
  packages/kernel/test/tx/door.test.ts` — 16 files, **415 / 415** green, 419 s.
- THE AFTER CENSUS IN FULL (LINE 4 (d); `s16-fix/seed.sh <seed>` per seed — kernel bfuzz.test.ts + fidelity.test.ts,
  kernel-tiny fidelity.test.ts, PLAT_FUZZ_SEED = the seed, 10⁴ each, per-case log PLAT_FUZZ_CASELOG and counts
  PLAT_FUZZ_COUNTS; `census/<seed>{,.tiny}.{tsv,counts.jsonl,rc}`): the 32 seeds (caps.ts's 31 and 20261013), all 64 runs
  rc 0. Against S14's AFTER (`s14-after/census`, the pre-fix sources; `s16-tools/cmp-census.sh`, `s16-fix/cmp-census.txt`):
  **every per-case line byte-identical on all 64 logs** (no line moved, so none to declare: no chain the stale read made
  the fifth pass refuse commits on the census — a table growth inside pass 5's leave landing never decided a census
  case); the counts files differ only in the `cap` field (caps.ts's ratchet re-recorded by S14 after the S14-AFTER run;
  96 cap fields, every other field equal). Counted refusals: kernel random 104, constructive 41, mandatory-only 50,
  fidelity 1 (= 196: E 51, S 98, D 18, W 17, V 8, P 4; C, A 0); kernel-tiny fidelity 1 (S) — equal to S14's AFTER in
  every cell, never above it. SHA-256 of `cat census/*.tsv`:
  dc85cce38b58eac3ba8713b1df0db5c29319b41fab7ee4ff3b509675ef1a81d3.
- LINE 5 (d): above ('LINE 5: the census residual as ruled').
- M0-a-08's TRIO at seed 8611 × 1 000 (`trio.log`, `trio.rc` 0; PLAT_FUZZ_SEED=8611 PLAT_FUZZ_RUNS=1000
  PLAT_REFUSALS_OUT / PLAT_FUZZ_COUNTS, the five files of testkit/test/kernel/arr-booleans-buffers/ as S14 ran them): 5
  files, 96 / 96 green; **83 refused lines, all E_INVARIANT of insertChain**, sorted SHA-256
  e77dec17ca7eda6affd8243b66b652589eab18152f42be65c9064f5399bb2da3 — **byte-identical to S14's AFTER**
  (`s14-after/trio-refused.jsonl`, the same sorted SHA-256; `trio-counts.jsonl` equal). Its one class-C case: offsetFace,
  source arb, seed 8611, "no route from (9637, -10510) to (10952, -12837) … class C … the vertex (10937, -12804) stands
  within minEdge of the edge (10952, -12837)–(10866, -12801)" — OPEN IN M0 (above).
- THE STAGE ROOTS (`corepack pnpm bench -- profile --seed N --run R --mode plain --load-max 99 --load-wait 0`, in a
  `cp -a` of the final tree, `/home/user/maps-scratch/waves/s16-roots/tree/plat` — `diff -rq` of every `packages/*/src`
  against the tree: empty, `s16-roots/src-diff.txt` — logs `s16-roots/tree-<run>-<seed>.log`; the base side S15's
  `s15-roots/base-*`, the base being unchanged): fusion 3 db72c0bf0fa021ca873fd7f5f6f30d7b (lanes 1 207, blocks 1 057),
  integrated 4 e9e96e0e6a2e88e587c968796e0ef03e (1 373 / 1 310), fusion 1 ee1e0f22ad1ee1e6d4464f6e4fa571fb (1 194 / 1 058),
  integrated 1 be9e88bfa1be0d8d4e207ed36502744f (1 376 / 1 299) — **base = S15's tree = the final tree**.
- RELATED@1000 (LINE 4 (b); `related/`, PLAT_FUZZ_RUNS=1000 PLAT_FUZZ_SEED=20261113, W=1; the file list from `vitest
  related --run -t '^__no_such_test__$'` over insert/{stretch,snapRound,insertChain}.ts: 496 files in 42 chunks of 12;
  totals by `s16-fix/sum-related.py`): all 42 chunks run (`related/all.rc` 0; chunk rc 1 for chunks 04, 06, 07, 08 only —
  the reds below), **7 471 tests: 7 459 passed, 11 failed, 1 skipped / todo**; no file registers no test at 1 000 runs
  (s5seeds.test.ts, chunk 19, registers its 3 tests at that size and is green; its seven 'later rungs' cases register only
  at full strength, Q202); J176's five bench Mac-reference files are not in the selection; Q153's dilation.test.ts
  (chunk 33) green; kernel/test/tx/cost.test.ts (chunk 15, kernel and kernel-tiny) green, 6 / 6 each. THE 11 REDS — every
  one named — are S14's and S15's RELATED set exactly (`s14-after/related.json`, `s15-related/related.json`: bands
  closing.test.ts ×2, dryrun.test.ts 'draws 389 and 1109', hardening-s15.test.ts B-NEST 'network 561', restage.test.ts N1
  and N2 — Q152's six; bench site compose.test.ts Q122 relief-60 seed 2 and spike.test.ts ×3 — S14's declared bench / site
  reds) plus ONE: kernel/test/arr/bands/derived.test.ts 'line 9 … straight lanes on B-FUZZ's chord networks' — "expected
  92 to be greater than or equal to 96" (the floor 'faces judged ≥ 12 per kept network' at 10 networks drawn, 8 kept).
  NOT this round's: M0-a-09's file, a floor of a seeded random family at the reduced size; the same test at the same seed
  and size in the base probe (`s16-work/base/plat`, the base's sources but insertChain.ts's inert counter, unset here) is
  red with the SAME figures (`s16-fix/derived/base.log`: "networks drawn 10 kept 8 … cuts 24 … faces judged 92", every
  count of its DERIVED line equal to the tree's but the timings) — S14 / S15 ran RELATED with PLAT_FUZZ_SEED unset and
  met another draw. A NOTE FOR THE SESSION (seed 20261113, PLAT_FUZZ_RUNS=1000; replay `PLAT_FUZZ_RUNS=1000
  PLAT_FUZZ_SEED=20261113 corepack pnpm exec vitest run --project kernel packages/kernel/test/arr/bands/derived.test.ts
  -t 'straight lanes on B-FUZZ'`), no failing line here. Chunks 21 – 41 (3 406 tests) add no red: the red set is S14's / S15's
  ten and the base-red derived.test.ts line, nothing else.
- THE BANDS FOLDER at the base's recorded seed (PLAT_FUZZ_SEED=-906380766, kernel, `bands.json`) and bfuzz.test.ts at
  20261011, 1012, 1, 2, 3, 4 (`bandsbfuzz-<s>.log`), against S14's AFTER (`s14-after/bands-tree.json`,
  `s14-after/bandsbfuzz-<s>.log`): `bands.rc` 1 — 227 tests, **6 failed: Q152's six** (closing.test.ts ×2, dryrun.test.ts
  'draws 389 and 1109', hardening-s15.test.ts B-NEST, restage.test.ts N1 and N2), the same 227 tests with the same status
  each as S14's AFTER and **every failure message byte-identical** to it (ANSI codes and `at` stack lines stripped; seat 5's
  comparison, the JSON reporters' `assertionResults`); `bandsbfuzz-<s>.rc` 0 at all six seeds (3 / 3 green each) and
  **every line of each log — the REFUSAL lines, the 'B-FUZZ bands: … refusals per operation … by cause … closings' cell
  lines — identical to S14's AFTER** but the timings (`diff` after stripping ANSI codes and the lines carrying a duration).
  No test and no cell moved, so none to declare; the six declared reds stay red with their messages unchanged.

### LINE 12 (f): the stage fixtures' work (seat 5; chain `s16-fix`, steps `work/{base,tree}-chunk-NN`, `an-work-final.txt`)

- THE PROBES: `/home/user/maps-scratch/waves/s16-work/base/plat` (a copy of THE BASE) and
  `/home/user/maps-scratch/waves/s16-work/tree/plat` (a copy of the FINAL tree, its snapRound.ts `cmp`-equal to the tree's),
  each with ONE file instrumented — `packages/kernel/src/insert/insertChain.ts`, a counter appending one JSON line per
  `insertChain` call (its test file, level, class, points, the result's code and detail, the placed points, the call's
  work `tx.work.total` delta, and on the tree pass 5's own spend, segment count and end) to `ZZINS`, and on the tree the
  marker of a pass-5 commit; nothing else differs: `diff -r` of each probe's `packages/*/src` against its side,
  `s16-fix/work/probe-src-diff.txt` (SHA-256 c8667312e4b05ac5df34c3b9422a69f4d662dd1bb09439bde2b6f76244d8db24; insertChain.ts
  alone on both sides, the lines quoted there).
- THE RUNS: the layout and site suites — 145 test files in 18 lists `work/list-NN.files` — per list and side
  `ZZINS=<side>-chunk-NN.jsonl PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --project layout --project site
  --maxWorkers=1 --reporter=default --reporter=json` (logs, JSON reports and rc beside each); PLAT_FUZZ_SEED unset — the
  stage fixtures' own seeds; base and tree draw the same calls up to the first moved outcome (below). Read by
  `s16-fix/an-work3.py` → `s16-fix/an-work-final.txt` (SHA-256 5bd92020a58e69a98813590ccdf7b48395709a60dcca62f921e4a16d42e43093).
  Tests: 1 503 / 1 503 passed on each side; the one failed FILE on each side is layout/test/enceinte/s5seeds.test.ts
  ('No test found' at 1 000 runs; Q202, declared, red on both).
- TOTALS base → tree: calls **6 438 327 → 6 459 464** (+21 137); refused **1 364 → 1 381** (+17); work **89 444 550 →
  89 864 517** (+419 967); **E_WORK_LIMIT 3 → 3** (all three in layout/test/pipeline/core/runner.test.ts on both sides — its
  pinned work-limit case, the same three records base = tree); pass 5 on the tree: **14 runs, 1 commit, spend 172 517**,
  worst 26 645 a segment (a one-segment chain, refused, discarded). Record digests (an-work2.py's rule): base 586b5a8b…0755f,
  tree adc3cd58…9c18e — BOTH equal to the first chain's reading (`an-work-firstchain.txt`, taken before the leave gate's
  re-read): the re-read moved no stage fixture's call. **No NEW E_WORK_LIMIT on any fixture**, so nothing to declare or
  report to M0-f-03b; cost.test.ts green (RELATED, chunk 15).
- PER FIXTURE: 78 of the 82 fixtures that call insertChain are equal base = tree in calls, refused, E_WORK_LIMIT and work
  (the full table in `an-work-final.txt`). The four that differ (base calls / refused / E_WORK_LIMIT / work → tree; tree
  pass 5 runs / commits / spend):
  | fixture | base | tree | pass 5 |
  |---|---|---|---|
  | layout/test/districts/q133.test.ts | 428 003 / 52 / 0 / 5 850 535 | 428 003 / 52 / 0 / 5 961 103 | 9 / 0 / 110 568 |
  | layout/test/enceinte/s3seeds.test.ts | 429 496 / 135 / 0 / 5 248 128 | 429 496 / 135 / 0 / 5 292 181 | 3 / 0 / 44 053 |
  | layout/test/growth/s5ab/held-coarse.test.ts | 677 056 / 139 / 0 / 8 571 876 | 677 056 / 139 / 0 / 8 589 496 | 1 / 0 / 17 620 |
  | layout/test/growth/s5ab/held.test.ts | 571 006 / 146 / 0 / 7 311 254 | 592 143 / 163 / 0 / 7 558 980 | 1 / 1 / 276 |
- THE RECORDS ON ONE SIDE ONLY (14 base, 21 151 tree): 13 are the 13 discarded pass-5 runs (q133 9, s3seeds 3,
  held-coarse 1) — the same chain, the same refusal code and detail byte for byte, its work raised by pass 5's spend (the
  shift WORK IS A NAMED SHIFT SOURCE names; spent work is not rolled back); 1 is THE PASS-5 COMMIT: held.test.ts, a
  two-point MANDATORY chain (−76 136, −2 715) → (−72 167, −3 211), refused on the base class W ('no route from (−76 136,
  −2 715) to (−72 184, −3 202) keeps clearance … class W'), committed on the tree by pass 5 (spend 276). DECLARED (LINE 1's
  shift, the S14 clause's 'a lawful input that was refused now commits'): from that call on the fixture's sequence
  continues where the base's fell back — the base's remaining 494 598 calls all recur on the tree, which makes **21 137
  more calls (a later chain of the same sequence, LINE 12's named source)**, among them 18 refusals, every one
  E_DEGENERATE 'empty' (step 1's code for a chain empty after snapping — the stage's own probe chains, no bound refusal);
  held.test.ts's bound refusals 1 → 0, its E_DEGENERATE 'empty' 145 → 163; the test green on both sides. No chain that
  committed on the base commits otherwise on the tree in any fixture.
- THE CENSUS, THE TRIO, THE BANDS AND THE ROOTS on these sources: above ('Re-runs on the final sources').

### Gates (the tree, this round's final files; seat 5, after the container restart of ~05:07Z, chain `s16-fix` re-started and ended: `chain.done`)

- `corepack pnpm install --frozen-lockfile` **0**; `corepack pnpm lint` **0** (its probe-red check red on the probe file
  as it must be: `tools/lint/fixtures/probe/zz-probe.ts` Math.pow, Math.random, Math.sin, Date.now, performance.now …);
  `corepack pnpm build` **0** — after the round's last edit (`/home/user/maps-scratch/waves/s16-gates/{install7,lint7,build7}.{log,rc}`).
- NEAR (kernel + kernel-tiny, `packages/kernel/test/insert/step3-5`, full strength, W = 1): **804 / 804** (`s16-fix/near.rc` 0).
- RELATED@1000 (PLAT_FUZZ_SEED=20261113, 42 chunks, W = 1): 7 471 tests, 11 red — exactly the declared set above (S14's /
  S15's ten and derived.test.ts line 9, red on the base at the same seed and size); no red of this round.
- THE UNDO ORACLE (PLAT_UNDO_ORACLE=1 over the folder with the door's two tests): **415 / 415** (`s16-fix/undo.rc` 0).
- The census (32 seeds, both projects), the trio, the bands folder and its six bfuzz seeds, the stage roots and the stage
  fixtures' work: above — equal to S14's AFTER in every count and per-case line (the census, the trio, the bands), base =
  tree (the roots), no NEW E_WORK_LIMIT (the stage fixtures; one declared pass-5 commit).
