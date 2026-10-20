# M0-k-02 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-k-02 (lane `check/M0-k-02-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, a closing check fails the item only on a blocker. None of the findings below is a
blocker: none is a gate failure, a missing interface or test id, an undeclared stub, a wrong result on an honest input,
a clean-room breach or a path outside `plat/`. Each row names its handling and the milestone where it belongs. The
verdict and its evidence are in `checks/M0-k-02.md` (the closing round is at the top). The first check's notes N-1 –
N-6 stay there; the ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-7 | **A judge silent on the first seed makes the whole case pending.** In `runConstructive` (`set.ts`), a case whose judge returns no verdict on the first seed is counted as pending and the loop breaks, even if the judge would give verdicts, including failing ones, on later seeds. The fix round's rule covers the reverse order: a verdict followed by a missing one is a failed draw. A judge that is selective by seed is a deliberate-writer escape, not an honest input. M0-k-02's own numeric judge answers on every seed or on none (probe: `runConstructive(casesAt('M0'), 3)` gives judged 7, draws 21, pending 127). | When M0-k-04's runner adopts the shared iteration, decide pending on the case (the judge's declared coverage), not on seed 0's answer. Or, as an equivalent, count a verdict after a silent first seed as a failure. Add a negative control in `deferred.test.ts`. | M0-k-04 (wave 11), else M4 |
| N-8 | **The whole-set prefix replay draws only 10 seeds per case.** `replay.test.ts` replays every M0 case's insertion prefix on the landed `insertChain` with `PREFIX_REPLAYS = 10`, while the listed generator test draws 10³. The five fixtures that F-1 and F-2 named are replayed on 100 draws each, and this seat's own probe ran them on 200 draws each with no escape. An erasure that only a rare draw reaches would show up only in M0-k-04's B-FUZZ run. | Raise the prefix replay to the B-FUZZ PR size in M0-k-04's runner, which runs every step anyway. No change is needed here. | M0-k-04 (wave 11) |
| N-9 | **The re-seat and pair geometry after the warp is checked by witness, not by the kernel.** For `move/warp-kerb-near-vertex` and `move/warp-steiner-pair-renumbering`, the replay confirms the state just before the warp. The post-warp claims are checked exactly by the witnesses: the end moved by the drag is the rounded foot of the vertex on the warped kerb, at 25.3 – 25.4 cm; and the pair's projections lie minEdge to minEdge + 1 apart. No warp is run, because the warp is M0-a-13's and the run is M0-k-04's (C-0110). Whether the landed warp actually re-seats the end there is therefore PLAUSIBLE until M0-k-04. | M0-k-04 judges both cases against M0-a-13's landed warp and reports a mismatch against C-0187 (1) – (2). | M0-k-04 (wave 11) |
| N-10 | **`remove/stretch-way`'s "far part from j2" no longer runs to the line's last vertex on every draw** (closing round 2, lane `check/M0-k-02-close-r1` re-dispatched on integration-g7 B-1, 2026-10-05). C-0191 rewrites the spine in chain order, so on 119/200 draws `j2` now comes before `j1` along the given line. Integration-g7's own probe `p3-profiles.mts` reads the step `retypeEdges { rekey: 'farPart', from: 'j2' }` as "from j2 to `spine[last]`": that range then contains the stretch j1 – j2, and the following `removeEdges` refuses `E_DEGENERATE stretch` on exactly those 119 draws (it held 200/200 before the fix, when the draw order always put j1 first). Read as "the part beyond j2, away from j1" (the clause's "far part"), the case holds its whole expected outcome on 200/200 (`close-k02/p3-far.mts`). The case is right under the clause's reading; the step's parameter does not say which end is meant. | Either name the far end in the step (`to: 'end'` resolved to the end beyond `j2`, or j1 / j2 relabelled in chain order so j1 always comes first), or have M0-k-04's runner resolve `farPart` as the part beyond `from` that does not hold the stretch. The integration re-check of group 7 should re-run P3's stretch-way leg with that reading. | M0-k-04 (wave 11); the g7 integration re-check |
| N-11 | **The 50 cm bound of `index/slot-reuse-stage` is not pinned exactly** (closing check of session fix round S1, lane `check/M0-k-02-close-s1`, 2026-10-06). Mutant K03 (`gap = d.log(L + 99, 2¹⁸)`) survives `indexes.test.ts` and the kernel run: seeds 0 – 999 hold no draw at exactly gap = L + 100 (P2 over 10⁶ seeds: min clearance 50, 374 at the bound, the first being seed 1045), and the fast-check property meets one on ~31 % of runs. Equivalent to the case's promise: probe P3 shows the boxOld query meets nothing at any clearance ≥ 1 cm (0 fails, the box being closed), so the ruling's 50 cm is slack. | Pin seed 1045 (clearance exactly 50) beside seed 2 in `indexes.test.ts`, so a lowered bound fails deterministically. | M4 (hardening) |
| N-12 | **No test asserts that `index/slot-reuse-stage` reuses a slot** (same lane). Mutant K10 (move `removeEdges` after the fresh insert) survives every test: probe P1 on the mutant gives reuse 0 / 200, judge green 200 / 200, since the hold `query-returns-new-item` judges the queries only. The step order is unchanged since the case landed and the landed case reuses on 2 000 / 2 000 draws (removal frees 2 vertices + 1 pair; the fresh insert re-fills them, tops unchanged), so this is a guard against a future reorder, not a wrong result. The same holds of `index/slot-reuse-districts`. | Add a `slot-reused` hold to both cases (M0-k-02's data) and its check in the judge (M0-k-04's `invariants/constructive.ts`): after the fresh insert the vertex and pair tops equal those after the removal and the free lists are drained. Could ride with M0-k-04's N-49 follow-on (dropping the KI-1 rows); otherwise the hardening pass. | M0-k-04's N-49 follow-on if convenient, else M4 |
| N-13 | **Two clauses of the judge's `slot-reused` check are not pinned by a negative control** (closing check of session fix round S2, lane `check/M0-k-02-close-s2`, 2026-10-20). Mutant J1 (the vertex-top clause dropped: `if (fresh.pairTop !== removed.pairTop)`) and mutant J4 (`'no removal ran'` → `null`) survive `test/constructive/` (8 files) in the seat's mirror. On every honest draw of the two cases that hold `slot-reused` (`index/slot-reuse-stage`, `index/slot-reuse-districts`) the tops are equal and both free lists empty (own probe, 200 / 200 each), and both cases carry an ok removal step, so neither mutant changes a verdict on them. J1 differs only on case data whose insertion grows the vertex top while the pair top stays (one connected chain gives Δpairs ≥ Δvertices − 1, so it needs a deliberately written scenario); J4 only on a case that holds `slot-reused` without any removal. The guard the row asked for (the K10 reorder) is pinned and killed. | Add two negative controls to `indexes.test.ts` beside the four of round S2: a fresh chain on the districts case that takes one vertex more than the removal freed while the pair count stays (vertex top grown, pair top equal), and a scenario holding `slot-reused` with no `removeEdges` step (`no removal ran`). | M4 (hardening) |
| N-14 | **`limit/cap-move-halvings`'s region box is not pinned to p** (same lane). Mutant C4 (`rect(MIN_EDGE - 10, -10, 20, 20)` in place of `rect(D - 10, -10, 20, 20)`) survives: for every drawn D ∈ [27, 32] the box [15, 35] × [−10, 10] still holds p and not q, so the warp selects the same vertex. Equivalent on the drawn range; recorded so a widening of D's range re-checks the box. | None now; if D's range is widened past 34 cm, the witness should also check that the region holds p and not q. | M4 (hardening) |

