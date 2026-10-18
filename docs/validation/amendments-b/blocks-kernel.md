# blocks-kernel — lane amendments-b/amend-kernel (KERNEL part, §3): block file per the BLOCK PROTOCOL
# Generated from docs/ARCHITECTURE.md (sha256 7a4e19dbae731d3e…) by scratchpad/kb/gen.py: each REPLACE block is the live
# subsection with asserted single substitutions (items 12, 21, 28, 30 — kernel referencing part); §3.4 is an APPEND. Text before the first "=== " line is ignored.
# Updated 2026-09-27 for item 28 (f) — the interior ladder (the owner's message of ~00:50; route update 01:04) — by scratchpad/kb/gen_f.py:
# §3.4's transient-arena paragraph (the `fixed` comment and a new paragraph "A re-cut is the same call"), §3.10's seed-tiling row,
# and J-A28.33 (J-ROWS, RATIONALE-A); the whole block set re-verified against the live document sha256 1dbfd9d4f39723ee….

=== REPLACE ### 3.1 Build-versus-adopt, per primitive ===
### 3.1 Build-versus-adopt, per primitive

| primitive | decision | candidate (licence) | degenerate input; where specified |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | §3.2 (numeric policy), §3.6 (insertion, contact and move semantics) |
| exact predicates | **build** `orient2d` (exact in doubles under §3.2 (1)); **adopt** `incircle` (J-K36) | `robust-predicates` **3.0.3, Unlicense** — licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower) | `incircle` is the adaptive predicate and is never on the topology path; ties and float rules §3.2 (3), orientation and areas §3.2 (6) |
| planar subdivision (§2.2) | **build** — the core asset: **struct-of-arrays, allocation-free hot loops** (G-R7: NG's profile is dominated by `Point.new`, 385–561 k calls, and `intersectLines`, 147–213 k) | — | transactions §3.3, insertion and slivers §3.6, storage §3.9, invariants §3.10 |
| polygon booleans; buffers, offsets, insets and bands | **build on the kernel's arrangement** (§3.7; J-K4) | Clipper2 (BSL-1.0) and `polygon-clipping` (MIT): CI oracles, shipped only under §3.7's fallback | §3.7 |
| straight skeleton | **build** (§3.8; J-K5, J-A21.31) | none adopted: no mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design; CGAL's is rejected on the stack and one-engine grounds — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be made byte-identical to §3.8's validated construction — and no longer for its licence, which the module's own GPL-3 (§17.3) makes compatible | §3.8 |
| OBB, convex hull, largest inscribed rectangle | **build**: monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal, ± 45° (G-R13) | — | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`), never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers branch on the typed result |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for site sampling, Lloyd relaxation, field seeds and medial axes — never as the street source (S4's routing lattice is `hexLattice`, §3.4) |
| Poisson-disc / blue noise | **build**: Bridson with **k = 50 candidates, all evaluated** (the references' measured variant, `_critic.md` C2; G-P17), run at product build time to make §8.10's stamp tiles; per-instance placement: §8.1 (2), §8.10 | — | domain clipped to any polygon with holes; an empty domain returns empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), never from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT); seeding, fBm and warp ours | seeded from sub-streams (§6.1); octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | results re-enter through `insertChain`; smoothing committed geometry is a `warp` (§3.4, §3.6); Visvalingam–Whyatt is the topology-preserving `simplify` (§3.4); fillets are skipped when a leg is shorter than the chord |
| spatial index | **adopt + build** | `flatbush` (ISC) static partitions and a uniform grid per level (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | §3.3 |
| marching squares / distance transform | **adopt / build** | `d3-contour` (ISC) or our own | linear time; VG's `createDeflection` hot spot avoided by construction; contours are extracted per render tile, not in S1, and are never plat edges (§2.3, §8) |
| path search | **build**: binary-heap A\* / Dijkstra on rasters and on the subdivision graph (the 2017 "A\*" is a FIFO BFS, not reproduced) | — | `E_NO_PATH` with the closest reached point |
| triangulation (render, fields) | **adopt** | `earcut` (ISC) | holes supported; degenerate triangles skipped and reported |
| deterministic math | **build** `dmath` (§6.5 (2); J-11) | — | a division by a computed value goes through `ratio()` (§3.2 (8)) |
| RNG and hashing | **build** (§6.1) | — | — |

Every primitive returns a **typed result** and never throws for a geometric reason:

```ts
type KernelResult<T> = { ok: true; value: T; warnings: Warning[] } | { ok: false; code: KernelError; detail: string; partial?: T };
type KernelError =
  | 'E_OUT_OF_RANGE'       // snap(): non-finite, or |coordinate| ≥ 2^23 cm — a caller bug, reported with its stream key, never stored (§3.2 (7))
  | 'E_DEGENERATE'         // ratio() with a vanishing denominator; OBB / hull of collinear or < 3 distinct points; an empty or collapsed boolean, buffer or inset; a StretchRef whose ends are not two distinct vertices of one part of its chain (detail 'stretch', §3.4)
  | 'E_LEVEL'              // a batch wrote a level other than its own, added a row coarser than the edge or vertex it lands on, or — in a clear-region batch — met finer geometry inside its region away from its prepared contacts (§3.3)
  | 'E_LOCKED'             // the op would cut, move or delete geometry owned by a locked or pinned entity — returned to the dry run as a conflict (§7.1)
  | 'E_KEPT'               // an insertion or clear would cross, clear or come within attractCm of kept content (§3.3) — a stage-domain bug in generation, a conflict in an edit's dry run
  | 'E_SCOPE'              // a pool district overlay wrote outside its district's scope, or two overlays touched one record (§3.3)
  | 'E_STRUCTURAL'         // a merge or removal would delete an edge carrying a structural role (§2.2 rule 7)
  | 'E_NOT_TWO_CROSSINGS'  // splitFace contact semantics violated (§3.6)
  | 'E_HOLE_CONTACT'       // connectHole post-condition violated (§3.6)
  | 'E_SELF_INTERSECT'     // a ring whose role requires a simple polygon (a claim, a drawn boundary) crosses itself
  | 'E_BELOW_MIN_EDGE'     // optional chains only; its two triggers are §3.6's
  | 'E_BELOW_MIN_ANGLE'    // optional chains only: a face corner below minFaceAngle (§3.6)
  | 'E_BELOW_MIN_AREA' | 'E_BELOW_MIN_WIDTH'   // a class floor declared by the caller
  | 'E_NON_CONVEX'         // the half-plane inset path was asked for a non-convex face (§3.7)
  | 'E_NO_PATH'
  | 'E_WORK_LIMIT'         // an operation-count budget was exhausted — counted in operations, never measured by a clock (§3.3)
  | 'E_INVARIANT';         // a declared hard invariant failed at commit (§3.10)
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_STEINER'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE';
  count: number; at?: LatticePoint };   // W_PLACED: §3.6's placement rule; W_PROMOTED: a finer vertex promoted (§2.2 rule 3) — prepared vertices and stretch ends included
