# M0-d-05b — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-d-05b (lane `check/M0-d-05b-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Neither finding below is a blocker:
the honest code paths give the right result, and each finding needs a deliberate writer or concerns a figure no bar
reads. The verdict and its evidence are in `checks/M0-d-05b.md`, with the closing round at the top. The first check's
own notes are the bullets of its *Notes (not failing)* section in that file; this file starts its own numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **Where the call's end probe sits is unpinned.** C-0190 (1) says the call's end probe fires "after the frozen result is built". Mutant F1g moves `probe(null, 'end')` before `carry.sort(…)` and the result's `Object.freeze` calls. It survives the item's 46 tests. The fake-clock tests count clock reads and check their order against the kinds' spans, so they cannot see work that moves outside the bracket after the last kind. The honest code is right: `match.ts` 612 is the last statement before `return`. The time involved (a sort of the carry events and the freezes) is small. | Add a test that hands `match` a probe recording the `carry` list's state, or a frozen-result check, at the call's end. For example: at `probe(null, 'end')`, the probe sees that the result the call will return is already frozen. A simpler alternative is a source check that `probe(null, 'end')` immediately precedes `return result`. | M4 (hardening) |
| N-2 | **A class with no re-derived entity loses its spans from the record.** `timeMatch` adds a kind's span to its class even when the kind has no re-derived old entity (C-0190 (3)). When the whole class has none, `perEntity(sum, 0)` gives 0, and that span is in no figure. On such a set, the classes' times do not add up to `callMs`. An example is a set whose overlap kinds all survive or are all fresh. C-0190 (3) states the figure as 0 with no entity. Its "the classes' times add up to the whole call" claim is tested on sets where both classes have entities. No bar reads the lost time, because no per-entity budget applies without entities. | State the exception in C-0190's wording at the next touch: the classes add up to the call when each has a re-derived entity. Alternatively, record the lost span as a separate `unattributedMs` per repeat. Pin either with the fake-clock test's no-entity case extended to one empty class. | M4 (hardening); or the timing phase's harness item (M0-t-00) if it reads the record |
| N-3 | **One property test still has vitest's default bound.** This note is from the closing re-check on WSL2 after F-5 (lane `check/M0-d-05b-close-r1`, L-0151). `assign.test.ts` line 128, "is independent of the input order (property)", has no explicit timeout. It took 673 ms at load 5.5 on 20 CPUs, which is about 2.2 s at F-5's 3.3× slowdown. It is not red now. C-0195 says no test of the item depends on wall-clock speed, and that is fully true only once this test has an explicit bound too. | Add `}, 120_000);` to the property test at the next touch. Alternatively, set a workspace-wide `testTimeout` in `plat/vitest.config.ts` through a choices row, which would cover every seat's whole-set and property tests. | M4 (hardening); or earlier if the flow's whole-suite run shows it near the bound |

## Consolidation round R5 (lane `build/M0-d-05b-consolidate-1`, flow-7, 2026-10-12; the builder's map and notes)

The round applies X-1 – X-5 (§1.5), the comment rewrite C-model-3 (§2) and §3.4's note on `model/test/match/` of
`plat/docs/build/consolidation/model-tables-plan.md` (J260, J263, J268 Q5). The row is C-0330. NO-SHIFT evidence (the
builder's scratch probe, run once on a mirror holding the tree as it was — every match file equal to the hashes of
`landed/M0-d-05b.json` before this round — and once on the round's code; the probe's output is one canonical JSON of
42 103 463 bytes, byte-identical before and after, sha256 `90d7373b…5a7129ac`):

* Exported names: the runtime names of `match/index.ts` (18) and of `model/src/index.ts` (67) are identical before and
  after. `match/index.ts` changed in its header comment only, so its type exports are unchanged too. The helpers the
  round adopts are file-level exports of `identity/lineage.ts` (`isU32`, `copyLineage`) and `match/geometry.ts`
  (`boxesMeet`), imported by path; no index line was added, removed or renamed (J263 Q1, J268 Q5).
* Outcomes: 3 000 seeded random scenes over all eleven M0 kinds (areas, points with regions, names, partitions and
  survivors, bridges on rivers, ways on junctions, districts and seams keyed by addresses and sets, ids mixing case,
  digits, an accent, a surrogate pair and prefixes of one another, both sides shuffled, the per-partition switch on in
  three in ten) give identical outcomes in order, `old`, `addressOf`, `handedOn`, carry lists, supersedes tables,
  counts, per-kind counts and fallback; the `rebind` of every old id and `liveSetOf`; every tombstone and carry
  lineage frozen. The synthetic sets (district at seeds 1 and 7, city 1, city-unrelated 2, metropolis 3) give
  identical counts, per-kind counts, carry lists and sampled outcomes; `timeMatch` on district 5 under a fake clock
  gives an identical record; 200 random box grids (4 000 queries, large boxes included) give identical candidates and
  `boxesMeet` verdicts.
