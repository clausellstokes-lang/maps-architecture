# Fix-all round 5 — KERNEL area (§2.2 storage, §3 geometry kernel): dispositions, replacement text, cross-area requests
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-kernel-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-kernel-r5` · 2026-09-26 · seat: fix architect, KERNEL area, round 5 (Fable role; opus stand-in).
Status: COMPLETE — 6 items (VK4-1 – VK4-6): 6 FIX, 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred. 7 replacement
blocks (§2.2, §3.1, §3.3, §3.4, §3.6, §3.9, §3.10); 10 cross-area requests (determinism 4, pipeline 3, scope 2 — X-S2
carrying the judgment-call rows — rendering 1; two further places checked and left unchanged); 1 committed measurement script
(`docs/validation/bench/fixall_kernel_r5_checks.py` with its `.out`). Two corrections to the verifier's required text
and one lifecycle gap found while tracing VK4-1 are stated in Part 0 and fixed in the blocks.

## Part 0 — Reading record, method and measurements

**In plain words.** The kernel is the part of the design that does the shape mathematics. The round-4 check found six
small kernel slips, none serious; all six are fixed here. A bridge built with the town now has its "ground level"
described correctly for the moment after a river moves away from it, and removing such a bridge now also releases the
points it had fixed in place, so they become ordinary points of the street. The withdrawn rule about how far a hidden
point may stand from its line is gone from the three places it survived, replaced by the rule that holds, and the drift
after several changes is now measured (about one and a half centimetres at most in our samples). When a street that
borrowed a neighbour's plot corner is removed, the corner now always goes back — before, it failed in about one case in
170 when other street changes had touched the same stretch in between; the only thing that keeps it now is the warp
brush having moved that corner or the points beside it, and then the bent shape is the real shape. Water gates made
with the town and made by an edit now both stay put under the street-level warp brush, as bridges do. The search index
no longer answers with a point's old level for a moment after a change: every changed item is crossed out in the old
part of the index and re-entered in the new, and each part of the index keeps its own cross-out list, so rebuilding one
part can never hide an item another part holds. And three inexact sentences are corrected: the map's frame across new
water is a stretch that may include a corner; the kernel, not the caller, numbers the temporary crossing names; and a
coarse edit can also rewrite the saved chunks of the neighbouring districts, which the file-size test already measures.

**Read in full:** `docs/validation/fix-all/r4-verify-kernel.md` (the source of VK4-1 – VK4-6 and the round-4 verdicts);
in `docs/ARCHITECTURE.md` (10 723 lines, md5 `2661eb68…`) §2's plain words and §2.1–§2.2 (479–943), §2.7's wall, gate,
tower, castle and bridge records (1379–1425), §2.9's chunk and size paragraphs (1806–1850), §3.1–§3.6 (1874–2756),
§3.9–§3.10 (2950–3034) and §13.1 (8631–8729). **Read by section** for every place an item points to: §4.1's batch table
and writer sentence (3130–3175), §4.4's trace, water-gate and outer-moat paragraphs (3665–3700), §4.11's carve batches
(4560–4600), §5.3's kernel row (4817), §7.3 (b) 3–9 and item 7 (5790–5950), §7.4's warp row and undo application (5964,
6000–6030), §12.8's arena and copy figures, II.1 (3) (10112–10150) and the judgment rows J-K4 – J-K33 (10440–10470).
§3.7 and §3.8 by heading and grep only (no item touches them; unchanged since `integrate-r3`). The rest of §4–§17 and
PARTS II–III by heading and by grep for every term the fixes touch (`Steiner bound`, `Steiner invariant`, `hot pixel`,
`0.71 cm`, `tombstone`, `pinVertices`, `pinned`, `gate_end`, `deck_end`, `unflagged`, `level-≤ 1 chunk`, `S1 (5)`,
`home`); the whole file is ≈ 350 k tokens, beyond one lane's budget under the owner's efficiency standard, and every
pointer the six items make was followed. **Also read:** `r4-kernel.md`'s Part 2 preface and Part 3 (block format), the
round-4 check script (method), the verifier's `fixall_verify_kernel_r4_restore.py` and `.out`, `ARCHITECTURE-VALIDATION.md`
§R4's kernel rows and headings, and the tail of `docs/FABLE-REVIEW-QUEUE.md`. `docs/validation/fix-all/r4-validate.md`
does not exist. The owner-instruction files were not re-read: no item touches an owner rule, and every block keeps the
standing rulings (standalone; clean-room — our own arithmetic, no reference code, grammar, palette or table quoted;
parity as the floor; judgment calls recorded as "chose X over Y because Z").

**Method.** Each block is the complete current subsection with the changes of Part 1 applied by a script that asserts
every replaced passage occurs exactly once, re-wraps only the paragraphs it changed at 120 columns (number groups kept
together), and was checked by a word-level diff against the current `docs/ARCHITECTURE.md`: 47 / 11 / 41 / 5 / 14 / 4 / 6
changed spans in §2.2 / §3.1 / §3.3 / §3.4 / §3.6 / §3.9 / §3.10, every one of them listed in Part 1; every other
sentence is carried over verbatim. Every "before" text Part 3 quotes was checked by script to occur exactly once in the
current file.

**Measured (new, committed):** `python3 docs/validation/bench/fixall_kernel_r5_checks.py` → `.out` (stdlib, ≈ 16 s).
A — a finer vertex V placed on a random 5–60 m route P–Q and promoted, then k later same-level vertices placed on the
route (each by nearest-point rounding within the hot pixel of the sub-edge it lands on, ≥ `minEdge` from its ends),
then V's promoting chain removed, 100 000 cases per k:

| k | round 4's distance test refuses restoration | largest distance of V from its restored route edge | V outside the joined item's run box | route restored, flag-only guard |
|---|---|---|---|---|
| 0 | 0 (0.00 %) | 0.699 cm | 0 | 100 000 / 100 000 |
| 1 | 538 (0.54 %) | 1.025 cm | 0 | 100 000 / 100 000 |
| 2 | 634 (0.63 %) | 1.097 cm | 0 | 100 000 / 100 000 |
| 3 | 659 (0.66 %) | 1.269 cm | 0 | 100 000 / 100 000 |
| 4 | 648 (0.65 %) | 1.339 cm | 0 | 100 000 / 100 000 |

(k = 1 reproduces the verifier's 0.58 % within sampling: 0.54 % here on another stream.) B — the standing distance of
every finer vertex on a run from its spanning route edge after k successive same-level changes (a split of a sub-edge or
a promotion of one of the finer vertices), 50 000 runs per k: beyond the hot pixel 2.27 / 3.46 / 4.21 / 4.63 % of finer
vertices, largest 1.232 / 1.364 / 1.487 / 1.438 cm for k = 1 / 2 / 3 / 4. So round 4's "up to 1.25 cm" holds for one
change only; §2.2 rule 3, §3.1 and J-K32 now quote both figures.

**Two corrections to the verifier's required text, and one gap found on the way.**
1. *VK4-1's writer list.* The required text puts S5a among the writers of L0 `deck_end` rows. §4.4's outer-moat paragraph
   (l. 3690–3697) has S5a's moat carve place each deck's bank vertices in the carve's **L1** batch and promote them in
   the L0 batch — L1 rows, like any carve — while the L0 writer the list omits is S4's added deck (§4.1, l. 3141). The
   block names L1 rows for a carve's, an outer moat's or a water edit's preparation batch, and L0 rows for S1's sites,
   S3's channels, S4's or an edit's added deck and an edit's new site.
2. *VK4-3's flag rule.* The required wording — clear the flag of "every flagged vertex it does not move that has a moved
   vertex beside it on its own-level route" — would also clear the flag of a Steiner vertex (finer than the run it
   split) whose re-seat lands on its own lattice point while an endpoint of its coarser run moved. Dissolving that
   vertex still restores its coarser edge exactly, and without its flag it would stay behind as a leftover vertex on the
   edge (J-K26's own reason for keeping the flag through a re-seat). The block restricts the rule to vertices of their
   run's own level — a same-level split foot or crossing, or a vertex promoted onto the run — and says why.
3. *A kernel pin is never cleared (found tracing VK4-1's removal path).* No text clears the kernel `pinned` flag, so a
   deck's pinned bank vertices stay pinned after F-REDERIVE turns the deck into "an ordinary segment" (smoothing,
   simplification and cutting would keep them forever), and a generated water gate's pinned bank vertex — a flagged
   Steiner vertex on the shore — can never dissolve once the gate and its run are removed. Fixed as part of VK4-1: a
   removal that strips a vertex's last vertex role row clears its pin (§2.2 rule 3 (b), §3.4 `pinVertices`), listed in
   `CommitRecord.unflagged` so undo restores it with the other flags.

## Part 1 — Disposition table

| id | sev | disposition | sections changed | mechanism (one line) |
|---|---|---|---|---|
| VK4-1 | minor | FIX | §2.2 rule 3 (c)'s example and (b) (pins), the `flags` comment; §3.3 `CommitRecord.unflagged`; §3.4 `pinVertices`; X-D1, X-D2 (§7.3 (b) 4 and 9), X-S1 (§13.1) | a deck's bank vertex over land takes L1 at once when its `deck_end` rows are L1 (a carve's, an outer moat's or a water edit's preparation placed them) and keeps L0 with no L0 edge until F-REDERIVE strips `deck` and `deck_end` by `removeEdges` when they are L0 (S1, S3, S4's or an edit's added deck, an edit's new site); stripping a vertex's last vertex role row clears its kernel pin, so the deck becomes an ordinary segment |
| VK4-2 | minor | FIX | §3.1 planar-subdivision row; §3.6 J-K18; §2.2 rule 3 and J-K32 (drift after several changes, measured); X-D3 (§5.3), X-S2 (J-K18, J-K32 rows) | the standing "Steiner bound" replaced everywhere by the placement bound; the drift a same-level change leaves is ≈ 1.25 cm after one change and ≈ 1.5 cm after several (`fixall_kernel_r5_checks.out` B), read by nothing but the index boxes |
| VK4-3 | minor | FIX | §2.2 flag rule (b′), rule 3 (c) restoration, the "So a plot-line end…" paragraph, `flags` comment, J-K28; §3.3 `unflagged`; §3.6 split-flag bullet, J-K26, fixtures; X-P3 (II.1 (3)), X-S1, X-S2 (J-K26, J-K28 rows) | restoration is guarded by the `split` flag alone (100 000 / 100 000 restored for 0–4 interleaved same-level vertices, where round 4's distance test refused 0.54–0.66 %); a warp step also clears the flag of an unmoved vertex of its run's own level whose nearest run neighbour moved, so a bent run is never "restored" or dissolved straight |
| VK4-4 | minor | FIX | §2.2 rule 7 (levels of generated and edited gate ends); §3.6 held set, fixtures, new J-K35; X-P1 (§4.4), X-P2 (§2.7 `Gate.banks`), X-S1, X-S2 (J-K35 row) | a water gate's `gate_end` vertices are held unless `fromLevel = 0`, as a deck's are, whatever their level (generated: L1 Steiner vertices on the shores; edited: L0 after promotion); chose the hold over an extra L0 batch that would equalise the levels |
| VK4-5 | minor | FIX | §2.2 `LevelIndex.tombstones` (one set per partition, item keys), new `Plat.indexHome`, rule 3's demotion sentence, *Size*; §3.1 index row; §3.3 index paragraph ("No item changes in place"), Tombstones and rebuild sentence, pool steps 1, 2 and 4, new J-K34; §3.10 frozen-base and index rows; X-S1, X-S2 (J-K34 row), X-R1 (§12.8 wording) | every item a batch deletes, re-levels or changes is tombstoned in the partition its home entry names and its successor inserted in the grid; tombstones are item keys in one set per partition, emptied by that partition's rebuild, so a stale static copy never answers and a rebuild never hides another partition's item (also closes VK-15's cross-district slot-reuse case) |
| VK4-6 | minor | FIX | (a) §3.3 clear-region rules 2–3; (b) §3.4 `splitThrough`, §3.3 rule 2, §2.2 rule 7 and `RoleRow` comment, J-K29; (c) §3.9; X-D4 (§2.9) | (a) the border across new water is its stretch between the two contact points, corners included, left unchanged; (b) an `anchor` row given without an ordinal is allocated by the kernel as the op applies (canonical order), any other indexed row must carry its ordinal; (c) a change of a level-≤ 1 route edge also rewrites every partition chunk holding a Steiner split on it, which §2.9's rebased-size test counts; chose endpoint keys over position keys for splits |


## Part 2 — Replacement blocks

Blocks in document order. Each block's text replaces the named subsection completely (heading, banner and body); §2.1,
§2.3–§2.9, §3.2, §3.5, §3.7 and §3.8 are unchanged. Section pointers inside the blocks use the current numbering. Every
sentence of a replaced subsection that no item touches is carried over verbatim (word-level diff, Part 0); only the
paragraphs a change touched are re-wrapped. The judgment rows these blocks add or amend are repeated, one line each, in
X-S2 for the Judgment calls table.

=== REPLACE §2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===

### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground or the underground arena; parts 1–3 = one arena per sky island (§4.2, II.1)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey; readonly frame: Frame /* §3.2 (9) */; readonly lattice: LatticeSpec;
  vertices:  { x: Int32Array; y: Int32Array; out: Int32Array /* one outgoing half-edge */; level: Uint8Array /* birth level; lowered by promotion, raised by demotion (rule 3) */;
               flags: Uint8Array /* pinned (set by `pinVertices`; cleared when the vertex's last vertex role row leaves — rule 3) | steiner | split (created on an existing edge; cleared by a prepared contact's or a stretch end's promotion, by a move that takes it off that edge's route or — for a vertex of that route's own level — moves the vertex beside it on that route, and by a removal that breaks that edge's run — rule 3) | free slot */ };
  halfEdges: { origin: Int32Array; next: Int32Array; prev: Int32Array;    // twin(h) = h ^ 1: half-edges are allocated in pairs
               level: Uint8Array /* per pair (h >> 1): the edge's birth level — always the lowest level among its role rows (rule 3) */ };
  roles: RoleTable;                      // (role, entity, level, ordinal) sets on edge pairs and vertices, with a reverse index (rule 7)
  faces: [LevelFaces, LevelFaces, LevelFaces, LevelFaces, LevelFaces];
  index: [LevelIndex, LevelIndex, LevelIndex, LevelIndex, LevelIndex];     // §3.3
  indexHome: { vertex: Int16Array; edge: Int16Array /* per edge pair */; face: [Int16Array, Int16Array, Int16Array, Int16Array, Int16Array] /* per level */ };   // per slot: the static index partition (numbered across the levels) whose build holds the item, −1 if none; written by every build, read to tombstone the item (§3.3; VK4-5)
  version: number;                       // every committed batch bumps it
}
interface LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500 /* soft, §3.10 */; rangeCm: 8_388_608 /* 2^23 */ }
interface LevelFaces { outer: Int32Array; holesStart: Int32Array; holes: Int32Array; kind: Uint16Array;
  owner: Int32Array /* interned entity handle */; parent: Int32Array /* the level − 1 face containing it; −1 at L0 */;
  stage: Uint8Array /* rank (§4.1 order) of the stage whose batch created or last re-owned the face: the kept-content rule (§3.3) */;
  nextOfOwner: Int32Array; ownerHead: OwnerTable /* owner handle → first face of that owner at this level */ }
interface RoleTable { edgeFirst: Int32Array; vertexFirst: Int32Array /* first slot of each set, −1 if none */;
  kind: Uint16Array /* interned RoleName */; entity: Int32Array; level: Uint8Array /* level of the batch that added it */;
  ordinal: Uint16Array /* 0 unless the registry declares the role indexed (the knot, attach, anchor, weld, deck_end, gate_end and gate_opening roles, rule 7) */;
  nextInSet: Int32Array; nextSameKey: Int32Array; head: RoleHeadTable /* (role, entity, ordinal) → first slot */ }
// The two lookup tables are typed-array hash tables (VK2-9; Judgment J-K22): open addressing with linear probing, capacity a
// power of two kept at load ≤ 0.5 (doubled and re-inserted in slot order when exceeded), a fixed integer hash of the key words,
// deletion by backward shift (no tombstones). Lookups only — nothing iterates a table — so its layout never reaches an output,
// and the arena is typed arrays throughout: a pool worker's frozen copy is ArrayBuffers with nothing to rebuild (§3.3 step 1).
interface RoleHeadTable { k0: Int32Array /* entity handle */; k1: Int32Array /* role << 16 | ordinal */; first: Int32Array /* first role-row slot; −1 = empty */; count: number }
interface OwnerTable    { owner: Int32Array /* interned entity handle */; head: Int32Array /* first FaceId; −1 = empty */; count: number }
interface LevelIndex { static: PackedIndex[] /* partitions: one per arena at L0–L1; one per district + one outside districts at L2–L4 */; dynamic: UniformGrid;
  tombstones: Set<number>[] /* one set per static partition: the item keys — kind · 2³² + slot, the kind a vertex, a route edge or a face — of the items deleted, moved to another level or changed since that partition's build (§3.3; VK4-5); they filter that partition's hits only, and its rebuild empties its set; every set empty, like every grid, at every pool freeze, which first rebuilds the partitions edits left dirty (§3.3 step 1, §3.10) */ }
type RoleRow = { role: RoleName; entity: Id; ordinal?: number };     // a row a writer adds; its level is always the adding batch's (rules 3, 7); an `anchor` contact name is given without an ordinal, which the kernel allocates (rule 7)
type RoleKey = { role: RoleName; entity: Id; ordinal: number };      // a row's identity, without its level
// The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry (rule 5):
type FaceRef    = { owner: Id; level: Level };                       // view: the faces whose owner at that level is the entity (district, block, corridor, junction, plot, water body …)
type ChainRef   = { role: RoleName; entity: Id };                    // view: the ordered edge chain carrying (role, entity) — a way's spine, a wall trace, a tunnel
type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };  // view: the unordered edges carrying (role, entity[, ordinal]) — a plot's frontage, access, party walls, one gate opening
type VertexRef  = { role: RoleName; entity: Id; ordinal?: number };  // view: the vertex carrying (role, entity[, ordinal]) — a junction, a tower, a gate, an entrance, a portal, a deck end, a water gate's bank end, a weld end
type StretchRef = { chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint };   // view: the chain's edges between two of its vertices (rule 5); a batch-local argument of §3.4's removeEdges and retypeEdges — never stored in an entity record
type LatticePoint = { x: Cm; y: Cm };   // a position in an arena: in log events (with a VertexSig), view state, label placements and a StretchRef's ends only — never in an entity record (rule 5)
interface VertexSig { v: RoleKey[] /* the vertex's own (role, entity, ordinal) rows, sorted */; e: RoleKey[] /* the structural (role, entity) rows of its incident edges, sorted, deduplicated */ }
interface ChainProfile<T extends number | string = number> {   // a value that varies along an entity's chain (rule 5): never an array indexed by the chain's vertices
  knotRole: RoleName /* the registry's knot role for this attribute: width_knot, base_knot, invert_knot, bank_knot, shore_class_knot … */;
  values: T[] /* values[i] belongs to the chain vertex carrying (knotRole, entity, i): an authored value in the attribute's unit, or a cut knot's exact sample (rule 5) */; interp: 'linear' | 'step' }
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.** L0 faces: land components, sea, lakes,
   river reaches, islets, ponds, moats — land and water only (terrain contours and drainage lines are raster products of
   §2.3, never plat edges or faces, so no L1 face straddles two L0 parents and no drainage antenna enters a face ring).
   The arena's outer ring — the frame plus its context margin, §3.2 (9) — is one L0 chain carrying the structural
   `margin` role on the arena's `Terrain` entity, written first by S1 before any water, so every L0 face has a boundary;
   a sea or river that reaches it shares its stretch (§4.1; VK3-8). L1 faces: coarse blocks (regions between way
   *spines*) and the wall strips S7 cuts off beside each trace (§4.8); L1 edges: way spines (centrelines), wall lines,
   the wall strips' setback and glacis lines (structural role `setback`, §4.8), shorelines inherited from L0, the map
   border (the frame rectangle of §3.2 (9), structural role `border` on the arena's `Terrain` entity, written first by
   S3's L1 batch after S3's L0 batch, §4.1), the settlement perimeter (a `district_bound` chain, §4.5) and district
   boundaries — always L1 edges (a spine, a wall line, a reservation boundary, a shore or the perimeter; VP2-9), so
   every finer face lies inside one district. **L2 refines each L1 face into one half-corridor strip along each of its
   spine edges (the road reserve on that face's side, width = the way's half-width), one junction wedge at each of its
   corners, and the built block(s) that remain** — built by `corridorUnion` (§3.7), so every L2 face nests in exactly
   one L1 face. A `Corridor` entity is the `FaceRef` of the half-corridor faces on both sides of its spine; a `Junction`
   the `FaceRef` of the wedges around its vertex; a `Square` is a corridor face of class `square` (the K-1 repair;
   G-R11). Wall bands, glacis, towers and gatehouses are built the same way (`bandUnion`, §3.7), inside the two L1
   wall-strip faces S7 cuts off beside each trace and after S9 (§4.7 S10 (0), §4.8; NF-P5): the band around the L1 wall
   chain is split by the chain itself into per-side L3 parts and an `Enceinte.band` is the `FaceRef` of both sides, so
   no band straddles its L1 edge and no lane or corridor ever meets it. L3 faces: plots, courts, yards, greens,
   alleys-as-faces, wall-band, setback and glacis parts, the margin-band parts along the settlement perimeter and other
   shared non-spine district boundaries (§3.3 pool step 3), and the hinterland's furlongs, lots, woods, driveways and
   trails (their boundaries are L3 edges carrying `field_bound`; a hedgerow is the `green_line` role on such an edge and
   a track along one is the same edge with both roles, §4.9). L4 faces: building footprints (and wing sub-faces when
   stage 3 exists) plus yard sub-areas. Districts, blocks, merged plots and water bodies are multi-face `FaceRef`s,
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
   of level n only (`E_LEVEL` otherwise; clearing finer content, promotion, demotion and `warp` moves are the stated
   exceptions, §3.3, §3.6). Where it needs a vertex on a coarser edge (a plot line ending on a kerb, a footprint corner
   on a plot line, a band's cross edge ending on its wall) `splitThrough` inserts a level-n **Steiner vertex** at the
   lattice point chosen by §3.6's placement rule near the exact foot and routes the coarser edge through it; where the
   vertex is placed the route moves by at most half a lattice diagonal, 0.71 cm (61 % of 5–60 m edges have no interior
   lattice point at all, GEO-1). The coarser edge's endpoints, birth level, faces and roles of its own level never
   change; a finer batch may add roles of its own level (a plot's frontage on a kerb). The **level-n route** of an edge
   is the chain through its vertices of level ≤ n: every level-n query, level-n digest (§6.2) and level-n stage reads
   that route, so no level-n result depends on whether or when a finer level was derived — lazy per-district stages
   included. **A route can change under finer vertices without moving them (K4-1; Judgment J-K32).** A same-level split,
   a promotion, a demotion or a dissolution adds a vertex to a route or takes one out of it and moves nothing, so a
   finer vertex placed within the hot pixel of the old route edge may lie farther from the new one: one promotion in ten
   leaves another finer vertex up to 1.25 cm from its new route edge, and a same-level split about as often
   (`docs/validation/bench/fixall_kernel_r4_checks.out` A); successive changes add up a little — up to ≈ 1.36 cm after
   two and ≈ 1.49 cm after three or four in our sampling (`docs/validation/bench/fixall_kernel_r5_checks.out` B; VK4-2).
   The hot pixel is therefore a **placement** bound — every vertex placed, re-seated or slid onto a coarser route lies
   within 0.71 cm of that route at its own level when it is placed (§3.6, §3.10) — and the spatial index boxes each
   route edge over the vertices standing on its run (§3.3), so no query, digest or stage depends on the standing
   distance. The converse case — a *coarser* batch ending a chain on a route that already carries a finer vertex kept
   beside it (a neighbour's plot-line end on the kerb where II.1 (3)'s neighbour step lands its one `corridor_split`
   edge, a close-up's kept fabric beside a new L1 junction) — attracts onto that finer vertex and **promotes** it: its
   birth level is lowered to the batch's level, which adds it to the coarser route (it lies within the hot pixel of the
   route it was placed on) without moving it or touching the finer faces on either side; it keeps its `split` flag,
   because it still lies on the edge it split and removing the chain that promoted it restores that edge (demotion,
   below); the commit record lists every promotion and the edit's undo record restores the birth levels (§3.6, VK-18). A
   coarse batch inserted into finished fabric (a carve, a re-carved reach, an outer moat) clears finer content only
   inside its declared **clear region** and may meet finer geometry only at the vertices an earlier batch of the same
   edit or stage prepared for that contact — named in `KernelTx.prepared` by their roles (rule 7: the `deck_end` rows of
   a deck's bank vertices, the `gate_end` rows of a re-traced wall run's water gate, the `anchor` contact names at every
   other bank point) — which it attracts onto and promotes, clearing their `split` flags (each is a vertex of the new
   coarse chain from then on) and stripping their `anchor` contact names (§3.3); it never shares a finer edge, and a
   kept way's straight L1 edge between its two promoted bank vertices becomes the deck span over the new water (rule 7);
   any other contact is `E_LEVEL` inside the clear region and `E_KEPT` outside it (§3.3, §3.6; VK2-3; the deck form
   settled at integration, J-I12). `clearFiner` (regeneration, undo) and `removeEdges` remove edges and roles and then
   dissolve each vertex left with degree 2 that carries the kernel's `split` flag, no vertex role and no pin, and whose
   two remaining edges carry identical role sets and one birth level. **The `split` flag (C-5, VK2-5, VK3-3).** It marks
   a vertex whose dissolution restores the edge it was created on exactly: it is set when the vertex is created on an
   existing edge — a split foot, a crossing, every Steiner vertex — and cleared (a) by the promotion of a prepared
   contact or of a stretch end (§3.4), because such a vertex is one of a coarse chain's own vertices from then on, (b)
   by a move — a `warp`, or smoothing, which is a warp (§3.4) — that displaces the vertex, **except** a Steiner vertex
   re-seated onto its coarser edge's route and a vertex sliding along a fixed route (§3.6): both still lie on the route
   of the edge they split, and dissolving either restores that edge exactly, because the edge is the segment between its
   endpoints; (b′) by a move that displaces the nearest vertex beside it along a run it split while it stays, when it is
   of that run's own level — a same-level split foot or crossing, or a vertex promoted onto that run — because the run's
   line has then moved from under it, so dissolving it or restoring it would no longer give the edge it split (VK4-3; a
   Steiner vertex of a coarser run is re-seated with that run instead, §3.6); and (c) by a removal that breaks the run
   it split (demotion (b), below). A promotion onto the route the vertex already lies on (§3.6 candidate (b)) keeps it.
   So a warped same-level T-junction or crossing becomes a shape vertex of the warped chains — whether the warp moved it
   or only the chain around it — and removing the lane that ended there never straightens the warped spine; a re-seated
   Steiner vertex keeps the flag, so a later `clearFiner` dissolves it and the next derivation meets the clean coarser
   edge, not a leftover vertex. A chain's own shape vertices never carry the flag (NF-P6).

   **Levels follow the rows — demotion (VK3-3; Judgment J-K28).** A row is always added at the adding batch's level,
   and never at a level coarser than the edge or vertex it is added to: a coarser chain never shares a finer edge
   (§3.6), and promotion is the one way a vertex becomes coarser. So an edge's birth level is always the lowest level
   among its role rows, and only a removal can leave a level that its rows no longer justify. `removeEdges`,
   `clearFiner` and `retypeEdges`' `remove` (§3.4) therefore finish, after stripping rows and deleting the edges left
   with none, with three steps:
   * (a) *edges:* an edge whose remaining rows are all of levels above its birth level takes the lowest of them — a
     quay's edge on an old shore stretch, left with its `way` row when a moved river takes the `shore` and `bank` rows
     away, becomes L1, as does a wall on an old bank, so the L0 view stays land and water only (rule 1);
   * (b) *flags:* a vertex with the `split` flag keeps it only while a run it split survives the batch whole: a pair of
     its incident edges of its lowest incident level that carried identical rows of that level before the batch must
     still exist after it, at one level, with identical rows (a crossing has two such pairs, a T-junction one); where
     none does, the batch clears the flag, because dissolving the vertex would no longer restore an edge that exists —
     the point where a quay left the old shore stretch it shared becomes a shape vertex of the quay, while a quay that
     shared the whole stretch on both sides of a street end keeps that end restorable; and a vertex from which the batch
     strips its last vertex role row loses its kernel `pinned` flag, because a pin guards the feature its role names (a
     gate, a junction, a portal, a deck, gate, weld or anchor end; §3.4 `pinVertices`) — so the bank vertices of a deck
     that F-REDERIVE removes become plain vertices of their way, and a water gate's bank vertex left on an unchanged
     shore can dissolve (VK4-1);
   * (c) *vertices,* in canonical order (lattice position, y then x), each reading the levels the earlier ones left: a
     vertex left with no incident edge and no vertex role row of its level or coarser takes the lowest level among its
     incident edges and vertex role rows (a vertex left with neither is freed) — as the L0 vertices of an old shore
     stretch a quay shared do, and as a deck's bank vertex left over land by moved water does at once when its
     `deck_end` rows are L1, because a preparation batch placed them (a carve's, an outer moat's or a water edit's, §3.3
     rule 2), while one whose rows are L0, because an L0 batch placed them (S1's crossing sites, S3's carved channels,
     S4's or an edit's added deck, an edit's new site), keeps L0, with no L0 edge at it, until F-REDERIVE removes the
     deck's `deck` and `deck_end` rows (§7.3 (b) 9) and only then takes its way's level (VK4-1); then the dissolution
     rule above; then **split restoration**: a vertex with the `split` flag whose incident edges of its level or coarser
     are exactly two, of one level, carrying identical rows of its level or coarser, which carries no vertex role row of
     its level or coarser and no pin, and which still meets finer edges or carries finer vertex role rows — the vertex
     the dissolution rule would dissolve but for the finer geometry still meeting it — takes the lowest level among
     those finer edges and rows and keeps its flag. The flag is the whole guard (VK4-3): it stands only while neither
     the vertex nor the vertices beside it on its run have moved since it split the run (the flag's clearing rules (b)
     and (b′) above, §3.6), so restoring it gives the route the run had before its promotion, changed only by the
     same-level vertices added to it or taken from it since, which move nothing (K4-1).

   So a plot-line end or footprint corner that II.1 (3)'s neighbour step promoted to L2 returns to its level when the
   street is removed — by an undo, by the district's reroll or by any later edit — and the kerb's L2 route, index and
   digest are those before the step (checked: the route restored vertex for vertex on 100 000 of 100 000 random routes,
   `fixall_kernel_r4_checks.out` A, and on 100 000 of 100 000 for each of one to four later same-level vertices on that
   route, where round 4's distance test refused 0.54–0.66 % of restorations and so kept the vertex in the kerb's L2
   route for good, `fixall_kernel_r5_checks.out` A); a promoted vertex that a warp has moved, or beside which a warp has
   moved its run, has lost its flag and stays a vertex of the coarser route, which is then its true shape. Each demotion
   tombstones the vertex's or edge's static index item and the route-edge items of the levels whose routes it changes,
   and inserts their successors in the grids of their current levels (§3.3; VK4-5), the faces beside a demoted edge are
   re-walked at the levels it no longer bounds, as beside a removed edge (step 5 of §3.6), the per-level digests read
   the current levels (§6.2), and the commit record lists the demotions and cleared flags, which the edit's undo record
   restores (§3.3, §7.4). The result is checked on every batch (§3.10's level-consistency row): no edge is coarser than
   its lowest row, no vertex is coarser than every edge and role at it, and no vertex is finer than a chain it ends — a
   vertex finer than an incident edge lies inside that edge's run.
4. **Edges enter only through `insertChain`** (§3.4; semantics in §3.6) — one door for generated chains, user strokes,
   boolean and buffer outputs, offsets and smoothing results — which finite-checks and snaps to the lattice, attracts
   new vertices within `attractCm` onto existing vertices and edges, shares near-coincident stretches, places every new
   vertex on an existing edge by the placement rule, splits at every crossing and re-walks only the faces incident to
   the touched edges. Faces are never re-walked globally; a split face's two parts both inherit its owner (and its stage
   rank) until the stage re-owns one.
5. **Topology by index; references by role (Judgment J-K3).** Inside the kernel topology is keyed by `VertexId`,
   `HalfEdgeId` and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a position of a vertex** — save a building's wing rings
   (§2.6), whose points on its footprint's boundary are that footprint's vertices and which §2.6's wing-carrying rule
   re-reads from the footprint face after every change of it, so they cannot go stale (NP3-1): an entity reaches its
   geometry through the kernel's role and owner tables — a `Way`'s spine is `ChainRef('way', wayId)`, a plot's faces
   `FaceRef(plotId, 3)`, a junction `VertexRef('junction', id)`, a bridge's deck ends `VertexRef('deck_end', bridgeId,
   0 | 1)`, a water gate's bank ends `VertexRef('gate_end', gateId, 0 | 1)`, a castle's weld ends `VertexRef('weld',
   castleId, 0 | 1)`, an open wall's end anchors `VertexRef('anchor', enceinteId, 0 | 1)`, a reservation's attach points
   `VertexRef('attach', reservationId, i)`, a plot bound's gate openings `EdgeSetRef('gate_opening', boundId, i)` —
   resolved on demand by `resolve` (§3.4) and valid until the next commit (a debug build asserts the version). Splits
   carry roles to both parts, merges union them, attraction merges them onto the surviving edge or vertex, promotion
   keeps them (except a prepared `anchor` contact name, which it strips, rule 7), and `warp` moves the vertex that
   carries them, so a stored reference cannot go stale: there is nothing to rewrite (GEO-5 (a)).
   * **Stretches (VK3-9; Judgment J-K31).** An operator that removes or hands over part of a chain — a carve's cut
     stretch, a pruned remainder, a kept way's replaced stretch, a moved river's old shore stretch, the boundary stretch
     between two bank anchors, a way split, a partial `wallToWay` — names it by a `StretchRef`: the chain's edges between
     two of its vertices, in chain order for an open chain, and for a ring from `from` counter-clockwise to `to` (the
     ring's orientation by `orient2d` at its lowest-leftmost vertex, §3.2 (6)), so a ring's two stretches between one
     pair of vertices are told apart without a stored direction. Each end names a vertex of the chain — by a vertex role,
     or by its lattice point (a vertex is unique per lattice point, §3.10); a cut end that is not yet a vertex is placed
     first by `splitThrough`, which may give it a vertex role row (§3.4). A `StretchRef` is resolved within the batch
     that uses it and is never stored in an entity record, like every reference by position. `removeEdges` and
     `retypeEdges` accept it (§3.4): an end finer than the chain is first promoted to the chain's level (it becomes an
     end of each remaining part, so its `split` flag is cleared), a removal of a profiled stretch first gives each
     remaining part a cut knot at the stretch's ends (below), and `rekey`'s cut vertices are its ends. Ends that are not
     two distinct vertices of one part of the chain return `E_DEGENERATE` with detail `stretch`.
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
     (`docs/validation/bench/fixall_kernel_r3_checks.out` B). **Removing a stretch** of a profiled chain (VK3-9) gives
     each remaining part a cut knot at the stretch's end on its side by the same rule before the stretch's rows and its
     interior knot rows leave, so every remaining sample is unchanged: over 20 000 random ways with 2–5 width knots the
     largest change was 1.6 × 10⁻¹² cm against 8.36 m for remaining parts that keep only their own knots, and over 5 000
     profiled rings opened by removing the stretch between two anchors 5.9 × 10⁻¹² cm against 25.8 m
     (`fixall_kernel_r4_checks.out` C). A **join** of two chains into one entity concatenates their knots in chain order
     and drops a knot at the join vertex only where the joined profile samples identically without it — the value
     equals the interpolation between its neighbouring knots (a tolerance of 10⁻⁹ cm, decided in doubles, so every
     engine decides alike), or for `step` equals the previous knot's value: the two cut knots of an undone split carry
     one value and drop, restoring the original profile bit for bit (20 000 of 20 000, r3 file), while two different
     values at the join stay on the one vertex as two ordinals, a step, as §3.6 step 1's merged knots are.
   * **Positions in the log (GEO-5 (b)).** A log event that addresses a vertex by position (`moveVertex`, §7.1) stores
     its `LatticePoint` *and* the vertex's `VertexSig` at the time of the edit — its own `(role, entity, ordinal)` rows
     and the structural `(role, entity)` rows of its incident edges; the edit layer refuses a target with an empty
     signature (every editable vertex carries a structural or vertex role, §7.1's table). On replay
     `resolveVertexAt(key, at, sig)` (§3.4) maps the signature's entity ids through carry-over (§6.3) and binds, in
     order: (1) the vertex at `at` if its signature contains every recorded row; (2) else the nearest vertex whose
     signature contains every recorded row within the rebind radius — `attractCm` for a vertex without vertex roles, the
     §6.3 anchor radius of its vertex-role kind otherwise (junction and pin 1 m, gate and tower 2 m) — ties by lattice
     position (y, then x); (3) else the event is **orphaned** and reported (§7.3 item 4). A vertex is never bound by
     distance alone, so an upgrade replay can never move an unrelated vertex that happens to lie nearby. A river's
     control knot is not an arena vertex but S1's recorded input (`WaterBody.controls`, §2.3); its edit,
     `moveCourseKnot`, stores the water body's address and the knot's ordinal with its position, and binds on replay to
     that knot within half the body's control spacing, else to the nearest knot of that body within it, else is
     orphaned (§7.4) — never to a knot of another body (VK2-12).
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
7. **Roles, not a single type.** Each edge pair and each vertex carries a small sorted set of `(role, entity, level,
   ordinal)` rows from the **role registry** (a versioned data table); an output that reads a set in order — a digest
   (§6.2), a contact name's entity (below) — reads it by the role's rank in the registry and then the entity's address
   id, never by an interned handle, whose value depends on the order in which a session interned it. Edge roles: `way`,
   `kerb`, `corridor_split`, `band`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `margin`, `field_bound`,
   `district_bound`, `plot_line`, `party_wall`, `frontage`, `access`, `yard_part`, `claim`, `reserved` (a reservation's
   boundary before growth, §4.2 S3), `setback` (the L1 line bounding a wall strip, §4.8), `deck` (a `Bridge`'s deck
   span: the way's own L1 edge between the bridge's two `deck_end` bank vertices, carrying `deck` beside the way's `way`
   role — `ChainRef('deck', bridgeId)`; S1 and S3 place the bank vertices at L0 on the shores and S4 or S5 lays the
   way's span through them, while a carve's or S1's water operator's preparation batch places them on a kept way and the
   water's L0 batch promotes them, a site no way uses keeps its two bank vertices and no span (`Bridge.state = 'site'`,
   §2.7), and a deck where no site stands once L1 exists — F-ROUTE's extra bridge, a drawn bridge — has its two bank
   vertices placed by one L0 batch of two same-level shore splits, nothing cleared, before its way's L1 batch lays the
   span (§4.2 S1 (5); NP3-4), §3.3, §4.2, §4.11, §7.3 (b); LC-7, J-I12 — so no L0 edge crosses water and no deck splits
   a water body's L0 faces), `green_line` (hedgerows on L3 field boundaries; avenue and street-tree rows are
   `Greenery.along` records, not edges, §2.7), `treatment` (a plot edge's fence, hedge, wall or railing as an attribute
   row), `gate_opening` (the sub-edge of a treated plot edge left open for a gate, indexed per gate), `tunnel`,
   `invisible`. Vertex roles: `junction`, `tower`, `gate`, `entrance`, `portal`, `attach`, `anchor`, `weld`, `deck_end`,
   `gate_end`, and one knot role per profiled attribute (`width_knot`, `base_knot`, `invert_knot`, `bank_knot`,
   `shore_class_knot`); the registry marks `attach`, `anchor`, `weld`, `deck_end`, `gate_end`, `gate_opening` and the
   knot roles **indexed** (their rows carry an ordinal). A way's class, width profile and surface are attributes of the
   `Way` entity, not of its edges (FTG's 14 wire types generalised); a `wall` chain may be open, its ends anchored on
   typed vertices (a shore, a cliff, a castle).

   **Anchors, contact names and gate ends (VK3-2; Judgment J-K29).** An `anchor` row marks the end of an open chain that
   rests on a coarser feature — an open wall's two ends, `('anchor', enceinteId, 0 | 1)` — or serves as a **contact
   name**: a bank point that a coarse insertion's preparation batch places on a finer edge that is neither a kept way
   nor a re-traced wall run (a settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis
   line, the map's `border` line; §3.3 rule 2), for the water's batch to name in `KernelTx.prepared`. A contact name's
   entity is that of the first row of the edge's own birth level in the row order above: on a district boundary the
   district first in id order among those whose `district_bound` rows the edge carries, on the settlement perimeter the
   first in id order of the inner district and the hinterland pseudo-district, on a setback or glacis line the entity of
   its `setback` row (its enceinte), on the map border the arena's `Terrain` entity. Its ordinal is the smallest one of
   that entity's `anchor` role that no row carries — found by lookups in the role-head table, starting from 2 for an
   enceinte, whose 0 and 1 name an open trace's ends — allocated **by the kernel** as the `splitThrough` that places the
   contact name applies — the operator names the entity and gives the row without an ordinal (§3.4), because only the
   kernel knows a declared batch's canonical op order (§3.3; VK4-6 (b)) — so ordinals follow the preparation batch's op
   order, no two vertices ever carry one anchor key and §3.10's one-vertex-per-ordinal check holds. A contact name lives
   only from the preparation batch to the batch that promotes its vertex, which strips it (§3.3 rule 3): no record
   references it, and a row that persisted would keep the vertex alive after the water left and accumulate ordinals edit
   after edit. A **water gate's** two bank vertices carry `('gate_end', gateId, 0 | 1)` instead — on a re-traced run
   from the preparation batch on, under a fresh `Gate` address, as a re-sited deck's bank vertices are under a fresh
   `Bridge` (§6.3, §7.3 (b) 3) — and persist, because the `Gate` record names them (`Gate.banks`, §2.7) as a `Bridge`
   names its `deck_end`s; the wall's edge between them lies across the water as a deck span does. A water gate the trace
   makes at generation has its `gate_end` rows on the trace's two vertices on the river's shores, which the L1 batch
   that inserts the trace (S5a, §4.1) places after the water exists — L1 Steiner vertices on the L0 shore lines, or L0
   shore vertices where the trace attracted onto one (§4.4) — while an edited gate's are promoted to L0 by the water's
   batch (§3.3 rule 3); both kinds lie on the shore lines, and both are held under a warp unless `fromLevel = 0`, as a
   deck's bank vertices are (§3.6; VK4-4; Judgment J-K35).

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
≈ 2 MB for the two lookup tables at load ≤ 0.5 (≈ 1.5 MB of role heads for ≈ 60 000 role keys at 12 bytes a slot, ≈ 0.5
MB of owner heads over the five levels at 8 bytes a slot) — ≈ 12 MB (PLAUSIBLE until M0), against ≈ 20–29 MB for five
separate per-level DCELs that repeated each inherited edge at every finer level (SCL-11). **The spatial index (VK3-6)**
adds 38.4 B per item — a packed partition stores a double-precision box and a 32-bit index per node, with one inner node
per 16 below it (`docs/validation/bench/fixall_kernel_r4_bench.out` A) — over one item per vertex, route edge and face
(§3.3): ≈ 190 000–230 000 items at a finished CITY, ≈ 7–8.5 MB (our count, PLAUSIBLE until M1), and its home column
(`indexHome`: 2 B per vertex, edge-pair and face slot; VK4-5) ≈ 0.5 MB, so the generation worker's arena is ≈ 19.5–21 MB
with its index. A pool worker's frozen copy (§3.3 step 1) carries the arena, the lookup tables, the home column and the
static partitions the freeze holds: at the one-click freeze, where plots and footprints do not exist yet,
≈ 60 000–90 000 items of L0–L2 and step (0)'s L3 parts — ≈ 2.2–3.3 MB, with ≈ 0.2 MB of home column — on at most ≈ 12 MB
of arena and tables (the finished town's figure, which the one-click arena, without plots and footprints, stays under),
so ≤ ≈ 15 MB per copy; at a freeze after edits, when L3 and L4 hold finished fabric, ≈ 20 MB (≈ 0.5 MB of it the home
column). Knot rows are few: a constant-width way has none, and a wall's base profile carries one knot per trace vertex
(tens to a few hundred per enceinte). Measured for the lookup tables (`docs/validation/bench/fixall_kernel_r3_bench.out`
B): a pool worker that had to rebuild the two heads as `Map`s from the transferred arrays would spend ≈ 10 ms (60 000
keys) to ≈ 20 ms (100 000 keys) at CITY and ≈ 62 ms at METROPOLIS before its first query; the typed tables travel inside
the frozen copy, whose one memory copy costs ≈ 1.5 ms per worker at 15 MB and ≈ 2 ms at 20 MB (≈ 1.1 ms at 12 MB;
`fixall_kernel_r4_bench.out` A).

*Judgment J-K1.* Chose one arena per layer with level-tagged edges and per-level face records over five separate
per-level DCELs joined by a cross-level `splitThrough` protocol, because the shared arena makes nesting exact by
construction, moves shared boundaries atomically (warp, stage-2 seams, party walls), stores each boundary once and needs
no cross-arena bookkeeping; the price — a finer batch may add sub-centimetre Steiner vertices to a coarser edge — is
bounded by the hot pixel where each is placed and kept out of every coarser-level read.

*Judgment J-K3.* Chose role and owner tables with kernel-resolved views over stored half-edge, vertex and face id lists
kept current by a lineage table, because the kernel then never has to find and rewrite references it does not own, every
fact is stored once, and a stale handle becomes impossible rather than detected; resolution costs O(length of the chain)
through the reverse index.

*Judgment J-K9 (GEO-5).* Chose to make every entity-held vertex a role-carrying vertex (`attach`, `anchor`, `weld`,
`deck_end`, `gate_end`, and `gate_opening` sub-edges) and to give log positions a role signature, over persisting
lattice points in entity records and re-binding them by distance, because a role travels with the vertex through every
split, merge, attraction and warp while a stored position goes stale at the first warp, and because distance alone
cannot tell the intended vertex from an unrelated one 20 cm away after an upgrade. A gate opening is an indexed *edge*
role rather than the vertex role the round-1 verifier named, because an opening has a width: it is the open sub-edge
between the two gate ends, and its edge set resolves both ends at once.

*Judgment J-K10 (VK-2).* Chose knot profiles — values at role-carrying vertices, interpolated by arc length between them
— over profiles keyed by arc length from the chain's start, because a wall ring has no stable start (its lowest-leftmost
vertex changes under a warp) and a warp or an inserted junction would slide arc-length breakpoints away from the feature
they belong to, while a knot is a vertex and moves with it; the price is one role row per knot, and constant attributes
need none.

*Judgment J-K11 (VK-18).* Chose to promote a finer vertex a coarser batch lands on, over clearing and re-deriving the
neighbour's finer content within `attractCm`, because promotion keeps the neighbour's plots and a close-up's kept fabric
byte-identical (II.1 rule 3 promises "never its plots"), moves nothing, and costs one level byte and one undo entry; its
reversal, when the promoting chain is removed by any edit, is demotion (J-K28).

*Judgment J-K22 (VK2-9).* Chose typed-array open-addressing tables for the role heads and the owner heads over `Map`s,
because the pool's frozen copy is then ArrayBuffers only — one memory copy, ≈ 1.5 ms per worker at the one-click
freeze's ≈ 15 MB — while rebuilding `Map`s costs every pool worker ≈ 10–20 ms at CITY (≈ 62 ms at METROPOLIS, measured)
on the pool's critical path before its first query; the price is ≈ 2 MB of tables at load ≤ 0.5 and a fixed hash whose
slot layout no output reads.

*Judgment J-K23 (VK2-8).* Chose cut knots carrying the exact sampled value over re-keying the existing knots alone (each
part then turns constant from its last knot to the cut — a width moved by up to 8.47 m, measured) and over rational or
source-referencing cut knots that would make every sample bit-exact, because the exact double differs from the original
sample by under 10⁻¹² cm — ten orders of magnitude below the 1 cm lattice every consumer snaps to — while a rational
form needs BigInt arithmetic in every `kerb` and `bandUnion` sample; the price is one non-integer knot value per cut,
the same on every engine.

*Judgment J-K28 (VK3-3; the guard amended for VK4-3).* Chose demotion — an edge takes the lowest level among its rows, a
vertex is never coarser than every edge and role at it, and a split vertex left beside its run with only finer geometry
returns to that geometry's level while its `split` flag stands — over leaving birth levels where promotion left them (a
removal other than an undo then keeps a neighbour's plot-line end in the kerb's L2 route, index and digest, and an old
shore stretch shared with a quay or a wall keeps an L1 feature in the L0 view against rule 1) and over re-deriving the
neighbour's finer content when its street is removed (II.1 (3) promises never its plots), because levels that follow the
rows make every removal the inverse of the insertion that made them — the route restored vertex for vertex on 100 000 of
100 000 random routes, checked — at the cost of one check per touched edge and vertex; and chose to keep the `split`
flag through a promotion onto the route the vertex lies on, and to clear it when a removal breaks the run it split, over
clearing it on every promotion, because the flag is the test that tells a restorable vertex from a chain's own shape
vertex, which demotion must never take out of its chain. Round 5 (VK4-3): chose the flag alone as restoration's guard —
a move of the vertex, or of the vertex beside it on its run while it stays, clears it (§3.6) — over round 4's distance
test against its current run and over a widened test (the hot pixel plus the measured drift, ≈ 2 cm), because the flag
states the exact condition — nothing that defined the edge it split has moved — while any distance is either tighter
than K4-1's drift (round 4's test refused 0.54–0.66 % of restorations after later same-level vertices on the run, so the
vertex stayed in the kerb's L2 route and digest for good, `fixall_kernel_r5_checks.out` A) or loose enough to restore a
vertex that a warp bent by a centimetre or two.

*Judgment J-K29 (VK3-2).* Chose a `gate_end` vertex role on the water gate's own address — a fresh `Gate` from the
preparation batch on, as a re-sited deck's bank vertices are under a fresh `Bridge` — over `anchor` rows on the
enceinte, and transient `anchor` contact names at the entity's smallest free ordinal (from 2 on an enceinte), stripped
by the promotion that uses them, over persistent anchors at unallocated ordinals, because a water gate's bank vertices
are not the ends of an open chain but the ends of a gate, which its `Gate` record must name as a `Bridge` names its deck
ends, and because a contact name that no record references would otherwise keep its vertex alive after the water leaves,
could collide with an open trace's end anchors, and would accumulate ordinals across edits; and chose the first
own-level row in registry order as a contact name's entity over a per-case list, because it is total — it names an
entity for a district boundary carrying two districts' rows, for the perimeter and for any line a later stage adds — and
slot-free. Round 5 (VK4-6 (b)): chose the kernel to allocate a contact name's ordinal as the op applies, the operator
giving the row without one, over operator-supplied ordinals, because a declared batch's ops are applied in the kernel's
canonical order, which the operator that issues them cannot know.

*Judgment J-K31 (VK3-9).* Chose a `StretchRef` view — a chain between two of its vertices, resolved in the batch and
never stored — accepted by `removeEdges` and `retypeEdges`, with cut knots at a removed stretch's ends, together with a
vertex-role row on `splitThrough`, an entity on `insertChain`'s vertex rows and a `VertexRef` form of `removeEdges`,
over stretch-specific operations or removing whole chains, because every partial edit the operators perform — a cut, a
pruned remainder, a replaced stretch, a boundary cut between two anchors, a way split — then passes through the only
doors (§3.4), inside the kernel's invariant coverage, and every remaining part samples its profiles as before (8.36 m →
1.6 × 10⁻¹² cm on ways, 25.8 m → 5.9 × 10⁻¹² cm on rings, measured).

*Judgment J-K32 (K4-1, found in round 4).* Chose to state the hot pixel as a placement bound — every vertex placed,
re-seated or slid onto a coarser route lies within 0.71 cm of it when placed — and to box each route-edge index item
over the vertices standing on its run, over keeping "every Steiner vertex lies within 0.71 cm of its route" as a
standing invariant, because a promotion, a same-level split or a demotion changes a route under finer vertices without
moving them (one promotion in ten leaves another finer vertex up to 1.25 cm from its new route edge, and successive
changes up to ≈ 1.5 cm, measured), so the standing form was false after ordinary edits — an unchecked claim, or a
spurious `E_INVARIANT` at the next batch that touched that vertex — while re-seating those vertices would change a
neighbour's plots that II.1 (3) promises to keep; nothing reads the standing distance but the index, and the run's box
holds every vertex on the run by construction (the endpoints' box missed 38 of 400 753 under the placement rule's
non-nearest choices, measured).

=== REPLACE §3.1 Build-versus-adopt, per primitive ===

### 3.1 Build-versus-adopt, per primitive

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

| primitive | decision | candidate (licence) | degenerate-input handling |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | every coordinate passes `snap` (finite and range check in every build, §3.2 (7)); a new vertex within `attractCm` (26 cm) of an existing vertex lands on it; within `attractCm` of an edge it lands on the edge (`splitThrough`) — or on that edge's endpoint when the exact foot lies within `attractCm` of it, so no split leaves a sub-edge shorter than `minEdge`; a new chain running within `attractCm` of an existing edge shares that stretch with merged roles (§3.6); every new vertex on an existing edge (a split foot, a stretch's join or leave point, a crossing) is placed by the placement rule — the nearest lattice point that keeps `minEdge` and clearance (§3.6); crossings by iterated snap rounding on the 1 cm lattice, ≤ 3 passes — every pass leaves a planar arrangement, so an unconverged result commits with `W_SNAP_PASSES` instead of failing; there is no separate weld tolerance: coincidence is lattice-point equality, proximity is attraction |
| exact predicates | **build** `orient2d` (exact in doubles under the §3.2 bound); **adopt** `incircle` | `robust-predicates` **3.0.3, Unlicense** — the licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), the version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower, acceptable because `incircle` is off the topology path) | collinear / cocircular ties broken deterministically on lattice positions (never on slot ids), never `== 0` on floats; `incircle` is never on the topology path; ring orientation is `orient2d` at the lowest-leftmost vertex and areas are exact integers (`area2`, §3.2 (6)) — no topology decision reads the sign of a float sum |
| planar subdivision (one indexed arena per layer with level-tagged edges, per-level face records with stage ranks, holes, containment by parent, role and owner tables) | **build** — the core asset; **struct-of-arrays, allocation-free hot loops** (G-R7: NG's profile shows `Point.new` 385–561 k and `intersectLines` 147–213 k calls dominate) | — | every insertion is part of a batch transaction; self-touching chains split into simple runs, inserted run by run; a face below its class floor is absorbed across a partition edge or kept as typed `residue` — an edge carrying a structural role is never deleted (§3.6); every vertex placed, re-seated or slid onto a coarser edge lies within the hot pixel of that edge's route when it is placed — the placement bound; a later same-level change of the route moves no finer vertex and may leave one farther off (≈ 1.25 cm after one change, ≈ 1.5 cm after several, measured), which no invariant or stage reads and the index boxes cover (§2.2 rule 3, §3.3; VK4-2); finer content an earlier stage made is kept, never cleared by a coarser batch (§3.3); a finer vertex a coarser chain lands on is promoted, never duplicated, and a coarse insertion into finished fabric meets finer geometry only at its prepared vertices, which it promotes, and never shares a finer edge (§2.2 rule 3, §3.6); every removal re-levels what it leaves by the rows — an edge takes the lowest level among its rows, and a promoted vertex whose promoting chain is gone returns to its level (demotion, §2.2 rule 3) — and part of a chain is addressed by a `StretchRef` (§2.2 rule 5, §3.4) |
| polygon booleans | **build on the kernel's arrangement** (§3.7, Judgment J-K4): overlay the operands in a scratch arrangement with `insertChain`'s machinery, label faces by winding number, keep the selected faces | Clipper2 (BSL-1.0, compiled to WASM, run in Node) and `polygon-clipping` (MIT) are **CI oracles in `@plat/testkit` only**, never shipped | integer coordinates in and out under the same attraction, placement, `minEdge` and clearance rules as every other writer; fill rule declared per call (non-zero or even-odd); an empty result is `E_DEGENERATE` with detail `empty`; the oracle comparison is split by whether attraction fired (§3.7) |
| buffers, offsets, insets (uniform and per-edge) and bands | **build on the arrangement** (§3.7): a buffer is the union of per-segment strips and per-vertex join discs (round joins as chords of ≤ 2 cm sagitta; square ends where declared); a per-edge inset and the kerb are face − ⋃ buffers; corridors and wall bands are committed by `corridorUnion` / `bandUnion`; a varying half-width is sampled from the chain's knot profile (§2.2 rule 5), each segment's strip a trapezoid between its end widths | — | the half-plane inset is used only for a uniform inset of a face whose convexity is checked exactly (`E_NON_CONVEX` otherwise); an inset larger than the inradius returns `E_DEGENERATE` with detail `collapsed` and the last non-empty distance |
| straight skeleton (roofs of irregular footprints; label spines — the maximum-clearance spanning tree of the hole-aware skeleton graph, §9) | **build** (decided, §3.8, Judgment J-K5): a wavefront with an event queue in doubles using + − × ÷ √ only, events coalesced within 1 mm of offset time and 1 cm of position, ties by the vertex's index in the canonicalised ring, a work limit counted in events, a post-condition validator on every output; convex near-rectangular footprints take the exact OBB roof instead | none assumed: no permissive, mature JS/TS skeleton is known to this design; CGAL is GPL/LGPL — rejected | input pre-cleaned (collinear merge, min angle 5°); holes supported; a validator failure or `E_WORK_LIMIT` takes the typed downgrade — a plain roof (no ridge or hip lines), a sampled medial axis (spines) — exercised by fixtures: never a crash, never unvalidated output (MFCG's skeleton "glitches in special cases") |
| OBB, convex hull, largest inscribed rectangle | **build** | — (monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes: OBB long axis, frontage normal, ± 45° — G-R13) | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`) — never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers must branch on the typed result |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for the routing lattice, site sampling, Lloyd relaxation, field seeds, medial axes — never as the street source |
| Poisson-disc / blue noise | **build** | — Bridson with **k = 50 candidates, all evaluated** (the references' measured variant, `_critic.md` C2 — G-P17), run once per stamped class when the product is built (`plat/tools/stamptiles/`) to build the small set of ranked, periodic blue-noise tiles of §8.10 at a reference spacing of 4 m, shipped as a hash-checked asset (MFCG's precomputed-tile trick, moved to build time); per-instance placement is the §8.10 stamp — the tile with a per-entity offset, rotation and scale (the entity's spacing ÷ 4 m) drawn from the entity's stream, clipped by point-in-polygon, ≤ 1 µs per instance (§4.9, §8) | domain clipped to any polygon with holes; empty domains return empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), not from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT) with our seeding, fBm and warp built | seeded from sub-streams; octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | smoothing never moves pinned vertices (gates, junctions, portals); a smoothing or warp step is validated as a **whole step** — edges incident to moved vertices against the index and unmoved vertices against the swept triangles, every edge incident to a moved vertex at least `minEdge` long, no two vertices on one lattice point, and the clearance invariant — and halved globally on failure (§3.6); Visvalingam–Whyatt is topology-preserving (a removal is refused when the new edge would touch or cross another edge of the ring, its face's other rings or a declared obstacle, checked in the index — the `simplify` service of §3.4); fillets skipped when legs are shorter than the chord; results re-enter through `insertChain` |
| spatial index | **adopt + build** | `flatbush` (ISC) as static partitions per level — one per arena at L0–L1, one per district at L2–L4 — rebuilt only at stage end (S10's eager step (0) ends before the pool's freeze and rebuilds the L3 partitions it touched, so the frozen copy holds every item in a static partition, §3.3); each level's index holds the items of that level — vertices, whole route edges boxed over the vertices standing on their runs and padded by the hot pixel, faces — so a finer batch's Steiner split never writes a coarser level's index, and every item a batch deletes, re-levels or changes — a promotion or a demotion included — is tombstoned in the partition that holds it and its successor inserted in its level's grid (§3.3; VK4-5); every freeze first rebuilds the partitions edits left dirty (§3.3 step 1); a uniform grid per level for every change inside a stage and for edits (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | a level-n query returns level-n items sorted by their **canonical key on the level-n route** (VK-14, VK2-4) — a vertex of level ≤ n by its lattice position (y, then x); an edge by the two endpoints of its level-n route edge, lower (y, x) first; a face by the first two vertices of level ≤ n on its outer ring, from the lowest-leftmost such vertex (a ring that visits it twice takes the smaller successor) — a total order, because a directed level-n route edge bounds exactly one level-n face (§3.3), which no finer vertex can change — so neither which index holds an item nor whether a finer level exists changes an output; tombstones — item keys, one set per partition — filter static-partition hits only |
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
  | 'E_DEGENERATE'         // ratio() with a vanishing denominator; OBB / hull of collinear or < 3 distinct points; an empty or collapsed boolean, buffer or inset; a StretchRef whose ends are not two distinct vertices of one part of its chain (detail 'stretch', §2.2 rule 5)
  | 'E_LEVEL'              // a batch wrote a level other than its own, added a row coarser than the edge or vertex it lands on, or — in a clear-region batch — met finer geometry inside its region away from its prepared contacts (§2.2 rule 3, §3.3, §3.6)
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
  count: number; at?: LatticePoint };   // W_PLACED: a new, re-seated or sliding vertex placed away from its nearest lattice point by the placement rule (§3.6); W_PROMOTED: a finer vertex promoted, a clear-region batch's prepared vertices and a stretch's ends included (§2.2 rule 3)
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

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

```ts
interface KernelTx { key: PlatKey; level: Level; ops: KernelOp[] /* declared form only: independent ops, applied in canonical order */;
  expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade'; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives: finer content an earlier stage made is kept (below); = stage in generation, the start of the edit's re-derivation for an edit (§7.3), the first stage of §4.1's order for a warp or smoothing batch, which keeps nothing (§3.6; Judgment J-K33) */;
  clearRegion?: Ring[] /* a coarse batch inserted into finished fabric, and its preparation batches: clearFiner acts only on faces meeting it (below) */;
  prepared?: VertexRef[] /* with clearRegion: the vertices earlier batches of the same edit or stage placed for this batch's contacts with finer geometry — a kept way's deck_end rows, a re-traced wall run's gate_end rows, the anchor contact names at every other bank point (§2.2 rule 7) — the only finer vertices it may meet (§3.6 candidates (c)) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: PlatKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are the "moved edges" of §3.10 (GEO-35) */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3) — contacts, prepared vertices, stretch ends; the edit's undo record keeps their lattice points, former levels and flags and the anchor contact names promotion stripped */;
  demoted: { vertices: VertexId[]; edges: HalfEdgeId[] /* one half-edge per pair */ } /* vertices and edges whose birth level this batch raised (§2.2 rule 3's demotion); the undo record keeps their former levels */;
  unflagged: VertexId[] /* vertices whose split flag or kernel pin this batch cleared other than by moving them — a prepared contact's or a stretch end's promotion, a broken run, a pin whose last vertex role row left (§2.2 rule 3), an unmoved vertex beside which a move displaced its run (§3.6; VK4-3); the undo record restores the flags */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[]; work: number }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; the kernel applies the ops to a scratch overlay, serves every query inside the batch from the level's
dynamic grid plus the static partitions, validates the batch-local invariants on the touched faces and their one-ring
(§3.10), and commits or rejects atomically. Local repair (§5) runs inside the transaction on the overlay.

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  bounded Steiner vertices, promotions and demotions of §2.2 rule 3 (finer vertices a chain lands on, a clear-region
  batch's prepared vertices and a stretch's ends among the promotions; the levels a removal leaves re-levelled by the
  rows); it may clear finer content inside its faces (`clearFiner`)
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
  stage of §4.1's order (Judgment J-K33), so every face it could move has a stage rank at least that, and what a move
  may not displace is decided by §3.6's held vertices
  and whole-step validation instead; the faces a step leaves below a class floor are re-derived afterwards by their own
  batches, each with the `rederivesFrom` of the stage that makes them. The re-walk re-parents each kept face into the
  new face that contains it — a kept face never straddles a new edge, because crossing it is refused — so nesting holds.
  In generation `E_KEPT` cannot arise on a correct pipeline, because the stage order builds no finer face before a
  coarser stage that could meet it: a wall's band, setback and glacis parts are L3 content of their own L1 wall-strip
  faces, cut off by S7 before S8 and built after S9 (§4.7 S10 (0), §4.8), and the hinterland's L3 content is built after
  S9 by its own unit (§4.9); the rule turns a wrong domain into a typed failure that the stage property tests catch (0
  `E_KEPT` on the one-click path, §13.2). In an edit it returns to the dry run as a conflict whose offered resolution is
  to start the re-derivation at the stage that made the content. A re-derivation whose scope holds wall-strip faces,
  or faces bordering the settlement perimeter or a reservation boundary two districts share, re-runs S10's step (0) for
  **its own side's** parts after its S8 and S9 (first, when it re-derives from S10) — `bandUnion` restricted to the
  scope's faces, its cross edges ending on the shared edge by attraction onto the vertices the other side's parts
  already placed there (§7.3 item 2; VK2-2) — so wall bands and margin bands are rebuilt with the fabric, never kept and
  never lost, and the other side is never written. **A batch's faces are the faces it names or creates** (K4, VK2-11):
  a same-level split of an edge those faces share with faces outside the batch — the neighbour step's kerb split beside
  finished plots and footprints (II.1 (3)) — adds that vertex to the outside faces' rings; they are not the batch's
  kept content and are neither cleared nor re-owned, and each ring equals its prior ring with the vertex removed (the
  seam exception, §4.6 step 7, §7.3 item 1). `clearFiner` never removes kept content and never
  reports it as a conflict: it is kept by design, and only locked or pinned content is a conflict (§2.2 rule 6).
* **Local coarse insertion — clear regions and prepared contacts (NF-P14, NF-P4, LC-7, VK2-3; Judgments J-I10, J-I12,
  J-I13, J-K24).** A coarse batch inserted into finished fabric — §4.11's carve of a canal, moat or basin, §4.4's outer
  moat, S1's water operator re-carving a reach (§7.3 (b)) — would under the plain rule clear every finer face of its
  level-n faces, and an L0 face is a whole land component, so one canal would clear the town. Such an insertion
  therefore runs as a declared sequence of single-level batches that share one **clear region**, carried in
  `KernelTx.clearRegion`: the edit's **footprint**, which the operator computes in its dry run (§4.11 for the carve and
  the outer moat, §7.3 (b) 2 for the re-carved reach, whose L1 batch (b) 3 and L0 batch (b) 4 both declare it) — its new
  chains ⊕ (`attractCm` + the clearance of the chain's class — for a channel, its bank setback), computed with `buffer`
  (§3.7), **united with every L1 cell the edit's way rule touches**: the cells that buffer meets, the cells bordering a
  stretch the edit removes or prunes or a kept way's replaced stretch, the cells a re-routed way crosses, and — where
  the edit re-traces a wall run — the cells bordering the old run or the strip-line stretches it removes with it and the
  cells the re-traced run's new strips will take (VP2-1, NP3-2); the footprint is exactly the union of those cells,
  since the buffer lies inside the cells it meets (§4.11). The kernel's part is three rules:
  1. *Clearing.* `clearFiner` in a batch that declares a clear region removes each finer face whose interior meets the
     region — whole, never part of one — with the partition edges and vertices no remaining face uses, and nothing
     else; locked and pinned owners return as conflicts; every finer face that does not meet the region is **kept
     content**, whatever its stage rank. **Structural finer edges inside the region** — ways, walls, setback and glacis
     lines, deck spans — are kept, not cleared, unless a preceding batch of the same edit removed them: the preparation
     (rule 2) re-lays or cuts every structural edge the coarse chain would otherwise meet (§4.11 batch (1), §7.3 (b) 3),
     and `clearFiner` removes partition content only (VD2-1). The coarse batch itself clears nothing; it only splits
     the finer faces that meet the region (rule 3).
  2. *Preparation.* One or more batches at the finer level, issued first in the same edit or stage, clear the region
     (rule 1) and place **every** point where the coarse chain will meet finer geometry, as vertices named by role (§2.2
     rule 7; VK3-2): on each way the operator keeps across the new water, a deck's two bank vertices carrying
     `('deck_end', bridge, 0 | 1)` under a fresh `Bridge`, with the way's stretch between them one straight edge — the
     deck span; on each wall run the operator re-traces across the new water (S1's water operator, §7.3 (b) 3, and a
     carve that crosses a wall, §4.11; J-I13), its water gate's two bank vertices carrying `('gate_end', gate, 0 | 1)`
     under a fresh `Gate`, which the `Gate` record built afterwards names (§2.7); on the map's `border` line (§3.2 (9)),
     which must stay closed, its two bank points as `anchor` contact names, with the border's stretch between them — one
     straight edge, or several where the water takes in a corner of the frame or a vertex an earlier edit left on it
     (VK4-6 (a)) — left across the water unchanged, as a deck span is (the arena's outer ring is L0, so new water meets
     it at its own level); and for every other finer edge the new water will cross that is no way — a
     settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis line — its two bank
     points as `anchor` contact names, with the stretch between them removed. A contact name is placed by `splitThrough`
     with its row given without an ordinal — the operator names the entity by §2.2 rule 7, and the kernel allocates that
     entity's smallest free `anchor` ordinal (from 2 on an enceinte) as the op applies, so in the batch's canonical op
     order (§3.4; VK4-6 (b)) — and lives until the coarse batch strips it (rule 3). A coarse chain never shares a finer
     edge, so a finer edge the new water would run along is cut back by the preparation like any lesser way. A way cut
     back beyond its bank setback — every lesser way, and a quay or landing, which the operator extends to the new bank
     only once the water exists, its end an ordinary Steiner vertex on the L0 bank (§4.11 batch (3)) — leaves no contact
     and needs no prepared vertex. Every stretch the preparation removes — a cut stretch, a pruned remainder, a kept
     way's replaced stretch, the stretch between two contact names — is removed through a `StretchRef` (§2.2 rule 5,
     §3.4), and a way left in two parts is first split by `retypeEdges`' `rekey` on its far part, so role consistency
     (§3.10) holds after the batch.
  3. *Contact.* The coarse batch splits the finer faces that meet the region (their records are re-walked and keep their
     owners until a later batch of the operator re-owns them), lists the prepared vertices in `KernelTx.prepared` and
     may meet finer edges and vertices only there: §3.6's candidate (c) attracts it onto each prepared vertex and
     promotes it, clearing the vertex's `split` flag and stripping an `anchor` contact name, whose work is done (§2.2
     rule 7). The finer edges at a prepared vertex stay as they are — kept outside the region, the preparation's own
     inside it — so each kept way's straight L1 edge between its two promoted bank vertices now lies across the new
     water as the `Bridge`'s deck span, carrying `deck` beside `way` (§2.2 rule 7), each re-traced run's edge between
     its two `gate_end` vertices as its water gate, and the border's stretch between its two contact points as the
     closed frame: no L0 edge crosses the water, no deck splits the water body's L0 faces, and the way stays one chain
     through every batch — the structure S1, S3 and S4 build at generation (J-I12). Any other contact with finer
     geometry is `E_LEVEL` inside the region and `E_KEPT` outside it, and returns to the dry run (in generation, to the
     stage's property tests). The re-derivation that follows runs on the footprint's cells (§4.11 step 4, §7.3 (b) 8),
     so a carve costs its footprint — the channel's banks and the few blocks its way rule reshapes — not the town.
     *Confirmation (M3a):* §13.1's and §13.2's carve fixtures — a canal across a CITY district, a canal across a walled
     CITY's wall between two towers, an outer moat at S5a, a course-knot move and a river move across a street grid and
     through a walled town (§4.11, §7.3 (b)) — require every face outside the footprint byte-identical, less the seam
     exception at its boundary (the neighbour steps of II.1 (3) where a re-derived lane ends on a spine that bounds the
     footprint; §4.6 step 7), attraction onto **exactly** the prepared vertices (every one promoted, no other finer
     vertex promoted, and each deck the kept way's own L1 edge carrying `deck` and `way`, with no L0 edge across the
     channel), every indexed role unique per ordinal and no contact name left after the edit, and a carve chain that
     touches a finer edge away from its prepared vertices refused (`E_LEVEL`). *Pre-decided fallback* if a fixture
     cannot be met: the batch clears the finer content of its whole L0 land face and re-derives it (the plain rule —
     correct, slower); `moat: 'all'` is then carved only before S5c of the outer stage, where L1 holds only arterials,
     and an edit carve becomes a declared town-wide re-derivation with the fate report (§7.3).
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
* **The commit record** lists what the batch created, changed, moved, promoted, demoted and removed per level. It is the
  input of the batch-local invariants (§3.10), of index maintenance (below), of the display list's dirty set (§8) and of
  the digest update: at commit the kernel re-hashes the leaves the batch touched — the per-level plat digests and the
  entity leaves of §6.2 — and the nodes on their paths to the root; the maintenance budget is ≤ 5 % of the batch's time
  and the root's finalisation ≤ 5 ms at CITY (§6.2, §12.4). It is never persisted, because it holds arena slots. A batch
  already validated by an edit's dry run (§7.1) commits that validated overlay without a second validation.

**The derivation pool's overlays (VK-3; Judgment J-K16).** The per-district stages that run in the pool (S10, S10b, S11,
S12b; §4.1) use these same transactions on **district overlays**, in five steps:

1. *The frozen base (VK2-1, VK3-5, VK3-6; Judgment J-K25).* When the eager S10a and S10's **shared-edge step (0)** have
   committed — the step runs on the generation worker and builds, on both sides at once, the bands around every L1 edge
   that two overlays' face sets share without corridors (step 3; §4.7) — step (0) ends as an eager stage does: it
   **rebuilds the static L3 partitions its batches touched** (below; a finer batch writes no coarser index, so L3 is the
   only level it touches). **At the freeze the generation worker first rebuilds every static partition whose dynamic
   grid or tombstone set is not empty** — none on the one-click path, where every stage has just ended with its rebuild;
   after edits — an epoch's per-district stages, a Re-derive from a stage at or before S10, a verification replay
   folding either — the partitions the edits left dirty, each holding at most max(256, ¼ of its static size) grid items
   (below) — **and then asserts every level's dynamic grid and every partition's tombstone set empty.** The rebuild is
   the stage-end rebuild's code on the partition's live items, so it changes no output (every query sorts by canonical
   key, whichever structure holds an item), and it runs at every pool size, 0 included (step 5); measured with the same
   build (`docs/validation/bench/fixall_kernel_r4_bench.out` B): ≈ 2 ms for one district's L3 and L4 partitions, ≈ 10 ms
   for five districts', ≈ 6 ms for the arena-wide L1 partition with one L2 partition, and ≈ 59 ms in the worst case of
   every partition of a finished CITY. The generation worker then freezes the arena at that version and sends each pool
   worker one read-only copy — the vertex, half-edge, role and face arrays, the role-head and owner-head tables (typed
   arrays, §2.2), the index's home column and **every non-empty level's static index partitions** (L0–L3 at the
   one-click freeze, where L4 is still empty; L0–L4 at a freeze after edits) — as transferred `ArrayBuffer`s, so a
   pooled plot line that must end on the inner edge of a wall band, a setback part or a margin band, and S12b's greenery
   in setback and glacis residue, find those edges by the same indexed queries as everything else, and a pooled
   re-derivation finds the locked or pinned content kept in its scope. No `SharedArrayBuffer` is used, so an embedding
   host needs no cross-origin isolation (§11.2). **The copy's size (VK3-6)** is the arena and its tables — at most ≈ 12
   MB at CITY, the finished town's figure (§2.2 *Size*) — plus the partitions at 38.4 B per item and the home column at
   2 B per slot: ≈ 2.2–3.3 MB and ≈ 0.2 MB at the one-click freeze (≈ 60 000–90 000 items: the L0–L2 view and step (0)'s
   parts; our count, PLAUSIBLE until M1), so ≤ ≈ 15 MB per copy (the one-click arena, without plots and footprints,
   stays under the finished town's figure) and one memory copy per worker of ≈ 1.5 ms (≈ 4.6 ms for three, measured,
   same file A); ≈ 20 MB at a freeze after edits (≈ 2 ms each). §12.4 carries the copies on CITY's critical path, and
   §12.8 counts one copy per pool worker. *Pre-decided fallback* if M1's memory measurement — or M4's, on the epoch path
   — exceeds the rung's line with these copies: a copy made after edits carries only what a pooled stage may read under
   the laziness contract (§4.1) — the L0–L2 partitions, every L3 partition (step (0)'s parts are eager) and the L4
   partitions of the districts the pool derives (their kept content); another district's footprints are lazy output that
   no pooled stage reads — and then §12.8's pool-shrinking step applies. Step (0)'s own rebuild covers every L3 item it
   made — at CITY ≈ 9 000 vertices, edges and faces (both sides of ≈ 6 km of perimeter margin band and of the wall's
   band, setback, glacis and tower parts, our count) in ≈ 26 partitions — and costs ≈ 2.3 ms at CITY and ≈ 5.8 ms at
   METROPOLIS by the measured build rate (`docs/validation/bench/fixall_kernel_r3_bench.out` A), which §12.4 carries in
   S10 (0)'s row.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base: new
   vertices, half-edge pairs, face records and role rows go to the overlay's own growable arrays in overlay-local slots
   numbered above the base's high-water mark — and so do the interned handles of the entities the district creates,
   remapped with the slots at the merge — and a change to a base record — a kerb edge split by a plot line, a face ring
   re-walked — is written as a copy-on-write record in the overlay; an item of the frozen partitions that the overlay
   deletes, re-levels or changes is tombstoned in a set the overlay keeps for that partition, consulted with it — the
   copy's own sets are empty (§3.10) — which the district-end rebuild of step 4 consumes (a pooled stage changes only
   its district's L3 and L4 items: a finer split writes no coarser index, below). Every district starts from the frozen
   base alone, never from another district's overlay, so its result is a pure function of the base, its allocation and
   its own sub-stream, whichever worker runs it and whatever ran on that worker before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. Its **scope** is every face
   of the set, every edge with a face of the set on both sides, every vertex whose incident faces all lie in the set,
   and — for a split only (a vertex placed on the edge, §2.2 rule 3) — every edge on the set's boundary whose other side
   no overlay writes (a water face, the arena's outer ring) with the vertex placed on it; so waterfront plot lines may end on
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
   ones, travel with the overlay and have their item tables rewritten through the same remap table and replace the
   base's partitions with empty tombstone sets, the home column taking their items' partition numbers, so the merged
   arena needs no index rebuild; the overlay's added and changed role-head and owner-head keys, kept in the overlay's
   own small tables and consulted before the base's, are inserted into the live tables through the same remap; the
   district's digest leaves (§6.2) travel with it too, and the root is finalised once after the last overlay. The cost
   is O(overlay size): the ≈ 200 000 records S10–S12b create at CITY merge within §12.4's 8 ms merge row.
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; Judgment J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned — one
partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland, margin) —
with a tombstone set, and (b) one **dynamic uniform grid** (cell 25 m at L0–L1, 10 m at L2, 5 m at L3–L4; table values)
with O(1) insert and delete. **What each level's index holds (VK2-1, VK2-4, K4-1):** the items of that level (their
current birth level) — its vertices; its **route edges**, each maximal run of that level's sub-edges between two
vertices of that level or coarser being one item whatever finer vertices later split it, its box the bounding box of the
vertices standing on the run when its level's batch writes the item, padded by the 0.71 cm hot pixel, and its handle the
half-edge leaving its lower (y, x) endpoint (a split keeps that pair on the part at that end, so the handle never
changes); and its face records. The run's box holds every finer vertex on it by construction: one placed afterwards lies
within the hot pixel of the route edge the item is (§3.6's placement rule (i)), inside the endpoints' box so padded, and
one placed before stands in the box however the route has changed since (§2.2 rule 3; Judgment J-K32) — the route edge's
endpoints' box, padded alike, missed 38 of 400 753 finer vertices under the placement rule's non-nearest choices and the
run's box none (`docs/validation/bench/fixall_kernel_r4_checks.out` A). A finer batch that splits a coarser edge with a
Steiner vertex therefore writes only its own level's index, never a coarser one — S10's step (0) and every pooled stage
touch only the L3 and L4 indexes — while a promotion or a demotion, the coarser batch's own change of a route, moves the
vertex or edge to its new level's index and rewrites the route-edge items of the levels whose routes it changes: a
promoted vertex makes the route edge it now splits two items, a demoted vertex joins its two items into one, and a
demoted edge leaves its old level's item for its new level's (§2.2 rule 3). **No item changes in place (VK4-5).** Every
item a batch deletes, re-levels or changes — a deleted vertex, edge or face; a promoted or demoted vertex or edge; a
route edge whose run a vertex of its level joins or leaves (a same-level split, a promotion, a dissolution, a demotion)
or a move reshapes; a vertex a move displaces; a face whose ring at its own level a re-walk or a move changes — is
**tombstoned** in the static partition its home entry names (`Plat.indexHome`, §2.2), if it has one — the entry then
reads −1 — and its successor, if any, is inserted in the grid of its current level; an item already in a grid is deleted
from it or replaced there. A static item is therefore either exact or filtered, and no query sees an item at its old
level, its old place or its old extent — a promoted-then-demoted plot-line end answers an L2 query not at all and an L3
query once, whether or not its partitions were rebuilt in between. Inside a stage every insertion and deletion goes to
the grid; a level-n query reads the static partitions of levels ≤ n that its box intersects and their grids, drops each
static hit whose item key its partition has tombstoned, expands each route-edge hit into the pieces of its level-n route
that meet the box, and **sorts its result by the canonical key of each item kind, read on the query's level-n route**
(VK-14, VK2-4): a level-n query returns the vertices of level ≤ n, each level-n route edge once (as its sub-edge leaving
its lower endpoint) and the level-n faces, and keys them — a vertex by its lattice position (y, then x); an edge by the
positions of the two endpoints of its level-n route edge, the lower (y, x) first, never by a sub-edge's endpoints; a
face by the positions of the first two vertices of level ≤ n on its outer ring — the lowest-leftmost vertex of level ≤ n
and the next vertex of level ≤ n counter-clockwise, finer vertices skipped, and where the ring visits that vertex twice
the smaller of its two successors; in a mixed result vertices come before edges and edges before faces. The key is
total: no two vertices share a lattice point, no two level-n route edges share both endpoints, and a face's key is one
directed level-n route edge, which bounds exactly one level-n face — so neither which structure holds an item nor
whether a finer level has been derived changes any answer (a finer vertex on the ring is skipped, so an L3 query orders
its results identically before and after S11 derives L4 in the block;
`docs/validation/bench/fixall_kernel_r3_checks.out` C shows the full-ring key reversing two plots there), and no
implementation ever needs a slot to break a tie. **Tombstones (VK-15, VK4-5)** are item keys — kind · 2³² + slot, the
kind a vertex, a route edge or a face — held in one set per static partition: the items deleted, moved to another level
or changed since that partition's build. They filter **that partition's hits only**: a new item — the next occupant of a
slot freed and reused inside the stage, or an item's successor after a promotion, a demotion or a change — lives in the
dynamic grid, which tombstones never filter, so neither reuse nor a level change can hide it, and the stale static copy
never answers. A partition's rebuild indexes the live items that belong to it — every item of its level in its arena at
L0–L1; at L2–L4 the items of its district, a vertex on an L1 edge two partitions share going to the smaller key, as
§3.9's chunks do — sets their home entries, removes them from the grid and empties its tombstone set; the home column (2
B per vertex, edge-pair and face slot, ≈ 0.5 MB at a finished CITY) lets a batch tombstone an item without searching the
partitions. *Chose static-only filtering over forbidding slot reuse until the next rebuild* because the old and new
occupants of a slot then live in different structures by construction and the arena stays compact. **Static partitions
are rebuilt only when a stage ends** — for an eager stage once, after its last batch, and for S10's eager step (0) once,
before the pool's freeze (pool step 1); for a lazy or pooled per-district stage, the district's own partitions after
that district's run — and, during an editing session, when a partition's grid overflow exceeds max(256, ¼ of its static
size): a count, never an idle timer; every pool freeze rebuilds the partitions an editing session left dirty (pool step
1). Measured rebuild cost of the flatbush construction (`docs/validation/bench/bench_index.out`): 0.24 ms at 1 000
items, 2.3 ms at 8 000, 4.9 ms at 17 000. At CITY that is about one L3 and one L4 rebuild per stage (≈ 7 ms together),
or ≈ 0.2–0.3 ms per district partition, instead of the 1.9 s (S10) and 13.4 s (S11) that a rebuild per block or per plot
commit would cost; a single plot edit rebuilds at most its district's L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5
ms) inside the 5 ms plot-edit budget. A cost-model test fits each stage's time against commits × level size and fails if
rebuild work grows with the number of commits (§13.2).

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

*Judgment J-K24 (VK2-3; the deck form amended at integration, J-I12).* Chose to name a coarse insertion's permitted
contacts explicitly — `KernelTx.prepared`, by role, each prepared vertex attracted onto and promoted — over letting the
coarse chain attract onto any finer vertex near its route, because the kernel can then refuse every unprepared contact
(`E_LEVEL`) instead of silently welding a canal bank onto whatever plot corner lies within 26 cm; and chose the deck
span to be the kept way's own L1 edge between its two promoted bank vertices over an L0 deck edge laid on it by edge
promotion and over leaving a gap in each kept way for a new deck edge, because generation already builds a deck that
way (S1 and S3 place the bank vertices at L0, S4's L1 spine carries `deck` on its span), so a dug canal and a moved
river leave the structure a regeneration would, every way stays one connected chain through the whole edit (which keeps
§3.10's role-consistency check meaningful after every batch), no deck splits a water body's L0 faces (rule 1: L0 is land
and water only) and no second kind of promotion is needed.

*Judgment J-K15 (VK-6).* Chose two declared transaction forms — independent op sets in canonical order, dependent op
sequences in issue order — over one canonical order for every batch, because a recursion such as the bent cut plans each
op on the faces the previous op created, so sorting it would apply a child cut before its parent face exists, while its
issue order is already a deterministic function of the stage's inputs and streams.

*Judgment J-K16 (VK-3).* Chose read-only transferred copies of the arena with one copy-on-write overlay per district and
a lineage-ordered merge, over a `SharedArrayBuffer` arena written in place by the workers, because shared memory makes
cross-origin isolation a requirement of every embedding page (D-4's embed target), in-place writes would need locks
whose order could leak into the output, and a district that starts from the frozen base alone is deterministic whatever
the pool size; the price is one arena copy per worker — ≤ ≈ 15 MB at CITY at the one-click freeze with the typed lookup
tables and the static index partitions, ≈ 20 MB at a freeze after edits (VK3-6) — counted in §12.8.

*Judgment J-K25 (VK2-1).* Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, so that the
frozen copy carries the L0–L3 static partitions and every dynamic grid is empty at the freeze (asserted), over shipping
the generation worker's dynamic grid with the copy (the grid would have to become a transferable structure, and each
worker would query two dynamic structures) and over letting each pool worker index its districts' step-(0) parts at
district start (≈ 0.8 ms per worker in parallel instead of ≈ 2.3 ms once), because one checkable precondition — nothing
at the freeze lives outside a static partition — makes it impossible for any pooled stage to query an index that misses
eager content, whatever later eager steps are added before the freeze; the price is ≈ 2.3 ms on CITY's critical path.
Round 4 (VK3-5) makes the freeze establish that precondition itself — it first rebuilds every partition whose grid or
tombstone set is not empty, and only then asserts — over asserting on trust that the last writer rebuilt, because an
editing session deliberately leaves grids dirty until they overflow (a single plot edit would otherwise pay two
partition rebuilds), so an epoch or a re-derivation after edits would freeze dirty grids and fail the assertion, or,
without it, send pooled stages an index that misses the edited items; the price is nothing on the one-click path and
≈ 2–10 ms after a typical run of edits (≈ 59 ms if edits have touched every partition of a CITY, measured).

*Judgment J-K33 (VK3-8, kernel part).* Chose the first stage of §4.1's order as a move batch's `rederivesFrom` over the
first stage that writes its `fromLevel`, because a move clears nothing (§3.6), so the value only has to rank at or below
every face the move could reach, and a named list of first writers goes stale whenever §4.1 moves one — VK3-8's
placement of the frame lines had to be checked against such a list (the arena's outer ring is written by S1's L0 batch
and the map border by S3's L1 batch, so S3 stays the first L1 writer, §4.1), and every later move of a writer would
reopen it.

*Judgment J-K34 (VK4-5).* Chose to tombstone every item a batch deletes, re-levels or changes — keyed by item kind and
slot, in one set per static partition found through a per-slot home column — and to insert its successor in the grid,
over moving or rewriting items in place, because a static packed partition cannot change an item: a
promoted-then-demoted plot-line end would otherwise answer an L2 query as an L2 vertex and an L3 query twice until its
partition happened to be rebuilt, so an answer would depend on rebuild timing, against this section's "neither which
structure holds an item … changes any answer", and a replay that rebuilds at other moments could differ from the session
(§7.3 item 7 (i)); and chose one set per partition over one per level, because a partition's rebuild must drop exactly
the tombstones of the items its old build held — with one set per level, a slot freed in one district and reused in
another (VK-15's own case), or an item re-owned into another district, would be hidden by the old tombstone once the
other partition's rebuild indexed it, or the freeze would have to rebuild every partition of the level; the price is 2 B
per slot (≈ 0.5 MB at a finished CITY) and one grid insertion per changed item, which the overflow rule already bounds.

=== REPLACE §3.4 Kernel operations the pipeline needs (complete list) ===

### 3.4 Kernel operations the pipeline needs (complete list)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

```ts
// @plat/kernel — the only writers of any arena. `tx` is the open KernelTx (declared or callback form, §3.3); write ops charge its work count.
// Writers (level = tx.level; semantics §3.6)
insertChain(tx, points: Point[], roles: RoleRow[], cls: 'mandatory'|'optional', opts?: { closed?: boolean; pinned?: number[];
  knots?: { index: number; role: RoleName; ordinal: number; entity?: Id /* default: the chain's own entity (a knot); another entity for a vertex role such as a bridge's deck_end or a gate's gate_end */ }[] /* every vertex role row the chain's own vertices take */ }): KernelResult<ChainInsert>
interface ChainInsert { placed: VertexId[] /* one per input point, in input order: the vertex the point became after snapping, attraction and sharing (§3.6); valid until the next commit — S11's first wing carry reads it (§2.6; NP3-1) */ }
splitThrough(tx, at: HalfEdgeId, p: Point, row?: RoleRow /* a vertex role row the placed vertex takes — a cut end's anchor contact name (§2.2 rule 7); an `anchor` row given without an ordinal takes that entity's smallest free `anchor` ordinal (from 2 on an enceinte), allocated by the kernel as the op applies (VK4-6 (b)); any other indexed row must carry its ordinal, an assertion otherwise */): KernelResult<VertexId>   // a vertex on an existing edge, placed by §3.6's placement rule; a Steiner vertex when the edge is coarser (§2.2 rule 3)
removeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef): KernelResult<void>   // strips (role, entity) from the ref's edges — a StretchRef's only, after cut knots at its ends (§2.2 rule 5) — or, for a VertexRef, that vertex role row; deletes edges left with no role; then re-levels by the rows and dissolves (§2.2 rule 3): demotes edges and vertices the rows no longer justify, and dissolves each degree-2 vertex left with the `split` flag, no vertex role, no pin and identical role sets and level on its two edges — so removing a lane that ended on a spine restores the spine exactly, and removing the street a neighbour step served returns the plot-line end it promoted to its level
clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Conflict[]>     // removes content finer than `level` inside the faces whose stage rank ≥ tx.rederivesFrom's — with tx.clearRegion declared, exactly the finer faces whose interior meets the region, whole (§3.3); kept content stays silently; re-levels and dissolves as removeEdges does; locked or pinned owners are returned, not removed (§3.3)
retypeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef, add: RoleRow[], remove: RoleName[],
            rekey?: { from: Id; to: Id; profiles?: { from?: ChainProfile; to?: ChainProfile }[] /* both entities' profiles, paired by knot role */ })
  : KernelResult<{ profiles: { knotRole: RoleName; from?: ChainProfile | number | string; to: ChainProfile | number | string }[] }>
  // the EVO conversion primitive (wall → way) on role sets; an added row coarser than an edge of the ref is E_LEVEL, and `remove` re-levels as removeEdges does (§2.2 rule 3).
  // `rekey` moves the ref's (role, from) rows, knot rows and vertex roles to `to` (for a StretchRef, the stretch's, its ends being the cut vertices),
  // renumbering each entity's knots from 0 in chain order; at every vertex where the moved edges meet edges that keep `from` it first
  // cuts each profile there (cut knots), and at every vertex where they meet edges already carrying `to` it joins them (§2.2 rule 5);
  // it returns both entities' new profiles — a scalar where a part has no knots left — which the caller writes into both records in the same edit
