=== REPLACE ### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===
### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground, or the underground layer's sewer network; underground parts ≥ 1 = one arena per further system (catacombs, caverns, quarries and mine voids, vaults, a buried old town, dug passages — II.7.6), each number allocated once at the system's creation and never reused (§3.4; the counter nextUndergroundPart, §2.9); sky parts 1–3 = one arena per sky island (§4.2, II.1)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey;
  frame: Frame /* §3.2 (9): set at creation; replaced only by the frame growth of an epoch's upward rung crossing (§3.2 (9), §4.11; J-A81.41), which only grows it */;
  readonly lattice: LatticeSpec /* fixed for the arena's life: §3.2 (1)'s range bound is taken at the population cap and the extreme aspect, so a grown frame keeps every old lattice point */;
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

   **The underground layer's levels (items 12, 65; II.7).** The same five views serve the sewer network's part (part 0 of
   the `underground` layer) with their own meanings: **L0** one land face — the rock — bounded by the arena's outer ring, a chain carrying the structural `margin` role
   on the underground pseudo-district's record (II.7.3), written by the network stage before any tunnel as S1 writes the
   ground's ring; **L1** the tunnel centrelines (`tunnel` chains, never `way`: the underground has no street skeleton, II.7.3's
   U2); **L2** the tunnel bands — bore plus wall (`Tunnel.widthCm`, the profile row's wall thickness, II.7.2) — as the
   half-corridor strips and junction wedges `corridorUnion` builds from them (§3.7; the band's outer ring is the tunnel's
   external wall, the kerb every frontage plot's lines end on), and the rock between the bands as the underground's built
   blocks; **L3** the frontage plots, each fronting exactly one navigable, open tunnel run (II.7.3's U1), and residue typed
   `rock`; **L4** the buildings, flush against the kerb (U3). The underground and the ground never share topology (rule 2):
   every surface constraint the underground reads is a query on the ground's key (§3.4; J-A12.32).

   **The underground layer's further parts (item 65; II.7.6; J-A65.31, J-A65.32).** Every other system's part takes the
   same five views: **L0** its rock face, bounded by the part's outer ring — the ground's frame plus its context margin,
   as the sewer's is (II.7.2), so every part grows with the frame by §3.2 (9) (J-A65.22) — a chain carrying the structural
   `margin` role on its `UndergroundSystem` record (§2.7), written by the system's stage before any gallery; **L1** its gallery centrelines — `gallery` chains, a
   system's passages and an undercity's walkways alike — and each chamber's closed outline chain, carrying the structural
   `chamber_wall` role (rule 7), whose inside is the chamber's floor, an L1 face; **L2** the gallery bands — bore plus
   wall (`Gallery.widthCm`, `wallCm`, §2.7) — that `corridorUnion` builds as it builds a tunnel's (§3.7), and, inside a
   chamber the undercity settles (II.7.5), the walkway bands and the built blocks between them; **L3** the plots —
   frontage plots on a gallery's kerb, plots that may end on the `chamber_wall` — and residue typed `rock`; **L4** the
   buildings under the chamber's ceiling (`Chamber.ceilingCm`). Two parts never share a vertex: a link between elements
   of two parts names one vertex in each (`UndergroundLink`, §2.7, its ends carrying the `link_end` role), and two systems
   that cross in plan without meeting are two parts, drawn over and under (§8.4).
2. **One arena per `PlatKey`; the five levels are views of it (J-K1).** All levels live in one vertex-and-half-edge
   arena and every edge carries its birth level; the level-n subdivision is the set of edges of level ≤ n, so each
   level-n face is exactly the union of the level-(n+1) faces inside it. Nesting therefore holds by construction and is
   checked by index (§3.10). A face walk at level n follows `next` and, around each vertex, skips edges of level > n
   (O(degree)). A level's face records inside a parent face are materialised when the first edge of that level is
   inserted there; until then the parent face is its own child. A shared boundary is one edge seen by every finer level
   — a kerb, a plot line, a party wall — so a warp moves it once and two row houses share literally one wall edge. The
   ground, each underground part and each sky island are separate arenas and never share topology: sky and underground
   geometry never cut ground faces, two underground parts never cut each other's, and cross-arena links (an island's
   shadow footprint, a sewer outfall, an access point, an underground link) are entity ids, naming at most one vertex in
   each arena.
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
5. **Topology by index; references by role (J-K3, J-K9).** Inside the kernel topology is keyed by `VertexId`,
   `HalfEdgeId` and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a vertex's position**, except a building's wing rings and its
   stored stage-3 composition's and plan's rings and points and its tower centres (§2.6), whose boundary points are
   footprint vertices that §2.6's wing-carrying rule re-reads after every change of the footprint, so they cannot go
   stale. Otherwise vertex positions live only in log events (with a `VertexSig`, below), view state, label placements
   and `StretchRef` ends; a point that is no vertex — a river's control knot, a pin's or decoration's point, a tree
   override, a point light's point, an access point's ground point, a Works' kept rings and lines — is an ordinary
   attribute of its record (§2.3, §2.7, II.7.4, §7.4), and one inside a building — a basement ring's
   point, or a stored composition's or plan's point off the footprint's boundary — is carried with its building by that
   rule's mean-value coordinates (§2.6 rule 2 (b)). An entity reaches its geometry through the kernel's role and owner
   tables — `ChainRef('way', wayId)` for a way's spine, `FaceRef(plotId, 3)` for a plot, `VertexRef('junction', id)`, a
   bridge's deck ends `VertexRef('deck_end', bridgeId, 0 | 1)`, a water gate's bank ends `VertexRef('gate_end', gateId,
   0 | 1)`, a castle's weld ends `VertexRef('weld', castleId, 0 | 1)`, an open wall's end anchors `VertexRef('anchor',
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
     sub-edge of a treated plot edge left open for a gate, indexed per gate), `tunnel`, `gallery` (the centreline of an
     underground system's gallery or an undercity's walkway, in its own part, rule 1; item 65), `chamber_wall` (a
     chamber's closed outline chain, rule 1; item 65), `invisible`.
   * **Vertex roles:** `junction`, `tower`, `gate`, `entrance` (one row per entrance of a building's entrance set,
     `('entrance', building id, i)`, §2.6, item 29), `portal`, `attach`, `anchor`, `weld`, `deck_end`,
     `gate_end`, `composition` (a stored stage-3 composition's boundary points, §2.6), `access_point` (an `AccessPoint`'s vertex
     on its underground element — a tunnel's or a gallery's kerb, a chamber's wall, a sewer dwelling's side or rear wall,
     II.7.4 — a vertex role, distinct from the `access` edge role above), `link_end` (`('link_end', link id, 0 | 1)`: an
     `UndergroundLink`'s end, one vertex per part in both of the parts it joins, §2.7; item 65), and one knot role per profiled
     attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`, `shore_class_knot`). The registry marks
     `entrance`, `attach`, `anchor`, `weld`, `deck_end`, `gate_end`, `composition`, `link_end`, `gate_opening` and the knot roles **indexed**
     (their rows carry an ordinal).
   * **Structural and partition roles.** The registry marks each edge role **structural** (`way`, `wall`, `wall_gate`,
     `shore`, `bank`, `border`, `margin`, `reserved`, `setback`, `deck`, `tunnel`, `gallery`, `chamber_wall`) or
     **partition** (the rest): a
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
  seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */;
  geology: 'ordinary'|'soluble'|'volcanic' /* item 65: the site's rock under the frame — written by S1 (§4.2) with the resources, or overridden by `setAttr` (§7.1's terrain row), read only by II.7.6's cavern rule (soluble or volcanic rock holds caverns); 'ordinary' on a sky island's terrain */ }
interface HydroGrid { cellCm: Cm /* TOWN 1 600, CITY 2 500, METROPOLIS 3 200 (table values at creation; kept through frame growth, §3.2 (9)) */; cols: number; rows: number; originX: Cm; originY: Cm /* the same extent as the height raster */ }
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

Terrain is a raster in metres with a resolution set at creation by the size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m —
so the 128² fixed grid VG uses at every size is never the constraint) over the frame and its context margin; `cols ×
rows` follow the arena's width × height (§3.2 (9)). The resolution is kept when an epoch grows the frame: every raster
of this section extends by whole cells on its own grid, keeping its `cellCm` (§3.2 (9); J-A81.31), and a re-grid at the
new rung's cell is only that rule's pre-decided fallback. Point queries go through a `TerrainSampler` (bilinear), which is how slope queries
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

