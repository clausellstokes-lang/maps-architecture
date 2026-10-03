from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))
r("""| nuisance | water | `upstream` with `to` `emit:water:L` — BCR-V11-16's relative form: the nearest emitter on the plot's own drainage network within the radius, neutral 0.5 when none lies on it (reciprocal: the emitter `downstream` with `to` `sens:water`, share 0.7) |""",
  """| nuisance | water | `upstream` with `to` `emit:water:L` — the relative form of §4.7 S10b (item 437): the nearest emitter on the plot's own drainage network within the radius, neutral 0.5 when none lies on it (reciprocal: the emitter `downstream` with `to` `sens:water`, share 0.7) |""")
r("""| alignment | sacred | profane (−1) `far` → `align:sacred+`; sacred `near` → `align:sacred+` — the one way holy places push the profane (no `sacred` nuisance, V11C-22) |""",
  """| alignment | sacred | profane (−1) `far` → `align:sacred+`; sacred `near` → `align:sacred+` — the one way holy places push the profane (no `sacred` nuisance, V11 §2.3) |""")
r("""| coverage | * | `coverage` (BCR-V11-2): satisfaction `clamp(2 − n ÷ target, 0, 1)` over the plot's unit (V11 §2.3's units at a plot: district, walk disc, households disc, parish cell, settlement) |""",
  """| coverage | * | `coverage` (§10.2's kind, item 433): satisfaction over the plot's unit as V11 §2.3 states it |""")
r("""* cell size (V11C-17): a raster is built at the fields' 32 m cell""", """* cell size: a raster is built at the fields' 32 m cell""")
r("""**3.3.5 Item 102's cells.** `prosperity.drivers` gains the row `sun` (id `drv/sun`): kernel `−shade(x)` (item 102
(a)), weight `w_sun` 0.02 — about a tenth of a band's width at full all-day shade (the default band set's six bands span
[0, 1] with a mean width ≈ 0.17); `own`, `extension`, calibratable — sampled at nine path-sun positions at the equinox
(`sun.samples` 9). Because the bands' value widths are cut per town by land shares and the thinnest bands can be
narrower than the mean, the guard is a bar, not an argument: T-V11-30 compares `w_sun` 0.02 with 0 under common random
numbers on B-CITY and requires that the term alone move no plot across two bands; *pre-decided fallback* on a failure:
halve `w_sun` once (0.01), then set it to 0.005 and re-run. `roster.classMix` gains the prestige key `sun` in
`ClassMixRow.prestige`'s units (beside the frontage, square and park keys, §4.7's prestige rows), weight 0.15 at full
daylight share, read by §4.7 S10b's prime-frontage draw (item 102 (d)'s preference among equal prime frontages; `own`,
`extension`). The mechanism is the base's (g item 102); these are its rows.""",
"""**3.3.5 Item 102's cells.** `prosperity.drivers` holds the row `sun` (id `drv/sun`): kernel `−shade(x)` (item 102
(a)), weight `w_sun` 0.02 — about a tenth of a band's width at full all-day shade (the default band set's six bands span
[0, 1] with a mean width ≈ 0.17); `own`, `extension`, calibratable — sampled at nine path-sun positions at the equinox
(`sun.samples` 9). Item 111 (c) multiplies the term by the climate row's `sunlight` cell (V11 §3.17.1: 1 in temperate and
cold rows, item 102 as filed). Because the bands' value widths are cut per town by land shares and the thinnest bands can
be narrower than the mean, the guard is a bar, not an argument: T-V11-30 compares `w_sun` 0.02 with 0 under common random
numbers on B-CITY and requires that the term alone move no plot across two bands; *pre-decided fallback* on a failure:
halve `w_sun` once (0.01), then set it to 0.005 and re-run. The class mix's sunlit prestige term `ClassMixRow.sun` (item
102 (d)'s preference among equal prime frontages, read by §4.7 S10b's prime-frontage draw × the climate row's
`sunlight`) is a cell of `roster.classMix`, whose rows home is §10.2 (registry row 27), stated there. The mechanism is the
base's (item 102); these are its rows.""")
r("""(`civic`, `defence`, `entertainment`, and the shared keys); a class names one family and states only its deltas (V11
§3.5); item 104's resolver adds tag deltas on top (V11 §3.13.2).""", """(`civic`, `defence`, `entertainment`, and the shared keys); a class names one family and states only its deltas (V11
§3.5); item 104's resolver adds tag deltas on top (V11 §3.13.1).""")
r("""nuisance and siting cells (g item 104 (f)); `extension: true` throughout (these profiles feed only the families).""",
  """nuisance and siting cells (item 104 (f)); `extension: true` throughout (these profiles feed only the families).""")
r("""only for a non-alias family: `civic` resolves to `generic-civic-authority` and `defence` to `generic-garrison`, which
V08's `categories` rows cite (V11C-26). The table holds 45 profile families""", """only for a non-alias family: `civic` resolves to `generic-civic-authority` and `defence` to `generic-garrison`, which
V08's `categories` rows cite. The table holds 45 profile families""")
r("""**Display words** (BCR-V9-8; reconciliation round 6, SR5-03; J-V11.93, J-V11.95). Each non-alias family row carries a""",
  """**Display words** (J-V11.93, J-V11.95). Each non-alias family row carries a""")
r("""classes compile (V11 §2.3); the 45 `icon` cells are written in the change that draws the 45 glyphs into the sprite, by
that change's seat (X-V11-17), and until then no family states one and the palette's groups show their label alone; an alias row (`civic`, `defence`) has neither and resolves to its target's.""",
  """classes compile (V11 §2.3); the 45 `icon` cells are written in the change that draws the 45 glyphs into V09 §5.1's
sprite, by that change's seat, and until then no family states one and the palette's groups show their label alone; an
alias row (`civic`, `defence`) has neither and resolves to its target's.""")
build('09-s3-3', [(1106, 1290)], R)