setOwner(tx, faces: FaceId[], owner: Id): KernelResult<void>
splitFace(tx, face: FaceId, cut: Point[] /* a bent cut is 2–3 vertices */): KernelResult<[FaceId, FaceId]>   // children ordered: left of the directed cut first
connectHole(tx, face: FaceId, cut: Point[]): KernelResult<FaceId>          // outer ring → hole slit: same face count, one hole fewer
mergeFaces(tx, a: FaceId, b: FaceId): KernelResult<FaceId>                 // deletes shared partition edges only; a structural shared edge → E_STRUCTURAL
absorbSliver(tx, face: FaceId, floor: { minWidthCm: Cm; minAreaCm2: number }): KernelResult<FaceId>   // never deletes a structural edge (§3.6)
claimSubFace(tx, claim: { ring: Point[] } | { areaCm2: number; within: FaceRef | FaceId[] /* as corridorUnion takes: S7b passes a district's coarse faces less its wall_strip faces, §4.5 (VP2-3) */; score: RasterRef }, owner: Id): KernelResult<FaceRef>   // may span several faces
radialSplit(tx, face: FaceId, apex: Point, raysCdeg: number[]): KernelResult<FaceId[]>   // a fan from a centroid or a vertex (groves, chapter houses)
ringBand(tx, face: FaceId, widthCm: Cm): KernelResult<{ band: FaceId[]; core: FaceId }>  // an inner band around a court (cloister, quadrangle)
corridorUnion(tx, l1Faces: FaceRef | FaceId[]): KernelResult<BandResult>   // L2 half-corridor strips, junction wedges and built blocks for those L1 faces only (§3.7); kept faces inside them are holes (§3.3)
bandUnion(tx, chains: { ref: ChainRef; halfWidthCm: Cm | ChainProfile; ends: 'round'|'square' }[], faces: FaceId[], edgeRole: 'kerb'|'band', owner: Id): KernelResult<BandResult>   // the axis chain splits the band per side; corners get corridor_split; a profile is sampled per segment end (§2.2 rule 5)
warp(tx, field: DisplacementField, fromLevel: Level, region: Point[], recordCheck?: (step: MoveReport) => boolean /* the edit layer's check of the records standing on the moved ground — held point records (§7.4) and carried wings (§2.6); false fails the step's validation */): KernelResult<MoveReport>   // the edit layer computes the field from a WarpStroke or a moveVertex (§7.1) on the current geometry, and the smoother from a smoothing pass; held vertices, slides, placement-rule re-seats, whole-step validation (§3.6); keeps nothing (§3.3)
pinVertices(tx, refs: VertexRef[]): KernelResult<void>                    // sets the kernel `pinned` flag (smoothing, simplification and cutting keep the vertex; warp does not, §3.6); the flag lasts while the vertex carries a vertex role row — the removal that strips its last one clears it (§2.2 rule 3; VK4-1)
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