```

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
one edit; every insertion is part of a batch; a transient arena's batches (§3.4) use this protocol unchanged, their
`batch` the entity whose derivation opened it. The kernel applies the ops to a scratch overlay, serves every query
inside the batch from the level's dynamic grid plus the static partitions, validates the batch-local invariants on the
touched faces and their one-ring (§3.10), and commits or rejects atomically. Local repair (§5) runs inside the
transaction on the overlay; for a batch an edit's dry run has already validated, see §5.3.

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
  re-carving a reach (§7.3 (b)) — would under the plain rule clear every finer face of its level-n faces, and an L0
  face is a whole land component, so one canal would clear the town. Such an insertion therefore runs as a declared
  sequence of single-level batches that share one **clear region** (`KernelTx.clearRegion`): the edit's **footprint**,
  which the operator computes in its dry run (§4.11 for the carve and the outer moat; §7.3 (b) 2–4 for the re-carved
  reach) — its new chains buffered (`buffer`, §3.7) by
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

=== APPEND TO SECTION ### 3.4 Kernel operations the pipeline needs (complete list) ===
**Arenas, keys and services (J-A12.32).** Every writer acts on the arena its transaction's `key` names and every
service takes the arena it reads (`key`: a `PlatKey`, or a transient arena's `TransientKey`, below). The arenas share
no topology (§2.2 rule 1), so an op handed a slot of another arena is a programming error, caught by an assertion in
every build, and a cross-arena link is an entity id, never a slot. A stage on one arena reads another through the
services alone and never writes it: the underground stage tests each tunnel band, frontage plot and building it lays
against the ground arena's water, wall, gate, keep and reservation faces by `pointLocate` and `resolve` on the
ground's `PlatKey` (II.6; item 12), and a sky island's shadow footprint is the same query the other way.

**Transient arenas (J-A28.31).** The composition rungs — a stage-3 `compose()` and, at the plan rung, each storey
(§2.6) — partition rings that are no plat faces: rooms cut into the L4 arena would enter its index partitions and the
model digest on every click, so a click would change the model (§4.1, §6.2). They cut on a **transient arena**
instead: a one-level scratch subdivision on the world lattice under §3.2's numbers, §3.6's insertion rules and
§3.10's invariants, opened for one derivation call and gone at its end.

```ts
type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ };
type ArenaKey = PlatKey | TransientKey;   // what KernelTx.key and CommitRecord.key name (§3.3) and what every service's `key` accepts
transientArena(owner: Id, seed: Ring[] /* world lattice rings, counter-clockwise; abutting rings share the joint's vertices exactly, as §2.6 rule 1 requires */,
               fixed: { ring: Ring; owner: Id }[] /* faces made before any cut and never cut by one: a stair core's bay, a hearth's chimney stack, a passage under the wing (item 30), a tower's round room — and, on a re-cut, the rooms §2.6's interior ladder keeps (item 28 (f)) */,
               workLimit: number): KernelResult<TransientKey>   // W_ATTRACTED and W_PLACED name every seed or fixed vertex the insertion moved
readBack(key: TransientKey): { faces: { ring: Ring; holes: Ring[]; owner: Id | null; fixed: boolean }[];
  edges: { a: LatticePoint; b: LatticePoint; left: number; right: number | 'outside' /* face indices in this result */;
           seed?: { ring: number; side: number } /* which seed ring the edge lies on, and which side of it (by that side's first vertex index) */; joint: boolean /* on a side two seed rings share */ }[] }
