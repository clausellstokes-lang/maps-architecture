# Survey — procedural site, dungeon, interior and battle-map generators, and the techniques behind them

**Status:** research note, observation-only, clean-room. Written 2026-10-16 for the architects and critics of the
world-sites-and-encounters design volume (owner rules of `docs/AMENDMENTS-2026-10-16j.md` items 132–136; the site
column of `docs/design/proposal-sites-encounters.md`). Every reference below is proprietary unless stated; nothing here
came from reading a proprietary product's code, and no asset, palette, room list, name list or data table was copied.
Mechanisms are described in this note's own words.

**Tags (binding):** [STATED] the maker says it · [SHOWN] visible in a screenshot or demo · [MEASURED] counted from an
API or page · [INFERRED] this note's reconstruction, with its reasoning · [SNIPPET-ONLY] seen only in a search-result
snippet, never on the page itself. Every claim cites a URL and the date it was read; all pages were read on
**2026-10-16** unless another date is given. Steam numbers come from the unauthenticated store, review and news
APIs (`store.steampowered.com/api/...`, `store.steampowered.com/appreviews/...`,
`api.steampowered.com/ISteamNews/...`).

**Two corrections to the brief, measured, not assumed.** (1) *RPG Map Editor 2 is not on Steam.* The Steam store
search returns nothing for it under any spelling [MEASURED, storesearch API, 2026-10-16]; it ships on itch.io
and as a browser app (§2.5). (2) *Arkenforge is not on Steam either* [MEASURED, same]; it sells from its own site
(§2.8). A third note: the search engine conflates `dungen.app` (the VTT map generator, §2.2) with "DunGen", an
unrelated Unity asset by Aegon Games; nothing from the latter is used here.

---

## 1 Summary

1. **The market splits into three shapes, and none of them is a site generator.** (a) *Layout-first generators
   that draw a picture*: Donjon (1999–), Watabou's One Page Dungeon (2019–), dungen.app (2019–), and since May 2026
   Dungeon Scrawl's beta "Random Dungeon". They take a handful of sliders (size, room count, corridor style, door
   density) and emit a finished image plus, in the better ones, a wall/door/light file. (b) *Editors that furnish what
   you draw*: Dungeon Alchemist (draw a room, pick a theme, the furnishing, doors, windows and lights are placed for
   you; since 2025 floors and roofs), Dungeondraft (a hand editor with a built-in dungeon/cave generator it does not
   document). (c) *Editors with no generation at all* that live on imports from (a): RPG Map Editor 2, Dungeon
   Painter Studio, MapForge, Inkarnate, Arkenforge. The de-facto interchange is Donjon's TSV (imported by RPG Map,
   Dungeon Scrawl v1, MapForge, Dungeon Painter Studio) and One Page Dungeon's JSON (imported by RPG Map) on the way
   in, and **Universal VTT** (`.dd2vtt`/`.df2vtt`/`.uvtt`) on the way out (§2.9).
2. **Nobody generates a *reason*.** Every generator surveyed produces geometry from randomness constrained by a
   style: Donjon states its rooms are placed "randomly or by algorithm" and corridors by a recursive walk with a
   straightness probability; dungen.app says only that it "tries to generate a more logical map" than "a maze
   algorithm"; Dungeon Alchemist's furnishing is "procedural algorithms developed in-house" that learned "from a set of
   examples"; Dungeon Scrawl says its tool is "the same approach that popular tools like Watabou and Donjon have used
   for years". No product states purpose, history, water, geology, owner or event as an input, and none can say *why*
   a room is where it is. That is the gap the owner's rules already name (topology first, every unit with a reason,
   the complexity vector measured on the result — item 133(g)).
3. **What the DM actually buys, by the review counts (§5):** speed ("in seconds/minutes": 517 of 2,994 Dungeon
   Alchemist reviews [MEASURED]), automatic walls/doors/lights into the VTT (261 mention Foundry, 180 Roll20, 92 the
   auto-walls/lights specifically, only 1 of those in a negative review), and assets. What they complain about:
   performance and crashes (40 of 164 negatives), price (34), "AI" results that still need fixing, the long absence of
   multi-level (fixed July 2025) and of 3D export (still absent and still the single most-cited structural complaint
   among 3D-tool buyers, 12 of 164 negatives).
4. **Determinism is uneven.** dungen.app and One Page Dungeon are seed-deterministic by statement (dungen.app: the
   same seed "will always yield the same layout in the same conditions", and layouts are theme-independent; 1PDG has
   URL-seeded permalinks since 1.2.2). Donjon exposes a seed field. Dungeon Scrawl's Random Dungeon and Dungeon
   Alchemist expose **no seed at all** to the user; Dungeon Alchemist's only reproducibility is the saved map. None
   of them is deterministic from *world facts*; all are deterministic, at best, from a string.
5. **Export is the one solved problem, and the one place the field has a contract.** The Universal VTT format is a
   published JSON (documented by Arkenforge, authored by Megasploot): map size in squares, pixels per square, polylines
   that block line of sight, a second set for objects, portals (doors) with position, bounds, rotation, closed and
   free-standing flags, lights with position, range, intensity, colour and a shadows flag, an environment block
   (baked lighting flag, ambient colour), and the image itself embedded [STATED, §2.9]. The architecture's §11.1
   profile should emit exactly these fields per storey or depth band, and should treat Dungeon Alchemist's
   multi-floor convention (one image + one JSON per floor, numeric suffix, consumed by a Foundry v14 "Scene Levels"
   importer) as the current state of the art for stacked scenes [STATED, §2.1].
6. **The techniques (§4) sort cleanly by whether they can carry a reason chain.** Grammars, mission/space graphs
   and graph embedding (Dormans; Ma et al.; Edgar; Metazelda; Gungeon's "flows") carry one by construction: every
   node is the product of a rule applied for a stated purpose. Skeletons, medial axes and Voronoi are deterministic
   geometric derivations that *explain themselves* (a passage follows the axis of the void; a bay is the cell of its
   pillar). Agent excavation explains itself only if the agent's policy is the reason ("the miners followed the
   vein"). Cellular automata, drunkard's walks, noise and wave-function collapse produce shapes with no attributable
   cause beyond "the dice fell so"; BSP and room-and-corridor produce partitions and links with no role. The owner's
   placement (item 133(g)) is consistent with this sorting and this survey found no evidence against it.
7. **Where SettlementForge should consciously improve (§6):** context as an input (urban/underground/hinterland/
   country decides what a site may be); causes (purpose → topology → geometry); history as superposed layers rather
   than a single roll; water as a classification after generation, never a tile painted; knowledge layers (DM-only,
   revealed, discovered) in the document rather than the "two exports, one with GM items hidden" trick every tool uses;
   persistent addresses so that an edited site survives regeneration; and the complexity vector in place of the
   size/density sliders every generator has converged on. What to reject with reasons: slider-sized dungeons, a
   seed as the only identity, WFC as structure, generation that overwrites the canvas (Dungeon Scrawl's generator
   "replaces the one currently on your canvas … undo won't recover a replaced map" [STATED]).

---

## 2 The references

### 2.1 Dungeon Alchemist (Briganti BV; Wim De Hert, visual lead; Karel Crombecq, development lead)

*Sources:* Steam appdetails/appreviews/news for app 1588530; `dungeonalchemist.com` (home, FAQ); Arkenforge's UVTT
article; Foundry package `da-level-importer`; one trade review (gamingnexus.com). The product's fandom wiki is
blocked (403) — see §7.

**What it is.** A desktop 3D application (Windows, macOS, Linux; Unity-style engine [INFERRED from screenshots of a
perspective/orthographic toggle and "3D view", `dungeonalchemist.com`]) sold on Steam as **Early Access since
2022-03-31**, US$44.99, developer and publisher Briganti, Steam Workshop enabled, "Includes level editor" category
[MEASURED, appdetails]. 2,682 recommendations; review score "Very Positive"; the review API gives 1,931 English
Steam-purchase reviews (1,807 positive / 124 negative) and 2,994 English reviews across all purchase types (2,830 /
164) [MEASURED, appreviews, 2026-10-16]. Kickstarter and Gamefound funded [STATED, release post 2022-04-27].

**What it generates.** Not layouts: *rooms you draw are furnished.* "Simply pick a theme, start drawing, and Dungeon
Alchemist creates high-quality maps … Walls, floors, objects and lighting are generated for you automatically"
[STATED, Steam store page]. "You choose the theme of each room, and Dungeon Alchemist will do the rest. Don't like
what you get? Just press the randomize button" [STATED, same]. The FAQ: "Dungeon Alchemist fills in the tiles
according to the selected theme, and automatically adds doors, windows, objects and lighting" [STATED,
`dungeonalchemist.com/faqs`]. The "AI" is explicitly **not generative AI**: "All procedural algorithms are developed
in-house and only use content generated by our own, paid artists" [STATED, Steam store page and FAQ]. The FAQ's
description of the method is a joke ("learns to draw rooms and populate them from a set of examples. It then
proceeds to fill most rooms with only cheese wedges and then we tweak it") [STATED]; the serious content is in the
patch notes:
- 2023-01-31 "Winter Wonderland": "We rewrote almost every aspect of the AI-system": doors "centered when it makes
  sense … larger for larger rooms", a distinction between "front doors" and interior doors; windows "less random and
  more symmetric", matched to the wall type; "walls of adjacent rooms try to match each other. The outside wall of a
  building remains the same, even when the interior one changes"; see-through cell walls "only spawn where they
  logically would"; "structured rooms such as chapels and throne rooms now generate in a much more appropriate way";
  objects that belong opposite the door (thrones) placed so [STATED, Steam news]. → [INFERRED] a rule-based furnisher
  with per-theme placement rules keyed to door, wall and room geometry, not a learned model; the 2022-09-29 note's
  "10 AI categories" and "AI configuration options — choose which parts of the room you want to have the AI generate"
  confirm that "AI" names a bundle of per-category placement passes.
- 2023-03-14 "Everything is Lava": **caves** as a terrain biome "with multiple elevation settings such as labyrinth,
  burrow, ridge and tunnel" and cave areas drawable on any terrain ("raise the terrain to max level and … carve a
  cave out"); **organic rooms** that "will not spawn any walls or floors, and will follow the shape of the terrain …
  place objects against natural walls" [STATED]. → caves are terrain-height carving, rooms become furnishing regions
  without walls [INFERRED from the wording].
- 2024-06-12 "Magic": curved/diagonal walls by dragging handles on a room outline; raised/rotated rooms "a necessary
  preparation step for implementing multi-level buildings. This does not mean you can make multi-level buildings
  just yet" [STATED].
- 2025-07-10 "Fun with Objects, Part 1": **multi-level** ("draw any room anywhere, and move up or down a floor");
  stairs "connect automatically between floors, and remove the floor in the room above"; **roofs** generated over
  "any given stupidly impossible shape" — the studio states "roofs are not rooms: it's perfectly possible to create any
  given shape between two floors that is neither the room above or the room below", so it wrote "a new roof border
  system" and auto-generated slanted roofs, claiming "no algorithm available on earth that accurately covered all our
  use cases" [STATED, 2025-05-16 and 2025-07-10]. (The architecture's straight-skeleton roofs, V03/V05, are that
  algorithm; the studio's difficulty is consistent with roof outlines that are unions of room footprints with
  holes — [INFERRED].) Also "abstract lights … invisible lights that are not exported", batch export, a custom-object
  brush [STATED].
