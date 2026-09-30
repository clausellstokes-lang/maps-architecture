E=[
("""One versioned table file, read through the override layer (§7.6); every cell `{value, unit, provenance, calibratable,
extension?, presets?}`. Every calibratable cell has its **calibration register entry** (V12 §3.11: its default, its confirming
measurement, its due milestone and its fallback as this volume states them), written by the seat landing the milestone that
ships the cell — M3a-V2, M6a, M6b or M6c (V02 §8.3, §8.5) — and `plat calibrate register --check` (T-V12-20) is green over
them at that exit; a `presets.FM` **measured-rate** entry (V02 §3.10.8's calibrated list) is set only by V12's `reference`
run, and the code-read `FM` entries (the rich rows' `families`, `sunBias` 0.5) carry their `ref:… (code)` provenance and
move by no run; `sunBias`'s parity-neutral
entries under the zeroing presets `MFCG`, `FTG` and `VG` (0.5, where the zeroing would give 0) are `own` with the note
`fixed: the parity neutral` (V11 §2.2's rule (a)) and move by no run either. Each column family's metric,
method, due milestone and fallback are V02 §3.10.10's line. Readers: S11 (the massing), the composer, the designation mutator, the roofscape, §8.10's roof
detail.""",
"""One versioned table file, read through the override layer (§7.6); every cell `{value, unit, provenance, calibratable,
extension?, presets?}`. Every calibratable cell has its calibration register entry (V12 §3.11's rule), written by the seat
landing the milestone that ships the cell — M3a-V2, M6a, M6b or M6c (V02 §8.3, §8.5) — from the line of V02 §3.10.10 that
names its metric, method, due milestone and fallback; `plat calibrate register --check` (T-V12-20) is green over them at
that exit. A `presets.FM` measured-rate entry (V02 §3.10.8) is set only by V12's `reference` run; the code-read `FM`
entries (the rich rows' `families`, `sunBias` 0.5) and `sunBias`'s parity-neutral entries under `MFCG`, `FTG` and `VG`
(0.5, `own`, note `fixed: the parity neutral`, V11 §2.2's rule (a)) move by no run. Readers: S11 (the massing), the
composer, the designation mutator, the roofscape, §8.10's roof detail."""),
("""`default.<arrangement>` or `outbuilding`; `@underground` suffixed rows exist per prefix (V02 §3.10.6)""",
"""`default.<arrangement>` or `outbuilding`; `@underground` and `@deck` suffixed rows exist per prefix (V02 §3.10.6, §3.16)"""),
("""  claimShare?: [number, number];     // second revision (V2C-49 (3)): present → M10's band""","""  claimShare?: [number, number];     // present → M10's band"""),
("""  caveaM?: [number, number];         // second revision: `ovalCourt` only""","""  caveaM?: [number, number];         // `ovalCourt` only"""),
("""the one source of their keys (J-V7.82); `scope` withdrawn by reconciliation round 2 (J-V2.96)""",
"""the one source of their keys (V07 cites it); keyed by the `v.` key (J-V2.96)"""),
("""// HeightsRow: V11's (V11 §2.8, table 'heights', keyed by template family), read unchanged, with the three columns item 427 adds — attic: boolean, parapetCm: Cm, towerStoreyCm?: Cm — whose values V11 §3.6.4 writes once; V02 §3.10.6 states only their reading rule. This volume declares no heights row of its own (J-V2.33).""",
"""// HeightsRow: V11's (V11 §2.8, table 'heights', keyed by template family, with item 427's columns attic, parapetCm, towerStoreyCm; values V11 §3.6.4's); V02 §3.10.6 states only their reading rule. This volume declares no heights row (J-V2.33)."""),
]
