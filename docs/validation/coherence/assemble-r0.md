# Assemble — coherence pass, round 0 (the new base, volumes, INDEX and rationale from the eighteen rewrites)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r0 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r0`, 2026-09-30, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 archive (15 files, cmp identical, a-w, sha256) — done
- P2 placement: the base (34 of 34), the twelve volumes, INDEX §3/§4/§6/§7 and the intro — done
- P3 rationale changes of the scope report (45 Part A entries, 3 changed entries, 17 E-24 marks) — done
- P4 references: resolver, 488 mechanical fixes, 1 broken listed, 456 ambiguous-form listed — done
- P5 document checks, three-copy method: 1 correction, 393 reviewed allow rows, exit 0 — done
- P6 bundle and `--check` — done
- P7 this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r0/` (`archive.py`,
`place.py`, `rationale.py`, `refs.py`, `fixrefs.py`, `checks.py`, `attrib.py`, `docfix.py`, `allowrows.py`, `sizes.py`);
no text was hand-edited. Their records sit beside them (`archive.json`, `place.json`, `rationale.json`, `ref-fixes.tsv`,
`ambiguous-refs.tsv`, `c3-attribution.tsv`, `sizes.json`).

## Outcome

The coherence pass's texts are in place: `docs/ARCHITECTURE.md` from the 34 section files (every archived top-level
heading matched by exactly one file, every file by exactly one heading), the twelve volumes from
`docs/validation/coherence/new/volumes/`, INDEX.md's §3, §4, §6 and §7 from `new/index/`, and the rationale's Part A with
the scope report's 45 new entries, three changed entries and the E-24 marks. **Nothing is unplaced.** The set (base and
volumes) goes from 9 062.1 KB to 8 368.9 KB (−7.6 % bytes, −6.1 % words): the base grows by 13.3 % in words (the owner
items 102–119, the f items and the edges written at build depth) and the volumes shrink by 12.5 %. Of 46 333 references
checked, 488 were broken only by citation form and are fixed mechanically (the recorded G-cite rename), **1 is broken**
and left for the verifier (the base's "V07 §15"), 456 resolve but are ambiguous in form (listed), and 132 point outside
the set. The document checks exit 0 over every top-level key and over the eight `#` keys after one mechanical correction
and 393 reviewed allow rows — **provisional**, because the reference corpus is incomplete in this checkout. The bundle
`docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

## 1. Archive

Never overwriting (none existed), `shutil.copy2`, `cmp` identical, `chmod a-w`, sha256 of source and archive equal:

| source | archive | bytes | sha256 |
|---|---|---:|---|
| `docs/ARCHITECTURE.md` | `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` | 2 304 442 | `87588d349c3da25575e915034412627bb4671c9b4696d74675b42d7f7316c31d` |
| `docs/ARCHITECTURE-RATIONALE.md` | `docs/archive/ARCHITECTURE-RATIONALE-pre-coherence-2026-09-28.md` | 675 351 | `db063efd3e73f682730e607be93ad2d15e64837a36229a1810ae4b97080e9693` |
| `docs/volumes/V01-neighbourhoods.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V01-neighbourhoods.md` | 585 123 | `b119c2e0369c6d1286e70afbe9e04e0104b4cbbcdc10f06ea687f293f08cf0df` |
| `docs/volumes/V02-buildings.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V02-buildings.md` | 637 179 | `b527a1e29ebe02016906a9ebfea1af1702f5ae1a8825a78b49ea7b61727f4c24` |
| `docs/volumes/V03-interiors.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V03-interiors.md` | 505 716 | `fcaabceb5468a3428bfa9d13c99025b1f1c60b1ca45d76a8c364182f1bb18961` |
| `docs/volumes/V04-underground.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V04-underground.md` | 530 576 | `63aff301147207a3ba6e2d7cc4a5b7f4ca296431fabe394a507469b3c9def316` |
| `docs/volumes/V05-sky.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V05-sky.md` | 495 910 | `162d464cc8d6dbe9e96e82fc691d5b4e0fd5859dca2ec8e974e86eb3861fe5cc` |
| `docs/volumes/V06-evolution.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V06-evolution.md` | 665 661 | `aeb56d371e3221a7e92cadaaa7fd0003ee46c61e9c190490db848abe412743d1` |
| `docs/volumes/V07-village.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V07-village.md` | 648 060 | `84f9476291ae7c814bf27ecc9703001da74f81b460414bd1b2173274003f09b5` |
| `docs/volumes/V08-settlementforge.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V08-settlementforge.md` | 545 534 | `f379b890226f7e6991a69e68582b2cacff170c6eeae83ced24d9ba04f73cd7e8` |
| `docs/volumes/V09-application.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V09-application.md` | 690 061 | `d4ac111851c93234a5086a26a84b33c213e1cb9f30b9c2c4918ece87cd5833af` |
| `docs/volumes/V10-clerk.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V10-clerk.md` | 538 604 | `6d2eff524a9558e38c8da310c140e2d3c5c4023c3228eee1c4812bcc654a5e2a` |
| `docs/volumes/V11-content.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V11-content.md` | 650 238 | `74f14317886db796ad7cc76afe0a9376ddb3d6330c5c1f924ed2fb8834ea1a24` |
| `docs/volumes/V12-calibration.md` | `docs/archive/volumes-pre-coherence-2026-09-28/V12-calibration.md` | 482 479 | `ed72ef084f275138884c8a40f6512dd455f9c884b7a6a37e594fc1348f293733` |
| `docs/volumes/INDEX.md` | `docs/archive/volumes-pre-coherence-2026-09-28/INDEX.md` | 34 420 | `73d307cf49250daf11cbb89a9beb45a99cc27f06b694d6b8089e8c22d26c83fe` |

## 2. Placement

**The base.** The archived document's `#` / `##` headings outside code fences, in order (34), each matched to the one file
under `docs/validation/coherence/new/base/*/` whose first line is byte-identical; files joined by one blank line.
Result: 34 of 34 placed, 0 headings without a file, 0 files without a heading, 0 files holding a second top-level
heading, code fences balanced (132 fence lines). The title block keeps its one banner line (principle (8)). Sizes below
are of the section files as placed; the whole-document figures in §4 include the assembler's later fixes.

