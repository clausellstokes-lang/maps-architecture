# Fix-all round 3 — KERNEL area (§2.2 storage, §3 geometry kernel): dispositions, replacement text, cross-area requests
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-kernel-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-kernel-r3` · 2026-09-25 · seat: fix architect, KERNEL area, round 3 (Fable role; opus stand-in).
Status: COMPLETE — 9 items: 9 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred; 6 replacement blocks (§2.2, §3.1, §3.3,
§3.4, §3.6, §3.10); 15 cross-area requests (pipeline 4, determinism 6, rendering 2, scope 3 — X-S2 carrying the
judgment-call rows); 2 committed measurement scripts (`docs/validation/bench/fixall_kernel_r3_bench.mjs`,
`fixall_kernel_r3_checks.py`, each with its `.out`).

## Part 0 — Reading record, method and measurements

**In plain words.** The kernel is the part of the design that does the shape mathematics. The round-2 check left nine
kernel items open. This round closes all nine in the kernel text. The parallel workers now receive a copy of the town
that already contains the thin strips built just before the copy is made, so a plot line can find the strip it must
stop at. A new canal may touch the existing streets only at points prepared for it in advance, and the kernel now knows
exactly which points those are and refuses any other contact. The order in which the kernel hands back search results
no longer changes when finer detail (building corners) is added. Dragging the map with the warp brush now keeps locked
plots and buildings exactly where they are, never trips over the "keep what an earlier step made" rule, places the
points it re-seats with the same careful rounding new points get, and marks correctly which points may later be tidied
away. Splitting a street between two points where its width changes now keeps every width along it. Two internal
lookup tables are stored so that each worker can use them at once instead of rebuilding them (a saving of 10–20 ms per
worker at CITY, measured). And the list of what a district boundary can be now includes the edge of a reserved area.
Nine items: 9 FIX, 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred.

**Read in full:** `docs/validation/fix-all/r2-verify-kernel.md` (the source of VK2-1 and VK2-3–VK2-9; VP2-9 from
`r2-verify-pipeline.md`); in `docs/ARCHITECTURE.md` (8 383 lines) §2.1–§2.2, §3 entire (lines 1323–2182), §4.1, §4.7's
S10 (0) paragraph, §4.11 (conversions and the carve), §7.1's dry-run paragraph, §7.2, §7.3 items 1–3 with the operator
table and (a)–(b), §7.4's undo application, §6.2's per-level digest paragraph, §12.3, §12.4, §12.8, §13.1, the J-K,
J-I9–J-I11 judgment rows and §14's kernel façade lines; the rest by heading and by grep for every term the fixes touch
(`promot`, `clearRegion`, `prepared`, `split` flag, `ownerHead`, `RoleTable`, `Map<`, `Set<`, `ordinalOffset`,
`ChainProfile`, `retypeEdges`, `step (0)`, `3 copies`, `251`). Also read: the VD2-1, VD2-2 (as VK2-2's text), VD2-9, VP2-1,
VP2-6 and VP2-9 rows of the sibling round-2 verifications (to make the kernel text agree with the fixes their owners are
drafting); `r2-integration-log.md` C-3–C-7; `r2-kernel.md` Parts 0–3 (format); `docs/validation/bench/bench_index.mjs`
and `.out`, `fixall_kernel_r2_attract.py` and `.out` (part C, the model for this round's re-seat measurement).
`docs/validation/fix-all/r2-validate.md` does not exist. `docs/AMENDMENTS-2026-09-25.md`, the owner instructions and
`docs/DEFINITION.md` were not re-read: none of the nine items touches an owner rule, and every block keeps the owner's
standing rulings (standalone; clean-room — no reference code, grammar, palette or table is reproduced; parity as the
floor; one-click simplicity untouched, because every change is below the user-facing surface). Nothing outside
`/Users/cstokes/Desktop/Maps` was read.

**Method.** Every item ends FIX — the replacement text now carries a mechanism that defeats the verifier's failure
scenario, quoted in Part 1 — and none ends INVALID or STAGED-BY-OWNER. Where a choice rests on a number, the number was
measured now (below); the one estimate that could not be measured before M0/M1 (the count of step (0)'s L3 items) is
labelled PLAUSIBLE and sits on a measured build rate, and its cost is carried into §12.4 by a cross-area request.
Each new choice is recorded as "chose X over Y because Z" (J-K22–J-K27 new; J-K6, J-K14, J-K17, J-K18 amended). The
fixes follow structural prevention: VK2-1 is closed by a precondition — *nothing lives outside a static partition at the
freeze*, asserted — together with a rule that a finer batch never writes a coarser level's index, so no later eager
step can reopen the gap; VK2-3 by one explicit list of permitted contacts that the kernel enforces for every coarse
insertion (carve, outer moat, re-carved reach) rather than a rule per operator; VK2-6 by applying the one placement
rule to every lattice rounding of a point on an existing route (insertion, crossing, re-seat, slide); VK2-9 by a sweep
of every `Map`/`Set` in the kernel's types (the two tables named, plus the tombstone sets, which are empty at the
freeze and now asserted so).

**Executed in this lane (our own code; plain Node 24 and stdlib Python; files under `docs/validation/bench/`):**

| script → output | what it shows |
|---|---|
| `fixall_kernel_r3_bench.mjs` → `.out` A | VK2-1: the packed Hilbert R-tree build of `bench_index.mjs`, re-implemented, on band-shaped items: ≈ 9 000 items (our estimate of step (0)'s L3 vertices, edges and faces at CITY) in 26 skewed partitions rebuild in 2.29 ms (median of 15); ≈ 22 500 in 64 partitions (METROPOLIS) in 5.83 ms |
| same, B | VK2-9: rebuilding the role heads as a `Map` in a worker costs 9.93 ms (60 000 keys), 20.11 ms (100 000 keys, role and owner heads) and 61.86 ms (250 000, METROPOLIS); the typed open-addressing table builds once in 2.41 / 3.88 / 11.59 ms, occupies 1.50 / 3.00 / 6.00 MB at load ≤ 0.5 with 12-byte slots, and returns the same answer on every probed key (0 mismatches); one memory copy of the frozen arena costs 1.01 ms at 10 MB and 1.09 ms at 12 MB (3.28 ms for three workers) |
| `fixall_kernel_r3_checks.py` → `.out` A | VK2-6: 200 000 re-seats of a vertex onto a route beside a vertex standing 25.0–25.7 cm from it: plain nearest-point rounding breaks `minEdge` or clearance in 25 869 (12.93 %); the placement rule in 0, with no case lacking a qualifying point, moving at most 4.27 cm from the exact projection and staying within 0.710 cm of the route; the constructive fixture (route (0, 0)–(1 000, 9), vertex (517, 30) at 25.35 cm): plain rounding → (517, 5), 24.999 cm, rejected; placement rule → (517, 4), 25.999 cm, accepted |
| same, B | VK2-8: 20 000 random ways split strictly between two width knots: the old re-key changes a sampled width by up to 846.8 cm; cut knots with the exact sampled value change it by at most 6.82 × 10⁻¹³ cm (91.71 % of samples bit-identical); re-joining drops the cut knot and restores the original profile bit for bit in 20 000 of 20 000 |
| same, C | VK2-4: two L3 faces sharing their lowest-leftmost vertex, ordered F1, F2; after an L4 vertex lands on their shared edge, the full-ring key orders them F2, F1; the level-3-route key keeps F1, F2 |

## Part 1 — Disposition table

"X:" names the cross-area requests in Part 3 that complete an item in sections other areas own.

| id | sev | disposition | sections changed (this file) | mechanism, in one line | X |
|---|---|---|---|---|---|
| VK2-1 | major | FIX | §3.3 (pool step 1, step 4, the index paragraph, J-K25), §3.1 (index row), §2.2 (`LevelIndex` comment), §3.10 (two rows) | S10's eager step (0) ends by rebuilding the L3 static partitions it touched (≈ 9 000 items, ≈ 2.3 ms at CITY by the measured build rate) before the freeze; the frozen copy carries the L0–L3 static partitions; the freeze asserts every dynamic grid and tombstone set empty; and each level's index holds only items born at that level (whole route edges, boxes padded by the hot pixel), so a finer split never touches a coarser index and L3 really is the only level step (0) writes | X-P1, X-P2, X-R1, X-S1 (a) |
| VK2-3 | major | FIX | `KernelTx.prepared`, `CommitRecord.promotedEdges`, §3.3 clear-region bullet (three rules: clearing, preparation, contact) and J-K24, §3.6 candidate (c) and fixtures, §2.2 rules 3 and 7 (`anchor`), §3.1 error codes, §3.10 row | the coarse batch names its permitted contacts by role (`deck_end`, `anchor`); §3.6's candidates gain those vertices (attracted and promoted like finer route vertices, their finer edges kept) and the finer stretch between two of them that the chain runs along (shared and promoted — edge promotion — which is how a carve's L0 batch inserts each kept way's L0 deck edge on the way's own straight L1 edge between its promoted bank vertices); any other contact is `E_LEVEL` inside the clear region and `E_KEPT` outside; the M3a fixture asserts attraction onto exactly the prepared vertices | X-P3, X-P4, X-D1, X-D2, X-D3, X-S1 (b), X-S2 |
| VK2-4 | minor | FIX | §3.3 index paragraph and J-K6, §3.1 index row | a level-n query returns level-n items keyed on the level-n route: an edge by its level-n route edge's endpoints (never a sub-edge's), a face by the first two vertices of level ≤ n on its outer ring from the lowest-leftmost such vertex, a doubly visited vertex taking the smaller successor; measured: the full-ring key reverses two L3 faces once an L4 vertex lands on their shared edge, the route key does not | X-D3, X-S1 (c), X-S2 |
| VK2-5 | minor | FIX | §2.2 rule 3 (`split` flag paragraph) and `flags` comment, §3.6 moves (flag rule) and J-K26 | a move clears the `split` flag of every vertex it displaces except a Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a fixed route (dissolving either still restores that edge exactly); promotion clears it too, because a promoted vertex is one of the coarser chain's own vertices | X-S1 (d), X-S2 |
| VK2-6 | minor | FIX | §3.6 slides and re-seats, J-K17 and J-K18 amended, §3.1 `W_PLACED` comment | re-seats and slides choose their lattice point by the placement rule's (i)–(iii) on the moved geometry, never plain rounding; measured 12.9 % → 0 failures; the verifier's 25.3 cm fixture made constructive (a vertex 25.35 cm from the warped kerb: plain rounding 24.999 cm and halves, the rule 25.999 cm and commits) | X-S1 (e) |
| VK2-7 | minor | FIX | §3.3 kept-content bullet (`E_KEPT` for insertion and clearing only; a move's `rederivesFrom`), `KernelTx.rederivesFrom` comment, §3.6 moves (held set, fixed routes) and J-K27, J-K14 amended, §3.4 `warp` and smoothing, §3.10 rows | (a) a warp or smoothing batch keeps nothing: `rederivesFrom` = the first stage that writes `fromLevel` (S1/S3/S9/S10/S11), and `E_KEPT` governs insertion and clearing only; (b) the held set is every level-n route vertex of a locked or pinned entity's resolved geometry (all `FaceRef` rings, holes included) and of every finer face under it, closed downwards over the endpoints of coarser edges carrying a held Steiner vertex (≤ 4 rounds), and a route whose endpoints are held is fixed, so vertices on it slide | X-D4, X-S1 (f), X-S2 |
| VK2-8 | minor | FIX | §2.2 rule 5 (cut and join sub-bullet) and J-K23, `ChainProfile.values` comment, §3.4 `retypeEdges` (`rekey` returns both profiles; `ordinalOffset` removed) | a cut of a profiled chain gives each part a cut knot at the cut vertex carrying the exact sampled value (step: the held value; a knot vertex copied; a knotless part a scalar); a join drops a knot only where the joined profile samples identically; measured: 8.47 m → 6.8 × 10⁻¹³ cm largest change, re-join bit-exact 20 000 / 20 000 | X-D5, X-S1 (g), X-S2 |
| VK2-9 | minor | FIX | §2.2 types (`RoleHeadTable`, `OwnerTable`), *Size*, J-K22; §3.3 pool steps 1, 2 and 4 (tables in the copy; overlay-local tables and handles remapped at merge) | both tables are typed-array open-addressing hash tables (load ≤ 0.5, fixed hash, backward-shift deletion, lookups only), so the frozen copy is ArrayBuffers only; measured: a per-worker `Map` rebuild would cost ≈ 10–20 ms at CITY (≈ 62 ms at METROPOLIS) against ≈ 1.1 ms for the 12 MB copy | X-R1, X-R2, X-S1 (h), X-S2 |
| VP2-9 | minor | FIX | §2.2 rule 1 | "(a spine, a wall line, a reservation boundary, a shore or the perimeter)"; §2.9's and §3.9's chunk argument needs only "an L1 edge" and is unaffected | — |

**Companion text applied here (items owned by other areas).** VK2-2 (determinism) names this area's §3.3 kept-content
bullet as a companion: the block carries its required wording ("a scope that holds wall-strip faces, or faces bordering
the settlement perimeter or a reservation boundary two districts share, re-runs S10's step (0) for its own side's parts
…"), so the determinism area's §7.3 item 2 should use the same sentence (X-D6). VP2-6 (pipeline) makes the kernel's
margin-band width the number everywhere; §3.3 step 3 now reads "half-width 2 m — 2 m on each side". VP2-1 (pipeline)
widens the carve's clear region to the L1 cells the way rule touches; §3.3's clear-region bullet defines the region as
the one the operator declares (at least the new chains ⊕ (`attractCm` + clearance), and it may be larger), so either
definition fits the kernel without a further edit.

## Part 2 — Replacement blocks

Blocks in document order. Each block's text replaces the named subsection completely (heading, banner and body);
§2.1, §2.3, §2.9, §3.2, §3.5 and §3.7–§3.9 are unchanged. Section pointers inside the blocks use the current
numbering. Every sentence of a replaced subsection that no item touches is carried over verbatim (some paragraphs
are re-wrapped at 120 columns); the changes are the ones Part 1 lists.

=== REPLACE §2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===

### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground or the underground arena; parts 1–3 = one arena per sky island (§4.2, II.1)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey; readonly frame: Frame /* §3.2 (9) */; readonly lattice: LatticeSpec;
  vertices:  { x: Int32Array; y: Int32Array; out: Int32Array /* one outgoing half-edge */; level: Uint8Array /* birth level; lowered only by promotion (rule 3) */;
               flags: Uint8Array /* pinned | steiner | split (created on an existing edge; cleared by promotion and by a move that takes it off that edge's route, rule 3) | free slot */ };
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
  nextOfOwner: Int32Array; ownerHead: OwnerTable /* owner handle → first face of that owner at this level */ }
interface RoleTable { edgeFirst: Int32Array; vertexFirst: Int32Array /* first slot of each set, −1 if none */;
  kind: Uint16Array /* interned RoleName */; entity: Int32Array; level: Uint8Array /* level of the batch that added it */;
  ordinal: Uint16Array /* 0 unless the registry declares the role indexed (the knot, attach, anchor, weld, deck_end and gate_opening roles, rule 7) */;
  nextInSet: Int32Array; nextSameKey: Int32Array; head: RoleHeadTable /* (role, entity, ordinal) → first slot */ }
// The two lookup tables are typed-array hash tables (VK2-9; Judgment J-K22): open addressing with linear probing, capacity a
// power of two kept at load ≤ 0.5 (doubled and re-inserted in slot order when exceeded), a fixed integer hash of the key words,
// deletion by backward shift (no tombstones). Lookups only — nothing iterates a table — so its layout never reaches an output,
// and the arena is typed arrays throughout: a pool worker's frozen copy is ArrayBuffers with nothing to rebuild (§3.3 step 1).
interface RoleHeadTable { k0: Int32Array /* entity handle */; k1: Int32Array /* role << 16 | ordinal */; first: Int32Array /* first role-row slot; −1 = empty */; count: number }
interface OwnerTable    { owner: Int32Array /* interned entity handle */; head: Int32Array /* first FaceId; −1 = empty */; count: number }
interface LevelIndex { static: PackedIndex[] /* partitions: one per arena at L0–L1; one per district + one outside districts at L2–L4 */; dynamic: UniformGrid;
  tombstones: Set<number> /* slots deleted since the partition's build; they filter static-partition hits only; empty, like every grid, at the pool's freeze (§3.3, §3.10) */ }
// The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry (rule 5):
type FaceRef    = { owner: Id; level: Level };                       // view: the faces whose owner at that level is the entity (district, block, corridor, junction, plot, water body …)
type ChainRef   = { role: RoleName; entity: Id };                    // view: the ordered edge chain carrying (role, entity) — a way's spine, a wall trace, a tunnel
type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };  // view: the unordered edges carrying (role, entity[, ordinal]) — a plot's frontage, access, party walls, one gate opening
type VertexRef  = { role: RoleName; entity: Id; ordinal?: number };  // view: the vertex carrying (role, entity[, ordinal]) — a junction, a tower, a gate, an entrance, a portal, a deck end, a weld end
type LatticePoint = { x: Cm; y: Cm };   // a position in an arena: in log events (with a VertexSig), view state and label placements only — never in an entity record (rule 5)
interface VertexSig { v: RoleKey[] /* the vertex's own (role, entity, ordinal) rows, sorted */; e: RoleKey[] /* the structural (role, entity) rows of its incident edges, sorted, deduplicated */ }
interface ChainProfile<T extends number | string = number> {   // a value that varies along an entity's chain (rule 5): never an array indexed by the chain's vertices
  knotRole: RoleName /* the registry's knot role for this attribute: width_knot, base_knot, invert_knot, bank_knot, shore_class_knot … */;
  values: T[] /* values[i] belongs to the chain vertex carrying (knotRole, entity, i): an authored value in the attribute's unit, or a cut knot's exact sample (rule 5) */; interp: 'linear' | 'step' }
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.** L0 faces: land components, sea, lakes,
   river reaches, islets, ponds, moats — land and water only (terrain contours and drainage lines are raster products of
   §2.3, never plat edges or faces, so no L1 face straddles two L0 parents and no drainage antenna enters a face ring).
   L1 faces: coarse blocks (regions between way *spines*) and the wall strips S7 cuts off beside each trace (§4.8); L1
   edges: way spines (centrelines), wall lines, the wall strips' setback and glacis lines (structural role `setback`,
   §4.8), shorelines inherited from L0, the map border, the context margin, the settlement perimeter (a `district_bound`
   chain, §4.5) and district boundaries — always L1 edges (a spine, a wall line, a reservation boundary, a shore or the
   perimeter; VP2-9), so every finer face lies inside one district. **L2 refines each L1 face into one half-corridor
   strip along each of its spine edges (the road reserve on that face's side, width = the way's half-width), one
   junction wedge at each of its corners, and the built block(s) that remain** — built by `corridorUnion` (§3.7), so
   every L2 face nests in exactly one L1 face. A `Corridor` entity is the `FaceRef` of the half-corridor faces on both
   sides of its spine; a `Junction` the `FaceRef` of the wedges around its vertex; a `Square` is a corridor face of
   class `square` (the K-1 repair; G-R11). Wall bands, glacis, towers and gatehouses are built the same way
   (`bandUnion`, §3.7), inside the two L1 wall-strip faces S7 cuts off beside each trace and after S9 (§4.7 S10 (0),
   §4.8; NF-P5): the band around the L1 wall chain is split by the chain itself into per-side L3 parts and an
   `Enceinte.band` is the `FaceRef` of both sides, so no band straddles its L1 edge and no lane or corridor ever meets
   it. L3 faces: plots, courts, yards, greens, alleys-as-faces, wall-band, setback and glacis parts, the margin-band
   parts along the settlement perimeter and other shared non-spine district boundaries (§3.3 pool step 3), and the
   hinterland's furlongs, lots, woods, driveways and trails (their boundaries are L3 edges carrying `field_bound`; a
   hedgerow is the `green_line` role on such an edge and a track along one is the same edge with both roles, §4.9). L4
   faces: building footprints (and wing sub-faces when stage 3 exists) plus yard sub-areas. Districts, blocks, merged
   plots and water bodies are multi-face `FaceRef`s, never single face ids (P-1 avoided).
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
   §3.3, §3.6). Where it needs a vertex on a coarser edge (a plot line ending on a kerb, a footprint corner on a plot
   line, a band's cross edge ending on its wall) `splitThrough` inserts a level-n **Steiner vertex** at the lattice
   point chosen by §3.6's placement rule near the exact foot and routes the coarser edge through it; the route moves by
   at most half a lattice diagonal, 0.71 cm (61 % of 5–60 m edges have no interior lattice point at all, GEO-1). The
   coarser edge's endpoints, birth level, faces and roles of its own level never change; a finer batch may add roles of
   its own level (a plot's frontage on a kerb). The **level-n route** of an edge is the chain through its vertices of
   level ≤ n: every level-n query, level-n digest (§6.2) and level-n stage reads that route, so no level-n result
   depends on whether or when a finer level was derived — lazy per-district stages included. The converse case — a
   *coarser* batch ending a chain on a route that already carries a finer vertex kept beside it (a neighbour's plot line
   ending on a kerb that an L2 re-derivation re-joins, a close-up's kept fabric beside a new L1 junction) — attracts
   onto that finer vertex and **promotes** it: its birth level is lowered to the batch's level, which adds it to the
   coarser route (it already lies within 0.71 cm of it) without moving it or touching the finer faces on either side;
   the commit record lists every promotion and the edit's undo record restores the birth levels (§3.6, VK-18). A coarse
   batch inserted into finished fabric (a carve, a re-carved reach, an outer moat) clears finer content only inside its
   declared **clear region** and may meet finer geometry only at the vertices an earlier batch of the same edit or stage
   prepared for that contact — named in `KernelTx.prepared` by their roles (the `deck_end` rows of a deck's bank
   vertices, the `anchor` rows of a chain end left on the new bank) — which it attracts onto and promotes, and along the
   finer stretch between two of them that it runs on, whose edges and inner vertices it promotes with them (**edge
   promotion**: a deck laid under its way, a new bank along a kept quay); any other contact is `E_LEVEL` inside the
   clear region and `E_KEPT` outside it (§3.3, §3.6; VK2-3). `clearFiner` (regeneration, undo) and `removeEdges` remove
   edges and roles and then dissolve each vertex left with degree 2 that carries the kernel's `split` flag, no vertex
   role and no pin, and whose two remaining edges carry identical role sets and one birth level. **The `split` flag
   (C-5, VK2-5).** It marks a vertex whose dissolution restores the edge it was created on exactly: it is set when the
   vertex is created on an existing edge — a split foot, a crossing, every Steiner vertex — and cleared (a) by
   promotion, because a promoted vertex is one of the coarser chain's own vertices from then on, and (b) by a move — a
   `warp`, or smoothing, which is a warp (§3.4) — that displaces the vertex, **except** a Steiner vertex re-seated onto
   its coarser edge's route and a vertex sliding along a fixed route (§3.6): both still lie on the route of the edge
   they split, and dissolving either restores that edge exactly, because the edge is the segment between its endpoints.
   So a warped same-level T-junction or crossing becomes a shape vertex of the warped chains, and removing the lane that
   ended there never straightens the warped spine; a re-seated Steiner vertex keeps the flag, so a later `clearFiner`
   dissolves it and the next derivation meets the clean coarser edge, not a leftover vertex. A chain's own shape
   vertices never carry the flag (NF-P6).
4. **Edges enter only through `insertChain`** (§3.4; semantics in §3.6) — one door for generated chains, user strokes,
   boolean and buffer outputs, offsets and smoothing results — which finite-checks and snaps to the lattice, attracts
   new vertices within `attractCm` onto existing vertices and edges, shares near-coincident stretches, places every new
   vertex on an existing edge by the placement rule, splits at every crossing and re-walks only the faces incident to
   the touched edges. Faces are never re-walked globally; a split face's two parts both inherit its owner (and its stage
   rank) until the stage re-owns one.
5. **Topology by index; references by role (Judgment J-K3).** Inside the kernel topology is keyed by `VertexId`,
   `HalfEdgeId` and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a position of a vertex:** an entity reaches its geometry
   through the kernel's role and owner tables — a `Way`'s spine is `ChainRef('way', wayId)`, a plot's faces
   `FaceRef(plotId, 3)`, a junction `VertexRef('junction', id)`, a bridge's deck ends
   `VertexRef('deck_end', bridgeId, 0 | 1)`, a castle's weld ends `VertexRef('weld', castleId, 0 | 1)`, an open wall's
   end anchors `VertexRef('anchor', enceinteId, 0 | 1)`, a reservation's attach points
   `VertexRef('attach', reservationId, i)`, a plot bound's gate openings `EdgeSetRef('gate_opening', boundId, i)` —
   resolved on demand by `resolve` (§3.4) and valid until the next commit (a debug build asserts the version). Splits
   carry roles to both parts, merges union them, attraction merges them onto the surviving edge or vertex, promotion
   keeps them, and `warp` moves the vertex that carries them, so a stored reference cannot go stale: there is nothing to
   rewrite (GEO-5 (a)).
   * **Chain attributes are knot profiles, never positional arrays (VK-2).** A value that varies along a chain — a way's
     width, a wall's base elevation, a tunnel's invert, a shore's bank kind and shore class — is a `ChainProfile`: its
     knots are vertices of the entity's own-level route carrying the registry's knot role for that attribute with an
     ordinal (`('width_knot', wayId, i)`), and between consecutive knots the value is interpolated linearly by arc
     length along that route (`linear`) or held from a knot to the next (`step`, categorical values); before the first
     and after the last knot of an open chain it is constant, a ring interpolates cyclically, and a chain of several
     rings carries at least one knot per ring and never interpolates across rings. A constant attribute is a scalar with
     no knots. The creating stage places each knot on an existing vertex of its own level or inserts one with
     `splitThrough` at its own level. `splitThrough`, attraction, crossings, promotion and `warp` never change a
     profile: a split adds a vertex that carries no knot, and a knot vertex moves with its chain. `kerb`, `bandUnion`
     and every export *sample* the profile (§3.4, §3.7) and the digest hashes its values with the knot rows, so a
     T-junction inserted into a spine by S8 cannot shift the width of the rest of it — the failure of the earlier
     per-vertex arrays, whose index every inserted vertex shifted.
   * **Cutting and joining a profiled chain (VK2-8; Judgment J-K23).** A conversion that hands part of a chain to
     another entity or opens a ring — a way split, a partial `wallToWay`, a carve's cut — does it through `retypeEdges`
     with `rekey` (§3.4), which first gives **each** part a **cut knot** at every cut vertex: a knot row of that part's
     entity carrying the profile's sample there — for `linear`, the value interpolated by arc length between the two
     knots around the cut, kept as that exact double (the one kind of knot value that is not an authored value in the
     attribute's unit; computed with + − × ÷ and `Math.sqrt` only, so it is the same on every engine); for `step`, the
     held value. A cut at a knot vertex copies that knot to the other part instead, and a part that lies wholly before
     the first or after the last knot takes the constant there as a scalar. Every part therefore samples the values it
     sampled before the cut, to within the rounding of one interpolation: over 20 000 random ways split between two
     width knots the largest change was 6.8 × 10⁻¹³ cm and 92 % of samples were bit-identical, where re-keying the knots
     alone — each part constant from its last knot to the cut — changed a sampled width by up to 8.47 m
     (`docs/validation/bench/fixall_kernel_r3_checks.out` B). A **join** of two chains into one entity concatenates
     their knots in chain order and drops a knot at the join vertex only where the joined profile samples identically
     without it — the value equals the interpolation between its neighbouring knots (a tolerance of 10⁻⁹ cm, decided in
     doubles, so every engine decides alike), or for `step` equals the previous knot's value: the two cut knots of an
     undone split carry one value and drop, restoring the original profile bit for bit (20 000 of 20 000, same file),
     while two different values at the join stay on the one vertex as two ordinals, a step, as §3.6 step 1's merged
     knots are.
   * **Positions in the log (GEO-5 (b)).** A log event that addresses a vertex by position (`moveVertex`, §7.1) stores
     its `LatticePoint` *and* the vertex's `VertexSig` at the time of the edit — its own `(role, entity, ordinal)` rows
     and the structural `(role, entity)` rows of its incident edges; the edit layer refuses a target with an empty
     signature (every editable vertex carries a structural or vertex role, §7.1's table). On replay
     `resolveVertexAt(key, at, sig)` (§3.4) maps the signature's entity ids through carry-over (§6.3) and binds, in
     order: (1) the vertex at `at` if its signature contains every recorded row; (2) else the nearest vertex whose
     signature contains every recorded row within the rebind radius — `attractCm` for a vertex without vertex roles, the
     §6.3 anchor radius of its vertex-role kind otherwise (junction and pin 1 m, gate and tower 2 m) — ties by lattice
     position (y, then x); (3) else the event is **orphaned** and reported (§7.3 item 4). A vertex is never bound by
     distance alone, so an upgrade replay can never move an unrelated vertex that happens to lie nearby.
   * **Warp and pins (GEO-5 (c)).** `warp` moves kernel-pinned vertices with everything else and holds the vertices of
     locked or pinned entities (§3.6); because every entity names its vertices by role, a moved gate, weld end or anchor
     is still that record's vertex.
6. **Refinement is a pure function**: `L(n+1) = refine_n(level-n view, params, streams)`, the streams keyed from the
   scope's lineage (§6.1). An edit at level n clears the finer content under the touched level-n faces with
   `clearFiner` and re-derives it (§7.3). Two kinds of finer content survive the clear: entities that are locked or
   pinned, returned as conflicts to the dry run (§7.1), and **kept content**, which the batch treats as fixed obstacles
   (§3.3, VK-1): faces a stage *earlier* than the one the batch re-derives from made inside those faces — which the
   one-click stage order never produces, because the wall's band parts are built after S9 inside their own L1 strip
   faces and the hinterland's L3 content after S9 by its own unit (§4.1) — and, for a coarse batch inserted into
   finished fabric, every finer face outside its clear region (rule 3, §3.3).
7. **Roles, not a single type.** Each edge pair and each vertex carries a small sorted set of
   `(role, entity, level, ordinal)` rows from the **role registry** (a versioned data table). Edge roles: `way`, `kerb`,
   `corridor_split`, `band`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`, `field_bound`, `district_bound`,
   `plot_line`, `party_wall`, `frontage`, `access`, `yard_part`, `claim`, `reserved` (a reservation's boundary before
   growth, §4.2 S3), `setback` (the L1 line bounding a wall strip, §4.8), `deck` (the edges of a `Bridge`'s deck span
   from bank vertex to bank vertex, beside the way's own `way` role — `ChainRef('deck', bridgeId)`, inserted by S1, S3,
   S5a and a carve, §4.2, §4.11; LC-7), `green_line` (hedgerows on L3 field boundaries; avenue and street-tree rows are
   `Greenery.along` records, not edges, §2.7), `treatment` (a plot edge's fence, hedge, wall or railing as an attribute
   row), `gate_opening` (the sub-edge of a treated plot edge left open for a gate, indexed per gate), `tunnel`,
   `invisible`. Vertex roles: `junction`, `tower`, `gate`, `entrance`, `portal`, `attach`, `anchor`, `weld`, `deck_end`,
   and one knot role per profiled attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`, `shore_class_knot`);
   the registry marks `attach`, `anchor`, `weld`, `deck_end`, `gate_opening` and the knot roles **indexed** (their rows
   carry an ordinal). A way's class, width profile and surface are attributes of the `Way` entity, not of its edges
   (FTG's 14 wire types generalised); a `wall` chain may be open, its ends anchored on typed vertices (a shore, a cliff,
   a castle). An `anchor` row marks the end of an open chain that rests on a coarser feature: an open wall's two ends,
   and the end a coarse insertion's preparation batch leaves on the future bank of new water (a landing, a quay's end, a
   district or reservation boundary cut at the bank), which the water's batch then names in `KernelTx.prepared` (§3.3).
   The registry marks each edge role **structural** (`way`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`,
   `reserved`, `setback`, `deck`, `tunnel`) or **partition** (the rest): a structural role is never removed by a sliver
   absorption or a face merge (§3.6), and §5.3's crossing invariant finds deck edges by their role. A vertex that
   carries any role row of a live entity is never dissolved. Coincident features are one edge with several roles — a
   street on a district boundary, a quay on a shore, a wall on a river bank, a track on a field boundary — never two
   edges and never an overwrite.
