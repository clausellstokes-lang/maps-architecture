# V05 repair r2 — the edits (coherence/repair-V05-r2). Each (issue ids, old, new, count); old must occur exactly
# `count` times in the text as it stands when the edit is applied.
EDITS = []


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


# ---- VAH-r1-15 (R2-10): the reader's and the oracle's types are §11.2's; V10 §2.13 keeps `WhyProvider`
S('VAH-r1-15 R2-10 §1.2 V10 row',
  "| V10 §2.13 (`WhyProvider`, `FieldDrivers`, `WhyAnswer.closure`) | the clerk's island answers (V05 §4.5) |",
  "| V10 §2.13 (`WhyProvider`) | the clerk's island answers (V05 §4.5) |")

S('VAH-r1-15 R2-10 §1.2 §11.2 row',
  "| §9.1, §9.2; §11.1 (file f item 415) | V05 §5.4, V05 §5.5 |\n",
  "| §9.1, §9.2; §11.1 (file f item 415) | V05 §5.4, V05 §5.5 |\n"
  "| §11.2 (`FieldDrivers`, `WhyAnswer.closure`) | the daylight term's per-island attribution and the rim's `sheer` closure in the clerk's island answers (V05 §4.5, V05 §3.21 (1)) |\n")

S('VAH-r1-15 R2-10 §1b wiring rows',
  "| the sky's `WhyProvider` and the daylight term's per-island attribution (V05 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |\n",
  "| the sky's `WhyProvider` (V05 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |\n"
  "| the daylight term's per-island attribution, the `sources` of §11.2's `FieldDrivers.terms` (V05 §4.5) | the prosperity field's `drivers()` (§4.5 *Fields*) over the islands' held strips and their sample bits (V05 §3.19) | §11.2's `WhyAnswer.drivers` in volume 10's `why` on shaded ground | §11.2 (`FieldDrivers`); §4.5 *Fields* |\n")

S('VAH-r1-15 R2-10 §3.21 (1)',
  "as barrier `sheer` (V10's `WhyAnswer.closure`).",
  "as barrier `sheer` (§11.2's `WhyAnswer.closure`).")

S('VAH-r1-15 R2-10 §4.5 drivers',
  "prosperity field's `drivers()` (V10's `FieldDrivers`; §4.5 *Fields*) gives",
  "prosperity field's `drivers()` (§11.2's `FieldDrivers`; §4.5 *Fields*) gives")

S('VAH-r1-15 R2-10 §4.5 terms',
  "the `sources` list is this volume's member of volume 10's\n`FieldDrivers.terms`.",
  "the `sources` list is this volume's member of §11.2's\n`FieldDrivers.terms`.")

S('VAH-r1-15 R2-10 §13 fix list home',
  "V09 §4.9, V09 §4.20, V09 §5.4; V10 §2.13; volume 11's rows;",
  "V09 §4.9, V09 §4.20, V09 §5.4; V10 §2.13 and §11.2; volume 11's rows;")

# ---- VAT1-01 (R2-34): Show gaps on an island reads V01 §5.4 (3)'s `gapUnits`, the one definition
S('VAT1-01 R2-34 §5.6 (4)',
  "4. **Show gaps** (item 120 (i)). On an island Show gaps reads V01's units over the island's districts; for a class with\n"
  "   a coverage row the island's units are V05 §3.5 (3)'s — its districts for a row counted by district or neighbourhood,\n"
  "   the whole island for one counted by walking radius or by households — each unit with no member of the class outlined\n"
  "   dashed along its land's edge and labelled \"none here\". A class `IslandRule.carry.never` excludes reads as any gap;\n"
  "   the clerk's why names the carry rule (V05 §4.5).",
  "4. **Show gaps** (item 120 (i)). On an island Show gaps' units are V01 §5.4 (3)'s `gapUnits` over the island's arena,\n"
  "   restating none: its districts for a class with no coverage row or a row counted by district or neighbourhood; the\n"
  "   whole island as one unit for a row counted by walking radius (V01 §3.16; the route to the ground passes every walking\n"
  "   radius, V05 §3.5 (3)), so a member on the island serves every residential plot of it, a member beneath it on the\n"
  "   ground none; and V01's per-plot `households` reading over the island's plots for a row counted by households — each\n"
  "   unit with no member of the class outlined dashed along its land's edge and labelled \"none here\", a per-plot row's\n"
  "   gap the unserved plots of each district as V01 §5.4 (3) draws it. A class `IslandRule.carry.never` excludes reads as\n"
  "   any gap; the clerk's why names the carry rule (V05 §4.5).")

