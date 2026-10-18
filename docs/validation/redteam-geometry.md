# Red team — GEOMETRY ROBUSTNESS lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:geometry (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-geometry` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied).

**Status: COMPLETE — 42 findings (2 blocker, 28 major, 12 minor).** §2 is the parseable table (one row per finding, the
`RT_SCHEMA` fields); §3 gives each failure scenario, its evidence and the required change; §4 lists what to keep; §5
groups the findings for the reviser; §6 separates CONFIRMED from PLAUSIBLE.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_geometry.prompt.txt` | 23 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | in full, first (standing ruling) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A) |
| `docs/ARCHITECTURE-VALIDATION.md` | 5 KB | §0 in full (history of the file under review; what the red team should weigh) |
| `workflows/03-assess-design-validate.js` | — | the RedTeam phase and `RT_SCHEMA` only (to make §2 parseable) |
| `research/findings/_critic-os.md` | 63 KB, 434 lines | in full (§0–§6: constants, C1–C18, S1–S20, draw order, gaps) |
| `research/findings/os-geometry.md` | 65 KB, 945 lines | §1 (1.1–1.5), §2.1.4–2.1.6, §4, §5, §6 and the Critic-2 addendum in full; §2.1.1–2.1.3, §2.2–§3.10 by outline only (2017 class-by-class detail already verified by `_critic-os.md`) |
| `research/findings/_critic-vg-ng.md` | 37 KB, 226 lines | in full (V1–V27, §2, S1–S29/P1–P5, §4 re-derivations, §6 gaps) |
| `research/findings/_critic-ftg.md` | 49 KB, 256 lines | in full (F1–F27, §2, 37 spot-checks, §4 payload table, §6 gaps) |
| `research/findings/mfcg-posts-b.md` | 65 KB | §2.3–§2.4 in full (lines 100–160: twisted bisection, the three stated failure modes, the null `rect` crash) — located by grep |
| `research/findings/ftg-posts-c.md` | 87 KB | §2.1 (lines 50–100: lot subdivision, hourglass gap), §2.12 tail (lines 470–495: self-intersecting island stroke), §2.14 (lines 505–530: duplicate intersections) — located by grep |
| `research/findings/ftg-posts-b.md` | 86 KB | T-17 (lines 400–425: z-fighting / overdraw fixed by boolean subtraction) — located by grep |
| `research/findings/watabou-extra-a.md`, `vg-ng-devlogs.md` | — | 20–30-line passages located by grep (empty areas / cluster overlap; ribbon overdraw at junctions) |
| `research/findings/profile-neighbourhood.md` | 204 KB | §7 (failure modes), RA-3 (retry trace), RA-4 (ring screenshots), RA-7 (ring construction), the Bent-cut geometry addendum BG-1 header + BG-2–BG-4, the parent-face test PF-1 + PF-3, the anchor test AN-1–AN-7 — in full; the body §1–§6, §8–§10, CA-1–CA-5, RA-0–RA-2, RA-5, RA-6, RA-8, RA-9, BG-1 tables and PF-2 / PP-1–PP-5 by outline only (the verdicts are carried into PF-3 and AN-7, which were read) |
| `research/findings/visual-spec.md` | 51 KB | §1.1–§1.3 in full (MFCG canvas strategy, palette, layer order: global road casing/body passes, per-ward caches) |
| scratchpad executions (this seat) | — | `nesting_check.py/.out`, `deadband_check.py/.out`, `pitot_check.py/.out`, a Node typed-array coercion check — arithmetic quoted in GEO-1, GEO-3, GEO-7, GEO-8, GEO-15; our own code, no reference code |

**Not read** (outside this lens or superseded by the critics read above): the other findings files cover to cover
(`mfcg-posts-a`, `mfcg-devlogs-a/b`, `os-model`, `os-wards-render`, `profile-mfcg`, `profile-village`, `vg-posts-a/b`,
`ftg-posts-a`, `ftg-docs-params`, `ftg-payload-visual`, `watabou-extra-b`, `manor`), `docs/CONFIDENCE.md`,
`docs/IMPROVEMENTS.md`, the design proposals and judges, and any capture file. Every reference fact used below comes
from a passage listed in this table or from a critic file read in full. No captured JavaScript bundle and no reference
source code was opened. Reading total ≈ 190 k tokens, under the 350 k switch point.

## §1 Lens, method, severity rule

**Lens (from the brief).** GEOMETRY ROBUSTNESS: attack `@plat/kernel` (§3) and every stage that consumes it (S1–S14,
editing, export, stage-2 seams) with the failure classes the creators themselves report — collapsed / intersecting
edges on concave shapes, empty areas inside walls, unbounded loops, null OBB on degenerate polygons, duplicate road
intersections, z-fighting / overdraw, self-intersecting user strokes — and the classic ones — sliver faces,
near-collinear offsets, skeleton events at equal times, tolerance drift across stages, float non-determinism across
platforms.

**Method.** Every finding is a concrete input or state → a wrong output, crash, non-determinism, lost edit, missed
budget, uncovered capability or unmeasurable claim, with the architecture section that specifies the failing mechanism,
the evidence (creator words or measurements through the findings files, or arithmetic shown in the finding), and the
specific change required. Where a finding re-raises something listed in the architecture's own *Deferrals*, it says why
the deferral does not cover it. Nothing here is generic advice.

**Severity.** *blocker* — the design, as written, cannot meet a goal it states (the goal is quoted) **and** the repair
changes the core structure or a cross-cutting guarantee (the level model, determinism), not one stage's mechanism;
*major* — will bite in normal use and needs a design change to a primitive, a stage or an interface (even where that
stage's own acceptance number is thereby unmet as written); *minor* — a local defect or an under-specification with a
cheap, contained fix.

**Evidence classes.** Architecture text (quoted by section) is CONFIRMED as what the design says. Reference behaviour is
CONFIRMED only where a findings file records it and this seat read that passage (cited by file and section). Arithmetic
(lattice, gcd, bounds, probabilities) is shown inline and is CONFIRMED as arithmetic; its consequence for a real town is
PLAUSIBLE until M0's kernel exists.

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`). Each row
stands alone; §3 carries the full failure scenario per id.

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| GEO-1 | blocker | The hard invariant 'every L(n+1) face inside one L(n) face' cannot hold with five separate per-level DCELs on a 1 cm lattice: any child vertex computed on an inherited parent edge (plot side line on a kerb, wedge boundary on a spine, footprint corner on a plot line, bridge spine across an inherited shoreline, stage-2 plot on a shared kerb) snaps off that edge, so the child protrudes or leaves a gap that exact predicates detect on nearly every batch; §13.1's 'children areas sum to the parent within 1 cm²' fails too, and §2.3's level-set faces break single-parent L0 nesting. | ARCH §2.2, §3.2 (1), §5.3 (hard, abort, 0/1 000), J-6, D-13, §13.1, II.1/II.5. Executed (scratchpad nesting_check.out): 61 % of random 5–60 m edges have no interior lattice point; 99.8 % of snapped feet lie strictly off the parent edge (max 0.70 cm); re-routing triangle > 1 cm² in 99.6 %. os-geometry.md §1.1: the 2017 shared-Point topology moved shared boundaries atomically; PLAT keeps that only within a level. | Add a cross-level vertex protocol: a splitThrough(edge, latticePoint) op that inserts the vertex into every level carrying the inherited edge in the same batch (or one shared vertex/edge store with level-tagged edges and per-level face records); state nesting topologically (child boundary edges coincide with parent edges by vertex ids or lie strictly inside) and check it exactly; replace the §13.1 area test with exact integer tiling; make level sets L0 'contour' edges, never faces; amend J-6/D-13 and the 'L3 never touches L1 memory' rule. |
| GEO-2 | blocker | F-BUDGET-TIME switches a stage to 'coarser parameters' when a wall-clock watchdog fires, the kernel returns E_TIMEOUT, and F-SKELETON detects failure by timeout; the same seed therefore yields different towns on slow, throttled or loaded machines, breaking identical hashes, K-3 snapshot verification, permalinks, edit replay and goldens. | ARCH §5.2 (F-BUDGET-TIME, F-SKELETON rows), §3.1 KernelError E_TIMEOUT, §14 Stage.budgetMs, §12 (252 ms p50 vs 300 ms p95, 'thin'); contradicts §6.5 (3) (no Date/performance.now in model packages), §6.5 (5) (no stage reads timing), §6.2 (model is a pure function), O2 (a)/O3 (e), and the one-page goal 'same seed … same town on every machine'. | Make every output-affecting budget a deterministic work budget (kernel calls, proposals, candidates, skeleton events, depth) and rename E_TIMEOUT to an operation-count E_WORK_LIMIT; restrict F-BUDGET-TIME to reporting and to deferring when a lazy tier runs, never what it computes (a deferred tier must hash identically); keep the watchdog outside model packages (cancel-and-resume only); add a CI golden run under a 10× time-dilation shim that must be byte-identical. |
| GEO-3 | major | insertChain welds within 5 cm but rejects features below 25 cm, so any crossing/endpoint 5–25 cm from an existing vertex is neither welded nor legal; on Chaikin-smoothed spines ≈10 % of two-ended cuts and plot lines hit this band, so nearly every S8/S10 batch uses the ladder (§13.5 '≤ 2 % of transactions' unattainable), F-NUM's 1 cm perturbation / 10 cm simplification cannot move a vertex 20 cm, and its last rung 'reject the chain' drops mandatory chains (wall, coast, bank, arterial, user way, plot line). | ARCH §2.2 lattice + rule 2, §3.1, §4.3, §5.2 F-NUM, §13.5. Executed deadband_check.out: Chaikin×2 of 25–40 m steps → segments p50 7.9 m; P(endpoint in band) 0.052, per cut 0.101. FTG fixed editing errors with 'improved intersection snapping' (157283634); MFCG 2017 merged junctions < 8 units (_critic-os row 37). | Add vertex attraction: new vertices within minEdge of an existing vertex snap to it (nearest, id tie-break); endpoints within minEdge of an edge snap onto it (splitThrough); weld only hot-pixel coincidences; split F-NUM by chain class — optional chains may be rejected, mandatory chains get an always-succeeding rung (re-insert with attraction, then minEdge simplification with topology checks); re-state the ladder-use metric. |
| GEO-4 | major | Each half-edge holds one type (an enum of 22 values) and one entity, yet coincident roles are built in: district boundaries are 'always spine edges', quays run on shores, walls are pulled/snapped to river banks, fields end on tracks; insertChain's collinear-overlap behaviour is unspecified (one role overwrites the other), and sliver absorption 'into the neighbour with the longer shared boundary' deletes a way/wall/shore edge, leaving gaps in streets or walls. | ARCH §2.2 (halfEdges.type Uint16Array, entity Int32Array; rule 1), §2.4 type list, §3.1 sliver merge, §4.8 (trace to banks, quays), §5.2 F-WALL 'snap to the water outline', F-CORRIDOR. FTG F9 (_critic-ftg): 120 water-outline edges double as lot edges — coincident roles are normal. | Store a role set per edge ((role, entity) pairs in a side table); insertChain merges roles on collinear overlap, never duplicates or overwrites; slivers are resolved by collapsing the two near-parallel chains into one chain carrying both role sets, never by deleting an edge whose roles include way/wall/shore/bank; add coincident-feature fixtures. |
| GEO-5 | major | Entities, seam contracts and edit events persist raw arena indices (HalfEdgeId in Way.spine, Enceinte.trace, Plot.frontage/access/partyWalls, Frontage.edge, Building.entrance.edge, SeamEdge.edge; VertexId in Junction/Tower and moveVertex; FaceId in regenerate scopes) while only face ids are promised stable; every split/merge/weld renumbers them, so Way.spine goes stale during S8 generation itself and logged VertexIds/FaceIds hit unrelated geometry after an upgrade replay. | ARCH §2.4–§2.7 interfaces, II.1 SeamContract/SeamReport, §7.1 EditEvent, §14 Scope, §2.2 rule 2 (face-id stability only). FTG 153121107 (ftg-posts-c §2.14): after edits, stale graph state (two intersections at one position) broke district re-roll. | Make geometry references kernel-maintained handles: a per-batch lineage table (split/merge/weld emit old→new mappings; stored chains are rewritten before commit; an invariant checks every handle resolves) or chains stored as role tags walked on demand; edit events and API scopes address geometry by stable entity id + quantised world position, never VertexId/FaceId; B-EDIT asserts 0 stale handles. |
| GEO-6 | major | splitFace's 'exactly two boundary crossings' is undefined for the degeneracies the lattice makes routine — endpoint on an edge interior, cut through a vertex, grazing a reflex vertex, collinear overlap, antennae (cul-de-sacs, drainage lines), and outer-ring-to-hole 'slits' that join cycles instead of splitting — so valid cuts are rejected or pinched/non-manifold faces are committed; faces keeping antennae also export as self-touching GeoJSON rings (O11 d). | ARCH §3.4 splitFace, §4.6 step 5 and 'Holes' (a slit has one child), §4.4 (dead ends kept deliberately), §2.3 drainage lines as L0 edges. 2017 cut() silently returned its input on ≠ 2 crossings incl. > 2 on concave shapes (os-geometry §2.1.5); its buffer ignored crossings near endpoints (§2.1.4 (c)). | Specify contact semantics: the cut touches the boundary only at its two endpoints; endpoints are a boundary vertex or an on-edge point inserted by splitThrough; interior contact (vertex graze, overlap) is E_NOT_TWO_CROSSINGS; antenna edges count as boundary for endpoints (a declared T-junction); the GeoJSON exporter drops antennae from face rings; hole-joining cuts are a separate connectHole op with its own post-conditions; add a constructive fixture per case. |
| GEO-7 | major | The OBB row contradicts itself ('< 3 non-collinear points → Degenerate' vs 'collinear hull → OBB with zero minor extent, reported'); consumers divide by the minor extent, the resulting NaN/±∞ is stored by Int32Array as 0, so a vertex silently jumps to the world origin; the only guard is a debug-build isInteger assert, and a two-comparison range check passes NaN — MFCG's null 'rect' crash class survives as silent corruption. | ARCH §3.1 OBB row and E_OUT_OF_RANGE, §2.2 'asserted Number.isInteger in debug builds', §3.2 (1). Executed (Node): Int32Array [NaN, Infinity, 2^31+5] → [0, 0, −2147483643]; (x ≥ L \|\| x ≤ −L) does not flag NaN. MFCG 61026228 'the variable rect ends up null' (mfcg-posts-b §2.3); 2017 MathUtils.sign(NaN) = +1 (_critic-os row 132). | One OBB contract (collinear or < 3 distinct points → Degenerate, never ok-with-zero-extent); all ratios through a checked-division helper returning typed results; the snap function rejects non-finite/out-of-range input in all builds with !(Math.abs(x) < 2**23) → E_OUT_OF_RANGE; fixtures for collinear hulls and zero-area residues. |
| GEO-8 | major | The skeleton's 'event queue on exact rational times' is impossible (unit-speed offsets make event times involve √(dx²+dy²) of lattice edges); near-simultaneous events are the norm for roofs (rectangles, squares), 67 % of snapped rotated squares lose their single apex to a micro-ridge whose orientation flips under 1 cm changes, and no output validator is specified — F-SKELETON detects only 'inconsistency, timeout', so crossing-arc glitches reach roofs, label spines and glTF. | ARCH §3.1 skeleton row, §4.7 S11 hip roofs, §9 spines, §11 glTF, §5.2 F-SKELETON. _critic.md spot-check 20 (101173551: own O(n²) skeleton, 'glitches in special cases'). Executed pitot_check.out: tangential 33.4 %, \|a+c−b−d\| p90 1.4 cm (a convex quad has one skeleton node iff tangential). | Specify doubles with + − × ÷ √ only, a world-length event-coalescing tolerance and id tie-breaks; build near-rectangular footprints' roofs from the OBB (exact apex/ridge) and keep the skeleton for irregular outlines and spines; add a post-condition validator (planar skeleton, monotone faces, consistent heights) whose failure triggers the typed downgrade under a work-count (not time) limit; add rotated-rectangle/square/n-gon fixtures. |
| GEO-9 | major | Two boolean engines with different numerics ship (Clipper2 WASM plus a pure-JS polygon-clipping 'fallback'; §13.1 accepts equality 'within one lattice unit'), so any host running the fallback (no WASM, CSP without 'wasm-unsafe-eval', instantiation failure) produces a different model hash for the same seed; the fallback has no offsetting, so corridorUnion/offsetFace/insetRing/bufferChain have no implementation on that path. The deferred choice covers which library wins M0, not a second runtime engine. | ARCH §1.7, §3.1 booleans/offset rows, §13.1, §14 adapter 'Clipper2 WASM \| polygon-clipping', §17 'fallback polygon-clipping', D-14 'with a pure-JS fallback', deferrals list. polygon-clipping exposes union/intersection/xor/difference only (library API; confirm in M0). FTG uses a WASM Clipper (js-angusj-clipper, ftg-posts-b T-17). | One geometry engine per generator version on every host (Clipper2 WASM or a pure-TS port everywhere, hard reported failure instead of a fallback — or the TS port as the only engine); polygon-clipping only as a CI oracle; an engine change is a version bump with a declared golden shift; record in D-14. |
| GEO-10 | major | Smoothing and warp validate moves per vertex ('never moves a vertex across another edge; the step is halved'), which misses incident edges sweeping over other vertices and simultaneous brush moves where two vertices pass each other; the warp event has no level, so across five separate DCELs a shared boundary moves by different amounts per level (nesting breaks) or only L1 moves and everything under the brush is re-rolled on each stroke. | ARCH §3.1 curves row, §3.4 warp, §7.1 warp event (no level field), §7.4 moveVertex/warp row; MFCG warp semantics (_critic.md C4/C5); os-geometry §1.1 (shared Points moved every polygon atomically — the property MFCG's warp relied on). | Validate a whole step: apply all moves on the overlay, test edges incident to moved vertices (incl. other moved edges) and unmoved vertices against swept triangles; on failure halve the whole step's strength deterministically; define warp as a displacement field on a declared level set (L0–L1) with finer levels transported via GEO-1's shared-vertex protocol and re-derived only where invariants fail (logged); add the level to the event. |
| GEO-11 | major | Weld-to-nearest-existing-vertex and the minEdge rejection make the plat depend on insertion order; drawn ways enter interactively after generation but 'before the stage that would create the class' on replay, so the §7.3 locality oracle ('incremental hash equals from-scratch hash', an M3 exit criterion) fails or becomes vacuous, and K-3 reports spurious snapshot/replay mismatches on every edited document. | ARCH §2.2 rule 2, §3.1 lattice row, §7.2 (constraints inserted before the stage), §7.3 oracle, §2.9 K-3 policy, §13.2, §16 M3 exit. Hot-pixel snap rounding is order-independent; weld-to-existing is not. | Canonicalise insertion within a batch (sort candidate chains by stable key; lattice snap rounding for topology; attraction per GEO-3 in canonical order); make the interactive path for drawn constraints identical to the replay path (re-run from the constraint's stage for the affected scope, same batch order); restate the oracle as 'log-order replay equals session state' plus a separate outside-scope byte-identity test. |
| GEO-12 | major | B-FUZZ's 10⁶ random polygons almost never produce exact degeneracies (points exactly on segments, collinear triples, cuts through vertices, overlaps, simultaneous skeleton events, quantisation-boundary values: ≤ 2^-24 per random triple), so O3 (a) can pass with every degenerate class untested; §13.1 also states two wrong properties ('splitFace children areas sum to the parent within 1 cm²'; 'the straight skeleton a tree … hole-aware'). | ARCH §13.1, §5.2 F-NUM test column, §15.2 O3 (a). Arithmetic: a line across a 2^24 frame holds at most 2^24 of its 2^48 lattice points. Executed nesting_check.out (area property fails 99.6 %); a skeleton of a polygon with h holes has h independent cycles. | Add constructive degeneracy generators (gcd-stepped on-segment points, overlaps, vertex-through and reflex-graze cuts, antennae, coincident typed chains, snapped rotated rectangles/squares/n-gons, holes touching the outer ring, quantisation-boundary values) held to the same 0-crash/0-invalid bar; correct the two properties (exact integer tiling; skeleton connected with cycle count = hole count). |
| GEO-13 | major | The S1 closed-outline routine (coast, lakes, ponds, islands, sky islands) displaces a base curve by domain-warped fBm with no bound relative to the curve's local feature size, so small islands, elongated sky-island ovals (end radius of curvature ≈ b²/a) and fjord intents self-intersect; insertChain then splits them into extra loops whose land/water type is undefined, or F-NUM drops the coast. | ARCH §4.2 S1 (2) (one routine; amplitude envelope damps detail only near the town), §3.1 (self-touching chains split into simple runs), §2.1/§2.7 SkyIsland. FTG 153121107: a self-intersecting ocean shape 'broke some of the logic in the server' (ftg-posts-c §2.12); VG discards maps whose highway 'intersects itself' (_critic-vg-ng P1). | Bound normal displacement to ≈ 0.8 × the local feature size (distance to the base curve's medial axis on that side), or repair with a non-zero union that keeps the anchor's component and types the rest by rule, with a report; property test 10 000 outlines per intent → 0 self-intersections, 0 untyped loops. |
| GEO-14 | major | 'Contours and coast agree by construction' is false: a 5–10 m raster lowered below sea level on the sea side of a cm-precision vector coast yields marching-squares contours that cross the vector coast at diagonal cell crossings, around sub-cell spits and inlets, and repeatedly on cliff/steep coasts; 'contours never cross a shore' is a hard invariant with no ladder, so S1 aborts and a steep-coast town is never produced. | ARCH §2.3 (raster 5/8/10 m), §4.2 S1 (2) 'lowered below sea level on the sea side, so contours and coast agree by construction', S1 (7) cliff banks, §5.3 hard invariant, §5.2 (no F-row), O1 (b)/R11. VG achieves agreement because its water outline is a level set of the carved field (_critic-vg-ng V2, V8). | Either extract the shoreline as the sea-level set of the same field (VG's construction; smooth only within a cell), or keep the vector coast, give coastal land cells a monotone ramp ≥ sea level + ε and clip every contour to the land faces in vector space before emission; replace the abort with that construction plus a clip rung; add steep-coast fixtures. |
| GEO-15 | major | Terrain heightCm is an Int16Array (−327.68…+327.67 m 'above datum'); typed-array stores wrap silently, so hilly/mountainous relief, hill-acropolis sites or a sea-level datum with hills over 327 m turn summits into deep pits that priority-flood fills into mountain-top lakes and D8 routes rivers through; the flats priority-flood creates also leave D8 directions undefined without a stated flat-resolution rule. | ARCH §2.3 (heightCm: Int16Array; D8 with sinks filled), §4.2 S1 (1) relief characters 'flat / rolling / hilly / mountainous' and site primitives, S1 (3), §7.7 forms (hill-acropolis). Executed (Node): Int16Array[40000] → −25536. FTG's 'Mountains aren't properly supported yet' is the weakness O1 answers (_critic-ftg §2). | Store heights as Int32 cm (or Int16 dm with a declared ±3.2 km range) relative to a per-document datum, with a range check that reports instead of wrapping; specify flat resolution after priority-flood (ε-gradient toward the spill point or Garbrecht–Martz); add mountainous-relief fixtures. |
| GEO-16 | major | S4 routes each destination pair separately and simplifies/smooths each path before inserting it, so routes that share lattice edges leaving the plaza become braided near-parallel spines (welded where < 5 cm, crossing each other, dead-band rejections, slivers absorbed with an edge deleted) — the duplicate-intersection class; the 8 m junction merge moves vertices and is validated only at the single S4 batch commit. | ARCH §4.3 (per-route Visvalingam + Chaikin×2 + curvature limit, 'junctions welded', merge < 8 m), §4.1 (S4 one batch). MFCG 2017 needed tidyUpRoads to de-duplicate central runs shared by streets to different gates (_critic-os C6, S8); FTG 153121107 'two different intersections could have the same world position … this breaks things'. | Build the arterial graph first (union of lattice edges used by all routes with multiplicity, split at degree ≠ 2, 8 m merge on the graph), then simplify/smooth once per graph chain between pinned junctions, set class/width from multiplicity or betweenness, and insert each chain once; test that no two spines run closer than the class separation for more than one step length. |
| GEO-17 | major | 'Bridges within ± 10° of the channel normal' is a hard invariant, but S4 crosses rivers along jittered-hex lattice edges and then smooths the path, so the crossing angle follows the destinations, not the river; §4.8 describes a perpendicular deck but not how the way reaches it. Read on the way, the invariant fails on most crossings with no F-row (river towns abort); read on the deck, it holds while the spine crosses the water at another angle, so road and deck disagree. | ARCH §4.3 (lattice, A*, Chaikin×2), §4.2 S1 (5) crossing sites, §4.8 water furniture, §5.3 hard invariant, §5.2 (no ladder). VG makes bridge angles 'as right as possible' (89314043; _critic-vg-ng S8). | Make S1 (5) emit each crossing site as a pinned bank-to-bank deck perpendicular to local flow; S4 routes to the deck endpoints as a fixed graph edge, with approach curves within the class radius; smoothing never moves deck vertices; add an F-ROUTE rung that moves the site along its reach when the approaches cannot meet the radius. |
| GEO-18 | major | The enceinte is traced after S5 grows the stage's secondaries and S6 types its districts, then pulled up to 40 m to defensible ground; inward pulls cross non-arterial streets, violating the hard 'walls not crossed except at gates' invariant, and F-WALL's only clearing rung (larger radius) discards the defensible pull; districts typed before the wall straddle it, and the trace's Visvalingam step is not topology-preserving. MFCG avoided this by building walls before streets. | ARCH §4.1 (S7 after S6 types the stage's districts), §4.4 (boundary = wall candidate), §4.5 validateEdge, §4.8 (40 m pull; Visvalingam 20 m / angle ≥ 100°), §5.2 F-WALL, §5.3. MFCG 2017 walls precede streets and block wall vertices except gates (_critic-os row 61, §4.2); FTG's 6 and 2 ungated crossings (ARCH §13.5) are the weakness O8 targets. | Compute the pulled/smoothed/simplified trace in S5's boundary step before growth and grow inside it, reserving gates where arterials cross; S5 legality forbids non-gate crossings (stop at the setback band or become a postern by rule); S6 treats the trace as a barrier; make trace simplification topology-preserving; add a last reported F-WALL rung that cuts the way at the setback band and prunes short outer stubs. |
| GEO-19 | major | Harbour basins ('carved from the waterfront district'), moats and canals ('along a chosen way') are inserted into L0 in S7, after S4/S5 spines and S6 districts already occupy that ground: spines end up in water, typed district faces are cut, quays land on the new shore with half a corridor over water, and no rule says which spines are cut, rerouted or deleted — contrary to the design's own 'water before roads' order. | ARCH §4.8 water furniture (basin, moles, quays, piers, moat, canals), §4.1 (S7 after S6), §4 plain-words order rationale, §4.2 S3 (harbour candidate). FTG creates harbours as part of waterfront districts before plots/buildings (130937474; _critic-ftg F11 and §2). | Reserve basin, moat and canal footprints at S3 as siting claims sized from port demand and carve them into L0 before S4, so routing, growth and typing see water; generate quays/piers on the reserved shore; route any later carve (an edit) through the conversion path with explicit cut/reroute rules and lifecycle events. |
| GEO-20 | major | The kerb is constructed three ways — S8's insetRing (per-edge distances only on the convex half-plane path, a uniform Clipper offset for concave faces) and S9's buffer-union-subtract with round joins — so concave mixed-class faces (the organic norm) have no correct inset, near-collinear class changes are mis-inset (a 2° kink with 3 m Δhalf-width lets the wider offset govern ≈ 86 m), and blocks/cut feet sized on S8's kerb disagree with S9's committed blocks. | ARCH §3.1 offsetting row, §3.4 offsetFace/insetRing/corridorUnion, §4.6 ('after insetRing by the corridor half-widths'), §4.7 S9. The 2017 author: shrink 'Works very well for convex polygons, not so much concave ones'; buffer is reliable 'only if all distances are equal. Otherwise weird steps are created' (os-geometry §2.1.4 (b), (c)). NG subtracts the corridor within the cut (_critic-vg-ng V19). | Define the kerb once as a kernel function: kerb(L1 face) = face − ⋃ buffer(spine_i, halfwidth_i) with declared joins; S8 partitions the L2 blocks it yields (materialise S9 for the district's coarse spines first, update L2 locally after each cut); keep the half-plane path only for uniform convex insets; test S8 working polygon ≡ S9 committed block (Hausdorff 0). |
| GEO-21 | major | §4.6 imports NG's drawing rule ('ends stop at the crossed corridor's edge') into the model: cuts are computed on the inset polygon and end on kerbs, yet are inserted as L1 lane spines, so they dangle as antennae — the L1 face is not split, there are no children to recurse on, the lane is not connected to the street graph (junction census, betweenness, R3 miss it), and S9's end-cap pokes into the crossed street. | ARCH §4.6 step 7 and 'Cuts are inserted as lane / alley spines, so lanes are real ways in the same graph'. profile-neighbourhood BG-2 item 5 and BG-4 item 9 ('Draw. Stop each end exactly half the crossed road's width from its centreline' — a drawing rule); PF-1 step 1 had to extend every junction end to the crossed centreline to rebuild NG's planar graph. | In the model, extend each cut end along its arrival direction from the kerb to the crossed spine and insert a T-junction (splitThrough) so the L1 face splits and the lane joins the graph; keep 'stop at the corridor edge' as the renderer's stroke rule (square caps), which S9's corridor union and junction wedge already produce. |
| GEO-22 | major | The bent cut's rules ('two OBB-major-parallel boundary runs', 'perpendicular to the start/far edge', 'within 2.5°') were measured on NG faces whose sides are straight runs, but the fusion applies them inside Chaikin×2-smoothed, curvature-continuous, round-joined kerbs where every 'side' is a single 1–9 m segment: perpendiculars follow segment noise, the straight/bent test flips randomly, and triangles, C-shapes and holed faces have no two major-parallel runs. | ARCH §4.6 steps 1–3, §4.3 (Chaikin×2, curvature limit), §4.4 (curvature-continuous headings). profile-neighbourhood PF-1 step 4 (sides broken at every ≥ 1° turn; fillets replaced by virtual corners), PF-3 (ring faces looser), AN-2 (ring σ 0.098 vs 0.066 plain), AN-3 (perpendicular ray names the far side in 66 %); deadband_check.out (segments p50 7.9 m). | Define sides as maximal runs within a turning tolerance (e.g. 10° cumulative) with chord directions; measure perpendicularity against run chords or a ±5 m tangent window, not the hit segment; define start/far sides for non-quadrilateral faces (e.g. the two runs with greatest projection on the OBB major axis; far side per AN-6's perpendicular ray); add curved and round-joined faces to M0 fixtures and re-measure the NG signature on them before calibration. |
| GEO-23 | major | F-CUT's rungs (b) mean-normal cut and (c) OBB-centre axis cut assume near-convex faces (for L/C shapes or faces holding a cul-de-sac the OBB centre can lie outside and the axis line crosses four times), so they fail together and rung (d) turns the whole face — possibly 0.5–1 ha — into one block with a court; S10 then leaves a ~40 × 40 m unbuilt interior: MFCG's 'empty areas … inside city walls' glitch, which §3.5 does not list. | ARCH §4.6 step 5, §5.2 F-CUT, §5.1 tier 5, §3.5, §4.4 (dead ends kept). MFCG 87882877 'Empty areas where they clearly shouldn't be, e.g. inside city walls'; 98918904 glitch 'remains … hard to fix' (mfcg-posts-b §2.3). FTG 133016301: old cut 'struggles … with internal corners', fixed by 'first cut perpendicular to interior corners' (ftg-posts-c §2.1). | Add FTG's reflex pre-cut (and splits at antenna roots) before the bent cut; add an always-succeeding rung before (d): a straight cut perpendicular to the longest side run through its midpoint, clipped to the face's component by boolean intersection; allow rung (d) only for faces ≤ 2 × the band's upper block area; report per district the built-area share left as court/green residue, bounded (e.g. ≤ 5 %). |
| GEO-24 | major | S10 lays strips perpendicular to each frontage with a corner rule for convex corners only; at reflex corners (notches around cul-de-sac corridors, blocks wrapped round claimed sub-faces, the inside of curves tighter than the plot depth) strips overlap or side lines cross before depth, giving overlapping or hourglass plots; §3.5's 'frontage-first construction never emits them' is asserted, and the hard invariants then rely on F-PLOT fallbacks, eroding 'discard 0 by construction'. | ARCH §4.7 S10 (4)–(6), §3.5 hourglass row, §5.2 F-PLOT, §15.2 O5 (b), (f). FTG 133016301: L-shapes, arrowheads, hourglasses 'come from buildings wrapping around interior corners', and the filters 'do not detect everything (e.g. hourglass shaped buildings)' (ftg-posts-c §2.1); NG discards 42 % of lot leaves (_critic-vg-ng V18). | Partition each block into per-frontage regions before laying strips — via the block's straight skeleton (one region per frontage edge, depth capped by skeleton height) or FTG's reflex pre-cut — then lay strips inside regions and type seam wedges as residue or corner plots; property test on concave, notched and curved blocks: 0 overlapping or self-intersecting plots before any fallback. |
| GEO-25 | major | S10 (one L3 batch per block) inserts rear lanes 'as a lane spine (back to the L1 graph, then S9 re-materialises locally)', writing L1 from an L3 batch against 'L(n+1) = refine_n(L(n))' and 'a transaction on L3 never touches L1 memory'; sibling blocks of the same L1 face keep already-committed plots that now overlap the new corridor, and the S10 → L1 → S9 → S10 loop has no stated bound. | ARCH §2.2 rules 1 and 4, §4.7 S10 (8), §4.1 (S10 one batch per block), §3.3 KernelTx (one level per transaction), §5.3 (nesting; 'no way centreline crosses a footprint'). | Decide rear and back lanes in S8, where districts are already typed and the depth bands are known, so S10 never writes L1; if S10 must add a lane, model it as a deferred L1 edit that re-runs S9 and S10 for the whole affected L1 face in one transaction, with a declared iteration bound. |
| GEO-26 | major | Row houses are built as 'an inset rectangle or L aligned to the frontage', but S10's side lines are bent and frontages curve, so neighbouring rectangles cannot share the party-wall edge — they gap or overlap; the hard 'no footprint overlap' invariant then drives F-SITEPLAN's downgrades (coverage → compound → detached → hovel → vacant) and the attached share the design promises collapses. | ARCH §4.7 S10 (4) (bent side lines), S11 row arrangement, §2.6 OutlineBuildingGenerator, §5.2 F-SITEPLAN, §5.3, §13.5 (NG 95–99 % attached, party walls 39–43 %; target attached ≥ 90 % dense/poor), §15.2 O17 (c). | Build row footprints by clipping, not fitting: footprint = plot ∩ frontage band of the row depth (boolean intersection with the plot), so the party wall is the plot side line by construction; build L4 per block in one batch so a party wall is one shared edge; keep rectangles for detached and compound slots; property test attached and party-wall shares on curved-street blocks. |
| GEO-27 | major | The one incremental path the base builds (M4: add a growth stage) runs S5 on the persisted L1 with legality rules that ignore faces already carrying L2–L4 content; new secondaries cross the previous ring's ribbon and suburb plots, so either corridors overlap existing footprints (batch aborts) or S8–S13 re-derive the touched faces and re-roll surviving buildings — against the owner's 'nothing that survives an epoch is re-rolled' and M4's '0 re-rolled survivors'. | ARCH §4.11 (grow: S5 on persisted L1; S8–S13 on new or changed faces), §4.4 (ribbon plots on the arterial; suburb small lots from the outset; legality list), §4.3 (existingFabricCost for S4 only), §16 M4 exit, D-25; owner EVOLUTION ruling. | Give incremental S5 a built-face legality class: proposals may not cross faces holding footprints unless a declared conversion applies (routes along plot boundaries/back lanes, or demolish events with lifecycle records and a cost); apply existingFabricCost to S5; re-cut plots cut by a new corridor through the conversion path (keep buildings that fit, demolish others with events), never re-derive from scratch; epoch test on a town with ribbon and suburb regimes. |
| GEO-28 | major | Canvas2D keeps retained tiles per district (Mark.group = district at city LOD), but district boundaries are streets, so if way marks live in district tiles, the tile drawn later strokes the boundary street's casing across the mouth of every street meeting it from the other district (an ink bar at each boundary T-junction), breaking the global 'every casing before any body' law; adjacent partition fills also show anti-aliasing seams. | ARCH §8.1 Mark.group, §8.2 casing law, §8.5 tiles per district, §2.2 rule 1. visual-spec §1.3 items 3–7, 10–11 (MFCG: global casing then body passes 'strictly separated … what keeps junctions clean'; only ward interiors cached; walls/towers after wards) and §1.1 ('cache per ward'); profile-neighbourhood §7 (NG closes seams between adjacent shadow quads with a ½-px same-colour stroke). | Cache only area/building marks per district; draw ribbon and linework marks (ways, rivers, walls, towers, piers) in per-band global passes (all casings, then all bodies) over the tiles — or tile a regular screen grid rendering every intersecting mark in global program order; draw same-semantic adjacent fills as unions or with NG's ½-px dilation; render test: no casing pixels inside junction mouths on district boundaries. |
| GEO-29 | major | S13 is a model stage whose F-LABEL rungs depend on text width at the minimum size and on screen-space collisions per LOD; text width comes from the host engine (different shaping in Chromium, Gecko, WebKit; headless Node ships no canvas), so near-threshold labels take different rungs per platform and the model hash differs — O2 (a) and O11 (f) 'headless hash = UI hash' cannot both hold while labels are in the hash, and screen space makes the model viewport/DPR-dependent. | ARCH §9 (screen-space rbush per LOD; 0 collisions invariant), §5.2 F-LABEL, §2.7 Label entity, §6.2 model hash, §1.7 (Node target; @napi-rs/canvas / resvg dev-only 'never shipped'), §15.2 O2 (a), O11 (f). | Either fit labels from font metrics parsed from the bundled OFL fonts (advances + kerning in world units at a declared size) with world-space collision per LOD band, never the host text engine; or exclude label placement from the model hash (derived, cached view data; only pinned/edited placements are model data); state which and test headless vs browser hashes on the golden suite. |
| GEO-30 | major | PART II rule (3) 'no new street end is placed on a shared edge' forbids the geometry NG close-ups consist of: NG cuts end on existing roads (361/361) and ring-template radials run on to the hood edge — inside a PLAT district that edge is the shared boundary street — so bent-cut refinement cannot touch boundary blocks and RingFabric radials cannot reach the boundary; the base's own S8 already ends cuts on district-boundary spines. | ARCH II.1 rule (3), SeamContract (sharedGeometry 'ownedByBase'), II.2 RingFabric, §4.6 (cuts end on the L1 face's spines), §2.2 rule 1. profile-neighbourhood BG-2 item 6 (every junction on an earlier-drawn road, 361/361), RA-4 ('no rim road: streets simply stop at the edge'; 'The radial streets run on to the edge'). | Replace rule (3) with a seam amendment: a close-up may add T-junctions on shared boundary spines, each recorded as a new portal in both districts' SeamContracts and inserted with splitThrough (GEO-1) so the shared spine stays one chain; only the neighbour's corridor and junction wedge are re-derived, never its plots; SeamReport counts added portals; test a ring close-up with radials to the boundary and byte-identical neighbour plots. |
| GEO-31 | minor | The determinism lint forbids only Math.sin/cos/tan/atan2/exp/log/pow, random, Date, performance; it misses the ** operator (same approximated exponentiation as pow — S1's width law acc^0.4 invites it), Math.hypot/asin/acos/atan/cbrt/expm1/log1p/log2/log10/sinh/cosh/tanh, and the adopted geometry/noise libraries, which are never scanned. | ARCH §6.5 (3), D-23, §4.2 S1 (3) (w = w0·acc^0.4), §14 dependency rules, §17 (simplex-noise 'determinism verified'). The ECMA-262 approximation status is general spec knowledge (PLAUSIBLE, not re-read). | Make the lint an allowlist (Math.abs/floor/ceil/round/trunc/sign/min/max/sqrt/imul/clz32/fround plus arithmetic operators), ban ** except with literal small-integer exponents, and run the same scan over vendored dependency sources with a pinned-version audit. |
| GEO-32 | minor | 'Areas exact in doubles' holds per product, not for shoelace sums: at the METROPOLIS frame sums stay below 2^53 only up to ≈ 11 000 vertices, and at the declared 2^23 range invariant only 64; ring-orientation or sliver decisions read from such sums are float topology decisions §3.2 (3) forbids. | ARCH §2.1 ('products of two bounded 32-bit values are exact'), §3.2 (1), (3). Arithmetic: \|x\|,\|y\| ≤ 6.4e5 cm → term ≤ 8.2e11 → n < 9.0e15/8.2e11 ≈ 11 000; at 2^23, term ≤ 2^47 → n < 64. | Take ring orientation from orient2d at the lowest-leftmost vertex; compute areas relative to the bbox corner or with compensated/BigInt accumulation above a vertex-count threshold; state the bound in §3.2. |
| GEO-33 | minor | Drawn strokes are not resampled before insertChain (60 Hz pointer samples a few cm apart → E_MIN_EDGE on ordinary strokes); drawWater takes one ring and rejects overlapping shapes, so an island cannot be drawn (FTG's documented method is two intersecting ocean shapes); drawBoundary takes arbitrary polygons although district boundaries are 'always spine edges'. | ARCH §7.1 draw events, §7.2 (validation: simple, not overlapping), §7.4 drawing-tools row, §2.2 rule 1. FTG 153121107 (ftg-posts-c §2.12): draw 'two ocean shapes … (and those ones can intersect)'; a single self-intersecting shape 'broke some of the logic in the server'. | Resample strokes at the authoring boundary to ≥ minEdge with a topology check; let drawWater take several rings composed by boolean union plus a subtracting land brush; define drawBoundary as snapping to the nearest spine chain or as invisible district_bound L1 edges, and say which. |
| GEO-34 | minor | Anchors are quantised (building centroid to a 1 m cell, quantised frontage offset), so a 1 cm upstream shift (re-snap, neighbour's kerb, splitThrough) flips the cell for ≈ 1–2 % of buildings, superseding ids and orphaning pins/assignments; the tie-break when a split line passes exactly through an anchor point is unstated. | ARCH §2.1 anchor rule, §2.2 rule 2 ('the part containing the entity's anchor point keeps the id'), §6.3, §7.4 (orphaned assignments). Arithmetic: P(flip) ≈ shift/cell per axis = 1 cm / 100 cm. | Match anchors with hysteresis (keep the id if the new centroid lies within 0.5 m of the old anchor) by nearest neighbour with an id tie-break; state the on-edge rule (face left of the directed cut keeps the id); fixture: 1 cm perturbations keep ≥ 99.9 % of ids. |
| GEO-35 | minor | Minimum-feature rules conflict: insertChain rejects < 25 cm (minEdge), the invariant checks only 'no edge below the weld tolerance' (5 cm), O4 (e) counts sub-weld edges, and F-CORRIDOR tests '0 faces below minEdge' (a length applied to a face); Clipper outputs, offsets, smoothing and warp bypass insertChain and can leave 5–25 cm edges that the invariant accepts and later stages mishandle. | ARCH §2.2 lattice and rule 2, §3.1 (booleans 're-snapped and re-welded'; skeleton pre-clean), §5.2 F-CORRIDOR test, §5.3, §15.2 O4 (e). | Enforce one minimum-edge rule in every writer (boolean, offset, smoothing and warp adapters included) and check the invariant at the same value; express face floors as minimum width and area, not minEdge. |
| GEO-36 | minor | S1's meander term can loop the river course onto itself (unintended islets, crossing sites on overlaps); carving the terrain to keep the bed monotonic has no depth bound (a meander on a hillside becomes a trench); a requested river island vanishes when the branch runs within the channels' half-widths. | ARCH §4.2 S1 (3) (Chaikin-smoothed control polyline with alternating offsets; terrain carved to the course), S1 (4) (branch rejoins after k cells), §5.3 (requested features present or reported). | Bound meander offsets by half the control spacing and test course simplicity; cap carve depth with an F-RIVER re-route rung; require branch separation ≥ (w_main + w_branch)/2 + minimum islet width, else report the island as not built. |
| GEO-37 | minor | S5 enforces minimum separation only from parallel spines, so proposals may run parallel to shorelines, the stage boundary or wall lines at any distance, leaving strips thinner than the smallest plot depth that S10 cannot fill. | ARCH §4.4 legality list; §4.8 setback band; §4.7 granularity depths (12–60 m). | Apply the regime separation (at least minimum block depth + half a corridor) to shores, wall setback bands and the stage boundary as well as to spines. |
| GEO-38 | minor | Wall bands and glacis are declared L3 faces but straddle the L1 wall edge (as do towers centred on L1 vertices), breaking nesting; wallToWay turns the band into a ring-road corridor wider than band + setback, overlapping plots and footprints outside the old wall with no clearance rule. | ARCH §2.2 rule 1 (L3 includes wall bands, glacis), §2.7 Enceinte.band / Tower.vertex, §4.8, §4.11 wallToWay, §15.2 O8 (g) ('wall → road keeps plot ids'). | Model band, glacis, towers and gatehouses as FaceRef unions of per-side parts (like corridors); give wallToWay a clearance rule (re-cut plots along the new corridor keeping ids where anchors survive; demolish footprints that no longer fit, with lifecycle events). |
| GEO-39 | minor | Area-label spines use 'the longest path of the hole-aware straight skeleton of the simplified face'; water bodies with islets and woods with clearings have cyclic skeletons, where 'longest path' is undefined (and exponential in general), and the non-topology-preserving pre-simplification can make a hole cross the outer ring. | ARCH §9 (area labels for districts, water bodies, woods), §4.5 (districts have no holes), §3.1 skeleton and curves rows, §13.1 ('a tree'). | Define the spine for holed faces (longest path in a clearance-weighted spanning tree of the skeleton, or the medial-axis fallback) and simplify with a topology-preserving simplifier. |
| GEO-40 | minor | glTF exports a terrain heightfield mesh, water planes and building meshes; ground faces draped as separate surfaces over the terrain z-fight (FTG's 3-D problem), and a river 'water plane' cannot follow a descending bed. | ARCH §11 3-D row, §8.4. FTG T-17 (ftg-posts-b): coplanar displaced texture layers fought until upper polygons were subtracted from lower ones so 'nothing will render on top of each other'. | Export the ground as one planar partition (the plat's leaf faces, finest committed level per region, each once) draped on the terrain; export rivers as sloped surfaces following the bed profile (or stepped planes per reach). |
| GEO-41 | minor | §7.8 demands continuous controls with 'no jump > ε between adjacent steps', but the design's own expansion example contains a threshold (joinMax += round(wealthLevel · 2)) and every downstream geometric stop rule is discrete (OBB-band stop test, 2.5° straight/bent test, minimum widths, ladder rungs), so a small step can flip a top-level cut on a golden seed; the sweep either fails or ε is tuned to pass. | ARCH §7.8, §7.7 expansion example, §4.6 steps 1, 3, 5, §13.2 control sweeps. | State continuity statistically (monotone/continuous in expectation over N seeds per step with a per-seed tolerance); make expansion rows continuous (fractional joinMax as a probability, no round); derive ε from measured per-seed variance. |
| GEO-42 | minor | A bent cut 'may continue across an existing lower-or-equal-class street when collinear within 6°'; when that street bounds another district (S5 also grows lanes), the continuation writes the other district's faces inside this district's S8 batch, breaking per-district atomicity, the worker merge rule and per-district reroll isolation, and making the result depend on district order. | ARCH §4.6 step 6, §4.1 (S8 one batch per district; merge protocol 'no shared-edge writes inside a pool'), §4.4 (S5 grows lanes 15–25 m), II.4 (per-district reroll isolation). | Forbid continuation across district-boundary edges, or make such a cut a two-district transaction with a canonical order recorded in both SeamContracts. |

**Counts:** 42 findings — 2 blocker, 28 major, 12 minor.

## §3 Findings in detail (failure scenario → evidence → required change)

### GEO-1 · blocker · Exact nesting of five separate per-level DCELs is unrealisable on the integer lattice

**Failure scenario.** A CITY seed reaches S10: about 5 500 plots, every side line ending on its block's kerb (an L2
edge that L3 carries as a copy in its own DCEL, §2.2). The foot of a side line on a kerb P→Q is a rational point; it is
snapped to the 1 cm lattice (§3.2 (1)). For a generic kerb there is no lattice point on the segment at all — 61 % of
edges have gcd(|dx|, |dy|) = 1 — and in the executed check 99.8 % of snapped feet lie strictly off the parent edge, by
up to 0.70 cm. In L3 the kerb copy is re-routed through the snapped foot; about half the feet land on the corridor side,
so the plot face protrudes up to 0.7 cm into the neighbouring L2 corridor face. The hard invariant "every L(n+1) face
inside one L(n) face" (§5.3) is tested with exact predicates, so it fails on essentially every block; hard invariants
abort the batch, and no F-row repairs it (F-NUM's "perturb by one lattice unit" moves the foot to another off-edge
lattice point; F-PLOT merges plots). The same happens at every inherited edge a finer level must touch: junction-wedge
boundaries meeting a spine (L1→L2), footprint corners on plot lines (L3→L4), a bridge spine splitting a shoreline
inherited from L0 (L0→L1), and stage-2 close-ups whose plots meet a base-owned shared kerb (II.1 promises "Hausdorff 0 by
construction"). §13.1's property "`splitFace` children areas sum to the parent within 1 cm²" fails in 99.6 % of splits
(the re-routing triangle is p50 ≈ 300 cm², p90 ≈ 900 cm²). Separately, §2.3 exports terrain level sets into L0 "as
faces", so an L1 block that straddles a contour has no single L0 `parent`.

**Evidence.** ARCH §2.2 (separate DCELs per level sharing one lattice; "every L2 face nests in exactly one L1 face"; "a
transaction on L3 never touches L1 memory"), §3.2 (1), §5.3 (nesting invariant, hard, abort the batch, 0 per 1 000
cities — O3 (b)), J-6 and D-13 (the strict tree is deliberate; reversal "high after M1"), §13.1, II.1, II.5.
Arithmetic, executed by this seat (`scratchpad/nesting_check.py` → `.out`): 200 000 random kerb edges of 5–60 m in a
5 km frame, foot at t ∈ [0.05, 0.95]: gcd = 1 share 0.610; snapped foot off the edge 0.9977; offset p50 0.23 cm, p90
0.46 cm, max 0.70 cm; re-routing triangle > 1 cm² in 99.6 %. Reference context: the 2017 kernel moved a shared boundary
atomically in every polygon because polygons shared `Point` objects, and the OS reader's rewrite verdict asked for an
indexed arena "which gives the same atomic-move property" (`os-geometry.md` §1.1). PLAT keeps that property inside one
level and loses it across levels.

**Required change.** Make nesting exact by construction with a stated cross-level vertex protocol, then keep the strict
tree: (a) a `splitThrough(edge, latticePoint)` kernel op — any vertex a finer level needs on an inherited edge is first
inserted into every level that carries that edge (the parent edge is re-routed through the hot pixel exactly as snap
rounding does within one level; local, logged, part of the same batch) — so a child boundary is literally the parent
boundary with the same vertex ids; or (b) one shared vertex arena and edge store for all ground levels, with level-tagged
edges and per-level face records (levels become views; the atomic shared-boundary move returns). State nesting as a
topological invariant (every child boundary edge either coincides with a parent edge by vertex ids or lies strictly
inside) and check it exactly. Replace §13.1's area test with "children tile the post-split parent exactly (integer
shoelace equality)". Put terrain level sets into L0 as `contour` edges that L1 does not inherit, never as faces. Amend
J-6 / D-13 and "a transaction on L3 never touches L1 memory" accordingly. Without (a) or (b) the hard invariant has to be
loosened to a tolerance, which gives up J-6's "containment proofs are trivial".

**Why blocker although the error is sub-centimetre.** Nobody will see a 0.7 cm protrusion. What breaks is the contract
the design builds on:
* the exact hard invariant fails on almost every batch;
* J-6's "containment proofs are trivial" no longer holds;
* anything that compares one boundary across levels must fall back to tolerances — stage-2 seams, warp transport
  (GEO-10), `wallToWay` re-typing an L1 edge whose L2/L3 copies differ, and re-deriving plots against a re-routed kerb.

That reintroduces the epsilon geometry the kernel was chosen to remove. The only exact alternative is the cross-level
protocol above, which changes the level model.

**Status.** The arithmetic is CONFIRMED (executed); that a literal implementation fails the invariant on nearly every
batch is PLAUSIBLE (no kernel exists yet), but it follows directly from the executed numbers and the exact predicates the
design mandates.

### GEO-2 · blocker · A wall-clock watchdog changes the model, so the same seed gives different towns on different machines

**Failure scenario.** CITY's model budget is 252 ms p50 against 300 ms p95, "thin and PLAUSIBLE" (§12). A user opens a
seed in a background tab (timers throttled), on a mid-range laptop, or a CI runner is loaded: S10 (55 ms p50) overruns
its rung budget, the per-stage watchdog fires, and F-BUDGET-TIME's first rung switches the stage to "coarser parameters
(fewer candidates, larger cells, stop refining at the current LOD)". The plots, their ids and every site plan differ from
the same seed generated on the owner's desktop. Downstream: the K-3 snapshot re-verification reports a hash mismatch and
asks the user to choose; a permalink shared between two people shows two towns; edit-log replays re-derive different
geometry; the nightly cross-platform golden run flakes whenever a runner is busy. The kernel's own `E_TIMEOUT` result and
F-SKELETON's "timeout" detection (roof falls back to hip-from-OBB) are the same defect inside the kernel.

**Evidence.** ARCH §5.2 (F-BUDGET-TIME row: "per-stage watchdog → coarser parameters for this stage … the map is still
valid"; F-SKELETON detection "event queue inconsistency, timeout"), §3.1 (`KernelError` includes `E_TIMEOUT`), §14
(`Stage.budgetMs: Record<Rung, number>`), §12. The design contradicts itself: §6.5 (3) forbids `Date` and
`performance.now` in model packages and §6.5 (5) says "no stage reads a worker's timing", while §6.2 defines the model as
a pure function of (version, seed, params, assignments, edits) and O2 (a) / O3 (e) require identical hashes on every
engine. The one-page summary states the goal: "The same seed always gives the same town on every machine".

**Required change.** Any budget that can change output is a deterministic work budget — counts of kernel calls,
proposals, candidates, skeleton events, recursion depth — declared per stage and per entity; `E_TIMEOUT` becomes
`E_WORK_LIMIT` counted in operations. F-BUDGET-TIME is reduced to (i) reporting and (ii) deferring *when* a lazy tier is
computed, never *what* it computes: a tier deferred and computed later must hash identically. The watchdog lives outside
the model packages and may only cancel-and-resume. Add a CI test that runs the golden suite under a time-dilation shim
(for example every clock read × 10) and requires byte-identical per-stage hashes.

**Status.** CONFIRMED as a contradiction in the text (the rows are quoted); the machine-dependence follows from the
rung's own wording.

### GEO-3 · major · The 5 cm weld / 25 cm minEdge dead band rejects about one cut in ten, and F-NUM cannot repair it

**Failure scenario.** `insertChain` welds within 5 cm but "rejects (typed) any feature below `minEdge`" (25 cm). A
crossing, cut foot or plot-line end that lands 5–25 cm from an existing vertex is neither welded nor legal: the split
would create an edge shorter than 25 cm. On a Chaikin ×2 growth spine (25–40 m steps give 6–9 m segments) a random
endpoint lands in that band 5.2 % of the time; a two-ended bent cut or plot side line has a 10 % chance. S8 commits one
batch per district (dozens of cuts) and S10 one per block (about 20 plot lines), so almost every batch reaches the
ladder, and §13.5's "ladder uses ≤ 2 % of transactions" cannot be met. F-NUM's rungs do not fit this case: a perturbation
of one lattice unit or a 10 cm simplification does not move a vertex 20 cm, so the chain reaches the last rung, "reject
the chain … a proposal that cannot be inserted is simply not a street". That is acceptable for an optional growth
proposal, but not for mandatory chains: a wall trace crossing an arterial 18 cm from a vertex, a coastline, a river bank,
an arterial route, a user-drawn way or a plot line. The wall is left with a gap, the coast is missing, or a plot has no
side.

**Evidence.** ARCH §2.2 (`lattice: weldTolerance 5, minEdge 25`; rule 2), §3.1 (lattice row), §4.3 (Chaikin ×2), §5.2
(F-NUM ladder), §13.5 (last row). Executed (`scratchpad/deadband_check.out`): segment length p50 7.9 m; P(endpoint in the
5–25 cm band) 0.052; P(at least one of two endpoints) 0.101. Both references snap rather than reject: FTG's fix for editing
errors was "Improved intersection **snapping**" (157283634, `ftg-posts-c.md` §2.14), and MFCG 2017 merges junctions closer
than 8 units (`optimizeJunctions`, `_critic-os.md` row 37).

**Required change.** Add vertex attraction to `insertChain` and `splitFace`. A new vertex (crossing, endpoint or split
point) within `minEdge` of an existing vertex on the same edge snaps to that vertex, nearest first with ties broken by
vertex id. An endpoint within `minEdge` of an edge snaps onto the edge (GEO-1's `splitThrough`). Weld then merges only
hot-pixel coincidences. Split F-NUM by chain class: optional chains keep "reject"; mandatory chains get a final rung that
always succeeds (re-insert with the attraction radius, then simplify the chain to `minEdge` with topology checks). Re-state
the ≤ 2 % ladder metric once the change is in.

**Status.** CONFIRMED arithmetic on a synthetic spine model; the real rate depends on M0 geometry (PLAUSIBLE ± a factor
of two).

### GEO-4 · major · One type and one entity per half-edge cannot represent coincident features; sliver absorption deletes typed edges

**Failure scenario.** A half-edge carries one `type: u16` and one `entity: i32` (§2.2). The type list has 22 values
(twelve way classes plus ten others, §2.4), so the u16 is an enum, not a set. Yet the design makes coincident roles
normal:
* district boundaries are "always spine edges" (§2.2 rule 1), while `district_bound` and `way:<class>` are separate types;
* quays run along shores (§4.8);
* the wall trace is "pulled to … river banks" and F-WALL "snap[s] to the water outline";
* field boundaries run on tracks.

`insertChain` has no stated behaviour for a collinear overlap with an existing typed edge, so one role silently
overwrites the other. Example: S7 snaps the wall to a river bank; the wall chain overlaps the `bank` edges. Either the
wall stops being a wall (the "walls not crossed by streets except at gates" invariant and the wall export miss it), or the
bank stops being a bank (shore classes and water rendering are lost). Separately, sliver faces are "merged into the
neighbour with the longer shared boundary", which removes the shared edge. When a sliver lies between a spine and a
shoreline, a wall or another way, the removed edge is a typed feature. Example: an S5 spine runs 20 cm from a shore for
30 m; the sliver is absorbed and the way's spine loses 30 m, so routing, betweenness and the corridor union all see a gap.

**Evidence.** ARCH §2.2 (`halfEdges.type: Uint16Array`, `entity: Int32Array`; rule 1), §2.4 (type list), §3.1 (sliver
merge), §4.8, §5.2 (F-WALL, F-CORRIDOR). Reference: FTG's road graph carries the water outline as edges (type 14), and
120 of those edges double as lot edges (`_critic-ftg.md` F9). Coincident roles are ordinary in a city graph.

**Required change.** Store a role set per edge: a short sorted list of (role, entity) pairs in a side table, instead of
one type and one entity. `insertChain` detects collinear overlap and merges roles onto the existing edges, never
duplicating them and never overwriting. Sliver resolution collapses the two near-parallel chains into one chain that
carries both role sets (edge collapse) and never deletes an edge whose roles include a way, wall, shore or bank. Add
fixtures: a wall snapped to a bank, a quay on a shore, a street on a district boundary, a track on a field boundary.

### GEO-5 · major · Raw arena indices are persisted in entity records, seam contracts and edit events, with no lineage on split, merge or weld

**Failure scenario.** Entity records store raw kernel indices:
* half-edge ids: `Way.spine`, `Enceinte.trace`, `Plot.frontage`, `access`, `partyWalls`, `Frontage.edge`,
  `Building.entrance.edge`, `BuildingSlot.entranceEdge`, `SeamEdge.edge`, `SeamReport.fieldJumps.edge`;
* vertex ids: `Junction.vertex`, `Tower.vertex`;
* in the edit log: `moveVertex.v` (a `VertexId`) and `regenerate.scope.faces` (`FaceId[]`), plus `Scope{faces}` in the
  API.

The kernel promises stability only for face ids "across insertions that do not touch them" (§2.2 rule 2). Every split,
merge or weld renumbers the half-edges involved. S8 alone inserts hundreds of T-junctions into existing way spines per
city, so `Way.spine` goes stale during generation, not only after edits:
* **Generation.** Street e is split into e1 and e2 by a lane junction, but the way still lists e. The display list, the
  GeoJSON way and the label spine cover half the street.
* **Upgrade replay (§7.5).** A logged `moveVertex(v = 812)` lands on vertex 812 of the new arena, which is a different
  vertex, so an unrelated plot deforms.

FTG hit this class: after map edits its district re-roll "would stop working" because stale graph state held two
intersections at one position (153121107).

**Evidence.** ARCH §2.4–§2.7 interfaces, II.1 (`SeamContract`, `SeamReport`), §7.1 (`EditEvent`), §14 (`Scope`), §2.2
rule 2; `ftg-posts-c.md` §2.14.

**Required change.** Geometry references become kernel-maintained handles, in one of two ways:
* **(a) Lineage.** Every split, merge or weld inside a batch emits old→new half-edge mappings, and every stored chain is
  rewritten before commit. An invariant checks that every stored handle resolves.
* **(b) Walked chains.** Chains are stored as role tags on edges (GEO-4) and resolved by walking.

Edit events address geometry by stable entity id plus a quantised world position, as §7.4 already does for strokes, and
never by `VertexId` or `FaceId`. `Scope` uses entity ids or a region ring. B-EDIT gains the property "0 dangling or stale
handles after every batch".

### GEO-6 · major · `splitFace` does not define contact for the degenerate cases the lattice makes common

**Failure scenario.** `splitFace` enforces "exactly two boundary crossings". The design does not say how to count the
cases an integer lattice produces routinely, and each can be counted as 1, 2 or 3; the wrong count either rejects a valid
cut or commits a pinched or non-manifold face:
* an endpoint on an edge interior, or just off it after snapping (GEO-1);
* a cut through an existing vertex;
* a cut grazing a reflex vertex (touching without crossing);
* a collinear overlap with a boundary edge;
* a cut crossing or ending on an antenna (a cul-de-sac spine or a drainage line dangling inside the face);
* a cut from the outer ring to a hole — the §4.6 "slit" — which gives two crossings that join two boundary cycles
  instead of splitting the face.

Examples:
* **Reflex graze.** On a rectilinear block with lattice-aligned edges, the perpendicular from the start edge passes
  exactly through the reflex vertex of an L-shaped block. Counted as two crossings, it commits a face pinched at the
  vertex with a dangling tail; counted as three, it is rejected and falls down the ladder to rung (d) (GEO-23).
* **Cul-de-sac.** The suburb regime keeps dead ends on purpose (§4.4). Every cut that crosses one inside its face is
  rejected, although ending on the dead-end street would be the natural T-junction.
* **Hole slit.** Step 5's "reject if either child violates …" has only one child to check.
* **Export.** A face that keeps an antenna has a boundary walk that retraces the slit. Exported as a
  GeoJSON Polygon it is a self-touching ring, which fails the O11 (d) validator and QGIS load unless the exporter
  drops the antennae.

**Evidence.** ARCH §3.4 (`splitFace`), §3.5, §4.6 step 5 and "Holes", §4.4 (dead ends kept; only chains shorter than one
block width are pruned), §2.3 (drainage lines as typed L0 edges). Reference: the 2017 `cut()` returned its input silently
on ≠ 2 crossings, "including count > 2 on a concave polygon" (`os-geometry.md` §2.1.5). Its `buffer` skipped crossings "at
or very near an endpoint" behind a parameter-space guard and could leave polygons self-touching (§2.1.4 (c)).

**Required change.** Specify contact semantics:
1. The cut touches the face boundary only at its two endpoints.
2. An endpoint is a boundary vertex or a point on an edge, inserted by `splitThrough`.
3. Any interior contact (vertex graze, collinear overlap) is `E_NOT_TWO_CROSSINGS`.
4. Antenna edges count as boundary for endpoints, so ending on one is a declared T-junction.
5. Hole-joining cuts are a separate op, `connectHole(face, cut)`, with its own post-condition (same face count, one hole
   fewer).
6. The GeoJSON exporter emits a face's area boundary without its antennae.

Add a constructive fixture for each case (GEO-12).

### GEO-7 · major · The null-OBB class survives: the OBB contract contradicts itself, and NaN or ±∞ silently become vertices at the origin

**Failure scenario.** §3.1's OBB row says both "< 3 non-collinear points → `Degenerate`" and "collinear hull → OBB with
zero minor extent, reported". Under the second branch, a residue that is a 30 cm × 20 m sliver after claims returns
`ok` with a zero minor extent. The fraction along that axis is then (p − min)/(max − min) with max = min, which is NaN;
the snapped foot is (NaN, NaN), and `Int32Array` stores it as (0, 0). A plot line runs from the block to the world origin
and crosses hundreds of edges: at best an `E_SELF_INTERSECT` with a misleading cause, at worst a spike. Why the guards
miss it:
* the only stated guard is `Number.isInteger` "in debug builds";
* a range check written as two comparisons (x ≥ L ‖ x ≤ −L) lets NaN through;
* ±Infinity also becomes 0, and values beyond 2³¹ wrap.

MFCG's live build crashed on exactly this class ("the variable `rect` ends up null", 61026228).

**Evidence.** ARCH §3.1 (OBB row; `E_OUT_OF_RANGE`), §2.2 (`Cm`, "asserted `Number.isInteger` in debug builds"), §3.2 (1).
Executed with Node: `Int32Array` [NaN, Infinity, 2³¹+5] → [0, 0, −2147483643]; the two-comparison check does not flag NaN,
while `!(Math.abs(x) < 2**23)` does. References: `mfcg-posts-b.md` §2.3; the 2017 `MathUtils.sign(NaN) = +1` swallowed NaN
into sort orders (`_critic-os.md` row 132; `os-geometry.md` §4 item 5).

**Required change.**
* One OBB contract: a collinear hull or fewer than 3 distinct points returns `Degenerate`, never `ok` with a zero extent.
* Every ratio in the kernel and the stages goes through a checked-division helper that returns a typed result.
* The snap function rejects non-finite and out-of-range values in all builds (`!(Math.abs(x) < 2**23)`, one compare per
  coordinate) with `E_OUT_OF_RANGE`.
* Fixtures for collinear hulls and zero-area residues.

### GEO-8 · major · The straight skeleton's "exact rational event times" are impossible; near-simultaneous events are the normal case for roofs, and nothing validates the output

**Failure scenario.** In the Euclidean straight skeleton every edge moves at unit speed along its unit normal, so event
times involve √(dx² + dy²) of lattice edge vectors. That is irrational for almost every integer direction, so "an event
queue on exact rational times scaled to the lattice" (§3.1) cannot be built as written.

Simultaneous events are the rule for roofs, not an edge case: every rectangle has two simultaneous edge events and a
square has four. After snapping, only 33 % of rotated squares with non-integer centres stay tangential (single apex). The
rest split the apex into a micro-ridge whose orientation depends on sub-centimetre rounding, so a 1 cm edit or a warp can
flip it; hatching drawn from the ridge follows the flip.

F-SKELETON detects failure by "event queue inconsistency, timeout". A timeout is non-deterministic (GEO-2), and
inconsistency detection is not specified; the usual failure of a numerically fragile skeleton is a silently wrong graph
(crossing arcs), which then flows into roofs, label spines and glTF roofs. That is MFCG's own "glitches in special cases".

**Evidence.** ARCH §3.1 (skeleton row), §4.7 S11 (hip by straight skeleton on every footprint), §9 (label spines), §11
(glTF roofs), §5.2 (F-SKELETON). `_critic.md` spot-check 20 (101173551: own O(n²) skeleton, "glitches in special cases").
Executed (`scratchpad/pitot_check.out`): rotated squares 4–12 m with non-integer centres stay tangential in 33.4 % of cases;
|a + c − b − d| reaches 1.4 cm at p90. A convex quadrilateral's skeleton has a single interior node only if it is
tangential (Pitot).

**Required change.**
* State the numeric strategy honestly: event times in doubles using only + − × ÷ √ (deterministic across engines), a
  world-length coalescing tolerance (events within about 1 mm of time and 1 cm of position merge), and ties broken by
  vertex id.
* Regularise near-rectangular footprints: within ε of a rectangle, the roof comes from the OBB (hip-from-OBB with an
  exact apex or ridge). That covers most footprints; the skeleton is kept for genuinely irregular outlines and label
  spines.
* Add a post-condition validator: the skeleton graph is planar, each face is monotone to its edge, heights are
  consistent. A failure triggers the typed downgrade under a work-count limit, not a time limit (GEO-2).
* Fixtures: squares and rectangles at every centidegree from 0° to 90°, regular n-gons, equal-width strips.

### GEO-9 · major · Two boolean engines with different numerics ship, and the fallback cannot offset

**Failure scenario.** The design ships Clipper2 via WASM plus a pure-JS "fallback", `polygon-clipping` (D-14 "with a
pure-JS fallback"; §14 "Clipper2 WASM | polygon-clipping"; §17 "fallback `polygon-clipping`"). Its own test concedes that
the two differ ("cross-backend boolean equality … within one lattice unit", §13.1). Any host where the fallback runs
produces a different model hash for the same seed:
* no WASM support;
* an embedding page whose Content Security Policy lacks `'wasm-unsafe-eval'`;
* a failed WASM instantiation.

The fallback also has no offsetting, so `corridorUnion`, `offsetFace`, `insetRing` and `bufferChain` have no
implementation on that path. The deferral ("the boolean library choice (M0 benchmark)") covers which library wins; it
does not cover shipping a second engine at runtime.

**Evidence.** ARCH §1.7 (numeric core), §3.1 (booleans and offsetting rows), §13.1, §14, §17 (licence table), D-14,
deferrals list. `polygon-clipping` exposes union, intersection, xor and difference, with no offset (library API; M0's
adapter spike should confirm). FTG uses a WASM Clipper (`js-angusj-clipper`, `ftg-posts-b.md` T-17).

**Required change.** One geometry engine per generator version, identical on every host: either Clipper2 everywhere (WASM
or a pure-TypeScript port), with a hard, reported failure rather than a fallback when it cannot load, or a pure-TS port as
the only engine. `polygon-clipping` stays only as a CI test oracle. Changing the engine is a generator-version bump with a
declared golden shift. The §13.1 cross-backend test becomes a differential test, not a claim of equivalence. Record this
in D-14.

### GEO-10 · major · The vertex-move predicate for smoothing and warp is wrong, and warp has no level across five separate DCELs

**Failure scenario.** Smoothing ("never moves a vertex across another edge (the step is halved)") and warp ("a move that
would cross an edge is halved until it does not") validate moves per vertex. That predicate misses two cases:
1. **Swept edges.** A vertex can move without crossing any edge while its incident edges sweep over another vertex,
   creating crossings.
2. **Simultaneous moves.** A brush moves many vertices at once. Two vertices on either side of a 3 m gap, each pulled
   1.8 m inward, never cross the other's old edge, yet the final edges cross.

The `warp` event has no `level`. MFCG's warp deforms streets, blocks and buildings together (its polygons shared vertex
objects). PLAT's levels are separate DCELs, so one of two things happens:
* per-level, per-vertex halving moves a shared boundary by different amounts in L1, L2, L3 and L4, and the levels diverge
  (nesting fails, GEO-1); or
* only L1 moves and everything under the brush is regenerated on every stroke — buildings re-rolled, which is not a warp.

**Evidence.** ARCH §3.1 (curves row), §3.4 (`warp` op), §7.1 (`warp` event, no level field), §7.4 (moveVertex/warp row).
MFCG's stated warp semantics (`_critic.md` C4/C5). `os-geometry.md` §1.1: mutating a shared `Point` moved every polygon
that shared it, atomically.

**Required change.**
* A move-validity predicate on the whole step: apply all of the step's moves on the overlay, then test every edge
  incident to a moved vertex against the index (including the other moved edges) and every unmoved vertex against the
  swept triangles.
* On failure, halve the whole step's strength (global and deterministic), bounded by the integer step reaching zero.
* Warp is a displacement field applied to a declared level set (L0–L1 by default). Finer levels are transported by the
  same field — vertices on inherited edges move with their parent through GEO-1's shared-vertex protocol — and only
  faces that then fail an invariant are re-derived, with a log entry.
* Add the level to the event schema.

### GEO-11 · major · Weld makes the plat depend on insertion order, so the locality oracle and the K-3 load check cannot pass for geometric edits

**Failure scenario.** Pure hot-pixel snap rounding is order-independent. Weld-to-nearest-existing-vertex ("duplicates
welded within 5 cm") and the `minEdge` rejection are not: inserting A then B gives different vertices from B then A.

The design needs order independence twice:
* **§7.3's locality oracle.** "The incremental result's model hash equals a from-scratch regeneration's hash" on every
  B-EDIT sequence; the M3 exit requires it green.
* **The K-3 load check.** It re-derives a snapshot's hash.

A drawn way is inserted interactively into a finished town, but on replay it is inserted "before the stage that would
create the class" (before S4, §7.2), so every S4/S5 chain then welds against it in a different order. The hashes differ,
and the oracle either fails or is weakened to "replay equals replay", which tests nothing about locality. Every edited
document's K-3 check would then report a spurious mismatch to the user.

**Evidence.** ARCH §2.2 rule 2, §3.1 (lattice row: iterated snap rounding plus weld), §7.2, §7.3, §2.9 (K-3 policy),
§13.2, §16 (M3 exit).

**Required change.**
* Make insertion canonical within a batch: sort candidate chains by stable key before inserting them, use lattice snap
  rounding for topology, and compute vertex attraction (GEO-3) in that canonical order.
* Define the interactive path for drawn constraints to be exactly the replay path: re-run from the constraint's stage for
  the affected scope only, with the same batch order.
* State the oracle as "replaying recipe + log in log order equals the session state", with a separate "everything outside
  the scope is byte-identical" locality test.

This overlaps the lifecycle lens (the replay path); the geometric cause, order-dependent weld, belongs here.

### GEO-12 · major · B-FUZZ's random inputs almost never hit exact degeneracies, and two of its stated properties are wrong

**Failure scenario.** B-FUZZ throws 10⁶ random polygons per primitive. Exact degeneracies are vanishingly rare under
random integer sampling:
* a lattice point exactly on a segment;
* three collinear vertices;
* a cut through a vertex;
* collinear overlapping edges;
* simultaneous skeleton events;
* a coordinate exactly on a quantisation boundary.

A line across a 2²⁴ frame holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with
probability ≤ 2⁻²⁴. O3 (a) ("0 crash / hang / self-intersection") can therefore pass while every degenerate case of GEO-4,
GEO-6 and GEO-8 stays untested — an unmeasurable robustness claim.

Two §13.1 properties are wrong:
* "`splitFace` children areas sum to the parent within 1 cm²" fails in 99.6 % of snapped splits (GEO-1).
* "The straight skeleton a tree inside the face and hole-aware" cannot hold: the skeleton of a polygon with h holes has h
  independent cycles.

**Evidence.** ARCH §13.1, §5.2 (F-NUM test column), §15.2 (O3 (a)); `scratchpad/nesting_check.out`.

**Required change.**
* Constructive degeneracy generators, held to the same 0-crash / 0-invalid bar: points placed on segments by gcd
  stepping, collinear overlaps, cuts through vertices and grazing reflex vertices, antennae, coincident typed chains,
  snapped rotated rectangles, squares and regular polygons, holes touching the outer ring at a vertex, and values exactly
  on quantisation boundaries.
* Correct the two properties: exact integer tiling for `splitFace`; for the skeleton, a connected graph whose number of
  independent cycles equals the number of holes.

### GEO-13 · major · S1's closed-outline routine has no simplicity guarantee (islands, fjords, sky islands)

**Failure scenario.** Coasts, lakes, ponds, islands and the floating-island outlines all come from one routine: a base
line or closed base curve displaced by domain-warped fBm, then resampled and Chaikin-smoothed. The amplitude envelope damps
detail only "near the town". Nothing bounds the displacement by the base curve's local feature size.

Displacement along the normals beyond the local radius of curvature folds the curve. An oval-ish sky island with semi-axes
200 × 65 m has a radius of curvature of b²/a ≈ 21 m at its ends, so any amplitude above about 21 m there folds it. A fjord
intent pushes the two sides of a narrow inlet into each other. Chaikin does not undo a fold.

Once inserted into L0, the kernel "splits self-touching chains into simple runs", producing extra enclosed loops whose
land/water type is undefined: a pocket of sea inland, a speck of land in the sea, or an island outline that splits into
two islands. Alternatively F-NUM rejects the chain and the requested coast or island is missing.

**Evidence.** ARCH §4.2 S1 (2): one routine for coast, lakes, ponds, islands and the sky-island outline; envelope near
the town only. §3.1 (self-touching chains split into simple runs), §2.1 (layers), §2.7 (`SkyIsland`). References: FTG — a
user drawing a single self-intersecting ocean shape "broke some of the logic in the server", now prevented at draw time
(153121107, `ftg-posts-c.md` §2.12). VG discards maps whose generated highway "intersects itself" (`_critic-vg-ng.md` P1).
Both creators met self-intersecting generated or drawn curves and handled them by rejection.

**Required change.**
* Bound the displacement so the outline is simple by construction: displace along normals by at most about 0.8 × the
  local feature size (the distance from the base curve to its medial axis on the displaced side).
* Otherwise, repair with a union (non-zero fill) that keeps the component holding the anchor (the town, or the island
  centre) and types the rest by a declared rule, with a report entry.
* Property test: 10 000 outlines per intent (bay, headland, fjord, islands, sky island) with 0 self-intersections and 0
  untyped loops.

### GEO-14 · major · "Contours and coast agree by construction" is false, and the hard invariant that polices it has no ladder

**Failure scenario.** The heightfield is a 5–10 m raster. S1 draws the coast as a centimetre-precision vector polygon and
then "lowers the heightfield below sea level on the sea side". Marching-squares contours are interpolated between cell
centres, so they run on both sides of the vector coast:
* wherever the coast crosses cells diagonally;
* around every spit or inlet narrower than a cell;
* on cliff and steep coasts (bank class `cliff`), where every contour level between the lowered sea cell and the
  cliff-top land cell is squeezed into the last cell and crosses the vector coast again and again.

"Contours never cross a shore" is a hard invariant (§5.3), and no F-row repairs it. The S1 batch aborts, and because the
design has no whole-map retry, a coastal town on a steep coast is not produced at all — and a coast is the site model's
default request.

**Evidence.** ARCH §2.3 (raster 5/8/10 m; level sets exported to L0), §4.2 S1 (2) ("then the heightfield is lowered below
sea level on the sea side, so contours and coast agree by construction"), S1 (7) (bank classes incl. cliff), §5.3, §5.2 (no
F-row), §15.2 O1 (b) / R11. The reference that achieves agreement does it the other way round: VG's water outline is a
level set of the same carved field ("the water body is extracted from the carved field afterwards", `_critic-vg-ng.md`
V2; ponds are level sets, V8).

**Required change.** Either:
* **(a)** make the shoreline a level set of the same field, VG's way: rasterise the coast intent, extract the coast at sea
  level by marching squares, and smooth it only within the cell; or
* **(b)** keep the vector coast, but give coastal land cells a monotone ramp at or above sea level + ε, and clip every
  contour to the land faces in vector space before emission.

Replace the abort with that construction plus a clip rung, and add a steep-coast fixture. Option (b) leaves short contour
ends on beach coasts; (a) is the principled fix.

### GEO-15 · major · Terrain heights in `Int16Array` centimetres overflow at 327.67 m, and flats after priority-flood are unresolved

**Failure scenario.** `Terrain.heightCm` is an `Int16Array` "above datum", so it covers −327.68 to +327.67 m. Typed-array
stores wrap silently. Yet the design offers "hilly / mountainous" relief characters, hill, spur and cliff primitives and
a `hill-acropolis` form.

A hill town, an Alpine valley, or a coastal town whose datum is sea level with 400 m hills behind it all exceed that range.
A 400 m summit is stored as −255 m. Priority-flood then fills that pit into a lake on the mountain top, D8 routes rivers
through it, and O1's "0 non-monotonic beds" is satisfied on corrupted data.

Separately, priority-flood creates flats (filled depressions, lake surfaces) where D8 flow direction is undefined unless
a flat-resolution rule is given, and the design gives none.

**Evidence.** ARCH §2.3 (`heightCm: Int16Array /* above datum */`, D8 with sinks filled), §4.2 S1 (1) and (3), §7.7 forms
(`hill-acropolis`). Executed with Node: `Int16Array` [40000] → −25536. "Mountains aren't properly supported yet" is FTG's
weakness that O1 is meant to answer (`_critic-ftg.md` §2).

**Required change.**
* Store heights as `Int32` centimetres, or `Int16` decimetres with a declared ±3.2 km range, relative to a per-document
  datum, with a range check that reports instead of wrapping.
* Specify flat resolution after priority-flood (an ε-gradient of 1 cm per cell toward the spill point, or Garbrecht–Martz),
  so D8 is defined everywhere.
* Add mountainous-relief fixtures to S1's tests.

### GEO-16 · major · S4 smooths each route separately, so shared runs become braided near-duplicate spines

**Failure scenario.** S4 routes each destination pair on its own (plaza ↔ each external bearing, each crossing site, the
harbour, the castle). Each path is simplified with Visvalingam, smoothed with Chaikin ×2, curvature-limited, and then
inserted as spines.

Routes that leave the plaza toward neighbouring bearings share lattice edges for hundreds of metres, because they run on
the same cost surface from the same source. Per-route simplification and smoothing keep different vertices on each copy,
so the shared run becomes two or three near-parallel spines a few centimetres to a few metres apart. They weld where
closer than 5 cm, cross each other repeatedly, trip the dead band (GEO-3), and enclose sliver faces that are absorbed with
an edge deleted (GEO-4) — the "duplicate road intersections" class.

The 8 m junction merge moves vertices but is validated only at commit, and S4 commits the whole backbone as one batch, so
a single bad merge rejects the backbone.

**Evidence.** ARCH §4.3 (per-route simplify and smooth, "junctions welded", merge under 8 m), §4.1 (S4 commits one batch).
References: MFCG 2017 needed `tidyUpRoads` to de-duplicate the central runs that streets to different gates share (every
street runs plaza → gate, "so the central corridors shared by several streets … are de-duplicated", `_critic-os.md` C6,
S8). FTG: "two different intersections could have the same world position … this breaks things" (153121107).

**Required change.** Build the arterial network as a graph first:
1. Overlay all routes on the lattice and take the union of the lattice edges used, with route multiplicity.
2. Split the union at nodes of degree ≠ 2 and apply the 8 m junction merge on this graph, before any geometry.
3. Simplify and smooth once per graph chain between (pinned) junctions, and set class and width from multiplicity or
   betweenness.
4. Insert each chain exactly once.

Test: no two spines closer than the class separation over more than one step length.

### GEO-17 · major · Bridges must be within ±10° of the channel normal (a hard invariant), but nothing constructs that angle

**Failure scenario.** S4 routes arterials across rivers on a jittered hexagonal lattice (edge directions 0°, 60°, 120°
plus jitter), then smooths the path. The crossing angle therefore depends on where the destinations lie, not on the river.
§4.8's "deck perpendicular to flow ± 10°" describes the deck, not how the way reaches it. There are two readings of the
invariant "bridges within ± 10° of the channel normal", and both fail:
* **Read on the way,** most crossings miss ±10°. No F-row handles the violation, so the batch aborts on river towns.
* **Read on the deck,** it holds trivially while the way's spine crosses the water at another angle. The drawn road then
  leaves the deck over water, or bends on it, and the corridor and the deck disagree.

**Evidence.** ARCH §4.3 (lattice, A\*, Chaikin ×2), §4.2 S1 (5) (crossing sites), §4.8 (water furniture), §5.3 (hard
invariant), §5.2 (no ladder for it). VG makes bridge angles "as right as possible" (89314043; `_critic-vg-ng.md` S8).

**Required change.** Make crossings constructive:
* S1 (5) emits each crossing site as a pinned bank-to-bank deck segment perpendicular to the local flow.
* S4 routes to the deck's endpoints — the deck is a fixed edge of the routing graph — with approach curves limited by the
  class radius; smoothing never moves deck vertices.
* An F-ROUTE rung moves the site along its reach when the approaches cannot meet the radius.

The invariant then holds by construction.

### GEO-18 · major · The wall trace is drawn after streets and districts and pulled up to 40 m: ungated secondary crossings have no remedy

**Failure scenario.** The enceinte is traced from the growth-stage boundary after S5 has grown that stage's secondary
streets and after S6 has typed its districts, then "pulled to defensible ground within a 40 m search band". Wherever the
pull moves inward, the trace crosses secondaries that are not arterials.

"Walls not crossed by streets except at gates" is a hard invariant. F-WALL's rungs — re-offset with a larger radius,
union-simplify, snap to the water outline, divert excess arterials — do not cut or divert secondaries. The only rung that
clears them, a larger radius, throws away the defensible-ground pull, so the flagship "defence as an explicit constraint"
silently degrades.

Faces split by the trace belong to districts typed before the wall existed, so districts straddle the wall: `validateEdge`'s
"no wall line" was checked against a wall that did not exist yet. The trace's Visvalingam step (20 m minimum segment, no
angle under 100°) is not topology-preserving, so it can also cut across water or spines.

MFCG avoided this by ordering: walls first, then streets routed with wall vertices blocked except at gates. PLAT reverses
the order and loses that guarantee.

**Evidence.** ARCH §4.1 ("S7 runs once per walled growth stage, after S6 has typed that stage's districts"), §4.4 ("the
boundary is the wall candidate of S7"), §4.5 (`validateEdge`), §4.8 (pull and simplification), §5.2 (F-WALL), §5.3.
References: MFCG 2017 builds walls before streets and blocks "citadel vertices ∪ wall vertices − gates" (`_critic-os.md`
row 61 and the §4.2 order). FTG's ungated crossings (6 and 2, cited in ARCH §13.5) are the weakness O8 claims to remove.

**Required change.**
* Compute the pulled, smoothed, simplified trace in S5's boundary step, before growth, and use it as the growth boundary,
  with gates reserved where arterials cross.
* S5 legality then forbids non-gate crossings: proposals stop at the setback band or become posterns by rule.
* S6 treats the trace as a barrier.
* Make the simplification topology-preserving (skip any removal that would cross water, a spine or the trace itself).
* Add a last, reported F-WALL rung: cut the way at the setback band and prune the outer stub if it is shorter than one
  block width.

### GEO-19 · major · Harbour basins, moats and canals are carved into L0 after the streets and districts already cover that ground

**Failure scenario.** In S7 the harbour basin is "carved from the waterfront district", a moat is added around the castle,
and canals are routed "along a chosen way". By then S4 arterials and S5 secondaries occupy that ground and S6 has typed the
waterfront district. The carve inserts L0 water faces beneath existing L1 spines and faces:
* spines end up in the water;
* the waterfront district's faces are cut;
* quay ways drawn on the new shore put half their corridor over the water (GEO-4);
* no rule says which spines are cut, rerouted or deleted.

This breaks the design's own principle, "water before roads … so nothing is ever placed in a river".

**Evidence.** ARCH §4.8 (basin, moles, quays, piers; moat; canals), §4.1 (S7 after S6), §4 (plain-words order rationale),
§4.2 S3 (the harbour candidate is a destination). FTG creates harbours as part of waterfront districts, before plots and
buildings (130937474; `_critic-ftg.md` F11, §2).

**Required change.** Reserve the basin, moat and canal footprints at S3, as siting claims with shapes sized from port
demand, and carve them into L0 before S4, so routing, growth and district typing all see them as water. Quays and piers
are then generated on the reserved shore. Any later carve (an edit) goes through the conversion path, with explicit
cut / reroute rules and lifecycle events.

### GEO-20 · major · The kerb is built three different ways, and per-edge insets of concave faces have no primitive

**Failure scenario.** Three constructions of the same kerb disagree.
* **S8** cuts on "F after `insetRing` by the corridor half-widths". Per-edge distances exist only on §3.1's convex
  half-plane path; the concave path is a Clipper offset with one distance.
* **S9** builds the kerb by buffering each spine with its own half-width (round joins), unioning per class, and
  subtracting from the L1 faces.

This goes wrong in three ways:
1. **No primitive.** A concave L1 face bounded by mixed classes — an arterial on one side, secondaries on the others,
   the usual face in organic growth — has no primitive that insets it correctly. The 2017 author's own offsetter had
   exactly this limit.
2. **Near-collinear edges.** The half-plane inset gets them wrong. A secondary kinks by 2° into a narrower lane (Δd = 3 m
   of half-width): the two offset lines meet about Δd / sin 2° ≈ 86 m away, so the wider street's offset governs the
   whole narrow edge and the block is set back 5 m instead of 2 m along it.
3. **Different kerbs.** S8 sizes blocks and places cut feet on one kerb, and S9 then materialises another: rounded
   corners where S8 had mitred ones. Blocks that passed S8's band test come out narrower than the band after S9, feet
   land inside junction wedges, and sub-`minEdge` edges appear at corners.

**Evidence.** ARCH §3.1 (offsetting row), §3.4 (`offsetFace`, `insetRing`, `corridorUnion`), §4.6 ("after `insetRing` by
the corridor half-widths"), §4.7 S9. The 2017 author on this operation: `shrink` "Works very well for convex polygons, not
so much concave ones"; `buffer` is "kind of reliable … but only if all distances are equal. Otherwise weird 'steps' are
created" (`os-geometry.md` §2.1.4 (b), (c)). NG builds the corridor as part of the cut (`ExPolygon.not`,
`_critic-vg-ng.md` V19).

**Required change.**
* Define the kerb once, as a kernel function: kerb(L1 face) = face − ⋃ buffer(spineᵢ, half-widthᵢ), with the declared
  joins (the S9 construction).
* S8 partitions the L2 built blocks that this function produces: materialise S9 for the district's coarse spines first,
  then update L2 locally with the same function after each accepted cut.
* Keep the per-edge half-plane path out of the kerb pipeline; use it only for uniform convex insets.
* Test that S8's working polygon equals S9's committed block (Hausdorff 0).

### GEO-21 · major · S8 turns NG's drawing rule into model topology: cut spines end at the kerb, not at the crossed spine

**Failure scenario.** §4.6 step 7 — "ends stop at the crossed corridor's edge (BG-2 rule 5)" — together with cutting on
the inset polygon places every cut's ends on a kerb. Yet the cut "is inserted as a lane / alley spine" in L1. A spine that
ends at a kerb does not reach the L1 face boundary (the neighbouring spines), so it is a dangling antenna:
* the L1 face is not split, and "recurse on both children" has no children;
* the lane is not connected to the street graph, so the junction census, betweenness, routing and the T-junction share
  (R3) all miss it;
* S9's round end-cap pokes into the crossed street's corridor.

**Evidence.** ARCH §4.6 (inset polygon; step 7; "Cuts are inserted as lane / alley spines, so lanes are real ways in the
same graph"). `profile-neighbourhood.md` BG-2 item 5 ("Ends stop at the crossed road's corridor edge") and BG-4 item 9
("**Draw.** Stop each end exactly half the crossed road's width from its centreline") — a drawing rule. PF-1 step 1: to
rebuild NG's planar graph, each junction end had to be "extended along its last segment to the crossed road's centreline
and inserted there as a node". NG's topology is at the centreline.

**Required change.** In the model, extend each cut end along its arrival direction from the kerb to the crossed spine and
insert a T-junction there with `splitThrough`, so the L1 face splits and the lane joins the graph. Keep "stop at the
corridor edge" as the renderer's stroke rule (square caps at the kerb), which S9's corridor union and junction wedge
already produce.

### GEO-22 · major · The bent cut's rules are undefined on curved, round-joined kerbs and on non-quadrilateral faces

**Failure scenario.** The bent cut is specified with sides and edges:
* "one of the two OBB-major-parallel boundary runs";
* "leave perpendicular to the start edge";
* "arrive perpendicular to the far edge";
* "within 2.5° of perpendicular".

NG measured these on faces whose sides are straight runs: the analysts broke sides at every turn of 1° or more and
replaced fillet arcs by virtual corners. The fusion puts the cut inside different kerbs:
* Chaikin ×2 smoothed, curvature-limited arterials;
* curvature-continuous grown secondaries, with segments of 6–9 m and every vertex turning;
* round-joined corners with sub-metre arc segments.

There each "side" is a single short segment, and "the far edge" is whichever 1–9 m segment the ray hits. The perpendicular
follows segment noise, the 2.5° straight-or-bent test flips at random, and the ≥ 85° arrival statistic is measured against
a noisy reference. Triangles, pentagons, C-shapes and holed faces have no "two major-parallel runs" at all. NG's own
statistics are already looser on its curved ring faces.

**Evidence.** ARCH §4.6 steps 1–3, §4.3 (Chaikin ×2, curvature limit), §4.4 (curvature-continuous headings).
`profile-neighbourhood.md` PF-1 step 4 ("Sides are maximal straight runs, broken at every vertex that turns ≥ 1°"; E3
replaces fillet arcs), PF-3 (the OBB minor axis; ring faces looser, open item 3), AN-2 (ring σ 0.098 against 0.066 on plain
faces), AN-3 (the far side found by the perpendicular ray in 66 %). `scratchpad/deadband_check.out` (Chaikin ×2 segments
p50 7.9 m).

**Required change.**
* Define what the rules read. A face's "sides" are maximal runs whose cumulative turning stays within a tolerance (say
  10°), and a side's direction is its chord.
* "Perpendicular to the start / far edge" uses the run's chord, or a ±5 m tangent window, never the segment hit.
* Define the start and far sides for non-quadrilateral faces: for example the two runs with the greatest projected length
  on the OBB major axis, with the far side the run hit by the perpendicular ray from the start foot (AN-6).
* Add curved and round-joined faces to M0's fixtures, and measure the NG signature on them before calibrating; the
  current bands come from straight-sided faces.

### GEO-23 · major · The F-CUT ladder turns large concave faces into single court blocks — MFCG's "empty areas inside walls" returns

**Failure scenario.** The ladder's rung (b), a straight cut on the mean normal, and rung (c), "the axis cut through the
OBB centre", assume near-convex faces. For an L- or C-shaped face, or one holding a cul-de-sac antenna, the OBB centre can
lie outside the face and the axis line crosses the boundary four times, so rungs (a) to (c) fail together.

Rung (d) then makes the whole face "a block with a court, green or landmark interior". For a large coarse face (0.5–1 ha),
S10 lays plots only to the band depth along the frontage and leaves an unbuilt court of about 40 × 40 m in the middle —
MFCG's stated glitch. Nothing bounds the size of a face that may take rung (d), and §3.5's table does not list this
failure class.

**Evidence.** ARCH §4.6 step 5 (ladder), §5.2 (F-CUT), §5.1 (tier 5), §3.5, §4.4 (dead ends kept). MFCG 87882877: "Empty
areas where they clearly shouldn't be, e.g. inside city walls"; 98918904: the empty-area glitch "remains" and is "hard to
fix" (`mfcg-posts-b.md` §2.3). FTG 133016301: the old cut "struggles to do anything with internal corners", fixed by
"first cut perpendicular to interior corners" (`ftg-posts-c.md` §2.1).

**Required change.**
* Add FTG's reflex pre-cut before the bent cut: cut perpendicular to an incident edge at each reflex corner, and split at
  antenna roots.
* Add a rung between (c) and (d) that always succeeds on a simple face: a straight cut perpendicular to the longest side
  run, through its midpoint, clipped to the face's connected component by boolean intersection.
* Allow rung (d) only for faces no larger than 2 × the band's upper block area.
* Report, per district, the share of built area left as court or green residue, with a bound (for example ≤ 5 %).

### GEO-24 · major · Frontage-first strips overlap or cross at reflex corners and concave frontages; "never emits hourglasses" is only asserted

**Failure scenario.** S10 lays plots as strips perpendicular to each frontage, to a depth of min(band depth, half the
local thickness), bends side lines to reach the rear line, and has a corner rule for convex corners only. Reflex corners
get no rule:
* a notch around a cul-de-sac corridor;
* a block wrapped around an institution's claimed sub-face;
* the inside of a curved street whose radius is smaller than the plot depth.

At these, strips from the two frontages overlap, or their side lines converge and cross before reaching depth, giving
overlapping plots or bow-tie ("hourglass") plots. §3.5's "frontage-first construction never emits them" is an assertion,
not a construction. The "no footprint overlap" hard invariant and O5 (f) ("0 self-intersecting") are then met only by the
F-PLOT fallbacks (merge, insert an alley, typed residue), which quietly erodes the "discard 0 by construction" claim.

**Evidence.** ARCH §4.7 S10 (4)–(6), §3.5 (hourglass row), §5.2 (F-PLOT), §15.2 O5 (b), (f). FTG 133016301: L-shapes,
arrowheads and hourglasses "come from buildings wrapping around interior corners of the larger lot", and its heuristics
"do not detect everything (e.g. hourglass shaped buildings)" (`ftg-posts-c.md` §2.1). NG discards 42 % of lot leaves
through a frontage filter (`_critic-vg-ng.md` V18).

**Required change.**
* Before laying strips, partition each block into per-frontage regions, either by the block's straight skeleton (each
  skeleton face belongs to one frontage edge, side lines never cross region seams, and depth is capped by skeleton
  height) or by FTG's reflex pre-cut.
* Lay the strips inside each region, and type the seam wedges as declared residue or corner plots.
* Property test on concave, notched and curved blocks: 0 overlapping or self-intersecting plots before any fallback runs.

### GEO-25 · major · S10's rear lanes write L1 from a per-block L3 batch, leaving sibling blocks stale in an unbounded loop

**Failure scenario.** S10, one L3 batch per block, inserts rear lanes "as a lane spine (back to the L1 graph, then S9
re-materialises locally)". That writes L1 from an L3 batch, against two of the design's own rules: "L(n+1) =
refine_n(L(n))" and "a transaction on L3 never touches L1 memory". The consequences:
* **Stale siblings.** The new spine splits an L1 face that may hold several built blocks whose S10 batches have already
  committed. Their plots now overlap the new corridor, so nesting and "no way centreline crosses a footprint" fail, and
  nothing re-runs them.
* **No bound.** The loop S10 → L1 → S9 → S10 has no stated limit: a rear lane can leave sub-blocks that are again deeper
  than 2 × the depth band.

**Evidence.** ARCH §2.2 rule 1 ("a transaction on L3 never touches L1 memory") and rule 4, §4.7 S10 (8), §4.1 (S10 one
batch per block), §3.3 (`KernelTx` has one level per transaction), §5.3.

**Required change.** Decide rear lanes and back lanes in S8, where the granularity table and depth bands are already known
because districts are typed before infill, so S10 never writes L1. If S10 must still add a lane, model it as a deferred
L1 edit that re-runs S9 and S10 for the whole affected L1 face in one transaction, with a declared iteration bound.

### GEO-26 · major · Row-house footprints fitted as frontage-aligned rectangles cannot share bent or curved party walls

**Failure scenario.** Row houses are "one or more footprints end to end along the frontage with party walls". The base's
outline builder makes them "an inset rectangle or L aligned to the frontage". But S10's plot side lines are bent lot cuts
and frontages curve, so neighbouring frontage-aligned rectangles cannot share the plot's party-wall edge: they leave gaps
(slivers between row houses) or overlap (walls drawn twice).

"No footprint overlap" is a hard invariant, so F-SITEPLAN downgrades the plot step by step — lower coverage, then compound,
detached, hovel, vacant — and the dense attached share the design promises collapses.

**Evidence.** ARCH §4.7 S10 (4) (bent side lines), S11 (row arrangement; "an inset rectangle or L aligned to the
frontage"), §2.6 (`OutlineBuildingGenerator`), §5.2 (F-SITEPLAN), §5.3, §13.5 (NG 95–99 % attached with party walls 39–43 %
of perimeter; target attached ≥ 90 % in dense and poor classes), §15.2 O17 (c).

**Required change.** Build row footprints by clipping, not fitting: footprint = plot ∩ the frontage band of the row depth,
a boolean intersection with the plot polygon, so the party wall is the plot's side line by construction. Build L4 per
block, in one batch, so a party wall is one shared edge. Keep rectangles for detached and compound slots. Property test:
attached share and party-wall share stay within band on curved-street blocks.

### GEO-27 · major · The one incremental path the base builds grows streets through built plots; nothing stops or converts them

**Failure scenario.** M4 builds exactly one incremental path, "add a growth stage to an existing town": S5 runs "one more
growth stage on the persisted L1", then S8–S13 run "on new or changed faces only". S5's legality rules — separation from
parallel spines, junction snap, water, slope — say nothing about faces that already hold L2–L4 content.

The previous epoch's outer ring is exactly where the new stage grows. The ribbon regime put plots "directly on the
arterial", and the suburb regime laid "small lots from the outset" along its offshoots. New secondary proposals cross those
faces legally, and one of two things follows:
* their corridors overlap existing plots and footprints, so nesting and "no way centreline crosses a footprint" fail and
  the batch aborts; or
* S8–S13 re-derive the touched faces from scratch and re-roll surviving buildings.

The second breaks the owner's EVOLUTION ruling ("nothing that survives an epoch is re-rolled") and M4's own exit test ("0
re-rolled survivors"). `existingFabricCost` exists only in S4's arterial routing.

**Evidence.** ARCH §4.11 (`grow` runs S5 on the persisted L1; S8–S13 on new or changed faces), §4.4 (ribbon and suburb
regimes; the legality list), §4.3 (`existingFabricCost`, epoch > 0, S4 only), §16 M4 exit, D-25. Owner EVOLUTION ruling
(brief, standing rulings).

**Required change.**
* Give incremental S5 a legality class for built faces: a proposal may not cross a face that holds footprints unless a
  declared conversion applies — growth routed along existing plot boundaries or back lanes, or a `demolish` event with a
  cost and lifecycle records. Apply `existingFabricCost` to S5 proposals as well.
* When a new spine must cut a built face, re-cut the affected plots through the conversion path: split along the new
  corridor, keep buildings that still fit, demolish the rest with events. Never re-derive them from scratch.
* Epoch test on a town that has a ribbon suburb and a suburb regime.

### GEO-28 · major · Per-district raster tiles break the global "every casing before any body" order at district seams, and adjacent fills leave seams

**Failure scenario.** The Canvas2D backend keeps "retained tiles per district (MFCG's per-ward cache)", and a mark's cache
group is "district at city LOD". But MFCG caches only ward interiors: its roads, river, walls and towers are global layers,
with every road casing laid before any road body.

District boundaries are streets by construction (§2.2 rule 1). If a way's marks belong to a district tile, district B's
tile — drawn after A's — strokes the boundary street's casing across the mouth of every A-side street that meets it. The
result is a dark ink bar across every T-junction on a district boundary.

Separately, adjacent area fills from the partition (yards, plots, block masses, shadow quads) leave anti-aliasing seams
where they meet. NG closes its seams with a ½-px stroke of the same colour.

**Evidence.** ARCH §8.1 (`Mark.group`, "cache key: district at city LOD"), §8.2 ("every casing before any body is a program
property"), §8.5 (tiles per district), §2.2 rule 1. MFCG's recorded order, `visual-spec.md` §1.3 items 3–7 and 10–11:
casing pass then body pass, "strictly separated … what keeps junctions clean"; wards cached separately; walls and towers
drawn after the wards. `visual-spec.md` §1.1: "cache per ward, not per building". `profile-neighbourhood.md` §7: "Shadow
seams … a ½-px dilation to close the gaps between adjacent shadow quads".

**Required change.** Split marks into two kinds:
* cacheable area and building marks, held in per-district tiles;
* global ribbon and linework marks (ways, rivers, walls, towers, piers), drawn over the tiles in per-band global passes —
  all casings, then all bodies.

Alternatively, use a regular screen-space tile grid in which each tile renders every intersecting mark in global program
order. Render adjacent fills of the same semantic as unions, or apply NG's ½-px same-colour dilation. Add a render test:
no casing pixels inside any junction mouth on a district boundary. (This overlaps the visual lens; the overdraw mechanism
is this lens's.)

### GEO-29 · major · Label fitting depends on the host's text engine, so model hashes differ across browsers and between UI and headless

**Failure scenario.** S13 is a model stage and labels are entities. F-LABEL's rungs (a shorter name form, a straight OBB
label, the OBB arc, a legend entry) are chosen by comparing a spine's length with "the text at the minimum size" and by
collisions in "a screen-space `rbush` per LOD"; §9 makes 0 collisions an invariant. Text width comes from the host's text
engine:
* shaping differs between Chromium, Gecko and WebKit;
* headless Node ships no canvas — `@napi-rs/canvas` and `resvg` are CI dev dependencies, "never shipped".

A label whose fit is within a pixel of a threshold takes a different rung on another browser or in the headless API, and
the model hash changes. So O2 (a) (identical hashes on two machines and three browsers) and O11 (f) ("headless hash = UI
hash") cannot both hold while labels are in the hash. Screen-space collision also makes the model depend on the viewport
and the device pixel ratio.

**Evidence.** ARCH §9 (placement, screen-space `rbush`, 0 collisions), §5.2 (F-LABEL), §2.7 (`Label`), §6.2 (model hash),
§1.7 (runtime targets: Node; headless render dev-only), §15.2 O2 (a), O11 (f).

**Required change.** Choose one and state it:
* **(a)** Fit labels in the model from font metrics parsed from the bundled OFL font files — advance widths and kerning in
  world units at a declared reference size — never from the host's text engine, and resolve collisions in world space per
  LOD band.
* **(b)** Exclude label placement from the model hash: it becomes a derived, cached view product, and only pinned or edited
  placements are model data.

Test headless against browser hashes on the golden suite.

### GEO-30 · major · Stage-2 rule (3) forbids the geometry NG close-ups are made of

**Failure scenario.** PART II rule (3) says "no new street end is placed on a shared edge". But NG's cuts always end on
existing roads — every junction lies on an earlier-drawn road (361 of 361) — and in the ring template "streets simply stop
at the edge" and "the radial streets run on to the edge".

Inside a PLAT district, that edge is the shared boundary street. Under rule (3), `bent-cut` refinement cannot add lanes to
any block along the district boundary, and `RingFabric`'s radials cannot reach it. The base's own S8 already places street
ends on district-boundary spines, so the rule even contradicts the base.

Rule (3) exists to keep seams exact. With GEO-1's `splitThrough`, a T-junction on a shared spine changes the neighbouring
district only inside the base-owned corridor.

**Evidence.** ARCH II.1 rule (3) and `SeamContract` (`sharedGeometry: 'ownedByBase'`), II.2 (`RingFabric`: "concentric
spines inside the boundary plus radials"), §4.6 (S8 cuts end on the L1 face's spines, which include district boundaries),
§2.2 rule 1. `profile-neighbourhood.md` BG-2 item 6 (361/361); RA-4 ("no rim road: streets simply stop at the edge"; "The
radial streets run on to the edge").

**Required change.** Replace rule (3) with a seam amendment:
* a close-up may add T-junctions on shared boundary spines;
* each one is recorded as a new portal in both districts' `SeamContract`s and inserted with `splitThrough`, so the shared
  spine stays one edge chain;
* only the neighbour's corridor and junction wedge are re-derived — its plots are never re-cut;
* `SeamReport` counts the added portals.

Test: a ring close-up whose radials reach the boundary street, with the neighbour's plots byte-identical.

### Minor findings (GEO-31 – GEO-42)

**GEO-31 · minor · The floating-point lint is a short denylist and misses `**`, `Math.hypot` and the other approximated
functions; adopted libraries are not scanned.** §6.5 (3) and D-23 forbid only `Math.sin/cos/tan/atan2/exp/log/pow`,
`Math.random`, `Date` and `performance`. That misses:
* the `**` operator, which is the same approximated exponentiation as `Math.pow`; S1's river-width law
  `w = w0 · acc^0.4` is exactly where someone will write `acc ** 0.4`;
* `Math.hypot` (the natural edge-length call), `asin`, `acos`, `atan`, `cbrt`, `expm1`, `log1p`, `log2`, `log10`, `sinh`,
  `cosh` and `tanh`;
* the adopted geometry and noise libraries, which sit outside model packages and are never scanned.

*Change:* turn the lint into an allowlist (`Math.abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32,
fround` plus the arithmetic operators), ban `**` except with literal small-integer exponents, and run the same scan over
the vendored dependency sources, with a pinned-version audit record. *Status:* the missing entries are CONFIRMED against
the text; which functions ECMA-262 leaves implementation-approximated is general knowledge of the spec, not re-read here
(PLAUSIBLE).

**GEO-32 · minor · "Areas are exact in doubles" holds per product, not per sum; ring orientation must not depend on
it.** Each product of two coordinates is exact, but shoelace partial sums stay exact only below 2⁵³.
* At the METROPOLIS frame (|x|, |y| ≤ 6.4 × 10⁵ cm) each term is at most ≈ 8.2 × 10¹¹, so sums stay exact up to about
  11 000 vertices.
* At the declared range invariant (2²³ cm) each term is at most 2⁴⁷, so only 64 vertices are safe.

Whole-land faces and METROPOLIS coasts approach the first bound. Any ring-orientation or sliver test that reads the sign
of such a sum is a float decision about topology, which §3.2 (3) forbids. *Change:* take ring orientation from `orient2d`
at the lowest-leftmost vertex (exact), compute areas relative to the ring's bounding-box corner or with compensated or
BigInt accumulation above a vertex-count threshold, and state the bound in §3.2. (Arithmetic CONFIRMED.)

**GEO-33 · minor · The authoring boundary neither resamples strokes nor lets a user draw an island.**
* *No resampling.* Drawn strokes go through `insertChain` after "snapping (first-crossing split, weld)". A pointer
  sampled at 60 Hz at street zoom produces points a few centimetres apart, below `minEdge`, so an ordinary stroke fails
  with `E_MIN_EDGE`.
* *No islands.* `drawWater` takes one ring, and the authoring boundary rejects "overlapping" shapes. FTG's documented way
  to draw an island is two intersecting ocean shapes — and a single self-intersecting shape "broke some of the logic in
  the server" (153121107, `ftg-posts-c.md` §2.12).
* *Boundaries off the spines.* `drawBoundary` takes an arbitrary polygon, while district boundaries are "always spine
  edges" (§2.2 rule 1).

*Change:* resample strokes at the authoring boundary to a tolerance of at least `minEdge`, then check topology, before
`insertChain`. Let `drawWater` take several rings composed by boolean union, plus a land brush that subtracts, so islands
and lakes with islands can be drawn. Define `drawBoundary` as either snapping to the nearest spine chain or creating
invisible L1 edges typed `district_bound`, and say which.

**GEO-34 · minor · Quantised anchors flip under 1 cm upstream shifts, and the on-edge anchor tie-break is unstated.**
An id survives regeneration only while its anchor is unchanged, but anchors are quantised continuous values: a building's
centroid snapped to a 1 m cell, a plot's quantised frontage start offset. A 1 cm upstream shift — a re-snap, a
neighbour's re-derived kerb, GEO-1's `splitThrough` — moves a centroid across a cell boundary for about 1–2 % of buildings.
Those ids are superseded, and the pins and assignments attached to them are orphaned (§7.4). The rule for a split line
passing exactly through an anchor point ("the part containing the entity's anchor point keeps the id") has no tie-break.
*Change:* match anchors with hysteresis — keep the id when the new centroid lies within 0.5 m of the old anchor, not "in
the same cell" — using nearest-neighbour matching with an id tie-break, and state the on-edge rule (the face left of the
directed cut keeps the id). Fixture: 1 cm perturbations keep at least 99.9 % of ids. This overlaps the lifecycle lens.

**GEO-35 · minor · Minimum-feature tolerances differ between writers and invariants.** Three rules conflict:
* `insertChain` rejects features below `minEdge` (25 cm);
* the invariant suite checks only "no edge below the weld tolerance" (5 cm), and O4 (e) counts "0 sub-weld edges";
* F-CORRIDOR's test demands "0 faces below `minEdge`" — a length applied to a face.

Writers other than `insertChain` can leave 5–25 cm edges that the invariant accepts and downstream code (side runs, OBB,
the skeleton's pre-clean, GEO-3's dead band) mishandles: Clipper outputs "re-snapped and re-welded", offsets, smoothing,
warp. *Change:* one minimum-edge rule, enforced by every writer (the boolean, offset, smoothing and warp adapters
included) and checked by the invariant at the same value; express face-size floors as a minimum width and area, never
`minEdge`.

**GEO-36 · minor · S1 river construction: loops, unbounded carving, and vanishing islands.**
* *Loops.* The meander term ("a Chaikin-smoothed control polyline with alternating offsets") can loop onto itself when an
  offset exceeds half the control spacing. The course then self-intersects, its buffer creates unintended islets, and
  crossing sites land on the overlap.
* *Unbounded carving.* "The terrain carved to the course" has no depth bound, so a meander pushed onto a hillside becomes
  a trench of any depth just to keep the bed monotonic.
* *Vanishing islands.* A requested river island is a branch that "leaves the course and rejoins it after k cells". If
  the branch runs within the sum of the two channels' half-widths, the islet between them is empty or a sliver, and the
  requested island silently disappears.

*Change:* bound meander offsets by half the control spacing and test the course for simplicity; cap carve depth and
re-route the reach when the cap is exceeded (an F-RIVER rung); require a branch separation of at least (w_main +
w_branch)/2 + the minimum islet width, and otherwise report the island as not built.

**GEO-37 · minor · S5's separation rule covers only parallel spines.** S5 legality enforces a minimum separation only
"from parallel spines". A proposal may run parallel to a shoreline, the stage boundary or a wall line at any distance,
leaving a strip between street and water or wall that is thinner than the smallest plot depth (12 m). Such a strip becomes
a block S10 cannot fill, so it ends as residue or goes through F-PLOT. *Change:* apply the regime's separation — at least
the minimum block depth plus half a corridor — to shores, wall setback bands and the stage boundary as well as to spines.

**GEO-38 · minor · Wall bands and towers straddle the L1 wall edge, and wall→road conversion has no clearance rule.** The
wall is an L1 edge chain, but its band and glacis are listed as L3 faces. A band centred on the wall edge lies in two L1
faces, so as a single face it breaks nesting; towers centred on L1 vertices do the same. `wallToWay` "retype[s] wall edges
to `way:primary` with a ring-road width; the band face becomes corridor". A ring road wider than the wall band plus the
setback overlaps plots and footprints outside the old wall — the ribbon plots — and no rule says what happens to them.
*Change:* model the band, glacis, towers and gatehouses as `FaceRef` unions of per-side parts, as corridors are. Specify
`wallToWay`'s clearance: plots inside the new corridor are re-cut along it (ids kept where the anchor survives, per O8 (g))
and footprints that no longer fit are demolished with lifecycle events.

**GEO-39 · minor · Label spines on holed faces are undefined.** An area label's spine is "the longest path of the
hole-aware straight skeleton of the simplified face". Districts have no holes (`validatePatch`), but water bodies with
islets and woods with clearings do, and their skeletons contain cycles. "Longest path" then means the longest simple path
in a cyclic graph, which the design does not define and which is exponential in general. The face is also simplified
first by a simplifier that does not preserve topology, so a hole can end up crossing the outer ring. *Change:* define the
spine for holed faces (for example the longest path in a clearance-weighted spanning tree of the skeleton, or the
medial-axis fallback), and simplify with a topology-preserving simplifier.

**GEO-40 · minor · 3-D export: coplanar ground surfaces z-fight, and a river is not a plane.** glTF exports "terrain as a
heightfield mesh, water planes" plus per-building meshes. If ground faces (roads, yards, fields, greens) are exported as
separate draped surfaces over the terrain mesh, the coplanar layers z-fight in any viewer — FTG's own 3-D problem, which
its creator fixed by subtracting upper polygons from lower ones "so … nothing will render on top of each other" (T-17,
`ftg-posts-b.md`). A river's "water plane" also cannot follow a bed that descends along the course. *Change:* export the
ground as one planar partition — the plat's leaf faces, the finest committed level per region, each exported once —
draped on the terrain, and export rivers as sloped surfaces that follow the bed profile (or as stepped planes per reach).

**GEO-41 · minor · Control continuity is asserted over decisions that are inherently discrete.** §7.8 requires continuous
controls to be "smooth maps — no thresholds inside a continuous control", with a CI sweep asserting "no jump > ε between
adjacent steps". Yet the design's own expansion example contains a threshold (`granularity.joinMax += round(wealthLevel
· 2)`), and every geometric stop rule downstream is discrete: OBB minor extent against the band's upper bound, the 2.5°
straight-or-bent test, minimum widths, ladder rungs. A small control step flips a top-level cut on some golden seed and
moves buildings-per-hectare by a whole block. As written, the sweep either fails or ε is chosen so that it passes.
*Change:* state continuity statistically (monotone and continuous in expectation over N seeds per step, with a stated
per-seed tolerance), make expansion rows continuous (a fractional `joinMax` used as a probability, not `round`), and set ε
from the measured per-seed variance.

**GEO-42 · minor · A bent cut that continues across a street bounding another district writes into that district's
batch.** S8 commits one batch per district, but a cut "may continue across an existing lower-or-equal-class street when
collinear within 6°". S5 also grows lanes (15–25 m steps) unless the fusion fallback trips, and such a lane can bound a
district. A continuation across it writes another district's faces inside this district's batch. That breaks per-district
atomicity, the worker merge rule ("disjoint face sets … no shared-edge writes inside a pool") and "rerolling one district
leaves every other district byte-identical", and makes the result depend on the order districts are processed. *Change:*
forbid continuation across district-boundary edges (the crossroads then forms only inside a district), or make such a cut
a two-district transaction with a canonical order, recorded in both `SeamContract`s.

## §4 What the design already gets right under this lens (keep it through the revision)

* **The foundation is the right one.** It is an indexed DCEL on integer centimetres, with exact `orient2d` inside a
  derived range. The bound checks out: |x|, |y| < 2²³ gives terms < 2⁴⁸ and a determinant < 2⁴⁹, so the sign is exact in
  doubles. Topology is keyed by index, never by coordinate or object identity. This removes the 2017 aliasing class and
  FTG's position-keyed intersection bug at the root. The findings above repair how levels, roles and tolerances sit on top
  of it; none of them argues for doubles or epsilons.
* **Typed results.** Every primitive returns a discriminated `KernelResult`, and under strict TypeScript that is enforced
  at compile time: `.value` cannot be read without narrowing. GEO-7 is the one place where a value (NaN) escapes the type
  system.
* **Failures stay local.** There is no whole-map retry. Every ladder rung is bounded and replayable from a printed stream
  key, and the unit of failure is a batch. This answers MFCG's "Browser not responding" and the 2017 unbounded
  retry-forever. Among bounded loops, only GEO-25's S9↔S10 cycle and GEO-2's time-based rungs need fixing.
* **Batched transactions** with a static index rebuilt once per batch avoid per-insertion commit costs.
* **Stream design.** Keyed sub-streams per (stage, entity, concern, attempt, epoch), draw helpers free of transcendentals,
  and `dmath` for the transcendentals are sound determinism engineering. GEO-2, GEO-9, GEO-29 and GEO-31 close its
  remaining leaks.
* **The bent cut as a transaction with a bounded ladder**, and NG's measured signature kept as a regression target, are
  the right frame. GEO-20–GEO-23 make it work on the fused layout's kerbs and faces.
* **Invariants after every batch**, with hard violations counted per 1 000 cities, are the right policing. GEO-14 and
  GEO-17 only ask that each hard invariant either be satisfied by construction or have a ladder rung.
* **Per-layer plats** keep sky and underground geometry from ever cutting ground faces; this lens found no problem with
  them.

**Stages examined without a separate finding.**
* S2 (programme) and S3 (siting) compute no plat geometry; S3 gains the basin, moat and canal reservation of GEO-19.
* S6's grower merges district membership, not geometry, and its no-hole rule keeps district skeletons trees. Its one
  exposure is districts straddling the wall (GEO-18).
* S12's field strips and sector presets inherit GEO-35's tolerance unification (strips cut by lanes at shallow angles meet
  the 5° face floor), and nothing else.
* The layer model, the sky-island shadow projection and the drainage query surface (apart from GEO-15's flats) raised
  nothing.

## §5 How the findings cluster for the reviser, and overlaps with other lenses

| cluster | findings | the one decision that resolves most of it |
|---|---|---|
| level model and edge identity | GEO-1, GEO-4, GEO-5, GEO-10, GEO-11, GEO-30 | a cross-level vertex protocol (`splitThrough`) or one shared vertex/edge store for the ground levels; role sets on edges; kernel-maintained edge handles |
| numeric determinism | GEO-2, GEO-9, GEO-29, GEO-31, GEO-32 | work budgets instead of time; one geometry engine everywhere; labels either computed from bundled font metrics or kept out of the hash; an allowlist lint |
| kernel contracts and tests | GEO-3, GEO-6, GEO-7, GEO-8, GEO-12, GEO-35 | vertex attraction at `minEdge`; defined contact semantics; one OBB contract and finite-checked snapping; a skeleton with coalescing and a validator; constructive degeneracy fixtures |
| site and water | GEO-13, GEO-14, GEO-15, GEO-17, GEO-19, GEO-36 | outline simplicity by construction; shoreline and contours from one field (or clipped); Int32 heights; deck-first crossings; water reserved before roads |
| backbone and walls | GEO-16, GEO-18, GEO-37, GEO-38 | arterials built as a graph before smoothing; the wall trace computed before growth |
| infill and plots | GEO-20, GEO-21, GEO-22, GEO-23, GEO-24, GEO-25, GEO-26, GEO-42 | one kerb function; cut ends to the spine; side runs with chord directions; reflex pre-cut plus an always-succeeding rung; per-frontage regions; lanes decided in S8; row footprints by clipping |
| evolution, rendering, 3-D, controls | GEO-27, GEO-28, GEO-33, GEO-34, GEO-39, GEO-40, GEO-41 | built-face legality in incremental S5; global ribbon passes; authoring resampling and multi-ring water; anchor hysteresis |

**Overlaps with other lenses.**
* Lifecycle lens: GEO-5, GEO-11 and GEO-34. The geometric cause is argued here: arena ids, order-dependent weld, quantised
  anchors.
* Visual lens: GEO-28 and GEO-40 (casing order, seams, coplanar 3-D).
* Scale lens: GEO-3's ladder-use rate and GEO-25's loop also cost time.

**Deferrals.** Only GEO-9 touches a listed deferral ("the boolean library choice (M0 benchmark)"). It argues that
shipping a runtime fallback is a separate decision from which library the benchmark picks, so the deferral does not cover
it. Skeleton port versus in-house (deferred to M0) is not re-raised: GEO-8 concerns the specification either option must
meet.

**Evidence that postdates the architecture.** The NG anchor test (`profile-neighbourhood.md` AN-1–AN-7, queue item B12)
landed after `docs/ARCHITECTURE.md`. GEO-22 uses its far-side rule (perpendicular ray, 66 %) and its fraction-of-major-axis
law (σ ≈ 0.09); §4.6 still quotes N(0.5, 0.06) clamped to [0.40, 0.60].

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (checked in the documents, or executed).**
* Every quotation of `docs/ARCHITECTURE.md`, which was read in full.
* Every reference fact, taken from a findings passage listed in §0 that this seat read; the creators' words are the
  critics' verified quotations.
* The arithmetic this seat executed:
  * the lattice and nesting simulation (GEO-1, GEO-12);
  * the dead-band rate on Chaikin ×2 spines (GEO-3, GEO-22);
  * the Pitot / tangentiality check (GEO-8);
  * typed-array coercion and the NaN range check (GEO-7, GEO-15);
  * the shoelace bounds (GEO-32).

**PLAUSIBLE (reasoning only; no PLAT kernel exists yet).**
* How often each failure fires in a real town (for example GEO-3's rate depends on M0's actual spine geometry).
* Whether an implementer following the text would build the literal failing mechanism or improvise the fix.
* That `polygon-clipping` has no offset API (library knowledge, to be confirmed in M0).
* That ECMA-262 leaves the functions named in GEO-31 implementation-approximated.
* The ranking of findings by severity, which is this seat's judgement under the §1 rule.
