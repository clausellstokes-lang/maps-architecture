=== REPLACE ### 3.2 Numeric policy ===
### 3.2 Numeric policy

```ts
interface Frame { widthCm: Cm; heightCm: Cm; aspect: number /* width / height, 0.5–2 */; marginShare: 0.3 /* context margin per side */ }
```

1. **Integer world and range.** All persisted geometry is integer cm. Intermediate rational points (crossings, offsets,
   circumcentres, skeleton nodes) are computed in doubles and immediately placed on the lattice — by §3.6's placement
   rule for points on existing edges, by nearest-point rounding otherwise. **The range invariant is `|x|, |y| < 2²³` cm
   (83.9 km)**, enforced by `snap` (7): every coordinate difference is then < 2²⁴, every `orient2d` term < 2⁴⁸ and the
   determinant < 2⁴⁹, so the sign of `orient2d` is exact in ordinary doubles. The largest arena is METROPOLIS at the
   population cap of 120 000 (§12.2: 153.6 km²) at aspect 2 — 17.53 km × 8.76 km plus the 30 % margin on every side, so
   |x| ≤ 0.8 × 17.53 km ≈ 1 402 000 cm ≈ 2^20.4 — which leaves ≈ 6× headroom (≈ 9× at the METROPOLIS target: 11.31 km ×
   5.66 km at aspect 2, |x| ≤ 905 097 cm ≈ 2^19.8). Every exactness argument below rests on the range invariant, never
   on the frame table, so a rescaled frame (§13.7 O14 (e)) cannot break one.
2. **Tolerances are world lengths, never parameter-space** (the OS `DELTA = 1e-6` on line parameters is the
   anti-pattern). The lattice values (§2.2 `LatticeSpec` names the fields): `minEdge = 25 cm`; `attractCm = 26 cm` —
   `minEdge` plus 1 cm of lattice slack, so a vertex split onto an edge lies at least `attractCm` − 0.71 cm = 25.29 cm
   from both of the edge's endpoints (a vertex whose exact foot lies within `attractCm` of an endpoint moves onto that
   endpoint instead, §3.6 step 2); `minFaceAngle = 5°` (500 centidegrees; hard or soft by chain class, §3.10); the range
   2²³ cm of (1). The class floors come from the stage tables: `minPlotWidth = 2.5 m`, `minInteriorAnglePlot = 12°`
   (FTG's sheared quads at p95 22.9° corner deviation stay legal — invariants police validity, not regularity),
   `minCorridor` per class. **Face-size floors are a minimum width and a minimum area, angle floors are angles, and none
   is `minEdge`.** **One minimum-edge rule for every writer (GEO-35):** `insertChain`, booleans, buffers, offsets,
   smoothing and `warp` create or move edges only through §3.6's insertion semantics or move validation, and §3.10
   checks the same `minEdge` on new *and moved* edges. There is no weld tolerance: coincidence is lattice-point
   equality, proximity is attraction (§3.6; J-K2).
3. **No float comparisons for topology.** Equality is index equality; "same place" is a lattice test; collinear and
   cocircular ties are broken deterministically on lattice positions, never on slot ids, and no predicate compares a
   float with `== 0`. Any float that decides a topology operation is quantised to integer cm or to a 16-bit binary
   angle first. A distance comparison against `attractCm` or `minEdge` on a computed point (an exact foot, a crossing)
   uses + − × ÷ √ only, so every IEEE engine gives the same answer; a borderline case may fall either way without
   breaking any bound, because the 1 cm between `attractCm` and `minEdge` exceeds the 0.71 cm of any single rounding.
4. **Cross-platform reproducibility** is §6.5's policy (integer-derived random floats §6.1; the nightly
   cross-platform golden run §13.3). The kernel's part: integer geometry, exact predicates, one geometry engine on every
   host (§3.7) and a deterministic op order in every batch (§3.3).
5. **Angles and directions** are unit vectors in doubles derived from integer endpoints; growth headings are stored as
   centidegrees.
6. **Exact areas and orientation (GEO-32; J-K13).** `area2(ring)` returns twice the signed area as an exact
   integer for **every ring `snap` can produce**: each shoelace term `xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ` is taken on coordinates
   relative to the ring's bounding-box minimum corner, which lie in [0, 2²⁴) by the range invariant, so each product is
   an exact double below 2⁴⁸ and |term| < 2⁴⁸; terms are summed in a double partial that is flushed into a BigInt accumulator
   whenever its magnitude reaches 2⁵² (one comparison per term), so every partial stays below 2⁵² + 2⁴⁸ < 2⁵³ and every
   addition is exact. Faces at the frame table's sizes never reach the flush (their terms are < 2⁴³). The value is
   returned as an exact double, because a simple ring's twice-area is below 2⁴⁹ (every face ring is simple, §3.10); a
   self-crossing ring — only a boolean operand before its overlay can be one — has `area2Big`, which returns the BigInt.
   Receipt: three star rings of radius 2²³ − 2 whose terms all share one sign are exact
   (`docs/validation/bench/fixall_kernel_r2_attract.out` E). Ring orientation is `orient2d` at the ring's
   lowest-leftmost vertex; no orientation, sliver or degeneracy decision reads the sign of a float sum; area statistics
   in m² are derived from the exact integer.