S('VAT1-01 R2-34 §1b Find row',
  "| V09's `live.find` over §11.2's gazetteer at the view's key; the committed island records, their arenas and coverage units (V05 §3.5 (3)) |",
  "| V09's `live.find` over §11.2's gazetteer at the view's key; the committed island records and their arenas; V01 §5.4 (3)'s `gapUnits` over each island's arena (V05 §5.6 (4)) |")

S('VAT1-01 R2-34 §3.23 Find row',
  "a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered | check | T-V5-36 |",
  "a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered; Show gaps on an island (V05 §5.6 (4)): V01 §5.4 (3)'s `gapUnits` over its arena — under a walking-radius row an island holding no member a gap over every residential plot of it, whatever the ground beneath holds, and one holding a member no gap; under a households row each district's unserved plots; a district with no residential plot no per-plot unit; a class `IslandRule.carry.never` excludes a gap like any other | check | T-V5-36 |")

S('VAT1-01 R2-34 J-V5.89',
  "and that Show gaps reads an island's coverage units (V05 §3.5 (3)), over merging pins across layers, dropping a hidden layer's matches and reading districts alone, because a bubble joining an island's matches to the ground's beneath would send its click to the wrong layer, item 120 (e) and (f) ask that a match is never lost and that the filter hold across layers, and the coverage units are where an island's provision is counted (item 103 (f)). |",
  "and that Show gaps on an island reads V01 §5.4 (3)'s `gapUnits` over the island's arena, the whole island one catchment for a walking-radius row (V05 §5.6 (4)), over merging pins across layers, dropping a hidden layer's matches and a gap reading of the sky's own, because a bubble joining an island's matches to the ground's beneath would send its click to the wrong layer, item 120 (e) and (f) ask that a match is never lost and that the filter hold across layers, and `gapUnits` is Show gaps' one definition on every layer, counting a unit served as V11 §2.3's `CoverageSpec` counts it, an island one walking unit because the ride to the ground passes every walking radius (V05 §3.5 (3)). |")

# ---- R2-08, R2-35: the base bars each volume test takes, named at the volume end; §7's head lists them
S('VAP-r1-06 R2-08 R2-35 §7 head',
  "They take over the base's\n"
  "island bars T10-1, T13-1, T15-1 and T102-2 as §13.2 names (file f item 476).",
  "They take over the base's\n"
  "island bars T10-1, T13-1, T15-1 and T102-2 (file f item 476), the island clauses of T117-1 – T117-8 (T-V5-34),\n"
  "T118-1 – T118-6 (T-V5-35) and T119-2 – T119-5 (T-V5-18), and T120-1's registration with T120-4's and T120-5's sky\n"
  "clauses (T-V5-36), as §13.2's take-over table names them.")

S('R2-08 T-V5-18 head',
  "* **T-V5-18 — budgets and the comfort level** [C]. V05 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three\n"
  "  islands, or their fallbacks applied and reported, the obstacle row with 27 accesses; the one-click path unchanged\n"
  "  (§12.5). Item 119's comfort level",
  "* **T-V5-18 — budgets and the comfort level** (item 119; takes T119-2 – T119-5's island clauses) [C]. V05 §6's rows\n"
  "  on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their fallbacks applied and reported, the obstacle\n"
  "  row with 27 accesses; the one-click path unchanged (§12.5). Item 119's comfort level")

