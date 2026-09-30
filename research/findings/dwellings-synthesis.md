# dwellings-synthesis — what our floor-plan rung takes, changes and adds from watabou's Dwellings

Lane `dwellings/synthesis` (Fable architect seat, Claude Fable 5.1), 2026-09-26. The page a re-implementer and the
amendments pass (workflows/09, item 28's editor) read. Precedent: research/findings/manor.md §9. Inputs read in full:
research/findings/dwellings-posts.md, profile-dwellings.md, dwellings-exports.md, _critic-dwellings.md (its binding
rulings B1–B17 supersede the readers wherever they differ), manor.md, docs/AMENDMENTS-2026-09-25b.md items 8–31 (28
and 29 in particular), docs/OWNER-INSTRUCTIONS-2026-09-25.md, docs/DEFINITION.md, docs/CONFIDENCE.md, docs/PROGRESS.md
J33–J45, docs/validation/amendments-b/route.md's item-28 and item-29 sections, and docs/ARCHITECTURE.md §2.5, §2.6,
§2.8, §2.9, §3.8, §4.1, §4.7 S11, §4.12, §5, §6.1–§6.5, §7, §8.5–§8.6, §10.2–§10.3, §11.1, §12.7, §13.2, §14, §16,
II.4–II.6 and the staged-hooks table. Nothing outside the project was read; no captured bundle was opened; no export
was triggered (one stdlib script was run over files already on disk, §7).

STATUS: COMPLETE (2026-09-26) — §0–§7 written; one measurement executed (§7); nothing outside the findings edited.

Evidence grades on every technique line: **[STATED]** the creator's words · **[SHOWN]** observed in a cited capture,
export or image · **[INFERRED]** reconstruction, reasoning given · **[NAMED-ONLY]** named, method unknown. Conclusions:
**CONFIRMED** (executed or read on disk) / **PLAUSIBLE** (reasoning). Where a number is quoted, its lane and the critic's
re-derivation row (R1–R25) or ruling (B1–B17) are named, so nothing here rests on a reader's uncorrected text.

## 0. For the owner — what Dwellings does well, where it fails and why, and what we do differently

**What Dwellings is.** A small, fast toy that draws the floor plans of one house. Every time you press Enter it (1)
invents a house shape out of squares on a grid, (2) decides how many floors it has and whether there is a cellar, (3)
cuts each floor into rooms by cutting the shape in two, then each half in two again, until the pieces are room-sized,
(4) joins the rooms with doors so that every floor is one connected tree, (5) joins each pair of neighbouring floors with
one staircase, (6) writes a list of the rooms a house "should" have (living room, bathroom, bedroom, kitchen, storage…)
and tries to hand those names to the rooms it already cut, (7) adds windows, furniture, lights and a roof. It does all
of that in about 2–8 thousandths of a second, and the same seed always gives the same house
(`profile-dwellings.md` §3.1, §5; critic R7, R15 — CONFIRMED).

**What it does well, and what we take.** Three things are genuinely good and we keep them. First, the *idea of levels*:
one key redraws the walls but keeps the outer shape, another key renames the rooms but keeps every wall — so you can
fix the part you dislike without losing the rest. Second, the *house as a graph*: its JSON file lists rooms as sets of
cells, doors and windows as wall segments, stairs as matching cells on two floors, one entrance — a clean, complete
description we can build our own export on. Third, its *readability devices*: soft shading along walls, a warm light in
each room, labels that shrink and turn to fit, arrows on stairs, the roofs of lower floors showing faintly under upper
plans. We also keep its rule that stairs and one-cell rooms are the hard part, and its late fixes for them (a stairwell
that stacks every stair in one place, a spiral stair in a round tower), which it only offers as options.

**Where it fails, and why.** It decides the rooms *before* it knows what the house needs. The list of needed rooms is
written after the walls are cut, so the walls never know a bathroom is coming. Measured on the twelve houses we
exported: the program asked for 157 rooms and the cutting produced 133; only 79 of the 157 asked-for rooms were
realised; four of the twelve houses have no bathroom, five have no bedroom, none has the "gallery" it asks for, and 37 of
the 133 rooms ended up with no purpose at all ("Room", "Corridor", "Stairhall") (§7, executed this lane — CONFIRMED;
consistent with critic B15). The creator says so himself: the method "is not suitable for" guaranteeing a room, and
inns and taverns, which need a definite arrangement (common room below, guest rooms off a corridor above), could not be
made with it, so he wrote a separate generator that fixes the rooms and the stair first
(`dwellings-posts.md` §2(e), §3 — [STATED]). Its stairs are placed one floor-pair at a time, so they land on opposite
sides of the house and now and then fail to connect at all, which he chose to leave unrepaired ([STATED] 1.1.0,
1.4.0). It has no real size ("I don't know what scale this is" — [STATED]), no courtyards (holes are filled in), no
round rooms, one door to the street and never a back door, corridors that are "mazy" on purpose ("house-like dungeons"),
and no editing beyond renaming, because the author does not want to work out what a moved wall does to the rooms, labels
and furniture around it ([STATED] itch 2025-01-21, 2026-04-10).

**What we do differently.** Our floor plan starts from a building we already have: its wings and their shapes, how many
storeys each wing has, where its doors to the street and yard are, what the building is for (a smithy, an inn, a manor, a
hovel), and how wealthy its street is. From those facts we first write the list of rooms — sized in real metres, with
the rules each room carries (the kitchen on the ground floor with a hearth, bedrooms above, the common room at the front
door, guest rooms off a corridor) — and only then cut the walls *to fit that list*, wing by wing and storey by storey,
with the stair placed first and running straight up through every storey. Courtyards come free, because our buildings
are made of wings around a court; round towers become round rooms with the spiral stair inside. Chimneys stand over
hearths, dormers over the rooms in the roof, the porch at the front door, and the plan's outer walls are exactly the
wings you see from above. Every room, wall and door is editable; a plan is drawn when you click a building, kept, and
marked "changed" when the simulation alters the building until you click again; the same seed always gives the same
plan, and re-rolling the walls never changes the outside of the house.

## 1. KEEP — mechanisms worth re-deriving in our own terms

Each entry: what Dwellings does (graded), then the rule we re-derive from it. "Ours" is the design proposal (PLAUSIBLE);
the Dwellings fact is cited to its lane and the critic's row.

### 1.1 The partition lineage and its merges

* **Dwellings.** One plan per storey (`Plan.new` = storeys + 1 when there is a basement, 92/92 — R7 [SHOWN]);
  `Plan.divideArea` recurses up to ≈ 25 levels; every non-final call looks for a re-entrant corner of the area's outline
  (`getNotch` ≈ `divideArea` − rooms, within ± 3 on every paired house — profile §4.4 [SHOWN]; the cut rule itself
  [INFERRED]); `mechanical` cuts "bisect the outer shape", `organic` cuts "follow" it, `hallways` adds "corridors and
  rooms with nooks" (the build's own one-line descriptions — B11 [SHOWN]); the 2021 idea is "recursive bisection with a
  bend" conceived for exactly this job ([STATED] `49191011`); one-cell strips are merged into corridors "to avoid
  spawning unnecessary doorways" ([STATED] `86093774`, 1.3.0); the result is ≈ 5 cells per room whatever the house
  size (medians 6 / 5 / 5), 51–66 % rectangles, a third of rooms without a 2 × 2 block (R10 [SHOWN]); the whole
  partition of a large house costs under 2.2 ms (R15 [SHOWN]).
* **Ours.** A recursive partition of a *wing* (not of the footprint's union), cutting from a re-entrant corner when the
  region has one and straight across its short axis otherwise, stopping when the piece meets its *target* (not "small
  enough": the target is a programme room's area band, §2.2); slivers and one-bay strips merged into circulation as
  Dwellings merges corridors. The three tag behaviours become three **layout patterns** in data (§2.2): `bisect`
  (mechanical), `follow` (organic: cuts parallel to the wing's long sides — a gallery or corridor along the wing) and
  `spine` (hallways: a corridor spine with rooms off it). Grade for the rule: [INFERRED] from the counts and the
  descriptions; the recursion and the notch step are [SHOWN].

### 1.2 Corridors and doors

* **Dwellings.** After the partition, per storey, `mergeCorridors` → `connectRooms` → `wallDoors` (one each, 96/96 —
  R7 [SHOWN]); `Door.new` = `Room.link` and `Room.unlink` removes 0–15 links per house, `Door.getPrice` runs 3.0–7.1 ×
  per door — a **priced spanning connection** [INFERRED; the "= 2 ×" identity is struck, B3]; the exported doors are three
  kinds — `REGULAR` (a leaf), absent (an open doorway), `NULL` (no wall, only at one-cell stair shafts) — and open
  doorways favour circulation rooms (24 of 34) while leafed doors join two non-circulation rooms (30 of 52)
  (`dwellings-exports.md` §1.4, §3.6 [SHOWN]); every storey's door graph is a spanning tree and every house one tree
  rooted at the street, 38/38 storeys, 12/12 houses (R13 — CONFIRMED), while the creator states loops occur "quite
  rarely" and are deliberate (B4 [STATED]); bedrooms "can't have more than one door", bathrooms and libraries "request
  actual doors", the rest get doorways ([STATED] 1.0, 1.1.0); 62 % of rooms have one door on their storey; depth from
  the street runs public → private (Hall 1, Living room 2, Bedroom and Bathroom 6, medians — exports §3.7 [SHOWN]).
* **Ours.** Openings are typed records on wall segments (`door` with a leaf, `arch`/open doorway, `open` = no wall,
  `entrance`, and item 30's `passage`); the room graph is built as a **tree first** — a spanning connection priced by the
  programme (a corridor or hall is the preferred hub; a bedroom's or a store's degree is capped by its row) — and
  **loops are added by rule**, not by chance: a second door where the programme says so (a kitchen to the yard, a hall to
  the parlour and the stair) or where a wing's pattern is an enfilade. The public → private depth gradient is a soft
  acceptance statistic (§3.3), Dwellings' medians being the baseline.

### 1.3 Vertical links, and their stated failure

* **Dwellings.** Exactly one staircase per adjacent storey pair (`Staircase.new` = 2 × `connectFloors`, `connectFloors`
  = storeys − 1 whenever no spiral was rolled, 96/96 — R7 [SHOWN]); both ends at the *same cell* on the two storeys,
  19/19 pairs (R13 — CONFIRMED); the stair end fills one cell (two five-tread flights and a landing, U or L — exports
  §2.5 [SHOWN]); a spiral stair serves every above-ground storey from a round turret while the basement keeps a straight
  stair (exports §1.5, R7 [SHOWN]); a trapdoor when no cell is free (≈ 1 in 90 houses — B16); the `stairwell` path, which
  stacks the stairs, is *rolled by the generator itself* in about half of the multi-storey houses and forced by the tag
  (B8 — CORRECTED from "three houses"). **The failure, in the creator's words:** "Each pair of adjacent floors is
  connected independently and it's really hard to do this differently … the stairs connecting the ground and the 1st
  floors may be on the opposite side of the house from the stairs connecting the 1st and the 2nd"; "Occasionally the
  generator fails to connect two floors … for now I chose to ignore it" ([STATED] 1.4.0, 1.1.0); the exports show it —
  row 9's stairs at (5, 0), (6, 1), (8, 4) on successive storeys (exports §3.9 [SHOWN]).
* **Ours.** The two devices Dwellings had to add — the stairwell stack and the external spiral shaft — are our *rule*,
  not our option: a **stair core** (a bay of the wing, or a tower) is placed **before** the partition and serves every
  storey of its wing, basement included unless the class row says `trapdoor` or `ladder`; each storey is partitioned
  around the core as a fixed, pre-assigned room. Taverns does the same ("A staircase leads to the 1st floor and a
  trapdoor connects the kitchen to the basement" — [STATED]). The bar "stairs stacked" (§3.3) is then met by
  construction, and there is no floor-pair search that can fail.

### 1.4 Role requirements as data

* **Dwellings.** A room type "is not just a name, but also its average size, how regularly shaped it should be, how
  many windows it requires etc." ([STATED] itch 2024-04-30); the record carries an ordinal size ("the bathroom the
  smallest room and the ballroom the largest" [STATED]), a window demand (none / some / as many as possible, capped by
  exterior walls), a door demand, a storey restriction (kitchens and halls on the ground floor 6/6 and 6/6, bedrooms
  never there 13/13, attic / lookout / observatory on the top storey — exports §3.4 [SHOWN]; validators
  `RoomType.aboveGround` / `underground` / `topFloor` / `singular` — profile §4.7 [SHOWN names]), a priority (list 1
  "tried harder" — B15), props per type, and a name condition (special rooms only when the house name calls for them
  [STATED] 1.0.1); 28 registered types, 13 appearing as specials (profile §3.2 [SHOWN]); the stated bathroom-next-to-
  bedroom adjacency is not in this build's output (0/12 — B7, dropped). Realised areas follow the ordinal aim: bathroom 2,
  storage 3, corridor 4, kitchen 4.5, bedroom 6, living room 7.5, cellar 8.5 cells (medians, R13 — CONFIRMED).
* **Ours.** The same record, made a **rule-table row** (`RoomProgramRow`, §4) with the fields Dwellings keeps in code
  plus the ones it lacks: a count law (one, per storey, per household, per capacity), an area band in m² by prosperity
  band, hard/soft adjacency with a `via: 'corridor'` form, a hearth flag, a `priority: 'hard'|'soft'`, and the
  furniture spec. Dwellings' measured medians and the ordinal rule are the calibration baseline for the first table.

### 1.5 Restrictive re-rolls as per-rung streams

* **Dwellings.** Enter re-rolls everything; Shift+Enter re-partitions every storey with the footprint area, bounding
  box, grid and entrance byte-identical; Ctrl+Enter re-assigns roles with walls, floors, stairs and lights identical and
  windows and furniture re-drawn (`profile-dwellings.md` §3.4, upheld by B17 — [SHOWN]); the creator's contract in
  words: "reroll the inner walls" keeping "the ground plan, number of floors etc.", "reroll the room labels" keeping
  "all the geometry" ([STATED] 2026-04-07). Neither re-roll is recorded in the URL, and the next seed depends on the
  whole key history — one PRNG shared by everything (R5 [SHOWN]; the sharing [INFERRED]).
* **Ours.** Three concerns on the building's lineage — `plan.layout`, `plan.roles`, `plan.furnish` (§4) — with the
  dependency Dwellings leaves unstated made explicit: a roles re-roll re-derives what hangs off roles (window demand,
  door kinds, furniture) and nothing geometric; a layout re-roll keeps the wings, the stair core and the entrances by
  construction. Each is a New random on the building with a named rung (§7.1's `regenerate` gains `rung`), logged,
  replayable and undoable — the reference's idea on our event model, with its unrecorded-reroll flaw removed.

### 1.6 The room graph as the export

* **Dwellings.** `floors[{level, rooms[{name?, cells[]}], doors[{edge{cell,dir}, type?}], windows[{cell,dir}],
  stairs[{cell,dir,up}]}], exit{cell,dir}, spiral?` — a compact grid model with no ids, no units, no version, no walls,
  no furniture, no heights; the graph is recoverable through cell membership (exports §1 — CONFIRMED by R13); the
  creator: an export, not a save ("can't even import its own jsons" [STATED]).
* **Ours.** The same *content* — rooms, openings, windows, stairs, entrances — in our own schema (§4: a `plan` block of
  the JSON schema of §11.1), with what the reference omits: entity addresses for rooms (so the host and the VTT export can
  follow them), integer centimetres, the output version, storey heights, explicit wall polylines, hearths and chimneys,
  and a supersedes table like every export; and it round-trips, because a plan is an edited composition's data (§2.9).

### 1.7 Readability devices (secondary, for the building band's style sheet)

Vector ambient-occlusion strips along every wall, interrupted at doorways, plus quarter discs at inner corners
([STATED] 1.2.0, 1.3.8; exports §2.4 [SHOWN]); one light per room at the summit of the room's straight skeleton
(`Light.getSkele` → `getSummit` — profile §4.11 [SHOWN]), corridors unlit; labels scaled to the room, rotated in tall
rooms, abbreviated in one-cell rooms [SHOWN]; stair arrows pointing up from a dot [STATED]; the entrance as steps and
an inward arrow [SHOWN]; upper storeys drawn over the faded roof of the storey below [SHOWN]; the roof of every
above-ground storey as the straight skeleton of that storey's *whole* outline, painted bottom-up (B1 — CONFIRMED
82/92, the rest a spiral cone). Ours keeps the devices as paint programs of the building band (§8.5), described, not
copied; the roof rule differs (§2.7 g).

### 1.8 The cost expectation

A whole house — model, view build, one frame — in 5–40 ms; the model alone 1.9 / 4.1 / 8.0 ms median for small / medium
/ large, of which the partition ≤ 2.2 ms and the role search 0.1 / 1.9 / 4.7 ms (`assignSet`), furnishing 0.6–0.9 ms
(B2 — CONFIRMED). Our plan rung has no exhaustive role search (roles are decided before the cut), so a single-figure
millisecond budget per building is the right order (§4's §12.7 row).

## 2. CHANGE — our inputs, function first, and coherence with the exterior

### 2.1 Inputs from our model instead of random shapes

Dwellings' pipeline is a fixed chain: tags → ground shape (a polyomino of 11–33 cells from a rejection loop of
rectangle unions; `square` a single rectangle) → entrance (one exterior cell edge, rule unknown) → storey count and
basement rolls → stair rolls → one partition per storey → stairs → roles → windows → furniture → name (profile §3.1,
§4.1–§4.3 [SHOWN]; the acceptance rules [INFERRED]). When a settlement generator opens a building in it, the hand-off is
a ≤ 11 × 11 hex bitmask of cells, one boundary edge as the entrance, `floors`, `seed` and `tags` (R1, R2 — CONFIRMED;
B10); holes are filled and only the part holding the last filled cell is built (B9). What MFCG, VG, NG and Urban Places
actually send is unmeasured (critic §6 gap 1).

**Ours: the plan rung has no shape stage, no size tag and no storey roll.** Its input is the building record the base
already carries (§2.6) plus item 29's additions, resolved at the call like `compose()`'s input:

| Dwellings draws | we read | where it lives |
|---|---|---|
| a polyomino from `small` / `medium` / `large` | the composed wings: `BaseWing.ring` (world cm, counter-clockwise) or the composed `Wing.footprint`, with the joints two wings share vertex for vertex (§2.6 rule 1) | `Building.wings`, `Composition.wings` |
| `floors` / `low` / `tall` | `Heights.floors` **per wing** (a wing with fewer floors is roof at the upper level) and item 29 (b)'s basement decision | `BaseWing.heights`, `Building.basement` (§4) |
| one random exterior edge | `entrances: Entrance[]` with roles main / side / rear / yard / service (item 29 (a)); the main one roots the circulation | `Building.entrances` |
| a house *name* that decides the special rooms | the class, the use, the assignment and the sub-locations the class table already gives the building | `Building.class`, `use`, `assignment`, `subLocations` |
| nothing | the prosperity band and the continuous value (item 19's template interpolation), the household count (item 31 rung 1: several households per building), the composed towers, courts and porch | `ContextVector`, `Composition.towers` / `courts`, `Wing.porch` |
| `organic` / `mechanical` / `hallways` | a layout pattern chosen by class × era × band (§2.2) | the class table |

So the plan is a pure function of the building's committed state and its own streams — the laziness contract's
condition (§4.1) — and needs no rasterised hand-off: the Procgen-Mansion-style bitmask (`manor.md` §3.2) is what our
`BuildingGenerator` interface was designed to make unnecessary (§15.2 G2's hook row).

### 2.2 Function first: the programme, then the partition

**Why the reference cannot guarantee a room.** The partition fixes the number and sizes of rooms per storey before any
room type exists; the two programme lists are built afterwards from storeys, basement and name (R8 — CONFIRMED) and
placed by exhaustive validation "and here it often fails" ([STATED] 2023-10-02). Measured on the twelve exports (§7,
`captures/dwellings/_synthesis/programme-vs-rooms.py` — CONFIRMED): 157 programme items against 133 rooms; 79
matched; 7/12 houses with fewer rooms than items and 9/12 with fewer *named* rooms; 5/12 short of upper-storey rooms for
the bedrooms the list demands ("one bedroom per upper storey" + the list-1 bedroom); attic realised in 1 of the 9
houses that list it (every house with an upper storey), gallery in 0 of 12; 37 generic rooms. The creator's diagnosis and remedies agree: "the method I use
is not suitable for this"; a tag per room type "doesn't sound like an elegant solution"; typed buildings have "specific
topology" the method cannot give, so Taverns fixes the programme and the anchors first and re-rolls the whole tavern
when the guest rooms are too few ([STATED] `dwellings-posts.md` §2(e), §3).

**Ours: the programme is written first, sized to the storeys, and the cut serves it.**

1. **Programme.** From the class table's `roomProgram` rows (§4) for (class, use or assignment, band, storeys, households,
   sub-locations): a list of `ProgramRoom { role, areaM2: [min, target, max], storey rule, exterior demand, door kind,
   adjacency (hard/soft, via corridor), hearth, priority }`. Sub-locations the class already gives the building (a
   counter, beds, a stage — §2.6 `SubLocation`) each demand one room; item 31's households demand one dwelling unit each.
2. **Allocation to storeys and wings** (tier 0 of the ladder — feasibility by construction, §5.1 (2)): each storey's
   capacity is the area of the wings that reach it, less a circulation share by pattern; hard rooms are placed by their
   storey rule, then soft rooms by priority until the capacity is met; the stair core, the entrance rooms and the hearth
   rooms are **anchors** fixed in their wing and side before any cut (Taverns' order: stair, trapdoor, hearth, then the
   rest — [STATED] `159559624`). A programme that does not fit is trimmed here, soft rooms first, and reported — never
   discovered after the cut.
3. **Partition to targets.** Each wing of each storey is cut by its **layout pattern** — a data row, like §7.7's forms —
   with the remaining rooms' target areas as the stop rule: `bisect` (Dwellings' mechanical: recursive cuts across the
   region's short axis), `follow` (organic: cuts parallel to the long sides, a gallery on the court or street side),
   `spine` (hallways: a corridor along the wing's axis, rooms cut off it at the targets — the inn's guest floor, the
   double-loaded corridor), `hall-and-parlour` (one cross cut, the hearth room larger), `cross-passage` (a through
   passage at the entrance with rooms either side), `enfilade` (rooms in a row, doors aligned — a manor's state
   rooms), `nave` (one room: churches, barns, halls). The pattern is chosen by class × era × band with the wing's aspect
   as a guard (a `spine` needs a wing ≥ 2 rooms deep). Cuts run on a **wing-local lattice** (§2.5) so the geometry stays
   integer and cheap; the pieces are assigned to programme rooms as they are cut, so no room ever waits for a label.
4. **Circulation and openings.** The spanning tree of §1.2 with the pattern's hub (the spine, the hall, the cross
   passage) and the programme's hard adjacencies as forced edges; loops by rule; a door at every entrance (item 29 (5));
   stair-core doors on every storey it serves.
5. **Failure ladder F-PLAN** (in §5.2's form, per building, never whole-house): tier 0 the allocation above; tier 1 the
   bars of §3.3 checked on the overlay; tier 2 local repair — merge two under-size pieces, slide a cut to its neighbour's
   min, swap two rooms' storeys; tier 3 the storey's pattern re-run on the next `attempt` (≤ 3); tier 4 the simpler
   primitive — `bisect` on the wing's axes; tier 5 substitution — a soft room absorbed into its neighbour or into a
   generic room, reported; tier 6 a hard room omitted and reported (the bar fails, the building is flagged). Nothing
   outside the building is touched.

**Why this can make an inn.** Topology is data: the inn's rows say common room on the ground floor `at: main entrance`,
kitchen `adjacent: common room, hard` with `hearth` and `door: yard`, cellar `under: kitchen, via: trapdoor`, guest
rooms `count: perCapacity(tempResidential)`, `storey: upper`, `via: corridor` — and the `spine` pattern is chosen for
the upper storey. Dwellings' Tiny-Pubs hand-off produced tavern *names* on an ordinary partition ([SHOWN] `158074424/03`);
Taverns' fixed programme is the proof the arrangement must come first.

### 2.3 Courtyards and holes

Dwellings fills holes ("the hole will be ignored" [STATED]; a 3 × 3 ring became one solid room — profile §2.3 [SHOWN])
and courtyards were postponed twice as "*even more* complicated" [STATED]; the sibling Castle in the Mist makes courts by
discarding inner blocks ([STATED] `59864807`). Ours needs no hole handling at all: a courtyard house is a ring, U or H
of **wings** (`Composition.wings`, `courts` — §2.6), and the plan partitions each wing on its own; the court is the
footprint's hole and the wing rings already bound it. What the programme adds: rooms on the court side get their exterior
demand from the court (a cloister or gallery is the `follow` pattern with its corridor on the court side), a court door
is an `Entrance` of role `yard` or `court` (item 29), and item 30's `passage` reserves its ground-storey cells across the
wing before the cut. Holes in a *single* wing do not occur (a wing is a rect, quad or template polygon).

### 2.4 Round tower rooms

Dwellings has no round plans ("The lack of support for circular plans IS a problem" [STATED]); its one curve is the
external spiral shaft, a turret of radius 0.7 cell on a corner cell that serves every above-ground storey (exports
§2.5 [SHOWN]). Ours: a `ComposedTower` (centre, radius, heights) is a **round wing** for the plan — one round room per
storey, or two by a `radialSplit`, with the spiral stair inside it as the stair core of the wing it joins; a `polygon`
wing (octagon, apse) is partitioned the same way. The reference's shaft-on-a-corner is the same idea turned inward, so the
tower serves as the house's stair (its second use in the owner's mental model, §5).

### 2.5 Real units and scale

Dwellings has none: "there is no explicit scale", "I don't know what scale this is"; sizes are ordinal only; users
place the cell between 5 and 10 ft; one-cell stairs and one-cell bathrooms imply a cell of about 1.5–2.5 m
(`dwellings-posts.md` §2(o) [STATED] + [INFERRED]); its exports are cells and pixels. Ours: every ring is integer
centimetres (§2.1), room areas come from the table in m² by band, and the plan is cut on a **wing-local lattice** — the
wing's OBB frame at a table module (default 50 cm; the module is a row, not a constant) — then written back as world
lattice points, so walls are exact polylines, not cells. The reference's cell survives only as an *export* convention:
the VTT export snaps to its declared grid (5 ft = 1.5 m by §11.1's profile) with walls at their centimetre positions.
The router's open question 2 ("the plan's unit and scale") is therefore answered without a modelling cell.

### 2.6 Determinism by lineage streams

Dwellings reproduces a house from seed + tags (+ plan, floors, entrance) across browser sessions — three independent
sessions agree on every room cell of 38 storeys (R4 — CONFIRMED, the strongest check in the review) — but its next
seed comes from one live PRNG the re-roll keys and some view keys share, and neither re-roll is recorded (R5 [SHOWN]).
Ours: the plan's streams are keyed from the building's entity key by the concerns of §4 with the building's reroll,
attempt, epoch and salt 0 (§6.1), so a plan is a function of the building alone; a re-roll is a logged `regenerate` with
an absolute reroll map (§7.1); nothing shares a generator, nothing reads a clock, and the plan's per-storey partition is
lint-clean under §6.5's allowlist (integer lattice cuts; no transcendental).

### 2.7 Exterior coherence

Dwellings goes the other way on every point: its plan comes first and the elevation and roof are read off it, with
"chimneys … not affected by the rooms below them", plan and elevation sharing "the entrance … and windows" in position
but not size, dormers drawn "not consistently" between sides ([STATED] 1.4.1, 1.3.0, 1.3.1). Ours derives the plan
*from* the composed exterior and feeds three things back:

* (a) **Plan walls equal the wing rings**, per storey: the union of a storey's rooms is the union of the rings of the
  wings whose `floors` exceed that level (integer equality after snapping, the stage-3 contract of §2.6 extended one
  rung); every exterior wall segment lies on a wing ring edge. Dwellings' shrinking upper storeys — subsets of the ground
  floor in 17/17 exports (exports §1.2 [SHOWN]) — are our wings of unequal `floors`, decided at the wings rung.
* (b) **Stairs stacked**: the stair core of §1.3, one bay through every storey of its wing, a spiral in a tower; the
  basement joined by the same core or by a trapdoor where the class row says so (Dwellings always joins the basement by a
  regular stair even under a spiral — [STATED] 1.1.0; ours makes it a row).
* (c) **Chimneys over hearths**: rooms with `hearth: true` (kitchen, hall, the chamber above the kitchen in a richer
  band — Taverns duplicates the fireplace on the floor above the kitchen [STATED] 1.1.0) mark a wall segment; a `Chimney`
  stack is derived from the hearth column and rises through the storeys to the roof, where the roof construction draws
  it (§8.6). The reference's random chimney count and position are replaced by derivation.
* (d) **Dormers over upper rooms**: `Wing.dormers` stops being a free count; the top storey's rooms with exterior demand
  that lie under the roof slope (an attic bedroom, a garret) place the dormers, one per such room's façade bay, capped by
  the wing's eave length; a wing with no roofed room has none.
* (e) **The porch at the main entrance**: `Wing.porch` is placed on the side and offset of the `main` entrance (item 29),
  so the composition's porch and the plan's door coincide by construction.
* (f) **Windows on exterior sides**: from each room's exterior demand, one window per façade bay of the room's exterior
  wall, aligned across storeys where a wall stacks (the elevation reads the same records); Dwellings' 0.32-cell module on
  ≈ 2 of 3 exterior cell edges (R10 [SHOWN]) is the density baseline, not a rule.
* (g) **Roofs**: the reference roofs each storey's *whole* outline by one straight skeleton (B1); ours keeps §8.6's
  per-wing construction (exact OBB ridges for rects, the validated skeleton for irregular wings), which the wings rung
  already decided — a declared difference, not an omission: the plan never chooses a roof, it inherits one.

## 3. ADD — edits, states, acceptance bars

### 3.1 Edit events on rooms, walls and doors

Dwellings edits nothing but a room's name; the creator refused wall and door editing because "if you remove a wall
between two rooms, will they become one new room? This would affect labels, props (furniture), rooms connectivity"
([STATED] itch 2025-01-21) — and eight of the 52 user posts ask for exactly that (`dwellings-posts.md` §4.2, R20). Our
answer is the design's own: an edit is an event on an address, the dependants are re-derived from their concerns, and the
dry run validates the result. Proposed events, in §7.1's notation, all with `building: Id` and a `storey` (the plan is
scoped to one building; a click logs nothing — only an edit does, which then stores the composition, §2.6):

```ts
| { t: 'setRoomRole'; room: Id; role: RoomRole }                                  // a rename that is a role: furniture, windows and door kinds re-derive from plan.roles' dependants
| { t: 'moveWall'; wall: Id /* a partition edge */; deltaCm: Cm }                   // slides the edge along its normal; both rooms re-checked against their rows' min area; furniture re-fitted
| { t: 'splitRoom'; room: Id; cut: [PointCm, PointCm]; roles?: [RoomRole, RoomRole] }
| { t: 'mergeRooms'; rooms: [Id, Id]; role?: RoomRole }                            // the creator's question, answered: one room, the surviving role chosen or given, doors of the removed wall dropped
| { t: 'setOpening'; wall: Id; at?: Cm; kind: 'door'|'arch'|'open'|'none' }        // add, move, retype or remove a door on a wall segment; an entrance's door cannot be removed (item 29 (5)), only moved with its entrance
| { t: 'setWindow'; wall: Id; at?: Cm; op: 'add'|'move'|'remove' }                  // exterior walls only
| { t: 'moveStairCore'; core: Id; bay: Polygon }                                   // moves the bay on every storey it serves; the partition re-runs around it (plan.layout kept where the wing is unchanged)
| { t: 'lock' ... paths: ['plan/rooms/<id>'] }                                     // the existing lock, on a room's path: a locked room is a fixed input to every re-derivation
```

Every plan event stores the building's composition if it was not stored yet (the composition's rings then enter the
model digest, §2.6, §6.2), keeps an undo record (the former storey), and is carried with the wings by `carryWings` —
rooms already are (§2.6 "a stored composition is carried with its wings"). Locality: the effective scope is the building;
the dry run runs the bars of §3.3 on the overlay and returns an F-EDIT conflict, never a silent repair, when a move would
leave a room below its row's minimum or unreachable.

### 3.2 The states absent / current / stale / edited

Per building and per rung (`wings`, `rooms`, `plan`), on an **elaboration record** beside the derivation record (§4):

| state | meaning | how it is entered | what the viewer sees |
|---|---|---|---|
| `absent` | never derived, or evicted — nothing is lost, the rung is a pure function | default; cache eviction | the outline (city band) or the wings (district band) |
| `current` | the cached result's input digest equals the digest of the inputs now | a click (or `elaborate: 'view'` within budget) derived it, or a re-derivation reproduced it | the plan |
| `stale` | an input digest changed — designation, assignment, band, storeys, footprint or wing rings, households, a table slice the record cites, a dossier event (items 18, 22, 31) | the batch that changed the input marks it (no derivation runs) | the cached plan with a change marker at every zoom (a building glyph; a neighbourhood with stale buildings carries the same marker) |
| `edited` | a stored composition with plan events in the log | the first plan edit (§3.1) | the plan; edits protected as §7.2 protects any edited attribute |

A click on a `stale` rung re-derives it as a **mutation** of the cached state (item 28 (c), item 18 (a)): rooms whose
wing and ring survive and whose role is still in the new programme are kept with their addresses (the anchor is the
room's centroid within its wing); only the wings whose demand changed are re-cut; the stair core is kept unless its wing
went; an `edited` rung is re-derived around its edits like any protected entity (§7.2) with the fates listed. A
`current` rung is never re-derived by viewing. The states are not model data: the rung is derived, so the record lives
outside the model digest and inside the records digest, like a derivation record (§2.8); an `edited` rung's content is in
the model digest through the stored composition.

### 3.3 Acceptance bars (in §13.2's form; the plan's B-PLAN fixtures are §6's experiment)

Hard bars (0 violations on the B-PLAN fixture set and, once stage 3 lands, on every plan of B-CITY-lite's clicked
buildings):

1. **Every hard programme room present** — 100 %; soft rooms delivered, degraded (absorbed) or omitted and reported by
   tier (§5.1 (7)). Reference baseline: bathroom 8/12, bedroom 7/12, the special 9/12, gallery 0/12 (B15; §7).
2. **Every room reachable** from the main entrance through openings and stair cores, on every storey — 100 %; every
   entrance opens into a room (item 29 (5)); a `passage` (item 30) reachable from both its ways.
3. **Stairs stacked** — every stair core occupies the same bay on every storey it serves; 0 storey pairs joined only by
   an unaligned stair; a basement joined by its core or by a declared trapdoor. Reference baseline: stacked only by the
   `stairwell` roll or tag (B8); row 9's three positions (exports §3.9).
4. **Walls equal the wing rings** — per storey, the union of the rooms equals the union of the rings of the wings that
   reach the storey (integer equality after snapping); every exterior wall segment on a ring edge; every room ring simple
   and inside its wing; the rooms tile the storey (no overlap, no gap) — the stage-3 contract's fourth rung.
5. **Chimneys over hearths** — every `Chimney` stack derived from a hearth column, 100 %; dormers only over roofed
   rooms with exterior demand.
6. **Determinism** — the same building state gives the same plan on every host (§6.5 (9)'s cross-host test extended to
   the building band); a layout re-roll leaves the wings, entrances and stair core byte-identical; a roles re-roll leaves
   every ring and opening position byte-identical (the reference's Shift+Enter and Ctrl+Enter contract, profile §3.4 upheld by B17, as
   a test).
7. **Locality** — a plan edit or re-roll changes nothing outside its building (the oracle's rule (ii) at building scope).
8. **Cost** — `plan()` within its §12.7 row (§4) per building median, one plan per click, cache memory within §12.8's
   row.

Soft bars (statistics bands, reported): no pass-through bedroom or bathroom (a bedroom's degree ≤ its row's cap) and no
two parallel corridors — the users' three recurring complaints made bands (`dwellings-posts.md` §4.2 [STATED by users]);
circulation share by class and band (reference: 0–33 %, median 18.5 % — exports §3.6); room-area ordering by role
(bathroom smallest, hall or great room largest — the reference's stated aim and measured medians, R13); depth-from-
street gradient public → private (reference medians, exports §3.7); loops only where a row asks for them.

## 4. HOOKS the base carries now, in our notation; corrections to item 28's draft

Everything in this section is PLAUSIBLE design, written so item 28's editor can paste fields, not prose. Records follow
§2.6's style; nothing here edits the architecture (the list of what should change is at the end, §4.4). The plan rung
itself is staged after the Fantasy-Manor buildings (item 28 (d)); the hooks are what the base carries so that adding it
later is a registration, in the sense of the staged-hooks table.

### 4.1 Records (model, §2.6 — with §2.8 and §2.9 for the elaboration record and cache)

```ts
// §2.6 — the plan rung's records (the fourth rung: outline → wings → rooms → plan)
interface Composition { lod: ('outline'|'wings'|'rooms'|'plan')[]; wings: Wing[]; towers: ComposedTower[]; courts: Polygon[]; rooms?: Room[]; plan?: Plan }
interface Plan { storeys: Storey[]; program: ProgramRoom[] /* the programme as sized and allocated (§2.2 steps 1–2): what the plan owed, for the report, the bars and the mutation operator */;
  cores: StairCore[]; chimneys: Chimney[]; pattern: Record<number /* storey level */, LayoutPattern>; slices: SliceRef[] /* the roomProgram and pattern rows consulted (§2.8) */ }
interface Storey { level: number /* −k … −1 basement, 0 ground, 1 … n */; wings: number[] /* the wings whose floors (or basement) reach this level */;
  rooms: PlanRoom[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }
interface PlanRoom { id: Id /* room:<building>/<level>/<i> — an address, carried by anchor (its centroid within its wing) */; ring: Polygon /* world lattice points inside its wing */;
  wing: number; role: RoomRole; program?: number /* index into Plan.program; absent for a generic room */; subLocation?: Id /* §2.6: rooms refine sub-locations, never replace them */;
  hearth?: { wall: Id; at: Cm; chimney: Id }; lit: boolean }
interface Wall { id: Id; a: PointCm; b: PointCm; kind: 'exterior'|'party'|'partition'|'court'; left: Id|'outside'; right: Id|'outside' }   // exterior and court walls lie on wing-ring edges (bar 4)
interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm; kind: 'door'|'arch'|'open'|'entrance'|'passage'|'trapdoor'; entrance?: number /* index into Building.entrances (item 29) */ }
interface WindowRec { id: Id; wall: Id; at: Cm; widthCm: Cm }
interface StairCore { id: Id; wing: number; tower?: number /* index into Composition.towers: a spiral in a round wing */; bay: Polygon /* the same bay on every storey it serves */;
  levels: [number, number]; kind: 'straight'|'dogleg'|'winder'|'spiral'|'ladder'|'trapdoor' }
interface Chimney { id: Id; wing: number; column: PointCm; levels: [number, number] }     // derived from a hearth column; the roof construction draws it (§8.6)
type RoomRole = string;      // data-defined by the roomProgram table: hall, kitchen, chamber, solar, parlour, common_room, guest_room, forge, workshop, store, cellar, chapel, nave, passage, corridor, stairhall, generic, …
type LayoutPattern = 'bisect'|'follow'|'spine'|'hall_and_parlour'|'cross_passage'|'enfilade'|'nave';   // §2.2 step 3; rows, not code

// §2.6 — the inputs the rung reads that item 29 adds (the same editor)
interface Entrance { vertex: VertexRef /* ('entrance', building id, i) — the role becomes indexed (§2.2 rule 7) */; role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|'alley'|'yard'|'court';
  wing: number; side: number /* the wing ring's side, as Porch.side */; offsetCm: Cm }
interface Basement { floors: number /* below ground, ≥ 1 */; kind: 'full'|'half'|'walkout'; ring: Polygon /* inside the ground storey's wings (item 29 (b)) */; access: 'core'|'trapdoor'|'external' }
// Building gains: entrances: Entrance[] (replacing entrance), basement?: Basement; Heights gains floorsBelow?: number (0 or the basement's floors)

// §2.8 / §2.9 — the elaboration record and the cache (owner: "once generated it is saved … until something changes")
interface ElaborationRecord { entity: Id; rung: 'wings'|'rooms'|'plan'; state: 'absent'|'current'|'stale'|'edited';
  inputs: Hash64 /* digest of the rung's inputs: the building's leaf digest (wings, heights, entrances, basement, class, use, assignment), its context band, its households, and the slices below */;
  slices: SliceRef[] /* the table slices the rung consulted: roomProgram rows, patterns, furniture — §7.6 invalidates by slice */; reroll: number /* this rung's New random count (§4.2) */; epoch: number; since: { epoch: number; seq: number } }
// persisted per building outside the model digest, inside the records digest, like DerivationRecord (§2.8); the state is derived from `inputs` against the current digest at load and after every batch that touches the building
interface Document { …; elaborations?: ElaborationChunk[] /* a non-canonical cache beside `model`: content-addressed chunks keyed by (entity, rung, inputs digest) holding the derived Composition or Plan; checked by content hash, dropped on mismatch, never a base, never in a digest */ }
```

### 4.2 Interfaces, streams, events, budgets, bars (the other parts)

* **The step (§2.6, §14).** `BuildingGenerator` gains `plan(input: BuildingInput, composition: Composition, k: Kernel,
  prior?: Plan): KernelResult<Plan>` — the fourth rung, lazy under §4.1's contract, run in the derivation pool on the
  click's request like `compose()` (§8.6, §8.9); `prior` is the cached plan a `stale` rung re-derives *from* (item 28 (c),
  item 18's mutation: rooms kept by address where their wing, ring and role survive). The base ships a default
  `PlanBuilder` in `@plat/plots` beside `OutlineBuildingGenerator` (the programme allocation, the pattern cuts on the
  wing-local lattice, the spanning connection, the ladder F-PLAN), which any stage-3 generator may call; the tables live in
  `@plat/tables`, the records in `@plat/model`, the cache in the generation worker (`@plat/api`).
* **The class table (§7.6, §10.2 — the room-programme column of item 28 (d), interpolated by band like item 19's
  templates):**

  ```ts
  interface RoomProgramRow { key: { cls: BuildingClass; use?: string; band: string; era?: string }; rooms: RoomRuleRow[];
    pattern: Record<'ground'|'upper'|'top'|'basement', { pattern: LayoutPattern; weight: number }[]>; circulationShare: number;
    stair: { kind: StairCore['kind']; placement: 'entrance_side'|'rear'|'centre'|'tower' }; basementAccess: Basement['access']; furniture: { density: number; wallAffinity: number } }
  interface RoomRuleRow { role: RoomRole; count: { law: 'const'|'perStorey'|'perHousehold'|'perCapacity'|'perSubLocation'; n: number; capacity?: keyof SubLocation['capacities']; tag?: string };
    areaM2: [number, number, number] /* min, target, max */; storey: 'ground'|'upper'|'top'|'basement'|'any'; exterior: 'none'|'some'|'max'; door: 'door'|'arch'|'open'; maxDoors?: number;
    adjacency: { to: RoomRole|'entrance:main'|'entrance:yard'|'core'; kind: 'hard'|'soft'; via?: 'direct'|'corridor'|'under' }[]; hearth?: boolean; priority: 'hard'|'soft';
    furniture: { density: number; wallAffinity: number; glyphs: string[] } }   // Dwellings' type record (§1.4) plus what it lacks; its measured medians are the first calibration (§7)
  ```

  Fractional counts (a count law's fractional part) draw from `plan.program`, as `plot.join` draws from `plot.join`
  (§7.7).
* **Streams (§6.1, the concern registry — append-only):** `plan.program`, `plan.layout`, `plan.roles`, `plan.furnish`,
  all geometry concerns (non-rerollable by salt; re-rolled only by `regenerate`), keyed from the building's entity key
  with **the rung's own reroll** from its `ElaborationRecord.reroll` as the `reroll` component — a stated extension of
  §6.1's "children draw with their derivation unit's reroll": for the plan's concerns the derivation unit is the
  building's plan rung, so New random on `plan.layout` advances that record's count and nothing else's, which is what
  makes the reference's Shift+Enter / Ctrl+Enter contract hold (§1.5). `plan.roles` re-derives its dependants (window
  demand, door kinds, furniture); `plan.layout` keeps wings, entrances and the stair core by construction.
* **Events (§7.1):** the plan events of §3.1; `regenerate` gains `rung?: 'wings'|'rooms'|'plan'|'plan.layout'|
  'plan.roles'|'plan.furnish'` (absent = the whole building as today); their lifecycle rows in §7.4 (create: the plan
  tools on the building band; read: the stored composition; persist: log; regenerate: a fixed input to the rung's
  re-derivation, re-fitted around like any edited attribute; undo: the former storey from the undo record; migrate: by
  the building's address and the room's anchor, else orphaned and reported). **A click logs nothing** (item 28 (c)); the
  first edit stores the composition (§2.6).
* **The trigger policy (§4.1):** `elaborate: 'click'|'view'` is **per-user view state** (`view.keys['elaborate']`,
  §2.9), because it decides *when* a pure rung is derived, never *what* — the laziness contract guarantees the same
  model either way; `'click'` is the owner's default; `'view'` derives the visible tiles' rungs within §12's budgets as
  §8.6 already does for `compose()`. A neighbourhood click brings its buildings' `wings` rung to `current`; a building
  click brings `plan` to `current`, deriving `wings` first if absent (rungs are ordered). The eager content decision
  (use, class, assignment, `Lifecycle.assigned`) stays at the city level (§2.5, §4.1) — the owner's pre-assignment.
* **Export (§11.1):** a `plan` block in the JSON schema (storeys with rooms, walls, openings, windows, cores, chimneys —
  addresses, integer cm, the output version, the supersedes table); VTT: one scene per storey at its elevation
  (`line_of_sight` from `Wall` minus openings, `portals` from openings, the stair core as a portal between the storeys'
  scenes by name); the SVG building band as §8.5's `building` band.
* **Budgets (§12.7 row "Stage-3 hook" gains; §12.8 gains a cache line):** `plan()` ≤ 5 ms per building median and ≤ 20
  ms p95 on the reference machine (Dwellings' whole model is 1.9 / 4.1 / 8.0 ms with an exhaustive role search — B2 —
  and our cut has no search), one plan per click within one 16 ms frame budget of pool time, amortised; the elaboration
  cache ≤ 4 KB per plan storey and LRU-capped at a §12.8 line (proposed 8 MB), evicting to `absent` (nothing is lost).
* **Bars (§13.2):** §3.3's eight hard bars and its soft bands as the "B-PLAN" fixtures (§6), and the stage-3 contract's
  fourth rung ("the union of a storey's rooms equals the rings of the wings that reach it") beside the existing "union
  of composed wings equals the outline".

### 4.3 Corrections to item 28's drafted interpretation (vetoable, each with its reason)

1. **"a partition of each wing's ring into rooms … the entrance on the frontage or access side"** — the entrance is
   item 29's *set*; the plan opens a door at every entrance and roots the circulation at the main one (item 29 (5)).
   Item 28 (a) should read "at every entrance".
2. **"a cellar where the class table says"** — the cellar is item 29 (b)'s *derived* decision (class × terrain gate ×
   prosperity × size), which the plan consumes as `Building.basement`; the plan never decides it.
3. **"stairs stacked across storeys"** is a construction rule (the stair core before the partition, §1.3), not only an
   acceptance bar; the bar then holds by construction.
4. **"the plan's outer walls are the wing rings exactly"** reads *per storey*: the rings of the wings whose `floors`
   exceed the level (a wing of fewer floors is roof at that level); a basement's outline is `Basement.ring`.
5. **"a composed tower is a round room"** — one per storey, and the tower is the stair core of the wing it joins
   (§2.4); `ComposedTower` needs no new field (centre, radius, heights exist).
6. **"a dormer sits over an upper room"** — the dependency runs the other way from today's `Wing.dormers?: number`: the
   plan places dormers from the roofed rooms with exterior demand, so `dormers` becomes derived when a plan exists and a
   free count only while the plan rung is `absent` (§2.7 d).
7. **"the `elaborate` setting" as a document setting** — view state, not a recipe or document field (§4.2), or a
   viewer's choice would enter the model's inputs.
8. **"Rung states … in `Lifecycle`/`DerivationRecord`"** — on a per-rung `ElaborationRecord` (§4.1): `Lifecycle` holds
   existence and flags of the entity, there are three rungs per building, and the states are recomputed from digests, not
   set by events (except `edited`).
9. **Per-rung re-rolls** need the rung's own reroll counter (§4.2); §6.1's reroll component must be allowed to come
   from the rung record for plan concerns — a stated extension, not a new mechanism.
10. **The cache "kept … through §2.9's snapshot mechanism"** — as non-canonical, content-addressed chunks beside
    `model`, checked by hash, dropped on mismatch, never a base (§4.1); persisting it is an optimisation the owner asked
    for, not a correctness need, because every rung is a pure function: an edited plan persists through the log.
11. **Scale (router question 2):** no modelling cell; integer centimetres, a wing-local lattice at a table module, m²
    areas by band, the VTT grid only at export (§2.5).
12. **Rooms as composition rings, not plat faces (router question 3):** the plan is derived per building, its edits are
    building-scoped, and plat faces would put every clicked building's rooms into the L4 arena and the model digest;
    the cuts run on a transient per-building arena over the same world lattice (the kernel's `splitFace`, `booleans`,
    `lir`), and the rings are written back as `PlanRoom.ring` and carried by `carryWings` when stored.
13. **`Composition.lod` keeps four values**, but `rooms` should be read as the *optional* room rings a Fantasy-Manor-class
    composer may emit (a hall, a tower) and `plan` as the rung that owns storeys, walls and openings; a simpler reading —
    three rungs, `rooms` folded into `plan` — is offered for the editor's ruling.
14. **Households** (item 31 rung 1) and **sub-locations** are inputs the draft does not name: the programme takes both
    (§2.2 step 1), so a mansion let as lodgings re-cuts into dwelling units by mutation, as item 31 asks.
15. **"furniture as abstract shapes by room role"** stands, with two rules Dwellings learned late made day-one rules:
    nothing blocks an opening or a stair bay; per-role density from the table, Dwellings' measured props per cell by role
    (exports §2.5) as the first baseline.

### 4.4 What should change (the editor's list; nothing edited here)

* **docs/AMENDMENTS-2026-09-25b.md item 28:** the wording corrections 1–15 above.
* **docs/ARCHITECTURE.md:** §2.6 the record block of §4.1 and `plan()` on `BuildingGenerator` with the fourth rung's
  contract; §2.2 rule 7 the indexed `entrance` role (item 29); §2.8 `ElaborationRecord`; §2.9 `Document.elaborations`
  and the view key `elaborate`; §4.1 the trigger-policy paragraph (click → rung, rungs ordered, the pre-assignment
  named); §5.2 the F-PLAN row; §6.1 the four `plan.*` concerns and the rung-reroll extension; §7.1 the plan events and
  `regenerate.rung`; §7.4 their lifecycle rows; §8.5–§8.6 the building band draws the plan, the stale marker at every
  band; §10.2 / §7.6 the `roomProgram` table with its slice kinds; §11.1 the `plan` block and the per-storey VTT scenes;
  §12.7 the `plan()` row; §12.8 the cache line; §13.2 the eight bars and the B-PLAN fixtures; §14 `PlanBuilder` in
  `@plat/plots` and the cache's owner; §15.2's hooks row; the staged-hooks table's stage-3 row gains the plan rung's
  hooks; §16 prices the base hooks (the records, the view key, the concerns, the events' rows — small: ≈ 2–3 days on the
  O9 line; the rung itself is staged).
* **docs/DEFINITION.md §4:** the building close-up sentence gains "… and, when clicked, its floor plan, room by room,
  drawn to fit what the building is for".

## 5. The owner's mental model, mapped onto wings, joints, blocks and towers

The owner's picture (item 28, OWNER-INSTRUCTIONS "Buildings") is shapes with heights, pushed into one another or stacked,
and connected — and a plan that "takes all of the geometry and height and pieces from the manor view". In our records
that picture is exact, word for word:

| the owner's word | what it is in the model | in plain words |
|---|---|---|
| **a shape** | a wing: `BaseWing` (rect, quad or template polygon) or a composed `Wing`, with its own footprint ring | one simple block of the building — a rectangle, a row house's slice, an apse or an octagon |
| **with a height** | `Heights` per wing: `floors`, eave and ridge above the wing's own ground datum | each block has its own number of storeys and its own roof; the building's height is its tallest block's |
| **interposed** (pushed into one another) | joints: two wings that abut share their joint's vertices one for one (§2.6 rule 1); an L is two rectangles sharing a side, a T's stem runs into its bar (the overlapping pairing, rule 4) | where two blocks meet there is one wall, and the plan may put a door through it |
| **stacked** | a wing of more storeys beside one of fewer; per storey the plan takes the wings that reach that level | an upper storey always stands on the storeys below it — a two-storey block next to a one-storey block, never a room over nothing |
| **connected** | the plan: doors and arches between rooms (across joints too), the stair core through the storeys, item 30's passage under a wing; to the outside, item 29's entrances on the wings that face the street, the yard or the court | you can walk from the street door to every room and up every storey by one stair that stands in the same place on every floor |
| **a tower** | a `ComposedTower` — a round wing with the spiral stair inside | the round room on each storey, and the stair that joins the storeys |
| **pieces from the manor view** | courts (`Composition.courts`), the porch (`Wing.porch` at the main door), dormers over roofed rooms, chimneys over hearths | the plan reads the outside and gives it back its reasons: the door under the porch, the fire under the chimney, the garret under the dormer |
| **the building type and function** | class, use, assignment, band, sub-locations, households | the list of rooms the building must have, sized to its wealth |

**One worked example, in words.** A manor on a rich street: a two-storey hall wing (the great hall with its hearth on the
ground floor, the solar above), a three-storey cross wing at one end (parlour below, chambers above), a one-storey
service wing at the other (kitchen with hearth and a yard door, pantry, brewhouse), a round stair tower in the angle
between hall and cross wing, the three wings around a court with a gate to the street. The plan's ground storey shows all
three wings; its first storey the hall and cross wings only (the service wing is roof at that level, with the kitchen
chimney rising through it); its second storey the cross wing alone; the tower is a round room on every storey with the
spiral inside; every storey's outer walls are exactly the wings you saw from above, and the roof plan you saw carries the
chimneys where the hearths are.

**What "stacked" does not mean here.** No wing overhangs a lower storey (a jetty) and no storey is wider than the one
below — Dwellings' shrinking upper floors and our wings of unequal storeys are both subsets from the ground up. A jetty
would be a wing attribute for a later era table, not a plan concern.

## 6. Risks, and the first experiment

**Risks, in order of what would hurt most (each with the mitigation the design already carries):**

1. **Fitting a partition to a programme is a packing problem**, and Dwellings' author avoided it for a reason: rooms of
   fixed target areas cut from an L-shaped wing may leave slivers or a room the wrong shape. Mitigation: the storey
   allocation (tier 0) trims the programme to the capacity before any cut; patterns are few and simple (a `spine` and a
   `bisect` cover most classes); the ladder's tiers 2–5 repair locally; the bar counts omissions. The reference's own
   record — 133 rooms for 157 asked, 37 generic — is the number to beat, not a ceiling.
2. **Our geometry is not a cell grid.** Dwellings' whole method rests on unit cells (walls on cell edges, one-cell
   stairs, a bitmask hand-off); our wings are integer-centimetre polygons, sometimes bent (a row quad's party wall).
   Mitigation: the wing-local lattice (§2.5) restores a grid per wing; a bent quad takes `bisect` only; the kernel's
   booleans and `lir` exist; the cost is bounded by a work law over the wing's lattice cells (§5.1 (5)).
3. **The stair core competes with the programme's anchors** (an entrance room, a hearth room) in small wings — a hovel
   or a one-bay row house has no room for a bay-sized stair. Mitigation: the class row's `stair.kind` (`ladder`,
   `winder` in a corner, `trapdoor` to the cellar) and the placement rule; Dwellings' trapdoor rung ≈ 1 in 90 houses
   (B16) shows how rare the last resort should be.
4. **Institutions are different in kind** — a church is a nave, a keep a stack of single rooms, a market hall one room
   over an arcade. Mitigation: the `nave` pattern and per-class rows; templates already give these buildings their wings
   (§2.6 footprint templates), so the plan only has to respect them.
5. **The mutation operator for plans** (item 18 applied to rooms) is new: what "keep what still fits" means for a room
   whose wing shrank. Mitigation: anchors by room centroid within the wing, the same hysteresis idea as §6.3's matching;
   the first experiment measures how many rooms survive a designation change.
6. **The building band's render is new** (a plan drawn inside the map at 1:50–1:200, oriented with the map, labels in
   rooms). Mitigation: the reference's readability devices (§1.7) are measured and describable; the band exists in §8.5.
7. **Determinism of the cut** under the allowlist lint: integer lattice cuts need no transcendental, but a
   `radialSplit` of a round tower does — it goes through `dmath` like every angle in the kernel (§6.5 (2)).
8. **Budget headroom**: a click must feel instant; the reference does a whole house in 2–8 ms with an exhaustive search
   we do not need, so 5 ms median is conservative, but the wing-local lattice at 50 cm on a 20 × 10 m wing is 800 cells
   — the cut must be O(cells log cells), not O(cells²).
9. **The JSON schema and the VTT storeys** must be fixed before the exporters are built (M3b) or the plan block arrives
   as a second format; the schema of §4.1 is the proposal.
10. **Scope creep toward Dwellings' surface** (five wall styles, roof options, elevation views): the plan rung draws
    one plan in the map's own style; elevations are a 3-D export question (§11.1), not a rung.

**The first experiment — what to build first to learn the most.** A standalone **B-PLAN spike** (before stage 3, on the
base's fixtures; ≈ 1 week on the builder tier, measured, no product code paths committed):

1. *Fixtures:* 24 buildings — rect, L, T, U-court, a curved-row quad, a rect with an attached round tower, a
   three-wing manor with unequal storeys — × six classes (hovel, cottage, row house, inn, smithy, manor) × three
   bands, storeys 1–4, item 29's entrance sets, a basement where the class says.
2. *Build:* the `roomProgram` table for the six classes (our own rows, calibrated on the reference's medians for the
   dwelling roles: bathroom < storage < kitchen < bedroom < living room, R13), the storey allocation, the four patterns
   `bisect`, `follow`, `spine`, `hall_and_parlour` on the wing-local lattice, the stair core first, the priced spanning
   connection with the pattern's hub, the F-PLAN ladder, and the eight bars as tests.
3. *Measure:* hard-room presence (target 100 %), reachability (100 %), stacked stairs (100 %), walls = rings (integer
   equality, 100 %), circulation share by class, room-area medians by role, plan time per building (target ≤ 5 ms
   median), determinism across Node and Chromium, and the survival rate of rooms under a designation change (house →
   inn, inn → tenement by households) — the mutation risk (5) measured.
4. *The A/B that answers the design question:* feed the reference's **twelve exported footprints** into the spike as
   wings — the exports lane already computed each ground floor's minimum rectangle decomposition (2–4 blocks, exports
   §3.1), which are the wings, at 2 m per cell — with the reference's own programme lists as the `roomProgram` rows,
   and count programme rooms realised. The reference realised 79 of 157 (§7); a function-first cut on the same shapes
   that realises the hard rooms in 12/12 and > 90 % of all items proves the inversion on the creator's own ground.
   Read the footprints with `captures/dwellings/_critic/permalink-decode.mjs` (the plan bitmask) or from the JSON cells
   directly; nothing new is captured.

What the spike does not need: the click policy, the cache, edits, the render — those are base hooks with their own tests
(§13.2's elaboration and staleness fixtures) and follow once the rung is proven on numbers.

## 7. CONFIRMED versus PLAUSIBLE; what was executed

**Executed in this lane (CONFIRMED).** One stdlib script, `captures/dwellings/_synthesis/programme-vs-rooms.py`
(output `programme-vs-rooms.out.txt` and `.out.json` beside it), over files already on disk: the twelve JSON exports of
`captures/dwellings/exports-2026-09-26/` and the two `HouseType.hx:22` lists the build printed during each real JSON
export run (`export-log.jsonl`, the run whose `name` equals the stem). It compares the printed programme (list 1 + list
2) with the rooms the partition supplied, by storey class (kitchens and halls ground-only, bedrooms upper-only, attic /
lookout / observatory top-only, cellar basement-only — the placements the exports lane measured 6/6, 6/6, 13/13). Result:

| # | house | storeys | programme | rooms (named + unnamed) | matched | list-1 rooms missing | generic rooms | upper need / have |
|---|---|---|---|---|---|---|---|---|
| 1 | s260926101-small | 3 | 14 | 5 (5 + 0) | 4 | bathroom | 1 | 2 / 1 |
| 2 | s260926102-small-tall | 4 | 14 | 6 (6 + 0) | 5 | bathroom | 1 | 3 / 2 |
| 3 | s260926103-small-organic | 2 | 11 | 3 (3 + 0) | 3 | bathroom, bedroom, laboratory | 0 | 1 / 0 |
| 4 | s260926104-medium | 3 | 13 | 13 (9 + 4) | 8 | — | 1 | 2 / 5 |
| 5 | s260926105-medium-low | 2 | 10 | 7 (6 + 1) | 5 | bedroom, lookout | 1 | 1 / 0 |
| 6 | s260926106-medium-tall | 4 | 14 | 10 (9 + 1) | 7 | bathroom, bedroom, greenhouse | 2 | 3 / 3 |
| 7 | s260926107-medium-mechanical-hallways | 1 | 9 | 5 (4 + 1) | 4 | bedroom | 0 | 1 / 0 |
| 8 | s260926108-medium-organic | 2 | 13 | 7 (7 + 0) | 6 | — | 1 | 2 / 3 |
| 9 | s260926109-large | 4 | 15 | 16 (16 + 0) | 10 | — | 6 | 3 / 9 |
| 10 | s260926110-large-tall | 7 | 17 | 24 (23 + 1) | 10 | — | 13 | 6 / 15 |
| 11 | s260926111-large-mechanical | 4 | 14 | 24 (18 + 6) | 11 | — | 7 | 3 / 14 |
| 12 | s260926112-large-organic-hallways | 2 | 13 | 13 (10 + 3) | 6 | bedroom | 4 | 2 / 7 |

Aggregate: 157 programme items, 133 rooms, 116 named, 79 matched; 7/12 houses with fewer rooms than items, 9/12 with
fewer named rooms; 7/12 with a list-1 room missing; 5/12 short of upper rooms for the bedrooms demanded; 1/12 short on
the ground floor (the one-room cottage); 37 generic rooms (Room, Corridor, Stairhall); gallery realised 0/12 (listed 12/12), attic 1/9 (listed in every house
with an upper storey).
Cross-check against the critic's independent count (B15: bathroom 8/12, bedroom 7/12, the special 9/12): identical.
"Matched" counts a programme item once per realised room of that name, so a house with two bathrooms listed and one
built matches one.

**CONFIRMED by the lanes and the critic, and cited as such:** every Dwellings number and quotation in §0–§3 — the
pipeline order and its once-per-house stages (R7, R14), the two programme lists (R8), the tag effects paired by seed (R9),
the geometry statistics (R10), the JSON schema and its graph facts (R13), the permalink encodings (R1, R2), the re-roll
contract (profile §3.4, B17), the cost medians and their nesting (R15, B2), the roof rule (R12, B1), the stairwell roll
(B8), the basement target (B6), the absent bathroom–bedroom attachment (B7), the trapdoor (B16), the determinism across
sessions (R4, R5) and the 62 quotations checked at source (critic §3). Where a reader's inference was corrected, this
file carries the correction, never the reader's text.

**PLAUSIBLE (reasoning only):** every design proposal in §1's "Ours" paragraphs, §2, §3, §4 and §5 — the patterns, the
programme rows, the ladder, the records, the concerns, the events, the budgets (5 ms, 20 ms, 4 KB, 8 MB), the bars'
attainability, the mutation rule, the corrections to item 28 and the experiment's expected outcome — until the B-PLAN
spike of §6 executes them. Also PLAUSIBLE, from the readers: the cut rule inside `divideArea`, the priced-connection
reading of `Door.*`, the meaning of `getStairCells = 0`, and the implied cell size of 1.5–2.5 m.

**Not done, deliberately:** no new capture, no export, no reading of any captured bundle; the reference's roof, elevation
and Gothic / Tavern room sets were not measured beyond the readers (critic §4 items 13); "Open in Dwellings" from the
settlement generators (critic §6 gap 1) is the confidence lane's next measurement, not this lane's — it decides how the
reference's integrators rasterise a footprint, which our rung does not do.