7. **The finite and range check lives at the one door (GEO-7).** `snap(x, y)` is the only way a number becomes an arena
   coordinate, and in every build — not only in debug — it rejects `!(Math.abs(v) < 2**23)`, one comparison per
   coordinate that also catches NaN and ±∞, with `E_OUT_OF_RANGE`. NaN, ±∞ and values past 2³¹ therefore never reach an
   `Int32Array`, which would store them silently as 0, 0 and a wrapped value (executed in GEO-7), so the null-`rect`
   crash class cannot return as a vertex at the world origin. (Height and depth rasters have their own check, §2.3.)
8. **Checked ratios.** In model packages a division by a computed value goes through `ratio(num, den, kind)`, which
   returns `E_DEGENERATE` when |den| is below the quantity's floor (length 1 cm, area 1 cm², angle 1 centidegree, count
   1); a lint rule flags every other division whose divisor is not a non-zero literal.
9. **Frames are rectangles (COV-VG-VN-156).** A rung declares its frame *area* at its target population,
   A_target = `frameAreaKm2AtTarget` (§1.1) — TOWN 4 km², CITY 25 km², METROPOLIS 64 km² (squares of 2, 5 and 8 km at
   the default aspect) — scaled within the band by the requested population, A = A_target · population ÷ target (the
   side with its square root; item 9; the cap figures: §12.2); the blueprint's `aspect` ∈ [0.5, 2] (default 1) gives
   `width = √(A · aspect)` and `height = √(A / aspect)`, centred on (0, 0) with `+y` north; the arena spans the frame
   plus `marginShare` on every side, and every raster's `cols × rows` follows width × height. The range bound of (1) is
   taken at the population cap and the extreme aspect, so a non-square town — the shape a village product and many river
   and coast towns want — needs no other change. The arena's outer ring and the frame rectangle are the `margin` and
   `border` chains of §2.2 rule 1.

   **Frame growth at an epoch (item 81 (b); J-A81.31).** A frame only grows, and only where §4.11 grows it at an epoch.
   The new frame is the one this rule gives the epoch's population target — taken at most at the cap, as §1.1 clamps a
   request — at the frame's own `aspect`, centred on (0, 0), so it encloses its predecessor; the range bound of (1),
   taken at the cap and the extreme aspect, holds for every grown coordinate. The growth inserts coarse chains into
   finished fabric and deletes others, so it runs as §3.3's declared sequence of single-level batches sharing one clear
   region, each with `rederivesFrom` S1. A **lapsing stretch** is a stretch of the old `margin` ring or of the old
   `border` rectangle that carries no other row of its chain's level or a coarser one; the **region** unites the L1
   faces beside a lapsing stretch with those the new frame rectangle will cross — whole L1 faces, as a carve's footprint
   is (§3.3).
   * (a) *Clearing (L1).* One L1 batch removes the content finer than L1 of every face of the region (§3.3 rule 1), a
     locked or pinned owner returning as a conflict (F-EDIT, §5.2), so no deletion of the committed growth joins two
     faces finer than L1 and its new rectangle crosses none.
   * (b) *The margin (L0).* One L0 batch inserts the new outer ring as the `margin` chain, then S1's water faces in the
     band between old and new ring (§4.11), then strips the old ring's `margin` rows by `removeEdges` on two
     `StretchRef`s that together cover it (§3.4). A stretch left with no row is deleted, joining the faces either side —
     land with land, water with water, each cleared L1 face beside it with the ring's; a stretch that keeps a row keeps
     its edge, re-levelled by §2.2 rule 3 (a), as where S1 lays a shore along it, the ring's water meeting the old land.
     `Plat.frame` takes the new frame as this batch commits.
   * (c) *The border (L1).* One L1 batch inserts the new frame rectangle as the `border` chain by §3.6's insertion (a
     way it crosses sharing the crossing vertex) and strips the old rectangle's `border` rows alike; a stretch that also
     carries another L1 row — the settlement perimeter or a reservation boundary running along the frame (§2.2 rule 1) —
     stays.

   A vertex of an old chain that keeps a row or another edge stays — a through-road's end on the old ring is an antenna
   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. Every underground part — its
   outer ring the frame with its margin (the sewer's, II.7.2; each further part's, §2.2 rule 1) — grows by (a) and (b)
   on its own key, the `margin` rows of its own
   record (§2.2 rule 1) instead of the `Terrain`'s, with no water and no border. Each raster of §2.3 extends by whole
   cells on each side until it covers the grown arena, keeping its `cellCm` and the alignment of its cells, so every old
   cell keeps its place and every stored height its value; S1 fills the new cells, and the `hydro` fields — flow
   direction, flat rank and accumulation — are recomputed over the grown grid by §2.3's mechanism, because an old edge
   cell gains neighbours and the ring may drain inward, every river's traced course inside the old arena unchanged. What
   changes is the region's faces, the faces beside a deleted stretch and the ring's new faces, at each level that sees
   them — §4.11's stages continue the ways and re-derive them; every other face keeps its ring, owner and nested faces
   (re-parented where its parent was joined, §3.3). The kernel's part draws no stream, so a replay of the log re-grows
   the frame byte for byte, and where §7.4 allows an epoch's undo, its undo record restores the old frame and what the
   three batches removed. *Pre-decided fallback* if M4's memory measurement of the extreme growth — a TOWN grown in one
   epoch to the cap, whose kept 5 m heights over the cap's arena are ≈ 15.7 M cells (≈ 63 MB, where a METROPOLIS made at
   the cap holds ≈ 3.9 M; our count) — exceeds §12.8's METROPOLIS line: a growth that changes the rung re-grids each
   raster at the new rung's `cellCm`, heights by the sampler's bilinear read of the old grid and the flow fields
   recomputed, every standing entity keeping its stored `baseCm`, and the generation report (§5.4) names the re-grid.

