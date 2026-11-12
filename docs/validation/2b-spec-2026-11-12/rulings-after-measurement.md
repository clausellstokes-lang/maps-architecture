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

## After the reviewer's second pass (`review/review-2.md`; 11:00Z) — P′ stands as the DIRECTION and is NOT yet bindable

The reviewer would bind P′ as the direction, not on the rulings above: one blocker, nine majors.

* **S-1 (BLOCKER) — ACCEPTED.** P′'s commit is P's commit: S9 still hands the door X's outline. The rise the measurement
  found under P in the B-FUZZ bands population (the commit's 'replays' refusals 5 → 15 and 1 → 29: "no route … keeps
  clearance within the fidelity bound") is therefore P′'s too, and a lay read would refuse on the same outlines. The
  table's "no refusal" for P′ is true of the CITY runs only. The measurement seat has been told to run that population
  under P′, to DISSECT the refused pieces, and to test whether X's outline brought to the arena's resolution by a pure
  rule (vertices nearer than minEdge merged; parts thinner than the attraction distance removed) lays. THE REMEDY IS
  RULED BEFORE THE LAUNCH, never in a fix round: either such a rule, stated and pinned, or a different hand-over to the
  door. Until then nothing of P′ binds.
* **S-5 — ACCEPTED; ruling 3's "no contract changes" is WITHDRAWN.** P′ REVERSES the core of the decision the owner
  holds under item 991 (b) — "`kerb(F)` is §3.7's definition computed exactly on the kerb state, the construction's
  arena-attracted read being its oracle": under P′ the kerb SERVED is the door's lay of the exact outline, and the exact
  region is ITS oracle (they differ only by parts thinner than the attraction distance). The second half of 991 (b)
  stands (the S8 ≡ S9 contract as KI-13 states it, the ratchet 0.91 and the target 0.95 — measured 0.973 – 1.000). Item
  986 (c) (the kept state, the derived children) is not built; 986 (e) (1) – (3) are unmet or moot. The amendment item
  withdraws or re-declares each by name, and the owner is told in these words: the decision accepted on 2026-10-28 is
  reversed in its core, for measured reasons. The architecture's sentences are worded as the reviewer proposes ("the
  same engine"; "one face wherever the arena beside the face is the same at the commit"), not claimed to stand
  literally; GEO-9's exception reads: an exact boolean writes no arena and no caller receives its output; every kerb
  served or committed is that outline as `insertChain` lays it.
* **Accepted as requirements of the round** (each with its pin): S-2 — on a face the read-back classes `whole` the read
  returns F's own L2 child ring, never X; S-3 — a face with no owner is laid under a placeholder entity (`kerb()` stays a
  general service); S-4 — the lay leaves NOTHING behind and the check must see more than the arena's bits: the batch's
  work charge and its distance to the work limit, the shell's `failed` / `closed` state and journal, the open-transaction
  set, `CLOSINGS` and `CENSUS`, and M0-a-06's frame classes (a lay frame is a dry-run frame); S-6 — pins on the L2-content
  dependence (a neighbour district's kerb on a shared seam; the other faces of one S9 batch), `kerb()` equal on a
  slot-renumbered and on a decoded arena, and a queue row on the order M1 commits districts in; S-7 — the kerb-caused
  'unresolved' rungs of S8 counted per seed, FAILING if above the base, and the faces whose lone lay refuses while the
  district's commit succeeds (and the reverse) REPORTED one by one; S-8 — a FAILING bar that a laid kerb differs from X
  only by pieces thinner than the attraction distance (S8 ≡ S9 alone compares the lay with its own commit and cannot
  see a wrong read-back); S-9 — the lay is handed the read, X computed once; S-10 — the lay's home and the
  kernel-boundary rows are designed before the launch (kerb.ts and bandUnion.ts both stand at their caps; a cycle
  between them; a registration import would be shaken out of the bundle).
* **One round or legs:** one round on M0-a-09 for the code; legs expected on M0-a-06 (the frame classifier; a tx view
  if the dry-run shell cannot carry the engine) and possibly M0-a-05 (if the remedy of S-1 is the door's).

## The blocker's remedy, measured (`measurement/step9-replays.md`; 11:50Z) — the design is P′ WITH A RESOLUTION RULE

The measurement seat ran the B-FUZZ bands population at one seed under BASE, P, P′ and P with three pure "resolution"
rules applied to X before it is served and laid, and dissected the 37 networks that P and P′ refuse and BASE commits.

* **S-1 confirmed, and its cause is what the reviewer said.** Under P′ the commit's refusals are P's (corridorUnion 15,
  bandUnion 29 'replays'), and 9 LAY READS refuse where the construction's read refused none. In 36 of the 37 rising
  networks the refused piece is sub-resolution: a vertex within the attraction distance of the face's boundary (32), a
  component thinner than the attraction distance (32), an edge under minEdge (29), a spike tip (18); smallest feature
  1.7 – 13.4 cm in 33.
* **Rule (b) — components thinner than the attraction distance removed and spikes eaten from the tip down to where they
  are 26 cm wide — brings the class BELOW the base:** networks refused 8 (BASE 34, P 45); all insertChain refusals 7
  (BASE 32, P 44); the commit's 'replays' 4 and 3 (BASE 5 and 1); committed networks 9 996 and 1 999 (BASE 9 984 and
  1 987). Rule (a) — vertices nearer than minEdge merged — halves the class but makes rings cross (5 own refusals);
  (b) then (a) is no better than (b).
* **What rule (b) leaves** (3 networks): two where X's vertices stand 3 – 12 cm off the face's boundary (a rule that
  puts such a vertex ON the boundary was not tried); one that is NOT a resolution problem — `bandUnion` at L3 over a
  kerb `corridorUnion` has just committed at L2: the band's piece converges on that L2 edge at a shallow angle, X does
  not read L2 content, and the construction's L3 read was attracted to it. A missing input, to be designed.
* **The reviewer's counts at the harness seeds** (P′ with the read-back fixed): no face is read back `whole`; no lay
  read refuses; S8's kerb-caused 'unresolved' rungs are 0 under BASE, P and P′; every lay read that differs from X
  differs only by pieces thinner than the attraction distance (0 of 2 747 and 0 of 3 132 with a thicker piece). In the
  B-FUZZ population one network has a lone lay refusing while the district's commit succeeds, and eight the reverse.

RULED (provisional, vetoable, for the re-draft and the reviewer's third pass): **the round is P′ WITH A RESOLUTION RULE
R** — what is served is the door's lay of R(X), what is committed is R(X) through the same door; R is a PURE rule on
X that removes what no arena can hold (parts and wedge tips thinner than the attraction distance; vertices within the
attraction distance of the face's boundary and not on it) and nothing else, stated in the architecture's terms, with
its own pins and a failing bar that R(X) differs from X only by pieces thinner than the attraction distance. Its exact
definition (the prototype's spike-eating does not cut a long wedge between two long edges; whether it is an opening;
what happens to a hole that becomes thin) and the L3-over-L2 input are DESIGNED in the re-draft, measured on the same
population (the refusal classes at or below the base's, class by class), and attacked before anything binds.

## The re-draft (`v2/design.md`, `v2/spec-2b-v2.json`; 12:25Z) and the session's provisional rulings on its open questions

A spec seat re-drafted the round on the lay-planned read with a resolution rule: fifteen lines, every review finding
answered (its section 10), the rule R defined, the lay's kernel form designed, the contract text written, a measurement
request for the rule as defined. Nothing binds until that measurement is in and the reviewer has made its third pass.

* **A1.1 – A1.3, the rule R — ACCEPTED AS THE CANDIDATE, to be confirmed by the measurement.** R is the fixpoint of
  three steps on X and F's own ring: S, a vertex within the attraction distance of F's boundary and more than 1 cm off
  it is put on it (on a route vertex of F within reach, else on its rounded foot), kept only if no ring becomes
  non-simple or crosses another; P1, a component with its holes, or a hole, that holds no disc of diameter `attractCm`
  — its erosion by half the attraction distance with §3.7's own buffers is empty — is removed; P2, a spike tip is
  dropped (its two neighbours nearer than `attractCm` to each other, itself farther from their line than they stand
  apart, their triangle holding no other vertex). It is stated in the door's own vertex terms: it keeps what the door
  holds (a 30° block corner; a long shallow wedge whose sides carry no vertex within reach of each other) and removes
  what the door folds or refuses. The opening by a disc and the clip at the width station are REFUSED: each removes
  geometry the arena holds (every convex corner rounded; 48 cm cut off every 30° corner).
* **A2.1, the lay's transaction — K2 PROVISIONALLY** (a transaction-shaped VIEW made in bandUnion.ts, never minted: the
  batch's frames and index shared; work, `failed`, `closed`, journals and log its own), because the engine meets the
  open set only in a read the lay is handed, and because `rollback` restores neither `work` nor `failed` — so the lay
  must charge something that is not the batch. THE REVIEWER IS ASKED TO BREAK IT; if an object typed as an open
  transaction must not be made outside tx/, K1 (a minted dry view in tx/, a NO-SHIFT leg on M0-a-06) is taken.
* **A2.2:** `kerb()` returns the lay's warnings. **A2.3:** the boundary rows are accepted as counted (one new row,
  three raises by one, two rows removed) — the ratchet shows real uses; no indirection to hide them.
* **A3.1:** the order M1 commits neighbouring districts in is a queue row at the binding. **A4.1:** the L3 read takes
  the coarser content inside F into R's boundary set if the measurement shows that network commits and no other moves;
  otherwise the network is a declared class and M1's row (no M0 stage lays a band at L3).
* **A6.1, the share bar:** FAILING — the harness's existing floor 0.95 and `beyond` 0 on every seed run; and every
  block that is exact under the base and not under the tree LISTED WITH ITS CAUSE (an unexplained one fails) — rather
  than "not below the base's" as a bare number, which a correct build can miss by one block.
* **A6.2, the B-FUZZ bar:** FAILING — no network the base commits is refused, and per operation the refused networks
  are not above the base's; the cause classes REPORTED (a network the base refused as 'displaced' keeps being refused
  under another cause string: F1-1).
* **A7.1:** one round on M0-a-09 with session seams under K2, if the measured red list stays within 10 files and 3
  owners outside the folder; legs otherwise. **A7.2:** the round number is keyed at render.
* **The contract text (v2 section 6)** is taken as the basis of the amendment file; its paragraph for the owner is the
  form in which the reversal of item 991 (b)'s first clause is put to the owner.
* Also taken: a refused kerb read silently passes S8's needle floor (bentCutFabric.ts :938) — counted and REPORTED by
  the round, and a queue row for M0-b-03's fabric round.
