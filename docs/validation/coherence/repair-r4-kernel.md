# Repair round 4 — kernel (base §3)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-kernel-r4; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-kernel-r4`, 2026-10-01)
- P0 brief read whole; adjudication-r4 (TOC, R4-01, R4-09, Part H · kernel) read: done
- P1 issue evidence (verify-kernel-r3t VKr3-01 – VKr3-04, repair-r3-kernel's observation) and live §3.2, §3.6 steps 2–3, §3.11, §4.11, §7.1/§7.4 frame rows, V05 §3.8 (1), V07 territory margin, scope's r4 fixture read; set-wide sweep: done
- P2 repair block VKr3-02: done (continued after the container restart under the CONTINUE rule; the block rebuilt from the live base)
- P3 dry run on copies (alone and combined), references, doc checks, scans; report; result; LANDED: done

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 593c657d… (assemble-r3's output); rationale sha256 e7b59eac… (untouched).
# The REPLACE body is the live §3.2 with one count-asserted substitution (builder
# docs/validation/coherence/work/repair-kernel-r4/build.py: the span from "request — at the frame's own `aspect`" to "holds
# for every grown coordinate. The", applied exactly once and re-wrapped at 120 characters with the paragraph's indent);
# every other line is verbatim. Blocks: 1 — REPLACE §3.2. Ruling requests: 0. END lines owed by this unit: none (Part H ·
# kernel).
#
# ISSUES → WHERE FIXED (one issue; FIXED in text; none INVALID, none MERGED, nothing parked)
#  VKr3-02 (major; FIX) §3.2 (9) *Frame growth at an epoch*, the sentence defining the new frame and arena. "kept at the
#          current frame where that is no larger; … kept at the current arena where that is no larger." now reads "kept at
#          the current frame where that is no larger or would move one of its sides out by at most `attractCm` ((2);
#          measured on the lattice); the new arena is the new frame plus the current law's margin, kept at the current
#          arena where that is no larger or would move one of its sides out by at most `attractCm` — so no new chain is laid
#          within attraction of the chain it replaces, which §3.6's vertex and stretch attraction would merge into it before
#          the strip removes its rows, and no through-road's continuation (§4.11) or raised foot's move (below) spans
#          `attractCm` or less." The required text is applied with three wording points, each the same rule:
#          (1) "any side" is written "one of its sides": the rule holds the whole rectangle when ANY ONE side would move
#              ≤ `attractCm` (an existence test). Read as "every side", an aspect-2 frame whose long sides move 30 cm and
#              short sides 15 cm would grow, and its short sides would meet the very defect the issue names; the
#              unambiguous form closes that reading. Keeping the whole rectangle keeps its `aspect` and its centring on
#              (0, 0), which a per-side rule would break.
#          (2) "§3.6 steps 2–3" is written "§3.6's vertex and stretch attraction" — the titles of those two steps (§3.6
#              step 2 *Vertex attraction*, step 3 *Segment and stretch attraction*). The numbered form tripped
#              doc_checks' C3 (an unreviewed 5-token run "3 6 steps 2 3" shared by chance with a table row of
#              research/findings/code-dwellings.md, l. 838); the titled form resolves to the same steps and checks clean.
#          (3) The closing clause adds the claim's last paragraph — "A through-road's continuation (§4.11) and the moved
#              raised foot … would also span less than `minEdge` there" — as the consequence the rule guarantees: after the
#              change every side that moves, moves by at least `attractCm` + 1 cm (lattice integers), so the continuation
#              from a road's old end and the foot's `splitThrough` at the new ring's nearest point both span more than
#              `attractCm` > `minEdge`.
#          The outcome is defined at every side: (i) the frame and arena are compared on lattice integers, so a replay
#          decides alike (§6.5); (ii) rounding is monotone (both are centred at one `aspect` and the law's area only rises
#          at an upward crossing), so no side moves in; (iii) under one frame law a kept frame keeps the arena (the arena
#          is the kept frame plus the same margin), and a grown frame grows every arena side by (1 + 2·`marginShare`) times
#          its own move, so the change opens no new case where only one of (b) and (a)/(c) runs — that happens only at a
#          change of law, exactly as before (`territory.marginShare` 0.1 against `base`'s 0.3, V07 §3.2 (1)); (iv) the
#          next epoch measures against the current frame, so a kept frame grows once the law's frame passes it by more
#          than `attractCm` on every side, and a frame within `attractCm` of the cap's frame stays there (the cap is a
#          maximum); (v) every other part whose ring is the frame with its margin follows the one new arena. A new
#          `margin` ring now always lies more than `attractCm` outside the old arena, where no geometry stands, so (b)
#          meets nothing within attraction; the new `border` rectangle meets only what §3.6 already defines inside the
#          arena.
#          Fixture: scope's VKr3-03 (repair-r4-scope.md, §13.1's kernel set: "a CITY frame kept through a decline below
#          10 000 people, re-crossing two people above its peak (frame and arena kept, nothing runs, no chain stripped;
#          §3.2 (9))") — agrees: at 10 005 → 10 007 people a frame side moves ≈ 17.7 cm ≤ 26 cm, so the frame is kept,
#          and the arena (the kept frame plus CITY's 0.3 margin) equals the current one, so nothing runs.
#
# RULINGS APPLIED AT THIS UNIT (adjudication-r4's kernel row: R4-01, R4-09)
#  R4-01  Part H · kernel is this seat's whole work (1 FIX, 0 END lines); written. (2) the sweep: in §3 only §3.2 (9) states
#         the growth condition — §3.3's clear-region list (l. 3704–3708) and §3.11's rung row cite §3.2 (9) without it;
#         nothing to conform. Set-wide, no text restates "kept … where that is no larger": §4.11 *The rung at an epoch*
#         grows the frame "to the one §3.2 (9) gives the new target" (a kept frame and arena leave its ring and region
#         empty, so S1, S4's continuation and the re-derivations run on nothing — no change, also in pipeline's round-4
#         §4.11 block); §2.2 `Plat.frame`'s comment (l. 590), J-A81.31 (index row and Part A) and J-A81.41 (Part A, and
#         pipeline's round-4 restatement) state "only grows" / "never shrinks", which still hold; §13.1 is scope's VKr3-03;
#         V06 (l. 1425, its frame matrix row) and V07 (l. 1207) cite §4.11. No HAND-OFF is needed. No review id in
#         design text (scan). Grade as adjudicated (major).
#  R4-09  binds the kernel through §3.2 (9) only as "a frame growth's extension of its deck" — an op that names the raised
#         way; its ends list no kernel text, and §3.2 (9)'s foot batch and the raised way's re-derivation are unchanged.
#         The new closing clause states that a foot's move spans more than `attractCm`, which serves (b)'s foot batch.
#  Verifier's required change not applied as written: only the three wording points above; none contradicts a ruling or
#  an owner rule. The verifier's PLAUSIBLE alternative (grow every side by more than `attractCm`) is not taken: it would
#  move the frame off its law and its `aspect`, where keeping it changes nothing built and is the narrowest outcome.
#
# OWNER RULES: no g item through 126 and no dated canon ruling through "2026-10-01 (adjudication round 4)" names a
# kernel part (verify-kernel-r3t P4; canon's last ruling read). §3 holds no phone clause (item 126 (a2)) and reads no
# dossier field (item 125; §3.11).
#
# SIZES (principle (9)): §3 25 451 → 25 524 words (+73, +0.3 %; extraction from "## §3" to "## §4"); §3.2 2 215 → 2 288
# (+73); lines 124 → 128. Words removed by source: restatement 0, narration 0, duplicated mechanisms 0, verbose prose 0.
# The issue adds a defined outcome for an undefined edge on the epoch path (principle (11)), so the unit grows this
# round; its shrink was taken in earlier rounds. No shrink, so no nuance audit.
#
# DRY RUN (apply-blocks.py unchanged, on copies of the live files; builder outputs in
# docs/validation/coherence/work/repair-kernel-r4/: build.py, blocks.txt, old-sections/, new-sections/, sizes.txt):
#  - alone: 1 found, 1 applied, 0 skipped, audit not-OK 0; headings 153 → 153, fences balanced (140 → 140), title block
#    unchanged; index 805 = Part A 805, 0 duplicates; diff = 1 hunk (l. 3580–3583 → 3580–3587); base sha256 2ecdccd9…,
#    rationale unchanged (e7b59eac…).
#  - combined with the landed base files of round 4 (determinism, model, pipeline, rendering, scope) in name order: 44
#    found, 44 applied, 0 skipped, audit not-OK 0, headings 153 → 153; the only notes are other units' restated decisions
#    (pipeline's J-A81.41, rendering's J-A121.02 and J-A68.85/.89/.90), which their swaps handle; §3 of the combined
#    output identical to §3 alone (no other unit's block touches §3).
#  - references (assemble-r3's refs.py on a mirror, live vs new): base resolved 17 939 → 17 941 (+2: §3.6 and §4.11),
#    ambiguous 13 → 13, external 30 → 30, broken 0; volumes and INDEX.md unchanged.
#  - doc_checks --sections 3: live and new identical — exit 0, C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0, S2 251/0
#    (hits/unreviewed). PROVISIONAL: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
#    research/ftg-docs, research/external) - clean-room results are NOT authoritative".
#  - scans of the new text: canon's retired-term patterns 0; deferral wording 0; review ids in design text 0; phone 0;
#    "etc.", "as appropriate", "similar rules apply" 0.
#
# HAND-OFFS: none (no other unit's text restates the changed condition; scope's VKr3-03 carries the fixture).
#
# OBSERVED IN PASSING (this unit, not raised, not changed; PLAUSIBLE, for round 5's kernel verifier)
#  1. At a change of frame law only (item 322's fold; `territory.marginShare` 0.1, `base`'s 0.3), a frame may grow while
#     the arena is kept — e.g. a town folded back to the village product and regrowing across a village band to a
#     territory frame between 1 and 4/3 of its kept one. Then only (a) and (c) run, and "`Plat.frame` takes the new frame
#     as its last batch commits" sits in (b)'s bullet; and the kept arena is wider than the new frame plus the law's
#     margin, so `Frame.marginShare` ("the arena spans the frame plus `marginShare` on every side") then holds the
#     arena's own share rather than the law's. Both read as intended (the growth replaces `Plat.frame`, the model's
#     comment at l. 590; the arena never shrinks), but neither is stated for that case. This round's change opens no
#     such case (ISSUES (iii)).
#  2. docs/validation/coherence/edges.json row EI-KERNEL-EDGESOBSERVED-007 ("new frame equals the old … no-op implied,
#     not stated", UNDEFINED) is answered by §3.2 (9)'s "where neither grows, nothing runs", now with the near-equal
#     case; the inventory is a validation record, not design text, and is left to its keeper.

=== REPLACE ### 3.2 Numeric policy ===
### 3.2 Numeric policy

```ts
interface Frame { widthCm: Cm; heightCm: Cm; aspect: number /* width / height, 0.5–2 */;
  marginShare: number /* context margin per side: 0.3 under the `base` frame law; `territory.marginShare` under the `territory` law (V07 §3.2 (1)) */ }
```

1. **Integer world and range.** All persisted geometry is integer cm. A computed rational point that becomes arena
   geometry — a crossing, an offset, a circumcentre — is computed in doubles and placed on the lattice as it enters the
   arena (through `insertChain` or `snap`): by §3.6's placement rule on an existing edge, by nearest-point rounding
   otherwise. Derived values that no arena holds (skeleton nodes, §3.8; fit targets, §3.4) stay doubles until a stage
   inserts them. **The range invariant is |x|, |y| < 2²³ cm (83.9 km)**, enforced by `snap` (7): every coordinate
   difference is then < 2²⁴, every `orient2d` term < 2⁴⁸ and the determinant < 2⁴⁹, so the sign of `orient2d` is exact
   in ordinary doubles. The largest arena — METROPOLIS at the population cap (§12.2) at aspect 2, 17.53 km × 8.76 km plus
   the 30 % margin on every side — has |x| ≤ 0.8 × 17.53 km ≈ 1 402 000 cm ≈ 2^20.4, ≈ 6× headroom (≈ 9× at the
   METROPOLIS target: 11.31 km × 5.66 km, |x| ≤ 905 097 cm ≈ 2^19.8). Every exactness argument below rests on the range
   invariant, never on the frame table, so a rescaled frame (§13.7 O14 (e)) cannot break one.
2. **Tolerances are world lengths, never parameter-space** (the OS `DELTA = 1e-6` on line parameters is the
   anti-pattern). The lattice constants are `LatticeSpec`'s (§2.2); their meaning: `minEdge` is the shortest edge any
   writer may create or leave; `attractCm` is `minEdge` plus 1 cm of lattice slack, so a vertex split onto an edge lies
   at least `attractCm` − 0.71 cm (25.29 cm at `LatticeSpec`'s values) from both of the edge's endpoints — a vertex whose
   exact foot lies within `attractCm` of an endpoint moves onto that endpoint instead (§3.6 step 2); `minFaceAngle` is
   hard or soft by chain class (§3.10); the range is (1)'s. **Class floors** — per face class a minimum width, a minimum
   area and an angle floor — are §4.7's class-floor row: face-size floors are a width and an area, angle floors angles,
   and **none is `minEdge`**. **One minimum-edge rule for every writer (GEO-35):** `insertChain`, booleans, buffers,
   offsets, smoothing and `warp` create or move edges only through §3.6's insertion semantics or move validation, and
   §3.10 checks the same `minEdge` on new *and moved* edges. There is no weld tolerance: coincidence is lattice-point
   equality, proximity is attraction (§3.6; J-K2).
3. **No float comparisons for topology.** Equality is index equality; "same place" is a lattice test; collinear and
   cocircular ties are broken deterministically on lattice positions, never on slot ids, and no predicate compares a
   float with `== 0`. A float that decides a topology operation is quantised first — a length to integer cm, an angle to
   centidegrees (`Cdeg`, §2.1), the one angle unit. A distance comparison against `attractCm` or `minEdge` on a computed
   point (an exact foot, a crossing) uses + − × ÷ √ only, so every IEEE engine gives the same answer; a borderline case
   may fall either way without breaking any bound, because the 1 cm between `attractCm` and `minEdge` exceeds the
   0.71 cm of any single rounding.
4. **Cross-platform reproducibility** is §6.5's policy; the kernel's part is integer geometry, exact predicates, one
   geometry engine on every host (§3.7) and a deterministic op order in every batch (§3.3).
5. **Angles and directions** are unit vectors in doubles derived from integer endpoints; growth headings are stored as
   centidegrees.
6. **Exact areas and orientation (GEO-32; J-K13).** `area2(ring)` returns twice the signed area as an exact integer for
   **every ring `snap` can produce**: each shoelace term xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ is taken on coordinates relative to the
   ring's bounding-box minimum corner, in [0, 2²⁴) by the range invariant, so each product is an exact double below 2⁴⁸
   and |term| < 2⁴⁸; the terms are summed in a double partial flushed into a BigInt accumulator whenever its magnitude
   reaches 2⁵² (one comparison per term), so every partial stays below 2⁵² + 2⁴⁸ < 2⁵³ and every addition is exact.
   Faces at the frame table's sizes never reach the flush (their terms are < 2⁴³). The value is returned as an exact
   double, because every face ring is simple or retraces only declared antennae, which add no area (§3.10), so its
   twice-area is below 2⁴⁹; a self-crossing ring — only a boolean operand before its overlay can be one — takes
   `area2Big`, which returns the BigInt. Receipt: three star rings of radius 2²³ − 2 whose terms all share one sign are
   exact (`docs/validation/bench/fixall_kernel_r2_attract.out` E). Ring orientation is `orient2d` at the ring's
   lowest-leftmost vertex; no orientation, sliver or degeneracy decision reads the sign of a float sum; area statistics
   in m² derive from the exact integer.
7. **The finite and range check lives at the one door (GEO-7).** `snap(x, y)` is the only way a number becomes an arena
   coordinate, and in every build — not only in debug — it rejects `!(Math.abs(v) < 2**23)` with `E_OUT_OF_RANGE`, one
   comparison per coordinate that also catches NaN and ±∞. NaN, ±∞ and values past 2³¹ therefore never reach an
   `Int32Array`, which would store them silently as 0, 0 and a wrapped value (executed in GEO-7), so the null-`rect`
   crash class cannot return as a vertex at the world origin. Height and depth rasters have their own check (§2.3).
8. **Checked ratios.** In model packages a division by a computed value goes through `ratio(num, den, kind)`, which
   returns `E_DEGENERATE` (detail `ratio`) when |den| is below the quantity's floor (length 1 cm, area 1 cm², angle
   1 centidegree, count 1); §6.5's lint flags every other division whose divisor is not a non-zero literal.
9. **Frames are rectangles (COV-VG-VN-156).** A rung's frame area at the requested population follows the rung's
   `RungProfile.frameLaw` (§1.1; item 279): `base` — A = A_target · population ÷ target, A_target its
   `frameAreaKm2AtTarget` (§1.1's ladder; the cap: §12.2; item 9); `territory` (the village rungs) — V07 §3.2 (1)'s land
   law with its floor. The blueprint's `aspect` ∈ [0.5, 2] (default 1) gives width = √(A · aspect) and height =
   √(A / aspect), centred on (0, 0) with +y north; the arena spans the frame plus `marginShare` on every side, and every
   raster's `cols × rows` follows width × height (§2.3). The range bound of (1) is taken at the population cap and the
   extreme aspect, so a non-square town — the shape a village and many river and coast towns want — needs no other
   change. The arena's outer ring and the frame rectangle are §2.2 rule 1's `margin` and `border` chains. A Re-derive
   that recomputes the frame — a rung change or a population `adjust` — reads this law afresh and never shrinks the
   frame below its protected content (§7.4's frame row; §7.1's `bend.frame.held`).

   **Frame growth at an epoch (item 81 (b); J-A81.31).** At an epoch a frame only grows, and only where §4.11 grows it.
   The new frame is this rule's frame for the epoch's population target — taken at most at the cap, as §1.1 clamps a
   request — at the frame's own `aspect`, centred on (0, 0), kept at the current frame where that is no larger or would
   move one of its sides out by at most `attractCm` ((2); measured on the lattice); the new arena is the new frame plus
   the current law's margin, kept at the current arena where that is no larger or would move one of its sides out by at
   most `attractCm` — so no new chain is laid within attraction of the chain it replaces, which §3.6's vertex and
   stretch attraction would merge into it before the strip removes its rows, and no through-road's continuation (§4.11)
   or raised foot's move (below) spans `attractCm` or less. So a frame and its arena never shrink — a change of frame
   law included (item 322's product fold, §4.11) — each new one encloses its predecessor, and where neither grows,
   nothing runs. The range bound of (1) holds for every grown coordinate. The
   growth inserts coarse chains into finished fabric and deletes others, so it runs as §3.3's declared sequence of
   single-level batches sharing one clear region, each with `rederivesFrom` S1: (b) when the arena grows, (a) and (c)
   when the frame grows. A **lapsing stretch** is a
   stretch of the old `margin` ring or `border` rectangle that carries no other row of its chain's level or a coarser
   one; the **region** unites the L1 faces beside a lapsing stretch with those the new frame rectangle will cross —
   whole L1 faces, as a carve's footprint is (§3.3).
   * (a) *Clearing (L1).* One L1 batch removes the content finer than L1 of every face of the region (§3.3 rule 1), a
     locked or pinned owner returning as a conflict (F-EDIT, §5.2), so no deletion of the growth joins two faces finer
     than L1 and its new rectangle crosses none.
   * (b) *The margin (L0).* One L0 batch — on part 0 two, where a raised way's foot lies at a deck end on the old ring
     (below) — inserts the new outer ring as the `margin` chain, then S1's water faces in the band between old and new
     ring (§4.11), then strips the old ring's `margin` rows by `removeEdges` on two `StretchRef`s that together cover it
     (§3.4). A stretch left with no row is deleted, joining the faces either side — land with land, water with water,
     each cleared L1 face beside it with the ring's; a stretch that keeps a row keeps its edge, re-levelled by §2.2
     rule 3 (a), as where S1 lays a shore along it. `Plat.frame` takes the new frame as its last batch commits.
   * (c) *The border (L1).* One L1 batch inserts the new frame rectangle as the `border` chain by §3.6's insertion (a
     way it crosses sharing the crossing vertex) and strips the old rectangle's `border` rows alike; a stretch that also
     carries another L1 row — the settlement perimeter or a reservation boundary along the frame (§2.2 rule 1) — stays.

   A vertex of an old chain that keeps a row or another edge stays — a through-road's end on the old ring is an antenna
   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. A raised way's ground foot at
   a deck end on the old ring (§2.7 `RaisedFoot`) — a `raised_foot` vertex whose every edge the strip would delete,
   leaving its row and no edge — is never left so. Where part 0's old ring holds one, batch (b)'s insertion (the new
   ring with S1's water) and its strip are two L0 batches, and between them one batch at the foot rows' level (one per
   level, coarsest first, should they differ) moves each such foot, in the callback form's issue order (§3.3) — the
   feet by way id, then foot index, each foot's strip before its add: its row is stripped by `removeEdges` on its
   `VertexRef`, the vertex dissolving into the old ring, or left a plain vertex of it for the strip, by §2.2 rule 3;
   then the row is added by `splitThrough` on the new ring at that ring's point nearest it (ties by lattice position,
   y then x). The deck end on the raised part's own old ring stays an antenna end of its spine, as a through-road's
   end does. The raised way's re-derivation then extends the deck to the new ring and re-places both ends of that foot
   (§2.7 `RaisedFoot`, as §4.11 continues a through-road), so both ends resolve at every stage end (§3.10's
   stored-references row). Every other part whose outer
   ring is the frame with its margin (§2.2 rule 1: each underground part — the sewer's, II.7.2, and each further part's
   — and each raised part of the ground layer, §2.7 *At the frame*) grows by (a) and (b) on its own key, the `margin`
   rows of its own record instead of the `Terrain`'s, with no water and no border. Each raster of §2.3 extends as §2.3 states (whole
   cells, its `cellCm` and alignment kept), so every old cell keeps its place and every stored height its value; S1
   fills the new cells, and the `hydro` fields — flow direction, flat rank and accumulation — are recomputed over the
   grown grid by §2.3's mechanism, because an old edge cell gains neighbours and the ring may drain inward, every river's
   traced course inside the old arena unchanged. What changes is the region's faces, the faces beside a deleted stretch
   and the ring's new faces, at each level that sees them — §4.11's stages continue the ways and re-derive them; every
   other face keeps its ring, owner and nested faces (re-parented where its parent was joined, §3.3). The kernel's part
   draws no stream, so a replay of the log re-grows the frame byte for byte, and where §7.4 allows an epoch's undo, its
   undo record restores the old frame and what its batches removed. *Pre-decided fallback* if M4's memory
   measurement of the extreme growth — a TOWN grown in one epoch to the cap, whose kept TOWN-cell heights (§2.3) over
   the cap's arena are ≈ 15.7 M cells (≈ 63 MB, where a METROPOLIS made at the cap holds ≈ 3.9 M; our count) — exceeds
   §12.8's METROPOLIS line: a growth that changes the rung re-grids each raster at the new rung's `cellCm`, heights by
   the sampler's bilinear read of the old grid and the flow fields recomputed, every standing entity keeping its stored
   `baseCm`, and the generation report (§5.4) names the re-grid.
=== END ===
