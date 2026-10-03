from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

# header and intro
r("""### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks (owner ~23:30 "they go in"; (b) as revised ~23:40)

File g item 110's base mechanisms are applied to the base by the coherence pass: the `RetainingWall` line record and the""",
  """### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks (the owner's "they go in")

Item 110's mechanisms are the base's (items 244–246): the `RetainingWall` line record and the""")

# 3.24.0 switches + owner items' off forms (E-20)
r("""**3.24.0 The switches** (V11C-41; J-V11.49). One switch per row set, which is also that table's parity-neutral default
when a document's pinned set lacks it (J-V11.12) and the value the MFCG, FTG and VG presets resolve; every off form is a
cell value in its column's range, so a no-op pin's overlay can write it (V12 §2.13, J-V12.43; SCC-25):""",
  """**3.24.0 The switches and the owner items' off forms** (J-V11.49; E-20). One switch per row set, which is also that
table's parity-neutral default when a document's pinned set lacks it (J-V11.12) and the value the MFCG, FTG and VG presets
resolve; every off form is a cell value in its column's range, so a no-op pin's overlay can write it (V12 §2.13,
J-V12.43):""")
r("""| `deck` | every `offer` 0 | no deck offers a plot, so V02's deck budget is never read and V02's fallback constants never apply (X-V11-7) |""",
  """| `deck` | every `offer` 0 | no deck offers a plot, so V02's deck budget is never read and V02's fallback constants never apply |""")
r("""With all five off, the generated documents are byte-identical to the pre-110 goldens (T-V11-31, the no-op pin every lane's
item-110 pin cites: V02's T-V2-50, V06's T-V6-65, V07's pins). The chance and offer cells resolve 0 by §7.6's zeroing with
no entry; `terrace.enabled`, a switch, carries explicit `presets.MFCG`, `.FTG` and `.VG` entries false (V11 §2.2's preset
entries; SCC-51). **`presets.FM`** (V02's building-scope preset) resolves
the stepped and deck families off — every `roster.specialisations` `chance` 0, every `deck.offer` 0 and every
`deck.landmarks` chance 0, carried as `presets.FM` entries 0 on exactly those cells (V11 §2.2; file f item 376's scope;
landing with V02's M6c, V11 §8; SCC-51) — so the FM goldens stay byte-identical at every switch-on bump (V12 §3.4.4, J-V12.54, X-V12-9;
SCC-09).""",
  """With all five off, the generated documents are byte-identical to the goldens without item 110 (T-V11-31, the no-op pin
every volume's item-110 pin cites: V02's T-V2-50, V06's T-V6-65, V07's village pin). The chance and offer cells resolve 0
by §7.6's zeroing with no entry; `terrace.enabled`, a switch, carries explicit `presets.MFCG`, `.FTG` and `.VG` entries
false (V11 §2.2's preset entries). **`presets.FM`** (V02's building-scope preset) resolves the stepped and deck families
off — every `roster.specialisations` `chance` 0, every `deck.offer` 0 and every `deck.landmarks` chance 0, carried as
`presets.FM` entries 0 on exactly those cells (V11 §2.2; item 376's scope; landing with V02's M6c, V11 §8) — so the FM
goldens stay byte-identical at every switch-on bump (V12 §3.4.4, J-V12.54).

**The owner items' off forms.** §13.2's convention (5) makes every owner item's no-op pin a `NoOpPin` on V12 §3.7.8's
engine; the cells it writes are these, each in its column's range and, save `history.replay`, equal to what the `MFCG`,
`FTG` and `VG` presets resolve (T-V11-21):

| item | off form | pin (base bar · this volume) |
|---|---|---|
| 102 | `prosperity.drivers` `w_sun` 0; every climate row's `sunlight` 1 | T102-1 · T-V11-30 (the guard against the term's default) |
| 103 | the `coverage` family's weight 0; `coverage.rosterWeight` 0 | T103-3 · T-V11-13 |
| 105 and 107 | the web's off form `web.off` (V11 §3.7.4), which zeroes every good's `comfortM` | T105-4, T107-4 · T-V11-21 |
| 106 | the barrier closure and the stretch profile off (§4.8's switches; this volume's `walls.barriers` rows then unread) | T106-5 · T-V11-19 |
| 109 | every `RuinRule.chance` 0; the relief, boost and fissure rows at the base's values without item 109 (V11 §3.23.9) | T109-6 · V04's bars |
| 110 | the five switches above | T110-7 · T-V11-31 |
| 111 | every climate row's `aridChance` 1 · 1 · 1, `oasisChance` 0, `w_water` 0, `w_waterP` 0, `sunlight` 1, `wellYieldWeight` 0, `wellCoverageFactor` 1 (V11 §3.17.1) | T111-5 · T-V11-38 (c) |
| 113 | `history.settings.replay` false (V11 §3.25.1); the parity presets resolve it false too | T113-7 · T-V11-39 (c) |

A pin's overlay writes these cells as `{ ref, value }` pairs (V12 §2.13); no other cell differs between a pin's two arms.""")

