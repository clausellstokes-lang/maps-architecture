# edits.py — the edits of lane coherence/repair-pipeline-r3, read by gen.py (exec). Each E(head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (base sha256 4ed292e9…).

# ───────────────────────────── §4.2 ─────────────────────────────
# S0: the season row cited by its number (VPC-R2-17).
E(H42, "read only by §8.2's season rows, §11's exports and §7.7's season derivation row, never by a",
       "read only by §8.2's season rows, §11's exports and §7.7's DR42, never by a",
  'VPC-R2-17')

# S1 (10): the mining test with no cavern row (VPC-R2-15).
E(H42, """its mine boost and fissure variant. A sky island's terrain takes `ordinary` and no mining,""",
"""its mine boost and fissure variant. With no `under.systems` cavern row (before the underground layer's rows ship, or
in a pack without that row) the ore clause reads false and the flag rests on the roster and dossier clauses — its one
reader, II.7.6's cavern rule, runs only with that layer, and §7.6's invalidation by slice re-derives S1 when the row
lands. A sky island's terrain takes `ordinary` and no mining,""", 'VPC-R2-15')

# ───────────────────────────── §4.3 ─────────────────────────────
# Raised ways: the feet cited at their one statement (VKr2-05 = VM-R2T-04; R3-25 (a)).
E(H43, """its two ends are ramps
or stairs joined to ground vertices — each of its two feet a vertex on part 0 joined by record to one on its part (§3.4) —,
""",
"""its two ends are its feet
on ground part 0 (`RaisedWayRecord.feet`, §2.7),
""", 'VKr2-05', 'VM-R2T-04')

# ───────────────────────────── §4.4 ─────────────────────────────
# S5a step 1: the impassable-arc clause scoped to a walled stage (VPC-R2-04).
E(H44, """nothing and recording no enceinte where no closing row carries one — and the arcs a land barrier closes are impassable
   to routes as the wall is (§4.2 S3 (7), (9)).""",
"""nothing and recording no enceinte where no closing row carries one — and in a walled stage the arcs a land barrier
   closes are impassable to routes as the wall is (§4.2 S3 (7)), while an unwalled one's routes cross them where §4.3's
   class grade limit admits an edge, else F-ROUTE's `unserved` (§4.2 S3 (9) (a)).""", 'VPC-R2-04')

# Outer moats: a moat laid across a standing raised way (END of VEW-r2-01, model; R3-25 (c)).
E(H44, """S5c
treats the moat as water. Nothing finer than L1 exists yet, so the carve's footprint clears nothing. The innermost""",
"""S5c
treats the moat as water. The carve clears no raised-way support: §2.7's support step (6) re-sites one first in the same
commit; a stage gate on a raised arterial is a raised gate whose tower carries the deck, the deck itself crossing the
channel (no part-0 deck added for it), the part-0 way beneath taking its own ground gate (S7 lays both, §4.8 *Gates*).
Nothing finer than L1 exists yet, so the carve's footprint clears nothing else. The innermost""", 'END VEW-r2-01')

# ───────────────────────────── §4.6 ─────────────────────────────
# Stairs and ramps: a ring-end foot draws neither (VM-R2T-04's clause in R3-25 (a)'s words).
E(H46, """a raised way's two ends (§4.3) are ramps or stairs by
the same rule. The way keeps its one chain in the plat; the stair or ramp is an attribute of the segments it occupies,
drawn and exported with them (§8.2, §11.1).""",
"""a raised way's feet (§2.7's `RaisedWayRecord.feet`) are
ramps or stairs by the same rule, but a foot at a deck end on the arena's outer ring, which draws neither. The way keeps
its one chain in the plat; the stair or ramp is an attribute of the segments it occupies, drawn and exported with them
(§8.2, §11.1).""",
  'VKr2-05', 'VM-R2T-04')

# ───────────────────────────── §4.7 ─────────────────────────────
# Custom chains: the partner's bearing after item 125 (VDC2-13 = VPC-R2-16; R3-22 (a)).
E(H47, "facing its partner's bearing (the realm block's, items 77, 85),",
       "facing its partner's bearing (§7.7 layer 2's *Bearing*; items 77, 85),",
  'VDC2-13', 'VPC-R2-16')