=== REPLACE ### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end ===
### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end

```ts
interface KernelTx { key: ArenaKey /* a PlatKey, or a transient arena's TransientKey (§3.4) */; level: Level; ops: KernelOp[] /* declared form only: independent ops, applied in canonical order (below) */;
  expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade'; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives (kept content, below): = stage in generation; the start of the edit's re-derivation for an edit (§7.3); the first stage of §4.1's order for a warp or smoothing batch, which keeps nothing (§3.6; J-K33) */;
  clearRegion?: Ring[] /* a coarse batch inserted into finished fabric, and its preparation batches: clearFiner acts only on faces meeting it (clear regions, below) */;
  prepared?: VertexRef[] /* with clearRegion: the vertices earlier batches of the same edit or stage placed for this batch's contacts with finer geometry (rule 2 below) — the only finer vertices it may meet (§3.6 candidate (c)) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId }
  | { kind: 'entity'; id: Id /* a transient arena's batches (§3.4): the entity whose derivation opened it */ };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: ArenaKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are the "moved edges" of §3.10 (GEO-35) */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3) — contacts, prepared vertices, stretch ends; the edit's undo record keeps their lattice points, former levels and flags and the anchor contact names promotion stripped (§7.4) */;
  demoted: { vertices: VertexId[]; edges: HalfEdgeId[] /* one half-edge per pair */ } /* birth levels this batch raised (§2.2 rule 3's demotion); the undo record keeps the former levels */;
  unflagged: VertexId[] /* vertices whose split flag or kernel pin this batch cleared other than by moving them — a prepared contact's or a stretch end's promotion, a broken run, a pin released by §2.2 rule 3 (b), an unmoved vertex beside which a move displaced its run (§3.6); the undo record restores the flags */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[]; work: number }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; every insertion is part of a batch. A transient arena's batches (§3.4) use this protocol with `level` 0 (its
one level); `batch` `{ kind: 'entity' }` naming the entity whose derivation opened it; `stage` and `rederivesFrom` both
the stage id under which the opening rung draws its streams (§6.1), so no face on it is kept content; and no
`clearRegion` or `prepared`. The kernel applies the ops to a scratch
overlay, serves every query inside the batch from the level's dynamic grid plus the static partitions, validates the
batch-local invariants on the touched faces and their one-ring (§3.10), and commits or rejects atomically. Local
repair (§5) runs inside the transaction on the overlay; for a batch an edit's dry run has already validated, see §5.3.

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  Steiner vertices, promotions and demotions of §2.2 rule 3; it may clear finer content inside its faces (`clearFiner`,
  subject to kept content below), and a `warp` batch moves vertices of every level ≥ its own (§3.6); anything else is
  `E_LEVEL`. A lane that a finer stage would like to add to a coarser level is therefore a separate, coarser
  transaction (§4.7), never a side effect of a finer one; a stage that writes two levels (S3: its carvings at L0, its
  reservations at L1) issues one transaction per level, in the order of §4.1's batch table.
* **Kept content (J-K14).** Every face records the rank of the stage whose batch created it (`LevelFaces.stage`,
  §2.2; the rank is the stage's position in §4.1's topological order, fixed per generator version). A batch clears
  finer content inside its faces only where that content's stage rank is at least that of `rederivesFrom`; finer faces
  an earlier stage made are **kept** — neither cleared nor re-owned — and their edges and vertices are obstacles: an op
  that would cross a kept edge, split a kept face or bring new geometry within `attractCm` of it returns `E_KEPT`,
  except where §3.6's candidate (b) attracts onto and promotes a finer vertex on a route the chain ends on or joins.
  `E_KEPT` governs insertion and clearing only; a move keeps nothing (§3.6). The re-walk re-parents each kept face into
  the new face that contains it — a kept face never straddles a new edge, because crossing it is refused — so nesting
  holds. In generation `E_KEPT` cannot arise on a correct pipeline, because the stage order builds no finer face before
  a coarser stage that could meet it (the wall's band parts: §4.7 S10 (0), §4.8; the hinterland's L3 content: §4.9);
  the rule turns a wrong stage domain into a typed failure that the stage property tests catch (§13.2). In an edit it
  returns to the dry run as a conflict (§7.1). How a re-derivation rebuilds the wall and margin bands in its scope,
  never writing the other side: §7.3 item 2. `clearFiner` never removes kept content and never reports it as a
  conflict; only locked or pinned content is a conflict (§2.2 rule 6).
* **A batch's faces are the faces it names or creates**. A same-level split of an edge those faces share
  with faces outside the batch — the neighbour step's kerb split beside finished plots and footprints (II.1 (3)) — adds
  that vertex to the outside faces' rings; they are not the batch's kept content, they are neither cleared nor
  re-owned, and each ring equals its prior ring with the vertex removed (the seam exception, §4.6 step 7, §7.3 item 1).
* **Clear regions and prepared contacts (LC-7; J-I10, J-I12, J-I13, J-K24).** A coarse batch
  inserted into finished fabric — §4.11's carve of a canal, moat or basin, §4.4's outer moat, S1's water operator
  re-carving a reach (§7.3 (b)), an epoch's frame growth (§3.2 (9)) — would under the plain rule clear every finer
  face of its level-n faces, and an L0 face is a whole land component, so one canal would clear the town. Such an
  insertion therefore runs as a declared sequence of single-level batches that share one **clear region**
  (`KernelTx.clearRegion`): the edit's **footprint**, which the operator computes in its dry run (§4.11 for the carve
  and the outer moat; §7.3 (b) 2–4 for the re-carved reach; for the frame growth, the whole L1 faces §3.2 (9) names
  instead) — its new chains buffered (`buffer`, §3.7) by
  `attractCm` plus the clearance of the chain's class (for a channel, its bank setback), **united with every L1 cell the
  edit's way rule touches**: the cells that buffer meets, the cells bordering a stretch the edit removes or prunes or a
  kept way's replaced stretch, the cells a re-routed way crosses, and — where the edit re-traces a wall run — the cells
  bordering the old run or the strip-line stretches it removes with it and the cells the re-traced run's new strips
  will take. The footprint is exactly the union of those cells, since the buffer lies inside the cells it
  meets. The kernel's part is three rules:
  1. *Clearing.* `clearFiner` in a batch that declares a clear region removes each finer face whose interior meets the
     region — whole, never part of one — with the partition edges and vertices no remaining face uses, and nothing
     else; locked and pinned owners return as conflicts; every finer face that does not meet the region is kept
     content, whatever its stage rank. **Structural finer edges inside the region** — ways, walls, setback and glacis
     lines, deck spans — are kept unless a preceding batch of the same edit removed them: `clearFiner` removes
     partition content only, and the preparation (rule 2) re-lays or cuts every structural edge the coarse chain would
     otherwise meet (§4.11 batch (1), §7.3 (b) 3). The coarse batch itself clears nothing; it only splits the
     finer faces that meet the region (rule 3).
  2. *Preparation.* One or more batches at the finer level, issued first in the same edit or stage, clear the region
     (rule 1) and place **every** point where the coarse chain will meet finer geometry as a vertex named by role (§2.2
     rule 7): on each way the operator keeps across the new water, a deck's two bank vertices carrying
     `('deck_end', bridge, 0 | 1)` under a fresh `Bridge`, the way's stretch between them one straight edge — the deck
     span; on each wall run the operator re-traces across the new water (S1's water operator, §7.3 (b) 3; a carve that
     crosses a wall, §4.11; J-I13), its water gate's two bank vertices carrying `('gate_end', gate, 0 | 1)` under a
     fresh `Gate`, which the `Gate` record built afterwards names (§2.7); on the map's `border` line (§3.2 (9)), which
     must stay closed, its two bank points as `anchor` contact names, the border's stretch between them — one straight
     edge, or several where the water takes in a corner of the frame or a vertex an earlier edit left on it
     — left across the water unchanged, as a deck span is (the arena's outer ring is L0, so new water meets it at its
     own level); and on every other finer edge the new water will cross that is no way — a settlement-perimeter or
     other district-boundary stretch, a wall strip's setback or glacis line — its two bank points as `anchor` contact
     names, the stretch between them removed. A contact name is placed by `splitThrough` with its row given without an
     ordinal: the operator names the entity by §2.2 rule 7, and the kernel allocates that entity's smallest free
     `anchor` ordinal — from 2 on an enceinte, whose 0 and 1 name an open trace's ends — as the op applies, so in the
     batch's canonical op order (below), and no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal
     check); the name lives until the coarse batch strips it (rule 3). A coarse chain never shares a finer edge, so a
     finer edge the new water would run along is cut back by the preparation like any lesser way; a way cut back beyond
     its bank setback — every lesser way, and a quay or landing, which the operator extends to the new bank only once
     the water exists, its end an ordinary Steiner vertex on the L0 bank (§4.11 batch (3)) — leaves no contact and needs
     no prepared vertex. Every stretch the preparation removes — a cut stretch, a pruned remainder, a kept way's
     replaced stretch, the stretch between two contact names — is removed through a `StretchRef` (§3.4), and a way left
     in two parts is first split by `retypeEdges`' `rekey` on its far part, so role consistency (§3.10) holds after the
     batch.
  3. *Contact.* The coarse batch splits the finer faces that meet the region (their records are re-walked and keep
     their owners until a later batch of the operator re-owns them), lists the prepared vertices in `KernelTx.prepared`
     and may meet finer edges and vertices only there: §3.6's candidate (c) attracts it onto each prepared vertex and
     promotes it. The finer edges at a prepared vertex stay as they are — kept outside the region, the preparation's own
     inside it — so each kept way's straight L1 edge between its two promoted bank vertices now lies across the new
     water as the `Bridge`'s deck span, carrying `deck` beside `way` (§2.2 rule 7), each re-traced run's edge between
     its two `gate_end` vertices is its water gate, and the border's stretch between its two contact points is the
     closed frame: no L0 edge crosses the water, no deck splits the water body's L0 faces, and the way stays one chain
     through every batch — the structure S1, S3 and S4 build at generation (J-I12). Any other contact with finer
     geometry is `E_LEVEL` inside the region and `E_KEPT` outside it, and returns to the dry run (in generation, to the
     stage's property tests). So a carve costs its footprint, not the town (the re-derivation that follows: §4.11 step
     4, §7.3 (b) 8).

  The carve fixtures of §13.1–§13.2 confirm these rules (M3a). *Pre-decided fallback* if a fixture cannot be met: the
  batch clears the finer content of its whole L0 land face and re-derives it (the plain rule — correct, slower);
  `moat: 'all'` is then carved only before S5c of the outer stage, where L1 holds only arterials, and an edit carve
  becomes a declared town-wide re-derivation with the fate report (§7.3).
* **Two op forms (GEO-11; J-K15).** A transaction takes exactly one of two forms, fixed by its stage's
  registration (§4.1, §14); a transaction that supplies both `ops` and a callback is a programming error caught by an
  assertion.
  * **Declared** — `KernelTx.ops` lists independent ops, none reading another's result (S3's carvings, S4's routed
    arterials, S7's strip lines and furniture, S9's `corridorUnion`, S11's per-plot footprints, an edit's inserted
    feature). Before applying, the kernel sorts them by a stable key — op kind rank, then the owning entity's lineage
    key (§6.3), then the op's index within that entity's stream path — so the committed arena is a function of the
    prior arena and the op *set*, not of the order in which the stage issued them. Hot-pixel snap rounding is
    order-independent; attraction, the one order-sensitive rule, is deterministic under the canonical order (the
    op-permutation test: §13.1).
  * **Callback** — `tx(tx, fn)` (§14) hands `fn` the open overlay; each op `fn` issues applies at once, in issue order,
    and later ops read its result. S5c's growth queue (each proposal tested against the streets already grown), S8's
    bent-cut recursion (each cut planned on the kerbs of the faces the previous cut made) and S10's plot subdivision
    (claims, per-frontage regions, strips, joins in sequence) are callback-form stages. The issue order is
    deterministic because it is a function of the stage's inputs, its streams (§6.1) and canonically sorted query
    results (below) — never of slot numbers, worker scheduling or arrival order — and attraction within the sequence
    follows it (the issue-order test: §13.2).
* **No output depends on slot numbers.** Every tie-break in the kernel uses lattice positions (y, then x), canonical
  item keys (below) or entity ids, never a `VertexId`, `HalfEdgeId` or `FaceId`, so an arena compacted on save, one
  grown through a long session and one merged from pool overlays give identical results for the same next edit (the
  slot-renumbering test: §13.1).
* **Work limits instead of clocks (GEO-2).** Every op charges operation counts to its transaction — points snapped,
  attraction queries, placement candidates tried, crossings resolved, faces walked, skeleton events — and a transaction
  that exceeds its declared `workLimit` returns `E_WORK_LIMIT`. Counts are identical on a slow and a fast machine, so a
  budget can select a ladder rung without changing what the seed produces.
* **The commit record** lists what the batch created, changed, moved, promoted, demoted and removed per level. It is the
  input of the batch-local invariants (§3.10), of index maintenance (below), of the display list's dirty set (§8) and of
  the digest update — at commit the kernel re-hashes the leaves the batch touched (the per-level plat digests and the
  entity leaves) and the nodes on their paths to the root (§6.2, whose budget this maintenance keeps). It is never
  persisted, because it holds arena slots. Commit granularity is part of every stage's declaration (§4.1), so the ≈ 48
  s hazard of per-insertion commits the engineering judge computed — and its per-batch twin — cannot arise.

**The derivation pool's overlays (J-K16).** The per-district stages that run in the pool (S10, S10b, S11, S12b;
§4.1) use these same transactions on **district overlays**, in five steps:

1. *The frozen base (J-K25).* When the eager S10a and S10's **shared-edge step (0)** have
   committed — the step runs on the generation worker and builds, on both sides at once, the bands around every L1 edge
   that two overlays' face sets share without corridors (step 3; §4.7) — step (0) ends as an eager stage does, by
   rebuilding the static L3 partitions its batches touched (a finer batch writes no coarser index, so L3 is the only
   level it touches). **At the freeze the generation worker first rebuilds every static partition whose dynamic grid or
   tombstone set is not empty** — none on the one-click path, where every stage has just ended with its rebuild; after
   edits (an epoch's per-district stages, a Re-derive from a stage at or before S10, a verification replay folding
   either), the partitions the edits left dirty, each holding at most max(256, ¼ of its static size) grid items —
   **and then asserts every level's dynamic grid and every partition's tombstone set empty** (§3.10). The rebuild is
   the stage-end rebuild's code on the partition's live items, so it changes no output, and it runs at every pool size,
   0 included (step 5). Measured with the same build (`docs/validation/bench/fixall_kernel_r4_bench.out` B): ≈ 2 ms for
   one district's L3 and L4 partitions, ≈ 10 ms for five districts', ≈ 6 ms for the arena-wide L1 partition with one L2
   partition, ≈ 59 ms for every partition of a finished CITY. Step (0)'s own rebuild covers every L3 item it made — at
   CITY ≈ 9 000 vertices, edges and faces (both sides of ≈ 6 km of perimeter margin band and of the wall's band,
   setback, glacis and tower parts; our count) in ≈ 26 partitions — and costs ≈ 2.3 ms at CITY and ≈ 5.8 ms at
   METROPOLIS by the measured build rate (`docs/validation/bench/fixall_kernel_r3_bench.out` A), carried in §12.4's
   S10 (0) row.
   The generation worker then freezes the arena at that version and sends each pool worker one read-only copy as
   transferred `ArrayBuffer`s — the vertex, half-edge, role and face arrays, the role-head and owner-head tables (typed
   arrays, §2.2), the index's home column and **every non-empty level's static index partitions** (L0–L3 at the
   one-click freeze, where L4 is still empty; L0–L4 at a freeze after edits) — so a pooled plot line that must end on
   the inner edge of a wall band, a setback part or a margin band, S12b's greenery in setback and glacis residue, and a
   pooled re-derivation's kept locked or pinned content are found by the same indexed queries as everything else. No
   `SharedArrayBuffer` is used (§11.2). **The copy's size** is the arena and its tables — at most ≈ 12 MB at
   CITY (§2.2 *Size*) — plus the partitions at 38.4 B per item and the home column at 2 B per slot: at the one-click
   freeze ≈ 60 000–90 000 items (the L0–L2 view and step (0)'s parts; our count, PLAUSIBLE until M1), ≈ 2.2–3.3 MB plus
   ≈ 0.2 MB of home column, so ≤ ≈ 15 MB per copy and one memory copy of ≈ 1.5 ms per worker (≈ 4.6 ms for three,
   measured, `fixall_kernel_r4_bench.out` A); at a freeze after edits ≈ 20 MB (≈ 0.5 MB of it home column; ≈ 2 ms each).
   §12.4 carries the copies on CITY's critical path and §12.8 counts one copy per pool worker. *Pre-decided fallback* if
   M1's memory measurement — or M4's, on the epoch path — exceeds the rung's line with these copies: a copy made after
   edits carries only what a pooled stage may read under the laziness contract (§4.1) — the L0–L2 partitions, every L3
   partition (step (0)'s parts are eager) and the L4 partitions of the districts the pool derives (their kept content);
   another district's footprints are lazy output that no pooled stage reads — and then §12.8's pool-shrinking step
   applies.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base. New
   vertices, half-edge pairs, face records and role rows — and the interned handles of the entities the district
   creates — go to the overlay's own growable arrays in overlay-local slots numbered above the base's high-water mark
   and are remapped at the merge; a change to a base record (a kerb edge split by a plot line, a face ring re-walked) is
   a copy-on-write record in the overlay; an item of the frozen partitions that the overlay deletes, re-levels or
   changes is tombstoned in a set the overlay keeps for that partition and consults with it (the copy's own sets are
   empty, §3.10), which step 4's district-end rebuild consumes — a pooled stage changes only its district's L3 and L4
   items. Every district starts from the frozen base alone, never from another district's overlay, so its result is a
   pure function of the base, its allocation and its own sub-stream, whichever worker runs it and whatever ran on that
   worker before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. Its **scope** is every face
   of the set, every edge with a face of the set on both sides, every vertex whose incident faces all lie in the set,
   and — for a split only (a vertex placed on the edge) — every edge on the set's boundary whose other side no overlay
   writes (a water face, the arena's outer ring), with the vertex placed on it, so waterfront plot lines may end on
   their own bank. A write of any kind — a split, a retype, a role row, a move, an owner change — outside the scope
   returns `E_SCOPE`. The L1 edges two overlays' face sets share are therefore never written in the pool: a shared
   spine is flanked by corridors whose kerbs each side's lines end on (avenue and street-tree rows are `Greenery.along`
   records in the planting district's own half-corridor strips, not roles on the way, §2.7, §4.9); a shared **wall
   trace** gets its band, setback, glacis, tower and gatehouse parts from step (0) before the freeze (step 1); and every
   other shared L1 edge without corridors — the settlement perimeter between the districts and the hinterland, and any
   reservation boundary two districts share — gets from the same step a **margin band** (§4.5), so the pooled plot and
   furlong lines on either side end on the band's inner edge, inside their own set (J-I9). The **hinterland unit**,
   which the generation worker runs while the pool works, is one more overlay of this kind (§4.1, §4.9). Each overlay
   also lists the base records it copied; at the merge, two overlays that copied the same base record, or a copied base
   record that the live arena changed after the freeze, fail the pool with `E_SCOPE` — defence in depth that a test
   asserts never fires.
4. *The merge.* The generation worker applies the overlays in district lineage order (§6.3): each overlay's new records
   are appended with a slot remap table (overlay-local slot → next free arena slot), its copy-on-write base records
   replace their originals, references inside the overlay are rewritten through the remap table, and only that
   district's faces are re-walked to validate rings and parents. The district's L3 and L4 static index partitions —
   built by the worker at district end from the base partition's live items (step (0)'s parts in that district
   included) and the overlay's new ones — travel with the overlay, have their item tables rewritten through the same
   remap and replace the base's partitions with empty tombstone sets, the home column taking their items' partition
   numbers, so the merged arena needs no index rebuild. The overlay's added and changed role-head and owner-head keys,
   kept in the overlay's own small tables and consulted before the base's, are inserted into the live tables through
   the same remap; the district's digest leaves (§6.2) travel with it too, and the root is finalised once after the
   last overlay. The cost is O(overlay size): the ≈ 200 000 records S10–S12b create at CITY merge within §12.4's 8 ms
   merge row.
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned — one
partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland, margin)
— each with a tombstone set, and (b) one **dynamic uniform grid** (cell 25 m at L0–L1, 10 m at L2, 5 m at L3–L4; table
values) with O(1) insert and delete.

**What each level's index holds.** The items of that level (their current birth level): its
vertices; its **route edges** — each maximal run of that level's sub-edges between two vertices of that level or
coarser is one item whatever finer vertices later split it, its box the bounding box of the vertices standing on the
run when its level's batch writes the item, padded by the 0.71 cm hot pixel, and its handle the half-edge leaving its
lower (y, x) endpoint (a split keeps that pair on the part at that end, so the handle never changes); and its face
records. The run's box holds every finer vertex on it by construction: one placed afterwards lies within the hot pixel
of the route edge (§3.6's placement rule (i)), and one placed before stands in the box however the route has changed
since (§3.6's placement bound; J-K32) — the endpoints' box, padded alike, missed 38 of 400 753 finer vertices under the
placement rule's non-nearest choices and the run's box none (`docs/validation/bench/fixall_kernel_r4_checks.out` A). A
finer batch that splits a coarser edge with a Steiner vertex therefore writes only its own level's index — S10's step
(0) and every pooled stage touch only the L3 and L4 indexes — while a promotion or a demotion, the coarser batch's own
change of a route, moves the vertex or edge to its new level's index and rewrites the route-edge items of the levels
whose routes it changes: a promoted vertex makes the route edge it now splits two items, a demoted vertex joins its two
items into one, and a demoted edge leaves its old level's item for its new level's (§2.2 rule 3).

**No item changes in place (J-K34).** Every item a batch deletes, re-levels, changes or moves to another
partition — a deleted vertex, edge or face; a promoted or demoted vertex or edge; a route edge whose run a vertex of its
level joins or leaves (a same-level split, a promotion, a dissolution, a demotion) or a move reshapes; a vertex a move
displaces; a face whose ring at its own level a re-walk or a move changes; **an item whose partition changes** — every
L2–L4 vertex, route edge and face under an L1 face that a batch re-owns to another district or to or from the
hinterland (S6's regroup, §7.3), and a vertex on an L1 edge two partitions share when that edge's partitions change —
is **tombstoned** in the static partition its home entry names (`Plat.indexHome`, §2.2), if it has one — the entry then
reads −1 — and its successor, if any, is inserted in the grid of its current level; an item already in a grid is
deleted from it or replaced there. A static item is therefore either exact or filtered, and no query sees an item at
its old level, place or extent or in its old partition: a promoted-then-demoted plot-line end answers an L2 query not
at all and an L3 query once, and a regrouped block's plots answer once, whichever partitions were rebuilt in between; a
regroup leaves both partitions dirty, so the next freeze rebuilds both (pool step 1).

**Queries.** Inside a stage every insertion and deletion goes to the grid. A level-n query reads the static partitions
of levels ≤ n that its box intersects and their grids, drops each static hit whose item key its partition has
tombstoned, expands each route-edge hit into the pieces of its level-n route that meet the box, and returns the
vertices of level ≤ n, each level-n route edge once (as its sub-edge leaving its lower endpoint) and the level-n faces,
**sorted by the canonical key of each item kind, read on the query's level-n route**: a vertex by its
lattice position (y, then x); an edge by the positions of the two endpoints of its level-n route edge, the lower (y, x)
first, never by a sub-edge's endpoints; a face by the positions of the first two vertices of level ≤ n on its outer
ring — the lowest-leftmost vertex of level ≤ n and the next vertex of level ≤ n counter-clockwise, finer vertices
skipped, and where the ring visits that vertex twice the smaller of its two successors; in a mixed result vertices come
before edges and edges before faces. The key is total — no two vertices share a lattice point, no two level-n route
edges share both endpoints, and a face's key is one directed level-n route edge, which bounds exactly one level-n face
— so neither which structure holds an item nor whether a finer level has been derived changes any answer (a key read on
the full ring reverses two L3 plots once S11 derives L4 in their block, `docs/validation/bench/fixall_kernel_r3_checks.out`
C), and no implementation ever needs a slot to break a tie.

**Tombstones and rebuilds.** A tombstone is an item key — kind · 2³² + slot, the kind a vertex, a route
edge or a face — held in one set per static partition: the items deleted, moved to another level or partition, or
changed since that partition's build. Tombstones filter **that partition's hits only**: a new item — the next occupant
of a slot freed and reused inside the stage, or an item's successor — lives in the dynamic grid, which tombstones never
filter, so neither slot reuse nor a level change can hide it, and the stale static copy never answers (J-K34). A
partition's rebuild indexes the live items that belong to it — every item of its level in its arena at L0–L1; at L2–L4
the items of its district, a vertex on an L1 edge two partitions share going to the partition with the smaller key (as
§3.9's chunks do) — sets their home entries, removes them from the grid and empties its tombstone set. The home column
(2 B per vertex, edge-pair and face slot; ≈ 0.5 MB at a finished CITY) lets a batch tombstone an item without searching
the partitions. **Static partitions are rebuilt at three moments, never per batch:** (1) when a stage ends — an eager
stage once, after its last batch; S10's eager step (0) once, before the pool's freeze; a lazy or pooled per-district
stage, the district's own partitions after that district's run; (2) during an editing session, when a partition's grid
overflow exceeds max(256, ¼ of its static size) — a count, never an idle timer; (3) at every pool freeze, for the
partitions edits left dirty (pool step 1). Measured flatbush construction (`docs/validation/bench/bench_index.out`):
0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 ms at 17 000 — at CITY about one L3 and one L4 rebuild per stage (≈ 7 ms
together), or ≈ 0.2–0.3 ms per district partition, where a rebuild per block or per plot commit would cost 1.9 s (S10)
and 13.4 s (S11). A single plot edit rebuilds at most its district's L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5
ms), inside §12.6's plot-edit budget; §13.2's cost-model test fails if rebuild work grows with the number of commits.

=== END ===
