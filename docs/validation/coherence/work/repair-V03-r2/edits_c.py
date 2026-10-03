# edits_c — V03 §5.1, §5.2, §5.3, §5.4 and the new §5.6 (APPEND TO SECTION ## 5).
H5 = '## 5 Rendering, labels, exports'
H51 = '### 5.1 The plan at the building band'
H52 = '### 5.2 Picture exports'
H53 = '### 5.3 Interchange and scene exports'
H54 = '### 5.4 Concealment at a public key'


S56 = """### 5.6 The damage layer — a decayed or ruined plan, and a disaster's look in it (items 123, 122 (d); J-V3.136 – J-V3.139)

A building's plan is the one it was built with, or last lived in, and decay never re-cuts it (V03 §3.11's *Decay
re-cuts no plan*). What decay changes is item 123's **damage layer** over that plan — §2.6 step 7's mechanism, each
element's one threshold §6.3's `plan.damage`, the building's decay level V06 §3.23's — and while a disaster's look
stands over the building's district, the same layer at the look's level (item 122 (d)). This section is the plan's part:
its elements and their kinds, their states, the look, knowledge, who lives there, the panel and the why; the drawing per
state is V03 §5.1's with §8.6's damaged forms, the exports V03 §5.2's and V03 §5.3's, below ground V04 §5.6's rules. It
is a drawing only: no room, wall, opening or id changes, nothing is stored, and no plan, cache chunk, `PlanReport`,
digest or hash moves.

**(1) The elements and their kinds.** Every damage element is a part V03 §2.2 already names, keyed with its kind (§6.3:
the kind and the part's id as structured components; no id minted). The kinds are V11 §2.8d's `DamageElementKind`, each
kind's range of the decay level V11 §3.25.10's `damage.elements`; this volume gives each plan element its kind, and
below level 0 V04 §5.6's `belowKind` gives five kinds of its own:

| kind | the elements | id |
|---|---|---|
| `outerWall` | each wall run with the outside on one face — an `exterior` or `court` wall — on a storey at or above level 0 | its `wall:` id |
| `partition` | each `partition` wall run | its `wall:` id |
| `groundFloor` | the floor area of each room at level 0 of a wing on the ground, of each room on the first storey of a wing standing on a solid wing (V03 §3.3's `s₀(w)`), and of each room below level 0 with a storey under it — the lowest storey's floor lies on the earth and is no element (V04 §5.6 (2)) | the room's address |
| `upperFloor` | the floor area of every other room: one over a storeyed level, or an open one, of its building | the room's address |
| `roofBay` | the roof over each room that no storeyed room of its building lies above, pitched or flat, a terrace's included | the room's address |
| `door` | each opening with a leaf — a door, a unit entry, an entrance's door, a trapdoor or a hatch (V03 §3.6, V03 §3.7) | its `op:` id |
| `window` | each window, `light` and slit (V03 §3.6 W1–W3) | its `win:` id |
| `stair` | each stair core, the crypt stairs among them, and each choir flight (a room of role `stair`, V03 §3.7.6) | its `core:` id; a flight by its room's address |
| `furniture` | each furniture item (V03 §3.8) | its `furn:` id |
| `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb` | below level 0, by V04 §5.6 (2)'s `belowKind` | V04 §5.6 (2)'s |

An underground building (V03 §3.12) takes these kinds by the same rules, its runs on its part's rock V04's `cellarWall`,
and reads its own lineage's level (V04 §5.6 (1)). A `party` wall is no element: it stands while the building beside it
does, so a ruin in a row never opens its neighbour's rooms. An arch or an open doorway (no leaf), a hearth and its stack,
a column, an access head (its state is its access's, V03 §3.7.2 (7); V04 §5.6 (4)), the porch, the exterior flights
(volume 2's) and the derived terraces are no elements either; the porch and a terrace draw by (3)'s rules.

**(2) The states — one comparison.** `planDamage` gives each element of the drawn plan its state:
```ts
// @plat/buildings (V03 §5.6; items 123, 122 (d)): the drawn plan's damage at the view's week; derived at read, never stored
interface PlanElementRef { kind: DamageElementKind /* V11 §2.8d */; id: string /* (1)'s id column */ }
interface PlanDamage {
  level: number;                 // the drawn level, by V02 §5.7 (1)'s rule: the higher of V06's decayLevel at the drawn week and the level of
                                 // a disaster look over the building (§10.2's lookLevel at its severity); 0 with neither
  own: number;                   // V06's decayLevel(doc, lineage, week) alone; 0 for a building in no decay run
  look: ExteriorDamage['look'];  // V02 §2.4's: the condition (null for a preview) and the calamity's type; null with no look
  damaged: PlanElementRef[];     // at `level`, in plan order: by storey, then V03 §2.2's order within it
  ownDamaged: PlanElementRef[];  // at `own`: a subset of `damaged`
  repaired: PlanElementRef[];    // (b) and (c): not in `ownDamaged`, drawn in patch material where not in `damaged`
}
declare function planDamage(doc: Document, b: Building, plan: Plan, view: ViewState, opts: ViewOpts): PlanDamage;
```
* **(a) Damaged** — an element whose threshold t (§6.3) the level reaches: the level above 0 and at least t, the one
  comparison every reader makes (§2.6 step 7). A level of 0 damages nothing, so a building never decayed and under no
  look draws its plan unchanged (`item123.damage`). Damage only accumulates as the level rises and never moves: a higher
  level's damaged set contains a lower's (T123-2).
* **(b) Repaired** — a restoration lowers the own level (V06 §3.23 (3)) and the damage leaves in reverse threshold
  order, the highest first; an element whose threshold lies above the own level and at or below `decayPeak` is drawn
  repaired, in item 114's patch material (§8.6), until the plan itself changes (a rebuild, a demolition, a successor on
  the trace). A look leaves no patch: `decayPeak` never reads a look (V02 §5.7 (4)), so an element only the look damaged
  draws as built again from the week the look no longer stands over the building.
* **(c) Roofless** — in a decay run, while a wing's roof kind is `none` (§2.6's `RoofSpec`: the derelict state the
  decline ladder sets, kept through ruin; a fire's charred shell), every roof bay over a room of that wing is damaged
  whatever its threshold, so the plan's open ceilings are the missing roof the exterior draws (V02 §5.7 (2); T123-5);
  once the run has reached `decayed`, each such bay counts as reached for (b), so a restoration that roofs the wing
  again draws it repaired while the level lies below its threshold. The state only climbs while the run lasts
  (V06 §3.23 (1)), so (a)'s nesting holds; a standing wing an author roofed `none` keeps its plan unchanged.
* **(d) Which level each reader reads** — `level` for the drawing, the picture exports, the panel's lines and a scene's
  image; `own` for what the model holds: a scene's walls, portals and lights (V03 §5.3), the JSON block's `damage` and
  the `plan` section's rows (V03 §4.6); `repaired` from `own` alone. The week is the drawn week of the view or the export
  (§2.9's `week`; a scrubbed frame's, V06 §3.15.2), so scrubbing history shows one plan aging (item 123 (a)).

**(3) Drawn** by V03 §5.1 at the building band — each damaged element in §8.6's damaged form for its kind, the states'
looks, the unsafe rooms, the porch and terraces, the storey switcher — exported by V03 §5.2 and V03 §5.3, and below
ground by V04 §5.6 (3); a building whose plan does not draw shows its damage on its exterior only (V02 §5.7).

**(4) A disaster's look** (item 122 (d); J-V3.139). A building over which a disaster's look stands — by V02 §5.7 (1)'s
reading: its `ConditionOverlay` standing in the view's week (§2.7's reader rule), its map row `disaster` (§7.7's DR44),
admitted by the view's key, `crises` in `follow`, or a `disaster` preview at §10.2's `previewSeverity`; the building in a
district V01's `disasterDistricts` returns, or at THORP, HAMLET and VILLAGE in an end of V07's; not yet handed over
(V06 §3.22 (3)'s `crisisLookYields`; V02 §5.7 (6)) — draws its plan's damage layer at the look's `lookLevel` by
severity, or at its own level where that is higher (`PlanDamage.level`), on every element. It is a look: it derives no
plan (a click or `elaborate: 'view'` does, V03 §4.5), stores nothing, and leaves the plan's ids, its `PlanReport`, its
cache chunk and every digest unchanged; a scene draws it in its image only, never as walls, portals or lights (item 122
(f); V03 §5.3); the JSON block and the `plan` section's rows never carry it; a lived-in building under it keeps its
households and lights ((6)). It shows exactly in the condition's weeks: the view's week leaving them, Show crises off, a
key that withholds the condition or the hand-over draws the building at its own level again. What the disaster leaves
reaches the plan only by the epoch path (V06 §3.22 (1)): a building the aftermath really ruins enters a decay run
(V03 §3.11) and draws its own level from that epoch's week, the look's ruling only while it is the higher.

**(5) Knowledge** (V03 §5.4). At a key that does not admit a concealed use, the layer follows V03 §5.4's merge: a merged
room draws the floor and roof-bay states of the public room it merged into over its whole merged ring and nothing of
the concealed rooms' own elements (their partitions, floors, roof bays and furniture), so no hole, spill or patch
outlines a concealed room; a concealed opening drawn as wall takes the state of its wall run; a concealed head stays
absent. A condition the key withholds draws no look ((4)).

**(6) Who lives there.** A building `abandoned`, `decayed` or `ruined` houses nobody: its unit rooms keep their scope and
ids (the plan as last lived in) but name no household — on a label, in the panel or in a scene's journal — and its rooms
draw and export no room light (V03 §1b's derived `lit`), as §8.4's lit windows go dark when no household lives there; the
event that restores it houses and lights them again. A look changes neither.

**(7) The panel and the why** (item 123 (e)). The plan panel shows volume 9's damage lines (V09 §4.21.13; their words
V09 §4.9's `info.damage.*`) from `PlanDamage` at the drawn level, laid out by V03 §4.5; the `plan` section's damage rows
(V10 §3.9a's table) are V03 §4.6's, at the own level. One reading feeds both, so the panel, the why card and the clerk
say the same thing in the same words ("roof fallen in over the hall; the upper floor is gone"; V09 §4.21.13 (4)).

**(8) Lifecycle, edges, cost, bars, landing.** Derived per read, never stored (V03 §2.5's row): a save, load, undo, redo,
regenerate and migrate re-read it from the restored records at the drawn week, an undone epoch's events gone
(V06 §3.23 (6)). Its edges are V03 §3.13's rows, its cost V03 §6's row, its bars T-V3-39 (item 123) and T-V3-40 (the
look). It lands at P4, its exports at P5 (V03 §8); until V06's level lands (M6-E) every building reads its existence
state at V11's default age (V06 §3.23 (4)), and before P4 no plan carries the layer."""


