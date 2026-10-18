# VTT export profile — re-verification against the formats as of 2026-10-17

Lane `research/vtt-profile-reverify` (research seat; clean room: observation and published documentation only; no proprietary
product source read; no asset copied). Base texts read first: `docs/ARCHITECTURE.md` §11.1 (the formats table's **VTT** row; *The
`.dd2vtt` profile (DEF-4)* with its *Scope*, *Fields*, *Per layer*, *Per raised way*, *Per storey*, *Foundry scene JSON* and
*Plain scene PNG* bullets; `ExportOpts.vtt` in §11.2), `research/sites/survey.md` §2.1 (Dungeon Alchemist's multi-floor
convention), §2.8–§2.9 (the Universal VTT contract as Arkenforge documents it), §6.1 (1); `docs/volumes/V14-sites.md` §5.3
(the crop scope, the stable grid origin, the per-storey scenes with numeric ordinal, the vendor block; V14 §11 Q4).

Every claim is tagged **[STATED]** (the cited page says it), **[MEASURED]** (counted or read from a fetched page or file),
**[INFERRED]** (my reading) or **[SNIPPET-ONLY]** (seen only in a search-result snippet because the page itself was blocked).
Every fetch below was made on **2026-10-17** through the lane's proxy with `curl` (the WebFetch route could not resolve
`arkenforge.com` or `help.roll20.net`; curl reached the former and was challenged by the latter — §7).

The two open-source Foundry importers were read as published documentation of an importer's expectations (both are public
repositories under MIT and GPL respectively), never as a map product's source; no product's own code was fetched.

---

## 1 Summary and the pinned version table

**What held.** The Universal VTT contract is exactly the field set §11.1 and V14 §5.3 emit — `format`, `resolution
{ map_origin, map_size, pixels_per_grid }`, `line_of_sight`, `objects_line_of_sight`, `portals { position, bounds, rotation,
closed, freestanding }`, `environment { baked_lighting, ambient_light }`, `lights { position, range, intensity, color,
shadows }`, `image` — with every position and size in squares [STATED, Arkenforge, 2026-10-17]. The light colour is eight
hex digits **alpha first** (`AARRGGBB`), as the profile says: Arkenforge's own sample file writes `ff8B4800`-style values and
Foundry's importer strips the first two digits [MEASURED]. An open portal (`closed: false`) is read as a window by the
Foundry importer, as file f item 454 assumed [MEASURED]. Vendor fields at the top level are explicitly permitted ("you can add
some of your own tags to the file as we have") and Arkenforge sets the precedent with `software` and `creator` [STATED,
MEASURED]. `map_origin` is honoured by Foundry's importer (every coordinate is re-based by it), so V14's "origin in grid units
from the arena's origin" is a working convention there [MEASURED].

**What changed.** Three things the design states are no longer true of the tools as published today:

1. **The multi-floor convention named in V14 §5.3 does not exist as the design describes it.** The Foundry module the survey
   cites (`da-level-importer`, "Dungeon Alchemist Level Importer", 0.0.8, verified Foundry 14) pairs **Dungeon Alchemist's own
   Foundry-export JSON** (`<stem>_NN.json` or `<stem>-_NN.json` plus a media file of the same stem; the plain `_NN` form only
   with exactly two digits) and reads a Foundry-shaped `walls[]` / `lights[]` from it — **it does not read `.dd2vtt` at all**
   [MEASURED, its README, CHANGELOG and parser]. The Universal VTT importer for Foundry (`dd-import`, "Universal Battlemap
   Importer", 6.1.1, verified 14) does build one native Scene Level per `.dd2vtt`/`.df2vtt`/`.uvtt` file in its default
   "Levels" mode, but the files are **chosen one by one in a dialog, each given a typed level name; no filename suffix is read
   and no elevation is written** [MEASURED, its source]. So `<base>.<ordinal>.dd2vtt` orders files for a human and for
   that dialog, but no importer "reads the pairing"; the sentence must be reworded (BCR-VTT-2) and the manual-step-free path to
   Foundry Scene Levels is the design's own **Foundry scene JSON**, written as one Scene with `levels[]` (BCR-VTT-3).
2. **Foundry 14 moved the background image into the Level document and binds walls and lights to levels.** The Scene schema has
   no `background` field; each `Level` carries `background.src`, `foreground.src`, `elevation { bottom, top }`, `name`, `sort`,
   `visibility.levels`; a Wall and an AmbientLight carry `levels` (a `SceneLevelsSetField`) [MEASURED, API 14.368]. The
   design's "a background image file" and "each deck as one more level with its elevation band" become concrete (BCR-VTT-3).
3. **The wall restriction constants were renamed** `CONST.EDGE_SENSE_TYPES` (`NONE 0, LIMITED 10, NORMAL 20, PROXIMITY 30,
   DISTANCE 40`) and `CONST.EDGE_DIRECTIONS` (`BOTH 0, LEFT 1, RIGHT 2`); `WALL_SENSE_TYPES` and `WALL_DIRECTIONS` are no
   longer in the v14 CONST index, while `WALL_MOVEMENT_TYPES` (`NONE 0, NORMAL 20`), `WALL_DOOR_TYPES` (`NONE 0, DOOR 1,
   SECRET 2`) and `WALL_DOOR_STATES` (`CLOSED 0, OPEN 1, LOCKED 2`) stay [MEASURED]. The field names on the wall (`move`,
   `sight`, `light`, `sound`, `door`, `ds`, `dir`) are unchanged; the design should name the values it writes (BCR-VTT-4).

Two smaller findings: Foundry's importer **never reads `objects_line_of_sight` in its default Levels path** (only the legacy
single-scene path merges it, and only under an option), so V14 §5.3's transient sight-blockers would be dropped on the default
Foundry import unless they also go to `line_of_sight` (BCR-VTT-5) [MEASURED]; and the `format` number has **no documented
value** — Arkenforge's page calls it "decimal … essentially a version number", Arkenforge's sample writes `1.0`, the Foundry
importer writes `0.2` for a stitched file and never checks the value, so the profile's `0.3` is unverifiable from primary
documentation and should be carried as "the originating product's value, not checked by any importer read" (BCR-VTT-1).

**Pinned versions (the profile should carry the first three; §6 gives the pin line).**

