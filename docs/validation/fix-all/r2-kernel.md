# Fix-all round 2 — KERNEL area (§2.2–§2.3 storage, §3 geometry kernel): dispositions, replacement text, cross-area requests
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-kernel-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-kernel-r2` · 2026-09-25 · seat: fix architect, KERNEL area, round 2 (Fable role; opus stand-in).
Status: COMPLETE — 24 items: 24 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred; 11 replacement blocks (§2.2, §2.3, §3.1–§3.4, §3.6–§3.10; §3.5 unchanged); 36 cross-area requests (pipeline 16, determinism 7, rendering 6, scope 7, the last two carrying the judgment-call rows); 3 committed measurements.

## Part 0 — Reading record, method and measurements

**In plain words.** The kernel is the part of the design that does the shape mathematics. The round-1 check found three
kernel items not fully fixed and nineteen new problems. This round fixes all of them in the kernel text: new lines that
snap onto old ones can no longer leave a too-short piece (a counter-example and a stacked-rounding case are now
impossible, and both are measured); corners and gaps that other records point at are now named in the drawing itself,
so a warp or an upgrade can never make a record point at the wrong corner; widths and wall heights along a street or
wall are stored at named points on it, so inserting a junction no longer shifts them; the town wall's band is protected
from the later street-cutting steps that would have erased it; the parallel workers each start from a frozen copy of
the town and are merged in a fixed order; the accuracy test against the reference libraries now compares like with
like; a warp near a coast slides street ends along the shore instead of doing nothing; and the hydrology raster now
covers the whole map at the same cost. Twenty-four items: 24 FIX, 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred.

**Read in full:** `docs/ARCHITECTURE.md` §0–§3 (lines 1–1594), §4.1, §4.6–§4.8, the S12a part of §4.9, §6.3, §6.5,
§7.1–§7.4, §12.4, §12.6–§12.8, §13.1–§13.2, §14's kernel interfaces, §16's M0 and M1 rows, §17.4, II.1, the delegated
decisions table and the judgment-calls table (J-K rows and J-6, J-7, J-11, J-12); the rest by heading and grep for every
kernel term the fixes touch (`LatticePoint`, `widthCm`, `baseCm`, `invertCm`, "per spine vertex", `clearFiner`,
`corridorUnion`, "tombstone", "id-sorted", "robust-predicates", "dmath", "cached by", "hydrology", "O14 (e)",
`SharedArrayBuffer`, "O4 (e)"). `docs/validation/fix-all/r1-verify-kernel.md` in full (the source of GEO-3, GEO-5,
GEO-35 and VK-1–VK-19); the NF-D15, N-19 and NF-S8 rows of `r1-verify-determinism.md`, `r1-verify-rendering.md` and
`r1-verify-scope.md`; `r1-kernel.md` (structure and Part 3 format); `r1-integration-log.md` (C-6, C-7, C-8, C-16);
`docs/validation/redteam-geometry.md` rows GEO-3, GEO-5, GEO-35; `docs/validation/redteam-improve.md` §5.1 (the
registry-confirmed licence of `robust-predicates` 3.0.3); `docs/validation/bench/bench_terrain.out`, `bench_index.out`,
`fixall_verify_kernel_attract_gap.py/.out`; the sibling round-2 draft `r2-determinism.md` (its §7.1 and §7.4 blocks, to
aim the cross-area requests at its current text). `docs/validation/fix-all/r1-validate.md` does not exist. Nothing
outside `/Users/cstokes/Desktop/Maps` was read; no reference code, grammar, palette or table is reproduced.

**Method.** Every item ends FIX (a mechanism in the replacement text that defeats the failure scenario the verifier
wrote down, quoted in Part 1), INVALID (none) or STAGED-BY-OWNER (none). Where a choice needs a measurement it was
measured now (below); where only a milestone can confirm it, the chosen mechanism, the confirming measurement and the
pre-decided fallback are all written into the block. Each new choice is recorded inline as a judgment ("chose X over Y
because Z", J-K9–J-K21, with J-K2, J-K5, J-K6 and J-K8 amended); Part 3 repeats the rows for the scope area's table.
The fixes follow structural prevention: GEO-5's stale positions and VK-2's stale positional arrays are one class (data
keyed by a vertex's position or index in geometry the kernel re-vertexes), fixed together by role-carried vertices and
knot profiles, and the class sweep also caught `WaterBody.bankKinds` / `shoreClass`, `II.1 SeamAmendment.at` and
`PlotBound.gates[].at`; GEO-3's gap and a second rounding gap found while checking the proof (a crossing rounded towards
a vertex that an earlier rounding left 25–26 cm from the crossed edge) are one class, fixed by one placement rule for
every new vertex on an existing edge.

**Executed in this lane (our own code; stdlib Python and plain Node; files under `docs/validation/bench/`):**

| script → output | what it shows |
|---|---|
| `fixall_kernel_r1_attract_check.py` → `.out` | round 1's attraction measurement, committed from the round-1 scratchpad (VK-17) and re-run here: the output is reproduced byte for byte (segments p50 7.9 m; 6.38 % attracted; p50 12.9 cm, max 26.0 cm; shortest edge 25.6 cm) |
| `fixall_kernel_r2_attract.py` → `.out` A | the revised step 2 on the verifier's band test: the (20, 20) fixture moves onto (0, 0) (28.28 cm); 400 000 vertices in the attraction band → 0 sub-`minEdge` sub-edges (was 1.34 %), shortest 25.50 cm, 5 729 moved onto an endpoint, largest displacement 36.72 cm ≤ √2 · 26 = 36.77 cm |
| same, B | the round-1 on-spine measurement under the revised rule: unchanged (endpoints on the spine cannot hit the new case) |
| same, C | 200 000 crossings placed next to a vertex 25–26 cm from the crossed edge: plain nearest-point rounding leaves 1 361 edges below `minEdge`; the placement rule leaves 0, moves a crossing ≤ 0.840 cm and keeps it ≤ 0.706 cm from the crossed edge |
| same, D | VK-10's notched near-rectangle: area 0.970 of its OBB, four OBB corners present, not convex; the hip point (1.5 m, 1.5 m) lies outside the footprint |
| same, E | `area2` with bbox-relative terms and a flush at 2⁵²: 0 mismatches against exact integers on 300 full-range random rings and on three star rings of radius 2²³ − 2; the former fixed 1 024-term flush is inexact on all three star rings |
| `fixall_kernel_r2_hydro.mjs` → `.out` | hydrology (bucket-queue flood, two-gradient flats, D8, accumulation) on 60 m and 3 000 m relief: frame + margin at 16 / 25 / 32 m costs 6.2–7.0 / 15.9–17.2 / 25.3–26.5 ms against 7.2–7.7 / 15.3–16.4 / 25.6–26.8 ms for the old frame-only 10 / 16 / 20 m rasters; frame + margin at the old cells would cost 41–44 ms (CITY) and 67–69 ms (METROPOLIS); every cell has a D8 |

## Part 1 — Disposition table

"X:" names the cross-area requests in Part 3 that complete an item in sections other areas own.

| item | disposition | sections changed | mechanism, in one line |
|---|---|---|---|
| GEO-3 | FIX | §3.1, §3.2 (1)–(3), §3.6; X: §13.1, J-K2 | a vertex whose exact foot lies within `attractCm` of an edge's endpoint moves onto that endpoint; every new vertex on an existing edge (split foot, stretch join or leave point, crossing) is placed by one placement rule that keeps `minEdge` and clearance; displacement ≤ √2 · `attractCm` ≈ 36.8 cm; the proof enumerates the four ways an edge is created; measured 0 / 400 000 (was 1.34 %) and 0 / 200 000 stacked-rounding crossings (plain rounding: 1 361) |
| GEO-5 | FIX | §2.2 (types; rules 5, 7), §3.4 (`resolveVertexAt`, `signature`, `pinVertices`), §3.6 (held vertices), §3.9; X: §2.4, §2.5, §2.7, II.1, §7.1, §7.4 | (a) every entity-held vertex carries an indexed role (`attach`, `anchor`, `weld`, `deck_end`; gate openings are `gate_opening` sub-edges) and no entity record stores a position; (b) a log position carries a `VertexSig` and binds by exact point, else a signature match within the rebind radius, else is orphaned — never by distance alone; (c) `warp` moves kernel-pinned vertices, holds vertices of locked or pinned entities and deck ends (unless `fromLevel = 0`) |
| GEO-35 | FIX | §3.1 (curves row), §3.2 (2), §3.3 (`CommitRecord.moved`), §3.6 (whole-step validation), §3.10; X: §7.4 | a warp or smoothing step also requires every edge incident to a moved vertex (re-seats and slides included) to be ≥ `minEdge` and no two vertices on one lattice point, else it halves; §3.10 checks new *and moved* edges from the commit record's moved-vertex list |
| VK-1 | FIX | §2.2 (rule 6, `LevelFaces.stage`), §3.1 (`E_KEPT`), §3.3 (kept content, `rederivesFrom`), §3.4 (`clearFiner`, `corridorUnion`), §3.6, §3.7, §3.9, §3.10; X: §4.1, §4.6, §4.7, §4.8, §4.9, §7.1, §7.3 | each face records its stage rank; a batch clears finer content only from its `rederivesFrom` stage on; finer faces of earlier stages are kept obstacles (`E_KEPT`); pipeline: S8 / S9 domains exclude band ⊕ setback, bands leave gate passages open, S12a commits its own corridors; §7.3's tree scope re-runs S7's band step for wall-adjacent cells |
| VK-2 | FIX | §2.2 (`ChainProfile`, rule 5, knot roles), §2.3 (`bankKinds`, `shoreClass`, `course`), §3.4 (`insertChain` knots, `bandUnion`, `kerb`, `sampleProfile`, `retypeEdges` re-key), §3.6 step 1, §3.7, §3.9; X: §2.4, §2.6, §2.7, §4.6 | varying chain attributes are knot profiles: values at vertices carrying an indexed knot role, interpolated by arc length (linear) or held (step); splits, attraction, crossings, promotion and warp never change them; `kerb`, `bandUnion` and exports sample them and the digest hashes them with their knot rows |
| VK-3 | FIX | §3.1 (`E_SCOPE`), §3.3 (the pool's five steps), §3.10 (pool-scope row); X: §4.1, §4.9, §6.5, §11.2, §12.4, §12.8 | each pool worker gets a read-only transferred copy of the arena frozen after S10a (no `SharedArrayBuffer`); one copy-on-write overlay per district from that base; `E_SCOPE` on a write outside the district and at merge; lineage-order merge with a slot remap, carried index partitions and digest leaves; pool size 0 runs the same path |
| VK-4 | FIX | §3.1 (booleans row), §3.7; X: §13.1 | the oracle comparison is split by our engine's attraction warnings: unattracted cases strict (equal face counts, symmetric difference ≤ perimeter × 1 cm), attracted cases valid and within perimeter × √2 · `attractCm`; ≥ 10⁵ unattracted cases per operation |
| VK-5 | FIX | §3.7; X: §2.6, §12.4, §12.7 | the kernel's M0 bar is S11's geometry share, ≤ 3 µs per plot median (≤ 25 µs compound), inside one S11 row of 5 µs whose other 2 µs are rules; a stage-3 `outline()` at 10 µs re-declares the row when it registers |
| VK-6 | FIX | §3.2 (4), §3.3 (two forms), §3.4 header; X: §4.1, §6.5 (9), §13.1, §14, §16 | declared form (independent ops, canonical order, permutation test) and callback form (issue order, issue-order determinism test); S5c, S8 and S10 are callback-form |
| VK-7 | FIX | §3.6 (moves); X: §7.1, §7.4, §13.1 | a vertex on an edge of level < `fromLevel` slides: its displacement is projected on the fixed route, kept `attractCm` from the route's fixed vertices and re-seated within 0.71 cm; shore-junction warp fixture |
| VK-8 | FIX | §3.2 (1), (6), J-K13 | bbox-relative terms < 2⁴⁸ from the range invariant; the double partial is flushed to BigInt when it reaches 2⁵², so `area2` is exact for every ring `snap` can produce; `area2Big` for self-crossing operands |
| VK-9 | FIX | §2.3, J-K12; X: §4.2 S1 (3), §12.4, §13.1 | `Terrain.hydro` grid over frame + margin at 16 / 25 / 32 m — the old cell counts, measured at the old cost; `flowAt` samples it; D8 recomputed on the carved corridor; the 3 000 m fixture counts its land cells |
| VK-10 | FIX | §3.1 (skeleton row), §3.8, J-K21 | the exact OBB roof path requires a convex footprint; gable ends taken on the footprint; the notched counter-example (executed) now takes the skeleton |
| VK-11 | FIX | §3.7, J-K8 | a miss > 2× builds the accelerator; ≤ 2× builds it only if the stage row breaks, else a declared budget amendment; a remaining miss re-declares the model budget as a D-18 amendment; X: §16 M0 |
| VK-12 | FIX | §3.7 | the pointer reads §6.5 (10) |
| VK-14 | FIX | §3.1 (index row), §3.3, J-K6 | a total canonical key per item kind: vertex (y, x); edge by its endpoints, lower first; face by its canonical ring's first two vertices; vertex < edge < face |
| VK-15 | FIX | §2.2 (`LevelIndex`), §3.1, §3.3 | tombstones filter static-partition hits only; a reused slot's new item lives in the grid, so reuse cannot hide it |
| VK-16 | FIX | §3.1 (predicates row) | `robust-predicates` 3.0.3, Unlicense, registry-confirmed (`redteam-improve.md` §5.1), pinned and re-checked by §17.4; pre-decided fallback an in-house BigInt `incircle` |
| VK-17 | FIX | §3.2 (2), §3.6; `docs/validation/bench/` | the round-1 script and output are committed (`fixall_kernel_r1_attract_check.*`, reproduced) with the round-2 measurement (`fixall_kernel_r2_attract.*`); §3.2 and §3.6 cite only these |
| VK-18 | FIX | §2.2 rule 3, §3.3 (`CommitRecord.promoted`), §3.6, J-K11; X: §6.2, §7.4, II.1 | finer vertices on a route the chain ends on or joins are attraction candidates; an attracted one is promoted to the batch's level (listed; undo restores) — chosen over clearing and re-deriving the neighbour |
| VK-19 | FIX | §2.2 rule 3 | the stage-2 T-junction example is removed (II.1 inserts it at level 1); a band's cross edge on its wall is the example instead |
| NF-D15 | FIX | §3.1 (deterministic-maths row) | **build**: our TypeScript port of fdlibm 5.3 with Sun's notice (D-23, J-11, §17.4) |
| N-19 | FIX | §3.8 | roofs are cached by (entity, content revision, roof construction), never by id alone (§8.1 (5)) |
| NF-S8 | FIX | §3.1 (predicates and deterministic-maths rows) | aligned with §17.4 and D-23: `dmath` built; `robust-predicates` 3.0.3 Unlicense, confirmed |

**Counts:** 24 items — 24 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred.

## Part 2 — Replacement blocks

Blocks in document order. Each block's text replaces the named subsection completely (heading, banner and body);
§3.5 is unchanged. Section pointers inside the blocks use the current numbering.

=== REPLACE §2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===

### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground or the underground arena; parts 1–3 = one arena per sky island (§4.2, II.1)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey; readonly frame: Frame /* §3.2 (9) */; readonly lattice: LatticeSpec;
  vertices:  { x: Int32Array; y: Int32Array; out: Int32Array /* one outgoing half-edge */; level: Uint8Array /* birth level; lowered only by promotion (rule 3) */;
               flags: Uint8Array /* pinned | steiner | free slot */ };
  halfEdges: { origin: Int32Array; next: Int32Array; prev: Int32Array;    // twin(h) = h ^ 1: half-edges are allocated in pairs
               level: Uint8Array /* per pair (h >> 1): the edge's birth level */ };
  roles: RoleTable;                      // (role, entity, level, ordinal) sets on edge pairs and vertices, with a reverse index (rule 7)
  faces: [LevelFaces, LevelFaces, LevelFaces, LevelFaces, LevelFaces];
  index: [LevelIndex, LevelIndex, LevelIndex, LevelIndex, LevelIndex];     // §3.3
  version: number;                       // every committed batch bumps it
}
interface LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500 /* soft, §3.10 */; rangeCm: 8_388_608 /* 2^23 */ }
interface LevelFaces { outer: Int32Array; holesStart: Int32Array; holes: Int32Array; kind: Uint16Array;
  owner: Int32Array /* interned entity handle */; parent: Int32Array /* the level − 1 face containing it; −1 at L0 */;
  stage: Uint8Array /* rank (§4.1 order) of the stage whose batch created or last re-owned the face: the kept-content rule (§3.3) */;
  nextOfOwner: Int32Array; ownerHead: Map<number, FaceId> }
interface RoleTable { edgeFirst: Int32Array; vertexFirst: Int32Array /* first slot of each set, −1 if none */;
  kind: Uint16Array /* interned RoleName */; entity: Int32Array; level: Uint8Array /* level of the batch that added it */;
  ordinal: Uint16Array /* 0 unless the registry declares the role indexed (the knot, attach, anchor, weld, deck_end and gate_opening roles, rule 7) */;
  nextInSet: Int32Array; nextSameKey: Int32Array; head: Map<RoleKey, number> /* (role, entity, ordinal) → first slot */ }
interface LevelIndex { static: PackedIndex[] /* partitions: one per arena at L0–L1; one per district + one outside districts at L2–L4 */; dynamic: UniformGrid;
  tombstones: Set<number> /* slots deleted since the partition's build; they filter static-partition hits only (§3.3) */ }
// The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry (rule 5):
type FaceRef    = { owner: Id; level: Level };                       // view: the faces whose owner at that level is the entity (district, block, corridor, junction, plot, water body …)
type ChainRef   = { role: RoleName; entity: Id };                    // view: the ordered edge chain carrying (role, entity) — a way's spine, a wall trace, a tunnel
type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };  // view: the unordered edges carrying (role, entity[, ordinal]) — a plot's frontage, access, party walls, one gate opening
type VertexRef  = { role: RoleName; entity: Id; ordinal?: number };  // view: the vertex carrying (role, entity[, ordinal]) — a junction, a tower, a gate, an entrance, a portal, a deck end, a weld end
type LatticePoint = { x: Cm; y: Cm };   // a position in an arena: in log events (with a VertexSig), view state and label placements only — never in an entity record (rule 5)
interface VertexSig { v: RoleKey[] /* the vertex's own (role, entity, ordinal) rows, sorted */; e: RoleKey[] /* the structural (role, entity) rows of its incident edges, sorted, deduplicated */ }
interface ChainProfile<T extends number | string = number> {   // a value that varies along an entity's chain (rule 5): never an array indexed by the chain's vertices
  knotRole: RoleName /* the registry's knot role for this attribute: width_knot, base_knot, invert_knot, bank_knot, shore_class_knot … */;
  values: T[] /* values[i] belongs to the chain vertex carrying (knotRole, entity, i) */; interp: 'linear' | 'step' }
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.** L0 faces: land components, sea, lakes,
   river reaches, islets, ponds, moats — land and water only (terrain contours and drainage lines are raster products of
   §2.3, never plat edges or faces, so no L1 face straddles two L0 parents and no drainage antenna enters a face ring).
   L1 faces: coarse blocks (regions between way *spines*); L1 edges: way spines (centrelines), wall lines, shorelines
   inherited from L0, the map border, field boundaries, the context margin, district boundaries (always spine edges).
   **L2 refines each L1 face into one half-corridor strip along each of its spine edges (the road reserve on that face's
   side, width = the way's half-width), one junction wedge at each of its corners, and the built block(s) that remain** —
   built by `corridorUnion` (§3.7), so every L2 face nests in exactly one L1 face. A `Corridor` entity is the `FaceRef` of
   the half-corridor faces on both sides of its spine; a `Junction` the `FaceRef` of the wedges around its vertex; a
   `Square` is a corridor face of class `square` (the K-1 repair; G-R11). Wall bands, glacis, towers and gatehouses are
   built the same way (`bandUnion`, §3.7): the band around the L1 wall chain is split by the chain itself into per-side
   L3 parts and an `Enceinte.band` is the `FaceRef` of both sides, so no band straddles its L1 edge. L3 faces: plots,
   courts, yards, greens, alleys-as-faces, wall-band and glacis parts. L4 faces: building footprints (and wing sub-faces
   when stage 3 exists) plus yard sub-areas. Districts, blocks, merged plots and water bodies are multi-face `FaceRef`s,
   never single face ids (P-1 avoided).
2. **One arena per `PlatKey`; the five levels are views of it (Judgment J-K1).** All levels live in one vertex-and-half-
   edge arena and every edge carries its birth level; the level-n subdivision is the set of edges of level ≤ n, so each
   level-n face is exactly the union of the level-(n+1) faces inside it. Nesting therefore holds by construction and is
   checked by index, not by coordinates: every level-(n+1) face has one `parent`, and each of its boundary edges is
   either of level n+1 or a sub-edge of a level-≤n edge (§3.10). A face walk at level n follows `next` and, around each
   vertex, skips edges of level > n (O(degree)). A level's face records inside a parent face are materialised when the
   first edge of that level is inserted there; until then the parent face is its own child. A shared boundary is one
   edge seen by every finer level — a kerb, a plot line, a party wall — so a warp moves it once and two row houses share
   literally one wall edge. The ground, the underground and each sky island are separate arenas and never share
   topology; cross-arena links (an island's shadow footprint, a sewer outfall) are entity ids.
3. **Finer levels never move coarser geometry, with one bounded exception.** A level-n batch creates vertices and edges
   of level n only (`E_LEVEL` otherwise; clearing finer content, promotion and `warp` moves are the stated exceptions,
   §3.3, §3.6). Where it needs a vertex on a coarser edge (a plot line ending on a kerb, a footprint corner on a plot line,
   a band's cross edge ending on its wall) `splitThrough` inserts a level-n **Steiner vertex** at the lattice point chosen
   by §3.6's placement rule near the exact foot and routes the coarser edge through it; the route moves by at most half a
   lattice diagonal, 0.71 cm (61 % of 5–60 m edges have no interior lattice point at all, GEO-1). The coarser edge's
   endpoints, birth level, faces and roles of its own level never change; a finer batch may add roles of its own level (a
   plot's frontage on a kerb). The **level-n route** of an edge is the chain through its vertices of level ≤ n: every
   level-n query, level-n digest (§6.2) and level-n stage reads that route, so no level-n result depends on whether or
   when a finer level was derived — lazy per-district stages included. The converse case — a *coarser* batch ending a
   chain on a route that already carries a finer vertex kept beside it (a neighbour's plot line ending on a kerb that an
   L2 re-derivation re-joins, a close-up's kept fabric beside a new L1 junction) — attracts onto that finer vertex and
   **promotes** it: its birth level is lowered to the batch's level, which adds it to the coarser route (it already lies
   within 0.71 cm of it) without moving it or touching the finer faces on either side; the commit record lists every
   promotion and the edit's undo record restores the birth levels (§3.6, VK-18). `clearFiner` (regeneration, undo)
   removes finer edges and finer roles and dissolves each Steiner vertex left with degree 2 and no role row, which
   restores the coarser edge exactly, because its endpoints never moved.
4. **Edges enter only through `insertChain`** (§3.4; semantics in §3.6) — one door for generated chains, user strokes,
   boolean and buffer outputs, offsets and smoothing results — which finite-checks and snaps to the lattice, attracts new
   vertices within `attractCm` onto existing vertices and edges, shares near-coincident stretches, places every new
   vertex on an existing edge by the placement rule, splits at every crossing and re-walks only the faces incident to the
   touched edges. Faces are never re-walked globally; a split face's two parts both inherit its owner (and its stage
   rank) until the stage re-owns one.
5. **Topology by index; references by role (Judgment J-K3).** Inside the kernel topology is keyed by `VertexId`,
   `HalfEdgeId` and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a position of a vertex:** an entity reaches its geometry through
   the kernel's role and owner tables — a `Way`'s spine is `ChainRef('way', wayId)`, a plot's faces `FaceRef(plotId, 3)`,
   a junction `VertexRef('junction', id)`, a bridge's deck ends `VertexRef('deck_end', bridgeId, 0 | 1)`, a castle's weld
   ends `VertexRef('weld', castleId, 0 | 1)`, an open wall's end anchors `VertexRef('anchor', enceinteId, 0 | 1)`, a
   reservation's attach points `VertexRef('attach', reservationId, i)`, a plot bound's gate openings
   `EdgeSetRef('gate_opening', boundId, i)` — resolved on demand by `resolve` (§3.4) and valid until the next commit (a
   debug build asserts the version). Splits carry roles to both parts, merges union them, attraction merges them onto the
   surviving edge or vertex, promotion keeps them, and `warp` moves the vertex that carries them, so a stored reference
   cannot go stale: there is nothing to rewrite (GEO-5 (a)).
   * **Chain attributes are knot profiles, never positional arrays (VK-2).** A value that varies along a chain — a way's
     width, a wall's base elevation, a tunnel's invert, a shore's bank kind and shore class — is a `ChainProfile`: its
     knots are vertices of the entity's own-level route carrying the registry's knot role for that attribute with an
     ordinal (`('width_knot', wayId, i)`), and between consecutive knots the value is interpolated linearly by arc length
     along that route (`linear`) or held from a knot to the next (`step`, categorical values); before the first and after
     the last knot of an open chain it is constant, a ring interpolates cyclically, and a chain of several rings carries
     at least one knot per ring and never interpolates across rings. A constant attribute is a scalar with no knots. The
     creating stage places each knot on an existing vertex of its own level or inserts one with `splitThrough` at its
     own level. `splitThrough`, attraction, crossings, promotion and `warp` never change a profile: a split adds a vertex
     that carries no knot, and a knot vertex moves with its chain. `kerb`, `bandUnion` and every export *sample* the
     profile (§3.4, §3.7) and the digest hashes its values with the knot rows, so a T-junction inserted into a spine by
     S8 cannot shift the width of the rest of it — the failure of the earlier per-vertex arrays, whose index every inserted vertex shifted. A conversion that
     splits or joins chains (a way split, `wallToWay`) re-keys the knots with the chain through `retypeEdges` (§3.4).
   * **Positions in the log (GEO-5 (b)).** A log event that addresses a vertex by position (`moveVertex`, §7.1) stores
     its `LatticePoint` *and* the vertex's `VertexSig` at the time of the edit — its own `(role, entity, ordinal)` rows
     and the structural `(role, entity)` rows of its incident edges; the edit layer refuses a target with an empty
     signature (every editable vertex carries a structural or vertex role, §7.1's table). On replay
     `resolveVertexAt(key, at, sig)` (§3.4) maps the signature's entity ids through carry-over (§6.3) and binds, in order:
     (1) the vertex at `at` if its signature contains every recorded row; (2) else the nearest vertex whose signature
     contains every recorded row within the rebind radius — `attractCm` for a vertex without vertex roles, the §6.3
     anchor radius of its vertex-role kind otherwise (junction and pin 1 m, gate and tower 2 m) — ties by lattice
     position (y, then x); (3) else the event is **orphaned** and reported (§7.3 item 4). A vertex is never bound by
     distance alone, so an upgrade replay can never move an unrelated vertex that happens to lie nearby.
   * **Warp and pins (GEO-5 (c)).** `warp` moves kernel-pinned vertices with everything else and holds the vertices of
     locked or pinned entities (§3.6); because every entity names its vertices by role, a moved gate, weld end or anchor
     is still that record's vertex.
6. **Refinement is a pure function**: `L(n+1) = refine_n(level-n view, params, streams)`, the streams keyed from the
   scope's lineage (§6.1). An edit at level n clears the finer content under the touched level-n faces with
   `clearFiner` and re-derives it (§7.3). Two kinds of finer content survive the clear: entities that are locked or
   pinned, returned as conflicts to the dry run (§7.1), and **kept content** — faces a stage *earlier* than the one
   the batch re-derives from made inside those faces (the S7 wall bands inside the L1 faces S8 cuts, S12a's outside
   plots inside the hinterland faces), which the batch treats as fixed obstacles (§3.3, VK-1).
7. **Roles, not a single type.** Each edge pair and each vertex carries a small sorted set of `(role, entity, level,
   ordinal)` rows from the **role registry** (a versioned data table). Edge roles: `way`, `kerb`, `corridor_split`,
   `band`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`, `field_bound`, `district_bound`, `plot_line`,
   `party_wall`, `frontage`, `access`, `yard_part`, `claim`, `reserved` (a reservation's boundary before growth, §4.2 S3),
   `green_line` (avenues, hedgerows), `treatment` (a plot edge's fence, hedge, wall or railing as an attribute row),
   `gate_opening` (the sub-edge of a treated plot edge left open for a gate, indexed per gate), `tunnel`, `invisible`.
   Vertex roles: `junction`, `tower`, `gate`, `entrance`, `portal`, `attach`, `anchor`, `weld`, `deck_end`, and one knot
   role per profiled attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`, `shore_class_knot`); the
   registry marks `attach`, `anchor`, `weld`, `deck_end`, `gate_opening` and the knot roles **indexed** (their rows carry
   an ordinal). A way's class, width profile and surface are attributes of the `Way` entity, not of its edges (FTG's 14
   wire types generalised); a `wall` chain may be open, its ends anchored on typed vertices (a shore, a cliff, a castle).
   The registry marks each edge role **structural** (`way`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`,
   `reserved`, `tunnel`) or **partition** (the rest): a structural role is never removed by a sliver absorption or a
   face merge (§3.6). A vertex that carries any role row of a live entity is never dissolved. Coincident features are one
   edge with several roles — a street on a district boundary, a quay on a shore, a wall on a river bank, a track on a
   field boundary — never two edges and never an overwrite.
8. **Every committed batch validates its declared invariants** at their scopes (§3.10), writes a report record and a
   `CommitRecord` (§3.3); a failed batch leaves the arena at the previous `version`.

*Size.* One arena per layer stores every boundary once: at CITY ≈ 80 k vertices, ≈ 240 k half-edges, their role rows
(now with a 2-byte ordinal) and five face tables (now with a 1-byte stage rank) come to ≈ 10 MB in typed arrays
(PLAUSIBLE until M0), against ≈ 20–29 MB for five separate per-level DCELs that repeated each inherited edge at every
finer level (SCL-11). Knot rows are few: a constant-width way has none, and a wall's base profile carries one knot per
trace vertex (tens to a few hundred per enceinte).

*Judgment J-K1.* Chose one arena per layer with level-tagged edges and per-level face records over five separate
per-level DCELs joined by a cross-level `splitThrough` protocol, because the shared arena makes nesting exact by
construction, moves shared boundaries atomically (warp, stage-2 seams, party walls), stores each boundary once and
needs no cross-arena bookkeeping; the price — a finer batch may add sub-centimetre Steiner vertices to a coarser edge —
is bounded by the hot pixel and kept out of every coarser-level read.

*Judgment J-K3.* Chose role and owner tables with kernel-resolved views over stored half-edge, vertex and face id lists
kept current by a lineage table, because the kernel then never has to find and rewrite references it does not own,
every fact is stored once, and a stale handle becomes impossible rather than detected; resolution costs O(length of
the chain) through the reverse index.

*Judgment J-K9 (GEO-5).* Chose to make every entity-held vertex a role-carrying vertex (`attach`, `anchor`, `weld`,
`deck_end`, and `gate_opening` sub-edges) and to give log positions a role signature, over persisting lattice points in
entity records and re-binding them by distance, because a role travels with the vertex through every split, merge,
attraction and warp while a stored position goes stale at the first warp, and because distance alone cannot tell the
intended vertex from an unrelated one 20 cm away after an upgrade. A gate opening is an indexed *edge* role rather than
the vertex role the round-1 verifier named, because an opening has a width: it is the open sub-edge between the two
gate ends, and its edge set resolves both ends at once.

*Judgment J-K10 (VK-2).* Chose knot profiles — values at role-carrying vertices, interpolated by arc length between
them — over profiles keyed by arc length from the chain's start, because a wall ring has no stable start (its
lowest-leftmost vertex changes under a warp) and a warp or an inserted junction would slide arc-length breakpoints away
from the feature they belong to, while a knot is a vertex and moves with it; the price is one role row per knot, and
constant attributes need none.

