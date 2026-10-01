# Agreement check — proof and plan, round 1: tests, bars, calibration and the build plan (verify-agree-proof-r1t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r1t (round-1 agreement check after assemble-r1), standing in for the Fable seat.

PROGRESS
- P1 brief read whole (ROUND-1 NOTES, ITEM 120, ITEMS 121–125 with 122 (h)–(i), ORCHESTRATION NOTES); canon's dated rulings for g items 114–126 (126 and its (a2) filed after the brief); assemble-r1 (live files = its output hashes: base `137ecc0e…`, INDEX `9efc19e3…`, V01 `1480993b…` … V12 `996dee3b…`); the round-0 report and result; the 19 landed r1t peers' 425 issues indexed — done
- P2 round-0 VAP-01 – VAP-33 re-checked on the live text — done
- P3 repair-touched subsections in scope read for new problems: §13.2 (the convention, the owner-item groups of items 111–119, the take-over table), §13.3–§13.5, §13.7–§13.9, §14's testkit row, §16 whole, INDEX.md whole, every volume's §7 and §8 (pre → live word diffs, every changed hunk read in its subsection), V12 §2.13, §3.7.8, §3.9, §3.11, §3.14, §3.15, §7.1, §8, §10.2 and §10.3 — done
- P4 owner items 120–126: the named parts of the members (scope, V01–V12) checked; F-MISSING raised only where no peer raised it (item 126) — done
- P5 report and result — done

**Result: 21 issues — 0 blocker, 21 major** (8 HANDOFF-OPEN, 8 DISAGREE (VAP-11 among them), 5 F-MISSING). Owners: V09 4, V12 4,
scope 3, V08 2, V10 2, V01 1, V04 1, V05 1, V06 1, V07 1, V11 1. Return:
`docs/validation/coherence/results/coherence_verify-agree-proof-r1t.json`. Design files untouched. No issue is a blocker: none
changes what the generator builds; each changes which test names which bar, which pin a suite registers, or when a piece is built.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects: every test id and bar (T⟨item⟩-⟨n⟩,
T-Vn-m, the take-over of base bars), calibration (§13.5, §13.8, §13.9 against V12's records, the register, the bar map, the
no-op pins, the bench registrations, the panels), the combined build plan (§16) and INDEX.md against every volume's tests (§7)
and build plan (§8). The fabric, layers, time, host, tools, edges and unit seats hold the other subjects; their r1t findings
were read first and are not raised again (list below).

