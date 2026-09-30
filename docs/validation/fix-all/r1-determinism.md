# Fix-all round 1 — DETERMINISM area (§5 failure handling, §6 determinism, §7 editing and regeneration, §2.8–§2.9 lifecycle and document)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-determinism-r1 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-determinism-r1` · 2026-09-25 · seat: fix architect, DETERMINISM area, round 1 (Fable role; opus
stand-in) · clean-room: every mechanism below is described in this seat's own words and numbers; no reference code,
grammar, palette, word list or content table is quoted.

## 0. How to read this file (plain words)

The red team found that the design's promises about *sameness* did not hold together: the same seed could give a
different town on a slow computer; a building's permanent name was also the key of its dice, so moving it to another
district broke either the name or the dice; a saved town could replay into a different town than the one on screen;
and checking the town's fingerprint after every small step would have taken hours. This file repairs all of that with
one set of rules: every decision is counted in steps, never seconds; every building gets a permanent address that is
separate from where its dice come from; a saved town is "a starting point plus an ordered list of changes", applied the
same way on screen and on reload; the fingerprint is kept up to date piece by piece; and every edit a person makes is
either kept, carried to the nearest match, or reported — never lost silently.

Section 1 lists every item this area owns and what happened to it. Section 2 holds the replacement text for the
architecture, one block per subsection, each beginning with `=== REPLACE … ===`; the integrator pastes them into
`docs/ARCHITECTURE.md`. Section 3 lists the changes other areas must make in sections they own. Section 4 lists the
judgment calls for the architecture's *Judgment calls* table. Section 5 separates what is measured from what is
reasoned.

Nothing here is deferred. Where only an experiment can confirm a choice, the block states the chosen mechanism, the
measurement that confirms it at M0 or M1, and the fallback already decided if the measurement fails. Two items concern
subject matter the owner's roadmap puts later (ruined buildings belong to the evolution program and the stage-2 look);
for those the schema hooks are written now and the item is marked STAGED-BY-OWNER.

## 1. Disposition table

| item | disposition | sections changed (cross-area in brackets) | mechanism, one line |
|---|---|---|---|
| GEO-2 | FIX | §5.1, §5.2, §5.4, §6.2, §6.5, §7.8 [§3.1, §4.1, §12, §13.2, §14] | every output-affecting budget is an operation count (`E_WORK_LIMIT`, F-WORK); wall clock lives outside model packages and only schedules lazy work (F-BUDGET-TIME, reporting and scheduling only); CI time-dilation run ×10 / ×0.1 must be byte-identical |
| GEO-31 | FIX | §6.5 [D-23, §14] | the lint becomes an allowlist of exact `Math` members; `**` only with literal exponents 0–4; the same scan runs over every vendored dependency with a pinned-version audit record |
| GEO-33 | FIX | §7.1, §7.2 | strokes resampled to ≥ `minEdge` with a topology check at the authoring boundary; `drawWater` takes add rings (unioned) and subtract rings (land brush); `drawBoundary` snaps to whole L1 cells |
| GEO-34 | FIX | §2.1, §6.3 [§3.6 (5), already carried by the kernel] | anchors matched with per-kind hysteresis radii (building 0.5 m) by nearest match and id tie-break; on-edge rule: the face left of the directed cut keeps the id; fixture ≥ 99.9 % ids kept under 1 cm perturbation, fallback decided |
| GEO-41 | FIX | §7.7, §7.8 | continuity and monotonicity stated over 50 seeds × 21 steps with a fixed formula for ε; expansion rows made continuous (fractional `joinMax`, smoothstep avenue probability) |
| LC-1 | FIX | §2.1, §2.8, §2.9, §6.1, §6.3 [§3.4, §4.1, §11, §14] | address id (opaque, `kind:token`, token = hash of the lineage key, never reused, tombstones) separated from the lineage key (stream identity); survival keeps both, succession hands only the address to the anchor-matched successor; JOIN ids by the anchor rule; exports carry a supersedes table |
| LC-3 | FIX | §6 plain words, §6.3, §6.4 [one-page, §13.3, §15.2 O2, D-15, D-24] | the promise restated to its true scope; stage-isolated goldens run new stage code on frozen upstream outputs; end-to-end goldens re-signed only with a cascade record |
| LC-4 | FIX | §7.1, §7.3, §7.8 [§15.2 O2 (c)] | every control records its consuming stage; Adjust is local only at S10+ or with a spatial scope; earlier parameters run as "Re-derive from stage k" with a confirmed edit-fate report |
| LC-5 | FIX | §5.1, §6.1, §7.1 | `reroll` (user, absolute per scope entity, stored in the event) and `attempt` (ladder, restarts at 0 per reroll, same cap) are separate key components |
| LC-7 | FIX | §5.2, §7.3 [§4.2–§4.8] | a local operator per coarse stage (S1 water and terrain, S4, S5, S6, S7) with pinned boundaries; F-REDERIVE repairs plots and footprints that the new coarse geometry invalidates, by events; otherwise the edit is declared "Re-derive from Sk" |
| LC-8 | FIX | §7.2, §7.3, §7.4 | an edited attribute implicitly pins the attribute and the entity's existence; the dry run lists every protected entity in the effective scope with its fate (kept / carried / orphaned / discarded); overrides never move by id alone |
| LC-9 | FIX | §5.2, §7.7 [§4.2 S0, §4.7 S10] | precedence lock > assignment > drawn geometry > rules; blueprint assignments become `assign` events at log positions 0…k; re-solves place only unmapped members around fixed points; epoch rule stated |
| LC-10 | FIX | §2.9, §7.2, §7.4 [§14] | one replay semantics, an ordered fold; a drawn constraint re-runs its class's local operator at its log position, the same code path on screen and on replay; hoisting survives only as an explicit rebase |
| LC-11 | FIX | §2.9, §7.1, §7.4, §7.5 [§4.11, §16 M4] | `{t:'epoch'}` is an EditEvent in the ordered log; `EpochRecord` is derived from it; undo, replay and upgrade treat epochs like any event |
| LC-13 | FIX | §2.9, §7.1, §7.5 | a `rebase` event makes the chosen state the document's base and records that it is not seed-reproducible before it; edits wait until verification finishes or the user chooses |
| LC-14 | FIX | §6.4, §7.5 [§16 M3, D-21] | migration maps entities by kind, anchor, class family and overlap; an orphaned lock re-imposes its last geometry; the upgrade is an undoable event; retention: output versions N−1 and N−2 ship as lazy browser chunks, every output version in the Node CLI, older documents open as frozen views |
| LC-15 | FIX | §2.9, §6.2, §6.4, §7.6 [§11 permalinks row] | the canonical recipe holds every model-affecting input (preferences folded in at creation); the permalink carries the compressed recipe and log or refuses and offers a file; `&doc=` only with a configured resolver |
| LC-21 | FIX | §2.8, §7.4, §7.6 | provenance cites consulted table slices by hash (row, weight vector, bracketing pair, threshold set, match predicate); invalidation on slice-hash change; predicate tables fall back to "Re-derive from the first reader stage" |
| LC-22 | FIX | §7.1, §7.6 | table, preset and style edits are row operations addressed by stable row key with the base row's hash; a changed or missing row is an orphan, reported |
| LC-24 | FIX | §2.9, §5.4 | the log is the single source of truth; locks, epochs, report and statistics are derived caches outside the canonical form and the digest; timings are session telemetry, never saved |
| LC-25 | FIX | §2.8, §6.2 | the model digest covers model content only; version stamps, rule slices, derivation inputs and deps form a separately hashed provenance block |
| LC-26 | FIX | §2.8 | one existence state plus orthogonal flags (locked, pinned, edited, assigned, with attribute paths) |
| LC-27 | FIX | §7.2, §7.4 | field strokes are a list composited once and clamped once, undo removes a stroke; a warp replays as its operation at its log position, per-vertex displacements are a verification record only |
| LC-28 | FIX | §2.9, §6.1, §6.3, §7.5 [§11] | Enter = a new document with seed + 1 and the same recipe without edits, locks, assignments or salts, with a warning; `docId` minted at creation, re-minted on clone, prefixed at the API boundary; a newer schema opens read-only; §6.1's reference note corrected |
| LC-29 | FIX | §2.1, §6.1, §6.3 | layer and island are components of every lineage key and prefix non-ground addresses; the distinct-key test adds a sky-island fixture |
| LC-30 | FIX | §2.9, §7.7, §7.8 | proxies are the town's own S0–S4 run under deterministic work budgets, checked by digest when picked; "Surprise me" draws from the `intent.surprise` stream and writes the intent into the recipe; the entry mode is a recipe field |
| LC-31 | FIX | §2.9, §6.5, §7.1, §7.6 [§11, §14] | every bridge command maps one-to-one to a logged EditEvent; host tables arrive as `editTable` / `editPreset` / `setStyle` events copied into the log with provenance `host`; a host provider passes a double-run check and its outputs are recorded in the document's `hostContent` block and read from there on replay |
| SCL-1 | FIX | §5.3, §6.2 [§3.3, §13.2] | every invariant has a scope (batch-local, stage-end, save, CI-only); the model hash is a Merkle digest maintained along dirty paths; per-edit validation cost flat TOWN → METROPOLIS ± 20 % |
| SCL-5 | FIX | §2.8, §7.4 [§2.5, §12] | whole-document snapshot ring replaced by scoped undo records O(scope) and cost-driven checkpoints; provenance stored as columns with interned stage runs and u32 deps |
| SCL-11 | FIX | §2.9, §5.4 | fields are recomputed on load, never persisted; geometry persisted once (one vertex store, each level's own chains only, inherited boundaries never repeated); only ladder keys are recorded; a document-size test per rung |
| SCL-12 | FIX | §6.1 | stream keys mixed from structured components (entity key cached at mint, u16 stage and concern ids, reroll, attempt, epoch, salt) with no string built; ≤ 0.1 µs per key measured at M0, output-neutral fallback decided |
| SCL-16 | FIX | §7.8 [§12] | six proxies < 1 s at TOWN (O16 (e) restored); progressive proxies at CITY (≤ 250 ms each) and METROPOLIS (≤ 500 ms each) |
| SCL-20 | FIX | §2.8, §2.9 | lifecycle history moves to an append-only event block keyed by id; tombstones move to an archive outside the working set and indexes; a 20-epoch growth budget and test |
| VIS-11 | FIX | §5.1, §5.2 [§2.6, §3.1, §13.1] | the roof downgrade is a plain roof (no ridge or hip lines); hip-from-OBB only where the footprint is its own OBB; a fixture asserts no roof line outside the footprint |
| MFP-12 | FIX | §7.8 | a "features" checkbox strip (plaza, temple, shanty town, farms, greens) counted as one basic-panel control; "Surprise me" becomes the seed control's button so the panel stays at 12 |
| FTG-21 | FIX | §2.9 [§11, §12] | snapshot contents stated (every level's own chains once, entity columns, no provenance, no field rasters); ≤ 320 B per building gzipped at CITY against FTG's 212 B, with a lossless pre-decided fallback; the compact twin stores deltas from the settlement centre plus the centre's world offset |
| COV-MFCG-L03 | FIX | §7.1 | every MFCG warp tool mapped to a named kernel with stated semantics (Displace, Liquify, Relax, Bloat, Pinch, Equalize; Rotate as a whole-map view rotation; Measure is the ruler, not a warp); staged Apply / Discard |
| COV-VG-VN-008 | FIX | §6.1, §7.1 | `rerollLayer(concern)` advances a per-concern salt for non-geometry concerns (naming, labels, instances, crowns, style jitter) |
| COV-NG-XA36 | STAGED-BY-OWNER | §2.8, §7.1 [§2.6, §4.11, §8.2] | hooks now: existence states `abandoned`, `decayed` and `ruined`, conversions `abandon` / `decay` / `ruin` / `clear` / `rebuild` usable by hand in the base; the evolution engine decides when (owner's later stage); the ruin paint program and roof kind are cross-area requests |
| COV-NG-CR02 | FIX | §2.9, §7.1 | (duplicate of COV-MFCG-L03) Rotate turns the whole map about the frame centre as a view key; the compass is decoupled (true north by default, free on request) |
| COV-FTG-C12 | FIX | §7.1, §7.2 | locks take attribute paths; a person scope regenerates with its locked fields kept (relations and schedules excluded as non-local) |
| COV-FTG-C13 | FIX | §7.1 [§11 query] | `setAttrMany` over ids resolved from a query at dry run (stored resolved, one undo step); person-search facets are a cross-area request |
| COV-FTG-M01 | FIX | §7.1, §7.4 | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `fill` events that act through the plot model, each with a lifecycle row |
| COV-FTG-M04 | FIX | §7.1, §7.4 | `paint` (roof kind, roof and wall colour) resolved to ids under the brush; `paintGround` (style region); `treeBrush` expanding to greenery and `instance` events |
| COV-VG-VN-090 | STAGED-BY-OWNER | §2.8 | (duplicate of COV-NG-XA36) the `ruined` existence state and the `ruin` conversion exist in the base schema; §8.2's `ruin` program draws it |
| COV-VG-WC1 | FIX | §6.1 | the "irreproducible" rationale corrected: the references' successors are reproducible per build but tied to its draw order; `seed + 1` stands on its own |
| AM-5 | FIX | §2.8, §7 plain words, §7.1–§7.6 [§0.4] | each clause of the owner rule mapped to a mechanism; the entity registry declares every type's edit kinds, undo path, persistence and migration hook, with a CI coverage test |

Counts: 47 items — 45 FIX, 2 STAGED-BY-OWNER (both the ruined-state hook, one a duplicate), 0 INVALID, 0 deferred.

## 2. Replacement blocks

Each block replaces one subsection of `docs/ARCHITECTURE.md` whole (heading line included) or is inserted where
stated. Blocks are in document order. Every block carries the review banner directly under its heading.

=== REPLACE §2.1 Layers, coordinates, units, ids ===

### 2.1 Layers, coordinates, units, ids

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
  are schema-complete and empty. `LayerSpec = { id, zOrder, elevationCm, visible, castsShadowOnto?, exportSeparately }`.
  **Wording:** in this document *layer* without qualification means one of these three model layers; the toggleable
  drawing groups of §8–§9 (labels, cadastral outlines, trees, annotations, the thematic style overrides) are
  display-list groups selected by `semantic`, never a fourth model layer.
* **Ids.** Every entity has an **address id** `kind:token` — prefixed with its arena outside the ground layer
  (`sky2/plot:…`, `under/tunnel:…`) — that edits, locks, assignments, pins, labels, households, exports and hosts point
  at, and a separate **lineage key** that keys its random streams. The two, the anchor rule with its hysteresis radii,
  survival and succession, the JOIN rule and the one collision rule are defined in §6.3 (LC-1, LC-29, GEO-34). In memory
  addresses are interned `u32` handles — the kernel's owner and role tables hold them (§2.2 rule 5) — and in the
  document they are strings. The parent is a field, never parsed from the id; no record outside the kernel stores an
  arena slot.

=== REPLACE §2.8 Provenance, versioning, lifecycle, the entity registry ===

### 2.8 Identity, lifecycle, provenance, the entity registry

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

Every entity record has five parts: an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest),
its **attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's
owner and role tables, never through stored slots), a **derivation record** (the inputs of its last derivation —
persisted for the kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was
last derived — rebuilt by every derivation, never persisted, never in the model digest; LC-25).

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
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */ }
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
* **History lives outside the entity** (SCL-20). The document keeps one append-only **lifecycle event block** keyed by
  id in `seq` order; an entity holds only its `Lifecycle`. Demolished and superseded entities move to the **archive**
  as tombstones: out of the working set, the spatial indexes and the display list; their ids and `supersededBy` links
  stay in the identity subtree of the model digest (§6.2) so an id is never minted twice (§6.3). *Growth budget:* the
  working set grows only with live entities; the document grows by at most the bytes of new or changed records plus
  64 B per lifecycle event. *Test (M4, with the epoch path):* a 20-epoch TOWN with ≈ 30 % churn per epoch keeps its heap
  ≤ 1.3 × and its document ≤ 2 × those of a freshly generated town with the same live entities. *Pre-decided
  fallback:* the archive and the lifecycle event block are held compressed in memory and decompressed only for an
  orphan report, a resurrection or an export — output-neutral.