# ───────────────────────────── §4.8 ─────────────────────────────
# Condition at generation: the row cited by its number (VPC-R2-17).
E(H48, "from §7.7's condition row — the dossier's defence",
       "from §7.7's DR41 — the dossier's defence",
  'VPC-R2-17')

# Gates: the raised gate and the wall opening as generation furniture (END of VEW-r2-01, model; R3-25 (c)).
E(H48, """the strip's inner edge. The F-WALL ladder's last rung is §5.2's.""",
"""the strip's inner edge. **A trace across a standing raised way** (a later stage's trace across an S4 viaduct, elevated
road or aqueduct, its crossing station put on the trace by §2.7's support step (6)) takes the crossing as furniture, at
generation as at an epoch, in the form V06 §3.7.6 (5) gives it: for an aqueduct a **wall opening** — an arch in the curtain under the
deck, no gate (no portal, no gate law); for a viaduct or an elevated road a **raised gate** at deck level — a gate whose
tower carries the deck, its portal on the raised part only, the raised arterial's crossing of the trace (S5b) — the
part-0 way beneath, if any, taking its own ground gate by the gate law (§4.4 *Outer moats*). The F-WALL ladder's last
rung is §5.2's.""", 'END VEW-r2-01')

# ───────────────────────────── §4.9 ─────────────────────────────
E(H49, "§11's exports and §7.7's season derivation row, never by a",
       "§11's exports and §7.7's DR42, never by a",
  'VPC-R2-17')

# ───────────────────────────── §4.11 ─────────────────────────────
# The clock (1): the present at creation and the creation week, two values (VAT2-r2-03; R3-18).
E(H411, """Its creation week is the present week of the dossier it is
   created from; a standalone map starts at week 0. `EpochInputs.week` is the absolute week at the epoch and `years` is derived""",
"""Its **present at creation** is the dossier's present
   week (a standalone map's, week 0). Its **creation week** — the week of its `generate` event, its first model's — is
   that present, except on a history-first document, whose `generate` event stands at the replay's start,
   `W_p − round(52 × start.yearsAgo)`, `W_p` that present (V06 §3.20.3); the first epoch's `years` (above) and V06's
   `prevWeek` read the creation week, and a replayed past lies between it and the present. `EpochInputs.week` is the
   absolute week at the epoch and `years` is derived""",
  'VAT2-r2-03')

# The clock (4): the cadence's calamity trigger (VAT2-r2-01; R3-17).
E(H411, """one number §7.7 item 3's lapse reads too) — carrying the target, the circumstance slices (§7.7 layer 2), the event kinds""",
"""one number §7.7 item 3's lapse reads too), and at the week of each newly carried calamity that no other epoch falls on
   (DR28: a destructive event is epoch content; V08 §3.6 (3); J-V8.55) — carrying the target, the circumstance slices
   (§7.7 layer 2), the event kinds""", 'VAT2-r2-01')

E(H411, """coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week).""",
"""coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week).""", 'VAT2-r2-01')

# ───────────────────────────── §4.13 ─────────────────────────────
# EP-15: the week-0 present (VAT2-r2-03; R3-18).
E(H413, "a replay starting 300 years before a week-0 creation (a valid season at every epoch)",
        "a replay starting 300 years before a week-0 present (a valid season at every epoch)",
  'VAT2-r2-03')

# EP-22: the water table beside a wet moat on a slope (VEW-04 = VM-R2T-06).
E(H413, """fixtures: a hill town with `moat: 'all'`, an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats* |""",
"""fixtures: a hill town with `moat: 'all'` (a plot within `waterTableM` of a wet moat on the slope reads the moat's derived level (§4.2 S3 (10)) + `freeboardCm` as its water table, never its bank top — its cellar or crypt taking the full rung where that level allows (§2.6)), an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats*; §2.6's water table |""",
  'VEW-04', 'VM-R2T-06')

