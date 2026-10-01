"""edits_e — new design of items 121–126 in V12 §6 (budgets), §7 (T-V12-37's planted cases; T-V12-53 – T-V12-59; §7.2),
§8 (placement, W7, the total), §9 (J-V12.99 – J-V12.106; J-V12.87 amended), §10 (hand-offs both ways) and §12."""

ROWS_6 = (
    "| item 121's measurements (the `resolution.*` statistics on V09's app harness over three device fixtures and §12.5's "
    "reference views at every rung's top and the cap: the scripted Auto sessions, the threshold fixture, the captures at every "
    "level, the ultra tier's 4K view) and `item121.display` | inside §13.8's timing phase, ≤ 20 min wall per milestone run; the "
    "pin ≤ 2 CPU-min nightly | M4 (§16) | the rungs alternate milestone runs; the 5K and 8K fixtures at milestones only |\n"
    "| item 122's measurements (the `crisis.*` statistics over the crisis fixtures' weeks and sweeps and the force fixtures) "
    "and `item122.crises`; the looks' raster timing | ≤ 10 CPU-min nightly; the raster timing inside §13.8's timing phase | "
    "M3b (the previews); M-SF (the dossier crisis and force fixtures) (§16) | "
    "every fourth week nightly, all 52 at milestones |\n"
    "| item 123's measurements (the `damage.*` statistics: 21 levels per building of the damage fixtures; H-100's decay runs "
    "from M6-E) and `item123.damage` | ≤ 5 CPU-min nightly | the V03 step that draws a decayed or ruined plan; M6-E (§16) | "
    "every fourth level nightly, all 21 at milestones |\n"
    "| item 124's measurements (the `weather.*` statistics over every climate row's 52 weeks, the simulated clocks, the "
    "captures and the frame timer) and `item124.effects` | ≤ 10 CPU-min nightly; the frame cost inside §13.8's timing phase "
    "| M3b (§16) | the climate rows alternate nights |\n"
    "| item 125's measurements (`port.fallbacks` on the required-keys dossier at TOWN, CITY and the cap) and `item125.host` "
    "| ≤ 3 CPU-min nightly | M-SF (§16) | — |\n"
    "| item 126's measurements (the tools' touch scripts at 600 × 480, the resize script) and `item126.resize` | ≤ 5 min wall "
    "nightly on V09's app harness | M2a (§16); every tool's script from M3a | the tools' scripts alternate nights |")