| format or product | version / revision | date stated | URL (fetched 2026-10-17) |
|---|---|---|---|
| Universal VTT (`.dd2vtt` / `.df2vtt` / `.uvtt`) — the only published field specification | Arkenforge article "All about Universal VTT files", published 2022-03-05, **modified 2026-08-22** (`article:modified_time`); `format` field "decimal", no value stated; sample file `format: 1.0` | 2026-08-22 [MEASURED, page meta] | https://arkenforge.com/universal-vtt-files/ ; sample https://www.dropbox.com/s/s494c3l6bnblmbu/The%20Pig%20and%20Whistle%20tavern.uvtt?dl=1 |
| Foundry Virtual Tabletop | **Version 14**, latest **Release 14.369 (Stable 11), 2026-10-08**; first v14 stable 14.359, 2026-04-01 ("Scene Levels" the flagship); API documentation page states "version 14.368 Stable" | 2026-10-08 [STATED] | https://foundryvtt.com/releases/ ; https://foundryvtt.com/releases/14.369 ; https://foundryvtt.com/releases/14.359 ; https://foundryvtt.com/api/ |
| Universal Battlemap Importer (`dd-import`, Moo Man; MIT) | **6.1.1**, compatibility minimum/verified/maximum 14; package page "Last Updated 4 months, 2 weeks ago" (≈ early June 2026) | ≈ 2026-06 [STATED, relative] | https://foundryvtt.com/packages/dd-import/ ; https://raw.githubusercontent.com/moo-man/fvtt-dd-import/master/module.json ; …/ddimport.js ; …/README.md |
| Dungeon Alchemist Level Importer (`da-level-importer`, Mestre Digital; GPL) | **0.0.8**, Foundry 14 only; package page "Last Updated 1 week, 6 days ago" (≈ 2026-10-03) | ≈ 2026-10-03 [STATED, relative] | https://foundryvtt.com/packages/da-level-importer ; https://raw.githubusercontent.com/brunocalado/da-level-importer/main/{module.json,README.md,CHANGELOG.md,scripts/da-importer.js,scripts/constants.js} |
| Fantasy Grounds (Unity) wiki, "Working with Images as the GM" | page version **53**, 2026-10-09 | 2026-10-09 [MEASURED, REST `version.when`] | https://fantasygroundsunity.atlassian.net/wiki/spaces/FGCP/pages/996640166/Working+with+Images+as+the+GM |
| MapTool wiki, "MapTool User Interface" (Import Universal VTT…) | last edited 2026-01-13 | 2026-01-13 [STATED] | https://wiki.rptools.info/index.php/MapTool_User_Interface |
| Roll20 help, "Universal Virtual Tabletop (UVTT) Support" | **blocked** (Cloudflare challenge, HTTP 403; DNS failure on the second route) — content [SNIPPET-ONLY] | — | https://help.roll20.net/hc/en-us/articles/41643201127831-Universal-Virtual-Tabletop-UVTT-Support |
| Owlbear Rodeo "Scene Importer" extension (Eppinguin; formerly UVTT Importer) | README on `main`, no version number on the page | — | https://raw.githubusercontent.com/Eppinguin/scene-importer/main/README.md |
| Dungeondraft (Megasploot) site | no version stated; "VTT Integrations — Import the universal VTT export from Dungeondraft" list | — | https://dungeondraft.net/ ; https://dungeondraft.net/faq |
| dungen.app | no version stated; no Universal VTT statement on its home page | — | https://dungen.app/ |
| Dungeon Alchemist site | no version stated; FAQ names Foundry, Roll20, Fantasy Grounds | — | https://www.dungeonalchemist.com/ ; https://www.dungeonalchemist.com/faqs |

---

## 2 The Universal VTT field table as currently documented

Source: the "Universal VTT developer info" section of https://arkenforge.com/universal-vtt-files/ (fetched 2026-10-17; the
page's own revision 2026-08-22) [STATED]; corroborated by Arkenforge's sample file "The Pig and Whistle tavern.uvtt"
(12 080 745 bytes; 41 lights, 12 portals, 0 `line_of_sight` polylines, 58 `objects_line_of_sight` polygons) [MEASURED].
The page's framing sentences, verbatim: "The UVTT format is a JSON string with a hip new rebrand. While you can add some of your
own tags to the file as we have, there is a core set of tags that is supported throughout all VTT software. … **All positions
and sizes are in the unit of 'Squares'**." Author credit: "a file format created by Megasploot" (Dungeondraft's developer);
"UVTT files come in a few different flavours; .dd2vtt, .df2vtt, and .uvtt, but underneath these are all the same file".

| field | type (as stated) | unit / meaning (as stated) | in the sample [MEASURED] |
|---|---|---|---|
| `format` | "decimal. This is essentially a version number" | no value given | `1.0` (float) |
| `resolution.map_origin.x`, `.y` | float | "(usually 0)" — squares | `0`, `0` (ints) |
| `resolution.map_size.x`, `.y` | float | "size in squares" | `32`, `22` |
| `resolution.pixels_per_grid` | int | "number of pixels per square" | `120` |
| `line_of_sight` | "Array of [x][y] values per object" — an array of polylines, each an array of `{x, y}` | squares; wall colliders | `[]` |
| `objects_line_of_sight` | the same shape | squares; object occluders | 58 polylines, each closed (first point = last), 3–10 points |
| `portals[]` | array | — | 12 |
| `portals[].position` | `{x, y}` | squares | present; **does not equal the bounds' midpoint** in the sample (e.g. position (1.34, 0.006) against bounds (4.39, 21.11)–(5.73, 21.11)) — the importers read `bounds` (§3, §4) |
| `portals[].bounds` | "array of x,y values" | squares; the door line | two points in every sample portal |
| `portals[].rotation` | float | "Radians" | `0` in all 12 |
| `portals[].closed` | bool | a closed portal blocks (a door); the Foundry importer reads an open one as a window (§3) | `true` in all 12 |
| `portals[].freestanding` | bool | undocumented beyond the name | `false` in all 12; not read by the Foundry importer |
| `environment.baked_lighting` | bool | "Is lighting baked into this image?" | `false` |
| `environment.ambient_light` | "colour code hex" | "Ambient lighting colour to apply over the entire scene" | **absent** from Arkenforge's own sample |
| `lights[]` | array | — | 41 |
| `lights[].position` | `{x, y}` float | squares | floats |
| `lights[].range` | float | squares (the radius; the Foundry importer makes it the dim radius, §3) | 2.25, 4.5, 1.125 |
| `lights[].intensity` | float | unitless | `0.5` in all 41 |
| `lights[].color` | "colour code hex" | eight hex digits, **alpha first** — `AARRGGBB` [MEASURED: `ff8B4800` ×19, `ff462D00` ×12, `ff575112` ×5 …; the Foundry importer takes `"#" + color.substring(2)`] | as left |
| `lights[].shadows` | bool | whether the light casts shadows | `true` |
| `image` | "base64 encoded PNG or WEBP" | the flat map | PNG (`iVBORw0KGgo…`), 12.06 MB of base64 |
| *vendor* `software`, `creator` | string | Arkenforge's own additions: "We have added in a 'software' and 'creator' field for our own use, and we hope it catches on for other platforms as well" [STATED] | `"Arkenforge"`, `"Nathan"` |

Constraints stated on the page [STATED]: "as the map is a single image, UVTT files can not contain animated content, nor
individually selectable map images/tokens." Nothing on the page names a storey, an elevation, a portal name, a one-way door, a
hidden flag or a window flag [MEASURED: zero occurrences of those words in the developer section].