8. **Every committed batch validates its declared invariants** at their scopes (§3.10), writes a report record and a
   `CommitRecord` (§3.3); a failed batch leaves the arena at the previous `version`.

*Size.* One arena per layer stores every boundary once: at CITY ≈ 80 k vertices, ≈ 240 k half-edges, their role rows
(now with a 2-byte ordinal) and five face tables (now with a 1-byte stage rank) come to ≈ 10 MB in typed arrays, plus
≈ 2 MB for the two lookup tables at load ≤ 0.5 (≈ 1.5 MB of role heads for ≈ 60 000 role keys at 12 bytes a slot,
≈ 0.5 MB of owner heads over the five levels at 8 bytes a slot) — ≈ 12 MB (PLAUSIBLE until M0), against ≈ 20–29 MB for
five separate per-level DCELs that repeated each inherited edge at every finer level (SCL-11). Knot rows are few: a
constant-width way has none, and a wall's base profile carries one knot per trace vertex (tens to a few hundred per
enceinte). Measured for the lookup tables (`docs/validation/bench/fixall_kernel_r3_bench.out` B): a pool worker that
had to rebuild the two heads as `Map`s from the transferred arrays would spend ≈ 10 ms (60 000 keys) to ≈ 20 ms
(100 000 keys) at CITY and ≈ 62 ms at METROPOLIS before its first query; the typed tables travel inside the frozen copy,
whose one memory copy costs ≈ 1.1 ms per worker at 12 MB.

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

