# §7 – §12 — repair-V07-r1
def apply(d):
    # §7 preamble: the owner items' bars taken over (VV78-02, G120)
    d.sub("""and of items 114–118's bars, each test naming the bar it takes over""",
          """and of items 114–120's bars, each test naming the bar it takes over""", tag='VV78-02/G120 §7 lead')
    # T-V7-30 (VAT0-08)
    d.sub("""every retirement is a `retireWay` op struck at V06 §3.5.2's street rate per year over the epoch's span (a primary included) and every effacement an `effaceWay`""",
          """every retirement is a `retireWay` op (a primary included), struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), and every effacement an `effaceWay`""", tag='VAT0-08 T-V7-30')
    # T-V7-46 (VV78-20's narration, same form)
    d.sub("""| T-V7-46 | no generation below TOWN (item 110 (b) as revised):""", """| T-V7-46 | no generation below TOWN (item 110 (b)):""", tag='VV78-20 T-V7-46')
    # T-V7-47 (VEW-16)
    d.sub("""0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter;""",
          """0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter; on a cliff-edge village fixture 0 walls on a cliff bank segment, a `cliff` or `sheer` arc or a cliff inside the district, every platform there keeping the shore setback's `cliff` distance from it (V07 §3.8a (2));""", tag='VEW-16 T-V7-47')
    # T-V7-48 (VAL-13)
    d.sub("""0 hinterland faces over a support (the supports are holes); the palisade abuts each support in its band and has 0 gates at supports;""",
          """0 hinterland faces over a standing support (a support whose `state` is absent or `ruined` is a hole); the palisade abuts each standing support in its band and has 0 gates at supports; after a support is `cleared` the next derivation makes no obstacle, hole or abutment at it;""", tag='VAL-13 T-V7-48')
    # T-V7-60 (VV78-18, VV78-08)
    d.between("""| T-V7-60 | the edge suite (V07 §3.17):""", """| each clause with its mechanism's milestone (V-M1 – V-M3; (g) at V-M2u) |""", T60_NEW, tag='VV78-18 T-V7-60')
    # T-V7-61 (VAH-20's catalogue)
    d.sub("""with at least one row whose key resolves in V10's catalogue (`info.village.*`, V07 §4.5)""",
          """with at least one row whose key resolves in V09 §4.9's catalogue (`info.village.*`, V07 §4.5)""", tag='VAH-20 T-V7-61')
    # T-V7-62 (VV78-05)
    d.sub("""a poor, threatened palisade fixture shows patched runs in its kind's patch rows and no robust rebuild""",
          """a poor, threatened palisade fixture shows patched runs in its kind's `walls.patchMaterials` rows (V11 §3.25.3), each drawn by its row's `look` role, and no robust rebuild""", tag='VV78-05 T-V7-62')
    # T-V7-67, T-V7-68 (VV78-02, G120)
    t66 = d.t[d.t.index('| T-V7-66 |'):]
    t66 = t66[:t66.index('\n')]
    d.sub(t66 + '\n', t66 + '\n' + T67 + '\n' + T68 + '\n', tag='VV78-02 T-V7-67; G120 T-V7-68')

    # §8 (VV78-02 price at V-M3; G120)
    d.sub("""the painterly item-110 programs and the item-110 edit rows; the edge suite's V-M3 clauses |""",
          """the painterly item-110 programs and the item-110 edit rows; item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the edge suite's V-M3 clauses |""", tag='§8 V-M3 content')
    d.sub("""T-V7-62's epoch clause, T-V7-64 – T-V7-66 — the clauses that run V06's steps""",
          """T-V7-62's epoch clause, T-V7-64 – T-V7-68 — the clauses that run V06's steps""", tag='§8 V-M3 exit')
    d.sub("""| 9–13.5 |""", """| 9.5–14.25 |""", tag='§8 V-M3 est')
    d.sub("""| **total** | | | **29.75–41.75** |""", """| **total** | | | **30.25–42.5** |""", tag='§8 total')
    d.sub("""The total is the product's own 26.5–36.5 pw plus the parts of items 111–118 routed here""",
          """The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 routed here""", tag='§8 total para 1')
    d.sub("""item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5); §16's village line and INDEX §4""",
          """item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's one-time waits + 0.25, item
120's Find at the village rungs + 0.25–0.5); §16's village line and INDEX §4""", tag='§8 total para 2')
    d.sub("""one default season (midsummer) with no decorations and the base's zoom-out range, and T-V7-64 – T-V7-66 exit at the first V07
exit after them.""", """one default season (midsummer) with no decorations and the base's zoom-out range, and T-V7-64 – T-V7-66 exit at the first V07
exit after them. (13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows;
*pre-decided fallback:* if they have not landed by V-M3, the village's readings (V07 §5.5) ship as the gazetteer's rows and
area targets alone, and T-V7-68 exits at the first V07 exit after V09's Find.""", tag='§8 risk (13)')

    # §9 rows
    d.sub("""issued by V06's street candidate through the product's epoch rows at the street layer's per-year rate, over widening or reusing `downgradeWay`""",
          """issued by V06's street candidate through the product's epoch rows and struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), over widening or reusing `downgradeWay`""", tag='VAT0-08 J-V7.98')
    d.sub("""so the three claim-sized classes a small dossier reaches need finite plots; a friary or small priory is the village's scale, and a market hall stood on its market |""",
          """so the three claim-sized classes a small dossier reaches (a monastery, a market hall, a slave market) need finite plots; a friary or a small priory, not an abbey's precinct, is the village's scale, and a market hall stood on its market |""", tag='VV78-07 J-V7.112')
    d.sub("""the two ids are already row 61's readers and V06 §3.16's list, so the draws stay on the stages' own concerns |""",
          """the two ids are already row 61's readers and V06 §3.16's list, so `village.json`'s readers stay the village stages, V06 §3.16's fifteen ids gain none and the draws stay on the stages' own concerns |""", tag='VV78-07 J-V7.122')
    d.sub("""so a later change that widens the set would otherwise have no named writer |""",
          """so a later change that widens the set would otherwise have no named writer and could not land; the rule (VG's code-read behaviour, else the `MFCG` entry's value, `fixed:`) asks no new judgement of that seat |""", tag='VV78-07 J-V7.123')
    d.sub("""because those bars test orderings against random baselines and rates against their anchor laws — none isolates one column's value — so a `measure` entry naming them could neither confirm nor move a column; and a `VillageRungRow` is one typed record, written whole with the `VG` file V-M0 ships |""",
          """because those bars test orderings against random baselines and rates against their anchor laws — each reads many cells across the class rows and `village.json` and none isolates one column's value — so a `measure` entry naming them could neither confirm nor move a column; most cells they bear on are columns of `roster.classes` already bound by V12's lines (the items 103–108 line among them); a V-M2 miss is repaired in the landing change, which the default line's entry does not record (its first history row is M-CAL's); and a `VillageRungRow` is one typed record, written whole with the `VG` file V-M0 ships, so one change writes every entry once |""", tag='VV78-07 J-V7.124')
    d.sub("""a named record is never declined for a failed placement and never waits; the hall, the cloister and the outside plot""",
          """a named record is never declined for a failed placement and never waits (its last rung the base's `dossier` request's closest option), since a declined one would take the S7b claim the village never runs; the hall, the cloister and the outside plot""", tag='VV78-07 J-V7.125')
    d.sub("""one rule covers every pin kind the catalogue and the archetype cells map, and the chance pins stay chance |""",
          """one rule covers every pin kind the catalogue and the archetype cells map, and the chance pins stay chance while the forced one belongs to its record |""", tag='VV78-07 J-V7.127')
    d.sub("""because the field is common grazing with no square to keep, a forced pin belongs to its record, a well the households still draw from would be placed again by `village.pins`' next coverage pass (least disruption, item 22), and a village market is a rank, not a use, so `closeUse` closes nothing; a hall or a cloister stays for item 17's re-use |""",
          """because the field is common grazing with no square to keep, a forced pin belongs to its record and would otherwise stand with a provenance naming a record the dossier no longer holds, a well the households still draw from would be placed again by `village.pins`' next coverage pass (least disruption, item 22), and a village market is a rank, not a use, so `closeUse` closes nothing, and keeping the rank would keep a market the dossier no longer holds and our law would not derive (items 20, 22); a hall or a cloister stays for item 17's re-use |""", tag='VV78-07 J-V7.130')
    d.sub("""and S10b's request cannot lay a fair ground's reservation or a hall's claim; the hooks are small wiring""",
          """and S10b's request cannot lay a fair ground's reservation or a hall's claim — without the hooks the records placement's and the pins' failures return on the village's own milestones; the hooks are small wiring""", tag='VV78-07 J-V7.132')
    d.sub("""with the village kinds' patch rows (odd stakes, hurdles, brush; brush and turf on a bank; timber hoarding and dry-stone infill on a stone circuit) read from V11's patch table,""",
          """with the village kinds' rows of `walls.patchMaterials` (V11 §3.25.3: odd stakes, hurdles and brush on a palisade; brush and turf, and hurdles, on a bank; V11's masonry rows on a stone circuit),""", tag='VV78-05 J-V7.135')
    d.sub("""as `info.village.*` rows in V10's catalogue, over leaving the kinds to V10's generic provider""",
          """as `info.village.*` rows of V09 §4.9's catalogue (their words this volume's), over leaving the kinds to V10's generic provider""", tag='VAH-20 J-V7.140')
    j143 = d.t[d.t.index('| J-V7.143 |'):]
    j143 = j143[:j143.index('\n')]
    d.sub(j143 + '\n', j143 + '\n' + J144 + '\n' + J145 + '\n', tag='VV78-02 J-V7.144; G120 J-V7.145')

    # §12 (the owner items read; the new parts' PLAUSIBLE rows)
    d.sub("""applied, items 111 and 113–118 included)""", """applied, items 111 and 113–120 included)""", tag='§12 confirmed')
    d.sub("""read at every band (T-V7-62, T-V7-65, T-V7-66; V-M3); and the historical readings""",
          """read at every band (T-V7-62, T-V7-65, T-V7-66; V-M3); that every one-time wait of the village stays inside item 119's
comfort level (T-V7-67; V-M3); that the ends serve as Find's area targets and Show gaps' units (T-V7-68; V-M3); and the
historical readings""", tag='§12 plausible')


