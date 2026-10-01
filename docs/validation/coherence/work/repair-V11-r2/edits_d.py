# edits_d: §4, §5, §6, §7, §8, §9, §10b, §12
H4 = "## 4 Editing — table edits, declarations, locality, undo and the clerk's view"
H5 = "## 5 Rendering, labels and exports"
H6 = "## 6 Performance budgets"
H7 = "## 7 Tests and acceptance bars"
H8 = "## 8 Build plan"
H9 = "## 9 Decisions (each vetoable)"
H10b = "### 10b Cross-volume requests"
H12 = "## 12 CONFIRMED versus PLAUSIBLE"

T46 = ("| T-V11-46 | item 122's rows (takes T122-4): (a) the closed mapping — every word of the catalogue manifest's "
       "`sf.stressors@<line>` list has its `stressor` row and every word of its `sf.conditionArchetypes@<line>` list its "
       "`archetype` row, each naming a live `crisis.looks` kind or `none`, no two rows sharing a `from/key`; (b) "
       "`crisis.looks` holds one row per `CrisisLookKind`; every `scale` pair `lo ≤ hi`, inside its range and non-decreasing "
       "from THORP to METROPOLIS at each end, the camp places' rows in m² and the others' shares in [0, 1]; `lookLevel` on "
       "the `disaster` row only, inside the `ruined` share (V06 §3.23 (2)); the camp looks' priorities in item 122 (c)'s "
       "order, `siege` and `blockade` before `quarantine` before `refugeeCamp`; (c) every `settings` cell inside its range; "
       "(d) no crisis table has a StageId reader (a look only) | 100 % |")
T47 = ("| T-V11-47 | item 123's rows: (a) `damage.elements` holds one row per `DamageElementKind`, each range `0 ≤ lo < hi ≤ 1` "
       "inside the shares of its `states` (V06 §3.23 (2)'s thirds); item 123 (c)'s order — `partition`'s upper end at most "
       "`outerWall`'s lower, `upperFloor`'s lower end at most `groundFloor`'s, each crypt kind's lower end at least each "
       "cellar kind's; (b) every `damage.materials` rate inside its range, `timber_frame`'s above every masonry row's "
       "(`ashlar`, `rubble`, `brick`, `dry_stone`), every walls material of V11 §3.19.3 resolving to its row or the default "
       "row; (c) `defaultAgeYears` inside its range; (d) no damage table has a StageId reader (a drawing only) | 100 % |")
T48 = ("| T-V11-48 | item 124's rows (takes T124-3's compile clause and T124-4's row clause): (a) no snow where winter does "
       "not freeze — no `snow` entry on an arid row, on a row whose winter is `none` or on a row with no `snow` band, no "
       "`snow` or `ice` band on an arid row or one whose winter is `none`, and every other row's `snow` entries inside its "
       "`ice` and `snow` weeks, a hill site's factor included (T124-3; V12 measures the drawn weeks); (b) arid rain — on "
       "every arid row and under every site's factor, `rain` and `drizzle` at most `aridRainMaxPerHour` and in bands "
       "covering at most `aridRainMaxWeeks` weeks, none in any other week (T124-4; V12 measures the replayed frequency "
       "against the row); (c) every band inside 0–51, no two bands of one kind on a row sharing a week, every `perHour` ≥ 0, "
       "every `lengthS` lower end at least twice its kind's fade (§8.4 (i)) and below its upper end, every `hours` inside "
       "[0, 24], every site factor inside its range; (d) no weather cell has a StageId reader (a look only) | 100 % |")

