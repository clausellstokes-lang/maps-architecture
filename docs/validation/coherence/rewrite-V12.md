# Rewrite — design volume V12 (calibration, reconciliation and parity measurement)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V12; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V12`; started 2026-10-03 in the cloud checkout — the disk held no V12 rewrite file)
- P1 inputs gathered (canon unit V12, its 10 conflicts, 34 f items, g 111–113 parts, W-IF-04/05, E-20/E-24/E-35/E-37/E-38, ID-BCR/ID-JT/ID-WX, 11 hand-offs, 2 disagreements, 40 U + 11 T edges, 17 combinations, 34 open findings, inventory 403 ids, the landed base parts' and volumes' cross-part notes to V12): done
- P2 head, §0, §1, §1b: done (parts 00-head, 01-s0, 02-s1, 03-s1b)
- P3 §2: done (parts 04-s2a, 05-s2b, 06-s2c)
- P4 §3.1–§3.6b: done (parts 07-s3a, 08-s3b)
- P5 §3.7–§3.11: done (parts 09-s3c, 10-s3d, 11-s3e)
- P6 §3.12–§3.14, §3.15 edges: done (parts 12-s3f, 13-s3g)
- P7 §4–§6: done (part 14-s4-6)
- P8 §7: done (part 15-s7)
- P9 §8–§13, integration notes: done (parts 16-s8, 17-s9, 18-s10-13)
- P10 assemble, verify ids, references, terms, sizes: done
- P11 report, result file, LANDED: done

Source: `docs/volumes/V12-calibration.md` (3 566 lines). Output: `docs/validation/coherence/new/volumes/V12-calibration.md`
(2 994 lines), assembled in order from `docs/validation/coherence/work/rewrite-V12/parts/00-head.md` … `18-s10-13.md`.
The title line and the section structure (§0, §1, §1b, §2.1 – §2.13, §3.1 – §3.14, §4 – §13, Integration notes) are kept;
two subsections are added, V12 §2.14 (the trial's findings, g item 112) and V12 §3.15 (edges, principle (11)). One marker
line.

## 1 Sizes and the shrink goal

| | words (whitespace split, the canon's count) | bytes | KiB |
|---|---|---|---|
| before | 76 414 | 482 479 | 471.2 |
| after | 69 259 | 429 191 | 419.1 |
| change | −7 155 (−9.4 %) | −53 288 (−11.0 %) | |

The band set for this unit is 45 848 – 57 310 words; the result lies **above it** (a cut of 9.4 %, not 25 – 40 %).

| part | before | after | change | source of the change |
|---|---|---|---|---|
| head | 1 548 | 243 | −1 305 | five stacked banners, the revision and reconciliation ledgers and the reading notes out; one marker line and *How to read this volume* kept |
| §0 | 1 050 | 916 | −134 | narration ids out; J122's sittings in plain words |
| §1 | 1 423 | 1 249 | −174 | the hooks cite the base by item; the out-of-scope list tightened |
| §1b | 2 486 | 1 715 | −771 | the record rows' producers and consumers moved to V12 §2.11 (E-35); critique and round ids out; the trial intake and the item-111/113 indicators added |
| §2 | 10 754 | 11 875 | +1 121 | `MetricUnit` (E-37); `EvidenceFile` (W-IF-04/05); `D5PairStaged`; `NoOpPin` generalised (E-20); §2.11 the one lifecycle table with a consumers column; §2.14 `TrialFinding` (+520) |
| §3 | 27 852 | 32 009 | +4 157 | §3.15 edges (+2 140); §3.6b item 111 (d)'s bars and item 113 (e)'s `exactStates` (+677); §3.7.8 the pin table and landing rules (+478); §3.9.1 J122's batch (+253); §3.11 the lines for items 111 and 113 and the style threshold's "no entry"; restatements cut (palette ends cite §8.2; off values cite V11 §3.24.0; minima cite V11 §3.24.2 row 80) |
| §4 – §6 | 3 122 | 3 502 | +380 | §4.4 the inspector and the clerk read `dist/evidence.json`; §6 the replay budget (item 113) and the trial intake |
| §7 | 4 620 | 5 509 | +889 | T-V12-42 – T-V12-48 (+799); T-V12-15 restated in the rank rule |
| §8 | 1 643 | 1 837 | +194 | J122's slot and order (V-M0 after M0; after M4 four streams; M-CAL after M6-sky); items 111 – 113 inside their steps |
| §9 | 7 628 | 7 464 | −164 | narration and seam tags out of 83 rows, one E-24 mark each; J-V12.69 – J-V12.80 cite V12 §3.11 for their mechanisms; J-V12.84 – J-V12.91 added (+834) |
| §10 | 6 489 | 433 | −6 056 | 22 request texts become one pointer table BCR-V12-n → file f item → base section |
| §11 | 357 | 163 | −194 | Q-V12-1 – Q-V12-3 answered by J122 |
| §12 | 2 918 | 770 | −2 148 | lane records out; the PLAUSIBLE list kept |
| §13 | 4 113 | 1 437 | −2 676 | round history out; the Fix list empty; hand-offs closed both ways as two tables |
| Integration notes | 191 | 137 | −54 | IN-V12-1 – IN-V12-4 folded at their homes; one pointer paragraph |
| Finalization | 220 | 0 | −220 | narration |

**Above the band, and why.** The gross cut is ≈ 14 200 words (18.6 % of the source): narration ≈ 13 400 (the head, §10's
request texts, §12's and §13's lane records, the finalization block, 404 `SCC-` and 35 `V12C-` tags, 216 "round n" and
119 "reconciliation round" mentions, 38 seam tags) and restatement ≈ 800. ≈ 7 000 words of required new design were added
at build depth, which the shrink goal yields to: V12 §3.15 (2 140; principle (11): 40 UNDEFINED and 11 UNTESTED edges, 17
owned combinations), g item 112 (b)'s V12 §2.14 (520), g items 111 and 113's bars, register lines and pins (≈ 1 400 across
§3.6b, §3.7.8, §3.11), J122's batch (≈ 250), E-35's lifecycle table, E-20's pin table, W-IF-04/05's `EvidenceFile`, tests
T-V12-42 – T-V12-48 (799) and decisions J-V12.84 – J-V12.91 (834). What remains is V12's own build-depth content, stated
once: the metric catalogue (§3.4.2, ≈ 3 600 words of metric rows), the register's lines (§3.11, ≈ 7 000 words: every
calibratable column of every volume with its method, due, metric and fallback), the bar map (§3.6b), 48 tests and 91
decisions with their alternatives and reasons. The source's body held little restatement; its narration sat in the head,
§10, §12 and §13, all removed. Precedent: V04 −11.5 %, V06 −11.7 %, V07 −12.5 %.

## 2 Decisions taken by this editor (each for the adjudicator to confirm)

1. **G-lot kept where it names the references' own parcels.** The metric ids `lots.r4.*`, `lots.wallAlign`,
   `blockc.lotsPer` and the words "MFCG's lots", "NG's parcels", "lot outlines" (spike S-V12-2) name the reference
   generators' records, not our `BuildingInput.plot`; renaming would break stable metric ids (V12 §2.1: "never reused")
   and mis-describe the references. V12 §3.4.2 says so once beside the ids. The ten remaining hits are each of this kind.
2. **Conflict ids out of the body.** V12-XCONF-1 – 5 and V12-ICONF-1 are written as rules at their homes, citing the home
   they agree with (§4.1, §7.6, J122, J-V12.60, V11 §3.24.7 (3)), never the conflict id; the ids live only in this report.
3. **E-35's split.** V12 §2.11's lifecycle table is the one producer/consumer table for every *record*; V12 §1b keeps the
   rows for engines, commands, profiles and metric families (no record of their own) and cites §2.11 once. Every producer
   and consumer the source's §1b listed has one home (the mapping table's 1b rows).