# 3.24.1 terraces
r("""**3.24.1 Terraces and retaining walls** (item 110 (a); V11C-33, V11C-49). *`terrace`* (registry row 78; the three rows
equal at first; J-V11.40):""", """**3.24.1 Terraces and retaining walls** (item 110 (a)). *`terrace`* (registry row 78; the three rows equal;
J-V11.40):""")
r("""calibration run can name it (V12 §3.7.2 rule (1)); the terrace family's realism is confirmed through its thresholds'
register line and M4-110's panel, never by moving the switch (reconciliation round 3, SCC-67; J-V11.75).
The last three columns are V09 §4.20.1 (3)'s flat-ground bends of a drawn retaining stroke (IN-V11-2, XV-V9-13; own,
calibrate-later at M3a; SCC-19): their only reader is that bend, which never refuses on the ground's account.""",
  """calibration run can name it (V12 §3.7.2 rule (1)); the terrace family's realism is confirmed through its thresholds'
register line and the M4 panel's M4-110 group, never by moving the switch (J-V11.75). The last three columns are V09
§4.20.1 (3)'s flat-ground bends of a drawn retaining stroke (own; written at M3a, calibrated by V12 §3.11's terrace
line): their only reader is that bend, which never refuses on the ground's account.""")
r("""* **Units.** `slopeMin` is a share (rise ÷ run); V01's slope in percent is 100 × share, so critique-V1 I110-3's stepped
  fabric band "between slopeMeanPct 8 and terrace.slopeMin" reads 8 % to 15 % (X-V11-8).""",
  """* **Units.** `slopeMin` is a share (rise ÷ run); V01's slope in percent is 100 × share, so V01 §3.3's stepped fabric
  band "between slopeMeanPct 8 and terrace.slopeMin" reads 8 % to 15 %.""")
r("""* **The relief column** (`s0.features`' relief rows, registry row 9; BCR-V11-28):""",
  """* **The relief column** (`s0.features`' relief rows, registry row 9; item 289):""")
r("""The three new wall materials take §8.2 roles by BCR-V11-30.""", """Item 110's three wall materials take §8.2 roles (item 412).""")
r("""*`retaining.settings`* (the table's named row, V11 §2.1's settings form; reconciliation round 6, SCC-104; J-V11.96):
`stateSnapCm` — file f item 245's state-profile snap, which it names `retaining.stateSnapCm` (this cell's prose name in
T-V11-1 (a)'s name map), its value stated once there; `own`, calibrate-later, `extension`,
`calibratable: true`, its register entry V12's `retaining` line until V12 gives it the line X-V11-17 (f) proposes (J-RF2.4
names the confirming measurement, T-V6-62's H-TERRACE century, and the pre-decided fallback, the wall's own `stepProfile`
sample spacing as the tolerance). Its one
reader is the re-derivation""",
  """*`retaining.settings`* (the table's named row, V11 §2.1's settings form; J-V11.96): **`stateSnapCm` 100 cm** — item 245's
state-profile snap: a state knot whose vertex is gone is re-placed on the new chain within this distance of its old
point, else dropped (§2.2's chain profiles; prose name `retaining.stateSnapCm`); `own`, `extension`, `calibratable: true`,
written at M3a with its entry on V12 §3.11's default line, restated in place by V06 §8's line from V6-E2 on
`bar.T-V6-62` (J-RF2.4: the confirming measurement is T-V6-62's H-TERRACE century; the pre-decided fallback, the wall's
own `stepProfile` sample spacing as the tolerance). Its one reader is the re-derivation""")
r("""a `rebuild` running S11, V6 §3.19.4 (1), (6)), each under S10's or S11's id; a `repairRetaining`, the landfall's write
and a cut or join by `rekey` (file f item 245) move no knot by it.""",
  """a `rebuild` running S11, V06 §3.19.4 (1), (6)), each under S10's or S11's id; a `repairRetaining`, the landfall's write
and a cut or join by `rekey` (item 245) move no knot by it.""")

