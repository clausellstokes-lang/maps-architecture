# blocks-model — the MODEL part (§2) of amendments b. Generated whole by scratchpad/model/build.py from asserted
# substitutions on the live docs/ARCHITECTURE.md (sha256 1dbfd9d4f39723ee…). Blocks per the BLOCK PROTOCOL; text before the first
# "=== " line is ignored. Seat amendments-b/amend-model (Fable, 2026-09-27). PENDING FABLE REVIEW banner: none inside any block.

=== APPEND TO SECTION ### 2.1 Layers, coordinates, units, ids ===
**The underground arena's content (item 12; II.7).** The `underground` arena holds the sewer network's tunnels and, along
its navigable runs, the underground neighbourhoods' blocks, plots and buildings (II.7.3) — ordinary records on the `under/`
address prefix, populated only when the owner-staged network and underground stages run; their level mapping is §2.2 rule
1's, their depth is `elevationCm` (negative below the ground datum, II.7.3), and whether the layer exists at a rung is
`Features.sewers` (§2.9, II.7.4), read from the model, never from a layer's visibility (item 14).

=== REPLACE ### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===
### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground or the underground arena; parts 1–3 = one arena per sky island (§4.2, II.1)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey; readonly frame: Frame /* §3.2 (9) */; readonly lattice: LatticeSpec;
  vertices:  { x: Int32Array; y: Int32Array; out: Int32Array /* one outgoing half-edge */; level: Uint8Array /* birth level; lowered by promotion, raised by demotion (rule 3) */;
               flags: Uint8Array /* pinned (set only by `pinVertices`, §3.4; cleared when a batch strips the vertex's last vertex role row other than knot rows, rule 3 (b)) | steiner | split (rule 3; clearing under moves: §3.6) | free slot */ };
  halfEdges: { origin: Int32Array; next: Int32Array; prev: Int32Array;    // twin(h) = h ^ 1: half-edges are allocated in pairs
               level: Uint8Array /* per pair (h >> 1): the edge's birth level — always the lowest level among its role rows (rule 3) */ };
  roles: RoleTable;                      // (role, entity, level, ordinal) sets on edge pairs and vertices, with a reverse index (rule 7)
  faces: [LevelFaces, LevelFaces, LevelFaces, LevelFaces, LevelFaces];
  index: [LevelIndex, LevelIndex, LevelIndex, LevelIndex, LevelIndex];     // §3.3
  indexHome: { vertex: Int16Array; edge: Int16Array /* per edge pair */; face: [Int16Array, Int16Array, Int16Array, Int16Array, Int16Array] /* per level */ };   // per slot: the static index partition (numbered across the levels) whose build holds the item, −1 if none; written by every build, read to tombstone the item (§3.3)
  version: number;                       // every committed batch bumps it
}
interface LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500; rangeCm: 8_388_608 /* 2^23 */ }   // the lattice constants; their meaning in §3.2 (2) and their classes in §3.10
interface LevelFaces { outer: Int32Array; holesStart: Int32Array; holes: Int32Array; kind: Uint16Array;
  owner: Int32Array /* interned entity handle */; parent: Int32Array /* the level − 1 face containing it; −1 at L0 */;
  stage: Uint8Array /* rank (§4.1 order) of the stage whose batch created or last re-owned the face: the kept-content rule (§3.3) */;
  nextOfOwner: Int32Array; ownerHead: OwnerTable /* owner handle → first face of that owner at this level */ }
interface RoleTable { edgeFirst: Int32Array; vertexFirst: Int32Array /* first slot of each set, −1 if none */;
  kind: Uint16Array /* interned RoleName */; entity: Int32Array; level: Uint8Array /* level of the batch that added it */;
  ordinal: Uint16Array /* 0 unless the registry declares the role indexed (rule 7) */;
  nextInSet: Int32Array; nextSameKey: Int32Array; head: RoleHeadTable /* (role, entity, ordinal) → first slot */ }
// RoleHeadTable and OwnerTable are typed-array hash tables (J-K22): open addressing, linear probing, capacity a power of two kept
// at load ≤ 0.5 (doubled and re-inserted in slot order when exceeded), a fixed integer hash of the key words, deletion by backward
// shift (no tombstones). Lookups only — nothing iterates a table — so its layout never reaches an output.
interface RoleHeadTable { k0: Int32Array /* entity handle */; k1: Int32Array /* role << 16 | ordinal */; first: Int32Array /* first role-row slot; −1 = empty */; count: number }
interface OwnerTable    { owner: Int32Array /* interned entity handle */; head: Int32Array /* first FaceId; −1 = empty */; count: number }
interface LevelIndex { static: PackedIndex[] /* partitions: one per arena at L0–L1; one per district + one outside districts at L2–L4 */; dynamic: UniformGrid;
  tombstones: Set<number>[] /* one set per static partition: the keys (kind · 2³² + slot; kind = vertex, route edge or face) of the items §3.3 has tombstoned in it since its build; they filter that partition's hits only; when a set empties is §3.3's */ }
