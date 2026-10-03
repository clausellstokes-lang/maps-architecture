# Assemble r0 — the coherence pass's new base, volumes, index and rationale placed

> PENDING FABLE REVIEW — written by opus as the mechanical Assemble seat `coherence/assemble-r0` (python, no hand edits); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r0`; cloud continuation 2026-10-03; a mechanical seat: python, no hand edits)
- P1 archives (base, rationale, volumes and INDEX; cmp, chmod a-w, sha256): done
- P2 the base built from `docs/validation/coherence/new/base/*/` by heading order: done (34 of 34)
- P3 the twelve volumes replaced from `docs/validation/coherence/new/volumes/`: done (12 of 12)
- P4 INDEX.md §3, §4, §6, §7 placed and the intro's item range (the scope report's note): done
- P5 the rationale changes the scope report lists (Part A entries, changed entries, E-24 marks): done (59 rows, 17 marks, 2 entries changed, 1 no-op)
- P6 references resolved; broken list; mechanical fixes: done (1 mechanical fix; list in section 6)
- P7 doc_checks (three-copy method; provisional in this checkout): done (exit 0 on new and combined; 408 reviewed rows, 1 S1 fix)
- P8 bundle and --check: done (UP TO DATE)
- P9 report, results JSON, LANDED: done

**Result in brief** (the structured return, saved in `docs/validation/coherence/results/coherence_assemble-r0.json`):

* `old_kb` and `new_kb` cover the base plus the twelve volumes: 9 062 → 8 227 KB. The base alone is 2 250 → 2 555 KB.
* `broken_references` is 25: the 5 unresolved pointers (in 4 places) and the 20 bare self-references of section 6.
* `doc_check_hits` is 0, the unreviewed hits of the final run on the installed base (all hits: C1 5, C2 1, C3 1 628, C4 4,
  S1 0, S2 139).
* `unplaced` is the list in section 9.

## Outcome

The coherence pass's text is in place. The archives come first: the base, the rationale, the twelve volumes and
INDEX.md were each copied once, compared with `cmp`, made read-only and their sha256 recorded. No archive existed before.
Then four placements, each done by a script:

* **The base.** `docs/ARCHITECTURE.md` is built from the 34 section files under `docs/validation/coherence/new/base/*/`.
  Each file is placed by its heading line, in the order the headings appear in the archived document. Every archived
  top-level heading (`#` and `##`, outside code fences) matched exactly one file. No file lacked a heading, and every file
  holds only its own top-level heading.
* **The volumes.** Each of the twelve `docs/volumes/V*.md` files is replaced by its new text under
  `docs/validation/coherence/new/volumes/`. Every volume had a new file and there was no extra file.
* **INDEX.md.** §3, §4, §6 and §7 are replaced by `docs/validation/coherence/new/index/03-, 04-, 06-, 07-*.md`. The
  intro's "(file g, items 102–110)" now reads "items 102–113", as the scope editor's note asks. §1, §2, §5 and §8 are
  unchanged.
* **The rationale.** The changes the scope editor's report lists are in Part A:
  * 59 new entries, in the index's order after J-A66.72. The scope report supplies 23 of them in full. The other 36 are
    copied verbatim from the reports the scope report names, each marked *(verbatim from …)*.
  * 17 E-24 marks.
  * The changed entries J-A16.01 and J-A29.25.
  * One accounting sentence in Part A's intro.

Two hits were corrected mechanically:

* **V04's hand-off row to V07.** "V07 §1 (5)" now reads "V07 §1's facts (1)" and "V07 FL-3" reads "V07 §13's FL-3". This
  is the renumbering V07's report records (its cross-part note 3).
* **§11.1's 3-D export row.** The two pipes inside the code span `compositions: 'asDrawn' \| 'derive' \| 'none'` are
  escaped. Before the fix, S1 cut the row at 5 cells against its header's 3.

**References.** These were resolved across the base, INDEX.md and the twelve volumes:

* 18 679 bare `§` pointers and 15 123 `Vnn §` pointers, of which 772 are list continuations.
* 1 246 `II.n` pointers and 278 `D-n` pointers.
* 5 942 `J-…` ids and 5 052 `T-…` ids.

Every `D-`, `T-`, `II.`, `J-V…`, `J-VI.`, base `J-` and owner `Jn` reference resolves, except the items listed in
*References* below:

* 4 unresolved section pointers.
* 20 bare self-references in two volumes, plus 8 sibling pointers that silently resolve to the base.
* 2 old-form pointers in INDEX §8.
* 16 citations of decision ids that are defined only in records outside the set.

