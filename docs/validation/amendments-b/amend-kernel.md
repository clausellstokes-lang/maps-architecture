# amend-kernel — lane amendments-b/amend-kernel (KERNEL part, §3)

PROGRESS (kill-safe ledger; one line per item)
ITEM 12: planned §3.4, §3.7, §3.10 | done REPLACE §3.7, APPEND §3.4, REPLACE §3.10 (landed 21:48)
ITEM 21: planned §3.1 | done REPLACE §3.1 (landed 21:48)
ITEM 28: planned §3.3, §3.4, §3.8, §3.10 | done REPLACE §3.3, APPEND §3.4, REPLACE §3.8, REPLACE §3.10 (landed 21:48)
ITEM 28 (f): planned §3.4 (the transient-arena paragraph: the re-cut's kernel form), §3.10 (the seed-tiling row), J-ROWS (J-A28.33), RATIONALE-A (J-A28.33) | done APPEND §3.4 (edited in place: the `fixed` comment + the paragraph "A re-cut is the same call"), REPLACE §3.10 (edited in place: the seed-tiling row), J-ROWS (+1), RATIONALE-A (+1) — blocks written 01:14 (gen_f.py, 6 asserted substitutions); report §Item 28 (f), §4, §6 written; receipts §5 (f) final (doc_checks on the rephrased copy: C1: 5 hits, 0 unreviewed;C2: 0 hits, 0 unreviewed;C3: 84 hits, 0 unreviewed;C4: 0 hits, 0 unreviewed;S1: 0 hits, 0 unreviewed;S2: 0 hits, 0 unreviewed; unreviewed=0)
ITEM 30: planned §3.4, §3.10 | done APPEND §3.4 (the `fixed` passage ring), REPLACE §3.10 (landed 21:48)

STATUS: COMPLETE (2026-09-26); UPDATED 2026-09-27 ~01:15 for item 28 (f), the interior ladder (the owner's message of
~00:50, routed 01:04) — the same 8 blocks, now carrying J-A28.33 (J-ROWS 7 rows, RATIONALE-A 7 rows); see "Item 28 (f)"
below, §4's (f) notes and §6 (the owner asked "what are your thoughts?"). Seat: Claude Fable 5.1, architect-editor of the kernel part (§3; rule families sewers,
licence, plan, hidden). Items: HOME none; REFERENCING 12, 21, 28, 30. Output: `docs/validation/amendments-b/blocks-kernel.md`
— 8 blocks: REPLACE §3.1, REPLACE §3.3, APPEND TO SECTION §3.4, REPLACE §3.7, REPLACE §3.8, REPLACE §3.10, J-ROWS (6 rows),
RATIONALE-A (6 rows). Every REPLACE block is the live subsection (`docs/ARCHITECTURE.md`, sha256 `7a4e19db…`) copied by
script with asserted single substitutions (`scratchpad/kb/gen.py`), so the diff the assembler will make is exactly the
change listed below; the whole block set was applied to copies with a test applier written to the BLOCK PROTOCOL and
checked (§5).

**Read whole:** items 8–31 of `docs/AMENDMENTS-2026-09-25b.md` (12, 21, 28, 30 in particular); `route.md` — how-to, summary,
the four items, rule families, cross-cutting duties, stale text, the item-28 reading list; `docs/ARCHITECTURE.md` §3
entire, §2.1, §2.2, §2.4–§2.8, §4.1, §4.6, §4.7, §4.11, §5.2 (F-PLOT, F-SKELETON), §5.3, §8.6, §13.1, §14, II.6, PART III,
the Delegated decisions, the Staged list and the one-page summary; `docs/OWNER-INSTRUCTIONS-2026-09-25.md`; the first sixty
lines of Part A of the rationale file; `research/findings/dwellings-synthesis.md` whole (it existed — landed 21:14 — so item
28 is designed against it: its corrections 11 (integer centimetres, no modelling cell) and 12 (rooms as rings cut on a
transient per-building arena, never plat faces) are honoured), `dwellings-posts.md` §0, `profile-dwellings.md` §0,
`dwellings-exports.md` §0, `_critic-dwellings.md` whole; `docs/validation/consistency/canon.md` home rules. Clean room:
no reference code, grammar, palette, room-name list or content table enters any block; nothing from `partitioned/`.

## 1 Per item — where it landed, the mechanism, the rulings

### Item 12 — underground neighbourhoods along the sewers (referencing; route asks §3.7 to confirm `bandUnion` and the corridor use on tunnel chains)