type RoleRow = { role: RoleName; entity: Id; ordinal?: number };     // a row a writer adds; its level is always the adding batch's (rules 3, 7); an `anchor` contact name is given without an ordinal, which the kernel allocates (§3.3 rule 2)
type RoleKey = { role: RoleName; entity: Id; ordinal: number };      // a row's identity, without its level
// The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry (rule 5):
type FaceRef    = { owner: Id; level: Level };                       // view: the faces whose owner at that level is the entity (district, block, corridor, junction, plot, water body …)
type ChainRef   = { role: RoleName; entity: Id };                    // view: the ordered edge chain carrying (role, entity) — a way's spine, a wall trace, a tunnel
type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };  // view: the unordered edges carrying (role, entity[, ordinal]) — a plot's frontage, access, party walls, one gate opening
type VertexRef  = { role: RoleName; entity: Id; ordinal?: number };  // view: the vertex carrying (role, entity[, ordinal]) — a junction, a tower, a gate, an entrance, a portal, a deck end, a water gate's bank end, a weld end
type StretchRef = { chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint };   // view: the chain's edges between two of its vertices; batch-local, never stored in an entity record (rule 5)
type LatticePoint = { x: Cm; y: Cm };   // a position in an arena; which records may hold a vertex's position is rule 5's
interface VertexSig { v: RoleKey[] /* the vertex's own (role, entity, ordinal) rows, sorted */; e: RoleKey[] /* the structural (role, entity) rows of its incident edges, sorted, deduplicated */ }
interface ChainProfile<T extends number | string = number> {   // a value that varies along an entity's chain (rule 5): never an array indexed by the chain's vertices
  knotRole: RoleName /* the registry's knot role for this attribute: width_knot, base_knot, invert_knot, bank_knot, shore_class_knot … */;
  values: T[] /* values[i] belongs to the chain vertex carrying (knotRole, entity, i): an authored value in the attribute's unit, or a cut knot's exact sample (rule 5) */; interp: 'linear' | 'step' }
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.**
   * **L0** faces: land components, sea, lakes, river reaches, islets, ponds, moats — land and water only. Terrain
     contours and drainage lines are raster products (§2.3), never plat edges or faces, so no L1 face straddles two L0
     parents and no drainage antenna enters a face ring. The arena's outer ring — the frame plus its context margin,
     §3.2 (9) — is one L0 chain carrying the structural `margin` role on the arena's `Terrain` entity, written first by
     S1 before any water, so every L0 face has a boundary; a sea or river that reaches it shares its stretch (§4.1).
   * **L1** faces: coarse blocks (the regions between way *spines*) and the wall strips S7 cuts off beside each trace
     (§4.8). L1 edges: way spines (centrelines), wall lines, the wall strips' setback and glacis lines (role `setback`),
     shorelines inherited from L0, the map border (the frame rectangle, role `border` on the arena's `Terrain` entity,
     written first by S3's L1 batch after S3's L0 batch, §4.1), the settlement perimeter (a `district_bound` chain,
     §4.5) and district boundaries, which are always L1 edges — a spine, a wall line, a reservation boundary, a shore or
     the perimeter — so every finer face lies inside one district.
   * **L2** refines each L1 face into one half-corridor strip along each of its spine edges (the road reserve on that
     face's side, width = the way's half-width), one junction wedge at each of its corners, and the built block(s) that
     remain, built by `corridorUnion` (§3.7), so every L2 face nests in exactly one L1 face. A `Corridor` entity is the
     `FaceRef` of the half-corridor faces on both sides of its spine; a `Junction` the `FaceRef` of the wedges around its
     vertex; a `Square` is a corridor face of class `square` (G-R11).
   * **L3** faces: plots, courts, yards, greens, alleys-as-faces and **passage faces** (a covered alley-as-face under a front
     building's wing — §2.5's `Passage` record, cut by S10 on §4.6's reach; item 30); the wall-band, setback and glacis parts (per side of
     the L1 wall chain, built by `bandUnion` inside the wall strips after S9, §3.7, §4.8; `Enceinte.band` is the
     `FaceRef` of both sides); the margin-band parts along the settlement perimeter and along the other shared non-spine
     district boundaries (§3.3 pool step 3); and the hinterland's furlongs, lots, woods, driveways and trails, whose
     boundaries are L3 edges carrying `field_bound` (a hedgerow is the `green_line` role on such an edge; a track along
     one is the same edge with both roles, §4.9).
   * **L4** faces: building footprints (and wing sub-faces when stage 3 exists) plus yard sub-areas.

   Districts, blocks, merged plots and water bodies are multi-face `FaceRef`s, never single face ids.

   **The underground arena's levels (item 12; II.7).** The same five views serve the `underground` arena with their own
   meanings: **L0** one land face — the rock — bounded by the arena's outer ring, a chain carrying the structural `margin` role
   on the underground pseudo-district's record (II.7.3), written by the network stage before any tunnel as S1 writes the
   ground's ring; **L1** the tunnel centrelines (`tunnel` chains, never `way`: the underground has no street skeleton, II.7.3's
   U2); **L2** the tunnel bands — bore plus wall (`Tunnel.widthCm`, the profile row's wall thickness, II.7.2) — as the
   half-corridor strips and junction wedges `corridorUnion` builds from them (§3.7; the band's outer ring is the tunnel's
   external wall, the kerb every frontage plot's lines end on), and the rock between the bands as the underground's built
   blocks; **L3** the frontage plots, each fronting exactly one navigable, open tunnel run (II.7.3's U1), and residue typed
   `rock`; **L4** the buildings, flush against the kerb (U3). The underground and the ground never share topology (rule 2):
   every surface constraint the underground reads is a query on the ground's key (§3.4; J-A12.32).
2. **One arena per `PlatKey`; the five levels are views of it (J-K1).** All levels live in one vertex-and-half-edge
   arena and every edge carries its birth level; the level-n subdivision is the set of edges of level ≤ n, so each
   level-n face is exactly the union of the level-(n+1) faces inside it. Nesting therefore holds by construction and is
   checked by index (§3.10). A face walk at level n follows `next` and, around each vertex, skips edges of level > n
   (O(degree)). A level's face records inside a parent face are materialised when the first edge of that level is
   inserted there; until then the parent face is its own child. A shared boundary is one edge seen by every finer level
   — a kerb, a plot line, a party wall — so a warp moves it once and two row houses share literally one wall edge. The
   ground, the underground and each sky island are separate arenas and never share topology: sky and underground
   geometry never cut ground faces, and cross-arena links (an island's shadow footprint, a sewer outfall) are entity ids.
3. **Finer levels never move coarser geometry, with one bounded exception.** A level-n batch creates vertices and edges
   of level n only (`E_LEVEL` otherwise; clearing finer content, promotion, demotion and `warp` moves excepted, §3.3,
   §3.6). Where it needs a vertex on a coarser edge (a plot line ending on a kerb, a footprint corner on a plot line, a
   band's cross edge on its wall), `splitThrough` inserts a level-n **Steiner vertex** at the lattice point §3.6's
   placement rule chooses near the exact foot and routes the coarser edge through it, moving the route there by at most
   half a lattice diagonal, 0.71 cm (61 % of 5–60 m edges have no interior lattice point, GEO-1). The coarser edge's
   endpoints, birth level, faces and own-level roles never change; a finer batch may add roles of its own level (a
   plot's frontage on a kerb). The **level-n route** of an edge is the chain through its vertices of level ≤ n; every
   level-n query, digest (§6.2) and stage reads it, so no level-n result depends on whether or when a finer level was
   derived — lazy per-district stages included. A same-level split, a promotion, a demotion or a dissolution adds a
   vertex to a route or removes one and moves nothing (J-K32), so the hot pixel bounds placement, not a standing
   distance (§3.6's placement rule, §3.10), and the index boxes each route edge over the vertices on its run (§3.3).

   **Promotion (J-K11).** A coarser batch that ends a chain on a route already carrying a finer vertex kept beside it (a
   neighbour's plot-line end where II.1 (3)'s neighbour step lands its `corridor_split` edge; a close-up's kept fabric
   beside a new L1 junction) attracts onto that vertex and **promotes** it: its birth level drops to the batch's level,
   adding it to the coarser route (it lies within the hot pixel of the route it was placed on, §3.6) without moving it
   or touching the finer faces beside it. It keeps its `split` flag, since removing the promoting chain restores the
   edge it split (demotion, below). The commit record lists every promotion and the undo record restores the birth
   levels (§3.6). A coarse batch inserted into finished fabric (a carve, a re-carved reach, an outer moat) clears finer
   content only inside its declared clear region and meets finer geometry only at the vertices prepared for that
   contact, which it promotes (§3.3's clear-region rules); a kept way's straight L1 edge between its two promoted bank
   vertices becomes the deck span over the new water (rule 7; J-I12).

   **Dissolution.** `clearFiner` (regeneration, undo) and `removeEdges` remove edges and roles, then dissolve each vertex
   left with degree 2 that carries the `split` flag, no vertex role and no pin, and whose two remaining edges carry
   identical role sets and one birth level.

   **The `split` flag** marks a vertex whose dissolution restores exactly the edge it was created on. It is set when the
   vertex is created on an existing edge (a split foot, a crossing, every Steiner vertex) and cleared (a) by a promotion
   that makes it a coarse chain's own vertex — a prepared contact (§3.3 rule 3) or a stretch end (§3.4); (b) by a move
   of it, or of the nearest vertex beside it on a run it split, as §3.6's "split flag under moves" states; (c) by a
   removal that breaks the run it split (demotion (b)). A promotion onto the route it already lies on (§3.6 candidate
   (b)) keeps it. A chain's own shape vertices never carry it.

   **Levels follow the rows — demotion (J-K28).** A row is added at the adding batch's level and never at a level
   coarser than its edge or vertex (a coarser chain never shares a finer edge, §3.6; promotion is the only way a vertex
   becomes coarser), so an edge's birth level is the lowest level among its rows, and only a removal can leave a level
   its rows no longer justify. `removeEdges`, `clearFiner` and `retypeEdges`' `remove` (§3.4) therefore end, after
   stripping rows and deleting the edges left with none, with three steps:
   * (a) *edges:* an edge whose remaining rows are all above its birth level takes the lowest of them — a quay on an old
     shore stretch, left with its `way` row when a moved river takes the `shore` and `bank` rows, becomes L1, as does a
     wall on an old bank, so the L0 view stays land and water only (rule 1);
   * (b) *flags:* a `split` vertex keeps its flag only while a run it split survives the batch whole — a pair of its
     incident edges of its lowest incident level that carried identical rows of that level before the batch still
     exists after it, at one level, with identical rows (a crossing has two such pairs, a T-junction one); otherwise the
     flag is cleared (where a quay left the old shore stretch it shared, that point becomes a shape vertex of the quay; a
     quay that shared the whole stretch on both sides of a street end keeps that end restorable). A vertex from which
     the batch strips its last vertex role row other than knot rows loses its kernel `pinned` flag, since a pin guards
     the feature its role names (a gate, a junction, a portal, a deck, gate, weld or anchor end; §3.4 `pinVertices`) —
     so the bank vertices of a deck F-REDERIVE removes become plain vertices of their way, keeping any knot row, and a
     water gate's bank vertex left on an unchanged shore can dissolve;
   * (c) *vertices,* in canonical order (y, then x), each reading the levels the earlier ones left: a vertex with no
     incident edge and no vertex role row of its level or coarser takes the lowest level among its incident edges and
     vertex role rows (with neither it is freed) — as an old shore stretch's L0 vertices do. A deck's bank vertex left
     over land by moved water takes its way's level at once when its `deck_end` rows are L1 (a preparation batch placed
     them), and keeps L0, with no L0 edge at it, while they are L0 (an L0 batch placed them; which batches place them at
     which level is §4.2 S1 (5)'s), until F-REDERIVE removes the deck's `deck` and `deck_end` rows (§7.3 (b) 9). Then
     the dissolution rule; then **split restoration**: a `split` vertex whose incident edges of its level or coarser are
     exactly two, of one level, with identical rows of its level or coarser, and which carries no vertex role row of its
     level or coarser and no pin but still meets finer edges or carries finer vertex role rows (the vertex dissolution
     would take but for that finer geometry), takes the lowest level among those finer edges and rows and keeps its
     flag. The flag is the whole guard: it stands only while neither the vertex nor its neighbours on the run have
     moved since it split the run (clearing (b)), so restoring it gives the run's route before its promotion, changed
     only by the same-level vertices added or removed since, which move nothing.

   So a plot-line end or footprint corner that II.1 (3)'s neighbour step promoted to L2 returns to its level when the
   street is removed — by an undo, the district's reroll or any later edit — and the kerb's L2 route, index and digest
   are those before the step (restored vertex for vertex on 100 000 of 100 000 random routes,
   `docs/validation/bench/fixall_kernel_r4_checks.out` A, and, with the flag as the whole guard, by construction for any
   number of later same-level vertices on that route). A promoted vertex that a move has unflagged stays in the coarser
   route, which is then its true shape. Each demotion re-indexes the items it changes (§3.3 "No item changes in place")
   and re-walks the faces beside a demoted edge at the levels it no longer bounds (§3.6 step 5); the per-level digests
   read the current levels (§6.2), and the commit record lists the demotions and cleared flags, which the undo record
   restores (§3.3, §7.4). §3.10's level-consistency row checks the result on every batch.
4. **Edges enter only through `insertChain`** — one door for generated chains, user strokes, boolean and buffer
   outputs, offsets and smoothing results (§3.4; its snapping, attraction, shared stretches, placement, crossings and
   local re-walk are §3.6's). Faces are never re-walked globally; a split face's two parts both inherit its owner and
   stage rank until the stage re-owns one (§3.6 step 5).
5. **Topology by index; references by role (J-K3, J-K9).** Inside the kernel topology is keyed by `VertexId`, `HalfEdgeId`
   and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a vertex's position**, except a building's wing rings and its
   stored stage-3 composition's rings and tower centres (§2.6), whose boundary points are footprint vertices that §2.6's
   wing-carrying rule re-reads after every change of the footprint, so they cannot go stale. Otherwise vertex positions
   live only in log events (with a `VertexSig`, below), view state, label placements and `StretchRef` ends; a point that
   is no vertex — a river's control knot, a pin's or decoration's point, a tree override — is an ordinary attribute of
   its record (§2.3, §2.7, §7.4). An entity reaches its geometry through the kernel's role and owner tables —
   `ChainRef('way', wayId)` for a way's spine, `FaceRef(plotId, 3)` for a plot, `VertexRef('junction', id)`, a bridge's
   deck ends `VertexRef('deck_end', bridgeId, 0 | 1)`, a water gate's bank ends `VertexRef('gate_end', gateId, 0 | 1)`,
   a castle's weld ends `VertexRef('weld', castleId, 0 | 1)`, an open wall's end anchors `VertexRef('anchor',
   enceinteId, 0 | 1)`, a reservation's attach points `VertexRef('attach', reservationId, i)`, a plot bound's gate
   openings `EdgeSetRef('gate_opening', boundId, i)` — resolved on demand by `resolve` (§3.4). Splits carry roles to
   both parts, merges union them, attraction merges them onto the surviving edge or vertex, promotion keeps them (except
   a prepared `anchor` contact name, which it strips, rule 7) and `warp` moves the vertex carrying them, so a stored
   reference cannot go stale: there is nothing to rewrite (GEO-5 (a)). How a warp treats kernel-pinned vertices and the
   vertices of locked or pinned entities is §3.6's (GEO-5 (c)).
   * **Stretches (J-K31).** An operator that removes or hands over part of a chain — a carve's cut stretch, a pruned
     remainder, a kept way's replaced stretch, a moved river's old shore stretch, the stretch between two bank anchors,
     a way split, a partial `wallToWay` — names it by a `StretchRef`: the chain's edges between two of its vertices, in
     chain order for an open chain and, for a ring, from `from` counter-clockwise to `to` (orientation by `orient2d` at
     the lowest-leftmost vertex, §3.2 (6)), so a ring's two stretches between one pair of vertices differ without a
     stored direction. Each end names a vertex of the chain by a vertex role or by its lattice point (unique per lattice
     point, §3.10); a cut end that is not yet a vertex is placed first by `splitThrough`, which may give it a vertex role
     row. A `StretchRef` is resolved within its batch and never stored in an entity record; `removeEdges` and
     `retypeEdges` apply it as §3.4 states.
   * **Chain attributes are knot profiles, never positional arrays (J-K10).** A value varying along a chain — a way's
     width, a wall's base elevation, a tunnel's invert, a shore's bank kind and shore class — is a `ChainProfile`: its
     knots are vertices of the entity's own-level route carrying the registry's knot role for the attribute with an
     ordinal (`('width_knot', wayId, i)`); between consecutive knots the value is interpolated linearly by arc length
     along that route (`linear`) or held to the next knot (`step`, categorical values); it is constant before the first
     and after the last knot of an open chain, a ring interpolates cyclically, and a chain of several rings has at least
     one knot per ring and never interpolates across rings. A constant attribute is a scalar with no knots. The creating
     stage places each knot on an existing vertex of its own level or inserts one by `splitThrough` at its own level.
     `splitThrough`, attraction, crossings, promotion and `warp` never change a profile (a split adds a vertex without a
     knot; a knot vertex moves with its chain). `kerb`, `bandUnion` and every export *sample* the profile (§3.4, §3.7)
     and the digest hashes its values with the knot rows, so a T-junction S8 inserts into a spine cannot shift the width
     elsewhere along it.
   * **Cutting and joining a profiled chain (J-K23).** A conversion that hands part of a chain to another entity or opens
     a ring — a way split, a partial `wallToWay`, a carve's cut — goes through `retypeEdges` with `rekey` (§3.4), which
     first gives **each** part a **cut knot** at every cut vertex: a knot row of that part's entity carrying the
     profile's sample there — for `linear` the arc-length interpolation between the knots around the cut, kept as that
     exact double (the one kind of knot value that is not an authored value in the attribute's unit; computed with
     + − × ÷ and `Math.sqrt` only, so it is the same on every engine), for `step` the held value. A cut at a knot vertex
     copies that knot to the other part, and a part wholly before the first or after the last knot takes the constant
     there as a scalar. Every part therefore samples what it sampled before, to within one interpolation's rounding
     (≤ 6.8 × 10⁻¹³ cm over 20 000 random ways, `docs/validation/bench/fixall_kernel_r3_checks.out` B). **Removing a
     stretch** of a profiled chain first gives each remaining part a cut knot at the stretch's end on its side, by the
     same rule, before the stretch's rows and interior knot rows leave, so every remaining sample is unchanged
     (`fixall_kernel_r4_checks.out` C). A **join** of two chains into one entity concatenates their knots in chain order
     and drops a knot at the join vertex only where the joined profile samples identically without it — its value
     equals the interpolation between its neighbouring knots within 10⁻⁹ cm, decided in doubles so every engine decides
     alike, or, for `step`, the previous knot's value: the two cut knots of an undone split carry one value and drop,
     restoring the original profile bit for bit (20 000 of 20 000, r3 file), while two different values at the join
     stay on the one vertex as two ordinals, a step, as §3.6 step 1's merged knots are.
   * **Positions in the log (GEO-5 (b)).** A log event that addresses a vertex by position (`moveVertex`, §7.1) stores
     its `LatticePoint` *and* the vertex's `VertexSig` at the time of the edit; the edit layer refuses a target with an
     empty signature (every editable vertex carries a structural or vertex role, §7.1's table). On replay
     `resolveVertexAt(key, at, sig)` (§3.4) maps the signature's entity ids through carry-over (§6.3) and binds, in
     order: (1) the vertex at `at` if its signature contains every recorded row; (2) else the nearest vertex whose
     signature does, within the rebind radius — `attractCm` for a vertex without vertex roles, else the §6.3 anchor
     radius of its vertex-role kind (junction and pin 1 m, gate and tower 2 m) — ties by lattice position (y, then x);
     (3) else the event is **orphaned** and reported (§7.3 item 4). A vertex is never bound by distance alone, so an
     upgrade replay never moves an unrelated vertex that happens to lie nearby. A river's control knot is no arena
     vertex: `moveCourseKnot` binds by the knot's ordinal (§7.4).
6. **Refinement is a pure function**: `L(n+1) = refine_n(level-n view, params, streams)`, the streams keyed from the
   scope's lineage (§6.1). How an edit clears and re-derives the finer content under the faces it touches is §7.3 (2);
   what survives the clear — locked or pinned entities, returned as conflicts to the dry run, and kept content, which
   the batch treats as fixed obstacles — is §3.3's.
7. **Roles, not a single type.** Each edge pair and each vertex carries a small sorted set of `(role, entity, level,
   ordinal)` rows from the **role registry** (a versioned data table); an output that reads a set in order — a digest
   (§6.2), a contact name's entity (below) — reads it by the role's rank in the registry and then the entity's address
   id, never by an interned handle, whose value depends on the order in which a session interned it.
   * **Edge roles:** `way`, `kerb`, `corridor_split`, `band`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`,
     `field_bound`, `district_bound`, `plot_line`, `party_wall`, `frontage`, `access`, `yard_part`, `claim`, `reserved`
     (a reservation's boundary before growth, §4.2 S3), `setback` (the L1 line bounding a wall strip, §4.8), `deck`
     (below), `green_line` (hedgerows on L3 field boundaries; avenue and street-tree rows are `Greenery.along` records,
     not edges, §2.7), `treatment` (a plot edge's fence, hedge, wall or railing as an attribute row), `gate_opening` (the
     sub-edge of a treated plot edge left open for a gate, indexed per gate), `tunnel`, `invisible`.
   * **Vertex roles:** `junction`, `tower`, `gate`, `entrance` (one row per entrance of a building's entrance set,
     `('entrance', building id, i)`, §2.6, item 29), `portal`, `attach`, `anchor`, `weld`, `deck_end`,
     `gate_end`, `composition` (a stored stage-3 composition's boundary points, §2.6), `access_point` (an `AccessPoint`'s vertex
     on a tunnel's kerb, II.7.4 — a vertex role, distinct from the `access` edge role above), and one knot role per profiled
     attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`, `shore_class_knot`). The registry marks
     `entrance`, `attach`, `anchor`, `weld`, `deck_end`, `gate_end`, `composition`, `gate_opening` and the knot roles **indexed**
     (their rows carry an ordinal).
   * **Structural and partition roles.** The registry marks each edge role **structural** (`way`, `wall`, `wall_gate`,
     `shore`, `bank`, `border`, `margin`, `reserved`, `setback`, `deck`, `tunnel`) or **partition** (the rest): a
     structural role is never removed by a sliver absorption or a face merge (§3.6), and §5.3's crossing invariant finds
     deck edges by their role. A vertex that carries any role row of a live entity is never dissolved. Coincident
     features are one edge with several roles — a street on a district boundary, a quay on a shore, a wall on a river
     bank, a track on a field boundary — never two edges and never an overwrite. A way's class, width profile and
     surface are attributes of the `Way` entity, not of its edges (FTG's 14 wire types generalised); a `wall` chain may
     be open, its ends anchored on typed vertices (a shore, a cliff, a castle; `Enceinte.anchors`, §2.7).
   * **The deck.** A `Bridge`'s deck span is the way's own L1 edge between the bridge's two `deck_end` bank vertices,
     carrying `deck` beside the way's `way` role — `ChainRef('deck', bridgeId)`; a site no way uses keeps its two bank
     vertices and no span (`Bridge.state = 'site'`, §2.7). Which batch places a deck's bank vertices, at which level and
     before or after its water, is §4.2 S1 (5)'s; in every case no L0 edge crosses water and no deck splits a water
     body's L0 faces (LC-7, J-I12).
   * **Anchors, contact names and gate ends (J-K29).** An `anchor` row marks the end of an open chain that rests on a
     coarser feature — an open wall's two ends, `('anchor', enceinteId, 0 | 1)` — or serves as a **contact name**: a
     bank point that a coarse insertion's preparation batch places on a finer edge that is neither a kept way nor a
     re-traced wall run (a settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis
     line, the map's `border` line; §3.3 rule 2), for the water's batch to name in `KernelTx.prepared`. A contact name's
     entity is that of the first row of the edge's own birth level in the row order above: on a district boundary the
     first district in id order among its `district_bound` rows, on the settlement perimeter the first in id order of
     the inner district and the hinterland pseudo-district, on a setback or glacis line its `setback` row's enceinte, on
     the map border the arena's `Terrain` entity. Its kernel-allocated ordinal and its life until the promotion that
     strips it are §3.3 rules 2–3's; no record references it. A **water gate's** two bank vertices carry `('gate_end',
     gateId, 0 | 1)` instead — on a re-traced run from the preparation batch on, under a fresh `Gate` address, as a
     re-sited deck's bank vertices are under a fresh `Bridge` (§6.3, §7.3 (b) 3) — and persist, because `Gate.banks`
     names them (§2.7) as a `Bridge` names its `deck_end`s; the wall's edge between them lies across the water as a deck
     span does. Where a generated and an edited water gate's bank vertices stand is §4.4 S5a's; both are held under a
     warp unless `fromLevel = 0`, as a deck's bank vertices are (§3.6; J-K35).
8. **Every committed batch validates its declared invariants** at their scopes, writes a report record and a
   `CommitRecord`, and a failed batch leaves the arena at the previous `version` (§3.3, §3.10).

*Size.* One arena per layer stores every boundary once: at CITY ≈ 80 k vertices, ≈ 240 k half-edges, their role rows
(with a 2-byte ordinal) and five face tables (with a 1-byte stage rank) take ≈ 10 MB of typed arrays, plus ≈ 2 MB for
the two lookup tables at load ≤ 0.5 (≈ 1.5 MB of role heads for ≈ 60 000 role keys at 12 B a slot, ≈ 0.5 MB of owner
heads over the five levels at 8 B a slot) — ≈ 12 MB (PLAUSIBLE until M0), against ≈ 20–29 MB for five per-level DCELs
that repeat each inherited edge at every finer level (SCL-11). The spatial index adds 38.4 B per item (a packed
partition stores a double-precision box and a 32-bit index per node, one inner node per 16 below it;
`docs/validation/bench/fixall_kernel_r4_bench.out` A) over one item per vertex, route edge and face (§3.3): ≈ 190 000–
230 000 items, ≈ 7–8.5 MB at a finished CITY (our count, PLAUSIBLE until M1); its home column (`indexHome`, 2 B per
vertex, edge-pair and face slot) adds ≈ 0.5 MB, so the generation worker's arena with its index is ≈ 19.5–21 MB. A pool
worker's frozen copy and its size are §3.3 pool step 1's. Knot rows are few: a constant-width way has none, and a wall's
base profile has one knot per trace vertex (tens to a few hundred per enceinte). Rebuilding the lookup tables as `Map`s
would cost each pool worker ≈ 10 ms (60 000 keys) to ≈ 20 ms (100 000 keys) at CITY and ≈ 62 ms at METROPOLIS before
its first query (`docs/validation/bench/fixall_kernel_r3_bench.out` B); the typed tables travel inside the frozen
copy, one memory copy of which costs a worker ≈ 1.1 ms at 12 MB, ≈ 1.5 ms at 15 MB and ≈ 2 ms at 20 MB
(`fixall_kernel_r4_bench.out` A).

=== REPLACE ### 2.3 Terrain and water ===
### 2.3 Terrain and water

```ts
interface Terrain { id: Id; key: PlatKey /* the ground, or one sky island's own terrain */;
  cellCm: Cm; cols: number; rows: number; originX: Cm; originY: Cm /* the height raster: frame + margin (§3.2 (9)) */;
  datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level; one per document (per island for sky terrain); set by S1 (§4.2) */;
  heightCm: Int32Array /* above datum */; reliefLimitCm: Cm /* 1 000 000 (10 km): the declared range every write is checked against */;
  hydro: HydroGrid /* the hydrology raster: frame + margin, coarser than the height raster (below) */;
  flowDir: Uint8Array /* on `hydro`: D8, defined on every land cell of frame and margin, flats included */; flatRank: Uint32Array /* on `hydro`: flat-resolution order; 0 off flats */;
  flowAccum: Uint32Array /* on `hydro` */; outfalls: Outfall[];
  seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */ }
interface HydroGrid { cellCm: Cm /* TOWN 1 600, CITY 2 500, METROPOLIS 3 200 (table values) */; cols: number; rows: number; originX: Cm; originY: Cm /* the same extent as the height raster */ }
interface TerrainSampler { heightAt(p: Point): Cm /* bilinear on the height raster; the 2.5 m refinement is computed on demand, never stored */; slopeAt(p: Point): number;
  flowAt(p: Point): { dir: number; accum: number } /* the `hydro` cell containing p */ }
interface WaterBody { id: Id; kind: 'sea'|'lake'|'river'|'tributary'|'distributary'|'islet_channel'|'pond'|'moat'|'estuary'|'harbour_basin'|'canal'|'ditch' /* a drainage cut that drains reclaimed ground (item 25; §4.11) */;
  face: FaceRef /* L0 */; shore: ChainRef /* ('shore', id): its ring(s) */;
  course?: Polyline /* rivers: the reach's centreline downstream, kept in step with the shores (below) */;
  controls?: { ordinal: number; at: PointCm }[] /* rivers: S1's control knots in course order (§4.2 S1 (3)) — recorded inputs, not arena vertices; a knot the user moved is the edited path 'controls/<ordinal>', implicitly pinned (§7.1 moveCourseKnot, §7.4) */;
  nextControl?: number /* the next free knot ordinal: a re-trace or re-sampling gives its new knots fresh ordinals, so an ordinal never names two knots */;
  widthProfile?: CmArray; depthCm?: Int16Array /* per `course` vertex: the course is the entity's own derived polyline, which no kernel op re-vertexes */;
  flowFrom?: Id; flowTo?: Id; bankKinds?: ChainProfile<'beach'|'rock'|'cliff'|'quay'|'marsh'> /* step, on the shore chain, G-R5 */;
  shoreClass?: ChainProfile<'bay'|'headland'|'straight'> /* step, on the shore chain */; lifecycle: Lifecycle }
```

Terrain is a raster in metres with a resolution set per size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m — so the 128²
fixed grid VG uses at every size is never the constraint) over the frame and its context margin; `cols × rows` follow
the arena's width × height (§3.2 (9)). Point queries go through a `TerrainSampler` (bilinear), which is how slope queries
inside the built extent and S11's ground datum read a 2.5 m refinement without storing one.

**The hydrology grid (J-K12).** Flow direction, flat rank and accumulation live on their own raster, `hydro`, over the
same extent — frame *and* margin — at 16 m (TOWN), 25 m (CITY) and 32 m (METROPOLIS): 200², 320² and 400² cells at the
rungs' target populations, the cell counts §12.4's S1 budget assumes (1.6 × the cell of a frame-only raster with the same
counts, 10 / 16 / 20 m). A `hydro` cell's height is the height raster's bilinear sample at the cell's centre, rounded to
the centimetre, so the flood runs on integers. Measured with the mechanism below (bucket-queue flood, two-gradient flats,
D8, accumulation; `docs/validation/bench/fixall_kernel_r2_hydro.out`): CITY 15.9–17.2 ms, METROPOLIS 25.3–26.5 ms, TOWN
6.2–7.0 ms, every cell with a defined D8 on both 60 m and 3 000 m relief (a frame-only raster of the same counts: 15.3–16.4
and 25.6–26.8 ms; frame and margin at the frame-only cells: 41–44 and 67–69 ms). `flowAt(p)` returns the `hydro` cell
containing `p`, so a hinterland plot's `upstream` (§2.5), a water mill's reach and the sewer hook read defined flow
everywhere on the map, and O1 (b)'s "every terrain cell has a defined flow path to an outfall" holds on this grid over
frame and margin (§13.1). How S1 traces and carves the river course on this grid and keeps the stored flow in step with
the carved terrain is §4.2 S1 (3)'s; the grid's pre-decided coarsening is §12.4's M0 site-and-fields fallback.

**Heights (GEO-15; J-K7).** Heights are `Int32` centimetres relative to the per-document datum `datumCm` (§4.2 S1), so
stored values stay small and a 3 000 m relief is ordinary. Every write to a height or depth raster — S1, the terrain
brush, a site primitive — goes through a range check against its declared limit that clamps and reports
(`W_HEIGHT_CLAMPED` with the cell count in the generation report) and never wraps; a typed-array store would otherwise
wrap silently (an `Int16Array` stores 40 000 as −25 536, executed in GEO-15). The mountainous round-trip fixture is
§13.1's.

**Flats (GEO-15).** Sinks are filled by §4.2 S1 (3)'s priority flood, which keeps exact flat surfaces. Flow across every
flat — filled depressions and genuinely level ground — is resolved by the two-gradient flat-resolution method (a
breadth-first gradient away from higher terrain and one towards lower terrain, combined into `flatRank`), computed into
its own array, so stored heights are untouched, D8 is defined on every land cell and each flat drains to its spill
point. D8 ties break in the fixed neighbour order E, NE, N, NW, W, SW, S, SE, so flow is the same on every engine.

**Terrain is not in the plat.** Water faces and their shore and bank edges enter L0 from S1 (§4.2). Contour lines are
not model geometry: they are extracted per render tile and per export and clipped to the land faces (§4.2 S1 (2), §8,
§11). Drainage lines are raster queries, not plat edges: as L0 edges they would be antennae that every street, lane and
plot line inherited at L1–L4 would have to end on or avoid (§3.6); a line that must be visible as water is a `tributary`
water body with its own L0 face instead (§2.2 rule 1; GEO-1, GEO-6). **Drainage (flow direction, flat rank,
accumulation, outfalls) is queryable per `hydro` cell** — the sewer hook's query surface. A sky island's terrain is its
own `Terrain` with its own key, datum, frame and `hydro` grid (§4.2, II.1).

**Water attributes along a shore.** A shore's bank kind and shore class are step `ChainProfile`s on the water body's
shore chain (§2.2 rule 5): a knot where the class changes, so a street end, a bridgehead or a quay inserted into the
shore afterwards never shifts which stretch is a beach and which a quay. The river `course` and its width and depth
arrays are S1's centreline of the reach, recomputed by S1's water operator whenever a batch moves or re-vertexes the
reach's shores, and `moveCourseKnot` is the one edit that changes the course directly (both §7.3 (b) 1), so a warp can
never leave the course behind.

**Slow change — what each terrain and water conversion changes (item 25; the kinds, their rarity rows and their rates are
§4.11's, their local repair §7.3 (b)'s).** Terrain and water are the slowest layer, not an immutable one. `silt` on a
reach or basin: its `widthProfile` and `depthCm` fall by the row's share and S1's water operator re-buffers its shores
from the unchanged `course` (a basin below the harbour's draught loses its harbour role, §4.11). `reclaim` of a marsh or a
foreshore: the water face's L0 ring retreats (a moved shore, §7.3 (b)) or the marsh `LandUse` face is re-typed, the new
ground is an L3 land-use face marked `reclaimed` (§2.7) and is drained to the nearest outfall by a `ditch` water body cut
like a canal (§4.11's carve). `shiftCourse`: the reach is re-traced between two control knots with fresh ordinals
(`nextControl`), the old shores' vertices demoted as §2.2 rule 3 states and the old bed left as a `marsh` land-use trace.
`digCanal` is §4.11's `carve` of kind `canal`. Each is a lifecycle event on the water body or land-use face with cause
`convert:<kind>` (§2.8), undone from the chain's replaced scope (§7.4). The terrain facts a building's basement decision
reads — `terrainClass`, the nearest water surface's elevation, the `hydro` grid's accumulation — are these (§2.6, item 29).
Emulation note: neither reference has time; MFCG's warp and FTG's water drawing already let a user reshape water, which
the base keeps as edits (§7.1); this adds only slow change over epochs (item 23).

=== REPLACE ### 2.4 Ways (the skeleton) and typed edges ===
### 2.4 Ways (the skeleton) and typed edges

```ts
type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford';
interface Way { id: Id; class: WayClass; spine: ChainRef /* ('way', id): the L1 chain, resolved by the kernel (§2.2 rule 5) */; width: Cm | ChainProfile<Cm> /* 'width_knot' on the spine; a constant-width way stores a scalar (§2.2 rule 5) */; surface: 'paved'|'cobble'|'dirt'|'planks';
  name?: NameRef; from: NodeRef; to: NodeRef /* gate, plaza, bridge, harbour, junction, external bearing */; growthStage: number; epoch: number;
  provisional: boolean /* an S5-grown spine beyond a stage boundary: the only ways the inter-stage trim may cut (§4.4) */; bridge?: Id /* the §2.7 Bridge deck it crosses */;
  slopeP95?: number; flowToward?: 'from'|'to' /* sewer hook: drainage direction along the way */; corridor?: FaceRef /* L2 view */; lifecycle: Lifecycle }
interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[]; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */ }
```

Edges carry role sets, not a single type, and a way's class, width profile and surface are attributes of the `Way`
(§2.2 rule 7). Every record of §2.4–§2.7 and PART II reaches geometry only through `FaceRef`, `ChainRef`, `EdgeSetRef` or
`VertexRef`, never through an arena slot, and holds a vertex position only where §2.2 rule 5 allows it. Every record
embeds the `Identity` and `Lifecycle` of §2.8 (the `id` and `lifecycle` fields below are those), and no record stores a
seed or a stream key: streams derive from the entity's lineage on demand (§6.1).

**No `passage` way class (item 30).** A passage through a building is not a way: it is an L3 face of kind `passage` under
the front building's wing (§2.5's `Passage`, cut by S10 on §4.6's reach; the kernel's J-A30.31 — no nesting exception, no
new operation), reached as an access face and drawn with an arch glyph (§8.3). `WayClass` is unchanged, and the
underground arena carries `tunnel` chains, never ways (§2.2 rule 1).

=== REPLACE ### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector ===
### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

```ts
interface District { id: Id; kind: DistrictKind /* feature-named: central, market (one per market of either rank, item 24), docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty, hinterland, underground (the owner-staged layer's pseudo-district, II.7.3 — a pseudo-district like hinterland), … data-defined; never a social class */;
  quarter: Id /* the label-level grouping (§9.1) */; faces: FaceRef /* L1 coarse faces, before and after infill */; boundary: TypedBoundary; seams: Id[] /* its Seam records (II.1): one per boundary run, shared with the neighbour across it; the district's SeamContract is the view assembled from them — from milestone 1 */;
  character: CharacterVector; venueMix: Record<string, number>; prosperity: { mean: number; band: string }; growthStage: number;
  fabric: FabricStrategyId /* 'bent-cut' in the base; ring / square / street at stage 2 */; fabricParams: Record<string, number>;
  buildingScale: number /* 0.5–2, default 1: FTG's "smaller / bigger" knob as a continuous multiplier on footprint targets (§4.7 S11) */;
  materialOverride?: Partial<MaterialRow> /* §2.6 */; allocation: Id /* the district's Allocation record (§4.5 S7b) */; subDistricts: Id[];
  description?: TextRef /* a generated one-line summary of the mix and features (§10.4), regenerated when the mix changes, editable */;
  namingFeature?: Id; name?: NameRef; lifecycle: Lifecycle }   // labels: LabelEntity (§9.1)
// Quarters are §9.1's QuarterNode merge tree, built by S6 (§4.5); its city cut is the city-LOD label unit (§9.4)
interface SubDistrict { id: Id; district: Id; blocks: Id[]; cluster: string /* roster cluster tag, e.g. a trade group */ }             // FTG's sub-district: a contiguous block group a cluster is placed into (§4.7 S10a)
interface Reservation { id: Id; kind: 'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal';
  rank?: 'principal'|'secondary' /* market kinds only (item 24): the principal market — the plaza when it wins S3 (12)'s trade score, else a flanking site — or one of S7b's secondary markets (§4.2, §4.5); setAttr-editable */;
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number; owner?: Id /* castle, institution, commons */;
  attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte) (§2.2 rule 5) */; stage: StageId /* S3, S7 (gate plazas) or S7b */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block, the hinterland pseudo-district, a sky pseudo-district (II.6) or the underground pseudo-district (II.7.3) */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id;
    near?: Id /* hinterland rows only: the district an edge orchard serves (§4.9) */; areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];
  lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract); stores no stream key (§2.4)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  bands: string[] /* the band set's ids in order — cuts.length + 1 of them — from §4.5's `prosperity.bands` table (item 27); every band-keyed row key is one of them */;
  middle: string /* the settlement's middle band — the band that holds its median household under the roster's wealth shares, designated at S6 with the cuts (§4.5; J-A27.42): the band §4.11's geometry floor bounds a plot's manifested geometry to (item 31), and the row §2.6's interior ladder reads as its middle (item 28 (f)) */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 and changed only by an explicit edit or an epoch (§4.5)
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[]; depthClass: string;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'wall_strip'|'empty' /* the deep-interior treatment, decided in S8 (§4.6); 'wall_strip': an enceinte's band, setback and glacis block, never plotted (§4.8) */;
  reach: 'open'|'passage'|'gated' /* item 30: how a court or rear-row interior is reached from the public way — drawn with the treatment in S8 (§4.6); 'open' for every other interior and in the parity presets */;
  due?: { band: string; since: number /* the epoch of the crossing */; epochs: number /* epochs spent in that band since */ } /* item 31: the block's value crossed a cut past the hysteresis at an epoch and its stock has not yet met the new band; written and cleared by §4.11's wealth ladder, never by a brush */; reservation?: Id }
interface Frontage { id: Id; way: Id; edges: EdgeSetRef /* ('frontage', frontage id): the L2 kerb edges of this block on this way */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: EdgeSetRef /* ('frontage', plot id) */; access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT); an access edge lying on a sealed Passage face (below) is a sealed access edge */; depthCm: Cm; frontageCm: Cm;
  exposure: 'street'|'lane'|'alley'|'court'|'hidden'|'sealed' /* item 30: how the plot is reached — derived at §4.6 from the block's interior access graph when S10 types the access edges (by adjacency and reach depth, never a sight line, J-A30.42); 'hidden': every reach to a public kerb passes a passage, a gated opening or two or more interior faces; 'sealed': every reach passes a sealed passage */;
  knownTo: 'public'|'local'|'secret' /* item 30: who knows the place — defaults from exposure (hidden → local, else public), otherwise a dossier fact (§7.7) or a setAttr; read by §9.2's label policy and the reader (§11.2), never by geometry */;
  partyWalls: EdgeSetRef /* ('party_wall', plot id): one shared edge per wall; the neighbour is the owner of the face across */;
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas: yard, garden, court, orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore */;
  builtBand: string; builtProsperity: number /* item 31: the band and the field value on [0, 1] the plot's present stock was built for — persisted attribute columns, in schema order in the leaf digest (§6.2) and in the snapshot (§2.9), never recomputed from the field (J-DET-12); written by generation and the paths J-A31.44 lists (§4.11) and by no bare setAttr (§7.1); `geometryFloor` is derived from it at read (below) */;
  ctx: ContextVector; derivedFrom: DerivationRecord /* §2.8 */; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO; item 31's fusion, §7.1) */; lifecycle: Lifecycle;
}
interface PlotBound { id: Id; edges: EdgeSetRef /* ('treatment', bound id): the treated sub-edges; a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (splitThrough at the gate ends) */;
  side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[] /* every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */ }
// DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is defined once, in §2.8.
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'none'; coverage: number; slots: BuildingSlot[]; frontJitterCm: Cm; ruleRow: string }
interface Passage { id: Id; face: FaceRef /* the L3 face of kind passage: a covered alley-as-face cut along one side line of the front plot, from the kerb to the court or rear row it serves (§4.6, §4.7 S10 (9)); the kernel's J-A30.31 */; block: Id; frontPlot: Id; frontBuilding?: Id /* the building whose wing spans it (Wing.spans, §2.6) */;
  widthCm: Cm; headroomCm: Cm /* the ground storey's cells it takes; the storeys above keep the frontage continuous (§2.6) */; sealed: boolean /* item 30 (e): a bricked arch — sealPassage / openPassage (§4.11, §7.1), no geometry change; the one stored bit behind "a sealed access edge" and a plot's exposure 'sealed' (§4.6) */; lifecycle: Lifecycle }   // item 30; the entity registry (§2.8)
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */; entranceOn: EdgeSetRef /* ('access', plot id): the access edges the slot's main entrance may lie on — the frontage for a front slot, the court or the path from the plot's street gate for a set-back one (§2.6's entrance rules, item 29); side, rear and yard doors read the plot's other access edges and yard parts there */;
  frontage?: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* the designation template's frontage treatment for the main slot (§4.7 S11, item 19), persisted with the slot */ }   // persisted: no polygon
interface SlotPlan extends BuildingSlot { hint: Polygon /* S11's working shape for the slot — transient, never stored; a later outline() or compose() call gets the building's current footprint ring, resolved from its FaceRef at the call (§2.6) */ }
interface ContextVector {   // the per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19)
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Id /* the district's mix, read through the district, never copied per plot (SCL-5) */;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18)
  dist: { centre: M; plaza: M; market: M /* the nearest market of either rank (item 24) */; gate: M; wall: M; water: M; shore: M; harbour?: M };
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: Cdeg; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
  arena: 'ground'|'underground' /* item 12: keys the arena-specific rows of the granularity and site-plan tables (II.7.3) */;
  rosterAssignment?: Id; assignment?: Id;
}
```

The context vector is stored as struct-of-arrays columns per district partition (one typed column per field), not as an
object per plot (SCL-5). A plot is the parcel (the owner's stage-3 wording and the references' code say *lot* for the
same thing; this document says *plot* except when quoting them, and *building* only for a footprint with heights standing
on a plot); rendering never draws a plot outline as a building (a cadastral outline group is an optional toggle). A
plot's coverage, arrangement, separation and boundary treatment come from S11's site-plan tables (§4.7). A slot's shape is
S11's working data, never a stored polygon: after S11 the building's footprint face and its wings (§2.6) are the slot's
geometry, so no plot record holds a world position that a warp would leave behind (§2.2 rule 5; J-P50).

**What the records are for.**

* **Districts are feature-named, never class-named (J-P1).** A district's kind names its feature or function (market,
  docks, gate, castle, temple, craft, riverbank …); "rich quarter" and "poor quarter" are *descriptions* derived from
  the prosperity field for naming and the description line only. Wealth varies continuously through the prosperity
  field (MFP-7).
* **Reservations** are the large claims made before the streets (§4.2 S3) or before the lanes (§4.5 S7b): castle bailey,
  main plaza, market, church or cathedral precinct, large institutions, parks, and the water kinds (harbour basin, moat,
  canal) that are carved into L0 before any way is routed. A reservation is a barrier to growth and infill; the claimed
  entity is built inside it.
* **Allocations** are the persisted content decision: which classes and how many, in which wealth band, go to each
  district, sub-district and block — and, for the outside classes and the edge orchards, to the hinterland
  pseudo-district, and, when the owner-staged island toggle is on, to the sky pseudo-districts (II.6). They are computed
  eagerly for the whole town (§4.1) and every per-district stage reads them, so the town's content never depends on the
  order districts are derived or viewed (LC-2). An allocation stores no stream key — S7b and S10a draw from
  lineage-derived streams (§6.1) — so a district's New random re-draws its own block allocation and nothing else.
* **DerivationRecord** is a plot's, block's or building's memory of the derivation inputs §2.8 records for it.
  "Regenerate (keep settings)" re-derives from these recorded inputs (faithful, byte-identical); re-deriving with
  current inputs is `Adjust`; a field brush compares each plot's current sample with the recorded one and re-derives only
  what §7.2's τ rule selects (τ = 0.01 of the field range, the same τ on replay; LC-6) — an authorial re-derivation that
  sets `builtBand` in its scope (J-A31.44); **an epoch never re-derives plots by τ**: it acts on survivors only through
  §4.11's wealth ladder, at due blocks, bounded by the geometry floor (item 31; LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the site-plan table (§4.7 S11). It is what draws a walled manor compound, a fenced garden, a hedged
  field edge, and it exports as VTT walls and GeoJSON lines (VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences,
  COV-FTG-F23).
* **The built band and the geometry floor (item 31).** `builtBand` and `builtProsperity` remember what the plot's stock was
  built for; **`geometryFloor` is derived at read and never stored** — `min(builtBand, FieldBands.middle)` by the band order
  of `FieldBands.bands` — so a changed middle designation needs no migration; the floor rule itself, the manifested band a
  plot's geometry reads and what writes `builtBand` are stated once in §4.11 (J-A31.43, J-A31.44); a block's `due` mark is
  that ladder's trigger. With no epoch the manifested band is the field band everywhere (item 23).
* **Exposure, passages and knowledge (item 30).** `exposure` names how a plot is reached, derived at §4.6 by S10 from the block's
  interior access graph and its `reach`; a `Passage` is the covered way under a front building that a `passage` reach cuts,
  its `sealed` bit the one stored fact behind a sealed access edge and exposure `sealed` (its plots then enter §4.11's
  ladder as vacant, §2.8); `knownTo` is knowledge, not geometry — the place is always on the map, and only its name and
  purpose are withheld (§9.2, §11.2). A hidden plot keeps the access guarantee: ≥ 1 access edge and a chain of access
  faces to a public kerb (§5.2 F-PLOT, §5.3).
* **Seams** (II.1), **FieldBands** (§4.5) and **vacant frontage runs** — ordinary plots with `use = 'vacant'` or a `yard`
  part joined to the neighbour (§4.7 S10 (8); COV-VG-VN-170) — are stated at their homes.

=== REPLACE ### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===
### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (below) */; floors: number; floorsBelow?: number /* the basement's storeys below ground (Basement, below; item 29); 0 or absent without one */; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
interface BaseWing { kind: 'rect'|'quad'|'polygon';
  ring: Polygon /* world lattice points, counter-clockwise — a derived shape record the wing-carrying rule keeps on the footprint (below).
                   rect: a rectangle — its four corners, and on its sides, between them, the footprint's and the building's other wings' vertices that lie
                   there · quad: a row footprint clipped to its plot (§4.7 S11) — four sides in ring order from corners[0]: sides 1 and 3 are the party-wall
                   chains (straight, or with the lot cut's one bend, §4.7 S10 (4)), sides 2 and 4 the front and rear chains, which may be bent or curved —
                   or a rect the carry turned into a quad (rule 3) · polygon: a template part (apse, octagon, star point) */;
  corners?: [0, number, number, number] /* rect and quad: the ring indices at which sides 1, 2, 3 and 4 begin (the ring starts at the first corner);
                   S11 records them when it clips a row or when a rect's sides carry other vertices, and every carry re-indexes them;
                   absent on a rect whose ring is its four corners ([0, 1, 2, 3]) */;
  ridgeAxis: 0|1 /* rect: along side 1 (0) or side 2 (1) · quad: 0 = the ridge joins the arc-length midpoints of sides 1 and 3, the party-wall chains
                    (eaves to the street), 1 = it joins the arc-length midpoints of sides 2 and 4, the front and rear chains (gable to the street) ·
                    polygon: unused (pyramid, cone or dome) */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use?: Id /* the current Use record (§2.7): the roster class it houses, its specialisation and assignment; absent: vacant (item 17) */; formerUses: Id[] /* the Use records that occupied it before, newest last — the traces item 17 (c) keeps (a former inn, a guildhall turned tenement) */;
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */; households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — S10b's fill at generation to the template row's households.built (§4.7), §4.11's relet, item 17's relocation (§10.3); its length is the count the plan rung houses and the interior ladder reads (below, item 28 (f)), never above the capacity (below) */;
  entrances: Entrance[] /* ≥ 1 (item 29): exactly one of role main, facing the street or the court or path from the plot's street gate, plus the side, rear, yard and service doors the entrance rules below allow; replaces the single entrance vertex */; basement?: Basement /* the selective basement decision below (item 29 (b)); absent: none */;
  heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable; a rendering attribute only (below) */; condition: 'kept'|'worn'|'neglected' /* item 31 rung 1: the fabric's wear — a rendering-class driver like material (§8.2: wear, patched roofs), never a shape input and not an existence state (§2.8); stepped down by §4.11's ladder, restored by renovation */;
  knownTo: 'public'|'local'|'secret' /* item 30: defaults from its plot's exposure and knownTo; a dossier fact for a dossier-backed institution's buildings (§7.7); read by §9.2 and the reader, never by geometry */; predecessor?: Id /* item 8: the cleared trace or ruin this building was raised on (§4.11's reuse … build; the trace's address passes by succession, §6.3) */;
  description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated rung by rung (the elaboration record and cache, §2.8, §2.9), stored only when edited — the first composition or plan edit stores it (§7.1); its streams derive from the building's lineage with each rung's own reroll (§6.1) */;
  assignment?: Id; drift?: DriftBounds; occupants: Id[]; lifecycle: Lifecycle;
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* a ruined building's roofless state (§2.8 decline hooks) */; pitch?: number /* a ratio, not an angle */; material?: string };
interface MaterialRow { key: { era: string; stage?: number /* FTG's per-stage default: the growth stage of the building's plot */; districtKind?: string; cls?: string /* overrides, the most specific winning: class (temples and churches stone by row), then district kind, then the stage default */;
  band?: string /* only in the optional regional-shift rows below — absent from every default row, so the default never keys a material by wealth (item 19) */ }; walls: string; roof: string; weight: number; extension?: 'regionalShift' /* §7.6's marker: a row of our optional regional shift, off by default (items 19, 23) */ }   // a rule table (§7.6), our own rows; the rule is "Materials" below
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms'|'plan')[] /* the four rungs of the building ladder: outline → wings → rooms → plan (item 28) */; wings: Wing[]; towers: ComposedTower[]; courts: Polygon[];
  rooms?: Room[] /* the rooms rung: the principal rooms a Fantasy-Manor-class composer emits with its wings (a hall, a tower's round room), each with its storey; the plan rung takes them as fixed rings (below); optional, and absent from the base's outline builder */;
  plan?: Plan /* the plan rung: every storey's rooms, walls and openings (below) */ }
interface Wing { footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormers?: number /* a free count while the plan rung is absent; once a plan exists it is derived from the plan's roofed rooms with exterior demand (the plan rung, below) */;
  porch?: Porch /* at the main entrance's side and offset (item 29), so the porch and the plan's front door coincide by construction */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) the wing's storeys above the ground span — the ground storey ends at the passage's edge and every storey above extends over it (the wing's extent at level ≥ 1 is footprint ∪ the passage face's ring); read by the plan rung, the shadow pass and the 3-D export */ }
interface ComposedTower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }   // a composition's tower — for the plan rung a round wing: one round room per storey and the spiral stair core of the wing it joins (below); the wall tower entity is §2.7's Tower
interface Room { id: Id /* room:<building id>/<level>/<i> — an address carried by its anchor, the room's centroid within its wing (§6.3) */; ring: Polygon /* world lattice points inside its wing: a value read back from the rung's transient arena, never a plat face (§3.4; J-A28.31) */;
  wing: number /* index into Composition.wings; a tower's round room names its ComposedTower by wings.length + the tower's index */; storey: number /* Storey.level */; role: RoomRole; scope: 'unit'|'shared'|'service'|'circulation' /* §10.2's RoomRuleRow.scope: a household's own room, one the households share, the use's or the staff's, or a corridor, stair hall, landing or passage */;
  unit?: Id /* item 28 (f): the Household whose dwelling unit the room belongs to — present exactly when scope is 'unit'; edited by setRoomUnit (§7.1) */; program?: number /* index into Plan.program; absent for a generic room */;
  subLocation?: Id /* the SubLocation it hosts: rooms refine sub-locations, never replace them (below) */; hearth?: { wall: Id; at: Cm; chimney: Id }; lit: boolean /* a light at the room's spine summit (§8.5; J-A28.32); corridors unlit */ }
interface Plan { storeys: Storey[]; program: ProgramRoom[] /* the programme as sized and allocated (the plan rung, steps 2–3 below): what the plan owed — read by the report, §13.2's bars and the re-cut */;
  units: { household: Id; form: UnitForm; entry: Id /* the Opening that is the unit's own door, onto circulation or the street */ }[] /* item 28 (f): one per household housed */;
  cores: StairCore[]; chimneys: Chimney[]; pattern: Record<number /* storey level */, LayoutPattern>; slices: SliceRef[] /* the programme, pattern, furniture and interior-ladder rows consulted (§2.8) */ }
interface Storey { level: number /* −k … −1 the basement's storeys, 0 the ground, 1 … n above */; wings: number[] /* the wings whose floors — or the basement ring — reach this level */;
  rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }
interface ProgramRoom { rule: number /* index into the programme row's rooms (§10.2 RoomRuleRow) */; role: RoomRole; scope: Room['scope']; unit?: Id /* scope unit: the household it is for */;
  areaM2: [number, number, number] /* the row's min, target and max × the interior ladder row's size factor, interpolated along the occupants' value (below) */; storey: number; wing: number; anchor?: 'entrance:main'|'entrance:yard'|'core'|'hearth' }
interface Wall { id: Id; a: PointCm; b: PointCm; kind: 'exterior'|'party'|'partition'|'court'; left: Id | 'outside'; right: Id | 'outside' }   // exterior and court walls lie on wing-ring edges, a party wall on the plot's party-wall edge (the stage-3 contract's fourth rung, below)
interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm; kind: 'door'|'arch'|'open'|'entrance'|'passage'|'trapdoor'; entrance?: number /* index into Building.entrances (item 29): every entrance opens here; a reserved passage's two ends are entrances onto it (item 30) */ }
interface WindowRec { id: Id; wall: Id; at: Cm; widthCm: Cm }
interface StairCore { id: Id; wing: number; tower?: number /* index into Composition.towers: a spiral in a round wing */; bay: Polygon /* the same bay on every storey it serves */;
  levels: [number, number]; kind: 'straight'|'dogleg'|'winder'|'spiral'|'ladder'|'trapdoor' }
interface Chimney { id: Id; wing: number; column: PointCm; levels: [number, number] }     // derived from a hearth column (a small fixed ring on the transient arena, §3.4); the roof construction draws it (§8.6)
type RoomRole = string;        // data-defined by §10.2's room-programme rows (our own names: hall, chamber, solar, parlour, kitchen, buttery, common room, cooking place, staff chamber, stair hall, forge, shop, store, undercroft, nave, passage …)
type LayoutPattern = 'bisect'|'follow'|'spine'|'hall_and_parlour'|'cross_passage'|'enfilade'|'nave';   // the cut patterns (the plan rung, below); rows, not code
type UnitForm = 'house'|'dwelling'|'lodging'|'apartment'|'room';   // item 28 (f): the interior ladder's unit forms, richest first (below)
interface Entrance { vertex: VertexRef /* ('entrance', building id, i): a vertex on the footprint edge, indexed (§2.2 rule 7) */; role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|'alley'|'yard'|'court' /* the way or part the door opens onto */;
  wing: number; side: number /* the wing ring's side, as Porch.side */; offsetCm: Cm /* along that side */ }   // item 29; the rules are "Entrances" below
interface Basement { floors: number /* storeys below ground, ≥ 1 (Heights.floorsBelow) */; kind: 'full'|'half'|'walkout'; ring: Polygon /* inside the ground storey's wings and smaller than their union; world lattice points, carried with the wings */;
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it: the stair core, a trapdoor, or an outside stair (a walk-out) */ }   // item 29 (b); the decision is "Basements" below
interface Porch { side: number /* the side of its wing's footprint ring that it stands on, by ring index */; offsetCm: Cm /* from that side's first vertex along the side */; widthCm: Cm; depthCm: Cm /* outward */ }   // relative to its wing: no world point, so it moves with the wing and is not carried
interface BuildingInput { lot: Polygon; access: Segment[]; slot: SlotPlan /* §2.5: at S11 the site plan's working hint; at a later outline() or compose() call the building's current footprint ring, resolved at the call */; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */;
  building?: Pick<Building, 'households'|'entrances'|'basement'|'subLocations'|'use'|'assignment'> /* the plan rung's content inputs (item 28), resolved at the call like the footprint ring */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
  plan(input: BuildingInput, composition: Composition, k: Kernel, prior?: Plan): KernelResult<Plan>;   // the fourth rung (item 28): lazy under §4.1's contract, on the click's request, on a transient arena per storey (§3.4); prior = the canonical prior a re-cut mutates (the interior ladder, below; §7.3) — never the cache
}
interface ClassRules { pick(ctx: ContextVector, assignment?: Assignment): { cls: BuildingClass; specialisation?: string; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code: the class row and its designation template (§4.7 S11, item 19) — the geometry columns read at the plot's manifested band, the specialisation and the room programme at the field band (J-A19.43)
// The wing-carrying rule (below): pure, + − × ÷ and sqrt only (§6.5); when it runs: below.
interface CarriedShapes { wings: BaseWing[]; composition?: Composition /* only when stored (an edited stage-3 composition): its wing, court and room rings and its tower centres */ }
declare function carryWings(shapes: CarriedShapes, before: Polygon[] /* the footprint's rings before the change, outer first */, after: Polygon[],
  moved: (p: LatticePoint) => LatticePoint | null /* the position after the change of the footprint vertex that stood at p; null: the change dissolved it */,
  pairing?: 'tiled' | 'overlapping' /* rule 4's pairing verdict, found from the vertex identities once per edit and reused by every halving of one step; computed when absent */): KernelResult<CarriedShapes>   // E_INVARIANT when rule 4's check fails
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), a row's `fixedWings` passed through unchanged (below),
and — for institution classes (keep, temple, church, manor, hall, farmstead) — two further constructions behind the same
`outline()`:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds.
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.

Every footprint is stored as **wings** (VIS-10; J-P17) of the three `BaseWing` kinds — `rect` for the outline builder's
rectangles and its L / T compositions, `quad` for a row house (below), `polygon` for a template part with a `pyramid` /
`cone` / `dome` roof. Each wing carries its ridge axis (the wing's long axis, or the short axis in a table share of wings
— NG measures ≈ 36 %), its heights and its roof; the footprint is the wings' union, so the footprint hash at city LOD
does not depend on the wing split. The roof *construction* the renderer
draws (plain, skeleton-hip, skeleton-gable, fake gable per wing) is a style-sheet parameter over the stored wings (§8.2);
the model's `roof.kind` is the default that the 3-D export uses, so presets can change the picture without changing the
model.

**Row footprints are quads (J-P31, J-P39).** S11's row arrangement builds each row house's footprint by the boolean
`plot ∩ frontage band` (§4.7 S11, GEO-26), so two neighbours share one party-wall edge even on a bent or curved frontage.
That polygon is stored as one `quad` wing — its two side chains are the plot's party walls, straight or bent once where
the lot cut's bend falls inside the row depth (the side lines are bent lot cuts, §4.7 S10 (4)), its front and rear are
the clipped chains, and S11 records the four corners where the side chains meet the front and rear chains (`corners`) —
and S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits it, so the
footprint the boolean made is the footprint the model stores (on a slope beyond `skirtMaxCm` S11 first splits it along
the contour into stepped quads, each a wing with its own corners). The quad's model ridge joins the arc-length midpoints
of the two chains its `ridgeAxis` names, so every row house has a ridge without a skeleton, and a bent party-wall chain
has one well-defined midpoint (on whichever of its two segments half its length falls). The drawn roof is chosen wing by
wing by §3.8 (the exact OBB roof for a wing that passes its convex near-rectangle test, else the validated skeleton with
its plain-roof downgrade); the per-wing fake-gable construction draws the stored ridge directly, and no reader asserts
that a party-wall side is straight. The union rule, O17 (i)'s identical footprint hash at every LOD and the stage-3
contract therefore hold for attached rows on curved frontages exactly as for rectangles (the curved-street fixtures of
§13.2).

**Wings follow their footprint — the wing-carrying rule (J-P42).** Wing rings store world lattice points, some of them
footprint vertex positions (with a stored stage-3 composition, the only entity records that do, §2.2 rule 5), so one
pure function, `carryWings`, keeps every building's wings on its footprint face through every change of that face's
rings: a `warp` or `moveVertex` moving a vertex of the face (the commit record's `moved` list, §3.3); a batch adding a
vertex to one of its rings (a neighbouring plot re-fitted with a corner on a shared party wall; II.1 (3)'s neighbour
step splitting a kerb a row footprint fronts; S12b's formal-garden grid line or orchard-part edge ending on a house
wall, §4.9) or taking one out (a dissolution, or that step's reversal); and S11's own insertion of the footprint, the
first carry. **When it runs is stage-agnostic (J-P47):** after every committed batch — generation or edit; derivation
pool, hinterland unit or generation worker — whose commit record lists a footprint face among the L4 faces it changed
or a vertex of one among the vertices it moved (§3.3), the batch's writer runs `carryWings` for that building before its
next batch; the building's own S11 batch ends with the first carry, and a `warp` or `moveVertex` runs it inside the
step's whole-step validation (rule 4; §3.6, §7.4). The carry writes only the building's `wings` (and its stored
composition), which belong to the writer's own faces — a district's S12b changes only its own footprints (§4.1's
laziness contract), an edit only those of its effective scope and seam exception (§7.3 item 1) — so generation, a pool
of any size, a replay and Regenerate (keep settings) run the same carries on the same rings and store the same bytes
(O9 (c)). The rule:
1. *Boundary runs are footprint runs.* The parts of a wing's ring that lie on the footprint's boundary — its **boundary
   runs** — are runs of the footprint's rings vertex for vertex, so a wing vertex on the boundary is a footprint vertex,
   identified by its lattice point (a vertex is unique per lattice point, §3.10). S11 establishes this at the first
   carry: it inserts the footprint's rings through every wing vertex that lies on the wings' union boundary — a
   collinear one included, as a shape vertex of the ring, which never dissolves (§2.2 rule 3) — and then carries the
   wings from the ring it inserted to the committed face, each input vertex matched to the vertex its insertion placed
   (`ChainInsert.placed`, §3.4; a row's quad, which the boolean on the arrangement made, already is its committed ring).
   Inside the footprint the same holds between wings: a vertex that one wing has on another wing's side — the joint of
   an L's two rectangles, a T's stem corner on its bar — is a vertex of both rings (a rect records it between its
   corners), so wings that share a side share it vertex for vertex. Every later carry keeps both properties.
2. *Carry.* For each such building, from the footprint's rings before the change and after it: (a) each boundary run is
   re-read from the rings after the change between its two end vertices, in the direction that keeps the footprint's
   interior on its left, matched by identity — an end keeps the vertex it was, wherever that vertex now stands — so a
   vertex the change added to the boundary joins every wing ring that runs along it, a dissolved one leaves it, and a
   moved one moves; a wing whose ring lies wholly on the boundary (a one-wing house, a row's quad) is re-read whole,
   from its first corner's vertex; (b) every other wing vertex — a joint where two wings meet inside the footprint, or
   the hidden corner of a wing that overlaps another — takes its mean-value coordinates with respect to the footprint's
   rings (outer and holes) before the change, applied to the rings after it with `+ − × ÷` and `sqrt` only (§6.5) and
   rounded to the lattice, so a joint two wings share maps to one point for both.
3. *Kinds.* A rect's and a quad's `corners` name the same corner vertices after the carry and are re-indexed. A rect
   whose carried ring fails §3.8's convex near-rectangle test becomes a `quad` with its four corners recorded and its
   `ridgeAxis` swapped — a rect's axis 0, along side 1, is a quad's axis 1, the line joining the midpoints of sides 2
   and 4 — so the ridge keeps its direction and the roof path is re-chosen on the carried ring (§3.8, §8.6); a quad and
   a polygon wing keep their kinds.
4. *Check (J-P49).* Every carried ring is simple and counter-clockwise, and the union of the building's wings equals
   its footprint face (integer equality after snapping — the stage-3 contract, below). It is decided exactly, at the
   least cost, by the building's **pairing**: whether every directed edge of its wing rings, keyed by vertex identity (a
   footprint vertex, or a joint the meeting wings share), is an edge of the footprint's rings — each used once — or the
   reverse of exactly one other wing's edge. The pairing depends on identities only, so it is found once per edit and
   holds through every halving of a step, which moves vertices and never adds or removes one; a batch that adds or
   removes a vertex recomputes it. Then: (i) a building whose every wing is re-read whole by rule 2 (a) — a one-wing
   house, a row's quad — needs no union: its ring is its footprint's ring, which the step's own validation keeps simple
   (§3.6), and only rule 3's test runs, on a rect; (ii) a building whose pairing holds — tiled wings: an L, T, cross or
   U of abutting rects, a template of tiles — needs only every carried ring simple and counter-clockwise, because the
   pairing makes the wings' winding numbers sum to the footprint face's at every point off the edges, so simple
   counter-clockwise rings cover each point of the face exactly once and nothing outside it; (iii) a building whose
   pairing fails — wings that overlap, such as a T whose stem runs into its bar — is checked by the kernel's boolean
   union on the arrangement (§3.7) against the face. For a `warp` or a `moveVertex` this check is part of the step's
   whole-step validation, which halves the step when it fails (§3.6; the edit layer's record check, as for a held pin,
   §7.4); it runs after the kernel's own checks of the step pass and stops at the first failing building in address
   order, since one failure halves the step. After any other batch a building whose check fails is re-derived by S11 on
   its plot (F-REDERIVE, reported); by rule 1 that cannot happen on the boundary, whose runs follow the rings exactly,
   and a joint moves only by the sub-centimetre route changes such a batch makes (§2.2 rule 3). *Cost* (measured on a
   model of the rule, per building per validation pass, the carry and rule 3 included; Node 24 on the bench machine,
   `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`): ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a
   one-wing rect (rule 3's test), ≈ 0.9–2.7 µs for tiled L, T, cross, U and inner-joint compositions (their check
   0.15–0.4 µs of it), and ≈ 0.3–0.9 µs once per edit for the pairing; an overlapping composition adds its union,
   bounded by S11's compound geometry share (≤ 25 µs, §12.4's S11 row; PLAUSIBLE). On an assumed core mix — 55 % row quads, 25 %
   one-wing houses, 18 % tiled, 2 % overlapping — 450 buildings, §12.6's district ceiling and about what a 150 m brush
   (≈ 7 ha) covers in a dense CITY core, cost ≈ 0.4 ms per pass and ≈ 3.6 ms in the worst case of a step and eight
   halvings, inside §12.6's warp Apply budget, which counts it; M3a's measurement on that brush and its pre-decided
   fallback are §12.6's.
5. *Undo, replay, `moveFootprint`.* The edit's undo record keeps the former rings (§7.4), and a replay performs the same
   carry on the same geometry, so it gets the same rings. `moveFootprint` applies its rigid move to the wing rings and
   S11 re-fits the plot with them as `fixedWings` — the first-carry path.

**A stored composition is carried with its wings (J-P48).** A stage-3 `Composition` is derived lazily and stores no
position until an edit stores it (`Building.composition`; the edit kinds that do so are stage 3's, and §2.6's test
stores a hand-built one); from then on its world geometry — each composed `Wing.footprint`, each court, each room ring
and each `ComposedTower`'s centre — is carried in the same `carryWings` call as the base wings, by the same rules. A
porch is stored relative to its wing's side (`Porch`) and moves with the wing.

* (1) The edit that stores it establishes rule 1 for it in the same batch: every point of those rings and every tower
  centre that lies on the footprint face's boundary becomes a vertex of the footprint rings — on an L4 edge by a
  same-level L4 split, on a plot line (L3) or a kerb (L2) by an L4 Steiner vertex that `splitThrough` places, the
  composition's point re-read at the placed vertex (§2.2 rule 3) — and each such vertex carries a `('composition',
  buildingId, i)` vertex role row while the composition is stored, so no dissolution removes it (§2.2 rule 7); the row
  leaves with the composition when an undo removes it or it is orphaned (below). The base wings gain each such vertex by
  rule 2 (a), and a point one composed ring has on another's side is made a vertex of both (a data step on the record).
  Every face that shares a split edge — the building's own yard parts, a row neighbour's footprint across a party wall, a
  neighbouring plot's L4 face across the plot line — gains the vertex and is in the storing edit's effective scope,
  together with a row neighbour's wing rings, which its carry changes the same way; each ring equals its prior ring with
  those vertices removed (§3.3's same-level-split rule; the check of §7.3 item 7 (ii)).
* (2) Boundary runs are re-read by identity and every other point takes its mean-value coordinates in the footprint's
  rings before the change, applied after it and rounded, so a point that a wing, a court and a room share maps to one
  point for all of them, and a tower centre on the boundary, a footprint vertex, moves with it; each composed wing and
  tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are (§7.4).
* (3) A composed `Wing` has no kind to lose — its roof construction is re-chosen on the carried ring (§8.6).
* (4) The check adds every carried composition ring simple and counter-clockwise, the composed wings uniting to the
  footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the face and every tower centre inside
  or on it (exact `orient2d` tests).
* (5) The undo record keeps the former composition with the former wing rings (§7.4).

A failure inside a warp or `moveVertex` halves the step, as for the wings; after any other batch — where rule 1 makes it
as rare as for the wings — the stored composition's fate is **orphaned** (§7.3 item 4): the dry run lists it, the edit
that stored it stays in the log and in the document's orphan table, the record is dropped and the building composes
lazily from its carried wings until the user re-attaches or discards the edit — never silently. Wherever this document
names a building's wing rings as carried, re-based, excepted from locality or restored — §2.2 rule 5, §4.6 step 7, §5.3,
§7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4 — a stored composition's rings, wings and tower centres are
included, by this rule.

**Test.** "§2.6's test" — the B-EDIT fixture that exercises this rule (warps and vertex moves over L, overlapping T,
curved-row and holed footprints and a hand-built stored composition; generation equal to regeneration on a compound
whose garden edges end on the house wall) — is stated in §13.2 (and §7.3 item 7 (vi)). Receipts for the carry under
0.25–8 m displacement fields: `docs/validation/bench/fixall_pipeline_r4_wings.py` → `.out`; for the cost and the
pairing's agreement with the full edge test: `fixall_pipeline_r5_wingcost.mjs` → `.out`.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. One per-entity function, `deriveBase(entity, sampler)`, computes every ground datum, and S11, S7, S1's
terrain operator (§7.3 (a)) and the edit layer after a warp or vertex move (§7.4) all call it: a wing's `baseCm` from the
terrain sampler (bilinear on the refined 2.5 m raster at the wing's vertices and centroid) is `max(samples) + plinthCm`
(table, default 30 cm), so no floor is buried; the fall under the wing (`max − min`) is a foundation skirt the 3-D export
extrudes down to the terrain and the shadow pass includes. Where the fall across a row footprint would exceed
`skirtMaxCm` (table, default 300 cm) the footprint is split along the contour into stepped wings, each within the limit
— terraces step down a hill instead of floating. Walls store their base as a knot profile along the trace (§2.2 rule 5),
gates and towers their own base from the samples under their footprints, bridges and pier decks a deck height from the
two bank elevations plus a clearance row. Shadows and the 3-D export (§11.1) read the same numbers, so they agree on any
terrain. The shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the
display list's shadow hook (§8.1) and its budget (§8.4, §12). The heights acceptance bar is §13.2's.

**Materials (COV-FTG-F20; item 19; owner, 2026-09-26: "different materials for construction is only represented by a change
in texture or color. It has nothing to do with the shape").** A material is a **rendering attribute only**: it changes the
texture and colour roles the style sheet maps it to (§8.2) and never a footprint, a wing, a storey, a height or a roof form
— the same geometry renders in any material, as in FTG; shape is decided by the designation template and prosperity alone
(§4.7 S11). `MaterialRow` is a rule table read by S11 whose **default rows reproduce FTG's model** (item 23): one default
material per growth stage (`key.stage`), overridden per district kind and per building class (temples and churches stone
by row), with wealth shown through the lifestyle-banded building pools (§10.2) and the roof-colour role by band in the
style sheet (§8.2) — never by a material keyed to the prosperity band. The **optional regional shift** — rows marked
`extension: 'regionalShift'`, off by default, a preset row (D-2) — may shift materials with the prosperity band within
what the region builds with, never as a universal ladder. A district's `materialOverride` and a building's `setAttr`
override the rows; enceintes carry their own wall material (§2.7). Wear (`Building.condition`, item 31) and a roof lost
late (`RoofSpec.kind 'none'`) are rendering classes over the same geometry (§8.2). Test: a material change leaves the
geometry subtree of the digest unchanged (§13.2).

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the
naming engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come
from the class table and are what the simulation module reads. `SubLocation` records (named parts of a building with
tags and capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table
when the building is created; stage-3 rooms refine them (a `Room` may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). The interface is split so the city view never waits for a manor: `outline(input)` returns the wings
every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged, with heights and roofs added — and
`compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
tile at district LOD and finer (a tile draws the outline until its compositions arrive). Their budgets — the base
`outline()` inside S11's geometry share, a stage-3 `outline()`'s admission bound and the re-declaration of S11's §12.4
row by the measured difference, `compose()` per building and per tile — are §12.7's. **The stage-3 contract:** the
union of the composed wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical
footprint hash at every LOD holds by construction (its test: §13.2). The contract reads the wings' **ground rings**: a wing
that spans a passage (`Wing.spans`, item 30) contributes its ground ring, the passage face lying outside the union at the
ground and inside the wing's extent above it. Composed rings stand at least `attractCm` apart except where they share a
joint (§3.6's attraction), so the plan rung's transient arena inserts them unmoved (§3.4). **Its fourth rung** (item 28):
per storey, the union of the plan's rooms equals the union of the rings of the wings that reach the storey (the plan rung,
below; §3.10's seed-tiling row).
* **Stage-3 intake measurement and fallback.** The stage-3 intake measures the generator's `outline()` time per building
  class on B-CITY METROPOLIS seeds. If it exceeds §12.7's 10 µs median, `outline()` runs the generator's own massing step
  only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base `OutlineBuildingGenerator`
  keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must union to the base outline).
  Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed by the context vector),
  not of the generator. The intake also runs §2.6's test with every fixture building's composition stored (§13.2), so a
  stage-3 generator is admitted only with compositions the base can carry.

**Entrances (owner, 2026-09-26: "larger buildings can have more than one entrance. there should always be a street facing
entrance. back or side entrances if an alley presents itself are optional or random but limited. back entrances in the
case of a larger court or yard is recommended"; item 29 (a); J-A29.21).** A building's doors are a set, `Building.entrances`:
each a named footprint vertex (`('entrance', building id, i)`, indexed, §2.2 rule 7) on the wing that faces its way,
carried through every change of the footprint by the wing-carrying rule (above), and derived by one per-entity function,
`deriveEntrances(building, plot, template row)`, that S11 (§4.7), the designation mutator (item 18, §4.7 S11 — a house
that becomes a shop gains its street door; a shop that closes keeps the door as a house door) and the edit layer
(`setEntrance`, §7.1, §7.4) all call, as `deriveBase` is called; its draws are the `siteplan.entrance` concern (§6.1), so
re-deriving the doors disturbs no site-plan draw. The rules are defaults; the rows are the designation template's
`entrances` columns (§10.2; item 23: the parity presets give one street entrance per building — MFCG's and FTG's rule —
with side and rear probabilities 0):
1. **One main entrance, always street-facing.** Exactly one entrance has role `main`. It lies on the plot's frontage access
   edge, 3 ± 1 m from the corridor (FTG's measured rule, §4.7 S11, §13.5), and faces the street. A set-back building on a
   multi-building plot (a compound's hall behind its forecourt) puts its main entrance on the court or the path that
   leads from the plot's street gate (`PlotBound.gates` on the frontage: the plot itself always has a street-facing gate or
   door); a hidden plot's main entrance faces its access face — the court or the passage (item 30, §4.6).
2. **Side and rear doors only where an access edge presents itself.** A `side` or `rear` entrance is drawn only where the
   plot has an access edge beyond its frontage — a lane, a through-alley, a back lane or a passage face (S8's interior
   treatments and S10's alley rung, §4.6, §4.7) — with the row's probability by class × size × band and capped by the row
   (`capSide`, `capRear`: one side and one rear door for ordinary classes; hovels and row houses ≈ never; shops and inns
   often on a corner; workshops and warehouses toward the lane); `service` entrances for institution classes, one per
   court side the row allows.
3. **A yard door is recommended.** When the plot's `yard` parts behind or beside the building reach the row's
   `yardDoorMinM2`, a `yard` entrance opens onto the yard or court by default — a kitchen or service door, never a public
   entrance.
4. **Every entrance is an addressable vertex.** Add, move and remove are building edits (`setEntrance`); the main entrance
   moves only along its street-facing side and is never removed; entrances are re-derived when the designation mutates
   and kept where an edit fixed them (§7.2).
5. **The plan opens a door at every entrance** and roots its circulation at the main one; side, rear, yard and service
   doors are secondary roots, so a plan may legitimately have more than one way in (the plan rung, below); the two ends
   of a reserved passage are entrances onto it (item 30).
§5.3's rows: exactly one main entrance per building, facing its street or court; no side or rear entrance without an
access edge beyond the frontage. Test: §13.2's entrance bars on B-CITY-lite.

**Basements (owner: "selective but appropriate basements"; item 29 (b); J-A29.22).** `Building.basement` is derived by
the same function, never rolled alone, from: the class row's `cellar` columns (§10.2 — the base probability by class:
cellars for inns, taverns, breweries, storehouses, manors, keeps and temples by row, none for hovels, tents and sheds; the
kind weights; the slope threshold `slopeCm`; the rock cost), raised within the class band by the prosperity value and by
the building's size and storeys (larger and taller more likely), and gated by the **terrain**, read from §2.3's facts
and the context vector — no new raster: no cellar where the plot's `terrainClass` is `damp` or `flood`, or where the
cellar floor — the wing's `baseCm` less the cellar depth (a basement table value, default 220 cm; §7.6) — would lie below
the **water table**, which is the nearest water body's surface elevation (its shore's terrain sample) plus a freeboard
(50 cm) for a plot within `waterTableM` (40 m) of a shore, and elsewhere the height of the nearest `hydro` cell under the
footprint whose `flowAccum` passes the drainage-line threshold (§2.3); a **half-cellar** where `terrainClass` is `low` or
the floor would fall inside the freeboard; a **walk-out** cellar where the fall under the footprint exceeds the row's
`slopeCm` (the same samples `deriveBase` reads — the skirt facts); `rock` lowers the probability by the row's cost. The
basement lies inside the ground storey's wings and smaller than their union (`Basement.ring`, inset by the table's
`insetCm`, default 60), has its own storeys (`Heights.floorsBelow`; its floor `baseCm` less the depth per storey) and
is joined by the stair core, a trapdoor or an outside stair (`Basement.access`, read by the plan rung). It is editable
(`setAttr(basement)`, §7.1; an edited basement is kept through terrain changes, §7.3 (a)) and re-derived when its terrain
gate changes. **A cellar never joins a sewer as a room** (item 12: underground neighbourhoods front sewer tunnels only;
J-A12.42): a cellar stair down to a tunnel is an `AccessPoint` record (II.7.4), allowed where the class row's
`undergroundAccess` is true. Emulation note: MFCG and FTG have no cellars; Dwellings' basement share is a descriptive
baseline only (§13.5); the terrain gate and the prosperity term are our extensions (item 23). §5.3's rows: no cellar
under the flood band; every basement inside its ground-storey footprint and smaller than it.

**The plan rung — the fourth rung of the building ladder (owner, 2026-09-26: "a coherent floor plan of the building …
taking and tailoring to the building type and function"; item 28; J-A28.21; the Dwellings synthesis,
`research/findings/dwellings-synthesis.md`, ideas only).** Stage 3's ladder is outline → wings → rooms → plan
(`Composition.lod`); the plan is the building's floor plan per storey, derived by `BuildingGenerator.plan` from the
composed exterior and the building's content — never from a shape of its own — and staged with the Fantasy-Manor
buildings in the owner's order. The base carries the records above, the step's signature, the streams (§6.1), the events
(§7.1), the elaboration record and cache (§2.8, §2.9), the trigger policy (§4.1), the draw, export and budget rows (§8.5,
§11.1, §12.7), F-PLAN (§5.2) and §13.2's bars; adding the rung later is a registration. It runs **function first** —
the reverse of the reference's partition-then-label:
1. *Inputs — nothing is rolled.* The wings that reach each storey (`BaseWing.ring` or the composed `Wing.footprint`, with
   `Wing.spans` at level ≥ 1), each wing's `Heights.floors`, the basement (`Basement.ring`, `Heights.floorsBelow`), the
   entrance set, the composed towers, courts and porch, the class and its designation template's `programme` row (§10.2,
   read at the occupants' band — the plot's field band, J-A19.43), the use, assignment and sub-locations (one room each),
   the households housed (`Building.households`) and a reserved passage (`Wing.spans`). A plan is therefore a pure function
   of the building's committed state and its own streams (§4.1's contract, §6.2).
2. *Programme.* From the programme row and the interior ladder (below): a `ProgramRoom` list — each household's unit at
   its ladder row's form, the shared, service and staff rooms the row allows, the class's own rooms (a smithy's forge, an
   inn's common room, a chapel's nave), one room per sub-location — each sized in m² (the row's triple × the ladder row's
   size factor, interpolated along the occupants' value) with its storey rule, exterior demand, opening kind, adjacencies,
   hearth and priority; counts by the row's law (`const`, `perStorey`, `perHousehold`, `perCapacity`, `perSubLocation`; a
   fractional count drawn on `plan.program`).
3. *Allocation and anchors.* Each storey's capacity is the area of the wings that reach it less the row's circulation
   share; hard rooms go by their storey rule, soft rooms by priority until the capacity is met, the household units first
   (F-PLAN tier 0, §5.2: a unit falls to the next poorer form before anything is dropped, and no tier drops a unit). The
   **stair core** (`StairCore`: a bay of the wing the row's `stair.placement` names, or the composed tower as a spiral) is
   placed before any cut and serves every storey of its wing, the basement by the row's `basementAccess`; the entrance
   rooms (one per entrance), the hearth rooms and a reserved passage are anchors fixed in their wing and side before any
   cut, so stairs are stacked by construction.
4. *Partition to targets.* Each wing of each storey is cut on the rung's **transient arena** (§3.4; J-A28.31) — its seed
   rings the storey's wing rings, its fixed rings the stair core's bay, the chimney stacks, the passage and the composer's
   rooms — by the storey's **layout pattern** (`LayoutPattern`, a weighted row per storey class in the programme row:
   `bisect`, recursive cuts across the region's short axis from a re-entrant corner where one exists; `follow`, cuts parallel
   to the long sides — a gallery on the court or street side; `spine`, a corridor along the wing's axis with rooms off it,
   the lodging house's and the inn's upper floors; `hall_and_parlour`, one cross cut with the hearth room larger;
   `cross_passage`, a through passage at the entrance with rooms either side; `enfilade`, rooms in a row with aligned
   doors; `nave`, one room), with the remaining rooms' target areas as the stop rule and the pieces assigned to programme
   rooms as they are cut, so no room waits for a label. Cuts are planned on a **wing-local module** — a table row, default
   50 cm, in the wing's OBB frame; the planner's grid, never a second lattice — and written back as world lattice points
   (`Room.ring`), so walls are exact centimetre polylines, never cells; slivers and one-bay strips merge into circulation.
5. *Circulation and openings.* The room graph is built as a spanning tree first — priced by the programme, the pattern's
   hub (the spine, the hall, the stair hall) preferred, a bedroom's or a store's degree capped by its row — and loops are
   added by rule, never by chance (a kitchen to the yard door; a hall to the parlour and the stair; an enfilade's
   doors); a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item
   29 (5)); stair-core doors on every storey it serves; each unit's own entry door (the ladder, below); a `passage`
   opening at each end of a reserved passage (item 30). Openings and windows are records on wall segments.
6. *Exterior coherence.* Per storey the union of the rooms equals the union of the rings of the wings that reach it (the
   contract's fourth rung, above; a wing of fewer floors is roof at that level; a basement's outline is `Basement.ring`);
   chimneys are derived from hearth columns and rise to the roof (`Chimney`, drawn by §8.6); dormers are placed from the
   top storey's roofed rooms with exterior demand (`Wing.dormers` becomes derived, one per such room's façade bay, capped by
   the eave length); the porch sits at the main entrance; a composed tower is a round room per storey with the spiral
   inside (`radialSplit` for two); windows follow each room's exterior demand, one per façade bay of its exterior wall,
   aligned across storeys where a wall stacks; furniture is abstract shapes by role from the row's `furnish` columns,
   never blocking an opening or the stair bay. Materials stay texture only (above).
7. *Streams, re-rolls, edits, failure, cost.* The rung's four concerns — `plan.program`, `plan.layout`, `plan.roles`,
   `plan.furnish` — are keyed with the rung's own reroll (§6.1): New random on `plan.layout` (`regenerate` with `rung`,
   §7.1) re-partitions and keeps the wings, the entrances and the stair core; on `plan.roles` re-assigns roles and what
   hangs off them (windows, door kinds, furniture) and moves no wall — the reference's restrictive re-rolls as our own
   rule. Room roles, walls, openings, windows, the stair core and a room's unit are events scoped to the building (§7.1:
   `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`; a room
   is lockable on its path); the first plan edit stores the composition, whose rings `carryWings` carries with the wings
   (above). A programme that does not fit is F-PLAN's (§5.2), per building, never whole-house. **Rooms are values**, never
   L4 faces, so a click changes no plat and no digest (§6.2). Cost: one plan per click within §12.7's row; the room graph
   is exported in our own schema (§11.1).

**Elaboration by click, and the rung states (owner: "once generated it is saved … until something changes in them from
the simulator"; item 28 (b)–(c); J-A28.22).** When a rung is derived is the viewer's `elaborate` key (§2.9; `click`, the
owner's default, or `view` within §12's budgets — §4.1 states the policy); what it derives is fixed. Per building and per
lazy rung an **elaboration record** (§2.8) holds the state `absent` / `current` / `stale` / `edited` with the digest of the
rung's recorded inputs; a batch that changes one of them marks the rung `stale`, the cached result stays on view with a
change marker at every zoom (§8.5), and the next click re-derives it as a mutation from its **canonical prior** — the
stored plan where one exists, else the as-built plan carried along the interior ladder (below) — never from the cache
and never by a re-roll (§7.3); viewing never re-derives a `current` rung. Pre-assigned plots are the eager content
decision of §2.5 and §4.1: assigned at the city level, "just not generated" until the click.

**The interior ladder — the interior has no floor (owner, 2026-09-27: "following on the fact that we put a floor to the
geometry regarding prosperity, that does not mean the interior has to be … same building geometry but not the interior";
item 28 (f); J-A28.23 – J-A28.27).** Item 31's geometry floor bounds what is BUILT: a plot's shell never reads poorer than
its `geometryFloor` by wealth change alone (§4.11). The interior reads WHO IS THERE: the plan rung's programme is written
for the **occupants' band** — the plot's prosperity **field** band and value (`ContextVector.prosperityBand`,
`prosperity`; J-A19.43, J-A31.43), never the manifested band and never `geometryFloor` — and for the household count
(`Building.households`), and the plan is re-cut inside the unchanged shell as they change. So a mansion district that grows
poor keeps its big shells while their interiors fill with families; the poor of a developed town live in re-cut interiors
behind grand fronts (this rule), in the back courts behind them (item 30, §4.11 rung 2) and in the cheap stock of the edge
(item 27's shanty rule, §4.5). The rule is **one table**, keyed by the band names of §4.5's band set (`FieldBands.bands`;
its middle row is the band `FieldBands.middle` names, so the shell's floor and the interior's middle agree per settlement),
read at the occupants' band and interpolated along the value inside a row; the per-class programme rows (§10.2) follow it
and add what a class needs. Default rows (our own; calibratable, §13.9; tendencies changeable per region and era, item 23 —
no reference has interiors that follow their occupants, and with no epoch every building houses its template row's
`households.built`, so the static baseline is unchanged):

| band (the default set) | form of one household's unit (`UnitForm`) | households per shell (clamped into [1, capacity]) | the unit's rooms (scope `unit`) | shared rooms (scope `shared`) | staff rooms (scope `service`): count; size as a share of the owners' principal chamber's target; placement | circulation (scope `circulation`) | room-size factor |
|---|---|---|---|---|---|---|---|
| `rich` | `house` — the whole shell | [1, 1] | hall, parlours, chambers, a solar, kitchen with hearth, buttery and stores | none | staff chambers, one per two principal chambers; 0.35; in the attic, the basement or the service wing, never beside the owners' rooms on a storey that has them | few corridors: a stair hall; `enfilade` or `hall_and_parlour` | 1.25 |
| `prosperous` | `house` | [1, 1] | hall or parlour, chambers, kitchen with hearth, a store | none | one staff chamber; 0.40; the service side or the attic | a stair hall | 1.10 |
| `comfortable` (the middle) | `dwelling` — a kitchen with hearth, a parlour and chambers | [1, 2] | kitchen, parlour, chambers | none: two households divide the shell by storey or by wing, each with its own door off the stair hall | none | a stair hall | 1.00 |
| `modest` (the lodging house) | `lodging` — a chamber and a parlour | [2, capacity] | chamber, parlour | a shared kitchen with hearth on the ground storey by the stair core; a common room where the class row allows | none | a corridor or stair hall inserted so that every unit has its own door (`spine` on the upper storeys) | 0.85 |
| `poor` (the tenement) | `apartment` — a bedroom and a small cooking place | [3, capacity] | bedroom, cooking place (a hearth where the class row allows) | shared facilities where the class row says | none | a double-loaded corridor (`spine`) on every storey, the stair core its hub | 0.65 |
| `squalid` (destitute) | `room` — a single room off the corridor | [4, capacity] | one room; no cooking place | shared facilities, or none | none | `spine` | 0.50 |

* **The dwelling unit (J-A28.25).** Every room of scope `unit` belongs to exactly one household (`Room.unit`); `Plan.units`
  lists each household's form and entry door; a household's unit is the rooms of its building's plan carrying its id
  (§2.7). **The unit-door rule:** each unit has its own entry door onto circulation — a corridor, stair hall or landing —
  or onto the street (an entrance), and never opens through another unit's room (§5.3's row; a `setRoomUnit` or plan
  edit that would break it is refused, F-EDIT, §5.2). Shared and service rooms open onto circulation. Units are given to
  households in address order by default; `setRoomUnit` overrides.
* **One capacity function (J-A28.23).** `capacity(b) = min(households.max of the designation template at the plot's
  builtBand (§10.2), floor(Σ over the storeys at or above the ground of Σ over the wings that reach the storey of
  area2(ring) × (den − num) ÷ (2 · den · minRoomCm2)))` — `area2` the exact integer twice-area of §3.2 (6), `num/den` the
  programme row's circulation share as an integer fraction, `minRoomCm2` the `room` form's minimum area (the `squalid`
  row's single room, the class row's `area[0]` in cm²); basement storeys excluded. Every host computes the same integer.
  S10b's fill at generation (`households.built`, §4.7), §4.11's `relet` and F-PLAN (§5.2) read this one function, so the
  solver and the plan never disagree on how many households a shell holds. The capacity is the owner's "the more rooms for
  more occupying families the richer a building gets", read on the building: a shell built richer has more rooms to let —
  its `households.max` rises with `builtBand` — while the households actually housed follow the occupants' band.
* **Never omit a household.** The count the plan must house is bounded by the capacity, which is computed with the
  smallest form, so the `room` form always fits: a unit falls to the next poorer form (`house → dwelling → lodging →
  apartment → room`) before any room is dropped, and no tier of F-PLAN omits a unit (§5.2, J-A28.51); a hand `relet`
  above the capacity is refused (F-EDIT).
* **The re-cut, both ways (J-A28.26).** A change of the occupants' band or of the household count re-cuts the plan as
  item 18's mutation applied to rooms. FIXED: the wing rings per storey, the stair core's bay, every entrance and its door,
  the hearths and chimney stacks, the reserved passage cells and the basement ring — passed as `fixed` rings to the
  transient arena (§3.4; J-A28.33). RE-DERIVED: partition walls, corridors, doors, roles and units. LEAST DISRUPTION: a room
  whose wing ring is unchanged and whose ring fits a role of the new programme (its area inside the role's [min, max], its
  storey rule met) keeps its ring and address even when its role or unit changes; a shell mutation by item 18 keeps
  nothing in the wing that changed. Re-uniting the households removes what the subdivision added. **The canonical chain:**
  the plan for (band row r, count n) is derived from the **as-built plan** — the class's programme at the plot's
  `builtBand` row with the template's `households.built` — by a fixed order of least-disruption steps, each a re-cut from
  the previous step as its `prior`: first the ROWS, one band at a time from the built row toward r along `FieldBands.bands`,
  the count at each step clamped into that row's household range; then the HOUSEHOLDS, one at a time from the clamped
  count to n. The result depends on (r, n) alone — never on when a click, an epoch or a `relet` reached it (§6.2, §6.5 (9);
  each step's draws keyed by its target, §6.1; the cache memoises steps, §2.9) — and a return to the as-built row and count
  is the as-built plan exactly. A STORED plan is instead re-cut inside the event that changes its inputs, around its edited
  and locked rooms, with the inverse recorded (§7.3, §7.4; J-A28.72). Each step is one open, cut and read-back of the
  transient arena, counted by §12.7's plan row.
* **Staff and shared rooms (J-A28.27).** Staff rooms are dwarfed beside the owners' — their size a share of the owners'
  principal chamber's target (the row's column) — and sit where a house keeps its service: the attic, the basement or the
  service wing before a storey the owners' rooms occupy; a lodging house's shared kitchen or common room sits on the
  ground storey by the stair core, the circulation hub. Both are programme rows (`scope` `service` and `shared`), so a class
  or a culture may keep a common kitchen down to the poor row or drop it earlier.
* **Editable.** A room's unit (`setRoomUnit`), its role and walls (the plan events) and the household count by hand
  (`relet`, a `convert` on the building, §7.1) are events; the ladder's rows are §7.6 tables.
* **Bars (§13.2).** When a building's occupants' band falls two rows, the re-cut plan houses every dossier household with
  its own door off a corridor or stair hall, inside the same wing rings, with the stair core unmoved (the owner's bar);
  the shell's leaf digest — wings, entrances, heights, roof, basement — is byte-identical across every re-cut; re-uniting
  the households restores the earlier plan where nothing else changed; every band of the set maps to a row that names
  its unit, shared, staff and size columns; after a district's two-band fall every roster household is housed without a
  new plot.

=== REPLACE ### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===
### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain, a ring or an open chain */; closure: 'ring'|'shore' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline for every "enclosed" and "sealed" test */;
  anchors?: { end: 0|1; on: 'shore'|'bank'|'cliff'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of an open chain */;
  waterfront: 'open'|'quay_wall'|'sea_wall' /* a preset row: open (MFCG's default and FTG's captured open chain: no wall along quays and beaches), quay_wall (a wall along the waterfront) or sea_wall (a full wall); where their water gates stand is §4.4 S5a's */;
  placement: 'aroundAll'|'aroundStage' /* aroundStage walls only a stage's new ring, anchored on the previous enceinte (FTG's "around stage lots") */;
  strips: { inner: FaceRef; outer: FaceRef } /* the two L1 wall-strip faces S7 cuts off beside the trace (§4.8): inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's step (0) (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm; heightCm: Cm; base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable (below) */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  supersededBy?: Id /* item 8: the shorter inner ring that replaced this one (§4.11's contractWall); the old ring's record stays live and its line persists as a trace */; gates: Id[]; towers: Id[]; moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4); a dry ditch is residue, never this field (§4.7 S10 (0), §4.8) */; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef;
  banks?: [VertexRef, VertexRef] /* a water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace; the wall's edge between them lies across the water (§2.2 rule 7); held under a warp unless fromLevel = 0, as a Bridge's deck ends are (§3.6) */ }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef } }   // a wall tower; a composition's tower is §2.6's ComposedTower
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey' */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id /* the castle moat WaterBody */;
  surround: 'none'|'esplanade'|'park'|'plaza'|'cliff' /* the surround row (§4.8): esplanade, park with a perimeter path, plaza, cliff skirt; a moat is the separate `moat` field */; siteScore: number; template: string }