# EP-27: the crisis looks' new limits (VEW-r2-03, VEW-r2-05, VV78-r2-05, VRC2T-03; R3-14).
E(H413, """| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; THORP to the METROPOLIS cap; two and three crises at once;""",
"""| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; a mesa no way leaves (S3 (9) (a)'s unserved mesa) with a refugee camp and a quarantine standing — each on `campLand` measured from the reference point, else on the ring marks, never undefined; an unwalled TOWN with an `inside` castle (the blockade on its approach roads), a walled CITY with an `outside` castle, a twin town with two rings and a walled town with extramural ribbons inside the standoff — no look on a building footprint; THORP to the METROPOLIS cap, a siege at THORP and HAMLET drawing no siege line, a positive share of a place with few units taking at least one; two and three crises at once;""",
  'VEW-r2-03', 'VEW-r2-05', 'VV78-r2-05', 'VAL-R2-06')

E(H413, """no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage or a label's keep-out |""",
"""no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage, a label's keep-out or a building footprint (the parts drawn on a building itself excepted), a carriageway holding only a barricade |""",
  'VEW-r2-05', 'VRC2T-03')

# ───────────────────────────── II.7.2 ─────────────────────────────
# The per-bank outfall: an empty stretch as at its home (VPC-R2-08 = VAL-R2-08); the field path over land (V04's
# VEW-r2-04, written at its home V04 §3.2 N2 this round; this is the base's side of that end).
E(HII72, """else its own field outfall beyond the outermost enceinte's outer
strip — the cess field of a dry town — either reported, and a bank whose stretch of the boundary lies wholly on water and that holds no
candidate drains by gutter and pit, its area reported unsewered (V04 §3.2 N2, N3;""",
"""else its own field outfall beyond the outermost enceinte's outer
strip, reached over land — the cess field of a dry town — either reported, and a bank whose stretch of the boundary is empty or lies
wholly on water and that holds no candidate drains by gutter and pit, its area reported unsewered, as does one whose every stretch
cell's path to a field outfall enters a water face first (V04 §3.2 N2, N3;""",
  'VPC-R2-08', 'VAL-R2-08')

# ───────────────────────────── §10.2 ─────────────────────────────
# The comment naming V11's declared types (END of ADJ-r3-01; R3-27).
E(H102, "ClimateRow (with its ClimateSeasonCells, item 117), EraRow,",
        "ClimateRow (with its ClimateSeasonCells, item 117, and WeatherSpells, item 124) and ClimateSettings, EraRow,",
  'END ADJ-r3-01')

# CrisisLookRow: the display cells V11's rows carry (VPC-R2-12).
E(H102, """  lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */ }""",
"""  lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */;
  label: string; icon?: string /* the display cells (V11 §2.3, V11 §3.1's *Display cells*): the words V09's Show crises list, Find's list of looks and §8.2's legend give the look; read by no stage */ }""",
  'VPC-R2-12')

# Seasons: the row cited by its number (VPC-R2-17).
E(H102, "§8.2's season rows, §11's exports and §7.7's season derivation row, never by a stage,",
        "§8.2's season rows, §11's exports and §7.7's DR42, never by a stage,",
  'VPC-R2-17')

# Crisis looks, lead: what draws before the services the looks read have landed (VPC-R2-11; R3-15).
E(H102, """decoration engine, the `map` rows with the port at M-SF (§16); before them the `map` set is empty and every condition
  reads `none`.
  (a) **A look only.**""",
"""decoration engine, the `map` rows with the port at M-SF (§16); before them the `map` set is empty and every condition
  reads `none`. Until V01's W10 (M5) the `disaster` look draws no district (its legend line and Find's listing stand) and
  `affectedQuarter` is the district with the most households per hectare; until V06's E2 (M6-E) `approachByGate` ranks
  the main approach road's `campLand` faces by nearness to its gate (V06 §3.22 (2) (d)'s no-frontier answer); at the
  village rungs before V07's step the village draws no disaster unit — a part whose subject is not yet built draws
  nothing (§16).
  (a) **A look only.**""", 'VPC-R2-11')