*Judgment J-K22 (VK2-9).* Chose typed-array open-addressing tables for the role heads and the owner heads over `Map`s,
because the pool's frozen copy is then ArrayBuffers only — one memory copy, ≈ 1.1 ms per worker — while rebuilding
`Map`s costs every pool worker ≈ 10–20 ms at CITY (≈ 62 ms at METROPOLIS, measured) on the pool's critical path before
its first query; the price is ≈ 2 MB of tables at load ≤ 0.5 and a fixed hash whose slot layout no output reads.

*Judgment J-K23 (VK2-8).* Chose cut knots carrying the exact sampled value over re-keying the existing knots alone
(each part then turns constant from its last knot to the cut — a width moved by up to 8.47 m, measured) and over
rational or source-referencing cut knots that would make every sample bit-exact, because the exact double differs from
the original sample by under 10⁻¹² cm — ten orders of magnitude below the 1 cm lattice every consumer snaps to — while
a rational form needs BigInt arithmetic in every `kerb` and `bandUnion` sample; the price is one non-integer knot value
per cut, the same on every engine.

=== REPLACE §3.1 Build-versus-adopt, per primitive ===

### 3.1 Build-versus-adopt, per primitive

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

| primitive | decision | candidate (licence) | degenerate-input handling |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | every coordinate passes `snap` (finite and range check in every build, §3.2 (7)); a new vertex within `attractCm` (26 cm) of an existing vertex lands on it; within `attractCm` of an edge it lands on the edge (`splitThrough`) — or on that edge's endpoint when the exact foot lies within `attractCm` of it, so no split leaves a sub-edge shorter than `minEdge`; a new chain running within `attractCm` of an existing edge shares that stretch with merged roles (§3.6); every new vertex on an existing edge (a split foot, a stretch's join or leave point, a crossing) is placed by the placement rule — the nearest lattice point that keeps `minEdge` and clearance (§3.6); crossings by iterated snap rounding on the 1 cm lattice, ≤ 3 passes — every pass leaves a planar arrangement, so an unconverged result commits with `W_SNAP_PASSES` instead of failing; there is no separate weld tolerance: coincidence is lattice-point equality, proximity is attraction |
| exact predicates | **build** `orient2d` (exact in doubles under the §3.2 bound); **adopt** `incircle` | `robust-predicates` **3.0.3, Unlicense** — the licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), the version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower, acceptable because `incircle` is off the topology path) | collinear / cocircular ties broken deterministically on lattice positions (never on slot ids), never `== 0` on floats; `incircle` is never on the topology path; ring orientation is `orient2d` at the lowest-leftmost vertex and areas are exact integers (`area2`, §3.2 (6)) — no topology decision reads the sign of a float sum |
| planar subdivision (one indexed arena per layer with level-tagged edges, per-level face records with stage ranks, holes, containment by parent, role and owner tables) | **build** — the core asset; **struct-of-arrays, allocation-free hot loops** (G-R7: NG's profile shows `Point.new` 385–561 k and `intersectLines` 147–213 k calls dominate) | — | every insertion is part of a batch transaction; self-touching chains split into simple runs, inserted run by run; a face below its class floor is absorbed across a partition edge or kept as typed `residue` — an edge carrying a structural role is never deleted (§3.6); a Steiner vertex never leaves the hot pixel of its coarser edge (§2.2 rule 3); finer content an earlier stage made is kept, never cleared by a coarser batch (§3.3); a finer vertex a coarser chain lands on is promoted, never duplicated, and a coarse insertion into finished fabric meets finer geometry only at its prepared vertices and the finer stretches between them, which it promotes (§2.2 rule 3, §3.6) |
| polygon booleans | **build on the kernel's arrangement** (§3.7, Judgment J-K4): overlay the operands in a scratch arrangement with `insertChain`'s machinery, label faces by winding number, keep the selected faces | Clipper2 (BSL-1.0, compiled to WASM, run in Node) and `polygon-clipping` (MIT) are **CI oracles in `@plat/testkit` only**, never shipped | integer coordinates in and out under the same attraction, placement, `minEdge` and clearance rules as every other writer; fill rule declared per call (non-zero or even-odd); an empty result is `E_DEGENERATE` with detail `empty`; the oracle comparison is split by whether attraction fired (§3.7) |
| buffers, offsets, insets (uniform and per-edge) and bands | **build on the arrangement** (§3.7): a buffer is the union of per-segment strips and per-vertex join discs (round joins as chords of ≤ 2 cm sagitta; square ends where declared); a per-edge inset and the kerb are face − ⋃ buffers; corridors and wall bands are committed by `corridorUnion` / `bandUnion`; a varying half-width is sampled from the chain's knot profile (§2.2 rule 5), each segment's strip a trapezoid between its end widths | — | the half-plane inset is used only for a uniform inset of a face whose convexity is checked exactly (`E_NON_CONVEX` otherwise); an inset larger than the inradius returns `E_DEGENERATE` with detail `collapsed` and the last non-empty distance |
| straight skeleton (roofs of irregular footprints; label spines — the maximum-clearance spanning tree of the hole-aware skeleton graph, §9) | **build** (decided, §3.8, Judgment J-K5): a wavefront with an event queue in doubles using + − × ÷ √ only, events coalesced within 1 mm of offset time and 1 cm of position, ties by the vertex's index in the canonicalised ring, a work limit counted in events, a post-condition validator on every output; convex near-rectangular footprints take the exact OBB roof instead | none assumed: no permissive, mature JS/TS skeleton is known to this design; CGAL is GPL/LGPL — rejected | input pre-cleaned (collinear merge, min angle 5°); holes supported; a validator failure or `E_WORK_LIMIT` takes the typed downgrade — a plain roof (no ridge or hip lines), a sampled medial axis (spines) — exercised by fixtures: never a crash, never unvalidated output (MFCG's skeleton "glitches in special cases") |
| OBB, convex hull, largest inscribed rectangle | **build** | — (monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes: OBB long axis, frontage normal, ± 45° — G-R13) | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`) — never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers must branch on the typed result |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for the routing lattice, site sampling, Lloyd relaxation, field seeds, medial axes — never as the street source |
| Poisson-disc / blue noise | **build** | — Bridson with **k = 50 candidates, all evaluated** (the references' measured variant, `_critic.md` C2 — G-P17), run once per session per scatter class to build the small set of ranked, periodic blue-noise tiles of §8 (MFCG's precomputed-tile trick); per-instance placement is the §8 stamp — the tile with a per-entity offset and rotation drawn from the entity's stream, clipped by point-in-polygon, ≤ 1 µs per instance (§4.9, §8) | domain clipped to any polygon with holes; empty domains return empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), not from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT) with our seeding, fBm and warp built | seeded from sub-streams; octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | smoothing never moves pinned vertices (gates, junctions, portals); a smoothing or warp step is validated as a **whole step** — edges incident to moved vertices against the index and unmoved vertices against the swept triangles, every edge incident to a moved vertex at least `minEdge` long, no two vertices on one lattice point, and the clearance invariant — and halved globally on failure (§3.6); Visvalingam–Whyatt is topology-preserving (a removal is refused when the new edge would touch or cross another edge of the ring, its face's other rings or a declared obstacle, checked in the index — the `simplify` service of §3.4); fillets skipped when legs are shorter than the chord; results re-enter through `insertChain` |
| spatial index | **adopt + build** | `flatbush` (ISC) as static partitions per level — one per arena at L0–L1, one per district at L2–L4 — rebuilt only at stage end (S10's eager step (0) ends before the pool's freeze and rebuilds the L3 partitions it touched, so the frozen copy holds every item in a static partition, §3.3); each level's index holds the items born at that level — vertices, whole route edges with boxes padded by the hot pixel, faces — so a finer batch's Steiner split never writes a coarser level's index (§3.3); a uniform grid per level for every change inside a stage and for edits (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | a level-n query returns level-n items sorted by their **canonical key on the level-n route** (VK-14, VK2-4) — a vertex of level ≤ n by its lattice position (y, then x); an edge by the two endpoints of its level-n route edge, lower (y, x) first; a face by the first two vertices of level ≤ n on its outer ring, from the lowest-leftmost such vertex (a ring that visits it twice takes the smaller successor) — a total order, because a directed level-n route edge bounds exactly one level-n face (§3.3), which no finer vertex can change — so neither which index holds an item nor whether a finer level exists changes an output; tombstones filter static-partition hits only |
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
  | 'E_LEVEL'              // a batch wrote a level other than its own, or a clear-region batch met finer geometry inside its region away from its prepared contacts (§2.2 rule 3, §3.3, §3.6)
  | 'E_LOCKED'             // the op would cut, move or delete geometry owned by a locked or pinned entity — returned to the dry run as a conflict (§7.1)
  | 'E_KEPT'               // an insertion or clear would cross, clear or come within attractCm of finer content an earlier stage made (or, in a clear-region batch, content outside the region) that this batch does not re-derive (§3.3) — a stage-domain bug in generation, a conflict in an edit's dry run; a move keeps nothing (§3.6)
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
  count: number; at?: LatticePoint };   // W_PLACED: a new, re-seated or sliding vertex placed away from its nearest lattice point by the placement rule (§3.6); W_PROMOTED: a finer vertex, or a clear-region batch's prepared stretch, promoted (§2.2 rule 3)
```

