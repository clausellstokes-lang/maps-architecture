# The RQ2 merged round — the session's rulings after the adversarial review (2026-11-11; J776)

The round: M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15 on one tree (J757). The draft is draft.md; the review is
review/review.md (its findings F1 – F20 and its section 'Follow-up'). The provisional rulings
(rulings-provisional.md) are REPLACED by this file. These rulings bind the three entries once the measured list is
final (ruling 15) and M0-a-05 S14 has landed. Each is vetoable by the owner.

Throughout: e is an entity; "an other row" on an edge is an edge row whose entity is not e (one definition, used by the
write, the maintenance and both oracles — review follow-up 3; a river's shore and bank are one entity).

## The `shape` row

**R1 — where it is written.** At the chain's COMMIT, in `insertChain`'s `run` beside the knot rows — not at the landing.
RQ2's design sentence binds; its code consequence naming `applyLanding` / `ownShapeVertex` is set aside. If S14's head
rolls back an ok `run` (its pass 5), the write pushes its inverse into `ctx.undo` (F16: leg 3 checks this first).

**R2 — the write's predicate (W).** For each landed point v of the chain and each entity e among the chain's own
non-indexed rows: v carries VERTEX_SPLIT (pinned or not — F13); edge rows of e lie on EXACTLY TWO of v's incident
edges; and some entity f ≠ e has edge rows on BOTH of those two edges. Then `(shape, e)` is added at the chain's level
unless v already carries it. No test of the vertex's degree and none that the two row sets are identical. So: a chain's
end writes nothing; a join or leave vertex (the other chain on one side only) writes nothing; a point the chain visits
twice writes nothing; an own point landed on an EXISTING split vertex (a third chain attached there) writes its row; a
point with a rider on one side writes its row (review p2, p7: CONFIRMED on today's code with proxy rows).

**R3 — the maintenance (M), one rule for every writer** (replaces the draft's per-path strip, its StretchRef end rule,
the provisional ruling 8 and ruling B's 'report it' — F1, F2, follow-up 1 and 2). In tx (M0-a-06's own files): in
`rewriteRows` on every removal-type batch, before the dissolution step, for every vertex the batch touched that
carries `(shape, e)`; and at the commit of ANY batch for every vertex whose split flag the batch cleared (the log's
`unflagged`) that carries one:
- (M1) e's edge rows are not on exactly two of the vertex's incident edges → the row is stripped;
- (M2) else the vertex does not carry VERTEX_SPLIT after the batch's flag steps → the row is stripped;
- (M3) else the vertex has exactly two incident edges and no other row is on either → the row is stripped AND the flag
  is cleared: the vertex is e's own shape vertex, and the arena equals e inserted alone;
- (M4) else the row is kept (the other chain still there on a side, a rider, a crossing chain at the vertex).
Why M3 asks degree 2 (follow-up 1, CONFIRMED): with a chain D crossing at the vertex when the shared chain A leaves,
clearing the flag would leave the vertex on D for ever once C goes. Why M4 keeps the row there (the session's addition
to follow-up 1): with the row stripped and the flag kept, D's later removal would dissolve C's own point; kept, M3
settles it when D goes, and M1 with the flag when C goes.

**R4 — the pin rule.** `shape` rows are excluded as knot rows are (tx/relevel.ts `rewriteRows`' `nonKnotLost` /
`left`). PIN-SHAPE2 is restated (F6): a pinned vertex carrying ONLY `(shape, C)`; a batch strips the row; the pin is
kept — red on the base.

**R5 — the entity.** One row per distinct entity among the chain's own non-indexed rows that meets W.

**R6 — callers naming `shape`** are refused as a programming error: insertChain's `knots` (leg 3) and removeEdges'
VertexRef (leg 2). retypeEdges' `add` already refuses every vertex role (F14: no new check). splitThrough's `row` is
LISTED for M0-a-04.

**R7 — indexed? rank?** Not indexed; rank 56 = id; `since` 2.

**R8 — `VertexSig`.** No change at M0; a notes row for M2a (does a `shape` row make a vertex editable).

## The oracles (leg 3's own test support)

**R9 — the missing-row oracle** (`dissolvableProblems` extended; F15): a split-flagged, unpinned, degree-2 vertex whose
two edges carry identical row sets with rows of two or more entities, and which carries no vertex row other than
`shape` rows, is a problem unless it carries `(shape, e)` for an entity e on both edges. Sound as an invariant on fuzz
arenas (follow-up (d), REASONED): a vertex it reports that is NO landed point is REPORTED with the op that made it,
for the session's ruling.

**R10 — the converse oracle** (ruling A, made exact): a `(shape, e)` row is a problem unless the vertex carries
VERTEX_SPLIT, e's edge rows lie on exactly two of its incident edges, and NOT (the vertex has degree 2 and no other row
on either edge).

**R11 — the family that reaches the class** (F3): leg 3 adds a generator kind `coincident-interior` to its own gen.ts
(a base chain; a chain of three or more points along one of its edges, the interior points within attractCm and away
from the edge's ends; then, in random order: a third chain ending at an interior point, inserted and removed; a chain
crossing at one; a rider along one side; the base chain removed; a StretchRef removal through or ending at a point; a
rekey; a retype `remove`; clearFiner), calling the tx writers from step3-5 as lifecycle.test.ts already does, both
oracles after every commit. W-OFF and MAINT-OFF are MEASURED red on it.

## R10 of J757 — the restore generation (Q76)

**R12 — its form** (F4, F5). Restores keep `+ 1` on an arena whose generation is ≥ 0. A COPY (compactSlots,
decodeArena) takes the next of a process-wide sequence of NEGATIVE tokens, right after `createPlat`; a restore on a copy
takes the next token. The value is OPAQUE AND PROCESS-LOCAL: compared by equality only; it appears in Stamp / Resolved
values and in debug assertion texts, and never in a record, print, digest, persisted value or golden. The stale-slot
message texts stay word for word (a copy's is pinned by pattern, `/restore generation -\d+/`, never literally). G-LATE's
pin asserts `levelDigestBuilds(q) === 1` after a read and after q's first commit; the draft's claim that `attachIndex`
keys state on the generation is dropped. LISTED for the seams and the queue: the `Stamp` doc in arena/resolve.ts, the
header of facade/stamp.ts, decodeArena's doc; and the wrong cause the two messages name for a copy.

**R13 — the scope loan.** Leg 2 writes one statement and its import in io/compact.ts `compactSlots` and one in
io/decode.ts `rebuild` (M0-a-15's files; S9's precedent: the lender's record re-landed by the session on
session/a06s10-scope-1). Three legs; a fourth for M0-a-15 was weighed and not taken.

## Q78 and Q95

**R14.** Q78: both the oracle test in tx and the design sentence, the sentence scoped to the writers the oracle covers
(F18). Q95: `changed` lists the re-parented children; DUP is replaced by OVER-LIST (every child of the freed record
listed, one whose parent did not change among them — an observable extra entry); the "every re-parented live record is
listed" oracle runs after every commit of M0-d-04's fuzz sequences (the same seeds, fuzzgen reused), B-1 its named case
(F7).

## The measurement, the shift, the format

**R15 — the measured list** (F11) binds only when every red unit of the version-raised run has been run again on the
unchanged tree at the same strength and labelled: the raise, the strength, or the head. Expected on the raise's list:
test/arena/roles.test.ts alone.

**R16 — leg 3's shift** (F9) is measured in the round: on the leg-3 tree the CITY seeds are derived, both oracles read
on their arenas — every class vertex WITHOUT a row is named and explained (whose op made it), an unexplained one
fails — and every moved CITY root is named by seed. The session's counting probes (the degree-2 class: 9, 0, 0, 1, 0
on five derivations; a loose degree-free bound of 48 – 70 per relief-60 seed, most of them crossings and T-junctions
that W does not write) stand beside it as estimates.

**R17 — old-version chunks** (F10, the provisional ruling 4). Leg 1's pin of a version-1 chunk under version 2 is the
byte format's reading, never a promise that an old cache's content is current. NOT this round: (a) decode refusing a
row whose role's `since` exceeds its chunk's version — a queue row for M0-a-15; (b) whether a cache written under an
older registry version may be used at all — a queue row for M1's loader (no M0 path keeps a chunk across versions).

## What goes to the queue, not into the round

- F8: a STRETCH of C that ends at a two-key own point, or a rekey cut there, clears that point's split flag (§2.2
  rule 3 (b) compares whole row sets), so once C's rest goes the point stays on A for ever. It predates the round. A
  queue row for a RULING on rule 3 (b)'s comparison (the rekey cut and the stretch end named). The round's design
  sentence and pins are scoped to a chain removed WHOLE and to a stretch's interior.
- The reverse order (C first, A along it later, then C removed): the point stays on A — N-13's canonical-form class;
  named in the design sentence's scope ("a chain inserted onto another's run").
- Three coincident chains with the base removed first: the rows and the flag stay (another entity still shares both
  sides) where a never-inserted base would leave none — the same class; a notes row.
- R17 (a) and (b); R12's message cause; splitThrough's `row` (R6); a kernel-side invariant for the converse oracle
  (M0-a-14's validator).

## The design text

The session writes the amendment into docs/ARCHITECTURE.md BEFORE the launch (draft.md (c) 1 – 9 as amended here:
(c) 1 reads "through which the chain passes once … whatever its degree", and gains "when no other chain's row remains
on either side and nothing else meets the vertex, the row is stripped and the flag cleared: the vertex is the chain's
own shape vertex"; (c) 4 names the strip doors; (c) 7 and (c) 8 are scoped to the transaction writers the pins cover).