*Judgment J-K11 (VK-18).* Chose to promote a finer vertex a coarser batch lands on, over clearing and re-deriving the
neighbour's finer content within `attractCm`, because promotion keeps the neighbour's plots and a close-up's kept fabric
byte-identical (II.1 rule 3 promises "never its plots"), moves nothing, and costs one level byte and one undo entry.

=== REPLACE §2.3 Terrain and water ===

### 2.3 Terrain and water

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

```ts
interface Terrain { id: Id; key: PlatKey /* the ground, or one sky island's own terrain */;
  cellCm: Cm; cols: number; rows: number; originX: Cm; originY: Cm /* the height raster: frame + margin (§3.2 (9)) */;
  datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level; one per document (per island for sky terrain) */;
  heightCm: Int32Array /* above datum */; reliefLimitCm: Cm /* 1 000 000 (10 km): the declared range every write is checked against */;
  hydro: HydroGrid /* the hydrology raster: frame + margin, coarser than the height raster (below) */;
  flowDir: Uint8Array /* on `hydro`: D8, defined on every land cell of frame and margin, flats included */; flatRank: Uint32Array /* on `hydro`: flat-resolution order; 0 off flats */;
  flowAccum: Uint32Array /* on `hydro` */; outfalls: Outfall[];
  seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */ }
interface HydroGrid { cellCm: Cm /* TOWN 1 600, CITY 2 500, METROPOLIS 3 200 (table values) */; cols: number; rows: number; originX: Cm; originY: Cm /* the same extent as the height raster */ }
interface TerrainSampler { heightAt(p: Point): Cm /* bilinear on the height raster; the 2.5 m refinement is computed on demand, never stored */; slopeAt(p: Point): number;
  flowAt(p: Point): { dir: number; accum: number } /* the `hydro` cell containing p */ }
interface WaterBody { id: Id; kind: 'sea'|'lake'|'river'|'tributary'|'distributary'|'islet_channel'|'pond'|'moat'|'estuary'|'harbour_basin'|'canal';
  face: FaceRef /* L0 */; shore: ChainRef /* ('shore', id): its ring(s) */;
  course?: Polyline /* rivers: the reach's centreline downstream — kept in step with the shores by S1's water operator (below) */;
  widthProfile?: Int32Array; depthCm?: Int16Array /* per `course` vertex: the course is the entity's own derived polyline, which no kernel op re-vertexes */;
  flowFrom?: Id; flowTo?: Id; bankKinds?: ChainProfile<'beach'|'rock'|'cliff'|'quay'|'marsh'> /* step, on the shore chain, G-R5 */;
  shoreClass?: ChainProfile<'bay'|'headland'|'straight'> /* step, on the shore chain */; lifecycle: Lifecycle }
```

Terrain is a raster in metres with a resolution set per size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m — so the 128²
fixed grid VG uses at every size is never the constraint) over the frame and its context margin; `cols × rows` follow
the arena's width × height (§3.2 (9)). Point queries go through a `TerrainSampler` (bilinear), which is how slope queries
inside the built extent and S11's ground datum read a 2.5 m refinement without storing one.