**Slow change — what each terrain and water conversion changes (item 25; the kinds, their rarity rows and their rates
are §4.11's, their local repair §7.3 (b)'s).** Terrain and water are the slowest layer, not an immutable one.
`siltReach` on a reach or basin: its `widthProfile` and `depthCm` fall by the row's share and S1's water operator
re-buffers its shores from the unchanged `course` (a basin below the harbour's draught loses its harbour role, §4.11).
`reclaim` of a marsh or a foreshore: the water face's L0 ring retreats (a moved shore, §7.3 (b)) or the marsh `LandUse`
face is re-typed, the new ground is an L3 land-use face marked `reclaimed` (§2.7) and is drained to the nearest outfall
by a `ditch` water body cut like a canal (§4.11's carve). `shiftCourse`: the reach is re-traced between two control
knots with fresh ordinals (`nextControl`), the old shores' vertices demoted as §2.2 rule 3 states and the old bed left
as a `marsh` land-use trace. `digCanal` is §4.11's `carve` of kind `canal`. Each is a lifecycle event on the water body
or land-use face with cause `convert:<kind>` (§2.8), undone from the chain's replaced scope (§7.4). A building's
basement decision (§2.6, item 29) reads `ContextVector.terrainClass` (§2.5) and these facts — the nearest water
surface's elevation and the `hydro` grid's accumulation. Emulation note: neither reference has time; MFCG's warp and
FTG's water drawing already let a user reshape water, which the base keeps as edits (§7.1); this adds only slow change
over epochs (item 23).

=== REPLACE ### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===
### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (below) */; floors: number; floorsBelow?: number /* derived, never set on its own: on Building.heights the basement's Basement.floors (below; item 29), 0 or absent without one; absent from every other entity's heights */; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
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
  spans?: FaceRef /* item 30: the Passage face (§2.5) this wing spans — on each base wing whose ring runs along the passage's edge (a stepped front building's quads each); written only by S11, with `Passage.frontBuilding` (§2.5), and cleared by S11, when it builds or re-fits the passage's front building or the passage goes (§4.6, §4.7 S10 (9); a drawPassage, a block's reach changed to or from passage (J-A30.72), densify … back_court's new passage and the rung-3 re-cut that removes a sealed passage with its rear row (amalgamate) reach it through that re-fit, §7.1, §4.11 — sealPassage, openPassage and thin … back_court's sealing change no geometry and leave it) — and cleared, with `Passage.frontBuilding`, inside the event that makes the front building a footprint trace (§2.8's `cleared`: `robStone` or `clear`, which zero its heights) or a tombstone (`demolish`); each such event holds the passage in its effective scope (§7.3 item 1), and its undo restores what it cleared (§7.4); the passage is then open above — its face, its `sealed` bit and its plots' access unchanged, and no span mark, span caster or arch glyph drawn over it — until S11 raises a successor over it (`reuse … build`, `build`); absent on every other wing. Its span ring and its extent above the ground are as Wing.spans below, so the capacity (below), the leaf digest of the building and §8.5's span mark read them before any composition exists, and a composition inherits them */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, shack, lean_to_shelter (item 70's cluster structures; named apart from the `lean_to` frontage treatment), … data-defined */;
  use?: Id /* the current Use record (§2.7): the roster class it houses, its specialisation and assignment; absent: vacant (item 17) */; formerUses: Id[] /* the Use records that occupied it before, newest last — the traces item 17 (c) keeps (a former inn, a guildhall turned tenement) */;
  concealed?: Id[] /* item 63: the concealed Use records it houses behind its front (`use`), each with Use.concealment not 'none' and Use.front naming `use`; their knowledge is theirs (§2.7; §4.7's Concealed institutions) — absent: none */;
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b — one of its households; cleared by every event that takes that household out of the building — its relocation (§10.3: a use's move, a `relet`, §4.7's overflow pass, the capacity re-homing below) or its leaving at an epoch (the epoch's step (c), §4.11) and by one that leaves the building no live-in use, the household staying as an ordinary one of `households` (§10.3's use that moves without it; a `liveIn` table edit, §7.6) */; households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — the generation fill (S10b's placement, written by S11 once the wings exist, clamped into [1, capacity] for a residential building and empty for every other, §4.7), §4.11's relet, item 17's relocation (§10.3); its length is the count the plan rung houses and the interior ladder reads (below, item 28 (f)), never above the capacity (below) */;
  entrances: Entrance[] /* ≥ 1 (item 29): exactly one of role main, on the footprint side facing the plot's frontage access edge — its street, the court or path from the plot's street gate, a hidden plot's passage or court, a cluster structure's footpath (Entrances rule 1) — plus the side, rear, yard and service doors the entrance rules below allow; replaces the single entrance vertex */; nextEntrance: number /* the next free entrance ordinal (the i of Entrance.vertex): written only by deriveEntrances and setEntrance, never decreasing, so a removed entrance's ordinal is never re-used (as WaterBody.nextControl) */; basement?: Basement /* the selective basement decision below (item 29 (b)); absent: none */;
  heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable; a rendering attribute only (below) */; condition: 'kept'|'worn'|'neglected' /* item 31 rung 1: the fabric's wear — a rendering-class driver like material (§8.2: wear, patched roofs), never a shape input and not an existence state (§2.8); stepped down by §4.11's ladder, restored by renovation */;
  knownTo: 'public'|'local'|'secret' /* item 30: defaults from its plot's exposure and knownTo; a dossier fact for a dossier-backed institution's buildings (§7.7); read by §9.2 and the reader, never by geometry */; predecessor?: Id /* item 8: the cleared trace or ruin this building was raised on (§4.11's reuse … build; the trace's address passes by succession, §6.3) */; reusedAs?: 'garden'|'orchard'|'field' /* item 8: what a reused trace became (existence reused, §2.8) — the trace keeps its L4 face and is drawn as that kind (§8.2); written only by §4.11's reuse conversion or its convert by hand (§7.1); absent on every other building (J-A8.22) */;
  works?: Id /* item 67: the Works (§2.7) running on it; its stage at a week is derived by §4.11, never stored; cleared when the Works finishes, is cancelled or is retired */;
  description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated rung by rung (the elaboration record and cache, §2.8, §2.9), stored only when edited — the first composition or plan edit stores it (§7.1); its streams derive from the building's lineage with each rung's own reroll (§6.1) */;
  assignment?: Id; drift?: DriftBounds; lifecycle: Lifecycle;   // no occupants list (J-A28.29): the housed are households (with a workplace's live-in dwelling), those who work there §10's Posting records
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* the roofless state the decline ladder's decay sets — derelict, and kept through ruin (§2.8 decline hooks) */; pitch?: number /* a ratio, not an angle */; material?: string };
interface MaterialRow { key: { era: string; stage?: number /* FTG's per-stage default: the growth stage of the building's plot */; districtKind?: string; cls?: string /* overrides, the most specific winning: class (temples and churches stone by row), then district kind, then the stage default */;
  band?: string /* only in the optional regional-shift rows below — absent from every default row, so the default never keys a material by wealth (item 19) */ }; walls: string; roof: string; weight: number; extension?: 'regionalShift' /* §7.6's marker: a row of our optional regional shift, off by default (items 19, 23) */ }   // a rule table (§7.6), our own rows; the rule is "Materials" below
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms'|'plan')[] /* the four rungs of the building ladder: outline → wings → rooms → plan (item 28) */; wings: Wing[]; towers: ComposedTower[]; courts: Polygon[];
  rooms?: Room[] /* the rooms rung: the principal rooms a Fantasy-Manor-class composer emits with its wings (a hall, a tower's round room), each with its storey; the plan rung takes them as fixed rings, each less a stair bay or chimney stack it holds (the stage-3 contract, below); optional, and absent from the base's outline builder */;
  plan?: Plan /* the plan rung: every storey's rooms, walls and openings (below) */ }
interface Wing { footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormers?: number /* a free count while the plan rung is absent; once a plan exists it is derived from the plan's roofed rooms with exterior demand (the plan rung, below) */;
  porch?: Porch /* at the main entrance's side and offset (item 29), so the porch and the plan's front door coincide by construction; re-read with it after every carry (rule 3) */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) the wing spans — a composed wing whose ground ring follows the edge of a passage that a base wing spans takes that BaseWing.spans (above) — every such composed wing, and no other — so a composition inherits the span and never decides it. Its span ring — the part of that face under the wing: the face's ring cut by the lines that continue across it the end segments of the two wing-ring sides meeting the passage's edge (a row quad's front and rear chains), a boolean on the arrangement (§3.7), or the whole ring where the wing covers it all — is derived at read, never stored. The wing's ground ring ends at the passage's edge (the stage-3 contract reads that ring) and every storey above extends over the span ring (the wing's extent at level ≥ 1 is its ring ∪ the span ring); at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring — the passage room (role passage, scope circulation), never cut, its two end walls carrying the passage openings (J-A30.23); read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung */ }
interface ComposedTower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }   // a composition's tower — for the plan rung a round wing: one round room per storey and the spiral stair core of the wing it joins (below); the wall tower entity is §2.7's Tower
interface Room { id: Id /* room:<building id>/<level>/<i> — an address carried by its anchor, the room's centroid within its wing (§6.3) */; ring: Polygon /* world lattice points inside its wing's extent at its storey (spans on the base or the composed wing; the passage room is a span ring): a value read back from the rung's transient arena, never a plat face (§3.4; J-A28.31) */;
  wing: number /* index into Composition.wings; a tower's round room names its ComposedTower by wings.length + the tower's index; the passage room names the wing that spans it */; storey: number /* Storey.level */; role: RoomRole; scope: 'unit'|'shared'|'service'|'circulation' /* §10.2's RoomRuleRow.scope: a household's own room, one the households share, the use's or the staff's, or a corridor, stair hall, landing or passage */;
  unit?: Id /* item 28 (f): the Household whose dwelling unit the room belongs to — present exactly when scope is 'unit'; edited by setRoomUnit (§7.1) */; program?: number /* index into Plan.program; absent for a generic room */;
  subLocation?: Id /* the SubLocation it hosts: rooms refine sub-locations, never replace them (below) */; hearth?: { wall: Id; at: Cm; chimney: Id }; lit: boolean /* a light at the room's spine summit (§8.5, §11.1; J-A28.32); corridors unlit */;
  concealed?: true /* item 63: a room of a concealed use's programme (the plan rung, steps 2 and 5): entered only by a service, yard or concealed door; drawn and read only for a viewer whose knowledge admits the concealed use (§9.2) */ }
interface Plan { storeys: Storey[]; program: ProgramRoom[] /* the programme as sized and allocated (the plan rung, steps 2–3 below): what the plan owed — read by the report, §13.2's bars and the re-cut */;
  units: { household: Id; form: UnitForm; entry: Id /* the Opening that is the unit's own door, onto circulation or the street */ }[] /* item 28 (f): one per household housed */;
  cores: StairCore[]; chimneys: Chimney[]; pattern: Record<number /* storey level */, LayoutPattern>; slices: SliceRef[] /* the programme, pattern, furniture and interior-ladder rows consulted (§2.8) */ }
interface Storey { level: number /* −k … −1 the basement's storeys, 0 the ground, 1 … n above */; wings: number[] /* the wings whose floors — or the basement ring — reach this level */;
  rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }
interface ProgramRoom { rule: number /* index into the programme row's rooms (§10.2 RoomRuleRow) */; role: RoomRole; scope: Room['scope']; unit?: Id /* scope unit: the household it is for */;
  areaM2: [number, number, number] /* the row's min, target and max × the interior ladder row's size factor, interpolated along the occupants' value (below) */; storey: number; wing: number; concealed?: true /* item 63: a concealed use's row (§10.2's RoomRuleRow.concealed) */; anchor?: { entrance: number /* an entrance's ordinal: its entrance room, one per entrance (step 3) */ } | 'core' | 'hearth' | 'passage' /* the passage room: the span ring (step 1) */ }
interface Wall { id: Id; a: PointCm; b: PointCm; kind: 'exterior'|'party'|'partition'|'court'; left: Id | 'outside'; right: Id | 'outside' }   // exterior and court walls lie on the edges of the storey's extents (wing rings, and a span ring: the passage room's walls, J-A30.23), a party wall on the plot's party-wall edge (the stage-3 contract's fourth rung, below)
interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm; kind: 'door'|'arch'|'open'|'entrance'|'passage'|'trapdoor'; entrance?: number /* the entrance's ordinal (the stable i of Entrance.vertex; item 29): every entrance opens here; the passage room's two arch openings are of kind passage and name no entrance (item 30, J-A30.23) */ }
interface WindowRec { id: Id; wall: Id; at: Cm; widthCm: Cm }
interface StairCore { id: Id; wing: number; tower?: number /* index into Composition.towers: a spiral in a round wing */; bay: Polygon /* the same bay on every storey it serves */;
  levels: [number, number]; kind: 'straight'|'dogleg'|'winder'|'spiral'|'ladder'|'trapdoor' }
interface Chimney { id: Id; wing: number; column: PointCm; levels: [number, number] }     // derived from a hearth column (a small fixed ring on the transient arena, §3.4); the roof construction draws it (§8.6)
type RoomRole = string;        // data-defined by §10.2's room-programme rows (our own names: hall, chamber, solar, parlour, kitchen, buttery, common room, cooking place, staff chamber, stair hall, forge, shop, store, undercroft, nave, passage …)
type LayoutPattern = 'bisect'|'follow'|'spine'|'hall_and_parlour'|'cross_passage'|'enfilade'|'nave';   // the cut patterns (the plan rung, below); rows, not code
type UnitForm = 'house'|'dwelling'|'lodging'|'apartment'|'room';   // item 28 (f): the interior ladder's unit forms, richest first (below)
interface InteriorLadderRow {   // item 28 (f): one row of the interior ladder (below) — the interiorLadder table of roomProgram.json (§7.6, §14); its default rows are the table below
  band: string /* a FieldBands.bands id: one row per band of the set (§4.5) */; form: UnitForm /* one household's unit */;
  households: [number, number | 'capacity'] /* the range a shell of this row houses, clamped into [1, capacity] (the capacity function, below): it bounds relet and the canonical chain's row steps, never the as-built count */;
  unitRooms: RoomRole[] /* scope unit */; shared: RoomRole[] /* scope shared, where the class's programme row allows */;
  staff: { count: { n: number; law: 'const'|'perPrincipalChambers' /* n rooms, or one per n principal chambers */ }; sizeShare: number /* of the owners' principal chamber's target */; placement: ('attic'|'basement'|'service')[] /* preferred first */ } | null;
  circulation: { roles: RoomRole[] /* scope circulation: stair hall, corridor */; patterns: LayoutPattern[] /* the circulation's cut patterns, preferred first */ };
  sizeFactor: number /* × the programme rows' room areas */ }
interface Entrance { vertex: VertexRef /* ('entrance', building id, i): a vertex on the footprint edge, indexed (§2.2 rule 7); i a stable ordinal — kept by a re-derived entrance that §6.3 re-matches, Building.nextEntrance for a new one, never re-used after a removal — which Opening.entrance and ProgramRoom.anchor name */; role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|'alley'|'yard'|'court'|'passage'|'footpath' /* the way or part the door opens onto; passage: an item 30 passage face; footpath: a cluster structure's path (item 70) */;
  concealed?: true /* item 63: a concealed use's own door — a service or yard entrance where rule 2's access edge presents itself, never the main one; its knowledge the concealed use's (Entrances, below) */;
  wing: number; side: number /* the wing ring's side, as Porch.side */; offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry (rule 3) */ }   // item 29; the rules are "Entrances" below
