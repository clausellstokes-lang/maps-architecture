# Fable review — lane fable-review/main/kernel (2026-09-27)

Reviewer: Fable 5.1 — the Fable touch the ten kernel fix-all rows waited for. Rows: A-fixall/draft-kernel-r1…r5 (class A,
the stand-in fix architect's drafts) and B-fixall/verify-kernel-r1…r5 (class B, the Opus verifications), every PENDING row
of docs/FABLE-REVIEW-QUEUE.md whose id matches the lane's two patterns (grep run at the start: ten matches, all PENDING).
The rows are the record of how the KERNEL sections were decided; what is judged is the CURRENT design — docs/ARCHITECTURE.md
at sha256 1c23190f… (13 026 lines, after the hand-fix close of 2026-09-27 21:45) with docs/ARCHITECTURE-RATIONALE.md at
0be40dfd… (2 053 lines). Sections read whole before any row: §2.2 (l. 404–718), §2.9 (l. 1797–2080) and §3 entire
(l. 2081–3202: §3.1–§3.10). Method per the lane brief: class-A rows by Parts 0, 1, 3 and 4 of each draft (Part 2's
replacement text is superseded by the consolidation and was not read as design); class-B rows by every verdict row and
every new finding; every measurement a row rests on re-run; every original finding read at its red-team detail; the
critics' rulings and the owner's rules (docs/OWNER-INSTRUCTIONS-2026-09-25.md, docs/AMENDMENTS-2026-09-25b.md items 8–31,
docs/AMENDMENTS-2026-09-27c.md items 20 (h) and 63–72 as owner rules, docs/DEFINITION.md) held over every disposition.

Standalone and clean-room rules kept: nothing outside /Users/cstokes/Desktop/Maps was opened; no captured bundle was opened
(this seat is not the code-readings seat). Scratch: /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/
(rerun/ holds the eleven re-run outputs and their diffs; the other files are named where used). Queue statuses and the
`> PENDING FABLE REVIEW` marker lines are the reconciler's to change. Design corrections are blocks in
docs/fable-review/main/blocks-kernel.md (BLOCK PROTOCOL); file corrections are the sections "## Fable review (2026-09-27) —
<row id>" appended to the row files.

## PROGRESS ledger (one line per row)

| row | state |
|---|---|
| A-fixall/draft-kernel-r1 | done |
| B-fixall/verify-kernel-r1 | done |
| A-fixall/draft-kernel-r2 | done |
| B-fixall/verify-kernel-r2 | done |
| A-fixall/draft-kernel-r3 | done |
| B-fixall/verify-kernel-r3 | done |
| A-fixall/draft-kernel-r4 | done |
| B-fixall/verify-kernel-r4 | done |
| A-fixall/draft-kernel-r5 | done |
| B-fixall/verify-kernel-r5 | done |

## Verdict table

| row | verdict | one-line reason | corrections made |
|---|---|---|---|
| A-fixall/draft-kernel-r1 | CORRECTED | Eighteen of 21 dispositions and J-K1–J-K8 stand; the FIX dispositions of GEO-3, GEO-5 and GEO-35 were premature (they hold only through round 2's mechanisms — the round-1 attraction measurement covered the wrong population); COV-VG-VN-156's STAGED label is a misnomer for a fully carried hook; the §3.1 row and §3.5 table this round wrote carried reference identifiers | appended section in r1-kernel.md; blocks REPLACE §3.1 and REPLACE §3.5 (J-Fkernel-2) |
| B-fixall/verify-kernel-r1 | CONFIRMED | 18 ACCEPTED / 3 UNRESOLVED re-derived and right; all 19 new findings real, fixed in round 2 and standing in the current text | none |
| A-fixall/draft-kernel-r2 | CORRECTED | All 24 mechanisms and J-K9–J-K21 stand and every measurement re-runs byte-identical; GEO-35's whole-step validation leaves the one-ring pair a warp can pinch below `minEdge` (J-Fkernel-1); §3.2 (2)'s 25.29 cm bound overstated under non-nearest placement | appended section; blocks REPLACE §3.6, REPLACE §3.10 (J-Fkernel-1), REPLACE §3.2 |
| B-fixall/verify-kernel-r2 | CONFIRMED | 24 ACCEPTED stand; all 16 new findings real and landed (kernel's in round 3; the determinism and pipeline ones checked by grep in the current text); accepting VK-3 beside VK2-1 was right | none |
| A-fixall/draft-kernel-r3 | CORRECTED | Six of nine mechanisms stand as drafted; VK2-3's edge promotion was replaced at integration by J-I12's deck form, J-K26's "promotion clears the flag" reversed by J-K28, and the per-level first-writer list replaced by J-K33 | appended section recording the three superseded mechanisms |
| B-fixall/verify-kernel-r3 | CONFIRMED | 9 ACCEPTED stand (with the right note on J-I12); all 9 new findings real and landed; demotion the right repair | none |
| A-fixall/draft-kernel-r4 | CORRECTED | J-K29–J-K33 and K4-1's placement bound stand; VK3-3's distance-test restoration guard was refuted by the round-4 verifier and replaced in round 5; the round's residue VK4-1…6 fixed in round 5 | appended section |
| B-fixall/verify-kernel-r4 | CORRECTED | 8 ACCEPTED and 6 real new findings stand; two required-change texts were wrong (VK4-1's S5a writer, VK4-3's over-broad flag rule) and round 5 corrected them | appended section |
| A-fixall/draft-kernel-r5 | CORRECTED | All six mechanisms, J-K34, J-K35 and the pin-clearing rule stand; the round-5 verifier's three refinements (VK5-1…3) were applied by the consistency pass and are present | appended section |
| B-fixall/verify-kernel-r5 | CONFIRMED | 6 ACCEPTED stand; 3 new findings real, premises checked, model re-run byte-identical | none |

Blocks: 5 REPLACE (§3.1, §3.2, §3.5, §3.6, §3.10) + J-ROWS (2 rows) + RATIONALE-A (2 entries) in docs/fable-review/main/blocks-kernel.md;
dry-run with docs/validation/amendments-b/apply-blocks.py: 7 of 7 applied, audit not-OK 0, headings 145 → 145, fences
balanced, the word diff exactly the changes listed under each row (scratch dry/log.json).

---

## What was re-derived (before the rows)

* The eleven kernel scripts under docs/validation/bench/ re-run (scratch rerun/summary.txt): the eight Python checks
  byte-identical to their committed outputs (`fixall_kernel_r1_attract_check`, `fixall_verify_kernel_attract_gap`,
  `fixall_kernel_r2_attract`, `fixall_kernel_r3_checks`, `fixall_kernel_r4_checks`, `fixall_kernel_r5_checks`,
  `fixall_verify_kernel_r4_restore`, `fixall_verify_kernel_r5_index`); the three Node benches (`fixall_kernel_r2_hydro`,
  `fixall_kernel_r3_bench`, `fixall_kernel_r4_bench`) identical in every count and size, timings within machine noise
  (step (0) rebuild 2.16 / 5.50 ms against 2.29 / 5.83; `Map` rebuild 9.1 / 15.3 / 59.9 ms against 9.93 / 20.11 / 61.86;
  CITY hydrology on the chosen grid 16.9–17.9 ms against 15.9–17.2; copies 0.9–1.2 ms at 12 MB).
* §3.2 (1): METROPOLIS at the population cap and aspect 2 — √(153.6 × 2) = 17.53 km by 8.76 km; |x| ≤ 0.8 × 17.53 km =
  1 402 000 cm = 2^20.42, headroom 8 388 608 / 1 402 000 = 5.98 ×; at the 64 km² target 905 097 cm = 2^19.79, 9.27 ×.
* §3.2 (6): bounding-box-relative coordinates in [0, 2²⁴) so each shoelace product < 2⁴⁸; the double partial flushed at
  2⁵² stays below 2⁵² + 2⁴⁸ < 2⁵³; a simple ring's twice-area < 2⁴⁹; frame-table rings' terms < 2⁴² (≈ 3.9 × 10¹²).
* §3.6 step 4's wedge bound: 25 / (2 tan 15°) = 46.7 cm and 25 / (2 tan 6°) = 119 cm; the displacement bound
  √2 × 26 = 36.77 cm (measured 36.72); §3.7's chord count at 2 cm sagitta and 3 m radius: θ = 2 arccos(1 − 2/300) =
  13.24°, 27.2 chords; §2.2 *Size*: 38.4 B per index item = 36 B per leaf × 16/15; ≈ 1.5 MB of role heads = 131 072
  slots × 12 B; §12.4's p50 column summed by hand from the seventeen counted rows = 255 ms.
* The round-1 counter-example: (20, 20) is 28.28 cm from (0, 0) and 20 cm from the edge, its foot 20 cm from (0, 0); the
  round-1 notch: 194 of 200 m² = 0.970, the hip point (1.5, 1.5) inside the 3 × 2 m notch at x = 1–4 m.

## A-fixall/draft-kernel-r1 — CORRECTED

**Read.** r1-kernel.md Parts 0, 1, 3 and 4 (l. 1–68, 778–895); the twenty-one items at their red-team details
(redteam-geometry.md §3: GEO-1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 20; the minor rows GEO-32, GEO-35; redteam-scale.md SCL-2,
SCL-11, SCL-22) and their fix-all index rows; the round-1 rows of ARCHITECTURE-VALIDATION.md §R1.1.

**Dispositions against the current text.**
* GEO-1 → J-K1 stands (§2.2 rules 2–3, §3.10 nesting row). The right call: the red team's option (b); a tolerance-based
  nesting check would have re-imported the epsilon geometry the kernel exists to remove.
* GEO-3 → J-K2 as drafted did **not** stand: the round-1 rule attracted a vertex onto an edge wherever it lay within
  `attractCm`, so a foot within `attractCm` of an endpoint split off a sub-`minEdge` edge — 1.34 % of band attractions in
  the verifier's simulation (re-run here, byte-identical). This row's summary claim "attraction arithmetic executed (0
  edges below `minEdge`)" measured cut endpoints already on the boundary (`fixall_kernel_r1_attract_check`, 6.38 %
  attracted, shortest 25.6 cm), where the case cannot occur. The item holds only through round 2's endpoint rule and
  placement rule (J-K17), which the current §3.6 carries.
* GEO-5 → premature: round 1 left `LatticePoint`s in entity records and a `moveVertex` bound by distance alone; the
  current §2.2 rule 5 (role-carried vertices, `VertexSig`, `resolveVertexAt`) is round 2's J-K9.
* GEO-35 → premature: the round-1 warp validation had no moved-edge length check; the current whole-step validation and
  §3.10's `minEdge` row ("new edges and moved edges") are round 2's.
* GEO-4, GEO-6, GEO-7, GEO-8, GEO-9 (J-K4), GEO-10, GEO-11 (refined by J-K15's two forms), GEO-15 (J-K7, §2.3 — outside
  this lane's sections, accepted on the round-1 and round-2 verifiers' quoted evidence), GEO-20, GEO-32 (its flush now
  from the range invariant, VK-8 — bounds re-derived above), SCL-2 (J-K6, refined by KERNEL-C06/C12), SCL-22 (duplicate),
  COV-VG-WC3 (§3.1 Poisson row), DEF-2, DEF-3 (J-K5), DEF-13 (J-K8): stand in the current §2.2 / §3 as read.
* COV-VG-VN-156 labelled STAGED-BY-OWNER: the base carries the whole mechanism (§3.2 (9), `Frame`, the range bound taken
  at the extreme aspect); the label came from the index's *(staged)* mark and is a misnomer for a fixed item. No design
  text carries the label, so nothing to change; recorded in the appended section.
* The judgment calls the row asked to re-check: J-K1 right; J-K4 right — one engine on the arrangement over adopting
  Clipper2-WASM, because every output enters through `insertChain` anyway (so a second engine buys nothing the attraction
  rules do not redo), a WebAssembly dependency would enter the embed contract, and the pre-decided M0 fallback keeps
  Clipper2 as the escape — PLAUSIBLE until M0's speed bar as the design itself labels it; J-K2 right as corrected in round
  2; J-K3 right. J-K5, J-K6, J-K7, J-K8 right.
* A clean-room defect of this round's own text: the §3.1 planar-subdivision row and the §3.5 table name NG's profile
  functions and the 2017 generator's cut and rectangle routines by their identifiers. The owner's rule (AMENDMENTS-b item
  21 (b), item 32) admits no identifier of theirs in the design, and this session's J-Fcode-1 (code lane) rules reference
  strings citation-only in reader-tier files. The document's identifier check (C1) reads only FTG's payload names, so the
  gate never saw them. Corrected by the §3.1 and §3.5 blocks, which keep the measurements (385–561 k point allocations,
  147–213 k line intersections) and paraphrase the names (J-Fkernel-2).
* Part 3's 49 cross-area requests are superseded by the consolidation and belong to the integration lane's rows; Part 4's
  CONFIRMED / PLAUSIBLE division stands.

**Corrections.** Appended section in r1-kernel.md; blocks REPLACE §3.1 and REPLACE §3.5.

## B-fixall/verify-kernel-r1 — CONFIRMED

Every verdict row re-read against the current text. The three UNRESOLVED re-derived and right (above). The nineteen new
findings are all real, and each stands fixed in the current text: VK-1 kept content (§3.3); VK-2 knot profiles (§2.2 rule
5); VK-3 the pool's five steps (§3.3); VK-4 the split oracle comparison (§3.7); VK-5 S11's geometry share ≤ 3 µs (§3.7);
VK-6 the two op forms (§3.3); VK-7 slides (§3.6); VK-8 the 2⁵² flush (§3.2 (6)); VK-9 `HydroGrid` over frame and margin
(§2.3, checked by grep); VK-10 the convexity gate (§3.8); VK-11 the miss rule (§3.7); VK-12 the §6.5 (10) pointer (§3.7);
VK-13 (determinism's) the accelerator-only byte-identity test (§3.7 states it); VK-14 the total canonical key (§3.3); VK-15
tombstones filtering static hits only (§3.3); VK-16 the pinned predicates (§3.1, J-K36); VK-17 the committed scripts
(re-run here); VK-18 candidate (b) (§3.6); VK-19 rule 3's examples. Severities right: each major was an M0 exit that could
not pass or a stated guarantee that did not hold. The verdict rule (mechanism quoted or UNRESOLVED) was applied evenly.

## A-fixall/draft-kernel-r2 — CORRECTED

**Read.** r2-kernel.md Parts 0, 1, 3, 4 (l. 1–90, 1182–1278); the round-2 rows of §R2.1; the source findings.

**Dispositions.** All twenty-four mechanisms stand in the current text: GEO-3 (endpoint rule, placement rule — §3.6 step
2 and "The placement rule"; 0 / 400 000 and 0 / 200 000 re-run), GEO-5 (§2.2 rule 5; §3.4 `resolveVertexAt`,
`signature`, `pinVertices`; §3.6 held set), GEO-35 (whole-step validation; §3.10 `minEdge` row), VK-1 (kept content and
`rederivesFrom`), VK-2 (`ChainProfile`, knot roles, `sampleProfile`), VK-3 (pool steps 1–5, `E_SCOPE`), VK-4 (§3.7's
unattracted / attracted split), VK-5, VK-6, VK-7, VK-8, VK-9 (§2.3), VK-10, VK-11, VK-12, VK-14, VK-15, VK-16, VK-17, VK-18,
VK-19, NF-D15 (§3.1 `dmath` build), N-19 (§3.8 cache key), NF-S8. J-K9–J-K21 are the right calls: J-K10's knots over
arc-length profiles (rings have no stable start); J-K11's promotion over re-deriving the neighbour; J-K13's flush from the
range invariant; J-K14's kept content (the wall is built before the fabric it shapes); J-K15's two forms (a recursion
plans on the faces the last op made); J-K16's transferred copies over `SharedArrayBuffer` (cross-origin isolation in
every embed); J-K17; J-K18; J-K19's independent oracles; J-K20's bar at the stage's own share; J-K21's convexity gate.
The class sweep of Part 0 (positions by index or coordinate as one class) was the right structural move.

**Two corrections, by block.**
1. *J-Fkernel-1 — vertex separation under a move.* §3.6's "no edge shorter than `minEdge` can be created" is exact for
   insertion: a new vertex is attracted onto a vertex within `attractCm` or placed at least `minEdge` from every vertex
   around it ((iii)), no existing vertex moves, and chain vertices decimate and merge — so insertion also keeps every pair
   of vertices at least `minEdge` apart, joined or not. The whole-step validation of a warp does not: the clearance row
   exempts a vertex's one-ring, so the pair one vertex apart (the far vertices A and B of a corner at C) is bounded only by
   the soft angle floor, and a step can bring them within `minEdge`. Constructive case (arithmetic): C = (0, 0), A = (30, 0),
   B = (0, 30); a step moves B to (22.98, 19.28) (30 cm from C at 40°): edge C–B keeps 30 cm, no crossing, the swept triangle
   holds no unmoved vertex, no lattice point is shared, and B's clearance test exempts edge C–A (incident to its neighbour C),
   so the step commits with |AB| = 2 × 30 × sin 20° = 20.5 cm. The next chain attracted onto A whose segment runs toward
   (60, 30) passes 18.6 cm from B, is routed through it (step 3) and creates the edge A–B of 20.5 cm, which §3.10's hard
   `minEdge` row rejects at commit — a mandatory chain failing for a reason §3.6 says is closed. Rare in practice (it needs
   arms under ≈ 50 cm and a brush gradient steep at that scale), but a hole in the guarantee. Correction: the whole-step
   validation requires no two vertices closer than `minEdge`, joined or not (subsuming the lattice-point test), and
   §3.10's one-vertex-per-lattice-point row states the same, by construction for insertions; the pinch example gains the
   corner case. Chose this over leaving the pair to the angle floor (rationale: RATIONALE-A J-Fkernel-1). Vetoable.
2. *§3.2 (2)'s bound.* "a vertex split onto an edge lies at least `attractCm` − 0.71 cm = 25.29 cm from both of the edge's
   endpoints" is the nearest-lattice-point case; where the placement rule's (ii) seats the vertex a few centimetres along
   the edge the guaranteed bound is `minEdge`. Stated exactly now; the 1 cm slack argument is unchanged.

**The row's own re-check list.** (1) Kept content and its companions: every earlier-stage finer face is now either
excluded from later coarser domains or re-derived — the wall and margin bands moved to S10's step (0) after S9 (§4.7),
the hinterland unit derives its own corridors, and §7.3 item 2 re-runs step (0) for a scope's own side; a coarse
insertion into finished fabric has the clear-region rules (§3.3). Stands. (2) The placement rule's proof: sound for
insertion; the fallback (route through the nearer endpoint, re-enter step 3) creates no new vertex and terminates under
the work limit; the only hole is the warp case above. (3) The pool: stands, with round 3's typed tables and L0–L3 partitions
and round 4's freeze rebuild.

**Corrections.** Appended section in r2-kernel.md; blocks REPLACE §3.6, REPLACE §3.10 (J-Fkernel-1) and REPLACE §3.2.

## B-fixall/verify-kernel-r2 — CONFIRMED

The twenty-four ACCEPTED verdicts stand against the current text (every quoted mechanism found at its section as read
whole). The sixteen new findings are all real — each is two quoted sentences that could not both hold, or a mechanism a fix
relied on without supplying — and every one landed: the kernel's eight in round 3 (VK2-1 pool step 1 and the index-contents
rule; VK2-3 `KernelTx.prepared` and candidate (c); VK2-4 keys on the level-n route; VK2-5 the flag under a move; VK2-6
placement for re-seats and slides; VK2-7 a move keeps nothing and the held set; VK2-8 cut knots; VK2-9 typed tables), and
the others checked in the current text by grep: VK2-2 → §7.3 item 2 re-runs S10's step (0) for a scope's own side
(l. 6713) and the S6 row re-lays the margin bands (l. 6743); VK2-10 → II.1 `SeamEdge.type` holds `'reserve'` (l. 11640,
J-P37); VK2-11 → II.1 (3)'s neighbour step is one L2 insertion and its reversal is stated (l. 11705); VK2-12 →
`moveCourseKnot` (ten occurrences); VK2-13 → §7.4 carries a point record by its mean-value coordinates in its host face and
`warp` takes the edit layer's `recordCheck` (§3.4; §7.4 l. 7097); VK2-14 → no wall `baseCm` remains in §7.3 (the two hits are
the building's plinth field); VK2-15 → "the whole hydrology grid (frame and margin; ≈ 16–17 ms at CITY" (l. 6763); VK2-16 →
§3.7's shift list names S10 step (0)'s bands (l. 3022). Re-derived: the three attraction scripts and the hydrology script
(above); VK2-4's reversal and VK2-6's 12.93 % by the round-3 checks, re-run byte-identical. The queue's question — whether
VK-3 should have stayed UNRESOLVED until the copy carried L3 — is answered as the verifier answered it: VK-3's own failure
scenario (no pool mechanism at all) was defeated and VK2-1 is a distinct defect, filed and fixed. No correction.

