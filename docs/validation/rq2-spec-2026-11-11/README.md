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