# ---- VAP-r1-06 (R2-08), R2-09: T-V5-34 and T-V5-35 name the bars they take and state their registrations
S('VAP-r1-06 R2-08 R2-09 T-V5-34',
  "* **T-V5-34 — the island through the year** (item 117; V05 §5.1) [C]. On the two sky goldens (T-V5-15) and two\n"
  "  METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity island carrying a conjured river and\n"
  "  one carrying a spring pond, deciduous crowns on both: (a) the same document hashes identically in all 52 weeks, its\n"
  "  saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the sky goldens' registration on V12 §3.7.8's engine under\n"
  "  `item117.season` (a `view` pin over weeks 0–51; V12 §2.13), written by the M6-sky seat landing P3; (b) each island face\n"
  "  and crown draws, week by week, the look a ground face or crown of its kind draws in the same week under the same\n"
  "  climate row — never a row of the island's own (an `own` `mountainous` island over `plain` ground included); (c) in an\n"
  "  autumn week at least five distinct crown colours across a deciduous island's trees, its leaf cover deepening week by\n"
  "  week through the leaf-fall weeks, on the island's surfaces only, and moving with the island after a move; (d) the arid\n"
  "  fixture draws no ice and no snow on any island in any week; on the cold fixture the spring pond freezes in the ice\n"
  "  weeks, the river's fast stretches and the waterfall's 12 m lip disc stay open water, and `sky.fall` and `sky.mist` draw\n"
  "  in every week; (e) in a snow week the island's land, field faces and roofs draw `snow` and its rim ticks separate it\n"
  "  from the snowy ground by the ink / ground row of §8.2's contrast matrix; (f) the drawn shadow's length follows the view\n"
  "  sun's week while the strips do not change; (g) every picture export of an island draws and names the chosen season,\n"
  "  and a VTT island scene carries its frozen water as `ice` polygons (§11.1); (h) the season switch re-skins the sky tiles\n"
  "  within V05 §6's season row (R12-30).",
  "* **T-V5-34 — the island through the year** (item 117; V05 §5.1; takes T117-1 – T117-8's island clauses — T117-3's\n"
  "  rows and T117-6's opening week have none, the island taking the ground's season rows at the view's week) [C]. On the\n"
  "  two sky goldens (T-V5-15) and two METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity\n"
  "  island carrying a conjured river and one carrying a spring pond, deciduous crowns on both: (a) (T117-1) the same\n"
  "  document hashes identically in all 52 weeks, its saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the\n"
  "  `item117.season` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin over weeks 0–51),\n"
  "  written by the M6-sky seat landing P3; (b) each island face and crown draws, week by week, the look a ground face or\n"
  "  crown of its kind draws in the same week under the same climate row — never a row of the island's own (an `own`\n"
  "  `mountainous` island over `plain` ground included); (c) (T117-2) at the leaf-colour weeks' middle week at least five\n"
  "  distinct crown colours across a deciduous island's trees, its leaf cover deepening week by week through the leaf-fall\n"
  "  weeks, on the island's surfaces only, and moving with the island after a move; (d) (T117-4) the arid fixture draws no\n"
  "  ice and no snow on any island in any week; (T117-5) on the cold fixture the spring pond freezes in the ice weeks, its\n"
  "  first ice week at or before any of the conjured river's, the river's fast stretches and the waterfall's 12 m lip disc\n"
  "  stay open water, and `sky.fall` and `sky.mist` draw in every week; (e) (T117-7) at each season's middle week the\n"
  "  island's look passes T112-1's contrast and colour-blind checks, and in a snow week the island's land, field faces and\n"
  "  roofs draw `snow` and its rim ticks separate it from the snowy ground by the ink / ground row of §8.2's contrast\n"
  "  matrix; (f) the drawn shadow's length follows the view sun's week while the strips do not change; (g) every picture\n"
  "  export of an island draws and names the chosen season, and a VTT island scene carries its frozen water as `ice`\n"
  "  polygons (§11.1); (h) (T117-8) the season switch re-skins the sky tiles within V05 §6's season row (R12-30).")

S('VAP-r1-06 R2-08 R2-09 T-V5-35',
  "* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1) [C]. On the two sky goldens with a festival\n"
  "  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic\n"
  "  festival: (a) the document hashes identically with decorations on and off and in every week — the sky goldens'\n"
  "  registration on V12 §3.7.8's engine under `item118.festival` (`view`, `tiles`; V12 §2.13), written by the M6-sky seat\n"
  "  landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in the window's weeks, at V11\n"
  "  §3.25.7's `SKY` row's counts, along the rim and two at each landing top, and none in a landing yard's passage, at the\n"
  "  waterfall's lip, on a ground landing, on the void or over a label; (c) the same festival draws byte-stable sky tiles\n"
  "  per seed across views and exports, and a moved island's pennants move with it; (d) a picture export draws them and\n"
  "  names the festival, a VTT island scene draws them in its image only; (e) with no tradition and no preview, the sky\n"
  "  tiles are byte-identical to the base's (the pin's `tiles` clause).",
  "* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1; takes T118-1 – T118-6's island clauses —\n"
  "  T118-5's staging has none, V11's `SKY` row naming no staging place) [C]. On the two sky goldens with a festival\n"
  "  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic\n"
  "  festival: (a) (T118-1) the document hashes identically with decorations on and off and in every week — the\n"
  "  `item118.festival` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin with its `tiles`\n"
  "  clause), written by the M6-sky seat landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in\n"
  "  the window's weeks (T118-2), at V11 §3.25.7's `SKY` row's counts, along the rim and two at each landing top, with no\n"
  "  kind of a ground tier's row on any island of either golden (T118-4), and none in a landing yard's passage, at the\n"
  "  waterfall's lip, on a ground landing, on the void or over a label's keep-out (T118-6); (c) (T118-3) the same festival\n"
  "  draws byte-stable sky tiles per seed across views and exports, and a moved island's pennants move with it; (d) a\n"
  "  picture export draws them and names the festival, a VTT island scene draws them in its image only; (e) (T118-1) with\n"
  "  no tradition and no preview, the sky tiles are byte-identical to the base's (the pin's `tiles` clause).")