* **Derivation records** (LC-12). A plot, block or building persists the inputs of its last derivation — context and
  parameter digests, field samples, band, the table slices consulted — so "Regenerate (keep settings)" reproduces it
  from what it was made from, across saves, epochs and field edits elsewhere (§7.3 item 5). The record is excluded from
  the model digest (it is hashed with provenance) and rewritten by every derivation of the entity.
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table,
  not in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool;
  all of it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). A release that changes no output changes no
  model digest. Provenance and derivation records share their own digest, used only by the locality audit.
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash:
  the whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold
  set for a band lookup, the row for a direct lookup, and the table's match predicate set for a rule that selects rows
  by predicate. §7.6 invalidates on slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9); pick behaviour; **edit
  kinds with their undo path and lifecycle row** (§7.1, §7.4); migration hooks (§7.5). A CI test fails when a type is
  missing from any path — generation, digest, render, export, persistence, edit, undo, migration (VG's palisade "ghost"
  cannot recur; O11 a; owner amendment 5, §7.1).

=== REPLACE §2.9 The document and serialisation ===

### 2.9 The document and serialisation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

A document is **a base plus an ordered log**: the base is either the canonical recipe (the town replays from its seed)
or, after a rebase, a materialised state; the log is every change since, in order. Everything else in the file is host
input recorded for replay, a verified cache, or per-user state.

```ts
interface Document {
  docId: Uuid;                  // minted at creation by @plat/api (outside the model packages); kept on save; re-minted on clone and save-as (§6.3)
  schemaVersion: string;        // the file format (§7.5)
  outputVersion: string;        // the model packages whose output this document replays under (§6.4)
  base: Base;
  log: EditEvent[];             // the single source of truth for every edit, lock, assignment, table edit, epoch, rebase and upgrade (§7.1)
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version, style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache verified by digest (below)
  view?: ViewState;             // per-user and shared view keys (below) — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[] };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (the last 64 events or 20 MB, whichever is smaller); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state`; the town is not seed-reproducible before `seq`
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>; packs: { id: string; version: string }[] /* setting packs (§7.6) */;
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<ConcernId, number> }        // initial per-concern salts (normally 0); rerollLayer events in the log advance them (§6.1)
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; geometry: Record<string /* PlatKey */, PlatBlock /* §3.9 */>;
  entities: EntityColumns /* identity + lifecycle + attributes + derivation records */; archive: Tombstone[]; history: LifecycleEvent[];
  fieldCache: Record<'prosperity'|'density'|'greenery', Uint8Array /* 32 m */>; digest: Hash128 /* Merkle root, §6.2 */ }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // time, location, favourites, notes and public notes, view pins, layer choices, season, weather, frame, rotation, compass, legend and emblem settings — each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1)
type RebaseReason = 'keptSnapshot'|'keptOldModel'|'drawnConstraintsRebuilt'|'frozenImport';
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`)
  and epochs exist only as log events; their current effect lives in the entity records (flags, attributes) and in
  `derived` caches rebuilt from the base and the log. The blueprint's assignments and edits become `assign` and edit
  events at log positions 0…k when the document is created (§7.7). The report and the statistics record are caches;
  per-stage timings are session telemetry and are never saved (§5.4).
* **Load** (the K-3 repair, completed by LC-13 and LC-28):
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current
     version and records that it is not seed-reproducible before the rebase.
  3. Otherwise `model` is displayed at once and **verified**: replay (base, log) in replay mode (S13a and S14 run once
     at the end, §7.3) and compare the Merkle root with `model.digest`. Edits made during verification are queued, not
     applied; the user may end the wait by choosing "trust the saved town", which is a `rebase` onto `model` (reason
     `keptSnapshot`).
  4. A **mismatch is never silent** and is resolved once: keeping the saved town appends a `rebase` event (the saved
     state becomes the base); taking the replayed town replaces `model`. Either way the document is consistent after
     the choice, the next load does not report it again, and undo below a rebase uses the rebased state, never a replay
     from the seed. A rebase fills in, from the rebased state, the derivation record of any entity that lacks one, so
     Regenerate (keep settings) stays defined for every entity. Queued edits then apply to the chosen state.
  5. A document without `model` loads by replay; `model` is a cache, never the only copy of anything.
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: one block per arena (`PlatKey`) in which
  every boundary — a shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins
  and parents are rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own
  version. Entities are stored as columns (identity, lifecycle, attributes, derivation records); **provenance is not
  stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full
  resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2); the
  snapshot carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document
  is ever opened as a frozen view. The report records stream keys only for ladder uses (any rung from tier 2 up),
  never every key.
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**,
  measured against FTG's 593 KB for 2 798 buildings with their population (≈ 212 B per building; PLAT also stores plots,
  yards, heights and lifecycle, and derives people). This section holds the document budget (§12 carries memory, not
  the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1. *Pre-decided fallback if CITY
  exceeds 320 B per building:* the vertex stream switches to second-order (predictive) delta coding — each vertex stored
  as its difference from the straight-line continuation of the previous two along its first edge — with x and y in
  separate streams; the change is lossless and output-neutral, so no golden moves.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  base recipe, log, host content, style, archive index) + binary blocks (arena blocks, entity columns, history, archive)
  as typed arrays. The compact twin for embeds (CBOR with typed-array tags) encodes the same schema in world coordinates,
  with the settlement centre recorded in its header (§11.1), so it round-trips exactly (O11 c). Exports are views (§11)
  and carry address ids plus a supersedes table (§6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `base`, `log`,
  `hostContent`, `style` and `model` (when present); `view`, `derived` and `undo` are never canonical. Three digests:
  the **model digest** (Merkle root over model content, §6.2 — goldens, verification, the locality oracle), the
  **provenance digest** (provenance and derivation records, §2.8 — the locality audit only), and the **document digest**
  (over the canonical bytes — save → load → save identity). The bridge's concurrency token is `stateId` = a 128-bit hash
  of (`docId`, log length, hash of the last event) (§11.3).
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices, season,
  weather, frame, map rotation and compass, legend and emblem settings — and which people a user has looked at — live in
  `view`, outside every digest; each key is last-writer-wins by (Lamport counter, session id), so a viewer never writes the model.
* **Round trip** is a hard test: export → import → export byte-identical over the canonical form (O9 a, O11 c).
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics** are §7.4.

=== REPLACE §5.1 Principles and the seven tiers (G-P7) ===

### 5.1 Principles and the seven tiers (G-P7)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

1. **The unit of failure is a kernel transaction (a batch), never the map.** MFCG's `City.hx:156` catch-all (a
   bisector exception restarts the whole city, `profile-mfcg.md` ST-8) and VG's silent seed swap (4 of 27 attempts) are
   the behaviours removed; the pipeline has no restart path (J-K adopted; D-9).
2. **Feasibility by construction before geometry**: S1 guarantees river descent, S2 derives the stage budgets from
   demand, S3 places the site relative to the river and reserves the castle, plaza and institution precincts (§4.2) —
   the hard constraints MFCG puts in its restart tier are satisfied before any fabric is cut.
3. **Every stochastic step has a declared, bounded, deterministic ladder**, and every rung writes a report line with a
   cause code and its tier; the ladder path is replayable from the printed stream key.
4. **Invariants police validity, not regularity** (FTG's sheared minority of quads and NG's wedge class stay).
5. **Every limit that can change output is a work limit, never a time limit** (GEO-2). Each stage declares
   `workLimits` per rung — counts of kernel calls, proposals, candidates, skeleton events and recursion depth (§14). A
   kernel call that reaches its count returns `E_WORK_LIMIT` (§3.1), and the ladder treats it like any other failure
   (F-WORK, §5.2), so the same inputs take the same rungs on every machine. Wall-clock time is read only by
   `@plat/api`'s worker host, never by a model package (§6.5): it may postpone or resume a lazy tier (F-BUDGET-TIME) and it
   writes telemetry, but it never changes what is computed — a tier computed late hashes exactly like one computed at
   once. *Chose operation counts over wall-clock watchdogs because a watchdog makes a throttled background tab, a slow
   laptop or a busy CI runner produce a different town from the same seed; the millisecond budgets of §12 stay as
   reporting targets and cost tests.*
6. **Retries are not rerolls** (LC-5). Ladder retries (tier 3) draw from the `attempt` key component, which restarts at
   0 for every reroll of the scope entity and has the same cap each time; the user's New random advances the `reroll`
   component (§6.1, §7.1). Every reroll therefore has its full ladder, and New random always changes its scope or
   reports "no alternative within the ladder".
7. **Requested features are counted by delivery tier.** The report records, for every feature the request names,
   whether it was delivered at tier ≤ 3 (*full*), at tiers 4–5 (*degraded*) or dropped at tier 6 (*omitted*);
   acceptance counts a tier-6 omission of a requested feature as a failure (§15.2). "No restart path" is a design
   property, not an acceptance number.

```
tier 0  feasibility by construction    the constraint is satisfied by how the input was made
tier 1  constraint check               typed KernelResult / invariant; nothing committed
tier 2  local repair                   a deterministic geometric fix: weld, attract, widen, merge, re-inset, re-claim, re-site
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

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

