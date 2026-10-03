# Repair round 3 — V12 (calibration) — lane coherence/repair-V12-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V12-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V12-r3`, 2026-10-01)
- P0 brief read whole (11 routed issues; END lines 1); resume check: no output, no LANDED line: fresh start: done
- P1 adjudication-r3's table of contents, R3-01 – R3-03, R3-09, R3-13, R3-14, R3-26 and Part H · V12 read whole: done
- P2 issue sources (verify-agree-proof-r2t, verify-rendering-r2t, verify-vol-V03-V04-r2t, verify-vol-V11-V12-r2t) and the
  live V12 units read whole (§1b, §2.13, §3.4, §3.7, §3.11, §3.12, §3.15, §3.16, §6, §7.1, §9, §10.2); the homes cited
  checked in the live set (base §10.2 *Crisis looks*, §13.2's item 120–125 bars and take-over rows, §13.8's bar schedule,
  §16's M-CAL and M-SF rows, §7.7's DR36 – DR44; V02's T-V2-58 – T-V2-60; V03 §7's damage fixtures, T-V3-39, T-V3-40;
  V08 §3.10, §7.1, T-V8-59, T-V8-61; V10's T-V10-45; V11 §3.25.9 – §3.25.11, T-V11-13, T-V11-31, T-V11-38 – T-V11-41): done
- P3 asserted edits and generated blocks (work/repair-V12-r3/edits.py, build.py: 57 count-asserted substitutions): done
- P4 dry run of apply-blocks.py on a copy (12 of 12 applied, byte-identical to the generator's volume); ids, references,
  review-id scan, doc_checks: done
- P5 result file and LANDED: done

## Summary

* **Blocks:** 12 `REPLACE` blocks on `docs/volumes/V12-calibration.md` (no retitle, no insert). **Ruling requests: 0.**
* **Live file** (assemble-r2's output): `docs/volumes/V12-calibration.md` sha256 74a4bfb3b0a3…; every REPLACE body is the
  live unit with count-asserted substitutions (57, each applied exactly its asserted number of times); every untouched line
  is verbatim. Expected volume sha256 90a61a9c9232….
* **Binding rulings applied:** R3-01 (both ends this round; the hand-offs below), R3-02 (no review id written into the
  design), R3-03 (grades), R3-09 (e) (the END line), R3-13 (the withheld-condition case a planted fault), R3-14 (3) (the
  barricade measure, VRC2T-04's text) and (4) (the share of n units, read below), R3-26 (the pin union; V12 takes §13.8's
  tiers).

## Issues → where fixed (11 routed ids: 11 FIXED; none MERGED or INVALID)

| id | disposition | where |
|---|---|---|
| VAP-r2-08 | FIX per R3-26 | §2.13: `item111.water`'s V10 cell "the reader and why goldens but the brief's (V10, T-V10-45)"; `item113.history` adds T-V11-39 (a)'s four fixtures (T-V11-39 (b)); `item114.condition` and `item115.off` add B-CITY's 200 seeds per rung (T-V11-40 (b), T-V11-41 (b)), `item115.off`'s bar cell now "T115-4" (the test id moved into its suite, where R3-26's form puts it); `item115.ceiling` reads "B-MASS (V02, T-V2-58 (f)) … B-CITY's TOWN, CITY and METROPOLIS seeds (V11, T-V11-41 (b))". §3.7.8's list and X-V12-11: V02's T-V2-50, T-V2-58 (f), T-V2-59 (d), T-V2-60 (c); V11's T-V11-13, T-V11-31 and T-V11-38 (b) – T-V11-41 (b) |
| VAP-r2-12 | FIX (R3-13) | §3.4.2's `find.*` row as required (gap outlines and legend chips; the step script with redo, regenerate, save and load and migration; the count-0 chip); §3.15.10's T120-3 and T120-4 bullets the same, T120-4's head "every commit, advance, undo, redo, regenerate, load and migration"; `crisis.weeks` (§3.4.2's row and §3.15.12's T122-2) counts every look of a withheld condition drawn (DR44's admission); T-V12-52 adds the gap-outline leak and the chip dropped by a migration (and the chip removed with its last match); T-V12-54 adds the planted look of a condition the `public` key withholds — a planted fault, as R3-13 reads it |
| VRC2T-04 | FIX per R3-14 (3) | §3.15.12's T122-6: "`crisis.blocked` 0 — water, a gate's passage and a label's keep-out, and a way's carriageway save a `barricade` across it (§10.2 (d))", the previews of `blockade`, `raiders` and `rebellion` among the kinds checked; §3.4.2's row, §3.12's item-122 row, T-V12-54 (a planted camp on a carriageway fails, the three barricades pass) and §3.16 row 33 (the barricade look as an edge) agree |
| VV34-r2-15 | FIX per R3-26 | §3.15.13: "on the **damage fixtures** (V03 §7)", the restated list cut; §2.13's `item123.damage` names V03's damage fixtures (T-V3-39 (g)) — one suite, V03's registration, in place of "V12's damage fixtures", which were the same fixtures restated — and `item122.crises` the damage fixtures' disaster district at the building band (T-V3-40 (f)); §3.7.8's list and X-V12-11 add T-V3-39 (g) and T-V3-40 (f); the T123-7 bullet, §3.4.2's `damage.*` row and §1b's item-123 row cite V03 §7 |
| VV1112-r2-04 | FIX | §3.11: item 122's look rows' `scale` and `lookLevel` (`priority` dropped: an enumeration); item 123's threshold ranges by element kind (no material key); item 124's climate rows' weather columns and the numbers of the climate table's `settings.weather` block (the kinds' `lengthS` and `hours`, the site factors and `forestShareMin`; not its two owner-stamped caps, V11 §3.25.11). §3.15.14's closing line and §1b's item-124 row name the same cells |
| VV1112-r2-05 | FIX | §3.15.15's T125-1 at every rung, THORP, HAMLET and VILLAGE through the village product (V08 §3.10's router hands a dossier below 1 500 people to it; V-M4 lands before M-CAL, whose inputs it is, so before M-SF); §6's item-125 row; T-V12-58 "0 at every rung, THORP to the METROPOLIS cap"; §3.16 row 36's outcome; §3.4.2's `port.fallbacks` row, §2.13's `item125.host` suite, §1b's required-keys row, X-V12-5 and J-V12.104 agree |
| VV1112-r2-06 | FIX (amended per R3-14 (4); see *Readings*) | §3.15.12's T122-5 bullet adds `crisis.scale`'s second count; T122-6 adds the shared outskirts (`crisis.share`, §10.2 (e)); §3.4.2's `crisis.*` row defines both counts; §3.12's item-122 row and T-V12-54 add them with the three planted cases (a camp at double its row's cell; a refugee camp placed before the siege; the camps together past `densityCap`); J-V12.101 reads "five 0-by-rule statistics" |
| VV1112-r2-07 | FIX per R3-26 | §3.15.11: "T121-2, T121-3 and T121-8 in §12.1's timing phase, T121-5 at PR (§13.8)"; §6's rows: item 121 (T121-5's captures at PR, each level on one device fixture), item 123 (PR on the damage fixtures, the 21 levels; H-100's decay runs nightly from M6-E), item 124 (T124-3, T124-4 and T124-9 at PR on one climate row per run, rotating, every row nightly; `weather.frameMs`, `.cover` and `.luma` in the timing phase and the visual-regression run; the pin's suites nightly), item 126 (PR on V09's app harness, each tool's script from the milestone that lands it) and, by the same rule, item 125 (`item125.host` at PR on B-DOSSIER-lite, the required-keys dossier at every rung nightly, §13.8's T125 row); each row's pre-decided change moved with its tier; §1b's item-121, -123, -124 and -126 rows and J-V12.100 agree |
| VV1112-r2-08 | FIX per R3-26 | §2.13: `item122.crises` adds the look fixture's exteriors (V02, T-V2-60 (c)) and the frozen dossier set's crisis conditions (V08, T-V8-59); `item123.damage` the damage sub-fixture's exteriors (V02, T-V2-59 (d)); `item125.host` the frozen dossier set through the port (V08, T-V8-61 (b)); §3.7.8's list and X-V12-11 add T-V2-59 (d), T-V2-60 (c), T-V8-59 and T-V8-61 (b); the T123-7 bullet names V03's, V02's and V04's registrations |
| VV1112-r2-12 | FIX | §3.15.12's second sentence names T-V11-46 and T-V8-59 (T122-4), V09's T-V9-85, V06's T-V6-75 and V03's T-V3-40 (the plan clauses of T122-1 – T122-3), V01's T-V1-60, V02's T-V2-60, V08's T-V8-60 and V10's T-V10-52 (their own parts) and V07's T-V7-69 (T122-5's and T122-6's village clauses) |
| VV1112-r2-13 | FIX | §3.11's item-114 line "§7.7's DR41" (both places); T-V12-47 "with §7.7's DR41 and the state rows"; §1b "§7.7's history rows DR36 – DR39" |

Grades (Part H): VRC2T-04 and VV1112-r2-04 regraded MAJOR by the adjudicator; no regrade changes a fix.

## END lines written (Part H · V12)

| END | where |
|---|---|
| VPC-R2-03 (V08; R3-09 (e)) | §3.15.12's crisis fixtures: "a fire, a flood and an earthquake, each of the last three a calamity with its linked `reconstruction` condition (V08 §3.16 (7) (b))" from V08's dossier crisis fixtures (V08 §7.1); X-V12-5: "each disaster fixture — a fire, a flood, an earthquake — a calamity with its linked `reconstruction` condition (V08 §7.1), its `targets` resolved"; §1b's dossier row says the same |

## Readings where a ruling governs the verifier's text

* **VV1112-r2-06, the share of units (R3-14 (4)).** The required change holds "camped ground in m², else its share of its
  place's units" to its row's `scale` "within 5 %". A unit share is a rounded count — R3-14 (4): round(s × n) clamped to
  [1, n] where s > 0, none where s ≤ 0, which the pipeline seat writes into §10.2 (c) this round — so 5 % of a share fails a
  lawful draw at small n (the `disaster` row's 0.05 of eight districts draws one, 0.125). Written: camped ground within
  5 %, the ring remainder at §8.8's ring density; a unit share equal to the count §10.2 (c) gives. The clause covers the
  looks §10.2 (c) sizes by severity (no headcount and no count given, every preview among them); a look sized by headcount
  is `crisis.areaPerHead`'s, unchanged.
* **VV1112-r2-06, `crisis.share`.** The required "taking the outskirts in `priority` order, each from what the earlier
  left" is measured as an observable count: a camp look holding outskirts land owed to a look before it in `priority`
  order (ties by condition id) — a face that look's place ranks while it spills onto the ring, or any outskirts face while
  it spills at the cap — plus the camped land past `densityCap`. A look that spills because its own place is exhausted,
  while a later look holds faces of another place, is lawful under §10.2 (e) and counts nothing. The fixture is a week of
  V08's dossier crisis fixtures (no condition stands standalone, DR44), named at X-V12-5 with its ground past `densityCap`
  so the order and the cap bind (HAND-OFF to V08 below).
* **VV34-r2-15, "adds".** V12's damage fixtures were V03 §7's restated; with the list cut to the citation the suite is
  one, registered by V03 (T-V3-39 (g)) and measured by V12 §3.15.13 — written as one entry, never two registrations of
  one suite.
* **VV1112-r2-07, budgets.** T121-5's captures at PR are placed inside V09's PR run of its app harness (T-V9-84 takes
  them), with no new figure; the PR rows of items 123 and 126 keep their figures (≤ 5 CPU-min, ≤ 5 min wall), each with
  its pre-decided change restated for the PR tier (every fourth level at PR; the tools' scripts rotating over PR runs),
  every level and tool still nightly.

## Agreement fixes made at the same units (the root cause, so the finding cannot recur)

* The Find failure row of §3.12 and §3.16 row 31 read the widened `find.*` measures (the gap outline and legend chip; the
  lifecycle steps; the count-0 chip), so the failure table and the edge suite name what the statistics count.
* §3.12's item-122 row reads the withheld condition, the scale cell, the barricade exception, the priority order and the
  cap; §3.16 row 33 adds the barricade look on a way.
* Every statement of the required-keys dossier's rungs (§1b, §2.13, §3.4.2, §3.15.15, §3.16, §6, §7.1, §9, §10.2) reads
  "every rung"; every statement of the damage fixtures (§1b, §2.13, §3.4.2, §3.15.13) cites V03 §7.

## HAND-OFFS (R3-01 (3): ends no line names, for round 4's verifiers; none is open wording in V12)

* **V08** (§7.1, the fixtures VV1112-r2-11 writes this round): the dossier crisis fixtures at `city-1` and at the
  METROPOLIS cap hold one week in which a siege, a quarantine and a refugee wave stand at once, their camped ground together
  past `densityCap` — read by V12's `crisis.share` (T122-6; X-V12-5 states it); the required-keys dossier at every rung,
  THORP to the cap (VV1112-r2-11's own text).
* **V02, V03, V08, V10, V11** (their registering clauses, written this round by VV1112-r2-09, VV34-r2-12, VV1112-r2-10,
  VAP-r2-10 and VAP-r2-09): V12's union now names each on its pin with these suites — T-V2-58 (f) B-MASS on
  `item115.ceiling`; T-V2-59 (d) the damage sub-fixture's exteriors on `item123.damage`; T-V2-60 (c) the look fixture's
  exteriors on `item122.crises`; T-V3-39 (g) the damage fixtures' plans on `item123.damage`; T-V3-40 (f) the damage
  fixtures' disaster district at the building band on `item122.crises`; T-V8-59 the frozen dossier set's crisis
  conditions on `item122.crises`; T-V8-61 (b) the frozen dossier set on `item125.host`; T-V10-45 the reader and why
  goldens, the brief's excepted, on `item111.water`; T-V11-39 (b) clause (a)'s four fixtures on `item113.history`;
  T-V11-40 (b) and T-V11-41 (b) B-CITY's 200 seeds per rung on `item114.condition` and `item115.off`, and T-V11-41 (b)'s
  TOWN, CITY and METROPOLIS seeds on `item115.ceiling`.
* **pipeline** (§10.2 (c), VV78-r2-05 = VAL-R2-06, R3-14 (4)): V12's `crisis.scale` second count reads "the count §10.2 (c)
  gives that share of its place's units".
* **V09** (T-V9-84): §13.8 runs T121-1, T121-4 – T121-7 at PR on V09's app harness; V12 now takes T121-5's captures there
  at PR (X-V12-20 already hands V09 the harness run).

## Words (principle (9)'s report)

`docs/volumes/V12-calibration.md`: 81 679 words before, 82 759 after by `wc -w` (+1 080, +1.3 %; 83 219 → 84 312 by a
Unicode-whitespace split). Removed: restatement — V12 §3.15.13's restated damage-fixture list (≈ 40 words) cut to "(V03
§7)", the double naming of one damage suite, the test id restated in `item115.off`'s bar cell; no narration, duplicated
mechanism or verbose prose was found in the units touched. Added: the defect fixes' design text — the widened Find and
crisis measures, `crisis.share` and the scale count with their planted cases, the barricade exception, the every-rung
required-keys runs, the PR tiers, the pin union and the owners named by id. A repair round over defects, so the unit
grows; its shrink stays the rewrite's.

## Checks

* **Dry run.** `apply-blocks.py` (amendments-b) on a copy of the live V12 (this file's blocks, the FILE line removed, as
  route.py splits them): 12 of 12 applied, 0 skipped, 0 malformed; audit 0 not OK; headings 67 → 67, none retitled; fences
  balanced; the title block unchanged; the output byte-identical to the generator's volume (sha256 90a61a9c9232…).
* **Ids.** T-V12-1 – T-V12-59 and J-V12 rows each defined once (no duplicate); the new metric id `crisis.share` defined
  in §3.4.2's registry and read by §3.15.12 and T-V12-54; every pointer added resolves (V03 §7, V08 §3.10, V08 §7.1,
  V08 §3.16 (7) (b), §10.2 (c) – (e), §8.8, §13.8, DR41, DR36 – DR39).
* **Scans.** No `R2-nn`, `R3-nn` or verifier id in V12; no "§7.7's condition row", "DR36 onward", "`priority` and
  `lookLevel`", "by element kind and material", "at TOWN, CITY and the cap" or "a way's carriageway included" left.
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2: before → after C1 8 → 8 (0 unreviewed), C2 0 → 0, C3 141 → 141 (127 → 127
  unreviewed), C4 2 → 2 (0), S1 0 → 0, S2 113 → 115 (11 → 11 unreviewed: the same pre-existing pointers, moved lines).

