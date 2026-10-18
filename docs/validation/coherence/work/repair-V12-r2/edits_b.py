"""edits_b — new design of items 121–126 (G121-V12 … G126-V12, G122h-V12) in V12 §0, §1, §1b, §2.13 and §3.7: the plain
words, the hooks, the wiring rows, the dossier fields read, the six new pins and the two new pin kinds (R2-09's names)."""


def apply(sub, after_line):
    # ---- §0 ---------------------------------------------------------------------------------------------------------------
    sub('G121-G126 §0',
        "recover (item 114), the grandeur ceiling of small places (item 115), the zoom-out limit (item 116), seasons (item 117),\n"
        "festival decorations (item 118) and Find, the view that makes what a user looks for glow on the map (item 120), each get\n"
        "their bars here; colour-blind-safe styles (item 112) get their style check's\n"
        "threshold and the game-master trial's findings in the calibration record; and every one-time wait is timed against its target and the ten-second\n"
        "comfort level (item 119). Turning any owner item's new rules off gives back exactly yesterday's towns, and a season, a\n"
        "festival or a Find view never changes the map itself — both proved by byte-for-byte pins.",
        "recover (item 114), the grandeur ceiling of small places (item 115), the zoom-out limit (item 116), seasons (item 117),\n"
        "festival decorations (item 118), Find, the view that makes what a user looks for glow on the map (item 120), the\n"
        "resolution setting that keeps the map smooth up to 4K (item 121), the camps, cordons and ruins a SettlementForge siege,\n"
        "plague or disaster shows while it lasts, sized by the armies and crowds the dossier counts (item 122), a ruined\n"
        "building's floor plans broken where it decayed (item 123), light passing weather (item 124), the dossier as the map's\n"
        "only input (item 125) and the map on tablets and desktops only (item 126) each get their bars here; colour-blind-safe\n"
        "styles (item 112) get their style check's threshold and the game-master trial's findings in the calibration record; and\n"
        "every one-time wait is timed against its target and the ten-second comfort level (item 119). Turning any owner item's\n"
        "new rules off gives back exactly yesterday's towns, and a season, a festival, a Find view, a crisis look, the weather,\n"
        "the resolution setting, the host around the map or the window's size never changes the map itself, nor does a building\n"
        "that never decayed draw differently — each proved by a byte-for-byte pin.")

    # ---- §1 ---------------------------------------------------------------------------------------------------------------
    sub('G121-G126 §1 built to depth',
        "the harness parts of items 111–120 (V12 §3.15), the game-master trial's findings in the calibration",
        "the harness parts of items 111–126 (V12 §3.15), the game-master trial's findings in the calibration")
    after_line('G121-G126 §1 hooks',
               "| §8.2's style check and variants (item 112); §2.9's view state (items 117, 118, 120); §8.8's zoom-out limit",
               "| §8.8's Resolution setting, ultra tier, 4K ceiling and Auto loop with §8.4 (g)'s order; §12.1's ultra bar, §12.5's "
               "frame budgets and §12.8's canvases per tier (item 121) | item 121's pin and statistics (V12 §3.15.11) |\n"
               "| §2.7's `ConditionOverlay`, §2.9's `crises` key and crisis framing, §7.7's DR44, §10.2's crisis look table and "
               "placement, §8.2's look rows, §8.8's surrounding ring (item 122, with (h)–(i)) | item 122's pin and statistics and "
               "item 122 (h)–(i)'s own bars (V12 §3.15.12) |\n"
               "| §2.6 step 7's damage layer, §6.3's `plan.damage` thresholds, §8.6's drawing and §11.1's battle-map walls (item "
               "123) | item 123's pin and statistics (V12 §3.15.13) |\n"
               "| §2.9's weather effects, §6.1's `view.weather` stream, §8.2's effect marks, §8.4 (i)'s light terms and "
               "photosensitivity limit, §8.8's effects layer, §12.5's frame cost (item 124) | item 124's pin and statistics "
               "(V12 §3.15.14) |\n"
               "| §11.3 – §11.4's host inputs (no data input but the dossier), §7.7's re-sourced DR1, DR3, DR19, DR29 and DR42, "
               "§2.9's week source (item 125) | item 125's pin and statistic (V12 §3.15.15) |\n"
               "| §1's supported devices and §13.4's sessions on tablets and desktops (item 126) | item 126's pin and statistics "
               "(V12 §3.15.16) |")
    sub('G121-G126 §1 out of scope',
        "among them every fixture bar of items 105–118\n"
        "and 120 that is a plain conformance check",
        "among them every fixture bar of items 105–118\n"
        "and 120–126 that is a plain conformance check")

    # ---- §1b: the wiring rows -----------------------------------------------------------------------------------------------
    after_line('G121-G126 §1b rows',
               "| item 120's measurements (3.15.10): `item120.find`, the `find.*` statistics and the Find timings |",
               "| item 121's measurements (3.15.11): `item121.display`, the `resolution.*` statistics | V09's app harness on the "
               "reference, low-end and ultra-tier device fixtures (§12.1's tiers): `AppPrefs.resolution` set by the fixtures, §8.8's "
               "Auto loop and its changes with their reasons, the text-layer captures V09's T-V9-84 takes, §12.8's memory "
               "measurement | the pin's off-state sets; the timing phase's rows; the nightly statistics' C rows; T-V12-53 | §8.8, "
               "§12.1, §12.5, §12.8 |\n"
               "| item 122's measurements (3.15.12): `item122.crises`, the `crisis.*` statistics and item 122 (h)–(i)'s own bars | "
               "§2.9's `crises` key set by the fixtures (`follow`, `off`, each look kind's `preview`); the crisis fixtures' "
               "`ConditionOverlay`s through DR44 and §10.2's placement (V01's `campLand` and `disasterDistricts`, V06's "
               "`frontierFor`); §2.9's crisis framing; §8.8's ring; the force and group sizes V08 reads (from M-SF) | the pin's "
               "off-state sets; the nightly statistics' C rows; the timing phase's rows (R12-37); T-V12-54, T-V12-55 | §2.7, §2.9, "
               "§7.7, §8.2, §8.8, §10.2, §12.5 |\n"
               "| item 123's measurements (3.15.13): `item123.damage`, the `damage.*` statistics | each plan element's §6.3 "
               "threshold against the building's decay level (§2.6 step 7) — at the sweep's levels, and from M6-E through V06's "
               "`decayLevel` over weeks — on V12's damage fixtures | the pin's off-state sets; the nightly statistics' C rows; "
               "T-V12-56 | §2.6, §6.3, §8.6 |\n"
               "| item 124's measurements (3.15.14): `item124.effects`, the `weather.*` statistics | V09's `AppPrefs.weatherEffects` "
               "and **Start a shower now** on V09's app harness; §6.1's `view.weather` stream at a session seed the testkit stream "
               "`weather/<fixture>` fixes; V11's climate rows' weather columns; §8.8's effects layer and the frame timer | the "
               "pin's off-state sets; the timing phase's rows; the nightly statistics' C rows; T-V12-57 | §2.9, §6.1, §8.2, §8.4 "
               "(i), §8.8, §12.5 |\n"
               "| item 125's measurements (3.15.15): `item125.host`, `port.fallbacks` | the required-keys dossier and B-DOSSIER-lite "
               "through the port with no host context and with each fixture's `HostContext` (§11.3 – §11.4); the generation "
               "report's fallback lines | the pin's off-state sets; the nightly statistics' C rows; T-V12-58 | §7.7, §11.3, §11.4 |\n"
               "| item 126's measurements (3.15.16): `item126.resize`, the `layout.*` statistics | V09's app harness: the resize "
               "script over the medium threshold; each tool's canvas script under touch events (V09 §4.12's list) | the pin's "
               "off-state sets; the nightly statistics' C rows; T-V12-59 | §1, §13.4 |")
    sub('R2-11 §1b dossier oasis row',
        "| `oasis_water` on a desert | §7.7's oasis row (DR1) |",
        "| `oasis_water` on a desert | DR40 (the site itself DR1's) |")
    sub('R2-11 §1b dossier readiness row',
        "| the defence `readiness` label | §7.7's wall-condition row (item 114 (d)) |",
        "| the defence `readiness` label | DR41 (item 114 (d)) |")
    sub('R2-40 (1) §1b dossier week row',
        "| the calendar week and season; `traditions` | §7.7's season and festival rows (items 117 (c), 118) | a campaign dossier "
        "opening on its own week; a festival fixture's window | fixture records; the view-invariance pins read them as view "
        "inputs only |",
        "| the stamped ticks — the conditions' `triggeredAt`, the calamities' and the history's ticks, whose latest is a "
        "dossier-bound map's present week (§4.11 *The clock*; item 125 (b)) — and the terrain type (the season's climate row); "
        "`traditions` | DR42, DR43 | a campaign dossier opening on its latest stamped tick's week; a festival fixture's window; "
        "the required-keys dossier, with no tick, opening at the season control's midsummer (item 125 (e)) | fixture records; "
        "the view-invariance pins read them as view inputs only |")
    after_line('G122 G122h G125 §1b dossier rows',
               "| the institutions' names and kinds | DR9, DR24 | item 120 (b)'s list entries on the Find fixtures",
               "| the `activeConditions` and `stressors` (archetype or type, severity, tick and duration) and the calamities' "
               "`targets` | DR44 (DR28 for the calamity's aftermath) | item 122's crisis fixtures: each look in its condition's "
               "weeks, scaled by severity, a disaster's districts by its targets | V08's crisis fixtures in the manifest (M-SF); "
               "read as view inputs only, never a calibration target |\n"
               "| the forces', coalitions' and travelling groups' sizes (in development; item 125 (d)'s final check confirms them) | "
               "DR44 (item 122 (h)) | item 122 (h)–(i)'s area, coalition, framing and ring bars | V08's force fixtures; a size "
               "absent or 0 reads as none given, the scale by severity and tier holding |\n"
               "| only SettlementForge's required keys | each used field's standalone fallback (item 125 (b); V08's field table) | "
               "item 125 (e)'s full-map bar and `item125.host` | the required-keys dossier, V08's fixture in the manifest |")

    # ---- §2.13: the pins ----------------------------------------------------------------------------------------------------
    sub('R2-35 §2.13 bar comment',
        "  bar: string;                            // the owner bar the pin proves: 'T110-7', 'T111-5', 'T113-7', …\n"
        "  kind: 'offForm' | 'rungScope' | 'view';",
        "  bar: string;                            // the owner bar the pin proves: 'T110-7', 'T111-5', 'T113-7', 'T120-1', …\n"
        "  kind: 'offForm' | 'rungScope' | 'view' | 'entityScope' | 'input';")
    sub('G121-G126 §2.13 view field',
        "  view?: { key: 'season' | 'festival' | 'find'; values: string[]; tiles?: true };   // view: the view-state values the model digest and the saved bytes\n"
        "                                          // (the edit log included) are invariant across — weeks; festival displays; Find `off` and each fixture chip\n"
        "                                          // set, with `+gaps` for Show gaps on; `tiles`: also the tiles drawn with the view off — no festival\n"
        "                                          // (item 118 (h)), Find cleared after its chips were on (item 120 (k)) — against the pre-item tile goldens",
        "  view?: { key: 'season' | 'festival' | 'find' | 'crises' | 'resolution' | 'effects' | 'viewport'; values: string[];\n"
        "           tiles?: true; exports?: true; cache?: true; session?: true };\n"
        "                                          // view: the values of one key outside the document — view state (season, festival,\n"
        "                                          // find, crises), device state (resolution, effects: V09's AppPrefs) or the window's\n"
        "                                          // size (viewport, CSS px) — the model digest and the saved bytes (the edit log\n"
        "                                          // included) are invariant across: weeks; festival displays; Find `off` and each fixture\n"
        "                                          // chip set, with `+gaps` for Show gaps on; crises `follow` in every week, `off` and each\n"
        "                                          // look kind's `preview`; Auto and each manual level; the effects off, on with no spell\n"
        "                                          // and each spell kind in force; a resize script's sizes; `tiles`: also the tiles drawn\n"
        "                                          // with the view off — no festival (item 118 (h)), Find cleared after its chips were on\n"
        "                                          // (item 120 (k)), no condition standing and no preview (item 122 (g)) — against the\n"
        "                                          // pre-item tile goldens; `exports`: also every picture, print and battle-map export\n"
        "                                          // byte-identical across the values (items 121 (g), 124 (h)); `cache`: also no cached\n"
        "                                          // tile re-rastered or re-composed across them (item 124 (i)); `session`: the values\n"
        "                                          // stepped through in order in one open session, the view key (§2.9) and the selection\n"
        "                                          // also byte-identical at every step (item 126 (e))\n"
        "  entities?: { kind: 'building'; neverHeld: ('abandoned' | 'decayed' | 'ruined')[] };\n"
        "                                          // entityScope: the entities whose drawings and exports stay byte-identical to the\n"
        "                                          // off-state set at every band and week — item 123's buildings whose lineage never held\n"
        "                                          // those states (decay level 0, §2.6 step 7; §6.3)\n"
        "  input?: { key: 'hostContext'; values: string[] };\n"
        "                                          // input: the values of an input outside the dossier — no host context, and each\n"
        "                                          // fixture's `HostContext` (§11.4) — under which each suite dossier generates one model\n"
        "                                          // digest and identical saved bytes (item 125 (e))")
    after_line('G121-G126 §2.13 rows',
               "| `item120.find` | T120-1 | view (`tiles`) |",
               "| `item121.display` | T121-6 | view (`exports`) | Resolution Auto and each manual level — 4K, 1440p, 1080p, 720p — "
               "on V12's device fixtures (V12 §3.15.11) | the golden suite; V12's display fixtures |\n"
               "| `item122.crises` | T122-1, T122-7 | view (`tiles`) | crises `follow` in every week, `off`, and `preview` of each look "
               "kind of §10.2's table (V12 §3.15.12) | the golden suite; V12's crisis fixtures (the previews from M3b, V08's dossier "
               "crisis fixtures from M-SF) |\n"
               "| `item123.damage` | T123-7 | entityScope | — (`entities`: the buildings whose lineage never held `abandoned`, "
               "`decayed` or `ruined`) | the golden suite; V12's damage fixtures (V12 §3.15.13); the underground's bands and per-band "
               "exports (V04, T-V4-82 (g)) |\n"
               "| `item124.effects` | T124-1, T124-8 | view (`cache`, `exports`) | the effects off, on with no spell, each spell kind "
               "in force, and **Start a shower now** (V12 §3.15.14) | the golden suite; V12's weather fixtures |\n"
               "| `item125.host` | T125-2 | input | no host context; each fixture `HostContext` — an `audience`, `displayNames` and a "
               "`line` (V12 §3.15.15) | B-DOSSIER-lite (base); V12's item-125 fixtures (the required-keys dossier) |\n"
               "| `item126.resize` | T126-2 | view (`session`) | the resize script's sizes: 1 024 × 768, 600 × 480, 599 × 479, "
               "480 × 360 and 1 024 × 768 CSS px (V12 §3.15.16) | V12's layout sessions on V09's app harness |")
    sub('G123 G125 §2.13 registration refuses',
        "pin without rungs, a `view` pin without values, and a suite no owner registers.",
        "pin without rungs, a `view` or `input` pin without values, an `entityScope` pin without `entities`, and a suite no owner\n"
        "registers.")

    # ---- §3.7.6: what each owner item's release shifts ---------------------------------------------------------------------
    sub('G121-G126 §3.7.6',
        "bump. Items 117, 118 and 120 move no model digest: their releases shift only render goldens drawn at a non-default week\n"
        "or festival or with a Find chip on, as declared view shifts (§13.3).",
        "bump. Items 117, 118, 120 and 122 move no model digest: their releases shift only render goldens drawn at a non-default\n"
        "week or festival, with a Find chip on or with a crisis look standing, as declared view shifts (§13.3); item 123 moves no\n"
        "model digest and shifts only the drawings of buildings that are or were abandoned, decayed or ruined (`item123.damage`\n"
        "holding every other), declared the same way; items 121, 124, 125 and 126 shift no golden — device state, a layer in no\n"
        "tile and no export, an input that never reaches the document, the window (their pins, V12 §2.13).")

    # ---- §3.7.8: the list, the kinds and the test ---------------------------------------------------------------------------
    sub('G123 §3.7.8 list (V04)',
        "V04's T-V4-47, T-V4-69 and T-V4-77 (d);",
        "V04's T-V4-47, T-V4-69, T-V4-77 (d) and T-V4-82 (g);")
    sub('G121-G126 §3.7.8 (5)',
        "`item115.off`) requires\n"
        "   its rungs' suites byte-identical across the item's bump, its record naming only the other rungs' seeds. A `view` pin\n"
        "   (items 117, 118 and 120) opens each suite document at every listed view value and requires one model digest (§6.2) and\n"
        "   identical saved bytes, the edit log included, at all of them; with `tiles`, the tiles drawn with the view off — no\n"
        "   festival; Find cleared after its chips were on — equal the pre-item tile goldens (§13.4).",
        "`item115.off`) requires\n"
        "   its rungs' suites byte-identical across the item's bump, its record naming only the other rungs' seeds. A `view` pin\n"
        "   (items 117, 118, 120, 121, 122, 124 and 126) opens each suite document at every listed value — of a view key, a device\n"
        "   setting or the window's size — and requires one model digest (§6.2) and identical saved bytes, the edit log included,\n"
        "   at all of them; with `tiles`, the tiles drawn with the view off — no festival; Find cleared after its chips were on; no\n"
        "   condition standing and no preview — equal the pre-item tile goldens (§13.4); with `exports`, every picture, print and\n"
        "   battle-map export is byte-identical at every value; with `cache`, the tile cache's raster and composition counts stand\n"
        "   unchanged from the first value through the last; with `session`, the values are stepped through in order in one open\n"
        "   session and the view key and the selection are byte-identical at every step too. An `entityScope` pin (item 123's `item123.damage`) requires every entity its `entities` selects — a building\n"
        "   whose lineage never held `abandoned`, `decayed` or `ruined` — drawn and exported byte-identically to its off-state set\n"
        "   at every band and every week of its suites, the set recorded by (3) from the drawings its suites' goldens held before\n"
        "   the item's code landed, or at the landing where those drawings land with it; its record names only the other\n"
        "   entities. An `input` pin (item 125's `item125.host`) generates each suite dossier under each listed value of its input\n"
        "   — no host context, and each fixture `HostContext` — and requires one model digest and identical saved bytes at all\n"
        "   of them.")
    sub('G121-G126 §3.7.8 (6)',
        "a planted chip-dependent model write or log entry fails the Find pin, and a planted TOWN change fails the\n"
        "   rung pin.",
        "a planted chip-dependent model write or log entry fails the Find pin, a planted TOWN change fails the\n"
        "   rung pin, a planted Resolution-dependent export byte fails `item121.display`, a planted look drawn with no condition\n"
        "   and no preview fails `item122.crises`' tiles, a planted damaged element on a never-decayed building fails\n"
        "   `item123.damage`, a planted tile re-raster during a spell fails `item124.effects`' cache clause, a planted\n"
        "   `HostContext` field read into the document fails `item125.host`, and a planted view-key change on a resize below\n"
        "   600 × 480 fails `item126.resize`.")