ROWS_7 = (
    "| T-V12-53 | **Item 121's measurements** (takes T121-2, T121-3, T121-5, T121-6 and T121-8). On the threshold fixture a "
    "loop planted without its 10-second spacing fails `resolution.changes` (two changes in one window) and one planted to "
    "apply a change mid-pan fails it (a change during a gesture); a planted load holding the reference device's p95 over "
    "16.7 ms under Auto fails `resolution.p95`; a planted label glyph composed into the base tile at a tile DPR below the "
    "device's ratio fails `resolution.textPx` at that level; a planted export reading the tile DPR fails `item121.display`; a "
    "planted ultra-tier canvas over 512 MB, or a light rung given up at native 4K, fails `resolution.ultra4k`; the 5K and 8K "
    "fixtures draw at their 4K-equivalent DPR with `resolution.textPx` 0; a device below the low tier is reported, never "
    "gated | C | M4 (§16) |\n"
    "| T-V12-54 | **Item 122's measurements** (takes T122-1, T122-2, T122-3, T122-5, T122-6 and T122-7). `item122.crises` "
    "holds on its suites; a planted look drawn with Show crises off fails it and one drawn with no condition and no preview "
    "fails its tiles; `crisis.weeks` fails a planted look drawn one week past its `untilWeek` and one drawn for a condition "
    "whose `untilWeek` is not after its `sinceWeek`; `crisis.stable` fails a planted unkeyed draw (two opens differ); "
    "`crisis.scale` fails a planted CITY camp smaller than the TOWN one at equal severity and a camp shrinking as severity "
    "rises; `crisis.blocked` fails a planted tent in a gate's passage and one on water; `time.crisisReskin` fails a planted "
    "re-raster of every cached tile at a week crossing a condition's edge | C | M3b (the previews); M-SF (the dossier crisis "
    "fixtures) (§16) |\n"
    "| T-V12-55 | **Item 122 (h)–(i)'s own bars.** On V08's force fixtures `crisis.areaPerHead` lies in [0.9, 1.1] for every "
    "army and group and fails a planted camp sized by severity where a headcount is given; `crisis.coalition` lies in "
    "[1.8, 2.2] and fails a planted coalition drawn as one army's camp; `crisis.framing` fails a planted opening view leaving "
    "a camp out, a limit not restored in the first week no look stands and a moved view re-framed when a look begins; on the "
    "60 000-head THORP siege `crisis.ring` finds every remainder's arc, and the frame, the margin, the model digest and the "
    "hash equal those of the same document with no condition | C | M3b (the framing on previews); M-SF (the headcounts) "
    "(§16) |\n"
    "| T-V12-56 | **Item 123's measurements** (takes T123-2, T123-3 and T123-7). On the damage fixtures `damage.nested` is 0 "
    "over the 21 levels and fails a planted threshold re-drawn per level (an element damaged at 0.4 and whole at 0.45); "
    "from M6-E it is 0 over H-100's decay runs' weeks; `damage.breakLevel` fails a planted threshold keyed by a draw counter "
    "(a regeneration moves an element's level); `item123.damage` holds the never-decayed control and the underground's "
    "bands and fails a planted rubble stipple drawn on every building | C | the V03 step that draws a decayed or ruined plan "
    "(V03 §8); M6-E for the decay runs (§16) |\n"
    "| T-V12-57 | **Item 124's measurements** (takes T124-1 – T124-4 and T124-6 – T124-9). `item124.effects` holds on its "
    "suites and fails a planted spell that re-rasters a tile and one that writes a view key; `weather.frameMs` reports each "
    "kind's densest p95 and fails a planted density four times the row's on the reference device; `weather.snow` fails one "
    "planted snowflake on an `arid` row; `weather.aridRain` fails a planted arid row whose showers come ten times too often "
    "and one raining in a dry week; `weather.cover` fails a planted drop drawn over a label; `weather.luma` fails a planted "
    "lightning flash and a shower fading in over 0.2 s; `weather.replay` fails a planted spell drawn from the host's clock "
    "| C | M3b (§16) |\n"
    "| T-V12-58 | **Item 125's measurements** (takes T125-1 and T125-2). On the required-keys dossier `port.fallbacks` is 0 "
    "at TOWN, CITY and the cap and fails a planted used field read with no fallback report and a planted stage left without "
    "output; with no stamped tick the clock starts at week 0, the year position at midsummer (week 19); `item125.host` holds over B-DOSSIER-lite and the "
    "required-keys dossier and fails a planted host week read into the clock and a planted `audience` read into a stage | C "
    "| M-SF (§16) |\n"
    "| T-V12-59 | **Item 126's measurements** (takes T126-1's medium-minimum clause and T126-2). `layout.touch` is 0 at "
    "600 × 480 and fails a planted tool whose canvas script needs a hover; `layout.belowMedium` is 0 over the resize script "
    "and fails a planted narrow layout below 600 × 480, a tool greyed there and a page that does not scroll; "
    "`item126.resize` fails a planted view re-framed by a resize and a selection it clears; the fixture registry holds no "
    "viewport but the resize script's sizes (no phone viewport) | C | M2a (§16); each tool's script from the milestone that "
    "lands it, every tool from M3a |")

