# Agreement check, round 1 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh) · [x] round-0 findings re-checked against the live text (20) · [ ] peer-confirmed time items re-read · [ ] repair-touched time subsections re-read (diff 3f0e02b → live) · [ ] owner items 120–125 parts checked (F-MISSING) · [ ] issues written · [ ] result saved · [ ] LANDED

## Round-0 findings — verdicts

| id | owner (r0) | verdict | where |
|---|---|---|---|
| VAT0-01 | V06 | PARTLY FIXED — V06 side done; V04 §3.5.7 (d) still ends "a building never draws twice for one kind" | V06 §3.18.1 (2a), T-V6-34, bar.T-V6-34; V04 §3.5.7 (d) |
| VAT0-02 | V04 | FIXED | V04 §3.5.7 (g) (5), §3.10, §13's V06 row, J-V4.128 |
| VAT0-03 | V01 | FIXED | V01 §3.3.6, §3.12 |
| VAT0-04 | V06 | FIXED | V06 §3.18.2 (3a) |
| VAT0-05 | V06 | FIXED | V06 §2.1 (cites §4.11), §3.1 (4) |
| VAT0-06 | pipeline | FIXED | §4.11 runner paragraph |
| VAT0-07 | pipeline | PARTLY FIXED — §4.11 (2) fixed; §6.1's live-epoch numbering after a replay prefix still unstated | §4.11 (2); §6.1 |
| VAT0-08 | V07 | FIXED | V07 §3.12, T-V7-30, J-V7.98 |
| VAT0-09 | V06 | FIXED | V06 §3.18.1 (4), W73, `EpochReport.households.undergroundVacated` |
| VAT0-10 | V06 | FIXED | V06 §3.8.2 tier (2), §3.13 (1) |
| VAT0-11 | V01 | FIXED | J-V1.36 |
| VAT0-12 | V07 | FIXED | V07 §3.12 *Which path runs* |
| VAT0-13 | V06 | FIXED | no `engine` author left in V06 |
| VAT0-14 | V07 | FIXED | V07 §2.6, §3.12 *Pins over epochs* |
| VAT0-15 | determinism | FIXED | §7.4's `epoch` row |
| VAT0-16 | V06 | FIXED | §2.7 `DisplaceCause` with `destruction`; V06 §2.1 cites it |
| VAT0-17 | V06 | FIXED | V06 §3.19 cites V01 §3.14 |
| VAT0-18 | V07 | FIXED | V07 §2.1 `ProductDecl extends ProductDeclEpoch`; §3.12 registration |
| VAT0-19 | V04 | FIXED | V04 §3.5.5 (b) (1) |
| VAT0-20 | V06 | FIXED | V06 §3.20.5 (4) |

## Issues

(being written)