interface Basement { floors: number /* storeys below ground, ≥ 1 — the one stored count, which Heights.floorsBelow reads; 0 for a crawl space, which is no storey */; kind: 'full'|'half'|'walkout'|'crawl' /* crawl: item 66's requested form — a void under a raised ground storey, reached by a hatch (Basements, below) */; ring: Polygon /* inside the ground storey's wings and smaller than their union; world lattice points, carried with the wings by rule 2 (b)'s mean-value coordinates (CarriedShapes.basement; rule 4 checks it) */;
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it — the stair core (where no bay of the core fits inside the ring, a trapdoor core the plan reports: the plan rung, step 3), a trapdoor, or an outside stair (step 3's reported trapdoor core where no side of `Basement.ring` is long enough for its door); derived with the basement, a shell fact (Basements, below) */ }   // item 29 (b); the decision is "Basements" below
interface Porch { side: number /* the side of its wing's footprint ring that it stands on, by ring index */; offsetCm: Cm /* from that side's first vertex along the side */; widthCm: Cm; depthCm: Cm /* outward */ }   // relative to its wing: no world point, so it moves with the wing; its side and offset are the main entrance's, re-read after every carry (rule 3)
interface BuildingInput { lot: Polygon; access: Segment[]; slot: SlotPlan /* §2.5: at S11 the site plan's working hint; at a later outline() or compose() call the building's current footprint ring, resolved at the call */; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */;
  building?: Pick<Building, 'households'|'entrances'|'basement'|'subLocations'|'use'|'assignment'|'concealed'> /* the plan rung's content inputs (item 28), resolved at the call like the footprint ring */;
  accesses?: Id[] /* item 64: the AccessPoints that open in its basement (II.7.3's Basement accesses, declared in II.7.4) — anchors of the plan (step 3) */; stage?: WorksStage /* item 67: its running Works' stage at the drawn week (§4.11), which the plan's drawing shows (below) */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
  plan(input: BuildingInput, composition: Composition, k: Kernel, prior?: Plan): KernelResult<Plan>;   // the fourth rung (item 28): lazy under §4.1's contract, on the click's request, on a transient arena per storey (§3.4); prior = the canonical prior a re-cut mutates (the interior ladder, below; §7.3) — never the cache
}
interface ClassRules { pick(ctx: ContextVector, bands: { field: { band: string; value: number } /* the occupants' band — the plot's fieldBand (§2.5) — and the current field value (the interior ladder, below): the specialisation and the room programme */; manifested: { band: string; value: number } /* from Plot.builtBand and FieldBands.middle by §4.11's floor rule: the geometry columns */ }, assignment?: Assignment): { cls: BuildingClass; specialisation?: string; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code: the class row and its designation template (§4.7 S11, item 19) — the geometry columns read at the plot's manifested band, the specialisation and the room programme at the field band (J-A19.43, J-A28.29)
// Replaceability and class change (item 31): how soon a band change may replace a building's stock is its designation template row's replaceability at the plot's builtBand (§10.2), read by §4.11's ladder; a class change at rung 2 (a mansion to a tenement, inn, workshop or chapel) is item 18's mutation and keeps the shell (§4.7 S11)
// The wing-carrying rule (below): pure, + − × ÷ and sqrt only (§6.5); when it runs: below.
interface CarriedShapes { wings: BaseWing[]; basement?: Basement /* item 29 (b): carried by rule 2 (b) and checked by rule 4 */; composition?: Composition /* only when stored (an edited stage-3 composition): its wing, court and room rings and its tower centres, and with a stored plan every storey's room rings, walls' end points, stair-core bays and chimney columns (rule 2 (b); J-P48) */ }
declare function carryWings(shapes: CarriedShapes, before: Polygon[] /* the footprint's rings before the change, outer first */, after: Polygon[] /* the same rings after it */,
  moved: (p: LatticePoint) => LatticePoint | null /* the position after the change of the footprint vertex — with spanned, of a span ring's vertex too — that stood at p; null: the change dissolved it */,
  pairing?: 'tiled' | 'overlapping' /* rule 4's pairing verdict, found from the vertex identities once per edit and reused by every halving of one step; computed when absent */,
  spanned?: { before: Polygon[]; after: Polygon[] }[] /* item 30: with a stored composition over a spanned passage, per span ring the rings of the footprint face ∪ that span ring before and after the change — the rings a stored point inside the span ring takes its mean-value coordinates in (J-P48 (2)) */): KernelResult<CarriedShapes>   // E_INVARIANT when rule 4's check fails
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
   cell with the class's `fill` probability, keeping the cell nearest the main entrance and rejecting any drop that
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
footprint vertex positions (with a stored stage-3 composition and its plan, the only entity records that do, §2.2 rule
5; a basement ring's points, all inside the footprint, are carried with them), so one pure function, `carryWings`, keeps
every building's wings on its footprint face through every change of that face's rings: a `warp` or `moveVertex` moving
a vertex of the face (the commit record's `moved` list, §3.3); a batch adding a vertex to one of its rings (a
neighbouring plot re-fitted with a corner on a shared party wall; II.1 (3)'s neighbour step splitting a kerb a row
footprint fronts; S12b's formal-garden grid line or orchard-part edge ending on a house wall, §4.9) or taking one out (a
dissolution, or that step's reversal); and S11's own insertion of the footprint, the first carry. **When it runs is
stage-agnostic (J-P47):** after every committed batch — generation or edit; derivation pool, hinterland unit or
generation worker — whose commit record lists a footprint face among the L4 faces it changed, a vertex of one among the
vertices it moved, or — for a building whose stored composition has a wing that spans a passage (`spans`) — that
passage's face among the L3 faces it changed or one of its vertices among the vertices it moved (§3.3), the batch's
writer runs `carryWings` for that building before its next batch (a passage and its front building lie in one block,
§2.5, and an edit that changes the passage face takes the building into its effective scope, as J-P48 (1)'s split faces
are, §7.3 item 1); the building's own S11 batch ends with the first carry, and a `warp` or `moveVertex` runs it inside
the step's whole-step validation (rule 4; §3.6, §7.4). The carry writes only the building's `wings` (and its basement
ring and stored composition), which belong to the writer's own faces — a district's S12b changes only its own footprints
(§4.1's laziness contract), an edit only those of its effective scope and seam exception (§7.3 item 1) — so generation,
a pool of any size, a replay and Regenerate (keep settings) run the same carries on the same rings and store the same
bytes (O9 (c)). The rule:
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
   rounded to the lattice, so a joint two wings share maps to one point for both. The basement ring's points
   (`CarriedShapes.basement`, item 29 (b)) are carried the same way, in the same call (J-A29.23).
3. *Kinds.* A rect's and a quad's `corners` name the same corner vertices after the carry and are re-indexed. A rect
   whose carried ring fails §3.8's convex near-rectangle test becomes a `quad` with its four corners recorded and its
   `ridgeAxis` swapped — a rect's axis 0, along side 1, is a quad's axis 1, the line joining the midpoints of sides 2
   and 4 — so the ridge keeps its direction and the roof path is re-chosen on the carried ring (§3.8, §8.6); a quad and
   a polygon wing keep their kinds. After every carry each entrance's `side` and `offsetCm` are re-read from its vertex
   — the side of its wing's ring the vertex lies on and its arc length from that side's first vertex — and a stored
   composition's porch takes the main entrance's, re-read the same way on its composed wing's ring, so the stored
   numbers never disagree with the door (§6.3's re-match reads them; J-A29.23).
4. *Check (J-P49).* Every carried ring is simple and counter-clockwise, and the union of the building's wings equals its
   footprint face (integer equality after snapping — the stage-3 contract, below). It is decided exactly, at the least
   cost, by the building's **pairing**: whether every directed edge of its wing rings, keyed by vertex identity (a
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
   and a joint moves only by the sub-centimetre route changes such a batch makes (§2.2 rule 3). The basement ring is
   checked in the same pass — simple, counter-clockwise and inside the footprint face (exact `orient2d` tests): an
   unedited basement whose carried ring fails is re-derived by the basement decision (below) inside the step, with no
   halving; an edited one fails the step's validation as a held pin does (§7.4), and after any other batch its edit is
   orphaned (§7.3 item 4) as a stored composition's is (J-P48), the basement being re-derived until the user re-attaches
   or discards the edit (J-A29.23). *Cost* (measured on a model of the rule, per building per validation pass, the carry
   and rule 3 included; Node 24 on the bench machine, `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`):
   ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a one-wing rect (rule 3's test), ≈ 0.9–2.7 µs for tiled L, T, cross, U and
   inner-joint compositions (their check 0.15–0.4 µs of it), and ≈ 0.3–0.9 µs once per edit for the pairing; an
   overlapping composition adds its union, bounded by S11's compound geometry share (≤ 25 µs, §12.4's S11 row;
   PLAUSIBLE). On an assumed core mix — 55 % row quads, 25 % one-wing houses, 18 % tiled, 2 % overlapping — 450
   buildings, §12.6's district ceiling and about what a 150 m brush (≈ 7 ha) covers in a dense CITY core, cost ≈ 0.4 ms
   per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's warp Apply budget, which counts
   it; M3a's measurement on that brush and its pre-decided fallback are §12.6's.
5. *Undo, replay, `moveFootprint`.* The edit's undo record keeps the former rings (§7.4), and a replay performs the same
   carry on the same geometry, so it gets the same rings. `moveFootprint` applies its rigid move to the wing rings and
   S11 re-fits the plot with them as `fixedWings` — the first-carry path.

**A stored composition is carried with its wings (J-P48).** A stage-3 `Composition` is derived lazily and stores no
position until an edit stores it (`Building.composition`; the edit kinds that do so are stage 3's and the plan events of
§7.1; a hand-built one is stored by §2.6's test); from then on its world geometry — each composed `Wing.footprint`, each
court, each room ring (the rooms rung's and, with a stored plan, every storey's), each `Wall`'s end points, each
`StairCore.bay`, each `Chimney.column` and each `ComposedTower`'s centre — is carried in the same `carryWings` call as
the base wings, by the same rules. A porch is stored relative to its wing's side (`Porch`) and takes the main entrance's
side and offset after every carry (rule 3). A designation mutation (item 18) re-matches a stored composition's and
plan's rings to the target template by role inside its event (§4.7 S11) and re-cuts a stored plan by the re-cut rule
(the interior ladder, below).

* (1) The edit that stores it establishes rule 1 for it in the same batch: every point of those rings, wall ends, bays
  and columns and every tower centre that lies on the footprint face's boundary becomes a vertex of the footprint rings
  — on an L4 edge by a same-level L4 split, on a plot line (L3) or a kerb (L2) by an L4 Steiner vertex that
  `splitThrough` places, the composition's point re-read at the placed vertex (§2.2 rule 3) — and each such vertex
  carries a `('composition', buildingId, i)` vertex role row while the composition is stored, so no dissolution removes
  it (§2.2 rule 7); the row leaves with the composition when an undo removes it or it is orphaned (below). The base
  wings gain each such vertex by rule 2 (a), and a point one composed ring has on another's side is made a vertex of
  both (a data step on the record). Every face that shares a split edge — the building's own yard parts, a row
  neighbour's footprint across a party wall, a neighbouring plot's L4 face across the plot line — gains the vertex and
  is in the storing edit's effective scope, together with a row neighbour's wing rings, which its carry changes the same
  way; each ring equals its prior ring with those vertices removed (§3.3's same-level-split rule; the check of §7.3 item
  7 (ii)).
* (2) Boundary runs are re-read by identity and every other point takes its mean-value coordinates in the footprint's
  rings before the change — a stored room's point in a spanned passage's span ring (the plan's passage room's, or a
  room's above it, the rooms rung's or the plan's) in the rings of the footprint face ∪ that span ring (`carryWings`'
  `spanned`; J-A30.23) — applied after it and rounded, so a point that a wing, a court and a room share maps to one
  point for all of them, and a tower centre on the boundary, a footprint vertex, moves with it; each composed wing and
  tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are (§7.4).
* (3) A composed `Wing` has no kind to lose — its roof construction is re-chosen on the carried ring (§8.6).
* (4) The check adds every carried composition ring simple and counter-clockwise, the composed wings uniting to the
  footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the union of the face and the span
  rings of the passages the building spans (J-A30.23), a stored plan's rooms tiling each storey's extent (the contract's
  fourth rung, by §3.10's seed-tiling test) and every tower centre inside or on the face (exact `orient2d` tests).
* (5) The undo record keeps the former composition with the former wing rings (§7.4).

A failure inside a warp or `moveVertex` halves the step, as for the wings; after any other batch — where rule 1 makes it
as rare as for the wings — the stored composition's fate is **orphaned** (§7.3 item 4): the dry run lists it, the edit
that stored it stays in the log and in the document's orphan table, the record is dropped and the building composes
lazily from its carried wings until the user re-attaches or discards the edit — never silently. Wherever this document
names a building's wing rings as carried, re-based, excepted from locality or restored — §2.2 rule 5, §4.6 step 7, §5.3,
§7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4 — a stored composition's rings, wings and tower centres and a
stored plan's points are included, by this rule, and the basement ring by rule 2 (b).

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
(table, default 30 cm) — over a requested crawl space, also half the class's cellar depth (Basements, below) — so no floor is
buried; the fall under the wing (`max − min`) is a foundation skirt the 3-D export
extrudes down to the terrain and the shadow pass includes. Where the fall across a row footprint would exceed
`skirtMaxCm` (table, default 300 cm) the footprint is split along the contour into stepped wings, each within the limit
— terraces step down a hill instead of floating. Walls store their base as a knot profile along the trace (§2.2 rule 5),
gates and towers their own base from the samples under their footprints, bridges and pier decks a deck height from the
two bank elevations plus a clearance row. Shadows and the 3-D export (§11.1) read the same numbers, so they agree on any
terrain. The lighting model and its shadows — cast by the sun and by the placed lights over the height field, their
defaults and budgets — are §8.4's (item 68; §12); the base populates every height and keeps the display list's shadow hook
(§8.1). A building under Works (item 67) keeps its finished heights in the record: its heights at a week are derived by
§4.11's `heightsAt` — the walls rising storey by storey, no roof before ROOF FRAMED — and a `framed` roof (rafters without
covering) is a drawn state, never a `RoofSpec.kind`. The heights acceptance bar is §13.2's.

**Materials (COV-FTG-F20; item 19; owner, 2026-09-26: "different materials for construction is only represented by a
change in texture or color. It has nothing to do with the shape").** A material is a **rendering attribute only**: it
changes the texture and colour roles the style sheet maps it to (§8.2) and never a footprint, a wing, a storey, a height
or a roof form — the same geometry renders in any material, as in FTG; shape is decided by the designation template and
prosperity alone (§4.7 S11). `MaterialRow` is a rule table read by S11 whose **default rows reproduce FTG's model**
(item 23): one default material per growth stage (`key.stage`), overridden per district kind and per building class
(temples and churches stone by row), with wealth shown through the lifestyle-banded building pools (§10.2) and the
roof-colour role by band in the style sheet (§8.2) — never by a material keyed to the prosperity band. The **optional
regional shift** — rows marked `extension: 'regionalShift'`, off by default, a preset row (D-2) — may shift materials
with the prosperity band within what the region builds with, never as a universal ladder. A district's
`materialOverride` and a building's `setAttr` override the rows; enceintes carry their own wall material (§2.7). Wear
(`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline
ladder's derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8). Test: a material change leaves the geometry subtree of
the digest unchanged (§13.2).

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the
naming engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come
from the class table and are what the simulation module reads. `SubLocation` records (named parts of a building with
tags and capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table
when the building is created; stage-3 rooms refine them (a `Room` may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). Fantasy Manor's model (build 890, version 1.0.0) needs no input but a path of wings and their
breadth, which a lot-derived path supplies directly; its five layout families — closed rings of four, five, six or eight
equal sides, stars of four to six points, open arcs of two to seven equal segments, rectangles, and self-avoiding paths on a
four-by-four grid — become stage 3's **path-shape rows**
(`PathShapeRow`, below; provenance `ref:Fantasy Manor build 890 layout families (code)`, P21), and a hip block stays
distinct from a square tower's pyramid (`RoofSpec`: `hip` ≠ `pyramid`). Ours adds what that model lacks (J-A59.21): the
wings join the collision set, so no tower or block stands through a wing; the porch options are restricted so that
every building's main door faces its street (Entrances, below — that model guarantees none: about 14 % of its buildings
have no entrance, D4); and the scale is metric.

```ts
interface PathShapeRow {   // item 59: stage 3's path-shape rows — the path of wings a lot-driven composer lays inside the plot; a data table (§7.6), read at the class's designation row; our rows, their families from Fantasy Manor build 890 (P21)
  family: 'ring'|'star'|'arc'|'rect'|'snake'; sides?: number[] /* ring: its side counts; star: its point counts */; chords?: [number, number] /* arc: the least and most segments */; gridCells?: number /* snake: the grid's cells per side */;
  cls?: string[] /* the classes that may take it; absent: every composed class */; weight: number /* equal across the five families in the parity row */; provenance: string }
```

The interface is split so the city view never waits for a manor: `outline(input)` returns the wings
every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged, with heights and roofs added — and
`compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
tile at district LOD and finer (a tile draws the outline until its compositions arrive). Their budgets — the base
`outline()` inside S11's geometry share, a stage-3 `outline()`'s admission bound and the re-declaration of S11's §12.4
row by the measured difference, `compose()` per building and per tile — are §12.7's. **The stage-3 contract:** the union
of the composed wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical
footprint hash at every LOD holds by construction (its test: §13.2). A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2). The contract reads the wings' **ground rings**: a
wing that spans a passage (`spans` on the base or the composed wing, item 30) contributes its ground ring, its span ring
lying outside the union at the ground and inside the wing's extent above it. The plan's seed rings — base or composed,
clipped to tile (the plan rung's step 4) — stand at least `attractCm` apart except where they share a joint, so the plan
rung's transient arena inserts them unmoved (§3.4's seed contract). The seed clip (§3.4's `tileRings`) is given the
wings reaching a storey in the **clip order**: wing order, except that a wing whose extent there lies wholly inside
another's is taken after that container (two identical extents keep wing order), so a contained wing has no piece at
that storey — its floor there is its container's, and every anchor or fixed ring the plan rung places in that wing at
that storey lies in the container's piece — and no piece has a hole, which the clip refuses. The composed towers — each a round wing to the plan rung (`Composition.towers`) — join the clip order at every storey they reach: a tower whose ring there lies wholly inside the extent of a wing and overlaps no wing taken before the first such wing in the clip order (its container) is taken directly after that container, towers sharing a container in `Composition.towers` order; every other tower is taken before all the wings, in `Composition.towers` order; and no tower's ring lies wholly inside another tower's at a storey both reach (a stair inside a tower is its spiral core, `StairCore.tower`). So the clip order stays one order and no piece has a hole. Each tower's round room is its ring less those of the earlier towers in the clip order that it overlaps — its own piece when it precedes the wings, each wing's piece taking the arcs; a tower wholly inside a wing that overlaps a wing taken before that container is taken before the wings too, the earlier wing, not wholly inside the container, carrying the tower's cut to the container's edge; a tower that follows its container has no piece there, and its round room lies inside the container's piece.
A stair core's bay or a chimney stack that step 3 places inside a composer's room — the bay of a spiral core (`StairCore.tower`) inside its tower's round room, a stair or a hearth's stack inside a hall — stands against that room's wall, meeting its sides along one run and nowhere else, or fills the room (a stair turret); step 3 filters its candidates to those that stay out of every composer's room or stand in one so, and that leave each composer's room, less every bay and stack it holds, in one piece the transient arena accepts beside them (§3.4: `minEdge`, clearance, simplicity); a refusal naming a vertex that a bay or stack gives the room belongs to that bay or stack (F-PLAN tier 2, §5.2), so a refused composer's room stays the composer's bug. At each storey where such a bay or stack lies, the plan rung passes the room less it, and no room where it fills the room, so the room keeps no hole and meets that bay or stack only along its sides (§3.4's `transientArena`).
Every composer's room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey — the composer emits it inside its own wing's or tower's extent less the extents before that wing or tower in the clip order, or inside its container's piece where the clip order leaves it none — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug. **Its fourth rung** (item
28): per storey, the union of the plan's rooms equals the union of the **extents** of the wings that reach the storey —
a wing's extent is its ring and, above the ground, its ring ∪ the span ring of the passage it spans (`spans`, on the
base or the composed wing) — and, at the ground storey, also the span ring of each passage a wing of the building spans,
which the plan reserves before any cut as one room of role `passage`, scope `circulation`, its two end edges exterior
walls carrying the passage's arch openings (the plan rung, below; §3.10's seed-tiling row; J-A30.23).
* **Stage-3 intake measurement and fallback.** The stage-3 intake measures the generator's `outline()` time per building
  class on B-CITY METROPOLIS seeds. If it exceeds §12.7's 10 µs median, `outline()` runs the generator's own massing step
  only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base `OutlineBuildingGenerator`
  keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must union to the base outline).
  Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed by the context vector),
  not of the generator. The intake also runs §2.6's test with every fixture building's composition stored (§13.2), so a
  stage-3 generator is admitted only with compositions the base can carry and only with compositions that keep that storey rule.

**Entrances (owner, 2026-09-26: "larger buildings can have more than one entrance. there should always be a street facing
entrance. back or side entrances if an alley presents itself are optional or random but limited. back entrances in the
case of a larger court or yard is recommended"; item 29 (a); J-A29.21).** A building's doors are a set, `Building.entrances`:
each a named footprint vertex (`('entrance', building id, i)`, indexed, §2.2 rule 7) on the wing that faces its way,
carried through every change of the footprint by the wing-carrying rule (above), and derived by one per-entity function,
`deriveEntrances(building, plot, template row)`, that S11 (§4.7), the designation mutator (item 18, §4.7 S11 — a house
that becomes a shop gains its street door; a shop that closes keeps the door as a house door) and the edit layer
(`setEntrance`, §7.1, §7.4) all call, as `deriveBase` is called; its draws are the `siteplan.entrance` concern (§6.1), so
re-deriving the doors disturbs no site-plan draw. The rules are defaults; the rows are the designation template's
`entrances` columns (§10.2; item 23: the parity presets give one street entrance per building with side and rear
probabilities 0 — the owner's rule (item 29) as their default, provenance `owner`, since neither the FTG client of the
25 September 2026 capture nor MFCG 12710731 models a door, the latter by inference (what each carries is §13.5's
entrance rows; J-A50.01, J-A50.21)):
1. **One main entrance, always street-facing.** Exactly one entrance has role `main`. It stands on the footprint side that
   faces the plot's frontage access edge — wherever the site plan set the front line (§4.7 S11's recession; flush for a
   row) — and faces the street; where along that side is `deriveEntrances`' draw (J-A50.21). A set-back building on a
   multi-building plot (a compound's hall behind its forecourt) puts its main entrance on the court or the path that
   leads from the plot's street gate (`PlotBound.gates` on the frontage: the plot itself always has a street-facing gate or
   door); a hidden plot's main entrance faces its access face — the court or the passage (item 30, §4.6); a cluster
   structure's faces the `footpath` it fronts (item 70; §4.7 S11), read the same way (J-A70.44).
2. **Side and rear doors only where an access edge presents itself.** A `side` or `rear` entrance is drawn only where the
   plot has an access edge beyond its frontage — a lane, a through-alley, a back lane or a passage face (S8's interior
   treatments and S10's alley rung, §4.6, §4.7) — with the row's probability by class × size × band and capped by the row
   (`capSide`, `capRear`: one side and one rear door for ordinary classes; hovels and row houses ≈ never; shops and inns
   often on a corner; workshops and warehouses toward the lane); `service` entrances for institution classes, one per
   court side the row allows. A concealed use (item 63) adds one `service` or `yard` door flagged `concealed`
   where such an access edge onto an alley or a passage presents itself — never the main door; with none, its concealed
   rooms are reached from the front's service side (§4.7's *Concealed institutions* (4)).
3. **A yard door is recommended.** When the plot's `yard` parts behind or beside the building reach the row's
   `yardDoorMinM2`, a `yard` entrance opens onto the yard or court by default — a kitchen or service door, never a public
   entrance.
4. **Every entrance is an addressable vertex.** Add, move and remove are building edits (`setEntrance`); the main
   entrance moves only along the footprint side rule 1 puts it on and is never removed; entrances are re-derived when the designation
   mutates and kept where an edit fixed them (§7.2). Its ordinal `i` is stable: a re-derived entrance that §6.3's anchor
   re-matches keeps it, a new one takes `Building.nextEntrance`, and a removed one's is never re-used (J-A29.23).
5. **The plan opens a door at every entrance** and roots its circulation at the main one; side, rear, yard and service
   doors are secondary roots, so a plan may legitimately have more than one way in (the plan rung, below); the passage
   room's two arch openings are the passage's own ways through (kind `passage`, no entrance), and a door from the
   building onto the passage is a side entrance facing `passage` (rule 2; item 30, J-A30.23).
§5.3's rows: exactly one main entrance per building, facing its street, its court or passage, or its footpath (rule 1);
no side or rear entrance without an access edge beyond the frontage. Test: §13.2's entrance bars on B-CITY-lite.

**Basements (owner: "selective but appropriate basements"; item 29 (b); J-A29.22, J-A29.24).** `Building.basement` is
derived by the same function, never rolled alone, from: the class row's `cellar` columns (§10.2 — the base probability
by class: cellars for inns, taverns, breweries, storehouses, manors, keeps and temples by row, none for hovels, tents,
sheds, shacks and lean-to shelters; the kind weights; the slope threshold `slopeCm`; the rock cost; the cellar depth `depthCm`, default 220 cm,
and the ring's inset `insetCm`, default 60; for a building carrying a concealed use, the higher probability of its
front's and its concealed class's rows, §4.7's *Concealed institutions* (4), item 63), raised within the class band by
the prosperity value and by the building's
size and storeys (larger and taller more likely), and gated by the **terrain**, read from §2.3's facts and the context
vector — no new raster. The **water table** is the nearest water body's surface elevation (its shore's terrain sample)
plus the freeboard `freeboardCm` (default 50) for a plot within `waterTableM` (default 40 m) of a shore, and elsewhere
the height of the drainage line: the `hydro` cell nearest the footprint's centroid whose `flowAccum` reaches
`drainageAccumCells` (ties by cell index; where no cell reaches it, no water table limits the cellar) — the three values
are §10.2's basement-gate row. Against it: **no cellar** where the plot's `terrainClass` is `damp` or `flood`, or where
even a half-cellar's floor — the wing's `baseCm` less half the cellar depth — would lie below the water table; a
**half-cellar** where the full cellar's floor (`baseCm` less the depth) would lie below it and the half-cellar's would
not, or where `terrainClass` is `low`; a **walk-out** cellar where the fall under the footprint exceeds the row's
`slopeCm` (the same samples `deriveBase` reads — the skirt facts); `rock` lowers the probability by the row's cost. The
basement lies inside the ground storey's wings and smaller than their union (`Basement.ring`, inset by
`cellar.insetCm`), has its own storeys (`Basement.floors`, which `Heights.floorsBelow` reads; its floor `baseCm` less
the depth per storey) and is joined by the stair core, a trapdoor or an outside stair — `Basement.access`, derived with
it: `external` for a walk-out, else the class's programme row's `basementAccess` read at the plot's `builtBand` (§10.2),
a shell fact that never moves with the occupants and is edited with the basement (`setAttr(basement)`) — which the plan
rung reads (step 3). Its ring follows every change of the footprint by the wing-carrying rule (rule 2 (b); rule 4 says
what becomes of a ring that no longer fits; J-A29.23). It is editable (`setAttr(basement)`, §7.1; an edited basement is
kept through terrain changes, §7.3 (a)) and re-derived when its terrain gate changes. **A cellar never joins a sewer as
a room** (item 12: underground neighbourhoods front sewer tunnels only; J-A12.42): a way down from a basement to an
underground element — a stair, a ladder, a hatch, or a door through the basement wall into an adjacent sewer dwelling — is
an `AccessPoint` record (II.7.4, source `basement`), made by II.7.3's *Basement accesses*: a probability by class × band ×
age × concealment, gated by the basement's reach to an underground element (item 64). Emulation note: MFCG and FTG have no
cellars; Dwellings' basement share — n ÷ (n + 1), n being the storeys over the ground, taken from Dwellings itch
17195045's code and replay-confirmed (D2) — is a descriptive baseline, never a gate (§13.5); the terrain gate and the prosperity term
are our extensions (item 23). §5.3's rows: no cellar under the flood band (a requested crawl space, which is no storey,
excepted: below); every basement inside its ground-storey footprint and smaller than it.

**A requested basement (item 66; J-A66.21).** When an edit's closure needs a basement the building lacks —
`addUndergroundAccess` (§7.3 item 9; II.7.6's pieces) — the decision above runs as a request: the request overrides the
class probability, never the terrain gate, and takes the richest lawful form in a fixed order: (1) a full cellar; (2) a
half cellar where the full cellar's floor would lie below the water table, or a walk-out where the fall passes `slopeCm`;
(3) a **crawl space** where the plot is `damp` or `flood` or even the half cellar's floor would lie under the water table
— then the ground storey is raised by half the class's cellar depth (`cellar.depthCm` ÷ 2) above the datum `deriveBase` gives, a void beneath it inside the inset ring, reached
by a hatch (`kind: 'crawl'`, `floors: 0`, `access: 'trapdoor'`) — lawful where the lowest terrain sample under the
footprint lies above the water table, a `damp` or `flood` plot included (a raised floor over a void is the wet-ground
form, item 66 (a)(1)); (4) otherwise a refusal naming the gate each form failed (F-EDIT, §5.2), never a
silent substitute. The closure records the basement it created (§7.3 item 9 (c)): it reverts to the derived decision
once nothing that needed it remains, unless the user edited it; the plan rung reserves the access's stair, ladder or
hatch (step 3) and is marked `stale` (§2.8).

**The plan rung — the fourth rung of the building ladder (owner, 2026-09-26: "a coherent floor plan of the building …
taking and tailoring to the building type and function"; item 28; J-A28.21; the Dwellings synthesis,
`research/findings/dwellings-synthesis.md`, ideas only).** Stage 3's ladder is outline → wings → rooms → plan
(`Composition.lod`); the plan is the building's floor plan per storey, derived by `BuildingGenerator.plan` from the
composed exterior and the building's content — never from a shape of its own — and staged with the Fantasy-Manor
buildings in the owner's order. The base carries the records above, the step's signature, the streams (§6.1), the events
(§7.1), the elaboration record and cache (§2.8, §2.9), the trigger policy (§4.1), the draw, export and budget rows (§8.5,
§11.1, §12.7), F-PLAN (§5.2) and §13.2's bars; adding the rung later is a registration. It runs **function first** —
the reverse of the reference's partition-then-label:
1. *Inputs — nothing is rolled.* The wings that reach each storey (`BaseWing.ring` or the composed `Wing.footprint`,
   with their `spans` (on the base or the composed wing) at level ≥ 1 and, at the ground storey, the spanned passage's
   span ring), each wing's `Heights.floors`, the basement (`Basement.ring`, `Basement.floors`), the entrance set, the
   composed towers, courts and porch, the class and its designation template's `programme` row (§10.2, read at the
   occupants' band — the plot's `fieldBand`, §2.5, J-A19.43), the use, assignment and sub-locations (one room each), the
   concealed uses (`Building.concealed`, item 63), the basement's accesses (item 64), the running Works' stage (item 67),
   the households housed (`Building.households`) and each spanned passage (`spans`): at the ground storey its span ring is a
   seed ring and a fixed ring, the passage room (J-A30.23). A plan is therefore a pure function of the building's
   committed state and its own streams (§4.1's contract, §6.2).
2. *Programme.* From the programme row and the interior ladder (below): a `ProgramRoom` list — each household's unit at
   its ladder row's form, the shared, service and staff rooms the row allows, the class's own rooms (a smithy's forge, an
   inn's common room, a chapel's nave), one room per sub-location, each concealed use's programme rows (§10.2's
   `RoomRuleRow.concealed`, flagged `concealed`; item 63) — each sized in m² (the row's triple × the ladder row's
   size factor, interpolated along the occupants' value) with its storey rule, exterior demand, opening kind, adjacencies,
   hearth and priority; counts by the row's law (`const`, `perStorey`, `perHousehold`, `perCapacity`, `perSubLocation`; a
   fractional count drawn on `plan.program`).
3. *Allocation and anchors.* Each storey's capacity is the area of the extents of the wings that reach it (the passage
   room excluded) less the row's circulation share; hard rooms go by their storey rule, soft rooms by priority until the
   capacity is met, the household units first (F-PLAN tier 0, §5.2: a unit falls to the next poorer form before anything
   is dropped, and no tier drops a unit). The **stair core** (`StairCore`: a bay of the wing the row's `stair.placement`
   names, or the composed tower as a spiral — standing against the wall of any composer's room it lies in, a tower's round room among them, by the stage-3 contract) is placed before any cut and serves every storey of its wing, the basement
   as `Basement.access` says — `core`: the core takes a bay that lies inside `Basement.ring` as well as inside its
   wing's seed piece at every storey it serves (the placement's candidates filtered by exact containment, as §3.4
   requires of a `fixed` ring; the container's piece where the clip order leaves the wing none, the stage-3 contract);
   `trapdoor`, or the fallback where no candidate fits the ring (the core then stopping at the ground storey): a core of
   kind `trapdoor` serving the basement storeys and the ground storey, its bay inside the ring and inside one
   ground-storey seed, placed from the same filtered candidates — the fallback reported, writing no building record
   (`Basement.access` stays as derived; a click changes no digest, §6.2), and where not even that bay fits the basement
   is unreachable, which F-PLAN takes (§5.2, tier 1; J-A29.25); `external`, a walk-out's outside stair: the core
   stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —; the entrance rooms
   (one per entrance) and the hearth rooms are anchors fixed in their wing and side before any cut, each access into the
   basement (item 64: an `AccessPoint` of source `basement`, II.7.3) is a fixed anchor of the basement storey — its stair,
   ladder, trapdoor or door placed before any cut, a crawl space's hatch an opening of kind `trapdoor` in the ground
   storey —, and the passage room is its span ring, fixed whole (step 1), so stairs are stacked by construction.
4. *Partition to targets.* Each wing of each storey is cut on the rung's **transient arena** (§3.4; J-A28.31) — its seed
   rings the extents of the wings that reach the storey, clipped to tile (where wings overlap, rule 4 (iii), each extent
   less the union of the extents before it in the clip order, which the stage-3 contract states, by §3.4's seed clip, `tileRings`), and at the ground storey each span ring (step 1); its fixed
   rings the stair core's bay, the chimney stacks, the passage room (a span ring, both seed and fixed) and the
   composer's rooms, each less a bay or stack it holds (the stage-3 contract) — by the storey's **layout pattern** (`LayoutPattern`, a weighted row per storey class in the
   programme row: `bisect`, recursive cuts across the region's short axis from a re-entrant corner where one exists;
   `follow`, cuts parallel to the long sides — a gallery on the court or street side; `spine`, a corridor along the
   wing's axis with rooms off it, the lodging house's and the inn's upper floors; `hall_and_parlour`, one cross cut with
   the hearth room larger; `cross_passage`, a through passage at the entrance with rooms either side; `enfilade`, rooms
   in a row with aligned doors; `nave`, one room), with the remaining rooms' target areas as the stop rule and the
   pieces assigned to programme rooms as they are cut, so no room waits for a label. Cuts are planned on a **wing-local
   module** — a table row, default 50 cm, in the wing's OBB frame; the planner's grid, never a second lattice — and
   written back as world lattice points (`Room.ring`), so walls are exact centimetre polylines, never cells; slivers and
   one-bay strips merge into circulation.
5. *Circulation and openings.* The room graph is built as a spanning tree first — priced by the programme, the pattern's
   hub (the spine, the hall, the stair hall) preferred, a bedroom's or a store's degree capped by its row — and loops
   are added by rule, never by chance (a kitchen to the yard door; a hall to the parlour and the stair; an enfilade's
   doors) — Dwellings itch 17195045 keeps half of its non-redundant extra doors at random, a loop baseline that describes
   the reference (D3) and binds nothing; a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots
   (item 29 (5)), and a walk-out basement's outside door, where step 3 opens one (`external`), the root of the basement's storeys; stair-core doors on every storey it serves; each unit's own entry door (the ladder, below); a
   `passage` opening in each end wall of the passage room (item 30). A concealed room (item 63) is joined only to
   other concealed rooms, to service rooms and to the room behind a concealed or service door, never to the public hub the
   main entrance roots, so the concealed programme is entered only by a service, yard or concealed door (§5.3's row). Openings and
   windows are records on wall segments.
6. *Exterior coherence.* Per storey the rooms tile the extents of the wings that reach it (the contract's fourth rung,
   above; a wing of fewer floors is roof at that level; a basement's outline is `Basement.ring`); chimneys are derived
   from hearth columns and rise to the roof (`Chimney`, drawn by §8.6); dormers are placed from the top storey's roofed
   rooms with exterior demand (`Wing.dormers` becomes derived, one per such room's façade bay, capped by the eave
   length); the porch sits at the main entrance; a composed tower is a round room per storey with the spiral inside
   (`radialSplit` for two), its bay against the room's wall (the stage-3 contract); windows follow each room's exterior demand, one per façade bay of its exterior wall, aligned
   across storeys where a wall stacks; furniture is abstract shapes by role from the row's `furnish` columns, never
   blocking an opening or the stair bay. Materials stay texture only (above).
7. *Streams, re-rolls, edits, failure, cost.* The rung's four concerns — `plan.program`, `plan.layout`, `plan.roles`,
   `plan.furnish` — are keyed with the rung's own reroll (§6.1): New random on `plan.layout` (`regenerate` with `rung`,
   §7.1) re-partitions and keeps the wings, the entrances and the stair core; on `plan.roles` re-assigns roles and what
   hangs off them (windows, door kinds, furniture) and moves no wall — the reference's restrictive re-rolls as our own
   rule. Room roles, walls, openings, windows, the stair core and a room's unit are events scoped to the building (§7.1:
   `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`; a
   room is lockable on its path); the first plan edit stores the composition with its plan, whose rings and points
   `carryWings` carries with the wings (J-P48, above). A programme that does not fit is F-PLAN's (§5.2), per building,
   never whole-house. **Rooms are values**, never L4 faces, so a click changes no plat and no digest (§6.2). Cost: one
   plan per click within §12.7's row; the room graph is exported in our own schema (§11.1). A building whose running Works
   stands before FINISHED shows its plan as walls without doors, windows or furniture up to the storey its stage has
   raised, and a `decayed` or `ruined` building its fallen walls and open rooms — a drawing of the same plan, nothing
   stored; the stage counts among the rung's recorded inputs (§2.8), so a stage change marks the plan `stale` (item 67
   (h), (j)).

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
item 28 (f); J-A28.23 – J-A28.29).** Item 31's geometry floor bounds what is BUILT: a plot's shell never reads poorer
than its `geometryFloor` by wealth change alone (§4.11). The interior reads WHO IS THERE: the plan rung's programme is
written for the **occupants' band** — the plot's current prosperity **field** value and its band: the field at the
plot's sample point now (the sample §7.2's brush compares), banded by §4.5's rule (the plot's `fieldBand`, §2.5, kept
until the value crosses a cut by more than the hysteresis and re-banded at every epoch, so the band's memory moves with
it), which is `ContextVector.prosperity` and `prosperityBand` at the plot's derivation and follows the field after it
without re-deriving the plot (J-A19.43, J-A31.43, J-A28.29), never the manifested band and never `geometryFloor` — and
for the household count (`Building.households`), and the plan is re-cut inside the unchanged shell as they change. So a
mansion district that grows poor keeps its big shells while their interiors fill with families; the poor of a developed
town live in re-cut interiors behind grand fronts (this rule), in the back courts behind them (item 30, §4.11 rung 2)
and in the cheap stock of the edge (item 27's shanty rule, §4.5). The rule is **one table**, keyed by the band names of
§4.5's band set (`FieldBands.bands`; its middle row is the band `FieldBands.middle` names, so the shell's floor and the
interior's middle agree per settlement), read at the occupants' band and interpolated along the value inside a row; the
per-class programme rows (§10.2) follow it and add what a class needs. Its rows are `InteriorLadderRow`s (above), the
`interiorLadder` table of `roomProgram.json` (§7.6); the default rows (our own; calibratable, §13.9; tendencies
changeable per region and era, item 23 — no reference has interiors that follow their occupants, and with no epoch every
residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity —
so the static baseline is unchanged):

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
* **One capacity function (J-A28.23, J-A28.28).** `capacity(b) = min(households.max of the designation template at the
  plot's builtBand (§10.2), floor(Σ over the storeys s at or above the ground of A(s) × (den − num) ÷ (2 · den ·
  minRoomCm2)))` — `A(s)` the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it (§6.2): at the ground the footprint face's `area2` (the passage room,
  circulation, excluded); above it the sum of the extents' `area2` where the building's pairing holds (rule 4: tiled
  wings, whose rings never overlap; a span ring lies outside every wing ring) and the kernel's boolean union on the
  arrangement (§3.7) where it fails, so overlapping wings count once; `num/den` the circulation share
  (`RoomProgramRow.circulation`, an integer fraction, §10.2) and `minRoomCm2` the minimum area of the `room` form's one
  room (its `RoomRuleRow.area[0]`, in cm²), both read from one row — the class's programme at the band set's first,
  poorest band (`FieldBands.bands[0]`) — so the capacity is a property of the shell alone and never moves with its
  occupants; basement storeys excluded. A building S11 builds for a slot without `houses` (§10.2, §4.7) has capacity 0 — the slot's typing, like the template row, a fact of what the shell was built as, never of its occupants. Every host computes the same integer. The generation fill (§4.7: S10b places the
  households on the plot; S11, which creates the building and its wings, writes each residential building's `Building.households` clamped into [1,
  capacity]), §4.11's `relet` and F-PLAN (§5.2) read this one function, so the solver and the plan never disagree on how
  many households a shell holds. The bound holds through every change: a committed change that lowers a building's
  capacity below its `households` count — S11's operator (§4.7), a rewrite of the plot's `builtBand` (J-A31.44's paths),
  a change of its wings' extents (the carry after a `warp` or a `moveVertex`, by the wing-carrying rule above, or a
  moved face of a passage it spans, which moves its span rings, `Wing.spans`), a `setAttr` of its heights or its class,
  or a §7.6 edit of a table this function reads (the designation template's `households.max` or a structure's `houses` cell, the class's `liveIn`, the `circulation` share or
  the least `room`-form area in the class's programme row at the first band, or the band set, whose first band names
  that row) — re-homes the households past the capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass inside the
  causing event, each move a lifecycle event of it (`relocate`, §2.8); a hand edit lists the moves among its dry-run
  fates (§7.3 item 4) and takes the receiving buildings into its effective scope (§7.3 item 1), and its undo restores
  them (§7.4). No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or — without a dossier — a household that no residential building of the district has room for (on a dossier-bound map every household fills the dossier's population and is re-housed by §4.7's re-provision) — which returns F-EDIT naming them, as a hand `relet` above the capacity does; S11's operator and an epoch's step leave a building whose locked or pinned households alone would exceed its new capacity unchanged, as a lock stops a rung-3 re-cut (§4.11) and any locked entity is a fixed input (§7.2), and a household no building of the district can take in a generation run or an epoch is F-SITING's (§5.2, J-A28.46). The capacity is the
  owner's "the more rooms for more occupying families the richer a building gets", read on the building: a shell built
  richer has more rooms to let — its `households.max` rises with `builtBand` — while the households actually housed
  follow the occupants' band.
