from helper import build, src
from sanitize import sanitize
import sys
text = src(4127, 4186)
R = []
def r(a, b, c=1): R.append((a, b, c))

# T-V11-1 (a): name maps (span cells now `span.*`), new rows 92, 93
r("""and V01's `way.surface` and `squares.quota`, SCC-R3C-4, and the prose keys of V11 §3.24.2's and §3.24.1's name maps — V04's span-rule constants `raised.vaultShare`, `raised.vault.maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `raised.vaultCap`, `raised.deckDepthCm`, `raised.supportFoundationCm`, file f item 244's slide bound and `retaining.stateSnapCm`, each resolving to a live calibratable column of row 80's `structure` or row 79's `settings`, SCC-104) and every entry has its file;""",
  """and V01's `way.surface` and `squares.quota`, the `history` table and the base settings row (rows 92, 93), and the prose names `raised.vaultShare`, `raised.vault.maxHeightCm`, `raised.vaultCap`, `raised.deckDepthCm`, `raised.supportFoundationCm` and `retaining.stateSnapCm`, each resolving to a live calibratable cell of row 80's `structure.span` or row 79's `settings` (V11 §3.24.1, §3.24.2)) and every entry has its file;""")
# T-V11-3: coverage ranges (EDGE-2), reference cells (E-30)
r("""every `ref` column resolves;""", """every `ref` column and every reference cell `{ ref: { table, row, cell } }` resolves to a live cell of the same unit (V11 §3.2.1 step 4); every `CoverageSpec` `per` and `target` inside its range, a `walk` unit's `per` at least 10 (V11 §2.3);""")
# T-V11-4: commonness on v. rows (MISSING-5); glyphs
r("""a `commonness` in [0, 1] — on a town-and-city row compiled, never stated in its source, and equal to V11 §3.5.1's rule recomputed (V07's T-V7-56 recomputes the `v.` rows'), 0 on a generic row — and an `icon`, where compiled, that is a V9 §5.1 sprite id;""",
  """a `commonness` in [0, 1] — on a town-and-city or `v.` row compiled, never stated in its source, and equal to its rule recomputed (V11 §3.5.1; a `v.` row's by V07 §2.4's rule), 0 on a generic row — and an `icon`, where compiled, that is a V09 §5.1 sprite id;""")
r("""the non-alias families' labels unique and, from the change that ships the glyphs (X-V11-17), each with its `fam.<key>` icon |""",
  """the non-alias families' labels unique, each with its `fam.<key>` icon (V09 §5.1's sprite) |""")
r("""(§17.1 (6) as BCR-V11-21 extends it)""", """(§17.1 (6) as item 534 extends it)""")
# T-V11-32 (b) span cap, (h) beyond 1.5x
r("""(b) `raisedWays` holds exactly the six CITY and METROPOLIS rows and its key admits no other rung;""",
  """(b) `raisedWays` holds exactly the six CITY and METROPOLIS rows and its key admits no other rung, and `span.vaultCap` holds a value for every rung, non-decreasing with the rung;""")
r("""(g) `deck` holds the sixteen kind × band rows | 100 % |""",
  """(g) `deck` holds the sixteen kind × band rows; (h) on the terrace fixtures a cart crossing whose step needs more than 1.5 × `rampMaxGrade` lowers the wall's step there (`W_STEP_LOWERED`, V11 §3.24.5) — never a stair, never a gap | 100 % |""")
# T-V11-37: switch list
r("""no switch cell — `siting.web.orientEnabled`, `siting.web.splitEnabled`, `terrace.enabled` — is calibratable (SCC-67) | 100 % |""",
  """no switch cell — `siting.web.orientEnabled`, `siting.web.splitEnabled`, `terrace.enabled`, `history.settings.replay` — is calibratable | 100 % |
| T-V11-38 | item 111's rows: (a) every climate row's dry-country cells inside their ranges (V11 §3.17.1), `w_water` below 1, the `grove` shares summing to 1, a non-arid row's oasis cells at their neutral values; (b) the `garden` land-use row present with its role key and among `herbs`' providers, and the water table's `wellYield` and `geologyYield` values in [0, 1] with `topYield` in their span (V11 §3.24.6); (c) item 111's off form (V11 §3.24.0) in range and equal to the parity presets' resolution, and with it applied the generated documents byte-identical to the base without item 111 — the `NoOpPin` T111-5, 200 B-CITY seeds per rung | 100 %; identical |
| T-V11-39 | item 113's rows: (a) every family of V08's history reading has its `*` row, template words are unique, every effect valid — a `hazard` a V06 `HazardRow` kind, a `condition` a `ConditionOverlay` archetype, a `request` class a `roster.classes` row — and every value in its range (V11 §3.25.3); (b) the settings in range, `burialBoundsYears` low ≤ `burialYears` ≤ high, `defaultAgeYears` set at all six rungs; (c) with `replay` false, byte-identical to the base without item 113 — the `NoOpPin` T113-7, on the H-HISTORY fixtures and 200 B-CITY seeds | 100 %; identical |""")
# 7.2 intro
r("""that keeps each class's count and district allocation; every bar a correlation, never a guarantee — g items 103 (e),""",
  """that keeps each class's count and district allocation; every bar a correlation, never a guarantee — items 103 (e),""")
r("""| T-V11-19 | walls: the barrier fixtures of g item 106 (h)""", """| T-V11-19 | walls: the barrier fixtures of item 106 (h)""")
r("""(§12.4's rows as BCR-V11-22 restates them)""", """(§12.4's rows as item 477 restates them)""")
r("""every item-109 chance 0, and the five item-110 switches off (V11 §3.24.0);""",
  """every item-109 chance 0, the five item-110 switches off, item 111's cells at their off form and `history.replay` false (V11 §3.24.0);""")
r("""(`outputs`, mapping.md row 44's lists)""", """(`outputs` and the dossier's goods lists)""")
r("""byte-identical to the pre-110 goldens;""", """byte-identical to the goldens without item 110;""")
r("""(the per-use rule, SCC-13)""", """(the per-use rule, V11 §3.24.4)""")
r("""| T-V11-36 | specialisations: a `mesoamerican` culture fixture yields a stepped temple; a Western fixture yields none; stepped buildings never exceed the cap; a declared specialisation is held through a regeneration | holds |""",
  """| T-V11-36 | specialisations: a `mesoamerican` culture fixture yields a stepped temple; a Western fixture yields none; stepped buildings never exceed the cap; a declared specialisation is held through a regeneration | holds |
| T-V11-40 | edges and combinations (V11 §3.26): one fixture per row of its two tables at the row's rungs, built by §13.2's edge-suite builder (B-EDGE) — (a) each mechanism row's outcome and failure rung; (b) each combination row's outcome; (c) V01's unit run reading the same rows as the stages it runs | 0 violations |""")

for old, new, c in R:
    n = text.count(old)
    if n != c:
        print('COUNT', n, '!=', c, old[:150]); sys.exit(1)
    text = text.replace(old, new)
text = sanitize(text)
build('20-s7', None, [], mid=text)
