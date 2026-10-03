# Repair round 3 — kernel (base §3)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-kernel-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-kernel-r3`, 2026-10-01)
- P0 brief read whole; adjudication-r3 (TOC, R3-01 – R3-03, R3-25, Part H · kernel) read: done
- P1 issue evidence (verify-kernel-r2t) and current §3.1, §3.2, §3.3 (forms, clear regions), §3.4, §3.10, §3.11, §2.2 rules 1, 3, 5, 7, §2.7 raised ways, §4.11 frame paragraph, II.7.5, II.7.6 step 3, V04 §3.7 L5 and its failure table, scope's, model's and pipeline's r3 texts read: done
- P2 repair blocks VKr2-01, VKr2-03; J-A81.31 restated: done
- P3 dry run on copies (alone and combined), swap, references, doc checks, scans; report; result; LANDED: done

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 4ed292e9… (assemble-r2's output); rationale sha256 dd2bfafa…. Each REPLACE
# body is the live subsection with count-asserted substitutions (builder docs/validation/coherence/work/repair-kernel-r3/
# build.py: 4 substitutions in §3.1 and §3.2, each applied exactly once, hand-wrapped on the lines they touch); every
# other line is verbatim. Blocks: 4 — REPLACE §3.1, REPLACE §3.2, J-ROWS (J-A81.31 restated), RATIONALE-A (J-A81.31
# restated). Ruling requests: 0. END lines owed by this unit: none (Part H · kernel).
#
# ISSUES → WHERE FIXED (both FIXED in text; none INVALID, none MERGED, none parked)
#  VKr2-01 (major; FIX per R3-25 (b)) §3.2 (9). After "A vertex of an old chain that keeps a row or another edge stays —
#          … — and every other dissolves or stays by §2.2 rule 3." the required paragraph, in its first form: a raised
#          way's ground foot at a deck end on the old ring, whose every edge the strip would delete, is never left with its
#          row and no edge; where part 0's old ring holds one, (b)'s insertion (the new ring with S1's water) and its strip
#          are two L0 batches, and between them one batch at the foot rows' level moves each such foot — its row stripped by
#          `removeEdges` on its `VertexRef`, then added by `splitThrough` on the new ring at that ring's nearest point; the
#          deck end on the raised part's own old ring stays an antenna end of its spine; the raised way's re-derivation then
#          extends the deck and re-places both ends (§2.7 `RaisedFoot`), so both ends resolve at every stage end (§3.10's
#          stored-references row). In (b): "`Plat.frame` takes the new frame as its last batch commits" (required text).
#          The alternative form (an isolated vertex with `out` = −1) is not written (Part H). Completions the first form
#          needs to be total, each kept to the case:
#          (1) the order inside the foot batch. `VertexRef` resolves by role key (§2.2 `type VertexRef`), so a re-add of
#              ('raised_foot', way, i) applied before its strip would leave the strip's ref naming two vertices; a declared
#              batch applies ops by op-kind rank (§3.3), which fixes no such order. The batch therefore runs in the
#              callback form's issue order (§3.3; §4.1 registers every stage it does not name declared as callback), the
#              feet by way id, then foot index, each strip before its add.
#          (2) the stripped vertex: "dissolving into the old ring, or left a plain vertex of it for the strip, by §2.2
#              rule 3" — dissolution needs the `split` flag and two like edges (§2.2 rule 3 *Dissolution*); a foot placed
#              on a ring corner (attraction, §3.6 step 2) or unflagged since is a plain ring vertex, which the strip then
#              frees by rule 3 (c) ("with neither it is freed").
#          (3) "(one per level, coarsest first, should they differ)": a batch is single-level (§3.3), and no text states
#              the foot rows' level; every placer named today (S4's route solve, S6's end, a drawn or declared way's
#              operator) writes L1, so in practice this is one L1 batch.
#          (4) "(ties by lattice position, y then x)" for the verifier's "(ties by lattice address)": the kernel's tie-break
#              vocabulary (§3.3 *No output depends on slot numbers*).
#          (5) (b)'s opening names the part-0 split ("One L0 batch — on part 0 two, where a raised way's foot lies at a
#              deck end on the old ring (below) —"), so (b) does not say "One L0 batch" against the paragraph below; and
#              the undo sentence reads "what its batches removed" for "what the three batches removed" (the count now
#              varies).
#          (6) J-A81.31 (the kernel's decision, home §3.2) restated in its index row and Part A entry so the record states
#              the final mechanism (canon S5: one index row, one Part A entry; decision rows state the final choice):
#              part 0's L0 batch split around the foot's move, and a "Chose … over keeping it on the old ring until the
#              raised way's re-derivation re-places it, because …" sentence; its provenance list gains VKr2-01 (records
#              keep review ids, R3-02). Swapped into place by the NOTE FOR ASSEMBLE below.
#          Agreement: scope's T110-2 (repair-r3-scope.md, VKr2-02) bars exactly this form — "§3.10's stored-references row
#          passing at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends
#          of its ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9))"; model's §2.7 `RaisedFoot` ("A frame growth
#          (§3.2 (9)) extends the deck to the new ring as §4.11 continues a through-road, the raised way's re-derivation
#          re-placing both ends of that foot on the new rings") is unchanged in repair-r3-model.md and agrees: the ground
#          end now waits on the new ring rather than on a vertex the arena cannot hold. No §3.10 row binds a foot's two
#          ends to one plan point (read whole), so the interim positions break nothing; the Euler row (V − E + F) no longer
#          meets an edgeless vertex.
#  VKr2-03 (minor; FIX) §3.1, `E_NO_PATH`'s bracket: the required text verbatim — "[F-ROUTE; F-VOID — an undercity
#          lifeline's dug connector at generation, II.7.5, II.7.6; in an edit the dry run's refusal, F-EDIT — II.7.6 step 3"
#          — and, so the code's home names every reader (the root cause: one consumer of several), "; a subterranean
#          dossier institution's connector at generation, the next rung of V04 §3.7 L5]". The same II.7.6 connector serves
#          V04's U-LINK L5 rung (2) ("U-DIG's connector to an element within `digReachM`"; V04's U-DIG generator table row
#          names L5 among its callers), whose failure takes the next rung (V04 §3.7 L5: "takes the first rung that
#          succeeds"; V04's failure table, row "U-LINK L5 | … a connector … missing | the next rung → the cellar chamber
#          (always)"). Census of the path search's other callers (S3/S4/S5b routers → F-ROUTE; U-NET's tree and the
#          catchment Dijkstras, which compute trees and raise no `E_NO_PATH`; T-V4-22's A*, the same connector) found no
#          other reader.
#
# RULINGS APPLIED AT THIS UNIT (adjudication-r3's kernel row: R3-01, R3-02, R3-03, R3-25)
#  R3-01  Part H · kernel is this seat's whole work (2 FIX, 0 END lines); both written. Further cross-unit ends met are
#         listed under HAND-OFFS.
#  R3-02  no review id in design text: none in §3.1 or §3.2 (scan); VKr2-01 appears only in J-A81.31's Part A provenance
#         list, a decision record.
#  R3-03  grades as adjudicated (VKr2-01 major, VKr2-03 minor); no regrade asked.
#  R3-25  (b) applied as above; (a), (c), (d) name other units' homes (pipeline §4.3, §4.6, §4.4, §4.8; determinism §7.1;
#         V05; model §2.7's support step; V06; scope) — none is §3's.
#  Verifier's required changes not applied as written: VKr2-01's "(ties by lattice address)" (written "(ties by lattice
#  position, y then x)", item (4) above) and its alternative form (Part H). VKr2-03's text is applied whole, with the L5
#  reader appended.
#
# SIZES (principle (9)): §3 25 176 → 25 451 words (+275, +1.1 %); §3.1 1 507 → 1 544 (+37); §3.2 1 977 → 2 215 (+238);
# J-A81.31's index row 22 → 49 (+27) and Part A entry 492 → 637 (+145). Words removed by source: restatement 0, narration 0,
# duplicated mechanisms 0, verbose prose 0 (one word, "the three" → "its", is a correctness change). Both issues add
# missing content — a defined outcome for an undefined edge on the epoch path (principle (11)) and missing readers of a code
# (principle (7)) — so the unit grows this round; its shrink was taken in earlier rounds. No shrink, so no nuance audit.
#
# DRY RUN (apply-blocks.py unchanged, on copies of the live files; builder outputs in
# docs/validation/coherence/work/repair-kernel-r3/: build.py, blocks.txt, old-sections/, new-sections/, sizes.txt,
# swap_restated.py):
#  - alone: 4 found, 4 applied, 0 skipped, audit not-OK 0; notes: DUPLICATE ID J-A81.31 in the index and in Part A (the
#    restatement); then swap_restated.py: judgment index 797 rows = Part A 797, 0 duplicates, 0 ids in one only; headings
#    153 → 153, fences balanced (140 → 140), title block unchanged; diff = 4 hunks (l. 3450, l. 3563–3568, l. 3574 →
#    3574–3585, l. 3585) + the index row; base sha256 590e3def…, rationale ac868127….
#  - combined with the landed base files of round 3 (determinism, model, pipeline, rendering, scope) in name order:
#    49 found, 47 applied, 2 skipped (scope's "=== FILE docs/volumes/INDEX.md ===" block, which the base applier does not
#    take — INDEX.md is applied separately, as scope's file says), audit not-OK 0, headings 153 → 153; then rendering's,
#    scope's and this file's swaps: index 805 = Part A 805, 0 duplicates, 0 ids in one only; §3 of the combined output
#    identical to §3 alone (no other unit's block touches §3).
#  - references (assemble-r2's refs.py on a mirror, live vs new): base resolved 17 613 → 17 623 (+10: every new reference —
#    §2.2, §2.7 ×2, §3.3, §3.10, §4.11, II.7.5, II.7.6 ×2, V04 §3.7), ambiguous 14 → 14, external 30 → 30, broken 0; volumes
#    unchanged.
#  - doc_checks --sections "3,Judgment calls": live and new identical — exit 0, C1 5/0, C2 1/0, C3 161/0, C4 0/0, S1 0/0,
#    S2 208/0 (hits/unreviewed). Rationale "Part A": live and new carry the same C3 set (383/264, the rationale being outside
#    the allow file's review); the only new hits are two S2 pointers (§2.2, §3.10) in J-A81.31, the class of the 2 215 base
#    pointers Part A already holds. PROVISIONAL: "reference corpus INCOMPLETE (missing: captures, research/patreon,
#    research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative".
#  - scans of the new text: canon's 35 retired-term patterns 0; deferral wording 0; review ids in design text 0; phone 0.
#
# NOTE FOR ASSEMBLE (one restated decision; assemble-r1's swap rule, script work/repair-kernel-r3/swap_restated.py)
#  The J-ROWS block's row restates J-A81.31's judgment-index row and the RATIONALE-A block's row its Part A entry. After
#  every block file is applied, run
#    python3 docs/validation/coherence/work/repair-kernel-r3/swap_restated.py BASE RATIONALE BASE_OUT RATIONALE_OUT
#  — each appended row takes its older row's place and the older row is deleted; it stops unless J-A81.31 occurs exactly
#  twice in the judgment index and twice in Part A. Independent of rendering's (J-A68.89) and scope's (J-A120.01) swaps:
#  any order (run in rendering, scope, kernel order above).
#
# HAND-OFFS (for round 4's verifiers; new — no END line names them)
#  1. pipeline §4.11 *The rung at an epoch*: (a) "an L0 batch replacing the `margin` chain", a summary of §3.2 (9)'s
#     batches, now omits part 0's split; it reads with §3.2 (9) as, e.g., "the L0 batch or batches replacing the `margin`
#     chain (§3.2 (9))". (b) Its list of the stages that re-derive the cleared faces ("the hinterland unit for the
#     hinterland's, a district's S8–S12b for a district's; on each underground part …") names no raised part, while §2.7
#     `RaisedFoot` and §3.2 (9) cite §4.11 for the raised way's re-derivation at a frame growth (extending the deck to the
#     new ring and re-placing a foot at a deck end); the list gains it, e.g. "on each raised part of the ground layer, its
#     raised way's re-derivation, which extends the deck to the new ring and re-places a foot at a deck end (§2.7
#     `RaisedFoot`)". T110-2's "after §4.11 both ends … on the new rings" reads that stage.
#  2. pipeline's J-A81.41 (Part A): "an L0 batch that replaces the margin chain (§3.2 (9); J-A81.31)" — the same summary as
#     1 (a).
#
# OBSERVED IN PASSING (this unit, not raised; PLAUSIBLE, for round 4's kernel verifier)
#  §3.2 (9) defines a growth whose frame or arena "would be no larger" (nothing runs) but not one larger by less than
#  `minEdge` on a side: (b)'s or (c)'s new chain would then lie within the clearance of the old one (§3.10's clearance
#  row) or attract onto it (§3.6), with no stated outcome. At a CITY → METROPOLIS crossing the law's step is at least
#  ≈ 36 m a side (§1.1: 1.25 → 1.28 km² per 1 000 people), so the case is reachable only where the frame in force is not
#  the law's frame at the band's edge — a village → town fold whose new margin share barely exceeds the old, or a frame
#  kept through a decline and regrowth. Not changed here: no issue routes it, and its outcome is a design choice for the
#  adjudicator.

=== REPLACE ### 3.1 Build-versus-adopt, per primitive ===
### 3.1 Build-versus-adopt, per primitive

| primitive | decision | candidate (licence) | degenerate input; where specified |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | §3.2, §3.6 |
| exact predicates | **build** `orient2d` (exact in doubles under §3.2 (1)); **adopt** `incircle` (J-K36) | `robust-predicates` **3.0.3, Unlicense** — licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a version fails the checker: an in-house BigInt `incircle` (exact, slower) | `incircle` is the adaptive predicate and never on the topology path; ties §3.2 (3), orientation and areas §3.2 (6) |
| planar subdivision (§2.2) | **build** — the core asset: **struct-of-arrays, allocation-free hot loops** (G-R7: in the NG 1.2.2 profile, creating points (385–561 k calls) and intersecting lines (147–213 k) dominate) | — | §3.3, §3.6, §3.9, §3.10 |
| polygon booleans; buffers, offsets, insets and bands | **build on the kernel's arrangement** (§3.7; J-K4) | Clipper2 (BSL-1.0) and `polygon-clipping` (MIT): CI oracles, shipped only under §3.7's fallback | §3.7 |
| straight skeleton | **build** (§3.8; J-K5) | none adopted: no permissive, mature JS/TS skeleton that could be held to §3.8's numeric contract is known; CGAL's fails on licence (GPL, outside §17.4's permissive-only production closure), stack and one engine (a C++ library is not the TypeScript kernel every host runs, D-4, and its doubles could not be byte-identical to §3.8's construction) (J-A21.31) | §3.8 |
| OBB, convex hull, largest inscribed rectangle | **build**: monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal, ± 45° (G-R13) | — | `obb` (§3.4) |
| best-fit regular polygon | **build** `regularFit` (J-A45.31) | — | the regular fit (§3.4) |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for site sampling, Lloyd relaxation, field seeds and medial axes — never as the street source (S4's routing lattice is `hexLattice`, §3.4); edges §3.11 |
| Poisson-disc / blue noise | **build**: Bridson with **k = 50 candidates, all evaluated**, each drawn in §8.10's candidate annulus (`poisson.annulus`) about its active point, on a torus — the sampler of four builds as their code reads (MFCG 12710731, VG 1.6.9, NG 1.2.2, Dwellings itch 17195045; P14; k = 50 as `_critic.md` C2 measured; their "warp" is the tile's wrap-around; G-P17) — run at product build time to make §8.10's stamp tiles; per-instance placement: §8.10 | — | domain clipped to any polygon with holes; an empty domain returns empty; the sampler is never warped: a ragged wood edge thins the stamped points (§4.9, §8.10; COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT); seeding, fBm and warp ours | seeded from sub-streams (§6.1); octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | results re-enter through `insertChain`; smoothing committed geometry is a `warp` (§3.6); Visvalingam–Whyatt is the topology-preserving `simplify` (§3.4); a fillet is skipped when a leg is shorter than the chord |
| spatial index | **adopt + build** | `flatbush` (ISC) static partitions and a uniform grid per level (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | §3.3 |
| marching squares / distance transform | **adopt** marching squares; **build** the distance transform | `d3-contour` (ISC; §17's licence table) | linear time. Not reproduced: VG 1.6.9's costliest terrain routine, a field pushing its roads and highway entrance away from water (S4's lattice keeps roads off water by its own crossing penalty, §4.3), and its grid-cell staircase coastlines smoothed in two passes and resampled (our contour extraction replaces them). Contours are extracted per render tile, not in S1, and are never plat edges (§2.3, §8) |
| path search | **build**: binary-heap A\* / Dijkstra on rasters and on the subdivision graph (the 2017 "A\*" and MFCG 12710731's street search are first-in-first-out searches with no heuristic — not reproduced; J-A53.31) | — | `E_NO_PATH` with the closest reached point |
| triangulation (render, fields) | **adopt** | `earcut` (ISC) | holes supported; degenerate triangles skipped and reported |
| deterministic math | **build** `dmath` (§6.5 (2); J-11) | — | a division by a computed value goes through `ratio()` (§3.2 (8)) |
| RNG and hashing | **build** (§6.1) | — | — |

Every primitive returns a **typed result** and never throws for a geometric reason:

```ts
type KernelResult<T> = { ok: true; value: T; warnings: Warning[] } | { ok: false; code: KernelError; detail: string; partial?: T };
type KernelError =                                   // each code's reader in brackets
  | 'E_OUT_OF_RANGE'       // snap(): non-finite, or |coordinate| ≥ 2²³ cm (§3.2 (7)). On a mandatory chain a caller bug, reported with its stream key, never stored; on an optional chain it enters F-NUM's ladder (§5.2: re-propose, then reject the chain)
  | 'E_DEGENERATE'         // a degenerate input or result; `detail` names which (the table below)
  | 'E_LEVEL'              // a batch wrote a level other than its own, added a row coarser than the edge or vertex it lands on, or — in a clear-region batch — met finer geometry inside its region away from its prepared contacts (§3.3) [the dry run's conflict, §7.1; in generation the stage's property tests, §13.2]
  | 'E_LOCKED'             // the op would cut, move or delete geometry owned by a locked or pinned entity [the dry run's conflict, §7.1]
  | 'E_KEPT'               // an insertion or clear would cross, clear or come within attractCm of kept content (§3.3) [in generation a stage-domain bug, the stage's property tests, §13.2; in an edit the dry run's conflict]
  | 'E_SCOPE'              // a pool district overlay wrote outside its district's scope, or two overlays touched one record (§3.3) [the pool test that asserts it never fires, §13.2]
  | 'E_STRUCTURAL'         // a merge or removal would delete an edge carrying a structural role (§2.2 rule 7) or a transient arena's fixed edge (§3.4)
  | 'E_NOT_TWO_CROSSINGS'  // splitFace contact semantics violated (§3.6) [F-CUT, §5.2]
  | 'E_HOLE_CONTACT'       // connectHole post-condition violated (§3.6) [F-CUT]
  | 'E_SELF_INTERSECT'     // a ring whose role requires a simple polygon (a claim, a drawn boundary) crosses itself [F-OUTLINE; an edit's dry run]
  | 'E_BELOW_MIN_EDGE'     // optional chains only; its two triggers are §3.6's [F-NUM]
  | 'E_BELOW_MIN_ANGLE'    // a face corner below minFaceAngle on an optional chain (§3.6) [F-NUM], or below the angle floor of the face's class, a KernelTx.expect entry (§3.3)
  | 'E_BELOW_MIN_AREA' | 'E_BELOW_MIN_WIDTH'   // a class floor of a KernelTx.expect entry (§3.3) [the issuing stage's class: F-CUT, F-CORRIDOR, F-PLOT, §5.2]
  | 'E_NON_CONVEX'         // insetRing's half-plane path was asked for a non-convex face (§3.7) [the caller, which takes offsetFace or a buffer union instead]
  | 'E_NO_PATH'            // with the closest reached point [F-ROUTE; F-VOID — an undercity lifeline's dug connector at generation, II.7.5, II.7.6; in an edit the dry run's refusal, F-EDIT — II.7.6 step 3; a subterranean dossier institution's connector at generation, the next rung of V04 §3.7 L5]
  | 'E_WORK_LIMIT'         // an operation-count budget was exhausted — counted in operations, never measured by a clock (§3.3) [F-WORK; §3.8's readers take their downgrade]
  | 'E_INVARIANT';         // a declared hard invariant failed at commit — a §3.10 row or a KernelTx.expect entry (§3.3)
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE'|'W_CUT_SLID';
  count: number; at?: LatticePoint };
```

| `E_DEGENERATE` detail | raised by | when (the contract is stated once, at the op) |
|---|---|---|
| `ratio` | `ratio()` | a denominator below its quantity's floor (§3.2 (8)) |
| `collinear` | `obb`, `hull`, `lir` | fewer than 3 distinct points, or a collinear hull (§3.4) |
| `fit` | `regularFit` | fewer than 3 vertices, zero area, or a vanishing first component (§3.4) |
| `empty` | `booleans`, `buffer`, `offsetFace`, `insetRing`, `insertChain` | an empty result (§3.7); a mandatory chain with fewer than two distinct points after snapping and decimation (§3.6) |
| `collapsed` | `insetRing` | an inset larger than the inradius; the detail carries the last non-empty distance (§3.7) |
| `stretch` | `removeEdges`, `retypeEdges` | a `StretchRef` whose ends are not two distinct vertices of one part of its chain (§3.4) |
| `seed` | `transientArena` | a seed ring that would break `minEdge`, clearance or simplicity, or an empty seed list (§3.4) |
| `fixed` | `transientArena` | a fixed ring that would break `minEdge`, clearance or simplicity (§3.4) |
| `overlap` | `transientArena`, `tileRings` | overlapping input rings, or a seed-clip piece left with a hole (§3.4) |

Each warning's producer and readers: `W_ATTRACTED` — §3.6 steps 1–3 (a point merged, attracted or routed through a
vertex); `W_STRETCH_SHARED` — §3.6 step 3; `W_WEDGE_ROUTED` and `W_SNAP_PASSES` — §3.6 step 4; `W_PLACED` — §3.6's
placement rule; `W_PROMOTED` — a finer vertex promoted (§2.2 rule 3), prepared vertices and stretch ends included (§3.4,
§3.6); `W_ACUTE_CORNER` — a mandatory chain's corner below `minFaceAngle` (§3.6); `W_SLIVER_RETYPED` — `absorbSliver`
(§3.6); `W_HEIGHT_CLAMPED` — §2.3's raster range check, with the cell count; `W_DOWNGRADE` — §3.8's readers;
`W_CUT_SLID` — §4.6 step 8 (c)'s slid always-succeeding cut, count = the slide's steps (J-Fredteam-1). Every code is
counted in §5.4's generation report; B-FUZZ (§3.7) splits its cases by `W_ATTRACTED`, `W_STRETCH_SHARED`,
`W_WEDGE_ROUTED` and `W_PLACED`.
=== END ===

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
   request — at the frame's own `aspect`, centred on (0, 0), kept at the current frame where that is no larger; the new
   arena is the new frame plus the current law's margin, kept at the current arena where that is no larger. So a frame
   and its arena never shrink — a change of frame law included (item 322's product fold, §4.11) — each new one encloses
   its predecessor, and where neither grows, nothing runs. The range bound of (1) holds for every grown coordinate. The
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

=== J-ROWS ===
| J-A81.31 | a frame grows at an epoch, never shrinks, by three single-level batches sharing one clear region — part 0's L0 batch split in two where the old ring holds a raised way's foot, which a batch between them moves to the new ring | §3.2 |
=== END ===

=== RATIONALE-A ===
| J-A81.31 | Chose to grow a frame at an epoch, and never shrink it, by three single-level batches that share one clear region — an L1 batch that clears the content finer than L1 of every whole L1 face beside a lapsing stretch of the old margin ring or border rectangle (one that carries no other row of its chain's level or a coarser one) or under the new rectangle, an L0 batch that inserts the new outer ring and S1's continued water, then strips the old ring's `margin` rows (on part 0, where a raised way's foot lies at a deck end on the old ring, two L0 batches, the insertion and the strip, with a batch at the foot row's level between them moving that foot onto the new ring), and an L1 batch that inserts the new frame rectangle and strips the old one's `border` rows — over one L0 batch writing both chains, and over two batches that strip and delete without clearing, because §3.3 allows one level per transaction and the border is an L1 chain (§2.2 rule 1), and because the levels are views of one arena (§2.2 rule 2): an edge deleted with finer faces along it would join each of them, at every finer level, with the ring's face — all of them into one face whose one owner leaves the others' references resolving to nothing (§3.10) — while the new rectangle lies inside the old arena whenever the grown frame's side is under 1.6 times the old one's (a CITY of 25 km² crossing to METROPOLIS at 30 000 people grows to 38.4 km², a 6.2 km side inside the old 8 km arena), so it would cross finer faces; clearing whole L1 faces first is the clear-region rule a carve's footprint follows (J-I10) and hands the stages whole faces to re-derive — the hinterland's, whose siting reads the frame anyway (§4.9). Chose to delete the lapsing stretches over keeping the old chains as lines, because an old margin kept at L0 would split the land of the L0 view, which stays land and water only (§2.2 rule 3 (a)), and one kept at L1 would need an untyped line of the kind J-DET-14 declines and would stay drawn across the countryside. Chose to move such a foot between the margin's insertion and its strip over keeping it on the old ring until the raised way's re-derivation re-places it, because the strip would leave its vertex with its row and no edge — a vertex the arena's record does not define (`out` names one outgoing half-edge, §2.2) and that every walk, index and §3.10 row would have to admit for one passing case; the move strips the row, the vertex dissolving into the old ring, and splits it onto the new ring's nearest point, so the foot's two ends resolve at every stage end. Chose to extend each raster on its own grid, its cell size kept, over re-gridding it at the new rung's resolution, because re-gridding moves every stored height under the standing fabric; the cost is a finer grid than a town made at the new rung — at the extreme, a TOWN grown in one epoch to the cap keeps its 5 m heights over the cap's 393 km² arena, ≈ 15.7 M cells (≈ 63 MB), where a METROPOLIS made there holds ≈ 3.9 M (≈ 16 MB), and its 16 m `hydro` grid ≈ 1.5 M cells (≈ 14 MB at 9 B a cell) where the METROPOLIS's 32 m grid holds ≈ 0.38 M (our count, PLAUSIBLE until M4 measures it) — so M4 measures that case and the re-grid is the pre-decided fallback (§3.2 (9); item 81 (b); VKC-02, VPR0-07, VD0-27, VKr2-01; the kernel seat's finding 9; amendments-c, repair-kernel-r1). |
=== END ===