**Who writes it** [STATED, the same page, "At the time of publishing there are 4 map builders" — the list then names five]:
Arkenforge Toolkit (`.uvtt`), Dungeondraft (`.dd2vtt`, "selected by default"), Dungeon Fog (`.df2vtt`), Dungeon Alchemist
(`.dd2vtt`, "select 'Universal VTT Export' in the 'Format' section"), MapForge ("any of the three major UVTT extensions").
**dungen.app** states no Universal VTT export on its home page; it offers "Foundry VTT – Walls", "Dynamic Lighting for Roll20,
Walls for Foundry VTT and LoS Definitions for Fantasy Grounds Unity – available to patrons" [MEASURED,
https://dungen.app/]. Dungeondraft's own site confirms the export by its integration list ("Import the universal VTT export from
Dungeondraft": Foundry VTT — Module; Encounter+ — Native; D20Pro — Native; Roll20 — Module; MapTool — Native; Arkenforge —
Native; Fantasy Ground Unity — Native) [STATED, https://dungeondraft.net/faq]. Dungeon Alchemist's FAQ says only "Foundry, Roll20
and FantasyGrounds are currently supported and integrate seamlessly" and its home page "all walls, lights and doors are imported
right along" — the `.dd2vtt` claim for it rests on Arkenforge's page [STATED].

**Who reads it** [STATED unless marked]: Arkenforge Toolkit ("the only platform that can both import and export"); Foundry via
"Moo Man"'s Universal Battlemap Importer (§3, §4); Roll20 ("now has official support") — the help article is blocked, the
[SNIPPET-ONLY] reading: native upload of `.uvtt` / `.dd2vtt` / `.df2vtt` through Page Menu → Create Page → Upload Background, the
image on the Map layer and "walls, doors, windows, and lights" on the Dynamic Lighting layer, corroborated by a third-party guide
fetched in full (https://www.czepeku.com/blog/how-to-use-uvtt-files-in-roll20 [STATED]) and by Roll20's community
"UniversalVTTImporter" script thread (https://app.roll20.net/forum/permalink/11038870, The Aaron, 2022: "Window Portals,
Colored Lights", "Opaque Objects" [STATED]); Fantasy Grounds Unity ("official native support … imported in the same way as any
standard image file") — FG's wiki: "Fantasy Grounds VTT supports any JPG and PNG images, as well as … WEBP and WEBM formats,
and Universal VTT file formats – DD2VTT, DF2VTT and UVTT used by such applications as Eldritch Foundry, Dungeondraft, Dungeon
Fog, Dungeon Alchemist, Hero Forge, and others" [STATED, page version 53, 2026-10-09]; the community tool `uvtt2fgu` records
"Fantasy Grounds Unity v4.4 introduced the feature where FGU itself can import the Universal VTT file format" [STATED,
https://raw.githubusercontent.com/Imagix/uvtt2fgu/master/README.md]; MapTool ("Import Universal VTT… Imports a Universal VTT map
with the .dd2vtt extension … UVTT maps can include VBL and Light definitions along with the map image … For files with other
extensions select the All File option" [STATED, wiki edited 2026-01-13]); D20Pro and Encounter Plus ("native UVTT support,
however … no tutorials or documentation on the import process could be found" [STATED, Arkenforge]); **Owlbear Rodeo** — not on
Arkenforge's list — through the "Scene Importer" extension ("imports maps, complete with walls, doors, and lights … from Universal
VTT (.uvtt) files, DD2VTT (.dd2vtt) files, FoundryVTT scene JSON files, FoundryVTT Module ZIPs"; "Automatic DPI adjustment based
on grid size" [STATED]) and the "Smoke & Spectre" extension (per the Czepeku Owlbear guide, fetched [STATED, third party]).

**Vendor extensions seen**: Arkenforge's `software` and `creator` (above). Foundry's importer, when stitching several files
into one legacy scene, writes its own aggregate with `format: 0.2` and no `objects_line_of_sight` [MEASURED, `ddimport.js`
l. 609]. No other product's extension is documented on any fetched page.

---

## 3 Foundry's schemas as currently documented (API documentation "Version 14", stating "version 14.368 Stable")

All from https://foundryvtt.com/api/ pages fetched 2026-10-17 [MEASURED from the `defineSchema()` listings and the typed
interfaces; the enum values from the `CONST` variable pages].

**Wall** (`foundry.documents.BaseWall.defineSchema`; interface `WallData`):

| field | type | meaning (as documented) |
|---|---|---|
| `_id` | string | — |
| `c` | `number[]` | "The wall coordinates, a length-4 array of finite numbers [x0,y0,x1,y1]" (scene pixels) |
| `move` | number | "The movement restriction type" — `CONST.WALL_MOVEMENT_TYPES { NONE: 0, NORMAL: 20 }` |
| `sight` | number | "The visual restriction type" — `CONST.EDGE_SENSE_TYPES { NONE: 0, LIMITED: 10, NORMAL: 20, PROXIMITY: 30, DISTANCE: 40 }` |
| `light` | number | "The illumination restriction type" — the same enum |
| `sound` | number | "The auditory restriction type" — the same enum |
| `door` | number | "The type of door which this wall contains" — `CONST.WALL_DOOR_TYPES { NONE: 0, DOOR: 1, SECRET: 2 }` |
| `ds` | number | "The state of the door" — `CONST.WALL_DOOR_STATES { CLOSED: 0, OPEN: 1, LOCKED: 2 }` |
| `dir` | number | "The direction of effect imposed by this wall" — `CONST.EDGE_DIRECTIONS { BOTH: 0, LEFT: 1, RIGHT: 2 }` |
| `doorSound` | string | a door sound key |
| `threshold` | `{ attenuation?: boolean; light?: number; sight?: number; sound?: number }` | proximity thresholds (window walls) |
| `animation` | SchemaField | door animation (in the schema; not in the `WallData` interface page) |
| `levels` | `SceneLevelsSetField` | "A nullable set field used to reference a set of specific Scene Level documents" (in the schema; **not listed on the `WallData` interface page** — a documentation gap [MEASURED]) |
| `flags` | DocumentFlags | — |

The restriction names: `CONST.WALL_RESTRICTION_TYPES = ["light", "sight", "sound", "move"]`; the newer
`CONST.EDGE_RESTRICTION_TYPES = ["light", "darkness", "sight", "sound", "move"]`. `CONST.WALL_DOOR_INTERACTIONS = ["open",
"close", "lock", "unlock", "test"]`. The CONST module index lists `WALL_DOOR_STATES`, `WALL_DOOR_TYPES`, `WALL_MOVEMENT_TYPES`,
`WALL_RESTRICTION_TYPES`, `EDGE_SENSE_TYPES`, `EDGE_DIRECTIONS`, `EDGE_DIRECTION_MODES { NORMAL: 0, REVERSED: 1, BOTH: 2 }` and
**no `WALL_SENSE_TYPES` or `WALL_DIRECTIONS`** (both URLs 404) [MEASURED]. (The 6.1.1 importer still spells
`CONST.WALL_SENSE_TYPES.NORMAL`; whether an alias survives at runtime is unverifiable from the documentation.) The knowledge-base
article https://foundryvtt.com/article/walls/ describes the same options in words: Movement None/Normal; Light, Sight & Sound
None/Normal/Limited/Proximity/Reverse Proximity with "Proximity Threshold Attenuation"; Wall Direction Both/Left/Right; Is Door?
None/Door/Secret; Door State Closed/Open/Locked [STATED].

**AmbientLight** (`BaseAmbientLight.defineSchema`; interface `AmbientLightData`):

| field | type | meaning |
|---|---|---|
| `x`, `y` | number | "The x-coordinate position of the origin of the light" (scene pixels) |
| `rotation` | number | "The angle of rotation … between 0 and 360" |
| `elevation` | number | "The elevation" |
| `walls` | boolean | "Whether or not this light source is constrained by Walls and surfaces" |
| `vision` | boolean | "Whether or not this light source provides a source of vision" |
| `hidden` | boolean | — |
| `locked` | boolean | (schema only) |
| `name` | string | — |
| `levels` | `SceneLevelsSetField` | (schema only) |
| `config` | `LightData` | `foundry.data.LightData.defineSchema`: `alpha, angle, animation, attenuation, bright, color, coloration, contrast, darkness, dim, luminosity, negative, priority, saturation, shadows` — `dim` and `bright` are radii in the scene's distance units [INFERRED from the importer's `range × grid.distance`], `angle` an `AngleField`, `color` a `ColorField`, `shadows` a `NumberField` |

**Scene** (`BaseScene.defineSchema`; interfaces `SceneData`, `GridData`, `SceneEnvironmentData`, `LevelData`):

| field | type | meaning |
|---|---|---|
| `grid` | `{ type?, size?, distance?, units?, style?, thickness?, color?, alpha? }` | `type` "a number from CONST.GRID_TYPES" `{ GRIDLESS: 0, SQUARE: 1, HEXODDR: 2, HEXEVENR: 3, HEXODDQ: 4, HEXEVENQ: 5 }`; `size` "the width (or height) of a single grid space" (px; `CONST.GRID_MIN_SIZE = 20`); `distance` "the number of distance units which are represented by a single grid space"; `units` "a label for the units of measure" |
| `width`, `height` | number | "normally the width/height of the background media" (px) |
| `padding` | number | "the proportion of canvas padding applied around the outside of the scene" |
| `shiftX`, `shiftY` | number | background offset |
| `levels` | `LevelData[]` | "A collection of embedded Level objects" — **new in v14** |
| `initialLevel` | string \| null | "The ID of the initial level for the scene" |
| `walls`, `lights`, `tokens`, `tiles`, `notes`, `drawings`, `regions`, `sounds` | embedded collections | — |
| `environment` | `{ base: EnvironmentData; dark: EnvironmentData; cycle: boolean; darknessLevel: number (0 midday … 1 midnight); darknessLevelLock: boolean; globalLight: GlobalLightData }` | ambience |
| `fog`, `weather`, `tokenVision`, `transition`, `initial`, `thumb`, `journal`, `journalEntryPage`, `playlist`, `playlistSound`, `navigation`, `navName`, `navOrder`, `active`, `folder`, `sort`, `ownership`, `flags`, `_stats` | — | — |
| **no `background` / `foreground`** at the scene level | — | the background media lives on each Level [MEASURED: absent from the v14 schema listing] |

**Level** (`BaseLevel.defineSchema`; interface `LevelData`): `_id`, `name`, `sort`, `elevation: { bottom: number; top:
number }`, `background: LevelTexture & { color: number }` (its `src` the image), `foreground: LevelTexture`, `fog`, `textures`,
`visibility: { levels: Set<string> }`, `flags`. The documented example creates "Basement" `{bottom: -10, top: 0}`, "Downstairs"
`{0, 10}`, "Upstairs" `{10, 20}` [STATED]; the unit is not named on the page — the importers treat it as the scene's distance
unit (the DA importer's `FLOOR_HEIGHT = 10` "in Foundry level units"; 0–10, 11–20, 21–30 …) [INFERRED]. Release 14.359
(2026-04-01) calls Scene Levels "native multi-level scene support … stack multiple images at defined elevations … vision,
movement, and combat all work fluidly across levels"; 14.353 (Prototype 3) describes "phase 1": "multiple levels in a Scene,
define their elevation ranges, make sublevels visible to upper levels, transport Tokens between levels with the new Change Level
behavior, block off certain areas with the new Surface region" [STATED]. No knowledge-base article titled "Scene Levels" was
found (`/article/scene-levels/` and `/article/levels/` 404; a search found none) [MEASURED].

---

## 4 The multi-floor convention and the importers' expectations

**4.1 Dungeon Alchemist Level Importer (`da-level-importer` 0.0.8)** — the module the survey's §2.1 names
("foundryvtt.com/packages/da-level-importer, verified for Foundry 14").

* What it reads [STATED, package page and README]: "Dungeon Alchemist exports multi-floor maps as sibling file pairs — one media
  file (image or video) and one .json data file per floor, named with a numeric suffix (e.g. TavernMap-_0.webp,
  TavernMap-_0.json, TavernMap-_1.webp, TavernMap-_1.json). This module reads all pairs in a folder, parses each JSON for wall,
  door, and light data, and creates a single Foundry VTT Scene where each floor becomes a native Scene Level". CHANGELOG 0.0.8:
  "Recent Dungeon Alchemist versions name floors `Map_00`, `Map_01`, … instead of the older `Map-_00` … Both formats are now
  accepted. The plain `_` form only counts with exactly two digits" [STATED]; the regex
  `/(?:-_|_(?=\d{2}$))(\d+)$/` [MEASURED, `da-importer.js` l. 24]. Pairing is by filename stem, `.json` with `.jpg .jpeg .png
  .webp .webm .mp4 .m4v` [STATED].
* The JSON it parses is **Dungeon Alchemist's Foundry-shaped export, not Universal VTT** [MEASURED, `_mapWall`, `_mapLight`,
  the scene build]: per floor `walls[] { c, move, sense, sound, door }` with a compact `{0: none, 1: normal, 2: limited}` scheme
  the importer maps to `move` `{0 → 0, else → 20}` and `sight`/`sound` `{2 → 10, 1 → 20, 0 → 0}`, `door` passed through
  (`door === 1` gets the chosen texture and sound), `ds: 0`; `lights[] { x, y, dim, bright, tintColor, tintAlpha }`; the scene's
  `width`, `height`, `padding`, `grid` (px), `gridColor`, `gridDistance` (default 5), `gridUnits` (default "ft"). None of
  `line_of_sight`, `portals`, `pixels_per_grid` or `image` is read.
* Levels: one per pair in suffix order, elevation ladder `0–10, 11–20, 21–30, …` by default (`FLOOR_HEIGHT = 10`), editable;
  `Roof`, `Start`, `Visible` columns; walls and lights get `levels: [levelId]`; lights `elevation` the level's bottom [STATED,
  MEASURED]. A "DA Stairs" tool places a Region with the native `changeLevel` behaviour [STATED].

**4.2 Universal Battlemap Importer (`dd-import` 6.1.1)** — Foundry's Universal VTT importer.

* Accepts `.dd2vtt,.df2vtt,.uvtt` [MEASURED, l. 689]; README: "Export your map with the Universal VTT option in DungeonFog,
  Dungeondraft, Arkenforge, or AutoWall … Fidelity: How many cave walls are used … Offset: How much to nudge the walls away from
  the edge" [STATED]. Package page: "Allows Importing Dungeondraft, DungeonFog or Arkenforge export files"; versions 6.0.0–6.1.1
  verified 14, 5.x verified 13, 4.0.0 verified 12 [STATED].
* **Multi-image modes**: `"l": "Levels"` is the default (`settings.multiImageMode || "l"`); the dialog adds files one at a time,
  each with a free-text `levelName`; `_addLevelData` creates a Level `{ _id, name: content.levelName || content.name,
  background: { src } }` — **no `elevation` is written** (the schema default applies), every wall and light of that file gets
  `levels: [id]` [MEASURED, ll. 160–170, 344–375, 688–690]. No filename pattern is read anywhere [MEASURED: no regex on file
  names in the file].
* Scene: `grid.size` = the first file's `pixels_per_grid` (or a custom value); `width = pixels_per_grid × map_size.x`,
  `height = … × map_size.y`; a browser-canvas cap `BROWSER_LIMITS { maxDim: 11000, maxArea: 11000² }` lowers the effective
  pixels-per-grid of every level ("Image downscaled (browser canvas limit)") [MEASURED].
* Walls: from `line_of_sight` only (`GetWalls` reads `file.line_of_sight`); `objects_line_of_sight` is concatenated into
  `line_of_sight` **only in the legacy single-scene path and only under the `objectWalls` option** (l. 625–626) — the default
  Levels path never reads it [MEASURED]. Fidelity drops short segments (`6 − fidelity` skip count); `offset` nudges walls.
* Doors: from `portals`, `bounds[0]`/`bounds[1]` only, re-based by `map_origin` and scaled by pixels-per-grid; `door = closed ? 1
  : 0` (or always 1 with the "openableWindows" setting); `light`/`sight` = `NORMAL` when closed, else `PROXIMITY` with
  `threshold { attenuation: true, light: 10, sight: 10 }` — the comment: "Proximity type if door.closed = false (assumes they
  are windows)"; `position`, `rotation`, `freestanding` unused [MEASURED, ll. 1088–1123].
