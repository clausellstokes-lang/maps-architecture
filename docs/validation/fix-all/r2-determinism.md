# Fix-all round 2 — DETERMINISM area (§2.1, §2.9, §5, §6, §7): the sixteen items still open after round 1
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-determinism-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-determinism-r2` · 2026-09-25 · seat: fix architect, DETERMINISM area, round 2 (Fable role; opus
stand-in) · clean-room: every mechanism below is described in this seat's own words and numbers; no reference code,
grammar, palette, word list or content table is quoted.

Status: COMPLETE (2026-09-25).

## 0. How to read this file (plain words)

Round 1 rewrote the part of the design that makes the same seed give the same town, keeps edits safe and handles
failures. The round-1 checkers left sixteen things open in this area. The two serious ones: **undo could not work when
several people share one town through a host** (the host's list of changes only grows, but undo removed the last
entry), and **a shared link could rebuild a different town** when the town used a setting pack or a host program that
the person opening the link does not have. The largest repair is to **river and terrain edits**: when a user moves a
river, its bridges now move with it, the main roads re-route to the new bridges, streets that now run into the water
are cut at the bank, a bridge left over dry land becomes ordinary road, and a terrain brush re-seats every building,
wall and bridge on the new ground. The rest are smaller contradictions: replaying a saved town ran the naming step once
at the end instead of after every edit (so a reload could name two streets differently from the session), "New random"
promised a change it could not guarantee, work limits were fixed per size class while town size varies within a
class, and a few sections restated or contradicted each other.

Section 1 lists every item and what happened to it. Section 2 holds the replacement text for the architecture, one
block per subsection, each beginning with `=== REPLACE … ===`; the integrator pastes them into `docs/ARCHITECTURE.md`.
Section 3 lists the changes other areas must make in sections they own. Section 4 lists the new judgment calls.
Section 5 separates what was measured from what is reasoned.

Nothing here is deferred. Where only an experiment can confirm a choice, the block states the chosen mechanism, the
measurement that confirms it and the fallback already decided. No item concerns subject matter the owner's roadmap
puts later, so none is STAGED-BY-OWNER; none was found factually wrong, so none is INVALID.

## 1. Disposition table

| item | sev | disposition | sections changed (cross-area in brackets) | mechanism, one line |
|---|---|---|---|---|
| VK-13 | minor | FIX | §6.5 [§3.7] | byte identity is required of the WebAssembly accelerator only; the Clipper2-WASM fallback is a different engine, adopted as a declared golden shift and checked for identical digests across hosts |
| LC-7 | major | FIX | §5.2, §5.3, §6.3, §7.1, §7.2, §7.3, §7.4 [§2.2, §2.6, §4.2, §4.3, §4.7, §4.8, §13.2] | the S1 water operator re-sites crossing decks on the re-traced reach and chains the S4, S5, S6 and S7 operators; F-REDERIVE gains way rungs (re-route through a deck, else cut at the bank and prune the stub; a deck over land becomes ordinary road); a batch-local invariant "a way crosses water only on a deck"; terrain strokes re-base every building, wing, tower, gate, wall vertex, bridge and pier exactly and re-run drainage locally; B-EDIT asserts 0 bridges over land, 0 off-deck crossings, 0 wings off the datum rule |
| NF-D1 | major | FIX | §2.9, §6.3, §6.5, §7.1, §7.4 [§11.2, §11.3, §13.2, §14, §16] | `{t:'undo'; of}` and `{t:'redo'; of}` are log events applied at the head through the same fold, with per-session stacks and a conservative independence check; truncation only in unshared documents, with a canonical `nextSeq` so the model digest is identical; convergence and enumeration tests include both |
| NF-D2 | major | FIX | §2.9, §6.4, §6.5, §7.6 [§10.4, §11.1] | packs recorded by id, version and content hash; every non-shipped pack's content is copied into the document's `packs` block; a link is refused (the `.plat` file or `&doc=` offered) when the recipe needs a non-shipped pack or `hostContent` is non-empty; CI link → digest adds pack and provider cases |
| NF-D3 | minor | FIX | §7.3, §7.4, §7.6 | §7.3 (5) reads "derivation record"; slice invalidation reads persisted `DerivationRecord.slices` where present, rebuilt provenance otherwise, and takes the first-reader-stage fallback where neither exists |
| NF-D4 | minor | FIX | §2.9, §7.4, §7.5 | an upgrade's undo record is its `from` output version (undo = a replay under the retained version); a rebase's undo record is its previous base — the recipe, always kept, or an earlier rebased state under the undo cap; past the cap, or outside the browser's version window, the undo is withdrawn with a notice and the CLI command |
| NF-D5 | minor | FIX | §2.9 [§3.9] | snapshots are stored as content-addressed chunks per district partition, so `model` shares every unchanged chunk with `base.state` (and is only a chunk list while the post-rebase log is empty); saving always writes `model`; a model-less file outside the window opens with the CLI message |
| NF-D6 | minor | FIX | §5.1, §7.1 [§13.2] | after New random each scope entity's content digest (identity left out) is compared; an unchanged one advances its reroll up to k = 3 more times, then keeps its old reroll and is reported; the event stores the rerolls used; B-EDIT minimal-scope fixture |
| NF-D7 | minor | FIX | §6.3, §7.8 [§12.6] | succession matching: grid buckets of the hysteresis radius per kind and class family, ≤ 2 µs per entity (measured 0.4–0.6 µs), district-partition-first matching as the fallback; a failing control's expansion row becomes a smoothstep over the failing interval and is re-swept, else the control is declared discrete in the report and the registry |
| LC-17 | minor | FIX | §7.4 | the MFCG-asks row reads "`moveLabel`, `hideLabel` — `LabelEntity.pinned` / `hidden` only (model data, in the digest); 0 other model changes; placement is view data" |
| N-1 | major | FIX | §2.9, §7.3, §6.5 [§8.1, §12.6, §13.2] | replay mode suppresses only S14 and S13b; S13a's scoped delta runs at each event's log position as in the session; B-EDIT fixture: two scoped regenerations drawing the same street name, then a `moveLabel` — replay digest = session digest |
| N-17 | minor | FIX | §5.2 | the F-LABEL row repeats §9.4's seven rungs in order |
| N-18 | minor | FIX | §6.1, §7.1, §7.4 [§14] | `labels` leaves `rerollLayer` and the salt list; only concerns that a registered stage or paint program draws from are rerollable, enforced by a registry test |
| N-29 | minor | FIX | §2.1 | §2.1 points to §8.4's `LayerSpec` instead of restating it |
| NF-S9 | minor | FIX | §7.1 | the warp table's Measure row points to §9.5's measure tool (view data, no model event) |
| NF-S10 | minor | FIX | §5.1, §5.2 [§4.12, §14, §13.2] | work limits are laws `floor + perUnit × count(unit, scope)` over the batch scope's population-derived counts, so they follow population inside a rung and a scoped re-run gets the same limit; §13.2's sweeps check the F-WORK hit rate is flat across each band, with a pre-decided coefficient fallback |

Aligned in passing (items owned elsewhere whose text sits in this area's sections, made consistent so the integrator
meets no contradiction): §6.1 states the attempt cap per concern (3 for geometric ladders, 8 for the naming re-draw of
§9.6) — the §6.1 clause of NF-D12; §7.4's `instance` row applies overrides by ordinal only while the entity's lineage
survives and re-matches by position whenever it changed — the §7.4 clause of NF-D11; §7.3 item 7 (iv) states the
calibrated rank test that the scope verifier executed for IMP-7 (owner scope, "with determinism (§7.3)"), so this
area's §7.3 block does not re-introduce the band test that fails a perfect regenerator; §2.9 names the bridge's
concurrency token `logHead` (FTG-22's §2.9 clause, owner scope with rendering for §11.3's `baseLogHead` /
`currentLogHead`), so no FTG field name survives in this area's text.

## 2. Replacement blocks

Each block replaces one subsection of `docs/ARCHITECTURE.md` whole (heading line included), matched by the exact
current heading. Blocks are in document order. Every block carries the review banner directly under its heading.
Unchanged paragraphs are repeated verbatim so each block is complete.

=== REPLACE §2.1 Layers, coordinates, units, ids ===

### 2.1 Layers, coordinates, units, ids

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

* **Units.** Every model length is an integer number of **centimetres** (`i32`), the world centred on (0, 0), `+x`
  east, `+y` north (FTG's convention, `_critic-ftg.md` F1, CONFIRMED), inside a rectangular frame of the rung's area and
  the blueprint's aspect (§3.2 (9)). Twice-areas are exact integers from `area2`, and ring orientation comes from
  `orient2d` (§3.2 (6)). Heights are centimetres. Angles, where stored, are `i32` centidegrees; directions used in
  geometry are integer vectors. A schema lint refuses any length field without a unit suffix (`…Cm`, `…M`) — O6 (a)
  (G-R14).
* **Layers.** `layer ∈ {underground, ground, sky}` is a field on every geometric entity and every display-list item,
  with `z: i32` (order inside the layer) and `elevationCm: i32` (base elevation: an island's altitude; a sewer's
  negative depth). **Each layer has its own arena** (G-R11) — the ground, the underground and one per sky island, keyed
  by `PlatKey` (§2.2): sky and underground geometry never cut ground faces; cross-layer references (an island's shadow
  footprint, a sewer outfall) are ids. Per-layer toggles, shadows (a sky layer casts onto the ground layer through the
  shadow pass, §8.4) and per-layer export (§11) hang off this one field. The base populates only `ground`; the others
  are schema-complete and empty. Each layer's drawing and export settings are a `LayerSpec`, defined once in §8.4 (its
  order, elevation, visibility, shadow target, separate export and the sky layers' occlusion policy); `setLayer` edits
  it (§7.1). **Wording:** in this document *layer* without qualification means one of these three model layers; the
  toggleable drawing groups of §8–§9 (labels, cadastral outlines, trees, annotations, the thematic style overrides) are
  display-list groups selected by `semantic`, never a fourth model layer.
* **Ids.** Every entity has an **address id** `kind:token` — prefixed with its arena outside the ground layer
  (`sky2/plot:…`, `under/tunnel:…`) — that edits, locks, assignments, pins, labels, households, exports and hosts point
  at, and a separate **lineage key** that keys its random streams. The two, the anchor rule with its hysteresis radii,
  survival and succession, the JOIN rule and the one collision rule are defined in §6.3 (LC-1, LC-29, GEO-34). In memory
  addresses are interned `u32` handles — the kernel's owner and role tables hold them (§2.2 rule 5) — and in the
  document they are strings. The parent is a field, never parsed from the id; no record outside the kernel stores an
  arena slot.

=== REPLACE §2.9 The document and serialisation ===

### 2.9 The document and serialisation

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

A document is **a base plus an ordered log**: the base is either the canonical recipe (the town replays from its seed)
or, after a rebase, a materialised state; the log is every event since the document was created, in `seq` order.
Everything else in the file is input recorded for replay (setting-pack content, host outputs), a verified cache, or
per-user state.

```ts
interface Document {
  docId: Uuid;                  // minted at creation by @plat/api (outside the model packages); kept on save; re-minted on clone and save-as (§6.3)
  schemaVersion: string;        // the file format (§7.5)
  outputVersion: string;        // the model packages whose output this document replays under (§6.4)
  base: Base;
  log: EditEvent[];             // the single source of truth for every edit, lock, assignment, table edit, epoch, rebase, upgrade, undo and redo (§7.1, §7.4); a rebase never removes events
  nextSeq: number;              // the seq the next event takes; never decreases — also when an unshared document truncates an undone pair (§7.4, NF-D1)
  packs: PackData[];            // the content of every non-shipped setting pack the recipe names, user corpora included (§7.6, §10.4) — canonical, outside the model digest (NF-D2)
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache verified by digest (below); always written on save
  view?: ViewState;             // per-user and shared view keys (below) — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[] };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records follow §7.4); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` and folds the events after `seq`; the town is not seed-reproducible before `seq`
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the output version's shipped set */ }[];   // setting packs (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<ConcernId, number> }        // initial per-concern salts (normally 0); rerollLayer events in the log advance them (§6.1)
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* Merkle root, §6.2 */ }
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields'; partition: string /* PlatKey and static-index partition (§3.3), or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // time, location, favourites, notes and public notes, view pins, layer choices, season, weather, frame, rotation, compass, legend and emblem settings — each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1)
type RebaseReason = 'keptSnapshot'|'keptOldModel'|'drawnConstraintsRebuilt'|'frozenImport';
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`),
  epochs, undo and redo exist only as log events; their current effect lives in the entity records (flags, attributes)
  and in `derived` caches rebuilt from the base and the log. The blueprint's assignments and edits become `assign` and
  edit events at log positions 0…k when the document is created (§7.7). The report and the statistics record are
  caches; per-stage timings are session telemetry and are never saved (§5.4). A rebase never deletes events: the
  events before it stay in the log as history and as the rebase's undo path (§7.4), and the fold skips them while the
  base is the rebased state.
* **Model inputs that are not in the recipe** (NF-D2). Every setting pack the recipe names is identified by id, version
  and content hash. When a document is created — or an `adjust` adds a pack (§7.6) — the content of every pack that is
  not in the output version's shipped set is copied into `packs`, together with the user's uploaded corpora (§10.4); a
  host provider's outputs are copied into `hostContent` as they are produced (§11.4). On load each pack is resolved by
  hash, first from `packs`, then from the library's shipped packs; a missing pack or a hash mismatch opens the document
  read-only with a message naming the pack, never a replay with other content. So a document replays on a machine
  that has neither the pack nor the host. Pack data and host content are counted outside the per-building budget below
  and capped at 2 MB gzipped together; a pack that would pass the cap is refused when it is added, with a message.
* **Load** (the K-3 repair, completed by LC-13, LC-28 and N-1):
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current
     version and records that it is not seed-reproducible before the rebase. A document without `model` outside the
     window (only the CLI writes one, below) cannot be shown as a frozen view: the app says so and shows the CLI
     command that replays it under its own output version (§6.4), and offers to open its recipe under the current
     version as a new document with §6.4's notice.
  3. Otherwise `model` is displayed at once and **verified**: replay (base, log) in replay mode — every model stage runs
     at its event's log position exactly as in the session, S13a's scoped delta included; only the view stages S14 and
     S13b are suppressed and run once at the end (§7.3) — and compare the Merkle root with `model.digest`. Edits made
     during verification are queued, not applied; the user may end the wait by choosing "trust the saved town", which
     is a `rebase` onto `model` (reason `keptSnapshot`).
  4. A **mismatch is never silent** and is resolved once: keeping the saved town appends a `rebase` event (the saved
     state becomes the base); taking the replayed town replaces `model`. Either way the document is consistent after
     the choice, the next load does not report it again, and undo below a rebase uses the rebased state, never a replay
     from the seed. A rebase fills in, from the rebased state, the derivation record of any entity that lacks one, so
     Regenerate (keep settings) stays defined for every entity. Queued edits then apply to the chosen state.
  5. A document without `model` inside the window loads by replay; `model` is a cache, never the only copy of anything.
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records); **provenance is not stored** —
  verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full resolution:
  an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2); the snapshot
  carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document is ever
  opened as a frozen view. The report records stream keys only for ladder uses (any rung from tier 2 up), never every
  key.
* **Content-addressed chunks; one copy of a rebased state** (NF-D5). A snapshot is serialised as chunks, each keyed by
  its 128-bit content hash and written once in the container however many snapshots reference it: per arena, the
  L0–L1 geometry as one chunk and the L2–L4 geometry of each static-index partition — one per district plus one
  outside districts (§3.3), the same units as §7.4's copy-on-write checkpoints — as one chunk each (district
  boundaries are always spine edges, §2.2 rule 1, so every L2–L4 edge lies in one partition; a vertex shared by two
  partitions is written in the partition with the smaller key and referenced by (chunk, index) from the other); entity
  columns per partition; the archive, the lifecycle history and the field cache as town chunks. A rebased document's
  `model` therefore shares every unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only
  a chunk list naming `base.state`'s chunks (the same digest), and after edits only the chunks of the partitions those
  edits touched are stored twice. *Chose content-addressed chunks over a bespoke delta format because the partitions
  already exist for the static indexes and the checkpoints, deduplication by hash is exact, and a loader needs no
  delta logic.*
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population
  (≈ 212 B per building; PLAT also stores plots, yards, heights and lifecycle, and derives people); pack data and host
  content are counted separately (above). This section holds the document budget (§12 carries memory, not the
  document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and one on a rebased CITY document
  after 20 edits (≤ 1.25 × the unrebased document). *Pre-decided fallback if CITY exceeds 320 B per building:* the
  vertex stream switches to second-order (predictive) delta coding — each vertex stored as its difference from the
  straight-line continuation of the previous two along its first edge — with x and y in separate streams; the change
  is lossless and output-neutral, so no golden moves.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  `nextSeq`, base recipe, log, pack data, host content, style, the snapshot chunk lists) + binary blocks (the chunks, by
  hash) as typed arrays. Saving from the app or the API **always writes `model`**; only the CLI's `--recipe-only`
  export writes a document without it (test fixtures and files made from links). The compact twin for embeds (CBOR
  with typed-array tags) encodes the same schema in world coordinates, with the settlement centre recorded in its
  header (§11.1), so it round-trips exactly (O11 c). Exports are views (§11) and carry address ids plus a supersedes
  table (§6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `nextSeq`,
  `base`, `log`, `packs`, `hostContent`, `style` and `model` (when present); `view`, `derived` and `undo` are never
  canonical. Three digests: the **model digest** (Merkle root over model content, §6.2 — goldens, verification, the
  locality oracle), the **provenance digest** (provenance and derivation records, §2.8 — the locality audit only), and
  the **document digest** (over the canonical bytes — save → load → save identity). The bridge's concurrency token is
  `logHead` = a 128-bit hash of (`docId`, log length, hash of the last event) (§11.3; named in our own terms, FTG-22).
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices, season,
  weather, frame, map rotation and compass, legend and emblem settings — and which people a user has looked at — live in
  `view`, outside every digest; each key is last-writer-wins by (Lamport counter, session id), so a viewer never writes
  the model.
* **Round trip** is a hard test: export → import → export byte-identical over the canonical form (O9 a, O11 c).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4.

=== REPLACE §5.1 Principles and the seven tiers (G-P7) ===

### 5.1 Principles and the seven tiers (G-P7)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

1. **The unit of failure is a kernel transaction (a batch), never the map.** MFCG's `City.hx:156` catch-all (a
   bisector exception restarts the whole city, `profile-mfcg.md` ST-8) and VG's silent seed swap (4 of 27 attempts) are
   the behaviours removed; the pipeline has no restart path (J-K adopted; D-9).
2. **Feasibility by construction before geometry**: S1 guarantees river descent, S2 derives the stage budgets from
   demand, S3 places the site relative to the river and reserves the castle, plaza and institution precincts (§4.2) —
   the hard constraints MFCG puts in its restart tier are satisfied before any fabric is cut.
3. **Every stochastic step has a declared, bounded, deterministic ladder**, and every rung writes a report line with a
   cause code and its tier; the ladder path is replayable from the printed stream key.
4. **Invariants police validity, not regularity** (FTG's sheared minority of quads and NG's wedge class stay).
5. **Every limit that can change output is a work limit, never a time limit** (GEO-2), **and it follows the size of
   its scope** (NF-S10). Each stage declares its work limits — counts of kernel calls, proposals, candidates, skeleton
   events and recursion depth (§14) — as **laws over its batch scope's counts**, not as fixed numbers per rung:

   ```ts
   type WorkUnit = 'plots' | 'buildings' | 'households' | 'landHa' | 'frameCells' | 'latticeNodes' | 'faces' | 'vertices';
   interface WorkLimitLaw { counter: string; unit: WorkUnit; perUnit: number; floor: number; log2?: boolean }
   // limit = floor + perUnit × count(unit, scope); with log2, floor + perUnit × ⌈log2(count)⌉ (recursion depths)
   type WorkLimits = WorkLimitLaw[];          // StageDecl.workLimits (§4.12, §14); coefficients are rows of `workLimits.json` (§7.6)
   ```

   `count(unit, scope)` reads only model values committed before the batch runs — the request's population through
   S2's demand and stage quotas, the `Allocation` records, the scope's land area, frame cells or lattice size — never
   a measurement. So a limit grows with population inside a rung exactly as every other quantity does (§1.1: TOWN spans
   1 500–10 000 inhabitants, METROPOLIS 30 000–120 000), a district batch gets a limit proportional to its district, and
   a scoped re-run (an edit, a regeneration, a replay) gets exactly the limit its scope had in the full run. A kernel
   call that reaches its count returns `E_WORK_LIMIT` (§3.1), and the ladder treats it like any other failure (F-WORK,
   §5.2), so the same inputs take the same rungs on every machine. The coefficients are set by a fixed rule, not by
   hand: each is the 99.9th percentile of the measured work per unit on B-CITY-lite × 1.5, computed by the spike or
   milestone that builds the stage and recomputed whenever the stage's code changes (a declared shift if output
   moves). *Confirmation (M1, then every nightly cost-model run, §13.2):* the F-WORK hit rate per stage is flat across each band — at the top of every band it exceeds the rate
   at the bottom by at most 1 per 1 000 batches. *Pre-decided fallback:* a counter that fails gets its `perUnit` raised
   to the measured 99.9th percentile per unit at the band's top × 1.5 and the sweep re-runs; a coefficient change that
   moves output is a declared shift (§6.4). Wall-clock time is read only by `@plat/api`'s worker host, never by a model
   package (§6.5): it may postpone or resume a lazy tier (F-BUDGET-TIME) and it writes telemetry, but it never changes
   what is computed — a tier computed late hashes exactly like one computed at once. *Chose operation counts over
   wall-clock watchdogs because a watchdog makes a throttled background tab, a slow laptop or a busy CI runner produce a
   different town from the same seed; the millisecond budgets of §12 stay as reporting targets and cost tests. Chose
   laws over the scope's population-derived counts over fixed counts per rung because a fixed count sized for a rung's
   target fires systematically near the top of its band — coarser output inside one rung and a break in §7.8's
   monotone population control — and is slack near its bottom.*
6. **Retries are not rerolls** (LC-5), **and New random is checked to change its scope** (NF-D6). Ladder retries (tier
   3) draw from the `attempt` key component, which restarts at 0 for every reroll of the scope entity and has the same
   cap each time; the user's New random advances the `reroll` component (§6.1, §7.1), so every reroll has its full
   ladder. A full ladder does not by itself guarantee a different result, so after the re-derivation the engine
   compares each scope entity's **content digest** — the Merkle node of its subtree computed with identity (address,
   lineage) and lifecycle left out: kinds, geometry and attributes only — with the value before the event. A scope
   entity whose content is unchanged advances its reroll once more and re-derives, up to `reroll.maxAdvance` times (a
   table value, default 3); if its content is still unchanged it keeps its original reroll — nothing about it changes,
   not even its lineage — and the report lists it as "no alternative within the ladder". The advances run on the dry
   run's overlay (§7.1), so only the chosen result commits. The event stores the rerolls actually used (§7.1), so a
   replay repeats neither the comparison nor the advances. *Test (B-EDIT, minimal scopes):*
   New random on a block holding one plot, a plot with a one-building row site plan, a one-cell district, a ruined
   building and a person whose every attribute path is locked either changes the scope's content or reports it — never
   a silent no-op and never a change of identity without a change of content.
7. **Requested features are counted by delivery tier.** The report records, for every feature the request names,
   whether it was delivered at tier ≤ 3 (*full*), at tiers 4–5 (*degraded*) or dropped at tier 6 (*omitted*);
   acceptance counts a tier-6 omission of a requested feature as a failure (§15.2). "No restart path" is a design
   property, not an acceptance number.

```
tier 0  feasibility by construction    the constraint is satisfied by how the input was made
tier 1  constraint check               typed KernelResult / invariant; nothing committed
tier 2  local repair                   a deterministic geometric fix: attract, widen, merge, re-inset, re-claim, re-site
tier 3  bounded local regeneration     retry the same entity with the next ATTEMPT inside its current REROLL; ≤ 3 attempts per reroll
tier 4  simpler primitive              bent cut → straight cut on the mean normal → perpendicular mid-run cut;
                                       skeleton → medial axis (labels) / plain roof (roofs)