- 2025-10-22 "Room for Improvement": "A common complaint … was that objects spawned too randomly in the middle of
  the room. We tried to remedy this by … clumping them together against columns and walls" [STATED].
- 2026-03-17 "Fine Print": multi-page printing; a roof toggle in "the advanced AI generation menu"; "Export Ground
  Floor With All Roofs" for villages; bug fixes for "complex slanted roofs" and "crashing bugs related to the new
  multi-level feature" [STATED].
- 2026-06-10: Part 2 in development (asset picker, full 3D rotation) [STATED]. Cadence [MEASURED, 199 news items
  2021-10-20 → 2026-10-12]: nine feature updates or patches in four and a half years (2022-06, 2022-09, 2023-01,
  2023-03, 2023-08, 2023-11, 2024-06, 2025-07, 2025-10, 2026-03); the rest are weekly streams and sales.

**Inputs and settings.** Map size by paper size or "unlimited digital"; a terrain type (forest, grassland, jungle,
desert/badlands, snow, cave, skeletal plains, fey, …, each a patch note); a room theme per drawn room; per-room
"refresh" with sub-selection (objects only, etc.); terrain brushes with strength; hex grid option; room height; roof
style menu [STATED, patch notes]. **No seed is exposed anywhere in the store text, FAQ or patch notes**
[MEASURED: zero occurrences of "seed" in 199 news items and the FAQ]. Reproducibility is the saved map.

**Determinism.** Not from a seed; the "randomize" button rerolls a room [STATED]. [INFERRED] internal RNG, not
user-addressable.

**Exports.** Image (print, "Print & Delivery" paper order), video (30 s loop, 2023-01-31), Foundry, Roll20,
Fantasy Grounds (Unity; video export for FG 2023-08-31), AboveVTT (2023-08-31), Universal VTT as `.dd2vtt`
[STATED by Arkenforge's UVTT article: "Dungeon Alchemist UVTT files use the .dd2vtt extension"]. Walls, doors and
lights travel with the export: a reviewer "imported the map into my VTT, and was incredibly happy the walls, doors
and lights were set up for me" [STATED, gamingnexus]. **Multi-floor export convention** [STATED by the Foundry
module author, `foundryvtt.com/packages/da-level-importer`, verified for Foundry 14, updated ~2026-10-04]: "one media
file (image or video) and one .json data file per floor, named with a numeric suffix"; the JSON carries "wall, door,
and light data"; walls carry a door flag ("Any wall exported with door=1"). Stackable platforms "export to your VTT
with correct line-of-sight" (2022-06-01) [STATED]. **No 3D export** [STATED by many reviews; measured below].

**Multi-floor, water, secrets, doors, lighting.** Multi-floor since 2025-07 with auto-connecting stairs and floors
removed above stairwells; "go below the level of the current terrain" promised (2025-02-24) [STATED]. Water: terrain
liquids (water, frozen, muddy, lava; a "Remove Water" brush), a "canal flowing through" a hamlet [SHOWN caption,
2023-03-14] — water is terrain paint, not a hydrological fact [INFERRED]. Secrets: nothing in any patch note
[MEASURED: no occurrence of "secret"]. Doors: generated, movable, open/closed state copyable (2023-03-14). Lighting:
object lights with colour; abstract (invisible, non-exported) lights; light "states" (the Fine Print patch fixes
"abstract lights only having 3 states" in French/Dutch locales) [STATED].

**Editing after generation.** Everything: move, scale, rotate, recolour, free placement with collisions off,
copy/paste properties, custom asset import (3D models via Blender guide, 2023-08-31), Steam Workshop sharing
[STATED].

**Pricing and licence.** US$44.99 one-time on Steam, Early Access [MEASURED]. Content ownership: Briganti owns
the app and assets; no statement found on map-output licensing on the pages read.

**Praise and complaints:** §5.1.

### 2.2 DunGen (dungen.app; "Nick S."; Dungeon Channel)

*Sources:* `dungen.app/` (dungeon page), `/cave/`, `/walls/`, `/faq/`; `dungeonchannel.com`. Patreon changelog
blocked (403).

**What it is.** A free web generator of high-resolution dungeon and cave *images* "ready to use in your favorite
virtual tabletops", version "DunGen v1.0.2" in the footer, with a running counter "Total: 4175308" maps and
"1234.61GB" (the FAQ page shows 1,264,238 GB in the same slot — the counter is not reliable) [MEASURED, footer].
Themes are graphics skins; "The layouts should be the same for each seed" across themes [STATED, FAQ].

**What it generates.** Rooms and hallways with "many room variations instead of only rectangles" [STATED, FAQ];
caves (separate page); optional furnishing by "habitat" (four habitats listed, one or more selectable) [MEASURED,
form]; "Special rooms is a beta feature … Currently there are only 4 available (2 traps and 2 secret rooms)"
[STATED, FAQ]; multi-level: "attempt to include two staircases leading both up and down to stack as many as you
wish" [STATED, FAQ] — i.e. levels are independent generations linked by a convention, not a connected 3D structure
[INFERRED]. On method: "Most generators use a maze algorithm as a base for the dungeon; DunGen tries to generates a
more logical map instead" [STATED, FAQ]; nothing further is published. [INFERRED] from the settings "Corridor
Density: the chance for additional corridors sprouting from each room" and "Peripheral Egress: how many exits",
plus "Remove unconnected rooms": rooms are placed first, corridors grown from rooms with a per-room probability,
and disconnected components either removed or kept — a room-first constructive generator, not a maze carve.