Rows marked † carry a ladder whose mechanism another area owns (named in brackets, with the section that states it);
the row repeats that area's rungs so this table and §3–§4, §9 agree.

| class | where | detection | ladder (in order; each rung deterministic from the stream key) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [kernel, §3.6; GEO-3] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` (optional chains); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | optional chains only (growth proposals, optional lanes, decorative lines): re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains (coasts, shores, banks, rivers, wall traces, arterials, band and kerb edges, plot lines, user-drawn geometry) cannot fail for a precision reason after attraction (§3.6); `E_OUT_OF_RANGE` is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ: 10⁶ random concave, holed, thin, near-collinear, self-touching and snapped inputs per primitive, plus constructive degeneracies (§13.1): 0 crashes, 0 hangs, 0 self-intersecting outputs, 0 undeclared slivers (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [pipeline, §4.6; GEO-23] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a pre-step: a face with a reflex vertex deeper than the band's block depth is first split from it, and at antenna roots) → redraw the cut's position ×2 → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run through its midpoint, clipped to the face's own component → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), allowed only for faces ≤ 2 × the band's upper block area | property test: on 10⁵ random concave and holed faces the ladder terminates in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5); MFCG baseline: 19 skipped cuts and 3 of 16 cities restarted for "bad poly" |
| F-CORRIDOR† union produces slivers or a collapsed block [kernel, §3.6; GEO-35, GEO-4] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (§3.6): merge across a partition edge, else keep the face as `residue` — a structural edge is never deleted → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [pipeline, §4.2 S1; GEO-13] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | island, fjord and sky-island fixtures: 0 non-simple outlines committed |
| F-RIVER† no course / no crossing [pipeline, §4.2 S1; GEO-36] | S1, S3 | descent stalls in a sink; the carve depth would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report; a requested river island whose branch separation fails is reported "not built" | 1 000 seeds × {river, river + coast} × rung: "river within the core when requested" = 100 % (MFCG baseline 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [pipeline, §4.2 S1; GEO-14] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: contours crossing water 0; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails slope / land / flood tests | relax the slope threshold one step → the largest land component's centroid band → report | corpus sweep over relief characters |
| F-ROUTE† no arterial path [pipeline, §4.3; GEO-17] | S4 | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | move the crossing site along its reach within its search band (the deck stays perpendicular to local flow) → allow one bridge at extra cost → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is logged but invisible to the user, O16) | scripted requests on 100 seeds with pathological sites; O4 (a) 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [pipeline, §4.2 S2, §4.4; FTG-2] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density and grow only the added ring, recomputing the trace) → accept and report the shortfall; the exact plot check after S10 then feeds F-SITING | B-CITY sweep over wealthLevel {0, 0.5, 1}: population ± 5 % on ≥ 95 % of seeds and the walled share in its band |
| F-WALL† bad trace / gate count infeasible [pipeline, §4.4, §4.8; kernel, §3.6–§3.7; GEO-18, FTG-8] | S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | the trace is fixed before growth with its gates pinned (S5a): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored) and add water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no gate: a declared sealed circuit) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %, `gates = N` exact, 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds; MFCG baseline: sealed cities at `gates = 0` without fallback |
| F-CASTLE† compactness / overlap [pipeline, §4.2 S3, §4.8; MFP-3] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | inside the S3 reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | castle area and compactness in band on ≥ 99 % of B-CITY seeds, 0 ways through reservations; O8 (d); MFCG baseline 178 equalize passes and 11 bloats per census |
| F-PLOT† unusable plot [pipeline, §4.7; GEO-24] | S10 | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition instead) → merge into the neighbour → insert an alley to give access → typed residue (court / vacant) | invariants: every plot has ≥ 1 access edge (100 %), 0 landlocked buildings; NG baseline 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [pipeline, §4.7; LC-2, FTG-1] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge); moves across districts happen only in the allocation's own reconcile (S7b) → reduce the manifest and report `unplaced` — decided eagerly, never by the order in which lazy districts are placed, and never silently (FTG V1 "would regularly give up") | O18 (f): 100 % of institutions on a plot meeting their requirement; districts derived in three random orders give identical digests (§6.5) |
| F-SITEPLAN† footprint does not fit [pipeline, §4.7 S11; FTG-13] | S11 | setbacks leave no rectangle ≥ the class minimum | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f): 100 % of footprints fit; 0 renderer fallback rectangles |
| F-SKELETON† skeleton fails [kernel, §3.8; GEO-8, GEO-2] | S11, S13a | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | labels: a sampled medial axis (§3.8, used by §9.3); roofs: a **plain roof** (VIS-11) — the footprint drawn with no ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8) | ladder-coverage fixtures (§13.1) render every downgrade and assert no roof line outside its footprint; 0 crashes on 1 000 holed polygons |
| F-LABEL† no fit [rendering, §9.4; GEO-29] | S13b (view side) | spine shorter than the text at the minimum size; unresolved collision at priority | shorter name form → straight label on the OBB axis → the 2019 OBB-arc → legend entry, with floors in pixels; placement is view data and never changes the model | "0 collisions" is a view invariant, tested by B-ZOOM at settled views and during a zoom sweep |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | the golden suite under a time-dilation shim (every clock read × 10 and × 0.1): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only (GEO-2) | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes identically to the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; an assignment cannot be honoured within its drift bounds; a warp would break an invariant; the effective scope holds protected entities whose fate is not *kept* | the dry run returns the conflict as an action — the nearest valid position, the blocking lock, or the edit-fate list for confirmation (§7.3); precedence lock > assignment > drawn geometry > rules (§7.7); never silently resolved | B-EDIT sequences and conflict fixtures; 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content | §7.3 local operators (S1, S4, S5, S6, S7) | a plot, footprint or yard lies in new water, in a new corridor, across a moved wall band or outside its new cell | re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts with a lifecycle event whose cause is the edit, listed in the edit-fate report; a locked or pinned entity is never demolished — its conflict returns to the dry run as F-EDIT | B-EDIT terrain-brush, river-control-point, drawn-way and drawn-wall sequences: 0 hard invariant violations; every demolition has an event |

=== REPLACE §5.3 The invariant suite (run after every batch and every edit) ===

### 5.3 The invariant suite, by scope (SCL-1)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
be flat from TOWN to METROPOLIS within ± 20 % (a cost test, §13.2, measured at M3). *Pre-decided fallback:* an
invariant whose batch-local check breaks that flat cost moves to stage-end scope — it is still hard, only checked later
in the same stage.

=== REPLACE §5.4 The generation report ===

### 5.4 The generation report

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

```ts
interface GenerationReport { outputVersion: string;
  stages: { name: StageId; work: Record<string, number> /* operation counts against the stage's declared work limits (§5.1) */; attempts: number;
    ladderUses: { cause: string; rung: number; tier: 0|1|2|3|4|5|6; entity: Id; key: string /* the stream key's textual form, §6.1 */ }[];
    invariants: { name: string; scope: 'batch'|'stage'|'save'|'ci'; pass: boolean; count: number }[] }[];
  requested: { feature: string; delivered: 'full'|'degraded'|'omitted'; tier: number; entity?: Id; cause?: string }[];   // §5.1 principle 7
  requestedVsBuilt: Diff[]; autoResolved: { param: string; value: unknown; reason: string; layer: OverrideLayer }[]; unserved: Id[]; unplaced: Id[];
  kernel: { engine: string /* 'plat-arrangement@<version>', §3.7 */; warnings: Record<string, number> /* W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED */; downgrades: number; workLimitHits: number } }