**The hydrology grid (VK-9; Judgment J-K12).** Flow direction, flat rank and accumulation live on their own raster,
`hydro`, which covers the same extent — frame *and* margin — at 16 m (TOWN), 25 m (CITY) and 32 m (METROPOLIS): 200²,
320² and 400² cells at the rungs' target populations, the cell counts S1's budget already assumed when hydrology ran on
the frame alone at 10 / 16 / 20 m (§12.4). A `hydro` cell's height is the height raster's bilinear sample at the cell's
centre, rounded to the centimetre, so the flood runs on integers. Measured with the mechanism below (bucket-queue
flood, two-gradient flats, D8, accumulation; `docs/validation/bench/fixall_kernel_r2_hydro.out`): CITY frame + margin at
25 m 15.9–17.2 ms against 15.3–16.4 ms for the previous frame-only 16 m raster, METROPOLIS at 32 m 25.3–26.5 ms against
25.6–26.8 ms, TOWN at 16 m 6.2–7.0 ms, every cell with a defined D8 on both 60 m and 3 000 m relief; covering the
margin at the previous cells would cost 41–44 ms at CITY and 67–69 ms at METROPOLIS. `flowAt(p)` returns the `hydro`
cell containing `p`, so a hinterland plot's `upstream` (§2.5), a water mill's reach and the sewer hook read defined
flow everywhere on the map, and O1 (b)'s "every terrain cell has a defined flow path to an outfall" is checked on this
grid over frame and margin (§13.1's 3 000 m fixture counts its land cells). The river course (§4.2 S1 (3)) is traced on
this grid and carved into the height raster; after the carve, D8 is recomputed on the carved corridor's cells and their
neighbours and accumulation is recomputed once (≈ 2 ms at CITY) — a carve lowers cells along a bed that descends
monotonically to its outfall, so it creates no depression and the flood is not repeated — so the stored flow agrees
with the carved terrain. *Pre-decided fallback:* the M0 site-and-fields spike's coarsening (§12.4) applies to this grid
(CITY 25 → 32 m, METROPOLIS 32 → 40 m, TOWN 16 → 20 m).

**Heights (GEO-15; Judgment J-K7).** Heights are `Int32` centimetres relative to a per-document datum: S1 sets
`datumCm` to sea level for a coastal site and to the site's base elevation otherwise, so stored values stay small and
a 3 000 m relief is ordinary. Every write to a height or depth raster — S1, the terrain brush, a site primitive — goes
through a range check against its declared limit that clamps and reports (`W_HEIGHT_CLAMPED` with the cell count in the
generation report) and never wraps; a typed-array store would otherwise wrap silently (an `Int16Array` stores 40 000 as
−25 536, executed in GEO-15). S1's tests include a mountainous fixture (3 000 m of relief with a hill-acropolis site)
that must round-trip without a clamp.

**Flats (GEO-15).** Sinks are filled by a bucket-queue priority flood on the integer `hydro` heights with exact flat
surfaces: a filled depression keeps its spill height and is never raised by an ε, and S1 types a depression deeper than
the table's lake threshold as a lake. Flow across every flat — filled depressions and genuinely level ground — is
resolved by the two-gradient flat-resolution method (a breadth-first gradient away from higher terrain and one towards
lower terrain, combined into `flatRank`), computed into its own array, so stored heights are untouched, D8 is defined on
every land cell and each flat drains to its spill point. D8 ties break in the fixed neighbour order E, NE, N, NW, W, SW,
S, SE, so flow is the same on every engine.

**Terrain is not in the plat.** Water faces and their shore and bank edges enter L0 from S1 (§4.2). Contour lines are
not model geometry: they are extracted per render tile and per export and clipped to the land faces (§4.2 S1 (2), §8,
§11). Drainage lines are raster queries, not plat edges: as L0 edges they would be antennae that every street, lane and
plot line inherited at L1–L4 would have to end on or avoid (§3.6), and a line that must be visible as water is a
`tributary` water body with its own L0 face instead. So an L1 face never straddles two L0 parents and no drainage
antenna enters a face ring (GEO-1, GEO-6). **Drainage (flow direction, flat rank, accumulation, outfalls) is queryable
per `hydro` cell** — the sewer hook's query surface. A sky island's terrain is its own `Terrain` with its own key, datum,
frame and `hydro` grid (§4.2, II.1).

**Water attributes along a shore (VK-2).** A shore's bank kind and shore class are step `ChainProfile`s on the water
body's shore chain (§2.2 rule 5): a knot where the class changes, so a street end, a bridgehead or a quay inserted into the
shore later never shifts which stretch is a beach and which a quay. The river `course` and its width and depth arrays are
S1's centreline of the reach, recomputed by S1's water operator whenever a batch moves or re-vertexes the reach's shores
(a `warp` with `fromLevel = 0`, a moved shore vertex, a `drawWater` edit; §7.3), so a warp can never leave it behind; a
moved river control point is the one edit that changes the course directly, and it re-traces the reach and its shores
together (§7.3).

*Judgment J-K7.* Chose `Int32` centimetres relative to a per-document datum over `Int16` decimetres because slope
thresholds at 2.5 m need centimetre precision (a decimetre step is a 4 % slope quantum at that spacing) and the cost is
small — 1.6 MB at CITY's 625² frame raster, 4.0 MB for the 1 000² frame-and-margin raster, 6.6 MB at METROPOLIS's 1 280².

*Judgment J-K12 (VK-9).* Chose one hydrology raster over frame and margin at 1.6 × the former frame-only cell (16 / 25 /
32 m) over hydrology on the frame alone (the margin's fields, farmsteads and mills had no defined flow and O1 (b) failed
there) and over frame and margin at the former cells (2.56 × the cells: + 25 ms at CITY, + 41 ms at METROPOLIS,
measured), because the cell count — and so the measured cost — is unchanged, and the river is a smoothed control
polyline carved into the 5–10 m height raster, so its trace does not need a finer flow grid.

=== REPLACE §3.1 Build-versus-adopt, per primitive ===

### 3.1 Build-versus-adopt, per primitive

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

| primitive | decision | candidate (licence) | degenerate-input handling |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | every coordinate passes `snap` (finite and range check in every build, §3.2 (7)); a new vertex within `attractCm` (26 cm) of an existing vertex lands on it; within `attractCm` of an edge it lands on the edge (`splitThrough`) — or on that edge's endpoint when the exact foot lies within `attractCm` of it, so no split leaves a sub-edge shorter than `minEdge`; a new chain running within `attractCm` of an existing edge shares that stretch with merged roles (§3.6); every new vertex on an existing edge (a split foot, a stretch's join or leave point, a crossing) is placed by the placement rule — the nearest lattice point that keeps `minEdge` and clearance (§3.6); crossings by iterated snap rounding on the 1 cm lattice, ≤ 3 passes — every pass leaves a planar arrangement, so an unconverged result commits with `W_SNAP_PASSES` instead of failing; there is no separate weld tolerance: coincidence is lattice-point equality, proximity is attraction |
| exact predicates | **build** `orient2d` (exact in doubles under the §3.2 bound); **adopt** `incircle` | `robust-predicates` **3.0.3, Unlicense** — the licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), the version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower, acceptable because `incircle` is off the topology path) | collinear / cocircular ties broken deterministically on lattice positions (never on slot ids), never `== 0` on floats; `incircle` is never on the topology path; ring orientation is `orient2d` at the lowest-leftmost vertex and areas are exact integers (`area2`, §3.2 (6)) — no topology decision reads the sign of a float sum |
| planar subdivision (one indexed arena per layer with level-tagged edges, per-level face records with stage ranks, holes, containment by parent, role and owner tables) | **build** — the core asset; **struct-of-arrays, allocation-free hot loops** (G-R7: NG's profile shows `Point.new` 385–561 k and `intersectLines` 147–213 k calls dominate) | — | every insertion is part of a batch transaction; self-touching chains split into simple runs, inserted run by run; a face below its class floor is absorbed across a partition edge or kept as typed `residue` — an edge carrying a structural role is never deleted (§3.6); a Steiner vertex never leaves the hot pixel of its coarser edge (§2.2 rule 3); finer content an earlier stage made is kept, never cleared by a coarser batch (§3.3); a finer vertex a coarser chain lands on is promoted, never duplicated (§2.2 rule 3) |
| polygon booleans | **build on the kernel's arrangement** (§3.7, Judgment J-K4): overlay the operands in a scratch arrangement with `insertChain`'s machinery, label faces by winding number, keep the selected faces | Clipper2 (BSL-1.0, compiled to WASM, run in Node) and `polygon-clipping` (MIT) are **CI oracles in `@plat/testkit` only**, never shipped | integer coordinates in and out under the same attraction, placement, `minEdge` and clearance rules as every other writer; fill rule declared per call (non-zero or even-odd); an empty result is `E_DEGENERATE` with detail `empty`; the oracle comparison is split by whether attraction fired (§3.7) |
| buffers, offsets, insets (uniform and per-edge) and bands | **build on the arrangement** (§3.7): a buffer is the union of per-segment strips and per-vertex join discs (round joins as chords of ≤ 2 cm sagitta; square ends where declared); a per-edge inset and the kerb are face − ⋃ buffers; corridors and wall bands are committed by `corridorUnion` / `bandUnion`; a varying half-width is sampled from the chain's knot profile (§2.2 rule 5), each segment's strip a trapezoid between its end widths | — | the half-plane inset is used only for a uniform inset of a face whose convexity is checked exactly (`E_NON_CONVEX` otherwise); an inset larger than the inradius returns `E_DEGENERATE` with detail `collapsed` and the last non-empty distance |
| straight skeleton (roofs of irregular footprints; label spines — the maximum-clearance spanning tree of the hole-aware skeleton graph, §9) | **build** (decided, §3.8, Judgment J-K5): a wavefront with an event queue in doubles using + − × ÷ √ only, events coalesced within 1 mm of offset time and 1 cm of position, ties by the vertex's index in the canonicalised ring, a work limit counted in events, a post-condition validator on every output; convex near-rectangular footprints take the exact OBB roof instead | none assumed: no permissive, mature JS/TS skeleton is known to this design; CGAL is GPL/LGPL — rejected | input pre-cleaned (collinear merge, min angle 5°); holes supported; a validator failure or `E_WORK_LIMIT` takes the typed downgrade — a plain roof (no ridge or hip lines), a sampled medial axis (spines) — exercised by fixtures: never a crash, never unvalidated output (MFCG's skeleton "glitches in special cases") |
| OBB, convex hull, largest inscribed rectangle | **build** | — (monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes: OBB long axis, frontage normal, ± 45° — G-R13) | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`) — never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers must branch on the typed result |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for the routing lattice, site sampling, Lloyd relaxation, field seeds, medial axes — never as the street source |
| Poisson-disc / blue noise | **build** | — Bridson with **k = 50 candidates, all evaluated** (the references' measured variant, `_critic.md` C2 — G-P17), run once per session per scatter class to build the small set of ranked, periodic blue-noise tiles of §8 (MFCG's precomputed-tile trick); per-instance placement is the §8 stamp — the tile with a per-entity offset and rotation drawn from the entity's stream, clipped by point-in-polygon, ≤ 1 µs per instance (§4.9, §8) | domain clipped to any polygon with holes; empty domains return empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), not from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT) with our seeding, fBm and warp built | seeded from sub-streams; octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | smoothing never moves pinned vertices (gates, junctions, portals); a smoothing or warp step is validated as a **whole step** — edges incident to moved vertices against the index and unmoved vertices against the swept triangles, every edge incident to a moved vertex at least `minEdge` long, no two vertices on one lattice point, and the clearance invariant — and halved globally on failure (§3.6); Visvalingam–Whyatt is topology-preserving (a removal is refused when the new edge would touch or cross another edge of the ring, its face's other rings or a declared obstacle, checked in the index — the `simplify` service of §3.4); fillets skipped when legs are shorter than the chord; results re-enter through `insertChain` |
| spatial index | **adopt + build** | `flatbush` (ISC) as static partitions per level — one per arena at L0–L1, one per district at L2–L4 — rebuilt only at stage end; a uniform grid per level for every change inside a stage and for edits (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | query results are sorted by the **canonical key of their item kind** — a vertex by its lattice position (y, then x); an edge by its two endpoints, lower (y, x) first; a face by the first two vertices of its canonical outer ring — a total order, because a directed half-edge bounds exactly one face per level (§3.3) — so which index holds an item never changes an output; tombstones filter static-partition hits only |
| marching squares / distance transform | **adopt / build** | `d3-contour` (ISC) or our own | linear time; the VG hot spot (`createDeflection`) avoided by construction; contours are extracted per render tile, not in S1, and are never plat edges (§2.3, §8) |
| path search | **build** (binary-heap A\* / Dijkstra on rasters and on the subdivision graph; the 2017 "A\*" is a FIFO BFS, not reproduced) | — | `E_NO_PATH` result with the closest reached point |
| triangulation (render, fields) | **adopt** | `earcut` (ISC) | holes supported; degenerate triangles skipped and reported |
| deterministic math | **build** — `dmath`, our own TypeScript port of the fdlibm 5.3 routines the model needs (sin / cos / atan2 / exp / log / pow), carrying Sun's notice (D-23, J-11, §17.4; G-P6) — no third-party maths package in the production closure | — | `Math.sqrt` is IEEE-exact and allowed; every other transcendental goes through `dmath` under the allowlist lint of §6.5; a division by a computed value goes through `ratio()` (§3.2 (8)) |
| RNG and hashing | **build** | — (xoshiro128\*\* streams seeded from a 128-bit key hash; §6.1) | — |

Every primitive returns a **typed result** and never throws for a geometric reason:

```ts
type KernelResult<T> = { ok: true; value: T; warnings: Warning[] } | { ok: false; code: KernelError; detail: string; partial?: T };
type KernelError =
  | 'E_OUT_OF_RANGE'       // snap(): non-finite, or |coordinate| ≥ 2^23 cm — a caller bug, reported with its stream key, never stored (§3.2 (7))
  | 'E_DEGENERATE'         // ratio() with a vanishing denominator; OBB / hull of collinear or < 3 distinct points; an empty or collapsed boolean, buffer or inset
  | 'E_LEVEL'              // a batch wrote a level other than its own (§2.2 rule 3)
  | 'E_LOCKED'             // the op would cut, move or delete geometry owned by a locked or pinned entity — returned to the dry run as a conflict (§7.1)
  | 'E_KEPT'               // the op would cross, clear or come within attractCm of finer content an earlier stage made and this batch does not re-derive (§3.3) — a stage-domain bug in generation, a conflict in an edit's dry run
  | 'E_SCOPE'              // a pool district overlay wrote outside its district's face set, or two overlays touched one record (§3.3)
  | 'E_STRUCTURAL'         // a merge or removal would delete an edge carrying a structural role (§2.2 rule 7)
  | 'E_NOT_TWO_CROSSINGS'  // splitFace contact semantics violated (§3.6)
  | 'E_HOLE_CONTACT'       // connectHole post-condition violated (§3.6)
  | 'E_SELF_INTERSECT'     // a ring whose role requires a simple polygon (a claim, a drawn boundary) crosses itself
  | 'E_BELOW_MIN_EDGE'     // optional chains only: the chain collapses below one edge after decimation (§3.6)
  | 'E_BELOW_MIN_ANGLE'    // optional chains only: a face corner below minFaceAngle (§3.6)
  | 'E_BELOW_MIN_AREA' | 'E_BELOW_MIN_WIDTH'   // a class floor declared by the caller
  | 'E_NON_CONVEX'         // the half-plane inset path was asked for a non-convex face
  | 'E_NO_PATH'
  | 'E_WORK_LIMIT'         // an operation-count budget was exhausted — counted in operations, never measured by a clock (§3.3)
  | 'E_INVARIANT';         // a declared hard invariant failed at commit (§3.10)
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_STEINER'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE';
  count: number; at?: LatticePoint };   // W_PLACED: a new vertex placed away from its nearest lattice point by the placement rule (§3.6); W_PROMOTED: a finer vertex promoted (§2.2 rule 3)