**Inputs.** Seed ("up to 12 characters"; blank = random), theme (8 for dungeons, 1 for caves), maximum size
(Mini…Huge; "outcome can be smaller" — "it is however possible for a Huge sized dungeon to generate a map with only a
few rooms in certain conditions"), tile size 30/50/70 px (140 px for patrons), furnishing on/off and habitat,
multi-level, special rooms (beta) [MEASURED+STATED]. Caves add: map size 12×12 to 50×50 units ("maximum image size
of 7000 × 7000px at 140px"), layout style (large area / large rooms / small rooms), corridor density, peripheral
egress, remove unconnected rooms [STATED, `/cave/`].

**Determinism.** "the same seed will always yield the same layout in the same conditions" [STATED, FAQ]; caves:
"Assuming the same options are being used, the same seed will always produce the same cave" [STATED, `/cave/`].
Seeds exist "to recreate a dungeon you already generated (for example to recreate the same dungeon with a different
theme), or more commonly to create one based on a phrase you like" [STATED].

**Exports.** PNG image at the chosen tile size; for patrons ("Dungeon Designer" tier and above) dynamic-lighting data:
a **Foundry scene `.json`** imported through Foundry's "Import Data" with the image set as background ("In the
Scene Notes you can find additional information about the map"), a **Fantasy Grounds Unity `.xml`** line-of-sight
file that must share the image's filename, and **Roll20** wall text pasted into chat for the "Walls" API script
(Pro account) [STATED, FAQ]. Grid alignment caveats for FGU with odd tile counts are documented at length [STATED].
A "Mask for Image Editor" theme outputs a flat-colour layout for retexturing [STATED]. **Not Universal VTT.** A
separate patron tool ("Automatic Dynamic Lighting", `/walls/`) traces walls from *any* uploaded map by flood-filling
a solid mask colour (mask the floor for interiors — "it expands to create the path for the walls" — or mask the
walls for exteriors), with modes precise/balanced/performance, an angle threshold that prunes nodes, an optional
wall-width to centre the path, and Foundry's 25 % padding [STATED, `/walls/`] — a raster-to-polyline tracer
[INFERRED].

**Pricing.** Free; Patreon tiers "Dungeon Designer" (lighting exports), "Dungeon Architect" (140 px, tilesets,
custom-map lighting tool), "Dungeon Merchant" (commercial licence for generated content) [STATED, FAQ].

**Editing.** None in-app; the FAQ points to free asset packs and image editors [STATED].

### 2.3 Donjon — Random Dungeon Generator (drow, donjon.bin.sh)

*Sources:* `donjon.bin.sh/fantasy/dungeon/` (form), `/5e/dungeon/`, `/code/dungeon/` (method page and a simplified
implementation under CC BY-NC 3.0 — **not read**, by the clean-room rule; only the prose on the page was).

**What it is.** The classic web generator, begun "sometime around 1999", on donjon since Sept 2009; image maps since
March 2009, "cavernous dungeons" since Sept 2010 [STATED, `/code/dungeon/`]. Copyright 2009–2026 drow; "some content
used under the Open Game License"; per-system variants (AD&D, d20, Pathfinder, 4e, 5e, 5.5) differ in the
encounter/treasure content, not the map [MEASURED, nav and identical form structure].

**Method (its own documented mechanism, in this note's words).** The map is a grid of cells, each cell a set of
flags (blocked, room, corridor, …). Rooms and corridors live on odd rows and columns and rooms have odd dimensions
(so a one-cell wall always separates them). Rooms are placed "randomly or by algorithm"; a room is accepted if it
collides with nothing, then its perimeter is reserved; the number of entrances is derived from the room's size and
that many openings are attempted on its perimeter. Corridors come from "a simple recursive algorithm": at each step
the walker either shuffles its direction list (labyrinth), keeps its heading half the time (errant) or nine times in
ten (straight). Caverns use cellular automata "inspired by Jim Babcock's article at RogueBasin"; separate cave
systems are joined by "the shortest cuts"; the cavern is refined to display resolution by subdividing each cell and
re-running the automaton [STATED, `/code/dungeon/`]. → determinism: a seed field is exposed in the form [MEASURED];
the method is a pure function of the RNG stream [INFERRED].

**Inputs** [MEASURED, form on `/fantasy/dungeon/`]: name; a "dungeon motif" (14 options, e.g. abandoned, undead,
aquatic, underdark — these drive the content, not the map); dungeon size (ten steps from "Fine" to "Colossal" plus
custom width/height); dungeon layout (a shape list); peripheral egress (none / yes / many / tiling); room layout
(sparse / scattered / dense / symmetric); room size (six steps); polymorph rooms; doors (none / basic / secure /
standard / deathtrap); corridors (labyrinth / errant / straight); remove dead ends (none / some / all); add stairs
(no / yes / many); map style (15 skins); grid (none / square / hex / vertical hex); seed. Note that *room layout*
is the only structural hint and *symmetric* is a mirrored placement [INFERRED from the option name and shown
outputs].

**Exports** [MEASURED, buttons]: Download Map (image), Player's Map (a second image with secrets hidden
[INFERRED from the name; standard donjon behaviour]), Print Scale, **TSV**, HTML page, PDF, **JSON**. The TSV is
the lingua franca other editors import (RPG Map 0.8, Dungeon Scrawl v1, MapForge, Dungeon Painter Studio's "one
click … random generator dungeons import") [STATED on each product's page]. No wall/light file; no VTT scene.

**Multi-level, water, secrets, doors, lighting.** Multi-level only as "add stairs" markers; no water in the map
(the "aquatic" motif is content); secret doors are a door class and get hidden on the player's map; doors are
classed (secured, trapped, deathtrap) in the key text; no lighting [MEASURED/INFERRED as marked].

**Editing.** None; export then edit elsewhere.

**Pricing.** Free; donations (Ko-fi, Patreon) [MEASURED].

### 2.4 Dungeon Scrawl (Keir "ProbableTrain", 2020; Roll20 since 2023)

*Sources:* `dungeonscrawl.com` (home, about, pricing), `blog.dungeonscrawl.com` (UVTT export 2026-09-09; Foundry
2026-10-15; Random Dungeon 2026-05-13; May '26 update), `probabletrain.itch.io/dungeon-scrawl` (the pre-Roll20 page).
The help centre (`help.roll20.net`) and `/guides` are blocked (403).

**What it is.** A free browser editor in the hand-drawn "old school" style ("Dungeon Scrawl is a free online
mapmaking tool for ttrpgs … Created by Keir (@probabletrain) and first released in 2020, Dungeon Scrawl joined the
Roll20 family in 2023" [STATED, about]). Pre-Roll20 itch rating 4.9 (398) [MEASURED]. Shape tools, "brushes that
automatically make rough caves and tunnels", mirror/copy tools, layers with blend modes, isometric edit mode,
multi-page PDF at real-world grid size [STATED, itch]. Generation arrived in **May 2026 as a beta**.

**Random Dungeon (beta, 2026-05-13).** "produces a fully formed dungeon layout in seconds" from the sidebar; settings:
Size; Room Count, Room Size, Corridor Length and Width; Layout "from Straight (linear progressions) to Winding
(twisty, exploratory paths), with Forking and Balanced in between"; Door Density; Room Shapes (square, irregular,
rounded); Roughness ("an irregular texture to the walls, perfect for … cavernous/organic edges") [STATED, blog].
"Whenever you click Generate Dungeon, your new map replaces the one currently on your canvas. (A warning will confirm
before this happens, since undo won't recover a replaced map.)" [STATED]. "Every room, hallway, and door is fully
editable" afterwards [STATED]. On method: "It uses algorithms and rule-based logic to lay out dungeon layouts;
there's no training data, no model … It's the same approach that popular tools like Watabou and Donjon have used
for years" [STATED]. **No seed** is mentioned [MEASURED: none in either post]. [INFERRED] from the setting names: a
room-and-corridor generator whose Layout control weights branching versus chaining of corridors, with a wall-noise
post-pass for Roughness.

**Exports.** PNG/WebP (free), JPG, PDF and high-res (Pro), and since September 2026 **UVTT** (Pro): "Select UVTT,
adjust your grid pixels (px) per cell – or leave 70", walls, doors and lights "auto-detected" and set up on Roll20's
light layer "no manual Dynamic Lighting setup required"; for Foundry via the Universal Battlemap Importer, with a
"wall padding" slider so the hatching can sit inside the walls [STATED, blog 2026-09-09 and 2026-10-15]. Direct Roll20
"Connection" sync (no files) [STATED]. "Send to Tabletop" casts a player view to a second screen, with a Lighting
Mode that blacks out unlit areas [STATED, May '26].

**Multi-floor, water, secrets, lighting.** Pro: "Work across connected maps in one file, perfect for mega-dungeons,
towns, and multi-floor buildings" [STATED, pricing]. Lights (Pro) have a bright radius and a dim radius at 50 %,
measured in grid units, with presets after 5e light sources [STATED, May '26]. Water: no statement (textures and
"overlays" only). Secrets: nothing stated.

**Pricing.** Free ("Forever*"); Pro US$5/month (cloud autosave, commercial use, more layers/textures, presets,
shareable links, PDF/high-res, lighting); Roll20 Elite bundles Pro [STATED, pricing].

### 2.5 RPG Map Editor 2 / "Tabletop RPG Map editor II" (Sébastien Bénard, Deepnight Games)

*Sources:* `deepnight.net/tools/rpg-map/`, `/changelog/`; `deepnight.itch.io/tabletop-rpg-map-editor` (page and
devlog list). **Not on Steam** [MEASURED, §0].

**What it is.** An editor, not a generator: "a tabletop oriented map editor with the 'keep it clean & simple'
philosophy"; "RPG agnostic by using generic elements (shapes) instead of specific objects" [STATED]. Browser (HTML5)
and Windows builds, version 16.2; the last devlog is "Update 16 – The huge one", 2020-04-13 [MEASURED]; itch rating
4.8 (181) [MEASURED]. Its lineage is the Flash-era "AnaMap" whose source is on GitHub [STATED].

**Generation.** None of its own. It **imports** One Page Dungeon (since update 12, 2019-11-02; importer updated
15.2 and fixed 16.1), Donjon TSV (0.8, 2019-06-19) and AnaMap files, auto-detected on load (update 14) [STATED,
changelog]. The only randomness is decorative ("randomize the 'seed' of all the random elements" — trees, crates,
fog — update 11) [STATED]; so a decoration seed exists but no layout seed.

**Features that matter here.** "Special walls, such as caverns, diagonals"; "ray-casted lighting & fog" (walls, doors
and "high furniture" block light; a light type that only pierces fog); water, lava and two customisable "special
water" pools; stairs; windows; "GM Only" flag on texts and icons — "When you export your image, if your map contains
elements flagged as 'Game Master only', 2 images will actually be exported: one with and one without" (update 10)
[STATED]; numbered elements with an auto-generated legend block; text bubbles that "auto-position in empty spaces";
a JSON map format with a header (update 15); image export presets for Roll20 and Fantasy Grounds; a "printer-friendly"
mode; square, dot, "ancient" and hex grids; collision flood-fill [STATED, changelog]. **No UVTT, no wall file, no
multi-floor** [MEASURED: absent from the changelog].

**Pricing and licence.** "RPG Map II is completely free to use. All the content you create with it can be used any
way you want, including in commercial products"; itch "pay what you want, including free" [STATED].

### 2.6 One Page Dungeon Generator (Watabou) — cited, not redone

The program's notes already cover 1PDG's mechanisms and history; they are the authority and are not repeated:
- `research/findings/watabou-extra-a.md` §2.22 and the chronology rows 4–6, 20, 25: rotate-to-fit, round rooms,
  flooded areas (1.0.2), Dyson hatching (full algorithm, §2.7), seeds/permalinks and SVG export (1.2.2), the
  "snap the simulation to the grid, never the drawing" water principle, shadow layer, notes modes (Numbers hides a
  note bound to a hidden secret room), tag-dialog UX rules (§2.14), and the "Explore in 1PDG" link from Perilous
  Shores.
- `research/findings/watabou-extra-b.md` row 38 and T32: stairs as a purely visual elevation hint ("if you look at
  them too closely, they stop making any sense"), the `string` tag (a linear sequence, recommended with `chaotic`),
  `export=png|svg|json|vox|md`, the JSON's "final" room mark and its natural (unsorted) note order, the "broken"
  grid, draggable notes.
- `research/findings/dwellings-posts.md` lines 44, 190, 204, 480, 660, 817: the contrast between Dwellings' thin walls
  on cell edges and dungeons' thick walls, "house-like dungeons", and the 1PDG-family look.

New since those notes, read 2026-10-16 on `watabou.itch.io/one-page-dungeon`: devlog **1.2.7** (2026-01-14) is UI
and a new shading style only, with the statement "my generators are not designed for mobiles" [STATED]. The page
holds 1,230 ratings at 4.9 and 303 comments [MEASURED]; licence "You can use images created by the generator as
you like … including in your commercial rpg adventures … Attribution is appreciated, but not required" [STATED].
Three comment exchanges bear on this volume [STATED, comments, 2026]: (a) a user asks for a *sewer* mode ("wider
corridors … junctions … ladders … a more uniform water layer to flow in channels") and the creator answers "I don't
have a clear idea of what fantasy sewers should look like. I agree that the water should be treated differently
there" — i.e. even the best layout generator has no model of water as flow; (b) asked for a "blueprint mode" like
Perilous Shores and Dwellings, the creator replies "drawing a blueprint of a dungeon is basically drawing the dungeon
itself … Once the rooms and corridors are there, there's very little left to generate" — a direct statement that
1PDG's content *is* its layout, with nothing behind it; (c) the `winding` tag is 1PDG's analogue of the Cave
Generator's `burrows` ("Internally, it works differently (because the two generators are completely different in
general)"). The sibling **Cave Generator** (`watabou.itch.io/cave-generator`, "Cave/Glade Generator", 2.1.8 of
2026-09, 247 ratings at 4.9) is a separate codebase with its own shape options [MEASURED, devlog list].

### 2.7 Dungeondraft (Megasploot)

*Sources:* `dungeondraft.net` (home, FAQ); the Foundry package `dd-import`; Arkenforge's UVTT article. The fandom
wiki is blocked (403); two web searches found no documentation of the generator.

A desktop editor (Windows, Ubuntu; "ARM64 … not supported"), US$19.99 one-time, DRM-free, "No subscriptions", "No
additional commercial licensing", with a modding API [STATED]. Among its features: "Built-in lighting system",
"Smart tiling system", "Built-in dungeon and cave generator" [STATED, feature list] — **that one line is the
entirety of its public documentation of generation** [MEASURED]. It originated the Universal VTT export
("When exporting your map, the 'Universal VTT' option should be selected by default" — `.dd2vtt`) consumed natively
by Encounter+, D20Pro, MapTool, Arkenforge and Fantasy Grounds Unity and by modules in Foundry and Roll20 [STATED,
`dungeondraft.net` VTT table]. [INFERRED] the generator is a fill tool over a drawn region (the cave brushes in
Dungeon Scrawl and ProFantasy's "click two corners … press SPACE to rerandomize" are the genre's pattern) — unverified.

### 2.8 Arkenforge (Arkenforge Toolkit, Nathan Beattie)

*Sources:* `arkenforge.com` (home, FAQ), `arkenforge.com/universal-vtt-files/`. **Not on Steam** [MEASURED].

A desktop "in-person" VTT and map builder: "Make your in-person games more fun and immersive, and let you build,
play, and export animated maps … not a tool for online play" [STATED]. US$35 one-time for the toolkit (bundles to
US$250 with content); "never be locked behind a subscription"; no mods ("We prefer to build in all features
ourselves"); hex and isometric grids with snapping; infinite map size; no generative AI anywhere [STATED, FAQ].
**No generation stated anywhere on its pages** [MEASURED]. Its relevance is the format: it is "the only platform
that can both import and export Universal VTT files" (`.uvtt`), and it published the developer description of the
format (§2.9) [STATED].

### 2.9 Universal VTT — the export contract everyone converges on

[STATED, `arkenforge.com/universal-vtt-files/`, authored by Arkenforge, format "created by Megasploot"; corroborated
by the `dd-import` README on GitHub and the Dungeon Scrawl posts.] "At its heart, the Universal VTT file is an image
with a bunch of extra data attached … what size the image is, what colliders/obstacles exist, and what lights are in
the scene". Constraints: "the map is a single image, UVTT files can not contain animated content, nor individually
selectable map images/tokens". In this note's words the JSON carries: a format version; a resolution block (map
origin and map size **in squares**, pixels per square); a list of line-of-sight polylines (walls); a second list for
object occluders; portals (doors) each with a position, a bounds polyline, a rotation in radians, a closed flag and a
free-standing flag; an environment block (whether lighting is baked into the image, an ambient colour); lights each
with position, range, intensity, colour and whether they cast shadows; and the image, base64 PNG or WebP. Producers
at the time of writing: Arkenforge, Dungeondraft, DungeonFog, Dungeon Alchemist, MapForge; consumers: Arkenforge,
Foundry (via "Universal Battlemap Importer", verified Foundry 14, with a "fidelity" slider — "how many cave walls are
used" — and an offset), Roll20 (official), Fantasy Grounds Unity (native), MapTool, D20Pro, Encounter+ [STATED]. Since
September 2026 Dungeon Scrawl is a sixth producer [STATED, §2.4].

What the format **cannot** express, which the volume must decide how to carry [INFERRED from the field list]:
storeys (one file per floor by convention; Dungeon Alchemist's numeric-suffix pairs and Foundry 14's Scene Levels are
the current bridge), elevation, water depth or state, secret-door knowledge state (a portal is either present or
not — the field has "closed" but no "hidden"), terrain difficulty, one-way doors, room identity or names, and any
reason. Secrets therefore travel the way every tool does it: two exports, GM and player (RPG Map's "GM Only", Donjon's
"Player's Map", Watabou's export-then-hide-then-export recorded in `watabou-extra-b.md` row 41).

### 2.10 Others found

- **Inkarnate** (`inkarnate.com`, FAQ): an online editor for world, region, city, battle "(including Interior)",
  scene and isometric maps; plans Free / Creator / Studio (commercial use, 16k export); "16M+ maps created"; **no
  generation of any kind is stated** [MEASURED, home, FAQ, features, updates pages]. Out of scope beyond that.
- **DungeonFog** (`dungeonfog.com`): a vector battle-map editor with a UVTT export (`.df2vtt`) [STATED on
  Arkenforge's article; the home page states a vector editor and VTT export]. No generator stated.
- **MapForge** (`mapforge-software.com`, Battlegrounds Games, 2017 Kickstarter): "the ability to customize
  Donjon-generated maps, or to use the app's Build Tools to create such maps from scratch without requiring a Donjon
  TSV file"; exports UVTT in all three extensions [STATED]. No generator of its own.
- **Dungeon Painter Studio** (Steam 592260, Pyromancers, released 2017-02-26, US$14.99): "One click D20 random
  generator dungeons import" (i.e. Donjon), layers, union/subtraction, VTT exports, multi-page PDF; "Very Positive",
  1,550 positive / 357 negative English reviews [MEASURED, appdetails/appreviews]. In a 100-review sample, 38 of the
  negatives mention abandonment/updates and 18 crashes/bugs [MEASURED] — a maintained editor is table stakes.
- **Watabou's Cave Generator**: see §2.6.

---

## 3 Comparison table

Legend: ● stated/shown · ◐ partial or by convention · ○ absent (measured absent on the pages read) · ? not
determinable from public pages. "Post-edit" = editing of generated output inside the tool. Prices in USD as read
2026-10-16.

| Reference | Rooms | Corridors | Caves | Multi-level | Furnishing | Lighting | Doors / secrets | Water | Seed determinism | Post-edit | VTT export fields | 3D | Price |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dungeon Alchemist | ● drawn by user, furnished by rules (curved walls since 2024) | ○ (user draws) | ● terrain-carved cave biome, "organic rooms" | ● floors + auto stairs + roofs (2025-07) | ● themed, rule-based | ● object + abstract lights, colour | ● auto doors/windows; secrets ○ | ◐ terrain liquids | ○ no seed exposed | ● full | ● walls (door flag), lights per floor JSON; UVTT `.dd2vtt`; Foundry/Roll20/FGU/AboveVTT; video | ◐ 3D authoring, **no 3D export** | $44.99 EA |
| dungen.app | ● varied shapes | ● density + egress | ● separate generator, 3 layout styles | ◐ stacked by stair convention | ◐ habitats (beta) | ○ (walls only) | ● doors; ◐ 2 secret rooms (beta) | ○ | ● seed, theme-independent | ○ | ◐ Foundry scene JSON (walls), FGU XML LoS, Roll20 wall text — patrons; not UVTT | ○ | free / Patreon |
| Donjon | ● grid, odd-aligned | ● labyrinth/errant/straight | ● cellular automata, refined | ◐ stairs markers | ○ (text key) | ○ | ● classed doors; ● secret doors hidden on player map | ○ | ● seed field | ○ | ○ (image, TSV, JSON, PDF; no walls) | ○ | free |
| Dungeon Scrawl | ● Random Dungeon beta (count, size, shapes) | ● length, width, layout straight→winding | ◐ roughness + cave brushes | ◐ "connected maps in one file" (Pro) | ○ (stamps, images) | ● bright/dim radii (Pro) | ● door density; secrets ○ | ○ | ○ no seed stated | ● full (but generation replaces canvas) | ● UVTT walls/doors/lights (Pro, 2026-09); Roll20 sync | ○ (isometric view only) | free / $5 mo |
| RPG Map Editor 2 | ○ (imports 1PDG, Donjon) | ○ | ◐ cavern wall style | ○ | ◐ generic shapes | ● ray-cast, fog | ● doors block light; ◐ GM-only two-image export | ● pools | ◐ decoration seed only | ● | ○ (images with Roll20/FG presets) | ○ | pay-what-you-want |
| One Page Dungeon | ● (see program notes) | ● tags (`winding`, `string`) | ○ (sibling Cave Generator) | ◐ visual stairs only | ◐ notes/legend | ○ | ● secret rooms hide their notes | ◐ flooded areas, drawn water | ● URL seed since 1.2.2 | ◐ notes draggable; "Dwellings-style blueprint" refused | ○ (PNG/SVG/JSON/VOX/MD) | ◐ VOX voxels | free |
| Dungeondraft | ◐ built-in generator (undocumented) | ◐ same | ◐ same | ◐ levels by user | ● assets, scatter | ● built-in | ● doors; secrets ? | ● paint | ? | ● | ● originator of UVTT | ○ | $19.99 |
| Arkenforge | ○ | ○ | ○ | ◐ | ● | ● animated | ● | ● | n/a | ● | ● UVTT in and out | ○ | $35 |
| Inkarnate | ○ | ○ | ○ | ○ | ● | ◐ effects | ○ | ● paint | n/a | ● | ○ images | ○ | free / subs |
| Dungeon Painter Studio | ○ (imports Donjon) | ○ | ○ | ○ | ● | ◐ filters | ● | ◐ | n/a | ● | ○ images | ○ | $14.99 |

Reading across the row "Seed determinism": only the pure layout generators are seed-stable, and *none* of the
editors with furnishing are. Reading down "Water": nothing anywhere treats water as anything but a painted region or
a tag. Reading down "Doors / secrets": the only secret-aware behaviours are hide-on-player-map (Donjon, 1PDG) and
two-image export (RPG Map) — presentation, not state.

---

## 4 The techniques

For each: the published source; what it produces well; what it cannot explain (why a reason chain cannot be
attached); determinism; and where it belongs in a topology-first, kernel-embedded site generator (the volume's
"topology first: a unit graph with roles, then embedded on the kernel", item 133(g)). Sources are open
publications; nothing proprietary was read.

**4.1 Binary space partition (BSP).** Source: RogueBasin "Basic BSP Dungeon generation" (edited 2023-08-15,
read 2026-10-16); Shaker, Togelius & Nelson, *Procedural Content Generation in Games* (Springer 2016,
doi:10.1007/978-3-319-42716-4), ch. 3 "Constructive generation methods for dungeons and levels" (pcgbook.com
PDF read 2026-10-16). Mechanism: split a rectangle recursively by a random axis and position until leaves are
room-sized; put one room per leaf; connect sibling leaves by straight or Z corridors, then parents, up the tree
[STATED, RogueBasin]. Produces well: non-overlapping rooms that fill the envelope; guaranteed connectivity; a tree
whose depth is a size knob ("homogeneous" vs "heterogeneous" splits). Cannot explain: why a wall is *here* — the
split position is a random fraction; a corridor exists because two subtrees are siblings, not because anyone
needed to walk there; the tree is a perfect tree, so loops must be added afterwards for no reason the tree knows.
The PCG book notes the method "runs in fixed time" and gives "(rather) limited control over the output" [STATED,
ch. 3 §3.1]. Deterministic given the RNG. Belongs: **rejected as structure** (item 133(g)) — correctly, by this
survey: its only virtue, packing rooms into an envelope, is already the kernel's job once a programme exists.
Admissible as a *tie-breaker* inside a single unit when a programme says "subdivide this hall into n bays of
similar size" — a partition with a stated purpose.

**4.2 Cellular automata.** Source: RogueBasin "Cellular Automata Method for Generating Random Cave-Like Levels"
(Jim Babcock's article, read 2026-10-16); Johnson, Yannakakis & Togelius 2010 (real-time infinite caves; cited in
PCG book ch. 3); Donjon's own statement that its caverns use it and refine by subdividing cells (§2.3); Unexplored
uses "small cellular automata" to rough up cave and barrier cells (§4.6). Mechanism: fill ~45 % at random, then
repeat a majority rule ("a tile is a wall if the 3×3 region centered on it contained at least 5 walls") four or
five times; the known failure is "isolated cave sections", fixed by rule tweaks, flood fill or blanking [STATED].
Produces well: organic blobs at any raster resolution, cheap, tunable. Cannot explain: a cell is open because its
neighbours were; there is no geology, no water, no passage of time; the shape has no axis, no entrance and no
reason to be where it is; connectivity is an afterthought (Donjon's "shortest cuts", RogueBasin's flood fill).
Deterministic given the RNG and iteration count. Belongs: **an optional raster pre-pass for cave outlines**
(item 133(g)) — and only there, after the topology has said where the cavern is, how large, and which units it
links; the automaton then roughens an outline the geology materializer already owns. Never for structure.

**4.3 Drunkard's walk and agent excavation.** Sources: RogueBasin "Random Walk Cave Generation" (read
2026-10-16); PCG book ch. 3 §3.3 "Agent-based dungeon growing" (a "blind" stochastic digger vs a "look-ahead"
digger that checks for intersections); RogueBasin "Dungeon-Building Algorithm" (Mike Anderson, Tyrant: grow
features out of existing walls, reject ~85 % of attempts, which guarantees reachability). Mechanism: a walker
turns rock into floor; a single walk "is guaranteed to produce a fully connected level, with a highly variable mix
of narrow paths and open spaces" [STATED, RogueBasin]; the PCG book: "the look of the dungeon largely depends on the
behaviour of the agent … it is difficult to anticipate such problems without running the agent's algorithm" [STATED,
ch. 3]. Produces well: connected, wandering, locally plausible passages; "grown from the entrance" shapes;
Anderson's framing "If I were a denizen of the underworld, how would I go about building my dungeon?" is the
nearest any constructive method comes to a cause. Cannot explain: a *blind* walk has no reason at any step; an
*informed* agent explains exactly as much as its policy encodes. Deterministic given the RNG. Belongs: **mines,
by agent excavation over the geology input** (item 133(g)) — the agent's policy *is* the reason ("drifts follow the
vein; shafts go down to it; galleries branch where ore was found; a level stops where water was struck"), so each
dug unit carries its cause. Also usable for burrows and lairs if the policy is an occupant's.

**4.4 Voronoi and Delaunay.** Sources: Amit Patel, "Polygonal map generation for games" (2010; mapgen2 page
`redblobgames.com/maps/mapgen2/` read 2026-10-16, Apache-2 code); vazgriz.com "Procedurally Generated Dungeons"
(2019; the TinyKeep method: place rooms, Delaunay-triangulate their centres, take a minimum spanning tree, add back
~12.5 % of triangulation edges for loops, carve each edge with A* whose cost favours reusing existing corridors —
extended to 3D with staircases that need a 1:2 rise/run footprint and headroom) [STATED]. Produces well: a planar
neighbour graph from points (Delaunay) and a cell partition with equal "influence" (Voronoi); the MST-plus-extra-edges
idiom gives a connected graph with a controlled cyclomatic number — the same idiom as Nystrom's rooms-and-mazes
(§4.8). Cannot explain, on its own: *where the points are* — the seeds are random; the partition is only as
meaningful as its generators. Deterministic given the point set. Belongs: **crypt bays and cavern partitions**
(item 133(g)) where the seeds *are* meaningful (pillars, burial niches, dripstone columns); and, this survey adds,
**the Delaunay-of-units graph as the candidate-edge set for passages** when the unit graph is embedded — choose
corridors among planar neighbours, never between arbitrary rooms (the Angband-style "pick any two rooms" corridor
that Nystrom abandoned).

**4.5 Wave-function collapse (WFC) and tile constraint solving.** Sources: Maxim Gumin's repository README
(`github.com/mxgmn/WaveFunctionCollapse`, read 2026-10-16); Karth & Smith, "WaveFunctionCollapse is constraint
solving in the wild" (FDG 2017, doi:10.1145/3102071.3110566); Boris the Brave, "Wave Function Collapse explained"
(2020) and "Constraint-based tile generators" (2021), read 2026-10-16. Mechanism: output must contain only the N×N
patterns (or tile adjacencies) present in the input, with similar frequencies; repeatedly collapse the lowest-entropy
cell and propagate; "It may happen that during propagation all the coefficients for a certain pixel become zero.
That means that the algorithm has run into a contradiction … The problem … is NP-hard, so it's impossible to create a
fast solution that always finishes" [STATED, README]. "Easy" tilesets (never contradict) "don't produce interesting
global arrangements, because correlations of tiles … quickly fall off with a distance" [STATED]. It "supports
constraints", so it can autocomplete a human start [STATED]. Produces well: locally consistent texture and
tile-work; good for *dressing* (floor patterns, masonry, rubble, vegetation) and for filling a region to a style.
Cannot explain: the output is a sample from the set of locally-legal arrangements; a corridor appears because the
adjacency table allowed one, not because anyone needed it; global structure (an entrance, a sanctum, a loop) is
exactly what it does *not* control — the README's own statement about correlation length. Determinism: given the
RNG and the same propagation order, yes; given a contradiction, restart changes everything downstream — a fragile
determinism. Belongs: **rejected for structure "because it cannot carry a reason chain"** (item 133(g)); this
survey concurs and adds the positive placement: a *renderer-side texture synthesizer* for floor and wall finish
within a unit, run after geometry is locked, so a contradiction can never alter a plan.

**4.6 Grammars, mission graphs and space graphs — Dormans, Unexplored, cyclic generation.** Sources: Dormans,
"Adventures in level design: generating missions and spaces for action adventure games" (PCGames workshop 2010,
doi:10.1145/1814256.1814257); Dormans & Bakkes, "Generating Missions and Spaces for Adaptable Play Experiences" (IEEE
TCIAIG 2011, doi:10.1109/tciaig.2011.2149523); Dormans, "Cyclic Generation", in *Procedural Generation in Game
Design* (CRC 2017, doi:10.1201/9781315156378-11) — DOIs resolved via Crossref 2026-10-16, full texts not reachable
(§7); the mechanism is taken from Boris the Brave's four-part analysis of *Unexplored* (2017, Ludomotion), especially
"Dungeon Generation in Unexplored" (2021-04-10, read 2026-10-16) and "Lock and Key Dungeons" (2021-02-27). Mechanism
[STATED by Boris, from the Ludoscope tooling]: a *mission* is a graph of abstract nodes (entrance, goal, obstacle,
lock, key, hub) rewritten by find-and-replace rules — Unexplored has "about 5000 individual find-replace rules";
the *space* is a 5×5 grid of graph nodes "never deleted or moved, just annotated", so "the ensuing graph still
follows a 2 dimensional plan"; the generator "draws a start, end, and a big roughly circular loop" and picks one of
"24 different cycle types" that assign meaning to the two arcs (two routes with different obstacles; a lock on one arc
and its key on the other; a one-way valve; a "hub"; a "lake" cycle that makes the loop a shoreline); minor cycles,
dead ends and shuffles grow it to size; **non-terminal symbols** ("Obstacle", "Lock/Key") are resolved late, with
reference to **biomes/themes** set early so that independent choices cohere; keys keep an edge to their lock "so even
as the two nodes are shuffled and moved around the graph, they can always be kept consistent"; the grid is then
doubled (corridor cells between nodes, marked barrier or door) and expanded 5× into tiles, rooms grown into
rectangles, caves roughened by cellular automata; and "the relationships are part of the level output … the game
uses it as a sort of safety check" ("Pray For Help" finds what blocks progress). Produces well: pacing, loops with
purpose, lock-and-key progression, coherent theming, *explainability by construction* — every node names the rule
and the role that produced it. Cannot explain: metric geometry (the grid embedding is a convenience, not a cause);
anything the rule-writer did not author ("a lot of the 'secret' for the varied dungeons is simply a ton of different
manually coded cases"; "it still represents a lot of design work that procedural generation does not shortcut"
[STATED, Boris]). Deterministic given the RNG and rule order. Belongs: **"grammars as data for programme expansion"**
(item 133(g)) — this is the backbone. The volume's unit graph with roles (entrance, hub, chokepoint, loop, dead end,
secret, vertical link) *is* a mission/space graph; the cycle-type idea is the direct source for "a fort concentric
with gatehouse chokepoints; a temple axial to a sanctum" (proposal §5); the late-resolution of non-terminals
against a theme is the mechanism for *derive before invent*; and the preserved key→lock edge is the model for the
reason record travelling with a unit through edits.

**4.7 Graph embedding — layout from a specification.** Sources: Ma, Vining, Lefebvre & Sheffer, "Game level layout
from design specification" (Eurographics / Computer Graphics Forum 2014, doi:10.1111/cgf.12314; Crossref
2026-10-16; full text unreachable); Ondřej Nepožitek's open-source *Edgar* (`ondrejnepozitek.github.io/Edgar-DotNet`,
read 2026-10-16), which implements that approach: "You decide exactly how many rooms you want in a level and how
they should be connected, and the generator produces layouts that follow exactly that structure", rooms drawn from
"handmade room templates" (an outline polygon and door positions), "Connect rooms either directly with doors or with
short corridors", "Implicit support for keys and locks — just define the connectivity graph"; limits: "Some level
graphs may be too hard for the generator", "not suitable for large levels — we recommend less than 30 rooms"
[STATED]. Also: Metazelda (Tom Coxon, GitHub) for Zelda-like item-gated graphs [STATED README]; Boris's analysis of
*Enter the Gungeon* (2019): hand-authored "flows" (graphs with no positions), node "injection" for optional rooms,
the graph cut into "composites" (each a loop or a tree), loops laid out by closing a chain from both ends, trees
depth-first, then composites joined by pathfinding — "generate the parts of the map that are hardest / most important
first" [STATED]. Produces well: a geometry that honours a stated topology exactly; loops that close; doors where the
graph says. Cannot explain: the embedding is a search (incremental, with backtracking, template choice stochastic),
so *which* legal layout appears is unexplained; and it scales badly past a few dozen units — which is fine for a
site and wrong for a city. Deterministic given the RNG and search order; failure-prone ("too hard") graphs are the
risk. Belongs: **the step "embedded on the kernel under constraints"** (item 133(g)) is exactly this, with the
kernel's relational solver as the search; this survey recommends adopting Gungeon's ordering (lay the loops and the
chokepoint ring first, then hang the trees) and Edgar's honesty about size (cap units per materialization; chain
sites through vertical links rather than one giant graph).

