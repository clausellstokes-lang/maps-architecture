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

## Fix round S12 (lane `build/M0-a-05-fix-s12`, 2026-10-27 – 2026-10-28; the session's round — Q104 (N-63 (2)) with Q58's partner draw 1 524, notBuilt #3's forms (N-64, J515), the routed row Q112 (J532); C-0432)

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
| notBuilt #3's forms (1) – (2) | **Form (1) BUILT within the corner bound** (a tip of at most 90°, the cut back within 2 · √2 · `attractCm`, §3.6 *Existing geometry wins*); **(1′) and (2) KEPT with J238 (1)'s proof** in C-0432 (3): (1′) beyond the corner bound — moving the corner breaks the fidelity bound, keeping it needs step 3 to ignore the chain's own path (which §3.6's preamble forbids) and measured a census rise at 20261013 (random 2 → 13, constructive 1 → 8): the design's call on that conflict and M4's thin-face handling; (2) commits under every key (a re-ordered simple run, no refusal). Both listed for re-check at M1's first towns | `reentry.test.ts`: form (1) commit pins (W 40 cm from the corner: A–W–B, the transaction commits); `crossings.test.ts`'s 'through' V cut back onto its crossing (61 cm); (1′) kept pins (W 80 cm: W of degree 3, refused '(way, way:c1) branches' under a linear key); (2) kept pins (committed, a simple run under every key) |
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
| Q104 W (the end's fallback beyond the bound, a seat within it) | LAWFUL | MAKE-IT-SUCCEED — fixed | the end rule W, C-0432 (1) |
| Q104 A and B (no seat on F's boundary within the bound, §3.10) and Q58's 1 524 | LAWFUL networks; the request (a contact pinned within `attractCm` on F's boundary) unsatisfiable under §3.10 and the fidelity bound | REFUSE, typed (N-57 (2)'s code, UNLAID_DEEP at the read), the proof pinned; the alternative layer is a-09's contract or the family's generator — REPORTED (notBuilt #4) | C-0432 (2) |
| notBuilt #3 (1), (3) – (5) | LAWFUL | MAKE-IT-SUCCEED — built | C-0432 (3) |
| notBuilt #3 (1′) | LAWFUL | MAKE-IT-SUCCEED, kept with J238 (1)'s proof (the design's call; M4's thin-face handling); re-check at M1's first towns | C-0432 (3), C-0424 (3) |
| notBuilt #3 (2) | LAWFUL | commits (no refusal); its drawn order kept as (1′) | C-0432 (3) |
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
| N-s12c-1 | **Q104's three residual own refusals, routed to the session (ZERO REFUSALS, J264).** On a-09's chord family at PLAT_FUZZ_SEED 1 (draw 8 419, the pinned contact (20, 2 116)), 3 (draw 7 294) and 4 (draw 9 373) corridorUnion refuses one lawful network each under N-57 (2)'s clause texts; the harness does not re-measure to 0. This seat's probe P2, written from §3.6's placement tests (i) – (iii) and §3.10's clearance without the code under test, finds no seat on F's boundary within 2 · √2 · `attractCm` of the contact in any of the six residual networks (the control, case (b), 417 seats), so no insert/ change can commit them within the fidelity bound: the round's REFUSE with the proof (notBuilt #4, C-0432 (2), N-s12-1) is the lawful outcome of the request as made. | the session's ruling: N-57 (2)'s contract for a contact with no lawful seat (a-09), or C-0177 (2)'s sub-`minFaceAngle` T-junction in the bands generator; until then a-09's gates keep N-63 (3)'s known class under notBuilt #4's text | the session (a-09's next touch) |
| N-s12c-2 | **kernel-tiny `fidelity.test.ts` E_INVARIANT 2 > cap 1 at a random seed (RELATED@1000's one new red).** The fidelity property's cap at 10³ is 1 (`refusalCap`: Poisson 99.9 % of 0.026, at least 1) and its refusals come in clusters — this seat's scan of 2 · 10⁵ case seeds (1 000 001 …, `kernel-tiny`, the mirror) met 5 refusing cases carrying 8 E_INVARIANT (1 014 918 ×3, 1 084 572 ×2, 1 062 924, 1 189 337, 1 192 055), each identical digest for digest on S12 and on this seat's S11 model — the pre-existing KI-1 residual at 0.40 per 10⁴ at random seeds (caps.ts's 0.10 over the 31 seeds), not the round's. A RELATED run at a random seed can meet one refusing case with two refusals and go red on a count the 31-seed measure never saw. | the session (J207: raising a cap is the session's call, never a seat's): count refusing cases rather than refusals against the 10³ cap, or set the fidelity property's 10³ cap to 2; otherwise a KI row for the hardening pass | the session; M4 |
| N-s12c-3 | **a-09's three foreign bands pins (N-s12-4): attribution CONFIRMED.** On this seat's S11 model (the round's features Q1 + F3b + F1 + F5 + F4a switched off in the mirror; it reproduces N-7's `3e8ec437…` exactly) `hardening-s15.test.ts` network 561, `closing.test.ts`'s shrunk counterexample of 20261011 and `restage.test.ts` N1 stay red while the round's three declared shifts (`closing.test.ts` 1109, `dryrun.test.ts` 389 / 1109, `restage.test.ts` N2) go green: the three are S9 – S11's engine against pins recorded on S8's, foreign to S12. A soft run of the three shifted pins on S12 fails only their exact kerb / closing / class lines; every outcome law after them holds. | a-09's next touch re-pins all six on the landed engine (the round's PROPOSED re-pins for its three; the other three need a-09's own reading) | the session (a-09's next touch) |
| N-s12c-4 | **A targeted family for notBuilt #3's class (this seat's T; `/home/user/maps-scratch/waves/check-M0-a-05/s12/zzs12t.test.ts`, mirror only, C-0106).** V-chains and small rings beside a `way` whose end, bend or junction W stands within the corner bound of the corner V (37 – 73 cm), the arms aimed within asin(`attractCm` / |VW|) of W, existing geometry planted near the first arm's start: on the tree 441 of 19 998 lawful chains commit with a vertex of degree 3 in their own rows and are refused `branches` under a linear key (open 3-point 66, closed 132, open 4-point 243; mandatory 329, optional 112; 153 with the branch at W itself; 16 with an obtuse input corner — the retraces the cut back does not route, notBuilt #3's class by C-0424 (3)'s rule, (1′) and (2) among them); the optional class's 537 refusals are its own precision rules (453 a wedge beyond `attractCm`, 84 a corner below `minFaceAngle`: the generator's degenerate corners); no `allProblems`, no mandatory refusal. A fit register for the class's re-check at M1's first towns and for M4's hardening; its generator is in the lane's scratch, not the tree. | add T (or its arrangements) as a counted family of the class at M4, with the per-form counts; the re-check at M1's first towns counts the same forms in the towns' ways | M4 (and the re-check at M1's first towns) |

## Fix round S13 (lane `build/M0-a-05-fix-s13`, 2026-10-30; the S12 closing check's failing line — notBuilt #3's form (1) at an obtuse tip within the corner bound; N-64 (3) – (4), J238 (1) – (3), J264, J290 / N-58, J499; C-0433)

One line, inside the item's owns (insert/insertChain.ts and test/insert/step3-5/reentry.test.ts); a-09's kerb,
corridorUnion and bandUnion and its bands harness were run read-only, never edited. One Claude Code cloud container
(linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib, Node 24.12.0), no restart.

### Row-by-row outcome

| line | outcome | evidence |
|---|---|---|
| notBuilt #3's form (1) at a tip wider than 90° within the corner bound (the S12 check's family T seed 503 740; F1b not equivalent) | **BUILT** (C-0433) — the cut back's corner-bound tier (candidates beyond √2 · `attractCm`, within 2 · √2 · `attractCm` of the corner's input point) at every corner after the √2 · `attractCm` tier, the S12 check's F1b; `acute` removed; a declared deviation from §3.6 *Existing geometry wins*'s "at an acute tip", every placed vertex still within the fidelity bound (`tryCuts` bound `FIDELITY_SQ`). The "at most 90° wide" claim struck from C-0432 (3)'s premise (in place), insertChain.ts's comments above `near` / `far` and the passes' header, and reentry.test.ts's form (1) comment; C-0424 (3)'s list amended in place (form (1″) BUILT) | `reentry.test.ts` § form (1″) (new, three cases × kernel and kernel-tiny): seed 503 740's arrangement (the four existing ways, W (1 635, 2 421) a junction; the mandatory open chain A (1 445, 2 274) → V (1 644, 2 461) → B (2 135, 2 081)) — the corner 99° and within the corner bound (41.0 cm); under `invisible` placed (1 461, 2 257) · (1 635, 2 421) · (2 126, 2 067), no vertex of degree ≥ 3, W of degree 2, V gone; through M0-a-06's transaction under `way` the batch commits. Red on the S12 engine (placed V kept at (1 644, 2 461); the transaction refused `E_INVARIANT (way, way:c1) branches`), exactly the S12 check's tree row; green now |

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
  C-0432 (4)'s S12 column (chord kerb / corridorUnion / bandUnion insertChain, own: 5 / 11 / 6, 0; 7 / 10 / 2, 0;
  2 / 6 / 1, 1; 5 / 8 / 1, 0; 3 / 8 / 3, 1; 5 / 8 / 1, 1 — widened kerb / corridorUnion insertChain, own: 7 / 7, 3;
  10 / 10, 2; 8 / 8, 0; 2 / 2, 4; 12 / 12, 2 (kerb own 1); 11 / 11, 1).

### Refusal verdicts (J290 / N-58; the counts BEFORE → AFTER the round)

| class | input | verdict | count |
|---|---|---|---|
| notBuilt #3 form (1″) — an obtuse corner within the corner bound re-entering a vertex of its own path (T seed 503 740) | LAWFUL | **MAKE-IT-SUCCEED: built** (C-0433) | the S12 check's family T: 1 refused 'branches' → 0 on its replay (pinned); the registered families' counted cells unchanged (no counted refusal was of this class) |
| the census's counted cells (random, constructive, mandatory, fidelity) | LAWFUL | KI-1's residual, notBuilt #2 (M4, C-0423), unchanged | 103 / 43 / 49 / 3 → 103 / 43 / 49 / 3 (198 → 198) |
| notBuilt #3 (1′), (2) | LAWFUL | KEPT with J238 (1)'s proof (C-0432 (3)), re-check at M1's first towns | unchanged |
| corridorUnion's own (bands chord family; Q104's sub-classes A and B, notBuilt #4) | LAWFUL networks, no seat within the bound | REFUSE with the proof, REPORTED (C-0432 (2), N-s12c-1) | 0 / 0 / 1 / 0 / 1 / 1 → the same |

## Closing check of S13 (lane `check/M0-a-05-close-s13`, 2026-10-31; verdict PASS in `checks/M0-a-05-s13.md` — notBuilt #3's form (1″) BUILT, confirmed)

The S12 closing check's one failing line is fixed: on the S13 engine the S12 seat's family T (19 998 lawful cases) equals
that seat's mutant F1b case for case and differs from the S12 engine only at seed 503 740 (refused `branches` → commits
A′–W–B simple), pinned in `reentry.test.ts`; the census (32 seeds × 4 cells at 10⁴) and the bands gate (7 seeds) held cell
for cell; RELATED@1000's eight reds are the S12 round's declared / foreign set. Two rows:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s13c-1 | **FAR1 survives — the corner-bound tier's breadth is unpinned.** This seat's mutant FAR1 (`far … .slice(0, 1)`: only the nearest candidate beyond √2 · `attractCm` tried) changes no pin, no NEAR test at the PR size and no RELATED@1000 test (its reds the known eight); on family T it changes one case, seed 516 267 (an acute 25.5° open chain beside a junction W 59 cm from V: the tree cuts V back through the second far candidate and commits simple; the mutant commits W of degree 3 and the transaction refuses `(way, way:c1) branches` — fail-safe). Not equivalent; it bears on S12's acute-tip tier, not on this round's change. | pin T 516 267's arrangement in `reentry.test.ts` (commit, a simple path, under `invisible` and a `way` key) so the "at most 8 per bound" breadth is held | next a-05 round, else M4 |
| N-s13c-2 | **LOOSE equivalent.** Gathering cut-back candidates within 4 · `FIDELITY_SQ` changes one T case (506 010) whose moved vertex stays within the fidelity bound (71.2 cm < 73.5 cm): the landing's bound check holds the promise. | none (an equivalent survivor, one line) | — |
