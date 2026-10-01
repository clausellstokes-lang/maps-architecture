# Verify — coherence pass, round 1: volumes V03 (interiors) and V04 (underground)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V03-V04-r1t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r1t`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (the brief whole incl. ROUND-1 NOTES, ITEM 120, ITEMS 121–125, ORCHESTRATION NOTES; r0s report and result; assemble-r1; repair-r1-V03 and -V04 preambles; canon dated rulings 114–125; g items 120, 122, 123) — done
- P2 pre-round → live diffs (V03 70 hunks, V04 77 hunks; pre = HEAD 3f0e02b2 blobs, sha256 23cc83c4… / 5de75b27…; live eda87a1c… / 47c14477…) — built
- P3 round-0 findings VV34-01 … VV34-17 re-checked on the live text — done: 17 of 17 fixed (VV34-16 by a reasoned deviation agreeing with II.7.6); new so far: `report.plan.*` family absent in V09 §4.9; VAL-08's rename left `OpeningRow` in base II.7.6, V06, V07, V11; VAL-05's move left II.7.4 without 0.5 and V11 §3.23.6 / V12 §3.11 calling `accessForecastMin` V04's; V09's `info.plan.*` row names one key form
- P4 every subsection a repair block replaced, inserted into or appended to (V03's 23 blocks; V04's whole-volume REPLACE = 77 hunks) read whole — V03 done (70 hunks: §0, §1, §1b, §2.1 (AccessHead = §2.6's, field for field), §2.3, §2.4 (named rows: hall/keep/tower/mill are V11 families, no BuildingClass; temple no class), §2.5, §3.2 (§4.5's discrete-cell rule present), §3.4, §3.7, §3.13, §4.2 (reach bend), §4.4–§4.6, §5.2, §5.5, §6, §7 (T119-1..5, V12 wait timers, ladder [3, capacity] resolve), §8, §9, §12, §13): no new defect in V03's text; V04 next
- P5 g items 120 (G120-V03, G120-V04 against (a)–(k)), 121–125 (G122-V03, G123-V03, G123-V04 F-MISSING; others name neither volume)
- P6 hand-offs of V03/V04 repairs at their destinations (base II.7.4, II.7.6, §13.2; V06, V07, V09, V10, V11, V12)
- P7 ids, references, retired terms, deferral wording, doc_checks (provisional)
- P8 report, result file, LANDED

## Outcome

(in progress)

## Issues

(in progress)
