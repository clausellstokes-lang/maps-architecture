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
  0 — index 1 for a standalone neighbourhood document, V01 §2.8; item 340), so they depend on the recipe alone and
  never on `docId`. Paint programs and furniture pass the reserved stage id `STAGE_VIEW` (0xffff) to the one mixer
  (§14 `Rng.stream`). A **stream key** is one finaliser round over the entity key combined with the packed components
  (stage id u16, concern id u16, reroll u16, attempt u8, epoch u16, salt u16); its four words seed the state directly
  (the all-zero state is replaced by a fixed nudge). A stream is created once per derivation and continued; a second
  request in the same derivation returns the same stream. No string is built on the generation path: the textual form
  `S11/siteplan@plot:7kq2m9x4c1b0a/arrangement[/r=1][/a=2][/e=0]` is rendered from the same components for reports
  only. *Budget:* ≤ 0.1 µs per stream key (string paths measured 0.73 µs). *Measurement:* the M0 (d) determinism spike
  times key derivation over a B-CITY city. *Pre-decided fallback:* derive a batch's stream keys in one vectorised pass
  over a typed array — output-neutral, so no golden moves.
* **Stage ids** are u16, registered append-only and never renumbered, like the concerns: the base's stages; `S8.seed`
  (a template's seed ways and plazas, distinct from S8's so no seed's lineage key can equal a lane's of the same cell;
  reserved at M1, its first user at M5; items 340, 345); the evolution engine's `EVO_PRELUDE`, `EVO_HAZARD`,
  `EVO_FIELD`, `EVO_USES`, `EVO_DEPARTURES`, `EVO_DECLINE`, `EVO_FORT`, `EVO_TERRAIN`, `EVO_LADDER`, `EVO_MUTATION`,
  `EVO_SITING`, `EVO_GROWTH`, `EVO_WORKS`, `EVO_UNDER` (the underground adapters' own draw, excavation by demand, V06
  §3.18.1) and `EVO_RAISED` (the `raisedWays` phase's stage; its gate draws are the base's raised-way stream's, keyed by
  the reason key, V06 §3.16) (item 342); the village product's `VS1`… stages (V07 §3.14); and `STAGE_VIEW`. Adding one
  moves no existing key.
* **The components:**
  - **lineage** — the entity's stream identity, its lineage key (§6.3); a surviving entity keeps it, so nothing that
    survives is re-rolled;
  - **concern** — what the draw is for (registry below); streams are never shared across concerns;
  - **reroll** — the scope entity's New random count, an absolute number stored in its identity and written into the
    `regenerate` event as an explicit per-entity map (the rerolls actually used, §5.1 (6)); children draw with their
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else. **The stage-3
    rungs** (item 28) are their own derivation units, with one reroll counter per `regenerate.rung` value — `wings`,
    `rooms`, `plan`, `plan.layout`, `plan.roles`, `plan.furnish`, in that order from the coarsest. Their streams —
    `plan.*` and the composition's concerns — carry S11's stage id, the stage that made the building (§4.7; for an
    underground building, the underground stage's S11 run, II.7.3), which a transient arena's batches carry too (§3.3).
    Each counter is an absolute count, advanced only by a `regenerate` that names its rung and stored in that event's
    map under `<building id>#<rung>`; a rung's reroll is that count as the log gives it, never a field of the
    elaboration record (§2.8), so a replay rebuilds it exactly and the cache can be dropped to `absent` at any time
    without loss (§6.2). A stage-3 concern's stream mixes the counters of its own level and of every coarser level
    through the one mixer (§14 `Rng.stream`): the coarser counters are folded into the building's key, one finaliser
    round per level in rung order, and the concern's own counter is its reroll component —
      - `plan.program` reads `#wings`, `#rooms` and `#plan`;
      - `plan.layout` reads those and `#plan.layout`;
      - `plan.roles` reads those and `#plan.roles`;
      - `plan.furnish` reads all six;
      - the composition's concerns (`compose.dormers`, `compose.porch` and `compose.rooms`, V02 §3.12; item 341) read
        `#wings`, and at `rooms` also `#rooms`.

    So a finer re-roll leaves every coarser concern's stream unchanged — re-rolling the layout keeps the wings, the
    entrances and the stair core by construction, and re-rolling the roles moves no wall — while a coarser one re-rolls
    everything below it (J-A28.61). **A user's reroll count, a rung's counter included, is capped at 32 767**; rerolls
    from 32 768 up are reserved for the faithfulness references (§7.3 item 7 (iv)). New random on an entity whose count
    stands at the cap does not advance it: the entity keeps its reroll and is reported `no_alternative` (§5.1 (6)), and
    the dry run names the cap;
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll. Each concern's **attempt cap**
    is the HIGHEST attempt index its ladder may reach: attempts run 0 … cap, so cap 0 is one attempt. Every geometric
    ladder's cap is 2 (three attempts: tier 3); the naming re-draw of §9.6 has cap 8 (a repeated name re-draws on its
    own stream before taking a distinguishing suffix); a concern no ladder retries has cap 0. A row below that states
    its own cap overrides the default (DIC-02: no concern's number of draws changes);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town); the history replay at generation keys
    its coarse epochs r = 1 … R with `0x8000 + r`, the upper half of the u16 range reserved to it, so no replay draw can
    equal a live epoch's (g item 113; below);
  - **salt** — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1), for
    **rerollable** concerns only. A concern can be rerollable only if a registered stage or paint program reads it (a
    `StageDecl.streamKeys` entry or a paint program names it) and it is not a geometry concern — the village product's
    `village.track` excepted (item 344), whose `rerollLayer` re-grows the village's roads and is therefore dry-run as a
    Re-derive from its reader stage VS4 with the fate report (V07 §4.3). The registry marks which are: exactly `naming`,
    `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem` (the last two read by the
    compass furniture program and the emblem generator, §9.5) and `village.track`. `naming.quarter` and `style.random`
    are registered non-rerollable (a new `setStyle` event re-draws the random style, §8.2), as is every other geometry
    concern, whose reroll is the regenerate action — so rerolling the trees or the names moves nothing else.
    `rerollLayer`'s concern type is generated from the registry, the recipe's initial salts are keyed by the same type
    and its schema refuses any other key (§2.9), so no recipe, link delta or log can give any other geometry stream a
    salt; a CI test fails when a rerollable concern has no reader (J-DET-22). A town-wide `rerollLayer` sets the concern's town salt; an **ids-scoped** `rerollLayer` of `naming`
    re-draws only the names of the entities it lists, each with the per-entity salt the event carries. Every other name
    draw takes its salt by §6.3's draw case — the town salt for an entity with no predecessor, the salt its naming record
    holds for a changed naming input — so a name's salt is never in the model digest: the event that set it holds it,
    and the naming record caches it (§2.8). Labels draw nothing (§9.2, §9.3): no labels concern is registered, "reroll
    the labels" is not offered, and re-placing a label is `moveLabel`.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2) — use the class's registry entry as the derivation unit and the ordinal as the creation index, through the
    same mixer; a trade partner's and a listed deposit's bearing hash that element's binding key as the derivation unit
    the same way (below).
* **Fixed-key draws** (E-03). Where a thing's existence is decided by a chance that can rise over its life — the
  underground's catacomb source, overlap shaft, crypt join, dig and public opening (V04 §3.12) — the draw is one
  uniform on the named concern keyed by the subject's own lineage key parts with no epoch component: fixed for the
  subject's life, never re-drawn, and compared at each moment its site names against the chance then in force; the
  subject exists from the first moment the chance exceeds the draw, and what a met chance made persists. Each site
  states only its concern, key parts, chance source, comparison moments and persistence, and V04 §3.12 its exceptions.