# (b): the source word V08 gives, the regional clause and the stressor-condition pairing (VPC-R2-01 = VDC2-10 =
# VV56-r2-08; END of VPC-R2-03 and VAH-r2-02, V08; R3-09 (d), R3-11, R3-12).
E(H102, """  (b) **The closed mapping.** An overlay reads the `map` row of its source — a `cond:stress:<type>` overlay the `stressor`
  row of its type, an overlay V08 made from a simulator event that event's row, any other the `archetype` row of its
  archetype (V08 §3.11) — and draws the look its row names, or nothing for `none`; the regional_* pressures are `none`. A
  source with no row reads `none`, reported `unmapped_word` (V08), so nothing falls through (T122-4).""",
"""  (b) **The closed mapping.** An overlay reads the `map` row of the source word V08 §3.16 (7) (b) gives it (a stressor's
  type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) and draws the look its
  row names, or nothing for `none` — `regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the
  other regional_* pressures `none`; a stressor's overlay draws no look while a condition's overlay of the same look kind
  stands (V08 §3.16 (7) (b)). A source with no row reads `none`, reported `unmapped_word` (V08), so nothing falls through
  (T122-4).""", 'VPC-R2-01', 'VDC2-10', 'VV56-r2-08', 'END VPC-R2-03', 'END VAH-r2-02')


# (d): barricades, footprints, the one land, the walls a siege reads, the village rungs, the camp places and the
# reference point (VRC2T-03, VEW-r2-05, VAF-R2T-04, VEW-r2-03, VPC-R2-14, VV56-r2-07, VV78-r2-05; END of VV12-r2-02;
# R3-14 (1)–(7) and its binding bullets).
E(H102, """  and export. A look stands only on the ground arena's part 0 and never on water, a way's carriageway, a gate's passage
  (its opening and 4 m along its way each side, as §8.2's festival rows keep it) or a label's keep-out. The outskirts'
  land is V01's `campLand(doc)` — the commons and fallow faces at the districts' outer edges and the approach roads'
  verges by the gates. The **main approach road** is the arterial out of the gate of greatest trade weight (§4.3's
  `TradeFlow`), else the way of greatest trade weight leaving the built edge. Each place ranks its land or units, ties by
  the keyed draw:
  * `beyondWalls` — the land faces at least `siegeStandoffM` beyond the outermost standing enceinte's outer strip
    (`campLand`'s and the hinterland's land-use faces there) along its walled arcs; a closure arc with no wall (V11
    §3.16.1) draws none;
  * `approachRoads` — the verges of each arterial leaving the settlement beyond its built edge, one camp per road; a place
    no road reaches (S3 (9) (a)'s `unserved` mesa) takes the `campLand` nearest its boundary;
  * `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's
    `frontierFor(doc, households)`: where the next growth would seat the camp's people (V06);
  * `outside` — the `campLand` faces furthest from the main approach road, beyond the outermost enceinte's outer strip or,
    unwalled, the built edge;
""",
"""  and export. A look stands only on the ground arena's part 0 and never on water, a gate's passage (its opening and 4 m
  along its way each side, as §8.2's festival rows keep it) or a label's keep-out, and on a way's carriageway only a
  `barricade` across it ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade`
  barricade; item 122 (b)) — never a camp or any other part; no camp, siege line or other part stands on a building
  footprint, save the parts (f) draws on the buildings themselves (the burned farmsteads and farms, a disaster's ruins
  and its districts' tone, the marked doors, the banners, the scaffolding and the shutters), a siege line broken where
  it would cross an extramural plot's building. The outskirts' land is V01's `campLand(doc)` (V01 §3.16): the `commons`
  faces and the fields in their fallow course within `camp.reachM` of the built edge and along the approach roads by the
  gates — every camp place below takes its faces from it and from nothing else. The walls a siege reads, and every place
  below that reads the outermost enceinte, are the place's **town enceintes** — its enceintes of kinds other than
  `bailey` (a castle's curtain only along its shared stretch with the town wall, `Castle.cityWeld`; its keep is
  `gatesAndKeep`'s); **outermost** is the outer envelope of their walled arcs — for rings that are not nested, the
  walled arcs of each ring that no other ring encloses. The **main approach road** is the arterial out of the gate of
  greatest trade weight (§4.3's `TradeFlow`), else the way of greatest trade weight leaving the built edge; where no way
  leaves the built edge there is none, and the places measure from the reference point (below). Each place ranks its
  land or units, ties by the keyed draw; at THORP, HAMLET and VILLAGE the main approach road, the outskirts' land and
  each place below read on the village's records as V07 §5.6 (2) states, `affectedQuarter` a unit of V07 §5.6 (3):
  * `beyondWalls` — the `campLand` faces lying at least `siegeStandoffM` beyond the outermost standing town enceinte's
    outer strip along its walled arcs (the walls above); a closure arc with no wall (V11 §3.16.1) draws none;
  * `approachRoads` — `campLand`'s verges of each arterial leaving the settlement (V01 §3.16 (2)), one camp per road, the
    look's camped ground divided equally among them (the remainder to the roads one each, in trade-weight order); with the
    dossier's forces, each army's camp ((c)) whole on one road, the armies in descending size onto the roads in
    trade-weight order, a road taking a second army only when every road holds one; a road whose verges hold no
    `campLand` takes the `campLand` nearest where it leaves; a place no road reaches takes one camp on the `campLand`
    nearest the reference point (below);
  * `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's
    `frontierFor(doc, h)`, `h` the households the sequential roster adds between the present population and that
    population plus the camp's heads (its headcount by (c), else its camped ground ÷ `areaPerHeadM2`): where the next
    growth would seat the camp's people (V06 §3.22 (2)); with no main approach road, nearest `frontierFor`'s answer, else
    nearest the reference point;
  * `outside` — the `campLand` faces furthest from the main approach road (with none, from the reference point), beyond
    the outermost standing town enceinte's outer strip or, unwalled, the built edge;
  * the **reference point** where no way leaves the built edge (S3 (9) (a)'s unserved mesa): the boundary point closest
    to the growth centre (S3's root reservation, §4.2);
""", 'VRC2T-03', 'VEW-r2-05', 'VAF-R2T-04', 'VEW-r2-03', 'VPC-R2-14', 'VV56-r2-07', 'VV78-r2-05', 'VAL-R2-06',
  'END VV12-r2-02')