**4.8 Room-and-corridor (and rooms-and-mazes).** Sources: Nystrom, "Rooms and Mazes" (2014-12-21, read
2026-10-16): place non-overlapping rooms by a fixed number of attempts; flood the leftover rock with perfect mazes
(a maze generator "is a randomized flood fill"); collect "connector" cells between regions; open a spanning tree of
connectors plus a tunable chance of extra connectors for loops; then "uncarve" dead ends; result: "Every corridor is
guaranteed to go somewhere interesting" but corridors are "annoyingly windy" and odd-aligned [STATED]. Boris on
*Diablo 1* (2019): a "predungeon" of walkable cells generated by "budding" rooms off a spine, a second stage that
chooses tiles, "minisets" and "theme rooms" pasted or detected by flood fill, and "lockout" restarts when the level
is not traversable [STATED]. Produces well: the look DMs recognise (every tool in §2 ships one); connectivity by
spanning tree; loops by a knob. Cannot explain: rooms are where the attempts landed; corridors are where the maze
happened to run; the spanning tree is random; the "knob" for loops has no cause. Deterministic given the RNG.
Belongs: **rejected as structure** (item 133(g)) — concur: the plan programme gives every room a role; what survives
is the *idiom* of spanning tree + chosen extra edges, now applied to a unit graph whose nodes and roles came from
the programme (so each extra edge is "the loop the fort needs for a sally", not a coin flip).