| archived l. | heading | section file | bytes before | bytes after | words before | words after |
|---:|---|---|---:|---:|---:|---:|
| 1 | ARCHITECTURE — PLAT, the fused town/city generator (base),… | `scope/01-title.md` | 1 827 | 2 063 | 264 | 302 |
| 20 | The whole design in one page (plain words) | `scope/02-summary.md` | 11 433 | 10 317 | 1 944 | 1 732 |
| 131 | §0 Provenance | `scope/03-s0.md` | 35 077 | 15 915 | 5 689 | 2 716 |
| 264 | PART I — THE BASE (stage 1): the MFCG ⊕ FTG town/city gene… | `scope/04-part1.md` | 92 | 91 | 17 | 17 |
| 266 | §1 Scope, product shape, fusion thesis, stack | `scope/05-s1.md` | 34 720 | 34 526 | 5 570 | 5 580 |
| 469 | §2 Domain model and schemas | `model/01-domain-model-and-schemas.md` | 268 918 | 343 686 | 42 526 | 54 155 |
| 2452 | §3 Geometry kernel | `kernel/01-geometry-kernel.md` | 144 633 | 152 949 | 23 820 | 25 103 |
| 3680 | §4 Generation pipeline | `pipeline/01-s4-generation-pipeline.md` | 361 429 | 444 530 | 58 407 | 71 900 |
| 6794 | §5 Failure handling — no whole-map discard-and-retry | `determinism/01-s5-failure-handling.md` | 66 904 | 67 853 | 11 083 | 11 178 |
| 7031 | §6 Determinism | `determinism/02-s6-determinism.md` | 81 400 | 86 680 | 12 912 | 13 952 |
| 7795 | §7 Editing and regeneration locality — everything is edita… | `determinism/03-s7-editing.md` | 245 809 | 307 748 | 39 122 | 48 968 |
| 9515 | §8 Rendering and the style system | `rendering/01-s08-rendering-and-the-style-system.md` | 190 859 | 220 234 | 31 909 | 36 725 |
| 11047 | §9 Labels and map furniture | `rendering/02-s09-labels-and-map-furniture.md` | 39 996 | 43 567 | 6 554 | 7 160 |
| 11435 | §10 Simulation and content layer (FTG parity, with restrai… | `pipeline/02-s10-simulation-content.md` | 55 335 | 71 652 | 8 236 | 10 599 |
| 11889 | §11 Export and interop | `rendering/03-s11-export-and-interop.md` | 58 250 | 84 513 | 9 320 | 13 478 |
| 12324 | §12 Performance budgets | `rendering/04-s12-performance-budgets.md` | 63 761 | 70 066 | 11 375 | 12 641 |
| 12916 | §13 Testing and verification | `scope/06-s13.md` | 166 566 | 205 967 | 26 850 | 33 251 |
| 14222 | §14 Package and module layout, key interfaces, dependency … | `scope/07-s14.md` | 50 932 | 65 451 | 7 391 | 9 200 |
| 14631 | §15 Parity matrix and improvement matrix | `scope/08-s15.md` | 49 075 | 50 351 | 8 436 | 8 692 |
| 14865 | §16 Build plan — calibration and spikes first, then a view… | `scope/09-s16.md` | 47 550 | 51 588 | 7 565 | 8 258 |
| 14969 | §17 Clean-room and legal posture; third-party licences | `scope/10-s17.md` | 22 831 | 25 369 | 3 383 | 3 755 |
| 15186 | PART II — STAGE 2: the city composed of neighbourhoods (in… | `pipeline/03-part-ii.md` | 851 | 914 | 133 | 147 |
| 15196 | II.1 The district → neighbourhood interface | `pipeline/04-ii1-district-neighbourhood-interface.md` | 11 456 | 11 828 | 1 753 | 1 858 |
| 15294 | II.2 Templates as fabric strategies (NG B2, B7, B8) | `pipeline/05-ii2-templates.md` | 4 482 | 5 178 | 739 | 852 |
| 15334 | II.3 Block content dispatch, pins, local identities (stage… | `pipeline/06-ii3-block-dispatch.md` | 1 961 | 2 489 | 308 | 392 |
| 15354 | II.4 The render tier, the workflow and the close-up's pers… | `pipeline/07-ii4-render-tier-workflow.md` | 3 633 | 3 872 | 578 | 618 |
| 15389 | II.5 What the base already carries for stage 2 (all base r… | `pipeline/08-ii5-base-carries.md` | 2 707 | 2 848 | 405 | 422 |
| 15418 | II.6 The staged layers — floating islands and sewers: the … | `pipeline/09-ii6-staged-layers.md` | 17 569 | 18 083 | 2 822 | 2 895 |
| 15573 | II.7 The sewer layer — existence by tier, the network stag… | `pipeline/10-ii7-sewer-layer.md` | 72 352 | 87 759 | 11 334 | 13 822 |
| 16189 | PART III — What a later village product needs from the bas… | `pipeline/11-part-iii.md` | 7 600 | 6 801 | 1 204 | 1 067 |
| 16268 | Delegated decisions (the owner deferred all judgment; each… | `scope/11-delegated.md` | 19 170 | 19 863 | 3 005 | 3 107 |
| 16484 | Judgment calls ("chose X over Y because Z"; each vetoable) | `scope/12-judgment.md` | 149 419 | 88 961 | 25 908 | 16 156 |
| 17239 | Staged by the owner's roadmap (this document defers nothin… | `scope/13-staged.md` | 11 597 | 8 165 | 1 779 | 1 296 |
| 17261 | Appendix A — reading record, and CONFIRMED versus PLAUSIBLE | `scope/14-appendixA.md` | 4 215 | 3 553 | 657 | 549 |

**The volumes.** Each `docs/volumes/V*.md` replaced by the file of the same name under `new/volumes/` (12 of 12; no new
file without a volume). One post-placement correction, the only one in a volume text besides §5's reference fixes:
**V06** carried a stray closing code fence after its §2.12 lifecycle table (no opener; the archived V06 has none there),
which flipped every later fence and would have rendered §2.13 onward as code, its headings lost; the one line is removed
(`place.py`, exact match), restoring the archive's 26 fence lines.

**INDEX.md** (canon: "the scope editor writes INDEX §3, §4 … §6 and §7 … and the assembler writes the file"; scope
report, *Cross-part notes*, *INDEX.md*): §3 ← `new/index/03-dependency-graph.md` (2 216 → 2 296 bytes), §4 ←
`04-combined-build-order.md` (3 292 → 964), §6 ← `06-owner-questions.md` (4 856 → 3 278), §7 ← `07-reconciliation.md`
(5 736 → 545), each starting with its heading line exactly; the intro's "(file g, items 102–110)" now reads "(file g,
items 102–113)"; §1, §2, §5 and §8 stand as they were.

## 3. The rationale (scope report, *Cross-part notes*, "Rationale (Part A)")

`rationale.py`, every replacement matching exactly once:
* **45 new Part A entries**, parsed from the report's full texts ("J-x: chose …") and appended after Part A's last row as
  `| J-x | Chose … |`, in the report's order: the scope part's 22 (J-C1 – J-C4, J-S44 – J-S47, J-A73.06, J-A77.06,
  J-A102.01, J-A110.01, J-A111.01, J-A112.01, J-A113.01, J-A201.01, J-A505.01, J-A505.02, J-A509.01, J-A568.01 –
  J-A568.03) and the part editors' J122 decisions (determinism 6, model 7, kernel J-K37, pipeline 9). Guards: the
  parsed ids equal the report's list of new index rows; none was already in Part A; each is one row of the new index.
  Part A now holds 781 entries, as the index holds 781 rows; 0 misshapen rows, 0 duplicate ids.
* **Changed entries:** J-A16.01 drops the historical total "of 166–220" (SCOPE-C03; the parenthesis "(153–204 before
  amendments b)" is kept as the history it records); J-A29.25 reads the report's two clauses (BCR-V2-33 (b), file f
  item 371: "`external` for a walk-out or where no ground wing is storeyed (§2.6 *Basements*; its door V03 §3.7.1's),
  else the programme row's `basementAccess` at `builtBand`" and "an `external` basement's outside stair is a door at the
  point §2.6's plan rung step 3 gives (V03 §3.7.1)"); J-A28.02 drops "under canon R11" (ID-R: the repair-round R11 is
  narration).
* **E-24 marks** on the 17 entries the report lists, each copied from the entry's new index row (" — *amended by …*" /
  " — *superseded by …*"): J-P16, J-A29.01, J-A30.71, J-A30.72, J-A30.22, J-A8.21, J-A12.45, J-DET-2, J-DET-6, J-DET-53,
  J-A28.71, J-A16.01, J-A28.02, J-A32.02, J-A68.05, J-A81.71, J-A101.04.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change |
|---|---:|---:|---:|---:|---:|---:|
| base | 2 304 442 | 2 615 627 | +13.5 % | 372 998 | 422 575 | +13.3 % |
| V01 | 585 123 | 464 158 | -20.7 % | 93 140 | 76 024 | -18.4 % |
| V02 | 637 179 | 494 200 | -22.4 % | 103 630 | 82 668 | -20.2 % |
| V03 | 505 716 | 388 143 | -23.2 % | 82 788 | 65 917 | -20.4 % |
| V04 | 530 576 | 460 463 | -13.2 % | 83 966 | 74 624 | -11.1 % |
| V05 | 495 910 | 360 317 | -27.3 % | 81 161 | 60 743 | -25.2 % |
| V06 | 665 661 | 593 982 | -10.8 % | 106 357 | 96 675 | -9.1 % |
| V07 | 648 060 | 561 556 | -13.3 % | 104 422 | 92 729 | -11.2 % |
| V08 | 545 534 | 489 825 | -10.2 % | 84 356 | 77 159 | -8.5 % |
| V09 | 690 061 | 635 793 | -7.9 % | 111 610 | 105 485 | -5.5 % |
| V10 | 538 604 | 466 617 | -13.4 % | 84 658 | 75 073 | -11.3 % |
| V11 | 650 238 | 608 701 | -6.4 % | 106 185 | 101 973 | -4.0 % |
| V12 | 482 479 | 430 397 | -10.8 % | 76 414 | 69 784 | -8.7 % |
| INDEX | 34 420 | 25 407 | -26.2 % | 5 890 | 4 250 | -27.8 % |
| rationale | 675 351 | 685 208 | +1.5 % | 113 979 | 115 671 | +1.5 % |
| **base + volumes** | 9 279 583 | 8 569 779 | -7.6 % | 1 491 685 | 1 401 429 | -6.1 % |
| **volumes** | 6 975 141 | 5 954 152 | -14.6 % | 1 118 687 | 978 854 | -12.5 % |
| **base + volumes + INDEX** | 9 314 003 | 8 595 186 | -7.7 % | 1 497 575 | 1 405 679 | -6.1 % |

The set lands at −6.1 % in words against the shrink goal's 25–40 % band; the assembler cannot close that gap (it may not
compress text). Each rewrite report states its unit's words by source and what irreducible content holds it (the base
parts grew by the mandated additions: owner items 102–119 at build depth, the f items, the edges). No unit shrank by
more than half as a whole (the largest: V05 −25.2 %, INDEX −27.8 %). The bundle goes from 9 352 505 to 8 616 624 bytes.