J118 = ("| J-V11.118 | chose item 122's tables as twelve look rows keyed by look kind — the camp looks' scale by rung in m² "
        "of camped ground, each a headcount × 45 m² (a war band of 20–60 at a THORP to a siege army of 5 000–30 000 at the "
        "METROPOLIS cap), the other looks' as a share of their place's units —, one `settings` row holding item 122 (h)'s "
        "rates, display labels on the look rows, and a closed mapping of SettlementForge's own stressor, archetype and "
        "event words, over looks per condition instance or a per-rung table of looks, because item 122 (b) and (c) give one "
        "look per stressor type and archetype scaled by severity and tier, §10.2's shared shape fixes the rows' columns, "
        "V09's Show crises and Find name looks by their words, and a closed mapping lets nothing fall through (T122-4); "
        "`regional_migration_pressure` draws the refugee camp because item 122 (b) names it under mass immigration, the "
        "other `regional_*` pressures `none`; `war_pressure` the siege and `wartime` none; a calamity of the simulator's "
        "calamity kernel the `disaster` look, its pattern by its type; each look's marks are §8.2's, never a cell here "
        "(V11 §3.25.9) |")
J119 = ("| J-V11.119 | chose item 123's thresholds as one range of the decay level per plan element kind — inside the shares "
        "of the existence states whose look item 123 (c) gives it, the upper floor's across `decayed` and `ruined` (rotten "
        "patches and holes, then mostly floorless) — with the decay rate by walls material and the default age in tables of "
        "their own, over ranges by material or the rates as a column of V11 §3.18's decline rows, because item 123 (b) puts "
        "the rate on the material and item 123 (c) the order on the element, and the decline rows are read by model phases "
        "whose recorded slices an edit of a drawing-only cell would invalidate — a different lifecycle, so the two stay "
        "apart (V11 §3.25.10) |")
J120 = ("| J-V11.120 | chose item 124's weather cells as per-kind bands of weeks with spells an hour and a spell length, the "
        "kinds' lengths and starting hours and four site factors in the climate table's `settings` row, and the two hard "
        "rules as compile checks with owner-stamped caps, over a chance per week or a 52-week table per kind, because item "
        "124 (c) asks how often each kind comes and how long it lasts, bands written as transitions turn the weeks gradually "
        "while a zero stays zero (the arid dry months), the sites carry item 124 (c)'s regions no biome row is — coastal, "
        "riverside and lowland, hills and mountains, forest — and fog's cool mornings ride the view's hour (item 124 (d)); a "
        "site's factor never makes a kind a row lacks, so no hill town snows where its climate cannot (V11 §3.25.11) |")