4. **The style check's threshold takes no register entry.** V11's rewrite makes `cvd.minDeltaE2000` `calibratable: false`
   (V11 row 52); a trial finding against it routes to a known-defects entry and the authoring table's version of row 52
   (V12 §2.14 (4), §3.11), not to a register line.
5. **The oasis enters `MeasureFeature` as `lake`.** The base's §2.3 makes an oasis a pond or lake `WaterBody` with a
   `spring`; the water class union stays `'sea' | 'river' | 'lake'` and item 111's indicators read the spring flag.
6. **`aqueduct.dossierFactor`'s withdrawal note left out** of V12 §3.11's raised-way line as history; V11 holds no such
   cell, so nothing in V12 names it.
7. **Registered stage ids.** V12 §2.1's `stages` list names S5a – S5d and S12a – S12b (hinterland and greenery: the
   `field`, `green` and `tree` kinds); S12c (character) carries no measured kind, so no metric names it; bare `S12` is gone.
8. **J-V12.69 – J-V12.80 compressed** to cite V12 §3.11's named paragraphs for their mechanisms; every alternative ("over …")
   and every reason ("because …") is kept.

## 3 Conflicts resolved (10)

| conflict | ruling applied | where |
|---|---|---|
| SCOPE-C14 | Q-V12-1 answered no (J122); METROPOLIS stays compared with MFCG size 130, FTG's metropolis pictures an unscored card | V12 §11 (1), §3.4.4 |
| V12-ICONF-1 | §3.7.6's raised-way bump carries the water-system record — its met need, cap step and cistern terminal (V11 §3.24.7 (3)) | V12 §3.7.6 |
| V12-ICONF-2 | the stale §13 sentence leaves with the narration; the met-need reading governs | V12 §13 |
| V12-XCONF-1 | J122's sittings: only M1 (the look check), M2b, M4, M5, batched, about an hour; a staged panel joins the next gating sitting or stays *provisional — not rated* | V12 §0, §3.9.1 (J-V12.84), §6, §8.3 risk 6, §11 (2) |
| V12-XCONF-2 | the pinning hash defined once at §7.6; V12 cites it | V12 §2.10 |
| V12-XCONF-3 | metric stages are registered StageIds (S5a – S5d, S12a – S12b; `S5` by V11's group expansion); `S12` dropped | V12 §2.1 (`stages`) |
| V12-XCONF-4 | `servedShare` over every district (V11 §2.3's unit, no threshold); ≥ 30 households only for 105 (k)'s dispersal reading | V12 §2.7, §3.6, J-V12.60 |
| V12-XCONF-5 | BCR-V12-4's base text cites J122's decision (V12 §3.10.6's per-frame sitting rule) | V12 §10 (item 504), §3.10.6 |
| CANON-C03 | §11 a table of answered questions (J122) | V12 §11 |
| CANON-C04 | INDEX §7's V12 items closed here; §13 holds no open item | V12 §13 |

The two agreement disagreements are settled with them: T-V6-62 with V11 (V11-XCONF-1: `stateSnapCm` its own line on
`bar.T-V6-62`, V12 §3.11, J-V12.82) and T-V11-18 with V11 (V12-XCONF-4 above).

## 4 File f items cited as base text (38) and the g items' parts

**The 34 items the canon routes to V12, each cited, none restated:** 229, 291, 376, 377, 381, 382, 447, 456, 488, 489, 491,
492, 493, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 521, 522, 529, 533, 535, 536, 537, 568, 569, 575, 584 — plus
244, 245 and 290 (the raised-way span and slide bounds, the raised-way milestone) and 534 (the crossing). V12 §10 is a
pointer table: BCR-V12-1 → 496, -2 → 497, -3 → 503, -4 → 504, -5 → 381, -6 → 500, -7 → 491, -8 → 535, -9 → 533 (totals
568), -10 → 521, -11 → 569, -12 → 501, -13 → 488, -14 → 502, -15 → 447, -16 → 489, -17 → 447, -18 → 536, -19 → 492,
-20 → 493, -21 → 537, -22 → 382; the request texts (6 056 words) are gone.

**g item 111 (water), V12's parts at build depth:** register lines for the climate rows' item-111 cells (`measure` at M1,
then M2b, then the corpus possibility) and the oasis, pull and spring cells (V12 §3.11); the indicators `walkWater`,
`waterPresent`, `richNearWater` (V12 §2.7b) and the metric `water.walk` (V12 §3.4.2); T111-1 (`higherWith`, arid against
temperate on the same seeds, households deflated by the design effect), T111-3 (`rate` per water kind against the arid
row's chance cell), T111-4 (`most` over arid towns) as V12 §3.6b specs (J-V12.86); the pin `item111.water` (T111-5);
T-V12-42.

**g item 112 (b) (the trial), V12's parts:** `TrialFinding` and the intake `plat calibrate trial` (V12 §2.14; J-V12.88): an
owner question for a finding against an owner rule, a trial row on every register entry a finding's cells name, a
`known-defects.json` entry for every unrouted finding and every blocker or major; the style check's line "no entry"
(V11 row 52 non-calibratable); `GmTrialRecord.findings` typed `TrialFinding[]` (V09 §7.6); T-V12-44.

**g item 113 (history), V12's parts:** T113-1 – T113-4 and T113-6 on the conformance list; item 113 (e)'s lost-access
property as the `exactStates` rule on the step runner with access steps, `undo` and `saveReload` (V12 §2.7b, §3.6b;
J-V12.87; T-V4-77, T113-5); the replay budget (V12 §6, cited at V06 §6.7); `void.*` gains the excavation reading; the
history rows' register line at `V6-E9` (V12 §3.11); the pin `item113.history` (T113-7); T-V12-43.

## 5 Wiring gaps closed

* **W-IF-04** (V09's cell inspector) and **W-IF-05** (V10's clerk): both read each cell's register status from the shipped
  `dist/evidence.json`, typed `EvidenceFile` (V12 §2.10): `entries` (one summary per register entry — method, due, what it
  is measured against, its latest history) and `cells` (status, evidence ids, `ownerRule`), never `plat/calibration/`;
  written by V11's compiler (V12 §13's hand-off), read by V09 §4.14 and V10 §2.13; J-V12.90; T-V12-21.

## 6 Elegance rulings applied (equivalence lists ticked)

* **E-20 (one convention; every no-op pin a `NoOpPin`):** V12 §2.13 types one `NoOpPin` (`id` `item<n>.<family>`, `bar`,
  the overlay copied from the home cells); V12 §3.7.8 holds the pin table (`item102.sun` T102-1, `item103.coverage` T103-3,
  `item105.web` T105-4, `item106.barrier` T106-5, `item107.balance` T107-4, `item109.underground` T109-6,
  `item110.raised`/`terrace`/`deck`/`stepped` T110-7, `item111.water` T111-5, `item113.history` T113-7) and the
  landing-gate and off-state-set rules (J-V12.85); T-V12-45.
  ☑ the owner-rules copy's registry path-test list — §13.2's, cited (§13.2's convention (5)), not restated;
  ☑ the declared-shift clause for goldens — V12 §3.7.8 (2): the landing change's suites byte-identical under the overlay;
  a switch-on bump a declared `ShiftRecord` (V12 §3.7.6);
  ☑ each item's off-form cell values (V11 §3.24.0, V11 §3.7.4) and its bar id — the table's bar column, the off values
  cited at their homes, never restated.
* **E-24 (one mark):** every amended row carries one "(amended by X)" mark (9 rows); no superseded row exists.
  ☑ no row dropped (J-V12.1 – J-V12.83 kept, J-V12.84 – J-V12.91 added); ☑ the governing row keeps the reason.
* **E-35 (one producer/consumer table):** V12 §2.11's lifecycle table carries create (producer), read (consumers),
  persist, regenerate, undo, migrate for every record; V12 §1b cites it and wires the non-record pieces.
  ☑ every producer and consumer listed in the source (the source's 46 §1b rows each mapped below, none lost).
* **E-37 (one unit vocabulary):** `MetricUnit = Extract<Unit, 'm'|'m2'|'ha'|'deg'|'share'|'count'|'perHa'|'perKm'|'ratio'|'bits'|'ms'|'s'|'luma'|'rb'|'chroma'|'z'|'none'>`
  (V12 §2.1). ☑ `deg` (measured angles) kept beside the model's `cdeg`; ☑ `count` kept (V12's subset never held
  `people`); ☑ the subset is exactly the source's 17-unit list.
* **E-38 (territory per head derived):** ☑ the farm rows' values unchanged (V07's); ☑ A_T = households × the per-head sum
  (V07 §3.9 (1), cited); ☑ V12's register: the farm table's village rows are the calibratable cells, the territory per
  head takes no entry (V12 §3.11's default line; T-V12-20's clause).

## 7 Id rulings and renumberings

* **ID-BCR:** V12's requests keep their ids BCR-V12-1 – BCR-V12-22 only as §10's pointer rows; the body cites the file f
  item. Other volumes' requests are cited by their item (447 for BCR-V9-31).
* **ID-JT:** J-T → JT (6).
* **ID-DR:** DR-V8.2 → DR30, DR-V8.3 → DR31, DR-V8.4 → DR32, DR-V8.5 → DR33, DR-V8.7 → DR34, DR-V8.8 → DR35 (14).
* **ID-WX:** volume-local ids cited with their volume (V02 X33, V06 X9 …, V11 §3.24.0's rows, T-V4-n, T-V6-n); base
  sections bare; V12's own sections always "V12 §".
* **New ids:** T-V12-42 – T-V12-48; J-V12.84 – J-V12.91. Spikes S-V12-1 – S-V12-4 unchanged. Narration ids out: `SCC-*`,
  `V12C-*`, IN-V12-1 – 4 (folded), conflict ids. No existing id renumbered.

## 8 Terms replaced

| term | source hits | new hits | note |
|---|---|---|---|
| G-cite (`V4 §`, `V6 §`, `V1-x.y` …) | 102 | 0 | `Vnn §x.y` throughout (S7) |
| G-DR (`DR-V8.n`) | 14 | 0 | DR30 – DR35 |
| G-JT (`J-T`) | 6 | 0 | JT |
| G-M6U ("M6" for the underground) | 3 | 0 | M6-U; the two remaining pattern hits are V02's stage-3 M6 (the ladder street's panel), correct as written |
| G-lot | 9 | 10 | kept for the references' own parcels (decision 1) |
| the metric `Unit` | — | — | `MetricUnit` (E-37; V12-TERM-2) |
| "the item-110 panel" | — | — | the M4 panel's M4-110 group (V12-TERM-1) |

## 9 Hand-offs closed and the owner questions

**To this volume, closed here (V12 §13's second table):** V02 X33; V06 X9, X19, X31, X38, X49; V11 X-V12-1, X-V11-12,
X-V11-14 (c), X-V11-16 (b), X-V11-17 (f) (the 11 the canon lists) — plus INDEX §7's span-rule entry, V04 (T-V4-76 –
T-V4-79 registered; the `former*` cells on the default line), V01 (T-V1-4 (e) a `NoOpPin`; M5's panel re-offers the MFCG
and FTG side-by-sides on the new default preset, T-V1-32), V07 (E-38; T-V7-58, T-V7-59 pins), scope (`D5PairStaged`),
determinism (the pinning hash), model (E-37).

**From this volume (X-V12-1 – X-V12-19), each closed at its home (V12 §13's first table):** V11 (the compiler, the evidence
file, the content milestones' entries), V02 and V07 (panels on the engine), V03 – V06 (sittings under J122; V04's bars),
V08 (the dossier fixtures), V09 and V10 (W-IF-04/05), every owner's pins, V04's bar parameters, V07's village levels,
`BenchBarDef` for every named bar, the register check at every exit with `--milestone`, the later corpus runs, staged
entries, scope §13.2's conformance list, file f items 244 and 245.

**Owner questions:** Q-V12-1 (no; J122), Q-V12-2 (four gating sittings, batched; J122), Q-V12-3 (historical layers as
defaults only where the sitting passes them; J122) — V12 §11, each read in the body (§3.4.4, §3.9.1, §3.10.6). None of
J121's subjects arises in V12.

## 10 Edges (51) and combinations (17); open findings (34)

**Edges.** V12 §3.15 states general rules — no whole retry; degenerate geometry dropped and counted on reference and corpus
inputs, a profile defect on ours; every rung a setting; the harness's records outside document lifecycle — and a
per-mechanism table for the 51 edges the canon lists (E1 nothing to act on 10, E2 exactly one item 5, E4 degenerate
geometry 9, E5 missing, empty or contradictory data 17, E6 rungs 3, E7 toggles and presets 2, E8 lifecycle 5; 40
UNDEFINED, 11 UNTESTED), each with its outcome, rung and test; J-V12.91; T-V12-47.

**Combinations.** The 17 `<feature>` × presets combinations V12 owns (cliff, steep, river, coast, harbour, moat, bridge,
retaining, oasis, frame, terraced ward, crypt, catacomb, vault, shade, landfall, history) take one rule — a P row is
measured under its reference's preset (§7.6 zeroes `extension` cells), an O or C row under `'default'` — with a
per-family table of what each arm holds (V12 §3.15); T-V12-48.

**Open findings routed here (34), all fixed:** VOL-V11-V12-RESTATEMENTS-011/012 and V12-RESTATE-1/2 (the overlay comment
cites V11 §3.24.0; minima cite V11 §3.24.2 row 80; palette ends cite §8.2); V12-ICONF-1/2 and V12-XCONF-1 – 5 (section 3);
V12-ELEG-1 (E-35); V12-MISSING-1 – 7 (J122's marks and order; g 111/112/113 parts; IN-V12-3's bends folded in §3.6b);
V12-TERM-1/2 (section 8); V12-NARR-1 – 5 (head, §10, §12, §13, body tags); V12-BREF-1/2 (base references by item and
section); V12-HANDOFF-1 (§13's two tables); SCC-109's X-V12-18 clause (the staged-entry row); IN-V12-1 – 4 folded (V12
§3.11, §2.10, §3.4.4, §3.6b, §2.2).

## 11 Closing checks

* Ids: T-V12-1 – T-V12-48 each defined once in §7.1; J-V12.1 – J-V12.91 each once in §9; every `T-V12-n` and `J-V12.n`
  cited resolves; one E-24 mark per amended row.
* References: every "V12 §x" resolves to a heading or numbered paragraph of the new text; every bare `§x` is a base
  section; every "Vnn §x" resolves to a heading of that volume's new text (V01 – V09) or its landed parts (V10, V11; V11
  §3.25 is in V11's rewrite).
* Narration: no `SCC-`, `V12C-`, round, seam, reconciliation-lane, critique-id, PROGRESS or finalization text in the body;
  the `critique_v12_*.out` names that remain are file names of executed evidence in `docs/validation/bench/`.
* Retired terms: section 8.
* `doc_checks.py` (provisional — the corpus is absent, the results not authoritative): C1 9 (source 9), C2 0, C3 163
  (source 189), C4 0, S1 0, S2 167 (source 169; each a V12 or other-volume pointer the base headings cannot resolve).
* Inbound references from the landed new texts (V12 §1b, §2.x, §3.x incl. §3.10.5, §3.7.1 (b)/(c), §3.7.2 (1)/(3)/(4),
  §3.7.8, §3.9.1, §4.2, §5.5, §6, §8, §8.2) all exist.

## 12 Cross-part notes

1. **scope (§13.2, §13.6, §16, INDEX):** §13.2's volume-family row for calibration reads T-V12-1 – T-V12-48; its
   conformance list carries T111-2, T112-1, T113-1 – T113-4, T113-6 and V04's T-V4-76, T-V4-78, T-V4-79 (T-V4-77 and
   T113-5 are V12's `exactStates` specs); §13.6's `D5Pair` closes with V12 §2.8's `D5PairStaged` (FM, VG, DW, AB, SOLO);
   §16's rows and INDEX §3/§4's estimates unchanged (V12 §8 prices items 111 – 113 inside its steps); M-CAL after M6-sky,
   M-SF after M-CAL, as J122 orders them.
2. **V09:** `GmTrialRecord.findings` is `TrialFinding[]` (V12 §2.14); the cell inspector (V09 §4.14) reads
   `dist/evidence.json`'s `entries` summary for a cell's entry (W-IF-04).
3. **V10:** the clerk's provenance answer (V10 §2.13) reads `EvidenceFile` the same way (W-IF-05).
4. **V11:** the compiler writes `EvidenceFile` with its `entries`; V11 §3.17.1's and §3.25's rows take V12 §3.11's lines;
   `cvd.minDeltaE2000` non-calibratable is agreed (no register entry); V11 §3.24.1 cites V12 §3.11's raised-way line;
   `stateSnapCm` its own line on `bar.T-V6-62` (V11-XCONF-1).
5. **V06:** its register lines are dated `V6-E0` – `V6-E9`; T-V6-71 runs over epochs on the step runner; the replay budget
   is cited at V06 §6.7.
6. **V04:** T-V4-77 is an `exactStates` spec with access steps, `undo` and `saveReload`.
7. **V01:** T-V1-4 (e) is a `NoOpPin` on V12 §3.7.8; V12 §3.9.1's M5 row carries T-V1-32's package.
8. **base (rendering, determinism, model):** T112-1 is a `BenchBarDef`; §7.6 holds the pinning hash V12 §2.10 cites; the
   name `MetricUnit` is V12's named subset of §2.1's `Unit` (E-37).
9. **§14 / CLI:** `plat calibrate trial` joins `@plat/testkit`'s calibration commands beside `plat calibrate run` and
   `plat calibrate register`.
10. **Shrink:** −9.4 % (above the band) with ≈ 7 000 mandated words added; see section 1.

## 13 Mapping table — every inventory id of V12 → where it lives now

403 ids, 403 mapped, 0 unmapped. "new home" names the section of the new text that holds the fact; a `bcr-pointer` row
names the file f item and base section that now hold the request's text; a `handoff` row names the row of V12 §13 that
closes it.

| inventory id | kind | old § | role | new home |
|---|---|---|---|---|
| V12-0001 | rule | conv | home | V12 head (*How to read this volume*); the id conventions per ID-WX |
| V12-0002 | summary | 0 | home | V12 §0 |
| V12-0003 | summary | 0 | home | V12 §0 |
| V12-0004 | summary | 0 | home | V12 §0 |
| V12-0005 | summary | 0 | home | V12 §0 |
| V12-0006 | scope | 1 | home | V12 §1 |
| V12-0007 | interface | 1 | reference | V12 §1 (cites base §13.5) |
| V12-0008 | interface | 1 | reference | V12 §1 (cites base §17.1) |
| V12-0009 | rule | 1 | home | V12 §1 |
| V12-0010 | rule | 1 | home | V12 §1 |
| V12-0011 | scope | 1 | home | V12 §1 |
| V12-0012 | wiring | 1b | home | V12 §2.11 (`MetricDef` and `metrics.json` row) |
| V12-0013 | wiring | 1b | home | V12 §2.11 (`MeasureInput` row) |
| V12-0014 | wiring | 1b | home | V12 §1b (`plat measure`) |
| V12-0015 | wiring | 1b | home | V12 §1b (`plat baselines aggregate`) |
| V12-0016 | wiring | 1b | home | V12 §2.11 (`ReferencePin`, `CrossingRecord` rows); fields V12 §2.3 |
| V12-0017 | wiring | 1b | home | V12 §2.11 (`Baseline` row); fields V12 §2.3 |
| V12-0018 | wiring | 1b | home | V12 §1b (the crossing check) |
| V12-0019 | wiring | 1b | home | V12 §1b (seed families) |
| V12-0020 | wiring | 1b | home | V12 §1b (the capture plan) |
| V12-0021 | wiring | 1b | home | V12 §2.11 (`ParityReport` row) |
| V12-0022 | wiring | 1b | home | V12 §1b (`plat parity` and its dashboard) |
| V12-0023 | wiring | 1b | home | V12 §1b (the correlation harness); V12 §2.11 (spec row) |
| V12-0024 | wiring | 1b | home | V12 §1b (`plat calibrate run`); V12 §2.11 (`CalibrationRun` row) |
| V12-0025 | wiring | 1b | home | V12 §1b (`plat calibrate register`); V12 §2.11 (`CalibrationEntry` row) |
| V12-0026 | wiring | 1b | home | V12 §2.11 (evidence, `ownerRule`, `EvidenceFile` row); V12 §2.10 |
| V12-0027 | wiring | 1b | home | V12 §1b (the panel engine); V12 §2.11 (`PanelSpec` row) |
| V12-0028 | wiring | 1b | home | V12 §1b (the sitting page) |
| V12-0029 | wiring | 1b | home | V12 §1b (the drift watch); V12 §2.11 (`ReferencePin` row) |
| V12-0030 | wiring | 1b | home | V12 §1b (the corpus adapter) |
| V12-0031 | wiring | 1b | home | V12 §2.11 (`AnswersFile`, `CorpusMapMeta`, `SampleFrame` row) |
| V12-0032 | wiring | 1b | home | V12 §2.11 (`ReconciliationRecord` row) |
| V12-0033 | wiring | 1b | home | V12 §2.11 (the historical pack row) |
| V12-0034 | wiring | 1b | home | V12 §1b (`plat statbar`); V12 §2.11 (spec row) |
| V12-0035 | wiring | 1b | home | V12 §1b (seed families: the sweep bars) |
| V12-0036 | wiring | 1b | home | V12 §1b (the enclosure profile) |
| V12-0037 | wiring | 1b | home | V12 §1b (the underground profile) |
| V12-0038 | wiring | 1b | home | V12 §1b (`plat calibrate register`); V12 §2.11 (`CalibrationEntry` row) |
| V12-0039 | wiring | 1b | home | V12 §2.11 (evidence, `ownerRule` row); V12 §2.10 |
| V12-0040 | wiring | 1b | home | V12 §2.9 (`ownerExcluded`); V12 §2.11 (`ReconciliationRecord` row) |
| V12-0041 | wiring | 1b | home | V12 §2.11 (`FramesFile` row) |
| V12-0042 | wiring | 1b | home | V12 §1b (crypt and catacomb metrics) |
| V12-0043 | wiring | 1b | home | V12 §1b (the step-script runner) |
| V12-0044 | wiring | 1b | home | V12 §1b (`GuardSet.fixtureSuites` and the TOWN guard) |
| V12-0045 | wiring | 1b | home | V12 §1b (the structure engine); V12 §2.11 (`KnownCityFixture` row) |
| V12-0046 | wiring | 1b | home | V12 §1b (the no-op pin engine); V12 §2.11 (`NoOpPin` row); V12 §3.7.8 pin table |
| V12-0047 | wiring | 1b | home | V12 §1b (the no-op pin engine reads V11 §3.24.0's off forms); V12 §3.7.8 |
| V12-0048 | wiring | 1b | home | V12 §1b (the switch-on bumps) |
| V12-0049 | wiring | 1b | home | V12 §1b (the item-110 kinds and properties) |
| V12-0050 | wiring | 1b | home | V12 §1b (`raised.*`, `retaining.*` …) |
| V12-0051 | wiring | 1b | home | V12 §1b (`crossing.kinds`, `water.needRatio`, `ruin.survival`) |
| V12-0052 | wiring | 1b | home | V12 §1b (the metric families) |
| V12-0053 | wiring | 1b | home | V12 §2.11 (spec row: `BenchBarDef`); V12 §2.1 |
| V12-0054 | wiring | 1b | home | V12 §1b (the raised-way bars `T110b.*`) |
| V12-0055 | wiring | 1b | home | V12 §1b (the M4 panel's M4-110 group) |
| V12-0056 | wiring | 1b | home | V12 §2.11 (`history.jsonl` row) |
| V12-0057 | wiring | 1b | home | V12 §2.11 (`known-defects.json` row); V12 §3.12 |
| V12-0058 | rule | 1b | home | V12 §1b (the dossier table) |
| V12-0059 | table | 1b | home | V12 §1b (the dossier table) |
| V12-0060 | rule | 2 | home | V12 §2 |
| V12-0061 | type | 2.1 | home | V12 §2.1 |
| V12-0062 | type | 2.1 | home | V12 §2.1 |
| V12-0063 | rule | 2.1 | home | V12 §2.1 |
| V12-0064 | rule | 2.1 | home | V12 §2.1 |
| V12-0065 | rule | 2.1 | home | V12 §2.1 |
| V12-0066 | type | 2.1 | home | V12 §2.1 |
| V12-0067 | type | 2.1 | home | V12 §2.1 |
| V12-0068 | type | 2.2 | home | V12 §2.2 |
| V12-0069 | type | 2.2 | home | V12 §2.2 |
| V12-0070 | rule | 2.2 | home | V12 §2.2 |
| V12-0071 | rule | 2.2 | home | V12 §2.2 |
| V12-0072 | rule | 2.2 | home | V12 §2.2 |
| V12-0073 | rule | 2.2 | home | V12 §2.2 |
| V12-0074 | rule | 2.2 | home | V12 §2.2 |
| V12-0075 | rule | 2.2 | home | V12 §2.2 |
| V12-0076 | type | 2.3 | home | V12 §2.3 (the file); `Baseline`'s added fields are item 496's base text (§13.5) |
| V12-0077 | type | 2.4 | home | V12 §2.4 |
| V12-0078 | table | 2.4 | home | V12 §2.4 |
| V12-0079 | rule | 2.4 | home | V12 §2.4 |
| V12-0080 | type | 2.5 | home | V12 §2.5 |
| V12-0081 | type | 2.5 | home | V12 §2.5 |
| V12-0082 | type | 2.6 | home | V12 §2.6 |
| V12-0083 | rule | 2.6 | home | V12 §2.6 |
| V12-0084 | rule | 2.6 | home | V12 §2.6 |
| V12-0085 | type | 2.7 | home | V12 §2.7 |
| V12-0086 | type | 2.7 | home | V12 §2.7 |
| V12-0087 | rule | 2.7 | home | V12 §2.7 |
| V12-0088 | type | 2.7b | home | V12 §2.7b |
| V12-0089 | type | 2.7b | home | V12 §2.7b |
| V12-0090 | type | 2.7b | home | V12 §2.7b |
| V12-0091 | type | 2.8 | home | V12 §2.8 |
| V12-0092 | type | 2.8 | home | V12 §2.8 |
| V12-0093 | rule | 2.8 | home | V12 §2.8 |
| V12-0094 | type | 2.9 | home | V12 §2.9 |
| V12-0095 | type | 2.9 | home | V12 §2.9 |
| V12-0096 | rule | 2.10 | home | V12 §2.10 |
| V12-0097 | rule | 2.10 | home | V12 §2.10 |
| V12-0098 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0099 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0100 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0101 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0102 | type | 2.12 | home | V12 §2.12 |
| V12-0103 | type | 2.13 | home | V12 §2.13 (type); the off values cited at V11 §3.24.0 and V11 §3.7.4, stated once there (E-20); the pin table V12 §3.7.8 |
| V12-0104 | mechanism | 3.1 | home | V12 §3.1 |
| V12-0105 | rule | 3.2.1 | home | V12 §3.2.1 |
| V12-0106 | rule | 3.2.1 | home | V12 §3.2.1 |
| V12-0107 | rule | 3.2.2 | home | V12 §3.2.2 |
| V12-0108 | rule | 3.2.3 | home | V12 §3.2.3 |
| V12-0109 | rule | 3.2.4 | home | V12 §3.2.4 |
| V12-0110 | mechanism | 3.3 | home | V12 §3.3 |
| V12-0111 | rule | 3.3 | home | V12 §3.3 |
| V12-0112 | rule | 3.4.1 | home | V12 §3.4.1 |
| V12-0113 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0114 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0115 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0116 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0117 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0118 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0119 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0120 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0121 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0122 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0123 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0124 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0125 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0126 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0127 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0128 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0129 | rule | 3.4.3 | home | V12 §3.4.3 |
| V12-0130 | table | 3.4.4 | home | V12 §3.4.4 |
| V12-0131 | rule | 3.4.4 | home | V12 §3.4.4 |
| V12-0132 | rule | 3.5.1 | home | V12 §3.5.1 |
| V12-0133 | rule | 3.5.2 | home | V12 §3.5.2 |
| V12-0134 | rule | 3.5.3 | home | V12 §3.5.3 |
| V12-0135 | rule | 3.5.4 | home | V12 §3.5.4 |
| V12-0136 | mechanism | 3.5.5 | home | V12 §3.5.5 |
| V12-0137 | rule | 3.5.6 | home | V12 §3.5.6 |
| V12-0138 | rule | 3.6 | home | V12 §3.6 |
| V12-0139 | mechanism | 3.6 | home | V12 §3.6 |
| V12-0140 | rule | 3.6 | home | V12 §3.6 |
| V12-0141 | number | 3.6 | home | V12 §3.6 |
| V12-0142 | rule | 3.6 | home | V12 §3.6 |
| V12-0143 | rule | 3.6 | home | V12 §3.6 |
| V12-0144 | rule | 3.6 | home | V12 §3.6 |
| V12-0145 | rule | 3.6 | home | V12 §3.6 |
| V12-0146 | mechanism | 3.6b | home | V12 §3.6b |
| V12-0147 | rule | 3.6b | home | V12 §3.6b |
| V12-0148 | rule | 3.6b | home | V12 §3.6b |
| V12-0149 | rule | 3.6b | home | V12 §3.6b |
| V12-0150 | rule | 3.6b | home | V12 §3.6b |
| V12-0151 | rule | 3.6b | home | V12 §3.6b |
| V12-0152 | rule | 3.6b | home | V12 §3.6b |
| V12-0153 | rule | 3.6b | home | V12 §3.6b |
| V12-0154 | rule | 3.6b | home | V12 §3.6b |
| V12-0155 | table | 3.6b | home | V12 §3.6b |
| V12-0156 | table | 3.6b | home | V12 §3.6b |
| V12-0157 | table | 3.6b | home | V12 §3.6b |
| V12-0158 | table | 3.6b | home | V12 §3.6b |
| V12-0159 | rule | 3.6b | home | V12 §3.6b |
| V12-0160 | rule | 3.6b | home | V12 §3.6b |
| V12-0161 | rule | 3.7.1 | home | V12 §3.7.1 |
| V12-0162 | rule | 3.7.2 | home | V12 §3.7.2 |
| V12-0163 | rule | 3.7.2 | home | V12 §3.7.2 |
| V12-0164 | rule | 3.7.3 | home | V12 §3.7.3 |
| V12-0165 | rule | 3.7.4 | home | V12 §3.7.4 |
| V12-0166 | rule | 3.7.5 | home | V12 §3.7.5 |
| V12-0167 | mechanism | 3.7.6 | home | V12 §3.7.6 |
| V12-0168 | rule | 3.7.6 | home | V12 §3.7.6 |
| V12-0169 | rule | 3.7.7 | home | V12 §3.7.7 |
| V12-0170 | rule | 3.7.8 | home | V12 §3.7.8 |
| V12-0171 | rule | 3.8 | home | V12 §3.8 |
| V12-0172 | table | 3.9.1 | home | V12 §3.9.1 |
| V12-0173 | rule | 3.9.1 | home | V12 §3.9.1 |
| V12-0174 | mechanism | 3.9.2 | home | V12 §3.9.2 |
| V12-0175 | rule | 3.9.3 | home | V12 §3.9.3 |
| V12-0176 | rule | 3.9.4 | home | V12 §3.9.4 |
| V12-0177 | rule | 3.9.5 | home | V12 §3.9.5 |
| V12-0178 | rule | 3.10.1 | home | V12 §3.10.1 |
| V12-0179 | rule | 3.10.2 | home | V12 §3.10.2 |
| V12-0180 | rule | 3.10.3 | home | V12 §3.10.3 |
| V12-0181 | rule | 3.10.3 | home | V12 §3.10.3 |
| V12-0182 | rule | 3.10.4 | home | V12 §3.10.4 |
| V12-0183 | rule | 3.10.5 | home | V12 §3.10.5 |
| V12-0184 | rule | 3.10.6 | home | V12 §3.10.6 |
| V12-0185 | rule | 3.10.7 | home | V12 §3.10.7 |
| V12-0186 | rule | 3.11 | home | V12 §3.11 |
| V12-0187 | rule | 3.11 | home | V12 §3.11 |
| V12-0188 | table | 3.11 | home | V12 §3.11 |
| V12-0189 | table | 3.11 | home | V12 §3.11 |
| V12-0190 | table | 3.11 | home | V12 §3.11 |
| V12-0191 | table | 3.11 | home | V12 §3.11 |
| V12-0192 | table | 3.11 | home | V12 §3.11 |
| V12-0193 | table | 3.11 | home | V12 §3.11 |
| V12-0194 | table | 3.11 | home | V12 §3.11 |
| V12-0195 | table | 3.11 | home | V12 §3.11 |
| V12-0196 | table | 3.11 | home | V12 §3.11 |
| V12-0197 | table | 3.11 | home | V12 §3.11 |
| V12-0198 | table | 3.11 | home | V12 §3.11 |
| V12-0199 | table | 3.11 | home | V12 §3.11 |
| V12-0200 | table | 3.11 | home | V12 §3.11 |
| V12-0201 | table | 3.11 | home | V12 §3.11 |
| V12-0202 | table | 3.11 | home | V12 §3.11 |
| V12-0203 | table | 3.11 | home | V12 §3.11 |
| V12-0204 | table | 3.11 | home | V12 §3.11 |
| V12-0205 | table | 3.11 | home | V12 §3.11 |
| V12-0206 | table | 3.11 | home | V12 §3.11 |
| V12-0207 | table | 3.11 | home | V12 §3.11 |
| V12-0208 | table | 3.11 | home | V12 §3.11 |
| V12-0209 | table | 3.11 | home | V12 §3.11 |
| V12-0210 | table | 3.11 | home | V12 §3.11 (the raised-way line); the note on the withdrawn `aqueduct.dossierFactor` left out as history — V11 holds no such cell |
| V12-0211 | table | 3.11 | home | V12 §3.11 |
| V12-0212 | table | 3.11 | home | V12 §3.11 |
| V12-0213 | table | 3.11 | home | V12 §3.11 |
| V12-0214 | table | 3.11 | home | V12 §3.11 |
| V12-0215 | table | 3.11 | home | V12 §3.11 |
| V12-0216 | table | 3.11 | home | V12 §3.11 |
| V12-0217 | table | 3.11 | home | V12 §3.11 |
| V12-0218 | table | 3.11 | home | V12 §3.11 |
| V12-0219 | table | 3.11 | home | V12 §3.11 |
| V12-0220 | table | 3.11 | home | V12 §3.11 |
| V12-0221 | table | 3.11 | home | V12 §3.11 |
| V12-0222 | table | 3.11 | home | V12 §3.11 |
| V12-0223 | rule | 3.11 | home | V12 §3.11 |
| V12-0224 | rule | 3.11 | home | V12 §3.11 |
| V12-0225 | rule | 3.11 | home | V12 §3.11 |
| V12-0226 | rule | 3.11 | home | V12 §3.11 |
| V12-0227 | rule | 3.11 | home | V12 §3.11 |
| V12-0228 | rule | 3.11 | home | V12 §3.11 |
| V12-0229 | rule | 3.11 | home | V12 §3.11 |
| V12-0230 | rule | 3.11 | home | V12 §3.11 |
| V12-0231 | rule | 3.11 | home | V12 §3.11 |
| V12-0232 | rule | 3.11 | home | V12 §3.11 |
| V12-0233 | rule | 3.12 | home | V12 §3.12 |
| V12-0234 | rule | 3.12 | home | V12 §3.12 |
| V12-0235 | rule | 3.12 | home | V12 §3.12 |
| V12-0236 | rule | 3.12 | home | V12 §3.12 |
| V12-0237 | rule | 3.13 | home | V12 §3.13 |
| V12-0238 | rule | 3.14.1 | home | V12 §3.14.1 |
| V12-0239 | rule | 3.14.2 | home | V12 §3.14.2 |
| V12-0240 | rule | 3.14.3 | home | V12 §3.14.3 |
| V12-0241 | table | 3.14.5 | home | V12 §3.14.5 |
| V12-0242 | rule | 3.14.6 | home | V12 §3.14.6 |
| V12-0243 | rule | 3.14.7 | home | V12 §3.14.7 |
| V12-0244 | rule | 4.1 | home | V12 §4.1 |
| V12-0245 | rule | 4.1 | home | V12 §4.1 |
| V12-0246 | table | 4.2 | home | V12 §4.2 |
| V12-0247 | rule | 4.3 | home | V12 §4.3 |
| V12-0248 | rule | 4.4 | home | V12 §4.4 |
| V12-0249 | rule | 5.1 | home | V12 §5.1 |
| V12-0250 | rule | 5.2 | home | V12 §5.2 |
| V12-0251 | rule | 5.3 | home | V12 §5.3 |
| V12-0252 | rule | 5.5 | home | V12 §5.5 |
| V12-0253 | number | 6 | home | V12 §6 |
| V12-0254 | number | 6 | home | V12 §6 |
| V12-0255 | test | 7.1 | home | V12 §7.1 T-V12-1 |
| V12-0256 | test | 7.1 | home | V12 §7.1 T-V12-2 |
| V12-0257 | test | 7.1 | home | V12 §7.1 T-V12-3 |
| V12-0258 | test | 7.1 | home | V12 §7.1 T-V12-4 |
| V12-0259 | test | 7.1 | home | V12 §7.1 T-V12-5 |
| V12-0260 | test | 7.1 | home | V12 §7.1 T-V12-6 |
| V12-0261 | test | 7.1 | home | V12 §7.1 T-V12-7 |
| V12-0262 | test | 7.1 | home | V12 §7.1 T-V12-8 |
| V12-0263 | test | 7.1 | home | V12 §7.1 T-V12-9 |
| V12-0264 | test | 7.1 | home | V12 §7.1 T-V12-10 |
| V12-0265 | test | 7.1 | home | V12 §7.1 T-V12-11 |
| V12-0266 | test | 7.1 | home | V12 §7.1 T-V12-12 |
| V12-0267 | test | 7.1 | home | V12 §7.1 T-V12-13 |
| V12-0268 | test | 7.1 | home | V12 §7.1 T-V12-14 |
| V12-0269 | test | 7.1 | home | V12 §7.1 T-V12-15 |
| V12-0270 | test | 7.1 | home | V12 §7.1 T-V12-16 |
| V12-0271 | test | 7.1 | home | V12 §7.1 T-V12-17 |
| V12-0272 | test | 7.1 | home | V12 §7.1 T-V12-18 |
| V12-0273 | test | 7.1 | home | V12 §7.1 T-V12-19 |
| V12-0274 | test | 7.1 | home | V12 §7.1 T-V12-20 |
| V12-0275 | test | 7.1 | home | V12 §7.1 T-V12-21 |
| V12-0276 | test | 7.1 | home | V12 §7.1 T-V12-22 |
| V12-0277 | test | 7.1 | home | V12 §7.1 T-V12-23 |
| V12-0278 | test | 7.1 | home | V12 §7.1 T-V12-24 |
| V12-0279 | test | 7.1 | home | V12 §7.1 T-V12-25 |
| V12-0280 | test | 7.1 | home | V12 §7.1 T-V12-26 |
| V12-0281 | test | 7.1 | home | V12 §7.1 T-V12-27 |
| V12-0282 | test | 7.1 | home | V12 §7.1 T-V12-28 |
| V12-0283 | test | 7.1 | home | V12 §7.1 T-V12-29 |
| V12-0284 | test | 7.1 | home | V12 §7.1 T-V12-30 |
| V12-0285 | test | 7.1 | home | V12 §7.1 T-V12-31 |
| V12-0286 | test | 7.1 | home | V12 §7.1 T-V12-32 |
| V12-0287 | test | 7.1 | home | V12 §7.1 T-V12-33 |
| V12-0288 | test | 7.1 | home | V12 §7.1 T-V12-34 |
| V12-0289 | test | 7.1 | home | V12 §7.1 T-V12-35 |
| V12-0290 | test | 7.1 | home | V12 §7.1 T-V12-36 |
| V12-0291 | test | 7.1 | home | V12 §7.1 T-V12-37 |
| V12-0292 | test | 7.1 | home | V12 §7.1 T-V12-38 |
| V12-0293 | test | 7.1 | home | V12 §7.1 T-V12-39 |
| V12-0294 | test | 7.1 | home | V12 §7.1 T-V12-40 |
| V12-0295 | test | 7.1 | home | V12 §7.1 T-V12-41 |
| V12-0296 | rule | 7.2 | home | V12 §7.2 |
| V12-0297 | rule | 8.1 | home | V12 §8.1 |
| V12-0298 | table | 8.2 | home | V12 §8.2 |
| V12-0299 | table | 8.2 | home | V12 §8.2 |
| V12-0300 | rule | 8.3 | home | V12 §8.3 |
| V12-0301 | decision | 9 | home | V12 §9 J-V12.1 |
| V12-0302 | decision | 9 | home | V12 §9 J-V12.2 |
| V12-0303 | decision | 9 | home | V12 §9 J-V12.3 |
| V12-0304 | decision | 9 | home | V12 §9 J-V12.4 |
| V12-0305 | decision | 9 | home | V12 §9 J-V12.5 |
| V12-0306 | decision | 9 | home | V12 §9 J-V12.6 |
| V12-0307 | decision | 9 | home | V12 §9 J-V12.7 |
| V12-0308 | decision | 9 | home | V12 §9 J-V12.8 |
| V12-0309 | decision | 9 | home | V12 §9 J-V12.9 |
| V12-0310 | decision | 9 | home | V12 §9 J-V12.10 |
| V12-0311 | decision | 9 | home | V12 §9 J-V12.11 |
| V12-0312 | decision | 9 | home | V12 §9 J-V12.12 |
| V12-0313 | decision | 9 | home | V12 §9 J-V12.13 |
| V12-0314 | decision | 9 | home | V12 §9 J-V12.14 |
| V12-0315 | decision | 9 | home | V12 §9 J-V12.15 |
| V12-0316 | decision | 9 | home | V12 §9 J-V12.16 |
| V12-0317 | decision | 9 | home | V12 §9 J-V12.17 |
| V12-0318 | decision | 9 | home | V12 §9 J-V12.18 |
| V12-0319 | decision | 9 | home | V12 §9 J-V12.19 |
| V12-0320 | decision | 9 | home | V12 §9 J-V12.20 |
| V12-0321 | decision | 9 | home | V12 §9 J-V12.21 |
| V12-0322 | decision | 9 | home | V12 §9 J-V12.22 |
| V12-0323 | decision | 9 | home | V12 §9 J-V12.23 |
| V12-0324 | decision | 9 | home | V12 §9 J-V12.24 |
| V12-0325 | decision | 9 | home | V12 §9 J-V12.25 |
| V12-0326 | decision | 9 | home | V12 §9 J-V12.26 |
| V12-0327 | decision | 9 | home | V12 §9 J-V12.27 |
| V12-0328 | decision | 9 | home | V12 §9 J-V12.28 |
| V12-0329 | decision | 9 | home | V12 §9 J-V12.29 |
| V12-0330 | decision | 9 | home | V12 §9 J-V12.30 |
| V12-0331 | decision | 9 | home | V12 §9 J-V12.31 |
| V12-0332 | decision | 9 | home | V12 §9 J-V12.32 |
| V12-0333 | decision | 9 | home | V12 §9 J-V12.33 |
| V12-0334 | decision | 9 | home | V12 §9 J-V12.34 |
| V12-0335 | decision | 9 | home | V12 §9 J-V12.35 |
| V12-0336 | decision | 9 | home | V12 §9 J-V12.36 |
| V12-0337 | decision | 9 | home | V12 §9 J-V12.37 |
| V12-0338 | decision | 9 | home | V12 §9 J-V12.38 |
| V12-0339 | decision | 9 | home | V12 §9 J-V12.39 |
| V12-0340 | decision | 9 | home | V12 §9 J-V12.40 |
| V12-0341 | decision | 9 | home | V12 §9 J-V12.41 |
| V12-0342 | decision | 9 | home | V12 §9 J-V12.42 |
| V12-0343 | decision | 9 | home | V12 §9 J-V12.43 |
| V12-0344 | decision | 9 | home | V12 §9 J-V12.44 |
| V12-0345 | decision | 9 | home | V12 §9 J-V12.45 |
| V12-0346 | decision | 9 | home | V12 §9 J-V12.46 |
| V12-0347 | decision | 9 | home | V12 §9 J-V12.47 |
| V12-0348 | decision | 9 | home | V12 §9 J-V12.48 |
| V12-0349 | decision | 9 | home | V12 §9 J-V12.49 |
| V12-0350 | decision | 9 | home | V12 §9 J-V12.50 |
| V12-0351 | decision | 9 | home | V12 §9 J-V12.51 |
| V12-0352 | decision | 9 | home | V12 §9 J-V12.52 |
| V12-0353 | decision | 9 | home | V12 §9 J-V12.53 |
| V12-0354 | decision | 9 | home | V12 §9 J-V12.54 |
| V12-0355 | decision | 9 | home | V12 §9 J-V12.55 |
| V12-0356 | decision | 9 | home | V12 §9 J-V12.56 |
| V12-0357 | decision | 9 | home | V12 §9 J-V12.57 |
| V12-0358 | decision | 9 | home | V12 §9 J-V12.58 |
| V12-0359 | decision | 9 | home | V12 §9 J-V12.59 |
| V12-0360 | decision | 9 | home | V12 §9 J-V12.60 |
| V12-0361 | decision | 9 | home | V12 §9 J-V12.61 |
| V12-0362 | decision | 9 | home | V12 §9 J-V12.62 |
| V12-0363 | decision | 9 | home | V12 §9 J-V12.63 |
| V12-0364 | decision | 9 | home | V12 §9 J-V12.64 |
| V12-0365 | decision | 9 | home | V12 §9 J-V12.65 |
| V12-0366 | decision | 9 | home | V12 §9 J-V12.66 |
| V12-0367 | decision | 9 | home | V12 §9 J-V12.67 |
| V12-0368 | decision | 9 | home | V12 §9 J-V12.68 |
| V12-0369 | decision | 9 | home | V12 §9 J-V12.69 |
| V12-0370 | decision | 9 | home | V12 §9 J-V12.70 |
| V12-0371 | decision | 9 | home | V12 §9 J-V12.71 |
| V12-0372 | decision | 9 | home | V12 §9 J-V12.72 |
| V12-0373 | decision | 9 | home | V12 §9 J-V12.73 |
| V12-0374 | decision | 9 | home | V12 §9 J-V12.74 |
| V12-0375 | decision | 9 | home | V12 §9 J-V12.75 |
| V12-0376 | decision | 9 | home | V12 §9 J-V12.76 |
| V12-0377 | decision | 9 | home | V12 §9 J-V12.77 |
| V12-0378 | decision | 9 | home | V12 §9 J-V12.78 |
| V12-0379 | decision | 9 | home | V12 §9 J-V12.79 |
| V12-0380 | decision | 9 | home | V12 §9 J-V12.80 |
| V12-0381 | decision | 9 | home | V12 §9 J-V12.81 |
| V12-0382 | decision | 9 | home | V12 §9 J-V12.82 |
| V12-0383 | decision | 9 | home | V12 §9 J-V12.83 |
| V12-0384 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-1 → item 496 (§13.5) |
| V12-0385 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-2 → item 497 (§13.5); BCR-V12-3 → item 503 (§13.9) |
| V12-0386 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-4 → item 504 (§13.9) |
| V12-0387 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-5 → item 381 (§7.6); BCR-V12-6 → item 500 (§13.6) |
| V12-0388 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-7 → item 491 (§13.3); BCR-V12-8 → item 535 (§17.1 (4)) |
| V12-0389 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-9 → item 533 (§16; the totals item 568's); BCR-V12-10 → item 521 (§14); BCR-V12-11 → item 569 (the staged list) |
| V12-0390 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-12 → item 501 (§13.7) |
| V12-0391 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-13 → item 488 (§13.2); BCR-V12-14 → item 502 (§13.8) |
| V12-0392 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-15 → item 447 (§11.1; one text with BCR-V12-17 and BCR-V9-31, J-VI.18; J-VI.3's six barrier kinds); BCR-V12-16 → item 489 (§13.2); BCR-V12-17 → item 447 (§11.1) |
| V12-0393 | bcr | 10 | bcr-pointer | V12 §10 pointer rows: BCR-V12-18 → item 536 (§17.1 (5)); BCR-V12-19 → item 492 (§13.3); BCR-V12-20 → item 493 (§13.3); BCR-V12-21 → item 537 (§17.1 (8)); BCR-V12-22 → item 382 (§7.6) |
| V12-0394 | xreq | 10 | handoff | V12 §13 (hand-offs: V11 rows, V02/V07, V03–V06, V08 rows) |
| V12-0395 | xreq | 10 | handoff | V12 §13 (hand-offs: V09, V10, V06 rows) |
| V12-0396 | xreq | 10 | handoff | V12 §13 (hand-offs: the pins row, V04, V07 rows) |
| V12-0397 | xreq | 10 | handoff | V12 §13 (hand-offs: `BenchBarDef` row; the register-check row) |
| V12-0398 | xreq | 10 | handoff | V12 §13 (hand-offs: the later corpus run row; the `--milestone` row) |
| V12-0399 | xreq | 10 | handoff | V12 §13 (hand-offs: the staged-entry and application-constants row) |
| V12-0400 | question | 11 | answer-J121-J122 | V12 §11 (Q-V12-1 – Q-V12-3 answered by J122) |
| V12-0401 | rule | 12 | home | V12 §12 |
| V12-0402 | rule | 13 | home | V12 §13 (no item; the variations J-V12.42, J-V12.43, J-V12.55, J-V12.56) |
| V12-0403 | rule | IN | home | folded at homes: IN-V12-1 → V12 §3.11 default line (J-VI.17); IN-V12-2 → V12 §2.10, §3.4.4 (J-VI.10); IN-V12-3 → V12 §3.6b (J-VI.4); IN-V12-4 → V12 §2.2 (J-VI.18, J-VI.3); J-VI.6 → V12 §3.11; pointer paragraph in *Integration notes* |