**Checks run** (scratch scripts in the seat's scratch folder `agp1/`):
- *Round-0 re-check.* Each of VAP-01 – VAP-33 read against the live subsection its required change named, whatever unit
  owned it, and the repair file that answered it (12 repair files name a VAP id; none wrote a RULING REQUEST for one).
- *Test-id census on the live set.* 701 volume tests, every family gap-free (V01 1–59, V02 1–58 with T-V2-31/-32 in
  paragraph form, V03 1–38, V04 1–81, V05 1–36, V06 1–74, V07 1–68, V08 1–58, V09 1–82, V10 1–51, V11 0–45, V12 1–52); 293
  base bars defined in §13; **0 unresolved references** to a volume test or a base bar anywhere in the base, INDEX, the
  rationale or the volumes. (The stale ranges that point at old maxima are VCS-10's.)
- *The take-over table's both ends*, range-aware: every bar of each row of §13.2's table (base l. 17242–17255) against the
  bars the named volume's tests name. Closed now: V06 (all 63, its own table in V06 §7), V04 (all 28), V03 (all 17), V02 (all 4),
  V05's base-hook bars (all 4). Open: the owner-item bars this round's scope repair assigned — V07 (30 of T114–T118), V08 (15
  of T111–T118), V09 (6), V10 (T115-3), V11 (T117-3), V12 (T115/T116/T119) — VAP-r1-01 – VAP-r1-08.
- *The 254 cross-unit test references added this round* (live minus pre, per unit), each read beside its target: all right
  but V12 §10.3's structure-knob row (VAP-r1-12).
- *Every volume's §8 re-summed*: V01 27.25–36.25, V02 22.5–32.5, V03 18.5–25.25, V04 28.25–39.25, V05 18–24.75, V06
  29.75–42.25, V07 30.25–42.5, V08 18–24.5, V09 21.5–31.75 (base line 16.25–24.0, staged 3.25–5.0, AP11 2–2.75), V10 14.5–20
  (C1 + transcript 3.5–5.25, M3c 11–14.75), V11 13.0–18.25 (first total 11.25–15.75, staged 1.75–2.5) — each internally exact.
  §16 and INDEX §1 are stale for V05, V06 and V07 only (VCS-08, VCS-18, VAL-R1-13, VV78-12; not raised again).
- *No-op pins and bench bars.* Every volume test that names an `item1nn.*` pin, `NoOpPin` or V12 §3.7.8 (31 tests) against
  V12 §2.13's suites column, §3.7.8's list and X-V12-11; every `bar.<id>` a volume registers (V02 11, V03 1, V06 18, V11 3)
  against X-V12-15 — equal. Two suites V12 lists have no registering clause at their owner (VAP-r1-10, VAP-r1-01's T-V7-63),
  and §3.7.8's own list lags §2.13 (VAP-r1-11).
- *§13.8's schedule rows for items 111–119* against V12 §7.1's milestone cells (T-V12-44 – T-V12-50), V12 W7's cells, V06 §8's
  E-steps and V09 AP11's milestones; §16's rows against each volume's §8 placement of items 114–120.

## Round-0 findings — status on the live text

| id | owner (r0) | status | where |
|---|---|---|---|
| VAP-01 | V06 | FIXED | V06 §7 *The base bars these tests take*: all 49 (now 63 with T108-4, T111, T114, T115) mapped, each test naming its bar (T67-5 by the parity paragraph) |
| VAP-02 | V04 | FIXED | V04 §7 intro names T63-4 – T66-6 and the take-over; T-V4-34 (f) takes T63-4; T-V4-43 – T-V4-58 name their T109 clauses; T-V4-47 takes T109-6 |
| VAP-03 | V02 | FIXED | T-V2-44 "(takes T110-4)", T-V2-47 "(takes T110-5's deck-building clause …)" |
| VAP-04 | V08 | FIXED | T-V8-44 takes T108-1 – T108-3; §8.3 R1 lists them; T108-4 moved to the evolution row (base) and V06's table |
| VAP-05 | V09 | FIXED | T-V9-5, -6, -13 take T101-9, -8, -5; new T-V9-81 (T101-7), T-V9-82 (T101-4); V09 §7.1's mapping paragraph |
| VAP-06 | V09 | FIXED | AP5 at M6-E (V09 §8.1, J-V9.103, T-V9-16/-41/-53, XV-V9-8; §16's carried row and staged-screens line) |
| VAP-07 | scope | FIXED | §16's M1, M2b and M3a rows name V01 §8.1's pieces with their lines |
| VAP-08 | V11 | FIXED at V11 | V11 §8 splits C4a (M2b) / C4b (M-SF) and states the first-total and staged shares; §16's content line not yet following = VV1112-r1-01 (peer); the C4 name in §16's staged row and INDEX §1 = VAP-r1-15 |
| VAP-09 | scope | FIXED | INDEX §3's table carries §16's cells; the graph splits M0, M1 … M3a, M4 |
| VAP-10 | scope | FIXED | INDEX §1's V12, V11, V09 cells; §5's spike list; risk 3 with S-V12-4 |
| VAP-11 | scope | PARTLY — persists at V09 | §13.4, §13.3 and §13.8 hold M3c's clerk session; V09 §7.3 (1) still names only M2a and M3a (scope's hand-off not taken) — re-raised, owner V09 |
| VAP-12 | scope | FIXED | §13.8: "Volume 12: each bar in the tier its §7.1 column states …", T-V12-50 in the timing phase |
| VAP-13 | scope | FIXED | §13.9's comment is a pointer to V12 §2.5 |
| VAP-14 | scope | FIXED | §13.2 convention (7); §14's `@plat/testkit/bars` |
| VAP-15 | scope | FIXED | T111-5 at V11 §3.24.0's off form (six cells); convention (5) names items 110, 111 and 113–115 |
| VAP-16 | V12 | FIXED | V12 §2.13 `item115.off` and `item115.ceiling`; §3.7.8 (5) |
| VAP-17 | V12 | FIXED | §2.13's suites list every pin VAP-17 named; §3.7.8's list names them (its new lag: VAP-r1-11) |
| VAP-18 | V06 | FIXED | V06 §3.7.7 (4) with `atGeneration` false and the E3 seat; T-V6-12, -44, -72 registered by their seats |
| VAP-19 | V04 | FIXED | T-V4-47 registration; T-V4-35 points at T-V4-47; T-V4-77 (d) on `item113.history` |
| VAP-20 | V05 | FIXED | T-V5-19 (c), -22 (b)/(k), -27, -33 register their pins |
| VAP-21 | V11 | FIXED | V11 §3.24.0's `exposureAllStoreys` row; T-V3-34's first clause the registered pin (V12's five-vs-six = VV1112-r1-03, peer) |
| VAP-22 | V01 | FIXED | T-V1-4 (e) |
| VAP-23 | V08 | FIXED | T-V8-50's last clause |
| VAP-24 | V09 | FIXED | T-V9-57 |
| VAP-25 | V04 | FIXED | V04 §7's spec list adds T-V4-52 |
| VAP-26 | V12 | FIXED | bar map rows carry base T104-3, T107-1 / T107-2; T-V12-35 checks them |
| VAP-27 | V12 | FIXED | X-V12-15 lists T-V6-62, -72 |
| VAP-28 | V12 | FIXED | X-V12-13's parameters |
| VAP-29 | V12 | FIXED | V12 §3.14.1's K2 building bars |
| VAP-30 | V12 | FIXED | V12 §3.15 keys BenchBarDefs by T114-6, T114-7, T117-2, T118-2 – T118-6, T119-2; spec ids only beside an `ownerBar` |
| VAP-31 | V12 | FIXED | V12 §3.9.1's M6 row extras |
| VAP-32 | V04 | FIXED | V04 §7 states V4-U5's spec once; V12's row cites it, extras the hatched-style render |
| VAP-33 | V10 | FIXED | T-V10-43 |

## Agreement confirmed (no issue)

The take-over rows' base-hook halves at both ends (V02, V03, V04, V05, V06 as above); §13.2's owner-item groups 114–119 citing
the right volume tests (each cited T-Vn-m is that item's test); §13.8's rows for items 111–119 against T-V12-44 – T-V12-50's
milestone cells and V12 W7's cells (M1: item 111's rate specs and pin, item 116's `view.limitStop`; M2b: T111-1, T111-4, the
wait timer and budget-register check, T114-6, T114-7 and `item114.condition`'s generation clause, item 115's two pins and
`bldg.grandeur`; M3b: items 117 and 118; M6-E: item 113, item 114's step specs over epochs, the advance's and replay's total
timing — item 119 (a2) at V12's end); V06 §8's E-step pin registrations against V12 §2.13 (but T-V6-74, VAP-r1-10); the
base-owned BenchBarDefs (convention (7)) against V12 §3.15 and X-V12-15; the metric names of the owner-item bars
(`view.limitStop`, `bldg.grandeur`, `wall.condition`, `festival.blocked`, `time.reskin`, `water.kinds`) in §13.2 and V12;
`QualitySpendRow` (V11 §2.8d) as V12 §3.15.9 (4), §12.10's R12-33 and the volumes' item-119 tests read it (`gainBar`, `run`,
`extraMs`); the midsummer default (week 19) in §2.9, §8.2, V07, V08, V09, V10 and V11; §13.3's `MilestoneRecord.ux` readers
(M2a, M3a, M3b, M3c); §13.4's B-ZOOM from each map's zoom-out limit; V12 §3.9.1's panels against V02 §7.5 and V04 §7; V12
§3.14.1 against V02's X25; every volume §8's internal sum; §16's M3c (11–14.75), M6 (20.5–29.75 with 2.25 of spikes), M6-P
(17.75–24.25), M6-U (28.25–39.25), M-CAL (4.75–8), M-SF (18–24.5) and staged-screens (4–6) figures against V10, V02, V03, V04,
V12, V08 and V09; INDEX §3's table and graph and §5's spikes against §16 and the volumes' §8; V02 §8's item-115 ceiling at M6a
with T-V2-58 against §13.8's "the composed shapes with M6"; V03 §8's T-V3-37 and T-V3-38 exits; V04 §8's Find at the later of
U5 and V09's Find step; V07 §8's risk (13) fallback for Find; V08's T-V8-58 with V09's Find step.

## Matrix gaps found (subjects the matrix holds no row for)

New shared subjects of this round, each judged: the owner-item take-over (T111–T119 clauses at the village, the port, the
application, the clerk, the content and the rig) — **disagree**, VAP-r1-01 – VAP-r1-09; `QualitySpendRow` / `perf.qualitySpend`
(V11, V12, base §4.1/§12.10, V01–V07's wait tests) — agree; the `view` kind of `NoOpPin` (V12 §2.13, base T117-1, T118-1, V05,
V07, V12 §3.15.10) — agree but for §3.7.8's list (VAP-r1-11); the `wait.*` timer (V12 §3.15.9, T119-2, V01–V07) — agree; item
120's exit dependency on V09's unplaced Find (V01, V03, V04, V05, V07, V08, V10, V12) — disagree at V10 (VAP-r1-13; V01's is
VAF-R1T-07); item 114's screens' milestones (base §16/§13.8, V09 AP11, V10 C4) — disagree, VAP-r1-14.

## Overlaps with the landed r1t verifiers (not raised again)

§16's and INDEX §1's stale prices for V05, V06, V07 and the recomputed totals (VCS-08, VCS-18, VAL-R1-13, VV78-12, VV78-r1-02);
§16's content line under V11's C4 split (VV1112-r1-01); every stale test range and the base end of the item 117/118/119
take-over and group lists (VCS-10 — VAP-r1-09 adds only T-V2-22 and T-V5-18, which VCS-10 does not list); V04's take-over
range (VAL-R1-04); V12 §2.13's and X-V12-11's V05 rows (VV56-r1-07 — VAP-r1-11 adds §3.7.8's list); V12's five-vs-six item-110
switches (VV1112-r1-03); V12's C4 names (VV1112-r1-02); T-ER-22 – T-ER-24 in §13.2/§13.8 (VRC1T-09); the item-120 placement in
V09 §8 and §16 and G120-scope's bars and take-over names (G120-V09, G120-scope); V01's T-V1-59 at M5 (VAF-R1T-07); §5.3's
wall-crossing fixtures and the model's new outcomes without bars (VDC1-18, VM-R1T-10); T117-6's `HostContext.week` fixture
(G125-scope); every F-MISSING of items 120–125 and 119 (a2) the peers raised (G120-scope/-V09; G121-scope/-V09/-V12;
G122-scope/-V01/-V02/-V03/-V06/-V07/-V08/-V09/-V10/-V11/-V12; G122h-V08/-V09/-V11/-V12; G123-scope/-V02/-V03/-V04/-V06/-V09/
-V10/-V11/-V12; G124-scope/-V09/-V11/-V12; G125-scope/-V08/-V09/-V12; G119a2-V09). The parts of items 120–125 that the peers
found present in V01, V03, V04, V05, V07, V08, V10, V11 and V12 were re-read for their tests and §8 placement: present.

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-11 | major | DISAGREE | V09 | V09 §7.3 (1) omits M3c's clerk session that §13.4 and §13.8 now hold |
| VAP-r1-01 | major | HANDOFF-OPEN | V07 | T-V7-62 – T-V7-67 name none of the T114–T119 bars the village take-over row hands them; T-V7-63 lacks T115-4's off-form pin V12 lists |
| VAP-r1-02 | major | HANDOFF-OPEN | V08 | T-V8-50 – T-V8-55 and §8.3's R1 name none of the port's T111/T113/T114/T115/T117/T118 clauses; T-V8-53's rung pin unregistered |
| VAP-r1-03 | major | HANDOFF-OPEN | V09 | T-V9-74 – T-V9-79 name none of T114-6, T115-3, T116-1, T117-6, T118-2, T119-3 |
| VAP-r1-04 | major | HANDOFF-OPEN | V10 | T-V10-48 does not name T115-3's clerk form |
| VAP-r1-05 | major | HANDOFF-OPEN | V11 | T-V11-42 does not name T117-3 |
| VAP-r1-06 | major | HANDOFF-OPEN | V05 | T-V5-34 and T-V5-35 name no T117/T118 bar |
| VAP-r1-07 | major | HANDOFF-OPEN | V01 | T-V1-29's item-119 clause names no T119 bar |
| VAP-r1-08 | major | HANDOFF-OPEN | V12 | T-V12-48 and T-V12-50 name none of T115-1/-4, T116-1, T119-1/-2/-4/-5 |
| VAP-r1-09 | major | DISAGREE | scope | T-V2-22 and T-V5-18 take T119 clauses the take-over table and T119's group do not list (beyond VCS-10) |
| VAP-r1-10 | major | DISAGREE | V06 | T-V6-74's rung-pin clause unregistered and its fixture unnamed, while V12 lists H-100 (V06, T-V6-74) on `item115.ceiling` |
| VAP-r1-11 | major | DISAGREE | V12 | §3.7.8's list of volume pins omits T-V7-63, T-V7-68 and T-V5-34 – T-V5-36, which §2.13 lists |
| VAP-r1-12 | major | DISAGREE | V12 | §10.3 cites T-V6-66 – T-V6-69 for V06's structure knobs; the tests are T-V6-61 and T-V6-62 |
| VAP-r1-13 | major | DISAGREE | V10 | T-V10-51 exits at M3c though Find's landing is unplaced |
| VAP-r1-14 | major | DISAGREE | V09 | AP11 lands item 114's Repair material and legend at M6-E; §16 and §13.8 land them at M3a and M2b |
| VAP-r1-15 | major | DISAGREE | scope | §16's staged content row and INDEX §1 name V11's former C4 |
| G126-scope | major | F-MISSING | scope | item 126's scope part absent |
| G126-V09 | major | F-MISSING | V09 | item 126's V09 part absent |
| G126-V08 | major | F-MISSING | V08 | item 126's V08 part absent |
| G126-V04 | major | F-MISSING | V04 | item 126's V04 part absent |
| G126-V12 | major | F-MISSING | V12 | item 126's V12 part absent |

### VAP-11 — DISAGREE, major, owner V09 (persists from round 0; the scope half is fixed)

**Claim.** Scope's repair wrote M3c's clerk session into §13.4 ("At M3c's exit a clerk session of five such participants, the
built-in clerk connected, runs T-V10-26's clerk task …, its result an exit criterion of M3c's `MilestoneRecord`", base l. 17406–
17408), §13.8's schedule row ("M2a (the pipeline session), M3a (midpoint and exit), M3c (the clerk task, T-V10-26)", l. 17846)
and §13.3's `MilestoneRecord.ux` readers; INDEX §5 repeats it. Its hand-off "V09 §7.3 (1) to name M3c's clerk session (VAP-11's
last clause)" (repair-r1-scope.md preamble) was not taken: V09 §7.3 (1) (l. 4036–4044), "how it is run", still holds only the
two M3a sessions and M2a's pipeline session, and (3) "no clerk unless the session tests it" names no session that does.

**Required change.** V09 §7.3 (1) adds: "**At M3c's exit** a clerk session (§13.4): five participants on the same terms, the
built-in clerk connected, each asking it for 'a walled harbour town with a temple quarter' and making one follow-up change
(T-V10-26), timed and recorded as below; its result is an exit criterion of M3c's `MilestoneRecord`, written to
`plat/goldens/ux/M3c/f5.json`."

### VAP-r1-01 — HANDOFF-OPEN, major, owner V07

**Claim.** Scope's repair wrote the village take-over row (base l. 17249): "the village clauses of T114-1 – T114-8 (T-V7-62),
T115-1 – T115-4 (T-V7-63), T116-1 – T116-4 (T-V7-64), T117-1 – T117-8 (T-V7-65) and T118-1 – T118-6 (T-V7-66)", and VCS-10 adds
"T119-2 – T119-4's village clauses (T-V7-67)". V07 §7's own head (l. 3460–3462) says it takes "the village halves … of items
114–120's bars, each test naming the bar it takes over", yet V07 names none of T114-1 – T118-6 (0 occurrences; a range-aware
census) — T-V7-62 – T-V7-66 cite "item 11n (x)'s village clauses" only, T-V7-64 not even that, and T-V7-67 cites "item 119
(f)'s village clauses". T-V7-63 also carries no clause for T115-4 (with every ceiling row's `enabled` false, byte-identical),
though the take-over row hands it T115-1 – T115-4 and V12 §2.13 lists "V07's village goldens" on `item115.off`.

**Required change.** In V07 §7: T-V7-62's head reads "(item 114 (g)'s village clauses; takes T114-1 – T114-8's village
clauses)"; T-V7-63's "(item 115 (f)'s village clauses; takes T115-1 – T115-4's village clauses)" and it gains the clause "with
every `grandeur.ceiling` row's `enabled` false (V11 §3.24.0's off form) `B-VILLAGE` is byte-identical to the build before item
115 — the `item115.off` registration of the village goldens on V12 §3.7.8's engine (T115-4)"; T-V7-64's "item 116 at village
rungs (takes T116-1 – T116-4's village clauses)"; T-V7-65's "(item 117 (i)'s village clauses, (f2) included; takes T117-1 –
T117-8's village clauses)"; T-V7-66's "(item 118 (h)'s village clauses; takes T118-1 – T118-6's village clauses)"; T-V7-67's
"(item 119 (f)'s village clauses; takes T119-2 – T119-4's village clauses)".

### VAP-r1-02 — HANDOFF-OPEN, major, owner V08

**Claim.** The SettlementForge take-over row (base l. 17250) hands volume 8 "the port's clauses of T111-1 – T111-5 (T-V8-50),
T113-1 and T113-6 (T-V8-51), T114-7 (T-V8-52), T115-2 and T115-3 (T-V8-53), T117-1 and T117-6 (T-V8-54) and T118-1, T118-2 and
T118-5 (T-V8-55)". V08 names none of these fifteen bars (0 occurrences): T-V8-50 – T-V8-55 (l. 3046–3051) open with "item 11n at
the port" only, and §8.3's release row R1 (l. 3131) lists every other bar of the row (T73 … T108-3) but none of them. T-V8-53's
TOWN clause ("at TOWN every case is byte-identical to the build without the ceiling") states no registration, while V12 §2.13
lists "V08's port fixtures at TOWN (T-V8-53)" on `item115.ceiling` and V12 §3.7.8 counts T-V8-53 among the registering pins.

**Required change.** T-V8-50's head reads "item 111 at the port (takes T111-1 – T111-5's port clauses)"; T-V8-51's "item 113's
reading (takes T113-1 and T113-6's dossier clauses)"; T-V8-52's "item 114 at the port (takes T114-7)"; T-V8-53's "item 115's
'specified' (takes T115-2 and T115-3's dossier clauses)", its TOWN clause ending "— the `item115.ceiling` registration of the
port fixtures on V12 §3.7.8's engine, written by the SF4 seat"; T-V8-54's "item 117 at the port (takes T117-1 and T117-6's port
clauses)"; T-V8-55's "item 118 at the port (takes T118-1, T118-2 and T118-5's port clauses)"; §8.3's R1 adds "and the port's
clauses of T111-1 – T111-5, T113-1, T113-6, T114-7, T115-2, T115-3, T117-1, T117-6, T118-1, T118-2 and T118-5".

### VAP-r1-03 — HANDOFF-OPEN, major, owner V09

**Claim.** The application take-over row (base l. 17252) hands volume 9 "the screens of items 111–119 (T-V9-71 – T-V9-79:
T114-6's legend, T115-3's hand form, T116-1's view controls, T117-6, T118-2 and T119-3 among them)". V09 names none of the six
(0 occurrences): T-V9-74 – T-V9-79 (l. 3950–3955) cite "(V09 §4.21.n; item 11n)" only, and V09 §7.1's take-over paragraph
(l. 3869–3871) stops at T101-1 – T101-9.

**Required change.** T-V9-74's head reads "(V09 §4.21.4; item 114; takes T114-6's legend clause on the canvas)"; T-V9-75's
"(V09 §4.21.5; item 115; takes T115-3's hand form)"; T-V9-76's "(V09 §4.21.6; item 116; takes T116-1's view-control clause)";
T-V9-77's "(V09 §4.21.7; item 117; takes T117-6's season-control clause)"; T-V9-78's "(V09 §4.21.8; item 118; takes T118-2's
festival-list clause)"; T-V9-79's "(V09 §4.21.9; item 119; takes T119-3)"; V09 §7.1's paragraph adds "and the screens of items
114–119: T114-6 by T-V9-74, T115-3 by T-V9-75, T116-1 by T-V9-76, T117-6 by T-V9-77, T118-2 by T-V9-78 and T119-3 by T-V9-79".

### VAP-r1-04 — HANDOFF-OPEN, major, owner V10

**Claim.** The clerk's take-over row (base l. 17251) reads "T101-6's clerk path, T115-3's clerk form (T-V10-48)"; V10 names
T115-3 nowhere (0 occurrences) — T-V10-48 (l. 2967) opens "item 115's ceiling:".

**Required change.** T-V10-48 opens "item 115's ceiling (takes T115-3's clerk form):".

### VAP-r1-05 — HANDOFF-OPEN, major, owner V11

**Claim.** The content take-over row (base l. 17255) reads "every content row a bar reads, T117-3 (T-V11-42)", and §13.2's
item-117 group calls T117-3 "volume 11's compile check, T-V11-42"; V11 names T117-3 nowhere (0 occurrences) — T-V11-42 (l. 4743)
opens "item 117's rows:".

**Required change.** T-V11-42 opens "item 117's rows (takes T117-3):".

### VAP-r1-06 — HANDOFF-OPEN, major, owner V05

**Claim.** V05 added T-V5-34 (item 117 on the islands, l. 2740) and T-V5-35 (item 118's pennants, l. 2756), each re-running
the base bars' clauses on the sky (the hash in 52 weeks, ice and snow by climate, the festival's weeks and placement), and
VCS-10 hands the sky take-over row "T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35)"; neither test
names a T117 or T118 bar (0 occurrences in V05), so the take-over has no volume end.

**Required change.** T-V5-34's head reads "— the island through the year (item 117; V05 §5.1; takes T117-1 – T117-8's island
clauses)" and T-V5-35's "— festival pennants on the islands (item 118; V05 §5.1; takes T118-1 – T118-6's island clauses)"; each
lettered clause names the bar it re-runs where it re-runs one (e.g. (a) "(T117-1)", "(T118-1)").

### VAP-r1-07 — HANDOFF-OPEN, major, owner V01

**Claim.** T-V1-29 (l. 3203) gained "**item 119's one-time waits** (V01 §6; J-V1.103)" — stage 2's generate, close-up, switch,
sky unit-run and export waits within 10 s, progress past 1 s, every slower step with its `perf.qualitySpend` row — which are
T119-2, T119-3 and T119-4's clauses on stage 2; VCS-10 hands the stage-2 take-over row "T119-2 and T119-3's stage-2 clauses
(T-V1-29)" (and V01's repair asked the same of scope), but V01 names no T119 bar (0 occurrences).

**Required change.** T-V1-29's clause reads "**item 119's one-time waits** (V01 §6; J-V1.103; takes T119-2 and T119-3's
stage-2 clauses)".

### VAP-r1-08 — HANDOFF-OPEN, major, owner V12

**Claim.** The rig's take-over row (base l. 17253) hands volume 12 "the specs, pins and bench bars of items 111–119
(T-V12-44 – T-V12-50)", and §13.2's item-115, -116 and -119 groups name T-V12-48 and T-V12-50 as V12's runs. T-V12-44, -46,
-47 and -49 name their bars (T111-n, T113-2, T114-4 – T114-7, T117-2, T118-2 – T118-6), but T-V12-48 (l. 2864: `bldg.grandeur`,
the two item-115 pins, `view.limitStop`) names none of T115-1, T115-4 or T116-1, and T-V12-50 (l. 2866: the wait timer, the
target-miss report, the budget-register check, the interaction rows) none of T119-1, T119-2, T119-4 or T119-5.

**Required change.** T-V12-48's head reads "**Items 115 and 116** (takes T115-1's statistic, T115-4's two pins and T116-1's
statistic)"; T-V12-50's "**Item 119's measurements** (takes T119-1's target report, T119-2's timer, T119-4's budget-register
check and T119-5's interaction-row comparison)".

