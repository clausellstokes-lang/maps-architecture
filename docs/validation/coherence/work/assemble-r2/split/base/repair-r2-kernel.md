=== REPLACE ### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end ===
### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end

```ts
interface KernelTx { key: ArenaKey /* a PlatKey, or a transient arena's TransientKey (§3.4) */;
  level: Level /* a warp batch's level is its fromLevel, which this field governs (§3.6) */;
  ops: KernelOp[] /* declared form only: independent ops, applied in canonical order (below) */;
  expect: Invariant[] /* §5.3's batch-scope invariants beside §3.10's rows: the issuing stage's StageDecl.invariants of scope 'batch' and class 'hard' (§4.12, §5.3; a soft row goes to the report, never into `expect`), the class floors of the faces it makes among them (§4.7's class-floor row); an edit's batch carries those of the stage its rederivesFrom names */;
  onFail: 'reject'|'repair'|'downgrade' /* the §5.1 tier a failed expect entry enters (below) */; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives (kept content, below): = stage in generation; the start of an edit's re-derivation (§7.3); the first stage of §4.1's order for a warp or smoothing batch (§3.6) */;
  clearRegion?: Ring[] /* a coarse batch inserted into finished fabric, and its preparation batches (clear regions, below) */;
  prepared?: VertexRef[] /* with clearRegion: the vertices earlier batches of the same edit or stage placed for this batch's contacts with finer geometry (rule 2) — the only finer vertices it may meet (§3.6 candidate (c)) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId }
  | { kind: 'entity'; id: Id /* a transient arena's batches: the entity whose derivation opened it */ };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: ArenaKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number; work: number /* the batch's size and operation count (below) */;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are §3.10's moved edges */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3) — contacts, prepared vertices, stretch ends */;
  demoted: { vertices: VertexId[]; edges: HalfEdgeId[] /* one half-edge per pair */ } /* birth levels this batch raised (§2.2 rule 3) */;
  unflagged: VertexId[] /* vertices whose split flag or kernel pin this batch cleared other than by moving them — a prepared contact's or a stretch end's promotion, a broken run, a pin released by §2.2 rule 3 (b), an unmoved vertex beside which a move displaced its run (§3.6) */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[] }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; every insertion is part of a batch. The kernel applies the ops to a scratch overlay, serves every query inside
the batch from the level's dynamic grid plus the static partitions, validates the batch-local invariants of §3.10 and
the `expect` entries on the touched faces and their one-ring, and commits or rejects atomically: a rejected batch leaves
the arena at its version (§2.2 rule 8), and a batch with no op commits nothing and keeps the version. Local repair (§5)
runs inside the transaction on the overlay; for a batch an edit's dry run has already validated, see §5.3. A transient
arena's batches (§3.4) use this protocol with `level` 0 (its one level); `batch` `{ kind: 'entity' }`; `stage` and
`rederivesFrom` both the stage under which the opening rung draws its streams (§6.1), so no face on it is kept content;
either op form and the caller's `workLimit`; and no `clearRegion` or `prepared`.

**Expectations.** A failed class floor of `expect` returns `E_BELOW_MIN_WIDTH`, `E_BELOW_MIN_AREA` or
`E_BELOW_MIN_ANGLE`, any other failed entry `E_INVARIANT`. `onFail`, set by the issuing stage from its ladder
(`StageDecl.ladder`, §4.12), names §5.1's tier: `reject` (tier 1) commits nothing and returns the code to the stage's
failure class (§5.2); `repair` (tier 2) first runs the kernel's local repair on the overlay — `absorbSliver` on each
face below its class floor (§3.6) — checks again and rejects as `reject` does if a failure remains; `downgrade`
(tier 4) commits nothing and returns the code for the stage's ladder to take its simpler-primitive rung. An edit's
batches use `reject`; their dry run reports the code (§7.1).

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  Steiner vertices, promotions and demotions of §2.2 rule 3; it may clear finer content inside its faces (`clearFiner`,
  subject to kept content), and a `warp` batch moves vertices of every level ≥ its own (§3.6); anything else is
  `E_LEVEL`. A lane a finer stage would add to a coarser level is a separate, coarser transaction (§4.7), never a side
  effect of a finer one; a stage that writes two levels (S3: carvings at L0, reservations at L1) issues one transaction
  per level, in the order of §4.1's batch table.
* **Kept content (J-K14).** Every face records the rank of the stage whose batch created it (`LevelFaces.stage`, §2.2;
  the stage's position in §4.1's topological order, fixed per generator version). A batch clears finer content inside
  its faces only where that content's rank is at least `rederivesFrom`'s; finer faces an earlier stage made are
  **kept** — neither cleared nor re-owned — and their edges and vertices are obstacles: an op that would cross a kept
  edge, split a kept face or bring new geometry within `attractCm` of it returns `E_KEPT`, except where §3.6's
  candidate (b) attracts onto and promotes a finer vertex on a route the chain ends on or joins. `E_KEPT` governs
  insertion and clearing only (moves: §3.6). The re-walk re-parents each kept face into the new face that contains it —
  a kept face never straddles a new edge, because crossing it is refused — so nesting holds. In generation `E_KEPT`
  cannot arise on a correct pipeline, because the stage order builds no finer face before a coarser stage that could
  meet it (the wall's band parts: §4.7 S10 (0), §4.8; the hinterland's L3 content: §4.9); the rule turns a wrong stage
  domain into a typed failure the stage property tests catch (§13.2). In an edit it returns to the dry run as a
  conflict (§7.1). How a re-derivation rebuilds the wall and margin bands in its scope, never writing the other side:
  §7.3 item 2. **The clear rule:** `clearFiner` never removes kept content and never reports it; locked or pinned
  content (§7.2) is the only conflict — returned, never removed.
* **A batch's faces are the faces it names or creates.** A same-level split of an edge those faces share with faces
  outside the batch — the neighbour step's kerb split beside finished plots and footprints (II.1 (3)) — adds that vertex
  to the outside faces' rings; they are not kept content, neither cleared nor re-owned, and each ring equals its prior
  ring with the vertex removed (the seam exception, §4.6 step 7, §7.3 item 1).
* **Clear regions and prepared contacts (LC-7; J-I10, J-I12, J-I13, J-K24).** Under the plain rule a coarse batch
  inserted into finished fabric — §4.11's carve of a canal, moat or basin, §4.4's outer moat, S1's water operator
  re-carving a reach (§7.3 (b)), an epoch's frame growth (§3.2 (9)) — would clear every finer face of its level-n
  faces, and an L0 face is a whole land component, so one canal would clear the town. Such an insertion runs instead as
  a declared sequence of single-level batches that share one **clear region** (`KernelTx.clearRegion`): the edit's
  **footprint**, which the operator computes in its dry run (§4.11 for the carve and the outer moat; §7.3 (b) 2–4 for
  the re-carved reach; for the frame growth, §3.2 (9)'s whole L1 faces instead) — its new chains buffered (`buffer`,
  §3.7) by `attractCm` plus the chain class's clearance (for a channel, its bank setback), **united with every L1 cell
  the edit's way rule touches**: the cells that buffer meets, the cells bordering a stretch the edit removes or prunes
  or a kept way's replaced stretch, the cells a re-routed way crosses, and — where the edit re-traces a wall run — the
  cells bordering the old run or the strip-line stretches it removes with it and the cells the re-traced run's new
  strips will take. The footprint is exactly the union of those cells, since the buffer lies inside the cells it meets.
  The kernel's part is three rules:
  1. *Clearing.* `clearFiner` in a batch that declares a clear region removes each finer face whose interior meets the
     region — whole, never part of one — with the partition edges and vertices no remaining face uses, and nothing
     else; locked and pinned owners return as conflicts; every finer face that does not meet the region is kept
     content, whatever its stage rank. **Structural finer edges inside the region** — ways, walls, setback and glacis
     lines, deck spans — are kept unless a preceding batch of the same edit removed them: `clearFiner` removes partition
     content only, and the preparation (rule 2) re-lays or cuts every structural edge the coarse chain would otherwise
     meet (§4.11 batch (1), §7.3 (b) 3). The coarse batch itself clears nothing; it only splits the finer faces that
     meet the region (rule 3).
  2. *Preparation.* One or more batches at the finer level, issued first in the same edit or stage, clear the region
     (rule 1) and place **every** point where the coarse chain will meet finer geometry as a vertex named by role (§2.2
     rule 7): on each way the operator keeps across the new water, a deck's two bank vertices carrying
     `('deck_end', bridge, 0 | 1)` under a fresh `Bridge`, the way's stretch between them one straight edge — the deck
     span; on each wall run the operator re-traces across the new water (S1's water operator, §7.3 (b) 3; a carve that
     crosses a wall, §4.11; J-I13), its water gate's two bank vertices carrying `('gate_end', gate, 0 | 1)` under a
     fresh `Gate`, which the `Gate` record built afterwards names (§2.7); on the map's `border` line (§3.2 (9)), which
     must stay closed, its two bank points as `anchor` contact names, the stretch between them — one straight edge, or
     several where the water takes in a corner of the frame or a vertex an earlier edit left on it — left across the
     water unchanged, as a deck span is (the arena's outer ring is L0, so new water meets it at its own level); and on
     every other finer edge the new water will cross that is no way — a settlement-perimeter or other district-boundary
     stretch, a wall strip's setback or glacis line — its two bank points as `anchor` contact names, the stretch between
     them removed. A contact name is placed by `splitThrough` with its row given without an ordinal: the operator names
     the entity (§2.2 rule 7), and the kernel allocates that entity's smallest free `anchor` ordinal — from 2 on an
     enceinte, whose 0 and 1 name an open trace's ends — as the op applies, in the batch's canonical op order (below),
     so no two vertices carry one anchor key (the allocation rule; §13.1's permuted-ops fixture confirms it); the name
     lives until the coarse batch strips it (rule 3). A coarse chain never shares a finer edge, so a finer edge the new
     water would run along is cut back by the preparation like any lesser way; a way cut back beyond its bank setback —
     every lesser way, and a quay or landing, which the operator extends to the new bank only once the water exists, its
     end an ordinary Steiner vertex on the L0 bank (§4.11 batch (3)) — leaves no contact and needs no prepared vertex.
     Every stretch the preparation removes — a cut stretch, a pruned remainder, a kept way's replaced stretch, the
     stretch between two contact names — is removed through a `StretchRef` (§3.4), and a way left in two parts is first
     split by `retypeEdges`' `rekey` on its far part, so role consistency (§3.10) holds after the batch.
  3. *Contact.* The coarse batch splits the finer faces that meet the region (their records re-walked, keeping their
     owners until a later batch of the operator re-owns them), lists the prepared vertices in `KernelTx.prepared` and
     may meet finer edges and vertices only there: §3.6's candidate (c) attracts it onto each prepared vertex and
     promotes it. The finer edges at a prepared vertex stay — kept outside the region, the preparation's own inside it —
     so each kept way's straight L1 edge between its two promoted bank vertices lies across the new water as the
     `Bridge`'s deck span, carrying `deck` beside `way` (§2.2 rule 7), each re-traced run's edge between its two
     `gate_end` vertices is its water gate, and the border's stretch between its two contact points is the closed frame:
     no L0 edge crosses the water, no deck splits the water body's L0 faces, and the way stays one chain through every
     batch — the structure S1, S3 and S4 build at generation (J-I12). Any other contact with finer geometry is `E_LEVEL`
     inside the region and `E_KEPT` outside it, and returns to the dry run (in generation, to the stage's property
     tests). So a carve costs its footprint, not the town (the re-derivation that follows: §4.11 step 4, §7.3 (b) 8).

  The carve fixtures of §13.1–§13.2 confirm these rules (M3a). *Pre-decided fallback* if a fixture cannot be met: the
  batch clears the finer content of its whole L0 land face and re-derives it (the plain rule — correct, slower);
  `moat: 'all'` is then carved only before S5c of the outer stage, where L1 holds only arterials, and an edit carve
  becomes a declared town-wide re-derivation with the fate report (§7.3).
* **Two op forms (GEO-11; J-K15).** A transaction takes exactly one of two forms, fixed by its stage's registration
  (§4.1, §14); a transaction that supplies both `ops` and a callback is a programming error caught by an assertion.
  * **Declared** — `KernelTx.ops` lists independent ops, none reading another's result (S3's carvings, S4's routed
    arterials, S7's strip lines and furniture, S9's `corridorUnion`, S11's per-plot footprints, an edit's inserted
    feature). The kernel applies them sorted by a stable key — op kind rank, then the owning entity's lineage key
    (§6.3), then the op's index within that entity's stream path — so the committed arena is a function of the prior
    arena and the op *set*, not of the order the stage issued them in. Hot-pixel snap rounding is order-independent;
    attraction, the one order-sensitive rule, is deterministic under the canonical order (the op-permutation test:
    §13.1).
  * **Callback** — `tx(tx, fn)` (§14) hands `fn` the open overlay; each op `fn` issues applies at once, in issue order,
    and later ops read its result: S5c's growth queue (each proposal tested against the streets already grown), S8's
    bent-cut recursion (each cut planned on the kerbs of the faces the previous cut made) and S10's plot subdivision
    (claims, per-frontage regions, strips, joins in sequence). The issue order is a function of the stage's inputs, its
    streams (§6.1) and canonically sorted query results (below) — never of slot numbers, worker scheduling or arrival
    order — and attraction within the sequence follows it (the issue-order test: §13.2).
* **No output depends on slot numbers.** Every tie-break in the kernel uses lattice positions (y, then x), canonical
  item keys (below) or entity ids, never a `VertexId`, `HalfEdgeId` or `FaceId`, so an arena compacted on save, one
  grown through a long session and one merged from pool overlays give identical results for the same next edit (the
  slot-renumbering test: §13.1).
* **Work limits instead of clocks (GEO-2).** Every op charges operation counts to its transaction — points snapped,
  attraction queries, placement candidates tried, crossings resolved, faces walked, skeleton events — and a transaction
  that exceeds its declared `workLimit` returns `E_WORK_LIMIT`. Counts are identical on a slow and a fast machine, so a
  budget can select a ladder rung without changing what the seed produces.
* **The commit record** is the input of the batch-local invariants (§3.10), of index maintenance (below), of the display
  list's dirty set (`faces`, `owners`; §8.1) and of the digest update — at commit the kernel re-hashes the leaves the
  batch touched (the per-level plat digests; the entity leaves of `owners` and `roles`) and the nodes on their paths to
  the root (§6.2, whose budget this maintenance keeps). Its `work` and its four counts are the batch's size for §13.2's
  cost-model test that a batch costs O(touched) (§3.10). An edit's undo record (§7.4) keeps, for `promoted`, their
  lattice points, former levels and flags and the anchor contact names promotion stripped; for `demoted`, the former
  levels; for `unflagged`, the flags it restores. The record is never persisted, because it holds arena slots. Commit
  granularity is part of every stage's declaration (§4.1), so the ≈ 48 s cost of per-insertion commits, and its
  per-batch twin, cannot arise.

**The derivation pool's overlays (J-K16).** The per-district stages that run in the pool (S10, S10b, S11, S12b; §4.1)
use these transactions on **district overlays**, in five steps:

1. *The frozen base (J-K25).* When the eager S10a and S10's **shared-edge step (0)** have committed — step (0) runs on
   the generation worker and builds, on both sides at once, the bands around every L1 edge that two overlays' face sets
   share without corridors (step 3; §4.7) — step (0) ends as an eager stage does, by rebuilding the static L3 partitions
   its batches touched (a finer batch writes no coarser index, so L3 is the only level it touches) — every L3 item it
   made, at CITY in ≈ 26 partitions (the items and their cost: §12.4's S10 (0) row), ≈ 5.8 ms at METROPOLIS by the
   measured build rate (`docs/validation/bench/fixall_kernel_r3_bench.out` A). **At the freeze the generation worker
   first rebuilds every static partition whose dynamic grid or
   tombstone set is not empty** — none on the one-click path, where every stage has just ended with its rebuild; after
   edits (an epoch's per-district stages, a Re-derive from a stage at or before S10, a verification replay folding
   either), the partitions the edits left dirty, each within rebuild moment (2)'s threshold (below) — **and then asserts
   every level's dynamic grid and every partition's tombstone set empty** (§3.10). The rebuild is the stage-end
   rebuild's code on the partition's live items, so it changes no output, and it runs at every pool size, 0 included
   (step 5). Measured with the same build (`docs/validation/bench/fixall_kernel_r4_bench.out` B): ≈ 2 ms for one
   district's L3 and L4 partitions, ≈ 10 ms for five districts', ≈ 6 ms for the arena-wide L1 partition with one L2
   partition, ≈ 59 ms for every partition of a finished CITY.
   The generation worker then freezes the arena at that version and sends each pool worker one read-only copy as
   transferred `ArrayBuffer`s — the vertex, half-edge, role and face arrays, the role-head and owner-head tables (typed
   arrays, §2.2), the index's home column and **every non-empty level's static index partitions** (L0–L3 at the
   one-click freeze, where L4 is still empty; L0–L4 at a freeze after edits) — so a pooled plot line that must end on
   the inner edge of a wall band, a setback part or a margin band, S12b's greenery in setback and glacis residue, and a
   pooled re-derivation's kept locked or pinned content are found by the same indexed queries as everything else. No
   `SharedArrayBuffer` is used (§11.2). **The copy** is the arena and its tables (§2.2 *Size*) plus the partitions at
   38.4 B per item and the home column at 2 B per slot — at the one-click freeze ≈ 60 000–90 000 items (the L0–L2 view
   and step (0)'s parts; our count, PLAUSIBLE until M1), ≈ 2.2–3.3 MB plus ≈ 0.2 MB of home column, three such copies
   measured at ≈ 4.6 ms (`fixall_kernel_r4_bench.out` A); at a freeze after edits ≈ 0.5 MB of home column. Its size and
   time per copy are §12.4's merge row, and §12.8 counts one copy per pool worker. *Pre-decided fallback* if M1's
   memory measurement — or M4's, on the epoch path — exceeds the rung's line with these copies: a copy made after edits
   carries only what a pooled stage may read under the laziness contract (§4.1) — the L0–L2 partitions, every L3
   partition (step (0)'s parts are eager) and the L4 partitions of the districts the pool derives (their kept content);
   another district's footprints are lazy output no pooled stage reads — and then §12.8's pool-shrinking step applies.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base. New
   vertices, half-edge pairs, face records and role rows — and the interned handles of the entities the district
   creates — go to the overlay's own growable arrays in overlay-local slots numbered above the base's high-water mark
   and are remapped at the merge; a change to a base record (a kerb edge split by a plot line, a face ring re-walked) is
   a copy-on-write record in the overlay; an item of the frozen partitions that the overlay deletes, re-levels or
   changes is tombstoned in a set the overlay keeps for that partition and consults with it (the copy's own sets are
   empty, §3.10), which step 4's district-end rebuild consumes — a pooled stage changes only its district's L3 and L4
   items. Every district starts from the frozen base alone, never from another district's overlay, so its result is a
   pure function of the base, its allocation and its own sub-stream, whichever worker runs it and whatever ran there
   before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. Its **scope** is every face
   of the set, every edge with a face of the set on both sides, every vertex whose incident faces all lie in the set,
   and — for a split only (a vertex placed on the edge) — every edge on the set's boundary whose other side no overlay
   writes (a water face, the arena's outer ring), so waterfront plot lines may end on their own bank. A write of any
   kind — a split, a retype, a role row, a move, an owner change — outside the scope returns `E_SCOPE`. The L1 edges two
   overlays' face sets share are therefore never written in the pool: a shared spine is flanked by corridors whose
   kerbs each side's lines end on (its street trees are `Greenery.along` records in each planting district's own strips,
   never roles on the way: §2.7, §4.9); a shared **wall trace** gets its band, setback, glacis, tower and gatehouse
   parts from step (0) before the freeze (step 1); and every other shared L1 edge without corridors — the settlement
   perimeter between the districts and the hinterland, and any reservation boundary two districts share — gets from the
   same step a **margin band** (§4.5), so the pooled plot and furlong lines on either side end on the band's inner edge,
   inside their own set (J-I9). The **hinterland unit**, which the generation worker runs while the pool works, is one
   more overlay of this kind (§4.1, §4.9). Each overlay also lists the base records it copied; at the merge, two
   overlays that copied the same base record, or a copied base record the live arena changed after the freeze, fail the
   pool with `E_SCOPE` — defence in depth that a test asserts never fires.
4. *The merge.* The generation worker applies the overlays in district lineage order (§6.3): each overlay's new records
   are appended with a slot remap table (overlay-local slot → next free arena slot), its copy-on-write base records
   replace their originals, references inside the overlay are rewritten through the remap table, and only that
   district's faces are re-walked to validate rings and parents. The district's L3 and L4 static index partitions —
   built by the worker at district end from the base partition's live items (step (0)'s parts in that district
   included) and the overlay's new ones — travel with the overlay, have their item tables rewritten through the same
   remap and replace the base's partitions with empty tombstone sets, the home column taking their items' partition
   numbers, so the merged arena needs no index rebuild. The overlay's added and changed role-head and owner-head keys,
   kept in its own small tables and consulted before the base's, are inserted into the live tables through the same
   remap; the district's digest leaves (§6.2) travel with it too, and the root is finalised once after the last
   overlay. The cost is O(overlay size) (§12.4's merge row).
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned — one
partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland,
margin) — each with a tombstone set, and (b) one **dynamic uniform grid** with O(1) insert and delete, its cell per level
the base settings row's `index.gridCellM` (V11 §3.1).

**What each level's index holds.** The items of that level (their current birth level): its vertices; its **route
edges** — each maximal run of that level's sub-edges between two vertices of that level or coarser is one item whatever
finer vertices later split it, its box the bounding box of the vertices standing on the run when its level's batch
writes the item, padded by the 0.71 cm hot pixel, and its handle the half-edge leaving its lower (y, x) endpoint (a
split keeps that pair on the part at that end, so the handle never changes); and its face records. The run's box holds
every finer vertex on it by construction: one placed afterwards lies within the hot pixel of the route edge (§3.6's
placement rule (i)), and one placed before stands in the box however the route has changed since (§3.6; J-K32) — the
endpoints' box, padded alike, missed 38 of 400 753 finer vertices under the placement rule's non-nearest choices and
the run's box none (`docs/validation/bench/fixall_kernel_r4_checks.out` A). A finer batch that splits a coarser edge
with a Steiner vertex therefore writes only its own level's index — S10's step (0) and every pooled stage touch only
the L3 and L4 indexes — while a promotion or a demotion, the coarser batch's own change of a route, moves the vertex or
edge to its new level's index and rewrites the route-edge items of the levels whose routes it changes: a promoted
vertex makes the route edge it now splits two items, a demoted vertex joins its two items into one, and a demoted edge
leaves its old level's item for its new level's (§2.2 rule 3).

**No item changes in place (J-K34).** Every item a batch deletes, re-levels, changes or moves to another partition — a
deleted vertex, edge or face; a promoted or demoted vertex or edge; a route edge whose run a vertex of its level joins
or leaves (a same-level split, a promotion, a dissolution, a demotion) or a move reshapes; a vertex a move displaces; a
face whose ring at its own level a re-walk or a move changes; **an item whose partition changes** — every L2–L4 vertex,
route edge and face under an L1 face that a batch re-owns to another district or to or from the hinterland (S6's
regroup, §7.3), and a vertex on an L1 edge two partitions share when that edge's partitions change — is **tombstoned**
in the static partition its home entry names (`Plat.indexHome`, §2.2), if it has one — the entry then reads −1 — and
its successor, if any, is inserted in the grid of its current level; an item already in a grid is deleted from it or
replaced there. A static item is therefore exact or filtered, and no query sees an item at its old level, place,
extent or partition: a promoted-then-demoted plot-line end answers an L2 query not at all and an L3 query once, and a
regrouped block's plots answer once, whichever partitions were rebuilt in between; a regroup leaves both partitions
dirty, so the next freeze rebuilds both (pool step 1).

**Queries.** Inside a stage every insertion and deletion goes to the grid. A level-n query reads the static partitions
of levels ≤ n its box intersects and their grids, drops each static hit whose item key its partition has tombstoned,
expands each route-edge hit into the pieces of its level-n route that meet the box, and returns the vertices of level
≤ n, each level-n route edge once (as its sub-edge leaving its lower endpoint) and the level-n faces, **sorted by the
canonical key of each item kind, read on the query's level-n route**: a vertex by its lattice position (y, then x); an
edge by the positions of the two endpoints of its level-n route edge, the lower (y, x) first, never by a sub-edge's
endpoints; a face by the positions of the first two vertices of level ≤ n on its outer ring — the lowest-leftmost
vertex of level ≤ n and the next vertex of level ≤ n counter-clockwise, finer vertices skipped, and where the ring
visits that vertex twice the smaller of its two successors; in a mixed result vertices come before edges and edges
before faces. The key is total — no two vertices share a lattice point, no two level-n route edges share both
endpoints, and a face's key is one directed level-n route edge, which bounds exactly one level-n face — so neither
which structure holds an item nor whether a finer level has been derived changes any answer (a key read on the full
ring reverses two L3 plots once S11 derives L4 in their block, `docs/validation/bench/fixall_kernel_r3_checks.out` C),
and no implementation ever needs a slot to break a tie. A query whose box meets nothing returns an empty list.

**Tombstones and rebuilds.** A **tombstone** is an item key — kind · 2³² + slot, the kind a vertex, a route edge or a
face — held in one set per static partition: the items deleted, moved to another level or partition, or changed since
that partition's build. Tombstones filter **that partition's hits only**: a new item — the next occupant of a slot
freed and reused inside the stage, or an item's successor — lives in the dynamic grid, which tombstones never filter,
so neither slot reuse nor a level change can hide it, and the stale static copy never answers (J-K34). A partition's
rebuild indexes the live items that belong to it — every item of its level in its arena at L0–L1; at L2–L4 the items
of its district, a vertex on an L1 edge two partitions share going to the partition with the smaller key (as §3.9's
chunks do) — sets their home entries, removes them from the grid and empties its tombstone set. The **home column**
(2 B per vertex, edge-pair and face slot; ≈ 0.5 MB at a finished CITY) lets a batch tombstone an item without searching
the partitions. **Static partitions are rebuilt at three moments, never per batch:** (1) when a stage ends — an eager
stage once, after its last batch; S10's eager step (0) once, before the pool's freeze; a lazy or pooled per-district
stage, the district's own partitions after that district's run; (2) during an editing session, when a partition's grid
overflow exceeds **max(256, ¼ of its static size)** items — a count, never an idle timer; (3) at every pool freeze,
for the partitions edits left dirty (pool step 1). Measured flatbush construction
(`docs/validation/bench/bench_index.out`): 0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 ms at 17 000 — at CITY about
one L3 and one L4 rebuild per stage (≈ 7 ms together), or ≈ 0.2–0.3 ms per district partition, where a rebuild per
block or per plot commit would cost 1.9 s (S10) and 13.4 s (S11). A single plot edit rebuilds at most its district's
L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5 ms), inside §12.6's plot-edit budget; rebuild work never grows with the
number of commits (§13.2's cost-model test).
=== END ===

=== REPLACE ### 3.4 Kernel operations the pipeline needs (complete list) ===
### 3.4 Kernel operations the pipeline needs (complete list)

```ts
// @plat/kernel — the only writers of any arena. `tx` is the open KernelTx (declared or callback form, §3.3); every op charges its work count.
// Writers (level = tx.level; semantics §3.6)
insertChain(tx, points: Point[], roles: RoleRow[], cls: 'mandatory'|'optional', opts?: { closed?: boolean;
  pinned?: number[] /* chain indices exempt from decimation (§3.6 step 1); not the kernel pinned flag, which only pinVertices sets */;
  knots?: { index: number; role: RoleName; ordinal: number; entity?: Id /* default: the chain's own entity (a knot); another for a vertex role such as a bridge's deck_end or a gate's gate_end */ }[] /* every vertex role row the chain's own vertices take */ }): KernelResult<ChainInsert>