**4.9 Constraint solving (answer-set and mixed-initiative).** Sources: Smith & Mateas, "Answer Set Programming for
Procedural Content Generation: A Design Space Approach" (IEEE TCIAIG 2011, doi:10.1109/tciaig.2011.2158545);
Smith, Whitehead & Mateas, "Tanagra: Reactive Planning and Constraint Solving for Mixed-Initiative Level Design"
(IEEE TCIAIG 2011, doi:10.1109/tciaig.2011.2159716) — Crossref 2026-10-16, full texts unreachable; Karth & Smith
2017 (§4.5) frames WFC as the same family. Mechanism (from the titles and abstracts as commonly cited; [INFERRED]
where it goes beyond them): state the design space as constraints and let a solver enumerate members; in Tanagra, a
human edit is a constraint the solver repairs around. Produces well: guaranteed satisfaction of hard rules
(reachability, counts, adjacency), repair after an edit — the behaviour the owner demands of "move this wall" (local
repair with locks preserved, item 133(h)). Cannot explain: a solution is "a model of the constraints"; which one is
returned is solver order; constraints are not causes. Deterministic given solver and seed. Belongs: as **the
embedding's constraint layer** on the kernel (envelope, rock, entrance side, water table, adjacency — proposal §5),
and as the repair mechanism after edits; not as the author of the topology.