* **Never omit a household.** The count the plan must house is bounded by the capacity, which is computed with the
  smallest form, so the `room` form always fits: a unit falls to the next poorer form (`house → dwelling → lodging →
  apartment → room`) before any room is dropped, and no tier of F-PLAN omits a unit (§5.2, J-A28.51); a hand `relet`
  above the capacity is refused (F-EDIT).
* **The re-cut, both ways (J-A28.26).** A change of the occupants' band or of the household count re-cuts the plan as
  item 18's mutation applied to rooms. FIXED, each in the form the transient arena takes it (§3.4; J-A28.33): the shell
  — each storey's seed rings (the extents of the wings that reach it, clipped to tile as step 4 passes them; at the
  ground storey each span ring; below the ground `Basement.ring`), opened again unchanged as the arena's seeds; every
  entrance and its door and the hearths — anchors placed before any cut, each in its wing and on its side (step 3); and,
  passed as `fixed` rings, the stair core's bay, the chimney stacks, the passage room (the span ring, both seed and
  fixed), the composer's rooms (each less a bay or stack it holds, the stage-3 contract) and the rooms the least-disruption rule below keeps. RE-DERIVED: partition walls,
  corridors, doors, roles and units. LEAST DISRUPTION: a room whose seed ring — the one it lies in: its wing's extent at
  that storey clipped to tile as step 4 passes it, or `Basement.ring` — is unchanged and whose ring fits a role of the
  new programme (its area inside the role's [min, max], its storey rule met) keeps its ring and address even when its
  role or unit changes; a shell mutation by item 18 keeps nothing in a wing whose clipped seed changed — which re-cuts a
  wing's rooms too wherever a change to an overlapping wing, earlier or later in the clip order, alters that wing's
  clipped seed (the clip's crossing vertices included, §3.4). Re-uniting the households removes what the subdivision
  added — exactly for an unstored plan, whose canonical chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the subdivided rooms that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)), which the shell's identity reads without; its undo restores it exactly (§7.4). **The canonical chain:** the plan for (band row r, count n) is derived from the **as-built plan** — the class's
  programme at the plot's `builtBand` row with the template's `households.built` clamped into [1, capacity], whatever
  that row's household range (the ranges bound `relet` and the chain's row steps only; J-A28.28) — by a fixed order of
  least-disruption steps, each a re-cut from the previous step as its `prior`: first the ROWS, one band at a time from
  the built row toward r along `FieldBands.bands`, the count at each step clamped into that row's household range; then
  the HOUSEHOLDS, one at a time from the clamped count to n. The result depends on (r, n) alone — never on when a click,
  an epoch or a `relet` reached it (§6.2, §6.5 (9); each step's draws keyed by its target, §6.1; the cache memoises
  steps, §2.9) — and a return to the as-built row and count is the as-built plan exactly. A STORED plan is instead
  re-cut inside the event that changes its inputs, around its edited and locked rooms, with the inverse recorded (§7.3,
  §7.4; J-A28.72); that re-cut establishes J-P48 (1) for its new walls in the same event — a same-level split that moves
  nothing — so the shell's identity across a re-cut is read on its rings with the `composition`-role vertices removed,
  as §7.3 item 7 (ii) reads them (§5.3, T28-14). Each step is one open, cut and read-back of the transient arena,
  counted by §12.7's plan row.