interface ChainInsert { placed: VertexId[] /* per input point, in input order: the vertex it became after snapping, attraction and sharing (§3.6); valid until the next commit — S11's first wing carry reads it (§2.6) */ }
splitThrough(tx, at: HalfEdgeId, p: Point, row?: RoleRow /* a vertex role row the vertex takes — a cut end's anchor contact name, a profile writer's knot; an `anchor` row without an ordinal gets one from the kernel (§3.3 rule 2); any other indexed row carries its ordinal, an assertion otherwise */): KernelResult<VertexId>
  // the vertex at p on the edge, placed by §3.6's placement rule (a Steiner vertex when the edge is coarser, §2.2 rule 3) — or, where p's foot lies within attractCm of an endpoint of the edge, that endpoint (§3.6 step 2), which then takes `row`
removeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef): KernelResult<void>
  // strips (role, entity) from the ref's edges — a StretchRef's only, after cut knots at its ends (below) — or, for a VertexRef, that vertex role row; deletes edges left with no role;
  // then re-levels and dissolves by §2.2 rule 3, so removing a lane that ended on a spine restores the spine exactly and removing the street a neighbour step served returns the plot-line end it promoted to its level
clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Conflict[]>     // removes content finer than `level` inside the faces under §3.3's clear rule (and, with tx.clearRegion, its rule 1); re-levels and dissolves as removeEdges does; returns the locked or pinned owners, removing none
retypeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef, add: RoleRow[], remove: RoleName[],
            rekey?: { from: Id; to: Id; profiles?: { from?: ChainProfile; to?: ChainProfile }[] /* both entities' profiles, paired by knot role */ })
  : KernelResult<{ profiles: { knotRole: RoleName; from?: ChainProfile | number | string; to: ChainProfile | number | string }[] }>
  // the EVO conversion primitive (wall → way) on role sets; an added row coarser than an edge of the ref is E_LEVEL, and `remove` re-levels as removeEdges does.
  // `rekey` moves the ref's (role, from) rows, knot rows and vertex roles to `to` (a StretchRef's, its ends being the cut vertices), renumbering each entity's knots from 0 in chain order;
  // where the moved edges meet edges that keep `from` it first cuts each profile (cut knots), and where they meet edges already carrying `to` it joins them (§2.2 rule 5);
  // it returns both entities' new profiles — a scalar where a part has no knots left — which the caller writes into both records in the same edit