## 5. References

**Resolver** (`refs.py`, read-only). Every `§x`, `§x.y`, `§x.y.z` (continuation lists and ranges included, lines read
joined so a reference wrapped across a line break counts once), `Vnn §x` (and the short `V4 §` and `volume n §` forms),
`INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…` in the base, the twelve volumes and INDEX.md, against what now exists: the
base's 147 numbered headings, each volume's numbered headings and bold-numbered paragraph labels (V01 120, V02 95, V03
51, V04 65, V05 59, V06 131, V07 54, V08 61, V09 123, V10 84, V11 150, V12 120), INDEX's 8, and 3 218 defined ids (the
judgment index's rows, `**D-n —`, §13's `(Tn-m)` and `(T-RIG-n)`, the T-ER table rows, each volume's T-Vn-m and J-Vn.m
rows, `_integrate.md`'s J-VI rows). Citation form is canon S7: a bare `§x` is the base's; a volume is cited `Vnn §x`
everywhere, self-references and every item of a list included. A bare `§x` continuing a list headed by `Vnn §…` (or by a
parenthesis opened right after a volume's name, "reads from V11 (§3.18, …") is read against that volume.

| class | count | meaning |
|---|---:|---|
| resolved | 45 734 | the target exists (bare `§` 18 665, `Vnn §` 15 737, J 5 408, T 5 002, II 1 210, D 287, INDEX 10, …) |
| fixed (G-cite) | 488 | resolved after the fix below |
| ambiguous form | 456 | a bare `§x` continuing a volume's list that exists in both the base and that volume: S7 reads it as the base, so it resolves; listed for the verifier |
| external | 132 | 120 `§` references whose list head is another document (a findings or capture file, RFC 7946, IMPROVEMENTS, …) and 12 decision ids of other records: J-RF2.4 ×5 (file f), J-M11 ×3 and J-M2 (the SettlementForge research plan), J-Fsf-1 (`research/sf/dossier-seam.md`), J-S23.2 and J-SS3.10 (`docs/volumes/critique/`) |
| resolved, older form | 9 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms as examples) |
| resolved, generic | 1 | INDEX §2's "each volume's §1b wiring table" — every volume has §1b |
| **broken** | **1** | below |

