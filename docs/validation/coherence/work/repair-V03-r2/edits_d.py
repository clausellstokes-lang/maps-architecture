# edits_d — V03 §6, §7, §8, §9, §11, §12, §13.
H6 = '## 6 Performance budgets'
H7 = '## 7 Tests and acceptance bars'
H8 = '## 8 Build plan'
H9 = '## 9 Decisions (each vetoable)'
H11 = '## 11 Owner questions'
H12 = '## 12 CONFIRMED versus PLAUSIBLE'
H13 = '## 13 Fix list'


T39 = (
    "| T-V3-39 | a decayed or ruined plan (item 123 (f)'s plan clauses; V03 §3.11, V03 §5.6; takes T123-1's, T123-2's, "
    "T123-4's, T123-6's and T123-7's plan clauses), on the damage fixtures at the levels 0, 0.05, …, 1 and, from M6-E, "
    "week by week over V06's decay runs: (a) one plan (T123-1): every room, wall, opening, window, core and furniture "
    "id, ring and position of the damaged plan equals the intact plan's at every level, its `PlanReport`, cache chunk and "
    "the model digest unchanged; the re-let town house, once left, keeps its lodgings plan — never the vacant programme, "
    "never its as-built plan — its elaboration record `current` through the run, and a scrub across the run draws that "
    "one plan; the building generated ruined draws its as-built plan; an author's wing edit during the run re-cuts the "
    "stored plan with every kept element's id and threshold kept; (b) monotone (T123-2's plan clause): at each level the "
    "damaged set contains every lower level's, on every kind, and a roofless wing's roof bays are all damaged from the "
    "week it turns roofless; (c) restoring reverses it (T123-4's plan clause): a restoration from level 1 to 0 removes "
    "the damage in reverse threshold order, the highest first, each element then drawn in patch material until a "
    "rebuild; a restoration with no Works removes it at once, every patch drawn; a roof bay the roofless state opened is "
    "patched once the wing is roofed; (d) the drawing (V03 §5.1): each state shows item 123 (c)'s look — `abandoned` "
    "furniture broken, doors off and the floors' dust; `decayed` partitions down, floor holes and roofs open, every room "
    "over a hole or under an open roof marked unsafe and unlabelled; `ruined` outer walls broken, the upper storeys "
    "mostly floorless and the ground storey walkable; the ruined church's crypt rooms, its join and every way down kept "
    "(V04 §5.6) —, no party wall broken in the ruined row, the porch gone with its wall, and a building in a decay run "
    "naming no household and lighting no room; (e) exports (T123-6's plan clause): each storey's `.dd2vtt` and Foundry "
    "scene leaves out of `line_of_sight` and its walls every run and partition the own level breaks, keeps every "
    "`cellarWall` and `cryptWall` run, writes no portal for a broken door and none at or above level 0 for a broken "
    "stair, and draws holes, rubble and patches in its image only (validators); the SVG carries `plan.damage` with each "
    "damaged and repaired id in its metadata; the JSON block's `damage` lists exactly `ownDamaged` and `repaired`; "
    "CityJSON and glTF are byte-identical to the intact plan's; (f) the panel's damage lines and the `plan` section's "
    "rows read the same `PlanDamage` — one line or row per kind present, none on a never-decayed building — and at "
    "`public` a front's concealed rooms show no hole, spill or patch of their own; (g) T123-7's plan clause is V12's "
    "`item123.damage` pin over these fixtures (V12 §2.13; V12 §3.15.13): a never-decayed building draws, exports and "
    "answers byte-identically to its plan without the layer | the damage fixtures, B-CITY-lite; before M6-E the levels "
    "at V11's default age; validators in CI; from P4, (e) from P5 |")

