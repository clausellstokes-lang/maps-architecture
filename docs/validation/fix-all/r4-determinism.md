# Fix-all round 4 — DETERMINISM area (§2.8, §2.9, §5, §6, §7): the eight items still open after round 3
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-determinism-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-determinism-r4` · 2026-09-26 · seat: fix architect, DETERMINISM area, round 4 (Fable role; opus
stand-in) · clean-room: every mechanism below is described in this seat's own words and numbers; no reference code,
grammar, palette, word list or content table is quoted.

Status: COMPLETE (2026-09-26).

## 0. How to read this file (plain words)

After round 3, the checkers left eight problems in the part of the design that makes the same seed give the same town,
keeps edits safe and handles failures. All eight are fixed here; none is postponed.

The two serious ones. **First, a small water edit could force a rebuild of the whole town.** Drawing a pond inside a
block, or widening a river into the blocks beside it, left those blocks' plot lines in the way of the new water,
because the river edit only cleared the blocks whose streets it changed. It now clears, before the water goes in,
exactly the area it has already shown the user (its "footprint"), the same way the canal edit does, and rebuilds that
area afterwards; everything outside stays exactly as it was. **Second, opening a saved town never checked that the
copy being edited matched its own fingerprint.** It now re-computes the fingerprint of the opened copy before the
first edit (about 30 milliseconds for a city, measured), and a copy that does not match is treated as damaged and
rebuilt from its recipe instead of being trusted.

The smaller ones. Choosing your own list of street names, or editing a naming rule, now renames exactly the names that
list or rule produced — and nothing else — after you confirm the list of renames; every name remembers which rules and
lists it was drawn from, so this works in every saved town. A name list you selected and later deselected stays inside
the file, so the town always re-opens, and such a town never produces a share link that would show other names. In a
shared town, when the owner keeps the saved version after a mismatch, every other player's copy switches to it too.
While a saved town is being checked in the background, edits use one worker, so memory stays within its budget. The
rule that protects wall strips now asks each edit which walls it rebuilds instead of relying on a list that had
forgotten canals. And one list of re-rollable settings is now typed as strictly as the others.

Each fix is written below as the complete new text of the subsection it changes (§2 of this file), followed by the
changes other areas must make (§3), the judgment calls to add to the architecture (§4), and what was measured versus
reasoned (§5).

## 1. Disposition table

| id | sev | disposition | sections changed [other areas' sections, by request] | mechanism, in one line |
|---|---|---|---|---|
| VK3-1 | major | FIX | §7.3 (b) 2–4, 8, the S1-water and carve rows, item 7 (v) [§3.3 pointer KR4-4, §13.2 SR4-1] | the footprint is computed at the end of (b) 2; the L1 batch declares it as `KernelTx.clearRegion` and clears it by §3.3 rule 1 (every finer partition face that meets it, whole), the L0 batch declares it and clears nothing, tree scoping re-derives every cell of it; fixtures: a pond inside a block and a widened bank commit with no `E_LEVEL` and byte identity outside |
| VD3-1 | major | FIX | §2.9 steps 2–5 and `Snapshot`, §6.2 (Maintenance, measurement, fallback (iii)), §5.3 (load row), §7.4 (checkpoints) [§3.9 KR4-1, §12.6 RR4-3, §13.2 / §16 SR4-1–2] | the load recomputes the decoded state's whole digest tree (measured ≈ 31–34 ms CITY, ≈ 95–101 ms METROPOLIS) and compares its root with `model.digest` before the first edit; a mismatch is a corrupt cache, loaded by replay and never verified; "verified" needs both roots; the tree is the working state's maintained tree; open-to-editable ≤ T(B); fallback: off-edit-path recomputation on an `h₀` checkpoint with a touched-set catch-up (J-DET-40); fixture: a moved footprint with `model.digest` unchanged is reported, never verified |
| VD3-2 | major | FIX | §2.8 (`NamingRecord`), §6.3 (draw case (4)), §6.1 (salt), §7.3 items 2, 4, 5, 7 (i), §7.4 (adjust, editTable, upgrade, setAttr rows), §7.6 [§9.6 RR4-1, §10.4 PR4-1, J-DET-37] | every generated name persists a naming record (the naming slices and salt of its last draw); an unedited name whose recorded slices changed — a grammar row, or the corpus a culture or ancestry row names (a user corpus pack carries its binding as a keyed row operation) — is re-drawn with its own salt when a pack-list `adjust`, a naming `editTable` / `editPreset`, an upgrade or any re-derivation reaching S13a runs over it; renames listed for confirmation; undo restores former names |
| VD3-3 | minor | FIX | §2.9 (`packs`, the pack-set bullet), §6.2, §6.4 (pack versions, link rule, CI), §7.4 (truncation), §7.6 [J-DET-35] | the document's pack set = the base recipe's packs plus every pack any `adjust` in the log names; its non-shipped content stays in `packs` while any event names it; the link rule reads the pack set; CI adds select → deselect → save → reload |
| VD3-4 | minor | FIX | §2.9 step 4, `Base` comment, §7.4 rebase row [§11.3 RR4-2, §16 SR4-2] | a non-owner client that took the replayed town keeps the `doc.load` bytes; on the owner's `keptSnapshot` rebase behind its head with a different `stateDigest` it installs the saved town from them and re-applies the later events; a later loader whose log already holds that rebase takes the saved town without asking; M3a convergence test with an owner's keep |
| VD3-5 | minor | FIX | §2.9 step 3 [§4.1 PR4-5, §12.6 RR4-3, §12.8 RR4-4, J-I14, J-DET-43] | during load verification every edit runs its per-district stages in the generation worker by the pool-size-0 path (identical digests by construction), so no frozen copy exists beside the replay's model; M1's memory run includes a district regeneration and a Re-derive from S3 made during verification |
| VD3-6 | minor | FIX | §5.3 (NF-P5 row and its judgment) [J-DET-39] | the exemption is a declaration each chained edit's dry run computes — the enceintes whose strips it rebuilds by step (0) or removes — read by the check, never a list; the listed operators now include the carve and the water operator for every strip it changes; a registry test and fixtures (a canal across a wall, a bank cutting a glacis line) |
| VD3-8 | minor | FIX | §2.9 (`Recipe.salts`, load step 1), §6.1 (salt), §6.4 (`&r=`), §5.3 (save row) | `Recipe.salts: Record<RerollableConcern, number>`, the schema refusing any other key; a document whose recipe carries one opens read-only naming the field |

Tally: 8 items — **8 FIX**, 0 INVALID, 0 STAGED-BY-OWNER. Replaced subsections: §2.8, §2.9, §5.3, §6.1, §6.2, §6.3,
§6.4, §7.3, §7.4, §7.6 (ten blocks in §2). Other areas' round-3 findings whose companion text is folded into §7.3 and
§7.4 (their owners' wording governs): NP3-1, NP3-2, NP3-3, NP3-4 (b), VK3-2, VK3-3 (b), VK3-9 (§3 preamble).

## 2. Replacement blocks

=== REPLACE §2.8 Identity, lifecycle, provenance, the entity registry ===

### 2.8 Identity, lifecycle, provenance, the entity registry

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

Every entity record has five parts: an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest),
its **attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's
owner and role tables, never through stored slots), a **derivation record** (the inputs of its last derivation —
persisted for the kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was
last derived — rebuilt by every derivation, never persisted, never in the model digest; LC-25). An entity that carries
a generated name also persists that name's **naming record** (the naming inputs of its last draw — outside the model
digest; VD3-2).

```ts
// @plat/model
type Hash64 = [number, number]; type Hash128 = [number, number, number, number];   // u32 lanes
type LineageHash = Hash64; type PointCm = { x: Cm; y: Cm }; type VecCm = PointCm; type PolygonCm = PointCm[][] /* outer ring, then holes */;
interface Identity { id: Id /* address id, §6.3 */; kind: string; parent?: Id /* containment parent: a field, never parsed from the id */;
  key: PlatKey /* the arena: layer and part, §2.2 */; lineage: LineageHash /* stream identity, §6.3 */; reroll: number /* reroll count of this entity as a derivation unit, §6.1 */ }
type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'demolished';
interface LifecycleFlags { locked: boolean; pinned: boolean; edited: boolean; assigned: boolean;
  lockedPaths?: string[] /* attribute-level locks (§7.2); absent = the whole entity */; editedPaths?: string[] /* attributes the user set; each is implicitly pinned (§7.2) */ }
interface Lifecycle { existence: Existence; flags: LifecycleFlags; since: { epoch: number; seq: number } /* the event that last changed `existence` */ }
interface LifecycleEvent { id: Id; seq: number /* the causing EditEvent's seq; 0 for the generation run */; epoch: number;
  kind: Existence | 'lock'|'unlock'|'pin'|'unpin'|'edit'|'assign'|'unassign'|'reparent'|'carry'|'supersede'|'resurrect';
  cause: EditRef | RuleRef | 'generation'; detail?: { from?: Id; to?: Id; lineageFrom?: LineageHash; lineageTo?: LineageHash; path?: string } }
interface Tombstone { id: Id; kind: string; lineage: LineageHash; supersededBy?: Id; seq: number; last: Uint8Array /* the compressed last record: orphan reports, resurrection (§6.3) */ }
interface DerivationRecord {            // persisted with plots, blocks and buildings (the kinds whose stage declares it, §2.5); outside the model digest
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the recorded band hysteresis reads */;
  allocationRow?: number /* the Allocation row the entity filled (§4.5 S7b) */; epoch: number /* the epoch of the derivation */;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */ }   // the one definition; §2.5's plots, blocks and buildings use it
interface NamingRecord {                // persisted with every generated name S13a draws (VD3-2); outside the model digest, hashed with provenance; handed to a successor with the name (§6.3)
  slices: SliceRef[] /* the naming slices the last draw consulted: the grammar rows and weight vectors of the effective naming table, and every row that chose a grammar or corpus for it (a culture or ancestry row, §10.4) — the hash of a row that names a corpus covers that corpus's content hash (§7.6) */;
  salt: number /* the naming salt the last draw used: the town salt, or the per-entity salt of the ids-scoped rerollLayer that drew it (§6.3) */; epoch: number }
interface Provenance {                  // derived: rebuilt by every derivation and by replay; stored as columns; never persisted, never in the model digest
  run: StageRunRef;                     // index into the stage-run table { stage, outputVersion, tablePins } — interned once per stage run, not copied per entity
  attempt: number;                      // the ladder attempt that committed it (§5.1)
  rules: SliceRef[];                    // every table slice the derivation consulted (§7.4, §7.6)
  deps: Handle[] }                      // u32 handles of the entities it read (the locality audit, §7.3)
interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; key: string; hash: Hash64 }
```

* **One existence state plus orthogonal flags** (LC-26). A pin followed by an assignment leaves the entity both pinned
  and assigned; no code tests a single state value. `existence` moves through: `generated` (made by the pipeline);
  `built` (created by a user or an epoch: `build`, `drawFootprint`, drawn features); `altered` (a structural edit or a
  transformation changed it: split, join, densify, a re-cut by F-REDERIVE); `converted` (retyped: wall → ring road,
  gate → junction); `abandoned`, `decayed` and `ruined` (decline); `demolished` (removed; the record becomes a
  tombstone).
* **The decline hooks** (owner's decline instruction; COV-NG-XA36, COV-VG-VN-090 — STAGED-BY-OWNER). `abandoned`,
  `decayed` and `ruined` exist in the base schema with their conversions (§4.11's `ConversionOp`: abandon, decay, ruin,
  clear, rebuild), which a user can apply by hand in the base (§7.1); a ruined building keeps its footprint and heights
  and draws with the ruin program and the `none` roof kind (§2.6, §8.2). When and where the evolution program applies
  them — houses emptying, stone robbed, plots turning to gardens — is that later program's rule table over
  `…/epoch=e` streams (§4.11); the base needs no further change for it.
* **History lives outside the entity** (SCL-20). The document keeps one **lifecycle event block** keyed by id and
  ordered by `seq` — each entry's `seq` is the causing event's (0 for the generation run); an entity holds only its
  `Lifecycle`. The block is not append-only (VD2-3): an `undo` removes the entries whose `seq` is its target's, and a
  `redo` re-inserts them in `seq` order (the re-applied target's events cite the target's `seq`, §7.4); neither writes
  an entry of its own. So the block is always the block of the log with its undone pairs left out — the identity the
  unshared-document truncation relies on (§7.4, §6.5 (9)). Demolished and superseded entities move to the **archive**
  as tombstones: out of the working set, the spatial indexes and the display list; their ids and `supersededBy` links
  stay in the identity subtree of the model digest (§6.2) so an id is never minted twice (§6.3); a tombstone carries
  its causing event's `seq`, so an `undo` returns its target's tombstones to live and a `redo` archives them again. *Growth budget:* the
  working set grows only with live entities; the document grows by at most the bytes of new or changed records plus
  64 B per lifecycle event. *Test (M4, with the epoch path):* a 20-epoch TOWN with ≈ 30 % churn per epoch keeps its heap
  ≤ 1.3 × and its document ≤ 2 × those of a freshly generated town with the same live entities. *Pre-decided
  fallback:* the archive and the lifecycle event block are held compressed in memory and decompressed only for an
  orphan report, a resurrection or an export — output-neutral. *Chose a block ordered by `seq` from which an undo
  removes its target's entries over an append-only block with compensating entries, because compensating entries make
  the identity subtree of a log with an undone pair differ from that of the same log truncated, so the model digest
  would depend on whether the pair was kept.*
* **Derivation records** (LC-12). A plot, block or building persists the inputs of its last derivation — context and
  parameter digests, field samples, band, the table slices consulted — so "Regenerate (keep settings)" reproduces it
  from what it was made from, across saves, epochs and field edits elsewhere (§7.3 item 5). The record is excluded from
  the model digest (it is hashed with provenance) and rewritten by every derivation of the entity.
* **Naming records** (VD3-2). Every time S13a draws a generated name it writes the name's `NamingRecord`: the naming
  slices the draw consulted and the salt it used. The record travels with the name when the address passes to a
  successor (§6.3), is rewritten by every draw, and is what §6.3's draw case (4) and §7.6's invalidation by slice compare
  with the current effective slices to find the names whose naming inputs changed. It is persisted, like a derivation
  record and unlike provenance, because a rebased document — whose provenance no replay can rebuild — must still know
  which names drew from a changed grammar row or corpus. It is stored as offsets into the deduplicated slice-reference
  pool (below): ≈ 4–8 slices per name, ≈ 20–40 B raw per name, ≈ 0.1 MB raw for the ≈ 3 500 names of a CITY before
  compression, counted in §2.9's per-building document budget. A name the user set (`setAttr`) has no naming record;
  it is an edited attribute and is never re-drawn. *Chose a persisted naming record per generated name over reading
  a name's naming slices from its provenance, because provenance is never persisted and cannot be rebuilt after a
  rebase, so selecting a corpus in a rebased document could not tell which names drew from the corpus it replaces.*
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table,
  not in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool;
  all of it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). A release that changes no output changes no
  model digest. Provenance, derivation records and naming records share their own digest, used only by the locality
  audit.
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash:
  the whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold
  set for a band lookup, the row for a direct lookup, and the table's match predicate set for a rule that selects rows
  by predicate. §7.6 invalidates on slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9), the naming record included
  for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); migration hooks
  (§7.5). A CI test fails when a type is missing from any path — generation, digest, render, export, persistence,
  edit, undo, migration (VG's palisade "ghost" cannot recur; O11 a; owner amendment 5, §7.1).

=== REPLACE §2.9 The document and serialisation ===

### 2.9 The document and serialisation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
  packs: PackData[];            // the content of every non-shipped pack of the document's pack set (below: the base recipe's packs and every pack an `adjust` of the pack list in the log names) — a selected user corpus is one, `user:<hash>` (§7.6, §10.4; VD2-8, VD3-3) — canonical, outside the model digest (NF-D2)
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own digest and verified by replay (below); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included (§7.4; VD2-4) — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[] };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records follow §7.4); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2); VS2-6)
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the output version's shipped set; always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<RerollableConcern, number> }   // initial salts of the rerollable concerns only (normally 0), keyed by §6.1's registry-generated type; the schema refuses any other key (VD3-8), so a geometry concern can never carry a salt; rerollLayer events in the log advance them (§6.1)
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* Merkle root, §6.2 — recomputed from the decoded state at every load and compared (load step 3) */ }
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields'; partition: string /* PlatKey and 'L0-1' (the level-≤ 1 routes) or a static-index partition (§3.3) — or, under the size fallback below, a block group — or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // `session` (an unshared document's stored authoring session, §7.4; a bridged client never writes it), time, location, favourites, notes and public notes, view pins, layer choices, `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), season, weather, frame, map rotation, compass, legend and emblem settings and `exportAnchor` (§11.1) — each key last-writer-wins by (Lamport counter, session id)
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
* **Model inputs that are not in the recipe's parameters; the pack set** (NF-D2, VD2-8, VD3-3). Every setting pack is
  identified by id, version and content hash. The document's **pack set** is every pack that the base recipe's `packs`
  names or that the `value` of any `adjust` of the pack list in the log (`param: 'packs'`, §7.6) names — an undone,
  superseded or deselected selection included, because its event stays in the log and every replay folds it. When a
  document is created — or an `adjust` adds a pack (§7.6) — the content of every pack of the pack set that is not in
  the output version's shipped set is copied into `packs`, and it **stays there while any event of the log names the
  pack**: only a truncation (§7.4) that removes the last event naming a pack drops its content, at the next save.
  **A user-uploaded corpus is a pack like any other** (§10.4): selecting it wherever a corpus is chosen is an `adjust`
  of the recipe's pack list (§7.6) that enters it as `{ id: 'user:<content hash, base 32>', version: '1', hash,
  shipped: false }` with its content in `packs` — the corpus and the keyed row operation that binds it to the culture
  or ancestry row the user chose, so the binding is part of its content hash (§7.6); deselecting it is a second `adjust`, and its content stays saved
  because the first still names it — so a replay of the log always resolves it, and a town that has selected a user
  corpus can never emit a link that replays with other names (§6.4); an uploaded corpus outside the pack set is not a
  model input and is not saved. A host provider's outputs are copied into `hostContent` as they are produced (§11.4).
  On load each pack of the pack set is resolved by hash, first from `packs`, then from the library's shipped packs; a
  missing pack or a hash mismatch opens the document read-only with a message naming the pack, never a replay with
  other content. So a document replays on a machine that has neither the pack nor the host. Pack data and host content
  are counted outside the per-building budget below and **capped at 2 MB gzipped together**: a pack (a user corpus
  included) that would pass the cap is refused when it is added, with a message; a host provider's output that would
  pass it is refused at the provider call — nothing is recorded in `hostContent` — and the edit that requested it
  returns an **F-EDIT conflict** (§5.2) naming the provider and the size: an `ApplyResult` `conflict` through the API
  and, for an edit that came over the bridge, `doc.rejected { reason: 'invalid', conflicts }` (§11.2, §11.3). So
  nothing is ever committed with content a replay could not read. *Chose the pack set — every pack the base recipe or
  any `adjust` event names — over the effective recipe's current pack list as the set that is saved and that the link
  rule reads, because the log is replayed from its first event: a corpus selected and later deselected is still read
  by the replay of the first `adjust`, and a corpus selected after creation is not in the base recipe at all.*
* **Load** (the K-3 repair, completed by LC-13, LC-28, N-1, NR-8 and VD3-1):
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only. A document
     whose canonical form fails its schema — a `Recipe.salts` key that is not a rerollable concern among them
     (VD3-8) — opens read-only with a message naming the field, never replayed.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current
     version and records that it is not seed-reproducible before the rebase. The frozen view's `model` is decoded and
     its digest recomputed as in step 3; a root that differs from `model.digest` is reported ("the saved copy does
     not match its own fingerprint") with the CLI command that replays the document under its own output version
     (§6.4), the view still opens, and a `frozenImport` rebase records the recomputed root as its `stateDigest`. A
     document without `model` outside the window (only the CLI writes one, below) cannot be shown as a frozen view:
     the app says so and shows the CLI command that replays it under its own output version (§6.4), and offers to
     open its recipe under the current version as a new document with §6.4's notice.
  3. Otherwise the load **decodes** `model` — each chunk checked against its content hash, the arena rebuilt (§3.9),
     the entity columns decoded, the fields recomputed from their drivers and the stroke list (below) — and displays
     it at once. Before the decoded state accepts its first edit, the load **recomputes its digest tree** — every leaf
     and interior node of §6.2, one full recomputation from the decoded state (§6.2's ≤ 150 ms bar at CITY; measured
     ≈ 31–34 ms at CITY and ≈ 95–101 ms at METROPOLIS on a synthetic, schema-shaped workload,
     `docs/validation/bench/fixall_det_r4_loaddigest.out`) — and compares its root with `model.digest` (VD3-1). The
     tree it builds is the working state's maintained tree from then on: every edit updates it at commit (§6.2
     "Maintenance"). **A root that differs, or a chunk whose bytes miss their content hash, is a corrupt cache**: the
     report says so ("the saved copy of this town does not match its own fingerprint; it is being rebuilt from its
     recipe and edits"), the decoded picture stays on screen read-only and marked as damaged, and the document loads
     by replay (step 5), the replay's state becoming the working state when it reaches the log head; a corrupt cache
     is never verified, never a base and never offered as the saved town. A rebased document's `base.state` is
     checked the same way when a replay starts from it; a mismatch there opens the document read-only with a message,
     because no replay can rebuild a state that is not seed-reproducible.
     On a matching root the decoded `model` is at once the **working state** (NR-8): the user edits it immediately,
     and each edit is dry-run, logged and applied to it exactly as in a verified session, at §12.6's edit cost — no
     edit waits for the verification replay. In parallel a **verification replay** folds (base, log) up to `h₀`, the
     log head `model` materialises (`model.seq`), in replay mode — every model stage at its event's log position
     exactly as in the session, S13a's scoped delta included; only the view stages S14 and S13b suppressed (§7.3) —
     and compares its Merkle root at `h₀` with `model.digest`. It runs in a pool worker on its own arena, and §12.8
     counts the replay's model in place of the pool's frozen arena copies because **no copy is frozen while it runs**
     (VD3-5): every edit made meanwhile runs its per-district stages (S10, S10b, S11, S12b) in the generation worker by
     the pool-size-0 path (§3.3 step 5), which gives the digests the pool gives by construction, so the replay's worker
     is never contended and the working set stays on its counted line; an edit whose scope spans several districts
     costs its single-worker figure (§12.4) until verification ends. With pool size 0 the replay runs in the
     generation worker, on its own arena beside the working state, and yields to each user edit at its next batch
     boundary (J-I14). Two kinds of edit need what only the replay rebuilds — provenance, which the snapshot does not
     store (below) — and are held until the replay reaches `h₀` and hands its provenance to the working state (for
     every entity the edits made meanwhile did not re-derive): `editTable` and `editPreset`, whose invalidation reads
     recorded slices (§7.6); every event after a held one waits behind it, so the fold keeps log order. An Adjust
     meanwhile uses tree scoping, which the oracle proves output-identical to the dependency-graph route (§7.3 items
     6–7). **The working state is verified only when both roots equal `model.digest`** — the recomputed root of the
     decoded state, checked before its first edit, and the replay's root at `h₀`; the edits made meanwhile are then
     verified with it, because they were applied to a state proven equal to the replay's at `h₀`. The user may end the
     wait at any time by choosing "trust the saved town", which keeps the saved town as in step 4 (its own fingerprint
     has already been checked). *Budget and measurement (M2a; METROPOLIS at M2b):* **open-to-editable** — from the
     file's bytes in memory to the working state accepting its first edit — ≤ the time §12.5's law gives to generate a
     town of the document's building count with the pool, T(B) (at CITY ≤ 60 ms + 60 µs × B: 330–420 ms at the
     default request), so opening a saved town is never slower than generating it; on the reference 300-edit CITY
     document, with pool size ≥ 1, an edit made 100 ms after the state becomes editable applies within its §12.6 cost
     + 10 ms; with pool size 0, within its cost + the longest replay batch at the rung (reported); the picture is on
     screen before the state is editable (S14 from the decoded model). *Pre-decided fallbacks:* if the recomputation
     passes §6.2's bar, it leaves the edit path by §6.2 (iii); if open-to-editable then still passes T(B), the kernel
     rebuilds each L2–L4 static index partition at the first query that reads it instead of at load (§3.9) —
     output-neutral, because every query result is sorted by its canonical key whichever structure holds an item
     (§3.3) — and if the bar still fails it is restated at the measured value as a declared budget amendment in the
     release notes and the judgment table, reported for the owner's veto, the picture still appearing at once; if the
     pool-size-≥ 1 edit bar fails for CPU contention, the verification replay pauses while an edit is applied and
     while the user has edited within the last 2 s, then resumes — scheduling only, never a model change. *Test
     (B-EDIT, M2a):* a snapshot in which one building's footprint was moved and `model.digest` left unchanged — once
     with its chunk's content hash rewritten to match the moved bytes, once without — is reported as a corrupt cache
     and loads by replay: it is never verified and never offered as the saved town, and the session's digest after the
     replay equals a fresh replay's.
  4. A **mismatch is never silent** and is resolved once, by the user's choice. **Keep the saved town:** the base
     becomes the rebased state `model` at `h₀` (`Base.seq = h₀`) and a `rebase` event with `at = h₀` (reason
     `keptSnapshot`) is appended at the head; the edits made during verification already stand on that state and stay
     as they are. **Take the replayed town:** the replay's state at `h₀` (its arena and entity columns, transferred to
     the generation worker) replaces `model`, and every event logged after `h₀` is re-applied to it in log order
     through the ordinary fold — they are log events, so this is their replay; each one's confirmed fates are
     recomputed and a difference is reported as §7.3 item 4 requires, and their undo records are rebuilt by the
     re-application. Either way the document is consistent after the choice, the next load does not report it again,
     and undo below a rebase uses the rebased state, never a replay from the seed. A rebase fills in, from the rebased
     state, the derivation record of any entity that lacks one, so Regenerate (keep settings) stays defined for every
     entity.
     **In a document attached to a host bridge** (VD3-4) only an `owner` client may keep the saved town (its `rebase`
     travels through the host like any event, §11.3). Every other client takes the replayed town for its own working
     state, reports the mismatch, records its root at `h₀` and **keeps the bytes `doc.load` delivered** (the
     compressed document, ≤ 3 MB at CITY) until the mismatch is settled or its session ends. A client that receives a
     `rebase` with reason `keptSnapshot` whose `at` lies behind its log head and whose `stateDigest` differs from its
     own root at `at` **installs that base**: it decodes `model` from the kept bytes and checks it as in step 3, makes
     it the rebased base (`Base.seq = at`), re-applies every event after `at` through the ordinary fold — their fates
     recomputed and differences reported (§7.3 item 4), their undo records rebuilt, as "take" does in the other
     direction — and tells its user that the owner kept the saved town. A client whose verification is still running
     when that `rebase` arrives stops it, because the base is settled; a client whose root at `at` equals the
     `stateDigest` changes nothing; any other `rebase` whose `at` lies behind the head (possible only in a hand-built
     log) is a reported no-op, identically everywhere. A client that loads a document whose log already holds a
     `keptSnapshot` rebase with `at = model.seq` and `stateDigest = model.digest` — the host kept serving the bytes
     from before the owner's choice — takes `model` as that rebased base after step 3's check, without a verification
     replay and without asking, since the owner has chosen; the next owner save writes the base in its rebased form.
     So every client of a bridged document reaches the owner's state, as §11.3's convergence rule requires.
     *Test (B-EDIT, M2a):* open an edited CITY document, edit within 100 ms of the state becoming editable, force a
     mismatch (a snapshot in which one building's footprint was moved and whose recorded digest was recomputed to
     match it) and take each choice in turn: the edit is applied at once, and after either choice the session's
     digest equals the digest that a fresh load of the saved document replays to, and that load reports no mismatch.
     *(M3a)* §11.3's convergence test includes a forced mismatch settled by an owner's keep while two editors edit on
     the replayed town. *Chose to apply edits at once on the displayed snapshot, with the verification replay beside
     them, over queueing them until verification ends, because §12.6 puts verification at ≈ 1.4 s for the reference
     mix and ≈ 11 s for 300 district regenerations, while an edit must redraw within 100 ms (O12 (b)); the edits are
     ordinary log events, so a mismatch only changes the state they are re-applied to. Chose to recompute the decoded
     state's own digest before its first edit, over trusting its chunks' content hashes, because a content hash proves
     only that the bytes are the ones written, not that they encode the model whose root was recorded — a writer or
     loader bug, or an altered file, would otherwise be edited and declared verified. Chose to let a non-owner client
     keep the served bytes and install the saved town when the owner keeps it, over making every client wait on the
     snapshot for the owner's choice, because an owner who is absent would leave the editors working on a state the
     replay has shown to differ, while the kept bytes cost ≤ 3 MB and a re-decode.*
  5. A document without `model` inside the window loads by replay — as does a corrupt cache (step 3); `model` is a
     cache, never the only copy of anything.
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records and naming records, §2.8); **provenance is
  not stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at
  full resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2);
  the snapshot carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the
  document is ever opened as a frozen view. The digest tree is not stored: the load recomputes it (step 3). The report
  records stream keys only for ladder uses (any rung from tier 2 up), never every key.
* **Content-addressed chunks; one copy of a rebased state** (NF-D5, VD2-9). A snapshot is serialised as chunks, each
  keyed by its 128-bit content hash and written once in the container however many snapshots reference it; the
  kernel's layout is §3.9's. Per arena, the **level-≤ 1 routes** form one chunk — every vertex of birth level ≤ 1 and
  every L0–L1 edge stored between its level-≤ 1 endpoints, so the finer Steiner vertices that later split it are not
  part of it — and the L2–L4 geometry of each static-index partition (one per district plus one outside districts,
  §3.3; the same units as §7.4's copy-on-write checkpoints) forms one chunk each: the vertices born there, the edges of
  level ≥ 2 inside it (district boundaries are always L1 edges, §2.2 rule 1, so every such edge lies in one
  partition), the **Steiner splits** its batches made on L0–L1 edges and the finer roles they added to those edges'
  sub-edges. **Every reference to geometry another chunk holds is by lattice point**, never by (chunk, index): a vertex
  is unique per lattice point in its arena (§3.10), so an L0–L1 vertex, or a vertex on an L1 edge two partitions share
  (the foot of a wall- or margin-band cross edge, §4.7 — written in the chunk of the partition with the smaller key),
  is named from any other chunk by its position. A chunk's bytes therefore depend only on its own partition's content:
  an edit that renumbers one partition's vertices rewrites that chunk alone, and the level-≤ 1 chunk only when the
  edit changes a level-≤ 1 route or promotes a vertex into one. Entity columns are chunked per partition; the archive,
  the lifecycle history and the field cache are town chunks. A rebased document's `model` therefore shares every
  unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only a chunk list naming
  `base.state`'s chunks (the same digest), and after edits only the chunks of the partitions those edits touched are
  stored twice. *Chose content-addressed chunks over a bespoke delta format because the partitions already exist for
  the static indexes and the checkpoints, deduplication by hash is exact, and a loader needs no delta logic; and chose
  references by lattice point with level-≤ 1 routes in the coarse chunk over (chunk, index) references, because an
  index into another chunk changes whenever that chunk's partition is renumbered, which would make every edit rewrite
  its neighbours and the coarse chunk too.*
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population
  (≈ 212 B per building; PLAT also stores plots, yards, heights, lifecycle and the naming records of §2.8, and derives
  people); pack data and host content are counted separately (above). This section holds the document budget (§12
  carries memory, not the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and one on a
  rebased CITY document after 20 edits (≤ 1.25 × the unrebased document). *Pre-decided fallback if CITY exceeds 320 B
  per building:* the vertex stream switches to second-order (predictive) delta coding — each vertex stored as its
  difference from the straight-line continuation of the previous two along its first edge — with x and y in separate
  streams; the change is lossless and output-neutral, so no golden moves. *Pre-decided fallback if the rebased
  document exceeds 1.25 ×* (VD2-9): the L2–L4 geometry and entity chunks are cut per **block group** instead of per
  district — a district's blocks grouped by the 200 m world-grid cell that holds each block's lowest-leftmost vertex,
  so an edit rewrites only the groups whose blocks it touched — and the test re-runs; if the ratio still exceeds
  1.25 ×, the bar is restated at the measured ratio as a declared budget amendment in the release notes and the
  judgment table, reported for the owner's veto, while the rung's absolute budget above (CITY ≤ 3 MB) stays the hard
  bar for rebased documents too. Both steps are output-neutral: chunking changes bytes on disk, never the model or its
  digest.
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
  locality oracle), the **provenance digest** (provenance, derivation records and naming records, §2.8 — the locality
  audit only), and the **document digest** (over the canonical bytes — save → load → save identity). The bridge's
  concurrency token is `logHead` = a 128-bit hash of (`docId`, log length, hash of the last event) (§11.3; named in our
  own terms, FTG-22).
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices,
  `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3; N-15), season, weather, frame, map rotation,
  compass, legend and emblem settings and `exportAnchor` (§11.1; N-14) — and which people a user has looked at — live in
  `view`, outside every digest; the document's `style` stays canonical; each key is last-writer-wins by (Lamport
  counter, session id), so a viewer never writes the model. The key `session` holds an unshared document's authoring
  session (VD2-4): minted once by `@plat/api` and reused on every open, so undo and redo continue across reloads
  (§7.4); a client attached to a host bridge takes its session from `doc.load` instead and never writes this key
  (§11.3).
