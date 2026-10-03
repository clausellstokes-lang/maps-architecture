# Edits D: §7, §8, §9, §10, §12 (after the S7 prefixes).
EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))

# ---------------------------------------------------------------- §7 intro (VAP-20: the registrations named once)
E('VAP-20 §7 intro',
"""§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 as §13.2 names (file f item 476).""",
"""§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 as §13.2 names (file f item 476). Every clause that restates an owner item's
no-op or view pin registers its fixture on V12 §3.7.8's engine under its V12 §2.13 pin, naming the pin, its off form and
the seat that writes the registration (X-V12-11): T-V5-15's item-110 clause, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27's
two, T-V5-33's item-111 clause and T-V5-34 – T-V5-36.""")

# ---------------------------------------------------------------- T-V5-12 (VAL-17)
E('VAL-17 T-V5-12',
"""  their displaced positions; with the sky layer hidden, 0 sky labels and no model digest changed (T15-1); every shipped
  sheet loads at every band with every sky semantic resolved, and the `fallen` row draws over the landfall's members; a""",
"""  their displaced positions; with the sky layer hidden, 0 sky labels and no model digest changed (T15-1); every shipped
  sheet of §8.2's presets table — V05 §5.1's list, the ink-family variants `parchment`, `bw-print` and `night` and, from
  volume 7's V-M1, `painterly` among them — loads at every band with every sky semantic resolved, and the `fallen` row
  draws over the landfall's members; a""")

# ---------------------------------------------------------------- T-V5-18 (VV56-06)
E('VV56-06 T-V5-18',
"""* **T-V5-18 — budgets** [C]. V05 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their
  fallbacks applied and reported, the obstacle row with 27 accesses; the one-click path unchanged (§12.5).""",
"""* **T-V5-18 — budgets and the comfort level** [C]. V05 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three
  islands, or their fallbacks applied and reported, the obstacle row with 27 accesses; the one-click path unchanged
  (§12.5). Item 119's comfort level at every island rung — CITY and METROPOLIS, each at its top and at the population
  cap, with three islands: each one-time wait of V05 §6's list, five seeds, p95 ≤ 10 000 ms from the click to the complete
  result on V12 §3.15.9 (2)'s wait timer (T119-2), an `advance` with islands timed in total (V06's T-V6-24 fixtures with
  their islands); every wait over one second naming its stage within one second, never an empty frame (T119-3); every
  sky row above its target holding its `perf.qualitySpend` row (T119-4); V05 §6's interactive rows not relaxed against
  the previous release (T119-5).""")

# ---------------------------------------------------------------- VAP-20: the five registrations (and T-V5-27's item-110 one)
E('VAP-20 T-V5-19 (c)',
"""  every strip is empty and the field byte-identical to the base's pass 2 (no-op pins); (d) the strip identical on the five""",
"""  every strip is empty and the field byte-identical to the base's pass 2 (no-op pins) — this fixture's NoOpPin
  registration on V12 §3.7.8's engine under `item102.sun` (V12 §2.13; its off form the cells T102-1 names, `w_sun` 0),
  written by the M6-sky seat landing P1; (d) the strip identical on the five""")
E('VAP-20 T-V5-22 (b)',
"""  run is byte-identical to one without coverage (no-op pin); (c) island classes with a ground supply edge stand at a mean""",
"""  run is byte-identical to one without coverage (no-op pin: these seeds' NoOpPin registration on V12 §3.7.8's engine
  under `item103.coverage`, its off form the cells T103-3 names, written by the M6-sky seat landing P2); (c) island classes
  with a ground supply edge stand at a mean""")
E('VAP-20 T-V5-22 (k)',
"""  result is byte-identical to the run without items 105 and 107 (no-op pin).""",
"""  result is byte-identical to the run without items 105 and 107 (no-op pin: these seeds' NoOpPin registration on V12
  §3.7.8's engine under `item105.web` and `item107.spread`, their off form V11 §3.7.4's web off form with the cells
  T107-4 names, written by the M6-sky seat landing P2).""")
E('VAP-20 T-V5-27',
"""  closure and profile off, byte-identical to the base (no-op pin). **With item 110:** 0 island `RetainingWall`s classed as""",
"""  closure and profile off, byte-identical to the base (no-op pin: this fixture's NoOpPin registration on V12 §3.7.8's
  engine under `item106.barrier`, its off form the cells T106-5 names, written by the M6-sky seat landing P2). **With
  item 110:** 0 island `RetainingWall`s classed as""")
