# Edits A: the head, §0, §1.1, §1.2, §1.3, §1b (after the S7 prefixes).
EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))

# ---------------------------------------------------------------- the head (VV56-12, VV56-14)
E('VV56-12/14 head',
"""cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V05 §3.2`); a list after a volume prefix stays in that volume (`V06
§2.1, §3.2` is two sections of volume 6); `item n` is an amendment item — items 1–113 the owner's, items 200 and above
file f's, each the applied text of a volume's base change request (V05 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V5.n` (V05 §9),
tests `T-V5-n` (V05 §7).""",
"""cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V05 §3.2`), and every item of a list carries its volume's prefix
(`V06 §2.1, V06 §3.2` is two sections of volume 6; in `V06 §2.1, §3.2` the second is the base's); `item n` is an
amendment item — items 1–120 the owner's, items 200 and above file f's, each the applied text of a volume's base change
request (V05 §10 lists this volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited
and never restated. Decisions are `J-V5.n` (V05 §9), tests `T-V5-n` (V05 §7).""")

# ---------------------------------------------------------------- §0 (items 117–120 in plain words)
E('VV56-04/05/06 G120 §0',
"""**Where magic wells up.** If the settlement's own record says it sits on a magical node, the town pays less to keep""",
"""**Through the year, on feast days, and when you look for something.** An island dresses for the season with the land
below it: its gardens and trees through the growing year, a blaze of autumn colours with fallen leaves on its lanes and
roofs, its pond frozen in a cold winter while the waterfall keeps running, snow on its roofs — the country's climate
deciding, never the island's height. In a festival's weeks pennants fly along its rim and at the tops of its hoists. Find
picks out what you look for on the islands too, with the same glow as on the ground, and a faint pin on the ground marks a
match up on an island. None of it changes the map. Every wait the sky takes part in — generating, opening, exporting,
advancing time — stays inside the ten seconds the owner set as the comfort level, and dragging or editing an island stays
as quick as before.

**Where magic wells up.** If the settlement's own record says it sits on a magical node, the town pays less to keep""")

# ---------------------------------------------------------------- §1.1 (item 18)
E('VV56-04/05/06 G120 §1.1',
"""17. **The dossier** — derivation row DR27 and the coherence rules (V05 §4.4); item 111's water, which leaves an island
    unchanged (V05 §3.8 (4), V05 §3.11).
""",
"""17. **The dossier** — derivation row DR27 and the coherence rules (V05 §4.4); item 111's water, which leaves an island
    unchanged (V05 §3.8 (4), V05 §3.11).
18. **The island through the year, on feast days and under Find** (items 117, 118, 120) — its seasonal look by the
    ground's climate, its festival pennants on the rim and at the landing tops, Find's matches and ghost pins on the sky
    layer, each a view only (V05 §5.1, V05 §5.6); and the sky's one-time waits inside item 119's comfort level (V05 §6).
""")

# ---------------------------------------------------------------- §1.2 (VV56-12; the hooks of items 117–120)
E('VV56-12 §1.2',
"""| items 102–111 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–17) |""",
"""| items 102–120 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–18) |
| §2.9's view state (the year position and its follow flag, the festival display, the view key `find`), §7.7's DR42 and DR43, §8.2's season and festival rows, §11.1, §11.2's gazetteer under knowledge admission, §12.1's comfort level and §12.5 (items 117–120) | the island's seasonal look and its pennants (V05 §5.1), Find on Sky (V05 §5.6), the exports' looks (V05 §5.5), the one-time waits (V05 §6) |""")
E('VV56-06 §1.2 V06',
"""V06 §3.7.5, V06 §3.8.1, V06 §3.19 | the island's two participants, the household channels, the landfall's clearance and repair |""",
"""V06 §3.7.5, V06 §3.8.1, V06 §3.19, V06 §6.8 | the island's two participants, the household channels, the landfall's clearance and repair, an `advance`'s comfort estimate over the islands |""")
E('G120 §1.2 V09',
"""| V09 §2.7, V09 §4.9 (the `bend.*` rows), V09 §4.20.3, V09 §4.20.9, V09 §5.4, V09 §6.4 | the Shade view, the island's bends, the delete row and suppression card |""",
"""| V09 §2.7, V09 §4.2 (the working layer), V09 §4.9 (the `bend.*` rows), V09 §4.20.3, V09 §4.20.9, V09 §4.21.9 (the progress view), V09 §5.4, V09 §6.4; V09's Find panel and its `live.find` provider (item 120) | the Shade view, the island's bends, the delete row and suppression card, the progress shown past one second, Find on Sky |""")
E('VV56-04/05/06 §1.2 V11',
"""| V11 §3.1 (rows 51 and 56), V11 §3.5 (the institution classes), V11 §3.9 (district kinds), V11 §3.24.0 (the switch table) | the tables this volume's rows join |""",
"""| V11 §3.1 (rows 51 and 56), V11 §3.5 (the institution classes), V11 §3.9 (district kinds), V11 §3.24.0 (the switch table), V11 §3.25.6 – V11 §3.25.8 (the season, festival and quality-spend rows) | the tables this volume's rows join; the looks' and the waits' rows it reads |""")
E('VAP-20 §1.2 V12',
"""| V12 §2.8, V12 §3.7.6, V12 §3.7.8, V12 §3.9.1, V12 §3.11 | the register, the pins, the M6-sky sitting |""",
"""| V12 §2.8, V12 §2.13, V12 §3.7.6, V12 §3.7.8, V12 §3.9.1, V12 §3.11, V12 §3.15.9, V12 §3.15.10 | the register, the pins and their registrations, the M6-sky sitting, the wait timer, Find's measurements |""")