**Doc checks.** These ran by the three-copy method against one corpus snapshot and are **provisional**: the reference
corpus is absent in this checkout. After 408 reviewed allow rows and the S1 fix, `doc_checks.py` exits 0 on the new and
the combined copy. The untouched copy, run again afterwards, also exits 0.

**Bundle.** It is regenerated and `--check` reports it up to date.

**Size.** By words, the set shrinks by 7.8 % across the base and the volumes. The volumes shrink by 14.9 %. The base
grows by 13.3 %, because file f items 200–585 and file g items 102–113 are now applied into it. This is below the owner's
25–40 % band. The editors' reports say what holds each unit; the verifiers' size and nuance audits take it from here.

## 1 Archives (before any live file was written)

| source | archive | status | bytes | sha256 |
|---|---|---|---|---|
| `docs/ARCHITECTURE.md` | `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` | copied, cmp identical, chmod a-w | 2 304 442 | `87588d349c3da25575e915034412627bb4671c9b4696d74675b42d7f7316c31d` |
| `docs/ARCHITECTURE-RATIONALE.md` | `docs/archive/ARCHITECTURE-RATIONALE-pre-coherence-2026-09-28.md` | copied, cmp identical, chmod a-w | 675 351 | `db063efd3e73f682730e607be93ad2d15e64837a36229a1810ae4b97080e9693` |
| `docs/volumes/V01-neighbourhoods.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V01-neighbourhoods.md` | copied, cmp identical, chmod a-w | 585 123 | `b119c2e0369c6d1286e70afbe9e04e0104b4cbbcdc10f06ea687f293f08cf0df` |
| `docs/volumes/V02-buildings.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V02-buildings.md` | copied, cmp identical, chmod a-w | 637 179 | `b527a1e29ebe02016906a9ebfea1af1702f5ae1a8825a78b49ea7b61727f4c24` |
| `docs/volumes/V03-interiors.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V03-interiors.md` | copied, cmp identical, chmod a-w | 505 716 | `fcaabceb5468a3428bfa9d13c99025b1f1c60b1ca45d76a8c364182f1bb18961` |
| `docs/volumes/V04-underground.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V04-underground.md` | copied, cmp identical, chmod a-w | 530 576 | `63aff301147207a3ba6e2d7cc4a5b7f4ca296431fabe394a507469b3c9def316` |
| `docs/volumes/V05-sky.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V05-sky.md` | copied, cmp identical, chmod a-w | 495 910 | `162d464cc8d6dbe9e96e82fc691d5b4e0fd5859dca2ec8e974e86eb3861fe5cc` |
| `docs/volumes/V06-evolution.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V06-evolution.md` | copied, cmp identical, chmod a-w | 665 661 | `aeb56d371e3221a7e92cadaaa7fd0003ee46c61e9c190490db848abe412743d1` |
| `docs/volumes/V07-village.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V07-village.md` | copied, cmp identical, chmod a-w | 648 060 | `84f9476291ae7c814bf27ecc9703001da74f81b460414bd1b2173274003f09b5` |
| `docs/volumes/V08-settlementforge.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V08-settlementforge.md` | copied, cmp identical, chmod a-w | 545 534 | `f379b890226f7e6991a69e68582b2cacff170c6eeae83ced24d9ba04f73cd7e8` |
| `docs/volumes/V09-application.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V09-application.md` | copied, cmp identical, chmod a-w | 690 061 | `d4ac111851c93234a5086a26a84b33c213e1cb9f30b9c2c4918ece87cd5833af` |
| `docs/volumes/V10-clerk.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V10-clerk.md` | copied, cmp identical, chmod a-w | 538 604 | `6d2eff524a9558e38c8da310c140e2d3c5c4023c3228eee1c4812bcc654a5e2a` |
| `docs/volumes/V11-content.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V11-content.md` | copied, cmp identical, chmod a-w | 650 238 | `74f14317886db796ad7cc76afe0a9376ddb3d6330c5c1f924ed2fb8834ea1a24` |
| `docs/volumes/V12-calibration.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V12-calibration.md` | copied, cmp identical, chmod a-w | 482 479 | `ed72ef084f275138884c8a40f6512dd455f9c884b7a6a37e594fc1348f293733` |
| `docs/volumes/INDEX.md` | `docs/archive/volumes-pre-coherence-2026-09-28/INDEX.md` | copied, cmp identical, chmod a-w | 34 420 | `73d307cf49250daf11cbb89a9beb45a99cc27f06b694d6b8089e8c22d26c83fe` |