**Landed:** §3.7 "The kerb, defined once" — the half-width of a bounding spine is now read from the width the spine's
linear entity declares (a way's profile; in the underground arena a tunnel's bore plus wall), and a new passage "The same
functions on every arena (J-A12.31)"; §3.4 — a new paragraph "Arenas, keys and services (J-A12.32)" (item 12 (c)); §3.10
— a new row "arena isolation".

**Mechanism, in plain words.** The owner's rule — a plot may only sit next to a sewer line, flush against its outer wall,
and there are no access-only sewer alleys — is exactly what the ground already guarantees for streets: a street's
half-width is buffered off its centreline, the block's edge (the kerb) is where every plot's lines end, and plots are cut
from that frontage inward. The confirmation asked for is therefore a generalisation, not a new operation: `kerb`,
`corridorUnion` and `bandUnion` take the arena from the transaction's key and a chain from its (role, entity) row, so run on
the underground arena on `tunnel` chains they make each tunnel's band (bore plus wall) as its two half-corridor strips
with junction wedges, and the band's outer ring — the tunnel's external wall — is the kerb every underground frontage
plot's lines end on; §4.7 S10's frontage-first cut then does what it does on the ground. The half-width comes from the
entity that owns the chain (a way's width profile, a tunnel's `widthCm` plus II.6's wall-thickness row). The owner's
surface constraints (no rooms under water, walls, gates or the keep) are reads of the ground arena: every service takes
the arena it reads, a transaction writes only its own, and the arenas share no topology, so the underground stage tests
its bands, plots and buildings by `pointLocate` and `resolve` on the ground's `PlatKey` and never writes the ground.

**Rulings:** J-A12.31 (one kerb function on every arena, the width from the chain's entity, no underground band op —
touches D-13's "one arena per layer" by using it unchanged); J-A12.32 (cross-arena reads through the services only; no
cross-arena writes or copied ground geometry — §2.2 rule 1 applied).

### Item 21 — licence GPL-3 (referencing; route asks §3.1 to re-ground the CGAL rejection)

**Landed:** §3.1, the straight-skeleton row.

**Mechanism, in plain words.** The row no longer rejects CGAL for being GPL — the module's own GPL-3 (§17.3) makes that
licence compatible. It rejects it on the grounds that always carried the decision: the kernel is TypeScript on every host
(D-4; no WASM kernel, §3.7), a C++ library is not that, and its double-precision output could not be held byte-identical
to §3.8's validated in-house construction. The candidate column keeps its other entries; `robust-predicates` (Unlicense),
Clipper2 (BSL-1.0) and `polygon-clipping` (MIT) are GPL-3-compatible, so no other §3 row changes.

**Rulings:** J-A21.31 (skeleton stays in-house; J-K5's "no permissive, mature port" clause superseded on its licence
ground only; D-14's and §17.4's CGAL wording is scope's — cross-note).

### Item 28 — floor plans and elaboration by click (referencing; route asks §3.4, §3.8, §3.10 for the partition's geometry, a skeleton reader if any, and the tiling invariants)

**Landed:** §3.4 — "Transient arenas (J-A28.31)" with `TransientKey`, `ArenaKey`, `transientArena`, `readBack`, `release`;
§3.3 — `KernelTx.key` and `CommitRecord.key` become `ArenaKey`, `BatchScope` gains `{ kind: 'entity' }`, one sentence in
the protocol's prose; §3.8 — the `spine` reader's bullet names the plan rung's room label spines and light points as its
only skeleton use (J-A28.32); §3.10 — a new row "seed tiling on a transient arena" and the last sentence of the new
nesting paragraph ("rooms are never plat faces").

**Mechanism, in plain words.** A building's rooms must not be cut into the real map: if they were, every clicked
building would change the model's fingerprint, its index partitions and its saved geometry, against the rule that a
click only derives. So the kernel offers a transient arena: a small scratch subdivision on the same centimetre lattice,
opened for one derivation call from the storey's wing rings (two wings that abut share their joint as one edge — the
party wall), with the fixed rooms — the stair core's bay, a passage under the wing, a tower's round room — made first and
never cut. The plan then partitions with the ordinary face operations (`splitFace`, `connectHole`, `radialSplit`,
`ringBand`, `mergeFaces`, `absorbSliver`, `setOwner`) under the ordinary numeric rules; the seed and fixed edges can
never be deleted (`E_STRUCTURAL`) and nothing moves a vertex (a wall moves by merging the two rooms and re-cutting), so
the rooms tile the wings exactly and every exterior wall follows a wing-ring side by construction — the §3.10 row. The
result is read back as rings and edges (each edge tagged with the wing side it lies on and whether it is a joint) in
canonical order, so the plan depends only on the rings and the op sequence, whichever worker cut it; then the arena is
released and nothing of it survives. The plan rung's wing-local module (the synthesis's 50 cm default) is the planner's
grid: every point still enters through `snap` and the placement rule, so there is one lattice in the kernel. The plan
reads the skeleton only for a room's label spine and light point, so a skeleton failure degrades a label, never a wall.

