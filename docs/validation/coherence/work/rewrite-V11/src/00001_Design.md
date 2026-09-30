# Design volume 11 — The content system: every rule and content table, its schema, its rows and its authoring plan

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V11-content; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V11; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r3 (continuation on the re-issued brief, 2026-09-29 10:31); covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r4 (continuation on the re-issued brief, 2026-09-29 11:35); covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r6; covered by the whole-design retrovalidation (J84).

> Revision note (2026-09-28/29, lane volumes/revise-V11): revised in place against docs/volumes/critique/V11.md's 51 findings
> (V11C-02 as switched for the owner's ~20:05 "switch it then, cathedral also gets crypts but cemetaries get catacombs",
> J111; V11C-33 – V11C-51 its item-110 addendum, owner ~23:30 "they go in" with (b) as revised ~23:40) and the cross-lane
> hand-offs of the V02, V03, V04, V05, V06, V07, V08, V09, V10 and V12 lanes. The pre-revision text is
> kept at scratchpad/volumes/revise-v11/V11-pre-revision.md (md5 92db9f9a…). The disposition table is appended to the
> critique; V11 §13 lists what is deliberately left for later.

> PROGRESS (lane volumes/V11-content; one line per section)
> - 0 In plain words: done
> - 1 Scope, base hooks, out of scope: done
> - 1b Wiring table: done
> - 2 Data model: done
> - 3 Generation (the table catalogue and its rows): done
> - 4 Editing: done
> - 5 Rendering, labels, exports: done
> - 6 Performance budgets: done
> - 7 Tests and acceptance bars: done
> - 8 Build plan: done
> - 9 Decisions: done
> - 10 Base change requests: done
> - 11 Owner questions: done
> - 12 CONFIRMED versus PLAUSIBLE: done
> - 13 Fix list: done (filled by the revision)
>
> REVISION LEDGER (lane volumes/revise-V11; one line per step: planned | done)
> - R1 §0, §1, §1b (scope, hooks, wiring rows W27–W48): done
> - R2 §2 data model (crypt columns, coverage units, ids, demand, ladder identity, waterfront from, template rows, heights, affinity, the underground rows' shapes, lifecycle): done
> - R3 §3.1 registry and §3.2 compiler: done
> - R4 §3.3 families and §3.4 profile families: done
> - R5 §3.5 the class tables (family column, delta notation, reading rules, crypt rows, translations, soft rows): done
> - R6 §3.6 templates (derivation, role table, yard shares, burial ground, manor, heights columns): done
> - R7 §3.7 goods and §3.8 pairs: done
> - R8 §3.9 district kinds, §3.10 identities, §3.11 kinds, §3.12 ladders: done
> - R9 §3.13 custom content, §3.14 covers, §3.16 walls, §3.17–§3.19, §3.20 naming (with the item-110 cells they carry): done (continued 2026-09-29 01:11 after the 23:07 cut)
> - R10 §3.23 the underground's content rows (item 109, crypts and catacombs): done
> - R10b §3.24 item 110's rows (critique §11: V11C-33 – V11C-51) with the classes, families, heights and feature class they add; §2.8c types; registry rows 78–85; §1b W49–W61; §2.4 ids; §2.10 lifecycle; §3.12 V08's ladder re-check: done
> - R11 §4 editing, §5 exports, §6 budgets: done
> - R12 §7 tests, §8 build plan, §9 decisions: done
> - R13 §10 BCRs, §10b cross-volume requests, §11–§13: done
> - R14 disposition table in the critique (§12 there); checks (ids, pointers, tables, base quotes, doc_checks); LANDED: done
>
> RECONCILIATION LEDGER (lane volumes/reconcile-V11-r1; 31 seam issues of docs/volumes/critique/seam-settlements-r0.md and
> seam-content-calibration-r0.md; one line per step: planned | done)
> - RC1 the village namespace and routing (SS-01, SS-02, SS-03, SS-05, SS-06, SS-09, SS-31): done
> - RC2 ladders and the dossier row sets (SS-07, SS-24, SS-25, SS-26, SS-36, SS-44, SCC-06): done (SS-36's BCR-V11-9 list in RC5)
> - RC3 walls, stores and village names (SS-15 with SCC-01, SS-34, SS-17, SS-18): done
> - RC4 item 110, templates and exports (SS-13, SCC-02, SCC-09, SCC-10, SCC-11, SCC-13, SCC-16 – SCC-19, SCC-25): done (tests, C8 and X rows in RC5)
> - RC5 tests, build plan (SCC-08), decisions, BCRs, §10b, §12, §13, the integration notes, the round-1 note: done
> - RC6 the other volumes' halves (V12, V06 and V08 edited; V07 by note and §10b), checks, LANDED: done
>
> RECONCILIATION LEDGER, ROUND 2 (lane volumes/reconcile-V11-r2; 13 seam issues of docs/volumes/critique/seam-settlements-r1.md
> (SR1-*) and seam-content-calibration-r1.md (SCC-*); one line per step: planned | done)
> - RD1 the churchyard part's name (SR1-03) and the village companions (SR1-07, SR1-08, SR1-19, SR1-20, SR1-21, SR1-22): done
> - RD2 the manifest shape and the stale records (SR1-23, SR1-25): done
> - RD3 the decline rates' one home (SCC-30), the web's off form (SCC-34), T-V11-13's unit (SCC-37), the naming row sets not calibratable (SCC-44): done
> - RD4 decisions, §12, §13, the round-2 note, the V12 and V06 halves (V06's after its lane landed), checks, LANDED: done
- Continuation on the re-issued brief (2026-09-29 09:21; SCC-R1C-1 and SCC-R1C-3, majors, of seam-content-calibration-r1.md §7; the 13 above verified in the live text, not redone):
- RD5 the registry's readers as StageIds (SCC-R1C-1): §2.1's comment, §3.1's preamble and rows, §3.2.1 steps 1 and 6, T-V11-1: done
- RD6 the four tables outside the content system (SCC-R1C-3): registry rows 86–89, `TableSchema.owner`, the count, non-calibratable: done
- RD7 wiring, lifecycle, build plan, decisions, §10b, §12, the continuation note; the V12 half (applied after V12's lane landed); the V10 half (applied, V10's lane having landed); checks; LANDED: done
>
> RECONCILIATION LEDGER, ROUND 3 (lane volumes/reconcile-V11-r3; 8 seam issues of docs/volumes/critique/seam-settlements-r2.md
> (SR2-*) and seam-content-calibration-r2.md (SCC-*); one line per step: planned | done)
> - RE1 the village rungs' coverage option and ladder range rows (SR2-05, SR2-06, SCC-63): done
> - RE2 the preset entries — `VG`, `FM` in the source type, the compiler's check, the carrying cells, the landing (SCC-51): done (lifecycle row, W68 and J-V11.74 in RE5)
> - RE3 the switch policy (SCC-67), the term owner (SCC-65), the tests' wording (SCC-66): done
> - RE4 the register's metric and method for the non-g tables (SCC-72): done
> - RE5 decisions, wiring, lifecycle, §12, §13, the round-3 note, the lane notes, checks, LANDED: done
> - Continuation on the re-issued brief (2026-09-29 10:31; SCC-R2C-2 (major), SCC-R2C-8, SCC-R2C-9, SCC-R2C-10 (minors) of seam-content-calibration-r2.md §7.2; the 8 above verified in the live text, not redone):
> - RE6 V04's two dossier row sets in the registry (SCC-R2C-2): done (W73, the lifecycle row and J-V11.83 in RE9)
> - RE7 the readers (SCC-R2C-8) and the empty-table rule (SCC-R2C-9): done (J-V11.84, J-V11.85 in RE9)
> - RE8 the landmark threshold cell (SCC-R2C-10) and, outside the brief, SCC-R2C-12's V11 clause: done (W74, J-V11.86, J-V11.87, X-V11-15 in RE9)
> - RE9 wiring, lifecycle, decisions, §10b, §12, §13, the continuation note, the V08 half (applied by V08's lane, landed 10:44), `customWeights` in row 63 (V08's X19), checks, LANDED: done
>
> RECONCILIATION LEDGER, ROUND 4 — continuation (lane volumes/reconcile-V11-r4, re-issued brief, 2026-09-29 11:35; SCC-R3C-2,
> SCC-R3C-4 (majors), SCC-R3C-7, SCC-R3C-15 (minors) of seam-content-calibration-r3.md §6.2; SR3-03, SR3-07, SCC-75 and
> SCC-77 of the 07:32 landing verified in the live text, not redone; one line per step: planned | done)
> - RF1 the `NG` preset (SCC-R3C-2): §2.1, §2.2, registry row 73, §3.2.1 step 4, §3.2.2, T-V11-0, T-V11-9, §8: done
> - RF2 V01's two tables (SCC-R3C-4): registry rows 90–91, the count, T-V11-1 (a), §6, §8: done
> - RF3 the readers (SCC-R3C-7): rows 38 and 62 (`fabric.select` dropped), §8's writer rule: done
> - RF4 the loader under `VG` (SCC-R3C-15): §2.1, §3.2.1 step 4, §3.2.2, BCR-V11-31, J-V11.77: done
> - RF5 wiring W75–W76, lifecycle, decisions J-V11.88–J-V11.91, X-V11-16, §12, §13, the continuation note, lane notes, checks, LANDED: done
>
> RECONCILIATION LEDGER, ROUND 5 (lane volumes/reconcile-V11-r5, 2026-09-29 12:39; SR4-02 of seam-settlements-r4.md and
> SCC-96 of seam-content-calibration-r4.md, both minor; one line per step: planned | done)
> - RG1 the pin records at village and base rungs (SR4-02): §3.11's `@pin:<kind>`, §3.12's `parish_church` row: done
> - RG2 S5b's reads (SCC-96): rows 80 and 81, rows 49 and 71 (the class's sweep), the `S5` group rule (§2.1's comment, §3.1's *Readers*, §3.2.1 step 6, T-V11-1 (b)), §3.24.2's and §3.24.5's reader notes, W50, W71: done
> - RG3 decision J-V11.92, §12, §13, the round-5 note, checks, LANDED: done
>
> RECONCILIATION LEDGER, ROUND 6 (lane volumes/reconcile-V11-r6, 2026-09-29 13:56; SR5-03 (major), SR5-08, SR5-09, SR5-11
> (minors) of seam-settlements-r5.md and SCC-104 (major) of seam-content-calibration-r5.md; one line per step: planned | done)
> - RH1 the display cells (SR5-03): §2.1's settings form, §2.3's four class cells, the display-words table (§3.5.15), the family, district-kind, goods and style-sheet labels, the generic classes' label, step 5a, T-V11-4, registry row 17: done (W77, lifecycle row, BCR-V11-1's amendment with it; the class count corrected to 181)
> - RH2 the span and snap cells (SCC-104): §2.8c `span`, `slideMaxFactor`, the `retaining` settings row; §3.24.1–§3.24.2; rows 79–80; T-V11-1 (a): done (W78, the lifecycle row, `EraRow`'s comment with it)
> - RH3 the minors: row 61's gloss and §12's round-5 clause (SR5-09), the two V07 producers (SR5-11), row 87's sources (SR5-08): done
> - RH4 wiring W77–W78, lifecycle, decisions, X-V11-17, §12, §13, the round-6 note, lane notes, checks, LANDED: done