interface Telemetry { stageMs: Record<StageId, number>; timeOver: StageId[]; verifyMs?: number }   // session-only; never saved, never in any digest
```

The report is a **derived cache**: rebuilt by every derivation (and by the verification replay on load), saved only in
the document's `derived` section so the panel can show it before verification finishes, and excluded from the canonical
form and every digest (LC-24). It records stream keys **only for ladder uses** (any rung from tier 2 up, retries at attempt > 0
included), not for every stream the town used (SCL-11). Timings are telemetry: the worker host measures them outside the model
packages, the UI shows them, and nothing saved or hashed contains a millisecond. The same report object is the UI's
compact, dismissable panel (O16) and the API's `report(doc)`; every ladder use is replayable from its printed key
(MFCG's replayable attempts kept).

=== REPLACE §6 Determinism (the *In plain words* paragraph under the §6 heading) ===

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

*In plain words.* The same seed always makes the same town on any computer. Every decision is counted in steps, never
in seconds, so a slow or busy machine takes exactly the decisions a fast one takes; the few non-whole-number
calculations use a maths library that gives identical bits on every browser; and the town's fingerprint (its digest) is
kept up to date piece by piece, so checking it costs almost nothing. Every part of the town draws its random numbers
from its own stream, named by where that part came from — so adding a new kind of decoration or a new naming rule,
re-rolling one block, or growing the town by a stage never reshuffles what already exists. What is not promised: when a
release changes how an early step works (say, how side streets grow), the towns built on that step change too; the
release then says so, stage by stage, and never lets it slip by. A town someone has edited keeps its edits across such
changes anyway, because every building, plot and district has a permanent address that follows it, separate from its
random stream.

=== REPLACE §6.1 RNG and stream design ===

### 6.1 RNG and stream design

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
    the `regenerate` event as an explicit per-entity map; children draw with their derivation unit's reroll, so New
    random on a block changes that block's plots and nothing else;
  - **attempt** — the ladder's retry number (§5.1), restarting at 0 inside each reroll, cap 3;
  - **epoch** — `e` for draws made by epoch e (epoch 0 is the original town);
  - **salt** (COV-VG-VN-008) — a per-concern number in the recipe (default 0) that `rerollLayer(concern)` bumps (§7.1),
    only for non-geometry concerns: `naming`, `labels`, `render.instances`, `style.jitter`, `style.crowns`; geometry
    concerns take no salt (their reroll is the regenerate action), so rerolling the trees or the names moves nothing
    else.
  - Draws keyed by an ordinal rather than by an entity — the roster's prefix-stable `roster/<class>/<ordinal>` draws
    (§10.2, FTG-14) — use the class's registry entry as the derivation unit and the ordinal as the creation index,
    through the same mixer.
* **Concern registry (G-P6):** adding a concern is a reviewed change to a registry file; concern ids are u16,
  append-only and never renumbered, so adding a concern changes no other key. Initial concerns: `terrain.noise`,
  `terrain.controls`, `water.coast`, `water.river`, `water.islands`, `water.delta`, `site.centre`, `blueprint.features`
  (S0's per-rung feature draws, §4.2), `intent.surprise` (§7.7), `gate.pick`, `reserve.plaza`, `reserve.castle`,
  `reserve.precinct`, `reserve.water`, `roster` (with the ordinal-keyed `roster/<class>/<ordinal>` draws), `route`,
  `growth.heading`, `growth.branch`, `growth.mainroad`, `growth.curvature`, `district.seed`, `district.type`,
  `alloc.district`, `alloc.block`, `field.chance`, `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt`,
  `plot.width`, `plot.join`, `plot.vacancy`, `plot.bounds`, `siting`, `siteplan`, `siteplan.template`, `heights`,
  `material`, `greenery`, `fields`, `crop`, `forest`, `hinterland.outside`, `hinterland.decor`, `pin.centrepiece`,
  `pin.decor`, `pin.stall`, `people`, `content/relations`, `naming`, `naming.quarter`, `naming.emblem`, `labels`,
  `warp.jitter`, `epoch.transform`, `island.place`, `sewer`, `style.jitter`, `style.crowns`, `style.compass`,
  `render.instances`.
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
  character, entry mode, table pins — without edits, locks, assignments or salts; when the current document has edits
  the app first warns and offers to save it. *Chose a transparent successor (seed + 1) over deriving the next seed from
  the generator's stream state because seed + 1 survives any change of draw order and is readable in the link.* The
  references derive their successor from the stream state, which is reproducible within one build (VG's Enter chain
  replays per build, `coverage-audit-vg.md` VN-007; MFCG's successor is its deterministic stream state) but moves
  whenever a build changes its draw order; MFCG's Enter also drops explicit parameters and takes size and flags from a
  non-seeded source — PLAT does neither.
* Seed-exact parity with the references is ≈ 0 by the evidence and not a goal (`docs/CONFIDENCE.md` §1).

=== REPLACE §6.2 What a seed determines ===

### 6.2 What a seed determines, and the model digest

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

`model = G(outputVersion, base, log)` — a pure function, where the base is the canonical recipe (every model-affecting
input: seed, rung, table pins, the full effective parameter delta with preferences folded in, intent, character,
circumstance schedule, entry mode, salts, host table copies — §2.9) or a rebased state, and the log is folded in order
(§7.4). Nothing else reaches the model:

* no wall clock — every output-affecting limit is an operation count (§5.1);
* no host text engine — label **placement** (S13b) is view data, derived per zoom stop from the model's names and
  `LabelEntity` records and the bundled fonts' own metrics (§9), and is not in the model digest;
* no viewing order — a stage may be lazy only under the laziness contract of §4.1 (its output for district D is a pure
  function of eager upstream state and D's own streams, reading no other district's lazy output), tested by deriving
  districts in random permutations (§6.5);
* no worker timing — results merge in lineage order;
* one boolean and offset engine per output version on every host (§6.5, D-14);
* no host code — a host provider's outputs are read from the document's `hostContent` block on replay (§6.5, §2.9);
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
  the L2 digest. An entity's leaf takes the digests of the faces and chains it owns (its `FaceRef` and `ChainRef`
  resolved), so no coordinate is hashed twice. Coordinates enter in canonical order (a ring from its
  lowest-then-leftmost vertex); integers enter as 32-bit lanes, doubles as their IEEE-754 bit patterns (−0 normalised
  to +0; NaN refused by the schema), strings as UTF-8 — no text serialisation on the digest path, and no dependence on
  byte order.
* H128 is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with a fixed seed.
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance and derivation records (their own digest, §2.8); `style`, `view`, `derived`,
  `hostContent` and telemetry (§2.9); label placement decisions (S13b, view data, §9); and close-ups that have never
  been edited — a close-up is a pure function of its district's committed state, its
  sub-seed, strategy and params, and enters the digest under `closeups` with its first edit (LC-18, §7.4).
* **Maintenance:** at every batch commit the kernel re-hashes the leaves of the records the batch touched and the nodes
  on their paths to the root — O(touched × depth) — never by serialising the model (§3.3). The canonical text
  serialisation (sorted keys, integer coordinates, floats as shortest round-trip strings) is used only for golden files
  and exports.
* *Measurement (M0 d, decided before any golden is signed):* digest maintenance ≤ 5 % of each batch's own time at CITY;
  root finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY (the
  CI oracle and load verification use it).
  *Pre-decided fallback:* if maintenance exceeds 5 %, leaves are re-hashed at the next coarser batch boundary (per
  district instead of per block and plot); the root at every stage end is unchanged, so no golden moves.

=== REPLACE §6.3 Stable ids under feature growth and edits (the scope, stated) ===

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
  walls, water bodies, greenery), the stage run that created it. The creation index is the deterministic creation
  order of that unit's run, or the canonical order the stage declares (for faces and vertices: by their
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
  (records sorted by lineage hash), so the session and a replay resolve them identically.
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
| enceinte, water body, greenery, land use | overlap ≥ 50 % (IoU) | — | kind |
| household, person, label | (plot address, ordinal); (household address, ordinal); target address | — | — |

  *Split through an anchor:* when a cut passes exactly through an anchor point, the child left of the directed cut
  keeps the id (the kernel returns children in that order, §3.6 (5)). *Households and people* (LC-16): a household's
  address survives a re-derivation of its plot by succession (anchor: plot address and ordinal), so a person's key —
  (household address, member ordinal, birth epoch), §10.3 — is stable wherever the household is. *Measurement (M1, B-EDIT-lite):* 1 cm perturbations of every vertex
  keep ≥ 99.9 % of addresses. *Pre-decided fallback:* the building and plot radii double to 1 m and an IoU ≥ 0.5 test
  joins the class-family check.
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

*Measurement (M0 d and M1):* minting cost within the §12 stage budgets; B-EDIT fixtures for `drawBoundary`, district
merge and split, `outskirtToDistrict`, regenerate around a lock, and the recycling case (a superseded, assigned
building whose creation slot is reused) — 0 duplicate ids and 0 silent re-binds (every reference resolves to its
successor or is reported).

=== REPLACE §6.4 Permalinks and version axes ===

### 6.4 Permalinks, version axes, retention and goldens

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

**Version axes.**
* **Output version** (`o<k>`) — the observable output of the model packages. It bumps exactly when a release declares a
  shift (any stage digest moves on the golden suite, §13.3); a release that changes no output keeps its output version,
  so its documents, links and goldens stay valid. Every document and link names the output version it replays under.
* **Generator version** — the code build; informational (bug reports), never a replay key.
* **Schema version** — the file format (§7.5).
* **Table versions** — each rule table separately, pinned in the recipe; a table change that changes output is part of
  an output-version bump. A user override carries its base row's hash (§7.6).
* **Style version** — style sheets; changes pixels, never the model digest; carried in a link for pixel identity.

**Permalinks** (LC-15). A link carries the canonical recipe, never a pointer to machine state:
* `?o=<output version>&s=<seed, base 36>&z=<rung>` when the recipe is the output version's defaults apart from seed and
  rung (watabou's one-line link kept);
* otherwise `&r=<base64url of the deflated CBOR recipe delta>` (params with preferences folded in, intent, character,
  entry mode, salts, table pins that differ from the output version's shipped pins);
* `&l=<base64url of the deflated CBOR log>` when the town has a log (edits, locks, assignments — a blueprint's
  assignments are log events, §7.7), and `&st=<style id@version>` when the style is not the default.
* A link is emitted only when the whole URL fits in 2 000 characters; otherwise the app says why and offers a `.plat`
  file — or `&doc=<ref>` when the host has configured a document resolver (the `DocResolver` of §11.5).
  `preset=<id>` never appears: an edited preset elsewhere cannot change the town. CI: link → recipe → link identity,
  and the model digest built from a link equals the session's digest.

**Retention of old output versions** (LC-14). The browser library ships the current output version's model packages
and the two previous ones (N−1, N−2) as lazily loaded, tree-shakable chunks (`@plat/*-o<k>`; an embed may leave them
out); the Node CLI replays any published output version by installing that exact package version. A document or link
inside the window replays exactly. Outside it, a document opens as a frozen view (§2.9); a link — which has no
snapshot — opens under the current output version with a visible notice ("made with o5, shown with o8; differences are
expected") and the CLI command that replays it exactly. Nothing changes silently. *Measurement (M3):* each retained
output version adds ≤ 150 KB gzipped to its lazy chunk; the golden suite replays under N−1 and N−2. *Pre-decided
fallback:* the browser window shrinks to N−1 (the CLI keeps every version).

**Goldens** (LC-3; §13.3 builds the tooling from M1). **Stage-isolated goldens:** the golden store keeps, per seed and
stage, the previous output version's frozen upstream outputs; a release computes each stage's digest by running the new
stage code on those frozen inputs, so only stages whose own code or tables changed can differ, and each such stage needs
a shift record (stage, cause, seeds and statistics that moved, expected direction). **End-to-end goldens** are
re-signed only with a **cascade record** that lists every downstream stage whose digest moved and shows, from the
isolated goldens, that each moved only through its inputs; a downstream stage whose isolated golden also moved needs its
own shift record, so an unrelated regression cannot ride on an upstream shift.

=== REPLACE §6.5 Floating-point policy (as lint and test, G-P10) ===

### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
   host.
9. **Determinism tests (CI):** identical digests on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off;
   **time dilation** — the golden suite under a shim that scales every clock read × 10 and × 0.1 gives byte-identical
   per-stage digests (GEO-2); **derived-complete digest** — the districts of 50 METROPOLIS seeds derived in three random
   orders, workers on and off, give identical digests (the laziness contract, §4.1; §6.2); **headless = UI** (O11 f); **replay = session** — replaying
   base and log equals the session's digest on every B-EDIT sequence (§7.3); the double-run check of registered
   providers; and the distinct-key test of §6.1.
10. The optional WebAssembly accelerator of §3.7 — and the Clipper2-WASM engine, if M0 triggers that pre-decided
    fallback — must produce the same integer outputs, checked by a cross-implementation test on the golden suite.

=== REPLACE §7 Editing and regeneration locality — everything is editable (the *In plain words* paragraph under the §7 heading) ===

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

*In plain words.* Every change a person makes — pin a building, bend a street, draw a river or an island, brush the
prosperity field, rename a district, assign "the Guildhall" to a building, draw a house by hand, regenerate one block,
edit a rule table, grow the town by an epoch — is recorded, in order, as a small event on the permanent address of the
thing it changes. The town is always "a starting point plus the list of events", applied the same way on screen and
when the file is reopened, so edits can be undone, saved, replayed after regenerating a neighbourhood, and carried
across program versions. Anything the user has touched is protected: regenerating around it keeps it. When a change
reaches something the whole town depends on (one more gate, the coast on the other side), the program says so before
doing it and lists which edits are kept, which move to their nearest match, and which have nothing left to attach to —
nothing is lost silently. Otherwise regeneration is local: only what lies under the chosen area is re-derived, and
everything outside it stays byte-identical.

=== REPLACE §7.1 Edits are events on stable ids; four named actions; dry-run validation ===

### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

```ts
interface EditBase { seq: number /* never reset; survives rebase */; author: 'user'|'host'|'epoch'|'migration'; group?: number /* one undo step */ }
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
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
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id, number> /* absolute, per scope entity (LC-5) */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k (LC-4)
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke }          // a relative Δ; the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host' } | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host' } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: 'naming'|'labels'|'render.instances'|'style.jitter'|'style.crowns'; salt: number }   // COV-VG-VN-008
  | { t: 'convert'; op: ConversionOp /* defined in §4.11: wallToWay, gateToJunction, outskirtToDistrict, demolish, densify, and the decline hooks abandon, decay, ruin, clear, rebuild */ }
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number> }         // logged before the first edit inside a close-up (LC-18, PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // LC-11: an epoch is an event in the log (§4.11)
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128 }                                        // LC-13 (§2.9)
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap } );                                // LC-14 (§7.5); undoable
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position (LC-22)
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5, GEO-5): geometry is addressed by entity address,
by lattice point inside an arena, or by a ring.

**The named actions** (G-R4; O16-core) are separate operations with distinct semantics, never one flag:
* **Regenerate (keep settings)** re-derives the scope with each entity's *recorded* inputs and unchanged rerolls
  (§7.3): faithful, and byte-identical when nothing upstream changed; used after a lock or a drawn constraint.
* **New random** advances the reroll of every scope entity by one, written into the event as an absolute map, so a
  replay is exact and blocks at different rerolls each move on (LC-5).