T40 = (
    "| T-V3-40 | a disaster's look in the plan (item 122 (d), (f) and (g)'s plan clauses; V03 §5.6 (4); takes T122-1's, "
    "T122-2's and T122-3's plan clauses), on the damage fixtures' district under its disaster condition and under a "
    "`disaster` preview: (a) T122-1's plan clause: every plan id, stored plan, cache chunk, `PlanReport`, the model digest "
    "and the saved bytes identical with `crises` in `follow`, `off` and `preview` and in every week; (b) T122-2's: each "
    "building of a returned district draws its damage at the look's `lookLevel` by severity exactly in the condition's "
    "weeks, and at its own level outside them, after the hand-over (`crisisLookYields`), with Show crises off and at a "
    "key that withholds the condition; a building under the look and its own decay draws the higher level on every "
    "element, and the look leaves no patch; (c) T122-3's: the damaged set is byte-stable per seed across two views, a "
    "scrub away and back, a save and load and a regenerate; (d) exports: a picture export draws the look as the view "
    "does; a `.dd2vtt` and a Foundry scene of a look-damaged storey draw the look in their image only, their walls, "
    "portals and lights the own level's; the JSON block and the `plan` section carry no look; (e) the panel shows the "
    "look's lines under `info.crisis.ruinedFor` (V09 §4.21.13 (3)); (f) with no condition and no preview every plan tile "
    "is byte-identical to the base — V12's `item122.crises` pin (V12 §2.13; T122-7) | the damage fixtures, "
    "B-CITY-lite; from P4 once item 122's base parts (M3b) and V01's districts (M5) stand, (d) from P5 |")