`insertChain` is the only door for new edges, `removeEdges` and `clearFiner` the only doors for removing them,
`insertChain`'s vertex rows (`opts.knots`) and `splitThrough`'s `row` the only doors for adding a vertex role row (with
`retypeEdges`' `rekey`, which moves rows between entities), `removeEdges` on a `VertexRef` the door for stripping one
(an S8 portal whose lane is removed, §4.6; a tower `wallToWay` removes, §4.11), and `warp` the only door for moving
existing vertices (a `moveVertex` edit is a `warp` whose field displaces one vertex, resolved by `resolveVertexAt`, and
smoothing of committed geometry is a `warp` whose field the smoother computes from the chain's current vertices); every
other writer is built from these, which is why planarity, `minEdge`, clearance and the kept-content rule are properties
of this list rather than of every stage (§3.10). Each op has documented preconditions, work local to the touched faces,
a typed result, a declared operation count and fuzz tests with constructive degeneracies (§13.1). The pipeline's older
names map directly: `corridorUnion` keeps its name and becomes the corridor use of `bandUnion`; `claimSubFace` may now
span several faces (a reservation that crosses coarse faces, a precinct, a bailey); `retypeEdges` acts on role sets;
`bufferChain` is `buffer`; `edgeChainBetween` is `resolve(ChainRef)`; `weld` no longer exists (attraction, §3.6);
`refine(level)` is a stage, not a kernel op. `sideRuns` gives stages a side notion that survives curved, round-joined
kerbs (maximal runs within a cumulative turning tolerance, each with its chord direction), which the bent cut needs
(§4.6). `setOwner` and `retypeEdges` are also the calls §6.3's succession uses: when a re-derivation hands a carried
address to a successor, the same batch re-owns the successor's faces and roles under that address, so geometry and
address always move together. `buffer`'s per-point half-widths apply only to the transient chains a caller passes in (a
stroke being previewed, a skeleton arc); a stored chain's varying width is always a `ChainProfile`, sampled by `kerb`
and `bandUnion` (§2.2 rule 5). A chain that carries a profile is inserted with its knots (`opts.knots`: the chain index
of each knot vertex with its knot role and ordinal); a knot that attraction lands on an existing vertex is carried to
that vertex, so the profile keeps its knot. A chain cut into parts owned by different entities, a ring opened, or two
chains joined go through `retypeEdges`' `rekey`, which inserts and drops cut knots by §2.2 rule 5 and returns the new
profiles; the former `ordinalOffset` argument is gone, because the kernel renumbers each entity's knots in chain order
itself.

**Stretches (VK3-9; Judgment J-K31).** Every operator edit on part of a chain names the part by a `StretchRef` (§2.2
rule 5) — the chain's edges between two of its vertices, in chain order for an open chain and counter-clockwise from
`from` to `to` on a ring — and hands it to `removeEdges` or `retypeEdges`, so a carve's cut stretches, pruned remainders
and replaced stretches (§4.11 batch (1)), a moved river's old shore stretches (§7.3 (b) 4), the boundary stretch between
two bank contact names (§3.3 rule 2), a way split and a partial `wallToWay` all pass through the listed doors and their
invariant coverage. The op resolves the ref at the batch's current state: each end must be a vertex of the chain — named
by a vertex role or by its lattice point — and both must lie on one part of it, else `E_DEGENERATE` with detail
`stretch`; an end finer than the chain is first promoted to the chain's level (`W_PROMOTED`, listed in the commit
record; its `split` flag cleared), because it becomes an end of the remaining parts (§2.2 rule 3). `removeEdges` then
gives each remaining part of a profiled chain a cut knot at the stretch's end on its side (§2.2 rule 5) before the
stretch's rows and its interior knot rows leave, so every remaining sample is unchanged; `retypeEdges`' `rekey` cuts at
the two ends as at any cut vertex. A removal that would leave a linear entity in more parts than it declares fails role
consistency at commit (§3.10), so an operator that cuts a way in two first hands the far part to a new entity with
`rekey` on that part's `StretchRef`. A cut end that is not yet a vertex is placed first by `splitThrough`, with the
vertex role row the operator wants on it (an `anchor` contact name, given without an ordinal, which the kernel
allocates, §2.2 rule 7). Fixture (§13.1): a stretch of a way removed between two junctions and a stretch of a ring
removed between two anchors, each leaving the rest of its chain, its knots' samples and every other role unchanged.