* **Concern registry (G-P6).** Adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Each row declares its reader stages,
  whether it is rerollable, its attempt cap (§6.1's attempt component: the default unless the row states one) and its
  keying — the row's cell is the one statement of how its draws are keyed; a reader's section cites it. Each row keeps
  the u16 id it was appended with; a volume's rows take the next ids when their stage lands (V01's reserved at M1). No
  stream outside the table exists.

| concern | cap | keyed by — and read by |
|---|---|---|
| `terrain.noise`, `terrain.controls` | default | the town root's key: S1's terrain (§4.2 S1) |
| `water.coast`, `water.river`, `water.islands`, `water.delta` | default | the town root's key: S1's water (§4.2 S1) |
| `site.centre` | default | the town root's key: S3's siting (§4.2 S3) |
| `blueprint.features` | default | the town root's key: S0's per-rung feature draws (§4.2 S0); then, appended after them in this order, the geology flag's uniform (§4.2 S1 (10), item 65; J-A65.49) and the relief toggle's `auto` pick (§4.2 S0; S1 (1) reads the class), each drawn whether its toggle is `auto` or set (a set toggle ignores its draw), so setting either moves no other draw; the sewer layer's existence draw (II.7.1) |
| `intent.surprise` | 0 | a fresh seed's town root: Surprise me's intent draw (§7.7 layer 1) |
| `gate.pick` | default | S3's gate picks (§4.2 S3 (7)); a trade partner's bearing where the dossier gives none (§7.7 layer 2, item 77), the partner's binding key hashed as the derivation unit, so the bearing never moves when unrelated facts change |
| `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water` | default | S3's reservations (§4.2 S3) |
| `roster` | default | S2's roster, with the ordinal-keyed `roster/<class>/<ordinal>` draws (§10.2) |
| `route` | default | S4's router (§4.3) |
| `growth.heading`, `growth.branch`, `growth.mainroad`, `growth.curvature` | default | S5's growth (§4.4) |
| `district.seed` | default | S6's seeds (§4.5); each grower's turn skips and its absorbed neighbour (item 47), keyed by the grower's seed lineage (its feature's; a remainder seed's first face) with the turn number as the creation index, so §7.3's S6 operator re-grows a scoped regroup exactly |
| `district.type` | default | S6's typing (§4.5) |
| `alloc.district` | default | S7b's allocation (§4.5 S7b), including its edge-green-or-orchard choice per district and dispersal's controlled random share (item 72) |
| `alloc.block` | default | S10a's block allocation (§4.7); item 105 (f)'s relaxation pass (≤ 2) |
| `field.chance` | default | the prosperity field's ε (§4.5) |
| `cut.t` | 2 | the bent cut (§4.6, items 34–40): twice per attempt — step 2's position bell and step 4's corner bell, three uniforms each; step 8's turned frames on the `attempt` component (item 39) |
| `cut.side` | — | retired: the start run is a deterministic rule (§4.6 step 3); the id reserved, no reader, never reused (J-A41.61) |
| `cut.arc` | default | one uniform per corner §4.6 step 5 keeps on a lane or street cut — the fillet predictor's one test (step 6); stage 2's ring courses (II.2, item 58 (a): the district's one shared phase, each vertex's jitter, each ring's spacing factor), keyed by the district with the ring's ordinal as the creation index |
| `cut.width` | default | one uniform u per district, the exponent `p` = `4^u` ÷ 2 through `dmath.pow` (§4.6) |
| `cut.farSideAlt` | — | retired: the far side is a deterministic rule (§4.6 step 5); the id reserved, no reader, never reused (J-A41.61) |
| `plot.width`, `plot.vacancy`, `plot.bounds` | default | S10's plots (§4.7 S10); a plot fusion or splitting (item 31), keyed from the due block's lineage, the members' buildings keeping their streams because their lineage continues (§6.3) |
| `plot.join` | default | S10's joins (§4.7 S10); the cluster row's `wholeBlock` pick (§4.7 S11, item 70), keyed by the block; the fractional join bonus of §7.7 layer 1 |
| `siting` | default | S10b (§4.7): a concealed institution's default mode and its cover (item 63), keyed by the institution's lineage; a residential plot's building class from the class mix (item 71), keyed by the plot and its request; a post-build placement — an `assign`, a dossier event, a positive placement or a relocation (§7.7) — with the causing event's `seq` as its creation index (§6.3); the members of a collective dossier record a status reaches (§7.7 item 14, item 80), keyed by the record's assignment with the dossier event's `seq` as its creation index |
| `siteplan` | default | S11 (§4.7): a plot's front recession (item 43) and a cluster's packing (item 70), keyed by the plot |
| `siteplan.template` | default | S11's template choice (§4.7) |
| `heights`, `material` | default | S11 (§4.7, §2.6) |
| `greenery`, `fields`, `crop`, `forest` | default | S12 (§4.9) |
| `hinterland.outside` | default | S12a (§4.9); a listed deposit's bearing where the dossier gives none (DR19; item 88, staged), its binding key hashed as the derivation unit |
| `hinterland.decor` | default | S12a's decoration (§4.9) |
| `pin.centrepiece`, `pin.stall` | default | pins (§4.7, II.3) |
| `pin.decor` | default | pins (§4.7); the neighbourhood tier's pin picks with their weight decay (II.3, item 58 (c)), keyed by the block with the pick's ordinal |
| `people` | default | `derivePerson` (§10.3) |
| `content/relations` | default | the relations (§10) |
| `naming` | 8 | rerollable. S13a (§9.6); an epoch's district rename (§6.3 case (5), item 72), with the renaming epoch's component |
| `naming.quarter` | default | S13a's quarter names (§9.6); non-rerollable |
| `naming.emblem` | default | rerollable. The emblem generator (§9.5) |
| `warp.jitter` | default | the warp's `jitter` kernel (§7.1) |
| `epoch.transform` | default | §4.11: the strike pool's `u` (V06 §3.5.2) and each entity's dwell spans, keyed by the entity's lineage and the epoch; the terrain and water conversions (reclamation, silting, a course shift), keyed by the water body's or land-use face's lineage (J-A25.61); a churn cap's extra — the chance of one more carried by a cap scaled by a fractional `years` (J-A76.44) — keyed by the district's lineage with the cap's kind as the creation index and the epoch component |
| `island.place` | default | S7b (5) and V05: the island count, each slot's reason, and per island its template, bearing, outline, placement, own relief, river, underside, access kinds and dwell spans, by V05 §3.18's creation indices (item 476) |
| `sewer` | default | the network stage's routing, connection and `pit` draws (II.7.2); the basement access lottery (II.7.3, item 64), keyed by the building's lineage; every draw of the layer's other systems (II.7.6, item 65), keyed by the system's lineage — its part in the arena key — and the element's source; the undercity's existence and size (II.7.5), keyed by the settlement's lineage; the connection stage's links; an underground closure's generators (§7.3 item 9), keyed by the edited entity's lineage — the building's, or an undercity lifeline's neighbourhood `District` — the target's and the event's `seq` (a closure's other generators draw on the concerns of the stage they call, keyed the same way); V04's fixed-key draws (above). The underground stage and the undercity's neighbourhoods draw on the ordinary `plot.*`, `siting`, `siteplan` and `heights` concerns keyed from the underground pseudo-district's or their own lineage (II.7, §6.3) |
| `style.jitter`, `style.crowns`, `style.compass` | default | rerollable. The paint programs and the compass furniture (§8.2, §9.5) |
| `render.instances` | default | rerollable. The instance function (§8.10) |
| `style.random` | 2 | the random-style draw of §8.2: creation index = the `setStyle` event's `seq` |
| `render.stampTiles` | 0 | the stamp-tile library (§8.10): a constant entity key with `STAGE_VIEW` and reroll, attempt, epoch and salt 0, as §8.10 states; read by `@plat/kernel`'s `poisson` builder when `plat/tools/stamptiles/` builds the shipped asset, and in a worker only by the fallback rebuild of a tile whose hash differs |
| `siteplan.mutate` | 2 | geometry. §4.7 S11's designation mutator, keyed by the plot's lineage; an added main slot |
| `use.relocate` | 0 | §4.11's use step on the use's `…/epoch=e` stream |
| `siteplan.entrance` | 2 | geometry. The side, rear and yard door draws and the basement decision of §2.6, keyed by the building's lineage, so re-deriving the entrances after a mutation or a terrain change disturbs no site-plan draw (J-A29.61) |
| `plan.program`, `plan.roles`, `plan.furnish` | 0 | geometry; non-rerollable by salt. `BuildingGenerator.plan` (§2.6), keyed with the rung counters (above); `plan.roles` re-derives what hangs off roles (window demand, door kinds, furniture) |
| `plan.layout` | 2 | geometry; non-rerollable by salt. `BuildingGenerator.plan` (§2.6), F-PLAN's tier 3; keyed with the rung counters; it keeps the wings, the entrances and the stair core |
| `reserve.market` | 0 | geometry. §4.2 S3 (12)'s trade-convergence random term, keyed by the town root's entity key |
| `cut.interior` | 0 | geometry. §4.6's deep-interior draw, one (treatment, reach) pair per deep block, keyed by the block's lineage |
| `cut.stop` | 0 | geometry. The per-face stop threshold of §4.6's first step, one draw of four uniforms per face, keyed by the face's lineage; not retried — a turned frame re-plans steps 2–7 only |
| `works` | 0 | for a Works an epoch starts: keyed by its target's lineage with the epoch's week as the creation index and the epoch component — the start offset within the epoch's span (§4.11 *Works* (10)) drawn first, the duration inside its `WorksTable` row's range second; for a Works a dated change or a scheduled edit starts: keyed by its target's lineage with its given start week as the creation index — the duration alone (J-A67.61) |
| `pin.light` | 0 | geometry. S11's placement of the light sources (§4.7), keyed by the host's lineage with the light rule row as the creation index; a light's flicker is never a stream — a pure function of its render key and the view's time (§8.4; J-A68.61) |
| `raised.reason` | 0 | geometry. The raised-way generator (item 110 (b); §4.3, §4.6; item 290): one uniform per `RaisedReasonKey` (V06 §2.13) with epoch component 0, in the kind order aqueduct, viaduct, elevated — the gate `u < p` at every generation and epoch, the same draw each time, never re-drawn; a raised part's pier pitch where no `spanSpacingCm` is edited, keyed by the way's lineage; V06's `EVO_RAISED` phase draws its gates here |
| `fabric.select` | 0 | V01 §3.12 (S7c's draw); reserved at M1, drawing nothing before M5 (item 340) |
| `hood.dispatch` | 0 | V01 §3.12 (S9b's picks); reserved at M1 (item 340) |
| `hood.template` | 3 | V01 §3.12 (the seed primitives; F-TEMPLATE's redraw rung); reserved at M1 (item 340) |
| `massing` | 2 | geometry. S11's `outline()` and every operator that re-derives S11 on a plot, keyed by the building's lineage (V02 §3.12; item 341) |
| `compose.dormers`, `compose.porch` | 0 | geometry. Keyed with `#wings` (V02 §3.12) |
| `compose.rooms` | 0 | keyed with `#wings` and `#rooms` (V02 §3.12) |
| `village.plan`, `village.density`, `village.palisade`, `village.track`, `village.open`, `village.slot`, `village.fields` | 0 | the village product's stages (V07 §3.14; item 344); `village.track` rerollable |

  The geometry floor of item 31 draws nothing and adds no concern, and neither does the interior ladder (item 28 (f)):
  each step of a re-cut along it is its own derivation of the rung on the same four `plan.*` concerns under the rung's
  lineage and counters, keyed by the step's target — its ladder row and household count — as the creation index of
  §6.3's lineage key, so a step's draws are a function of what it cuts toward and never of when a click, an epoch or a
  `relet` reached it (§7.3's canonical prior; J-A28.63). Every chance entry of §7.7's derivation table names a concern of
  this registry or "none". The **variations** of a
  derived fill (§7.3 item 10) are its scope's next distinct rerolls, derived on the dry run's overlay; the one accepted
  commits as a `regenerate` with that absolute reroll, so no component is added.
* **The history replay** (g item 113; §4.11, V06). A settlement generated from its history runs its coarse epochs on
  the concerns of the stages each epoch runs, keyed as those concerns' rows state with the replay's epoch component
  (above); the replay reads the history as recorded input (the dossier's history facts through DR36–DR39, §7.7, or the
  blueprint's history option, §4.2 S0), so one seed and one history replay byte-identically, and it adds no concern.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct; the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12
  uniforms — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time
  helper), `bell4()` (the folded bell `|(u₁ + u₂ + u₃ + u₄) / 2 − 1|` on [0, 1], whose mean is seven thirtieths — the
  stop test's draw), `mean3()` (three uniforms averaged, for §4.6's position and corner draws), `fuzzy(f)`,
  `weighted(table)`, `deck(table)` (draw without replacement — MFCG 12710731's deck selection idea). The helpers draw
  uniforms only; every power of a draw (`(e_hi / e_lo)^g`, `4^u`) goes through `dmath.pow` (§6.5 (3)).
* **Decoration** draws are §8.10's (the render key and the instance ordinal, never the LOD band), so nothing
  re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance` events, §7.1) and the
  current positions of positional overrides in the entity's override table, which a warp or a vertex move carries with
  the ground (§7.4).
* **Enter** creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe —
  params, intent, the district intents (`districtIntent`), entry mode, table pins, packs — without edits, locks, map
  assignments or salts. The dossier is kept: the new document's creation prefix holds one `creation` `assign` event,
  carrying its `DossierRef`, per live dossier-backed assignment of the current document — the assignment as the
  dossier's live events leave it (each live dossier `setAttr` on the element written into the copy's matching
  `Assignment` field: `name`, `function`, `shapeClass`, `knownTo`, `drift`), without `placed`, `target` or `use`, which
  name the old town's entities — so every dossier element is present from the start, as the dossier now says it (item
  20 (c), item 22 (d), §7.7 *One path*). Rejections and positive placements, which are map edits, are not carried. When
  the current document has edits the app first warns and offers to save it (J-DET-53).
* Seed-exact parity with the references is not a goal (§1; `docs/CONFIDENCE.md` §1).

### 6.2 What a seed determines, and the model digest

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe (§2.9's `Recipe`,
which holds every model-affecting input that is not an event) or a rebased state, and the log is folded in order
(§7.4), its one declared read-ahead being the creation prefix (§7.4 *Replay semantics*). Tables, presets and styles a
host supplies are not in the recipe: they arrive as logged `editTable`, `editPreset` and `setStyle` events whose content
is copied into the log with provenance `host` (source, date, version; §7.6); packs a later `adjust` adds are named by
that event and belong to the document's pack set (§2.9). Nothing else reaches the model:

* no wall clock — every output-affecting limit is an operation count (§5.1 (5));
* no host text engine — label **placement** (S13b) is view data, derived per zoom stop from the model's names,
  `LabelEntity` records and the bundled fonts' own metrics (§9), and is not in the model digest;
* no viewing order — a stage may be lazy only under §4.1's laziness contract, tested by the derived-complete digest
  (§6.5 (9));
* no worker timing (§6.3 *Workers*);
* one boolean and offset engine per output version on every host (§6.5 (7));
* no host code — a host provider's outputs are read from the document's `hostContent` block on replay (§6.5 (8));
* no installed pack — every pack of the pack set is resolved by content hash as §2.9 states;
* no machine preference read at run time — user-global preferences are folded into the recipe when the document is
  created (§7.6);
* no host seed — a dossier-bound document's seed is the port's one-way derivation from the host's own seed (§14, item
  85), written into the recipe once at creation: the derived seed replays exactly like any seed, and the host's seed
  never enters a digest, a document or a link (§6.4);
* no pointer — the cursor sun (§8.4) and every other pointer-driven view reads the pointer as a transient view input,
  never stored, logged or hashed (item 68), and an underlay image (§9.5, item 101) is view state the model never reads.

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
               districts — district → block → plot → buildings, yards, households, pins, its Passage records
               hinterland, content (Allocation, FieldBands, institutions, factions, relations, Use records, Rejection
               records, the MaterialLedger, Works records, LightSource records, the staged ConditionOverlay,
               DepositSite and PowerRelation records — empty in the base), names and LabelEntity records,
               closeups (edited close-ups only: each district's `CloseupRecord`, V01 §2.5; the hood pins' overrides are
               `Block.overrides`, hashed with their blocks — item 340)
               underground — UndergroundSystem, Tunnel, Gallery, Chamber, UndergroundLink and AccessPoint records (its
               plots stay under districts, through the underground pseudo-district and the undercity's
               neighbourhoods); sky — SkyIsland records (their districts under districts, their arenas under plats)
               identity  — tombstone ids and supersededBy links, the lifecycle event block
               plats     — per arena and per level, the kernel's level digests
```

* **Geometry is hashed once, by the kernel, per level** (§3.3's per-level digests along each commit record's dirty
  set, a finer level's Steiner vertices in that level's digest, promotions and demotions moving a vertex or edge
  between levels' digests, kept finer content keeping its leaves). An entity's leaf takes the digests of the faces and
  chains it owns (its `FaceRef` and `ChainRef` resolved), so no coordinate is hashed twice. Coordinates enter in
  canonical order (a level-n ring from its lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's
  key, so deriving a finer level never re-orders a coarser digest's input); integers enter as 32-bit lanes, doubles as
  their IEEE-754 bit patterns (−0 normalised to +0; NaN refused by the schema), strings as UTF-8 — no text
  serialisation on the digest path, and no dependence on byte order.
* **H128** is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with seed 0, so the digest's hash is specified exactly, as
  `H32` is (§13.6 (2)).
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance, derivation records and naming records (the provenance digest, §2.8; the
  persisted records form the records digest, below); `style`, `view`, `derived`, `hostContent`, `dossier` (the binding
  and the carried facts, §2.9 — rebuilt from the log's dossier events and checked against that fold at load; §7.7 item
  12) and telemetry (§2.9); the lighting — the light pass, its height-and-normal buffers and its light maps (§8.4, item
  68); label placement decisions (S13b, view data, §9); and close-ups never edited — a close-up is a pure function of
  its district's committed state, its sub-seed, strategy and params, and enters the digest under `closeups` with its
  first edit (§7.4).
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
  `recordsDigest`, and recomputed by every in-window load (§2.9 step 3) with the model tree; its memory is counted with
  the model tree's (§12.8). Its leaf encoding belongs to the file schema, not to an output version — the records are
  stored inputs, not derived output — so any version checks it, and a schema transform that changes a record column
  (§7.5) checks the old root and writes the new one. Recomputation measured ≈ 4 ms at CITY and ≈ 11 ms at METROPOLIS
  for ≈ 10 900 derivation and 3 500 naming records at CITY (≈ 29 300 and 9 500 at METROPOLIS), on a synthetic,
  schema-shaped workload on the reference machine, two runs within 0.1 ms
  (`docs/validation/bench/fixall_det_r5_recordsdigest.out`) — PLAUSIBLE until M0 (d) times it in the engine, under the
  same 150 ms bar. The records digest is not a model digest: goldens, the locality checks of §7.3 item 7 (ii)–(vi) and
  the bridge's convergence read the model digest alone, while replay = session and truncation identity compare both
  (§6.5 (9), §7.3 item 7 (i)) (J-DET-49).
* **Bars (M0 d, decided before any golden is signed):** digest maintenance ≤ 5 % of each batch's own time at CITY; root
  finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY, the
  records tree's included — used by the CI oracle and by **every in-window load** (§2.9 step 3). Measured ≈ 31–34 ms at
  CITY and ≈ 95–101 ms at METROPOLIS for the model tree (the records tree's ≈ 4 and ≈ 11 ms more, above), on a
  synthetic, schema-shaped workload on the reference machine (`docs/validation/bench/fixall_det_r4_loaddigest.out`) —
  PLAUSIBLE until M0 (d) times it inside the engine. Each bar has its own *pre-decided fallback*, and none moves a
  golden, because the root is a pure function of the leaves whenever it is computed:
  (i) *maintenance* over 5 % — leaves are re-hashed at the next coarser batch boundary (per district instead of per
  block and plot); the root at every stage end is unchanged;
  (ii) *root finalisation* over 5 ms — the layer nodes (site, network, districts, …) stay maintained at every commit,
  and the root over them is finalised only when it is read: at save, at the end of a verification replay, at export,
  on an API digest request, and at each stage end of a CI golden run;
  (iii) *full recomputation* over 150 ms — the CI oracle recomputes, per run, one subtree per layer chosen by the run's
  seed (so every subtree is covered across nightly runs) and compares it with the maintained node; and the load's
  recomputation leaves the edit path without leaving the load. The load takes a copy-on-write checkpoint of the decoded
  state at **`h₀`** (§7.4's checkpoints), makes the working state editable at once, and recomputes the model tree and
  the records tree from the checkpoint in the generation worker between edits. Each edit made before it finishes keeps
  its touched set (§7.4); when it finishes, the leaves those edits touched are re-hashed on the new trees in log order,
  which yields the working state's trees. Their roots at `h₀` are compared with `model.digest` and
  `model.recordsDigest` exactly as in §2.9 step 3: a mismatch is a corrupt cache, the replay's state replaces the
  working state when it reaches the head, and the edits made meanwhile are re-applied to it in log order as "take the
  replayed town" re-applies them (§2.9 step 4), their fates recomputed and differences reported. Until the roots have
  matched, nothing is reported verified, "trust the saved town" and step 4's keep are shown disabled ("checking the
  saved copy…"), and a save (which records the maintained roots), an export, an API digest request and a bridged
  client's comparison of its root with a `rebase`'s `stateDigest` wait for the recomputation and complete when it does;
  edits do not wait. A mismatch withdraws the keep for good — a corrupt cache is never a base (J-DET-40, J-DET-45). A New
  random made meanwhile computes its scope's content digests from the scope's own leaves (§5.1 (6)), which needs no
  tree.

**Histories, not states (item 22 (c); J-A22.71).** Because the log is folded in order, the map is a function of the
seed, the ordered history of dossier events and the map's own edits: replaying the same history from the same seed
reproduces the same map exactly, and two players who reach the same dossier by different histories may hold different,
equally valid maps — continuity is chosen over path-independence, because each dossier event is a least-disruption
mutation of the map that stood when it arrived (§7.7) and the document keeps the whole history (§2.9), so any map can be
reproduced. A dossier event's draws are keyed by the plots it touches and its own `seq` (§6.1, §6.3) — or, for a trade
partner's or a deposit's bearing, by that element's binding key (§6.1) — never by the values the dossier holds, so one
history gives one digest on every host (§6.5 (9)'s history test). Item 20 (h)'s rule — every map fact derived from the
dossier's facts by the design's rules — is this same fold: the derivation table's rows (§7.7) read only the dossier
facts the log has delivered and the map's committed state, and the settlement's own history the dossier carries at
creation (its age, events and tier and population histories; g item 113) is read by the history replay (§6.1) as one
more delivered fact, so no derived fact depends on anything but the seed, the ordered history and the edits.

**State that time and history write (items 67, 68 and 72).** A Works record (§4.11) is model data in the digest; its
drawn stage at any week follows from the record and that week and is never stored or hashed, so scrubbing weeks changes
no digest. A `LightSource` is model data; the lighting it gives is view (above). A district's character vector and
band range (§4.5) are pure functions of committed state, recomputed on load and equal on recomputation (§5.3); they are
never hashed; its `identity`, `pressure` and `nameHistory` depend on the epochs it lived through — the identity's
hysteresis, the retained pressure, the renames — and are model data in the digest, written by generation, by epochs,
by dossier events and — `identity` only — by a `setAttr` override (§2.5; its registry row in §2.8). The dials' inputs
are recorded — the circumstance slices in the recipe and in each `EpochInputs`, an epoch's wealth level
(`EpochInputs.wealthLevel`, the dossier's wealth word by DR6 or a standalone trajectory's) and an epoch's `advance`
provenance (V06 §2.3; item 343), the dossier's facts in the log — so a load's recomputation reproduces the field
(J-DET-12; J-A72.61).

**The elaboration cache is outside both digests (item 28 (c); J-A28.62).** A rung derived by a click — a
neighbourhood's wings, a building's plan — is a pure function of the building's committed state and its own streams
(§4.1's laziness contract, §2.6), so its cached result and its elaboration record (§2.8: the rung's state and the digest
of the inputs it was derived from) sit outside the model digest and outside the records digest, beside the report in
the document's non-canonical blocks (§2.9): a click logs nothing and writes nothing a replay would have to reproduce
(replay = session compares both digests, §6.5 (9)), and a rung's `absent` / `current` / `stale` state is recomputed
from the recorded input digest against the current one at load and after every batch that touches the building. What a
click derives enters a digest only when an edit materialises it — the first plan edit stores the composition (§2.6),
and from then on the stored rings and rooms are model data, as an edited close-up is. The rungs' reroll counters are
not cache state (§6.1). That is why a re-cut of an unstored plan along the interior ladder (item 28 (f)) never takes the
cache as its prior: its prior is committed state — the as-built plan carried along the ladder step by step (§7.3's row)
— so a building whose occupants changed twice between clicks derives the same plan whether the user clicked after each
change or once at the end (§6.5 (9)); a stored plan is model data and is re-cut inside the event that changes its
inputs (§7.3, §7.4), so no digest ever depends on a click (J-A28.71, J-A28.72).

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels,
households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when
an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
  creation index, the derivation unit's reroll[, dup]); `lineageHash` is its 64-bit hash, cached in the arena. The
  **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry: the town
  for S4 routes (in destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance
  order); the L1 cell a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; a template's seed
  ways and plazas take the stage id `S8.seed` (§6.1; item 345), so no seed's lineage key can equal a lane's of the same
  cell; the block for S10 plots and alleys; the plot for S11 buildings, yard parts and households; the household for
  people (member ordinal); S6's run for `Seam` records (creation index by the run's lowest-then-leftmost vertex); the
  S5c growth run, the district's S8 run (for `baseLane` portals) or the creating edit for portals; the parent surface
  district for an undercity neighbourhood (II.7.5), whose district's lineage continues its parent's; the system for its
  galleries and chambers (II.7.6; its part in the arena key); the connection stage's run for links (creation index by
  the pair's canonical order); the host for a light source (its light rule row and its ordinal along the host — a door
  light's entrance ordinal, a street light's ordinal along its way strip — as the creation index; §4.7 *Light sources*
  (1)); the target for a Works (its start week as the creation index); the creating edit event (its `seq`) for
  anything a user draws or builds; for any other kind (cells and junctions made by a growth commit, walls, water
  bodies, bridges, greenery), the stage run that created it. The **creation index** is the deterministic creation order
  of that unit's run, or the canonical order the stage declares (for faces and vertices: by their lowest-then-leftmost
  lattice point).
* **Address id** = `kind:token`, prefixed `<layer><part>/` outside the ground layer — the island's part on the sky
  layer (item 203), the system's part on the underground layer, the sewer network's part 0 written bare (`sky2/plot:…`,
  `under/tunnel:…`, `under3/gallery:…`); a part number is part of the address and, like it, never reused (§3.4,
  J-A65.31). For a generated entity the token is the base-32 form of its lineage hash at creation (13 characters); for
  a user-created one it is the hash of the creating event's `seq` and its ordinal — the pieces a closure creates (§7.3
  item 9, item 66) and the entities a sugar event's expansion creates (§7.1, item 101) are user-created entities of
  their event, their ordinals in the closure's dependency order and the expansion's order. The address is opaque: the
  parent is a field and is never parsed from the id (J-DET-1).
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
  local operator of §7.3, template replacement, migration, an epoch, the history replay):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited,
    assigned or declared, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its
    draws do not change); only its `parent` field and a `reparent` lifecycle event change;
    - the kept parts of a designation mutation (§4.7 S11), the rooms a re-cut of a stored plan keeps along the interior
      ladder (item 28 (f), §7.3) and the standing fabric of an epoch — a vacant, derelict, ruined, cleared or reused
      building, a neglected, breached or superseded enceinte, a silted, caved-in or sealed tunnel, a waning or settled
      island (§4.11, II.6) — survive in exactly this sense: address and lineage kept, their state a lifecycle change; a
      `reuse … build` successor raised on a cleared trace succeeds it at the trace's address (`supersede`), regrowth on
      an old plot re-uses the plot's address, and a `raiseIsland` mints the island's arena key and lineage from the
      town's lineage, the slot index and the epoch component, so the same history raises the same island (item 8;
      J-A8.61); a use (§2.7) keeps its own address as it moves — its anchor is (its plot's address, its role) — while
      the building it leaves keeps its own (item 17); the parts a mutation adds are user-created entities minted from
      the causing event's `seq` and ordinal (below); a dossier-backed assignment is a fixed input like any assignment,
      so its element survives every re-derivation of the ground under it (§7.7);
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
  the district a boundary edit regroups keep their names. S13a **draws** a name only in five cases:
  1. for an entity with no predecessor, with the town salt;
  2. for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  3. for the entities an ids-scoped `rerollLayer(naming)` lists (§7.1), each with its per-entity salt: the dry run gives
     each listed entity the salt one above the largest its name has been drawn with (the town salt and every earlier
     ids-scoped salt the log gave it), and a re-drawn name equal to the old one advances that salt by §5.1 (6)'s
     advance rule; the event stores the salts actually used, so a replay repeats neither the choice nor the advances;
  4. for an unedited generated name whose **naming inputs changed**, with the salt its naming record holds. Case (4)
     runs whenever S13a runs over the name's entity: after an `adjust` of the pack list (a pack added or removed, a
     corpus selected or deselected, §7.6); after an `editTable` or `editPreset` that changes a naming slice (§7.6); in
     an upgrade's mapping (§7.5); in a `frozenImport` rebase (§2.9 step 2), over every unedited generated name; at the
     event that ends the name's protection — an `unlock` or an `unassign` that frees it, or an `undo`, `redo` or
     `revert` whose result removes the `setAttr`, `lock` or `assign` that held it (§2.8's dormant record); and in any
     re-derivation whose scope reaches S13a. It compares every slice the name's naming record cites with the current
     effective tables, and a slice whose hash differs, or that no longer resolves (a deselected corpus, a removed row),
     re-draws the name;
  5. at an epoch, for a district whose identity row changed at that epoch's character step (§4.5, item 72 — a change the
     identity's hysteresis already filtered): its unedited generated name is re-drawn on its `naming` stream with the
     renaming epoch's component (§6.1) and the salt its naming record holds, the old text moved to
     `District.nameHistory` (§2.5); a protected name — a `setAttr`, a lock, an assignment, a dossier naming claim
     (§7.7 item 16, item 82) — is never re-drawn, its naming record staying dormant (§2.8). The rename is listed in the
     epoch's report (§5.4) and stored in the event (`EditBase.renames`, §7.1) like case (4)'s, without a confirmation:
     an epoch is the history's own step (§4.11). A replay re-draws it identically (J-A72.62).

  Each field of a culture or ancestry row is its own naming slice (§7.6), and a name's record cites only the fields its
  draw read, so selecting another corpus for one field re-draws exactly the names drawn from that field: a street list
  chosen for a culture renames that culture's streets, never its districts or quarters. So **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost
  its gate) is not a naming input and renames nothing (§9.6) — in generation and in every edit; only case (5) renames a
  district at an epoch, and only past its identity's hysteresis. Every draw uses the entity's `naming` stream — keyed
  from its entity key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew.
  **Case (4)'s renames are confirmed like fates** (the one statement; §7.3 item 4 and §7.4 cite it as "case (4)"): the
  dry run lists each, old and new text side by side, in the edit's fate report with its other unprotected
  consequences; the edit commits after the user confirms them (an action whose dry run lists any returns `confirm`, a
  `frozenImport` rebase included), and the confirmed renames are stored in the event (`EditBase.renames`, §7.1). A
  replay or a receiving client re-draws them identically, because the draw is a function of the stream, the salt and
  the inputs at that log position; one that computes different renames reports a mismatch under §7.3 item 4's rule. A
  user-set name (`setAttr`) is an edited attribute, a locked name path a fixed input and an assigned name held at its
  assignment (§7.7); none is re-drawn while protected, and each keeps its naming record dormant for the event that ends
  the protection (§2.8). When carrying or a re-draw brings two equal names into one uniqueness scope (§9.6 — a district
  merge that joins two lanes of the same name), the entity whose address sorts later re-draws on its own stream, and
  the rename is listed in the edit's fate report (J-DET-37, J-DET-46).
* **Anchors and hysteresis.** Matching is by distance, never by quantised cell: candidate (old, fresh) pairs within the
  radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one greedily in
  that order, so coincident anchors resolve by id. An overlap-anchored entity of zero length or area never reaches
  matching — the kernel refuses it first (§5.1 (9)).

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| yard part (§2.5) | (its plot's address, its part kind, its ordinal in the site plan) | the same plot | part kind |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| `Frontage` record (§2.5) | (its block's address, the address of the way it fronts); its split by a stretch conversion below | the same block and way | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| `Corridor` record (§2.4) | its way's address | the same way | — |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| castle (§2.7) | its claim's centroid | 2 m | — |
| decoration (§2.7) | (its host face's owner address, its rule row, its ordinal) | half its row's spacing from its recorded point | decoration class |
| bridge | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, a cell of the base settings row, V11 §3.1) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |
| use (§2.7) | (plot address, role); a relocation moves it by its event (item 17) | — | use class family |
| institution (§2.7) | its binding key when dossier-backed (§7.7 item 12); else its use's address | the same key or use | institution kind |
| base wing (§2.6; V02) | (its building's address, its key); after a re-derivation, by role, then its ridge midpoint in the building's frame (item 346) | 0.5 m | wing role |
| room of a stored plan (§2.6) | centroid within its wing, per storey — for a wing standing on another (V02's `BaseWing.on`), per its storey counted from its first level (`s − s₀`, V03 §3.3); the address's level part records the level at minting and is never re-read as the storey (item 347) | 0.5 m in the wing's frame | any role: a re-cut along the interior ladder keeps a room's address on its ring even when its role changes, an owner's parlour becoming a family's room (item 28 (f), §7.3) |
| entrance (an indexed vertex role `('entrance', building, i)`, §2.2 rule 7) | carried with its wing by `carryWings` (§2.6); re-matched by (wing, side, offset) when the wing is re-derived | half the side's length | entrance role |
| passage (§2.5, item 30) | (its front plot's address, its kerb end — the midpoint of the passage face's edge on that plot's frontage kerb) | 0.5 m along the same kerb | — (one family) |
| access point (II.7.4, items 12 and 64) | (its element's address — the tunnel, gallery, chamber or underground building it reaches, in its part — and the position of its `('access_point', id)` vertex on that element's kerb or wall) | 1 m | `AccessPoint.kind` |
| tunnel, gallery (§2.7, II.7, II.7.6) | its end junctions' addresses; else overlap ≥ 50 % of its length, in its own part | — | `Tunnel.kind`; the gallery's system kind |
| chamber (II.7.6, item 65) | its floor face's centroid, in its own part | 2 m | the system kind |
| underground link (II.7.6, item 65) | its two ends' element addresses | the same pair | `UndergroundLink.via` |
| undercity neighbourhood (II.7.5, item 65) | its parent surface district's address and its void system's part | the same parent and part | — |
| light source (§2.7, item 68) | (its host's address, its light rule row, its ordinal along the host) — a door lantern by its building and entrance, a street light by its way strip and ordinal | 1 m from its recorded point | the light kind |
| Works (§4.11, item 67) | (its target's address, its start week) | the same target and week | the Works kind |
| condition overlay, deposit site, power relation (§2.7, item 88; staged, empty in the base) | its binding key (§7.7 item 12) | the same key | the record kind |
| sky island (II.6, item 10) | its slot: the key `raiseIsland` mints from the town's lineage, the slot index and the epoch (J-A8.61) | the same slot | — |
| sky access (V05) | (its island's address, its role, its ordinal) (item 476) | the same island | `SkyAccess.kind` |
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
  offset, buildings, blocks, cells, junctions, gates, towers, pins, the castle, decorations, bridges, passages by kerb
  end, access points) are matched through a uniform grid per (kind, class family) whose cell is the kind's hysteresis
  radius, so every candidate of an old entity lies in its 3 × 3 cell neighbourhood; candidate pairs are collected,
  sorted by (distance, old id, fresh id) and assigned greedily. *Overlap-anchored kinds* (ways and tunnels without
  matched end junctions, enceintes, water bodies, greenery, land use) take their candidates from the kernel's spatial
  index (§3.3) and compute the overlap on those candidates only; a sky island is matched by its slot, a staged dossier
  record or a dossier-backed institution by its binding key, and a key-anchored kind (yard parts, `Frontage` and
  `Corridor` records, base wings, sky accesses) by its key, no distance read. *Budget:* ≤ 2 µs per re-derived
  point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6. Measured on
  synthetic anchor sets (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`): 0.60 µs per entity for a
  450-building district regeneration, 0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs when the fresh town is
  unrelated to the old one) and 0.59 µs for an 80 000-entity METROPOLIS mapping at a 2 m radius. *Measurement (M0 d,
  then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):* the routine inside the engine, on real anchors, per kind.
  *Pre-decided fallback:* matching runs per static-index partition (§3.3) — each old entity's candidates are first
  taken from the fresh entities of its own district's partition, and only the entities left unmatched are matched
  across partitions — which bounds every grid by one partition; because an entity near a district boundary can then
  take a farther candidate inside its own district, the switch is a declared shift (§6.4).
* **JOIN and SPLIT — the address by the anchor, the lineage continued (item 31 (c); J-A31.73).** A joined plot takes its
  address by the anchor rule from the member whose frontage anchor it keeps; the other members become tombstones with
  `supersededBy` = the joined plot, and `members` is history. Its **lineage** is not fresh: the fused plot continues the
  lineage key of its largest member by area (ties by address id) — the exception to J-DET-2, which gives a re-derived
  successor the address only — so the streams of its buildings and yard parts continue from that member's and the same
  seed under the same history re-cuts the same fabric; the epoch component of every draw (§6.1) keeps an epoch's re-cut
  distinct from the parent's original draws without breaking the tie to them (the owner: modifications of the original
  seed, not new rolls). A SPLIT keys each child by the parent's lineage key with the child's index as its creation
  index: the child that keeps the parent's frontage anchor keeps the address and the others take fresh addresses; every
  child takes the continued lineage, the parent's lineage key with its child index; a later SPLIT **resurrects** a
  member whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a `resurrect` event, safe
  because a JOIN's member ids were never given to another entity — and the resurrected member takes its address from the
  tombstone, its lineage from the parent and the child index, and its `builtBand` (§2.5) from the rung-3 event that
  re-cut it, never from the tombstone's last record; only an `undo` restores that record exactly (§7.4). A **tunnel
  record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex standing
  for the frontage anchor: the part holding it keeps the address, the other parts take addresses minted from the
  causing event's `seq` and ordinal, and every part continues the tunnel's lineage with its part index. A block's
  `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the
  record's first kerb edge in the centreline's order keeps its address, every other part — two where the record spans
  a whole interior stretch — takes an address minted from the causing event's `seq` and ordinal, each part continues the
  record's lineage with its part index, and an `undo` restores the one record (§7.4). A mutation continues lineage; only
  a re-derivation takes a fresh one — New random, and every successor the matching above gives in a re-derived scope
  (Adjust, Re-derive from Sk, a local operator of §7.3, template replacement, migration, what an epoch re-derives)
  (J-DET-2).
* **Dossier bindings never re-key (item 74).** A dossier re-binding (§7.7 item 12) re-points a binding row of
  `Document.dossier` and never re-keys a map address: the element's records keep their ids, lineage and geometry. A
  dossier name change that carries no receipt is a removal plus an addition (§7.7 item 12), and the addition mints
  nothing until the solver places the new element, from its placing event's `seq` (above).
* **Document identity.** `docId` (a UUID) is minted when a document is created, or taken from the host when it passes
  one (§11.2; item 459), kept on save, and re-minted on clone and save-as; addresses are document-scoped, so a clone
  keeps them. At the API and bridge boundary every id is rendered `<docId>/<id>`, so a host holding two towns never
  confuses their plots. Exports carry addresses and a supersedes table (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order (the one statement; §6.2 and §6.5 (6) cite it).

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
* **Table versions** — each rule table separately, pinned in the recipe by version and pinning hash (§7.6); a table
  change that changes output is part of an output-version bump. A user override carries its base row's hash (§7.6).
* **Pack versions** — each setting pack by id, version and content hash, in the recipe or in the `adjust` event that
  adds it (§2.9's pack set). The shipped packs belong to the output version like its tables (each retained version's
  chunk carries its own); a non-shipped pack's content travels in the document, a pack a later version stops shipping
  is copied into the document by the upgrade to that version (§7.5), and a selected user corpus is a non-shipped pack,
  `user:<content hash>` (§2.9).
* **Style version** — style sheets; changes pixels, never the model digest; carried in a link for pixel identity.

**Permalinks.** A link carries the canonical recipe, never a pointer to machine state:
* `?o=<output version>&s=<seed, base 36>&z=<rung>` when the recipe is the output version's defaults apart from seed and
  rung (watabou's one-line link kept);
* otherwise `&r=<base64url of the deflated CBOR recipe delta>` (params with preferences folded in, intent, the district
  intents (`districtIntent`), entry mode, the rerollable concerns' salts — keyed and schema-checked as `Recipe.salts`,
  §2.9 — and the table pins and packs that differ from the output version's shipped ones, packs by id, version and
  hash);
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
* **CI:** link → recipe → link identity, and the model digest built from a link equals the session's digest — for a
  one-line link, a link with a one-event log and a link at the 2 000-character limit. Refusal cases: a recipe naming a
  non-shipped pack; a town whose district names are drawn from a user-uploaded corpus selected after creation (a
  `user:<hash>` pack named only by an `adjust`); a town that selected such a corpus, deselected it, was saved and
  reloaded; a document with a host provider's output; and a town rebased by keeping the saved town after a forced load
  mismatch. In each the link is refused, and the `.plat` file opened by a library that has neither the pack, the corpus
  nor the provider replays to the session's digest (in the select-then-deselect case because the corpus's content
  stayed in `packs` while the first `adjust` names it; the rebased town reopening as the kept town, from its base
  state).

**Retention of old output versions.** The browser library ships the current output version's model packages and the
two previous ones (N−1, N−2) as lazily loaded, tree-shakable chunks (`@plat/*-o<k>`; an embed may leave them out);
while fewer than three output versions exist, the window holds those that do. The Node CLI replays any published output
version by installing that exact package version. A document or link inside the window replays exactly. Outside it, a
document opens as a frozen view (§2.9 step 2), checked by its chunks' content hashes only and labelled "made with o5; not
verified by this version", because its recorded root was computed by o5's model packages, which only the CLI still
installs; a link — which has no snapshot — opens under the current output version with a visible notice ("made with
o5, shown with o8; differences are expected") and the CLI command that replays it exactly. Nothing changes silently.
The same window bounds what the browser can undo by replay (an upgrade, a rebase onto an older version, §7.4): outside
it the undo is withdrawn there with the CLI command shown. *Measurement (M3a):* each retained output version adds ≤ 150
KB gzipped to its lazy chunk; the golden suite replays under N−1 and N−2. *Pre-decided fallback:* the browser window
shrinks to N−1 (the CLI keeps every version).

**Goldens** (§13.3 builds the tooling from M1). **Stage-isolated goldens:** the golden store keeps, per seed and stage,
the previous output version's frozen upstream outputs; a release computes each stage's digest by running the new stage
code on those frozen inputs, so only stages whose own code or tables changed can differ, and each such stage needs a
shift record. End-to-end goldens are re-signed only with a cascade record; both records and the protocol are §13.3's.

### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

1. Topology is §3.2's (integer centimetres, exact predicates).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath`, the vetted fdlibm port (§3.1; D-23).
3. **The lint is an allowlist.** In model packages — and in every adapter or provider whose output reaches the model —
   the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32, fround`,
   plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a bit-compared
   digest: `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the functions they call, and
   the S14 builder code that writes the display-list columns they read — `bbox`, the geometry ranges and `GeomTable`,
   `layer`, `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's extent uses `dmath`) —
   and §8.10's instance function with every function it calls (the stamp, grid and line layouts, the per-instance look
   draws and the density edge test), which the model-format exporters and override resolution run in the generation
   worker and whose positions §13.3 compares byte for byte across engines; and the CPU reference light pass of §8.4 with
   every function it calls (item 68) — its buffers and light values are compared byte for byte across engines by (9)'s
   lighting test, while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62). CI finds that code
   as the import closure of those implementations, column writers and the instance function, from the TypeScript
   program, so a module that joins it is linted without being listed; the rest of `@plat/render` — paint programs,
   backends, compositing — stays outside, because its output is pixels compared by visual regression (§13.3, §13.4).
   `**` is allowed only with a literal integer exponent from 0 to 4, and the build rewrites it into explicit
   multiplications (exponentiation is implementation-approximated in JavaScript); every other power goes through
   `dmath.pow` (S1's river-width law `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden: `Math.random`, `Date`,
   `performance`, timers, `crypto.getRandomValues`, DOM access, locale-dependent string operations (`toLocaleString`,
   `localeCompare`, `Intl`), `Array.prototype.sort` without a comparator, and any dependence on object-key or `Map`
   iteration order beyond insertion order. The lint also enforces §3.2 (8)'s division rule (`ratio()`), and it scans the
   dossier port's adapter boundary (item 73): no module of `plat/` outside `@plat/port`'s adapter folders names a key of
   the host's dossier — the adapter's key list (§14; its field table, V08 §2.4) is the scan's input — so the host's
   vocabulary lives in one folder.
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers follow §3.3's overlay-and-merge protocol (§6.3 *Workers*); no result depends on arrival order, and no
   model package reads time (§5.1 (5)).
7. **One boolean and offset engine per output version, on every host** (D-14): no host may silently run a different
   engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers.** Host tables are §6.2's. Host code registered as a provider (`ContentProvider`, §14) passes a
   double-run check at registration — the same request run twice in two fresh workers must return identical digests —
   and its results are recorded in the document's `hostContent` block, keyed by (provider id, version, input hash), and
   read from there on replay (§2.9, §11.4), so the document replays without the host. Setting packs follow the same rule
   through the document's `packs` block (§2.9).
9. **Determinism tests (CI)** — each on one fixture per base rung (§5.1 (10)), with a METROPOLIS fixture at the
   population cap:
   * *cross-host* — identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, pool
     sizes 0–3;
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
     be the same in both folds, a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` +
     `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed,
     confirmed and stored in the event, and the naming records restored with the names (§2.8) — and a corpus selection
     + `undo`, truncated, saved, reloaded and redone, its pack still in `packs` (§2.9);
   * *links and documents without their inputs* — §6.4's pack, user-corpus, provider and rebased-town cases;
   * *checks under the recording version* — a `keptSnapshot`-rebased CITY document upgraded across a test output
     version whose field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays
     to the session's digest; a frozen view of a fixture written by a test build labelled o(N−3) opens with no mismatch
     message, while one with a chunk's bytes altered reports damage and refuses the `frozenImport` rebase (§2.9 steps
     2–3, §7.5);
   * the double-run check of registered providers (8), and the distinct-key test of §6.1;
   * *click-order identity* (item 28) — the derived-complete digest extended to the elaboration rungs: for 50 CITY
     seeds, every district's wings and every clicked building's plan derived in three random click orders, under
     `elaborate: 'click'` and `'view'`, with the cache dropped to `absent` between runs, give identical model digests and
     records digests and byte-identical cached results per (entity, rung, input digest) across hosts; a layout re-roll
     leaves the wings, entrances and stair core byte-identical and a roles re-roll leaves every ring and opening
     position byte-identical (§6.1; the B-PLAN fixtures are §13.2's); **the interior ladder** (item 28 (f)) — a building
     whose occupants' band and household count change twice between clicks (a `relet` by hand and a band fall by an
     epoch) gives the same plan, byte for byte, with a click after each change and with one click at the end, and the
     same again with the cache dropped between them; its shell's leaf digest is unchanged by every re-cut; and a return
     to the as-built band and count gives the as-built plan exactly (§7.3's canonical prior);
   * *history determinism* (items 20, 22) — the same seed with the same ordered history of dossier events, rejections,
     positive placements and edits gives one model digest on every host, and two histories that reach one dossier give
     two valid maps whose difference is confined to their events' disruption sets (§6.2, §7.7; the fixtures are
     §13.2's); the history replay at generation (g item 113) is byte-stable per seed and history;
   * *session-history independence* (item 52; J-A52.61) — for 20 seeds, a seed's model digest generated first in a
     fresh process equals its digest when generated after 50 other maps generated earlier in that session and after
     every view toggle and zoom stop: no render draw touches a model stream (§6.1), Enter's successor is (seed + 1) mod
     2³², not a stream's state (§6.1), and no cache is keyed by anything but its content (§8.10's stamp tiles are built
     with the product and content-hashed). The references' mechanisms are the reason the test exists: in MFCG 12710731,
     VG 1.6.9 and NG 1.2.2 the renderer's leftover stream state becomes the following map's seed, and each caches its
     tree-spacing tiles per session; Dwellings (itch 17195045) resets its generator from the clock for some houses;
     Fantasy Manor 1.0.0 build 890 seeds from the page's load time. Ours is independent of the session by construction,
     and the test keeps it so;
   * *dossier fixtures* (item 83, T73-8) — the same dossier fixture of §13.2's B-DOSSIER-lite and the same seed give the
     same model digest on Node x86 and arm64 and in the nightly five-engine run;
   * *works stages* (item 67) — a Works' drawn stage at week w is a pure function of its record and w: the drawing at a
     week, reached directly or by scrubbing weeks forward and back, is byte-identical, and no digest moves (§6.2);
   * *lighting* (item 68) — the CPU reference light pass gives byte-identical light for the same model, lights, view and
     time on the five engines; the GPU pass lies within §13.4's tolerance of it; a light's flicker is a pure function of
     its render key and the view's time (§8.4);
   * *skeleton round trip* (item 101) — a map's declared subset exported as a skeleton (§11.1) and re-imported under its
     seed reproduces its model digest; a clerk's transcript of tool calls, replayed, gives the session's digest; one
     declaration made on the canvas, through the tool API and in a skeleton file gives one event (the elegance bars that
     schedule these are §13.2's).
10. **Second implementations.** *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer
    algorithm as the TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
    cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
    digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle. *The Clipper2-WASM
    engine* (§3.7's pre-decided fallback) is a different engine: it cannot reproduce the arrangement engine's integers,
    replaces it as the single engine on every host (7) with a declared golden shift (§3.7, §13.3), is pinned and
    vendored (4) and named in the report (§5.4); its determinism test is (9)'s cross-host one (J-DET-28).