**Broken (1), left for the verifier — not mechanical:**
* `docs/ARCHITECTURE.md` l. 19 218 (PART III, *Not-precluded checks*): "(the parity judge's 44 / 44; V07 §15)". V07 has
  no §15 (its sections end at §13, the fix list, and *Integration notes*), and no V07 text names the judge's 44 / 44. The
  pointer was added by the pipeline rewrite (the archived line reads "(the parity judge's 44 / 44)"); its intended target
  is not recorded in any rewrite report.

**Fixed mechanically (488), `fixrefs.py`, recorded one by one in `ref-fixes.tsv`.** The rename every volume rewrite
records (G-cite, canon S7; V04, V05, V06, V09, V10, V11, V12 *Id rulings*: "every section of a list carrying its prefix",
"self-references included") left bare `§x` behind that resolve in no base heading. Each fix inserts the volume's prefix
before the `§` and is made only where the target is certain — the bare `§x` exists in no base heading and in exactly one
candidate volume: 420 list continuations (the list's head volume: "V04 §3.2, §3.5.0, §3.5.4" → "…, V04 §3.5.0, V04
§3.5.4"; 32 of them in the base, 1 in INDEX), 66 self-references in V06 (its own §3.5–§3.24 cited bare in its parameter
tables), and 2 in V06 resolved by the one volume the clause names. By unit: base 32, V01 120, V02 11, V03 1, V05 52, V06
160, V07 81, V08 22, V11 8, INDEX 1. The 33 fixes whose number also exists in the citing volume were each read: every
one continues its list's head volume. After the fixes the resolver finds every one of them resolved and no other class
moved.

