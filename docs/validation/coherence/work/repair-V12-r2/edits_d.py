"""edits_d — V12 §3.15 (retitled 111–126; the head with R2-35's ids and R2-36's placement; §3.15.10 without its phone
sheet and with R2-35's ids; the new §3.15.11 – §3.15.16 of items 121–126) and §3.16 (the toggles sentence; edge rows 32–37)."""

S3151116 = """
**3.15.11 Item 121 — the resolution adjuster.** §8.8 builds the Resolution ladder, the 4K ceiling, the ultra tier and the
Auto loop, §8.4 (g) the order of what Auto gives up, §12.1 the ultra tier's bar and §12.8 the canvases per tier; V09 builds
Settings › Display › **Resolution** (`AppPrefs.resolution`), the view-status chip and the fallback line, its T-V9-84 taking
T121-1 (Auto the default on a fresh install), T121-4 (a manual level honoured, or the nearest that fits drawn and said) and
T121-7 (a device-pixel-ratio change re-evaluated at once). This volume measures the other five clauses, from M4 (§16), on
V09's app harness in §12.1's timing phase, on three **device fixtures** — the reference device (its frame budget 16.7 ms),
the low-end device (the low tier, 33.3 ms) and an ultra-tier device (the tier picked by §12.1's bar) — over §12.5's
reference views at every rung's top and the METROPOLIS cap:
* **T121-2, no oscillation** — `resolution.changes`: under Auto, a scripted 120-second session of pans, zooms and drags,
  each followed by a settle, on each device's reference views and on the **threshold fixture** — a CITY view whose layers
  and lighting put its frame-time p95 just over the reference device's budget at one rung and under 60 % of it at the rung
  below, so a loop without its spacing and hold would alternate — gives 0 changes applied during a gesture and at most 1
  in any 10-second window;
* **T121-3, Auto holds the frame budget** — `resolution.p95`: Auto's rolling frame-time p95 over each reference view on
  the reference and the low-end device at most the tier's budget (§12.5), the first 10 seconds after the open excluded
  while the start-up pick stands; a device below the low tier is reported per device (§12.1), never gated;
* **T121-5, labels and chrome at the device's ratio** — `resolution.textPx`: on a device fixture of pixel ratio 2, at each
  of Auto's rungs and each manual level, the view with its labels, chrome and overlays on (Find's halo, the handles, the
  ghost) is captured on V09's harness (T-V9-84 takes the captures) and the pixels inside those marks' boxes compared with
  the same view drawn at the device's ratio: 0 differences — the base tiles may soften, the text layer never;
* **T121-6, exports and the document unchanged** — the pin `item121.display` (`view`, `exports`; V12 §2.13): each suite
  document opened at Auto and at each manual level gives one model digest, identical saved bytes and byte-identical
  picture, print and battle-map exports;
* **T121-8, native 4K on the ultra tier** — `resolution.ultra4k`: on the ultra-tier device holding a native-4K view
  (3 840 × 2 160 device px) lit at full precision, the canvas memory §12.8's measurement reads is at most the tier's
  512 MB and no light rung is given up over the reference views.
A screen above 4K (a 5K and an 8K fixture) is drawn at its 4K-equivalent tile DPR (§8.8's ceiling): `resolution.textPx`
holds there too and the view status names the ceiling as the reason. The ladder, the ceilings and the loop's thresholds
are engineering constants (V12 §3.11); a miss of T121-3 or T121-8 takes §12.10's R12-36 change (the thresholds or the
ultra tier's bar re-declared at the measured values), never a relaxed bar. Item 121 adds no `StatBarSpec` (every clause a property or a budget) and no register line.

**3.15.12 Item 122 — crisis looks, with (h)–(i)'s forces and framing.** The base draws the looks (§2.9's `crises` key and
crisis framing, §7.7's DR44, §10.2's table and placement, §8.2's look rows, §8.8's ring); V08 reads the conditions, the
calamities' targets and the force and group sizes; V11 writes the rows; V06 hands the aftermath to the epoch path; V09
builds Show crises, the preview and the panel's numbers. Of item 122 (g)'s bars, T122-4 (every stressor type and archetype
has its map row) is V11's compile check and V08's census at the pinned baseline, V09's T-V9-85 takes T122-2's interface
clause and V06's T-V6-75 T122-1's hand-over clause; this volume measures the rest on its **crisis fixtures** — from M3b
(§16) each look kind previewed (`crises` `preview`, at `previewSeverity`) on B-CITY-lite's seeds of every rung, an island
town and an unwalled place; from M-SF V08's dossier crisis fixtures — a siege by a two-army coalition, a refugee wave, a
plague with its affected quarter, a famine, a fire, a flood and an earthquake by their calamities, an occupation — each
standing through part of the year (at the village rungs V07's village fixtures, its village test taking T122-5 and T122-6
there):
* **T122-1 and T122-7, a look only** — the pin `item122.crises` (`view`, `tiles`; V12 §2.13): each suite document opened
  under `follow` in every week, `off` and each look kind's `preview` gives one model digest and identical saved bytes, the
  edit log included; with no condition standing and no preview its tiles equal the pre-item tile goldens;
* **T122-2, each look exactly in its condition's weeks** — `crisis.weeks`: through all 52 weeks of the fixture's year and
  across each window's ends — a condition with no `untilWeek` and one whose `untilWeek` is not after its `sinceWeek` among
  them — 0 mismatched weeks;
* **T122-3, byte-stable per seed** — `crisis.stable`: a look's tiles in the view, in a picture export at the same stop
  and in a second open of the document byte-identical per seed (keyed draws, §8.10);
* **T122-5, scaled by tier and severity, and by headcount** — `crisis.scale`: over a rung sweep THORP – the METROPOLIS cap
  at one severity and a severity sweep at each rung, no look's drawn extent falls as the rung or the severity rises; its
  headcount clause is item 122 (h)'s area bar below;
* **T122-6, never on water, a gate's passage or a keep-out** — `crisis.blocked` 0, a way's carriageway included (§10.2
  (d));
* **the looks' raster** (§12.10's R12-37) — `time.crisisReskin` and `crisis.rasterShare` in §12.1's timing phase from
  M3b, on the golden views of every family at every rung with the crisis fixtures: each re-skin within §12.5's settle bound
  and the looks within 20 % of a tile's raster time, a miss taking R12-37's pre-decided change.
**Item 122 (h)–(i)'s four bars are this volume's own** (T-V12-55), from M-SF on V08's **force fixtures** — single armies
of 1 000, 4 000 and 12 000 heads; a coalition of two armies of 4 000 beside one army of 4 000; a migrant group of 3 000;
a 60 000-head siege of a THORP, too large for its frame and margin — the armies, the coalition and the group each at
TOWN, CITY and the METROPOLIS cap:
* **the camped area proportional to headcount within 10 %** — `crisis.areaPerHead` in [0.9, 1.1] for every army and
  group, a ring remainder counted at §8.8's ring density;
* **two armies twice one** — `crisis.coalition` in [1.8, 2.2], each army in its own camp and colours (§10.2 (f));
* **the opening view contains every camp** — `crisis.framing`: while a look stands no camp lies outside the opening view,
  Fit's view or the limit's view (the bounds of town and camps, §2.9; the limit at stop 0 where they do not fit, §8.8),
  the previews' camps included from M3b;
* **the limit restored when the crisis ends** — `crisis.framing`: in the first week no look stands, the limit's stop is
  item 116's (`view.limitStop`'s), a view coarser than it settles to it about its own centre, and a view the user moved
  while the look stood is never re-framed.
Item 122 (i)'s overflow is `crisis.ring`: the 60 000-head siege fills its frame and margin and draws its remainder as
massed marks on the ring at the city band — the panel's full number is V09's (T-V9-85) — the frame, the margin, the model
digest and the hash unchanged. Item 122 adds no `StatBarSpec` (every clause a property of a look) and no register line
(V12 §3.11).

**3.15.13 Item 123 — a ruined building's plans amended, never redrawn.** V03 draws the damage layer over the one plan
(§2.6 step 7, §8.6), its exports and panel lines; §6.3 keys each element's threshold (`plan.damage`); V06 derives the decay
level (`decayLevel`, from M6-E; before it a building reads its existence state at V11's default age); V02 draws the
exterior from the same thresholds; V04 the cellars, crypts and underground buildings. Of item 123 (f)'s bars, T123-1 (room,
wall and opening ids identical between the intact and the damaged plan) is V03's and V04's, T123-4 (restoring reverses
it) V03's and V06's, T123-5 (the exterior agrees with the plan) V02's and T123-6 (battle-map line of sight follows fallen
walls) V03's and V04's; this volume measures three, from the V03 step that draws a decayed or ruined plan (V03 §8; §16),
on its **damage fixtures** — B-PLAN's seeds holding a building of every element kind in each of `abandoned`, `decayed` and
`ruined`, a restored one, a never-decayed control and a ruined church with its crypt — and from M6-E over H-100's decay
runs:
* **T123-2, damage monotone in the decay level** — `damage.nested`: each building's damaged elements at the levels 0,
  0.05, …, 1 (§6.3's one comparison evaluated at each), and from M6-E at every week of V06's decay runs, contain those of
  every lower level or earlier week of the run — 0 elements damaged at one and undamaged at the next; V04's T-V4-82 takes
  the clause below ground;
* **T123-3, the same element breaks at the same level for a seed** — `damage.breakLevel`: each element's lowest damaged
  level identical across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a
  migration; across the five engines it is determinism §6.5 (9)'s run;
* **T123-7, a building never decayed is byte-identical to today's plan** — the pin `item123.damage` (`entityScope`;
  V12 §2.13): every building whose lineage never held `abandoned`, `decayed` or `ruined` drawn and exported
  byte-identically to its off-state set at every band and week, the underground's bands and per-band exports registered
  by V04 (T-V4-82 (g)).
Item 123 adds no `StatBarSpec` and no register line (its cells take the default line, V12 §3.11).

**3.15.14 Item 124 — intermittent light weather.** §8.8 draws the effects layer, §8.2 its marks and §8.4 (i) its light
terms within its photosensitivity limit; §6.1 seeds the timeline per session (`view.weather`); §2.9 keeps the spell
session-transient and the switch device state; V11 writes the climate rows' weather columns, the two hard rules its compile
checks; V09 builds **Weather effects**, **Start a shower now** and the defaults, its T-V9-87 taking T124-5 (off by default
under reduced motion and on the low tier). This volume measures the rest, from M3b (§16), on V09's app harness over its
**weather fixtures** — a fixture town on every climate row of V11's table through all 52 weeks, the session seed drawn by
the testkit stream `weather/<fixture>` (V12 §3.13) and the view time stepped by the harness's clock, never the host's:
* **T124-1 and T124-8, a layer only** — the pin `item124.effects` (`view`, `cache`, `exports`; V12 §2.13): each suite
  document opened with the effects off, on with no spell, under each spell kind in force and after **Start a shower now**
  gives one model digest and identical saved bytes, leaves the tile cache untouched — no tile re-rastered or re-composed
  by a spell — and gives byte-identical exports;
* **T124-2, ≈ 1 ms at the densest spell** — `weather.frameMs` in §12.1's timing phase on the reference and the low-end
  device over §12.5's reference view, against §12.5's figure on the reference machine, a miss taking §12.10's R12-38
  change;
* **T124-3, no snow where the winter does not freeze** — `weather.snow` 0 over all 52 weeks of every `arid` row and
  every non-freezing row, a carried `snow` cover among the cases (drawn `clear`, §2.9, §8.2), V11's compile check beside
  it;
* **T124-4, arid rain within its row** — `weather.aridRain`: per `arid` row and week band, over a simulated clock long
  enough that the row's column expects at least 50 rain spells in the band, the observed count within three standard
  errors of the expected (a Poisson count), and 0 rain spells in its dry weeks over a year of them;
* **T124-6, labels and chrome never covered** — `weather.cover`: 0 pixels of a label, a halo, the chrome, a Find glow or
  a handle changed by any spell, a pixel test over V09's captures;
* **T124-7, no luminance step faster than the photosensitivity limit** — `weather.luma`: the view's mean relative
  luminance per frame through each spell kind's onset, standing and fade at 60 frames a second, its largest change in
  any one second within §8.4 (i)'s limit, and 0 flashes;
* **T124-9, the timeline replays** — `weather.replay`: two runs from one session seed, clock and set of presses give the
  same spells; across the five engines it is determinism §6.5 (9)'s run.
Item 124 adds no `StatBarSpec` and no register line (its weather columns take the default line, V12 §3.11).

**3.15.15 Item 125 — the dossier the only data input.** The port reads SettlementForge only through the dossier (§11.3 –
§11.4; V08's field table, each field with its standalone fallback); a `HostContext` carries no data input — its
`audience`, `displayNames` and `line` change no document a dossier makes (§11.4); §7.7's DR1, DR3, DR19, DR29 and DR42 read
the dossier or the generator's fallback. Of item 125 (e)'s bars, T125-3 (no code path of the port reads anything but the
dossier, a static check of the adapter's imports and reads) is V08's; this volume measures two, from M-SF (§16), V08's own
tests taking T125-1 and T125-2 on the port's fixtures beside them:
* **T125-1, a required-keys dossier makes a full map** — `port.fallbacks`: the **required-keys dossier** (V08's fixture
  holding only SettlementForge's required keys, in §13.2's frozen manifest) at TOWN, CITY and the METROPOLIS cap generates
  every stage's output, and each field V08's table lists as read that the dossier lacks has its report line naming the
  fallback taken — 0 missing lines, 0 stages without output; with no stamped tick §4.11's clock starts at week 0 and the
  year position is the season control's, midsummer (week 19) by default (§2.9's *The week's source*; DR42);
* **T125-2, a host context changes nothing** — the pin `item125.host` (`input`; V12 §2.13): B-DOSSIER-lite and the
  required-keys dossier generated with no host context and under each fixture `HostContext` (a viewer's `audience`, a
  `displayNames` map and each `line` the dossier's version stamps admit) give one model digest and identical saved bytes.
Item 125 adds no `StatBarSpec`, no register line and no cell.

**3.15.16 Item 126 — tablets and desktops only.** The map designs nothing for a phone (item 126 (a2)): V09 retires the
narrow layout class, holds the medium layout at its 600 × 480 CSS-px minimum in a smaller window with the page scrolling,
and its T-V9-22 takes T126-1's tablet half, T126-2 and T126-3 (no phone layout, screen or catalogue row); V08's host frame
carries no phone handling. This volume measures two clauses on V09's app harness, from M2a (§16), no fixture of it a
phone viewport:
* **T126-1, every tool under touch at the medium class** — `layout.touch`: at 600 × 480 CSS px under coarse-pointer
  touch events each tool of V09 §4.12's list completes its canvas script (V09 §7.2's scripts) — each tool from the
  milestone that lands it, every tool from M3a — 0 failing;
* **T126-2, below the medium class the medium layout holds** — `layout.belowMedium` 0 over the **resize script**
  1 024 × 768 → 600 × 480 → 599 × 479 → 480 × 360 → 1 024 × 768 CSS px on a CITY session holding a selection, its view
  finer than the zoom-out limit at every size (so no resize settles it, §8.8): below 600 × 480 the medium layout at its
  minimum, no tool withheld or greyed, the page scrolling to every part; and the pin `item126.resize` (`view`, `session`;
  V12 §2.13): the model digest, the saved bytes, the view key and the selection byte-identical at every step.
Item 126 adds no `StatBarSpec` and no register line.
"""