E('VAP-20 T-V5-27 item 110',
"""  levelling lays 0 retaining walls on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op
  pin).""",
"""  levelling lays 0 retaining walls on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op
  pin: the same fixture registered under `item110.terrace`, its off form V11 §3.24.0's `terrace` row, by the same seat).""")
E('VAP-20 T-V5-33 item 111',
"""  (its class `water`) and the aqueduct's source search may take the oasis's spring but never an island's water.
""",
"""  (its class `water`) and the aqueduct's source search may take the oasis's spring but never an island's water — the arid
  fixture's NoOpPin registration on V12 §3.7.8's engine under `item111.water`, its off form V11 §3.24.0's `climate`
  dry-cell row, written by the M6-sky seat landing P1.
* **T-V5-34 — the island through the year** (item 117; V05 §5.1) [C]. On the two sky goldens (T-V5-15) and two
  METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity island carrying a conjured river and
  one carrying a spring pond, deciduous crowns on both: (a) the same document hashes identically in all 52 weeks, its
  saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the sky goldens' registration on V12 §3.7.8's engine under
  `item117.season` (a `view` pin over weeks 0–51; V12 §2.13), written by the M6-sky seat landing P3; (b) each island face
  and crown draws, week by week, the look a ground face or crown of its kind draws in the same week under the same
  climate row — never a row of the island's own (an `own` `mountainous` island over `plain` ground included); (c) in an
  autumn week at least five distinct crown colours across a deciduous island's trees, its leaf cover deepening week by
  week through the leaf-fall weeks, on the island's surfaces only, and moving with the island after a move; (d) the arid
  fixture draws no ice and no snow on any island in any week; on the cold fixture the spring pond freezes in the ice
  weeks, the river's fast stretches and the waterfall's 12 m lip disc stay open water, and `sky.fall` and `sky.mist` draw
  in every week; (e) in a snow week the island's land, field faces and roofs draw `snow` and its rim ticks separate it
  from the snowy ground by the ink / ground row of §8.2's contrast matrix; (f) the drawn shadow's length follows the view
  sun's week while the strips do not change; (g) every picture export of an island draws and names the chosen season,
  and a VTT island scene carries its frozen water as `ice` polygons (§11.1); (h) the season switch re-skins the sky tiles
  within V05 §6's season row (R12-30).
* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1) [C]. On the two sky goldens with a festival
  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic
  festival: (a) the document hashes identically with decorations on and off and in every week — the sky goldens'
  registration on V12 §3.7.8's engine under `item118.festival` (`view`, `tiles`; V12 §2.13), written by the M6-sky seat
  landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in the window's weeks, at V11
  §3.25.7's `SKY` row's counts, along the rim and two at each landing top, and none in a landing yard's passage, at the
  waterfall's lip, on a ground landing, on the void or over a label; (c) the same festival draws byte-stable sky tiles
  per seed across views and exports, and a moved island's pennants move with it; (d) a picture export draws them and
  names the festival, a VTT island scene draws them in its image only; (e) with no tradition and no preview, the sky
  tiles are byte-identical to the base's (the pin's `tiles` clause).
* **T-V5-36 — Find on Sky** (item 120; V05 §5.6) [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds
  with islands, on V09's app harness, each with three chip sets — a class the islands hold, an island institution's name
  and an island by its name — with Show gaps off and on: (a) the document hashes identically with Find on and off, and
  **Clear** restores byte-identical sky tiles — the sky goldens' registration on V12 §3.7.8's engine under
  `item120.find` (`view`, `tiles`; V12 §2.13), written by the M6-sky seat landing P3; (b) each chip's sky matches equal
  §11.2's gazetteer rows on the islands at the key, the panel's "on Sky" count their number; (c) with Ground working,
  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,
  and Go there sets Sky with the match's island; (d) at the city band every sky match has a pin or a bubble, and no
  bubble joins two islands' or two layers' pins; (e) under a player view on an island form of T-V9-66's knowledge canary
  — a `secret` access's landing yard and a concealed use on an island — nothing withheld surfaces in a suggestion,
  count, glow, pin or ghost pin; (f) the chips survive a raise, a move (the glow moving with the island), a fall (its
  matches dark, its landfall offered on Ground), an epoch and an undo, each match set equal to a fresh evaluation there;
  (g) Show gaps outlines exactly the island units of V05 §5.6 (4) that hold no member; (h) item 120 (j)'s suggestion and
  glow timings hold with three islands at the METROPOLIS cap (V05 §6's Find row).
""")

