"""edits — coherence/repair-V02-r4: the three round-4 issues routed to V02 (adjudication-r4 Part H · V02: VAP-r3-03 FIX per
R4-11, VAT3-r3-06 FIX, VV12-r3-01 FIX per R4-04 with the sweep's J-V2.113 and l. 2455) and the seat's own sweep (R4-01
(2)), each edit tagged with the issue it applies. Count-asserted substitutions on the live volume (build.py). V02 holds
no END line this round."""

REPLACED = [
    '### 1b The wiring table — every new piece, what feeds it and what it feeds',
    '### 1d Out of scope (and where it lives)',
    '### 3.18 Edges — every mechanism at its limits (principle (11))',
    '### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)',
    '### 7.8 Ruin and disaster on the exterior',
    '### 8.6 Ruin and disaster in the build (items 123, 122)',
    '## 9 Decisions',
    '## 13 Fix list',
]


def apply(sub, after_line, rewrap, wrap, span):

    def rephrase(tag, start, end, pairs, first='', rest=''):
        """unwrap the live paragraph (or bullet) from `start` to `end`, apply count-asserted phrase changes, rewrap"""
        old = span(tag, start, end)
        text = ' '.join(l.strip() for l in old.split('\n'))
        lead = first.strip()
        if lead:
            if not text.startswith(lead + ' '):
                raise SystemExit(f'STOP {tag}: paragraph does not open with {lead!r}')
            text = text[len(lead) + 1:]
        for o, n in pairs:
            c = text.count(o)
            if c != 1:
                raise SystemExit(f'STOP {tag}: expected 1 occurrence, found {c}: {o[:140]!r}')
            text = text.replace(o, n)
        sub(tag, old, wrap(text, first, rest))

    # =================================================================================================================
    # VV12-r3-01 (FIX per R4-04 (a)) — the village rungs' units are V07 §5.6 (3)'s `villageDisasterUnits` (its ends, or
    # in an end-less thorp its toft groups), a unit's buildings those on the plots `villageUnitPlots(doc, unit)` gives it
    # =================================================================================================================
    sub('VV12-r3-01 §1b exteriorDamage input cell',
        "V01's `disasterSource` — its `pattern` — and `disasterDistricts`, V07's ends at THORP, HAMLET and VILLAGE; "
        "V06's `crisisLookYields`, false for a preview)",
        "V01's `disasterSource` — its `pattern` — and `disasterDistricts`, at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s "
        "units and their land `villageUnitPlots`; V06's `crisisLookYields`, false for a preview)")

    # the verifier's "§2.4's paragraph (l. 367)" is §1d's bullet "Items 123 and 122's other homes" (l. 362 – 369)
    rephrase('VV12-r3-01 §1d the other homes (the verifier\'s "§2.4 paragraph", l. 367)',
             "* **Items 123 and 122's other homes.**", "exterior only (V02 §5.7).",
             [("which neighbourhoods a disaster strikes V01's (`disasterDistricts`), V07's ends at the village rungs;",
               "which neighbourhoods a disaster strikes V01's (`disasterDistricts`), V07 §5.6 (3)'s units and their "
               "plots (`villageUnitPlots`) at the village rungs;")],
             first='* ', rest='  ')

    sub('VV12-r3-01 sweep (Part H note) §3.18 (b) the village rungs\' row, l. 2455',
        "a disaster's ruined look falls on every building of V07's ends (V02 §5.7) |",
        "a disaster's ruined look falls on every building of V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or "
        "in an end-less thorp its toft groups), a unit's buildings those on the plots `villageUnitPlots(doc, unit)` "
        "gives it (V02 §5.7) |")

    rephrase('VV12-r3-01 §5.7 (1) the units',
             "**(1) The level.** A building's level is the higher of its **decay level**", "(T123-7's no-op).",
             [("The units are every district V01's `disasterDistricts` returns — for a preview, the districts it "
               "returns for the previewed look, keyed on the look kind in the condition's stead (§10.2's placement; "
               "X35) — and at THORP, HAMLET and VILLAGE every end V07 returns; every building of a unit draws the look,",
               "The units are those V01's `disasterDistricts` returns (§10.2 (d)'s `neighbourhoods`) — for a preview, "
               "those it returns for the previewed look, keyed on the look kind in the condition's stead (§10.2's "
               "placement; X35): at TOWN and above every district it returns, and at THORP, HAMLET and VILLAGE every "
               "unit it returns there — V07 §5.6 (3)'s `villageDisasterUnits`, its ends or in an end-less thorp its "
               "toft groups — a unit's buildings being those on the plots V07's `villageUnitPlots(doc, unit)` gives "
               "it; every building of a unit draws the look,")])

    # §3.18 (e) the ruined-look row: the end-less thorp's case (VV12-r3-01); the withheld condition named a `none`-row one
    # (VAP-r3-03's sweep, R4-11: the row stands, holding for a `none`-row condition — said so, so it cannot be read as a
    # withheld look-bearing condition)
    sub('VV12-r3-01, VAP-r3-03 sweep §3.18 (e) the ruined-look row',
        "| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's "
        "key withholds; a `preview` on a standalone document; a preview over buildings under a rebuild's Works; an overlay "
        "whose condition carries no calamity | the `disaster` row's two `lookLevel` ends; the higher level, with that "
        "look's pattern (ties: the lower condition id); no look on any building; the previewed look at `previewSeverity` "
        "on its preview's units; the look on every building of its units whatever their Works (a preview never hands "
        "over, V06 §3.22 (3)); the `scatter` pattern (V01 §3.16 (2)) | — | T-V2-60 |",
        "| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's "
        "key withholds (a `none`-row one: a look-bearing condition is `public`, §7.7's DR44); a `preview` on a standalone "
        "document; a preview over buildings under a rebuild's Works; an overlay whose condition carries no calamity; an "
        "end-less thorp | the `disaster` row's two `lookLevel` ends; the higher level, with that look's pattern (ties: "
        "the lower condition id); no look on any building; the previewed look at `previewSeverity` on its preview's "
        "units; the look on every building of its units whatever their Works (a preview never hands over, V06 §3.22 "
        "(3)); the `scatter` pattern (V01 §3.16 (2)); its toft groups' buildings, by `villageUnitPlots` (V07 §5.6 (3)), "
        "and no other building | — | T-V2-60 |")

    # =================================================================================================================
    # VAP-r3-03 sweep (R4-01 (2), R4-11) — §3.18 (e)'s damage-marks row: View as changes no look (every look-bearing
    # condition `public`), so it re-emits no mark where the same looks stand on the same units; with VV12-r3-01's sweep
    # (R4-04 (a)), "a struck district" read as a struck unit
    # =================================================================================================================
    sub('VAP-r3-03 sweep, VV12-r3-01 sweep §3.18 (e) the damage-marks row',
        "Show crises switched, a preview started or ended, View as changed; a plan entering force, or evicted from the "
        "elaboration cache; a commit that moves a level or a look's units; a cached tile of a struck district | nothing "
        "re-emitted; exactly the buildings whose marks change re-emitted, the rest untouched; the buildings of the looks' "
        "units before and after re-emitted; that building re-emitted,",
        "Show crises switched, a preview started or ended; View as changed; a plan entering force, or evicted from the "
        "elaboration cache; a commit that moves a level or a look's units; a cached tile holding a struck unit's "
        "buildings | nothing re-emitted; exactly the buildings whose marks change re-emitted, the rest untouched; the "
        "buildings of the looks' units before and after re-emitted; the looks' units at both keys tested and no "
        "building re-emitted where the same looks stand on the same units at both (every look-bearing condition is "
        "`public`, §7.7's DR44), the tile drawn under the new key (§8.8); that building re-emitted,")

    # =================================================================================================================
    # VAT3-r3-06 — the aftermath's own level starts at the week its change shows (V06 §3.23 (1))
    # =================================================================================================================
    sub('VAT3-r3-06 §3.18 (e) the aftermath row',
        "a building the next epoch really ruins or abandons reads its own level from that epoch's week;",
        "a building the next epoch really ruins or abandons reads its own level from the week its change shows (V06 "
        "§3.23 (1): the hazard's week, a `vacate`'s `decay` Works' start);")
    rephrase('VAT3-r3-06 §5.7 (6)',
             "**(6) The hand-over** (item 122 (a)).", "the look's level ruling only while it is the higher.",
             [("reads its own level from that epoch's week (V06's hazard and decline phases),",
               "reads its own level from the week its change shows (V06 §3.23 (1): the hazard's week, a `vacate`'s "
               "`decay` Works' start),")])

    # =================================================================================================================
    # §7.8 — the look fixture gains the end-less THORP (VV12-r3-01) and a `none`-row condition beside the looks
    # (VAP-r3-03, R4-11); T-V2-60 (a) (VV12-r3-01), (e) and (g) (VAP-r3-03 per R4-11)
    # =================================================================================================================
    rephrase('VV12-r3-01, VAP-r3-03 §7.8 the look fixture',
             "**Fixtures.** A **damage sub-fixture** of B-MASS:", "holding buildings under the rebuild's Works.",
             [("A **look fixture** on B-CITY-lite's TOWN and CITY seeds and B-VILLAGE's VILLAGE seed:",
               "A **look fixture** on B-CITY-lite's TOWN and CITY seeds, B-VILLAGE's VILLAGE seed and an end-less THORP "
               "of B-VILLAGE (V07 §5.6 (7)'s no-end case, as T-V7-69 (c) runs it: no anchor, so its units are its "
               "toft groups, V07 §5.6 (3)):"),
              ("and a second calamity with its linked condition overlapping the first;",
               "and a second calamity with its linked condition overlapping the first; an `infiltrated` stressor (a "
               "`none`-row condition, V11's map rows) carried beside the looks, standing in their weeks;")])

    rephrase('VV12-r3-01, VAP-r3-03 §7.8 T-V2-60 (a), (e), (g)',
             "* **T-V2-60 a disaster's ruined look**", "an underground building draws none of it.",
             [("(a) every building of every unit `disasterDistricts` returns (V07's ends at VILLAGE) draws the look in "
               "exactly the weeks it stands (10–19; 10–17 on a building whose rebuild's Works begins in week 18) and no "
               "building outside those units does —",
               "(a) every building of every unit `disasterDistricts` returns (at VILLAGE V07's ends, each on the plots "
               "`villageUnitPlots` gives it; on the end-less THORP its toft groups, likewise) draws the look in exactly "
               "the weeks it stands (10–19; 10–17 on a building whose rebuild's Works begins in week 18) and no "
               "building outside those units does (on the end-less THORP every building of a struck toft group draws "
               "it and no other building does) —"),
              ("(e) a viewer whose knowledge key withholds the condition sees the look on no building;",
               "(e) the disaster's condition, whose map row gives the look and so `public` (§7.7's DR44), draws the "
               "look on its units' buildings under View as at `public`, `local` and `secret` alike — the same drawing "
               "at each key, in every week of (a) and (d) — and the `infiltrated` stressor carried beside it (a "
               "`none`-row condition) draws no look on any building at any key;"),
              ("over a cached district-band tile of a struck district, Show crises switched `off` and back, a preview "
               "started and ended, and View as set to a key that withholds the condition, the struck buildings' damage "
               "marks re-emitted and the tile redrawn after each, and the week step 17 → 18 re-emitting exactly the "
               "buildings whose rebuild began;",
               "over a cached district-band tile holding a struck unit's buildings, Show crises switched `off` and back "
               "and a preview started and ended, the struck buildings' damage marks re-emitted and the tile redrawn "
               "after each, and View as changed among `public`, `local` and `secret`, the look standing at every key — "
               "the same drawing, no struck building's marks re-emitted (their `revision` unchanged, V02 §5.7 (8)) and "
               "the tile drawn under its new key (§8.8's tile key) — and the week step 17 → 18 re-emitting exactly the "
               "buildings whose rebuild began;")],
             first='* ', rest='  ')

    # =================================================================================================================
    # VV12-r3-01 — §8.6's note, J-V2.113 (the sweep, Part H note), X35
    # =================================================================================================================
    rephrase('VV12-r3-01 §8.6 the village units\' wait',
             "Until V03's item-123 step lands", "(V07 §8).",
             [("at THORP, HAMLET and VILLAGE the look's units wait for V07's ends (V07 §8).",
               "at THORP, HAMLET and VILLAGE the look's units wait for V07's `villageDisasterUnits` and "
               "`villageUnitPlots` (V-M3, V07 §5.6 (8)).")])

    sub('VV12-r3-01 sweep (Part H note) J-V2.113, l. 4003',
        "on every building of every unit V01's `disasterDistricts` returns (V07's ends at the village rungs), over a "
        "ruined look of its own",
        "on every building of every unit V01's `disasterDistricts` returns (at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s "
        "units — its ends, or in an end-less thorp its toft groups — a unit's buildings those on the plots "
        "`villageUnitPlots(doc, unit)` gives it), over a ruined look of its own")

    sub('VV12-r3-01 §13 X35',
        "`scatter` with no calamity), and V07's ends at THORP, HAMLET and VILLAGE; every building of each draws the "
        "ruined look (V02 §5.7) |",
        "`scatter` with no calamity), and at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (its ends, or an end-less "
        "thorp's toft groups) with their land `villageUnitPlots`; every building of each draws the ruined look (V02 "
        "§5.7) |")