EDITS = [
# ---------------------------------------------------------------- §4
(H4,
 "the largest-crypt bar, T-V11-25), is clamped to the nearest lawful value with the dry run's one-line note (§7.1; item 101\n"
 "R2); only a dangling `ref`, a type error or an owner rule is refused, F-EDIT (§5.2), naming the rule — the one owner rule a\n"
 "table edit can meet is item 110 (b)'s rung gate",
 "the largest-crypt bar, T-V11-25; item 123's range order, T-V11-47 (a); item 124's two hard rules, T-V11-48 (a)–(b): a\n"
 "`snow` entry where no snow may fall clamps to 0, an arid rain cell to its cap), is clamped to the nearest lawful value with\n"
 "the dry run's one-line note (§7.1; item 101 R2); only a dangling `ref`, a type error or an owner rule is refused, F-EDIT\n"
 "(§5.2), naming the rule — the one owner rule a table edit is refused for is item 110 (b)'s rung gate",
 1, ['G123-V11', 'G124-V11']),
(H4,
 "/* per family, × that family's soft terms for the kind's members; hard needs unscaled */",
 "/* per family, × that family's soft terms for the kind's members — a family the cell does not hold\n"
 "    multiplies by 1; hard needs unscaled */",
 1, ['VAH-r1-07']),
(H4,
 "The item-109, item-110 and items 111–119 tables\n"
 "re-derive by V11 §2.10's rows (standing generated structures kept and listed; removals held; the looks of items 117 and 118\n"
 "re-skin only).",
 "The item-109, item-110, items 111–119 and items\n"
 "122–124 tables re-derive by V11 §2.10's rows (standing generated structures kept and listed; removals held; the looks of\n"
 "items 117, 118, 122 and 124 and item 123's damage redraw only).",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §5
(H5,
 "runs by their patch rows' `look`, item 117's season and item 118's decorations by §8.2's rows from V11 §3.25's cells.",
 "runs by their patch rows' `look`, item 117's season, item 118's decorations, item 122's crisis looks and item 124's\n"
 "   weather effects by §8.2's rows from V11 §3.25's cells, and item 123's damage by V03's, V02's and V04's drawings at\n"
 "   V11 §3.25.10's thresholds.",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H5,
 "the season control and the festival list are V09's;",
 "the season control, the festival list, Show crises and the weather switch are V09's;",
 1, ['G122-V11', 'G124-V11']),

# ---------------------------------------------------------------- §6
(H6,
 "| the tables of items 109–119 (V11 §3.23–V11 §3.25) | ≤ 50 KB of the shipped payload together; every lookup O(1) (keyed rows); no budget of their own beyond their reading stages' (§12.4) — the season and festival cells are read per visible tile inside §12.5's re-skin and lazy-decoration budgets, the history cells once per generation | plain rows; the water balance and the burial age a handful of multiplications each |",
 "| the tables of items 109–124 (V11 §3.23–V11 §3.25) | ≤ 70 KB of the shipped payload together; every lookup O(1) (keyed rows); no budget of their own beyond their readers' (§12.4, §12.5) — the season, festival and crisis cells are read per visible tile inside §12.5's re-skin, lazy-decoration and lazy crisis budgets, the weather cells once per spell, the damage rows once per drawn plan, the history cells once per generation | plain rows; the water balance, the burial age and a decay level a handful of multiplications each |",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §7
(H7,
 "the item-110 cells `terrace.slopeMin`, `terrace.stepMinCm`, `viaduct.minDropM` and the deck row,",
 "the item-110 cells `terrace.slopeMin`, `terrace.stepMinCm`, `viaduct.minDropM`, `raisedWays.structure.stripMarginM` (§4.6 S8's strip) and the deck row,",
 1, ['R2-26 (d)']),
(H7,
 "`grandeur.ceiling`, `season.*`, `festival.*`, `perf.qualitySpend`)",
 "`grandeur.ceiling`, `season.*`, `festival.*`, `perf.qualitySpend`, `crisis.looks`, `crisis.map`, `damage.elements`, `damage.materials`)",
 1, ['G122-V11', 'G123-V11']),
(H7,
 "every profile family, good, district kind, patch material and shipped style sheet row has a non-empty `label`,",
 "every profile family, good, district kind, patch material, crisis look and shipped style sheet row has a non-empty `label`, the crisis looks' labels unique,",
 1, ['G122-V11']),
(H7,
 "| T-V11-32 | item 110's rows: (a) `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm`,",
 "| T-V11-32 | item 110's rows: (a) `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm`, `stepMinCm < stepMaxCm ÷ 2` (an intermediate terrace's two walls each above `stepMinCm`, §4.7's step regions),",
 1, ['pipeline r2 hand-off (VEW-r1-04)']),
(H7,
 "**7.4 The owner items 111 and 113–119, the base settings row and the edges.** Each item's behaviour bars are the base's\n"
 "(§13.2's T111–T119 groups)",
 "**7.4 The owner items 111, 113–119 and 122–124, the base settings row and the edges.** Each item's behaviour bars are the\n"
 "base's (§13.2's T111–T119 and T122–T124 groups)",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H7,
 "| T-V11-42 | item 117's rows: every climate row's bands",
 "| T-V11-42 | item 117's rows (takes T117-3): every climate row's bands",
 1, ['VAP-r1-05 (R2-08)']),
(H7,
 "a cell edit of the same row applies | every stated outcome; 0 crashes, 0 whole-map retries |",
 "a cell edit of the same row applies; (t) the crisis tables' edges (an unmapped word, the empty `map` set, a severity outside [0, 1], a headcount of 0, a zero `scale`); (u) the damage tables' edges (levels 0 and 1, a material with no row, a range edited out of its shares); (v) the weather cells' edges (a week with no live kind, a site factor on an absent kind, an edit past a hard rule, a `light` other than `'time'`) | every stated outcome; 0 crashes, 0 whole-map retries |\n"
 + T46 + "\n" + T47 + "\n" + T48,
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §8
(H8,
 "| C4b — the SettlementForge rows | `dossier.kinds` (280), archetypes, category synonyms, keywords, good words, ladders | T-V11-2, 16, 17 and T-V11-37's other clauses on the 155 frozen dossier fixtures (the dossier row sets are not calibratable) | 1.0–1.5 pw |",
 "| C4b — the SettlementForge rows | `dossier.kinds` (280), archetypes, category synonyms, keywords, good words, ladders; item 122's `crisis.map` rows (V11 §3.25.9) | T-V11-2, 16, 17, T-V11-46 (a) and T-V11-37's other clauses on the 155 frozen dossier fixtures and V08's census lists (the dossier row sets are not calibratable) | 1.1–1.6 pw |",
 1, ['G122-V11']),
(H8,
 "| C9 — the rows of items 111 and 113–119 | V11 §3.25: item 111's dry-country cells and the `garden` row; item 113's `history` cells and event rows; item 114's condition cells and patch rows; item 115's ceiling; item 116's margin cell (row 92); item 117's season cells and tables; item 118's festival tables; item 119's empty `perf.qualitySpend` | T-V11-38 – T-V11-44 at the exits of the milestones that build each item's base mechanism (§16's rows for items 111–119: item 111's with S0–S1's oasis and S3's pull; item 113's with V06's E9; item 114's with V06's walls step and §7.7's row; item 115's with S10b's rung ceiling; items 116–118's with §8.8's limit and §8.2's season and decoration rows); the register green (below) | 0.75–1.25 pw |",
 "| C9 — the rows of items 111, 113–119 and 122–124 | V11 §3.25: item 111's dry-country cells and the `garden` row; item 113's `history` cells and event rows; item 114's condition cells and patch rows; item 115's ceiling; item 116's margin cell (row 92); item 117's season cells and tables; item 118's festival tables; item 119's empty `perf.qualitySpend`; item 122's look rows and settings (its `map` rows C4b's); item 123's damage ranges, default age and rates; item 124's weather cells | T-V11-38 – T-V11-44 and T-V11-46 – T-V11-48 at the exits of the milestones that build each item's base mechanism (§16's rows for items 111–119 and 122–124: item 111's with S0–S1's oasis and S3's pull; item 113's with V06's E9; item 114's with V06's walls step and §7.7's DR41; item 115's with S10b's rung ceiling; items 116–118's with §8.8's limit and §8.2's season and decoration rows; items 122 and 124's with §8.2's crisis looks and weather effects at M3b; item 123's with V03's plan step that draws a decayed or ruined plan, V03 §8); the register green (below) | 1.25–2.0 pw |",
 1, ['G122-V11', 'G123-V11', 'G124-V11', 'VAH-r1-19 (R2-11)']),
(H8,
 "| **total** | | | **13.0–18.25 pw** | **§16's first total** carries C0–C3b, C4a, C5–C7 and C9 — 11.25–15.75 pw inside its content line (which also prices presets, symbols and textures): 8.25–10.75 for the rows outside file g and 3.0–5.0 for file g's (C2's g share 1.0–2.0 for items 102, 103, 105 and 107; C4a's 0.5 for item 106; C3b for item 110; C9 for items 111 and 113–119); **§16's staged content line** carries C4b and C8 — 1.75–2.5 pw (the 280 kind rows and items 104 and 108's dossier rows; item 109's rows); file g's rows in all 4.75–7.5 pw (file f items 532, 568; J-V11.117) |",
 "| **total** | | | **13.6–19.1 pw** | **§16's first total** carries C0–C3b, C4a, C5–C7 and C9 — 11.75–16.5 pw inside its content line (which also prices presets, symbols and textures): 8.25–10.75 for the rows outside file g and 3.5–5.75 for file g's (C2's g share 1.0–2.0 for items 102, 103, 105 and 107; C4a's 0.5 for item 106; C3b for item 110; C9 for items 111, 113–119 and 122–124); **§16's staged content line** carries C4b and C8 — 1.85–2.6 pw (the 280 kind rows, items 104 and 108's dossier rows and item 122's mapping; item 109's rows); file g's rows in all 5.35–8.35 pw (file f items 532, 568; J-V11.117) |",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H8,
 "V12 §3.11's lines cover file g's rows (items\n102–119). The tables",
 "V12 §3.11's lines cover file g's rows. The tables",
 1, ['R2-07']),
(H8,
 "`climate`'s columns but `rainMmPerYear` (row 43);",
 "`climate`'s columns but `rainMmPerYear`, the enumeration `farmLayout` and file g's cells (row 43; its `dry`, `seasons` and `weather` cells and its `settings` row are V12 §3.11's g lines);",
 1, ['VAF-R1T-02', 'G124-V11']),
(H8,
 "and `retaining` lines). The words are ≈ 0.1 pw",
 "and `retaining` lines); row 80's `stripMarginM`, the under-deck strip's margin §4.6 S8 reads, ships with item 110's rows at\n"
 "C3b, its entry the `raisedWays.structure` line. The words are ≈ 0.1 pw",
 1, ['R2-26 (d)']),
(H8,
 "C4b needs V08's adapter and the frozen fixtures, C4a the base's item-106 arc classification at M2b;",
 "C4b needs V08's adapter, the frozen fixtures and, for item 122's mapping, V08's census lists in the catalogue manifest; C4a the base's item-106 arc classification at M2b;",
 1, ['G122-V11']),

# ---------------------------------------------------------------- §9
(H9,
 "and §16 places each price in one line only — C4a in the first total, C4b with C8 on the staged content line (V11 §8) |",
 "and §16 places each price in one line only — C4a in the first total, C4b with C8 on the staged content line (V11 §8) |\n"
 + J118 + "\n" + J119 + "\n" + J120,
 1, ['G122-V11', 'G122h-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §10b
(H10b,
 "| X-V11-7 | V02 | `deck.fallbackM2` and `deck.fallbackFloors` are read only while the `deck` table is unregistered | V02 §3.16 (2) |\n",
 "",
 1, ['VAF-R0S-13', 'VV12-r1-07 (R2-15)']),
(H10b,
 "an unwalled side names its barrier row and `arcKind` | V10 §2.13, V10 §4.1 |",
 "an unwalled side names its barrier row and `arcKind` | §11.2 (`WhyPull`), V10 §4.1 |",
 1, ['VAH-r1-10 (R2-10)']),

# ---------------------------------------------------------------- §12
(H12,
 "the registry holds 107 rows (1–106\nand 58a);",
 "the registry holds 111 rows (1–110\nand 58a); the closed crisis mapping holds a row for each of the fifteen stressor types and the twenty-two condition\narchetypes the port's research lists (`research/sf/dossier-model.md` §11, `research/sf/mapping.md` row 70);",
 1, ['G122-V11', 'G123-V11']),
(H12,
 "  items 111–119's cells (V11 §8);",
 "  items 111–119 and 122–124's cells (V11 §8);",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H12,
 "* items 111 and 113–118 are no-ops at their off forms (T-V11-38 – T-V11-43) and the arid water pull shows in the siting\n"
 "  of wells and gardens (T-V11-38).",
 "* items 111 and 113–118 are no-ops at their off forms (T-V11-38 – T-V11-43) and the arid water pull shows in the siting\n"
 "  of wells and gardens (T-V11-38);\n"
 "* item 122's scales read as the owner's \"a hamlet gets a war band's camp, a city a full siege line\" and 45 m² a head as\n"
 "  item 122 (h)'s camped ground (V12's item-122 measurements); item 123's ranges show each state's look of item 123 (c)\n"
 "  at the default rates and age; item 124's rates give a few minutes clear between spells in a wet week and an arid map\n"
 "  clear most of the year (V12's item-124 bars).",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
]