## 2 Placement of the base (34 of 34)

Join rule: each section file is placed with its trailing whitespace trimmed, and the files are joined by one blank line.
The title file and §0's file end with the `---` rule they carried before. The word counts below are of the archived
section (from its heading to the next top-level heading) and of the new file.

| # | archived line | heading (as matched) | section file (`docs/validation/coherence/new/base/…`) | words before | words after | change |
|---|---|---|---|---|---|---|
| 1 | 1 | `# ARCHITECTURE — PLAT, the fused town/city generator (base), neighb…` | `scope/01-title.md` | 264 | 302 | +14.4 % |
| 2 | 20 | `## The whole design in one page (plain words)` | `scope/02-summary.md` | 1 944 | 1 732 | -10.9 % |
| 3 | 131 | `## §0 Provenance` | `scope/03-s0.md` | 5 689 | 2 715 | -52.3 % |
| 4 | 264 | `# PART I — THE BASE (stage 1): the MFCG ⊕ FTG town/city generator w…` | `scope/04-part1.md` | 17 | 17 | +0.0 % |
| 5 | 266 | `## §1 Scope, product shape, fusion thesis, stack` | `scope/05-s1.md` | 5 570 | 5 580 | +0.2 % |
| 6 | 469 | `## §2 Domain model and schemas` | `model/01-domain-model-and-schemas.md` | 42 526 | 54 155 | +27.3 % |
| 7 | 2452 | `## §3 Geometry kernel` | `kernel/01-geometry-kernel.md` | 23 820 | 25 103 | +5.4 % |
| 8 | 3680 | `## §4 Generation pipeline` | `pipeline/01-s4-generation-pipeline.md` | 58 407 | 71 900 | +23.1 % |
| 9 | 6794 | `## §5 Failure handling — no whole-map discard-and-retry` | `determinism/01-s5-failure-handling.md` | 11 083 | 11 178 | +0.9 % |
| 10 | 7031 | `## §6 Determinism` | `determinism/02-s6-determinism.md` | 12 912 | 13 952 | +8.1 % |
| 11 | 7795 | `## §7 Editing and regeneration locality — everything is editable` | `determinism/03-s7-editing.md` | 39 122 | 48 968 | +25.2 % |
| 12 | 9515 | `## §8 Rendering and the style system` | `rendering/01-s08-rendering-and-the-style-system.md` | 31 909 | 36 725 | +15.1 % |
| 13 | 11047 | `## §9 Labels and map furniture` | `rendering/02-s09-labels-and-map-furniture.md` | 6 554 | 7 160 | +9.2 % |
| 14 | 11435 | `## §10 Simulation and content layer (FTG parity, with restraint)` | `pipeline/02-s10-simulation-content.md` | 8 236 | 10 599 | +28.7 % |
| 15 | 11889 | `## §11 Export and interop` | `rendering/03-s11-export-and-interop.md` | 9 320 | 13 478 | +44.6 % |
| 16 | 12324 | `## §12 Performance budgets` | `rendering/04-s12-performance-budgets.md` | 11 375 | 12 641 | +11.1 % |
| 17 | 12916 | `## §13 Testing and verification` | `scope/06-s13.md` | 26 850 | 33 189 | +23.6 % |
| 18 | 14222 | `## §14 Package and module layout, key interfaces, dependency rules,…` | `scope/07-s14.md` | 7 391 | 9 157 | +23.9 % |
| 19 | 14631 | `## §15 Parity matrix and improvement matrix` | `scope/08-s15.md` | 8 436 | 8 692 | +3.0 % |
| 20 | 14865 | `## §16 Build plan — calibration and spikes first, then a viewable t…` | `scope/09-s16.md` | 7 565 | 8 248 | +9.0 % |
| 21 | 14969 | `## §17 Clean-room and legal posture; third-party licences` | `scope/10-s17.md` | 3 383 | 3 773 | +11.5 % |
| 22 | 15186 | `# PART II — STAGE 2: the city composed of neighbourhoods (interface…` | `pipeline/03-part-ii.md` | 133 | 147 | +10.5 % |
| 23 | 15196 | `## II.1 The district → neighbourhood interface` | `pipeline/04-ii1-district-neighbourhood-interface.md` | 1 753 | 1 858 | +6.0 % |
| 24 | 15294 | `## II.2 Templates as fabric strategies (NG B2, B7, B8)` | `pipeline/05-ii2-templates.md` | 739 | 852 | +15.3 % |
| 25 | 15334 | `## II.3 Block content dispatch, pins, local identities (stage-2 fea…` | `pipeline/06-ii3-block-dispatch.md` | 308 | 392 | +27.3 % |
| 26 | 15354 | `## II.4 The render tier, the workflow and the close-up's persistenc…` | `pipeline/07-ii4-render-tier-workflow.md` | 578 | 618 | +6.9 % |
| 27 | 15389 | `## II.5 What the base already carries for stage 2 (all base require…` | `pipeline/08-ii5-base-carries.md` | 405 | 422 | +4.2 % |
| 28 | 15418 | `## II.6 The staged layers — floating islands and sewers: the hooks …` | `pipeline/09-ii6-staged-layers.md` | 2 822 | 2 895 | +2.6 % |
| 29 | 15573 | `## II.7 The sewer layer — existence by tier, the network stage, the…` | `pipeline/10-ii7-sewer-layer.md` | 11 334 | 13 822 | +22.0 % |
| 30 | 16189 | `# PART III — What a later village product needs from the base (one …` | `pipeline/11-part-iii.md` | 1 204 | 1 067 | -11.4 % |
| 31 | 16268 | `# Delegated decisions (the owner deferred all judgment; each is fin…` | `scope/11-delegated.md` | 3 005 | 3 107 | +3.4 % |
| 32 | 16484 | `# Judgment calls ("chose X over Y because Z"; each vetoable)` | `scope/12-judgment.md` | 25 908 | 16 385 | -36.8 % |
| 33 | 17239 | `# Staged by the owner's roadmap (this document defers nothing)` | `scope/13-staged.md` | 1 779 | 1 296 | -27.2 % |
| 34 | 17261 | `# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE` | `scope/14-appendixA.md` | 657 | 549 | -16.4 % |