* **Round trip** is a hard test: export → import → export byte-identical over the canonical form (O9 a, O11 c).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4.

=== REPLACE §5.3 The invariant suite, by scope (SCL-1) ===

### 5.3 The invariant suite, by scope (SCL-1)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

Every invariant declares a **scope**, and only batch-local invariants run per batch. *Batch-local* invariants are
evaluated on the batch's touched faces plus their one-ring and on the records the batch created, changed or removed;
*stage-end* invariants run once when a stage (or a stage's scoped re-run) completes; *save / load* invariants run when
a document is written or verified; *CI-only* invariants run in the test harnesses. The dry run of an edit (§7.1)
evaluates the edit's batch-local and stage-end invariants once on the scratch overlay, and the commit reuses that result
(the overlay is committed as validated), so an edit pays for one validation, not two. **For an edit whose operators
chain several batches** (§7.3 item 3), the rows below marked batch-local are evaluated once, after the chain's last
batch, over the union of the chain's touched faces, their one-ring and the records the chain created, changed or
removed — a river move places its decks' bank vertices in an L1 batch before its L0 batch inserts the water (§7.3 (b)),
so the crossing row can only hold at the chain's end; the kernel's own invariants (§3.10, the first row) still hold at
every batch, which is why each chained batch keeps every way and enceinte one connected chain (§7.3 (b) 3).

| invariant | scope | how it is checked |
|---|---|---|
| the kernel invariants of §3.10: lattice points inside the range; no edge shorter than `minEdge` from any writer (insertion, booleans, buffers, offsets, smoothing, warp); clearance; simple faces except declared antennae; nesting by index (every level-(n+1) face has one level-n parent); the Steiner bound; role consistency, with no structural role lost | batch-local | the commit record's faces, edges and role keys (§3.3, §3.10) |
| class floors: min width / area / angle per class (never `minEdge` as a face floor; GEO-35) | batch-local | touched faces |
| no footprint overlap | batch-local | touched footprints against the spatial index |
| every plot with ≥ 1 access edge, every building with its entrance on one | batch-local | touched plots and buildings |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water** (LC-7): every edge carrying a `way` role whose two sides both lie in water — the L0 parents of the faces on either side are water faces — belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying the `deck` role; fords included) or to a **harbour work** (VD2-2): a way of class `pier` or `quay` whose connected set of `pier` and `quay` edges meets land in at most one L0 land face — a pier, a mole or a breakwater arm rooted on one shore, a detached breakwater touching none (§4.8) — which stands in the water rather than crossing it; a `pier` or `quay` way that joins two land faces across water crosses on a deck like any other way; every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most); it covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture alike, and §13.2's harbour fixtures include a two-arm mole and a detached breakwater |
| no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch (NF-P5) — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes (VP2-4, VD3-6). The dry run of every chained edit computes that declaration — the set of enceintes whose strips any of its batches changes, each with "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. The edits that declare it today are: a tree-scoped re-derivation of a scope that holds wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator, for every wall strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside any re-traced run (§7.3 (b) 3, 7, 8); a carve, for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); and, as removals, the conversions `wallToWay` and `contractWall` (§4.11) and an enceinte's `delete` (§7.1's walls row). A lane still never crosses a strip | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse, against the batch's declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path, and §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall (MFP-9) | batch-local | touched footprints and wall bands |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every bridge within ± 10° of the channel normal, measured on the deck and on the way (GEO-17) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| reference integrity of records: every reference out of a touched record — people and relations included (a dependent's carer resolves) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
| identity: every fresh address differs from every live and tombstoned address, and no two live entities share a lineage key (§6.3) | batch-local | at mint, O(1) against the identity set |
| every length field carries a unit | batch-local | at schema write (and the lint of §2.1) |
| every stored geometry reference resolves (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` of every live entity), and no geometry carries a dead entity | stage-end, save | the kernel's reverse indexes (§3.10) |
| every gate joined to the network and to the plaza; the roads leaving each walled stage equal its gate count (its N main gates, plus a sealed town's harbour gate, §4.2 S3 (7)), and an outer enceinte's gates ≥ its arterial crossings; a coastal town's harbour is joined to its plaza through a gate and crosses a moat only on a deck (§4.2 S3 (11)) | stage-end (S7) | one graph search per enceinte |
| every gate and weld vertex lies on its trace, and stage 1's trace lies within 40 m of the stage-1 boundary except along an `on_enceinte` castle's shared stretch (the bailey's outer arc, §4.2 S3 (9)) (NF-P1) | stage-end (S5) | the trace's role rows and one distance pass per trace |
| every `baseLane` portal matches one S8 lane end on a boundary spine and vice versa, and no two portals on one spine lie within the portal gap (NF-P6) | stage-end (S8) | the `Seam` records against the lanes' end vertices |
| every quay reachable from the town without crossing a wall except at a gate (FTG-8) | stage-end (S7, S9) | one graph search |
| no branch re-joins its parent within k segments | stage-end (S5) | per growth stage |
| a sealed enclosure only when declared | stage-end (S7) | per trace |
| contours never cross a shore — a check of the clip construction, never an abort path | stage-end (S1) | F-CONTOUR's clip (§5.2) |
| names unique within their kind's scope; a new entity never renames an existing one, and an existing generated name changes only by one of §6.3's draw cases (§9) | stage-end (S13a) | per naming run |
| every requested feature (river through the core, N gates, a harbour when coastal, …) delivered, degraded or omitted, and reported with its tier (§5.1 principle 7) | stage-end | the report's `requested` list; acceptance counts omissions (§15.2) |
| containment complete: building ⊂ plot ⊂ block ⊂ district, 100 % | stage-end | per-batch containment counters summed, not a model walk |
| the canonical document validates against its schema (`Recipe.salts` keyed by rerollable concerns only, VD3-8); the recorded digest is the maintained Merkle root | save | at write |
| the decoded snapshot's recomputed Merkle root equals the recorded one, and every chunk's bytes hash to their `ChunkRef` (VD3-1) | load | §2.9 step 3's full recomputation, before the working state accepts its first edit |
| the replayed Merkle root equals the recorded one | load | the verification replay of §2.9 |
| a full recomputation of the Merkle root from its leaves equals the incrementally maintained root | CI-only | every B-CITY generation and every B-EDIT sequence (the digest-maintenance oracle) |
| digests equal across platforms, under time dilation, under district permutation (the derived-complete digest), and replay = session | CI-only | §6.5, §7.3 |

Label collisions are not a model invariant: placement is view data and its "0 collisions" is tested by B-ZOOM (§5.2
F-LABEL, §9). Hard invariants abort the batch, which rolls back to the previous arena version while its ladder
continues; soft ones (statistics bands) go to the report. CI counts hard violations per 1 000 cities and requires 0 (O3 b). **Cost rule:**
validating a batch costs O(touched faces × log n), never O(model); the per-edit validation time for a fixed scope must
be flat from TOWN to METROPOLIS within ± 20 % (a cost test, §13.2: TOWN → CITY at M2a, the editing core; TOWN → METROPOLIS at M2b, which measures METROPOLIS — it generates from M1, §16). *Pre-decided fallback:* an
invariant whose batch-local check breaks that flat cost moves to stage-end scope — it is still hard, only checked later
in the same stage. *Chose to make the NF-P5 exemption a declaration each edit's dry run computes — the enceintes whose
strips its chain rebuilds or removes — with a registry test for every operator that can write a strip, over an
enumerated list of exempt edit kinds, because a list drifts behind the operators (round 3's omitted the carve and
limited the water operator to re-traced runs), and an implementation that encodes it refuses valid canals and river
moves as violations (VD3-6).*

=== REPLACE §6.1 RNG and stream design ===

### 6.1 RNG and stream design

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

* **Engine:** xoshiro128\*\* per stream (four 32-bit words; period 2¹²⁸ − 1; fast in JS, no BigInt).
* **Keys are mixed from structured components, never from strings** (SCL-12, K-6 / R-1 kept). The **seed key** (128
  bits) is derived once from the seed by four 32-bit-lane finalisers with distinct salts (all `Math.imul`). When an
  entity is minted, its **entity key** — the mix of the seed key, its lineage hash, its layer and its island (§6.3) — is
  computed once and cached in the arena beside the lineage hash. Town-level draws — S0's feature draws, terrain noise
  and the per-document furniture (the compass and the emblem, §9.5) — use the **town root's** entity key, the seed key
  mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index 0), so they depend on the recipe
  alone and never on `docId`; paint programs and furniture pass the reserved stage id `STAGE_VIEW` (0xffff) to the one
  mixer (§14 `Rng.stream`; NF-D12). A **stream key** is one finaliser round over the entity
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
    derivation unit's reroll, so New random on a block changes that block's plots and nothing else; a user's reroll
    count is capped at 32 767 — the rerolls 32 768 and above are reserved for §13.2's faithfulness references
    (§7.3 item 7 (iv));
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll; its cap is declared per concern
    in the registry: 3 for every geometric ladder (tier 3), 8 for the naming re-draw of §9.6 (a repeated name re-draws
    on its own stream before taking a distinguishing suffix);
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town);
  - **salt** (COV-VG-VN-008) — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1),
    only for **rerollable** concerns: non-geometry concerns that some registered stage or paint program actually draws
    from — `naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass` and `naming.emblem` (read by
    the compass furniture program and the emblem generator, §9.5). Geometry concerns take no salt (their reroll is
    the regenerate action), so rerolling the trees or the names moves nothing else; the recipe's initial salts are
    keyed by the same registry-generated type and its schema refuses any other key (§2.9; VD3-8), so no recipe, link
    delta or log can give a geometry stream a salt. A town-wide `rerollLayer` sets the concern's town salt; an
    **ids-scoped** `rerollLayer` of `naming` (VD2-10) re-draws only the names of the entities it lists, each with the
    per-entity salt the event carries in place of the town salt. Every other draw of a name uses the town salt — for
    an entity with no predecessor — or, when the name's naming inputs changed, the salt its last draw used, which the
    name's naming record holds (§6.3 cases (1) and (4), §2.8; VD3-2). So a name's salt is never in the model digest:
    the event that set it holds it, and the naming record caches it. The registry marks a concern
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
  `epoch.transform`, `island.place`, `sewer`, `style.jitter`, `style.crowns`, `style.compass`, `render.instances`,
  `style.random` (the random-style draw of §8.2: creation index = the `setStyle` event's `seq`, attempt 0–2; N-26),
  `render.stampTiles` (the stamp-tile library of §8.10: non-rerollable, attempt cap 0; its stream is keyed by a
  constant entity key over (stamp-tile domain, decoration class index, spacing in cm, tile index), with `STAGE_VIEW`;
  read by `@plat/kernel`'s `poisson` builder in the tile worker and the generation worker; NR-6 — appended, so no
  other key moves).
  Registry notes: `alloc.district` also draws S7b's edge-green-or-orchard choice per district, and `island.place` the
  sky allocations' areas (§4.5 S7b (4)–(5)) — no concern of their own.
* **Distinctness:** a CI test asserts that every stream key and every lineage hash in a B-CITY city **and in a
  sky-island fixture** (two islands carrying districts, underground tunnels) is distinct (LC-29); the birthday bound is
  negligible (2¹²⁸ for stream keys; ≈ 3 × 10⁻¹⁰ per city of 10⁵ entities for the 64-bit lineage hashes, and §6.3's
  collision rule covers even that) — the test guards the encoder, not the arithmetic.
* **Draw helpers:** `u32`, `float01` (`(u32 >>> 8) · 2⁻²⁴`), `int(lo, hi)`, `bool(p)`, `normal()` (Irwin–Hall of 12 uniforms
  — no transcendental in the RNG layer, G-R12; the NG roof jitter's 6-uniform pseudo-normal is a style-time helper),
  `fuzzy(f)`, `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea).
* **Decoration** (LC-20, VIS-5, SCL-8; the instance model is §8.10's): trees, scatter, crowns, roof detail and hatch
  phase are keyed by the entity's **render key** — the low 64 bits of its entity key, which mixes the seed key with the
  lineage (§8.1 item 5; VD2-6) — and the **instance ordinal**, never by LOD band; the stamp tiles themselves are a
  session library built from a constant key (§8.10; NR-6); the stamp's offset and
  rotation come from the entity's `render.instances` stream, so a coarser band draws a subset of the finer band's
  instances and nothing re-scatters with zoom. Nothing is stored except the user's instance overrides (`instance`
  events, §7.1) and the current positions of positional overrides in the entity's override table, which a warp or a
  vertex move carries with the ground (§7.4; VK2-13).
* **Enter** (LC-28, COV-VG-WC1): Enter creates a **new document** with seed (seed + 1) mod 2³² (a `Seed` is a u32, §2.9) and the same recipe — params, intent,
  character, entry mode, table pins, packs — without edits, locks, assignments or salts; when the current document has
  edits the app first warns and offers to save it. *Chose a transparent successor (seed + 1) over deriving the next
  seed from the generator's stream state because seed + 1 survives any change of draw order and is readable in the
  link.* The references derive their successor from the stream state, which is reproducible within one build (VG's
  Enter chain replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but
  moves whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags
  from a non-seeded source — PLAT does neither.
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE §6.2 What a seed determines, and the model digest ===

### 6.2 What a seed determines, and the model digest

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe or a rebased state,
and the log is folded in order (§7.4). The recipe is §2.9's `Recipe`, which holds every model-affecting input that is
not an event: seed, rung, table pins, the setting packs by id, version and content hash (a selected user corpus
included), the full effective parameter delta with preferences folded in, intent, character, circumstance schedule,
entry mode and the rerollable concerns' salts. Tables, presets and styles a host supplies are not in the recipe: they
arrive as logged `editTable`, `editPreset` and `setStyle` events whose content is copied into the log (§6.5 (8), §7.6);
packs a later `adjust` adds are named by that event and belong to the document's pack set (§2.9). Nothing else reaches
the model (VD2-7):

* no wall clock — every output-affecting limit is an operation count (§5.1);
* no host text engine — label **placement** (S13b) is view data, derived per zoom stop from the model's names and
  `LabelEntity` records and the bundled fonts' own metrics (§9), and is not in the model digest;
* no viewing order — a stage may be lazy only under the laziness contract of §4.1 (its output for district D is a pure
  function of eager upstream state and D's own streams, reading no other district's lazy output), tested by deriving
  districts in random permutations (§6.5);
* no worker timing — results merge in lineage order;
* one boolean and offset engine per output version on every host (§6.5, D-14);
* no host code — a host provider's outputs are read from the document's `hostContent` block on replay (§6.5, §2.9);
* no installed pack — every pack of the document's pack set is resolved by content hash, from the document's `packs`
  block first and then from the shipped packs; a missing pack or a hash mismatch opens the document read-only (§2.9);
* no machine preference read at run time — user-global preferences are folded into the recipe when the document is
  created (§7.6).

Two machines or browsers produce identical model digests (O2 a); two renders of one model are pixel-identical at a given
backend, DPR and style version.

**The model digest is a Merkle digest over the eager model's content only** (SCL-1, LC-25, LC-2). The eager model is
everything the city LOD draws plus the town-level `Allocation` and `FieldBands` records (§4.5, §4.7); lazily derived
content (close-ups, people, stage-3 compositions) enters the digest when an edit materialises it. A CI
**derived-complete digest** additionally derives everything — every district, in three random orders, workers on and
off, on 50 METROPOLIS seeds — and requires identical results (§6.5).

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

* **Geometry is hashed once, by the kernel, per level** (GEO-1). Each arena keeps a digest per level over its level-n
  route — vertices, roles, face owners and kinds of level ≤ n, never arena slots — updated along each commit record's
  dirty set (§3.3); a finer level's Steiner vertices belong to that finer level's digest, so deriving L3 never changes
  the L2 digest. Per-level digests read each vertex's *current* birth level, so a promotion (§2.2 rule 3) moves a vertex
  into the coarser level's digest from that commit on, and kept finer content (§3.3) keeps its digest leaves through a
  coarser re-derivation (VK-18, VK-1). An entity's leaf takes the digests of the faces and chains it owns (its `FaceRef` and `ChainRef`
  resolved), so no coordinate is hashed twice. Coordinates enter in canonical order (a level-n ring from its
  lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's key, so deriving a finer level never
  re-orders a coarser digest's input; VK2-4); integers enter as 32-bit lanes, doubles as their IEEE-754 bit patterns (−0 normalised
  to +0; NaN refused by the schema), strings as UTF-8 — no text serialisation on the digest path, and no dependence on
  byte order.