interface Bridge { id: Id; state: 'site' | 'built' /* site: two pinned bank vertices, no span, no way, no furniture, not drawn; built: a way's span laid through them */;
  way: Id | null /* the way whose L1 edge between the two deck ends is the span; null while a site */;
  deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; once built, its span carries the structural `deck` role (§2.2 rule 7); held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve'|'added' /* who emitted the deck: S1, S3, S5a, a carve edit, or the one L0 shore-split batch of a deck no site offered on standing water (§4.2 S1 (5)); a deck F-ROUTE's extra-bridge rung sites inside S1's water operator or a carve takes the value of that operator's other decks */;
  spanCm: Cm; deckCm?: Cm; kind?: 'stone'|'timber'|'draw'|'ford'; piers?: number /* deckCm, kind and piers are set by S7 when the bridge is built (§4.8) */ }
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way: Id; strip: FaceRef /* one half-corridor strip on the planting district's own side */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */;
  overrides?: { seq: number /* the instance event */; at?: PointCm /* the current position of a move's `to` or an add's `point` */; recorded?: PointCm /* a line layout's recorded generated point */ }[] /* written when the instance event applies, moved only by a warp or vertex move (§7.4); model data, hashed with the entity; every kind that carries an `instances` mark has this field, per the entity registry */;
  lifecycle: Lifecycle }
  // tree instances are generated at render and never stored (§8.1, §8.10); overrides are `instance` events (§7.1) whose current positions `overrides` holds (§7.4)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve';
  face: FaceRef /* L3 faces inside the hinterland's blocks: furlongs, lots, woods (§4.9) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number };
  reclaimed?: { from: 'marsh'|'foreshore'; epoch: number } /* item 25: ground won from water by a reclaim conversion (§2.3, §4.11) — a trace the style sheet may draw */ }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp';
    point: Point /* moves with its host face under a warp or a vertex move (§7.4) */; host: Id /* the yard, square, corridor or plot face */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