tier 5  substitution                   an uncuttable block becomes a court, a green or a landmark plot (NG's rule)
tier 6  documented omission            the feature is dropped for this entity and the report says so; never silent
```

Tiers 2–5 run inside the transaction on the overlay; tier 6 commits without the feature. No tier re-runs another
stage, and no tier re-rolls anything outside the failing entity's scope, because every retry draws from
(entity lineage, concern, reroll, attempt) and nothing else reads that stream (§6.1).

=== REPLACE §5.2 Failure classes: detection, ladder, test ===

### 5.2 Failure classes: detection, ladder, test

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

Rows marked † carry a ladder whose mechanism another area owns (named in brackets, with the section that states it);
the row repeats that area's rungs so this table and §3–§4, §9 agree.

| class | where | detection | ladder (in order; each rung deterministic from the stream key) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [kernel, §3.6; GEO-3] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` (optional chains); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | optional chains only (growth proposals, optional lanes, decorative lines): re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains (coasts, shores, banks, rivers, wall traces, arterials, band and kerb edges, plot lines, user-drawn geometry) cannot fail for a precision reason after attraction (§3.6); `E_OUT_OF_RANGE` is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ: 10⁶ random concave, holed, thin, near-collinear, self-touching and snapped inputs per primitive, plus constructive degeneracies (§13.1): 0 crashes, 0 hangs, 0 self-intersecting outputs, 0 undeclared slivers (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [pipeline, §4.6; GEO-23] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a pre-step: a face with a reflex vertex deeper than the band's block depth is first split from it, and at antenna roots) → redraw the cut's position ×2 → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run through its midpoint, clipped to the face's own component → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), allowed only for faces ≤ 2 × the band's upper block area | property test: on 10⁵ random concave and holed faces the ladder terminates in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5); MFCG baseline: 19 skipped cuts and 3 of 16 cities restarted for "bad poly" |
| F-CORRIDOR† union produces slivers or a collapsed block [kernel, §3.6; GEO-35, GEO-4] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (§3.6): merge across a partition edge, else keep the face as `residue` — a structural edge is never deleted → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [pipeline, §4.2 S1; GEO-13] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | island, fjord and sky-island fixtures: 0 non-simple outlines committed |
| F-RIVER† no course / no crossing [pipeline, §4.2 S1; GEO-36] | S1, S3, S1's water operator (§7.3) | descent stalls in a sink; the carve depth would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report; a requested river island whose branch separation fails is reported "not built"; inside an edit the re-trace is confined to the edited reach and the inlet and centre rungs are not offered (the edit is then declared Re-derive from S1, §7.3) | 1 000 seeds × {river, river + coast} × rung: "river within the core when requested" = 100 % (MFCG baseline 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [pipeline, §4.2 S1; GEO-14] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: contours crossing water 0; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails slope / land / flood tests | relax the slope threshold one step → the largest land component's centroid band → report | corpus sweep over relief characters |
| F-ROUTE† no arterial path [pipeline, §4.3; GEO-17] | S4, S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | move the crossing site along its reach within its search band (the deck stays perpendicular to local flow) → allow one bridge at extra cost → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is logged but invisible to the user, O16) | scripted requests on 100 seeds with pathological sites; O4 (a) 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [pipeline, §4.2 S2, §4.4; FTG-2] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density and grow only the added ring, recomputing the trace) → accept and report the shortfall; the exact plot check after S10 then feeds F-SITING | B-CITY sweep over wealthLevel {0, 0.5, 1}: population ± 5 % on ≥ 95 % of seeds and the walled share in its band |
| F-WALL† bad trace / gate count infeasible [pipeline, §4.4, §4.8; kernel, §3.6–§3.7; GEO-18, FTG-8] | S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | the trace is fixed before growth with its gates pinned (S5a): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored) and add water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no gate: a declared sealed circuit) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %, `gates = N` exact, 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds; MFCG baseline: sealed cities at `gates = 0` without fallback |
| F-CASTLE† compactness / overlap [pipeline, §4.2 S3, §4.8; MFP-3] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | inside the S3 reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | castle area and compactness in band on ≥ 99 % of B-CITY seeds, 0 ways through reservations; O8 (d); MFCG baseline 178 equalize passes and 11 bloats per census |
| F-PLOT† unusable plot [pipeline, §4.7; GEO-24] | S10 | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition instead) → merge into the neighbour → insert an alley to give access → typed residue (court / vacant) | invariants: every plot has ≥ 1 access edge (100 %), 0 landlocked buildings; NG baseline 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [pipeline, §4.7; LC-2, FTG-1] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge); moves across districts happen only in the allocation's own reconcile (S7b) → reduce the manifest and report `unplaced` — decided eagerly, never by the order in which lazy districts are placed, and never silently (FTG V1 "would regularly give up") | O18 (f): 100 % of institutions on a plot meeting their requirement; districts derived in three random orders give identical digests (§6.5) |
| F-SITEPLAN† footprint does not fit [pipeline, §4.7 S11; FTG-13] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke, a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f): 100 % of footprints fit; 0 renderer fallback rectangles |
| F-SKELETON† skeleton fails [kernel, §3.8; GEO-8, GEO-2] | S11, S13a | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | labels: a sampled medial axis (§3.8, used by §9.3); roofs: a **plain roof** (VIS-11) — the footprint drawn with no ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8) | ladder-coverage fixtures (§13.1) render every downgrade and assert no roof line outside its footprint; 0 crashes on 1 000 holed polygons |
| F-LABEL† no fit [rendering, §9.4; GEO-29] | S13b (view side) | spine shorter than the text at the minimum size; unresolved collision at priority | §9.4's seven rungs, in order: (1) the preferred spine at the size ∝ √area, never below the floor → (2) the short name form → (3) a straight label on the OBB axis, on one line or on two lines broken at a `breakAt` position → (4) the OBB arc → (5) the **quarter tree**: the label yields to the smallest ancestor node in the quarter tree whose spine fits its name at the floor → (6) a declared **overflow**: ≤ 20 % of the glyph area outside the face, never over a protected obstacle or another label → (7) a **legend entry**: a numbered disc on the face and a row in the legend (§9.5). Floors are in pixels; every rung reached is counted in the report; placement is view data and never changes the model | "0 collisions" is a view invariant, tested by B-ZOOM at settled views and during a zoom sweep; ≥ 99 % of all area-label glyph area inside its face, which caps the overflow rung at 5 % of the on-map area labels (§9.4) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth); every count is the stage's law over its batch scope's population-derived counts (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | the golden suite under a time-dilation shim (every clock read × 10 and × 0.1): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; the hit rate flat across each rung's population band (§13.2) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only (GEO-2) | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes identically to the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; an assignment cannot be honoured within its drift bounds; a warp would break an invariant; the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events (§7.4) | the dry run returns the conflict as an action — the nearest valid position, the blocking lock, the edit-fate list for confirmation (§7.3), or the dependent events to undo first — precedence lock > assignment > drawn geometry > rules (§7.7); never silently resolved | B-EDIT sequences and conflict fixtures; 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content or crossings [LC-7] | §7.3 local operators (S1 water and terrain, S4, S5, S6, S7) | a plot, footprint or yard lies in new water, in a new corridor, across a moved wall band or outside its new cell; after the S4 and S5 operators have run, a way still crosses water off a deck; a deck span no longer crosses water | **plots and buildings:** re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts, with a lifecycle event whose cause is the edit. **A way crossing water off a deck:** re-route it through the nearest deck when one lies within the detour bound (the re-routed length between the way's nearest pinned nodes on either side of the water ≤ 1.4 × the old length) → otherwise split the way at each bank (`splitThrough` on the shore edges), remove the part over water, keep each land part as a way — the part that keeps the old way's anchor (its end junction, else the larger overlap, §6.3) keeps the address, the other is a fresh way — and remove a land part shorter than the district's minimum block width that ends at the bank (a stub), leaving a dead end at the bank. **A deck over land** (its reach moved away and §7.3's re-siting found no site within the band): the `Bridge` becomes a tombstone (`demolish`, cause the edit) and its span stays in its way as an ordinary segment of the way's class — the higher class of the two ways it joins where the span was a separate `bridge` way — or leaves with the way if the way itself was removed. Every re-cut, demolition, re-route, cut and pruned stub is listed in the edit-fate report with its lifecycle event; a locked or pinned entity is never demolished, re-routed or cut — its conflict returns to the dry run as F-EDIT | B-EDIT terrain-brush (both water modes), river-control-point, drawn-water, drawn-way and drawn-wall sequences: 0 hard invariant violations; 0 decks over land, 0 off-deck crossings (§5.3); 0 wings off §2.6's datum rule (`baseCm` = the highest terrain sample under the wing + the plinth, user-edited bases excepted); 0 footprints in water; every demolition, cut and re-route has an event |