def add(E, A):
    # ---------------- §6 ----------------
    E(H6,
      "measured at Find's landing (V03 §8) on the B-CITY METROPOLIS seeds |",
      "measured at Find's landing (V03 §8) on the B-CITY METROPOLIS seeds |\n"
      "| the damage layer (V03 §5.6; item 123): `planDamage` per drawn plan | ≤ 0.05 ms per plan | O(elements): ≤ 60 rooms "
      "with their walls, openings, windows, cores and furniture, one `plan.damage` uniform each (§6.3's fixed-key draw) and "
      "one comparison, memoised with the plan per (lineage, drawn week, level); the levels V06's (their cost V06 §6's); its "
      "marks inside the per-storey draw row above, the rubble §8.6's keyed stipple; measured at P4 on the damage fixtures |\n"
      "| the plan in force of a building in a decay run (V03 §3.11) | ≤ 1 ms per lineage, once per run | the building's and "
      "its plot's records at the week before the run, from their history images (V06 §3.15.2's images path, two records "
      "only), memoised per lineage for the session; where the frame builder must replay instead, its cost is V06 §6.4's "
      "frame row, inside §12.7's chain budget for the click |\n"
      "| a disaster's look over drawn plans (V03 §5.6 (4); item 122) | ≤ 0.05 ms per drawn plan in a ruined district | "
      "V02 §5.7 (1)'s level (the look's units listed once per look in the view, V02 §6's), then `planDamage`; lazily per "
      "drawn plan, inside §12.5's frame budget; no plan derived for it |",
      1, 'G123-V03, G122-V03 budgets')
    E(H6,
      "Find's room reading and a plan edit's preview (§12.6)",
      "Find's room reading, the damage layer's reading (V03 §5.6) and a plan edit's preview (§12.6)",
      1, 'G123-V03 interaction')

    # ---------------- §7 ----------------
    E(H7,
      "a sewer-front dwelling and a ruin dwelling\n"
      "(T-V3-24). **Item 110's fixtures**:",
      "a sewer-front dwelling and a ruin dwelling\n"
      "(T-V3-24). **The damage fixtures** (T-V3-39, T-V3-40; read by volume 9's T-V9-86 and V12 §3.15.13): a house holding\n"
      "every element kind in each of `abandoned`, `decayed` and `ruined`, one restored with patches and a never-decayed\n"
      "control; a ruined church with its crypt; a town house re-let to lodgings and then left; a building generated ruined;\n"
      "a ruined row of three houses sharing party walls; a ruined deck shop; and a district of houses under a staged\n"
      "disaster `ConditionOverlay` (§2.7: its weeks and severity) and under a `disaster` preview. **Item 110's fixtures**:",
      1, 'G123-V03, G122-V03 fixtures')
    E(H7,
      "| T-V3-38 | Find at the interior band (item 120 (k)'s plan clauses; V03 §5.5), on",
      "| T-V3-38 | Find at the interior band (item 120 (k)'s plan clauses; V03 §5.5; takes T120-4's interior clause, (e)), on",
      1, 'R2-35 receiving end')
    E(H7,
      "and a building whose plan does not draw glows whole;",
      "and a building whose plan does not draw glows whole; a building whose plan is empty carries the chip's outline and "
      "halo on its outline, and a stale plan glows its cached rooms under §8.5's marker until its re-derivation lands, then "
      "the re-derived rooms;",
      1, 'VV34-r1-10 (d)')
    E(H7,
      "(e) after a `relet`, a `setRoomRole`, a re-cut, an undo, a regenerate and a load the glowing set equals a fresh "
      "reading,",
      "(e) T120-4's interior clause: after a `relet`, a `setRoomRole`, a re-cut, an undo, a redo, a regenerate, an advance "
      "of time, a load and a migration the glowing set equals a fresh reading,",
      1, 'VV34-r1-10 (e); R2-35 receiving end')
    E(H7,
      "| B-PLAN, B-CITY-lite and volume 9's app harness; at Find's landing (V03 §8) |",
      "| B-PLAN, B-CITY-lite and volume 9's app harness; at the later of P5 and M5, Find's milestone (V03 §8) |\n"
      + T39 + "\n" + T40,
      1, 'R2-32 receiving end; G123-V03 T-V3-39; G122-V03 T-V3-40')

    # ---------------- §8 ----------------
    E(H8,
      "| **P4 — the draw** | the building band's stops (§8.8) and the detail ladder, every mark of V03 §5.1 in `ink`, `lit`, "
      "`hatched` and the ink variants, `planWallShade`, labels, numbers, lights, the Works and ruin drawings, the underground "
      "band's plans; terraces, exterior flights, the stoop, the cistern and inlet mark, the deck's fall; the view cap | "
      "T-V3-14; §8.2's plan-draw row; V03 §6's view-cap row on the B-CITY METROPOLIS seeds; T-V3-36 (f) | 2.25–2.75 | P1; "
      "§8's building band (M2b); M6 (the decided order) |",
      "| **P4 — the draw** | the building band's stops (§8.8) and the detail ladder, every mark of V03 §5.1 in `ink`, `lit`, "
      "`hatched` and the ink variants, `planWallShade`, labels, numbers, lights, the Works drawing, the underground "
      "band's plans; terraces, exterior flights, the stoop, the cistern and inlet mark, the deck's fall; the view cap; "
      "**item 123's plan part, the step that draws a decayed or ruined plan**: the plan in force (V03 §3.11), `planDamage` "
      "and the drawing per state (V03 §5.6, V03 §5.1), the panel's damage lines and the `plan` section's damage rows "
      "(V03 §4.5, V03 §4.6), with item 122 (d)'s look in it | T-V3-14; §8.2's plan-draw row; V03 §6's view-cap row on the "
      "B-CITY METROPOLIS seeds; T-V3-36 (f); T-V3-39 but (e); T-V3-40 but (d) | 2.5–3.25 | P1; §8's building band (M2b); "
      "M6 (the decided order); §2.6 step 7, §6.3 and §8.6, which land with this step (§16); V06's decay level at M6-E "
      "(before it, V11's default age); for the look, item 122's base parts (M3b) and V01's `disasterDistricts` (M5) |",
      1, 'G123-V03, G122-V03 P4 (R2-36)')
    E(H8,
      "| **P5 — exports** | the JSON block (with `terraces`, entrance storeys, flights, `inlet`), SVG and PNG with the "
      "all-storeys sheet, `.dd2vtt` and Foundry per storey (terraces, landing portals, linked flights, roof levels), "
      "CityJSON storeys at their true elevations, units and rooms, glTF interiors | T28-19, T-V3-13, T-V3-29's export "
      "clause, T-V3-36 (o) | 1.75–2.25 |",
      "| **P5 — exports** | the JSON block (with `terraces`, entrance storeys, flights, `inlet`), SVG and PNG with the "
      "all-storeys sheet, `.dd2vtt` and Foundry per storey (terraces, landing portals, linked flights, roof levels), "
      "CityJSON storeys at their true elevations, units and rooms, glTF interiors; the damage in every format (V03 §5.2's "
      "`plan.damage`, V03 §5.3's scene walls, portals, lights and image and the JSON `damage`) | T28-19, T-V3-13, "
      "T-V3-29's export clause, T-V3-36 (o), T-V3-39 (e), T-V3-40 (d) | 2–2.5 |",
      1, 'G123-V03, G122-V03 P5')
    E(H8,
      "| **total** | | | **18.5–25.25** | |",
      "| **total** | | | **19–26** | |",
      1, 'G123-V03 total')
    E(H8,
      "lands with the later\n"
      "of P5 and the milestone that lands Find (V09 §8), inside P4's and P5's prices",
      "lands at the later\n"
      "of P5 and M5, Find's milestone (§16), inside P4's and P5's prices",
      1, 'R2-32 receiving end')
    E(H8,
      "records, two marks and one SVG group), its exit T-V3-38.",
      "records, two marks and one SVG group), its exit T-V3-38.\n"
      "\n"
      "**Items 122 and 123** (J-V3.140). Item 123's plan part — V03 §3.11's *Decay re-cuts no plan*, V03 §5.6's layer,\n"
      "V03 §5.1's drawing per state, the panel's lines and the `plan` section's rows — is the step that draws a decayed or\n"
      "ruined plan: it lands at P4, its exports at P5, priced inside them (+0.25–0.5 and +0.25 pw), with §2.6 step 7's,\n"
      "§6.3's and §8.6's base parts (§16); every building reads its existence state at V11's default age until V06's decay\n"
      "level lands at M6-E (V06 §3.23 (4)), and before P4 no plan carries the layer. Item 122 (d)'s look in the plan lands\n"
      "with it, drawing nothing until item 122's base parts (M3b) and V01's `disasterDistricts` (M5) stand.",
      1, 'G123-V03, G122-V03 landing (R2-36)')
    E(H8,
      "The remaining 2.3–9.05 pw of this volume's 18.5–25.25 pay for what parity does not\n"
      "ask:",
      "The remaining 2.8–9.8 pw of this volume's 19–26 pay for what parity does not\n"
      "ask:",
      1, 'G123-V03 parity remainder')
    E(H8,
      "and item 110's stacks, terraces, hillside exposure, decks and vaults (1.75–2.5 pw).",
      "and item 110's stacks, terraces, hillside exposure, decks and vaults (1.75–2.5 pw), and the damage layer of items\n"
      "122 and 123 (0.5–0.75 pw).",
      1, 'G123-V03 parity remainder')
    E(H8,
      "rung itself is §16's milestone **M6-P — the plan rung**, carrying P0–P6 and 17.75–24.25 pw of this volume's\n"
      "18.5–25.25 on the effort table's line",
      "rung itself is §16's milestone **M6-P — the plan rung**, carrying P0–P6 and 18.25–25 pw of this volume's\n"
      "19–26 on the effort table's line",
      1, 'G123-V03 M6-P line')

    # ---------------- §9 ----------------
    E(H9,
      "a great temple reaches its `cathedral` family row at A1 (3) as before, so the church row's `temple` key served no "
      "building. |",
      "a great temple reaches its `cathedral` family row at A1 (3) as before, so the church row's `temple` key served no "
      "building. |\n"
      "| J-V3.136 | Chose to make item 123's damage layer at the plan the parts V03 §2.2 already names, each with one of "
      "V11's kinds — wall runs split into `outerWall` and `partition`, floor areas into `groundFloor` (level 0 on the "
      "ground, a wing's first storey on a solid wing, and every storey below 0 with a storey under it) and `upperFloor`, the roof over a "
      "room no storeyed room lies above as its `roofBay`, doors with a leaf, windows, stair cores and choir flights, "
      "furniture, and below ground volume 4's five — read by one pure function, `planDamage`, that gives each element "
      "damaged, repaired or as built at the drawn and at the own level, with party walls, arches, hearths, columns, heads "
      "and the porch no elements, every roof bay of a wing a decay run leaves roofless damaged, and a building in a decay "
      "run lighting no room and naming no household, over minting damage ids or a stored damage record, damage by storey "
      "or by room, or party walls that fall, because item 123 (a)–(b) ask for the same plan with one keyed threshold per "
      "element and no new ids, a party wall holds up the house beside it (a ruin in a row never opens its neighbour's "
      "rooms), the base's roofless derelict state (`RoofSpec.kind 'none'`) must agree with the plan's ceilings and the "
      "exterior (item 123 (d); V02 §5.7), and nobody lights a lamp in a house nobody lives in (§8.4's lit windows already "
      "go dark). |\n"
      "| J-V3.137 | Chose, for a building in a decay run, the plan in force when its run began — a stored plan as stored; "
      "an unstored plan re-derived from its canonical prior at the occupant inputs it held the week before the run, read "
      "from the building's and its plot's history images and memoised per lineage, so it stays `current` through the run "
      "— and, for a building first met abandoned, decayed or ruined or whose week before the run a rebase condensed, its "
      "as-built plan, with the vacant programme kept for a standing building only, over re-cutting a decaying building to "
      "the vacant programme or re-deriving every decaying unstored plan as its as-built plan, because the owner asks that "
      "a plan already generated be \"amended rather than redrawn\" and that scrubbing history show one plan aging (item "
      "123 (a)): a town house re-let to lodgings and then left must decay as the lodgings it last was, and for a building "
      "never re-let the two readings give the same as-built plan (§2.6 step 7). |\n"
      "| J-V3.138 | Chose to export a ruined plan's damage as the view draws it in pictures (the SVG `plan.damage` group, "
      "the PNG) and as the model holds it in scenes and JSON — a `.dd2vtt` or Foundry scene's walls, portals and lights "
      "from the building's own decay level (a broken run or partition leaves line of sight, a broken door is a gap, a "
      "broken stair links no storey at or above level 0, a cellar or crypt wall stays a wall), its image at the drawn "
      "level, a disaster's look in the image only; the JSON block a `damage` member at the own level, absent when nothing "
      "is damaged or repaired; CityJSON and glTF the plan as built — over carrying the damage in every format or in none, "
      "because item 123 (e) asks battle maps to follow the damage, item 122 (f) keeps a look out of walls, portals and "
      "lights, a JSON reader without our rules needs the damaged set as it needs the derived flights, and CityJSON and "
      "glTF export the model's buildings, never a view at a week, as volumes 2 and 4 export theirs. |\n"
      "| J-V3.139 | Chose to draw a disaster's look in a plan at the level V02 §5.7 (1)'s rule gives the exterior — the "
      "higher of the building's own decay level and the look's `lookLevel` by severity, over the districts volumes 1 and 7 "
      "return, until volume 6's hand-over — with no patch, nothing stored and no row of the `plan` section (the look read "
      "tells it, the panel shows it), over a look level of the plan's own or patches a look leaves behind, because item "
      "123 (d) asks the inside and the outside to agree, item 122 (a) keeps a crisis a look whose aftermath is the epoch "
      "path's, and a look that left patches would draw a repair that never happened. |\n"
      "| J-V3.140 | Chose to land item 123's plan part — the plan in force, `planDamage`, the drawing per state, the panel's "
      "damage lines and the `plan` section's rows — at P4 as the step that draws a decayed or ruined plan, and its exports "
      "at P5, priced inside them at +0.25–0.5 and +0.25 pw (this volume's total 19–26 pw), item 122 (d)'s look landing "
      "with it once the look's base parts (M3b) and volume 1's districts (M5) stand, over a step of its own, because the "
      "layer is one pure reading over the plan P1 cuts, drawn by P4's program and written by P5's exporters, and the decay "
      "level reads V11's default age until volume 6's lands at M6-E, so no step waits on another unit's milestone. |",
      1, 'G123-V03, G122-V03 decisions')

    # ---------------- §11 ----------------
    E(H11,
      "(J-V3.47, J-V3.80 – J-V3.100, J-V3.130); a cistern inside a mole fort",
      "(J-V3.47, J-V3.80 – J-V3.100, J-V3.130), as is every choice items 122 (d)\n"
      "and 123 left (J-V3.136 – J-V3.140); a cistern inside a mole fort",
      1, 'G123-V03, G122-V03 owner questions')

    # ---------------- §12 ----------------
    E(H12,
      "and its cost, until T-V3-38 and P4's visual bars run.",
      "and its cost, until T-V3-38 and P4's visual bars run; that the damage layer's states read as item 123 (c)'s\n"
      "looks at the building band (the stops each damaged form joins at, party walls kept, the porch going with its wall, a\n"
      "ruin unlit), that the frozen inputs' history read stays inside V03 §6's row, and the 0.5–0.75 pw of items 122 and 123,\n"
      "until T-V3-39, T-V3-40 and P4's visual bars run.",
      1, 'G123-V03 plausible')
    E(H12,
      "a hall raised over an undercroft on wet ground) are general\n"
      "knowledge",
      "a hall raised over an undercroft on wet ground, party walls outlasting a ruined house in a row, floors and roofs\n"
      "going before outer walls) are general\n"
      "knowledge",
      1, 'G123-V03 plausible')

    # ---------------- §13 ----------------
    E(H13,
      "| the other end: V09 §4.9's family table; V09's Find panel and `live.find` |",
      "| the other end: V09 §4.9's family table; V09's Find panel and `live.find` |\n"
      "| V02 | the damage layer's roof bays over rooms and outer wall runs with their states at the drawn level "
      "(`planDamage`, V03 §5.6), every roof bay of a wing a decay run leaves roofless damaged; one level for the plan and "
      "the exterior by V02 §5.7 (1)'s rule | the other end: V02 §5.7 (1)–(2), T-V2-59 |\n"
      "| V09, V10 | the panel's damage lines laid out from `PlanDamage` (V03 §4.5); the `plan` section's damage rows "
      "(V03 §4.6) | the other end: V09 §4.21.13, V09 §4.9, V10 §3.9a |",
      1, 'G123-V03 hand-offs made here')
    E(H13,
      "| V11 (VAP-21), V12 | `exposureAllStoreys`'s preset entries false; T-V3-34's first clause the `item110.*` `NoOpPin` "
      "on V12 §3.7.8's engine | V03 §2.4; T-V3-34 |",
      "| V11 (VAP-21), V12 | `exposureAllStoreys`'s preset entries false; T-V3-34's first clause the `item110.*` `NoOpPin` "
      "on V12 §3.7.8's engine | V03 §2.4; T-V3-34 |\n"
      "| V02 (X34) | the damage layer's two element kinds V02 reads — each roof bay over a room and each outer wall run — "
      "intact, damaged or repaired at a level; a roofless building's roof bays all damaged | V03 §5.6 (1)–(2); "
      "T-V3-39 (b) |\n"
      "| V04 (G123-V04) | a storey below 0 drawn by V04 §5.6's kinds and rules — the stair below 0 climbable rubble, the "
      "lowest floor never failing — and exported in V03's per-storey scene by V04 §5.6 (5) | V03 §5.1, V03 §5.3, "
      "V03 §5.6 (1) |\n"
      "| V09 (G123-V09) | the panel's damage lines are V09 §4.21.13's, worded by `info.damage.*`; V03 lays them out | "
      "V03 §4.5 |\n"
      "| V10 (CVR-V10-21) | the `plan` section's item-123 damage rows as V10 §3.9a lists them; V03 §8 names its item-123 "
      "step | V03 §4.6, V03 §8 |\n"
      "| rendering (G123-rendering) | V03 §5.1 draws §8.6's damaged forms, citing them | V03 §5.1 |",
      1, 'G123-V03 hand-offs closed here')
