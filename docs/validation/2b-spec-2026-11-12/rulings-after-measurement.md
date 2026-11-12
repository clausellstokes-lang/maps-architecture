# Round 2B — the session's rulings AFTER the scratch measurement (2026-11-12 10:55Z; provisional until the reviewer has attacked them)

The measurement seat prototyped the served read three ways in scratch mirrors at the session's head with S20's files —
BASE (the construction, as today), P (the exact kerb X served as a pure function, the draft's design) and P′ (the
lay-planned read: X computed exactly, then laid by the commit's own engine in an undone dry run, the built blocks read
back) — and ran the fusion harness's S8 ≡ S9 comparison at the test size and at CITY. Its files are in `measurement/`
(`step3-s9.md`, `step3-r8.md`, `step4-bfuzz.md`, `step5-xxu.md`, `step6-cost.md`, `step8-pprime.md`; the two patches
`p.diff` and `pprime-full.diff`). Its whole-suite red list and its final report are still to come.

## What was measured

| | BASE (today) | P (X served) | P′ (X as the door lays it) |
|---|---|---|---|
| S8 ≡ S9 exact share, test size (four seeds) | 0.961 – 0.991 | 0.061 – 0.117 | 0.973 – 1.000 |
| the same at CITY (fusion 3; integrated 4) | 0.987; 0.989 | 0.060; 0.057 | 0.998; 0.999 |
| blocks BEYOND the bound (73.54 cm), CITY | 0; 0 | 171 of 1 254; 318 | 0; 0 |
| largest plan-to-commit distance, CITY fusion 3 | 28.9 cm | 229.6 cm | 3.6 cm |
| S8 refused districts / S9 refused unions | 0 / 0 | 0 / 0 | 0 / 0 (lay reads refused: 0 of 2 747) |
| served kerbs with an edge shorter than minEdge | 0 | 94 % of reads (12.9 edges a read) | (laid: the arena's own resolution) |
| B-FUZZ bands, one seed: the commit's 'replays' refusals | 5 and 1 | 15 and 29 (two classes RISE) | to be measured |
| ms a read / insertChain a read (source mode, CITY) | 38.8 / 37.2 | 4.77 / 0 | 15.3 (X 3.5 + lay 11.8) / 6.0 |
| S8 ms a cut (source mode, CITY fusion 3) | 98.0 | 21.0 | 42.2 |

WHY P FAILS THE HARD BAR: every block beyond the bound is THIN — X reaches a corner of the face through a NEEDLE (for
example 173 cm long and 4 cm wide at its base: the flat end of a strip meeting a width-less boundary edge 1.3° off its
line). By the definition with the flat-end rule the needle IS kerb; no arena can hold it (vertices within the attraction
distance merge; minEdge is 25 cm), and S9's commit folds it away. The Hausdorff distance reads the folded needle's
length. The same class explains S20's X against X_U column (step 5): sub-centimetre moves of a buffer's edge open or
close needles 1.6 m long; measured at witness points, X itself is on the wrong side of the definition by 0.4 – 0.9 cm in
depth across some of them. X is right to the lattice and unservable as it stands.

## Rulings

1. **P, AS DRAFTED, IS REFUSED.** It fails the hard bar (blocks beyond the bound), makes two refusal classes rise, serves
   edges below the arena's resolution on almost every kerb, and gives up "the plan equals the commit" on 94 % of blocks.
   The provisional ruling that chose it, and its first reason — that the construction stands beyond its own bound from the
   exact region on a fifth of CITY reads — are WITHDRAWN: those distances are the same needles, which the construction
   rightly never served.
2. **H (986 (c)'s kept state) stays refused**, for the reasons of the draft and the review.
3. **P′ — THE LAY-PLANNED READ — IS THE SESSION'S CHOICE** (vetoable by the owner): the kerb a caller is served is the
   exact region X(F) AS THE DOOR LAYS IT. `kerb(F)` (the service S8 plans on): X computed by the pure function; then, in
   the open transaction under a savepoint, the commit's own engine lays X's outline for that one face at L2, the built
   block faces are read back, and everything is undone. S9 commits the same X through the same engine. So the block S8
   cut and the block S9 keeps are one face BY CONSTRUCTION wherever the arena beside the face is the same at both times
   — the architecture's own sentences (§3.7 "the same function on the same inputs … one face", §4.6 and §13.2's
   contract test) stand AS WRITTEN, with the measured share above today's; no contract changes; the suspended ruling 5
   (the exact-0 floor withdrawn) is DROPPED.
4. **What P′ costs and what it does not reach.** About 2.5 times cheaper a read than today and 2.3 times cheaper a cut
   (source mode), not the 8 and 4.7 times of P. Amendment z's item 986 (e) (1) and (2) (a derived read within 50 µs; S8
   within 16 ms a cut) are NOT met by it; they were written for a design that the measurement refuses. The cost is
   REPORTED by the round and the budget re-declared with item 989.
5. **What the architecture text must say** (an amendment item written before the launch; the owner told in plain words):
   the kerb is defined once (§3.7, unchanged) and computed in two steps — its outline exactly, by a routine that writes
   no arena (the exception to "no second geometry engine ships": it produces an outline, never an arena output), then
   laid by the door, which brings it to the arena's invariants (attraction, minEdge, clearance). What is served and what
   is committed are both the door's lay. Item 986 (c)'s kept state and derived children are not built.
6. **What the round must provide in the kernel** (the prototype's three workarounds, stated as requirements): a
   kernel-internal form of the commit's engine that lays ONE face's outline at L2 inside an L1 batch under a savepoint
   (as the construction's dry run has its own shell at its dry level) and reads the blocks back; the lay's work charged
   to that shell, never to the caller's batch; nothing left behind (the arena's bits and state equal before and after —
   the prototype measured 0 changes on 378 faces and at CITY).
7. **Carried from the rulings after the review, unchanged:** the fold of the exact code into kerb.ts first (W2), its
   pin on the fold alone; `constructionRead` kept one round, debug-only, as the control; `offRead` retired with a
   re-read-equality pin (to be re-read under P′: the served read now depends on L2 content beside the face); the oracle's
   widths from the run's own table; every re-recorded literal outside the bands folder carrying the two-sided check;
   legs per owner if the red list passes 10 files or 3 owners.

## Open, for the reviewer and the measurement's last steps

* P′ reads L2 content (the lay meets it). At S8 time L2 is empty in the measured runs, so "a function of the key" was
  shown only there. What exactly must hold — and be pinned — for S8 ≡ S9 across a save and load, for districts committed
  in another order, and for the three sentences J742 names (the construction has the same dependence today)?
* The B-FUZZ bands population under P′ at one seed against BASE: does a lay read refuse where the construction's read
  did not; do the commit's refusal classes still rise?
* The red list under P′ (expected far shorter than P's: S8's outcome under P′ is close to BASE's — 1 203 cuts against
  1 207 at CITY fusion 3).
* Q152's six, and M0-a-06's three tx files that use kerb() as their dry-run generator (under P′ kerb() opens a dry run
  again).
* The needle itself: §3.7's flat junction end beside a width-less edge leaves a sliver that is kerb by the definition
  and that nothing can build. P′ never serves it; whether the DEFINITION should say so (the end rule) is a text question
  for the amendment item, not a build question.