### VAP-r1-09 — DISAGREE, major, owner scope

**Claim.** Two volume tests claim T119 clauses that neither §13.2's item-119 group (l. 17235: "Volume 9 runs the progress view
(T-V9-79) and volume 12 the timer and the register check (T-V12-50)") nor the take-over table lists, and VCS-10's required
change (which adds V01, V03, V04 and V07's) does not name them either: V02's T-V2-22 ("completes within ten seconds from the
click at every rung's top and at the population cap (V12 §3.15.9's wait timer, T119-2 …)") with T-V2-24's export timings, and
V05's T-V5-18 (item 119's comfort level at every island rung, naming T119-2 – T119-5).

**Required change.** Beside VCS-10's additions: the stage-3 take-over row's base-bar column adds "T119-2's stage-3 clauses
(T-V2-22, T-V2-24)" and the sky row "T119-2 – T119-5's island clauses (T-V5-18)"; the item-119 group's runs list adds "volume 2
the stage-3 waits (T-V2-22, T-V2-24) and volume 5 the islands' (T-V5-18)".

### VAP-r1-10 — DISAGREE, major, owner V06

**Claim.** V12 §2.13's `item115.ceiling` row lists "H-100 over epochs at TOWN and above (V06, T-V6-74)" and §3.7.8 counts T-V6-74
among the volume pins that register; V12 §2.13 refuses "a suite no owner registers". V06 registers none: T-V6-74's last clause
(l. 3913) reads only "a history that never stands below TOWN is byte-identical with the ceiling on and off" (no fixture, no
pin, no engine), and V06 §8's *The no-op pins* paragraph (l. 3987) lists E1, E3, E4, E5 and E9 registrations and no E2
`item115.ceiling`.

