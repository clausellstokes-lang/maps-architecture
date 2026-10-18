# Repair round 4 — V12 (calibration) — lane coherence/repair-V12-r4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V12-r4; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V12-r4`, 2026-10-01)
- P0 brief read whole (7 routed issues; 3 END lines); resume check: no output, no LANDED line: fresh start: done
- P1 adjudication-r4's TOC, R4-01, R4-04, R4-06, R4-11, R4-13, R3-01 – R3-03 and Part H · V12 read whole; issue sources
  read (verify-agree-proof-r3t, verify-agree-time-r3t, verify-scope-r3t, verify-vol-V11-V12-r3t, verify-pipeline-r3t's
  VPC-R3-03): done
- P2 live V12 units read whole (§2.7b, §2.13, §3.4, §3.7, §3.12, §3.15, §3.16, §6, §7.1, §8.1, §8.2, §10.2) and the
  homes they cite (base §8.7, §10.2 *Crisis looks* as repair-r4-pipeline writes it, §13.2's item-122, -126 groups and
  take-over table as repair-r4-scope writes them, §13.4, §13.8's T122 row, §16's M5 exit; V01 §3.16 (5); V06 §3.7.7 (3)
  and T-V6-73; V09 §4.12 and T-V9-22; V11's T-V11-19, T-V11-21): done
- P3 count-asserted edits and generated blocks (work/repair-V12-r4/edits.py, build.py: 41 substitutions over 12
  subsections, each applied exactly its asserted number of times): done
- P4 dry run on a copy (both appliers); ids, references, review-id scan, doc_checks: done
- P5 result file and LANDED: done

## Summary

* **Blocks:** 12 `REPLACE` blocks on `docs/volumes/V12-calibration.md` (no retitle, no insert, no base block).
  **Ruling requests: 0.**
* **Live file** (assemble-r3's output): `docs/volumes/V12-calibration.md` sha256 90a61a9c9232…; every REPLACE body is the
  live subsection with count-asserted substitutions; every untouched line is verbatim. Expected volume sha256
  2db3c8c96648….
* **Binding rulings applied:** R4-01 (both ends this round; the seat's own sweep below; no review id in design text),
  R4-06 (a barrier across a way), R4-11 (no test stages a key withholding a look-bearing condition), R4-13 (the
  disaster's unit count); R3-01 – R3-03 standing.

## Issues → where fixed (adjudication-r4 Part H · V12: 7 FIX, 0 MERGED, 0 INVALID)

| id | disposition | where |
|---|---|---|
| VAP-r3-01 | FIX | §3.15.12's head: from M3b each look kind previewed …, "the `disaster` preview's district clauses (its units, scale and placement under T122-2, T122-3, T122-5 and T122-6) from M5, when V01's W10 lands (§10.2 *Crisis looks*; §13.8)" (the required text, its stray closing dash before the semicolon dropped); T-V12-54's milestone "M3b (the previews; the `disaster` preview's district clauses from M5); M-SF (the dossier crisis fixtures) (§16)"; W7's M3b cell "item 122's previews (the `disaster` preview's districts at M5)" and M5 cell "…; the `disaster` preview's district clauses of T122-2, T122-3, T122-5 and T122-6"; §6's item-122 row "M3b (the previews; the `disaster` look's district clauses from M5); M-SF (the dossier crisis and force fixtures) (§16)". Sweep: §3.15's lead and §8.1 (below). |
| VAP-r3-02 | FIX | §3.4.2's `layout.touch` row "… fails to complete under touch events with `AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default)"; §3.15.16's T126-1 bullet "under coarse-pointer touch events, with `AppPrefs.touch.editFabric` on, each tool …"; T-V12-59 "`layout.touch` is 0 at 600 × 480 with `AppPrefs.touch.editFabric` on". Sweep: §3.12's item-126 row and §3.16's edge row 37 (below). |
| VAP-r3-08 | FIX | §2.13: `item105.web`, `item107.spread` "B-CITY's 200 seeds per rung (V11, T-V11-21)"; `item106.barrier` "item 106 (h)'s barrier fixtures (V11, T-V11-19)"; §3.7.8's list and X-V12-11 "… T-V11-13, T-V11-19, T-V11-21, T-V11-31 and T-V11-38 (b) – T-V11-41 (b)". V11's end is its own VAP-r3-07. |
| VAP-r3-10 | FIX | §3.15.6: "T116-2 – T116-4 (the first view unchanged, the limit moving with the bounds, every export within the limit bounds — the whole bounds at most, a whole-bounds export at the cap framing them, §8.7)". |
| VAT3-r3-04 | FIX | §3.15.4's `T114g.oldestFirst`: "`patchesOldestFirst`, the order read from the week of each run's last-change epoch (`EpochRecord.inputs.week`; §6.1 — never the epoch's number, so a replay epoch orders by its week, before every live one), over H-100's epochs and T-V6-73's history-first recovery fixture"; T-V12-47's planted faults add "one that replaces a live-era patch before a replay-era one (T-V6-73's history-first fixture)". Sweep: §2.7b's `patchesOldestFirst` comment (below). Agrees with scope's T114-4 (VAT3-r3-03) and V06 §3.7.7 (3). |
| VCS-r3-02 | FIX | The five heads as required: T-V12-44 "(takes T111-1 – T111-5: their specs and `item111.water`)"; T-V12-45 "(takes T112-1's style line)"; T-V12-46 "(takes T113-2's five-engine digest, T113-5's `T113e.lost` and T113-7's pin `item113.history`)"; T-V12-47 "(takes T114-4 – T114-7 and T114-8's pin `item114.condition`)"; T-V12-49 "(takes T117-1 and T118-1's pins, T117-2, T117-4, T117-5 and T117-7, and T118-2 – T118-6)" — each agreeing with §13.2's calibration row as repair-r4-scope corrects it (VCS-r3-01). |
| VV1112-r3-01 | FIX per R4-13 | §3.4.2's `crisis.*` row: "… whose units differ in number from the count §10.2 (c) gives that share of its place's units — for the `disaster` look V01 §3.16 `disasterSource` (5)'s, max(k, \|`matched`\|) with k that count, or every unit of a fire order shorter than that, its shortfall reported and not counted"; §3.15.12's T122-5 bullet "— a `disaster` look's max(k, |`matched`|), k that count, or all of a shorter fire order (V01 §3.16 `disasterSource` (5)) —"; T-V12-54's passing cases "a fire calamity naming more target districts than its share's count, every one drawn, and a fire whose district adjacency ends before its count, its shortfall reported". "k that count" is §10.2 (c)'s own gloss (repair-r4-pipeline); the second passing case is the claim's other lawful result (a fire meeting a gap in the adjacency), so both cases the claim names are tested. |

Grades (Part H): none regraded.

## END lines written (Part H · V12)

| END | where |
|---|---|
| VAP-r3-09 (scope) | §3.15.12's head: "V01's T-V1-60, V02's T-V2-60, V04's T-V4-82 (i), V08's T-V8-60 and V10's T-V10-52 test their own parts" — the order of §13.2's item-122 runs list as repair-r4-scope writes it. |
| VPC-R3-03 (pipeline; R4-06) | The five `crisis.blocked` statements: §3.4.2's `crisis.*` row "on a way's carriageway any mark save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d))"; §3.12's planted-fault row "or on a way's carriageway as anything save a barrier across it (…; §10.2 (d))"; §3.15.12's T122-6 "and a way's carriageway save a barrier across it (…; §10.2 (d)), the previews of `blockade`, `raiders`, `rebellion`, `beast` and `quarantine` among the kinds checked"; §3.16's edge row 33 — its case "a barrier look on a way (the `blockade`, `raiders` and `rebellion` barricades, a `beast`'s stakes, a quarantine's cordon)", its outcome "a way's carriageway holding nothing save a barrier across it (…; §10.2 (d))"; T-V12-54 "a planted camp on a way's carriageway, which holds nothing save a barrier across it (…; §10.2 (d)) — the `blockade`, `raiders` and `rebellion` barricades across their ways, a `beast`'s stakes where its edge crosses a way and a quarantine's cordon across each way entering its quarter passing" (the stakes and the cordon added as passing cases, as R4-06 states; the cordon's course is §10.2 (f)'s as repair-r4-pipeline writes it). |
| R4-11 (adjudicator's sweep) | §3.4.2's `crisis.weeks` clause and §3.15.12's T122-2 bullet: "under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44)"; §3.12's planted-fault row "or for a `none`-row condition"; edge row 33's case "a `none`-row condition beside the looks (drawn at no key) and a look-bearing one (drawn at every key)", its outcome conformed position for position ("the `none`-row one never drawn, counted or widening the framing, the look-bearing one drawn at every key"). |

## The seat's own sweep (R4-01 (2)) and the root causes

Each restatement in V12 of a term, field or clause the rulings and fixes change, conformed in the same block:

* **R4-11** — T-V12-54's `crisis.weeks` planted case "a planted look of a condition the `public` key withholds" staged a
  key withholding a condition (no such key exists for a look-bearing one, DR44): now "a planted look drawn for a
  `none`-row condition carried beside the looks — each look-bearing condition's look drawn at `public`, `local` and
  `secret` alike passing". No other "withheld"/"withholds" in V12 concerns a crisis look (§3.4.2's `find.*` and
  `layout.*` rows, §3.12's Find and item-126 rows and edge row 31 are Find's knowledge filter and a tool's greying).
* **R4-06** — every "barricade" and "carriageway" of V12 is one of the five statements above; none left.
* **R4-13** — both statements of "the count §10.2 (c) gives" now carry V01 §3.16 (5)'s `disaster` reading; none left.
* **VAP-r3-01's root cause** — the two other statements of item 122's harness milestones now name the M5 exception:
  §3.15's lead "items 122 and 124's base parts at M3b (the `disaster` look's district clauses at M5)" and §8.1 "items 122
  and 124 at M3b with the `disaster` look's district clauses at M5 and item 122's dossier and force bars at M-SF".
  J-V12.101 (a decision record: "on previews from M3b") stands — the M5 exception is the base's schedule, not V12's choice.
* **VAP-r3-02's root cause** — the two other statements of `layout.touch`'s measure: §3.12's item-126 row "a tool's touch
  script not completing at 600 × 480 with `AppPrefs.touch.editFabric` on" and edge row 37's outcome "each tool's touch
  script, with `AppPrefs.touch.editFabric` on, from the milestone that lands it".
* **VAT3-r3-04's root cause** — §2.7b's `ScriptProperty` comment for `patchesOldestFirst` "recovery replaces a wall's
  patched runs oldest first, by the week of each run's last-change epoch (`EpochRecord.inputs.week`, §6.1), never the
  epoch's number" (it read "in the order of their epochs of last change"). §3.4.2's `wall.condition` row ("with each
  run's epoch of last change") reports the field, orders nothing, and stands.
* **The same sentence as VAP-r3-09's END** — §3.15.12's head named V03's T-V3-40 for "the plan clauses of T122-1 –
  T122-3"; T-V3-40's own head and §13.2's item-122 runs list give it T122-7's plan clause too: now "T122-1 – T122-3 and
  T122-7" (principle (10); a list omitting an id its test runs).

## Hand-off received and closed

* **repair-r4-rendering's HAND-OFFS** (the canon's retired term G-refview, "reference view" → "reference viewport",
  closed at rendering this round by VCS-r3-07): V12's nine uses — §3.4.2's `resolution.p95`, `resolution.ultra4k` and
  `weather.frameMs` rows, §3.15.11 (four), §3.15.14 (one) and §6's item-121 row — read "§12.5's reference viewport(s)".
  Pure term conformance (principle (2)); nothing else changes.

## HAND-OFFS (R3-01 (3): ends no END line names, for round 5's verifiers; none is open wording in the design text)

* **V11** — V12 §2.13 registers B-CITY's 200 seeds per rung on the one row of `item105.web` and `item107.spread` (one off
  form, V11 §3.7.4's web off form with the cells T107-4 names), now citing T-V11-21; VAP-r3-07's text for T-V11-21 names
  the `item105.web` registration only. V11 states the `item107.spread` registration of the same seeds beside it in
  T-V11-21's clause, so V12 §2.13's "a suite no owner registers" refusal cannot fire on `item107.spread`.
* **scope** — §13.8's T121-3 "over §12.5's reference views" (rendering's hand-off to scope; V12's side written above).

## Words (principle (9)'s report)

`docs/volumes/V12-calibration.md`: 82 759 words before, 83 196 after by `wc -w` (+437, +0.5 %; 84 312 → 84 760 by a
Unicode-whitespace split). Removed: restatement only in passing (the bare "B-CITY (V11)" and "V11's T-V11-19 fixtures"
replaced by their cited suites); no narration, duplicated mechanism or verbose prose was found in the units touched.
Added: the defect fixes' design text — the M5 exception at its six statements, the touch setting at its five, the
week-keyed patch order and its planted fault, the five heads' bar ids, the disaster's unit count and its passing cases,
the barrier's three kinds and their passing cases, the knowledge clause at every key. A repair round over defects, so
the unit grows; its shrink stays the rewrite's.

## Checks

* **Dry run.** `apply-blocks.py` (amendments-b, and amendments-c's two-pass order) on a copy of the live V12 (this file's
  blocks, the FILE line removed): 12 of 12 applied, 0 skipped, 0 malformed; audit 0 not OK; headings 67 → 67, none
  retitled; fences balanced (30 → 30); the title block unchanged; the rationale untouched; the output byte-identical to
  the generator's volume (sha256 2db3c8c96648…). No other round-4 repair file carries a block for V12 (searched).
* **Ids.** No id added or removed: the 185 T-V12, J-V12 and X-V12 rows each defined once. Every pointer added resolves:
  base §6.1, §8.7, §10.2 (c), (d), §13.4, §13.8; V01 §3.16 (5) (`disasterSource`); V06's T-V6-73 (its history-first
  clause); V09 §4.12 (`AppPrefs.touch.editFabric`); V11's T-V11-19, T-V11-21; V04's T-V4-82 (i); V03's T-V3-40.
* **Scans.** No `R2-nn`, `R3-nn`, `R4-nn` or verifier id in the edited volume. None left of: "withholds a condition",
  "key withholds", "withheld condition", "but a `barricade`", "save a `barricade`", "barricade look", "epochs of last
  change", "every export within it", "B-CITY (V11)", "T-V11-19 fixtures", "reference view" without "port".
* **Tables.** §3.4.2's registry row writes max(k, \|`matched`\|) with escaped pipes (an unescaped `|` split the row: S1
  caught it on the first build, fixed before landing).
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2, before → after: C1 8 → 8 (0 unreviewed), C2 0 → 0, C3 141 → 140 (127 → 126
  unreviewed: one pre-existing run, "runs in the order of", left with the reworded comment), C4 2 → 2 (0), S1 0 → 0, S2
  115 → 117 (11 → 11 unreviewed: the two added V01 §3.16 pointers are the volume pointer already reviewed). Exit 1 before
  and after (the same pre-existing unreviewed hits); no new unreviewed hit.