=== REPLACE §3.6 Insertion, contact and move semantics — attraction instead of a weld dead band ===

### 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

**Attraction (GEO-3, VK-18, VK2-3; Judgment J-K2).** `insertChain` processes each chain of a batch in the batch's order
— canonical for a declared op set, issue order in a callback-form stage (§3.3) — in five steps. Its **candidates** are:
(a) the vertices and edges of level ≤ the batch's level; (b) the **finer vertices lying on those edges' routes** where
the chain ends on or joins such a route (a neighbour's plot-line end on the kerb where II.1 (3)'s neighbour step lands
its `corridor_split` edge, a close-up's kept fabric beside a new junction); (c) **in a batch that declares a clear
region, its prepared vertices** (`KernelTx.prepared`, §3.3) — a kept way's `deck_end` bank vertices, a re-traced wall
run's `gate_end` bank vertices, and the `anchor` contact names at every other bank point (§2.2 rule 7) — each attracted
and promoted like the finer route vertices of (b), with its finer edges kept. A clear-region batch never shares a finer
edge — the preparation cut back every finer edge it would run along (§3.3 rule 2) — so a carve's L0 channel passes
through each kept way's two prepared bank vertices, and the way's straight L1 edge between them, which now lies across
the new water, is the `Bridge`'s deck span (§2.2 rule 7) without a second edge (J-I12). A finer vertex of (b) or (c)
that a chain vertex lands on, or that a chain segment is routed through, is promoted to the batch's level (§2.2 rule 3;
`W_PROMOTED`, listed in the commit record). A (c) promotion clears the vertex's `split` flag, because it is a vertex of
the new coarse chain from then on, and strips an `anchor` contact name, whose work is done; a (b) promotion keeps the
flag, because the vertex still lies on the edge it split, and removing the promoting chain later returns it to its level
by demotion (§2.2 rule 3; Judgment J-K28). Nothing finer is a candidate otherwise. Finer content inside the batch's
faces has been cleared (§2.2 rule 6) unless it is kept (§3.3); kept geometry is an obstacle, and a chain that would
cross it or come within `attractCm` of it elsewhere returns `E_KEPT`; inside a clear region, a chain that would cross or
come within `attractCm` of a finer vertex or edge other than its prepared contacts returns `E_LEVEL` — so a canal bank
can never weld onto a plot corner that happens to lie within 26 cm of it. A chain is inserted run by run, and the part
of it already inserted counts as existing geometry for its later parts, so a chain that doubles back near itself
attracts onto itself like onto any other edge.

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
lie within 0.71 cm of the existing edge's route at the edge's own level (one index item, §3.3), so that edge moves no
more than its hot pixel; (ii) lie at least `minEdge` from the endpoints of the edge being split and, for a crossing,
from the endpoints of the crossing segment; and (iii) keep every vertex and edge around the split at least `minEdge`
from the new vertex and from every edge incident to it (the clearance invariant, checked in the index); ties y then x.
The search runs outward from the exact position, never beyond `attractCm`, and charges each candidate to the work count.
The nearest lattice point qualifies almost always. It fails only where a vertex already stands between `minEdge` and
`minEdge` + 0.71 cm from the edge — a gap a previous rounding or a warp can leave — and a point rounded towards it would
bring it inside `minEdge`; then a qualifying point lies a few centimetres along the edge, because that vertex is at
least `minEdge` from the edge's line and a point ≈ 5 cm along the edge's hot-pixel band is at least `minEdge` from it.
Measured (`docs/validation/bench/fixall_kernel_r2_attract.out` C): 200 000 crossings placed next to a vertex 25–26 cm
from the crossed edge — plain nearest-point rounding leaves 1 361 edges shorter than `minEdge`; the placement rule
leaves none, moves a crossing at most 0.84 cm and keeps it within 0.71 cm of the crossed edge. If no candidate
qualifies, the incoming vertex moves onto the nearer endpoint of the edge (a crossing routes its segment through that
endpoint), the new segments re-enter step 3, and the step reports `W_PLACED`; each such re-route lands on an existing
vertex, so the loop ends within the work limit. Snap rounding is the same rule for points that lie on no existing edge
(nearest lattice point).