* **Adjust** re-solves with a changed parameter. Locality is promised only for parameters the control registry (§7.8)
  lists as consumed at S10 or later, or that carry a spatial scope (a district's density, a block's granularity). A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  wealth level) is offered as **Re-derive from stage k**: everything from Sk down re-derives with carry-over (§6.3),
  and the user confirms the edit-fate report first (LC-4).
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
re-derivation of any face that then fails a class floor, logged (§3.6, GEO-10).

| MFCG tool | PLAT | semantics |
|---|---|---|
| Displace | `displace` | drags vertices under the brush by `dragCm`: full weight inside `innerRadiusCm`, falling linearly to 0 at `radiusCm` |
| Liquify (a softer Displace) | `liquify` | as `displace` with a smooth cosine falloff over the whole radius |
| Relax (repairs too-short mesh edges) | `relax` | Laplacian relaxation of the vertices under the brush toward equal edge lengths |
| Bloat (enlarges cells) | `bloat` | each L1 cell under the brush grows about its centroid by `strength`, neighbours yielding |
| Pinch (inverse of Bloat) | `pinch` | each L1 cell under the brush shrinks about its centroid |
| Equalize (regularises one cell's angles) | `equalize` | each cell under the brush moves its vertices toward equal interior angles |
| Rotate (the whole map about its centre) | the `rotation` view key (§2.9) | a whole-map rotation about the frame centre as view state — never a vertex operation, which would re-snap every vertex (§3.6): model north (+y) is unchanged; the compass is decoupled — its view key is `trueNorth` (default: it keeps pointing at model north) or `free` (its own angle, MFCG's behaviour) |
| Measure (a ruler, not a warp) | the ruler tool of `@plat/app` | measures metres between two points; no event |
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
(§4.12), and an invisible line through a block would leave a seam with no street to share.*

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
(PART II II.4).

**People** (COV-FTG-C12, C13). A lock with `paths` fixes chosen attributes of a person (name, age, role …); New random
on a person re-derives it with a new reroll keeping locked paths; relations and schedules are not re-derived by a
person reroll (they are town-wide, §10). `setAttrMany` edits many entities at once — job, workplace, schedule,
household (relocation) — from a query whose result is resolved to ids at dry run and stored, so a replay never re-runs
the query; it is one undo step.

**Edit targets — owner amendment 5.** The rule, clause by clause: every generated element is editable (the table
below); every rule table and preset is editable (§7.6), by a user through the preference layer and by us through new
table versions (§7.6); edits are first-class events that persist (the log, §2.9), undo (§7.4), survive regeneration
(§7.2–§7.3: protection, carry-over and fates) and migrate between versions (§7.5); the generator repairs around them
locally (§7.3's operators, F-REDERIVE); the preference and override layer sits above the defaults (§7.6). The entity
registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row, and a CI test fails if a
generated type has none:

| element | edit events |
|---|---|
| terrain | `setField(terrain)`, `drawWater` (hollows and lakes), `setAttr` on site features |
| water, coast, rivers | `drawWater`, `moveVertex` on shores and river control points, `setAttr` (bank class), `delete` |
| ways, junctions | `drawWay`, `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name) |
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
| history | `epoch`, `convert`, `rebase`, `upgrade` |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope (§7.3).
Conflicts come back as actions — the nearest valid position, the blocking lock, the fates to confirm — never silently
resolved; a warp that would break an invariant is halved and reported. Bridge commands from a host map one-to-one onto
these events and are logged with `author: 'host'` (§11; LC-31).

=== REPLACE §7.2 Locks, pins, user-drawn constraints, field brushes ===

### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

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
  drawn water through S1's water operator, drawn ways through S4's and S5's (arterials re-route to reuse them), drawn
  walls through S7's run re-trace, drawn boundaries through S6's regrouping, drawn greens through S12 on the covered
  faces, drawn footprints through S11 on the host plot. The session and a replay run the same code at the same log
  position, in the same canonical insertion order, so they produce the same digest (§6.5). The old rule "insert before
  the stage that would create the class" survives only as the explicit action **Rebuild around my drawings**: it moves
  the drawn constraints into the recipe as constraints of their stages, regenerates the town, shows the diff as a
  migration does (§7.5), and commits as a `rebase` (reason `drawnConstraintsRebuilt`). *Chose one ordered fold over
  hoisting drawn features before their stage because hoisting makes every reload regenerate a different town around
  them than the one the user edited.*
* **Field brushes** (LC-27; the field model is §4.5). A stroke is a relative Δ over the driver field (a path, radius,
  falloff and amount). The field is the driver field plus the stroke list composited in log order and **clamped once at
  the end**, so undo removes a stroke from the list and re-composites — exact, where a per-stroke clamp is not (+0.3
  then −0.3 on 0.9 would give 0.7). A stroke re-derives every block whose plot samples moved by more than τ = 0.01 of
  the field's range (§4.5), with the same τ on replay. Bands come from the town's `FieldBands` record and move only by
  an explicit `setAttr` on it or by an epoch, so a stroke in one quarter never re-bands another. An epoch keeps the
  stroke list and re-composites it over the epoch's new drivers. The **terrain** brush edits the heightfield raster under S1's local operator (§7.3): water is
  locked unless the stroke targets water.

=== REPLACE §7.3 Locality — the plat tree is primary; the dependency graph is the audit (G-P3) ===

### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set
   — which can be larger than the drawn area — is the effective scope, shown to the user before commit.
2. **Fine levels (L1 cells and below): tree scoping.** Every unprotected finer entity under the effective scope is
   discarded and the refinement stages re-run for those faces — with the recorded inputs and unchanged rerolls for
   Regenerate (keep settings), with advanced rerolls for New random. This is **sound by over-invalidation** and is the
   primary mechanism. S13a re-derives names and label candidates only inside the scope (a new entity never renames an
   existing one); S14 emits a `DisplayDelta` for the changed closure (§8.1); tiles meeting the dirty region are
   invalidated (§8.8); S13b, the view-side placement, re-decides only the placements whose boxes meet it (§9.2). In
   **replay mode** (load verification, migration) the log is folded on the model and S13a and S14 run once at the end.
3. **Coarse stages: a local operator each, with pinned boundaries** (LC-7). L1 and L0 are not per-face refinements —
   S4 routes across the frame, S5 grows a town-wide queue, S6 grows districts across cells, S7 traces an enceinte — so
   each has its own local operator:

| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |
|---|---|---|---|
| S1 terrain (terrain brush, site features) | re-evaluate the heightfield inside the stroke; beds, lakes and coasts are locked — the brush clamps against the water it borders | all water; the heightfield outside the stroke | — |
| S1 water (`drawWater`, a moved shore vertex, a river control point) | re-trace the edited reach from the nearest pinned upstream point to the first downstream point where the new course meets the old one (or its outfall); carve locally; re-lower the sea side of an edited coast stretch and clip contours (F-CONTOUR) | reaches and coasts outside the edit | Re-derive from S1 when the course leaves its drainage basin |
| S4 (`drawWay` of an arterial, a moved arterial vertex, a moved destination, the castle placed or resized) | re-route only the arterials whose corridors meet the edit region or whose destination moved | their endpoints; every spine outside the region | Re-derive from S3 when a destination is added or removed (gate count) |
| S5 (`drawWay` of a secondary, a deleted street) | regrow only inside the affected L1 cells, from the proposals whose origins lie there | the cells' boundary spines | — |
| S6 (`drawBoundary`, district merge or split, `outskirtToDistrict`) | regroup and re-type only the districts touching the region, the grower restricted to their cells | every other district | — |
| S7 (`drawWall`, a moved trace vertex, `wallToWay`, `gateToJunction`) | re-trace only the run between the nearest unaffected towers on each side | the rest of the trace and its gates | Re-derive from S7 when the enceinte kind or the gate count changes |
| S8–S11 | per cell, block and plot (tree scope, item 2) | — | — |
| S12 | the covered hinterland faces and greenery entities | — | — |

   After a coarse operator, F-REDERIVE (§5.2) re-cuts, re-fits or demolishes — each with a lifecycle event — the finer
   content the new coarse geometry invalidates; locked or pinned content returns a conflict instead. An edit with no
   local operator (a change of seed, rung, water setting or side, walls on or off, castle option, gate count, planned ↔
   organic, wealth level) is **Re-derive from stage k** (§7.1).
4. **Edit fates** (LC-8). The dry run lists every protected entity in the effective scope — locked, pinned, edited or
   assigned; hosting a pin; the target of a pinned label placement; housing a pinned or edited person; an edited
   close-up entity — with its fate: **kept** (a fixed input); **carried** (to its anchor-matched successor, §6.3, after
   the class-family check — an override moves with the address only if the successor's class family accepts the
   attribute, never by id alone); **orphaned** (no successor: the edit stays in the log, is listed in the document's
   orphan table and can be re-attached by the user); or **discarded** (only with "discard edits in scope", recorded as
   supersede events). The user sees counts and the list and confirms every fate other than kept; the confirmed fates
   are stored in the event, and a replay that computes different fates reports a mismatch.
5. **Recorded inputs** (LC-12). Each entity's provenance records the inputs of its last derivation — field samples,
   band, context and parameter digests, table slices (§2.8). Regenerate (keep settings) re-derives with those recorded
   inputs, so it reproduces an untouched entity byte-identically even after an epoch or a field edit elsewhere moved
   the current inputs; re-deriving with the current inputs is Adjust.
6. **The dependency graph is the audit.** `Provenance.deps` (every entity records what it read) serves (a) as the audit
   of item 7 and (b) as an optimisation for Adjust — invalidating exactly the closure of a changed parameter or table
   slice — only where the oracle has proven that stage's declarations complete; elsewhere tree scoping applies.
7. **The oracle** (GEO-11, LC-10, IMP-7; run on every B-EDIT sequence):
   (i) **replay = session** — replaying base and log in log order gives the session's model digest, on sequences that
   mix drawn features with later attribute edits, epochs and rebases;
   (ii) **outside the scope, byte-identical** — every entity outside the effective scope keeps its leaf digest;
   (iii) **content** — content and relation digests outside the scope are unchanged;
   (iv) **faithfulness** — Regenerate (keep settings) is checked by byte identity; New random is checked per regenerated
   scope against K ≥ 50 independent from-scratch generations of the same scope (same context, other rerolls): its
   median plot area, frontage width, density and attached share must lie inside those generations' central 95 % band,
   and a campaign fails only if the pass rate is below 0.95 at p < 0.01 (binomial) — FTG's "too snug" is the failure.

=== REPLACE §7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===

### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

**Replay semantics** (LC-10). The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay. Nothing is hoisted, and epochs, rebases and upgrades are events
like any other.

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it | inverse event | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query is resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record) | attribute names are schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`); per-vertex displacements only as a verification record | whole-step validation (§3.6): moved edges against swept triangles, the clearance invariant, global deterministic halving; pinned vertices are inputs to smoothing and cutting | undo record (moved vertices, re-derived faces) | the operation replays on the new model at its log position |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3) | undo record (the replaced scope) | the same geometry replays at its log position under the new version |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. abandon, decay, ruin, clear, rebuild) | context actions | lifecycle events with cause | log | structural ops on the plat (§3.4) with dependants re-derived; `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8) | undo record (members resurrect, tombstones return to live) | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls, confirmed fates | §7.3 | undo record: the faces, entities, lifecycle events and tombstones of the effective scope, O(scope) | the scope replays; fates are recomputed and compared |
| assign / unassign | assignment dialog / host API | `assignment` fields, `flags.assigned` | log; blueprint assignments at positions 0…k | the claims-first re-derivation of its scope (§7.7) | undo record | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7) |
| setField (brush) | prosperity / density / greenery / terrain brush | the stroke list; the composited field | log (strokes) | blocks whose inputs moved beyond the tolerance re-derive (§7.2) | the stroke leaves the list; the field re-composites (exact) | strokes are geometry and replay |
| editTable / editPreset / setStyle | tables editor, presets and style dialogs | the override layer (§7.6) | log: row operations by key, with the base row's hash | entities whose provenance cites a changed slice hash re-derive; a predicate table re-derives from its first reader stage with fates (§7.6) | inverse row operations | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal after the set is generated; when the entity was superseded, re-matched by position within 0.5 × the set's spacing, else orphaned and reported | inverse | ordinals are geometry-stable; re-match by position |
| rerollLayer | "reroll names / trees / decoration" | the effective salt: the recipe's initial value advanced by the log's `rerollLayer` events | log | naming: S13a re-draws every unedited name; instances, crowns, jitter: display only | the previous salt | replays |
| moveLabel / hideLabel | label handles | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b's placement (§9) | inverse | follows the label's target address; an unmapped target → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person (LC-16) | an explicit action or an edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2; LC-18) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position, and reports orphans | undo record | replays |
| epoch (LC-11) | `grow(doc, inputs)` (§4.11) or an entry of the circumstance schedule | the derived `EpochRecord`; lifecycle events with cause | log | the incremental path of §4.11 at its log position | undo record: the faces and entities the epoch replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase (LC-13) | keeping the saved town on a mismatch; keeping an old model; Rebuild around my drawings; editing a frozen import | the document's base | the base state and the event | replay starts from the rebased state | undo record: the previous base, kept in the file's undo section until discarded | the rebased state migrates by the schema chain; it is not seed-reproducible |
| upgrade (LC-14) | explicit, after the diff (§7.5) | the document's output version | log | §7.5 | the pre-upgrade model is the undo record, kept until the user discards it | — |
| host provider output (LC-31) | a host-registered provider's answer, after the double-run check (§6.5) | the document's `hostContent` block | `hostContent`, keyed by (provider id, version, input hash) | read from `hostContent` on replay, never re-requested | removed with the event that first requested it | replays without the host |

**Undo and redo** (SCL-5). Undo is linear: it removes the last event from the log and restores the state before it;
the removed event waits on a redo stack until the next new event. Every committed event keeps an **undo record**: the inverse event when one is exact,
otherwise the faces, entity records, lifecycle events and tombstones its effective scope replaced — so undo costs
O(scope), never a copy of the whole model. Records are kept for the session and saved in the file's `undo` section (the
last 64 events or 20 MB), so undo survives a reload; beyond them an undo replays from the nearest checkpoint and says it
is slow. **Checkpoints:** the engine takes a copy-on-write checkpoint (the arenas are chunked per district, so a
checkpoint costs only the chunks changed since the previous one) whenever the replay cost accumulated since the last
checkpoint passes 80 ms at the session's rung, and before every epoch, rebase and upgrade — so any replay from a
checkpoint stays ≤ 100 ms. *Measurement (M3):* undo of a CITY district regeneration ≤ 30 ms; undo memory ≤ 25 % of the
model's working set after 100 edits. *Pre-decided fallback:* the saved undo section shrinks to 16 events and
checkpoints are taken every 40 ms of replay cost. The enumeration test checks that every EditEvent kind has an exact
inverse or an undo record (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

**MFCG's recorded edit asks** (IMPROVEMENTS O9 (f): the list behind B6, which twelve users asked for). Each is a
scripted B-EDIT scenario that reports its locality share (entities outside the effective scope byte-identical) and its
invariant results (§13.2); "expressible" counts working, measured edits, not event names.

| ask | PLAT events | what re-runs |
|---|---|---|
| add a district | `drawBoundary` | S6 regroups the covered cells; S8–S11 where the class band changed |
| delete a district | `merge` (district into its neighbour) | S6 re-types the merged district; S8–S11 where the band changed |
| add roads | `drawWay` | S4 (arterial) or S5 (secondary) local operator; S8–S11 in the split cells |
| remove roads | `delete` (way) | S5 regrows the merged cell (or S4 re-routes); S8–S11 there |
| move / remove labels | `moveLabel`, `setAttr(hidden)` | view only — 0 model changes |
| set district colours | `setStyle` (a thematic row keyed by the district's address) | style only — 0 model changes |
| add / delete vertices | `split` (a way at a point), `merge` (edges), `moveVertex` | the L1 edit; S8–S11 in the touched cells |
| place the castle | `setAttr(castle, site)` | S4 re-routes the castle street; S7 re-traces its run when the castle is on the enceinte; the cells under the old and new reservations re-derive |
| size the castle grounds | `setAttr(castle, baileyArea)` | the reservation resizes; the cells under it re-derive; S7's run when on the enceinte |
| farms in chosen areas | `setAttrMany` (the land-use faces under a drawn region → arable) | S12 on those faces |
| draw walls | `drawWall` | S7 re-traces the run or adds an enceinte; F-REDERIVE on plots in the new band |
| draw bridges | `drawWay` (class `bridge`) across a river face | S4 with the deck pinned |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator re-traces the coast stretch and clips contours; F-REDERIVE |

=== REPLACE §7.5 Migration (G-P9) ===

### 7.5 Migration and upgrade (G-P9)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

`migrate(doc, to)` has two parts.

1. **The schema chain** — a sequence of pure, versioned transforms over the document format, forward only. A document
   whose schema is newer than the running library opens read-only with a message (view and export; LC-28).
2. **The upgrade** (a new output version) — an explicit, undoable `upgrade` event (LC-14):
   * the base and the whole ordered log — epochs included — replay under the new output version into a new model;
   * **the mapping**: entities of the old model are matched to the new one by kind, anchor within the kind's hysteresis
     radius, class family and, for faces and chains, overlap (IoU ≥ 0.5); a matched entity hands its address to its
     successor (§6.3), and edits follow it only through §7.3's class-family check; **nothing is matched by string
     equality**;
   * an unmatched edit is a reported **orphan**, kept in the log and listed in the orphan table, never silently bound
     to another entity;
   * an **orphaned lock re-imposes its last geometry** as a drawn constraint (a `drawFootprint`, `drawWay`,
     `drawBoundary` or `drawWater` event appended at the upgrade's position) unless the user drops it, so a locked
     building stays where it was;
   * a **diff** — entities changed, orphans, statistics deltas, and a per-epoch diff for a multi-epoch document — is
     shown before commit; the pre-upgrade model is the upgrade's undo record, kept until the user discards it.
   The user may instead **keep the old model**: the document stays at its output version while that version is inside
   the retention window (§6.4); outside it the document opens as a frozen view, and its one edit is a `rebase` (§2.9).
   FTG's "no way to regenerate old towns with new features" and "cannot be undone" are the weaknesses answered.

*Test (M3):* the golden suite replays under N−1 and N−2; a corpus of edited documents upgraded across one output
version keeps 100 % of edited entities or reports each orphan (O9 e); an upgrade undone restores the pre-upgrade digest
exactly.

=== REPLACE §7.6 The override layer and editable tables (G-P12; owner amendment 5) ===

### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

`effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events`, each
layer a sparse delta with provenance; setting packs are recorded in the recipe by id and version (§2.9); the UI shows
which layer set a value and the report lists auto-resolved values with reasons (O16 a–b).

* **Preferences are folded in at creation** (LC-15). When a document is created, the packs, the preset, the user's
  global preferences and any document overrides are copied into the recipe's `params` delta, shown in the panel as "from your
  preferences". A later change to the machine's preferences never changes an existing document; applying them is the
  explicit action "apply my current preferences", logged as one `adjust` per changed parameter with its locality class.
* **Tables have keyed rows** (LC-22). Every rule table — size ladder, stage regimes, way widths, granularity, site
  plans, class rules and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency
  graph, S0's feature probabilities — is versioned JSON: a map from a stable row key to a row whose cells carry
  `{value, unit, provenance: {source, date, note}, calibratable}`. Each table's schema declares its **readers** (the
  stages that consult it) and its **slice kinds** (row, weights, bracket, thresholds, match — §2.8).
* **Overrides are row operations, never positional patches.** An override records `{op, rowKey, field, value,
  baseRowHash}`; when a newer table version changes or removes that row, the override is reported as an **orphan** —
  kept, not applied — with the old base row, the new row and the user's value side by side.
* **Invalidation by slice** (LC-21). A table edit changes the hashes of the slices it touches, and exactly the entities
  whose provenance cites a changed slice re-derive (audited by the oracle, §7.3). A row inserted into a table that is
  read by predicate — a new class row that may now match entities that never consulted it — changes the table's
  match slice, and the stated fallback applies: **Re-derive from the table's first reader stage**, with the fate
  report.
* **Host tables** (LC-31) arrive as `editTable`, `editPreset` or `setStyle` events whose content is copied into the log
  with provenance `host` (source, date, version), so a document replays without its host (§11.4).
* **Users and us.** Users edit through the tables editor and presets dialog (the preference layer); we change the
  system through new table versions — a declared shift whenever output changes (§6.4). The corpus phase replaces values
  and updates provenance without code changes; the default path with no edits is byte-identical to the shipped defaults
  (O10 h).

=== REPLACE §7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===

### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

Three input layers above the parameter vector, all persisted in the recipe:

1. **Intent** (outcome targets): form archetype, size as population / area / buildings with a tolerance, water setting
   and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and region
   preset, defence level, density. **Expansion** is a pure function held in data: each intent field maps to internal
   parameters by `{param, fn: 'const'|'linear'|'smoothstep'|'table', args}` rows (tables interpolate linearly), evaluated
   in a fixed order. **Rows are continuous** (GEO-41): no rounding and no comparison inside a continuous control — a
   discrete outcome is a probability drawn per entity or a discrete control that declares itself (§7.8). Example —
   `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`, `granularity.joinMaxBonus = 2 · wealthLevel`
   (fractional: its fractional part is the probability that a candidate plot takes one more join, drawn from the
   `plot.join` stream), `greenery.parkPer1000 = lerp(0.1, 0.8)`; `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20,
   5)` degrees per 100 m of street, `growth.crossroadProb = lerp(0.02, 0.15)`, `avenues.probability = smoothstep(0.3,
   0.7, planned)` per eligible tier-1 way. Every internal parameter is documented (unit, range, effect, provenance, consuming stage) and reachable
   in the advanced panel (O10 a); the registry test proves 100 %. **Surprise me** (LC-30) draws every intent field from
   its declared range and weights on the `intent.surprise` stream of a fresh seed and writes the drawn intent into the
   recipe, so the town's link reproduces it.
2. **Character and circumstances**: a district character vector (wealth, density, age, function mix, planned / organic,
   greenery, fortification, building scale) supplied automatically per district and overridable; circumstances (era,
   economy, lordship, government, biome, season, threat, trade, population, terrain events, the landscape toggles) as
   data presets on a **timeline** that
   *schedules* epoch events — an epoch happens only as an `epoch` event in the log (§7.1, hook 8).
3. **Constraints**: pins and **assignments**:

```ts
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'; target?: Id /* one building / plot or one district */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */ }
interface PlacementCriteria { districts?: Id[]; districtKinds?: DistrictKind[]; prosperityBands?: string[]; minSpacingM?: number; nearM?: { to: 'water'|'gate'|'market'|'centre'|Id; maxM: number }[]; frontageClass?: WayClass[]; avoid?: Id[] }
interface PlacementSolver { solve(doc: Document, a: Assignment, fixed: Id[] /* mapped placements, kept */, exclude: Id[] /* locked entities */, rng: Stream): KernelResult<Id[]> }   // greedy max-min-distance by score with a bounded swap pass; reports infeasibility with the nearest achievable count
```

**Precedence at S10–S11: lock > assignment > user-drawn geometry > rule tables > defaults** (LC-9). A targeted
assignment on a locked entity (or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose
another target, or keep the lock; the dispersed solver never places a member on a locked entity. *Chose the lock above
the assignment because the owner's hook asks for precedence over the generator's own class rules, not over the user's
locks; a host that must override a lock sends an unlock first, and the log records it.*

**One path.** A blueprint's assignments become `assign` events at log positions 0…k when the document is created; every
`assign` event — from the blueprint, the dialog or the host bridge — runs the same claims-first re-derivation for its
scope (S10 step 3 on the target's block, or on the blocks of a dispersed assignment's chosen plots, §4.7), so an
assignment gives the same town whichever way it arrived. **Re-solving:** when a member of a dispersed assignment is
superseded without a successor, only that member is re-placed, with every mapped placement as a fixed point (the minimum
spacing is measured from them); nothing still mapped moves. **Epochs** keep placed members; members are added only by
an event that changes the count or the criteria, and are then placed with the existing members fixed.

A whole-neighbourhood assignment sets the district's character and class mix while every building stays individually
diversified by the class rules within the drift bounds; drift bounds are inputs to `BuildingGenerator.compose`;
assignments are events (persist, undo, migrate) and take precedence over class rules (O10 e). Stable addresses for
districts, neighbourhoods, plots and buildings that survive regeneration and edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints, growthProgramme,
signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a growth
programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town` and
`polycentric` (two or three nuclei, §4.2 S3); forms compose by growth stage (an organic core with a planned extension). O10 (g)'s classifier runs on
the signature vector.