**Required change.** T-V6-74's last clause reads "H-100 at TOWN and above is byte-identical with the ceiling on and off — the
`item115.ceiling` registration of H-100 on V12 §3.7.8's engine (V12 §2.13), written by V06's E2 seat"; V06 §8's *The no-op
pins* paragraph adds "E2 `item115.ceiling` (H-100 at TOWN and above; T-V6-74)".

### VAP-r1-11 — DISAGREE, major, owner V12

**Claim.** V12 §2.13 lists V07's village goldens on `item115.off` and on `item120.find`, but V12 §3.7.8's list of the volume pins
that register (l. 1649–1653) gives "V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-65,
T-V7-66)" — not T-V7-63 (`item115.off`, VAP-r1-01) or T-V7-68 (Find at the village rungs, whose hash and tiles clauses are
`item120.find`'s) — and its V05 list stops at T-V5-33, while T-V5-34 – T-V5-36 register the sky goldens on `item117.season`,
`item118.festival` and `item120.find` (VV56-r1-07 fixes §2.13's rows and X-V12-11, not §3.7.8). §2.13's two V07 cells name no
test.

**Required change.** V12 §3.7.8's list reads "… V05's T-V5-15, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27, T-V5-33's item-111
clause and T-V5-34 – T-V5-36; … V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-63,
T-V7-65, T-V7-66, T-V7-68) …"; §2.13's `item115.off` suites read "the golden suite; V07's village goldens (T-V7-63)" and
`item120.find`'s "… V07's village goldens (T-V7-68)".

