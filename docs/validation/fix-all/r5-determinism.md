# Fix-all round 5 — DETERMINISM area (§2.8, §2.9, §5, §6, §7): the ten items still open after round 4
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-determinism-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-determinism-r5` · 2026-09-26 · seat: fix architect, DETERMINISM area, round 5 (Fable role; opus
stand-in) · clean-room: every mechanism below is described in this seat's own words and numbers; no reference code,
grammar, palette, word list or content table is quoted.

Status: COMPLETE (2026-09-26).

## 0. How to read this file (plain words)

After round 4, the checkers left ten problems in the part of the design that makes the same seed give the same town,
keeps edits safe and handles failures: one serious and nine small. All ten are fixed here; none is postponed.

**The serious one: the fingerprint checks added in round 4 compared fingerprints made by different program versions.**
A town's fingerprint depends on the version of the program that computed it. So an old town opened read-only would have
been reported as damaged almost every time, and a town the owner once chose to keep from its saved copy would have
become read-only after the next ordinary program upgrade. Now each fingerprint is checked only by the version that made
it. A town opened in its own version is checked as before. An old town, beyond the versions the browser keeps, is shown
with the label "made with an older version; not verified by this one"; its files are still checked for damage. And when
a kept town is upgraded, the upgrade — the one moment both versions are loaded — checks it with the old version and
records its new fingerprint with the new one.

The nine smaller ones:
- On a slow machine, where the fingerprint check runs in the background, "trust the saved town" and saving now wait
  until that check has passed, so a damaged copy can never be kept.
- A name you renamed and then un-renamed (or locked and unlocked) now remembers which name list it came from. If that
  list changed in the meantime, the un-rename shows you the new name to confirm, instead of the name changing later by
  surprise.
- The renames you confirm are now stored with the edit, so a shared town and a reopened file can check that they got
  the same renames.
- Choosing your own street-name list for one culture now renames only that culture's streets, not its district names.
- The saved records that steer faithful regeneration and name changes now have their own fingerprint, checked when the
  town opens (about 4 thousandths of a second for a city, measured); a copy whose records are wrong is repaired from its
  recipe.
- A name list you selected, undid and can still redo now stays in the file across a save and reopen.
- A share link is no longer offered for a town kept from its saved copy, because a link can only rebuild the town from
  its recipe, which would show a different town.
- When a new program version stops shipping a setting pack a town uses, the upgrade now saves a copy of the pack inside
  the town's file.
- One test line now spells a water setting the one way the rest of the design does.

Each fix is written below as the complete new text of the subsection it changes (§2 of this file), followed by the
changes other areas must make (§3), the judgment calls to add to the architecture (§4), and what was measured versus
reasoned (§5).

## 1. Disposition table

| id | sev | disposition | sections changed [other areas' sections, by request] | mechanism, in one line |
|---|---|---|---|---|
| VD4-1 | major | FIX | §2.9 steps 2–4, `Base`, `Snapshot`; §5.3 load row; §6.2 Maintenance; §6.4 retention; §6.5 (9); §7.1 (`rebase.version`, `upgrade.baseDigest`); §7.4 rebase and upgrade rows; §7.5 [§3.9 KR5-1, §11.3 RR5-2 (c), §13.2 SR5-1, §16 SR5-2] | every recomputed-root check runs under the model packages of the output version that recorded the root; a rebased base has one **root of record** per version it was decoded under (the rebase's `stateDigest` under its new `version` field; each later upgrade's `baseDigest` under `to`, taken after checking the base under `from`); a frozen view checks content hashes only and is labelled "made with o<k>; not verified by this version", its `frozenImport` recording the current version's root; tests for a kept-and-rebased CITY town upgraded across a field-driver and leaf-encoding change and a frozen o(N−3) fixture |
| VD4-2 | minor | FIX | §2.9 steps 3–4; §6.2 (iii); §5.3 load row [§11.3 RR5-2 (b), §12.6 RR5-4, §13.2 SR5-1, §16 SR5-2] | under §6.2 (iii) "trust the saved town" and step 4's keep are offered only once the recomputed roots match (a mismatch withdraws them for good); saves, exports, API digest reads, bridged root comparisons and "verified" wait for the recomputation, edits do not; B-EDIT fixture with a forced (iii) |
| VD4-3 | minor | FIX | §2.8 (naming records); §6.3 case (4), protection sentence, fixtures; §6.5 (9); §7.3 item 4; §7.4 lock, setAttr, assign, rerollLayer, revert and undo/redo rows, truncation property [§13.2 SR5-1] | a `setAttr`, lock or assignment keeps the name's naming record dormant; the event that ends the protection (unlock, unassign, or an undo, redo or revert that frees it) runs case (4) for that name, the rename listed, confirmed and stored; a naming reroll's undo restores the records with the names; truncation-identity pairs `setAttr(name)` + `undo` and naming `rerollLayer` + `undo`, each followed by a corpus selection |
| VD4-4 | minor | FIX | §7.1 (`EditBase.renames`, `Rename`, `fates` on `editTable` / `editPreset`, dry-run sentence); §6.3; §7.3 items 4 and 7 (i); §7.4 persist columns; §7.6 [§11.2 RR5-1, §11.3 RR5-2 (a), §14 SR5-3] | every event whose fold re-draws a name by case (4) stores the confirmed renames in `EditBase.renames`; a replay or a receiving client that computes different ones reports a mismatch; an action that lists renames returns `confirm`; the predicate-table fallback's fates are stored on `editTable` / `editPreset` |
| VD4-5 | minor | FIX | §2.8 (`NamingRecord.slices`, `SliceRef.key`, "Rules cite slices"); §6.3; §7.6 [§9.6 RR5-3, §10.4 PR5-1] | a culture or ancestry row's field is its own naming slice — `SliceRef` kind `row`, key `<rowKey>/<field>`, hashed with the field's value and the named corpus's content hash; a record cites only the fields its draw read; fixture: a row with two corpora, one replaced, the other's names and records byte-identical |
| VD4-6 | minor | FIX | §2.8; §2.9 (`Snapshot.recordsDigest`, steps 2–3, "What the snapshot holds", digests); §5.3 save, load and replay rows; §6.2 (the records digest, (iii)); §6.5 (9) [§12.6 RR5-4, §12.8 RR5-5, §13.2 SR5-1, §16 SR5-2] | a records digest over the persisted derivation and naming records — schema-encoded, maintained at commit, stored in the snapshot, recomputed at load with the model tree (measured ≈ 4 ms CITY, ≈ 11 ms METROPOLIS) — a difference at load is a corrupt cache; the verification replay compares its own, and a records-only mismatch adopts the replay's state at `h₀` and re-applies the edits made meanwhile, then verifies |
| VD4-7 | minor | FIX | §2.9 (`packs` comment, the pack-set rule, `UndoRecord` with `redo`); §6.5 (9); §7.4 truncation paragraph and property; §7.6 [§13.2 SR5-1] | a truncated target is saved in the `undo` section (`UndoRecord.redo`); a pack's content stays while the base recipe, the log or such a held event names it, and leaves only when the redo entry is cleared or leaves the cap; test select → undo → save → reload → redo |
| VD4-8 | minor | FIX | §6.4 (link condition, message, chose-sentence, CI); §2.9 (`--recipe-only` refuses a rebased base); §7.4 rebase row (an undone rebase pair folds as a no-op from the recipe) [§16 SR5-2] | a link is emitted only when the base is the recipe; otherwise the app says the town was kept from a saved copy and offers the `.plat` file or `&doc=`; CI case with a `keptSnapshot`-rebased town |
| VD4-9 | minor | FIX | §2.9 (`Recipe.packs.shipped` informative; the upgrade copy; `frozenImport` pack path); §6.4 pack versions; §7.4 upgrade row; §7.5 (the packs bullet, `MigrationMap` defined with `packsSaved`, test) [§16 SR5-2] | before an upgrade commits, every pack of the pack set that `to` does not ship is copied into `packs` from `from`'s shipped copy and named in `MigrationMap.packsSaved`; a copy past the 2 MB cap is an F-EDIT conflict; a `frozenImport` needing a pack only an old version shipped goes through the CLI |
| VS4-5 | minor | FIX | §5.2 F-RIVER test column | "1 000 seeds × {`river`, `coast+river`} × rung", the `WaterSetting` spelling |
| D5-1 (found here) | minor | FIX | §2.9 `RebaseReason`; §7.4 rebase row's create column | `RebaseReason` listed `'keptOldModel'` and §7.4 "keeping an old model" as a rebase trigger, but §7.5's keep-the-old-model keeps the document at its own output version with no rebase, so no event could carry the reason; the value is removed and the create column says why (J-DET-51) |

Tally: 10 items — **10 FIX**, 0 INVALID, 0 STAGED-BY-OWNER — plus one found here (D5-1, FIX). Replaced subsections: §2.8, §2.9, §5.2, §5.3, §6.2, §6.3,
§6.4, §6.5, §7.1, §7.3, §7.4, §7.5, §7.6 (thirteen blocks in §2). Other areas' round-4 findings whose companion text is
folded into these blocks (their owners' round-5 wording governs): VD4-10, NP4-2, NP4-5, NP4-7 (c) (pipeline); VK4-1,
VK4-2 (kernel); NR4-3 (rendering); VS4-2 (scope) — §3's preamble.

## 2. Replacement blocks

Thirteen subsections are replaced, in document order: §2.8, §2.9, §5.2, §5.3, §6.2, §6.3, §6.4, §6.5, §7.1, §7.3,
§7.4, §7.5 and §7.6. Each block is the current integrated text of that subsection with this round's changes applied (a
script took each subsection verbatim from `docs/ARCHITECTURE.md` and applied every change as an exact, once-only
replacement; the paragraphs a change touched were re-wrapped at 120 columns, their other words unchanged). Companion
text of other areas' round-4 findings that lands in these subsections is folded in and marked with its id and "the
<area>'s wording governing" (§3's preamble lists it).

=== REPLACE §2.8 Identity, lifecycle, provenance, the entity registry ===

### 2.8 Identity, lifecycle, provenance, the entity registry

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

Every entity record has five parts: an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest), its
**attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's owner
and role tables, never through stored slots), a **derivation record** (the inputs of its last derivation — persisted for
the kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived —
rebuilt by every derivation, never persisted, never in the model digest; LC-25). An entity that carries a generated name
also persists that name's **naming record** (the naming inputs of its last draw — outside the model digest; VD3-2). The
persisted derivation and naming records are covered by the snapshot's **records digest**, which every load and every
verification replay check (§2.9 steps 3–4, §6.2; VD4-6).

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
interface DerivationRecord {            // persisted with plots, blocks and buildings (the kinds whose stage declares it, §2.5); outside the model digest, inside the records digest (§6.2; VD4-6)
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the recorded band hysteresis reads */;
  allocationRow?: number /* the Allocation row the entity filled (§4.5 S7b) */; epoch: number /* the epoch of the derivation */;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */ }   // the one definition; §2.5's plots, blocks and buildings use it
interface NamingRecord {                // persisted with every generated name S13a draws (VD3-2); outside the model digest, inside the records digest (§6.2; VD4-6) and hashed with provenance; handed to a successor with the name (§6.3); dormant while the name is edited, locked or assigned (below; VD4-3)
  slices: SliceRef[] /* the naming slices the last draw consulted: the grammar rows and weight vectors of the effective naming table, and, for every culture or ancestry row that chose a grammar or a corpus for it (§10.4), one slice per field of that row the draw read — kind 'row', key '<rowKey>/<field>', hashed over the field's value and, for a corpus field, the named corpus's content hash (§7.6; VD4-5) */;
  salt: number /* the naming salt the last draw used: the town salt, or the per-entity salt of the ids-scoped rerollLayer that drew it (§6.3) */; epoch: number }
interface Provenance {                  // derived: rebuilt by every derivation and by replay; stored as columns; never persisted, never in the model digest
  run: StageRunRef;                     // index into the stage-run table { stage, outputVersion, tablePins } — interned once per stage run, not copied per entity
  attempt: number;                      // the ladder attempt that committed it (§5.1)
  rules: SliceRef[];                    // every table slice the derivation consulted (§7.4, §7.6)
  deps: Handle[] }                      // u32 handles of the entities it read (the locality audit, §7.3)
interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; key: string /* a row key; '<rowKey>/<field>' for a slice that is one field of a row (§7.6; VD4-5) */; hash: Hash64 }
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
  successor (§6.3), is rewritten by every draw, and is what §6.3's draw case (4) and §7.6's invalidation by slice
  compare with the current effective slices to find the names whose naming inputs changed. It is persisted, like a
  derivation record and unlike provenance, because a rebased document — whose provenance no replay can rebuild — must
  still know which names drew from a changed grammar row or corpus. It is stored as offsets into the deduplicated
  slice-reference pool (below): ≈ 4–8 slices per name, ≈ 20–40 B raw per name, ≈ 0.1 MB raw for the ≈ 3 500 names of a
  CITY before compression, counted in §2.9's per-building document budget. **A protected name keeps its record dormant**
  (VD4-3). A `setAttr` on a generated name, a lock on its path (a whole-entity lock included) and an assignment that
  sets it (§7.7) leave the name's naming record in place and unread: no draw case reads, compares or rewrites it while
  the name is edited, locked or assigned, and it still travels with the address to a successor. So the event that ends
  the protection — an `unlock` or an `unassign` that frees the name, or an `undo`, `redo` or `revert` whose result
  removes the `setAttr`, `lock` or `assign` that held it — returns the name to unedited with the record of its last
  draw, and runs §6.3's case (4) for that name in its own dry run: if a slice the record cites changed while the name
  was protected, the name is re-drawn with the record's salt and the rename is listed for confirmation with the event's
  other renames (§7.3 item 4), the event's undo record keeping the former name and record. An entity whose name was
  never drawn has no record and nothing to re-draw. *Chose to keep the record dormant under a protection and to run case
  (4) when the protection ends, over deleting the record at a `setAttr` and over letting the next unrelated
  re-derivation find a stale record, because a deleted record hides an undone rename from a later corpus change — so the
  log with the undone pair and the same log truncated give different towns (§6.5 (9)) — and a stale record found later
  renames a name as a side effect of an edit that has nothing to do with naming.* *Chose a persisted naming record per
  generated name over reading a name's naming slices from its provenance, because provenance is never persisted and
  cannot be rebuilt after a rebase, so selecting a corpus in a rebased document could not tell which names drew from the
  corpus it replaces.*
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table, not
  in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool; all
  of it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). A release that changes no output changes no
  model digest. Provenance, derivation records and naming records share their own digest, used only by the locality
  audit; the persisted derivation and naming records alone also form the **records digest**, whose root the snapshot
  stores and the load and the verification replay check (§2.9 steps 3–4, §6.2; VD4-6).
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash: the
  whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold set
  for a band lookup, the row for a direct lookup — for a naming draw, one slice per culture or ancestry field it read
  (§7.6; VD4-5) —, and the table's match predicate set for a rule that selects rows by predicate. §7.6 invalidates on
  slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9), the naming record included
  for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); migration hooks
  (§7.5). A CI test fails when a type is missing from any path — generation, digest, render, export, persistence,
  edit, undo, migration (VG's palisade "ghost" cannot recur; O11 a; owner amendment 5, §7.1).

=== REPLACE §2.9 The document and serialisation ===

### 2.9 The document and serialisation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
  packs: PackData[];            // the content of every non-shipped pack of the document's pack set (below: the base recipe's packs and every pack an `adjust` of the pack list in the log names) and of every pack a truncated event held on a saved redo stack names (`UndoRecord.redo`; VD4-7) — a selected user corpus is one, `user:<hash>` (§7.6, §10.4; VD2-8, VD3-3) — canonical, outside the model digest (NF-D2)
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own model and records digests and verified by replay (below); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included (§7.4; VD2-4) — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[] };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records follow §7.4), with the truncated targets its redo stack holds (below; VD4-7); never canonical
}
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` — checked against its root of record for the replay's output version (load step 3; VD4-1) — and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2); VS2-6)
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed; rung: Rung; tablePins: Record<TableId, string>;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the shipped set of the output version that wrote the entry — informative only: a load resolves each pack by hash, from `packs` first, then from the running version's shipped packs, and the link rule reads the link's output version (§6.4); an upgrade to a version that stops shipping it copies its content into `packs` (§7.5; VD4-9); always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town
  intent: Intent; character: CharacterVector[];
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<RerollableConcern, number> }   // initial salts of the rerollable concerns only (normally 0), keyed by §6.1's registry-generated type; the schema refuses any other key (VD3-8), so a geometry concern can never carry a salt; rerollLayer events in the log advance them (§6.1)
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* the model's Merkle root, §6.2 — recomputed from the decoded state at every load, under the model packages of the output version that recorded it, and compared (load step 3; VD4-1) */;
  recordsDigest: Hash128 /* the root of the records tree over the persisted derivation and naming records, §6.2 — recomputed at every load and by the verification replay, and compared (load step 3; VD4-6) */ }
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields'; partition: string /* PlatKey and 'L0-1' (the level-≤ 1 routes) or a static-index partition (§3.3) — or, under the size fallback below, a block group — or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // `session` (an unshared document's stored authoring session, §7.4; a bridged client never writes it), time, location, favourites, notes and public notes, view pins, layer choices, `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), season, weather, frame, map rotation, compass, legend and emblem settings and `exportAnchor` (§11.1) — each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1)
type RebaseReason = 'keptSnapshot'|'drawnConstraintsRebuilt'|'frozenImport';   // keeping the old model at an upgrade needs no rebase: the document stays at its own output version (§7.5), so no reason names it
interface UndoRecord { session: string; of: number /* the seq of the event this record undoes */; record: Uint8Array /* its §7.4 undo record, compressed */;
  redo?: EditEvent /* an unshared document's truncated target held on this session's redo stack (§7.4): the event itself with its original seq, so a redo after a reload re-appends it; every pack it names stays in `packs` while it is held (VD4-7) */ }
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
  document is created — or an `adjust` adds a pack (§7.6) — the content of every pack of the pack set that is not in the
  output version's shipped set is copied into `packs`, and it **stays there while the base recipe or any event of the
  log names the pack, or a truncated event held on a saved redo stack (`UndoRecord.redo`, §7.4) does** (VD4-7): its
  content leaves `packs`, at the next save, only once none names it — a truncation (§7.4) removed the last logged event
  naming it, and the redo entry holding that event was cleared by a new event from its session or left the `undo`
  section's cap. An `upgrade` whose `to` version does not ship a pack of the pack set copies that pack's content into
  `packs` from the `from` version's shipped copy before it commits, and names it in its mapping (§7.5; VD4-9), so a pack
  a new version stops shipping stays resolvable after `from` leaves the browser's window. **A user-uploaded corpus is a
  pack like any other** (§10.4): selecting it wherever a corpus is chosen is an `adjust` of the recipe's pack list
  (§7.6) that enters it as `{ id: 'user:<content hash, base 32>', version: '1', hash, shipped: false }` with its content
  in `packs` — the corpus and the keyed row operation that binds it to the culture or ancestry row the user chose, so
  the binding is part of its content hash (§7.6); deselecting it is a second `adjust`, and its content stays saved
  because the first still names it — so a replay of the log always resolves it, and a town that has selected a user
  corpus can never emit a link that replays with other names (§6.4); an uploaded corpus outside the pack set is not a
  model input and is not saved. A host provider's outputs are copied into `hostContent` as they are produced (§11.4). On
  load each pack of the pack set is resolved by hash, first from `packs`, then from the library's shipped packs; a
  missing pack or a hash mismatch opens the document read-only with a message naming the pack, never a replay with other
  content. So a document replays on a machine that has neither the pack nor the host. Pack data and host content are
  counted outside the per-building budget below and **capped at 2 MB gzipped together**: a pack (a user corpus included)
  that would pass the cap is refused when it is added, with a message; a host provider's output that would pass it is
  refused at the provider call — nothing is recorded in `hostContent` — and the edit that requested it returns an
  **F-EDIT conflict** (§5.2) naming the provider and the size: an `ApplyResult` `conflict` through the API and, for an
  edit that came over the bridge, `doc.rejected { reason: 'invalid', conflicts }` (§11.2, §11.3). So nothing is ever
  committed with content a replay could not read. *Chose the pack set — every pack the base recipe or any `adjust` event
  names — over the effective recipe's current pack list as the set that is saved and that the link rule reads, because
  the log is replayed from its first event: a corpus selected and later deselected is still read by the replay of the
  first `adjust`, and a corpus selected after creation is not in the base recipe at all.*
* **Load** (the K-3 repair, completed by LC-13, LC-28, N-1, NR-8, VD3-1, VD4-1, VD4-2 and VD4-6):
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only. A document
     whose canonical form fails its schema — a `Recipe.salts` key that is not a rerollable concern among them
     (VD3-8) — opens read-only with a message naming the field, never replayed.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current version
     and records that it is not seed-reproducible before the rebase. **A frozen view is never checked against its
     recorded model root** (VD4-1): that root was computed by its own output version's model packages — their leaf
     encoding and field drivers among them — which the browser no longer holds, so a recomputation with the current
     packages would report a mismatch for almost every old document. The view checks each chunk against its content
     hash, which depends on the bytes alone, and is labelled "made with o<k>; not verified by this version" beside the
     CLI command that replays and checks it under its own output version (§6.4). A chunk whose bytes miss their content
     hash is reported as damage ("part of the saved copy is damaged"), its partitions drawn marked, and the
     `frozenImport` rebase is refused — a damaged copy is never a base — with the same CLI command. The `frozenImport`
     rebase decodes the state under the current version — its fields recomputed from their drivers and the stroke list
     (below), never from the Uint8 display copy —, checks its records root against `model.recordsDigest` (the records'
     encoding is the file schema's, so any version can check it, §6.2; a mismatch refuses the rebase as damage), and
     records the model root the current version computes as its `stateDigest`, with `version` = the current output
     version (§7.1); it resolves the pack set as a load does, and a pack that neither `packs` nor the current version's
     shipped packs hold refuses the rebase with a message naming the pack and the CLI command that installs the
     document's own output version, copies the pack's content into `packs` (the cap below applies) and rebases. *Chose
     to check a frozen view by its content hashes only, labelled as not verified, over recomputing its root with the
     current packages, because a root is a function of the model packages that computed it, so a cross-version
     recomputation cannot tell a damaged copy from an old one and would cheapen the real mismatch report.* A document
     without `model` outside the window (only the CLI writes one, below) cannot be shown as a frozen view: the app says
     so and shows the CLI command that replays it under its own output version (§6.4), and offers to open its recipe
     under the current version as a new document with §6.4's notice.
  3. Otherwise the document's output version is the current one or a retained N−1 or N−2 (§6.4), and everything below
     runs under **that version's model packages** — its decoder, its field drivers and its digest leaf encoding, the
     ones that recorded the roots it checks (VD4-1). The load **decodes** `model` — each chunk checked against its
     content hash, the arena rebuilt (§3.9), the entity columns decoded, the fields recomputed from their drivers and
     the stroke list (below) — and displays it at once. Before the decoded state accepts its first edit, the load
     **recomputes its digest tree** — every leaf and interior node of §6.2, one full recomputation from the decoded
     state (§6.2's ≤ 150 ms bar at CITY; measured ≈ 31–34 ms at CITY and ≈ 95–101 ms at METROPOLIS on a synthetic,
     schema-shaped workload, `docs/validation/bench/fixall_det_r4_loaddigest.out`) — and compares its root with
     `model.digest` (VD3-1); in the same pass it builds the **records tree** over the decoded derivation and naming
     records (§6.2; ≈ 4 ms more at CITY and ≈ 11 ms at METROPOLIS on the same kind of workload,
     `docs/validation/bench/fixall_det_r5_recordsdigest.out`) and compares its root with `model.recordsDigest` (VD4-6).
     The trees it builds are the working state's maintained trees from then on: every edit updates them at commit (§6.2
     "Maintenance"). **A model root or a records root that differs, or a chunk whose bytes miss their content hash, is a
     corrupt cache**: the report says so ("the saved copy of this town does not match its own fingerprint; it is being
     rebuilt from its recipe and edits"), the decoded picture stays on screen read-only and marked as damaged, and the
     document loads by replay (step 5), the replay's state becoming the working state when it reaches the log head; a
     corrupt cache is never verified, never a base and never offered as the saved town. A rebased document's
     `base.state` is checked the same way when a replay starts from it: its records root against
     `base.state.recordsDigest`, and its model root, computed under the packages the replay runs under, against **its
     root of record for that output version** (VD4-1) — the `stateDigest` of the `rebase` that installed it when that
     event's `version` is the replay's version, else the `baseDigest` of the later `upgrade` whose `to` is (every
     `upgrade` of a rebased document records one, §7.5). The document's output version is always the `version` of its
     latest rebase or the `to` of its latest upgrade, so an ordinary load always finds a root of record for its version,
     and the undo of an upgrade, replaying under `from`, finds the one recorded before it; a base kept under o5 and
     upgraded to o6 is therefore checked under o6 against the root o6 computed at the upgrade, never against o5's. A
     mismatch there opens the document read-only with a message, because no replay can rebuild a state that is not
     seed-reproducible. On a matching root the decoded `model` is at once the **working state** (NR-8): the user edits
     it immediately, and each edit is dry-run, logged and applied to it exactly as in a verified session, at §12.6's
     edit cost — no edit waits for the verification replay. In parallel a **verification replay** folds (base, log) up
     to `h₀`, the log head `model` materialises (`model.seq`), in replay mode — every model stage at its event's log
     position exactly as in the session, S13a's scoped delta included; only the view stages S14 and S13b suppressed
     (§7.3) — and compares its model root and its records root at `h₀` with `model.digest` and `model.recordsDigest`. It
     runs in a pool worker on its own arena, its own per-district stages with pool size 0 on that worker — the same
     overlay-and-merge path, identical digests by construction (§3.3 step 5), each freeze it reaches first rebuilding
     the partitions its folded edits left dirty (§3.3 step 1; VK3-5) — so the replay holds no frozen copies either, and
     §12.8 counts the replay's model in place of the pool's frozen arena copies because **no copy is frozen while it
     runs** (VD3-5): every edit made meanwhile runs its per-district stages (S10, S10b, S11, S12b) in the generation
     worker by the pool-size-0 path (§3.3 step 5), which gives the digests the pool gives by construction, so the
     replay's worker is never contended and the working set stays on its counted line; an edit whose scope spans several
     districts costs its single-worker figure (§12.4) until verification ends. With pool size 0 the replay runs in the
     generation worker, on its own arena beside the working state, and yields to each user edit at its next batch
     boundary (J-I14). Two kinds of edit need what only the replay rebuilds — provenance, which the snapshot does not
     store (below) — and are held until the replay reaches `h₀` and hands its provenance to the working state (for every
     entity the edits made meanwhile did not re-derive): `editTable` and `editPreset`, whose invalidation reads recorded
     slices (§7.6); every event after a held one waits behind it, so the fold keeps log order. An Adjust meanwhile uses
     tree scoping, which the oracle proves output-identical to the dependency-graph route (§7.3 items 6–7). **The
     working state is verified only when both model roots equal `model.digest` and both records roots equal
     `model.recordsDigest`** — the decoded state's, checked before its first edit (under §6.2 (iii), before anything
     that relies on them, below), and the replay's at `h₀`; the edits made meanwhile are then verified with it, because
     they were applied to a state proven equal to the replay's at `h₀`. **A records mismatch** — the replay's model root
     at `h₀` equals `model.digest` while its records root does not, as when a writer stored a wrong derivation or naming
     record and hashed what it wrote — changes no model and asks nothing: the replay's state at `h₀`, records included,
     replaces the working state, and every event logged after `h₀` is re-applied to it in log order as "take the
     replayed town" re-applies them (step 4), because an edit made meanwhile may have read a wrong record (Regenerate
     (keep settings) reads derivation records, and case (4) naming records and their salts, §6.3); their fates and
     renames are recomputed and differences reported, the report says "the saved copy's derivation or naming records
     differed from what its recipe gives and were rebuilt", and the working state is then verified. *Chose to re-apply
     the edits made meanwhile on the replay's records over replacing the records only for the entities those edits did
     not re-derive, because an edit that read a wrong record would otherwise keep a result that no later replay
     reproduces.* The user may end the wait by choosing "trust the saved town", which keeps the saved town as in step 4.
     It is offered only once the decoded state's own model and records roots have matched — before the first edit on the
     normal path, and under §6.2 (iii) when the off-edit-path recomputation matches (VD4-2): until then it is shown
     disabled ("checking the saved copy…"), and a mismatch withdraws it for good, the saved copy being a corrupt cache.
     Under (iii) a save (which records the maintained roots), an export, an API digest request, a `verified` report and
     a bridged client's comparison of its root with a `rebase`'s `stateDigest` (step 4) made before that recomputation
     finishes wait for it and complete when it does; edits do not wait, which is what (iii) is for. *Budget and
     measurement (M2a; METROPOLIS at M2b):* **open-to-editable** — from the file's bytes in memory to the working state
     accepting its first edit — ≤ the time §12.5's law gives to generate a town of the document's building count with
     the pool, T(B) (at CITY ≤ 60 ms + 60 µs × B: 330–420 ms at the default request), so opening a saved town is never
     slower than generating it; on the reference 300-edit CITY document, with pool size ≥ 1, an edit made 100 ms after
     the state becomes editable applies within its §12.6 cost + 10 ms; with pool size 0, within its cost + the longest
     replay batch at the rung (reported); the picture is on screen before the state is editable (S14 from the decoded
     model). *Pre-decided fallbacks:* if the recomputation passes §6.2's bar, it leaves the edit path by §6.2 (iii); if
     open-to-editable then still passes T(B), the kernel rebuilds each L2–L4 static index partition at the first query
     that reads it instead of at load (§3.9) — output-neutral, because every query result is sorted by its canonical key
     whichever structure holds an item (§3.3) — and if the bar still fails it is restated at the measured value as a
     declared budget amendment in the release notes and the judgment table, reported for the owner's veto, the picture
     still appearing at once; if the pool-size-≥ 1 edit bar fails for CPU contention, the verification replay pauses
     while an edit is applied and while the user has edited within the last 2 s, then resumes — scheduling only, never a
     model change. *Test (B-EDIT, M2a):* a snapshot in which one building's footprint was moved and `model.digest` left
     unchanged — once with its chunk's content hash rewritten to match the moved bytes, once without — is reported as a
     corrupt cache and loads by replay: it is never verified and never offered as the saved town, and the session's
     digest after the replay equals a fresh replay's. The same snapshot under a forced §6.2 (iii): "trust the saved
     town" and a save wait until the recomputation ends, the mismatch withdraws the keep, and the snapshot is never kept
     (VD4-2). A snapshot with one altered naming record — its `recordsDigest` left as written: a corrupt cache at load;
     rewritten to match: loaded, reported by the replay as a records mismatch, the edits made meanwhile re-applied, then
     verified, and a corpus selection made afterwards renames exactly what a session that never saved renames (VD4-6).
  4. A **mismatch is never silent** and is resolved once, by the user's choice. **Keep the saved town** (offered, under
     §6.2 (iii), only once the saved copy's own roots have matched, step 3; VD4-2): the base becomes the rebased state
     `model` at `h₀` (`Base.seq = h₀`) and a `rebase` event with `at = h₀`, `stateDigest = model.digest` and `version` =
     the document's output version (reason `keptSnapshot`) is appended at the head (`EditEngine.rebase(doc,
     'keptSnapshot', h₀)`, §14); the edits made during verification already stand on that state and stay as they are.
     **Take the replayed town:** the replay's state at `h₀` (its arena and entity columns, transferred to the generation
     worker) replaces `model`, and every event logged after `h₀` is re-applied to it in log order through the ordinary
     fold — they are log events, so this is their replay; each one's confirmed fates are recomputed and a difference is
     reported as §7.3 item 4 requires, and their undo records are rebuilt by the re-application. Either way the document
     is consistent after the choice, the next load does not report it again, and undo below a rebase uses the rebased
     state, never a replay from the seed. A rebase fills in, from the rebased state, the derivation record of any entity
     that lacks one, so Regenerate (keep settings) stays defined for every entity. **In a document attached to a host
     bridge** (VD3-4) only an `owner` client may keep the saved town (its `rebase` travels through the host like any
     event, §11.3). Every other client takes the replayed town for its own working state, reports the mismatch, records
     its root at `h₀` and **keeps the bytes `doc.load` delivered** (the compressed document, ≤ 3 MB at CITY) until the
     mismatch is settled or its session ends. A client that receives a `rebase` with reason `keptSnapshot` whose `at`
     lies behind its log head and whose `stateDigest` differs from its own root at `at` **installs that base**: it
     decodes `model` from the kept bytes and checks it as in step 3, makes it the rebased base (`Base.seq = at`),
     re-applies every event after `at` through the ordinary fold — their fates recomputed and differences reported (§7.3
     item 4), their undo records rebuilt, as "take" does in the other direction — and tells its user that the owner kept
     the saved town. A client whose verification is still running when that `rebase` arrives stops it, because the base
     is settled; a client whose root at `at` equals the `stateDigest` changes nothing; any other `rebase` whose `at`
     lies behind the head (possible only in a hand-built log) is a reported no-op, identically everywhere. A client that
     loads a document whose log already holds a `keptSnapshot` rebase with `at = model.seq` and `stateDigest =
     model.digest` — the host kept serving the bytes from before the owner's choice — takes `model` as that rebased base
     after step 3's check, without a verification replay and without asking, since the owner has chosen; the next owner
     save writes the base in its rebased form. So every client of a bridged document reaches the owner's state, as
     §11.3's convergence rule requires. *Test (B-EDIT, M2a):* open an edited CITY document, edit within 100 ms of the
     state becoming editable, force a mismatch (a snapshot in which one building's footprint was moved and whose
     recorded digest was recomputed to match it) and take each choice in turn: the edit is applied at once, and after
     either choice the session's digest equals the digest that a fresh load of the saved document replays to, and that
     load reports no mismatch. *(M3a)* §11.3's convergence test includes a forced mismatch settled by an owner's keep
     while two editors edit on the replayed town. *Chose to apply edits at once on the displayed snapshot, with the
     verification replay beside them, over queueing them until verification ends, because §12.6 puts verification at ≈
     1.4 s for the reference mix and ≈ 11 s for 300 district regenerations, while an edit must redraw within 100 ms (O12
     (b)); the edits are ordinary log events, so a mismatch only changes the state they are re-applied to. Chose to
     recompute the decoded state's own digest before its first edit, over trusting its chunks' content hashes, because a
     content hash proves only that the bytes are the ones written, not that they encode the model whose root was
     recorded — a writer or loader bug, or an altered file, would otherwise be edited and declared verified. Chose to
     let a non-owner client keep the served bytes and install the saved town when the owner keeps it, over making every
     client wait on the snapshot for the owner's choice, because an owner who is absent would leave the editors working
     on a state the replay has shown to differ, while the kept bytes cost ≤ 3 MB and a re-decode.*
  5. A document without `model` inside the window loads by replay — as does a corrupt cache (step 3); `model` is a
     cache, never the only copy of anything.
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records and naming records, §2.8); **provenance is
  not stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full
  resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2); the
  snapshot carries only a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document
  is ever opened as a frozen view. Neither digest tree is stored: the snapshot holds the two roots, `digest` and
  `recordsDigest`, and the load recomputes both trees (step 3). The report records stream keys only for ladder uses (any
  rung from tier 2 up), never every key.
* **Content-addressed chunks; one copy of a rebased state** (NF-D5, VD2-9). A snapshot is serialised as chunks, each
  keyed by its 128-bit content hash and written once in the container however many snapshots reference it; the kernel's
  layout is §3.9's. Per arena, the **level-≤ 1 routes** form one chunk — every vertex of birth level ≤ 1 and every L0–L1
  edge stored between its level-≤ 1 endpoints, so the finer Steiner vertices that later split it are not part of it —
  and the L2–L4 geometry of each static-index partition (one per district plus one outside districts, §3.3; the same
  units as §7.4's copy-on-write checkpoints) forms one chunk each: the vertices born there, the edges of level ≥ 2
  inside it (district boundaries are always L1 edges, §2.2 rule 1, so every such edge lies in one partition), the
  **Steiner splits** its batches made on L0–L1 edges and the finer roles they added to those edges' sub-edges. **Every
  reference to geometry another chunk holds is by lattice point**, never by (chunk, index): a vertex is unique per
  lattice point in its arena (§3.10), so an L0–L1 vertex, or a vertex on an L1 edge two partitions share (the foot of a
  wall- or margin-band cross edge, §4.7 — written in the chunk of the partition with the smaller key), is named from any
  other chunk by its position. A chunk's bytes therefore depend only on its own partition's content: an edit that
  renumbers one partition's vertices rewrites that chunk alone, and the level-≤ 1 chunk only when the edit changes a
  level-≤ 1 route, promotes a vertex into one, or demotes a vertex or an edge out of one. Entity columns are chunked per
  partition; the archive, the lifecycle history and the field cache are town chunks. A rebased document's `model`
  therefore shares every unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only a chunk
  list naming `base.state`'s chunks (the same digest), and after edits only the chunks of the partitions those edits
  touched are stored twice. *Chose content-addressed chunks over a bespoke delta format because the partitions already
  exist for the static indexes and the checkpoints, deduplication by hash is exact, and a loader needs no delta logic;
  and chose references by lattice point with level-≤ 1 routes in the coarse chunk over (chunk, index) references,
  because an index into another chunk changes whenever that chunk's partition is renumbered, which would make every edit
  rewrite its neighbours and the coarse chunk too.*
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population (≈
  212 B per building; PLAT also stores plots, yards, heights, lifecycle and the naming records of §2.8, and derives
  people); pack data and host content are counted separately (above). This section holds the document budget (§12
  carries memory, not the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and at M2a one
  on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document; §16).
  *Pre-decided fallback if CITY exceeds 320 B per building:* the vertex stream switches to second-order (predictive)
  delta coding — each vertex stored as its difference from the straight-line continuation of the previous two along its
  first edge — with x and y in separate streams; the change is lossless and output-neutral, so no golden moves.
  *Pre-decided fallback if the rebased document exceeds 1.25 ×* (VD2-9): the L2–L4 geometry and entity chunks are cut
  per **block group** instead of per district — a district's blocks grouped by the 200 m world-grid cell that holds each
  block's lowest-leftmost vertex, so an edit rewrites only the groups whose blocks it touched — and the test re-runs; if
  the ratio still exceeds 1.25 ×, the bar is restated at the measured ratio as a declared budget amendment in the
  release notes and the judgment table, reported for the owner's veto, while the rung's absolute budget above (CITY ≤ 3
  MB) stays the hard bar for rebased documents too. Both steps are output-neutral: chunking changes bytes on disk, never
  the model or its digest.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  `nextSeq`, base recipe, log, pack data, host content, style, the snapshot chunk lists) + binary blocks (the chunks, by
  hash) as typed arrays. Saving from the app or the API **always writes `model`**; only the CLI's `--recipe-only` export
  writes a document without it (test fixtures and files made from links), and it refuses a rebased base, whose state its
  recipe cannot rebuild (VD4-8). The compact twin for embeds (CBOR with typed-array tags) encodes the same schema in
  world coordinates, with the settlement centre recorded in its header (§11.1), so it round-trips exactly (O11 c).
  Exports are views (§11) and carry address ids plus a supersedes table (§6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `nextSeq`,
  `base`, `log`, `packs`, `hostContent`, `style` and `model` (when present); `view`, `derived` and `undo` are never
  canonical. Four digests: the **model digest** (Merkle root over model content, §6.2 — goldens, verification, the
  locality oracle), the **records digest** (Merkle root over the persisted derivation and naming records, §6.2 — the
  load's check and verification, steps 3–4; VD4-6), the **provenance digest** (provenance, derivation records and naming
  records, §2.8 — the locality audit only), and the **document digest** (over the canonical bytes — save → load → save
  identity). The bridge's concurrency token is `logHead` = a 128-bit hash of (`docId`, log length, hash of the last
  event) (§11.3; named in our own terms, FTG-22).
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

=== REPLACE §5.2 Failure classes: detection, ladder, test ===

### 5.2 Failure classes: detection, ladder, test

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; earlier revision fixall/integrate-r3; drafted by fixall/draft-determinism-r3

Rows marked † carry a ladder whose mechanism another area owns (named in brackets, with the section that states it);
the row repeats that area's rungs so this table and §3–§4, §9 agree.

| class | where | detection | ladder (in order; each rung deterministic from the stream key) | how it is tested |
|---|---|---|---|---|
| F-NUM† precision failure of an optional chain [kernel, §3.6; GEO-3] | kernel | `E_OUT_OF_RANGE`, `E_BELOW_MIN_EDGE`, `E_BELOW_MIN_ANGLE`, `E_SELF_INTERSECT` (optional chains); warnings `W_SNAP_PASSES`, `W_ACUTE_CORNER` | optional chains only (growth proposals, optional lanes, decorative lines): re-propose from the next attempt stream → reject the chain with a report line (a proposal that cannot be inserted is simply not a street). Mandatory chains (coasts, shores, banks, rivers, wall traces, arterials, band and kerb edges, plot lines, user-drawn geometry) cannot fail for a precision reason after attraction (§3.6); `E_OUT_OF_RANGE` is a bug that aborts the batch with its stream key; `E_LOCKED` goes to the dry run (F-EDIT) | B-FUZZ: 10⁶ random concave, holed, thin, near-collinear, self-touching and snapped inputs per primitive, plus constructive degeneracies (§13.1): 0 crashes, 0 hangs, 0 self-intersecting outputs, 0 undeclared slivers (O3 a); 0 mandatory chains rejected on B-CITY |
| F-CUT† bent cut fails [pipeline, §4.6; GEO-23] | S8, S10 | `E_NOT_TWO_CROSSINGS`; a child fails simple / min area / min width / min angle | reflex pre-cut (a pre-step: a face with a reflex vertex deeper than the band's block depth is first split from it, and at antenna roots) → redraw the cut's position ×2 → straight cut on the mean normal → the always-succeeding cut perpendicular to the longest side run through its midpoint, clipped to the face's own component → substitution (court / green / landmark / a joined plot for the largest unplaced class of the district's **allocation**, never live roster state, §4.7), allowed only for faces ≤ 2 × the band's upper block area | property test: on 10⁵ random concave and holed faces the ladder terminates in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue reported per district (soft band ≤ 5 %); the NG signature regression (§13.5); MFCG baseline: 19 skipped cuts and 3 of 16 cities restarted for "bad poly" |
| F-CORRIDOR† union produces slivers or a collapsed block [kernel, §3.6; GEO-35, GEO-4] | S9 | a face below its class minimum width or area after `corridorUnion` | `absorbSliver` (§3.6): merge across a partition edge, else keep the face as `residue` — a structural edge is never deleted → downgrade the offending lane to `alley` width → retype the lane `invisible` and log | B-CITY: 0 faces below their class minimum width and area; 0 structural edges deleted |
| F-OUTLINE† a closed outline is not simple [pipeline, §4.2 S1; GEO-13] | S1 (coasts, lakes, islands, sky-island outlines) | the displaced outline self-intersects or loops | clamp the displacement → repair by non-zero union → type each resulting loop (islet / pond / absorbed), reported | island, fjord and sky-island fixtures: 0 non-simple outlines committed |
| F-RIVER† no course / no crossing [pipeline, §4.2 S1; GEO-36] | S1, S3, S1's water operator (§7.3) | descent stalls in a sink; the carve depth would exceed `carveMaxCm`; the course leaves the frame before the core; no crossing site in the core band | carve the sink deeper up to `carveMaxCm` → re-trace from the last good knot → move the inlet along the frame edge (attempt) → move the centre to the bank (S3) → declare "no crossing", route arterials to the bank road, report; a requested river island whose branch separation fails is reported "not built"; inside an edit the re-trace is confined to the edited reach and the inlet and centre rungs are not offered (the edit is then declared Re-derive from S1, §7.3); a moved course knot (`moveCourseKnot`, §7.1) is never re-traced away from the user's position: a course through it whose carve would exceed `carveMaxCm` returns F-EDIT with the nearest position along the drag that stays within the cap | 1 000 seeds × {`river`, `coast+river`} × rung (the `WaterSetting` spelling, §13.3; VS2-5, VS4-5): "river within the core when requested" = 100 % (MFCG baseline 7 of 10 attempts fail at size 80) |
| F-CONTOUR† a contour crosses a shore [pipeline, §4.2 S1; GEO-14] | S1 | a contour level set crosses a shore edge | the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission (always succeeds), reported; never an abort path | steep-coast, cliff and spit fixtures: contours crossing water 0; 0 S1 aborts |
| F-SITE no valid centre | S3 | every candidate fails slope / land / flood tests; polycentric nuclei closer than the separation floor (§4.2 S3 (6)) | relax the slope threshold one step → the largest land component's centroid band → report; for nuclei: re-site the later nucleus (≤ 3) → merge the two under one enceinte with a cross wall, reported | corpus sweep over relief characters; twin-town fixtures: walls apart by the floor or one shared enceinte with a cross wall |
| F-ROUTE† no arterial path [pipeline, §4.3; GEO-17] | S4, S4's local operator (§7.3) | `E_NO_PATH`; an approach cannot meet a pinned bridge deck within the class's minimum radius | take another crossing site on the reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet (§4.2 S1 (5); river and canal decks; a moat deck is fixed at its gate, §4.3; the deck stays perpendicular to local flow) → allow one bridge at extra cost: a new deck whose two `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch lays its span (§4.2 S1 (5), §4.3) — inside S1's water operator, whose new water is not yet inserted, the rung only sites the deck, its bank vertices placed on the route by the operator's L1 batch and promoted by its L0 batch (§7.3 (b) 2–4; VD4-10, the pipeline area's wording governing) → relax the slope limit one class → route to the nearest reachable junction and mark the destination `unserved` in the report (MFCG's "Unable to build a street!" is logged but invisible to the user, O16) | scripted requests on 100 seeds with pathological sites; O4 (a) 100 % of through-roads at a named destination or reported; road and deck agree on 100 % of crossings |
| F-BUDGET-STAGE† capacity below demand [pipeline, §4.2 S2, §4.4; FTG-2] | S5 | S5d's area test: the stage's grown area against its plot demand at the bands' plot areas | one bounded top-up before the next stage (widen the stage boundary by the shortfall at the stage's measured plot density and grow only the added ring, recomputing the trace) → accept and report the shortfall; the exact plot check after S10 then feeds F-SITING | B-CITY sweep over wealthLevel {0, 0.5, 1}: population ± 5 % on ≥ 95 % of seeds and the walled share in its band |
| F-WALL† bad trace / gate count infeasible [pipeline, §4.2 S3, §4.4, §4.8; kernel, §3.6–§3.7; GEO-18, FTG-8, NF-P1] | S3 (stage 1), S5a, S7 | the trace self-intersects or crosses the core; a closed trace does not close, or an open trace has an end not anchored on shore, bank or cliff; fewer arterial crossings than N; a non-gate way reaches the trace | two gate routes cross the stage-1 boundary at one point → re-draw the later gate pick (≤ 3) → drop it and report (§4.2 S3 (7)); the trace is fixed before growth with its gates pinned (S3 for stage 1, S5a for later stages): re-offset with a larger radius → topology-preserving union-simplify (`booleans`, §3.7) → anchor open ends by attraction onto the nearest shore, bank or cliff (a shared stretch carrying `bank` and `wall`, §3.6; an open trace is legal when both ends are anchored) and add water gates where the waterfront policy requires a quay wall → divert excess arterials to the nearest gate as lanes → add posterns and report when N cannot be met (N = 0 adds no main gate: a declared sealed circuit, whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7)) → last rung: cut a way that reaches the wall at the setback band and prune the outer stub, reported | B-CITY: gates on arterials 100 %, main gates = N exact, plus a harbour gate of §4.2 S3 (7) where one was placed (a sealed town's, or the detour guard's), 0 non-gate crossings; 100 % of quays reachable without crossing a wall except at a gate on coastal and river seeds; MFCG baseline: sealed cities at 0 main gates without fallback (NP4-5) |
| F-CASTLE† compactness / overlap [pipeline, §4.2 S3, §4.8; MFP-3] | S3, S7 | compactness < 0.75; the claim overlaps water or the plaza | at S3, when the bailey is sited and before the trace welds to it (§4.8), inside the reservation: equalise the claim's angles (≤ 20 passes) → bloat in 5 % steps up to the band's top → re-site (reported) → keep without a bailey (reported) | castle area and compactness in band on ≥ 99 % of B-CITY seeds, 0 ways through reservations; O8 (d); MFCG baseline 178 equalize passes and 11 bloats per census |
| F-PLOT† unusable plot [pipeline, §4.7; GEO-24] | S10 | frontage < min, wedge angle < 12°, landlocked | per-frontage regions (§4.7; when the block's skeleton downgrades, a reflex pre-cut partition instead) → merge into the neighbour → insert an alley to give access → typed residue (court / vacant) | invariants: every plot has ≥ 1 access edge (100 %), 0 landlocked buildings; NG baseline 42 % of lot leaves discarded |
| F-SITING† roster item unplaced [pipeline, §4.7; LC-2, FTG-1] | S10b | the eager allocation (§4.7) cannot place a class's demand in its affinity district | reconcile inside the district's allocation (JOIN at block granularity → a whole block → the district edge); moves across districts happen only in the allocation's own reconcile (S7b) → reduce the manifest and report `unplaced` — decided eagerly, never by the order in which lazy districts are placed, and never silently (FTG V1 "would regularly give up") | O18 (f): 100 % of institutions on a plot meeting their requirement; districts derived in three random orders give identical digests (§6.5) |
| F-SITEPLAN† footprint does not fit [pipeline, §4.7 S11; FTG-13] | S11, the terrain operator (§7.3) | setbacks leave no rectangle ≥ the class minimum; after a terrain stroke, a row footprint's fall exceeds `skirtMaxCm` | on slopes above `skirtMaxCm`, stepped wings first → lower the coverage one step → next arrangement (compound → detached → hovel → the `tents` row where the class allows) → vacant plot typed yard, reported | O17 (f): 100 % of footprints fit; 0 renderer fallback rectangles |
| F-SKELETON† skeleton fails [kernel, §3.8; GEO-8, GEO-2] | S11, S13a | the output validator fails (non-planar skeleton, non-monotone faces, inconsistent heights) or the skeleton's work limit (events processed) is reached — `E_WORK_LIMIT`, never a timeout | labels: a sampled medial axis (§3.8, used by §9.3); roofs: a **plain roof** (VIS-11) — the footprint drawn with no ridge or hip lines, roof kind `plain`, heights unchanged (MFCG draws a roof whose gable pass fails plain). Near-rectangular footprints never reach this row: their exact OBB roof is the primary construction (§3.8) | ladder-coverage fixtures (§13.1) render every downgrade and assert no roof line outside its footprint; 0 crashes on 1 000 holed polygons |
| F-LABEL† no fit [rendering, §9.4; GEO-29] | S13b (view side) | spine shorter than the text at the minimum size; unresolved collision at priority | §9.4's seven rungs, in order: (1) the preferred spine at the size ∝ √area, never below the floor → (2) the short name form → (3) a straight label on the OBB axis, on one line or on two lines broken at a `breakAt` position → (4) the OBB arc → (5) the **quarter tree**, decided per stop from geometry before the greedy: the label yields to the smallest ancestor node in the quarter tree whose spine fits that node's own name at the floor, and the ancestor's label is one candidate per stop (§9.2) → (6) a declared **overflow**: ≤ 20 % of the glyph area outside the face, never over a protected obstacle or another label → (7) a **legend entry**: a numbered disc on the face and a row in the legend (§9.5). Floors are in pixels; every rung reached is counted in the report; placement is view data and never changes the model | "0 collisions" is a view invariant, tested by B-ZOOM at settled views and during a zoom sweep; ≥ 99 % of all area-label glyph area inside its face, which caps the overflow rung at 5 % of the on-map area labels (§9.4) |
| F-WORK operation count reached | any stage, ladder or kernel call | `E_WORK_LIMIT`: a declared count reached (candidates, proposals, kernel calls, skeleton events, recursion depth); every count is the stage's law over its batch scope's population-derived counts (§5.1 (5)) | the stage's declared coarser rung, entered by the count, never by time (fewer candidates, larger cells, a shallower recursion) → report `work_cut` with the count; the map is valid and identical on every machine | the golden suite under a time-dilation shim (every clock read × 10 and × 0.1): per-stage digests byte-identical; work-cut rate per stage reported on B-CITY; the hit rate flat across each rung's population band (§13.2) |
| F-BUDGET-TIME stage over its time budget — reporting and scheduling only (GEO-2) | `@plat/api` worker host (outside model packages) | wall-clock watchdog | postpone or resume a lazy tier (cancel-and-resume only); telemetry records `time_over`; never a model change | a tier postponed and resumed hashes identically to the eager tier; per-stage timing against §12 in CI telemetry on reference hardware |
| F-EDIT constraint conflict | S0, edits | a drawn way crosses a locked entity; a targeted assignment names a locked entity; an assignment cannot be honoured within its drift bounds; a warp would break an invariant or carry a locked or pinned point-anchored record out of its host face (§7.4); the effective scope holds protected entities whose fate is not *kept*; an `undo` or `redo` whose target has dependent live events (§7.4); a water edit's new channel ⊕ bank setback meets a locked or pinned way, wall or finer entity, or a reservation (§7.3 (b) 3); a moved course knot beyond `carveMaxCm` (F-RIVER); a host provider's output that would pass the 2 MB cap on pack data and host content (§2.9) | the dry run returns the conflict as an action — the nearest valid position, the blocking lock, the edit-fate list for confirmation (§7.3), the dependent events to undo first, Re-derive from S3 for a reservation in a new channel's way, or the provider and the size that passed the cap — precedence lock > assignment > drawn geometry > rules (§7.7); never silently resolved | B-EDIT sequences and conflict fixtures; 0 planarity violations, 0 lost faces, 0 silent re-binds |
| F-REDERIVE coarse re-derivation invalidates finer content or crossings [LC-7] | §7.3 local operators (S1 water and terrain, S4, S5, S6, S7) | a plot, footprint or yard lies in new water, in a new corridor, across a moved wall band or outside its new cell; a way that new water ⊕ its bank setback will meet off a deck (found on the data of the new water, before it is inserted, §7.3 (b) 1–2); a deck span no longer crosses water, or a `site` lies over land | **plots and buildings:** re-cut the plot along the new boundary (ids kept by the anchor rule, §6.3) → re-fit its site plan (F-SITEPLAN) → demolish what still conflicts, with a lifecycle event whose cause is the edit. **A way that new water will meet off a deck** — applied before the water is inserted, in the L1 batch of S1's water operator (§7.3 (b) 3) and of a carve (§4.11 (1)), so the L0 insertion meets no finer edge except at the vertices that batch prepared (§3.3): an arterial, the only connection of the streets beyond it to a gate or the plaza (§4.11's rule), or a way that crossed the changed water on a deck, is re-routed through the nearest deck when one lies within the detour bound (the re-routed length between the way's nearest pinned nodes on either side of the water ≤ 1.4 × the old length), a deck being sited for it by F-ROUTE's "one bridge at extra cost" rung when none does, with the deck's bank vertices placed on its new route → every other way is cut at the bank setback: the stretch inside the new water ⊕ its bank setback is removed, each land part is kept as a way — the part that keeps the old way's anchor (its end junction, else the larger overlap, §6.3) keeps the address, the other is a fresh way — and a land part shorter than the district's minimum block width that ends at the setback (a stub) is removed, leaving a dead end at the bank. **A deck over land** (its reach moved away and §7.3's re-siting found no site within the band): the `Bridge` becomes a tombstone (`demolish`, cause the edit) and its span stays in its way as an ordinary segment of the way's class — the higher class of the two ways it joins where the span was a separate `bridge` way — or leaves with the way if the way itself was removed; its `deck` and `deck_end` rows are removed (`removeEdges` on `ChainRef('deck', bridge)` and on its two `VertexRef('deck_end', bridge, i)`), after which demotion takes its bank vertices to the way's level (§2.2 rule 3; VK4-1). **A `site` left over land** is removed — its `deck_end` rows by `removeEdges`, its record a tombstone (§2.7, §7.3 (b) 9; NP4-7). Every re-cut, demolition, re-route, cut and pruned stub is listed in the edit-fate report with its lifecycle event; a locked or pinned entity is never demolished, re-routed or cut — its conflict returns to the dry run as F-EDIT | B-EDIT terrain-brush (both water modes), course-knot, drawn-water, drawn-way and drawn-wall sequences — among them a river move across a street grid, which commits with its decks and cuts and keeps every face outside its clear region byte-identical (§7.3 (b)): 0 hard invariant violations; 0 decks over land, 0 off-deck crossings (§5.3); 0 wings off §2.6's datum rule (`baseCm` = the highest terrain sample under the wing + the plinth, user-edited bases excepted); 0 footprints in water; every demolition, cut and re-route has an event |

