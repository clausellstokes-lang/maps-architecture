# edits_b — V03 §3.2, §3.4, §3.7, §3.13, §4.2, §4.4, §4.5, §4.6, §5.2 and the new §5.5 (an APPEND to ## 5).
H32 = '### 3.2 A — the programme'
H34 = '### 3.4 Seed pieces per storey'
H37 = '### 3.7 Basements, the crypt and the heads of the ways down'
H313 = '### 3.13 Edges at their limits (principle (11))'
H42 = '### 4.2 The edits the plan needs, each with its semantics and its bend'
H44 = '### 4.4 What is not an edit'
H45 = '### 4.5 The click, the storey switcher and the plan panel — the viewer\'s experience'
H46 = '### 4.6 The clerk\'s view — plan queries and "why?"'
H52 = '### 5.2 Picture exports'
H5 = '## 5 Rendering, labels, exports'

S55 = """### 5.5 Find at the interior band (item 120, the plan's part; J-V3.134)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the Show
gaps switch), outside the document, its hash and the log; this section reads it and writes nothing, and no plan, cache
chunk or report changes with it. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay are
volume 9's; the veil, outline, halo, pin and count-bubble rows §8.2's; the matches §11.2's gazetteer rows at the view's
effective key, under knowledge admission (item 120 (h)). Item 120 (f)'s **interior band** is, for each building, the
building band at the stops where its plan draws (V03 §5.1: a clicked building's plan, or under `elaborate: 'view'` from
`planStop`): there a match's glow moves from the building's footprint to the rooms it uses.

**(1) The rooms a match uses** — `findRooms`, a pure reading of the plan as drawn (stored, else the cache), never stored:
```ts
// @plat/buildings (V03 §5.5; item 120): the rooms of building b's drawn plan that a Find match uses, by storey; [] when none
declare function findRooms(plan: Plan, b: Building, target: { kind: 'use'|'subLocation'|'household'|'building'; id: Id }): { storey: number; rooms: Id[] }[];
```
* **a use** b holds (a kind chip whose class is the use's, a named institution, the work of a person's chip through
  volume 9's Where is): the rooms that use's programme made — `Room.program` of origin `programme` (A2 (4); in a split
  pair its half's rows only, item 105 (h), so a brewer's works glows its brewhouse and its shop the taproom), `sleepIn`
  (A2 (3b)), `subLocation` (A2 (5)) and `crypt` (A2 (9): a church's crypt and its undercroft) — and, where b houses no
  household (the shell is the use's), its `declared`, `access` and `composer` rooms too; for a concealed use, at a key
  admitting it only, A2 (6)'s rooms for that use (by its place in A2 (6)'s per-use order);
* **a sub-location** (a custom service inside its provider, item 104 (h) (5)): the rooms whose `Room.subLocation` it is;
* **a household** (a person's home through Where is): its unit's rooms (`Room.unit`);
* **b itself** (a kind chip whose class is b's own and no use's — a manor, a town house — or a named place that is a
  building): every room.

A `circulation` room glows for none of them, and the households' rooms — their units (A2 (1), (1′)), shared rooms (A2 (2))
and the owners' staff rooms (A2 (3)) — never for a use. At a public key the reading follows V03 §5.4's merge: a merged
room glows as its public reading where its public part is used, so no glow outlines a concealed room or hints at one.

**(2) The look** (item 120 (e); item 112's second cue). On the storey shown, the rooms a chip's match uses lie above the
veil at full strength with their labels (V03 §5.1), and §8.2's outline and halo in the chip's colour and dash run along
the outline of their union — one outline round adjacent rooms, none along the walls between them: the plan's `Wall`s
whose two sides differ (a room the match uses against another room or the outside), read from its wall records with no
boolean; the rest of the plan lies under the veil. A room two chips match glows as §8.2 draws a match two chips share.
Where the shown storey holds none of the match's rooms — they lie on another storey, or the plan holds none (a building of the use's plot it does not
work in, such as a smith's separate house; an empty plan; a use whose programme rooms the fit ladder dropped, V03 §3.9) —
the building's outline carries the chip's outline and halo above the veil, the building itself under it, so a match is
never lost; the storey switcher marks every storey that holds one of the rooms with the chip's glyph, its accessible name
gaining "{n} found" (V03 §4.5), and the plan panel marks each such room in its room list with the same glyph. A matched
building whose plan does not draw at the view's stop (absent, or coarser than its stops) glows whole by §8.2's
building-band row. Find never derives a plan: a click or `elaborate: 'view'` does (V03 §4.5).

**(3) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, advance of time and season change
re-evaluates the chips at once, and the glow reads the plan as drawn — a stale plan's cached rooms under §8.5's marker
until its re-derivation lands, a re-cut plan's rooms at once — so a room a `relet`, a `setRoomRole`, a declared room or a
re-cut gives the use glows as it appears and one it takes away goes dark. The glow holds across storey switches and the
building band's stops; a building below ground (V03 §3.12) glows on its plan at the underground band (V03 §5.1), its ghost
pin on another layer being volume 4's part of item 120.

**(4) Exports** (item 120 (i)). A picture export of a plan (V03 §5.2) draws Find as the view shows it — the veil, each
chip's outline and halo on the rooms it uses, the chips in the sheet's legend (§11.1) — in the SVG group `plan.find`,
absent with Find off, so the file then equals the Find-less export; a `.dd2vtt` or Foundry scene (V03 §5.3) leaves Find
off unless the export asks for it, and then carries it in the scene's image only, never in its walls, portals or lights;
the JSON `plan` block, CityJSON and glTF never carry it (a view, never the model).

**(5) Cost** (item 120 (j)). An interaction, not a one-time wait (item 119 (d)): `findRooms` is O(rooms + walls) per drawn
plan over the stored or cached plan, for at most `view.planCap` plans per view and the clicked ones (V03 §6's Find row), inside
item 120 (j)'s glow of about 100 ms (§12.5's overlay budget); a chip change redraws no plan tile and rewrites no
`DisplayDelta` or cache chunk (T-V3-38)."""