### VAP-r1-12 — DISAGREE, major, owner V12

**Claim.** V12 §10.3's hand-off row (l. 3119) reads "V06 §2.2's structure knobs; V06 §7 (T-V6-66 – T-V6-69) | `retaining.holdM`,
`.neglectAfterYears`, `.stretchM` and `aqueduct.disuseAfterYears` … | … T-V6-66 – T-V6-69 are V06's, nightly …". Those tests
are the landfall clearance (T-V6-66), foundations at an epoch (T-V6-67), a village mine breach (T-V6-68) and calamity deaths
(T-V6-69); the knobs' readers are V06 §3.19.2 and §3.19.4 (V06 l. 577–578), tested by T-V6-61 (raised ways in disuse: "disused
only as V06 §3.19.2 (2) states") and T-V6-62 (retaining walls: "slumps only below terraces abandoned for
`retaining.neglectAfterYears`").

**Required change.** The row reads "V06 §2.2's structure knobs; V06 §7 (T-V6-61, T-V6-62) | … T-V6-61 and T-V6-62 in the nightly
tier | V12 §3.11's `decline` line (owner V11); T-V6-61 and T-V6-62 are V06's, nightly on its fixtures by §13.8, each a
`BenchBarDef` where a line names it".

### VAP-r1-13 — DISAGREE, major, owner V10