Per part: the scope part's 14 files total 98 458 → 94 742 words. The model is 42 526 → 54 155, the kernel 23 820 →
25 103, and the pipeline (§4, §10, PART II, PART III) 85 919 → 104 572. Determinism (§5–§7) is 63 117 → 74 098 and
rendering (§8, §9, §11, §12) 59 158 → 70 004. The base as a whole is 372 998 → 422 674 words (+13.3 %).

## 3 Sizes before and after, per unit

Words are whitespace tokens (Python `split()`) of the whole file. KB = 1 024 bytes.

| unit | words before | words after | change | KB before | KB after | sha256 (16) after |
|---|---|---|---|---|---|---|
| base | 372 998 | 422 674 | +13.3 % | 2250 | 2555 | `70ce49bfa1c64a8a` |
| V01 | 93 140 | 75 902 | -18.5 % | 571 | 452 | `5a4f1e3f4b4e7953` |
| V02 | 103 630 | 84 389 | -18.6 % | 622 | 493 | `96be903fa70d070a` |
| V03 | 82 788 | 66 643 | -19.5 % | 494 | 385 | `fe0721eef56c97d8` |
| V04 | 83 966 | 74 335 | -11.5 % | 518 | 449 | `1ce6f60f53e52b82` |
| V05 | 81 161 | 65 306 | -19.5 % | 484 | 381 | `184498e466b927f8` |
| V06 | 106 357 | 93 952 | -11.7 % | 650 | 565 | `57469dc2797a8af0` |
| V07 | 104 422 | 91 366 | -12.5 % | 633 | 540 | `e2a8cd1ccec00a90` |
| V08 | 84 356 | 71 572 | -15.2 % | 533 | 446 | `1b26a24382a07136` |
| V09 | 111 610 | 90 664 | -18.8 % | 674 | 539 | `f60f3361599bdfed` |
| V10 | 84 658 | 72 685 | -14.1 % | 526 | 443 | `a0b0bacee868b427` |
| V11 | 106 185 | 95 884 | -9.7 % | 635 | 560 | `6846d5ff28e70283` |
| V12 | 76 414 | 69 259 | -9.4 % | 471 | 419 | `9db2bc58554cc932` |
| INDEX | 5 890 | 4 249 | -27.9 % | 34 | 25 | `5089927950ca11b6` |
| rationale | 113 979 | 116 555 | +2.3 % | 660 | 676 | `6a909417f6add29f` |
| the twelve volumes | 1 118 687 | 951 957 | -14.9 % | 6812 | 5672 | — |
| **base + volumes** | 1 491 685 | 1 374 631 | -7.8 % | 9062 | 8227 | — |

## 4 INDEX.md