=== REPLACE §5.3 The invariant suite, by scope (SCL-1) ===

### 5.3 The invariant suite, by scope (SCL-1)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

Every invariant declares a **scope**, and only batch-local invariants run per batch. *Batch-local* invariants are
evaluated on the batch's touched faces plus their one-ring and on the records the batch created, changed or removed;
*stage-end* invariants run once when a stage (or a stage's scoped re-run) completes; *save / load* invariants run when
a document is written or verified; *CI-only* invariants run in the test harnesses. The dry run of an edit (§7.1)
evaluates the edit's batch-local and stage-end invariants once on the scratch overlay, and the commit reuses that result
(the overlay is committed as validated), so an edit pays for one validation, not two.

| invariant | scope | how it is checked |
|---|---|---|
| the kernel invariants of §3.10: lattice points inside the range; no edge shorter than `minEdge` from any writer (insertion, booleans, buffers, offsets, smoothing, warp); clearance; simple faces except declared antennae; nesting by index (every level-(n+1) face has one level-n parent); the Steiner bound; role consistency, with no structural role lost | batch-local | the commit record's faces, edges and role keys (§3.3, §3.10) |
| class floors: min width / area / angle per class (never `minEdge` as a face floor; GEO-35) | batch-local | touched faces |
| no footprint overlap | batch-local | touched footprints against the spatial index |
| every plot with ≥ 1 access edge, every building with its entrance on one | batch-local | touched plots and buildings |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water** (LC-7): every edge carrying a `way` role whose two sides both lie in water — the L0 parents of the faces on either side are water faces — belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying the `deck` role; fords included) or to a `pier` way (§4.8); every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2) |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall (MFP-9) | batch-local | touched footprints and wall bands |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every bridge within ± 10° of the channel normal, measured on the deck and on the way (GEO-17) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| reference integrity of records: every reference out of a touched record — people and relations included (a dependent's carer resolves) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
| identity: every fresh address differs from every live and tombstoned address, and no two live entities share a lineage key (§6.3) | batch-local | at mint, O(1) against the identity set |
| every length field carries a unit | batch-local | at schema write (and the lint of §2.1) |
| every stored geometry reference resolves (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` of every live entity), and no geometry carries a dead entity | stage-end, save | the kernel's reverse indexes (§3.10) |
| every gate joined to the network and to the plaza; the roads leaving each walled stage equal its gate count, and an outer enceinte's gates ≥ its arterial crossings | stage-end (S7) | one graph search per enceinte |
| every quay reachable from the town without crossing a wall except at a gate (FTG-8) | stage-end (S7, S9) | one graph search |
| no branch re-joins its parent within k segments | stage-end (S5) | per growth stage |
| a sealed enclosure only when declared | stage-end (S7) | per trace |
| contours never cross a shore — a check of the clip construction, never an abort path | stage-end (S1) | F-CONTOUR's clip (§5.2) |
| names unique within their kind's scope, and a new entity never renames an existing one (§9) | stage-end (S13a) | per naming run |
| every requested feature (river through the core, N gates, a harbour when coastal, …) delivered, degraded or omitted, and reported with its tier (§5.1 principle 7) | stage-end | the report's `requested` list; acceptance counts omissions (§15.2) |
| containment complete: building ⊂ plot ⊂ block ⊂ district, 100 % | stage-end | per-batch containment counters summed, not a model walk |
| the canonical document validates against its schema; the recorded digest is the maintained Merkle root | save | at write |
| the replayed Merkle root equals the recorded one | load | the verification replay of §2.9 |
| a full recomputation of the Merkle root from its leaves equals the incrementally maintained root | CI-only | every B-CITY generation and every B-EDIT sequence (the digest-maintenance oracle) |
| digests equal across platforms, under time dilation, under district permutation (the derived-complete digest), and replay = session | CI-only | §6.5, §7.3 |

Label collisions are not a model invariant: placement is view data and its "0 collisions" is tested by B-ZOOM (§5.2
F-LABEL, §9). Hard invariants abort the batch, which rolls back to the previous arena version while its ladder
continues; soft ones (statistics bands) go to the report. CI counts hard violations per 1 000 cities and requires 0 (O3 b). **Cost rule:**
validating a batch costs O(touched faces × log n), never O(model); the per-edit validation time for a fixed scope must
be flat from TOWN to METROPOLIS within ± 20 % (a cost test, §13.2, measured at M2a, the editing core). *Pre-decided fallback:* an
invariant whose batch-local check breaks that flat cost moves to stage-end scope — it is still hard, only checked later
in the same stage.

=== REPLACE §6.1 RNG and stream design ===

### 6.1 RNG and stream design

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

* **Engine:** xoshiro128\*\* per stream (four 32-bit words; period 2¹²⁸ − 1; fast in JS, no BigInt).
* **Keys are mixed from structured components, never from strings** (SCL-12, K-6 / R-1 kept). The **seed key** (128
  bits) is derived once from the seed by four 32-bit-lane finalisers with distinct salts (all `Math.imul`). When an
  entity is minted, its **entity key** — the mix of the seed key, its lineage hash, its layer and its island (§6.3) — is
  computed once and cached in the arena beside the lineage hash. A **stream key** is one finaliser round over the entity
  key combined with the packed components (stage id u16, concern id u16, reroll u16, attempt u8, epoch u16, salt u16);
  its four words seed the state directly (the all-zero state is replaced by a fixed nudge). A stream is created once per
  derivation and continued; a second request in the same derivation returns the same stream. No string is built on the
  generation path: the textual form `S11/siteplan@plot:7kq2m9x4c1b0a/arrangement[/r=1][/a=2][/e=0]` is rendered from
  the same components for reports only. *Budget:* ≤ 0.1 µs per stream key (string paths measured 0.73 µs, SCL-12).
  *Measurement:* the M0 (d) determinism spike times key derivation over a B-CITY city. *Pre-decided fallback:* derive a
  batch's stream keys in one vectorised pass over a typed array — output-neutral, so no golden moves.
* **The components** (the old path segments):
  - **lineage** — the entity's stream identity (§6.3): layer, island, derivation unit, stage, creation epoch, creation
    index; kept by a surviving entity, so nothing that survives is re-rolled;
  - **concern** — what the draw is for (registry below); streams are never shared across concerns;
  - **reroll** (LC-5) — the scope entity's New random count, an absolute number stored in its identity and written into
    the `regenerate` event as an explicit per-entity map (the rerolls actually used, §5.1 (6)); children draw with their
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else;
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll; its cap is declared per concern
    in the registry: 3 for every geometric ladder (tier 3), 8 for the naming re-draw of §9.6 (a repeated name re-draws
    on its own stream before taking a distinguishing suffix);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town);
  - **salt** (COV-VG-VN-008) — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1),
    only for **rerollable** concerns: non-geometry concerns that some registered stage or paint program actually draws
    from — `naming`, `render.instances`, `style.jitter`, `style.crowns`. Geometry concerns take no salt (their reroll is
    the regenerate action), so rerolling the trees or the names moves nothing else. The registry marks a concern
    rerollable only when a `StageDecl.streamKeys` entry or a paint program names it, `rerollLayer`'s concern type is
    generated from those entries, and a CI test fails when a rerollable concern has no reader (N-18). Label candidates
    are geometric (S13a, §9.3) and label placement is a deterministic greedy over a total order (S13b, §9.2), so no draw
    reads a labels stream and none is registered: "reroll the labels" is not offered, and re-placing a label is
    `moveLabel`.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2, FTG-14) — use the class's registry entry as the derivation unit and the ordinal as the creation index,
    through the same mixer.
* **Concern registry (G-P6):** adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Each entry declares its reader stages,
  whether it is rerollable and its attempt cap. Initial concerns: `terrain.noise`, `terrain.controls`, `water.coast`,
  `water.river`, `water.islands`, `water.delta`, `site.centre`, `blueprint.features` (S0's per-rung feature draws,
  §4.2), `intent.surprise` (§7.7), `gate.pick`, `reserve.plaza`, `reserve.castle`, `reserve.precinct`,
  `reserve.water`, `roster` (with the ordinal-keyed `roster/<class>/<ordinal>` draws), `route`, `growth.heading`,
  `growth.branch`, `growth.mainroad`, `growth.curvature`, `district.seed`, `district.type`, `alloc.district`,
  `alloc.block`, `field.chance`, `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt`, `plot.width`,
  `plot.join`, `plot.vacancy`, `plot.bounds`, `siting`, `siteplan`, `siteplan.template`, `heights`, `material`,
  `greenery`, `fields`, `crop`, `forest`, `hinterland.outside`, `hinterland.decor`, `pin.centrepiece`, `pin.decor`,
  `pin.stall`, `people`, `content/relations`, `naming`, `naming.quarter`, `naming.emblem`, `warp.jitter`,
  `epoch.transform`, `island.place`, `sewer`, `style.jitter`, `style.crowns`, `style.compass`, `render.instances`.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct (LC-29); the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12 uniforms
  — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time helper),
  `fuzzy(f)`, `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea).
* **Decoration** (LC-20, VIS-5, SCL-8; the instance model is §8.10's): trees, scatter, crowns, roof detail and hatch
  phase are keyed by the entity's lineage and the **instance ordinal**, never by LOD band; the stamp's offset and
  rotation come from the entity's `render.instances` stream, so a coarser band draws a subset of the finer band's
  instances and nothing re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance`
  events, §7.1).
* **Enter** (LC-28, COV-VG-WC1): Enter creates a **new document** with seed + 1 and the same recipe — params, intent,
  character, entry mode, table pins, packs — without edits, locks, assignments or salts; when the current document has
  edits the app first warns and offers to save it. *Chose a transparent successor (seed + 1) over deriving the next
  seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the
  link.* The references derive their successor from the stream state, which is reproducible within one build (VG's
  Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but
  moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags
  from a non-seeded source — PLAT does neither.
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE §6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

Every entity has two identities that the old design fused into one string (LC-1): an **address** that everything
points at (edits, locks, assignments, pins, labels, households, exports, the host), and a **lineage** that keys its
random streams. They start equal and separate only when an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, derivation unit's lineage hash, stage, creation epoch,
  creation index, derivation unit's reroll[, dup]) and `lineageHash` = its 64-bit hash, cached in the arena. The **derivation unit** is
  the entity whose derivation run created this one, declared per stage in the registry: the town for S4 routes (in
  destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance order); the L1 cell
  a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; the block for S10 plots and alleys; the
  plot for S11 buildings, yard parts and households; the household for people (member ordinal); the creating edit event
  (its `seq`) for anything a user draws or builds; for any other kind (cells and junctions made by a growth commit,
  walls, water bodies, bridges, greenery), the stage run that created it. The creation index is the deterministic
  creation order of that unit's run, or the canonical order the stage declares (for faces and vertices: by their
  lowest-then-leftmost lattice point).
* **Address id** = `kind:token`, prefixed `<layer><island>/` outside the ground layer (`sky2/plot:…`, `under/tunnel:…`;
  LC-29). For a generated entity the token is the base-32 form of its lineage hash at creation (13 characters); for a
  user-created one it is the hash of the creating event's `seq` and its ordinal. The address is opaque: the parent is a
  field and is never parsed from the id. *Chose lineage-hash tokens over a per-kind high-water counter because a counter
  depends on the order in which lazily derived districts and parallel workers mint, while a token computed from the
  lineage is the same whatever order districts are derived in.*
* **Never reused; one collision rule.** Minting runs after the succession matching below. A fresh entity whose natural
  address equals a live address, a tombstone, or an address its own batch retires takes the suffix `~k` with the
  smallest free k. A fresh lineage key equal to that of a live entity outside the batch's re-derived set (a survivor — a
  locked plot, say) takes the smallest free `dup` component, so no two live entities share draws; the entities the
  batch itself replaces are not collisions, which is what lets a faithful Regenerate (keep settings) re-mint their
  lineage keys, match them by anchor and reproduce them exactly. Collisions are resolved in the batch's canonical order
  (records sorted by lineage hash), so the session and a replay resolve them identically. An address that an `undo`
  withdraws (§7.4) is free again, but only the same derivation — the same unit, lineage and reroll, which is what a
  `redo` or a repeated New random re-runs — can mint it, so nothing is re-bound to an unrelated entity.
* **Carry-over — survival and succession.** When a scope is re-derived (regenerate, Adjust, re-derive from Sk, a local
  operator of §7.3, template replacement, migration, epoch):
  - an entity that is **not re-derived** — outside the invalidation set, a fixed input (locked, pinned, edited or
    assigned, §7.2), or merely re-parented — **survives**: it keeps its address and its lineage (so its draws do not
    change); only its `parent` field and a `reparent` lifecycle event change;
  - an entity that **is re-derived** is matched to the fresh entities by its anchor: the fresh entity with the same
    kind and class family whose anchor lies nearest within the kind's hysteresis radius **succeeds** it — it takes the
    old address (every reference re-binds to it; §7.3 decides which overrides move with it) and keeps its own fresh
    lineage (its draws are the new ones: New random really re-rolls); a `carry` event records the lineage change, and
    the same batch re-owns the successor's faces and roles under the address (`setOwner`, `retypeEdges`, §3.4), so
    geometry and address move together;
  - an old entity with no successor becomes a **tombstone** in the archive (§2.8) whose `supersededBy` names the fresh
    entity covering its anchor point, if any; a fresh entity with no predecessor keeps its fresh address;
  - lifecycle events are written only for changes (existence, flags, a lineage change, supersession, re-parenting), so a
    re-derivation that reproduces its entities exactly leaves the model digest unchanged.
  *Chose to hand only the address to a successor, and to keep the lineage only for survivors, over carrying the lineage
  in both cases because New random must actually re-roll its scope, while references — a name, a lock, an assignment —
  must follow the building the user means.*
* **Anchors and hysteresis** (GEO-34). Matching is by distance, never by quantised cell: candidate (old, fresh) pairs
  within the radius and of the same class family are sorted by (distance, old id, fresh id) and assigned one-to-one
  greedily in that order.

| kind | anchor | radius | class family |
|---|---|---|---|
| plot | its highest-class frontage: (way address, start offset along the way) | 0.5 m along the same way or its successor | use family (residential, commercial, institutional, agricultural) |
| building | footprint centroid | 0.5 m | building class family (a table row: small dwellings; halls and manors; religious; workshops and stores; towers and keeps; …) |
| block, cell | centroid | 2 m (block), 5 m (cell) | — |
| district | its seed feature's address | same feature | district kind family |
| way | its end junctions' addresses; else overlap ≥ 50 % of its length | — | way class family |
| junction, gate, tower, pin | position | 1 m (junction, pin), 2 m (gate, tower) | kind |
| bridge (LC-7) | its deck's midpoint, on the same river (the water body's address or its successor) | the crossing-site search band of §4.2 S1 (5) (`crossing.searchBandM`, default 120 m) | kind (bridge, ford) |
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |

  *Split through an anchor:* when a cut passes exactly through an anchor point, the child left of the directed cut
  keeps the id (the kernel returns children in that order, §3.6 (5)). *Households and people* (LC-16): a household's
  address survives a re-derivation of its plot by succession (anchor: plot address and ordinal), so a person's key —
  (household address, member ordinal, birth epoch), §10.3 — is stable wherever the household is. *Bridges:* when S1's
  water operator re-sites the crossings of an edited reach (§7.3), each old deck is succeeded by the re-sited deck
  nearest its old midpoint within the band, so the bridge keeps its name, its assignment and its way's reference.
  *Measurement (M1, B-EDIT-lite):* 1 cm perturbations of every vertex keep ≥ 99.9 % of addresses. *Pre-decided
  fallback:* the building and plot radii double to 1 m and an IoU ≥ 0.5 test joins the class-family check.
* **The matching routine, its budget and its fallback** (NF-D7). One routine hands addresses on in every re-derivation
  — scoped regeneration, Adjust, Re-derive from Sk (from S1 the whole town is re-derived and matched), a local
  operator, template replacement, epochs, migration and the upgrade mapping of §7.5. *Point-anchored kinds* (plots by
  frontage offset, buildings, blocks, cells, junctions, gates, towers, pins, bridges) are matched through a uniform
  grid per (kind, class family) whose cell is the kind's hysteresis radius, so every candidate of an old entity lies in
  its 3 × 3 cell neighbourhood; candidate pairs are collected, sorted by (distance, old id, fresh id) and assigned
  greedily. *Overlap-anchored kinds* (ways without matched end junctions, enceintes, water bodies, greenery, land use)
  take their candidates from the kernel's spatial index (§3.3) and compute the overlap on those candidates only.
  *Budget:* ≤ 2 µs per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the
  scope costs of §12.6. Measured on the reference machine (Apple M1, Node 24; `docs/validation/bench/fixall_det_r2_match.out`)
  on synthetic anchor sets: 0.60 µs per entity for a 450-building district regeneration, 0.59 µs for a 30 000-entity
  CITY re-derivation (0.38 µs when the fresh town is unrelated to the old one) and 0.59 µs for an 80 000-entity
  METROPOLIS mapping at a 2 m radius. *Measurement (M0 d, then M1 on B-EDIT-lite and a Re-derive-from-S1 fixture):*
  the routine inside the engine, on real anchors, per kind. *Pre-decided fallback:* matching runs per static-index
  partition (§3.3) — each old entity's candidates are first taken from the fresh entities of its own district's
  partition, and only the entities left unmatched are matched across partitions — which bounds every grid by one
  partition. Because an entity near a district boundary can then take a farther candidate inside its own district, the
  switch is a declared shift (§6.4), not a silent one.
* **JOIN and SPLIT.** A joined plot takes its address by the anchor rule from the member whose frontage anchor it
  keeps; the other members become tombstones with `supersededBy` = the joined plot, and `members` is history. A later
  SPLIT **resurrects** a member whose anchor matches — the one permitted reuse of a tombstoned id, recorded as a
  `resurrect` event, safe because a JOIN's member ids were never given to another entity.
* **Document identity** (LC-28). `docId` (a UUID) is minted when a document is created, kept on save, and re-minted on
  clone and save-as; addresses are document-scoped, so a clone keeps them. At the API and bridge boundary every id is
  rendered `<docId>/<id>`, so a host holding two towns never confuses their plots. Exports carry addresses and a
  supersedes table (tombstone → successor).
* **Workers** merge results in lineage order, never arrival order.

**The scope of stability, stated** (O2 b, e; LC-3):
1. *Independent concerns* — adding or changing a concern (a decoration layer, a name grammar, label rules) changes no
   other concern's draws.
2. *Scoped rerolls* — New random on a scope changes nothing outside its effective scope (§7.3).
3. *Upstream changes* — a change to stage k's code or tables changes stage k's outputs and, through their lineage and
   inputs, what is derived from them: a declared cascade shift (§6.4, §13.3), never a silent one; stages upstream of k
   and independent of it stay byte-identical.
4. *Edited documents* — stability across such changes comes from carry-over by anchor and from migration (§7.5),
   never from stream keys.

*Measurement (M0 d and M1):* minting and matching cost within the budget above; B-EDIT fixtures for `drawBoundary`,
district merge and split, `outskirtToDistrict`, regenerate around a lock, a river-control-point move that re-sites a
bridge, and the recycling case (a superseded, assigned building whose creation slot is reused) — 0 duplicate ids and 0
silent re-binds (every reference resolves to its successor or is reported).

=== REPLACE §6.4 Permalinks, version axes, retention and goldens ===

### 6.4 Permalinks, version axes, retention and goldens

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

**Version axes.**
* **Output version** (`o<k>`) — the observable output of the model packages. It bumps exactly when a release declares a
  shift (any stage digest moves on the golden suite, §13.3); a release that changes no output keeps its output version,
  so its documents, links and goldens stay valid. Every document and link names the output version it replays under.
* **Generator version** — the code build; informational (bug reports), never a replay key.
* **Schema version** — the file format (§7.5).
* **Preview flag** (LC-19). Links and documents made before output version 1 (fixed at M4's exit, §16) carry
  `preview: true` (in a link, `&pv=1`), and the app shows the preview notice of §13.3; the flag disappears for links and
  documents made from output version 1 on.
* **Table versions** — each rule table separately, pinned in the recipe; a table change that changes output is part of
  an output-version bump. A user override carries its base row's hash (§7.6).
* **Pack versions** — each setting pack by id, version and content hash in the recipe (§2.9); the shipped packs belong
  to the output version like its tables, and a non-shipped pack's content travels in the document (NF-D2).
* **Style version** — style sheets; changes pixels, never the model digest; carried in a link for pixel identity.

**Permalinks** (LC-15, NF-D2). A link carries the canonical recipe, never a pointer to machine state:
* `?o=<output version>&s=<seed, base 36>&z=<rung>` when the recipe is the output version's defaults apart from seed and
  rung (watabou's one-line link kept);
* otherwise `&r=<base64url of the deflated CBOR recipe delta>` (params with preferences folded in, intent, character,
  entry mode, salts, table pins and packs that differ from the output version's shipped ones — packs by id, version and
  hash);
* `&l=<base64url of the deflated CBOR log>` when the town has a log (edits, locks, assignments, style edits, undo and
  redo — a blueprint's assignments are log events, §7.7), and `&st=<style id@version>` when the style is not the
  default.
* **A link is emitted only when it can rebuild the same town and picture on any machine**: every pack the recipe names
  is shipped with the link's output version, `hostContent` is empty, the style sheet is shipped, and the whole URL fits
  in 2 000 characters. Otherwise the app says which condition failed — "this town uses the setting pack X, which is
  not built in", "this town uses content from the host program Y", "too many edits for a link" — and offers the `.plat`
  file, or `&doc=<ref>` when the host has configured a document resolver with `publish` (the `DocResolver` of §11.5);
  the document carries the pack content and the host outputs (§2.9), so the file reproduces the town without them.
  `preset=<id>` never appears: an edited preset elsewhere cannot change the town. *Chose to refuse such links over
  emitting them with the pack named by id and hash, because a link opened where the pack is missing could only fail or
  show another town, and the owner's rule is that a shared link never shows a different town.*
* **CI:** link → recipe → link identity, and the model digest built from a link equals the session's digest; plus a
  recipe naming a non-shipped pack and a document with a host provider's output: in both the link is refused, and the
  `.plat` file opened by a library that has neither the pack nor the provider replays to the session's digest.

**Retention of old output versions** (LC-14). The browser library ships the current output version's model packages
and the two previous ones (N−1, N−2) as lazily loaded, tree-shakable chunks (`@plat/*-o<k>`; an embed may leave them
out); the Node CLI replays any published output version by installing that exact package version. A document or link
inside the window replays exactly. Outside it, a document opens as a frozen view (§2.9); a link — which has no
snapshot — opens under the current output version with a visible notice ("made with o5, shown with o8; differences are
expected") and the CLI command that replays it exactly. Nothing changes silently. The same window bounds what the
browser can undo by replay (an upgrade, a rebase onto an older version, §7.4): outside it the undo is withdrawn there
with the CLI command shown. *Measurement (M3a):* each retained output version adds ≤ 150 KB gzipped to its lazy chunk;
the golden suite replays under N−1 and N−2. *Pre-decided fallback:* the browser window shrinks to N−1 (the CLI keeps
every version).

**Goldens** (LC-3; §13.3 builds the tooling from M1). **Stage-isolated goldens:** the golden store keeps, per seed and
stage, the previous output version's frozen upstream outputs; a release computes each stage's digest by running the new
stage code on those frozen inputs, so only stages whose own code or tables changed can differ, and each such stage needs
a shift record (stage, cause, seeds and statistics that moved, expected direction). **End-to-end goldens** are
re-signed only with a **cascade record** that lists every downstream stage whose digest moved and shows, from the
isolated goldens, that each moved only through its inputs; a downstream stage whose isolated golden also moved needs its
own shift record, so an unrelated regression cannot ride on an upstream shift.

=== REPLACE §6.5 Floating-point policy, determinism lint, determinism tests (G-P10) ===

### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

1. Topology lives on integer centimetres; predicates are exact (§3.2).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath` (the vetted fdlibm port, D-23).
3. **The lint is an allowlist** (GEO-31). In model packages — and in every adapter or provider whose output reaches the
   model — the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32,
   fround`, plus the arithmetic operators. `**` is allowed only with a literal integer exponent from 0 to 4, and the
   build rewrites it into explicit multiplications (exponentiation is implementation-approximated in JavaScript); every
   other power goes through `dmath.pow` (S1's river-width law `w0 · acc^0.4` is `dmath.pow(acc, 0.4)`). Also forbidden:
   `Math.random`, `Date`, `performance`, timers, `crypto.getRandomValues`, DOM access, locale-dependent string
   operations (`toLocaleString`, `localeCompare`, `Intl`), `Array.prototype.sort` without a comparator, and any
   dependence on object-key or `Map` iteration order beyond insertion order. A division whose divisor is not a non-zero
   literal must go through `ratio()` (§3.2 (8)), which the lint enforces.
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Workers return results merged in lineage order; no model package reads time (§5.1 principle 5).
7. **One boolean and offset engine per output version, on every host** (D-14, GEO-9): no host may silently run a
   different engine; changing the engine is an output-version bump with a declared shift.
8. **Host providers** (LC-31). A table a host supplies arrives as an `editTable`, `editPreset` or `setStyle` event
   whose content is copied into the log with provenance `host` (§7.6). Host code registered as a provider
   (`ContentProvider`, §14) passes a double-run check at registration — the same request run twice in two fresh
   workers must return identical digests — and its results are recorded in the document's `hostContent` block, keyed by
   (provider id, version, input hash), and read from there on replay (§2.9, §11.4), so the document replays without the
   host. Setting packs follow the same rule through the document's `packs` block (§2.9; NF-D2).
9. **Determinism tests (CI):** identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off;
   **time dilation** — the golden suite under a shim that scales every clock read × 10 and × 0.1 gives byte-identical
   per-stage digests (GEO-2); **derived-complete digest** — the districts of 50 METROPOLIS seeds derived in three random
   orders, workers on and off, give identical digests (the laziness contract, §4.1; §6.2); **headless = UI** (O11 f);
   **replay = session** — replaying base and log equals the session's digest on every B-EDIT sequence (§7.3), including
   the naming-collision fixture of §7.3 (7) (N-1) and sequences with undo and redo from several sessions; **truncation
   identity** — a B-EDIT sequence folded with its undone pairs kept and with them truncated gives the same model digest
   (§7.4); **links and documents without their inputs** — §6.4's pack and provider cases; the double-run check of
   registered providers; and the distinct-key test of §6.1.
10. **Second implementations** (VK-13). Two differ in what they must reproduce:
    * *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer algorithm as the
      TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
      cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
      digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle.
    * *The Clipper2-WASM engine*, adopted only if M0 (a)'s speed criterion triggers §3.7's pre-decided fallback, is a
      different engine and cannot reproduce the arrangement engine's integers. It replaces that engine as the single
      engine on every host (7): the switch is an output-version bump with a **declared golden shift** — a shift record
      for every stage that reads a boolean, buffer, inset or band (S1's outline repair, S3's reservations, S8's kerbs,
      S9's corridors, S11's footprints, S12b's greenery faces) and cascade records downstream (§6.4, §13.3) — and its
      determinism test is (9)'s cross-host one: identical digests on Node x86 / arm64, Chromium, Firefox and WebKit.
      Its version is pinned and vendored (4), and the report names it (§5.4). *Chose to require byte identity of the
      accelerator only over requiring it of both, because the fallback engine computes different integers by
      construction and would otherwise be unshippable, while the property that matters — one engine, one digest on
      every host — holds for it through the cross-host test.*

=== REPLACE §7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===

### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session: its undo and redo stacks (§7.4) */; group?: number /* one undo step */ }
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks (COV-FTG-C12)
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; to: LatticePoint }
  | { t: 'warp'; key: PlatKey; fromLevel: 0 | 1 /* 1 by default; 0 also moves water and coast */; strokes: WarpStroke[] }   // one staged warp session, committed on Apply
  | { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm }
  | { t: 'drawWater'; kind: WaterKind; add: PolygonCm[]; subtract?: PolygonCm[]; line?: PointCm[]; widthCm?: Cm }   // add rings unioned, subtract rings = land brush (islands)
  | { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean }
  | { t: 'drawGreen'; polygon: PolygonCm; kind: Greenery['kind']; densityPerHa?: number }
  | { t: 'drawBoundary'; polygon: PolygonCm; district?: Id }                                           // snaps to whole L1 cells
  | { t: 'drawFootprint'; polygon: PolygonCm; cls?: BuildingClass; use?: Id; heights?: Partial<Heights> }
  | { t: 'build'; plot: Id; cls: BuildingClass; use?: Id; footprint?: PolygonCm; heights?: Partial<Heights> }
  | { t: 'moveFootprint'; id: Id; deltaCm: VecCm; rotateCdeg?: number }
  | { t: 'swapUse'; a: Id; b: Id }
  | { t: 'fill'; scope: EditScope; arrangement: SitePlan['arrangement']; cls?: BuildingClass }
  | { t: 'setAttr'; id: Id; path: string; value: unknown }
  | { t: 'setAttrMany'; ids: Id[] /* resolved at dry run */; query?: Query /* what the user asked, kept for display */; path: string; value: unknown }
  | { t: 'paint'; target: 'roofKind'|'roofColour'|'wallColour'; ids: Id[] /* resolved under the brush */; brush: BrushPath; value: string }
  | { t: 'paintGround'; region: PolygonCm; cover: string; colour?: string }                           // a style region (FTG's texture brush) — outside the model digest
  | { t: 'instance'; entity: Id; ordinal?: string; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm; style?: Partial<InstanceStyle> }   // LC-20; §8.10
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }
  | { t: 'revert'; id: Id }   // "reset to generated" (COV-MFCG-L08): one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id, number> /* absolute, per scope entity: the rerolls actually used (LC-5, §5.1 (6)) */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k (LC-4)
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke }          // a relative Δ; the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host' } | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host' } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry: 'naming'|'render.instances'|'style.jitter'|'style.crowns' (§6.1) */; salt: number }   // COV-VG-VN-008
  | { t: 'convert'; op: ConversionOp /* defined in §4.11: wallToWay, gateToJunction, outskirtToDistrict, demolish, densify, and the decline hooks abandon, decay, ruin, clear, rebuild */ }
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number> }         // logged before the first edit inside a close-up (LC-18, PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // LC-11: an epoch is an event in the log (§4.11)
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128 }                                        // LC-13 (§2.9)
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap }                                  // LC-14 (§7.5); undoable
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // NF-D1: applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );                                     // NF-D1
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position (LC-22)
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5, GEO-5): geometry is addressed by entity address,
by lattice point inside an arena, or by a ring. Undo and redo are events like the rest (§7.4): the log only grows,
which is what lets a host store it (§11.3).

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** advances the reroll of every scope entity by one, written into the event as an absolute map, so a
  replay is exact and blocks at different rerolls each move on (LC-5); a scope entity whose content comes out
  unchanged advances again, up to three times, and is otherwise reported (§5.1 (6)); the map records the rerolls used.
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level, the recipe's pack list) is offered as **Re-derive from stage k**: everything from Sk down re-derives
  with carry-over (§6.3), and the user confirms the edit-fate report first (LC-4).
