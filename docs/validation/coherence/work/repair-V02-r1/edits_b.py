"""VV12-02 — g item 115's V02 part: the composition rows' ceiling by rung in the resolution chain (J127), at build depth."""

CEIL = """   * **The rung ceiling (item 115; J-V2.110).** A **dwelling** — a building whose use's class has the profile family
     `housing` (V11 §3.5.3; V07 §2.4's `v.` rows of that family) — whose class is not in `grandeur.ceiling`'s
     `settings.grandClasses` (V11 §3.25.4: the manor and the other lords' and rulers' houses, whose number and presence
     S10b's manor rule decides, §4.7 S10b *Class mix* (3)) reads its resolved row **capped** by the ceiling row of the rung
     in force — the document's (§1.1) at generation, the epoch's at an epoch (V06 §3.8.5) — and S11 passes the capped key in
     `BuildingInput.compositionRow` (§4.7 S11 *Footprints and heights*). A row caps only where it is `enabled` and limits
     something — `dwellingFamilies` not `'all'`, or one of `towers`, `turrets`, `gatehouse` and `courts` false: as shipped,
     the THORP, HAMLET and VILLAGE rows. Every slot of a capped dwelling's site then reads its row with:
     1. `families` keeping a family only where `dwellingFamilies` lists it (as shipped `single`, `L`, `T`) or it is one of
        the arrangement's own constructions (`row`, `shelter`, `template`, `axisLocked`, `baseOutline`), and never a closed
        family (`MassingFamilyRow.closed`) where `courts` is false nor `towerHouse` where `towers` is false; M4 renormalises
        the kept weights as for any row. Where no kept family has a positive weight, the families of
        `default.<arrangement>/<band>` (with the same suffix) capped the same way, else `baseOutline`, reported
        `ceilingEmpty`; where an assignment's `DriftBounds.families` (§2.6) admits none of the kept families, the drift's
        families are read uncapped — a declared bound, the ceiling a default (item 101 R2);
     2. `towers` [0, 0], `towerOnBlock` and `crossingTower` 0 and `westTowers` [0, 0] where `towers` is false; `turret` 0
        where `turrets` is false; `gateTower` 0 where `gatehouse` is false, a slot whose role key is `gatehouse`
        (V02 §3.10.4) then reading `outbuilding/<band>` (a plain range, no gate hall);
     3. a chain step whose key is a `grandClasses` class's override row (`manor/<band>`) skipped, the chain reading on.
     Every other cell — sizes, widths, lengths, blocks, back ranges, roofs, dormers, porches, hearths, the cupola, the
     rooms — stays the row's, so wealth shows as larger ranges, more outbuildings, dormers, porches and hearths and better
     roofs inside the capped row (item 115 (a)), and DR6's wealth moves a dwelling only along it, the richest dwelling its
     rich anchor (item 115 (d)). A row `enabled` false, or one that limits nothing (TOWN, CITY, METROPOLIS), caps nothing
     and writes nothing, so those rungs stay byte-identical (item 115 (f); T-V2-58). A capped key is the resolved key
     followed by `~<RUNG>`, the rung it was capped at (`dwelling-compound/rich~HAMLET`); a key without the suffix is
     uncapped, as every key written before item 115 is (no migration row).
     **Unless specified** (item 115 (c)): a `grandClasses` building — one S10b admits, or one the dossier specifies
     (V08 §3.16 (3)) — reads its full row at every rung, and a hand design is never capped: a T6 placement of a
     `grandClasses` class and every `setMassing` and `setComposition` op (V02 §4.2, V02 §4.3; a `family` op lays the asked family from the
     building's row uncapped) are committed as asked — the ceiling is a default, never a refusal (item 101 R2) — the why
     fact `massing/ceiling` (V02 §4.5) naming the exception and V09 §4.21.5's `info.grand.beyondTier` or
     `info.grand.dossier` line saying that the building exceeds the tier's usual (V10 tells it).
     **Over epochs** (item 115 (e)): the ceiling is read where the chain is resolved — at generation, for a building new or
     rebuilt, a mutation's target (V02 §3.9) and New random on its plot (§7.1) — at the rung in force then; a re-derivation that
     keeps a building standing (a carry, a terrain or water operator's re-fit) reads the ceiling of the rung its stored
     `MassingRef.row` records, so a rung's crossing reshapes no standing building, up or down (V06 §3.8.5 (1)–(2)).
"""


