## Reconciliation round 2 (volumes/reconcile-V11-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 13 seam issues this volume owns in `docs/volumes/critique/seam-settlements-r1.md` (SR1-*)
and `docs/volumes/critique/seam-content-calibration-r1.md` (SCC-*): 0 blockers, 4 majors, 9 minors — **13 FIXED, 0
INVALID, 0 on the fix list** (F-V11-4 closed). The pre-round text is kept at
`scratchpad/volumes/rcV11r2/V11-pre-reconcile-r2.md` (md5 6968447a…). What changed, by issue:

| id | severity | disposition | where |
|---|---|---|---|
| SR1-03 | major | FIXED — the burial face of the `church` (0.3) and `cathedral` (0.15) families is the `churchyard` part, the base's name; `cloister` and `burial-ground` keep `burial`; V04 §3.5.1 (1) (a) and (d) read the two names | §3.6.1 (the yard heading and rows), §2.8 `TemplateFamilyRow.yard`, W28, §3.12's `parish_burial_grounds` member cell |
| SCC-30 | major | FIXED — V11 §3.18 holds no strike rate: a retaining stretch and a raised span are struck at the base decline table's persistence rows `retaining` and `raised` (BCR-V6-26, file f item 291); "V6 §2.4's table" → "V6 §2.2's table" | §3.18, J-V11.71, J-V11.50's note, X-V11-11, X-V11-12; V12 §3.11's decline line (edited) |
| SCC-34 | major | FIXED — the web's off form: one named, in-range cell set equal to the parity presets (four web weights 0, two factors 1, every good's `comfortM` 0) with two switches `orientEnabled` and `splitEnabled` that the loader applies to the view | §3.7.4, §3.2.2, §2.10, W67, T-V11-21, J-V11.72, X-V11-11, X-V11-12; V12 `NoRegressionSpec.off` as `{ ref, value }[]`, §3.6b's prose and the bar map's 105 (k) row (edited); V06 §3.9.10, T-V6-44 and X35 (edited after V06's round-2 lane landed) |
| SCC-44 | major | FIXED — `calibratable: false` on every column of registry rows 68–70 and on row 71's naming columns (`nameGrammar`, `appearanceTemplates`, the culture rows' grammar-slice and corpus fields); the culture `building` block stays calibratable | §3's preamble, §3.1's closing note, T-V11-37, J-V11.70 |
| SR1-07 | minor | FIXED — the `@absent` reading at a village rung: the `v.` class that plays each named class through its `villageForm` (V07 §3.11 step 1) | §3.11's pseudo-class paragraph, W35 |
| SR1-08 | minor | FIXED — V07's `presence?` column (BCR-V7-36) named among a `v.` row's fields, carried as written; T-V11-3, -4, -5, -7 and -25 run over the `v.` rows | §2.3, §3.2.1 step 6, §3.5.14, T-V11-0 |
| SR1-19 | minor | FIXED — `exotic-tower`: `S+ noise 2` plus the authored row `far` → `#housing` 60 soft; `industrial-workshop`: `N− deposit` | §3.13.2 |
| SR1-20 | minor | FIXED — the GUILD hall's binding cites V08 §3.5.1 (c)'s family rule (J-V8.83) | §3.12 |
| SR1-21 | minor | FIXED — "Four readings come before this column", adding V07 §3.11's burial-record seat and its `@absent` reading | §3.22 |
| SR1-22 | minor | FIXED — the `toll_bridge` row carries `implies: 'bridge'` | §3.11 |
| SR1-23 | minor | FIXED — the manifest cited as V08 §2.4's shape; also in §3.11's routing paragraph and W46, which restated it too | registry row 77, §3.11, W46, X-V11-1 |
| SR1-25 | minor | FIXED — F-V11-4 closed by reconcile-V07-r1; the §12 clause removed | §12, §13 |
| SCC-37 | minor | FIXED — T-V11-13 measures by V12 §3.6's `servedShare` on the class's compiled unit, a church class's parish in its households form (J-V12.59) | T-V11-13 |

**Also in this round.** The §2.10 lifecycle row for the two switches; the wiring row W67; decisions J-V11.70 – J-V11.72
and J-V11.50's note; the round-2 paragraph of §12.

**Other volumes' halves.** V12 (no round-2 lane open at 05:02; its lane opened at 05:03 from the edited state, md5
1ede8460…): 4 marked edits (§2.7 `NoRegressionSpec.off`, §3.6b's `noRegression` prose, the bar map's 105 (k) row, §3.11's
decline line). V06 (its round-2 lane landed 05:04 after recording the half as X35, not applied): 3 marked edits
(§3.9.10's closing sentence, T-V6-44, X35 marked applied). Each edit is an exact-string replacement from the file's
current state, logged in `docs/lane-events.log`, with a backup under `scratchpad/volumes/rcV11r2/`.

