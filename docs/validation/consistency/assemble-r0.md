# Assemble — consistency pass, round 0 (the new `docs/ARCHITECTURE.md` from the six parts' section files)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/assemble-r0`, 2026-09-26. Status: COMPLETE. A mechanical seat: every step ran as a script
(`docs/validation/consistency/assemble-r0.py`, `docs/validation/consistency/assemble-r0-refs.py`); no section text was
hand-edited.

## Outcome

The new `docs/ARCHITECTURE.md` is assembled from the 33 section files under `docs/validation/consistency/new/`
(1 461 981 → 1 118 472 bytes, **76.5 %**; 11 477 → 9 638 lines). Every archived top-level heading was matched by exactly
one file and every file by exactly one heading; nothing was left unplaced. Every internal reference resolves (0 broken).
The document checks exit 0 with 0 unreviewed hits after 56 reviewed allow rows were added (all false positives; no
mechanical correction was needed). The pre-pass text is kept byte-identical at
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md` (sha256 `5414edb3…686d`, `cmp` identical).

## 1. Archive and placement

* **Archive.** `cp -p docs/ARCHITECTURE.md docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`; `cmp` reports
  identical, both sha256 `5414edb3d6f3af0d3c77905f03461db213e9279caf29371913a7ac2f1040686d`.
* **Placement rule** (script): the archived document's `#` / `##` headings outside code fences, in order (33); each matched
  to the one file whose first line is byte-identical; files joined by one blank line. Result: **33 of 33 placed**, 0
  headings without a file, 0 files without a heading, 0 files holding a second top-level heading. The order agrees with
  the scope rewrite's placement note (its cross-part note 3).