* **Same kind, new seed** is Enter's successor — a new document with seed + 1 and the same recipe (§6.1); per district
  (PART II) it is New random on the district. **Surprise me** is a new document whose intent is drawn from the
  `intent.surprise` stream of a fresh seed and written into its recipe (§7.7).

**Warp is MFCG's staged edit** (COV-MFCG-L03, COV-NG-CR02). Strokes in a warp session preview on the L1 overlay at
interactive rate — vertex moves and a redraw of the affected tiles, no invariants (§8.8) — and **Apply** commits one
`warp` event holding the strokes in order (a warp event is committed only on Apply); **Discard** drops them. On Apply,
and on every replay, each stroke is applied as its **operation** to the geometry current at that log position (never as
stored displacements, LC-27): the operation computes, from the current geometry, a displacement field over the
vertices under the brush, and the kernel's `warp(field, fromLevel, region)` applies it — whole-step validation against
swept triangles and the clearance invariant, deterministic halving (at most 8), Steiner re-seating, and local
re-derivation of any face that then fails a class floor, logged (§3.6, GEO-10). A warp with `fromLevel = 0` that moves
water runs S1's water operator on the moved reaches (§7.3).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's angles) | `equalize` | each cell under the brush moves its vertices toward equal interior angles |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour) |
| Measure (a ruler, not a warp) | the measure tool of §9.5 | a polyline length in metres and feet, an area mode, snapping to way centrelines, face edges and vertices; view data — no model event (NF-S9) |
| — | `swirl` | our local rotation about the brush centre (not an MFCG tool) |
| — | `jitter` | seeded random displacement from the `warp.jitter` stream |