## Hardening round S2 (lane `build/M0-k-02-fix-s2`, flow flow-7, 2026-10-20; choices C-0402)

The session's hardening round of M0-k-02 (J237 (2), J186, J192, J264, J290 / N-58), the second half of merged round M5.
It covers the rows that `checks/hardening-inventory.md` assigns to the item (M0-a-15:34 note 8, M0-k-02:15 N-10, :16
N-11, :17 N-12, M0-k-04:10 N-2). It also covers the session's line M0-k-04:19 N-11 (the case-data half, reported to this
round by M0-k-04's round S1). The re-triage of 2026-10-19 (J423, batch B8) applies: N-10 is DONE (confirm only), N-11 is
DEFERRED to M4, and the queue row L18 is entry 41's. Every source note was read whole before its row. Edits stay in the
item's owns (`packages/testkit/src/constructive/`, `packages/testkit/test/constructive/`). The one exception is ruling
R12's extension, `packages/testkit/src/invariants/constructive.ts` (M0-k-04's), which this round edited for exactly
its two rows: N-2's KI-2 and N-12's judge half. Ruling J450 widened R12 by one line of M0-k-04's
`bench/test/fuzz-bar/entry.test.ts` (line 94; see 'Declared verdict change'). The machine was a Claude Code cloud container (Linux x64, Xeon, 4 CPUs,
16 GiB, Node 24.12.0, W = 1). Timings are CONTENDED and informative only.