| section | before (words) | after (words) | source |
|---|---|---|---|
| §3 The dependency graph | 415 | 436 | `new/index/03-dependency-graph.md` |
| §4 The combined build order after M5, with estimates | 615 | 160 | `new/index/04-combined-build-order.md` |
| §6 Owner questions with recommendations | 870 | 610 | `new/index/06-owner-questions.md` |
| §7 How the volumes were reconciled, and the fix list | 1 024 | 77 | `new/index/07-reconciliation.md` |

Each new file starts with its section's heading line exactly. The old section's trailing blank lines are kept. The
intro's item range of file g is now "items 102–113". §1, §2, §5 and §8 are unchanged.

## 5 The rationale (`docs/ARCHITECTURE-RATIONALE.md`, Part A)

* **New entries (59), appended after J-A66.72 in the index's order.** The index's 736 old rows and Part A's 736 entries
  were in the same order before the pass, and the new index keeps that order with the 59 new rows at its end.
  * 22 entries are the scope report's own texts (its cross-part note *Rationale (Part A)*): J-C1 – J-C4, J-S44 – J-S47,
    J-A73.06, J-A77.06, J-A102.01, J-A110.01, J-A111.01, J-A112.01, J-A113.01, J-A201.01, J-A505.01, J-A505.02,
    J-A509.01 and J-A568.01 – J-A568.03.
  * J-A112.02 comes from the report's continuation notes.
  * 36 entries are copied verbatim from the reports the scope report names. Each is marked *(verbatim from
    `docs/validation/coherence/rewrite-<part>.md`, locator)*.
    * The determinism report's *Decisions taken under J122* 1–6 give J-A113.61, J-A110.61, J-DET-55, J-A344.61,
      J-A101.78 and J-DET-56.
    * The model report's J-RM3 and J-RM5 – J-RM13 give J-A110.21, J-A206.21, J-P51, J-A111.21, J-A77.21 and J-P52 (both
      J-RM8), J-P53, J-A106.21, J-A113.21, J-A110.22 and J-P54.
    * The kernel report's KWG-01 gives J-K37.
    * The pipeline report's section 4, bullet by bullet, gives J-P55, J-A102.41 and J-P56 (both bullet 2), J-A110.41 –
      J-A110.43, J-A101.42, J-A26.45 and J-A111.41. Bullet 9 is split into its six constants: J-A109.41, J-A64.45,
      J-A12.48, J-A68.43, J-A15.43 and J-A58.44.
    * The rendering report's removal rulings give J-R57 – J-R59.

  Two report items each serve two index rows: J-RM8 (J-A77.21 and J-P52) and pipeline bullet 2 (J-A102.41 and J-P56).
  Each of the two rows carries the whole item, because splitting it would be a hand edit. Pipes inside the texts are
  escaped (J-P51).
* **E-24 marks (17).** Each superseded or amended row's entry ends with the same mark the index carries: J-DET-2, J-DET-6,
  J-DET-53, J-P16, J-A28.71, J-A30.71, J-A30.22, J-A8.21, J-A12.45, J-A16.01, J-A28.02, J-A29.01, J-A30.72, J-A81.71,
  J-A32.02, J-A68.05 and J-A101.04.
* **Changed entries.**
  * J-A16.01 drops the historical total, per SCOPE-C03. "…sum to the total of 166–220 (153–204 before amendments b), over…"
    now reads "…sum to the total, over…", with a note *(amended by the coherence pass …; SCOPE-C03)*.
  * J-A29.25 gains a note *(amended by the coherence pass; file f item 371, BCR-V2-33 (b))*. The note quotes the report's
    two new access texts verbatim.
  * J-A28.02 is unchanged. The report's "drops '(R11)'" applies to the index row, which no longer carries it. Part A's
    entry has no "(R11)". Its "canon R11" is the qualified history Part A holds, and ID-R removes only the bare id.
* **Part A's intro** gains one sentence recording the 59 rows and the marks. The file is 113 979 → 116 555 words.

## 6 References

**Method.** The script is `refcheck.py` in the scratch folder `…/scratchpad/coherence/assemble/`, run over the live base,
INDEX.md and the twelve volumes.

* **Section targets** are every heading number (`#` – `######`, with or without `§`, including `1b`, `3.5a`, `II.n.m`)
  and every bold numbered label (`**3.19.2 …**`, anywhere on a line).
* **Pointer reading** follows canon S7: a bare `§` is the base's, and `Vnn §` (or "volume N §") is a volume's.
  * A bare `§` continuing a `Vnn §` list is read in that volume first, then in the base. A list continues over separators,
    item numbers, short glosses and line wraps.
  * A `§` after a document name (`code-neighbourhood.md`, CONFIDENCE, RFC 7946) is external.
