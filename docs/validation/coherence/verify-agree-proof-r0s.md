# Agreement check — proof and plan: tests, bars, calibration and the build plan (verify-agree-proof-r0s)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r0s (first agreement check after assemble-r0), standing in for the Fable seat.

PROGRESS
- P1 brief, agreement matrix (78 pairs among scope and V01–V12, 1 864 shared subjects; this seat's are the test, bar, calibration and plan subjects), the canon's rules S4–S5, E-20, E-21, E-23, the id rulings, the cohesion checks and the dated rulings for g items 114–119, the peers' landed results: read — done
- P2 test-id census and the take-over table's both ends: done
- P3 the 505 cross-unit test references read against their targets: done
- P4 the build plan: §16 and INDEX §1/§3/§4/§5 against every volume's §8 (each price re-summed): done
- P5 calibration: §13.5/§13.8/§13.9 against V12 (§2.1, §2.5, §2.6, §2.13, §3.7.8, §3.9.1, §3.14, §3.15, §6–§8); the no-op pins and the BenchBarDef registrations across the set: done
- P6 hand-offs among the members on tests, bars, calibration and the plan, checked at their destinations: done
- P7 report and result: done

**Result: 33 issues — 0 blocker, 33 major** (24 DISAGREE, 6 HANDOFF-OPEN, 2 MATRIX-GAP, 1 DUPLICATE-HOME). Owners: scope 8,
V12 8, V04 4, V09 3, V06 2, V08 2, V11 2, V01 1, V02 1, V05 1, V10 1. Return:
`docs/validation/coherence/results/coherence_verify-agree-proof-r0s.json`. Design files untouched. No issue is a blocker: none
of the disagreements changes what the generator builds; each changes which test proves it, when a piece is built, or what a
record or plan says.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects: every test id and bar (T⟨item⟩-⟨n⟩,
T-Vn-m, the take-over of base hook bars), calibration (§13.5, §13.8, §13.9 against V12's records, the register, the bar map,
the no-op pins and the bench registrations), the combined build plan (§16) and INDEX.md (§1, §3, §4, §5) against every
volume's tests (§7) and build plan (§8). The fabric, layers, time, host and tools seats hold the other shared subjects; where
their findings touch this lane they are cited, not repeated.

**What was read, whole.** The brief; agreement.md/json for the 78 member pairs (the T-, D-, J-, BenchBarDef, CalibrationEntry,
CalibrationRun, MilestoneRecord, ShiftRecord, CorpusAdapter, StatBarSpec and NullModelSpec rows) and the 203 hand-offs (98
touching tests, bars, calibration or the plan); canon.md's head (numbers, precedence and home rules S1–S9, owner questions),
the id rulings, E-20 – E-23, the cohesion checks, the scope unit's section and the dated rulings for g items 114–119; the
base's §13 intro, §13.2's owner-item convention and its groups for items 101–113 with the take-over table, §13.4's
first-five-minutes test, §13.8 whole, §13.9 whole, §14's testkit row, §16 whole; INDEX.md whole; every volume's §8 whole
(V01–V12); V04 §7 and V06 §7 whole; the other §7s by every row that names a base bar, a pin, a tier, a panel or another
volume's test, with V07 §7's bench paragraph, V12 §7.1's tier column and V09 §7.3; V12 §1 (the rules hosted), §2.1, §2.5,
§2.6, §2.13, §2.14, §3.6b's bar map, §3.7.8, §3.9.1, §3.11's milestone-exit rule, §3.14.1, §3.15 whole and §10's hand-off
tables; V11 §3.24.0 and §8; V06 §3.7.7 (4); V02 §7.5; OWNER-DECISIONS-DELEGATED-2026-09-29.md's build order; AMENDMENTS-g
items 114–119's bar clauses.

**Checks run** (scratch scripts and receipts in the seat's scratch folder `agp/`):
- *Test-id census.* 258 base bars defined in §13 (one "(T101-6)" second occurrence is a citation inside T110-6, not a second
  definition); 688 volume tests, every family gap-free (V01 1–58, V02 1–57, V03 1–36, V04 1–80, V05 1–33, V06 1–74,
  V07 1–66, V08 1–57, V09 1–80, V10 1–50, V11 0–45, V12 1–51); 0 tests defined in the wrong volume; V02's twelve apparent
  duplicates are its BenchBarDef registration table and "T-V2-4's 'beyond'" (ID-DUPDEF's allowed forms); 0 unresolved
  references to a volume test and 0 to a base bar anywhere in the base, INDEX, the rationale file or the volumes.
- *The take-over table's both ends* (§13.2 convention (3), canon S4, W-05, CO-06): for each row, the base bars it hands a
  volume against the base bars that volume's tests name. Closed: V03 (all 17 named), V05 (all 4), V07 (all 11), V10.
  Open: V06 (2 of 49 named), V04 (T63-4 and T109-1 – T109-6 named nowhere), V02 (T110-4, T110-5), V08 (T108-1 – T108-4),
  V09 (T101-4, -5, -7, -8, -9) — VAP-01 – VAP-05. The stale ranges (T-V1-1 – T-V1-54 and the rest) are VCS-10's.
- *The 505 cross-unit references to volume tests* (196 target tests), each read beside the target's definition: the base's
  item-102 – item-110 groups cite the right volume tests clause by clause (T109-1 → T-V4-55; T109-2 → T-V4-44, -45, -58 and
  T-V6-37; T109-3 → T-V4-54, -43, -49 and T-V6-36, -34; T109-4 → T-V4-50, T-V6-40, T-V11-25; T109-5 → T-V4-51, -52 and
  T-V6-38, -39; T108-1 → T-V11-17; T107-3 → T-V11-14; T103 → T-V11-12, -13 and T-V5-22; T104 → T-V11-16, T-V5-23, -24;
  T105 → T-V11-14, -18; T102 → T-V5-19 – T-V5-21, T-V6-12, T-V11-30; T110-7 → T-V2-50, T-V6-65, T-V11-31); V12's bar map and
  hosted rules cite V04's, V06's and V11's bars by their content; V02's J-V2.104 reading "T-V1-26 reads the arena floor" holds
  (T-V1-26 (f)); the T-V3-25 manor clause is VAF-R0S-12's. One row disagrees (X-V12-13, VAP-28).
- *Prices re-summed* for every volume's §8 table and §16's lines: each volume's rows sum to its stated total (V01 27.25–36.25,
  V02 22.5–32.5, V03 18.5–25.25, V04 28.25–39.25, V05 17.25–23.25, V06 29.5–41.75, V07 29.75–41.75, V08 18–24.5, V09
  21.5–31.75, V10 14.5–20, V11 13.0–18.25, V12 base side 6.75–10.25 with W7, M-CAL 4.75–8); §16's base lines sum to
  194.25–264.25, its milestone rows to 221.5–300.5, its staged lines to 170.75–238.75 and the program to 392.25–539.25 —
  internally exact; the volume figures §16 and INDEX §1 carry for V06, V07, V08, V09, V10, V11 and V12 are stale (VCS-08,
  VCS-18, VV78-12; not raised again).
- *The no-op pins.* Every volume §7 row that names a no-op pin, against V12 §2.13's pin table and §3.7.8's list of volume pins:
  37 test rows naming a no-op pin, in all twelve volumes. V02's T-V2-50, V04's T-V4-69, V05's T-V5-15, V06's T-V6-65 and
  T-V6-71, V07's pins (by its §7 rule), V11's (by §3.24.0's rule and T-V11-36) and V12's T-V12-37 state their registration on
  V12 §3.7.8's engine; the other owner-item pins restated on a volume's own suite do not (VAP-17 – VAP-24, VAP-33). V02's
  T-V2-37 (`sunBias` 0.5) and V10's T-V10-10 (`w_sun` 0) are unit properties of one cell, not document suites, and need none.
- *The BenchBarDef registrations* — every bar a register line names as `bar.<id>` against its owner's registration: V02 (eleven,
  its §7 table), V03 (T-V3-35), V06 (eighteen, §8), V11 (T16-4, T-V11-30) register theirs; the base registers none and says
  nothing of them (VAP-14); V12's list of V06's omits two (VAP-27).

## Agreement confirmed (no issue)

The test-id namespaces (ID-TOOL's T⟨item⟩-⟨n⟩ and T-Vn-m kept apart; ID-JT's JT); §13.8's schedule for the owner items 102–113
against V12 §3.15's milestones (T111-2, -3, -5 at M1; T111-1, -4 at M2b; T112-1 at M3b; T113-1 – T113-3, T113-6, T113-7 at
M6-E; T113-4, T113-5 at the later of M6-U and M6-E) and V12's W7; the milestone tier as "every milestone exit, and weekly" read
the same by V06 §7 and V12; §16's base rows and lines (each re-summed) and its staged rows' starts-after against V02, V03, V04,
V05, V07, V08, V10 and V12 §8 (M6 after M5 beside M6-U; M6-P's P0, P1, P3 after M4, P2 with V04's access records, the rest
after M6; M6-U after M5 or beside it with a second pair, U3/U4 waiting on V01's W15; M6-sky after M6-U, its P0 beside M5; V-M0
after M0 beside M1; V-M1 – V-M4 after M4, V-M3's epoch clauses with M6-E's E2–E4, V-M2u after M6-U's tail; M3c after M3a
beside M3b, C1 inside M3a; M-CAL after M6-sky with inputs M4, M5, M6, V-M4; M-SF after M-CAL, SF0–SF3 earlier, VH with the
village); V02's M3a part and V03's PE inside M2b and M3a; V10's C1 and its M3a exit bars (T-V10-8, -9, -10, -30, -36, -41
and T101-6 (iii)); V12's rig shares by milestone (M1 1.75–2.25, M2b 2–2.75, M3a 1–1.75, M4 0.5–0.75, U3–U5 0.25–0.5); J122's
build order and INDEX §6's answers against OWNER-DECISIONS-DELEGATED; the owner's sittings (M1, M2b, M4, M5) and a staged
panel's unrated reading in §13.6, §16, V03 §8 and V12 §3.9.1; §16's release gate (T112-1, T112-2) against V09 §7.6, T-V9-72
and V12 §2.14; the D-5 pass rule (14 of 20 for NG) in §13.6 (2) and T-V1-32; MilestoneRecord.exitCriteria's widened result
against V12 §3.11's statuses; CalibrationEntry's shape against its V01, V04, V07 readers; ShiftRecord's `cause.kind
'calibration'` against CalibrationRun.shifts; K2's structure check K2-4 in V09 §7.2 and V12 §3.14.5; T-V4-41's fallback
(J-V4.60, item 552) in II.7.3 and V04; B-VILLAGE and B-VG in §13.8 and V07 §7; `w_sun` 0.02 as the default that T-V11-30 and
§13.2's T102-3 read; the hand-offs V06 X9, X19, X31, X38, X49, V02 X33, X-V12-2, X-V12-11 (for the six pins it names),
X-V12-12 (§16's M3a row; §13.2's conformance list), X-V12-14 (V07's village levels at V-M4 and its pin), X-V12-16, X-V12-17,
X-V12-18 and X-V12-19, each closed at its destination.

## Matrix gaps found (subjects the matrix holds no row for)

Shared by two or more members and absent from agreement.json's pairs, each judged here: `NoOpPin` (base, V02, V07, V10, V11,
V12 and the volumes' pins) — **disagree**, VAP-17 with VAP-16, VAP-18 – VAP-24, VAP-33; `PanelSpec` (V12 §3.9.1 and the seven
owning volumes) — **disagree**, VAP-31 and VAP-32; the owner-item bar ids the volumes cite (T108-1, T109-6, T110-7, T111-5,
T112-1, T112-2, T113-5) — **disagree** where the take-over is open (VAP-02, VAP-04), else agree; the milestone ids M6-U,
M6-P, M3c, V-M0, M-CAL (the matrix carries only M6-E) — agree but for VAP-06, VAP-09, VAP-11; the fixture families B-MASS,
B-PLAN, B-DOSSIER(-lite), B-VILLAGE, B-VG, H-100, K1, K2 — agree; `D5Record`, `TrialRecord`, `KnownCityFixture`,
`StructureResult`, `register.json` — agree; `CalibrationRun`, which the matrix homes in scope while the text now homes it in
V12 §2.5 — VAP-13.

## Overlaps with the landed verifiers (not raised again)

§16's and INDEX §1's stale volume prices and E0–E8 (VCS-08, VCS-18, VV78-12); items 114–119's absent base bars, index rows and
milestone rows (VCS-01 – VCS-06, VCS-09) — VAP-30 is only the id agreement V12 must follow once they exist; the take-over
table's stale volume ranges (VCS-10) — VAP-01 – VAP-05 are the volume ends; INDEX's PROGRESS ledger and stale intro (VCS-19);
V02 §8.1's "P0–P1" (VV12-15); V06 §7's missing take-over (VV56-23, raised there as minor) — VAP-01 gives the table it needs;
the staged screens' pricing hand-off XV-V9-8 (VAL-21); V12 §2.13's item 111, 113 and 114 rows citing the bars, not V11
§3.24.0 (VV1112-14) — VAP-15 is the base's side of it; V12's missing V09 screen bars (VV1112-17); X-V12-15 without `-72`
(VV1112-18) — VAP-27 adds `-62`; the T-V3-25 manor clause (VAF-R0S-12).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-01 | major | HANDOFF-OPEN | V06 | take-over table, evolution row: no T-V6 test names its 47 base bars |
| VAP-02 | major | HANDOFF-OPEN | V04 | take-over, underground row: T63-4, T109-1 – T109-6 never named by V04 |
| VAP-03 | major | HANDOFF-OPEN | V02 | take-over, stage-3 row: T110-4, T110-5 never named by V02 |
| VAP-04 | major | HANDOFF-OPEN | V08 | take-over, SettlementForge row: T108-1 – T108-4 never named by V08 |
| VAP-05 | major | HANDOFF-OPEN | V09 | take-over, application row: T101-4, -5, -7, -8, -9 never named by V09 |
| VAP-06 | major | DISAGREE | V09 | AP5 at M4 before V06 builds forkAt, rerunFrom, the timeline (E6, M6-E) |
| VAP-07 | major | DISAGREE | scope | §16 names none of V01 §8.1's M1, M2b and M3a pieces |
| VAP-08 | major | DISAGREE | V11 | V11's C4 split unstated; §16 prices C4 in both totals |
| VAP-09 | major | DISAGREE | scope | INDEX §3's table and graph against §16's staged table |
| VAP-10 | major | DISAGREE | scope | INDEX §1 placements and §5's spike list against the volumes' §8 |
| VAP-11 | major | DISAGREE | scope | T-V10-26 needs a first-five-minutes session at M3c that §13.4/§13.8 do not hold |
| VAP-12 | major | DISAGREE | scope | §13.8's volume-12 tier list against V12 §7.1 |
| VAP-13 | major | DUPLICATE-HOME | scope | §13.9 restates CalibrationRun (evidence, band) beside V12 §2.5 |
| VAP-14 | major | HANDOFF-OPEN | scope | X-V12-15 open at the base: no BenchBarDef clause, base-owned BenchBarDefs unassigned |
| VAP-15 | major | DISAGREE | scope | T111-5's three neutral cells vs V11 §3.24.0's six; convention (5) names §3.24.0 for item 110 only |
| VAP-16 | major | DISAGREE | V12 | item 115's pin: V12 rungScope only vs V11's enabled-false off form |
| VAP-17 | major | MATRIX-GAP | V12 | MATRIX-GAP NoOpPin: V12 §2.13 suites and §3.7.8 list omit the volumes' restated pins |
| VAP-18 | major | DISAGREE | V06 | V06's pins: §3.7.7 (4) off form, who registers, H-100 suites |
| VAP-19 | major | DISAGREE | V04 | V04's item-109 and item-113 pins unregistered; T-V4-35 claims T-V4-47's pin |
| VAP-20 | major | DISAGREE | V05 | V05's five restated pins unregistered |
| VAP-21 | major | DISAGREE | V11 | exposureAllStoreys missing from V11 §3.24.0's item-110 off form (T-V3-34) |
| VAP-22 | major | DISAGREE | V01 | V01's T-V1-4 (e) pin unregistered, three row sets |
| VAP-23 | major | DISAGREE | V08 | V08's T-V8-50 pin: 'chances' only, unregistered |
| VAP-24 | major | DISAGREE | V09 | V09's T-V9-57 canvas pin unregistered, three row sets |
| VAP-25 | major | DISAGREE | V04 | V04's StatBarSpec list omits T-V4-52 |
| VAP-26 | major | DISAGREE | V12 | V12 bar map: '—' owner bars for T104-3's and T107-1, T107-2's rows |
| VAP-27 | major | DISAGREE | V12 | X-V12-15's V06 list omits T-V6-62, T-V6-72 |
| VAP-28 | major | DISAGREE | V12 | X-V12-13: T-V4-58 '500 seeds' vs '≥ 200 undercities' |
| VAP-29 | major | DISAGREE | V12 | V12 §3.14.1: K2's building bars omit T-V2-51 and T-V2-42's arena part |
| VAP-30 | major | DISAGREE | V12 | V12 §3.15 keys base BenchBarDefs by ids the base does not have |
| VAP-31 | major | MATRIX-GAP | V12 | MATRIX-GAP PanelSpec: V12's M6 row omits V02 §7.5 (3) |
| VAP-32 | major | DISAGREE | V04 | V4-U5 panel spec stated two ways (V04 §7, V12 §3.9.1) |
| VAP-33 | major | DISAGREE | V10 | V10's T-V10-43 reader-golden pin unregistered, three row sets |

### VAP-01 — HANDOFF-OPEN, major, owner V06

**Claim.** §13.2's take-over table (base l.16161) hands the evolution engine 47 base bars — T8-1 – T8-7, T17-2, T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12, T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T113-1 – T113-3, T113-6, T113-7 — and the convention requires 'each of its tests naming the base bar and the clauses it takes' (§13.2 l.16155; canon S4). V06 §7 names only T67-2 (inside T-V6-19) and T67-5 (the parity paragraph); no T-V6 test names any other of the 47, so the hand-off has no volume end (T-V6-71 runs item 113's replay without naming T113-1 – T113-3, T113-6, T113-7). Overlaps VV56-23 (raised there as minor COHESION).

**Required change.** V06 §7 gains one take-over table — base bar → the T-V6 test that re-runs it → the clause it takes — covering every bar of §13.2's evolution row: at least T113-1 – T113-3, T113-6, T113-7 → T-V6-71; T67-1 – T67-6 → T-V6-19 and T-V6-21 (T67-5 the parity paragraph); T18-1 – T18-4's epoch-spread form → T-V6-15; T20-2's and T20-6's epoch clauses → T-V6-27 and T-V6-49; T76-1's per-year clause → T-V6-25; T8-1 – T8-7 → T-V6-5 – T-V6-8, T-V6-28 and T-V6-54 by clause; and, for each bar no T-V6 test re-runs (T25-1, T31-2, T31-3, T31-8 – T31-12, T70-1 – T70-4, T72-1 – T72-9's epoch clauses, T81-1), either a clause added to the T-V6 test whose fixture runs it or the bar struck from §13.2's evolution row by the scope editor, never left unnamed.

### VAP-02 — HANDOFF-OPEN, major, owner V04

**Claim.** §13.2's take-over row for the underground (base l.16163) lists T63-4 and T109-1 – T109-6 for volume 4, and §13.2's own item-109 group names the V04 tests that take each clause (T109-1 → T-V4-55; T109-2 → T-V4-44, T-V4-45, T-V4-58; T109-3 → T-V4-54, T-V4-43, T-V4-49; T109-4 → T-V4-50; T109-5 → T-V4-51, T-V4-52). V04 never names T63-4 or any T109-n (0 occurrences in the volume): its tests T-V4-43 – T-V4-58 cite 'g item 109' clauses only, and T-V4-47 (the T109-6 pin) names no base bar; its §7 intro writes the taken group as the bare 'T63–T66' (ID-TOOL forbids a bare bar group) and so omits T63-4 by name. The base end exists, the volume end does not.

**Required change.** V04 §7's intro reads 'keeps the base's hook tests T11-1, T12-1, T14-1, T63-4 and T64-1 – T66-6 green …'; T-V4-55 adds '(takes T109-1)', T-V4-44 and T-V4-45 '(take T109-2's structure and distinctness clauses)', T-V4-58 '(T109-2's ranked-share clause)', T-V4-43, T-V4-49 and T-V4-54 '(T109-3's presence, access and depth clauses)', T-V4-50 '(takes T109-4)', T-V4-51 and T-V4-52 '(take T109-5)', T-V4-47 '(takes T109-6)'; and one V04 test (a clause added to T-V4-34 on the underground fixtures) names T63-4 and re-runs it on generated output at U4.

### VAP-03 — HANDOFF-OPEN, major, owner V02

**Claim.** §13.2's take-over row for stage 3 (base l.16165) lists T110-4 (tiers nest, one shadow each) and T110-5 (deck plots within the deck's width and budget) for volume 2, and V12 l.142–143 maps them to V02's T-V2-44 and T-V2-47; V02 names neither base bar anywhere (0 occurrences), so T-V2-44 and T-V2-47 re-run the clauses without naming the bars they take.

**Required change.** T-V2-44's heading reads '… (item 110 (f); takes T110-4)' and T-V2-47's '… (takes T110-5's deck-building clause; the deck-plot clauses stay T-V1-53's and T-V6-63's)'.

### VAP-04 — HANDOFF-OPEN, major, owner V08

**Claim.** §13.2's take-over row for the SettlementForge connection (base l.16168) lists T108-1 – T108-4 for volume 8; V08 names none of them (0 occurrences) — T-V8-44 'the ladders (item 108 (f))' runs T108-1 – T108-3's dossier clauses without naming them, and §8.3's release row R1 lists every other bar of the row (T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3, T88-1 – T88-2) but not T108-1 – T108-4. T108-4 (a promotion or demotion by least disruption) is re-run by V06's T-V6-45, not by any V08 test.

**Required change.** T-V8-44 adds '(takes T108-1 – T108-3's dossier clauses)'; §8.3's R1 adds 'T108-1 – T108-3'; and the scope editor moves T108-4 from §13.2's SettlementForge take-over row to its evolution row ('T108-4 over epochs — T-V6-45'), with V06's VAP-01 table naming it.

### VAP-05 — HANDOFF-OPEN, major, owner V09

**Claim.** §13.2's take-over row for the application (base l.16170) hands volume 9 'T101-1 – T101-9 on the canvas'; V09 never names T101-4, T101-7, T101-8 or T101-9 (0 occurrences) and names T101-5 nowhere in §7, although T-V9-5 ('the count badge is true') is T101-9's canvas clause, T-V9-6 ('declared means held') is T101-8's and T-V9-13 ('refusals and bends are actionable') is T101-5's; no V09 test names T101-7's points-in clauses (the two-point wall, the seed quarter on centre-lines, the level lake's contour) or T101-4's skeleton round trip of a canvas-declared subset.

**Required change.** T-V9-5 adds '(takes T101-9 on the canvas)', T-V9-6 '(takes T101-8)', T-V9-13 '(takes T101-5's refusal clause)'; one V09 test (T-V9-3's tool scripts or a new row) names T101-7 and runs its three points-in clauses through the canvas; and one names T101-4 and runs the skeleton export and re-import of a canvas-declared subset to the same model digest.

### VAP-06 — DISAGREE, major, owner V09

**Claim.** V09 §8.1 places AP5 — 'Open a copy from here' on V06's forkAt, 'Re-run from here' on rerunFrom, the Chronicle tab joined to V06's timeline bar, chronicle.csv and uses-history.csv — at M4 inside the base line (also J-V9.103; T-V9-16's copy clause, T-V9-41 and T-V9-53's epochs 'M4 (with V06)'), and §16's carried row repeats 'AP5 (M4)'. V06 builds forkAt, rerunFrom, the timeline bar and the history panel at E6 and the chronicle skeleton at E1 of M6-E, which J122's order starts only after M4 (V06 §8; §16's staged table). V09's own rule ('never ahead of the engine it drives') and V06 §8 disagree with AP5's slot.

**Required change.** V09 §8.1's AP5 row reads milestone 'M6-E (with V06's E6)'; AP5's 0.5–0.75 pw moves from the base line to the staged-screens line (V09's base line 16.25–24.0, staged AP5–AP8 and AP10 3.25–5.0; the total unchanged); T-V9-16's copy clause, T-V9-41 and T-V9-53's epoch clause read 'M6-E (with V06's E6)'; J-V9.103 reads 'AP5 (time, M6-E)'; and §16's carried row and staged-screens line follow (VCS-08's recomputation carries the move).

### VAP-07 — DISAGREE, major, owner scope

**Claim.** V01 §8.1 lands three pieces of stage 2 inside base milestones — M1: the schema (Block.content, Block.overrides, HoodPlace's registry row, DistrictContext, Recipe.product, the three concern ids and the S8.seed stage id, the way-naming context's features in S13a, hood.constants' row; ≈ 0.5 pw); M2b: Way.slopeP95 and the way-surface rule (item 207), S7b's and S10a's hook points (item 323), squares.quota (item 301; ≈ 0.25 pw); M3a: District.terrace (item 211), terraceState, the bent cut's levelledUnits / terracedEdges declaration (item 506), hood.templates' stepped row (≈ 0.25 pw) — and V01 §8.2 says they are 'absorbed by those milestones' lines, as §16's pricing rule allows'. §16 names none of them (0 occurrences of Block.content, slopeP95, squares.quota, District.terrace, hood.constants in §16), while its pricing rule requires every absorbed refinement to be named with the line that absorbs it.

**Required change.** §16's M1, M2b and M3a rows each name V01 §8.1's piece for that milestone (with its file f items), and §16's absorbed-refinements paragraph names each with its line: M1's schema and naming-context pieces under the O9 line and the content line's naming grammar, M2b's way-surface rule and squares.quota under the content line, M3a's terrace declarations under the O17 + O18 + O19 line's item-110 share — or widens those lines by ≈ 0.5, 0.25 and 0.25 pw, keeping the milestone rows equal to the first total.

### VAP-08 — DISAGREE, major, owner V11

**Claim.** V11 §8 prices C4 (1.5–2.0 pw) as one milestone placed in two slots — 'the SettlementForge stage (V08's milestones); wall rows at M2b with item 106's base' — and C8 at M6-U (0.75–1.0). §16 then carries C4 twice and C4 + C8 at a figure V11 does not state: the base content line holds 'file g's rows — … ladders, the 280 kind rows, walls (items 103–108; V11 §8, 2.5–4)' inside the first total (the 280 kind rows and the ladders are C4's dossier.kinds and dossier.ladders), and the staged line 'the content's staged rows (V11: C4 at M-SF, C8 at M6-U) ≈ 1.75–2.5' sits outside it, while V11's C4 + C8 is 2.25–3.0. The split of C4 between M2b and M-SF, and its g share, are stated nowhere, so §16 cannot place them.

**Required change.** V11 §8 splits C4 into two rows with their own prices — C4a, the wall barrier and waterfront rows at M2b with item 106's base, and C4b, the SettlementForge rows (dossier.kinds, archetypes, synonyms, keywords, good words, ladders) at M-SF — and its total row states which rows sit in §16's first total (C0–C3b, C4a, C5–C7, C9's base parts) and which on the staged line (C4b, C8); §16's content line and staged V11 line then carry exactly those figures (the 280 kind rows and the ladders on the staged line only) under VCS-08's recomputation.

### VAP-09 — DISAGREE, major, owner scope

**Claim.** INDEX.md §4 says the order 'is stated once, in §16's staged-milestones table', yet INDEX §3 restates its starts-after and runs-beside cells with different values: V-M1 runs beside 'M5' (§16's village row: 'M5, M6-E, M6-P's first rungs'); M6-P runs beside 'M6' (§16: 'M5, M6'). INDEX §3's graph draws every after-M4 stream and 'V-M0 … right after M0' from the node 'M-1 … M4b' (the whole base), so its edges say V-M0 waits for M4b and the four streams for M4b, contradicting §16 and its own labels; M3c sits in the base subgraph with no edge.

**Required change.** INDEX §3's table carries §16's cells exactly (V-M1: 'M5, M6-E, M6-P's first rungs'; M6-P: 'M5, M6') or is replaced by a pointer to §16's staged table; the graph splits the base node into 'M0' and 'M4' (and 'M3a' → M3c beside M3b) so V-M0 leaves M0, the village, M6-E and M6-P's P0, P1, P3 leave M4, and M3c leaves M3a.

### VAP-10 — DISAGREE, major, owner scope

**Claim.** INDEX.md restates where the volumes build and which spikes run, differing from the volumes' §8: §1's V12 row 'base side inside M-1–M4' while V12 §8.2's W6 lands at V4-U3 – V4-U5 (M6-U; §16's carried row says so) and W7 at M6-E, M6-U, the milestones of items 115–118 and the release candidate; §1's V11 row omits C9 ('beside each item's base milestone') and C4's wall rows at M2b; §1's V09 row omits AP11 (V09 §8.1); §5's spike list ('Spikes, in the order they run') gives V12 only S-V12-1 and S-V12-2 (V12 §8.3 adds S-V12-3 and S-V12-4 at M2b), V02's spikes as 'before M6a' (only SP-V2-1 is; SP-V2-2 runs inside M6a, SP-V2-3 inside M6c, SP-V2-4 before M6c), V09's as S-A2 alone (V09 §8.2: S-A1 – S-A4), V10's C0 as S1, S2 (V10 §8: S1 – S4), and V04's U0 without its U3 and U3b risk spikes; risk 3 names S-V12-1 – S-V12-3 but not S-V12-4.

**Required change.** INDEX §1's 'where it is built' cells read: V12 'base side M-1 – M4, W6 at M6-U's U3 – U5, W7 with each owner item's milestone (V12 §8.2); M-CAL staged'; V11 adds 'C4's wall rows at M2b; C9 beside each owner item's base milestone'; V09 adds 'AP11 with the owner items' engines'. INDEX §5's spike list gives each volume's spikes as its §8 states them (V12 S-V12-1, S-V12-2 at M-1, S-V12-3, S-V12-4 at M2b; V02 SP-V2-1 before M6a, SP-V2-2 in M6a, SP-V2-4 before M6c, SP-V2-3 in M6c; V09 S-A1 – S-A4; V10 S1 – S4; V04 U0 and its U3 and U3b spikes), or cites each §8 in place of the list; risk 3 adds S-V12-4.

### VAP-11 — DISAGREE, major, owner scope

**Claim.** V10 places a first-five-minutes session at the built-in clerk's milestone: T-V10-26 ('in §13.4's sessions once the clerk exists, each participant asks the clerk …') is an exit of C5 at M3c's exit, and V10 §8 builds M3c 'before the first-five-minutes session that measures the clerk'. §13.4 holds the sessions only inside M3a (midpoint and exit) with M2a's pipeline session, §13.8's schedule row reads 'M2a (the pipeline session), M3a (midpoint and exit)', and V09 §7.3 (1) runs no other; the built-in clerk exists only from M3c, after both. T-V10-26 has no session to run in, so M3c's exit (§16: 'V10 §8's exits') can never be met.

**Required change.** §13.4's first-five-minutes test adds 'and at M3c's exit, a clerk session of five such participants running T-V10-26's clerk task, its result an exit criterion of M3c's MilestoneRecord'; §13.8's schedule row reads 'M2a (the pipeline session), M3a (midpoint and exit), M3c (the clerk task, T-V10-26)'; V09 §7.3 (1) cites the M3c session.

### VAP-12 — DISAGREE, major, owner scope

**Claim.** §13.8 says 'each volume's §7 names the tier of each of its bars' and then restates volume 12's tiers, differently from V12 §7.1's tier column: its PR list ('T-V12-1, -2, -9, -16, -20, -28 and -30's fixtures, K2's skeleton path and the no-op pins' landing gate') omits T-V12-4's PR clause ('PR (two golden seeds)') and T-V12-42 ('PR fixtures from M1'); its nightly list ('T-V12-4, -5 and -7 …') omits T-V12-43 ('nightly from each feature's milestone') and T-V12-37's nightly run; item 119's wait timing (T-V12-50, V12 §6's timing-phase row) is absent.

**Required change.** §13.8's volume-12 sentence is replaced by 'Volume 12: each bar in the tier its §7.1 column states, inside V12 §6's budgets (≤ 20 CPU-min for B-REF, ≤ 10 for the correlation specs, ≤ 15 for the web, comfort and chain bars, ≤ 60 for the underground's sweeps and pooled bars, ≤ 20 for the raised-way bars, ≤ 10 min wall for the known-city paths)', or completed with T-V12-4's PR clause, T-V12-42 in PR, T-V12-43 nightly and T-V12-50 in the timing phase.

### VAP-13 — DUPLICATE-HOME, major, owner scope

**Claim.** §13.9's code block says 'CalibrationRun is V12 §2.5's' and then restates its fields in a comment, differently: 'changes { table, rowKey, column, from, to, evidence: baseline ids }', while V12 §2.5 declares 'changes: { ref: CellRef; from; to; evidence: string[] } // evidence = baseline ids + this run's id' with CellRef carrying 'band' — a second statement of V12's record that drops the run id from the evidence and the band from the cell. (The agreement matrix still records CalibrationRun's home as scope; the text has moved it to V12.)

**Required change.** §13.9's CalibrationRun comment is reduced to a pointer — '// CalibrationRun: V12 §2.5 (kinds reference, fallback, corpus; its changes, before and after, and ShiftRecord ids with cause kind calibration)' — stating no field, or restates the changes field exactly as V12 §2.5's ('{ ref: CellRef; from; to; evidence: baseline ids and the run's id }').

### VAP-14 — HANDOFF-OPEN, major, owner scope

**Claim.** V12's hand-off X-V12-15 to the base ('every bar a register line names as bar.<id> that no spec carries registers a BenchBarDef with the milestone whose exit writes the entry'), routed to scope by the canon, is closed nowhere in the base: 'BenchBarDef' occurs 0 times in docs/ARCHITECTURE.md; §13.2's convention covers NullModelSpec, StatBarSpec and the conformance list only; §14's @plat/testkit row names no `@plat/testkit/bars`. Yet V12 §3.15 makes the base own BenchBarDefs no base seat is told to register: bar.T112-1 (3.15.2), T113-1, T113-3, T113-4, T113-6 ('each a BenchBarDef its owner registers', 3.15.3), T114g.greyscale and T114g.generation (owner base), T117i.crowns, the five T118h.* bars and T119f.waits (owner base).

**Required change.** §13.2's convention gains (7): 'a bar a register line names as bar.<id> that no NullModelSpec or StatBarSpec carries is a BenchBarDef (V12 §2.1, @plat/testkit/bars), registered by the seat landing the milestone whose exit writes the entry — the base's T16-4 by V11's C1 seat (V11 §8), T112-1 by the M3b seat, T113-1, T113-3, T113-4 and T113-6 by the M6-E and M6-U seats, and the base bars of items 114–119 by the seats landing their mechanisms'; §14's @plat/testkit row adds '@plat/testkit/bars (the BenchBarDef registrations)'.

### VAP-15 — DISAGREE, major, owner scope

**Claim.** Item 111's no-op pin is stated with two different off forms. §13.2's T111-5 neutralises three cells ('the oasis chance, the water pull and item 102's climate cell'), and V12 §2.13's item111.water overlay reads 'the cells T111-5 names'; V11 §3.24.0's off form for the climate dry cells is six — dry.oasis.chance 0, dry.waterPull 0, dry.waterProsperity 0, dry.sunCell 1, dry.wellYieldWeight 0, dry.wellCoverageFactor 1. Under the three-cell overlay the prosperity water term and the wells by yield (item 111's M2b parts, §16) stay on, so the pin's 'byte-identical to the base' cannot hold. §13.2's convention (5) also names V11 §3.24.0 only 'for item 110', while §3.24.0 states the off forms of items 111, 113, 114 and 115 too (V11 W61).

**Required change.** §13.2's T111-5 reads 'with item 111's climate dry cells at V11 §3.24.0's off form (the oasis chance, the water pull, the water prosperity term and the well yield weight 0; the sun cell and the well coverage factor 1), byte-identical to the base (a NoOpPin)'; convention (5) reads 'its off form the item's switch cells in volume 11 (V11 §3.24.0 for items 110, 111 and 113–115, V11 §3.7.4's web off form for items 105 and 107, the cells the bar names otherwise)' (V12 §2.13's item111.water, item113.history and item114.condition rows then cite §3.24.0, VV1112-14).

### VAP-16 — DISAGREE, major, owner V12

**Claim.** Item 115's pin differs between its two homes. V11 §3.24.0 gives item 115 an off form — grandeur.ceiling 'enabled false on every row' — and T-V11-41 (b) makes it a pin ('enabled false, and at TOWN and above with it true, byte-identical to the base without item 115'), with §3.24.0's closing rule 'every no-op pin of the owner items is a NoOpPin registration … that reads its off form from this table'; V12 §2.13 registers item 115 only as a rungScope pin (`item115.ceiling`, rungs TOWN, CITY, METROPOLIS, no overlay), so the enabled-false clause is registered nowhere.

**Required change.** V12 §2.13 registers item 115 as two pins — `item115.off` (kind offForm, overlay V11 §3.24.0's grandeur.ceiling enabled false, bar item 115 (f) / T-V11-41 (b), suites the golden suite and V07's village goldens) and `item115.ceiling` (rungScope, as now) — and V12 §3.7.8 (5) and §3.15.5 name both.

### VAP-17 — MATRIX-GAP, major, owner V12

**Claim.** The matrix holds no row for NoOpPin, although the record is shared by the base (§13.2 convention (5)), V11 (§3.24.0), V12 (§2.13, §3.7.8) and nine volumes' pins; the pin set disagrees. V12 §3.7.8 lists six volume pins (T-V2-50, T-V4-69, T-V5-15, T-V6-65, T-V11-31, V07's village pin) and §2.13's suites column names V04 only for items 109 and 110, V05 only for 102, 110 and 117, V07 only for 110, 111, 114, 117 and 118; but the volumes restate owner-item pins outside those lists — V07's T-V7-33 (item 105), T-V7-38 (109), T-V7-59 (113), registered by V07 §7's own rule; V04's T-V4-47 (109) and T-V4-77 (d) (113); V05's T-V5-19 (c) (102, on its island fixture, not the sky goldens), T-V5-22 (b) (103) and (k) (105, 107), T-V5-27 (106), T-V5-33's island clause (111); V01's T-V1-4 (e) (110); V03's T-V3-34 (110); V08's T-V8-50 (111); V09's T-V9-57 (110, canvas scripts); V10's T-V10-43 (110, reader goldens). Verdict: disagree.

**Required change.** V12 §2.13's suites column lists every volume pin above under its item's pin, each with its owner (V07's village pins on item105.web, item109.underground and item113.history; V04's underground goldens on item113.history; V05's island fixtures on item102.sun, item103.coverage, item105.web / item107.spread, item106.barrier and item111.water; B-PLAN and B-CITY-lite plans (V03), the neighbourhood suite (V01), the canvas scripts (V09) and the reader goldens (V10) on item110.*; V08's port fixtures on item111.water), and V12 §3.7.8's list of volume pins names them all; the owners' registrations are VAP-18 – VAP-24 and VAP-33.

### VAP-18 — DISAGREE, major, owner V06

**Claim.** V06's pins disagree with V11 §3.24.0 and V12 §2.13. (a) V06 §3.7.7 (4) states item 114's neutral values as meansLow 0, wearChancePerYear null and needReturnYears 0; V11 §3.24.0's walls.condition off form adds atGeneration false, without which H-100's generated start already carries condition shares and the history cannot equal the pre-114 one. (b) V06 §3.7.7 (4) says 'V12 registers the pin', while V12 §2.13 says the suites are 'registered by their owners' and lists 'H-100 and the wall fixtures (V06)' — and V12 §2.13 also lists H-100 (V06) on item102.sun, item105.web / item107.spread and item111.water, none of which V06 states it registers (T-V6-12's w_sun = 0 clause, T-V6-44 and T-V6-72 name no NoOpPin; only T-V6-65 and T-V6-71 do). (c) T-V6-72's pin is a code-removal on a spring-less site ('byte-identical with the springs' rules removed'), not V12's item111.water overlay on H-100.

**Required change.** V06 §3.7.7 (4) reads 'Neutral values (the no-op pin): V11 §3.24.0's walls.condition off form (atGeneration false, meansLow 0, wearChancePerYear null, needReturnYears 0) reproduces the rules before item 114 byte for byte; V06's E3 seat registers H-100 and H-WALLS on V12 §2.13's item114.condition'; T-V6-12's w_sun clause, T-V6-44 and T-V6-72 each state 'registered on V12 §3.7.8's engine' with their suites (H-100 on item102.sun, item105.web / item107.spread and item111.water, the last with V11 §3.24.0's climate dry cells off), T-V6-72's spring-less-site clause kept as a separate conformance clause.

### VAP-19 — DISAGREE, major, owner V04

**Claim.** V04's item-109 and item-113 pins are not on V12's engine and two tests claim one pin. T-V4-47 is T109-6's pin ('with the ruin chance 0 and the relief, boost and fissure rows at the base's values … byte-identical') but, unlike T-V4-69, states no NoOpPin registration, while V12 §2.13 lists 'the underground goldens (V04)' on item109.underground; T-V4-35 (the parity presets) also calls itself 'g item 109 (i)'s no-op pin'; T-V4-77 (d)'s replay-off clause is item 113's pin, not registered on item113.history.

**Required change.** T-V4-47 reads '… a NoOpPin registration of the underground goldens on V12 §3.7.8's engine (item109.underground, takes T109-6)'; T-V4-35's parenthesis reads '(item 109 (i)'s pin is T-V4-47)'; T-V4-77 (d)'s clause reads '… byte-identical (item113.history, the underground goldens registered on V12 §3.7.8's engine)'.

### VAP-20 — DISAGREE, major, owner V05

**Claim.** V05 restates five owner-item pins on the island — T-V5-19 (c) (item 102, w_sun = 0), T-V5-22 (b) (item 103's coverage weight 0) and (k) (items 105 and 107 off), T-V5-27 (item 106's barrier closure off), T-V5-33's item-111 clause (the island byte-identical with item 111's cells neutral) — none stating a NoOpPin registration, although V12 §3.7.8 requires 'each volume pin that restates one' to register its suites; V12 §2.13 lists 'the sky goldens (V05)' on item102.sun, a suite T-V5-19 (c) does not use.

**Required change.** Each of the five clauses states its registration — 'a NoOpPin registration on V12 §3.7.8's engine of [the clause's fixture], off form V11 §3.24.0's / V11 §3.7.4's row for the item' (item102.sun; item103.coverage; item105.web and item107.spread; item106.barrier; item111.water) — written by the M6-sky seat landing the phase that builds each mechanism.

### VAP-21 — DISAGREE, major, owner V11

**Claim.** Item 110's plan-rung pin needs a switch V11's off form lacks. T-V3-34 holds B-PLAN and B-CITY-lite plans byte-identical to the pre-110 plans only 'with exposureAllStoreys false' (V03's PlanGeometryRow switch for item 110 (a)'s exposure gates, default true, J-V3.84); V11 §3.24.0's item-110 switch table (terrace, raisedWays, deck, roster.specialisations, deck.landmarks) — which V12 §3.7.8 (1) makes the one statement of item 110's 'off' — omits it, so item110.*'s overlay leaves the exposure gates on and the plans move. T-V3-34 states no NoOpPin registration either.

**Required change.** V11 §3.24.0's switch table gains the row '`roomProgram` PlanGeometryRow.exposureAllStoreys (item 110 (a)) | false | the plan rung's outside-ground gates on the ground storey only, as before item 110 (V03 §3.6)', with its presets.MFCG, .FTG and .VG entries false; and V03's T-V3-34 reads its first clause as the item110.* NoOpPin over B-PLAN and B-CITY-lite plans registered on V12 §3.7.8's engine by the P1 seat (V12 §2.13's suites list it).

### VAP-22 — DISAGREE, major, owner V01

**Claim.** V01's T-V1-4 (e) is item 110's pin on the neighbourhood suite ('with the terrace, raised-way and deck-plot rows off, byte-identical to the build without them') but states no NoOpPin registration and reads 'off' as three row sets, while V12 §3.7.8 (1) states item 110's off form once as V11 §3.24.0's five (terrace, raisedWays, deck, roster.specialisations, deck.landmarks) and requires the volume pin to register on the engine; V12 §2.13 lists no V01 suite on item110.*.

**Required change.** T-V1-4 (e) reads 'the no-op pin (item 110 (f)): with V11 §3.24.0's item-110 switches off, byte-identical — a NoOpPin registration of the M5 neighbourhood suite on V12 §3.7.8's engine (item110.*), written by the M5 seat', V01's own item-110 rows' extension marking unchanged.

### VAP-23 — DISAGREE, major, owner V08

**Claim.** V08's T-V8-50 restates item 111's pin through the bridge ('with item 111's chances neutral and no oasis deposit the build is byte-identical (item 111 (d)'s no-op pin through the bridge)') with 'chances' only and no NoOpPin registration, while item 111's off form is V11 §3.24.0's six climate dry cells and V12 §3.7.8 requires a restating volume pin to register its suites.

**Required change.** T-V8-50's last clause reads 'with V11 §3.24.0's climate dry cells off and no oasis deposit, byte-identical (item111.water, the port fixtures registered on V12 §3.7.8's engine by the SF4 seat)'.

### VAP-24 — DISAGREE, major, owner V09

**Claim.** V09's T-V9-57 'the no-op pin on the canvas' (with volume 11's terrace, raised-way and deck-plot rows off, fixture 1's canvas script yields the model digest it yielded before item 110) restates item 110's pin but states no NoOpPin registration and reads 'off' as three row sets; V12 §3.7.8 requires each restating volume pin to register its suites and states item 110's off form once as V11 §3.24.0's five switches, and V12 §2.13 lists no canvas suite.

**Required change.** T-V9-57 reads '… with V11 §3.24.0's item-110 switches off … — a NoOpPin registration of the known-city canvas scripts on V12 §3.7.8's engine (item110.*), written by the M3a seat'.

### VAP-25 — DISAGREE, major, owner V04

**Claim.** V04 §7's intro lists its StatBarSpecs of V12 §3.6b's bar map as 'T-V4-43, T-V4-44, T-V4-45, T-V4-49, T-V4-51, T-V4-54, T-V4-55, T-V4-58', but V12's bar map also makes T-V4-52 the owner bar of two rows — item 109 (k) (5)–(6) 'a stagnant catacomb's fill rises while its extent holds' (exactMonotone, where 'stagnant') and '(k) (6) growth per epoch within the cap' (exactBound) — so the owner's list and the map disagree on which V04 bars carry specs.

**Required change.** V04 §7's intro list adds 'T-V4-52 (the bar map's 109 (k) (5)–(6) exactMonotone and exactBound rows)'.

### VAP-26 — DISAGREE, major, owner V12

**Claim.** V12 §3.6b's bar map leaves the owner's bar empty ('—') on two rows whose base bars exist: '104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements' is §13.2's T104-3 clause, and '107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random' is T107-1 and T107-2. T-V12-35 requires every row's spec to carry its owner's bar, and bar.<barId> resolves only through `id` or `ownerBar`, so bar.T104-3 and bar.T107-1 / bar.T107-2 have no registration.

**Required change.** The two rows' owner's-bar cells read 'base T104-3 (its comfortable-distance clause)' and 'base T107-1, T107-2', and their specs carry those ids as ownerBar.

### VAP-27 — DISAGREE, major, owner V12

**Claim.** V12's hand-off row X-V12-15 enumerates V06's BenchBarDefs as 'T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, and T-V6-34 and -37 in their epoch forms', while V06 §8's registration table (and V06 W80) also registers bar.T-V6-62 (E2, retaining.settings.stateSnapCm) and bar.T-V6-72 (E5, spring.*); V12 itself names bar.T-V6-62 at l.2036 and in X-V12-19.

**Required change.** X-V12-15's V06 list reads 'T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -62, -72, and T-V6-34 and -37 in their epoch forms'.

### VAP-28 — DISAGREE, major, owner V12

**Claim.** V12's hand-off row X-V12-13 takes 'T-V4-43's and T-V4-58's ± 3 s.e. and 500 seeds as parameters', but T-V4-58 states '≥ 200 undercities' (no seed count) and V12's own bar-map row for it reads 'CITY and METROPOLIS with one ruin and one cavern forced, ≥ 200 undercities'; only T-V4-43 states 500 seeds per rung.

**Required change.** X-V12-13 reads 'T-V4-43's ± 3 s.e. and 500 seeds per rung and T-V4-58's ± 3 s.e. and ≥ 200 undercities as parameters'.

### VAP-29 — DISAGREE, major, owner V12

**Claim.** V02's hand-off X25 (closed-stated: 'the second known-city fixture's building bars are T-V2-44 – T-V2-47 … second revision: T-V2-51 on its terraced wards and T-V2-42's arena bar') and V02 §8.5's M3a-V2 exit (T-V2-44 – T-V2-47, T-V2-51 and T-V2-42's arena part on the second fixture) disagree with V12 §3.14.1, K2's one statement, which lists 'the building bars on K2 V02's (T-V2-44 – T-V2-47)' only.

**Required change.** V12 §3.14.1 reads 'the building bars on K2 V02's (T-V2-44 – T-V2-47, T-V2-51 on its terraced wards and T-V2-42's arena part)'.

### VAP-30 — DISAGREE, major, owner V12

**Claim.** V12 §3.15 gives the base bars of items 114–119 ids the base does not have — `T114g.greyscale` and `T114g.generation` as BenchBarDefs 'owner base', `T117i.crowns`, the T118h.* bars ('each is a BenchBarDef owned by the base') and `T119f.waits` — while V12 §2.1 defines BenchBarDef.id as 'the owner's bar id verbatim' (a BenchBarDef has no ownerBar); §13.2's bar ids are T⟨item⟩-⟨n⟩ (canon ID-TOOL, S4) and V12 §3.15's own opening keeps spec ids (T111d.walk) only beside a base ownerBar. Once the scope editor writes T114-n – T119-n (VCS-01 – VCS-06), bar.T114g.* and the like name no base bar.

**Required change.** V12 §3.15.4 – §3.15.9 key every BenchBarDef by the base bar id the scope editor writes (T114-n, T117-n, T118-n, T119-n), keeping the T114g.* / T117i.* / T118h.* / T119f.* forms only as StatBarSpec or NullModelSpec ids with that base bar as ownerBar, and the register lines of §3.11 name bar.T114-n etc.

### VAP-31 — MATRIX-GAP, major, owner V12

**Claim.** The matrix holds no row for PanelSpec, shared by V12 §3.9.1 (the registered panels) and the volumes that own their specs (V01, V02, V03, V04, V05, V06, V07); one row disagrees with its owner. V12's M6 row ('Fantasy Manor 20 | extras: the ladder street (V02 §7.5 (2)) | spec owner V02') omits V02 §7.5's third part — the item-110 buildings (the second fixture's stepped temple, a terraced palace, a tiered tower, the arena and the bridge's deck row at the building and neighbourhood bands, with the stepped temple's summit offset shown). Verdict: disagree (the other rows agree: V01 NG 20, V03 DW 20, V05 NG 5, V06 AB history, V07 VG).

**Required change.** V12 §3.9.1's M6 row extras read 'the ladder street and the item-110 buildings (V02 §7.5 (2), (3))'.

### VAP-32 — DISAGREE, major, owner V04

**Claim.** The underground panel V4-U5, whose spec owner is V04 (V12 §3.9.1), is stated two ways. V04 §7: 'ten CITY and five METROPOLIS underground bands (historical and navigable, each mode, a ruin among them) for legibility and plausibility, beside one render in the reference family's hatched style' (and V04 §7's parity paragraph: 'the owner's panel carries a side-by-side against a render in that style'). V12's V4-U5 row: 'SOLO 30 … each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions legibility and realism | extras —' — no hatched-style render, no ruin, and a crypt and catacomb framing V04 does not state.

**Required change.** V04 §7's panel paragraph states the one spec — SOLO 30 (ten CITY and five METROPOLIS bands, each seed in both modes), a ruin among the frames, each frame holding the cathedral's crypt (or the largest church's) and the largest catacomb complex, one render in the reference family's hatched style beside the set, questions legibility and realism — and V12 §3.9.1's V4-U5 row cites it ('V04 §7'), its extras cell naming the hatched-style render.

### VAP-33 — DISAGREE, major, owner V10

**Claim.** V10's T-V10-43 'the no-op pin: with the terrace, raised-way and deck-plot rows off, T-V10-8's reader goldens, the brief's rendered text and the goldens of the encoders that existed before item 110 are byte-identical' restates item 110's pin over the clerk's reader goldens but states no NoOpPin registration and reads 'off' as three row sets, while V12 §3.7.8 requires each restating volume pin to register and states item 110's off form once as V11 §3.24.0's five switches.

**Required change.** T-V10-43 reads 'with V11 §3.24.0's item-110 switches off, … byte-identical — a NoOpPin registration of the reader goldens on V12 §3.7.8's engine (item110.*), written by the C1 seat at M3a'.