**Existing geometry wins, and no edge shorter than `minEdge` can be created.** An incoming chain vertex moves at most √2
· `attractCm` (or by the corner bound of step 4 at an acute tip); no existing vertex moves; an existing edge moves only
by its hot pixel (≤ 0.71 cm) where a vertex is placed on it. Every edge a batch creates is one of four kinds, and each
is at least `minEdge` long: (a) a chain segment between consecutive chain vertices — decimation and the merge rule keep
them at least `minEdge` apart; (b) a sub-edge of a split existing edge — the placement rule's (ii); (c) a chain segment
ending at a split point or a crossing — (ii) again for a crossing segment's own endpoints, and the merge rule when the
chain's previous vertex is an existing vertex beside the split; (d) the span between two crossings — resolved at the
acute corner by step 4. Clearance holds by steps 2–3 for every new vertex and segment and by (iii) for every placed
vertex. Measured (`fixall_kernel_r2_attract.out` A–B): over 400 000 vertices dropped in the attraction band of random
lattice edges, 0 sub-edges shorter than `minEdge` (shortest 25.50 cm; 5 729 moved onto an endpoint; largest displacement
36.72 cm), where the rule as first written left one in 1.34 % of edge attractions
(`fixall_verify_kernel_attract_gap.out`); and the round-1 measurement of cut endpoints on Chaikin×2 spines with 7.9 m
median segments, re-run from the committed script (`fixall_kernel_r1_attract_check.py` reproduces the round-1 output;
`fixall_kernel_r2_attract.py` B applies the revised rule): 6.38 % attracted, displaced p50 12.9 cm and at most 26 cm,
shortest resulting edge 25.6 cm — unchanged, because those endpoints lie on the spine. The replaced rule welded only
within 5 cm and rejected the rest, so ≈ 5 % of endpoints and ≈ 10 % of two-ended cuts fell to the ladder (GEO-3).
Constructive fixtures (§13.1): the (20, 20) vertex against the edge (0, 0)–(1 000, 0); a chain crossing an edge next to
a vertex standing 25.0–25.7 cm from it; a stretch whose join point falls within `attractCm` of an edge endpoint; a carve
whose L0 channel attracts onto and promotes exactly its prepared vertices, leaves each deck the kept way's own L1 edge
carrying `deck` and `way` with no L0 edge across the channel, and is refused with `E_LEVEL` where it would touch any
other finer vertex; a canal across an open enceinte's glacis line and a river moved through a walled town, each leaving
every indexed role unique per ordinal (VK3-2); II.1 (3)'s neighbour step at a plot-line end, then the street removed by
a reroll, leaving the kerb's L2 route and digest as before the step (VK3-3); two neighbour steps on one kerb edge, the
first street then removed by a reroll — its plot-line end back at L3 and the kerb's L2 route equal to the route with
only the second step (VK4-3); a warp that moves a spine's vertices around an unmoved same-level T-junction, then the
lane removed — the junction stays a shape vertex of the spine (VK4-3); and a warp with `fromLevel = 1` over a generated
and over an edited water gate — neither gate's bank vertices move (VK4-4).

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

