# Assemble — consistency pass, round 1 (the six repair-r1 files applied to `docs/ARCHITECTURE.md`)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/assemble-r1`, 2026-09-26. Status: COMPLETE. A mechanical seat: the blocks were applied by a script
(`docs/validation/consistency/assemble-r1.py`), references were resolved with r0's resolver
(`docs/validation/consistency/assemble-r0-refs.py`, unchanged), and no section text was hand-edited.

## Outcome

All 49 repair blocks of the six `docs/validation/consistency/repair-r1-*.md` files are applied to `docs/ARCHITECTURE.md`
(49 REPLACE, 0 INSERT AFTER; every target heading found exactly once; no two ranges overlap; 0 skipped). The document
goes from 1 118 472 to 1 121 179 bytes (+2 707; 9 638 → 9 670 lines), 76.7 % of the pre-pass document. One
post-assembly edit was made, the one a repair lane addressed to the assembler (§5.4's engine comment keeps its pointer
form; §1 below). Every internal reference resolves (0 broken; the same 2 external pointers as r0). The document checks
exit 0 on the first run with no correction and no new allow row, and the set of hits is identical to the pre-repair
document's. CONFIRMED by executed runs: the apply script, an independent re-implementation giving the same bytes, the
resolver, and doc_checks on the landed file.

* **Before:** sha256 `ee314f239f31a24bbf6773e7443e4fd78c4f30b63f87c4eb8ba6f6ea3afed175`, byte-identical (`cmp`) to a
  fresh run of `python3 docs/validation/consistency/assemble-r0.py <out>` over `docs/validation/consistency/new/`. That
  run is the undo path (the tree is not under version control; no second archive copy was made).
* **After:** sha256 `ddd48f07099bdfeecd42f2d467e7b3ec21edb2676b71fcc7a44a14068cd5ebb1`. Reproduce with
  `python3 docs/validation/consistency/assemble-r1.py <before> <out> <log.json>`.

## 1. Blocks applied

**Rule** (the lane brief, as coded). A block runs from its `=== REPLACE <heading> ===` line to the next `===` line or the
end of the file; a file's text before its first `===` line (the model and scope files' titles and notes) is ignored. The
block replaces the heading's subsection, from the heading line up to the next heading of the same or a higher level;
headings inside fenced code do not count. Each block begins with its target heading line, and the range's own trailing
blank lines are kept. Every range was located on the input document before any block was applied; the blocks were then
spliced in from the bottom up. The script also checks that each block's first line equals its target heading, that no
block holds a heading of its target's level or higher after its first line, that every block's code fences close, and
that no two ranges overlap. An independent implementation, which applies the blocks one at a time in file order and
re-parses the document after each, gave byte-identical output.