```

The earlier codes map as follows: `E_TIMEOUT` → `E_WORK_LIMIT`; `E_SNAP_UNSTABLE` → the warning `W_SNAP_PASSES`;
`E_MIN_EDGE` → `E_BELOW_MIN_EDGE` (optional chains only); `E_COLLAPSED` and `E_COLLINEAR` → `E_DEGENERATE` with a detail;
`E_NONMANIFOLD` → prevented by the contact semantics and the simple-face invariant (§3.6, §3.10).

*Chose to build `dmath` rather than adopt a maths package (NF-D15, NF-S8)* because D-23, J-11 and §17.4 already decided
it and a port we own keeps the production closure free of a 94-package dependency; the earlier "adopt" wording in this
table was stale. *Chose a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback (VK-16)*
over re-verifying at adoption, because the licence is confirmed now and the checker re-runs on every upgrade, so no
licence question is left open.

=== REPLACE §3.2 Numeric policy ===

### 3.2 Numeric policy

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

```ts
interface Frame { widthCm: Cm; heightCm: Cm; aspect: number /* width / height, 0.5–2 */; marginShare: 0.3 /* context margin per side */ }
```

1. **Integer world.** All persisted geometry is integer cm. Intermediate rational points (crossings, offsets,
   circumcentres, skeleton nodes) are computed in doubles and immediately placed on the lattice (§3.6's placement rule
   for points on existing edges, nearest-point rounding otherwise). **Range bound, derived from the frame table (K-4
   repair, re-derived for rectangular frames and for the population cap):** at its target METROPOLIS at the extreme
   aspect 2 is 11.31 km × 5.66 km, plus the 30 % margin on every side, so |x| ≤ 0.8 × 11.31 km = 905 097 cm ≈ 2^19.8;
   the largest arena of all is METROPOLIS at the population cap of 120 000 (§12.2: 153.6 km²) at aspect 2 — 17.53 km ×
   8.76 km, so |x| ≤ 0.8 × 17.53 km ≈ 1 402 000 cm ≈ 2^20.4. The range invariant is `|x|, |y| < 2²³` cm (83.9 km), so
   every coordinate difference is < 2²⁴, every `orient2d` term < 2⁴⁸, the determinant < 2⁴⁹, and the sign of `orient2d`
   is exact in ordinary doubles with ≈ 6× headroom over the largest arena (≈ 9× at the METROPOLIS target). `incircle`
   uses the adaptive predicate and is kept off the topology path. Every exactness argument below rests on the range
   invariant, which `snap` enforces, never on the frame table, so a rescaled frame (§13.7 O14 (e)) cannot break one.
2. **Tolerances are world lengths, never parameter-space** (the OS `DELTA = 1e-6` on line parameters is the
   anti-pattern): `minEdge = 25 cm`; `attract = 26 cm` (= `minEdge` + the lattice slack: a vertex split onto an edge is
   placed at least `attractCm` − 0.71 cm = 25.29 cm from both of the edge's endpoints, because a vertex whose exact foot
   lies within `attractCm` of an endpoint moves onto that endpoint instead — §3.6 step 2). An incoming vertex therefore
   moves by at most √2 · `attractCm` ≈ 36.8 cm (onto an edge's endpoint from beside the edge); a new vertex on an
   existing edge moves off its nearest lattice point only under §3.6's placement rule. Measured
   (`docs/validation/bench/fixall_kernel_r2_attract.out`): over 400 000 vertices dropped in the attraction band of
   random lattice edges, 0 sub-edges shorter than `minEdge`, the shortest 25.50 cm, the largest displacement 36.72 cm;
   the rule as first written left a sub-`minEdge` edge in 1.34 % of edge attractions (the round-1 verifier's
   `fixall_verify_kernel_attract_gap.out`). `minFaceAngle = 5°` (the kernel's soft corner floor, §3.10); the class floors
   from the tables — `minPlotWidth = 2.5 m`, `minInteriorAnglePlot = 12°` (FTG's sheared quads at p95 22.9° corner
   deviation stay legal — invariants police validity, not regularity), `minCorridor` per class. **One minimum-edge rule
   for every writer (GEO-35):** every writer — `insertChain`, booleans, buffers, offsets, smoothing, `warp` — creates or
   moves edges only through the insertion semantics of §3.6 or the move validation of §3.6, and the invariant checks the
   same `minEdge` on new *and moved* edges (§3.10). Face-size floors are always a minimum width and a minimum area,
   never `minEdge`. The earlier 5 cm weld no longer exists: coincidence is lattice-point equality and proximity is
   attraction (Judgment J-K2).
3. **No float comparisons for topology.** Equality is index equality; "same place" is a lattice test. Any float that
   decides a topology operation is quantised to integer cm or to a 16-bit binary angle first. A distance comparison
   against `attractCm` or `minEdge` on a computed point (an exact foot, a crossing) is made in doubles with + − × ÷ √
   only, so it gives the same answer on every IEEE engine; a borderline case may fall either way without breaking any
   bound, because the 1 cm between `attractCm` and `minEdge` exceeds the 0.71 cm of any single rounding.
4. **Cross-platform reproducibility**: integer geometry + `dmath` + integer-derived random floats (`(u32 >>> 8) · 2⁻²⁴`) +
   **one geometry engine on every host** (§3.7) + a deterministic op order in every batch (§3.3: canonical for declared
   op sets, issue order for callback-form stages) ⇒ identical model hashes on every engine (O2 a, O3 e); the nightly
   cross-platform golden run (Node x86 / arm, Chromium, Firefox, WebKit; workers on and off; pool sizes 0–3) is the
   proof (§13).
5. **Angles and directions** are unit vectors in doubles derived from integer endpoints; growth headings are stored as
   centidegrees.
6. **Exact areas and orientation (GEO-32, VK-8; Judgment J-K13).** `area2(ring)` returns twice the signed area as an
   exact integer for **every ring `snap` can produce**: each shoelace term `xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ` is taken on coordinates
   relative to the ring's bounding-box minimum corner, which lie in [0, 2²⁴) by the range invariant, so each product is
   an exact double below 2⁴⁸ and |term| < 2⁴⁸; terms are summed in a double partial that is flushed into a BigInt
   accumulator whenever its magnitude reaches 2⁵² (one comparison per term), so every partial stays below 2⁵² + 2⁴⁸ < 2⁵³
   and every addition is exact. Faces at the frame table's sizes never reach the flush (their terms are < 2⁴³), so the
   common path costs one extra comparison per term; the final value is returned as an exact double, because a simple
   ring's twice-area is below 2⁴⁹ (every face ring is simple, §3.10); a self-crossing ring — only a boolean operand
   before its overlay can be one — has `area2Big`, which returns the BigInt itself. Measured (`fixall_kernel_r2_attract.out` E): three star rings of radius
   2²³ − 2, whose terms all share one sign, are exact under this rule and inexact under the former fixed 1 024-term
   flush, which rested on the frame table instead of the range invariant. Ring orientation is `orient2d` at the ring's
   lowest-leftmost vertex; no orientation, sliver or degeneracy decision reads the sign of a float sum. Area statistics
   in m² are derived from the exact integer.
7. **The finite and range check lives at the one door (GEO-7).** `snap(x, y)` is the only way a number becomes an arena
   coordinate, and in every build — not only in debug — it rejects `!(Math.abs(v) < 2**23)`, one comparison per
   coordinate that also catches NaN and ±∞, with `E_OUT_OF_RANGE`. NaN, ±∞ and values past 2³¹ therefore never reach an
   `Int32Array`, which would store them silently as 0, 0 and a wrapped value (executed in GEO-7) — the null-`rect` crash
   class cannot return as a vertex at the world origin. Height and depth rasters have their own clamp-and-report check
   (§2.3).
8. **Checked ratios.** In model packages a division by a computed value goes through `ratio(num, den, kind)`, which
   returns `E_DEGENERATE` when |den| is below the quantity's floor (length 1 cm, area 1 cm², angle 1 centidegree, count
   1); a lint rule flags every other division whose divisor is not a non-zero literal.
9. **Frames are rectangles (COV-VG-VN-156).** A rung declares a frame *area* A (TOWN 4 km², CITY 25 km², METROPOLIS
   64 km² — the former 2 / 5 / 8 km squares); the blueprint's `aspect` ∈ [0.5, 2] (default 1) gives
   `width = √(A · aspect)` and `height = √(A / aspect)`, centred on (0, 0) with `+y` north, and the arena spans the
   frame plus `marginShare` on every side. Every raster's `cols × rows` follows width × height. The range bound of (1)
   is derived from the largest frame at the extreme aspect, so a non-square town — the shape a village product and many
   river and coast towns want — needs no other change.

*Judgment J-K13 (VK-8).* Chose a magnitude-triggered flush (at 2⁵²) derived from the range invariant over a fixed
16-term flush and over the former 1 024-term flush derived from the frame table, because it is exact for every ring
`snap` admits whatever `ladder.json` says, and ordinary faces never pay a BigInt addition at all (a fixed 16-term flush
would pay one per 16 terms on every face).

=== REPLACE §3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end ===

### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

```ts
interface KernelTx { key: PlatKey; level: Level; ops: KernelOp[] /* declared form only: independent ops, applied in canonical order */;
  expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade'; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives: finer content an earlier stage made is kept (below); = stage in generation, the start of the edit's re-derivation for an edit (§7.3) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: PlatKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are the "moved edges" of §3.10 (GEO-35) */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3); the edit's undo record keeps their lattice points and former levels */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[]; work: number }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; the kernel applies the ops to a scratch overlay, serves every query inside the batch from the level's
dynamic grid plus the static partitions, validates the batch-local invariants on the touched faces and their one-ring
(§3.10), and commits or rejects atomically. Local repair (§5) runs inside the transaction on the overlay.

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  bounded Steiner vertices and promotions of §2.2 rule 3; it may clear finer content inside its faces (`clearFiner`)
  subject to the kept-content rule below, and a `warp` batch moves vertices of every level ≥ its own (§3.6); anything
  else is `E_LEVEL`. A lane that a finer stage would like to add to a coarser level is therefore a separate, coarser
  transaction (§4.7), never a side effect of a finer one; a stage that writes two levels (S7: its intervallum lane, quays
  and piers at L1, its bands at L3) issues one transaction per level, coarser first.
* **Kept content (VK-1; Judgment J-K14).** Every face records the rank of the stage whose batch created it
  (`LevelFaces.stage`; the rank is the stage's position in §4.1's topological order, fixed per generator version). A
  batch clears finer content inside its faces only where that content's stage rank is at least that of
  `rederivesFrom`; finer faces an earlier stage made are **kept** — neither cleared nor re-owned — and their edges and
  vertices are obstacles: an op that would cross a kept edge, split a kept face, move kept geometry or bring new geometry
  within `attractCm` of it (other than a finer vertex on a route the chain ends on, which is promoted, §2.2 rule 3)
  returns `E_KEPT`. The re-walk re-parents each kept face into the new face that contains it — a kept face never
  straddles a new edge, because crossing it is refused — so nesting holds. In generation `E_KEPT` cannot arise on a
  correct pipeline, because every stage's domain excludes the kept content of earlier stages with its keep-out band (S8
  and S9 exclude each wall band ⊕ setback, as they exclude reservations; §4.6, §4.7): the rule turns a wrong domain —
  the S7 bands that S8 and S9 would otherwise erase — into a typed failure that the stage property tests catch. In an edit
  it returns to the dry run as a conflict whose offered resolution is to start the re-derivation at the stage that made
  the content; a regenerate beside a wall already starts at S7's band step for the wall-adjacent cells (§7.3), so their
  bands are re-derived, not kept. `clearFiner` never removes kept content and never reports it as a conflict: it is kept
  by design, and only locked or pinned content is a conflict (§2.2 rule 6).
* **Two op forms (GEO-11, VK-6; Judgment J-K15).** A transaction takes exactly one of two forms, fixed by its stage's
  registration (§4.1, §14); a transaction that supplies both `ops` and a callback is a programming error caught by an
  assertion.
  * **Declared** — `KernelTx.ops` lists independent ops, none reading another's result (S3's carvings, S4's routed
    arterials, S7's bands, S9's `corridorUnion`, S11's per-plot footprints, an edit's inserted feature). Before applying,
    the kernel sorts them by a stable key — op kind rank, then the owning entity's lineage key (§6.3), then the op's
    index within that entity's stream path — so the committed arena is a function of the prior arena and the op *set*,
    not of the order in which the stage issued them. Hot-pixel snap rounding is order-independent; attraction, the one
    order-sensitive rule, becomes deterministic under the canonical order. A property test permutes each declared
    fixture batch's ops and requires identical output.
  * **Callback** — `tx(tx, fn)` (§14) hands `fn` the open overlay; each op `fn` issues applies at once, in issue order,
    and later ops read its result. S5c's growth queue (each proposal tested against the streets already grown), S8's
    bent-cut recursion (each cut planned on the kerbs of the faces the previous cut made) and S10's plot subdivision
    (claims, per-frontage regions, strips, joins in sequence) are callback-form stages. The issue order is deterministic
    because it is a function of the stage's inputs, its streams (§6.1) and canonically sorted query results (below) —
    never of slot numbers, worker scheduling or arrival order — and attraction within the sequence follows it. The test
    for this form is issue-order determinism: the stage run twice, on a slot-renumbered arena, and inside the pool at
    sizes 0–3 gives identical digests. Op permutation does not apply to it, because its ops depend on one another.
* **No output depends on slot numbers.** Every tie-break in the kernel uses lattice positions (y, then x), canonical
  item keys (below) or entity ids, never a `VertexId`, `HalfEdgeId` or `FaceId`, so an arena compacted on save, one
  grown through a long session and one merged from pool overlays give identical results for the same next edit. A
  property test renumbers the arena's slots and requires identical output.
* **Work limits instead of clocks (GEO-2).** Every op charges operation counts to its transaction — points snapped,
  attraction queries, placement candidates tried, crossings resolved, faces walked, skeleton events — and a transaction
  that exceeds its declared `workLimit` returns `E_WORK_LIMIT`. Counts are identical on a slow and a fast machine, so a
  budget can select a ladder rung without changing what the seed produces.
* **The commit record** lists what the batch created, changed, moved, promoted and removed per level. It is the input
  of the batch-local invariants (§3.10), of index maintenance (below), of the display list's dirty set (§8) and of the
  digest update: at commit the kernel re-hashes the leaves the batch touched — the per-level plat digests and the entity
  leaves of §6.2 — and the nodes on their paths to the root; the maintenance budget is ≤ 5 % of the batch's time and the
  root's finalisation ≤ 5 ms at CITY (§6.2, §12.4). It is never persisted, because it holds arena slots. A batch already
  validated by an edit's dry run (§7.1) commits that validated overlay without a second validation.

**The derivation pool's overlays (VK-3; Judgment J-K16).** The per-district stages that run in the pool (S10, S10b, S11,
S12b; §4.1) use these same transactions on **district overlays**, in five steps:

1. *The frozen base.* When the eager S10a commits, the generation worker freezes the arena at that version and sends
   each pool worker one read-only copy — the vertex, half-edge, role and face arrays with the L0–L2 static index
   partitions — as transferred `ArrayBuffer`s. No `SharedArrayBuffer` is used, so an embedding host needs no
   cross-origin isolation (§11.2). The copy is ≈ 10 MB at CITY, one memory copy per worker (≈ 1 ms each at memory-copy
   speed, ≈ 3 ms for three workers; §12.4), and §12.8 counts one arena copy per pool worker.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base: new
   vertices, half-edge pairs, face records and role rows go to the overlay's own growable arrays in overlay-local slots
   numbered above the base's high-water mark, and a change to a base record — a kerb edge split by a plot line, a face
   ring re-walked — is written as a copy-on-write record in the overlay. Every district starts from the frozen base
   alone, never from another district's overlay, so its result is a pure function of the base, its allocation and its
   own sub-stream, whichever worker runs it and whatever ran on that worker before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. A write of any kind — a
   split, a retype, a role row, a move, an owner change — to a vertex, edge or face that is not wholly inside that set
   returns `E_SCOPE`. District boundary edges are L1 spines and L2 corridor edges committed before S10, so a correct
   stage never writes them (a role a stage must add on a boundary way — an avenue's street trees — is written after the
   merge by the eager part of that stage, §4.9). Eager work the generation worker runs while the pool works (S12a's
   hinterland, §12.4) writes only faces outside every district's face set. The overlay also lists the base records it
   copied; at merge, two overlays that copied the same base record, or a copied base record that the live arena changed
   after the freeze, fail the pool with `E_SCOPE` — defence in depth that a test asserts never fires.
4. *The merge.* The generation worker applies the overlays in district lineage order (§6.3): each overlay's new records
   are appended with a slot remap table (overlay-local slot → next free arena slot), its copy-on-write base records
   replace their originals, references inside the overlay are rewritten through the remap table, and only that
   district's faces are re-walked to validate rings and parents. The district's L2–L4 static index partitions, built by
   the worker at district end, travel with the overlay and have their item tables rewritten through the same remap
   table, so the merged arena needs no index rebuild; the district's digest leaves (§6.2) travel with it too, and the
   root is finalised once after the last overlay. The cost is O(overlay size): the ≈ 200 000 records S10–S12b create at
   CITY merge within §12.4's 8 ms merge row.
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; Judgment J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned —
one partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland,
margin) — with a tombstone set, and (b) one **dynamic uniform grid** (cell 25 m at L0–L1, 10 m at L2, 5 m at L3–L4;
table values) with O(1) insert and delete. Inside a stage every insertion and deletion goes to the grid; a query reads
the static partitions its box intersects and the grid, drops the static hits whose slot is tombstoned, and **sorts its
result by the canonical key of each item kind** (VK-14): a vertex by its lattice position (y, then x); an edge by its
two endpoints' positions, the lower (y, x) first; a face by the positions of the first two vertices of its canonical
outer ring — its lowest-leftmost vertex and that vertex's successor counter-clockwise; in a mixed result vertices come
before edges and edges before faces. The key is total: no two vertices share a lattice point, no two edges share both
endpoints, and a directed half-edge bounds exactly one face per level — so which structure holds an item never changes
any answer, and no implementation ever needs a slot to break a tie. **Tombstones (VK-15)** name slots deleted since
their partition was built and filter **static-partition hits only**: a slot freed and reused inside the stage holds a
new item that lives in the dynamic grid, which tombstones never filter, so reuse can never hide it. *Chose static-only
filtering over forbidding slot reuse until the next rebuild* because the old and new occupants of a slot then live in
different structures by construction and the arena stays compact. **Static partitions are rebuilt only when a stage
ends** — for an eager stage once, after its last batch; for a lazy or pooled per-district stage, the district's own
partitions after that district's run — and, during an editing session, when a partition's grid overflow exceeds
max(256, ¼ of its static size): a count, never an idle timer. Measured rebuild cost of the flatbush construction
(`docs/validation/bench/bench_index.out`): 0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 ms at 17 000. At CITY that is
about one L3 and one L4 rebuild per stage (≈ 7 ms together), or ≈ 0.2–0.3 ms per district partition, instead of the
1.9 s (S10) and 13.4 s (S11) that a rebuild per block or per plot commit would cost; a single plot edit rebuilds at most
its district's L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5 ms) inside the 5 ms plot-edit budget. A cost-model test
fits each stage's time against commits × level size and fails if rebuild work grows with the number of commits (§13.2).

