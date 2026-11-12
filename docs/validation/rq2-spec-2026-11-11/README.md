# The merged RQ2 round — its spec in the making (J757, J775), 2026-11-11

The round M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15 brings the kernel-internal vertex role `shape` into M0 and closes
the queue rows Q76, Q78, Q79 and Q95. It launches after M0-a-05 S14 has landed. NOTHING HERE IS BOUND: the three
entries are not in specs.json, and the rulings are provisional until the adversarial review returns (J631 (2) (a)).

| file | what |
|---|---|
| draft.md | the spec seat's draft: its findings, the lines of each leg, the clause text, the design text, the persisted-format consequences, the open questions and its own weak points |
| spec-a02-s4.json, spec-a06-s10.json, spec-a05-s15.json | THE THREE ENTRIES AS THEY WILL BE BOUND (4, 7 and 6 lines): the rulings and the review's changes folded in, no open marker left; their one placeholder is the measured list (R15) |
| draft-v2.md, changes.md | the fold: every line of each leg as it now stands with the design text's final wording, and one row per change with the finding or ruling it implements ('Could not be folded' at its end — ruled at J777) |
| v1/ | the three entries as first drafted |
| rulings-final.md | THE SESSION'S RULINGS AFTER THE REVIEW (R1 – R17, J776): what binds the three entries |
| rulings-provisional.superseded.md | the provisional rulings the review was run on — replaced by rulings-final.md |
| review/ | the adversarial review (review.md: twenty findings, a section per attacked area, the numbered changes, and a 'Follow-up' on the session's refined rule) with its probe scripts and their logs |
| shape-count.mjs | the session's counting probe: on M0's pipeline arenas, the live vertices that are split, unpinned, of degree 2 between identical rows of two or more keys — an upper bound of the rows leg 3 would write |
| rq2-measure.sh, rq2-base.sh | J757's measurement as run in the session's container: the registry's version raised to 2 with the `shape` row appended, the whole suite one test folder per unit at reduced strength; then every red unit again on the unchanged tree |

What a successor does with it: the entries are folded and the design text is written (docs/AMENDMENTS-2026-11-11ab.md,
items 997 – 1006). The measured list is FINAL and in each entry (J779; measured/: 83 folders, nine red, ONE the raise's —
test/arena/roles.test.ts's three tests, which leg 1 re-pins itself; no seam is owed for the raise). What is left
before the launch: (2) wait for M0-a-05 S14's landing, re-read leg 3's cites on that head and
re-key leg 3 if S14 ran fix rounds; (3) append the three entries to specs.json's rounds; (4) launch ONE child for the
merged round (launch-DI.md is the model), build opus/high, the three closing checks fable/high.

## The counting probe's reading (shape-count.mjs on the merged tree 55042d29; five CITY derivations, the END state)

| derivation | live vertices | with the split flag | in the class (split, unpinned, degree 2, identical rows of two or more keys, no vertex row) | what they are |
|---|---|---|---|---|
| relief-60 default seed 1 | 12 009 | 243 | 9 | all on L0 edges carrying `enceinte:1` (a level-1 row) beside the river's two bank rows: the wall on a bank |
| relief-60 default seed 2 | 7 995 | 134 | 0 | |
| relief-60 default seed 3 | 9 244 | 177 | 0 | |
| relief-3000 default seed 13 | 7 574 | 132 | 1 | an L1 edge carrying `way:0`, a seam and `enceinte:1` |
| relief-3000 default seed 4 | 8 401 | 149 | 0 | |

So the class leg 3 guards DOES occur in M0's pipelines (the wall on a bank, as RQ2 predicted), in some cities and a
handful of vertices each: ten in five cities. Leg 3's content shift is therefore real but narrow — the roots and
prints of the cities that hold such vertices move, the others do not. The count is an upper bound read on the end
state (it cannot tell a chain's own point from a leftover), and today each of these vertices is unguarded: a
later chain attached there and removed would dissolve it.