# ---- R2-08, R2-09, R2-35 (T120-1's registration, T120-4, T120-5) and VAT1-01 (its Find clause): T-V5-36
S('R2-35 R2-09 VAT1-01 T-V5-36',
  "* **T-V5-36 — Find on Sky** (item 120; V05 §5.6) [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds\n"
  "  with islands, on V09's app harness, each with three chip sets — a class the islands hold, an island institution's name\n"
  "  and an island by its name — with Show gaps off and on: (a) the document hashes identically with Find on and off, and\n"
  "  **Clear** restores byte-identical sky tiles — the sky goldens' registration on V12 §3.7.8's engine under\n"
  "  `item120.find` (`view`, `tiles`; V12 §2.13), written by the M6-sky seat landing P3; (b) each chip's sky matches equal\n"
  "  §11.2's gazetteer rows on the islands at the key, the panel's \"on Sky\" count their number; (c) with Ground working,\n"
  "  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,\n"
  "  and Go there sets Sky with the match's island; (d) at the city band every sky match has a pin or a bubble, and no\n"
  "  bubble joins two islands' or two layers' pins; (e) under a player view on an island form of T-V9-66's knowledge canary\n"
  "  — a `secret` access's landing yard and a concealed use on an island — nothing withheld surfaces in a suggestion,\n"
  "  count, glow, pin or ghost pin; (f) the chips survive a raise, a move (the glow moving with the island), a fall (its\n"
  "  matches dark, its landfall offered on Ground), an epoch and an undo, each match set equal to a fresh evaluation there;\n"
  "  (g) Show gaps outlines exactly the island units of V05 §5.6 (4) that hold no member; (h) item 120 (j)'s suggestion and\n"
  "  glow timings hold with three islands at the METROPOLIS cap (V05 §6's Find row).",
  "* **T-V5-36 — Find on Sky** (item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky clauses)\n"
  "  [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds with islands, on V09's app harness, each with\n"
  "  three chip sets — a class the islands hold, an island institution's name and an island by its name — with Show gaps\n"
  "  off and on: (a) (T120-1) the document hashes identically with Find on and off, and every chip off, or **Clear**,\n"
  "  restores byte-identical sky tiles — the `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12\n"
  "  §2.13; a `view` pin with its `tiles` clause), written by the M6-sky seat landing P3; (b) each chip's sky matches equal\n"
  "  §11.2's gazetteer rows on the islands at the key, the panel's \"on Sky\" count their number; (c) with Ground working,\n"
  "  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,\n"
  "  and Go there sets Sky with the match's island; (d) (T120-5) at the city band every sky match has a pin or a bubble,\n"
  "  each carrying its chip's second cue, and no bubble joins two islands' or two layers' pins; (e) under a player view on\n"
  "  an island form of T-V9-66's knowledge canary — a `secret` access's landing yard and a concealed use on an island —\n"
  "  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4) the chips survive every band\n"
  "  and layer change and a raise, a move (the glow moving with the island), a fall (its matches dark, its landfall offered\n"
  "  on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and a migration, each match set equal to a\n"
  "  fresh evaluation there, and a chip whose last match goes — an island institution's after its island falls — stays at\n"
  "  count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s `gapUnits` on the islands as V05 §5.6 (4) reads them —\n"
  "  each island district for a class with no coverage row or a row counted by district or neighbourhood; under a\n"
  "  walking-radius row every residential plot of an island holding no member, whatever the ground beneath holds, and none\n"
  "  of one holding a member; under a households row each district's unserved plots by V01's per-plot reading — a class\n"
  "  `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s suggestion and glow timings hold with three islands at\n"
  "  the METROPOLIS cap (V05 §6's Find row).")

# ---- R2-32: Find lands at M5, before M6-sky's P3; T-V5-36 lands at M6-sky
S('R2-32 §8 dependencies',
  "and its Find part V09's Find panel and `live.find` (a fixture\n"
  "provider until then); P6's comfort-level runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;\n",
  "and its Find part V09's Find panel and `live.find`, which land\n"
  "at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky; P6's comfort-level runs need V12 §3.15.9's\n"
  "wait timer and V06 §6.8's estimate; P4 and P5 after P2;\n")