ROWS_316 = (
    "| 32 | item 121's measurements · every level and tier, a device below the low tier, a screen above 4K, a monitor change "
    "mid-gesture, a lost GPU context under Auto | V12 §3.15.11: each level on each device fixture; a device below the low "
    "tier drawn at its lowest rung that fits (§8.8) and reported per device, never gated; a 5K and an 8K screen at the "
    "4K-equivalent DPR, the text layer at the device's ratio, the reason `ceiling` shown; the change applied at the next "
    "settle; the session's light rung lowered (§8.8) and the loop measured from there | report (the statistic's row, "
    "counted); never a crash or a silent pass | T-V12-53 |\n"
    "| 33 | item 122's measurements · no condition and no preview, a withheld condition, a condition with no `untilWeek` and "
    "one ending before it starts, several crises past the density cap, a force too large for its frame and margin, an "
    "island town, an unwalled siege, a headcount of 0, every rung THORP – the cap | V12 §3.15.12: the pin's tiles; never "
    "drawn, counted or widening the framing; drawn from `sinceWeek` on; never standing; by priority, the rest on the ring; "
    "the ring's arcs with the frame and hash unchanged; the ring; the `blockade` row; the scale by severity and tier; each "
    "rung's `scale` cell | report (the statistic's row, counted); never a silent pass | T-V12-54; T-V12-55 |\n"
    "| 34 | item 123's measurements · level 0 and level 1, a building first met ruined (generated ruined, or in item 113's "
    "replay), a restored building, a stale plan, a one-room plan, a ruined church with its crypt, a building of a disaster "
    "look's district, every rung where plans draw | V12 §3.15.13: no element, every element damaged; its as-built plan, "
    "then its damage; the damage leaving in reverse (T123-4, V03's and V06's); its cached rooms under the change marker "
    "until re-derived; its elements by their thresholds; the crypt by its own; at `lookLevel` or its own level where "
    "higher — `damage.nested` holding over each | report (the statistic's row, counted) | T-V12-56 |\n"
    "| 35 | item 124's measurements · the switch off, reduced motion and the low tier, every climate row and week, a snow "
    "spell asked on an `arid` or non-freezing row, a spell during an export, a resize and a gesture, the vector rung, a "
    "lost GPU context | V12 §3.15.14: nothing drawn; off by default (V09's T-V9-87); each row by its columns; never snow; "
    "the export without effects, the layer redrawn at the new size, the gesture's frames within budget; the wash and the "
    "halos only — the pin and `weather.cover` holding at each | report (the statistic's row, counted) | T-V12-57 |\n"
    "| 36 | item 125's measurements · a required-keys dossier, a dossier with no stamped tick, a host context present and "
    "absent, a `line` the dossier's stamps contradict, every rung | V12 §3.15.15: a full map with every fallback reported; "
    "week 0 at midsummer; one document and hash; refused with `E_LINE_UNSUPPORTED` (§11.4), no document made and none "
    "compared | report; check (the refusal) | T-V12-58 |\n"
    "| 37 | item 126's measurements · exactly 600 × 480, one pixel below it, a window far below it, every tool | "
    "V12 §3.15.16: the medium layout; the medium layout at its minimum with the page scrolling; the same; each tool's "
    "touch script from the milestone that lands it | report (the statistic's row, counted) | T-V12-59 |")


