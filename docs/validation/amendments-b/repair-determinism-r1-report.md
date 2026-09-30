# repair-determinism-r1 — lane amendments-b/repair-determinism-r1 (repair round 1, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-determinism-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-b/repair-r1-determinism.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 87d8969209c7deb5… and docs/ARCHITECTURE-RATIONALE.md sha256 3f39b2de60c97741….
> Generator: scratchpad rd1/gen.py over rd1/specs/*.py (each REPLACE body = the live subsection with asserted
> single-occurrence substitutions, every untouched line verbatim); the block file is re-composed atomically after each spec.
> BLOCK 01 §5.1 (VD-04): planned | done: REPLACE block written (1 edit)
> BLOCK 02 §5.2 (VK-22, VD-34): planned | done: REPLACE block written (3 edits)
> BLOCK 03 §5.3 (VD-12, VP-10, VD-27, VS-15; model hand-off VK-04 (4)): planned | done: REPLACE block written (6 edits)
> BLOCK 04 §5.4 (VD-13, VR-03): planned | done: REPLACE block written (3 edits)
> BLOCK 05 §6.1 (VD-02, VD-03, VD-09, VP-12): planned | done: REPLACE block written (4 edits)
> BLOCK 06 §6.2 (VD-07, VD-28): planned | done: REPLACE block written (3 edits)
> BLOCK 07 §6.3 (VD-01, VD-22, VD-29, V-MAB-37): planned | done: REPLACE block written (6 edits)
> BLOCK 08 §7.1 (VD-03, VD-07, VD-10b, VD-11, VD-18, VP-34, VD-19, V-MAB-36, VD-20, VK-22): planned | done: REPLACE block written (16 edits)
> BLOCK 09 §7.2 (VD-33): planned | done: REPLACE block written (1 edits)
> BLOCK 10 §7.3 (VD-11, VD-30, VK-23, VD-31, VD-32): planned | done: REPLACE block written (7 edits)
> BLOCK 11 §7.4 (V-MAB-03, VD-21, VD-03, VD-04, VD-05, VD-07, VD-08, VD-10b, VD-11, VD-18, VP-34, VD-19, VD-20, VP-33, V-MAB-38): planned | done: REPLACE block written (15 edits)
> BLOCK 12 §7.5 (VD-25): planned | done: REPLACE block written (1 edits)
> BLOCK 13 §7.6 (VP-35, VD-26): planned | done: REPLACE block written (2 edits)
> BLOCK 14 §7.7 (VD-05, VD-08, VD-34): planned | done: REPLACE block written (6 edits)
> J-ROWS + RATIONALE-A (restated J-A20.74, J-A25.61, J-A28.61, J-A30.71, J-DET-2, J-DET-6; new J-A12.71, J-A20.75, J-A22.74, J-A22.75, J-A24.71, J-A30.72, J-A31.75, J-A31.76): planned | done: J-ROWS (14) + RATIONALE-A (14) blocks written


## Outcome

All 41 determinism-owned issues are answered by 16 blocks in `docs/validation/amendments-b/repair-r1-determinism.md`:
14 REPLACE blocks (§5.1–§5.4, §6.1–§6.3, §7.1–§7.7), 14 J-ROWS and 14 RATIONALE-A rows. §5–§7 have no `####`
headings, so the smallest heading-delimited unit is the whole `###` subsection. Each REPLACE body is the live subsection
(sha256 `87d89692…`) with count-asserted substitutions; only the changed paragraphs were re-wrapped at 120 columns, and
every other line is byte-identical. The scripts are in the scratchpad at `rd1/` (`lib.py`, `specs/01…14_*.py`,
`rows.py`, `compose.py`).

| issue | section | fix (short) |
|---|---|---|
| VD-01 | §6.3 | survival sentence restored whole; the mutation sub-bullet hangs after it, text unchanged |
| VD-02, VD-03 | §6.1, §6.2, §7.1, §7.4 | one absolute counter per `regenerate.rung` value under `<building id>#<rung>`, never in the elaboration record; a stage-3 concern folds every coarser counter into the building's key (one finaliser round each, rung order) and takes its own counter as the reroll component; `RungKey`, `rerolls: Record<Id \| RungKey, number>`; rung row reads "the rung's counter" (J-A28.61 restated) |
| VD-04 | §5.1 (6), §7.4 | a rung re-roll compares the rung's own derived result, identity left out (derived on the overlay; the cache only as a memo; a stored composition's subtree when edited); minimal-scope test adds a one-room plan's `plan.roles` |
| VD-05 | §7.7, §7.4 | `Rejection.held = { epoch; populationTarget }` (`blockSeq` removed); lapse at the first epoch whose target differs, or a dossier event over the block; §7.4's rows point to §7.7 (J-A20.74 restated, J-A20.41's test adopted) |
| VD-07 | §7.1, §7.4, §6.2, §7.7 | `EditBase.creation`; the creation prefix is the fold's one declared read-ahead (J-A22.74 new; J-DET-6 restated) |
| VD-08 | §7.7 item 6, §7.4 epoch row | a dossier change sent with an epoch rides in `EpochInputs.dossier` and applies at §4.11 step (e); one between epochs folds at its own position |
| VD-09, VP-12 | §6.1 | `reserve.market` and `cut.interior` registered (geometry, non-rerollable, cap 0; keys: town root, block lineage) |
| VD-10b, VD-11 | §7.1, §7.3, §7.4 | `digCanal` listed; a marsh's `reclaim` → terrain operator, foreshore `reclaim` / `siltReach` / `shiftCourse` → water operator, `digCanal` → carve; undo cell adds the conversion's chain scope (J-A25.61 restated) |
| VD-12, VP-10 | §5.3 epoch row | frontage and shell subtrees compared with pre-epoch values, every difference matched to a recorded event (rung 3, rung 2's back-court split or reversal, mutation or renovation, decline, terrain-and-water, island or carve conversion) (J-A31.75 new) |
| VD-13, VR-03 | §5.4 (+ §7.7 pointer) | `GenerationReport.changes: ReportEntry[]` and the `ReportEntry` union; one prose paragraph (J-A22.75 new) |
| VD-18, VP-34 | §7.1, §7.4 | plots row: `subdivide`, `densify` / `thin` (`infill`, `back_court`); convert row names the ladder kinds and their mechanisms; undo adds a ladder conversion's former rings, records and passage face |
| VD-19, V-MAB-36 | §7.1, §7.4 | `setAttr` of a block's `reach` (S10 (7) re-cut, J-A30.72); rows for reservations (`rank`, a Re-derive from S3, J-A24.71) and institutions (`knownTo`, name, assign); `condition` `setAttr`-editable (J-A31.76); `due`, `nextEntrance`, `reusedAs`, slot `frontage` declared derived |
| VD-20 | §7.1, §7.4 | `drawTunnel`, `placeAccess` events; a lifecycle row; a tunnel's condition off `setAttr` (the matching `convert`, J-A11.21), preset → `widthCm` / `headroomCm`; tunnel conversions change `existence` and `closure` (J-A12.71 new) |
| V-MAB-03, VD-21 | §7.4, §7.1, §5.3 | the seal is `Passage.sealed` everywhere; `sealPassage` / `openPassage` set it and vacate or reoccupy the plots behind (J-A30.71 restated) |
| V-MAB-37, VD-29 | §6.3 | anchor rows for passage, access point, tunnel and sky island; the matching routine names them |
| V-MAB-38 | §7.4 warp paragraph | the basement ring and a stored plan's points carried; containment over the face united with spanned passages' span rings |
| VK-22 | §7.1, §5.2 | `moveWall` cites §3.4; F-PLAN tier 1 reads `E_DEGENERATE` (`seed`, `fixed`, `overlap`) |
| VK-23, VD-30 | §7.3 click row | points to §2.6's re-cut rule (FIXED set, re-derived set, kept-room rule; J-A28.26) |
| VP-33 | §7.4 `builtBand` row | the writers are §4.11's list (J-A31.44) |
| VP-35, VD-26 | §7.6 | the entrance and cellar columns of the designation templates (§10.2); cell schema with `extension?`; §17.1 (6)'s source values; four tables added to the enumeration |
| VD-22 | §6.3 | every split child takes the continued lineage (parent key + child index); the anchor child keeps only the address |
| VD-24 | J-DET-2 | index row and Part A restated with the amendments-b note |
| VD-25 | §7.5 | `Room.scope` from the programme row; older assignments `existence: 'map'`, `pinned: false`, `use` linked at first load |
| VD-27, VS-15 | §5.3 | basement "inside and smaller than"; the surface-exclusion row (batch-local, `pointLocate` on the ground arena); the cellar stair admitted |
| VD-28 | §6.2 | root layout names `Use`, `Rejection`, `MaterialLedger`, `Passage`, `Tunnel`, `AccessPoint`, `SkyIsland` subtrees |
| VD-31 | §7.3 item 1 | an over-budget dossier event's scope is its least-disruptive placement's touched set |
| VD-32 | §7.3 (a) 3 | inside an epoch the terrain operator only marks due blocks |
| VD-33 | §7.2 | a map `delete` of a dossier-backed element is recorded as `rejectSite` |
| VD-34 | §7.7 item 2, §5.2, §7.1, §7.2 | a map `unassign` or `setAttr` of use or class on a dossier-backed element → F-EDIT with `rejectSite` / `placeAt` (J-A20.75 new) |

## Rulings recorded (vetoable)

J-A20.74 (restated: J-A20.41's population-target test adopted at the home; a prosperity change without a population
change does not lapse a rejection), J-A22.74 (the creation prefix read-ahead; amends J-DET-6), J-A28.61 (restated:
per-rung counters, coarser counters folded into the key), J-A31.75 (the epoch invariant by matched events), J-A31.76
(`condition` editable; four attributes declared derived), J-A30.72, J-A24.71, J-A20.75, J-A22.75, J-A12.71, and the
restatements J-A25.61, J-A30.71, J-DET-2, J-DET-6.

## Where this repair departs from the verifier's wording (each with its reason)

* **VD-04.** Required: compare "its cached content hash (`ElaborationChunk.hash`)". Done instead: both results are
  derived on the overlay, and the cache serves only as a memo when `current`. The cache can be absent (evicted, never
  derived), and the chunk hash is defined over bytes, not over identity-free content.
* **VD-03.** The counters mix through the existing `Rng.stream(entityKey, …)` signature. The coarser counters are
  folded into the key, and the concern's own counter is the reroll component, so §14 needs no change. The rung order is
  linear: `wings`, `rooms`, `plan`, `plan.layout`, `plan.roles`, `plan.furnish`, and the plan concerns also read
  `#wings` and `#rooms`, so that a coarser re-roll re-rolls everything below it.
* **V-MAB-38.** The containment test uses the model repair's refinement: "inside the moved face united with the span
  rings of the passages its wings span". The verifier's "inside it or inside a passage face" fails an upper room that
  straddles both.
* **VD-29 / V-MAB-37, merged.** The passage anchor is (front plot's address, kerb-end midpoint), radius 0.5 m, one
  family, because `Passage` has no kind field. The sky island is matched by its minted slot key, and its class family is
  "—", because `SkyIsland` has no kind field.
* **VD-20.** `placeAccess` also carries `role`, which `AccessPoint` requires. `drawTunnel` also takes `headroomCm?`.
* **VD-12 + VP-10, merged into one row.** VP-10's back-court clause is inside VD-12's matched-event list.
* **Model hand-off (V-MAB-01, VK-04 (4)), done because this part owns §5.3.** The stored-plan tiling row reads the
  storeys' extents and the passage room. "Reserved passage cell" became "passage room". `swapUse` moves households,
  since `occupants` was retired (J-A28.29).

## Cross-part dependencies (other lanes' text; nothing here edits it)

* **Pipeline.**
  * VD-08b: §7.7 item 6 and §7.4's epoch row cite `EpochInputs.dossier`.
  * VD-10a: the water kind `siltReach`.
  * VP-09: rung 2's back-court sentence, which §5.3's row matches.
  * VP-32: §4.11's writers list, to which §7.4's `builtBand` row now points.
  * VD-06: step (h), which should point to §7.7's rule.
  * VD-07b: §4.2's "reads the same recipe" should become "reads the same creation prefix".
  * Rung 1's "late, the roof lost" must be issued as `decay` (a decline conversion), or §5.3's epoch row has no event to
    match it.
  * The pipeline lane's plan (repair-pipeline-r1-report.md) lists VD-06, VD-07b, VD-08b, VD-10a and VP-09.
* **Rendering.** VR-03's second half: §11.2's subscribe row should read "the `changes` entries of §5.4's
  `GenerationReport` appended since the last delivery".
* **Scope.**
  * §13.2 T20-2 and T31-9 (VD-12c, VP-11) should match §7.7's lapse rule and §5.3's epoch row.
  * T12-1 (VS-14) should match the cellar stair.
  * The fixtures should add a `plan.roles` re-roll of a one-room plan (§5.1 (6)).

## Receipts (executed 2026-09-27)

* **apply-blocks.py, this file alone, on scratch copies.**
  * 16 blocks found, 16 applied, 0 skipped; audit not-OK 0.
  * J ids and Part A ids match; the only duplicates are the six restated ids, as hand-off (1) expects.
  * Headings 145 → 145; fences 110 → 110, balanced; title block unchanged; PENDING FABLE REVIEW lines 0 → 0.
  * Document 1 503 967 → 1 522 758 bytes; rationale 383 760 → 394 722 bytes. Block file sha256 prefix
    `6091a11fc1567386`, 17 "=== " lines, ending in `=== END ===`.
* **apply-blocks.py with repair-r1-kernel.md and repair-r1-model.md.** Name order; 33 of 33 blocks applied, audit
  not-OK 0.
* **refs.py.**
  * On the combined output, de-duplicated: 2 broken, both the pre-existing external citations (`os-geometry.md` §2.1.4,
    RFC 7946 §3.1.6), the same 2 as on the live document.
  * On this file's output alone: 2 more, J-A30.23, which repair-r1-model.md defines.
* **doc_checks.py --sections "5,6,7,Judgment calls".**
  * Live document: C1 5/0, C2 0/0, C3 293/39, C4 2/0, S1 0/0, S2 0/0. The 39 are corpus growth; assemble-r0 exited 0 at
    03:11.
  * Combined output with the current allow file: C3 299/52.
  * With the kernel's 18 and this file's 34 `# ALLOW` rows added to a scratch copy of the allow file: C1 5/0, C2 0/0,
    C3 299/8, C4 2/0, S1 0/0, S2 0/0. §5–§7 show 0 unreviewed. The 8 left are all in "Judgment calls": 7 runs in
    repair-r1-model.md's J rows and 1 pre-existing index run, '4 5 4 7 10 2' (J-A27.41), that no repair file wrote.
  * Nine phrases of this repair that had become C3 hits were reworded rather than allowed. The 6 own-text rows left
    are the rung names and the section-pointer digits of five §where cells.
* **Live files.** The live `docs/ARCHITECTURE.md` (sha256 `87d89692…`) and the rationale file are unchanged by this
  lane.

## CONFIRMED versus PLAUSIBLE

CONFIRMED (executed):
* every substitution matched exactly once in the live text;
* the application, audit, reference and document-check counts above;
* every quoted current text in the issue list was located and replaced.

PLAUSIBLE (reasoning; nothing is built yet):
* the rung-counter mixing, including whether folding coarser counters into the key is the right place;
* the creation-prefix read-ahead as the fold's only exception;
* the lapse ruling: population target only, with prosperity-only change not lapsing;
* the epoch invariant's matched-event check being cheap enough at stage end;
* `condition` being editable.

## What Fable should re-check first

1. J-A22.74, the creation-prefix read-ahead, against J-DET-6 and §2.9's one-source rule.
2. J-A28.61, the counter mixing, and whether `plan.program` should read `#wings` and `#rooms`.
3. J-A20.74's lapse test, against the owner's "an evolution epoch, or a dossier change that alters that area".
4. J-A31.75's epoch invariant, against pipeline's rung-2 wording once VP-09 lands.

STATUS: COMPLETE (2026-09-27).
