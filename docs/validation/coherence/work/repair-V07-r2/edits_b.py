# edits_b — V07 §6's cost line, V07 §7's take-over heads and pin registrations (VAP-r1-01, R2-08, R2-09; T114-9's
# village end, R2-27 (d)), the new T-V7-69 (G122-V07), V07 §8 (R2-32, item 122's line, VV78-r1-02), J-V7.146, V07 §12.
EDITS = [
    # G122-V07: item 122's cost (V07 §5.6 (9)).
    ('G122-V07',
     "item 115's ceiling a row read in S10b; items 117 and 118 no model time (looks, drawn lazily per visible tile within §12.5's\n"
     "budget). **The underground tail**",
     "item 115's ceiling a row read in S10b; items 117, 118 and 122 no model time (looks, drawn lazily per visible tile within\n"
     "§12.5's budget; `villageDisasterUnits` ≤ 0.5 ms at the VILLAGE top, one pass over the district's plots and their shared\n"
     "edges, memoised per model digest, V07 §5.6). **The underground tail**", 1),

    # VAP-r1-01 (R2-08): V07 §7's head names the take-over in each test's head; R2-09: each pin states its registration.
    ('VAP-r1-01 R2-08 R2-09 G122-V07',
     "T111-5, and the village halves of T113-1 and T113-3 and of items 114–120's bars, each test naming the bar it takes over); every\n"
     "no-op pin registers on V12 §3.7.8's engine and reads \"off\" as V11 §3.24.0's switch table.",
     "T111-5, the village halves of T113-1 and T113-3, and the village clauses of items 114–120's bars and of item 122's T122-5 and\n"
     "T122-6, each test naming in its head the bars it takes over); every no-op pin registers on V12 §3.7.8's engine — its test\n"
     "stating that registration in one clause — and reads \"off\" as V11 §3.24.0's switch table.", 1),

    # R2-09: the registration clause of every V07 pin V12 §2.13 lists.
    ('R2-09', "(item 105 (k)'s no-op pin)",
     "(item 105 (k)'s no-op pin — the `item105.web` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), "
     "written by the V-M2 seat)", 1),
    ('R2-09', "byte-identical to the build without these kinds (a `NoOpPin`); the village",
     "byte-identical to the build without these kinds (a `NoOpPin` — the `item109.underground` registration of the village "
     "goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2u seat); the village", 1),
    ('R2-09', "the output is byte-identical to the build before item 111 (a `NoOpPin`)",
     "the output is byte-identical to the build before item 111 (a `NoOpPin` — the `item111.water` registration of the village "
     "goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M1 seat)", 1),

    # T-V7-59: T114-9's village clause (R2-27 (d), R2-08) and its pin registration (R2-09).
    ('R2-08 R2-27 (d) R2-09',
     "| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3; run on V06's replay engine):",
     "| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3, and T114-9's village clause; run on V06's "
     "replay engine):", 1),
    ('R2-08 R2-27 (d)',
     "crosses the ruined wall only at gate gaps and breaches save a through road's cut,",
     "crosses the ruined wall only at gate gaps and breaches save a through road's cut (the run set `dismantled` over its width, "
     "V07 §3.12a (4) (d)), with 0 violations of §5.3's wall-crossing row (T114-9),", 1),
    ('R2-09', "with the replay off the output is byte-identical (a `NoOpPin`)",
     "with the replay off the output is byte-identical (a `NoOpPin` — the `item113.history` registration of the village goldens "
     "on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat)", 1),

    # VAP-r1-01: T-V7-62 – T-V7-68's heads; T-V7-63's T115-4 clause (R2-09); the pins' registrations (R2-09).
    ('VAP-r1-01', "| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses):",
     "| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses; takes T114-1 – T114-8's village clauses):", 1),
    ('R2-09', "the existing neglect and repair behaviour is reproduced (a `NoOpPin`)",
     "the existing neglect and repair behaviour is reproduced (a `NoOpPin` — the `item114.condition` registration of the "
     "palisade goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat)", 1),
    ('VAP-r1-01 R2-09 VV78-r1-01 R2-14',
     "| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses): rich THORP, HAMLET and VILLAGE fixtures at the wealth "
     "maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or a dossier record "
     "(none at THORP and HAMLET without one); a dossier-named hall and a hand-placed manor keep their design, the clerk noting the "
     "excess; a village grown into a town builds its new grand buildings from that epoch, a shrunk town keeps its grand buildings as "
     "they stand; the manor count never rises with wealth (a wealth sweep at a fixed population and government leaves it unchanged) "
     "| C | V-M2 (the class mix and manor rule); the composition clause with V02's M6 (`notApplicable` before) |",
     "| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses; takes T115-1 – T115-4's village clauses): rich THORP, "
     "HAMLET and VILLAGE fixtures at the wealth maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one "
     "manor, only with a lord or when specified (V08 §3.16 (3); none at THORP and HAMLET otherwise); a dossier-specified grand "
     "building — a manor record, and at a HAMLET a `castle` or `tower_house` record, a town class playing itself (V07 §3.11 step 3) "
     "— and a hand-placed manor keep their design, the clerk noting the excess; a village grown into a town builds its new grand "
     "buildings from that epoch, a shrunk town keeps its grand buildings as they stand; the manor count never rises with wealth (a "
     "wealth sweep at a fixed population and government leaves it unchanged); with every `grandeur.ceiling` row's `enabled` false "
     "(V11 §3.24.0's off form) `B-VILLAGE` is byte-identical to the build before item 115 — the `item115.off` registration of the "
     "village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat (T115-4) | C | V-M2 (the class mix, the manor "
     "rule and the `item115.off` pin); the composition clause with V02's M6 (`notApplicable` before) |", 1),
    ('VAP-r1-01', "| T-V7-64 | item 116 at village rungs: at THORP",
     "| T-V7-64 | item 116 at village rungs (takes T116-1 – T116-4's village clauses): at THORP", 1),
    ('VAP-r1-01 R2-09',
     "| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included): the same village document hashes "
     "identically in all 52 weeks;",
     "| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included; takes T117-1 – T117-8's village "
     "clauses): the same village document hashes identically in all 52 weeks — the `item117.season` registration of the village "
     "goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat;", 1),
    ('VAP-r1-01', "| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses):",
     "| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses; takes T118-1 – T118-6's village clauses):", 1),
    ('R2-29 (b)', "staging lands on the named or keyed village place, else its kind's fallback;",
     "staging lands on the named or keyed village place of §8.2's place table, else its kind's fallback;", 1),
    ('R2-09', "with no traditions and no preview, byte-identical (a `NoOpPin`)",
     "with no traditions and no preview, byte-identical (a `NoOpPin` — the `item118.festival` registration of the village "
     "goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat)", 1),
    ('VAP-r1-01', "| T-V7-67 | the one-time waits (item 119 (f)'s village clauses):",
     "| T-V7-67 | the one-time waits (item 119 (f)'s village clauses; takes T119-2 – T119-4's village clauses):", 1),
    ('R2-08 R2-35', "| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses):",
     "| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses; takes T120-1's and T120-4's village clauses):", 1),
    ('R2-09',
     "the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles;",
     "the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles — the "
     "`item120.find` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat;", 1),
    ('R2-32', "at the VILLAGE top | C | V-M3 (with V09's Find; risk (13)) |",
     "at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)) |", 1),

    # T-V7-60 (h) covers the crisis looks' edge row (V07 §3.17).
    ('G122-V07', "**(h)** editing, the clerk, rendering, labels and exports, and Find;",
     "**(h)** editing, the clerk, rendering, labels and exports, Find and the crisis looks;", 1),

    # G122-V07: T-V7-69, the village bar of item 122 (R2-35: T122-5, T122-6).
    ('G122-V07 R2-35',
     "suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)) |\n",
     "suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)) |\n"
     "| T-V7-69 | item 122 at village rungs (item 122 (g)'s village clauses; takes T122-5's and T122-6's village clauses): on "
     "THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures — with and without a palisade (one closing only by barrier arcs "
     "among them), a green, a market, an entry, an outlying farmstead, an arable field and an end — each look kind previewed at "
     "severity 0, 0.5 and 1 and, from M-SF, a dossier fixture carrying each mapped condition: **(a)** each look's extent lies "
     "within its rung's `scale` cell, linear in severity, a camp the dossier sizes taking `areaPerHeadM2` × its heads within 10 %, "
     "and no siege at THORP or HAMLET draws a trench or earthwork line (T122-5); **(b)** 0 look elements on water, in a gate's "
     "passage (a palisade gate's opening and 4 m along its way each side) or over a label's keep-out, and no camp on the green "
     "or on a plot — a toft, a close, a croft, a plot of DR18's clusters (T122-6); **(c)** a disaster ruins whole units of "
     "`villageDisasterUnits` — the ends, or the toft groups of a village with no end — each unit's `DisasterUnit` fields as V07 "
     "§5.6 (3) reads them, the calamity's matched targets first, every building of a returned unit drawing the ruined look and "
     "none outside; a look scaled as a share of its place's n units at share s takes round(s × n) clamped to [1, n] where s is "
     "above 0; **(d)** each place reads as V07 §5.6 (2) states: a siege of a village "
     "with no walled stretch draws the blockade on its entries' ways, a palisaded one its camps beyond the walled stretches and "
     "its engines facing the weakest runs, then the gates; beast's torn sections only on a standing palisade, else watch-fires "
     "along the perimeter; famine bares every arable face, the meadow and the commons, its pens empty and the "
     "market's stalls shuttered; raiders burn the outermost outlying farmsteads, else the farm tofts farthest from the heart; "
     "the refugee camp on `campLand` by the main approach road's gate; the quarantine's marked doors and cordon in one unit of V07 §5.6 (3); **(e)** the "
     "answer to a `why` on an end a disaster look ruins and on a field a famine look leaves bare carries `info.crisis.ruinedFor` "
     "while the look stands at the viewer's key, and none otherwise; **(f)** an epoch, an edit or a hand-off that changes the "
     "ends re-derives the units in that commit, a look over a hand-off reads the rung in force, and under `VG` no look draws "
     "| C | V-M3 (the previews and the readings); the dossier clauses with V08's reading at M-SF; the disaster clause at the later "
     "of V-M3 and M5 (V01's `disasterSource`), the refugee camp's frontier clause at the later of V-M3 and M6-E (V06's "
     "`frontierFor`) (risk (14)) |\n", 1),

    # V07 §8: item 122 at V-M3 (G122-V07), T-V7-68 at the later of V-M3 and M5 (R2-32), the price (R2-06 (c)).
    ('G122-V07',
     "item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the edge suite's V-M3 clauses |",
     "item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the crisis looks at the village rungs "
     "(item 122; V07 §5.6: the places' village readings, `villageDisasterUnits`, the crisis lines); the edge suite's V-M3 clauses |", 1),
    ('R2-32 G122-V07', "T-V7-61, T-V7-62's epoch clause, T-V7-64 – T-V7-68 — the clauses",
     "T-V7-61, T-V7-62's epoch clause, T-V7-64 – T-V7-67, T-V7-68 at the later of V-M3's exit and M5's (Find's milestone), T-V7-69 "
     "(its dossier clauses at M-SF, its disaster and camp clauses as its row states) — the clauses", 1),
    ('G122-V07 R2-06 (c)', "| 9.5–14.25 |", "| 9.75–14.75 |", 1),
    ('G122-V07 R2-06 (c)', "| **total** | | | **30.25–42.5** |", "| **total** | | | **30.5–43** |", 1),
    ('G122-V07 VV78-r1-02',
     "The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 routed here (item 111 at V-M1, + 0.25–0.5; items 114\n"
     "and 115 at V-M2, + 0.5–0.75; at V-M3 item 113's village part + 0.75–1.25, item 114's epochs and looks + 0.25–0.5, items 117 and\n"
     "118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's one-time\n"
     "waits + 0.25, item 120's Find at the village rungs + 0.25–0.5); §16's village line and INDEX §4 carry it (item 568 computes\n"
     "the totals once).",
     "The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 and 122 routed here (item 111 at V-M1, + 0.25–0.5;\n"
     "items 114 and 115 at V-M2, + 0.5–0.75; at V-M3 item 113's village part + 0.75–1.25, item 114's epochs and looks + 0.25–0.5,\n"
     "items 117 and 118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's\n"
     "one-time waits + 0.25, item 120's Find at the village rungs + 0.25–0.5, item 122's crisis looks at the village rungs\n"
     "+ 0.25–0.5); §16's village line and INDEX §1 carry it (item 568 computes the totals once).", 1),
    ('R2-32 G122-V07',
     "(13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows;\n"
     "*pre-decided fallback:* if they have not landed by V-M3, the village's readings (V07 §5.5) ship as the gazetteer's rows and\n"
     "area targets alone, and T-V7-68 exits at the first V07 exit after V09's Find.",
     "(13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows,\n"
     "landing at M5 (Find's milestone, with V01's area and gap services); *pre-decided fallback:* if M5 has not exited when V-M3\n"
     "does, the village's readings (V07 §5.5) ship as the gazetteer's rows and area targets alone, and T-V7-68 exits with M5's\n"
     "exit. (14) **The crisis looks** (item 122) are §8.2's `live.crises` over §10.2's table (M3b) and V11's rows, the conditions'\n"
     "`crisis.map` rows with V08's reading (M-SF), V01's `campLand` (M3b) and `disasterSource` (M5) and V06's `frontierFor` (M6-E);\n"
     "*pre-decided fallback:* the village's readings (V07 §5.6) and `villageDisasterUnits` ship at V-M3, exercised by previews, and a\n"
     "clause of T-V7-69 whose service has not landed exits at the first V07 exit after it.", 1),

    # J-V7.146 (G122-V07).
    ('G122-V07',
     "a viewer looking for \"the mill end\" or \"the north field\" means those, and a kept chip lets a viewer watch a place come and go across epochs as item 120 (f) asks of a closed smithy | V07 §5.5, W83, T-V7-68 |\n",
     "a viewer looking for \"the mill end\" or \"the north field\" means those, and a kept chip lets a viewer watch a place come and go across epochs as item 120 (f) asks of a closed smithy | V07 §5.5, W83, T-V7-68 |\n"
     "| J-V7.146 | chose to read item 122's crisis looks at the village rungs as §10.2's places read on the village's own records — "
     "the ends as a disaster's units in V01's `DisasterUnit` shape (the toft groups of a village with no end), the entries' ways "
     "as the approach roads with a main approach road chosen by the DR3 partner of greatest weight, the palisade's walled "
     "stretches as the walls and the edge, the hinterland's furlongs, meadow and commons as famine's fields, V01's `campLand` "
     "read at the perimeter and the fallow course, an end as the quarantine's affected quarter — with a war band's camp and no "
     "siege line at THORP and HAMLET, every share of a place's units counted as V01 §3.16 (5) counts the disaster's units, and "
     "the hand-over through the village's own epochs, over a separate village look table or the town's places scaled down, "
     "because item 122 routes \"the village and smaller rungs\" here and its (c) gives a hamlet a war band's camp and a city "
     "the siege line, a village's parts are its ends (J-V7.20) and its outskirts its hinterland, one count of a share serves "
     "every rung, and a look standing at a positive share must not round a small place's share to nothing | V07 §5.6, W84, "
     "T-V7-69 |\n", 1),

    # V07 §12 (R2-07's subset list brought to the items this volume applies; G122-V07).
    ('R2-07 G122-V07', "(files f and g\napplied, items 111 and 113–120 included);",
     "(files f and g\napplied, items 111, 113–120 and 122 included);", 1),
    ('G122-V07',
     "that the ends serve as Find's area targets and Show gaps' units (T-V7-68; V-M3); and the",
     "that the ends serve as Find's area targets and Show gaps' units (T-V7-68; V-M3); that the village tiers' crisis looks read at\n"
     "their places and scale — a war band's camp and no siege line at THORP and HAMLET, the ends as a disaster's units — and that\n"
     "`villageDisasterUnits` stays within 0.5 ms (T-V7-69; V-M3); and the", 1),
]
