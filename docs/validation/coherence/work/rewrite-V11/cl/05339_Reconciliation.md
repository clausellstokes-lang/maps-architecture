## Reconciliation round 5 (volumes/reconcile-V11-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r5; covered by the whole-design retrovalidation (J84).

Two seam issues, both minor: **SR4-02** of `seam-settlements-r4.md` (V11's companion of V07's major SR4-01) and
**SCC-96** of `seam-content-calibration-r4.md` (SCC-R3C-7's class, found on row 80). **2 FIXED, 0 INVALID, 0 on the fix
list.** The pre-round text is kept at `scratchpad/volumes/rcV11r5/V11-before.md` (md5 04fb8f43…).

| id | severity | disposition | where |
|---|---|---|---|
| SR4-02 | minor | FIXED as required — (a) `@pin:<kind>` is §4.7's furniture pins at the base rungs and, at a village rung, VS8's pins, a record forcing its pin where none stands (V07 §3.10), since §4.7's furniture step places none at the `territory` rungs (BCR-V7-38, file f item 579); (b) the `parish_church` row's reading names both producers: at a village rung VS8 lays the churchyard cross and the shrine record binds it (V07 §3.10), at a base rung the shrine record's key aliases the church (V08 §3.5.1 (c)) | V11 §3.11's pseudo-classes, V11 §3.12's `parish_church` row |
| SCC-96 | minor | FIXED, wider than the finding's minimum (J-V11.92) — (1) row 80 lists S5b (the main-road step at stages k ≥ 2 and every epoch stage, through S4's router, which prices viaduct spans; §4.4; BCR-V6-25; V06 §3.6); (2) the pre-decided move kept: should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, rows 80 and 81 list EVO_GROWTH in that change; (3) row 81's check: its `S5` was no registered StageId (§4.1 registers the growth stage as S5a–S5d, each with its own op form), so it would have stopped V11 §3.2.1 step 6's reader check and named S5b only by intent — the registry's `S5` (rows 2, 3, 50, 81) now compiles as a group to the four steps, and row 81's raised-ways'-ends clause names S5b; the class's sweep: every row naming S4 as the raised-way generator lists S5b beside it (rows 49 and 71 as well), a standing rule in V11 §3.1's *Readers* | V11 §2.1's `readers` comment, V11 §3.1's *Readers* and rows 49, 71, 80, 81, V11 §3.2.1 step 6, V11 §3.24.2's and V11 §3.24.5's reader notes, T-V11-1 (b), W50, W71, J-V11.92 |

**Also in this round.** The round-5 ledger's RG1–RG3; decision J-V11.92; the §12 paragraph; the §13 preamble. No new
wiring row (the group expansion is W71's reader check, the S5b reads W50's generator), no lifecycle row (the readers'
row of V11 §2.10 covers a changed `readers` cell), no X-V11 request.

**Other volumes' halves.** V07 and V08 own the texts V11's two readings cite, each in its own round-5
lane (V07's live beside this one, STARTED 12:36; V08's LANDED 12:49); both texts already hold them as V11 reads them (V07 §3.10's
pin-record rule, J-V7.127; V08 §3.5.1 (c)'s pin-record exception, J-V8.111), and single source makes their texts govern. V06: none (its §3.6 and W58 already name S5b). No other volume was edited by this round.

**Document checks** (`docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`), the backup measured
now → this round's text before this paragraph: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0; C3 320 → 323 (the two new
stand-in lines and one digit run of section numbers in the §12 paragraph; none a list, grammar or table) and S2 393 → 399
(this volume's own V11 §2.10, §3.11 and V11 §3.12 pointers and V06's V11 §3.19, which the base's headings do not hold). By script:
every J-V11 (to J-V11.92), W (to W76), X-V11 (to X-V11-16), T-V11 (38 rows, T-V11-0 – T-V11-37) and BCR-V11 (31) id cited
is defined; ninety-two catalogue rows in §3.1's table.