**Rulings:** J-A28.31 (transient arena over L4 plat faces and over a second lattice — the synthesis's correction 12,
router question 3 answered for the kernel side; router question 2's scale: integer centimetres, the module a planner's
grid); J-A28.32 (a `spine` reader only, no fourth reader).

### Item 28 (f) — the interior has no floor: the interior ladder (referencing; added 2026-09-27 after the owner's message of ~00:50; the route update of 01:04 says "Kernel — no new text" and is ruled otherwise on one point, J-A28.33)

**Landed:** §3.4 — the `fixed` parameter's comment now names a hearth's chimney stack and, on a re-cut, the rooms §2.6's
interior ladder keeps; a new paragraph "A re-cut is the same call (item 28 (f); J-A28.33)" closes the transient-arena
passage; §3.10 — the seed-tiling row now reads "on the first cut and on every re-cut under §2.6's interior ladder alike".
Nothing else in §3 changes; the ladder's rule table, the unit, the capacity, the edits and the bars are other parts' (§3).

**Mechanism, in plain words.** The owner's principle — the prosperity floor binds a building's shell but not its interior
— is, on the kernel side, exactly the split the transient arena already makes: the seed rings are the shell (the wing
rings item 31's floor fixed), and everything inside them is cut afresh on every derivation. So a re-cut for new
occupants (a mansion let as lodgings; a tenement re-united) is neither a new operation nor an edit of an old arena — no
arena outlives its call (J-A28.31). It opens a fresh arena from the same seed rings, passes the rooms the ladder keeps
(least disruption) and the anchors that never move (the stair core's bay, the hearths' chimney stacks, a passage) as
`fixed` rings, and cuts the rest — the inserted corridor and the unit partitions with `splitFace`, as the first cut did.
A kept ring re-enters on the lattice points it left with, so the insertion moves nothing and it reads back
byte-identical — which is all "keeps its ring and address" needs from the kernel. Where the model derives the plan as a
chain of least-disruption steps (the route's recommended canonical `prior`), each step is one open, cut and read-back.
The seed-tiling invariant — the faces' union equals the seed rings' union and every fixed edge survives every batch —
therefore holds on every re-cut as on the first cut: the interior can change, the shell cannot, and that is checked, not
assumed. The unit-door rule ("a unit's door opens on circulation or the street, never through another unit's room") is
checkable on `readBack` alone, because every edge carries its two faces or `outside`: a door edge must have the unit's
room on one side and a circulation face or `outside` on the other. The capacity the ladder needs (floor area less the
circulation share, divided by the smallest unit form's minimum) is `area2` on the wing rings — an exact integer service
(§3.2 (6)), the same number on every host — which the base computes without the plan rung.

**Rulings:** J-A28.33 — a re-cut is a fresh arena from the same seed rings with the kept rooms and the anchors as
`fixed` rings; no `repartition` operation; ruled against the route's "no kernel text" on this one point, because the
model seat, which runs after the route update, needs the arena's contract for a re-cut stated where the arena is
defined, or it could assume a mutable arena against J-A28.31. The reading of the owner's last sentence ("the more rooms
for more occupying families the richer a building gets"), the ladder's rows, the unit's representation and `prior`'s
canonical form are the model seat's (route (f), questions 1–8; the route recommends the capacity reading) — the kernel's
only stake is that the capacity is an integer `area2` and that the kernel form of a re-cut is the same under either
`prior` ruling.

### Item 30 — hidden plots and clandestine places (referencing; route asks §3.4, §3.7, §3.10 to confirm the passage representation keeps planarity and nesting, and to name any operation option (ii) needs)

**Landed:** §3.10 — the paragraph "Nesting admits no exception (J-A30.31)"; §3.4's `transientArena` takes the passage
as a `fixed` ring (the passage room reserved before partitioning).

**Mechanism, in plain words.** A passage through a house is a face of one level with one parent — either an alley face
beside the plots it serves (the L3 form S10 (9) already makes) or a part of the front plot's site plan (an L4 part) — cut
by `splitFace` or `claimSubFace` like any alley or yard; the storeys over it are a composition ring, not a plat face, so
nothing straddles a level and the nesting check that every level relies on stays whole. The plots behind it get their
access rows on the edges they share with it, and the reachability walk (§5.3) crosses passage, alley and court faces
through `faceNeighbours`. The route's option (ii), an exception to nesting, is refused, and option (i) needs no new
operation. An L1 `passage` way is refused too (its corridor would cut the footprint above and split the block). Sealing
a passage changes no geometry: the face and its edges stay, the seal is an attribute of the plot's record.

**Rulings:** J-A30.31 (a face of one level, the level the model chooses; no nesting exception; no new operation; a seal
is an attribute — touches GEO-25 (alleys as L3 faces, kept), §4.1's "S10 never writes L1" (kept), the stage-3 union
contract (unchanged for the plat; the composition ring over a passage is §2.6's to state)).

## 2 Rulings — the J-A rows (ids)

Ids follow the protocol's `J-A<item>.<n>` form with n = 31, 32 — the "3" marks the kernel seat (§3) so that the parallel
seats' .1, .2 … numbering cannot collide. Rows: J-A12.31 (§3.7), J-A12.32 (§3.4, §3.10), J-A21.31 (§3.1), J-A28.31 (§3.4
with §3.3, §3.10), J-A28.32 (§3.8), J-A28.33 (§3.4, §3.10; item 28 (f), added 2026-09-27), J-A30.31 (§3.10); each has its Part A entry in the RATIONALE-A block, in plain
language, "chose X over Y because Z".

## 3 Already satisfied or not applicable to the kernel part

* Item 12 (a), (b), (d), (e), (f), (g), (h) — the plot depth, navigable-only tunnels, access shafts, occupants, lifecycle,
  depth and ceiling fields, and the generation order are the pipeline's (II.6), the model's (§2.1, §2.2 rule 1, §2.5–§2.7)
  and the rendering part's; the kernel needs no operation for any of them (access shafts are records linking arenas by
  entity id, §2.2 rule 1). "No sewer alleys" is a stage rule — the underground L1 carries `tunnel` chains and no `way` —
  with its invariant in §5.3; nothing kernel-side.
* Item 21 (a), (b), (d), (e) — scope's (§17.3, §17.4, D-22, D-14) and rendering's (§11.2, §11.3). Every §3 dependency is
  GPL-3-compatible already, so only the skeleton row changes.
* Item 28 (b), (c), (d) — the click policy, the elaboration cache and rung states, the export, the budget row and the
  bars are the model's, pipeline's, determinism's, rendering's and scope's. §3.9 needs no change (a transient arena has no
  `PlatKey` and is never stored); §3.6 needs no change (no move on a transient arena by design: `warp` is not offered).
* Item 28 (f) — the interior ladder's rule table (households per shell, unit rooms, shared and staff rooms, circulation,
  room sizes), the programme's inputs (the occupants' band and household count, never the geometry floor), the unit on
  the room record and the unit-door rule, the re-cut rule and the never-omit rule, the capacity, the edits, the `stale`
  marking and the §13 bars are the model's (§2.6–§2.9), the pipeline's (§4.11 `relet`, §10.2 rows), determinism's (§5.2
  F-PLAN, §5.3, §7.1, §7.3), rendering's (§11.1, §12.7) and scope's (§13.2). The kernel adds no operation: the corridor
  and the unit partitions are `splitFace` cuts, the anchors and the kept rooms are `fixed` rings, the capacity is `area2`,
  the door check reads `readBack`'s edges — stated once in §3.4's re-cut paragraph (above).