T60_NEW = """| T-V7-60 | the edge suite (V07 §3.17): each clause runs its §3.17 rows on their edge fixtures at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate — each case ending in its row's defined outcome and reported rung, with 0 crashes, 0 hangs, 0 lost records, 0 whole-map retries and 0 silent changes (every changed output named in the report). The clauses: **(a)** the records, the request block and the pipeline; **(b)** S0, VS1 and VS2; **(c)** VS3, VS4 and the raised way; **(d)** the open space, VS5, VS6 and levelling; **(e)** the hinterland, the wharf, ends and pins, and deck plots; **(f)** the dossier readings, the epochs and hand-offs, and the failure ladders; **(g)** the underground; **(h)** editing, the clerk, rendering, labels and exports, and Find; **(i)** every combination row of V07 §3.17 (b). (Determinism's row is T-V7-18's, the one-time waits' T-V7-67's.) | C | (a), (b), (d) at V-M1, (a)'s landmark-part clause at V-M2; (c) at V-M1, its raised-way row at V-M3; (e) at V-M2, its deck-plot row at V-M3; (f) at V-M2, its epoch and hand-off row at V-M3; (g) at V-M2u; (h) at V-M3; (i) each row at the later milestone of the two mechanisms it joins |"""

T67 = """| T-V7-67 | the one-time waits (item 119 (f)'s village clauses): on §12.1's reference machine, at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499), each on its largest frame, generate, regenerate, opening a map from SettlementForge (the small-dossier fixtures), a dossier change applied, an epoch and the history replay (V07 §3.12a's fixture; each timed as V06's part of item 119 times it), every export format and a migration each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its §12 or V07 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V07 §6's edit and switch budgets and §12.5's frame budgets hold unchanged | C | V-M3 |"""
T68 = """| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures, with and without a dossier, the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles; each chip's matches equal the gazetteer query's rows at the key — the `v.` classes by their labels and synonyms (a "farms" chip holding the village's farmsteads and the outlying ones), the dossier's names, the village, the ends, the field groups and V07 §5.3's places — and the list offers nothing the village lacks; Show gaps outlines exactly the ends (with one end or none, the village) holding no member of the chip's class and never a class its row sites outside the perimeter; at the township view every match has a pin or a count bubble; an epoch that opens a smithy lights it and one that closes its use darkens it in that commit; an end's chip reads 0 after the hand-off up and lights again after the hand-off down; under a player view the knowledge canary (T-V9-66's fixture read at a village rung) surfaces in no suggestion, count, glow or pin; the chips survive every band and layer change, a village epoch and an undo; suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | V-M3 (with V09's Find; risk (13)) |"""