=== REPLACE §7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15) ===

### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r1)

* **The control registry** declares for every control its output metric (e.g. `density` → buildings per ha;
  `wealthLevel` → median plot area and greenery share; `greenery` → private green share), its range, its **consuming
  stage** (the earliest stage that reads it), its **locality class** — *local* (consumed at S10 or later, or spatially
  scoped: Adjust is local) or *re-derive from Sk* (the action shows the fate report first, §7.1; LC-4) — and a
  **documentation anchor** that the app links from the control as context help.
* **Monotone and continuous, stated statistically** (GEO-41). Discrete stop rules downstream (the OBB band test, the
  straight-or-bent test, minimum widths, ladder rungs) make any single seed jump, so the promise is about the
  expectation. The CI sweep runs each continuous control over 21 evenly spaced steps × 50 seeds at TOWN and CITY
  (METROPOLIS nightly): **monotone** — the mean of the control's metric moves in the declared direction between adjacent
  steps, a reversal of at most 2 standard errors allowed; **continuous** — no adjacent step moves the mean by more than
  ε = max(3 standard errors, 3 × the median adjacent change of the mean); **per seed** — at most 10 % of seeds jump by
  more than 5 × the median per-seed step at any one step. The formula is fixed now; the standard errors and medians are
  what the M1 sweep measures. Continuous controls are smooth maps with no thresholds inside (VG's "1 vs 0.999" is the
  failure); discrete controls (walls on / off, form) declare their effect in the report.
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