* Item 30 (a), (b), (d), (e), (f) — exposure, shares, knowledge, sealing by the engine and the edits are the pipeline's,
  model's, rendering's and determinism's. The kernel offers no sight-line query; "visible from a public way" as adjacency
  (an edge on a kerb or on an open public face, through the role index and `faceNeighbours`) is the form the services
  support — see the cross-note.

## 4 CROSS-PART NOTES (what another part's editor must add; the verifiers check both sides)

**model**
* §2.2 rule 1 (item 12): state the underground arena's level mapping — L0 one land face (the rock) bounded by the arena's
  outer ring, written by the sewer stage before any tunnel as S1 writes the ground's ring; L1 the tunnel centrelines
  (`tunnel` chains, never `way`); L2 the tunnel bands (bore plus wall) as half-corridor strips and wedges, and the faces
  between them as the underground's built blocks; L3 the frontage plots; L4 the buildings. §3.7 now says the kernel
  produces L2 from L1 there with no new operation.
* §2.7 / II.6 (item 12): a tunnel's corridor width is `widthCm` plus twice a wall thickness — declare the wall-thickness
  row (§3.7 reads "the width the linear entity declares … `Tunnel.widthCm` and II.6's wall-thickness row"). `Tunnel.kind:
  'passage'` and item 30's surface `passage` face are different things in different records — keep the prose apart.