* Lights: `x, y` from `position` (re-based and scaled; lights outside the map are dropped by `isWithinMap`), `rotation 0`,
  `config { angle: 360, color: "#" + color.substring(2), dim: range × grid.distance, bright: dim / 2, alpha: 0.05 × intensity }`;
  `shadows` and `environment` unused [MEASURED, ll. 1125–1150].
* `format` is never read [MEASURED: the only occurrence writes `0.2`].

**4.3 Owlbear Rodeo Scene Importer**: `.uvtt`, `.dd2vtt`, Foundry scene JSON, Foundry module ZIPs; "Automatic wall, door, and
light creation"; "Automatic DPI adjustment based on grid size"; a UVTT file without an image can only "Add Walls to Current
Scene" [STATED]. **MapTool**: `.dd2vtt` by extension, "VBL and Light definitions" [STATED]. **Roll20**: walls, doors, windows and
lights on the Dynamic Lighting layer [SNIPPET-ONLY + third-party guide]. **FGU**: the file is imported "in the same way as any
standard image file"; the wiki lists the three extensions among image types [STATED]; no field-level documentation found.

**4.4 What this means for a numeric-suffix convention.** Today **no importer reads a numeric suffix on `.dd2vtt` files**: the
only suffix reader (`da-level-importer`) reads a proprietary Foundry-shaped JSON pair, and the UVTT importer takes files from a
dialog in the order and under the names the user types. A multi-storey PLAT export therefore reaches Foundry Scene Levels with
no manual step only through a **Foundry scene JSON that already contains `levels[]`** (the Owlbear importer reads "FoundryVTT
scene JSON files" and module ZIPs too) — the design has that format in §11.1 and needs only to state its v14 shape (§6,
BCR-VTT-3). The `.dd2vtt` set stays one file per scene for every other reader.