**Claim.** V10 §8's C3 builds "item 120's find form and read (V10 §3.9b (7)), built with V09's Find panel", and C4's exit
(M3c) lists T-V10-51 (Find from words: `read_map find`'s counts "equal §11.2's gazetteer listing … and the panel's own counts").
V09 §8 places Find at no milestone (G120-V09), so M3c's exit carries a bar whose provider may land after it. V03 (T-V3-38 "with
the later of P5 and the milestone that lands Find (V09 §8)"), V04 (T-V4-81 at "the later of U5 and the step that lands V09's
Find panel"), V08 (T-V8-58 "with V09's Find step"), V07 (risk (13)) and V12 (T-V12-52 "the milestone that lands Find") each
defer to Find's landing; V10 alone does not (V01's same gap is VAF-R1T-07).

**Required change.** V10 §8's C4 row reads "… T-V10-47 – T-V10-49, and T-V10-51 at the exit of the later of M3c and the
milestone that lands Find (V09 §8), with the find form and read" and C3's content "item 120's find form and read (V10 §3.9b
(7)), landing with V09's Find panel at the later of M3c and Find's milestone, inside C4's range"; T-V10-51's tier cell reads "PR,
from the later of M3c and Find's milestone".

### VAP-r1-14 — DISAGREE, major, owner V09