setOwner(tx, faces: FaceId[], owner: Id): KernelResult<void>
splitFace(tx, face: FaceId, cut: Point[] /* a bent cut is 2–3 vertices */): KernelResult<[FaceId, FaceId]>   // children ordered: left of the directed cut first (§3.6)
connectHole(tx, face: FaceId, cut: Point[]): KernelResult<FaceId>          // outer ring → hole slit: same face count, one hole fewer (§3.6)
mergeFaces(tx, a: FaceId, b: FaceId): KernelResult<FaceId>                 // deletes shared partition edges only; a structural shared edge → E_STRUCTURAL
absorbSliver(tx, face: FaceId, floor: { minWidthCm: Cm; minAreaCm2: number }): KernelResult<FaceId>   // §3.6's sliver rule
claimSubFace(tx, claim: { ring: Point[] } | { areaCm2: number; within: FaceRef | FaceId[] /* as corridorUnion takes: S7b passes a district's coarse faces less its wall_strip faces, §4.5 */; score: RasterRef }, owner: Id): KernelResult<FaceRef>   // may span several faces (a reservation across coarse faces, a precinct, a bailey)
radialSplit(tx, face: FaceId, apex: Point, raysCdeg: number[]): KernelResult<FaceId[]>   // a fan from a centroid or a vertex (groves, chapter houses)
ringBand(tx, face: FaceId, widthCm: Cm): KernelResult<{ band: FaceId[]; core: FaceId }>  // an inner band around a court (cloister, quadrangle)
corridorUnion(tx, l1Faces: FaceRef | FaceId[]): KernelResult<BandResult>   // the corridor use of bandUnion: L2 half-corridor strips, junction wedges and built blocks for those L1 faces only (§3.7); a kept face inside them stays kept content nested in the L2 face that contains it (§3.3)
bandUnion(tx, chains: { ref: ChainRef; halfWidthCm: Cm | ChainProfile; ends: 'round'|'square' }[], faces: FaceId[], edgeRole: 'kerb'|'band', owner: Id): KernelResult<BandResult>   // the axis chain splits the band per side; corners get corridor_split; a profile is sampled per segment end (§3.7)
warp(tx, field: DisplacementField, fromLevel: Level /* = tx.level (§3.3) */, region: Point[], recordCheck?: (step: MoveReport) => boolean /* the edit layer's check of the records standing on the moved ground (§7.4, §2.6); false fails the step's validation */): KernelResult<MoveReport>   // the edit layer's field from a WarpStroke or a moveVertex (§7.1), the smoother's from a smoothing pass; semantics §3.6
pinVertices(tx, refs: VertexRef[]): KernelResult<void>                    // sets the kernel `pinned` flag, its only writer: smoothing, simplification and cutting keep the vertex, a user's warp moves it unless held (§3.6); released only as §2.2 rule 3 (b) states
// Services (read-only; values, never arena slots that outlive a commit)
resolve(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef, key: PlatKey): Resolved   // current slots stamped with the arena's key and version, valid until its next commit (a debug build asserts both, below); a ref that finds no geometry resolves empty
resolveVertexAt(key: PlatKey, at: LatticePoint, sig: VertexSig, carry: CarryMap /* §6.3's supersedes table: old address → successor */): { vertex: VertexId } | { orphaned: true; nearest?: LatticePoint }   // a log position → a vertex, never by distance alone (§2.2 rule 5)
signature(key: PlatKey, v: VertexRef | LatticePoint): VertexSig             // what an edit stores beside a position
sampleProfile(p: ChainProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex'): number[] | string[]   // a knot profile sampled by arc length along the owner's own-level route, interpolated as §2.2 rule 5 states (a ring cyclically; a step profile's categorical values as strings); a chain that resolves to no edge gives []
kerb(face: FaceId /* L1, committed or in the open overlay */): KernelResult<Ring[]>   // §3.7's kerb: what corridorUnion commits
booleans(op: 'union'|'intersection'|'difference'|'xor', a: Ring[], b: Ring[], fill: 'nonzero'|'evenodd'): KernelResult<Ring[]>   // §3.7
tileRings(rings: Ring[] /* world lattice rings, counter-clockwise, in the caller's clip order (§2.6) */): KernelResult<Ring[][]>   // the seed clip (below): per input ring its pieces, counter-clockwise, none where the rings before it cover it; no rings → []
buffer(chains: Point[][], halfWidthCm: Cm | Cm[] /* per input point of these transient chains */, joins: 'round'|'square'|'miter', ends: 'round'|'square'|'flat'): KernelResult<Ring[]>   // §3.7
offsetFace(face: FaceId, perEdgeCm: Cm[]): KernelResult<Ring[]>             // face − ⋃ buffer(edgeᵢ, dᵢ) (§3.7)
insetRing(face: FaceId, dCm: Cm): KernelResult<Ring[]>                      // uniform, on the half-plane path for a face checked convex (§3.7)
skeleton(rings: Ring[], use: 'roof'|'spine'|'regions'): KernelResult<Skeleton>   // §3.8: validated output (arcs, nodes with offset times, the face of each input edge) or a typed downgrade
simplify(chain: Point[], minSegmentCm: Cm, minAngleCdeg: number, obstacles: Ring[], pinned: number[]): KernelResult<Point[]>   // Visvalingam–Whyatt, topology-preserving: refuses a removal whose new edge would touch or cross another edge of the ring, its face's other rings or an obstacle (checked in the index), or that would move a pinned vertex
hexLattice(region: Ring[], spacingCm: Cm, jitterCm: Cm, rng: Stream): { points: Point[]; adjacency: Int32Array }
  // S4's routing lattice, built at §4.2 S3 (3), adjacency by construction; an empty region gives no points; spacingCm ≥ minEdge and 0 ≤ jitterCm < spacingCm ÷ 2 (so no two points coincide) are asserted — the caller's table cells hold them
obb(ring) · hull(points) · lir(ring, axes)   // the one contract (GEO-7): fewer than 3 distinct points or a collinear hull returns E_DEGENERATE `collinear`, never ok with a zero extent, so no caller divides by a zero minor axis; callers branch on the typed result; hull is obb's and lir's internal step
sideRuns(face, turnTolCdeg): Run[]   // maximal boundary runs within a cumulative turning tolerance, each with its chord direction — a side notion that survives curved, round-joined kerbs, which the bent cut needs (§4.6)
sampleBoundary(face, stepCm) /* §3.8's sampled medial axis; §9.3's spine candidates */ · pointLocate(key: ArenaKey, level, p) · faceNeighbours(key: ArenaKey, face, level) · area2(ring) · area2Big(ring) /* §3.2 (6): a boolean operand's */ · orient(a, b, c)
regularFit(ring: Ring): KernelResult<RegularFit>   // the ring's best-fit regular polygon (below): §4.8's castle repair and §7.1's `equalize` brush read it (item 45)
interface RegularFit { n: number /* the ring's vertex count */; centre: { x: number; y: number } /* the ring's area centroid, cm */; radiusCm: number;
  phaseCdeg: number /* the polar angle, about `centre`, of the fit's corner the ring's lowest-leftmost vertex goes to */;
  targets: { x: number; y: number }[] /* per input vertex, in input order: its place on the fit, cm — values, never arena coordinates; a caller's warp field rounds them at its step (§3.6) */;
  compactness: number /* 4π·A ÷ P² of the ring */ }
```

**The doors.** `insertChain` is the only door for new edges in a plat (a transient arena's opening builds its input rings
as exact topology, below); `removeEdges` and `clearFiner` the only doors for removing them; `insertChain`'s vertex rows
(`opts.knots`) and `splitThrough`'s `row` the only doors for adding a vertex role row — a knot a profile writer puts on
an existing vertex of its chain among them (§2.2 rule 5; items 245 and 575), `splitThrough` landing on that
vertex — with `retypeEdges`' `rekey`, which moves rows between entities; `removeEdges` on a `VertexRef` the door for
stripping one (an S8 portal whose lane is removed, §4.6; a tower `wallToWay` removes, §4.11; a profile writer's dropped
knot); and `warp` the only door for moving existing vertices (a `moveVertex` edit is a `warp` whose field displaces one
vertex, resolved by `resolveVertexAt`; smoothing committed geometry is a `warp` whose field the smoother computes from
the chain's current vertices). Every other writer is built from these, which is why planarity, `minEdge`, clearance and
the kept-content rule are properties of this list rather than of every stage (§3.10). Each op has documented
preconditions, work local to the touched faces, a typed result, a declared operation count and fuzz tests with
constructive degeneracies (§13.1).

`setOwner` and `retypeEdges` are the calls §6.3's succession uses: when a re-derivation hands a carried address to a
successor, the same batch re-owns the successor's faces and roles under that address, so geometry and address always
move together. `buffer`'s per-point half-widths apply only to the transient chains a caller passes in (a stroke being
previewed, a skeleton arc); a stored chain's varying width is always a `ChainProfile`, sampled by `kerb` and
`bandUnion` (§2.2 rule 5). A chain that carries a profile is inserted with its knots (`opts.knots`); a knot that
attraction lands on an existing vertex is carried to that vertex, so the profile keeps its knot. A chain cut into parts
owned by different entities, a ring opened, or two chains joined go through `retypeEdges`' `rekey`, which inserts and
drops cut knots by §2.2 rule 5, renumbers each entity's knots in chain order itself and returns the new profiles.

**The regular fit (item 45; J-A45.31).** `regularFit` is the one computation of a ring's best-fit regular polygon, so
the castle repair (§4.8) and the `equalize` warp brush (§7.1) cannot drift apart. It reads the ring counter-clockwise (a
clockwise ring in reverse) from its lowest-leftmost vertex p₀ through pₙ₋₁; takes as centre c the ring's area
centroid, summed from `area2`'s shoelace terms on bounding-box-relative coordinates in that order and divided through
`ratio()` (§3.2 (6), (8)); forms the first Fourier component a = (1 ÷ n) · Σₖ (pₖ − c) · e^(−2πik/n), each vertex read
as a complex number and the terms summed in ring order; and returns the radius |a|, the phase arg a and, for every
vertex, its target tₖ = c + a · e^(2πik/n) — the regular n-gon about c whose corners lie nearest the ring's own in the
least-squares sense, vertex k going to the fit's k-th corner. The targets do not depend on which vertex is read first
(starting one vertex later turns a by one step of 2π ÷ n and every target stays put), so the fixed start fixes only the
summation order; the area centroid, not the vertices' average, keeps a side cut into many short edges from pulling the
centre. Cosines, sines and the phase come from `dmath` (§6.5 (2)) and lengths from `Math.sqrt`, exact by
specification, so every host returns the same doubles; `compactness` is 4π·A ÷ P², A from `area2` and P the summed side
lengths. A ring of fewer than 3 vertices or of zero area, or whose first component vanishes (radius below 1 cm), returns
`E_DEGENERATE` (detail `fit`). The service is O(n), reads no arena and writes nothing: a caller moves vertices toward
their targets only through `warp` (§3.6) — whose rounding, whole-step validation, halving and held vertices apply — or,
for a ring not yet committed (a castle claim at S3), by building the moved ring and inserting it as any claim; a vertex
the caller pins (§4.8's pinned vertices: an `on_enceinte` claim's weld pair and, once the gate is fixed, the two corners
of the claim's side that holds the town-side gate) gets no displacement, while every target is still computed from the
whole ring. Fixture: §13.1.

**Stretches (J-K31).** Every operator edit on part of a chain names the part by a `StretchRef` (§2.2 rule 5) and hands
it to `removeEdges` or `retypeEdges`, so it passes through the listed doors and their invariant coverage. The op
resolves the ref at the batch's current state: each end must be a vertex of the chain — named by a vertex role or by
its lattice point — and both must lie on one part of it, else `E_DEGENERATE` (detail `stretch`); an end finer than the
chain is first promoted to the chain's level (`W_PROMOTED`, listed in the commit record; its `split` flag cleared),
because it becomes an end of the remaining parts. `removeEdges` then gives each remaining part of a profiled chain a cut
knot at the stretch's end on its side (§2.2 rule 5) before the stretch's rows and its interior knot rows leave, so every
remaining sample is unchanged; `rekey` cuts at the two ends as at any cut vertex. A removal that would leave a linear
entity in more parts than it declares fails role consistency at commit (§3.10), so an operator that cuts a way in two
first hands the far part to a new entity with `rekey` on that part's `StretchRef`. A cut end that is not yet a vertex is
placed first by `splitThrough`, with the vertex role row the operator wants on it (an `anchor` contact name without an
ordinal, §3.3 rule 2). Fixtures: §13.1.

**Arenas, keys and services (J-A12.32).** Every writer acts on the arena its transaction's `key` names, and every
service that reads an arena takes it by key: `pointLocate` and `faceNeighbours` an `ArenaKey` (a `PlatKey`, or a
transient arena's `TransientKey`, below); `resolve`, `resolveVertexAt`, `signature` and `sampleProfile`, which read a
plat's role rows, a `PlatKey` — role references exist only on plats. The arenas share no topology (§2.2 rule 2), so an
op handed a slot of another arena is a programming error: every slot a caller holds comes from a result stamped with its
`ArenaKey` and arena version (`Resolved`, a query result, a commit record, `ChainInsert.placed`), valid until that
arena's next commit (§2.2 rule 5), and a debug build carries each such slot as a handle stamped with both and asserts,
wherever the slot is passed, that its key is the arena the call acts on — the transaction's `key` for an op and for a
service handed a slot alone (`kerb`, `offsetFace`, `insetRing`, `sideRuns`, `sampleBoundary`, which read the open
transaction's arena and are called only inside one), the `key` argument otherwise — and that its version is current. A
cross-arena link is an entity id, never a slot. A stage on one arena reads another through the services alone and never
writes it: the underground stage tests what it lays against the ground by `pointLocate` and `resolve` on the ground's
`PlatKey` — what it tests, and what excludes a sample, are II.7.3's surface constraint (item 12) — and a sky island's
shadow footprint is the same query the other way.

**A layer's several arenas (item 65, J-A65.31; item 110 (b)).** An arena is one planar subdivision: its faces never
overlap, and two of its chains that cross share a vertex (§3.6's insertion; §3.10: no two edges cross), so inside an
arena every crossing is a junction. Geometry that passes over or under other geometry without meeting it therefore never
shares its arena:
* *Underground systems* — a catacomb gallery beneath a sewer main, an undercity's chamber below the tunnels, a quarry's
  workings beneath a catacomb's galleries — are each their own part of the `underground` layer, keyed
  `{ layer: 'underground', part }` (§2.2's `PlatKey`): the sewer network is part 0 (II.7.2); a further system's number is
  allocated once, when the system is first created, and never renumbered or reused — it is part of its entities' keys
  and addresses (§2.1, §6.3); which system takes which number is II.7.6's. Inside one part depth stays per entity
  (J-A12.45), because what shares a part may meet.
* *Raised ways* — a viaduct, an elevated road, an aqueduct (item 110 (b); item 244) — each lies on its own part of the
  `ground` layer, numbered from 1 (part 0 is the ground) by `Document.nextGroundPart` (§2.9), allocated once and never
  renumbered or reused, as the underground's and the sky's parts are (§2.2's `PlatKey`). A raised way crosses the
  part-0 ways beneath it without a junction; inside its part it is an ordinary way, banded by §3.7's kerb and
  `corridorUnion`; its piers are footprints on part 0 (§2.7's `supports`), which part-0 stages read from the record
  through §4.1's `raised` data key.

The kernel adds no operation for either: J-A12.32 holds across parts as between layers. A transaction writes the one
part its `key` names; a stage that derives one system or raised way reads the ground and every other part only through
the services, by key — a catacomb laid under a churchyard reads the ground's faces there, and where a link to another
system can land is a `pointLocate` in that system's part. Every entity's faces, chains and vertices lie in the one part
its `Identity.key` names (§2.8), so a `FaceRef`, `ChainRef` or `VertexRef` resolves in one arena — except the records
that join two parts: an underground link — a place where two systems meet, or a stair or shaft that joins them (II.7.6's
`UndergroundLink`, §2.7) — whose two `link_end` vertices lie one in each part it joins, and a raised way's two feet
(`RaisedWayRecord.feet`, §2.7; item 110 (b)), each a `raised_foot` vertex on part 0 and one on the raised part — as an
`AccessPoint` names a ground point and a kerb vertex (II.7.4). Each end names its part (`{ part; at }`), so `resolve`
reads it with that part's key, and is placed or stripped by a transaction on that part alone — never a vertex two arenas
share. A grouping that spans systems — an undercity neighbourhood and its outskirts, the plots along the sewer tunnels
that lead into it (II.7.5) — is a link between records in different parts, never one entity with geometry in two arenas.
Each part has its own index partitions (§3.3), snapshot block (§3.9) and level digests under §6.2's per-arena `plats`
node, and a derivation opens transactions on its own part alone, so re-deriving one system or raised way leaves the
ground and every other part byte-identical (§3.10's arena-isolation row) but for the join vertices of the records that
end on it: the connection stage (II.7.6) re-derives an underground system's links, and a raised way's re-derivation its
feet, placing, keeping or stripping each far end by one transaction on each part it touches — a link whose element has
no successor is removed, its far `link_end` row stripped by `removeEdges` on its `VertexRef`, which (§2.2 rule 3)
dissolves the vertex and restores the edge it split unless other geometry has met the vertex since.

**Transient arenas (J-A28.31).** The composition rungs — a stage-3 `compose()` and the plan's storeys, one at a time
(§2.6) — partition rings that are no plat faces: rooms cut into the L4 arena would enter its index partitions and the
model digest on every click, so a click would change the model (§4.1, §6.2). They cut on a **transient arena**
instead: a one-level scratch subdivision on the world lattice under §3.2's numbers, §3.6's insertion rules and §3.10's
invariants, opened for one derivation call and gone at its end.

```ts
type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ };
type ArenaKey = PlatKey | TransientKey;   // what KernelTx.key and CommitRecord.key name (§3.3); pointLocate, faceNeighbours and §14's `view` accept it
transientArena(owner: Id, seed: Ring[] /* world lattice rings, counter-clockwise, tiling: interiors pairwise disjoint, two rings meeting only along sides or at vertices — tiled wings share each joint's vertices by §2.6's wing-carrying rule 1, while a vertex one ring has on another's side splits that side (below) */,
               fixed: { ring: Ring; owner: Id }[] /* world lattice rings, counter-clockwise — faces made before any cut and never cut by one, each inside one seed ring (a room never spans a joint between wings), interiors pairwise disjoint, a ring coinciding with its seed ring allowed: the rings §2.6's stage-3 contract fixes and, on a re-cut, those its re-cut rule fixes */,
               workLimit: number): KernelResult<TransientKey>   // E_DEGENERATE `seed` | `fixed` | `overlap` names the offending vertex — for `overlap`, a vertex of the offending ring; the construction moves nothing
readBack(key: TransientKey): { faces: { ring: Ring; holes: Ring[]; owner: Id | null; fixed: boolean }[];
  edges: { a: LatticePoint; b: LatticePoint; left: number; right: number | 'outside' /* face indices in this result */;
           seed?: { ring: number; side: number } /* the seed ring whose side the edge lies on with that ring's interior on its left — for a joint, whichever of its two rings lies on that side — and which side of it (by that side's first vertex index) */; joint: boolean /* on a side two seed rings share */ }[] }
release(key: TransientKey): void
```

Its L0 faces are the seed rings and then the `fixed` rings, each a face of its own, inserted as exact topology the way
§3.9's load inserts stored chunks: a lattice point two rings share is one vertex, a side two rings share is one edge (the
wall at the joint between two wings — an interior wall of the building, never a `party` wall, §2.6), a vertex within
the hot pixel (0.71 cm) of another ring's side splits that side there, and no attraction moves any of them. An input
ring that would break `minEdge`, clearance or simplicity, and an empty seed list, are refused (`E_DEGENERATE`, detail
`seed` or `fixed`) naming the vertex, which F-PLAN's tier 1 takes (§5.2), so a planner places an anchor on a wall or at
least `minEdge` from it. Seed rings that overlap, and a fixed ring that crosses a seed ring's side, lies outside the
seeds' union or overlaps another fixed ring, are refused (detail `overlap`): two input sides that cross are refused
where the construction meets them, and it then labels every face with how many seed rings and how many fixed rings
contain it, by the booleans' winding walk (§3.7), so a face inside two seed rings, a face inside a fixed ring and no
seed ring or inside two fixed rings, and a fixed ring whose inside is more than one face are found exactly, in one walk.
A caller whose wings overlap (§2.6 rule 4 (iii)) passes them clipped to tile by `tileRings`, the **seed clip**: the faces
of one overlay of the storey's rings on the arrangement (§3.7's boolean machinery), each face going to the first ring in
the order passed (§2.6's clip order) that contains it and each ring's faces united. Each ring is thereby minus every
ring before it — a ring the earlier ones cover has no piece, one they cut in two has two — and every ring, an earlier
one included, carries each crossing vertex the overlay placed on its sides, so the joints are shared sides vertex for
vertex, and the overlay moves no vertex where the rings keep §2.6's composition contract (at least `attractCm` apart
except at their joints). A piece left with a hole — earlier rings lying inside a later one without reaching its sides —
is refused (detail `overlap`, naming a vertex of the hole), because a seed is one ring; §2.6's clip order puts a
contained wing after its container, and a composed tower wholly inside a wing before that container only where an
earlier wing the tower overlaps carries its cut to the container's sides, so the refusal marks a caller's bug (F-PLAN,
§5.2). The opening's exact insertion is the one way edges enter a transient arena other than through its face
partitioners, as §3.9's load is for a stored plat (J-A28.34).

The seed rings' and the fixed rings' edges are the arena's **fixed edges**: `mergeFaces` refuses to delete one
(`E_STRUCTURAL`) and `absorbSliver` never deletes one — a sliver bounded only by fixed edges stays a face,
`W_SLIVER_RETYPED` (§3.6) — and no writer moves a vertex there — a wall moves by `mergeFaces` and then `splitFace` at its
new line (the plan's `moveWall`, §7.1), so `warp` is not offered — which is what makes §3.10's seed-tiling row hold by
construction. Its batches are §3.3's. Its writers are the face partitioners `splitFace`, `connectHole`, `radialSplit`,
`ringBand`, `mergeFaces`, `absorbSliver` and `setOwner`; its services are `booleans`, `offsetFace`, `insetRing`, `obb`,
`lir`, `sideRuns`, `skeleton`, `faceNeighbours`, `pointLocate`, `area2`, `readBack` and §14's `view`; `insertChain`,
`splitThrough`, `removeEdges`, `clearFiner`, `retypeEdges`, `claimSubFace`, `corridorUnion`, `bandUnion`, `warp`,
`pinVertices` and `resolve` are not offered on it. It has no static partitions (its dynamic grid serves every query), no
stage ranks, no kept content, no role rows beyond the owners the caller sets, no `PlatKey` and no entity; it is never
persisted (§3.9), digested (§6.2) or frozen (§3.3), and no slot of it outlives `release`. `readBack` returns rings and
edges as values in §3.3's canonical order, so the caller's records — the plan's storeys, rooms, walls and openings
(§2.6) — depend on the input rings and the op sequence alone, whichever worker cut them. A caller may plan its cuts on a
coarser module of its own (the plan rung's wing-local module, a table row, §2.6): the module is the planner's grid,
never a second lattice — every point enters through `snap` and the placement rule, so a cut's ends lie on the fixed
edges within the hot pixel of their input sides (below) and the tiling holds exactly. Opening costs O(seed vertices)
and each op what this list states, on tens of vertices per storey; §12.7's stage-3 rows count it.

**The input sides are the arena's routes (J-A28.34).** A side of a seed or fixed ring as passed is an **input side**,
and no split changes it: it is the route of every fixed edge on it, as a plat's coarser route is the route of the
Steiner vertices a finer batch places on it (§2.2 rule 3), and the arena's grid holds it as one route-edge item, its box
the side's padded by the hot pixel (§3.3). That route is read by placement and by its grid item and is never the unit of
an answer: a query and `readBack` return each of the arena's edges as an item of its own — a grid hit on an input side
expanding into its pieces that meet the query's box (§3.3) — keyed by §3.3's canonical key read on that edge's own
endpoints, every vertex of the arena being of its one level, so no two edges share a key and an edge on more than one
input side needs no choice between them. Every vertex a face partitioner places on a fixed edge — a cut's end, a ray's,
a band's cross edge's — is placed by §3.6's placement rule against the input side that edge lies on, never against a
sub-edge an earlier split left: the rule's test (i) reads that side's line, and on an edge that lies on more than one
input side it reads each — a joint lies on two, a fixed ring's side along a seed side on two, a fixed ring's side along
a joint (a kept room's, or the passage room's — a span ring, both seed and fixed, §2.6) on three, and two fixed rings'
sides back to back across a joint on four. So every vertex on a fixed edge stands within the hot pixel of the line of
each input side it lies on, however many walls end on that side, and a kept ring's vertices meet the construction's
split test when it re-enters (below).

**A re-cut is the same call (item 28 (f); J-A28.33).** The plan derived again for new occupants under §2.6's interior
ladder opens a fresh arena from the same seed rings — the shell that item 31's geometry floor fixed (§4.11) — passes as
`fixed` rings the rings §2.6's re-cut rule fixes, and cuts the rest; after item 18's mutation the seeds are the mutated
shell's rings, and a room is kept only where its seed ring is unchanged (§2.6's re-cut bullet, J-A28.26). A kept ring
re-enters exactly on the lattice points it left with and keeps its polygon: every vertex unmoved and in order, any
vertex a new wall adds lying within the hot pixel of one of its sides (§3.6's placement rule). Its vertices on a seed
ring's side or on another fixed ring's side lie within the hot pixel of that side's line (the routes above), so the
construction splits the side at each of them. It was valid in the arena that read it back, and the only geometry beside
it that can differ is such a side straightened — by at most the hot pixel — where an unkept wall ended on it, so the
exact insertion accepts it unless that straightening brings the side within `minEdge` of one of its vertices, which is
refused as above (J-A28.34). Nothing of an earlier cut is edited, because no arena outlives its call: the model derives
the plan as a chain of least-disruption steps (§2.6's canonical chain, J-A28.26; §7.3), each step its own open, cut and
read-back, counted by §12.7's plan row. The seed rings never change with the occupants, so the interior changes while
the shell cannot — §3.10's seed-tiling row holds on every re-cut as on the first cut. The unit-door rule of §2.6 (its
§5.3 check) reads `readBack`'s edges: a door's edge has the unit's room on one side and a circulation face or `outside`
on the other.
=== END ===

