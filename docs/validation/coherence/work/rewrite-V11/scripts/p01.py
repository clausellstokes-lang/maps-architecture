import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/01-s1.md')
e.R("""the retaining-wall profile, the raised ways' chances, caps, thresholds, structure heights and water balance, the culture
specialisations that build in tiers, the deck budget, the `deckOk` column and the landmark slots, the way-class crossing
rule, with the `fort`, `lighthouse` and `arena` rows they need (V11 §3.24); (d)""","""the retaining-wall profile, the raised ways' chances, caps, thresholds, structure heights and water balance, the culture
specialisations that build in tiers, the deck budget, the `deckOk` column and the landmark slots, the way-class crossing
rule, with the `fort`, `lighthouse` and `arena` rows they need (V11 §3.24), item 111's dry-country cells — the arid
water chances, the oasis, grove and garden rows, the water-pull weights and the sunlight cell per climate row, and the
well yield by ground (V11 §3.25) — and item 113's history rows — the replay's epoch length, the event-to-epoch rows, the
burial threshold and its factors, the symbolic peak's quantile and the old roads' reuse cost (V11 §3.26); (d)""")
e.R("""(V11 §4, V11 §7, V11 §8).""","""(V11 §4, V11 §7, V11 §8); (f) every edge of these mechanisms, with its outcome, rung and test (V11 §3.27).""")
e.R("""| the rows (V11 §3.5–V11 §3.15); the new columns item 103–108 require, as BCR-V11-1 … 6 |""","""| the rows (V11 §3.5–V11 §3.15); the new columns items 103–108 require (items 432–434, 258, 379, 510) |""")
e.R("""| district-kind rows (V11 §3.9), identity rows (V11 §3.10), driver rows cited, `w_sun` (item 102) placed in the driver table |""","""| district-kind rows (V11 §3.9), identity rows (V11 §3.10), driver rows cited, `w_sun` (item 102) placed in the driver table, item 111's climate cell and water term weights (V11 §3.25) |""")
e.R("""| climate rows (V11 §3.17); the greenery rows are §4.9's (cited) |""","""| climate rows (V11 §3.17) with item 111's dry-country cells (V11 §3.25); the greenery rows are §4.9's (cited) |""")
e.R("""the era table `EraRow` (new, BCR-V11-7)""","""the era table `EraRow` (item 400)""")
e.R("""(V11 §3.5.8; BCR-V11-13) the basement function reads |""","""(V11 §3.5.8; item 436) the basement function reads |""")
e.R("""| II.7.3, II.7.5, II.7.6 (g item 109 applied by the coherence pass) |""","""| II.7.3, II.7.5, II.7.6 (item 109) |""")
e.R("""| the solver's read-only explanation | BCR-V10-2 (`PlacementSolver.explain`) |""","""| the solver's read-only explanation | §4.7 (`PlacementSolver.explain`, item 311) |""")
e.R("""`Use.specialisation` (file g item 110, applied by the coherence pass)""","""`Use.specialisation` (item 110)""")
e.R("""`roster.specialisations`, `water`); BCR-V11-27 – BCR-V11-30 |""","""`roster.specialisations`, `water`); items 259, 289, 401, 412 |
| the oasis, the arid water chances, the water pull on the growth field, the prosperity water term with item 102's climate cell, wells by yield, the oasis grove and gardens (item 111) | §4.2 S0–S1, §4.2 S3 (6), §4.4, §4.5, §4.7 S10b, §4.9 | the climate rows' dry-country cells, the well-yield rows and the `garden` land-use row (V11 §3.25, V11 §3.17.2) |
| history-first generation: the peak, the replay's coarse epochs, destruction and refounding, burial (item 113) | §4.11 *History-first generation*, §7.7 DR36–DR39, II.7.6 | the `history.*` settings, the event-to-epoch rows and the burial factor rows (V11 §3.26) |""")
e.R("""(base, §4.7, with file
g's text applied by the coherence pass); item 110's geometry""","""(base, §4.7); item 110's geometry""")
e.R("""the epochs' raised-way pass and decline (V06), the tools (V09); the island's underside""","""the epochs' raised-way pass and decline (V06), the tools (V09); item 111's geometry — the oasis's outline, the water pull on
the field, the gardens' siting (base, §4.2 S1, S3, §4.9) — and the springs over epochs (V06); item 113's replay engine
(V06), the port's history reading (V08), the buried former settlement and lost access (V04) and the story (V10); the island's underside""")
e.save()