// Labels are the model records LabelEntity and QuarterNode of §9.1
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id; roster: RosterRef; name: NameRef; reservation?: Id;
  knownTo?: 'public'|'local'|'secret' /* item 30: a dossier fact (§7.7) or an edit, defaulting from its plots' exposure; a local or secret institution prefers hidden plots (§4.7 S10b) and, underground, a cellar stair (II.7.3) */ }
interface Use { id: Id /* the address: moves with the use when it relocates (§6.3); a building keeps its own */; cls: string /* the roster class it is (§10.2's BuildingClassRow.id) */; specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19) */;
  plot: Id; buildings: Id[] /* the building(s) it occupies — several for a compound or a joined plot */; assignment?: Id; owner?: Id /* household | business | institution */; pinned: boolean /* item 17 (d): stays under an epoch, the town adapts around it (§7.7) */;
  opened: { epoch: number; seq: number }; closed?: { epoch: number; seq: number }; lifecycle: Lifecycle }   // item 17: a use is separate from the building that houses it — it opens, closes and relocates (§4.11's use step; §7.1's openUse / closeUse / relocateUse) while the building persists, vacant or re-let; Building.use points at it (§2.6)
interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared, dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document, changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance toward nearby building (§4.11)
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id /* its dwelling unit is the rooms of that building's plan carrying its id (Room.unit, §2.6; item 28 (f)); its interior is cut for the plot's field band, not for `wealth` (J-A28.24) */; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'; seats: Id[]; turf?: Id[]; influence: number; secret: boolean;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id }
// The relation store (FTG-9; when it is materialised and persisted: §10.1, §10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[] }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
// The owner-staged layers' records (floating islands and sewers, II.6): schema-complete, empty in the base
interface SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river it echoes */; relief?: 'echo'|'own' };
  key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason: 'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean }; occlusion: 'opaque'|'ghost'|'offset';
  supply: { town: number; carried: number } /* item 10: the two prosperity values II.6's supply law read (S_town, S_carried) */; areaHa: number /* the supported area the law gave */; state: 'floating'|'waning'|'settled'|'fallen' /* II.6's island lifecycle over epochs (§4.11) */ }
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage' /* a walkable side passage of the network — not item 30's surface passage face (§2.5) */; centreline: ChainRef /* ('tunnel', id) in the underground arena */;
  widthCm: Cm /* the bore; the corridor half-width is widthCm ÷ 2 + the profile row's wall thickness (II.7.2, §3.7) */; headroomCm: Cm /* II.7.2's profile row */; navigable: boolean /* derived from widthCm and headroomCm against II.7.2's thresholds when the tunnel is made or edited, and stored: what may carry underground plots (item 12) */;
  invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string;
  closure?: 'collapsed'|'sealed' /* item 11: how a ruined tunnel closed (§4.11's tunnel ladder) */; lifecycle: Lifecycle /* its condition — in use, neglected, caved in, collapsed, sealed — is a reading of existence and closure through II.6's condition table (whose open column says whether plots may front it, II.7.3), never a second stored state; a setAttr on the condition is the matching convert (§7.1; J-A11.21) */ }
