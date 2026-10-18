## §6 Determinism

*In plain words.* The same seed always makes the same town on any computer. Every decision is counted in steps, never
in seconds, so a slow or busy machine takes exactly the decisions a fast one takes; the few non-whole-number
calculations use a maths library that gives identical bits on every browser; and the town's fingerprint (its digest) is
kept up to date piece by piece, so checking it costs almost nothing. Every part of the town draws its random numbers
from its own stream, named by where that part came from — so adding a new kind of decoration or a new naming rule,
re-rolling one block, or growing the town by a stage never reshuffles what already exists. What is not promised: when a
release changes how an early step works (say, how side streets grow), the towns built on that step change too; the
release then says so, stage by stage. A town someone has edited keeps its edits across such changes anyway, because
every building, plot and district has a permanent address that follows it, separate from its random stream.

### 6.1 RNG and stream design

* **Engine:** xoshiro128\*\* per stream (four 32-bit words; period 2¹²⁸ − 1; fast in JS, no BigInt).
* **Keys are mixed from structured components, never from strings** (K-6 / R-1 kept). The **seed key** (128 bits) is
  derived once from the seed by four 32-bit-lane finalisers with distinct salts (all `Math.imul`). An entity's
  **entity key** — the mix of the seed key, its lineage hash (§6.3) and its arena key (layer and part, §2.2) — is
  computed once when the entity is minted and cached in the arena beside the lineage hash. Town-level draws — S0's
  feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town
  root's** entity key, the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index
  0), so they depend on the recipe alone and never on `docId`. Paint programs and furniture pass the reserved stage id
  `STAGE_VIEW` (0xffff) to the one mixer (§14 `Rng.stream`). A **stream key** is one finaliser round over the entity key
  combined with the packed components (stage id u16, concern id u16, reroll u16, attempt u8, epoch u16, salt u16); its
  four words seed the state directly (the all-zero state is replaced by a fixed nudge). A stream is created once per
  derivation and continued; a second request in the same derivation returns the same stream. No string is built on the
  generation path: the textual form `S11/siteplan@plot:7kq2m9x4c1b0a/arrangement[/r=1][/a=2][/e=0]` is rendered from the
  same components for reports only. *Budget:* ≤ 0.1 µs per stream key (string paths measured 0.73 µs). *Measurement:*
  the M0 (d) determinism spike times key derivation over a B-CITY city. *Pre-decided fallback:* derive a batch's stream
  keys in one vectorised pass over a typed array — output-neutral, so no golden moves.
* **The components:**
  - **lineage** — the entity's stream identity, its lineage key (§6.3); a surviving entity keeps it, so nothing that
    survives is re-rolled;
  - **concern** — what the draw is for (registry below); streams are never shared across concerns;
  - **reroll** — the scope entity's New random count, an absolute number stored in its identity and written into the
    `regenerate` event as an explicit per-entity map (the rerolls actually used, §5.1 (6)); children draw with their
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else. A user's reroll count
    is capped at 32 767; rerolls from 32 768 up are reserved for the faithfulness references (§7.3 item 7 (iv));
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll; its cap is declared per concern
    in the registry: 3 for every geometric ladder (tier 3), 8 for the naming re-draw of §9.6 (a repeated name re-draws
    on its own stream before taking a distinguishing suffix);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town);
  - **salt** — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1), for
    **rerollable** concerns only. A concern can be rerollable only if it is not a geometry concern and a registered stage
    or paint program reads it (a `StageDecl.streamKeys` entry or a paint program names it), and the registry marks which
    are: exactly `naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass` and `naming.emblem` (the
    last two read by the compass furniture program and the emblem generator, §9.5). `naming.quarter` and `style.random`
    are registered non-rerollable (a new `setStyle` event re-draws the random style, §8.2), as is every geometry concern,
    whose reroll is the regenerate action — so rerolling the trees or the names moves nothing else. `rerollLayer`'s
    concern type is generated from the registry, the recipe's initial salts are keyed by the same type and its schema
    refuses any other key (§2.9), so no recipe, link delta or log can give a geometry stream a salt; a CI test fails when
    a rerollable concern has no reader (J-DET-22). A town-wide `rerollLayer` sets the concern's town salt; an
    **ids-scoped** `rerollLayer` of `naming` re-draws only the names of the entities it lists, each with the per-entity
    salt the event carries in place of the town salt. Every other name draw takes its salt by §6.3's draw case — the
    town salt for an entity with no predecessor, the salt its naming record holds for a changed naming input — so a
    name's salt is never in the model digest: the event that set it holds it, and the naming record caches it (§2.8).
    Label candidates are geometric (S13a, §9.3) and label placement is a deterministic greedy over a total order (S13b,
    §9.2), so no draw reads a labels stream and none is registered: "reroll the labels" is not offered, and re-placing a
    label is `moveLabel`.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2) — use the class's registry entry as the derivation unit and the ordinal as the creation index, through the
    same mixer.
