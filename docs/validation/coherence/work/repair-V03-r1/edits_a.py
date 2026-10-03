# edits_a — V03 §1, §1b, §2.1, §2.3, §2.4, §2.5. Each E(heading, old, new, count, tag); tag = the issue or hand-off served.
H1 = '## 1 Scope, the base hooks consumed, and what is out of scope'
H1B = '## 1b Wiring table'
H21 = '### 2.1 Record additions (typed)'
H23 = '### 2.3 The plan report (non-canonical)'
H24 = '### 2.4 The rule tables and the default rows'
H25 = '### 2.5 Lifecycle of every new state field'


H0 = '## 0 In plain words'


def add(E, A):
    # ---------------- §0 (plain words for items 119 and 120) ----------------
    E(H0,
      "virtual-tabletop scene with its walls, doors, windows and lights.",
      "virtual-tabletop scene with its walls, doors, windows and lights.\n"
      "\n"
      "**Find and speed.** With Find on (item 120), zooming in on a building that holds what you are looking for lights up\n"
      "the rooms that do the work — a smithy's forge and shop, an inn's common room and guest rooms, a church's nave and its\n"
      "crypt — while the families' own rooms stay under the veil; the storey switcher marks the floors that hold them, and\n"
      "Find never changes the plan. Every wait you sit through once — a dossier change that re-cuts many saved plans, an\n"
      "export of a tall building's every storey, opening a map saved by an older version — ends within ten seconds at every\n"
      "size up to the largest metropolis and shows its progress after the first second (item 119); opening a plan,\n"
      "switching storeys and editing stay as quick as before.",
      1, 'VV34-01, G120-V03')

    # ---------------- §1 ----------------
    E(H1,
      "block, SVG, raster and per-storey VTT scenes; budgets, bars and the build plan. The base states the records (§2.6's",
      "block, SVG, raster and per-storey VTT scenes; the plan's part of Find, the rooms a match uses at the interior band\n"
      "(item 120; V03 §5.5); budgets with the plan's share of the one-time waits (item 119), bars and the build plan. The base\n"
      "states the records (§2.6's",
      1, 'G120-V03, VV34-01')
    E(H1,
      "| the plan row, the cache line and the chain count (§12.7, §12.8) | V03 §6 |\n",
      "| the plan row, the cache line and the chain count (§12.7, §12.8) | V03 §6 |\n"
      "| the targets, the comfort level for one-time waits, the measured-gain and progress rules and the interaction budgets (§12.1, §12.5, §12.6; item 119) | the plan's one-time waits and its interaction rows (V03 §6), T-V3-37 |\n",
      1, 'VV34-01')
    E(H1,
      "| the `query` union with `plan` and `planReport`, the oracle rules (§11.2) | V03 §4.6 |\n",
      "| the `query` union with `plan` and `planReport`, the oracle rules (§11.2) | V03 §4.6 |\n"
      "| the view key `find` (§2.9), the veil, outline and halo rows (§8.2), Find in picture exports (§11.1), the gazetteer's matches under knowledge admission (§11.2), the overlay's budget (§12.5) — item 120 | the rooms a match uses at the interior band (V03 §5.5), T-V3-38 |\n",
      1, 'G120-V03')
    E(H1,
      "**Other volumes and file g items read (cited, never restated).** Volume 1: a `RetainingWall`'s step `stepProfile(wall)`\n"
      "(BCR-V1-43; V01 §3.11 (7)), read by `basementDoor(b)`'s rule 1; its entrance reserve and close-up digest (V01 §3.8.2\n"
      "step 5, V01 §3.8.3), which read `basementDoor(b)` and `stackAccessDoor(b, a)`.",
      "**Other volumes and file g items read (cited, never restated).** A `RetainingWall`'s step, read by `basementDoor(b)`'s\n"
      "rule 1, is §2.7's `stepProfile(wall)` (file f item 245). Volume 1: its entrance reserve and close-up digest (V01 §3.8.2\n"
      "step 5, V01 §3.8.3), which read `basementDoor(b)` and `stackAccessDoor(b, a)`.",
      1, 'VAF-R0S-28')
    E(H1,
      "F-COMPOSE (3)'s omitted rooms and `CompositionRow.rooms.gateHallM` (V02 §3.13, V02 §2.2); each wing's",
      "F-COMPOSE (3)'s omitted rooms (V02 §3.13) and `CompositionRow.rooms.gateHallM` (V02 §2.3, V02 §3.8); each wing's",
      1, 'VAF-R0S-24')
    E(H1,
      "Volume 7: the village classes by their `v.` keys (V07 §2.4; V11 §2.9). Volume 10:",
      "Volume 7: the village classes by their `v.` keys (V07 §2.4; V11 §2.9). Volume 9: the Find panel and its `live.find`\n"
      "overlay, which draw V03 §5.5's rooms (item 120); the progress view of a one-time wait (V09 §4.21.9; item 119). Volume 10:",
      1, 'G120-V03, VV34-01')
    E(H1,
      "(ladder buildings), item 109 (e), (g), (j) (1)–(5) with (3b), (k) (2) and (6) as revised ~20:05 (J111), item 110 (a)–(f)\n"
      "as revised ~23:40.\n",
      "(ladder buildings), item 109 (e), (g), (j) (1)–(5) with (3b), (k) (2) and (6) as revised ~20:05 (J111), item 110 (a)–(f)\n"
      "as revised ~23:40, item 119 (the plan's one-time waits; J130) and item 120 (Find at the interior band; J133).\n",
      1, 'VV34-01, G120-V03')
    E(H1,
      "(§4.11, volume 6). Elevation drawings:",
      "(§4.11, volume 6); how an epoch run and the history replay are timed against item 119's comfort level (volume 6's\n"
      "part of the item). Find's panel, type-ahead, chip grid, results and `live.find` overlay (volume 9), its draw rows (§8.2)\n"
      "and its matches (§11.2's gazetteer) — this volume gives the rooms a match uses at the interior band (V03 §5.5).\n"
      "Elevation drawings:",
      1, 'G120-V03, VV34-01')

    # ---------------- §1b ----------------
    E(H1B,
      "| the class, family, slot, class-id and village rows; the vacant programme (V03 §2.4) | defaults here, keyed by volume 11's families and classes and volume 7's `v.` keys;",
      "| the class, named, family, slot, class-id and village rows; the vacant programme (V03 §2.4) | defaults here, the class rows keyed by §2.6's `BuildingClass` (volume 11's classes and volume 7's `v.` keys), the family rows by volume 11's families, the named rows by name;",
      1, 'hand-off model VAF-R0S-16')
    E(H1B,
      "| `AccessHead` (declared in V03 §2.1), `Plan.heads` |",
      "| `AccessHead` (§2.6), `Plan.heads` |",
      1, 'hand-off model VAF-R0S-03')
    E(H1B,
      "`RetainingWall`s with volume 1's `stepProfile(wall)`, `levelledGroundCm`,",
      "`RetainingWall`s with §2.7's `stepProfile(wall)` (file f item 245), `levelledGroundCm`,",
      1, 'VAF-R0S-28')
    E(H1B,
      "| A1 and every step's failure handling (V03 §3.9) | the panel (V03 §4.5), the clerk's `planReport`,",
      "| A1 and every step's failure handling (V03 §3.9) | the panel (V03 §4.5; each warning its `report.plan.<code>` line), the clerk's `planReport`,",
      1, 'VV34-09')
    E(H1B,
      "| a split half's programme (`programmeSource.half`) | `Use.branchOf` as S10b's split writes it (item 105 (h)) | A1, the report, the room why |\n",
      "| a split half's programme (`programmeSource.half`) | `Use.branchOf` as S10b's split writes it (item 105 (h)) | A1, the report, the room why |\n"
      "| the rooms a Find match uses — `findRooms(plan, b, target)` (V03 §5.5; item 120) | the drawn plan's rooms (`Room.program`'s origins, `Room.subLocation`, `Room.unit`, scope), the match (V09's `live.find` over §11.2's gazetteer at the view's key), §2.9's view key `find`, V03 §5.4's merge | V09's `live.find` overlay with §8.2's veil, outline and halo rows; the storey switcher's and the plan panel's marks (V03 §4.5); the SVG `plan.find` group (V03 §5.2); T-V3-38 |\n",
      1, 'G120-V03')
    E(H1B,
      "| `ground(b)` and the level reading (V03 §3.3), W2's outside sample (V03 §3.6) | this volume's rules in `@plat/plots`, built at M3a | the plan rung, `Entrance.storey`, `basementDoor(b)`, `stackAccessDoor(b, a)`, volume 1's entrance reserve and digest, §2.6's *Basements* (BCR-V2-33) |\n",
      "| `ground(b)` and the level reading (V03 §3.3), W2's outside sample (V03 §3.6) | this volume's rules in `@plat/plots`, built at M3a | the plan rung, `Entrance.storey`, `basementDoor(b)`, `stackAccessDoor(b, a)`, volume 1's entrance reserve and digest, §2.6's *Basements* (BCR-V2-33) |\n"
      "| `findRooms(plan, b, target)` (V03 §5.5) | this volume's pure reading in `@plat/buildings`, landing with Find (V03 §8) | V09's `live.find` overlay, V03 §4.5's switcher and panel, V03 §5.2's SVG exporter |\n",
      1, 'G120-V03')
    E(H1B,
      "(V03 §4.5), the keymap rows `plan.storeyUp` / `plan.storeyDown` (`keymap.json`, §14).",
      "(V03 §4.5), the keymap rows `plan.storeyUp` / `plan.storeyDown` (`keymap.json`, §14); the view key `find` (§2.9;\n"
      "item 120), read and never written by V03 §5.5.",
      1, 'G120-V03')

    # ---------------- §2.1 (model's MC-11 move of AccessHead) ----------------
    import os
    L = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'V03.orig.md'), encoding='utf-8').read().split('\n')
    old21 = '\n'.join(L[326:346]) + '\n'
    assert old21.startswith("`Entrance.storey`; `Basement.crypt`. This volume declares `AccessHead`") and old21.endswith("```\n\n"), old21[-40:]
    E(H21, old21,
      "`Entrance.storey`; `Basement.crypt`; and `AccessHead` on `Plan.heads`, whose fields V03 §3.7.2 places. This volume\n"
      "states what the fields §2.6 points here for mean:\n"
      "\n",
      1, 'hand-off model VAF-R0S-03')

    # ---------------- §2.3 ----------------
    E(H23,
      "note?: string }[] /* failures V03 §3.9 reports, W_ codes only; each also in the panel's plain words (V03 §4.5) */;",
      "note?: string }[] /* failures V03 §3.9 reports, W_ codes only; each also a panel line, keyed report.plan.<code>, its\n"
      "                        words V03 §4.5's */;",
      1, 'VV34-09')
    E(H23,
      "information, no failure (V03 §3.3 S6, H4; V03 §3.9; a room shrineOneRoom drops keeps its tier in owed): the same ids\n"
      "       volume 10's why causes read (V03 §4.6) */;",
      "information, no failure (V03 §3.3 S6, H4; V03 §3.9; a room shrineOneRoom drops keeps its tier in owed): the ids the\n"
      "       plan section keys info.plan.note.<id> (V03 §4.6) */;",
      1, 'hand-off V10 VV34-07')

    # ---------------- §2.4 ----------------
    E(H24,
      "Room lists are discrete cells (§4.7 S11): an authored four-column cell reads poor / modest / prosperous / rich, `squalid`\n"
      "reading the poor row and `comfortable` the modest row (J-V3.28).",
      "Room lists are discrete cells, read by §4.5's discrete-cell rule: an authored four-column cell reads poor / modest /\n"
      "prosperous / rich, `squalid` reading the poor row and `comfortable` the modest row (the nearest rowed band below;\n"
      "J-V3.28).",
      1, 'hand-off pipeline VAF-R0S-20')
    E(H24,
      "false: exposure read on basement walls only and every entrance on storey 0 — the no-op pin of T-V3-34 */ }",
      "false: exposure read on basement walls only and every entrance on storey 0 — the no-op pin of T-V3-34 and\n"
      "                                 the off form of V11 §3.24.0's item-110 row; its presets.MFCG, .FTG and .VG entries false\n"
      "                                 (V11 §2.2's preset entries; provenance own, noted 'fixed: the parity off value (V11 §3.24.0)') */ }",
      1, 'hand-off V11 VAP-21')
    E(H24,
      "their cells mean: `for.cls` a V11\n"
      "class id, a §2.6 building class, or `'*'` in a generic slot row;",
      "their cells mean: `for.cls` a\n"
      "class id of §2.6's `BuildingClass` (volume 11's classes, volume 7's `v.` keys) or `'*'` in a generic slot row;",
      1, 'hand-off model VAF-R0S-16')
    # the class rows: hall, keep, tower and mill leave the table for the named rows; `temple` names no class
    E(H24,
      "| hall | hall × 1 (hard; area 40 / 80 / 250; ground, or upper over an undercroft × 1 where floors > 1), counting room × 1, office × 1 (soft), store × perStorey | nave 2, follow 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/10 | all, true, false | store |\n",
      "",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "| church, temple | nave × 1 (hard),",
      "| church | nave × 1 (hard),",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "| keep | hall × 1, guard room × 1, store × perStorey (basement), garderobe × perStorey (hard) | nave 1, bisect 1 / nave 1, bisect 1 / nave 1 / nave 1 | tower, spiral (else centre, winder) | core | 1/20 | all, true, false | chamber, store |\n"
      "| tower | towerRoom × perStorey | nave 1 everywhere | centre, spiral | core | 0/1 | none, true, false | — |\n"
      "| mill | mill room × 1 (hard), store × 1 | nave 1 / bisect 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | none, true, false | store |\n"
      "\n"
      "Per-band cells: the circulation column",
      "\n"
      "**The named rows** (J-V3.135): four rows in the class rows' notation and columns, keyed by a template family's or a\n"
      "structure's name, which no building's class takes (§2.6's `BuildingClass`: a template family is never a class), and\n"
      "reached only by name — from the family rows (\"= hall\", \"= keep\", \"= tower\", \"= mill\"), the slot rows and the class-id\n"
      "and specialisation rows that name one; A1 (4) never reaches them:\n"
      "\n"
      "| named row | own rooms | patterns | stair: placement, kind | basementAccess | circulation | shared, unitHearth, unitOneRoom | fill |\n"
      "|---|---|---|---|---|---|---|---|\n"
      "| hall | hall × 1 (hard; area 40 / 80 / 250; ground, or upper over an undercroft × 1 where floors > 1), counting room × 1, office × 1 (soft), store × perStorey | nave 2, follow 1 / nave 1 / nave 1 / nave 1 | by_entrance, straight | core | 1/10 | all, true, false | store |\n"
      "| keep | hall × 1, guard room × 1, store × perStorey (basement), garderobe × perStorey (hard) | nave 1, bisect 1 / nave 1, bisect 1 / nave 1 / nave 1 | tower, spiral (else centre, winder) | core | 1/20 | all, true, false | chamber, store |\n"
      "| tower | towerRoom × perStorey | nave 1 everywhere | centre, spiral | core | 0/1 | none, true, false | — |\n"
      "| mill | mill room × 1 (hard), store × 1 | nave 1 / bisect 1 / nave 1 / nave 1 | by_entrance, ladder | trapdoor | 1/20 | none, true, false | store |\n"
      "\n"
      "Per-band cells (the class and the named rows): the circulation column",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "cells p / m / pr / r; \"= X\" takes class row X whole:",
      "cells p / m / pr / r; \"= X\" takes the class or named row X whole:",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "hall → the\n`hall` class row;",
      "hall → the\n`hall` named row;",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "tower, towers → the `tower` class row;",
      "tower, towers → the `tower` named row;",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "the tower: towerRoom × perStorey as the class row | — |",
      "the tower: towerRoom × perStorey as the `tower` named row | — |",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "| `watchtower`, `tower_house` | the `tower` class row with",
      "| `watchtower`, `tower_house` | the `tower` named row with",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "| `'*'` · `for.use` `tiered_tower` | the `tower` class row (towerRoom × perStorey);",
      "| `'*'` · `for.use` `tiered_tower` | the `tower` named row (towerRoom × perStorey);",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "`v.windmill` — the `mill` class row;",
      "`v.windmill` — the `mill` named row;",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "the template-family row of that name above, else the class row of that name (§2.6's `BuildingClass`, e.g. `manor`,\n"
      "`cottage`), else the slot row",
      "the template-family row of that name above, else the class row of that name (§2.6's `BuildingClass`, e.g. `manor`,\n"
      "`cottage`) or the named row of that name, else the slot row",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "The three `'*'` rows are keyed by specialisation (A1 rule (1)): volume 11 carries `stepped_temple`, `terraced_palace`\n"
      "and `tiered_tower` as specialisation values of the classes whose culture and era build in tiers (V11 §3.6.2), not as\n"
      "class ids,",
      "The three `'*'` rows are keyed by specialisation (A1 rule (1)): volume 11 carries `stepped_temple`, `terraced_palace`\n"
      "and `tiered_tower` as specialisation values of the classes whose culture builds in tiers (V11 §3.24.3), not as\n"
      "class ids,",
      1, 'VAF-R0S-18')
    E(H24,
      "the area overrides of the class, family, slot, class-id and village rows;",
      "the area overrides of the class, named, family, slot, class-id and village rows;",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "`stair.ladder`, `stair.landingCm` and each class row's poorest-band `circulation` (§2.6's *One capacity function*",
      "`stair.ladder`, `stair.landingCm` and each class and named row's poorest-band `circulation` (§2.6's *One capacity function*",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "every `circulation` cell but the class rows' poorest-band ones (PE's line),",
      "every `circulation` cell but the class and named rows' poorest-band ones (PE's line),",
      1, 'hand-off model VAF-R0S-16')
    E(H24,
      "the `circulation` cell of a band row other than a class row's poorest",
      "the `circulation` cell of a band row other than a class or named row's poorest",
      1, 'hand-off model VAF-R0S-16')

    # ---------------- §2.5 ----------------
    E(H25,
      "`SubLocationRoleRow`, `AccessHostRow`; the family, slot, class-id and village rows;",
      "`SubLocationRoleRow`, `AccessHostRow`; the class, named, family, slot, class-id and village rows;",
      1, 'hand-off model VAF-R0S-16')
    E(H25,
      "| a split half's programme (`programmeSource.half`) | at read, from `Use.branchOf` as S10b's split writes it (item 105 (h)) | never (the use is in the leaf digest) | a split or a merge back onto one plot changes `Use.branchOf`, which marks both buildings' plans stale and re-cuts stored ones (§2.8, §7.3) | the causing event's undo restores both uses and both plans | none |\n",
      "| a split half's programme (`programmeSource.half`) | at read, from `Use.branchOf` as S10b's split writes it (item 105 (h)) | never (the use is in the leaf digest) | a split or a merge back onto one plot changes `Use.branchOf`, which marks both buildings' plans stale and re-cuts stored ones (§2.8, §7.3) | the causing event's undo restores both uses and both plans | none |\n"
      "| the rooms a Find match uses (V03 §5.5) | derived per call from the drawn plan and the view key `find` (§2.9) | never (view state, outside the document, its hash and the log) | re-read at every commit, regenerate, undo, advance of time and season change and with the plan's re-derivation (item 120 (f)) | its inputs' undo; the view key is not undone (§2.9) | none |\n",
      1, 'G120-V03')