**Recorded renumberings checked:** §13.9's re-points ((5) → (4) for the relation templates, (6) → (5) for the palette
bands; scope report) — every citation of §13.9 (4), (5) and (7) in the set already reads the new numbering, nothing to
re-point; A.3 → Appendix A: no `A.3` pointer remains; J-T → JT: no `J-T` remains; no other rewrite report renumbers a
subsection or an id (determinism, model, kernel, pipeline, rendering: none; the volumes add ids only).

**Ambiguous form (456), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume, context).** By
unit: base 45, V01 59, V02 12, V03 9, V04 3, V05 68, V06 49, V07 125, V08 63, V09 9, V10 3, V11 9, V12 2. Most read
naturally as the head volume's (for example V07's J-rows "V07 §2.7, §3.11"), but the base also has the section, so the
text resolves under S7 and the assembler may not choose; the verifier should confirm each (a prefix where the volume is
meant).

**Uniqueness (principle (4)), census:** no duplicate definition among the judgment index's J rows, the D-n decisions, the
T-ER rows, each volume's T-Vn-m (§7) and J-Vn.m (§9) rows, or `_integrate.md`'s J-VI rows (`sizes.py`).

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"`, allow file
`docs/validation/doc-checks-allow.tsv`, on three copies against one corpus snapshot: **untouched** (the archived base),
**new** (the placed section files, before the assembler's fixes) and **combined** (the live document). Two key sets: (a)
the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated
decisions,Judgment calls,Staged,Appendix A` — the brief's command; the parent keys span their children, so their C3 and
C4 hits count twice — and (b) the eight `#` keys, which partition the document.

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures,
research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative;
re-run on the machine that holds the corpus before any freeze". The snapshot: 40 findings files, 6 JSON files, 426 823
C3 3-grams, 148 C4 lists, 102 colour files. Every count below is PROVISIONAL.

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 0 / 0 | 2 665 / 21 | 4 / 0 | 0 / 0 | 0 / 0 | 1 |
| untouched (b) | first | 5 / 0 | 0 / 0 | 1 386 / 11 | 2 / 0 | 0 / 0 | 0 / 0 | 1 |
| new (a) | first | 5 / 0 | 1 / 1 | 3 142 / 753 | 8 / 2 | 1 / 1 | 139 / 139 | 1 |
| new (b) | first | 5 / 0 | 1 / 1 | 1 627 / 393 | 4 / 1 | 1 / 1 | 139 / 139 | 1 |
| combined (a) | first | 5 / 0 | 1 / 1 | 3 116 / 727 | 8 / 2 | 1 / 1 | 139 / 139 | 1 |
| combined (b) | first | 5 / 0 | 1 / 1 | 1 614 / 380 | 4 / 1 | 1 / 1 | 139 / 139 | 1 |
| untouched (a) | final | 5 / 0 | 0 / 0 | 2 665 / 0 | 4 / 0 | 0 / 0 | 0 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 0 / 0 | 1 386 / 0 | 2 / 0 | 0 / 0 | 0 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3 142 / 28 | 8 / 0 | 1 / 1 | 139 / 0 | 1 |
| new (b) | final | 5 / 0 | 1 / 0 | 1 627 / 14 | 4 / 0 | 1 / 1 | 139 / 0 | 1 |
| **combined (a)** | **final** | 5 / 0 | 1 / 0 | 3 116 / 0 | 8 / 0 | 0 / 0 | 139 / 0 | **0** |
| **combined (b)** | **final** | 5 / 0 | 1 / 0 | 1 614 / 0 | 4 / 0 | 0 / 0 | 139 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets and under `PYTHONHASHSEED` 0, 1, 2 and
12345; its final hit count over the 34 keys is 3 269 (C1 5, C2 1, C3 3 116, C4 8, S1 0, S2 139), 0 unreviewed. The
untouched archive's 21 unreviewed runs were drift of this smaller corpus on unchanged text (the runs split differently);
they are among the combined document's runs and now reviewed. The new copy's 14 remaining runs and its S1 row exist only
in that copy: the assembler's reference fixes and the correction below changed those lines.

* **Corrected (1, `docfix.py`):** S1 at §11.1's export table, the 3-D row — the code span `` `compositions: 'asDrawn' |
  'derive' | 'none'` `` held two unescaped pipes, splitting the row into 5 cells against the header's 3 (GitHub Markdown
  truncates it); the pipes are escaped `\|`, S1's own rule.
* **Reviewed allow rows (393), one block `# block: coherence/assemble-r0` appended to the allow file** (C3 370, S2 21, C2
  1, C4 1), each a false positive with its reason:
  * **C3 (370 distinct runs; 727 lines under (a), 380 under (b)).** Attributed by `attrib.py` (the check's
    tokenisation; `c3-attribution.tsv`): 309 are held whole by no corpus file — chains of 3-grams from several places,
    mostly section-pointer and number chains and our own wording; 36 are held whole only by the program's own design
    pages `research/findings/dwellings-synthesis.md` and `code-impact.md`, which quote the design; the other 25 are held
    whole by a reference-findings file and were each read in context: ordinary phrases ("the distance to the nearest",
    "is left out of the"), our own design statements ("the basement lies inside the ground", "wings in the collision
    set", J-A59.21), a number run (a population sweep's multipliers), the build version VG 1.6.9 in §0.2's row 61, a
    capture path cited for traceability, the generic calendar fields of §10.3's day schedule. 157 of the 370 already
    stood in the archived base or an archived volume. None is a reference list, table, grammar, palette or identifier.
  * **S2 (21 pointer texts, 139 lines):** volume-prefixed pointers (`V05 §3.22`, `V07 §3.12`, …): S2 reads the base's
    headings only. The script verified that every occurrence of each text in the base carries its volume prefix, and
    the resolver resolves each against its volume.
  * **C2 `#ffffff`:** §8.2's palette, row `snow` (g item 117's seasons): pure white, a universal value; the corpus hit is
    NG's background colour in `research/findings/profile-neighbourhood.md`.
  * **C4 `apothecary baker barber bathhouse tavern`:** §4's spread-and-pull bullet (g items 103 (f), 107) — our own
    six-item example of everyday services in our own order; five generic trade nouns shared with FTG's 209-member
    building-type list in `research/ftg-capture/*.json` (the precedent rows for generic building nouns reason the same).