// AccessPoint — a stair, shaft, well, cellar stair or grating linking the ground and the underground by entity ids — is declared with its mechanism in II.7.4 (R12) and listed in §2.8's entity registry; its tunnel-side vertex carries the `access_point` role (§2.2 rule 7)
```

People are derived, and never materialised in the document unless an explicit edit pins them (§10.3); which people a
user has opened is per-user view state (§2.9), outside every digest. Content references geometry by id and never the
reverse, so the map can be regenerated without deleting content and content re-solved without moving the map.

**Both faces of a wall are unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the
invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer
setback (§4.4). How S5a lays open traces, waterfronts and stage rings is §4.4's; how S7 cuts the wall strips and builds
bands, towers, gatehouses and the castle is §4.8's; how bridges are sited, built and kept as sites is §4.2 S1 (5)'s and
§4.8's (COV-FTG-G09, COV-FTG-G10, FTG-8).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag
(COV-FTG-B12); `Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries
a generated pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08);
the relation store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes
raw-resource availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27),
`Greenery.species` the species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12),
and `Pin` the complete furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall
(COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07). The placement rules are in §4.7 S11 and
§4.9.

**The staged layers (AM-2, DEF-7; items 10–15).** `SkyIsland` and `Tunnel` give the owner-staged layers their data model
now: an island exists **only where prosperity supplies it** (item 10; II.6's supply law — none without it, its area from
the carried districts' and the town's prosperity, its altitude from the town's, only at CITY and METROPOLIS and never
certain, items 13 and 15) for one of two reasons (`reason`) — a very prosperous neighbourhood or set of neighbourhoods,
or a unique institution (a palace overlooking the land, a cathedral, a prison) — by rule or by assignment, may carry its
own terrain that echoes the ground's (`terrainEcho`: a conjured river with the ground river's bearing), wanes, settles or
falls as its supply fails (`state`, §4.11) and has no relation to the underground layer; a tunnel records what it drains
(`serves`), where it falls (its invert profile), where it discharges (`outfall`), whether it is navigable and how it
closed — the underground fades like the walls, caving in or being sealed, never demolished by the engine (item 11); the
underground neighbourhoods along navigable tunnels are ordinary blocks, plots and buildings on the underground arena
(II.7.3; §2.1, §2.2 rule 1), reached through `AccessPoint` records (II.7.4). Their rules are II.6's and II.7's.