# ---------------------------------------------------------------- §8 (prices; VV56-04, VV56-05, VV56-06, G120)
E('VV56-04/05 G120 §8 P3',
"""rung 3's prism tiers, the cursor sun's floor, labels (item 415); the strip's outlines in volume 9's shade map view | T-V5-12, T-V5-13, T-V5-20 | 3–4.25 |""",
"""rung 3's prism tiers, the cursor sun's floor, labels (item 415); the strip's outlines in volume 9's shade map view; the island's seasonal look, its festival pennants and Find on Sky (items 117, 118, 120; V05 §5.1, V05 §5.6) | T-V5-12, T-V5-13, T-V5-20, T-V5-34, T-V5-35, T-V5-36 | 3.75–5.5 |""")
E('VV56-06 §8 P6',
"""the participant `sky.clearance` with `reclearIsland` and the ledger by hand and on the M4 grow path (item 320); the engine-driven schedule joins volume 6's milestone | T-V5-14, T-V5-15, T-V5-18, T-V5-21 (b)–(d), (g), T-V5-31, T-V5-33's remaining rows | 1.75–2.5 |""",
"""the participant `sky.clearance` with `reclearIsland` and the ledger by hand and on the M4 grow path (item 320); the engine-driven schedule joins volume 6's milestone; the one-time waits timed against item 119's comfort level | T-V5-14, T-V5-15, T-V5-18 (its comfort-level clause included), T-V5-21 (b)–(d), (g), T-V5-31, T-V5-33's remaining rows | 1.75–2.75 |""")
E('VV56-04/05/06 §8 total',
"""| **total** | | | **17.25–23.25** |""",
"""| **total** | | | **18–24.75** |""")
E('VV56-04/05/06 G120 §8 deps',
"""rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope`
(a direct call after the M4 grow path's growth until then); P4 and P5 after P2; P6 after P4.""",
"""rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope`
(a direct call after the M4 grow path's growth until then); P3's looks need §8.2's season and festival rows with V11
§3.25.6 – V11 §3.25.7's tables (fixture rows until then) and its Find part V09's Find panel and `live.find` (a fixture
provider until then); P6's comfort-level runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;
P6 after P4.""")
E('VV56-04/05/06 §8 in §16',
"""§16:** the row M6-sky after M6-U at 17.25–23.25 pw, outside the base total as a staged subject, the totals computed once""",
"""§16:** the row M6-sky after M6-U at 18–24.75 pw, outside the base total as a staged subject, the totals computed once""")

