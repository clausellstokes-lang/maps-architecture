# Fix-all round 3 — integration log (lane fixall/integrate-r3)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/integrate-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** After round 2, five checkers accepted every round-2 fix and listed 55 new things the rewrite had
broken or exposed; the pipeline area found one more. The five area architects fixed theirs in drafts; this seat merged
the five drafts into `docs/ARCHITECTURE.md`, made every change one area asked another to make, and settled three places
where the drafts did not fit together. The biggest: the kernel draft wanted a bridge's deck laid over new water as a new
kind of coarse edge, while the pipeline and determinism drafts kept the deck as the road's own edge between two bank
points — the form the generator already builds. The design now uses the road's own edge everywhere, and the extra
kernel mechanism the other form needed is gone. The second: a canal or a moved river must prepare every place where the
new water will touch a street, a wall or a district edge before the water goes in, and the two editing operators now
share one list of those places. Result: all 56 items FIXED, none INVALID, none staged, none deferred; the per-item record
is `docs/ARCHITECTURE-VALIDATION.md` §R3.

Status: COMPLETE (2026-09-25).

## 1. Method

1. **Blocks (step 1).** Every `=== REPLACE` / `=== INSERT AFTER` block of `r3-{kernel,determinism,pipeline,rendering,scope}.md`
   (63 blocks: 55 whole-section replacements, 5 row-level replacements, 3 row insertions) was applied to
   `docs/ARCHITECTURE.md` by a script (`r3i/apply_blocks.py` in the session scratchpad) that matched each block's heading
   exactly (asserted unique) and replaced the section's own lines up to the next heading, area by area in the order
   kernel → determinism → pipeline → rendering → scope, dry-run first on a copy, logging after each area (§2). The
   pre-integration file (8 383 lines, md5 `ca2e20669f557e6e6de113c069811fe0`, the same file every draft was built from)
   is kept in the scratchpad as `r3i/ARCHITECTURE.pre-r3.md`. No two drafts replaced the same section. Each block's
   banner became `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3); drafted by fixall/draft-<area>-r3`.
   Blocks went in before requests, because a request aimed at another area's section would otherwise be overwritten by
   that area's block.
2. **Cross-area requests (step 2).** All 89 request rows were read against the integrated text and each receiving draft's
   coordination record. A row counts as *absorbed* when the receiving block already carries it (phrase-checked by
   script), *applied* when this seat edited the text (scripts `p1_kernel.py`, `p2_pipeline.py`, `p3_det.py`,
   `p4_rend.py`, `p5_judgments.py`; every edit is section-scoped, whitespace-tolerant and asserted to match exactly
   once, each script dry-run on a copy first), *amended* when a conflict resolution changed what was applied, and
   *superseded* when a resolution replaced it (§3, §4).