ROWS_9 = (
    "| J-V12.99 | chose to prove items 121 – 126's \"changes nothing\" clauses on the one pin engine — the `view` kind widened "
    "to a device setting and the window's size (`resolution`, `effects`, `viewport`, beside `crises`) with three clauses "
    "(`exports`, `cache`, `session`), and two kinds added, `entityScope` for item 123's never-decayed buildings and `input` "
    "for item 125's host context — over a pin engine per item or one-off comparisons, because each is the same landing gate, "
    "off-state set and re-recording rule over another invariant: a device setting, a crisis display and a resize are values "
    "a document is opened under as a week is; never-decayed buildings are a subset of entities as a rung pin's rungs are a "
    "subset of seeds; a host context is an input a dossier is generated under |\n"
    "| J-V12.100 | chose to measure item 121 on three device fixtures in the timing phase — the gesture and 10-second counts "
    "on a threshold fixture whose p95 straddles the loop's two tests, Auto's p95 against the tier's budget, a text-layer "
    "pixel test against the same view at the device's ratio and the ultra tier's native-4K memory read by §12.8 — leaving "
    "the default, the honoured-or-said manual level and the pixel-ratio change to V09's T-V9-84, over an average frame time "
    "or a capture of the chip, because item 121 (h)'s clauses are properties and budgets a loop breaks only at its "
    "thresholds and a label softens only where the text layer is skipped |\n"
    "| J-V12.101 | chose to measure item 122 by its pin and four 0-by-rule statistics, on previews from M3b and on V08's "
    "dossier crisis fixtures from M-SF, and item 122 (h)–(i)'s four bars as this volume's own on force fixtures — the camped "
    "ground per head within 10 % of `areaPerHeadM2`, a two-army coalition within 10 % of twice one army, every camp inside "
    "the opening view, Fit and the limit while a look stands, and item 116's limit back in the first week none stands — over "
    "a count of drawn tents or a panel, because the owner's bars are proportions and containments the placement keeps or "
    "breaks, and a look's scale is its row's, which the bars check the drawing follows, never its value |\n"
    "| J-V12.102 | chose to measure item 123's monotone and same-level clauses over a level sweep in 0.05 steps on fixtures "
    "of every element kind and state — §6.3's one comparison evaluated at each level, never a test-only plan — and over "
    "V06's decay runs from M6-E, and its no-op clause by an `entityScope` pin on never-decayed buildings, leaving the ids, "
    "the restoration, the exterior and the battle maps to V03, V04, V06 and V02, over a pin on whole suites, because a "
    "damaged building's drawings must change while every other building's must not, and the sweep reaches every threshold "
    "before the decay level is built |\n"
    "| J-V12.103 | chose to measure item 124 over every climate row's 52 weeks at a testkit session seed and the harness's "
    "clock, the arid rain frequency over a simulated clock long enough for 50 expected spells (a Poisson count within three "
    "standard errors), the photosensitivity clause as a per-frame luminance trace against §8.4 (i)'s limit, and the "
    "\"changes nothing\" clauses by a `view` pin with its `cache` and `exports` clauses, over sampled sessions on the host's "
    "clock, because the timeline is a pure function of its seed and clock, rare showers need a long clock to be counted, and "
    "a flash is a frame-to-frame property |\n"
    "| J-V12.104 | chose to measure item 125 by a full-map count on the required-keys dossier — every used, absent field "
    "reported with its fallback, every stage with its output — and an `input` pin over B-DOSSIER-lite and that dossier with "
    "and without each fixture `HostContext`, leaving the static check of the adapter's reads to V08, over a comparison of "
    "selected outputs, because \"the identical document and hash\" is a whole-document property and the fallbacks' reports "
    "are what the owner's \"our map code supplements\" leaves to check |\n"
    "| J-V12.105 | chose to measure item 126 at the medium class's minimum — every tool's touch script at 600 × 480 and a "
    "resize script across it under a `view` pin holding the document, the view key and the selection — with no phone "
    "viewport in any fixture, over a test of a narrow class, because item 126 (a2) designs nothing for a phone and its bar is "
    "the medium layout held below the threshold |\n"
    "| J-V12.106 | chose to let items 122, 123 and 124's look cells take the default line and to keep items 121, 124 and "
    "126's ladder, ceilings, loop thresholds, frame cost and window minimum outside the register as engineering constants, "
    "over named register lines, because these items' bars check that the drawing follows the cells, never their values, "
    "and the constants are confirmed by their own bars (T121-2, T121-3, T121-8, T124-2, T126-2) under D-18 |")