# 3.24.2 raised ways
r("""**3.24.2 Raised ways** (item 110 (b) as revised ~23:40: "at CITY and METROPOLIS the generator raises a way where there is a
reason, each a soft rule with a table chance and a count cap per rung", "A TOWN gets them only by declaration"; V11C-34,
V11C-37, V11C-40, V11C-45; J-V11.41). *`raisedWays`* (registry row 80; readers: the base's generator — S4's route solve,
at generation and in each later stage's S5b (SCC-96), and S6's end —, V06 §3.19's epoch""",
  """**3.24.2 Raised ways** (item 110 (b): "at CITY and METROPOLIS the generator raises a way where there is a reason, each a
soft rule with a table chance and a count cap per rung", "A TOWN gets them only by declaration"; J-V11.41).
*`raisedWays`* (registry row 80; readers: the base's generator — S4's route solve, at generation and in each later
stage's S5b, and S6's end —, V06 §3.19's epoch""")
r("""  101 R2, R13). It is not a register cell (V12's 23:27 note (4)).""",
  """  101 R2, R13). It is not a register cell. The compiler stamps it `ownerRule: '110 (b)'` (V11 §3.2.1 step 4); the CITY
  and METROPOLIS columns carry the calibration minima 0.02 (`chance`) and 1 (`cap`), binding calibration runs, fallbacks
  and corpus packs only — never a pin, a parity preset's zero or a user's edit (J-VI.10).""")
r("""`elevated.landmarkFactor` 1.5 per dossier landmark on high ground at an end (the records DR-V8.8 lists, counted by V11
  §3.24.7 (4)), `landmarkMax` 2;""", """`elevated.landmarkFactor` 1.5 per dossier landmark on high ground at an end (the records DR35 lists, counted by V11
  §3.24.7 (4)), `landmarkMax` 2;""")
r("""calibratable, its entry V12 §3.11's `raisedWays` settings line; reconciliation round 3's continuation, SCC-R2C-10);""",
  """calibratable, its entry V12 §3.11's `raisedWays` settings line);""")
r("""chance by the dossier's water record (J-V8.67; SS-13):""", """chance by the dossier's water record (J-V8.67):""")
r("""* **`raisedWays.structure`** (the heights V05's caster ceiling and V04's vaults read, V5 §13 item 13):""",
  """* **`raisedWays.structure`** (the heights V05's caster ceiling and V04's vaults read):""")
r("""ramps, the aqueduct's gradient line from its intake); these cells bound it, never set it.""",
  """ramps, the aqueduct's gradient line from its intake); these cells bound it, never set it. `pierSpacingM`,
  `pierWidthShare` and `pierMinCm` are read by item 244's support step (§2.7: the piers' pitch and footprint),
  `clearanceCm` by its clearance rule, and `maxPierM` drops a generated course there (`raised_too_tall`).""")
r("""* **The span rule's cells** (`raisedWays.structure.span` and `.slideMaxFactor`; reconciliation round 6, SCC-104;
  J-V11.96). V04 BCR-45's span-rule constants are cells of this row under these names: `raised.vaultShare[kind]` =
  `span.vaultShare[kind]`, `raised.vault.maxHeightCm` = `span.maxHeightCm`, `minHeadroomCm` = `span.minHeadroomCm`,
  `maxFallCm` = `span.maxFallCm`, `raised.vaultCap[rung]` = `span.vaultCap[rung]` (all six rungs, the village rungs
  included — a declared raised way stands at any rung; a field of the named row, so the rung gate of the keyed rows is
  untouched), `raised.deckDepthCm` = `span.deckDepthCm`, `raised.supportFoundationCm` = `span.supportFoundationCm`; file f
  item 244's support-step slide bound is `slideMaxFactor`. Their values are stated once, in V04 §10 BCR-45 and file f item
  244, and written into this row's source by the seat landing BCR-45 at M3a (V4 §8); each is `own`, calibrate-later,
  `extension` and `calibratable: true`, its register entry V12's span-rule line (the `span` block, owner V04) or the
  `raisedWays.structure` line (`slideMaxFactor`). The span rule scales `span.vaultShare` by `era.raisedVaultM ×
  culture.raisedVaultM` (X-V11-10; C4-110-1). Readers:""",
  """* **The span rule's cells** (`raisedWays.structure.span` and `.slideMaxFactor`; J-V11.96), read by §2.7's support step
  and span rule (item 244), their values stated here once: `span.vaultShare` viaduct 0.6, elevated 0.7, aqueduct 0.15
  (scaled by `era.raisedVaultM` × `culture.raisedVaultM`, capped at 1); `span.maxHeightCm` 900; `span.minHeadroomCm` 250;
  `span.maxFallCm` 150; `span.vaultCap` THORP, HAMLET and VILLAGE 10 each, TOWN 40, CITY 120, METROPOLIS 240 (all six
  rungs — a declared raised way stands at any rung; a field of the named row, so the keyed rows' rung gate is untouched);
  `span.deckDepthCm` 150; `span.supportFoundationCm` 400 (each pier's depth below the levelled ground); `slideMaxFactor`
  1.5 (a sliding station keeps both neighbouring spans within this × the pitch band's upper bound). Each is `own`,
  general (arcades walled into vaults where the ground under them was built on), `extension`, `calibratable: true`,
  written at M3a, its register entry V12 §3.11's span-rule line (owner V04) or the `raisedWays.structure` line
  (`slideMaxFactor`). A prose name `raised.vaultShare`, `raised.vault.maxHeightCm`, `raised.vaultCap`,
  `raised.deckDepthCm` or `raised.supportFoundationCm` resolves to these cells (T-V11-1 (a)). Readers:""")
