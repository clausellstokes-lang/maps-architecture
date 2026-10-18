# Rewrite — scope part (title, summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Outputs: fourteen section files in `docs/validation/consistency/new/scope/` and the new
companion `docs/ARCHITECTURE-RATIONALE.md`. The part now states each fact it owns once, points to the other parts'
homes instead of restating them, carries no round narration and no per-section review banners (one banner under the
title), keeps every mechanism, interface, number, test and decision, and applies the four round-5 items it owns
(VD5-7, VS5-1, VS5-2, VS5-3), the nine routed edits (VK5-1, VK5-2, VD5-3, VD5-4, VD5-5, NR5-1, NR5-2, NP5-2, NP5-4) and
the canon's 22 conflict rulings for this part. Byte count of the part: **420 616 → 277 970 (66.1 %)**; the full
judgment calls (115 805 bytes) left for the rationale file, which also holds the history and every other part's longer
inline reasoning (279 KB). CONFIRMED (executed): the document checks (0 unreviewed), the pointer check, the table check,
the number and identifier survival checks and the id counts of §7; PLAUSIBLE: that the compressed prose keeps every
meaning (one full read by me, no second reader).

## 1. Sizes

| section (file) | bytes before → after | lines before → after | what changed |
|---|---|---|---|
| title block (`01-title.md`) | 2 130 → 1 608 | 25 → 18 | one consolidation banner; revision and lane lines → §0.1 and the rationale file |
| one-page summary (`02-summary.md`) | 8 405 → 5 977 | 80 → 63 | rewritten true to the whole design; canonical figures only |
| §0 Provenance (`03-s0-provenance.md`) | 17 934 → 3 468 | 190 → 38 | 0.1 kept in brief; 0.4 → **0.2**, 0.5 → **0.3**; 0.2, 0.3, 0.6–0.11 → rationale Part B |
| PART I heading (`04-part-i.md`) | 93 → 92 | 2 → 1 | the `---` separator now ends §0's file |
| §1 (`05-s1-scope.md`) | 32 340 → 27 413 | 214 → 172 | §1.1's model column and budget restatements → §12.3 / §12.5 / §12.9; §1.5–§1.6 pointers; §1.4 two canon fixes |
| §13 (`06-s13-testing.md`) | 89 129 → 82 150 | 749 → 684 | 10 MOVE IN tests and 5 routed fixtures added; restated budgets and determinism tests → pointers |
| §14 (`07-s14-modules.md`) | 24 281 → 20 390 | 196 → 173 | interface copies → pointers (R12); `Stage` keeps only its own fields; `LabelRows` added |
| §15 (`08-s15-matrices.md`) | 44 586 → 41 278 | 240 → 232 | rows point to their homes; O3 (d), O9 (c), O12 (g), O16 (c), O19 per the canon |
| §16 (`09-s16-build-plan.md`) | 35 187 → 31 854 | 110 → 85 | VS5-1, VD5-7, M0 (b) detail; round narration → rationale Part E.3 |
| §17 (`10-s17-clean-room.md`) | 22 630 → 19 556 | 223 → 194 | VS5-3; calibration history → rationale Part E.4 |
| Delegated decisions (`11-delegated-decisions.md`) | 20 910 → 14 557 | 47 → 175 | one short paragraph per decision, numbers pointing to their homes; the pre-pass table verbatim in rationale Part D |
| Judgment calls (`12-judgment-calls-index.md`) | 115 805 → 24 467 | 296 → 286 | an index: id, one-line choice, where the rule lives (276 rows); the full rows → rationale Part A |
| Staged (`13-staged.md`) | 4 033 → 3 802 | 24 → 20 | the one staged list (SCOPE-C11); history sentence → rationale Part E.7 |
| Appendix A (`14-appendix-a.md`) | 3 153 → 1 358 | 37 → 15 | A.3 kept; A.1, A.2, A.4, A.5 → rationale Part C |
| **total** | **420 616 → 277 970 (66.1 %)** | **2 433 → 2 156** | |
| `docs/ARCHITECTURE-RATIONALE.md` (new) | — → 279 481 | — | Parts A–F (below) |

The part lands at 66 %, at the top of the pass's "about 55–65 %" target: most of what stays is tests, matrices and
build-plan rows that are this part's own facts, and nothing was cut to reach a number.

## 2. Files written

* `docs/validation/consistency/new/scope/01-title.md` … `14-appendix-a.md` — each starts with its section's heading line
  exactly as today (`04-part-i.md` is the PART I heading alone); the assembler places them in number order at the
  positions of today's title block, summary, §0, PART I heading, §1, §13–§17 (before PART II), and Delegated decisions,
  Judgment calls, Staged and Appendix A (after PART III).
* `docs/ARCHITECTURE-RATIONALE.md` — title, banner, one-paragraph preface; **Part A** the 269 judgment-call rows
  verbatim plus the canon's 7 new rows (J-K36, J-DET-52 – J-DET-54, J-P50, J-R55, J-R56, text from the archived
  document), 7 rows amended by conflict rulings and marked; **Part B** former §0.1–§0.3, §0.6–§0.11 and the title
  block's revision and lane lines; **Part C** former Appendix A.1, A.2, A.4, A.5; **Part D** the delegated-decisions
  table as it stood; **Part E** the scope sections' removed rationale and history (E.1–E.7); **Part F** every other
  part's longer inline reasoning — F.1 §2 (extracted by me from the archived §2: 30 passages), F.2 §3, F.3 §4/§10/PART
  II–III, F.4 §5–§7, F.5 §8/§9/§11/§12 (the four companions `rewrite-{kernel,pipeline,determinism,rendering}` as each
  lane left it).
* `docs/validation/doc-checks-allow.tsv` — 39 reviewed hits appended under a dated `consistency/rewrite-scope` block
  (§7).
* This report.

## 3. Open items fixed

| item | where | how |
|---|---|---|
| **VS5-1** (M1's reader treats another output version as damage) | §16 M1 content and exit; J-S40 (rationale); J-I19 (rationale, consistency) | M1's reader: a saved town **of the running output version** is root-checked, a differing root regenerated from the recipe; **a document whose `outputVersion` is not the running one is never root-checked** — it opens as §2.9 step 2's frozen view, chunks checked by content hash, decoded for view and export only, labelled "made with oK; not verified by this version", with the offer to open its recipe under the running version and §6.4's preview notice; `frozenImport` arrives with M3a's rebases; the M2a clause says "an M1 document of the running output version". M1 exit adds "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message". The model companion (§2.9 step 5) is present in the model part's new text (l. 1169). |
| **VD5-7** (kept towns at M2a, link refusal at M3a) | §16 M2a content and exit; M3a content and exit | The item's first option: M2a builds §6.4's link rule — a link only when the base is the recipe, with its message — together with the keep; a rebased town, a kept saved town included, is offered as its `.plat` file. M2a's exit gains "a `keptSnapshot`-rebased town's link refused, its `.plat` file offered"; M3a keeps the pack and host-content refusals and no longer lists the kept-town case. |
| **VS5-2** (`area` names no fabric) | §13.6 (2); `D5Pair` NG comment; J-S34 (rationale) | "for `area`, the district's own `bent-cut` fabric opened as a `refine` close-up — no `setAttr`, its building count the city-LOD count (II.1, II.4); for `street`, `square` and `ring`, `setAttr(district.fabric, template)`, a `replace` close-up"; the same mapping in the `D5Pair` comment and J-S34. The II.2 companion is the pipeline part's. |
| **VS5-3** (§17.1 (4) says two files) | §17.1 (4); D-29 | The item's sentence verbatim: three committed files — `ftg-captures.json` and `ng-counts.json`, numbers only, which `plat d5 seeds` reads and nothing else, and the sitting's `record.json`, which the milestone record and the release notes read; D-29 points to §17.1 (4). |
| VK5-1 (routed) | §13.1 indexes | the `drawBoundary` regroup fixture (B's partitions rebuilt before A's; each plot once, before and after A's rebuild) |
| VK5-2 (routed) | §13.1 carves | the F-REDERIVE fixture of a deck whose bank vertex carries a width knot (unpinned, knot kept) |
| VD5-3, VD5-4, VD5-5 (routed) | §13.2 B-EDIT | the frozen-fixture naming import; the `drawBoundary` save/reload with no corrupt cache; the epoch-grown Adjust during load verification with no records mismatch |
| NR5-1, NR5-2 (routed) | §14 | the `TileRasterOpts`, `TileBackend`, `RasterJob`, `VectorBackend`, `TileAddress`, `LabelPlacer` and `PlacementJob` copies → pointers to §8.9 / §9.2; `LabelRows` (and the label-row tables the rendering part declares with it) added to `@plat/model` and to the dependency rule |
| NP5-2 (routed) | J-I18 (rationale) | S5b's extra-bridge batch added to the L0 `deck_end` writers (canon ruling CF-PIPE-10) |
| NP5-4 (routed) | §14 | checked: §14 holds no copy of the composition types (only the pointer "BuildingGenerator … is §2.6's"), so nothing to rename |

## 4. Conflicts resolved (the 22 the canon assigns to this part)

| conflict | resolution in the new text |
|---|---|
| SCOPE-C01 model time against MFCG | §13.5's generation-time row keeps its bar and points to §12.9 for the matched-count ratios; D-18 points to §12.9 (no rounding); §1.1 points to §12.3 / §12.5 / §12.9 |
| SCOPE-C02 (VS5-3) | §17.1 (4) rewritten; D-29 points to it |
| SCOPE-C03 campaign bound | §13.2 alone states the executed counts; §15.2 O9 (c) points to §13.2; J-S4 amended |
| SCOPE-C04 scripted tasks | §15.2 O16 (c) says "the scripted tasks of §13.4" with no list |
| SCOPE-C06 (VS5-1) | as §3 |
| SCOPE-C07 (VD5-7) | as §3 |
| SCOPE-C09 plot width | INVALID per canon (floor vs bar); no change |
| SCOPE-C10 CityJSON | §0.6 left the normative text (rationale Part B) |
| SCOPE-C11 staged list | one list in *Staged*, stage 2 "built in this program at M5 (§16), after the base"; §1.1, §16 and the summary point to it |
| KERNEL-C01 (= SCOPE-C05) Clipper2 | §1.7, §14 `@plat/testkit`, §16 riskiest items, §17.4 and D-14 point to §3.7 and restate neither half |
| KERNEL-C06, KERNEL-C12 | J-K6 amended (per district plus one outside; §3.3's three rebuild moments) |
| CF-PIPE-02 | §14 `Stage<I, O>` keeps `version`, `inputsOf`, `run` and points to §4.12's `StageDecl` |
| CF-PIPE-07 (= SCOPE-C08; VS5-2) | as §3 |
| CF-PIPE-10 (NP5-2) | J-I18 amended |
| DETERMINISM-C-2 | J-DET-20 amended (`reroll.maxAdvance`, default 3); the index row says so |
| MODEL-C03 (NP5-4) | no copy in §14 (checked) |
| RENDERING-C01 (NR5-2) | §14 pointer; `LabelRows` in `@plat/model` |
| RENDERING-C02 (NR5-1) | §14 pointer to §8.9 |
| CANON-C03 frames | §1.1 gives the area and the side at the default aspect 1, pointing to §3.2 (9) |
| CANON-C08 key components | §1.4's determinism row and D-15 point to §6.1 |
| CANON-C09 FTG entrance | §1.4 reads "≈ 3 m from the road (C9; 2.99 m measured, §13.5)" |
| CANON-C10 delivery bars | D-9 points to §13.5 |

## 5. Decisions taken in this rewrite (vetoable; Fable-reviewed 2026-09-26 — verdict in docs/validation/consistency/SUMMARY.md)

1. **§0 renumbered**: 0.1 (built from, in brief), **0.2** = former 0.4 (the seven late owner rules), **0.3** = former
   0.5 (evidence discipline). No other part cites a §0 subsection (grep of all new part files: 0 hits); the title block
   now points to §0.3.
2. **Fix-record tags removed** from this part's normative text (VS*, VD*, VK*, VP*, NP*, NR*, NF-S*, N-*, IMP-*, SCL-*,
   LC-*, DEF-*, COV-*, MFP-*, FTG-*, "round N", "X-S1"); kept: `NF-P5` and `NF-P6` (invariant names), acceptance ids
   (O, R, S letters), D and J ids, graft ids where they label a row (G-R1, G-R4), evidence citations (critic and finding
   files, capture READMEs, bench receipts). Subsection headings are unchanged, their tags included. This matches the
   determinism part; the kernel part kept its tags — see cross-part note 1.
3. **Delegated decisions as paragraphs** (choice, rejected alternative, cost to reverse), each number pointing to its
   home (D-9, D-12, D-14, D-15, D-18, D-19, D-29, D-33); the plain-words rationale moved with the full pre-pass table to
   rationale Part D.
4. **VD5-7's first option** (build the link rule with the keep at M2a) over the second (no links for edited or rebased
   towns until M3a), because it closes the failure and keeps links for towns whose base is the recipe.
5. **The §13.3 preview notice text stays in §13.3.** The canon marked SCOPE-238 a restatement of §6.4, but the
   determinism part's new §6.4 says "the app shows the preview notice of §13.3", so §13.3 is now the notice's only
   statement; dropping it would have lost the text.
6. **`@plat/model` lists `LabelTable`, `StringTable`, `GeomTable` and `LabelRows`**, following the rendering part's
   NR5-2 implementation (§8.1 declares the label-row tables in `@plat/model` beside `LabelRows`).
7. **Union on merge (R13)** applied at my homes: §13.1 gains "self-touching" inputs, "no self-intersecting output, no
   undeclared sliver", the oracle harness's "reports both shares" and "0 crashes on the 1 000 holed polygons"; §13.2's
   wealth sweep "on ≥ 95 % of seeds"; the naming-input fixtures gain DETERMINISM-259's cases (listed in the fate report
   and stored in the event, 0 duplicate ids, 0 silent re-binds, a re-sited bridge keeps its new name, an `editTable` of
   one grammar row, quarter names byte-identical); "§2.6's test" gains MODEL-282's stage-3 intake run; §1.1 gains
   PIPELINE-055's "a rung without a population takes the rung's target".
8. **The judgment index** has a third column, the section that states the rule, so a reader can go from the index to
   the rule without the rationale file.
9. **The model part's inline reasoning** (it kept no companion file) was extracted by script from the archived §2 into
   rationale Part F.1, so every part's longer reasoning is kept verbatim somewhere.
10. **RULING-1 untouched**: §17.3 and D-22 keep the proprietary default; the owner's stated GPL-3 intent
    (`docs/OWNER-INSTRUCTIONS-2026-09-25.md`) is for the owner (see cross-part note 7).

## 6. Cross-part notes (other parts' canonical text; not edited here)

1. **All parts / the Assemble seat — tag style.** The kernel part kept its fix-record tags; the determinism part and this
   part removed them from the normative text (decision 2). The validator should make the document consistent one way.
2. **Assemble — rationale Part F.** F.2–F.5 copy the kernel, pipeline, determinism and rendering companions as they
   stood at 07:09, after each lane had written them (rendering's companion last changed at 07:02; its lane logged
   LANDED at 07:07). If a companion changes afterwards, the Assemble seat refreshes that subsection from its file; F.1
   (the model part) is my own extraction from the archived §2 and needs no refresh.
3. **Assemble — placement.** `01`–`05` go at the head (title, summary, §0, PART I heading, §1); `06`–`10` after §12;
   `11`–`14` after PART III. `03-s0-provenance.md` ends with the `---` that used to precede PART I.
4. **determinism §6.4.** Its "the preview notice of §13.3" now resolves: §13.3 states the notice text (decision 5).
5. **pipeline §4.2 S3 / §4.8, §2.3, §3.2 (2), §8.4, §2.6, §7.6** — D-19 now points to these for its values (the gate law,
   terrain resolution, minimum edge and attraction, plot width and angle, the fixed sun, heights, calibratable rows);
   each must keep stating its value. The gate law is at the pipeline part's §4.2 S3 (checked).
6. **rendering §12.3 / §12.5 / §12.9** hold every figure the summary, §1.1, §15.2 (O3 (d), O12 (g)), §16 and D-18 now
   point to (≈ 4 500 / 17 700 / 58 800 people for the model bars, ≈ 14 200 buildings ≈ 48 000 people and ≈ 2.3 s at the
   cap for the first map, the matched-count ratios); they must stay there. The rendering suggestion R-3 (move II.4's road
   programs into §8.2) would also move the target of §15.1's NG E3 pointer "(the road programs II.4 adds)".
7. **Owner / validator.** (a) RULING-1: the owner's GPL-3 intent against §17.3 / D-22's proprietary default — an owner
   decision, unchanged here. (b) §0.2 lands the seven rules of `docs/AMENDMENTS-2026-09-25.md`; the evening rules of
   `docs/AMENDMENTS-2026-09-25b.md` await the amendment pass (`workflows/04-amendments.js`), which will add their landings.
   (c) GAP-1 and GAP-2 of the canon are not this part's.
8. **Rationale Part A row J-18** cites "§0.3" for the relay call — that is the former §0.3, now rationale Part B, while
   the document's new §0.3 is evidence discipline; the row is verbatim history and was not amended.
