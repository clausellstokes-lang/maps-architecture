# The RQ2 merged round — the session's PROVISIONAL rulings on the draft's open questions (2026-11-11)

These bind only after the adversarial review (J631 (2) (a); J757 (3)). The numbers are the draft's, (f) 1 … 14.

| # | question | provisional ruling | where it departs from the draft |
|---|---|---|---|
| 1 | where the `shape` row is written | AT THE CHAIN'S COMMIT, in `insertChain`'s `run` beside the knot rows — not at the landing. RQ2's design sentence binds (a chain's own point landed on another chain's run it shares ON BOTH SIDES); its 'code consequence' naming `applyLanding` / `ownShapeVertex` was a prediction and is set aside: at a landing the chain's rows are not yet on both sides | as the draft |
| 2 | which own points | THE BROADER PREDICATE, closing the draft's gap inside the round: v is one of the chain's landed points; v carries VERTEX_SPLIT and not VERTEX_PINNED; EXACTLY TWO of v's incident edge pairs carry the chain's own row at the chain's level (the chain passes through v once); those two edges' row sets are identical and hold a row of another key. The DEGREE of v is not tested. So an own point landed on an EXISTING split vertex (a third chain B attached there) gets its row too, and B's later removal cannot dissolve the chain's point. A chain's END is never written (it does not pass through); a point the chain visits twice is never written (the own-overlap class is `ownShapeVertex`'s) | THE DRAFT wrote degree 2 only and carried the existing-split-vertex case as a notes row (history dependence). The review must attack the broader predicate against the degree-2 one |
| 3 | the kernel pin rule | `shape` rows are excluded as knot rows are (they neither keep a pin alive nor drop one); leg 2; the design sentence (c) 2 | as the draft |
| 4 | a version-1 chunk naming a version-2 role | not this round: a queue row for M0-a-15's next touch (decode refuses a row whose role's `since` exceeds the chunk's version, with its pin) | as the draft |
| 5 | R10's form | restores keep `+ 1` on an arena whose generation is ≥ 0; a COPY (compactSlots, decodeArena) takes the next of a process-wide sequence of NEGATIVE tokens, and a restore on a copy takes the next token too. Never on the Plat, never in an image, never persisted, never printed | as the draft — the review checks that no generation VALUE reaches any output, record, summary, log or message text |
| 6 | the entity of the row | one row per distinct entity among the chain's non-indexed rows that are on both edges | as the draft |
| 7 | the order of the strip | order-free: one `strip` set, one `rewriteRows` | as the draft |
| 8 | retypeEdges' `remove` | strips an entity's `shape` row on a vertex where the entity keeps no edge row on both of the two edges; leg 2, pinned | as the draft's (b) |
| 9 | callers naming `shape` | refused as a programming error: insertChain's `knots` (leg 3); removeEdges' VertexRef and retypeEdges' `add` (leg 2); splitThrough's `row` LISTED for M0-a-04 | as the draft |
| 10 | the stale-slot message texts | kept word for word | as the draft |
| 11 | Q78 | both: the oracle test in tx and the design sentence | as the draft |
| 12 | `VertexSig` | no change at M0; a notes row for M2a | as the draft |
| 13 | indexed? rank? | not indexed; rank 56 = id | as the draft |
| 14 | leg 3's content shift | measured IN the round (its LINE 5); before launch the session reads an upper bound with a counting probe on M0's pipeline arenas (shape-count.mjs: live vertices that are split, unpinned, of degree 2 between identical rows of two or more keys) | the probe is added |

## Added by the session (not in the draft)

A. **The converse oracle.** Leg 3's LINE 2 extends `dissolvableProblems` one way (a vertex of the class WITHOUT its row is a problem). The other way is added to the same line: a `shape` row on a vertex whose entity does NOT carry an edge row on two of the vertex's incident edges is a problem (an orphan row holds a vertex for ever). Run after every commit of the fuzz families, so a writer path that leaves an orphan is seen. A kernel-side invariant of the same reading (M0-a-14's validator) is a queue row, not this round.

B. **The other chain's removal.** With A the chain whose run was split and C the chain whose own point v stands on it: the draft pins C's removal (A restored exactly) and a third chain's. THE ROUND ALSO PINS A's REMOVAL WHILE C LIVES: what v then carries (the flag, the `(shape, C)` row) and whether the arena equals the arena of C inserted alone. If it does not, that is a finding the leg REPORTS with the print's difference — the session then rules whether the removal of the other key clears the flag and strips the row (a tx-side change in leg 2) or the difference is carried with N-13's canonical-form class.

C. **J757's premise is corrected.** The version raise alone moves chunk bytes and chunk refs; no level digest, root or content print reads the version. The session's measurement (the version raised with the row appended, the whole suite one folder per unit at reduced strength) reads red only in test/arena/roles.test.ts beyond the head's own reds; each red unit is being re-run on the unchanged tree at the same strength before the list is final. "Re-pin every root once" therefore applies to LEG 3's content shift alone, and only if M0's pipelines produce vertices of the class.

D. **Three legs with a scope loan stand** (leg 2 borrows one statement each in io/compact.ts and io/decode.ts, M0-a-15's files — S9's precedent); a fourth leg for M0-a-15 was weighed and not taken.

E. **The design text** ((c) 1 – 9 of the draft, amended to these rulings) is written by the session into docs/ARCHITECTURE.md BEFORE the round launches, as amendment ab, owner-vetoable, so the three closing checks judge the code against text that is in the tree.
