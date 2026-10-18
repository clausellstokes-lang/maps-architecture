"""edits — coherence/repair-V12-r4: the seven round-4 issues routed to V12 and its three END lines (adjudication-r4 Part H ·
V12), with the seat's own sweep (R4-01 (2)); each edit tagged with the issue, END line or sweep it applies. Count-asserted
substitutions on the live volume (build.py)."""


def apply(sub, after_line):
    # ===================================================================================================================
    # VAP-r3-01 (FIX): the `disaster` preview's district clauses run from M5 (§10.2 *Crisis looks*' lead, §13.8, §16's M5);
    # with END of VAP-r3-09 (scope): §3.15.12's head names V04's T-V4-82 (i) beside V01's T-V1-60 — one sentence.
    # Sweep (principle (10), the same sentence): V03's T-V3-40 takes T122-7's plan clause too (§13.2; T-V3-40's head).
    # ===================================================================================================================
    sub('VAP-r3-01, END VAP-r3-09 §3.15.12 head',
        "T122-3; V01's T-V1-60, V02's T-V2-60, V08's T-V8-60 and V10's T-V10-52 test their own parts; this volume measures the\n"
        "rest on its **crisis fixtures** — from M3b (§16) each look kind previewed (`crises` `preview`, at `previewSeverity`) on\n"
        "B-CITY-lite's seeds of every rung, an island town and an unwalled place; from M-SF V08's dossier crisis fixtures\n",
        "T122-3 and T122-7; V01's T-V1-60, V02's T-V2-60, V04's T-V4-82 (i), V08's T-V8-60 and V10's T-V10-52 test their own\n"
        "parts; this volume measures the rest on its **crisis fixtures** — from M3b (§16) each look kind previewed (`crises`\n"
        "`preview`, at `previewSeverity`) on B-CITY-lite's seeds of every rung, an island town and an unwalled place, the\n"
        "`disaster` preview's district clauses (its units, scale and placement under T122-2, T122-3, T122-5 and T122-6) from\n"
        "M5, when V01's W10 lands (§10.2 *Crisis looks*; §13.8); from M-SF V08's dossier crisis fixtures\n")
    sub('VAP-r3-01 T-V12-54 milestone',
        "| C | M3b (the previews); M-SF (the dossier crisis fixtures) (§16) |",
        "| C | M3b (the previews; the `disaster` preview's district clauses from M5); M-SF (the dossier crisis fixtures) (§16) |")
    sub('VAP-r3-01 §6 item-122 row milestone',
        "| M3b (the previews); M-SF (the dossier crisis and force fixtures) (§16) |",
        "| M3b (the previews; the `disaster` look's district clauses from M5); M-SF (the dossier crisis and force fixtures) (§16) |")
    sub('VAP-r3-01 W7 M3b cell',
        "item 122's previews, its `crisis.*` statistics there and `item122.crises`;",
        "item 122's previews (the `disaster` preview's districts at M5), its `crisis.*` statistics there and `item122.crises`;")
    sub('VAP-r3-01 W7 M5 cell',
        "M5 (Find: `item120.find`, `find.*`, the Find timings);",
        "M5 (Find: `item120.find`, `find.*`, the Find timings; the `disaster` preview's district clauses of T122-2, T122-3, "
        "T122-5 and T122-6);")
    # sweep (root cause): the two other statements of item 122's harness milestone
    sub('VAP-r3-01 sweep §3.15 lead',
        "items 122 and 124's base parts at M3b, item 123 with V03's",
        "items 122 and 124's base parts at M3b (the `disaster` look's district clauses at M5), item 123 with V03's")
    sub('VAP-r3-01 sweep §8.1',
        "items 122 and 124 at M3b with item 122's dossier\nand force bars at M-SF,",
        "items 122 and 124 at M3b with the `disaster` look's district clauses at M5 and item 122's dossier\n"
        "and force bars at M-SF,")

    # ===================================================================================================================
    # VAP-r3-02 (FIX): T126-1's touch scripts run with `AppPrefs.touch.editFabric` on (§13.4, T126-1, V09 §4.12, T-V9-22)
    # ===================================================================================================================
    sub('VAP-r3-02 §3.4.2 layout.touch row',
        "the tools of V09 §4.12's list whose canvas script fails to complete under touch events;",
        "the tools of V09 §4.12's list whose canvas script fails to complete under touch events with "
        "`AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default);")
    sub('VAP-r3-02 §3.15.16 T126-1 bullet',
        "* **T126-1, every tool under touch at the medium class** — `layout.touch`: at 600 × 480 CSS px under coarse-pointer\n"
        "  touch events each tool of V09 §4.12's list completes its canvas script (V09 §7.2's scripts) — each tool from the\n"
        "  milestone that lands it, every tool from M3a — 0 failing;",
        "* **T126-1, every tool under touch at the medium class** — `layout.touch`: at 600 × 480 CSS px under coarse-pointer\n"
        "  touch events, with `AppPrefs.touch.editFabric` on, each tool of V09 §4.12's list completes its canvas script (V09\n"
        "  §7.2's scripts) — each tool from the milestone that lands it, every tool from M3a — 0 failing;")
    sub('VAP-r3-02 T-V12-59',
        "`layout.touch` is 0 at 600 × 480 and fails a planted tool whose canvas script needs a hover;",
        "`layout.touch` is 0 at 600 × 480 with `AppPrefs.touch.editFabric` on and fails a planted tool whose canvas script "
        "needs a hover;")
    # sweep (root cause): the planted-fault row and edge row 37 state the same measure
    sub('VAP-r3-02 sweep §3.12 item-126 row',
        "| a tool's touch script not completing at 600 × 480; below the medium class",
        "| a tool's touch script not completing at 600 × 480 with `AppPrefs.touch.editFabric` on; below the medium class")
    sub('VAP-r3-02 sweep §3.16 edge row 37',
        "the same; each tool's touch script from the milestone that lands it |",
        "the same; each tool's touch script, with `AppPrefs.touch.editFabric` on, from the milestone that lands it |")

    # ===================================================================================================================
    # VAP-r3-08 (FIX): the V11 suites named by their registering tests (T-V11-21, T-V11-19) — §2.13, §3.7.8, X-V12-11
    # ===================================================================================================================
    sub('VAP-r3-08 §2.13 item105.web, item107.spread',
        "| the golden suite; B-CITY (V11); H-100 (V06, T-V6-44);",
        "| the golden suite; B-CITY's 200 seeds per rung (V11, T-V11-21); H-100 (V06, T-V6-44);")
    sub('VAP-r3-08 §2.13 item106.barrier',
        "| the golden suite; V11's T-V11-19 fixtures; V05's island fixture (T-V5-27) |",
        "| the golden suite; item 106 (h)'s barrier fixtures (V11, T-V11-19); V05's island fixture (T-V5-27) |")
    sub('VAP-r3-08 §3.7.8 list',
        "V11's T-V11-13, T-V11-31 and\nT-V11-38 (b) – T-V11-41 (b).",
        "V11's T-V11-13, T-V11-19, T-V11-21, T-V11-31 and\nT-V11-38 (b) – T-V11-41 (b).")
    sub('VAP-r3-08 X-V12-11',
        "T-V11-13, T-V11-31, T-V11-38 (b) – T-V11-41 (b) — registers",
        "T-V11-13, T-V11-19, T-V11-21, T-V11-31, T-V11-38 (b) – T-V11-41 (b) — registers")

    # ===================================================================================================================
    # VAP-r3-10 (FIX): T116-4's export framing as §8.7 and T116-4 state it
    # ===================================================================================================================
    sub('VAP-r3-10 §3.15.6',
        "T116-2 – T116-4 (the first view\nunchanged, the limit moving with the bounds, every export within it) are the base's render bars;",
        "T116-2 – T116-4 (the first view\nunchanged, the limit moving with the bounds, every export within the limit bounds — the whole bounds at most, a\n"
        "whole-bounds export at the cap framing them, §8.7) are the base's render bars;")

    # ===================================================================================================================
    # VAT3-r3-04 (FIX): the oldest-first order by the week of each run's last-change epoch (§6.1; V06 §3.7.7 (3); T114-4)
    # ===================================================================================================================
    sub('VAT3-r3-04 §3.15.4 T114g.oldestFirst',
        "* **T114-4, recovery replaces patches oldest first** — `T114g.oldestFirst` (`ownerBar` T114-4): `exactScript`\n"
        "  `patchesOldestFirst` over H-100's epochs and V06's recovery fixture, the order read from each run's epoch of last change;",
        "* **T114-4, recovery replaces patches oldest first** — `T114g.oldestFirst` (`ownerBar` T114-4): `exactScript`\n"
        "  `patchesOldestFirst`, the order read from the week of each run's last-change epoch (`EpochRecord.inputs.week`; §6.1 —\n"
        "  never the epoch's number, so a replay epoch orders by its week, before every live one), over H-100's epochs and\n"
        "  T-V6-73's history-first recovery fixture;")
    sub('VAT3-r3-04 T-V12-47 planted fault',
        "`T114g.oldestFirst` fails a planted recovery that replaces a younger patch first and `T114g.sustained`",
        "`T114g.oldestFirst` fails a planted recovery that replaces a younger patch first and one that replaces a live-era "
        "patch before a replay-era one (T-V6-73's history-first fixture), and `T114g.sustained`")
    # sweep (root cause): the script property's own comment states the order
    sub('VAT3-r3-04 sweep §2.7b patchesOldestFirst',
        "// item 114 (c): recovery replaces a wall's patched runs in the order of their epochs of last change",
        "// item 114 (c): recovery replaces a wall's patched runs oldest first, by the week of each run's last-change epoch (`EpochRecord.inputs.week`, §6.1), never the epoch's number")

    # ===================================================================================================================
    # VCS-r3-02 (FIX): each head names the base bars it takes, as §13.2's take-over table assigns them
    # ===================================================================================================================
    sub('VCS-r3-02 T-V12-44 head',
        "| T-V12-44 | **Item 111's bars are wired.** ",
        "| T-V12-44 | **Item 111's bars are wired** (takes T111-1 – T111-5: their specs and `item111.water`). ")
    sub('VCS-r3-02 T-V12-45 head',
        "| T-V12-45 | **The style line and the trial's findings (item 112).** ",
        "| T-V12-45 | **The style line and the trial's findings (item 112)** (takes T112-1's style line). ")
    sub('VCS-r3-02 T-V12-46 head',
        "| T-V12-46 | **Item 113's registrations.** ",
        "| T-V12-46 | **Item 113's registrations** (takes T113-2's five-engine digest, T113-5's `T113e.lost` and T113-7's pin "
        "`item113.history`). ")
    sub('VCS-r3-02 T-V12-47 head',
        "| T-V12-47 | **Item 114's specs and bench bars.** ",
        "| T-V12-47 | **Item 114's specs and bench bars** (takes T114-4 – T114-7 and T114-8's pin `item114.condition`). ")
    sub('VCS-r3-02 T-V12-49 head',
        "| T-V12-49 | **Items 117 and 118.** ",
        "| T-V12-49 | **Items 117 and 118** (takes T117-1 and T118-1's pins, T117-2, T117-4, T117-5 and T117-7, and T118-2 – "
        "T118-6). ")

    # ===================================================================================================================
    # VV1112-r3-01 (FIX per R4-13): `crisis.scale`'s second count reads V01 §3.16 (5)'s count for the `disaster` look
    # (§10.2 (c): at least every matched target, a fire stopping where its order ends, the shortfall reported)
    # ===================================================================================================================
    sub('VV1112-r3-01 §3.4.2 crisis.* row',
        "or whose units differ in number from the count §10.2 (c) gives that share of its place's units;",
        "or whose units differ in number from the count §10.2 (c) gives that share of its place's units — for the `disaster` "
        "look V01 §3.16 `disasterSource` (5)'s, max(k, \\|`matched`\\|) with k that count, or every unit of a fire order shorter "
        "than that, its "
        "shortfall reported and not counted;")
    sub('VV1112-r3-01 §3.15.12 T122-5 bullet',
        "else its units the count §10.2 (c) gives that\n"
        "  share of its place's units (`crisis.scale`'s second count, 0 by rule);",
        "else its units the count §10.2 (c) gives that\n"
        "  share of its place's units — a `disaster` look's max(k, |`matched`|), k that count, or all of a shorter fire order\n"
        "  (V01 §3.16 `disasterSource` (5)) — (`crisis.scale`'s second count, 0 by rule);")
    sub('VV1112-r3-01 T-V12-54 passing cases',
        "by its second count, a camp drawn at double its row's `scale` cell;",
        "by its second count, a camp drawn at double its row's `scale` cell — a fire calamity naming more target districts "
        "than its share's count, every one drawn, and a fire whose district adjacency ends before its count, its shortfall "
        "reported, passing;")

    # ===================================================================================================================
    # END of VPC-R3-03 (pipeline; R4-06): `crisis.blocked`'s five statements — a barrier across a way: a `barricade`, a
    # `beast`'s `stakes`, a quarantine's `cordon` (§10.2 (d)); T-V12-54 adds the stakes and the cordon as passing cases
    # ===================================================================================================================
    BARRIER = "a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d))"
    sub('END VPC-R3-03 (R4-06) §3.4.2 crisis.* row',
        "and on a way's carriageway any mark but a `barricade` across it (§10.2 (d));",
        "and on a way's carriageway any mark save " + BARRIER + ";")
    sub('END VPC-R3-03 (R4-06) §3.12 planted-fault row',
        "or on a carriageway as anything but a `barricade` across it;",
        "or on a way's carriageway as anything save " + BARRIER + ";")
    sub('END VPC-R3-03 (R4-06) §3.15.12 T122-6',
        "and a way's carriageway save a `barricade` across\n"
        "  it (§10.2 (d)), the previews of `blockade`, `raiders` and `rebellion` among the kinds checked;",
        "and a way's carriageway save a barrier across\n"
        "  it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)), the previews of `blockade`, `raiders`,\n"
        "  `rebellion`, `beast` and `quarantine` among the kinds checked;")
    sub('END VPC-R3-03 (R4-06) §3.16 edge row 33 case',
        "a barricade look (`blockade`, `raiders`, `rebellion`) on a way |",
        "a barrier look on a way (the `blockade`, `raiders` and `rebellion` barricades, a `beast`'s stakes, a quarantine's "
        "cordon) |")
    sub('END VPC-R3-03 (R4-06) §3.16 edge row 33 outcome',
        "each rung's `scale` cell; its `barricade` across the carriageway, no other part there |",
        "each rung's `scale` cell; a way's carriageway holding nothing save " + BARRIER + " |")
    sub('END VPC-R3-03 (R4-06) T-V12-54',
        "`crisis.blocked` fails a planted tent in a gate's passage, one on water and a planted camp on a carriageway, the "
        "`blockade`, `raiders` and `rebellion` barricades across their ways passing;",
        "`crisis.blocked` fails a planted tent in a gate's passage, one on water and a planted camp on a way's carriageway, "
        "which holds nothing save " + BARRIER + " — the `blockade`, `raiders` and `rebellion` barricades across their ways, a "
        "`beast`'s stakes where its edge crosses a way and a quarantine's cordon across each way entering its quarter "
        "passing;")

    # ===================================================================================================================
    # END of R4-11 (adjudicator's sweep): no test stages a key withholding a look-bearing condition (DR44: `public`)
    # ===================================================================================================================
    sub('END R4-11 §3.4.2 crisis.weeks knowledge clause',
        "and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week "
        "(DR44's admission);",
        "and, under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a "
        "mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44);")
    sub('END R4-11 §3.15.12 T122-2 bullet',
        "  them — and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week\n"
        "  (DR44's admission): 0 mismatched weeks;",
        "  them — and, under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a\n"
        "  mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44): 0\n"
        "  mismatched weeks;")
    sub('END R4-11 §3.12 planted-fault row',
        "| a look drawn outside its condition's weeks or for a condition the viewer's key withholds,",
        "| a look drawn outside its condition's weeks or for a `none`-row condition,")
    sub('END R4-11 §3.16 edge row 33 case',
        "no condition and no preview, a withheld condition, a condition with no `untilWeek`",
        "no condition and no preview, a `none`-row condition beside the looks (drawn at no key) and a look-bearing one (drawn "
        "at every key), a condition with no `untilWeek`")
    sub('END R4-11 §3.16 edge row 33 outcome',
        "V12 §3.15.12: the pin's tiles; never drawn, counted or widening the framing;",
        "V12 §3.15.12: the pin's tiles; the `none`-row one never drawn, counted or widening the framing, the look-bearing one "
        "drawn at every key;")
    # the seat's sweep (R4-01 (2)): T-V12-54's planted case staged a key withholding a condition
    sub('sweep R4-11 T-V12-54 crisis.weeks planted case',
        "and a planted look of a condition the `public` key withholds;",
        "and a planted look drawn for a `none`-row condition carried beside the looks — each look-bearing condition's look "
        "drawn at `public`, `local` and `secret` alike passing;")

    # ===================================================================================================================
    # Hand-off received (repair-r4-rendering's HAND-OFFS; the canon's retired term G-refview, rendering's VCS-r3-07 this
    # round): §12.5's "reference view(s)" → "reference viewport(s)" — the one name (principle (2)); nothing else changes
    # ===================================================================================================================
    sub('hand-off rendering r4 G-refview (§3.4.2 x3, §3.15.11 x4, §3.15.14 x1, §6 x1)', 'reference view', 'reference viewport', count=9)