release(key: TransientKey): void
```

Its L0 faces are the seed rings, inserted as `mandatory` chains — a side two rings share becomes one edge (an exact
collinear overlap, §3.6), the party wall between two wings — and then the `fixed` rings inside them, each a face of its
own. The seed rings' and the fixed rings' edges are the arena's **fixed edges**: `mergeFaces` and `absorbSliver` never
delete one (`E_STRUCTURAL`, as for a structural role), and no writer moves a vertex there — a wall moves by
`mergeFaces` and then `splitFace` at its new line (the plan's `moveWall`, §7.1), so `warp` is not offered — which is
what makes §3.10's seed-tiling row hold by construction. Its batches are §3.3's transactions (`KernelTx.key` a
`TransientKey`, `batch` `{ kind: 'entity' }`, either op form, the caller's `workLimit`); its writers are the face
partitioners of this list — `splitFace`, `connectHole`, `radialSplit`, `ringBand`, `mergeFaces`, `absorbSliver`,
`setOwner` — with `booleans`, `offsetFace`, `insetRing`, `obb`, `lir`, `sideRuns`, `skeleton`, `faceNeighbours` and
`area2` as services on its faces; `insertChain` (after the construction), `splitThrough`, `removeEdges`, `clearFiner`,
`retypeEdges`, `claimSubFace`, `corridorUnion`, `bandUnion`, `warp` and `pinVertices` are not offered on it. It has no
static partitions (its dynamic grid serves every query), no stage ranks, no kept content, no role rows beyond the
owners the caller sets, no `PlatKey` and no entity; it is never persisted (§3.9), digested (§6.2) or frozen (§3.3),
and no slot of it outlives `release`. `readBack` returns rings and edges as values in §3.3's canonical order, so the
caller's records — the plan's storeys, rooms, walls and openings (§2.6) — depend on the seed rings and the op sequence
alone, whichever worker cut them. A caller may plan its cuts on a coarser module of its own (the plan rung's
wing-local module, a table row, §2.6): the module is the planner's grid, never a second lattice — every point enters
through `snap` and the placement rule, so a cut's ends lie on the fixed edges within the hot pixel and the tiling holds
exactly. Opening costs O(seed vertices) and each op what this list states, on tens of vertices per storey; §12.7's
stage-3 rows count it.

**A re-cut is the same call (item 28 (f); J-A28.33).** The plan derived again for new occupants under §2.6's interior
ladder, or after item 18's mutation, opens a fresh arena from the same seed rings — the shell that item 31's geometry
floor fixed (§4.11) — passes the rooms the ladder keeps and the anchors that never move (the stair core's bay, the
hearths' chimney stacks, a passage) as `fixed` rings, and cuts the rest; a kept ring re-enters on the lattice points it
left with, so the insertion moves nothing and it reads back byte-identical. Nothing of an earlier cut is edited, because
no arena outlives its call: where the model derives the plan as a chain of least-disruption steps (§2.6, §7.3), each
step is its own open, cut and read-back, counted by §12.7's plan row. The seed rings never change with the occupants, so
the interior changes while the shell cannot — §3.10's seed-tiling row holds on every re-cut as on the first cut. The
unit-door rule of §2.6 (its §5.3 check) reads `readBack`'s edges: a door's edge has the unit's room on one side and a
circulation face or `outside` on the other.

=== REPLACE ### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement ===
### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement

**Decision (GEO-9, DEF-2; J-K4).** Booleans, buffers, per-edge insets and bands are built on the kernel's own
arrangement — the machinery of `insertChain` on a scratch overlay — and no second geometry engine ships (the one
exception is the pre-decided fallback below). A boolean overlays both operands' rings, labels every face with its
winding numbers (a breadth-first walk from the unbounded face that adds each crossed edge's ring orientation), keeps
the faces the operation and fill rule select (non-zero or even-odd, declared per call), and removes the edges that
separate two kept faces; an empty result is `E_DEGENERATE` with detail `empty`. A buffer is the union of per-segment
strips and per-vertex join discs: round joins as chords of at most 2 cm sagitta (about 27 chords per full circle at a
3 m radius), square ends where declared (gates, bridgeheads); where the half-width varies along a stored chain it is
sampled from the chain's knot profile at each segment's two ends and the segment's strip is the trapezoid between them
(§2.2 rule 5). Every output takes and returns integer coordinates and is produced by the same insertion rules as every
other chain, so it obeys the same attraction, placement, `minEdge` and clearance (GEO-35) with no re-snap round trip,
and on every host it is the same TypeScript code producing the same integers — no host can compute a different town.

**The kerb, defined once (GEO-20).** For an L1 face F, `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding
spines, each half-width sampled from the width the spine's linear entity declares — a way's width profile (§2.4); in the
underground arena a tunnel's corridor width, its bore plus its wall (`Tunnel.widthCm` and II.6's wall-thickness row) — with
round joins on the union's convex side and square ends where declared; the union's concave corners — the block corners at junctions — are sharp by construction.
`corridorUnion` commits exactly this geometry at L2: the kerb rings as `kerb` edges; the spine inside the band, already
an L1 edge, splits it into the two half-corridor strips; a `corridor_split` edge from each junction vertex to the kerb
corner separates the junction wedge; on a side where the spine passes straight through a junction vertex (a T-junction
whose street arrives from the other side) there is no kerb corner and no wedge: one `corridor_split` edge from the
vertex to the foot of its perpendicular on that side's kerb separates the half-corridor strips of the spine's two
sub-edges (§2.2 rule 1) — the edge II.1 (3)'s neighbour step inserts alone into a finished neighbour's strip;
the faces outside the band are the built blocks. A finer face an earlier stage made inside F is kept (§3.3): it must
lie wholly inside one resulting L2 face, and a kerb or `corridor_split` edge that would cross one or come within
`attractCm` of it returns `E_KEPT`. The one-click order leaves none inside the faces S9 bands — a wall's band, setback
and glacis parts are built after S9 inside their own L1 strip faces (§4.7 S10 (0), §4.8) — and a strip ends at the
corridor of the way through each gate, so every gate passage stays open by construction. `kerb` is also a read-only
service on the faces of an open transaction's overlay: S8 plans every cut on `kerb(F)` of the current L1 faces, inserts
each accepted lane at L1 in its own district transaction and recurses on the children's kerbs; S9 then commits
`corridorUnion` for those L1 faces — the same function on the same inputs — so the block S8 cut and the block S9 keeps
are one face (tested, §13.2). Because a way's width is a knot profile, the T-junction S8 inserts into a crossed spine
(§4.6 step 7) adds a vertex that carries no knot and changes no half-width, so the two sides of that contract read the
same widths. `corridorUnion` takes a set of L1 faces and re-derives only those, which is also how an edit re-derives
the corridors around a changed street. The per-edge half-plane inset of the 2017 idea survives only as `insetRing`, for
a uniform inset of a face whose convexity is checked exactly (`E_NON_CONVEX` otherwise; an inset larger than the
inradius returns `E_DEGENERATE` with detail `collapsed` and the last non-empty distance); per-edge distances on any face
use the buffer difference (`offsetFace`), so a concave, mixed-class face — the usual face of organic growth — has one
correct construction, and a 2° kink between a 6 m and a 3 m half-width no longer lets the wider offset govern ≈ 86 m of
the narrow edge. Wall bands, glacis, tower and gatehouse footprints use `bandUnion` with the `band` role: the wall
chain, already an L1 edge, splits the band, so a band is a `FaceRef` of per-side L3 parts and never straddles its L1
edge. **The same functions on every arena (J-A12.31).** `kerb`, `corridorUnion` and `bandUnion` take the arena from the
transaction's `key` (§3.3) and a chain from its `(role, entity)` row, so they run on the underground arena on `tunnel`
chains as on the ground's `way` chains; a sky island's arena needs nothing of its own (its ways are ways):
`corridorUnion` over the underground L1 faces commits each tunnel's band — bore plus wall — as its two half-corridor
strips with a junction wedge at every tunnel junction, and the faces between the bands as the underground's built blocks
(the underground arena's level mapping is §2.2 rule 1's; which of those blocks is plotted, and how deep, is II.6's); the
band's outer ring, the tunnel's external wall, is the `kerb` edge every underground frontage plot's lines end on (§4.7
S10's frontage-first cut on that kerb), so a plot stands flush against the wall by construction (item 12; the frontage
rule and its invariants are II.6's and §5.3's). No arena-specific band operation exists.

