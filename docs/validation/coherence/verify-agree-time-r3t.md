# Agreement check, round 3 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-2 findings re-checked against the live text (9) · [ ] round-3 blocks in scope re-read (diff 920d280d → live) · [ ] owner items' parts re-checked where round 3 touched them · [ ] issues written · [ ] result saved · [ ] LANDED

## Scope and method

(in progress)

## Round-2 findings — verdicts

| id | owner | ruling (adjudication-r3 Part H) | verdict | where (live) |
|---|---|---|---|---|
| VAT2-r2-01 | pipeline | FIX per R3-17 (graded MAJOR) | **FIXED** | §4.11 *The clock* (4) l.8352-8361: "and at the week of each newly carried calamity that no other epoch falls on (DR28 …; V08 §3.6 (3); J-V8.55)", the catch-up clause "a calamity then riding the coarse epoch that holds its week" |
| VAT2-r2-02 | V06 | FIX, amended per R3-17 | **FIXED** | V06 §3.3.1 l.1075-1077 cites "§4.11 *The clock* (4)'s cadence" and lists no trigger, R3-17's text whole |
| VAT2-r2-03 | pipeline | FIX per R3-18 (BLOCKER kept) | **FIXED at its named sites** (residue elsewhere: VAT3-r3-01, VAT3-r3-02) | §4.11 *The clock* (1) l.8330-8334 (the present at creation; the creation week, the `generate` event's); EP-15 l.8862 "a week-0 present" |
| VAT2-r2-04 | V06 | FIX per R3-18 | **FIXED** | V06 l.410-411; §3.20.3 l.3135-3139 |
| VAT2-r2-05 | V06 | FIX per R3-06 (b) | **FIXED** | V06 §3.23 (4) l.3423-3427; §3.21 decay row l.3274, combination row l.3304; T-V6-76 (d); model §2.6 step 7 l.2099-2102; V11 §3.25.10 `settings` l.4616-4619 |
| VAT2-r2-06 | V06 | FIX per R3-06 (c) | **FIXED** | V06 §3.23 (4) l.3418-3423 (`A` = the week first met so − 52 × `D`, the creation week for a building generated so); §3.21 l.3274 and T-V6-76 (d) ("`D` + 50 years, non-decreasing"); V11 l.808 and l.4616 |
| VAT2-r2-07 | V07 | FIX, amended per R3-19 | **FIXED** | V07 §3.12 l.2544-2548; T-V7-16 l.3621; J-V7.2 l.3800; agrees with V06 §3.5.1 (1), (4), (5) l.1220-1250 |
| VAT2-r2-08 | V06 | FIX | **FIXED** | V06 l.1637, l.3302, T-V6-73 l.4140 read `EpochRecord.inputs.week`; no `EpochRecord.week` left in the set |
| VAT2-r2-09 | V06 | FIX per R3-10 (graded MAJOR) | **FIXED** | V06 §3.22 signature l.3317 (`overlay: Id \| null`), (3) l.3364-3366, §3.21 row l.3273, T-V6-75 (d); V02 §5.7 (1) l.3043; V03 §5.6 (4) l.2726 |

## Issues

(in progress)
