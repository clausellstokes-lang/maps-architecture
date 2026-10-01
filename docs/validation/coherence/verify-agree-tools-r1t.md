# Agreement check, round 1 — the tools (determinism, rendering, V09, V10) after assemble-r1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-tools-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh) · [x] round-0 findings VAT-01..25 re-checked against the live text (20 fixed, 3 partly, 1 ruling requested, 1 moved to V09) · [ ] repair-touched tool subsections re-read (3f0e02b → live) · [ ] hand-offs of this round at destination · [ ] owner items 120–125 parts checked (F-MISSING) · [ ] issues written · [ ] result saved · [ ] LANDED

Live text read: base `137ecc0e…`, V09 `c2dc5b80…`, V10 `f8f591b3…`, V06 `771887ca…` (assemble-r1's outputs; V10 after its title-block widening).

## Round-0 findings — verdicts

| id | owner (r0) | verdict | where (live) |
|---|---|---|---|
| VAT-01 | V09 | FIXED | V09 §4.3 T2 row, §4.5 T2 mapper, §4.21.1 (2), T-V9-71: `from: { points: [p], levelCm, spring: true }` |
| VAT-02 | V10 | FIXED | V10 §4.1 `lake` row: the flag in the points form |
| VAT-03 | rendering | FIXED (residual field corrections handed by V10's note (2) are VV910-02's and the host lane's, not raised again) | §11.2 `Query` members with fields, `ReaderAnswers`, `Bearing8` and the fourteen answer types; V10 §2.13 cites them |
| VAT-04 | V10 | FIXED | V10 §2.13's lead cites §2.8's `PlacementOrder` and §11.2's types; no re-declaration left |
| VAT-05 | V09 | FIXED | V09 §2.9: `MsgRef` cited as §11.2's (comment), no declaration |
| VAT-06 | rendering | PARTLY FIXED — §11.2 `ApplyResult.outcome`, `PreviewResult.outcome`, `ConflictAction.msg`, §11.3 `doc.rejected`, V10 §2.9 done; V09 §3.3 / §5.3 still name no source for the refusal card's line (re-raised, owner V09); §5.2's F-EDIT cell is VDC1-05's (determinism, not raised again) | §11.2, §11.3; V10 §2.9; V09 §3.3 *Refused and bent*, §5.3 |
| VAT-07 | determinism | FIXED | §7.1's layer table (no events column) and its sentence; T101-1/T101-2 read the binding (§13.2); V10 §4.1, T-V10-1 |
| VAT-08 | determinism | PARTLY FIXED — §7.1's binding homes every pair; V09 §4.3 has no row for most of them (re-raised, owner V09) | §7.1 binding T2, T3, T4, T6, T8, T9; V09 §4.3 |
| VAT-09 | determinism | FIXED | §7.1 *Points in, shape out*; V10 §4.1 and V09 §4.5 cite it |
| VAT-10 | determinism | FIXED | §7.1's three `invalid` rows and *The returned kinds*; V09 §4.9 `refuse.style.order`, `refuse.table.knowledge`; `refuse.clerk.opsDevice` |
| VAT-11 | determinism | FIXED | §7.1 `group`; §7.4 *Targets*; V10 §4.2 (1) |
| VAT-12 | V09 | FIXED | V09 §4.3 T10 row (no `forest`; New trees on T12); J-V9.101 |
| VAT-13 | V10 | FIXED | V10 §4.1 `tiers` row: `setMassing { building, op: { op: 'tiers', … } }` (V10's note (1): `MassingOp` is an object, correctly) |
| VAT-14 | V10 | FIXED | V10 §4.3, §2.6 |
| VAT-15 | V10 | FIXED | V10 §2.3 `ToolName = ToolId | …` |
| VAT-16 | V09 | FIXED | V09 §4.3 `advance` row, §4.9 `refuse.dossierClock`, §5.6 |
| VAT-17 | V06 | FIXED | V06 §4.2 'let a lane go' row on T9 `shape` |
| VAT-18 | V09 | FIXED | V09 §5.6, §4.9 `info.past.viewing` with `button.openCopy`, §3.16 row 81 |
| VAT-19 | V10 | FIXED | V10 §2.12 `HoldInput` comment, J-V10.84, §4.5, T-V10-25 |
| VAT-20 | V10 | NOT FIXED in its rung clause — RULING REQUEST by V10 (re-raised, same id) | V10 §3.16 `rule` row |
| VAT-21 | determinism | FIXED | §7.1 `drawWay.from`, *Points in, shape out* (road pair by pair) |
| VAT-22 | V09 | FIXED | V09 §4.5's mapper lead and rows (`points: []`, `boundary: []`, `add: []`; harbour `harbour_basin`) |
| VAT-23 | V10 | FIXED | V10 `ClerkDraft` |
| VAT-24 | V09 | FIXED | V09 §4.9 lead, `button.retry`, §4.11 **Ask again**; V10 §2.6, §3.11, §5.4 |
| VAT-25 | V09 | FIXED | V09 §4.3 T8 layout row with **Terraces**, §4.5 T8 mapper |

## Repair-touched subsections in scope

(being written)

## Owner items 120–125 — parts in scope

(being written)

## Issues

(being written)