The earlier codes map as follows: `E_TIMEOUT` → `E_WORK_LIMIT`; `E_SNAP_UNSTABLE` → the warning `W_SNAP_PASSES`;
`E_MIN_EDGE` → `E_BELOW_MIN_EDGE` (optional chains only); `E_COLLAPSED` and `E_COLLINEAR` → `E_DEGENERATE` with a
detail; `E_NONMANIFOLD` → prevented by the contact semantics and the simple-face invariant (§3.6, §3.10).

*Chose to build `dmath` rather than adopt a maths package (NF-D15, NF-S8)* because D-23, J-11 and §17.4 already decided
it and a port we own keeps the production closure free of a 94-package dependency; the earlier "adopt" wording in this
table was stale. *Chose a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback (VK-16)*
over re-verifying at adoption, because the licence is confirmed now and the checker re-runs on every upgrade, so no
licence question is left open.

=== REPLACE §3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end ===

### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

```ts
interface KernelTx { key: PlatKey; level: Level; ops: KernelOp[] /* declared form only: independent ops, applied in canonical order */;
  expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade'; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives: finer content an earlier stage made is kept (below); = stage in generation, the start of the edit's re-derivation for an edit (§7.3), the first stage that writes fromLevel for a warp or smoothing batch, which keeps nothing (§3.6) */;
  clearRegion?: Ring[] /* a coarse batch inserted into finished fabric, and its preparation batches: clearFiner acts only on faces meeting it (below) */;
  prepared?: VertexRef[] /* with clearRegion: the vertices earlier batches of the same edit or stage placed for this batch's contacts with finer geometry — deck_end and anchor rows — the only finer vertices it may meet (§3.6 candidates (c)) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: PlatKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are the "moved edges" of §3.10 (GEO-35) */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3); the edit's undo record keeps their lattice points and former levels */;
  promotedEdges: number[] /* edge pairs (h >> 1) of prepared stretches this batch shared and promoted (§3.6 (c)); the undo record keeps their endpoints' lattice points and former levels */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[]; work: number }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; the kernel applies the ops to a scratch overlay, serves every query inside the batch from the level's
dynamic grid plus the static partitions, validates the batch-local invariants on the touched faces and their one-ring
(§3.10), and commits or rejects atomically. Local repair (§5) runs inside the transaction on the overlay.

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  bounded Steiner vertices and promotions of §2.2 rule 3 (finer vertices a chain lands on, and a clear-region batch's
  prepared stretches); it may clear finer content inside its faces (`clearFiner`)
  subject to the kept-content rule below, and a `warp` batch moves vertices of every level ≥ its own (§3.6); anything
  else is `E_LEVEL`. A lane that a finer stage would like to add to a coarser level is therefore a separate, coarser
  transaction (§4.7), never a side effect of a finer one; a stage that writes two levels (S3: its carvings at L0, its
  reservations at L1) issues one transaction per level, in the order of §4.1's batch table.
* **Kept content (VK-1; Judgment J-K14).** Every face records the rank of the stage whose batch created it
  (`LevelFaces.stage`; the rank is the stage's position in §4.1's topological order, fixed per generator version). A
  batch clears finer content inside its faces only where that content's stage rank is at least that of `rederivesFrom`;
  finer faces an earlier stage made are **kept** — neither cleared nor re-owned — and their edges and vertices are
  obstacles: an op that would cross a kept edge, split a kept face or bring new geometry within `attractCm` of it (other
  than a finer vertex on a route the chain ends on, which is promoted, §2.2 rule 3) returns `E_KEPT`. **`E_KEPT` governs
  insertion and clearing only (VK2-7 (a)).** A `warp` or smoothing batch keeps nothing: its `rederivesFrom` is the first
  stage in §4.1's order that writes its `fromLevel` (S1 for L0, S3 for L1, S9 for L2, S10 for L3, S11 for L4), so every
  face it could move has a stage rank at least that, and what a move may not displace is decided by §3.6's held vertices
  and whole-step validation instead; the faces a step leaves below a class floor are re-derived afterwards by their own
  batches, each with the `rederivesFrom` of the stage that makes them. The re-walk re-parents each kept face into the
  new face that contains it — a kept face never straddles a new edge, because crossing it is refused — so nesting holds.
  In generation `E_KEPT` cannot arise on a correct pipeline, because the stage order builds no finer face before a
  coarser stage that could meet it: a wall's band, setback and glacis parts are L3 content of their own L1 wall-strip
  faces, cut off by S7 before S8 and built after S9 (§4.7 S10 (0), §4.8), and the hinterland's L3 content is built after
  S9 by its own unit (§4.9); the rule turns a wrong domain into a typed failure that the stage property tests catch (0
  `E_KEPT` on the one-click path, §13.2). In an edit it returns to the dry run as a conflict whose offered resolution is
  to start the re-derivation at the stage that made the content. A regenerate whose scope holds wall-strip faces, or
  faces bordering the settlement perimeter or a reservation boundary two districts share, re-runs S10's step (0) for
  **its own side's** parts after its S8 and S9 — `bandUnion` restricted to the scope's faces, its cross edges attracted
  onto the vertices the other side's parts already placed on the shared L1 edge (§7.3; VK2-2) — so wall bands and margin
  bands are rebuilt with the fabric, never kept and never lost. `clearFiner` never removes kept content and never
  reports it as a conflict: it is kept by design, and only locked or pinned content is a conflict (§2.2 rule 6).
* **Local coarse insertion — clear regions and prepared contacts (NF-P14, NF-P4, LC-7, VK2-3; Judgments J-I10, J-K24).**
  A coarse batch inserted into finished fabric — §4.11's carve of a canal, moat or basin, §4.4's outer moat, S1's water
  operator re-carving a reach (§7.3 (b)) — would under the plain rule clear every finer face of its level-n faces, and
  an L0 face is a whole land component, so one canal would clear the town. Such an insertion therefore runs as a
  declared sequence of single-level batches that share one **clear region**, carried in `KernelTx.clearRegion`: the
  region the operator declares (§4.11 defines the carve's and the outer moat's, §7.3 (b) the re-carved reach's), which
  must contain the new chains ⊕ (`attractCm` + the clearance of the chain's class — for a channel, its bank setback) and
  may be larger (the whole L1 cells the operator's way rule touches). The kernel's part is three rules:
  1. *Clearing.* `clearFiner` in a batch that declares a clear region removes each finer face whose interior meets the
     region — whole, never part of one — with the edges and vertices no remaining face uses, and nothing else; locked
     and pinned owners return as conflicts; every finer face that does not meet the region is **kept content**,
     whatever its stage rank.
  2. *Preparation.* One or more batches at the finer level, issued first in the same edit or stage, clear the region
     (rule 1) and place **every** point where the coarse chain will meet finer geometry, as vertices named by role: a
     deck's two bank vertices on each way the operator keeps across the new water (`deck_end`), with the way's stretch
     between them one straight edge; the end a landing or kept quay leaves on the new bank (`anchor`); for a finer
     stretch the new chain will run along (a kept quay), its two ends (`anchor`); and for every other finer edge the new
     water will cross — a district or reservation boundary, the settlement perimeter, a wall strip's setback line — its
     two bank points, with the stretch between them removed (`anchor`, on that chain's own entity). A way cut back to
     its bank setback leaves no contact and needs no prepared vertex.
  3. *Contact.* The coarse batch may split the finer faces that meet the region (their records are re-walked and keep
     their owners until a later batch of the operator re-owns them), but it lists the prepared vertices in
     `KernelTx.prepared` and may meet finer edges and vertices only there: §3.6's candidate (c) attracts it onto each
     prepared vertex and promotes it, and shares and promotes the finer stretch between two prepared vertices that it
     runs along — so the carve's L0 batch inserts each kept way's **L0 deck edge** between its two promoted bank
     vertices by sharing and promoting the way's straight L1 edge between them, and the bank along a kept quay by
     sharing and promoting the quay's edges (`CommitRecord.promotedEdges`). The finer edges at a prepared vertex stay as
     they are — kept outside the region, the preparation's own inside it. Any other contact with finer geometry is
     `E_LEVEL` inside the region and `E_KEPT` outside it, and returns to the dry run (in generation, to the stage's
     property tests). The re-derivation that follows runs only on the finer faces the clear removed (the channel's
     banks, the cut ways' stubs, the cells the way rule touched), so a carve costs its clear region, not the town.
     *Confirmation (M3a):* §13.1's and §13.2's carve fixtures — a canal across a CITY district, an outer moat at S5a, a
     river control-point move — require every face outside the clear region byte-identical, attraction onto **exactly**
     the prepared vertices (every one promoted, no other finer vertex promoted, and each deck an L0 edge carrying `deck`
     and `way`), and a carve chain that touches a finer edge away from its prepared vertices refused (`E_LEVEL`).
     *Pre-decided fallback* if a fixture cannot be met: the batch clears the finer content of its whole L0 land face and
     re-derives it (the plain rule — correct, slower); `moat: 'all'` is then carved only before S5c of the outer stage,
     where L1 holds only arterials, and an edit carve becomes a declared town-wide re-derivation with the fate report
     (§7.3).
* **Two op forms (GEO-11, VK-6; Judgment J-K15).** A transaction takes exactly one of two forms, fixed by its stage's
  registration (§4.1, §14); a transaction that supplies both `ops` and a callback is a programming error caught by an
  assertion.
  * **Declared** — `KernelTx.ops` lists independent ops, none reading another's result (S3's carvings, S4's routed
    arterials, S7's strip lines and furniture, S9's `corridorUnion`, S11's per-plot footprints, an edit's inserted
    feature). Before applying,
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

1. *The frozen base (VK2-1; Judgment J-K25).* When the eager S10a and S10's **shared-edge step (0)** have committed —
   the step runs on the generation worker and builds, on both sides at once, the bands around every L1 edge that two
   overlays' face sets share without corridors (step 3; §4.7) — step (0) ends as an eager stage does: it **rebuilds the
   static L3 partitions its batches touched** (below; a finer batch writes no coarser index, so L3 is the only level it
   touches), so that at the freeze every level's dynamic grid and tombstone set is empty, which the freeze asserts. The
   generation worker then freezes the arena at that version and sends each pool worker one read-only copy — the vertex,
   half-edge, role and face arrays, the role-head and owner-head tables (typed arrays, §2.2) and the **L0–L3 static
   index partitions** (L4 is empty at the freeze) — as transferred `ArrayBuffer`s, so a pooled plot line that must end
   on the inner edge of a wall band, a setback part or a margin band, and S12b's greenery in setback and glacis residue,
   find those edges by the same indexed queries as everything else. No `SharedArrayBuffer` is used, so an embedding host
   needs no cross-origin isolation (§11.2). The copy is ≈ 12 MB at CITY, one memory copy per worker (≈ 1.1 ms each,
   measured; ≈ 3.3 ms for three; §12.4), and §12.8 counts one arena copy per pool worker. The rebuild covers every L3
   item step (0) made — at CITY ≈ 9 000 vertices, edges and faces (both sides of ≈ 6 km of perimeter margin band and of
   the wall's band, setback, glacis and tower parts, our count) in ≈ 26 partitions — and costs ≈ 2.3 ms at CITY and ≈
   5.8 ms at METROPOLIS by the measured build rate (`docs/validation/bench/fixall_kernel_r3_bench.out` A), which §12.4
   carries in S10 (0)'s row.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base: new
   vertices, half-edge pairs, face records and role rows go to the overlay's own growable arrays in overlay-local slots
   numbered above the base's high-water mark — and so do the interned handles of the entities the district creates,
   remapped with the slots at the merge — and a change to a base record — a kerb edge split by a plot line, a face
   ring re-walked — is written as a copy-on-write record in the overlay. Every district starts from the frozen base
   alone, never from another district's overlay, so its result is a pure function of the base, its allocation and its
   own sub-stream, whichever worker runs it and whatever ran on that worker before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. Its **scope** is every face
   of the set, every edge with a face of the set on both sides, every vertex whose incident faces all lie in the set,
   and — for a split only (a vertex placed on the edge, §2.2 rule 3) — every edge on the set's boundary whose other side
   no overlay writes (a water face, the frame margin) with the vertex placed on it; so waterfront plot lines may end on
   their own bank. A write of any kind — a split, a retype, a role row, a move, an owner change — outside the scope
   returns `E_SCOPE`. The L1 edges two overlays' face sets share are therefore never written in the pool: a shared spine
   is flanked by corridors whose kerbs each side's lines end on (and avenue and street-tree rows are `Greenery.along`
   records in the planting district's own half-corridor strips, not roles on the way, §2.7, §4.9); a shared **wall
   trace** gets its band, setback, glacis, tower and gatehouse parts from the shared-edge step (0) before the freeze
   (step 1); and every other shared L1 edge without corridors — the settlement perimeter between the districts and the
   hinterland (§4.5), and any reservation boundary two districts share — gets from the same step a **margin band**,
   `bandUnion` of half-width 2 m — 2 m on each side, a table value ≥ the residue class's minimum width (VP2-6) — split
   by the edge into one unbuildable L3 part per side (a backland strip on a district side, a headland on the hinterland
   side, each drawn as its side's ground), so the pooled plot and furlong lines on either side end on the band's inner
   edge, inside their own set (J-I9). The **hinterland unit**, which the generation worker runs while the pool works
   (§4.1, §4.9), is one more overlay of this kind: its face set is the hinterland's L2 blocks, disjoint from every
   district's, and it merges with the districts' overlays in lineage order. The overlay also lists the base records it
   copied; at merge, two overlays that copied the same base record, or a copied base record that the live arena changed
   after the freeze, fail the pool with `E_SCOPE` — defence in depth that a test asserts never fires.
4. *The merge.* The generation worker applies the overlays in district lineage order (§6.3): each overlay's new records
   are appended with a slot remap table (overlay-local slot → next free arena slot), its copy-on-write base records
   replace their originals, references inside the overlay are rewritten through the remap table, and only that
   district's faces are re-walked to validate rings and parents. The district's L3 and L4 static index partitions (the
   pooled stages write no coarser level, and a finer split never changes a coarser index, below), built by the worker at
   district end from the base partition's live items (step (0)'s parts in that district included) and the overlay's new
   ones, travel with the overlay and have their item tables rewritten through the same remap table, so the merged arena
   needs no index rebuild; the overlay's added and changed role-head and owner-head keys, kept in the overlay's own
   small tables and consulted before the base's, are inserted into the live tables through the same remap; the
   district's digest leaves (§6.2) travel with it too, and the root is finalised once after the last overlay. The cost
   is O(overlay size): the ≈ 200 000 records S10–S12b create at CITY merge within §12.4's 8 ms merge row.
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; Judgment J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned —
one partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland,
margin) — with a tombstone set, and (b) one **dynamic uniform grid** (cell 25 m at L0–L1, 10 m at L2, 5 m at L3–L4;
table values) with O(1) insert and delete. **What each level's index holds (VK2-1, VK2-4):** the items born at that
level — its vertices; its **route edges**, each maximal run of that level's sub-edges between two vertices of level ≤ k
being one item whatever finer vertices later split it, its box padded by the 0.71 cm hot pixel and its handle the
half-edge leaving its lower (y, x) endpoint (a split keeps that pair on the part at that end, so the handle never
changes); and its face records. A finer batch that splits a coarser edge with a Steiner vertex therefore writes only its
own level's index, never a coarser one — S10's step (0) and every pooled stage touch only the L3 and L4 indexes — while
a promotion, the coarser batch's own change, moves the promoted vertex to its new level's index and makes the route
edge it now splits two items. Inside a stage every insertion and deletion goes to the grid; a level-n query reads the
static partitions of levels ≤ n that its box intersects and their grids, drops the static hits whose slot is
tombstoned, expands each route-edge hit into the pieces of its level-n route that meet the box, and **sorts its
result by the canonical key of each item kind, read on the query's level-n route** (VK-14, VK2-4): a level-n query
returns the vertices of level ≤ n, each level-n route edge once (as its sub-edge leaving its lower endpoint) and the
level-n faces, and keys them — a vertex by its lattice position (y, then x); an edge by the positions of the two
endpoints of its level-n route edge, the lower (y, x) first, never by a sub-edge's endpoints; a face by the positions of
the first two vertices of level ≤ n on its outer ring — the lowest-leftmost vertex of level ≤ n and the next vertex of
level ≤ n counter-clockwise, finer vertices skipped, and where the ring visits that vertex twice the smaller of its two
successors; in a mixed result vertices come before edges and edges before faces. The key is total: no two vertices
share a lattice point, no two level-n route edges share both endpoints, and a face's key is one directed level-n route
edge, which bounds exactly one level-n face — so neither which structure holds an item nor whether a finer level has
been derived changes any answer (a finer vertex on the ring is skipped, so an L3 query orders its results identically
before and after S11 derives L4 in the block; `docs/validation/bench/fixall_kernel_r3_checks.out` C shows the full-ring
key reversing two plots there), and no implementation ever needs a slot to break a tie. **Tombstones (VK-15)** name
slots deleted since their partition was built and filter **static-partition hits only**: a slot freed and reused inside
the stage holds a new item that lives in the dynamic grid, which tombstones never filter, so reuse can never hide it.
*Chose static-only filtering over forbidding slot reuse until the next rebuild* because the old and new occupants of a
slot then live in different structures by construction and the arena stays compact. **Static partitions are rebuilt
only when a stage ends** — for an eager stage once, after its last batch, and for S10's eager step (0) once, before the
pool's freeze (pool step 1); for a lazy or pooled per-district stage, the district's own partitions after that
district's run — and, during an editing session, when a partition's grid overflow exceeds max(256, ¼ of its static
size): a count, never an idle timer. Measured rebuild cost of the flatbush construction
(`docs/validation/bench/bench_index.out`): 0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 ms at 17 000. At CITY that is
about one L3 and one L4 rebuild per stage (≈ 7 ms together), or ≈ 0.2–0.3 ms per district partition, instead of the
1.9 s (S10) and 13.4 s (S11) that a rebuild per block or per plot commit would cost; a single plot edit rebuilds at most
its district's L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5 ms) inside the 5 ms plot-edit budget. A cost-model test
fits each stage's time against commits × level size and fails if rebuild work grows with the number of commits (§13.2).

The commit granularity is part of every stage's declaration (§4.1), so the ≈ 48 s hazard of per-insertion commits the
engineering judge computed cannot arise, and neither can its per-batch twin; the first M0 measurement is the cost of
insert + snap + attract + re-walk per growth proposal (target ≤ 8 µs, with §3.7's rule for a miss; §16).

*Judgment J-K6 (amended for VK2-4).* Chose static partitions rebuilt at stage end (per district at L2–L4) with a
dynamic grid inside stages over a rebuild per batch commit, because per-batch rebuilds of a growing level make S10 and
S11 cost seconds (measured 1.9 s and 13.4 s at CITY), and chose query results sorted by a total canonical key per item
kind, read on the query's level-n route, over keys read on the full ring or on sub-edges, so that neither index state
nor a finer level's derivation can change a level-n output (rule 3's promise; the full-ring key reverses two L3 faces
once an L4 vertex lands on their shared edge, measured).

*Judgment J-K14 (VK-1, as amended at integration).* Chose to keep finer content an earlier stage made, and every finer
face outside a coarse edit's clear region — an obstacle to later coarser batches, with `E_KEPT` for a violation — over
letting a coarser batch clear everything finer inside its faces and re-running the earlier stages afterwards, because a
coarse edit inside finished fabric must not erase what it does not re-derive and a wrong stage domain must fail typed
rather than erase silently; the stage rank per face costs one byte. Integration moved the wall's band parts into L1
strip faces built after S9 (J-P29, J-I9), so the one-click order produces no kept content and the rule is the safety net
and the basis of clear regions (J-I10). Round 3 confines the rule to insertion and clearing: a move keeps nothing,
because a warp is the user's explicit displacement of finished fabric and would otherwise be `E_KEPT` over every
street it touches (VK2-7).

*Judgment J-K24 (VK2-3).* Chose to name a coarse insertion's permitted contacts explicitly — `KernelTx.prepared`, by
role, with the finer stretch between two of them shared and promoted (edge promotion) — over letting the coarse chain
attract onto any finer vertex near its route, because the kernel can then refuse every unprepared contact
(`E_LEVEL`) instead of silently welding a canal bank onto whatever plot corner lies within 26 cm, and over requiring the
preparation to leave a gap in each kept way for a new deck edge, because a way that stays one connected chain through
the whole edit keeps §3.10's role-consistency check meaningful after every batch; the price is one more promotion kind
(an edge's birth level lowered, recorded for undo) that only a clear-region batch can use.

*Judgment J-K15 (VK-6).* Chose two declared transaction forms — independent op sets in canonical order, dependent op
sequences in issue order — over one canonical order for every batch, because a recursion such as the bent cut plans each
op on the faces the previous op created, so sorting it would apply a child cut before its parent face exists, while its
issue order is already a deterministic function of the stage's inputs and streams.

*Judgment J-K16 (VK-3).* Chose read-only transferred copies of the arena with one copy-on-write overlay per district and
a lineage-ordered merge, over a `SharedArrayBuffer` arena written in place by the workers, because shared memory makes
cross-origin isolation a requirement of every embedding page (D-4's embed target), in-place writes would need locks
whose order could leak into the output, and a district that starts from the frozen base alone is deterministic whatever
the pool size; the price is one arena copy per worker (≈ 12 MB at CITY with the typed lookup tables), counted in §12.8.

*Judgment J-K25 (VK2-1).* Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, so that the
frozen copy carries the L0–L3 static partitions and every dynamic grid is empty at the freeze (asserted), over shipping
the generation worker's dynamic grid with the copy (the grid would have to become a transferable structure, and each
worker would query two dynamic structures) and over letting each pool worker index its districts' step-(0) parts at
district start (≈ 0.8 ms per worker in parallel instead of ≈ 2.3 ms once), because one checkable precondition — nothing
at the freeze lives outside a static partition — makes it impossible for any pooled stage to query an index that misses
eager content, whatever later eager steps are added before the freeze; the price is ≈ 2.3 ms on CITY's critical path.

=== REPLACE §3.4 Kernel operations the pipeline needs (complete list) ===

### 3.4 Kernel operations the pipeline needs (complete list)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

```ts
// @plat/kernel — the only writers of any arena. `tx` is the open KernelTx (declared or callback form, §3.3); write ops charge its work count.
// Writers (level = tx.level; semantics §3.6)
insertChain(tx, points: Point[], roles: RoleRow[], cls: 'mandatory'|'optional', opts?: { closed?: boolean; pinned?: number[]; knots?: { index: number; role: RoleName; ordinal: number }[] }): KernelResult<ChainInsert>
splitThrough(tx, at: HalfEdgeId, p: Point): KernelResult<VertexId>         // a vertex on an existing edge, placed by §3.6's placement rule; a Steiner vertex when the edge is coarser (§2.2 rule 3)
removeEdges(tx, ref: ChainRef | EdgeSetRef): KernelResult<void>            // strips (role, entity); deletes edges left with no role; dissolves each degree-2 vertex left with the `split` flag, no vertex role, no pin and identical role sets and level on its two edges (§2.2 rule 3) — so removing a lane that ended on a spine restores the spine exactly
clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Conflict[]>     // removes content finer than `level` inside the faces whose stage rank ≥ tx.rederivesFrom's — with tx.clearRegion declared, exactly the finer faces whose interior meets the region, whole (§3.3); kept content stays silently; dissolves as removeEdges does; locked or pinned owners are returned, not removed (§3.3)
retypeEdges(tx, ref: ChainRef | EdgeSetRef, add: RoleRow[], remove: RoleName[],
            rekey?: { from: Id; to: Id; profiles?: { from?: ChainProfile; to?: ChainProfile }[] /* both entities' profiles, paired by knot role */ })
  : KernelResult<{ profiles: { knotRole: RoleName; from?: ChainProfile | number | string; to: ChainProfile | number | string }[] }>
  // the EVO conversion primitive (wall → way) on role sets. `rekey` moves the ref's (role, from) rows, knot rows and vertex roles to `to`,
  // renumbering each entity's knots from 0 in chain order; at every vertex where the moved edges meet edges that keep `from` it first
  // cuts each profile there (cut knots), and at every vertex where they meet edges already carrying `to` it joins them (§2.2 rule 5);
  // it returns both entities' new profiles — a scalar where a part has no knots left — which the caller writes into both records in the same edit
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
warp(tx, field: DisplacementField, fromLevel: Level, region: Point[]): KernelResult<MoveReport>   // the edit layer computes the field from a WarpStroke or a moveVertex (§7.1) on the current geometry, and the smoother from a smoothing pass; held vertices, slides, placement-rule re-seats, whole-step validation (§3.6); keeps nothing (§3.3)
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