**Oracles, not fallbacks — compared where the comparison means something (J-K19).** Clipper2 (compiled to
WebAssembly, run in Node) and `polygon-clipping` are dev dependencies of `@plat/testkit` only; no product bundle loads
either unless the M0 speed fallback below fires. Our engine attracts features closer than `attractCm` onto each other
and the oracles do not, so B-FUZZ splits every boolean and buffer case by what our engine reports for it:
* **unattracted cases** — the operation reports no `W_ATTRACTED`, `W_STRETCH_SHARED`, `W_WEDGE_ROUTED` or `W_PLACED`,
  so nothing moved beyond the hot pixel: our result and each oracle's must have **equal face counts after both are
  snapped** (zero-area faces dropped) and a **symmetric-difference area of at most the perimeter × 1 cm**, the perimeter
  being the summed boundary length of both operands;
* **attracted cases** — the thin, near-collinear and near-touching inputs §13.1's random family and constructive set
  deliberately include: our result must pass every hard invariant of §3.10, and its symmetric difference from each
  oracle must be at most the perimeter × √2 · `attractCm` (≈ 36.8 cm), the farthest any boundary point can move under
  attraction, placement or wedge routing (a wedge-routed tip sweeps at most half a `minEdge` per unit of arm length);
  face counts are not compared, because merging features closer than `attractCm` is the designed difference.

The harness's draw count, which keeps the strict comparison from being vacuous, is §13.1's. There is no runtime
fallback, so no host produces a different model hash and no fallback path needs a budget (SCL-22). The generation report
names the engine that ran — the arrangement engine, `plat-arrangement@<version>` (§5.4); an engine change: §6.5 (7).