9. **model §2.6** — "§2.6's test" is stated in §13.2 under exactly that name (the model part's note 15).
10. **rendering §8.3** — its census row "stamp-tile seams" restates the seam check the canon homes in §13.2 (SCOPE-181:
    0 point pairs closer than r₀ across all 256 2 × 2 arrangements, every band's rank subset); §13.2 keeps it and
    points to §8.3 / §8.10 for the asset. The validator may reduce §8.3's row to a pointer or accept the census exception
    (R9); the values agree.

## 7. Verification (executed receipts)

* **Document checks** — `python3 docs/validation/bench/doc_checks.py --doc <the 14 files concatenated> --heads <every
  part's new files concatenated>`: first run C1 1 / 0 unreviewed, C2 0, C3 114 / 38, C4 2 / 1, S1 0, S2 0; the 39 new
  hits (pointer-number runs, citation file names, creators' quotes under 15 words in pre-existing §1.4 text whose run
  boundaries moved, ordinary phrasing, one generic-vocabulary line) reviewed into `docs/validation/doc-checks-allow.tsv`;
  final run on the finished files: **C1 1 / 0, C2 0, C3 114 / 0, C4 2 / 0, S1 0, S2 0, exit 0** (28 s).
* **Pointers** — every `§n` / `§n.m` in the 14 files and in rationale Part A resolves to one of the 131 headings of the
  new part files (script: 0 unresolved).
* **Tables** — every table row in the 14 files and in the rationale file has its header's cell count, counting only
  unescaped pipes (script: 0 hits).
* **Numbers** — every digit group of the 506 home items' inventory statements and values is present in the new text
  except in 21 items, each accounted for: moved to the rationale file with its history (SCOPE-006, 038, 040, 215, 553,
  554), referenced to its canonical home as the canon rules (SCOPE-067, 068 → §12.3; 415 → §12.3; 425, 467 → §12.5;
  426 → §13.2; 527 → §12.3 / §12.5 / §12.9; 528 → §4.2 S3), removed tags or dates (SCOPE-273, 470), or formatting
  artefacts of the check ("20,20" vs "(20, 20)"; 32 817 = 32 768 + 49; 144 = 12 × 3 × 4; SCOPE-124, 137, 212, 221,
  404).
* **Identifiers** — every backticked identifier of the old sections (outside code fences) is present in the new text,
  in the rationale file or at its home in another part; the three found only in the removed §14 registration paragraph
  (`SeamEdge.type`, `SettingPack.rosterPatch`, `SkyStrategy.place`) are declared at II.1, §10.4 and II.6 (grep).
* **Ids** — the judgment index has 276 rows (269 + 7 new) and rationale Part A 276 rows (asserted by the build script);
  the mapping below has all 839 records of `inventory-scope.json` (828 SCOPE ids + 11 conflict records); the 10 MOVE IN
  facts are listed separately.
* **Headings** — every file starts with its section's heading line byte-identical to today's; the subsection headings
  of §1 and §13–§17 are unchanged; §0's are renumbered (decision 1).
* PLAUSIBLE (reasoning only): meaning-level equivalence of the compressed prose; the accuracy of the one-line index
  entries against their rows (written by me from the rows).

## 8. Mapping table

**MOVE IN** (facts other parts stated, now stated here):

| inventory id | fact | new home |
|---|---|---|
| MODEL-274 | heights acceptance (100 %; 0 wings off the datum rule on hilly goldens and after terrain strokes) | §13.2 *Stage property tests* |
| MODEL-339 | the 20-epoch heap ≤ 1.3 × and document ≤ 2 × test (M4) | §13.2 *B-EDIT* (and §13.8 milestone tier, §16 M4) |
| MODEL-354 | the entity-registry path test | §13.2 *Document tests* |
| MODEL-430 | export → import → export byte-identical over the canonical form (O9 a, O11 c) | §13.2 *Document tests* |
| KERNEL-129 | callback-form issue-order determinism (two runs, slot renumbering, pool sizes 0–3) | §13.2 *Stage contract tests* — op-order determinism |
| KERNEL-131 | the slot-renumbering property test | §13.1 *Properties* |
| KERNEL-282 | the slide fixture (`warp` with `fromLevel = 1` over a street ending on a shore) | §13.1 *attraction and moves* |
| KERNEL-343 | the straight-skeleton M0 fixtures | §13.1 *straight-skeleton fixtures (M0)* |
| KERNEL-363 | save → load → save byte-identical, loaded arena passing every hard invariant | §13.1 *Properties* |
| PIPELINE-228 | M0 (b) re-measures NG's signature on curved, round-joined, triangular, C-shaped and holed faces before calibration | §16 M0 content (b) |

**Every inventory id of this part** — "state" = the fact is stated at the new location; "referenced to §x (FACT)" =
a restatement of another home, now a pointer; "section restatement" / "summary" = a line that paraphrases a section and
now points to it; "rationale" = the passage is in `docs/ARCHITECTURE-RATIONALE.md` (row id given) with an index row in
the document; "history" = moved verbatim to the rationale file, dropped from the normative text; "conflict" = a conflict
record, resolved in §4.

| id | kind | canon action | statement (inventory, abridged) | new location |
|---|---|---|---|---|
| SCOPE-001 | defined-term | state | PLAT is the codename (a plat is a cadastral plan of plots, the single spatial truth of the… | title block (codename; placeholder per D-19) |
| SCOPE-002 | rule | state | Document layout: every major section opens with an "In plain words" paragraph; PART I is t… | title block — *How to read this file* |
| SCOPE-003 | rule | state | Evidence discipline: findings tags [STATED]/[SHOWN]/[INFERRED] are carried through citatio… | title block (the evidence tags) and §0.3 / Appendix A (CONFIRMED vs PLAUSIBLE) |
| SCOPE-004 | history | drop-history | Revision banner: revised in fix-all rounds 1–5 (2026-09-25/26) by five area drafts and one… | history — moved verbatim to rationale file Part B (former title block); pointer to ARCHITECTURE-VALIDATION.md in the title block |
| SCOPE-005 | history | state | Lane ARCHITECTURE (chief architect Fable 5.1), workflow 03 run wf_e306f20c-a9f, 2026-09-25… | §0.1 (the lane, run and base in one sentence); verbatim in rationale Part B (former title block) |
| SCOPE-006 | marker | state | Per-section "> PENDING FABLE REVIEW" banners in this part (title, summary, §0.4, §0.7–§0.1… | title block — the single consolidation banner; all 133 per-section banners removed |
| SCOPE-007 | rule | reference-section | Product: one program draws medieval towns and cities at three rungs — town, city, metropol… | summary (plain-words paraphrase; its section is §1.1) |
| SCOPE-008 | rule | reference-section | Stage plan: stage 2 opens any district as a detailed neighbourhood; stage 3 composes each … | summary (plain-words paraphrase; its section is §1) |
| SCOPE-009 | restatement | reference-section | Ground: a real heightfield in metres with water flowing downhill, so rivers always reach t… | summary (plain-words paraphrase; its section is §4.2) |
| SCOPE-010 | restatement | reference-section | Demand before streets: from the requested population, our own tables compute counts of hou… | summary (plain-words paraphrase; its section is §4.2) |
| SCOPE-011 | restatement | reference-section | Big decisions first: market, castle and large precincts reserved; main roads to gates solv… | summary (plain-words paraphrase; its section is §4.2) |
| SCOPE-012 | restatement | reference-section | A strip along every wall is kept free of houses and lanes by construction. | summary (plain-words paraphrase; its section is §4.8) |
| SCOPE-013 | restatement | reference-section | Streets: main roads routed over terrain between real destinations (gates, market, bridges,… | summary (plain-words paraphrase; its section is §4.3) |
| SCOPE-014 | restatement | reference-section | Districts are groups of blocks named for their market, gate, harbour or castle, shaped by … | summary (plain-words paraphrase; its section is §4.5) |
| SCOPE-015 | restatement | reference-section | Plots: every block is divided from its frontage into parcels whose width and depth follow … | summary (plain-words paraphrase; its section is §4.7) |
| SCOPE-016 | restatement | reference-section | Buildings: each plot gets a site plan (row house with party walls, manor set back behind a… | summary (plain-words paraphrase; its section is §2.6) |
| SCOPE-017 | restatement | reference-section | Then towers, castle, bridges, harbour, fields and woods sized to the population, greenery … | summary (plain-words paraphrase; its section is §4.9) |
| SCOPE-018 | restatement | reference-section | One display list renders the ink look (default, MFCG family), a textured lit look (FTG-lik… | summary (plain-words paraphrase; its section is §8) |
| SCOPE-019 | restatement | reference-section | Exports: SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; a large print is made in the … | summary (plain-words paraphrase; its section is §11.1) |
| SCOPE-020 | restatement | reference-section | First picture is always the finished city map, never a rough preview: under 1 s for every … | summary (plain-words paraphrase; its section is §12.5) |
| SCOPE-021 | restatement | reference-section | Model build meets the improvement plan's speed bars in 19 runs of 20 for towns up to ~4 50… | summary (plain-words paraphrase; its section is §12.3) |
| SCOPE-022 | restatement | reference-section | At city zoom neighbouring districts are labelled together as named quarters, as many as MF… | summary (plain-words paraphrase; its section is §9.4) |
| SCOPE-023 | restatement | reference-section | Everything is editable: every element and every rule table; edits are an event list on per… | summary (plain-words paraphrase; its section is §7.1) |
| SCOPE-024 | restatement | reference-section | Moving a river or digging a canal lays main roads across new bridges and cuts lesser stree… | summary (plain-words paraphrase; its section is §7.3) |
| SCOPE-025 | restatement | reference-section | The warp brush carries every building outline and roof wing with the ground. | summary (plain-words paraphrase; its section is §2.6) |
| SCOPE-026 | restatement | reference-section | Naming under edits: a rebuilt bridge or street keeps its name; choosing a name list or edi… | summary (plain-words paraphrase; its section is §6.3) |
| SCOPE-027 | restatement | reference-section | Saved-town load: editable as soon as a sub-second fingerprint check of its saved copy pass… | summary (plain-words paraphrase; its section is §2.9) |
| SCOPE-028 | restatement | reference-section | A town made by a program version the browser no longer keeps opens for viewing only, label… | summary (plain-words paraphrase; its section is §2.9) |
| SCOPE-029 | restatement | reference-section | A town kept from its saved copy is shared as its file, never as a link, because a link onl… | summary (plain-words paraphrase; its section is §6.4) |
| SCOPE-030 | restatement | reference-section | Undo works the same when several people share a town and after the file is closed and reop… | summary (plain-words paraphrase; its section is §7.4) |
| SCOPE-031 | restatement | reference-section | The same seed gives the same town on every machine; adding a decoration or name kind, re-r… | summary (plain-words paraphrase; its section is §6) |
| SCOPE-032 | restatement | reference-section | No whole-map retry: every step that can fail has a short bounded fallback ladder, and the … | summary (plain-words paraphrase; its section is §5) |
| SCOPE-033 | restatement | reference-section | The riskiest part (grown streets and bent-cut lanes fitting within the speed budget) is me… | summary (plain-words paraphrase; its section is §16) |
| SCOPE-034 | restatement | reference-section | Every acceptance number states whether it checks a rule was followed, compares with a meas… | summary (plain-words paraphrase; its section is §13) |
| SCOPE-035 | restatement | reference-section | The first product milestone is a viewable town for the owner's eye; editing comes directly… | summary (plain-words paraphrase; its section is §16) |
| SCOPE-036 | restatement | reference-section | Programmers work from this document and a cleaned research digest, never from references' … | summary (plain-words paraphrase; its section is §17) |
| SCOPE-037 | restatement | reference-section | Later by the owner's roadmap, with hooks built now: neighbourhood close-ups, manor-style b… | summary (plain-words paraphrase; its section is Staged) |
| SCOPE-038 | history | state | Panel scores of the three proposals: kernel 84/83/77, pipeline 76/81/76, product 71/86/72 … | §0.1 (base proposal, grafts G-P1–G-P17 / G-R1–G-R15, repairs K-1–K-6, judging.md §3–§4); the panel scores → rationale Part B (former §0.1) |
| SCOPE-039 | rule | state | This file is one design, not a concatenation: every mechanism appears once, under the sect… | §0.1 (one design, not a concatenation) |
| SCOPE-040 | history | state | Reading record: the three proposals and three judge reports read in full; IMPROVEMENTS.md … | Appendix A reading-record paragraph (summary); verbatim in rationale Part B (former §0.2) |
| SCOPE-041 | history | drop-history | The harness relayed the owner's message as "what's going on?"; the seat answered the statu… | history — rationale file (verbatim) |
| SCOPE-042 | mapping | state | Owner rule 1 (greenery by prosperity) lands in §4.9 S12b rule table (prosperity field and … | §0.2 |
| SCOPE-043 | mapping | state | Owner rule 2 (floating islands, a toggle staged by the owner) lands in §2.7 SkyIsland (own… | §0.2 |
| SCOPE-044 | mapping | state | Owner rule 3 (heights for shadows) lands in §2.6 (heights and ground datum on every buildi… | §0.2 |
| SCOPE-045 | mapping | state | Owner rule 4 (size ladders) lands in §1.1 (both ladders; RungProfile table: population ban… | §0.2 |
| SCOPE-046 | mapping | state | Owner rule 5 (everything editable) lands in §7.1 (clause map, edit-target table, registry … | §0.2 |
| SCOPE-047 | mapping | state | Owner rule 6 (prosperity a gradient and a band) lands in §4.5 (field, drivers, bands only … | §0.2 |
| SCOPE-048 | mapping | state | Owner rule 7 (adopted defaults) lands in D-1–D-7, each clause tied to its mechanism: ink d… | §0.2 |
| SCOPE-049 | defined-term | state | CONFIRMED = an executed measurement or a quotation verified at source by the cited lane; P… | §0.3 |
| SCOPE-050 | rule | state | Reference numbers used as calibration targets (FTG's 10.3 m quad side, NG's corner at 0.5 … | §0.3 |
| SCOPE-051 | rule | state | Where the corpus leaves a mechanism unknown (C13's bend-placement law, FTG's district scor… | §0.3 |
| SCOPE-052 | history | drop-history | Completion record: synthesis seat wrote to §15 (checkpoint 13:26 EDT), then §16, §17, PART… | history — rationale file (verbatim) |
| SCOPE-053 | rule | state | The owner's seven adopted defaults are D-1–D-7, each stated as FINAL. | §0.2 row 7 ("D-1–D-7, each FINAL") and the Delegated decisions preface |
| SCOPE-054 | history | drop-history | Fix-all round 1 (2026-09-25): 299 master-list items (seven red-team lenses, four coverage … | history — rationale file (verbatim) |
| SCOPE-055 | history | drop-history | Fix-all round 2: 99 items (kernel 24, determinism 16, pipeline 18, rendering 27, scope 14)… | history — rationale file (verbatim) |
| SCOPE-056 | history | drop-history | Fix-all round 3: 55 new defects (6 major, 49 minor) plus R3-P1; drafts kernel 9, determini… | history — rationale file (verbatim) |
| SCOPE-057 | history | drop-history | Fix-all round 4: 39 new defects (5 major, 34 minor) plus K4-1, S4-1, S4-2 and VS2-8's amen… | history — rationale file (verbatim) |
| SCOPE-058 | history | drop-history | Fix-all round 5: round-4 items 43 of 43 accepted; 35 new defects (1 major, 34 minor) plus … | history — rationale file (verbatim) |
| SCOPE-059 | restatement | state | Effort estimate: 153–204 expert person-weeks (raised from 150–200 because components added… | §16 effort table total and D-20 (153–204 pw); the "raised from 150–200" history → rationale Part B (former §0.11) |
| SCOPE-060 | rule | state | The base is one generator making towns, cities and metropolises with one click, at parity … | §1 (plain words) |
| SCOPE-061 | rule | state | Stage table: STAGE 1 base (TOWN → CITY → METROPOLIS; MFCG + FTG fusion plus O1–O19: plot m… | §1.1 |
| SCOPE-062 | rule | state | Two ladders: town/city TOWN → CITY → METROPOLIS; village THORP → HAMLET → VILLAGE; they me… | §1.1 |
| SCOPE-063 | rule | state | Size within a rung follows population: the requested population picks the rung whose band … | §1.1 |
| SCOPE-064 | rule | state | All three rungs generate from M1 (a rung is a ladder.json row on one pipeline, not a separ… | §1.1 |
| SCOPE-065 | interface | state | RungProfile (one row per rung in ladder.json in @plat/tables; versioned, calibratable (§7.… | §1.1 |
| SCOPE-066 | number | state | Rung table, TOWN: band 1 500–10 000 (target 5 000); 1 200–1 500 buildings at target; frame… | §1.1 rung table, TOWN row (frame as area + side at aspect 1, CANON-C03); its model p95 cell referenced to §12.3 (SCOPE-C01) |
| SCOPE-067 | number | state | Rung table, CITY: band 10 000–30 000 (target 20 000); 4 500–6 000 buildings; frame 25 km² … | §1.1 rung table, CITY row (frame per CANON-C03); model p95 cell referenced to §12.3 (SCOPE-C01) |
| SCOPE-068 | number | state | Rung table, METROPOLIS: band 30 000–120 000 (target 50 000); 12 000–15 000 buildings; fram… | §1.1 rung table, METROPOLIS row (frame per CANON-C03); model p95 cell referenced to §12.3 (SCOPE-C01) |
| SCOPE-069 | budget | state | Model-time laws by building count B (p95): TOWN ≤ 20 ms + 60 µs × B; CITY ≤ 40 ms + 50 µs … | referenced to §12.3 (RENDERING-502); pointer in §1.1 |
| SCOPE-070 | budget | state | O3 (d) bars 100 ms / 300 ms / 1 s hold for p95 up to ≈ 1 333 / 5 200 / 17 300 buildings (≈… | referenced to §12.3 (RENDERING-504); pointer in §1.1 |
| SCOPE-071 | budget | state | First-map laws (§12.5): under 1 s for every TOWN and CITY and for METROPOLIS up to ≈ 14 20… | referenced to §12.5 (RENDERING-538); pointer in §1.1 |
| SCOPE-072 | rule | reference-section | The rung stage rows are §4.2 S2's (MFCG's measured 0.87–0.92 of buildings inside the outer… | section restatement → §4.2; pointer in §1.1 |
| SCOPE-073 | decision | rationale | Chose modest per-rung granularity and greenery modifiers (wider/deeper plots and more priv… | rationale file Part A row J-S13 (+ Part E.1 verbatim); the rule and "(J-S13)" stay in §1.1 *The rung modifiers* |
| SCOPE-074 | acceptance-bar | state | Confirmation at M2b on B-CITY: the modest band's median frontage orders TOWN > CITY > METR… | §1.1 |
| SCOPE-075 | rule | state | Pre-decided fallback: if a rung-modifier ordering fails, the modifier's distance from 1 is… | §1.1 |
| SCOPE-076 | interface | state | LadderRouter.route(population) → { product: base \| village, rung }: below 1 500 routes to… | §1.1 |
| SCOPE-077 | rule | state | One-click default: generate({seed}) → a TOWN of 5 000 people whose complete city band (eve… | §1.2 |
| SCOPE-078 | rule | state | The first paint is the finished city picture, never a partial preview (§8.5). | referenced to §8.5 (RENDERING-194); pointer in §1.2 |
| SCOPE-079 | rule | state | Defaults: ink style with MFCG's raised under-copy on and the projected shadow off; walls o… | §1.2 |
| SCOPE-080 | rule | state | Every improvement ships behind the defaults (R8): the fast path never pays for the simulat… | §1.2 |
| SCOPE-081 | mechanism | state | Thesis: the references' admitted weaknesses are geometry weaknesses on plain vertex arrays… | §1.3 |
| SCOPE-082 | decision | state | Fusion allocation: FTG's staged destination-driven growth for streets; MFCG/NG's bent-cut … | §1.3 |
| SCOPE-083 | rule | state | Tiebreaker at every genuine conflict: the owner's DESIGN TIEBREAKER — the approach more fa… | §1.4 |
| SCOPE-084 | decision | state | Site row (TB): new O1 — heightfield in metres plus hydrology; rivers by descent; coasts/la… | §1.4 |
| SCOPE-085 | decision | state | Units row (TB): adopt FTG's convention — integer centimetres centred on (0,0), +y north; M… | §1.4 |
| SCOPE-086 | decision | state | Centre and destinations row (TB): MFCG's idea on FTG's substrate — named destinations (mar… | §1.4 |
| SCOPE-087 | decision | state | Secondary streets row (TB): by regime — inside walls S5 grows only district-scale secondar… | §1.4 |
| SCOPE-088 | decision | state | Districts row (partial TB): MFCG's grower over FTG's objects — groups of coarse skeleton f… | §1.4 |
| SCOPE-089 | decision | state | Block fabric row (no TB): NG's bent cut with the measured signature (start at N(0.5, σ) of… | §1.4 |
| SCOPE-090 | decision | state | Blocks → plots row (TB, burgage plots from the frontage): new O5/O18 — per-frontage region… | §1.4 |
| SCOPE-091 | decision | state | Buildings row (TB, owner ruling): the owner's plot model — parcel with 0..n footprints and… | §1.4 buildings row (FTG entrance ≈ 3 m, 2.99 m measured → §13.5, CANON-C09) |
| SCOPE-092 | decision | state | Walls, gates, castle row (TB): FTG staging + MFCG gate identity and wall-first order — gat… | §1.4 |
| SCOPE-093 | decision | state | Hinterland row (TB): FTG's contract + O14 — land use sized to population, field systems as… | §1.4 |
| SCOPE-094 | decision | state | Content row (TB): FTG's guarantee, two-way — sequential prefix-stable roster from our own … | §1.4 |
| SCOPE-095 | decision | state | Determinism row: O2 — 128-bit-keyed sub-streams per (stage, entity lineage, concern, rerol… | §1.4 determinism row (key components → §6.1, CANON-C08) |
| SCOPE-096 | decision | state | Rendering row: one semantic display list with LOD and paint programs on one drawing path (… | §1.4 |
| SCOPE-097 | decision | state | Editing row: FTG's graph editing on our plat + MFCG's warp kernels (8 in MFCG), all as eve… | §1.4 |
| SCOPE-098 | decision | state | Labels row: MFCG's spines made hole-aware and collision-checked, quarter labels at city zo… | §1.4 |
| SCOPE-099 | decision | state | Failure-policy row: MFCG's tiers minus the restart tier — typed results, bounded ladders, … | §1.4 |
| SCOPE-100 | rule | state | Genuinely new mechanisms replacing both references: site model (O1), plat kernel (O3), fro… | §1.4 |
| SCOPE-101 | decision | state | Fused layout: grown arterials with partitioned blocks and a partition seeded from a grown … | §1.4 |
| SCOPE-102 | test | state | Fusion gate O4 (f) guards the risk that road-first plus block subdivision "seems problemat… | §1.4 |
| SCOPE-103 | mechanism | state | Epoch: a logged event that runs one more growth stage on the persisted plat: boundary from… | referenced to §4.11 (PIPELINE-327); pointer in §1.5 |
| SCOPE-104 | rule | reference-section | Everything that survives an epoch changes only through explicit logged transformation even… | section restatement → §4.11; pointer in §1.5 |
| SCOPE-105 | rule | state | The evolution engine that schedules epochs from circumstances is staged by the owner; its … | referenced to §4.11 (PIPELINE-355); pointer in §1.5 |
| SCOPE-106 | rule | reference-section | Stage 2 in brief: a district is a group of skeleton faces whose boundary edges are typed (… | section restatement → II.1; pointer in §1.6 |
| SCOPE-107 | rule | reference-section | Village in brief: needs a one-road backbone with partial driveways, detached-in-yard and f… | section restatement → PART III; pointer in §1.6 |
| SCOPE-108 | decision | state | Language: TypeScript (strict), ES2022 modules, no DOM in model packages — browser-first em… | §1.7 |
| SCOPE-109 | decision | state | Runtime targets: browser main-thread UI, one generation worker, a derivation pool of up to… | §1.7 |
| SCOPE-110 | decision | state | Numeric core: integer centimetres in Int32Array arenas; exact orient2d in doubles under a … | §1.7 numeric-core row (Clipper2 shipping → §3.7, KERNEL-C01) |
| SCOPE-111 | decision | state | Rendering backends: Canvas2D is the reference backend of every preset including lit, with … | §1.7 |
| SCOPE-112 | decision | state | Text: Canvas2D glyphs from bundled OFL fonts composed onto tiles in the tile worker (§8.8–… | §1.7 |
| SCOPE-113 | decision | state | Build and test tooling: pnpm workspaces monorepo, tsc project references, esbuild for libr… | §1.7 |
| SCOPE-114 | decision | state | Data: rule tables, presets, style sheets and rung profiles (ladder.json) as versioned JSON… | §1.7 |
| SCOPE-115 | decision | state | Persistence: a self-contained .plat document (JSON manifest + binary blocks); no hosted se… | §1.7 |
| SCOPE-116 | rule | state | Repository: the product lives in its own repository plat/ at the root of this folder, outs… | §1.7 repository row (path rule → §17.1 (3)) |
| SCOPE-117 | rule | state | Dependencies: permissive licences only, checked over the transitive production closure, pi… | §1.7 |
| SCOPE-118 | rule | state | Five test benches run in CI in three tiers — quick on every change (minutes), full nightly… | §13 (plain words) |
| SCOPE-119 | acceptance-bar | state | Every kernel primitive is fuzzed with two input families (random and constructive degenera… | §13.1 |
| SCOPE-120 | test | state | Random inputs (fast-check): concave, holed, thin, near-collinear, snapped, duplicated-vert… | §13.1 |
| SCOPE-121 | rule | state | Constructive degeneracies (GEO-12) are built on purpose from random parameters because ran… | §13.1 |
| SCOPE-122 | test | state | Degeneracy fixtures (geometry classes): lattice points exactly on a segment by gcd steppin… | §13.1 |
| SCOPE-123 | test | state | Quantisation fixtures: half-centimetre ties before snapping and ± (2²³ − 1) must be handle… | §13.1 |
| SCOPE-124 | test | state | Attraction/move/kept-content fixtures (GEO-3, GEO-5, GEO-35, VK-1–VK-18): vertex at (20, 2… | §13.1 |
| SCOPE-125 | test | state | Canal across a CITY district that cuts a lane (remainder pruned) and re-routes a primary: … | §13.1 |
| SCOPE-126 | test | state | Canal crossing a walled CITY's wall between two towers: no E_KEPT and no E_LEVEL; every fa… | §13.1 |
| SCOPE-127 | test | state | A carve chain touching a finer edge away from its prepared vertices returns E_LEVEL inside… | §13.1 |
| SCOPE-128 | test | state | A lane removed from a spine it ended on: the spine's chain restored exactly, its own shape… | §13.1 |
| SCOPE-129 | test | state | II.1 (3) neighbour step beside finished plots: a plot-line end within attractCm of the foo… | §13.1 |
| SCOPE-130 | test | state | An S8 T-junction on a spine with a width profile leaves every sampled half-width unchanged… | §13.1 |
| SCOPE-131 | test | state | A pool overlay writing outside its district is refused with E_SCOPE. | §13.1 |
| SCOPE-132 | test | state | A logged moveVertex replayed after an upgrade that puts an unrelated vertex 20 cm from its… | §13.1 |
| SCOPE-133 | test | state | A slot freed and reused inside a stage: the query returns the new item. | §13.1 |
| SCOPE-134 | test | state | A pooled district beside the settlement perimeter commits plot lines ending on the backlan… | §13.1 |
| SCOPE-135 | test | state | An L3 query in a block before and after S11 derives L4 there (two plots sharing their lowe… | §13.1 |
| SCOPE-136 | test | state | A warp over a spine carrying a same-level T-junction, then its lane removed: the junction … | §13.1 |
| SCOPE-137 | test | state | A warp moving a kerb beside a vertex 25.3 cm from it — kerb (0, 0)–(1 000, 9) past (517, 3… | §13.1 |
| SCOPE-138 | test | state | A warp over a locked plot and over a pinned building holds every corner (a neighbour's foo… | §13.1 |
| SCOPE-139 | test | state | A way split between two width knots keeps every sampled half-width within 10⁻⁹ cm of its p… | §13.1 |
| SCOPE-140 | test | state | The frozen copy sent to a pool worker holds typed arrays only — no Map or Set reachable fr… | §13.1 |
| SCOPE-141 | test | state | A canal across an open enceinte's glacis line and a river moved through a walled town: eve… | §13.1 |
| SCOPE-142 | test | state | II.1 (3)'s neighbour step at a plot-line end, then the street removed by a reroll (not an … | §13.1 |
| SCOPE-143 | test | state | A river moved away from a quay-lined and a walled bank: quay and wall edges back at L1, th… | §13.1 |
| SCOPE-144 | test | state | A warp re-seating two Steiner vertices whose projections lie within minEdge + 1 cm of each… | §13.1 |
| SCOPE-145 | test | state | A stretch of a way removed between two junctions and a stretch of a ring removed between t… | §13.1 |
| SCOPE-146 | test | state | A promotion leaving another finer vertex 1.2 cm from its new route edge commits with no E_… | §13.1 |
| SCOPE-147 | test | state | Two neighbour steps on one kerb edge, the first street removed by a reroll: its plot-line … | §13.1 |
| SCOPE-148 | test | state | A warp that moves a spine's vertices around an unmoved same-level T-junction, then its lan… | §13.1 |
| SCOPE-149 | test | state | A warp with fromLevel = 1 over a generated and over an edited water gate: neither gate's b… | §13.1 |
| SCOPE-150 | test | state | After a neighbour step and its removal by a reroll with no partition rebuilt in between, l… | §13.1 |
| SCOPE-151 | test | state | A declared preparation batch placing two contact names on one entity, its ops permuted, gi… | §13.1 |
| SCOPE-152 | test | state | New water across a corner of the frame: the border's stretch between its two contact point… | §13.1 |
| SCOPE-153 | invariant | state | Properties checked after every operation (topology): output simple; nesting by index (ever… | §13.1 |
| SCOPE-154 | invariant | state | Properties (constructions): corridorUnion faces disjoint and covering; offset(−d) ∘ offset… | §13.1 |
| SCOPE-155 | test | state | Differential agreement with the CI oracles (Clipper2-WASM in Node, polygon-clipping) on bo… | §13.1 |
| SCOPE-156 | invariant | state | Properties (roles and batches): roles preserved on coincident chains (a sliver between a s… | §13.1 |
| SCOPE-157 | invariant | state | Properties (index and levels): every index query's answer identical before and after a reb… | §13.1 |
| SCOPE-158 | test | state | A 3 000 m relief fixture stores without a clamp and D8 is defined on 100 % of the hydrolog… | §13.1 |
| SCOPE-159 | test | state | Ladder coverage (G-R9): every rung of every ladder in §5.2 is reachable by a fixture; each… | §13.1 |
| SCOPE-160 | test | state | Invariants: the §5.3 suite runs by scope (batch-local per batch, stage-end per stage, save… | §13.2 *Invariants* |
| SCOPE-161 | test | state | Digest-maintenance oracle: on every B-CITY-lite city the Merkle digest maintained batch by… | referenced to §5.3 (DETERMINISM-119); pointer in §13.2 |
| SCOPE-162 | rule | state | Statistics core record (SCL-21): O(n), emitted by every generation within 4 ms at CITY (§1… | §13.2 |
| SCOPE-163 | rule | state | Bench metrics (detour index over sampled destination pairs, Moran's I, KS distances, junct… | §13.2 |
| SCOPE-164 | test | state | Cost-model tests (SCL-19; NF-S10): each stage timed on nine sizes — the band bottom, targe… | §13.2 *Cost-model tests* |
| SCOPE-165 | acceptance-bar | state | Each stage's log-log slope of time against its declared work measure (Stage work-limit law… | §13.2 *Cost-model tests* |
| SCOPE-166 | acceptance-bar | state | Work limits follow population: each run reports per stage the F-WORK hit rate (work cuts p… | §13.2 *Cost-model tests* |
| SCOPE-167 | acceptance-bar | state | Per-edit cost against model size: a fixed scope (one plot edit, one block reroll, one dist… | referenced to §12.6 (RENDERING-552); pointer in §13.2 |
| SCOPE-168 | test | state | Index work is fitted against commits × level size (§3.3). | §13.2 *Cost-model tests* |
| SCOPE-169 | test | state | Memory test per rung by §12.8's definition: on generated towns from M1 (TOWN, CITY) and M2… | referenced to §12.8 (RENDERING-594); pointer in §13.2 |
| SCOPE-170 | acceptance-bar | state | Document-size test per rung: ≤ 320 B per building at CITY (§2.9). | §13.2 *Document tests* |
| SCOPE-171 | acceptance-bar | state | Simulation module occupancy: one hour for 50 000 people ≤ 50 ms in the worker (§10.3, §12.… | referenced to §12.7 (RENDERING-578); pointer in §13.2 |
| SCOPE-172 | test | state | First map by size (N-2): B-CITY browser runs time the first map at the same nine sizes (TO… | referenced to §12.5 (RENDERING-539); pointer in §13.2 |
| SCOPE-173 | test | state | The same runs pan and zoom during an A2 300-dpi export of a CITY: every settle within §12.… | referenced to §12.7 (RENDERING-575); pointer in §13.2 |
| SCOPE-174 | acceptance-bar | state | Model max clause: every nightly B-CITY generation's model time ÷ its rung law at its own b… | referenced to §12.3 (RENDERING-513); pointer in §13.2 |
| SCOPE-175 | rule | state | Every gating timing (the sweeps, the first-map runs, §12.3's pool comparison and the re-ti… | referenced to §12.1 (RENDERING-488); pointer in §13.2 |
| SCOPE-176 | test | state | Stage contract tests (G-P10): the same inputs and stream give the same digest on Node x86 … | referenced to §6.5 (9) (DETERMINISM-291); pointer in §13.2 |
| SCOPE-177 | test | reference-section | §6.5's determinism tests run beside the contract tests: time dilation × 10 and × 0.1; the … | section restatement → §6.5; pointer in §13.2 |
| SCOPE-178 | test | state | S8's working block equals S9's committed block (Hausdorff 0; §3.7). | §13.2 *Stage contract tests* |
| SCOPE-179 | test | state | The per-stop placement digests of §13.3 are the contract test of S13b; a stop placed whole… | §13.2 *Stage contract tests* |
| SCOPE-180 | test | state | Stamp-tile asset: its tiles hash to their stored values in the generation worker and the t… | referenced to §8.3 (RENDERING-146); pointer in §13.2 |
| SCOPE-181 | acceptance-bar | state | Stamp-tile seam check: 0 point pairs closer than r₀ across cells in all 256 2 × 2 arrangem… | §13.2 *Stage contract tests* (seam check) |
| SCOPE-182 | test | state | View-data contracts: every shipped style sheet loads at every band through §8.2's slot res… | referenced to §8.3 (RENDERING-136); pointer in §13.2 |
| SCOPE-183 | test | state | Stage property tests (outlines, plots, roster): 10 000 coast / island / fjord / sky outlin… | §13.2 |
| SCOPE-184 | test | state | Stage property tests (models): stage-3 contract (union of composed wings equals the outlin… | §13.2 |
| SCOPE-185 | acceptance-bar | state | 0 E_KEPT on the one-click path over B-CITY (a stage whose domain overlaps an earlier stage… | §13.2 |
| SCOPE-186 | test | state | Wall trace fixtures: every gate and weld vertex on its trace; stage 1's trace within 40 m … | §13.2 |
| SCOPE-187 | test | state | The seam exception on New random of 20 districts per B-CITY-lite city (NF-P6). | §13.2 |
| SCOPE-188 | test | state | Union rule (composed wings = outline) on curved-street row fixtures with quad wings, inclu… | §13.2 |
| SCOPE-189 | acceptance-bar | state | Decks on 100 % of way–water crossings, moats and canals included (NF-P4). | §13.2 |
| SCOPE-190 | test | state | Harbour fixtures: a two-arm mole and a detached breakwater pass the crossing invariant as … | §13.2 |
| SCOPE-191 | test | state | Walled coastal harbour fixtures of §4.2 S3 (11) (harbour outside the stage-1 region, with … | §13.2 |
| SCOPE-192 | test | state | Crossing-site fixtures: a river town whose growth leaves crossing sites unused — 0 site fu… | §13.2 |
| SCOPE-193 | test | state | A canal across the settlement perimeter: 0 district faces outside the perimeter, the land … | §13.2 |
| SCOPE-194 | test | state | castle: 'on_enceinte' with water in reach, with and without a city moat: 0 trace–water cro… | §13.2 |
| SCOPE-195 | test | state | Every seam edge typed; a way-less shared reservation boundary typed reserve (II.5). | §13.2 |
| SCOPE-196 | rule | state | B-EDIT locality oracle: §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regener… | §13.2 *B-EDIT and the locality oracle* |
| SCOPE-197 | test | state | B-EDIT fixtures (structure): the re-parenting set (drawBoundary, district merge and split,… | §13.2 *B-EDIT* |
| SCOPE-198 | test | state | An epoch after 20 edits and a Re-derive from S10 after 20 edits, each at pool sizes 0 and … | §13.2 *B-EDIT* |
| SCOPE-199 | test | state | Undo and redo from several sessions with the truncation-identity property (§7.4, §6.5 (9))… | §13.2 *B-EDIT* |
| SCOPE-200 | test | state | Regenerate (keep settings) of a perimeter district, a walled district and the hinterland i… | referenced to §7.3 (7) (vi) (DETERMINISM-469); pointer in §13.2 |
| SCOPE-201 | test | state | Water edits: a river move across a street grid commits with decks and cuts and keeps every… | referenced to §7.3 (7) (v) (DETERMINISM-467); pointer in §13.2 |
| SCOPE-202 | test | state | Warps with kept items: a warp over a square keeping its fountain, over a yard keeping a us… | §13.2 *B-EDIT* |
| SCOPE-203 | test | state | §2.6's wing test: a warp and a moveVertex over a built block with an L house, an overlappi… | §13.2 *B-EDIT* ("§2.6's test", with the stage-3 intake run of MODEL-282) |
| SCOPE-204 | test | state | Truncation identity with a redo followed by a user-created entity (§7.4); undo after a rel… | referenced to §6.5 (9) (DETERMINISM-298); pointer in §13.2 |
| SCOPE-205 | test | state | Load-verification fixtures: an edit within 100 ms of the state becoming editable with a fo… | §13.2 *B-EDIT* — load verification |
| SCOPE-206 | test | state | Naming-record fixtures: a snapshot with one altered naming record is a corrupt cache when … | §13.2 *B-EDIT* — load verification |
| SCOPE-207 | test | state | Naming-input fixtures of §6.3: a selected user corpus and an edited naming row rename exac… | §13.2 *B-EDIT* — naming inputs (union with DETERMINISM-259) |
| SCOPE-208 | test | state | setAttr(name) + undo, lock + unlock and naming rerollLayer + undo around a corpus selectio… | referenced to §6.5 (9) (DETERMINISM-298); pointer in §13.2 |
| SCOPE-209 | test | state | A keptSnapshot-rebased CITY document upgraded across a test output version with a changed … | referenced to §6.5 (9) (DETERMINISM-300); pointer in §13.2 |
| SCOPE-210 | test | state | A canal carved across a wall and a river move whose bank cuts a glacis line each commit wi… | §13.2 *B-EDIT* |
| SCOPE-211 | test | state | The thirteen MFCG asks of §7.4 as scripted scenarios (IMP-16), each reporting its locality… | referenced to §7.4 MFCG asks (DETERMINISM-524); pointer in §13.2 |
| SCOPE-212 | test | state | Faithfulness campaign (O9 c; §7.3 item 7 (iv)): New random judged by a nightly campaign, n… | §13.2 *The faithfulness campaign* |
| SCOPE-213 | algorithm-step | state | Campaign statistic: for each of four statistics (median plot area, median frontage width, … | §13.2 *The faithfulness campaign* |
| SCOPE-214 | budget | state | Campaign cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and d… | §13.2 *The faithfulness campaign* |
| SCOPE-215 | evidence | state | Why 800 scopes: with statistics correlated at ρ = 0.8, 400 scopes catch a +0.25 sd bias in… | §13.2 *The faithfulness campaign* — Calibration (executed, n = 800 results); the n = 400 comparison and verifier re-run → rationale Part E.2 |
| SCOPE-216 | rule | state | A failing statistic's histogram names the fault: a hump is too snug, a U too loose, a slop… | §13.2 *The faithfulness campaign* |
| SCOPE-217 | rule | state | A failed campaign is re-run once with the next campaign seed (a perfect regenerator fails … | §13.2 *The faithfulness campaign* |
| SCOPE-218 | test | state | Control sweeps: §7.8's statistical monotonicity and continuity at 21 steps × 50 seeds at T… | §13.2 |
| SCOPE-219 | test | state | Option-interaction matrix: every pair of toggles rendered and diffed; no option silently d… | §13.2 |
| SCOPE-220 | acceptance-bar | state | Documentation coverage (COV-FTG-A25): 100 % of controls and entity kinds have a guide anch… | §13.2 |
| SCOPE-221 | test | state | Golden suite: 12 seeds × {TOWN, CITY, METROPOLIS} × the four WaterSettings {none, coast, r… | §13.3 |
| SCOPE-222 | rule | state | Declared-shift protocol: a release either matches or declares a shift record for every sta… | §13.3 |
| SCOPE-223 | acceptance-bar | state | An undeclared move fails CI; a declared statistic moving against its declared direction fa… | §13.3 |
| SCOPE-224 | rule | state | The records are product files (NF-S1): everything the golden gate and the release-notes ge… | §13.3 |
| SCOPE-225 | type | state | WaterSetting = none \| coast \| river \| coast+river — the one spelling of a water setting… | §13.3 |
| SCOPE-226 | interface | state | ShiftRecord: id; release (generator version); outputVersion (the o<k> it creates, null for… | §13.3 |
| SCOPE-227 | interface | state | CascadeRecord: id; outputVersion; upstream (ShiftRecord ids); downstream[] {stage, before,… | §13.3 |
| SCOPE-228 | interface | state | MilestoneRecord: milestone; date; outputVersions[] (created during the milestone); shifts[… | §13.3 |
| SCOPE-229 | rule | state | Golden store layout: plat/goldens/store/o<k>/ holds per seed and stage the frozen upstream… | §13.3 |
| SCOPE-230 | rule | state | The golden CLI refuses a record with a missing field; the @plat/docs release-notes generat… | §13.3 |
| SCOPE-231 | rule | state | docs/validation/shifts/<milestone>.md and docs/validation/d5/<milestone>.md are research-s… | §13.3 |
| SCOPE-232 | test | state | Placement digests (N-24; §9.1's cross-engine promise): for every golden town, every shippe… | §13.3 |
| SCOPE-233 | rule | state | Placement arithmetic uses only + − × ÷, Math.sqrt and dmath on the fonts' integer metrics … | referenced to §6.5 (3) (DETERMINISM-282); pointer in §13.3 |
| SCOPE-234 | test | state | The PR tier compares placement digests on Node x86 against the store; the nightly tier com… | §13.3 |
| SCOPE-235 | rule | state | View shift: a placement digest that moves while every model digest holds needs a ShiftReco… | §13.3 |
| SCOPE-236 | rule | state | Stamp-tile hashes (§8.10) are kept with the placement digests; an asset release moving a s… | §13.3 |
| SCOPE-237 | rule | state | From M1 (LC-19): the output-version stamp, the shift, cascade and milestone records and th… | §13.3 |
| SCOPE-238 | rule | state | Preview links: until M4's exit fixes output version 1, every permalink and document made b… | referenced to §6.4 (DETERMINISM-263); pointer in §13.3 |
| SCOPE-239 | rule | state | Retention of output versions N−1 and N−2 (§6.4) is built and its replay test passes at M3a… | §13.3 |
| SCOPE-240 | test | state | Nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on… | §13.3 |
| SCOPE-241 | test | state | Visual regression: Playwright renders the golden suite per preset, LOD and backend; SSIM /… | §13.4 |
| SCOPE-242 | test | state | B-ZOOM (1:50 000 → 1:500, the default view of every rung): legibility floors; no feature p… | §13.4 |
| SCOPE-243 | test | state | B-ZOOM label checks (§9.4): floors; every node of the city cut (min(N_q, number of distric… | referenced to §9.4 (RENDERING-380); pointer in §13.4 |
| SCOPE-244 | test | state | B-ZOOM draw checks: the draw-order census (logged (slot, pass) sequence non-decreasing, §8… | referenced to §8.3 (RENDERING-132); pointer in §13.4 |
| SCOPE-245 | acceptance-bar | state | Role continuity by family and milestone (VIS-9; N-23): §8.2's rule — every shipped family … | referenced to §8.2 (RENDERING-107); pointer in §13.4 |
| SCOPE-246 | test | state | App harness scripted tasks (O16 c; IMP-11) on the reference machine of §12.1: share a view… | §13.4 |
| SCOPE-247 | acceptance-bar | state | Accessibility (COV-FTG-A24): axe-core on every screen and panel of @plat/app reports 0 ser… | §13.4 |
| SCOPE-248 | test | state | Input scheme: every binding of the default keymap.json (§14) fires its action while the ma… | §13.4 |
| SCOPE-249 | rule | state | The parity CLI in @plat/testkit reads only baselines.json (our own numbers-only measuremen… | §13.5 |
| SCOPE-250 | interface | state | Baseline: id; metric; unit; reference: MFCG \| FTG \| NG \| VG \| corpus:<name> (corpus ro… | §13.5 |
| SCOPE-251 | interface | state | ParityReport (written per run by the parity CLI; read by milestone exits, §13.9's Calibrat… | §13.5 |
| SCOPE-252 | rule | state | Each milestone's parity report is stored as plat/goldens/parity/<milestone>.json and named… | §13.5 |
| SCOPE-253 | rule | state | The CLI refuses a baseline row without referenceBuild, capture, script or date; a new refe… | §13.5 |
| SCOPE-254 | rule | state | ⟨M-1⟩ rule (NF-S5): a reference number marked ⟨M-1⟩ is measured by M-1 (§16 lists them); i… | §13.5 |
| SCOPE-255 | rule | state | Band rule (DEF-1; IMP-6): target rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the… | §13.5 |
| SCOPE-256 | rule | state | When M-1 re-measures a baseline (five seeds per matched MFCG size, FTG's new captures) the… | §13.5 |
| SCOPE-257 | rule | state | Matched sizes (MN-2): TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BI… | §13.5 |
| SCOPE-258 | rule | state | Curves (FTG-15) are measured after both sides are resampled at a 10 m arc-length step, so … | §13.5 |
| SCOPE-259 | acceptance-bar | state | Street turning (P): weakness vs FTG (zero mass above 15° per step, flat heading spectrum):… | §13.5 table |
| SCOPE-260 | acceptance-bar | state | Growth drift (C): net turn of grown streets over 600 m in organic regimes: p50 15–30°, > 9… | §13.5 table |
| SCOPE-261 | acceptance-bar | state | Junction arm angles and degrees (P), every L1 junction: median 85–95°; p5 ≥ 30°; 4-way sha… | §13.5 table |
| SCOPE-262 | acceptance-bar | state | Street runs by class (P): junction-to-junction run lengths per class (never edge lengths) … | §13.5 table |
| SCOPE-263 | acceptance-bar | state | MFCG street signature (MFP-2; P, walled districts, band rule): lot-orientation coherence R… | §13.5 table |
| SCOPE-264 | acceptance-bar | state | Blocks (P): L2 built-block areas per district — KS by the band rule against NG block count… | §13.5 table |
| SCOPE-265 | acceptance-bar | state | Deep block interiors (IMP-8; P): court share of deep blocks per band by the band rule per … | §13.5 table |
| SCOPE-266 | acceptance-bar | state | Bent-cut signature (P) against NG (start at N(0.5, σ) of OBB major axis, σ 0.066 plain and… | §13.5 table |
| SCOPE-267 | acceptance-bar | state | Figure-ground and streetwall (MFP-1, IMP-4; O): street-edge recoverability ≥ MFCG − 0.03 (… | §13.5 table |
| SCOPE-268 | acceptance-bar | state | Plots and footprints (P): ordinary houses median footprint 60–160 m², p95 < 400 m², a shea… | §13.5 table |
| SCOPE-269 | acceptance-bar | state | Entrance rule (P, L4): 100 % on the access edge, 2–4 m (FTG: on the outline, 2.99 m from t… | §13.5 table |
| SCOPE-270 | acceptance-bar | state | Party walls and attachment (P, row classes): attached ≥ 90 % in dense/poor; party-wall sha… | §13.5 table |
| SCOPE-271 | acceptance-bar | state | Plot-area gradient (C / O): Spearman(prosperity, plot area) ≥ 0.8; Moran's I > 0 (both fol… | §13.5 table |
| SCOPE-272 | acceptance-bar | state | Alleys (C): alley length per ha by prosperity, Spearman ≤ −0.7 (FTG 0 alley length at ever… | §13.5 table |
| SCOPE-273 | acceptance-bar | state | Vacancy runs (COV-VG-VN-170; C): share of frontage length in vacancy runs per band within … | §13.5 table |
| SCOPE-274 | acceptance-bar | state | Quays and substitution (C): quays reachable from the network 100 %; blocks left as substit… | §13.5 table |
| SCOPE-275 | acceptance-bar | state | Walled share and ribbons (MFP-6; P, band rule): buildings inside the outermost wall and ex… | §13.5 table |
| SCOPE-276 | acceptance-bar | state | MFCG anchors (MFP-8; P, band rule; castle in band on ≥ 99 % of seeds): district areas (MFC… | §13.5 table |
| SCOPE-277 | acceptance-bar | state | Outline anisotropy (FTG-5; P): land-sector r90 CV and road / non-road r90 ratio by the ban… | §13.5 table |
| SCOPE-278 | acceptance-bar | state | Block-level use mix (MFP-7; O): residential-only block share, per-block use-mix entropy an… | §13.5 table |
| SCOPE-279 | acceptance-bar | state | Towers and gates (P, S7): tower spacing by the band rule (FTG 39 m median, 17/17 towers on… | §13.5 table |
| SCOPE-280 | acceptance-bar | state | Water (P, L0): outline step ≤ 25 m; width band by class (FTG 50 m resampling, rivers ≈ 31 … | §13.5 table |
| SCOPE-281 | acceptance-bar | state | Tree scatter (O): NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported (F… | §13.5 table |
| SCOPE-282 | acceptance-bar | state | Population and buildings (C): requested population within ± 5 % on ≥ 95 % of seeds; the pe… | §13.5 table |
| SCOPE-283 | acceptance-bar | state | Generation time (MN-2, MFP-5; P): §12.3/§12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY… | §13.5 table |
| SCOPE-284 | acceptance-bar | state | MFCG-worst configurations (IMP-5; O): wall-clock p95 per delivered town, ladder costs incl… | §13.5 table |
| SCOPE-285 | acceptance-bar | state | Requested-feature delivery (IMP-5; O): tier-6 omissions of requested features 0; degraded … | §13.5 table |
| SCOPE-286 | acceptance-bar | state | Ladder use (C): tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts. | §13.5 table |
| SCOPE-287 | acceptance-bar | state | Draw style (IMP-15, VIS-16; P): ink — casing law on 100 % of ribbons, round joins ≥ 99.9 %… | §13.5 table |
| SCOPE-288 | acceptance-bar | state | Labels (O): protected overlaps 0; inside-area share ≥ 99 %; curvature within §13.7's limit… | §13.5 table |
| SCOPE-289 | acceptance-bar | state | Between-seed variety (IMP-12; O): dispersion of the §7.7 signature vector (radial share of… | §13.5 table |
| SCOPE-290 | defined-term | state | "Mastered" = the owner's eye on side-by-sides against MFCG and FTG at town, city and metro… | §13.6 |
| SCOPE-291 | rule | state | When: M1 (diagnostic — recorded, not gating; covers all three rungs), M2b (gates "the base… | §13.6 (1) |
| SCOPE-292 | rule | state | Seeds fixed before rendering: every pair's seeds come from a formula and are committed bef… | §13.6 (2) |
| SCOPE-293 | defined-term | state | H32(s) = the first 32-bit output word (h1) of MurmurHash3 x86 128-bit (the algorithm §6.2'… | §13.6 (2) |
| SCOPE-294 | interface | state | plat d5 seeds ⟨milestone⟩ (product CLI) writes the milestone's pair list (one D5Pair per p… | §13.6 (2) |
| SCOPE-295 | rule | state | Against MFCG (M1, M2b, M4): five pairs per rung and per water setting (none; coast+river),… | §13.6 (2) |
| SCOPE-296 | rule | state | Against FTG (M1, M2b, M4; TOWN and CITY, METROPOLIS per D-31): FTG cannot be seeded, so on… | §13.6 (2) |
| SCOPE-297 | rule | state | At each FTG milestone the research-side panel script writes plat/goldens/d5/⟨milestone⟩/ft… | §13.6 (2) |
| SCOPE-298 | rule | state | FTG capture fallback: a capture whose payload yields no resident count takes its size's no… | §13.6 (2) |
| SCOPE-299 | rule | state | Against NG (M5): NG is seedable (MINSTD), so five pairs per NG template for the four templ… | §13.6 (2) |
| SCOPE-300 | algorithm-step | state | NG pair PLAT side: one district of a PLAT town opened with the same template at neighbourh… | §13.6 (2) |
| SCOPE-301 | rule | state | NG search fallback: a pair with no district within ± 20 % after k = 31 takes the nearest-c… | §13.6 (2) |
| SCOPE-302 | rule | state | Matched pairs: each MFCG/FTG pair shows PLAT and one reference at the same rung, ground sc… | §13.6 (3) |
| SCOPE-303 | rule | state | Looks per reference: PLAT draws ink against MFCG's default style, lit against FTG's defaul… | §13.6 (3) |
| SCOPE-304 | rule | state | Blind order: generator-identifying furniture (titles, legends, compasses, interface chrome… | §13.6 (4) |
| SCOPE-305 | rule | state | Rubric: three questions per pair, each answered left, right or same with an optional one-l… | §13.6 (5) |
| SCOPE-306 | acceptance-bar | state | Pass rule: per reference and question PLAT judged better or same on ≥ ⌈2n/3⌉ of that refer… | §13.6 (6) |
| SCOPE-307 | rule | state | Rater and unrated panel (NF-S2): the owner is the declared rater, no seat rates on the own… | §13.6 (7) |
| SCOPE-308 | rule | state | The same panel (same seeds, re-rendered under the current output version) is offered again… | §13.6 (7) |
| SCOPE-309 | rule | state | Threshold panel: at the same sitting the owner sees §13.7's strips (one seed at a threshol… | §13.6 (8) |
| SCOPE-310 | rule | state | house pick: from M4 the sitting also shows the three candidate house sheets drafted at M3b… | §13.6 (8) |
| SCOPE-311 | rule | state | Record and clean room (NF-S1): the panel is assembled research-side (research/d5/) from PN… | §13.6 (9) |
| SCOPE-312 | type | state | D5Status = diagnostic (M1) \| passed \| failed \| accepted (failure or unrated panel accep… | §13.6 (9) |
| SCOPE-313 | type | state | D5Pair (one per pair in seeds.json and the record, in (2)'s order): MFCG {rung, water: non… | §13.6 (9) |
| SCOPE-314 | type | state | FtgCapture = {capture, rung: TOWN \| CITY, water, population (decoded residents or nominal… | §13.6 (9) |
| SCOPE-315 | interface | state | D5Record (plat/goldens/d5/<milestone>/record.json): milestone; status; date; offeredAgainA… | §13.6 (9) |
| SCOPE-316 | rule | state | The research-side docs/validation/d5/⟨milestone⟩.md (human-readable, with reference image … | §13.6 (9) |
| SCOPE-317 | rule | state | Every threshold is in exactly one of two classes: reference-settable bands (§13.5, set by … | §13.7 |
| SCOPE-318 | rule | state | J-T, the calibration rule every table row and threshold cites (NF-S4): every value has a n… | §13.7 |
| SCOPE-319 | rule | state | Fallbacks that move a threshold (NF-S5): a fallback may change a mechanism (table value, w… | §13.7 |
| SCOPE-320 | acceptance-bar | state | O18 (i) smooth field: p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field out… | §13.7 table |
| SCOPE-321 | acceptance-bar | state | O18 (j) plot-size variety: within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plo… | §13.7 table |
| SCOPE-322 | acceptance-bar | state | O18 (h), O7 (f), S3 soft seams: across soft seams Δ median frontage ≤ 25 %, Δ median plot … | §13.7 table |
| SCOPE-323 | acceptance-bar | state | O19 (d) canopy: tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard… | §13.7 table |
| SCOPE-324 | acceptance-bar | state | O19 (g) city-zoom greenery: every green face ≥ 0.3 ha drawn at the city band with a short … | §13.7 table |
| SCOPE-325 | acceptance-bar | state | O12 (a) legibility floors: minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.… | §13.7 table |
| SCOPE-326 | acceptance-bar | state | O13 (a) label curvature: a label's spine turns ≤ 45° over any window of the label's length… | §13.7 table |
| SCOPE-327 | acceptance-bar | state | O13 (c) name–feature consistency: a name referencing a feature type has that feature withi… | §13.7 table |
| SCOPE-328 | acceptance-bar | state | O7 (b) water-dependent trades within 100 m of water; M2b; fallback: the placement score's … | §13.7 table |
| SCOPE-329 | acceptance-bar | state | O14 (b) farmsteads: every farmstead within 300 m of one of its own fields and within 1 500… | §13.7 table |
| SCOPE-330 | acceptance-bar | state | O14 (c) wood edges: edge straightness (chord ÷ path over 200 m windows) median ≤ 0.90; can… | §13.7 table |
| SCOPE-331 | acceptance-bar | state | O14 (e) built / map area: settlement-perimeter area ÷ frame area (without margin) within 0… | §13.7 table |
| SCOPE-332 | acceptance-bar | state | Block-level use mix (MFP-7): residential-only blocks ≤ 60 % in core districts; per-block u… | §13.7 table |
| SCOPE-333 | acceptance-bar | state | Requested features (IMP-5): degraded delivery (tiers 4–5) on ≤ 5 % of requested features; … | §13.7 table |
| SCOPE-334 | acceptance-bar | state | O16 (c) scripted tasks: one UI action where a reference needs a detour; recovery = one und… | §13.7 table |
| SCOPE-335 | acceptance-bar | state | O2 (c) carry-over: edited entities kept or carried ≥ 95 % for local actions and re-derivat… | §13.7 table |
| SCOPE-336 | acceptance-bar | state | S4 (d) square area (stage 2): typed squares (market, church forecourt, well square, bridge… | §13.7 table |
| SCOPE-337 | rule | state | Realism against real towns is measured by the corpus phase (§13.9), staged by the owner af… | §13.7 |
| SCOPE-338 | budget | state | Full verification rig ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the … | §13.8 |
| SCOPE-339 | budget | state | PR tier (every change, ≤ 15 min on 8 cores): lint (determinism allowlist, units, dependenc… | §13.8 |
| SCOPE-340 | budget | state | Nightly tier (≤ 4 h on 16 cores): B-CITY 1 000 seeds × 4 water × 3 rungs with the invarian… | §13.8 |
| SCOPE-341 | rule | state | Timing phase: last and alone on the nightly runner (§12.1; ≤ 20 min): cost-model sweeps (n… | referenced to §12.1 (RENDERING-489); pointer in §13.8 |
| SCOPE-342 | budget | state | Milestone tier (every milestone exit and weekly; ≤ 12 h on 16 cores): B-EDIT 10⁵ sequences… | §13.8 |
| SCOPE-343 | rule | state | A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with over bu… | §13.8 |
| SCOPE-344 | rule | state | Corpus calibration is staged by the owner after the standalone generators (base, neighbour… | §13.9 |
| SCOPE-345 | interface | state | CorpusAdapter {id, version, maps(): AsyncIterable<CorpusMap>} (written in the owner's stag… | §13.9 |
| SCOPE-346 | algorithm-step | state | Calibration steps: (1) parity code computes every §13.5 metric on the adapter's maps resea… | §13.9 |
| SCOPE-347 | rule | state | Packages have one-way dependencies: the kernel knows nothing about towns, the model nothin… | §14 (plain words) |
| SCOPE-348 | interface | state | @plat/kernel: lattice, predicates, one arena per layer with the five levels as views (§2.2… | §14 packages |
| SCOPE-349 | interface | state | @plat/model: schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-… | §14 packages |
| SCOPE-350 | interface | state | @plat/tables: rule tables, presets, style sheets, rung profiles (ladder.json, §1.1), work-… | §14 packages |
| SCOPE-351 | interface | state | @plat/site: S1 terrain, hydrology, coast/lake/island outline routine, rivers by descent, i… | §14 packages |
| SCOPE-352 | interface | state | @plat/content: S2 sequential roster, demand, government and religion rows, S7b/S10a alloca… | §14 packages |
| SCOPE-353 | interface | state | @plat/layout: S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, … | §14 packages |
| SCOPE-354 | interface | state | @plat/plots: S10 granularity law, per-frontage regions, joins/splits/alleys, boundary trea… | §14 packages |
| SCOPE-355 | interface | state | @plat/hood (stage 2, built after the base): RingFabric / SquareFabric / StreetFabric and t… | §14 packages |
| SCOPE-356 | interface | state | @plat/labels: S13a names (every node of the quarter tree), candidates and spines; S13b vie… | §14 packages |
| SCOPE-357 | interface | state | @plat/render: S14 columnar display-list builder, paint programs, style sheets, LOD, tile p… | §14 packages |
| SCOPE-358 | interface | state | @plat/edit: edit events, dry-run validation, undo and redo records, scoped regeneration, r… | §14 packages |
| SCOPE-359 | interface | state | @plat/export: geojson, svg, png/tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt),… | §14 packages |
| SCOPE-360 | interface | state | @plat/sim (optional, M4b): relation store materialised, postings, occupancy and schedules,… | §14 packages |
| SCOPE-361 | interface | state | @plat/api: the handle-based facade (§11.2), generation worker host, derivation pool, host … | §14 packages |
| SCOPE-362 | interface | state | @plat/docs: the user guide (generated reference pages from control, entity and table regis… | §14 packages |
| SCOPE-363 | interface | state | @plat/testkit: B-FUZZ generators (random and constructive), invariant runners, cost-model … | §14 packages |
| SCOPE-364 | restatement | reference-section | Stage registrations with changed declared I/O (definitions in §4.1–§4.12): S3 outputs gate… | section restatement → §4.1–§4.12 (one pointer sentence in §14) |
| SCOPE-365 | rule | state | Dependency order (lint-enforced): kernel ← model ← tables ← {site, content} ← layout ← plo… | §14 |
| SCOPE-366 | rule | state | Further dependency rules: docs reads only the registries of model and tables; hood depends… | §14 |
| SCOPE-367 | rule | state | Model packages obey the §6.5 allowlist lint, which also scans vendored dependency sources;… | referenced to §6.5 (3) (DETERMINISM-282); pointer in §14 |
| SCOPE-368 | rule | state | No import, fixture or script path may resolve outside plat/ (§17). | §14 |
| SCOPE-369 | interface | state | Stage<I, O> extends StageDecl (§4.12): version; lineageUnit: EntityKind (§6.3); workLimits… | §14 interfaces |
| SCOPE-370 | type | state | ConcernId = u16 branded number from the concern registry (§6.1), generated as typed consta… | §14 interfaces |
| SCOPE-371 | interface | state | StreamOpts {reroll (the derivation unit reroll, §6.1); attempt (ladder retry ≤ the concern… | §14 interfaces |
| SCOPE-372 | interface | state | StageContext {doc; plats: Record<PlatKey, Plat>; stream(concern, entity: Handle (entity ke… | §14 interfaces |
| SCOPE-373 | defined-term | state | TOWN_ROOT: the handle of the town itself as a derivation unit; its entity key is the seed … | referenced to §6.1 (DETERMINISM-139); pointer in §14 interfaces |
| SCOPE-374 | type | state | Scope = {kind: all} \| {kind: entities, ids} \| {kind: region, ring: Polygon, key: PlatKey… | §14 interfaces |
| SCOPE-375 | interface | state | StrategyRegistry: Maps for terrain, coast, river, manifest, network, enceinte, fabric, plo… | §14 interfaces |
| SCOPE-376 | interface | state | FabricStrategy.partition(district, seam: SeamContract, ctx: DistrictContext, sc, k) → Kern… | §14 interfaces |
| SCOPE-377 | interface | state | Kernel facade: plat(key); view(key, level): LevelView; resolve(ref: GeomRef, key); geom: G… | §14 interfaces |
| SCOPE-378 | interface | state | Rng.stream(entityKey: Hash128, stage: u16 (STAGE_VIEW = 0xffff for paint programs and furn… | §14 interfaces |
| SCOPE-379 | interface | state | ContentProvider (a host own roster or people; registered only after the §11.4 double-run c… | §14 interfaces |
| SCOPE-380 | interface | state | ObstacleSource (declared by labels, implemented by render): protectedExtents(stop, box) → … | §14 interfaces |
| SCOPE-381 | interface | state | LabelPlacer: begin(stop, labels: LabelEntity[], obstacles, roles, fonts: FontMetrics, memo… | referenced to §9.2 (RENDERING-346); pointer in §14 interfaces |
| SCOPE-382 | interface | state | Pointers: @plat/model — LabelEntity, QuarterNode (§9.1), LodBand, Role, ZoomStop (§8.1, §8… | §14 interfaces |
| SCOPE-383 | interface | state | TileAddress {stop, i, j, dpr}; TileRasterOpts {layers, tileLayer: base \| under \| shadow … | referenced to §8.9 (RENDERING-251); pointer in §14 interfaces |
| SCOPE-384 | interface | state | RasterJob: step(deadlineMs): boolean (runs on from where it stopped; returns after the fir… | referenced to §8.9 (RENDERING-252); pointer in §14 interfaces |
| SCOPE-385 | interface | state | EditEngine: apply(doc, e): ApplyResult (Ok \| Conflict(actions) \| Confirm(token, fates, r… | §14 interfaces |
| SCOPE-386 | interface | state | Exporter<Opts> {id; write(doc, list: DisplayList \| null, opts): Promise<Uint8Array \| str… | §14 interfaces |
| SCOPE-387 | rule | state | @plat/app, the reference UI: one click; the basic panel (≤ 12 controls, §7.8) and the adva… | §14 app |
| SCOPE-388 | interface | state | Input scheme (COV-MFCG-L08), MFCG idiom, held in keymap.json (data, editable, versioned): … | §14 app |
| SCOPE-389 | acceptance-bar | state | Accessibility (COV-FTG-A24): the app chrome meets WCAG 2.2 level AA; landmarks header (tit… | §14 app |
| SCOPE-390 | rule | state | Context help and guide (COV-FTG-A25): every control and panel links to its anchor in @plat… | §14 app |
| SCOPE-391 | rule | state | Family-tree view (COV-FTG-C11; module tier, M4b): reads query(h, {kind: relations, person,… | §14 app |
| SCOPE-392 | rule | state | Extension points: every Map in StrategyRegistry (stage 2 registers three template fabrics;… | §14 |
| SCOPE-393 | rule | state | Two checklists: the parity matrix (every capability recorded in the four references and wh… | §15 (plain words) |
| SCOPE-394 | defined-term | state | Parity tags: BASE (delivered by stage 1), STAGE-2 (delivered by the neighbourhood stage th… | §15.1 |
| SCOPE-395 | mapping | state | MFCG has 40 rows, all BASE. A1 parameter surface/blueprint/URL → §4.2 S0, §6.4 permalinks,… | §15.1 MFCG |
| SCOPE-396 | mapping | state | MFCG B1–B10: B1 patch mesh → replaced by the plat and backbone faces (§2.2, §4.3), Delauna… | §15.1 MFCG |
| SCOPE-397 | mapping | state | MFCG B11–B20: B11 block → lots → §4.7 S10 per-frontage plots + front jitter (ruling O5; st… | §15.1 MFCG |
| SCOPE-398 | mapping | state | MFCG C1–C3, D1–D3: C1 display modes → §8.5 LOD bands + plot model (Lots look = footprint m… | §15.1 MFCG |
| SCOPE-399 | mapping | state | MFCG E1–E4, F1–F3, G1–G2, H1–H2: E1 colour system → §8.2 roles, contrast matrix, per-entit… | §15.1 MFCG |
| SCOPE-400 | mapping | state | FTG has 46 rows + 9 audit rows, BASE unless noted. A1 parameters/presets/save → §4.2 S0, §… | §15.1 FTG |
| SCOPE-401 | mapping | state | FTG B rows: B1 size ladder/population/area → §1.1 ladder and rung profiles, §4.2 S2 stage … | §15.1 FTG |
| SCOPE-402 | mapping | state | FTG C1–C10: C1 coast/islands/ponds → §4.2 S1 closed-outline routine, bank classes (also sk… | §15.1 FTG |
| SCOPE-403 | mapping | state | FTG C11–C18 and audits: C11 walls/towers → §4.8; C12 castle district → §4.2 S3 + §4.8; C13… | §15.1 FTG |
| SCOPE-404 | mapping | state | FTG D–H rows: D1 renderer → §8.1 columnar display list + tile backends (hit-test slices); … | §15.1 FTG |
| SCOPE-405 | restatement | state | FTG H2 performance → §12 (beyond: client-side): first map under 1 s for every TOWN and CIT… | §15.1 FTG H2 row, figures referenced to §12.3 / §12.5 / D-18 |
| SCOPE-406 | mapping | state | NG has 31 rows, STAGE-2 unless the base delivers it. A1 tags/Settings/URL → PART II reques… | §15.1 NG |
| SCOPE-407 | mapping | state | NG C–H rows: C1 lots/setback/validation → §4.7 S10 (construction, 0 discards) (BASE); C2 b… | §15.1 NG |
| SCOPE-408 | mapping | state | VG has 44 rows, VILLAGE-LATER (not-precluded checks, hooks in PART III): G1, G20 tags → in… | §15.1 VG |
| SCOPE-409 | rule | state | All 44 VG rows are not precluded; the base pays for none beyond what it needs itself (the … | §15.1 VG |
| SCOPE-410 | defined-term | state | Acceptance-letter classes: [C] conformance (holds by construction once the rule is built; … | §15.2 |
| SCOPE-411 | rule | state | Every acceptance letter is stated in full in §15.2, stage-2 letters included (NF-S4); lett… | §15.2 |
| SCOPE-412 | rule | state | First-weighted improvements (D-7) and the evidence their own rules cannot fake (IMP-4): pl… | §15.2 |
| SCOPE-413 | acceptance-bar | state | O2 deterministic recipe (must; §6.1 keyed streams with concern registry, §6.3 addresses an… | §15.2 |
| SCOPE-414 | acceptance-bar | state | O6 metric units, furniture, statistics (must; §2.1 cm + unit lint, §1.1, §9.5, §13.2): (a)… | §15.2 |
| SCOPE-415 | acceptance-bar | state | O3 robust kernel, typed ladders, report (must; §3, §5): (a) B-FUZZ 0 crash/hang/invalid [O… | §15.2 O3 row (d): laws and knees referenced to §12.3 (bars kept) |
| SCOPE-416 | acceptance-bar | state | O11 schema, registry, exports, API (must; §2, §11, §14): (a) registry round-trip 100 % [C]… | §15.2 |
| SCOPE-417 | acceptance-bar | state | O1 terrain and hydrology first (must; §4.2 S1): (a) tier-6 omissions 0, degraded ≤ 5 % (§1… | §15.2 |
| SCOPE-418 | acceptance-bar | state | O4 two-tier street network (must; §4.3, §4.4, §4.6): (a) 100 % of through-roads reach dest… | §15.2 |
| SCOPE-419 | acceptance-bar | state | O5 frontage-first plots (must; §4.7 S10): (a) access edge 100 % [C]; (b) 0 plots < 3 m, we… | §15.2 |
| SCOPE-420 | acceptance-bar | state | O18 prosperity field + granularity law (must; §4.5, §4.7 S10, §4.6): (a) Spearman(prosperi… | §15.2 |
| SCOPE-421 | acceptance-bar | state | O17 plot model, site plans, heights (must; §2.5–§2.6, §4.7 S11, §8.4): (a) coverage within… | §15.2 |
| SCOPE-422 | acceptance-bar | state | O7 content-first land use (must; §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2): (a) every building … | §15.2 |
| SCOPE-423 | acceptance-bar | state | O19 greenery by prosperity (must; §4.9): (a) Spearman(prosperity, private green share) ≥ 0… | §15.2 O19 row: letters referenced to §4.9, classes kept |
| SCOPE-424 | acceptance-bar | state | O8 fortification network (must; §4.2 S3, §4.4, §4.8, §4.11): (a) gates at 100 % of arteria… | §15.2 |
| SCOPE-425 | acceptance-bar | state | O12 display list, LOD, style as data, layers (must; §8): (a) continuous zoom, footprint ha… | §15.2 O12 row (g): knee referenced to §12.5 |
| SCOPE-426 | acceptance-bar | state | O9 persistent document, locks, regeneration, undo (must; §2.9, §7): (a) save/load/save ide… | §15.2 O9 row (c): campaign bound referenced to §13.2 (SCOPE-C03) |
| SCOPE-427 | acceptance-bar | state | O16-core report and honest controls (must; §5.4, §7.1, §7.8): (a) report 100 %, the reques… | §15.2 |
| SCOPE-428 | acceptance-bar | state | O13-core labels and names (must; §9, §10.4): (a) 0 protected overlaps, 0 collisions, insid… | §15.2 |
| SCOPE-429 | acceptance-bar | state | O14-core hinterland and margin (must; §4.9): (a) farmland per capita ± 20 % [C]; (b) field… | §15.2 |
| SCOPE-430 | acceptance-bar | state | O10 intent, constraints, assignment, forms (should; input schema + drift bounds a must hoo… | §15.2 |
| SCOPE-431 | acceptance-bar | state | O13 full (should; §9): (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O]; (d) … | §15.2 |
| SCOPE-432 | acceptance-bar | state | O16 full (should; §7.8 S0–S4 proxy thumbnails, G-R4, @plat/app §14): (c) the scripted task… | §15.2 O16 full row (c): "the scripted tasks of §13.4" (SCOPE-C04) |
| SCOPE-433 | acceptance-bar | state | O12 extras (should; §8.2 relief tier, §8.8 tiled export, the low tier §12): as O12 (b), (e… | §15.2 |
| SCOPE-434 | acceptance-bar | state | Hooks 1–8 (§5.4; must): 1 addresses + sub-seeds (§6.3/§6.1); 2 lifecycle + edit log + incr… | §15.2 |
| SCOPE-435 | acceptance-bar | state | S1 boundary and seam contract (STAGE-2, must in base; §2.5 SeamContract from M1, §4.12, PA… | §15.2 |
| SCOPE-436 | acceptance-bar | state | S2 context features inside the neighbourhood (STAGE-2; II.1, II.3, §4.8, §4.4 intervallum)… | §15.2 |
| SCOPE-437 | acceptance-bar | state | S4 composable context templates, functional squares, landmark-centred neighbourhoods (STAG… | §15.2 |
| SCOPE-438 | acceptance-bar | state | S5 NG-class close-up render tier (STAGE-2; II.4, §8.2 hatched, §8.6, §8.4): (a) opening on… | §15.2 |
| SCOPE-439 | rule | state | Build order: measure what is still needed from the recordings and take small new captures … | §16 (plain words) |
| SCOPE-440 | budget | state | Effort total: about 153–204 expert person-weeks (PLAUSIBLE), for two implementers plus a v… | §16 preface (153–204 pw, 77–102 calendar weeks, staffing) |
| SCOPE-441 | rule | state | Every milestone ends on executed evidence, never intention; every exit writes its Mileston… | §16 |
| SCOPE-442 | rule | state | One rule for the owner's panel at every gating exit (NF-S2): M2b ("the base at parity"), M… | §16 preface — *The owner's panel at every gating exit* (rule itself §13.6 (7)) |
| SCOPE-443 | rule | state | M-1 content (calibration and clean-room inputs): CONFIDENCE §6 #5 FTG face recovery (block… | §16 M-1 |
| SCOPE-444 | acceptance-bar | state | M-1 exit (2–3 pw): every §13.5 baseline row present with provenance (or an unmeasurable ⟨M… | §16 M-1 |
| SCOPE-445 | rule | state | M0 content (risk retirement): (a) @plat/kernel — lattice, predicates, one arena per layer … | §16 M0 |
| SCOPE-446 | acceptance-bar | state | M0 exit (a) kernel (9–12 pw milestone): B-FUZZ 0 crashes/hangs/invalid on 10⁶ random input… | §16 M0 |
| SCOPE-447 | acceptance-bar | state | M0 exit (b) bent cut: start position σ within ± 0.02 of 0.066 (plain) and 0.098 (ring), co… | §16 M0 |
| SCOPE-448 | acceptance-bar | state | M0 exit (c) the fusion gate: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree… | §16 M0 |
| SCOPE-449 | acceptance-bar | state | M0 exit (d) determinism: digests identical on Node x86 / arm64, Chromium, Firefox, WebKit,… | §16 M0 |
| SCOPE-450 | rule | state | M1 content (first product milestone): S0–S11 with row / detached / hovel site plans and he… | §16 M1 |
| SCOPE-451 | rule | state | M1 builds the .plat writer and reader for generated towns (§2.9, §3.9): manifest, content-… | §16 M1 content (the `.plat` reader), amended by VS5-1 |
| SCOPE-452 | rule | state | M1 named work items (IMP-2): the M1 content authored fresh — roster rows for the M1 classe… | §16 M1 |
| SCOPE-453 | acceptance-bar | state | M1 exit (35–46 pw milestone), part 1: the D-5 protocol's first run (diagnostic) with its t… | §16 M1 |
| SCOPE-454 | acceptance-bar | state | M1 exit part 2 (performance): model within §12.3 at TOWN and CITY with the pool measuremen… | §16 M1 |
| SCOPE-455 | acceptance-bar | state | M1 exit part 3 (rendering and labels): the label-composition measurement (§8.9); figure-gr… | §16 M1 |
| SCOPE-456 | acceptance-bar | state | M1 exit part 4 (model and parity): walled and extramural ribbon shares in MFCG's band (§13… | §16 M1 exit (+ the VS5-1 frozen-view fixture) |
| SCOPE-457 | rule | state | M2a content (the editing core, D-7: before the second preset): the log and the one replay … | §16 M2a content (+ VD5-7 link rule with the keep) |
| SCOPE-458 | acceptance-bar | state | M2a exit (9–12 pw): O9 (a), (b), (d); oracle (i)–(iii) green on 10⁴ sequences; a CITY dist… | §16 M2a exit (+ VD5-7 kept-town link-refusal case) |
| SCOPE-459 | rule | state | M2b content (the base at parity): prosperity field with drivers and brush; full granularit… | §16 M2b |
| SCOPE-460 | acceptance-bar | state | M2b exit (33–42 pw): every must-have letter on B-CITY (1 000 seeds) against its §13.5 or §… | §16 M2b |
| SCOPE-461 | rule | state | M3a content (full editing, migration, API): warp kernels with whole-step validation; drawn… | §16 M3a content (link refusals narrowed to packs and host content, VD5-7) |
| SCOPE-462 | acceptance-bar | state | M3a exit (16–20 pw), part 1: O9 (c) faithfulness (Regenerate keep settings byte-identical;… | §16 M3a |
| SCOPE-463 | acceptance-bar | state | M3a exit part 2: the bridge convergence test (a host and three headless clients, 1 000 int… | §16 M3a exit (kept-town link case moved to M2a, VD5-7) |
| SCOPE-464 | rule | state | M3b content: VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF/OBJ; Cit… | §16 M3b |
| SCOPE-465 | acceptance-bar | state | M3b exit (16–21 pw): VTT import with no manual steps; every format validator green; script… | §16 M3b |
| SCOPE-466 | rule | state | M4 content (hardening and the incremental path): performance tiers and the low-end tier me… | §16 M4 |
| SCOPE-467 | acceptance-bar | state | M4 exit (11–16 pw): nightly cross-platform goldens green for two weeks; the epoch test (0 … | §16 M4 |
| SCOPE-468 | rule | state | M4b (the content module @plat/sim, after the relation store schema which is in the base fr… | §16 M4b |
| SCOPE-469 | rule | state | M5 (stage 2, 14–18 pw): @plat/hood RingFabric, SquareFabric, StreetFabric; block-content d… | §16 M5 |
| SCOPE-470 | budget | state | Effort table (IMP-2; D-20), each line a PLAUSIBLE range: parity floors after sharing (MFCG… | §16 effort table |
| SCOPE-471 | history | drop-history | Round-by-round notes that later additions change no line of the effort table: round-2 addi… | history — rationale file Part E.3 (verbatim) |
| SCOPE-472 | budget | state | New components of rounds 4–5 (priced by the fix-all line's widening ≈ 14–22 working days, … | §16 *The six new components* |
| SCOPE-473 | rule | state | The milestone rows carry the widening where components are built — M1 + 2 / + 3 pw (genera… | §16 *The six new components* (the pricing rule) |
| SCOPE-474 | decision | rationale | Chose to state the larger honest total over keeping 100–130 pw by cutting scope, because t… | rationale file Part A row J-S6 (+ Part E.3 verbatim); the cuts list stays in §16 with "(J-S6, D-20)" |
| SCOPE-475 | rule | state | Riskiest items in order: fusion timing and statistics on real terrain (M0 c, M1); the bent… | §16 riskiest items (Clipper2 → §3.7, KERNEL-C01) |
| SCOPE-476 | rule | state | Staged by the owner (hooks concrete; documented, not bugs to re-find): stage-3 composition… | §16 last paragraph → the Staged list (SCOPE-C11); nothing else out of scope |
| SCOPE-477 | rule | state | Clean-room posture in brief: never copy or port reference code (the 2017 ancestor is GPL, … | §17 (plain words) |
| SCOPE-478 | rule | state | Who reads what: research seats (readers, measurers, the digest writer) may read findings, … | §17.1 (1) |
| SCOPE-479 | rule | state | The implementer digest: a digest seat writes plat/docs/digest/ from the research — behavio… | §17.1 (2) |
| SCOPE-480 | rule | state | Until M-1 builds the deny-list, every seat that writes this document (a fix-all integratio… | §17.1 (2) |
| SCOPE-481 | test | state | doc_checks (i) identifiers: whole-word, case-sensitive search for the backticked identifie… | §17.1 (2) |
| SCOPE-482 | test | state | doc_checks (ii) colours: every six-digit colour value (#rrggbb or 0xrrggbb) looked up case… | §17.1 (2) |
| SCOPE-483 | test | state | doc_checks (iii) token 3-grams: lower-cased word tokens of the changed sections against ev… | §17.1 (2) |
| SCOPE-484 | test | state | doc_checks (iv) tables: outside fenced code (fences may be indented) every line starting w… | §17.1 (2) |
| SCOPE-485 | test | state | doc_checks (v) pointers: every §n and §n.m pointer resolves to a heading of this document. | §17.1 (2) |
| SCOPE-486 | test | state | doc_checks (vi) lists in any order: every JSON file under research/ and captures/ except t… | §17.1 (2) |
| SCOPE-487 | rule | state | Each hit is corrected before the change lands or reviewed into docs/validation/doc-checks-… | §17.1 (2) |
| SCOPE-488 | evidence | drop-history | Calibration (executed): on §13–§17 after round 2 (pre-round-3 lines 6657–7826, md5 ca2e206… | history/evidence — rationale file Part E.4 (verbatim); one-line receipt pointer left in §17.1 (2) |
| SCOPE-489 | decision | rationale | Chose scripted proxies with a reviewed allow file over a hand-run grep (the round-2 hand p… | rationale file rows J-S32 / J-S35 (+ Part E.4 verbatim); "(J-S32)", "(J-S35)" left in §17.1 (2) |
| SCOPE-490 | rule | state | Repository boundary: the product is its own repository plat/ at the folder root outside re… | §17.1 (3) |
| SCOPE-491 | rule | state | Reference numbers only through committed numbers-only files: research-side scripts (resear… | §17.1 (4), rewritten by VS5-3 (three committed files) |
| SCOPE-492 | mechanism | state | Content scan: research/baselines/make_denylist.py builds the deny-list from the creative d… | §17.1 (5) |
| SCOPE-493 | rule | state | @plat/testkit's clean-room scanner digests the same way every token of @plat/tables, asset… | §17.1 (5) |
| SCOPE-494 | rule | state | At every milestone the checker seat runs a research-side palette audit: a shipped palette … | §17.1 (5) |
| SCOPE-495 | rule | state | Honest provenance: every table cell's provenance is one of own, ref:⟨reference⟩ ⟨behaviour… | §17.1 (6) |
| SCOPE-496 | rule | state | The record: plat/docs/CLEAN-ROOM.md holds the rule, the seat ledger (which seat read which… | §17.1 (7) |
| SCOPE-497 | rule | state | Sources of algorithms (published; each read in its published form, the seat ledger records… | §17.1 (8) |
| SCOPE-498 | rule | state | The creators' stated ideas admitted (with constants calibrated on our own measurements): t… | §17.1 (8) |
| SCOPE-499 | rule | state | Protocol names (FTG-22): the host bridge vocabulary is our own (§11.3) — concurrency token… | §17.1 (9) |
| SCOPE-500 | decision | state | Fonts are third-party OFL assets outside the clean-room rule; chose IM FELL Great Primer (… | §17.2 (the choice; the because-clause kept in one line with "(J-S15)"; verbatim in rationale Part E.5) |
| SCOPE-501 | rule | state | Fonts ship unmodified; CI reads each face's name table and refuses to subset a face declar… | §17.2 |
| SCOPE-502 | decision | state | Our own licence (D-22): until the owner chooses, plat/ is proprietary — "Copyright © the o… | §17.3 (proprietary default, owner veto; "(J-S10)"; verbatim in rationale Part E.6) |
| SCOPE-503 | rule | state | What keeps every licence choice open: permissive-only dependencies checked over the produc… | §17.3 |
| SCOPE-504 | rule | state | Licence checker: the allowlist — MIT, ISC, BSD-2/3, Apache-2.0, BSL-1.0, CC0, Unlicense, O… | §17.4 |
| SCOPE-505 | rule | state | Notices: CI generates THIRD-PARTY-NOTICES.txt from the production closure (name, version, … | §17.4 |
| SCOPE-506 | rule | state | Pins: exact versions in every package.json with the lockfile committed; no prerelease in t… | §17.4 |
| SCOPE-507 | decision | state | Dependency table: robust-predicates 3.0.3 (Unlicense; incircle and the adversarial orient2… | §17.4 |
| SCOPE-508 | rule | state | Nothing GPL, AGPL or LGPL is linked or bundled; CGAL is excluded (its straight skeleton is… | §17.4 |
| SCOPE-509 | rule | state | Delegated decisions: the owner deferred all judgment; each decision is final unless vetoed… | Delegated decisions preface |
| SCOPE-510 | decision | state | D-1: default look = clean ink (MFCG family) with IM FELL Great Primer as label face; secon… | Delegated decisions D-1 |
| SCOPE-511 | decision | state | D-2: era and region centre of gravity = high-to-late medieval Western Europe (12th–15th c.… | Delegated decisions D-2 |
| SCOPE-512 | decision | state | D-3: realism in the base; fantasy only as named toggles, each off by default — floating is… | Delegated decisions D-3 |
| SCOPE-513 | decision | state | D-4: browser-first embeddable TypeScript library with an app on top; permissive dependenci… | Delegated decisions D-4 |
| SCOPE-514 | decision | state | D-5: "mastered" = the owner's eye on side-by-sides against MFCG and FTG at town/city/metro… | Delegated decisions D-5 |
| SCOPE-515 | decision | state | D-6: original English-fantasy naming; setting packs in §10.4's format, the base shipping o… | Delegated decisions D-6 |
| SCOPE-516 | decision | state | D-7: improvement weighting — realism, editability, plot texture first; speed and export ne… | Delegated decisions D-7 |
| SCOPE-517 | decision | state | D-8: 3-D export = glTF 2.0 (OBJ secondary) and CityJSON 2.0 (CityJSON integer vertices wit… | Delegated decisions D-8 |
| SCOPE-518 | decision | state | D-9: "no restart path" is a design property; acceptance numbers are requested-feature deli… | Delegated decisions D-9 (bars → §13.5, CANON-C10) |
| SCOPE-519 | decision | state | D-10: simulation depth in the base = roster, context vector, allocation and placement, hou… | Delegated decisions D-10 |
| SCOPE-520 | decision | state | D-11: Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles onc… | Delegated decisions D-11 |
| SCOPE-521 | decision | state | D-12: integer centimetres centred on (0, 0), +y north; range invariant 2²³ cm; six-fold he… | Delegated decisions D-12 |
| SCOPE-522 | decision | state | D-13: five refinement levels as views of one arena per layer (level-tagged edges, per-leve… | Delegated decisions D-13 |
| SCOPE-523 | decision | state | D-14: booleans, buffers and bands on the kernel's own arrangement — one engine on every ho… | Delegated decisions D-14 (→ §3.7, KERNEL-C01) |
| SCOPE-524 | decision | state | D-15: xoshiro128** streams keyed from structured components (seed key, entity lineage, sta… | Delegated decisions D-15 (→ §6.1, CANON-C08) |
| SCOPE-525 | decision | state | D-16: the fused layout = routed arterials between named destinations; reservations and gat… | Delegated decisions D-16 |
| SCOPE-526 | decision | state | D-17: enceinte — gate sites picked and castle and plaza reserved at S3; stage 1's enceinte… | Delegated decisions D-17 |
| SCOPE-527 | decision | state | D-18 (owner veto on the misses above the knees): budgets per §12.3 as per-rung laws of bui… | Delegated decisions D-18 (budgets and misses → §12.3 / §12.5 / §12.9, SCOPE-C01); the pre-pass row verbatim in rationale Part D |
| SCOPE-528 | decision | state | D-19: codename PLAT and @plat/*; terrain resolution 5 / 8 / 10 m; frame areas 4 / 25 / 64 … | Delegated decisions D-19 (each value → its home: §2.3, §1.1, §3.2 (2), (9), §4.5, §4.2 S3, §4.2 S2, §8.4, §2.6, §7.6) |
| SCOPE-529 | decision | state | D-20: effort ≈ 153–204 expert person-weeks — base 139–186 (content module included) plus s… | Delegated decisions D-20 |
| SCOPE-530 | decision | state | D-21: the document persists a base (recipe or rebased state) and the ordered log, with a d… | Delegated decisions D-21 |
| SCOPE-531 | decision | state | D-22 (owner veto): our own licence proprietary, all rights reserved to the owner, until th… | Delegated decisions D-22 |
| SCOPE-532 | decision | state | D-23: deterministic transcendentals through dmath (our TypeScript port of fdlibm 5.3 with … | Delegated decisions D-23 |
| SCOPE-533 | decision | state | D-24: goldens are stage-isolated (new stage code on frozen upstream outputs) and built at … | Delegated decisions D-24 |
| SCOPE-534 | decision | state | D-25: the evolution hook in the base is exactly one built and tested path — add a growth s… | Delegated decisions D-25 |
| SCOPE-535 | decision | state | D-26: identity = opaque lineage-hash addresses with survival and succession (§6.3). Reject… | Delegated decisions D-26 |
| SCOPE-536 | decision | state | D-27: work limits, never wall clock, bound every output-affecting budget (§5.1). Rejected:… | Delegated decisions D-27 |
| SCOPE-537 | decision | state | D-28: the model digest is a Merkle root over the eager model's content only, maintained at… | Delegated decisions D-28 |
| SCOPE-538 | decision | state | D-29: the clean-room chain (§17.1): implementers read only this document and a checked dig… | Delegated decisions D-29 (files → §17.1 (4), SCOPE-C02) |
| SCOPE-539 | decision | state | D-30: every threshold has a number now — reference-settable bands by §13.5's band rule; th… | Delegated decisions D-30 |
| SCOPE-540 | decision | state | D-31 (owner veto): matched references TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY… | Delegated decisions D-31 |
| SCOPE-541 | decision | state | D-32 (owner veto: new capability rather than repair): economy (resource chains, items and … | Delegated decisions D-32 |
| SCOPE-542 | decision | state | D-33: the two ladders meet at 1 500 inhabitants (village THORP → HAMLET → VILLAGE ends the… | Delegated decisions D-33 |
| SCOPE-543 | decision | state | D-34: three CI tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h… | Delegated decisions D-34 |
| SCOPE-544 | decision | state | D-35: build order M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (second pres… | Delegated decisions D-35 |
| SCOPE-545 | rule | state | This document defers nothing (owner, 2026-09-25: "no defer and everything fixed as soon as… | Staged — preface (history sentence → rationale Part E.7) |
| SCOPE-546 | mapping | state | Stage 2 — neighbourhood composition (after the base): hooks — SeamContract on every distri… | Staged — stage-2 row ("built in this program at M5", SCOPE-C11) |
| SCOPE-547 | mapping | state | Stage 3 — manor-style compositions (after stage 2): BuildingGenerator.outline / compose wi… | Staged by the owner's roadmap |
| SCOPE-548 | mapping | state | Village product (after the town/city): stages ordered by declared IO; EnceinteStrategy and… | Staged by the owner's roadmap |
| SCOPE-549 | mapping | state | Sewers and floating islands (toggles, after the city is mastered): one arena per layer and… | Staged by the owner's roadmap |
| SCOPE-550 | mapping | state | Evolution engine (much later): epoch events and key components; EpochInputs, EvolutionStra… | Staged by the owner's roadmap |
| SCOPE-551 | mapping | state | Calibration against the historical corpus (after the standalone generators): CorpusAdapter… | Staged by the owner's roadmap |
| SCOPE-552 | mapping | state | SettlementForge inputs (after the generators are mastered): the host-input contract and th… | Staged by the owner's roadmap |
| SCOPE-553 | history | state | Read in full: proposal-kernel.md (1 365 lines), proposal-pipeline.md (1 703), proposal-pro… | Appendix A reading-record paragraph (summary); verbatim in rationale Part C (A.1) |
| SCOPE-554 | history | state | Read by outline plus named sections: IMPROVEMENTS.md §4 (R1–R16, lines 1462–1494), §5 (149… | Appendix A reading-record paragraph (summary); verbatim in rationale Part C (A.2) |
| SCOPE-555 | rule | state | CONFIRMED vs PLAUSIBLE: every reference number quoted as a calibration target or baseline … | Appendix A — A.3 |
| SCOPE-556 | history | drop-history | The ARCHITECTURE-finish seat read this document, docs/design/judging.md and the SPEC and G… | history — rationale file Part C (A.4, verbatim) |
| SCOPE-557 | history | drop-history | The fix-all integration seat (2026-09-25) read in full the five round-1 area drafts, this … | history — rationale file Part C (A.5, verbatim) |
| SCOPE-558 | rule | state | Judgment calls ("chose X over Y because Z", each vetoable): J-1 – J-18 are the synthesis s… | Judgment calls index preface |
| SCOPE-559 | history | drop-history | Round-by-round ledger of J-row additions, restatements and amendments (round 2: J-K9–J-K21… | history — rationale file Part A preface (verbatim round ledger) |
| SCOPE-560 | decision | rationale | J-1: Chose the kernel proposal as the base over the improvement winner — because it wins t… | rationale file Part A row J-1 (verbatim); index row J-1 |
| SCOPE-561 | decision | rationale | J-2: Chose to type districts and solve the fields before the bent-cut infill (the parity j… | rationale file Part A row J-2 (verbatim); index row J-2 |
| SCOPE-562 | decision | rationale | J-3: Chose FTG-shaped growth for the secondary streets outside the walls over least-cost c… | rationale file Part A row J-3 (verbatim); index row J-3 |
| SCOPE-563 | decision | rationale | J-4: Chose plat-tree scoping as the primary locality mechanism with the dependency graph a… | rationale file Part A row J-4 (verbatim); index row J-4 |
| SCOPE-564 | decision | rationale | J-5: Chose a 128-bit key hash and 32-bit-lane mixing over SplitMix64 or a 32-bit key — bec… | rationale file Part A row J-5 (verbatim); index row J-5 |
| SCOPE-565 | decision | rationale | J-6: Chose `FaceRef` unions with L2 half-corridor strips and junction wedges over restrict… | rationale file Part A row J-6 (verbatim); index row J-6 |
| SCOPE-566 | decision | rationale | J-7: Chose batched transactions (stage / district / block / edit) over per-insertion trans… | rationale file Part A row J-7 (verbatim); index row J-7 |
| SCOPE-567 | decision | rationale | J-8: Chose a snapshot-plus-replay document over events-only — because loads must be instan… | rationale file Part A row J-8 (verbatim); index row J-8 |
| SCOPE-568 | decision | rationale | J-9: Chose IMPROVEMENTS' J-S scope for the simulation over the product proposal's widening… | rationale file Part A row J-9 (verbatim); index row J-9 |
| SCOPE-569 | decision | rationale | J-10: Chose Poisson k = 50 over k = 30 — because the critic ruled the references evaluate … | rationale file Part A row J-10 (verbatim); index row J-10 |
| SCOPE-570 | decision | rationale | J-11: Chose `dmath` from an fdlibm port over in-house polynomials — because a vetted algor… | rationale file Part A row J-11 (verbatim); index row J-11 |
| SCOPE-571 | decision | rationale | J-12: Chose one generation worker plus a derivation pool for the per-district stages, with… | rationale file Part A row J-12 (verbatim); index row J-12 |
| SCOPE-572 | decision | rationale | J-13: Chose to write the greenery rule table, the monotone-control mechanism, the control-… | rationale file Part A row J-13 (verbatim); index row J-13 |
| SCOPE-573 | decision | rationale | J-14: Chose to schedule CONFIDENCE §6's experiments #5 and #10 (no recording needed) and #… | rationale file Part A row J-14 (verbatim); index row J-14 |
| SCOPE-574 | decision | rationale | J-15: Chose to re-cut M1 to the viewable town only and to state 150–200 pw — 153–204 once … | rationale file Part A row J-15 (verbatim); index row J-15 |
| SCOPE-575 | decision | rationale | J-16: Chose the anchor rule with `supersedes` on top of lineage-hash addresses (J-DET-1) o… | rationale file Part A row J-16 (verbatim); index row J-16 |
| SCOPE-576 | decision | rationale | J-17: Chose to keep the kernel's `PLAT` codename over a new name — because the winner's st… | rationale file Part A row J-17 (verbatim); index row J-17 |
| SCOPE-577 | decision | rationale | J-18: Chose to run this lane on a relayed status question (recorded in §0.3 and `docs/desi… | rationale file Part A row J-18 (verbatim); index row J-18 |
| SCOPE-578 | decision | rationale | J-K1: Chose one arena per layer with the five levels as views over five separate per-level… | rationale file Part A row J-K1 (verbatim); index row J-K1 |
| SCOPE-579 | decision | rationale | J-K2: Chose vertex, segment and stretch attraction at 26 cm — an incoming vertex moves at … | rationale file Part A row J-K2 (verbatim); index row J-K2 |
| SCOPE-580 | decision | rationale | J-K3: Chose role and owner tables with resolved views over stored face and edge slots in e… | rationale file Part A row J-K3 (verbatim); index row J-K3 |
| SCOPE-581 | decision | rationale | J-K4: Chose booleans, buffers and bands on the kernel's own arrangement, one engine on eve… | rationale file Part A row J-K4 (verbatim); index row J-K4 |
| SCOPE-582 | decision | rationale | J-K5: Chose an in-house straight skeleton under a numeric contract and a four-part validat… | rationale file Part A row J-K5 (verbatim); index row J-K5 |
| SCOPE-583 | decision | rationale | J-K6: Chose static indexes rebuilt at stage end per partition, with query results sorted b… | rationale file Part A row J-K6 (verbatim, amended for KERNEL-C06, KERNEL-C12); index row J-K6 |
| SCOPE-584 | decision | rationale | J-K7: Chose `Int32` centimetre heights relative to a per-document datum over `Int16` heigh… | rationale file Part A row J-K7 (verbatim); index row J-K7 |
| SCOPE-585 | decision | rationale | J-K8: Chose no WASM kernel — a byte-identical WebAssembly accelerator only for a hot loop … | rationale file Part A row J-K8 (verbatim); index row J-K8 |
| SCOPE-586 | decision | rationale | J-K9: Chose role-carrying vertices for every entity-held vertex and role signatures for lo… | rationale file Part A row J-K9 (verbatim); index row J-K9 |
| SCOPE-587 | decision | rationale | J-K10: Chose knot profiles for varying chain attributes over arc-length profiles from the … | rationale file Part A row J-K10 (verbatim); index row J-K10 |
| SCOPE-588 | decision | rationale | J-K11: Chose to promote a finer vertex a coarser batch lands on over clearing and re-deriv… | rationale file Part A row J-K11 (verbatim); index row J-K11 |
| SCOPE-589 | decision | rationale | J-K12: Chose one hydrology grid over frame and margin at 16 / 25 / 32 m over a frame-only … | rationale file Part A row J-K12 (verbatim); index row J-K12 |
| SCOPE-590 | decision | rationale | J-K13: Chose a magnitude-triggered flush at 2⁵² from the range invariant for `area2` over … | rationale file Part A row J-K13 (verbatim); index row J-K13 |
| SCOPE-591 | decision | rationale | J-K14: Chose to keep finer content an earlier stage made, and every finer face outside a c… | rationale file Part A row J-K14 (verbatim); index row J-K14 |
| SCOPE-592 | decision | rationale | J-K15: Chose two transaction forms — declared op sets in canonical order, callback sequenc… | rationale file Part A row J-K15 (verbatim); index row J-K15 |
| SCOPE-593 | decision | rationale | J-K16: Chose read-only transferred arena copies with one copy-on-write overlay per distric… | rationale file Part A row J-K16 (verbatim); index row J-K16 |
| SCOPE-594 | decision | rationale | J-K17: Chose an endpoint rule and one constrained placement rule for every new vertex on a… | rationale file Part A row J-K17 (verbatim); index row J-K17 |
| SCOPE-595 | decision | rationale | J-K18: Chose to slide a vertex along the fixed coarser route it lies on under a warp over … | rationale file Part A row J-K18 (verbatim); index row J-K18 |
| SCOPE-596 | decision | rationale | J-K19: Chose a strict oracle comparison on unattracted cases and an attraction-radius boun… | rationale file Part A row J-K19 (verbatim); index row J-K19 |
| SCOPE-597 | decision | rationale | J-K20: Chose S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar over a looser `… | rationale file Part A row J-K20 (verbatim); index row J-K20 |
| SCOPE-598 | decision | rationale | J-K21: Chose a convexity gate on the exact OBB roof path over a post-check of each roof li… | rationale file Part A row J-K21 (verbatim); index row J-K21 |
| SCOPE-599 | decision | rationale | J-K22: Chose typed-array open-addressing tables for the role heads and owner heads over `M… | rationale file Part A row J-K22 (verbatim); index row J-K22 |
| SCOPE-600 | decision | rationale | J-K23: Chose cut knots carrying the exact sampled value over re-keying the existing knots … | rationale file Part A row J-K23 (verbatim); index row J-K23 |
| SCOPE-601 | decision | rationale | J-K24: Chose to name a coarse insertion's permitted contacts explicitly — `KernelTx.prepar… | rationale file Part A row J-K24 (verbatim); index row J-K24 |
| SCOPE-602 | decision | rationale | J-K25: Chose to end S10's eager step (0) with a rebuild of the L3 partitions it touched, s… | rationale file Part A row J-K25 (verbatim); index row J-K25 |
| SCOPE-603 | decision | rationale | J-K26: Chose to clear the `split` flag on a move except a re-seat onto, or a slide along, … | rationale file Part A row J-K26 (verbatim); index row J-K26 |
| SCOPE-604 | decision | rationale | J-K27: Chose to let a move keep nothing and to hold every route vertex of a locked or pinn… | rationale file Part A row J-K27 (verbatim); index row J-K27 |
| SCOPE-605 | decision | rationale | J-K28: Chose demotion — an edge takes the lowest level among its rows, a vertex is never c… | rationale file Part A row J-K28 (verbatim); index row J-K28 |
| SCOPE-606 | decision | rationale | J-K29: Chose a `gate_end` role on a fresh `Gate` for a water gate's bank vertices and tran… | rationale file Part A row J-K29 (verbatim); index row J-K29 |
| SCOPE-607 | decision | rationale | J-K30: Chose to place a warp step's re-seats and slides one at a time in canonical order b… | rationale file Part A row J-K30 (verbatim); index row J-K30 |
| SCOPE-608 | decision | rationale | J-K31: Chose a batch-local `StretchRef` accepted by `removeEdges` and `retypeEdges`, with … | rationale file Part A row J-K31 (verbatim); index row J-K31 |
| SCOPE-609 | decision | rationale | J-K32: Chose a placement bound for the hot pixel and index boxes over the vertices standin… | rationale file Part A row J-K32 (verbatim); index row J-K32 |
| SCOPE-610 | decision | rationale | J-K33: Chose the first stage of §4.1's order as a move batch's `rederivesFrom` over the fi… | rationale file Part A row J-K33 (verbatim); index row J-K33 |
| SCOPE-611 | decision | rationale | J-K34: Chose to tombstone every item a batch deletes, re-levels or changes — item keys in … | rationale file Part A row J-K34 (verbatim); index row J-K34 |
| SCOPE-612 | decision | rationale | J-K35: Chose to hold a water gate's `gate_end` vertices under a warp unless `fromLevel = 0… | rationale file Part A row J-K35 (verbatim); index row J-K35 |
| SCOPE-613 | decision | rationale | J-DET-1: Chose opaque address ids whose token is the hash of the entity's lineage key over… | rationale file Part A row J-DET-1 (verbatim); index row J-DET-1 |
| SCOPE-614 | decision | rationale | J-DET-2: Chose to keep the lineage (and so the draws) only for entities that survive un-de… | rationale file Part A row J-DET-2 (verbatim); index row J-DET-2 |
| SCOPE-615 | decision | rationale | J-DET-3: Chose operation-count work limits for every output-affecting budget over wall-clo… | rationale file Part A row J-DET-3 (verbatim); index row J-DET-3 |
| SCOPE-616 | decision | rationale | J-DET-4: Chose a Merkle digest maintained at batch commit over hashing the canonical seria… | rationale file Part A row J-DET-4 (verbatim); index row J-DET-4 |
| SCOPE-617 | decision | rationale | J-DET-5: Chose to keep version stamps, rule slices, derivation inputs and deps out of the … | rationale file Part A row J-DET-5 (verbatim); index row J-DET-5 |
| SCOPE-618 | decision | rationale | J-DET-6: Chose one ordered replay fold — drawn constraints, epochs, rebases and upgrades a… | rationale file Part A row J-DET-6 (verbatim); index row J-DET-6 |
| SCOPE-619 | decision | rationale | J-DET-7: Chose a `rebase` event when a saved state is kept over leaving the recipe and log… | rationale file Part A row J-DET-7 (verbatim); index row J-DET-7 |
| SCOPE-620 | decision | rationale | J-DET-8: Chose scoped undo records and cost-driven checkpoints over an eight-deep ring of … | rationale file Part A row J-DET-8 (verbatim); index row J-DET-8 |
| SCOPE-621 | decision | rationale | J-DET-9: Chose output versions that bump only with a declared shift, with N−1 and N−2 reta… | rationale file Part A row J-DET-9 (verbatim); index row J-DET-9 |
| SCOPE-622 | decision | rationale | J-DET-10: Chose to make an edited attribute implicitly pinned (IMPROVEMENTS O9's rule) ove… | rationale file Part A row J-DET-10 (verbatim); index row J-DET-10 |
| SCOPE-623 | decision | rationale | J-DET-11: Chose lock > assignment in the precedence order over assignment > lock — because… | rationale file Part A row J-DET-11 (verbatim); index row J-DET-11 |
| SCOPE-624 | decision | rationale | J-DET-12: Chose to recompute the prosperity, density and greenery fields on load over pers… | rationale file Part A row J-DET-12 (verbatim); index row J-DET-12 |
| SCOPE-625 | decision | rationale | J-DET-13: Chose to state control monotonicity and continuity over 50 seeds per step with a… | rationale file Part A row J-DET-13 (verbatim); index row J-DET-13 |
| SCOPE-626 | decision | rationale | J-DET-14: Chose to make `drawBoundary` snap to whole L1 cells over creating invisible `dis… | rationale file Part A row J-DET-14 (verbatim); index row J-DET-14 |
| SCOPE-627 | decision | rationale | J-DET-15: Chose MFCG's whole-map Rotate as a view rotation with a compass that points at m… | rationale file Part A row J-DET-15 (verbatim); index row J-DET-15 |
| SCOPE-628 | decision | rationale | J-DET-16: Chose undo and redo as logged events applied at the head through the same fold, … | rationale file Part A row J-DET-16 (verbatim); index row J-DET-16 |
| SCOPE-629 | decision | rationale | J-DET-17: Chose to copy every non-shipped setting pack's content into the document and to … | rationale file Part A row J-DET-17 (verbatim); index row J-DET-17 |
| SCOPE-630 | decision | rationale | J-DET-18: Chose an upgrade's undo record to be its `from` output version (undo = a replay … | rationale file Part A row J-DET-18 (verbatim); index row J-DET-18 |
| SCOPE-631 | decision | rationale | J-DET-19: Chose content-addressed snapshot chunks per static-index partition, shared betwe… | rationale file Part A row J-DET-19 (verbatim); index row J-DET-19 |
| SCOPE-632 | decision | rationale | J-DET-20: Chose to compare each scope entity's identity-free content digest after New rand… | rationale file Part A row J-DET-20 (verbatim, amended for DETERMINISM-C-2); index row J-DET-20 |
| SCOPE-633 | decision | rationale | J-DET-21: Chose to run S13a's scoped delta at each event's log position in replay mode, su… | rationale file Part A row J-DET-21 (verbatim); index row J-DET-21 |
| SCOPE-634 | decision | rationale | J-DET-22: Chose to remove `labels` from the rerollable concerns and to make rerollability … | rationale file Part A row J-DET-22 (verbatim); index row J-DET-22 |
| SCOPE-635 | decision | rationale | J-DET-23: Chose to make S1's water operator re-site the crossings of the changed reach and… | rationale file Part A row J-DET-23 (verbatim); index row J-DET-23 |
| SCOPE-636 | decision | rationale | J-DET-24: Chose the terrain brush's `water: 'locked'` default with water and locked footpr… | rationale file Part A row J-DET-24 (verbatim); index row J-DET-24 |
| SCOPE-637 | decision | rationale | J-DET-25: Chose work limits as laws over the batch scope's population-derived counts over … | rationale file Part A row J-DET-25 (verbatim); index row J-DET-25 |
| SCOPE-638 | decision | rationale | J-DET-26: Chose grid-bucketed nearest-neighbour succession matching per kind and class fam… | rationale file Part A row J-DET-26 (verbatim); index row J-DET-26 |
| SCOPE-639 | decision | rationale | J-DET-27: Chose, for a control that fails its sweep, a smoothstep over the failing interva… | rationale file Part A row J-DET-27 (verbatim); index row J-DET-27 |
| SCOPE-640 | decision | rationale | J-DET-28: Chose to require byte identity of the WebAssembly accelerator only, and to admit… | rationale file Part A row J-DET-28 (verbatim); index row J-DET-28 |
| SCOPE-641 | decision | rationale | J-DET-29: Chose to re-run S10's step (0) one-sided for a scope's own side of every shared … | rationale file Part A row J-DET-29 (verbatim); index row J-DET-29 |
| SCOPE-642 | decision | rationale | J-DET-30: Chose to record a river's control knots as S1's recorded input with stable ordin… | rationale file Part A row J-DET-30 (verbatim); index row J-DET-30 |
| SCOPE-643 | decision | rationale | J-DET-31: Chose to carry point-anchored records — pins, point decorations, positional inst… | rationale file Part A row J-DET-31 (verbatim); index row J-DET-31 |
| SCOPE-644 | decision | rationale | J-DET-32: Chose to admit harbour works by topology — a `pier` or `quay` way whose connecte… | rationale file Part A row J-DET-32 (verbatim); index row J-DET-32 |
| SCOPE-645 | decision | rationale | J-DET-33: Chose a lifecycle event block ordered by `seq` from which an undo removes its ta… | rationale file Part A row J-DET-33 (verbatim); index row J-DET-33 |
| SCOPE-646 | decision | rationale | J-DET-34: Chose a session per document and author — minted once outside the model packages… | rationale file Part A row J-DET-34 (verbatim); index row J-DET-34 |
| SCOPE-647 | decision | rationale | J-DET-35: Chose to make a selected user corpus a non-shipped pack (`user:<hash>`), to save… | rationale file Part A row J-DET-35 (verbatim); index row J-DET-35 |
| SCOPE-648 | decision | rationale | J-DET-36: Chose references by lattice point across chunks, with level-≤ 1 routes in the co… | rationale file Part A row J-DET-36 (verbatim); index row J-DET-36 |
| SCOPE-649 | decision | rationale | J-DET-37: Chose to hand a generated name to a successor with its address and naming record… | rationale file Part A row J-DET-37 (verbatim); index row J-DET-37 |
| SCOPE-650 | decision | rationale | J-DET-38: Chose to make the displayed snapshot the working state and apply edits at once —… | rationale file Part A row J-DET-38 (verbatim); index row J-DET-38 |
| SCOPE-651 | decision | rationale | J-DET-39: Chose to scope the NF-P5 invariant to generation batches and to every edit batch… | rationale file Part A row J-DET-39 (verbatim); index row J-DET-39 |
| SCOPE-652 | decision | rationale | J-DET-40: Chose, as the pre-decided fallback if the load's full digest recomputation passe… | rationale file Part A row J-DET-40 (verbatim); index row J-DET-40 |
| SCOPE-653 | decision | rationale | J-DET-41: Chose to persist a naming record — the naming slices and salt of the last draw —… | rationale file Part A row J-DET-41 (verbatim); index row J-DET-41 |
| SCOPE-654 | decision | rationale | J-DET-42: Chose to let a non-owner client of a bridged document take the replayed town, ke… | rationale file Part A row J-DET-42 (verbatim); index row J-DET-42 |
| SCOPE-655 | decision | rationale | J-DET-43: Chose to run the per-district stages of every edit made during load verification… | rationale file Part A row J-DET-43 (verbatim); index row J-DET-43 |
| SCOPE-656 | decision | rationale | J-DET-44: Chose to run every recomputed-root check of a decoded state under the model pack… | rationale file Part A row J-DET-44 (verbatim); index row J-DET-44 |
| SCOPE-657 | decision | rationale | J-DET-45: Chose, under the load's off-edit-path recomputation (§6.2 (iii)), to keep edits … | rationale file Part A row J-DET-45 (verbatim); index row J-DET-45 |
| SCOPE-658 | decision | rationale | J-DET-46: Chose to keep a generated name's naming record dormant while the name is edited,… | rationale file Part A row J-DET-46 (verbatim); index row J-DET-46 |
| SCOPE-659 | decision | rationale | J-DET-47: Chose one optional `renames` field on `EditBase`, and `fates` on `editTable` and… | rationale file Part A row J-DET-47 (verbatim); index row J-DET-47 |
| SCOPE-660 | decision | rationale | J-DET-48: Chose to make each field of a culture or ancestry row its own naming slice — key… | rationale file Part A row J-DET-48 (verbatim); index row J-DET-48 |
| SCOPE-661 | decision | rationale | J-DET-49: Chose a separate records digest over the persisted derivation and naming records… | rationale file Part A row J-DET-49 (verbatim); index row J-DET-49 |
| SCOPE-662 | decision | rationale | J-DET-50: Chose to emit a link only when the document's base is the recipe — refusing it f… | rationale file Part A row J-DET-50 (verbatim); index row J-DET-50 |
| SCOPE-663 | decision | rationale | J-DET-51: Chose to remove the rebase reason `keptOldModel` over defining a new trigger for… | rationale file Part A row J-DET-51 (verbatim); index row J-DET-51 |
| SCOPE-664 | decision | rationale | J-P1: Chose feature-named district kinds over class-typed kinds — because MFCG's live taxo… | rationale file Part A row J-P1 (verbatim); index row J-P1 |
| SCOPE-665 | decision | rationale | J-P2: Chose a quarter level for city-LOD labels over thinning district labels — because MF… | rationale file Part A row J-P2 (verbatim); index row J-P2 |
| SCOPE-666 | decision | rationale | J-P3: Chose reservations and gate sites at S3 and the trace before each stage's growth ove… | rationale file Part A row J-P3 (verbatim); index row J-P3 |
| SCOPE-667 | decision | rationale | J-P4: Chose the bent cut for the intramural fabric and FTG growth outside the walls over F… | rationale file Part A row J-P4 (verbatim); index row J-P4 |
| SCOPE-668 | decision | rationale | J-P5: Chose MFCG's walled share over 0.35–0.5 — because a mostly-extramural default reprod… | rationale file Part A row J-P5 (verbatim); index row J-P5 |
| SCOPE-669 | decision | rationale | J-P6: Chose plot counts per band with a measured plot share over one area per class with `… | rationale file Part A row J-P6 (verbatim); index row J-P6 |
| SCOPE-670 | decision | rationale | J-P7: Chose a network-travel-cost level set with an anisotropy row over isotropic distance… | rationale file Part A row J-P7 (verbatim); index row J-P7 |
| SCOPE-671 | decision | rationale | J-P8: Chose a mean-reverting curvature walk with goal reversion over a random walk on the … | rationale file Part A row J-P8 (verbatim); index row J-P8 |
| SCOPE-672 | decision | rationale | J-P9: Chose an eager town-wide allocation, a laziness contract and a complete city-LOD fir… | rationale file Part A row J-P9 (verbatim); index row J-P9 |
| SCOPE-673 | decision | rationale | J-P10: Chose to specify the district pool and its merge protocol now (§4.1) over leaving p… | rationale file Part A row J-P10 (verbatim); index row J-P10 |
| SCOPE-674 | decision | rationale | J-P11: Chose to forbid bent-cut continuation across district boundaries over two-district … | rationale file Part A row J-P11 (verbatim); index row J-P11 |
| SCOPE-675 | decision | rationale | J-P12: Chose the vector coast with contours clipped to land over a shoreline extracted as … | rationale file Part A row J-P12 (verbatim); index row J-P12 |
| SCOPE-676 | decision | rationale | J-P13: Chose per-frontage regions from the block's straight skeleton over FTG's reflex pre… | rationale file Part A row J-P13 (verbatim); index row J-P13 |
| SCOPE-677 | decision | rationale | J-P14: Chose row footprints by clipping over fitted rectangles — because party walls must … | rationale file Part A row J-P14 (verbatim); index row J-P14 |
| SCOPE-678 | decision | rationale | J-P15: Chose to decide the deep-block interior in S8 by band shares over S10 inserting lan… | rationale file Part A row J-P15 (verbatim); index row J-P15 |
| SCOPE-679 | decision | rationale | J-P16: Chose NG's perpendicular-ray far side with a pre-decided fallback chain over an ope… | rationale file Part A row J-P16 (verbatim); index row J-P16 |
| SCOPE-680 | decision | rationale | J-P17: Chose wings stored in the base over single-wing L / T (§2.6). | rationale file Part A row J-P17 (verbatim); index row J-P17 |
| SCOPE-681 | decision | rationale | J-P18: Chose an `outline()` / `compose()` split with a cost contract over one lazy `compos… | rationale file Part A row J-P18 (verbatim); index row J-P18 |
| SCOPE-682 | decision | rationale | J-P19: Chose `baseCm` = the highest sample plus a plinth, with foundation skirts and stepp… | rationale file Part A row J-P19 (verbatim); index row J-P19 |
| SCOPE-683 | decision | rationale | J-P20: Chose a sequential grid roster keyed by building ordinal over a capped fixed-point … | rationale file Part A row J-P20 (verbatim); index row J-P20 |
| SCOPE-684 | decision | rationale | J-P21: Chose a base-schema relation store materialised by the module over relations re-der… | rationale file Part A row J-P21 (verbatim); index row J-P21 |
| SCOPE-685 | decision | rationale | J-P22: Chose pinning by explicit edit only over "pinned once seen", FTG's own rule (§10.3)… | rationale file Part A row J-P22 (verbatim); index row J-P22 |
| SCOPE-686 | decision | rationale | J-P23: Chose close-up refinement as derived data and template replacement as a model edit … | rationale file Part A row J-P23 (verbatim); index row J-P23 |
| SCOPE-687 | decision | rationale | J-P24: Chose the gate law `round(1 + 0.47 √A_ha)` fitted on MFCG's size sweep over `2 + ro… | rationale file Part A row J-P24 (verbatim); index row J-P24 |
| SCOPE-688 | decision | rationale | J-P25: Chose an open waterfront as the default over a sea wall — because MFCG's coastal wa… | rationale file Part A row J-P25 (verbatim); index row J-P25 |
| SCOPE-689 | decision | rationale | J-P26: Chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the … | rationale file Part A row J-P26 (verbatim); index row J-P26 |
| SCOPE-690 | decision | rationale | J-P27: Chose to run the hinterland unit (the hinterland's S10–S12b) on the otherwise idle … | rationale file Part A row J-P27 (verbatim); index row J-P27 |
| SCOPE-691 | decision | rationale | J-P28: Chose the quarter city cut at `min(N_q, L)` over flooring the district count at N_q… | rationale file Part A row J-P28 (verbatim); index row J-P28 |
| SCOPE-692 | decision | rationale | J-P29: Chose to cut the wall strips off as L1 faces at S7 and build the band, towers and g… | rationale file Part A row J-P29 (verbatim); index row J-P29 |
| SCOPE-693 | decision | rationale | J-P30: Chose a carve way rule by class — pinned decks for arterials and sole connections, … | rationale file Part A row J-P30 (verbatim); index row J-P30 |
| SCOPE-694 | decision | rationale | J-P31: Chose a `quad` wing kind that stores the clipped row footprint over re-fitting row … | rationale file Part A row J-P31 (verbatim); index row J-P31 |
| SCOPE-695 | decision | rationale | J-P32: Chose a portal gap that slides a planned lane end away from an existing portal over… | rationale file Part A row J-P32 (verbatim); index row J-P32 |
| SCOPE-696 | decision | rationale | J-P33: Chose one `Seam` record per boundary run, read by both districts, over a contract c… | rationale file Part A row J-P33 (verbatim); index row J-P33 |
| SCOPE-697 | decision | rationale | J-P34: Chose one carve footprint — every L1 cell the channel ⊕ (`attractCm` + bank setback… | rationale file Part A row J-P34 (verbatim); index row J-P34 |
| SCOPE-698 | decision | rationale | J-P35: Chose to solve the harbour route after the trace and the moat, through the serving … | rationale file Part A row J-P35 (verbatim); index row J-P35 |
| SCOPE-699 | decision | rationale | J-P36: Chose to carve an `on_enceinte` castle's moat only along its outer arc, joined to t… | rationale file Part A row J-P36 (verbatim); index row J-P36 |
| SCOPE-700 | decision | rationale | J-P37: Chose a `reserve` seam type for a way-less reservation boundary two districts share… | rationale file Part A row J-P37 (verbatim); index row J-P37 |
| SCOPE-701 | decision | rationale | J-P38: Chose the neighbour step — one `corridor_split` inserted into the neighbour's half-… | rationale file Part A row J-P38 (verbatim); index row J-P38 |
| SCOPE-702 | decision | rationale | J-P39: Chose to store a `quad` wing's four corner indices (`BaseWing.corners`) over inferr… | rationale file Part A row J-P39 (verbatim); index row J-P39 |
| SCOPE-703 | decision | rationale | J-P40: Chose the deck span of a carve's kept way to be the way's own L1 edge between its t… | rationale file Part A row J-P40 (verbatim); index row J-P40 |
| SCOPE-704 | decision | rationale | J-P41: Chose to exclude an enceinte's wall-strip faces from S7b's claim candidates (`claim… | rationale file Part A row J-P41 (verbatim); index row J-P41 |
| SCOPE-705 | decision | rationale | J-P42: Chose to carry a building's stored wing rings with its footprint face — boundary ru… | rationale file Part A row J-P42 (verbatim); index row J-P42 |
| SCOPE-706 | decision | rationale | J-P43: Chose to give each land face of a carve's footprint, after the water is in, the dis… | rationale file Part A row J-P43 (verbatim); index row J-P43 |
| SCOPE-707 | decision | rationale | J-P44: Chose to emit every crossing site as a `Bridge` in state `site` — two pinned bank v… | rationale file Part A row J-P44 (verbatim); index row J-P44 |
| SCOPE-708 | decision | rationale | J-P45: Chose to force one of the N gate picks at the node where the plaza ↔ harbour least-… | rationale file Part A row J-P45 (verbatim); index row J-P45 |
| SCOPE-709 | decision | rationale | J-P46: Chose the arena's outer ring (frame + context margin) as one L0 chain carrying `mar… | rationale file Part A row J-P46 (verbatim); index row J-P46 |
| SCOPE-710 | decision | rationale | J-P47: Chose to run §2.6's wing carry after every committed batch whose commit record chan… | rationale file Part A row J-P47 (verbatim); index row J-P47 |
| SCOPE-711 | decision | rationale | J-P48: Chose to carry a stored stage-3 composition in the same `carryWings` call as the ba… | rationale file Part A row J-P48 (verbatim); index row J-P48 |
| SCOPE-712 | decision | rationale | J-P49: Chose to decide §2.6's wing check by the building's pairing — no union for a wing r… | rationale file Part A row J-P49 (verbatim); index row J-P49 |
| SCOPE-713 | decision | rationale | J-R1: Chose a columnar, transferable mark table over `Mark[]` objects — because a 60 000-o… | rationale file Part A row J-R1 (verbatim); index row J-R1 |
| SCOPE-714 | decision | rationale | J-R2: Chose world-aligned tile rasters over per-district rasters — because district bounda… | rationale file Part A row J-R2 (verbatim); index row J-R2 |
| SCOPE-715 | decision | rationale | J-R3: Chose low-chroma value steps over saturated hues for the default roles — because the… | rationale file Part A row J-R3 (verbatim); index row J-R3 |
| SCOPE-716 | decision | rationale | J-R4: Chose Canvas2D as `lit`'s reference backend over WebGL2 — because one drawing path k… | rationale file Part A row J-R4 (verbatim); index row J-R4 |
| SCOPE-717 | decision | rationale | J-R5: Chose the ground tone over kerb hairlines as the city band's figure-ground — because… | rationale file Part A row J-R5 (verbatim); index row J-R5 |
| SCOPE-718 | decision | rationale | J-R6: Chose not to draw avenue trees at the city band over a thin green line inside the co… | rationale file Part A row J-R6 (verbatim); index row J-R6 |
| SCOPE-719 | decision | rationale | J-R7: Chose no S9 preview over a block preview — because §12.5's laws hold the one-second … | rationale file Part A row J-R7 (verbatim); index row J-R7 |
| SCOPE-720 | decision | rationale | J-R8: Chose settling on exact 2^¼ zoom stops over re-rastering at arbitrary scales — becau… | rationale file Part A row J-R8 (verbatim); index row J-R8 |
| SCOPE-721 | decision | rationale | J-R9: Chose Canvas2D glyphs composed onto the tiles over SDF text — because once tiles are… | rationale file Part A row J-R9 (verbatim); index row J-R9 |
| SCOPE-722 | decision | rationale | J-R10: Chose a handle-and-tiles worker boundary over sending the document or mark objects … | rationale file Part A row J-R10 (verbatim); index row J-R10 |
| SCOPE-723 | decision | rationale | J-R11: Chose stamped, ranked scatter tiles over per-entity Bridson sampling — because samp… | rationale file Part A row J-R11 (verbatim); index row J-R11 |
| SCOPE-724 | decision | rationale | J-R12: Chose label placement as view data measured with our own font metrics over placemen… | rationale file Part A row J-R12 (verbatim); index row J-R12 |
| SCOPE-725 | decision | rationale | J-R13: Chose a minimal own emblem generator plus import over import only and over a full b… | rationale file Part A row J-R13 (verbatim); index row J-R13 |
| SCOPE-726 | decision | rationale | J-R14: Chose to build CityJSON over leaving it for later — because its integer-vertex-plus… | rationale file Part A row J-R14 (verbatim); index row J-R14 |
| SCOPE-727 | decision | rationale | J-R15: Chose host-as-store over a sync service of our own — because the product is a stand… | rationale file Part A row J-R15 (verbatim); index row J-R15 |
| SCOPE-728 | decision | rationale | J-R16: Chose a transport-agnostic bridge plus the static VTT exports over a Roll20 extensi… | rationale file Part A row J-R16 (verbatim); index row J-R16 |
| SCOPE-729 | decision | rationale | J-R17: Chose a per-building cost of ≈ 58–75 µs at p95 over matching MFCG's 12–39 µs — beca… | rationale file Part A row J-R17 (verbatim); index row J-R17 |
| SCOPE-730 | decision | rationale | J-R18: Chose the derivation pool as the primary configuration over a single worker — becau… | rationale file Part A row J-R18 (verbatim); index row J-R18 |
| SCOPE-731 | decision | rationale | J-R19: Chose the low 64 bits of the entity key — the seed key mixed with the lineage hash,… | rationale file Part A row J-R19 (verbatim); index row J-R19 |
| SCOPE-732 | decision | rationale | J-R20: Chose a slot-major draw order with passes inside each slot over the pass-major orde… | rationale file Part A row J-R20 (verbatim); index row J-R20 |
| SCOPE-733 | decision | rationale | J-R21: Chose composing base and labels into one bitmap per tile in the tile worker over tw… | rationale file Part A row J-R21 (verbatim); index row J-R21 |
| SCOPE-734 | decision | rationale | J-R22: Chose a canvas budget derived from the viewport (3P + 7 MB) with tier ceilings and … | rationale file Part A row J-R22 (verbatim); index row J-R22 |
| SCOPE-735 | decision | rationale | J-R23: Chose to run every model-reading render step — live-layer providers, override resol… | rationale file Part A row J-R23 (verbatim); index row J-R23 |
| SCOPE-736 | decision | rationale | J-R24: Chose to apply an instance override by ordinal only while the entity's lineage and … | rationale file Part A row J-R24 (verbatim); index row J-R24 |
| SCOPE-737 | decision | rationale | J-R25: Chose bit-reversal (van der Corput) ranks for jittered grids and lines over a secon… | rationale file Part A row J-R25 (verbatim); index row J-R25 |
| SCOPE-738 | decision | rationale | J-R26: Chose pins fixed at their own and finer stops and yielding at coarser ones over pin… | rationale file Part A row J-R26 (verbatim); index row J-R26 |
| SCOPE-739 | decision | rationale | J-R27: Chose to decide the quarter-tree rung from geometry before the greedy, with one anc… | rationale file Part A row J-R27 (verbatim); index row J-R27 |
| SCOPE-740 | decision | rationale | J-R28: Chose `ground` as the one fallback halo role, and darker inks for `lit` and `hatche… | rationale file Part A row J-R28 (verbatim); index row J-R28 |
| SCOPE-741 | decision | rationale | J-R29: Chose to draw `ink`'s walls in the ink and its courts as ground at the city band ov… | rationale file Part A row J-R29 (verbatim); index row J-R29 |
| SCOPE-742 | decision | rationale | J-R30: Chose a bounded random-style repair — fixed row order, ≤ 100 steps, ≤ 3 draws, then… | rationale file Part A row J-R30 (verbatim); index row J-R30 |
| SCOPE-743 | decision | rationale | J-R31: Chose a strict WGS84 GeoJSON by an inverse transverse Mercator at a documented defa… | rationale file Part A row J-R31 (verbatim); index row J-R31 |
| SCOPE-744 | decision | rationale | J-R32: Chose glyph outlines as SVG's default text over embedded text, keeping the embedded… | rationale file Part A row J-R32 (verbatim); index row J-R32 |
| SCOPE-745 | decision | rationale | J-R33: Chose fate confirmation by token and fate equality (or resubmission with fates fill… | rationale file Part A row J-R33 (verbatim); index row J-R33 |
| SCOPE-746 | decision | rationale | J-R34: Chose a per-viewer `stylePreset` view key over treating the canonical style as a la… | rationale file Part A row J-R34 (verbatim); index row J-R34 |
| SCOPE-747 | decision | rationale | J-R35: Chose first-map budgets as laws of the building count, with the one-second knee and… | rationale file Part A row J-R35 (verbatim); index row J-R35 |
| SCOPE-748 | decision | rationale | J-R36: Chose to state load verification as a law of the log (V = M(B) + Σ c(e) + S14 + 5 m… | rationale file Part A row J-R36 (verbatim); index row J-R36 |
| SCOPE-749 | decision | rationale | J-R37: Chose to let a CI font test pick each face's small-caps and figure path — the face'… | rationale file Part A row J-R37 (verbatim); index row J-R37 |
| SCOPE-750 | decision | rationale | J-R38: Chose to read O3 (d)'s model-time bars over every size a rung builds and to declare… | rationale file Part A row J-R38 (verbatim); index row J-R38 |
| SCOPE-751 | decision | rationale | J-R39: Chose explicit passes on `OrderSlot` with most-specific-wins resolution and refusal… | rationale file Part A row J-R39 (verbatim); index row J-R39 |
| SCOPE-752 | decision | rationale | J-R40: Chose furniture-placement and snap queries answered by the tile worker within one f… | rationale file Part A row J-R40 (verbatim); index row J-R40 |
| SCOPE-753 | decision | rationale | J-R41: Chose a transient display list built in the generation worker for SVG exports and r… | rationale file Part A row J-R41 (verbatim); index row J-R41 |
| SCOPE-754 | decision | rationale | J-R42: Chose a constant stream key for the stamp-tile library — (class, reference spacing,… | rationale file Part A row J-R42 (verbatim); index row J-R42 |
| SCOPE-755 | decision | rationale | J-R43: Chose a declared PLAT CityJSON Extension for `+platGeoAnchor`, validated in CI agai… | rationale file Part A row J-R43 (verbatim); index row J-R43 |
| SCOPE-756 | decision | rationale | J-R44: Chose to keep the derivation pool primary at each size where it runs within its law… | rationale file Part A row J-R44 (verbatim); index row J-R44 |
| SCOPE-757 | decision | rationale | J-R45: Chose a pin pass at placement time — a stop's pins in `moveLabel` order, a pin meet… | rationale file Part A row J-R45 (verbatim); index row J-R45 |
| SCOPE-758 | decision | rationale | J-R46: Chose four fixed classes in the tile worker's queue — queries, incoming deltas and … | rationale file Part A row J-R46 (verbatim); index row J-R46 |
| SCOPE-759 | decision | rationale | J-R47: Chose a transient display list, built by the generation worker and transferred with… | rationale file Part A row J-R47 (verbatim); index row J-R47 |
| SCOPE-760 | decision | rationale | J-R48: Chose one set of four stamp tiles per class at a reference spacing of 4 m, scaled p… | rationale file Part A row J-R48 (verbatim); index row J-R48 |
| SCOPE-761 | decision | rationale | J-R49: Chose a timing phase — every gating CI timing taken last in its tier and alone on t… | rationale file Part A row J-R49 (verbatim); index row J-R49 |
| SCOPE-762 | decision | rationale | J-R50: Chose four seam-compatible stamp tiles per class sharing one border band — the poin… | rationale file Part A row J-R50 (verbatim); index row J-R50 |
| SCOPE-763 | decision | rationale | J-R51: Chose S13b as a resumable placement job — one decision per unit, the local evaluati… | rationale file Part A row J-R51 (verbatim); index row J-R51 |
| SCOPE-764 | decision | rationale | J-R52: Chose integer-centimetre instance positions computed with `dmath` (R_θ from the int… | rationale file Part A row J-R52 (verbatim); index row J-R52 |
| SCOPE-765 | decision | rationale | J-R53: Chose, for a PNG time miss, the None row filter on every row on every host — then z… | rationale file Part A row J-R53 (verbatim); index row J-R53 |
| SCOPE-766 | decision | rationale | J-R54: Chose a light step — the path sun quantised to 15° of azimuth and 5° of altitude — … | rationale file Part A row J-R54 (verbatim); index row J-R54 |
| SCOPE-767 | decision | rationale | J-S1: Chose to tag every acceptance letter C / P / O and to require a P or O letter for ea… | rationale file Part A row J-S1 (verbatim); index row J-S1 |
| SCOPE-768 | decision | rationale | J-S2: Chose a written, blind side-by-side protocol with the owner as the declared rater ov… | rationale file Part A row J-S2 (verbatim); index row J-S2 |
| SCOPE-769 | decision | rationale | J-S3: Chose to give every threshold a number now, with a confirming milestone and a pre-de… | rationale file Part A row J-S3 (verbatim); index row J-S3 |
| SCOPE-770 | decision | rationale | J-S4: Chose byte identity for Regenerate (keep settings) and, for New random, a calibrated… | rationale file Part A row J-S4 (verbatim, amended for SCOPE-C03); index row J-S4 |
| SCOPE-771 | decision | rationale | J-S5: Chose requested-feature delivery by tier and time on MFCG's worst configurations ove… | rationale file Part A row J-S5 (verbatim); index row J-S5 |
| SCOPE-772 | decision | rationale | J-S6: Chose to state the honest 150–200 pw — now 153–204 with the fix-all rounds' componen… | rationale file Part A row J-S6 (verbatim); index row J-S6 |
| SCOPE-773 | decision | rationale | J-S7: Chose to put the editing core before the second preset, split M3 and give the module… | rationale file Part A row J-S7 (verbatim); index row J-S7 |
| SCOPE-774 | decision | rationale | J-S8: Chose implementer inputs = this document plus a checked digest, a separate repositor… | rationale file Part A row J-S8 (verbatim); index row J-S8 |
| SCOPE-775 | decision | rationale | J-S9: Chose a hashed deny-list of non-dictionary tokens, ordered 3-grams, colour values an… | rationale file Part A row J-S9 (verbatim); index row J-S9 |
| SCOPE-776 | decision | rationale | J-S10: Chose a proprietary default licence over leaving the licence undecided or defaultin… | rationale file Part A row J-S10 (verbatim); index row J-S10 |
| SCOPE-777 | decision | rationale | J-S11: Chose FTG's free BIG_TOWN and BIG_CITY sizes and no purchase over a CITY-only FTG c… | rationale file Part A row J-S11 (verbatim); index row J-S11 |
| SCOPE-778 | decision | rationale | J-S12: Chose 1 500 inhabitants as both the base's floor and the village ceiling over a 2 0… | rationale file Part A row J-S12 (verbatim); index row J-S12 |
| SCOPE-779 | decision | rationale | J-S13: Chose modest per-rung granularity and greenery modifiers in one `RungProfile` table… | rationale file Part A row J-S13 (verbatim); index row J-S13 |
| SCOPE-780 | decision | rationale | J-S14: Chose to put economy, personality, stats and the family tree in the module with bas… | rationale file Part A row J-S14 (verbatim); index row J-S14 |
| SCOPE-781 | decision | rationale | J-S15: Chose IM FELL Great Primer as the default label face over a different serif chosen … | rationale file Part A row J-S15 (verbatim); index row J-S15 |
| SCOPE-782 | decision | rationale | J-S16: Chose three CI tiers with fixed wall-clock budgets over one full run per change — b… | rationale file Part A row J-S16 (verbatim); index row J-S16 |
| SCOPE-783 | decision | rationale | J-S17: Chose to resample curves at 10 m and compare junction-to-junction runs over per-ver… | rationale file Part A row J-S17 (verbatim); index row J-S17 |
| SCOPE-784 | decision | rationale | J-S18: Chose MFCG's input idiom, stated in an editable keymap, over leaving hotkeys unstat… | rationale file Part A row J-S18 (verbatim); index row J-S18 |
| SCOPE-785 | decision | rationale | J-S19: Chose WCAG 2.2 AA for the app's chrome with the gazetteer and "features in view" li… | rationale file Part A row J-S19 (verbatim); index row J-S19 |
| SCOPE-786 | decision | rationale | J-S20: Chose to let a panel the owner has not rated continue the build with the milestone'… | rationale file Part A row J-S20 (verbatim); index row J-S20 |
| SCOPE-787 | decision | rationale | J-S21: Chose to ship candidate 1 as the `house` sheet — selectable, never the default — wh… | rationale file Part A row J-S21 (verbatim); index row J-S21 |
| SCOPE-788 | decision | rationale | J-S22: Chose machine-readable shift, cascade, milestone, parity and D-5 records inside `pl… | rationale file Part A row J-S22 (verbatim); index row J-S22 |
| SCOPE-789 | decision | rationale | J-S23: Chose to declare a moved placement digest as an S13b view shift that bumps the styl… | rationale file Part A row J-S23 (verbatim); index row J-S23 |
| SCOPE-790 | decision | rationale | J-S24: Chose `labels ← render` with the renderer's symbol extents and display-list index p… | rationale file Part A row J-S24 (verbatim); index row J-S24 |
| SCOPE-791 | decision | rationale | J-S25: Chose FTG's turning per 100 m as a *target* for organic presets with the row's decl… | rationale file Part A row J-S25 (verbatim); index row J-S25 |
| SCOPE-792 | decision | rationale | J-S26: Chose to mark a letter *not achieved* — entered in `known-defects.json`, never cite… | rationale file Part A row J-S26 (verbatim); index row J-S26 |
| SCOPE-793 | decision | rationale | J-S27: Chose to key town-level draws and per-document furniture (the compass, the emblem) … | rationale file Part A row J-S27 (verbatim); index row J-S27 |
| SCOPE-794 | decision | rationale | J-S28: Chose to generate METROPOLIS from M1 — the rung is a `ladder.json` row on the one p… | rationale file Part A row J-S28 (verbatim); index row J-S28 |
| SCOPE-795 | decision | rationale | J-S29: Chose `H32(s)` = the first output word of MurmurHash3's x86 128-bit variant over th… | rationale file Part A row J-S29 (verbatim); index row J-S29 |
| SCOPE-796 | decision | rationale | J-S30: Chose 800 regenerated scopes per nightly faithfulness campaign over 400 — because a… | rationale file Part A row J-S30 (verbatim); index row J-S30 |
| SCOPE-797 | decision | rationale | J-S31: Chose to extend §6.5's allowlist lint to the renderer code that feeds S13b — the `O… | rationale file Part A row J-S31 (verbatim); index row J-S31 |
| SCOPE-798 | decision | rationale | J-S32: Chose scripted document checks before M-1 — identifiers, colour values, token 3-gra… | rationale file Part A row J-S32 (verbatim); index row J-S32 |
| SCOPE-799 | decision | rationale | J-S33: Chose one FTG pair per FTG capture at the rung's matched size — each capture used o… | rationale file Part A row J-S33 (verbatim); index row J-S33 |
| SCOPE-800 | decision | rationale | J-S34: Chose, for M5's panel against NG, five seeded pairs for each of NG's four templates… | rationale file Part A row J-S34 (verbatim, amended for VS5-2); index row J-S34 |
| SCOPE-801 | decision | rationale | J-S35: Chose to add a list check — a line holding five or more members of one list recorde… | rationale file Part A row J-S35 (verbatim); index row J-S35 |
| SCOPE-802 | decision | rationale | J-S36: Chose to carry the same list check into M-1's hashed deny-list — per reference list… | rationale file Part A row J-S36 (verbatim); index row J-S36 |
| SCOPE-803 | decision | rationale | J-S37: Chose to measure memory under load verification, and the edit made while it runs, a… | rationale file Part A row J-S37 (verbatim); index row J-S37 |
| SCOPE-804 | decision | rationale | J-S38: Chose an optional `at` on `EditEngine.rebase` — the log head by default, `h₀` when … | rationale file Part A row J-S38 (verbatim); index row J-S38 |
| SCOPE-805 | decision | rationale | J-S39: Chose to extend the table check with a cell count — every row has its header's numb… | rationale file Part A row J-S39 (verbatim); index row J-S39 |
| SCOPE-806 | decision | rationale | J-S40: Chose to build the `.plat` writer and reader for generated towns at M1 — the manife… | rationale file Part A row J-S40 (verbatim, amended for VS5-1); index row J-S40 |
| SCOPE-807 | decision | rationale | J-S41: Chose to generate the PLAT side of an FTG pair at the capture's recorded population… | rationale file Part A row J-S41 (verbatim); index row J-S41 |
| SCOPE-808 | decision | rationale | J-S42: Chose `SquareFabric`'s `void` mode for NG's `square` pairs and as the default of II… | rationale file Part A row J-S42 (verbatim); index row J-S42 |
| SCOPE-809 | decision | rationale | J-S43: Chose to widen the fix-all line by 3–4 pw for the six new components rounds 4 and 5… | rationale file Part A row J-S43 (verbatim); index row J-S43 |
| SCOPE-810 | decision | rationale | J-I1: Chose one quarter merge tree, built by S6 with one cost (combined area, + 1 000 ha a… | rationale file Part A row J-I1 (verbatim); index row J-I1 |
| SCOPE-811 | decision | rationale | J-I2: Chose no preview at any rung over the pipeline draft's METROPOLIS-only block preview… | rationale file Part A row J-I2 (verbatim); index row J-I2 |
| SCOPE-812 | decision | rationale | J-I3: Chose label placement as view data at every band (S13b) over eager city-band placeme… | rationale file Part A row J-I3 (verbatim); index row J-I3 |
| SCOPE-813 | decision | rationale | J-I4: Chose to make every entity schema reach geometry only through the kernel's views and… | rationale file Part A row J-I4 (verbatim); index row J-I4 |
| SCOPE-814 | decision | rationale | J-I5: Chose one travel-cost field for all growth stages — computed at S3 on the solved gat… | rationale file Part A row J-I5 (verbatim); index row J-I5 |
| SCOPE-815 | decision | rationale | J-I6: Chose furlong-sized field faces in the model with open-field strips as render-time s… | rationale file Part A row J-I6 (verbatim); index row J-I6 |
| SCOPE-816 | decision | rationale | J-I7: Chose to keep the rendering area's shadow budget (≤ 20 % of a tile's raster time) an… | rationale file Part A row J-I7 (verbatim); index row J-I7 |
| SCOPE-817 | decision | rationale | J-I8: Chose to re-derive the kernel's range bound at the population cap (120 000; ≈ 6× hea… | rationale file Part A row J-I8 (verbatim); index row J-I8 |
| SCOPE-818 | decision | rationale | J-I9: Chose to build, in one eager shared-edge step (S10 (0)) on the generation worker aft… | rationale file Part A row J-I9 (verbatim); index row J-I9 |
| SCOPE-819 | decision | rationale | J-I10: Chose to adopt the pipeline's local coarse insertion as the kernel's clear regions … | rationale file Part A row J-I10 (verbatim); index row J-I10 |
| SCOPE-820 | decision | rationale | J-I11: Chose to dissolve, after an edge removal, only degree-2 vertices carrying the kerne… | rationale file Part A row J-I11 (verbatim); index row J-I11 |
| SCOPE-821 | decision | rationale | J-I12: Chose the deck span of every bridge to be the carrying way's own L1 edge between th… | rationale file Part A row J-I12 (verbatim); index row J-I12 |
| SCOPE-822 | decision | rationale | J-I13: Chose one preparation list for every coarse insertion — deck bank vertices (`deck_e… | rationale file Part A row J-I13 (verbatim); index row J-I13 |
| SCOPE-823 | decision | rationale | J-I14: Chose to count a load verification's replay model in the place of the pool's frozen… | rationale file Part A row J-I14 (verbatim); index row J-I14 |
| SCOPE-824 | decision | rationale | J-I15: Chose the kernel's naming for the points where S1's water operator meets a wall or … | rationale file Part A row J-I15 (verbatim); index row J-I15 |
| SCOPE-825 | decision | rationale | J-I16: Chose the pipeline's levels for the frame lines — the arena's outer ring an L0 `mar… | rationale file Part A row J-I16 (verbatim); index row J-I16 |
| SCOPE-826 | decision | rationale | J-I17: Chose to carry NP3-4's crossing-site state into S1's water operator — an old unused… | rationale file Part A row J-I17 (verbatim); index row J-I17 |
| SCOPE-827 | decision | rationale | J-I18: Chose to split the writers of a deck's `deck_end` rows by the water they are placed… | rationale file Part A row J-I18 (verbatim, amended for NP5-2 / CF-PIPE-10); index row J-I18 |
| SCOPE-828 | decision | rationale | J-I19: Chose to have the schema transform that adds `recordsDigest` drop the `model` of a … | rationale file Part A row J-I19 (verbatim, amended for VS5-1); index row J-I19 |
| SCOPE-C01 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C02 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C03 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C04 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C05 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C06 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C07 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C08 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C09 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C10 | — | conflict |  | conflict record — resolved as §4 of this report states |
| SCOPE-C11 | — | conflict |  | conflict record — resolved as §4 of this report states |