*Chose a view rotation over rotating model coordinates because wind, sun, aspect and slope all read model north and
a vertex rotation would re-snap the whole arena; picture exports (SVG, PNG, VTT) use the view's rotation while GeoJSON
keeps model coordinates and records the rotation.*

**Drawing at the authoring boundary** (GEO-33). Pointer samples are resampled along arc length to a spacing of at least
`minEdge`, simplified with a topology-preserving Visvalingam at `minEdge`, and a self-crossing stroke is split into
simple runs before `insertChain` (§3.4). `drawWater` takes `add` rings, unioned by the boolean engine, and `subtract`
rings — a land brush — so an island is a subtract ring inside an add ring and two overlapping sea shapes simply union
(FTG's documented method); rivers and canals take a `line` and a width. `drawBoundary` selects the L1 cells whose area
lies at least 50 % inside the drawn polygon, and the district boundary becomes the boundary of those cells; the dry run
shows the snapped boundary before commit. *Chose snapping to whole cells over invisible `district_bound` edges because
every edge of a district's seam must be typed street, water, wall, field, cliff or frame for stage 2's `SeamContract`
(§4.12), and an invisible line through a block would leave a seam with no street to share.* A `drawWay` of class
`bridge` across a river face becomes a `Bridge` whose deck is §4.2 S1 (5)'s perpendicular deck at the point where the
drawn line crosses the channel's centreline; the drawn way's ends are routed to the deck by S4's operator (§7.3).

**Building-level editing** (COV-FTG-M01), each acting through the plot model: `drawFootprint` places a hand-drawn
footprint (concave allowed, simple) on the plot that contains it — a footprint spanning several plots proposes their
JOIN in the dry run; one on unplotted land (a green, a residue, a field) creates a plot around it with access to the
nearest way, or returns a conflict if none is reachable — and the host plot's site plan is re-fitted around it as a
fixed slot (buildings that no longer fit are listed in the fate report). `build` places a building of a class on a plot
(the site plan picks the footprint when none is given) — §4.11's `build(...)`. `moveFootprint` moves or turns a
footprint; leaving its plot re-homes it to the plot it lands on, with both site plans re-fitted. `swapUse` exchanges two
buildings' uses, occupants and assignments atomically, footprints staying. `fill` forces an arrangement (dense row
fill, for instance) on the scope's plots and re-runs S11 there.