=== REPLACE ### 2.8 Identity, lifecycle, provenance, the entity registry ===
### 2.8 Identity, lifecycle, provenance, the entity registry

Every entity record has five parts — and a kind with lazily derived rungs (a building, a stage-2 close-up) a sixth, its
elaboration record (below; item 28): an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest), its
**attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's owner
and role tables, never through stored slots), a **derivation record** (the inputs of its derivation — persisted for the
kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived —
rebuilt by every derivation, never persisted, never in the model digest; LC-25). An entity that carries a generated name
also persists that name's **naming record** (the naming inputs of its last draw — outside the model digest). The
persisted derivation and naming records form the snapshot's **records digest** (§6.2), checked at every in-window load
and by the verification replay (§2.9 step 3).

```ts
// @plat/model
type Hash64 = [number, number]; type Hash128 = [number, number, number, number];   // u32 lanes
type LineageHash = Hash64;
type PointCm = LatticePoint; type Point = PointCm; type VecCm = PointCm;             // one point shape (§2.2), three names
type Polygon = PointCm[] /* one ring */; type PolygonCm = PointCm[][] /* outer ring, then holes */;
type M = number /* metres: a derived or reported length, never an arena coordinate */; type Cdeg = number /* i32 centidegrees */; type CmArray = Int32Array /* integer centimetres per element */;   // unit-branded types (§2.1)
interface Identity { id: Id /* address id, §6.3 */; kind: string; parent?: Id /* containment parent: a field, never parsed from the id */;
  key: PlatKey /* the arena: layer and part, §2.2 */; lineage: LineageHash /* stream identity, §6.3 */; reroll: number /* reroll count of this entity as a derivation unit, §6.1 */;
  dossier?: DossierRef /* item 20: the dossier element this entity exists for (§7.1's DossierRef, set by the host door, §11.4) — persisted identity in the model digest; such an entity is never removed by a map edit, only rejected from a site (§7.7) */ }
type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'cleared'|'reused'|'demolished';   // cleared and reused: item 8's traces (the decline hooks, below; J-A8.46)
interface LifecycleFlags { locked: boolean; pinned: boolean; edited: boolean; assigned: boolean;
  lockedPaths?: string[] /* attribute-level locks (§7.2); absent = the whole entity */; editedPaths?: string[] /* attributes the user set; each is implicitly pinned (§7.2) */ }
interface Lifecycle { existence: Existence; flags: LifecycleFlags; since: { epoch: number; seq: number } /* the event that last changed `existence` */ }
interface LifecycleEvent { id: Id; seq: number /* the causing EditEvent's seq; 0 for the generation run */; epoch: number;
  kind: Existence | 'lock'|'unlock'|'pin'|'unpin'|'edit'|'assign'|'unassign'|'reparent'|'carry'|'supersede'|'resurrect'
    | 'open'|'close'|'relocate' /* item 17: a Use opened, closed or relocated; detail.from / to name the buildings */ | 'mutate' /* item 18: a designation mutation; detail.mutation names its record */
    | 'reject'|'lapse'|'place' /* item 20: a placement rejection, its lapse, a positive placement (§7.7) */ | 'relet' /* item 31 rung 1: the household count changed (§4.11); the plan rung goes stale */;
  cause: EditRef | RuleRef | 'generation'; detail?: { from?: Id; to?: Id; lineageFrom?: LineageHash; lineageTo?: LineageHash; path?: string; mutation?: number /* index into the causing event's mutations (EditBase.mutations, §7.1): the MutationRecord of §4.7 S11 */ } }
interface Tombstone { id: Id; kind: string; lineage: LineageHash; supersededBy?: Id; seq: number; last: Uint8Array /* the compressed last record: orphan reports, resurrection (§6.3) */ }
interface DerivationRecord {            // the one definition: persisted with plots, blocks and buildings (the kinds whose stage declares it); outside the model digest, inside the records digest (§6.2)
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the recorded band hysteresis reads */;
  allocationRow?: number /* the Allocation row the entity filled (§4.5 S7b) */; epoch: number /* the epoch of the derivation that wrote it */;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */ }
interface NamingRecord {                // persisted with every generated name S13a draws; outside the model digest, inside the records digest (§6.2) and hashed with provenance; handed to a successor with the name (§6.3); dormant while the name is protected (below)
  slices: SliceRef[] /* the naming slices the last draw consulted: the grammar rows and weight vectors of the effective naming table, and, for every culture or ancestry row that chose a grammar or a corpus for it (§10.4), one slice per field of that row the draw read — kind 'row', key '<rowKey>/<field>', hashed over the field's value and, for a corpus field, the named corpus's content hash (§7.6) */;
  salt: number /* the naming salt the last draw used: the town salt, or the per-entity salt of the ids-scoped rerollLayer that drew it (§6.3) */; epoch: number }
interface Provenance {                  // derived: rebuilt by every derivation and by replay; stored as columns; never persisted, never in the model digest
  run: StageRunRef;                     // index into the stage-run table { stage, outputVersion, tablePins } — interned once per stage run, not copied per entity
  attempt: number;                      // the ladder attempt that committed it (§5.1)
  rules: SliceRef[];                    // every table slice the derivation consulted (§7.4, §7.6)
  deps: Handle[] }                      // u32 handles of the entities it read (the locality audit, §7.3)
interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; key: string /* a row key; '<rowKey>/<field>' for a slice that is one field of a row (§7.6) */; hash: Hash64 }
```

* **One existence state plus orthogonal flags** (LC-26). A pin followed by an assignment leaves the entity both pinned
  and assigned; no code tests a single state value. `existence` moves through: `generated` (made by the pipeline);
  `built` (created by a user or an epoch: `build`, `drawFootprint`, drawn features); `altered` (a structural edit or a
  transformation changed it: split, join, densify, a re-cut by F-REDERIVE); `converted` (retyped: wall → ring road,
  gate → junction); `abandoned`, `decayed`, `ruined`, `cleared` and `reused` (decline and its traces — the hooks below); `demolished`
  (removed; the record becomes a tombstone).
* **The decline and regrowth hooks** (owner's decline instruction; item 8; COV-NG-XA36, COV-VG-VN-090 — STAGED-BY-OWNER).
  One existence state serves every kind, and §4.11's ladders map their plain names onto it per kind (J-A8.46, J-A8.21):
  *buildings* occupied → vacant (`abandoned`) → derelict (`decayed`, roofless: `RoofSpec.kind 'none'`) → ruin (`ruined`) →
  robbed or cleared (`cleared`: a footprint trace — the face persists, the heights are zeroed in the record and its material
  is credited to the `MaterialLedger`, §2.7) → reused (`reused`: a garden, orchard or field laid over the trace, or a
  successor raised on the old foundations, `Building.predecessor`, §2.6); *walls and gates* in use → neglected
  (`abandoned`) → breached or partly dismantled (`decayed`) → superseded by a shorter inner ring (`Enceinte.supersededBy`,
  §2.7 — a link, not a state); *tunnels* in use → silted (`abandoned`) → caved in (`decayed`) → collapsed or sealed
  (`ruined` with `Tunnel.closure`, §2.7; item 11 — their condition reading and its `open` column are II.6's); *islands*
  `SkyIsland.state` (§2.7). Which conversion (`ConversionOp`, §4.11) moves which state is a data table, its inverse the
  undo record's (§7.4); every state exists in the base schema and can be applied by hand (§7.1); a cleared or reused
  building is a **live record** at its address until `demolish` or a successor takes it (J-A8.42), never a tombstone; a
  ruined building keeps its footprint and heights and draws with the ruin program (§8.2). `Building.condition` (§2.6:
  kept, worn, neglected — item 31's wear) is not an existence state but an attribute of an occupied building; a sealed
  passage's plots (item 30) enter the ladder as vacant (§4.11). When and where the evolution program applies the ladders
  is §4.11's.
* **The elaboration record — a sixth part, per lazy rung, outside both digests** (item 28 (c); J-A28.22 with J-A28.62). A
  building (and, at stage 2, a district's close-up, II.4) carries one record per lazily derived rung — `wings`, `rooms`,
  `plan`:

  ```ts
  interface ElaborationRecord { entity: Id; rung: 'wings'|'rooms'|'plan'; state: 'absent'|'current'|'stale'|'edited';
    inputs: Hash64 /* the digest of the rung's recorded inputs — for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, Wing.spans), the occupants' band and value (the value at §7.2's τ) and the households housed in address order (item 28 (f)), and the slices below */;
    slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows; §7.6 invalidates by slice */; epoch: number; since: { epoch: number; seq: number } }   // no reroll here: a rung's reroll count is what the log's regenerate events with rung give it (§6.1, §7.1)
  ```

  `absent`: never derived, or evicted — nothing is lost, a rung is a pure function; `current`: the cached result's input
  digest equals the digest of the inputs now; `stale`: an input changed — a designation, an assignment, the band, the
  storeys, the wing rings, the households, a slice, a dossier event of items 18, 22 or 31 — marked by the batch that changed
  it, with no derivation run; `edited`: a stored composition with plan events in the log. The state is recomputed from
  `inputs` against the current digest at load and after every batch that touches the entity. The record and the cached
  result live in the document's non-canonical blocks (§2.9) — outside the model digest and outside the records digest —
  because a click logs nothing and writes nothing a replay must reproduce (§6.2, §6.5 (9)); what a click derives enters a
  digest only when an edit stores it (§2.6).
* **History lives outside the entity** (SCL-20). The document keeps one **lifecycle event block** keyed by id and
  ordered by `seq` — each entry's `seq` is the causing event's (0 for the generation run); an entity holds only its
  `Lifecycle`. The block is not append-only (J-DET-33): an `undo` removes the entries whose `seq` is its target's, and a
  `redo` re-inserts them in `seq` order (the re-applied target's events cite the target's `seq`, §7.4); neither writes
  an entry of its own. So the block is always the block of the log with its undone pairs left out — the identity the
  unshared-document truncation relies on (§7.4, §6.5 (9)). Demolished and superseded entities move to the **archive**
  as tombstones: out of the working set, the spatial indexes and the display list; their ids and `supersededBy` links
  stay in the identity subtree of the model digest (§6.2) so an id is never minted twice (§6.3); a tombstone carries its
  causing event's `seq`, so an `undo` returns its target's tombstones to live and a `redo` archives them again. *Growth
  budget:* the working set grows only with live entities; the document grows by at most the bytes of new or changed
  records plus 64 B per lifecycle event (its M4 epoch test: §13.2). *Pre-decided fallback:* the archive and the
  lifecycle event block are held compressed in memory and decompressed only for an orphan report, a resurrection or an
  export — output-neutral.
* **Derivation records** (LC-12). A plot, block or building persists the inputs of its derivation — context and
  parameter digests, field samples, band, the table slices consulted — so "Regenerate (keep settings)" reproduces it
  from what it was made from, across saves, epochs and field edits elsewhere (§7.3 item 5). The record is excluded from
  the model digest (it is hashed with provenance and in the records digest). Every derivation that changes the entity's
  leaf digest (§6.2) rewrites it; a re-derivation that reproduces the leaf digest exactly keeps the old record, as the
  dependency-graph route, which never touches it, does — so the record never depends on which route re-derived the
  entity (§7.3 items 6–7). **Two band memories, kept apart** (item 31): `DerivationRecord.band` is the band the last
  derivation read — in the records digest, rewritten by every derivation that changes the leaf; `Plot.builtBand` (§2.5)
  is the band the stock was built for — in the model digest, rewritten only by rung-3 events and the redevelopment-class
  edits J-A31.44 lists (§4.11); a document written before the attribute existed gets `builtBand` from
  `DerivationRecord.band` and `builtProsperity` from the recorded sample (§7.5). A plot's record may also cite the
  designation-template and compatibility slices item 18's mutator read (`slices`).
* **Naming records.** Every time S13a draws a generated name it writes the name's `NamingRecord`: the naming slices the
  draw consulted and the salt it used. The record travels with the name when the address passes to a successor (§6.3),
  is rewritten by every draw, and is what §6.3's draw case (4) and §7.6's invalidation by slice compare with the current
  effective slices to find the names whose naming inputs changed. It is persisted, like a derivation record and unlike
  provenance, so a rebased document — whose provenance no replay can rebuild — still knows which names drew from a
  changed grammar row or corpus (J-DET-41). It is stored as offsets into the deduplicated slice-reference pool (below):
  ≈ 4–8 slices per name, ≈ 20–40 B raw per name, ≈ 0.1 MB raw for the ≈ 3 500 names of a CITY before compression,
  counted in §2.9's per-building document budget. **A protected name keeps its record dormant** (J-DET-46): while the
  name is protected — a `setAttr` on it, a lock on its path (a whole-entity lock included) or an assignment that sets it
  (§7.7) — its record stays in place, and no draw case reads, compares or rewrites it; it still travels with the address
  to a successor. The event that ends the protection returns the name to unedited with the record of its last draw and
  runs §6.3's case (4) for it, the event's undo record keeping the former name and record. An entity whose name was
  never drawn has no record and nothing to re-draw.
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table, not
  in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool; all
  of it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). Provenance, derivation records and naming
  records share the provenance digest, used only by the locality audit (§2.9 "Canonical form and digests"; §6.2).
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash: the
  whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold set
  for a band lookup, the row for a direct lookup — for a naming draw, one slice per culture or ancestry field it read
  (§7.6) — and the table's match predicate set for a rule that selects rows by predicate. §7.6 invalidates on
  slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9), the naming record included
  for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); migration hooks
  (§7.5). Its completeness test — a CI test fails when a type is missing from any of those paths — is §13.2's (O11 a;
  §7.1, owner amendment 5). The amendments of 2026-09-25 add to it: `Use` (§2.7; lineage unit the creating event or the
  epoch's use step, anchor the plot's address and role), `Passage` (§2.5), `MaterialLedger` (§2.7, one per document),
  `Rejection` (declared with its mechanism in §7.7: model data in the digest, keyed by element and site, with its lapse
  and its migration hook), `AccessPoint` (II.7.4), the underground plots' and buildings' fields (II.7.3), the plan's `Room`
  with its `unit` (§2.6; anchored by its centroid within its wing), a building's `Entrance` and `Basement` sub-records
  (§2.6), the plot's `builtBand` and `builtProsperity` with their migration hook (§7.5), the tunnel's `navigable`,
  `headroomCm` and `closure` (§2.7), and the elaboration record's cache path (§2.9); each enters §13.2's path-completeness
  test, and every new attribute has its edit kind or is declared derived (§7.1).

