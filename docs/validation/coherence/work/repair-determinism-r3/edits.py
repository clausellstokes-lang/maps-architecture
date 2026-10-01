"""edits.py — the count-asserted edits of lane coherence/repair-determinism-r3 (read by gen.py).

Each entry: (heading prefix, marker A, marker B, [(old, new, count)], wrap, issue ids[, (first indent, rest indent)]).
A prose span's `old` strings are matched on the span joined into one line (single spaces); a code or table line's on
the line itself. Every id the edit closes is listed; MERGED ids are closed by their target's edit.
"""
H61, H63, H65, H71, H77 = '### 6.1 ', '### 6.3 ', '### 6.5 ', '### 7.1 ', '### 7.7 '

EDITS = [
    # ---- §6.1 The weather stream: the live rate (VDC2-01 per R3-23 (a)), the marks' keys (VDC2-02), Start a shower
    # now at a moment with no live kind (VDC2-04, amended per R3-23 (b)).
    (H61, '* **The weather stream** (g item 124; J137).', "(V11) and §8.2's, never a draw's.", [
        ("its stream key the one mixer's round with `STAGE_VIEW`, `view.weather` and reroll, attempt, epoch and salt 0; "
         "its uniforms draw, in order, the clear gap before it, its kind by the climate row's weather columns for the "
         "week band of §2.9's `yearWeek` (V11) and its length inside that column's range. A spell's kind and length are "
         "fixed when it starts, so a change of the year position or of the climate row takes effect from the next spell. "
         "**Start a shower now** (V09) starts a spell of the season's commonest kind at once as the next spell index, its "
         "length drawn there, the press held in session state; switching the effects off draws nothing and stops no "
         "clock. The timeline is therefore a pure function of (the session seed, the view's time since the map opened, "
         "the climate row and year position in force, the presses), and",
         "its stream key the one mixer's round with `STAGE_VIEW`, `view.weather` and reroll, attempt, epoch and salt 0. "
         "Its marks draw per world-aligned cell on the spell's entity key folded with the cell (the registry row). Its "
         "uniforms draw, in order, the clear gap before it as a unit exponential E = −ln(1 − u) (`dmath.log`), its kind "
         "and its length (V11 §3.25.11's reading of the columns). The gap is spent at the live rate: from the end of "
         "spell i − 1, or the map's opening, the clear time runs until the integral over view time of R(t) ÷ 3 600 "
         "reaches E, where R(t) is the summed rate of the kinds live at view time t — each kind's `perHour` × V11's site "
         "factor, the sites read from the model at the view's head. A kind is live at a moment when its band in the "
         "climate row's weather cells holds §2.9's `yearWeek` and, under `light: 'time'`, its `hours` hold the view's "
         "hour (§2.9's `time` key). So a time with no live kind (R = 0) spends none of the gap and brings no spell, and a "
         "change of the year position, the climate row, the sites or the hour changes the rate from that moment, the "
         "drawn E kept. The kind is drawn when the spell starts, kind k with chance its rate ÷ R at that moment (the "
         "rates that spent the gap's last part), and the length uniform in that kind's `lengthS`. A spell's kind and "
         "length are fixed once it starts; a change acts on a running spell only through §8.2's hard rules (a `snow` "
         "spell on a row where snow cannot fall draws nothing). **Start a shower now** (V09) starts a spell of the "
         "commonest live kind at once as the next spell index, its length drawn there, the press held in session "
         "state — the commonest kind as V11 §3.25.11 defines it (the live kind of greatest rate after the sites' factors, "
         "at that moment); at a moment with no live kind (R = 0) a press starts none, and V09 disables the button there with its "
         "reason (§7.8: never a silent no-op). Switching the effects off draws nothing and stops no clock. The timeline "
         "is therefore a pure function of (the session seed, the view's time since the map opened, the climate row, "
         "year position, sites and view hour in force at each moment, the presses), and", 1),
    ], True, ['VDC2-01', 'VDC2-02', 'VDC2-04']),
    # ---- §6.1's registry row: the marks' keys at their home (VDC2-02).
    (H61, '| `view.weather` | 0 |', '| `view.weather` | 0 |', [
        ("keyed from the session seed by the spell index, never from the seed key; read by",
         "keyed from the session seed by the spell index, never from the seed key; the spell's marks (§8.2's *Weather "
         "effects*: positions, lengths and sways) on further keys of the same concern — the spell's entity key folded "
         "through the one mixer with the frame's world-aligned cell as structured components — so a mark stays put while "
         "its spell lasts; read by", 1),
    ], False, ['VDC2-02']),
    # ---- §6.3 Plan damage: every element id its units key (VV34-r2-16; closes VAL-R2-03) and the range by kind alone
    # (VDC2-06).
    (H63, '* **Plan damage — one threshold per plan element', '(V03 §3.11) draws by its own new id', [
        ("(`wall:`, `op:`, `win:`, `core:`, `furn:`), a floor area and the roof bay over a room by their room's address "
         "— folded into the key",
         "(`wall:`, `op:`, `win:`, `core:`, `furn:`); a floor area, the roof bay over a room, a choir flight and a "
         "`cellarVault` by their room's address; a `cryptVault` cell by its room's address and its grid node, the one "
         "`cryptVault` of a crypt whose ring holds no cell centre by its room's address (V04 §5.6 (2)) — folded into the "
         "key", 1),
        ("[lo, hi] its element kind's range by material (V11's rows: outer walls and ground floors late, partitions and "
         "upper floors early; item 123 (c)).",
         "[lo, hi] its element kind's range (V11 §3.25.10's `damage.elements` row: outer walls and ground floors late, "
         "partitions and upper floors early; item 123 (c)); the walls material acts only through the decay level's rate "
         "(V06's `decayLevel`, V11's `damage.materials`).", 1),
    ], True, ['VV34-r2-16', 'VAL-R2-03', 'VDC2-06']),
    # ---- §6.5 (3): the timeline function inside the lint's scope, and among the closure's roots (VDC2-03).
    (H65, 'lighting test, while the GPU implementation', 'backends, compositing — stays outside', [
        ("while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62). CI finds that code as the "
         "import closure of those implementations, column writers and the instance function, from the TypeScript program",
         "while the GPU implementation, held to it by a tolerance, stays outside (J-A68.62); and the weather stream's "
         "timeline function (§6.1 *The weather stream*: the spell draws, the gap's exponential through `dmath.log`, the "
         "rate integral, the kind's pick and the length) with every function it calls, whose spells (9)'s "
         "weather-timeline test compares across engines (T124-9). CI finds that code as the import closure of those "
         "implementations, column writers, the instance function, the CPU reference light pass and the timeline "
         "function, from the TypeScript program", 1),
    ], True, ['VDC2-03']),
    # ---- §6.5 (9): the weather timeline test fixes the edges it now defines (VDC2-01; VDC2-04's press).
    (H65, '* *weather timeline* (g item 124)', 'with the effects on and off (§6.1 *The weather stream*);', [
        ("replay the same spells — kind, start and length — on the five engines (T124-9); two session seeds give",
         "replay the same spells — kind, start and length — on the five engines (T124-9); a scripted year-position "
         "change from a week with no live kind into a live week, and back, replays identically on the five engines, a "
         "spell starting in the live week and a press in the week with no live kind starting none, and so does a view "
         "hour crossing a kind's `hours` under `light: 'time'` (T124-9); two session seeds give", 1),
    ], True, ['VDC2-01', 'VDC2-04']),
    # ---- §7.1 drawWay: the raised deck's ends are its feet, cited (VKr2-06 per R3-25 (a); closes VM-R2T-05).
    (H71, "| { t: 'drawWay'; points: PointCm[]", "| { t: 'drawWay'; points: PointCm[]", [
        ("its two ends ramps or stairs joined to ground vertices, crossing the ways beneath with no junction */",
         "its two ends its feet (§2.7's `RaisedWayRecord.feet`), crossing the ways beneath with no junction */", 1),
    ], False, ['VKr2-06', 'VM-R2T-05']),
    # ---- §7.1 *Raised ways, aqueducts and retaining walls*: the drawn end beyond the frame named at the edit's home
    # (VM-R2T-05's case; judgment (2)).
    (H71, '**Raised ways, aqueducts and retaining walls (item 110', 'course to the nearest one); its interior points', [
        ("an end elsewhere moves along the course to the nearest one); its interior",
         "an end elsewhere moves along the course to the nearest one; a course drawn beyond the frame bends to the "
         "arena's outer ring, its foot at the ring point, §2.7 *At the frame*); its interior", 1),
    ], True, ['VKr2-06', 'VM-R2T-05']),
    # ---- §7.1's outcome table: the connector that finds no route, with the row's own keys (VDC2-16; closes VKr2-04,
    # VPC-R2-18).
    (H71, '| an `addUndergroundAccess` whose terrain rules out', '| an `addUndergroundAccess` whose terrain rules out', [
        ("or whose connector passes its route's bound (II.7.6) | bent, else refused | the nearest lawful basement form "
         "(half cellar, walk-out, a hatch to a crawl space); else the refusal naming the terrain or the route's bound | "
         "V09 §4.17's rows |",
         "or whose connector passes its route's bound or finds no route (II.7.6 step 3: `E_NO_PATH`, the basement ring "
         "enclosed within `foundationClearM` by other footprints, basement rings or dug passages, or the water table "
         "above every floor between it and the target) | bent, else refused | the nearest lawful basement form (half "
         "cellar, walk-out, a hatch to a crawl space); else the refusal naming the terrain, the route's bound, or the "
         "blocking building or the water table, the basement not laid | `bend.under.basement`, "
         "`refuse.under.basement`, `refuse.under.route` |", 1),
    ], False, ['VDC2-16', 'VKr2-04', 'VPC-R2-18']),
    # ---- §7.7 item 1: the host's commands (END of VAT-r2-04, R3-21).
    (H77, "(T125-2) — and the host's view commands", "inputs, which the map never needs (item 125 (c))", [
        ("and the host's view commands (§11.2, §11.3: a week, the layers shown, a selection) are commands, never inputs,",
         "and the host's commands (§11.3: a week and a selection by `view.set`, the layers shown by a logged `setLayer` "
         "sent by `doc.apply`, as a user's toggle) are commands, never inputs,", 1),
    ], True, ['END VAT-r2-04']),
    # ---- §7.7 item 1: no input gives a bearing (VDC2-11 per R3-22 (a)).
    (H77, 'input): the bearings, latitude and cell words', "generator's defaults or the user's settings (DR1, DR3", [
        ("input): the bearings, latitude and cell words they would give are the dossier's where it carries them, else "
         "the generator's defaults or the user's settings (DR1, DR3, DR19, DR29, DR42).",
         "input): the latitude and the site's words they would give are the dossier's where it carries them — its "
         "culture (DR29), its terrain type, access and deposits (DR1, DR19, DR42) — else the generator's defaults; the "
         "partners' and the deposits' bearings are the generator's draws or the user's settings, never an input "
         "(layer 2's *Bearing*, DR3, DR19; item 125 (b)).", 1),
    ], True, ['VDC2-11']),
    # ---- §7.7 DR44: the source word (VPC-R2-02 per R3-11 and R3-09 (d); closes VDC2-09; END of VPC-R2-03), one look
    # for a stressor and a condition of one kind (END of VAH-r2-02, R3-12), the condition's tier (VAH-r2-01 per R3-13).
    (H77, '| DR44 | the crisis looks', '| DR44 | the crisis looks', [
        ("| each standing overlay → its `map` row (§10.2's `RosterTables.crisis`: the `stressor`, `archetype` or `event` "
         "row of its source — every SettlementForge stressor type and condition archetype at the pinned baseline has "
         "exactly one, a look kind or `none`, the regional_* pressures `none`; a source with no row reads `none`, "
         "reported `unmapped_word`, V08) → its look row → its scale at the rung by severity, or by headcount at "
         "`areaPerHeadM2` where the dossier gives one, placed by §10.2's *Crisis looks* (c)–(f) and drawn by §8.2's "
         "look rows under §2.9's `crises` key (`off` none; `preview` one look at `previewSeverity` with no condition); "
         "knowledge admission at the viewer's effective key (§9.2's admission function, §11.2): a withheld condition is "
         "never drawn, listed, counted or named; what a crisis leaves",
         "| each standing overlay → the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a stressor's "
         "type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) → its look row "
         "→ its scale at the rung by severity, or by headcount at `areaPerHeadM2` where the dossier gives one, placed by "
         "§10.2's *Crisis looks* (c)–(f) and drawn by §8.2's look rows under §2.9's `crises` key (`off` none; `preview` "
         "one look at `previewSeverity` with no condition). The `map` rows are §10.2's `RosterTables.crisis` (its "
         "`stressor`, `archetype` and `event` rows): every SettlementForge stressor type and condition archetype at the "
         "pinned baseline has exactly one, a look kind or `none` — `regional_migration_pressure` the refugee camp (item "
         "122 (b)'s mass immigration), the other regional_* pressures `none`; a source with no row reads `none`, "
         "reported `unmapped_word` (V08); a stressor's overlay draws no look while a condition's overlay whose map row "
         "gives the same look kind stands (V08 §3.16 (7) (b)). Knowledge admission at the viewer's effective key (§9.2's "
         "admission function, as a band-less reader, §11.2): a condition's `knownTo` is `public` where its `map` row "
         "gives a look (a camp, a quarantine, smoke and ruins are sights) and `secret` where the row is `none`; a key form "
         "listing the overlay's address admits it whatever its tier (V08 §3.16 (7) (e); J-V8.128); a withheld condition "
         "is never drawn, listed, counted or named. What a crisis leaves", 1),
    ], False, ['VPC-R2-02', 'VDC2-09', 'END VPC-R2-03', 'END VAH-r2-02', 'VAH-r2-01']),
]
