# edits_c — §13.2 (scope r2): ranges (R2-06 (a)), T20-2/T20-6/T20-14–16 (R2-18, R2-19), T66-2 (VPC-R1-23), T110-2/T110-5
# (VM-R1T-10, R2-26), T114-9/T114-10 (R2-27), T115-2/T115-3 (R2-14), T116 (R2-30), T117-6 (R2-40), the conventions
# (R2-07, R2-09), the owner-item groups' runs lists (R2-08, VCS-10, VAP-r1-09) and the bars of items 120–126 (R2-35).
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
S = '### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT'


def register(E):
    a = lambda old, new, tag, n=1: E.add(B, S, old, new, n, tag)
    # ---- R2-06 (a): every test of a volume, or of a base family, named without a restated upper id ----
    a("the sky's own bars being V05 §7's T-V5-1 – T-V5-33; and hiding",
      "the sky's own bars being V05 §7's; and hiding", 'R2-06 (a) T15-1')
    a("Volume 3's\n    T-V3-1 – T-V3-36 run on the same fixtures from M6-P's intake,",
      "Every T-V3\n    test (V03 §7) runs on the same fixtures from M6-P's intake,", 'R2-06 (a) plan rung / VCS-10')
    a("  * *Stage 3 (V02 §7).* T-V2-1 – T-V2-57 and the B-MASS fixtures,",
      "  * *Stage 3 (V02 §7).* Every T-V2 test (V02 §7) and the B-MASS fixtures,", 'R2-06 (a) stage 3 / VCS-10')
    a("  * *The underground layer built (M6-U).* Volume 4's T-V4-1 – T-V4-80, run from M6-U's steps;",
      "  * *The underground layer built (M6-U).* Every T-V4 test (V04 §7), run from M6-U's steps;", 'R2-06 (a) VAL-R1-04')
    a("* **The SettlementForge stage (V08 §7).** T-V8-1 – T-V8-57 on the host harness",
      "* **The SettlementForge stage (V08 §7).** Every T-V8 test (V08 §7) on the host harness", 'R2-06 (a) VCS-10')
    a("one fixture per row of §4.13's edge table (EP-01 – EP-19) and per cell of its combination\n  table,",
      "one fixture per row of §4.13's edge table (its EP rows) and per cell of its combination\n  table,", 'R2-06 (a) B-EDGE (pipeline hand-off)')
    a("* **The rendering, label and export edges** — T-ER-01 – T-ER-12 (§8.11), T-ER-13 – T-ER-18 (§9.7) and T-ER-19 – T-ER-21\n  (§11.6): census rows",
      "* **The rendering, label and export edges** — the T-ER rows of §8.11, §9.7 and\n  §11.6: census rows", 'VRC1T-09 / R2-06 (a)')

    # ---- R2-18 (d), R2-19: T20-2, T20-6 and T20-14 – T20-16 ----
    a("and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4);",
      "and an undo of a lapsing epoch outside the port's session `host:port` restores the hold, while an `undo` naming a lapsing event of session `host:port` (a dossier event, or a port epoch whether or not it carried a dossier change) returns F-EDIT (§7.4 *Replay semantics*);",
      'VDC1-17 T20-2 (R2-19)')
    a("and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or re-designated it, its dossier content unchanged (§7.4; item 20 (c))",
      "and a `revert` of it skips every later event of session `host:port` that placed or re-designated it, its dossier content unchanged (§7.4 *Replay semantics*; item 20 (c))",
      'VDC1-17 T20-6 revert (R2-19)')
    a("and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and changes nothing (§7.4) (the epoch clause, from M4; J-A17.01);",
      "and an `undo` naming an epoch of session `host:port` — one that carried a dossier event in `EpochInputs.dossier`, and a year-end epoch that carried none — returns F-EDIT and changes nothing (§7.4 *Replay semantics*) (the epoch clause, from M4; J-A17.01);",
      'VDC1-17 T20-6 undo (R2-19)')
    a("brand-new map from a dossier holds every dossier element from the start, and everything outside the report is\n    byte-identical after any dossier event.\n",
      "brand-new map from a dossier holds every dossier element from the start, and everything outside the report is\n    byte-identical after any dossier event. §7.7's precedence (a dossier event is never refused by a lock or a pin; it\n"
      "    supersedes the lock on what it changes, reported orphaned): (T20-14) a dossier rename on a locked name path, and a\n"
      "    `ruined` and a `removed` state on an institution whose building is locked — each lands, the lock is reported\n"
      "    orphaned in the event's disruption report, and every other locked entity is byte-identical; (T20-15) a dossier\n"
      "    population fall over a town whose remaining households all live in locked dwellings — the population met within\n"
      "    the roster tolerance by `relet`s down, every locked building's state and shell byte-identical, the emptied ones\n"
      "    counted in `uses.heldByProtection` and no `vacate` emitted on a locked or pinned building; (T20-16) a fall over a\n"
      "    town whose remaining households are all locked — met within the roster tolerance, the locked and pinned households\n"
      "    taken in the roster's suffix order, every superseded household lock reported orphaned.\n",
      'VEL0-01 / VDC1-17 T20-14 – T20-16 (R2-18 (d))')

    # ---- VPC-R1-23: T66-2's enclosed basement ----
    a("and a target within\n    `digReachM` whose route is longer than 2 × `digReachM` is refused with its reason (II.7.6 step 3);",
      "and a target within\n    `digReachM` whose route is longer than 2 × `digReachM` is refused with its reason, and so is an enclosed basement — its\n"
      "    ring within `foundationClearM` of other footprints, basement rings or dug passages on every side, and, apart, the\n"
      "    water table above every floor between it and the target: the dry run refuses with `E_NO_PATH`'s reason naming the\n"
      "    blocking building or the water table (F-EDIT), the basement of step 1 is not laid and nothing else changes (II.7.6\n"
      "    step 3);", 'VPC-R1-23 T66-2 (pipeline hand-off)')

    # ---- VM-R1T-10 and R2-26 (b)–(c): T110-2 and T110-5 ----
    a("a declared course drawn beyond the frame bent to the ring; (T110-3)",
      "a declared course drawn beyond the frame bent to the ring; the support step's obstacles and bounds (§2.7): a\n"
      "    viaduct over a square and an aqueduct over an oasis's grove, 0 piers in either, each span over one `open` with\n"
      "    reason `clear`; a generated viaduct and aqueduct over a 200 m river dropped (`raised_too_long`, the epoch candidate\n"
      "    waiting as `raised_too_tall`'s does), a declared one bent to a course whose clear spans fit\n"
      "    `raisedWays.structure.maxClearSpanM`, no support in water; a CITY masonry aqueduct across a moated c15 wall with an\n"
      "    intervallum and a timber viaduct on a gate's line, both built, each crossing's one station on the trace the wall's\n"
      "    band (the aqueduct's arch, the raised gate's tower; §2.7's support step (3)), 0 piers in a setback, glacis, berm\n"
      "    or moat, and every clear span on either side of the station within its bound; (T110-3)",
      'VM-R1T-10 / R2-26 (b), (c) T110-2')
    a("and a deck slot whose face would cross the outer ring left out,\n    reported and re-offered by a frame growth;",
      "and a deck slot whose face would cross the outer ring left out,\n    reported and re-offered by a frame growth; a walled, moated fixture with stone moat bridges holds 0 deck plots on a\n"
      "    bridge over a `moat` or `castle_moat` whose way is a `Gate.way`;", 'VM-R1T-10 T110-5')

    # ---- R2-27: item 114's group — T114-9 (VDC1-18) and the welded stretch (VEW-r1-02) ----
    a("  * *Walls that decay and recover (item 114; §2.7, §7.1, §7.4, §7.7, §8.2, §11).*",
      "  * *Walls that decay and recover (item 114; §2.7, §5.3, §7.1, §7.4, §7.7, §8.2, §11).*", 'VDC1-18 head')
    a("derives from the dossier's readiness and the wealth by §7.7's condition\n    row at its table shares",
      "derives from the dossier's readiness and the wealth by §7.7's DR41\n    at its table shares", 'R2-11 DR41')
    a("byte-identical to the build without item 114 (a `NoOpPin`,\n    `item114.condition`).",
      "byte-identical to the build without item 114 (a `NoOpPin`,\n    `item114.condition`); (T114-9) a way crosses an enceinte at a gate or at an opening of item 114 and nowhere else: a refounded\n"
      "    village's tracker crossing a ruined former enceinte at a `breached` run and at a gate gap commits with 0 violations\n"
      "    of §5.3's wall-crossing row, and a TOWN epoch beside a `breached` run grows no way through the breach (§5.3; §4.4\n"
      "    S5c's legality); (T114-10) on a CITY fixture with an `on_enceinte` castle at a vulnerable, poor town's generation\n"
      "    shares and over 10 epochs, the town enceinte's and the bailey's three profiles along `Castle.cityWeld` are equal at\n"
      "    every commit (§2.7's welded stretch), §8.2 draws one state there, and §11.1's battle-map export gives one\n"
      "    wall-or-opening answer per edge.", 'VDC1-18 T114-9 / VEW-r1-02 T114-10 (R2-27)')
    a("Volume 6 runs T114-1 – T114-5 and T114-8's epoch clause on its engine (T-V6-73), volume 7 the\n    palisade's (T-V7-62),",
      "Volume 6 runs T114-1 – T114-5 and T114-8's epoch clause on its engine (T-V6-73), volume 7 the\n"
      "    palisade's (T-V7-62) and T114-9's village clause on its replay fixture (T-V7-59),", 'R2-08 T114-9 village end')

    # ---- R2-14: item 115's "specified" ----
    a("(T115-2) at most one manor, and only with a lord (a seigneurial government) or a\n    dossier record — the manor count never rises with the wealth;",
      "(T115-2) the manor count by rung: no manor at THORP or HAMLET unless specified —\n"
      "    V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a\n"
      "    dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1); a seigneurial\n"
      "    government alone admits none — and at VILLAGE at most one, only with a lord (a seigneurial government) or when\n"
      "    specified; the manor count never rises with the wealth (§4.7 S10b (3); V11's `grandeur.ceiling` rows);",
      'VCS-r1-03 T115-2 (R2-14)')
    a("(T115-3) a grand building the dossier names (a manor,\n    hall or similar record) and one the user places",
      "(T115-3) a grand building the dossier specifies (V08\n    §3.16 (3)) and one the user places", 'R2-14 T115-3 (the retired gloss)')
    a("volume 2 on composed shapes (its\n    item-115 bars, V02 §7),", "volume 2 on composed shapes\n    (T-V2-58),", 'VCS-10 item 115 runs')

    # ---- R2-30: item 116 at the cap ----
    a("the view\n    at the zoom-out limit shows the whole `bounds`, no stop beyond",
      "the view\n    at the zoom-out limit shows the whole `bounds` — while a crisis look stands, the bounds of town and camps (item 122\n"
      "    (i)) —, or is stop 0 where the bounds are wider than the window at stop 0 (§8.8), no stop beyond", 'R2-30 T116-1')
    a("(T116-4) every export frames within the limit, the whole bounds at most.",
      "(T116-4) every export frames within the limit, the whole bounds at most, or stop 0's extent where the bounds are wider\n    than the window at stop 0.", 'R2-30 T116-4')

    # ---- R2-40, R2-11: T117-6 ----
    a("(T117-6) a campaign dossier opens on its own week, `week mod 52` under the\n    follow flag (§7.7's season row), and a map with no week opens at midsummer;",
      "(T117-6) a dossier-bound map opens on its present week — the dossier's latest stamped\n"
      "    tick (§4.11 *The clock*; item 125) — at `week mod 52` under the follow flag (DR42), and a map with no stamped tick\n"
      "    opens at midsummer;", 'R2-40 / R2-11 T117-6')
    a("Volume 7 runs them at its\n    rungs (T-V7-65), volume 8 the dossier's week and climate (T-V8-54),",
      "Volume 7 runs them at its\n    rungs (T-V7-65), volume 5 the islands through the year (T-V5-34), volume 8 the dossier's week and climate (T-V8-54),",
      'VCS-10 item 117 runs')
    a("volume 5 the sky islands' pennants (its item-118 bars,\n    V05 §7)", "volume 5 the sky islands' pennants (T-V5-35)", 'VCS-10 item 118 runs')

    # ---- VCS-10, VAP-r1-09: item 119's runs list ----
    a("Volume 9 runs the progress view (T-V9-79) and volume 12 the timer and the register\n    check (T-V12-50).",
      "Volume 9 runs the progress view (T-V9-79), volume 12 the timer and the register\n"
      "    check (T-V12-50), and each layer's volume its own waits: volume 1 the stage-2 waits (T-V1-29), volume 2 the stage-3\n"
      "    waits (T-V2-22, T-V2-24), volume 3 the plan's (T-V3-37), volume 4 the underground's (T-V4-32), volume 5 the\n"
      "    islands' (T-V5-18) and volume 7 the village's (T-V7-67).", 'VCS-10 / VAP-r1-09 item 119 runs')

    # ---- R2-07, R2-09, V12's hand-off: the convention ----
    a("The bars `T⟨item⟩-⟨n⟩` of items 8–119 are stated once, here,",
      "The bars `T⟨item⟩-⟨n⟩` of the owner items are stated once, here,", 'R2-07 convention / VCS-r1-01 / G120')
    a("V11 §3.7.4's web off form for items 105 and\n  107, the cells the bar names otherwise);",
      "V11 §3.7.4's web off form for items 105 and\n  107, the cells the bar names otherwise) — a view pin's off form the view state its bar names (`view`: items 117,\n"
      "  118, 120–122, 124 and 126), an input pin's the input withheld (`input`: item 125's host context) and an entity-scope\n"
      "  pin's the entities its bar names (`entityScope`: item 123's never-decayed buildings) (V12 §3.7.8 (5));",
      'R2-09 convention (5)')
    a("a fixture\n  property is a conformance clause, listed in the harness registry's `conformance` list;",
      "a fixture\n  property is a conformance clause, listed in the harness registry's `conformance` list — items 120–126's statistics\n"
      "  and pins measure such clauses (V12 §3.15);", 'V12 hand-off convention (6)')
    a("and the bench bars of items 114–119 by the seats landing their mechanisms",
      "and the bench bars of items 114–126 by the seats landing their mechanisms", 'R2-07 convention (7)')
    a("* **The owner items 102–119.**", "* **File g's items.**", 'VCS-r1-01 / R2-07 group head')

    # ---- R2-35: the bars of items 120–126 (G120 – G126-scope) ----