**Moves: warp and smoothing (GEO-10, GEO-35, VK-7, GEO-5 (c), VK2-5–VK2-7).** `warp(field, fromLevel, region)` applies a
displacement field to every vertex of level ≥ `fromLevel` inside the region. Shared boundaries are single vertices, so
the streets, blocks, plots and footprints under a brush move together (the property MFCG's warp had through shared
points), and vertices of level < `fromLevel` stay fixed — a street warp does not move the coast unless `fromLevel = 0`.
Smoothing of committed geometry is a `warp` whose field the smoother computes (§3.4), under the same rules. A move batch
**keeps nothing**: `E_KEPT` governs insertion and clearing only (§3.3); what a move may not displace is decided by the
held set below, and what it may not break by the whole-step validation. Its `rederivesFrom` is the first stage of §4.1's
order (§3.3; Judgment J-K33). The rules, in the order the step applies them:
* **Held vertices (GEO-5 (c), VK2-7 (b)).** Before the step the kernel computes the **held set**: (1) every vertex of
  the geometry a locked or pinned entity's references resolve to (§7.2) — the level-n route vertices of every ring of
  its `FaceRef` faces, outer rings and holes, of its `ChainRef` and `EdgeSetRef` edges, and its `VertexRef` vertices —
  and of every finer face nested in its faces, because §7.2 makes every finer face under a locked or pinned entity a
  fixed input; (2) closed downwards by level: the two endpoints of every coarser edge that carries a held Steiner vertex
  are held too, so that edge does not move and its held vertex keeps its place beside the route; each round adds
  endpoints of a strictly coarser level, so the closure ends within four rounds. The field is zero at every held vertex
  and the dry run lists the held entities, so a locked plot, block or building keeps every corner although none of them
  carries a vertex role. Kernel-pinned vertices — gates, junctions, portals, the vertices smoothing, simplification and
  cutting keep — move with everything else unless held, because a warp is the user's explicit move and every entity
  names its vertices by role (§2.2 rule 5), so a moved gate is still its gate. A bridge's `deck_end` vertices and a
  water gate's `gate_end` vertices are held unless `fromLevel = 0`, because the step that made the crossing fixed it
  across the water (§2.7) — a deck perpendicular to the flow, a water gate's wall edge from bank to bank — whatever
  level its bank vertices have: L0 for a deck and for an edited water gate, L1 Steiner vertices on the shores for one
  the trace made at generation, which would otherwise slide along the shore under a street warp and skew the gate's edge
  across the water (§2.2 rule 7; VK4-4; Judgment J-K35); with `fromLevel = 0` the banks and the crossing move together.