**4.10 Straight skeletons and medial axes.** Sources: Aichholzer, Aurenhammer, Alberts & Gärtner, "A novel type of
skeleton for polygons" (1995/96, doi:10.1007/978-3-642-80350-5_65); CGAL 6.2.1 "2D Straight Skeleton and Polygon
Offsetting" manual (read 2026-10-16); Blum 1967 for the medial axis (not fetched; standard); the program's own notes
on Watabou's use of skeletons (`watabou-extra-b.md`, "straight skeletons are built once and then shopped around three
generators"). Mechanism: the straight skeleton is traced by shrinking a polygon's edges inward at equal speed
(vertices move along angle bisectors; events merge or split fronts); it partitions the interior into one region per
edge; "for convex polygons, the straight skeleton, the medial axis and the Voronoi diagram are exactly equivalent",
and only reflex vertices pull the skeleton off-centre; weights give edges different speeds; typical uses are offset
contours and roof extrusion [STATED, CGAL]. The medial axis is the locus of centres of maximal inscribed discs — the
true centreline of a void. Produces well: *deterministic, explainable centrelines* ("the passage runs along the axis
of the void"), offsets (wall thickness, corridor bands), roofs (the very problem Dungeon Alchemist found "no algorithm
available on earth" for, §2.1). Cannot explain: nothing it does is random, so nothing is unexplained; what it
cannot *decide* is which void to skeletonize. Deterministic, exactly. Belongs: **passages and centrelines** (item
133(g)) — concur; also roofs over composite footprints, corridor bands as offsets of the centreline, and the
"defensive depth" measure (rings between entrance and core) as skeleton depth.

**4.11 Topology-aware generation.** Sources: §4.6–4.8 and van der Linden, Lopes & Bidarra, "Procedural Generation of
Dungeons" (IEEE TCIAIG 2014, doi:10.1109/tciaig.2013.2290371; a survey — Crossref 2026-10-16, text unreachable). The
common finding of Boris's three analyses and of Nystrom: *generate the abstract first* ("I've spoken many times of
the power of generating something abstract first and filling in the details second"; Gungeon's injection "would just
not be possible if we went straight to dealing with a tile based map" [STATED]). The PCG book's definition of a
dungeon generator — "a representational model … a method for constructing that representational model … a method for
creating the actual geometry … from its representational model" [STATED, ch. 3 §3.1] — is the volume's two steps.
Belongs: the whole §5 of the proposal; this survey's contribution is the evidence that every generator that DMs
praise for *feel* (Unexplored, Gungeon, Diablo) is topology-first, and every generator that DMs own (§2) is not.

**4.12 Tactical-space generation (cover, sightlines, chokepoints).** Sources: Cook, "Would You Look At That!
Vision-Driven Procedural Level Design" (AIIDE 2015, `ojs.aaai.org/index.php/AIIDE/article/view/12818` — page fetched,
abstract only via the search snippet [SNIPPET-ONLY]: evolutionary generation of 3D geometry with what the player can
see as the fitness); Cardamone, Yannakakis, Togelius & Lanzi, "Evolving Interesting Maps for a First Person Shooter"
(EvoApplications 2011, doi:10.1007/978-3-642-20525-5_7 — Crossref; text unreachable); Liapis, Yannakakis & Togelius,
"Sentient Sketchbook: Computer-Aided Game Level Authoring" (FDG 2013, listed on antoniosliapis.com) and "Designer
Modeling for Sentient Sketchbook" (CIG 2014, doi:10.1109/cig.2014.6932873) — the Sketchbook evaluates sketches with
map metrics (this note recalls playability, balance, safety and exploration/choke-point metrics but **could not read
the PDF**, so: [INFERRED, unverified]); Ubisoft's "layered levels" for *Mario + Rabbids* (GDC 2023, snippet:
topography, navigation, cover layers, volumes/zoning) [SNIPPET-ONLY]; the 2024 Charles University thesis on stealth
level generation [SNIPPET-ONLY]. What the literature agrees on [INFERRED from the above]: tactical quality is
*measured* on a candidate (visibility graphs, cover counts, shortest-path chokepoints, flanking route existence) and
used as a fitness or a check, in search-based generators; nobody constructs geometry *from* a cover specification
directly. Cannot explain: a fitness value is a verdict, not a cause. Determinism: search-based methods are
deterministic given the seed but sensitive to it. Belongs: exactly where item 133(g) puts it — **a check on the
result against the complexity vector, never a generator**; the vector's chokepoints, loops, open-space share and
defensive depth are these metrics, and the transient encounter's extent table (item 132(d)) can be validated by them
(does the crop contain cover, a flank, a bottleneck?).

**4.13 Noise outlines** (for completeness, item 133(g) "noise outlines for caves"). Source: Patel 2010 (§4.4) for
noise-perturbed polygon edges; the program's own coast routine. Deterministic from seed and position (item 135(c));
explains nothing but is asked to explain nothing — it is the *drawing* of an outline whose *existence* the geology
layer already justified.

---

## 5 What users praise and complain about

### 5.1 Dungeon Alchemist — all 2,994 English Steam reviews

[MEASURED, appreviews API, `filter=recent`, `purchase_type=all`, paginated by cursor, 2026-10-16.]

Totals: 2,830 positive, 164 negative (94.5 %). By year: 2022 1,025 (38 neg) · 2023 777 (38) · 2024 574 (35) ·
2025 393 (29) · 2026 to date 225 (24). Median playtime of the first 100 reviewers 2,378 minutes [MEASURED]. Theme
counts are regular-expression matches on review text (a review may count in several rows); "in negatives" counts
matches among the 164 negative reviews.