ROWS_103 = (
    "| V09 §7 (T-V9-84) | T121-5's pixel captures taken on V09's harness for this volume | V12 §3.15.11 "
    "(`resolution.textPx` reads them) |\n"
    "| V04 §7 (T-V4-82 (g)) | the `item123.damage` pin over the underground's bands and per-band exports | V12 §2.13's row; "
    "V12 §3.7.8's list |\n"
    "| the base's §10.2 *Crisis looks* (i) | V12's item-122 (h)–(i) measurements beside T122-1 – T122-7 | V12 §3.15.12 "
    "(T-V12-55) |\n"
    "| V06 §7 (T-V6-75, T-V6-76) | T122-1's hand-over clause and T123-4's epoch clause run on V06's engine | V12 §3.15.12 and "
    "V12 §3.15.13 name them as V06's |")


def apply(sub, after_line):
    # ---- §6 -----------------------------------------------------------------------------------------------------------------
    after_line('G121-G126 §6 rows',
               "| item 120's statistics (`find.*` on V09's app harness",
               ROWS_6)

    # ---- §5.2: the pin report prints the new kinds -------------------------------------------------------------------------
    sub('G121-G126 §5.2 plat noop report',
        "and `plat noop --html` each pin's suites with byte-identity per stage (per week, festival or rung for the view and rung\n"
        "pins)",
        "and `plat noop --html` each pin's suites with byte-identity per stage (per week, festival, chip set, crisis display,\n"
        "level, spell, size or rung for the view and rung pins; per building for the entity pin; per host context for the input\n"
        "pin)")

    # ---- §7.1 ---------------------------------------------------------------------------------------------------------------
    sub('G121-G126 T-V12-37',
        "a planted chip-dependent model write or log entry fails `item120.find`; registration refuses an empty overlay, a rung "
        "pin without rungs, a view pin without values and an unregistered suite |",
        "a planted chip-dependent model write or log entry fails `item120.find`, a planted Resolution-dependent export byte "
        "fails `item121.display`, a planted look drawn with no condition and no preview fails `item122.crises`' tiles, a planted "
        "damaged element on a never-decayed building fails `item123.damage`, a planted tile re-raster during a spell fails "
        "`item124.effects`, a planted `HostContext` field read into the document fails `item125.host`, a planted view-key change "
        "on a resize below 600 × 480 fails `item126.resize`; registration refuses an empty overlay, a rung pin without rungs, a "
        "view or input pin without values, an entity-scope pin without its entities and an unregistered suite |")
    sub('G121-G126 T-V12-35 conformance list',
        "except a clause on the registry's `conformance` list (§13.2's conformance clauses of items 105 – 118 and 120, V12 §1)",
        "except a clause on the registry's `conformance` list (§13.2's conformance clauses of items 105 – 118 and 120 – 126,\n"
        "V12 §1, V12 §3.15)".replace("\n", " "))
    sub('R2-35 T-V12-52 head',
        "| T-V12-52 | **Item 120's measurements (Find).** `item120.find` holds",
        "| T-V12-52 | **Item 120's measurements (Find)** (takes T120-1 and T120-6; its statistics measure T120-2 – T120-5, whose "
        "interface clauses V09's T-V9-83 takes). `item120.find` holds")
    after_line('G121-G126 T-V12-53-59',
               "| T-V12-52 | **Item 120's measurements (Find)**",
               ROWS_7)
    sub('G121-G126 §7.2',
        "The owner's later rules (items 110–120) have no reference at all: their bars are\n"
        "ours only — the conformance clauses, the tendency and property specs, the known-city fixtures, the pins, the M4-110 group and item 120's Find statistics — and",
        "The owner's later rules (items 110–126) have no reference at all: their bars are\n"
        "ours only — the conformance clauses, the tendency and property specs, the known-city fixtures, the pins, the M4-110 group\n"
        "and the statistics of items 120 – 126 — and")

    # ---- §8 -----------------------------------------------------------------------------------------------------------------
    sub('R2-32 R2-36 §8.1',
        "M4. The harness parts of items 111–120 land with the milestones that land each item's base part (§13.8's schedule;\n"
        "item 120's with the milestone that lands Find, V09 §8; V12 §3.15).",
        "M4. The harness parts of items 111–126 land with the milestones that land each item's base part (§13.8's schedule;\n"
        "items 120 – 126's as §16 places them, J122: Find at M5, item 121 at M4, items 122 and 124 at M3b with item 122's dossier\n"
        "and force bars at M-SF, item 123 with V03's damaged-plan step and V06's level at M6-E, item 125 at M-SF, item 126 at\n"
        "M2a; V12 §3.15).")
    sub('G121-G126 R2-32 §8.2 W7 head',
        "| W7 — the owner rules 111–120 and the edges | M1 (item 111's rate specs and pin;",
        "| W7 — the owner rules 111–126 and the edges | M1 (item 111's rate specs and pin;")
    sub('G121-G126 R2-32 §8.2 W7 milestones',
        "M2b (`T111d.walk`, `T111d.rich`;",
        "M2a (item 126's `layout.*` and `item126.resize`); M2b (`T111d.walk`, `T111d.rich`;")
    sub('G122 G124 §8.2 W7 M3b',
        "M3b (the style line; items 117 and 118: the view pins, T117-2, the `T117i.*` specs on `{ week }` steps, T118-2 – "
        "T118-6);",
        "M3b (the style line; items 117 and 118: the view pins, T117-2, the `T117i.*` specs on `{ week }` steps, T118-2 – "
        "T118-6; item 122's previews, its `crisis.*` statistics there and `item122.crises`; item 124's `weather.*` and "
        "`item124.effects`); M4 (item 121's `resolution.*` and `item121.display`); the V03 step that draws a decayed or ruined "
        "plan (item 123's `damage.*` sweep and `item123.damage`);")
    sub('G123 R2-32 §8.2 W7 M6-E and M5',
        "item 114's step specs over epochs, the advance's and the replay's total timing); the milestone that lands Find (V09 §8: "
        "`item120.find`, `find.*`, the Find timings); the release candidate (`plat calibrate register --trial`) |",
        "item 114's step specs over epochs, the advance's and the replay's total timing; `damage.nested` over V06's decay runs); "
        "M5 (Find: `item120.find`, `find.*`, the Find timings); M-SF (item 122's dossier crisis and force fixtures with item "
        "122 (h)–(i)'s bars; item 125's `port.fallbacks` and `item125.host`); the release candidate (`plat calibrate register "
        "--trial`) |")
    sub('G121-G126 §8.2 W7 content, exit and price',
        "so W7 prices items 114–119's specs and pins, the `exactScript` author and week steps, the `rungScope` and `view` pin "
        "kinds, the wait timer and the edge suite | T-V12-42 – T-V12-50 and T-V12-52, each at its milestone | 0.75–1.25 |",
        "so W7 prices items 114–119's specs and pins, the `exactScript` author and week steps, the `rungScope` and `view` pin "
        "kinds, the wait timer and the edge suite (0.75–1.25), and items 121 – 126's measurements: the `entityScope` and "
        "`input` pin kinds and the `view` kind's device and window values, item 121's device fixtures, threshold fixture and "
        "captures, item 122's crisis and force fixtures and placement reads, item 123's level sweep, item 124's climate-row "
        "sweeps and simulated clocks, item 125's required-keys runs and item 126's touch and resize scripts (0.5–0.75) | "
        "T-V12-42 – T-V12-50 and T-V12-52 – T-V12-59, each at its milestone | 1.25–2 |")
    after_line('G121-G126 §8.2 total line',
               "| M-CAL/<layer> — the later corpus runs (staged) |",
               "\n**The total.** The base side, W1 – W7: 7.25–11 pw (W1 – W6 6–9; W7 1.25–2), priced on §16's rig line; M-CAL\n"
               "4.75–8 pw and each later corpus run 0.25–0.75 pw, staged.")

    # ---- §9 -----------------------------------------------------------------------------------------------------------------
    sub('J-V12.99 amends J-V12.87',
        "| J-V12.87 | chose one `NoOpPin` engine",
        "| J-V12.87 | *amended by J-V12.99.* chose one `NoOpPin` engine")
    after_line('G121-G126 §9 rows',
               "| J-V12.98 | chose to key every base bar this volume registers as a `BenchBarDef` by its §13.2 id",
               ROWS_9)

    # ---- §10 ----------------------------------------------------------------------------------------------------------------
    sub('G122 G122h G125 X-V12-5',
        "and a dossier fixture's institution names item 120 (b)'s list entries (V12 §3.15.10); none a calibration seed family "
        "| V08 §7 |",
        "a dossier fixture's institution names item 120 (b)'s list entries (V12 §3.15.10), its crisis fixtures (conditions "
        "standing through part of the year with their severities, the calamities' targets) and force fixtures (single armies, "
        "a two-army coalition, a migrant group, an oversized siege) items 122's and 122 (h)–(i)'s (V12 §3.15.12), and its "
        "required-keys dossier item 125 (e)'s (V12 §3.15.15); none a calibration seed family | V08 §7 |")
    sub('G123 X-V12-11 (V04)',
        "T-V3-34, T-V4-47, T-V4-69, T-V4-77 (d), T-V5-15,",
        "T-V3-34, T-V4-47, T-V4-69, T-V4-77 (d), T-V4-82 (g), T-V5-15,")
    after_line('G121-G126 X-V12-20',
               "| X-V12-19 | V04, V06, the base |",
               "| X-V12-20 | V09 | the app harness runs V12 §3.15.11 – §3.15.16's fixtures: the device fixtures with T121-5's "
               "captures, the crisis previews' and the weather fixtures' sessions, the touch scripts and the resize script at the "
               "medium class's minimum | V09 §7 (T-V9-22, T-V9-84, T-V9-85, T-V9-87) |")
    after_line('G121-G126 §10.3 rows',
               "| V11 X-V11-17 (f) | the span-rule line cites row 80's `structure.span`;",
               ROWS_103)

    # ---- §12 ----------------------------------------------------------------------------------------------------------------
    sub('G121-G126 §12 CONFIRMED',
        "as were items 102–120 (item 119 (a2) and item 120 with their dated routings, J132, J133),",
        "as were items 102–126 (item 119 (a2), items 120 – 126 and item 122 (h)–(i) with their dated routings, J132 – J140, and\n"
        "the canon's ruling of 2026-10-01 on their shared names, bar ids and milestones),")
    sub('G121-G126 §12 PLAUSIBLE 5',
        "   raised-way level); the item-111–120 counts (200 towns per cell, ≥ 200 per rate, ≥ 100 towns for `most`, five\n"
        "   seeds per wait kind, three Find chip sets per seed);",
        "   raised-way level); the item-111–126 counts (200 towns per cell, ≥ 200 per rate, ≥ 100 towns for `most`, five\n"
        "   seeds per wait kind, three Find chip sets per seed, the 120-second Auto session, the 0.05 level step, the force\n"
        "   fixtures' headcounts, 50 expected spells per arid band, the resize script's sizes);")
    after_line('G121-G126 §12 PLAUSIBLE 14',
               "   for the progress view, and that three chip sets per seed reach every match kind item 120 (b) lists (V12 §3.15.10).",
               "14. That V09's app harness drives the Auto loop on device fixtures standing for the reference, low-end and ultra-tier\n"
               "   devices and captures the text layer at each level (T-V9-84); that a threshold fixture straddling the loop's two\n"
               "   tests can be built from a view's layers and lighting; that §10.2's placement exposes each camp's faces and ring\n"
               "   remainder to `crisis.areaPerHead`; that a 0.05 level step reaches every element kind's threshold range; that a\n"
               "   simulated weather clock reaches 50 arid rain spells per band inside the nightly budget; that V08's force fixtures\n"
               "   can be authored before item 125 (d)'s final check confirms SettlementForge's force fields — a field it names\n"
               "   differently changes the fixture, never the bar (V12 §3.15.11 – §3.15.16).")