* **Vertices on fixed routes slide (VK-7, VK2-6; Judgment J-K18).** A route is **fixed** when its edge is of level
  < `fromLevel` or both its endpoints are held. A vertex of level ≥ `fromLevel` that lies on a fixed route and is not
  held — a street ending on a shore, a bridgehead, a riverside junction (level-1 Steiner vertices on L0 edges under the
  default `fromLevel = 1`), a neighbour's footprint corner on a locked plot's line — moves only along that route: its
  displacement is projected onto the route's direction at the vertex, the projected point is kept at least `attractCm`
  from the route's endpoints and from every held vertex on it, and the vertex is seated at the lattice point the
  **placement rule** chooses for that point — (i) within 0.71 cm of the route, (ii) at least `minEdge` from the route
  edge's endpoints and from its neighbours on the route, (iii) clearance — never at the plain nearest lattice point, so
  §3.10's placement bound holds for the slid vertex and a slide beside a vertex 25.0–25.7 cm from the route commits
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
* **Order within a step (VK3-4; Judgment J-K30).** Re-seats and slides read vertices that may be moving in the same step
  — two Steiner vertices on one warped kerb, a slide beside a re-seat — so they are placed one at a time in canonical
  order, by each vertex's lattice position before the step (y, then x), each reading the vertices already placed at
  their placed points and every other moved vertex at its rounded target (a re-seat's or slide's rounded target being
  the nearest lattice point to its projected point); the whole-step validation then checks the result. The order is a
  function of positions alone, never of slots (§3.3). Measured (`docs/validation/bench/fixall_kernel_r4_checks.out` B):
  for two Steiner vertices re-seated onto one warped route with projections 25.0–26.5 cm apart, the two possible orders
  place different points in 6.8 % of pairs, so without a fixed order a slot renumbering would change the town.
* **The `split` flag (VK2-5, VK4-3; Judgment J-K26).** The step clears the `split` flag of every vertex it moves, except
  a Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a fixed route: dissolving either
  still restores that edge exactly, because the edge is the segment between its endpoints (§2.2 rule 3). It also clears
  the flag of every flagged vertex it does **not** move that is of the same level as a run it split — a same-level split
  foot or crossing, or a vertex promoted onto that run — when the nearest vertex of that level or coarser beside it
  along that run moves in the step (a re-seat or a slide included): the run's line has moved from under it, so
  dissolving it, or restoring it by demotion, would no longer give the edge it split. A Steiner vertex of a coarser run
  keeps its flag, because it is re-seated with that run (above). The commit record lists these vertices in `unflagged`,
  and the edit's undo record restores their flags (§3.3, §7.4).
* **Whole-step validation (GEO-10, GEO-35).** Each target is rounded to the lattice (re-seats and slides by the
  placement rule, in the order above) and the **whole step** is validated: every edge incident to a moved vertex —
  including edges between two moved vertices and the edges at re-seated or sliding Steiner vertices — is at least
  `minEdge` long and is tested against the index for crossings; every unmoved vertex is tested against the triangles
  swept by the moved edges; no two vertices may land on one lattice point; no held vertex moved; the clearance invariant
  holds; and the edit layer's `recordCheck` passes — every held point record inside its host face at its clearance
  (§7.4), and every building whose footprint the step moves valid under §2.6's wing-carrying rule (its carried rings
  simple, its wings uniting to its footprint face). On failure the step's strength is halved globally — deterministic,
  at most 8 halvings, after which the step is a reported no-op. The commit record lists every moved vertex (§3.3), and
  §3.10's `minEdge` row checks the new and moved edges it names, so a `pinch` or `swirl` that would shorten an edge to
  10 cm, or stack two vertices on one lattice point, halves instead of committing.

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

*Judgment J-K18 (VK-7, VK2-6, VK2-7).* Chose to slide a vertex along the fixed route it lies on — an edge of level <
`fromLevel`, or one whose endpoints are held — over holding it (the whole step then halves to a no-op near every shore
junction, an editability regression against MFCG's warp) and over freeing it (it would leave the shore and move out of
the placement bound, §3.10; VK4-2), because sliding keeps the shore exact and gives the drag the user expects at quays,
bridgeheads and riverbanks; the slid vertex is seated by the placement rule for the reason of J-K17.

*Judgment J-K26 (VK2-5).* Chose to clear the `split` flag of a moved vertex except when the move re-seats it onto, or
slides it along, the edge it split, over clearing it on every move (a re-seated Steiner vertex left with degree 2 would
never dissolve, and the next derivation would attract onto a vertex a derivation on the clean edge would not have) and
over never clearing it (a warped same-level T-junction would dissolve once its lane is removed and straighten the warped
spine), because the flag's one meaning — "dissolving me restores the edge I split exactly" — is true after a re-seat or
a slide and false after any other move — of the vertex or, for a vertex of its run's own level, of the vertex beside it
on that run (VK4-3); a prepared contact's or a stretch end's promotion clears it for the same reason, while a promotion
onto the route the vertex already lies on keeps it, because there the meaning stays true and demotion needs it (VK3-3,
J-K28).

*Judgment J-K30 (VK3-4).* Chose to place a step's re-seats and slides one at a time in canonical order — by lattice
position before the step, each reading the vertices already placed at their placed points and the rest at their
rounded targets — over slot order, which would make the output depend on slot numbers against §3.3 (the two orders
differ in 6.8 % of close pairs, measured), and over a simultaneous solve of all moved vertices, which has no bounded
deterministic algorithm that the whole-step validation's halving does not already provide.

*Judgment J-K27 (VK2-7).* Chose to let a move batch keep nothing and to decide what it may not displace by a held set —
every route vertex of a locked or pinned entity's geometry and of the finer faces under it, closed downwards over the
endpoints of coarser edges that carry a held Steiner vertex — over applying the kept-content rule to moves (every warp
over finished fabric would be `E_KEPT`) and over holding only role-carrying vertices (plots, blocks and buildings carry
no vertex roles, so a locked plot would be reshaped against §7.2), because the held set is exactly §7.2's promise
("keeps its existence and position") expressed on vertices, computed once per step in O(held geometry).