def add(E, A):
    # ---------------- §3.2 ----------------
    E(H32,
      "along the field value between the centres of the two bands it lies between (§4.5's centres); discrete cells switch at\n"
      "the cut.",
      "along the field value between the centres of the two bands it lies between (§4.5's centres); discrete cells read §4.5's\n"
      "discrete-cell rule (a band without a row reads the nearest rowed band below), so they switch at the lower cut of the next\n"
      "rowed band above.",
      1, 'hand-off pipeline VAF-R0S-20')

    # ---------------- §3.4 ----------------
    E(H34,
      "a seed piece the kernel refuses (zero area, below `minEdge`, non-simple after the\n"
      "clip — §3.1's `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE`) is left out",
      "a seed piece the kernel refuses (zero area, below `minEdge`, non-simple after the\n"
      "clip — `E_DEGENERATE` with detail `seed`, or `overlap` for a piece left with a hole, §3.4) is left out",
      1, 'VK0-15')

    # ---------------- §3.7 ----------------
    E(H37,
      "the `RetainingWall`s with volume 1's\n"
      "  `stepProfile(wall)` (V01 §3.11 (7)) and `levelledGroundCm(doc, key, p)`",
      "the `RetainingWall`s with §2.7's\n"
      "  `stepProfile(wall)` (file f item 245) and `levelledGroundCm(doc, key, p)`",
      1, 'VAF-R0S-28')
    E(H37,
      "(V03 §2.1) is `stackAccessDoor(b, a)` below",
      "(§2.6's `AccessHead`) is `stackAccessDoor(b, a)` below",
      1, 'hand-off model VAF-R0S-03')

    # ---------------- §3.13 ----------------
    E(H313,
      "Degenerate geometry is refused by the kernel (§3.1's `E_DEGENERATE`,\n"
      "`E_BELOW_MIN_EDGE`, `E_NON_SIMPLE`) and handled on F-PLAN's ladder",
      "Degenerate geometry is refused by the kernel (§3.1's `E_DEGENERATE` with its §3.4 details on\n"
      "the transient arena, `E_INVARIANT` for a §3.10 row) and handled on F-PLAN's ladder",
      1, 'VK0-15')
    E(H313,
      "| the edits (V03 §4.1, V03 §4.2) | save, load, undo, redo, regenerate, migrate; geometry the kernel refuses | V03 §2.5's rows; V03 §4.2's degenerate bend (for a crypt ring, the ring step 2 derives), never refused, never partly committed | repair locally | T-V3-11, T-V3-36 (k) |\n",
      "| the edits (V03 §4.1, V03 §4.2) | save, load, undo, redo, regenerate, migrate; geometry the kernel refuses; an edit that would leave a room unreached | V03 §2.5's rows; V03 §4.2's degenerate bend (for a crypt ring, the ring step 2 derives) and reach bend (`bend.room.unreachable`), never refused, never partly committed | repair locally | T-V3-11, T-V3-36 (k) |\n",
      1, 'hand-off determinism VDC0-11')
    E(H313,
      "| concealment (V03 §5.4) | one concealed room; a storey whose every room is concealed | V03 §5.4 | none (no failure) | T-V3-12, T-V3-14, T-V3-36 (p) |\n",
      "| concealment (V03 §5.4) | one concealed room; a storey whose every room is concealed | V03 §5.4 | none (no failure) | T-V3-12, T-V3-14, T-V3-36 (p) |\n"
      "| Find at the interior band (V03 §5.5) | no chip; one chip and twelve; a match whose rooms lie on another storey only or on none; a plan absent, stale, stored or empty; a concealed use at a public key; save, load, undo, redo, regenerate | V03 §5.5 (1)–(3): where the shown storey holds none of the match's rooms the building's outline glowing and the switcher marking the storeys that do; where the plan does not draw the building glowing whole; no concealed room glowing at a key that withholds it; nothing saved, the view key outside the document | none (no failure) | T-V3-38 |\n"
      "| the plan's one-time waits (V03 §6) | a dossier change reaching many stored plans; the largest export; a migration at the metropolis cap | inside the comfort level (V03 §6); a wait past it completes and is reported (§12.1), never answered by a coarser plan (§12.7) | report | T-V3-37 |\n",
      1, 'G120-V03, VV34-01')

    # ---------------- §4.2 ----------------
    E(H42,
      "whose sill clears it, else to the nearest wall that has one, named.\n",
      "whose sill clears it, else to the nearest wall that has one, named.\n"
      "* **Reach** (item 28 (f); §7.1's outcome row `bend.room.unreachable`) — a `setOpening`, `moveWall`, `splitRoom`,\n"
      "  `mergeRooms` or `moveStairCore`, or a `setRoomUnit`, that would leave a room the main entrance no longer reaches through\n"
      "  O2's tree (V03 §3.6) is bent to the nearest lawful form that keeps every room reached: a door the edit removes or moves\n"
      "  is kept where it was, or moved to the nearest wall of the cut-off room whose other side reaches circulation (O3's width\n"
      "  and hinge for its kind, O2's forbidden edges kept), named (\"kept the door: the store has no other way in\").\n",
      1, 'hand-off determinism VDC0-11')

    # ---------------- §4.4 ----------------
    E(H44,
      "Clicking a building, switching storeys, opening the plan panel, turning room numbers on (the `roomNumbers` view key) and\n"
      "a clerk's plan or why query log nothing",
      "Clicking a building, switching storeys, opening the plan panel, turning room numbers on (the `roomNumbers` view key),\n"
      "setting Find's chips (the view key `find`, V03 §5.5) and a clerk's plan or why query log nothing",
      1, 'G120-V03')

    # ---------------- §4.5 ----------------
    E(H45,
      "the view key `storey` (§2.9) holds it per viewer.\n",
      "the view key `storey` (§2.9) holds it per viewer. With Find on (item 120), every storey holding a room a match uses\n"
      "  carries its chip's glyph (V03 §5.5).\n",
      1, 'G120-V03')
    E(H45,
      "(`solidMonument`; its crypt\n"
      "  under the crypt line), \"tier 3 cannot be reached: no stair arrives there\" (`W_TIER_UNREACHED`), \"stands on the bridge:\n"
      "  no cellar and no well\" (a deck), \"fell with the bridge\" (or pier, mole, quay) for a building whose deck is ruined or\n",
      "(`solidMonument`; its crypt\n"
      "  under the crypt line), \"stands on the bridge: no cellar and no well\" (a deck), \"fell with the bridge\" (or pier, mole,\n"
      "  quay) for a building whose deck is ruined or\n",
      1, 'VV34-09')
    E(H45,
      "\"built into an arch of the viaduct\" (a grade face). **Room numbers** (J-V3.59):",
      "\"built into an arch of the viaduct\" (a grade face); **the plan's warnings** —\n"
      "  one line per `PlanReport.warnings` entry (V03 §2.3), each the `en` text of the key `report.plan.<code>` of volume 9's\n"
      "  catalogue (V09 §4.9), written here, its slots filled from the entry's `wing`, `entrance` and `access` as the panel names\n"
      "  them (the switcher's wing names, the entrance's role, the head's kind): `W_TIER_UNREACHED` \"{tier} cannot be reached:\n"
      "  no stair arrives there\"; `W_STOREY_RUN` \"{wing} is too low for its storeys: planned solid, its rooms moved to the other\n"
      "  wings\"; `W_ENTRANCE_NO_STOREY` \"the {role} door meets no floor: left out\"; `W_STACK_ACCESS` \"no cellar under the\n"
      "  tiers: the way down is entered by a door in the outer wall\"; `W_DECK_ACCESS` \"stands on a deck: a way down here is\n"
      "  only a hatch in the floor, and a well only its mark on the map\"; `W_GRADE_FACE_TUNNEL` \"the door in the arch opens\n"
      "  onto the ground under the span, not a tunnel\"; `W_CHURCH_CATACOMB_HEAD` \"a catacomb stair handed to this church\n"
      "  stands in a store: a church reaches the catacomb only through its crypt\". **Room numbers** (J-V3.59):",
      1, 'VV34-09')
    E(H45,
      "Every edit tool of V03 §4.1 acts from the\n"
      "  panel or on the canvas.\n",
      "Every edit tool of V03 §4.1 acts from the\n"
      "  panel or on the canvas. With Find on, each room a match uses carries its chip's glyph in the room list (V03 §5.5).\n",
      1, 'G120-V03')

    # ---------------- §4.6 ----------------
    E(H46,
      "`stackCarried`), and the notes `shrineOneRoom`,\n"
      "  `solidMonument` and `stackCarried` by the same ids.",
      "`stackCarried`), and one row per\n"
      "  `PlanReport.notes` entry, keyed `info.plan.note.<id>` (`shrineOneRoom`, `solidMonument`, `stackCarried`), so the cause\n"
      "  and the note named `stackCarried` keep two keys.",
      1, 'hand-off V10 VV34-07')

    # ---------------- §5.2 ----------------
    E(H52,
      "`plan.labels`, `plan.lights` and, with numbering on, `plan.key` (the key table: number, name or role, area), with the\n",
      "`plan.labels`, `plan.lights`, with numbering on `plan.key` (the key table: number, name or role, area) and with Find on\n"
      "`plan.find` (V03 §5.5), with the\n",
      1, 'G120-V03')

    # ---------------- §5.5 (new; item 120's plan part) ----------------
    A(H5, S55, 'G120-V03')
