## Reconciliation round 4 — continuation (volumes/reconcile-V07-r4, re-issued brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r4; covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with a wider issue set than its 07:34 landing covered. The eleven issues of that
landing are history: fixed as the
*Reconciliation round 4* note above records, each anchor verified present in the live text by grep (V07 §3.12's *Markets,
halls and the fair over epochs*, file f item 576 (c), file f item 579, J-V7.116 – J-V7.121, `rules.race.densityPower`, "member
class", V07 §3.0's VS4 row with the `nearMarket` halls), nothing redone. The one added since — raised by
`docs/volumes/critique/seam-content-calibration-r3.md` §6.2 in that lane's continuation (landed 11:19) — reached no landed
lane and is fixed here: 0 blockers, 0 majors, 1 minor, **fixed**, none invalid, none on the Fix list. No new decision (the
change follows V11 §2.1's rule and V12 §3.11 as landed; J-V7.124 stands). What changed:

| issue | severity | what changed (where) |
|---|---|---|
| SCC-R3C-14 | minor | (a) V07 §8's *The register at the exits*: "compiles" read against V11 §2.1's empty-table rule — the entries follow a table's first rows, not its first compile (every registry row compiles from C0 as its schema's empty table, J-V11.84; `--defaults` writes an entry only for a column that holds a compiled cell, V12 §3.11, J-V12.73), so "a table or column that first ships rows (holds a compiled cell; V11 §2.1's empty-table rule) in an earlier milestone than planned below takes its entries there"; the table's header reads "first ships rows here — holds a compiled cell, V11 §2.1's empty-table rule (registry row)"; V-M1's content cell ("the table's rows shipped whole at V-M0") and its table row ("read the rows V-M0 shipped") follow; and a sentence records that every default-line entry this volume writes is due at M-CAL, which opens only after V-M4 (V12 §3.10.1), so each falls due after its own milestone (SCC-R3C-13's second half, the default line's later due, does not arise for this volume). (b) V07 §1's dependency (11) reads landed — V11 §8's preset-entries paragraph and J-V11.87 carry the clause — and its fallback is withdrawn. |

Also: the header banner, the PROGRESS line and the ROUND-4 CONTINUATION LEDGER; V07 §12's reading; V07 §13's note. V07 §1's
dependency (10) keeps file f item 576 (c)'s heading pending, since item 576's SR3-05 row still names §4.2 (read at this
lane's start). Estimates unchanged (26.5–36.5 pw). No base text is quoted anew, so V07 §10's quotes are unchanged.
Checks: every table's column count by script (29 tables, 0 rows off their header's count); the J-V7 (124), W (69), T-V7
(57) and BCR-V7 (38) ids unique, none added; doc_checks with the base's headings against the pre-continuation copy
(`scratchpad/volumes/rcV7r4c/V07-pre-r4c.md`) — C1, C2, S1 0; C4 unchanged (7 hits, 5 unreviewed); C3 + 3 unreviewed, the
banner phrases and "at the end of this file", none from the reference corpus; S2 + 7, pointers to this volume's own V07 §3.0,
V07 §3.11 and V07 §3.12 in this note and to V11 §2.1 and V12 §3.10.1 and V07 §3.11 in V07 §8 and V07 §12, none meant as a base section; the
diff against the copy holds this lane's hunks only.