| Theme (pattern paraphrased) | reviews | in negatives | reading |
|---|---|---|---|
| speed: "in seconds/minutes", "quick", "saves time" | 517 | 20 | the product's promise is the praise |
| assets / objects | 454 | 45 | praised for volume; the negatives want more variety and user import |
| export / VTT in general | 405 | 37 | the second pillar |
| "AI" / procedural / random rooms | 273 | 39 | praised as a starting point; the negatives: "rooms you'll end up having to fix/rearrange anyways" (2022-08) |
| Foundry | 261 | 10 | the dominant VTT in this user base |
| price / expensive / worth | 218 | 34 | "$50 … cannot recommend" recurs in 2022–2024 negatives |
| Roll20 | 180 | 7 | |
| mods / Workshop / import own | 177 | 16 | demanded before the 2023 asset importer, praised after |
| outdoor / terrain / wilderness | 173 | 13 | |
| performance / crash / RAM | 149 | **40** | the largest negative theme: "my 32 gig system … was not enough to support a normal gygaxian dungeon" (2024-12); "runs poorly on minimum settings on a 5900x/6750xt/64gb" (2025-11) |
| early access / pace of updates | 147 | 12 | "so insanely slow at updating" (2023-08) |
| multi-level / floors / roofs | 113 | 12 | the complaint of 2022–2024 ("only single story builds, no roofs"), answered 2025-07 |
| auto walls / doors / lighting on export | 92 | 1 | the single least-contested feature |
| print / physical | 77 | 3 | |
| round / curved / diagonal walls | 61 | 11 | "no in game tool to make round rooms" (2023-11), answered 2024-06 |
| caves | 54 | 3 | |
| Fantasy Grounds | 51 | 2 | |
| Dungeondraft named | 42 | 7 | the comparison point for negatives ("Check out Dungeondraft or even Inkarnate") |
| 3D export (absent) | 35 | **12** | the sharpest structural complaint: "How do you make a 3d map making program where you don't allow 3D exports?" (2022-08); still cited 2026-06 ("a 2D map-maker with a 3D interface") |
| water | 35 | 2 | |
| Inkarnate named | 28 | 7 | |
| "lack of variety / themes" explicitly | 19 | 3 | "all your outdoor DA generated forest maps will look very similar" (2024-09) |
| generation results explicitly "need fixing" | 10 | 4 | |
| generative-AI concern | 7 | 1 | the studio's disclaimer pre-empts it |
| Universal VTT named | 5 | 0 | users say "Foundry", not the format |

Negative reviews in full were read for the first 100 [MEASURED]; recurring specifics beyond the table: objects
"way oversized" (2022-04); textures locked per terrain type (2024-06); no mirroring of assets (2023-11); "the Steam
page is intentionally misleading" about 3D export (2024-08); "the devs just shut down anyone asking about exporting
3D maps" (2024-08).

### 5.2 Other references (what could be counted)

- **Dungeon Painter Studio** (100-review sample of 1,907): abandonment/updates in 38 of the sample's negatives,
  crashes 18, price 11 [MEASURED]. Lesson: an unmaintained editor loses its "Very Positive" slowly and loudly.
- **One Page Dungeon** (itch, 1,230 ratings, 4.9; 303 comments): the visible 2026 comments ask for sewers, a maze
  setting, spoiler-masked notes for solo play, water channels and bridges "to rely less on walls to segment the
  dungeon", a blueprint mode, self-hosting; one complaint that the tag dialog is unusable on a small screen
  [STATED, comments read 2026-10-16]. Reddit, Discord and Patreon comment threads are blocked (§7).
- **RPG Map Editor 2** (itch, 181 ratings, 4.8): the community board's recent threads are asset requests, "Import
  from Donjon not working?" (231 days ago), a legend-block question [MEASURED, board titles].
- **Dungeon Scrawl**: no countable review source reachable (Roll20 help centre and Reddit blocked); the product's
  own testimonials emphasise speed and "I'm bad at drawing" [STATED, marketing — not evidence].
- **dungen.app**: no review source; its Discord ("200+ members") and Patreon are blocked.

### 5.3 The cross-product pattern [INFERRED from §5.1–5.2]

Praise is always speed and "it did the walls and lights for me". Complaints are never "the dungeon makes no
sense" in those words — DMs expect it to make no sense and fix it — but they *are* "I end up rearranging anyway",
"all the forests look the same", "no second floor", "no round rooms", "it crashes on a real dungeon", and "I cannot
get it out in the form I want (3D)". Every one of these is a symptom of generation without a model: no programme
(so rearranging), no context (so sameness), no storeys (so no floors), grid-locked geometry (so no curves), raster
or scene-graph bloat (so crashes), and a picture as the only product (so no 3D). The owner's design answers each
structurally; §6 lists how.

---

## 6 Implications for SettlementForge's world sites and encounters

### 6.1 What to reach (parity the DM will measure us against)

1. **Universal VTT out, per storey, with the full field set** (§2.9): walls as polylines, object occluders, portals
   with closed state, lights with range/intensity/colour/shadows, pixels-per-square and map size in squares, image
   embedded; plus the Dungeon Alchemist multi-floor convention (one pair per floor, numeric suffix) so the Foundry 14
   "Scene Levels" importer works unchanged [STATED, §2.1]. Also Donjon's role as the input lingua franca suggests
   emitting a Donjon-compatible TSV *only if* a DM asks to carry a site into RPG Map or MapForge — low priority.
2. **Walls, doors and lights that the VTT accepts without touch-up** — the single uncontested feature (92 mentions,
   1 negative). The V03 `lit` role and item 136(a) (fixtures, no hour) already provide the fixture list; the export
   must carry the fixture's range and colour, not just its position.
3. **Seed determinism at least as strong as dungen.app's** ("same seed, same layout, any theme") — the architecture
   already exceeds it with world-fact determinism (item 132(b)), but the *statement* to the DM should be that
   simple.
4. **A one-click result in seconds** with the generator's defaults doing the right thing: Dungeon Scrawl's "Generate
   Dungeon to get an instant result using default randomized settings" is the UX bar; the request record's *derive
   before invent* must make the empty request produce a good site.
5. **Full post-edit** on every generated element, which PLAT gives for free (item 133(h)) — and, unlike Dungeon
   Scrawl, regeneration must never destroy an edit ("undo won't recover a replaced map" is the anti-pattern).
