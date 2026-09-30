R='docs/validation/coherence/receipts/V02/'
E=[
("""All values are **our own** (provenance `own`, architecture 2026-09-28, revised the same day), calibratable (§13.9),""","""All values are **our own** (provenance `own`, architecture 2026-09-28), calibratable (§13.9),"""),
("""one row per V11 template family (V11 §3.6.1's 35 families — the 32 first authored, `burial-ground`, `fort` and `arena`;
reconciliation round 1, SCC-12), class rows only as
overrides,""","""one row per V11 template family (V11 §3.6.1's 35 families), class rows only as overrides,"""),
("""**3.10.1 Anchors (J-V2.30, revised).**""","""**3.10.1 Anchors (J-V2.30).**"""),
("""read by the chain's step 2 under its own `v.` key — reconciliation round 2) |""","""read by the chain's step 2 under its own `v.` key) |"""),
("""The classes `cemetery` and `arena` read their own template families' rows, `burial-ground` and `arena` (V02 §3.10.2): their
former override rows, aliases of `court-institution`, are withdrawn by reconciliation round 1, the `arena` row's
cells moved unchanged to its family row and its plot now V11 §3.6.1's `arena` row.""","""The classes `cemetery` and `arena` read their own template families' rows, `burial-ground` and `arena` (V02 §3.10.2),
with no class override row; the `arena` plot is V11 §3.6.1's `arena` row."""),
("""computed by
the revision (receipt: `scratchpad/volumes/revise-v2/medians.py`, its output below).""","""computed by
M5's constructions (receipt `"""+R+"""medians.py` → `medians.out`, re-executed 2026-09-29)."""),
("""(receipt
`scratchpad/volumes/rcV2/medians_new.py` → `.out`; every ratio of the table stays in [0.91, 1.31]).""","""(receipt
`"""+R+"""medians_new.py` → `medians_new.out`: 1.01–1.12; every ratio of the table stays in [0.91, 1.31])."""),
("""**The stepped rows against their bands (second revision, V2C-49 (6)).** Receipt `scratchpad/volumes/revise-v2b/stepped_receipt.py`
→ `.out` (beside `medians.py`), which evaluates V02 §3.15.1's closed forms as revised: ST0's least stack""","""**The stepped rows against their bands.** Receipt `"""+R+"""stepped_receipt.py` → `stepped_receipt.out`, which
evaluates V02 §3.15.1's closed forms: ST0's least stack"""),
("""(the T-V2-46 bar). The claim-sized rows""","""(the T-V2-46 bar; the Monte-Carlo column is the recorded output of an unsaved run, PLAUSIBLE until T-V2-46 measures
it, V02 §12). The claim-sized rows"""),
("""(V11 §3.6.4, which writes the three columns' values
once; SCC-20), read unchanged.""","""(V11 §3.6.4 writes their values), read unchanged."""),
("""**Every family a row names has its `MassingFamilyRow`** (second
revision, V2C-65 (3)), and""","""**Every family a row names has its `MassingFamilyRow`**, and"""),
("""(V11 §3.24.0's item-110 chance and offer cells carry theirs, 0, so no generated stepped or deck building enters the
`FM` goldens; reconciliation round 3, SCC-52): the `manor`,""","""— with V11 §3.24.0's item-110 chance and offer cells, whose `FM` entries (0, V11's) keep every generated stepped or
deck building out of the `FM` goldens: the `manor`,"""),
("""**`MassingFamilyRow` rows added by the item 110 fold and the second revision (V2C-65 (1), V2C-59).** `stepped`:""","""**The `stepped` and `ovalCourt` `MassingFamilyRow` rows.** `stepped`:"""),
("""**Item 110 fold:** `single → stepped` keep""","""`single → stepped` keep"""),
("""the `FM` entry code-read (V02 §3.10.10); reconciliation round 4, SCC-85) |""","""the `FM` entry code-read (V02 §3.10.10)) |"""),
("""| `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare` (item 110 fold; `stairGradeMax` 1.3 since the second revision, V2C-49 (5)) |""","""| `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare` |"""),
("""| `claimLo`, `claimHi` (second revision, V2C-49 (3)) |""","""| `claimLo`, `claimHi` |"""),
("""| `vaultClampCm` (`raised.clearCm` withdrawn by reconciliation round 1) |""","""| `vaultClampCm` |"""),
("""| `riserMaxCm` (`treadM` withdrawn by reconciliation round 1) |""","""| `riserMaxCm` |"""),
("""| V02 §3.16, until V11's `deck` row (X16) |""","""| V02 §3.16 (2): read only while V11's `deck` table is not registered (V02 X16) |"""),
("""**3.10.10 The register lines of `composition.json` (J-V2.101).** Every calibratable cell
of this volume's tables takes its calibration register entry (V12 §3.11; V02 §2.3) from exactly one line below, written by
the seat landing the milestone that ships the cell; a line ending "and every other …" binds the rest of its family, as V12
§3.11's lines do. `bar.T-V2-<n>` is V12's bar-metric family (the verdict statistic of one registered owner bar;
SCC-56, X33); the other metrics are V12 §3.4.2's.""","""**3.10.10 The register lines of `composition.json` (J-V2.101).** Every calibratable cell of this volume's tables takes
its calibration register entry from exactly one line below, by V12 §3.11's rule (a line ending "and every other …"
binds the rest of its family). `bar.T-V2-<n>` is V12's bar-metric family (V12 §2.1); the other metrics are V12
§3.4.2's."""),
("""as a V12 `BenchBarDef` (V12 §2.1; X-V12-15) —""","""as a V12 `BenchBarDef` (V12 §2.1) —"""),
("""V12 §2.1's `PresetArm` — no parity
preset; SCC-R2C-7; `perSetting` the bar's""","""V12 §2.1's `PresetArm` — no parity
preset; `perSetting` the bar's"""),
("""already carries it as `id` or `ownerBar` (none does at this round).""","""already carries it as `id` or `ownerBar` (none does)."""),
]
