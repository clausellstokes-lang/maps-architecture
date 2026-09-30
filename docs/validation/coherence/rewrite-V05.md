# Rewrite — design volume V05 (the sky layer)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V05; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V05`, started 2026-09-29, continued in the cloud 2026-09-30)
- P1 inputs gathered (canon unit V05: 483 STATE, 14 REFERENCE, 30 BCR pointers, 6 conflicts, 35 f items, g 111, 4 wiring gaps, E-01/E-02/E-16/E-24, ID-BCR/ID-DR, 17 hand-offs, 2 disagreements, 60 U + 48 T edges, 31 combinations, 69 open findings; inventory 544 items + 49 terms; routing in work/rewrite-V05/routing.md): done
- P2 head, §0, §1, §1b: done (parts/00-head-s0-s1.md, 01-s1b.md: §1b keeps the non-field pieces, fields wired in §2.6 — V05-DUP-3)
- P3 §2: done (parts/02-s2.md: SkyUnitInput, 'update' in both `by` (V05-ICONF-1), WGAP-3 readers, accessCount.handMax (EI-V05-EDGE-3), E-01 rows)
- P4 §3.1–§3.12: done (parts/03-s3a.md: DEFER-1/2, RESTATE-5, CF-PIPE-06, WGAP-3 'richest', g 111 at §3.8 (4) and §3.11, the clearance rule's one home with its lock clause, §3.12's reconciliation closed at V01 §3.10.3)
- P5 §3.13–§3.18: done (parts/04-s3b.md: EDGE-1 lock, the landfall as one table (DUP-2) with EDGE-2, X15's scope.raised)
- P6 §3.19–§3.22 and the edges table: done (parts/05-s3c.md: the shade-evaluation schedule once at §3.19 (6) (DUP-1), RESTATE-4, J-VI.3's `sheer`, XV-V9-25's geometry, DEFER-1, X-V12-11; new §3.23: 38 mechanism rows + 22 combination rows, T-V5-33)
- P7 §4–§6: done (parts/06-s4.md: bend.island.keepRoom / bend.island.rimStop (WGAP-2), V09's delete row (T10) (XV-V9-16), §7.4 rows cited, DR27, CVR-V10-14; parts/07-s5-s6.md: §8.2/§8.4 cited, slot numbers at §8.2, E-16)
- P8 §7 tests: done (parts/08-s7.md: T-V5-33 the edge suite, EDGE-1/2/4 clauses, g 111 no-op clause, X-V12-4, X-V12-11)
- P9 §8–§13, integration notes: done (parts/09-s8-s13.md: J122 order, --milestone V5-Pn, §10 pointer table, §11 decided, §12 one paragraph each, §13 no open item, E-24 marks, J-V5.82–83)
- P10 assemble, verify ids, references, terms, sizes: done (60.9k words, −25.0 %; retired terms 0 but one legitimate DR-SKY migration mention; every V05/T-V5/J-V5 reference resolves; cross-volume labels found; token coverage 532/544)
- P11 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: pending

Source: docs/volumes/V05-sky.md (3808 lines, 81 161 words). Output: docs/validation/coherence/new/volumes/V05-sky.md. Working parts: docs/validation/coherence/work/rewrite-V05/parts/.