J144 = """| J-V7.144 | chose to read item 119 at the village rungs as V07 §6's laws kept as the targets and every one-time wait of the village — generate, regenerate, opening from SettlementForge, a dossier change applied, an epoch and the history replay, an export, a migration — within the ten-second comfort level on §12.1's machine, the VILLAGE row's miss above ≈ 1 100 people and the fallback's re-declared bar read as target misses inside it, a step slower than its target only with its `perf.qualitySpend` row, progress past one second by V09 §4.21.9 and the edit, frame and switch budgets untouched, over a village ceiling of its own or keeping the veto question, because item 119 (a) re-declares D-18's misses inside the comfort level, the village's laws sit about two orders of magnitude inside it, and interaction budgets are item 119 (d)'s; how an epoch run and the replay are timed against it is V06's part of the item | V07 §6, W82, T-V7-67 |"""
J145 = """| J-V7.145 | chose to read Find (item 120) at the village rungs with the ends as the area targets and Show gaps' units — the one `village` district being the whole settlement, offered as one area — the field groups (`VillageField`) as the hinterland's areas, V07 §5.3's label rows as the named places and every `v.` class with a member (the dwelling rows included) as a kind, and to keep a chip whose end or field an epoch, an edit or a hand-off removes at count 0 until removed or revived, over offering the one district as the only area or adding a village area kind, because a village's parts are its ends (V07 §3.10) and its fields, a viewer looking for "the mill end" or "the north field" means those, and a kept chip lets a viewer watch a place come and go across epochs as item 120 (f) asks of a closed smithy | V07 §5.5, W83, T-V7-68 |"""