* **Staff and shared rooms (J-A28.27).** Staff rooms are dwarfed beside the owners' — their size a share of the owners'
  principal chamber's target (the row's column) — and sit where a house keeps its service: the attic, the basement or the
  service wing before a storey the owners' rooms occupy; a lodging house's shared kitchen or common room sits on the
  ground storey by the stair core, the circulation hub. Both are programme rows (`scope` `service` and `shared`), so a class
  or a culture may keep a common kitchen down to the poor row or drop it earlier.
* **Editable.** A room's unit (`setRoomUnit`), its role and walls (the plan events) and the household count by hand
  (`relet`, a `convert` on the building, §7.1) are events; the ladder's rows are §7.6 tables.
* **Bars:** §13.2's T28-13 – T28-18.

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
  face: FaceRef /* L3 faces — inside the hinterland's blocks: furlongs, lots, woods (§4.9) — and wherever a reclaim or a course shift leaves land, in the town too (§2.3) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number };
  reclaimed?: { from: 'marsh'|'foreshore'; epoch: number } /* item 25: ground won from water by a reclaim conversion (§2.3, §4.11) — a trace the style sheet may draw */ }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp'|'notice' /* item 82: a notice post, a landmark a named-feature claim may name (§7.7) */;
    point: Point /* moves with its host face under a warp or a vertex move (§7.4) */; host: Id /* the yard, square, corridor or plot face */;
    light?: Id /* item 68: an emitting pin's LightSource (lamp, campfire, fire_pit; §4.7's Light sources) */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