def add(E, A):
    # ---------------- §5.1 ----------------
    E(H51,
      "room labels, numbers and lights\n"
      "(§8.5, in §9.4's room-label range)",
      "room labels, numbers and lights\n"
      "(§8.5, in §9.4's room-label range; no room light in a building in a decay run, V03 §5.6 (6))",
      1, 'G123-V03 lights')
    E(H51,
      "a unit room adds the household's name in a second line when the viewer's knowledge admits it,\n"
      "in the same range and dropped when it does not fit;",
      "a unit room adds the household's name in a second line when the viewer's knowledge admits it\n"
      "and a household lives there (none in a decay run, V03 §5.6 (6)), in the same range and dropped when it does not fit;",
      1, 'G123-V03 labels')
    E(H51,
      "(one label per room inside\n"
      "its ring or none, §8.3's plan-draw row).",
      "(one label per room inside\n"
      "its ring or none, §8.3's plan-draw row). A room §8.6 marks unsafe (V03 §5.6) is unlabelled, its number kept in the\n"
      "panel's key table where `roomNumbers` is on.",
      1, 'G123-V03 unsafe labels')
    E(H51,
      "**The plan in progress and in ruin** (item 67): walls without doors, windows or furniture up to the storey `heightsAt`\n"
      "has raised; a `decayed` or `ruined` building's fallen walls as broken ink runs over rubble stipple and open rooms without\n"
      "labels — both drawings of the same plan (§2.6 step 7, §8.6), the crypt's ring included (a ruined church keeps its crypt).\n"
      "**A deck's fall** (item 110 (d)): a deck building that the base ruins with its deck draws its ruined plan where the deck\n"
      "stands in ruin (its piers or arches left) and nothing where the deck is removed;",
      "**The plan in progress** (item 67): walls without doors, windows or furniture up to the storey `heightsAt` has\n"
      "raised — a drawing of the same plan (§2.6 step 7, §8.6); a `decay` or `repair` Works draws no build stage over the\n"
      "plan, its drawing being the damage layer at the building's level (§2.6 step 7).\n"
      "**The plan in ruin** (item 123 (c); J-V3.136). A building `abandoned`, `decayed` or `ruined`, one restored with\n"
      "patches and one a disaster's look ruins (item 122 (d)) draw the plan in force (V03 §3.11) under the damage layer\n"
      "(V03 §5.6): each element `PlanDamage` gives damaged in §8.6's damaged form for its kind among the marks above, in their\n"
      "order, each repaired one in §8.6's patch material, every other as built — every room, wall, opening and id unchanged.\n"
      "**Per state** (item 123 (c)), from where V11's ranges place the thresholds: `abandoned` — dust and debris over the\n"
      "floors, furniture broken, doors off their hinges, windows broken; `decayed` — floors rotten in patches and holed,\n"
      "partitions down, roofs open to the sky over their rooms, the rooms §8.6 marks unsafe; `ruined` — outer walls broken\n"
      "over their rubble, the upper storeys mostly floorless (fragments over the holes), the ground storey the only one left\n"
      "to walk; below level 0 the cellars and the crypt partly collapse by their own thresholds, the crypt's rooms and ways\n"
      "kept — a ruined church keeps its crypt (V04 §5.6 (2)–(3)).\n"
      "A damaged stair core draws §8.6's broken flights on the storeys at or above level 0 (no way up) and V04 §5.6 (3)'s\n"
      "climbable rubble below them; "
      "the porch outline is drawn only while the outer wall run carrying the main entrance stands (as V02 §5.7 (2) draws the\n"
      "porch); a walkable terrace over a damaged roof bay draws that bay's part as §8.6's floor hole. **By stop** (the detail\n"
      "ladder above): wall gaps, floor holes, open roof bays and the unsafe crosses from the threshold; the door, window and\n"
      "stair forms, the rubble spills and the patch material from `leavesStop`; the furniture fragments from `treadsStop`.\n"
      "**The storey switcher** keeps every storey, the levels unchanged (V03 §4.5).\n"
      "**A deck's fall** (item 110 (d)): a deck building that the base ruins with its deck draws its plan under the damage\n"
      "layer where the deck stands in ruin (its piers or arches left) and nothing where the deck is removed;",
      1, 'G123-V03, G122-V03 drawing per state (rendering hand-off: cite §8.6)')

    # ---------------- §5.2 ----------------
    E(H52,
      "and with Find on\n"
      "`plan.find` (V03 §5.5), with the\n"
      "`<metadata>` map to room, wall, opening, head and furniture ids (§11.1's convention).",
      "and with Find on\n"
      "`plan.find` (V03 §5.5); with a damaged or repaired element, `plan.damage` (V03 §5.6: the rubble spills, floor holes,\n"
      "open roof bays, unsafe crosses and patch material, each element's own broken form staying in its group — a run's gap in\n"
      "`plan.walls`, a door's open gap in `plan.openings`, a flight's break in `plan.stairs`, a piece's fragments in\n"
      "`plan.furniture`), absent when nothing is damaged or repaired, so a building never decayed exports byte-identically;\n"
      "with the `<metadata>` map to room, wall, opening, head and furniture ids (§11.1's convention), each damaged or\n"
      "repaired element named with its kind and state.",
      1, 'G123-V03 SVG')
    E(H52,
      "A picture export derives the plan as the `plan` query does (V03 §4.6); an empty\n"
      "plan",
      "A picture export derives the plan as the `plan` query does (V03 §4.6) and draws its damage at the\n"
      "export's drawn week and key as the view does, a disaster's look included (item 122 (f)); an empty\n"
      "plan",
      1, 'G123-V03, G122-V03 picture exports')

    # ---------------- §5.3 ----------------
    E(H53,
      "and the plan's `report` (V03 §2.3). Knowledge-filtered by V03 §5.4",
      "and the plan's `report` (V03 §2.3); where the\n"
      "  building's own decay level is above 0 or an element is repaired, `damage: { week, state: Existence, level /* the\n"
      "  own level */, damaged: PlanElementRef[], repaired: PlanElementRef[] }` (V03 §5.6 (2): `ownDamaged` and `repaired`\n"
      "  at the export's drawn week) — derived, never a disaster's look and never read back (a load re-derives it), absent\n"
      "  otherwise, so a never-decayed building's block is unchanged. Knowledge-filtered by V03 §5.4",
      1, 'G123-V03 JSON damage')
    E(H53,
      "(`objects_line_of_sight` empty, §11.1). **Item 110**:",
      "(`objects_line_of_sight` empty, §11.1). **Damage** (item 123 (e); V03 §5.6): `line_of_sight` leaves out every wall\n"
      "  run and partition the own level breaks (`ownDamaged`) — a fallen run leaves line of sight — and keeps every\n"
      "  `cellarWall` and `cryptWall` run (partly collapsed, still a wall; V04 §5.6 (2)); a door the own level breaks writes\n"
      "  no portal (a doorless opening is a gap); a broken stair core writes no portal between storeys at or above level 0,\n"
      "  its flights below level 0 climbable rubble that stays a portal (V04 §5.6 (3)); a broken window is written as every\n"
      "  window is; floor holes, rubble, debris and patches are in the image only, never walls; the image draws the drawn\n"
      "  level, a disaster's look in it only (item 122 (f)), the walls, portals and lights being the own level's; a building in\n"
      "  a decay run writes no room light (V03 §5.6 (6)). **Item 110**:",
      1, 'G123-V03, G122-V03 .dd2vtt')
    E(H53,
      "with role, area, the household where admitted and the\n"
      "  ways down it holds.",
      "with role, area, the household where admitted and the\n"
      "  ways down it holds. Damage as in the `.dd2vtt` scene: no wall segment along a run or partition the own level\n"
      "  breaks, a `cellarWall` or `cryptWall` run a wall, a broken door none (a gap), the stair notes only between the\n"
      "  storeys the core still links, the same image and lights; in a decay run the journal names no household.",
      1, 'G123-V03 Foundry')
    E(H53,
      "columns as prisms; nodes named by room, wall and head ids.",
      "columns as prisms; nodes named by room, wall and head ids.\n"
      "  Neither CityJSON nor glTF carries V03 §5.6's damage: they export the plan as built, never a view at a week, as\n"
      "  volumes 2 and 4 export their buildings (J-V3.138).",
      1, 'G123-V03 CityJSON glTF')

    # ---------------- §5.4 ----------------
    E(H54,
      "For an admitting key\n"
      "everything draws as derived.",
      "For an admitting key\n"
      "everything draws as derived. The damage layer follows the same merge (V03 §5.6 (5)).",
      1, 'G123-V03 knowledge')

    # ---------------- new §5.6 ----------------
    A(H5, S56, 'G123-V03, G122-V03 new §5.6')