| # | repair file (block line) | heading replaced | document lines (before) | lines before → after | lines changed (old / new) |
|---:|---|---|---|---|---|
| 1 | `determinism` (l. 1) | 5.2 Failure classes: detection, ladder, test | 3997–4024 | 28 → 28 | 6 / 6 |
| 2 | `determinism` (l. 30) | 5.3 The invariant suite, by scope (SCL-1) | 4025–4080 | 56 → 56 | 2 / 2 |
| 3 | `determinism` (l. 87) | 5.4 The generation report | 4081–4101 | 21 → 21 | 1 / 1 |
| 4 | `determinism` (l. 109) | 6.1 RNG and stream design | 4114–4200 | 87 → 88 | 2 / 3 |
| 5 | `determinism` (l. 198) | 6.2 What a seed determines, and the model digest | 4201–4314 | 114 → 116 | 6 / 8 |
| 6 | `determinism` (l. 315) | 6.5 Floating-point policy, determinism lint, determinism tests (G-P10) | 4531–4601 | 71 → 73 | 4 / 6 |
| 7 | `determinism` (l. 389) | 7.1 Edits are ordered events on addresses; the named actions; the ed… | 4615–4785 | 171 → 171 | 4 / 4 |
| 8 | `determinism` (l. 561) | 7.2 Locks, pins, edited and assigned entities, drawn constraints, fi… | 4786–4828 | 43 → 44 | 3 / 4 |
| 9 | `determinism` (l. 606) | 7.3 Locality — effective scope, local operators, edit fates, recorde… | 4829–5069 | 241 → 243 | 6 / 8 |
| 10 | `determinism` (l. 850) | 7.4 Lifecycle of every edit kind (create · read · persist · regenera… | 5070–5223 | 154 → 154 | 1 / 1 |
| 11 | `determinism` (l. 1005) | 7.6 The override layer and editable tables (G-P12; owner amendment 5) | 5292–5342 | 51 → 52 | 1 / 2 |
| 12 | `determinism` (l. 1058) | 7.7 Intent, character, constraints, assignments, the forms catalogue… | 5343–5405 | 63 → 64 | 3 / 4 |
| 13 | `determinism` (l. 1123) | 7.8 Controls: monotone, continuous, documented; the control-surface … | 5406–5445 | 40 → 41 | 5 / 6 |
| 14 | `kernel` (l. 1) | 3.2 Numeric policy | 1581–1646 | 66 → 66 | 1 / 1 |
| 15 | `kernel` (l. 68) | 3.3 The transaction protocol — batches, one level each, canonical or… | 1647–1938 | 292 → 293 | 27 / 28 |
| 16 | `kernel` (l. 362) | 3.4 Kernel operations the pipeline needs (complete list) | 1939–2022 | 84 → 84 | 6 / 6 |
| 17 | `kernel` (l. 447) | 3.6 Insertion, contact and move semantics — attraction instead of a … | 2041–2262 | 222 → 222 | 11 / 11 |
| 18 | `kernel` (l. 670) | 3.7 One geometry engine on every host — booleans, buffers and the ke… | 2263–2358 | 96 → 95 | 21 / 20 |
| 19 | `kernel` (l. 766) | 3.8 The straight skeleton — numeric contract, validator, downgrades | 2359–2423 | 65 → 65 | 3 / 3 |
| 20 | `kernel` (l. 832) | 3.9 Geometry in the document — each arena stored once | 2424–2476 | 53 → 53 | 7 / 7 |
| 21 | `kernel` (l. 886) | 3.10 Kernel invariants — what is checked, when, and at what cost | 2477–2504 | 28 → 28 | 4 / 4 |
| 22 | `model` (l. 17) | 2.1 Layers, coordinates, units, ids | 309–332 | 24 → 24 | 3 / 3 |
| 23 | `model` (l. 42) | 2.2 The plat — one arena per layer, five refinement levels as views,… | 333–631 | 299 → 299 | 7 / 7 |
| 24 | `model` (l. 342) | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservation… | 719–807 | 89 → 88 | 3 / 2 |
| 25 | `model` (l. 431) | 2.9 The document and serialisation | 1255–1525 | 271 → 271 | 8 / 8 |
| 26 | `pipeline` (l. 1) | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations,… | 2633–2946 | 314 → 315 | 2 / 3 |
| 27 | `pipeline` (l. 317) | 4.5 S6 Districts, quarters and fields · S7b Allocation and district … | 3148–3261 | 114 → 116 | 1 / 3 |
| 28 | `pipeline` (l. 434) | 4.8 S7 Fortification furniture (per enceinte) · the castle · water f… | 3528–3613 | 86 → 85 | 4 / 3 |
| 29 | `pipeline` (l. 520) | 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery —… | 3614–3716 | 103 → 103 | 1 / 1 |
| 30 | `pipeline` (l. 624) | 4.11 Incremental mode, transformations and conversions (the evolutio… | 3729–3890 | 162 → 162 | 1 / 1 |
| 31 | `rendering` (l. 1) | 8.1 The display list (renderer-independent, columnar, incremental) | 5458–5559 | 102 → 102 | 1 / 1 |
| 32 | `rendering` (l. 104) | 8.2 Style sheets as data: roles, contrast, symbolisation, paint prog… | 5560–5833 | 274 → 275 | 3 / 4 |
| 33 | `rendering` (l. 380) | 8.3 Symbol catalogue and draw-style census | 5834–5878 | 45 → 45 | 1 / 1 |
| 34 | `rendering` (l. 426) | 8.9 Backends, text, threads and the worker boundary | 6093–6213 | 121 → 122 | 1 / 2 |
| 35 | `rendering` (l. 549) | 8.10 Decoration instances (trees, scatter, crowns, roof detail) | 6214–6338 | 125 → 125 | 1 / 1 |
| 36 | `rendering` (l. 675) | 9.5 Furniture, framing and tools | 6545–6589 | 45 → 45 | 2 / 2 |
| 37 | `rendering` (l. 721) | 11.2 The embedding API and the worker boundary (SCL-6) | 6884–6954 | 71 → 71 | 2 / 2 |
| 38 | `rendering` (l. 793) | 11.3 The host bridge — the host is the store (FTG-12) | 6955–7012 | 58 → 59 | 11 / 12 |
| 39 | `rendering` (l. 853) | 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2) | 7087–7108 | 22 → 25 | 7 / 10 |
| 40 | `rendering` (l. 879) | 12.4 CITY per-stage split (SCL-3) | 7195–7235 | 41 → 41 | 3 / 3 |
| 41 | `rendering` (l. 921) | 12.6 Edits, regeneration, replay and warp, as functions of scope (SC… | 7300–7342 | 43 → 43 | 1 / 1 |
| 42 | `rendering` (l. 965) | 12.8 Memory (what is counted, per rung) | 7410–7476 | 67 → 74 | 8 / 15 |
| 43 | `rendering` (l. 1040) | 12.9 Reference comparisons and the declared trade | 7477–7497 | 21 → 21 | 1 / 1 |
| 44 | `scope` (l. 34) | 0.2 Where the seven late owner rules (docs/AMENDMENTS-2026-09-25.md… | 97–111 | 15 → 15 | 1 / 1 |
| 45 | `scope` (l. 51) | 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder cover… | 7509–7620 | 112 → 114 | 27 / 29 |
| 46 | `scope` (l. 167) | 13.2 Per-stage invariants, statistics, cost-model tests, contract te… | 7621–7760 | 140 → 145 | 26 / 31 |
| 47 | `scope` (l. 314) | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) | 8090–8134 | 45 → 45 | 1 / 1 |
| 48 | `scope` (l. 361) | §16 Build plan — calibration and spikes first, then a viewable town,… | 8590–8675 | 86 → 86 | 5 / 5 |
| 49 | `scope` (l. 449) | Judgment calls ("chose X over Y because Z"; each vetoable) | 9316–9602 | 287 → 287 | 2 / 2 |
| | **49 blocks** | | | | **258 / 290** |

No block is a no-op. No block adds, drops or renames a heading: the document's 140 heading lines are unchanged and in
the same order. Code fences stay balanced (88 fence lines). The document still holds exactly one "PENDING FABLE REVIEW"
line, the banner under the title (l. 3). The diff against the pre-repair document is confined to the 49 ranges (258 lines
out, 290 in).

**Post-assembly edit (vetoable).** This edit is named for the assembler in `consistency/repair-kernel-r1`'s landing note
in `docs/lane-events.log`. The kernel verifier (VK-R0-3) and the determinism verifier (VDC-1) raised the same loss: the
engine id `plat-arrangement@<version>` was stated nowhere, with §3.7 and §5.4 pointing at each other. Each lane repaired it
from its own side. The kernel block states the id in §3.7, and the determinism block restates it in §5.4's comment
(`/* 'plat-arrangement@<version>', §3.7 */`), so with both applied the id would appear twice. The canon homes the engine
at §3.7: DETERMINISM-127 keeps §5.4's engine and warning codes "by pointer (§3.7, §3.1)". The kernel lane asked that
§5.4 keep the pointer form. The script therefore replaces exactly that comment with `/* the engine id, §3.7 */`, and
asserts exactly one match. The id now appears once (l. 2323, §3.7). VDC-1's circularity is gone because §3.7 states the
id. The other change the determinism block makes on that line stays: the seven warning codes the report counts
(VK-R0-12's first option). Which codes §5.4 counts is §5.4's own fact.

## 2. Sizes

| section | r0 (bytes) | r1 (bytes) | change |
|---|---:|---:|---:|
| ARCHITECTURE — PLAT, the fused town/city generator (base),… | 1 609 | 1 609 | 0 |
| The whole design in one page (plain words) | 5 978 | 5 978 | 0 |
| §0 Provenance | 3 469 | 3 508 | +39 |
| PART I — THE BASE (stage 1): the MFCG ⊕ FTG town/city gene… | 93 | 93 | 0 |
| §1 Scope, product shape, fusion thesis, stack | 27 414 | 27 414 | 0 |
| §2 Domain model and schemas | 141 265 | 141 221 | -44 |
| §3 Geometry kernel | 111 380 | 111 169 | -211 |
| §4 Generation pipeline | 155 955 | 156 323 | +368 |
| §5 Failure handling — no whole-map discard-and-retry | 35 011 | 34 863 | -148 |
| §6 Determinism | 50 288 | 50 554 | +266 |
| §7 Editing and regeneration locality — everything is edita… | 103 754 | 104 146 | +392 |
| §8 Rendering and the style system | 92 210 | 92 571 | +361 |
| §9 Labels and map furniture | 26 440 | 26 423 | -17 |
| §10 Simulation and content layer (FTG parity, with restrai… | 16 999 | 16 999 | 0 |
| §11 Export and interop | 31 276 | 31 474 | +198 |
| §12 Performance budgets | 47 810 | 48 566 | +756 |
| §13 Testing and verification | 82 151 | 83 090 | +939 |
| §14 Package and module layout, key interfaces, dependency … | 20 391 | 20 391 | 0 |
| §15 Parity matrix and improvement matrix | 41 279 | 41 279 | 0 |
| §16 Build plan — calibration and spikes first, then a view… | 31 855 | 31 589 | -266 |
| §17 Clean-room and legal posture; third-party licences | 19 557 | 19 557 | 0 |
| PART II — STAGE 2: the city composed of neighbourhoods (in… | 852 | 852 | 0 |
| II.1 The district → neighbourhood interface | 10 478 | 10 478 | 0 |
| II.2 Templates as fabric strategies (NG B2, B7, B8) | 2 489 | 2 489 | 0 |
| II.3 Block content dispatch, pins, local identities (stage… | 1 305 | 1 305 | 0 |
| II.4 The render tier, the workflow and the close-up's pers… | 2 803 | 2 803 | 0 |
| II.5 What the base already carries for stage 2 (all base r… | 2 464 | 2 464 | 0 |
| II.6 The staged layers — floating islands and sewers: the … | 3 600 | 3 600 | 0 |
| PART III — What a later village product needs from the bas… | 4 110 | 4 110 | 0 |
| Delegated decisions (the owner deferred all judgment; each… | 14 558 | 14 558 | 0 |
| Judgment calls ("chose X over Y because Z"; each vetoable) | 24 468 | 24 542 | +74 |
| Staged by the owner's roadmap (this document defers nothing) | 3 803 | 3 803 | 0 |
| Appendix A — reading record, and CONFIRMED versus PLAUSIBLE | 1 358 | 1 358 | 0 |
| **whole document** | **1 118 472** (9638 lines) | **1 121 179** (9670 lines) | **+2 707** |

The pre-pass document was 1 461 981 bytes. r0 brought it to 76.5 % of that and r1 to 76.7 %. Adding the rationale file
(`docs/ARCHITECTURE-RATIONALE.md`, now 279 900 bytes after the scope repair lane's own J-DET-36 edit) gives 1 401 079
bytes, 95.8 % of the pre-pass document. The growth comes from facts the repairs restored (§13 +939, §12 +756, §7 +392,
§4 +368, §8 +361 bytes); §16 (−266), §3 (−211), §5 (−148), §2 (−44) and §9 (−17) shrink.

## 3. References

The resolver is `assemble-r0-refs.py`, unchanged. It checks every `§x`, `§x.y` and `§x.y.z`, including continuation lists
such as "§3.2, 3.4" and "§3.2–3.4", every `D-n`, every `J-…` and every `II.n` / `III.n` reference in the whole document,
code comments included. The targets are the document's own 134 numbered headings, its 35 `**D-n —` decisions and its
276 judgment-index rows.

* **Broken: 0.** The two unresolved pointers are external and unchanged from r0: l. 2036, `os-geometry.md` §2.1.4 (a
  findings file), and l. 6828, RFC 7946 §3.1.6 (the GeoJSON standard). The bare prefixes are names, not index ids: J-T
  is the calibration rule §13.7 defines, J-K and J-S are IMPROVEMENTS' items, and J-K … J-I in the index legend are row
  prefixes.
* **Mechanical fixes: none needed.** No repair block renames or renumbers a heading (the heading lines are identical
  before and after), and no repair file carries a renumbering note. The two §0 pointers (§0.1 and §0.3) name the
  renumbered subsections.
* **Cross-lane dependencies, checked in the assembled text.** The model repair depends on §11.3 carrying the whole
  bridge policy. §2.9 step 4 points to §11.3's "Bridged load verification" paragraph, which exists and carries all of it
  (the root at `h₀`, ≤ 3 MB at CITY, "or its session ends"), and §12.8 now points to §11.3. §12.4's S9 row points to
  §3.7's M0 bar, and §3.7 states "one district ≤ 3 ms" once (l. 2327). The engine id appears once (§1).
* doc_checks S2 (every §n / §n.m pointer) agrees: 0 hits.

## 4. Document checks

Command: `python3 docs/validation/bench/doc_checks.py --sections "<keys>"`, with the allow file
`docs/validation/doc-checks-allow.tsv`. As in r0, two key sets were run:

* **(a)** All 33 top-level heading keys: `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.6,PART
  III,Delegated decisions,Judgment calls,Staged,Appendix A`. The parent keys ARCHITECTURE, PART I and PART II span
  their children, so C3 and C4 hits there count twice.
* **(b)** The eight `#` headings, which partition the document exactly.

| check | pre-repair (a): hits / unreviewed | r1, first run = final run (a) | r1 (b) |
|---|---|---|---|
| C1 identifiers | 5 / 0 | 5 / 0 | 5 / 0 |
| C2 colours | 0 / 0 | 0 / 0 | 0 / 0 |
| C3 3-grams | 964 / 0 | 964 / 0 | 495 / 0 |
| C4 lists | 14 / 0 | 14 / 0 | 7 / 0 |
| S1 tables | 0 / 0 | 0 / 0 | 0 / 0 |
| S2 pointers | 0 / 0 | 0 / 0 | 0 / 0 |
| exit status | 0 | **0** | **0** |

* **No correction and no new allow row were needed.** A scratch copy of the script that dumps every hit shows that the
  r1 hits are identical to the pre-repair document's: 482 distinct (check, text) hits, each with the same count. The
  repairs raise no new run and end none.
* **C4 is now deterministic.** The tie-break r0 flagged is fixed in the script (the manager's change reports the
  lexicographically smallest of the tied sets). Run (a) under `PYTHONHASHSEED=1` and run (b) under `PYTHONHASHSEED=2`
  give the same counts.
* **Stale allow rows are kept.** 205 of the 687 reviewed rows match no hit (198 C3, 6 C4, 1 S2). All of them were already
  stale before this round: r0 counted 204, and the sixth C4 row is a tie variant the deterministic tie-break no longer
  prints. r1 makes no row stale. They are kept for r0's reason: the removed text lives on in the rationale file and the
  archive, and because review is by exact text, a kept row cannot hide a different hit.

## 5. Could not place / left for the validator

* **Could not place: nothing.** All 49 of 49 blocks were applied.
* **The post-assembly edit** (§1) is the one judgment this seat made. Vetoing it puts the id back in §5.4 beside §3.7.
* **Residual restatements named by the rendering repair.** The values agree, and the text belongs to other lanes. §3.3
  pool step 1 keeps "≈ 2.3 ms at CITY", marked "carried in §12.4's …" (l. 1810–1811). §4.2 S1 (2) keeps the contour
  clip, marked "(§8.2)".
* **Tag style.** The kernel and rendering repairs dropped their fix-round tags and kept the audit ids until one
  document-wide convention is ruled. By this seat's count, the audit ids occur 377 times (COV 109, GEO 71, FTG 46, SCL 45,
  LC 39, MFP 33, DEF 19, IMP 9, MN 5, plus one bare VS27 coverage id in §8.3), the same before and after r1. No fix-round
  tag remains: the 10 matches of that pattern are the invariant names NF-P5 and NF-P6. The convention is for the
  validator or Fable to rule.
* **Size target:** 76.7 % against the 55–65 % target. This is unchanged, and the assembler cannot compress text.
* **Not checked here:** the scope repair lane edited `docs/ARCHITECTURE-RATIONALE.md` directly (Part A's J-DET-36 row
  and the F.2 heading). That edit is outside this assembly.
* **Owner items untouched**, as in r0: RULING-1 and the evening amendments of `docs/AMENDMENTS-2026-09-25b.md`.