// Labels are the model records LabelEntity and QuarterNode of §9.1
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id /* the module's materialised Faction, when it exists (§10.1) */; roster: RosterRef; name: NameRef; reservation?: Id;
  knownTo?: 'public'|'local'|'secret' /* item 30: a dossier fact (§7.7) or an edit, defaulting from its plots' exposure; a local or secret institution prefers hidden plots (§4.7 S10b) and, underground, a cellar stair (II.7.3) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: the dossier's fact, or the mode its concealed use resolved (§4.7's Concealed institutions (1)); absent: none */;
  powers?: { power: string /* a PowerStanding key (§7.7 item 2) */; weight: number }[] /* item 79: the powers it answers to, weights Σ = 1 — absent: its class's rows apply (§10.2); present: the dossier's override or an edit (below) */ }
interface Use { id: Id /* the address: moves with the use when it relocates (§6.3); a building keeps its own */; cls: string /* the roster class it is (§10.2's BuildingClassRow.id) */; specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19) */;
  plot: Id; buildings: Id[] /* the building(s) it occupies — several for a compound or a joined plot */; assignment?: Id; owner?: Id /* household | business | institution */; pinned: boolean /* item 17 (d): stays under an epoch, the town adapts around it (§7.7) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a concealed use's mode, resolved when it is first placed (§4.7's Concealed institutions (1)) and re-resolved only when a dossier event withdraws the dossier's mode (concealmentSource, next); absent: none, an open use */; concealmentSource?: 'assignment'|'class'|'edit' /* the map-side origin of a mode the dossier did not set — written with the mode by §4.7's placement rule (Concealed institutions (1)) and by setAttr(concealment) (`edit`); absent while the dossier sets it. A dossier event that sets the mode clears it (an `edit` it displaces is reported and orphaned, §7.7 item 5; J-A20.73); one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources — a map assignment's value, else the class table on the institution's `siting` draw, else `none` (the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source. Whether the mode is a dossier fact is factTier's (§2.8); a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22). Read by §11.2's `why` on the use's `concealment`, under the caller's key */;
  front?: Id /* item 63: the front's Use — the working business whose building (Building.use) it hides in; absent for a bare hidden or underground use */; knownTo?: 'public'|'local'|'secret' /* item 63: a concealed use's own knowledge, 'secret' by default; absent on an open use, which the reader reads through its building and institution (§9.2) */;
  opened: { epoch: number; seq: number }; closed?: { epoch: number; seq: number }; lifecycle: Lifecycle }   // item 17: a use is separate from the building that houses it — it opens, closes and relocates (§4.11's use step; §7.1's openUse / closeUse / relocateUse) while the building persists, vacant or re-let; Building.use points at it (§2.6)
interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared, dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document, changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance toward nearby building (§4.11)
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id /* its dwelling unit is the rooms of that building's plan carrying its id (Room.unit, §2.6; item 28 (f)); its interior is cut for the plot's field band, not for `wealth` (J-A28.24) */; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit — or, for a dossier-backed notable (item 88; staged, below), pinned whole by the port */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'|'military'|'arcane' /* item 79: military and arcane for the dossier's power categories (the port's category-and-name rows, §7.7 item 2); a hidden power keeps its kind and sets `secret` — `PowerStanding.secret` in the base (§7.7 item 2), `Faction.secret` when the module materialises it (§10.1) */; seats: Id[]; turf?: Id[];
  influence: number /* the module's reading of its power's standing (§10.3; the base's standings are §7.7's PowerStanding) */; secret: boolean;
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
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage' /* a walkable side passage of the network — not item 30's surface passage face (§2.5) */; centreline: ChainRef /* ('tunnel', id) in the sewer network's part (part 0 of the underground layer) */;
  widthCm: Cm /* the bore; the corridor half-width is widthCm ÷ 2 + the profile row's wall thickness (II.7.2, §3.7) */; headroomCm: Cm /* II.7.2's profile row */; navigable: boolean /* derived from widthCm and headroomCm against II.7.2's thresholds when the tunnel is made or edited, and stored: what may carry underground plots (item 12) */;
  invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string;
  closure?: 'collapsed'|'sealed' /* item 11: how a ruined tunnel closed (§4.11's tunnel ladder) */; lifecycle: Lifecycle /* its condition — in use, neglected, caved in, collapsed, sealed — is a reading of existence and closure through II.6's condition table (whose open column says whether plots may front it, II.7.3), never a second stored state; a setAttr on the condition is the matching convert (§7.1; J-A11.21) */ }
// The underground layer's other systems (item 65; II.7.5, II.7.6): schema-complete, empty in the base, each in its own arena part (§2.2 rule 1)
interface UndergroundSystem { id: Id; kind: 'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug' /* one system per kind (II.7.6); dug: the private passages an access edit makes (item 66) */;
  part: number /* its arena part (Identity.key.part): 0 for the sewer, the next unused at creation for the others — never renumbered or reused (§2.9's nextUndergroundPart) */;
  sources: Id[] /* what explains it (II.7.6): the cemetery, churchyard or religious institution a catacomb lies under, the stone stock a quarry fed, the raiseGrade that buried a town, the access edit that dug a passage */; depthM: [number, number] /* its row's depth range below the ground datum */; rule: string; lifecycle: Lifecycle }
interface Gallery { id: Id; system: Id; centreline: ChainRef /* ('gallery', id) in its system's part */; widthCm: Cm; wallCm: Cm /* the kerb at widthCm ÷ 2 + wallCm (§3.7) */; headroomCm: Cm; elevationCm: Cm /* its floor */;
  water?: true /* below the local water table: it carries water (II.7.6) */; walkway?: true /* an undercity's street (II.7.5) */; closure?: 'collapsed'|'sealed'|'flooded' /* how it closed, read through II.6's condition table */; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }
interface Chamber { id: Id; system: Id; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;
  closure?: 'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }
interface UndergroundLink { id: Id; a: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 0) */ }; b: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 1) */ };
  kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }   // item 65 (d): a connection between elements of two parts, never guaranteed and never a shared vertex (II.7.6; J-A65.31); the links to the surface are AccessPoints
// AccessPoint — a stair, ladder, hatch, door, shaft, well, cellar stair, grating or mouth linking the ground and an underground part by entity ids, with its state, knowledge and source (items 64–66) — is declared with its mechanism in II.7.4 (R12) and listed in §2.8's entity registry; its underground-side vertex carries the `access_point` role on its element's kerb or wall (§2.2 rule 7)
// Works and lights (items 67, 68)
interface Works { id: Id; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  target: { building?: Id; plots?: Id[] } /* the building it works on, or the plots a join or a split re-draws (§4.11's Works (7)) */;
  startWeek: number; durationWeeks: number /* integer working weeks: its WorksTable row's range drawn on `works` (§6.1) × the band's labour factor (§4.11) */; row: string /* the WorksTable row it reads */;
  cause: { seq: number /* the event that decided the change */; mutation?: number /* index into that event's mutations: the MutationRecord whose parts it shows, in order (§4.7 S11) */ };
  before?: { parts: { ring: Polygon; heights: Heights; roof: RoofSpec['kind'] }[] /* the parts the change subtracted, drawn through the demolition stages */; bounds: { line: PointCm[]; treatment: PlotBound['treatment'] }[] /* the boundary lines it removed, drawn until the clearing stage */ } /* world lattice points that are no vertex (§2.2 rule 5): carried with the target's plot face — the building's plot, or for a join or a split the target plot whose face holds the point — under a warp or a vertex move by §7.4's mean-value rule, never re-seated or orphaned (a drawn trace keeps no clearance); the undo record keeps the former rings and lines (J-A67.22) */;
  lifecycle: Lifecycle }   // item 67: a physical change with its timetable — model data in the model digest (§6.2); its stage at a week derived by §4.11, never stored; retired by the epoch after it has stood finished for works.retainWeeks