* **Post-placement edits** (the only ones; each named in a rewrite report as the assembler's):
  `## II.3 … (S2 context features)` → `## II.3 … (stage-2 feature S2: context features)` and
  `## II.4 … (S5, S6)` → `## II.4 … (stage-2 features S5, S6)` — `rewrite-pipeline.md` §1, CF-PIPE-08. Heading keys
  (II.3, II.4) unchanged.
* **Review banner.** The document holds exactly one "PENDING FABLE REVIEW" line — the banner under the title (from
  `new/scope/01-title.md`); the 133 per-section markers are gone. Code fences balance (88 fence lines).
* **Rationale Part F** (scope cross-part note 2): `docs/ARCHITECTURE-RATIONALE.md` (279 481 bytes, written 07:09:11)
  was built after the last companion changed (kernel 06:19, determinism 06:38, pipeline 06:39, rendering 07:02); a
  line-by-line check finds every passage line of the four companions in it — the only lines absent are the companions'
  own preambles and the rendering companion's source-line index table. No refresh was needed.

## 2. Sizes

| section | before (bytes) | after (bytes) | after / before |
|---|---:|---:|---:|
| ARCHITECTURE — PLAT, the fused town/city generator (base), n… | 2 130 | 1 609 | 76 % |
| The whole design in one page (plain words) | 8 405 | 5 978 | 71 % |
| §0 Provenance | 17 934 | 3 469 | 19 % |
| PART I — THE BASE (stage 1): the MFCG ⊕ FTG town/city genera… | 93 | 93 | 100 % |
| §1 Scope, product shape, fusion thesis, stack | 32 340 | 27 414 | 85 % |
| §2 Domain model and schemas | 186 697 | 141 265 | 76 % |
| §3 Geometry kernel | 147 958 | 111 380 | 75 % |
| §4 Generation pipeline | 186 779 | 155 955 | 83 % |
| §5 Failure handling — no whole-map discard-and-retry | 41 948 | 35 011 | 83 % |
| §6 Determinism | 60 044 | 50 288 | 84 % |
| §7 Editing and regeneration locality — everything is editabl… | 122 329 | 103 754 | 85 % |
| §8 Rendering and the style system | 118 171 | 92 210 | 78 % |
| §9 Labels and map furniture | 32 047 | 26 440 | 83 % |
| §10 Simulation and content layer (FTG parity, with restraint… | 19 225 | 16 999 | 88 % |
| §11 Export and interop | 36 716 | 31 276 | 85 % |
| §12 Performance budgets | 58 198 | 47 810 | 82 % |
| §13 Testing and verification | 89 129 | 82 151 | 92 % |
| §14 Package and module layout, key interfaces, dependency ru… | 24 281 | 20 391 | 84 % |
| §15 Parity matrix and improvement matrix | 44 586 | 41 279 | 93 % |
| §16 Build plan — calibration and spikes first, then a viewab… | 35 187 | 31 855 | 91 % |
| §17 Clean-room and legal posture; third-party licences | 22 630 | 19 557 | 86 % |
| PART II — STAGE 2: the city composed of neighbourhoods (inte… | 825 | 852 | 103 % |
| II.1 The district → neighbourhood interface | 12 100 | 10 478 | 87 % |
| II.2 Templates as fabric strategies (NG B2, B7, B8) | 2 689 | 2 489 | 93 % |
| II.3 Block content dispatch, pins, local identities (stage-2… | 1 376 | 1 305 | 95 % |
| II.4 The render tier, the workflow and the close-up's persis… | 3 411 | 2 803 | 82 % |
| II.5 What the base already carries for stage 2 (all base req… | 2 586 | 2 464 | 95 % |
| II.6 The staged layers — floating islands and sewers: the ho… | 3 977 | 3 600 | 91 % |
| PART III — What a later village product needs from the base … | 4 289 | 4 110 | 96 % |
| Delegated decisions (the owner deferred all judgment; each i… | 20 910 | 14 558 | 70 % |
| Judgment calls ("chose X over Y because Z"; each vetoable) | 115 805 | 24 468 | 21 % |
| Staged by the owner's roadmap (this document defers nothing) | 4 033 | 3 803 | 94 % |
| Appendix A — reading record, and CONFIRMED versus PLAUSIBLE | 3 153 | 1 358 | 43 % |
| **whole document** | **1 461 981** (11 477 lines) | **1 118 472** (9 638 lines) | **76.5 %** |

The whole document lands at 76.5 %, above the pass's 55–65 % target. The assembler cannot close that gap (it may not
compress text); each rewrite report states its part's reason (for example the kernel's: 309 of 386 items are home
statements). The largest reductions are the moved-out material — Judgment calls (21 %, the reasoning now in
`docs/ARCHITECTURE-RATIONALE.md` Part A), §0 (19 %, history in Part B) and Appendix A (43 %, Part C). Normative text
plus rationale file: 1 118 472 + 279 481 = 1 397 953 bytes (95.6 % of the pre-pass document).

## 3. References

Resolver (`assemble-r0-refs.py`): every `§x`, `§x.y`, `§x.y.z` (including continuation lists such as "§3.2, 3.4" and
"§3.2–3.4"), `D-n`, `J-…` and `II.n` / `III.n` reference in the document, against the document's own 134 numbered
headings, its 35 `**D-n —` decisions and its 276 judgment-index rows (`| J-… |`).

* **Broken: 0.** Two unresolved pointers are external, not broken: l. 2036 `os-geometry.md` §2.1.4 (a findings file)
  and l. 6814 RFC 7946 §3.1.6 (the GeoJSON standard).
* **Mechanical fixes: none needed.** The only renumbering in any rewrite report is §0's (scope decision 1: 0.2 = former
  0.4, 0.3 = former 0.5, former 0.2, 0.3 and 0.6–0.11 moved to rationale Part B). The document's one §0 pointer
  (title block, "§0.3 and Appendix A") already names evidence discipline, the new §0.3; no pointer names a removed §0
  subsection. The kernel, model, pipeline, determinism and rendering reports each state that no subsection or item label
  was renumbered.
* doc_checks S2 (the same check over `§n` / `§n.m`) agrees: 0 hits.

## 4. Document checks

Command: `python3 docs/validation/bench/doc_checks.py --sections "<keys>"` with the allow file
`docs/validation/doc-checks-allow.tsv`. Two key sets were run, because the script's section ranges nest: (a) all 33
top-level heading keys (`ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.6,PART III,Delegated
decisions,Judgment calls,Staged,Appendix A`) — every parent key (`ARCHITECTURE`, `PART I`, `PART II`) also spans its
children, so each C3 / C4 hit there counts twice; (b) the eight `#` headings, which partition the document exactly.

| check | first run (a): hits / unreviewed | first run (b) | final run (a): hits / unreviewed | final run (b) |
|---|---|---|---|---|
| C1 identifiers | 5 / 0 | 5 / 0 | 5 / 0 | 5 / 0 |
| C2 colours | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| C3 3-grams | 964 / 105 | 495 / 54 | 964 / 0 | 495 / 0 |
| C4 lists | 14 / 2 | 7 / 1 | 14 / 0 | 7 / 0 |
| S1 tables | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| S2 pointers | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| exit status | 1 | 1 | **0** | **0** |

* **Reviewed, not corrected.** The 55 distinct unreviewed hits of the first runs (54 C3 runs, 1 C4 line) were each read
  in context in the assembled text; 25 of the C3 runs occur verbatim in the pre-pass document (their run boundaries
  moved). All are false positives: 11 pointer-or-number runs, 2 citation file names, 2 short attributed quotes and 1
  own-words failure statement in §3.5's evidence table, 1 measured CONFIDENCE fact (II.3), 1 generic calendar field list
  (§10.3), 1 own description of the city-band default (§8.5), 1 shorter run of an already-reviewed longer one, 34
  ordinary phrases of our own text, and the §5.2 F-REDERIVE line for C4. They are the block
  `# block: consistency/assemble-r0` at the end of the allow file (56 rows: the 55 plus one C4 tie variant, below).
* **C4 is not deterministic across interpreter runs.** For a line whose best match ties between two equal-size lists,
  `doc_checks.py` prints whichever `max()` meets first in a Python `set`, whose order follows `PYTHONHASHSEED`: l. 4023
  printed `edge reach side water yard` in one run and `gate reach side wall yard` in the next. A replica of the C4 build
  enumerated every tie in the document (2 lines: l. 4023 and l. 8613, both variants of each now reviewed); the final
  runs exit 0 under `PYTHONHASHSEED` 0, 1, 2 and a random seed. The script is left unchanged (not this seat's file);
  the tie-break is flagged for its owner in §5.
* **Stale allow rows kept.** With an empty allow file the final document raises 483 distinct hits; 204 of the 687
  reviewed allow rows now match no hit (198 C3, 5 C4, 1 S2 — text this pass removed or moved into the rationale file, or
  runs whose boundaries moved). The pass permits dropping them; they are kept, because the moved text lives on verbatim
  in `docs/ARCHITECTURE-RATIONALE.md` and the archive, and a kept row cannot hide a new hit (review is exact-text).

## 5. Could not place / left for the validator

* **Could not place: nothing.** 33 of 33 headings and files placed.
* **Tag style is mixed** (scope cross-part note 1, determinism decision 1). The fix-record tags (VS…, SCL-…, LC-…, GEO-…,
  FTG-…, IMP-…, DEF-…, COV-…, MFP-…, MN-…) remain 450 times: §4 142, §3 84, §2 74, §8 40, §12 25, §10 23, §11 23, §9 9,
  PART III 7, §13 5, §17 4, II.1–II.6 11, §1 2, §5 1; §6, §7, §14–§16 and the back matter carry none. "round N"
  narration: 0. Making the style uniform is a text change, not an assembly step — for the validator.
* **Size target** (§2): 76.5 % against 55–65 %.
* **Cross-part notes.** The six rewrite reports carry ≈ 89 notes addressed to other parts (kernel 12, scope 10,
  determinism 10, model 18, pipeline 31, rendering 8). Only the two heading renames were addressed to the assembler.
  Three were spot-checked and are applied (the `LatticeSpec` comment no longer says "soft"; §2.6 cites "§3.8's convex
  near-rectangle test"; the index holds J-K36); the rest were not verified here — the validator should walk them.
* **Owner items, untouched:** RULING-1 (the owner's GPL-3 intent against §17.3 / D-22's proprietary default) and the
  evening amendments of `docs/AMENDMENTS-2026-09-25b.md` (scope cross-part note 7).
* **Tool note for `docs/validation/bench/doc_checks.py`'s owner:** C4's tie-break (§4) should be made deterministic —
  for example, report the lexicographically smallest of the tied word sets — so a reviewed line cannot resurface under
  another hash seed.

## CONFIRMED vs PLAUSIBLE

CONFIRMED (executed): the archive is byte-identical; 33 of 33 placed; 0 broken references; doc checks exit 0 on both
key sets and on four hash seeds; the rationale file carries every companion passage line. PLAUSIBLE (reading only): that
each of the 56 allow rows is a false positive — each hit was read once in context by this seat, no second reader.