E(H102, """  * `edge` — the outermost enceinte's walled arcs or, unwalled, the districts' outer boundary;""",
"""  * `edge` — the outermost town enceinte's walled arcs (the walls above) or, unwalled, the districts' outer boundary;""",
  'VEW-r2-05')

# (e): the cap's one denominator (VAF-R2T-04; R3-14 (1)).
E(H102, """each from what the earlier left, together at most `densityCap` of the outskirts'
  free land.""",
"""each from what the earlier left, together at most `densityCap` of `campLand`'s
  free land.""", 'VAF-R2T-04')


# (g): the ring arcs framed (END of VRC2T-16, model).
E(H102, """  (g) **Framing** (item 122 (i)). The placed camps' bounds are the camps §2.9's opening view, Fit and item 116's zoom-out
  limit take in with the town while a look stands (model §2.9; the limit's stop 0 where nothing fits, §8.8).""",
"""  (g) **Framing** (item 122 (i)). The placed camps' and the ring arcs' bounds are the camps §2.9's opening view, Fit and
  item 116's zoom-out limit take in with the town while a look stands (model §2.9; the limit's stop 0 where nothing fits,
  §8.8).""", 'END VRC2T-16')

# (h): the limits the camp places now define (VEW-r2-05, VEW-r2-03, VV78-r2-05).
E(H102, """  (h) **At its limits** (EP-27). No outskirts land left, an island town with no land beyond its shore, or a force larger
  than the frame and its margin: the remainder drawn as (e)'s ring marks; a siege of a place with no standing enceinte (a
  mesa whose every arc is a closure feature among them): the `blockade` row by `approachRoads`' rule, no engines; THORP to
  the METROPOLIS cap: each rung's `scale` cell; a headcount of 0 or none: (c); an unmapped source: (b); a condition whose
  `untilWeek` is not after its `sinceWeek`: never stands; no condition and no preview: every tile byte-identical to the
  base (`item122.crises`).""",
"""  (h) **At its limits** (EP-27). No outskirts land left, an island town with no land beyond its shore, or a force larger
  than the frame and its margin: the remainder drawn as (e)'s ring marks; a siege of a place with no standing town
  enceinte (a mesa whose every arc is a closure feature and an unwalled town with a castle among them): the `blockade`
  row by `approachRoads`' rule, no engines; a place no way leaves: every camp measured from the reference point ((d));
  THORP to the METROPOLIS cap: each rung's `scale` cell, and no siege line at THORP and HAMLET; a headcount of 0 or
  none: (c); an unmapped source: (b); a condition whose `untilWeek` is not after its `sinceWeek`: never stands; no
  condition and no preview: every tile byte-identical to the base (`item122.crises`).""",
  'VEW-r2-05', 'VEW-r2-03', 'VV78-r2-05', 'VAL-R2-06')


