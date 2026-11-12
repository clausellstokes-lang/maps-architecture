# Round 2B, third pass — the re-draft (P′ with the resolution rule R; `v2/design.md`, `v2/spec-2b-v2.json`) attacked

Review seat, 2026-11-12. Read: `measurement/step9-replays.md`; `rulings-after-measurement.md`, its last three sections;
`v2/design.md` whole; `v2/spec-2b-v2.json` (fifteen lines); `v2/probes/` (the spec seat's token probe and sketches). The code
was read on the working tree (design head) and on S20's branch. Runs: none in the prototype's mirrors. My one probe ran the
spec seat's own `v2/probes/tokens.mjs` (read-only) on its sketches: `probe-tokens3.log`, beside this file. The measurement of
R as defined (M1 – M5) is not in, so every figure about R is the design's claim, not a result. Labels: **CONFIRMED** (code
path read or executed by me), **PLAUSIBLE** (reasoned).

The re-draft answers every finding of my first two passes, and the measured remedy for S-1 is convincing in kind. What follows
are the places where R, K2, the contract words or the lines are still wrong, untested or unmeasurable.

## Findings

| id | sev | finding | evidence | what I would change |
|---|---|---|---|---|
| T-1 | MAJOR | **S's validity check does not include F's own boundary.** A snap is kept only if the ring stays simple, crosses no OTHER RING OF R(X), and keeps its area's sign. Nothing tests the moved vertex's two edges against B (F's route rings, spine centre lines included). Near a reflex route vertex of F, or where F's walk runs out and back along a dangling chain or a bridge (B's pinches), a snapped vertex's neighbouring edge can leave F or run along a spine. R(X) then serves and commits a ring crossing F's L1 boundary: a new refusal, or a block outside its face. No pin plants it, so every pin of line 2 passes a build without the check. | CONFIRMED by the pseudocode (design.md 1.3; spec line 2's text). PLAUSIBLE: the geometry at a reflex vertex or a bridge. | Keep a move only if the moved vertex's two edges meet B only at points within 1 cm of B (`chainCrosses` / `segmentsMeet` against B's edges, F's bridges excepted as `bridgesOf` reads them). Pin: a reflex corner of F and a dangling chain, each with an X vertex 20 cm off. |
| T-2 | MAJOR | **"R … removes what no arena can hold … and nothing else" and "§3.7: the kerb served omits …" are false as written, in three ways a later reader would rely on.** (1) **P2 cuts holdable corners.** Its test is \|orient2d(a, b, v)\| > \|ab\|² with \|ab\| < 26, which means apex angle < 53.1° and both neighbours within 13 / sin(θ/2) of the apex: up to 50 cm at 30°, 34 cm at 45°. X's own rounding vertices (step 3: vertex pairs 1 – 2 cm apart along strip edges, 12.9 edges under minEdge a read) put such neighbours beside acute junction corners. The design's admitted case (150 cm²) is the typical one, not a corner case. (2) **P1 removes components the door holds.** An equilateral kerb triangle with sides 30 – 45 cm has no disc of diameter 26 (its inradius is under 13), yet every vertex stands farther than 26 cm from the opposite edge. Harmless for blocks, but it falsifies "nothing else". (3) **S ADDS band to the kerb.** B holds the spine centre lines, so along a way with half-width ≤ 26 cm every kerb vertex is snapped onto the centre line: the served AND committed block overlaps that way's band. This is the door's own attraction (the design's wrong output (2)), but §3.7's "a block never overlaps a corridor it does not bound" is then false for such ways, and 6.2's text speaks only of what the kerb "omits". | CONFIRMED by algebra on the pseudocode; design.md 1.4 "wrong outputs" (1) – (3); step3-r8.md; ARCHITECTURE.md :5338-5341. | Reword R's definition and 6.2: R removes or absorbs pieces thinner than attractCm — the door's own folds — including corners of acute blocks decorated by rounding vertices, and the half-band of a way narrower than 2·attractCm. Before P2, drop X's straight-through vertices within the hot pixel (the ring rule's test), so corners are not decorated. That makes most of (1) disappear. |
| T-3 | MAJOR | **The thin-difference bar (line 2's property; line 14 (b), (c)) can fail a correct build at its edge.** S moves a vertex up to attractCm, plus up to 0.71 cm for the snapped foot. Two consecutive vertices 26 cm off a straight B edge therefore leave a difference strip up to 26.7 cm wide, whose erosion by 13 cm is a sliver that `exactRegion` keeps: my first probe showed it keeping sub-cm slivers. P1's own test has the converse error: §3.7's round joins are inscribed chords, so the buffer is undersized by up to ≈ 1 cm at a 13 cm radius. A thin component near a reflex corner then keeps a non-empty erosion and is not removed. | CONFIRMED: kerbExact.ts `exactTraceKept` keeps every area > 0 (review probe-island); buffer.ts :39-56 (inscribed chords), :78-91 (snap); stretch.ts `withinSegment` (inclusive). | State the bar with its tolerance: a piece is thin if its erosion by A/2 − 2·HOT_PIXEL_CM − SAGITTA_CM is empty. Use the same tolerance in P1, and pin a strip of 26 cm and one of 27 cm. |
| T-4 | MAJOR | **The B-FUZZ bar (line 14 (j), A6.2: no network the base commits refused) is predicted to fail on a known network the design never addresses.** Rule (b) left four refused networks the base commits: the two near-boundary ones (S is meant for them), the L3-over-L2 one (line 10), and the WIDENED DANGLING-TIP network ('outline: piece 0 of the face 3 ends on a dangling tip', which BASE commits; BASE's own widened refusal is another network). Section 1.4 says "rule (b) left three … S for two, section 5 for the third". The fourth has no remedy. Step 9 calls it not a resolution problem ("no piece near the point"). | CONFIRMED: step9-replays.md §2 table ("own refusals 1 (the dangling tip)"; "it leaves 3 (+ the widened dangling tip)"), step4-bfuzz.md (BASE's widened own refusal on another network); design.md 1.4. | Dissect it before binding. Either it is cured by R (M2 will show), or it is named as a declared class with its cause and a queue row, and the bar says so. |
| T-5 | MAJOR | **K2 is sound on today's `OpenTx`, but it is a fabricated transaction outside tx/, and nothing guards its future.** I checked every field. The view replaces `work`, `warnings`, `journal`, `log`, `failed`, `closed`, `op` and `level`. The undo log, handle table, index and frames are per arena or per batch and are restored through the shared batch frame (`markArena` snapshots counters, `handleCount` and `version`; `undoTo` checks `m.batch === t.batch`). The chain journal is keyed by object and is the view's own. `keptBelow` is read by no writer below `bandCore`, `stageRank` only by `rewriteRows`' stamp (undone), and no writer below it reads `spec.level`. So a lay leaves nothing behind today. But (a) tx/state.ts calls `markOpen` "the one place an OpenTx is minted" and `isOpenTx` exists to refuse "a fabricated shell" (RQ4, N-61 (4)); K2 is such a shell, made in M0-a-09's file. (b) The spread shares by reference any field M0-a-06 later adds to `OpenTx` (a per-batch set, a counter object), and the lay would then write the batch's copy with no pin to notice. | CONFIRMED: tx/state.ts :43-102 (fields; markOpen; isOpenTx's comment), :164-173 (chargeTx sets `failed` on the object it is handed); tx/frames.ts :304-337; arena/write.ts :819-836; arena/handles.ts :90-124; insert/stretch.ts :113-116; tx/relevel.ts :1040; grep for `spec.level`: none below bandCore. | Take K1 as a small NO-SHIFT leg on M0-a-06: `tx/state.ts` gains `export function layView(t: OpenTx, level: Level): OpenTx` (or `dryView`), which builds the view from an explicit field list beside the type, and `closeView(v)`. If the session keeps K2, add a pin that lists `OpenTx`'s keys (a type-level key list, compiled), so a new key fails the build until it is classed shared or own. The session must also rule RQ4's exception. |
| T-6 | MAJOR | **The contract clause "one face wherever the arena beside the face — the commit's other faces included — is the same at the commit" is an escape clause.** The other faces of a district are never "the same at the commit" as at a lone lay: at the lay they are absent at L2, at the commit they are laid. So the clause excuses every cross-face difference without a test. A6.1's FAILING form ("every block exact under the base and not under the tree listed with its cause") is not measurable as written either. The tree's trajectory shifts (1 203 cuts against 1 207), so base and tree blocks do not correspond one to one, and blocks non-exact under both runs are not covered. | CONFIRMED: bandUnion.ts `writeOutlines` :628-697, :715-721; step8-pprime.md (cuts and blocks per run); design.md 6.2. | FAILING: `beyond` 0 and the 0.95 floor; and EVERY non-exact block of the tree classed from a closed list of causes, each checked mechanically: (i) another face of the same commit has a laid L2 vertex within attractCm of the difference; (ii) a neighbour district's L2 kerb within attractCm on a shared seam; (iii) a fold thinner than attractCm the lone lay did not make. An unclassed block fails. The contract sentence names those causes rather than "the arena beside the face". |
| T-7 | MAJOR | **The round is too large to close in one check, and it shifts before R and the lay have been measured as built.** Fifteen lines are one closing check: a new rule with properties, a new engine form, the switch, the shift, about 40 mutants, CITY runs with the construction beside every read (≈ 40 – 55 min a seed ON by S20's T7), B-FUZZ base and tree, the bundles and the whole-suite red list. | design.md 8; S20 T7; step9. | **Split it as 2A / 2B were.** Round A (NO-SHIFT): line 1 (the fold), line 2 (R) and line 3 (the lay) as kernel-internal functions not yet served; line 7 (typed checks); line 11 (the end rule, test-side); a shadow that computes R(X) and the lay beside the served construction at CITY and in B-FUZZ (S20's method), with roots unchanged. Round B (the SHIFT): lines 4 – 6, 8 – 10 and 12 – 15. Round A's tables replace the prototype's as the evidence round B binds on. |
| T-8 | MINOR | **P1's area pre-filter is unsound for a component with two or more holes.** The proof needs the inner parallel curve at distance t to be no longer than the perimeter. Around a hole it grows by 2πt: for h holes, the length at distance t is at most P + 2πt·(h − 1). A thin component with two holes can then exceed (A + 1)·P and skip the exact test. Separately, "a hole's first vertex inside the outer ring" assigns a hole to every enclosing outer ring when an island sits inside a hole. | CONFIRMED by geometry (the offset-length formula for a polygon: −2·tan(τ/2)·t at a convex vertex, +ρ·t at a reflex one). | Slack term π·(A/2)²·max(0, h − 1); assign each hole to its innermost enclosing outer ring. |
| T-9 | MINOR | **The lint arithmetic of 3.5 is the sketch's and is right for it (CONFIRMED by re-running the seat's probe), but it omits two things the lines add.** Line 3 (3)'s debug hook typed with `BandResult` puts bandUnion.ts's `band` ident at 30, not 29. Line 5's provider branch in `kerb()` (`ok(r.value.kerb, …)`) puts kerb.ts's `kerb` ident back at 20, with no margin. | probe-tokens3.log; spec lines 3 (3) and 5. | Add both to the table, so the seat does not STOP on a count the session already knows. |
| T-10 | MINOR | 6.2's GEO-9 sentence "no caller receives its output" is false of `readKerb`. It is exported by path and returns R(X) unlaid: S9's engine and the tests read it. | design.md 2 (readKerb's result); bandUnion.ts :584-586. | "No stage and no façade caller receives it." |
| T-11 | MINOR | Line 9's pins (ii) and (iii) only print; they cannot fail. Line 4's reverse-order pin is trivial with L2 empty. | spec lines 4, 9. | Make (iii) assert that the difference is one of T-6's classed causes. Run line 4's order pin also on an arena that holds a committed neighbour. |
| T-12 | MINOR | **The door refuses more than vertex-near configurations.** Its refusal is "no route keeps clearance within the fidelity bound". That depends on existing content beside X's EDGES: the L3 network (no feature under 95.7 cm) is one case, and an X edge passing within minEdge of a route vertex of F with no X vertex near is another. R covers vertices only. | CONFIRMED: step9 §2 (the L3 network); design.md 1.1's premise. PLAUSIBLE: the second case at L2. | M1 / M2 class every residual refusal by shape. |
| T-13 | MINOR | F1-5 is a wrong-result path, not only a count: a refused kerb read on a child passes S8's needle floor, so a needle-making cut is accepted. Lay refusals exist (9 in B-FUZZ without R). | bentCutFabric.ts :938-939. | The queue row for M0-b-03 should say "refuse the cut", not only "count". |

## A. The rule R

**(1) What R removes that the door would hold.** T-2 (1) and (2). The admitted loss (P2 at a sharp corner with a rounding
vertex) is acceptable under the contract's thin-difference terms: the door folds the same tip, so the plan still equals the
commit, and the loss is under attractCm. But it is not rare (θ < 53° with neighbours within 13 / sin(θ/2)), and its cause is
X's own rounding vertices, not the corner. Dropping X's straight-through vertices within the hot pixel before P2 would let both
R and the door hold the corner. P1 removes small triangles with sides of 30 – 45 cm that the door holds. Harmless, but it
contradicts "nothing else".

**(2) What R leaves that the door refuses.** "The door refuses only vertex-near configurations" is not true of insertChain's
rule. A mandatory chain is refused when no route keeps clearance (vertex-to-edge, minEdge) within the fidelity bound, so long
shallow convergence of an X edge on existing content is enough: the L3 network is the measured case. A hole whose ring runs
beside the outer ring edge-to-edge folds (a pinch) rather than refuses where its end vertices come within attractCm. Necks
fold (measured at CITY). The residue is for M1 / M2 to class (T-12).

**(3) S.** Two vertices snapped onto the same route vertex: the second move is refused by `ringSimple` (it rejects any repeated
vertex, kerb.ts :2091-2096), so the vertex stays off B. A ring pinched to zero width: the area-sign test drops it. A hole
snapped onto the outer ring at a point inside an outer edge: `segmentsMeet` counts the touch as a crossing, so the snap is
refused and the vertex stays within attractCm of B, a door-fold case. S cannot move a contact that is already within 1 cm
(skipped), so a contact does not slide to a junction. But a vertex 2 – 26 cm off B and within 26 cm of J goes to J itself
(vertex first). The kerb then meets F at J. Where a way is narrower than 2·attractCm this is the half-band absorption of
T-2 (3). The serious gap is T-1. Order: moves are taken in lattice order, each kept if legal given the earlier ones. Two moves
legal alone and illegal together resolve to the lattice-first, a geometric and slot-free order. That is deterministic, not a
defect.

**(4) P1 and the chords.** T-3: undersized round joins keep a thin component near a reflex corner; snap rounding can remove
one holding a disc of 26 – 27 cm. Both are within 2 cm of the threshold, so give the test a tolerance. The pre-filter is unsound
with two or more holes (T-8).

**(5) Termination and idempotence.** The measure (vertices off B) + (vertices) never rises. S only moves a vertex from beyond
1 cm onto B, and the snapped foot is within 0.71 cm, so it counts as on B. P1 and P2 only remove, and dropping a vertex S put on
B lowers the count. So the loop ends. R(R(X)) = R(X) holds because a fixpoint re-entered changes nothing and the output is
canonical. CONFIRMED by reading.

**(6) Slot renumbering.** R reads X (canonical rings) and `f.rings` (canonical starts); every order is lattice order with
ring-order ties on canonical rings. Slot-free (CONFIRMED by the text). Line 9 (i)'s renumbered-copy pin covers the lay, which
is the part that touches slots (`readBack` walks slots, :868-872, but sorts its outputs).

**Verdict on R:** right in kind, and the measured rule (b) supports it. Bindable after T-1 (the B check), T-2 (the words, and the
straight-through pre-pass), T-3 (the tolerance) and T-8, and after M1 / M2.

## B. The lay's kernel form

K2 is sound on today's `OpenTx` (T-5 lists what I checked). The `finally` rollback undoes the arena and index through the
batch's frames even after a throw, since `undoTo` needs only `m.batch === t.batch` and an open batch. A nested lay is safe:
`kerb()` inside S8's needle floor puts its frame above S8's, LIFO, and the lay's engine never calls `kerb()`. The work limit is
the batch's declared one over the view's fresh work, so a lay can neither doom the batch nor be doomed by S8's earlier charges.
But nothing now bounds all of S8's lays together: the construction's shell had no limit either. REPORT the lay's work.

What T-5 asks: either K1, a minted view built in tx/ from an explicit field list (a small NO-SHIFT leg on M0-a-06; the only tx/
change I can name is that function and its close), or K2 with a compiled key-list pin and the session's ruling on RQ4. Of the
construction, `opSave` / `rollback` on the batch frame and `dryLevel`'s rule survive. `insertTx` and every parts/labelling
function go after the debug round, as 3.6 says. `kerb()`'s and `KerbRead`'s types are unchanged. `offRead`: S9's reads stay
R(X), which an L2 op cannot change (at L3, line 10 option (a)'s B reads levels below 3 only), so "it cannot fire" holds;
retire it.

## C. The contract words

T-6 (the escape clause and its failing form), T-2 (what R "removes" and what the kerb "omits"), T-10 (GEO-9's "no caller").
The 991 (b) treatment in 6.1 is right: the first clause is replaced, the second stands. 6.3 for the owner is fair. Its "about
two-fifths of today's time" is P′ without R, in source mode, with X computed twice, so say "about, to be measured".

## D. The lines

| line | a wrong build every pin passes | a pin a correct build fails | unmeasurable bar | order |
|---|---|---|---|---|
| 1 fold | none found | none | — | first ✓ |
| 2 R | S without the B check (T-1); P1's pre-filter with two holes (T-8) | the thin-difference property at 26 – 27 cm (T-3) | — | ✓ |
| 3 lay | a view sharing a future OpenTx field (T-5) | none found | — | ✓ |
| 4 switch | a lay that depends on read order when L2 holds content (the pin runs with L2 empty) | none | — | ✓ |
| 5 control | by design it cannot see the lay | none | — | ✓ |
| 6 shadow | none found | none | — | ✓ |
| 7 checks | a typed refusal that lands in the needle floor passes silently (T-13) | none | — | ✓ |
| 8 offRead | none found | none | — | ✓ |
| 9 L2 | (ii), (iii) only print (T-11) | none | — | ✓ |
| 10 L3 | none found | none | — | needs M3 |
| 11 end rule | none found | none | — | ✓ |
| 12 folder | a re-pin of a sub-8 cm difference listed UNJUDGED-THIN is never judged | none | — | ✓ |
| 13 shift | none found | none | — | ✓ |
| 14 bars | (d) "not below the base's" passes a correct build only by margin | (j) on the widened dangling-tip network (T-4); (b) at the threshold (T-3) | A6.1's base-to-tree block matching (T-6) | last ✓ |
| 15 cost | — | — | — | ✓ |

One round on M0-a-09 for the code still holds under K2. With K1 there is a small M0-a-06 leg. But split by shift (T-7).

## E. Anything else

- The measured B-FUZZ figures for R as defined do not exist yet. Rule (b) is not R: it used 2A/P, swept from index 0, and
  orphaned holes (F1-2). Do not carry rule (b)'s "below the base" into the owner's text as R's result.
- Under P′ the planner reads laid rings full of L2 Steiner vertices on L1 edges. The planner is O(ring), so the vertex count
  matters to cost. Report the laid ring's vertex count against X's.

## What I could not check

- M1 – M5: R's own figures at CITY and in B-FUZZ.
- Whether insertChain refuses the edge-convergence case at L2 (T-12).
- S8's district batch work limit (how much a single lay may spend).
- The size of T-3's chord error on real components.
- Whether the widened dangling-tip network (T-4) survives R.