The commit granularity is part of every stage's declaration (§4.1), so the ≈ 48 s hazard of per-insertion commits the
engineering judge computed cannot arise, and neither can its per-batch twin; the first M0 measurement is the cost of
insert + snap + attract + re-walk per growth proposal (target ≤ 8 µs, with §3.7's rule for a miss; §16).

*Judgment J-K6.* Chose static partitions rebuilt at stage end (per district at L2–L4) with a dynamic grid inside stages
over a rebuild per batch commit, because per-batch rebuilds of a growing level make S10 and S11 cost seconds (measured
1.9 s and 13.4 s at CITY), and chose query results sorted by a total canonical key per item kind so that index state
can never change an output.

*Judgment J-K14 (VK-1).* Chose to keep finer content an earlier stage made — an obstacle to later coarser batches, with
`E_KEPT` for a violation — over letting a coarser batch clear everything finer inside its faces and re-running the
earlier stage afterwards, because S7's wall bands precede S8's lanes and S9's corridors by design (the wall comes before
the fabric it shapes), re-running S7 after every district's infill would repeat the band work and ghost the band during
the gap, and the stage rank per face costs one byte.

*Judgment J-K15 (VK-6).* Chose two declared transaction forms — independent op sets in canonical order, dependent op
sequences in issue order — over one canonical order for every batch, because a recursion such as the bent cut plans each
op on the faces the previous op created, so sorting it would apply a child cut before its parent face exists, while its
issue order is already a deterministic function of the stage's inputs and streams.