* **D-n** must match the delegated decisions' `**D-n —**` entries.
* **Base J ids** must be rows of the judgment index.
* **Volume ids.** `J-Vn.m` must be a row of volume n's §9, and `T-Vn-m` must occur in volume n's §7, with ranges
  expanded.
* **Base T ids** must occur in §13 (ranges expanded) or as a table row's first cell in the base (T-ER-nn).
* **Other ids.** `J-VI.n` must be in `docs/volumes/_integrate.md`, owner `Jn` in `docs/PROGRESS.md`'s table and `J-F…` in
  `docs/fable-review/`.

**Counts.**

* 18 679 bare `§` pointers, 772 of them list continuations read in a volume, and 123 external `§` pointers.
* 15 123 `Vnn §` pointers.
* 1 246 `II.` pointers, 278 `D-` pointers, 5 942 `J-` ids and 5 052 `T-` ids.

14 generic tokens were skipped: `JSON5`, the family names `J-Vn` in "Decisions are `J-Vn.n`", and FTG feature ids
`J04` / `J05`.

**Mechanical fix applied (1; the renumberings the rewrite reports record).** In V04, the V07 row of the hand-off table
(l. 3365) changes as V07's report's cross-part note 3 records:

* "V07 FL-3 closed" now reads "V07 §13's FL-3 closed".
* "V07 §1 (5)" now reads "V07 §1's facts (1)". V07 §1's list (1)–(14) became *Cross-volume facts* (1)–(8).

The other recorded renumberings were checked:

* Nothing still cites "§13.9 (5)" or "(6)", the scope report's re-point.
* J-T and A.3 have 0 hits.
* `DR-V…` and `DR-SKY` have 0 hits.
* V06's "V07 §1 (10)" is already re-pointed.

**Broken — section pointers that resolve nowhere (4 places).** Not mechanical, so not edited:

| unit, line | pointer | why it does not resolve | owner |
|---|---|---|---|
| base l. 19211 (PART III, *Not-precluded checks*; `new/base/pipeline/11-part-iii.md` l. 64) | `V07 §15` | V07's sections end at §13 and *Integration notes*; the archived base read "(the parity judge's 44 / 44)" with no pointer | pipeline part |
| V11 l. 745 | `V11 §3.17.3` (the neutral values of the climate reading) | V11 §3.17 has 3.17.1 and 3.17.2 only (as before the pass) | V11 |
| V11 l. 983 | `V11 §3.17.3` (the off forms of items 111 and 113) | the same | V11 |
| INDEX l. 211 (§8) | `V6 §2.1`, `V9 §4.16` | the retired citation form (G-cite) in the doc-check tally sentence §8 kept; INDEX §8 was not rewritten | INDEX §8 (scope) |

**Broken — bare self-references in a volume (canon S7: "Vnn §x.y everywhere, self-references included").** Each resolves
only in its own volume, not in the base:

* **V11 (19).**
  * §3.26's edges table, each row's *mechanism* cell: l. 4154 §3.12, l. 4155 §3.13, l. 4156 §3.14, l. 4157 §3.16,
    l. 4158 §3.17, l. 4159 §3.18, l. 4160 §3.19, l. 4161 §3.20, l. 4162 §3.21, l. 4163 §3.22, l. 4164 §3.23, l. 4165
    §3.24, l. 4166 §3.25, and l. 4179 §3.18.
  * §9's rows J-V11.… at l. 4593 (§3.2.1), l. 4601 (§3.2.1, §3.2.2) and l. 4604 (§3.2.1, §3.2.2).
* **V04 (1).** l. 3362: in the V03 row of its hand-off table, "§3.12 (9) reads `gradeFaces(chamberId)`" means V03 §3.12
  (9), as V04's report's note 6 states.

**Silently misresolved siblings (8; same cells as the V11 self-references).** These pointers resolve in the base but,
listed beside V11's own sections, almost surely name V11's: l. 4154 §3.11; l. 4593 §2.1 and §3.1; l. 4601 §2.2, §3.1 and
§8; l. 4604 §2.1 and §2.2.

**Ids defined only outside the set (16 citations; not broken, listed for principle (4)).** These ids are not rows of the
base index or of a volume's §9. They resolve in validation and critique records:

