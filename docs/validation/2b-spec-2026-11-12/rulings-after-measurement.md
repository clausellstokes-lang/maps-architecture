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

## The re-draft (`v2/design.md`, `v2/spec-2b-v2.json`; 12:21Z) and the session's provisional rulings on its open questions

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

## After the reviewer's third pass (`review/review-3.md`; 12:31Z) — the round is SPLIT; R takes four fixes; K2 with a guard

No blocker; seven majors. The reviewer would not bind the re-draft yet, and neither does the session.

* **T-7 — ACCEPTED: THE ROUND IS SPLIT IN TWO, as 2A and 2B were.** ROUND A, NO-SHIFT (M0-a-09 S21): the fold of the
  exact code into kerb.ts; R and the lay built as kernel-internal functions NOT YET SERVED; X's and R's failures typed;
  the frame-side end rule (test-side); a SHADOW that computes R(X) and the lay beside the served construction at CITY
  and in the B-FUZZ population, with the roots unchanged shadow on and off. ROUND B, THE SHIFT (S22): the served reads
  switched, the construction debug-only with its control, S9's commit and `offRead`'s retirement, the L2 dependence's
  pins, the L3 read, the bands folder with Q152's six and B-FUZZ's kerb row, the declared shift with its measured red
  list, the CITY and B-FUZZ bars, the cost; the amendment text applied. Round A's tables — R and the lay AS BUILT —
  replace the prototype's as the evidence round B binds on.
* **T-5 — K2 KEPT, WITH A GUARD AND A RULING ON RQ4.** The lay's view is checked sound field by field on today's
  transaction. It stays in bandUnion.ts for round A, with (a) a pin that fails when the transaction type gains or loses
  a field (so a field M0-a-06 adds later cannot be shared unseen) and (b) THE SESSION'S RULING: the view is the ONE
  transaction-shaped object made outside tx/, a declared exception to "transactions are made only in tx/" (RQ4), for as
  long as M0-a-06 is the item of the merged RQ2 round and of Q181's round; M0-a-06's next round after those moves its
  constructor into tx/state.ts, built from an explicit field list (NO-SHIFT) — a queue row at the binding. A leg on
  M0-a-06 now would put this round behind two others for a constructor's address.
* **T-1, T-2, T-3, T-8 — R TAKES FOUR FIXES** (sent to the measurement seat as the variant to measure): S keeps a move
  only if the moved vertex's two edges meet F's own boundary nowhere but within 1 cm of it; a step P0 drops X's
  straight-through rounding vertices before P2, so that P2 judges a corner by the block's real corner vertices; thinness
  is stated with its tolerance (the erosion by half the attraction distance less two hot pixels and the round join's
  sagitta) and pinned on strips of 26 and 27 cm; P1's pre-filter takes the slack for holes and each hole belongs to its
  innermost enclosing ring. AND THE TEXT TELLS THE TRUTH (T-2): R does not remove "what no arena can hold and nothing
  else" — it also removes components that hold no disc of the attraction distance although the door could hold them
  (triangles with sides under about 45 cm), may cut an acute tip whose neighbours stand within reach, and along a way
  whose half-width is no more than the attraction distance it draws the kerb onto the way's centre line, in the plan and
  in the commit alike, as the door does. The amendment's sentences say what R removes AND what it adds.
* **T-4 — the widened family's dangling-tip network** (the base commits it; no rule so far cures it): dissected by the
  measurement; cured by R, or named as a declared class with its cause and a queue row — never left to fail the bar.
