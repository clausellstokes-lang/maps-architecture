from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

r("""### 3.23 The underground's content rows (item 109; the catacombs as revised ~20:05, J111)""",
  """### 3.23 The underground's content rows (item 109; the catacombs by J111)""")
r("""`CatacombRule`) and V04's stages read them (V11 §2.8b); the ROWS below are written here once (the brief: "the
ancient-culture plan rows, the ruin persistence order, the cavern and ruin chance rows, the `ruin` naming slice", "the
catacomb count, growth-cap and dig-by-depth rows and the ancient-culture distinctness rows"). The geometric cells of
those tables (depths, burial by age, smoothing, clearances, frame shares, retries, forecast shares, layout rules, fade
weights, lights, overlap shafts) stay V04's rows and are cited, never restated. V04's defaults table carries the same
values as these rows until its next revision makes it cite them (X-V11-4). Every cell is `extension` and calibratable""",
  """`CatacombRule`) and V04's stages read them (V11 §2.8b); the ROWS below — the ancient-culture plan rows and their
distinctness, the ruin persistence order, the cavern and ruin chance rows, the void-source rank, the access gain over a
ruin, the dig and opening rows, the catacomb count, order, growth-cap rows (and the `ruin` naming slice, V11 §3.20.1) —
are written here once, and V04 §2.3 cites them. The geometric cells of those tables (depths, burial by age, smoothing,
clearances, frame shares, retries, forecast shares, layout rules, fade weights, lights, overlap shafts) are V04's rows,
cited, never restated. Every cell is `extension` and calibratable""")
r("""mine boost (1.4, capped at 0.9), the fissure variant's chance (0.15) and the breach reach (40 m) are file g's values,
applied to the base's S1 rows (registry row 9) and to `under.systems`' cavern row (registry row 59; V04's `params`
entries `mineBoost`, `mineCap`, `fissureChance`, `breachM`) by the coherence pass — cited here, never restated. This
volume writes the one row g leaves open: **`miningCellShare` 0.02** — the site "holds mining" when at least this share
of the frame's land cells carry `SiteResources.ore` ≥ 0.5 (besides a roster mining class or a dossier mining deposit, g
item 109 (a) (2)); own.""",
  """mine boost, the fissure variant's chance and the breach reach are item 109 (a)'s values in the base's S1 rows (registry
row 9; §4.2 S1 (10)) and in `under.systems`' cavern row (registry row 59; V04's `params` entries `mineBoost`, `mineCap`,
`fissureChance`, `breachM`), cited. This volume writes the one cell item 109 (a) leaves to it: **`miningCellShare`
0.02** — the site "holds mining" when at least this share of the frame's land cells carry `SiteResources.ore` ≥ 0.5
(besides a roster mining class or a dossier mining deposit, item 109 (a) (2)); own.""")
r("""`sharedAxisChance`; V4 §2.3), cited.""", """`sharedAxisChance`; V04 §2.3), cited.""")
r("""orthogonal colonial grids, processional temple axes, ringed citadels and terraced hill cities; calibrate-later):""",
  """orthogonal colonial grids, processional temple axes, ringed citadels and terraced hill cities; provisional, V12 §3.11's
register):""")
r("""The `monument` cell is the band index into V02's `stepped-monument` row and the chamber kinds that may host one (V04 §3.5.0a
(5a); C4-110-8; V11C-35 (5)); a grid culture raised none.""",
  """The `monument` cell is the band index into V02's `stepped-monument` row and the chamber kinds that may host one (V04
§3.5.0a (5a)); a grid culture raised none.""")
r("""is read as the TOWN'S FABRIC ABOVE THE RUIN — V01's `fabricSignature` under the ruin's outline (J-V11.30). The thresholds
are V12 §3.6b's (block-area ratio 1.5, grid order 0.15, axis 10°; §13.7 rows by BCR-V12-12), cited, never restated. Each""",
  """is read as the TOWN'S FABRIC ABOVE THE RUIN — V01's `fabricSignature` under the ruin's outline (J-V11.30). The thresholds
are V12 §3.6b's (its `paired` rows on §13.7), cited. Each""")
r("""**3.23.6 The void-source rank** (`RuinRule.sourceWeight`; item 109 (e): "a ruin ranks ABOVE caverns and quarries … a
built city is readier to live in"):""",
  """**3.23.6 The void-source rank** (`UndercityRule.sourceRank`, II.7.5 — the cell V04 §2.3 reads as
`RuinRule.sourceWeight`; item 109 (e): "a ruin ranks ABOVE caverns and quarries … a built city is readier to live in"):""")
r("""then; `planReachM` is V04's geometric cell.""", """then; `planReachM` is V04's geometric cell.""", 0)
r("""bar reads); `planReachM` is V04's geometric cell.""",
  """bar reads); `planReachM` is V04's geometric cell. **`under.rule`'s `access.ruinGain` 1.5** (item 109 (d): a basement over a
ruin chamber within its reach may hold an access, "its chance raised over a ruin"): II.7.3's basement-access probability
× 1.5 where the nearest underground element is a ruin's, still under the access row's `cap`; own, general.""")
r("""| `count` (`churchesPer`, `cap`) | —, 1 | 10, 3 | 8, 5 | g's values: one more complex per `churchesPer` churches, capped |
| `order` (V11 §2.8b's cell, X-V11-4) |""", """| `count` (`churchesPer`, `cap`) | —, 1 | 10, 3 | 8, 5 | item 109 (k)'s values: one more complex per `churchesPer` churches, capped |
| `order` (V04 §2.3's `CatacombRule.order`) |""")
r("""| `chance.quarryOssuary` | 0 | 0.3 | 0.3 | never at TOWN (g (k) (2)) |""", """| `chance.quarryOssuary` | 0 | 0.3 | 0.3 | never at TOWN (item 109 (k) (2)) |""")
r("""**3.23.8 Catacombs** (`CatacombRule`; item 109 (k) (1)–(6) as revised ~20:05: only under cemeteries""",
  """**3.23.8 Catacombs** (`CatacombRule`; item 109 (k) (1)–(6), J111: only under cemeteries""")
r("""`v.parish_church`; a collective record's members count once each (item 108 (c)), an island church once (C5-02 (3a)); a
`chapel` does not count. `ossuaryReachM` and the stagnation fill rule are V04's (V4 §3.5.1), cited.""",
  """`v.parish_church`; a collective record's members count once each (item 108 (c)), an island church once; a `chapel`
does not count. `ossuaryReachM` and the stagnation fill rule are V04's (V04 §3.5.1), cited.""")
r("""**3.23.9 Switches and the no-op pin.** With every ruin chance 0 and the cavern rows at the base's pre-g values (the parity
presets and a document whose pinned set lacks these tables), the underground is byte-identical to the base's (g item 109
(i)'s no-op pin; V04's T-V4 bars hold it); the catacomb rows' absent default is the base's TOWN-and-above rule as g applies
it (V11 §2.10).""",
  """**3.23.9 Switches and the no-op pin.** With every ruin chance 0 and the relief, boost and fissure rows at the base's
values without item 109 (the parity presets, and a document whose pinned set lacks these tables), the underground is
byte-identical to the base's (item 109 (i)'s no-op pin, T109-6; its off form V11 §3.24.0's row; V04's bars hold it);
the catacomb rows' absent default is the base's TOWN-and-above rule (II.7.6; V11 §2.10).""")

build('15-s3-23', [(3547, 3676)], R)
