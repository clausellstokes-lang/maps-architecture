## Reconciliation round 3 — continuation (volumes/reconcile-V08-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a different brief from the one its 06:30 landing covered. That brief's SR2-04 of
`seam-settlements-r2` (the land use a record needs, DR19) was verified in the live text and not redone: V08 §2.6's
`deposits` row still opens `res:derived:<k>` for `salt_works` and `peat_works`, notes `derived_landuse`, and T-V8-18
holds the salt-works mutation. The two new issues are **both FIXED**, 0 ruled invalid, 0 left on the fix list. They are
SR2-24 (minor), from `docs/volumes/critique/seam-surfaces-r2.md` §9, whose continuation landed at 10:02, and SCC-R2C-1
(major), from `docs/volumes/critique/seam-content-calibration-r2.md` §7.2, whose continuation landed at 10:12. Every
sentence that said otherwise was edited in place, and the table below lists the changes.

| issue | what changed (where) |
|---|---|
| SR2-24 (a) (minor; SR2-23's companion) | V08 §3.1 step 7 (b): `{places}` are the names of the places admitted by the key that `list` is called with (V9 §2.2; the shell passes `effectiveKey()`). Each place is read by `query(h, { kind: 'entity', dossierKey } \| { kind: 'entity', id }, { admitAs: that key })` (BCR-V9-36, BCR-V10-22): a binding key by `dossierKey`, a collective record by its members' `#k` keys, an address by `id`. A `withheld` place is neither named nor targeted, a `null` one is named by its key with no target, and a reveal or hide line left with no place is not listed. The handler keeps no subscription and is never handed `effectiveKey` or `onEffectiveKey`. Because `list` is synchronous and `query` answers by promise, the handler keeps a per-key answer cache, dropped at each new line and each head move. A `list` with an unread key returns only the lines that name no place, then fires `onChange` once the reads answer (J-V8.109). J-V8.106 is REVISED. T-V8-47's clause is rewritten (the party key form, the frame's key, a `null` place, an unread key, no `onEffectiveKey` handler, every read through `query` with `admitAs`). The §1b row and the §2.7 lifecycle row are updated. |
| SR2-24 (b) | V08 §4.6 item 3: the suppressed raised-way line is "drawn as V9 §4.10's `epoch` row's line, from V06's `EpochReport.raised.suppressedFired` (V9 XV-V9-28; J-V9.113)". No `raisedOutcome` or `RaisedWayLedger` read remains in the volume. |
| SR2-24 (c) | V08 §4.6's opening now lists V9 §4.9's rows (`history.dossierFacts.creation`, `report.moved.<kind>`, `report.dossier.<state>`; J-V9.109) as a home of the words. Item 1 reads "each by V9 §4.9's `report.moved.<kind>` row". In passing, item 2's key resolution cites V9 §4.10's `entity` read by `dossierKey` (BCR-V9-36), as SR2-20's *Needed by* expects. |
| SR2-24 (d) | V08 §4.6's absorb group is now "the port's `host:port` events after it, up to the next ledger event or another session's event (V08 §3.6 step 6; V9 §4.10's dossier groups, J-V9.107)". |
| SR2-24 (e) | X18 is **CLOSED**: V09's continuation landed at 09:49, and its V9 §2.8, §4.10, §5.4, §5.7 and §10.2 (XV-V9-26 met) were read in its text. §12's round-2-continuation PLAUSIBLE clause has moved to CONFIRMED. |
| SCC-R2C-1 (major) | V08 §2.6's header now gives every cell as `{ value, unit, provenance: own }` with `calibratable: false`. A dossier row set is a derivation rule of the port (item 20 (h)) and is never calibrated (§13.9 (7); V11 §3.1 rows 63–66, J-V11.65; V12's R4). A value changes only as a table fix reviewed with V11, V12's register holds no entry for it, and T-V11-37 fails a calibratable `dossier.*` column. The rows `cultures`, `relations` and `calamitySeverity` and J-V8.26 (REVISED) now read "not calibratable (a table fix)". §12's two sentences are rewritten: the dossier row sets' values (`cultures`, `crime`, relations, `customWeights`, `threats`, `dossier.ladders`) are not calibratable, and "calibratable" is kept only for V11's own `siting.web.chainStatus` cells (J-V8.49). T-V8-18 gains the clause that V08's sources compile with `calibratable: false`, which is T-V11-37's check. The decision is J-V8.107. |
| SCC-R2C-10, V08 half (the move SCC-R2C-1 points to) | DR-V8.8 now reads "at least V11 §3.24.2's `elevated.landmarkMinSignificance`" in place of its own `landmark.minSignificance` 20, and the same edit is made in §1b's two places, T-V8-38, J-V8.70 (REVISED) and §12's item-110 list. V11's half is X19. |

**Found in passing and fixed (the intake rule).** In V08 §3.11, the custom kinds' `economicWeight` and `criticality`
numbers were "own values, calibratable" and had no table: a hard-coded universal (item 23) of the same class as
SCC-R2C-1. They now form a dossier row set, `customWeights`, in V08 §2.6, with the same flag (J-V8.108). §3.11 cites it,
and it is added to §1b's row-set row and §1b's input list, to BCR-V8-10's list and to T-V8-18's totality clause. V11's
row 63 gaining the name is X19. In V11's text, `siting.web.chainStatus` holds `sustained` 0.9 (J-V11.52), so X2 is
CLOSED and §2.6's `chainStatus` row cites it.

**New rows.** J-V8.107 – J-V8.109 are new, and J-V8.26, J-V8.70 and J-V8.106 are REVISED. There is no new bar: T-V8-18,
T-V8-38 and T-V8-47 are edited. §12 has a new continuation paragraph. In §13, the intro is updated, X2 and X18 are
closed, and two hand-offs are added. X19 (V11) covers `elevated.landmarkMinSignificance` and `customWeights` in row 63.
X20 (V09) covers SR2-23's `list(key)` slot shape, V9 §4.10's re-list and T-V9-28's clause. Effort is unchanged:
a cache in the handler and one table fit SF4's and SF6's ranges (PLAUSIBLE). Counts now are 109 J-V8, 32 BCR-V8
(BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions.

**For the siblings (no edit made in their files).** V09: SR2-23, as X20 states it. V11 (reconcile-V11-r3's continuation,
running): SCC-R2C-10's setting, and `customWeights` in row 63's list with `calibratable: false`. V12: SCC-R2C-4's drop of
"volume 8's §2.6 own values" from the default line now matches V08's header, and no V08 milestone names a register
entry.