# ---------------------------------------------------------------- §1.3 (what the looks leave to others)
E('VV56-04/05 G120 §1.3',
"""* **Item 111's water** — the oasis, the water pull on growth and prosperity, well placement by yield and the climate cell
  — is the base's (§4.2 S0–S1, S3, §4.5, §4.7 S10b); on an island it changes nothing (V05 §3.8 (4), V05 §3.11).""",
"""* **Item 111's water** — the oasis, the water pull on growth and prosperity, well placement by yield and the climate cell
  — is the base's (§4.2 S0–S1, S3, §4.5, §4.7 S10b); on an island it changes nothing (V05 §3.8 (4), V05 §3.11).
* **Seasons, festivals and Find themselves** (items 117, 118, 120) — the year position, the season and decoration rows,
  the festival schedule, the Find panel and its overlay — are the base's (§2.9, §7.7's DR42 and DR43, §8.2, §11.2) and
  volumes 9 and 11's; the explanations are volume 10's. This volume states what an island's look takes of them and what
  Find offers and draws on the sky (V05 §5.1, V05 §5.6).""")

# ---------------------------------------------------------------- §1b (wiring of the new pieces)
E('VV56-04/05/06 G120 §1b',
"""| the budgets (V05 §6) | M6-sky's measurements | §12's rows | §12.4, §12.6 (file f item 476) |""",
"""| the island's seasonal look (V05 §5.1 *Seasons on the island*) | §2.9's year position and follow flag (DR42); the document's one climate row as DR42 resolves it; §8.2's season rows with V11 §3.25.6's tables; the island's crowns, faces, water and roofs | S14's sky marks' `season` column (§8.1 item 8) and the tile worker's re-skin of the sky base and surface layer; picture exports; the clerk's seasonal line (V10) | §2.9, §8.2, §12.5 |
| the islands' pennant places — the rim run and the landing tops (V05 §5.1 *Festival pennants*) | the island's rim chain, its landing yards and the waterfall's lip (V05 §3.8, V05 §3.10); §2.9's festival display with DR43's schedule; V11 §3.25.7's `SKY` row and motif rows | `live.festival`'s places `rims` and `landings` (§8.2), so its marks on the sky base; picture exports | §8.2, §2.9, §7.7 |
| Find on Sky — the sky's matches, ghost pins, bubbles and gaps units (V05 §5.6) | V09's `live.find` over §11.2's gazetteer at the view's key; the committed island records, their arenas and coverage units (V05 §3.5 (3)) | the glow, pins and bubbles on the sky layer; the ghost pins of sky matches on Ground and Below; the panel's "on Sky" count and **Go there** (V09) | §2.9, §8.2, §11.2 |
| the budgets and the comfort level (V05 §6) | M6-sky's measurements; §12.1's comfort level | §12's rows; T-V5-18; V06 §6.8's estimate (the resize row's figures) | §12.1, §12.4, §12.6 (file f item 476) |""")
