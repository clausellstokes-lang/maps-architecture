"""edits — coherence/repair-V12-r3: every round-3 issue routed to V12 and its one END line (adjudication-r3 Part H · V12),
each edit tagged with the issue or ruling it applies. Count-asserted substitutions on the live volume (build.py)."""


def apply(sub, after_line):
    # ===================================================================================================================
    # VAP-r2-08, VV34-r2-15, VV1112-r2-08 (R3-26): §2.13's suites, §3.7.8's list and X-V12-11 — one union, each id on its pin
    # ===================================================================================================================
    sub('VAP-r2-08 (c) §2.13 item111.water',
        "V08's port fixtures (T-V8-50); the reader and why goldens (V10, T-V10-45) |",
        "V08's port fixtures (T-V8-50); the reader and why goldens but the brief's (V10, T-V10-45) |")
    sub('VAP-r2-08 (a) §2.13 item113.history',
        "the history fixtures (V06, T-V6-71); V07's village goldens (T-V7-59) |",
        "the history fixtures (V06, T-V6-71); V07's village goldens (T-V7-59); T-V11-39 (a)'s four fixtures (V11, T-V11-39 (b)) |")
    sub('VAP-r2-08 (a) §2.13 item114.condition',
        "the wall fixtures (V06, T-V6-73); V07's palisade goldens (T-V7-62) |",
        "the wall fixtures (V06, T-V6-73); V07's palisade goldens (T-V7-62); B-CITY's 200 seeds per rung (V11, T-V11-40 (b)) |")
    sub('VAP-r2-08 (a) §2.13 item115.off (the test id moved from the bar column to its suite)',
        "| `item115.off` | T115-4 (T-V11-41 (b)) | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the golden suite; V07's village goldens (T-V7-63) |",
        "| `item115.off` | T115-4 | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the golden suite; V07's village goldens (T-V7-63); B-CITY's 200 seeds per rung (V11, T-V11-41 (b)) |")
    sub('VAP-r2-08 (a), (b) §2.13 item115.ceiling',
        "| the golden suite; B-MASS (V02); H-100 over epochs at TOWN and above (V06, T-V6-74); V08's port fixtures at TOWN (T-V8-53) |",
        "| the golden suite; B-MASS (V02, T-V2-58 (f)); H-100 over epochs at TOWN and above (V06, T-V6-74); V08's port fixtures at TOWN (T-V8-53); B-CITY's TOWN, CITY and METROPOLIS seeds (V11, T-V11-41 (b)) |")
    sub('VV1112-r2-08, VV34-r2-15 §2.13 item122.crises',
        "| the golden suite; V12's crisis fixtures (the previews from M3b, V08's dossier crisis fixtures from M-SF) |",
        "| the golden suite; V12's crisis fixtures (the previews from M3b, V08's dossier crisis fixtures from M-SF); the look fixture's exteriors (V02, T-V2-60 (c)); the damage fixtures' disaster district, its plan tiles at the building band (V03, T-V3-40 (f)); the frozen dossier set's crisis conditions (V08, T-V8-59) |")
    sub('VV34-r2-15, VV1112-r2-08 §2.13 item123.damage (V12 measures on V03 §7\'s damage fixtures: one suite, V03\'s registration)',
        "| the golden suite; V12's damage fixtures (V12 §3.15.13); the underground's bands and per-band exports (V04, T-V4-82 (g)) |",
        "| the golden suite; V03's damage fixtures, their plans drawn and exported at every level (V03, T-V3-39 (g); measured by V12 §3.15.13); the damage sub-fixture's exteriors (V02, T-V2-59 (d)); the underground's bands and per-band exports (V04, T-V4-82 (g)) |")
    sub('VV1112-r2-08 §2.13 item125.host; VV1112-r2-05 (every rung)',
        "| B-DOSSIER-lite (base); V12's item-125 fixtures (the required-keys dossier) |",
        "| B-DOSSIER-lite (base); V12's item-125 fixtures (the required-keys dossier at every rung); the frozen dossier set through the port (V08, T-V8-61 (b)) |")

    sub('VAP-r2-08, VV34-r2-15, VV1112-r2-08 §3.7.8 list (V02, V03)',
        "T-V1-4 (e); V02's T-V2-50; V03's T-V3-34; V04's",
        "T-V1-4 (e); V02's T-V2-50, T-V2-58 (f), T-V2-59 (d) and T-V2-60 (c); V03's T-V3-34, T-V3-39 (g) and T-V3-40 (f); V04's")
    sub('VAP-r2-08, VV1112-r2-08 §3.7.8 list (V08, V11)',
        "V08's\nT-V8-50 and T-V8-53; V09's T-V9-57; V10's T-V10-43 and T-V10-45; V11's T-V11-13, T-V11-31 and T-V11-38 – T-V11-41 (b).",
        "V08's\nT-V8-50, T-V8-53, T-V8-59 and T-V8-61 (b); V09's T-V9-57; V10's T-V10-43 and T-V10-45; V11's T-V11-13, T-V11-31 and\nT-V11-38 (b) – T-V11-41 (b).")
    sub('VAP-r2-08, VV34-r2-15, VV1112-r2-08 X-V12-11',
        "V12 §3.7.8's list: T-V1-4 (e), T-V2-50, T-V3-34, T-V4-47,",
        "V12 §3.7.8's list: T-V1-4 (e), T-V2-50, T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-34, T-V3-39 (g), T-V3-40 (f), T-V4-47,")
    sub('VAP-r2-08, VV1112-r2-08 X-V12-11 (V08, V11)',
        "V07's pins, T-V8-50, T-V8-53, T-V9-57, T-V10-43, T-V10-45, T-V11-13, T-V11-31, T-V11-38 – T-V11-41 (b) — registers",
        "V07's pins, T-V8-50, T-V8-53, T-V8-59, T-V8-61 (b), T-V9-57, T-V10-43, T-V10-45, T-V11-13, T-V11-31, T-V11-38 (b) – T-V11-41 (b) — registers")

    # VV34-r2-15: V12 §3.15.13 measures on V03 §7's damage fixtures; the restated list cut to that citation (every home)
    sub('VV34-r2-15 §3.15.13',
        "(V03 §8; §16),\non its **damage fixtures** — B-PLAN's seeds holding a building of every element kind in each of `abandoned`, `decayed` and\n`ruined`, a restored one, a never-decayed control and a ruined church with its crypt — and from M6-E over H-100's decay\nruns:",
        "(V03 §8; §16),\non the **damage fixtures** (V03 §7) and from M6-E over H-100's decay runs:")
    sub('VV34-r2-15, VV1112-r2-08 §3.15.13 T123-7 (the pin\'s registrations)',
        "byte-identically to its off-state set at every band and week, the underground's bands and per-band exports registered\n  by V04 (T-V4-82 (g)).",
        "byte-identically to its off-state set at every band and week, the damage fixtures' plans registered by V03\n  (T-V3-39 (g)), V02's damage sub-fixture's exteriors by V02 (T-V2-59 (d)) and the underground's bands and per-band\n  exports by V04 (T-V4-82 (g)).")
    sub('VV34-r2-15 §3.4.2 damage.* row',
        "| f | on the damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1",
        "| f | on V03 §7's damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1")
    sub('VV34-r2-15 §1b item-123 row',
        "— at the sweep's levels, and from M6-E through V06's `decayLevel` over weeks — on V12's damage fixtures | the pin's off-state sets; the nightly statistics' C rows; T-V12-56 |",
        "— at the sweep's levels, and from M6-E through V06's `decayLevel` over weeks — on V03 §7's damage fixtures | the pin's off-state sets; the PR tier's checks, the decay runs' rows nightly; T-V12-56 |")

    # ===================================================================================================================
    # VAP-r2-12: `find.leaks`, `find.held` and `crisis.weeks` measure what T120-3, T120-4 and T122-2 bind (R3-13: the
    # withheld-condition case is a planted fault)
    # ===================================================================================================================
    sub('VAP-r2-12 §3.4.2 find.* row',
        "under a player view on the knowledge canary fixture, the suggestions, counts, glows, pins and ghost pins naming a withheld entity; over a step script of band and layer changes, commits, an advance and an undo, the steps whose chip set changed or whose matches differ from a fresh evaluation there;",
        "under a player view on the knowledge canary fixture, the suggestions, counts, glows, pins, ghost pins, gap outlines and legend chips naming a withheld entity; over a step script of band and layer changes, commits — one removing a chip's last match among them —, an advance, an undo, a redo, a regenerate, a save and load and a migration, the steps whose chip set changed or whose matches differ from a fresh evaluation there, and a chip whose last match went counted unless it stays at count 0, dark;")
    sub('VAP-r2-12 §3.15.10 T120-3',
        "every suggestion, count, glow, pin and ghost pin naming a withheld entity;",
        "every suggestion, count, glow, pin, ghost pin, gap outline (Show gaps on) and legend chip naming a withheld entity;")
    sub('VAP-r2-12 §3.15.10 T120-4',
        "* **T120-4, the filter survives every band and layer change and every commit, advance and undo** — `find.held` over a step script\n"
        "  on each fixture document: the city, neighbourhood, building and interior bands in turn, Ground, Below and Sky in turn, a\n"
        "  commit that adds a match and one that removes one, an `advance` where the document admits one (V06) and an undo — at\n"
        "  every step the chip set unchanged and its matches equal to a fresh evaluation there (a new match glowing, a removed one\n"
        "  dark);",
        "* **T120-4, the filter survives every band and layer change and every commit, advance, undo, redo, regenerate, load and\n"
        "  migration** — `find.held` over a step script on each fixture document: the city, neighbourhood, building and interior\n"
        "  bands in turn, Ground, Below and Sky in turn, a commit that adds a match and one that removes a chip's last match, an\n"
        "  `advance` where the document admits one (V06), an undo, a redo, a regenerate, a save and load and a migration — at\n"
        "  every step the chip set unchanged and its matches equal to a fresh evaluation there (a new match glowing, a removed one\n"
        "  dark), a chip whose last match went staying in the set at count 0, dark;")
    sub('VAP-r2-12 T-V12-52',
        "`find.leaks` fails a planted canary in a suggestion and in a count bubble under a player view; `find.held` fails a chip set dropped at a planted layer change and a match left glowing after its entity's removal;",
        "`find.leaks` fails a planted canary in a suggestion, in a count bubble and in a gap outline on the canary's district under a player view; `find.held` fails a chip set dropped at a planted layer change, a chip dropped by a migration, a chip removed from the set with its last match and a match left glowing after its entity's removal;")
    sub('VAP-r2-12 §3.12 Find row (the same measure at its failure row)',
        "| a Find chip whose matches differ from the gazetteer's rows; a withheld entity in a suggestion, count, glow, pin or ghost pin; a chip set lost or a match stale after a band, layer or step;",
        "| a Find chip whose matches differ from the gazetteer's rows; a withheld entity in a suggestion, count, glow, pin, ghost pin, gap outline or legend chip; a chip set lost or a match stale after a band, layer or lifecycle step, or a chip dropped when its last match went;")
    sub('VAP-r2-12 §3.16 row 31 (the lifecycle steps as edges)',
        "| 31 | item 120's measurements · no chip, a chip whose last match is removed, a withheld kind, every band and layer, one to twelve chips, the metropolis cap | V12 §3.15.10: no chip is the pin's `off` value; a chip with no match left counts 0 and stays in the set, dark; a withheld kind is never offered, counted or drawn; the city, neighbourhood, building and interior bands and Ground, Below and Sky are steps of the script |",
        "| 31 | item 120's measurements · no chip, a chip whose last match is removed, a withheld kind, every band and layer, one to twelve chips, the metropolis cap, save, load, undo, redo, regenerate, advance and migrate | V12 §3.15.10: no chip is the pin's `off` value; a chip with no match left counts 0 and stays in the set, dark; a withheld kind is never offered, counted or drawn; the city, neighbourhood, building and interior bands, Ground, Below and Sky, an advance, an undo, a redo, a regenerate, a save and load and a migration are steps of the script, the chips re-evaluated at each |")

    # ===================================================================================================================
    # VAP-r2-12 (crisis.weeks), VRC2T-04 (R3-14 (3)), VV1112-r2-06: the crisis measures; END of VPC-R2-03 (R3-09 (e));
    # VV1112-r2-12 (§3.15.12's owners)
    # ===================================================================================================================
    sub('VAP-r2-12, VRC2T-04, VV1112-r2-06 §3.4.2 crisis.* row (ids)',
        "| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked` | render / model",
        "| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked`, `crisis.share` | render / model")
    sub('VAP-r2-12 §3.4.2 crisis.weeks',
        "per look, the weeks it draws against its condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted;",
        "per look, the weeks it draws against its condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted, and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week (DR44's admission);")
    sub('VV1112-r2-06, VRC2T-04 §3.4.2 crisis.scale second count, crisis.blocked, crisis.share',
        "the steps at which a look's drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls; look marks on water, a way's carriageway, a gate's passage or a label's keep-out — each 0 by rule |",
        "the steps at which a look's drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls, and, its second count, at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given; every preview among them) whose camped ground, the ring remainder counted at §8.8's ring density, differs from its row's `scale` at that severity (linear between its two ends) by more than 5 %, or whose units differ in number from the count §10.2 (c) gives that share of its place's units; look marks on water, a gate's passage or a label's keep-out, and on a way's carriageway any mark but a `barricade` across it (§10.2 (d)); on a week standing several camp looks, a camp look holding outskirts land owed to a look before it in `priority` order (ties by condition id) — a face that look's place ranks while it spills onto the ring, or any outskirts face while it spills at the cap — and the camped land past `densityCap` of the outskirts' free land, in m² (§10.2 (e)) — each 0 by rule |")

    sub('VV1112-r2-12, END VPC-R2-03 (R3-09 (e)), VV1112-r2-06 §3.15.12 head',
        "Of item 122 (g)'s bars, T122-4 (every stressor type and archetype\n"
        "has its map row) is V11's compile check and V08's census at the pinned baseline, V09's T-V9-85 takes T122-2's interface\n"
        "clause and V06's T-V6-75 T122-1's hand-over clause; this volume measures the rest on its **crisis fixtures** — from M3b\n"
        "(§16) each look kind previewed (`crises` `preview`, at `previewSeverity`) on B-CITY-lite's seeds of every rung, an island\n"
        "town and an unwalled place; from M-SF V08's dossier crisis fixtures — a siege by a two-army coalition, a refugee wave, a\n"
        "plague with its affected quarter, a famine, a fire, a flood and an earthquake by their calamities, an occupation — each\n"
        "standing through part of the year (at the village rungs V07's village fixtures, its village test taking T122-5 and T122-6\n"
        "there):",
        "Of item 122 (g)'s bars, T122-4 (every stressor type and archetype\n"
        "has its map row) is V11's compile check (T-V11-46) and V08's census at the pinned baseline (T-V8-59), V09's T-V9-85\n"
        "takes T122-2's interface clause, V06's T-V6-75 T122-1's hand-over clause and V03's T-V3-40 the plan clauses of T122-1 –\n"
        "T122-3; V01's T-V1-60, V02's T-V2-60, V08's T-V8-60 and V10's T-V10-52 test their own parts; this volume measures the\n"
        "rest on its **crisis fixtures** — from M3b (§16) each look kind previewed (`crises` `preview`, at `previewSeverity`) on\n"
        "B-CITY-lite's seeds of every rung, an island town and an unwalled place; from M-SF V08's dossier crisis fixtures\n"
        "(V08 §7.1) — a siege by a two-army coalition, a refugee wave, a plague with its affected quarter, a famine, a fire, a\n"
        "flood and an earthquake, each of the last three a calamity with its linked `reconstruction` condition (V08 §3.16 (7)\n"
        "(b)), and an occupation — each standing through part of the year, a siege, a quarantine and a refugee wave standing at\n"
        "once in one week at CITY and at the METROPOLIS cap, their camped ground together past `densityCap` (at the village rungs\n"
        "V07's village fixtures, V07's T-V7-69 taking T122-5's and T122-6's village clauses there):")
    sub('VAP-r2-12 §3.15.12 T122-2',
        "  across each window's ends — a condition with no `untilWeek` and one whose `untilWeek` is not after its `sinceWeek` among\n"
        "  them — 0 mismatched weeks;",
        "  across each window's ends — a condition with no `untilWeek` and one whose `untilWeek` is not after its `sinceWeek` among\n"
        "  them — and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week\n"
        "  (DR44's admission): 0 mismatched weeks;")
    sub('VV1112-r2-06 §3.15.12 T122-5',
        "  at one severity and a severity sweep at each rung, no look's drawn extent falls as the rung or the severity rises; its\n"
        "  headcount clause is item 122 (h)'s area bar below;",
        "  at one severity and a severity sweep at each rung, no look's drawn extent falls as the rung or the severity rises; and,\n"
        "  at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given;\n"
        "  every preview among them) is drawn at its row's `scale` at that severity (linear between its two ends) — its camped\n"
        "  ground, the ring remainder counted at §8.8's ring density, within 5 %, else its units the count §10.2 (c) gives that\n"
        "  share of its place's units (`crisis.scale`'s second count, 0 by rule); its headcount clause is item 122 (h)'s area bar\n"
        "  below;")
    sub('VRC2T-04 (R3-14 (3)), VV1112-r2-06 §3.15.12 T122-6',
        "* **T122-6, never on water, a gate's passage or a keep-out** — `crisis.blocked` 0, a way's carriageway included (§10.2\n"
        "  (d));",
        "* **T122-6, never on water, a gate's passage or a keep-out, and the outskirts shared by priority under the cap** —\n"
        "  `crisis.blocked` 0 — water, a gate's passage and a label's keep-out, and a way's carriageway save a `barricade` across\n"
        "  it (§10.2 (d)), the previews of `blockade`, `raiders` and `rebellion` among the kinds checked; and, on the week standing\n"
        "  a siege, a quarantine and a refugee wave at once at CITY and at the METROPOLIS cap, the camp looks taking the outskirts\n"
        "  in `priority` order, each from what the earlier left, together at most `densityCap` of the outskirts' free land, the\n"
        "  rest on the ring (`crisis.share`, 0 by rule; §10.2 (e));")
    sub('VAP-r2-12, VRC2T-04, VV1112-r2-06 §3.12 crisis row',
        "| a look drawn outside its condition's weeks, differing between the view, an export and a second open, shrinking at a higher severity or rung, or on water, a carriageway, a gate's passage or a keep-out;",
        "| a look drawn outside its condition's weeks or for a condition the viewer's key withholds, differing between the view, an export and a second open, shrinking at a higher severity or rung, off its row's `scale` at its severity, or on water, a gate's passage or a keep-out, or on a carriageway as anything but a `barricade` across it; camp looks placed out of `priority` order or together past `densityCap`;")
    sub('VAP-r2-12, VRC2T-04, VV1112-r2-06 T-V12-54',
        "`crisis.weeks` fails a planted look drawn one week past its `untilWeek` and one drawn for a condition whose `untilWeek` is not after its `sinceWeek`; `crisis.stable` fails a planted unkeyed draw (two opens differ); `crisis.scale` fails a planted CITY camp smaller than the TOWN one at equal severity and a camp shrinking as severity rises; `crisis.blocked` fails a planted tent in a gate's passage and one on water;",
        "`crisis.weeks` fails a planted look drawn one week past its `untilWeek`, one drawn for a condition whose `untilWeek` is not after its `sinceWeek` and a planted look of a condition the `public` key withholds; `crisis.stable` fails a planted unkeyed draw (two opens differ); `crisis.scale` fails a planted CITY camp smaller than the TOWN one at equal severity, a camp shrinking as severity rises and, by its second count, a camp drawn at double its row's `scale` cell; `crisis.blocked` fails a planted tent in a gate's passage, one on water and a planted camp on a carriageway, the `blockade`, `raiders` and `rebellion` barricades across their ways passing; `crisis.share` fails a planted refugee camp placed before the siege and planted camps together past `densityCap`;")
    sub('VRC2T-04 §3.16 row 33 (the barricade as an edge)',
        "several crises past the density cap, a force too large for its frame and margin, an island town, an unwalled siege, a headcount of 0, every rung THORP – the cap | V12 §3.15.12: the pin's tiles; never drawn, counted or widening the framing; drawn from `sinceWeek` on; never standing; by priority, the rest on the ring; the ring's arcs with the frame and hash unchanged; the ring; the `blockade` row; the scale by severity and tier; each rung's `scale` cell |",
        "several crises past the density cap, a force too large for its frame and margin, an island town, an unwalled siege, a headcount of 0, every rung THORP – the cap, a barricade look (`blockade`, `raiders`, `rebellion`) on a way | V12 §3.15.12: the pin's tiles; never drawn, counted or widening the framing; drawn from `sinceWeek` on; never standing; by priority, the rest on the ring; the ring's arcs with the frame and hash unchanged; the ring; the `blockade` row; the scale by severity and tier; each rung's `scale` cell; its `barricade` across the carriageway, no other part there |")
    sub('VV1112-r2-06 J-V12.101 (five statistics)',
        "| J-V12.101 | chose to measure item 122 by its pin and four 0-by-rule statistics,",
        "| J-V12.101 | chose to measure item 122 by its pin and five 0-by-rule statistics,")

    # END of VPC-R2-03 (R3-09 (e)) at X-V12-5, with the fixture week VV1112-r2-06's share clause reads and VV1112-r2-05's rungs
    sub('END VPC-R2-03 (R3-09 (e)), VV1112-r2-06, VV1112-r2-05 X-V12-5',
        "its crisis fixtures (conditions standing through part of the year with their severities, the calamities' targets) and force fixtures (single armies, a two-army coalition, a migrant group, an oversized siege) items 122's and 122 (h)–(i)'s (V12 §3.15.12), and its required-keys dossier item 125 (e)'s (V12 §3.15.15);",
        "its crisis fixtures (conditions standing through part of the year with their severities; each disaster fixture — a fire, a flood, an earthquake — a calamity with its linked `reconstruction` condition (V08 §7.1), its `targets` resolved; one week standing a siege, a quarantine and a refugee wave at once at CITY and at the METROPOLIS cap, their camped ground together past `densityCap`) and force fixtures (single armies, a two-army coalition, a migrant group, an oversized siege) items 122's and 122 (h)–(i)'s (V12 §3.15.12), and its required-keys dossier at every rung item 125 (e)'s (V12 §3.15.15);")
    sub('END VPC-R2-03 (R3-09 (e)) §1b dossier table',
        "| V08's crisis fixtures in the manifest (M-SF); read as view inputs only, never a calibration target |",
        "| V08's crisis fixtures in the manifest (M-SF), each disaster fixture a calamity with its linked `reconstruction` condition (V08 §3.16 (7) (b)); read as view inputs only, never a calibration target |")

    # ===================================================================================================================
    # VV1112-r2-04: §3.11's look cells of items 122–124
    # ===================================================================================================================
    sub('VV1112-r2-04 (a) §3.11 priority is an enumeration',
        "item 122's look rows'\n`scale`, `priority` and `lookLevel` and its settings",
        "item 122's look rows'\n`scale` and `lookLevel` and its settings")
    sub('VV1112-r2-04 (b), (c) §3.11 ranges by element kind; the settings.weather block',
        "item 123's threshold ranges by element kind\nand material, its decay rates by material and its default age, item 124's climate rows' weather columns (V11's rows) —",
        "item 123's threshold ranges by element kind,\nits decay rates by material and its default age, item 124's climate rows' weather columns and the numbers of the\nclimate table's `settings.weather` block (the kinds' `lengthS` and `hours`, the site factors and `forestShareMin`; not\nits two owner-stamped caps, V11 §3.25.11) —")
    sub('VV1112-r2-04 §3.15.14 (the same cells at the item\'s note)',
        "Item 124 adds no `StatBarSpec` and no register line (its weather columns take the default line, V12 §3.11).",
        "Item 124 adds no `StatBarSpec` and no register line (its weather columns and the `settings.weather` block's numbers take\nthe default line, V12 §3.11).")
    sub('VV1112-r2-04 §1b item-124 row; VV1112-r2-07 (its tiers)',
        "V11's climate rows' weather columns; §8.8's effects layer and the frame timer | the pin's off-state sets; the timing phase's rows; the nightly statistics' C rows; T-V12-57 |",
        "V11's climate rows' weather columns and the climate table's `settings.weather` block; §8.8's effects layer and the frame timer | the pin's off-state sets; the timing phase's and the visual-regression run's rows; the PR tier's checks and the nightly statistics' C rows; T-V12-57 |")

    # ===================================================================================================================
    # VV1112-r2-05: T125-1's required-keys dossier at every rung
    # ===================================================================================================================
    sub('VV1112-r2-05 §3.15.15 T125-1',
        "holding only SettlementForge's required keys, in §13.2's frozen manifest) at TOWN, CITY and the METROPOLIS cap generates\n"
        "  every stage's output,",
        "holding only SettlementForge's required keys, in §13.2's frozen manifest) at every rung — THORP, HAMLET and VILLAGE\n"
        "  through the village product (V07; the port's router hands a dossier below 1 500 people to it, V08 §3.10), TOWN, CITY\n"
        "  and the METROPOLIS cap — generates every stage's output,")
    sub('VV1112-r2-05 T-V12-58',
        "On the required-keys dossier `port.fallbacks` is 0 at TOWN, CITY and the cap and fails",
        "On the required-keys dossier `port.fallbacks` is 0 at every rung, THORP to the METROPOLIS cap, and fails")
    sub('VV1112-r2-05 §3.16 row 36',
        "refused with `E_LINE_UNSUPPORTED` (§11.4), no document made and none compared |",
        "refused with `E_LINE_UNSUPPORTED` (§11.4), no document made and none compared; at every rung, the village rungs through V07's product: a full map with every fallback reported |")
    sub('VV1112-r2-05 §3.4.2 port.fallbacks row',
        "| f | on the required-keys dossier (V12 §3.15.15): the fields",
        "| f | on the required-keys dossier at every rung (V12 §3.15.15): the fields")
    sub('VV1112-r2-05 §1b dossier table (required keys)',
        "| item 125 (e)'s full-map bar and `item125.host` | the required-keys dossier, V08's fixture in the manifest |",
        "| item 125 (e)'s full-map bar and `item125.host` | the required-keys dossier at every rung, V08's fixture in the manifest |")
    sub('VV1112-r2-05 J-V12.104',
        "| J-V12.104 | chose to measure item 125 by a full-map count on the required-keys dossier —",
        "| J-V12.104 | chose to measure item 125 by a full-map count on the required-keys dossier at every rung —")

    # ===================================================================================================================
    # VV1112-r2-07 (R3-26): V12 takes §13.8's tiers
    # ===================================================================================================================
    sub('VV1112-r2-07 §3.15.11',
        "This volume measures the other five clauses, from M4 (§16), on\nV09's app harness in §12.1's timing phase, on three **device fixtures**",
        "This volume measures the other five clauses, from M4 (§16), on\nV09's app harness — T121-2, T121-3 and T121-8 in §12.1's timing phase, T121-5 at PR (§13.8) — on three **device\nfixtures**")
    sub('VV1112-r2-07 §6 item-121 row',
        "| inside §13.8's timing phase, ≤ 20 min wall per milestone run; the pin ≤ 2 CPU-min nightly | M4 (§16) | the rungs alternate milestone runs; the 5K and 8K fixtures at milestones only |",
        "| T121-2, T121-3 and T121-8 inside §13.8's timing phase, ≤ 20 min wall per milestone run; T121-5's captures at PR, each level on one device fixture, inside V09's PR run of its app harness (T-V9-84 takes the captures); the pin ≤ 2 CPU-min nightly | M4 (§16) | the rungs alternate milestone runs; the 5K and 8K fixtures at milestones only; at PR the levels rotate over runs, every level nightly |")
    sub('VV1112-r2-07 §6 item-123 row',
        "and `item123.damage` | ≤ 5 CPU-min nightly | the V03 step that draws a decayed or ruined plan; M6-E (§16) | every fourth level nightly, all 21 at milestones |",
        "and `item123.damage` | ≤ 5 CPU-min at PR on the damage fixtures (the 21 levels); H-100's decay runs nightly from M6-E | the V03 step that draws a decayed or ruined plan; M6-E (§16) | every fourth level at PR, all 21 nightly and at milestones |")
    sub('VV1112-r2-07 §6 item-124 row',
        "and `item124.effects` | ≤ 10 CPU-min nightly; the frame cost inside §13.8's timing phase | M3b (§16) | the climate rows alternate nights |",
        "and `item124.effects` | T124-3, T124-4 and T124-9 at PR on one climate row per run, rotating, and on every row nightly, ≤ 10 CPU-min nightly; `weather.frameMs`, `weather.cover` and `weather.luma` inside §13.8's timing phase and the visual-regression run; the pin's suites nightly | M3b (§16) | the climate rows alternate nights |")
    sub('VV1112-r2-07 (§13.8\'s T125 row), VV1112-r2-05 §6 item-125 row',
        "| item 125's measurements (`port.fallbacks` on the required-keys dossier at TOWN, CITY and the cap) and `item125.host` | ≤ 3 CPU-min nightly | M-SF (§16) | — |",
        "| item 125's measurements (`port.fallbacks` on the required-keys dossier at every rung, THORP to the METROPOLIS cap, the village rungs through V07's product) and `item125.host` | `item125.host` at PR on B-DOSSIER-lite; the required-keys dossier at every rung nightly, ≤ 3 CPU-min | M-SF (§16) | — |")
    sub('VV1112-r2-07 §6 item-126 row',
        "and `item126.resize` | ≤ 5 min wall nightly on V09's app harness | M2a (§16); every tool's script from M3a | the tools' scripts alternate nights |",
        "and `item126.resize` | ≤ 5 min wall at PR on V09's app harness (each tool's script from the milestone that lands it) | M2a (§16); every tool's script from M3a | the tools' scripts rotate over PR runs, every tool nightly |")
    sub('VV1112-r2-07 §1b item-121 row',
        "§12.8's memory measurement | the pin's off-state sets; the timing phase's rows; the nightly statistics' C rows; T-V12-53 |",
        "§12.8's memory measurement | the pin's off-state sets; the timing phase's rows; the PR tier's check of T121-5's captures; T-V12-53 |")
    sub('VV1112-r2-07 §1b item-126 row',
        "(V09 §4.12's list) | the pin's off-state sets; the nightly statistics' C rows; T-V12-59 |",
        "(V09 §4.12's list) | the pin's off-state sets; the PR tier's checks; T-V12-59 |")
    sub('VV1112-r2-07 J-V12.100 (the text-layer test at PR)',
        "| J-V12.100 | chose to measure item 121 on three device fixtures in the timing phase — the gesture and 10-second counts on a threshold fixture whose p95 straddles the loop's two tests, Auto's p95 against the tier's budget, a text-layer pixel test against the same view at the device's ratio and the ultra tier's native-4K memory read by §12.8 —",
        "| J-V12.100 | chose to measure item 121 on three device fixtures — in the timing phase the gesture and 10-second counts on a threshold fixture whose p95 straddles the loop's two tests, Auto's p95 against the tier's budget and the ultra tier's native-4K memory read by §12.8, and at PR a text-layer pixel test against the same view at the device's ratio —")

    # ===================================================================================================================
    # VV1112-r2-13: §7.7's rows by number
    # ===================================================================================================================
    sub('VV1112-r2-13 §3.11 item-114 line (twice)',
        "| item 114's generation-time shares (§7.7's condition row from readiness and wealth; V11's rows) | V11 | `measure` at M2b, where §7.7's condition row lands (§13.8),",
        "| item 114's generation-time shares (§7.7's DR41 from readiness and wealth; V11's rows) | V11 | `measure` at M2b, where §7.7's DR41 lands (§13.8),")
    sub('VV1112-r2-13 T-V12-47',
        "with §7.7's condition row and the state rows, §13.8)",
        "with §7.7's DR41 and the state rows, §13.8)")
    sub('VV1112-r2-13 §1b history rows',
        "| §7.7's history rows (DR36 onward) |",
        "| §7.7's history rows DR36 – DR39 |")
