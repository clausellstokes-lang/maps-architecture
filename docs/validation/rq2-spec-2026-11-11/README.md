# The merged RQ2 round — its spec in the making (J757, J775), 2026-11-11

The round M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15 brings the kernel-internal vertex role `shape` into M0 and closes
the queue rows Q76, Q78, Q79 and Q95. It launches after M0-a-05 S14 has landed. NOTHING HERE IS BOUND: the three
entries are not in specs.json, and the rulings are provisional until the adversarial review returns (J631 (2) (a)).

| file | what |
|---|---|
| draft.md | the spec seat's draft: its findings, the lines of each leg, the clause text, the design text, the persisted-format consequences, the open questions and its own weak points |
| spec-a02-s4.json, spec-a06-s10.json, spec-a05-s15.json | the three entries in specs.json's form, as drafted (the rulings are folded in after the review) |
| rulings-provisional.md | the session's provisional rulings on the draft's fourteen open questions, and its additions A – E |
| shape-count.mjs | the session's counting probe: on M0's pipeline arenas, the live vertices that are split, unpinned, of degree 2 between identical rows of two or more keys — an upper bound of the rows leg 3 would write |
| rq2-measure.sh, rq2-base.sh | J757's measurement as run in the session's container: the registry's version raised to 2 with the `shape` row appended, the whole suite one test folder per unit at reduced strength; then every red unit again on the unchanged tree |

What a successor does with it: read rulings-provisional.md first; if no review file is beside it, run the
adversarial review again (the brief is ledger row J775's); fold the rulings into the three entries; write the
design text (draft.md (c)) into docs/ARCHITECTURE.md as an amendment; bind the entries in specs.json; launch after
M0-a-05 S14's landing.

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

