## Reconciliation round 4 (volumes/reconcile-V10-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against `docs/volumes/critique/seam-surfaces-r3.md` (the application, the clerk and the host, round
3). One issue was this volume's: SR3-07 (minor), five parts — 1 fixed, 0 invalid, 0 on the fix list. No new decision,
test, change request or cross-volume request: J-V10.93 keeps the decision whose wording moved, T-V10-7 gains a clause,
and CVR-V10-7 is marked met. The build plan's estimates are unchanged: a narrower field type, a moved status line and a
citation move no work.

| issue | severity | what changed | where |
|---|---|---|---|
| SR3-07 | minor | (a) §12's PLAUSIBLE bullet on V09's third round moves to CONFIRMED: landed 06:25, V09 §2.10 as this volume cites it (`rebuildEvents` answering `[]` when nothing can be built; `attach.newMap?: true`, never set in host mode); (b) CVR-V10-7's clause reads "`ClerkMount.rebuildEvents(seq)`, V09's one implementation of V09 §4.20.3 (4)" and the row is marked **Met** with its five citations, each read in V09 this round; (c) `ClerkTranscript.key` is typed `'secret' \| { tier: 'public' \| 'local'; places: Id[] }`, the form the effective key is passed as `admitAs`, and V10 §2.3's key order is stated over that form, never a bare tier; (d) §3.16's `dossier` row's slot clause reads "its slots filled by V09 §4.9's row" in place of its own statement, now that V09's fourth round wrote that row's slots and V09 §4.16 (6), J-V10.93 keeping the decision; (e) T-V10-7's clause: the unplaced elements and, where a `sites` candidate is free of hard fails, its placement on a plot — a place by a locus and a roster line alike (J-V10.93), a line with no locus querying without `near` and `district` | §12, §10.2 CVR-V10-7, §2.7, §2.3, §3.16, T-V10-7 |

Found in passing and fixed: §12's PLAUSIBLE bullet on sibling shapes still named V09's item 362 – item 246 "while
their revisions run" and V02's registry paths; both are written (V09 §10.1; IN-V10-4), so the bullet keeps only V11's
specialisation ids and V01's terraced-ward kind, each with its pre-decided behaviour.