**Brushes** (COV-FTG-M04). `paint` sets roof kind, roof colour or wall colour on every building whose footprint
centroid lies under the brush path (ids resolved at dry run and stored). `paintGround` records a ground-cover region
in the style (FTG's texture brush): pixels only. The tree brush is a batch of `instance` events on the entities under
the brush (§8.10), one undo step; painting trees where no green entity exists first logs a `drawGreen` (a `wood` on
open land, a `yard_planting` in a yard) to host them. `instance` events also carry close-up presentation edits
(PART II II.4). The field brushes are `setField` strokes (§7.2); the terrain brush's `water` mode chooses whether
water stays where it is (`locked`, the default) or follows the new ground (`follow`, §7.3).

**People** (COV-FTG-C12, C13). A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random
on a person re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a
person reroll (they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule,
household (relocation) — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs
the query; it is one undo step.

**Edit targets — owner amendment 5.** The rule, clause by clause: every generated element is editable (the table
below); every rule table and preset is editable (§7.6), by a user through the preference layer and by us through new
table versions (§7.6); edits are first-class events that persist (the log, §2.9), undo (§7.4 — undo and redo are log
events, so they work in a shared document too), survive regeneration (§7.2–§7.3: protection, carry-over and fates) and
migrate between versions (§7.5); the generator repairs around them locally (§7.3's operators, F-REDERIVE); the
preference and override layer sits above the defaults (§7.6). The entity registry (§2.8) declares each type's edit
kinds with their undo path and lifecycle row, and a CI test fails if a generated type has none:

| element | edit events |
|---|---|
| terrain | `setField(terrain)` with `water: 'locked'` or `'follow'`, `drawWater` (hollows and lakes), `setAttr` on site features |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and river control points, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary`, `merge`, `split`, `setAttr` (kind, character, name), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement |
| blocks, plots | `split`, `join`, `merge`, `fill`, `setAttr` (use, owner), `regenerate`, `lock`, `assign` |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof), `delete`, `convert` (demolish, abandon, decay, ruin, clear, rebuild), `assign` |
| walls, gates, towers | `drawWall`, `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction) |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys (rotation, compass, layer choices) change through the view API and are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo` |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope (§7.3) —
for a chained operator (§7.3) the whole chain runs on the overlay, so the report lists every re-sited bridge, re-routed
or cut way and re-based building before anything commits; for an `undo` or `redo`, the independence check of §7.4.
Conflicts come back as actions — the nearest valid position, the blocking lock, the fates to confirm, the dependent
events — never silently resolved; a warp that would break an invariant is halved and reported. Bridge commands from a
host map one-to-one onto these events and are logged with `author: 'host'` (§11; LC-31).

=== REPLACE §7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes ===

### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

* **Protection.** A **locked** entity — or the locked attribute paths of one — is a fixed input: regeneration never
  changes it and re-derives its dependants around it. A **pinned** entity keeps its existence and position; its other
  attributes may re-derive. An **edited** attribute implicitly pins that attribute and the entity's existence against
  Regenerate and New random (IMPROVEMENTS O9's "locked and edited entities are never mutated", restored — LC-8) unless
  the user chooses **discard edits in scope**, which is only possible by confirming the fate list (§7.3) and is recorded
  in the event. An **assigned** attribute is held at its assignment within the drift bounds (§7.7). Every finer face
  under a locked or pinned entity is a fixed input too. Precedence when they meet: lock > assignment > user-drawn
  geometry > rule tables > defaults (§7.7).
* **Drawn constraints** (G-P8; LC-10, GEO-11) — ways, water, walls, greens, district boundaries, footprints — enter the
  plat through `insertChain` as mandatory chains with their roles (§3.6), after the resampling of §7.1; they are locked
  by default and apply **at their log position**: the feature is inserted into the current state and, for the coarsest
  faces its chain touches, its class's local operator (§7.3) re-derives the affected scope —
  drawn water through S1's water operator (which re-sites the crossings on the reaches it moves and re-routes the ways
  that used them), drawn ways through S4's and S5's (arterials re-route to reuse them), drawn walls through S7's run
  re-trace, drawn boundaries through S6's regrouping, drawn greens through S12 on the covered faces, drawn footprints
  through S11 on the host plot. The session and a replay run the same code at the same log position, in the same
  canonical insertion order, so they produce the same digest (§6.5). The old rule "insert before the stage that would
  create the class" survives only as the explicit action **Rebuild around my drawings**: it moves the drawn constraints
  into the recipe as constraints of their stages, regenerates the town, shows the diff as a migration does (§7.5), and
  commits as a `rebase` (reason `drawnConstraintsRebuilt`). *Chose one ordered fold over hoisting drawn features before
  their stage because hoisting makes every reload regenerate a different town around them than the one the user
  edited.*
* **Field brushes** (LC-27; the field model is §4.5). A stroke is a relative Δ over the driver field (a path, radius,
  falloff and amount — `FieldStroke`, §7.1). The field is the driver field plus the stroke list composited in log order
  and **clamped once at the end**, so undo removes a stroke from the list and re-composites — exact, where a per-stroke
  clamp is not (+0.3 then −0.3 on 0.9 would give 0.7). A stroke re-derives every block whose plot samples moved by more
  than τ = 0.01 of the field's range (§4.5), with the same τ on replay. Bands come from the town's `FieldBands` record
  and move only by an explicit `setAttr` on it or by an epoch, so a stroke in one quarter never re-bands another. An
  epoch keeps the stroke list and re-composites it over the epoch's new drivers.
* **The terrain brush** (LC-7) edits the heightfield raster under S1's terrain operator (§7.3), with the same stroke
  list and single clamp (to the declared relief limit, §2.3). Its `water` mode decides what the ground may do to water:
  * **`locked`** (the default): the stroke is masked — its Δ is zero — on every cell whose centre lies in a water face
    or within one cell of a shore or bank edge, and under the footprints, bands and decks of locked or pinned entities
    (lock > drawn geometry); land cells within two cells of the sea keep §4.2 S1 (2)'s floor of sea level + 10 cm, so a
    lowering stroke cannot sink the coast. Water bodies, their courses and their widths do not change; the dry run
    shows the masked cells.
  * **`follow`**: the stroke may change bed and bank cells too; every reach whose bed cells changed is then re-traced by
    S1's water operator (§7.3), which re-sites its crossings and re-routes the ways that used them — the edit the user
    means by "raise a hill across the river and let it find a new course".
  In both modes S1's terrain operator re-bases every building, wing, tower, gate, wall vertex, bridge and pier whose
  terrain samples changed (§7.3), re-runs drainage locally, and re-evaluates the field drivers that read terrain, so
  the town stands on the new ground exactly as a reload would compute it. *Chose `locked` as the default over letting
  every terrain stroke move water because the brush is mostly used to shape ground, and moving a river re-routes
  roads and bridges — a larger edit the user should choose knowingly.*

=== REPLACE §7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===

### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — which can be larger than the drawn area — is the effective scope, shown to the user before commit. For an edit
   that chains local operators (item 3) the effective scope is the union of every chained operator's scope.
2. **Fine levels (L1 cells and below): tree scoping.** Every unprotected finer entity under the effective scope is
   discarded and the refinement stages re-run for those faces — with the recorded inputs and unchanged rerolls for
   Regenerate (keep settings), with advanced rerolls for New random. This is **sound by over-invalidation** and is the
   primary mechanism. S13a re-derives names and label candidates only inside the scope (a new entity never renames an
   existing one); S14 emits a `DisplayDelta` for the changed closure (§8.1); tiles meeting the dirty region are
   invalidated (§8.8); S13b, the view-side placement, re-decides only the placements whose boxes meet it (§9.2).
   **Replay mode** (load verification, migration, undo beyond the scoped records) folds the log on the model through
   exactly the session's code path — every model stage, **S13a's scoped delta included**, runs at its event's log
   position, because name uniqueness is resolved scope by scope in log order (§9.6) and `moveLabel`, `hideLabel` and
   `setAttr(name)` events address `LabelEntity` records and names that S13a creates mid-log (N-1). Only the view stages
   are suppressed: S14 and S13b run once at the end.
3. **Coarse stages: a local operator each, with pinned boundaries** (LC-7). L1 and L0 are not per-face refinements —
   S4 routes across the frame, S5 grows a town-wide queue, S6 grows districts across cells, S7 traces an enceinte — so
   each has its own local operator. An operator may chain another (S1's water operator chains S4, S5, S6 and S7); the
   chain's batches commit in the order stated, each operator draws from the operated entity's lineage under its own
   stage's concerns, and the whole chain runs in the dry run first (§7.1), so the session and a replay run the same
   chain at the same log position:

| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |
|---|---|---|---|
| S1 terrain (terrain brush in either water mode, site features) | (a) below: masked stroke, local drainage, terrain-reading field drivers, exact re-basing of everything standing on the changed ground, slope re-sampling; in `follow` mode, (b) for every reach whose bed changed | all water in `locked` mode; the heightfield outside the stroke; every way's geometry | in `follow` mode, Re-derive from S1 when a course leaves its drainage basin |
| S1 water (`drawWater`, a moved shore vertex, a river control point, a `warp` from level 0, the terrain brush in `follow` mode) | (b) below: re-trace the edited reach, re-site its crossings, then S4, S5, S6 and S7 chained, then F-REDERIVE | reaches and coasts outside the edit; every way, wall and district not named in (b) | Re-derive from S1 when the course leaves its drainage basin |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized, a deck re-sited or removed by S1's water operator) | re-route only the arterials whose corridors meet the edit region or whose destination or deck moved — each between its nearest pinned nodes (junctions of degree ≥ 3 or destination nodes) on either side of the region, over S3's lattice, with every deck a fixed graph edge | their endpoints; every spine outside the region | Re-derive from S3 when a destination is added or removed (gate count) |
| S5 (`drawWay` of a secondary, a deleted street, a secondary that now crosses water off a deck) | regrow only inside the affected L1 cells, from the proposals whose origins lie there, under S5c's legality (water only on a deck) | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`, land vacated by a moved channel) | regroup and re-type only the districts touching the region, the grower restricted to their cells | every other district | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`, a river whose course crosses an enceinte moved) | re-trace only the run between the nearest unaffected towers on each side, with water gates where the course now crosses | the rest of the trace and its gates | Re-derive from S7 when the enceinte kind or the gate count changes |
| S8–S11 | per cell, block and plot (tree scope, item 2) | — | — |
| S12 | the covered hinterland faces and greenery entities | — | — |

   **(a) S1's terrain operator**, in order:
   1. *Stroke.* The stroke list is composited on the heightfield and clamped once (§7.2), with `locked` mode's mask.
   2. *Drainage, locally.* Priority-flood filling and flat resolution (§2.3) run on the stroke's bounding box dilated by
      8 cells, with the ring cells' levels fixed as spill heights; the box doubles until no ring cell's filled level
      changes (at worst the frame — S1's own hydrology cost, §12.4). The filled levels go into the drainage arrays
      (`flowDir`, `flatRank`, `flowAccum`) only, never into the stored heights, so a brushed hollow stays a hollow and
      drains to its spill point; accumulation is re-propagated downstream along D8 from the box. A new hollow deeper
      than the lake threshold is reported ("a hollow: draw water to make it a pond or a lake"), never turned into water.
      *Test (B-EDIT terrain fixtures):* the drainage arrays after the local re-run equal those of a whole-frame re-run
      on the same heights. *Pre-decided fallback:* if they ever differ, the terrain operator re-runs drainage over the
      whole frame (S1's own cost, ≈ 10 ms at CITY) — output-neutral, since the whole-frame run is the reference.
   3. *Fields.* The field drivers that read terrain (elevation above the flood line, low and damp ground, §4.5) are
      re-evaluated on the dilated box, and blocks whose plot samples moved beyond τ re-derive exactly as for a field
      brush (§7.2) — the same result a reload computes from the drivers and the stroke list (§2.9).
   4. *Re-basing, exact.* Every entity standing on a changed sample is re-based by §2.6's per-entity datum step, the
      function S11 and S7 call: a wing's `baseCm = max(samples) + plinthCm` with its foundation skirt, a row footprint
      whose fall now exceeds `skirtMaxCm` re-split into stepped wings (F-SITEPLAN's first rung; its footprint face and
      address unchanged); towers and gates from the samples under their footprints; the wall's `baseCm` at every trace
      vertex whose sample changed; a bridge's `deckCm` and a pier's deck height from their bank elevations plus the
      clearance row. A user-edited `baseCm` is kept (fate *kept*, listed). *Chose exact re-basing of every entity whose
      samples changed over a tolerance, because the step costs microseconds per entity and a tolerance would let the
      model depart from §2.6's datum rule by that tolerance.*
   5. *Slopes.* Every way whose spine crosses changed cells re-samples `slopeP95`; a way now steeper than its class's
      limit is reported with an offer to re-route it (a `regenerate` on that way through S4's or S5's operator) — never
      re-routed silently.
   6. *Water.* In `follow` mode, (b) runs for every reach whose bed cells changed.

   **(b) S1's water operator**, in order:
   1. *Re-trace.* The edited reach is re-traced from the nearest pinned upstream point to the first downstream point
      where the new course meets the old one (or its outfall), and carved locally within `carveMaxCm` (F-RIVER's
      re-trace rungs, confined to the reach); an edited coast stretch has its sea side re-lowered; contours are clipped
      (F-CONTOUR); new shore segments take their bank class and kind by §4.2 S1 (7).
   2. *Crossings re-sited.* §4.2 S1 (5)'s crossing-site search runs on the re-traced reach only. Each old deck on the
      reach is succeeded (§6.3's bridge row) by the new site nearest its old midpoint within the search band
      (`crossing.searchBandM`, default 120 m) — perpendicular to the new flow, its endpoints on the new banks, pinned —
      so the bridge keeps its address, name and assignments; a deck with no site within the band loses its bridge
      (F-REDERIVE, §5.2).
   3. *S4 chained.* Every arterial whose deck moved or was removed, or whose spine now crosses a water face off a deck,
      is re-routed by S4's operator through the re-sited deck as a fixed graph edge; where none is within reach, the
      F-ROUTE ladder applies (move the crossing site along the reach, allow one new bridge at extra cost, …, §5.2).
   4. *S5 chained.* Secondaries that now cross water off a deck re-grow inside the affected L1 cells under S5c's
      legality (water only on a deck).
   5. *S6 chained.* Land the channel vacated joins the district across its longest boundary unless a wall or an
      arterial separates them (then the next longest; ties by id), or the hinterland; S8–S12b derive only those new
      faces, with fresh addresses.
   6. *S7 chained.* An enceinte whose trace the old or the new course crosses re-traces its run, with a water gate at
      the new crossing and none at the old.
   7. *F-REDERIVE* (§5.2) re-cuts, re-fits or demolishes the finer content that now lies in water, cuts at the bank the
      lesser ways that still cross it off a deck (lanes, alleys, paths, tracks), and turns decks left over land into
      ordinary way segments — each with its lifecycle event, all listed in the fate report.
   The batch-local invariant "a way crosses water only on a deck, and a deck only over water" (§5.3) holds at the end
   of the chain. An edit with no local operator (a change of seed, rung, water setting or side, walls on or off, castle
   option, gate count, planned ↔ organic, wealth level, the recipe's pack list) is **Re-derive from stage k** (§7.1).
4. **Edit fates** (LC-8). The dry run lists every protected entity in the effective scope — locked, pinned, edited or
   assigned; hosting a pin; the target of a pinned label placement; housing a pinned or edited person; an edited
   close-up entity — with its fate: **kept** (a fixed input); **carried** (to its anchor-matched successor, §6.3, after
   the class-family check — an override moves with the address only if the successor's class family accepts the
   attribute, never by id alone); **orphaned** (no successor: the edit stays in the log, is listed in the document's
   orphan table and can be re-attached by the user); or **discarded** (only with "discard edits in scope", recorded as
   supersede events). The user sees counts and the list and confirms every fate other than kept; the confirmed fates
   are stored in the event, and a replay that computes different fates reports a mismatch. A chained edit's report
   also lists the unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings
   re-based or demolished — with their lifecycle events.
5. **Recorded inputs** (LC-12, NF-D3). Each plot, block and building persists a **derivation record** (§2.8) of the
   inputs of its last derivation — field samples, band, context and parameter digests, table slices. Regenerate (keep
   settings) re-derives those kinds with their recorded inputs, so it reproduces an untouched entity byte-identically
   even after an epoch or a field edit elsewhere moved the current inputs; re-deriving with the current inputs is
   Adjust. Kinds without a derivation record (ways, districts, names, walls) re-derive from their current upstream
   state, which only an explicit edit or an epoch changes; the provenance rebuilt by their last derivation or by the
   verification replay holds what they read (§2.8).
6. **The dependency graph is the audit.** `Provenance.deps` (every entity records what it read) serves (a) as the audit
   of item 7 and (b) as an optimisation for Adjust — invalidating exactly the closure of a changed parameter or table
   slice — only where the oracle has proven that stage's declarations complete; elsewhere tree scoping applies.
7. **The oracle** (GEO-11, LC-10, IMP-7; run on every B-EDIT sequence):
   (i) **replay = session** — replaying base and log in log order gives the session's model digest, on sequences that
   mix drawn features with later attribute edits, epochs, rebases, undo and redo; among them the **naming-collision
   fixture** (N-1): two scoped regenerations in different districts whose new ways draw the same street name, followed
   by a `moveLabel` on the second way's label and a `setAttr(name)` on the first — the replay's names, `LabelEntity`
   records and digest equal the session's;
   (ii) **outside the scope, byte-identical** — every entity outside the effective scope keeps its leaf digest;
   (iii) **content** — content and relation digests outside the scope are unchanged;
   (iv) **faithfulness** — Regenerate (keep settings) is checked by byte identity; New random is checked per regenerated
   scope against K ≥ 50 independent from-scratch generations of the same scope (same context, other rerolls): for each
   of its median plot area, frontage width, density and attached share, the **rank** of the regenerated value among
   the K generations (exactly uniform on 0…K for a perfect regenerator, whatever K); a campaign fails when a χ² test on
   the 10-bin rank histogram (expected counts proportional to the ranks each bin holds) rejects at family-wise
   p < 0.01, Holm over the four statistics — calibrated (executed: ≈ 1 % false campaign failures at K = 50 and 99) and
   failing FTG's "too snug" regeneration (0.6 × the from-scratch spread) in every campaign
   (`docs/validation/bench/fixall_verify_scope_o9c_rank.out`; IMP-7, whose owner restates §15.2 O9 (c) to match);
   (v) **coarse edits** (LC-7) — river-control-point, drawn-water and terrain-brush sequences in both water modes end
   with 0 decks over land, 0 off-deck crossings, 0 wings off §2.6's datum rule, 0 footprints in water, every arterial
   at its destinations or reported `unserved`, and every bridge that still has a site within the band keeping its
   address.

=== REPLACE §7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===

### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

**Replay semantics** (LC-10). The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay. Nothing is hoisted, and epochs, rebases, upgrades, undo and
redo are events like any other.

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it | inverse event | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query is resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record) | attribute names are schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`); per-vertex displacements only as a verification record | whole-step validation (§3.6): moved edges against swept triangles, the clearance invariant, global deterministic halving; pinned vertices are inputs to smoothing and cutting; a move of water runs S1's water operator (§7.3 (b)) | undo record (moved vertices, re-derived faces) | the operation replays on the new model at its log position |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record (the replaced scope of the whole chain) | the same geometry replays at its log position under the new version |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. abandon, decay, ruin, clear, rebuild) | context actions | lifecycle events with cause | log | structural ops on the plat (§3.4) with dependants re-derived; `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8) | undo record (members resurrect, tombstones return to live) | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, the absolute rerolls used, confirmed fates | §7.3; New random's content check (§5.1 (6)) | undo record: the faces, entities, lifecycle events and tombstones of the effective scope, O(scope) | the scope replays; fates are recomputed and compared |
| assign / unassign | assignment dialog / host API | `assignment` fields, `flags.assigned` | log; blueprint assignments at positions 0…k | the claims-first re-derivation of its scope (§7.7) | undo record | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond the tolerance re-derive (§7.2); terrain strokes: S1's terrain operator — local drainage, re-basing of everything on the changed ground, the terrain-reading drivers, and in `follow` mode the water operator (§7.3 (a)) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region | strokes are geometry and replay |
| editTable / editPreset / setStyle | tables editor, presets and style dialogs | the override layer (§7.6) | log: row operations by key, with the base row's hash | entities whose derivation record or provenance cites a changed slice hash re-derive; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal after the set is generated, while the entity's lineage survives; whenever its lineage changed — carried to a successor or superseded — each override is re-matched by position within 0.5 × the set's spacing, else orphaned and reported (§8.10) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration" — the rerollable concerns of §6.1 | the effective salt: the recipe's initial value advanced by the log's `rerollLayer` events | log | naming: S13a re-draws every unedited name; instances, crowns, jitter: display only | the previous salt | replays |
| revert (reset to generated; COV-MFCG-L08) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events are applied in reverse log order at the revert's position; edits to other entities stay | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b's placement (§9); the `LabelEntity` exists at the event's log position in the session and on replay, because S13a runs per event (§7.3 item 2) | inverse | follows the label's target address; an unmapped target → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person (LC-16) | an explicit action or an edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2; LC-18) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position, and reports orphans | undo record | replays |
| epoch (LC-11) | `grow(doc, inputs)` (§4.11) or an entry of the circumstance schedule | the derived `EpochRecord`; lifecycle events with cause | log | the incremental path of §4.11 at its log position | undo record: the faces and entities the epoch replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase (LC-13) | keeping the saved town on a mismatch; keeping an old model; Rebuild around my drawings; editing a frozen import | the document's base | the base state and the event; the events before it stay in the log (§2.9) | replay starts from the rebased state | the previous base (NF-D4): when it is the recipe — always kept in a rebased base — the undo restores it and replays the kept log; when it is an earlier rebased state, that state is the undo record, held in the undo section under its cap; past the cap, or when the replay would need an output version outside the browser's window, the undo is withdrawn with a notice (the CLI replays any version, §6.4); a `redo` of the rebase re-installs the rebased state, which the undo keeps in the undo section under the same cap (past it the redo is withdrawn with a notice) | the rebased state migrates by the schema chain; it is not seed-reproducible |
| upgrade (LC-14) | explicit, after the diff (§7.5) | the document's output version | log | §7.5 | the undo record is `upgrade.from` (NF-D4): undo replays base and log before the upgrade under that output version — exactly the pre-upgrade digest; in the session the checkpoint taken before the upgrade makes it instant; outside the browser's version window the undo is withdrawn there with the CLI command shown | — |
| undo / redo (NF-D1) | ctrl / cmd+Z, ctrl / cmd+shift+Z, the API's `undo(h)` / `redo(h)`, a host's `doc.apply` | the live or undone status of each event, derived from the log | log (`of`) | after the independence check below: `undo` restores its target's scope from the target's undo record; `redo` re-applies the target at the head, its lifecycle events citing the target's `seq` and its minted addresses the target's own | an `undo` is undone by a `redo`, a `redo` by an `undo` (exact inverses) | replays; a target's record is rebuilt under the new version by the replay |
| host provider output (LC-31) | a host-registered provider's answer, after the double-run check (§6.5) | the document's `hostContent` block | `hostContent`, keyed by (provider id, version, input hash) | read from `hostContent` on replay, never re-requested | removed with the event that first requested it | replays without the host |

**Undo and redo are events** (SCL-5, NF-D1). Undo never removes an event from a shared log: a host stores the log and
it only grows (§11.3), so `{ t: 'undo'; of }` and `{ t: 'redo'; of }` are appended at the head like every other event
and applied through the same fold, and every client, and every replay, applies them identically.
* **Targets.** Each session has its own stacks (`EditBase.session`). `undo` targets the session's latest **live**
  event — an event is live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as one step
  and `of` names its first event. `redo` targets the session's latest undo whose target is still undone; a new event
  from the session clears its redo stack. An unshared document has one session, so undo there is linear, as before. A
  session with the `owner` role may name any live event (`undo(h, of)`, §11.2).
* **Application.** Every committed event keeps an **undo record**: the inverse event when one is exact, otherwise the
  faces, entity records, lifecycle events and tombstones its effective scope replaced, and the list of addresses it
  created, changed or removed (its *touched set*) — so undo costs O(scope), never a copy of the whole model. `undo`
  restores the target's scope from that record and withdraws the addresses the target minted (§6.3); `redo` re-applies
  the target at the head from its stored, already-resolved payload (scope, absolute rerolls, confirmed fates), so from
  the restored state it reproduces the target's result exactly.