# ---------------------------------------------------------------- §9 (VV56-17: E-24's one mark; the new decisions)
E('VV56-17 J-V5.40',
"""| J-V5.40 | Chose to leave the new derivation row's number to the integration, over taking DR26, because volumes 1, 6 and 8 each proposed a DR26 in parallel and one number for four rows would make the derivation table's references ambiguous. Amended by J-VI.13: the row is DR27 (file f items 383, 387). |""",
"""| J-V5.40 | *amended by J-VI.13.* Chose to leave the new derivation row's number to the integration, over taking DR26, because volumes 1, 6 and 8 each proposed a DR26 in parallel and one number for four rows would make the derivation table's references ambiguous; the row is DR27 (file f items 383, 387). |""")
E('VV56-17 J-V5.61',
"""| J-V5.61 | Chose that no raised way reaches an island and no raised part stands on one, and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because II.1's sky has "no portals, no roads in or out", sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts. Amended by J-VI.4: a T4 `raised` or aqueduct stroke ending on a rim, or lying on an island's key, is bent (J-VI.4 (d), (e)), never refused. |""",
"""| J-V5.61 | *amended by J-VI.4.* Chose that no raised way reaches an island and no raised part stands on one, and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because II.1's sky has "no portals, no roads in or out", sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts; a T4 `raised` or aqueduct stroke ending on a rim, or lying on an island's key, is bent (J-VI.4 (d), (e)), never refused. |""")
E('VV56-17 J-V5.62',
"""the owner removed that island, not the town's quota of islands. Amended by J-VI.14: one suppression rule in two record forms, a count never releasing a hold (file f item 260). |""",
"""the owner removed that island, not the town's quota of islands; one suppression rule in two record forms, a count never releasing a hold (file f item 260). |""")
E('VV56-17 J-V5.62 mark',
"""| J-V5.62 | Chose to keep a removed island as a live record""",
"""| J-V5.62 | *amended by J-VI.14.* Chose to keep a removed island as a live record""")
E('VV56-04/05/06 G120 §9 new rows',
"""because a lock holds the author's island while the dossier stays the truth about its institution (items 20 (h), 101). |
""",
"""because a lock holds the author's island while the dossier stays the truth about its institution (items 20 (h), 101). |
| J-V5.84 | Chose that an island's seasonal look reads the document's one climate row as DR42 resolves it — the ground's, its height correction by the ground's relief class included — over correcting it for the island's altitude or its own relief, because one town lies in one climate: an island floats 60–220 m above its ground reference (V05 §2.4's `altitudeM`), under one climate step of lapse (≈ 0.4–1.4 °C at 0.65 °C per 100 m), while DR42's steps are a winter class apart, and an `own` relief is the island's texture, not upland; an island whose pond froze in weeks the ponds below stay open would show a climate the town does not have (item 117 (d): "climate decides"). |
| J-V5.85 | Chose to lay an island's fallen-leaf cover on a grid in the island's local frame and to read only the island's own crowns, the ground's cover never reading an island's, over §8.2's world-aligned grid and a cover shared across the layers, because the island moves by one translation (J-V5.1) and its look must move with it rather than reshuffle under a drag or the `offset` displacement, and a cover read across the layers would make a ground tile's look depend on crowns at another height, a coupling the two bases of V05 §5.3 do not have. |
| J-V5.86 | Chose to read the waterfall's lip as an outfall for §8.2's open leads, open in every week, and the spring pond as an ordinary `pond`, over freezing the fall into an icefall or keeping the pond open, because the conjured river is the island's magic, not a winter catchment's, so its fall keeps running (item 117 (e) keeps outfalls open), while the pond is still water like any pond and freezes first, as item 117 (e) asks. |
| J-V5.87 | Chose that an island draws V11's `SKY` row alone — pennants along its rim and two flanking each landing top, at whatever rung the island stands — over drawing the ground's tier rows on it or none below CITY, because item 118 (d) names the sky's own decoration ("pennants on their rims and landings") apart from the tiers, the ground rows' places (towers, squares, the procession route) are the ground arena's, and an island an epoch carried below CITY still stands in the sky; the rim run skips the yards' fronts and the waterfall's lip, so no pennant stands in a passage or a fall. |
| J-V5.88 | Chose to class among the sky's one-time waits under item 119's comfort level a generation and a Re-derive with islands, declaring an island and a hand `fallIsland`, opening a document with islands, a dossier change reaching them, an `advance` and an export, and among the interactive rows every other island edit (`setAttr`, a move, a resize, a reshape, New random, an access placed or deleted, Update shade now), the pending strip and the season, festival and Find switches, over binding every island edit by the comfort level, because a declaration and a fall relocate households and re-derive an island and its landings — a wait the user sits through once — while the other edits are moment-to-moment feedback whose budgets item 119 (d) leaves as they are; both kinds keep their rows as targets. |
| J-V5.89 | Chose that on Sky pins merge into a count bubble only within one layer and one island, that a hidden sky layer keeps its matches' ghost pins and counts, that Go there sets the match's island `key`, and that Show gaps reads an island's coverage units (V05 §3.5 (3)), over merging pins across layers, dropping a hidden layer's matches and reading districts alone, because a bubble joining an island's matches to the ground's beneath would send its click to the wrong layer, item 120 (e) and (f) ask that a match is never lost and that the filter hold across layers, and the coverage units are where an island's provision is counted (item 103 (f)). |
""")

# ---------------------------------------------------------------- §10 (VV56-16)
E('VV56-16 §10',
"""| BCR-V5-23 | the island step's households in volume 6's epoch | carried by volume 6 (V06 X10) | V06 §2.1 `EpochOps.demandTaken`, V06 §3.8.1 |""",
"""| BCR-V5-23 | the island step's households in volume 6's epoch | carried by volume 6 (V06 §2.1's `EpochOps.demandTaken`, V06 §3.8.1) | V06 §2.1 `EpochOps.demandTaken`, V06 §3.8.1 |""")

# ---------------------------------------------------------------- §12 (VV56-12; the new mechanisms PLAUSIBLE)
E('VV56-12 §12',
"""J111 included) and items 102–111 of `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`'s J-VI rows; the""",
"""J111 included) and items 102–120 of `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`'s J-VI rows; the""")
E('VV56-04/05/06 G120 §12',
"""volume 6's re-declared century bounds, and every budget — until M6-sky's P0 spikes and the phase exits measure them (V05""",
"""volume 6's re-declared century bounds, the island's seasonal look read from the ground's climate, the pennants' places,
Find's rules on the sky, every one-time wait inside the comfort level, and every budget — until M6-sky's P0 spikes and the
phase exits measure them (V05""")