r("""  arch vaults (U-SYS, U-FADE). The name map is T-V11-1 (a)'s list.""", """  arch vaults (U-SYS, U-FADE).""")
r("""`basin` is a model pin, one centrepiece per square (critique-V1 I110R-8);""",
  """`basin` is a model pin, one centrepiece per square;""")
r("""`conduit_house` forces `cistern`. V04's terminal cistern (V4 §3.5.4 (e)) lies under that building's yard.""",
  """`conduit_house` forces `cistern`. V04's terminal cistern (V04 §3.5.4 (e)) lies under that building's yard.""")

# 3.24.3 stepped
r("""(volume 11)"; V11C-35; J-V11.42, J-V11.43).""", """(volume 11)"; J-V11.42, J-V11.43).""")
r("""* **The draw and the cap** (BCR-V11-27; X-V11-5 to V02).""", """* **The draw and the cap** (item 259).""")
r("""* **The carriers** (V03's keys, V3C-69):""", """* **The carriers** (V03's keys):""")
r("""* **At village rungs** (SS-31) a row applies""", """* **At village rungs** a row applies""")
r("""* **The dossier trace.** `site.culture` → these rows (critique-V8 C8-44 (1)); the port""", """* **The dossier trace.** `site.culture` → these rows; the port""")

# 3.24.4 decks
r("""(small, light, a table row), towers and forts at mole heads and mid-mole as placed landmarks"; V11C-36, V11C-38;
J-V11.44, J-V11.46).""", """(small, light, a table row), towers and forts at mole heads and mid-mole as placed landmarks"; J-V11.44, J-V11.46).""")
r("""*`deckOk`* (a compiled column of `roster.classes`, step 5a; BCR-V11-1 amended; listed in the manifest; a class row may
override).""", """*`deckOk`* (a compiled column of `roster.classes`, step 5a; item 432; listed in the manifest; a class row may
override).""")
r("""`toll_house` `[bridge]` (a bridge gatehouse, critique-V8 C8-45 (2));""", """`toll_house` `[bridge]` (a bridge gatehouse);""")
r("""or whose profile emits `fire` ≥ 2 carries a deck kind (V02 X16; J-V2.68). **Per use** (SCC-13; V02 X16, §3.16 (6)): S10b""",
  """or whose profile emits `fire` ≥ 2 carries a deck kind (J-V2.68). **Per use** (V02 §3.16 (6)): S10b""")
r("""a dossier crypt record bound
to it, V08 DR-V8.4,""", """a dossier crypt record bound
to it, DR32,""")
r("""| `bridgeMid` (span ≥ `minSpanM` 40 m, V09's BCR-V9-30 slot; the constant moves here) |""",
  """| `bridgeMid` (span ≥ `minSpanM` 40 m — the one cell V09's bridge mid-span slot reads) |""")

# 3.24.5 crossing (EDGE-1)
r("""ends are ramps or stairs joined to ground vertices"; V11C-39; J-V11.47).""", """ends are ramps or stairs joined to ground vertices"; J-V11.47).""")
r("""ways' ends (S4's and each later stage's S5b's viaducts, S6's end and V6 §3.19's pass), V09's T4 ghosts):""",
  """ways' ends (S4's and each later stage's S5b's viaducts, S6's end and V06 §3.19's pass), V09's T4 ghosts):""")