interface LightSource { id: Id; kind: string /* a light-rule row's kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … data (§4.7's LightRule) */; source: 'fire'|'magic';
  point: Point /* moves with its host under a warp or a vertex move (§7.4) */; host: Id /* the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's */; entrance?: number /* a door light: its building's entrance ordinal */;
  heightCm: Cm /* above the host's surface */; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, which sets §8.4's penumbra — written at placement from its kind's light-table row (§4.7) */; colour: string /* sRGB: fire warm, magic cool — its row's, written at placement (§4.7), and the colour the light pass lights with (§8.4 (c)); the vector rung's glyph and glow take §8.2's `light` and `lights` roles instead */;
  flicker?: true /* a fire light flickers — written at placement from its row (§4.7): §8.4 (f) animates it as a pure function of its render key and the view's time (§6.1; J-A68.61), never drawn or stored; absent: steady */; rule: string; lifecycle: Lifecycle }   // item 68: a point light placed by rule (§4.7's Light sources) or by hand (placeLight, §7.1); lit windows, the plan rung's room lights and light shafts are derived sources, never records (§8.4; J-A28.32); unlit while its host is abandoned, decayed or under Works before FINISHED — a reading, never a stored state
// The dossier's staged records (item 88): schema-complete, empty in the base; the port fills them at the SettlementForge stage (§7.7 item 8, §14)
interface ConditionOverlay { id: Id; key: string /* its binding key, cond:<id> (§7.7 item 12) */; archetype: string; severity: number /* 0–1 */; sinceWeek: number; untilWeek?: number; lifecycle: Lifecycle }   // a condition standing between epochs, no geometry: §8.2's thematic overlay, §4.11's Works share and the clerk read it
interface DepositSite { id: Id; key: string /* res:<key> */; family: string /* ore, stone, clay, salt … data */; state: 'available'|'depleted'|'removed'|'discovered'; bearingCdeg: Cdeg /* its bearing from the centre */; landUse?: Id /* the quarry, mine or claypit LandUse it anchors (§4.9) */; lifecycle: Lifecycle }   // a state change converts the land use it anchors (§4.11)
interface PowerRelation { id: Id; key: string /* its two powers' binding keys (§7.7 item 12) joined in address order — a pair of existing keys, no key form of its own */; a: string; b: string /* PowerStanding keys (§7.7 item 2) */; kind: string /* the dossier's pair type: alliance, rivalry, feud … data */; strength: number /* 0–1 */; lifecycle: Lifecycle }   // read by §4.5's typing as a soft adjacency row and by item 72 (a)(2)'s political component
interface HistoryHint { ageYears: number /* the settlement's age at creation — never advanced by the host's weeks, whose clock is §4.11's */; scars: { type: string /* fire, flood, siege, plague … data */; yearsAgo: number; severity: number /* 0–1 */ }[] }   // Recipe.history (§2.9): a recipe input read by S2's growth-stage count (§4.2 S2), by II.7.6's catacomb age (`ageYears`) and, for a `fire` or `flood` scar, by II.7.6's buried old town (J-A88.42)
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
(COV-FTG-B12), and the kinds `military` and `arcane` (item 79, below); `Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries
a generated pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08);
the relation store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes
raw-resource availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27),
`Greenery.species` the species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12),
and `Pin` the complete furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall
(COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07), and the notice post (item 82). The
placement rules are in §4.7 S11 and §4.9; the point lights' are §4.7's *Light sources*, their lighting §8.4's (item 68).

**The powers an institution answers to (item 79; J-A79.21 – J-A79.23).** The base types the settlement's powers as
**standings**, never as entities: each power is a `PowerStanding` of §7.7's circumstance slice — its key, its kind, its
share of standing and the value the dials last applied — and `Faction` stays the module's materialised record (§10.1,
J-9). `Institution.powers` is the partition item 72 (d5) needs. Absent, the institution answers to its class's powers
(§10.2's `BuildingClassRow.powers` and `RosterTables.powerLinks`, item 72 (d″)(1)). Present, it is the dossier's
override: the port writes it from the powers' controlled-institution lists (`controlledInstitutions`, resolved by the key
law of §7.7 item 12) and moves it only at an epoch past the dials' hysteresis (§4.11), two powers that control one
institution sharing it by their relative standing (§4.5 (7)); the dossier's declared link lists would enter, were they ever present, before that partition — controls at full weight,
funds at 0.6, staffs at 0.5 and protects at 0.4. A
`powers` the dossier set is a dossier fact (§2.8's fact tiers); otherwise `setAttr` overrides it (§7.1). An `arcane`
power is a dossier fact, or, standalone, exists only under the `magic` circumstance (§7.7 item 2; D-3); a hidden power
keeps its kind and sets `secret` — `PowerStanding.secret` in the base (§7.7 item 2), `Faction.secret` when the module
materialises it (§10.1; J-A79.23).

**The staged layers (AM-2, DEF-7; items 10–15).** `SkyIsland` and `Tunnel` give the owner-staged layers their data model
now: an island exists **only where prosperity supplies it** (item 10; II.6's supply law — none without it, its area from
the carried districts' and the town's prosperity, its altitude from the town's, only at CITY and METROPOLIS and never
certain, items 13 and 15) for one of two reasons (`reason`) — a very prosperous neighbourhood or set of neighbourhoods,
or a unique institution (a palace overlooking the land, a cathedral, a prison) — by rule or by assignment, may carry its
own terrain that echoes the ground's (`terrainEcho`: a conjured river with the ground river's bearing), wanes, settles or
falls as its supply fails (`state`, §4.11) and has no relation to the underground layer; a tunnel records what it drains
(`serves`), where it falls (its invert profile), where it discharges (`outfall`), whether it is navigable and how it
closed — the underground fades like the walls, caving in or being sealed, never demolished by the engine (item 11); the
underground neighbourhoods along navigable tunnels are ordinary blocks, plots and buildings in the sewer network's part
(part 0 of the underground layer; II.7.3; §2.1, §2.2 rule 1), reached through `AccessPoint` records (II.7.4). The underground layer's other systems
(item 65) are the same kind of hook — `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink`, each in its
system's arena part, and the undercity's neighbourhoods as `undercity` districts (§2.5) — schema-complete and empty until
the owner-staged stages run (II.7.5, II.7.6), a `dug` system included: the base carries the access edit
`addUndergroundAccess` and its closure rule (§7.3 item 9 (d)), whose underground pieces — a `dug` system among them —
run once the layer's stages exist (II.7.4; item 66). Their rules are II.6's and II.7's.

**The dossier's staged records (item 88; J-A88.21, J-A88.22).** `ConditionOverlay`, `DepositSite`, `PowerRelation` and
`HistoryHint` (on the recipe, §2.9), with the dossier-backed `Person`, give every optional input of the dossier a home
now, schema-complete and empty in the base, as the islands' and the tunnels' records are: the port fills them at the
SettlementForge stage (§7.7 item 8), and their readers — §4.11's Works share and land-use conversions, §4.5's typing,
item 72's political component, S2's stage count (§4.2 S2), II.7.6's catacomb age and buried old town — read nothing until then. A dossier-backed `Person` is a notable the
dossier names: pinned whole (never derived away by a re-roll), carrying `Identity.dossier`, housed by rule in the
district of its institution or its power's seat, with a `Posting` at its named institution and a `Membership` in its
named power; a successor re-binds to its record through the receipt §7.7 item 12 names.

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
  key: PlatKey /* the arena: layer and part, §2.2 — one per entity: every entity's geometry lies in one part — save an `UndergroundLink`, whose two `link_end` vertices lie one in each part its ends name (§3.4), its address keyed on end `a`'s part — and a record that joins parts names the other part's records by id (§3.4; J-A65.31) */; lineage: LineageHash /* stream identity, §6.3 */; reroll: number /* reroll count of this entity as a derivation unit, §6.1 */;
  dossier?: DossierRef /* item 20: the dossier element this entity exists for (§7.1's DossierRef, set by the host door, §11.4) — its `element` the binding key of §7.7 item 12 (item 74), its `version` the SettlementForge line the port read; the binding rows themselves are document data (`Document.dossier`, §2.9), never an entity; persisted identity in the model digest; carried by the entity the element is — its Use (§2.7), a dossier institution's Institution record (§2.7), and for an element that is neither (a named feature: a bridge, a well, a gate, a way, a quay, a pin — set by a named-feature claim, §7.7 item 16, item 82) the feature the assignment placed (§7.7) — and moved with it on every re-placement; a building or a plot, which only houses a use, never carries it, a building-granularity assignment's placed member included (a rejectSite relocates the use, item 17; J-A20.22); an `Assignment` keeps its binding in its own `Assignment.dossier` (§7.7), while a `District` carries none — its dossier name and identity are reached through the assignment that targets it (factTier, below; J-A20.24); such an entity is never removed by a map edit, only rejected from a site (§7.7) */ }
type FactTier = 'dossier'|'declared'|'map';   // item 20 (h) (i), item 101 (a): who holds an attribute's value — the dossier, an author's declaration, or the rules the map derives it by; derived at read by factTier (below), never stored; the values §9.2's reader, §11's exports (`plat:tier`) and §11.2's tool API show
declare function factTier(entity: Id, path: string): FactTier;   // pure: reads the entity's dossier ref — Identity.dossier, Assignment.dossier, or a district's through the dossier-backed assignments that target it (below) — the registry's dossier paths, Document.dossier.carried and the lifecycle flags
type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'cleared'|'reused'|'demolished';   // cleared and reused: item 8's traces (the decline hooks, below; J-A8.46)
interface LifecycleFlags { locked: boolean; pinned: boolean; edited: boolean; assigned: boolean;
  lockedPaths?: string[] /* attribute-level locks (§7.2); absent = the whole entity */; editedPaths?: string[] /* attributes the user set; each is implicitly pinned (§7.2) */ }
interface Lifecycle { existence: Existence; flags: LifecycleFlags; since: { epoch: number; seq: number } /* the event that last changed `existence` */ }
interface LifecycleEvent { id: Id; seq: number /* the causing EditEvent's seq; 0 for the generation run */; epoch: number;
  kind: Existence | 'lock'|'unlock'|'pin'|'unpin'|'edit'|'assign'|'unassign'|'reparent'|'carry'|'supersede'|'resurrect'
    | 'open'|'close'|'relocate' /* item 17: a Use opened, closed or relocated — and a Household moved to another building (§10.3's relocation: §4.7's overflow pass, §2.6's capacity bound, a re-letting); detail.from / to name the buildings */ | 'mutate' /* item 18: a designation mutation; detail.mutation names its record */
    | 'reject'|'lapse'|'place' /* item 20: a placement rejection, its lapse, a positive placement (§7.7) */ | 'relet' /* item 31 rung 1: the household count changed (§4.11); the plan rung goes stale */;
  cause: EditRef | RuleRef | 'generation' /* an EditRef reaches its event's dossierChange (§7.1, §7.7 item 13; item 75), so a lifecycle entry and the disruption report say why */;
  detail?: { from?: Id; to?: Id; lineageFrom?: LineageHash; lineageTo?: LineageHash; path?: string; mutation?: number /* index into the causing event's mutations (EditBase.mutations, §7.1): the MutationRecord of §4.7 S11 */;
    works?: { startWeek: number; durationWeeks: number } /* item 67: the timetable of the Works that carried this change, kept here when the Works record retires (§4.11) */ } }
interface Tombstone { id: Id; kind: string; lineage: LineageHash; supersededBy?: Id; seq: number; last: Uint8Array /* the compressed last record: orphan reports, resurrection (§6.3) */ }
interface DerivationRecord {            // the one definition: persisted with plots, blocks and buildings (the kinds whose stage declares it); outside the model digest, inside the records digest (§6.2)
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the recorded band hysteresis reads — for a plot, the band its derivation read; the plot's band memory after it is Plot.fieldBand (§2.5) */;
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

* **Fact tiers — the dossier's, the author's, the map's (item 20 (h) (i), item 101 (a); J-A20.23).** Every attribute of
  every record is held by one of three tiers, and `factTier(entity, path)` says which — **derived at read, never stored**,
  from what the document already holds: `dossier` when three things hold — the entity carries a **dossier ref**
  (`Identity.dossier`; on an `Assignment` its own `Assignment.dossier`, §7.7; on a `District`, for its `name` and
  `identity`, the ref of the dossier-backed `neighbourhood` assignment that targets it, a district-defining institution's
  or a naming claim matched to it, §7.7 item 16; J-A20.24), the path belongs to its kind's **dossier paths** (the
  registry, below), and the dossier supplies a value for it: the carried facts under that ref's binding key hold that
  field (`Document.dossier`, §2.9; §7.7 item 12); `declared` when an author's declaration
  set it — the path is among `flags.editedPaths`, or it is the existence or the position that a declaring event, which
  made, placed or shaped the entity, pinned (§7.2's *declared means held*, whose other attributes re-derive; item 101's
  R13); `map` otherwise — whatever the map's rules derive. A dossier fact is
  immutable on the map and changes only by a dossier event; a declared value holds against generation and every
  re-roll until its author changes it; a `map` value is the map's to regenerate (§7.7 items 9–11). §7's edit rules
  refuse an edit of a `dossier` path as `dossier-owned` (§7.1), and §9.2's reader, §11's exports and the tool API through
  which any clerk reads (§11.2) show each value's tier. The tier is not provenance: `Provenance` says how a value was last
  derived and is never persisted; the tier says who holds it, and follows from what is persisted. A document with no
  dossier has no `dossier` tier: a user's roster, the dossier's stand-in, is declared (item 101's `roster`).
* **One existence state plus orthogonal flags** (LC-26). A pin followed by an assignment leaves the entity both pinned
  and assigned; no code tests a single state value. `existence` moves through: `generated` (made by the pipeline);
  `built` (created by a user or an epoch: `build`, `drawFootprint`, drawn features); `altered` (a structural edit or a
  transformation changed it: split, join, densify, a re-cut by F-REDERIVE); `converted` (retyped: wall → ring road,
  gate → junction); `abandoned`, `decayed`, `ruined`, `cleared` and `reused` (decline and its traces — the hooks below); `demolished`
  (removed; the record becomes a tombstone).
* **The decline and regrowth hooks** (owner's decline instruction; item 8; COV-NG-XA36, COV-VG-VN-090 —
  STAGED-BY-OWNER). One existence state serves every kind, and §4.11's ladders map their plain names onto it per kind
  (J-A8.46, J-A8.21): *buildings* occupied → vacant (`abandoned`) → derelict (`decayed`, roofless: `RoofSpec.kind
  'none'`) → ruin (`ruined`) → robbed or cleared (`cleared`: a footprint trace — the face persists, the heights are
  zeroed in the record and its material is credited to the `MaterialLedger`, §2.7) → reused (`reused`: the trace keeps
  its face and is worked as a garden, orchard or field — `Building.reusedAs`, §2.6, drawn as that kind, §8.2 — or a
  successor is raised on the old foundations, `Building.predecessor`, §2.6; J-A8.22); *walls and gates* in use →
  neglected (`abandoned`) → breached or partly dismantled (`decayed`) → superseded by a shorter inner ring
  (`Enceinte.supersededBy`, §2.7 — a link, not a state); *tunnels* in use → silted (`abandoned`) → caved in (`decayed`)
  → collapsed or sealed (`ruined` with `Tunnel.closure`, §2.7; item 11 — their condition reading and its `open` column
  are II.6's); *islands* `SkyIsland.state` (§2.7). Which conversion (`ConversionOp`, §4.11) moves which state is a data
  table, its inverse the undo record's (§7.4); every state exists in the base schema and can be applied by hand (§7.1);
  a cleared or reused building is a **live record** at its address until `demolish` or a successor takes it (J-A8.42),
  never a tombstone; a ruined building keeps its footprint and heights and draws with the ruin program (§8.2).
  `Building.condition` (§2.6: kept, worn, neglected — item 31's wear) is not an existence state but an attribute of an
  occupied building; a sealed passage's plots (item 30) enter the ladder as vacant (§4.11). The underground layer's
  galleries and chambers (item 65) flood, collapse or are sealed (`closure`, §2.7) through II.6's condition table, as
  tunnels do. The stages a `decay` or `repair` Works draws (item 67) are this ladder's drawn stages, no new existence
  value (§4.11's *Works*; J-A8.46 stands). A dossier-listed ruin (item 80) is its assignment's `state: 'ruined'` (§7.7)
  over a building whose existence is `ruined` — no field of its own on the `Use` or the `Building`. A light (item 68)
  follows its host: removed with a demolished host, unlit — a reading, never a state — on an abandoned or decayed one. When
  and where the evolution program applies the ladders is §4.11's.
* **The elaboration record — a sixth part, per lazy rung, outside both digests** (item 28 (c); J-A28.22 with J-A28.62).
  A building carries one record per lazily derived rung — `wings`, `rooms`, `plan` — and, at stage 2, a district one for
  its close-up (`closeup`, II.4):

  ```ts
  interface ElaborationRecord { entity: Id /* the building, or for closeup the district */; rung: 'closeup'|'wings'|'rooms'|'plan'; state: 'absent'|'current'|'stale'|'edited';
    inputs: Hash64 /* the digest of the rung's recorded inputs — for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses that open in its basement (item 64), its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below */;
    slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows; §7.6 invalidates by slice */; epoch: number; since: { epoch: number; seq: number } }   // no reroll here: a rung's reroll count is what the log's regenerate events with rung give it (§6.1, §7.1)
  ```

  `absent`: never derived, or evicted — nothing is lost, a rung is a pure function; `current`: the cached result's input
  digest equals the digest of the inputs now; `stale`: an input changed — a designation, an assignment, the band, the
  storeys, the wing rings or a spanned passage's face, the households, a concealed use, an access into its basement, its
  Works' stage, a slice, a dossier event of items 18, 22 or 31 —
  marked by the batch that changed it, with no derivation run; `edited`: a stored composition with plan events in the
  log. The state is recomputed from `inputs` against the current digest at load and after every batch that touches the
  entity. The record and the cached result live in the document's non-canonical blocks (§2.9) — outside the model digest
  and outside the records digest — because a click logs nothing and writes nothing a replay must reproduce (§6.2, §6.5
  (9)); what a click derives enters a digest only when an edit stores it (§2.6).
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
  entity (§7.3 items 6–7). **Three band memories, kept apart** (items 31, 28 (f)): `DerivationRecord.band` is the band
  the last derivation read — in the records digest, rewritten by every derivation that changes the leaf;
  `Plot.builtBand` (§2.5) is the band the stock was built for — in the model digest, rewritten only by rung-3 events and
  the redevelopment-class edits J-A31.44 lists (§4.11); `Plot.fieldBand` (§2.5) is the band the plot's occupants live at
  — in the model digest, set by every derivation that reads the current field and re-banded after S6 at every epoch, so
  the interior's hysteresis follows the field (J-A28.29); a document written before these attributes existed gets
  `builtBand` and `fieldBand` from `DerivationRecord.band` and `builtProsperity` from the recorded sample (§7.5). A
  plot's record may also cite the designation-template and compatibility slices item 18's mutator read (`slices`).
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
  (§7.5); **dossier paths** (below; item 20 (h)); and **closure generators** per edit kind — the pieces an edit's missing
  prerequisites need, in dependency order (§7.3 item 9; item 66). Its completeness test — a CI test fails when a type is missing from any of those paths — is §13.2's (O11 a;
  §7.1, owner amendment 5). The amendments of 2026-09-25 add to it: `Use` (§2.7; lineage unit the creating event or the
  epoch's use step, anchor the plot's address and role), `Passage` (§2.5), `MaterialLedger` (§2.7, one per document),
  `Rejection` (declared with its mechanism in §7.7: model data in the digest, keyed by element and site, with its lapse
  and its migration hook), `AccessPoint` (II.7.4), the underground plots' and buildings' fields (II.7.3), the plan's
  `Room` with its `unit` (§2.6; anchored by its centroid within its wing), a building's `Entrance` and `Basement`
  sub-records and its base wings' `spans` (§2.6), a site-plan slot's `unhoused` (§2.5), the plot's `builtBand`, `builtProsperity` and `fieldBand` with their
  migration hook (§7.5), the tunnel's `navigable`, `headroomCm` and `closure` (§2.7), and the elaboration record's cache
  path (§2.9); each enters §13.2's path-completeness test, and every new attribute has its edit kind or is declared
  derived (§7.1). The amendments of 2026-09-27 and 2026-09-28 (items 63–88, 101) add: `Works` (§2.7; lineage unit its
  target's lineage with its start week, §6.3; its `works` draws keyed as §6.1 states; edit kinds `startWorks`, `cancelWorks` and `setAttr` on its start and
  duration; retired by an epoch), `LightSource` (§2.7; anchor its host's address, rule row and ordinal; `placeLight`,
  `setAttr`, `delete`, `lock`), `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink` (§2.7; keyed in their
  system's part; `drawTunnel` with a system, `drawChamber`, `addLink`, `setAttr`, `delete`, the closure conversions;
  `Document.nextUndergroundPart` their part counter, §2.9), the staged `ConditionOverlay`, `DepositSite` and
  `PowerRelation` (§2.7; anchor their binding key; dossier facts with no map edit kind; absent = empty); on existing
  kinds, `Use.concealment`, `front` and `knownTo` and `Institution.concealment` and `powers` (`setAttr`,
  dossier-owned where the dossier set them), `Use.concealmentSource` (written with `concealment`; no edit kind of its
  own), `Building.concealed` and `works` (derived links), `Room.concealed`
  and `Entrance.concealed` (each written by its own deriver: the plan rung, `deriveEntrances`), `Basement.kind` `crawl` (§2.6), `Plot.tenure`
  (derived, `setAttr` an override; a plot without it derives it at first load, §7.5), `District.identity` (`setAttr` an
  override), `pressure` and `nameHistory` (written by epochs and renames only), `character` and `bandRange` (derived,
  no edit kind), `parent` and `outskirts` (written by the undercity's stage), `Pin.light` and the `notice` pin,
  `RegionGroup` (§9.1: made by `group`, renamed by `setAttr`, removed by `delete`), `LabelEntity.displayText` (§9.1:
  `setAttr`, cleared by `revert`; the map's display over a name, never a dossier path),
  `Faction.kind`'s `military` and `arcane`, `Terrain.geology` (S1's; `setAttr` an override, §7.1's terrain row), and the `AccessPoint`'s `state`,
  `knownTo` and `source` (II.7.4; `setAttr` on the first two); the authoring toolkit's sugar events (item 101:
  `placeGate`, `quarter`, `roster`, `group`, §7.1) are listed with the kinds their expansions make, so the completeness
  test reaches them.
* **Dossier paths (item 20 (h); J-A20.23).** The registry names, per kind, the attribute paths a dossier may own — each
  with the carried field that supplies it — and no other path is ever `dossier`: an `Institution`'s `name`, `kind`,
  `knownTo`, `concealment` and `powers` (the powers' controlled-institution lists, item 79); a dossier element's `Use` —
  its `cls` (from the element's kind by the port's class rows, §7.7 item 12), `concealment`, `front` and `knownTo`; an
  `Assignment`'s `state`, `name`, `knownTo`, `concealment` and `front` (§7.7; items 30, 63, 80); a `District`'s `name`
  from a matched naming claim (item 82) and its `identity` from a district-defining institution or a claim's kind
  (item 72), each under the ref of the assignment that targets the district (Fact tiers, above); a named feature's `name` — a bridge, a well, a gate,
  a way, a quay, a pin (item 82); every attribute the port writes on the staged `ConditionOverlay`, `DepositSite`,
  `PowerRelation` and dossier-backed `Person` (item 88). The settlement's own facts — its name, tier word and population —
  and the typed circumstance slices are carried in `Document.dossier` and `Recipe.circumstances` and read there (§7.7),
  on no entity.

=== J-ROWS ===
| J-A63.22 | `Use.concealmentSource` names only the map-side origin of a concealment mode (an assignment, the class table or an edit) and is absent while the dossier sets the mode; whether the mode is a dossier fact is `factTier`'s (J-A20.23), never a stored value; a dossier event that sets the mode clears the source, and one that withdraws the dossier's mode re-resolves the mode from the map-side sources by §4.7's concealment rule as its least-disruption mutation, writing their source; a map `setAttr` of a mode the dossier set is refused as dossier-owned (J-A20.77) | §2.7 |
| J-A65.22 | every further underground part bounded, as the sewer's is, by the ground's frame plus its context margin, so each part grows with the frame by §3.2 (9) on its own key | §2.2 |

=== RATIONALE-A ===
| J-A63.22 | Chose to keep in `Use.concealmentSource` only the map-side origin of a concealed use's mode — an assignment, the class table or an edit — and to leave it absent while the dossier sets the mode, over storing a `dossier` value there, because whether a value is a dossier fact is already derived at read by `factTier` from what the document stores (J-A20.23), and a stored copy would go stale when a dossier event clears the fact. Chose, for the field's two dossier paths, that a dossier event setting the mode clears the source (a user's `setAttr` it displaces reported and orphaned, J-A20.73), and that one withdrawing the dossier's mode re-resolves the mode from the map-side sources by §4.7's concealment rule — a map assignment's value, else the class table on the institution's own keyed `siting` draw, else `none`, the use then placed as an open use — as that event's least-disruption mutation, writing their source, over keeping the dossier's last mode as a map value with no source, because a withdrawn value is no longer the dossier's, and what the dossier does not supply the map derives by its own rules (item 20 (h)); the keyed draw gives the mode the use's first placement would have given, so a withdrawal gives back the reading the map's rules give instead of freezing the dossier's. A map `setAttr` of a mode the dossier set is refused as dossier-owned, as J-A20.77 rules for every dossier fact (§2.7; items 63, 20 (h); repair round 2, V-MC1-01, VD1-08). |
| J-A65.22 | Chose to bound every further underground part — each system's own part beside the sewer's — by the ground's frame plus its context margin, as the sewer's part is bounded (II.7.2), over a ring fitted to each system's own extent, because II.7.6 lays every system on the frame's rock, stone cells and grid, a fitted ring would have to be re-cut whenever a system's galleries reached past it, and with the frame-wide ring §3.2 (9)'s frame growth grows each part by its clearing and margin batches on the part's own key, so no part's ring is left inside a grown frame; the ring is one rectangle and the rock one face, so the extent costs nothing a fitted ring would save (§2.2's first rule, with the frame growth of §3.2 (9); item 65; repair round 2, VKC1-02). |

=== END ===