# ── whole-paragraph edits, rewrapped at 120 columns (each substitution asserted once in its paragraph) ──
import textwrap as _tw
import re as _re


def PARA(head, first, subs, *ids):
    """The list-item paragraph of the live subsection `head` whose first line starts with `first` (two-space indent,
    ending before the next line that starts '  (' or '* ' or a blank line): apply `subs` (old, new) each asserted once,
    rewrap at 120 columns with the same indent, and register the edit."""
    _hl, _i, body = section(head)
    bl = body.split('\n')
    k = [n for n, l in enumerate(bl) if l.startswith(first)]
    assert len(k) == 1, (first, k)
    k = k[0]
    m = k + 1
    while m < len(bl) and bl[m].strip() and not _re.match(r'^  \([a-z]\) \*\*', bl[m]) and not bl[m].startswith('* '):
        m += 1
    old = '\n'.join(bl[k:m])
    para = ' '.join(l.strip() for l in bl[k:m])
    for a, b in subs:
        assert para.count(a) == 1, (first, a, para.count(a))
        para = para.replace(a, b)
    new = _tw.fill(para, width=120, initial_indent='  ', subsequent_indent='  ', break_long_words=False,
                   break_on_hyphens=False)
    E(head, old, new, *ids)


# (c): one count for a share of n units (VV78-r2-05 = VAL-R2-06; R3-14 (4)).
PARA(H102, "  (c) **Scale.**", [
    ("else the share of its place's units ((d)).",
     "else the share of its place's units ((d)) — a share s of a place's n units takes round(s × n) clamped to [1, n] "
     "where s > 0 and none where s ≤ 0, V01 §3.16 (5)'s count, one rule for every place at every rung."),
], 'VV78-r2-05', 'VAL-R2-06')

# (f): no siege line at THORP and HAMLET; the town enceinte; the disaster look leaves building by building
# (VV78-r2-05 = VAL-R2-06, VEW-r2-05, VPC-R2-09 = VV56-r2-03; R3-10, R3-14 (2), (5)).
PARA(H102, "  (f) **The kinds' own parts**", [
    ("`siege`: camps at the standoff, a line of trenches and earthworks round the walled arcs at it, burned farmsteads "
     "outside, and siege engines facing",
     "`siege`: camps at the standoff; at VILLAGE and above, a line of trenches and earthworks round the walled arcs at "
     "it — none at THORP and HAMLET, item 122 (c)'s war band's camp (V07 §5.6 (1)); burned farmsteads outside; and siege "
     "engines facing"),
    ("a `siege` of a place with no standing enceinte draws the `blockade` row.",
     "a `siege` of a place with no standing town enceinte draws the `blockade` row."),
    ("`disaster`: (d)'s `neighbourhoods`, ending in the week its `reconstruction` Works begins (V06: no week draws both).",
     "`disaster`: (d)'s `neighbourhoods`, each building leaving the look in the week V06 §3.22 (3)'s `crisisLookYields` "
     "turns true on it (a Works other than a `decay` Works begun on it), a building no such Works reaches keeping it "
     "until its condition ends, so no week draws both on a building."),
], 'VV78-r2-05', 'VAL-R2-06', 'VEW-r2-05', 'VPC-R2-09', 'VV56-r2-03')