r("""* **The pre-decided failure for a cart class.** The ramp takes up to 1.5 × `rampMaxGrade`, reported `W_STEEP_RAMP` — never a
  stair and never a gap in the wall (the owner's words).""",
  """* **The pre-decided failure for a cart class.** The ramp takes up to 1.5 × `rampMaxGrade`, reported `W_STEEP_RAMP` — never a
  stair and never a gap in the wall (the owner's words). **Beyond 1.5 ×** the levelling lowers the wall's step where the
  way crosses: S10 re-grades the high side's terrace inside the way's corridor (and the wall's face within half a corridor
  width of it) so that the step there is 1.5 × `rampMaxGrade` × the run available, the wall keeping its line, its height
  elsewhere and its continuity; reported `W_STEP_LOWERED` with the way and the wall (a bend, never a refusal: both stand).
  T-V11-32 (g) holds it.""")

# 3.24.6 water (item 111 well yields)
r("""(item 110 (b): "where the city's water need exceeds what its wells, river and cisterns supply
inside the walls"; V11C-37; J-V11.45).""", """(item 110 (b): "where the city's water need exceeds what its wells, river and cisterns supply
inside the walls"; J-V11.45).""")
r("""decided before any well, cistern or household is placed (critique-V4 C4-110-6):""", """decided before any well, cistern or household is placed:""")
r("""  of dry climates); `rainMm` the climate row's `rainMmPerYear` (V11 §3.17.1).""",
  """  of dry climates); `rainMm` the climate row's `rainMmPerYear` (V11 §3.17.1).
* **Well yield by ground** (item 111 (b); the `wellYield` raster S1 (10) writes, §4.2): `wellYield` alluvial 1.0, gravel (a
  dry riverbed's) 0.9, lowGround (by the water table) 0.7, default 0.4, rock 0.1, × `geologyYield` ordinary 1, soluble 0.8,
  volcanic 0.6; `topYield` 0.7 — ground at or above it is "the top well-yield class" that S3's water pull and the
  prosperity water term read as reliable water (§4.2 S3 (6), §4.5). S10b's wells and public fountains read the raster
  through the climate row's `wellYieldWeight` (V11 §3.17.1), and V06's failing springs read it over epochs. Own, general
  (wells sunk in alluvium and riverbed gravels, scarce on rock); calibratable, provisional, V12 §3.11's register.""")
r("""* **Worked check (PLAUSIBLE, to be measured).**""", """* **Worked check (PLAUSIBLE; T-V11-33 measures it).**""")

# 3.24.7 dossier reach (IN-V11-5)
r("""**3.24.7 The dossier's reach into item 110** (items 20, 20 (h); V11C-40; J-V11.48):""",
  """**3.24.7 The dossier's reach into item 110** (items 20, 20 (h); J-V11.48):""")
r("""with no aqueduct and pull every conduit house to one point): the aqueduct's generator (the base, per g) writes ONE §7.7""",
  """with no aqueduct and pull every conduit house to one point): the aqueduct's generator (the base's, item 244) writes ONE §7.7""")
r("""`conduit_house` roster member — the dossier-bound one when a record binds one (critique-V8 C8-41 (c)), else the first""",
  """`conduit_house` roster member — the dossier-bound one when a record binds one, else the first""")
r("""BCR-V11-29 adds the generator
   as a writer of `PlacementCriteria` for this row only. Every other conduit house keeps its class row. V08's X5 ("the
   class row gains the hard terminal row") is superseded by this row, for the three reasons above.""",
  """Item 401 makes the generator a
   writer of `PlacementCriteria` for this row only. The row is written only on a `conduit_house` the roster or the
   dossier holds; otherwise the terminal is a fountain pin (J-VI.9). Every other conduit house keeps its class row, and no
   class row carries a hard terminal row.""")
r("""`dossier.kinds` gains the optional cell `implies` (V08's shape, C8-45 (1));""", """`dossier.kinds` carries the optional cell `implies` (V08 §2.6's shape);""")
r("""(a) the need test counts as met (critique-V8 C8-41 (b));""", """(a) the need test counts as met;""")
r("""constant (J-V8.67; SS-13, which withdraws critique-V6 C6-47's factor);""", """constant (J-V8.67);""")
r("""by `capPerSizeMember` (C8-41 (d));""", """by `capPerSizeMember`;""")
r("""**Landmarks on high ground.** The records that count are DR-V8.8's (critique-V8 C8-43 (2)):""",
  """**Landmarks on high ground.** The records that count are DR35's:""")
r("""(20, the castle's; V11 §3.24.2;
   SCC-R2C-10)""", """(20, the castle's; V11 §3.24.2)""")
r("""landmark strings never count (C8-43 (1)).""", """landmark strings never count.""")

build('16-s3-24', [(3678, 3997)], R)