* **Concern registry (G-P6):** adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Each entry declares its reader stages,
  whether it is rerollable and its attempt cap. Initial concerns: `terrain.noise`, `terrain.controls`, `water.coast`,
  `water.river`, `water.islands`, `water.delta`, `site.centre`, `blueprint.features` (S0's per-rung feature draws,
  §4.2), `intent.surprise` (§7.7), `gate.pick`, `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water`,
  `roster` (with the ordinal-keyed `roster/<class>/<ordinal>` draws), `route`, `growth.heading`, `growth.branch`,
  `growth.mainroad`, `growth.curvature`, `district.seed`, `district.type`, `alloc.district`, `alloc.block`,
  `field.chance`, `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt`, `plot.width`, `plot.join`,
  `plot.vacancy`, `plot.bounds`, `siting`, `siteplan`, `siteplan.template`, `heights`, `material`, `greenery`, `fields`,
  `crop`, `forest`, `hinterland.outside`, `hinterland.decor`, `pin.centrepiece`, `pin.decor`, `pin.stall`, `people`,
  `content/relations`, `naming`, `naming.quarter`, `naming.emblem`, `warp.jitter`, `epoch.transform`, `island.place`,
  `sewer`, `style.jitter`, `style.crowns`, `style.compass`, `render.instances`, `style.random` (the random-style draw of
  §8.2: creation index = the `setStyle` event's `seq`, attempt 0–2), `render.stampTiles` (the stamp-tile library of
  §8.10: non-rerollable, attempt cap 0; keyed by a constant entity key over (stamp-tile domain, decoration class index,
  the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band), with
  `STAGE_VIEW`; read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and
  in a worker only by the fallback rebuild of a tile whose hash differs; appended, so no other key moves).
  `alloc.district` also draws S7b's edge-green-or-orchard choice per district, and `island.place` the sky allocations'
  areas (§4.5 S7b (4)–(5)); neither choice has a concern of its own.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct; the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12
  uniforms — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time
  helper), `fuzzy(f)`, `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea).
* **Decoration** (the instance model is §8.10's): trees, scatter, crowns, roof detail and hatch phase are keyed by the
  entity's **render key** — the low 64 bits (words 0 and 1) of its entity key (§8.1 item 5) — and the **instance
  ordinal**, never by LOD band; the stamp-tile library and each entity's stamp placement are §8.10's, so nothing
  re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance` events, §7.1) and the
  current positions of positional overrides in the entity's override table, which a warp or a vertex move carries with
  the ground (§7.4).
* **Enter** creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe —
  params, intent, character, entry mode, table pins, packs — without edits, locks, assignments or salts; when the
  current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

### 6.2 What a seed determines, and the model digest

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe (§2.9's `Recipe`,
which holds every model-affecting input that is not an event) or a rebased state, and the log is folded in order
(§7.4). Tables, presets and styles a host supplies are not in the recipe: they arrive as logged `editTable`,
`editPreset` and `setStyle` events whose content is copied into the log (§6.5 (8), §7.6); packs a later `adjust` adds
are named by that event and belong to the document's pack set (§2.9). Nothing else reaches the model:

* no wall clock — every output-affecting limit is an operation count (§5.1 (5));
* no host text engine — label **placement** (S13b) is view data, derived per zoom stop from the model's names,
  `LabelEntity` records and the bundled fonts' own metrics (§9), and is not in the model digest;
* no viewing order — a stage may be lazy only under §4.1's laziness contract, tested by the derived-complete digest
  (§6.5 (9));
* no worker timing — results merge in lineage order (§6.3);
* one boolean and offset engine per output version on every host (§6.5 (7));
* no host code — a host provider's outputs are read from the document's `hostContent` block on replay (§6.5 (8));
* no installed pack — every pack of the pack set is resolved by content hash as §2.9 states;
* no machine preference read at run time — user-global preferences are folded into the recipe when the document is
  created (§7.6).

Two machines or browsers produce identical model digests (O2 a); two renders of one model are pixel-identical at a given
backend, DPR and style version.

**The model digest is a Merkle digest over the eager model's content only.** The **eager model** is everything the
city LOD draws plus the town-level `Allocation` and `FieldBands` records (§4.5, §4.7); lazily derived content
(close-ups, people, stage-3 compositions) enters the digest when an edit materialises it.