=== REPLACE ### 2.9 The document and serialisation ===
### 2.9 The document and serialisation

A document is **a base plus an ordered log**: the base is either the canonical recipe (the town replays from its seed)
or, after a rebase, a materialised state; the log is every event since the document was created, in `seq` order.
Everything else in the file is the canonical style state, input recorded for replay (setting-pack content, host
outputs), a verified cache, or per-user state.

```ts
interface Document {
  docId: Uuid;                  // minted at creation by @plat/api (outside the model packages); kept on save; re-minted on clone and save-as (§6.3)
  schemaVersion: string;        // the file format (§7.5)
  outputVersion: string;        // the model packages whose output this document replays under (§6.4)
  base: Base;
  log: EditEvent[];             // the single source of truth for every edit, lock, assignment, table edit, epoch, rebase, upgrade, undo and redo (§7.1, §7.4); a rebase never removes events
  nextSeq: number;              // the seq the next event takes; never decreases — also when an unshared document truncates an undone pair (§7.4)
  packs: PackData[];            // the content of every non-shipped pack of the pack set and of every pack a truncated event held on a saved redo stack names (below) — a selected user corpus is one — canonical, outside the model digest
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own model and records digests and verified by replay (load step 3); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[];
              features: Features /* II.7.4: the resolved feature set (sewers by tier) — recomputed on load with the report; every dependant reads it from the model, never from a layer's visibility (item 14) */;
              elaborations: ElaborationRecord[] /* §2.8: one per entity and lazy rung, derived from the cache below against the current digests (item 28) */ };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (their cap: §7.4), with the truncated targets its redo stack holds; never canonical
  elaborations?: ElaborationChunk[];   // the elaboration cache (below), kept across zoom-outs and sessions so that "once generated it is saved" holds without storing derived rungs in the model (item 28); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` — checked against its root of record (load step 3) — and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2))
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the shipped set of the output version that wrote the entry — informative only: a load resolves each pack by hash (below), the link rule reads the link's output version (§6.4), and an upgrade to a version that stops shipping it copies its content into `packs` (§7.5 (2)); always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<RerollableConcern, number> }   // initial salts of the rerollable concerns only (normally 0), keyed by §6.1's registry-generated type; the schema refuses any other key, so a geometry concern can never carry a salt; rerollLayer events in the log advance them (§6.1)
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* the model's Merkle root, §6.2 — recomputed from the decoded state at every in-window load (step 3), under the model packages of the output version that recorded it, and compared */;
  recordsDigest: Hash128 /* the root of the records tree over the persisted derivation and naming records, §6.2 — recomputed at every in-window load and by the verification replay (step 3), and compared */ }
interface ElaborationChunk { entity: Id; rung: ElaborationRecord['rung']; inputs: Hash64; hash: Hash128; bytes: Uint8Array }   // item 28 (c): the elaboration cache — a derived Composition, Plan or close-up, or one memoised step of a re-cut chain (§2.6), keyed by (entity, rung, inputs digest); content-addressed and non-canonical: checked by hash, dropped on mismatch or eviction (§12.8), never a base, never in a digest (§6.2)
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields'; partition: string /* PlatKey and 'L0-1' (the level-≤ 1 routes) or a static-index partition (§3.3) — or, under the size fallback below, a block group — or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // the keys of "View state" below, `session` included; each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1)
type RebaseReason = 'keptSnapshot'|'drawnConstraintsRebuilt'|'frozenImport';   // keeping the old model at an upgrade needs no rebase: the document stays at its own output version (§7.5), so no reason names it
interface UndoRecord { session: string; of: number /* the seq of the event this record undoes */; record: Uint8Array /* its §7.4 undo record, compressed */;
  redo?: EditEvent /* an unshared document's truncated target held on this session's redo stack (§7.4): the event itself with its original seq, so a redo after a reload re-appends it; every pack it names stays in `packs` while it is held */ }
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`),
  epochs, undo and redo exist only as log events; their current effect lives in the entity records (flags, attributes)
  and in `derived` caches rebuilt from the base and the log. The blueprint's own assignments and edits enter as the log's
  first events (§7.7); dossier events (items 20 and 22) enter the log through the host door (§11.4) with `author: 'host'`
  and `EditBase.dossier` set, in the host's order — so the log is the ordered dossier history the map is a function of
  (§6.2), every map edit lives here and never in the dossier, and the module never writes the dossier (§11.3); the report,
  the statistics and the timings are §5.4's. A rebase never deletes events: the events
  before it stay in the log as history and as the rebase's undo path (§7.4), and the fold skips them while the base is
  the rebased state.
* **Model inputs that are not in the recipe's parameters; the pack set (J-DET-35, J-DET-50).** Every setting pack is identified by
  id, version and content hash. The document's **pack set** is every pack that the base recipe's `packs` names or that
  the `value` of any `adjust` of the pack list in the log (`param: 'packs'`, §7.6) names — an undone, superseded or
  deselected selection included, because its event stays in the log and every replay folds it. When a document is
  created — or an `adjust` adds a pack (§7.6) — the content of every pack of the pack set that is not in the output
  version's shipped set is copied into `packs`, and it **stays there while the base recipe or any event of the log names
  the pack, or a truncated event held on a saved redo stack (`UndoRecord.redo`, §7.4) does**: its content leaves
  `packs`, at the next save, only once none names it — a truncation (§7.4) removed the last logged event naming it, and
  the redo entry holding that event was cleared by a new event from its session or left the `undo` section's cap. A pack
  a new output version stops shipping is copied into `packs` by the upgrade (§7.5 (2)). **A user-uploaded corpus is a
  pack like any other** (§10.4): selecting it wherever a corpus is chosen is an `adjust` of the recipe's pack list
  (§7.6) that enters it as `{ id: 'user:<content hash, base 32>', version: '1', hash, shipped: false }` with its content
  in `packs` — the corpus and the keyed row operation that binds it to the culture or ancestry row the user chose, so
  the binding is part of its content hash (§7.6); deselecting it is a second `adjust`, and its content stays saved
  because the first still names it — so a replay of the log always resolves it, and a town that has selected a user
  corpus can never emit a link that replays with other names (§6.4); an uploaded corpus outside the pack set is not a
  model input and is not saved. A host provider's outputs are copied into `hostContent` as they are produced (§11.4).
  On load each pack of the pack set is resolved by hash, first from `packs`, then from the library's shipped packs; a
  missing pack or a hash mismatch opens the document read-only with a message naming the pack, never a replay with other
  content. So a document replays on a machine that has neither the pack nor the host. Pack data and host content are
  counted outside the per-building budget below and **capped at 2 MB gzipped together**: a pack (a user corpus
  included) that would pass the cap is refused when it is added, with a message; a host provider's output that would
  pass it is refused at the provider call — nothing is recorded in `hostContent` — and the edit that requested it
  returns an **F-EDIT conflict** (§5.2) naming the provider and the size: an `ApplyResult` `conflict` through the API
  and, for an edit that came over the bridge, `doc.rejected { reason: 'invalid', conflicts }` (§11.2, §11.3). So nothing
  is ever committed with content a replay could not read.
* **Load.**
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only. A document
     whose canonical form fails its schema — a `Recipe.salts` key that is not a rerollable concern among them — opens
     read-only with a message naming the field, never replayed.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current version
     and records that it is not seed-reproducible before the rebase. **A frozen view is never checked against its
     recorded model root** (J-DET-44): that root was computed by its own output version's model packages — their leaf
     encoding and field drivers among them — which the browser no longer holds. The view checks each chunk against its
     content hash, which depends on the bytes alone, and is labelled "made with o<k>; not verified by this version"
     beside the CLI command that replays and checks it under its own output version (§6.4). A chunk whose bytes miss
     their content hash is reported as damage ("part of the saved copy is damaged"), its partitions drawn marked, and the
     `frozenImport` rebase is refused — a damaged copy is never a base — with the same CLI command. The `frozenImport`
     rebase decodes the state under the current version — its fields recomputed from their drivers and the stroke list
     (below), never from the Uint8 display copy —, checks its records root against `model.recordsDigest` (the records'
     encoding is the file schema's, so any version can check it, §6.2; a mismatch refuses the rebase as damage), records
     the model root the current version computes as its `stateDigest`, with `version` = the current output version
     (§7.1), and re-draws the names whose naming inputs changed as §7.4's rebase row states; it resolves the pack set as
     a load does, and a pack that neither `packs` nor the current version's shipped packs hold refuses the rebase with a
     message naming the pack and the CLI command that installs the document's own output version, copies the pack's
     content into `packs` (the cap above applies) and rebases. A document without `model` outside the window (only the
     CLI writes one, below) cannot be shown as a frozen view: the app says so and shows the CLI command that replays it
     under its own output version (§6.4), and offers to open its recipe under the current version as a new document with
     §6.4's notice.
  3. Otherwise the document's output version is the current one or a retained N−1 or N−2 (§6.4), and everything below
     runs under **that version's model packages** — its decoder, its field drivers and its digest leaf encoding, the ones
     that recorded the roots it checks.
     * **Decode and check.** The load decodes `model` — each chunk checked against its content hash, the arena rebuilt
       (§3.9), the entity columns decoded, the fields recomputed from their drivers and the stroke list (below) — and
       displays it at once. Before the decoded state accepts its first edit, the load recomputes its digest tree — every
       leaf and interior node of §6.2, one full recomputation from the decoded state, within §6.2's bar — and compares
       its root with `model.digest`; in the same pass it builds the records tree over the decoded derivation and naming
       records (§6.2) and compares its root with `model.recordsDigest`. The trees it builds are the working state's
       maintained trees from then on: every edit updates them at commit (§6.2 "Maintenance").
     * **Corrupt cache.** A model root or a records root that differs, or a chunk whose bytes miss their content hash, is
       a **corrupt cache**: the report says so ("the saved copy of this town does not match its own fingerprint; it is
       being rebuilt from its recipe and edits"), the decoded picture stays on screen read-only and marked as damaged,
       and the document loads by replay (step 5), the replay's state becoming the working state when it reaches the log
       head; a corrupt cache is never verified, never a base and never offered as the saved town.
     * **A rebased base.** A rebased document's `base.state` is checked the same way when a replay starts from it: its
       records root against `base.state.recordsDigest`, and its model root, computed under the packages the replay runs
       under, against **its root of record for that output version** — the `stateDigest` of the `rebase` that installed
       it when that event's `version` is the replay's version, else the `baseDigest` of the later `upgrade` whose `to` is
       (every `upgrade` of a rebased document records one, §7.5 (2)). The document's output version is always the
       `version` of its latest rebase or the `to` of its latest upgrade, so an ordinary load always finds a root of
       record for its version, and the undo of an upgrade, replaying under `from`, finds the one recorded before it; a
       base kept under o5 and upgraded to o6 is therefore checked under o6 against the root o6 computed at the upgrade,
       never against o5's. A mismatch there opens the document read-only with a message, because no replay can rebuild
       a state that is not seed-reproducible.
     * **Working state and verification replay.** On a matching root the decoded `model` is at once the **working
       state**: the user edits it immediately, and each edit is dry-run, logged and applied to it exactly as in a
       verified session, at §12.6's edit cost — no edit waits for the verification replay. In parallel a **verification
       replay** folds (base, log) up to `h₀`, the log head `model` materialises (`model.seq`), in replay mode — every
       model stage at its event's log position exactly as in the session, S13a's scoped delta included; only the view
       stages S14 and S13b suppressed (§7.3) — and compares its model root and its records root at `h₀` with
       `model.digest` and `model.recordsDigest`. It runs in a pool worker on its own arena, its own per-district stages
       with pool size 0 on that worker — the same overlay-and-merge path, identical digests by construction (§3.3 pool step 5),
       each freeze it reaches first rebuilding the partitions its folded edits left dirty (§3.3 pool step 1) — so **no copy
       is frozen while it runs**, and §12.8 counts the replay's model in place of the pool's frozen arena copies: every
       edit made meanwhile runs its per-district stages (S10, S10b, S11, S12b) in the generation worker by the
       pool-size-0 path (§3.3 pool step 5), which gives the digests the pool gives by construction, so the replay's worker is
       never contended and the working set stays on its counted line; an edit whose scope spans several districts costs
       its single-worker figure (§12.4) until verification ends. With pool size 0 the replay runs in the generation
       worker, on its own arena beside the working state, and yields to each user edit at its next batch boundary
       (J-I14).
     * **Edits held for provenance.** `editTable` and `editPreset`, whose invalidation reads recorded slices (§7.6),
       need provenance, which only the replay rebuilds (the snapshot does not store it): they are held until the replay
       reaches `h₀` and hands its provenance to the working state (for every entity the edits made meanwhile did not
       re-derive), and every event after a held one waits behind it, so the fold keeps log order. An `Adjust` made
       meanwhile uses tree scoping, which §7.3 items 6–7 prove output-identical to the dependency-graph route.
     * **Verified.** The working state is verified only when both model roots equal `model.digest` and both records
       roots equal `model.recordsDigest` — the decoded state's, checked before its first edit (or under §6.2 (iii)), and
       the replay's at `h₀`; the edits made meanwhile are then verified with it, because they were applied to a state
       proven equal to the replay's at `h₀`.
     * **Records mismatch (J-DET-52).** When the replay's model root at `h₀` equals `model.digest` while its records
       root does not — as when a writer stored a wrong derivation or naming record and hashed what it wrote — no model
       changes and nothing is asked: the replay's state at `h₀`, records included, replaces the working state, and every
       event logged after `h₀` is re-applied to it in log order as "take the replayed town" re-applies them (step 4),
       because an edit made meanwhile may have read a wrong record (Regenerate (keep settings) reads derivation records,
       and case (4) naming records and their salts, §6.3); their fates and renames are recomputed and differences
       reported, the report says "the saved copy's derivation or naming records differed from what its recipe gives and
       were rebuilt", and the working state is then verified.
     * **Trust the saved town.** The user may end the wait by choosing "trust the saved town", which keeps the saved
       town as in step 4. It is offered only once the decoded state's own model and records roots have matched; when that
       is, and what waits for the recomputation meanwhile, is §6.2 (iii)'s.
     * **Budget and measurement (M2a; METROPOLIS at M2b).** **Open-to-editable** — from the file's bytes in memory to
       the working state accepting its first edit — is ≤ the time §12.5's law gives to generate a town of the document's
       building count with the pool, T(B) (at CITY ≤ 60 ms + 60 µs × B: 330–420 ms at the default request), so opening
       a saved town is never slower than generating it; on the reference 300-edit CITY document, with pool size ≥ 1, an
       edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms; with pool size 0, within
       its cost + the longest replay batch at the rung (reported); the picture is on screen before the state is editable
       (S14 from the decoded model). *Pre-decided fallbacks:* if the recomputation passes §6.2's bar, it leaves the edit
       path by §6.2 (iii); if open-to-editable then still passes T(B), the kernel rebuilds each L2–L4 static index
       partition at the first query that reads it instead of at load (§3.9) — output-neutral, because every query
       result is sorted by its canonical key whichever structure holds an item (§3.3) — and if the bar still fails it
       is restated at the measured value as a declared budget amendment in the release notes and the judgment table,
       reported for the owner's veto, the picture still appearing at once; if the pool-size-≥ 1 edit bar fails for CPU
       contention, the verification replay pauses while an edit is applied and while the user has edited within the
       last 2 s, then resumes — scheduling only, never a model change. The load-verification fixtures (corrupt
       snapshots, a forced §6.2 (iii), an altered naming record) are §13.2's.
  4. A **mismatch is never silent** and is resolved once, by the user's choice (J-DET-38). **Keep the saved town**
     (offered only once the saved copy's own roots have matched, step 3): the base becomes the rebased state `model` at
     `h₀` (`Base.seq = h₀`) and a `rebase` event with `at = h₀`, `stateDigest = model.digest` and `version` = the
     document's output version (reason `keptSnapshot`) is appended at the head (`EditEngine.rebase(doc, 'keptSnapshot',
     h₀)`, §14); the edits made during verification already stand on that state and stay as they are. **Take the
     replayed town:** the replay's state at `h₀` (its arena and entity columns, transferred to the generation worker)
     replaces `model`, and every event logged after `h₀` is re-applied to it in log order through the ordinary fold —
     they are log events, so this is their replay; each one's confirmed fates are recomputed and a difference is
     reported as §7.3 item 4 requires, and their undo records are rebuilt by the re-application. Either way the document
     is consistent after the choice, the next load does not report it again, and undo below a rebase uses the rebased
     state, never a replay from the seed. A rebase fills in, from the rebased state, the derivation record of every
     entity of a kind that declares one (§2.8) and lacks it, so Regenerate (keep settings) stays defined for every such
     entity. **In a document attached to a host bridge** (J-DET-42) the policy — which client may keep the saved town,
     and what every other client does, reports, records and keeps meanwhile — is §11.3's ("Bridged load verification");
     what follows is the install mechanics. A client that receives a `rebase` with reason `keptSnapshot` whose `at`
     lies behind its log head and whose `stateDigest` differs from its own root at `at` **installs that base**: it
     decodes `model` from the `doc.load` bytes it kept (§11.3) and checks it as in step 3, makes it the rebased base
     (`Base.seq = at`), re-applies every event after `at` through the ordinary fold — their fates recomputed and
     differences reported (§7.3 item 4), their undo records rebuilt — and tells its user that the owner kept the saved
     town. A client whose verification is still running when that `rebase`
     arrives stops it, because the base is settled; a client whose root at `at` equals the `stateDigest` changes
     nothing; any other `rebase` whose `at` lies behind the head (possible only in a hand-built log) is a reported no-op,
     identically everywhere. A client that loads a document whose log already holds a `keptSnapshot` rebase with `at =
     model.seq` and `stateDigest = model.digest` — the host kept serving the bytes from before the owner's choice — takes
     `model` as that rebased base after step 3's check, without a verification replay and without asking, since the
     owner has chosen; the next owner save writes the base in its rebased form. So every client of a bridged document
     reaches the owner's state, as §11.3's convergence rule requires. The mismatch fixtures are §13.2's, and §11.3's
     convergence test includes a forced mismatch settled by an owner's keep.
  5. A document without `model` inside the window loads by replay — as does a corrupt cache (step 3); `model` is a
     cache, never the only copy of anything. So does a document of the running output version written by M1's
     generated-town format, before the records digest existed (§16): nothing recorded a records root for it, so the
     schema transform that adds `recordsDigest` (§7.5) drops its `model`, and the load regenerates the town from its
     recipe and its empty log, never reporting it verified — a *preview* file (§13.3) loses nothing by it (J-I19). M1's
     reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1).
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records and naming records, §2.8); **provenance is
  not stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full
  resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2); the
  snapshot carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document
  is ever opened as a frozen view. Neither digest tree is stored: the snapshot holds the two roots, `digest` and
  `recordsDigest`, and the load recomputes both trees (step 3).
* **Content-addressed chunks; one copy of a rebased state (J-DET-36, J-DET-19).** A snapshot is serialised as chunks, each keyed
  by its 128-bit content hash and written once in the container however many snapshots reference it. The geometry chunks
  — one per arena for its level-≤ 1 routes and one per static-index partition (one per district plus one outside
  districts, §3.3; the same units as §7.4's copy-on-write checkpoints) — are laid out by §3.9: what each holds, how a
  chunk names geometry another chunk holds (by lattice point) and which edits rewrite which chunks. Entity columns are
  chunked per partition; the archive, the lifecycle history and the field cache are town chunks. A rebased document's
  `model` therefore shares every unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only a
  chunk list naming `base.state`'s chunks (the same digest), and after edits only the chunks those edits rewrote are
  stored twice.
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population (≈
  212 B per building; PLAT also stores plots, yards, heights, lifecycle and the naming records of §2.8, and derives
  people); pack data and host content are counted separately (above). This section holds the document budget (§12
  carries memory, not the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and at M2a one
  on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document; §16).
  *Pre-decided fallback if CITY exceeds 320 B per building:* the vertex stream switches to second-order (predictive)
  delta coding — each vertex stored as its difference from the straight-line continuation of the previous two along its
  first edge — with x and y in separate streams; the change is lossless and output-neutral, so no golden moves.
  *Pre-decided fallback if the rebased document exceeds 1.25 ×:* the L2–L4 geometry and entity chunks are cut per
  **block group** instead of per district — a district's blocks grouped by the 200 m world-grid cell that holds each
  block's lowest-leftmost vertex, so an edit rewrites only the groups whose blocks it touched — and the test re-runs; if
  the ratio still exceeds 1.25 ×, the bar is restated at the measured ratio as a declared budget amendment in the
  release notes and the judgment table, reported for the owner's veto, while the rung's absolute budget above (CITY ≤ 3
  MB) stays the hard bar for rebased documents too. Both steps are output-neutral: chunking changes bytes on disk, never
  the model or its digest.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  `nextSeq`, base recipe, log, pack data, host content, style, the snapshot chunk lists) + binary blocks (the chunks, by
  hash) as typed arrays. Saving from the app or the API **always writes `model`**; only the CLI's `--recipe-only` export
  writes a document without it (test fixtures and files made from links), and it refuses a rebased base, whose state its
  recipe cannot rebuild. The compact twin for embeds is §11.1's — the same schema in world coordinates, round-tripping
  exactly (O11 c); exports are views (§11) and carry address ids plus a supersedes table (§6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `nextSeq`,
  `base`, `log`, `packs`, `hostContent`, `style` and `model` (when present); `view`, `derived` and `undo` are never
  canonical. Four digests: the **model digest** and the **records digest** (§6.2), the **provenance digest** (provenance,
  derivation records and naming records, §2.8 — the locality audit only), and the **document digest** (over the
  canonical bytes — save → load → save identity). The bridge's concurrency token `logHead` is §11.3's.
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices,
  `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), `elaborate` (`click` or `view`: when a lazy
  rung is derived, never what — §4.1, item 28; `click` by default), `knowledge` (item 30: the knowledge sets the viewer
  holds — which `local` and `secret` places (§2.5's `knownTo`) §9.2's label policy and the reader (§11.2) name to this
  viewer; the empty set by default and in every golden), season, weather, frame, map rotation,
  compass, legend and emblem settings, `exportAnchor` (§11.1) and the people a user has opened live in `view`, outside
  every digest; the document's `style` stays canonical; each key is last-writer-wins by (Lamport counter, session id),
  so a viewer never writes the model. The key `session` holds an unshared document's authoring session (§7.4
  "Sessions"); a client attached to a host bridge takes its session from `doc.load` instead and never writes this key
  (§11.3).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4; the
  export → import → export round trip over the canonical form is a hard test (§13.2).

