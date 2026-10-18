"""edits_c — new design of items 121–126 in V12 §3.4 (the metric rows and the preset sentence), §3.11 (how the items'
cells enter the register; the engineering constants) and §3.12 (their failure rows)."""


def apply(sub, after_line):
    # ---- §3.4.2: the metric rows of items 121–126 ---------------------------------------------------------------------------
    after_line('G121-G126 §3.4.2 rows',
               "| `find.matches`, `find.leaks`, `find.held`, `find.pins`, `find.cues` |",
               "| `resolution.changes`, `resolution.p95` | timing | — | on V09's app harness under Auto (V12 §3.15.11): over a "
               "scripted session of pans, zooms and drags with a settle after each, on the fixture loaded at its threshold, the "
               "level changes applied during a gesture and the most applied in any 10 s window (counts); Auto's rolling frame-time "
               "p95 (ms) over §12.5's reference views on the reference and low-end devices, against the tier's frame budget (§12.5) "
               "| — (ours) | item 121 (h): T121-2, T121-3 (V12 §3.15.11) |\n"
               "| `resolution.textPx`, `resolution.ultra4k` | render / timing | f | at each level — Auto's rungs and each manual "
               "level — on a device fixture of pixel ratio 2, the pixels of the label glyphs and halos, the chrome and the overlay "
               "marks inside their boxes that differ from the same view drawn at the device's ratio, in V09's captures (0 by rule); "
               "on an ultra-tier device fixture holding a native-4K view lit at full precision over §12.5's reference views, a "
               "vector: the canvas memory §12.8's measurement reads ÷ the tier's 512 MB ceiling (≤ 1), and the light rungs given "
               "up (0) | — (ours) | T121-5, T121-8 (V12 §3.15.11) |\n"
               "| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked` | render / model (DR44's standing looks and "
               "§10.2's placement) | f | on the crisis fixtures (V12 §3.15.12): per look, the weeks it draws against its "
               "condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted; per seed, the look's tiles in the view "
               "against a picture export at the same stop and against a second open of the document, differing tiles counted; "
               "over a rung sweep at one severity and a severity sweep (0, ¼, ½, ¾, 1) at each rung, the steps at which a look's "
               "drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls; "
               "look marks on water, a way's carriageway, a gate's passage or a label's keep-out — each 0 by rule | — (ours) | "
               "item 122 (g): T122-2, T122-3, T122-5, T122-6 (V12 §3.15.12) |\n"
               "| `time.crisisReskin`, `crisis.rasterShare` | timing | — / f | in §12.1's timing phase on the golden views of every "
               "family at every rung with the crisis fixtures (V12 §3.15.12): the re-skin time of the visible tiles at a change of "
               "the crisis display and at the drawn week crossing a condition's edge, against §12.5's settle bound; the looks' share "
               "of a tile's raster time, against §12.5's 20 % | — (ours) | §12.10's R12-37 (V12 §3.15.12) |\n"
               "| `crisis.areaPerHead`, `crisis.coalition`, `crisis.framing`, `crisis.ring` | model (§10.2's placement, §2.9's "
               "crisis framing) / render (the ring's arcs) | f | on the force fixtures (V12 §3.15.12): per army or group with a "
               "dossier headcount h, its camped ground — its camp's faces, plus any remainder on the ring at §8.8's ring density — "
               "÷ (h × `areaPerHeadM2`), within [0.9, 1.1]; a coalition of two armies of h heads against one army of h, the ratio "
               "of their camped ground, within [1.8, 2.2]; while a look stands, the camps outside the opening view, outside Fit's "
               "view and beyond the limit's view, and once none stands the stops by which the limit differs from item 116's and "
               "the moved views re-framed — each 0 by rule; per force too large for the frame and its margin, a remainder with no "
               "arc on the ring at the city band, and any change of the frame, the margin, the model digest or the hash — 0 | — "
               "(ours) | item 122 (h)–(i) (V12 §3.15.12) |\n"
               "| `damage.nested`, `damage.breakLevel` | model (each plan element's §6.3 threshold against the building's decay "
               "level, §2.6 step 7) | f | on the damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1 and, from "
               "M6-E, at every week of V06's decay runs, the elements damaged at a level or a week and undamaged at a higher level "
               "or a later week of the same run (0 by rule); per element, the lowest sweep level at which it shows damaged, "
               "compared across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a "
               "migration, differing elements counted (0) | — (ours) | item 123 (f): T123-2, T123-3 (V12 §3.15.13) |\n"
               "| `weather.frameMs`, `weather.snow`, `weather.aridRain`, `weather.cover`, `weather.luma`, `weather.replay` | "
               "timing / render / model (the weather timeline's spells) | ms / f / share / f / share / f | on V09's app harness "
               "(V12 §3.15.14): the effects layer's frame time at the densest spell of each kind over §12.5's reference view on the "
               "reference and low-end devices, p95; over all 52 weeks of every `arid` climate row and every row whose winter does "
               "not freeze, the frames drawing a falling-snow mark and the tiles drawing lying snow (0 by rule); per `arid` row and "
               "week band, the timeline's rain-spell frequency over a simulated session clock against the row's weather column "
               "(within three standard errors), and its rain spells in the row's dry weeks (0); the label, halo, chrome and overlay "
               "pixels a spell changes (0 by rule); the view's mean relative luminance per frame through each spell's life, its "
               "largest change in any one second against §8.4 (i)'s photosensitivity limit, flashes counted (0); two timelines from "
               "one session seed, clock and set of presses, spells differing in kind, start or length (0) | — (ours) | item 124 "
               "(i): T124-2 – T124-4, T124-6, T124-7, T124-9 (V12 §3.15.14) |\n"
               "| `port.fallbacks` | model (the generation report) | f | on the required-keys dossier (V12 §3.15.15): the fields V08's "
               "field table lists as read that the dossier lacks, each without a report line naming the fallback taken, and the "
               "stages that end with no output — both 0 by rule | — (ours) | item 125 (e): T125-1 (V12 §3.15.15) |\n"
               "| `layout.touch`, `layout.belowMedium` | render (V09's app harness: its layout and frame captures) | f | at the "
               "medium class's minimum, 600 × 480 CSS px, the tools of V09 §4.12's list whose canvas script fails to complete under "
               "touch events; over the resize script, the steps below 600 × 480 at which the map's layout is not the medium layout "
               "at its minimum, a tool is withheld or greyed, or the page does not scroll to every part — each 0 by rule | — (ours) "
               "| item 126 (e): T126-1, T126-2 (V12 §3.15.16) |")

    # ---- §3.4.4: what a render metric draws -----------------------------------------------------------------------------------
    sub('G121-G124 §3.4.4',
        "and items 117 and 118 are looks and item 120 a view: every `render` metric and panel render draws at the standalone\n"
        "default view — midsummer, decorations off, Find off, `cvdVariant` `none` — whatever a document's view state holds (V12 §3.16.2 lists every feature a preset\n"
        "meets).",
        "and items 117, 118 and 122 are looks, item 120 a view and item 123's damage layer a drawing (no measurement input, the\n"
        "model storing none): every `render` metric and panel render draws at the standalone default view — midsummer,\n"
        "decorations off, Find off, crises `off`, `cvdVariant` `none` — whatever a document's view state holds, never draws item\n"
        "124's weather effects and never reads item 121's Resolution setting (V12 §3.16.2 lists every feature a preset meets).")

    # ---- §3.11: items 121–126 in the register --------------------------------------------------------------------------------
    sub('G121-G126 §3.11 after the item table',
        "column; item 116's zoom-out margin stop, item 119's comfort level, item 120's interaction budgets and every time budget\n"
        "are engineering constants outside the register (*The provisional-number lint*), each provenance note naming its\n"
        "confirming bar.",
        "column; item 116's zoom-out margin stop, item 119's comfort level, item 120's interaction budgets and every time budget\n"
        "are engineering constants outside the register (*The provisional-number lint*), each provenance note naming its\n"
        "confirming bar. Items 121 – 126 add no line either. The look cells of items 122, 123 and 124 — item 122's look rows'\n"
        "`scale`, `priority` and `lookLevel` and its settings `densityCap`, `siegeStandoffM`, `areaPerHeadM2`,\n"
        "`enginesPerBesiegers` and `previewSeverity` (§10.2's `RosterTables.crisis`), item 123's threshold ranges by element kind\n"
        "and material, its decay rates by material and its default age, item 124's climate rows' weather columns (V11's rows) —\n"
        "take the default line like item 117's look rows: V12 §3.15's bars check that the drawing follows them, never their\n"
        "values; item 122's `map` rows are a dossier row set and take none. Item 121's ladder, tier ceilings, 4K ceiling and Auto\n"
        "loop thresholds, item 124's frame cost and item 126's medium-class minimum are engineering constants outside the\n"
        "register, each provenance note naming its confirming bar (T121-2, T121-3, T121-8; T124-2; T126-2); item 125 adds no\n"
        "cell (its fallbacks are the generator's own choices).")
    sub('G121 G124 G126 §3.11 the lint',
        "times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level; item 120's interaction budgets) is\n"
        "outside the register: its provenance",
        "times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level; item 120's interaction budgets; item\n"
        "121's ladder, ceilings and Auto loop thresholds; item 124's frame cost; item 126's medium-class minimum) is outside the\n"
        "register: its provenance")

    # ---- §3.12: the failure rows ----------------------------------------------------------------------------------------------
    after_line('G121-G126 §3.12 rows',
               "| a Find chip whose matches differ from the gazetteer's rows;",
               "| Auto changing level during a gesture or more than once in 10 s; Auto's p95 over the frame budget on the reference "
               "or low-end device; a label, chrome or overlay pixel off the device's ratio; an export or the document differing "
               "between Resolution settings; the ultra tier's native-4K view over its 512 MB or giving up a light rung | the "
               "`resolution.*` statistics and `item121.display` (V12 §3.15.11) | none at the harness: a frame or memory miss takes "
               "§12.10's pre-decided change for item 121, a property violation is a code defect fixed before the exit — never a "
               "relaxed bar | the bar fails naming the device, the level, the view and the window or the pixel count |\n"
               "| a look drawn outside its condition's weeks, differing between the view, an export and a second open, shrinking at "
               "a higher severity or rung, or on water, a carriageway, a gate's passage or a keep-out; a camp's ground off its "
               "headcount by more than 10 %; a two-army coalition's ground not twice one army's within 10 %; a camp outside the "
               "opening view, Fit or the limit while a look stands; the limit not restored when none stands; a moved view "
               "re-framed; a force's remainder without its ring arc; a frame, model or hash changed; a re-skin past the settle "
               "bound or looks past 20 % of a tile's raster time | the `crisis.*` statistics, `time.crisisReskin` and "
               "`item122.crises` (V12 §3.15.12) | none at the harness: a raster miss takes R12-37's pre-decided change, a property "
               "violation is a code defect fixed before the exit | the bar fails naming the fixture, the condition, the look and "
               "the week, the force or the tile |\n"
               "| an element damaged at a level or week and undamaged at a higher level or a later week of its decay run; an "
               "element breaking at a different level after a regeneration, a load, an undo or a migration; a never-decayed "
               "building drawn or exported differently | the `damage.*` statistics and `item123.damage` (V12 §3.15.13) | none: a "
               "property | the bar fails naming the fixture, the building, the element and the levels or the lifecycle step |\n"
               "| an effects frame over its cost; snow falling or lying on an `arid` or non-freezing row; arid rain off its row's "
               "frequency or in its dry weeks; a label, halo, chrome or overlay pixel a spell changed; a luminance change past "
               "§8.4 (i)'s limit, or a flash; a timeline that does not replay; a tile re-rastered or an export changed by the "
               "effects | the `weather.*` statistics and `item124.effects` (V12 §3.15.14) | none at the harness: a frame-cost miss "
               "takes §12.10's pre-decided change for item 124, a property violation is a code defect fixed before the exit | the "
               "bar fails naming the climate row, the week, the spell and the frame or pixel count |\n"
               "| on the required-keys dossier a used field absent with no fallback reported, or a stage ending without output; a "
               "document or hash differing with and without a host context | `port.fallbacks` and `item125.host` (V12 §3.15.15) | "
               "none: a property | the bar fails naming the field or the stage, or the host context and the first differing record |\n"
               "| a tool's touch script not completing at 600 × 480; below the medium class a layout other than the medium layout "
               "at its minimum, a tool withheld or greyed, a page that does not scroll, or the document, view or selection changed "
               "by a resize | the `layout.*` statistics and `item126.resize` (V12 §3.15.16) | none: a property | the bar fails "
               "naming the tool or the resize step |")