**Claim.** §16's M2b row (base l. 18727) lands "item 114's generation-time condition … with §8.2's `worn` and `patched` state rows
and their legend", §16's M3a row (l. 18728) "T3 `wall`'s repair with a material and `wearWall` (item 114)" beside T2 `ground`'s
spring flag, and §13.8 schedules T114-6 — whose legend clause the take-over row hands V09 (T-V9-74) — at M2b. V09's AP11
(l. 4172) puts "the wall's Repair material and legend at M6-E (with V06 §3.7.7)" and T-V9-74's milestone is "M6-E", while it
puts the parallel oasis toggle at M3a with AP3. So from M2b to M6-E generated walls show `worn`, `patched` and `breached` runs
with no legend lines of V09's and from M3a no canvas form for the base's repair-with-material event; and V10's T-V10-47, an
exit of C4 at M3c, compares the clerk's `wall { op: 'repair' | 'wear' }` "with V09 §4.21.4's Repair (each material), Wear and
Back in use events byte for byte" before V09 builds them.

**Required change.** V09 §8.1's AP11 row reads "… the wall states in the legend (V09 §4.21.4 (3)) at M2b with §8.2's state
rows, the Repair mode's **Material** chip and **Wear** at M3a (with AP3 and §16's M3a T3 repair), **Back in use**, the
last-change epoch on the panel line and the ring's story at M6-E (with V06 §3.7.3 – §3.7.7) …", inside AP11's price; T-V9-74's
milestone cell reads "M2b (the legend); M3a (Repair with a material, Wear); M6-E (Back in use, the epoch lines)".

### VAP-r1-15 — DISAGREE, major, owner scope

**Claim.** V11 §8 renamed C4 into C4a (the wall rows, M2b, first total) and C4b (the SettlementForge rows, M-SF, staged), and
V08 §8 now cites "V11's **C4b**" and "**C4a**'s … rows (landed at M2b)". §16's staged row (base l. 18753) still reads "the
content's staged rows (V11: C4 at M-SF, C8 at M6-U)" and INDEX §1's V11 cell (INDEX l. 34) "… C4's wall rows at M2b; … C4's
dossier rows with the SettlementForge stage (V11 §8)" — milestone ids V11 no longer has (VV1112-r1-01 covers §16's content
line's figures; VV1112-r1-02 V12's names).

**Required change.** §16's staged row reads "the content's staged rows (V11: C4b at M-SF, C8 at M6-U)"; INDEX §1's V11 cell
reads "C0–C3b, C4a (the wall rows) and C5–C7 inside M0–M4b, C4a at M2b; C8 at M6-U; C9 beside each owner item's base
milestone; C4b (the dossier rows) with the SettlementForge stage (V11 §8)".

### G126-scope — F-MISSING, major, owner scope