**Confirmation at M0 and the pre-decided fallback.** M0 (a) measures (i) differential correctness on 10⁶ fuzzed and
constructive inputs per operation — 0 crashes, 0 invalid outputs, and the split oracle agreement above — and (ii) speed:
S9's corridor bands over the CITY face set against §12.4's S9 row and **one district ≤ 3 ms on reference hardware**, and
**S11's geometry share** against its §12.4 row on B-CITY-lite's S11 workload. S11's geometry share is every kernel call
S11 makes for one plot — the base outline builder's frontage-band intersection or OBB / LIR fit (§2.6, §4.7), per-edge
setbacks by `offsetFace`, the yard partition's splits and the footprint's insertion into the block's L4 batch — the
geometry part of S11's single §12.4 row, whose remainder is S11's rule evaluation (site-plan table, heights, materials,
entrance), so this bar cannot pass while the stage misses its row. Criterion (i) has no fallback: a failure there is a
kernel bug, fixed before M1, and with the split comparison it tests only what the design promises. If (ii) fails after
one optimisation pass, the shipped engine becomes **Clipper2 compiled to WebAssembly as the only engine on every host**:
its outputs still enter the arena through `insertChain`, so attraction, placement, `minEdge` and clearance still hold;
WebAssembly becomes a stated requirement of the embed contract (§11); a host that cannot instantiate it receives §11.2's
`E_ENGINE_UNAVAILABLE` — never a different town; and the switch is a declared golden shift whose shift records name
every stage that reads a boolean, buffer, inset or band (S1 outline repair, S3 reservations, S8 kerbs, S9 corridors, S10
step (0)'s wall and margin bands, S11 footprints, S12b greenery faces). Clipper2 does not reproduce the arrangement
engine's integers, so §6.5 (10)'s cross-implementation byte-identity test applies to the WebAssembly accelerator only,
and Clipper2's determinism check is §6.5 (9)–(10)'s cross-host digest identity.

**No WASM kernel (DEF-13; J-K8).** The kernel is TypeScript on every host. M0 (a) measures its per-op costs against
§12.4's rows — insert + snap + attract + re-walk per growth proposal (S5), `splitFace` per bent cut (S8), and the band
and S11 costs above. **What a miss triggers**, for each hot loop after one optimisation pass:
* a miss by **more than 2×**: that loop — and only that loop — is compiled from the same integer algorithm into a
  WebAssembly accelerator behind the kernel façade;
* a miss by **up to 2×**: the measured cost is carried into its stage's row of §12.4; if that pushes the row over its
  budget the accelerator is built for the loop as above, and otherwise the measured cost replaces the row's figure as a
  **declared budget amendment** (recorded in §12.4 and in the M0 record, with the critical path re-summed);
* an accelerated loop that still misses, or a re-summed critical path above its rung's p95 (§12.3), re-declares the
  model budget at the measured p95 as a D-18 amendment for the owner's veto — the same path the fusion gate uses (§16).

The accelerator must pass §6.5 (10)'s cross-implementation test byte-identically on the golden suite (§16's M0 exit
names this rule), and the TypeScript loop stays in every bundle, so a host without WebAssembly is slower and never
different.

=== REPLACE ### 3.8 The straight skeleton — numeric contract, validator, downgrades ===
### 3.8 The straight skeleton — numeric contract, validator, downgrades

**Decision (DEF-3; J-K5).** The skeleton is built in-house (§3.1). It never writes an arena: roof ridges and hips are
derived per building and cached by (entity, content revision, roof construction) — never by id alone (§8.1 (5), LC-23,
N-19), so a `setAttr` on floors or a re-fitted footprint changes the revision and so the roof — and label spines are
derived per face (§9). A stage that wants skeleton-derived topology inserts the validated arcs through `insertChain`
like any other chain. A skeleton failure can therefore degrade a roof, a label or one stage's partition, never the plat.

**Readers and their downgrades.** The `skeleton` service (§3.4) has three uses, and every reader of its output has a
typed downgrade:
* `roof` — the roofs that do not take the exact path below: quad wings that fail the convex near-rectangle test,
  irregular or notched outlines (institution shapes) and stage-3 irregular wings; downgrade: a **plain roof**;
* `spine` — the hole-aware skeleton graph as a medial axis: label spines (§9.3), the local feature size S1's coast
  simplicity clamp reads (§4.2 S1), and each room's label spine and light point when the plan rung draws a storey on the
  building band (§2.6, §8.5; item 28) — the plan rung's only skeleton use: it takes no wall from the skeleton, so a
  failure here degrades a room's label or light and never a room (J-A28.32); downgrade: a **sampled medial axis**;
* `regions` — S10's per-frontage regions of a block (§4.7 S10 (4)); downgrade: the stage's own exact construction, a
  **reflex pre-cut partition** (§4.7, §5.2 F-PLOT).

**Numeric contract (GEO-8).** Exact rational event times are impossible — edges move at unit speed, so event times
involve the lengths √(dx² + dy²) of lattice edges. Event times are therefore computed in doubles with + − × ÷ √ only
(identical on every IEEE engine; no transcendental), on coordinates relative to the polygon's bounding-box corner.
Input is pre-cleaned (collinear merge, minimum angle 5°); holes are supported. Events closer than 1 mm in offset time
and 1 cm in position are coalesced into one multi-edge event; ties are broken by the input vertex's index in the ring,
canonicalised to start at its lowest-leftmost vertex. The event queue runs under a work limit of 4 · (n + r) + 64
events for n vertices and r reflex vertices — a correct run needs at most about n + r — and exceeding it is
`E_WORK_LIMIT`, a count and never a timeout.

