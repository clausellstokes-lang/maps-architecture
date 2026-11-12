# Q181 — rule 3 (b)'s run test: the ruling seat's draft (2026-11-12). NOT RULED, NOT BOUND.

Queue row Q181: a chain removed in two steps along a run it shares leaves a vertex on the other chain for ever, because
§2.2 rule 3 (b)'s flag step compares whole row sets where its own sentence speaks of "a run it split".

| file | what it is |
|---|---|
| `ruling-draft.md` | the draft: the amended test, why "at least one row in common AFTER the batch", the proof in a patched mirror (the forms, the kernel folders, a 3 000-sequence fuzzer), the kin, how it lands, the weak points |
| `patch.diff` | the amendment itself: one function of `plat/packages/kernel/src/tx/relevel.ts` |
| `line-fold.json` | option F: the rule as ONE added line (LINE 8) of leg 2 of the merged RQ2 round, with the edits to that leg's lines 1 and 7 and to amendment ab |
| `spec-a06-s11.json` | option S: the same line as its own round, M0-a-06 S11, after the RQ2 round |
| `rq2-emulation.diff`, `probes/`, `tests-*.log` | the seat's scratch emulation of the RQ2 maintenance rule, its probes and logs (the two fuzzer logs are cut to their heads and tails here) |

WHAT THE DRAFT FOUND: the amended rule fixes every form of Q181 (and a third the session suspected); its only red in the
kernel's tx, insert, faces, arr, warp and invariants folders is ONE test that pins the old narrowness
(`test/tx/removals.test.ts` N-19); it must NEVER land before the RQ2 round's `shape` row (without the row it can
dissolve a chain's own point that landed on another's run: 13 of 3 000 fuzzed sequences; with the row emulated: 0).
The seat recommends F.

WHAT IS OWED BEFORE ANYTHING BINDS (the managing session, J631 (2) (a)): an adversarial review of the draft; a
measurement of the patch's REACH outside the kernel's own folders (does any stage output, root or pinned figure of M0
move under it — if so the fold turns a round that moves nothing into one with a declared shift, and option S is the
cleaner landing); then the session's ruling between F and S.

Side findings for the queue (not part of the ruling): a THROW (`tx: a run has route vertices at its own level`) where a
stretch of an L1 chain ends at an L2 vertex on its route — on the head too, 136 of 3 000 fuzzed sequences; a finer
chain crossing a coarser one keeps its vertex for ever once the coarser is removed (K3); a run whose two sides stand at
different levels before the batch stays open (F5).