## A-fixall/draft-kernel-r3 — CORRECTED

**Read.** r3-kernel.md Parts 0, 1, 3, 4 (l. 1–88, 1055–1125); §R3.1; both scripts and outputs.

**Dispositions.** Six of nine stand as drafted in the current text: VK2-1 (§3.3 pool step 1's step-(0) rebuild and freeze
assertion; "What each level's index holds" — a finer split writes only its own level's index; J-K25), VK2-4 (the level-n
key; §3.3 "Queries"), VK2-6 (re-seats and slides by the placement rule, measured 12.93 % → 0, the (517, 30) fixture), VK2-8
(cut knots with the exact sample; J-K23 — the right call: the value is an attribute in centimetres, not a coordinate under
§2.1's integer rule; + − × ÷ √ only, so the same on every engine; 8 % of samples off by ≤ 6.8 × 10⁻¹³ cm is far below the
centimetre any consumer samples to), VK2-9 (typed open-addressing tables; J-K22; the per-worker `Map` rebuild re-measured
at 9–15 ms at CITY against the recorded 10–20), VP2-9 (rule 1's district-boundary list). Three mechanisms did not survive
as drafted: (a) VK2-3's **edge promotion** — an L0 deck edge inserted between the promoted bank vertices, sharing and
promoting the way's straight L1 edge — was replaced at integration C-1 by J-I12's form, in which the deck is the kept way's
own L1 edge between its promoted bank vertices and no L0 edge crosses water (§2.2 rule 7 "The deck", §3.3 rule 3); the
round-3 verifier confirmed no edge-promotion wording remains and the current J-K24 entry carries no stretch clause. (b)
J-K26 as drafted cleared the `split` flag on every promotion; round 4 (J-K28) keeps it through a (b) promotion onto the
vertex's own route, because demotion needs it to tell a restorable vertex from a chain's own shape vertex — the current
§2.2 rule 3 and §3.6 say so. (c) VK2-7's `rederivesFrom` for a move as a per-level list of first writers ("S3 for L1 …")
was replaced by J-K33 (the first stage of §4.1's order) in round 4, after VK3-8 showed the list would go stale. J-K27
(a move keeps nothing; the held set closed over coarser edges) is right and stands.

**The row's re-check list.** (1) The index-contents rule: stands (§3.3 "What each level's index holds", with round 4's
run boxes and round 5's tombstone scheme); the handle kept at the lower end is an implementation rule, PLAUSIBLE until M0's
fuzzing, as the draft said. (2) Edge promotion: superseded (above). (3) J-K23: confirmed.

**Corrections.** Appended section in r3-kernel.md recording (a)–(c); no block (the current text is right).

## B-fixall/verify-kernel-r3 — CONFIRMED

The nine ACCEPTED verdicts stand; the verifier's note that the round-2 required "L0 deck edges" was superseded by C-1 /
J-I12 is right and matters (it is what makes rule 7's deck one edge). The nine new findings are all real and every one
landed: VK3-1 (determinism) → §7.3 (b) 3 "declares the footprint as `KernelTx.clearRegion` and clears it by §3.3 rule 1"
(l. 6825) — the major stood, since no text then made the L1 batch clear the footprint; VK3-2 → `gate_end` rows and
transient contact names (§2.2 rule 7); VK3-3 → demotion (§2.2 rule 3); VK3-4 → "Order within a step" (§3.6); VK3-5 → the
freeze's rebuild (§3.3 pool step 1); VK3-6 → the copy's size with its partitions (§2.2 *Size*, §3.3); VK3-7 → the three
editorial slips (gone); VK3-8 (pipeline) → §4.1 "L1 by S3 — the map border first" (l. 3303) and §2.2 rule 1 (the margin
ring by S1 at L0, the border by S3's L1 batch); VK3-9 → `StretchRef` (§2.2 rule 5, §3.4). Its re-check (2) — demotion or a
weaker II.1 (3) — is settled for demotion: it makes every removal the inverse of the insertion that made it, keeps the
neighbour's digests exact and needs no per-operator case (the round-4 model restored 100 000 of 100 000 routes). The
round-3 scripts re-run as recorded. No correction.

## A-fixall/draft-kernel-r4 — CORRECTED

**Read.** r4-kernel.md Parts 0, 1, 3, 4 (l. 1–82, 1366–1450); §R4.1; both scripts and outputs.

**Dispositions.** Stand in the current text: VK3-2 → J-K29 (a `gate_end` role on a fresh `Gate`, transient `anchor` contact
names allocated from the entity's smallest free ordinal, stripped by the promotion that uses them; §2.2 rule 7, §3.3 rules
2–3) — a better mechanism than the verifier's persistent enceinte anchors, because a gate's ends belong to its record as a
bridge's do and an unreferenced name would keep vertices alive and collide with an open trace's ends; VK4-6 (b) later moved
the ordinal allocation into the kernel (§3.4 `splitThrough`), which the current text carries. VK3-4 → J-K30 (canonical order
within a step; the two orders differ in 6.77 % of close pairs, re-run). VK3-5 → the freeze rebuilds dirty partitions at
every pool size (§3.3 pool step 1; the bench's 2.06 / 10.4 / 5.8 / 59.5 ms re-run against ≈ 2 / 10 / 6 / 59). VK3-6 → the
copy counted with its partitions (38.4 B per item re-derived; copies re-run within noise). VK3-7 → done. VK3-9 → J-K31
(`StretchRef`; cut knots at a removed stretch's ends, 835.6 cm → 1.59 × 10⁻¹² cm re-run). K4-1 → J-K32 (the hot pixel as a
placement bound; 9 818 promotions and 11 763 same-level splits leave a finer vertex past the hot pixel, 38 of 400 753
outside the endpoints' box and none outside the run's box — re-run byte-identical; the box argument re-derived: a lattice
point within 0.71 cm of a segment between lattice points lies in the segment's integer bounding box). VK3-8's kernel
companion → J-K33. Corrected later, recorded: VK3-3's demotion rule as drafted guarded restoration by a distance test
("within the hot pixel of the segment between its nearest vertices"), which the round-4 verifier's simulation refuted
(0.58 %, re-run) and round 5 replaced by the flag as the whole guard with rule (b′); the round's residue — VK4-1's deck
example (writer levels), VK4-2 (the standing bound left in §3.1, §5.3 and J-K18), VK4-4 (`gate_end` not held), VK4-5
(tombstones for moved items) and VK4-6 (three inexact sentences) — was fixed in round 5 and is present.

**The row's re-check list.** (1) Demotion with the flag kept through a (b) promotion: right, and now exact with round 5's
guard; the premise that no row is added coarser than its edge is enforced (`E_LEVEL`, §3.1, §3.4). (2) The placement bound:
right; nothing relied on the standing bound — §3.9's load sorts a partition's Steiner splits along each coarser edge by
position, and two splits at least `minEdge` apart along the edge keep their order under a drift of ≤ 1.5 cm; the held-set
closure and re-seats read positions, not the bound. (3) J-K29 against the pipeline: adopted (§2.7 `Gate.banks`, §4.4;
checked by the round-5 verifier).

**Corrections.** Appended section in r4-kernel.md; no block.

## B-fixall/verify-kernel-r4 — CORRECTED

The eight ACCEPTED verdicts stand. The six new findings are real and every one is fixed in the current text: VK4-1 → §2.2
rule 3 (c) and §7.3 (b) 4 (a deck over land keeps no L0 edge; L1 at once where its `deck_end` rows are L1, L0 until
F-REDERIVE removes the rows where they are L0) — with the single-source pointer to §4.2 S1 (5) for who places them; VK4-2 →
§3.1's placement-bound row, J-K18 restated ("Steiner bound" and "Steiner invariant" occur nowhere else, grep); VK4-3 → rule
(b′) and the flag-only restoration; VK4-4 → the held `gate_end` vertices (J-K35); VK4-5 → J-K34; VK4-6 → the border's
stretch wording (§3.3 rules 2–3), the kernel's ordinal allocation (§3.4), the chunk sentence (§3.9). Two of the verification's
required-change texts were wrong and round 5 corrected them: VK4-1's list of L0 `deck_end` writers named S5a, whose outer
moat prepares its deck bank vertices in the carve's L1 batch (§4.4); VK4-3's flag rule ("every flagged vertex it does not
move that has a moved vertex beside it on its own-level route") would have unflagged a coarser run's re-seated Steiner
vertex, which J-K26 keeps flagged for a reason — round 5 restricted (b′) to vertices of the run's own level, which is right
and which the round-5 verifier confirmed. Re-derived: `fixall_verify_kernel_r4_restore.py` byte-identical (1 161 of 199 941 =
0.58 %, ≤ 1.072 cm); §12.4's p50 column re-summed to 255 ms. Correction: the appended section records the two corrected
required-change texts.

## A-fixall/draft-kernel-r5 — CORRECTED

**Read.** r5-kernel.md Parts 0, 1, 3, 4 (l. 1–103, 1509–1576); §R5.1; the script and output.

**Dispositions.** All six stand: VK4-1 (§2.2 rule 3 (c); the pin cleared with a vertex's last vertex role row, rule 3 (b),
`CommitRecord.unflagged`); VK4-2 (the placement bound everywhere; the drift after several changes measured — 1.232 / 1.364 /
1.487 / 1.438 cm for one to four changes, re-run byte-identical — and quoted in §2.2 rule 3, §3.1 and J-K32); VK4-3 (the
flag as the whole guard; rule (b′) restricted to vertices of the run's own level — the right correction of the verifier's
wording, since a coarser run's Steiner vertex is always re-seated with its run and dissolving it restores the coarser edge);
VK4-4 (J-K35 — the hold over an extra L0 batch, right: the batch would add an L0 writer to S5a for no visible output);
VK4-5 (J-K34 — item keys in one set per partition through a per-slot home column; right over per-level sets, which the
round-5 verifier's model then showed failing in 1 793 of 2 000 sequences); VK4-6 (a)–(c). The pin-clearing rule found on
VK4-1's path was a real gap (no text cleared a kernel pin). Three refinements the round-5 verifier filed were applied by the
consistency pass and are in the current text: VK5-1 — "an item whose partition changes" is tombstoned (§3.3 "No item
changes in place"; the rebuild rule; §3.9's "vertices that belong to it by §3.3's rebuild rule"); VK5-2 — knot rows excluded
from the pin trigger (§2.2 rule 3 (b), the `flags` comment; `insertChain`'s `pinned` option defined in §3.4); VK5-3 — the
"checked" figure restated as by construction (§2.2 rule 3) and the script's column dropped (the script header records it).

**The row's re-check list.** (1) Rule (b′) restricted to same-level vertices — right; it reads per run ("a run it split …
along that run"), so a crossing vertex is judged on each of its two runs. (2) The home column — right; "no item changes in
place" lists a face whose own-level ring a move changes, so warped faces are covered; the pool overlay's own tombstone sets
are load-bearing, not only defensive — a pooled re-derivation deletes and re-levels base items, whose stale static copies
must be filtered until the district-end rebuild replaces the partition (§3.3 step 2, step 4). (3) Pin clearing — right with
VK5-2's exclusion; every pin the text names guards a vertex role (`pinVertices` takes `VertexRef`s).

**Corrections.** Appended section in r5-kernel.md; no block.

## B-fixall/verify-kernel-r5 — CONFIRMED

The six ACCEPTED verdicts stand as quoted. The three new findings are real and applied (consistency pass; above). The
verifier's index model re-run byte-identical (`fixall_verify_kernel_r5_index.py`: 0 of 2 000 wrong under the round-5 rule
without regroups, 2 000 of 2 000 with regroups, 0 with the required change, 1 793 of 2 000 with one set per level). VK5-1's
premise holds — §7.3's S6 row keeps every block that fronts no changed stretch (l. 6743) and §7.4's table re-derives S8–S11
only where the class band changed (l. 7125) — and tombstoning at the partition change is right over rebuilding both
districts' partitions at S6's end, because the freeze rebuild already covers dirty partitions and a stage-end rebuild would
leave the answer between S6's end and the next query dependent on timing, the fault VK4-5 removed. VK5-2's premise holds
(`width_knot`s placed at junctions, §4.3 l. 3817 and §4.4 l. 3834). VK5-3 confirmed by reading the script. No correction.

## Design impacts (what another part must change)

* {scope} §13.1's move fixture "a step that would put two vertices on one lattice point (both halve)" gains the
  J-Fkernel-1 case: a step that would bring two vertices within `minEdge` of each other — the two far vertices of a
  short-armed corner among them — halves; and a chain attracted onto one such vertex whose segment runs within `attractCm`
  of the other never commits a sub-`minEdge` edge (the constructive case in this file's round-2 section).
* {determinism} §7.4's warp row restates §3.6's whole-step validation as "moved edges ≥ `minEdge` and against swept
  triangles, one vertex per lattice point, the clearance invariant, global deterministic halving"; under SINGLE SOURCE §3.6
  is the home, so the restatement may stay as is or say "no two vertices closer than `minEdge`" — a pointer-level choice
  for the determinism part, no mechanism change.
* {kernel} The pass that applies docs/AMENDMENTS-2026-09-27c.md items 32–72 edits §3.1's Poisson-disc, marching-squares and
  path-search rows (item 53) and §3.5's "Alternative cut" row (item 39, with the Fable code review's corrected wording);
  this lane's REPLACE blocks of §3.1 and §3.5 change other rows only (the planar-subdivision row; the cut, rectangle and
  hot-spot rows), so that pass applies its editor changes on the text after these blocks and finds every "Design says"
  passage it quotes. §3.1's marching-squares row still names VG's routine until item 53 replaces that phrase — left to
  item 53 deliberately, as the brief directs.
* {scope} The queue rows of this lane and the ten `> PENDING FABLE REVIEW` marker lines are the reconciler's to set to
  REVIEWED-<verdict> (CORRECTED for the five drafts and verify-r4; CONFIRMED for verify-r1, r2, r3, r5).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read at source this lane).** The eleven scripts re-run (eight byte-identical, three within
noise with identical counts); every arithmetic figure listed under "What was re-derived"; every quotation of the current
§2.2, §2.9 and §3 (read whole) and of the landing sites checked by grep (§2.3 `HydroGrid`, §2.7 `Gate.banks`, §4.1's
writer sentence, §4.3–§4.4 `width_knot`s, §5.3's pointer row, §6.2's current-level digests, §7.3 item 2, the S6 row and
(b) 3–4 and 9, §7.4 l. 7097 and 7046–7047, II.1 `SeamEdge.type` and (3), §13.1's kernel fixtures, §3.7's shift list); the
J-Fkernel-1 constructive case (arithmetic: |AB| = 20.52 cm after the step, 18.60 cm from B to the next segment); the
dry-run application of the blocks (7 of 7, audit 0, the diff exactly the listed changes); the document-check comparison
of the untouched and changed copies (recorded below). **PLAUSIBLE (reasoning, not executed).** That the arena behaves as
the round-4 and round-5 models do (the models have no boxes or route splitting); that J-Fkernel-1's pinch is reachable
by a real brush (it needs arms under ≈ 50 cm and a field gradient steep at that scale — the hole in the text's guarantee
is exact, its frequency in use is not measured); the cost figures the design itself labels PLAUSIBLE until M0 / M1 (the
≈ 12 MB arena, the index item counts, the S11 split); that no pipeline stage hits `E_KEPT` on the one-click path (the
stage property test of §13.2 checks it); the mechanisms in §2.3, §4, §7 and II.1 that the rows' cross-area requests
produced, accepted here on the verifiers' quoted evidence and one grep each, not re-read whole (they belong to the
other lanes' rows).