* `J-S23.2` (base l. 1830) and `J-S23.5` (V03 l. 2647), in `docs/volumes/critique/seam-stage2-3-r*.md`. These share the
  base's `J-S` family prefix, but J-S ids in the base run J-S1 – J-S47.
* `J-SS3.10` (V04 l. 2936), in `seam-surfaces-r3.md`.
* `J-RF2.4`, in `seam-content-calibration-r6.md` and file f's *Finalization*: V06 l. 3552 and 3662; V11 l. 629 and 3799;
  V12 l. 2100, 2101, 2826 and 2976; INDEX l. 7.
* `J-M2` (V08 l. 785) and `J-M11` (V08 l. 1959, 2025 and 2993), "the research plan's", in `docs/AMENDMENTS-2026-09-27d.md`
  and `docs/volumes/critique/V08.md`.

`J-V2.58` (V02 l. 3737) is the sentence that records the number as retired. It is not a citation.

## 7 Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`)

**Sections.** The run uses `--sections "ARCHITECTURE,PART I,PART II,PART III,Delegated decisions,Judgment calls,Staged
by,Appendix A"`. These are the base's eight top-level (`#`) heading keys. Their ranges partition the whole document
exactly once, so every `##` section is checked and none is counted twice. No heading-like line sits inside a code fence,
in the archived document or in the new one.

**Corpus.** The corpus snapshot was identical for every run: 6 JSON files, 426 823 C3 3-grams, 148 C4 lists and 102
colour files. No file under `research/` changed during the pass. **PROVISIONAL.** The script prints its warning that the
reference corpus is incomplete: captures/, research/patreon, research/devlogs, research/ftg-docs and research/external
are absent. Its clean-room result is not authoritative until it is re-run on the machine that holds the corpus.

Cells read hits / unreviewed.