* §2.6 (item 28): `BuildingGenerator.plan(…, k: Kernel, prior?)` opens one transient arena per storey — seed = the rings
  of the wings that reach the storey, `fixed` = the stair core's bay, a passage, a tower's round room — and writes back
  `readBack`'s rings and edges as `PlanRoom.ring`, `Wall` (kind from `seed` / `joint` / partition) and `Opening`; rooms are
  values, never plat faces (J-A28.31). The wing-local module is a table row the planner reads. A seed vertex the kernel
  reports moved (`W_ATTRACTED`, `W_PLACED` from `transientArena`) is an F-PLAN failure for the plan rung; its bar "walls
  equal the wing rings" is §3.10's seed-tiling row applied per storey. Please state in the composition contract that a
  composition's rings stand at least `attractCm` apart except where they share a joint, so the insertion moves nothing.
* §2.4 / §2.5 (item 30): the route's proposed §2.4 way class `passage` should be a **face kind** instead — an L3 alley
  face (S10 (9)'s form) with kind `passage`, or an L4 site-plan part — because §3.10 refuses an L1 passage way and any
  nesting exception (J-A30.31); the sealed state is an attribute of the plot's record (§2.5, §2.8), no geometry change.
* §2.6 (item 30): the plan rung reserves the passage as a `fixed` ring of the transient arena before partitioning; the
  passage's two ends are the building's entrances onto it (item 29).
* §2.6 (item 28 (f)): (1) `BuildingGenerator.plan(…, prior?)` passes the rooms the ladder keeps as `fixed` rings (owner =
  the room's id) together with the anchors — the stair core's bay, each hearth's chimney stack as a small ring (a stack
  is a footprint, not an edge: a hearth on a partition wall keeps its stack ring, so the wall segment it stands on
  survives), a passage; a room is "kept" only when its wing ring is unchanged (a shell mutation by item 18 keeps nothing
  in the wing that changed) — please state that guard; (2) the capacity (route (f) (c)) is `area2(Wing.footprint)`
  summed over the wings that reach each storey, exact integers (§3.2 (6)), less the circulation share as an integer
  fraction, never a float area, so every host computes the same capacity; (3) the unit-door rule reads `readBack`'s
  edges (`left`, `right`, `outside`); (4) under either `prior` ruling (a canonical chain, or the cached result) the kernel
  form is the same — a fresh arena per step — so the ruling is free of kernel cost except the step count (§12.7);
  (5) two row suggestions, the model's call: the rich row's staff rooms usually sit in an attic, a basement or a service
  wing rather than beside the owners' rooms on the same storey (a storey or side preference on the row), and a lodging
  house's shared kitchen or common room belongs on the ground storey by the stair core, the circulation hub.

**pipeline**
* II.6 (item 12): the underground strategy is the ordinary stages on the underground arena — `corridorUnion` on the
  tunnel L1 faces (S9's function), a frontage strip of the plots' depth taken from the kerb inward (`offsetFace`, or
  `bandUnion` with `edgeRole: 'band'`), then S10's frontage-first cut on the kerb; before each plot or room is committed
  the surface constraints are reads on the ground's `PlatKey` (`pointLocate`, `resolve`) — never a write; "no sewer
  alleys" = no `way` chain in the underground L1.
* §4.6 / §4.7 (item 30): S10's plot cut makes the passage face (`splitFace` or `claimSubFace`) and gives the rear plots
  their `access` rows on the edges they share with it. For "visible from a public way", choose adjacency — a plot is
  exposed when an edge of it lies on a kerb or on an open public face (the role index and `faceNeighbours`) — the kernel
  has no sight-line service and adding one is a new capability.
* §4.11 (item 28 (f)): `relet`'s bound is the smaller of the row's `households.max` and §2.6's shell capacity; the kernel
  supplies only the integer `area2` of the wing rings, so the bound is host-independent — nothing else kernel-side.

**determinism**
* §5.3 (item 12): invariant rows — every underground plot's `frontage` rows lie on exactly one tunnel band's kerb; every
  underground L1 chain carries `tunnel`; no underground face lies under a ground water, wall, gate, keep or reservation
  face (a cross-arena read by `pointLocate`); at least one access record per underground neighbourhood. The kernel
  supplies the role index and the query; the check rows are §5.3's.
* §5.3 (item 30): the reachability walk from every hidden plot through passage, alley and court faces to a public
  corridor uses `faceNeighbours`; a sealed access row is skipped by the walk, so the plot reads sealed (item 30 (e)).
* §7.1 (item 28): the plan's `moveWall` is `mergeFaces` then `splitFace` on the transient arena (no `warp`); `mergeRooms`
  is `mergeFaces` (refused across a seed edge); `splitRoom` is `splitFace`; the plan's concerns (§6.1, `plan.*`) fix the
  callback-form op order, which is what makes `readBack` deterministic.
* §5.2 (item 28): F-SKELETON's reader list and "where" column gain the plan rung (a `spine` reader: room label spines and
  lights; downgrade a sampled medial axis). The F-PLAN row (synthesis §2.2 step 5) is the determinism/scope seats'; the
  kernel's tiling row is its geometry bar.
* §5.3 and §7.3 (item 28 (f)): the two (f) invariant clauses the route names — every unit's entry door opens on
  circulation or the street; a re-cut leaves the wing rings, the stair core, the entrances and the hearths unchanged —
  are checked on `readBack` (the edges' `left`/`right`/`outside` for the doors; §3.10's seed-tiling row for the shell;
  the `fixed` rings for the anchors). §7.3's `prior` clause, whichever ruling the model seat takes, has one kernel form:
  a fresh transient arena per step with the kept rooms as `fixed` rings (§3.4) — the stale-click row should say the
  kept rooms are re-inserted, not that an arena is edited.

**rendering**
* §12.7 (item 28): the plan row counts opening a transient arena (O(seed vertices)), the cuts and the read-back.
* §12.7 (item 28 (f)): a re-cut chain costs steps × (open + cuts + read-back); the one-plan-per-click budget bounds
  the chain — the ladder has five rows and `relet` moves one household at a time, so the step count is small and
  known before the first open; §3.4 says "counted by §12.7's plan row" — please carry the clause.
* §8.4 / §11.1 (item 12): nothing kernel-specific — each underground depth level is a `z` band or elevation of the one
  underground arena (`PlatKey` part 0), not a second arena.

**scope**
* §13.1 (items 12, 28): kernel fixtures — `corridorUnion` on an underground fixture of `tunnel` chains (the kerb is the
  external wall; a plot line ending on it lands by attraction); transient arena: the seed-tiling `area2` identity after
  random partitions of rect, L, T and curved-quad rings; a joint side shared as one edge; a fixed bay with a slit and a
  cut; `mergeFaces` across a seed edge → `E_STRUCTURAL`; `readBack` order identical after slot renumbering; `W_ATTRACTED`
  reported for a seed vertex 20 cm from another ring's edge.
* §13.1 (item 28 (f)): a re-cut fixture — open from the same seed rings with three kept rooms and a chimney-stack ring
  on a partition wall as `fixed`: the kept rings and the stack ring read back byte-identical, `W_ATTRACTED` and
  `W_PLACED` empty for them, the faces' `area2` sum equals the seed rings' sum, the stack's wall segment survives; a
  second call with no kept rooms reproduces the first cut (the re-uniting bar's kernel half). §13.2's (f) bar 2 ("the
  shell stays byte-identical through any interior re-cut") is §3.10's seed-tiling row per storey — cite it rather than
  restate it.
* §14 (item 28): the `Kernel` façade gains `transientArena`, `readBack`, `release`; `plat`, `view` and `resolve` take an
  `ArenaKey`; the synthesis's `PlanBuilder` in `@plat/plots` calls them.
* §16 (item 28): price the transient arena on the kernel line (small — the arena type exists; open, read-back and
  release ≈ 2–3 days at M0/M1).
* D-14 and §17.4 (item 21): re-ground "Rejected: CGAL (GPL)" and "CGAL is excluded (its straight skeleton is GPL)" as
  §3.1 now does (stack and one-engine grounds); J-K5's Part A entry gains an amendment note that its licence clause is
  superseded by J-A21.31, as the consistency pass annotated other rows.
* §17.3 (item 21): §3.1 now points to §17.3 as the licence home; the "GPL-3-compatible" dependency rule is §17.4's.

**assembler**
* The reference resolver (`docs/validation/consistency/assemble-r0-refs.py`) defines J ids by `\|\s*(J-[A-Z0-9-]+?)\s*\|`
  and cites them by `(J-(?:[A-Z]+-?)?\d+)(?![\d])`: neither admits the dot of the protocol's `J-A<item>.<n>` form, so
  every dotted id (this seat's six and any other seat's) reads as a broken reference. Widen both — `J-[A-Z0-9.-]+?` and
  `(J-(?:[A-Z]+-?)?\d+(?:\.\d+)?)(?![\d.])` — before the pass's reference check; the twelve entries the unmodified script
  reports on my copy are all of this kind (0 broken § pointers, 0 broken D ids).
* The RATIONALE-A rows are rows of Part A's `| id | call |` table and must follow the `J-I19` row directly (no blank line
  between), which is what the test applier did.

## 5 Verification receipts

**CONFIRMED (executed).** `scratchpad/kb/gen.py`: every substitution asserted exactly one match against the live document
(sha256 `7a4e19dbae731d3e…`). `scratchpad/kb/apply_test.py` on copies, to the BLOCK PROTOCOL (REPLACE, APPEND TO SECTION,
J-ROWS after the index's last row, RATIONALE-A after Part A's last row): 8 applied, 0 skipped; document 9 669 → 9 747
lines, rationale 1 858 → 1 864; 12 diff hunks, 98 changed lines, exactly at §3.1 l. 1541, §3.3 l. 1649 / 1656 / 1658 /
1670, §3.4 after l. 2022, §3.7 l. 2279–2280 and 2305, §3.8 l. 2370–2371, §3.10 after l. 2495 and 2502, the index after
l. 9631, Part A after l. 322; headings 140 → 140; fences 88 → 90 (one new `ts` block, balanced). `doc_checks.py
--sections "3,Judgment calls"` on the copy: C1 5/0, C2 0/0, C3 84/8, C4 0/0, S1 0/0, S2 0/0 — the same 8 unreviewed C3
hits as the untouched document (corpus-growth false positives from the Dwellings lanes; none in my text — two earlier
drafts carried 10 and then 2 hits of mine, all rephrased away; receipts `dc-orig.txt`, `dc-new.txt`, `dc-new2.txt`,
`dc-new3.txt`). Reference resolver on the copy: the 2 baseline entries the untouched document has, plus the 12 dotted-id
entries explained above; no § pointer or D id broken. The blocks file is 627 lines; its hash is recorded at the end of
this file.

**PLAUSIBLE (reasoning only).** The mechanisms themselves — the transient arena's open/cut/read-back cost, the sufficiency
of the seed-tiling row under attraction (the kernel reports a moved seed vertex; the caller's contract decides), and
`corridorUnion`'s fit for tunnel widths with wedges at tunnel junctions — until §13.1's fixtures run at M0/M1.

**Final receipts (last run).** `blocks-kernel.md` sha256 `6c449bb89879db15…`, 629 lines; apply_test: 8 applied, 0 skipped, 12 hunks; doc_checks on the copy: C1: 5 hits, 0 unreviewed; C2: 0 hits, 0 unreviewed; C3: 84 hits, 8 unreviewed; C4: 0 hits, 0 unreviewed; S1: 0 hits, 0 unreviewed; S2: 0 hits, 0 unreviewed — unreviewed set identical to the untouched document's; resolver: 2 baseline entries + 12 dotted-J-A grammar entries, 0 other.

**Item 28 (f) update receipts (2026-09-27, CONFIRMED — executed).** `scratchpad/kb/gen_f.py` then `gen_f2.py`: 6 + 2 asserted
single substitutions on the landed blocks file (a header note; the `fixed` comment; the paragraph "A re-cut is the same
call" appended to §3.4's transient-arena passage; the §3.10 seed-tiling row; the J-A28.33 index row; the J-A28.33 Part A
entry; then two rephrasings for C3) — `diff` against the landed file (`blocks-kernel.before-f.md`): exactly six hunks
(3a4,6 368c371 395a399,409 592c606 617a632 625a641); the file is 644 lines, sha256 `5cfc335eb21cfebc…`, ends with
`=== END ===`. `apply_test.py` on copies of the CURRENT live document (sha256 `1dbfd9d4f39723ee…`, the manual §9.5/§12.6
fixes included) and rationale: 8 applied, 0 skipped; document 9 668 → 9 759 lines, rationale 1 858 → 1 865; headings
140 → 140; fences 76 → 78 (the one `ts` block, balanced); 12 document hunks at §3.1 l. 1541, §3.3 l. 1649 / 1656 / 1658 /
1670, §3.4 after l. 2022 (+58 lines), §3.7 l. 2279–2280 and 2305, §3.8 l. 2370–2371, §3.10 after l. 2495 and 2503, the
index after l. 9630 (7 rows), and Part A after l. 322 (7 rows) — the same anchors as the 21:48 landing, so the §3
pre-images are unchanged since 7a4e19db. Reference resolver (`assemble-r0-refs.py`) on the copy: 16 entries = the live
document's own 2 (external `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6) + 14 of the dotted-`J-A` grammar kind (7 in-text
citations, 7 index rows — the widening flagged in §4 "assembler" still applies; the script's patterns at l. 15 and l. 36
are unchanged); 0 § pointers and 0 D ids of this seat's broken. `doc_checks.py --sections "3,Judgment calls"`: the live
document is C1 5/0, C2 0/0, C3 84/0, C4 0/0, S1 0/0, S2 0/0 (exit 0); the first (f) copy was C3 86/2 — "rule 2 6 5 3"
(the tokenised "rule (§2.6; §5.3)") and "side on the first cut" — both rephrased rather than allowed; the re-check on
the rephrased copy (`kb/dc-new-f2.txt`): C1: 5 hits, 0 unreviewed;C2: 0 hits, 0 unreviewed;C3: 84 hits, 0 unreviewed;C4: 0 hits, 0 unreviewed;S1: 0 hits, 0 unreviewed;S2: 0 hits, 0 unreviewed; — 0 unreviewed lines; the assembler re-runs the same command after applying.

## 6 Thoughts for the owner on item 28 (f) — in plain words (the owner asked "What are your thoughts?")

1. **Yes, and the design was already built so that it can be true.** A building is two things: its shell (walls, wings,
   storeys, roof) and its interior (rooms, corridors, doors). The prosperity floor stops the shell from falling below the
   middle band. The interior has no floor: it is cut inside the unchanged shell each time it is derived, from the people
   who live there. When a neighbourhood grows poor the same grand shells stay and are subdivided — a hallway inserted, a
   door for each family, a bedroom and a place to cook each, down to single rooms — and when it grows rich again the
   partitions come out and one family has the whole house, with small staff rooms beside the large ones. That is where
   the poor live when every area is developed: the same geometry, a different interior. It is also how real cities did
   it (town houses let as tenements; the old town's "lands"), which is the design's tiebreaker when rules conflict.
2. **On the geometry side it is a checked guarantee, not a convention.** After every re-cut the rooms must tile the shell
   exactly and the shell's lines cannot be moved from inside; nothing new was needed — a re-cut is an ordinary cut with
   the kept rooms and the fixed things (the stairs, the chimneys, a passage) held in place.
3. **One sentence needs your confirmation:** "the more rooms for more occupying families the richer a building gets".
   Read literally it contradicts "more prosperity means a larger home for a smaller family". The programme reads it as
   CAPACITY — the richer a shell was built, the more families it can hold once it is let out — and the alternative is
   that "richer" was a slip for "poorer". Both keep the rule that more families in one building means poorer occupants.
   Say so if the capacity reading is not what you meant.
4. **Two consequences to be aware of.** (a) A district that grows poorer holds MORE people without one new plot, bounded
   by each shell's capacity (floor area less corridors, divided by the smallest apartment) — that mechanism is the
   answer to your original concern. (b) Going back up is reversible: re-uniting the households restores the earlier plan.
   If you would rather the subdivision left traces (a bricked-up door, a corridor that survives), that is a small rule
   to add, not a change of design.
5. **Two suggestions for the rows** (not decided; the model seat's call): in a rich house the staff rooms usually sit in
   the attic, the basement or a service wing rather than beside the owners' rooms on the same floor; and a lodging
   house's shared kitchen or common room belongs on the ground floor by the stair, where everyone passes. The poorest
   rung — a single room, no place to cook — should stay a table row a culture or era can change (a shared cookhouse in
   the yard, for instance).