`insertChain` is the only door for new edges, `removeEdges` and `clearFiner` the only doors for removing them, and
`warp` the only door for moving existing vertices (a `moveVertex` edit is a `warp` whose field displaces one vertex,
resolved by `resolveVertexAt`, and smoothing of committed geometry is a `warp` whose field the smoother computes from
the chain's current vertices); every other writer is built from these, which is why planarity, `minEdge`, clearance and
the kept-content rule are properties of this list rather than of every stage (§3.10). Each op has documented
preconditions, work local to the touched faces, a typed result, a declared operation count and fuzz tests with
constructive degeneracies (§13.1). The pipeline's older names map directly: `corridorUnion` keeps its name and becomes
the corridor use of `bandUnion`; `claimSubFace` may now span several faces (a reservation that crosses coarse faces, a
precinct, a bailey); `retypeEdges` acts on role sets; `bufferChain` is `buffer`; `edgeChainBetween` is
`resolve(ChainRef)`; `weld` no longer exists (attraction, §3.6); `refine(level)` is a stage, not a kernel op. `sideRuns`
gives stages a side notion that survives curved, round-joined kerbs (maximal runs within a cumulative turning tolerance,
each with its chord direction), which the bent cut needs (§4.6). `setOwner` and `retypeEdges` are also the calls §6.3's
succession uses: when a re-derivation hands a carried address to a successor, the same batch re-owns the successor's
faces and roles under that address, so geometry and address always move together. `buffer`'s per-point half-widths apply
only to the transient chains a caller passes in (a stroke being previewed, a skeleton arc); a stored chain's varying
width is always a `ChainProfile`, sampled by `kerb` and `bandUnion` (§2.2 rule 5). A chain that carries a profile is
inserted with its knots (`opts.knots`: the chain index of each knot vertex with its knot role and ordinal); a knot that
attraction lands on an existing vertex is carried to that vertex, so the profile keeps its knot. A chain cut into parts
owned by different entities, a ring opened, or two chains joined go through `retypeEdges`' `rekey`, which inserts and
drops cut knots by §2.2 rule 5 and returns the new profiles; the former `ordinalOffset` argument is gone, because the
kernel renumbers each entity's knots in chain order itself.

=== REPLACE §3.6 Insertion, contact and move semantics — attraction instead of a weld dead band ===

### 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

**Attraction (GEO-3, VK-18, VK2-3; Judgment J-K2).** `insertChain` processes each chain of a batch in the batch's order
— canonical for a declared op set, issue order in a callback-form stage (§3.3) — in five steps. Its **candidates** are:
(a) the vertices and edges of level ≤ the batch's level; (b) the **finer vertices lying on those edges' routes** where
the chain ends on or joins such a route (a neighbour's plot-line end on a kerb an L2 re-derivation re-joins, a
close-up's kept fabric beside a new junction); (c) **in a batch that declares a clear region, its prepared contacts**
(`KernelTx.prepared`, §3.3): each prepared vertex, attracted and promoted like the finer route vertices of (b), with its
finer edges kept; and the **finer stretch between two prepared vertices** that the chain runs along — every point of the
stretch within `attractCm` of the chain, as step 3's shared stretches are — which the chain shares: the stretch's edges
gain the chain's roles and, with its inner vertices, are promoted to the batch's level (edge promotion,
`CommitRecord.promotedEdges`). So a carve's L0 batch lays each kept way's deck on the way's own straight L1 edge between
its two prepared bank vertices, and a new bank on a kept quay's edges, without a second edge beside the first. A finer
vertex of (b) or (c) that a chain vertex lands on, or that a chain segment is routed through, is promoted to the batch's
level (§2.2 rule 3; `W_PROMOTED`, listed in the commit record), and promotion clears its `split` flag, because it is one
of the coarser chain's own vertices from then on. Nothing finer is a candidate otherwise. Finer content inside the
batch's faces has been cleared (§2.2 rule 6) unless it is kept (§3.3); kept geometry is an obstacle, and a chain that
would cross it or come within `attractCm` of it elsewhere returns `E_KEPT`; inside a clear region, a chain that would
cross or come within `attractCm` of a finer vertex or edge other than its prepared contacts returns `E_LEVEL` — so a
canal bank can never weld onto a plot corner that happens to lie within 26 cm of it. A chain is inserted run by run, and
the part of it already inserted counts as existing geometry for its later parts, so a chain that doubles back near
itself attracts onto itself like onto any other edge.

1. *Snap and decimate.* Every point passes `snap` (§3.2 (7)). Consecutive points closer than `minEdge` are decimated —
   the later one is dropped unless it is pinned or a knot (§3.4 `opts.knots`); two pinned or knot points closer than
   `minEdge` merge at the first, reported, and a merged knot vertex carries both ordinals (a step in its profile). A
   chain that touches or crosses itself is split into simple runs.
2. *Vertex attraction.* A chain vertex within `attractCm` of an existing vertex moves onto it (nearest; ties to the
   smaller lattice position, y then x). Otherwise, within `attractCm` of an existing edge (the nearest; ties by the
   edges' canonical keys, §3.3), take the exact foot of the vertex on that edge: **if the foot lies within `attractCm`
   of one of the edge's endpoints, the vertex moves onto that endpoint** (the nearer; ties y then x), because a split
   there would leave a sub-edge shorter than `minEdge`; otherwise it moves onto the edge at the foot's placement point
   (below) by `splitThrough` — a Steiner vertex if the edge is coarser. The round-1 verifier's case: a vertex at (20,
   20) beside the edge (0, 0)–(1 000, 0) is 28.3 cm from (0, 0), so not vertex-attracted, and 20 cm from the edge; its
   foot (20, 0) lies 20 cm from (0, 0), so the vertex moves onto (0, 0) instead of splitting off a 20 cm edge. An
   incoming vertex therefore moves at most √2 · `attractCm` ≈ 36.8 cm. Chain vertices that attraction brings within
   `minEdge` of each other merge, the later into the earlier, as in step 1.
3. *Segment and stretch attraction.* A chain segment that passes within `attractCm` of an existing vertex is routed
   through it. Where a segment runs within `attractCm` of an existing edge over a stretch — a near-parallel approach, or
   a crossing shallower than `minFaceAngle` — the stretch is shared: the chain joins the edge where the stretch begins,
   follows it and leaves where it ends, and the shared edges gain the chain's roles (`W_STRETCH_SHARED`). A join or
   leave point whose exact position lies within `attractCm` of an endpoint of the edge it joins moves onto that
   endpoint, as in step 2; any other join or leave point is placed by the placement rule; a stretch whose join and leave
   points would lie closer than `minEdge` collapses to one contact point, handled by step 2.
4. *Crossings.* The remaining crossings are computed exactly, placed by the placement rule and resolved by iterated snap
   rounding (≤ 3 passes; each pass leaves a planar arrangement, so an unconverged result still commits, reported
   `W_SNAP_PASSES`; the sub-centimetre re-routes of Steiner vertices are snap-rounding re-routes and carry the same
   guarantee). Two consecutive crossings closer than `minEdge` lie on the two arms of an acute corner — the clearance
   invariant forbids any other way for two edges to come that close — and are resolved at that corner instead of cutting
   a sliver off its tip (`W_WEDGE_ROUTED`): when the corner is the existing arrangement's (two crossings along one new
   segment) the chain is routed through the corner's vertex; when it is the chain's own (two crossings along one
   existing edge) the chain's corner vertex moves onto that edge at the placement point of its foot. Either way the
   chain moves at most `minEdge / (2 tan(θ/2))` for a corner of angle θ: 0.47 m at the 30° junction floor, 1.2 m at the
   12° plot floor. An optional chain that would move more than `attractCm` this way is rejected instead
   (`E_BELOW_MIN_EDGE`).
5. *Re-walk.* Only faces incident to touched edges are re-walked; face records, owners, parents and stage ranks are
   updated — a kept face is re-parented into the new face that contains it (§3.3); the commit record lists them.

**The placement rule (GEO-3, GEO-35; Judgment J-K17).** Every new vertex on an existing edge — a split foot, a stretch's
join or leave point, a crossing — is placed at the lattice point nearest its exact position among the points that (i)
lie within 0.71 cm of the existing edge's route, so that edge moves no more than its hot pixel; (ii) lie at least
`minEdge` from the endpoints of the edge being split and, for a crossing, from the endpoints of the crossing segment;
and (iii) keep every vertex and edge around the split at least `minEdge` from the new vertex and from every edge
incident to it (the clearance invariant, checked in the index); ties y then x. The search runs outward from the exact
position, never beyond `attractCm`, and charges each candidate to the work count. The nearest lattice point qualifies
almost always. It fails only where a vertex already stands between `minEdge` and `minEdge` + 0.71 cm from the edge — a
gap a previous rounding or a warp can leave — and a point rounded towards it would bring it inside `minEdge`; then a
qualifying point lies a few centimetres along the edge, because that vertex is at least `minEdge` from the edge's line
and a point ≈ 5 cm along the edge's hot-pixel band is at least `minEdge` from it. Measured
(`docs/validation/bench/fixall_kernel_r2_attract.out` C): 200 000 crossings placed next to a vertex 25–26 cm from the
crossed edge — plain nearest-point rounding leaves 1 361 edges shorter than `minEdge`; the placement rule leaves none,
moves a crossing at most 0.84 cm and keeps it within 0.71 cm of the crossed edge. If no candidate qualifies, the
incoming vertex moves onto the nearer endpoint of the edge (a crossing routes its segment through that endpoint), the
new segments re-enter step 3, and the step reports `W_PLACED`; each such re-route lands on an existing vertex, so the
loop ends within the work limit. Snap rounding is the same rule for points that lie on no existing edge (nearest lattice
point).

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
a vertex standing 25.0–25.7 cm from it; a stretch whose join point falls within `attractCm` of an edge endpoint; a
carve whose L0 channel attracts onto exactly its prepared vertices, promotes each deck's L1 edge to an L0 deck edge
carrying `deck` and `way`, and is refused with `E_LEVEL` where it would touch any other finer vertex.

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

**Moves: warp and smoothing (GEO-10, GEO-35, VK-7, GEO-5 (c), VK2-5–VK2-7).** `warp(field, fromLevel, region)` applies
a displacement field to every vertex of level ≥ `fromLevel` inside the region. Shared boundaries are single vertices, so
the streets, blocks, plots and footprints under a brush move together (the property MFCG's warp had through shared
points), and vertices of level < `fromLevel` stay fixed — a street warp does not move the coast unless `fromLevel = 0`.
Smoothing of committed geometry is a `warp` whose field the smoother computes (§3.4), under the same rules. A move batch
**keeps nothing**: its `rederivesFrom` is the first stage that writes `fromLevel`, and `E_KEPT` governs insertion and
clearing only (§3.3); what a move may not displace is decided by the held set below, and what it may not break by the
whole-step validation. The rules, in the order the step applies them:
* **Held vertices (GEO-5 (c), VK2-7 (b)).** Before the step the kernel computes the **held set**: (1) every vertex of
  the geometry a locked or pinned entity's references resolve to (§7.2) — the level-n route vertices of every ring of
  its `FaceRef` faces, outer rings and holes, of its `ChainRef` and `EdgeSetRef` edges, and its `VertexRef` vertices —
  and of every finer face nested in its faces, because §7.2 makes every finer face under a locked or pinned entity a
  fixed input; (2) closed downwards by level: the two endpoints of every coarser edge that carries a held Steiner vertex
  are held too, so that edge does not move and its held vertex stays within 0.71 cm of its route; each round adds
  endpoints of a strictly coarser level, so the closure ends within four rounds. The field is zero at every held vertex
  and the dry run lists the held entities, so a locked plot, block or building keeps every corner although none of them
  carries a vertex role. Kernel-pinned vertices — gates, junctions, portals, the vertices smoothing, simplification and
  cutting keep — move with everything else unless held, because a warp is the user's explicit move and every entity
  names its vertices by role (§2.2 rule 5), so a moved gate is still its gate. A bridge's `deck_end` vertices are held
  unless `fromLevel = 0`, because S1 fixed the deck perpendicular to the flow (§2.7); with `fromLevel = 0` the banks and
  the deck move together.
* **Vertices on fixed routes slide (VK-7, VK2-6; Judgment J-K18).** A route is **fixed** when its edge is of level
  < `fromLevel` or both its endpoints are held. A vertex of level ≥ `fromLevel` that lies on a fixed route and is not
  held — a street ending on a shore, a bridgehead, a riverside junction (level-1 Steiner vertices on L0 edges under the
  default `fromLevel = 1`), a neighbour's footprint corner on a locked plot's line — moves only along that route: its
  displacement is projected onto the route's direction at the vertex, the projected point is kept at least `attractCm`
  from the route's endpoints and from every held vertex on it, and the vertex is seated at the lattice point the
  **placement rule** chooses for that point — (i) within 0.71 cm of the route, (ii) at least `minEdge` from the route
  edge's endpoints and from its neighbours on the route, (iii) clearance — never at the plain nearest lattice point, so
  the Steiner invariant of §3.10 holds after the move and a slide beside a vertex 25.0–25.7 cm from the route commits
  instead of rounding into it. A brush over a quay road therefore drags its junctions along the quay instead of halving
  itself to a no-op against the shore. Fixture (§13.1): a warp with `fromLevel = 1` over a street that ends on a shore
  moves the junction along the shore and commits.
* **Re-seats (VK2-6).** Each Steiner vertex on a moved coarser edge is re-seated at the lattice point the placement rule
  chooses for its projection onto the moved route, with (i)–(iii) read on the moved geometry — the rule J-K17 adopted
  for insertion, because two roundings stack here exactly as they do there. Measured
  (`docs/validation/bench/fixall_kernel_r3_checks.out` A): over 200 000 re-seats beside a vertex standing 25.0–25.7 cm
  from the route, plain nearest-point rounding breaks `minEdge` or clearance in 12.9 % of cases and the placement rule
  in none, moving the vertex at most 4.3 cm along the route and keeping it within 0.71 cm of it; in the constructive
  case — a kerb warped to run (0, 0)–(1 000, 9) past a vertex at (517, 30), 25.35 cm from it, with a plot-line end
  re-seated at that vertex's foot — plain rounding lands 24.999 cm from the vertex, fails validation and halves the
  step, while the placement rule lands 25.999 cm from it and the step commits. Where no lattice point within `attractCm`
  of the projection qualifies, the step fails validation and halves, like any other invalid step.
* **The `split` flag (VK2-5; Judgment J-K26).** The step clears the `split` flag of every vertex it moves, except a
  Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a fixed route: dissolving either
  still restores that edge exactly, because the edge is the segment between its endpoints (§2.2 rule 3).
* **Whole-step validation (GEO-10, GEO-35).** Each target is rounded to the lattice (re-seats and slides by the
  placement rule) and the **whole step** is validated: every edge incident to a moved vertex — including edges between
  two moved vertices and the edges at re-seated or sliding Steiner vertices — is at least `minEdge` long and is tested
  against the index for crossings; every unmoved vertex is tested against the triangles swept by the moved edges; no two
  vertices may land on one lattice point; no held vertex moved; and the clearance invariant holds. On failure the step's
  strength is halved globally — deterministic, at most 8 halvings, after which the step is a reported no-op. The commit
  record lists every moved vertex (§3.3), and §3.10's `minEdge` row checks the new and moved edges it names, so a
  `pinch` or `swirl` that would shorten an edge to 10 cm, or stack two vertices on one lattice point, halves instead of
  committing.

Faces that a committed step leaves below a class floor are re-derived locally, each by its own batch whose
`rederivesFrom` is the stage that makes that face, and logged. The named brushes of §7.1 are displacement fields
supplied by the edit layer, and a `moveVertex` is a field that displaces one vertex, found by `resolveVertexAt` (§3.4);
a whole-map rotation is a view transform, never a vertex operation, because it would re-snap every vertex in the arena.

*Judgment J-K2.* Chose attraction at `minEdge` + 1 cm — existing geometry wins, an incoming vertex moves at most √2 · 26
≈ 36.8 cm (onto an edge's endpoint from beside the edge) — over a 5 cm weld plus `minEdge` rejection, because the dead
band between the two sent about one cut in ten to the failure ladder and left mandatory chains (walls, coasts, plot
lines) with no repair; the moved distance is a fraction of the narrowest way (an alley's 2 m, §4.6) and of the minimum
plot width (2.5 m), and both references snap rather than reject (FTG's "improved intersection snapping", MFCG 2017's
junction merge).

*Judgment J-K17 (GEO-3; extended to moves for VK2-6).* Chose to move a vertex whose foot falls within `attractCm` of an
edge's endpoint onto that endpoint, and to place every new vertex on an existing edge — and every vertex a move re-seats
onto a route or slides along one — by the constrained placement rule, over plain nearest-point rounding of feet,
crossings, re-seats and slides, because two roundings can stack — a vertex left 25.3 cm from an edge by one rounding,
then a crossing or a re-seat rounded 0.7 cm towards it — and plain rounding then creates edges the hard invariant
rejects (1.34 % of edge attractions, 0.7 % of such crossings and 12.9 % of such re-seats, measured), which would make a
mandatory chain fail for a precision reason and a warp halve to a no-op; the constrained point moved by under a
centimetre for insertions and at most 4.3 cm along the route for re-seats in every measured case.

*Judgment J-K18 (VK-7, VK2-6, VK2-7).* Chose to slide a vertex along the fixed route it lies on — an edge of level
< `fromLevel`, or one whose endpoints are held — over holding it (the whole step then halves to a no-op near every shore
junction, an editability regression against MFCG's warp) and over freeing it (it would leave the shore and break the
Steiner invariant), because sliding keeps the shore exact and gives the drag the user expects at quays, bridgeheads and
riverbanks; the slid vertex is seated by the placement rule for the reason of J-K17.

*Judgment J-K26 (VK2-5).* Chose to clear the `split` flag of a moved vertex except when the move re-seats it onto, or
slides it along, the edge it split, over clearing it on every move (a re-seated Steiner vertex left with degree 2 would
never dissolve, and the next derivation would attract onto a vertex a derivation on the clean edge would not have) and
over never clearing it (a warped same-level T-junction would dissolve once its lane is removed and straighten the warped
spine), because the flag's one meaning — "dissolving me restores the edge I split exactly" — is true after a re-seat or
a slide and false after any other move; promotion clears it for the same reason.

*Judgment J-K27 (VK2-7).* Chose to let a move batch keep nothing and to decide what it may not displace by a held set —
every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed downwards over the
endpoints of coarser edges that carry a held Steiner vertex — over applying the kept-content rule to moves (every warp
over finished fabric would be `E_KEPT`) and over holding only role-carrying vertices (plots, blocks and buildings carry
no vertex roles, so a locked plot would be reshaped against §7.2), because the held set is exactly §7.2's promise
("keeps its existence and position") expressed on vertices, computed once per step in O(held geometry).

=== REPLACE §3.10 Kernel invariants — what is checked, when, and at what cost ===

### 3.10 Kernel invariants — what is checked, when, and at what cost

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r3); earlier revisions fixall/draft-kernel-r2, fixall/integrate-r2

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex ≥ `minEdge` from every edge outside its one-ring | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point: no two vertices share a lattice point | hard | batch-local | by construction for insertions (coincidence is attraction); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| every Steiner vertex lies within 0.71 cm of its coarser edge's level-n route | hard | batch-local | touched, re-seated and sliding Steiner vertices |
| held vertices: no vertex of a `warp` or smoothing step's held set moved (§3.6) | hard | batch-local | the commit record's `moved` list against the held set |
| prepared contacts: a clear-region batch met finer geometry only at its `KernelTx.prepared` vertices and the finer stretches between them, and promoted exactly those (§3.3, §3.6) | hard | batch-local | the commit record's `promoted` and `promotedEdges` against the resolved prepared set |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` — nor, in a clear-region batch, any finer face outside the region — was cleared, crossed, split or re-owned (moves keep nothing, §3.3) | hard | batch-local | the stage ranks and region test of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role (attach, anchor, weld, deck end, gate opening) finds exactly one vertex or edge set per ordinal, every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| frozen base complete: at the pool's freeze every level's dynamic grid and tombstone set is empty — every item lives in a static partition the copy carries (§3.3 pool step 1) | hard | at the freeze | two counts per level, O(levels) |
| index levels: a batch wrote no index of a level coarser than its own, except the promotions it made (§3.3) | hard | batch-local | the commit record's index writes against its level and its `promoted` / `promotedEdges` |
| pool scope: no district overlay wrote outside its district's face set; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| face corners ≥ `minFaceAngle` | soft for mandatory chains (`W_ACUTE_CORNER`), hard for optional chains | batch-local | touched corners |
| Euler characteristic per level (V − E + F = 1 + components) | hard | CI (B-FUZZ, B-EDIT) | whole arena |

These rows are the kernel's part of the §5.3 suite. Batch-local checks read only the commit record's faces, its moved
and promoted vertices, its promoted edges and their one-ring, so a batch costs O(touched), never O(model) (SCL-1);
whole-arena checks run at stage end, at save or in CI; the freeze check runs once per generation and the pool check
once per merge in O(overlay size). Class floors (minimum width, area
and angle per face class) are the stages' invariants and are always stated in width and area, never in `minEdge`
(GEO-35).


## Part 3 — Cross-area requests

Each request names the owning area, the section, the item it serves and the change. Text in quotation marks is ready to
paste; the owner may reword it without changing the mechanism. Where a sibling round-3 lane is already rewriting the
same passage (VP2-1 in §4.11, VD2-1 in §7.3 (b), the rendering lane's §12.3 and §12.8), the request states the kernel
contract that passage must meet, so the integrator can merge the two.

### To PIPELINE (§4)

| # | section | serves | request |
|---|---|---|---|
| X-P1 | §4.1 transactions bullet, batch table, pool bullet | VK2-1, VK2-9 | (a) "Static spatial indexes are rebuilt at stage end, never per batch (§3.3, SCL-2);" → "Static spatial indexes are rebuilt at stage end, never per batch, and S10's eager step (0) ends like a stage: it rebuilds the L3 partitions it touched before the pool's freeze, so the frozen copy carries the static partitions of L0–L3 and every dynamic grid is empty at the freeze (§3.3 pool step 1, §3.10; VK2-1);". (b) Batch table, S10 row: after "(§4.7, §3.3; J-I9)" add "— ending with the rebuild of the L3 static partitions it touched, before the freeze (VK2-1)". (c) Pool bullet: "each on its own copy-on-write overlay over a read-only copy of the arena frozen after those two eager steps," → "each on its own copy-on-write overlay over a read-only copy of the arena frozen after those two eager steps — its typed arrays and lookup tables and its L0–L3 static index partitions, with every dynamic grid empty (§3.3 step 1) —". |
| X-P2 | §4.7 S10 (0) paragraph | VK2-1 | "(§3.3 pool steps 1 and 3; J-I9; ≈ 3 ms at CITY with the margin bands below, §12.4)" → "(§3.3 pool steps 1 and 3; J-I9; ≈ 3 ms at CITY with the margin bands below, plus ≈ 2.3 ms to rebuild the L3 static partitions it touched before the freeze, so that a pooled plot line finds the band's inner edge through the index, §3.3 pool step 1, §12.4; VK2-1)". |
| X-P3 | §4.11 carve, the batch sentence | VK2-3 (with VP2-1) | Replace "The carve runs as a declared sequence of single-level batches (§3.3): (1) … (4) S9–S11 re-derive the cleared cells by tree scoping (§7.3)." with: "The carve runs as a declared sequence of single-level batches sharing one clear region (§3.3 clear regions): (1) an L1 **preparation** batch clears the finer content of the faces meeting the region, removes the cut stretches, re-routes each kept way's stretch between its nearest junctions (§7.3's S4 local operator, the channel polygon read as data) so that it crosses the future channel perpendicularly as **one straight L1 edge** between two bank vertices carrying `('deck_end', bridge, 0 \| 1)`, splits every kept landing or quay where it will meet the new bank, carrying `('anchor', way, k)`, and splits every other L1 edge the channel's banks will cross (a district or reservation boundary, the settlement perimeter, a wall strip's setback line) at its two bank points, carrying `('anchor', its chain's entity, k)`, with the stretch between them removed; (2) the L0 batch, with `KernelTx.prepared` = those `deck_end` and `anchor` vertices, inserts the channel ring — which attracts onto and promotes exactly them (§3.6 candidate (c)) — and each kept way's **L0 deck edge** between its two promoted bank vertices, which shares and promotes the way's straight L1 edge there, so the deck carries `deck` and `way` and the way stays one chain; any other contact with L1 geometry is `E_LEVEL` and returns to the dry run; (3) an L1 batch inserts the access re-routes the rule adds for cut ways; (4) S9–S11 re-derive the cleared faces by tree scoping (§7.3). A way cut back to its bank setback leaves no contact with the channel and needs no prepared vertex." The clear region itself is VP2-1's (the channel ⊕ (`attractCm` + setback) united with the L1 cells the way rule touches); the kernel accepts any region that contains the channel ⊕ (`attractCm` + setback). |
| X-P4 | §4.1 batch table, S5 row; §4.4 outer moat sentence if it restates the batches | VK2-3 | "then an outer moat's carve batches (L1: deck bank vertices on the arterials; L0: the channel, §4.11)" → "then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices; L0: the channel and its deck edges, with those vertices as `KernelTx.prepared`, §3.3, §4.11)". |

### To DETERMINISM (§2.9, §5–§7)

| # | section | serves | request |
|---|---|---|---|
| X-D1 | §7.3 (b), the L0 step of VD2-1's reordered operator | VK2-3 (with VD2-1) | The step that removes the old reach's shores and inserts the new ones: "…as a coarse insertion with the clear region and `KernelTx.prepared` = the `deck_end` vertices the preceding L1 batch placed on every arterial and sole connection the new channel meets (each crossing made one straight L1 edge between them) and the `anchor` vertices of any kept landing or quay; each re-sited deck is inserted as an L0 edge that shares and promotes that straight L1 edge (§3.3 clear regions, §3.6 candidate (c)); any other contact with finer geometry is `E_LEVEL` and returns to the dry run". |
| X-D2 | §7.4 *Application* bullet | VK2-3 | "the former birth levels of the vertices it promoted (§2.2 rule 3)" → "the former birth levels of the vertices and edges it promoted (§2.2 rule 3; `CommitRecord.promoted` and `promotedEdges`)". |
| X-D3 | §6.2, the per-level digest paragraph | VK2-3, VK2-4 | (a) "Per-level digests read each vertex's *current* birth level, so a promotion (§2.2 rule 3) moves a vertex into the coarser level's digest from that commit on" → "Per-level digests read each vertex's and each edge's *current* birth level, so a promotion (§2.2 rule 3) moves a vertex — or a prepared stretch's edges (§3.6 candidate (c)) — into the coarser level's digest from that commit on". (b) "Coordinates enter in canonical order (a ring from its lowest-then-leftmost vertex)" → "Coordinates enter in canonical order (a level-n ring from its lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's key, so deriving a finer level never re-orders a coarser digest's input)". |
| X-D4 | §7.2 *Protection* bullet | VK2-7 (b) | Append: "Under a `warp` or smoothing step the kernel holds every route vertex of a locked or pinned entity's geometry and of every finer face under it, closed over the endpoints of coarser edges that carry a held Steiner vertex (§3.6), so 'keeps its position' holds for plots, blocks and buildings, which carry no vertex roles; the dry run lists the held entities." |
| X-D5 | §7.4 lifecycle table, the "delete / merge / split / join / convert" row (and §7.1's `split` / `join` wording if it restates it) | VK2-8 | Add: "a split or join of a chain that carries a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey`, which gives each part a cut knot carrying the sampled value and drops a join knot only where the joined profile is unchanged (§2.2 rule 5, §3.4); the event writes both records' returned profiles, and its undo record restores both". |
| X-D6 | §7.3 item 2 | VK2-2 (determinism's own item) | For one wording in both places: the kernel's §3.3 now reads "A regenerate whose scope holds wall-strip faces, or faces bordering the settlement perimeter or a reservation boundary two districts share, re-runs S10's step (0) for **its own side's** parts after its S8 and S9 — `bandUnion` restricted to the scope's faces, its cross edges attracted onto the vertices the other side's parts already placed on the shared L1 edge (§7.3; VK2-2) — so wall bands and margin bands are rebuilt with the fabric, never kept and never lost." |

### To RENDERING (§12)

| # | section | serves | request |
|---|---|---|---|
| X-R1 | §12.4 rows and totals; §12.3 table | VK2-1, VK2-9 | (a) S10 (0) row, mechanism: append "; then the rebuild of the L3 static partitions it touched, so the frozen copy holds every item in a static partition (≈ 9 000 items at CITY; build rate measured, `docs/validation/bench/fixall_kernel_r3_bench.out` A; VK2-1)"; p50 "3 ms" → "5 ms". (b) Merge row: "the arena frozen after S10a and S10's step (0) and copied once to each pool worker (≈ 10 MB at CITY, ≈ 1 ms per copy)" → "the arena frozen after S10a and S10's step (0) — its typed arrays and lookup tables and its L0–L3 static partitions, every dynamic grid empty — and copied once to each pool worker (≈ 12 MB at CITY, ≈ 1.1 ms per copy, measured; no per-worker table rebuild, VK2-9)"; p50 "11 ms (8 merge + 3 copies)" unchanged (3 × 1.1 ms rounds to 3). (c) Critical path "≈ 251 ms p50" → "≈ 253 ms p50"; below the table: single-worker "≈ 332 ms" → "≈ 334 ms"; METROPOLIS "≈ 600 ms p50 with the pool, ≈ 795 ms single-worker" → "≈ 606 ms …, ≈ 801 ms …"; TOWN "≈ 75 ms" → "≈ 76 ms"; the closing parenthesis gains "round 3 added step (0)'s L3 partition rebuild before the freeze (+2.3 ms at CITY, +5.8 ms at METROPOLIS, ≈ +1 ms at TOWN; VK2-1)". (d) §12.3's table, p50 column: TOWN 75 → 76, CITY 251 → 253, METROPOLIS 600 → 606; the p95 bars (100 / 300 / 800 ms) and the cost laws are unchanged. |
| X-R2 | §12.8 | VK2-9 | "one kernel arena per layer (≈ 10 MB at CITY, §2.2; PLAUSIBLE until M0) plus one frozen arena copy per pool worker (≈ 10 MB each at CITY, ≈ 25 MB at METROPOLIS)" → "one kernel arena per layer (≈ 12 MB at CITY with its typed lookup tables, §2.2; PLAUSIBLE until M0) plus one frozen arena copy per pool worker (≈ 12 MB each at CITY, ≈ 30 MB at METROPOLIS)"; "(≈ 30 MB at CITY with three workers)" → "(≈ 36 MB at CITY with three workers; `Map`-based tables would have cost each worker more heap and ≈ 10–20 ms of rebuild, VK2-9)". The CITY line (≤ 110 MB) and its pre-decided fallback are unchanged. |

### To SCOPE (§13, §16, the judgment-calls table)

| # | section | serves | request |
|---|---|---|---|
| X-S1 | §13.1 constructive degeneracies, the "attraction, move and kept-content cases" bullet | VK2-1, VK2-3–VK2-9 | (a) Add "a pooled district beside the settlement perimeter commits plot lines that end on the backland part's inner edge with 0 unresolved crossings at pool sizes 0 and 3, and the freeze finds every dynamic grid and tombstone set empty (§3.3 pool step 1)". (b) Replace "a carve whose clear region leaves every face outside it byte-identical, and a carve chain that touches a finer edge away from its prepared vertices (`E_KEPT`; §3.3 clear regions)" with "a carve whose clear region leaves every face outside it byte-identical and whose L0 channel attracts onto exactly its prepared vertices (each promoted, no other finer vertex promoted, each deck an L0 edge carrying `deck` and `way`), and a carve chain that touches a finer edge away from its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside; §3.3 clear regions)". (c) Add "an L3 query in a block before and after S11 derives L4 there — two plots sharing their lowest-leftmost vertex with an L4 vertex on their shared edge — returns its results in the same order (`fixall_kernel_r3_checks.out` C)". (d) Add "a `warp` over a spine carrying a same-level T-junction, then its lane removed (the junction stays as a shape vertex of the warped spine); a `warp` that re-seats a Steiner vertex, then `clearFiner` (the vertex dissolves and the coarser edge is restored exactly)". (e) Add "a warp moving a kerb beside a vertex 25.3 cm from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated vertex placed by the placement rule (`fixall_kernel_r3_checks.out` A)". (f) Add "a `warp` over a locked plot and over a pinned building (every corner held; a neighbour's footprint corner on the locked plot's line slides) and a `warp` with `fromLevel = 1` over finished fabric (0 `E_KEPT`)". (g) Add "a way split between two width knots (every sampled half-width within 10⁻⁹ cm of its value before the split), then re-joined (the original profile bit for bit)". (h) Add "the frozen copy sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the message". |
| X-S2 | Judgment calls table | VK2-1, VK2-3–VK2-9 | Add rows (full reasoning in the named sections): **J-K22** "Chose typed-array open-addressing tables for the role heads and owner heads over `Map`s, because the pool's frozen copy is then ArrayBuffers only, while rebuilding `Map`s costs each pool worker ≈ 10–20 ms at CITY (measured) on the critical path (VK2-9) (§2.2)." **J-K23** "Chose cut knots carrying the exact sampled value over re-keying the existing knots alone (a width moved by up to 8.47 m, measured) and over rational cut knots, because the exact double stays within 10⁻¹² cm of the original sample while a rational form needs BigInt arithmetic in every kerb sample (VK2-8) (§2.2)." **J-K24** "Chose to name a coarse insertion's permitted contacts explicitly — `KernelTx.prepared` by role, with the finer stretch between two of them shared and promoted — over attracting onto any nearby finer vertex and over leaving a gap in each kept way for a new deck edge, because unprepared contacts are then refused (`E_LEVEL`) and every way stays one chain through the edit (VK2-3) (§3.3, §3.6)." **J-K25** "Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, so the frozen copy carries L0–L3 and every dynamic grid is empty at the freeze (asserted), over shipping the dynamic grid or indexing in each worker, because one checkable precondition keeps any pooled stage from querying an index that misses eager content; ≈ 2.3 ms at CITY (VK2-1) (§3.3)." **J-K26** "Chose to clear the `split` flag on a move except a re-seat onto, or a slide along, the edge the vertex split (and on promotion), over clearing it on every move or never, because the flag then means exactly 'dissolving me restores my edge' (VK2-5) (§2.2, §3.6)." **J-K27** "Chose to let a move keep nothing and to hold every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed over coarser edges carrying a held Steiner vertex, over applying `E_KEPT` to moves and over holding only role-carrying vertices, because that is §7.2's promise expressed on vertices (VK2-7) (§3.3, §3.6)." Amend: **J-K6** add "…sorted by a total canonical key per item kind read on the query's level-n route, so a finer level's derivation cannot re-order a coarser query (VK2-4)"; **J-K14** add "…; a move keeps nothing (VK2-7)"; **J-K17** add "…and every re-seated or sliding vertex of a move (12.9 % → 0 measured failures, VK2-6)"; **J-K18** add "…a route whose endpoints are held is fixed too, and the slid vertex is seated by the placement rule (VK2-6, VK2-7)"; **J-I10** add "…and meets finer geometry only at the vertices named in `KernelTx.prepared` and the stretches between them, which it promotes (VK2-3)"; **J-I11** "(created on an existing edge and unmoved since)" → "(created on an existing edge; cleared by promotion and by any move except a re-seat onto, or a slide along, the edge it split — J-K26)". |
| X-S3 | §16 M3a exit criterion (the carve clause) | VK2-3 | "…byte-identical, no contact outside the prepared vertices)" → "…byte-identical, attraction onto exactly the prepared vertices and no other contact)". |

## Part 4 — CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED** (executed, outputs committed beside the scripts): the build rate of the packed index on band-shaped items
and the rebuild times for the stated item counts (2.29 ms / 5.83 ms); the per-worker cost of rebuilding the two heads as
`Map`s (≈ 10 / 20 / 62 ms) against the typed tables (built once in 2.4 / 3.9 / 11.6 ms, identical answers); the copy cost
of a 10 MB and a 12 MB frozen arena (1.01 / 1.09 ms); plain rounding against the placement rule for re-seats and slides
(12.93 % → 0 failures, largest move 4.27 cm, the 25.35 cm constructive fixture); the split and re-join of width profiles
(8.47 m → 6.8 × 10⁻¹³ cm; 20 000 / 20 000 bit-exact re-joins); the full-ring key reversing two L3 faces once an L4 vertex
lands on their shared edge, and the route key not. Every quoted "before" text in Part 3 was checked against the current
`docs/ARCHITECTURE.md`. **PLAUSIBLE** (reasoned, not executed): step (0)'s L3 item count at CITY (≈ 9 000; our count
of perimeter and wall parts), hence the ≈ 2.3 ms figure and the +2 ms on the critical path; the ≈ 2 MB of lookup
tables (key counts estimated from the entity counts of §12); that edge promotion leaves nesting, the L0 re-walk and the
per-level digests consistent (argued in §3.3 and §3.6, first exercised by M3a's carve fixtures); that a finer split can
always keep the route edge's handle pair at its lower end (an arena-implementation rule, first exercised by M0's
kernel fuzzing).

**Re-check first:**
1. **The index-contents rule added for VK2-1** (§3.3: each level's index holds only items born at that level, whole
   route edges with boxes padded by the hot pixel, a split keeping the handle pair). The verifier's required change
   assumed step (0) touches only the L3 index; the old text did not say what an index holds, and if a Steiner split had
   rewritten the L1 or L2 index, the new freeze assertion would fire on every run. Check it against the tombstone and
   slot-reuse sentences, the level-n query expansion of VK2-4, and §3.9's load rebuild.
2. **Edge promotion (VK2-3).** A new kernel mechanism: a clear-region batch shares and promotes the finer stretch
   between two prepared vertices (the deck under its way). Check it with §6.2's digests (X-D3), §7.4's undo (X-D2), the
   L0 re-walk and nesting (§3.10), and against the pipeline's round-3 §4.11 (VP2-1, X-P3) and determinism's §7.3 (b)
   (VD2-1, X-D1), which must make each kept way's crossing one straight L1 edge in their preparation batch.
3. **Cut knots as exact doubles (VK2-8; J-K23).** The one non-integer knot value in a model whose lengths are integer
   centimetres (§2.1): deterministic on every engine, within 10⁻¹² cm of the original sample, but not bit-exact on 8 %
   of samples. A stricter reviewer may prefer the bit-exact rational form J-K23 rejected on cost.

## Fable review (2026-09-27) — A-fixall/draft-kernel-r3

Reviewer: Fable 5.1, lane fable-review/main/kernel (docs/fable-review/main/kernel.md). **Verdict: CORRECTED.** Six of the
nine mechanisms stand as drafted (VK2-1, VK2-4, VK2-6, VK2-8 with J-K23, VK2-9 with J-K22, VP2-9); both scripts re-run
(checks byte-identical; bench within noise). Three did not survive as drafted and were corrected later — recorded here so
the row is read right: (a) VK2-3's edge promotion (an L0 deck edge sharing and promoting the way's L1 edge) was replaced
at integration C-1 by J-I12's form — the deck is the kept way's own L1 edge between its promoted bank vertices (§2.2 rule
7, §3.3 rule 3); (b) J-K26 as drafted cleared the `split` flag on every promotion, which round 4 (J-K28) reversed for a
promotion onto the vertex's own route because demotion needs the flag; (c) the per-level list of first writers for a
move's `rederivesFrom` ("S3 for L1 …") was replaced by J-K33 (the first stage of §4.1's order) in round 4. J-K23's exact
double for a cut knot is the right call: the value is an attribute in centimetres, not a coordinate, computed with
+ − × ÷ √ only.