---

## 5 DELTA table — every statement of §11.1's profile and V14 §5.3 against the current documentation

Legend: **unchanged** · **changed** (what to) · **unverifiable** (why). Citations: A = Arkenforge page 2026-10-17; S = Arkenforge
sample file; F = Foundry API 14.368 pages; R = Foundry release notes; D = `dd-import` 6.1.1; L = `da-level-importer` 0.0.8;
M = MapTool wiki; G = FG wiki v53; O = Owlbear Scene Importer README.

| # | the design's statement (base section) | status | finding |
|---|---|---|---|
| 1 | §11.1 VTT row: "Foundry-class scene JSON and Universal VTT (`.dd2vtt`)"; "no manual steps on import" | **changed** in part | UVTT import into Foundry is manual per file (a dialog, a level name each; D) — the no-manual-step path to a multi-level Foundry scene is the scene JSON with `levels[]` (F, §3; BCR-VTT-3) |
| 2 | *Scope*: ≤ 8 192 px per side at the declared grid; split otherwise; ≥ 50 px per square | **unchanged**, with a note | Foundry's importer caps a level at 11 000 px per side / 11 000² px area and downscales (D [MEASURED]); Foundry's own `GRID_MIN_SIZE` is 20 px (F) — the 8 192 cap and the 50 px floor are inside both; no VTT's documented limit was found for Roll20 or FGU (unverifiable) |
| 3 | *Fields*: "`format` 0.3" | **unverifiable** → reword | A: "decimal … essentially a version number", no value; S: `1.0`; D writes `0.2` for its stitched aggregate and never reads the field; Dungeondraft publishes no format document. `0.3` is the originating product's value by common observation, not by any fetched document (BCR-VTT-1) |
| 4 | `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }` | **unchanged** | A: `map_origin` float "(usually 0)", `map_size` float "size in squares", `pixels_per_grid` int (§2). V14 §5.3's non-zero `map_origin` is honoured by D (every wall, door and light coordinate is re-based by `map_origin`) [MEASURED]; honoured by Roll20/FGU — unverifiable |
| 5 | `line_of_sight` "polylines in grid units" | **unchanged** | A: "Array of [x][y] values per object", "All positions and sizes are in the unit of 'Squares'" |
| 6 | `objects_line_of_sight` "empty" on the ground scene (§11.1); the transient items' sight-blocking shapes there (V14 §5.3) | field **unchanged**; importer **changed** | A documents the field; D's default Levels path never reads it, the legacy path only under an option [MEASURED]; O and M say "walls"/"VBL" without naming the list. A transient barricade written only to `objects_line_of_sight` blocks nothing in a default Foundry import (BCR-VTT-5) |
| 7 | `portals` `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` | **unchanged** | A: `position {x,y}`, `bounds` "array of x,y values", `rotation` float radians, `closed` bool, `freestanding` bool; S: two bounds points in every portal; D reads `bounds[0..1]` only, ignores `position`, `rotation`, `freestanding` — so the design's `position` must still be written (A requires it) but nothing fetched reads it; S's own `position` values do not match the bounds' midpoints [MEASURED], so the midpoint is the safe value |
| 8 | a window "a portal written `closed: false`, since the format has no window flag and importers read an open portal as a window" (file f item 454) | **unchanged** | D: `closed: false` → `door 0`, `sight`/`light` `PROXIMITY` with attenuation threshold 10 — "assumes they are windows" [MEASURED]; Roll20's script thread names "Window Portals" [STATED, community thread]; Roll20's native import places "windows" [SNIPPET-ONLY]; A still has no window flag [MEASURED] |
| 9 | "a concealed door only for a key that admits its use" | **unchanged** | A has no hidden/secret flag [MEASURED]; D writes `door 1`, never `2` (SECRET) — a secret door can only be a Foundry-scene-JSON fact (`door: 2`), never a UVTT one |
| 10 | `lights { position, range in squares (its radius), intensity: 1, color, shadows: true }`, `color` `AARRGGBB` | **unchanged** | A: `position {x,y}` float, `range` float, `intensity` float, `color` "colour code hex", `shadows` bool; S: alpha-first eight digits [MEASURED]; D: `dim = range × grid.distance`, `bright = dim/2`, `alpha = 0.05 × intensity`, `color` from digits 3–8 [MEASURED]. Note: `intensity: 1` yields a Foundry colour alpha of 0.05 (S's lights use 0.5 → 0.025); the illumination radii do not depend on it |
| 11 | `environment { baked_lighting: true, ambient_light }` | **unchanged** (field); **note** | A documents both; S omits `ambient_light` and writes `baked_lighting: false`; D ignores `environment` [MEASURED]. `baked_lighting: true` with the lights also listed is what the profile writes; no importer read honours it (unverifiable for Roll20/FGU) |
| 12 | `image` "the scene PNG (base64)" | **unchanged** | A: "base64 encoded PNG or WEBP" — WebP is admissible (D re-encodes to WebP on request) |
| 13 | *Per layer*: "a `plat` extension object" | **unchanged** | A: "you can add some of your own tags to the file as we have" — vendor keys at the top level, Arkenforge's `software`, `creator` [STATED, MEASURED]; D, L, O, M read no vendor key (BCR-VTT-6 adds `software`/`creator` beside `plat`) |
| 14 | *Per raised way*: "a Foundry scene writes each deck as one more level with its elevation band" | **changed** (made concrete) | F: a Level is `{ name, sort, elevation { bottom, top }, background.src, foreground.src, visibility.levels }`; walls and lights carry `levels` (BCR-VTT-3) |
| 15 | *Per storey*: "the stair core a named portal on both storeys' scenes" | **changed** | A: a portal has no name [MEASURED]; the name can live only in the `plat` object (BCR-VTT-7) |
| 16 | *Per storey*: `range` "the room's diameter in squares" | **unchanged** | D: dim radius = `range` squares — a room-diameter radius lights the room and a square beyond; a design choice, not a format fact |
| 17 | *Foundry scene JSON*: "walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged …)" | **unchanged** names, **changed** enums | F: `c` length-4; `move` ∈ `WALL_MOVEMENT_TYPES {0, 20}`; `sight`, `light`, `sound` ∈ `EDGE_SENSE_TYPES {0, 10, 20, 30, 40}`; `door` ∈ `{0, 1, 2}`; `ds` ∈ `{0, 1, 2}`; `dir` ∈ `EDGE_DIRECTIONS {0, 1, 2}`; `WALL_SENSE_TYPES`/`WALL_DIRECTIONS` gone from the CONST index (BCR-VTT-4) |
| 18 | *Foundry scene JSON*: "the same lights" | **unchanged** names | F: `AmbientLight { x, y, rotation, elevation, walls, vision, hidden, config: LightData { dim, bright, color, angle, alpha, … } }` (BCR-VTT-4 names them) |
| 19 | *Foundry scene JSON*: "a background image file, grid size and distance units — written before the walls" | **changed** | F: no scene-level `background` in v14; the image is `levels[i].background.src`; `grid { type: 1, size, distance, units }`; JSON order is immaterial (BCR-VTT-3) |
| 20 | *Foundry scene JSON*: "journal entries from the gazetteer" | **unchanged** | F: `journal`, `journalEntryPage`, `notes` on the Scene |
| 21 | §11.2 `vtt.pxPerSquare` 100, ≥ 50; `squareM` 1.5 or 1; metadata `flags.plat` on a Foundry scene | **unchanged** | F: `grid.size` px (min 20), `grid.distance`, `grid.units` free strings — `squareM 1.5` ↔ `distance 5, units "ft"` (L's defaults are exactly those [MEASURED]); `flags: DocumentFlags` exists on Scene, Wall, Light |
| 22 | §11.1 *Plain scene PNG* `{cols}x{rows}` | **unverifiable** | no fetched page documents a grid-from-filename reader (the claim is file f's; outside this lane's sources) |
| 23 | V14 §5.3: `ExportOpts.vtt.crop`, `gridOrigin: 'address'`, `map_origin` the crop's origin on the world grid | **unchanged** | A permits any float origin; D re-bases by it [MEASURED]; the token-on-the-same-cell property across storey scenes holds inside one Foundry scene with Levels when every Level's image shares the frame (F) |
| 24 | V14 §5.3: `<base>.<ordinal>.dd2vtt`, "the pairing the Foundry Scene Levels importer reads" | **changed** | L pairs `<stem>_NN.json` + media and reads a Foundry-shaped JSON, not `.dd2vtt`; D reads no suffix (§4). Keep the ordinal for ordering; drop the "importer reads" claim; route the no-manual-step multi-level import through the Foundry scene JSON (BCR-VTT-2, -3) |
| 25 | V14 §5.3: `plat.level`, `plat.storey`, `plat.difficultTerrain`, `plat.occupancy`, `plat.sites` (vendor block, off by default), `waterStamp` | **unchanged** | vendor keys permitted (A); nothing fetched reads them, so "the common fields never change" holds (V14 §11 Q4's answer stands) |
| 26 | V14 §5.3: "the fields per scene are the Universal VTT contract's … exactly these" | **unchanged** | the field list matches A one for one (§2) |
| 27 | survey §2.9: producers Arkenforge, Dungeondraft, DungeonFog, Dungeon Alchemist, MapForge; consumers Arkenforge, Foundry (module, fidelity + offset), Roll20 (official), FGU (native), MapTool, D20Pro, Encounter+ | **unchanged**, plus Owlbear | A unchanged on the day; Owlbear Rodeo reads it through extensions (O) — add to the list; dungen.app is not a producer on its own page [MEASURED] |
| 28 | survey §2.1: DA's convention "one media file … and one .json data file per floor, named with a numeric suffix"; "Any wall exported with door=1" | **unchanged**, now exact | L: `-_NN` or `_NN` (two digits), `Map_00` the current form [STATED, CHANGELOG 0.0.8] |
| 29 | survey §2.9: "verified Foundry 14" | **unchanged** | D 6.1.1 and L 0.0.8 both minimum/verified/maximum 14; Foundry 14.369 current (R) |

---

## 6 Recommendations — base change requests (file f's form) and the version pin

| request | base heading | the current text (quoted once) | the new text or mechanism |
|---|---|---|---|
| **BCR-VTT-1** the `format` value and the pin line | §11.1 *The `.dd2vtt` profile (DEF-4)*, *Fields* | "`format` 0.3;" | "`format` 0.3 — the decimal the originating product writes; the published specification (Arkenforge's developer description, revision 2026-08-22) gives the field no value, Arkenforge's own sample writes 1.0, and the Foundry importer (6.1.1) never reads it, so the value is carried for compatibility, not checked (research/vtt/profile-reverification-2026-10-17.md §5 row 3);" and the profile's heading gains the pin: "**Pinned (2026-10-17):** Universal VTT per Arkenforge's developer description revised 2026-08-22; Foundry VTT 14 (14.369, 2026-10-08; API 14.368) with `dd-import` 6.1.1 and `da-level-importer` 0.0.8, both verified 14; MapTool wiki 2026-01-13; FG wiki page 53 of 2026-10-09; Roll20's help article unverified (blocked)." |
| **BCR-VTT-2** the multi-floor convention's claim (C14-06) | V14 §5.3 *The multi-floor convention*; V14 §1b.4 `SiteLevel` row; survey §6.1 (1) | "named `<base>.<ordinal>.dd2vtt` with the scene's ordinal as the numeric suffix … and the scene's elevation and name in its `plat` object (`plat.level`, `plat.storey`) — the pairing the Foundry Scene Levels importer reads; the research seat's item 136 (c) re-verification pins the exact rule with the profile's version." | "named `<base>.<nn>.dd2vtt` with the scene's ordinal as a two-digit, zero-padded numeric suffix (00 the ground, then each storey or level in elevation order) and the scene's elevation and name in its `plat` object (`plat.level`, `plat.storey`) — an ordering convention for people and for the Foundry Universal Battlemap Importer's multi-file dialog, which takes the files one by one under typed level names and reads no suffix; the Dungeon Alchemist Level Importer reads Dungeon Alchemist's own `<stem>_NN.json` pairs, never a `.dd2vtt`, so no importer pairs these files by name. The manual-step-free path to one Foundry scene with every storey as a native Scene Level is the Foundry scene JSON below (§11.1 *Foundry scene JSON*, BCR-VTT-3), written beside the `.dd2vtt` set (pinned by research/vtt/profile-reverification-2026-10-17.md §4)." |
| **BCR-VTT-3** the Foundry scene JSON as a v14 multi-level scene | §11.1 *The `.dd2vtt` profile (DEF-4)*, *Foundry scene JSON*; *Per raised way* ("a Foundry scene writes each deck as one more level with its elevation band") | "the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged; …), the same lights, a background image file, grid size and distance units — written before the walls — and journal entries from the gazetteer." | "one Foundry 14 Scene document per export scope: `grid { type: 1, size: pixels_per_grid, distance and units from `squareM` — `5, 'ft'` for 1.5 m, `1, 'm'` for 1 m }`, `width` and `height` in pixels, `padding` 0, `initialLevel` the ground's id, and **one `Level` per scene of the set** — `{ _id, name, sort: the ordinal, elevation: { bottom, top } in the scene's distance units from the scope's ground datum (a storey its floor and ceiling, a depth band its band, a deck its mean deck elevation), background: { src: the scene image file written beside the JSON } }`, the ground's `visibility.levels` empty and each deck's naming the ground; `walls[]` with `c: [x0, y0, x1, y1]` in pixels, `move: 20`, `sight: 20`, `light: 20`, `sound: 20`, `door: 0` for a wall, `door: 1, ds: 0` for a closed portal, `door: 2` for a concealed door the key admits, a window `door: 0, sight: 30, light: 30, threshold: { attenuation: true, light: 10, sight: 10 }`, every wall `levels: [its Level's id]`; `lights[]` with `x, y, rotation: 0, elevation: its Level's bottom, walls: true, vision: false, config: { dim: range in distance units, bright: dim / 2, color: '#rrggbb', alpha: 0.5, angle: 360 }`, `levels: [its Level's id]`; `journal` and `notes` from the gazetteer; `flags.plat` the same object the `.dd2vtt`'s `plat` carries. The schema is Foundry's own (`BaseScene`, `BaseLevel`, `BaseWall`, `BaseAmbientLight`, API 14.368), so Foundry imports it unchanged and the Owlbear Scene Importer reads its walls, doors and lights ('FoundryVTT scene JSON files' — for a new Owlbear scene the image is added first, its README says)." |
| **BCR-VTT-4** the wall and light values named | §11.1 *Foundry scene JSON* (the same bullet) | "(`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged; …)" | add after it: "the values Foundry 14 names: `move` ∈ `WALL_MOVEMENT_TYPES { NONE: 0, NORMAL: 20 }`; `sight`, `light`, `sound` ∈ `EDGE_SENSE_TYPES { NONE: 0, LIMITED: 10, NORMAL: 20, PROXIMITY: 30, DISTANCE: 40 }` (the former `WALL_SENSE_TYPES`); `door` ∈ `{ NONE: 0, DOOR: 1, SECRET: 2 }`; `ds` ∈ `{ CLOSED: 0, OPEN: 1, LOCKED: 2 }`; `dir` ∈ `EDGE_DIRECTIONS { BOTH: 0, LEFT: 1, RIGHT: 2 }` (always 0); a light's `config` by `foundry.data.LightData` (`dim`, `bright`, `color`, `angle`, `alpha`, `shadows`)" |
| **BCR-VTT-5** transient sight-blockers reach a default Foundry import | V14 §5.3 *The VTT crop scope*; §11.1 *Fields* ("`objects_line_of_sight` empty") | "the transient items' sight-blocking shapes as `objects_line_of_sight`" | "the transient items' sight-blocking shapes as closed polylines in **both** `objects_line_of_sight` (the contract's object-occluder list) and `line_of_sight` (the list every importer reads: the Foundry importer's default multi-level path never reads `objects_line_of_sight`, research/vtt §4.2), the duplication noted in the `plat` object (`plat.objectsAlsoInLos: true`) so a reader that honours both can drop one" |
| **BCR-VTT-6** the vendor fields Arkenforge set a precedent for | §11.1 *Per layer* ("a `plat` extension object") | "its elevation in the file name and in a `plat` extension object" | "its elevation in the file name and in a `plat` extension object, beside the two top-level vendor strings Arkenforge's description proposes for every writer — `software: 'PLAT <output version>'` and `creator` (the document's author name under the export's key, else absent)" |
| **BCR-VTT-7** the stair core's name | §11.1 *Per storey* | "the stair core a named portal on both storeys' scenes" | "the stair core a portal on both storeys' scenes — a portal carries no name in the format — its name and its two storeys in the `plat` object (`plat.stairs: { portal: index, name, from: ordinal, to: ordinal }[]`)" |
| **BCR-VTT-8** the survey's consumer list and the DA convention made exact | survey §2.9 (consumers); survey §2.1 (*Multi-floor export convention*) | "consumers: Arkenforge, Foundry (via "Universal Battlemap Importer", verified Foundry 14 …), Roll20 (official), Fantasy Grounds Unity (native), MapTool, D20Pro, Encounter+" ; "one media file (image or video) and one .json data file per floor, named with a numeric suffix" | add "Owlbear Rodeo (the Scene Importer extension: `.uvtt`, `.dd2vtt`, Foundry scene JSON; and Smoke & Spectre)" and "FGU since v4.4 (per the uvtt2fgu README)"; and "`<stem>_NN.json` (exactly two digits; the older `<stem>-_NN.json`) with its media of the same stem — Dungeon Alchemist's Foundry-shaped JSON (`walls[] { c, move, sense, sound, door }`, `lights[] { x, y, dim, bright, tintColor, tintAlpha }`), not a `.dd2vtt` (research/vtt §4.1)" |

**The pin the profile should carry** (one line under the DEF-4 heading, BCR-VTT-1): *Universal VTT as Arkenforge's developer
description revised 2026-08-22 (fields of §2 here; `format` carried, not checked); Foundry VTT 14 — 14.369 of 2026-10-08, API
14.368 — with `dd-import` 6.1.1 and `da-level-importer` 0.0.8 (both verified 14); re-verified 2026-10-17; next re-verification
at Foundry 15's first stable or a change to Arkenforge's page.*

---

## 7 Sources read and blocked

**Read in full (curl through the lane proxy, 2026-10-17; converted to text locally):**

| source | note |
|---|---|
| https://arkenforge.com/universal-vtt-files/ | published 2022-03-05, modified 2026-08-22 (page meta); author "Nathan"; the field list, the producer and consumer lists, the vendor-tag sentence |
| https://www.dropbox.com/s/s494c3l6bnblmbu/The%20Pig%20and%20Whistle%20tavern.uvtt?dl=1 | Arkenforge's sample (12.08 MB); structure measured with a `-I` Python read in an isolated directory |
| https://foundryvtt.com/releases/ ; /releases/14.369 ; /releases/14.359 ; /releases/14.353 ; /releases/14.352 ; /releases/14.349 ; /releases/14.360 | version ladder; Scene Levels statements |
| https://foundryvtt.com/api/ and the pages `classes/foundry.documents.BaseWall`, `BaseAmbientLight`, `BaseScene`, `BaseLevel`, `foundry.data.LightData`, `foundry.data.fields.SceneLevelsSetField`, `interfaces/foundry.documents.types.WallData`, `AmbientLightData`, `SceneData`, `GridData`, `LevelData`, `LevelTexture`, `WallThresholdData`, `SceneEnvironmentData`, `variables/CONST.WALL_MOVEMENT_TYPES`, `WALL_DOOR_TYPES`, `WALL_DOOR_STATES`, `WALL_RESTRICTION_TYPES`, `WALL_DOOR_INTERACTIONS`, `EDGE_SENSE_TYPES`, `EDGE_DIRECTIONS`, `EDGE_DIRECTION_MODES`, `EDGE_RESTRICTION_TYPES`, `GRID_TYPES`, `GRID_MIN_SIZE`, `modules/CONST`; `api/v14/classes/foundry.documents.Level` | "Version 14 … 14.368 Stable"; 404s recorded: `variables/CONST.WALL_SENSE_TYPES`, `CONST.WALL_DIRECTIONS`, `classes/foundry.documents.BaseSceneLevel`, `interfaces/…SceneLevelData`, `interfaces/foundry.data.types.LightData`, `modules/foundry.CONST` |
| https://foundryvtt.com/article/walls/ ; /article/lighting/ ; /article/scenes/ | knowledge base; `/article/scene-levels/` and `/article/levels/` 404 |
| https://foundryvtt.com/packages/dd-import/ ; https://raw.githubusercontent.com/moo-man/fvtt-dd-import/master/{README.md,module.json,LICENSE,ddimport.js} | MIT; 6.1.1; the importer's expectations (§4.2); `CHANGELOG.md` 404 |
| https://foundryvtt.com/packages/da-level-importer ; https://raw.githubusercontent.com/brunocalado/da-level-importer/main/{README.md,CHANGELOG.md,module.json,LICENSE,scripts/main.js,scripts/constants.js,scripts/importer-dialog.js,scripts/da-importer.js} | GPL; 0.0.8; the pairing rule and the JSON it parses (§4.1) |
| https://fantasygroundsunity.atlassian.net/wiki/rest/api/content/996640166?expand=body.storage,version (page "Working with Images as the GM", v53, 2026-10-09) and the REST search `text~"universal vtt"` | the Confluence HTML pages render empty without JavaScript and two guessed page ids returned "Page Not Found"; the REST body was read instead |
| https://raw.githubusercontent.com/Imagix/uvtt2fgu/master/README.md | FGU v4.4 native import statement (community tool) |
| https://wiki.rptools.info/index.php/MapTool_User_Interface | last edited 2026-01-13 |
| https://raw.githubusercontent.com/Eppinguin/scene-importer/main/README.md | Owlbear Scene Importer |
| https://www.czepeku.com/blog/how-to-use-uvtt-files-in-roll20 ; …/how-to-use-uvtt-files-with-owlbear-rodeo | third-party guides (used only as corroboration of Roll20's and Owlbear's behaviour) |
| https://app.roll20.net/forum/permalink/11038870 | Roll20 community script thread (The Aaron, 2022) |
| https://dungeondraft.net/ ; https://dungeondraft.net/faq ; https://dungen.app/ ; https://www.dungeonalchemist.com/ ; https://www.dungeonalchemist.com/faqs ; https://www.dungeonalchemist.com/wiki ; https://extensions.owlbear.rodeo/ (0 occurrences of "uvtt") | product pages |

**Blocked or unreachable (recorded, never counted as absent):**

| source | what happened |
|---|---|
| https://help.roll20.net/hc/en-us/articles/41643201127831-Universal-Virtual-Tabletop-UVTT-Support | curl: HTTP 403, a Cloudflare "Just a moment…" challenge page; WebFetch: `getaddrinfo ENOTFOUND help.roll20.net`. Content known only from search snippets and the Czepeku guide [SNIPPET-ONLY] |
| https://arkenforge.com/universal-vtt-files/ via WebFetch | `getaddrinfo ENOTFOUND arkenforge.com` (curl through the proxy succeeded, so the page was read) |
| https://www.fantasygrounds.com/forums/… (search and the archive thread t-85659) | HTTP 403 |
| https://github.com/moo-man/FVTT-DD-Import/releases{,/tag/6.1.1,.atom} ; https://github.com/brunocalado/da-level-importer/releases/tag/0.0.8 ; https://api.github.com/repos/… (releases, trees, commits) ; `gh api` for both repositories | HTTP 403 ("GitHub access to this repository is not enabled for this session") — exact release dates therefore come from foundryvtt.com's relative "Last Updated" text; raw.githubusercontent.com worked for every file |
| https://fantasygroundsunity.atlassian.net/wiki/spaces/FGCP/pages/996644865/Universal+VTT+Import and …/1005092920/Universal+VTT+Import | "Page Not Found" (guessed ids; no page of that title exists per the REST search) |
| https://foundryvtt.com/article/scene-levels/ ; /article/levels/ | HTTP 404 (no knowledge-base article of that name found by search either) |
| YouTube (the Arkenforge page's Foundry tutorial video), Reddit, Patreon, Discord, the Wayback Machine | not attempted — blocked routes per the lane brief |

**WebSearch calls used: 6 of 12** (FG documentation ×2, FG 4.4 notes, Owlbear, the Foundry Scene Levels article, Roll20 UVTT).