Written after reading the landed drafts of the kernel (`r1-kernel.md`), pipeline (`r1-pipeline.md`) and rendering
(`r1-rendering.md`) areas. Their requests to this area are applied in the blocks above (listed in §3.5); the requests
below are what remains for their sections. Ids in brackets are the items each change serves.

### 3.1 To the kernel area

| # | section | request |
|---|---|---|
| K-1 | §2.1 [LC-1, LC-29] | None to write: this file carries the whole §2.1 block, including the kernel's own D1 wording for the Units and Layers bullets. Confirm it matches `PlatKey` as the kernel's §2.2 defines it (parts 1–3 are sky islands; addresses outside the ground arena are prefixed `<layer><part>/`). |
| K-2 | §3.4 [LC-1, GEO-5] | State that `setOwner` and `retypeEdges` are the calls §6.3's succession uses to re-own a successor's faces and roles under a carried address, in the same batch as the re-derivation. |
| K-3 | §3.3 [SCL-1] | The commit record's dirty set feeds both the per-level plat digests and the entity leaves of §6.2; name the maintenance budget (≤ 5 % of batch time, root finalisation ≤ 5 ms at CITY) there as well. |

### 3.2 To the pipeline area

| # | section | request |
|---|---|---|
| P-1 | §4.1, the stage-declaration bullet and the worker bullet [GEO-2, LC-1] | Each stage declares `{inputs, outputs, streamKeys, invariants with scopes, ladder, workLimits per rung, budgetMs per rung (reporting only), batch scope, lineageUnit}`. In the worker merge protocol replace "per-worker arenas with reserved id ranges" by "addresses and lineage keys derive from lineage (§6.3), so no id ranges are reserved; results merge in lineage order". The watchdog lives in `@plat/api`'s worker host (§5.2 F-BUDGET-TIME). |
| P-2 | §4.2 S0 [LC-9, LC-30, COV-MFCG-A03] | "The blueprint's assignments and edits become log events at positions 0…k when the document is created (§2.9, §7.7); the entry mode is the recipe field `entryMode`; auto-resolved features draw from `blueprint.features` (§6.1) and are reported." |
| P-3 | §4.7 S10 step (3) and S10b [LC-9, LC-30] | Claims-first applies to the scope of every `assign` event, not only to recipe data; S10b's entry point is read from `recipe.entryMode`. |
| P-4 | §4.11 [LC-11, LC-12, COV-NG-XA36, COV-FTG-M01] | `grow(doc, epochInputs)` appends an `epoch` event and runs at its log position (§7.1, §7.4). §4.11's `ConversionOp` — which §7.1's `convert` event now references instead of defining — must include the decline hooks `abandon`, `decay`, `ruin`, `clear`, `rebuild` (§2.8), and `build(...)` is the `build` event of §7.1. Replace "nothing that survives is re-rolled because its stream path is unchanged" with "nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3, §7.3)". |
| P-5 | §2.5–§2.7 entity interfaces, PART II II.1 [LC-1, SCL-12, SCL-5, LC-18, LC-12] | Every entity embeds `Identity` and `Lifecycle` (§2.8); plots, blocks and buildings carry the `DerivationRecord` of §2.8. Replace the stored `subseed: StreamKey` (District, Plot), `compositionSeed` (Building), `treeStream` (Greenery) and `NeighbourhoodRequest.subSeed` with accessors of the entity key derived from the lineage (§6.1). Store `ContextVector` as struct-of-arrays columns with `venueMix` referenced from the district, not copied per plot (SCL-5). |
| P-6 | §2.6 `Building.roof.kind` [VIS-11, COV-NG-XA36] | Add `'plain'` (the F-SKELETON downgrade, §3.8: the footprint with no ridge or hip lines) and `'none'` (a ruined building's roofless state). |
| P-7 | §10.3 people [LC-16; the pipeline's D-e] | The person key is (household **address**, member ordinal, birth epoch): the address is what survives a re-derivation of the household's plot (§6.3), whereas the household's lineage changes on New random. |
| P-8 | PART II II.1 rule 4 and II.4 [LC-18, LC-1] | A close-up is a derived refinement level outside the base digest until a `closeup` event (§7.1, §7.4); `SeamReport.superseded` lists §6.3's successions; "Same kind, new seed per district" is New random on the district. |

### 3.3 To the rendering area

| # | section | request |
|---|---|---|
| R-1 | §9 [LC-17, GEO-29] | Name the label edits as §7.1 does: `moveLabel` (sets `LabelEntity.pinned`) and `hideLabel` (sets `hidden`), both logged model events. |
| R-2 | §8.2 [COV-NG-XA36, the pipeline's D-l] | Beside the `ruin` program, add tone overrides keyed by `existence = abandoned` and `existence = decayed` (§2.8). |
| R-3 | §9 furniture [COV-NG-CR02, COV-MFCG-L03] | The compass's view key is `trueNorth` (default) or `free`; the map rotation is the `rotation` view key about the frame centre (§2.9, §7.1); the ruler (MFCG's Measure) is a furniture tool. |
| R-4 | §11 [LC-14, LC-1, LC-28, COV-FTG-C13, LC-15] | The version handshake compares the document's **`outputVersion`** (§6.4), not the generator version, with the output versions the client can replay. Ids cross the API and bridge boundary as `<docId>/<id>` (§6.3). Every export carries addresses and the supersedes table (tombstone → successor). `query` gains person facets: type, race, gender, profession, workplace, age range, household, district (COV-FTG-C13). The permalinks row points at §6.4's format; `&doc=` uses the `DocResolver` of §11.5. |
| R-5 | §12 [SCL-16, SCL-1, SCL-12] | Cite §7.8's proxy budgets per rung and §6.2's digest budgets (maintenance ≤ 5 % of batch time, finalisation ≤ 5 ms, full recompute ≤ 150 ms at CITY); stream keys ≤ 0.1 µs per key (§6.1), within the 0.3 µs §12.4 assumes. |

### 3.4 To the scope area

| # | section | request |
|---|---|---|
| S-1 | "The whole design in one page" [LC-3] | Replace "adding a feature later does not reshuffle existing maps" with "adding a new kind of decoration or name, re-rolling one block, or growing the town never reshuffles what already exists; a change to how an early step works changes the towns built on it, and each release declares such changes stage by stage; edited towns keep their edits through permanent addresses". |
| S-2 | §0.4, amendment 5's landing [AM-5] | "5 everything editable → §7.1 (the clause map, the edit-target table and the registry test), §7.2–§7.6, §2.8 (edit paths in the entity registry)". |
| S-3 | §13.1 [VIS-11] | The ladder-coverage fixtures exercise the plain-roof downgrade and assert that no roof line lies outside its footprint (the kernel's §3.8 bar). |
| S-4 | §13.2 [SCL-1, GEO-2, LC-2, LC-10, LC-1, LC-7, LC-21, IMP-16] | Add the CI tests of §6.5 (time dilation ×10 and ×0.1, the derived-complete digest over three district orders, replay = session, provider double-run) and of §5.3 (the digest-maintenance oracle; per-edit validation cost flat TOWN → METROPOLIS ± 20 %); a document-size test per rung (§2.9); restate the locality oracle as §7.3 item 7; the B-EDIT fixture list gains the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the id-recycling case), terrain-brush and river-control-point sequences, table weight edits and row insertions, drawn features mixed with later attribute edits, epochs, and the MFCG asks of §7.4 as scripted scenarios. |
| S-5 | §13.3 [LC-3, LC-19, LC-25] | Goldens are stage-isolated with a cascade record as defined in §6.4; shift records name the output version; built at M1. |
| S-6 | §14 [GEO-2, GEO-5, LC-5, LC-10, LC-13, LC-31, GEO-31] | `Stage` gains `workLimits: Record<Rung, WorkLimits>` and `lineageUnit`, and `budgetMs` is marked reporting-only; `StageContext.stream(concern, entity?, opts?: { attempt?: number; epoch?: number })` (the reroll is read from the entity's identity); `Scope = { kind: 'all' } \| { kind: 'entities'; ids: Id[] } \| { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } \| { kind: 'epoch'; epoch: number }` — no `FaceId` at the API; `EditEngine { apply(doc, e): ApplyResult /* Ok \| Conflict(actions) \| Confirm(fates) */; undo(doc); redo(doc); replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive' \| 'replay' }): Model; migrate(doc, to): { doc; diff }; rebase(doc, reason): Document }`; `PlatApi.regenerate(doc, scope, mode: 'keep' \| 'newRandom')` plus `adjust(doc, param, value)`; the dependency rules cite §6.5's allowlist lint and its vendored-source scan; `ContentProvider` registration requires the double-run check. |
| S-7 | §15.2 matrix [LC-3, LC-4, IMP-7, LC-14, IMP-16, SCL-16] | O2 (b) cites §6.3's scope of stability; O2 (c) restated per parameter class — entities outside the stage-k closure byte-identical 100 %, and edited entities kept or carried (not orphaned) ≥ 95 % for local actions and re-derivation from S7 or later, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3, measured at M3 on B-EDIT (pre-decided fallback if missed: §6.3's doubled anchor radii with the IoU test; if still missed, an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint, as an orphaned lock does in §7.5, so its fate becomes kept); O2 (e) = stage-isolated goldens; O9 (c) = §7.3 item 7 (iv); O9 (e) = upgrade keeps 100 % of edited entities or reports each orphan; O9 (f) = the MFCG asks as measured scenarios (§7.4); O16 (e) = six thumbnails < 1 s at TOWN. |
| S-8 | §16 milestones [SCL-1, SCL-12, GEO-2, GEO-31, LC-1, LC-19, LC-14, LC-13, LC-11, SCL-5, SCL-20, SCL-11, GEO-41] | M0 (d) adds: structured stream keys ≤ 0.1 µs per key; lineage-hash minting; Merkle maintenance ≤ 5 % and full recompute ≤ 150 ms at CITY; the time-dilation shim; the allowlist lint with the vendored scan. M1 adds: the output-version stamp, shift records and stage-isolated golden tooling; the B-EDIT-lite identity fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation); the document-size test (≤ 320 B per building at CITY); the control-continuity sweep. M3 adds: rebase and upgrade events, retention of N−1 and N−2 with the replay test, undo records and checkpoints (a CITY district undo ≤ 30 ms), per-edit validation flat ± 20 %. M4's exit adds: a document with interleaved edits and two epochs replays to the session digest; the 20-epoch growth test. |
| S-9 | Delegated decisions D-15, D-21, D-23, D-24, new D-26–D-28 [SCL-12, LC-1, LC-10, LC-13, LC-14, GEO-31, LC-3, GEO-2, SCL-1] | D-15 → "xoshiro128\*\* streams keyed from structured components (seed key, entity lineage, stage, concern, reroll, attempt, epoch, salt), the lineage separate from the address id, concern ids append-only; Enter = a new document with seed + 1". D-21 → "The document persists a base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and every version in the CLI; an upgrade is an undoable event". D-23 → add "with an allowlist lint (exact `Math` members only; `**` only with literal exponents 0–4, rewritten to multiplications; `ratio()` for computed divisors) that also scans vendored dependencies". D-24 → "Goldens are stage-isolated (new stage code on frozen upstream outputs), and end-to-end goldens are re-signed only with a cascade record". Add D-26 (identity: opaque lineage-hash addresses with survival and succession, §6.3), D-27 (work limits, no wall clock in the model, §5.1), D-28 (the Merkle model digest over the eager model's content, §6.2) — reversal cost "high after M1" for D-26 and D-28, "low" for D-27. |
| S-10 | Judgment calls | Append J-DET-1 … J-DET-15 from §4 of this file (renumber into the table's sequence). |
| S-11 | §17 dependency table [GEO-31] | Note on every adopted runtime library: vendored at a pinned version, scanned by the determinism allowlist, with an audit record kept in `@plat/kernel`. |

### 3.5 Requests received from the other areas, and where they landed

| from | request | landed in this file |
|---|---|---|
| kernel D1 | §2.1 Units and Layers wording | §2.1 block (new) |
| kernel D2 | snapshot geometry per `PlatKey`, one block per arena (§3.9) | §2.9 `Snapshot.geometry`, "What the snapshot holds" |
| kernel D3–D6 | F-NUM, F-CORRIDOR, F-SKELETON, F-WALL rows | §5.2 (F-SKELETON keeps the kernel §3.8 downgrade, a plain roof, rather than the D5 wording "clipped hip-from-OBB", because §3.8 itself states the plain roof) |
| kernel D7 | §5.3 kernel invariants and scopes | §5.3 first row and the geometry-reference row |
| kernel D8 | the report's `kernel` block | §5.4 |
| kernel D9 | per-level plat digests | §6.2 "Geometry is hashed once" |
| kernel D10 | anchor tie-break by §3.6 (5) | §6.3 |
| kernel D11 | lint `ratio()`; the WebAssembly sentence | §6.5 (3) and (10) |
| kernel D12 | `moveVertex` by `PlatKey` + lattice point; `warp` with `key` and `fromLevel`; scopes without slots | §7.1 |
| kernel D13, D14, D15 | drawn constraints as mandatory chains; the oracle; the warp row | §7.2, §7.3 item 7, §7.4 |
| kernel D16 | re-own faces and roles on succession | §6.3 |
| kernel D17 | named brushes as displacement fields; Rotate as view | §7.1 |
| pipeline D-a | ladder rows (F-CUT, F-WALL, F-CASTLE, F-ROUTE, F-RIVER, F-BUDGET-STAGE, F-SITING, F-PLOT, F-SITEPLAN, F-OUTLINE) | §5.2 |
| pipeline D-b | invariants (both-face setback, reservations, gate counts, quay reachability, carer references, bridges on deck and way, contours as a clip check) | §5.3 |
| pipeline D-c | concern registrations | §6.1 |
| pipeline D-d | digest over the eager model; derived-complete check | §6.2, §6.5 |
| pipeline D-e | household identity stable across re-derivation | §6.3 (by address; P-7 asks §10.3 to key people by it) |
| pipeline D-f | `convert` uses §4.11's `ConversionOp`; `FieldBands` re-banding; template replacement; pins only explicit; instance events for close-ups | §7.1 |
| pipeline D-g | τ = 0.01 of the field range; bands move only by `FieldBands` edits or epochs | §7.2 |
| pipeline D-h | Regenerate (keep) from the recorded `DerivationRecord` | §2.8, §7.3 item 5 |
| pipeline D-i | people row; close-up presentation row | §7.4 |
| pipeline D-j | setting-pack layer | §2.9 `Recipe.packs`, §7.6 |
| pipeline D-k | forms, expansion example, circumstances, character | §7.7 |
| pipeline D-l | `abandoned`, `decayed`, `ruined` | §2.8 |
| rendering §6.1 | decoration by lineage and ordinal; `render.instances`, `style.crowns`, `style.compass`, `naming.quarter`, `naming.emblem` | §6.1 |
| rendering §6.2 | placement excluded; names and `LabelEntity` hashed | §6.2 |
| rendering §7.1–§7.4 | `instance` event shape; warp only on Apply; tree brush as instance batch; S13a / S14 / S13b wording; row split; instance row | §7.1, §7.3, §7.4 |
| rendering §5.2, §5.3 | F-LABEL view-side; F-BUDGET-TIME reporting-only; labels out of the model invariants; name uniqueness kept | §5.2, §5.3 |
| rendering §2.9 | view keys last-writer-wins by (Lamport counter, session id); `hostContent`; document budget in §2.9; twin in world coordinates with the centre in its header | §2.9 |
| rendering digests and keys | cache revision from the entity digest; finalisation ≤ 5 ms; keys ≤ 0.3 µs | §6.2 (finalisation), §6.1 (≤ 0.1 µs) |
| rendering §7.8, §7 (LC-31) | proxy budgets; the bridge rule mirrored in §7 | §7.8, §7.1 (dry-run paragraph), §6.5 (8) |

## 4. Judgment calls for the architecture's table ("chose X over Y because Z"; each vetoable)

| id | call |
|---|---|
| J-DET-1 | Chose opaque address ids whose token is the hash of the entity's lineage key over hierarchical creation-order ids and over a per-kind high-water counter, because a hierarchical id breaks under re-parenting and recycles dead ids, and a counter depends on the order in which lazily derived districts and parallel workers mint, while a lineage-hash token is the same in any order; the tombstone check keeps "never reused" (§6.3). |
| J-DET-2 | Chose to keep the lineage (and so the draws) only for entities that survive un-derived, and to hand only the address to an anchor-matched successor, over carrying the lineage in both cases, because New random must really re-roll its scope while names, locks and assignments must follow the building the user means (§6.3). |
| J-DET-3 | Chose operation-count work limits for every output-affecting budget over wall-clock watchdogs, because a watchdog makes one seed give different towns on slow, throttled or busy machines; wall clock only postpones or resumes lazy work (§5.1). |
| J-DET-4 | Chose a Merkle digest maintained at batch commit over hashing the canonical serialisation, because the serialisation costs ≈ 1.2 s per CITY model (measured, SCL-1) and would run thousands of times per generation; the canonical text stays for golden files and exports (§6.2). |
| J-DET-5 | Chose to keep version stamps, rule slices, derivation inputs and deps out of the model digest (a separate provenance digest) over hashing whole entity records, because otherwise a release that changes no output changes every digest (§2.8, §6.2). |
| J-DET-6 | Chose one ordered replay fold — drawn constraints, epochs, rebases and upgrades applied at their log positions — over hoisting drawn constraints before their stage, because hoisting makes every reload regenerate a different town than the one on screen; hoisting survives only as the explicit "Rebuild around my drawings" rebase (§7.2, §7.4). |
| J-DET-7 | Chose a `rebase` event when a saved state is kept over leaving the recipe and log unchanged, because otherwise every later load, undo and migration silently switches back to the other state (§2.9). |
| J-DET-8 | Chose scoped undo records and cost-driven checkpoints over an eight-deep ring of whole-document snapshots, because one CITY snapshot is ≈ 80 MB (SCL-5) against a ≈ 100 MB heap (§7.4). |
| J-DET-9 | Chose output versions that bump only with a declared shift, with N−1 and N−2 retained as lazy browser chunks and every version installable in the Node CLI, over "the last N minor generator versions stay replayable", because a server-less browser library needs a concrete shipping mechanism and most releases change no output (§6.4). |
| J-DET-10 | Chose to make an edited attribute implicitly pinned (IMPROVEMENTS O9's rule) over protecting only locked entities, because users refuse to reroll districts holding work they "already baked in" and FTG's regenerate deletes it (§7.2). |
| J-DET-11 | Chose lock > assignment in the precedence order over assignment > lock, because the owner's hook asks precedence over the generator's class rules, not over the user's own locks; a host that must override a lock sends an unlock first, which the log records (§7.7). |
| J-DET-12 | Chose to recompute the prosperity, density and greenery fields on load over persisting their rasters, because the rasters gzip to 2.7–11 MB (SCL-11) against 3–8 MB document budgets while the drivers and strokes that define them are tiny (§2.9). |
| J-DET-13 | Chose to state control monotonicity and continuity over 50 seeds per step with a fixed ε formula over a per-seed ε, because the design's discrete stop rules make single seeds jump by construction; a per-seed test would fail or be tuned to pass (§7.8). |
| J-DET-14 | Chose to make `drawBoundary` snap to whole L1 cells over creating invisible `district_bound` edges through blocks, because every seam edge must be typed street, water, wall, field, cliff or frame for stage 2's `SeamContract` (§7.1). |
| J-DET-15 | Chose MFCG's whole-map Rotate as a view rotation with a compass that points at model north by default (and can be decoupled) over rotating model coordinates, because wind, sun, aspect and slope read model north and GeoJSON must stay in the model frame (§7.1). |

## 5. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read at source by this seat): every quotation and section reference of `docs/ARCHITECTURE.md` (read in
full, 2 200 lines); every item's claim and required change in `docs/validation/fix-all/index.json` and in the source
lens files (`redteam-lifecycle.md` read in full; `redteam-geometry.md` GEO-2, GEO-5, GEO-10, GEO-11 and GEO-31–GEO-42
read; `redteam-scale.md` SCL-1, SCL-5, SCL-9, SCL-11, SCL-12, SCL-15–SCL-22 and its `bench_state` appendix read;
`redteam-visual.md` VIS-11, `redteam-mfcg.md` MFP-12 and `redteam-ftg.md` FTG-21 read); the coverage rows COV-MFCG-L03,
COV-VG-VN-007/008/090, COV-NG-XA36/CR02 and COV-FTG-C12/C13/M01/M04; the MFCG warp-tool semantics and the
map-rotation / compass decoupling (`mfcg-posts-a.md` rows 4 and 11 and its tool list; `_critic.md` C4/C5); the O2 and O9
text of `docs/IMPROVEMENTS.md`; the landed drafts of the other areas where they address this area (`r1-kernel.md` §2.2,
§3.3, §3.6, §3.8–§3.10 and its requests D1–D17; `r1-pipeline.md` requests D-a–D-l; `r1-rendering.md` requests and its
§11.3–§11.4); the owner's rules (`OWNER-INSTRUCTIONS-2026-09-25.md`, including the decline passage,
and `AMENDMENTS-2026-09-25.md` item 5). The measured figures reused here (1 163 ms per canonical CITY hash, 0.73 µs per
string stream key, ≈ 80 MB per CITY snapshot, 1.36–5.72 MB per gzipped field raster, 593 KB for FTG's 2 798 buildings)
are the red team's executed benchmarks, quoted from their files, not re-run by this seat.

**PLAUSIBLE** (this seat's design reasoning; each is paired above with the M0 / M1 / M3 / M4 measurement that confirms it
and a pre-decided fallback): the ≤ 0.1 µs structured key budget; digest maintenance ≤ 5 % of batch time and full
recompute ≤ 150 ms at CITY; ≥ 99.9 % address survival under 1 cm perturbation with the stated radii; ≤ 320 B per
building at CITY; ≤ 150 KB per retained output version; the undo and checkpoint budgets; the proxy budgets; the
control-sweep sizes (21 steps × 50 seeds) and the ε formula; the hysteresis radii and class-family table. No executed
measurement was made by this seat.