def apply(sub, after_line):
    sub('R2-07 R2-35 R2-36 §3.15 heading and head',
        "### 3.15 The owner rules 111–120 on the harness\n"
        "\n"
        "Each item's bars are §13.2's — items 111–119 numbered there (T111-1 – T119-5), item 120 by the clauses of its (k); this\n"
        "section registers the part of each that runs on this volume's machinery — its specs, pins, metrics and register lines —\n"
        "and names the owner of every other clause.",
        "### 3.15 The owner rules 111–126 on the harness\n"
        "\n"
        "Each item's bars are §13.2's, numbered there (T111-1 – T126-3), item 122 (h)–(i)'s four bars this volume's own\n"
        "(V12 §3.15.12); this section registers the part of each that runs on this volume's machinery — its specs, pins,\n"
        "metrics and register lines — and names the owner of every other clause. Items 120 – 126's statistics and pins measure\n"
        "fixture properties: each clause they measure is on the harness registry's `conformance` list (§13.2's convention\n"
        "(6)), none a tendency bar asking for a spec (T-V12-35).")
    sub('R2-36 §3.15 head milestones',
        "(V12 §2.1). Their seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's.",
        "(V12 §2.1). Their seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's, items 120 – 126's\n"
        "placed by §16 (J122): Find at M5, item 121 at M4, items 122 and 124's base parts at M3b, item 123 with V03's\n"
        "damaged-plan step and V06's decay level at M6-E, item 125's bars at M-SF and item 126 at M2a.")

    # ---- §3.15.10: no phone sheet (G126-V12, R2-41); R2-35's ids; M5 (R2-32) ------------------------------------------------
    sub('G126-V12 R2-41 R2-35 §3.15.10 head',
        "**3.15.10 Item 120 — Find, a view.** V09 builds Find — its panel, type-ahead, chip grid, results list, phone sheet, the\n"
        "`live.find` overlay provider and Coverage folded into Show gaps — and runs its screens' bars; this volume measures item 120\n"
        "(k)'s clauses with one pin, five statistics and two timings, each 0 by rule or within its budget, on V09's app harness\n"
        "over the Find fixtures:",
        "**3.15.10 Item 120 — Find, a view.** V09 builds Find — its panel, type-ahead, chip grid, results list, the `live.find`\n"
        "overlay provider and Coverage folded into Show gaps — and runs its screens' bars, its T-V9-83 taking T120-2 – T120-5's\n"
        "interface clauses on these fixtures; this volume measures T120-1 – T120-6 with one pin, five statistics and two\n"
        "timings, each 0 by rule or within its budget, from M5 (§16) on V09's app harness over the Find fixtures:")
    sub('R2-35 §3.15.10 T120-1',
        "* **the document hashes identically with Find on and off, and turning everything off restores byte-identical tiles** — the\n"
        "  pin `item120.find`",
        "* **T120-1, the document hashes identically with Find on and off, and turning everything off restores byte-identical\n"
        "  tiles** — the pin `item120.find`")
    sub('R2-35 §3.15.10 T120-2',
        "* **each chip's matches equal the gazetteer query's rows at the key** — `find.matches`",
        "* **T120-2, each chip's matches equal the gazetteer query's rows at the key** — `find.matches`")
    sub('R2-35 §3.15.10 T120-3',
        "* **the knowledge canary never surfaces** — `find.leaks`",
        "* **T120-3, the knowledge canary never surfaces** — `find.leaks`")
    sub('R2-35 §3.15.10 T120-4',
        "* **the filter survives every band and layer change and every commit, advance and undo** — `find.held`",
        "* **T120-4, the filter survives every band and layer change and every commit, advance and undo** — `find.held`")
    sub('R2-35 §3.15.10 T120-5 pins',
        "* **at the city band every match has a pin or a bubble** — `find.pins`",
        "* **T120-5, at the city band every match has a pin or a bubble** — `find.pins`")
    sub('R2-35 §3.15.10 T120-5 cues',
        "* **every chip has its second cue** — `find.cues`",
        "* **T120-5, every chip has its second cue** — `find.cues`")
    sub('R2-35 §3.15.10 T120-6',
        "* **the interaction budgets of item 120 (j) hold at the metropolis cap** — `time.findSuggest`",
        "* **T120-6, the interaction budgets of item 120 (j) hold at the metropolis cap** — `time.findSuggest`")

    # ---- the new §3.15.11 – §3.15.16 after §3.15.10's last line --------------------------------------------------------------
    sub('G121-G126 §3.15.11-16',
        "and Sky V04's and V05's, the village rungs V07's — each volume's own part of item 120.\n",
        "and Sky V04's and V05's, the village rungs V07's — each volume's own part of item 120.\n" + S3151116)

    # ---- §3.16 -------------------------------------------------------------------------------------------------------------
    sub('G121-G126 §3.16 toggles',
        "* **Every toggle and preset.** Recipe inputs (the preset arms, V12 §3.5.5) and view state (layers, seasons, festivals, Find,\n"
        "  `cvdVariant`) never mix:",
        "* **Every toggle and preset.** Recipe inputs (the preset arms, V12 §3.5.5) and view and device state (layers, seasons,\n"
        "  festivals, Find, crises, `cvdVariant`, the Resolution setting, the weather effects) never mix:")
    after_line('G121-G126 §3.16 rows 32-37',
               "| 31 | item 120's measurements · no chip,",
               ROWS_316)