```
leaf(record) = H128(kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags ‖ attributes in schema order ‖ digests of the faces and chains it owns)
node(n)      = H128(tag(n) ‖ digests of n's children, sorted by address id)
root         = node(model), per layer:
               site      — terrain raster, fields, L0 water
               network   — ways, junctions, walls, gates, towers
               districts — district → block → plot → buildings, yards, households, pins
               hinterland, content (Allocation, FieldBands, institutions, factions, relations), names and LabelEntity records,
               closeups (edited close-ups only)
               identity  — tombstone ids and supersededBy links, the lifecycle event block
               plats     — per arena and per level, the kernel's level digests
```

* **Geometry is hashed once, by the kernel, per level.** Each arena keeps a digest per level over its level-n route —
  vertices, roles, face owners and kinds of level ≤ n, never arena slots — updated along each commit record's dirty set
  (§3.3). A finer level's Steiner vertices belong to that finer level's digest, so deriving L3 never changes the L2
  digest. Per-level digests read each vertex's and each edge's *current* birth level: a promotion (§2.2 rule 3) moves a
  vertex into the coarser level's digest from that commit on and a demotion moves a vertex or an edge back out of it
  (the neighbour step's reversal restores the kerb's L2 digest exactly), and kept finer content (§3.3) keeps its digest
  leaves through a coarser re-derivation. An entity's leaf takes the digests of the faces and chains it owns (its
  `FaceRef` and `ChainRef` resolved), so no coordinate is hashed twice. Coordinates enter in canonical order (a level-n
  ring from its lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's key, so deriving a finer level
  never re-orders a coarser digest's input); integers enter as 32-bit lanes, doubles as their IEEE-754 bit patterns
  (−0 normalised to +0; NaN refused by the schema), strings as UTF-8 — no text serialisation on the digest path, and no
  dependence on byte order.
* **H128** is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with seed 0, so the digest's hash is specified exactly, as
  `H32` is (§13.6 (2)).
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance, derivation records and naming records (the provenance digest, §2.8; the
  persisted records form the records digest, below); `style`, `view`, `derived`, `hostContent` and telemetry (§2.9);
  label placement decisions (S13b, view data, §9); and close-ups never edited — a close-up is a pure function of its
  district's committed state, its sub-seed, strategy and params, and enters the digest under `closeups` with its first
  edit (§7.4).
* **Maintenance:** at every batch commit the kernel re-hashes the leaves of the records the batch touched and the nodes
  on their paths to the root — O(touched × depth) — never by serialising the model (§3.3). The tree is built by the
  generation run in a session and, for a loaded document, by the load's one full recomputation from the decoded
  snapshot under the model packages of the document's own output version (§2.9 step 3) — the snapshot stores only the
  root — so every edit, from the first one after opening, maintains a complete tree. Its memory is counted in §12.8's
  entity-store line. The canonical text serialisation (sorted keys, integer coordinates, floats as shortest round-trip
  strings) is used only for golden files and exports.
* **The records digest.** The persisted derivation and naming records (§2.8) form a second Merkle tree beside the
  model's: one leaf per record — `H128(id ‖ record kind ‖ its fields in schema order ‖ each cited slice as (table,
  version, kind, key, hash))` —, one node per static-index partition (§3.3) plus one **town node**, each over its
  records sorted by address id, and a root over the nodes. A record belongs to the node of its entity's partition — its
  district's, or the partition outside districts — and the records of entities that belong to no partition (ways,
  walls, water bodies, districts) to the town node. The tree is maintained as the model tree is: a batch re-hashes the
  leaf of every record it rewrites and that leaf's node, and a batch that moves an entity between nodes — a re-parent
  across districts, a district merge or split, `outskirtToDistrict` — moves its records' leaves from the old node to
  the new and re-hashes both, although no record changed. The root is finalised when read, stored in the snapshot as
  `recordsDigest`, and recomputed by every load with the model tree; its memory is counted with the model tree's
  (§12.8). Its leaf encoding belongs to the file schema, not to an output version — the records are stored inputs, not
  derived output — so any version checks it, and a schema transform that changes a record column (§7.5) checks the old
  root and writes the new one. Recomputation measured ≈ 4 ms at CITY and ≈ 11 ms at METROPOLIS for ≈ 10 900 derivation
  and 3 500 naming records at CITY (≈ 29 300 and 9 500 at METROPOLIS), on a synthetic, schema-shaped workload on the
  reference machine, two runs within 0.1 ms (`docs/validation/bench/fixall_det_r5_recordsdigest.out`) — PLAUSIBLE until
  M0 (d) times it in the engine, under the same 150 ms bar. The records digest is not a model digest: goldens, the
  locality checks of §7.3 item 7 (ii)–(vi) and the bridge's convergence read the model digest alone, while replay =
  session and truncation identity compare both (§6.5 (9), §7.3 item 7 (i)) (J-DET-49).
* **Bars (M0 d, decided before any golden is signed):** digest maintenance ≤ 5 % of each batch's own time at CITY; root
  finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY, the
  records tree's included — used by the CI oracle and by **every load** (§2.9 step 3). Measured ≈ 31–34 ms at CITY and
  ≈ 95–101 ms at METROPOLIS for the model tree (the records tree's ≈ 4 and ≈ 11 ms more, above), on a synthetic,
  schema-shaped workload on the reference machine (`docs/validation/bench/fixall_det_r4_loaddigest.out`) — PLAUSIBLE
  until M0 (d) times it inside the engine. Each bar has its own *pre-decided fallback*, and none moves a golden, because
  the root is a pure function of the leaves whenever it is computed:
  (i) *maintenance* over 5 % — leaves are re-hashed at the next coarser batch boundary (per district instead of per
  block and plot); the root at every stage end is unchanged;
  (ii) *root finalisation* over 5 ms — the layer nodes (site, network, districts, …) stay maintained at every commit,
  and the root over them is finalised only when it is read: at save, at the end of a verification replay, at export, on
  an API digest request, and at each stage end of a CI golden run;
  (iii) *full recomputation* over 150 ms — the CI oracle recomputes, per run, one subtree per layer chosen by the run's
  seed (so every subtree is covered across nightly runs) and compares it with the maintained node; and the load's
  recomputation leaves the edit path without leaving the load. The load takes a copy-on-write checkpoint of the decoded
  state at **`h₀`** (§7.4's checkpoints), makes the working state editable at once, and recomputes the model tree and the
  records tree from the checkpoint in the generation worker between edits. Each edit made before it finishes keeps its
  touched set (§7.4); when it finishes, the leaves those edits touched are re-hashed on the new trees in log order,
  which yields the working state's trees. Their roots at `h₀` are compared with `model.digest` and
  `model.recordsDigest` exactly as in §2.9 step 3: a mismatch is a corrupt cache, the replay's state replaces the
  working state when it reaches the head, and the edits made meanwhile are re-applied to it in log order as "take the
  replayed town" re-applies them (§2.9 step 4), their fates recomputed and differences reported. Until the roots have
  matched, nothing is reported verified, "trust the saved town" and step 4's keep are shown disabled, and a save (which
  records the maintained roots), an export, an API digest request and a bridged client's comparison of its root with a
  `rebase`'s `stateDigest` wait for the recomputation and complete when it does; edits do not wait. A mismatch withdraws
  the keep for good — a corrupt cache is never a base (J-DET-40, J-DET-45). A New random made meanwhile computes its
  scope's content digests from the scope's own leaves (§5.1 (6)), which needs no tree.

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels,
households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when
an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
  creation index, the derivation unit's reroll[, dup]); `lineageHash` is its 64-bit hash, cached in the arena. The
  **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry: the town
  for S4 routes (in destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance
  order); the L1 cell a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; the block for S10
  plots and alleys; the plot for S11 buildings, yard parts and households; the household for people (member ordinal);
  S6's run for `Seam` records (creation index by the run's lowest-then-leftmost vertex); the S5c growth run, the
  district's S8 run (for `baseLane` portals) or the creating edit for portals; the creating edit event (its `seq`) for
  anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water bodies,
  bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order of that
  unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost lattice
  point).
* **Address id** = `kind:token`, prefixed `<layer><island>/` outside the ground layer (`sky2/plot:…`,
  `under/tunnel:…`). For a generated entity the token is the base-32 form of its lineage hash at creation (13
  characters); for a user-created one it is the hash of the creating event's `seq` and its ordinal. The address is
  opaque: the parent is a field and is never parsed from the id (J-DET-1).
* **Never reused; one collision rule.** Minting runs after the succession matching below. A fresh entity whose natural
  address equals a live address, a tombstone, or an address its own batch retires takes the suffix `~k` with the
  smallest free k. A fresh lineage key equal to that of a live entity outside the batch's re-derived set (a survivor —
  a locked plot, say) takes the smallest free `dup` component, so no two live entities share draws; the entities the
  batch itself replaces are not collisions, which is what lets a faithful Regenerate (keep settings) re-mint their
  lineage keys, match them by anchor and reproduce them exactly. Collisions are resolved in the batch's canonical order
  (records sorted by lineage hash), so the session and a replay resolve them identically. An address that an `undo`
  withdraws (§7.4) is free again, but only the same derivation — the same unit, lineage and reroll, which is what a
  `redo` or a repeated New random re-runs — can mint it, so nothing is re-bound to an unrelated entity.
* **Carry-over — survival and succession.** Whenever a scope is re-derived (regenerate, Adjust, re-derive from Sk, a
  local operator of §7.3, template replacement, migration, an epoch):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited or
    assigned, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its draws do not
    change); only its `parent` field and a `reparent` lifecycle event change;
  - an entity that **is re-derived** is matched to the fresh entities by its anchor: the fresh entity with the same kind
    and class family whose anchor lies nearest within the kind's hysteresis radius **succeeds** it — it takes the old
    address and the old generated name with its naming record (every reference re-binds to it; §7.3 item 4 decides which
    overrides move with it) and keeps its own fresh lineage (its draws are the new ones: New random really re-rolls); a
    `carry` event records the lineage change, and the same batch re-owns the successor's faces and roles under the
    address (`setOwner`, `retypeEdges`, §3.4), so geometry and address move together;
  - an old entity with no successor becomes a **tombstone** in the archive (§2.8) whose `supersededBy` names the fresh
    entity covering its anchor point, if any; a fresh entity with no predecessor keeps its fresh address;
  - lifecycle events are written only for changes (existence, flags, a lineage change, supersession, re-parenting), so
    a re-derivation that reproduces its entities exactly leaves the model digest unchanged (J-DET-2).
* **Names follow the address, and follow their inputs.** A generated name — its text and short form — is handed to a
  successor with the address, together with its naming record (§2.8: the naming slices its last draw consulted and the
  salt it used), as a lock or an assignment is; so the bridge a river edit re-sites, the street a New random re-cuts and
  the district a boundary edit regroups keep their names. S13a **draws** a name only in four cases:
  1. for an entity with no predecessor, with the town salt;
  2. for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  3. for the entities an ids-scoped `rerollLayer(naming)` lists (§7.1), each with its per-entity salt: the dry run gives
     each listed entity the salt one above the largest its name has been drawn with (the town salt and every earlier
     ids-scoped salt the log gave it), and a re-drawn name equal to the old one advances that salt once more, up to
     `reroll.maxAdvance` times (§5.1 (6)); the event stores the salts actually used, so a replay repeats neither the
     choice nor the advances;
  4. for an unedited generated name whose **naming inputs changed**, with the salt its naming record holds. Case (4)
     runs whenever S13a runs over the name's entity: after an `adjust` of the pack list (a pack added or removed, a
     corpus selected or deselected, §7.6); after an `editTable` or `editPreset` that changes a naming slice (§7.6); in an
     upgrade's mapping (§7.5); in a `frozenImport` rebase (§2.9 step 2), over every unedited generated name; at the event
     that ends the name's protection — an `unlock` or an `unassign` that frees it, or an `undo`, `redo` or `revert` whose
     result removes the `setAttr`, `lock` or `assign` that held it (§2.8's dormant record); and in any re-derivation
     whose scope reaches S13a. It compares every slice the name's naming record cites with the current effective tables,
     and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row), re-draws the name.

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6). Every draw uses the entity's `naming` stream — keyed from
  its entity key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew. The
  renames of case (4) are confirmed like fates: the dry run lists each, old and new text side by side, in the edit's
  fate report with its other unprotected consequences, the edit commits after the user confirms them (an action whose
  dry run lists any returns `confirm`, a `frozenImport` rebase included), and the confirmed renames are stored in the
  event (`EditBase.renames`, §7.1). A replay or a receiving client re-draws them identically, because the draw is a
  function of the stream, the salt and the inputs at that log position; one that computes different renames reports a
  mismatch under §7.3 item 4's rule. A user-set name (`setAttr`) is an edited attribute, a locked name path a fixed input
  and an assigned name held at its assignment (§7.7); none is re-drawn while protected, and each keeps its naming record
  dormant for the event that ends the protection (§2.8). When carrying or a re-draw brings two equal names into one
  uniqueness scope (§9.6 — a district merge that joins two lanes of the same name), the entity whose address sorts later
  re-draws on its own stream, and the rename is listed in the edit's fate report (J-DET-37, J-DET-46).
* **Anchors and hysteresis.** Matching is by distance, never by quantised cell: candidate (old, fresh) pairs within the
  radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one greedily in
  that order.

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| bridge | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, default 120 m) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |
| seam (NF-P6) | its two districts' addresses and its first chain's address | same pair and chain | — |
| portal | position | 1 m | portal kind (`baseLane`, growth, edit) |

  *Split through an anchor:* the child left of the directed cut keeps the id (§3.6 (5)). *Households and people:* a
  household's address survives a re-derivation of its plot by succession (anchor: plot address and ordinal), so a
  person's key — (household address, member ordinal, birth epoch), §10.3 — is stable wherever the household is.
  *Bridges:* when S1's water operator re-sites the crossings of an edited reach (§7.3 (b) 2), each old deck is succeeded
  by the re-sited deck nearest its old midpoint within the band, so the bridge keeps its name, its assignment and its
  way's reference. *Measurement (M1, B-EDIT-lite):* 1 cm perturbations of every vertex keep ≥ 99.9 % of addresses.
  *Pre-decided fallback:* the building and plot radii double to 1 m and an IoU ≥ 0.5 test joins the class-family check.
* **The matching routine, its budget and its fallback.** One routine hands addresses on in every re-derivation —
  scoped regeneration, Adjust, Re-derive from Sk (from S1 the whole town is re-derived and matched), a local operator,
  template replacement, epochs, migration and the upgrade mapping of §7.5. *Point-anchored kinds* (plots by frontage
  offset, buildings, blocks, cells, junctions, gates, towers, pins, bridges) are matched through a uniform grid per
  (kind, class family) whose cell is the kind's hysteresis radius, so every candidate of an old entity lies in its
  3 × 3 cell neighbourhood; candidate pairs are collected, sorted by (distance, old id, fresh id) and assigned greedily.
  *Overlap-anchored kinds* (ways without matched end junctions, enceintes, water bodies, greenery, land use) take their
  candidates from the kernel's spatial index (§3.3) and compute the overlap on those candidates only. *Budget:* ≤ 2 µs
  per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of
  §12.6. Measured on synthetic anchor sets (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`): 0.60 µs
  per entity for a 450-building district regeneration, 0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs when the
  fresh town is unrelated to the old one) and 0.59 µs for an 80 000-entity METROPOLIS mapping at a 2 m radius.
  *Measurement (M0 d, then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):* the routine inside the engine, on real
  anchors, per kind. *Pre-decided fallback:* matching runs per static-index partition (§3.3) — each old entity's
  candidates are first taken from the fresh entities of its own district's partition, and only the entities left
  unmatched are matched across partitions — which bounds every grid by one partition; because an entity near a district
  boundary can then take a farther candidate inside its own district, the switch is a declared shift (§6.4).