def add(E):
    # §3.2 step 2 — the ceiling in the resolution chain
    E('VV12-02 §3.2 ceiling',
      "     the underground layer.\n   The key reached is written to `MassingRef.row` and `Composition.row`, so the why provider and the report name it.",
      "     the underground layer.\n" + CEIL +
      "   The key reached is written to `MassingRef.row` and `Composition.row`, so the why provider and the report name it.")

    # §2.1's writers and readers of MassingRef.row; §2.5's migrate cell
    E('VV12-02 §2.1 row writers',
      "`default.<arrangement>/<band>`, with `@underground` or `@deck` appended where V02 §3.2 says | the report, the why provider, the composer (`Composition.row` unless an edit changed the class since) |",
      "`default.<arrangement>/<band>`, with `@underground` or `@deck` appended where V02 §3.2 says, and `~<RUNG>` where the rung ceiling capped it | the report, the why provider, the composer (`Composition.row` unless an edit changed the class since; it reads the row without the `~<RUNG>` suffix, whose cells are the massing's), a standing building's re-derivations (its ceiling's rung, V02 §3.2 step 2) |")
    E('VV12-02 §2.5 migrate',
      "| an older document keeps its value; one from before stage 3 has none and reads as `baseOutline` until an `upgrade` re-derives S11 (§7.5; a declared shift, §13.3) |",
      "| an older document keeps its value; one from before stage 3 has none and reads as `baseOutline` until an `upgrade` re-derives S11 (§7.5; a declared shift, §13.3); a `row` without the ceiling's `~<RUNG>` reads uncapped (V02 §3.2 step 2) |")

    # §1b — the ceiling's row and T-V2-58's pin registration
    E('VV12-02 §1b ceiling row',
      "without a programme row (V03 §2.4; J-V3.111) | §4.7 S11; §10.2 |\n",
      "without a programme row (V03 §2.4; J-V3.111) | §4.7 S11; §10.2 |\n"
      "| the rung ceiling on a dwelling's row (item 115) | stage logic, table read | V11 §3.25.4's `grandeur.ceiling` row of the rung in force (the document's; at an epoch the fold's, V06 §3.8.5) and its `settings.grandClasses`; the use's class and its profile family; S11's capped key in `BuildingInput.compositionRow` | M1's capped row (M3–M8's families and their tower, turret and gate-tower cells), `MassingRef.row`'s `~<RUNG>`, a standing building's re-derivations, the why fact `massing/ceiling`, V09 §4.21.5's beyond-tier line, T-V2-55, T-V2-58 | §4.7 S10b *Class mix* (3), S11 *Footprints and heights*; §10.2 *Grandeur ceiling* |\n")
    E('VV12-02 §1b pin row',
      "| the NoOpPin registration of T-V2-50 (item 110's off form) | pin registration | the seat landing M3a-V2 | V12 §3.7.8's pin engine, reading V11 §3.24.0's off form | §13.2's convention; V12 §3.7.8 |\n",
      "| the NoOpPin registration of T-V2-50 (item 110's off form) | pin registration | the seat landing M3a-V2 | V12 §3.7.8's pin engine, reading V11 §3.24.0's off form | §13.2's convention; V12 §3.7.8 |\n"
      "| the rung-pin registration of T-V2-58 (B-MASS on `item115.ceiling`; item 115 (f)) | pin registration | the seat landing M6a | V12 §3.7.8's pin engine, its `rungScope` kind (V12 §2.13) | §13.2's convention (T115-4); V12 §3.7.8 |\n")

    # §3.18 (b), (c), (e)
    E('VV12-02 §3.18 (b) village',
      "deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate) |",
      "deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate); every dwelling but a `grandClasses` building reads its row under the rung's grandeur ceiling — at most `single`, `L` or `T`, no tower, turret, gate tower or court — while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115) |")
    E('VV12-02 §3.18 (b) town',
      "| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5) |",
      "| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5); the grandeur ceiling caps nothing (V02 §3.2 step 2) |")
    E('VV12-02 §3.18 (b) city',
      "| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows |",
      "| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows; the grandeur ceiling caps nothing |")
    E('VV12-02 §3.18 (b) tests', "Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55.",
      "Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58.")
    E('VV12-02 §3.18 (c) off form',
      "| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |\n",
      "| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |\n"
      "| the grandeur ceiling off (V11 §3.24.0's off form: every `grandeur.ceiling` row `enabled` false) | no row capped: every rung reads as TOWN does, byte-identical to stage 3 without item 115 (the `item115.off` pin, V12 §2.13) |\n")
    E('VV12-02 §3.18 (c) tests', "Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55.",
      "Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58.")
    E('VV12-02 §3.18 (e) row',
      "R7's defaults (V02 §8.4) | substitute | T-V2-33 |\n",
      "R7's defaults (V02 §8.4) | substitute | T-V2-33 |\n"
      "| the rung ceiling (V02 §3.2 step 2) | a capped row keeping no family; an assignment's drift admitting none of the kept families; a `gatehouse` slot on a capped dwelling; a ceiling row that limits nothing or is off | the default row's capped families, else `baseOutline` (`ceilingEmpty`, reported); the drift's families read uncapped, the why fact naming it; the `outbuilding` row; no cap and no suffix | substitute | T-V2-58 |\n")

    # §4.5 — the why fact and the family strip
    E('VV12-02 §4.5 why', "`massing/row` (the key the chain reached), the manifested band and value, the drift",
      "`massing/row` (the key the chain reached), `massing/ceiling` (the rung whose\n"
      "  `grandeur.ceiling` row capped the row and the cells it set, or why none did — a `grandClasses` building, a hand design, a\n"
      "  drift read uncapped, a row that limits nothing; item 115), the manifested band and value, the drift")
    E('VV12-02 §4.5 strip',
      "A **family strip** shows the feasible families of the\n  building's row, each as a ghost made by a dry run of `setMassing family`, one tap committing it.",
      "A **family strip** shows the feasible families of the\n  building's row read uncapped (a family above the rung's grandeur ceiling carrying V09 §4.21.5's beyond-tier line,\n"
      "  V02 §3.2 step 2), each as a ghost made by a dry run of `setMassing family`, one tap committing it.")

    # §7 — T-V2-55's clause, T-V2-58, the fixture, the CI tiers
    E('VV12-02 T-V2-55', "the `VG` preset's `sunBias` is 0.5; every row of V02 §3.18 (b) and (c) holds.",
      "the `VG` preset's `sunBias` is 0.5; every dwelling but a `grandClasses` building reads its row under the\n"
      "  rung's grandeur ceiling at THORP, HAMLET and VILLAGE, and no row is capped at TOWN and above (V02 §3.2 step 2; T-V2-58\n"
      "  holds the bar); every row of V02 §3.18 (b) and (c) holds.")
    E('VV12-02 T-V2-58',
      "  restored).\n\n### 7.3 Outcomes (O) and statistics",
      "  restored).\n"
      "* **T-V2-58 the grandeur ceiling** (item 115 (f); takes T115-1's composed-shape clause, §13.2's stage-3 row) — on\n"
      "  B-VILLAGE's rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum (V07's T-V7-63 fixtures, 20 seeds a rung) and\n"
      "  on B-MASS's ceiling sub-fixture: (a) no dwelling but a `grandClasses` building has an `H`, `U` or closed family, a\n"
      "  `tower` or `turret` wing or a gate tower — every other dwelling's family in its ceiling row's `dwellingFamilies` or one\n"
      "  of the arrangement's own constructions, its `MassingRef.row` carrying the rung it was capped at — and every size,\n"
      "  dormer, porch and hearth cell reads as the uncapped row's; (b) the only dwellings with a grand arrangement are\n"
      "  `grandClasses` buildings — none at THORP and HAMLET without a dossier record, at most one at VILLAGE and only with a\n"
      "  `seigneurial` government or a dossier record (S10b's count, checked on the composed shapes); (c) the dossier-named hall (a\n"
      "  `v.manor_house` record, the lord's hall, at HAMLET) reads its full row, and a `setMassing { family: 'H' }` and an\n"
      "  `addTower` on a hamlet cottage are committed as asked, the why fact `massing/ceiling` naming each; (d) a terrain\n"
      "  operator's re-fit of a standing capped and of a standing uncapped building keeps its `MassingRef.row`, cap and rung\n"
      "  included, and its wings byte-identical (the epoch clauses are V06's T-V6-74); (e) a capped row keeping no family\n"
      "  takes the default row's capped families (`ceilingEmpty` reported), a drift admitting only dropped families is read\n"
      "  uncapped (the why fact naming it), and a `gatehouse` slot reads `outbuilding`; (f) TOWN, CITY and METROPOLIS\n"
      "  byte-identical across the ceiling table's bump: B-MASS registered on the rung pin `item115.ceiling` (V12 §2.13;\n"
      "  T115-4).\n"
      "\n### 7.3 Outcomes (O) and statistics")
    E('VV12-02 §7.1 fixture',
      "the **combination sub-fixture** (V02 §3.18 (f)'s rows no other bar holds; T-V2-57); and V02 §7.7's.",
      "the **combination sub-fixture** (V02 §3.18 (f)'s rows no other bar holds; T-V2-57); the **ceiling sub-fixture**\n"
      "  (every `housing` class's row and every `v.` housing class's at the rich anchor, on plots wide enough for every family,\n"
      "  under the THORP, HAMLET, VILLAGE and TOWN ceiling rows, with a `v.manor_house` dossier record at HAMLET and an\n"
      "  assignment drift naming only `H`; T-V2-58); and V02 §7.7's.")
    # §8.3 — priced inside M6a
    E('VV12-02 §8.3 M6a content', "the significance shift, split and ladder composition;",
      "the significance shift, split and ladder composition; item 115's rung ceiling in the chain with the `~<RUNG>` key and the why fact `massing/ceiling` (V02 §3.2 step 2; inside the estimate — before M6a the base outline builder lays no `H`, `U`, closed family or tower on a dwelling);")
    E('VV12-02 §8.3 M6a exit', "T-V2-37 – T-V2-42, T-V2-55 and T-V2-56's massing rows on B-MASS, B-CITY and B-VILLAGE;",
      "T-V2-37 – T-V2-42, T-V2-55, T-V2-56's massing rows and T-V2-58 (with B-MASS's `item115.ceiling` registration) on B-MASS, B-CITY and B-VILLAGE;")

    # §0 — in plain words
    E('VV12-02 §0',
      "budget steps down from a courtyard to a U, an L or a single range rather than overflowing.\n",
      "budget steps down from a courtyard to a U, an L or a single range rather than overflowing.\n\n"
      "**Small places are not grand (item 115).** In a thorp, a hamlet or a village, wealth shows as bigger houses, longer\n"
      "ranges, more outbuildings, dormers, porches and chimneys and better roofs — never as a courtyard, an H or U plan, a tower\n"
      "or a turret on a house. Only a village's one manor house, where there is a lord or SettlementForge names one, takes the\n"
      "grand plans. A hall SettlementForge names, or a house you reshape by hand, keeps its full design, and the clerk says it\n"
      "is grander than such a place usually has. A village that grows into a town builds grander from then on; a town that\n"
      "shrinks keeps its grand buildings as they stand.\n")

    # §1c — the hook consumed
    E('VV12-02 §1c', "(V02 §4.2, V02 §4.3, V02 §4.6; J-V2.79) |\n\n### 1d Out of scope",
      "(V02 §4.2, V02 §4.3, V02 §4.6; J-V2.79) |\n"
      "| §4.7 S10b *Class mix* (3) and S11 *Footprints and heights*; §10.2 *Grandeur ceiling* (item 115, file g) | the rung's `grandeur.ceiling` row (V11 §3.25.4) and its `settings.grandClasses`; S10b's manor count | the rung ceiling on a dwelling's resolved row (V02 §3.2 step 2) |\n"
      "| §12.1 *Targets and the comfort level*; §12.10's R12-31 – R12-34 (item 119, file g) | the ten-second comfort level, the progress rule, the measured-gain rule, the interaction budgets | V02 §6's targets and waits (V02 §6, V02 §6.4) |\n"
      "\n### 1d Out of scope")