3. **Coherence (step 3).** Beyond the requests, the integrated text was checked for contradictions the drafts could not
   see in one another (C-1–C-3 in §4; `p6_misc.py`: the stale `naming/*` wording in §4.1 and §4.10, D-15's Enter, the
   §13.1 fixture's deck form) and re-summed where the rows changed (§12.3, §12.4). Scripted checks: the scope area's
   `docs/validation/bench/doc_checks.py` over all 74 changed section keys (§5); every judgment and decision id the text
   cites has a row (213 of 213 J-ids, every D-id); every `§n.m` and `II.n` pointer resolves (the only non-matching one
   is `proposal-product.md` §16.2, external); chapter numbering contiguous (0.1–0.9, 1.1–1.7, …, 17.1–17.4, II.1–II.6);
   a table-row check over indented tables too, which found and re-joined two rows this seat's own edits had split
   (§4.1's S10 row, the staged list's stage-2 row); a deferral-language scan of the 2 034 added or changed lines (only
   sequence wording such as "every later stage" and one milestone fact in §13.6 (1)).
4. **Validation record (step 4).** §R3 of `docs/ARCHITECTURE-VALIDATION.md` was generated from the five drafts'
   disposition tables (`p9_validation.py`; source per id from the round-2 verification files), with the four rows the
   conflict resolutions reshaped (VK2-3, VP2-1, VD2-1, NR-8) rewritten to the integrated text: 56 of 56 ids, each once.

## 2. Progress by area (step 1 — blocks)

| area | blocks applied | architecture lines after the area |
|---|---|---|
| kernel | 6 REPLACE (§2.2, §3.1, §3.3, §3.4, §3.6, §3.10) | 8 594 |
| determinism | 13 REPLACE (§2.8, §2.9, §5.2, §5.3, §6.1–§6.5, §7.1, §7.3, §7.4, §7.6) | 8 861 |
| pipeline | 13 REPLACE (§2.5, §2.6, §4.1, §4.2, §4.4–§4.8, §4.11, II.1, II.4, II.5) and 1 INSERT (J-P34–J-P40 after J-P33) | 9 034 |
| rendering | 12 REPLACE (§8.1, §8.2, §8.3, §8.9, §8.10, §9.5, §11.1, §12's heading and plain words, §12.3, §12.7, §12.8, §12.9) | 9 219 |
| scope | 11 REPLACE (§1.1, §13.1, §13.2, §13.3, §13.6, §13.8, §14, §15.1, §15.2, §16, §17.1); 5 row-level REPLACE (D-18, D-35, the judgment-call preamble, J-R19, J-S4); 2 INSERT (J-R38–J-R43 after J-R37, J-S28–J-S32 after J-S27) | 9 369 |
| after steps 2–4 | requests, conflicts, coherence edits, summary, §0.9, staged list, banners | 9 546 |

## 3. Cross-area requests (step 2)

| from → to | rows | absorbed by the receiving draft | applied at integration | amended or superseded (conflict) |
|---|---|---|---|---|
| kernel → pipeline (X-P1–X-P4) | 4 | — | X-P1 (a)–(c) (§4.1), X-P2 (§4.7), X-P3 (§4.11 batches (1)–(2)), X-P4 (§4.1 S5 row) | X-P3 and X-P4 amended: the deck is the way's own L1 edge, no L0 deck edge (C-1); X-P3's crossed-boundary anchors merged into the pipeline's batch (1) with wall runs and reservations added (C-2) |
| kernel → determinism (X-D1–X-D6) | 6 | X-D6 (the one-sided step (0) sentence: §3.3 now carries determinism's wording through KR3-1) | X-D1 (§7.3 (b) 3–4), X-D3 (b) (§6.2), X-D4 (§7.2), X-D5 (§7.4 row) | X-D1 amended (C-1, C-2: anchors for every crossed boundary, none for quays); X-D2 and X-D3 (a) superseded (C-1: no promoted edges) |
| kernel → rendering (X-R1, X-R2) | 2 | — | X-R1 (§12.3 p50 column; §12.4 S10 (0) and merge rows, totals), X-R2 (§12.8) | — |
| kernel → scope (X-S1–X-S3) | 3 | X-S1 (a)–(h), X-S3 (folded by the scope draft) | X-S2 (J-K22–J-K27; J-K6, J-K14, J-K17, J-K18, J-I10, J-I11 amended) | X-S2's J-K24 amended (C-1); X-S1 (b)'s deck made concrete in §13.1 (C-1) |
| determinism → kernel (KR3-1–KR3-6) | 6 | — | KR3-1 (§3.3), KR3-2 (§3.3 clear regions), KR3-3 (§3.6 (c)), KR3-4 (§2.3), KR3-5 (§2.2 rule 5), KR3-6 (§3.9) | KR3-2 amended (C-2: the coarse batch clears nothing); KR3-3 is C-1's adopted form |
| determinism → pipeline (PR3-1–PR3-9) | 9 | PR3-8 (the pipeline's §4.11 footprint matches); PR3-1's first half | PR3-1 (§4.5), PR3-2 (§4.7), PR3-3 (§4.9), PR3-4 (§4.2 S1 (3)), PR3-5 (§2.7), PR3-6 (§2.6), PR3-7 (§4.8), PR3-9 (§10.4) | — |
| determinism → rendering (RR3-1–RR3-9) | 9 | RR3-1 (the rendering draft's §8.1) | RR3-2 (§8.10), RR3-3 (§9.1), RR3-4 (§9.6), RR3-5 (§11.2), RR3-6 (§11.3), RR3-7 (§11.4), RR3-8 (§12.6), RR3-9 (§12.8) | RR3-9 amended (C-3) |
| determinism → scope (SR3-1–SR3-5) | 5 | SR3-1–SR3-4 (folded) | SR3-5 (J-DET-23 restated, J-DET-29–J-DET-39) | — |
| pipeline → kernel (K1–K8) | 8 | K7 (VP2-9 in the kernel draft's rule 1) | K1 (§3.3 footprint), K2 (§3.7), K3 (§2.2 rule 3, §3.6 (b)), K4 (§3.3), K5 (§3.4), K6 (§3.8), K8 (§2.2 rule 7, §3.3) | K8 is C-1's adopted form |
| pipeline → determinism (D1–D5) | 5 | all five (folded by the determinism draft) | — | — |
| pipeline → rendering (R1–R5) | 5 | R5's §11.1 part (already "each wing's `ring`") | R1 (§9.1), R2 (§9.4), R3 (§12.4), R4 (§8.2, the dry ditch), R5 (§8.6) | — |
| pipeline → scope (S1–S5) | 5 | S1, S2, S3, S5 (folded) | S4 (J-P34–J-P40 through the insert block; J-I10 and J-DET-14 amended) | — |
| rendering → its own §8.1 (for determinism's VD2-5) | 1 | yes (the §8.1 block) | — | — |
| rendering → determinism (D1, D2) | 2 | both (§6.1 in the determinism draft) | — | — |
| rendering → pipeline (P1) | 1 | — | P1 (§4.10) | — |
| rendering → scope (S1–S11) | 11 | all eleven (folded; D-18 and J-R19 as row blocks, J-R38–J-R43 inserted) | — | — |
| scope → determinism (D1–D6) | 6 | — | D1 (§2.9 `Seed`), D2 (§6.1 Enter), D3 (§6.5 (3)), D4 (§7.3 (iv)), D5 (§5.3), D6 (§6.2, seed 0) | — |
| scope → rendering (R1) | 1 | — | R1 (§9.2) | — |
| **total** | **89** (kernel 15, determinism 29, pipeline 23, rendering 15, scope 7 — counted from the tables) | **33** | **55** (8 of them amended or adopted by a conflict resolution) | **1** superseded (X-D2) and one part (X-D3 (a)) |

The scope draft's integrator tasks (its §3.3) were done: the scripted document checks run and their hits reviewed (§5),
the two row-level sections' banners set to name `fixall/draft-scope-r3` with this seat, the folded requests recorded
above, and D3–D5 applied after the determinism blocks.

## 4. Conflicts resolved

| # | areas | the disagreement | resolution (and where) | judgment |
|---|---|---|---|---|
| C-1 | kernel × pipeline × determinism | **The deck form.** The kernel draft (VK2-3, following its verifier's required change) laid each kept way's deck over new water as an **L0 deck edge** on the way's straight L1 edge by a new *edge promotion* (`CommitRecord.promotedEdges`, digests and undo reading edge levels — X-D2, X-D3 (a); fixture "each deck an L0 edge"); the pipeline draft (K8, J-P40) and the determinism draft (KR3-3, §7.3 (b) 4) kept the deck span as the way's **own L1 edge** between two promoted bank vertices, with no L0 edge across the water; the scope draft left the choice to integration | the pipeline's and determinism's form. It is also what generation builds — §4.1's S1 row places only the bank vertices at L0 and S4 lays the span — so an edited river or a dug canal leaves the structure a regeneration would; L0 stays land and water only (§2.2 rule 1), so no deck splits a water body's faces; and edge promotion, which no operator needs any more, is removed (its other use, a new bank along a kept quay, is served by cutting the quay back and extending it after the water, §4.11 batch (3)). Written into §2.2 rules 3 and 7, §3.1 (the subdivision row, `W_PROMOTED`), §3.3 (`CommitRecord`, the one-level bullet, clear-region rules 2–3, the M3a confirmation, J-K24), §3.6 (candidate (c), fixtures), §3.10 (two rows and the closing paragraph), §4.2 S1 (5), §4.1's S3 and S5 rows, §13.1's fixture | J-I12 (new), J-K24 amended |
| C-2 | kernel × pipeline × determinism | **What a coarse insertion prepares.** The kernel's clear-region rule 2 (and X-P3, X-D1) required a prepared vertex wherever the new water meets any finer edge — a landing's or quay's end, district and reservation boundaries, the perimeter, setback lines; the pipeline's carve prepared deck bank vertices only ("nothing else is prepared") and did not handle a wall the channel crosses; the determinism operator prepared deck and water-gate vertices only; determinism's KR3-2 (b) had `clearFiner` remove partition content only, while the kernel's rule 3 had the coarse batch split finer faces. Taken together, a canal or a river move crossing the settlement perimeter or a setback line would have failed with `E_LEVEL` | one list for both operators (§3.3 rule 2): deck bank vertices on kept ways; the water-gate bank vertices of each wall run re-traced across the water; and `anchor`s at the two bank points of every other crossed finer edge that is no way (perimeter and district-boundary stretches, setback and glacis lines), the stretch between them removed. Quays and landings are cut back and extended after the water (no anchor, the pipeline's rule). A carve that crosses a wall re-traces the run with a water gate as the water operator does, and a reservation in the channel's way is an F-EDIT conflict, as for the water operator (§4.11 "Other crossings", batches (1)–(3), footprint cell set (d)). The preparation clears partition content only, whole faces; the coarse batch clears nothing and only splits the faces it meets (§3.3 rules 1 and 3). Written into §2.2 rule 7 (`anchor`), §3.3, §3.6 (c), §4.11, §7.3 (b) 3–4 | J-I13 (new) |
| C-3 | determinism × rendering (found at integration) | **Load verification's memory.** §2.9 step 3 (and RR3-9 for §12.8) moved the verification replay to the generation worker "when §12.8's working set leaves no room for a second model" — but the replay needs its own model wherever it runs, so the move saves nothing | the replay's model is counted in place of the pool's frozen arena copies, which the pool does not hold while a document loads (a replay's arena and entity columns are about their size); with pool size 0 it runs in the generation worker on its own arena beside the working state; M1's memory measurement includes the reference CITY document's load verification, under §12.8's existing fallbacks (§2.9 step 3, §12.8) | J-I14 (new) |

Harmonised without a conflict: §3.3's one-sided step (0) sentence took determinism's wording (KR3-1), which is the
same mechanism §7.3 item 2 states (the kernel's X-D6 asked for exactly that).

## 5. Document-level work

* **Summary (the one page).** Kept true to the revised design, in plain words: the model-time promise as §12.3 now
  states it (the improvement plan's bars met up to about 4 500 / 17 700 / 59 000 people, larger towns up to about 0.2 /
  0.5 / 1.9 s, declared for the owner's veto; NR-1); a moved river or a dug canal lays its main roads across their new
  bridges and cuts the lesser streets back before the water goes in, and changes nothing outside the few blocks it names
  beforehand (VD2-1, VP2-1); a rebuilt bridge or street keeps its name (VD2-10); a saved town is editable the moment it
  opens (NR-8); undo survives closing and reopening the file (VD2-4); a walled port's harbour road leaves through a gate
  (VP2-2).
* **Title revision note and §0.9** (new): the round-3 record in the architecture.
* **"Staged by the owner's roadmap"** (the former "Deferrals" section, converted in round 1) re-checked: it lists only
  the seven roadmap subjects, each with the sections that carry its hooks; the stage-2 row gained this round's hooks (every
  seam edge typed, the `reserve` type for a way-less shared reservation boundary, II.1 (3)'s neighbour step, §3.7's
  straight-through `corridor_split`), the stage-3 row the `quad` wing's recorded `corners`. No other former deferral
  reappears; round 3 staged nothing.
* **Judgment calls.** 175 → 213 rows: the drafts' 35 new rows (J-K22–J-K27, J-DET-29–J-DET-39, J-P34–J-P40,
  J-R38–J-R43, J-S28–J-S32), this seat's J-I12–J-I14; J-K6, J-K14, J-K17, J-K18, J-DET-14, J-DET-23, J-R19 and J-S4
  restated; J-K24, J-I10 and J-I11 amended; the preamble's round-3 sentence made exact.
* **§12.4 / §12.3.** Kernel X-R1 with pipeline R3 applied: step (0) now ends with the L3 partition rebuild (3 → 5 ms at
  CITY); the critical path re-summed from the rows — 2 + 25 + 16 + 10 + 40 + 17 + 4 + 20 + 25 + 8 + 1 + 5 + 48 + 11 + 12
  + 4 + 5 = **253 ms p50** (p95 ≤ 300 ms unchanged); single worker ≈ 334 ms; METROPOLIS ≈ 606 / 801 ms; TOWN ≈ 76 ms
  (all PLAUSIBLE until M0 / M1); §12.3's p50 column 76 / 253 / 606 ms.
* **Scripted document checks** (`docs/validation/bench/doc_checks.py --sections <the 74 changed section keys>`, the
  check the scope area asked this seat to run): C1 identifiers 5 hits (the `README.md` file name, reviewed before), C2
  colours 0, C3 3-gram runs 404 hits, S1 broken table rows 0 (after the two re-joins), S2 pointers 2 (external, reviewed
  before) — **0 unreviewed, exit 0**. The 308 C3 runs new this round were each classified and appended to
  `docs/validation/doc-checks-allow.tsv` under a `fixall/integrate-r3` block: 238 ordinary phrasing, 33 numbers or
  pointers, 14 our own measurements of the references (the bent-cut constants, plot-band calibration points), 13
  reference behaviours stated as facts, 6 file paths, 2 reference names, and 2 FTG option-name lists cited for parity
  (coast detail; harbour shape — both pre-existing since round 1, read in context: option names with our own values,
  not a content table, grammar or palette).

## 6. Changed sections of docs/ARCHITECTURE.md

Every heading below carries `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r3)` (80 headings:
55 sections replaced by area blocks, 22 changed only at integration, the two row-level decision tables, and the new
§0.9). Sections this seat edited on top of a block (requests, conflicts, coherence): §2.2, §2.6, §2.9, §3.1, §3.3, §3.4,
§3.6, §3.10, §4.1, §4.2, §4.5, §4.7, §4.8, §4.11, §5.3, §6.1, §6.2, §6.5, §7.3, §7.4, §8.2, §8.10, §12.3, §12.8, §13.1.

* **kernel** (6): 2.2 The plat; 3.1 Build-versus-adopt, per primitive; 3.3 The transaction protocol; 3.4 Kernel
  operations the pipeline needs; 3.6 Insertion, contact and move semantics; 3.10 Kernel invariants.
* **determinism** (13): 2.8 Identity, lifecycle, provenance, the entity registry; 2.9 The document and serialisation;
  5.2 Failure classes; 5.3 The invariant suite; 6.1 RNG and stream design; 6.2 What a seed determines, and the model
  digest; 6.3 Identity: address ids, lineage keys, carry-over; 6.4 Permalinks, version axes, retention and goldens; 6.5
  Floating-point policy, determinism lint, determinism tests; 7.1 Edits are ordered events on addresses; 7.3 Locality;
  7.4 Lifecycle of every edit kind; 7.6 The override layer and editable tables.
* **pipeline** (13): 2.5 Districts, quarters, blocks, plots; 2.6 Buildings, heights and ground datum, wings; 4.1 Stage
  graph, evaluation model, laziness contract, transactions, the worker; 4.2 S0–S3; 4.4 S5 Growth stages; 4.5 S6
  Districts · S7b Allocation; 4.6 S8 Infill; 4.7 S9–S11; 4.8 S7 Fortification furniture; 4.11 Incremental mode,
  transformations and conversions; II.1 The district → neighbourhood interface; II.4 The render tier and the close-up's
  persistence status; II.5 What the base already carries for stage 2.
* **rendering** (12): 8.1 The display list; 8.2 Style sheets as data; 8.3 Symbol catalogue and draw-style census; 8.9
  Backends, text, threads and the worker boundary; 8.10 Decoration instances; 9.5 Furniture, framing and tools; 11.1
  Formats; §12 Performance budgets (heading and plain words); 12.3 Model budgets on the one-click path; 12.7 Labels,
  trees, exports; 12.8 Memory; 12.9 Reference comparisons and the declared trade.
* **scope** (11 + 2): 1.1 What is built, in what order; 13.1 Kernel property tests; 13.2 Per-stage invariants …
  B-EDIT; 13.3 Seed goldens; 13.6 The owner's side-by-side protocol; 13.8 CI tiers and compute budgets; §14 Package and
  module layout; 15.1 Parity matrix; 15.2 Improvement matrix; §16 Build plan; 17.1 The clean-room chain; and, row-level,
  Delegated decisions (D-18, D-35; D-15 at integration) and Judgment calls.
* **integration only** (22 + §0.9): the title (revision note); The whole design in one page; 0.9 Fix-all round 3 (new);
  2.3 Terrain and water; 2.7 Walls, gates, … pins; labels; 3.7 One geometry engine on every host; 3.8 The straight
  skeleton; 3.9 Geometry in the document; 4.9 S12a · S12b; 4.10 S13 · S14 · S15; 7.2 Locks, pins, …; 8.6 Stage-2 render
  tier and stage-3 LOD; 9.1 What is model and what is view; 9.2 Placement (S13b); 9.4 Sizes, floors, the ladder, …;
  9.6 Names; 10.4 Names, descriptions and setting packs; 11.2 The embedding API; 11.3 The host bridge; 11.4 Host inputs;
  12.4 CITY per-stage split; 12.6 Edits, regeneration, replay and warp; Staged by the owner's roadmap.

## 7. Counts

| measure | value |
|---|---|
| items handled in round 3 | 56 (kernel 9, determinism 17, pipeline 11, rendering 8, scope 11) — the 55 new findings of the five round-2 verifications (VK2-1–VK2-16, VD2-1–VD2-10, VP2-1–VP2-10, NR-1–NR-10, VS2-1–VS2-9) and R3-P1, found by the pipeline area; no round-2 item was judged UNRESOLVED |
| by severity | 6 major (VK2-1, VK2-2, VK2-3, VD2-1, VP2-1, NR-1), 50 minor; 0 blocker |
| FIXED | 56 |
| STAGED-BY-OWNER | 0 |
| INVALID | 0 |
| deferred | 0 |
| blocks applied | 63 (kernel 6, determinism 13, pipeline 14, rendering 12, scope 18) |
| cross-area request rows | 89 — 33 absorbed by the receiving draft, 55 applied here (8 of them amended or adopted by a conflict resolution), 1 superseded |
| conflicts resolved | 3 (C-1–C-3) |
| new or amended judgment calls | 3 new (J-I12, J-I13, J-I14); J-K24, J-I10, J-I11 amended; 213 rows in the table |
| dangling `§` pointers | 0 (the external `proposal-product.md` §16.2 excepted, as before) |
| sections carrying the round-3 banner | 80 |
| scripted document checks | 0 unreviewed hits (C1 5, C2 0, C3 404, S1 0, S2 2 — all reviewed) |
| `docs/ARCHITECTURE.md` | 8 383 → 9 546 lines |
| `docs/ARCHITECTURE-VALIDATION.md` | §R3 appended: 56 disposition rows, 3 conflict rows, changelog |

## 8. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** every block landed at its named heading (script log per area; no heading
missing or duplicated); every request edit matched exactly once in its section (the scripts assert it; all five
dry-run on copies first); 56 of 56 ids in §R3, each once; 213 of 213 cited judgment ids and every cited decision id have
rows; 0 dangling section pointers besides the known external one; contiguous numbering; 80 round-3 banners; the scripted
document checks exit 0 over the 74 changed section keys; 0 broken table rows (two split by this seat's edits, found by an
indented-table check and re-joined); the §12.4 critical-path sum (253 ms p50, computed from the table's rows); no
deferral wording in the 2 034 added or changed lines. **PLAUSIBLE (this seat's reasoning):** the three conflict
resolutions — that the road's own L1 edge as the deck span is enough for every coarse edit and that no operator needs
a coarse chain to share a finer edge (C-1), that the one preparation list covers every contact an L0 batch can make
and that re-tracing a crossed wall run in a carve works as it does for a moved river (C-2), and that a replay's model
fits in the pool copies' place (C-3); the re-summed budgets of §12.3–§12.4. None is measured until M0 / M1 / M3a; each
carries its confirming measurement and pre-decided fallback in the architecture (§3.3's clear-region fixtures and
fallback; §12.8's memory measurement and fallbacks).

## 9. What a Fable reviewer should re-check first

1. **C-1 / J-I12 — the deck form and the removal of edge promotion.** Read §2.2 rule 7, §3.3 rule 3, §3.6 (c),
   §4.2 S1 (5), §4.11 batch (2) and §7.3 (b) 4 together; confirm that generation's decks (S1, S3, S4) and edited decks
   now have one structure and that nothing still needs a coarse chain to run along a finer edge.
2. **C-2 / J-I13 — one preparation list, and the carve's new wall re-trace.** The carve now re-traces a crossed wall run
   with a water gate (a capability the pipeline draft did not have), and both operators anchor every crossed boundary;
   check the footprint's cell set (d), §4.11 batch (3)'s strip re-cut, and whether any other L1 edge an L0 batch can
   meet remains unprepared.
3. **The kernel's index-contents rule and the freeze assertion (VK2-1, J-K25)** — flagged by the kernel draft as its
   top risk — and the declared O3 (d) model-time miss (NR-1, D-18), an owner-veto item.
