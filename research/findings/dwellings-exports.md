# dwellings-exports — watabou's Dwellings: the generator's own JSON and SVG exports of twelve houses

> PENDING FABLE REVIEW — Opus-produced (lane `dwellings/exports`, Opus role); a Fable critic and a confidence assessment follow.

Lane `dwellings/exports`, 2026-09-26. Build 17195045 (https://html-classic.itch.zone/html/17195045/bin/index.html).
Owner approval: 2026-09-26 (docs/PROGRESS.md J35) to save the generator's own JSON and SVG exports of the twelve houses in
`captures/dwellings/exports-2026-09-26/seeds.json` into that folder. The exports are reference measurements of watabou's output,
never to be copied into any product (clean-room). No captured JavaScript bundle was opened; no code or asset is reproduced here.
STATUS: COMPLETE (§0–§5), 2026-09-26.

Evidence tags: **[STATED]** the creator documents it (post cited) · **[SHOWN]** observed in a file or capture (cited) ·
**[INFERRED]** reasoning given. Conclusions are labelled **CONFIRMED** (executed or read on disk) or **PLAUSIBLE**.

## 0. Headline findings

1. **Export is menu-only [CONFIRMED].** Build 17195045 has no `export=` URL key: the URL-key probe gave no download, and the app dropped the key.
   - The menu (right-click, or the "=" button) has *Export > as PNG / as SVG / as JSON / Advanced…*.
   - The JSON always holds the whole house.
   - *as SVG* and *as PNG* give only the current floor [STATED 1.3.2]. *Advanced…* (also key X [STATED 1.3.6]) exports all floors as a 2-column table at 100 dots per cell.
   - `profiler/export.mjs` now drives menus (`--actions`). All 24 files were captured, each with Blob = download. Every repeat was byte-identical, although the canvas lighting varies between loads.
2. **The JSON is a compact grid model [SHOWN]:** `floors[{level, rooms[{name?, cells[{i,j}]}], doors[{edge{cell,dir}, type?}], windows[{cell,dir}], stairs[{cell,dir,up}]}], exit{cell,dir}, spiral?{cell,dir}`, in 3–22 kB.
   - i is the row (south), j the column (east). One grid is shared by every storey. There are 0 violations in 482 checks.
   - The file has **no version, seed, tags, name, units, furniture, lights or wall geometry**.
3. **Rooms are sets of cells that partition each storey. The role exists only as the display name.**
   - 21 names; `Room` is generic.
   - 17 rooms are unnamed: 1-cell stair shafts and 1–2-cell passages.
   - Areas are in cells only. watabou says he does not know the scale and aims only to make the bathroom the smallest room [STATED]. The data follows: bathroom 2, storage 3, bedroom 6, living room 7.5, cellar 8.5 (medians).
4. **Doors are edge records of three kinds.**
   - `REGULAR` is a door with a leaf (52).
   - A missing `type` is an opening without a leaf (34), which mostly touches circulation.
   - `NULL` is an edge with no wall, only at stair shafts (9).
   - The default SVG (*Doors: Hidden*) draws the first two identically, as a gap of a third of the cell edge. The live app's *Simple* and *Open* modes add leaves to `REGULAR` only [SHOWN].
5. **Every storey and every house is a tree [CONFIRMED].**
   - Doors form a spanning tree on each of the 38 storeys.
   - With the single exit, one stair per storey pair and the spiral added, each house is one tree rooted at the street: no loops, no second entrance, nothing unreachable.
   - 62 % of rooms have one door on their storey.
   - Depth from the street runs from public to private: Hall 1, Living room and Kitchen 2, then Bedroom, Bathroom and Storage 6 (medians).
6. **Stairs are cell pairs.**
   - An `up` record on L and a `down` record on L+1 share the same cell (19/19).
   - Every stair end fills one cell: two flights of 5 treads plus a landing on the `dir` side (38/38). That is a U, half-turn stair (15) or an L, quarter-turn stair (4).
   - Tall houses may use one house-level `spiral` turret linking all storeys from the ground up (2 houses). 1-cell stair shafts can stack through 3–4 storeys.
7. **Storeys stack inside the ground-floor footprint [SHOWN].**
   - Upper floors (17/17) and basements (9/9) never overhang it, and upper floors shrink with height, to 33 % in the seven-storey house.
   - Size tags are clean ground-floor bands: 11–15, 19–24 and 29–33 cells.
   - Footprints are 2–4 rectangles with no holes.
   - Kitchens and Halls are always on the ground floor. Bedrooms are never there. Attic, Lookout and Observatory each occur on the top storey. Basements have no windows.
8. **The SVG is a styled superset of the JSON geometry, with no semantics [SHOWN, cross-checked].**
   - It is one `scale(D)` group in cell units. Each storey is a tile of 4 groups: roofs of lower storeys, the plan, then label outline and label fill.
   - The plan has 9–10 layers in a fixed order: earth hatch, floors, grid, props, stairs, AO (multiply), lights (plus-lighter), walls (outline then fill; exterior walls 0.16 cell thick, interior 0.06), windows, and an empty group. A roof tile comes last.
   - There are no ids or classes beyond the gradients and no `Z`. The font is referenced (Google Fonts, Share Tech), not embedded.
   - Room polygons, areas, windows, stairs and labels equal the JSON on all 38 storeys. The SVG abbreviates one-cell bathrooms to `BTH` and adds the spiral's slit window.
9. **What only the side channels give.**
   - The **console** gives the room *program* (`HouseType.hx`): `[living room, bathroom, bedroom, <special>]` plus a pool. The Living room is realised 12/12 and the special room 9/12. No gallery or study was realised in any house, and small houses have no bathroom or kitchen.
   - The **filename** gives the house name.
   - The **permalink** gives seed and tags.
   - Keep all three beside the files.

## 1. The JSON schema as observed

**What the file is [SHOWN, all twelve files; `export-log.jsonl`].**
- One JSON object per house. It is pretty-printed with 2-space indentation and is 3 444–22 330 bytes long.
- It is written by the menu item *Export > as JSON*, as a Blob of type `application/json`, and saved as `<house_name>.json`. The house name, e.g. `country_house`, exists only in the filename.
- There is one form only. The whole house, every floor, is always in the file; there is no per-floor JSON.
- watabou calls the structure "fairly self-explanatory" and the JSON an **export, not a save**: it cannot be loaded back [STATED, Patreon 143565705, 1.4.0]. He also said it would give "enough data to easily reconstruct the graph of each floor (and the entire house)" [STATED, devlog comments 2025-11-12]. That holds (§1.6).

### 1.1 Field table

The union over the twelve files. Counts are over all twelve.

| path | type | values seen | meaning | evidence |
|---|---|---|---|---|
| `floors` | array, 1–7 items | order in the file: ground floor, upper floors ascending, basement last (e.g. `[0, 1, 2, -1]`) | one record per storey | SHOWN |
| `floors[].level` | int | −1 (9 houses), 0 (12), 1 (9), 2 (5), 3, 4, 5 (1 each) | −1 = basement, 0 = ground floor, n = n-th upper floor. The SVG labels them B, GF, 1F… | SHOWN |
| `floors[].rooms` | array, 1–8 items | 133 rooms in all | the rooms of the storey. They **partition** its cells: no cell is in two rooms, every room is 4-connected. [CONFIRMED by script] | SHOWN |
| `…rooms[].name` | string, **optional** | 21 distinct values, e.g. `Room` ×22, `Bedroom` ×13, `Living room` ×12, `Bathroom` ×12, `Cellar` ×8, `Corridor` ×8, `Stairhall` ×7; absent on 17 rooms | the room's role, written as its display label. It is absent on 1-cell stair shafts (9) and on 1–2-cell passages (8), and those get no label in the drawing. The user can rename rooms by clicking a label [STATED, comments 2025-09-22], so the export carries the *current* name, not a role code. | SHOWN / STATED |
| `…rooms[].cells` | array of `{i, j}`, 1–11 items | median 6 | the room's grid cells. The order is a growth order: every cell touches an earlier one (133/133 rooms) [SHOWN]. That is PLAUSIBLY the order in which the generator grew the room [INFERRED]. | SHOWN |
| `…cells[].i`, `.j` | int ≥ 0 | i 0–8, j 0–7 | **i = row, growing south; j = column, growing east.** The grid is shared by all storeys and starts at 0. | CONFIRMED (below) |
| `floors[].doors` | array, 0–7 items | 95 in all | openings between two rooms of the same storey | SHOWN |
| `…doors[].edge` | `{cell:{i,j}, dir}` | `dir` ∈ n (30), e (25), w (24), s (16) | the wall between `cell` and its neighbour on side `dir`. Each opening is listed once, from either side. | CONFIRMED |
| `…doors[].type` | string, **optional** | `REGULAR` 52 · absent 34 · `NULL` 9 | `REGULAR` is a doorway with a door leaf; absent is an opening with no leaf; `NULL` is an edge with no wall at all (§1.4) | SHOWN + INFERRED |
| `floors[].windows` | array, 0–23 items | 375 in all; none in any basement | a window on side `dir` of `cell`, always an exterior edge | CONFIRMED |
| `floors[].stairs` | array, 0–2 items | 38 records | one record per stair end on this storey | SHOWN |
| `…stairs[].cell` / `.dir` / `.up` | `{i,j}` / n,e,s,w / bool | up 19, down 19 | `up: true` means this end climbs to level+1, `false` means it descends to level−1. `dir` is the side of the cell that holds the stair's landing, where it turns (38/38 against the SVG glyph, §2.5). | SHOWN |
| `exit` | `{cell, dir}` | exactly one per house | the **only** entrance: an exterior edge of a ground-floor cell (12/12). The drawing puts steps and an arrow outside it. | CONFIRMED |
| `spiral` | `{cell, dir}`, **optional** | 2 houses (rows 2 and 10, both *tall*), `dir` = e in both | a spiral staircase, drawn as a round turret at the `dir` side of `cell`. It links every storey from the ground floor up. Storeys it serves list no `stairs` record for that link. | SHOWN |

**Grid convention [CONFIRMED by `stats.py` check_convention].** With 'n' = i−1, 's' = i+1, 'e' = j+1, 'w' = j−1, the data has no exceptions:
- every one of the 375 windows lies on an exterior edge;
- every one of the 95 doors joins two different rooms of its storey;
- all 12 exits lie on an exterior edge of the ground floor.

The transposed reading fails 264, 68 and 10 times respectively. The SVG agrees: inside each storey's plan group, x = j and y = i, with room polygon bboxes equal to the cells' bboxes on all 38 storeys (§2).

### 1.2 Floor structure [SHOWN, §3 tables]

- Storeys stack on one grid. Every upper storey lies inside the ground-floor footprint (17/17), and so does every basement (9/9). Nothing overhangs.
- Upper storeys keep 21–100 % of the ground-floor cells and shrink with height. The seven-storey row 10 keeps 82, 58, 39, 36 and 33 %.
- Basements hold 38–100 % of the ground floor.
- The roof is not in the JSON at all. The SVG draws it (§2.8).

### 1.3 Room records: shape, role, area

- **Shape.** A room is a set of cells.
  - 81 of the 133 rooms are rectangles.
  - The rest are L- and T-shaped unions that fill a median 0.70 of their bounding box.
  - Cellars (1/8), libraries (0/4), halls (2/6), corridors (2/8) and living rooms (3/12) are mostly not rectangles; bedrooms (11/13) and bathrooms (11/12) mostly are.
- **Role.** The role exists only as the name. `Room` (22 rooms) is the generic role, present in 7 of 12 houses. There is no separate role field, no id and no number.
- **Area.** The unit is the grid cell and **nothing else**. There is no metre or foot scale anywhere, and watabou says he does not know the scale either. He aims only at the ordering: "make the bathroom the smallest room and the ballroom the largest" [STATED, comments 2025-09-22].
  - The data follows that ordering. Bathroom has a median of 2 cells, Storage 3, Corridor 4, Kitchen 4.5, Bedroom 6, Living room 7.5 and Cellar 8.5 (§3.4).

### 1.4 Walls, doors and windows

- **Walls are implicit [SHOWN].** Every cell edge between two different rooms, or between a room and the outside, is a wall unless a door record opens it. The JSON has no wall thickness, no wall list and no exterior/interior flag. In the SVG, exterior walls are 0.16 cell thick and interior walls 0.06 (§2.5).
- **The three door types.** In the default *Layers > Doors > Hidden* mode the SVG draws `REGULAR` and type-less openings **identically**: a gap covering a third of the edge (wall coverage 0.64–0.70 on all 86). `NULL` edges carry no wall at all (coverage 0–0.03).
  - The live app's other door modes separate the first two. *Simple* draws a closed leaf and *Open* draws a swung leaf in each `REGULAR` gap, while type-less gaps stay open (`captures/dwellings/exports-2026-09-26/ui/door-modes-hidden-simple-open.png`, row 4) [SHOWN].
  - So `REGULAR` = a door, absent = a doorless opening (arch), and `NULL` = a fully open side [INFERRED from those two observations].
  - `NULL` occurs only where a 1-cell stair shaft opens onto its neighbour (9/9).
  - Type-less openings favour circulation rooms: 24 of 34 touch a Corridor, Hall, Stairhall or unnamed passage. `REGULAR` doors mostly join two rooms that are not circulation (30 of 52) (§3.6).
- **Windows** are edge records with no size and no position along the edge. The SVG draws each one as a centred glyph a third of the edge long (§2.5).

### 1.5 Stairs, the spiral, furniture, the entrance

- **Stairs.** A flight between levels L and L+1 is the pair (an `up` record on L, a `down` record on L+1) **at the same cell** (19/19 pairs matched).
  - Each end occupies exactly one cell.
  - The two ends' `dir` agree on half-turn stairs (U, 15 stairs) and differ on quarter-turn stairs (L, 4 stairs), where they name the two sides of the corner landing.
  - One cell can hold both an `up` and a `down` record, a stair shaft that continues (rows 4, 11).
  - There is never more than one stair between the same two storeys [SHOWN].
  - The *stairwell* tag that stacks all stairs [STATED, 1.4.0] is not in this seed set, but rows 4 and 11 stack their shafts at one cell anyway.
- **Spiral.** It is a single house-level record, not a per-floor one. It links the rooms that contain its cell on every level ≥ 0.
  - In row 2 the spiral cell also lies inside the Cellar, but the basement is reached by an ordinary stair. This matches "connecting all floors (except the basement)" [STATED, 1.4.0; INFERRED for row 2].
- **Furniture** is absent from the JSON [SHOWN]. The SVG has it as abstract glyphs (§2.5).
- **Entrance.** `exit` is the only link to the outside. It opens from a Hall in 6 houses, a Living room in 4, a Kitchen in 1 and a generic Room in 1.

### 1.6 The room graph, ids and cross-references

**Nothing in the file is an id.** Rooms are referenced by position only: the storey's `level` and the room's index in `rooms`. Every cross-reference goes through a cell: doors, windows, stairs, `exit` and `spiral` all name cells, and the room is found by cell membership. Reconstructing the graph takes a cell-to-room map per storey and the four direction offsets [CONFIRMED, `stats.py` whole_graph()]:

| edge | how it is found |
|---|---|
| door | the room of `edge.cell` and the room of its neighbour across `dir`, on the same storey |
| exit | OUTSIDE and the ground-floor room holding `exit.cell` |
| stair | the room holding an `up` record's cell on L and the room holding the same cell on L+1 |
| spiral | the rooms holding `spiral.cell` on consecutive levels ≥ 0 |

**Result [CONFIRMED].**
- Every storey's door graph is **connected and a tree**: E = V − 1 on all 38 storeys.
- With the exit, the stairs and the spiral added, **every house is one tree** rooted at the street, with no cycles and nothing unreachable. There is exactly one route between any two rooms.

**Version fields: none [SHOWN].** The JSON has no generator, version, seed, tags, style, name or date. By contrast, MFCG's GeoJSON has a `values` feature with `generator` and `version` (captures/mfcg/exports-2026-09-25/README.md). A consumer cannot tell which build wrote a file. Keep the permalink (`?seed=&tags=`) and the build id beside it, as `seeds.json` and this lane's README do.

### 1.7 Two decoded examples [SHOWN, generated from the files by script]

In the maps below:
- a letter is a room;
- an uppercase letter is a room cell that holds a stair end;
- `.` is outside the storey;
- doors are written as `(i, j)side:room-room type`.

**Example A — row 1, small, "country_house"** (`s260926101-small.json`, 6098 bytes; top-level keys ['floors', 'exit']; exit (1, 3) side 'e')

```
level -1: a=Cellar[7], b=Room[6]
  i=0  . a b b
  i=1  A a b b
  i=2  a a b b
  i=3  a a . .
  doors  : (0, 1)e:a-b (no type)
  stairs : (1, 0) dir n up
  windows: 0
level 0: a=Living room[7], b=Studio[6]
  i=0  . a a A
  i=1  A a a a
  i=2  b b b b
  i=3  b b . .
  doors  : (1, 3)s:a-b REGULAR
  stairs : (0, 3) dir n up; (1, 0) dir w down
  windows: 13 ((0, 1)w (0, 3)e (1, 0)w (0, 1)n (0, 2)n (0, 3)n ...)
level 1: a=Bedroom[7]
  i=0  . a a A
  i=1  a a a a
  i=2  . . . .
  i=3  . . . .
  doors  : -
  stairs : (0, 3) dir n down
  windows: 4 ((1, 3)s (1, 2)s (1, 1)s (1, 0)s)
```

**Example B — row 4, medium, "forlorn_residence"** (`s260926104-medium.json`, 11355 bytes; top-level keys ['floors', 'exit']; exit (0, 4) side 'n')

```
level -1: a=(no name)[1], b=Cellar[8], c=Room[6]
  i=0  c c c . . .
  i=1  c c c . . .
  i=2  . b b . . .
  i=3  . b b b b .
  i=4  . b b A . .
  doors  : (4, 3)n:a-b NULL; (2, 2)n:b-c (no type)
  stairs : (4, 3) dir s up
  windows: 0
level 0: a=(no name)[1], b=(no name)[2], c=Hall[8], d=Armoury[7], e=Kitchen[5]
  i=0  c c c c c c
  i=1  d d d d c c
  i=2  . d d d b .
  i=3  . e e e b .
  i=4  . e e A . .
  doors  : (4, 3)n:a-e NULL; (2, 4)n:b-c (no type); (2, 4)w:b-d REGULAR; (3, 4)w:b-e REGULAR
  stairs : (4, 3) dir s up; (4, 3) dir s down
  windows: 14 ((4, 3)s (4, 3)e (0, 0)n (0, 1)n (0, 2)n (0, 3)n ...)
level 1: a=(no name)[1], b=Bathroom[4], c=Living room[6], d=Bedroom[6], e=Bedroom[6]
  i=0  d d d e e e
  i=1  d d d e e e
  i=2  . c c c c .
  i=3  . b b c c .
  i=4  . b b A . .
  doors  : (4, 3)n:a-c NULL; (3, 1)n:b-c REGULAR; (2, 2)n:c-d REGULAR; (2, 3)n:c-e REGULAR
  stairs : (4, 3) dir s down
  windows: 14 ((4, 3)s (4, 3)e (2, 1)w (3, 4)s (2, 4)e (3, 4)e ...)
```

How to read the examples:
- **Example A.** The ground floor's two rooms meet at one `REGULAR` door. The L-shaped Living room holds the exit, a half-turn stair up at (0, 3) and a quarter-turn stair down at (1, 0).
  - In the basement the same (1, 0) cell holds the `up` end with `dir` n. The ground-floor end says w: the L stair's corner landing is north-west.
  - The first floor is one 7-cell Bedroom over the Living room's footprint. The Studio part of the ground floor is roofed.
- **Example B.** A 1-cell unnamed stair shaft at (4, 3) runs through all three storeys. It opens by a `NULL` edge into the Cellar, the Kitchen and the Living room in turn, and holds an `up` and a `down` record on the ground floor.
  - The 2-cell unnamed passage b joins the Hall (an opening with no type), the Armoury and the Kitchen (`REGULAR` doors). It is unlit and unlabelled in the drawing.
  - The first floor has the same 23-cell footprint as the ground floor.

## 2. The SVG structure

This section describes the files; no asset is reproduced. The source is the twelve Advanced exports taken with the dialog's defaults (§5). Counts come from `stats.py` and the layer outlines from `svgstruct.py` and `svglayers.py` in the scratchpad. The two offline renders I looked at are row 4 and row 10, drawn with external requests blocked. Every statement is [SHOWN] unless it is marked otherwise.

### 2.1 Document

- **Size.** 122–1 730 kB, written as essentially one line.
  - It opens with an XML prolog, then a root `<svg>` with `width` and `height` in **pixels** and **no `viewBox`**.
  - The root sets defaults for everything below it: round joins and caps, even-odd fill rule, no fill.
- **Root children, in this order:**
  1. a full-size background `<rect>` in the paper colour;
  2. **one** `<g transform="scale(D D)">`, where D = *Dots per cell* (100), so all geometry below it is in **grid cells**;
  3. a `<style>` whose CDATA holds a single `@import` of a Google Fonts stylesheet for **Share Tech**;
  4. a `<defs>` holding every gradient.
- **Gradients.** They are numbered `grad1…gradN`, with 57–296 per file, `gradientUnits="userSpaceOnUse"`, and 5–6 stops each.
- **Styling.** There are **no classes, no ids other than the gradients', no `<use>`, no symbols and no clip paths**. All styling is presentation attributes: fill, stroke, stroke-width, stroke-opacity, fill-opacity, per-path joins and caps. The exceptions are a `style` attribute for `mix-blend-mode` on two layers and the `font` shorthand on text.
- **Placeholders.** Every `<g>` begins with a placeholder `<path d=" M 0,0"/>`. The count of placeholders equals the count of `<g>` in all twelve files. MFCG's SVG writer does the same (captures/mfcg/exports-2026-09-25/README.md), PLAUSIBLY because the two generators share one SVG writer.
- **Path data.** Absolute `M x,y L x,y …`, with `Q` where a line curves (stair arrows, the spiral and the roof's small curved shapes). Over all twelve files the only commands are M, L and Q: no arcs, no relative commands and **no `Z`**. A closed outline repeats its first vertex instead, and a room outline lists **every lattice point** along its boundary (unit steps). Round props are 16-vertex polygons.
- **Elements.** Over all twelve files only these element types occur: `svg`, `rect`, `g`, `path`, `text`, `tspan`, `style`, `defs`, `linearGradient`, `radialGradient` and `stop`.

### 2.2 How floors are laid out

- **Tiles.** One tile per storey plus a roof tile, in the order B, GF, 1F, …, R. They fill a table two tiles wide, row by row, which is the dialog's default "As table 2 × N". For example:
  - `B GF / 1F R` for three storeys;
  - `B GF / 1F 2F / 3F 4F / 5F R` for row 10.
- **Tile size.** Every tile is the same size: the house's extent over all storeys plus **4 cells** in each axis. For example, 4 × 4 cells gives an 8 × 8 tile, and 5 × 9 gives 9 × 13.
- **Plan position.** Within a tile, the plan's origin (cell i = 0, j = 0) sits at tile centre − ⌊extent / 2⌋. That is a 2-cell margin for even extents and 2.5 for odd ones, so a house with an odd extent sits half a cell off-centre. The rule fits all 24 axes [SHOWN]; that it is the generator's intended rule is [INFERRED].
- **Canvas size.** 2 × tile width × D by rows × tile height × D pixels, from 1 800 × 1 100 (a one-storey house) to 2 200 × 4 000 (row 10) here.
- **Coordinates.** A consumer recovers cells with (x / D − tile origin − plan offset) = j and the same for y and i. Room polygons in the file have **integer** vertices on the cell lattice.
- **Floor names.** Each tile carries its name (B, GF, 1F…, R) as a large pale `<text>` at its top-left corner. It is placed with translate(0.125, 0.125) and scaled by 0.063, which makes the glyphs about 1.8 cells tall.

### 2.3 The groups of one storey

At the tile's translate there are four sibling `<g>`, always in this order:

| # | group | content |
|---|---|---|
| 1 | underlay | the roofs of the storeys **below**, drawn in full and then covered by this storey's plan, so that the parts of lower storeys this storey does not cover read as roof (as does the ground-floor entrance canopy and arrow). It is empty on the lowest storeys. Each roof level further down is dimmed by a veil, a tile-sized rect in the paper colour at 10 % opacity, placed after it. |
| 2 | plan | the drawing itself: 9 layers, or 10 on basements (§2.4) |
| 3 | label outlines | one sub-group per room label with the group attributes `stroke` (dark brown) and `stroke-width 2`. This is the first of two passes of the same `<text>`s, which gives a dark halo. |
| 4 | label fills | the same label sub-groups again, without the stroke |

After all storeys comes the **roof tile R**. It holds one roof layer per above-ground storey, lowest first, each lower one followed by the veil: 1 layer for a one-storey house, 6 for row 10.

### 2.4 Plan layers, in fixed order [SHOWN on all 38 storeys]

| # | layer | how it is drawn |
|---|---|---|
| 0 | *earth hatch* (basements only) | one path of short black strokes (0.02) around the outside of the walls, reaching 0.35 cells out |
| 1 | room floors | **one closed polygon per room**, the outline of its cell union, filled and stroked in the floor colour. On the ground floor 3 more paths add the entrance outside the exit edge: a 0.75 × 0.45-cell landing, three step lines and an arrow pointing in. On spiral storeys 3–4 more paths add the turret (§2.6). |
| 2 | grid | one path of short dash segments on the cell lines, black at 40 % opacity. The default *Layers > Grid* style is *Dots*. The menu also offers Hidden, Solid, Dashes, Planks, Tiles and Double (`ui/menus-grid-doors-labels.png`). |
| 3 | props | the abstract furniture (§2.5) |
| 4 | stairs | treads and arrows (§2.5) |
| 5 | AO | `mix-blend-mode: multiply`. It holds: 0.5-cell strips along every wall, each with a linear gradient of dark grey from 50 % to 0 %; quarter discs at inner corners, each with a radial gradient; and white radial gradients at the light positions. The white gradients lighten the shading near a light before the group is multiplied onto the floor [INFERRED]. This is the vector "inner shading" of 1.2.0 [STATED]. |
| 6 | lights | `mix-blend-mode: plus-lighter`. It holds **one polygon per lit room**, the room outline, filled with a warm radial gradient (yellow to orange, fading out over about 1.7–1.9 cells). Corridors, unnamed passages and the Secret passage are unlit, which fits "the lights in the corridors are off by default" [STATED, 1.4.0]. |
| 7 | walls | every wall piece drawn twice: first a black outline pass (fill and stroke black, width 0.04, miter joins, square caps), then a grey fill pass. Pieces are cut per cell edge. **Exterior walls are 0.16 cells thick**, set outward from the cell boundary (−0.03 to +0.13). **Interior walls are 0.06 thick**, centred on it. Square posts (0.11) sit at the junctions. A door edge is drawn as two stubs with a gap of about a third of the edge. A `NULL` edge has no wall. |
| 8 | windows | each window is a line **0.32 cells long**, centred on its edge on the wall's centre line: a black stroke 0.2 wide under a grey stroke 0.16 wide, butt caps |
| 9 | (empty) | always empty in these exports (38/38). PLAUSIBLY the door-leaf layer of the *Simple* and *Open* door modes (§1.4), which the default *Hidden* mode leaves unused. |

### 2.5 Glyphs

- **Doors.** In the default mode there is no door glyph: an opening is a gap in the walls layer, the same for `REGULAR` and type-less (§1.4).
- **Windows.** See layer 8. The spiral turret has its own curved slit window, half the length (0.16). It is the only window the JSON does not list: one per spiral storey, 9 in all.
- **Stairs.** Every stair end fills one cell with **two flights of 5 treads**, each tread 0.1 × 0.5 cells, filled wood-brown with a thin black outline, plus **one landing**. The landing is 1 × 0.5 cells for a half-turn (U) stair and 0.5 × 0.5 in a corner for a quarter-turn (L) stair. That is 11 pieces per stair in all 38 ends.
  - The landing always lies on the JSON `dir` side: U 30/30, L 8/8.
  - One stroked arrow per stair end runs along the flights and shows the direction of travel with an arrowhead. It curves with `Q` segments where it turns (19 of 38).
  - A cell that holds both an `up` and a `down` record draws one U glyph whose flights run opposite ways, with two arrows.
- **Spiral stair.** It sits in the floor layer: a disc of radius 0.7 cells centred on the outer corner of the spiral cell on the `dir` side, so it protrudes as a round turret. It carries 17 radial tread lines, a curved arrow outside it and a slit window. The roof tile gives it a conical roof (row 10 render).
- **Props, or "abstract furniture".** Each prop is drawn in three passes:
  1. an outline stroke, black at 40 % opacity and 0.04 wide;
  2. a fill in light wood-brown;
  3. an inner stroke, black at 40 % and 0.02 wide.
- **Prop shapes.** They are rectangles, rounded shapes (16-vertex polygons that read as circles) and L-shapes. Special glyphs are sub-groups with their own translate. They occur only in Studios (2), Chapels (2) and the Trophy room (1). The Studio's is a star in a circle (row 1 screenshot, row 10 render).
  - watabou chose abstract shapes on purpose, to stay "setting-agnostic": "there is no such thing as a setting-agnostic table" [STATED, comments 2025-09-22].
  - Counts: 3–51 props per house. Every prop's centre falls inside a room.
  - The density varies by role, in props per cell (median): Cellar 0.78, Attic 0.75, Storage 0.60, Library 0.59, Workshop 0.58, Kitchen 0.50, Bathroom 0.50, Room 0.43, Bedroom 0.33, Living room 0.30, Hall 0.23, Stairhall 0.20. Corridors, passages and stair shafts have none.
- **Labels.**
  - **Placement.** One `<text>` per named room, positioned by its sub-group: translate to the room's label point, then `rotate(-90)` for tall narrow rooms, then a scale factor that fits the room (0.016–0.032 in these files).
  - **Text.** Every text uses `style="font: 28px Share Tech"`, a pale cream fill and `dominant-baseline: text-before-edge`. It is centred by its own translate. Two-word names can break over two `<tspan>` lines (e.g. "Living / room").
  - **Abbreviation.** One-cell bathrooms are labelled **`BTH`** (4 cases), while the JSON keeps "Bathroom".
  - **Font.** The font is only referenced, never embedded. Offline or in an editor without Google Fonts, a fallback serif renders (the two renders).
  - **Label modes.** *Layers > Labels* offers Names (the default), Numbers and Hidden.

### 2.6 What changes with the storey

- **Basement.** It adds the earth hatch and has no windows (0 of 9 basements).
- **Ground floor.** It adds the entrance.
- **Upper storeys.** They get the underlay of lower roofs. The ground-floor entrance canopy and arrow still show on every upper tile and on R, drawn as part of the underlay (row 4 render).
- **Spiral storeys (rows 2 and 10).** They add the turret on every level ≥ 0, never on the basement.

### 2.7 Relation to the JSON [CONFIRMED by `stats.py`]

These counts match on all 38 storeys:
- room polygons = JSON rooms;
- polygon areas = cell counts;
- polygon bounding boxes = the cells' bounding boxes (x = j, y = i);
- full-length window glyphs = JSON windows;
- stair arrows = JSON stair records;
- labels = named rooms, once `BTH` is read as Bathroom.

Two things differ:
- the SVG adds the spiral slit windows;
- the SVG leaves out the `REGULAR`/type-less distinction, which it would show only in the other door modes.

The SVG is therefore a **superset of the JSON's geometry**, with lights, AO, props, roofs, the entrance glyph, label placement and wall thickness added. It is not a substitute for the JSON's semantics: `REGULAR` versus absent versus `NULL` doors and `up`/`down` are easier to read from the JSON, and names are abbreviated in the SVG.

### 2.8 The roof tile

- **Layers.** One layer per above-ground storey. Each is drawn as courses of roof tiles: pairs of strokes, a dark one 0.1 wide under a light one 0.06 wide, in five to six shade pairs. Each pair is PLAUSIBLY one roof-face orientation [INFERRED from the renders, where each hip face has one tone].
- **Outlines and dark shapes.** Thin black outlines trace the eaves, hips and ridges. There are also 6–10 small black curved shapes per layer, PLAUSIBLY flue openings and tile-end shadows.
- **What the renders show.** Hipped roofs over each rectangular block. Chimneys are small grey squares with a black flue. The spiral turret has a conical roof.
- **Fading.** Lower roof levels fade under stacked veils.
- **Not in the JSON.** No roof information is in the JSON at all.


## 3. Statistics over the twelve houses

Everything in this section is regenerated by `python3 captures/dwellings/exports-2026-09-26/stats.py --md`, run from that folder. It uses the standard library only and also writes `stats.json`. All values are [SHOWN] in the files and CONFIRMED by executing the script.

The sample is small. There are **3 small, 5 medium and 4 large** houses (seeds 260926101–112), with the tags given in the table below. "Always" and "never" therefore mean *in these houses*.

### 3.1 Per house


| # | stem | house (download name) | tags written back | levels | basement | floors above ground | GF cells | GF bbox (rows x cols) | GF fill | GF reflex corners | GF min rectangles | rooms | named | doors | windows | stairs | spiral | exit room |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | s260926101-small | country_house | small | -1..1 | yes | 2 | 13 | 4 x 4 | 0.812 | 2 | 3 | 5 | 5 | 2 | 17 | 4 | no | Living room |
| 2 | s260926102-small-tall | forlorn_cottage | small,tall | -1..2 | yes | 3 | 15 | 5 x 5 | 0.6 | 3 | 3 | 6 | 6 | 2 | 23 | 2 | yes | Hall |
| 3 | s260926103-small-organic | cabin_by_the_sea | small,organic | -1..0 | yes | 1 | 11 | 5 x 3 | 0.733 | 4 | 4 | 3 | 3 | 1 | 7 | 2 | no | Living room |
| 4 | s260926104-medium | forlorn_residence | medium | -1..1 | yes | 2 | 23 | 5 x 6 | 0.767 | 3 | 3 | 13 | 9 | 10 | 28 | 4 | no | Hall |
| 5 | s260926105-medium-low | residence_by_the_sea | medium,low | -1..0 | yes | 1 | 23 | 5 x 6 | 0.767 | 2 | 2 | 7 | 6 | 5 | 15 | 2 | no | Living room |
| 6 | s260926106-medium-tall | forlorn_manor | medium,tall | -1..2 | yes | 3 | 19 | 4 x 5 | 0.95 | 1 | 2 | 10 | 9 | 6 | 30 | 6 | no | Hall |
| 7 | s260926107-medium-mechanical-hallways | residence_in_the_mountains | medium,mechanical,hallways | 0..0 | no | 1 | 21 | 7 x 5 | 0.6 | 3 | 3 | 5 | 4 | 4 | 19 | 0 | no | Hall |
| 8 | s260926108-medium-organic | lonely_residence_on_the_hill | medium,organic | 0..1 | no | 2 | 24 | 5 x 6 | 0.8 | 2 | 2 | 7 | 7 | 5 | 30 | 2 | no | Hall |
| 9 | s260926109-large | odd_lakeside_residence | large | -1..2 | yes | 3 | 32 | 9 x 5 | 0.711 | 2 | 3 | 16 | 16 | 12 | 53 | 6 | no | Kitchen |
| 10 | s260926110-large-tall | castle_in_the_mountains | large,tall | -1..5 | yes | 6 | 33 | 6 x 7 | 0.786 | 3 | 4 | 24 | 23 | 17 | 58 | 2 | yes | Room |
| 11 | s260926111-large-mechanical | forest_house | large,mechanical | -1..2 | yes | 3 | 32 | 9 x 6 | 0.593 | 3 | 3 | 24 | 18 | 20 | 63 | 6 | no | Hall |
| 12 | s260926112-large-organic-hallways | riverside_residence | large,organic,hallways | 0..1 | no | 2 | 29 | 5 x 8 | 0.725 | 2 | 3 | 13 | 10 | 11 | 32 | 2 | no | Living room |


- **Glossary.** GF means the ground floor. Fill is the GF cell count divided by the GF bounding box. Reflex corners are the concave corners of the GF outline. Min rectangles is the minimum number of rectangles that partition the GF footprint, the "blocks" (Ohtsuki/Lipski chord formula, computed by brute force; no footprint has a hole or a pinch).
- **Sizes.** The ground floor has 11–15 cells for *small*, 19–24 for *medium* and 29–33 for *large*: the size tags are clean bands of the footprint. Rooms per house: small 3–6, medium 5–13, large 13–24.
- **Blocks.**
  - Footprints are unions of **2–4 blocks** (1–4 reflex corners) that fill 59–95 % of their bounding box. There are no courtyards.
  - *mechanical* is not squarer than *organic* in this sample: fill 0.59–0.60 against 0.73–0.80.
  - Its effect is PLAUSIBLY elsewhere, for example in room shapes or layout regularity. That is not measured here.

### 3.2 Floors and basements per house

- **Storeys above ground.** small 2, small+tall 3, small+organic 1; medium 2, medium+low 1, medium+tall 3, medium+mechanical+hallways 1, medium+organic 2; large 3, large+tall 6, large+mechanical 3, large+organic+hallways 2.
  - *low* gave 1 storey and *tall* gave 3, 3 and 6.
  - The default count rises with size: 2, 2 and 3 storeys for the untagged small, medium and large houses.
- **Basements.** 9 of 12 houses have one; the exceptions are rows 7, 8 and 12. Every basement has **no windows** and holds 2–4 rooms (median 3).
- **Upper storeys** never exceed the ground-floor footprint and shrink with height (§1.2).

### 3.3 Rooms per floor

- basement: 2–4 rooms (median 3), 11–19 cells (median 13);
- ground floor: 1–7 rooms (median 4.5), 11–33 cells (median 23);
- upper storeys: 1–8 rooms (median 3), 4–32 cells (median 19).
- Five storeys are a single room: a small house's upper floors, an attic, a one-room cottage ground floor.

The full per-storey table (REGULAR/absent/NULL door counts; "door cycles" = E − V + components):


| stem | level | rooms | cells | doors (REGULAR/absent/NULL) | door cycles | windows | exterior edges | windows per exterior edge | stairs | corridor share | circulation share | min rectangles |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| s260926101-small | -1 | 2 | 13 | 0/1/0 | 0 | 0 | 16 | 0.00 | 1 | 0 % | 0 % | 3 |
| s260926101-small | 0 | 2 | 13 | 1/0/0 | 0 | 13 | 16 | 0.81 | 2 | 0 % | 0 % | 3 |
| s260926101-small | 1 | 1 | 7 | 0/0/0 | 0 | 4 | 12 | 0.33 | 1 | 0 % | 0 % | 2 |
| s260926102-small-tall | -1 | 2 | 15 | 0/1/0 | 0 | 0 | 20 | 0.00 | 1 | 0 % | 33 % | 3 |
| s260926102-small-tall | 0 | 2 | 15 | 0/1/0 | 0 | 12 | 20 | 0.60 | 1 | 0 % | 60 % | 3 |
| s260926102-small-tall | 1 | 1 | 6 | 0/0/0 | 0 | 3 | 10 | 0.30 | 0 | 0 % | 0 % | 1 |
| s260926102-small-tall | 2 | 1 | 6 | 0/0/0 | 0 | 8 | 10 | 0.80 | 0 | 0 % | 0 % | 1 |
| s260926103-small-organic | -1 | 2 | 11 | 1/0/0 | 0 | 0 | 18 | 0.00 | 1 | 0 % | 0 % | 4 |
| s260926103-small-organic | 0 | 1 | 11 | 0/0/0 | 0 | 7 | 18 | 0.39 | 1 | 0 % | 0 % | 4 |
| s260926104-medium | -1 | 3 | 15 | 0/1/1 | 0 | 0 | 20 | 0.00 | 1 | 0 % | 7 % | 4 |
| s260926104-medium | 0 | 5 | 23 | 2/1/1 | 0 | 14 | 22 | 0.64 | 2 | 0 % | 48 % | 3 |
| s260926104-medium | 1 | 5 | 23 | 3/0/1 | 0 | 14 | 22 | 0.64 | 1 | 0 % | 4 % | 3 |
| s260926105-medium-low | -1 | 3 | 11 | 1/1/0 | 0 | 0 | 16 | 0.00 | 1 | 0 % | 55 % | 2 |
| s260926105-medium-low | 0 | 4 | 23 | 3/0/0 | 0 | 15 | 22 | 0.68 | 1 | 0 % | 0 % | 2 |
| s260926106-medium-tall | -1 | 4 | 19 | 2/1/0 | 0 | 0 | 18 | 0.00 | 1 | 0 % | 11 % | 2 |
| s260926106-medium-tall | 0 | 3 | 19 | 1/1/0 | 0 | 11 | 18 | 0.61 | 2 | 0 % | 63 % | 2 |
| s260926106-medium-tall | 1 | 2 | 12 | 0/1/0 | 0 | 11 | 14 | 0.79 | 2 | 0 % | 33 % | 1 |
| s260926106-medium-tall | 2 | 1 | 4 | 0/0/0 | 0 | 8 | 8 | 1.00 | 1 | 0 % | 0 % | 1 |
| s260926107-medium-mechanical-hallways | 0 | 5 | 21 | 1/3/0 | 0 | 19 | 24 | 0.79 | 0 | 0 % | 19 % | 3 |
| s260926108-medium-organic | 0 | 4 | 24 | 1/2/0 | 0 | 15 | 22 | 0.68 | 1 | 0 % | 21 % | 2 |
| s260926108-medium-organic | 1 | 3 | 19 | 2/0/0 | 0 | 15 | 20 | 0.75 | 1 | 0 % | 0 % | 3 |
| s260926109-large | -1 | 2 | 13 | 1/0/0 | 0 | 0 | 18 | 0.00 | 1 | 0 % | 0 % | 3 |
| s260926109-large | 0 | 5 | 32 | 2/2/0 | 0 | 18 | 28 | 0.64 | 2 | 0 % | 19 % | 3 |
| s260926109-large | 1 | 5 | 32 | 3/1/0 | 0 | 22 | 28 | 0.79 | 2 | 9 % | 34 % | 3 |
| s260926109-large | 2 | 4 | 23 | 2/1/0 | 0 | 13 | 22 | 0.59 | 1 | 0 % | 17 % | 3 |
| s260926110-large-tall | -1 | 3 | 17 | 1/1/0 | 0 | 0 | 20 | 0.00 | 1 | 29 % | 29 % | 2 |
| s260926110-large-tall | 0 | 6 | 33 | 2/3/0 | 0 | 8 | 26 | 0.31 | 1 | 9 % | 15 % | 4 |
| s260926110-large-tall | 1 | 4 | 27 | 2/1/0 | 0 | 11 | 24 | 0.46 | 0 | 15 % | 15 % | 4 |
| s260926110-large-tall | 2 | 3 | 19 | 1/1/0 | 0 | 10 | 20 | 0.50 | 0 | 0 % | 0 % | 3 |
| s260926110-large-tall | 3 | 3 | 13 | 1/1/0 | 0 | 10 | 16 | 0.62 | 0 | 23 % | 23 % | 2 |
| s260926110-large-tall | 4 | 3 | 12 | 2/0/0 | 0 | 10 | 16 | 0.62 | 0 | 0 % | 0 % | 3 |
| s260926110-large-tall | 5 | 2 | 11 | 1/0/0 | 0 | 9 | 14 | 0.64 | 0 | 0 % | 0 % | 2 |
| s260926111-large-mechanical | -1 | 3 | 12 | 1/0/1 | 0 | 0 | 14 | 0.00 | 1 | 0 % | 8 % | 1 |
| s260926111-large-mechanical | 0 | 7 | 32 | 3/2/1 | 0 | 23 | 30 | 0.77 | 2 | 16 % | 44 % | 3 |
| s260926111-large-mechanical | 1 | 8 | 32 | 4/2/1 | 0 | 23 | 30 | 0.77 | 2 | 0 % | 6 % | 3 |
| s260926111-large-mechanical | 2 | 6 | 26 | 2/2/1 | 0 | 17 | 24 | 0.71 | 1 | 0 % | 4 % | 3 |
| s260926112-large-organic-hallways | 0 | 6 | 29 | 2/2/1 | 0 | 22 | 28 | 0.79 | 1 | 14 % | 17 % | 3 |
| s260926112-large-organic-hallways | 1 | 7 | 25 | 4/1/1 | 0 | 10 | 26 | 0.38 | 1 | 16 % | 28 % | 4 |


### 3.4 Roles: counts, areas, where they occur

"Lit share" is from the SVG lights layer. "Levels seen" lists the storeys where the role occurs.

| role | rooms | houses | small | medium | large | levels seen | area min / median / max | rectangular | doors median | windows median | lit share |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Room | 22 | 7 | 1/3 | 2/5 | 4/4 | [-1, 0, 1, 2, 3, 4, 5] | 4 / 7.0 / 9 | 13/22 | 1.0 | 4.5 | 22/22 |
| Bedroom | 13 | 7 | 2/3 | 2/5 | 3/4 | [1, 2, 4, 5] | 4 / 6 / 7 | 11/13 | 1 | 3 | 13/13 |
| Living room | 12 | 12 | 3/3 | 5/5 | 4/4 | [0, 1] | 6 / 7.5 / 11 | 3/12 | 1.5 | 6.0 | 12/12 |
| Bathroom | 12 | 8 | 0/3 | 4/5 | 4/4 | [0, 1, 2, 3, 4] | 1 / 2.0 / 4 | 11/12 | 1.0 | 1.0 | 12/12 |
| (unnamed stair cell) | 9 | 3 | 0/3 | 1/5 | 2/4 | [-1, 0, 1, 2] | 1 / 1 / 1 | 9/9 | 1 | 2 | 9/9 |
| Cellar | 8 | 8 | 3/3 | 2/5 | 3/4 | [-1] | 6 / 8.5 / 10 | 1/8 | 1.0 | 0.0 | 8/8 |
| (unnamed) | 8 | 7 | 0/3 | 4/5 | 3/4 | [-1, 0, 1] | 1 / 2.0 / 2 | 8/8 | 2.0 | 1.5 | 0/8 |
| Corridor | 8 | 4 | 0/3 | 0/5 | 4/4 | [-1, 0, 1, 3] | 3 / 4.0 / 5 | 2/8 | 2.0 | 0.0 | 0/8 |
| Stairhall | 7 | 4 | 1/3 | 2/5 | 1/4 | [-1, 0, 1, 2] | 4 / 5 / 8 | 4/7 | 1 | 2 | 7/7 |
| Hall | 6 | 6 | 1/3 | 4/5 | 1/4 | [0] | 2 / 7.0 / 9 | 2/6 | 1.0 | 5.0 | 6/6 |
| Kitchen | 6 | 6 | 0/3 | 3/5 | 3/4 | [0] | 4 / 4.5 / 7 | 4/6 | 1.5 | 2.5 | 6/6 |
| Storage | 5 | 5 | 1/3 | 2/5 | 2/4 | [-1, 1] | 2 / 3 / 5 | 4/5 | 1 | 0 | 5/5 |
| Library | 4 | 4 | 0/3 | 2/5 | 2/4 | [0, 1] | 5 / 7.5 / 9 | 0/4 | 2.0 | 5.5 | 4/4 |
| Studio | 2 | 2 | 1/3 | 0/5 | 1/4 | [0, 1] | 6 / 7.0 / 8 | 0/2 | 1.0 | 4.5 | 2/2 |
| Workshop | 2 | 2 | 0/3 | 1/5 | 1/4 | [-1] | 4 / 5.0 / 6 | 2/2 | 1.5 | 0.0 | 2/2 |
| Chapel | 2 | 2 | 0/3 | 1/5 | 1/4 | [-1, 1] | 4 / 5.0 / 6 | 2/2 | 1.0 | 2.5 | 2/2 |
| Lookout | 1 | 1 | 1/3 | 0/5 | 0/4 | [2] | 6 / 6 / 6 | 1/1 | 0 | 8 | 1/1 |
| Armoury | 1 | 1 | 0/3 | 1/5 | 0/4 | [0] | 7 / 7 / 7 | 0/1 | 1 | 0 | 1/1 |
| Attic | 1 | 1 | 0/3 | 1/5 | 0/4 | [2] | 4 / 4 / 4 | 1/1 | 0 | 8 | 1/1 |
| Trophy room | 1 | 1 | 0/3 | 1/5 | 0/4 | [0] | 8 / 8 / 8 | 1/1 | 2 | 8 | 1/1 |
| Observatory | 1 | 1 | 0/3 | 0/5 | 1/4 | [2] | 8 / 8 / 8 | 1/1 | 2 | 4 | 1/1 |
| Laboratory | 1 | 1 | 0/3 | 0/5 | 1/4 | [1] | 6 / 6 / 6 | 1/1 | 1 | 8 | 1/1 |
| Secret passage | 1 | 1 | 0/3 | 0/5 | 1/4 | [1] | 11 / 11 / 11 | 0/1 | 5 | 0 | 0/1 |


**Which roles appear, by size tag:**

| size (houses) | always | sometimes | never |
|---|---|---|---|
| small (3) | Living room, Cellar | Bedroom 2/3; Hall, Stairhall, Storage, Room, Studio, Lookout 1/3 | Bathroom, Kitchen, Corridor, Library, and every unnamed room |
| medium (5) | Living room | Hall, Bathroom and unnamed passage 4/5; Kitchen 3/5; Bedroom, Cellar, Library, Room, Stairhall, Storage 2/5; Armoury, Attic, Chapel, Trophy room, Workshop and a stair shaft 1/5 | Corridor, Studio, Lookout, Observatory, Laboratory, Secret passage |
| large (4) | Living room, Bathroom, Corridor, Room | Bedroom, Cellar, Kitchen and unnamed passage 3/4; Library, Storage and stair shaft 2/4; Hall, Stairhall, Studio, Workshop, Chapel, Observatory, Laboratory, Secret passage 1/4 | Armoury, Attic, Lookout, Trophy room |

Observations:
- **Always present.** The **Living room is the one universal room** (12/12). It sits on the ground floor in 11 houses and on the first floor in one.
- **Absent from small houses.** None of the three small houses has a **Bathroom or a Kitchen**, even though the app's own console program lists them (§3.12).
- **Large houses** add Corridors (4/4) and generic `Room`s (4/4).
- **Vertical zoning [SHOWN, n small].**
  - Kitchens (6/6) and Halls (6/6) are always on the ground floor.
  - Cellars (8/8) and both Workshops are in the basement.
  - **Bedrooms are never on the ground floor** (13/13 upstairs).
  - Attic, Lookout and Observatory each occur once, always on the **top** storey.
  - One Chapel is in a basement (row 9).
- **The special room.** The one special room per house (studio, lookout, laboratory, armoury, greenhouse, trophy room, chapel, secret passage) is named in the console program (§3.12). It is realised in 9 of 12 houses.

### 3.5 Room areas (grid cells; there is no real unit, §1.3)

- **All 133 rooms:** 1–11 cells, median 6, mean 5.25.
  - Histogram: 1 cell 15, 2: 11, 3: 6, 4: 23, 5: 10, 6: 25, 7: 13, 8: 16, 9: 10, 10: 2, 11: 2.
  - Most 1-cell rooms are stair shafts (9), one-cell bathrooms (4) or passages.
- **Area by role, median (range):**
  - Bathroom 2 (1–4)
  - Storage 3 (2–5)
  - Corridor 4 (3–5)
  - Kitchen 4.5 (4–7)
  - Stairhall 5 (4–8)
  - Bedroom 6 (4–7)
  - Room 7 (4–9)
  - Hall 7 (2–9)
  - Living room 7.5 (6–11)
  - Library 7.5 (5–9)
  - Cellar 8.5 (6–10)
  - Secret passage 11
- **Ordering.** The ranks follow watabou's stated aim (bathroom smallest) [STATED/SHOWN].
- **Room size does not scale with house size**: medium and large houses add rooms and storeys, not bigger rooms. [INFERRED from the per-role ranges being similar across sizes; per-size medians are in `stats.json`.]
- **Shape.** 81/133 rooms are rectangles. The rest fill a median 0.70 of their bounding box.

### 3.6 Corridor and circulation share

- **Named `Corridor` rooms** occur **only in large houses**. They take 3 %, 11 %, 5 % and 15 % of each large house's cells, and up to 29 % of a single storey (row 10's basement).
- **Broader circulation** (Corridor + Hall + Stairhall + unnamed passages and shafts) takes 0–33 % of a house (median 18.5 %).
- **The *hallways* tag** (rows 7 and 12) does not show as a larger corridor share in this sample:
  - row 7 has no Corridor at all, only a 2-cell unnamed passage and a 2-cell Hall;
  - row 12 has the largest Corridor share (15 %) plus an 11-cell Secret passage.
  - With n = 2 the effect of *hallways* is not established.
- **Doorway types by circulation.** Type-less openings mostly touch circulation (24 of 34). `REGULAR` doors mostly join two rooms that are not circulation (30 of 52). `NULL` edges always touch a stair shaft.

### 3.7 Doors per room and the room graph

- **Doors per room (on its storey)** over 133 rooms: 0 doors 5 (the one-room storeys), 1: 82, 2: 35, 3: 7, 4: 3, 5: 1 (the Secret passage). **62 % of rooms have a single door on their storey.**
- **Whole-house degree**, counting doors, the exit, stairs and the spiral: 1: 50, 2: 53, 3: 23, 4: 6, 5: 1. **38 % of rooms are leaves of the house tree.**
- **Every storey's door graph is a tree** (38/38), **every house graph is a tree** (12/12), and every room is reachable from the street. There is no second entrance, no loop and no alternative route [CONFIRMED].
- **Depth from the street**, in edges from OUTSIDE (median by role):
  - Hall 1, Living room 2, Kitchen 2, Studio 2.5;
  - Stairhall 3, Cellar 3.5, Library 3.5, Corridor 3.5, Room 4;
  - Attic, Chapel, Observatory 5;
  - Bedroom, Storage, Bathroom 6.
- **The gradient.** Public rooms are shallow and private rooms deep, a public-to-private gradient [SHOWN; that it is designed is INFERRED].
- **Deepest room per house:** 3–4 for small houses, 4–7 for medium, 6–11 for large. The deepest is row 11's first-floor Laboratory at 11.

### 3.8 Windows per exterior wall

- **Coverage.** Windows sit on **64 % of above-ground exterior cell edges** (375 of 590) and on **no basement edge**. Per storey, windows per exterior edge range from 0.30 to 1.00 (typically 0.6–0.8).
- **Edges without a window [SHOWN, 215 above ground]:**
  - the exit edge: always, 12/12;
  - the spiral cell's edges: 18;
  - edges of Corridors and unnamed passages: 19;
  - the Secret passage: 10, and it has none at all;
  - stair cells: 9;
  - no evident reason: 147. PLAUSIBLY spacing or chance.
- **Per role** (share of exterior edges glazed, above ground):
  - stair shafts 1.00, and Attic, Chapel, Laboratory and Trophy room 1.00 (n = 1 each);
  - Stairhall 0.83, Library 0.79, Room 0.70, Living room 0.68, Hall 0.63, Kitchen 0.58;
  - Bedroom 0.47, Bathroom 0.47, Corridor 0.30;
  - Armoury, Storage and Secret passage 0.
- **Rooms with no window.** Almost every above-ground room with an exterior wall has at least one window. The exceptions are 4 of 7 Corridors, the Armoury, a Storage, the Secret passage, 2 Rooms and 1 passage. One Kitchen is an interior room with no exterior edge.

### 3.9 Stairs per floor pair and their kinds

- **Count.** Each pair of consecutive storeys is linked by **exactly one** stair (19 pairs) **or by the spiral alone** (7 pairs, in rows 2 and 10). There is never a second stair.
- **Ends match.** Both ends always sit at the **same cell** (19/19).
- **Kinds:**
  - **half-turn (U)**: 15 stairs; both ends give the same `dir`;
  - **quarter-turn (L)**: 4 stairs; the ends' `dir`s name the two sides of the corner landing;
  - **spiral**: 2 houses, 7 floor pairs.
  - Every stair end fills exactly one cell (§2.5).
- **Stair shafts.** In 6 pairs (rows 4, 11 and 12) the stair cell is its own **1-cell unnamed room** on both storeys: a shaft opening by a `NULL` edge. In rows 4 and 11 the shaft continues through three and four storeys at one cell.
- **Alignment.** Elsewhere, successive stairs are not aligned. In row 9 the stairs sit at (5, 0), then (6, 1), then (8, 4). This is the problem watabou described and addressed with the *stairwell* tag [STATED, 1.4.0].
- **Rooms that hold stairs (38 ends).**
  - unnamed 1-cell shafts 12, Stairhall 8, Living room 7, Cellar 4, Kitchen 2;
  - one each in a Bedroom, a Hall, an Attic, a Library and a Workshop.
  - The JSON has no stair-room rule; the role mix is [SHOWN].

### 3.10 Footprints and blocks

- **Ground floor.** 11–33 cells, with bounding boxes from 5 × 3 to 9 × 6 (rows × columns).
- **Blocks.** 2–4 minimum rectangles and 1–4 reflex corners. There are no holes: the courtyards watabou mentions need the blueprint editor [STATED, 1.3.2].
- **Upper storeys** are subsets of the ground floor (17/17). Three keep 100 % of it; the others shrink to 21–86 %.
- **Basements** are subsets too, at 38–100 %.
- **Relation to tags.** The size tag fixes a cell band (§3.1). *organic* and *mechanical* do not separate by fill or block count here (§3.1).

### 3.11 Room-graph degree distribution

See §3.7. In short: 62 % of rooms have one door on their storey, and 38 % are leaves of the whole-house tree once stairs and the exit are counted. The highest degree is 5: the 11-cell Secret passage, which serves as row 12's first-floor corridor.

### 3.12 The console "program" against the realised rooms

- **What is logged [SHOWN, `export-log.jsonl`].** At each generation the app logs two lists from `HouseType.hx:22`.
  - The **first list is always** `[living room, bathroom, bedroom, <special>]`, where the special room is one of studio, lookout, laboratory, armoury, greenhouse, trophy room, chapel or secret passage.
  - The **second list** is a pool: always kitchen, storage, hall and gallery, then a variable tail, e.g. observatory, study, workshop, library, armoury or greenhouse, then extra bedrooms and bathrooms, then attic and cellar.
- **What is realised.**
  - First list: the Living room always appears (12/12). The special room appears in 9 of 12 houses, missing in rows 3, 5 and 6.
  - Bathroom and Bedroom appear in 8 and 7 houses.
  - **No "gallery" and no "study" was realised in any house**, though both are in many pools.
  - Rooms outside both lists appear, all circulation or generic: `Room`, `Corridor`, `Stairhall` and unnamed.
- **Reading.** The lists are PLAUSIBLY a priority-ordered program that the partition fills until space runs out, with circulation added as needed [INFERRED; the method is the posts lane's subject].


## 4. What the exports reveal that the drawing does not, and what they do not carry

### 4.1 Revealed by the exports, not by the on-screen plan [SHOWN]

1. **The data model.** A house is a **stack of storeys on one integer grid**, and each storey is a partition of its cells into rooms. A room is a set of cells. The things between rooms are **edge records**: door openings, windows and the exit. Stairs are **cell records** paired across storeys. The drawing's walls, thicknesses, posts and shading are all derived from this at draw time.
2. **Hidden rooms.** The partition is explicit, including the rooms the drawing leaves unlabelled: 9 one-cell stair shafts and 8 one-to-two-cell passages. On screen a passage reads as part of a neighbouring room or as a corridor stub.
3. **Door semantics** the default drawing hides. `REGULAR` (a door), type-less (an opening) and `NULL` (no wall) all look alike, or nearly, in *Doors: Hidden* mode.
4. **Vertical connectivity.** An up/down pair at the same cell, one stair per storey pair, and the house-level `spiral`. The drawing shows arrows, and linking two floors takes cross-referencing two tiles.
5. **The topology is a tree.** One entrance and no loops, on every storey and for every house. This is invisible at a glance and matters for any navigation use. It is the user-requested "graph-style representation" of the comments [STATED 2025-11-09/12].
6. **Full room names** where the SVG abbreviates (`BTH`), and the **absence** of a name where the drawing simply shows no label.
7. **The growth order** of each room's cells, a hint of how rooms are grown [INFERRED].
8. **Determinism of the writer.** The JSON and SVG are byte-identical across loads even when the canvas lighting is not (§5).
9. **From the SVG, beyond the JSON.**
   - The render stack as vector layers: vector AO strips, per-room lights with blend modes, a halo made by stroking labels, and a roof tile composed storey by storey under 10 % veils.
   - Exact wall thicknesses (exterior 0.16 cell outward, interior 0.06 centred), window glyph size (a third of an edge), stair construction (2 × 5 treads plus a landing, U or L, the landing on `dir`), and furniture density per role.
10. **From the console, beyond both files.** The `HouseType` program lists and the `Blueprint` tag echo. They show a room program with priorities and unrealised items (no gallery or study in any house).

### 4.2 Not carried

| missing | JSON | SVG | where it could come from |
|---|---|---|---|
| build or version, seed, tags, house name, date | none | none | the permalink URL and the download filename (name only) |
| scale or real units | none: cells only; watabou does not know a scale [STATED] | pixels = cells × dots per cell | none |
| wall geometry and thickness | none (implicit) | yes | SVG |
| door width, leaf or hinge side | none (type only) | a gap only, in the default mode | other door modes, not exported here |
| window size or position along the edge | none | glyph a third of the edge long, centred | SVG |
| stair kind or geometry | implicit (`dir` agreement) | treads, landing and arrow | SVG |
| furniture or props | none | abstract glyphs, no semantics | SVG |
| lights on or off, light positions | none | a gradient per lit room | SVG |
| roof, chimneys, elevation | none | roof plan tile only; no elevation | elevation has its own PNG/SVG export [STATED 1.3.1], not captured |
| room ids, explicit adjacency | none (by index and cell) | none | derived (§1.6) |
| role code separate from the display name | none: renaming changes it [STATED] | abbreviated label | none |
| room program, special room | none | none | console only |
| basement earth, entrance steps, porch | none (`exit` edge only) | yes | SVG |
| storey heights, ceilings | none | none | none |

**Consequences for a consumer.** Keep the permalink and the build id beside every file. Take topology and semantics from the JSON, and geometry and style from the SVG. Treat room names as labels, not as a controlled vocabulary.

## 5. Files and commands, CONFIRMED versus PLAUSIBLE

### 5.1 Files written by this lane

- **`captures/dwellings/exports-2026-09-26/`**:
  - `README.md` (method, file table, cross-checks);
  - for each of the 12 stems, `<stem>.json`, `<stem>.svg` and `<stem>.png`;
  - `export-log.jsonl` (28 lines: 24 exports, 2 probes, 2 duplicates) and `probe-urlkey.jsonl`;
  - `determinism.json`;
  - `stats.py` and `stats.json`;
  - `ui/` (5 screenshots of the menus, the Export dialog and the door modes);
  - `session/` and `session-ui/` (console, index, session.json; response bodies deleted unread).
- **`profiler/export.mjs`**: extended with `--port`, `--marker` and `--actions`, and `--shot` runs before the actions. Without the new options its behaviour is unchanged (diff reviewed; `node --check` passes).
- **`profiler/README.md`**: new paragraph "Menu-driven exports".
- **This file.**

### 5.2 Commands, in order (local time 2026-09-26)

1. 19:11: `resolveTargetUrl('dwellings')` returned build 17195045.
2. 19:12: `node session.mjs --target dwellings --no-goto --port 9361 --url <build>`.
3. 19:12: URL-key probe. `export.mjs "<row 1 url>&export=json" --marker … --max 20000 --shot` gave no download, no Blob and no anchor, and the key was dropped from the URL (`probe-urlkey.jsonl`).
4. 19:12–19:17: menu exploration into the scratchpad, screenshots only:
   - right-click menu, Export submenu, Advanced dialog;
   - the "=" button menu on the large house.
5. 19:13 and 19:15: row 1 JSON probe (right-click path) and all-floors SVG probe, into this folder; kept as log lines.
6. 19:18–19:21: dry run on all 12 rows. Each opened the Advanced dialog without exporting; the SVG button crop was identical in all rows.
7. 19:21–19:25: the real runs, JSON then SVG per row (commands in the README). 24 of 24 completed; Blob = download for every file.
8. 19:25–19:27:
   - hover test on row 2: the canvas render does not depend on the mouse;
   - row 2 duplicate JSON and SVG: byte-identical;
   - duplicates and probe files deleted, hashes in `determinism.json`;
   - UI screenshots of the Layers, Rooms and Walls submenus and the expanded dialog;
   - `touch <session>/STOP`.
9. 19:42–19:44: a second export-free session for the Grid, Doors and Labels submenus and the three door modes (key **D** cycles Hidden → Simple → Open), then stopped the same way.
10. `python3 stats.py --md --json stats.json` (exit 0).
11. SVG inspection with scratchpad scripts: an element and attribute summariser and a layer outliner. Two offline renders (rows 4 and 10) through headless Chrome with every non-file request aborted, so the Google Fonts import was blocked.

### 5.3 CONFIRMED (executed or read on disk)

- Build 17195045 has no `export=` URL key. Export runs through the menu: *Export > as JSON*, and *Advanced… > SVG* for all floors. X opens the dialog [STATED 1.3.6; not exercised].
- The app writes a Blob and dispatches a click on a `download` anchor. The saved file equals the Blob (28/28). The house name is only in the filename.
- Tags were written back unchanged for all 12 rows.
- Determinism by sha1 for rows 1 and 2, JSON and SVG. The canvas lighting render differs between loads for rows 2, 3 and 9.
- The JSON schema and the grid convention (i = row south, j = column east): 0 violations.
  - Rooms partition each storey, and every room is connected.
  - Each room's cell list is in growth order.
  - Storeys, basements and upper floors all lie within the ground-floor footprint.
- Graph facts: every storey and every house is a tree, with one stair per storey pair and matched ends.
- Every statistic in §3.
- The SVG facts:
  - layer order and count;
  - JSON ↔ SVG equalities for polygons, areas, bboxes, windows, stair arrows and labels (with `BTH`);
  - element set; M/L/Q only with no `Z`; no ids or classes other than the gradients';
  - placeholder paths = `<g>` count;
  - tile table and sizes;
  - wall coverage by door type;
  - the landing lies on the `dir` side for 38/38 stair ends.
- The live door modes: *Simple* and *Open* draw leaves on `REGULAR` doors only (row 4 screenshot).

### 5.4 PLAUSIBLE (reasoning only)

- The empty tenth plan layer holds door leaves in the *Simple* and *Open* modes.
- Each room's cell order reflects how the generator grows rooms.
- The two console lists are a priority program filled until space runs out.
- White gradients in the AO group lighten the shading near light sources.
- The roof's paired-stroke tones map one to one onto roof-face orientations.
- The canvas lighting's per-load variation comes from timing or from unseeded randomness in the view, not the model. The model and the writer are demonstrably deterministic.
- The effects of *organic*, *mechanical* and *hallways* could not be established with 2–3 houses each.
- The plan-offset rule (tile centre − ⌊extent/2⌋) is the generator's rule and not a coincidence of 24 axes.

### 5.5 Sources read and images viewed

- **Sources: 59.**
  - 33 documents and tool files:
    - `seeds.json`;
    - the MFCG exports README;
    - `profiler/README.md`, `export.mjs`, `session.mjs`, `drive.mjs`, `lib/common.mjs`, and `record.mjs` (grep only);
    - the Dwellings devlogs 798071, 871855, 1113590 and 567246, plus `_page.md` and `_comments.md` (the relevant threads);
    - Patreon 143565705 and 111909860 in full, and 120395768, 143036785, 159559624, 96522502, 97493516, 86635425, 88328982 and 121415691 by grep;
    - the profile lane's `_probes` (dwlib, probe-seed, dw-methods, resolve-build.log, probe-seed-nomarker.log) and its capture `meta.json`;
    - the posts lane's skeleton;
    - `docs/lane-events.log` and `docs/PROGRESS.md` (J34/J35).
  - The 24 export files, `export-log.jsonl` and the session console.
- **Images viewed: 16.** They were: the URL-probe screenshot, the right-click menu, the Export submenu (twice), the Advanced dialog, the large-house "=" menu and its dialog crop, the row 2 lighting diff, the row 4 screenshot and its door zoom, the row 4 and row 10 SVG renders, the Layers/Rooms/Walls and Grid/Doors/Labels submenus, the expanded dialog, and the door-mode comparison.
- No captured JavaScript bundle was opened. Nothing was copied from the exports into any product file.