* **Independence** (the check that keeps undo exact when others have edited since). An undo is applied only if every
  live event after its target is independent of it: the later event's touched set and effective-scope faces are
  disjoint from the target's touched set and from the target's effective-scope faces dilated by one ring of adjacent
  faces at the coarsest level either touches. Otherwise the dry run returns an F-EDIT conflict listing the dependent
  events and their authors; the session may undo its own dependent events first (each its own `undo`), and an owner
  may undo through a chain. A `redo` is checked the same way against the live events after its undo. Every client folds
  the same events in the host's order on the same state, so the check has the same outcome everywhere; an `undo` or
  `redo` whose check fails at its log position (possible only in a hand-built log) is a reported no-op, identically on
  every client and on replay. An event whose scope is the whole town (an upgrade, a rebase, a Re-derive from S1) is
  therefore undoable only while it is the latest live event.
* **Records on other clients and after a reload.** Records are kept for the session and saved in the file's `undo`
  section (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records as their rows state), so undo
  survives a reload. A client that holds no record for a target — it joined after the target, or the record left its
  cap — rebuilds it by replaying from its nearest checkpoint before the target, or from the base, and says it is slow;
  the replay keeps full records only for the events that later `undo` events target (found by a pre-scan of the log)
  and touched sets for all. The replay is deterministic, so every client reaches the same state.
* **Truncation, in unshared documents only.** When an unshared document's `undo` targets the event immediately before
  it, the engine may drop both from the log and hold the target on the session's redo stack; a redo then re-appends it
  with its original `seq`. The canonical `nextSeq` (§2.9) never moves back, so later events take the same `seq` either
  way, and the fold of the truncated log gives the same model digest as the fold with the pair kept — a B-EDIT property
  test over random sequences (§6.5 (9)). A document attached to a host bridge never truncates.
* **Checkpoints.** The engine takes a copy-on-write checkpoint (the arenas are chunked per district, so a checkpoint
  costs only the chunks changed since the previous one) whenever the replay cost accumulated since the last checkpoint
  passes 80 ms at the session's rung, and before every epoch, rebase and upgrade — so any replay from a checkpoint stays
  ≤ 100 ms. *Measurement (M2a):* undo of a CITY district regeneration ≤ 30 ms; undo memory ≤ 25 % of the model's working
  set after 100 edits; (M3a) the host-and-three-clients convergence test of §11.3 with interleaved undo and redo from
  every client. *Pre-decided fallback:* the saved undo section shrinks to 16 events and checkpoints are taken every
  40 ms of replay cost.