*Judgment J-K35 (VK4-4).* Chose to hold a water gate's `gate_end` vertices under a warp as a deck's are, whatever their
level, over giving a generated water gate L0 bank vertices through an extra L0 batch of two shore splits before the
trace (the form S4's added deck has), because the hold alone makes both kinds behave alike under every warp — the one
place the level difference reached a user — while the extra batch would add an L0 writer to S5a and a row to §4.1's
batch table for no visible output; the difference that remains is whether the bank vertices belong to the L0 view — an
edited gate's do, as vertices the new shore was drawn through, while a generated gate's lie within the hot pixel of a
shore drawn first — which the L0 digest records and which moves no shore by more than that hot pixel.

=== REPLACE §3.9 Geometry in the document — each arena stored once ===

### 3.9 Geometry in the document — each arena stored once

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/integrate-r2, fixall/draft-kernel-r2

The snapshot's geometry (§2.9) is **one block per `PlatKey`, never one per level** (SCL-11, kernel part):

* **vertices** — live vertices in slot order (slots are compacted on save; nothing outside the kernel stores a slot and
  no output depends on slot numbers, §3.3, so renumbering is free), coordinates as delta + zig-zag varint `Int32` pairs,
  with their current birth levels (after any promotion or demotion, §2.2 rule 3) and flags;
* **edges** — one (origin, destination, birth level) triple per edge pair, the level being the current one (the lowest
  among the edge's rows, §2.2 rule 3); `next`, `prev` and twins are not stored;
* **roles** — (edge or vertex, role, entity, level, ordinal) rows, entities as document ids — the knot, attach, anchor,
  weld, deck-end, gate-end and gate-opening rows included (an edit's `anchor` contact names never reach a snapshot: the
  batch that promotes them strips them, §2.2 rule 7), so every entity-held vertex and every chain profile survives the
  round trip without a stored position (§2.2 rule 5);
* **faces** — per level, one (boundary half-edge, owner, kind, stage rank) row per face; parents are not stored. The
  stage rank is persisted because the kept-content rule (§3.3) must decide the same way after a reload as in the
  session that made the face.

**Chunks (NF-D5, VD2-9).** The block is written as content-addressed chunks (§2.9). Per arena, the **level-≤ 1 routes**
are one chunk: every vertex of birth level ≤ 1 and every L0–L1 edge as one (origin, destination, birth level) triple
between its level-≤ 1 endpoints, with its roles of level ≤ 1 and the L0–L1 face rows — so no finer Steiner vertex is
part of it. Each static-index partition (one per district plus one outside districts, §3.3) is one chunk holding the
vertices born in it, its edges of level ≥ 2 (every district boundary is an L1 edge, §2.2 rule 1, so each lies in one
partition), the **Steiner splits** its batches made on L0–L1 edges — each as the coarser edge's route endpoints and the
split vertex, by lattice point, with the split vertex's level — the finer roles those batches added to the coarser
edges' sub-edges, and its face rows of level ≥ 2. **Every reference to a vertex another chunk holds is its lattice
point**, never (chunk, index): a vertex is unique per lattice point in its arena (§3.10). A vertex on an L1 edge two
partitions share — the foot of a wall- or margin-band cross edge (§4.7) — is written in the chunk of the partition with
the smaller key and named by its lattice point from the other. On load the kernel inserts the level-≤ 1 routes, then
each partition chunk in partition-key order — its splits first, sorted along each coarser edge by position, then its
vertices and edges — resolving lattice-point references through the one-vertex-per-lattice-point index; the rebuild
below then yields the same arena and per-level digests (they read routes, not slots), and save → load → save holds chunk
by chunk. So an edit that renumbers one partition's vertices rewrites that partition's chunk alone; the level-≤ 1 chunk
only when it changes a level-≤ 1 route, promotes a vertex into one, or demotes a vertex or an edge out of one; and, when
it changes a level-≤ 1 route edge, also every partition chunk that holds a Steiner split on that edge, because each
split names its route edge by the edge's endpoints (VK4-6 (c)) — the partitions whose faces border the edge, which an
edit that changes a coarse route (a carve's or a water edit's footprint, a seam amendment's two districts) mostly
re-derives anyway, and which §2.9's rebased-size test at M2a counts, its block-group fallback pre-decided. *Chose* to
keep each split keyed by its route edge's endpoints and to state the rewrite, over keying it by the split vertex's
lattice point alone for the loader to find the nearest level-≤ 1 route edge, because the endpoint key needs no
uniqueness argument across K4-1's drift (≈ 1.5 cm after several changes, `fixall_kernel_r5_checks.out` B), while the
extra rewrites fall on partitions that border a changed coarse edge and the size bar measures them. Under §2.9's size
fallback the partition chunks are cut per block group (the 200 m world-grid cell of each block's lowest-leftmost vertex)
with the same rules.

On load the kernel rebuilds `next` / `prev` by sorting each vertex's outgoing edges by exact angle (quadrant, then
`orient2d`), re-walks faces level by level, recovers each face's parent from its boundary edges and rebuilds the role
reverse index and the static index partitions: O(E log d), deterministic, and the per-level digests are recomputed from
the rebuilt arena as part of the load's one full digest recomputation, whose root §2.9 step 3 compares with
`model.digest` before the first edit (VD3-1); the snapshot stores no per-level digest of its own. *Pre-decided fallback
for §2.9's open-to-editable bar:* each L2–L4 static index partition is rebuilt at the first query that reads it instead
of at load — output-neutral, because every query result is sorted by its canonical key whichever structure holds an item
(§3.3). A boundary seen by several levels — a kerb, a plot line, a shore — is written once; the five-DCEL design wrote
each inherited edge again at every finer level. Entities carry no slots and no vertex positions except the wing rings
§2.6 carries with their footprints, so the entity table needs no remapping on load. The kernel's round-trip test: save →
load → save is byte-identical and the loaded arena passes every hard invariant (§3.10). The compact twin (CBOR, §11)
carries the same block with typed-array tags. The two added columns — a 2-byte ordinal per role row, a 1-byte stage rank
per face — are ≈ 0.45 MB raw at CITY, almost all of it zero ordinals and a handful of repeated ranks that the document's
compression removes; the document-size test (§2.9: ≤ 320 B per building at CITY) measures the result at M1 like every
other column.

=== REPLACE §3.10 Kernel invariants — what is checked, when, and at what cost ===

### 3.10 Kernel invariants — what is checked, when, and at what cost

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-kernel-r5); earlier revisions fixall/integrate-r4, fixall/draft-kernel-r4, fixall/integrate-r3, fixall/draft-kernel-r3

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex ≥ `minEdge` from every edge outside its one-ring | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point: no two vertices share a lattice point | hard | batch-local | by construction for insertions (coincidence is attraction); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| placement bound: every vertex a batch places, re-seats or slides onto a coarser edge lies within 0.71 cm of that edge's route at the edge's own level when it is placed; a later same-level change of the route (a split, a promotion, a demotion, a dissolution) moves no finer vertex, and the index items it rewrites box the finer vertices where they stand (§2.2 rule 3, §3.3; K4-1) | hard | batch-local | the placed, re-seated and sliding vertices |
| level consistency: every edge's birth level is the lowest level among its role rows; no vertex is coarser than every edge and vertex role at it; a vertex finer than an incident edge lies inside that edge's run — its incident edges coarser than it are exactly two, of one level, with identical rows of that level (§2.2 rule 3; VK3-3) | hard | batch-local | the commit record's new, changed, demoted and removed edges and the vertices at them, and its promoted and demoted vertices |
| held vertices: no vertex of a `warp` or smoothing step's held set moved (§3.6) | hard | batch-local | the commit record's `moved` list against the held set |
| prepared contacts: a clear-region batch met finer geometry only at its `KernelTx.prepared` vertices, promoted exactly those, stripped their `anchor` contact names, and shared no finer edge (§3.3, §3.6) | hard | batch-local | the commit record's `promoted` list against the resolved prepared set, and its new edges' birth levels |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` — nor, in a clear-region batch, any finer face outside the region — was cleared, crossed, split or re-owned (moves keep nothing, §3.3) | hard | batch-local | the stage ranks and region test of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role (attach, anchor, weld, deck end, gate end, gate opening) finds exactly one vertex or edge set per ordinal, every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| frozen base complete: at every pool freeze, after the freeze has rebuilt each static partition whose grid or tombstone set was not empty (none on the one-click path; those edits left dirty otherwise), every level's dynamic grid and every partition's tombstone set is empty — every item lives in a static partition the copy carries (§3.3 pool step 1; VK3-5) | hard | at the freeze, at every pool size | two counts per level, O(levels), after the rebuild |
| index levels and freshness: a batch wrote no index of a level coarser than its own, except the promotions and demotions it made, and left no static item of what it deleted, re-levelled or changed unfiltered — each is tombstoned in the partition its home entry named and its successor lives in the grid of its current level (§3.3; VK4-5) | hard | batch-local | the commit record's index writes against its level and its `promoted` and `demoted` lists; each deleted, re-levelled or changed item that had a static copy found in the tombstone set of the partition that held it (in a pool worker, the overlay's set for that partition) |
| pool scope: no district overlay wrote outside its district's face set; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| face corners ≥ `minFaceAngle` | soft for mandatory chains (`W_ACUTE_CORNER`), hard for optional chains | batch-local | touched corners |
| Euler characteristic per level (V − E + F = 1 + components) | hard | CI (B-FUZZ, B-EDIT) | whole arena |

These rows are the kernel's part of the §5.3 suite. Batch-local checks read only the commit record's faces, its moved,
promoted and demoted vertices, its changed and demoted edges and their one-ring, so a batch costs O(touched), never
O(model) (SCL-1); whole-arena checks run at stage end, at save or in CI; the freeze check runs once per freeze and the
pool check once per merge in O(overlay size). Class floors (minimum width, area and angle per face class) are the
stages' invariants and are always stated in width and area, never in `minEdge` (GEO-35).

## Part 3 — Cross-area requests

Each request names the owning area, the section, the item it serves and the change. Text in quotation marks is ready to
paste; the owner may reword it without changing the mechanism. Every quoted "before" text was checked by script to occur
exactly once in the current `docs/ARCHITECTURE.md` (10 723 lines).

### To DETERMINISM (§2.8–§2.9, §5–§7)

| # | section | serves | request |
|---|---|---|---|
| X-D1 | §7.3 (b) 4 | VK4-1 | "and a deck left over land loses its L0 level with its shores (§2.2 rule 3's demotion; VK3-3), so the L0 view stays land and water only until (9) makes the deck an ordinary segment." → "and a deck left over land keeps no L0 edge: where its `deck_end` rows are L1 (a deck a carve or an earlier water edit prepared) its bank vertices take L1 at once, and where they are L0 (placed by S1, S3, S4's or an edit's added deck, or an edit's new site) they keep L0, with no L0 edge at them, until (9) removes the deck's rows (§2.2 rule 3's demotion; VK3-3, VK4-1), so the L0 view stays land and water only throughout." |
| X-D2 | §7.3 (b) 9 | VK4-1 | "a deck left over land becomes an ordinary segment of its way and its `Bridge` a tombstone, its `deck_end` vertices demoted to the way's level (§2.2 rule 3; VK3-3);" → "a deck left over land becomes an ordinary segment of its way — `removeEdges` on `ChainRef('deck', bridge)` and on its two `VertexRef('deck_end', bridge, i)`, after which demotion takes its bank vertices to the way's level and clears their kernel pins (§2.2 rule 3; VK3-3, VK4-1) — and its `Bridge` a tombstone;" |
| X-D3 | §5.3, the kernel row of the invariant table | VK4-2, VK4-5 | "the Steiner bound; role consistency, with no structural role lost" → "the placement bound; level consistency; index freshness (every item a batch deletes, re-levels or changes tombstoned where its static copy lies); role consistency, with no structural role lost" (the names of §3.10's rows). |
| X-D4 | §2.9, *Content-addressed chunks* | VK4-6 (c) | (a) "A chunk's bytes therefore depend only on its own partition's content: an edit that renumbers one partition's vertices rewrites that chunk alone, and the level-≤ 1 chunk only when the edit changes a level-≤ 1 route, promotes a vertex into one, or demotes a vertex or an edge out of one." → "A chunk's bytes therefore depend only on its own partition's content and on the endpoints of the level-≤ 1 route edges its Steiner splits lie on: an edit that renumbers one partition's vertices rewrites that chunk alone; the level-≤ 1 chunk only when the edit changes a level-≤ 1 route, promotes a vertex into one, or demotes a vertex or an edge out of one; and a change of a level-≤ 1 route edge also every partition chunk holding a Steiner split on that edge (§3.9; VK4-6 (c)), which the rebased-size test below counts." (b) "and after edits only the chunks of the partitions those edits touched are stored twice." → "and after edits only the chunks of the partitions those edits touched — with those holding a Steiner split on a level-≤ 1 route edge they changed — are stored twice." |

*No edit needed (checked):* §7.4 *Application* already restores "the former levels and flags of the vertices and edges
it demoted or unflagged (… `unflagged`)", which now covers the cleared kernel pins and the unmoved vertices a warp step
unflags (VK4-1, VK4-3); §6.2's per-level digests already read current levels, so VK4-5's index change is digest-neutral.

### To PIPELINE (§2.5–§2.7, §4, PART II)

| # | section | serves | request |
|---|---|---|---|
| X-P1 | §4.4, *Trace*, the water-gate sentence | VK4-4 | "so every water gate — generated or edited — names its bank vertices the same way (VK3-2);" → "so every water gate — generated or edited — names its bank vertices the same way (VK3-2), and both kinds are held under a warp unless `fromLevel = 0`, as a deck's are — a generated gate's bank vertices being the trace's L1 vertices on the shores, an edited gate's L0 after the water's promotion (§2.2 rule 7, §3.6; VK4-4);" |
| X-P2 | §2.7 `Gate.banks` comment | VK4-4 | "the wall's edge between them lies across the water (§2.2 rule 7; VK3-2) */" → "the wall's edge between them lies across the water (§2.2 rule 7; VK3-2); held under a warp unless fromLevel = 0, as a Bridge's deck ends are (§3.6; VK4-4) */" |
| X-P3 | II.1 (3), the neighbour step's reversal | VK4-3 | "and a plot-line end or footprint corner the step promoted returns to its level by demotion — it kept its `split` flag — so the kerb's L2 route, index and digest, and every ring the step touched, are those before the step (§2.2 rule 3; VK3-3)." → "and a plot-line end or footprint corner the step promoted returns to its level by demotion — it kept its `split` flag, which only a warp that has since moved it or the kerb vertices beside it clears, making the bend part of the kerb's true shape (§3.6; VK4-3) — so the kerb's L2 route, index and digest, and every ring the step touched, are those before the step, with any later change to the kerb kept (§2.2 rule 3; VK3-3, VK4-3)." |

### To SCOPE (§13, the judgment-calls table)

| # | section | serves | request |
|---|---|---|---|
| X-S1 | §13.1 constructive degeneracies, the "attraction, move and kept-content cases" bullet; *Properties* | VK4-1, VK4-3, VK4-4, VK4-5, VK4-6 | (a) "and a deck left over land at L1 until F-REDERIVE;" → "and a deck left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows, with no L0 edge at it), its bank vertices unpinned;". (b) After "and every index query whose box meets that vertex returns it." add: "And (kernel round 5): two neighbour steps on one kerb edge, the first street removed by a reroll — its plot-line end back at L3 and the kerb's L2 route equal to the route with only the second step (`fixall_kernel_r5_checks.out` A); a warp that moves a spine's vertices around an unmoved same-level T-junction, then its lane removed — the junction stays a shape vertex of the warped spine; a warp with `fromLevel = 1` over a generated and over an edited water gate — neither gate's bank vertices move; after a neighbour step and its removal by a reroll with no partition rebuilt in between, level-2 and level-3 queries over the kerb return exactly what they return after a rebuild, and a slot freed in one district and reused in another, the second district's partition rebuilt before the first's, is returned as its new item and never as its old one; a declared preparation batch placing two contact names on one entity, its ops permuted — identical ordinals; new water across a corner of the frame — the border's stretch between its two contact points, the corner included, unchanged and closed." (c) *Properties*: after "0 stale references after every batch;" add "every index query's answer identical before and after a rebuild of the partitions it reads (§3.3; VK4-5);". |
| X-S2 | Judgment calls table and its preface | VK4-2 – VK4-6 | Amend: **J-K18** "because holding makes every shore-side warp a no-op and freeing breaks the Steiner invariant;" → "because holding makes every shore-side warp a no-op and freeing takes the vertex off the shore and out of the placement bound (VK4-2);". **J-K26** "because the flag then means exactly 'dissolving me restores my edge' (VK2-5) (§2.2, §3.6). \|" → "because the flag then means exactly 'dissolving me restores my edge'; a step that moves the vertex beside it on its run while it stays clears it too, for a vertex of that run's own level (VK2-5, VK4-3) (§2.2, §3.6). \|". **J-K28** "returns to that geometry's level when it lies within the hot pixel — over leaving birth levels" → "returns to that geometry's level while its `split` flag stands — the flag the whole guard, because round 4's distance test refused 0.54–0.66 % of restorations after later same-level vertices on the run (VK4-3) — over leaving birth levels". **J-K29** "and a contact name nobody references would keep vertices alive and collide with an open trace's ends (VK3-2) (§2.2, §3.3). \|" → "and a contact name nobody references would keep vertices alive and collide with an open trace's ends; the kernel allocates the ordinal as the op applies, because only it knows a declared batch's canonical order (VK3-2, VK4-6 (b)) (§2.2, §3.3, §3.4). \|". **J-K32** "(up to 1.25 cm, measured)" → "(up to ≈ 1.25 cm after one change and ≈ 1.5 cm after several, measured)". Add after J-K33: **J-K34** "\| J-K34 \| Chose to tombstone every item a batch deletes, re-levels or changes — item keys in one set per static partition, found through a per-slot home column — and to insert its successor in the grid, over moving or rewriting items in place, because a packed partition cannot change an item, so a stale copy would answer until its partition happened to be rebuilt and answers would depend on rebuild timing; one set per partition, because one per level would let a rebuild of one partition be hidden by another's tombstone (VK-15's cross-district slot reuse) (VK4-5) (§2.2, §3.3). \|" **J-K35** "\| J-K35 \| Chose to hold a water gate's `gate_end` vertices under a warp unless `fromLevel = 0`, as a deck's are, whatever their level, over an extra L0 batch that would give generated gates L0 bank vertices, because the hold alone makes both kinds behave alike and the batch would add an L0 writer to S5a for no visible output (VK4-4) (§2.2, §3.6). \|" Preface: after "Round 4 added J-K28 – J-K33, …" add "Round 5 added J-K34 – J-K35 and restated J-K18, J-K26, J-K28, J-K29 and J-K32." |

### To RENDERING (§12)

| # | section | serves | request |
|---|---|---|---|
| X-R1 | §12.8, the paragraph under the table | VK4-5 | "one kernel arena per layer (≈ 20 MB at CITY with its typed lookup tables and its spatial index, §2.2; PLAUSIBLE until M1)" → "one kernel arena per layer (≈ 20 MB at CITY with its typed lookup tables, its spatial index and the index's home column, §2.2; PLAUSIBLE until M1)". No figure changes: the home column is ≈ 0.5 MB in the live arena, ≈ 0.2 MB in a one-click copy and ≈ 0.5 MB in a copy after edits, inside the stated roundings (§2.2 *Size*); §12.4's copy times move by < 0.1 ms. |


## Part 4 — CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED** (executed or checked against the text): the defects behind all six items, re-read at the cited lines of
the current file; that generated `deck_end` rows come from L0 batches (S1, S3, S4's added deck) and a carve's, an outer
moat's and a water edit's from L1 preparation batches (§4.1 l. 3139–3141, §4.4 l. 3690–3697, §4.11 l. 4567–4587, §7.3
(b) 3–4); that a generated water gate's `gate_end` vertices are placed by the L1 trace batch after the shores exist
(§4.1 l. 3142, §4.4 l. 3674–3679); that no text clears a kernel pin (grep: `pinVertices` is the only writer of the flag);
by execution (`fixall_kernel_r5_checks.out`): round 4's restoration test refuses 0.54–0.66 % of restorations after one
to four later same-level vertices on the route, the flag-only guard restores 100 000 of 100 000 for each k with the
restored vertex inside its joined item's run box, and the standing drift after several same-level changes reaches
1.49 cm; that every replaced passage occurs once and every other sentence is carried over verbatim (word-level diff);
that every "before" text of Part 3 occurs exactly once in the current file. **PLAUSIBLE** (reasoned, not executed): that
the extended flag rule (b′) covers every way a warp can bend a run under an unmoved vertex (the simulation models
same-level route changes, not warps); that tombstoning every deleted, re-levelled or changed item, with one set per
partition and the home column, makes every query answer independent of rebuild timing (argued item kind by item kind
in §3.3, first exercised by X-S1's fixtures at M0); the home column's ≈ 0.5 MB (our slot count at a finished CITY);
and that clearing a pin with a vertex's last vertex role row is right for every pin a stage sets (every pin the text
names guards a role-carrying vertex).

**Re-check first:**
1. **VK4-3's rule (b′)** — whether restricting it to vertices of their run's own level (a correction of the verifier's
   wording, Part 0 item 2) is right, and whether a crossing vertex, which splits two runs, is handled by checking each.
2. **VK4-5's home column and per-partition tombstone sets** — the one storage addition of this round (2 B per slot);
   whether "an item never changes in place" is complete for faces a warp moves without a re-walk, and whether the pool
   overlay's own tombstone sets (§3.3 step 2) are needed or only defensive.
3. **The pin-clearing rule found on VK4-1's path** (Part 0 item 3) — whether any stage pins a vertex for a reason other
   than its vertex role, which the rule would then unpin too early.

## Fable review (2026-09-27) — A-fixall/draft-kernel-r5

Reviewer: Fable 5.1, lane fable-review/main/kernel (docs/fable-review/main/kernel.md). **Verdict: CORRECTED.** The six
mechanisms stand (J-K34, J-K35; the two corrections of the verifier's text were right; the pin-clearing rule found on
VK4-1's path was right) and `fixall_kernel_r5_checks.py` re-runs byte-identical. Three refinements the round-5 verifier
filed were applied by the consistency pass and are in the current text: VK5-1 (an item whose partition changes is
tombstoned), VK5-2 (knot rows excluded from the pin-release trigger; `insertChain`'s `pinned` option defined) and VK5-3
(the "checked 100 000 of 100 000" figure restated as by construction; the script's column dropped). Rule (b′) reads per
run, so a crossing vertex is covered on each run it split; the pool overlay's own tombstone sets are load-bearing on the
epoch path, not only defensive.