* **T-6 — ACCEPTED: the FAILING form of S8 ≡ S9** is `beyond` 0, the harness's 0.95 floor, and EVERY non-exact block
  classed from a closed list of causes each checked mechanically (another face of the same commit has a laid L2 vertex
  within the attraction distance of the difference; a neighbour district's kerb on a shared seam; a fold thinner than
  the attraction distance that the lone lay did not make) — an unclassed block fails. The contract sentence names those
  causes instead of "the arena beside the face", and the provisional A6.1 (blocks compared with the base's one to one)
  is dropped: the shifted trajectory gives no such correspondence.
* **The minors T-9 – T-13** are taken as written: the lint table gains the debug hook and the provider branch; GEO-9's
  sentence says "no stage and no façade caller receives it"; pins that can fail in place of pins that print; every
  refusal left under R classed by shape; and T-13 — a refused kerb read on a child PASSES S8's needle floor
  (bentCutFabric.ts :938), which is a wrong-result path, not a count: a queue row for M0-b-03's fabric round, "a
  refused child read refuses the cut".

NEXT: the measurement of R with the four fixes (B-FUZZ, CITY, the red list); then the spec seat re-drafts ONCE MORE as
two entries on these rulings and the measured figures; the reviewer reads the two entries; then round A binds — on
S20's landed tree.

## The rule R measured (`measurement/step10-R.md`; 13:49Z) — R IS DROPPED; the design under measurement is THE LADDER

The measurement seat built R with the third review's four fixes (R+) and ran it on the B-FUZZ bands population and at
CITY.

* **At CITY and the test size every bar holds:** the S8 ≡ S9 exact share 0.973 – 1.000 (above the base's on every
  seed), none beyond, no lay refusal, no 'unresolved' rung, every laid-against-X difference thin; 41.7 and 45.2 ms a
  cut (source mode) against the base's 98. R+ itself is idempotent and order-free on every read (0 of 143 400).
* **In the B-FUZZ population it FAILS the bar it exists for:** 20 networks that the base commits are refused (rule (b),
  the crude first rule, left 4). Two causes. (1) THE SNAP MAKES A NEW CLASS: where a dead-end, bent or ring way stands
  inside a face (an antenna of the face's own walk), S puts kerb vertices on it and the outline then ends on a dangling
  tip — 11 networks of the widened family, all committed by the base, by P and by rule (b). (2) THE DOOR REFUSES SHALLOW
  EDGE CONVERGENCES — an edge of the exact outline running 1 – 26 cm from the face's boundary or from another piece at
  under 10°, with no vertex near — and NO vertex rule reaches them (12 of the 13 refusals left in the main family). The
  exact erosion (P1) also keeps about half the thin components the crude 2A/P test removed, and the door refuses some
  of those. The L3 variant commits nothing more.

RULED (provisional, vetoable): **THE RESOLUTION RULE IS DROPPED.** Two designed rules and one crude one have now been
measured; each trades one refusal class for another, because what the door refuses is an edge-to-edge relation with the
arena's content that only the door computes. The remedy the measurements point to needs no new geometry:

**THE LADDER — the lay of the exact outline, with the construction as its second rung.** `kerb(F)`: rung 1, X laid by
the commit's own engine in an undone dry run (the lay-planned read, measured at 0.973 – 1.000); if the door refuses that
lay, rung 2, the construction's read of F — §3.7's original method, today's served read. S9's commit: rung 1, the engine
with the exact outlines; if the op refuses, it is undone and run again with the construction's reads. By construction
no network the base commits can be refused, and every network either method commits is committed (P and the base
refuse only 8 networks in common, against the base's 34). The construction therefore STAYS in the kernel as a rung — it
is GEO-9's own engine and the architecture's "pre-decided fallback" pattern — and is no longer "kept one round as a
control" (it remains the control too). What the ladder gives up: nothing of the measured plan ≡ commit at CITY (no read
and no op fell to rung 2 there in any P′ run); in the rare district where the commit falls to rung 2 after its faces
were planned on rung 1, the committed block differs from the planned one by what the construction differs from the lay
— to be measured (step 11) and stated. The measurement seat is running the ladder on the same population and seeds.

## The ladder measured (`measurement/step11-ladder.md`; 14:50Z) — THE LADDER IS THE SESSION'S CHOICE; its price is declared, counted and barred

The measurement seat built the ladder with no rule at all (`measurement/ladder-kerb.diff`, `ladder-bandUnion.diff`) and
ran it on the same population and seeds.

* **B-FUZZ, seed 20261112.** 9 997 main and 2 000 widened networks committed (the base: 9 984 and 1 987). It refuses 4
  networks, and the base refuses all 4: NO NETWORK THE BASE COMMITS IS REFUSED, and 30 of the base's 34 refused networks
  commit. No kerb read refuses. The second rung served 9 of 28 673 reads and 44 of 22 698 operations; 4 operations
  refuse on both rungs (two the construction's own post-conditions, two 'no route … keeps clearance').
* **The harness (four test-size seeds; fusion 3 and integrated 4 at CITY).** No read and no operation fell to the second
  rung at any seed, so the figures are the lay-planned read's: the S8 ≡ S9 exact share 0.973, 1.000, 0.983, 1.000 and
  0.998, 0.999 (the base 0.961 – 0.991); none beyond the bound; no S8 or S9 refusal; no 'unresolved' rung. Every
  non-exact block is listed with its cause and every difference is thin; four blocks the base does not list differ by
  one sliver 0.4 – 1 cm thick — the lone lay against the district's commit, a hot pixel apart.
* **Cost at CITY (source mode).** 11.95 ms a read (the construction 38.8); S8 34.5 ms a cut (the construction 98.0).
* **THE PRICE, measured (step 11 §3).** Where the two rungs differ inside ONE district the planned block and the
  committed block can differ beyond the bound by a NEEDLE. Over the 46 networks P or the lay refused: 44 faces in 13
  networks were read on rung 1 and committed on rung 2 — Hausdorff 0 on 23, at most 1 cm on 3, 1 – 73.5 cm on 16, and
  beyond 73.5 cm on 2 (299 and 514 cm); the reverse (a lone lay on rung 2, its district on rung 1) on 2 faces (0 and
  406.7 cm). EVERY difference piece is thin (44 of 44; 2 of 2: erosion by 13 cm leaves nothing). It was never seen at a
  harness seed.
* **The undo before the second rung.** Every refusal inside the engine's loop returns through the operation's own
  savepoint — except the work-limit exit (`overLimit` after `dropSpurs`), where the batch is doomed and the ladder takes
  no second rung (0 times in every run).
* **Under the ladder** Q152's six bands tests stay red with the assertions they show under P and the lay (each pins the
  construction's served read or a literal on the exact outline), and kernel/test/tx/savepoint.test.ts :425 is red (a
  kerb read now opens the lay's operation frames, not 'dry-run' frames; cost.test.ts and oracle.test.ts are green).
  The whole-suite red list under the ladder is still running.

RULED (provisional, vetoable; a change of a kernel contract — it binds only after the reviewer's fourth pass):

1. **THE LADDER IS ROUND 2B's DESIGN.** P is refused, H is refused, R is dropped (above); the ladder is the one design
   measured that clears every bar at once. The construction stays in the kernel as the second rung.
2. **THE PRICE IS DECLARED, COUNTED AND BARRED — never silent.**
   (a) *Counted.* The commit says which rung it took: `corridorUnion` and `bandUnion` report it in their result, and a
   `kerb(F)` read likewise — additive members whose names and standing under the frozen API the spec seat proposes and
   the reviewer attacks.
   (b) *Barred where the product lives.* At every harness seed M0 registers (the fusion and integrated families, test
   size and CITY) NO read and NO operation takes the second rung — a FAILING bar of the shift round. There `beyond` 0
   stands unqualified, with the 0.95 floor and the closed list of causes (to which 'the lone lay against the district's
   commit, a hot pixel apart: one sliver under 1 cm thick' is added, mechanically checked).
   (c) *Barred in the stress population.* On every face of every network of the B-FUZZ bands population, the mixed
   faces among them, every piece of the two-way difference between the face's served read and its committed block is
   THIN — erosion by 13 cm leaves nothing (the radius the measurement used; the 9.58 cm of the third review's T-3 fails
   its own strip pin) — a FAILING bar; and the count of mixed faces at the seed is pinned as a literal.
   (d) *Declared.* The contract's sentence: a planned block equals its committed block within the bound; in a district
   whose commit took another rung than a face's read, they may differ by pieces thinner than the attraction distance,
   of any length, and by nothing else.
3. **NO REPLAN IS BUILT.** Re-reading a district's faces on the commit's rung after a second-rung commit would need a
   read that can be told its rung — kept state, the objection that refused H. M0's pipeline counts second-rung commits
   in its S9 receipt (0 at every registered seed, pinned); if a registered seed ever shows one, the replan is the open
   alternative, with its own ruling. A queue row at the binding.
4. **The work-limit exit takes no second rung** (a doomed batch refuses as today) — pinned by a planted limit.
5. **The split stands.** Round A (no shift) builds the lay and the ladder UNSERVED and measures them as a shadow beside
   the served construction at CITY and in B-FUZZ (the figures above re-made by the build's own harness, the rung
   counts among them); round B serves the ladder, retires `offRead` as ruled, re-points or re-judges Q152's six and
   savepoint.test.ts :425 with the measured red list, and carries the bars of 2.

NEXT: the spec seat re-drafts as two entries on these rulings and figures (no rule R anywhere); the reviewer's fourth
pass reads them and this section; the measured red list under the ladder joins round B's entry when the suite ends;
round A binds on S20's landed tree.

## The third re-draft (`v3/`; 15:07Z) and the session's provisional rulings on its open questions

The spec seat re-drafted on the ladder as two entries — `v3/spec-a09-s21.json` (round A, NO-SHIFT, seven lines) and
`v3/spec-a09-s22.json` (round B, the shift, ten lines) — with `v3/design.md`, `v3/amendment-draft.md` and
`v3/open-questions.md` (seventeen questions and five places where the rulings above could not be made consistent).
This seat read the design note and the questions whole. Each ruling below is provisional and vetoable; the reviewer's
fourth pass attacks them with the entries.

* **Q1 — the rung reported: ACCEPTED.** `BandResult.rung` and `LastRead.rung` (through `kerbCensus(p)`), each `1 | 2`;
  additive members, no export name added; no warning code. Round A adds neither (NO-SHIFT).
* **Q2 — round A's rung counts in B-FUZZ: ACCEPTED** — failing BOUNDS first (second-rung reads ≤ 9, second-rung
  operations ≤ 44, refused on both ≤ 4, and each of the first two above 0), then the build's own values pinned as
  literals. A build that exceeds a bound lists every exceeding read and operation with its network and cause and
  leaves the line REPORTED for the session — the prototype shared the batch's journals and counted the replays, so a
  correct build may differ; a bound is never met by loosening a rung.
* **Q3 — the mixed-face literal: ACCEPTED.** Re-made over the whole population in round A and pinned at the build's
  count (46 is the expected value, not the literal). RULING 2 (c) IS CORRECTED: it reads "every face committed by
  `corridorUnion`" — a `bandUnion` commit has its own widths and owner and `kerb()` is not its read.
* **Q4 — a lay's own work limit: ACCEPTED.** It falls to the second rung like any other refusal of the lay (the limit
  is the view's; the batch is untouched). Ruling 4 concerns the BATCH's work-limit exit only.
* **Q5 — the first rung's work on a commit that falls to the second: ACCEPTED as proposed** — it stays charged (the
  work was done; hiding it would falsify the budget) and is REPORTED; pinned on a planted batch near its limit (the
  refusal typed, never a silent second rung on a doomed batch); a queue row at the binding for M1's work law (item
  989's re-declaration must cover both rungs).
* **Q6 — "every registered harness seed": ACCEPTED.** FAILING at the six seeds inside round B; the fusion gate's
  1 000-seed run counts reads and operations by rung as a FAILING item of the session's post-landing run, with a queue
  row for M0-c-06's summary to carry the counts.
* **Q7 — ruling 2 (c) is measured over 46 networks only, and a same-rung face already exceeds the bound: ACCEPTED.**
  Round A measures the thin bar on every `corridorUnion` face of the population BEFORE round B binds it. The base's own
  behaviour is part of the record: the construction's lone read against the construction's commit differs by 1 252 cm,
  thin, on one face of the widened family. If a THICK piece appears anywhere, the round stops at REPORTED and the
  session rules (a declared class of the base, or a defect of the construction).
* **Q8 — round A's debug switch: ACCEPTED, WITH A CONDITION.** Ruling 5's "beside the served construction" cannot
  re-make S8 ≡ S9 or the commit's ladder, which need the ladder served; the evidence round B binds on must be the
  build's own, not a prototype's. So round A may carry a switch that serves the ladder in a DEBUG run — honoured only
  where DEBUG_BUILD, absent from the production bundle and pinned so by the bundle's own test. THE CONDITION: it is
  state of ONE kernel instance (or one arena), set through a debug hook, never a module-level variable — two kernels
  in one process never see each other's mode, and a test that sets it cannot leak it. In round B the same switch
  serves the construction as the control.
* **Q9 — kernel/test/tx/savepoint.test.ts :425: ACCEPTED** — the session's seam on M0-a-06's `test/tx/support.ts` at
  round B's landing (one predicate: a frame opened by the lay is a dry-run frame; no assertion changed), not a leg —
  a leg would queue round B behind the RQ2 round and Q181's. The classifier reads the view's `op` tag once the view's
  constructor has moved into tx/.
* **Q10 — `offRead`: ACCEPTED; the earlier ruling is CORRECTED.** It is not retired: it is the second rung's alone
  (it cannot fire on the first — the exact reads cannot see the operation's L2 writes), so that the second rung is the
  base's commit byte for byte, pinned.
* **Q11 — the L2-content pins: ACCEPTED** as round B's line 3 states them (each asserts a classed cause), with the M1
  queue row on the district commit order.
* **Q12 — the boundary rows: ACCEPTED.** The session pre-authorises the rows of the named nouns in the named files
  (arr/kerb.ts: the `band` string and the `kerb` ident; arr/bandUnion.ts: the `band` ident, the `kerb` string and the
  `block` ident; arr/kerbExact.ts's two rows removed by the fold); the seat prints its counts; the session's seam sets
  the rows at each landing; any other noun or file STOPS the seat.
* **Q13 — Q152's six: ACCEPTED as tabled** (three re-pointed to the second rung, two re-judged, one both), the
  reviewer to check against M0-a-05 S14's verdict that group B's cause is not one the second rung still carries.
* **Q14 — the contract sentence: ACCEPTED; ruling 2 (d) IS CORRECTED.** As ruled it was false where both the read and
  the commit took the second rung (the base's own behaviour) and it named no cause where both took the first. It
  reads: where both took the first rung, a planned block equals its committed block within the bound, every inexact
  block by one of the closed list of causes; wherever either took the second rung, they may differ by pieces thinner
  than the attraction distance, of any length, and by nothing else.
* **Q15 — the construction is permanent: ACCEPTED and said plainly.** Its planned removal (after the re-profile) is
  WITHDRAWN; round B's bundle pin asserts its PRESENCE; the tx tests keep it as a dry-run generator wherever the second
  rung runs; item 989's budget carries its cost wherever the second rung runs (nothing at the harness seeds).
* **Q16 — the thin measure's lattice residue: ACCEPTED IN SUBSTANCE, ITS PINS CORRECTED.** The measure: a piece is thin
  when its erosion by 13 cm, computed with §3.7's own buffer parts, leaves nothing that holds a disc of 1 cm radius.
  By that definition a straight strip is thin up to 28 cm wide, so the pins are 26 cm thin, 27 cm thin (by the residue
  clause — said in the test), 29 cm NOT thin, and a 26 cm sliver that leaves a residue ring thin. The contract's
  sentence says "thinner than the attraction distance, to the lattice's tolerance of 2 cm".
* **Q17 — the round numbers: ACCEPTED** — keyed at render (S21 and S22 unless S20 or round A takes a fix round).

The five inconsistencies the seat names are these same corrections (Q8, Q14, Q3 with Q7, Q10, Q15). NEXT: the
reviewer's fourth pass on `v3/` and on the two sections above; the red list under the ladder into round B's entry
when the suite ends; then round A binds on S20's landed tree.