=== J-ROWS ===
| J-A28.21 | the plan rung's records declared in §2.6 — rooms as values on the world lattice (the kernel's transient arena), a wing-local module as a table row (50 cm), areas in m² by band, the VTT grid only at export; `Composition.lod` keeps four values, `rooms` being a composer's optional rooms that the plan takes as fixed rings | §2.6 |
| J-A28.22 | the elaboration record as a sixth, per-rung, non-canonical part outside both digests, its cache content-addressed chunks beside `model`, and `elaborate` a per-viewer view key | §2.8, §2.9 |
| J-A28.23 | the owner's "the more rooms for more occupying families the richer a building gets" read as the shell's capacity, and one integer capacity function stated in §2.6 that S10b, `relet` and F-PLAN all read | §2.6 |
| J-A28.24 | the interior ladder reads the plot's field band, never `Household.wealth`; its rows keyed by the band names of §4.5's set with the middle row at `FieldBands.middle` | §2.6, §2.7 |
| J-A28.25 | the dwelling unit as a household reference on the plan's room (`Room.unit`) with `Plan.units`, five unit forms, the unit-door rule and the never-omit rule | §2.6 |
| J-A28.26 | the re-cut's canonical chain — rows first, then households, from the as-built plan — with the fixed set and the kept-room rule; a stored plan re-cut inside its changing event | §2.6 |
| J-A28.27 | staff rooms sized as a share of the owners' principal chamber and placed in the attic, basement or service wing; a lodging house's shared kitchen or common room on the ground storey by the stair core | §2.6 |
| J-A29.21 | entrances as an indexed set with five rules — one street-facing main door, side and rear doors only where an access edge presents itself, a yard door by default, addressable and re-derived, every one a door of the plan — derived by one function the pipeline, the mutator and the edit layer call | §2.6, §2.2 rule 7, §2.5 |
| J-A29.22 | the basement as its own record with `Heights.floorsBelow`, gated by a water table defined from §2.3's existing facts (terrain class, the nearest water surface plus a freeboard, the drainage grid) — no new raster; never a sewer room | §2.6, §2.3 |
| J-A30.21 | a passage as a `Passage` record over an L3 face whose `sealed` bit is the one stored fact behind a sealed access edge and exposure `sealed`; `Wing.spans` with the union contract read on the wings' ground rings; no way class | §2.5, §2.6, §2.4 |
| J-A30.22 | `knownTo` on plot, building and institution defaulting from exposure, and the viewer's knowledge as a view-state key outside every digest | §2.5, §2.6, §2.7, §2.9 |
| J-A31.21 | `builtBand` and `builtProsperity` as persisted attribute columns in the leaf digest with `geometryFloor` derived at read and never stored; `Block.due`; the `DerivationRecord` bullet's epoch clause rewritten; `Building.households` a kept reverse list and `condition` a rendering-only attribute | §2.5, §2.6, §2.8 |
| J-A17.21 | `Use` as its own record, `Building.use` a reference to it (absent = vacant) and `formerUses` the traces | §2.7, §2.6 |
| J-A19.21 | materials as a rendering attribute only, the default rows FTG's per-stage model with district and class overrides, `band` only in the optional regional-shift rows | §2.6 |
| J-A8.21 | the ladders expressed on one `Existence` with `cleared` and `reused` added; `MaterialLedger` a town record in the model digest; `predecessor`, `supersededBy` and `closure` as links | §2.8, §2.6, §2.7 |
| J-A11.21 | a tunnel's condition a derived reading of `existence` and `closure` through II.6's condition table (its `open` column), never a second stored state; `navigable` derived and stored | §2.7 |
| J-A12.21 | the underground arena's level mapping stated in §2.2 rule 1; `ContextVector.arena`; an `underground` pseudo-district kind; the `access_point` vertex role beside the `access` edge role | §2.2, §2.5, §2.7 |
| J-A20.21 | `Identity.dossier` as persisted identity, the lifecycle kinds `reject`, `lapse` and `place`, and `Rejection` in the registry as model data | §2.8, §2.9 |
| J-A25.21 | `ditch` as a water-body kind and `LandUse.reclaimed` as a trace, with each conversion's record change stated once in §2.3 | §2.3, §2.7 |
| J-A24.21 | `Reservation.rank` on market kinds and `dist.market` the nearest market of either rank | §2.5 |
| J-A27.21 | `FieldBands.bands` and `FieldBands.middle` on the record, the band-set row type staying §4.5's | §2.5 |

=== RATIONALE-A ===
| J-A28.21 | Chose to declare the plan rung's records in §2.6 with rooms as values on the world lattice — integer-centimetre rings read back from the kernel's transient arena (J-A28.31), a wing-local module as a table row (default 50 cm) that is only the planner's grid, room areas in m² by band, and the reference's cell surviving only as the VTT export's grid — and to keep `Composition.lod` at four values with `rooms` read as the optional principal rooms a Fantasy-Manor-class composer emits, which the plan takes as fixed rings, over a modelling cell, rooms as L4 plat faces, or folding `rooms` into `plan`, because the design's units are centimetres everywhere (§2.1) and a cell would make room sizes a second unit; plat faces would put every clicked plan into the arena and the model digest; and a composer's hall or tower room is an exterior fact the plan must respect, not compete with (§2.6; item 28; the Dwellings synthesis corrections 11–13). |
| J-A28.22 | Chose to make the elaboration record a sixth, per-rung part of a lazily derived entity that lives outside both the model digest and the records digest, its cached results content-addressed chunks beside `model`, and `elaborate` a per-viewer view key, over the synthesis's placement of the record inside the records digest and a document setting, because a click logs nothing and replay = session compares both digests (§6.5 (9)) — so a click may write nothing a replay must reproduce (the determinism seat's J-A28.62) — and a viewer's choice of when to derive a pure rung must never enter the model's inputs (§2.8, §2.9; item 28 (b), (c)). |
| J-A28.23 | Chose to read the owner's last sentence — "the more rooms for more occupying families the richer a building gets" — on the building, as its capacity, and to state one integer capacity function in §2.6 (the smaller of the template row's `households.max` at the plot's `builtBand` and the storeys' exact twice-area less the circulation share over the smallest unit form's minimum area) that S10b's fill, `relet` and F-PLAN all read, over reading the sentence on the occupants or letting each path compute its own bound, because read on the occupants the sentence contradicts the same message's first clause ("more prosperity means a larger home for a smaller family"), while read on the building it is exactly the shell's rooms to let, rising with the band it was built for; and one function in exact integers is the only way the solver and the plan agree on every host (§2.6; item 28 (f); with the pipeline's J-A28.44). |
| J-A28.24 | Chose the plot's prosperity field band and value as the interior ladder's "occupants' band", never `Household.wealth`, and to key the ladder's rows by the band names of §4.5's set with its middle row read at `FieldBands.middle`, over the households' own wealth or rows as offsets from the middle, because S10b places households on plots of their band and item 31's rung 1 moves the field, so the two agree until an epoch and one building's households can never disagree with each other about their interior; and band names let the shell's floor (relative to the middle) and the interior (absolute) read one band set per settlement (§2.6, §2.7; item 28 (f)). |
| J-A28.25 | Chose to represent the dwelling unit as a household reference on the plan's room (`Room.unit`, present exactly for rooms of scope `unit`) with `Plan.units` naming each household's form and entry door, five unit forms (house, dwelling, lodging, apartment, room), a unit-door rule and a never-omit rule, over a dwelling-unit record of its own, because the route's recommendation needs no new record type, the determinism part's events (`setRoomUnit`) and migration already name the field, and a unit that falls to the next poorer form before any is dropped is what makes the owner's bar — every dossier household housed with its own door — hold by construction (§2.6; item 28 (f)). |
| J-A28.26 | Chose the canonical chain as the re-cut's definition — the plan for a band row and a household count derived from the as-built plan by least-disruption steps in one fixed order, the rows first (one band at a time, the count clamped into each row's range) and then the households (one at a time) — with the fixed set (wing rings, stair core, entrances, hearths and stacks, reserved passage cells, basement ring) and the kept-room rule stated once, and a stored plan re-cut inside its changing event, over the cached result at click time or households-first, because a chain from committed state makes the plan a function of its inputs alone (§6.2, §6.5 (9)) and returns the as-built plan exactly when the households are re-united; rows first lets each household step happen with the final unit form, so the interior degrades before it multiplies, which is cheaper and what real subdivision did (§2.6; item 28 (f); with J-A28.71 amended and the kernel's J-A28.33). |
| J-A28.27 | Chose to size staff rooms as a share of the owners' principal chamber's target (0.35–0.40 in the rich rows) and to place them in the attic, the basement or the service wing before any storey the owners' rooms occupy, and to put a lodging house's shared kitchen or common room on the ground storey by the stair core, over staff rooms beside the owners' on the same storey or shared rooms anywhere the cut leaves space, because the owner's "staff rooms which are dwarfed compared to the owners" is a size rule that needs a reference room, service in real houses sat where the owners did not, and a shared room off the circulation hub is reachable by every unit by construction (§2.6; item 28 (f); the kernel seat's row suggestions). |
| J-A29.21 | Chose an entrance set with five rules — exactly one street-facing main door (on the court or path from the plot's street gate for a set-back building), side and rear doors only where the plot has an access edge beyond its frontage with a class-row probability and cap, a yard door by default when the yard is large enough, every door an indexed footprint vertex that is editable and re-derived under a designation change, and a door of the plan at every entrance — derived by one per-entity function the pipeline, the mutator and the edit layer call, over the single entrance vertex or doors decided by the plan rung, because the owner asked for several doors with a street door always present and back doors "optional or random but limited", the wing-carrying rule already keeps a footprint vertex through every move, and one function keeps generation, mutation and edits agreeing as `deriveBase` does (§2.6, §2.2 rule 7, §2.5; item 29 (a)). |
| J-A29.22 | Chose to give the basement its own record (`Basement`: floors, kind, an inset ring, its access) with `Heights.floorsBelow`, and to define the water table from facts the design already has — the plot's terrain class, the nearest water body's surface elevation plus a freeboard within a table distance of a shore, and the drainage grid's accumulation elsewhere — over a storey record inside `Heights` or a new water-table raster, because a cellar has a ring smaller than the footprint and an access of its own that heights alone cannot carry, and a new raster would add cost and a second hydrology; the cellar never joins a sewer as a room (J-A12.42), a stair to a tunnel being an access record (§2.6, §2.3; item 29 (b)). |
| J-A30.21 | Chose to model the passage as a `Passage` record over an L3 access face — its `sealed` bit the one stored fact from which a sealed access edge and a plot's exposure `sealed` are read — and the front building's upper storeys as `Wing.spans` with the stage-3 union contract read on the wings' ground rings, and no `passage` way class, over an access-row flag in the kernel, a way class, or a passage as geometry above the ground, because a bricked arch is one fact with one owner, the role table has no flag column and needs none, an L1 way would cut the footprint above it (the kernel's J-A30.31; the pipeline's J-A30.43), and a wing's extent above the ground is a composition fact the plan, the shadow pass and the 3-D export can read without a second footprint (§2.5, §2.6, §2.4; item 30). |
| J-A30.22 | Chose `knownTo` on plot, building and institution, defaulting from exposure (hidden → local) and otherwise a dossier fact or an edit, with the viewer's knowledge as a view-state key outside every digest, over knowledge derived from exposure alone or held in the model, because the owner separates the place (always on the map) from who knows it, a dossier may declare an institution secret whatever its plot, and what a viewer is shown may never change the model or its goldens (§2.5, §2.6, §2.7, §2.9; item 30 (d)). |
| J-A31.21 | Chose to persist `builtBand` and `builtProsperity` as plot attribute columns in the leaf digest and to derive `geometryFloor` at read from `FieldBands.middle`, never storing it, with `Block.due` on the block, the `DerivationRecord` bullet's epoch clause rewritten (a brush re-derives by τ as an authorial act; an epoch acts only through the ladder), `Building.households` a reverse list the writer keeps and `condition` a rendering-only attribute, over a floor stored per plot or a band memory inside the derivation record, because a stored floor would need a migration whenever a settlement's middle moved while a derived one follows it for free; the derivation record is rewritten by every derivation and sits outside the model digest, so it cannot be the stock's memory; and wear must never become a shape input (item 19) (§2.5, §2.6, §2.8; item 31; with J-A31.43, J-A31.44). |
| J-A17.21 | Chose a `Use` record of its own, with `Building.use` a reference to the current use (absent when vacant) and `formerUses` the traces a building keeps, over a use as fields of the building, because the owner's shops close here and reopen there while the building persists, an address that moves with the use is what assignments and the host follow, and a building that has been an inn must remember it for regrowth to revive (§2.7, §2.6; item 17). |
| J-A19.21 | Chose to make a material a rendering attribute only and to key `MaterialRow`'s default rows by era and growth stage with district-kind and class overrides, `band` appearing only in the optional regional-shift rows, over the former default keyed by prosperity band, because the owner ruled that material is texture and colour and "has nothing to do with the shape", and FTG's model — one default per stage, overridden per district and type, wealth shown through the pools and roof colour — is the emulation baseline item 23 requires; the regional shift stays as the owner's optional extension (§2.6; item 19). |
| J-A8.21 | Chose to express the decline ladders on the one `Existence` state with two added values, `cleared` (a trace) and `reused`, a town-level `MaterialLedger` inside the model digest changed only by salvage events, and `Building.predecessor`, `Enceinte.supersededBy` and `Tunnel.closure` as links, over per-kind state vocabularies or a ledger outside the digest, because one state with orthogonal flags is §2.8's rule (J-A8.46), a ledger that weights clearance must replay identically, and a trace that a successor is raised on needs an address, not a tombstone (§2.8, §2.6, §2.7; item 8). |
| J-A11.21 | Chose to make a tunnel's condition — in use, neglected, caved in, collapsed, sealed — a derived reading of its existence and closure through II.6's condition table, whose `open` column the underground's frontage rule reads, and `navigable` a derived value stored on the record, over a second stored condition state, because two stored states for one fact would drift, every record already carries `Lifecycle.existence`, and a `setAttr` on the condition maps cleanly to the matching conversion (§2.7; items 11, 12). |
| J-A12.21 | Chose to state the underground arena's level mapping in §2.2 rule 1 — rock at L0, tunnel chains at L1, tunnel bands and rock blocks at L2, frontage plots at L3, buildings at L4 — with `ContextVector.arena`, an `underground` pseudo-district kind and a distinct `access_point` vertex role, over an underground of its own record types, because the owner's three rules are what the ground's corridor construction already guarantees (the kernel's J-A12.31, the sewers seat's J-A12.41) and one set of records on two arenas is one set of edits and tests; the role's name differs from the `access` edge role because the registry is one table of role names (§2.2, §2.5, §2.7; item 12). |
| J-A20.21 | Chose `Identity.dossier` (a `DossierRef`) as persisted identity in the model digest, the lifecycle kinds `reject`, `lapse` and `place`, and `Rejection` listed in the registry as model data keyed by element and site, over a flag on the assignment alone, because an entity that exists for a dossier element must carry that fact wherever it goes — through succession, export and the host bridge — and a rejection that lapses is history the lifecycle block must hold for undo (§2.8, §2.9; items 20, 22). |
| J-A25.21 | Chose `ditch` as a water-body kind and `LandUse.reclaimed` as a trace, stating in §2.3 once what silting, reclamation, a course shift and a canal change on the records, over new record types for reclaimed ground, because reclaimed land is land with a memory, its drain is water like a canal, and the water operator already repairs a moved shore or a re-traced reach (§2.3, §2.7; item 25). |
| J-A24.21 | Chose `Reservation.rank` on market kinds and `dist.market` as the nearest market of either rank, over a separate market record or a principal-only distance, because N markets are the same reservation kind ranked, and every rule that reads "distance to the market" means the nearest one (§2.5; item 24). |
| J-A27.21 | Chose to carry the band set's ids and the middle designation on `FieldBands` (`bands`, `middle`) while the band-set row type stays §4.5's table, over declaring the row type in §2, because the record is what every band-keyed reader resolves against and the table's rows are stage parameters by the canon's home rule R3 (§2.5; item 27). |

=== END ===