*Judgment J-K16 (VK-3).* Chose read-only transferred copies of the arena with one copy-on-write overlay per district and
a lineage-ordered merge, over a `SharedArrayBuffer` arena written in place by the workers, because shared memory makes
cross-origin isolation a requirement of every embedding page (D-4's embed target), in-place writes would need locks
whose order could leak into the output, and a district that starts from the frozen base alone is deterministic whatever
the pool size; the price is one arena copy per worker (≈ 10 MB at CITY), counted in §12.8.

=== REPLACE §3.4 Kernel operations the pipeline needs (complete list) ===

### 3.4 Kernel operations the pipeline needs (complete list)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

```ts
// @plat/kernel — the only writers of any arena. `tx` is the open KernelTx (declared or callback form, §3.3); write ops charge its work count.
// Writers (level = tx.level; semantics §3.6)
insertChain(tx, points: Point[], roles: RoleRow[], cls: 'mandatory'|'optional', opts?: { closed?: boolean; pinned?: number[]; knots?: { index: number; role: RoleName; ordinal: number }[] }): KernelResult<ChainInsert>
splitThrough(tx, at: HalfEdgeId, p: Point): KernelResult<VertexId>         // a vertex on an existing edge, placed by §3.6's placement rule; a Steiner vertex when the edge is coarser (§2.2 rule 3)
removeEdges(tx, ref: ChainRef | EdgeSetRef): KernelResult<void>            // strips (role, entity); deletes edges left with no role; dissolves degree-2 Steiner vertices that carry no role row
clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Conflict[]>     // removes content finer than `level` inside the faces whose stage rank ≥ tx.rederivesFrom's; kept content stays silently; locked or pinned owners are returned, not removed (§3.3)
retypeEdges(tx, ref: ChainRef | EdgeSetRef, add: RoleRow[], remove: RoleName[], rekey?: { from: Id; to: Id; ordinalOffset: number }): KernelResult<void>   // the EVO conversion primitive (wall → way) on role sets; `rekey` moves a chain's knot and vertex roles to the entity that now owns the chain (a way split or joined, §2.2 rule 5)
setOwner(tx, faces: FaceId[], owner: Id): KernelResult<void>
splitFace(tx, face: FaceId, cut: Point[] /* a bent cut is 2–3 vertices */): KernelResult<[FaceId, FaceId]>   // children ordered: left of the directed cut first
connectHole(tx, face: FaceId, cut: Point[]): KernelResult<FaceId>          // outer ring → hole slit: same face count, one hole fewer
mergeFaces(tx, a: FaceId, b: FaceId): KernelResult<FaceId>                 // deletes shared partition edges only; a structural shared edge → E_STRUCTURAL
absorbSliver(tx, face: FaceId, floor: { minWidthCm: Cm; minAreaCm2: number }): KernelResult<FaceId>   // never deletes a structural edge (§3.6)
claimSubFace(tx, claim: { ring: Point[] } | { areaCm2: number; within: FaceRef; score: RasterRef }, owner: Id): KernelResult<FaceRef>   // may span several faces
radialSplit(tx, face: FaceId, apex: Point, raysCdeg: number[]): KernelResult<FaceId[]>   // a fan from a centroid or a vertex (groves, chapter houses)
ringBand(tx, face: FaceId, widthCm: Cm): KernelResult<{ band: FaceId[]; core: FaceId }>  // an inner band around a court (cloister, quadrangle)
corridorUnion(tx, l1Faces: FaceRef | FaceId[]): KernelResult<BandResult>   // L2 half-corridor strips, junction wedges and built blocks for those L1 faces only (§3.7); kept faces inside them are holes (§3.3)
bandUnion(tx, chains: { ref: ChainRef; halfWidthCm: Cm | ChainProfile; ends: 'round'|'square' }[], faces: FaceId[], edgeRole: 'kerb'|'band', owner: Id): KernelResult<BandResult>   // the axis chain splits the band per side; corners get corridor_split; a profile is sampled per segment end (§2.2 rule 5)
warp(tx, field: DisplacementField, fromLevel: Level, region: Point[]): KernelResult<MoveReport>   // the edit layer computes the field from a WarpStroke or a moveVertex (§7.1) on the current geometry; whole-step validated (§3.6)
pinVertices(tx, refs: VertexRef[]): KernelResult<void>                    // sets the kernel `pinned` flag (smoothing, simplification and cutting keep the vertex; warp does not, §3.6)
// Services (read-only; values, never arena slots that outlive a commit)
resolve(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef, key: PlatKey): Resolved   // current slots, stamped with the arena version
resolveVertexAt(key: PlatKey, at: LatticePoint, sig: VertexSig, carry: CarryMap /* §6.3's supersedes table: old address → successor */): { vertex: VertexId } | { orphaned: true; nearest?: LatticePoint }   // a log position → a vertex, never by distance alone (§2.2 rule 5)
signature(key: PlatKey, v: VertexRef | LatticePoint): VertexSig             // what an edit stores beside a position
sampleProfile(p: ChainProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex'): number[] | string[]   // a knot profile sampled by arc length along the owner's own-level route
kerb(face: FaceId /* L1, committed or in the open overlay */): KernelResult<Ring[]>   // face − ⋃ buffer(spineᵢ, half-widthᵢ): what corridorUnion commits (§3.7); half-widths sampled from each way's width profile
booleans(op: 'union'|'intersection'|'difference'|'xor', a: Ring[], b: Ring[], fill: 'nonzero'|'evenodd'): KernelResult<Ring[]>
buffer(chains: Point[][], halfWidthCm: Cm | Cm[] /* per input point of these transient chains */, joins: 'round'|'square'|'miter', ends: 'round'|'square'|'flat'): KernelResult<Ring[]>
offsetFace(face: FaceId, perEdgeCm: Cm[]): KernelResult<Ring[]>             // face − ⋃ buffer(edgeᵢ, dᵢ)
insetRing(face: FaceId, dCm: Cm): KernelResult<Ring[]>                      // uniform; half-plane path only for a face checked convex
skeleton(rings: Ring[], use: 'roof'|'spine'|'regions'): KernelResult<Skeleton>   // §3.8: validated output (arcs, nodes with offset times, the face of each input edge) or a typed downgrade
simplify(chain: Point[], minSegmentCm: Cm, minAngleCdeg: number, obstacles: Ring[], pinned: number[]): KernelResult<Point[]>   // topology-preserving: refuses a removal that would self-touch, cross an obstacle or move a pinned vertex
hexLattice(region: Ring[], spacingCm: Cm, jitterCm: Cm, rng: Stream): { points: Point[]; adjacency: Int32Array }   // S4's routing lattice with adjacency by construction
obb(ring) · hull(points) · lir(ring, axes) · sideRuns(face, turnTolCdeg): Run[] /* maximal boundary runs with chord directions */ ·
sampleBoundary(face, stepCm) · pointLocate(key, level, p) · faceNeighbours(face, level) · area2(ring) · area2Big(ring) · orient(a, b, c)
```

`insertChain` is the only door for new edges, `removeEdges` and `clearFiner` the only doors for removing them, and `warp`
the only door for moving existing vertices (a `moveVertex` edit is a `warp` whose field displaces one vertex, resolved
by `resolveVertexAt`); every other writer is built from these, which is why planarity, `minEdge`, clearance and the
kept-content rule are properties of this list rather than of every stage (§3.10). Each op has documented preconditions,
work local to the touched faces, a typed result, a declared operation count and fuzz tests with constructive
degeneracies (§13.1). The pipeline's older names map directly: `corridorUnion` keeps its name and becomes the corridor
use of `bandUnion`; `claimSubFace` may now span several faces (a reservation that crosses coarse faces, a precinct, a
bailey); `retypeEdges` acts on role sets; `bufferChain` is `buffer`; `edgeChainBetween` is `resolve(ChainRef)`; `weld`
no longer exists (attraction, §3.6); `refine(level)` is a stage, not a kernel op. `sideRuns` gives stages a side notion
that survives curved, round-joined kerbs (maximal runs within a cumulative turning tolerance, each with its chord
direction), which the bent cut needs (§4.6). `setOwner` and `retypeEdges` are also the calls §6.3's succession uses:
when a re-derivation hands a carried address to a successor, the same batch re-owns the successor's faces and roles
under that address, so geometry and address always move together. `buffer`'s per-point half-widths apply only to the
transient chains a caller passes in (a stroke being previewed, a skeleton arc); a stored chain's varying width is always
a `ChainProfile`, sampled by `kerb` and `bandUnion` (§2.2 rule 5). A chain that carries a profile is inserted with its
knots (`opts.knots`: the chain index of each knot vertex with its knot role and ordinal); a knot that attraction lands
on an existing vertex is carried to that vertex, so the profile keeps its knot.

=== REPLACE §3.6 Insertion, contact and move semantics — attraction instead of a weld dead band ===

### 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

**Attraction (GEO-3, VK-18; Judgment J-K2).** `insertChain` processes each chain of a batch in the batch's order —
canonical for a declared op set, issue order in a callback-form stage (§3.3) — in five steps. Its candidates are the
vertices and edges of level ≤ the batch's level, plus the **finer vertices lying on those edges' routes** where the
chain ends on or joins such a route: they attract like any vertex, and one that attracts a chain vertex is promoted to
the batch's level (§2.2 rule 3; `W_PROMOTED`, listed in the commit record). Finer content inside the batch's faces has
been cleared (§2.2 rule 6) unless it is kept (§3.3); kept geometry is an obstacle, and a chain that would cross it or
come within `attractCm` of it elsewhere returns `E_KEPT`. A chain is inserted run by run, and the part of it already
inserted counts as existing geometry for its later parts, so a chain that doubles back near itself attracts onto
itself like onto any other edge.

1. *Snap and decimate.* Every point passes `snap` (§3.2 (7)). Consecutive points closer than `minEdge` are decimated —
   the later one is dropped unless it is pinned or a knot (§3.4 `opts.knots`); two pinned or knot points closer than
   `minEdge` merge at the first, reported, and a merged knot vertex carries both ordinals (a step in its profile). A
   chain that touches or crosses itself is split into simple runs.
2. *Vertex attraction.* A chain vertex within `attractCm` of an existing vertex moves onto it (nearest; ties to the
   smaller lattice position, y then x). Otherwise, within `attractCm` of an existing edge (the nearest; ties by the
   edges' canonical keys, §3.3), take the exact foot of the vertex on that edge: **if the foot lies within `attractCm`
   of one of the edge's endpoints, the vertex moves onto that endpoint** (the nearer; ties y then x), because a split
   there would leave a sub-edge shorter than `minEdge`; otherwise it moves onto the edge at the foot's placement point
   (below) by `splitThrough` — a Steiner vertex if the edge is coarser. The round-1 verifier's case: a vertex at (20, 20)
   beside the edge (0, 0)–(1 000, 0) is 28.3 cm from (0, 0), so not vertex-attracted, and 20 cm from the edge; its foot
   (20, 0) lies 20 cm from (0, 0), so the vertex moves onto (0, 0) instead of splitting off a 20 cm edge. An incoming
   vertex therefore moves at most √2 · `attractCm` ≈ 36.8 cm. Chain vertices that attraction brings within `minEdge` of
   each other merge, the later into the earlier, as in step 1.
3. *Segment and stretch attraction.* A chain segment that passes within `attractCm` of an existing vertex is routed
   through it. Where a segment runs within `attractCm` of an existing edge over a stretch — a near-parallel approach, or a
   crossing shallower than `minFaceAngle` — the stretch is shared: the chain joins the edge where the stretch begins,
   follows it and leaves where it ends, and the shared edges gain the chain's roles (`W_STRETCH_SHARED`). A join or
   leave point whose exact position lies within `attractCm` of an endpoint of the edge it joins moves onto that endpoint,
   as in step 2; any other join or leave point is placed by the placement rule; a stretch whose join and leave points
   would lie closer than `minEdge` collapses to one contact point, handled by step 2.
4. *Crossings.* The remaining crossings are computed exactly, placed by the placement rule and resolved by iterated snap
   rounding (≤ 3 passes; each pass leaves a planar arrangement, so an unconverged result still commits, reported
   `W_SNAP_PASSES`; the sub-centimetre re-routes of Steiner vertices are snap-rounding re-routes and carry the same
   guarantee). Two consecutive crossings closer than `minEdge` lie on the two arms of an acute corner — the clearance
   invariant forbids any other way for two edges to come that close — and are resolved at that corner instead of
   cutting a sliver off its tip (`W_WEDGE_ROUTED`): when the corner is the existing arrangement's (two crossings along
   one new segment) the chain is routed through the corner's vertex; when it is the chain's own (two crossings along one
   existing edge) the chain's corner vertex moves onto that edge at the placement point of its foot. Either way the chain
   moves at most `minEdge / (2 tan(θ/2))` for a corner of angle θ: 0.47 m at the 30° junction floor, 1.2 m at the 12°
   plot floor. An optional chain that would move more than `attractCm` this way is rejected instead (`E_BELOW_MIN_EDGE`).
5. *Re-walk.* Only faces incident to touched edges are re-walked; face records, owners, parents and stage ranks are
   updated — a kept face is re-parented into the new face that contains it (§3.3); the commit record lists them.

**The placement rule (GEO-3, GEO-35; Judgment J-K17).** Every new vertex on an existing edge — a split foot, a stretch's
join or leave point, a crossing — is placed at the lattice point nearest its exact position among the points that
(i) lie within 0.71 cm of the existing edge's route, so that edge moves no more than its hot pixel; (ii) lie at least
`minEdge` from the endpoints of the edge being split and, for a crossing, from the endpoints of the crossing segment; and
(iii) keep every vertex and edge around the split at least `minEdge` from the new vertex and from every edge incident to
it (the clearance invariant, checked in the index); ties y then x. The search runs outward from the exact position,
never beyond `attractCm`, and charges each candidate to the work count. The nearest lattice point qualifies almost
always. It fails only where a vertex already stands between `minEdge` and `minEdge` + 0.71 cm from the edge — a gap a
previous rounding or a warp can leave — and a point rounded towards it would bring it inside `minEdge`; then a
qualifying point lies a few centimetres along the edge, because that vertex is at least `minEdge` from the edge's line
and a point ≈ 5 cm along the edge's hot-pixel band is at least `minEdge` from it. Measured
(`docs/validation/bench/fixall_kernel_r2_attract.out` C): 200 000 crossings placed next to a vertex 25–26 cm from the
crossed edge — plain nearest-point rounding leaves 1 361 edges shorter than `minEdge`; the placement rule leaves none,
moves a crossing at most 0.84 cm and keeps it within 0.71 cm of the crossed edge. If no candidate qualifies, the
incoming vertex moves onto the nearer endpoint of the edge (a crossing routes its segment through that endpoint), the
new segments re-enter step 3, and the step reports `W_PLACED`; each such re-route lands on an existing vertex, so the
loop ends within the work limit. Snap rounding is the same rule for points that lie on no existing edge (nearest
lattice point).

**Existing geometry wins, and no edge shorter than `minEdge` can be created.** An incoming chain vertex moves at most
√2 · `attractCm` (or by the corner bound of step 4 at an acute tip); no existing vertex moves; an existing edge moves
only by its hot pixel (≤ 0.71 cm) where a vertex is placed on it. Every edge a batch creates is one of four kinds, and
each is at least `minEdge` long: (a) a chain segment between consecutive chain vertices — decimation and the merge rule
keep them at least `minEdge` apart; (b) a sub-edge of a split existing edge — the placement rule's (ii); (c) a chain
segment ending at a split point or a crossing — (ii) again for a crossing segment's own endpoints, and the merge rule
when the chain's previous vertex is an existing vertex beside the split; (d) the span between two crossings — resolved
at the acute corner by step 4. Clearance holds by steps 2–3 for every new vertex and segment and by (iii) for every
placed vertex. Measured (`fixall_kernel_r2_attract.out` A–B): over 400 000 vertices dropped in the attraction band of
random lattice edges, 0 sub-edges shorter than `minEdge` (shortest 25.50 cm; 5 729 moved onto an endpoint; largest
displacement 36.72 cm), where the rule as first written left one in 1.34 % of edge attractions
(`fixall_verify_kernel_attract_gap.out`); and the round-1 measurement of cut endpoints on Chaikin×2 spines with 7.9 m
median segments, re-run from the committed script (`fixall_kernel_r1_attract_check.py` reproduces the round-1 output;
`fixall_kernel_r2_attract.py` B applies the revised rule): 6.38 % attracted, displaced p50 12.9 cm and at most 26 cm,
shortest resulting edge 25.6 cm — unchanged, because those endpoints lie on the spine. The replaced rule welded only
within 5 cm and rejected the rest, so ≈ 5 % of endpoints and ≈ 10 % of two-ended cuts fell to the ladder (GEO-3).
Constructive fixtures (§13.1): the (20, 20) vertex against the edge (0, 0)–(1 000, 0); a chain crossing an edge next to
a vertex standing 25.0–25.7 cm from it; a stretch whose join point falls within `attractCm` of an edge endpoint.

**Chain classes.** `mandatory` chains — coast, shore, bank, river, wall trace, arterial, band and kerb edges, plot
lines, user-drawn geometry — cannot fail for a precision reason: after attraction and placement the only errors left
are `E_OUT_OF_RANGE` (a caller bug), `E_LEVEL`, `E_KEPT` (a wrong stage domain in generation, an edit conflict in the
dry run) and `E_LOCKED` (an edit conflict, returned to the dry run), and a corner below `minFaceAngle` commits with
`W_ACUTE_CORNER`. `optional` chains — growth proposals, optional lanes, decorative lines — are also rejected with
`E_BELOW_MIN_ANGLE`, `E_BELOW_MIN_EDGE` (the chain collapses below one edge) or `E_SELF_INTERSECT` where their role
requires a simple ring: a proposal that cannot be inserted is not a street. The F-NUM ladder of §5.2 applies to
optional chains; mandatory chains never reach it.

**The clearance invariant.** After every commit, every vertex lies at least `minEdge` from every edge outside its
one-ring (the edges incident to it or to its neighbours); acute corners inside the one-ring are governed by
`minFaceAngle` and the class floors. Attraction and the placement rule maintain it for insertions and `warp` checks it
for moves; it is a hard, batch-local invariant (§3.10). One consequence stages rely on: a setback smaller than `minEdge`
collapses to zero (a building front drawn 10 cm behind the kerb lands on the kerb), so a stage that wants a visible
setback draws at least `minEdge` (§4.7).

**Roles on shared stretches, and slivers (GEO-4).** When a chain shares an edge — by stretch attraction or an exact
collinear overlap — the edge's role set gains the chain's `(role, entity, level)` row: never a duplicate edge, never an
overwrite. A wall pulled onto a river bank is one edge carrying `bank` and `wall`; a quay on a shore carries `shore` and
`way`. A face below its class floor (width or area — never `minEdge`) is resolved by `absorbSliver`: it merges into the
neighbour across its longest shared boundary whose edges carry only partition roles; if every candidate boundary carries
a structural role, no edge is deleted and the sliver stays as a face of kind `residue` owned by the neighbour across its
longest boundary (`W_SLIVER_RETYPED`). A street, wall, shore or border can therefore never lose a stretch to sliver
repair; `mergeFaces` across a structural edge returns `E_STRUCTURAL`.

**`splitFace` contact semantics (GEO-6).** A cut is a polyline whose interior lies in the face's open interior and which
touches the face boundary exactly at its two endpoints, decided by exact `orient2d` on lattice points — never by a
parameter-space epsilon.
1. Each endpoint is a boundary vertex or a point on a boundary edge inserted by `splitThrough`; with attraction, an
   endpoint within `attractCm` of a boundary vertex lands on that vertex, and so does an endpoint whose foot on a
   boundary edge lies within `attractCm` of that edge's endpoint (step 2).
2. Any other contact is `E_NOT_TWO_CROSSINGS`: the cut passing through or within `attractCm` of a boundary vertex,
   grazing a reflex vertex, running within `attractCm` of a boundary edge anywhere but where it arrives at an endpoint,
   overlapping a boundary edge, or crossing the boundary more than twice. `splitFace` never lets attraction bend a cut
   into a pinch; the stage's ladder picks another cut (§4.6).
3. An antenna — a dangling chain inside the face such as a cul-de-sac spine or a dead-end lane — counts as boundary: a
   cut may end on it (a declared T-junction, the natural end against a dead-end street) and may not cross it.
4. A cut from the outer ring to a hole does not split the face; it is `connectHole(face, cut)`, whose post-condition is
   the same face count and one hole fewer (the slit of §4.6); a violation is `E_HOLE_CONTACT`.
5. The two children are returned in canonical order, the face left of the directed cut first, so an anchor lying exactly
   on the cut belongs to the left child (the tie-break of the anchor rule, §6.3).
6. A face's exported area boundary omits its antennae, so a GeoJSON ring never retraces a slit (§11).

**Moves: warp and smoothing (GEO-10, GEO-35, VK-7, GEO-5 (c)).** `warp(field, fromLevel, region)` applies a displacement
field to every vertex of level ≥ `fromLevel` inside the region. Shared boundaries are single vertices, so the streets,
blocks, plots and footprints under a brush move together (the property MFCG's warp had through shared points), and
vertices of level < `fromLevel` stay fixed — a street warp does not move the coast unless `fromLevel = 0`. Three rules
complete it:
* **Held vertices.** A vertex carrying a role of a locked or pinned entity (§7.2) is held: the field is zero there, and
  the dry run lists the held entities. Kernel-pinned vertices — gates, junctions, portals, the vertices smoothing,
  simplification and cutting keep — move with everything else, because a warp is the user's explicit move and every
  entity names its vertices by role (§2.2 rule 5), so a moved gate is still its gate. A bridge's `deck_end` vertices are
  held unless `fromLevel = 0`, because S1 fixed the deck perpendicular to the flow (§2.7); with `fromLevel = 0` the banks
  and the deck move together.
* **Vertices on fixed routes slide (VK-7; Judgment J-K18).** A vertex of level ≥ `fromLevel` that lies on an edge of
  level < `fromLevel` — a street ending on a shore, a bridgehead, a riverside junction: level-1 Steiner vertices on L0
  edges under the default `fromLevel = 1` — moves only along that fixed route: its displacement is projected onto the
  route's direction at the vertex, the projected point is kept at least `attractCm` from the route's vertices of level
  < `fromLevel`, and the result is re-seated at the lattice point nearest it, within 0.71 cm of the route, so the
  Steiner invariant of §3.10 holds after the move. A brush over a quay road therefore drags its junctions along the
  quay instead of halving itself to a no-op against the shore. Fixture (§13.1): a warp with `fromLevel = 1` over a
  street that ends on a shore moves the junction along the shore and commits.
* **Whole-step validation (GEO-10, GEO-35).** Each target is rounded to the lattice and the **whole step** is validated:
  every edge incident to a moved vertex — including edges between two moved vertices and the edges at re-seated or
  sliding Steiner vertices — is at least `minEdge` long and is tested against the index for crossings; every unmoved
  vertex is tested against the triangles swept by the moved edges; no two vertices may land on one lattice point; and
  the clearance invariant holds. On failure the step's strength is halved globally — deterministic, at most 8 halvings,
  after which the step is a reported no-op. The commit record lists every moved vertex (§3.3), and §3.10's `minEdge` row
  checks the new and moved edges it names, so a `pinch` or `swirl` that would shorten an edge to 10 cm, or stack two
  vertices on one lattice point, halves instead of committing.

After a step each Steiner vertex on a moved coarser edge is re-seated at the lattice point nearest its projection onto
the moved route, and faces that now fail a class floor are re-derived locally and logged. Smoothing uses the same
validation. The named brushes of §7.1 are displacement fields supplied by the edit layer, and a `moveVertex` is a field
that displaces one vertex, found by `resolveVertexAt` (§3.4); a whole-map rotation is a view transform, never a vertex
operation, because it would re-snap every vertex in the arena.

*Judgment J-K2.* Chose attraction at `minEdge` + 1 cm — existing geometry wins, an incoming vertex moves at most
√2 · 26 ≈ 36.8 cm (onto an edge's endpoint from beside the edge) — over a 5 cm weld plus `minEdge` rejection, because the
dead band between the two sent about one cut in ten to the failure ladder and left mandatory chains (walls, coasts, plot
lines) with no repair; the moved distance is a fraction of the narrowest way (an alley's 2 m, §4.6) and of the minimum
plot width (2.5 m), and both references snap rather than reject (FTG's "improved intersection snapping", MFCG 2017's
junction merge).

*Judgment J-K17 (GEO-3).* Chose to move a vertex whose foot falls within `attractCm` of an edge's endpoint onto that
endpoint, and to place every new vertex on an existing edge by the constrained placement rule, over plain nearest-point
rounding of feet and crossings, because two roundings can stack — a vertex left 25.3 cm from an edge by one rounding,
then a crossing rounded 0.7 cm towards it — and plain rounding then creates edges the hard invariant rejects (1.34 % of
edge attractions and 0.7 % of such crossings, measured), which would make a mandatory chain fail for a precision
reason; the constrained point moved by under a centimetre in every measured case.

*Judgment J-K18 (VK-7).* Chose to slide a vertex along the fixed coarser route it lies on over holding it (the whole
step then halves to a no-op near every shore junction, an editability regression against MFCG's warp) and over freeing
it (it would leave the shore and break the Steiner invariant), because sliding keeps the shore exact and gives the drag
the user expects at quays, bridgeheads and riverbanks.

=== REPLACE §3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement (the boolean-library and WASM-kernel choices decided) ===

### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement (the boolean-library and WASM-kernel choices decided)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

**Decision (GEO-9, DEF-2; Judgment J-K4).** Booleans, buffers, per-edge insets and bands are built on the kernel's own
arrangement — the machinery of `insertChain` on a scratch overlay — and no second geometry engine ships. A boolean
overlays both operands' rings, labels every face with its winding numbers (a breadth-first walk from the unbounded
face that adds each crossed edge's ring orientation), keeps the faces the operation and fill rule select, and removes
the edges that separate two kept faces. A buffer is the union of per-segment strips and per-vertex join discs: round
joins as chords of at most 2 cm sagitta (about 27 chords per full circle at a 3 m radius), square ends where declared
(gates, bridgeheads); where the half-width varies along a stored chain it is sampled from the chain's knot profile at
each segment's two ends and the segment's strip is the trapezoid between them (§2.2 rule 5). The output is produced by
the same insertion rules as every other chain, so it obeys the same attraction, placement, `minEdge` and clearance
(GEO-35) with no re-snap round trip, and on every host it is the same TypeScript code producing the same integers — no
host can compute a different town.

**The kerb, defined once (GEO-20).** For an L1 face F, `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding
spines, each half-width sampled from its way's width profile, with round joins on the union's convex side and square
ends where declared; the union's concave corners — the block corners at junctions — are sharp by construction.
`corridorUnion` commits exactly this geometry at L2: the kerb rings as `kerb` edges; the spine inside the band, already
an L1 edge, splits it into the two half-corridor strips; a `corridor_split` edge from each junction vertex to the kerb
corner separates the junction wedge; the faces outside the band are the built blocks. Finer faces an earlier stage made
inside F — S7's wall-band parts — are kept (§3.3): each must lie wholly inside one resulting L2 face, and a kerb or
`corridor_split` edge that would cross one or come within `attractCm` of it returns `E_KEPT`, which the stages prevent
by keeping every corridor and every S8 cut clear of each band ⊕ setback and by leaving each gate passage out of the
band (§4.6–§4.8). `kerb` is also a read-only service on the faces of an open transaction's overlay: S8 plans every cut
on `kerb(F)` of the current L1 faces, inserts each accepted lane at L1 in its own district transaction and recurses on
the children's kerbs; S9 then commits `corridorUnion` for those L1 faces — the same function on the same inputs — so
the block S8 cut and the block S9 keeps are one face, tested as Hausdorff 0 (§13.1). Because a way's width is a knot
profile, the T-junction S8 inserts into a crossed spine (§4.6 step 7) adds a vertex that carries no knot and changes
no half-width, so the two sides of that contract read the same widths. `corridorUnion` takes a set of L1 faces and
re-derives only those, which is also how an edit re-derives the corridors around a changed street. The per-edge
half-plane inset of the 2017 idea survives only as `insetRing` for a uniform inset of a face checked convex; per-edge
distances on any face use the buffer difference (`offsetFace`), so a concave, mixed-class face — the usual face of
organic growth — has one correct construction, and a 2° kink between a 6 m and a 3 m half-width no longer lets the wider
offset govern ≈ 86 m of the narrow edge. Wall bands, glacis, tower and gatehouse footprints use `bandUnion` with the
`band` role: the wall chain, already an L1 edge, splits the band, so a band is a `FaceRef` of per-side L3 parts and
never straddles its L1 edge.

**Oracles, not fallbacks — compared where the comparison means something (VK-4; Judgment J-K19).** Clipper2 (compiled to
WebAssembly, run in Node) and `polygon-clipping` are dev dependencies of `@plat/testkit` only; no product bundle ever
loads either. Our engine attracts features closer than `attractCm` onto each other and the oracles do not, so B-FUZZ
splits every boolean and buffer case by what our engine reports for it:
* **unattracted cases** — the operation reports no `W_ATTRACTED`, `W_STRETCH_SHARED`, `W_WEDGE_ROUTED` or `W_PLACED`,
  so nothing moved beyond the hot pixel: our result and each oracle's must have **equal face counts after both are
  snapped** (zero-area faces dropped) and a **symmetric-difference area of at most the perimeter × 1 cm**, the perimeter
  being the summed boundary length of both operands;
* **attracted cases** — the thin, near-collinear and near-touching inputs §13.1's random family and constructive set
  deliberately include: our result must pass every hard invariant of §3.10, and its symmetric difference from each
  oracle must be at most the perimeter × √2 · `attractCm` (≈ 36.8 cm), the farthest any boundary point can move under
  attraction, placement or wedge routing (a wedge-routed tip sweeps at most half a `minEdge` per unit of arm length);
  face counts are not compared, because merging features closer than `attractCm` is the designed difference.
The harness reports both shares per operation and draws until the unattracted set holds at least 10⁵ cases per
operation, so the strict comparison is never vacuous. There is no runtime fallback, so no host produces a different
model hash and no fallback path needs a budget (SCL-22). The generation report names the engine
(`plat-arrangement@<version>`, §5.4); changing the engine is a generator-version bump with a declared golden shift
(§13.3).

**Confirmation at M0 and the pre-decided fallback.** M0 (a) measures: (i) differential correctness on 10⁶ fuzzed and
constructive inputs per operation — 0 crashes, 0 invalid outputs, and the split oracle agreement above; (ii) speed —
S9's corridor bands over the CITY face set ≤ 25 ms p50 and one district ≤ 3 ms on reference hardware, and **S11's
geometry share** ≤ 3 µs per plot median and ≤ 25 µs for a compound plot on B-CITY-lite's S11 workload (VK-5). S11's
geometry share is every kernel call S11 makes for one plot: the base outline builder's frontage-band intersection or
OBB / LIR fit (§2.6, §4.7), per-edge setbacks by `offsetFace`, the yard partition's splits and the footprint's insertion
into the block's L4 batch; it is the geometry part of S11's single row in §12.4 (≤ 5 µs per plot median, ≤ 40 µs
compound), whose remainder — ≤ 2 µs median, ≤ 15 µs compound — is S11's rule evaluation (site-plan table, heights,
materials, entrance), so this bar cannot pass while the stage misses its row. If (ii) fails after one optimisation pass,
the shipped engine becomes **Clipper2 compiled to WebAssembly as the only engine on every host**: its outputs still
enter the arena through `insertChain`, so attraction, placement, `minEdge` and clearance still hold; WebAssembly becomes
a stated requirement of the embed contract (§11); a host that cannot instantiate it receives a hard, reported
`E_ENGINE_UNAVAILABLE` — never a different town; and the switch is a declared golden shift. Criterion (i) has no
fallback: a failure there is a kernel bug, fixed before M1, and with the split comparison it tests only what the design
promises.

**No WASM kernel (DEF-13; Judgment J-K8).** The kernel is TypeScript on every host. M0 (a) measures its per-op costs:
insert + snap + attract + re-walk ≤ 8 µs per growth proposal, `splitFace` ≤ 12 µs per bent cut, and the band and S11
costs above. **What a miss triggers (VK-11)**, for each hot loop after one optimisation pass:
* a miss by **more than 2×**: that loop — and only that loop — is compiled from the same integer algorithm into a
  WebAssembly accelerator behind the kernel façade;
* a miss by **up to 2×**: the measured cost is carried into its stage's row of §12.4; if that pushes the row over its
  budget the accelerator is built for the loop as above, and otherwise the measured cost replaces the row's figure as a
  **declared budget amendment** (recorded in §12.4 and in the M0 record, with the critical path re-summed);
* an accelerated loop that still misses, or a re-summed critical path above its rung's p95 (§12.3), re-declares the
  model budget at the measured p95 as a D-18 amendment for the owner's veto — the same path the fusion gate uses (§16).
The accelerator must pass the cross-implementation test of §6.5 (10) byte-identically on the golden suite, and the
TypeScript loop stays in every bundle, so a host without WebAssembly is slower and never different. §16's M0 exit reads
"≤ 8 µs per proposal, or this rule applied".

*Judgment J-K4.* Chose booleans and buffers on the kernel's own arrangement over adopting Clipper2 with a pure-JS
fallback, because one engine then runs identically on every host without a WebAssembly requirement (the embed target
of D-4), every boolean output obeys the same attraction, `minEdge` and clearance rules as every other chain (no re-snap
round trip), and the corridor faces nest exactly in their L1 faces; the kernel already builds the hard part (exact
insertion with snap rounding), and Clipper2 remains the speed reference, the correctness oracle and the pre-decided
fallback.

*Judgment J-K8.* Chose a TypeScript kernel on every host, with a byte-identical WebAssembly accelerator for a measured
hot loop as the pre-decided fallback, over a WebAssembly core, because a single portable implementation satisfies the
embed target and the one-engine rule at once, and an accelerator verified byte-identical cannot change a hash; chose to
settle a small miss by a declared budget amendment unless it breaks its stage row, over accelerating every loop that
misses at all, because an accelerator is a second implementation to keep byte-identical and is worth it only where the
budget needs it.

*Judgment J-K19 (VK-4).* Chose to compare against the oracles strictly on the cases where our engine reports that
nothing was attracted, and to bound the attracted cases by the attraction radius, over normalising the oracles' output
through our own `insertChain`, because the normalised oracle would inherit our rules and stop being independent, while
the split keeps an exact, independent check wherever exactness is promised and a proven bound wherever the design
deliberately differs.

*Judgment J-K20 (VK-5).* Chose to set the kernel's M0 bar at S11's geometry share (≤ 3 µs per plot median) inside one
S11 row, over the former 10 µs `offsetFace` bar, because a kernel bar looser than the stage it serves could pass while
S11 missed its budget by 2×.

=== REPLACE §3.8 The straight skeleton — numeric contract, validator, downgrades (the port-versus-build choice decided) ===

### 3.8 The straight skeleton — numeric contract, validator, downgrades (the port-versus-build choice decided)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

**Decision (DEF-3; Judgment J-K5).** The skeleton is built in-house; no port is assumed, because no permissive, mature
JavaScript or TypeScript skeleton is known to this design and CGAL is GPL/LGPL. The skeleton never writes an arena: roof
ridges and hips are derived per building and cached by (entity, content revision, roof construction) — never by id
alone (§8.1 (5), LC-23, N-19), so a `setAttr` on floors or a re-fitted footprint changes the revision and so the roof —
and label spines are derived per face (§9). A skeleton failure can therefore degrade a roof or a label, never the plat.
A stage that wants skeleton-derived topology (for example per-frontage regions of a block, §4.7) inserts the validated
arcs through `insertChain` like any other chain, and its downgrade is the stage's own exact construction.

**Numeric contract (GEO-8).** Exact rational event times are impossible — edges move at unit speed, so event times
involve the lengths √(dx² + dy²) of lattice edges. Event times are therefore computed in doubles with + − × ÷ √ only
(identical on every IEEE engine; no transcendental), on coordinates relative to the polygon's bounding-box corner.
Events closer than 1 mm in offset time and 1 cm in position are coalesced into one multi-edge event; ties are broken by
the input vertex's index in the ring, canonicalised to start at its lowest-leftmost vertex. The event queue runs under a
work limit of 4 · (n + r) + 64 events for n vertices and r reflex vertices — a correct run needs at most about n + r —
and exceeding it is `E_WORK_LIMIT`, a count and never a timeout.

**Convex near-rectangles take the exact path (VK-10; Judgment J-K21).** A footprint that is **convex** (every turn
non-negative by exact `orient2d` on its lattice vertices), whose four OBB corners are each matched by a footprint vertex
within 30 cm and whose area is at least 0.97 of its OBB's gets its ridge or apex from the OBB in the OBB's own frame —
exact and independent of sub-centimetre snapping, so a 1 cm edit can no longer flip a micro-ridge (after snapping, only
33 % of rotated squares keep a single apex, GEO-8): a hip roof's ridge ends half the OBB's minor extent in from each
short side, with its hips running from the four matched vertices to the ridge ends; a gable roof's ridge ends where the
ridge line meets the footprint's own boundary; a pyramid's apex is the OBB's centre. Every roof line then lies inside
the footprint: its endpoints do (the matched vertices and the gable ends are on the footprint; a hip ridge end or an
apex lies at least half the OBB's minor extent inside the OBB, far more than the ≤ 30 cm by which a convex footprint
matching all four corners can fall short of the OBB), and a segment between two points of a convex polygon lies inside
it — so VIS-11's crossing hip lines cannot occur. Convexity is what makes the claim true: the round-1 verifier's
counter-example — a 20 × 10 m rectangle with a 3 × 2 m notch at x = 1–4 m on a long side, area 0.970 of its OBB, all four
corners present — has a reflex vertex, so it now takes the skeleton; under the old test its hip from (0, 0) to the ridge
end (5, 5) passed through (1.5, 1.5), inside the notch and outside the footprint (executed:
`docs/validation/bench/fixall_kernel_r2_attract.out` D). The base's outline builder emits rectangles and L / T
compositions of rectangular wings (§2.6), and a rectangle is convex, so most roofs still take this path wing by wing;
the skeleton serves irregular or notched outlines (clipped row fronts, institution shapes), label spines and stage-3
irregular wings.

**Post-condition validator.** Every skeleton result is checked before any use: (1) planarity — no two arcs cross (exact
`orient2d` on nodes rounded to the millimetre in bounding-box-relative integers); (2) exactly one skeleton face per
input edge, monotone along that edge's direction; (3) heights consistent — each node's offset time equals its distance
to the supporting lines of its faces within 1 cm, and times increase along every arc away from the boundary; (4) the
graph is connected and has exactly h independent cycles for h holes (it is a tree only when there are no holes). A
failure, or `E_WORK_LIMIT`, takes the typed downgrade: a **plain roof** (the footprint drawn and exported without ridge
or hip lines, its heights unchanged — MFCG's own behaviour when its gable pass fails) and a **sampled medial axis** for
spines (a Voronoi of boundary samples at 1 m via `d3-delaunay`, pruned by clearance), reported `W_DOWNGRADE` — never a
crash, never a roof line outside its footprint and never unvalidated output.

**Confirmation at M0 and the pre-decided fallback.** M0 (a) runs the fixtures — squares and rectangles at every
centidegree from 0° to 90°, regular n-gons for n = 3…64, equal-width strips, rotated L, T and U shapes, near-rectangles
with a notch on a long side (they must take the skeleton path and pass the validator), 1 000 holed polygons, snapped
rotated squares — and the B-CITY-lite corpus of irregular footprints and of district and water faces. Pass: 0 crashes;
0 validator failures on the fixtures; downgrades ≤ 0.5 % and work-limit hits ≤ 0.1 % on the corpus; ≤ 20 µs median per
footprint. If the corpus bar fails after one repair pass, the downgrades become the default paths — convex
near-rectangular wings keep their exact OBB roofs, every other roof is plain and every spine a pruned medial axis — and
the skeleton leaves the product (kept in the testkit for comparison); nothing else changes, because nothing else reads
skeleton output.

*Judgment J-K5.* Chose an in-house skeleton under a stated numeric contract, exact OBB roofs for convex near-rectangles
and a validator on every output, over porting a library (none permissive and mature is assumed) and over dropping the
skeleton, because irregular footprints and holed water and wood faces need it, the validator bounds the damage of a
numerical glitch to one downgraded roof or label, and the downgrades are ready as the pre-decided fallback.

*Judgment J-K21 (VK-10).* Chose a convexity gate on the exact OBB path over checking each ridge and hip line inside the
footprint after construction, because convexity makes "every roof line lies inside" true by a two-line argument at the
cost of one exact turn test per vertex, while a post-check would still have to decide what a notched footprint's roof
should be — which is the skeleton's job.

=== REPLACE §3.9 Geometry in the document — each arena stored once ===

### 3.9 Geometry in the document — each arena stored once

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

The snapshot's geometry (§2.9) is **one block per `PlatKey`, never one per level** (SCL-11, kernel part):

* **vertices** — live vertices in slot order (slots are compacted on save; nothing outside the kernel stores a slot and
  no output depends on slot numbers, §3.3, so renumbering is free), coordinates as delta + zig-zag varint `Int32` pairs,
  with their current birth levels (after any promotion, §2.2 rule 3) and flags;
* **edges** — one (origin, destination, birth level) triple per edge pair; `next`, `prev` and twins are not stored;
* **roles** — (edge or vertex, role, entity, level, ordinal) rows, entities as document ids — the knot, attach, anchor,
  weld, deck-end and gate-opening rows included, so every entity-held vertex and every chain profile survives the round
  trip without a stored position (§2.2 rule 5);
* **faces** — per level, one (boundary half-edge, owner, kind, stage rank) row per face; parents are not stored. The
  stage rank is persisted because the kept-content rule (§3.3) must decide the same way after a reload as in the
  session that made the face.

On load the kernel rebuilds `next` / `prev` by sorting each vertex's outgoing edges by exact angle (quadrant, then
`orient2d`), re-walks faces level by level, recovers each face's parent from its boundary edges and rebuilds the role
reverse index and the static index partitions: O(E log d), deterministic, so the loaded arena re-hashes to the recorded
per-level digests (§6.2). A boundary seen by several levels — a kerb, a plot line, a shore — is written once; the
five-DCEL design wrote each inherited edge again at every finer level. Entities carry no slots and no vertex positions,
so the entity table needs no remapping on load. The kernel's round-trip test: save → load → save is byte-identical and
the loaded arena passes every hard invariant (§3.10). The compact twin (CBOR, §11) carries the same block with
typed-array tags. The two added columns — a 2-byte ordinal per role row, a 1-byte stage rank per face — are ≈ 0.45 MB
raw at CITY, almost all of it zero ordinals and a handful of repeated ranks that the document's compression removes;
the document-size test (§2.9: ≤ 320 B per building at CITY) measures the result at M1 like every other column.

=== REPLACE §3.10 Kernel invariants — what is checked, when, and at what cost ===

### 3.10 Kernel invariants — what is checked, when, and at what cost

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r2); earlier revisions fixall/draft-kernel-r1, fixall/integrate-r1

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex ≥ `minEdge` from every edge outside its one-ring | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point: no two vertices share a lattice point | hard | batch-local | by construction for insertions (coincidence is attraction); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| every Steiner vertex lies within 0.71 cm of its coarser edge's level-n route | hard | batch-local | touched, re-seated and sliding Steiner vertices |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` was cleared, crossed, split or re-owned | hard | batch-local | the stage ranks of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role (attach, anchor, weld, deck end, gate opening) finds exactly one vertex or edge set per ordinal, every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| pool scope: no district overlay wrote outside its district's face set; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| face corners ≥ `minFaceAngle` | soft for mandatory chains (`W_ACUTE_CORNER`), hard for optional chains | batch-local | touched corners |
| Euler characteristic per level (V − E + F = 1 + components) | hard | CI (B-FUZZ, B-EDIT) | whole arena |

These rows are the kernel's part of the §5.3 suite. Batch-local checks read only the commit record's faces, its moved
and promoted vertices and their one-ring, so a batch costs O(touched), never O(model) (SCL-1); whole-arena checks run at
stage end, at save or in CI; the pool check runs once per merge in O(overlay size). Class floors (minimum width, area
and angle per face class) are the stages' invariants and are always stated in width and area, never in `minEdge`
(GEO-35).

## Part 3 — Cross-area requests

Each request names the owning area, the section, the item it serves and the change. Text in quotation marks is ready to
paste; the owner may reword it without changing the mechanism.

### To PIPELINE (§2.4–§2.7, §4, II.1)

| # | section | serves | request |
|---|---|---|---|
| P1 | §2.4 `Way` | VK-2 | `widthCm: Cm[] /* per spine vertex */` → `width: Cm \| ChainProfile /* 'width_knot' on the spine; a constant-width way stores a scalar (§2.2 rule 5) */`. In the paragraph below: "a way's class, width and surface are attributes of the `Way`" → "a way's class, width profile and surface …"; "reaches geometry only through `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` or a persisted `LatticePoint` (§2.2 rule 5) — never through an arena slot" → "reaches geometry only through `FaceRef`, `ChainRef`, `EdgeSetRef` or `VertexRef` (§2.2 rule 5) — never through an arena slot and never through a stored vertex position; only log events carry positions, each with a role signature". |
| P2 | §2.5 `Reservation` | GEO-5 (a) | `attach: LatticePoint[] /* … persisted positions, §2.2 rule 5 */` → `attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte); role-carried, so splits and warps carry them (§2.2 rule 5) */`. |
| P3 | §2.5 `PlotBound`; §4.7 S11 treatments paragraph | GEO-5 (a) | `gates: { at: LatticePoint; widthCm: Cm }[]` → `gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[]`; the edge-set comment "a gate opening is a sub-edge without the role (splitThrough at the gate ends)" → "a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (`splitThrough` at the gate ends)"; the same wording in §4.7's sentence "(… a gate opening is a sub-edge without the role, split by `splitThrough` at the gate ends)". |
| P4 | §2.7 `Enceinte` | GEO-5 (a), VK-2 | `anchors?: { end: 0\|1; on: …; at: LatticePoint /* the anchoring vertex */ }[]` → `anchors?: { end: 0\|1; on: 'shore'\|'bank'\|'cliff'\|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[]`; `baseCm: Int32Array /* per trace vertex */` → `base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */`. |
| P5 | §2.7 `Castle`, `Bridge`, `Tunnel` | GEO-5 (a), VK-2 | `cityWeld?: [LatticePoint, LatticePoint]` → `cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 \| 1): ends of the shared wall stretch */`; `deck: [LatticePoint, LatticePoint] /* pinned … */` → `deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 \| 1): the bank-to-bank deck, perpendicular to local flow; held under a warp unless fromLevel = 0 (§3.6) */`; `invertCm: Int32Array /* per vertex, below ground */` → `invert: ChainProfile /* 'invert_knot' on the centreline, below ground */`. |
| P6 | §2.6 heights paragraph | VK-2 | "Walls store a base per trace vertex" → "Walls store their base as a knot profile along the trace (§2.2 rule 5)". |
| P7 | §2.6 stage-3 cost contract (first bullet) | VK-5 | "Budget: ≤ 10 µs per building median (the S11 budget, §12), so the METROPOLIS city view composes no manor to show its footprints." → "The base `OutlineBuildingGenerator`'s `outline()` is part of S11's geometry share (≤ 3 µs per plot median, §3.7, §12.4). A stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median by the intake measurement below, and registering it re-declares S11's row of §12.4 by the measured difference — a declared budget amendment under §3.7's rule — so the METROPOLIS city view still composes no manor to show its footprints." |
| P8 | II.1 `SeamAmendment`, `SeamReport`, rule (3) | GEO-5 (a), VK-18 | `at: LatticePoint /* the vertex inserted by splitThrough at level 1 */` → `vertex: VertexRef /* ('junction', the new junction's id), inserted by splitThrough at level 1 */`; `fieldJumps: { at: LatticePoint; … }` → `fieldJumps: { at: PointCm; … }` (a sample position, not a vertex). Rule (3), after "never its plots": "— where the new wedge's edge ends within `attractCm` of one of the neighbour's plot-line ends on its kerb, that finer vertex is promoted (§2.2 rule 3), so the plots stay byte-identical". |
| P9 | §4.1 transactions bullet and stage registrations | VK-1, VK-6 | Transactions: add "S7 one L1 batch per enceinte (intervallum, quays, piers) followed by one L3 batch (bands, glacis, towers, gatehouses); S9 one per district". Registrations: the declared fields gain "**op form** (declared or callback, §3.3)"; this area's reading of §4 gives callback — S5c, S8, S10 — and declared — S3, S4, S5a, S5b, S7, S9, S11 and an edit's inserted feature. The rule for any stage not listed or in doubt (S7b's claims, S12a, S12b): it registers as **callback**, which is always safe — its determinism test assumes nothing about independence — while the declared form adds the op-permutation guarantee only where the ops are provably independent. |
| P10 | §4.1 derivation-pool paragraph | VK-3 | "districts run in parallel as per-worker overlays of disjoint district face sets on the one arena (§3.3) …" → "districts run in parallel, each on its own copy-on-write overlay over a read-only copy of the arena frozen after S10a, and merge in district lineage order with a slot remap and their index partitions — §3.3's five steps; any write outside a district's face set is `E_SCOPE`; pool size 0 runs the same path in the generation worker". |
| P11 | §4.6 first paragraph | VK-1 | "Runs per district (one batch each) on every coarse face, minus its reservations (which are holes)" → "… on every coarse face, minus its reservations (holes) and minus each wall band ⊕ its setback — S7's kept content (§3.3), so no cut approaches a band". |
| P12 | §4.7 S9 | VK-1 | After the first sentence: "Each wall band's parts inside these L1 faces are kept S7 content (§3.3): S9's domain is each L1 face minus band ⊕ setback, so every kerb and `corridor_split` edge stays clear of the band; the only spines close to a band — the intervallum lane and the ways through gates — are placed by S7 so that their corridors clear it (§4.8)." |
| P13 | §4.8 band paragraph | VK-1 | Add: "S7 issues its L1 batch (the intervallum lane, quays, piers) before its L3 batch (§3.3). Each band leaves every gate passage open: the band and gatehouse parts stop `attractCm` short of the gate way's corridor, computed with `kerb()` on that way's L1 faces (§3.7), so S9's corridor through the gate never meets kept band geometry; the intervallum's spine lies at least its half-width + `attractCm` from the band's inner edge." |
| P14 | §4.9 S12a and S12b | VK-1, VK-3 | S12a: "S12a first commits `corridorUnion` for its hinterland L1 faces (an L2 batch), then cuts its outside plots within those faces' built blocks (an L3 batch), so the plots front on kerbs; S9 skips faces whose corridors S12a committed" — otherwise S9's later corridor union of a hinterland face would meet S12a's kept plots and return `E_KEPT`. S12b: "roles S12b adds on a district-boundary way (an avenue's street trees, `green_line`) are written by S12b's eager step after the pool merge, never inside a district overlay (§3.3's scope check)". |
| P15 | §4.2 S1 (3) | VK-9 | "(a bucket-queue priority flood on the integer heights of a 10 m raster at TOWN, 16 m at CITY, 20 m at METROPOLIS, §12.4)" → "(a bucket-queue priority flood on the integer heights of the hydrology grid `Terrain.hydro` over frame and margin — 16 m at TOWN, 25 m at CITY, 32 m at METROPOLIS, §2.3, §12.4)"; after "the terrain carved to the course": "; after the carve D8 is recomputed on the carved corridor and accumulation once (§2.3)". Because flow is now defined over the margin, set the inlet on the arena's upstream edge (frame + margin) instead of the frame's, so the drawn margin shows the river arriving; the course is traced through the margin by the same descent. |
| P16 | §4.6 step 9, §4.3–§4.4 way widths | VK-2 | Step 9's lane width is one value per lane (a scalar). Wherever S4 or S5 varies a way's width along it (a widening at a market or a gate), the stage places `width_knot` vertices at the class-change junctions (`insertChain` `opts.knots`, §3.4) — one sentence in §4.3's width rule. |

### To DETERMINISM (§5, §6, §7)

| # | section | serves | request |
|---|---|---|---|
| D1 | §7.1 `EditEvent` and the sentence after it | GEO-5 (b) | `{ t: 'moveVertex'; key: PlatKey; at: LatticePoint /* … */; to: LatticePoint }` → `{ t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }`. "geometry is addressed by entity address, by lattice point inside an arena, or by a ring" → "geometry is addressed by entity address, by lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone, §2.2 rule 5), or by a ring". |
| D2 | §7.1 warp paragraph | VK-7, GEO-5 (c), GEO-35 | "whole-step validation against swept triangles and the clearance invariant, deterministic halving (at most 8), Steiner re-seating" → "whole-step validation (swept triangles, every moved edge ≥ `minEdge`, one vertex per lattice point, the clearance invariant), deterministic halving (at most 8), Steiner re-seating, sliding of vertices that lie on fixed coarser routes, and held vertices of locked or pinned entities, which the dry run lists (§3.6)". |
| D3 | §7.1 dry-run paragraph | VK-1 | Add: "An `E_KEPT` conflict (the edit would cross or clear finer content an earlier stage made, §3.3) is offered with one resolution: start the re-derivation at the stage that made that content (for a wall band, S7's band step for the touched run)." |
| D4 | §7.3 item 2 and the S8–S11 table row | VK-1 | Item 2, after "the refinement stages re-run for those faces": "— the batch's `rederivesFrom` is the first stage the scope re-runs (§3.3). For L1 cells that meet a wall band ⊕ setback the re-run starts at S7's band step for that enceinte's run through the cells, so their bands are re-derived; elsewhere S7's bands, S12a's hinterland plots and every other earlier-stage finer face are kept." Table row "S8–S11 \| per cell, block and plot (tree scope, item 2)" → "… (tree scope, item 2; from S7's band step in wall-adjacent cells)". |
| D5 | §7.4 moveVertex / warp row; the undo paragraph | GEO-5 (b), VK-7, VK-18 | Create: "vertex handle, stored as lattice point + role signature". Regenerate: "whole-step validation (§3.6): moved edges ≥ `minEdge` and against swept triangles, one vertex per lattice point, the clearance invariant, global deterministic halving; vertices on fixed coarser routes slide; vertices of locked or pinned entities are held; kernel-pinned vertices move (pins constrain smoothing, simplification and cutting)". Migrate: "the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported". Undo paragraph: "… the faces, entity records, lifecycle events and tombstones its effective scope replaced, and the former birth levels of the vertices it promoted (§2.2 rule 3)". |
| D6 | §6.5 (6) and (9) | VK-3, VK-6 | (6) "Workers return results merged in lineage order" → "Pool workers derive each district on an overlay over one frozen base and return it for a lineage-order merge (§3.3); no result depends on arrival order". (9) add: "**op-order determinism** — every declared batch's result identical under permutation of its ops, every callback-form stage's result identical across two runs, a slot renumbering and pool sizes 0–3 (§3.3)". |
| D7 | §6.2 per-level digests | VK-18, VK-1 | Add: "Per-level digests read each vertex's current birth level, so a promotion (§2.2 rule 3) moves a vertex into the coarser level's digest from that commit on; kept finer content (§3.3) keeps its digest leaves through a coarser re-derivation." |

### To RENDERING (§8, §11, §12)

| # | section | serves | request |
|---|---|---|---|
| R1 | §12.4 S1 row and the M0 spike's fallback | VK-9 | Mechanism: "hydrology (bucket-queue priority flood on integer heights, D8, accumulation) on a 16 m frame raster" → "… on the 25 m hydrology grid over frame and margin (§2.3)"; work: "≈ 98 000 hydrology cells" → "≈ 102 000 hydrology cells (measured 15.9–17.2 ms for flood, flats, D8 and accumulation, `fixall_kernel_r2_hydro.out`)"; the spike's fallback "hydrology 16 → 24 m" → "hydrology 25 → 32 m (METROPOLIS 32 → 40 m, TOWN 16 → 20 m)". |
| R2 | §12.4 S10 + S10b + S11 row | VK-5 | "S11 ≤ 5 µs median, compound ≤ 40 µs, mean ≤ 6 µs per plot" → "S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15); mean ≤ 6 µs". |
| R3 | §12.4 merge row and critical path | VK-3 | Mechanism: "per-worker overlays of disjoint district face sets committed in district lineage order (§4.1, §6.3)" → "the arena frozen after S10a and copied once to each pool worker (≈ 10 MB at CITY, ≈ 1 ms per copy), then the district overlays merged in lineage order with a slot remap and their index partitions and digest leaves carried (§3.3)"; p50 "8 ms" → "8 ms merge + 3 ms copies", and the critical path grows by the same 3 ms over whatever figure the row carries after round 2 (≈ 245 → ≈ 248 ms p50 on the round-1 table; p95 ≤ 300 ms unchanged). |
| R4 | §12.7 stage-3 hook bullet | VK-5 | "`outline()` ≤ 10 µs per building median, inside S11's row of §12.4" → "the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration re-declares S11's row by the measured difference (§2.6, §3.7)". |
| R5 | §12.8 assumptions and fallback | VK-3 | "These assume one kernel arena per layer (≈ 10 MB at CITY, §2.2; PLAUSIBLE until M0)" → "These assume one kernel arena per layer (≈ 10 MB at CITY, §2.2; PLAUSIBLE until M0) plus one frozen arena copy per pool worker (≈ 10 MB each at CITY, ≈ 25 MB at METROPOLIS) and each district overlay until it merges (§3.3)"; add to the pre-decided fallback: "if the line is still exceeded, the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test re-runs". |
| R6 | §11.2 embedding contract | VK-3 | Add: "The derivation pool uses transferred copies, never `SharedArrayBuffer` (§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns (§8.9) remain the only use of shared memory." |

### To SCOPE (§13, §14, §16, the judgment-calls table)

| # | section | serves | request |
|---|---|---|---|
| S1 | §13.1 constructive list | GEO-3, GEO-35, VK-1, VK-2, VK-3, VK-7, VK-8, VK-10, VK-15, VK-18, GEO-5 | Add fixtures: "a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) (it moves onto (0, 0); no sub-`minEdge` edge); a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it; a stretch whose join point lies within `attractCm` of an edge endpoint; a `warp` with `fromLevel = 1` over a street ending on a shore (the junction slides along the shore and the step commits); a `pinch` that would shorten an edge below `minEdge` and a step that would put two vertices on one lattice point (both halve); a 20 × 10 m rectangle with a 3 × 2 m notch on a long side (skeleton path; no roof line outside); star rings of radius 2²³ − 2 (`area2` exact); an L1 lane into a face holding S7 band parts (`E_KEPT`); an L2 corridor re-derivation beside kept plots with a plot-line end within `attractCm` (promotion; plots byte-identical); an S8 T-junction on a spine with a width profile (every sampled half-width unchanged); a pool overlay writing outside its district (`E_SCOPE`); a logged `moveVertex` replayed after an upgrade that puts an unrelated vertex 20 cm from its position (bound to the signature-matching vertex or orphaned, never to the unrelated one); a slot freed and reused inside a stage (the query returns the new item)". |
| S2 | §13.1 properties | VK-4, VK-6, VK-9, GEO-35 | "a batch's result identical under any permutation of its ops" → "a declared batch's result identical under any permutation of its ops, and a callback-form stage's identical across two runs, a slot renumbering and pool sizes 0–3 (§3.3)"; "differential agreement with the CI oracles (Clipper2-WASM in Node, `polygon-clipping`) on booleans and buffers (§3.7)" → "… split by attraction (§3.7): unattracted cases with equal face counts and symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter × √2 · `attractCm`, ≥ 10⁵ unattracted cases per operation"; "no edge shorter than `minEdge` from any writer and clearance ≥ `minEdge`" → "… from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`"; "D8 is defined on 100 % of land cells" → "D8 is defined on 100 % of the hydrology grid's land cells over frame and margin (§2.3)". |
| S3 | §13.2 stage property tests | VK-1 | Add: "0 `E_KEPT` on the one-click path over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug)". |
| S4 | §16 M0 row, exit column (a) | VK-6, VK-11, VK-5 | "insert + snap + re-walk ≤ 8 µs per proposal" → "insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1 (the accelerator, or a declared budget amendment); S11's geometry share ≤ 3 µs per plot median"; "op-permutation determinism" → "op-permutation determinism for declared batches and issue-order determinism for callback-form stages (§3.3)". |
| S5 | §14 `Kernel`, `Stage` | VK-6, VK-1, GEO-5 | `tx<T>(tx: KernelTx, fn: (overlay: Overlay) => KernelResult<T>)` → `tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3`; the `Stage` registration gains `txForm: 'declared' \| 'callback'`; `KernelTx` (defined in §3.3) now carries `stage` and `rederivesFrom`; `resolveVertexAt`, `signature` and `sampleProfile` join the kernel services (§3.4). |
| S6 | Judgment-calls table — replace rows | GEO-3, VK-8 … | J-K2: "Chose vertex, segment and stretch attraction at 26 cm — an incoming vertex moves at most √2 · 26 ≈ 36.8 cm, onto an edge's endpoint when its foot lies within 26 cm of it — over a 5 cm weld beside a 25 cm minimum edge, because the 5–25 cm band was neither welded nor legal (GEO-3) (§3.6)." J-K5: "Chose an in-house straight skeleton under a numeric contract and a four-part validator, with exact OBB roofs for convex near-rectangles, over adopting a port, because no permissive, mature port exists and every output must be checkable (§3.8)." J-K6: "Chose static indexes rebuilt at stage end per partition, with query results sorted by a total canonical key per item kind, over per-batch rebuilds, because per-batch rebuilds of a growing level cost seconds (§3.3)." J-K8: "Chose no WASM kernel — a byte-identical WebAssembly accelerator only for a hot loop that misses by more than 2× or breaks its stage row, a declared budget amendment for a smaller miss — over a WASM kernel behind the façade, because a second implementation must reproduce every output bit and is worth it only where the budget needs it (§3.7)." |
| S7 | Judgment-calls table — add rows | GEO-5, VK-1–VK-10, VK-18 | J-K9 "Chose role-carrying vertices for every entity-held vertex and role signatures for log positions over persisted lattice points re-bound by distance, because a role travels with its vertex through splits, merges and warps and distance alone cannot tell the intended vertex from an unrelated one (GEO-5) (§2.2)." · J-K10 "Chose knot profiles for varying chain attributes over arc-length profiles from the chain's start, because rings have no stable start and a warp or an inserted junction would slide arc-length breakpoints off their features (VK-2) (§2.2)." · J-K11 "Chose to promote a finer vertex a coarser batch lands on over clearing and re-deriving the neighbour's finer content, because promotion keeps the neighbour's plots byte-identical and moves nothing (VK-18) (§2.2)." · J-K12 "Chose one hydrology grid over frame and margin at 16 / 25 / 32 m over a frame-only grid and over the margin at the old cells, because the cell count and measured cost are unchanged and the margin gets defined flow (VK-9) (§2.3)." · J-K13 "Chose a magnitude-triggered flush at 2⁵² from the range invariant for `area2` over flush intervals derived from the frame table, because it is exact for every ring `snap` admits and ordinary faces never pay a BigInt addition (VK-8) (§3.2)." · J-K14 "Chose to keep finer content an earlier stage made, as an obstacle with `E_KEPT`, over letting a coarser batch clear it and re-running the earlier stage, because the wall is built before the fabric it shapes and re-running S7 per district would repeat and ghost the band (VK-1) (§3.3)." · J-K15 "Chose two transaction forms — declared op sets in canonical order, callback sequences in issue order — over one canonical order for every batch, because a recursion plans each op on the faces the previous op made (VK-6) (§3.3)." · J-K16 "Chose read-only transferred arena copies with one copy-on-write overlay per district and a lineage-order merge over a `SharedArrayBuffer` arena written in place, because shared memory needs cross-origin isolation in every embedding page and in-place writes would need locks whose order could leak into the output (VK-3) (§3.3)." · J-K17 "Chose an endpoint rule and one constrained placement rule for every new vertex on an existing edge over plain nearest-point rounding, because two roundings can stack into an edge the hard invariant rejects (GEO-3) (§3.6)." · J-K18 "Chose to slide a vertex along the fixed coarser route it lies on under a warp over holding or freeing it, because holding makes every shore-side warp a no-op and freeing breaks the Steiner invariant (VK-7) (§3.6)." · J-K19 "Chose a strict oracle comparison on unattracted cases and an attraction-radius bound on attracted ones over normalising the oracles through our own insertion, because normalised oracles would stop being independent (VK-4) (§3.7)." · J-K20 "Chose S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar over a looser `offsetFace` bar, because a kernel bar looser than its stage could pass while the stage missed by 2× (VK-5) (§3.7)." · J-K21 "Chose a convexity gate on the exact OBB roof path over a post-check of each roof line, because convexity makes containment true by construction and a notched footprint's roof is the skeleton's job (VK-10) (§3.8)." |

### What this area did with the requests other round-2 drafts made of it

At the time of writing, `r2-determinism.md` asks nothing new of the kernel beyond what its §5.2 F-NUM row and §6.5 text
already cite (the precision codes, the accelerator's cross-implementation test); both remain consistent with the blocks
above (F-NUM's codes are unchanged; the accelerator test is §6.5 (10), now cited correctly). `r2-pipeline.md` and
`r2-rendering.md` were skeletons when this file was written; their requests, if any, reach the integrator directly.

## Part 4 — CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED (executed here, outputs committed under `docs/validation/bench/`):** the revised attraction rule leaves 0
sub-`minEdge` edges on 400 000 band samples (largest displacement 36.72 cm, within √2 · 26); the round-1 on-spine
measurement is reproduced byte for byte and unchanged under the revised rule; plain rounding of crossings next to a
vertex 25–26 cm from the crossed edge leaves 1 361 short edges in 200 000 and the placement rule leaves 0 (movement
≤ 0.84 cm, off-line ≤ 0.71 cm); the VK-10 notch arithmetic (area ratio 0.970, reflex vertex, hip point outside); `area2`
exact on full-range random and star rings under the 2⁵² flush, inexact on the star rings under the old 1 024-term flush;
the hydrology costs of the chosen and rejected grids (same cell count, same cost; the margin at the old cells 2.5 ×).
Also confirmed by reading: every quoted sentence of the verifier's rows against the current `docs/ARCHITECTURE.md`; the
licence of `robust-predicates` 3.0.3 in `redteam-improve.md` §5.1; the stage order behind VK-1 (§4.1 chart, §4.8).

**PLAUSIBLE (reasoning, not executed):** the placement rule's existence argument beyond the measured configuration
(its fallback covers the rest); the pool mechanism's merge cost (≈ 200 000 records in the 8 ms row) and copy cost
(≈ 1 ms per 10 MB copy); the memory added by one arena copy per pool worker against §12.8's lines; the S11 split
(≤ 3 µs geometry + ≤ 2 µs rules) — confirmed only when M0 measures it; the document cost of the ordinal and stage-rank
columns after compression; the claim that no correct pipeline stage hits `E_KEPT` (the stage property test of Part 3 S3
checks it).

**What a Fable reviewer should re-check first:**
1. The kept-content rule (§3.3, VK-1) and its pipeline companions (P11–P14): whether every earlier-stage finer face in
   the stage order — S7's bands and gatehouses, S12a's outside plots, anything S7b claims below L1 — is either excluded
   from later coarser domains or deliberately re-derived; a missed one would surface as `E_KEPT` in generation.
2. The placement rule and the endpoint rule (§3.6, GEO-3): the four-kind proof that no edge shorter than `minEdge` can
   be created, and whether the fallback (route through the edge's nearer endpoint) can itself violate clearance in a
   configuration the measurement did not cover.
3. The pool overlay design (§3.3, VK-3) and the knot profiles (§2.2 rule 5, VK-2): whether copy-on-write base records
   plus the merge-time check make "pool sizes 0–3 give identical digests" hold by construction, and whether any stage
   still reads a varying chain attribute by vertex index.

## Fable review (2026-09-27) — A-fixall/draft-kernel-r2

Reviewer: Fable 5.1, lane fable-review/main/kernel (docs/fable-review/main/kernel.md). **Verdict: CORRECTED.** All
twenty-four mechanisms stand in the current design and J-K9–J-K21 are the right calls; the five committed measurements
re-run byte-identical (`fixall_kernel_r1_attract_check`, `fixall_kernel_r2_attract` A–E) and the hydrology script within
machine noise with identical counts. Two corrections by block (docs/fable-review/main/blocks-kernel.md): (1) GEO-35's
whole-step validation left one hole in "no edge shorter than `minEdge` can be created" — insertion keeps every pair of
vertices at least `minEdge` apart by construction, but a warp may close the pair one vertex apart that the clearance
row's one-ring exempts (the soft angle floor does not stop it), after which the next chain attracted onto one and routed
through the other makes a sub-`minEdge` edge; the review adds a hard vertex-separation test to the whole-step validation
and to §3.10 (J-Fkernel-1; a constructive case is in the review file). (2) §3.2 (2)'s "a vertex split onto an edge lies at
least 25.29 cm from both endpoints" holds only where the nearest lattice point qualifies; the placement rule's (ii) gives
the exact bound (at least `minEdge`), now stated.