**Claim.** File g item 126 (the map only on tablets and desktops; J140) with its (a2) revision routes to scope "§1 (the supported
devices: tablets and desktops); §13 (bars; §13.4's sessions on tablets and desktops only); §16 (the narrow class's work dropped
from the reference app's line); the judgment index row". None is written ("item 126" 0 times in the base): §1 states no
supported devices; §13.2 has no item-126 bar and §13.8 no row; §16's reference-app line (l. 18775) still prices "touch and the
three layout classes"; no J-A126 row or Part A entry; §0.2's landing table has no row.

**Required change.** §1.1 states the supported devices: "the map is seen on tablets and desktops only (item 126); a phone is
offered no map view, and a window below the medium class (600 × 480 CSS px) keeps the medium layout at that minimum and
scrolls". §13.2 adds *Tablets and desktops only (item 126; §1.1).* (T126-1) at the medium class every tool completes its canvas
script under touch (V09's T-V9-22, its tablet half); (T126-2) below the medium class the medium layout holds at its minimum, the
page scrolling, and the document, view and selection are byte-identical across a resize over the threshold; (T126-3) no phone
layout, screen or catalogue row exists (a build-time scan of V09's layout classes and catalogue) — "Volume 9 runs them (T-V9-22)
and volume 12 measures them (its item-126 test)"; the take-over application row names them; §13.8 schedules them (PR on the app
harness, from M2a with the medium layout). §13.4's touch question reads "two participants per session work on a tablet; every
session runs on tablets and desktops only (item 126)". §16's reference-app line reads "touch and the two layout classes (wide
and medium; item 126 retires the narrow class)", its price following V09 §8.1's restated base line. §0.2 gains item 126's
row; the judgment index gains J-A126.01 with its Part A entry.

### G126-V09 — F-MISSING, major, owner V09

**Claim.** Item 126 (a2) routes to V09 "no phone screen, notice, catalogue row or Send button: the narrow layout class retired;
below the medium class the medium layout holds at its 600 × 480 minimum and the page scrolls; `refuse.phone` withdrawn (no tool
is ever greyed for a phone); item 120's phone sheet and item 124's phone default removed; T-V9-22 keeps its tablet half". V09
still carries the narrow class everywhere: `type LayoutClass = 'wide' | 'medium' | 'narrow'` (l. 412), the tool rows' `narrow`
flag (l. 475) and every table's "narrow · coarse" column (l. 1742, 2815), the phone paragraph of §0 (l. 99–101), §1's "what a phone
may do" (l. 142), the frame's edge row 48 (l. 1513), the rail's and panels' narrow forms (l. 1574, 1691, 2350, 3349–3350, 3391),
§4.12's narrow class (l. 2452–2457), the tools' narrow notes (l. 2885, 2937, 2990, 3193), `refuse.phone` (l. 1877, 1941),
T-V9-22's narrow clause (l. 3898) and J-V9.9 (l. 4240).

**Required change.** V09 retires the narrow class: `LayoutClass = 'wide' | 'medium'`, the `narrow` flag and every "narrow"
column, row and form removed; §0's paragraph reads "**On a tablet.** A tablet gets every tool with touch (press and hold opens
the menu a right-click opens). The map is not offered on a phone (item 126)"; §4.12 states the two classes and that a window
below 600 × 480 keeps the medium layout at that minimum and scrolls, nothing re-generated; the edge row 48 reads "a viewport
below 600 × 480 | the medium layout at its minimum, the page scrolling | T-V9-22"; `refuse.phone`'s catalogue row and its uses
withdrawn; T-V9-22 keeps its tablet half and gains "below the medium class the medium layout holds, and the document, view and
selection are byte-identical across a resize over the threshold"; J-V9.9 rewritten to the two classes (item 126 (a2), J140).
G120-V09's "phone bottom sheet" and G124-V09's "phones" default, which peers' required changes still ask for, are not written
(item 126 supersedes items 120 (j) and 124 (g)).

### G126-V08 — F-MISSING, major, owner V08

**Claim.** Item 126 (a2) routes to V08 "SettlementForge presents no map entry on a phone; the frame carries no phone handling".
V08 states neither ("phone" 0 times): its host mode renders V09's shell inside the frame (V08 §5.1; T-V9-28's "every screen of
the standalone app"), which today includes V09's narrow layout, and no V08 text says the host offers no map on a phone or what
the frame does below the medium class.

**Required change.** V08's host section (§3.16 or §5.1, where the frame's mounting is stated) adds: "SettlementForge presents
no map entry on a phone (item 126 (a2); J140): the map tab and every map command are absent there, and the frame carries no
phone handling — a frame given a viewport below the medium class keeps V09's medium layout at its 600 × 480 minimum and
scrolls (V09 §4.12)"; a J-V8 row records it, and a T-V8 clause checks that the host harness's frame at 599 × 479 shows the
medium layout with the document byte-identical.

### G126-V04 — F-MISSING, major, owner V04

**Claim.** Item 126 routes to V04 "the 'phone sheet' mention of item 120 dropped". V04 §1b (l. 233) still reads "**Find** (g item
120) — its panel, type-ahead, chip grid, results list, phone sheet and `live.find` provider are V09's".

**Required change.** V04 l. 233 reads "… its panel, type-ahead, chip grid, results list and `live.find` provider are V09's".

### G126-V12 — F-MISSING, major, owner V12

**Claim.** Item 126 (with (a2): "scope, V04, V12: as the item-126 routing above, less any phone screen") routes to V12
"§3.15.10's 'phone sheet' and every phone-viewport fixture dropped" and the bar of item 126 (e) as (a2) reads it. V12 §3.15.10
(l. 2508) still lists "results list, phone sheet" among V09's Find parts, and V12 has no item-126 measurement ("item 126" 0
times; §3.15 stops at item 120).

**Required change.** §3.15.10 drops "phone sheet"; §3.15 gains **3.15.11 Item 126 — tablets and desktops only**: on V09's app
harness, at the medium class's minimum (600 × 480) every tool's canvas script completes under touch events (T-V9-22's tablet
half), and a resize from 1024 × 768 to 599 × 479 and back leaves the model digest, the view key and the selection
byte-identical with the medium layout held and no tool withheld (`layout.belowMedium` 0 differences), no phone viewport in any
fixture — a conformance clause on the harness registry's list under §13.2's item-126 bars (G126-scope), its T-V12 row, its §3.16
edge row and its W7 milestone cell (the milestone that lands the medium layout).
