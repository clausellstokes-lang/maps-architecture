# Amendments l — the VTT export profile re-verified against the formats as of 2026-10-17 (item 136 (c))

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat coherence/vtt-l-and-k11; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

Numbered from **648** (file k ended at 647). **APPLIED** by the same lane (`coherence/vtt-l-and-k11`) to
`docs/ARCHITECTURE.md` §11.1 and to `docs/volumes/V14-sites.md` §1b.4, §5.3, §7 and §12, as the coherence pass applies
items (the quote matched exactly, replaced, never paraphrased); the record of the application, one row per item, is
`docs/validation/coherence/vtt-l.md`. Source: `research/vtt/profile-reverification-2026-10-17.md` (lane
`research/vtt-profile-reverify`, 2026-10-17) — its §5 delta table (29 rows: 7 changed in whole or in part, 2 unverifiable, 20
unchanged) and its §6 base change requests **BCR-VTT-1 – BCR-VTT-8** with the pin line it proposes. The
re-verification is the one item 136 (c), V14 §5.3, V14 §8's SE2 and T-V14-11 call for ("the profile's version pinned
by item 136 (c)'s re-verification before M-ENC's SE2").

**How to read an item.** As file k's: each item names the base's (or the volume's) exact heading, quotes the current
text **once** (every quote verified by exact search against the file on 2026-10-17; a quote that wraps across a line in
the file is quoted with the wrap marked ⏎, the continuation's indentation kept), and gives the new text **in full**. *Requests* lists the BCR-VTT ids
the item carries; *Evidence* the note's section and the pinned source with its URL and date (every URL fetched on
2026-10-17 by the research lane). Order: the base's §11.1 in its paragraph order, then volume 14 in section order.

**The clean-room rule for the new texts.** The base and the volumes are implementer inputs: the new texts name only
the two export targets §11.1 already names (Universal VTT and Foundry) and the format's own field names (Universal
VTT's keys; Foundry 14's documented Scene, Level, Wall and AmbientLight fields and its named constants); no importer's
product name, file, function or internal identifier enters them. The research note's product names and URLs stay in
this file's *Evidence* lines.