6. **Caves, water, stairs, secrets, lighting** as first-class, since each is a feature the field had to bolt on
   (Dungeon Alchemist caves 2023, multi-level 2025; dungen.app secrets "beta"; 1PDG's "visual-only" stairs).
7. **Performance on a "gygaxian" dungeon**: the complaint that sinks the richest product. Vector geometry on the
   kernel and lazy materialization by card (item 133(h)) are the structural answer; the volume should set a budget
   (units per materialization, as Edgar's "<30 rooms" warning does for graph embedding) and chain by vertical links.

### 6.2 What to consciously improve (the gaps no reference fills)

- **Context as an input.** No surveyed generator takes *where it is* as input; the admissibility table (item
  134(a)) and the encounter extent table (item 132(d)) are therefore without precedent and must be designed, not
  copied. The nearest analogue is Unexplored's early-set "biomes" that bias late choices (§4.6) — adopt that as the
  mechanism: context facts set early, consulted by every later resolution.
- **Causes.** Purpose → unit graph with roles → embedding (proposal §5) is the mission/space-graph pattern (§4.6–4.7)
  applied to sites; the reference products have no equivalent, and the two reference *games* that do (Unexplored,
  Gungeon) are praised precisely for it. Every unit records its reason (layer, programme role, event); the preserved
  key→lock edge of Unexplored is the model for reasons that survive shuffling and edits.
- **History as superposition.** No generator surveyed has time: a dungeon is rolled once. The volume's "geology,
  first construction, use, abandonment or damage, reuse, each layer by its kind's materializer" (proposal §5) is the
  improvement; Diablo's "predungeon then tiles" two-stage and Unexplored's abstract→concrete refinement show that
  layering is cheap *if each layer is a transform over the previous model* — condition as a transform over a persisted
  plan (item 134(b)) is exactly that, and it is why Dungeon Alchemist's "a building never decayed draws
  byte-identically" promise can be kept where the references cannot even state it.
- **Water.** Every reference paints water (Dungeon Alchemist liquids, RPG Map pools, Dungeon Scrawl textures, 1PDG
  flooded areas) and Watabou himself says of sewers "the water should be treated differently there" [STATED, §2.6].
  Classifying water per unit *after* generation from the water table and the site's elevation
  (`proposal-hydrology-water-state.md` §4), and exporting submerged units as withheld-by-depth or difficult terrain
  (proposal §8), has no competitor.
- **Knowledge layers.** The field's secret handling is presentational: a hidden note, a player's map, two images
  (§2.9). The owner's DM-only / revealed / discovered on the anchor and the access (item 133(e)) is state in the
  document, filterable at export by the viewer's key — adopt the second cue beside colour, and export the
  player-knowledge filtering as a *scene variant*, not a second drawing.
- **Persistent addresses.** No generator keeps identity across regeneration (Dungeon Scrawl replaces the canvas;
  Dungeon Alchemist's refresh rerolls the room; dungen.app and 1PDG re-derive from the seed). PLAT's locks, undo,
  local repair and persistent addresses (proposal §7) mean "add a floor" rematerializes locally with every edited
  wall kept — state this as a headline capability; it is the one thing a DM who has fixed a generated room by hand
  will value most ("I'm just going to modify anyways" is the recurring Dungeon Alchemist negative).
- **The complexity vector.** Every generator converged on the same sliders (size, room count, room size, corridor
  density/straightness, door density, loops/dead ends: §2.2–2.4) and the owner forbids sliders. The vector with units
  (units, storeys below, vertical links, entrances, cyclomatic number, branching, chokepoints, open-space share,
  concealed share, defensive depth, hazards, flooded share, historical layers, damage — proposal §4) is measurable on
  the result by the very metrics the tactical literature uses as fitness (§4.12); presets as named vectors give the
  DM the one-click path without a slider. This survey found no product that measures its own output; adding the
  measurement as a test is itself an improvement.

### 6.3 What to reject, with reasons

- **Slider-sized dungeons and seed-only identity** (Donjon, dungen.app, Dungeon Scrawl): a seed is not an address;
  a slider is not a cause; both are rejected by items 132(b) and 132(g), and this survey shows every product that
  has them is fixed by hand afterwards.
- **WFC as structure** (§4.5): correlation falls off with distance by the method's own account; contradictions
  break determinism; nothing it places has a reason. Keep it, if at all, as finish texture after geometry locks.
- **BSP and room-and-corridor as structure** (§4.1, 4.8): partitions and random links with no role; the kernel and
  the programme already do the useful part. Keep the spanning-tree-plus-chosen-edges idiom on the unit graph.
- **Cellular automata as structure** (§4.2): no axis, no entrance, no cause; keep as an optional outline roughener.
- **Generation that overwrites** (Dungeon Scrawl's replace-the-canvas): forbidden by "edits sacred and local".
- **Multi-level as stacked independent generations** (dungen.app's "two staircases … stack as many as you wish";
  Dungeon Alchemist's floors drawn one at a time): storeys must be one structure with vertical-link units in the
  graph, or the stair in the export will not land in a room on the floor below. The existing storey and stair model
  (item 133(f)) already does this.
- **"AI" as a label for a rule bundle** (Dungeon Alchemist): the studio itself disclaims generative AI; naming
  placement rules "AI" invites both the generative-AI objection (7 reviews) and the "it's just random" one (39
  negatives). Call the furnisher what it is: the plan programme and V03's furnishing rules.
- **3D authoring without 3D product**: the most durable complaint in §5.1. The architecture's 2.5D rules
  (`AMENDMENTS-2026-10-16j.md`) should say plainly what a site exports in three dimensions (storey records, wall
  heights, roof skeletons) so that the "no 3D export" trap is never entered; 1PDG's VOX export shows even a 2D
  generator can hand over volume cheaply.

### 6.4 Open questions for the critics

1. Should the UVTT emitter carry the site's reason records and knowledge flags in a vendor block (Arkenforge
   "added in a 'software' and 'creator' field for our own use") so that a Foundry module could show them, or is the
   contract strictly the common fields? [This note recommends a vendor block, namespaced, optional.]
2. What is the unit budget per materialization, and is Edgar's "<30 rooms" the right order of magnitude for a
   graph embedding on the kernel's relational solver? Needs a spike, not a reading.
3. Are the tactical metrics of §4.12 to be computed on the kernel's faces or on a visibility raster of the crop? The
   literature does both; the complexity vector's "chokepoints" and "open-space share" need a definition the clerk can
   test.

---

## 7 Sources read and sources blocked

### 7.1 Read (all on 2026-10-16; fetched with curl through the session proxy; HTML converted to text)

Products: `store.steampowered.com/api/appdetails?appids=1588530`; `store.steampowered.com/appreviews/1588530` (two
passes: 100 Steam-purchase reviews; 2,994 all-purchase English reviews by cursor); `api.steampowered.com/ISteamNews/
GetNewsForApp/v2/?appid=1588530` (199 unique items 2021-10-20…2026-10-12); `store.steampowered.com/api/storesearch/`
(terms: Dungeon Alchemist, RPG Map Editor 2, RPG Map, Arkenforge, Arkenforge Toolkit, deepnight, Dungeondraft,
Dungeon Painter, Dungeon Scrawl, Dungeon Builder, Flowscape); appdetails/appreviews for 592260 (Dungeon Painter
Studio) and appdetails for 506870 (Unexplored); `dungeonalchemist.com/` and `/faqs`; `dungen.app/`, `/cave/`,
`/walls/`, `/faq/`; `dungeonchannel.com`; `donjon.bin.sh/fantasy/dungeon/`, `/5e/dungeon/`, `/code/dungeon/`
(prose only); `dungeonscrawl.com/`, `/about`, `/pricing`, `/blog`; `blog.dungeonscrawl.com/` (index, pages 2–3,
`uvtt-export`, `uvtt-foundry`, `create-dungeons-instantly-with-our-random-dungeon-tool`, `may-2026-update`);
`probabletrain.itch.io/dungeon-scrawl`; `deepnight.net/tools/rpg-map/`, `/changelog/`;
`deepnight.itch.io/tabletop-rpg-map-editor` and `/devlog`; `watabou.itch.io/one-page-dungeon`, `/devlog`,
`/devlog/1316176/...` (1.2.7); `watabou.itch.io/cave-generator`; `dungeondraft.net/` (incl. FAQ);
`megasploot.github.io/DungeondraftModdingAPI/`; `arkenforge.com/`, `/universal-vtt-files/`; `inkarnate.com/`, `/faq`,
`/features`, `/updates`; `dungeonfog.com/`; `mapforge-software.com/`; `foundryvtt.com/packages/dd-import`,
`/packages/da-level-importer`; `raw.githubusercontent.com/moo-man/FVTT-DD-Import/master/README.md`;
`gamingnexus.com/Article/11852/Dungeon-Alchemist/`.

Techniques: `roguebasin.com` (Basic BSP Dungeon generation; Cellular Automata Method…; Random Walk Cave Generation;
Dungeon-Building Algorithm; Diffusion-limited aggregation); `journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/`;
`raw.githubusercontent.com/mxgmn/WaveFunctionCollapse/master/README.md`; `pcgbook.com/chapter03.pdf` (Shaker,
Togelius, Nelson 2016 ch. 3, via pdftotext); `boristhebrave.com` (Dungeon Generation in Unexplored 2021-04-10; Lock
and Key Dungeons 2021-02-27; Graph Rewriting 2021-04-02; Wave Function Collapse Explained 2020-04-13; Constraint-based
tile generators 2021-10-31; Dungeon Generation in Diablo 1 2019-07-14; …in Enter the Gungeon 2019-07-28; all-posts
index); `ondrejnepozitek.github.io/Edgar-DotNet/docs/introduction` and the Edgar-DotNet README;
`raw.githubusercontent.com/tcoxon/metazelda/master/README.md`; `vazgriz.com/119/procedurally-generated-dungeons/`;
`doc.cgal.org/latest/Straight_skeleton_2/index.html`; Wikipedia "Straight skeleton", "Medial axis" (navigation only
reached in text; used for nothing beyond the CGAL statements); `redblobgames.com/maps/mapgen2/` and
`/maps/terrain-from-noise/`; `antoniosliapis.com/publications.php` (titles and venues only);
`ojs.aaai.org/index.php/AIIDE/article/view/12818` (page fetched; abstract text unreadable in the dump — treated as
snippet-only); Crossref API (`api.crossref.org/works?query.bibliographic=…`) for the DOIs cited in §4.

Program notes cited rather than redone: `research/findings/watabou-extra-a.md`, `watabou-extra-b.md`,
`dwellings-posts.md`, `dwellings-exports.md`; design context from `docs/AMENDMENTS-2026-10-16j.md` and
`docs/design/proposal-sites-encounters.md`.

Web searches used: 7 of the 25 budget ("RPG Map Editor II" Steam; Arkenforge Steam; tactical-level papers;
Dungeondraft generator ×2; Dungeon Alchemist dd2vtt/Foundry; dungen.app algorithm — the last returned only the
unrelated Unity "DunGen" and is recorded as a miss).

### 7.2 Blocked, failed or unreachable (recorded, never counted as absent)

- The `WebFetch` tool itself: DNS failure (`ENOTFOUND`) for every host tried (`dungen.app`, `donjon.bin.sh`,
  `dungeonscrawl.com`, `deepnight.net`); all reading was done with curl through the proxy instead.
- **403 Forbidden:** `patreon.com/dungen` and the DunGen Patreon changelog post; `help.roll20.net` (Dungeon Scrawl
  guides category and the Roll20 UVTT article); `dungeonscrawl.com/guides`; `dungeonalchemist.fandom.com` (the
  Dungeon Alchemist wiki — Exporting and main pages); `dungeondraft.fandom.com`; `ctrl500.com` (Unexplored cyclic
  generation article); `dl.acm.org` (Dormans & Bakkes 2011).
- **Redirected to a site home or a section page (content not served):** `ludoscience.com/files/ressources/
  dormans_bakkes_2011.pdf` and `dormans_2010_adventures.pdf` (returned the site's home page);
  `gamedeveloper.com/design/cyclic-dungeon-generation` and `/design/procedural-generation-of-tactical-levels`
  (returned the Design section index); `antoniosliapis.com/papers/liapis2013sentient.pdf` (returned the home page;
  the real PDF link could not be extracted from the publications page).
- **Connection failed (000):** `probabletrain.com`; `jorisdormans.nl`; `julian.togelius.com` (Cardamone 2011 PDF,
  publications list); `cgf-ai.com` (Killzone tactical-position paper); `www-cs-students.stanford.edu/~amitp/…`
  (Patel 2010 original article); `chongyangma.com` (Ma et al. 2014 PDF); `pcgbook.com/wp-content/...` (one of two
  chapter URLs; the other worked).
- **404:** `users.soe.ucsc.edu/~amsmith/papers/tciaig-asp-pcg.pdf`, `eis.ucsc.edu/papers/smith_mateas_asp_pcg.pdf`,
  `adamsmith.as/papers/...` (Smith & Mateas 2011 PDF); `users.soe.ucsc.edu/~ejw/papers/Tanagra-FDG2010.pdf`;
  `cs.ubc.ca/~sheffa/papers/LevelLayout.pdf` (Ma 2014); `foundryvtt.com/packages/dungen`, `/dungeon-scrawl`,
  `/one-page-dungeon`, `/opd-importer` (no such packages — an absence, not a block);
  `raw.githubusercontent.com/watabou/OnePageDungeonOS/...` (no such repository);
  `megasploot.itch.io/dungeondraft`, `deepnight.itch.io/rpg-map-editor-2` (wrong slugs; the right ones were read).
- **429 Too Many Requests:** `api.semanticscholar.org` (every call; Crossref used instead); `itch.io` twice
  (deepnight's "Update 16" devlog, never recovered; Watabou's cave generator, recovered on retry).
- **Not attempted, known blocked or snippet-only in this program:** Reddit (r/dungeonalchemist, r/dungeondraft,
  r/dungeonscrawl, r/proceduralgeneration), YouTube (Dungeon Alchemist streams, dungen.app "How it works" video,
  Dungeon Scrawl tutorials), Discord (every product), Patreon posts, the Wayback Machine. Search snippets that were
  used are tagged [SNIPPET-ONLY] in the text (Cook 2015; Ubisoft GDC 2023; the Charles University thesis; the Roll20
  forum note that Dungeon Alchemist "colors its lights with one of 10 preset colors"; the Steam-discussion claim that
  Dungeon Alchemist's FAQ lists AboveVTT and "any VTT that supports the Universal VTT (UVTT) file format").
- **Not measurable without running the product (and therefore not claimed):** the exact JSON field names of Dungeon
  Alchemist's per-floor export, dungen.app's Foundry scene file, Donjon's JSON and TSV, and 1PDG's JSON beyond what
  the program's notes already record.