* **JOIN and SPLIT.** A joined plot takes its address by the anchor rule from the member whose frontage anchor it keeps;
  the other members become tombstones with `supersededBy` = the joined plot, and `members` is history. A later SPLIT
  **resurrects** a member whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a `resurrect`
  event, safe because a JOIN's member ids were never given to another entity.
* **Document identity.** `docId` (a UUID) is minted when a document is created, kept on save, and re-minted on clone
  and save-as; addresses are document-scoped, so a clone keeps them. At the API and bridge boundary every id is rendered
  `<docId>/<id>`, so a host holding two towns never confuses their plots. Exports carry addresses and a supersedes table
  (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order.

**The scope of stability, stated** (O2 b, e):
1. *Independent concerns* — adding or changing a concern (a decoration layer, a name grammar, label rules) changes no
   other concern's draws; changing a naming input re-draws only the names whose records cite it (case (4) above).
2. *Scoped rerolls* — New random on a scope changes nothing outside its effective scope (§7.3).
3. *Upstream changes* — a change to stage k's code or tables changes stage k's outputs and, through their lineage and
   inputs, what is derived from them: a declared cascade shift (§6.4, §13.3), never a silent one; stages upstream of k
   and independent of it stay byte-identical.
4. *Edited documents* — stability across such changes comes from carry-over by anchor and from migration (§7.5), never
   from stream keys.

*Measurement (M0 d and M1):* minting and matching within the budget above; B-EDIT fixtures for `drawBoundary`, district
merge and split, `outskirtToDistrict`, regenerate around a lock, a course-knot move that re-sites a bridge (the bridge
keeps its address and name), New random on a district (every matched successor keeps its name; only entities without a
predecessor draw one), a district merge that joins two equal lane names (the later address re-draws, reported), and the
recycling case (a superseded, assigned building whose creation slot is reused) — 0 duplicate ids and 0 silent re-binds
(every reference resolves to its successor or is reported). The naming-input fixtures are §13.2's.

### 6.4 Permalinks, version axes, retention and goldens

**Version axes.**
* **Output version** (`o<k>`) — the observable output of the model packages. It bumps exactly when a release declares a
  shift (any stage digest moves on the golden suite, §13.3); a release that changes no output keeps its output version,
  so its documents, links and goldens stay valid. Every document and link names the output version it replays under.
* **Generator version** — the code build; informational (bug reports), never a replay key.
* **Schema version** — the file format (§7.5).
* **Preview flag.** Links and documents made before output version 1 (fixed at M4's exit, §16) carry `preview: true`
  (in a link, `&pv=1`), and the app shows the preview notice of §13.3; the flag disappears from output version 1 on.
* **Table versions** — each rule table separately, pinned in the recipe; a table change that changes output is part of
  an output-version bump. A user override carries its base row's hash (§7.6).
* **Pack versions** — each setting pack by id, version and content hash, in the recipe or in the `adjust` event that
  adds it (§2.9's pack set). The shipped packs belong to the output version like its tables (each retained version's
  chunk carries its own); a non-shipped pack's content travels in the document, a pack a later version stops shipping
  is copied into the document by the upgrade to that version (§7.5), and a selected user corpus is a non-shipped pack,
  `user:<content hash>` (§2.9).
* **Style version** — style sheets; changes pixels, never the model digest; carried in a link for pixel identity.

**Permalinks.** A link carries the canonical recipe, never a pointer to machine state:
* `?o=<output version>&s=<seed, base 36>&z=<rung>` when the recipe is the output version's defaults apart from seed and
  rung (watabou's one-line link kept);
* otherwise `&r=<base64url of the deflated CBOR recipe delta>` (params with preferences folded in, intent, character,
  entry mode, the rerollable concerns' salts — keyed and schema-checked as `Recipe.salts`, §2.9 — and the table pins and
  packs that differ from the output version's shipped ones, packs by id, version and hash);
* `&l=<base64url of the deflated CBOR log>` when the town has a log (edits, locks, assignments, style edits, undo and
  redo — a blueprint's assignments are log events, §7.7), and `&st=<style id@version>` when the style is not the
  default.
* **A link is emitted only when it can rebuild the same town and picture on any machine**: every pack of the document's
  pack set (§2.9 — a corpus once selected and later deselected included) is shipped with the link's output version;
  **the base is the recipe** (a rebased town is not seed-reproducible before its rebase, and a link replays the recipe
  and the log); `hostContent` is empty; the style sheet is shipped; and the whole URL fits in 2 000 characters.
  Otherwise the app says which condition failed — "this town uses the setting pack X, which is not built in", "this
  town uses your own name list X" (also when the list was deselected: its selection is still in the town's history),
  "this town uses content from the host program Y", "this town was kept from a saved copy and cannot be rebuilt from a
  link", "too many edits for a link" — and offers the `.plat` file, or `&doc=<ref>` when the host has configured a
  document resolver with `publish` (the `DocResolver` of §11.5); the document carries the pack content and the host
  outputs (§2.9), so the file reproduces the town without them. `preset=<id>` never appears: an edited preset elsewhere
  cannot change the town (J-DET-50, J-DET-17, J-DET-35).
* **CI:** link → recipe → link identity, and the model digest built from a link equals the session's digest. Refusal
  cases: a recipe naming a non-shipped pack; a town whose district names are drawn from a user-uploaded corpus selected
  after creation (a `user:<hash>` pack named only by an `adjust`); a town that selected such a corpus, deselected it,
  was saved and reloaded; a document with a host provider's output; and a town rebased by keeping the saved town after a
  forced load mismatch. In each the link is refused, and the `.plat` file opened by a library that has neither the pack,
  the corpus nor the provider replays to the session's digest (in the select-then-deselect case because the corpus's
  content stayed in `packs` while the first `adjust` names it; the rebased town reopening as the kept town, from its
  base state).

**Retention of old output versions.** The browser library ships the current output version's model packages and the
two previous ones (N−1, N−2) as lazily loaded, tree-shakable chunks (`@plat/*-o<k>`; an embed may leave them out); the
Node CLI replays any published output version by installing that exact package version. A document or link inside the
window replays exactly. Outside it, a document opens as a frozen view (§2.9 step 2), checked by its chunks' content
hashes only and labelled "made with o5; not verified by this version", because its recorded root was computed by o5's
model packages, which only the CLI still installs; a link — which has no snapshot — opens under the current output
version with a visible notice ("made with o5, shown with o8; differences are expected") and the CLI command that replays
it exactly. Nothing changes silently. The same window bounds what the browser can undo by replay (an upgrade, a rebase
onto an older version, §7.4): outside it the undo is withdrawn there with the CLI command shown. *Measurement (M3a):*
each retained output version adds ≤ 150 KB gzipped to its lazy chunk; the golden suite replays under N−1 and N−2.
*Pre-decided fallback:* the browser window shrinks to N−1 (the CLI keeps every version).

**Goldens** (§13.3 builds the tooling from M1). **Stage-isolated goldens:** the golden store keeps, per seed and stage,
the previous output version's frozen upstream outputs; a release computes each stage's digest by running the new stage
code on those frozen inputs, so only stages whose own code or tables changed can differ, and each such stage needs a
shift record. End-to-end goldens are re-signed only with a cascade record; both records and the protocol are §13.3's.

### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

1. Topology lives on integer centimetres with exact predicates (§3.2).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath`, the vetted fdlibm port (§3.1; D-23).
3. **The lint is an allowlist.** In model packages — and in every adapter or provider whose output reaches the model —
   the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround`,
   plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a bit-compared digest:
   `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and the S14
   builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`, `layer`,
   `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`) — and
   §8.10's instance function with every function it calls (the stamp, grid and line layouts, the per-instance look draws
   and the density edge test), which the model-format exporters and override resolution run in the generation worker
   and whose positions §13.3 compares byte for byte across engines. CI finds that code as the import closure of those
   implementations, column writers and the instance function, from the TypeScript program, so a module that joins it is
   linted without being listed; the rest of `@plat/render` — paint programs, backends, compositing — stays outside,
   because its output is pixels compared by visual regression (§13.3, §13.4). `**` is allowed only with a literal
   integer exponent from 0 to 4, and the build rewrites it into explicit multiplications (exponentiation is
   implementation-approximated in JavaScript); every other power goes through `dmath.pow` (S1's river-width law
   `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`, `performance`, timers,
   `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`, `localeCompare`, `Intl`),
   `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map` iteration order beyond
   insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`).
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers follow §3.3's overlay-and-merge protocol, merging in lineage order (§6.3); no result depends on arrival
   order, and no model package reads time (§5.1 (5)).
7. **One boolean and offset engine per output version, on every host** (D-14): no host may silently run a different
   engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers.** A table a host supplies arrives as an `editTable`, `editPreset` or `setStyle` event whose content
   is copied into the log with provenance `host` (§7.6). Host code registered as a provider (`ContentProvider`, §14)
   passes a double-run check at registration — the same request run twice in two fresh workers must return identical
   digests — and its results are recorded in the document's `hostContent` block, keyed by (provider id, version, input
   hash), and read from there on replay (§2.9, §11.4), so the document replays without the host. Setting packs follow
   the same rule through the document's `packs` block (§2.9).
9. **Determinism tests (CI):**
   * *cross-host* — identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off;
   * *time dilation* — the golden suite under a shim that scales every clock read × 10 and × 0.1 gives byte-identical
     per-stage digests;
   * *derived-complete digest* — every district's S10, S10b, S11 and S12b and the hinterland unit's (S12b named
     explicitly), derived for 50 METROPOLIS seeds in three random orders with pool sizes 0–3, give identical digests
     (the laziness contract, §4.1);
   * *op-order determinism* (§13.2) and *placement digests* (§13.3);
   * *headless = UI* (O11 f);
   * *replay = session* — replaying base and log gives the session's model digest **and records digest** on every
     B-EDIT sequence (§7.3 item 7 (i)), including the naming-collision fixture of §7.3 item 7 (i), sequences with undo
     and redo from several sessions, edits made during load verification under both choices of a forced mismatch (§2.9
     step 4), and edits made before a records mismatch, re-applied (§2.9 step 3);
   * *truncation identity* — a B-EDIT sequence folded with its undone pairs kept and with them truncated gives the same
     model digest **and records digest** (§7.4), including a redo followed by a user-created entity, whose address must
     be the same in both folds, a `setAttr(name)` + `undo` pair and a naming `rerollLayer` + `undo` pair each followed by
     a corpus selection — the naming records restored with the names (§2.8) — and a corpus selection + `undo`,
     truncated, saved, reloaded and redone, its pack still in `packs` (§2.9);
   * *links and documents without their inputs* — §6.4's pack, user-corpus, provider and rebased-town cases;
   * *checks under the recording version* — a `keptSnapshot`-rebased CITY document upgraded across a test output
     version whose field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays
     to the session's digest; a frozen view of a fixture written by a test build labelled o(N−3) opens with no mismatch
     message, while one with a chunk's bytes altered reports damage and refuses the `frozenImport` rebase (§2.9 steps
     2–3, §7.5);
   * the double-run check of registered providers (8), and the distinct-key test of §6.1.
10. **Second implementations.** *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer
    algorithm as the TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
    cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
    digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle. *The Clipper2-WASM
    engine* (§3.7's pre-decided fallback) is a different engine: it cannot reproduce the arrangement engine's integers,
    replaces it as the single engine on every host (7) with a declared golden shift (§3.7, §13.3), is pinned and
    vendored (4) and named in the report (§5.4); its determinism test is (9)'s cross-host one (J-DET-28).