**Where the note's text was not taken verbatim** (each a design choice of this file, recorded so it can be vetoed):
(a) BCR-VTT-2's placeholder `<base>.<nn>.dd2vtt` is written `<base>.<ordinal>.dd2vtt` with "the ordinal written as two
zero-padded digits", so the one spelling of the name in the base (§11.1 *Scope*), V14 §2.4 (`EncounterCrop.scenes`),
§3.12 (6), §5.3, T-V14-11 and BCR-V14-8 stays one; (b) BCR-VTT-1's two pin texts (its table row and its closing
line) are merged into the closing line's form, the readers not read for the profile (the MapTool and Fantasy Grounds
wikis, Roll20's blocked article) left in the note; (c) BCR-VTT-3's per-level `elevation.top` for a level with no
ceiling (the ground, a deck) is given a value the note leaves open — `bottom` plus a new cell `vtt.levelBandCm`
(300 cm, a cell of the VTT export settings, in the form of `vtt.retainingMinCm`) — and every elevation is converted
to the scene's distance units by the grid's own ratio (`cm ÷ (squareM × 100) × distance`); (d) BCR-VTT-3's sentence on
a third-party importer reading the Foundry scene JSON is left out of the base (a product name; nothing the design
needs); (e) a light's `elevation` and `levels` and a deck level's `visibility.levels` are kept as the note gives them;
an open portal that is not a window (a raised way's end stair or ramp) is written as no wall in the Foundry scene,
a case the note does not name.

*Not items* (listed so nothing is re-found): **BCR-VTT-8** (the survey's consumer list and Dungeon Alchemist's
convention made exact) and BCR-VTT-2's survey clause (§6.1 (1)) touch `research/sites/survey.md` only — a research
record, neither the base nor a volume; they are the research seat's to apply, and nothing here cites them. The delta
table's row 1 (§11.1's VTT row, "no manual steps on import") needs no change once item 654 lands: the Foundry scene
JSON is the manual-step-free path, as that row states. Rows 2, 4, 5, 7, 8, 9, 10, 11, 12, 16, 20, 21, 23, 25, 26
(unchanged; 18's names are item 654's), 27–29 (the survey's) and 22 (the plain PNG's `{cols}x{rows}`, unverifiable from this lane's sources) need no text. Row 10's note
(a light's `intensity: 1` maps to a Foundry colour alpha of 0.05 through the Universal VTT importer) is a reader's
mapping, not a profile fact; item 654 writes the Foundry scene's own `alpha` directly.

---


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)* (its heading)

**648.** **The version pin under the profile's heading** (BCR-VTT-1, its pin line). *Current text:*
> **The `.dd2vtt` profile (DEF-4).**
*New text:* **The `.dd2vtt` profile (DEF-4).** *Pinned (item 136 (c)'s re-verification of 2026-10-17; file l item
648):* Universal VTT as its published developer description revised 2026-08-22 — the field set below, `format`
carried, not checked; Foundry VTT 14 — release 14.369 of 2026-10-08, API documentation 14.368 — with Foundry's importer
of Universal VTT files at 6.1.1 and the one Foundry level importer that reads a numeric floor suffix at 0.0.8 (both
verified for 14; the latter reads no `.dd2vtt`); the next re-verification at Foundry 15's first stable release or a
change to the format's published description, whichever comes first.
*Requests:* BCR-VTT-1. *Evidence:* the note's §1 (the pinned version table) and §6 (the pin line); Universal VTT —
https://arkenforge.com/universal-vtt-files/ (page modified 2026-08-22); Foundry — https://foundryvtt.com/releases/14.369
(2026-10-08) and https://foundryvtt.com/api/ (API "version 14.368 Stable"); the two importers —
https://foundryvtt.com/packages/dd-import/ (6.1.1, verified 14) and https://foundryvtt.com/packages/da-level-importer
(0.0.8, Foundry 14 only); all fetched 2026-10-17. **STAGED (M-ENC's SE2: the pin is the bar T-V14-11 names).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Scope*

**649.** **The multi-floor sentence corrected; the pin clause pointed at the pin** (BCR-VTT-2's base half; BCR-VTT-1).
*Current text* (two fragments of the one *Scope* bullet):
> a multi-scene export writes one image and one JSON per scene named `<base>.<ordinal>.dd2vtt` (0 the ground, then each storey or level in elevation order) with the scene's elevation and name in the `plat` object;
> the profile's version is pinned by item 136 (c)'s re-verification before M-ENC's SE2.
*New text:* (a) a multi-scene export writes one image and one JSON per scene named `<base>.<ordinal>.dd2vtt`, the
ordinal written as two zero-padded digits (`00` the ground, then each storey or level in elevation order), with the
scene's elevation and name in the `plat` object — an ordering convention only, for people and for an importer's file
list: no importer pairs these files by name (Foundry's importer of Universal VTT files takes them one at a time under
level names the user types and reads no suffix; no importer that reads a numeric floor suffix reads a `.dd2vtt`), so
the path to one Foundry scene holding every scene of the set as a native level with no manual step is the Foundry
scene JSON (*Foundry scene JSON*, below), written beside the `.dd2vtt` set (file l item 649);
(b) the profile's version is pinned by the line under this profile's heading (item 136 (c)'s re-verification of
2026-10-17, made before M-ENC's SE2).
*Requests:* BCR-VTT-2, BCR-VTT-1. *Evidence:* the note's §4.1, §4.2 and §4.4 (no importer reads a numeric suffix on a
`.dd2vtt`; the Universal VTT importer's multi-file dialog, a typed level name per file, no elevation written), §5 rows 1
and 24; https://foundryvtt.com/packages/dd-import/ (6.1.1) with its published source
https://raw.githubusercontent.com/moo-man/fvtt-dd-import/master/ddimport.js read as documentation of the importer's
expectations, and https://foundryvtt.com/packages/da-level-importer (0.0.8; its README and CHANGELOG: `<stem>_NN.json`
pairs of another product's own JSON); fetched 2026-10-17. **STAGED (M-ENC's SE2).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Fields*

**650.** **The `format` wording; the transient sight-blockers in both lists** (BCR-VTT-1; BCR-VTT-5's base half).
*Current text* (two fragments; the second wraps across a line in the base):
> * **Fields:** `format` 0.3;
> `objects_line_of_sight`⏎  empty;
*New text:* (a) * **Fields:** `format` 0.3 — the decimal the originating product writes; the format's published
description gives the field no value (its own sample file writes 1.0) and no importer read checks it, so the value is
carried for compatibility, not checked (file l item 650);
(b) `objects_line_of_sight` empty, save an encounter crop's transient items' sight-blocking shapes (V14 §5.3), each
written as a closed polyline both there (the contract's object-occluder list) and in `line_of_sight` (the list every
importer reads: Foundry's importer of Universal VTT files never reads `objects_line_of_sight` on its default
multi-level path), the duplication recorded as `plat.objectsAlsoInLos: true` so a reader honouring both lists may drop
one;
*Requests:* BCR-VTT-1, BCR-VTT-5. *Evidence:* the note's §2 (the field table: `format` "decimal … essentially a version
number", no value; the sample's `1.0`), §4.2 (`objects_line_of_sight` read only on the legacy single-scene path under
an option), §5 rows 3 and 6; https://arkenforge.com/universal-vtt-files/ (revised 2026-08-22) and its sample file
https://www.dropbox.com/s/s494c3l6bnblmbu/The%20Pig%20and%20Whistle%20tavern.uvtt?dl=1; the importer's source as in
item 649; fetched 2026-10-17. **STAGED (M3b for `format`; M-ENC's SE2 for the crop's transient items).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Per layer*

**651.** **`software` and `creator` beside the `plat` object** (BCR-VTT-6). *Current text* (wraps across a line in
the base):
> its elevation in the file name⏎  and in a `plat` extension object;
*New text:* its elevation in the file name and in a `plat` extension object, beside the two top-level vendor strings
the format's published description proposes for every writer — `software: 'PLAT <output version>'` and `creator` (the
document's author name where the export's key admits it, else absent); no importer read reads a vendor key, so the
common fields never change (file l item 651);
*Requests:* BCR-VTT-6. *Evidence:* the note's §2 (the vendor row: "We have added in a 'software' and 'creator' field
for our own use, and we hope it catches on for other platforms as well"; "you can add some of your own tags to the
file as we have"), §5 row 13; https://arkenforge.com/universal-vtt-files/ (revised 2026-08-22), fetched 2026-10-17.
**STAGED (M3b).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Per raised way*

**652.** **A deck as one more `Level` of the Foundry scene** (BCR-VTT-3, its *Per raised way* clause). *Current text:*
> a Foundry scene writes each deck as one more level with its elevation band.
*New text:* a Foundry scene writes each deck as one more `Level` of its Scene (*Foundry scene JSON*, below):
`elevation.bottom` the mean deck elevation, `elevation.top` that plus `vtt.levelBandCm`, `background.src` the deck
scene's image and `visibility.levels` naming the ground's level, its parapet walls and its portals carrying the deck
level's id (file l item 652).
*Requests:* BCR-VTT-3. *Evidence:* the note's §3 (*Level*: `elevation { bottom, top }`, `background.src`,
`visibility.levels`; a Wall's and an AmbientLight's `levels`), §5 row 14;
https://foundryvtt.com/api/ (the `BaseLevel` and `LevelData` pages, API 14.368), fetched 2026-10-17. **STAGED (M3b;
M3a's raised ways).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Per storey*

**653.** **The stair core's name in `plat.stairs`** (BCR-VTT-7). *Current text:*
> the stair core a named portal on both storeys' scenes
*New text:* the stair core a portal on both storeys' scenes (the format gives a portal no name: the core's name and its
two storeys go in the `plat` object, `plat.stairs: { portal: number /* its index in the scene's portals */; name:
string; from: number; to: number /* the two storeys' scene ordinals */ }[]`; file l item 653)
*Requests:* BCR-VTT-7. *Evidence:* the note's §2 (a portal is `{ position, bounds, rotation, closed, freestanding }`;
zero occurrences of a portal name in the developer section), §5 row 15; https://arkenforge.com/universal-vtt-files/
(revised 2026-08-22), fetched 2026-10-17. **STAGED (M6-P's per-storey scenes).**


### 11.1 Formats — *The `.dd2vtt` profile (DEF-4)*, *Foundry scene JSON*

**654.** **The Foundry scene JSON as one Foundry 14 Scene with `levels[]`; the wall and light values named**
(BCR-VTT-3; BCR-VTT-4). *Current text* (the whole bullet, across four lines):
> * **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged; an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none), the same lights, a background image file, grid size and distance units — written before the walls — and journal entries from the gazetteer.
*New text:* * **Foundry scene JSON:** one Foundry 14 **Scene** document per export scope, in Foundry's published Scene,
Level, Wall and AmbientLight schemas (API 14.368, pinned above), so Foundry imports it with no manual step and every
scene of the set becomes a native level of one Scene (file l item 654). **The Scene:** `grid { type: 1, size,
distance, units }` — `type` 1 the square grid, `size` the scenes' `pixels_per_grid`, `distance` and `units` from
`vtt.squareM` (`5, 'ft'` for 1.5 m, `1, 'm'` for 1 m) —, `width` and `height` the scope's pixels, `padding: 0`,
`initialLevel` the ground level's id, no scene-level background (the image lives on each level), `journal` and `notes`
from the gazetteer, and `flags.plat` the ground scene's `plat` object. **`levels[]` — one `Level` per scene of the
set**, in ordinal order: `{ _id, name, sort, elevation: { bottom, top }, background: { src }, visibility: { levels },
flags: { plat } }` — `name` the scene's name, `sort` its ordinal, `background.src` the scene's image file written
beside the JSON, `flags.plat` the scene's `plat` object; `bottom` the scene's elevation (the ground 0 at the scope's
ground datum, a storey its floor, a deck its mean deck elevation, a depth band its floor; negative below the datum)
and `top` its ceiling where it has one (a storey's ceiling, a depth band's top), else `bottom` plus `vtt.levelBandCm`
(300 cm, a cell of the VTT export settings; the ground and a deck), both converted to the scene's distance units as
the grid is (`cm ÷ (squareM × 100) × distance`); `visibility.levels` empty on the ground and on a storey or band
level, a deck's naming the ground's level. **`walls[]`** — the geometry of the scene's `line_of_sight` and `portals`
(an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none;
a crop's transient sight-blockers among them, *Fields* above), each `{ c: [x0, y0, x1, y1], move, sight, light, sound,
door, ds, dir: 0, levels }` with `c` in the scene's pixels and `levels` its level's id alone: a wall `move: 20, sight:
20, light: 20, sound: 20, door: 0`; a closed portal the same with `door: 1, ds: 0`; a concealed door, written only for
a key that admits its use (item 63), the same with **`door: 2`** (secret — a fact the Universal VTT file cannot carry,
where it is a closed portal); a window `move: 20, sight: 30, light: 30, sound: 20, door: 0` with `threshold {
attenuation: true, sight: 10, light: 10 }` (proximity; the threshold in the scene's distance units); an open portal
that is not a window (a raised way's end stair or ramp) no wall. The values are Foundry 14's named constants: `move` ∈
`WALL_MOVEMENT_TYPES { NONE: 0, NORMAL: 20 }`; `sight`, `light`, `sound` ∈ `EDGE_SENSE_TYPES { NONE: 0, LIMITED: 10,
NORMAL: 20, PROXIMITY: 30, DISTANCE: 40 }` (renamed from `WALL_SENSE_TYPES`, which Foundry 14's constants no longer
list); `door` ∈ `WALL_DOOR_TYPES { NONE: 0, DOOR: 1, SECRET: 2 }`; `ds` ∈ `WALL_DOOR_STATES { CLOSED: 0, OPEN: 1,
LOCKED: 2 }`; `dir` ∈ `EDGE_DIRECTIONS { BOTH: 0, LEFT: 1, RIGHT: 2 }` (renamed from `WALL_DIRECTIONS`; always 0 here).
**`lights[]`** — the scene's lights, each `{ x, y, rotation: 0, elevation, walls: true, vision: false, config: { dim,
bright, color, alpha: 0.5, angle: 360 }, levels }` with `x, y` in the scene's pixels, `elevation` its level's
`bottom`, `dim` the `.dd2vtt` light's `range` (its radius in squares) × `distance`, `bright` `dim ÷ 2`, `color`
`'#rrggbb'` (the `AARRGGBB` colour's last six digits) and `levels` its level's id alone.
*Requests:* BCR-VTT-3, BCR-VTT-4. *Evidence:* the note's §3 (the Wall, AmbientLight, Scene and Level tables; the CONST
index without `WALL_SENSE_TYPES` and `WALL_DIRECTIONS`, both URLs 404), §5 rows 14, 17, 18, 19, 20, 21, §1 *What
changed* (2) and (3); https://foundryvtt.com/api/ — the `BaseScene`, `BaseLevel`, `BaseWall`, `BaseAmbientLight`,
`LightData`, `SceneLevelsSetField` and `CONST.EDGE_SENSE_TYPES` / `EDGE_DIRECTIONS` / `WALL_MOVEMENT_TYPES` /
`WALL_DOOR_TYPES` / `WALL_DOOR_STATES` pages (API 14.368) — and https://foundryvtt.com/releases/14.359 (2026-04-01,
Scene Levels), fetched 2026-10-17. **STAGED (M3b; the levels with M-ENC's SE2 for a crop's set).**


## Volume 14 (V14's own text; `docs/volumes/V14-sites.md`)

### V14 §1b.4 Entity kinds (each rendered, labelled, exported, persisted)

**655.** **The `SiteLevel` and `TransientItem` rows' VTT cells** (BCR-VTT-2's V14 §1b.4 clause; BCR-VTT-5).
*Current text* (two cells):
> the per-level `.dd2vtt` scene (its ordinal the file suffix, `plat.level` its elevation and name)
> VTT objects (`objects_line_of_sight` for a barricade or cart)
*New text:* (a) the per-level `.dd2vtt` scene (its ordinal the file's two-digit suffix, an ordering convention only,
V14 §5.3; `plat.level` its elevation and name) and its `Level` in the Foundry scene JSON (§11.1)
(b) VTT objects (a barricade's or cart's closed polyline in both `objects_line_of_sight` and `line_of_sight`, V14 §5.3)
*Requests:* BCR-VTT-2, BCR-VTT-5. *Evidence:* as items 649 and 650 (the note's §4.2, §4.4, §5 rows 6 and 24).
**STAGED (M-ENC's SE2; M-SITE-A for a site level).**


### V14 §5.3 The encounter crop: the tactical style, the grid, the exports (item 136)

**656.** **The transient sight-blockers in both lists; the multi-floor convention corrected; the vendor strings beside
the fields** (BCR-VTT-5; BCR-VTT-2; BCR-VTT-3; BCR-VTT-6). *Current text* (three fragments; the first wraps across a
line, the second across three):
> the transient⏎items' sight-blocking shapes as `objects_line_of_sight`
> named `<base>.<ordinal>.dd2vtt` with the scene's ordinal as the numeric⏎suffix (0 the ground, then each storey or level in elevation order, `EncounterCrop.scenes`' ordinals) and the⏎scene's elevation and name in its `plat` object (`plat.level`, `plat.storey`) — the pairing the Foundry Scene Levels⏎importer reads; the research seat's item 136 (c) re-verification pins the exact rule with the profile's version.
> §11.1's profile emits exactly these per scene.
*New text:* (a) — *The VTT crop scope*'s sentence — the transient items' sight-blocking shapes as closed polylines in
**both** `objects_line_of_sight` (the contract's object-occluder list) and `line_of_sight` (the list every importer
reads: Foundry's importer of Universal VTT files never reads `objects_line_of_sight` on its default multi-level path),
the duplication noted as `plat.objectsAlsoInLos: true` so a reader that honours both lists can drop one (§11.1
*Fields*)
(b) — *The multi-floor convention*'s sentence, and one sentence added after it — named `<base>.<ordinal>.dd2vtt` with
the scene's ordinal as a two-digit, zero-padded numeric suffix (`00` the ground, then each storey or level in
elevation order, `EncounterCrop.scenes`' ordinals) and the scene's elevation and name in its `plat` object
(`plat.level`, `plat.storey`) — an ordering convention for people and for an importer's file list, never a pairing:
Foundry's importer of Universal VTT files takes the files one at a time under level names the user types and reads no
suffix, and the one Foundry level importer that reads a numeric floor suffix reads another product's own JSON pairs,
never a `.dd2vtt`, so no importer pairs these files by name. The path to one Foundry scene with every storey and level
as a native Scene Level, with no manual step, is §11.1's *Foundry scene JSON* — one Scene with a `Level` per scene of
the set, its elevation band and its image — written beside the `.dd2vtt` set; item 136 (c)'s re-verification of
2026-10-17 pinned the rule with the profile's version (§11.1's pin line; file l item 656).
(c) — *The fields per scene*'s closing clause, consequential on BCR-VTT-6 (the sentence says "exactly these") —
§11.1's profile emits exactly these per scene, beside the `plat` object and the two top-level vendor strings
`software` and `creator` the contract's description proposes for every writer (§11.1 *Per layer*).
*Requests:* BCR-VTT-5, BCR-VTT-2, BCR-VTT-3, BCR-VTT-6. *Evidence:* the note's §2, §4.1, §4.2, §4.4, §5 rows 6, 24,
25 and 26; the sources and dates of items 649, 650 and 651. **STAGED (M-ENC's SE2).**


### V14 §7 Tests and acceptance bars (T-V14-11)

**657.** **T-V14-11 reads the corrected convention, both lists, the vendor strings and the Foundry levels**
(BCR-VTT-2, BCR-VTT-3, BCR-VTT-5, BCR-VTT-6; consequential on items 649–656). *Current text* (four fragments of the
row):
> the transient items appear as objects and the occupancy as `plat.occupancy` notes, never as tokens;
> named `<base>.<ordinal>.dd2vtt`, the ground 0 and each storey or level by its ordinal,
> plus the `plat` object with `level`/`storey`,
> is recorded with the profile's version pin before SE2 exits |
*New text:* (a) the transient items appear as objects — each sight-blocking shape in both `objects_line_of_sight` and
`line_of_sight`, `plat.objectsAlsoInLos` true — and the occupancy as `plat.occupancy` notes, never as tokens;
(b) named `<base>.<ordinal>.dd2vtt`, the ordinal two zero-padded digits, the ground `00` and each storey or level by its
ordinal (an ordering convention, never read as a pairing),
(c) plus the top-level vendor strings `software` and `creator` and the `plat` object with `level`/`storey`,
(d) is recorded with the profile's version pin before SE2 exits (recorded 2026-10-17, §11.1's pin line); the crop's
Foundry scene JSON validates against Foundry 14's Scene schema with one `Level` per scene of the set (its
`elevation { bottom, top }` and `background.src`), every wall and light carrying its level's id, a window `sight` and
`light` 30 with its `threshold`, and a concealed door `door: 2` only at a key that admits it |
*Requests:* BCR-VTT-2, BCR-VTT-3, BCR-VTT-5, BCR-VTT-6. *Evidence:* as items 649–656. **STAGED (M-ENC's SE2: the bar).**


### V14 §12 CONFIRMED versus PLAUSIBLE

**658.** **The Scene Levels claim settled** (BCR-VTT-2; BCR-VTT-3). *Current text* (wraps across a line):
> that the Foundry Scene Levels convention is still the⏎  numeric-suffix pair at the item 136 (c) re-verification;
*New text:* that Foundry 14's Scene with `levels[]` (API 14.368, pinned in §11.1) still holds at Foundry 15's first
stable release — the numeric-suffix pairing this list once assumed was found absent at item 136 (c)'s re-verification
of 2026-10-17, the ordinal kept as an ordering convention and the Foundry scene JSON made the multi-level path
(V14 §5.3);
*Requests:* BCR-VTT-2, BCR-VTT-3. *Evidence:* the note's §1 *What changed* (1) and (2), §4.4, §5 row 24;
https://foundryvtt.com/releases/14.369 (2026-10-08) and https://foundryvtt.com/api/ (14.368), fetched 2026-10-17.
**STAGED (M-ENC's SE2).**

---

**Census.** 11 items (648–658): 7 base items under §11.1's profile — its heading and its *Scope*, *Fields*, *Per
layer*, *Per raised way*, *Per storey* and *Foundry scene JSON* paragraphs (648–654) — and 4 volume-14 items (655–658:
§1b.4, §5.3, §7, §12). Requests carried: BCR-VTT-1 (648, 649, 650), BCR-VTT-2 (649, 655, 656, 657, 658), BCR-VTT-3
(652, 654, 656, 657, 658), BCR-VTT-4 (654), BCR-VTT-5 (650, 655, 656, 657), BCR-VTT-6 (651, 656, 657), BCR-VTT-7 (653);
BCR-VTT-8 touches the survey only (*Not items*). One new cell (`vtt.levelBandCm`, item 654; choice (c) above); no new
API member (`ExportOpts.vtt` unchanged: the Foundry scene JSON is the existing `foundry` format's text); 0 CONFLICT
items. Every current-text quote verified by exact search on 2026-10-17 (`docs/validation/coherence/vtt-l.md`).