* Refusals: a corpus of 37 malformed inputs (14 lineage forms on both sides, a duplicate id, no id, a kind with no row,
  a fractional point, `survives` on a fresh entity, a one-point spine, a key part of two forms, a zero-area ring) gives
  the same class and message text before and after, `match: the old entity junction:a's lineage is not two u32 lanes`
  included; `[2³² − 1, 0]` is accepted on both sides by both.
* Refusal count of the registered families (J264 (5)): 0 before and 0 after. The families are the item's tests at the
  PR size — `assign.test.ts`'s 10⁴ random anchor sets and its input-order property, `carry.test.ts`'s 200 random
  re-derivations, the synthetic sets at §6.3's sizes, `way.test.ts`'s IoU property and the new box-grid oracle's 300
  runs — where any throw fails the test.
* Refusals met in the probe's own corpus (N-58 classes): (a) the 37 malformed inputs above — input kind UNLAWFUL
  (not an entity of the routine's form), verdict REFUSE: a typed RangeError naming the field; no user reaches the
  routine's inputs through §11.4's doors (they are the stages' records). (b) 148 of the 3 000 random scenes, the same
  148 before and after, one class: `match: a fresh K names X, both a fresh provisional id and a survivor's address` —
  the scene gave a fresh entity a provisional id equal to a survivor's address and a later kind's fresh anchor named
  it. This is C-0188 (1)'s decided refusal (the reference is ambiguous between the survivor and the fresh entity),
  pinned by `assign.test.ts` "refuses malformed entities and inputs". Input kind: the caller's ambiguous reference;
  whether a lawful pipeline can produce it (a later kind's fresh anchor naming a fresh entity whose natural address
  equals a locked survivor's) is a question for the session's refusal census — note N-c1-2. The round changes no
  behaviour, so it leaves the class as C-0188 decided it.
* `identity/lineage.ts:14–15`'s sentence ("file-level exports the identity and matching modules share") is now exact
  for the matching module: `match.ts` imports `isU32` and `copyLineage`, `carry.ts` imports `copyLineage`, by path
  (M0-d-05a's check note N-c2-1). `isU16` and `isObject` are shared inside the identity module.

### Old file → new file map (J263 Q8)

No file merged, renamed or removed; every `describe` / `it` title kept verbatim (56 before, 57 after; the new one is in
`source.test.ts`).

| old (lines of the tree read on 2026-10-11) | new | what moved |
|---|---|---|
| `src/match/match.ts` 48 `cmpId` (private) | `compareKeys` from `'@plat/kernel'` at `byItemId`, the key set's sort, the two end pairs and the carry sort | X-1: one comparator, the kernel's; the header names it |
| `src/match/match.ts` 47 `isU32` (private) | import from `'../identity/lineage.js'` | X-2: the copy deleted; the lineage check's message unchanged |
| `src/match/match.ts` 567, 568, 574 and `src/match/carry.ts` 63 (the frozen two-lane cast) | `copyLineage` from `'../identity/lineage.js'` | X-2: one copy rule; `carry.ts` drops its `LineageHash` import, `match.ts` too |
| `src/match/match.ts` 50 `inverse`, `geometry.ts` 133 `div`, `timing.ts` 69 `perEntity` and 131 `shareOf` | the same bodies, each with a comment naming its kind, floor and refusal text | X-3 KEEP |
| `src/match/synthetic.ts` 41 `stream` (mulberry32) | the same body; the comment says it is the synthetic workload's own generator, not the model's RNG (§6.1), twin of `digest/workload.ts`'s | X-4 KEEP (Q3) |
| `src/match/grid.ts` 101 `meets` (private) | `boxesMeet` from `'./geometry.js'` at the three filters of `boxQuery` | X-5: the copy deleted |
| `src/match/index.ts` 2 – 3, `carry.ts` 5 and 52, `types.ts` 2 | the comments of C-model-3 | the scaffold and note narration replaced by the rule and its C-rows |
| `test/match/assign.test.ts` "writes a carry event only when …" | the same case plus a two-kind case: the carry list in old-id order across kinds | pins the carry sort (mutants X1d, X1e) |
| `test/match/assign.test.ts` "refuses malformed entities and inputs" | the same cases plus `[0, −1]`, `[0, 1.5]`, `[0, 2³²]`, `[1, 2, 3]` on both sides, message text pinned | pins lane 1 and the length (X2b, X2c) |
| `test/match/carry.test.ts` "resolveRef reads each outcome; liveSetOf …" | the same case plus the live set's lineages: equal to the old lanes, frozen, new arrays | pins `liveSetOf`'s copy (X2g) |
| (none) | `test/match/source.test.ts` "the routine's own box grid answers a box with exactly the closed boxes meeting it, ascending, large boxes included" | a closed-box oracle written in the test over 300 random grids; pins `boxQuery`'s three filters (X5a – X5d) |

`test/match/support.ts` stays the builders' home (§3.4); the oracles (the brute-force assignment's own `cmp`, the
closed-form IoU, the new test's closed-box test) are written in the tests, never with the code under test.

### Targeted mutants (J169, J183) — 25, one at a time in the mirror, `--maxWorkers=1 --bail=1`, on `packages/model/test/match`

| id | mutant | before the round's pins | after |
|---|---|---|---|
| X1a | `byItemId` descending (the K03 – K09 sort family) | killed | killed ("a nearer pair wins …") |
| X1b | `byItemId` → 0 (input order) | killed | killed ("coincident anchors resolve by id …") |
| X1c | a key set's parts unsorted | killed | killed (the key-anchored test) |
| K13b | the fresh way's end pair unsorted | killed | killed (`way.test.ts`) |
| K13 | the old way's end pair unsorted | killed | killed ("the end pair is unordered on both sides …") |
| X1d | the carry sort dropped | survived | killed (the carry-event test) |
| X1e | the carry sort descending | survived | killed (the carry-event test) |
| X2a | lineage lane 0 unchecked | killed | killed ("refuses malformed entities and inputs") |
| X2b | lineage lane 1 unchecked | survived | killed (the same) |
| X2c | lineage length unchecked | survived | killed (the same) |
| X2d, X2e | a carry event's `lineageFrom` / `lineageTo` swapped for the other side | killed | killed (the carry-event test) |
| X2f | a tombstone's lineage lanes swapped | killed | killed (the supersedes test) |
| X2g | `liveSetOf`'s lineage lanes swapped | survived | killed (the `liveSetOf` test) |
| X2h, X2i | the carry event on lane 0 only / always (the round-1 "carry events" mutants) | killed | killed (the carry-event test) |
| X5a | `boxQuery`'s cell candidates unfiltered | survived | killed (the new box-grid test) |
| X5b | `boxesMeet` open (touching boxes do not meet) | killed | killed (split covering test; the new test) |
| X5c | `boxesMeet` ignores y | survived | killed (the new test) |
| X5d | the large list never answered | survived | killed (the new test) |
| K25, K25b | a class divisor counts the other class's entities | killed | killed ("every millisecond of a call counts …") |
| F1a | the unprobed time dropped | killed | killed (the fake-clock tests) |
| X3a | `inverse`'s refusal dropped (`r.ok ? r.value : 0`) | survived | survived — equivalent: unreachable, `checkAnchors` refuses a radius below 1 cm and the box grid's divisors are ≥ 1 (its cell ≥ 100) |
| X4a | the synthetic stream's increment changed | survived | survived — X-4 changed no code; the synthetic sets' exact outputs are pinned by no test (their determinism by seed is) — note N-c1-1 |

Every new pin is green on the round's code and on the code as it was (the mirror ran the 47 tests on both).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | The synthetic sets' exact entities are pinned by no test: `synthetic.test.ts` checks the sizes and that a seed rebuilds the same set, so a change of `stream`'s constants (mutant X4a) passes. The sets are measurement fixtures (§6.3 *Budget*), and the round's probe shows them identical before and after. | Pin one digest of each set's entities at the next touch, if the timing phase wants its fixtures frozen | M4 (hardening) |
| N-c1-2 | The ambiguity refusal of C-0188 (1) (`match: a fresh K names X, both a fresh provisional id and a survivor's address`) met 148 of the probe's 3 000 random scenes, unchanged by the round. Whether a lawful pipeline reaches it (a later kind's fresh anchor naming a fresh entity whose natural address equals a locked survivor's) decides its N-58 class: LAWFUL or OUR OWN INTERMEDIATE would make it MAKE-IT-SUCCEED (for instance, read such a reference as the fresh entity, since a stage's fresh anchors name fresh entities), UNLAWFUL would keep it REFUSE. Reproduction: `assign.test.ts` "refuses malformed entities and inputs", the `junction:j` survivor case. | The session's refusal census (`checks/refusal-census.md`, N-58) classes it | M0 hardening (N-58) |

Gates of the round (2026-10-12, this machine, Node 24.12.0): install --frozen-lockfile 0; lint 0 (eslint 1146 files, 0
errors; `lint: probe-red ok`; 9 whole-tree checks); build 0; NEAR `packages/model/test/match` 6 files 47/47 green; the
model project 20 files 197/197 green; RELATED at PLAT_FUZZ_RUNS=1000 over the eight changed match sources (W=1, 8 186 s):
275 files, 3 297/3 298 tests. The one red is `testkit test/edge/standing.test.ts` "cell/river×frame at seed 1595424233"
(`expected 1 to be greater than 1`), the brief's known M0-e-03 s1 shift; it is red too in the mirror holding the match
files as they were, so it is not this round's. The round also gives `assign.test.ts`'s input-order property its
explicit `120_000` ms bound, as N-3 suggested at the next touch (no assertion changed); N-3 is closed by it.