* **Allow rows not dropped.** Without the allow file the live document raises 1 481 distinct hits; 591 of the file's
  2 072 rows now match none. The brief permits dropping rows for text this pass removed, but with an incomplete corpus a
  row matching nothing here may still be needed on the machine that holds the corpus, and the allow file is shared, so
  this seat only appends; a kept row hides no new hit (review is by exact text).
* **The rationale (information; not held to exit 0):** its own run gives C3 479 / 307 unreviewed and S2 17 / 15 before,
  481 / 309 and 17 / 15 after — the 45 new Part A entries add two C3 runs.

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (64 248 lines from 14 sources; 9 352 505 →
8 616 624 bytes); `--check` reports it up to date (exit 0).

## 8. Not placed, and left for the verifier

* **Unplaced: nothing** (34 of 34 base headings, 12 of 12 volumes, 4 of 4 INDEX sections).
* **The one broken reference** (§5): the base's PART III "V07 §15".
* **456 ambiguous-form references** (§5, `ambiguous-refs.tsv`): read as the base under S7; the verifier should confirm
  each or prefix it.
* **V12's cross-part note 2** (rewrite-V12.md, *Cross-part notes*): V10's `RuleAnswer.register` comment and its §1b.1
  input still name `register.json` (V10 l. 254, l. 1 019), where V12 asks for `dist/evidence.json` (V12 §2.10). A text
  change to V10, not a mechanical one; not made.
* **V04's judgment call 1** ("the assembler may drop the first column [of the Integration-notes map] with no loss"):
  optional; not done.
* **The document checks are provisional** (§6): re-run them on the machine that holds the reference corpus; the 393
  rows were reviewed against this checkout's smaller corpus, and a fuller corpus can lengthen or split runs.
* **Size:** the set at −6.1 % words, below the 25–40 % band (§4); each rewrite report states what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the fifteen archives byte-identical to their sources and read-only, with the sha256 above;
34 of 34 headings placed, the twelve volumes and INDEX's four sections written, fences balanced; the rationale's 45
entries, 3 changes and 17 marks applied with exact-match guards (781 Part A entries, 0 misshapen, 0 duplicate); 46 333
references classified, 488 fixed and re-resolved, 1 broken; the document checks' counts in §6 and exit 0 on the
combined document for both key sets and four hash seeds; the bundle regenerated and `--check` clean; the sizes of §4.
**PLAUSIBLE:** that each of the 393 allow rows is a false positive (each attributed by script; the 25 runs held whole by
reference findings and the C2, C4 and S2 rows read once in context by this seat, no second reader), and that each of the
488 G-cite fixes names the volume the author meant (certain where the number exists in one candidate volume only; the 33
with a second reading were read).