| run | document (sha256 16) | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| U | untouched archive `87588d349c3da255` | 5 / 0 | 0 / 0 | 1 386 / 11 | 2 / 0 | 0 / 0 | 0 / 0 | 1 |
| N | installed base, as placed | 5 / 0 | 1 / 1 | 1 628 / 394 | 4 / 1 | 1 / 1 | 139 / 139 | 1 |
| C | combined copy (scratch, byte-identical to N: this seat is the base's only writer) | 5 / 0 | 1 / 1 | 1 628 / 394 | 4 / 1 | 1 / 1 | 139 / 139 | 1 |
| *S1 fix; 408 reviewed rows appended* | | | | | | | | |
| **N2** | **installed base `70ce49bfa1c64a8a`** | **5 / 0** | **1 / 0** | **1 628 / 0** | **4 / 0** | **0 / 0** | **139 / 0** | **0** |
| C2 | combined copy, byte-identical to N2 | 5 / 0 | 1 / 0 | 1 628 / 0 | 4 / 0 | 0 / 0 | 139 / 0 | 0 |
| U2 | untouched archive, after the others | 5 / 0 | 0 / 0 | 1 386 / 0 | 2 / 0 | 0 / 0 | 0 / 0 | 0 |

U's 11 unreviewed C3 runs are old text. Against this smaller corpus their maximal runs fall differently than the rows the
Mac's runs reviewed. They occur in the new base too and are among the rows below.

**Mechanical correction (1).** S1 at §11.1's 3-D row (l. 14088): the two pipes inside
`compositions: 'asDrawn' | 'derive' | 'none'` are escaped (`\|`). The source is file f item 449's text in
`new/base/rendering/03-s11-export-and-interop.md`. That section file still carries the unescaped pipes, and the live base
is the corrected copy.

**Reviewed allow rows (408).** They are appended as one block headed
`# block: coherence/assemble-r0, 2026-10-03 …`, and each row's reason ends "PROVISIONAL". Each was reviewed against the
corpus.

* **C2, 1 row.** `#ffffff` is pure white in §8.2's snow row, the most generic colour value. No other colour of the
  palette matches.
* **C4, 1 row.** "apothecary baker barber bathhouse tavern" comes from our own six example everyday services in the
  pipeline part's coverage sentence. Five of them are among the 105 building types of FTG's create-request list, so it is
  not a copied list.
* **S2, 21 rows.** These are §2.10, §2.11, §2.13, §2.14, §3.0, §3.12 – §3.22, §4.16, §4.17, §5.5, §5.6 and §5.10. A
  second script (`s2check.py`) checked every one of the 139 occurrences. Each is written `Vnn §x.y`, or continues a
  `Vnn §` list, and resolves in the volume it names. S2 checks pointers only against the base's headings.
* **C3, 385 rows, classed by where the run occurs contiguously in the corpus.**
  * **Stitched (324).** The run occurs contiguously in no findings file and no JSON file. Of these, 306 are in new text
    and 18 in old.
  * **Our own synthesis or reader-tier files (38).** These are `dwellings-synthesis.md` (our plan rung's own interfaces and
    rules, which the design adopted), `code-impact.md` (build names, section numbers, our proposals) and `manor.md` (a
    file path, an ordinary technical phrase).
  * **Number runs (3).**
  * **Ordinary English phrases met in a reading's prose (20).** Examples are "the distance to the nearest" and "cuts
    perpendicular to the frontage". None is a reference identifier, list, table, grammar or palette.

**Rows not dropped.** No allow row was dropped. Rows that point at text this pass removed stay: the allow file is shared
with the volumes' own checks, and dropping a row safely needs a check of every unit.

## 8 The bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md`: 63 221 lines from 14 sources, 9 352 505 →
8 471 511 bytes, sha256 `902f39f41eb8cd7e…`. `--check` then reports UP TO DATE (exit 0). Before the run it reported
STALE, as expected.

## 9 Not placed — open for the verify loop

None of the following is mechanical, so this seat did not edit it. Each is checked on disk as of this run.

1. **Cross-part notes to landed base parts, still unapplied.**
   * (a) The `Invariant` type is used by `KernelTx.expect` (§3.3, l. 3253) and `StageDecl.invariants` (§4.12, l. 8146)
     and declared nowhere. This is the scope report's note to determinism §5.3.
   * (b) `Role` and `BridgeMessage` are cited by §14's type map as §8.2's and §11.3's but are not declared as named types
     there. This is the scope report's note to rendering.
   * (c) The §5.4 `warnings` comment names seven underground codes, while V04 §1b.1 lists twelve; `W_RUIN_SOURCE_REMOVED`
     and four others are absent. This is V04's note 1.
   * (d) §7.3's dwelling-declaration closure (l. 10201) reads "V04's excavation reading `unexcavated`" without "or
     `lost`". This is V04's note 2.
   * (e) II.6 (l. 18243, 18245) still names the retired stored field: "the ways with `flowToward` (§2.4)" and "falling
     with `flowToward`". It should read the `wayFall` reading (item 208). This is V04's note 4.
   * (f) One rank has two names: the base's `UndercityRule.sourceRank` (II.7.5) and V04's `RuinRule.sourceWeight` (8 hits
     in V04). This is V11's cross-part note 1, addressed to the Assemble seat; it is a design term, so it is not
     mechanical.
2. **The broken pointers and form defects of section 6**: four unresolved section pointers, 20 bare self-references and 8
   misresolved siblings.
3. **INDEX.md beyond the scope editor's note.**
   * The intro still says file f's items are "not yet applied", which the pass has now done.
   * The head still carries the `volumes/_finalize` PROGRESS ledger, which is narration.
   * §8's doc-check sentence keeps the old citation forms.
   * §5 and §8 were not rewritten.
4. **Live copy versus source copy.** The two mechanical corrections (V04 l. 3365; the base's §11.1 S1 escape) are in the
   live files only. `new/volumes/V04-underground.md` and `new/base/rendering/03-s11-export-and-interop.md` keep the
   uncorrected text, so a rebuild from those files must re-apply both. The scripts are `build_base.py` and the two edits
   recorded here.
5. **Size.** The set is 7.8 % shorter by words across the base and the volumes (base +13.3 %, volumes −14.9 %), below
   the owner's 25–40 % band. Every editor's report states its unit's irreducible content. Two parts shrank by more than
   half and are flagged by the scope editor for the nuance audit: §0 at −52.3 % and the judgment index at −36.8 %.

## 10 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):**

* The archives: 15 files copied, `cmp` identical, read-only, sha256 recorded.
* The 34-of-34 heading placement and the 12-of-12 volume replacement.
* INDEX.md's four sections and its item range.
* Part A's 59 rows. Index and Part A now hold the same 795 ids in the same order.
* The 17 marks and the two changed entries.
* The reference counts and lists of section 6, and the one renumbering fix.
* The doc-check runs and their exit status.
* The bundle and its `--check`.
* Every size in sections 2 and 3.

**PROVISIONAL:** the clean-room result of the document checks (the reference corpus is absent here) and the 408 allow
rows' reviews that rest on it.

**PLAUSIBLE:**

* The 8 silently misresolved V11 siblings, a reading from context.
* The classification of the J ids defined outside the set as citations of validation records rather than defects.