* The **enumeration test** checks that every EditEvent kind — `undo` and `redo` included — has an exact inverse or an
  undo record (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

*Chose undo and redo as logged events with per-session stacks and a conservative independence check over removing the
last event from the log, because a host-stored log only grows and every client must fold the same events; removal
survives only as the unshared-document truncation, which leaves the model digest unchanged.*

**MFCG's recorded edit asks** (IMPROVEMENTS O9 (f): the list behind B6, which twelve users asked for). Each is a
scripted B-EDIT scenario that reports its locality share (entities outside the effective scope byte-identical) and its
invariant results (§13.2); "expressible" counts working, measured edits, not event names.

| ask | PLAT events | what re-runs |
|---|---|---|
| add a district | `drawBoundary` | S6 regroups the covered cells; S8–S11 where the class band changed |
| delete a district | `merge` (district into its neighbour) | S6 re-types the merged district; S8–S11 where the band changed |
| add roads | `drawWay` | S4 (arterial) or S5 (secondary) local operator; S8–S11 in the split cells |
| remove roads | `delete` (way) | S5 regrows the merged cell (or S4 re-routes); S8–S11 there |
| move / remove labels | `moveLabel`, `hideLabel` | `LabelEntity.pinned` / `hidden` only (model data, in the digest, §9.1); 0 other model changes; placement is view data (S13b re-decides the labels whose boxes meet it) |
| set district colours | `setStyle` (a thematic row keyed by the district's address) | style only — 0 model changes |
| add / delete vertices | `split` (a way at a point), `merge` (edges), `moveVertex` | the L1 edit; S8–S11 in the touched cells |
| place the castle | `setAttr(castle, site)` | S4 re-routes the castle street; S7 re-traces its run when the castle is on the enceinte; the cells under the old and new reservations re-derive |
| size the castle grounds | `setAttr(castle, baileyArea)` | the reservation resizes; the cells under it re-derive; S7's run when on the enceinte |
| farms in chosen areas | `setAttrMany` (the land-use faces under a drawn region → arable) | S12 on those faces |
| draw walls | `drawWall` | S7 re-traces the run or adds an enceinte; F-REDERIVE on plots in the new band |
| draw bridges | `drawWay` (class `bridge`) across a river face | a `Bridge` on §4.2 S1 (5)'s perpendicular deck where the drawn line crosses the channel's centreline; S4's operator routes the drawn way's ends to it with the deck pinned; §5.3's crossing invariant holds |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator (§7.3 (b)): the coast stretch re-traced and its contours clipped, any deck on it re-sited, S4 / S5 for the ways that now cross water, S6 for vacated land; F-REDERIVE |

=== REPLACE §7.5 Migration and upgrade (G-P9) ===

### 7.5 Migration and upgrade (G-P9)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

`migrate(doc, to)` has two parts.

1. **The schema chain** — a sequence of pure, versioned transforms over the document format, forward only. A document
   whose schema is newer than the running library opens read-only with a message (view and export; LC-28).
2. **The upgrade** (a new output version) — an explicit, undoable `upgrade` event (LC-14):
   * the base and the whole ordered log — epochs included — replay under the new output version into a new model;
   * **the mapping**: entities of the old model are matched to the new one by kind, anchor within the kind's hysteresis
     radius, class family and, for faces and chains, overlap (IoU ≥ 0.5), through §6.3's matching routine and budget; a
     matched entity hands its address to its successor (§6.3), and edits follow it only through §7.3's class-family
     check; **nothing is matched by string equality**;
   * an unmatched edit is a reported **orphan**, kept in the log and listed in the orphan table, never silently bound
     to another entity;
   * an **orphaned lock re-imposes its last geometry** as a drawn constraint (a `drawFootprint`, `drawWay`,
     `drawBoundary` or `drawWater` event appended at the upgrade's position) unless the user drops it, so a locked
     building stays where it was;
   * a **diff** — entities changed, orphans, statistics deltas, and a per-epoch diff for a multi-epoch document — is
     shown before commit;
   * **undo** (NF-D4): the upgrade's undo record is its `from` output version, not a stored copy of the old model.
     Undoing it replays the base and the log before the upgrade under `from` — the retained N−1 or N−2 chunk in the
     browser, any published version in the CLI (§6.4) — which reproduces the pre-upgrade model exactly, digest
     included; within the session the checkpoint taken before the upgrade (§7.4) makes the undo instant. When `from`
     has left the browser's window (the library was updated twice since), the undo is withdrawn there with a notice
     and the CLI command; the upgrade's diff stays viewable. *Chose the replay under the retained version over storing
     the pre-upgrade model outside the undo cap, because a METROPOLIS model alone exceeds the 8 MB document budget
     (§2.9) while the replay reproduces it exactly from inputs the document already holds.*
   The user may instead **keep the old model**: the document stays at its output version while that version is inside
   the retention window (§6.4); outside it the document opens as a frozen view, and its one edit is a `rebase` (§2.9).
   FTG's "no way to regenerate old towns with new features" and "cannot be undone" are the weaknesses answered.

*Test (M3a):* the golden suite replays under N−1 and N−2; a corpus of edited documents upgraded across one output
version keeps 100 % of edited entities or reports each orphan (O9 e); an upgrade undone — in the session and after a
reload — restores the pre-upgrade digest exactly; a METROPOLIS document's saved size does not grow with its upgrades
beyond the upgrade events themselves.

=== REPLACE §7.6 The override layer and editable tables (G-P12; owner amendment 5) ===

### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

`effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events`, each
layer a sparse delta with provenance; setting packs are recorded in the recipe by id, version and content hash (§2.9);
the UI shows which layer set a value and the report lists auto-resolved values with reasons (O16 a–b).

* **Preferences are folded in at creation** (LC-15). When a document is created, the packs, the preset, the user's
  global preferences and any document overrides are copied into the recipe's `params` delta, shown in the panel as "from your
  preferences". A later change to the machine's preferences never changes an existing document; applying them is the
  explicit action "apply my current preferences", logged as one `adjust` per changed parameter with its locality class.
* **Pack content travels with the document** (NF-D2). A pack is data — grammars, corpora, ancestries, religions,
  appearance templates, roster row operations, style hints (§10.4) — and much of it (a grammar, a corpus) is not a
  parameter that folds into `params`. So the content of every pack the recipe names that is not in the output
  version's shipped set is copied into the document's `packs` block when the document is created, with its id, version,
  author and content hash; user-uploaded corpora are pack data in the same block (§10.4). Adding or removing a pack in
  an existing document is an `adjust` of the recipe's pack list — a Re-derive from the pack's first reader stage, with
  the fate report (§7.1) — and copies the content the same way. A replay resolves every pack by hash from the document
  first (§2.9), so it never depends on what is installed; a link is emitted only for shipped packs (§6.4).
* **Tables have keyed rows** (LC-22). Every rule table — size ladder, stage regimes, way widths, granularity, site
  plans, class rules and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency
  graph, S0's feature probabilities, the work-limit coefficients (§5.1 (5)) — is versioned JSON: a map from a stable row
  key to a row whose cells carry `{value, unit, provenance: {source, date, note}, calibratable}`. Each table's schema
  declares its **readers** (the stages that consult it) and its **slice kinds** (row, weights, bracket, thresholds,
  match — §2.8).
* **Overrides are row operations, never positional patches.** An override records `{op, rowKey, field, value,
  baseRowHash}`; when a newer table version changes or removes that row, the override is reported as an **orphan** —
  kept, not applied — with the old base row, the new row and the user's value side by side.
* **Invalidation by slice** (LC-21, NF-D3). A table edit changes the hashes of the slices it touches, and exactly the
  entities whose recorded slices cite a changed slice re-derive (audited by the oracle, §7.3). The recorded slices are
  read from the persisted `DerivationRecord.slices` for the kinds that persist one (plots, blocks, buildings, §2.8) and
  from the provenance rebuilt by the last derivation or by the verification replay for every other kind. Where neither
  exists — a kind without a derivation record in a document rebased from a kept snapshot or a frozen import, whose
  provenance no replay can rebuild — the stated fallback applies, as it does to a row inserted into a table read by
  predicate (a new class row that may now match entities that never consulted it, which changes the table's match
  slice): **Re-derive from the table's first reader stage**, with the fate report.
* **Host tables** (LC-31) arrive as `editTable`, `editPreset` or `setStyle` events whose content is copied into the log
  with provenance `host` (source, date, version), so a document replays without its host (§11.4).
* **Users and us.** Users edit through the tables editor and presets dialog (the preference layer); we change the
  system through new table versions — a declared shift whenever output changes (§6.4). The corpus phase replaces values
  and updates provenance without code changes; the default path with no edits is byte-identical to the shipped defaults
  (O10 h).

=== REPLACE §7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15) ===

### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-determinism-r2

* **The control registry** declares for every control its output metric (e.g. `density` → buildings per ha;
  `wealthLevel` → median plot area and greenery share; `greenery` → private green share), its range, its **consuming
  stage** (the earliest stage that reads it), its **locality class** — *local* (consumed at S10 or later, or spatially
  scoped: Adjust is local) or *re-derive from Sk* (the action shows the fate report first, §7.1; LC-4) — its
  **continuity class** (*continuous* or *discrete*, with a discrete control's levels) and a **documentation anchor**
  that the app links from the control as context help. The same registry fields (label, range, unit, output metric,
  consuming stage, locality class, continuity class, anchor) generate `@plat/docs`' reference pages (COV-FTG-A25).
* **Monotone and continuous, stated statistically** (GEO-41). Discrete stop rules downstream (the OBB band test, the
  straight-or-bent test, minimum widths, ladder rungs) make any single seed jump, so the promise is about the
  expectation. The CI sweep runs each continuous control over 21 evenly spaced steps × 50 seeds at TOWN and CITY
  (METROPOLIS nightly): **monotone** — the mean of the control's metric moves in the declared direction between adjacent
  steps, a reversal of at most 2 standard errors allowed; **continuous** — no adjacent step moves the mean by more than
  ε = max(3 standard errors, 3 × the median adjacent change of the mean); **per seed** — at most 10 % of seeds jump by
  more than 5 × the median per-seed step at any one step. The formula is fixed now; the standard errors and medians are
  what the M1 sweep measures. Continuous controls are smooth maps with no thresholds inside (VG's "1 vs 0.999" is the
  failure); discrete controls (walls on / off, form) declare their effect in the report.
* **A control that fails its sweep — the pre-decided fallback** (NF-D7). The *failing interval* is the smallest run of
  adjacent steps whose checks fail, widened by one step on each side. (1) The control's expansion row (§7.7) is
  replaced, over that interval, by a `smoothstep` between the row's values at the interval's ends — a table change
  with provenance "sweep fallback" and a declared shift (§6.4) — and the sweep re-runs. (2) If the control still fails,
  it is declared **discrete**: the registry's continuity class becomes *discrete* with the levels at which the metric's
  mean is stable (the steps between failing intervals, each represented by its median step), the basic and advanced
  panels show it as a stepped control, and the report and the release notes list it. The population control is
  continuous by construction (§10.2's prefix-stable roster) and is checked the same way; its work-limit side is §5.1
  (5)'s flat F-WORK rate. *Chose a smoothstep over the failing interval, then a declared discrete control, over widening
  ε until the control passes, because a widened ε hides the jump the user sees, while the smoothstep removes a jump
  that the expansion row itself makes and the discrete declaration tells the user the truth about the rest.*
* **Proxy thumbnails** (G-R4; O16 e; LC-30, SCL-16). "Surprise me" and the size / water controls preview six candidate
  towns as **the towns' own S0–S4 runs** — site, water and backbone, drawn at city LOD from those stages' display list —
  under the same deterministic work limits as a full generation (§5.1), so a proxy is bit-identical to the first stages
  of the town it previews. Choosing one continues that recipe from its committed S4 state and asserts that the S4
  digest equals the proxy's. Budgets on reference hardware (§12): all six **within 1 s at TOWN** (O16 (e)'s wording
  restored); at CITY and METROPOLIS the proxies appear progressively — the first within 300 ms, each within 250 ms at
  CITY and 500 ms at METROPOLIS.
* **The control surface is a budget** (R15): the front door is one action; the basic panel holds ≤ 12 controls — seed
  (with the "Surprise me" dice as its button), size rung, water setting and side, walls, castle, gates, **features** (one
  checkbox strip — plaza, temple, shanty town, farms, greens: MFCG's first-level toggles, counted as one control;
  MFP-12), planned ↔ organic, wealth level, greenery, style preset, labels. A feature left at *auto* is drawn per seed
  from S0's per-rung feature-probability table on the `blueprint.features` stream and reported (§4.2, §5.4). Everything
  else sits behind an advanced panel; 100 % of parameters are documented (registry test); new templates and presets are
  data, not code; release notes name known defects.

## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Written after reading the integrated `docs/ARCHITECTURE.md` and the round-1 verification files. Ids in brackets are the
items each change serves. Each request is stated as the text to write or the exact change to make.

### 3.1 To the kernel area

| # | section | request |
|---|---|---|
| KR-1 | §2.2 rule 7 [LC-7] | Add the edge role **`deck`** to the role registry and mark it **structural**: it is carried by the edges of a `Bridge`'s deck span (`ChainRef('deck', bridgeId)`, from bank vertex to bank vertex, beside the way's own `way` role), inserted by S1 (5) and by S1's water operator (§7.3 (b)). Being structural, no sliver absorption or face merge removes it (§3.6), and §5.3's crossing invariant finds deck edges by role. |
| KR-2 | §3.9 [NF-D5] | Write each arena's geometry as **content-addressed chunks** (§2.9): the L0–L1 edges and vertices as one chunk per arena; the L2–L4 edges and vertices as one chunk per static-index partition (one per district plus one outside districts, §3.3) — exact because district boundaries are always spine edges (§2.2 rule 1); a vertex shared by two partitions is written in the partition with the smaller key and referenced by (chunk, index) from the other; roles and face rows follow their edges' chunk. On load the chunks are concatenated in partition-key order before the unchanged rebuild, so the rebuilt arena and its per-level digests are unchanged; the save → load → save test holds chunk by chunk. |
| KR-3 | §3.7 [VK-13] | In "No WASM kernel", the pointer "the cross-implementation test of §6.5 (7)" becomes "of §6.5 (10)". In "Confirmation at M0 and the pre-decided fallback", after "the switch is a declared golden shift", add: "Clipper2 does not reproduce the arrangement engine's integers, so the cross-implementation byte-identity test applies to the WebAssembly accelerator only; Clipper2's determinism check is the cross-host digest identity of §6.5 (9)–(10), and its shift records name every stage that reads a boolean, buffer, inset or band." |

### 3.2 To the pipeline area

| # | section | request |
|---|---|---|
| PR-1 | §4.2 S1 (5) [LC-7] | State the crossing-site search as one function over a set of reaches, `siteCrossings(reaches, bandM, existingDecks)`, which S1 runs over every reach and S1's water operator (§7.3 (b)) runs over the re-traced reach only; add the table value `crossing.searchBandM` (default 120 m) and say that each deck's span carries the structural `deck` role (KR-1). |
| PR-2 | §2.6 "Heights and the ground datum" and §4.7 S11 [LC-7] | Name the datum step as a per-entity function, `deriveBase(entity, sampler)`: a wing's `baseCm = max(samples) + plinthCm` with its foundation skirt and, above `skirtMaxCm`, the stepped-wing split; towers and gates from the samples under their footprints; the wall's `baseCm` per trace vertex; bridge and pier decks from the two bank elevations plus the clearance row. S11, S7 and S1's terrain operator (§7.3 (a)) call the same function. Restate §2.6's acceptance as "on the hilly golden seeds and after every terrain stroke, 0 wings whose `baseCm` differs from the highest terrain sample under the wing plus the plinth, user-edited bases excepted" (the rule is exact, §7.3 (a) step 4). |
| PR-3 | §4.3 [LC-7] | Add one sentence on S4's local operator: "An edit re-routes an arterial only between its nearest pinned nodes (junctions of degree ≥ 3, destination nodes) on either side of the edit region, over this lattice, with every deck — a re-sited one included — a fixed graph edge (§7.3)." |
| PR-4 | §4.8 "Water furniture" [LC-7] | Add: "A deck that S1's water operator re-sites keeps its `Bridge` address by §6.3's bridge row; bridges and piers are re-based by §2.6's datum step after a terrain stroke (§7.3 (a))." |
| PR-5 | §4.1 first bullet, "Transactions" bullet, and §4.12 `StageDecl` [NF-S10, LC-7] | `workLimits: Record<Rung, WorkLimits>` becomes `workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5) */`; §4.1's "workLimits per rung (operation counts, §5.1)" becomes "work-limit laws (operation counts over the batch scope's population-derived counts, §5.1 (5))"; the Transactions bullet's "edits one per event (§3.3)" becomes "edits: one batch per operator and level, in §7.3's chain order, validated together in the dry run (§3.3, §7.1)". |
| PR-6 | §10.4 "Setting packs" [NF-D2] | "recorded in the document by id and version so a replay reproduces it" becomes "recorded in the recipe by id, version and content hash; the content of every pack that is not shipped with the output version is copied into the document's `packs` block (§2.9, §7.6), so a replay never depends on what is installed, and a link is emitted only for shipped packs (§6.4)". In "Per-culture generators and user lists", "stored in the document as pack data with author `user`" gains "(the `packs` block of §2.9)". |

### 3.3 To the rendering area

| # | section | request |
|---|---|---|
| RR-1 | §12.6 "Replay" bullet [N-1, NF-D4, NF-D7] | Replace with: "**Replay** (load verification, migration, undo beyond the scoped records, the undo of an upgrade after a reload): the log is folded on the model through the session's code path — S13a's scoped delta runs at each event that re-derives names, ≤ 3 ms per such event — and only S14 and S13b are suppressed and run once at the end; cost ≤ generation p95 + Σ per-event scope costs (succession matching included, ≤ 2 µs per re-derived entity, §6.3) + Σ S13a deltas + one S14 pass, bounded by §7.4's checkpoints within a session." The worked CITY figure and its edit mix are N-16's to state; with 300 naming-relevant edits the S13a term adds at most 0.9 s. |
| RR-2 | §12.6, new bullet [LC-7] | "**Coarse edits:** a river-control-point or drawn-water edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing search ≈ 1 ms, S4 re-route of ≤ 3 arterials ≈ 5 ms, S5 regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs per re-based entity + the field-brush law for the blocks its drivers re-derive." (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences.) |
| RR-3 | §8.1 item 4 [N-1] | After "the builder is suppressed and runs once at the end (SCL-9)", add "— S13a is model data and runs at each event's log position (§7.3 item 2); only S14 and S13b wait for the end." |
| RR-4 | §11.2 [NF-D1] | `undo(h: DocHandle, of?: number): Promise<ApplyResult>; redo(h: DocHandle): Promise<ApplyResult>;` with the comment "append an `undo` / `redo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events". The boundary table's `edit`, `regenerate`, `undo`, `redo` row is unchanged. |
| RR-5 | §11.3 "Convergence" and "Logging" [NF-D1] | Add: "Undo and redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's `session` is their `EditBase.session`, and a client never truncates a bridged log." The M3a test becomes "a host and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them — converge to one model hash with 0 lost accepted events". |
| RR-6 | §11.1 "permalinks" row [NF-D2] | "one line for unedited towns" gains "; refused, with the `.plat` file or `&doc=` offered, when the town needs a non-shipped setting pack, host content or a non-shipped style sheet (§6.4)". |
| RR-7 | §8.4 [N-29] | None to write: §2.1 now points to §8.4's `LayerSpec` as the one definition; confirm §14's pointer ("LayerSpec: §8.4") stays. |

### 3.4 To the scope area

| # | section | request |
|---|---|---|
| SR-1 | §14 `Stage` [NF-S10] | `workLimits: Record<Rung, WorkLimits>` becomes `workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5) */`; `@plat/tables` lists `workLimits.json` beside the other tables. |
| SR-2 | §14 `EditEngine` [NF-D1] | `undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event, §7.4 */; redo(doc: Document, session: string): ApplyResult /* appends a redo event */` replacing the two `Document`-returning signatures. |
| SR-3 | §13.2 "Cost-model tests" [NF-S10] | Add the populations 9 900 and 29 700 (the tops of the TOWN and CITY bands) to the six sizes, and: "each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches); CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 (§5.1 (5), whose pre-decided fallback then applies)". Add to "Control sweeps": "the population control's sweep reports the same rate". |
| SR-4 | §13.2 "B-EDIT and the locality oracle" [LC-7, NF-D1, NF-D6, N-1] | Add fixtures: terrain-brush sequences in both water modes and river-control-point, drawn-water and drawn-bridge sequences with §7.3 (7)(v)'s assertions (0 decks over land, 0 off-deck crossings, 0 wings off the datum rule, 0 footprints in water); undo and redo sequences from several sessions, including the truncation-identity property (§7.4, §6.5 (9)); New random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 (7)(i)). |
| SR-5 | §16 [NF-D1, NF-D2, LC-7, N-1] | M2a: "undo / redo with undo records and checkpoints" becomes "undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); replay with S13a per event (§7.3)". M3a: add "S1's water and terrain operators with re-sited crossings and exact re-basing, with §7.3 (7)(v)'s coarse-edit oracle in the exit; the `packs` block and the link refusal rules (§2.9, §6.4); the bridge convergence test with undo and redo (§11.3)". |
| SR-6 | §15.2 O9 (c), J-S4, §16 M3a exit [IMP-7] | This area's §7.3 item 7 (iv) now states the calibrated rank test executed by the scope verifier (`fixall_verify_scope_o9c_rank.out`); restate §15.2 O9 (c), J-S4 and M3a's exit to match, as IMP-7 requires. |
| SR-7 | Judgment calls [all] | Append rows J-DET-16 – J-DET-28 from §4 below. |

## 4. Judgment calls for the architecture's table ("chose X over Y because Z"; each vetoable)

| id | call |
|---|---|
| J-DET-16 | Chose undo and redo as logged events applied at the head through the same fold, with per-session stacks and a conservative independence check, over removing the last event from the log, because a host-stored log only grows and every client must fold the same events; removal survives only as the unshared-document truncation, which leaves the model digest unchanged through a canonical `nextSeq` (§7.4, §2.9; NF-D1). |
| J-DET-17 | Chose to copy every non-shipped setting pack's content into the document and to refuse links that need it or host content, over recording packs by id and version only, because a pack missing on the opening machine can only fail or rebuild another town; the link offers the `.plat` file or `&doc=` instead (§2.9, §6.4, §7.6; NF-D2). |
| J-DET-18 | Chose an upgrade's undo record to be its `from` output version (undo = a replay under the retained version) and a rebase's to be its previous base (the recipe always; an older rebased state only under the undo cap), over storing whole pre-upgrade models outside the cap, because one METROPOLIS model exceeds the 8 MB document budget while the replay reproduces it exactly; past the window or the cap the undo is withdrawn with a notice and the CLI command (§7.4, §7.5; NF-D4). |
| J-DET-19 | Chose content-addressed snapshot chunks per static-index partition, shared between `base.state` and `model`, over a bespoke delta encoding of `model`, because the partitions already exist for the indexes and the checkpoints and deduplication by hash is exact; saving always writes `model` (§2.9; NF-D5). |
| J-DET-20 | Chose to compare each scope entity's identity-free content digest after New random and advance its reroll up to three more times, keeping the old reroll and reporting when nothing changes, over trusting that a fresh reroll always changes the scope, because a full ladder does not imply a different result on minimal scopes (§5.1 (6); NF-D6). |
| J-DET-21 | Chose to run S13a's scoped delta at each event's log position in replay mode, suppressing only S14 and S13b, over one S13a pass at the end of a replay, because name uniqueness is resolved scope by scope in log order and label events address records S13a creates mid-log; one end pass makes replay differ from the session (§7.3; N-1). |
| J-DET-22 | Chose to remove `labels` from the rerollable concerns and to make rerollability a registry property checked for a reader, over adding a seeded tie-break to label placement, because label candidates are geometric and placement is a deterministic greedy over a total order — view data that should stay a pure function of the model and the zoom stop (§6.1; N-18). |
| J-DET-23 | Chose to make S1's water operator re-site the crossings of the re-traced reach and chain S4, S5, S6 and S7, with F-REDERIVE's way rungs (re-route through a deck, else cut at the bank and prune the stub; a deck over land becomes ordinary road), over declaring every reach edit a Re-derive from S1, because moving a river must stay local while bridges follow it and no road is left running into the water (§7.3; LC-7). |
| J-DET-24 | Chose the terrain brush's `water: 'locked'` default with water and locked footprints masked, drainage re-run into the drainage arrays only, and exact re-basing of everything on the changed ground, over letting every terrain stroke re-trace rivers, because the brush is mostly used to shape ground and a river move re-routes roads — an edit the user chooses with `follow`; exact over tolerance-based re-basing because it costs microseconds per entity (§7.2, §7.3; LC-7). |
| J-DET-25 | Chose work limits as laws over the batch scope's population-derived counts over fixed counts per rung, because size within a rung follows population across a 6.7× (TOWN) or 4× (METROPOLIS) band, so a fixed count fires F-WORK systematically at a band's top and is slack at its bottom; the counts are model values fixed before the batch runs, so limits stay deterministic and a scoped re-run gets the limit its scope had (§5.1 (5); NF-S10). |
| J-DET-26 | Chose grid-bucketed nearest-neighbour succession matching per kind and class family, with a ≤ 2 µs-per-entity budget (measured 0.4–0.6 µs) and district-partition-first matching as the declared-shift fallback, over an unspecified "nearest anchor" search, because the same routine serves regeneration, Re-derive from S1 and the upgrade mapping and needed a stated cost (§6.3; NF-D7). |
| J-DET-27 | Chose, for a control that fails its sweep, a smoothstep over the failing interval of its expansion row and then a declared discrete control, over widening ε until it passes, because a widened ε hides the jump the user sees while the discrete declaration tells the truth (§7.8; NF-D7). |
| J-DET-28 | Chose to require byte identity of the WebAssembly accelerator only, and to admit the Clipper2-WASM fallback as a declared golden shift checked by cross-host digest identity, over requiring byte identity of both, because the fallback engine computes different integers by construction and would otherwise be unshippable (§6.5 (10); VK-13). |

## 5. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read at source in this lane): `docs/ARCHITECTURE.md` read end to end for the owned sections
(§2.1, §2.8, §2.9, §5, §6, §7) and for every section a fix depends on (§2.2–§2.7, §3.1–§3.10, §4.1–§4.12, §8.1, §8.4,
§9, §10.4, §11, §12, §13.1–§13.3, §14, §16, the judgment calls and the staged list); each item's claim and required
change read in `docs/validation/fix-all/r1-verify-{determinism,kernel,rendering,scope}.md` and the LC-7 finding in
`docs/validation/redteam-lifecycle.md`; the manager notes and round-1 dispositions in `docs/ARCHITECTURE-VALIDATION.md`;
the IMP-7 rank-test numbers in `docs/validation/bench/fixall_verify_scope_o9c_rank.out` (≈ 1 % false failures at
K = 50 and 99; the too-snug regenerator fails 100 / 100); and one measurement run by this lane on the §12.1 reference
machine (Apple M1, Node 24): succession matching by grid buckets costs 0.60 µs per entity for a 450-building district,
0.59 µs for a 30 000-entity CITY re-derivation (0.38 µs against an unrelated fresh town) and 0.59 µs for an
80 000-entity METROPOLIS mapping at a 2 m radius (`docs/validation/bench/fixall_det_r2_match.{mjs,out}`, synthetic
anchors on a jittered grid, six class families, seeded).

**PLAUSIBLE** (this seat's design reasoning; each paired in the blocks with its confirming measurement and pre-decided
fallback): that the independence check makes a head-applied undo equal to the log without its target for every event
kind (the enumeration and convergence tests confirm it at M2a / M3a); that truncation leaves the model digest unchanged
(the B-EDIT property test); the coarse-edit budgets of RR-2; that the local drainage re-run by doubling boxes matches a
whole-frame run (a B-EDIT terrain fixture compares both); that the S6 rule for vacated channel land gives reasonable
districts; the ≤ 20 µs budget for overlap-anchored matching; the 1-per-1 000 F-WORK flatness bar and the 99.9th
percentile × 1.5 coefficient rule; the 2 MB cap on pack data and host content; and the chunk-sharing claim (a rebased
CITY document after 20 edits ≤ 1.25 × an unrebased one, measured at M1).