**Convex near-rectangles take the exact path (J-K21).** A footprint wing that is **convex** (every turn
non-negative by exact `orient2d` on its lattice vertices), whose four OBB corners are each matched by a footprint vertex
within 30 cm and whose area is at least 0.97 of its OBB's — **the convex near-rectangle test** — gets its ridge or apex
exactly, independent of sub-centimetre snapping, so a 1 cm edit cannot flip a micro-ridge (after snapping, only 33 % of
rotated squares keep a single apex, GEO-8): a hip roof's ridge ends half the OBB's minor extent in from each short
side, with its hips running from the four matched vertices to the ridge ends; a gable roof's ridge lies on the wing's
`ridgeAxis` line (§2.6: for a `rect`, the OBB axis parallel to the side it names; for a `quad`, the line joining the
arc-length midpoints of the two side chains it names, the sides delimited by `BaseWing.corners`) and ends where that
line meets the footprint's boundary; a pyramid's apex is the OBB's centre. Every roof line then lies inside the
footprint: its endpoints do (the matched vertices and the gable ends are on the footprint; a hip ridge end or an apex
lies at least half the OBB's minor extent inside the OBB, far more than the ≤ 30 cm by which a convex footprint
matching all four corners can fall short of the OBB), and a segment between two points of a convex polygon lies inside
it — so VIS-11's crossing hip lines cannot occur. Convexity is what makes this true: a 20 × 10 m rectangle with a
3 × 2 m notch at x = 1–4 m on a long side (area 0.970 of its OBB, all four corners present) has a reflex vertex and so
takes the skeleton (`docs/validation/bench/fixall_kernel_r2_attract.out` D). Roofs are taken wing by wing, by
`BaseWing.kind` (§2.6): `rect` wings — the base outline builder's rectangles and L / T compositions — are
convex, so most roofs take this path; a `quad` wing (a row house cut to a curved frontage) takes it when it passes the
test and the validated skeleton otherwise — no path asserts that a party-wall side is straight, so a quad whose bent
side (the lot cut's one bend) fails the test takes the skeleton; `polygon` wings keep the pyramid, cone and
dome constructions.

**Post-condition validator.** Every skeleton result is checked before any use: (1) planarity — no two arcs cross (exact
`orient2d` on nodes rounded to the millimetre in bounding-box-relative integers); (2) exactly one skeleton face per
input edge, monotone along that edge's direction; (3) heights consistent — each node's offset time equals its distance
to the supporting lines of its faces within 1 cm, and times increase along every arc away from the boundary; (4) the
graph is connected and has exactly h independent cycles for h holes (a tree only when there are no holes). A failure,
or `E_WORK_LIMIT`, takes the reader's downgrade, reported `W_DOWNGRADE`: a **plain roof** is the footprint drawn and
exported without ridge or hip lines, its heights unchanged (MFCG's own behaviour when its gable pass fails); a
**sampled medial axis** is a Voronoi of boundary samples at 1 m via `d3-delaunay`, pruned by clearance. Never a crash,
never a roof line outside its footprint and never unvalidated output.

**Confirmation at M0 and the pre-decided fallback.** M0 (a) runs §13.1's skeleton fixtures and the B-CITY-lite corpus
of irregular footprints and of district and water faces. Pass: 0 crashes; 0 validator failures on the fixtures;
downgrades ≤ 0.5 % and work-limit hits ≤ 0.1 % on the corpus; ≤ 20 µs median per footprint. If the corpus bar fails
after one repair pass, the downgrades become the default paths — convex near-rectangular wings keep their exact OBB
roofs, every other roof is plain, every `spine` reader takes the sampled medial axis and S10 the reflex pre-cut
partition — and the skeleton leaves the product (kept in the testkit for comparison); nothing else changes, because the
readers above are the only readers of skeleton output.

=== REPLACE ### 3.10 Kernel invariants — what is checked, when, and at what cost ===
### 3.10 Kernel invariants — what is checked, when, and at what cost

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex lies at least `minEdge` from every edge outside its one-ring (the edges incident to it or to its neighbours); acute corners inside the one-ring are governed by `minFaceAngle` and the class floors | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point: no two vertices share a lattice point | hard | batch-local | by construction for insertions (coincidence is attraction); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤ n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| placement bound: every vertex a batch places, re-seats or slides onto a coarser edge lies within 0.71 cm of that edge's route at the edge's own level when it is placed (a later same-level change of the route moves no finer vertex, §3.6) | hard | batch-local | the placed, re-seated and sliding vertices |
| level consistency: every edge's birth level is the lowest level among its role rows; no vertex is coarser than every edge and vertex role at it; a vertex finer than an incident edge lies inside that edge's run — its incident edges coarser than it are exactly two, of one level, with identical rows of that level (§2.2 rule 3) | hard | batch-local | the commit record's new, changed, demoted and removed edges and the vertices at them, and its promoted and demoted vertices |
| held vertices: no vertex of a `warp` or smoothing step's held set moved (§3.6) | hard | batch-local | the commit record's `moved` list against the held set |
| prepared contacts: a clear-region batch met finer geometry only at its `KernelTx.prepared` vertices, promoted exactly those, stripped their `anchor` contact names, and shared no finer edge (§3.3, §3.6) | hard | batch-local | the commit record's `promoted` list against the resolved prepared set, and its new edges' birth levels |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` — nor, in a clear-region batch, any finer face outside the region — was cleared, crossed, split or re-owned (moves keep nothing, §3.6) | hard | batch-local | the stage ranks and region test of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role of §2.2 rule 7's registry other than a knot role finds exactly one vertex or edge set per ordinal, every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| frozen base complete: at every pool freeze, after the freeze has rebuilt each static partition whose grid or tombstone set was not empty (§3.3 pool step 1), every level's dynamic grid and every partition's tombstone set is empty — every item lives in a static partition the copy carries | hard | at the freeze, at every pool size | two counts per level, O(levels), after the rebuild |
| index levels and freshness: a batch wrote no index of a level coarser than its own, except the promotions and demotions it made, and left no static item of what it deleted, re-levelled, changed or moved to another partition unfiltered — each is tombstoned in the partition its home entry named and its successor lives in the grid of its current level (§3.3) | hard | batch-local | the commit record's index writes against its level and its `promoted` and `demoted` lists; each deleted, re-levelled, changed or re-partitioned item that had a static copy found in the tombstone set of the partition that held it (in a pool worker, the overlay's set for that partition) |
| pool scope: no district overlay wrote outside its district's scope; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| arena isolation: a batch wrote only the arena its `key` names, and no vertex, edge or face of one arena references a slot of another — the arenas share no topology and every cross-arena link is an entity id (§2.2 rule 1; the services read any arena, §3.4) | hard | by construction | an op handed another arena's slot fails an assertion in every build |
| seed tiling on a transient arena: the union of its faces equals the union of its seed rings as inserted, and every fixed edge — a seed ring's or a fixed ring's (§3.4) — survives every batch, so a storey's rooms tile exactly the wings that stand at its level and every exterior wall follows a wing-ring side, whether the storey was cut once or re-cut under §2.6's interior ladder (item 28 and 28 (f)) | hard | batch-local; at `readBack` | the commit record's removed edges against the fixed edges (none); at `readBack`, `area2` summed over the faces against `area2` summed over the seed rings, and every face ring inside one seed ring by `orient2d` |
| face corners ≥ `minFaceAngle` | soft for mandatory chains (`W_ACUTE_CORNER`), hard for optional chains | batch-local | touched corners |
| Euler characteristic per level (V − E + F = 1 + components) | hard | CI (B-FUZZ, B-EDIT) | whole arena |

These rows are the kernel's part of the §5.3 suite. Batch-local checks read only the commit record's faces, its moved,
promoted and demoted vertices, its changed and demoted edges and their one-ring, so a batch costs O(touched), never
O(model) (SCL-1); whole-arena checks run at stage end, at save or in CI; the freeze check runs once per freeze and the
pool check once per merge in O(overlay size). Class floors are the stages' invariants, stated as §3.2 (2) says (GEO-35).

**Nesting admits no exception (J-A30.31).** Nothing the plot model adds needs one. A passage under a building's wing
(item 30) is a face of one level in one parent — an L3 alley face beside the plots it serves, or an L4 site-plan part
inside the front plot, as §2.5 and §4.7 S10 declare — made by `splitFace` or `claimSubFace` as any alley or yard face
is; the wing overhead is a composition ring (§2.6), never a plat face, so no footprint straddles it and no level is
crossed; the rear plots it serves carry their `access` rows on the edges they share with it, and §5.3's reachability
walk crosses passage, alley and court faces through `faceNeighbours` (§3.4). A passage is never an L1 way: its L2
corridor would cut the footprint above it and split the block, and S10 never writes L1 (§4.1). A sealed passage (item
30 (e)) keeps its face and its edges — the seal is an attribute of the plot's record (§2.5, §2.8), not a change of
geometry. A building's rooms (item 28) are never plat faces either: they are cut on a transient arena (§3.4), so no
clicked building's plan enters an arena, an index partition or the model digest.

=== J-ROWS ===
| J-A12.31 | `kerb`, `corridorUnion` and `bandUnion` on every arena, the half-width read from the chain's linear entity — a tunnel's bore plus wall — so the tunnel's external wall is the kerb the underground plots front; no arena-specific band operation | §3.7 |
| J-A12.32 | a transaction writes one arena; the services read any arena by its key, so the underground reads the ground's water, walls and reservations without sharing topology | §3.4, §3.10 |
| J-A21.31 | the straight skeleton stays in-house; CGAL rejected on the stack and one-engine grounds, no longer on its licence (J-K5's licence clause superseded) | §3.1 |
| J-A28.31 | rooms and composed rings cut on a transient arena on the world lattice — never L4 plat faces, never a second lattice in the kernel; a wall moves by merge and split, so the seed rings are fixed by construction | §3.4 (with §3.3, §3.10) |
| J-A28.32 | the plan rung reads the skeleton as a `spine` reader only (room labels and lights); no fourth reader | §3.8 |
| J-A28.33 | a re-cut under the interior ladder is a fresh transient arena from the same seed rings (the shell), with the kept rooms and the fixed anchors as `fixed` rings — no re-partition operation, no arena that outlives its call, and no kernel text on the ladder itself | §3.4, §3.10 |
| J-A30.31 | a passage is a face of one level (an L3 alley face or an L4 site-plan part, the model's choice) with the wing above it a composition ring; no nesting exception, no new kernel operation; a seal is an attribute | §3.10 |

=== RATIONALE-A ===
| J-A12.31 | Chose to run `kerb`, `corridorUnion` and `bandUnion` unchanged on the underground arena — the half-width of a bounding chain read from the entity that owns its `(role, entity)` row, a way's width profile on the ground and a tunnel's bore plus its wall below it, so the tunnel is the underground street, its band the corridor and the band's outer ring (the tunnel's external wall) the kerb every frontage plot's lines end on — over a dedicated underground band operation or a per-arena kerb rule, because the owner's rule ("each plot can only occupy an adjacent space next to a sewer line … flush against the external wall of the sewer") is exactly what the ground's corridor construction already guarantees for a street's plots, one function on every arena is what §3.7 promises, and a second construction would give the underground a second attraction and placement behaviour to test (§3.7; item 12; amendments-b, kernel seat). |
| J-A12.32 | Chose to let a transaction write only the arena its `key` names while every service reads any arena by its key — the underground stage testing its bands, plots and buildings against the ground's water, wall, gate, keep and reservation faces by `pointLocate` and `resolve` on the ground's `PlatKey` — over cross-arena writes or copied ground geometry inside the underground arena, because §2.2 rule 1 already keeps the arenas free of shared topology and makes cross-arena links entity ids, the owner's surface constraints (no rooms under water, walls, gates or the keep) are pure reads, and a copy would go stale on the first ground edit (§3.4, §3.10; item 12 (c)). |
| J-A21.31 | Chose to keep the straight skeleton in-house and to re-ground CGAL's rejection on the stack and the one-engine rule — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be held byte-identical to §3.8's validated construction — over adopting CGAL now that the module's own GPL-3 licence (§17.3, item 21) makes its licence compatible, because the licence was never the load-bearing reason: J-K5's "no permissive, mature port exists" is superseded on its licence clause only, and every other ground of J-K5 stands (§3.1; item 21). |
| J-A28.31 | Chose to cut a building's rooms and composed rings on a transient arena — a one-level scratch subdivision on the world lattice, opened per derivation call, its seed rings the storey's wing rings, its writers the face partitioners, `warp` withheld so a wall moves by merge and split and the seed rings stay fixed by construction — over rooms as L4 plat faces and over a wing-local lattice inside the kernel, because plat faces would put every clicked building's plan into the arena, its index partitions and the model digest (a click would change the model, against §4.1 and §6.2), while a second lattice would give the kernel two placement rules; the plan rung's wing-local module is the planner's grid and every point still enters through `snap`, so the seed-tiling invariant (rooms tile the wings, exterior walls on wing-ring edges) holds exactly and the Dwellings synthesis's correction 12 is honoured (§3.3, §3.4, §3.10; item 28). |
| J-A28.32 | Chose to make the plan rung a `spine` reader of the skeleton only — each room's label spine and light point — over a fourth reader or a skeleton-driven wall partition, because every reader of skeleton output must carry a typed downgrade, a downgrade that moved a wall would break the tiling contract, and the cut patterns the synthesis proposes (bisection, parallel cuts, a corridor spine) need only `splitFace` on the wing's own axes (§3.8; item 28). |
| J-A28.33 | Chose to give item 28 (f)'s interior re-cut no operation of its own — a re-cut is the ordinary `transientArena` call opened from the same seed rings (the shell that item 31's geometry floor fixed), with the rooms §2.6's interior ladder keeps and the anchors that never move (the stair core's bay, the hearths' chimney stacks, a passage) passed as `fixed` rings and the rest cut, each step of a least-disruption chain its own open, cut and read-back — over a `repartition` operation that edits a kept arena, and over the route's "kernel: no new text", because no arena outlives its call (J-A28.31), so there is nothing to edit; a kept ring re-inserted on the lattice points it left with moves nothing and reads back byte-identical, which makes the least-disruption promise a property of insertion rather than of a new operation; the seed-tiling row then covers every re-cut without a new row, so the owner's "same building geometry but not the interior" is a checked invariant, not a convention; and the model seat, which runs next, needs the kernel form of a re-cut stated where the arena is defined, or it could assume a mutable arena against J-A28.31 (§3.4, §3.10; item 28 (f); amendments-b, kernel seat). |
| J-A30.31 | Chose to represent a passage through a building as a face of one level in one parent — an L3 alley face beside the plots it serves or an L4 site-plan part inside the front plot, the model editor's choice (§2.5, §4.7 S10) — with the wing above it a composition ring and a seal an attribute of the plot's record, over an L1 `passage` way and over an exception to the nesting invariant, because an L1 way's corridor would cut the footprint above it and split the block (and S10 never writes L1), a nesting exception would break the index-checked containment every level relies on, and the face form needs no new kernel operation: `splitFace` or `claimSubFace` makes it, `faceNeighbours` walks it for §5.3's reachability, and sealing changes no geometry (§3.10; item 30). |

=== END ===