=== REPLACE §5.3 The invariant suite, by scope (SCL-1) ===

### 5.3 The invariant suite, by scope (SCL-1)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
| the kernel invariants of §3.10: lattice points inside the range; no edge shorter than `minEdge` from any writer (insertion, booleans, buffers, offsets, smoothing, warp); clearance; simple faces except declared antennae; nesting by index (every level-(n+1) face has one level-n parent); the placement bound and level consistency (§3.10; VK4-2); role consistency, with no structural role lost | batch-local | the commit record's faces, edges and role keys (§3.3, §3.10) |
| class floors: min width / area / angle per class (never `minEdge` as a face floor; GEO-35) | batch-local | touched faces |
| no footprint overlap | batch-local | touched footprints against the spatial index |
| every plot with ≥ 1 access edge, every building with its entrance on one | batch-local | touched plots and buildings |
| no way centreline crosses a footprint; no way crosses a reservation (§4.2 S3) | batch-local | touched ways, footprints and reservations |
| walls not crossed by ways except at gates | batch-local | touched ways and wall edges |
| **a way crosses water only on a deck, and a deck only over water** (LC-7): every edge carrying a `way` role whose two sides both lie in water — the L0 parents of the faces on either side are water faces — belongs to a `Bridge`'s deck span (the edges between its two deck vertices, carrying the `deck` role; fords included) or to a **harbour work** (VD2-2): a way of class `pier` or `quay` whose connected set of `pier` and `quay` edges meets land in at most one L0 land face — a pier, a mole or a breakwater arm rooted on one shore, a detached breakwater touching none (§4.8) — which stands in the water rather than crossing it; a `pier` or `quay` way that joins two land faces across water crosses on a deck like any other way; every deck span crosses a water face with both ends on its banks; a wall trace crosses water only at a water gate | batch-local | touched way, deck and wall edges against the L0 parents of their two sides, by index (§2.2 rule 2); for a touched `pier` or `quay` edge with water on both sides, one walk of its connected `pier` and `quay` edges counting the distinct L0 land faces its vertices touch (a harbour-wall row's few hundred edges at most); it covers S1's river decks, S3's moat and canal decks, S5a's outer-moat decks, a carve's decks and S7's harbour furniture alike, and §13.2's harbour fixtures include a two-arm mole and a detached breakwater |
| no lane crosses a wall strip, and no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch (NF-P5) — in every generation batch, and in every edit batch except for the enceintes whose wall-strip parts the edit's chain **declares** it rebuilds by S10's step (0) or removes (VP2-4, VD3-6). The dry run of every chained edit computes that declaration — the set of enceintes whose strips any of its batches changes, each with "rebuilt" or "removed" — and every batch of the chain carries it; the check reads the declaration, never a list of edit kinds. The edits that declare it today are: a tree-scoped re-derivation of a scope that holds wall-strip faces (§7.3 item 2); S7's operator (`drawWall`, a moved trace vertex, a re-traced run, `gateToJunction`); S1's water operator, for every wall strip its L1 batch changes — a re-traced run's strips, and a setback or glacis line it anchors and cuts outside any re-traced run (§7.3 (b) 3, 7, 8); a carve, for every strip its batches (1)–(3) change and its step 4 re-derives (§4.11); and, as removals, the conversions `wallToWay` and `contractWall` (§4.11) and an enceinte's `delete` (§7.1's walls row). A lane still never crosses a strip | batch-local | touched lanes against the `setback` and wall edges; the commit record's removed and changed L3 faces of kind band, setback, glacis, tower or gatehouse, against the batch's declared enceintes; a CI registry test fails when an edit operator or conversion that can write a wall strip's L1 lines or L3 parts has no declaration path, and §13.2's fixtures commit a canal carved across a wall between two towers and a river move whose new bank cuts a glacis line without crossing the wall with 0 NF-P5 violations, while a `drawWay` lane across a strip is refused |
| footprints ∩ (wall band ⊕ setback) = ∅ on both faces of every wall (MFP-9) | batch-local | touched footprints and wall bands |
| every building's wing rings are simple and counter-clockwise and unite to its footprint face exactly (integer equality), after S11's first carry and after every later carry (§2.6's wing-carrying rule; NP3-1) | batch-local | the buildings whose footprint faces the batch changed, one union per building (a few wings) |
| water ∩ footprints = ∅ | batch-local | touched footprints and water faces |
| every built bridge within ± 10° of the channel normal, measured on the deck and on the way (GEO-17); a `site` has no span and is outside every deck row (§2.7; NP3-4) | batch-local | touched crossings |
| exclusive land uses never overlap | batch-local | touched land-use faces |
| reference integrity of records: every reference out of a touched record — people and relations included (a dependent's carer resolves) — names a live id; every reference into a record the batch removed is carried over (§6.3) or reported as an orphan | batch-local | the reverse-reference index |
| identity: every fresh address differs from every live and tombstoned address, and no two live entities share a lineage key (§6.3) | batch-local | at mint, O(1) against the identity set |
| every length field carries a unit | batch-local | at schema write (and the lint of §2.1) |
| every stored geometry reference resolves (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` of every live entity), and no geometry carries a dead entity | stage-end, save | the kernel's reverse indexes (§3.10) |
| every gate joined to the network and to the plaza; the roads leaving each walled stage equal its gate count (its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed — a sealed town's, or the detour guard's), and an outer enceinte's gates ≥ its arterial crossings; a coastal town's harbour is joined to its plaza through a gate and crosses a moat only on a deck (§4.2 S3 (11)) | stage-end (S7) | one graph search per enceinte |
| every gate and weld vertex lies on its trace, and stage 1's trace lies within 40 m of the stage-1 boundary except along an `on_enceinte` castle's shared stretch (the bailey's outer arc, §4.2 S3 (9)) (NF-P1) | stage-end (S5) | the trace's role rows and one distance pass per trace |
| every `baseLane` portal matches one S8 lane end on a boundary spine and vice versa, and no two portals on one spine lie within the portal gap (NF-P6) | stage-end (S8) | the `Seam` records against the lanes' end vertices |
| every quay reachable from the town without crossing a wall except at a gate (FTG-8) | stage-end (S7, S9) | one graph search |
| no branch re-joins its parent within k segments | stage-end (S5) | per growth stage |
| a sealed enclosure only when declared | stage-end (S7) | per trace |
| contours never cross a shore — a check of the clip construction, never an abort path | stage-end (S1) | F-CONTOUR's clip (§5.2) |
| names unique within their kind's scope; a new entity never renames an existing one, and an existing generated name changes only by one of §6.3's draw cases (§9) | stage-end (S13a) | per naming run |
| every requested feature (river through the core, N gates, a harbour when coastal, …) delivered, degraded or omitted, and reported with its tier (§5.1 principle 7) | stage-end | the report's `requested` list; acceptance counts omissions (§15.2) |
| containment complete: building ⊂ plot ⊂ block ⊂ district, 100 % | stage-end | per-batch containment counters summed, not a model walk |
| the canonical document validates against its schema (`Recipe.salts` keyed by rerollable concerns only, VD3-8); the recorded digests are the maintained model and records roots (§6.2; VD4-6) | save | at write |
| the decoded snapshot's recomputed model root and records root equal the recorded ones — the model root computed under the model packages of the output version that recorded it, a rebased base's against its root of record for that version (VD4-1) — and every chunk's bytes hash to their `ChunkRef` (VD3-1, VD4-6); a frozen view checks its chunks' content hashes only (§2.9 step 2) | load | §2.9 step 3's full recomputation, before the first edit — or, under §6.2 (iii), before any keep of the saved town, save, export, digest read, bridged root comparison or `verified` report (VD4-2) |
| the replayed model root and records root equal the recorded ones; a records-only difference is rebuilt from the replay (§2.9 step 3; VD4-6) | load | the verification replay of §2.9 |
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

=== REPLACE §6.2 What a seed determines, and the model digest ===

### 6.2 What a seed determines, and the model digest

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
  the L2 digest. Per-level digests read each vertex's and each edge's *current* birth level, so a promotion (§2.2 rule
  3) moves a vertex into the coarser level's digest from that commit on and a demotion moves a vertex or an edge back
  out of it — the neighbour step's reversal restores the kerb's L2 digest exactly — and kept finer content (§3.3) keeps
  its digest leaves through a coarser re-derivation (VK-18, VK-1). An entity's leaf takes the digests of the faces and
  chains it owns (its `FaceRef` and `ChainRef` resolved), so no coordinate is hashed twice. Coordinates enter in
  canonical order (a level-n ring from its lowest-then-leftmost vertex of level ≤ n, finer vertices skipped — §3.3's
  key, so deriving a finer level never re-orders a coarser digest's input; VK2-4); integers enter as 32-bit lanes,
  doubles as their IEEE-754 bit patterns (−0 normalised to +0; NaN refused by the schema), strings as UTF-8 — no text
  serialisation on the digest path, and no dependence on byte order.
* H128 is MurmurHash3's x86 128-bit variant (a published public-domain algorithm in 32-bit operations; our own
  implementation, tested against the published test vectors) with seed 0, so the digest's hash is specified exactly, as `H32` is
  (§13.6 (2); VS2-6).
* **Included and excluded.** Names and `LabelEntity` records (text, candidates, `pinned`, `hidden`) are model data and
  are hashed. **Excluded:** provenance, derivation records and naming records (the provenance digest, §2.8; the
  persisted records also form the records digest, below); `style`, `view`, `derived`, `hostContent` and telemetry
  (§2.9); label placement decisions (S13b, view data, §9); and close-ups that have never been edited — a close-up is a
  pure function of its district's committed state, its sub-seed, strategy and params, and enters the digest under
  `closeups` with its first edit (LC-18, §7.4).
* **Maintenance:** at every batch commit the kernel re-hashes the leaves of the records the batch touched and the nodes
  on their paths to the root — O(touched × depth) — never by serialising the model (§3.3). The tree it maintains is
  built by the generation run in a session and, for a loaded document, by the load's one full recomputation from the
  decoded snapshot under the model packages of the document's own output version (§2.9 step 3; VD3-1, VD4-1) — the
  snapshot stores only the root — so every edit, from the first one after opening, maintains a complete tree; at CITY
  the tree's leaves and nodes take ≈ 1 MB (≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at
  16 B each), inside §12.8's entity-store line. The canonical text serialisation (sorted keys, integer coordinates,
  floats as shortest round-trip strings) is used only for golden files and exports.
* **The records digest** (VD4-6). The persisted derivation and naming records (§2.8) form a second Merkle tree beside
  the model's: one leaf per record — `H128(id ‖ record kind ‖ its fields in schema order ‖ each cited slice as (table,
  version, kind, key, hash))` —, one node per static-index partition over its records sorted by address id — the
  partition whose entity chunk holds the record (§2.9) —, and a root over the partition nodes; ≈ 0.25 MB of leaves and
  nodes at CITY, inside §12.8's entity-store line with the model tree. Its leaf encoding belongs to the file schema, not
  to an output version — the records are stored inputs, not derived output — so any version checks it, and a schema
  transform that changes a record column (§7.5) checks the old root and writes the new one. It is maintained exactly as
  the model tree is — a batch that rewrites a record re-hashes its leaf and its partition node —, finalised when read,
  stored in the snapshot as `recordsDigest`, and recomputed by every load with the model tree: ≈ 4 ms at CITY and ≈ 11
  ms at METROPOLIS for ≈ 10 900 derivation and 3 500 naming records at CITY (≈ 29 300 and 9 500 at METROPOLIS) on a
  synthetic, schema-shaped workload on the reference machine, two runs within 0.1 ms
  (`docs/validation/bench/fixall_det_r5_recordsdigest.out`), PLAUSIBLE until M0 (d) times it in the engine with the
  model tree, under the same 150 ms bar. It is not a model digest: goldens, the locality oracle and the bridge's
  convergence read the model digest alone. *Chose a separate records digest over folding the records into the model
  digest, because the records are what Regenerate (keep settings) and case (4) read, not content the user sees — folding
  them in would turn a release that only re-encodes a record into a declared output shift — and over leaving them
  unchecked, because a wrong stored record silently changes what a later faithful regeneration or corpus selection does,
  in a rebased document for good.*
* *Measurement (M0 d, decided before any golden is signed):* digest maintenance ≤ 5 % of each batch's own time at CITY;
  root finalisation at a stage end ≤ 5 ms at CITY; full recomputation of the root from its leaves ≤ 150 ms at CITY, the
  records tree's included — used by the CI oracle and by **every load** (§2.9 step 3); measured ≈ 31–34 ms at CITY and ≈
  95–101 ms at METROPOLIS on a synthetic, schema-shaped workload on the reference machine
  (`docs/validation/bench/fixall_det_r4_loaddigest.out`; VD3-1), PLAUSIBLE until M0 (d) times it inside the engine. Each
  bar has its own *pre-decided fallback*, and none moves a golden, because the root is a pure function of the leaves
  whenever it is computed (VD2-9): (i) *maintenance* over 5 % — leaves are re-hashed at the next coarser batch boundary
  (per district instead of per block and plot); the root at every stage end is unchanged; (ii) *root finalisation* over
  5 ms — the layer nodes of the tree above (site, network, districts, …) stay maintained at every commit, and the root
  over them is finalised only when it is read: at save, at the end of a verification replay, at export, on an API digest
  request, and at each stage end of a CI golden run, where 5 ms per stage does not matter; (iii) *full recomputation*
  over 150 ms — the CI oracle recomputes, per run, one subtree per layer chosen by the run's seed (so every subtree is
  covered across nightly runs) and compares it with the maintained node; and the load's recomputation **leaves the edit
  path without leaving the load**: the load takes a copy-on-write checkpoint of the decoded state at `h₀` (§7.4's
  checkpoints, chunked per district, so it costs only the chunks edits later change), makes the working state editable
  at once, and recomputes the model tree and the records tree from the checkpoint in the generation worker between
  edits; each edit made before it finishes keeps its touched set (§7.4), and when it finishes the leaves those edits
  touched are re-hashed on the new trees in log order, which yields the working state's trees. Their roots at `h₀` are
  compared with `model.digest` and `model.recordsDigest` exactly as in step 3: a mismatch is a corrupt cache, the
  replay's state replaces the working state when it reaches the head, and the edits made meanwhile are re-applied to it
  in log order as "take the replayed town" re-applies them (§2.9 step 4), their fates recomputed and differences
  reported; nothing is reported verified before these roots have matched. Until they have matched, the load also
  withholds what relies on the working state's own roots (VD4-2): "trust the saved town" and step 4's keep are shown
  disabled — a keep made before the check could make a corrupt cache the rebased base —, and a save (which records the
  maintained roots), an export, an API digest request and a bridged client's comparison of its root with a `rebase`'s
  `stateDigest` wait for the recomputation and complete when it does; edits do not wait. A mismatch withdraws the keep
  for good, a corrupt cache never being a base. *Chose to gate the keep, saves and digest reads on the off-path
  recomputation over holding edits until it ends, because edits waiting is what this fallback exists to avoid, while a
  keep or a save made on an unchecked copy is what the check exists to prevent.* A New random made meanwhile computes
  its scope's content digests from the scope's own leaves (§5.1 (6)), which needs no tree. *Chose, as the fallback, an
  off-edit-path recomputation on a checkpoint over storing per-chunk digest nodes in the snapshot and re-hashing a
  chunk's leaves when an edit first touches it, because the digest tree is organised by layer and containment while
  chunks are organised by partition — the network layer's node alone spans every chunk that holds a way — so per-chunk
  nodes would require restructuring the tree by chunk, which §2.9's chunking fallback (block groups) would then change,
  whereas the checkpoint form changes neither the tree nor the file and still proves the working state before
  verification can succeed.*

=== REPLACE §6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) ===

### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
* **Names follow the address, and follow their inputs** (VD2-10, VD3-2). A generated name — its text and short form — is
  handed to a successor with the address, together with its naming record (§2.8: the naming slices its last draw
  consulted and the salt it used), as a lock or an assignment is, so the bridge a river edit re-sites, the street a New
  random re-cuts and the district a boundary edit regroups keep their names. S13a **draws** a name only (1) for an
  entity with no predecessor, with the town salt; (2) for every unedited name under a town-wide `rerollLayer(naming)`,
  with the new town salt; (3) for the entities an ids-scoped `rerollLayer` lists (§7.1), each with its per-entity salt;
  and (4) for an unedited generated name whose **naming inputs changed**: whenever S13a runs over the name's entity —
  after an `adjust` of the pack list (a pack added or removed, a corpus selected or deselected, §7.6), after an
  `editTable` or `editPreset` that changes a naming slice (§7.6's invalidation by slice finds exactly the names whose
  records cite it), in an upgrade's mapping (§7.5), at the event that ends the name's protection — an `unlock` or an
  `unassign` that frees it, or an `undo`, `redo` or `revert` whose result removes the `setAttr`, `lock` or `assign` that
  held it (§2.8's dormant record; VD4-3) — and in any re-derivation whose scope reaches S13a — it compares every slice
  the name's naming record cites with the current effective tables, and a slice whose hash differs, or that no longer
  resolves (a deselected corpus, a removed row), re-draws the name with the salt its record holds. Each field of a
  culture or ancestry row is its own slice — the (row, field) pair, hashed over the field's value and, for a corpus
  field, the named corpus's content hash (§7.6; VD4-5) — and a name's record cites only the fields its draw read, so
  selecting another corpus for one field changes exactly that field's slice and exactly the names drawn from it re-draw:
  a street list chosen for a culture renames that culture's streets, never its districts or quarters. Only the inputs
  changed, so a name whose rows and corpora are unchanged is never touched, and **a carried name is kept exactly while
  its naming inputs are unchanged**; a change of the features a grammar guard reads (a district that lost its gate) is
  not a naming input and renames nothing (§9.6). Every draw uses the entity's `naming` stream — keyed from its entity
  key (§6.1) with the salt of its case and the attempt — and writes the name's naming record anew. In case (3) the dry
  run gives each listed entity the salt one above the largest its name has been drawn with — the town salt and every
  earlier ids-scoped salt the log gave it — and a re-drawn name equal to the old one advances that salt once more, up to
  `reroll.maxAdvance` times, as §5.1 (6) does for geometry; the event stores the salts actually used, so a replay
  repeats neither the choice nor the advances. In case (4) the dry run lists every rename — old and new text side by
  side — in the edit's fate report with its other unprotected consequences, and the edit commits after the user confirms
  them; the confirmed renames are stored in the event (`EditBase.renames`, §7.1; VD4-4), and a replay or a receiving
  client re-draws them identically, because the draw is a function of the stream, the salt and the inputs at that log
  position — one that computes different renames reports a mismatch, as for fates (§7.3 item 4). A user-set name
  (`setAttr`) is an edited attribute, a locked name path a fixed input and an assigned name held at its assignment
  (§7.7); none is re-drawn while protected, and each keeps its naming record dormant for the event that ends the
  protection (§2.8; VD4-3). When carrying or a re-draw brings two equal names into one uniqueness scope (§9.6 — a
  district merge that joins two lanes of the same name), the entity whose address sorts later re-draws on its own
  stream, and the rename is listed in the edit's fate report. *Chose to hand the generated name on with the address over
  re-drawing a successor's name from its fresh lineage, because a name, like a lock, belongs to the thing the user
  means: re-drawing would rename a re-sited bridge or a re-cut street the user never asked to rename, while New random
  re-rolls geometry and names are re-rolled on request. Chose to re-draw exactly the unedited names whose recorded
  naming slices changed, over keeping every carried name through a naming-input edit and over re-drawing every name in
  the town, because choosing a street-name list or editing a naming rule must change the names that list or rule
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
district merge and split, `outskirtToDistrict`, regenerate around a lock, a course-knot move that re-sites a bridge (the
bridge keeps its address and name), New random on a district (every matched successor keeps its name; only entities
without a predecessor draw one), a district merge that joins two equal lane names (the later address re-draws,
reported), the recycling case (a superseded, assigned building whose creation slot is reused), and the naming-input
cases (VD3-2): selecting a user-uploaded street-name corpus renames exactly the unedited names whose records cite the
(row, field) slice that named the corpus it replaces — every one listed in the fate report and stored in the event,
every other name and naming record byte-identical — and a bridge re-sited afterwards keeps its new name; a culture row
that names a street corpus and a district-name corpus, its street corpus replaced by a user list: every district and
quarter name drawn through the row, and its naming record, byte-identical (VD4-5); a street renamed by `setAttr` and the
rename undone, and a street locked and later unlocked, each around a corpus selection: the undo or the unlock re-draws
it by case (4), listed and confirmed, and the kept and the truncated log give one digest (VD4-3); an `editTable` of one
naming grammar row renames exactly the unedited names whose records cite that row; both hold in a document rebased from
a kept snapshot (no provenance) as in a fresh one — 0 duplicate ids and 0 silent re-binds (every reference resolves to
its successor or is reported).

=== REPLACE §6.4 Permalinks, version axes, retention and goldens ===

### 6.4 Permalinks, version axes, retention and goldens

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

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
* **Pack versions** — each setting pack by id, version and content hash in the recipe or in the `adjust` event that adds
  it (§2.9's pack set); the shipped packs belong to the output version like its tables — each retained version's chunk
  carries its own —, a non-shipped pack's content travels in the document (NF-D2), and a pack a later version stops
  shipping is copied into the document by the upgrade to that version (§7.5; VD4-9). A selected user corpus is a
  non-shipped pack, `user:<content hash>` (§2.9; VD2-8).
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
* **A link is emitted only when it can rebuild the same town and picture on any machine**: every pack of the document's
  **pack set** — the base recipe's packs and every pack an `adjust` event in the log names, a corpus once selected and
  later deselected included (§2.9; VD3-3) — is shipped with the link's output version, **the base is the recipe**
  (VD4-8: a rebased town is not seed-reproducible before its rebase, and a link replays the recipe and the log, so it
  would show the replayed town — for a `keptSnapshot` rebase, the very one the owner rejected), `hostContent` is empty,
  the style sheet is shipped, and the whole URL fits in 2 000 characters. Otherwise the app says which condition failed
  — "this town uses the setting pack X, which is not built in", "this town uses your own name list X" (also when the
  list was deselected: its selection is still in the town's history), "this town uses content from the host program Y",
  "this town was kept from a saved copy and cannot be rebuilt from a link", "too many edits for a link" — and offers the
  `.plat` file, or `&doc=<ref>` when the host has configured a document resolver with `publish` (the `DocResolver` of
  §11.5); the document carries the pack content and the host outputs (§2.9), so the file reproduces the town without
  them. `preset=<id>` never appears: an edited preset elsewhere cannot change the town. *Chose to refuse such links over
  emitting them with the pack named by id and hash, because a link opened where the pack is missing could only fail or
  show another town, and the owner's rule is that a shared link never shows a different town; and chose to read the pack
  set rather than the base recipe, because a link that carries the log (`&l=`) replays every `adjust` in it. Chose to
  refuse a link for every rebased base, over an exception for a rebase whose state its recipe could regenerate, because
  a link has no way to name a starting state, and a replay from the seed is exactly what a rebase declares its town
  cannot be (VD4-8).*
* **CI:** link → recipe → link identity, and the model digest built from a link equals the session's digest; plus a
  recipe naming a non-shipped pack, a town whose district names are drawn from a user-uploaded corpus selected after
  creation (a `user:<hash>` pack named only by an `adjust`, VD2-8, VD3-3), a town that selected such a corpus,
  deselected it, was saved and reloaded, a document with a host provider's output, and a town rebased by keeping the
  saved town after a forced load mismatch (VD4-8): in each the link is refused, and the `.plat` file opened by a library
  that has neither the pack, the corpus nor the provider replays to the session's digest (in the select-then-deselect
  case because the corpus's content stayed in `packs` while the first `adjust` names it; the rebased town reopening as
  the kept town, from its base state).

**Retention of old output versions** (LC-14). The browser library ships the current output version's model packages and
the two previous ones (N−1, N−2) as lazily loaded, tree-shakable chunks (`@plat/*-o<k>`; an embed may leave them out);
the Node CLI replays any published output version by installing that exact package version. A document or link inside
the window replays exactly. Outside it, a document opens as a frozen view (§2.9 step 2), checked by its chunks' content
hashes only and labelled "made with o5; not verified by this version", because its recorded root was computed by o5's
model packages, which only the CLI still installs (VD4-1); a link — which has no snapshot — opens under the current
output version with a visible notice ("made with o5, shown with o8; differences are expected") and the CLI command that
replays it exactly. Nothing changes silently. The same window bounds what the browser can undo by replay (an upgrade, a
rebase onto an older version, §7.4): outside it the undo is withdrawn there with the CLI command shown. *Measurement
(M3a):* each retained output version adds ≤ 150 KB gzipped to its lazy chunk; the golden suite replays under N−1 and
N−2. *Pre-decided fallback:* the browser window shrinks to N−1 (the CLI keeps every version).

**Goldens** (LC-3; §13.3 builds the tooling from M1). **Stage-isolated goldens:** the golden store keeps, per seed and
stage, the previous output version's frozen upstream outputs; a release computes each stage's digest by running the new
stage code on those frozen inputs, so only stages whose own code or tables changed can differ, and each such stage needs
a shift record (stage, cause, seeds and statistics that moved, expected direction). **End-to-end goldens** are
re-signed only with a **cascade record** that lists every downstream stage whose digest moved and shows, from the
isolated goldens, that each moved only through its inputs; a downstream stage whose isolated golden also moved needs its
own shift record, so an unrelated regression cannot ride on an upstream shift.

=== REPLACE §6.5 Floating-point policy, determinism lint, determinism tests (G-P10) ===

### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r3; drafted by fixall/draft-determinism-r3

1. Topology lives on integer centimetres; predicates are exact (§3.2).
2. Fields, costs and weights are IEEE doubles; `+ − × ÷` and `Math.sqrt` are exact by specification; every other
   real function goes through `dmath` (the vetted fdlibm port, D-23).
3. **The lint is an allowlist** (GEO-31). In model packages — and in every adapter or provider whose output reaches the
   model — the only `Math` members allowed are `abs, floor, ceil, round, trunc, sign, min, max, sqrt, imul, clz32,
   fround`, plus the arithmetic operators. The allowlist also holds for the view code whose output reaches a
   bit-compared digest (VS2-4): `@plat/labels`, every implementation of `ObstacleSource` and `RoleIndex` (§14), the
   functions they call, and the S14 builder code that writes the display-list columns they read — `bbox`, the geometry
   ranges and `GeomTable`, `layer`, `z` and the symbol extents computed from the style sheet's sizes (a rotated symbol's
   extent uses `dmath`) — and §8.10's instance function, which the model-format exporters and override resolution call
   in the generation worker (NR4-3; the rendering area's wording governs). CI finds that code as the import closure of
   those implementations and column writers, from the TypeScript program, so a module that joins it is linted without
   being listed; the rest of `@plat/render` — paint programs, backends, compositing — stays outside, because its output
   is pixels compared by visual regression (§13.3, §13.4). `**` is allowed only with a literal integer exponent from 0
   to 4, and the build rewrites it into explicit multiplications (exponentiation is implementation-approximated in
   JavaScript); every other power goes through `dmath.pow` (S1's river-width law `w0 · acc^0.4` is `dmath.pow(acc,
   0.4)`). Also forbidden: `Math.random`, `Date`, `performance`, timers, `crypto.getRandomValues`, DOM access,
   locale-dependent string operations (`toLocaleString`, `localeCompare`, `Intl`), `Array.prototype.sort` without a
   comparator, and any dependence on object-key or `Map` iteration order beyond insertion order. A division whose
   divisor is not a non-zero literal must go through `ratio()` (§3.2 (8)), which the lint enforces.
4. **Vendored dependencies are scanned too.** Every third-party library a kernel adapter imports is vendored at a pinned
   version and passes the same allowlist scan at each version change; an audit record (library, version, scan result,
   each exception with its wrapper) is kept in `@plat/kernel`. A library that fails (for example one that calls
   `Math.hypot`) is patched or wrapped in its adapter before adoption.
5. Every sort uses a total-order comparator with an id tie-break (the OS `ObjectMap` key-order hazard cannot occur).
6. Pool workers derive each district on an overlay over one frozen base and return it for a lineage-order merge
   (§3.3); no result depends on arrival order, and no model package reads time (§5.1 principle 5).
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
   per-stage digests (GEO-2); **derived-complete digest** — every district's S10, S10b, S11 and S12b and the hinterland
   unit's, S12b named explicitly (NF-P3), derived for 50 METROPOLIS seeds in three random orders with pool sizes 0–3,
   give identical digests (the laziness contract, §4.1; §6.2); **op-order determinism** — every declared batch's result
   identical under permutation of its ops, and every callback-form stage's identical across two runs, a slot renumbering
   and pool sizes 0–3 (§3.3; VK-6); **placement digests** — the per-stop S13b placement digests of the golden suite
   identical on the five engines, workers on and off (§13.3, §9.1; N-24); **headless = UI** (O11 f); **replay =
   session** — replaying base and log equals the session's digest on every B-EDIT sequence (§7.3), including the
   naming-collision fixture of §7.3 (7) (N-1), sequences with undo and redo from several sessions, edits made during
   load verification under both choices of a forced mismatch (§2.9 step 4; NR-8), and edits made before a records
   mismatch, re-applied (§2.9 step 3; VD4-6); **truncation identity** — a B-EDIT sequence folded with its undone pairs
   kept and with them truncated gives the same model digest (§7.4), including a redo followed by a user-created entity,
   whose address must be the same in both folds (VD2-3), a `setAttr(name)` + `undo` pair and a naming `rerollLayer` +
   `undo` pair each followed by a corpus selection — the naming records restored with the names (§2.8; VD4-3) — and a
   corpus selection + `undo`, truncated, saved, reloaded and redone, its pack still in `packs` (§2.9; VD4-7); **links
   and documents without their inputs** — §6.4's pack, user-corpus, provider and rebased-town cases (VD4-8); **checks
   under the recording version** — a `keptSnapshot`-rebased CITY document upgraded across a test output version whose
   field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays to the session's
   digest, and a frozen view of a fixture written by a test build labelled o(N−3) opens with no mismatch message, while
   one with a chunk's bytes altered reports damage and refuses the `frozenImport` rebase (§2.9 steps 2–3, §7.5; VD4-1);
   the double-run check of registered providers; and the distinct-key test of §6.1.
10. **Second implementations** (VK-13). Two differ in what they must reproduce:
    * *The WebAssembly accelerator* of §3.7 (J-K8) compiles a hot loop from the same integer algorithm as the
      TypeScript loop it replaces, so it must reproduce that loop's integer outputs byte for byte: a
      cross-implementation test runs the golden suite with the accelerator on and off and requires identical per-stage
      digests. It is output-neutral and moves no golden; the TypeScript loop stays in every bundle.
    * *The Clipper2-WASM engine*, adopted only if M0 (a)'s speed criterion triggers §3.7's pre-decided fallback, is a
      different engine and cannot reproduce the arrangement engine's integers. It replaces that engine as the single
      engine on every host (7): the switch is an output-version bump with a **declared golden shift** — a shift record
      for every stage that reads a boolean, buffer, inset or band (S1's outline repair, S3's reservations, S8's kerbs,
      S9's corridors, S10's shared-edge bands (step (0): the wall and margin bands, VK2-16), S11's footprints, S12b's
      greenery faces) and cascade records downstream (§6.4, §13.3) — and its
      determinism test is (9)'s cross-host one: identical digests on Node x86 / arm64, Chromium, Firefox and WebKit.
      Its version is pinned and vendored (4), and the report names it (§5.4). *Chose to require byte identity of the
      accelerator only over requiring it of both, because the fallback engine computes different integers by
      construction and would otherwise be unshippable, while the property that matters — one engine, one digest on
      every host — holds for it through the cross-host test.*

=== REPLACE §7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation ===

### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r3; drafted by fixall/draft-determinism-r3

```ts
interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase */; author: 'user'|'host'|'epoch'|'migration';
  session: string /* the authoring session — per document and author, reused across reloads (§7.4; VD2-4): its undo and redo stacks; never read by the fold */; group?: number /* one undo step */;
  renames?: Rename[] /* the case-(4) renames (§6.3) this event's dry run listed and the user confirmed (§7.3 item 4; VD4-4): on any event whose fold re-draws a name because its naming inputs changed — a pack-list adjust, a naming editTable or editPreset, an upgrade, a re-derivation reaching S13a, and the unlock, unassign, undo, redo or revert that ends a name's protection (§2.8; VD4-3); a replay or a receiving client that computes different renames reports a mismatch, as for fates */ }
type Rename = { id: Id; from: string; to: string };   // the name's text before and after, as the user saw them
type EditScope = { ids: Id[] } | { ring: PolygonCm; key: PlatKey; level: Level };   // resolved to the effective scope at dry run and stored resolved
type EditFate = { id: Id; fate: 'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string };
type FieldStroke = { path: PointCm[]; radiusCm: Cm; falloff: 'linear'|'cosine'; amount: number /* relative Δ: field units, or cm for terrain */;
  water?: 'locked'|'follow' /* terrain only; default 'locked' (§7.2, §7.3) */ };
type EditEvent = EditBase & (
  | { t: 'lock'; ids: Id[]; paths?: string[] } | { t: 'unlock'; ids: Id[]; paths?: string[] }          // paths: attribute-level locks (COV-FTG-C12)
  | { t: 'pin'; ids: Id[] } | { t: 'unpin'; ids: Id[] }                                                  // only ever an explicit user action — never emitted by viewing
  | { t: 'moveVertex'; key: PlatKey; at: LatticePoint /* the vertex's position before the move */; sig: VertexSig /* its role signature at the edit, §2.2 rule 5 */; to: LatticePoint }
  | { t: 'moveCourseKnot'; water: Id; ordinal: number /* the knot's ordinal in WaterBody.controls, §2.3 */; at: PointCm /* its position before the move */; to: PointCm }   // VK2-12: a river's control knot is S1's recorded input, not an arena vertex
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
  | { t: 'instance'; entity: Id; ordinal?: string; point?: PointCm; op: 'add'|'move'|'remove'|'restyle'; to?: PointCm; style?: Partial<InstanceStyle> }   // LC-20; for an ordinal-addressed event the dry run also fills `point` with the instance's generated position; `InstanceStyle` is §8.10's
  | { t: 'delete'; id: Id } | { t: 'merge'; ids: Id[] } | { t: 'split'; id: Id; cut: PointCm[] } | { t: 'join'; ids: Id[] }
  | { t: 'revert'; id: Id }   // "reset to generated" (COV-MFCG-L08): one undoable event that applies, in reverse log order, the inverses of every logged event whose target is this entity (its own edits only); ctrl / cmd+click (§14's keymap, MFCG's ctrl-click reset)
  | { t: 'regenerate'; scope: EditScope; mode: 'keep'|'newRandom'; rerolls: Record<Id, number> /* absolute, per scope entity: the rerolls actually used (LC-5, §5.1 (6)) */; discardEdits?: boolean; fates: EditFate[] }
  | { t: 'adjust'; param: string; value: unknown; fromStage: StageId; fates: EditFate[] }                 // Adjust, and Re-derive from stage k (LC-4)
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'|'terrain'; stroke: FieldStroke }          // a relative Δ; the stroke list is composited once (§7.2)
  | { t: 'assign'; assignment: Assignment } | { t: 'unassign'; id: Id }
  | { t: 'moveLabel'; id: Id; placement: Placement } | { t: 'hideLabel'; id: Id; hidden: boolean }      // LabelEntity.pinned / hidden — model data (§9)
  | { t: 'setLayer'; layer: Layer; spec: Partial<LayerSpec> }
  | { t: 'editTable'; table: TableId; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* the confirmed fates of §7.6's fallback re-derivation from the table's first reader stage (VD4-4) */ }
  | { t: 'editPreset'; preset: string; ops: RowOp[]; provenance?: 'host'; fates?: EditFate[] /* as for editTable */ } | { t: 'setStyle'; ops: RowOp[]; provenance?: 'host' }
  | { t: 'rerollLayer'; concern: RerollableConcern /* generated from the concern registry (§6.1) */; salt: number /* town-wide: the concern's new salt; 0 with `ids` */;
      ids?: Id[] /* `naming` only: re-draw these entities' names (VD2-10) */; salts?: Record<Id, number> /* with `ids`: the per-entity salts actually used (§6.3) */ }   // COV-VG-VN-008
  | { t: 'convert'; op: ConversionOp /* defined in §4.11: wallToWay, gateToJunction, outskirtToDistrict, demolish, densify, and the decline hooks abandon, decay, ruin, clear, rebuild */ }
  | { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number> }         // logged before the first edit inside a close-up (LC-18, PART II)
  | { t: 'epoch'; epoch: number; inputs: EpochInputs }                                                  // LC-11: an epoch is an event in the log (§4.11)
  | { t: 'rebase'; reason: RebaseReason; stateDigest: Hash128; version: string /* the output version whose model packages computed stateDigest — the document's output version from this event on; a frozenImport sets it to the library's current version (§2.9 steps 2–3; VD4-1) */;
      at: number /* the log head its state materialises: the previous event's seq, or h₀ when kept after edits made during load verification (§2.9 step 4); any other value is refused with E_REBASE_AT and nothing is appended (§14; VS4-2) */ }   // LC-13 (§2.9)
  | { t: 'upgrade'; from: string; to: string; mapping: MigrationMap /* §7.5 */; baseDigest?: Hash128 /* with a rebased base: base.state's model root computed under `to`, the root later loads under `to` check it against (§2.9 step 3, §7.5; VD4-1) */ }   // LC-14 (§7.5); undoable
  | { t: 'undo'; of: number /* seq of the event undone, or of the first event of its group */ }        // NF-D1: applied at the head through the same fold (§7.4)
  | { t: 'redo'; of: number /* seq of the undo it reverses */ } );                                     // NF-D1
type RowOp = { op: 'set'|'insert'|'delete'; rowKey: string; field?: string; value?: unknown; baseRowHash?: Hash64 };   // rows by stable key, never by position (LC-22)
type WarpKernel = 'displace'|'liquify'|'relax'|'bloat'|'pinch'|'equalize'|'swirl'|'jitter';
type WarpStroke = { kernel: WarpKernel; centre: PointCm; radiusCm: Cm; innerRadiusCm?: Cm; strength: number; dragCm?: VecCm };
```

No event stores a `VertexId`, `HalfEdgeId` or `FaceId` (§2.2 rule 5, GEO-5): geometry is addressed by entity address,
by lattice point with a role signature (bound by `resolveVertexAt`, never by distance alone, §2.2 rule 5), by a water
body's address with a course-knot ordinal (`moveCourseKnot`: river control knots are S1's recorded inputs, not arena
vertices, §2.3; bound as §7.4's row states), or by a ring. Undo and redo are events like the rest (§7.4): the log only
grows, which is what lets a host store it (§11.3).

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
vertices under the brush, and the kernel's `warp(field, fromLevel, region)` applies it — whole-step validation (swept
triangles, every moved edge ≥ `minEdge`, one vertex per lattice point, the clearance invariant), deterministic halving
(at most 8), Steiner re-seating, sliding of vertices that lie on fixed coarser routes, and held vertices of locked or
pinned entities, which the dry run lists — and local re-derivation of any face that then fails a class floor, logged
(§3.6, GEO-10, GEO-35, VK-7). Records that stand on a point rather than a vertex — pins, point decorations,
positional instance overrides, pinned label placements — move with their host face, and every footprint, trace and
deck the warp moved is re-based on the ground it now stands on (§7.4, "Warp and what stands on the ground"; VK2-13).
A warp with `fromLevel = 0` that moves water hands the moved shores to S1's water operator as its new water (§7.3 (b) 1).

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
every edge of a district's seam must be typed street, water, wall, reservation boundary (`reserve`), field, cliff or frame (II.1) for stage 2's `SeamContract`
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
| water, coast, rivers | `drawWater`, `moveVertex` on shores and coasts, `moveCourseKnot` on a river's control knots, `setAttr` (bank class), `delete` |
| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing), `moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |
| districts | `drawBoundary`, `merge`, `split`, `setAttr` (kind, character, name), `regenerate`, `adjust`; `setAttr(fabric)` + `regenerate` is a stage-2 template replacement |
| blocks, plots | `split`, `join`, `merge`, `fill`, `setAttr` (use, owner), `regenerate`, `lock`, `assign` |
| buildings | `drawFootprint`, `build`, `moveFootprint`, `swapUse`, `paint`, `setAttr` (class, heights, roof), `delete`, `convert` (demolish, abandon, decay, ruin, clear, rebuild), `assign` |
| walls, gates, towers | `drawWall`, `moveVertex`, `setAttr`, `delete`, `convert` (wallToWay, gateToJunction) |
| greenery, trees | `drawGreen`, tree brush, `instance`, `setAttr`, `delete` |
| fields | `setField` (prosperity, density, greenery); `setAttr` on the town's `FieldBands` (an explicit re-banding) |
| names, labels | `setAttr` (text), `moveLabel`, `hideLabel`, `rerollLayer(naming)` town-wide or on chosen entities (`ids`) |
| layers, style | `setLayer`, `setStyle`, `paintGround`; view keys (rotation, compass, layer choices) change through the view API and are not logged (§2.9) |
| people, households | `setAttr`, `setAttrMany`, `lock` with paths, `regenerate` (person scope), `pin` |
| close-ups (stage 2) | every kind above on close-up entities, after `closeup`; `instance` for presentation edits |
| rule tables, presets | `editTable`, `editPreset` (row operations, §7.6) |
| history | `epoch`, `convert`, `rebase`, `upgrade`, `undo`, `redo` |

**Dry-run validation (G-R10).** Every event is validated before commit on the scratch overlay: the schema, the
batch-local and stage-end invariants of its scope (§5.3), and the edit-fate report of its effective scope with the
case-(4) renames (§7.3 item 4) — for a chained operator (§7.3) the whole chain runs on the overlay, so the report lists
every re-sited bridge, re-routed or cut way and re-based building before anything commits; for an `undo` or `redo`, the
independence check of §7.4. Conflicts come back as actions — the nearest valid position, the blocking lock, the fates to
confirm, the dependent events — never silently resolved; a warp that would break an invariant is halved and reported. An
`E_KEPT` conflict (the edit would cross or clear finer content an earlier stage made, or content outside a coarse edit's
clear region, §3.3) is offered with one resolution: start the re-derivation at the stage that made that content (for a
wall's band parts or a margin band's part, S10's step (0) for the wall strips of the touched run or for the scope's side
of the touched stretch, §4.7, §7.3 item 2). Bridge commands from a host map one-to-one onto these events and are logged
with `author: 'host'` (§11; LC-31).

=== REPLACE §7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===

### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

1. **Effective scope.** `regenerate(scope)` finds the coarsest faces covering the scope at the scope's level; that set —
   which can be larger than the drawn area — is the effective scope, shown to the user before commit. For an edit that
   chains local operators (item 3) the effective scope is the union of every chained operator's scope. **The seam
   exception** (NF-P6): a district-scoped re-derivation's effective scope also includes its bounding ways' chains and
   `Corridor` records, the half-corridor strips on both sides and the junction wedges at the vertices its batches insert
   or remove on those spines — on a neighbour's side only II.1 (3)'s neighbour step, one `corridor_split` edge and the
   one kerb vertex it lands on (promoted) or adds —, the neighbouring cells, plots and footprints whose rings pass
   through those vertices, and the wing rings of the buildings on them (§2.6's wing-carrying rule), all changed only by
   them — a promoted vertex returning to its level when the lane goes (§2.2 rule 3) — and the `Seam` records it is party
   to (§4.6, II.4).
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
   2. *Crossings, routes, wall runs and the footprint, as data.* `siteCrossings` (§4.2 S1 (5)) runs on the changed reach
      — its sites perpendicular to the new flow, their endpoints on the new banks — and each old deck on the reach — a
      built bridge or an unused `site` (§2.7) — is matched to its **successor site**, the new site nearest its old
      midpoint within the search band (`crossing.searchBandM`, default 120 m; §6.3's bridge row). The **kept ways** are
      the ways the new channel ⊕ its bank setback meets that are arterials, or the only connection of the streets beyond
      them to a gate or the plaza (§4.11's rule), or that crossed the changed reach on a deck; they get new routes from
      S4's router over S3's lattice between their nearest pinned nodes on either side, the new channel ⊕ `attractCm`
      impassable except across a deck, every site a candidate deck and a fixed graph edge, a way's own successor site
      preferred within the detour bound (≤ 1.4 × the old length); F-ROUTE's rungs decide here (§5.2), so a deck its "one
      bridge at extra cost" rung adds is sited now, before anything is inserted. A deck is built at every site a route
      uses, and the deck at an old deck's successor site takes the old bridge's address, name (§6.3) and assignments
      when its way uses it; every other new site on the reach stays a `site` — two bank vertices on the new shores, no
      span — which (4) inserts with the shores (§2.7, §4.2 S1 (5); NP3-4). A way whose old deck lay on the changed reach
      but which the new water no longer meets keeps its geometry; its deck, now over land, becomes an ordinary segment
      in (9). The run of every enceinte that the new or the old course crosses is re-traced as data between its nearest
      unaffected towers, with a water gate where the new course crosses and none at the old (S7's operator). **The
      footprint** is computed last, from these data and before any batch: `B` = the new channel and the changed old
      channel ⊕ (`attractCm` + the bank setback); the footprint is the union — exactly, `B` lying inside the cells it
      meets — of every L1 cell that (i) `B` meets — the vacated land and the cells S6 re-assigns among them; (ii)
      borders a stretch (3) will cut, prune or replace, a kept way's replaced stretch included — so every cell S5
      regrows in (5) — or is crossed by a kept way's new route; (iii) borders the old run of a re-traced wall or a
      stretch of its setback, glacis or intervallum line that (3) removes with it — between the feet of the
      perpendiculars from the run's two end towers — or meets the re-traced run ⊕ (half its band + its setback, and +
      its glacis or berm on the field side), the cells its new strips will take (NP3-2). These are the rules of the
      carve's footprint (§4.11), so both operators clear, re-derive and check the same kind of region; the fate report
      lists exactly the protected entities inside it.
   3. *One L1 batch: the structure first.* It **declares the footprint as its `KernelTx.clearRegion` and clears it by
      §3.3 rule 1** — every finer partition face whose interior meets it, whole; structural finer edges only as this
      batch re-lays or cuts them (VK3-1). It inserts each kept way's new route and removes the stretch it replaces — so
      every way stays one connected chain (§3.10's role consistency) — placing on the route, at the new bank points, the
      two `deck_end` vertices of each deck it crosses (under a fresh `Bridge`, to which §6.3's matching hands the old
      bridge's address when (4) removes the old span), with the way's edge between them carrying `deck` beside `way`
      (the L0 batch adds none); replaces each crossed wall run by its re-traced run, with its water gate's two bank
      vertices carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7; VK3-2) — the `Gate` record (7)
      builds names them in `banks` — and removes the old run together with the stretches of its strips' setback, glacis
      and intervallum lines alongside it, each through its `StretchRef`, its ends placed by `splitThrough` at the feet
      of the perpendiculars from the run's two end towers (the new lines are cut in (7), once the banks exist); cuts
      every other way that the new channel ⊕ its bank setback meets, and every way other than a kept way at a gate that
      the re-traced run's new strips will meet (NP3-2), by F-REDERIVE's way rung (§5.2): the stretch inside removed
      through its `StretchRef`, each land part kept as a way (the part keeping the old anchor keeps the address; the
      other handed to a new way first by `retypeEdges`' `rekey` on its `StretchRef`, §3.4), a stub shorter than the
      district's minimum block width removed; and it splits every other L1 edge the new banks will cross that is no way
      — a settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis line outside a
      re-traced run — at its two bank points, each carrying an `anchor` contact name (§2.2 rule 7: the entity of the
      edge's first own-level row — on a district boundary the district first in id order, on the settlement perimeter
      the first in id order of the inner district and the hinterland pseudo-district, on a setback or glacis line its
      enceinte — at that entity's smallest free ordinal, from 2 on an enceinte; VK3-2), with the stretch between them
      removed through its `StretchRef`, and it prepares the map's `border` line at its two bank points without cutting
      it (§3.3 rule 2). Every stretch it removes is a `StretchRef` — its two end vertices on its chain — never a whole
      chain (§2.2 rule 5, §3.4). What the chain may not move — a locked or pinned way, wall or finer entity in the new
      channel ⊕ setback or in a new strip, or a reservation there — returns to the dry run as F-EDIT (lock > drawn
      geometry), with Re-derive from S3 offered for a reservation.
   4. *One L0 batch: the water.* It declares the same footprint as its clear region and clears nothing (§3.3 rule 1). It
      removes the changed reach's old shore stretches — `removeEdges` on each `StretchRef` between the points where the
      new shores leave and rejoin the old (§3.4) — and inserts the new ones through the vertices (3) prepared: the
      `deck_end`, `gate_end` and contact-name vertices, listed in `KernelTx.prepared`, promoted to L0 and their contact
      names stripped (§3.3, §3.6), each deck's span — the way's own edge between its promoted bank vertices, which
      carries `deck` beside `way` from (3) on — now lying across the water in S1 (5)'s form, so no L0 edge crosses the
      water (§2.2 rule 7), and each old deck's `Bridge` address passing to its successor (§6.3); each unused new site's
      two `deck_end` vertices are placed on the new shores as S1's L0 batch places a site's (§4.2 S1 (5); NP3-4). An old
      shore stretch shared with a quay or a riverside wall keeps its `way` or `wall` row and is demoted to L1 with its
      L0-only vertices, and a deck left over land keeps the level of its `deck_end` rows — L1 at once for a deck a carve
      or an earlier water edit prepared, L0, with no L0 edge at it, for one that S1, S3, S5a or an added deck's L0 batch
      placed — until (9) removes those rows (§2.2 rule 3's demotion; VK3-3, VK4-1, the kernel area's wording governing),
      so no L0 edge crosses land. The new shores split the finer faces they cross, which keep their owners until (6)–(8)
      re-own them (§3.3 rule 3). The batch meets no finer edge other than the prepared vertices, because (3) cleared
      every partition face the footprint meets and re-laid or cut every structural edge the new water ⊕ `attractCm`
      reaches; tree scoping (8) and F-REDERIVE (9) act only inside the footprint, and item 7 (ii) checks byte identity
      outside it less the seam exception (item 1). The old decks' and sites' bank vertices on the changed reach leave
      with their shores (their spans left with the kept ways' replaced stretches in (3)), except the deck of a way the
      new water no longer meets, which (9) turns into an ordinary segment.
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
   7. *S7.* S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
      the feet (3) left, closing them on the new banks, and builds its furniture — towers at its vertices, the water
      gate's `Gate` record at the new crossing, whose `banks` name the two `gate_end` vertices (3) placed, and none at
      the old; the strip blocks' band parts come from S10's step (0) in (8).
   8. *Tree scoping.* S8–S12b re-derive every cell of the footprint — the vacated land among them — by item 2,
      shared-edge parts included (the strips (3) and (7) changed re-run step (0), which the chain declares for NF-P5,
      §5.3), with succession by anchor for what they reproduce and fresh addresses for new faces (§6.3); the height
      samples the carve changed run (a) 2–4 — local drainage, the terrain-reading fields and exact re-basing — on what
      stands outside the footprint.
   9. *F-REDERIVE* (§5.2): a deck left over land becomes an ordinary segment of its way — `removeEdges` on
      `ChainRef('deck', bridge)` and on its two `VertexRef('deck_end', bridge, i)`, after which demotion takes its bank
      vertices to the way's level (§2.2 rule 3; VK3-3, VK4-1) — and its `Bridge` a tombstone; a `site` left over land is
      removed, its `deck_end` rows by `removeEdges` on their `VertexRef`s and its record a tombstone (§2.7; NP3-4); and
      every re-route, cut, pruned stub, succession and demolition of the chain is listed in the fate report with its
      lifecycle event.
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
   supersede events). The user sees counts and the list and confirms every fate other than kept; the confirmed fates are
   stored in the event, and a replay that computes different fates reports a mismatch. A chained edit's report also
   lists the unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based
   or demolished — with their lifecycle events; and every edit's report lists the generated names it re-draws because
   their naming inputs changed (§6.3 case (4); VD3-2), old and new text side by side, which the user confirms before the
   edit commits, exactly as a fate list: the confirmed renames are stored in the event beside its fates
   (`EditBase.renames`, §7.1; VD4-4), an action whose dry run lists any returns `confirm` even when its scope holds no
   protected entity (§11.2), and a replay or a receiving client that computes different renames reports a mismatch, as
   for fates. The events that end a name's protection — an `unlock` or an `unassign` that frees it, and an `undo`,
   `redo` or `revert` whose result removes the `setAttr`, `lock` or `assign` that held it — run case (4) for the freed
   name in their dry run and list and store its rename the same way (§2.8; VD4-3).
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
7. **The oracle** (GEO-11, LC-10, IMP-7; run on every B-EDIT sequence): (i) **replay = session** — replaying base and
   log in log order gives the session's model digest, on sequences that mix drawn features with later attribute edits,
   epochs, rebases, undo and redo; among them the **naming-collision fixture** (N-1): two scoped regenerations in
   different districts whose new ways draw the same street name, followed by a `moveLabel` on the second way's label and
   a `setAttr(name)` on the first — the replay's names, `LabelEntity` records and digest equal the session's — and a
   corpus selection and a naming-row edit with their case-(4) renames (§6.3), stored in the events and recomputed equal
   (VD4-4); (ii) **outside the scope, byte-identical** — every entity outside the effective scope keeps its leaf digest;
   the oracle **computes** the seam exception (item 1) from the batches' commit records — changed faces per level, the
   portal roles added or removed — and checks each excepted neighbour cell, plot, footprint and wing ring equal to its
   prior ring after removing those vertices (NF-P6, NP3-1); (iii) **content** — content and relation digests outside the
   scope are unchanged; (iv) **faithfulness** — Regenerate (keep settings) is checked by byte identity; New random is
   checked per regenerated scope against K = 50 independent from-scratch generations of the same scope (same context,
   rerolls 32 768 + i, i = 0 … K − 1): for each of its median plot area, frontage width, density and attached share, the
   **rank** of the regenerated value among the K generations — the references below it plus a uniform draw from 0 … t
   over the t references equal to it, drawn from the campaign's own stream (exactly uniform on 0…K for a perfect
   regenerator, whatever K, ties included); a campaign of n = 800 regenerated scopes per nightly run — 400 block, 400
   district (§13.2; VS2-9) — fails when a χ² test on the 10-bin rank histogram (expected counts proportional to the
   ranks each bin holds) rejects at family-wise p < 0.01, Holm over the four statistics — calibrated (executed: 1.0–1.4
   % false campaign failures) with ≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×), too-loose (1.5 ×) and biased (+0.25
   sd) regeneration with the four statistics correlated at ρ = 0.8 (≥ 99.3 % at ρ = 1; 400 scopes caught only 92–95 %);
   without the randomised tie-break a tied statistic fails every perfect campaign
   (`docs/validation/bench/fixall_verify_scope_o9c_rank.out`, `fixall_scope_r2_o9c_power.out`,
   `fixall_scope_r3_o9c_n800.out`; IMP-7, restated in §15.2 O9 (c)); (v) **coarse edits** (LC-7, VD2-1, VK3-1) —
   course-knot, drawn-water, moved-shore, level-0 warp and terrain-brush sequences in both water modes end with 0 decks
   over land, 0 off-deck crossings, 0 wings off §2.6's datum rule, 0 footprints in water, every arterial at its
   destinations or reported `unserved`, and every bridge that still has a site within the band keeping its address and
   name; a river move across a street grid commits (no `E_LEVEL` or `E_KEPT`) with its decks on the kept ways and its
   cuts on the others, every face outside (b)'s footprint byte-identical; **a pond drawn inside a block, and a river
   bank widened into its riverside blocks between two bridges, each commit with no `E_LEVEL` or `E_KEPT` and every face
   outside the footprint byte-identical** (VK3-1); a river moved across a wall between two towers commits likewise,
   every indexed role unique per ordinal, the water gate's `Gate.banks` on its two `gate_end` vertices, no `anchor`
   contact name left after the edit, and 0 NF-P5 violations (NP3-2, VK3-2, VD3-6); a river moved across the settlement
   perimeter leaves 0 district faces outside the perimeter (NP3-3); a course-knot move replayed after an upgrade that
   changed S1's knot count binds its knot by address and ordinal or is reported orphaned, never bound to another body's
   knot (VK2-12); (vi) **shared-edge identity** (VK2-2) — Regenerate (keep settings) of a perimeter district, of a
   walled district and of the hinterland is byte-identical to the one-click result; after `outskirtToDistrict`,
   `drawBoundary` and a district merge, every L1 edge two face sets share without corridors carries a margin band on
   both sides and no other edge carries one (item 3's S6 row).

=== REPLACE §7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===

### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

**Replay semantics** (LC-10). The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay. Nothing is hoisted, and epochs, rebases, upgrades, undo and
redo are events like any other.

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the name's naming record dormant, and an `unlock` that frees it runs §6.3's case (4) for that name in its dry run, the rename listed, confirmed and stored in the event (§2.8; VD4-3) | inverse event — an undo of a `lock` that frees a name runs case (4) as an unlock does; an unlock that re-drew a name keeps an undo record with the former name and naming record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query is resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while it is edited, its naming record kept dormant, §2.8; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2) | inverse (old values in the undo record); undoing — or reverting — a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs §6.3's case (4) for it in that event's dry run, the rename listed and confirmed and the text it replaces kept in that event's undo record (VD4-3) | attribute names are schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | whole-step validation (§3.6): moved edges ≥ `minEdge` and against swept triangles, one vertex per lattice point, the clearance invariant, global deterministic halving; vertices on fixed coarser routes slide; vertices of locked or pinned entities are held; kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); point-anchored records and buildings' stored wing rings move with their host faces and everything the move carried is re-based ("Warp and what stands on the ground", below); a move of water hands the moved shores to S1's water operator (§7.3 (b)) | undo record (moved vertices, re-derived faces, promoted and demoted vertices' and edges' former birth levels and flags, the former points of displaced records, the former wing rings and stored composition rings and the former bases of re-based entities) | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot (VK2-12) | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at` and `to` | S1's water operator (§7.3 (b)): the course through the knots between the moved knot's neighbours, the moved knot kept by every later re-trace | undo record (the replaced scope of the whole chain and the knot's former position) | binds on replay, after the water body's address is carried (§6.3), (1) the knot with that ordinal if it lies within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)) —, (2) else the nearest knot of that body within the radius, ties by ordinal, (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1) | entities with `existence = built`, author `user` | log (the geometry is the payload) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record (the replaced scope of the whole chain) | the same geometry replays at its log position under the new version |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. abandon, decay, ruin, clear, rebuild) | context actions | lifecycle events with cause | log | structural ops on the plat (§3.4) with dependants re-derived; `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8); a split or join of a chain that carries a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4), which gives each part a cut knot carrying the sampled value and drops a join knot only where the joined profile is unchanged (§2.2 rule 5, §3.4), and the event writes both records' returned profiles (VK2-8) | undo record (members resurrect, tombstones return to live; both records' former profiles) | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, the absolute rerolls used, confirmed fates and renames (VD4-4) | §7.3; New random's content check (§5.1 (6)); an `adjust` of the pack list, and any re-derivation whose scope reaches S13a, re-draws the unedited names whose naming records cite a changed slice (§6.3 case (4); VD3-2), the renames listed in the fate report for confirmation | undo record: the faces, entities (their names and naming records included), lifecycle events and tombstones of the effective scope, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates are recomputed and compared |
| assign / unassign | assignment dialog / host API | `assignment` fields, `flags.assigned` | log; blueprint assignments at positions 0…k | the claims-first re-derivation of its scope (§7.7); an assigned name keeps the entity's naming record dormant, and an `unassign` that frees it runs §6.3's case (4) for it (§2.8; VD4-3) | undo record | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond the tolerance re-derive (§7.2); terrain strokes: S1's terrain operator — local drainage, re-basing of everything on the changed ground, the terrain-reading drivers, and in `follow` mode the water operator (§7.3 (a)) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region | strokes are geometry and replay |
| editTable / editPreset / setStyle | tables editor, presets and style dialogs | the override layer (§7.6) | log: row operations by key, with the base row's hash, and the confirmed fates of the fallback and renames (VD4-4) | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice re-draws exactly the unedited names whose naming records cite it (§6.3 case (4); VD3-2), listed in the dry run's report for confirmation; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations, and the re-derived entities — the renamed names with their former naming records among them — restored from the undo record, never re-drawn | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession recorded after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10; NF-D11) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — the rerollable concerns of §6.1, generated from the concern registry; names also on chosen entities (`ids`, VD2-10) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts the event carries | log (absolute salts; with `ids`, the salts actually used after §6.3's unchanged-name advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names (`ids`), uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for a naming reroll the previous names and their naming records, from the undo record (VD4-3) | replays |
| revert (reset to generated; COV-MFCG-L08) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events are applied in reverse log order at the revert's position; edits to other entities stay; a name the revert frees runs §6.3's case (4), the rename listed, confirmed and stored in the event (§2.8; VD4-3) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position (§9.2; N-28) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b's placement (§9); the `LabelEntity` exists at the event's log position in the session and on replay, because S13a runs per event (§7.3 item 2) | inverse | follows the label's target address; an unmapped target → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person (LC-16) | an explicit action or an edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2; LC-18) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position, and reports orphans | undo record | replays |
| epoch (LC-11) | `grow(doc, inputs)` (§4.11) or an entry of the circumstance schedule | the derived `EpochRecord`; lifecycle events with cause | log | the incremental path of §4.11 at its log position | undo record: the faces and entities the epoch replaced (O(epoch scope)) | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase (LC-13) | keeping the saved town on a mismatch; Rebuild around my drawings; editing a frozen import (keeping the old model at an upgrade needs none: the document stays at its own output version, §7.5) | the document's base | the base state and the event, whose `version` names the output version that computed its `stateDigest` (VD4-1) and whose `at` names the log head the state materialises — `h₀` when the saved town is kept after edits made during load verification (§2.9 step 4); the events before `at` stay in the log (§2.9) | replay starts from the rebased state — checked against its root of record for the replay's output version (§2.9 step 3; VD4-1) — and folds the events after `at`; the `rebase` event itself is a no-op for a client whose base it already is, and a replay from the recipe folds an undone `rebase` and its `undo` as a no-op pair, every event between them being undone (a whole-town event is undoable only as the latest live event). **On another client of a bridged document** (VD3-4): a `keptSnapshot` rebase whose `at` lies behind the client's head and whose `stateDigest` differs from the client's root at `at` installs the snapshot at `at` from the `doc.load` bytes the client kept and re-applies the events after `at` through the fold (fates recomputed and differences reported, undo records rebuilt; §2.9 step 4); one whose `stateDigest` equals that root changes nothing; any other rebase behind the head (a hand-built log) is a reported no-op; a load whose log already holds a `keptSnapshot` rebase at `model.seq` with `stateDigest = model.digest` takes `model` as that base without asking | the previous base (NF-D4): when it is the recipe — always kept in a rebased base — the undo restores it and replays the kept log; when it is an earlier rebased state, that state is the undo record, held in the undo section under its cap; past the cap, or when the replay would need an output version outside the browser's window, the undo is withdrawn with a notice (the CLI replays any version, §6.4); a `redo` of the rebase re-installs the rebased state, which the undo keeps in the undo section under the same cap (past it the redo is withdrawn with a notice) | the rebased state migrates by the schema chain; an `upgrade` checks it under `from` against its root of record, then records its root under `to` as `baseDigest` (§7.5; VD4-1); it is not seed-reproducible |
| upgrade (LC-14) | explicit, after the diff (§7.5) | the document's output version | log, with `baseDigest` for a rebased base and the packs it saved in its mapping (VD4-1, VD4-9) | §7.5 — a rebased base checked under `from` and re-rooted under `to`, and every pack `to` stops shipping copied into `packs` first; the mapping hands names on with addresses and re-draws the unedited names whose naming slices the new tables changed (§6.3 case (4)), listed in the diff | the undo record is `upgrade.from` (NF-D4): undo replays base and log before the upgrade under that output version — a rebased base checked against its root of record for `from` — exactly the pre-upgrade digest; in the session the checkpoint taken before the upgrade makes it instant; outside the browser's version window the undo is withdrawn there with the CLI command shown | — |
| undo / redo (NF-D1) | ctrl / cmd+Z, ctrl / cmd+shift+Z, the API's `undo(h)` / `redo(h)`, a host's `doc.apply` | the live or undone status of each event, derived from the log | log (`of`) | after the independence check below: `undo` restores its target's scope from the target's undo record; `redo` re-applies the target at the head, its lifecycle events citing the target's `seq` and its minted addresses the target's own; an `undo` or `redo` whose result frees a name runs §6.3's case (4) for it, the rename listed, confirmed and stored in the event (§2.8; VD4-3) | an `undo` is undone by a `redo`, a `redo` by an `undo` (exact inverses) | replays; a target's record is rebuilt under the new version by the replay |
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
  faces, entity records, lifecycle events and tombstones its effective scope replaced, the former birth levels, `split`
  flags and stripped contact names of the vertices it promoted, and the former levels and flags of the vertices and
  edges it demoted or unflagged (§2.2 rule 3; `CommitRecord.promoted`, `demoted`, `unflagged`), and the list of
  addresses it created, changed or removed (its *touched set*) — so undo costs O(scope), never a copy of the whole
  model. `undo` restores the target's scope from that record and withdraws the addresses the target minted (§6.3);
  `redo` re-applies the target at the head from its stored, already-resolved payload (scope, absolute rerolls, confirmed
  fates), so from the restored state it reproduces the target's result exactly.
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
  `seq` (§6.3), is the same in both logs. The canonical `nextSeq` (§2.9) never moves back. Because an `undo` removes its
  target's lifecycle entries and tombstones and a `redo` re-inserts them, both citing the target's `seq` (§2.8), the
  lifecycle block, the archive and the model digest of the truncated log equal those of the log with the pair kept. The
  truncated target is held on the session's redo stack in the saved `undo` section (`UndoRecord.redo`, §2.9), so a redo
  after a reload re-appends it. A truncation that drops the last logged event naming a non-shipped pack drops that pack
  from the pack set, but its content stays in `packs` while that redo entry names it, and leaves at the next save only
  once the entry is cleared by a new event from the session or leaves the section's cap (§2.9; VD3-3, VD4-7). A B-EDIT
  property test over random sequences (§6.5 (9)) folds each both ways — among them a redo followed by a user-created
  entity, the `setAttr(name)` + `undo` and naming `rerollLayer` + `undo` pairs each followed by a corpus selection, and
  a corpus selection + `undo` truncated, saved, reloaded and redone (§6.5 (9); VD4-3, VD4-7) — and requires equal model
  digests and equal addresses. A document attached to a host bridge never truncates.
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
`Pin.host`'s faces), `Decoration.point` (the L3 face that contains it), the current position of a positional `instance`
override — a `move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — held in the
model's override table of its entity (§8.10), and a pinned label's `Placement` anchor and spine (its target's faces, or
its target's corridor for a way, §9.1). After the kernel's commit the edit layer takes every such record whose host face
has a moved vertex (the commit record's `moved` list, §3.3) and computes its new point from the move itself: the point's
mean-value coordinates in its host face's outer ring before the move, applied to the ring after it — `+ − × ÷` and
`sqrt` only (§6.5), rounded to the lattice. A record whose new point lies outside its host face, or nearer its boundary
than the record's clearance (a pin's footprint radius, `Decoration.keepClearCm`, half an instance spacing, a label's
box), is **re-seated** at the nearest lattice point of the host face inset by that clearance, ties by (y, x); if that
inset is empty, a generated pin or decoration is re-placed by its placement rule in its host (§4.7 S11, §4.9) and a
user's record — an override, a pinned label, a user-placed or edited pin — is orphaned and reported. A record of a
locked or pinned entity is held like a held vertex: the warp's whole-step validation requires it to stay inside its host
face at its clearance and halves the step otherwise (§3.6), and the dry run lists it. **A building's stored wing rings**
(§2.6; its site-plan slots store no polygon, §2.5) — and its stored stage-3 `Composition`, when one is stored (§2.6;
NP4-2, the pipeline area's wording governing) — are carried with its footprint face in the same pass, by §2.6's
wing-carrying rule (NP3-1): each wing's boundary runs — the parts of its ring on the footprint's boundary, runs of the
footprint's rings vertex for vertex — are re-read from the moved rings, every other wing vertex (a joint inside the
footprint) follows its mean-value coordinates in the footprint's rings, outer and holes, rounded to the lattice, a rect
that fails the convex near-rectangle test becomes a quad (§2.6 rule 3), and the step's whole-step validation includes
§2.6's check — the carried rings simple, the wings uniting to the moved footprint face — through `warp`'s `recordCheck`,
halving the step when it fails, as for a held pin (§3.6). Every entity whose footprint, trace, deck or pier the move
carried is re-based by §2.6's datum step on the ground it now stands on (§7.3 (a) 4), a user-edited base kept. The undo
record keeps every former point, wing ring, composition ring and base, and a replay recomputes the same points and rings
because it replays the same operation on the same geometry. Stamp and grid instances are world-anchored patterns and are
not displaced: the host's new boundary only decides which of them survive (§8.10). *Test (B-EDIT):* a warp that drags a
square keeps its fountain inside the square at the same mean-value coordinates; a warp over a yard keeps a user-moved
tree in that yard; a pinned pin at the edge of a warped square halves the step; a warp and a `moveVertex` over a built
block leave every building's wings subdividing its moved footprint (§2.6's test); replay reproduces all four. *Chose to
carry point records by mean-value coordinates in their host face over leaving them at their world positions or
re-placing every one by its rule, because a fountain, a shrine or a tree the user moved stands on the ground the user
dragged, and re-placing would move generated furniture that the warp did not need to move; stamps stay world-anchored
because they are a fill pattern, not objects.*

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
| draw bridges | `drawWay` (class `bridge`) across a river face | a `Bridge` on §4.2 S1 (5)'s perpendicular deck where the drawn line crosses the channel's centreline — the unused `site` within `crossing.snapM` (20 m) of that point, which the drawn way builds, or else a new deck whose two `deck_end` vertices one L0 batch of two shore splits places first, nothing cleared (NP3-4) — then S4's operator lays the drawn way's ends through them with the deck pinned; §5.3's crossing invariant holds |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator (§7.3 (b)): the moved coast taken as the new water (no re-trace, §2.3) with its contours clipped, any deck on it re-sited, the footprint's partition content cleared, the kept ways re-laid through their decks and the others cut before the water is inserted, S5 and S6 for the cut cells and the vacated land; F-REDERIVE |

=== REPLACE §7.5 Migration and upgrade (G-P9) ===

### 7.5 Migration and upgrade (G-P9)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r2; drafted by fixall/draft-determinism-r2

`migrate(doc, to)` has two parts.

1. **The schema chain** — a sequence of pure, versioned transforms over the document format, forward only. A document
   whose schema is newer than the running library opens read-only with a message (view and export; LC-28).
2. **The upgrade** (a new output version) — an explicit, undoable `upgrade` event (LC-14):
   * the base and the whole ordered log — epochs included — replay under the new output version into a new model; **a
     rebased base is checked, then re-rooted** (VD4-1): before the replay, `base.state` is decoded under `from` and its
     model root compared with its root of record for `from` (§2.9 step 3) — a mismatch refuses the upgrade with a
     message, the document staying at `from` —, and the replay decodes it under `to`; the upgrade records the model root
     of that decoded state as `baseDigest`, the root every later load under `to` checks it against;
   * **the mapping**: entities of the old model are matched to the new one by kind, anchor within the kind's hysteresis
     radius, class family and, for faces and chains, overlap (IoU ≥ 0.5), through §6.3's matching routine and budget; a
     matched entity hands its address to its successor (§6.3), and edits follow it only through §7.3's class-family
     check; **nothing is matched by string equality**;
   * **packs the new version stops shipping** (VD4-9): before the upgrade commits, every pack of the pack set (§2.9)
     that `to` does not ship and `packs` does not hold is copied into `packs` from `from`'s shipped copy — at hand in
     the browser, where `from` is the document's own version inside the window and its retained chunk carries its
     shipped packs (§6.4), and in the CLI — and the mapping names it in `packsSaved`, so the upgrade event names the
     pack and its content stays (§2.9's pack set); a copy that would pass §2.9's 2 MB cap is an F-EDIT conflict naming
     the pack and the size, nothing committed, with removing the pack (an `adjust`) or keeping the old model offered;
   * an unmatched edit is a reported **orphan**, kept in the log and listed in the orphan table, never silently bound
     to another entity;
   * an **orphaned lock re-imposes its last geometry** as a drawn constraint (a `drawFootprint`, `drawWay`,
     `drawBoundary` or `drawWater` event appended at the upgrade's position) unless the user drops it, so a locked
     building stays where it was;
   * a **diff** — entities changed, orphans, statistics deltas, and a per-epoch diff for a multi-epoch document — is
     shown before commit;
   * **undo** (NF-D4): the upgrade's undo record is its `from` output version, not a stored copy of the old model.
     Undoing it replays the base and the log before the upgrade under `from` — the retained N−1 or N−2 chunk in the
     browser, any published version in the CLI (§6.4) — which reproduces the pre-upgrade model exactly, digest included
     (a rebased base checked there against its root of record for `from`, §2.9 step 3); within the session the
     checkpoint taken before the upgrade (§7.4) makes the undo instant. When `from` has left the browser's window (the
     library was updated twice since), the undo is withdrawn there with a notice and the CLI command; the upgrade's diff
     stays viewable. *Chose the replay under the retained version over storing the pre-upgrade model outside the undo
     cap, because a METROPOLIS model alone exceeds the 8 MB document budget (§2.9) while the replay reproduces it
     exactly from inputs the document already holds.*
   The user may instead **keep the old model**: the document stays at its output version while that version is inside
   the retention window (§6.4); outside it the document opens as a frozen view, and its one edit is a `rebase` (§2.9).
   FTG's "no way to regenerate old towns with new features" and "cannot be undone" are the weaknesses answered.

```ts
interface MigrationMap {                  // what the upgrade computed and the user saw in its diff; a replay recomputes it and reports a difference, as for fates (§7.3 item 4)
  orphans: Id[];                          // the targets of logged edits left without a successor: kept in the log, listed in the orphan table
  packsSaved: { id: string; version: string; hash: Hash128 }[];   // the pack-set packs `to` does not ship whose content this upgrade copied into `packs` (VD4-9)
}   // the address hand-offs are recomputed by §6.3's matching routine on every replay, never stored, so an upgrade event stays small; its renames are EditBase.renames (§7.1)
```

*Chose to check a rebased base under `from` and record its root under `to` in the upgrade event, over comparing a root
recomputed under `to` with the one recorded under `from`, because a root is a function of the model packages that
computed it — a changed field driver or leaf encoding moves it — so only roots made by the same version can be compared,
and the upgrade is the one moment both versions' packages are loaded (VD4-1). Chose to copy a pack the new version stops
shipping into the document at the upgrade, over keeping every published version's shipped packs in the browser library,
because the upgrade is the last moment the browser is sure to hold `from`'s copy, and the document then carries what it
needs wherever it is opened (VD4-9).*

*Test (M3a):* the golden suite replays under N−1 and N−2; a corpus of edited documents upgraded across one output
version keeps 100 % of edited entities or reports each orphan (O9 e); an upgrade undone — in the session and after a
reload — restores the pre-upgrade digest exactly; a METROPOLIS document's saved size does not grow with its upgrades
beyond the upgrade events themselves; a `keptSnapshot`-rebased CITY document upgraded across a test output version whose
field driver and digest leaf encoding differ from `from`'s opens editable after a reload and replays to the session's
digest, and the upgrade undone restores the pre-upgrade digest (VD4-1); a document using a pack that `to` stops shipping
holds it in `packs` after the upgrade and reopens with it once `from` has left the window (VD4-9).

=== REPLACE §7.6 The override layer and editable tables (G-P12; owner amendment 5) ===

### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-determinism-r5); earlier revision fixall/integrate-r4; drafted by fixall/draft-determinism-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-determinism-r3

`effectiveParams = defaults(pinned table versions) ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ log events`, each
layer a sparse delta with provenance; setting packs are recorded in the recipe, or in the `adjust` that adds them, by
id, version and content hash (§2.9); the UI shows which layer set a value and the report lists auto-resolved values
with reasons (O16 a–b).

* **Preferences are folded in at creation** (LC-15). When a document is created, the packs, the preset, the user's
  global preferences and any document overrides are copied into the recipe's `params` delta, shown in the panel as "from your
  preferences". A later change to the machine's preferences never changes an existing document; applying them is the
  explicit action "apply my current preferences", logged as one `adjust` per changed parameter with its locality class.
* **Pack content travels with the document** (NF-D2, VD3-3). A pack is data — grammars, corpora, ancestries, religions,
  appearance templates, roster row operations, style hints (§10.4) — and much of it (a grammar, a corpus) is not a
  parameter that folds into `params`. So the content of every pack of the document's **pack set** that is not in the
  output version's shipped set is copied into the document's `packs` block, with its id, version, author and content
  hash — when the document is created for the recipe's packs, and when an `adjust` adds one. Adding or removing a pack
  in an existing document is an `adjust` of the recipe's pack list (`param: 'packs'`) — a Re-derive from the pack's
  first reader stage, with the fate report (§7.1) — and a pack's content stays in `packs` while the base recipe or any
  event of the log names it, a removal included, or a truncated event held on a saved redo stack does (§2.9's pack set;
  VD4-7). When the added or removed pack changes a naming slice — a grammar row, or the corpus a field of a culture or
  ancestry row names — S13a re-draws exactly the unedited names whose naming records cite a changed slice (§6.3 case
  (4); VD3-2), and the fate report lists the renames for confirmation.
* **A user-uploaded corpus is such a pack** (VD2-8, VD3-2, VD3-3): selecting it wherever a corpus is chosen (§10.4) is
  that `adjust`, which enters it in the pack list as `user:<content hash>` with `shipped: false` and its content in
  `packs` (§2.9). Its content is the corpus and the keyed row operation (`RowOp`, §7.1) that sets the chosen corpus
  field of the culture or ancestry row the user chose to it instead of the corpus it replaces (§10.4), so the binding
  travels in the pack's content and hash, and the pack layer applies it like any pack's rows: exactly the names drawn
  from that field re-draw from the new corpus and every other name stays (§6.3 case (4); VD4-5); deselecting it is a
  second `adjust` that removes the entry the same way, its content kept saved while the first names it. A replay
  resolves every pack of the pack set by hash from the document first (§2.9), so it never depends on what is installed;
  a link is emitted only when every pack of the pack set is shipped, so never for a town whose history selects a user
  corpus (§6.4).
* **Tables have keyed rows** (LC-22). Every rule table — size ladder, stage regimes, way widths, granularity, site
  plans, class rules and class families, heights, wall spacing, greenery, drivers, naming, style sheets, the dependency
  graph, S0's feature probabilities, the work-limit coefficients (§5.1 (5)) — is versioned JSON: a map from a stable row
  key to a row whose cells carry `{value, unit, provenance: {source, date, note}, calibratable}`. Each table's schema
  declares its **readers** (the stages that consult it) and its **slice kinds** (row, weights, bracket, thresholds,
  match — §2.8). **A naming slice of a culture or ancestry row is one field of it** (VD4-5): a `SliceRef` of kind `row`
  with key `<rowKey>/<field>`, hashed over that field's value and, for a corpus field, the named corpus's content hash,
  so a slice's hash changes when the corpus behind it changes (VD3-2); a naming draw cites only the fields it read, so a
  `set` on one corpus field — a user corpus pack's binding among them — changes exactly the names drawn from that field.
  Every other slice, of these rows and of every other table, stays a whole row, weight vector, bracket, threshold set or
  match set (§2.8). *Chose field slices for these rows over whole-row slices, because a culture or ancestry row names
  several corpora — streets, districts, people — and a whole-row slice re-draws every name drawn through the row when
  one list is replaced, rewriting their naming records and, where a scoped uniqueness pass resolves differently, their
  text, against §6.3's rule that a list change leaves every other name alone.*
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
  table's first reader stage**, with the fate report, its confirmed fates stored in the `editTable` or `editPreset`
  event (§7.1; VD4-4).
* **Host tables** (LC-31) arrive as `editTable`, `editPreset` or `setStyle` events whose content is copied into the log
  with provenance `host` (source, date, version), so a document replays without its host (§11.4).
* **Users and us.** Users edit through the tables editor and presets dialog (the preference layer); we change the
  system through new table versions — a declared shift whenever output changes (§6.4). The corpus phase replaces values
  and updates provenance without code changes; the default path with no edits is byte-identical to the shipped defaults
  (O10 h).

## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Written after reading the integrated `docs/ARCHITECTURE.md` (10 723 lines) in full for §2.8–§2.9 and §5–§7, and, for
the cross-references, §3.9, §3.10, §9.6, §10.4, §11.2, §11.3, §12.6, §12.8, §13.2's B-EDIT list, §13.3's `WaterSetting`,
§14's `EditEngine`, §16's M2a and M3a rows and the judgment table; with `r4-verify-determinism.md` and the other four
round-4 verifications for the companion items. Every string a request below asks to replace was found exactly once in
the integrated text by a whitespace-normalised search (§5). Ids in brackets are the items each change serves.

**Companion text of other areas' round-4 findings, folded into this file's blocks** (so each replaced subsection is
coherent on its own; **the owning lane's round-5 wording governs**, and the integrator aligns these sentences to it):
VD4-10 (pipeline) in §5.2's F-ROUTE rung; NP4-5 (pipeline) in §5.2's F-WALL test column; NP4-7 (c) (pipeline) and
VK4-1 (kernel) in §5.2's F-REDERIVE row; VK4-1 in §7.3 (b) 4 and (b) 9; VK4-2 (kernel) in §5.3's kernel row ("the
placement bound and level consistency"); NP4-2 (pipeline) in §7.4's warp row and "Warp and what stands on the ground"
(a stored stage-3 `Composition` carried beside the wing rings); NR4-3 (rendering) in §6.5 (3); VS4-2 (scope) in §7.1's
`rebase` comment (`E_REBASE_AT`, nothing appended).

### 3.1 To the kernel area

| # | section | request |
|---|---|---|
| KR5-1 | §3.9, the load paragraph [VD4-1] | After "the per-level digests are recomputed from the rebuilt arena as part of the load's one full digest recomputation, whose root §2.9 step 3 compares with `model.digest` before the first edit (VD3-1)" add "— run under the model packages of the document's own output version, the ones that recorded that root (VD4-1); a frozen view's arena is rebuilt for display only and its digests are not recomputed (§2.9 step 2)". |
| KR5-2 | §2.2 rule 3 (c), §3.1, §3.6 / J-K18 [VK4-1, VK4-2 alignment] | This file's §5.2, §5.3 and §7.3 (b) 4 and 9 carry the VK4-1 and VK4-2 wording the round-4 verifier prescribed (a deck over land keeps the level of its `deck_end` rows until F-REDERIVE removes them by `removeEdges` on `ChainRef('deck', bridge)` and its two `VertexRef('deck_end', bridge, i)`; "the placement bound and level consistency" in place of "the Steiner bound"). The kernel's round-5 blocks govern; the integrator aligns these sentences to them. |

### 3.2 To the pipeline area

| # | section | request |
|---|---|---|
| PR5-1 | §10.4, "Per-culture generators and user lists" [VD4-5] | (a) Replace "a row that names a corpus hashes the corpus's content hash with the row (§7.6)" with "each corpus field of a culture or ancestry row is its own naming slice — the (row, field) pair, hashed with the named corpus's content hash (§7.6; VD4-5) —". (b) Replace "selecting it therefore re-draws exactly the unedited names drawn through that row" with "selecting it therefore re-draws exactly the unedited names drawn from that field — never the row's other names". (c) In the pack paragraph, "a user corpus pack is `{ corpora: [the uploaded list], tablePatch: [one set on the chosen culture or ancestry row's corpus field] }`" stays as it is: the `set` is field-level already, which is what makes (a) exact. |
| PR5-2 | §4.2 S1 (5), §4.1's S4 row [VD4-10 alignment] | §5.2's F-ROUTE rung now carries the sentence VD4-10 prescribed ("inside S1's water operator, whose new water is not yet inserted, the rung only sites the deck, its bank vertices placed on the route by the operator's L1 batch and promoted by its L0 batch (§7.3 (b) 2–4)"). VD4-10 is the pipeline's item; its round-5 wording governs and the integrator aligns §5.2. |
| PR5-3 | §2.6 [NP4-2, NP4-5, NP4-7 alignment] | §7.4 now names a stored stage-3 `Composition` beside the wing rings in the warp row, the warp paragraph and the undo record; §5.2's F-WALL test says "main gates = N exact, plus a harbour gate … where one was placed" and "0 main gates"; §5.2's F-REDERIVE row removes a `site` left over land. The pipeline's round-5 blocks govern the wording (for NP4-2, the name of the function that carries a composition). |

### 3.3 To the rendering area

| # | section | request |
|---|---|---|
| RR5-1 | §11.2, `ApplyResult`, `PlatApi.confirm` and "Confirming fates (NF-D14)" [VD4-4, VD4-3] | (a) In `ApplyResult`'s `confirm` variant add `renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */` beside `fates`. (b) `confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>`. (c) In "Confirming fates": after ""discard edits in scope" —" add "or whose dry run lists case-(4) renames (§6.3; VD4-4) — an `unlock`, `unassign`, `undo`, `redo` or `revert` that frees a name among them (VD4-3) —"; the token becomes "H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames)"; "the fates equal the dry run's list" → "the fates and the renames equal the dry run's lists"; "Resubmitting the event through `edit` with its `fates` filled" → "with its `fates` and `renames` filled"; "the committed event must carry exactly the fates the user saw" → "exactly the fates and renames the user saw" (the phrase occurs twice: in this paragraph and in J-R33's row; change both). (d) The `query({ kind: 'fates' })` pages return the renames after the fates. |
| RR5-2 | §11.3, Convergence, Roles, Version handshake [VD4-4, VD4-2, VD4-1] | (a) Convergence: "as an event carrying its `fates`" → "as an event carrying its `fates` and `renames`", and "reporting a mismatch if it computes different ones" stays (it now covers both). (b) Roles: after "re-applies the events after `h₀` (§2.9 step 4; VD3-4)" add "; under §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation (VD4-2)". (c) Version handshake: after "it opens the snapshot read-only (its role drops to viewer, and it says so)" add "as §2.9 step 2's frozen view does — checked by its chunks' content hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch (VD4-1)". |
| RR5-3 | §9.6 [VD4-5] | (a) Replace "a grammar row it used, or the corpus a row that chose it names (§6.3 case (4))" with "a grammar row it used, or the corpus a field of the culture or ancestry row that chose it names — a (row, field) slice (§6.3 case (4), §7.6; VD4-5)". (b) In the test, replace "selecting a user corpus renames exactly the unedited names drawn through the rows it replaces, and no other name (§6.3)" with "selecting a user corpus renames exactly the unedited names drawn from the field it replaces, and no other name — not the district names drawn through the same row (§6.3; VD4-5)". |
| RR5-4 | §12.6 "Replay and load verification" [VD4-6, VD4-2] | (a) Replace "the recomputation ≈ 31–34 ms at CITY, measured synthetic" with "the recomputation of its model and records trees ≈ 35–38 ms at CITY, measured synthetic (`fixall_det_r4_loaddigest.out`, `fixall_det_r5_recordsdigest.out`)". (b) Replace "and "trust the saved town" ends the wait (NR-8)" with "and "trust the saved town" ends the wait once the saved copy's own roots have matched (NR-8, VD4-2)". (c) In V's law, "5 ms finalises the digest" → "5 ms finalises the model and records digests". |
| RR5-5 | §12.8, the entity-store line [VD4-6] | Replace "the load's digest tree (≈ 1 MB at CITY, §6.2) sits in the entity-store line" with "the load's digest trees (the model tree ≈ 1 MB and the records tree ≈ 0.25 MB at CITY, §6.2) sit in the entity-store line", and "with the load's digest tree (≈ 1 MB)" with "with the load's digest trees (≈ 1.25 MB)". |

### 3.4 To the scope area

| # | section | request |
|---|---|---|
| SR5-1 | §13.2 "B-EDIT and the locality oracle" [VD4-1, VD4-2, VD4-3, VD4-4, VD4-5, VD4-6, VD4-7] | (a) After "reported as a corrupt cache and loaded by replay, never verified (§2.9 steps 3–4; VD3-1)" add "; the same snapshot under a forced §6.2 (iii), "trust the saved town" and a save waiting for the recomputation and the snapshot never kept (VD4-2); a snapshot with one altered naming record — a corrupt cache when its `recordsDigest` is left as written, a records mismatch rebuilt from the replay, re-applied and then verified when it is rewritten to match (VD4-6)". (b) After "in a fresh and in a rebased document (VD3-2)" add "; a culture row with a street corpus and a district-name corpus, the street corpus replaced, every district name and naming record byte-identical (VD4-5); `setAttr(name)` + `undo`, lock + unlock and naming `rerollLayer` + `undo` around a corpus selection, the freeing event re-drawing by case (4) with its rename stored in the event, kept and truncated logs giving one digest (VD4-3, VD4-4); a corpus selection + `undo`, truncated, saved, reloaded and redone, its pack still in `packs` (VD4-7); a `keptSnapshot`-rebased CITY document upgraded across a test output version with a changed field driver and leaf encoding, opening editable after a reload and replaying to the session's digest (VD4-1)". |
| SR5-2 | §16, M2a and M3a rows [VD4-1 – VD4-9] | M2a content: after "the load's recomputation of the decoded state's own digest before its first edit" add "and of its records digest (VD4-6)"; M2a exit: after the corrupt-cache fixture add "the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (VD4-6, VD4-2)". M3a content: after "the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4))" add "with their renames stored in the events and carried by `confirm` (VD4-4), the dormant naming record of a protected name (VD4-3) and field slices (VD4-5); the version-pinned checks of a rebased base across an upgrade and of a frozen view (VD4-1); packs held by a saved redo stack and packs a new version stops shipping (VD4-7, VD4-9)". M3a exit: after "a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them" add "; a `keptSnapshot`-rebased town's link is refused (VD4-8); a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message (VD4-1); a document using a pack the new version stops shipping reopens after `from` leaves the window (VD4-9)". |
| SR5-3 | §14, `EditEngine.apply` comment [VD4-4] | Replace "Ok \| Conflict(actions) \| Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2)" with "Ok \| Conflict(actions) \| Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2; VD4-4)". VS4-2 (`rebase(…): ApplyResult`, `E_REBASE_AT` as a conflict) is the scope's own item; §7.1's `rebase` comment in this file already names `E_REBASE_AT` with "nothing is appended". |
| SR5-4 | Judgment calls [all] | Replace J-DET-35 with §4's restated row and append J-DET-44 – J-DET-51. The preamble's round list gains "Round 5 added J-DET-44 – J-DET-51 and restated J-DET-35" (the other areas' round-5 rows beside it). |

## 4. Judgment calls for the architecture's table ("chose X over Y because Z"; each vetoable)

| id | call |
|---|---|
| J-DET-35 (restated) | Chose to make a selected user corpus a non-shipped pack (`user:<hash>`), to save the content of every non-shipped pack of the document's **pack set** — the base recipe's packs and every pack an `adjust` event in the log names — while the base recipe, any logged event or a truncated event held on a saved redo stack names it, to have an upgrade copy into the document every pack of the pack set its new version stops shipping, to read the log's pack set in the link rule, and to refuse a host provider's output that would pass the 2 MB cap as an F-EDIT conflict, over keeping corpora beside the recipe, over saving and checking only the current recipe's packs, over dropping a pack's content when its last logged event is truncated, and over truncating or dropping an oversized output, because the log is replayed from its first event and a redo after a reload re-appends a truncated event — so a corpus selected after creation, selected and deselected, or selected, undone and redone is still read by a replay — and a replay must never read content the document does not hold (§2.9, §6.4, §7.5, §7.6; VD2-8, VD3-3, VD4-7, VD4-9). |
| J-DET-44 | Chose to run every recomputed-root check of a decoded state under the model packages of the output version that recorded that root — `model` under the document's own output version, a rebased `base.state` against its **root of record** for the version the replay runs under (the `rebase` event's `stateDigest` under its new `version` field, or the `baseDigest` each later `upgrade` records under its `to`) — to check a frozen view by its chunks' content hashes only, labelled "made with o<k>; not verified by this version", and to have the `frozenImport` rebase record the root the current version computes, over recomputing every root with the current packages, because a root is a function of the packages that computed it — a changed field driver or leaf encoding moves it — so a cross-version recomputation reports a mismatch on almost every old document and would leave an ordinary kept town read-only after an ordinary upgrade (§2.9 steps 2–4, §7.1, §7.4, §7.5; VD4-1). |
| J-DET-45 | Chose, under the load's off-edit-path recomputation (§6.2 (iii)), to keep edits flowing but to withhold "trust the saved town", step 4's keep, saves, exports, API digest reads, bridged root comparisons and any `verified` report until the recomputed roots match — a mismatch withdrawing the keep for good — over holding edits until the recomputation ends and over offering the keep at once, because waiting edits are what the fallback exists to avoid, while a keep or a save made on an unchecked copy could make a corrupt cache the rebased base and the next load read-only (§2.9 steps 3–4, §6.2 (iii), §5.3; VD4-2). |
| J-DET-46 | Chose to keep a generated name's naming record dormant while the name is edited, locked or assigned, to run case (4) for it at the event that ends the protection — an `unlock`, an `unassign`, or an `undo`, `redo` or `revert` that frees it — with the rename listed, confirmed and stored, and to restore naming records with the names when a naming reroll is undone, over deleting the record at a `setAttr` and over letting a later unrelated re-derivation find a stale record, because a deleted record hides an undone rename from a later corpus change — the kept and the truncated log then give different towns (§6.5 (9)) — and a stale record found later renames a name as a side effect of an edit unrelated to naming (§2.8, §6.3, §7.4; VD4-3). |
| J-DET-47 | Chose one optional `renames` field on `EditBase`, and `fates` on `editTable` and `editPreset`, over a `renames` field on the five kinds that already carry fates, because the events that end a name's protection (unlock, unassign, undo, redo, revert) re-draw names too, and every event that re-draws must store what the user confirmed so that a replay or a bridged client can report a different result exactly as it does for fates; `confirm` carries them, and an action whose dry run lists renames asks for confirmation even with no protected entity in scope (§7.1, §7.3 item 4, §11.2; VD4-4). |
| J-DET-48 | Chose to make each field of a culture or ancestry row its own naming slice — key `<rowKey>/<field>`, hashed with the field's value and, for a corpus field, the corpus's content hash — and to have a name's record cite only the fields its draw read, over whole-row slices, because a culture row names several corpora and a whole-row slice re-draws every name drawn through the row when one list is replaced — rewriting their naming records and, where a scoped uniqueness pass resolves differently, their text — against the rule that a list change leaves every other name alone; every other slice stays at its old granularity, where over-invalidation only re-derives what re-derives identically (§2.8, §6.3, §7.6; VD4-5). |
| J-DET-49 | Chose a separate **records digest** over the persisted derivation and naming records — schema-encoded, maintained at commit, stored in the snapshot, recomputed at every load with the model tree (≈ 4 ms at CITY, ≈ 11 ms at METROPOLIS, measured synthetic) and compared by the verification replay — and, on a records-only mismatch, to adopt the replay's state at `h₀` and re-apply the edits made meanwhile without asking, over folding the records into the model digest, over leaving them unchecked and over replacing only the records of the entities not re-derived meanwhile, because the records steer Regenerate (keep settings) and case (4) without being visible content (folded in, a re-encoding would become an output shift), a wrong record silently changes later edits (in a rebased document for good), and an edit that read a wrong record must itself be re-applied for replay to equal session (§2.9 step 3, §6.2; VD4-6). |
| J-DET-50 | Chose to emit a link only when the document's base is the recipe — refusing it for every rebased base, a kept saved town included, with the `.plat` file or `&doc=` offered, and letting the CLI's `--recipe-only` export refuse one too — and to fold an undone `rebase` with its `undo` as a no-op pair in a replay from the recipe, over an exception for a rebase whose state its recipe could regenerate, because a link replays the recipe and the log and has no way to name a starting state, so for a rebased town it would show the replayed town — for a kept saved town, the very one the owner rejected (§2.9, §6.4, §7.4; VD4-8). |
| J-DET-51 | Chose to remove the rebase reason `keptOldModel` over defining a new trigger for it, because §7.5's "keep the old model" keeps the document at its own output version inside the retention window and hands it to the frozen-view path outside it, so no event could carry the reason, and a schema value nothing produces invites two implementations to disagree about what it means (§2.9, §7.4; D5-1). |

## 5. Deferral scan, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**Deferral scan.** Every string this round adds to the thirteen blocks, and §0, §1, §3 and §4 of this file, were scanned
by script for TBD, "to be decided / determined", later, defer, postpone, future, "not yet", "at M0", revisit,
undecided, "if needed", "as needed", eventually, "will be decided / measured / chosen", "open question" and pending.
Every hit is ordinary sequence or negation: "a later corpus change", "every later load under `to`", "the root later
loads … check it against", "whose new water is not yet inserted", "none is postponed". Each new bar names its
measurement and its pre-decided fallback. The records tree rides under §6.2's existing 150 ms full-recomputation bar:
measured ≈ 4 ms at CITY, timed in the engine at M0 (d), with §6.2 (iii) as the fallback, now gated by VD4-2. No item is
STAGED-BY-OWNER: none of the ten touches a subject the owner's roadmap assigns to a later stage.

**Scripted document checks** (`docs/validation/bench/doc_checks.py`, §17.1 (2)):
- Over this file's thirteen blocks (`--heads docs/ARCHITECTURE.md`): exit 0. C1 0, C2 0, C3 89 hits (7 new, each
  ordinary phrasing, reviewed into `docs/validation/doc-checks-allow.tsv` under a `fixall/draft-determinism-r5` header),
  C4 1 (already reviewed), S1 0, S2 0.
- Over a simulated integration (the thirteen blocks applied to a copy of `docs/ARCHITECTURE.md`, 10 723 → 10 903 lines):
  exit 0. C1 5, C3 89, C4 1 and S2 2 hits, all already reviewed; S1 0.

**CONFIRMED (executed in this lane):**
- *The records digest's cost:* `docs/validation/bench/fixall_det_r5_recordsdigest.mjs`, run twice on the reference
  machine (Apple M1, Node 24.12). At CITY (10 900 derivation and 3 500 naming records) it takes 3.99 / 3.99 ms; at
  METROPOLIS (29 300 and 9 500) 11.44 / 11.38 ms. Both are medians of seven, and the root is identical across runs.
  README entry added.
- *The blocks are the integrated text plus the listed changes only.* A script (`scratchpad/r5det/`) extracted each
  subsection verbatim and applied 103 replacements. Each one matched exactly once, whitespace-normalised, or the build
  stopped. It re-wrapped only the paragraphs a replacement touched. A word-level diff of every block against its
  source shows only the listed changes and the banner lines.
- *The blocks apply cleanly.* Each block's heading resolves to exactly one subsection of the integrated file, and the
  simulated integration succeeded.
- *The cross-area targets exist.* Every string a request in §3 asks to replace was found in the integrated text by a
  whitespace-normalised search: 26 strings, each found once, except one phrase that occurs twice (RR5-1 names both
  places).
- *The findings' premises hold, by grep of the integrated text:*
  - §2.9 step 2 recomputes a frozen view's digest, and step 3 checks `base.state` "the same way" (VD4-1);
  - "trust the saved town" is not gated under §6.2 (iii) (VD4-2);
  - no text keeps a naming record through `setAttr` (VD4-3);
  - `editTable` and `editPreset` have no `fates`, and no event has `renames` (VD4-4);
  - the naming record cites whole rows (VD4-5);
  - no records digest exists (VD4-6);
  - the pack content rule reads the log only (VD4-7);
  - the link rule has no base condition (VD4-8);
  - §7.5 copies no pack (VD4-9);
  - §5.2 spells "river + coast" (VS4-5);
  - `keptOldModel` occurs only in the type (D5-1).

**PLAUSIBLE (this seat's reasoning, not executed — no engine exists):**
- That each mechanism defeats its failure scenario. The riskiest three:
  - that the roots of record cover every path on which `base.state` is decoded — load, verification replay, upgrade,
    the undo of an upgrade, the undo of a rebase onto an earlier base (VD4-1);
  - that adopting the replay's state and re-applying the edits made meanwhile restores replay = session after a
    records mismatch (VD4-6);
  - that field slices give exactly the rename sets §6.3 states (VD4-5).
- The benchmark is a cost model of the records tree (random 32-bit words, a partition sort), not the engine's code, and
  its hash is not checked against the published test vectors.
- The ≈ 0.25 MB records-tree memory is arithmetic, not a measurement.

**What a Fable reviewer should re-check first.**
1. **VD4-1's roots of record.** Two new persisted fields are the load-bearing change: `rebase.version` and
   `upgrade.baseDigest`. The records digest was made schema-encoded rather than version-encoded, so that a frozen import
   and an upgrade can check it under any version. Is that split — model roots per output version, the records root per
   file schema — sound, and does every path that decodes a rebased base find a root of record for its version?
2. **VD4-6's records-mismatch rule.** On a records-only mismatch, the replay's state is adopted and the edits made
   meanwhile are re-applied. This is stronger than the verifier's prescription, which was to replace only the records of
   entities not re-derived meanwhile (J-DET-49). Is re-application the right cost for a writer-bug case?
3. **VD4-3 / VD4-4's user-visible consequence.** An `unlock`, `unassign`, `undo`, `redo` or `revert` that frees a name
   whose list changed meanwhile now asks the user to confirm a rename — a confirmation on ctrl-Z. And `renames` now
   lives on `EditBase` for every event (J-DET-46, J-DET-47). The alternative is to re-draw silently at the freeing
   event and only report it.