* H128 is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with seed 0, so the digest's hash is specified exactly, as `H32` is
  (§13.6 (2); VS2-6).
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance, derivation records and naming records (their own digest, §2.8); `style`,
  `view`, `derived`, `hostContent` and telemetry (§2.9); label placement decisions (S13b, view data, §9); and close-ups
  that have never been edited — a close-up is a pure function of its district's committed state, its sub-seed,
  strategy and params, and enters the digest under `closeups` with its first edit (LC-18, §7.4).
* **Maintenance:** at every batch commit the kernel re-hashes the leaves of the records the batch touched and the nodes
  on their paths to the root — O(touched × depth) — never by serialising the model (§3.3). The tree it maintains is
  built by the generation run in a session and, for a loaded document, by the load's one full recomputation from the
  decoded snapshot (§2.9 step 3; VD3-1) — the snapshot stores only the root — so every edit, from the first one after
  opening, maintains a complete tree; at CITY the tree's leaves and nodes take ≈ 1 MB (≈ 30 000 entity leaves, ≈
  15 000 face-ring hashes and their interior nodes at 16 B each), inside §12.8's entity-store line. The canonical text
  serialisation (sorted keys, integer coordinates, floats as shortest round-trip strings) is used only for golden
  files and exports.
* *Measurement (M0 d, decided before any golden is signed):* digest maintenance ≤ 5 % of each batch's own time at CITY;
  root finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY —
  used by the CI oracle and by **every load** (§2.9 step 3); measured ≈ 31–34 ms at CITY and ≈ 95–101 ms at METROPOLIS
  on a synthetic, schema-shaped workload on the reference machine (`docs/validation/bench/fixall_det_r4_loaddigest.out`;
  VD3-1), PLAUSIBLE until M0 (d) times it inside the engine. Each bar has its own *pre-decided fallback*, and none moves
  a golden, because the root is a pure function of the leaves whenever it is computed (VD2-9):
  (i) *maintenance* over 5 % — leaves are re-hashed at the next coarser batch boundary (per district instead of per
  block and plot); the root at every stage end is unchanged;
  (ii) *root finalisation* over 5 ms — the layer nodes of the tree above (site, network, districts, …) stay maintained at
  every commit, and the root over them is finalised only when it is read: at save, at the end of a verification
  replay, at export, on an API digest request, and at each stage end of a CI golden run, where 5 ms per stage does not
  matter;
  (iii) *full recomputation* over 150 ms — the CI oracle recomputes, per run, one subtree per layer chosen by the run's
  seed (so every subtree is covered across nightly runs) and compares it with the maintained node; and the load's
  recomputation **leaves the edit path without leaving the load**: the load takes a copy-on-write checkpoint of the
  decoded state at `h₀` (§7.4's checkpoints, chunked per district, so it costs only the chunks edits later change),
  makes the working state editable at once, and recomputes the tree from the checkpoint in the generation worker
  between edits; each edit made before it finishes keeps its touched set (§7.4), and when it finishes the leaves those
  edits touched are re-hashed on the new tree in log order, which yields the working state's tree. Its root at `h₀` is
  compared with `model.digest` exactly as in step 3: a mismatch is a corrupt cache, the replay's state replaces the
  working state when it reaches the head, and the edits made meanwhile are re-applied to it in log order as "take the
  replayed town" re-applies them (§2.9 step 4), their fates recomputed and differences reported; nothing is reported
  verified before this root has matched. A New random made meanwhile computes its scope's content digests from the
  scope's own leaves (§5.1 (6)), which needs no tree. *Chose, as the fallback, an off-edit-path recomputation on a
  checkpoint over storing per-chunk digest nodes in the snapshot and re-hashing a chunk's leaves when an edit first
  touches it, because the digest tree is organised by layer and containment while chunks are organised by partition —
  the network layer's node alone spans every chunk that holds a way — so per-chunk nodes would require restructuring
  the tree by chunk, which §2.9's chunking fallback (block groups) would then change, whereas the checkpoint form
  changes neither the tree nor the file and still proves the working state before verification can succeed.*

=== REPLACE §6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

Every entity has two identities that the old design fused into one string (LC-1): an **address** that everything
points at (edits, locks, assignments, pins, labels, households, exports, the host), and a **lineage** that keys its
random streams. They start equal and separate only when an entity is re-derived.

* **Lineage key** = (arena key — layer and part, §2.2 —, derivation unit's lineage hash, stage, creation epoch,
  creation index, derivation unit's reroll[, dup]) and `lineageHash` = its 64-bit hash, cached in the arena. The **derivation unit** is
  the entity whose derivation run created this one, declared per stage in the registry: the town for S4 routes (in
  destination order) and S6 districts (in seed order); the growth stage for S5 ways (in acceptance order); the L1 cell
  a way split, for new cells (split ordinal); the cell for S8 blocks and lanes; the block for S10 plots and alleys; the
  plot for S11 buildings, yard parts and households; the household for people (member ordinal); S6's run for `Seam`
  records (creation index by the run's lowest-then-leftmost vertex); the S5c growth run, the district's S8 run (for
  `baseLane` portals) or the creating edit for portals; the creating edit event (its `seq`) for anything a user draws
  or builds; for any other kind (cells and junctions made by a growth commit,
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
    old address and the old generated name with its naming record (every reference re-binds to it; §7.3 decides which
    overrides move with it; names below) and keeps its own fresh lineage (its draws are the new ones: New random
    really re-rolls); a `carry` event records the lineage change, and
    the same batch re-owns the successor's faces and roles under the address (`setOwner`, `retypeEdges`, §3.4), so
    geometry and address move together;
  - an old entity with no successor becomes a **tombstone** in the archive (§2.8) whose `supersededBy` names the fresh
    entity covering its anchor point, if any; a fresh entity with no predecessor keeps its fresh address;
  - lifecycle events are written only for changes (existence, flags, a lineage change, supersession, re-parenting), so a
    re-derivation that reproduces its entities exactly leaves the model digest unchanged.
  *Chose to hand only the address to a successor, and to keep the lineage only for survivors, over carrying the lineage
  in both cases because New random must actually re-roll its scope, while references — a name, a lock, an assignment —
  must follow the building the user means.*
* **Names follow the address, and follow their inputs** (VD2-10, VD3-2). A generated name — its text and short form —
  is handed to a successor with the address, together with its naming record (§2.8: the naming slices its last draw
  consulted and the salt it used), as a lock or an assignment is, so the bridge a river edit re-sites, the street a New
  random re-cuts and the district a boundary edit regroups keep their names. S13a **draws** a name only
  (1) for an entity with no predecessor, with the town salt;
  (2) for every unedited name under a town-wide `rerollLayer(naming)`, with the new town salt;
  (3) for the entities an ids-scoped `rerollLayer` lists (§7.1), each with its per-entity salt; and
  (4) for an unedited generated name whose **naming inputs changed**: whenever S13a runs over the name's entity —
  after an `adjust` of the pack list (a pack added or removed, a corpus selected or deselected, §7.6), after an
  `editTable` or `editPreset` that changes a naming slice (§7.6's invalidation by slice finds exactly the names whose
  records cite it), in an upgrade's mapping (§7.5), and in any re-derivation whose scope reaches S13a — it compares
  every slice the name's naming record cites with the current effective tables, and a slice whose hash differs, or
  that no longer resolves (a deselected corpus, a removed row), re-draws the name with the salt its record holds. A
  row that names a corpus hashes that corpus's content hash with the row (§7.6), so selecting another corpus for a
  rule changes exactly the slices of the rows that name it, and exactly the names drawn through them re-draw. Only the
  inputs changed, so a name whose rows and corpora are unchanged is never touched, and **a carried name is kept
  exactly while its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that
  lost its gate) is not a naming input and renames nothing (§9.6).
  Every draw uses the entity's `naming` stream — keyed from its entity key (§6.1) with the salt of its case and the
  attempt — and writes the name's naming record anew. In case (3) the dry run gives each listed entity the salt one
  above the largest its name has been drawn with — the town salt and every earlier ids-scoped salt the log gave it —
  and a re-drawn name equal to the old one advances that salt once more, up to `reroll.maxAdvance` times, as §5.1 (6)
  does for geometry; the event stores the salts actually used, so a replay repeats neither the choice nor the
  advances. In case (4) the dry run lists every rename — old and new text side by side — in the edit's fate report
  with its other unprotected consequences, and the edit commits after the user confirms them (§7.3 item 4); a replay
  re-draws them identically, because the draw is a function of the stream, the salt and the inputs at that log
  position. A user-set name (`setAttr`) is an edited attribute, and a locked name path is a fixed input; neither is
  ever re-drawn. When carrying or a re-draw brings two equal names into one uniqueness scope (§9.6 — a district
  merge that joins two lanes of the same name), the entity whose address sorts later re-draws on its own stream, and
  the rename is listed in the edit's fate report. *Chose to hand the generated name on with the address over
  re-drawing a successor's name from its fresh lineage, because a name, like a lock, belongs to the thing the user
  means: re-drawing would rename a re-sited bridge or a re-cut street the user never asked to rename, while New random
  re-rolls geometry and names are re-rolled on request. Chose to re-draw exactly the unedited names whose recorded
  naming slices changed, over keeping every carried name through a naming-input edit and over re-drawing every name
  in the town, because choosing a street-name list or editing a naming rule must change the names that list or rule
  produced — otherwise the feature does nothing to the town on screen — and must leave every other name alone.*
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
| seam (NF-P6) | its two districts' addresses and its first chain's address | same pair and chain | — |
| portal | position | 1 m | portal kind (`baseLane`, growth, edit) |

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
   other concern's draws; changing a naming input re-draws only the names whose records cite it (case (4) above).
2. *Scoped rerolls* — New random on a scope changes nothing outside its effective scope (§7.3).
3. *Upstream changes* — a change to stage k's code or tables changes stage k's outputs and, through their lineage and
   inputs, what is derived from them: a declared cascade shift (§6.4, §13.3), never a silent one; stages upstream of k
   and independent of it stay byte-identical.
4. *Edited documents* — stability across such changes comes from carry-over by anchor and from migration (§7.5),
   never from stream keys.

*Measurement (M0 d and M1):* minting and matching cost within the budget above; B-EDIT fixtures for `drawBoundary`,
district merge and split, `outskirtToDistrict`, regenerate around a lock, a course-knot move that re-sites a bridge
(the bridge keeps its address and name), New random on a district (every matched successor keeps its name; only
entities without a predecessor draw one), a district merge that joins two equal lane names (the later address
re-draws, reported), the recycling case (a superseded, assigned building whose creation slot is reused), and the
naming-input cases (VD3-2): selecting a user-uploaded street-name corpus renames exactly the unedited names whose
records cite a row that named the corpus it replaces — every one listed in the fate report, every other name and
naming record byte-identical — and a bridge re-sited afterwards keeps its new name; an `editTable` of one naming
grammar row renames exactly the unedited names whose records cite that row; both hold in a document rebased from a
kept snapshot (no provenance) as in a fresh one — 0 duplicate ids and 0 silent re-binds (every reference resolves to
its successor or is reported).

=== REPLACE §6.4 Permalinks, version axes, retention and goldens ===

### 6.4 Permalinks, version axes, retention and goldens

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
* **Pack versions** — each setting pack by id, version and content hash in the recipe or in the `adjust` event that
  adds it (§2.9's pack set); the shipped packs belong to the output version like its tables, and a non-shipped pack's
  content travels in the document (NF-D2). A selected user corpus is a non-shipped pack, `user:<content hash>` (§2.9;
  VD2-8).
* **Style version** — style sheets; changes pixels, never the model digest; carried in a link for pixel identity.

**Permalinks** (LC-15, NF-D2). A link carries the canonical recipe, never a pointer to machine state:
* `?o=<output version>&s=<seed, base 36>&z=<rung>` when the recipe is the output version's defaults apart from seed and
  rung (watabou's one-line link kept);
* otherwise `&r=<base64url of the deflated CBOR recipe delta>` (params with preferences folded in, intent, character,
  entry mode, the rerollable concerns' salts — keyed and schema-checked as in `Recipe.salts`, §2.9; VD3-8 — table pins
  and packs that differ from the output version's shipped ones — packs by id, version and hash);
* `&l=<base64url of the deflated CBOR log>` when the town has a log (edits, locks, assignments, style edits, undo and
  redo — a blueprint's assignments are log events, §7.7), and `&st=<style id@version>` when the style is not the
  default.
* **A link is emitted only when it can rebuild the same town and picture on any machine**: every pack of the
  document's **pack set** — the base recipe's packs and every pack an `adjust` event in the log names, a corpus once
  selected and later deselected included (§2.9; VD3-3) — is shipped with the link's output version, `hostContent` is
  empty, the style sheet is shipped, and the whole URL fits in 2 000 characters. Otherwise the app says which condition
  failed — "this town uses the setting pack X, which is not built in", "this town uses your own name list X" (also
  when the list was deselected: its selection is still in the town's history), "this town uses content from the host
  program Y", "too many edits for a link" — and offers the `.plat` file, or `&doc=<ref>` when the host has configured
  a document resolver with `publish` (the `DocResolver` of §11.5); the document carries the pack content and the host
  outputs (§2.9), so the file reproduces the town without them. `preset=<id>` never appears: an edited preset
  elsewhere cannot change the town. *Chose to refuse such links over emitting them with the pack named by id and hash,
  because a link opened where the pack is missing could only fail or show another town, and the owner's rule is that a
  shared link never shows a different town; and chose to read the pack set rather than the base recipe, because a link
  that carries the log (`&l=`) replays every `adjust` in it.*
* **CI:** link → recipe → link identity, and the model digest built from a link equals the session's digest; plus a
  recipe naming a non-shipped pack, a town whose district names are drawn from a user-uploaded corpus selected after
  creation (a `user:<hash>` pack named only by an `adjust`, VD2-8, VD3-3), a town that selected such a corpus,
  deselected it, was saved and reloaded, and a document with a host provider's output: in each the link is refused,
  and the `.plat` file opened by a library that has neither the pack, the corpus nor the provider replays to the
  session's digest (in the select-then-deselect case because the corpus's content stayed in `packs` while the first
  `adjust` names it).

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

=== REPLACE §7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===

### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — which can be larger than the drawn area — is the effective scope, shown to the user before commit. For an edit
   that chains local operators (item 3) the effective scope is the union of every chained operator's scope. **The seam
   exception** (NF-P6): a district-scoped re-derivation's effective scope also includes its bounding ways' chains and
   `Corridor` records, the half-corridor strips on both sides and the junction wedges at the vertices its batches insert
   or remove on those spines — on a neighbour's side only II.1 (3)'s neighbour step, one `corridor_split` edge and the
   one kerb vertex it lands on (promoted) or adds —, the neighbouring cells, plots and footprints whose rings pass
   through those vertices (changed only by them), and the `Seam` records it is party to (§4.6, II.4).
2. **Fine levels (L1 cells and below): tree scoping.** Every unprotected finer entity under the effective scope is
   discarded and the refinement stages re-run for those faces — with the recorded inputs and unchanged rerolls for
   Regenerate (keep settings), with advanced rerolls for New random. The batch's `rederivesFrom` is the first stage the
   scope re-runs (§3.3), and every finer face an earlier stage made — and, for a carve or a re-carved reach, every finer
   face outside its clear region — is kept (§3.3). This is **sound by over-invalidation** and is the primary mechanism.
   **Shared-edge parts** (VK-1, VK2-2). S10's step (0) builds, eagerly and on both sides at once, the L3 parts along
   every L1 edge two face sets share without corridors — a wall trace's band, setback, glacis, tower and gatehouse
   parts inside its strips, and the 2 m margin bands along the settlement perimeter and along a reservation boundary
   two districts share (§4.7). Their stage rank is S10, so a re-derivation from S8, S9 or S10 clears the parts inside
   its scope. A scope that holds wall-strip faces, or faces bordering the settlement perimeter or such a shared
   reservation boundary, therefore **re-runs step (0) for its own side's parts** after its S8 and S9 (first, when it
   re-derives from S10), before its plots: `bandUnion` restricted to the scope's faces, its cross edges ending on the
   shared edge by attraction onto the vertices the other side's parts already placed there, and the scope's plot,
   alley and furlong lines ending on the re-laid band's inner edge. The other side is never written. So a Regenerate
   (keep settings) of a perimeter district lays the same backland part, and one of the hinterland (the S12 row) the
   same headland, at the same lattice points, and each is byte-identical to the one-click result when nothing upstream
   changed. *Measurement (M2a, B-EDIT):* Regenerate (keep settings) of a perimeter district, of a walled district and
   of the hinterland on B-CITY-lite seeds is byte-identical. *Pre-decided fallback* if a one-sided re-run ever differs
   from the eager two-sided batch: the re-run covers both sides of every shared stretch the scope borders — the other
   side's parts and the blocks that front them re-derive from S10 with the scope, declared in its effective scope —
   which is the eager batch itself, restricted to those stretches. *Chose a one-sided re-run attracted onto the other
   side's vertices over re-deriving both sides of every shared edge a scope touches, because the band on each side is
   a function of the shared edge alone, so the one-sided re-run reproduces it while keeping the neighbour's plots
   untouched, and the two-sided form stays available as the fallback.*
   S13a re-derives label candidates inside the scope and draws names only in §6.3's draw cases — for an entity with no
   predecessor, on a reroll, or for an unedited name whose naming inputs changed (VD3-2) — so a new entity never renames
   an existing one and a name whose naming inputs are unchanged is never re-drawn; S14 emits a `DisplayDelta` for the
   changed closure (§8.1); tiles meeting the dirty region are invalidated (§8.8); S13b, the view-side placement,
   re-decides only the placements whose boxes meet it (§9.2).
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
| S1 water (`drawWater`, a moved shore or coast vertex, `moveCourseKnot`, a `warp` from level 0, the terrain brush in `follow` mode) | (b) below, in §4.11's order: the new water, its crossings, routes and wall runs and the chain's footprint computed as data; one L1 batch that clears the footprint's partition content and re-lays the kept ways through their decks, re-traces the crossed wall runs and cuts the lesser ways; one L0 batch inserting the water through the vertices that batch prepared — both batches declaring the footprint as their clear region; then S5, S6, S7 and tree scoping chained, then F-REDERIVE | reaches and coasts outside the edit; every way, wall and district not named in (b); every finer face outside the chain's footprint, less the seam exception at its boundary (item 1) | Re-derive from S1 when the course leaves its drainage basin |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized, a deck re-sited or removed by S1's water operator) | re-route only the arterials whose corridors meet the edit region or whose destination or deck moved — each between its nearest pinned nodes (junctions of degree ≥ 3 or destination nodes) on either side of the region, over S3's lattice, with every deck a fixed graph edge | their endpoints; every spine outside the region | Re-derive from S3 when a destination is added or removed (gate count) |
| S5 (`drawWay` of a secondary, a deleted street, a secondary that now crosses water off a deck) | regrow only inside the affected L1 cells, from the proposals whose origins lie there, under S5c's legality (water only on a deck) | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`, land vacated or covered by a moved channel) | regroup and re-type only the districts touching the region, the grower restricted to their cells; then **re-lay the margin bands** (VK2-2): along every L1 edge without corridors whose sharing the regrouping changed — the moved stretch of the settlement perimeter, a reservation boundary two districts now share — S10's step (0) lays the 2 m band on both sides, and where a merge or a conversion ends the sharing it removes both parts; the blocks fronting such a stretch on either side (a neighbouring district's or the hinterland's included) re-derive from S10 and are part of the effective scope, shown in the dry run | every other district, and every block that fronts no changed stretch | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`, a river whose course crosses an enceinte moved) | re-trace only the run between the nearest unaffected towers on each side, with water gates where the course now crosses, re-cut the wall strips' setback and glacis lines along it, and re-derive the strip blocks' S10 step (0) | the rest of the trace, its gates and its strips | Re-derive from S7 when the enceinte kind or the gate count changes |
| a carve (a canal, moat or basin drawn by an edit; §4.11) | §4.11's way rule (pinned decks for arterials and sole connections, cuts for the rest) and footprint, in its declared batch order, the channel inserted with the footprint as its clear region (§3.3) | every way and every finer face outside the carve's footprint — the channel ⊕ (`attractCm` + its bank setback) united with every L1 cell that buffer meets and every L1 cell its way rule and its wall re-trace touch (§4.11; VP2-1, NP3-2), the same rules (b)'s footprint follows — less the seam exception at its boundary (item 1) | if the clear region cannot be kept, §3.3's pre-decided fallback: a declared town-wide re-derivation with the fate report |
| S8–S11 | per cell, block and plot (tree scope, item 2; wall-strip blocks and the scope's side of every shared margin band from S10's step (0)) | the other side of every shared edge | — |
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (item 2) | the districts' side of the perimeter | — |

   **(a) S1's terrain operator**, in order:
   1. *Stroke.* The stroke list is composited on the heightfield and clamped once (§7.2), with `locked` mode's mask.
   2. *Drainage, locally.* Priority-flood filling and flat resolution (§2.3) run on the stroke's bounding box dilated by
      8 cells, with the ring cells' levels fixed as spill heights; the box doubles until no ring cell's filled level
      changes (at worst the whole hydrology grid — S1's own hydrology cost, §12.4). The filled levels go into the drainage arrays
      (`flowDir`, `flatRank`, `flowAccum`) only, never into the stored heights, so a brushed hollow stays a hollow and
      drains to its spill point; accumulation is re-propagated downstream along D8 from the box. A new hollow deeper
      than the lake threshold is reported ("a hollow: draw water to make it a pond or a lake"), never turned into water.
      *Test (B-EDIT terrain fixtures):* the drainage arrays after the local re-run equal those of a re-run over the
      whole hydrology grid on the same heights. *Pre-decided fallback:* if they ever differ, the terrain operator
      re-runs drainage over the whole hydrology grid (frame and margin; S1's own cost, ≈ 16–17 ms at CITY, §2.3,
      §12.4; VK2-15) — output-neutral, since the whole-grid run is the reference.
   3. *Fields.* The field drivers that read terrain (elevation above the flood line, low and damp ground, §4.5) are
      re-evaluated on the dilated box, and blocks whose plot samples moved beyond τ re-derive exactly as for a field
      brush (§7.2) — the same result a reload computes from the drivers and the stroke list (§2.9).
   4. *Re-basing, exact.* Every entity standing on a changed sample is re-based by §2.6's per-entity datum step, the
      function S11 and S7 call: a wing's `baseCm = max(samples) + plinthCm` with its foundation skirt, a row footprint
      whose fall now exceeds `skirtMaxCm` re-split into stepped wings (F-SITEPLAN's first rung; its footprint face and
      address unchanged); towers and gates from the samples under their footprints; the wall's `base` profile (VK2-14):
      each knot whose sample changed takes the new value, and a trace vertex whose sample changed and carries no knot
      gains one (§2.2 rule 5); a bridge's `deckCm` and a pier's deck height from their bank elevations plus the
      clearance row. A user-edited `baseCm` is kept (fate *kept*, listed). *Chose exact re-basing of every entity whose
      samples changed over a tolerance, because the step costs microseconds per entity and a tolerance would let the
      model depart from §2.6's datum rule by that tolerance.*
   5. *Slopes.* Every way whose spine crosses changed cells re-samples `slopeP95`; a way now steeper than its class's
      limit is reported with an offer to re-route it (a `regenerate` on that way through S4's or S5's operator) — never
      re-routed silently.
   6. *Water.* In `follow` mode, (b) runs for every reach whose bed cells changed.

   **(b) S1's water operator** (LC-7, VD2-1, VK3-1). It runs in the order §4.11's carve uses — the finer structure the
   new water will meet is prepared first, then the water is inserted, then what the water displaced grows back —
   because a coarse insertion into finished fabric may meet finer geometry only at vertices that an earlier batch of
   the same edit placed for it (§3.3); both of its geometry batches declare the chain's footprint as their clear region,
   exactly as the carve's batches (1) and (2) declare theirs, so the preparation clears the footprint's partition
   content, structural finer edges inside it are kept unless the preparation re-lays or cuts them, and the coarse batch
   clears nothing (§3.3 rule 1).
   1. *The new water, as data.* Nothing is committed in this step; which geometry is authoritative depends on the
      trigger. **A moved course knot** (`moveCourseKnot`): the course between the moved knot's neighbouring knots is
      recomputed by S1's control-polyline construction through the knots (§4.2 S1 (3)), the moved knot fixed — an
      edited knot is implicitly pinned (§7.2), so every later re-trace keeps it — with width and depth from
      accumulation and the shores as the course buffered by its width; a course whose carve would exceed `carveMaxCm`
      returns F-EDIT with the nearest position along the drag that stays within it (F-RIVER, §5.2). **A `follow`
      terrain stroke**: each reach whose bed cells changed is re-traced by descent from the nearest pinned upstream
      point to the first downstream point where the new course meets the old one (or its outfall), with F-RIVER's
      re-trace rungs confined to the reach, and the knots on it are re-sampled at the control spacing with fresh
      ordinals — except an edited knot, which the new course must pass within half a control spacing of; a descent
      that does not is an F-EDIT conflict offering to discard that edit (§7.2). **`drawWater`**: the drawn rings (add
      rings unioned, subtract rings removed; a `line` buffered by its width), a drawn river's or canal's course being
      its line. **A moved shore or coast vertex, or a `warp` from level 0**: the shore chains as the move leaves them —
      the vertex move, or the stroke's field applied to the reach's L0 shore and coast vertices (the rest of the brush
      moves the land fabric at level 1 by §3.6's warp first) — with the course recomputed as their centreline and the
      reach's knots re-sampled from it; nothing is re-traced, because the user's shore is authoritative (§2.3). The
      **changed reach** is the stretch where the new shores differ from the old; an edited coast stretch has its sea
      side re-lowered and its contours clipped (F-CONTOUR); new shore segments take their bank class and kind by §4.2
      S1 (7).
   2. *Crossings, routes, wall runs and the footprint, as data.* `siteCrossings` (§4.2 S1 (5)) runs on the changed
      reach — its sites perpendicular to the new flow, their endpoints on the new banks — and each old deck on the
      reach is matched to its **successor site**, the new site nearest its old midpoint within the search band
      (`crossing.searchBandM`, default 120 m; §6.3's bridge row). The **kept ways** are the ways the new channel ⊕ its
      bank setback meets that are arterials, or the only connection of the streets beyond them to a gate or the plaza
      (§4.11's rule), or that crossed the changed reach on a deck; they get new routes from S4's router over S3's
      lattice between their nearest pinned nodes on either side, the new channel ⊕ `attractCm` impassable except across
      a deck, every site a candidate deck and a fixed graph edge, a way's own successor site preferred within the
      detour bound (≤ 1.4 × the old length); F-ROUTE's rungs decide here (§5.2), so a deck its "one bridge at extra
      cost" rung adds is sited now, before anything is inserted. A deck is built at every site a route uses, and the
      deck at an old deck's successor site takes the old bridge's address, name (§6.3) and assignments when its way
      uses it. A way whose old deck lay on the changed reach but which the new water no longer meets keeps its
      geometry; its deck, now over land, becomes an ordinary segment in (9). The run of every enceinte that the new or
      the old course crosses is re-traced as data between its nearest unaffected towers, with a water gate where the
      new course crosses and none at the old (S7's operator). **The footprint** is computed last, from these data and
      before any batch: `B` = the new channel and the changed old channel ⊕ (`attractCm` + the bank setback), united
      with every L1 cell that (i) `B` meets — the vacated land and the cells S6 re-assigns among them; (ii) borders a
      stretch (3) will cut, prune or replace, a kept way's replaced stretch included — so every cell S5 regrows in (5)
      — or is crossed by a kept way's new route; (iii) borders the old run of a re-traced wall or a setback or glacis
      line (3) removes with it, or meets the re-traced run ⊕ (half its band + its setback, and + its glacis on the
      field side), the cells its new strips will take (NP3-2). These are the rules of the carve's footprint (§4.11), so
      both operators clear, re-derive and check the same kind of region; the fate report lists exactly the protected
      entities inside it.
   3. *One L1 batch: the structure first.* It **declares the footprint as its `KernelTx.clearRegion` and clears it by
      §3.3 rule 1** — every finer partition face whose interior meets it, whole; structural finer edges only as this
      batch re-lays or cuts them (VK3-1). It inserts each kept way's new route and removes the stretch it replaces — so
      every way stays one connected chain (§3.10's role consistency) — placing on the route, at the new bank points,
      the two `deck_end` vertices of each deck it crosses (under a fresh `Bridge`, to which §6.3's matching hands the
      old bridge's address when (4) removes the old span); replaces each crossed wall run by its re-traced run, with the
      two bank vertices of its water gate carrying `('anchor', the enceinte, k)` at the enceinte's next free anchor
      ordinals (§2.2 rule 7; VK3-2) — the `Gate` record (7) builds names them — and removes the old run together with
      its strips' setback and glacis lines (the new lines are cut in (7), once the banks exist); cuts every other way
      that the new channel ⊕ its bank setback meets, and every way other than a kept way at a gate that the re-traced
      run's new strips will meet (NP3-2), by F-REDERIVE's way rung (§5.2): the stretch inside removed, each land part
      kept as a way (the part keeping the old anchor keeps the address), a stub shorter than the district's minimum
      block width removed; and it splits every other L1 edge the new banks will cross that is no way — a
      settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis line outside a
      re-traced run — at its two bank points, each carrying an `anchor` row at its chain entity's next free ordinal (on
      a district boundary the lower-id district whose boundary row the edge carries, on the settlement perimeter the
      hinterland pseudo-district; §2.2 rule 7, VK3-2), with the stretch between them removed (§3.3 rule 2). Every
      stretch it removes is addressed by its two end vertices on its chain, never by a whole chain (§3.4). What the
      chain may not move — a locked or pinned way, wall or finer entity in the new channel ⊕ setback or in a new strip,
      or a reservation there — returns to the dry run as F-EDIT (lock > drawn geometry), with Re-derive from S3
      offered for a reservation.
   4. *One L0 batch: the water.* It declares the same footprint as its clear region and clears nothing (§3.3 rule 1).
      It removes the changed reach's old shore chains — an edge that keeps only finer roles once its `shore` or `bank`
      role leaves it (a quay's or a riverside wall's shared stretch) takes the level of those roles by §2.2 rule 3's
      demotion (VK3-3) — and inserts the new ones through the vertices (3) prepared: the `deck_end`, water-gate and
      `anchor` bank vertices, listed in `KernelTx.prepared` and promoted to L0 (§3.3, §3.6), each deck's span between
      its promoted bank vertices becoming its deck span with the structural `deck` role, in S1 (5)'s form — the way's
      own edge between them carrying `deck` beside `way`, so no L0 edge crosses the water (§2.2 rule 7) — and each old
      deck's `Bridge` address passing to its successor (§6.3). The new shores split the finer faces they cross, which
      keep their owners until (6)–(8) re-own them (§3.3 rule 3). The batch meets no finer edge other than the prepared
      vertices, because (3) cleared every partition face the footprint meets and re-laid or cut every structural edge
      the new water ⊕ `attractCm` reaches; tree scoping (8) and F-REDERIVE (9) act only inside the footprint, and item
      7 (ii) checks byte identity outside it less the seam exception (item 1). The old decks' bank vertices on the
      changed reach leave with their shores (their spans left with the kept ways' replaced stretches in (3)), except
      the deck of a way the new water no longer meets, which (9) turns into an ordinary segment.
   5. *S5.* Lesser connections re-grow inside the L1 cells whose ways (3) cut, from the proposals whose origins lie
      there, under S5c's legality (water only on a deck).
   6. *S6.* Each land face of the footprint that (4) split from a pre-edit L1 cell takes the district — or the
      hinterland, or the `wall_strip` typing — of the pre-edit cell that held the larger part of its area; the rule
      that a cell merged across a removed boundary stretch joins the district holding its larger part applies only
      where a boundary stretch was removed on land (a cut way), where no boundary re-separates the parts (NP3-3). Land
      the channel vacated joins the district across its longest boundary unless a wall or an arterial separates them
      (then the next longest; ties by id), or the hinterland; every L1 face whose L0 parent is now water leaves the
      district face set it inherited when (4) split it (§2.2 rule 4) and belongs to the water body's faces; the
      settlement perimeter and the district boundaries are re-typed on the L1 edges now between their face sets, and
      the margin bands follow the S6 row above (VK2-2).
   7. *S7.* S7's operator cuts the wall strips' setback and glacis lines along each re-traced run, closing them on the
      new banks, and builds its furniture — towers at its vertices, the water gate's `Gate` record at the new crossing,
      naming the two anchored bank vertices (3) placed, and none at the old; the strip blocks' band parts come from
      S10's step (0) in (8).
   8. *Tree scoping.* S8–S12b re-derive every cell of the footprint — the vacated land among them — by item 2,
      shared-edge parts included (the strips (3) and (7) changed re-run step (0), which the chain declares for NF-P5,
      §5.3), with succession by anchor for what they reproduce and fresh addresses for new faces (§6.3); the height
      samples the carve changed run (a) 2–4 — local drainage, the terrain-reading fields and exact re-basing — on what
      stands outside the footprint.
   9. *F-REDERIVE* (§5.2): a deck left over land becomes an ordinary segment of its way and its `Bridge` a tombstone —
      its `deck_end` vertices demoted to the way's level (§2.2 rule 3; VK3-3) — and every re-route, cut, pruned stub,
      succession and demolition of the chain is listed in the fate report with its lifecycle event.
   The invariant "a way crosses water only on a deck, and a deck only over water" (§5.3) is evaluated once over the
   chain's touched faces after (9) and holds there; the kernel's own invariants hold at every batch. *Chose to re-lay
   every kept way through its sited deck and every crossed wall run through its water gate before the water is
   inserted, over digging the channel first and repairing the crossings afterwards, because a coarse insertion may meet
   finer geometry only where the same edit prepared it (§3.3): digging first either fails at every street the river
   crosses or, clearing them, removes the very crossings the kept arterials need. Chose decks at the sites
   `siteCrossings` picks, with the kept ways routed to them, over the carve's decks at each way's existing crossing,
   because a river's crossings are chosen by its narrowest reaches exactly as at generation, so a moved river's bridges
   stand where a regenerated river's would. Chose to have the L1 batch declare and clear the chain's whole footprint
   (VK3-1), over clearing only the cells whose L1 edges it changes, because a pond drawn inside a block, a bank widened
   into its riverside blocks or a meander moved inside one hinterland cell changes no L1 edge there, so the L0 batch
   would meet their kerbs, plot lines and field bounds away from any prepared vertex and every such edit would fall
   back to a town-wide re-derivation.*
   An edit with no local operator (a change of seed, rung, water setting or side, walls on or off, castle
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
   re-based or demolished — with their lifecycle events; and every edit's report lists the generated names it re-draws
   because their naming inputs changed (§6.3 case (4); VD3-2), old and new text side by side, which the user confirms
   before the edit commits, exactly as a fate list.
5. **Recorded inputs** (LC-12, NF-D3). Each plot, block and building persists a **derivation record** (§2.8) of the
   inputs of its last derivation — field samples, band, context and parameter digests, table slices — and every
   generated name its **naming record** (§2.8; VD3-2). Regenerate (keep settings) re-derives those kinds with their
   recorded inputs, so it reproduces an untouched entity byte-identically even after an epoch or a field edit elsewhere
   moved the current inputs; re-deriving with the current inputs is Adjust. Kinds without a derivation record (ways,
   districts, walls) re-derive from their current upstream state, which only an explicit edit or an epoch changes; the
   provenance rebuilt by their last derivation or by the verification replay holds what they read (§2.8), and their
   names keep their naming records.
6. **The dependency graph is the audit.** `Provenance.deps` (every entity records what it read) serves (a) as the audit
   of item 7 and (b) as an optimisation for Adjust — invalidating exactly the closure of a changed parameter or table
   slice — only where the oracle has proven that stage's declarations complete; elsewhere tree scoping applies.
7. **The oracle** (GEO-11, LC-10, IMP-7; run on every B-EDIT sequence):
   (i) **replay = session** — replaying base and log in log order gives the session's model digest, on sequences that
   mix drawn features with later attribute edits, epochs, rebases, undo and redo; among them the **naming-collision
   fixture** (N-1): two scoped regenerations in different districts whose new ways draw the same street name, followed
   by a `moveLabel` on the second way's label and a `setAttr(name)` on the first — the replay's names, `LabelEntity`
   records and digest equal the session's — and a corpus selection and a naming-row edit with their case-(4) renames
   (§6.3);
   (ii) **outside the scope, byte-identical** — every entity outside the effective scope keeps its leaf digest; the
   oracle **computes** the seam exception (item 1) from the batches' commit records — changed faces per level, the
   portal roles added or removed — and checks each excepted neighbour cell, plot and footprint equal to its prior ring
   after removing those vertices (NF-P6);
   (iii) **content** — content and relation digests outside the scope are unchanged;
   (iv) **faithfulness** — Regenerate (keep settings) is checked by byte identity; New random is checked per regenerated
   scope against K = 50 independent from-scratch generations of the same scope (same context, rerolls 32 768 + i,
   i = 0 … K − 1): for each of its median plot area, frontage width, density and attached share, the **rank** of the
   regenerated value among the K generations — the references below it plus a uniform draw from 0 … t over the t
   references equal to it, drawn from the campaign's own stream (exactly uniform on 0…K for a perfect regenerator,
   whatever K, ties included); a campaign of n = 800 regenerated scopes per nightly run — 400 block, 400 district (§13.2; VS2-9) — fails when a χ² test on
   the 10-bin rank histogram (expected counts proportional to the ranks each bin holds) rejects at family-wise
   p < 0.01, Holm over the four statistics — calibrated (executed: 1.0–1.4 % false campaign failures) with ≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×),
   too-loose (1.5 ×) and biased (+0.25 sd) regeneration with the four statistics correlated at ρ = 0.8 (≥ 99.3 % at
   ρ = 1; 400 scopes caught only 92–95 %); without the
   randomised tie-break a tied statistic fails every perfect campaign
   (`docs/validation/bench/fixall_verify_scope_o9c_rank.out`, `fixall_scope_r2_o9c_power.out`, `fixall_scope_r3_o9c_n800.out`; IMP-7, restated in §15.2
   O9 (c));
   (v) **coarse edits** (LC-7, VD2-1, VK3-1) — course-knot, drawn-water, moved-shore, level-0 warp and terrain-brush
   sequences in both water modes end with 0 decks over land, 0 off-deck crossings, 0 wings off §2.6's datum rule, 0
   footprints in water, every arterial at its destinations or reported `unserved`, and every bridge that still has a
   site within the band keeping its address and name; a river move across a street grid commits (no `E_LEVEL` or
   `E_KEPT`) with its decks on the kept ways and its cuts on the others, every face outside (b)'s footprint
   byte-identical; **a pond drawn inside a block, and a river bank widened into its riverside blocks between two
   bridges, each commit with no `E_LEVEL` or `E_KEPT` and every face outside the footprint byte-identical** (VK3-1); a
   river moved across a wall between two towers commits likewise, every indexed anchor role unique per ordinal and 0
   NF-P5 violations (NP3-2, VK3-2, VD3-6); a river moved across the settlement perimeter leaves 0 district faces outside
   the perimeter (NP3-3); a course-knot move replayed after an upgrade that changed S1's knot count binds its knot by
   address and ordinal or is reported orphaned, never bound to another body's knot (VK2-12);
   (vi) **shared-edge identity** (VK2-2) — Regenerate (keep settings) of a perimeter district, of a walled district and
   of the hinterland is byte-identical to the one-click result; after `outskirtToDistrict`, `drawBoundary` and a
   district merge, every L1 edge two face sets share without corridors carries a margin band on both sides and no
   other edge carries one (item 3's S6 row).

=== REPLACE §7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===

### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

**Replay semantics** (LC-10). The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay. Nothing is hoisted, and epochs, rebases, upgrades, undo and
redo are events like any other.

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it | inverse event | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query is resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it, and it is never re-drawn; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record) | attribute names are schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | whole-step validation (§3.6): moved edges ≥ `minEdge` and against swept triangles, one vertex per lattice point, the clearance invariant, global deterministic halving; vertices on fixed coarser routes slide; vertices of locked or pinned entities are held; kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); point-anchored records and buildings' stored wing rings move with their host faces and everything the move carried is re-based ("Warp and what stands on the ground", below); a move of water hands the moved shores to S1's water operator (§7.3 (b)) | undo record (moved vertices, re-derived faces, promoted vertices' former birth levels, the former points of displaced records, the former wing rings and the former bases of re-based entities) | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot (VK2-12) | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at` and `to` | S1's water operator (§7.3 (b)): the course through the knots between the moved knot's neighbours, the moved knot kept by every later re-trace | undo record (the replaced scope of the whole chain and the knot's former position) | binds on replay, after the water body's address is carried (§6.3), (1) the knot with that ordinal if it lies within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)) —, (2) else the nearest knot of that body within the radius, ties by ordinal, (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record (the replaced scope of the whole chain) | the same geometry replays at its log position under the new version |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. abandon, decay, ruin, clear, rebuild) | context actions | lifecycle events with cause | log | structural ops on the plat (§3.4) with dependants re-derived; `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8); a split or join of a chain that carries a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey`, which gives each part a cut knot carrying the sampled value and drops a join knot only where the joined profile is unchanged (§2.2 rule 5, §3.4), and the event writes both records' returned profiles (VK2-8) | undo record (members resurrect, tombstones return to live; both records' former profiles) | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, the absolute rerolls used, confirmed fates | §7.3; New random's content check (§5.1 (6)); an `adjust` of the pack list, and any re-derivation whose scope reaches S13a, re-draws the unedited names whose naming records cite a changed slice (§6.3 case (4); VD3-2), the renames listed in the fate report for confirmation | undo record: the faces, entities (their names and naming records included), lifecycle events and tombstones of the effective scope, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates are recomputed and compared |
| assign / unassign | assignment dialog / host API | `assignment` fields, `flags.assigned` | log; blueprint assignments at positions 0…k | the claims-first re-derivation of its scope (§7.7) | undo record | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond the tolerance re-derive (§7.2); terrain strokes: S1's terrain operator — local drainage, re-basing of everything on the changed ground, the terrain-reading drivers, and in `follow` mode the water operator (§7.3 (a)) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region | strokes are geometry and replay |
| editTable / editPreset / setStyle | tables editor, presets and style dialogs | the override layer (§7.6) | log: row operations by key, with the base row's hash | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice re-draws exactly the unedited names whose naming records cite it (§6.3 case (4); VD3-2), listed in the dry run's report for confirmation; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations, and the re-derived entities — the renamed names with their former naming records among them — restored from the undo record, never re-drawn | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession recorded after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10; NF-D11) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — the rerollable concerns of §6.1, generated from the concern registry; names also on chosen entities (`ids`, VD2-10) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts the event carries | log (absolute salts; with `ids`, the salts actually used after §6.3's unchanged-name advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names (`ids`), uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for a naming reroll the previous names, from the undo record | replays |
| revert (reset to generated; COV-MFCG-L08) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events are applied in reverse log order at the revert's position; edits to other entities stay | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position (§9.2; N-28) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b's placement (§9); the `LabelEntity` exists at the event's log position in the session and on replay, because S13a runs per event (§7.3 item 2) | inverse | follows the label's target address; an unmapped target → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person (LC-16) | an explicit action or an edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2; LC-18) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position, and reports orphans | undo record | replays |
| epoch (LC-11) | `grow(doc, inputs)` (§4.11) or an entry of the circumstance schedule | the derived `EpochRecord`; lifecycle events with cause | log | the incremental path of §4.11 at its log position | undo record: the faces and entities the epoch replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase (LC-13) | keeping the saved town on a mismatch; keeping an old model; Rebuild around my drawings; editing a frozen import | the document's base | the base state and the event, whose `at` names the log head the state materialises — `h₀` when the saved town is kept after edits made during load verification (§2.9 step 4); the events before `at` stay in the log (§2.9) | replay starts from the rebased state and folds the events after `at`; the `rebase` event itself is a no-op for a client whose base it already is. **On another client of a bridged document** (VD3-4): a `keptSnapshot` rebase whose `at` lies behind the client's head and whose `stateDigest` differs from the client's root at `at` installs the snapshot at `at` from the `doc.load` bytes the client kept and re-applies the events after `at` through the fold (fates recomputed and differences reported, undo records rebuilt; §2.9 step 4); one whose `stateDigest` equals that root changes nothing; any other rebase behind the head (a hand-built log) is a reported no-op; a load whose log already holds a `keptSnapshot` rebase at `model.seq` with `stateDigest = model.digest` takes `model` as that base without asking | the previous base (NF-D4): when it is the recipe — always kept in a rebased base — the undo restores it and replays the kept log; when it is an earlier rebased state, that state is the undo record, held in the undo section under its cap; past the cap, or when the replay would need an output version outside the browser's window, the undo is withdrawn with a notice (the CLI replays any version, §6.4); a `redo` of the rebase re-installs the rebased state, which the undo keeps in the undo section under the same cap (past it the redo is withdrawn with a notice) | the rebased state migrates by the schema chain; it is not seed-reproducible |
| upgrade (LC-14) | explicit, after the diff (§7.5) | the document's output version | log | §7.5; the mapping hands names on with addresses and re-draws the unedited names whose naming slices the new tables changed (§6.3 case (4)), listed in the diff | the undo record is `upgrade.from` (NF-D4): undo replays base and log before the upgrade under that output version — exactly the pre-upgrade digest; in the session the checkpoint taken before the upgrade makes it instant; outside the browser's version window the undo is withdrawn there with the CLI command shown | — |
| undo / redo (NF-D1) | ctrl / cmd+Z, ctrl / cmd+shift+Z, the API's `undo(h)` / `redo(h)`, a host's `doc.apply` | the live or undone status of each event, derived from the log | log (`of`) | after the independence check below: `undo` restores its target's scope from the target's undo record; `redo` re-applies the target at the head, its lifecycle events citing the target's `seq` and its minted addresses the target's own | an `undo` is undone by a `redo`, a `redo` by an `undo` (exact inverses) | replays; a target's record is rebuilt under the new version by the replay |
| host provider output (LC-31) | a host-registered provider's answer, after the double-run check (§6.5) | the document's `hostContent` block | `hostContent`, keyed by (provider id, version, input hash) | read from `hostContent` on replay, never re-requested | removed with the event that first requested it | replays without the host |

**Undo and redo are events** (SCL-5, NF-D1). Undo never removes an event from a shared log: a host stores the log and
it only grows (§11.3), so `{ t: 'undo'; of }` and `{ t: 'redo'; of }` are appended at the head like every other event
and applied through the same fold, and every client, and every replay, applies them identically.
* **Sessions** (VD2-4). A session is an authoring identity **per document and author**, not per app start.
  `@plat/api` mints one — a 128-bit random value in base 32, outside the model packages, so no model code reads it —
  the first time an author edits a document, and reuses it on every later open: an unshared document stores its
  session in its view state (`view.keys['session']`, outside every digest, saved with the file, §2.9), so a reload, or
  reopening the file next week, continues the same undo and redo stacks, and a file made without one (by the CLI or
  from a link) mints it on first edit. A client attached to a host bridge takes the session the host assigns in
  `doc.load` (§11.3) — the host keeps one per user and document — and never writes the view key. The session enters
  the log only as `EditBase.session`; the fold never reads it (an `undo` names its target by `of`), so sessions decide
  which event the undo key picks, never the model. *Chose a session per document and author, stored with an unshared
  document and assigned by the host for a shared one, over a session per app start, because undo must survive a
  reload, and a fresh session per start would leave the previous start's events undoable only through an owner's
  explicit `undo(h, of)`.*
* **Targets.** Each session has its own stacks (`EditBase.session`). `undo` targets the session's latest **live**
  event — an event is live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as one step
  and `of` names its first event. `redo` targets the session's latest undo whose target is still undone; a new event
  from the session clears its redo stack. An unshared document has one stored session, so undo there is linear and
  continues across reloads. A session with the `owner` role — the app's role for an unshared document — may name any
  live event (`undo(h, of)`, §11.2), which is how events of an earlier session (a file that was once shared) are undone.
* **Application.** Every committed event keeps an **undo record**: the inverse event when one is exact, otherwise the
  faces, entity records, lifecycle events and tombstones its effective scope replaced, the former birth levels of the
  vertices it promoted (§2.2 rule 3), and the list of addresses it
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
* **Truncation, in unshared documents only** (VD2-3). When an unshared document's `undo` targets the event immediately
  before it, the engine may drop both from the log and hold the target on the session's redo stack. A redo then
  re-appends the target with its original `seq` **and advances `nextSeq` by one** — the `seq` the kept log's `redo`
  event would have spent — so every later event, and every address a later user-created entity mints from its event's
  `seq` (§6.3), is the same in both logs. The canonical `nextSeq` (§2.9) never moves back. Because an `undo` removes
  its target's lifecycle entries and tombstones and a `redo` re-inserts them, both citing the target's `seq` (§2.8),
  the lifecycle block, the archive and the model digest of the truncated log equal those of the log with the pair
  kept. A truncation that drops the last event naming a non-shipped pack drops that pack from the pack set, and its
  content leaves `packs` at the next save (§2.9; VD3-3). A B-EDIT property test over random sequences (§6.5 (9)) folds
  each both ways — among them a redo followed by a user-created entity — and requires equal model digests and equal
  addresses. A document attached to a host bridge never truncates.
* **Checkpoints.** The engine takes a copy-on-write checkpoint (the arenas are chunked per district, so a checkpoint
  costs only the chunks changed since the previous one) whenever the replay cost accumulated since the last checkpoint
  passes 80 ms at the session's rung, and before every epoch, rebase and upgrade — so any replay from a checkpoint stays
  ≤ 100 ms; a load that takes §6.2 (iii)'s off-edit-path digest recomputation also takes one at `h₀`. *Measurement
  (M2a):* undo of a CITY district regeneration ≤ 30 ms; undo memory ≤ 25 % of the model's working set after 100 edits;
  (M3a) the host-and-three-clients convergence test of §11.3 with interleaved undo and redo from every client.
  *Pre-decided fallback:* the saved undo section shrinks to 16 events and checkpoints are taken every 40 ms of replay
  cost.
* The **enumeration test** checks that every EditEvent kind — `undo` and `redo` included — has an exact inverse or an
  undo record (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

*Chose undo and redo as logged events with per-session stacks and a conservative independence check over removing the
last event from the log, because a host-stored log only grows and every client must fold the same events; removal
survives only as the unshared-document truncation, which leaves the model digest unchanged.*

**Warp and what stands on the ground** (VK2-13). A warp and a `moveVertex` move arena vertices (§3.6). Four kinds of
record hold a world point instead of a vertex, and move with the ground they stand on: `Pin.point` (its host is
`Pin.host`'s faces), `Decoration.point` (the L3 face that contains it), the current position of a positional
`instance` override — a `move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` —
held in the model's override table of its entity (§8.10), and a pinned label's `Placement` anchor and spine (its
target's faces, or its target's corridor for a way, §9.1). After the kernel's commit the edit layer takes every such
record whose host face has a moved vertex (the commit record's `moved` list, §3.3) and computes its new point from the
move itself: the point's mean-value coordinates in its host face's outer ring before the move, applied to the ring
after it — `+ − × ÷` and `sqrt` only (§6.5), rounded to the lattice. A record whose new point lies outside its host
face, or nearer its boundary than the record's clearance (a pin's footprint radius, `Decoration.keepClearCm`, half an
instance spacing, a label's box), is **re-seated** at the nearest lattice point of the host face inset by that
clearance, ties by (y, x); if that inset is empty, a generated pin or decoration is re-placed by its placement rule in
its host (§4.7 S11, §4.9) and a user's record — an override, a pinned label, a user-placed or edited pin — is
orphaned and reported. A record of a locked or pinned entity is held like a held vertex: the warp's whole-step
validation requires it to stay inside its host face at its clearance and halves the step otherwise (§3.6), and the dry
run lists it. **A building's stored wing rings and its slot hint** (§2.6) are carried with its footprint face in the
same pass, by §2.6's wing-carrying rule (NP3-1): a wing vertex at a footprint vertex follows that vertex, every other
wing vertex follows its mean-value coordinates in the footprint's outer ring, rounded to the lattice, and a wing that
leaves its declared shape class changes class as §2.6 states. Every entity whose footprint, trace, deck or pier the
move carried is re-based by §2.6's datum step on the ground it now stands on (§7.3 (a) 4), a user-edited base kept.
The undo record keeps every former point, wing ring and base, and a replay recomputes the same points and rings
because it replays the same operation on the same geometry. Stamp and grid instances are world-anchored patterns and
are not displaced: the host's new boundary only decides which of them survive (§8.10). *Test (B-EDIT):* a warp that
drags a square keeps its fountain inside the square at the same mean-value coordinates; a warp over a yard keeps a
user-moved tree in that yard; a pinned pin at the edge of a warped square halves the step; a warp and a `moveVertex`
over a built block leave every building's wings subdividing its moved footprint (§2.6's test); replay reproduces all
four. *Chose to carry point records by mean-value coordinates in their host face over leaving them at their world
positions or re-placing every one by its rule, because a fountain, a shrine or a tree the user moved stands on the
ground the user dragged, and re-placing would move generated furniture that the warp did not need to move; stamps
stay world-anchored because they are a fill pattern, not objects.*

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
| draw walls | `drawWall` | S7 re-traces the run or adds an enceinte and cuts its wall strips; F-REDERIVE on plots in the new wall strips |
| draw bridges | `drawWay` (class `bridge`) across a river face | a `Bridge` on §4.2 S1 (5)'s perpendicular deck where the drawn line crosses the channel's centreline — its two `deck_end` vertices placed first by one L0 batch of two shore splits, nothing cleared (NP3-4) — then S4's operator lays the drawn way's ends through them with the deck pinned; §5.3's crossing invariant holds |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator (§7.3 (b)): the moved coast taken as the new water (no re-trace, §2.3) with its contours clipped, any deck on it re-sited, the footprint's partition content cleared, the kept ways re-laid through their decks and the others cut before the water is inserted, S5 and S6 for the cut cells and the vacated land; F-REDERIVE |

=== REPLACE §7.6 The override layer and editable tables (G-P12; owner amendment 5) ===

### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r4); earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

`effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events`, each
layer a sparse delta with provenance; setting packs are recorded in the recipe, or in the `adjust` that adds them, by
id, version and content hash (§2.9); the UI shows which layer set a value and the report lists auto-resolved values
with reasons (O16 a–b).

* **Preferences are folded in at creation** (LC-15). When a document is created, the packs, the preset, the user's
  global preferences and any document overrides are copied into the recipe's `params` delta, shown in the panel as "from your
  preferences". A later change to the machine's preferences never changes an existing document; applying them is the
  explicit action "apply my current preferences", logged as one `adjust` per changed parameter with its locality class.
* **Pack content travels with the document** (NF-D2, VD3-3). A pack is data — grammars, corpora, ancestries,
  religions, appearance templates, roster row operations, style hints (§10.4) — and much of it (a grammar, a corpus)
  is not a parameter that folds into `params`. So the content of every pack of the document's **pack set** that is not
  in the output version's shipped set is copied into the document's `packs` block, with its id, version, author and
  content hash — when the document is created for the recipe's packs, and when an `adjust` adds one. Adding or
  removing a pack in an existing document is an `adjust` of the recipe's pack list (`param: 'packs'`) — a Re-derive
  from the pack's first reader stage, with the fate report (§7.1) — and a pack's content stays in `packs` while any
  event of the log names it, a removal included (§2.9's pack set). When the added or removed pack changes a naming
  slice — a grammar row, or which corpus a culture or ancestry row names — S13a re-draws exactly the unedited names
  whose naming records cite a changed slice (§6.3 case (4); VD3-2), and the fate report lists the renames for
  confirmation.
* **A user-uploaded corpus is such a pack** (VD2-8, VD3-2, VD3-3): selecting it wherever a corpus is chosen (§10.4) is
  that `adjust`, which enters it in the pack list as `user:<content hash>` with `shipped: false` and its content in
  `packs` (§2.9). Its content is the corpus and the keyed row operation (`RowOp`, §7.1) that makes the culture or
  ancestry row the user chose name it instead of the corpus it replaces (§10.4), so the binding travels in the pack's
  content and hash, and the pack layer applies it like any pack's rows: exactly the names drawn through that row
  re-draw from the new corpus and every other name stays (§6.3 case (4)); deselecting it is a second `adjust` that
  removes the entry the same way, its content kept saved while the first names it. A replay resolves every pack of the pack set by hash from
  the document first (§2.9), so it never depends on what is installed; a link is emitted only when every pack of the
  pack set is shipped, so never for a town whose history selects a user corpus (§6.4).
* **Tables have keyed rows** (LC-22). Every rule table — size ladder, stage regimes, way widths, granularity, site
  plans, class rules and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency
  graph, S0's feature probabilities, the work-limit coefficients (§5.1 (5)) — is versioned JSON: a map from a stable row
  key to a row whose cells carry `{value, unit, provenance: {source, date, note}, calibratable}`. Each table's schema
  declares its **readers** (the stages that consult it) and its **slice kinds** (row, weights, bracket, thresholds,
  match — §2.8). A naming row that names a corpus hashes the corpus's content hash with the row, so a slice's hash
  changes when the corpus behind it changes (VD3-2).
* **Overrides are row operations, never positional patches.** An override records `{op, rowKey, field, value,
  baseRowHash}`; when a newer table version changes or removes that row, the override is reported as an **orphan** —
  kept, not applied — with the old base row, the new row and the user's value side by side.
* **Invalidation by slice** (LC-21, NF-D3). A table edit changes the hashes of the slices it touches, and exactly the
  entities whose recorded slices cite a changed slice re-derive (audited by the oracle, §7.3). The recorded slices are
  read from the persisted `DerivationRecord.slices` for the kinds that persist one (plots, blocks, buildings, §2.8),
  from the persisted `NamingRecord.slices` for every generated name (§2.8; VD3-2) — so a naming-table edit re-draws
  exactly the unedited names that cite a changed slice, in a rebased document too — and from the provenance rebuilt by
  the last derivation or by the verification replay for every other kind. Where neither exists — a kind without a
  derivation record in a document rebased from a kept snapshot or a frozen import, whose provenance no replay can
  rebuild — the stated fallback applies, as it does to a row inserted into a table read by predicate (a new class row
  that may now match entities that never consulted it, which changes the table's match slice): **Re-derive from the
  table's first reader stage**, with the fate report.
* **Host tables** (LC-31) arrive as `editTable`, `editPreset` or `setStyle` events whose content is copied into the log
  with provenance `host` (source, date, version), so a document replays without its host (§11.4).
* **Users and us.** Users edit through the tables editor and presets dialog (the preference layer); we change the
  system through new table versions — a declared shift whenever output changes (§6.4). The corpus phase replaces values
  and updates provenance without code changes; the default path with no edits is byte-identical to the shipped defaults
  (O10 h).

## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Written after reading the integrated `docs/ARCHITECTURE.md` (9 546 lines) for §2.8–§2.9, §3.3, §3.9, §4.11, §5–§7,
§9.6, §10.4, §11.3–§11.5, §12.4–§12.8, §13.2's B-EDIT list, §14's RNG and edit interfaces and the judgment rows, and
`docs/validation/fix-all/r3-verify-{determinism,kernel,pipeline}.md`. Ids in brackets are the items each change serves.

**Companion text of other areas' round-3 findings, folded into this file's blocks** (so the replaced subsections are
coherent on their own). Where the owning lane's round-4 block words the mechanism differently, **the owning lane's
wording governs** and the integrator aligns these sentences to it: NP3-2 and NP3-3 (pipeline) in §7.3 (b) 2, 3, 6, the
carve row and item 7 (v); VK3-2, VK3-3 (b) and VK3-9 (kernel) in §7.3 (b) 3, 4 and 9 (anchor ordinals, demotion,
stretches addressed by their end vertices); NP3-1 (pipeline) in §7.4's warp row and "Warp and what stands on the
ground" (by reference to §2.6's wing-carrying rule and test); NP3-4 (b) (pipeline) in §7.4's "draw bridges" row. NP3-6's
F-WALL wording (§5.2) is not in this file; §5.2 is unchanged by this round.

### 3.1 To the kernel area

| # | section | request |
|---|---|---|
| KR4-1 | §3.9, last paragraph [VD3-1] | Replace "so the loaded arena re-hashes to the recorded per-level digests (§6.2)" with "and the per-level digests are recomputed from the rebuilt arena as part of the load's one full digest recomputation, whose root §2.9 step 3 compares with `model.digest` before the first edit (VD3-1); the snapshot stores no per-level digest of its own". Add after the rebuild sentence: "*Pre-decided fallback for §2.9's open-to-editable bar:* each L2–L4 static index partition is rebuilt at the first query that reads it instead of at load — output-neutral, because every query result is sorted by its canonical key whichever structure holds an item (§3.3)." |
| KR4-2 | §2.2 rule 7, the `KernelTx.prepared` comment (§3.3) [VK3-2, VK3-1] | §7.3 (b) 3 now writes a re-traced run's water-gate bank vertices as `('anchor', the enceinte, k)` at the enceinte's next free anchor ordinals (the `Gate` record built in (7) naming them), and each boundary cut as an `anchor` row at its chain entity's next free ordinal — the lower-id district on a district boundary, the hinterland pseudo-district on the settlement perimeter. Make rule 7 and the comment say the same (VK3-2 is the kernel's item; its wording governs and the integrator aligns (b) 3). |
| KR4-3 | §2.2 rule 3, §3.4 [VK3-3 (b), VK3-9] | §7.3 (b) 4 and (9) rely on "§2.2 rule 3's demotion" (an old shore stretch shared with a quay or wall, a deck left over land) and (b) 3 on removing a stretch addressed by its two end vertices; supply both as VK3-3 and VK3-9 require (the kernel's items). |
| KR4-4 | §3.3 "Local coarse insertion — clear regions and prepared contacts" [VK3-1] | The water operator's footprint is now computed at the end of §7.3 (b) 2 and declared by both of its batches: replace "§7.3 (b) 4 for the re-carved reach" with "§7.3 (b) 2 for the re-carved reach, whose L1 batch (b) 3 and L0 batch (b) 4 both declare it". Rules 1–3 need no change: (b) 3 now clears by rule 1 as rule 2 requires. |

### 3.2 To the pipeline area

| # | section | request |
|---|---|---|
| PR4-1 | §10.4 [VD3-2] | (a) Replace "and a name is drawn only for an entity without a predecessor or on a reroll (§6.3), a successor keeping its predecessor's name (VD2-10) —" with "and a name is drawn only in §6.3's four cases — an entity without a predecessor, a town-wide or ids-scoped reroll, or an unedited name whose naming inputs changed — a successor keeping its predecessor's name and naming record (VD2-10, VD3-2) —". (b) In "Per-culture generators and user lists", after "(§6.4; VD2-8)" add: "The pack holds the corpus and the keyed row operation that makes the culture or ancestry row the user chose name it instead of the corpus it replaces, so the binding travels in the pack's content and hash (§7.6); selecting it therefore re-draws exactly the unedited names drawn through that row, listed for confirmation (§6.3 case (4)); a row that names a corpus hashes the corpus's content hash with the row (§7.6), and every draw records its naming slices in the name's naming record (§2.8). Deselecting it is a second `adjust`; the corpus's content stays in the document while the first names it (§2.9's pack set; VD3-3)." (c) In `SettingPack.provides` add `tablePatch?: { table: TableId /* the naming, culture and ancestry tables */; baseVersion: string; ops: RowOp[] }[]` — keyed row operations orphaned exactly as a `rosterPatch` is — and say that a user corpus pack is `{ corpora: [the uploaded list], tablePatch: [one `set` on the chosen culture or ancestry row's corpus field] }`, so the binding the user chose is part of the pack's content hash (§2.9, §7.6). |
| PR4-2 | §2.6 [NP3-1 alignment] | §7.4 now cites "§2.6's wing-carrying rule (NP3-1)" and "§2.6's test" for wings under a warp or vertex move; the pipeline's NP3-1 block must state that rule and that B-EDIT test in §2.6 under those names (its wording governs §7.4's summary). |
| PR4-3 | §4.11 footprint `C`, step (4), batch (1) [NP3-2, NP3-3, VK3-2 alignment] | §7.3 (b) 2's footprint rules (i)–(iii), (b) 3's cut of every way the new strips meet and (b) 6's district rule are written to NP3-2's and NP3-3's required changes; keep §4.11 (a)–(d), (1) and (4) the same (the pipeline's wording governs; the integrator aligns (b)). |
| PR4-4 | §4.2 S1 (5), §5.2 F-ROUTE [NP3-4 alignment] | §7.4's "draw bridges" row now places a drawn bridge's two `deck_end` vertices by one L0 batch of shore splits before S4's operator lays the way through them; the pipeline's NP3-4 block governs the wording (it also owns §5.2's F-ROUTE rung text, which this file does not replace). |
| PR4-5 | §4.1, the pool paragraph [VD3-5] | Add: "While a loaded document is verified (§2.9 step 3), every edit runs its per-district stages S10, S10b, S11 and S12b in the generation worker by the pool-size-0 path (§3.3 step 5) — identical digests by construction — so the pool freezes no copy while a pool worker holds the verification replay's model." |

### 3.3 To the rendering area

| # | section | request |
|---|---|---|
| RR4-1 | §9.6 [VD3-2] | (a) Replace "only for an entity with no predecessor, under a town-wide `rerollLayer(naming)`, or under an ids-scoped one that names it (§6.3); a successor takes its predecessor's name with its address (VD2-10)." with "only for an entity with no predecessor, under a town-wide `rerollLayer(naming)`, under an ids-scoped one that names it, or for an unedited name whose naming inputs changed — a grammar row it used, or the corpus a row that chose it names (§6.3 case (4)); a successor takes its predecessor's name and naming record with its address (VD2-10, VD3-2)." (b) After "a successor keeps its name even where its features changed (§6.3)" add "— features are not naming inputs". (c) Test: add "selecting a user corpus renames exactly the unedited names drawn through the rows it replaces, and no other name (§6.3)". |
| RR4-2 | §11.3 Roles and Convergence [VD3-4] | (a) Roles: after "every other client takes the replayed town for its own working state and reports the mismatch (NR-8)" add: "It keeps the `doc.load` bytes until the mismatch is settled; when the owner's `keptSnapshot` rebase arrives it installs the saved town from them and re-applies the events after `h₀` (§2.9 step 4; VD3-4), a client still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without asking — so every client converges on the owner's choice." (b) Convergence: after "so every client's model hash is the same (§6.2)" add "— after a load mismatch, once the owner has chosen (§2.9 step 4)". (c) Test (M3a): add "and one forced load mismatch settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the editors' events re-applied on the saved town". |
| RR4-3 | §12.6 "Replay and load verification" [VD3-1, VD3-5] | Replace "the saved model is displayed and editable at once and verified by a replay in a pool worker beside the edits" with "the saved model is displayed at once, editable once its own digest is recomputed and checked (§2.9 step 3; open-to-editable ≤ T(B), §12.5's law for the document's building count; the recomputation ≈ 31–34 ms at CITY, measured synthetic), and verified by a replay in a pool worker beside the edits, whose per-district stages run single-worker meanwhile (§2.9 step 3)". |
| RR4-4 | §12.8, the paragraph on frozen copies [VD3-5, VD3-1, VD3-4] | Replace "while a loaded document is verified, one pool worker holds the replay's model in their place — the pool holds no frozen copies at load, and the replay's arena and entity columns are about their size —" with "while a loaded document is verified, one pool worker holds the replay's model in their place — no frozen copy is made while verification runs, because every edit made meanwhile runs its per-district stages in the generation worker by the pool-size-0 path (§2.9 step 3; VD3-5), and the replay's arena and entity columns are about the copies' size —", and replace "M1's memory measurement below includes the load verification of the reference 300-edit CITY document" with "M1's memory measurement below includes the load verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during it; the load's digest tree (≈ 1 MB at CITY, §6.2) sits in the entity-store line, and a bridged client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§2.9 step 4)". |

### 3.4 To the scope area

| # | section | request |
|---|---|---|
| SR4-1 | §13.2 "B-EDIT and the locality oracle" [VK3-1, VD3-1, VD3-2, VD3-3, VD3-6] | (a) Replace "an edit within 100 ms of opening with a forced mismatch under both choices (§2.9 step 4)" with "an edit within 100 ms of the state becoming editable with a forced mismatch under both choices, the open-to-editable time against T(B), and a snapshot with one moved footprint and an unchanged `model.digest` — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified (§2.9 steps 3–4)". (b) After the river-move fixture add: "a pond drawn inside a block and a river bank widened into its riverside blocks, each committing with no `E_LEVEL` and every face outside the footprint byte-identical; a river moved across a wall between two towers and across the settlement perimeter (§7.3 (7)(v))". (c) Add: "the naming-input fixtures of §6.3 (a selected user corpus and an edited naming row rename exactly the names citing the changed slices, in a fresh and in a rebased document); a canal carved across a wall and a river move whose bank cuts a glacis line committing with 0 NF-P5 violations, a lane across a strip refused (§5.3)". |
| SR4-2 | §16 build plan [VD3-1, VD3-2, VD3-4, VD3-5] | M1: the memory measurement includes edits made during the reference document's load verification (§12.8). M2a adds: "the load's digest recomputation and open-to-editable bar, and the corrupt-cache fixture (§2.9 step 3); the naming-input re-draws (§6.3 case (4))". M3a adds: "an owner's keep of the saved town in a bridged document (§2.9 step 4, §11.3)". |
| SR4-3 | §14 `EditEngine.rebase` [VD3-7, the scope's own item] | §2.9 step 4 and §7.4's rebase row rely on a rebase at `at = h₀` behind the head; VD3-7's `rebase(doc, reason, at?: number /* default: the log head */)` supplies it. |
| SR4-4 | Judgment calls [all] | Replace J-DET-23, J-DET-35, J-DET-37, J-DET-38 and J-DET-39 with §4's restated rows, append J-DET-40 – J-DET-43, and replace J-I14 with §4's amended row (the integration seat's row; the change is VD3-5's). The preamble's round list gains "Round 4 added J-DET-40 – J-DET-43 and restated J-DET-23, J-DET-35, J-DET-37 – J-DET-39 and J-I14". |
| SR4-5 | "The whole design in one page" [VD3-1, VD3-2] | Replace "a bridge or street that an edit rebuilds keeps its name; a saved town can be edited the moment it opens while it checks itself in the background;" with "a bridge or street that an edit rebuilds keeps its name, while choosing your own list of names or editing a naming rule renames exactly the names that list or rule made, after you confirm them; a saved town can be edited as soon as it opens — once it has checked, in a fraction of a second, that its saved copy matches its own fingerprint — while a full re-check from its recipe runs in the background;". |

## 4. Judgment calls for the architecture's table ("chose X over Y because Z"; each vetoable)

| id | call |
|---|---|
| J-DET-23 (restated) | Chose to make S1's water operator re-site the crossings of the changed reach and chain S4, S5, S6 and S7 in §4.11's order — the new water, its crossing sites, the kept ways' routes, the crossed wall runs and the chain's footprint computed as data; one L1 batch that declares the footprint as its clear region, clears its partition content, re-lays the kept ways through their sited decks' bank vertices, re-traces the crossed wall runs with water-gate bank vertices and cuts the lesser ways at the bank setback; then one L0 batch, declaring the same footprint and clearing nothing, inserting the water through those prepared vertices — over digging the channel first and repairing the crossings afterwards, which §3.3's clear-region contact rule refuses (or, read loosely, which clears the kept arterials' crossings), over clearing only the cells whose L1 edges the chain changes, which leaves a pond inside a block or a widened bank facing kerbs and plot lines no batch prepared (`E_LEVEL`, then a town-wide fallback), and over declaring every reach edit a Re-derive from S1, because moving a river must stay local while bridges follow it and no road is left running into the water; decks stand at the sites `siteCrossings` picks, as at generation, not at each way's existing crossing as in a carve (§7.3 (b); LC-7, VD2-1, VK3-1). |
| J-DET-35 (restated) | Chose to make a selected user corpus a non-shipped pack (`user:<hash>`), to save the content of every non-shipped pack of the document's **pack set** — the base recipe's packs and every pack an `adjust` event in the log names — while any event names it, and to read that pack set in the link rule, and to refuse a host provider's output that would pass the 2 MB cap as an F-EDIT conflict, over keeping corpora beside the recipe, over saving and checking only the current recipe's packs, and over truncating or dropping an oversized output, because the log is replayed from its first event — a corpus selected after creation, or selected and then deselected, is still read by the replay of its `adjust`, so a link or a file without it could only fail or show other names — and a replay must never read content the document does not hold (§2.9, §6.4, §7.6; VD2-8, VD3-3). |
| J-DET-37 (restated) | Chose to hand a generated name to a successor with its address and naming record, and to draw names only for entities without a predecessor, on an explicit reroll (town-wide or ids-scoped, with the salts in the event), or for an unedited name whose recorded naming slices changed (a grammar row, or the corpus a row names — case (4), re-drawn with its own salt and listed for confirmation), over re-drawing a successor's name from its fresh lineage and over keeping every carried name through a naming-input edit, because a name, like a lock, belongs to the thing the user means — a re-drawn name would rename a re-sited bridge or a re-cut street the user never asked to rename — while choosing a street-name list or editing a naming rule must change exactly the names that list or rule produced, or the feature does nothing to the town on screen (§6.3, §7.1, §7.6; VD2-10, VD3-2). |
| J-DET-38 (restated) | Chose to make the displayed snapshot the working state and apply edits at once — after the load has recomputed the decoded state's own digest tree and matched its root with `model.digest` (≈ 31–34 ms at CITY, measured synthetic) — with the verification replay running beside the edits in a pool worker and a mismatch resolved by rebasing at `h₀` or re-applying the later events to the replayed state, over queueing edits until verification ends and over editing the decoded state before its own digest is checked, because verification takes ≈ 1.4–11 s while an edit must redraw within 100 ms, the edits are ordinary log events so a mismatch only changes the state they are re-applied to, and a snapshot whose content disagrees with its recorded root would otherwise be edited and declared verified; table and preset edits alone wait, for the provenance only the replay rebuilds (§2.9; NR-8, VD3-1). |
| J-DET-39 (restated) | Chose to scope the NF-P5 invariant to generation batches and to every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by step (0) or removes — a declaration each dry run computes and a registry test requires of every operator that can write a strip — over dropping the invariant for edits and over an enumerated list of exempt edit kinds, because the edits that rebuild or remove a wall's parts must be allowed to clear them while every other edit and every generation batch must still never split them, and a list drifts behind the operators (the round-3 list omitted the carve and part of the water operator) and makes an implementation refuse valid canals and river moves (§5.3; VP2-4, VD3-6). |
| J-DET-40 | Chose, as the pre-decided fallback if the load's full digest recomputation passes §6.2's 150 ms bar, to recompute the tree off the edit path from a copy-on-write checkpoint at `h₀` and catch up the edits made meanwhile by their touched sets — a mismatch then handled as a corrupt cache, the edits re-applied to the replayed state — over storing per-chunk digest nodes in the snapshot and re-hashing a chunk's leaves when an edit first touches it, because the digest tree is organised by layer and containment while chunks follow partitions (the network layer's node spans every chunk that holds a way), so per-chunk nodes would need the tree restructured by chunk and would change again under §2.9's block-group chunking fallback, whereas the checkpoint form changes neither the tree nor the file and still proves the working state before verification can succeed (§6.2 (iii), §2.9 step 3; VD3-1). |
| J-DET-41 | Chose to persist a naming record — the naming slices and salt of the last draw — with every generated name, over reading a name's naming slices from provenance, because provenance is never persisted and cannot be rebuilt in a document rebased from a kept snapshot or a frozen import, where a corpus selection or a naming-table edit could then not tell which names drew from what it changes; the record costs ≈ 0.1 MB raw at CITY before compression, inside the per-building document budget (§2.8, §7.6; VD3-2). |
| J-DET-42 | Chose to let a non-owner client of a bridged document take the replayed town, keep the `doc.load` bytes (≤ 3 MB at CITY) and install the saved town from them when the owner's `keptSnapshot` rebase arrives — and to let a later loader whose log already holds that rebase take the saved town without asking — over making every client wait on the snapshot until the owner chooses and over treating the owner's rebase as a no-op on clients that hold another state, because an absent owner would leave editors on a state the replay has shown to differ, and a no-op leaves the owner and the editors on different states against §11.3's convergence rule (§2.9 step 4, §7.4, §11.3; VD3-4). |
| J-DET-43 | Chose to run the per-district stages of every edit made during load verification in the generation worker by the pool-size-0 path, over running them on the pool less the replay's worker with their frozen copies counted, because the pool-size-0 path gives the same digests by construction, keeps memory on §12.8's counted line (the replay's model stands in for the copies only if none is frozen) and leaves the replay's worker uncontended, while the price — a multi-district edit at its single-worker cost during a ≤ 11 s window — falls on rare edits (§2.9 step 3, §12.8; VD3-5). |
| J-I14 (amended) | Chose to count a load verification's replay model in the place of the pool's frozen arena copies — no copy is frozen while verification runs, because every edit made meanwhile runs its per-district stages in the generation worker by the pool-size-0 path (J-DET-43) — and to include the reference CITY document's load verification, with a district regeneration and a Re-derive from S3 made during it, in M1's memory measurement under §12.8's existing fallbacks, over moving the replay to the generation worker when memory is short, because the replay needs its own model wherever it runs, so moving it saves no memory (§2.9 step 3, §12.8; round-3 C-3, round-4 VD3-5). |

## 5. Deferral scan, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**Deferral scan.** This file was scanned for TBD, "to be decided / determined", later, defer, postpone, future,
"not yet", "at M0", revisit, undecided, "if needed", "as needed", eventually and "will be decided / measured /
chosen": every hit is ordinary sequence ("every later re-trace", "the later event's touched set", "a later loader").
Every new bar names its measurement and its pre-decided fallback: the load's digest recomputation (§6.2's 150 ms bar →
the off-edit-path checkpoint form), open-to-editable (≤ T(B) → lazy index partitions → a declared, veto-able budget
amendment with the picture still at once), the NR-8 edit bar (scheduling-only fallback, unchanged). No item is
STAGED-BY-OWNER: none of the eight touches a subject the owner's roadmap assigns to a later stage.

**CONFIRMED (executed in this lane):** the load-recomputation cost — `docs/validation/bench/fixall_det_r4_loaddigest.mjs`
run twice on the reference machine (Apple M1, Node 24.12): ≈ 30.6 / 33.5 ms at CITY and ≈ 94.8 / 101.0 ms at METROPOLIS
(medians of seven), root identical across runs; every block's changes against the integrated text, checked by a
word-level diff of each replaced subsection (only the changes listed in §1 appear); every string that a cross-area
request asks to replace, found exactly once in `docs/ARCHITECTURE.md` by a whitespace-normalised search (13 strings);
the external references to §7.3 (b) steps (grep: §3.3's "(b) 4" pointer is the only one the footprint's move breaks —
KR4-4).
**PLAUSIBLE (this seat's reasoning, not executed — no engine exists):** that each mechanism defeats its failure
scenario — in particular that a pond inside a block and a widened bank commit without `E_LEVEL` once (b) 3 declares
the footprint (VK3-1), that the recomputed root catches every chunk whose content disagrees with the recorded root
(VD3-1), and that case (4) renames exactly the names drawn through a changed row (VD3-2); the synthetic benchmark is a
cost model of the recomputation (a random-access ring walk, 104-byte leaves), not the engine's own digest code, and
its hash is not checked against published test vectors; the open-to-editable decomposition (decode, rebuild, fields,
digest) is an estimate until M2a times it.

**What a Fable reviewer should re-check first.** (1) VD3-1's design: a synchronous full recomputation before the first
edit (≈ 31–34 ms at CITY) with an off-edit-path checkpoint fallback, chosen over the verifier's per-chunk stored nodes
(J-DET-40) — is the reasoning that the digest tree does not align with chunks sound, and is T(B) the right
open-to-editable bar? (2) VD3-2's naming record: a new persisted per-name record plus a pack-carried `tablePatch` that
binds a user corpus to a culture or ancestry row (PR4-1 (c)) — is this the least machinery that makes "select my list"
rename exactly the right names in fresh and rebased documents? (3) The companion text folded from other areas'
round-3 findings into §7.3 and §7.4 (NP3-1–NP3-4, VK3-2, VK3-3, VK3-9): the integrator must align it with those lanes'
own round-4 blocks.
