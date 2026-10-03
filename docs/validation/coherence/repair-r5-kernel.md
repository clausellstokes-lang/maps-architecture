# Repair round 5 — kernel (base §3)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-kernel-r5; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-kernel-r5`, 2026-10-01)
- P0 brief read whole; adjudication-r5 (summary, TOC, R5-01, Part H · kernel, Part I) read: done
- P1 issue evidence (verify-kernel-r4t VKr4-01, scope's VKr4-02 and its landed round-5 fixture) and live §3.2, the frame readers set-wide read; sweep: done
- P2 repair block VKr4-01 (REPLACE §3.2; builder in the session scratchpad): done
- P3 dry run on copies (alone and combined), references, doc checks, scans; report; result; LANDED: done

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 5f34cceb… (assemble-r4's output); rationale sha256 a480f02e… (untouched).
# The REPLACE body is the live §3.2 with two count-asserted edits (builder: the session scratchpad's
# coherence/kernel-r5/build.py — the `Frame` record's `marginShare` comment, and bullet (c) of (9) re-wrapped at 120
# characters with its indent, its first three lines unchanged); every other line is verbatim. Blocks: 1 — REPLACE §3.2.
# Ruling requests: 0. END lines owed by this unit: none (Part H · kernel).
#
# ISSUES → WHERE FIXED (one issue; FIXED in text; none INVALID, none MERGED, nothing parked)
#  VKr4-01 (major, as graded; FIX, amended) §3.2 (9) bullet (c) and the `Frame` record.
#    (1) Bullet (c), after "… along the frame (§2.2 rule 1) — stays.", appends the ruled sentence with Part H's amendment
#        word for word: "Where the frame grows and the arena is kept — after a change of frame law only (a town handed down
#        to the village product, item 322, its territory frame growing within the arena it kept — at a village band's
#        re-crossing or at a later growth inside that arena) — (b) does not run, and `Plat.frame` takes the new frame as
#        this batch commits, its `marginShare` the kept arena's own share of it, (arena width ÷ frame width − 1) ÷ 2, so
#        the arena still spans the frame plus `marginShare`." So `Plat.frame` is replaced at (b)'s last commit where the
#        arena grows and at (c)'s commit where only the frame grows; the zoom-out limit's `bounds` (§8.8; V07 W79,
#        T-V7-64) move with the border, and the next growth measures from the grown frame (the hand-off up at 1 575 grows
#        the arena by (b) to 3 373 × 1.6 = 5 397 m, as the claim's stated design has it).
#    (2) The `Frame` record's `marginShare` comment, after "`territory.marginShare` under the `territory` law (V07 §3.2
#        (1))", inserts the ruled "; the kept arena's own share where an epoch's growth kept a wider arena (§3.2 (9))".
#    Root cause (orchestrator's note (6)): the comment listed the laws' shares only, so any arena that is not the frame
#    plus its law's share left the field contradicting (9)'s "the arena spans the frame plus `marginShare` on every
#    side". The set holds one other such arena — V07's `VG` parity preset, whose frame is VG's square view at
#    `matched.vg.size` (`vg.frameM`, 210 / 350 / 560 m) plus `vg.marginM` (34 m) per side (V07 §2.2's `VG` column,
#    V07 l. 467 and l. 603; V07 §3.15; `vg` in V07's rules record, l. 564) while the rung's `frameLaw` stays
#    `territory` — so the comment also names it: "; `vg.marginM` ÷ the view's side under the `VG` parity preset (V07
#    §3.15)". It restates no value (the 34 m stays V07's), changes nothing V07 builds, and leaves the comment naming
#    every source of the arena's margin, so S1, which lays the arena's ring as "the frame plus its context margin"
#    (§4.1's S1 row), reads one value in every case.
#    Edges of the new sentence (principle (11)), all defined: (i) under one frame law a grown frame always grows the
#    arena — every frame side moves by at least `attractCm` + 1 cm, every arena side by (1 + 2·share) times that — so
#    the case arises only after a change of law, as the sentence says; (ii) the kept arena's share is never below the
#    law's share less `attractCm` ÷ the frame's width (less than 0.001 below it at any frame of 600 m or more, THORP's
#    floor), so the frame always lies strictly inside the arena and no chain of (c) meets the `margin` ring; (iii) the
#    next growth computes its arena from the current law's margin, never from the record's share, so a kept share is
#    not compounded, and a later growth inside the same arena takes the same path again (Part H's amendment); (iv) the
#    share is computed from lattice integers with + − ÷ only (§3.2 (3); `ratio`, (8), the frame's width never 0), so a
#    replay re-derives it byte for byte and an epoch's undo restores the old `Frame` whole ("its undo record restores the old frame"); (v) other parts,
#    whose rings are the frame with its margin (§2.2 rule 1), keep their rings, since the arena is kept.
#    Fixture: scope's VKr4-02 (repair-r5-scope.md, its §13.1 block l. 277–280: "the frame grown to the territory law's
#    3 373 m square, the arena kept at 4 293 m: (a) and (c) only, `Plat.frame` the new frame as (c) commits, its
#    `marginShare` the kept arena's share; the hand-off up at 1 575 then growing the arena by (b) to 5 397 m") —
#    agrees with this text. Arithmetic checked: 4 km² × 9 000 ÷ 5 000 = 7.2 km², 2 683 m, × 1.6 = 4 293 m; VILLAGE's
#    territory law at 400, 2.275 ha × 400 ÷ 0.8 = 11.375 km² ≥ 4.0, 3 373 m, × 1.2 = 4 047 m < 4 293 m (kept); the
#    kept share (4 293 ÷ 3 373 − 1) ÷ 2 ≈ 0.136.
#
# RULINGS APPLIED AT THIS UNIT (adjudication-r5's kernel row: R5-01)
#  R5-01  Part H · kernel is this seat's whole work (1 FIX, 0 END lines); written. (2) the sweep, in §3: only §3.2 (9)
#         assigns the batches to the growths and places `Plat.frame`'s replacement; §3.3's clear-region list (l.
#         3756–3762) and §3.11's caps and rung rows cite §3.2 (9) without restating it — nothing to conform. Set-wide
#         (the three blind spots included): §2.2's `Plat.frame` comment (l. 590: replaced by an epoch's frame growth,
#         "which only grows it") holds; the readers of "the frame plus its context margin" — §2.2 rule 1's part rings (l.
#         673, 687), §4.1's S1 row (l. 4927), II.7 (l. 21053), §8.8's surrounding ring (l. 14367) — read the arena,
#         which (2) keeps equal to it; §4.11 *The rung at an epoch* (l. 8470–8476) names the three batches as "§3.2 (9)'s
#         single-level batches" and defers to them; §8.8's zoom-out limit (l. 14137, `DisplayList.bounds`: "a town's
#         frame, a village's township") and V07's W79 and T-V7-64 read the frame, which now moves at (c)'s commit; V07
#         §3.2 (1) (l. 1204–1207) and J-A81.31 / J-A81.41 agree; V09's panels and V10's clerk state no frame-growth
#         batch rule; §13.1's fixture is scope's (above). No review id in design text (scan). Grade as adjudicated
#         (major). R5-02 binds no kernel text: §3.2 (9)'s "extends the deck to the new ring" is consistent with §2.7's
#         support step (7) (the old deck's stations kept), and the new case moves no ring, so it runs no foot batch.
#  Verifier's required change: applied as Part H amends it ("after a change of frame law only (… — at a village band's
#  re-crossing or at a later growth inside that arena)"); the verifier's PLAUSIBLE alternative (keep the law's share
#  and send readers to part 0's ring) is not taken — the ruling chose the kept arena's share. The `VG` clause above is
#  the same defect's other home, written so it cannot recur there.
#
# OWNER RULES: no g item through 126 and no dated canon ruling through "2026-10-01 (adjudication round 5)" names a
# kernel part beyond item 110's §3.4 (closed earlier). §3 holds no phone clause (item 126 (a2)) and reads no dossier
# field (item 125; §3.11).
#
# SIZES (principle (9)): §3 25 524 → 25 643 words (+119, +0.5 %; extraction from "## §3" to "## §4"); §3.2 2 288 →
# 2 407 (+119); lines 128 → 133. Words removed by source: restatement 0, narration 0, duplicated mechanisms 0, verbose
# prose 0. The issue adds a defined outcome for an undefined edge (principle (11)), so the unit grows; its shrink was
# taken in earlier rounds. No shrink, so no nuance audit.
#
# DRY RUN (apply-blocks.py unchanged, on copies of the live files; outputs in the session scratchpad's
# coherence/kernel-r5/):
#  - alone: 1 found, 1 applied, 0 skipped, audit not-OK 0; headings 153 → 153, fences balanced (140 → 140), title block
#    unchanged; index 805 = Part A 805, 0 duplicates; diff = 2 hunks (l. 3562 changed; 5 lines added after l. 3655);
#    rationale unchanged (a480f02e…).
#  - combined with the landed base files of round 5 (determinism, model, pipeline, rendering, scope) in name order: 37
#    found, 37 applied, 0 skipped, audit not-OK 0, headings 153 → 153; §3 of the combined output identical to §3 alone
#    (no other unit's block touches the base's §3).
#  - references (assemble-r4's refs.py on mirrors, live vs new): base resolved 18 109 → 18 111 (+2: §3.2 and V07 §3.15
#    on l. 3562, both resolved), ambiguous 14 → 14, external 30 → 30, broken 0; volumes and INDEX.md unchanged.
#  - doc_checks --sections 3: exit 0 both; C1 5/0, C2 1/0, C3 95/0, C4 0/0, S1 0/0 identical; S2 272/0 → 273/0 (the
#    volume pointer "V07 §3.15", allowed; refs.py resolves it) (hits/unreviewed). PROVISIONAL: "reference corpus
#    INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) -
#    clean-room results are NOT authoritative".
#  - scans of the added text: canon's 35 retired-term patterns 0; review ids 0; phone 0; "etc.", "as appropriate",
#    "similar rules apply" 0; deferral 0 — its one "later" ("a later growth inside that arena", Part H's words) orders
#    two events and leaves no choice open.
#
# HAND-OFFS (R5-01 (2); for round 6's verifiers, none open wording in the design)
#  * V07: the `VG` preset's arena margin (`vg.marginM` per side, V07 l. 467 and l. 603) is now named in the base's
#    `Frame` record; no V07 test asserts the VG arena's ring (T-V7-23 runs parity under `VG` on other measures). The
#    behaviour is V07's and unchanged; whether a fixture is owed is V07's to judge under principle (11).
#  * scope: none — §13.1's reverse-fold fixture (VKr4-02) already reads this text.

=== REPLACE ### 3.2 Numeric policy ===
### 3.2 Numeric policy

```ts
interface Frame { widthCm: Cm; heightCm: Cm; aspect: number /* width / height, 0.5–2 */;
  marginShare: number /* context margin per side: 0.3 under the `base` frame law; `territory.marginShare` under the `territory` law (V07 §3.2 (1)); the kept arena's own share where an epoch's growth kept a wider arena (§3.2 (9)); `vg.marginM` ÷ the view's side under the `VG` parity preset (V07 §3.15) */ }
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
     Where the frame grows and the arena is kept — after a change of frame law only (a town handed down to the village
     product, item 322, its territory frame growing within the arena it kept — at a village band's re-crossing or at a
     later growth inside that arena) — (b) does not run, and `Plat.frame` takes the new frame as this batch commits, its
     `marginShare` the kept arena's own share of it, (arena width ÷ frame width − 1) ÷ 2, so the arena still spans the
     frame plus `marginShare`.

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
