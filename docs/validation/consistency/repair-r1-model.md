# Repair round 1 — MODEL part (§2) — lane consistency/repair-model-r1

Four blocks, one per issue of verify-model-r0.md: V-MODEL-08 → §2.1 (the schema lint covers length fields again, as
the archive, MODEL-C10 and O6 (a) state; the `…Cdeg` / `Cdeg` convention for stored angles stays, no longer tied to the
lint); V-MODEL-09 → §2.2 rule 3 (the promotion parenthetical is again the placement statement "within the hot pixel of
the route it was placed on, §3.6", not a standing distance); V-MODEL-10 → §2.5 (the DerivationRecord bullet keeps the
recorded-sample comparison and the τ gloss, and defers the unit of re-derivation to §7.2's τ rule, with which §7.3 (a) 3
and §7.4's setField row agree); V-MODEL-07 → §2.9 step 4 (the bridge policy is now a pointer to §11.3; the install
mechanics stay, deviation D3). Each block is the complete text of the smallest subsection holding the fix, generated
from the current docs/ARCHITECTURE.md with exactly one substitution, so everything else in it is byte-identical.

Dependency recorded for the verifiers and the closer: the §2.9 pointer relies on the rendering repair (VR-R0-6) giving
§11.3 the whole policy — "records its root at `h₀`", "(≤ 3 MB at CITY)" and "or its session ends"; VR-R0-6's own
required-change text names only the first two, and the third now lives nowhere else (§12.8 l. 7432 says "until the
mismatch is settled (§2.9 step 4)" and should point to §11.3 once the policy has moved — rendering's line).

=== REPLACE ### 2.1 Layers, coordinates, units, ids ===
### 2.1 Layers, coordinates, units, ids

* **Units.** Every model length is an integer number of **centimetres** (`i32`), the world centred on (0, 0), `+x`
  east and `+y` north as in FTG (`_critic-ftg.md` F1), inside the arena frame of §3.2 (9); twice-areas and ring
  orientation are §3.2 (6)'s exact integer predicates, and directions are §3.2 (5)'s. Heights are centimetres; angles,
  where stored, are `i32` centidegrees, named `…Cdeg` or typed `Cdeg` (§2.8's type list). A length field carries its
  unit either in its name (`…Cm`, `…M`) or in a unit-branded type (`Cm`, `M`, `CmArray`, a `ChainProfile` of `Cm`); a
  schema lint refuses any length field that has neither (O6 (a), G-R14).
* **Layers.** `layer ∈ {underground, ground, sky}` is a field on every geometric entity and every display-list item,
  with `z: i32` (order inside the layer) and `elevationCm: i32` (base elevation: an island's altitude; a sewer's
  negative depth). **Each layer has its own arena** (G-R11): the ground, the underground and one per sky island, keyed
  by `PlatKey` (§2.2 rule 2). Per-layer toggles, shadows and export hang off this one field; a layer's drawing and
  export settings are its `LayerSpec` (§8.4), edited by `setLayer` (§7.1). The base populates only `ground`; the others
  are schema-complete and empty. **Wording:** *layer* without qualification means one of these three model layers; the
  toggleable drawing groups of §8–§9 (labels, cadastral outlines, trees, annotations, the thematic style overrides) are
  display-list groups selected by `semantic`, never a fourth model layer.
* **Ids.** Every entity has an **address id** `kind:token` — prefixed with its arena outside the ground layer
  (`sky2/plot:…`, `under/tunnel:…`) — that edits, locks, assignments, pins, labels, households, exports and hosts point
  at; its separate lineage key (which keys its random streams), the anchor rule with its hysteresis radii, survival and
  succession, the JOIN rule and the one collision rule are §6.3's (LC-1, LC-29, GEO-34). In memory addresses are
  interned `u32` handles, which the kernel's owner and role tables hold; in the document they are strings. The parent is
  a field (`Identity.parent`, §2.8), never parsed from the id, and no record outside the kernel stores an arena slot
  (§2.2 rule 5).

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
   * **L3** faces: plots, courts, yards, greens, alleys-as-faces; the wall-band, setback and glacis parts (per side of
     the L1 wall chain, built by `bandUnion` inside the wall strips after S9, §3.7, §4.8; `Enceinte.band` is the
     `FaceRef` of both sides); the margin-band parts along the settlement perimeter and along the other shared non-spine
     district boundaries (§3.3 pool step 3); and the hinterland's furlongs, lots, woods, driveways and trails, whose
     boundaries are L3 edges carrying `field_bound` (a hedgerow is the `green_line` role on such an edge; a track along
     one is the same edge with both roles, §4.9).
   * **L4** faces: building footprints (and wing sub-faces when stage 3 exists) plus yard sub-areas.

   Districts, blocks, merged plots and water bodies are multi-face `FaceRef`s, never single face ids.
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
   * **Vertex roles:** `junction`, `tower`, `gate`, `entrance`, `portal`, `attach`, `anchor`, `weld`, `deck_end`,
     `gate_end`, `composition` (a stored stage-3 composition's boundary points, §2.6), and one knot role per profiled
     attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`, `shore_class_knot`). The registry marks
     `attach`, `anchor`, `weld`, `deck_end`, `gate_end`, `composition`, `gate_opening` and the knot roles **indexed**
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

=== REPLACE ### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector ===
### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

```ts
interface District { id: Id; kind: DistrictKind /* feature-named: central, market, docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty, hinterland, … data-defined; never a social class */;
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
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number; owner?: Id /* castle, institution, commons */;
  attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte) (§2.2 rule 5) */; stage: StageId /* S3, S7 (gate plazas) or S7b */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block, the hinterland pseudo-district or a sky pseudo-district (II.6) */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id;
    near?: Id /* hinterland rows only: the district an edge orchard serves (§4.9) */; areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];
  lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract); stores no stream key (§2.4)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 and changed only by an explicit edit or an epoch (§4.5)
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[]; depthClass: string;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'wall_strip'|'empty' /* the deep-interior treatment, decided in S8 (§4.6); 'wall_strip': an enceinte's band, setback and glacis block, never plotted (§4.8) */; reservation?: Id }
interface Frontage { id: Id; way: Id; edges: EdgeSetRef /* ('frontage', frontage id): the L2 kerb edges of this block on this way */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: EdgeSetRef /* ('frontage', plot id) */; access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT) */; depthCm: Cm; frontageCm: Cm;
  partyWalls: EdgeSetRef /* ('party_wall', plot id): one shared edge per wall; the neighbour is the owner of the face across */;
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas: yard, garden, court, orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore */;
  ctx: ContextVector; derivedFrom: DerivationRecord /* §2.8 */; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO) */; lifecycle: Lifecycle;
}
interface PlotBound { id: Id; edges: EdgeSetRef /* ('treatment', bound id): the treated sub-edges; a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (splitThrough at the gate ends) */;
  side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[] /* every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */ }
// DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is defined once, in §2.8.
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'none'; coverage: number; slots: BuildingSlot[]; frontJitterCm: Cm; ruleRow: string }
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */; entranceOn: EdgeSetRef /* ('access', plot id) */ }   // persisted: no polygon
interface SlotPlan extends BuildingSlot { hint: Polygon /* S11's working shape for the slot — transient, never stored; a later outline() or compose() call gets the building's current footprint ring, resolved from its FaceRef at the call (§2.6) */ }
interface ContextVector {   // the per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19)
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Id /* the district's mix, read through the district, never copied per plot (SCL-5) */;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18)
  dist: { centre: M; plaza: M; market: M; gate: M; wall: M; water: M; shore: M; harbour?: M };
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: Cdeg; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
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
  current inputs is `Adjust`; a field brush or an epoch compares each plot's current sample with the recorded one and
  re-derives only what §7.2's τ rule selects (τ = 0.01 of the field range, the same τ on replay; LC-6, LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the site-plan table (§4.7 S11). It is what draws a walled manor compound, a fenced garden, a hedged
  field edge, and it exports as VTT walls and GeoJSON lines (VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences,
  COV-FTG-F23).
* **Seams** (II.1), **FieldBands** (§4.5) and **vacant frontage runs** — ordinary plots with `use = 'vacant'` or a `yard`
  part joined to the neighbour (§4.7 S10 (8); COV-VG-VN-170) — are stated at their homes.

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
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[] };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (their cap: §7.4), with the truncated targets its redo stack holds; never canonical
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
  first events (§7.7); the report, the statistics and the timings are §5.4's. A rebase never deletes events: the events
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
  `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), season, weather, frame, map rotation,
  compass, legend and emblem settings, `exportAnchor` (§11.1) and the people a user has opened live in `view`, outside
  every digest; the document's `style` stays canonical; each key is last-writer-wins by (Lamport counter, session id),
  so a viewer never writes the model. The key `session` holds an unshared document's authoring session (§7.4
  "Sessions"); a client attached to a host bridge takes its session from `doc.load` instead and never writes this key
  (§11.3).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4; the
  export → import → export round trip over the canonical form is a hard test (§13.2).