### Row by row

| row (source note) | outcome | what changed | evidence and pin (mutant → the test that kills it) |
|---|---|---|---|
| M0-k-04:19 N-11 (`same-code-every-rung` is a static reading), case-data half | **MARKED** (data; no pin is required beyond the case's own run) | `ConstructiveExpect` gains an optional `staticHolds`: the holds that are STATIC readings, true of every draw by construction, which no code path can fail. `limit/every-rung` sets `staticHolds: ['same-code-every-rung']`. `same-code-every-rung`'s statement in `properties.ts` says it is a static reading of the two lattice constants, and that the rungs' code paths are judged by the case's other holds (`in-range`, `children-tile-parent`). `freezeExpect` freezes the field. No export was added: this is a field of an exported type. The judge's side (its comment) was done in M0-k-04's round S1. | `cases.test.ts`: every `staticHolds` entry is one of the case's `holds`, has no duplicate, sits on a case whose outcome is not wholly `static`, and is frozen. The new it 'names the static readings among a case's holds …' pins the set to `[['limit/every-rung', ['same-code-every-rung']]]`. Mutants: S1 (the field dropped from the case) → that it; S2 (`freezeExpect` drops it) → 'limit/every-rung: an outcome, its code, its tier and its properties'. Both were killed. |
| M0-k-04:10 N-2 (KI-2: `limit/cap-move-halvings` puts p exactly minEdge from q, inside attractCm) | **FIXED and PINNED**; KI-2 dropped (R12) | `buildHalvings` draws p at D ∈ [27, 32] cm from q, beyond attractCm (26), so insertion keeps p as its own vertex. The drag toward q is δ ∈ [2⁸ · (D − 24), 2 048] cm, so even the eighth halving's step δ / 2⁸ ≥ D − 24 leaves p at most 24 cm from q. Every strength then shortens the edge below minEdge or carries p through q, which §3.6's whole-step validation refuses ("every unmoved vertex is tested against the triangles swept by the moved edges"). The step is a reported no-op after 8 halvings (§3.11 the caps). The region box follows p (`rect(D − 10, −10, 20, 20)`). The witness is exact: q → p and the drag lie on one lattice axis, the drag points toward q, D > attractCm, and δ ≥ 2⁸ · (D − minEdge + 1). `CONSTRUCTIVE_KNOWN` is now empty, and a comment records KI-2's history. **Declared shift:** every draw of this one case moves (its chain, region and drag). Before: KI-2, 'step-halved: the step was halved 0 times' on 10 / 10 PR draws. After: green on every draw, `{ applied: false, halvings: 8 }` on 1 000 / 1 000 (probe) and on the pinned 40. No golden records this case's draws: the crosshost `constructive` stage digests the draws at run time and compares legs to each other, and `bench/src/crosshost/fixtures/kernel.json` holds no expected digest. **REPORTED:** M0-k-04's run record `docs/build/summaries/M0-k-04.json` (constructive row `green 133`, `known ["limit/cap-move-halvings"]`) reads `green 134`, `known []` at its next re-record. That file is M0-k-04's and outside R12, so it is not re-recorded here. | New `halvings.test.ts`. It checks D > attractCm and D − δ / 2⁸ < 24.5 on 1 000 draws. On seeds 0 – 39 the case is green on the kernel with the warp's report `{ applied: false, halvings: 8 }`. The known list names no case of M0-k-02's data. `cases.test.ts` adds three witness negative controls (p back at minEdge, a 512 cm drag, a drag away from q). Mutants: H1 (D = minEdge, KI-2's draw) and H2 (δ from 512) → `cases.test.ts` '… its witness holding' (and `halvings.test.ts`); H3 (KI-2 restored in the known list) → 'is no known finding …'; H4 (the witness's attractCm clause off) and H5 (its drag bound off) → 'has witnesses that refuse …'. All were killed. |
| M0-k-02:17 N-12 (no test asserts that the slot-reuse cases reuse a slot; K10) | **FIXED and PINNED** (the case data here; the judge half under R12) | The new property `slot-reused` (in `properties.ts`). Its statement: the removal frees its slots and the insertion after it takes them again, so the vertex and pair tops after the insertion equal those after the removal, and both free lists are empty. `index/slot-reuse-stage` and `index/slot-reuse-districts` both hold it. The judge (`invariants/constructive.ts`) records the vertex and pair tables' `top` and `free` after every ok `removeEdges` or `insertChain` step (`markSlots`). `slotReused` takes the last removal and the first insertion after it. It fails when there is no removal, when no insertion follows the removal, when a top grew, or when a free list is not empty, and each failure has its own message. Probe before the edit: both cases reuse on 200 / 200 draws (tops equal and both lists drained), with the judge green. | `indexes.test.ts`, for each case: it holds `slot-reused` and its removal precedes an insertion (10³ draws); it is green on the kernel on seeds 0 – 39; the K10 reorder fails with the exact message `slot-reused: no insertion follows the removal (step k): no slot is reused`. Four negative controls: on the stage case, a 3-vertex fresh chain (the tops grow) and a 3-vertex old chain (a slot left on its free list); on the districts case, inA pulled off the shared edge (vertex top kept, pair top grown) and inB pulled off the far edge (vertex list drained, a pair left). Mutants: K10s and K10d (the removal after the fresh insertion, per case) and N12a / N12b (the hold dropped, per case) → '… holds slot-reused, and its removal runs before …'; J1 (`slotReused` always null) → the K10 control; J2 (the tops check off) → the 3-vertex fresh control; J3 (the free-list check off) → the 3-vertex old control; J4 (insertions not recorded) → the kernel run; J5 (vertex top only) and J6 (vertex free list only) → the two districts controls. All were killed. J5 and J6 survived the first table and were killed once the districts controls were added. |
| M0-k-02:15 N-10 (`remove/stretch-way`'s farPart does not say which end) | **DONE** (confirmed; nothing built, per the re-triage) | M0-k-04's runner resolves `rekey: 'farPart', from: 'j2'` as the part beyond `from`, away from the other junction: `invariants/constructive.ts`, the farPart branch of the retype step (`farEnd(ins.points, from, g.points[other])`, comment "N-10"). | Probe (tsx, tree, read-only): `remove/stretch-way` on seeds 0 – 199 is judged green on 200 / 200. On 119 of those draws j2 comes before j1 along the given line (the note's ambiguous draws), and all 119 are green. |
| M0-k-02:16 N-11 (the 50 cm bound of `index/slot-reuse-stage` not pinned exactly; K03) | **DEFERRED to M4** (per the re-triage; nothing built) | K03 (`gap = d.log(L + 99, 2¹⁸)`) is equivalent to the case's promise: the boxOld query meets nothing at any clearance ≥ 1 cm (probe P3 of the closing check of round S1), and the note itself names M4. | — |
| M0-a-15:34 note 8 (with note 15: the testkit-side bar arenas carry no non-zero face kind) | **REPORTED** (it needs other items' files) | Not built. Census probe: running every M0 case of the set on seeds 0 – 9 through the kernel judge gives **0 of 2 704** step arenas with a face whose kind is neither 0 nor free. The only cases that call `absorbSliver` are `expect/repair-sliver-width` and `expect/repair-sliver-area`. Each splits an L1 face with a `plot_line`, so the sliver always has a removable neighbour, and it merges, which is the `absorbed` hold. A face of kind `residue` comes only from absorbSliver's other branch (§3.6: "if every candidate boundary carries a structural role … a face of kind `residue` … `W_SLIVER_RETYPED`"). The io bar's constructive arenas (M0-d-08's `constructiveSequence`) run `splitFace` without the repairer, so no case data can put a residue there. A residue-carrying constructive arena needs three things, all outside this round's owns: a new M0 case (a sliver bounded only by structural edges); M0-k-04's pinned count `expect(M0.length).toBe(134)` (`test/runner/constructive.test.ts`) and a `residue` property in its judge (beyond R12); and the census precondition itself, which belongs to M0-a-15's round trip (`testkit/test/kernel/io/`). Changing an existing case's data would break its promise: the repair cases' `absorbed` hold is a merge. | The census probe (scratchpad `k02s2/probe-kind.mts`): `{"arenasAfterSteps":2704,"drawsWithKind":0}`. Suggested shape for the session: a case `expect/repair-sliver-residue`, an L1 face cut at L2 by a structural chain, absorbSliver retyping the sliver `residue` with `W_SLIVER_RETYPED`. It comes with M0-k-04's count 134 → 135, a `residue` check in the judge, and M0-a-15's precondition in `testkit/test/kernel/io/constructive.test.ts` ("at least one arena carries a non-zero kind"), run with the repairer there or through the judge's arenas. |

### Refusal census (J264, N-58)

The item's registered family is the constructive set's M0 cases on the kernel judge, every case on seeds 0 – 9 (a swept
case on its first min(sweep, 10)), with the oracles loaded. That is 1 299 draws. Every step's refusal is counted
(scratchpad `k02s2/census.mts`). BEFORE ran in the lane mirror with the pre-round `limits.ts`, `indexes.ts` and
`invariants/constructive.ts`, whose SHA-256s equal `landed/M0-k-02.json`'s and `landed/M0-k-04.json`'s
(d12c9260…, 79d3a6fc…, d5c90f5c…). AFTER ran in the tree.

| | draws | green | refusals | stated by the case | numeric-core (stated) | not stated (judged by C-0227 (10), (11)) |
|---|---|---|---|---|---|---|
| before | 1 299 | 1 289 (cap-move-halvings 10 failing: KI-2) | 321 | 263 | 20 | 38 |
| after | 1 299 | 1 299 | 321 | 263 | 20 | 38 |

By code, before = after: E_DEGENERATE 113, E_NOT_TWO_CROSSINGS 88, E_INVARIANT 40, E_BELOW_MIN_WIDTH 20,
E_BELOW_MIN_EDGE 10, E_WORK_LIMIT 10, E_BELOW_MIN_AREA 10, E_NON_CONVEX 10. The unstated list is identical. It has two
parts. The first is the §3.6 (2) pre-empted cuts (E_NOT_TWO_CROSSINGS on `geom/cut-ends-at-vertex`, `limit/every-rung`
and the angle cases): UNLAWFUL input by the contact rule, verdict REFUSE, judged by C-0227 (10). The second is
`limit/degen-self-touching-chain`'s `branches`: a self-touching chain on a linear role, UNLAWFUL by §3.10, verdict
REFUSE, judged by C-0227 (11) with its companion run. N-61 (1) routes the retrace to M0-a-05's router and does not
change this M0-k-02 case. Every stated refusal is the case's own UNLAWFUL input (its §3.11 row or §13.1 bullet), with
verdict REFUSE, typed and visible. The census did not rise: 321 → 321. The round's one behaviour change
(cap-move-halvings) moved a failing draw to green and changed no refusal: the warp no-op is ok, not a refusal.

### Self-check (J183): the mutant table

The lane's one mirror was `/home/user/maps-scratch/waves/selfcheck-build-M0-k-02-fix-s2/plat`, a `cp -a` copy. Isolation
was proved before the first mutant: no link points into the tree, and `@plat/kernel` resolves inside the mirror. Each
mutant ran as `corepack pnpm exec vitest run --maxWorkers=1 --bail=1 packages/testkit/test/constructive/`. Each mutated
file was restored from the tree and checked with `cmp` before the next. The mirror baseline was 8 files, 582/582 before
the districts controls were added. **17 mutants, 17 killed** (the killing test is named in the rows above). J5 and J6
survived the first table and were killed after the two districts controls; they were re-run with J1 – J3.
**PRE:** the pre-round sources with this round's tests give 13 red, and every red is a new test: the 8 N-12 tests, the
3 halvings tests, the static-readings it and the witness negative controls. The mirror was deleted afterwards.

| mutant | file | row | verdict |
|---|---|---|---|
| K10s / K10d | `cases/indexes.ts` (the removal after the fresh insertion) | N-12 | killed |
| N12a / N12b | `cases/indexes.ts` (`slot-reused` dropped) | N-12 | killed |
| J1 – J6 | `invariants/constructive.ts` (the check off; tops off; free lists off; insertions unrecorded; vertex top only; vertex list only) | N-12 | killed |
| H1, H2, H4, H5 | `cases/limits.ts` (D = minEdge; δ from 512; witness clauses off) | N-2 | killed |
| H3 | `invariants/constructive.ts` (KI-2 restored) | N-2 | killed |
| S1 / S2 | `cases/limits.ts` / `draw.ts` (the static mark dropped / not frozen) | k-04 N-11 | killed |

### API and messages

No export of a folder index or of the barrel was added, removed or renamed (J263 Q1). `ConstructiveExpect` gains the
optional field `staticHolds`. `CONSTRUCTIVE_PROPERTIES` gains the data key `slot-reused`. `CONSTRUCTIVE_KNOWN` keeps its
type and is now empty. The judge's new messages are pinned verbatim or by an anchored pattern in `indexes.test.ts`. No
existing message text changed.

### Gates (in the tree, W = 1)

* `corepack pnpm install --frozen-lockfile`: exit 0 ("Already up to date"). `corepack pnpm lint`: exit 0 ("eslint 1155
  files, 0 errors, 0 warnings", "probe-red ok"). `corepack pnpm build`: exit 0 ("tsc -b ok").
* NEAR, at the PR size (PLAT_FUZZ_RUNS unset; the item's bar, the numeric-core cases, inside it):
  `vitest run --maxWorkers=1 packages/testkit/test/constructive/` gave 8 files, 584/584, exit 0.
* RELATED, at `PLAT_FUZZ_RUNS=1000` over the round's six changed sources (`constructive/cases/limits.ts`,
  `cases/indexes.ts`, `properties.ts`, `types.ts`, `draw.ts`, `invariants/constructive.ts`), first run (17:27 – 18:06):
  118 files, 1 949 / 1 950, exit 1, 2 204 s. The one red was this round's own: `bench/test/fuzz-bar/entry.test.ts:94`
  (M0-k-04's file) in 'a whole toy run: …', at `expect(s.constructive.known.length).toBeGreaterThan(0)` ("expected 0
  to be greater than 0"). That line pinned KI-2's existence: the toy run's only known finding was
  `limit/cap-move-halvings`. If KI-2 were kept with the case fixed, the known list would be stale, so `countsReport`
  would fail the bar and the same test (`s.pass`) together with `test/runner/constructive.test.ts` ("none stale") would
  go red. No form of N-2 leaves the old line green. The rest of the toy run held: bar HOLDS, `134 judged over 134
  draws, 134 green, 0 failing, 0 known findings`. The lane stopped BLOCKED (18:06) for a ruling.
* **Ruling R12 widened (J450, the session's, vetoable)** to that one line; see 'Declared verdict change' below.
  RELATED re-run with the line changed: 118 files, **1 950 / 1 950, exit 0**, 2 211 s (18:13 – 18:50, W = 1, the same six sources); the toy
  run's `expect(s.constructive.known).toEqual([])` is green. The gate passes. Re-run with it: install 0, lint 0 (eslint
  1155 files, probe-red ok), build 0, NEAR 8 files 584 / 584.
* No timing is taken or gated here; the durations are CONTENDED.

### Notes for the session (none fails the round)

* **N-s2-1 (stale comment, M0-k-04's file).** `test/runner/constructive.test.ts`'s header (line 8) still names KI-2 as
  the reason the halving cap is held by the runner's own fixture. The fixture stays right, but the reason is gone. The
  file is M0-k-04's and outside R12, so it is not changed here. It should be dropped at the file's next touch. M4.
* **N-s2-2 (row 8's routing).** See the row above: note 8 needs a new residue case, M0-k-04's count and judge, and
  M0-a-15's precondition. The session decides which round takes it.
* **N-s2-3 (was the BLOCKER for the round's gate; RESOLVED by ruling J450).** `bench/test/fuzz-bar/entry.test.ts:94`
  (M0-k-04's) pinned a non-empty known list, and KI-2 was the only entry. J450 widened R12 to that one line, which this
  round changed (see 'Declared verdict change'). Nothing else of M0-k-04's changed: its run record
  `docs/build/summaries/M0-k-04.json` stays as it is (REPORTED to M0-k-04's next touch, row N-2 above), the header of
  `test/runner/constructive.test.ts:8` naming KI-2 stays N-s2-1 (M4), and note 8's residue case stays REPORTED (N-s2-2).

### Declared verdict change (ruling J450, R12 widened; choices C-0402)

One line of M0-k-04's `bench/test/fuzz-bar/entry.test.ts`, line 94, in 'a whole toy run: the counts report, the
numbers-only summary (the same bytes twice), the bar decided'. It pinned the then-current state (KI-2 the one known
finding), not a contract.

* Before: `expect(s.constructive.known.length).toBeGreaterThan(0);`
* After: `expect(s.constructive.known).toEqual([]);`

The known list is empty after N-2. A future known finding re-asserts its own entry by name. Evidence: on this round's
tree the old line is red (the first RELATED run above, "expected 0 to be greater than 0", the only red of 1 950) and the
new line is green (the re-run above). No other line or file of M0-k-04's changed in this step. The landed tool refuses
the two extension files (`packages/testkit/src/invariants/constructive.ts`, `bench/test/fuzz-bar/entry.test.ts`) as
outside M0-k-02's owns; the parent's landing names them. The busy-list entry reads 'M0-k-02 (+
testkit/src/invariants/constructive.ts, bench/test/fuzz-bar/entry.test.ts)'.
