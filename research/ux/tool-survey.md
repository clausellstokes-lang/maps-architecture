# UX tool survey — how casual users edit maps and towns (lane ux/tool-survey)

Lane `ux/tool-survey`, started 2026-09-27 18:45 EDT (Opus surveyor; web research, read-only on the design). Brief:
`workflows/lane-prompts/ux-tool-survey.prompt.txt`. Purpose: inform the USER EXPERIENCE of item 101's twelve authoring
tools (`docs/AMENDMENTS-2026-09-27e.md`; `docs/experiments/known-city-authoring.md`) for a CASUAL audience — game
masters, hobbyists and writers who will not read a manual.

Labels: **SOURCED** = stated by a page fetched in this lane (source id → table at the end, with the page's own date and
the fetch date); **INFERRED** = this lane's reading, not stated by any source. Quotes are short (under 15 words) and
attributed; everything else is paraphrase. "Not found" results carry the queries that were run.

## PROGRESS

Lane complete at 19:32 EDT (see the LANDED line in `docs/lane-events.log`). One line per tool and per section.

| item | status | seat · note |
|---|---|---|
| A1 Inkarnate | done | sub-surveyor A1 (opus), spawned 18:50, merged 19:24 |
| A1 Wonderdraft | done | A1 |
| A1 Dungeondraft | done | A1 |
| A1 Dungeon Scrawl | done | A1 |
| A2 Worldographer | done | sub-surveyor A2 (opus), spawned 18:50, merged 19:24 |
| A2 Azgaar's Fantasy Map Generator | done | A2 (its AI features also in C6a) |
| A2 Campaign Cartographer 3+ with City Designer 3 (counter-example) | done | A2; undo depth and autosave not researched |
| B1 Townscaper | done | sub-surveyor B1 (opus), spawned 18:50, merged 19:24 |
| B1 Tiny Glade | done | B1 |
| B1 Manor Lords (burgage plots) | done | B1 |
| B1 Foundation | done | B1 |
| B2 Cities: Skylines (2015) | done | sub-surveyor B2 (opus), spawned 18:50, merged 19:24 |
| B2 Cities: Skylines II | done | B2 |
| B2 Anno 1800 | done | B2; layers and labelling thin |
| B2 Kingdoms Reborn | done | B2; labelling not researched |
| C1 Dungeon Alchemist (rooms + AI furnishing) | done | sub-surveyor C (opus), spawned 18:50, merged 19:24 |
| C2 Photoshop Generative Fill | done | C; helpx.adobe.com refused every fetch |
| C3 Canva Magic Studio | done | C; canva.com refused every fetch |
| C4 Figma AI | done | C |
| C5 Midjourney editor | done | C; docs refused every fetch |
| C6 map/town/VTT tools with an AI assistant (Azgaar AI, Familiar, SceneForge, Cibola 8, TT-RPG, text-to-map generators, no-AI checks) | done | C; none pairs a rule-based town generator with an AI clerk |
| D MFCG (watabou) | done | lane seat, 18:52-18:58 |
| D watabou's other generators | done | lane seat |
| D Fantasy Town Generator | done | lane seat |
| E1 Foundry VTT | done | sub-surveyor E (opus), spawned 18:50, merged 19:24 |
| E2 Roll20 | done | E; 2026 prices not verified |
| E3 Owlbear Rodeo | done | E; current prices not verified |
| E4 export formats (Universal VTT, Foundry scene JSON) | done | E |
| Part II §1 patterns that make casual users succeed | done 19:31 | lane seat |
| Part II §2 anti-patterns | done 19:31 | lane seat |
| Part II §3 "the program fills in the rest" | done 19:31 | lane seat |
| Part II §4 AI assistance for casual users | done 19:31 | lane seat |
| Part II §5 mapping onto the twelve tools and the clerk (+ §5b verdicts on item 101 (f)) | done 19:31 | lane seat |
| Part II §6 open questions + method disclosure | done 19:31 | lane seat |
| Verification of load-bearing claims | done 19:22 | 38 of 38 found on live re-fetch (Appendix B; `scratchpad/ux/V/verify.py`) |
| Appendix A query logs; source table (440 rows) | done 19:31 | lane seat |

## Part I — tool records

Each record follows the brief's bullets. Sub-surveyor records are merged verbatim from their section files (only heading
levels changed); source ids carry the group prefix (A1-, A2-, B1-, B2-, C-, D-, E-) and resolve in the source table at the
end. Items marked "snippet only" were seen in a search result, not read on the page.

### A. Fantasy map makers

#### Inkarnate
- **Audience · price · platform** (dated): For game masters, world-builders, authors and board-game designers of all ages. The FAQ says most users have no art skills (undated; fetched 2026-09-27) SOURCED [A1-S2].
  - Tiers are Free, Creator and Studio SOURCED [A1-S2]:
    - Free: 3 maps, 2k editing and export, personal licence.
    - Creator: 100 maps, 8k export, your own uploaded art, cloning other maps.
    - Studio: unlimited maps, 16k export, commercial use, the Art Manager, early access.
  - List prices come from the maker's 2025-11-17 post, which replaced the old Pro plan with these two paid tiers at version 2.0: Creator $39.99 a year or $7.99 a month; Studio $79.99 a year or $14.99 a month. Launch discounts of $25 or $5 (Creator) and $40 or $8 (Studio) stay locked in while a subscription started before 2026 keeps running SOURCED [A1-S3, entry 2025-11-17]. The post labels the monthly figures as yearly, which looks like a typo INFERRED.
  - The live price widget loads in the browser and could not be read (fetched 2026-09-27) SOURCED [A1-S1]. A user post from about 2026-09-09 gives US$7.99 as the cheapest monthly plan SOURCED [A1-S13].
  - Platform: browser only, with no offline use SOURCED [A1-S2]. A native Windows app has been open to Creator and Studio since 2026-03-06 (Studio got early access on 2026-01-21), and a Mac version is in progress SOURCED [A1-S3].
  - A 2025-10-09 news piece reports a poorly communicated price rise in mid-September 2025 SOURCED [A1-S5].
- **Core interactions** (what the user does, and what the tool works out alone):
  - Paint land and sea with the Mask tool. The editor turns that into a coastline using a roughness brush plus adjustable coastal effects (version 1.0, 2020-04-01) SOURCED [A1-S3].
  - Paint ground textures on brush layers, and place art pieces (called stamps) on object layers SOURCED [A1-S7][A1-S3 2025-12-08].
  - For cities: drag to lay down many building stamps at once, or use Area and Density sliders to fill a whole block. The 2021-06-04 post introducing this opens with "Having trouble placing multiple buildings on your city maps?" SOURCED [A1-S3].
  - Draw walls, rooms and roads with the Line and Shape tools (beta from 2024-02-07). The old Path tool was retired on 2026-01-12, and existing paths were converted automatically SOURCED [A1-S3].
  - Press World Generator to get a landmass within seconds, with a few settings (2020-04-01). It became its own tool on 2024-08-06, and the maker said it might later add mountain ranges SOURCED [A1-S3].
  - The tool never lays out streets, blocks or wall joins itself. The only generator is for landmass INFERRED (searched all 254 changelog entries in A1-S3 for "generat").
- **Constraints, snapping, magnetism, mistakes**:
  - Snapping: objects can snap to 9 points per grid cell (2024-03-11), and polygon shapes in the mask and brush tools align to the grid (2023-07-13) SOURCED [A1-S3].
  - Wall corners are tidied by hand with wall-junction stamps made for Line-tool walls (2026-05-18) SOURCED [A1-S3]. So wall joins are not worked out automatically INFERRED.
  - Undo: undo, redo and a change history since 1.0 (2020). The history was widened to cover every change in the current session (2022-08-10) SOURCED [A1-S3].
  - Version 2.0 (2025-12-08) SOURCED [A1-S3]:
    - The full command history is always on screen.
    - Autosave runs every few seconds on every plan, and can be switched off.
    - Snapshots save a point you can return to: one per map on Free, unlimited on paid plans.
  - Backups and saving: offline backups and map recovery have existed since 2020. During the 2.0 beta (2024-02-21) the editor advised making an offline backup in case saving failed. A 2023-04-03 fix dealt with saves that occasionally corrupted maps SOURCED [A1-S3].
  - No number for how many steps undo keeps was found (queries in the log).
- **Presets, templates, stamps, starting points**:
  - The maker's welcome post recommends a style for each map type; for cities and villages that is Watercolor Cities or Fantasy Regional SOURCED [A1-S3 Welcome post].
  - The homepage claims over 237,000 cloneable maps. It gives the asset count two ways, as 30K+ and as over 23,400 SOURCED [A1-S1].
  - Scene Stamps (2.0) turn a group of stamps and textures you built into one reusable piece. The maker names castles, towns and market layouts as uses SOURCED [A1-S3 2025-12-08].
  - Cloneable map templates on the dashboard, aimed at helping newcomers start faster, work on Free too (2026-06-18) SOURCED [A1-S3].
- **Labelling**:
  - A Text tool with curvature, spacing, line height and alignment settings (2020-04-01), plus text outlines (2020-07-07) SOURCED [A1-S3].
  - Labels and paths sit on object layers. Hiding a layer exports a version of the map without text (2021-06-04) SOURCED [A1-S3].
  - Labels that follow a drawn path: not found (queries: changelog searches for "label", "curv", "text tool"). Curving is done with a slider INFERRED.
- **Layers and zoom**:
  - 2.0 layers can be created, reordered and renamed, and each has its own mask. Clip masks have two modes, and grid and filter settings became layers of their own (2025-12-08). All maps were converted to the new layers on 2026-01-12 SOURCED [A1-S3].
  - Texture (brush) layers always draw beneath stamp (object) layers. Within one layer, order follows the Object List SOURCED [A1-S7].
  - New map from region copies part of a larger map into a new, more detailed map (2020-09-23) SOURCED [A1-S3].
  - Editing resolution is capped by plan SOURCED [A1-S2].
- **AI assist**: None shipped.
  - None of the 254 changelog entries (2019-12-12 to 2026-09-08) mention AI SOURCED [A1-S3].
  - In September-October 2025 an outside marketing firm ran AI-generated ads. The marketplace first allowed AI-made assets, then banned them after user backlash SOURCED [A1-S5, 2025-10-09].
  - An open feature request (about four months old, 6 upvotes) asks for an API key or an MCP link, so AI assistants could drive the editor SOURCED [A1-S4].
  - "Inkarnate AI" directory pages that claim AI map generation contradict the primary sources (search snippets only, not fetched).
- **Onboarding**:
  - The new-map screen offers a choice of styles, which a 2023 review says speeds things up SOURCED [A1-S15, 2023-11-17].
  - The welcome post links to recommended styles, Reddit, Discord, YouTube tutorials and the page of maps you can explore and clone SOURCED [A1-S3].
  - A dashboard (2026-05-29) adds one-click map creation with common settings, recent maps and official tutorial videos SOURCED [A1-S3].
  - A guided tutorial inside the editor: not found (queries: changelog searches for "tutorial", "onboard").
- **Praise**: "The UI is clean, and things make better sense" [A1-S16, 2021-01-07]. "it's become much more user-friendly across the years" [A1-S15, 2023-11-17]. "clean, easy-to-use layout" [A1-S17, 2024-07-19, modified 2025-07-09]. The homepage testimonials are chosen by the maker SOURCED [A1-S1].
- **Complaints** (negation searches: "Inkarnate undo lost my map work not saved"; "site:feedback.inkarnate.com undo"; "Inkarnate frustrating learning curve beginner stamps layers confusing"; "\"Inkarnate 2.0\" review lag slow complaints"; "Inkarnate city map tedious placing buildings one by one"; "Inkarnate price increase 2025 …"):
  - A learning curve, with cluttered first maps [A1-S9, 2021-01-20][A1-S15].
  - Stamps only scale proportionally: "I can't make a wall longer without also making it thicker" [A1-S9].
  - Lag in Firefox at high resolution: "it lags so much that it is unusable" (2023-11-28) [A1-S18]. Maps also slow down when left unsaved for a while [A1-S9].
  - Private bug posts (search snippets only) report that undoing after deleting a line crashed the tab and lost unsaved changes, and that a whole map vanished after undo [A1-S14].
  - The 2025 price rise, regional pricing, and the AI controversy [A1-S5][A1-S13].
  - The search for city-building tedium found nothing specific, though the maker's own 2021 post names the problem [A1-S3].
- **Lesson for our toolkit**: Ship Inkarnate's end-state safety net from day one: autosave, a visible full history, named snapshots, and reusable multi-stamp town pieces. Then work out automatically what Inkarnate still leaves to hand-placed stamps: wall joins, and filling streets and blocks.

#### Wonderdraft
- **Audience · price · platform** (dated):
  - For hobbyists and game masters making world and regional maps. One-time purchase of $29.99, with no subscription and no extra fee for commercial use. Official add-on packs cost $4.99 (Pirates) and $9.99 (Fantasy Buildings). Checkout is through Polar or itch.io (PayPal); support is through the Megasploot Discord. The live page is undated, but its privacy policy says it was last updated 2026-01-01 (fetched 2026-09-27) SOURCED [A1-S19].
  - Platforms: the page lists Windows 10 64-bit or Ubuntu, and its supported-platforms image shows only Windows 64 and Linux 64 SOURCED [A1-S19][A1-S20]. The GitHub repository's description (the repository was last updated in 2019) lists macOS, and so did a 2019 independent review SOURCED [A1-S21][A1-S25]. A user issue from 2025-03-30 reports a Mac build numbered 1.1.8.2 SOURCED [A1-S22]. So current Mac support is unclear, and the maker no longer advertises it INFERRED.
  - Not on Steam SOURCED [A1-S67].
- **Core interactions** (what the user does, and what the tool works out alone):
  - Brush on land, and the coast comes out styled automatically; the maker's words are "Brush landmasses with automatically beautified coastlines" SOURCED [A1-S19]. The raise-land brush has a "wiggly" edge, so coastlines come out irregular, with sliders for size and roughness SOURCED [A1-S25, 2019].
  - The Landmass Wizard generates land from a pattern menu and a Generate button. It is the first thing the maker's Quick Guide teaches SOURCED [A1-S23, 2019-11-28]. Alternatives: import a black-and-white landmass image, or trace over an image laid under the map SOURCED [A1-S31, 2020-10-28][A1-S25].
  - Rivers and roads are drawn by clicking points. A double or right click finishes, Alt straightens, and Alt+Shift snaps to 45 degrees SOURCED [A1-S24]. The maker says both look artistic after a few clicks SOURCED [A1-S19]. The river tool has adjustable meander and width SOURCED [A1-S25].
  - Tree and mountain symbols are painted in groups SOURCED [A1-S19]. The brush sprays a different member of a symbol family with each dab, with settings for rate and scale SOURCED [A1-S25]. A 2018 tester noted that symbols come out randomised and that shading is done automatically SOURCED [A1-S34, 2018-03-26].
  - Worked out automatically: coast styling, meander, symbol variety, shading. Placed by hand: every settlement, label and road INFERRED.
- **Constraints, snapping, magnetism, mistakes**:
  - Undo is Ctrl+Z and redo is Ctrl+Y SOURCED [A1-S24, 2019-09-30]. A 2018 tester praised the undo and redo as robust SOURCED [A1-S34].
  - Undo depth: not found. (Queries: "Wonderdraft undo redo history limit steps", "Wonderdraft \"can't undo\" …". A search of the GitHub issues for "undo" returned nothing.)
  - The only snapping found is the 45-degree snap for paths SOURCED [A1-S24].
  - Autosave: none in the maker's docs. A user lost about an hour of work after a crash (2022-02-11): "none of the progress was saved" SOURCED [A1-S22 #22]. A Reddit thread on map corruption (blocked; search snippet only) recommends a sequential-save option and cloud-synced backups [A1-S33].
  - The canvas size is fixed when you create the map (512 to 8192 pixels) and cannot be scaled up later SOURCED [A1-S19][A1-S34].
- **Presets, templates, stamps, starting points**:
  - Curated default map themes SOURCED [A1-S19]. The Quick Guide says to pick a theme when creating a new map (it suggests Pastel for a first map), then generate or draw SOURCED [A1-S23].
  - Symbol libraries and third-party asset packs are available SOURCED [A1-S25]. Adding assets is manual; the 2018 tester called it the least beginner-friendly part SOURCED [A1-S34].
- **Labelling**:
  - Labels are built from reusable presets SOURCED [A1-S19]. Click to place a label, Alt+drag to rotate it (add Shift to snap the rotation), Ctrl+drag to move it SOURCED [A1-S24].
  - In 2020 a user asked for editable presets whose changes would carry to every existing label, because each label then had to be changed by hand SOURCED [A1-S22 #4].
  - A later secondary guide says presets now update all their labels, and that curved text "lets labels follow coastlines, rivers" [A1-S32; undated; weak, content-marketing source]. How the curve works (attached to a path, or bent by hand) is NOT confirmed by any primary source. (Queries: "Wonderdraft labels follow path curved text tutorial", "…label tool curve label along river", "…bend label text arc…", "…1.1 update curved labels…".)
  - The 2018 tester noted jagged, cramped-looking text SOURCED [A1-S34].
- **Layers and zoom**:
  - Tool tabs for Water, Landmass, Symbols, Labels and Overlay. Ctrl+scroll zooms, and the guide compares moving around to navigating Google Maps SOURCED [A1-S23]. Shift+Up/Down moves a symbol up or down a layer SOURCED [A1-S24].
  - A 2020 reviewer found the layer system unlike Photoshop's and had to learn it SOURCED [A1-S26].
- **AI assist**: None found in the product or on the maker's pages SOURCED [A1-S19] (query: "Wonderdraft AI feature generative Megasploot AI policy"). A third-party asset pack on the CartographyAssets site is labelled as made with Google's Gemini (search snippet only, not fetched).
- **Onboarding**:
  - The first launch shows "an empty window with a top menubar". Then Ctrl+N, pick a theme, get a canvas of ocean, and click Generate in the Landmass Wizard. The guide suggests an order: landmass, mountains, rivers, biomes, trees, settlements, labels, export SOURCED [A1-S23].
  - The manual is a three-page GitHub wiki, last edited in 2019-2020 SOURCED [A1-S23][A1-S24].
  - A 2025 commenter says the developer does not use the GitHub bug tracker, and points users to the Reddit wiki SOURCED [A1-S22 #37].
- **Praise**: "Best UI for map-making that I have used" [A1-S27, 2020-12-31]. "incredibly intuitive" [A1-S34, 2018]. It turned "an extremely intimidating challenge into my quarantine zen" [A1-S26, 2020-05-15]. A 2024 Tildes essay recommends it most for world maps [A1-S29, 2024-02-19].
- **Complaints** (negation searches: "Wonderdraft undo limitations complaints", "Wonderdraft review learning curve downsides frustrating", "Wonderdraft crash lost map save corrupted", "Wonderdraft city map town map how to limitations"; plus the full list of 39 GitHub issues):
  - Cities: towns take hours of hand-placing, "without painstaking individual placement and lots of micro-tweaking" [A1-S28]. The same forum user said elsewhere that neither of Megasploot's tools is good at towns [A1-S27], so these two count as ONE source. The independent Tildes essay says Wonderdraft's scatter brush is "essentially useless for placing buildings" [A1-S29].
  - Stability and lost work: the lost-work crash (#22); the app becoming very slow (#1); slowness on Linux Wayland (#29); a crash on export (#33). All 39 issues filed 2020-2026 are still open [A1-S22].
  - Workflow: clumsy file dialogs and heavy graphics-card demands [A1-S25]. Layers and importing assets take learning [A1-S26].
- **Lesson for our toolkit**: Wonderdraft wins hearts by working out the organic details (coast wobble, meander, symbol variety, shading) from rough strokes. It fails at town scale, where it has no rule for placing buildings along roads. PLAT's rule-driven `fill` tool must cover exactly that gap, with autosave built in; Wonderdraft users improvise with numbered save copies.

#### Dungeondraft
- **Audience · price · platform** (dated):
  - For game masters making battle and encounter maps. The maker's pitch leads with an "Unintimidating UI" and a fast, intuitive workflow. One-time purchase of $19.99, with no subscription and no extra fee for commercial use. Checkout is through Polar or itch.io (Humble purchases also supported). The live page is undated, but its privacy policy is dated 2026-01-01 (fetched 2026-09-27) SOURCED [A1-S35].
  - Platforms: the page lists Windows 10 64-bit or Ubuntu, and says ARM64 chips are not supported. The supported-platforms image is the exact same file as Wonderdraft's, showing Windows 64 and Linux 64 only SOURCED [A1-S35][A1-S36].
  - A 2021 review said it ran on PC and macOS SOURCED [A1-S45]. GitHub issues from 2022-2023 report crashes on macOS SOURCED [A1-S38 #53 #60]. So macOS is no longer advertised INFERRED.
  - A user reports running version 1.2.0.1 as of 2025-11-28 SOURCED [A1-S38 #78]. Not on Steam SOURCED [A1-S67].
- **Core interactions** (what the user does, and what the tool works out alone):
  - Building tool: drag out a rectangle or circle, or click corner points for any shape, and you get a building with floor and walls. Drawing a new shape over an existing building merges the two, so a thin rectangle between buildings becomes a hallway. Shift+drag bends a wall into a curve, Edit Points moves the corners, and Alt switches to erase SOURCED [A1-S39].
  - Wall tool: add freestanding or interior walls, and choose whether they sit over or under other walls, with shadow and bevel settings SOURCED [A1-S39][A1-S37 WallTool].
  - Door and window tool: by default a door or window can only be placed on a wall (Anchored), and it flips 180 degrees. Freestanding mode puts one anywhere. A setting controls whether it blocks light SOURCED [A1-S39]. In the programming interface, doors attach to walls through `Wall.AddPortal()` SOURCED [A1-S37 PortalTool].
  - Paths (with smoothing and fade), an object library with tag filters, and a Scatter tool that "can rapidly and randomly place objects" SOURCED [A1-S37][A1-S41].
  - Lighting: a whole-map ambient colour plus light sources. Light stops at walls and closed doors, and passes through windows set to let light through SOURCED [A1-S45][A1-S44].
  - Export: PNG, JPG, or Universal VTT (a file other virtual tabletop programs can import). With Universal VTT, "your walls and lights will already be in place" SOURCED [A1-S43]. The maker lists Foundry, Roll20, Fantasy Grounds Unity and others SOURCED [A1-S35], and a Foundry add-on reads these files SOURCED [A1-S46].
  - Worked out from what the user drew: walls and floors from a room shape, merged walls where shapes overlap, door openings from doors placed on walls, light blocked by walls, and wall data in the VTT export INFERRED (from the above).
- **Constraints, snapping, magnetism, mistakes**:
  - Grid, snap and lighting toggle on and off with G, S and L. Snapping to half-squares is optional SOURCED [A1-S40].
  - Preferences set "how many times you can hit undo", plus automatic backups: whether they run, how often, and how many are kept SOURCED [A1-S40]. Undo depth is therefore the user's choice; the default was not found.
  - Silent side effect: joining buildings that have different wall styles converts all the walls to the style currently selected SOURCED [A1-S39].
  - A 2021 reviewer found painted-on (non-smart) assets could not be changed or deleted later, and called this its only downside SOURCED [A1-S45]. That may be outdated INFERRED.
  - Walls cannot be moved with the Select tool. An open 2022-09-21 issue says: "Not being able to move walls like floor tiles … is frustrating" SOURCED [A1-S38 #52].
  - The maker's FAQ gives fixes for maps that will not save or export: change the folder, disable antivirus, lower the export resolution SOURCED [A1-S35].
- **Presets, templates, stamps, starting points**:
  - The new-map dialog offers size templates (TV and paper sizes) and a Start with Map Wizard checkbox. The wizard makes random dungeons and caves from Boundary, Complexity and Density sliders plus floor and wall choices; clicking Generate again gives a new layout SOURCED [A1-S40]. The maker lists a built-in dungeon and cave generator SOURCED [A1-S35].
  - Prefabs: select objects and lights, then Make Prefab, and file it in a named set SOURCED [A1-S42].
  - About 2,000 bundled assets (2021) SOURCED [A1-S45]. Third-party art styles are available (Forgotten Adventures, 2-Minute Tabletop, Crosshead, DnDungeon), plus the CartographyAssets site SOURCED [A1-S35].
- **Labelling**:
  - The Text tool lets you type, move text, and set font, size and colour, with an optional box behind the text. Text can be hidden to export separate player and game-master versions SOURCED [A1-S44].
  - The Text tool's programming reference shows no curve, path or rotation settings SOURCED [A1-S37 TextTool]. A request for rotatable text (2023-12-29) is still open SOURCED [A1-S38 #63].
  - Labels that follow a path: none found.
- **Layers and zoom**:
  - Layers are ordered by relative height, and the user picks the layer for each asset. A reviewer says this works if you plan ahead SOURCED [A1-S45].
  - Objects and interior walls have over/under settings SOURCED [A1-S39][A1-S41]. Maps can have several levels SOURCED [A1-S37 Level][A1-S40 table of contents].
  - A 2022 issue reports very low performance on bigger maps SOURCED [A1-S38 #48].
- **AI assist**:
  - None in the product's feature list SOURCED [A1-S35].
  - The main Foundry importer is labelled "Zero AI" SOURCED [A1-S46].
  - A Nexus Mods news post titled "AI-Generated Content in Modding at Dungeondraft Nexus" exists but was blocked (title only) [A1-S47].
- **Onboarding**:
  - The title screen shows the version and whether an update is available. Next comes the new-map dialog, then the Map Wizard unless the user unticks it. Keyboard shortcuts for the current tool show along the bottom of the screen SOURCED [A1-S40].
  - Help runs mainly through the Discord, which the FAQ names as the best place to get it SOURCED [A1-S35].
  - Most of the manual is community-made (Encounter Library guides; an unofficial PDF manual turned up in search but was not opened) SOURCED [A1-S39..S44].
- **Praise**: "maps are created by painting which is very intuitive" [A1-S45, 2021-01-16]. The Tildes essayist had given up on combat maps until Dungeondraft made exporting to Foundry quick and hassle-free [A1-S29, 2024-02-19, paraphrased]. A D&D Beyond user rated ease of use high for both Megasploot tools [A1-S27, 2020-12-31, paraphrased].
- **Complaints** (negation searches: "Dungeondraft frustrating learning curve walls annoying beginner" (irrelevant hits); "Dungeondraft town map city large map performance tips"; "Dungeondraft review … pros cons"; plus the full list of 81 GitHub issues, 70 still open):
  - Crashes: 15 issue titles mention crashing, including constant crashes on 1.2.0.1 (2025-11-28) [A1-S38 #78].
  - Big maps are slow [#48].
  - Lost work: asset packs came unhooked and all objects were wiped, and backups could not restore them [#41, 2022-02-04].
  - Walls cannot be moved [#52], and text cannot be rotated [#63].
  - Towns: the Tildes essayist found Dungeondraft too small-scale and grid-rigid for cities; one unfinished city had taken more than a hundred hours [A1-S29]. The D&D Beyond user also judged both Megasploot tools weak at towns [A1-S27].
- **Lesson for our toolkit**: Drag a room and get joined walls, have doors snap to walls, re-roll the generator: this is the pattern casual users love. PLAT must design out its failures:
  - silent restyling when buildings merge (every wall converts);
  - walls the user cannot move once they have been generated;
  - no support for anything bigger than a building.

#### Dungeon Scrawl
- **Audience · price · platform** (dated):
  - For casual and underprepared game masters making old-school dungeon and battle maps. It runs in the browser with "No downloads or sign-up required" SOURCED [A1-S65].
  - Free ($0, no sign-up) SOURCED [A1-S49]:
    - unlimited maps, saved to and loaded from .ds files on your computer
    - undo and redo for everything
    - PNG/WebP export, and sending the map to a TV
    - importing maps made by generators
    - square and hex grids, an image library, isometric view
  - Pro, $5 a month (paying yearly saves over 25%) SOURCED [A1-S49]:
    - a cloud library with autosave, and commercial use
    - more layers and textures, and custom presets
    - share links, PDF and high-resolution export, lighting
    - several linked maps in one file, which the maker suggests for mega-dungeons, towns and multi-floor buildings
  - The live pricing page is undated (fetched 2026-09-27). Roll20's Elite subscription tier includes Pro SOURCED [A1-S49].
  - History: created by Keir (@probabletrain) and first released in 2020. It "joined the Roll20 family in 2023" (Roll20 is an online tabletop company) SOURCED [A1-S50].
  - Version 1 vs version 2:
    - V1 (2020, itch.io) was an open beta "with no paywall, no ads, and no locked features", and maps made without image layers were free to reuse under a CC0 licence SOURCED [A1-S56].
    - V2 (2022-10-15) was "a complete rebuild", and some features were still unfinished at launch SOURCED [A1-S54].
    - The free/Pro split belongs to V2 SOURCED [A1-S49][A1-S51].
  - The first Pro sale, on 2025-11-28, offered the first month for $0.99 (reported via a company press release) SOURCED [A1-S52]. Not on Steam SOURCED [A1-S67].
- **Core interactions** (what the user does, and what the tool works out alone):
  - The maker calls it "a polygon editor with bells and whistles". Every tool either adds to the dungeon's single outline or erases from it. Overlapping rooms therefore fuse into one shape, and the walls are drawn around the result automatically.
    - The rectangle brush has a J key that switches between separate rooms (a wall between neighbouring rectangles) and joined rooms (no wall).
    - Drawing and erasing along the same line makes an interior wall.
    - SOURCED [A1-S55, V1 guide]
  - Rooms snap to the grid ("The cursor snaps to fit the grid") SOURCED [A1-S57, 2020-06-24]. S turns snapping on and off, and Shift+S with a number 1-8 sets how finely it snaps SOURCED [A1-S55].
  - Tools in V1 SOURCED [A1-S55]:
    - a path brush with a curve mode
    - polygon and regular-polygon brushes
    - door and stairs tools
    - a mirror tool
    - a wall tool that is really a thin path
    - copy, paste and rotate for any selection
  - In V2 the main tools are rectangle (already selected when you open it), regular polygon, wall and door SOURCED [A1-S51, 2025-10-07].
  - One-click styles restyle the whole map: roughened edges, hatching SOURCED [A1-S55][A1-S65].
  - Random Dungeon (beta, 2026-05-13) SOURCED [A1-S60]:
    - Set size, room count, room size, corridor length and width, layout (from straight to winding), door density, room shapes and roughness.
    - Click Generate, and generate again as often as you like.
    - Roll20 presents the result as a starting point, and every room, hallway and door stays editable.
  - Maps from two outside generators, Watabou's One Page Dungeon and Donjon, can also be imported SOURCED [A1-S51][A1-S62].
  - Stamp tool (2026-05-13): drag to scatter copies of an image with random size, rotation, spacing and colour. A setting controls how densely the copies fall, snapping is optional, and each copy sits on its own layer SOURCED [A1-S61].
- **Constraints, snapping, magnetism, mistakes**:
  - Undo: "Undo/redo anything" comes free SOURCED [A1-S49]. The V1 keys are Ctrl+Z, Ctrl+Y and Ctrl+Shift+Z SOURCED [A1-S55]. How many steps undo keeps: not found.
  - A 2020 bug: after the roughen command, one Ctrl+Z undid both the roughening and the last thing drawn SOURCED [A1-S64].
  - Generating a random dungeon replaces the current map. A warning appears first because "undo won't recover a replaced map" SOURCED [A1-S60].
  - Turning on smooth (curved) mode switches snapping off; the release notes flag this SOURCED [A1-S61].
  - Several objects can be locked with one click (2026-07-09) SOURCED [A1-S63].
  - Saving:
    - V1 warned that you must download the save file or lose the ability to edit the map later SOURCED [A1-S55].
    - In V2, autosave is Pro-only SOURCED [A1-S49]. A Roll20 help-centre snippet (page blocked) says free users lose unsaved work when the page refreshes [A1-S66].
    - A user working through the Roll20 link (2025-04-04) reports the screen going blank and all their work disappearing SOURCED [A1-S59].
- **Presets, templates, stamps, starting points**:
  - Choosing a style preset is step two of the maker's 60-second map SOURCED [A1-S51]. V1 offered built-in styles to customise SOURCED [A1-S53].
  - Pro adds custom presets and world-building presets SOURCED [A1-S49][A1-S52].
  - In June 2026 the maker added 800+ new free library images (per a blog post title linked from the July post) [A1-S63 site navigation].
  - Other starting points: generator imports and the Random Dungeon SOURCED [A1-S60][A1-S65].
- **Labelling**:
  - V1 had fonts and Unicode symbols on image layers SOURCED [A1-S53][A1-S56].
  - The V2 Text tool gained alignment and drop shadows in July 2026 SOURCED [A1-S63]. A help-centre snippet says you click to place text, set its style beforehand, and move it with the Object tool (page blocked; snippet only).
  - Labels that follow a path: none found.
- **Layers and zoom**:
  - V1 had three kinds of layer: dungeon, image and background. Each had its own style, and linked layers shared style changes SOURCED [A1-S55].
  - V2 in 2026 added selecting several layers at once, changing their settings together, and folders that automatically receive new objects SOURCED [A1-S61].
  - A user on the Roll20 link (2025-05-09) reported maps stuck at 50 by 50 squares with no zoom SOURCED [A1-S59]. Roll20 describes a 50-by-50 connection window SOURCED [A1-S60]. So the limit comes from the Roll20 link INFERRED.
- **AI assist**: None. The 2026 generator is rule-based (procedural), not AI. Wargamer's headline calls it "0% AI", and its review says the output is bare, with no furniture or encounters SOURCED [A1-S62, 2026-05-15].
- **Onboarding**:
  - No account is needed. The flow is: land on the site, click Start Scrawling (the rectangle tool is already selected), pick a style, block out rooms, add a door, export a PNG. The maker calls this a 60-second map and claims you can "figure it out in about 30 seconds" SOURCED [A1-S51, maker marketing].
  - The Random Dungeon is pitched at people facing a blank page SOURCED [A1-S61].
  - In 2020 a Hacker News (HN) visitor could not tell whether it generated maps or only drew them SOURCED [A1-S64].
- **Praise**:
  - "UI is pretty clean… Love the path tool" [A1-S64; 2020-06-23 launch thread, 366 points].
  - The itch.io page showed 4.9 out of 5 from 398 ratings when fetched [A1-S53].
  - The homepage testimonials are chosen by the maker (one calls it ideal for casual game masters) [A1-S65].
  - GIGAZINE's hands-on review is positive [A1-S57].
- **Complaints** (negation searches: "Dungeon Scrawl v2 complaints worse than v1 OR paywall OR Roll20 acquisition"; "\"Dungeon Scrawl\" frustrating OR limited OR \"lost my map\" …"; plus Roll20 forum pages and HN comments):
  - Upselling: "Constantly closing 'upgrade now' popups" [A1-S59, 2025-05-09].
  - Dark mode behind the paywall: a visually impaired user objected in 2023 [A1-S58, 2023-09-27]. By May 2026 a light/dark toggle follows the browser setting for signed-out users [A1-S61], so this appears resolved INFERRED.
  - Editing limits: provided door images could not be resized, and there was no zoom [A1-S59].
  - The maker admits its image library is modest [A1-S51].
  - Undo: a wish for on-screen undo and redo buttons, plus the undo bug above [A1-S64].
  - Complaints comparing V1 and V2: not found.
- **Lesson for our toolkit**: Copy two things:
  - the map as one shape you add to or carve from, with walls worked out automatically and an explicit switch for joined or separate rooms;
  - a warning before regenerating, because undo cannot bring back a replaced map. PLAT goes further: regenerating keeps everything the author declared, so no such warning is ever needed.

#### Targeted checks from the lane seat (design item 101 (f); received mid-run)
**Check 1 (Inkarnate): "the main beginner frustration is brush-versus-object layers and stamp ordering". Verdict: the ranking is UNSUPPORTED; that there is a general learning curve is SUPPORTED.**
- Where the claim comes from:
  - The line "New users spend hours fighting with object ordering" traces to ONE page, Loreteller's undated comparison article SOURCED [A1-S6].
  - That page gives no citation, no author, no test method and no user thread. Its Inkarnate prices are stale: a $5/$25 Pro plan and 10 free maps, both of which predate version 2.0. They contradict the current FAQ (3 free maps; Creator and Studio plans) SOURCED [A1-S6][A1-S2][A1-S3 2025-11-17].
  - Loreteller sells storytelling frameworks and a premium toolkit; it is not a mapping site SOURCED [A1-S8]. Its layers guide repeats the frustration claim, again without a source SOURCED [A1-S7].
  - So the "2026 comparison" and the "layers guide" are one origin, not two independent confirmations INFERRED.
- Primary evidence:
  - Against, or at least silent: the Reddit search for stamps rendering behind layers returned no Inkarnate threads (query log). The feedback board's post about layers stacked between paint layers is private (title only) [A1-S14].
  - Two dated independent reviews describe a general learning curve without singling out ordering: a 2021 review blames the masking tool and messy first maps [A1-S9], and a 2023 review mentions a learning curve [A1-S15].
  - Weak support: the maker fixed the object list not updating the layer order (2022-07-13), and version 2.0 rebuilt layers completely (2025-12-08) SOURCED [A1-S3]. That the maker invested there suggests a pain point INFERRED.

**Check 2 (Wonderdraft site claims and price). Verdict: CONFIRMED.**
- The live homepage lists all three features the lane cited: coastlines beautified automatically, groups of tree and mountain symbols painted painlessly, and rivers and roads that look artistic after a few clicks. The exact wording is at lines 6, 8 and 9 of A1/wd-home.txt and is close to, but not identical with, the lane's paraphrase SOURCED [A1-S19].
- Price: $29.99, one-time purchase SOURCED [A1-S19]. The page itself is undated; its privacy policy is dated 2026-01-01; fetched 2026-09-27.
- The negation searches found nothing that disputes the coastline or river claims. They did find:
  - poor fit for towns [A1-S27][A1-S28][A1-S29]
  - a crash that lost work, with no autosave [A1-S22]
  - an unanswered GitHub issue tracker [A1-S22]
  - no primary confirmation that labels can follow a path [A1-S32 only]
  - Mac support dropped from the site [A1-S20]
  - Full list: the Wonderdraft record, Complaints.

**Check 3 (do casual users prefer brushes and stamps, or settings panels?). Verdict: no direct preference study was found. The indirect evidence points to a mix: settings to start, hand tools to finish.**
- Wonderdraft: a tutorial seller calls the settings-driven Landmass Wizard underrated, and says hand-drawing is the slowest method: "And yet, I see it being used a lot." SOURCED [A1-S30, undated; one practitioner]. The maker's own Quick Guide teaches the wizard first SOURCED [A1-S23].
- Inkarnate: when users struggled to place city buildings, the maker answered with a brush that has settings (Area and Density), not with a generator. Its World Generator has stayed landmass-only for six years SOURCED [A1-S3]. No user opinion on the generator was found (query log).
- Dungeondraft: a new map opens in the settings-driven Map Wizard by default. Its sliders are Boundary, Complexity and Density, and you click Generate again for a new layout SOURCED [A1-S40]. No evidence on user preference was found.
- Dungeon Scrawl:
  - It started shape-first and relied on outside generators. In 2026 Roll20 added a 10-setting Generate panel, pitched as a starting point for the blank-page problem SOURCED [A1-S60][A1-S61].
  - An HN commenter in 2020 found a drawing-only tool less compelling than one that generates SOURCED [A1-S64, one comment].
  - Wargamer: Donjon's many settings plus hand-editing in Dungeon Scrawl give the best of both SOURCED [A1-S62, paraphrased].
- Across tools: settings-driven brushes (scatter density, radius) are praised for organic fill but fail for structured placement such as buildings along roads SOURCED [A1-S29]. The one tool a heavy user credits with automatic building placement along roads is City Designer 3, which is outside A1's scope SOURCED [A1-S29].

#### Worldographer 2025 (Inkwell Ideas)
- **Audience · price · platform** (dated): Tabletop RPG game masters making old-school hex maps; one program covers world/kingdom, settlement (city/village), battlemat/dungeon and star-sector maps SOURCED [A2-S1, A2-S5]. Freemium: the free and Pro versions are the same download, with Pro features unlocked by a code SOURCED [A2-S2]. The Pro license (2025 version plus the legacy programs) is listed at US$69.99, with a compare-at price of $109.97 (store JSON, undated product page, fetched 2026-09-27) SOURCED [A2-S17]. It runs on Windows, macOS (Apple-silicon and Intel builds), Debian Linux and a Java jar, needs a 64-bit machine, and does not run on Chromebooks, phones or tablets (pages undated, fetched 2026-09-27) SOURCED [A2-S3, A2-S14]. The maker describes the Windows build as unsigned SOURCED [A2-S14]. The 2025 version left beta in December 2025 (post dated 2026-01-11) SOURCED [A2-S16]. It is not on Steam: the storesearch API returned no hit on 2026-09-27 SOURCED [A2-S25].
- **Core interactions**:
  (1) Fill in one setup dialog and press Generate Map. A live preview updates automatically while each side is 1,000 hexes or fewer. Coasts, rivers, empires, hex-crawl sites and roads are optional checkboxes on the same screen SOURCED [A2-S4, A2-S15].
  (2) The maker recommends staging the work instead: leave those boxes unticked, adjust the terrain, then run Generate Coasts, adjust the coasts, run Generate Rivers, and so on. The manual calls one-step generation fun to watch but calls it "more practical to use these tools incrementally" SOURCED [A2-S4].
  (3) Settlements can be made three ways. The first is a random town built from settings: population, a dense-centre checkbox, coast and river start/end given as clock positions, two main roads with a `windy-ness` setting, a wall with a tower count and radius, a street layout (Haphazard, Branching, Ordered, Very Ordered, or polygon shapes), street count, skip chance and vegetation. The second is a blank map placed entirely by hand. The third is a hybrid: start blank, then generate Coast, River, Main Roads, Wall, Streets, Buildings and Vegetation one step at a time, with undo/redo or hand edits between steps SOURCED [A2-S5].
  (4) Paint terrain on hexes, place icon features, and draw shapes as point-by-point polylines or polygons SOURCED [A2-S6].
  (5) Terrain Wizard: the author paints a few hexes and the tool fills the blank hexes from their neighbours. Repeated runs give different results SOURCED [A2-S7].
  (6) Clicking a city, ruin or castle and opening its Notes generates an editable outline of the place. Generated towns carry per-building occupants and shop price lists SOURCED [A2-S1, A2-S13].
- **Constraints, snapping, magnetism, mistakes**:
  - Undo is Ctrl+Z and redo is Ctrl+Y. The manual gives no undo depth (it describes undo only as reversing the last change) SOURCED [A2-S7]. The changelog has two beta entries about fixing undo/redo reliability (changelog undated) SOURCED [A2-S12].
  - Two actions are documented as irreversible. Expand/Shrink map carries the warning "permanent and cannot be undone". For Open Into This Map, the manual warns there is no reversal once the map is saved SOURCED [A2-S7].
  - Autosave is optional, every 5 minutes, and the manual offers it as the way to recover from a non-reversible action. Saves go to a temporary file that is renamed only after a successful write SOURCED [A2-S7, A2-S13].
  - Shape points can snap to the grid and to quarter-steps between grid lines SOURCED [A2-S9].
  - Generators fail softly and report it only in the final status line. For example, a wall that does not fit is not drawn, and the status message says so SOURCED [A2-S5].
  - Generated items carry tags (`coast`, `road`). The road generator checks the `road` tag so it does not reconnect the same two settlements, and `Delete All Coasts` removes everything tagged coast SOURCED [A2-S7].
  - A known gotcha: changing the settings of a feature or label applies only to the NEXT one placed, unless you first press `Select` SOURCED [A2-S6]. An option makes each newly placed feature auto-select SOURCED [A2-S7].
- **Presets, templates, stamps, starting points**: The icons (called features) act as stamps, with hundreds built in; Pro users can import any image SOURCED [A2-S1]. Shapes and labels have preset styles for roads, rivers and walls SOURCED [A2-S9]. The world generator's terrain table and the settlement data (store prices, residents) can be configured, saved and reloaded SOURCED [A2-S4, A2-S2]. The random seed is shown but is not saved in the map file SOURCED [A2-S4].
- **Labelling**: Labels are placed by hand. You type the text, press `New Text Label`, then click the map. Labels attached to a feature move with it. There are label styles and curved labels (v2.03) SOURCED [A2-S6, A2-S9, A2-S12]. The settlement generator can label buildings by name, grid coordinate, both, or not at all SOURCED [A2-S5]. No automatic label placement or collision avoidance is documented: not found (queries: grep for curve, style, overlap, collision and auto across the manual pages).
- **Layers and zoom**: Named layers can be reordered, hidden and set to an opacity (opacity and rename are new in 2025). Removing a layer deletes its objects after a confirmation prompt. A mini-map shows the viewport. Zoom changes the hex pixel size SOURCED [A2-S8]. Map levels ("child maps") hold world, continent, kingdom and province versions in one file, at a chosen hexes-per-parent-hex ratio up to 30. `Auto-Update Other Map Levels` pushes an edit on one level to the others (the maker says this also works from lower levels up), and `(Re)Generate Map Level` rebuilds a level after big changes SOURCED [A2-S1, A2-S4, A2-S11]. Shapes rescale across levels automatically; icon-style coasts and rivers must be re-placed by hand on each level SOURCED [A2-S4]. The levels are Pro-only SOURCED [A2-S2]. Settlement maps are separate files, not a level of the world map. `Generate Child Map as a New Map` (v2.01) exists SOURCED [A2-S12]. Whether a world-map city opens its town map directly: not found (queries: grep for child, link and open across the manual).
- **AI assist**: None. The only automation is procedural generators and dialogs. Not found (query: "Worldographer AI feature Inkwell Ideas artificial intelligence map", plus a grep of the manual pages for AI).
- **Onboarding**: There is no in-app tutorial. Help consists of an online manual, a YouTube channel, a FAQ and a Discord linked from the `Forum` page SOURCED [A2-S1, A2-S18]. The manual's first-use advice is to generate with the defaults, then start over with a few changes and repeat SOURCED [A2-S4]. The empty state is a New Map setup dialog, not a blank canvas INFERRED (from the File > New flow in [A2-S4, A2-S5]). One of the first FAQ entries covers license keys failing because a pre-2025 install opens by default SOURCED [A2-S13].
- **Praise**: On multiple levels, the maker says a smaller map "can have any number of hexes across per hex in the parent map" SOURCED [A2-S1] (maker's claim). A 2020 forum user found Worldographer's learning curve much lower than CC3's SOURCED [A2-S19] (2020-08-05). The same thread called the interface only slightly wonky, and the original poster concluded it would work for them SOURCED [A2-S19]. A 2022 user found it fun for B/X-style world maps (the Hexographer era) SOURCED [A2-S20]. A 2023 comment kept a Worldographer map "so I can add notes to it" SOURCED [A2-S24].
- **Complaints** (negation searches: "Worldographer clunky interface frustrating"; "\"Worldographer\" \"learning curve\""; "\"Worldographer\" crash OR \"lost my\" OR \"undo\" problem forum"; "site:reddit.com Worldographer"):
  - A 2022 user wrote "a bit of a bear to use", a resource hog on their laptop, with little guidance for sizing an Earth-like world SOURCED [A2-S21] (2022-05-04; pre-2025 version).
  - Another 2022 user found it janky on macOS and its maps ugly SOURCED [A2-S20] (2022-01-26).
  - World Anvil, a competing product, found it functionally complete but very old-school in style, "not great for writers", and not to its taste (hex maps) SOURCED [A2-S22] (2020-11-19, modified 2026-07-23).
  - A search-engine summary blamed Worldographer for crash and lost-progress reports, but the cited thread (Other World Mapper forum) never mentions Worldographer, so it is discarded SOURCED [A2-S26].
  - No Reddit threads surfaced. EN World's 2024 crowdfunding thread held only the maker's posts, with no user replies SOURCED [A2-S23]. I found no dated complaint about the 2025 version specifically.
- **Lesson for our toolkit**: Staged derivation with editing between stages (terrain, then coast, then rivers, then roads; for towns: coast, river, main roads, wall, streets, buildings, vegetation) is what the maker itself recommends as more practical. Tagging derived output lets one stage be deleted and re-run without touching hand work, which matches our declare-then-derive plus `hold`.

#### Azgaar's Fantasy Map Generator (FMG)
- **Audience · price · platform** (dated): Worldbuilders, game masters and writers who want a simulated world (heightmap, climate, cultures, states, religions, routes, economy). It is free and open source; maps may be used for any purpose, including commercial. It runs in the browser with no install, and a desktop app exists for Windows, macOS and Linux (wiki page undated, fetched 2026-09-27) SOURCED [A2-S28]. The latest dated release is 1.153.0 (2026-09-16), and the repo was pushed 2026-09-27 SOURCED [A2-S32, A2-S34]. It is not on Steam SOURCED [A2-S25].
- **Core interactions**:
  (1) Opening the page generates a random finished map. The `On load` option can switch this to reopening the last save; the default in source is `random` SOURCED [A2-S28, A2-S35].
  (2) Options change parameters, and a new map is needed to apply them: template, points, cultures and states counts, provinces ratio, size variety, growth rate, burg and religion counts. Individual options have lock icons so they survive the next `New map` SOURCED [A2-S28, A2-S30].
  (3) The heightmap editor has brushes and tools (raise/lower-type brushes, Disrupt, Fill, Line with power and randomness), a cell filter (land only / water only), a template editor that records a script of steps such as `add hill`, and an image converter for tracing a known map SOURCED [A2-S31, A2-S27].
  (4) Entering the heightmap editor forces a choice of mode. Erase regenerates ALL downstream data. Keep preserves data but forbids coastline changes. Risk allows coastline changes and "can potentially cause some errors" SOURCED [A2-S31]. The Quick Start describes the same three modes SOURCED [A2-S28].
  (5) Tools > Regenerate re-runs one step: burgs, cultures, emblems, goods, ice, markers, markets, military, population, production, provinces, relief icons, religions, rivers, routes, states or zones. Tooltips state what survives. For example, states regenerate only if unlocked and burgs stay; rivers are "regenerate all rivers (restore default state)" SOURCED [A2-S60].
  (6) The political layers can be edited by painting. The states, cultures, religions and provinces editors each have `Manually re-assign` (paint cells), plus Add, Merge and Recalculate (re-grow from expansion values) SOURCED [A2-S35]. The burg (town) editor offers rename (culture-specific generator), relocate, toggles for features such as port, walls and citadel, and a lock SOURCED [A2-S35].
- **Constraints, snapping, magnetism, mistakes**:
  - There is no global undo. Undo/redo (Ctrl+Z/Y) works only "in supported editors": the heightmap editor, paint brushes and the Wrap tool. The journey path uses right-click to undo a point. Undo for some editors arrived in release 1.119 (2026-04-27) SOURCED [A2-S29, A2-S31, A2-S32, A2-S35].
  - Elsewhere the safety net is confirmation dialogs. I counted about 50 are-you-sure prompts across roughly 30 editor files. Explicit cannot-be-undone, cannot-be-reverted or irreversible messages appear for bulk route removal, burg and journey segment removal, the Wrap tool, and Submap/Transform. The note-removal prompt says there is no way to undo SOURCED [A2-S35] (my grep of the controllers, fetched 2026-09-27).
  - Locking: the tooltip reads "Click to lock the element and prevent changes to it by regeneration tools" SOURCED [A2-S35]. The lockable items are burgs (since 1.61, 2021-03-06), states, provinces, cultures and religions (since 1.89, released in 1.9 on 2023-08-06), plus markers, routes and journeys SOURCED [A2-S32, A2-S35]. Rivers and labels have no lock INFERRED (no lock toggle in their editors) and SOURCED as a user request: in issue #1361 a user asked to lock hand-made rivers, and the maker replied "rivers in general is the most complex system" SOURCED [A2-S36].
  - Saving: browser autosave defaults to every 15 minutes with a save reminder SOURCED [A2-S35]. The maker warns that browser storage can be purged and that only the downloaded .map file is reliable SOURCED [A2-S28].
- **Presets, templates, stamps, starting points**: Heightmap templates are named landmass types (high island, continents, archipelago and others). There are layer presets (Political, Cultural, Religions, Provinces, Biomes, Heightmap, Physical and others) and style presets (v1.153.0 added Ink, Cinderwood and Frostbite) SOURCED [A2-S28, A2-S32]. The map seed reproduces a map only if the options match; the maker says "The seed cannot store user's changes" SOURCED [A2-S28]. Burg groups (capital, city, town, fort, monastery, caravanserai, trading post, village, hamlet) each carry a default feature set and a preview generator SOURCED [A2-S34].
- **Labelling**: State labels follow the spine of the state; the placement uses 'raycasting' (1.92) SOURCED [A2-S41, A2-S32]. In 2019 an expert reviewer found city labelling rudimentary, with clashes when zoomed SOURCED [A2-S41] (2019-08-21, older version). Labels are added with Add > Label. The labels editor offers random name generation SOURCED [A2-S28, A2-S35].
- **Layers and zoom**: There are about a dozen layer presets, each layer has a hotkey, and layers can be reordered by drag. Zoom goes to 20x by default. Detail appears as you zoom in, which the 2019 reviewer praised SOURCED [A2-S28, A2-S41]. A minimap was added in 1.117 SOURCED [A2-S32].
- **Town maps (link-out to watabou)**: This is CONFIRMED in source (src/generators/burgs-generator.ts, master, 2026-09-27). The burg editor embeds a live preview (an iframe with `&preview=1`) and an `Open burg map in a new tab` link. Capital, city and town groups go to watabou's Medieval Fantasy City Generator; village and hamlet go to the Village Generator; there is also a Dwellings option. The city URL carries: name, population (scaled by urbanization), size (from population and density), seed (map seed + burg id, or a stored per-burg MFCG seed), river flag, coast flag and sea direction (the angle to the harbour cell), farms (arable biome), citadel, urban_castle, hub (road crossroads), plaza, greens, temple, walls, shantytown and style `natural` SOURCED [A2-S34]. The link is one-way: nothing drawn in watabou's generator flows back into FMG, and FMG passes no road bearings, river course or district data INFERRED (only these parameters are sent). Users can instead set a custom burg map URL SOURCED [A2-S35]. The integration dates back to watabou's MFCG devlog 0.5.4, posted about eight years before the fetch, per itch.io's relative date SOURCED [A2-S48].
- **AI assist**:
  - An AI text generator in the Notes editor (`Generate note with AI`). The dialog has an editable default prompt, a streamed result, and an `Apply` button that writes it into the note. Providers are OpenAI, Anthropic (the user supplies their own key) or a local Ollama SOURCED [A2-S59, A2-S47]. It was added in 1.99.06 and shipped in the 1.109 release (2026-01-09) SOURCED [A2-S32].
  - The `Azgaar Assistant` help chat (1.151.2) is shown by default. It greets users with "I cannot change maps, but I can teach you how to do it." SOURCED [A2-S58]. The Omnibar (1.153.0, 2026-09-16) offers `Ask AI` and warns that "a regeneration command changes the map" SOURCED [A2-S33].
- **Onboarding**:
  - The empty state is a finished random map, so there is no blank canvas SOURCED [A2-S28, A2-S40].
  - An `Interactive Tour` button sits on the About tab. It came from PR #1398 (2026-04-30), which describes 22 panels built with driver.js SOURCED [A2-S35, A2-S39].
  - A welcome screen is still an open issue (#1723, 2026-09-03) SOURCED [A2-S39].
  - The wiki Quick Start covers moving around, layers, saving, options, climate and editing SOURCED [A2-S28].
  - The Roll20 GM Hub listing (submitted April 2022) says the tool loads a generated map by default and that the options panel reveals "a dizzying array of options" SOURCED [A2-S40].
- **Praise**:
  - "There's a tremendous amount of control possible." The same reviewer called it fast, responsive and mature, and praised named templates and the template script SOURCED [A2-S41] (2019-08-21).
  - "It's pretty slick." SOURCED [A2-S43] (2022-05-03).
  - A competitor's comparison calls it the most powerful tool on its list SOURCED [A2-S42] (2026-08-05; the author sells a rival generator).
  - A 2018 authors' resource list praised its amount of customization SOURCED [A2-S44].
- **Complaints** (negation searches: "Azgaar fantasy map generator overwhelming learning curve complicated interface"; "Azgaar fantasy map generator lost my map browser storage save complaint"; "\"Azgaar\" \"so many options\" map generator"; "site:reddit.com Azgaar … overwhelming too many options"; GitHub issue searches for undo, lost work, confusing, overwhelming and tutorial):
  - Density: a rival's comparison says the "learning curve is steep and the interface is dense", and getting a satisfying map can take hours SOURCED [A2-S42] (competitor, 2026-08-05; I treat it as weak, since the same page also claims tectonic-plate simulation, a feature I did not find in FMG's docs, INFERRED). The 2019 reviewer said the display elements take a while to learn SOURCED [A2-S41]. A Reedsy snippet mentioning a learning curve was NOT found in the current page (snippet only) [A2-S49].
  - Lost work:
    - One user lost about 5 hours when the app errored and generated a new map on reload (2023-08-02) SOURCED [A2-S37].
    - Another wrote "lost weeks of work" after a load error (2023-08-15) SOURCED [A2-S38].
    - A 2018 list called it "Bit buggy", saying it occasionally crashes some browsers SOURCED [A2-S44].
  - Regeneration clobbering hand work: a Risk-mode heightmap exit regenerated all rivers, including hand-drawn ones, even with no edits made. The maker replied that they rely on the name `Risk` to deter people from using that mode SOURCED [A2-S36] (2026-03-19/21).
  - Overwhelm: the GitHub search for "overwhelming" found one hit, and it was unrelated. Reddit is blocked to both curl and WebFetch [A2-S45, A2-S46].
- **Lesson for our toolkit**: A lock that only some element types support, combined with regeneration steps that silently wipe unlocked hand work (Erase mode; Risk-mode rivers), is what our `hold` must beat. Every declared element needs to be lockable by default, and every re-derive needs a preview that lists what it will overwrite.

#### Campaign Cartographer 3+ with City Designer 3 (ProFantasy): the COUNTER-EXAMPLE
- **Audience · price · platform** (dated): Committed hobbyist and professional RPG cartographers. It is a CAD-engine vector program for Windows 7 or later; installation needs an internet connection, or a web-form code for offline machines (product page, fetched 2026-09-27) SOURCED [A2-S50]. Prices as served on 2026-09-27 in GBP (store currency active: GBP): CC3+ £29.95 and City Designer 3 £27.95. CD3 lists Campaign Cartographer 3+ as a requirement, so a town-map user pays for both, plus optional Annuals and symbol sets SOURCED [A2-S50, A2-S51]. One 2017 forum user lists owning CC3+ plus 8 Annuals, CD3, DD3, FT3, Perspectives 3, Source Maps and a Symbol Set SOURCED [A2-S52]. It is not on Steam SOURCED [A2-S25].
- **Core interactions**:
  (1) The general pattern is command first, then the object, then confirm. One user described selecting the command, then the item, then clicking a `Do It` prompt SOURCED [A2-S52] (2017-09-25).
  (2) Draw vector entities onto sheets and layers; place symbols from catalogs, with templates that have "pre-configured grids to which you can 'snap'" SOURCED [A2-S50, A2-S52].
  (3) CD3 adds House Builder, Street Builder, Street Indexer, an automatic Floorplan Creator, and an `Interactive City Index` (maker's feature list). The maker says you can "Create an entire street of different buildings with just two clicks" SOURCED [A2-S51].
  (4) The Random Street tool places houses along a street, and moving the mouse re-rolls the buildings. ProFantasy's own 2012 tutorial always starts with it, but says it cannot be used everywhere: the author adds houses one by one and deletes misfits afterwards SOURCED [A2-S53] (2012-04-16).
- **Constraints, snapping, magnetism, mistakes**: Precision comes from snaps, modifiers and typed command-line values. A forum veteran cited that ease of precision as a strength SOURCED [A2-S52]. Scaling a placed symbol means typing SCALEXY, selecting, right-clicking and choosing `Do It` SOURCED [A2-S52]. Undo depth and autosave or recovery: not found (queries: grep for undo, autosave and auto-save on the product pages; no dedicated search run, because of budget).
- **Presets, templates, stamps, starting points**: Templates are map-type starters with preset sheets, grids and styles SOURCED [A2-S50]. CD3 claims 2,000 new map tokens in 12 styles SOURCED [A2-S51]. The monthly Annuals each ship a style with a tutorial SOURCED [A2-S52] (the Annual list); the Annual tutorials themselves were not fetched.
- **Labelling**: Text is a vector entity. A reader comment on the 2015 Black Gate review complains that editing a placed label's text is not intuitive SOURCED [A2-S55] (reader comment, relative date about 11 years before the fetch). CD3's Street Indexer and City Index build a labelled, hyperlinked index SOURCED [A2-S51].
- **Layers and zoom**: The core concepts are sheets (which carry effects), layers and drawing order. Veterans name them as the first things to learn SOURCED [A2-S52]. Bitmap symbols switch resolution with zoom, and multiple view windows are possible SOURCED [A2-S50].
- **AI assist**: None. Not found (grep of both product pages for AI returned 0; no dedicated search).
- **Onboarding**: Onboarding is the manual's `Essentials` tutorials, with one Essentials guide per add-on. Veterans insist you work through them rather than read them SOURCED [A2-S52]. In the 2017 thread, the new user had watched videos and re-read the manuals and still could not do simple tasks. They found command-line help only on the forum, not in the manual SOURCED [A2-S52].
- **Praise**: The 2015 reviewer wrote that the learning curve is "only a problem if you insist on skiing uphill!" and got passable results after an hour SOURCED [A2-S55] (2015-03-12, pre-release CC3+). A 2012 reviewer, after the tutorial, wrote "Maybe the learning curve isn't that steep at all" SOURCED [A2-S54] (2012-02-15). A 2017 forum veteran says he got past the curve and has made over 3,000 maps SOURCED [A2-S52]. A 2022 user says they always fall back to Campaign Cartographer SOURCED [A2-S20].
- **Complaints** (the steep-curve reputation, CONFIRMED from independent dated sources, not echoes of one thread):
  - (a) The 2017 thread: "the most counter intuitive user interface I've ever dealt with" (the OP, who had CAD experience). Defenders agree the curve is steep, and one repeats another user's phrase, a learning cliff SOURCED [A2-S52] (2017-09-25).
  - (b) A 2012 reviewer: the UI can be confusing at first SOURCED [A2-S54].
  - (c) A reader comment on the 2015 Black Gate review: the curve is needlessly high, and the program is nothing like other Windows applications SOURCED [A2-S55].
  - (d) 2020: "the learning curve is far above what I want or need" SOURCED [A2-S19] (2020-08-01).
  - (e) 2022: "hard as hell to learn and use"; another user switched to Dungeondraft/Wonderdraft for a much smaller learning curve SOURCED [A2-S20].
  - (f) A 2016 writer: "it crashes every time" SOURCED [A2-S56] (2016-02-04; single user).
  What SPECIFICALLY defeats casual users, from primary posts:
  - Command, then object, then `Do It` ordering. One user explains that most programs work object-then-action, so CC3+ adds a step SOURCED [A2-S52] (2017-09-26).
  - Right-click-to-finish and modes. A 2013 CD3 user trying to make Random Street follow a curved street "right clicked in all combinations" SOURCED [A2-S57] (2013-03-22).
  - Snap state hiding free placement SOURCED [A2-S52].
  - Sheets, layers and sheet effects SOURCED [A2-S52, A2-S54].
  - The manual lacking the task the user needed SOURCED [A2-S52].
  - Price stacking: base plus add-on plus annuals SOURCED [A2-S50, A2-S51, A2-S52].
  Negation searches run: "ProFantasy Campaign Cartographer \"learning curve\" profantasy.com"; "Campaign Cartographer 3+ review worth learning easier than expected"; "site:reddit.com \"Campaign Cartographer\" learning curve worth it". I found no ProFantasy page that itself says "steep learning curve"; the maker's forum veterans say it (not found as a maker statement; the product pages were grepped).
- **Lesson for our toolkit**: CC3+ proves that power without derivation forces the user to learn the engine's grammar (command, then object, then Do It; sheets; snaps). Even its one generator, Random Street, cannot follow a hand-drawn curved street for a confused user. Our street-following derivation must work from the declared road with zero mode knowledge, one gesture, and a visible preview.

#### Cross-cutting (lane-seat check 3): brushes versus parameter panels for casual users
No formal study was found (query: "map making beginners prefer painting brushes vs generator parameters sliders study casual users"). The indirect evidence points both ways:
- (i) Both generator makers advise generate-then-refine, not painting from scratch. Azgaar's wiki says drawing "may takes a lot of time" and recommends generating a base, then using brushes for fine-tuning SOURCED [A2-S27]. Worldographer's manual prefers staged generation with edits in between SOURCED [A2-S4].
- (ii) An expert reviewer argued that users have a high-level idea of the map they want and prefer named templates over low-level noise controls. For matching a known map, he suggested generating something close and then painting it into alignment SOURCED [A2-S41] (2019-08-21; an opinion, not user data).
- (iii) A competitor claims many users generate in Azgaar's and then redraw elsewhere SOURCED [A2-S42] (unsourced claim, interested party).
- Reading: casual users seem to want a named starting shape plus direct manipulation on top, with the parameter panel as a secondary route. This is INFERRED and not measured.

### B. Organic settlement and town builders

#### Townscaper (Oskar Stålberg; publisher Raw Fury)
- **Audience · price · platform** (dated): a goal-free toy for casual builders — its own page says "No goal. No real gameplay." SOURCED [B1-S1]. Steam US$5.99, Windows + macOS; 1.0 on Aug 26 2021 after Early Access from mid-2020 SOURCED [B1-S1][B1-S23] (live API, fetched 2026-09-27). Steam: Overwhelmingly Positive, 20,628 positive / 1,021 negative of 21,649 SOURCED [B1-S2] (fetched 2026-09-27); tags include Relaxing, Sandbox, Short SOURCED [B1-S4]. Also Switch, iOS, Android, Xbox and a web version; Metacritic PC 86, Switch 63 SOURCED [B1-S34] (Wikipedia, secondary; figures as retrieved by Wikipedia 2021-10-25).
- **Core interactions**: (1) pick a colour, left-click a cell of an irregular grid to add a block, right-click to remove SOURCED [B1-S21]; (2) the solver derives houses, arches, stairways, bridges and backyards from the configuration SOURCED [B1-S1]; (3) enclosing a flat area always yields a garden, and rare recipes (perfect loops give flying towns with propellers; lighthouses; a clock tower since v1.2.0, 2023-06-13) are high-priority patterns SOURCED [B1-S24][B1-S22][B1-S5]; (4) placing or removing one block makes the whole connected structure re-evaluate, with decoration filling in after a visible delay SOURCED [B1-S24]; (5) one click per block — left-drag rotates the camera, it does not paint SOURCED [B1-S21]; no drag-to-build at 1.0 or in later reviews SOURCED [B1-S29][B1-S3 rid 108020111, 2022-01-15; rid 106788482, 2021-12-29].
- **Constraints, snapping, magnetism, mistakes**: Ctrl+Z undo and Ctrl+X redo existed from Early Access SOURCED [B1-S21]; holding either repeats fast (2020-10-07) SOURCED [B1-S22]; undo depth not found (queries: news scan "undo", 200 reviews grep "undo|ctrl"). Auto-saves on exit or when the save menu opens SOURCED [B1-S21]; the clipboard save/load confused some Early Access users SOURCED [B1-S3 rid 72598519, 2020-07-13]; one user lost a town, blaming local-only saves SOURCED [B1-S3 rid 98867777, 2021-09-06]. A 2020 grid change broke far-out saves; the maker kept a frozen legacy branch SOURCED [B1-S22]. The maker says the solver is allowed to fail without notice, occasionally leaving unconnected steel supports SOURCED [B1-S24]. Irregular grid makes symmetry hard SOURCED [B1-S3 rid 71878431, 2020-07-02]. No refusal messages or previews: the block simply resolves INFERRED.
- **Presets, templates, stamps, starting points**: no town templates found; the start is choosing a patch of the grid by panning, plus hand-made special sections (square, round, loops) scattered on it SOURCED [B1-S21][B1-S22]. No copy/paste; a player asked for a clone-stamp SOURCED [B1-S3 positive rid 71913994, 2020-07-03]. A community tool, TownShell, edits the clipboard save string to add repeat-clicks, level changes and bulk recolouring SOURCED [B1-S28].
- **Labelling**: not found (queries: store text, 37 official posts, 200 reviews, 4 press reviews); INFERRED none.
- **Layers and zoom**: scroll zoom, WASDQE camera, left-drag rotate, right-drag pan SOURCED [B1-S21]; sun direction/height and high-res screenshots (2020-10) SOURCED [B1-S22]; .obj mesh export at 1.0 SOURCED [B1-S23], with a report of colours lost on export in the Steam build SOURCED [B1-S3 rid 143930054, 2023-08-11]. Layers: not found.
- **AI assist**: none; the derivation engine is a real-time Wave Function Collapse constraint solver SOURCED [B1-S24].
- **Onboarding**: opens on empty ocean with a palette on the left SOURCED [B1-S29]; no tutorial; at Early Access launch the maker said control info was "nowhere to be found" and posted the list himself SOURCED [B1-S21]; 1.0 added a visible, remappable controls screen SOURCED [B1-S23]. Switch: a static instruction screen, no tutorial SOURCED [B1-S30]. Common Sense Media: no instructions, "a rare case in which none are needed" SOURCED [B1-S31]. Hidden recipes are not discoverable for some players SOURCED [B1-S3 rid 140664595, 2023-06-25; rid 152318977, 2023-11-28].
- **Praise**: the most-helpful positive review (780 helpful) says it has no learning curve and calms the mind SOURCED [B1-S3 positive rid 98300935, 2021-08-27]; "The controls are intuitive and easy to pick up" SOURCED [B1-S32]; the limits keep it accessible SOURCED [B1-S31]; tabletop GMs rebuild campaign cities and 3D-print them SOURCED [B1-S3 positive rid 72588158; rid 100061916].
- **Complaints** (searched: 100 most-helpful negative reviews grepped for control/limit/drag/click/undo/save/boring; WebSearch "Townscaper 'too limited' OR 'lack of control' OR 'tedious clicking'"; three Steam threads): (1) one click per block is tiresome, even painful — threads from 2020-06-30 (39 posts) and 2020-07-05 SOURCED [B1-S25][B1-S26][B1-S27], a review citing hand pain SOURCED [B1-S3 rid 98476595, 2021-08-29]; the maker acknowledged it and planned a design (2020-07-15) SOURCED [B1-S21], but the 1.0 notes list no such tool and say no further development is planned SOURCED [B1-S23]; a press reviewer notes the trailer showed line-placement "not possible in gameplay" SOURCED [B1-S29]. (2) The game chooses the building: "a tool to design, not an adversary to overcome" SOURCED [B1-S3 rid 109283677, 2022-02-01]; the "intentionally limited" wording traces to OpenCritic's blurb of ONE Finnish review (KonsoliFIN, 2021-09-21) SOURCED [B1-S33], but the maker states the intent himself: "I want the user to feel like they're in control of the large shapes" SOURCED [B1-S24]. (3) Thin content, bored in 5-30 minutes, abandoned after 1.0 SOURCED [B1-S3 rids 98330299, 118615934, 160608429]. (4) Camera binds cause mis-clicks SOURCED [B1-S3 rid 106788482]. Undo complaints: nothing found.
- **Lane check (item 101 f), verdict**: the claim of one click per block with no drag-to-draw is CONFIRMED on the Steam PC version by the maker's own control list (left-click adds, left-drag rotates the camera) SOURCED [B1-S21], his acknowledgement of hand strain SOURCED [B1-S21], 1.0 notes without such a tool SOURCED [B1-S23], press SOURCED [B1-S29], threads SOURCED [B1-S25][B1-S26][B1-S27] and reviews into 2022 SOURCED [B1-S3]; no later official post adds it (37 posts through 2026-04-13 scanned) INFERRED; Switch/mobile/web input not checked. The claim that player control over details is intentionally limited: the wording is ONE Finnish review's OpenCritic blurb SOURCED [B1-S33], but the intent is CONFIRMED in the maker's own interview words SOURCED [B1-S24] and by two independent reviews SOURCED [B1-S30][B1-S31]. Undo: Ctrl+Z undo, Ctrl+X redo, hold to repeat SOURCED [B1-S21][B1-S22].
- **Lesson for our toolkit**: give the author the large shapes and let rules own the small ones, learnably — but ship a stroke/area declaration from day one, because click-per-cell input was this toy's loudest, never-fixed complaint.

#### Tiny Glade (Pounce Light — Anastasia Opara, Tomasz Stachowiak)
- **Audience · price · platform** (dated): a relaxing freeform building game with no management, combat or goals SOURCED [B1-S6]. Steam US$14.99; Windows, macOS, Linux; released Sep 23 2024 SOURCED [B1-S6]; a free Next Fest demo ran 2024-05-30 to 2024-07-01 SOURCED [B1-S10] (live API, fetched 2026-09-27); macOS (Apple silicon) added 2026-05-13 SOURCED [B1-S48]. Steam: Overwhelmingly Positive, 24,129 positive / 662 negative of 24,791 SOURCED [B1-S7] (fetched 2026-09-27). Critics were cooler: Metacritic 74, OpenCritic 73% SOURCED [B1-S48] (Wikipedia, secondary; as retrieved 2024-10-23).
- **Core interactions**: (1) draw freehand walls, paths, fences and water with the mouse; drag out circle/rectangle building shapes and stretch or raise them — the shapes and snapping helpers were added in 2023 because wall-by-wall building of larger builds was "cumbersome" SOURCED [B1-S37]; (2) the game derives bricks, roofs, windows, doors, supports and ivy — drawing a path through a building makes a door appear SOURCED [B1-S6]; windows touching the ground become doors (a beta branch at launch; patch 1.8.1 the next day added more ways to create doors) SOURCED [B1-S49][B1-S10]; (3) right-click a structure for a focus mode with handles: move and height/falloff for terrain chunks, a rotation arrow for round towers (v1.13, 2025-03-08) SOURCED [B1-S40]; stairs are placed node by node, with a right-click detailed-edit mode (2025-07-29) SOURCED [B1-S41]; (4) auto-spawned clutter (barrels, benches) became movable, rotatable, deletable and clonable in v1.11 (2024-12-16) SOURCED [B1-S39]; (5) since 1.16 (2026-09-23): multi-select groups that can be moved/rotated/elevated and bookmarked, a style-clone tool (bucket icon) that can flood-recolour all windows, a Delete key, and a clutter picker SOURCED [B1-S42] (beta notes from 2026-09-08 [B1-S43]).
- **Constraints, snapping, magnetism, mistakes**: store promise "There are no wrong answers or failure states" — confirmed verbatim on the game's own page (appdetails text, and the store HTML, where the words no wrong answers are set in bold) SOURCED [B1-S6][B1-S9] (fetched 2026-09-27). Undo via Ctrl+Z / Z or an on-screen back arrow, redo X SOURCED [B1-S45] (thread 2024-09-23). The save is an action history (history.json) that the game may "replay" from start on load; it saves after every action; rolling backups roughly 5, 10, 60 and 120 minutes old; loading a backup first backs up the current state; in-game deletions go to a deleted-saves folder SOURCED [B1-S44] (undated maker page, fetched 2026-09-27). Per-operation background autosave replaced save-on-exit in the 2025-07-29 update SOURCED [B1-S41]. Undo depth: not found (queries: news scan "undo", saves page, reviews); a history-based save suggests deep, persistent undo INFERRED. Hard limits exist: a small buildable square, a brick limit raised from 750,000 to 1 million (2024-10-08) SOURCED [B1-S50], and a maximum building length players hit on castle walls SOURCED [B1-S8 rid 184169096, 2024-12-30]. Hacks were replaced by explicit options, e.g. an option to remove merlons instead of overlapping blocks, and the last colour/style is remembered (2024-10-11) SOURCED [B1-S38].
- **Presets, templates, stamps, starting points**: each new glade opens with one of several starter builds, each "a collection of hints of what's possible" (demo 1.3, 2024-06-05) SOURCED [B1-S35]; glades differ by theme and season SOURCED [B1-S46]; Daily Themes give a building prompt (30 prepared at launch) SOURCED [B1-S49]. No structure copy/paste or blueprint found through 1.16 (queries: news scan "copy|paste|duplicat|clone", 1.16 release post) — only clutter cloning and style cloning SOURCED [B1-S39][B1-S42]. Steam Workshop mods for clutter items since 1.16 SOURCED [B1-S42].
- **Labelling**: not found (queries: store text, 115 official posts, 200 reviews); INFERRED none.
- **Layers and zoom**: free camera, rotate, zoom, photo mode, first-person mode (demo 2024-06-10), time of day; fog controls in 1.16 SOURCED [B1-S10][B1-S42]; layers: not found.
- **AI assist**: none; a hand-authored real-time procedural system. The designer contrasts it with generative AI: every rule is hand-crafted SOURCED [B1-S46].
- **Onboarding**: no dedicated tutorial per players SOURCED [B1-S8 rids 175642866, 190713701]; instead, learning by example (the starter build) plus contextual one-time hints — e.g. the first erase or bulldoze shows the undo/redo keys, and the hint completes when you press undo (demo 1.3); the hint auto-hides after 10 s (1.3.1) SOURCED [B1-S35][B1-S36]; a later hint explains detaching stairs (2025-07-31) SOURCED [B1-S51]. A reviewer found the available actions immediately clear at the start SOURCED [B1-S47].
- **Praise**: the co-founder names the self-rearranging walls as the core pleasure — the sense that "the game pays attention to you and cares about what you're doing" SOURCED [B1-S46] (2024-05-30); players praise how the game fills in the details and the freedom to amble along making mistakes SOURCED [B1-S8 positive rids 175623760, 185626396]; a reviewer says it nudged her "to let go of some control" and liked the balance of control and small-scale randomness SOURCED [B1-S47] (2024-09-16, 8/10).
- **Complaints** (searched: 100 most-helpful negative reviews grepped for limit/short/control/copy/paste/size/space/tutorial/undo/performance; press cons; WebSearch as logged): (1) thin content at launch, "just the demo with slightly more space" SOURCED [B1-S8 rid 175633097, 2024-09-23, 172 helpful]; (2) tiny build area, including a refund over it SOURCED [B1-S8 rids 232646139 (2026-08-12, 100 helpful), 198496265, 184430449]; the makers say only that they are "maaaybe" scheming larger glades SOURCED [B1-S42]; (3) no copy/paste or duplicate for structures — top-voted positive reviews ask for it too SOURCED [B1-S8 rids 184169096, 214272417, positive 176508118 (344 helpful), 178844527 (412 helpful)]; the press lists the lack of lock or duplicate mechanics as a con SOURCED [B1-S47]; (4) loss of control over derived details: random decorations, guessing which window position spawns a barrel, hours spent fighting the randomizer SOURCED [B1-S8 rids 182327936, 175633097, 178400294]; (5) building length/width caps SOURCED [B1-S8 rid 184169096; positive rid 177190857]; (6) hidden mechanics and no tutorial, learned from YouTube SOURCED [B1-S8 rids 175642866, 190713701, 209477970]; (7) fiddly cursor targeting to stretch a building SOURCED [B1-S47]; (8) per-item recolouring and no Delete key — both fixed in 1.16 on 2026-09-23 SOURCED [B1-S8 rids 232750933, 217496043][B1-S42]; (9) performance: few mentions in the top 100; the makers admit GPUs turn into "leaf blowers" and added an upscaler (v1.13) SOURCED [B1-S40]. Undo complaints: none found; one reviewer notes clutter could only be removed via undo (2025-06-07) SOURCED [B1-S8 rid 196584182].
- **Lane check (item 101 f), verdict**: the store wording on failure states (quoted under Constraints above) is CONFIRMED verbatim on the game's own Steam page, live on 2026-09-27 SOURCED [B1-S6][B1-S9]. User requests CONFIRMED: copy/paste or duplicate for structures (negative and top-voted positive reviews, 2024-10 to 2026-07) SOURCED [B1-S8 rids 184169096, 214272417, 229996038; positive 176508118, 178844527, 177190857]; longer/larger building pieces SOURCED [B1-S8 rid 184169096; positive rid 177190857]; more space / larger glades SOURCED [B1-S8 rids 232646139, 198496265, 184430449; positive rids 177115303 (273 helpful), 218399439 (169 helpful)]. Status on 2026-09-27: structure copy/paste still absent from the patch notes; grouping, style cloning and a Delete key arrived in 1.16 (2026-09-23); larger glades only hinted SOURCED [B1-S42].
- **Lesson for our toolkit**: save the city as a replayable history of declarations with per-action autosave and restorable backups, and give every derived detail a right-click focus handle (move, rotate, delete, clone, restyle) — the derived layer delights until people cannot touch it.

#### Manor Lords (Slavic Magic — Greg Styczeń; publisher Hooded Horse) — burgage plots and organic roads
- **Audience · price · platform** (dated): not a casual toy — a medieval strategy game with city building, battles and economics SOURCED [B1-S11]; top user tags Strategy, City Builder, Simulation SOURCED [B1-S14]. Steam US$39.99, Windows only, Early Access since Apr 26 2024 SOURCED [B1-S11] (live API, fetched 2026-09-27); latest main-branch update is Major Update #8 (2026-08-27), with beta 0.8.110 posted 2026-09-27 SOURCED [B1-S57][B1-S58]. Steam: Very Positive, 77,407 positive / 14,624 negative of 92,031 SOURCED [B1-S12] (fetched 2026-09-27).
- **Core interactions**: (1) roads: click points, then the hammer to build; right-click undoes the last road point; Ctrl+scroll sets curvature from straight to curvy; Alt+click deletes SOURCED [B1-S66] (2024-05-08); a road drawn across a river becomes a bridge (road tool, 0.8.024, 2025-01-10) SOURCED [B1-S54]; (2) burgage plots: place four points; the edges conform to nearby roads, the frontage gets houses and the rear becomes a backyard for gardens, goats or coops — the maker adapted his organic field tool after studying medieval layouts and drone footage SOURCED [B1-S52] (2022-07-09); (3) after the fourth point and before the build hammer, the subdivision is shown with a +/− control that changes the number of homes (down to one; a one-home plot can gain an extension), a curved arrow rotates the frontage in four directions, and corners can be re-selected SOURCED [B1-S59][B1-S61][B1-S62][B1-S65][B1-S67] (threads 2024-04-28 to 2024-05-05; guides 2024-04-29 and 2024-05-08); (4) the game derives the house models (randomized pre-made buildings), backyard extensions and upgrades by level, and families move in by themselves SOURCED [B1-S52][B1-S15]; (5) fields use the same organic-area mechanic the plots were adapted from SOURCED [B1-S52]; patch notes call these "flexible plots" SOURCED [B1-S54].
- **Constraints, snapping, magnetism, mistakes**: plots snap to road points; a "snap to roads" checkbox for plots did nothing until fixed in 0.8.004 (2024-09-26) SOURCED [B1-S53]; a player reported (2024-05-07) that the snap points misalign and produce off-kilter plots, and asked for an adjustable line between living and backyard areas SOURCED [B1-S63]; nearest-point snapping and grass-distorted snap points were fixed in 0.8.024 and Major Update #5 SOURCED [B1-S54][B1-S55]; a review reports plots suddenly failing to snap to roads or other plots in some territories (2026-01-13, 355 helpful) SOURCED [B1-S13 rid 215880958]. There is no undo: a construction site is cancelled by demolishing it (delivered materials are collected back) SOURCED [B1-S71] (2024-12-06); an accidental click on the living-space expansion button started construction that could not be cancelled, only paused SOURCED [B1-S72] (2024-04-26). Burgage plots cannot be relocated or resized after "build": demolish and rebuild (resources returned, but approval drops and families become homeless) SOURCED [B1-S59][B1-S60][B1-S67]. No announced post-placement plot editing through beta 0.8.110 INFERRED (scan of all 91 official posts [B1-S15] for plot/burgage near edit/resize/adjust/move/reshape found none). Escape did not cancel plot placement until a beta fix on 2026-09-27 SOURCED [B1-S58]. Other safety devices added later: manor modules snap back to their drag start "to reduce accidental changes", a destroy button replaced Alt-click deletion, and save overwrite gained a confirmation (2025-12-19) SOURCED [B1-S55]; a failed overwrite no longer corrupts the old save (2026-08-27) SOURCED [B1-S57].
- **Presets, templates, stamps, starting points**: no layout templates in-game found (queries: news scan "template|preset|blueprint", guides); the start is a road and five families in tents SOURCED [B1-S68].
- **Labelling**: not found for town labels (queries: news scan, reviews, guides); INFERRED no user map labels.
- **Layers and zoom**: overlays (market supply colours on plots update in real time, 2025-01-10) SOURCED [B1-S54]; terrain overlay in road mode (2026-08-27) SOURCED [B1-S57]; TAB shows building floaters SOURCED [B1-S55].
- **AI assist**: none for the player; the rival AI Lord builds its own plots SOURCED [B1-S55].
- **Onboarding**: at launch, tutorial = notes and tooltips; a player called it notes found "while opening every cupboard" SOURCED [B1-S69] (2024-04-27); another found getting no information until clicking "daunting" and was pointed to the official wiki (2024-12-04) SOURCED [B1-S70]. Help buttons including road curvature were added in 0.8.004 SOURCED [B1-S53]; all tutorials were rewritten in Major Update #5 SOURCED [B1-S55]; early tutorials were shortened "to prevent overbearing info" (2026-07-10) SOURCED [B1-S56]; the newest tutorials trigger on first use, e.g. on building a pasture (2026-08-27) SOURCED [B1-S57].
- **Praise**: the plot system called "intuitive, flexible, and a joy to use" in the top positive review (2,670 helpful) SOURCED [B1-S13 positive rid 163639762, 2024-04-26]; gridless building and curved fields/fences praised even in negative reviews SOURCED [B1-S13 rids 163826530, 163779189]; PCGamesN (2024-04-24) praises the sense of place and winding roads but calls it "more like an extended demo" SOURCED [B1-S68].
- **Complaints** (searched: 100 most-helpful negative reviews grepped for burgage/plot/road/snap/control/UI/tutorial/undo; WebSearch for plot resize, right-click, undo, tutorial; 12 Steam threads): the dominant pattern is not the plot tool but slow Early Access progress and thin mid-game content SOURCED [B1-S13 rids 163680331 (1,435 helpful), 198206941, 233805862]. Plot-specific: upgrading plots one by one with no multi-select is tedious SOURCED [B1-S13 rid 163680331]; snapping misfires SOURCED [B1-S63][B1-S13 rid 215880958]; no post-build resize SOURCED [B1-S59]; no cancel for upgrades SOURCED [B1-S72]. Onboarding complaints as above.
- **Lane check (item 101 f), verdict**: the claim "you don't know how many family blocks … when you design the plot area" is REFUTED as stated — the home count is previewed with +/− before commit SOURCED [B1-S61][B1-S62][B1-S65] — with one nuance: it appears only once all four points are placed (a reply in the origin thread; snippet only, thread redirected to the forum index when fetched) SOURCED-snippet [B1-S64]. The second half (cannot easily adjust after placing) is CONFIRMED (demolish only, EA 0.7.96x in May 2024; no change announced through 2026-09-27) SOURCED [B1-S59][B1-S60][B1-S67] + INFERRED (absence). Right-click rollback: CONFIRMED for road points SOURCED [B1-S66]; for plot points snippet only [B1-S64].
- **Lesson for our toolkit**: preview the derived count with +/− before commit (Manor Lords gets this right), but keep the declared shape editable after commit with derived buildings re-flowed — here the only post-build undo is demolition, with real costs.

#### Foundation (Polymorph Games) — painted zones, desire paths, modular monuments
- **Audience · price · platform** (dated): a gridless, laid-back medieval city builder with a Creative mode for unconstrained building SOURCED [B1-S16]; top user tags City Builder, Simulation, Medieval, Strategy SOURCED [B1-S19]. Steam US$34.99, Windows only; Early Access from Feb 1 2019, 1.0 on Jan 31 2025 SOURCED [B1-S16][B1-S83] (live API, fetched 2026-09-27); the makers first planned one year of Early Access SOURCED [B1-S83]. Steam: Very Positive, 21,043 positive / 3,239 negative of 24,282 SOURCED [B1-S17] (fetched 2026-09-27); Metacritic 84 SOURCED [B1-S83] (Wikipedia, secondary; retrieved by Wikipedia 2025-05-15).
- **Core interactions**: (1) paint zones with a brush — residential, woodcutting, hunting, paving, clearing, forbidden; farm, reforestation and patrol zones are painted from their building's menu SOURCED [B1-S78] (wiki, last edited 2026-05-04); (2) houses are never placed: villagers lay house foundations inside a residential zone only if it is large enough — the wiki says the size can only be found "through experimentation" — and within 150 m of their workplace; each house's layout is fixed automatically when its foundation is laid SOURCED [B1-S77] (wiki, last edited 2026-07-08); villagers settle near the village centre, need providers and workplaces (1.9.6, 2023-09-14) SOURCED [B1-S75]; (3) roads are not built: villagers wear desire paths into the grass, and later development follows them SOURCED [B1-S82] (2021-02-11); since 1.0 a paving zone lets the player choose where paved roads go SOURCED [B1-S73]; (4) monuments (church, manor, castle) are assembled from parts; since Update 1 (2025-11-26) whole monuments can be moved, parts swapped with a Part Replacement Tool, gates snap to walls, walls flip SOURCED [B1-S74]; (5) density/quality upgrades happen automatically once conditions (patrols, fortification, beautification) are met SOURCED [B1-S77].
- **Constraints, snapping, magnetism, mistakes**: zones are erased by right-dragging with the brush; the brush resizes with L/P and has circle and square shapes (thread answers, 2025-02-16) SOURCED [B1-S79]; the tutorial did not show erasing, per that thread SOURCED [B1-S79]. Undo/redo exists inside monument and wall editing — extended to whole monuments in Update 1 SOURCED [B1-S74]; undo steps broke when Esc left wall editing, fixed 2025-12-04 SOURCED [B1-S84]. Undo for zone painting: not found (queries: news scan "undo|redo", wiki Zones page). The forbidden zone overrides all others and can strand buildings SOURCED [B1-S78]; a building placed over a tier 1-2 house destroys it SOURCED [B1-S77]; housing from overlapping residential areas could block workstations (fixed 2025-11-26) SOURCED [B1-S74]. A 2021 counter flags "missing paint zone" problems and cycles to them SOURCED [B1-S76].
- **Presets, templates, stamps, starting points**: generated maps with presets, Aspirations (goal sets) and Creative mode SOURCED [B1-S16]; a free new monument (the Modest Church) in Update 1 SOURCED [B1-S74]; mod support re-enabled for 1.0 on 2025-03-13 SOURCED [B1-S20]. User blueprints or copy/paste for monuments: not found (queries: news scan "blueprint|template|preset|copy|duplicate" — "blueprint" means research items).
- **Labelling**: a coat-of-arms (heraldry) editor at 1.0 SOURCED [B1-S73]; map/district labels not found (queries: news scan, wiki pages).
- **Layers and zoom**: toggleable visibility layers — zones, beautification (2023), and trader, patrol coverage and housing-downgrade layers (Update 1) SOURCED [B1-S75][B1-S74][B1-S78]; a reviewer complains that painting housing does not show the beauty/undesirable overlays automatically (2023-11-23) SOURCED [B1-S18 rid 151445584].
- **AI assist**: none for the player; villager agents make the derived decisions (house sites, paths) SOURCED [B1-S77][B1-S82].
- **Onboarding**: quests. Early Access players found the mechanics unintuitive (2019-02-02) SOURCED [B1-S18 rid 48702534] and tooltips in poor English (2020-01-12) SOURCED [B1-S18 rid 61752480]; "advanced onboarding" advice fires on conditions such as reaching 30 villagers (1.9.6) SOURCED [B1-S75]; a monument-editing onboarding event fires when the market is built (demo, 2024-12-18) SOURCED [B1-S85]; 1.0 shipped "updated onboarding quests and visual aids" SOURCED [B1-S73]; the onboarding quests at first could not be completed without a middle mouse button (fixed 2024-12-21) SOURCED [B1-S86].
- **Praise**: desire paths — "Reader, I fell in love with the paths." SOURCED [B1-S82]; a paintbrush for district planning yields an irregular, pre-industrial street pattern (Polygon, 2019-08-08) SOURCED [B1-S81]; players describe it as a gardening or bonsai simulator: set the zone, let it grow, prune what you dislike SOURCED [B1-S18 positive rid 71119802, 2020-06-21]; organic roads and residential growth called "unique and mostly well implemented" even in a negative review SOURCED [B1-S18 rid 200442972, 2025-07-23, 563 helpful].
- **Complaints** (searched: 100 most-helpful negative reviews grepped for zone/paint/residential/control/path/undo/tutorial/UI; WebSearch for zone erase and house-placement control; 2 Steam threads; press): (1) no control over where houses go — they are blocked in, cram together, overlap or waste space SOURCED [B1-S18 rids 58732976 (2019-11-30), 99482344 (2021-09-17), 98679947 (2021-09-02), 129579964 (2022-12-29)]; one thread's advice is "hope for the best", and a player asks for a live count of how many houses a zone will fit (2019) SOURCED [B1-S80]; (2) paths cannot be deleted directly and houses will not spawn on trampled ground SOURCED [B1-S18 rids 129579964, 55003580]; (3) zones become confusing when they overlap (2025-02-03) SOURCED [B1-S18 rid 187097603]; (4) the dominant negative pattern at 1.0 was bugs, crashes and pathing errors SOURCED [B1-S18 rid 186859407, 2025-01-31, 612 helpful]; (5) "annoying user interface quirks", many mini-windows (Polygon) SOURCED [B1-S81].
- **Lesson for our toolkit**: a painted area that derives its contents must show the derived result while painting (house count and footprints, blocked cells) and let the author pin or remove any single derived item. Foundation's desire paths delight, but its paint-and-hope housing is its most-repeated control complaint.

#### Cross-tool patterns (B1)
- **Delight comes from derivation that answers a gesture**: blocks become arches and gardens [B1-S1][B1-S24]; a path through a wall becomes a door [B1-S6]; footsteps become roads [B1-S82]; plot edges hug the road [B1-S52]. SOURCED.
- **Loss of control clusters where derivation decides placement or count at a scale the author cares about**: Foundation's house sites [B1-S18][B1-S80], Tiny Glade's clutter [B1-S8], Townscaper's building type [B1-S3]. Small-scale variation is accepted, even liked [B1-S24][B1-S47]. SOURCED; the scale split is INFERRED.
- **Devices found**: a +/− count preview before commit (Manor Lords only) [B1-S61][B1-S65]; right-click handles on derived items after commit (Tiny Glade focus mode, movable clutter, groups; Foundation part replacement and whole-monument move) [B1-S39][B1-S40][B1-S42][B1-S74]. Undo: Townscaper full [B1-S21]; Tiny Glade full, with a replayable history save [B1-S44]; Foundation only inside monument/wall editing [B1-S74]; Manor Lords none, you demolish instead [B1-S71]. Lock: none of the four has one; a reviewer asks for it in Tiny Glade [B1-S47]. Reroll of derived detail: none found. Tiny Glade chose stability instead: editing a stair segment no longer reshuffles its derived effect (beta, 2025-07-23) [B1-S10]. Manor Lords players dislike having to reroll whole maps to get the conditions they want [B1-S13 rids 225533708, 224794127]. SOURCED.
- **Stroke/area input beats per-cell input**: click-per-block was Townscaper's loudest complaint [B1-S25][B1-S26]; Tiny Glade added shapes and snapping because wall-by-wall was too slow [B1-S37]; Foundation's brush has size and shape [B1-S79]; Manor Lords uses four-point areas [B1-S52]. SOURCED.
- **Onboarding without instructions** works when there is one verb (Townscaper) [B1-S31] or a worked example in the empty state (Tiny Glade starter builds) [B1-S35]. The two system-heavy games moved from notes and tooltips to tutorials triggered on first use [B1-S55][B1-S57][B1-S75]. The cleanest device found: a one-time undo hint that completes when you press undo [B1-S35]. SOURCED; "cleanest" is INFERRED.

#### Gaps and unfinished (B1)
- Reddit not attempted: the session-wide WebSearch budget ran out (200/200) at about 19:13, before a Reddit query. Steam discussions (19 threads) serve as the community angle.
- The origin thread of the Manor Lords plot claim (4355620138223349675) redirects to the forum index. Its right-click-rollback reply is known only from a search snippet [B1-S64].
- The official Manor Lords wiki (wiki.hoodedhorse.com) was blocked (HTTP 403, or an empty shell). Pages that returned no text: TechRaptor (Townscaper), GINX (Foundation), pouncelight.games/tiny-glade/ (a JavaScript shell) and one Steam guide (rate-limited).
- Townscaper input on Switch, mobile and web was not checked. Undo depth for all four: not found.
- YouTube tutorial descriptions (angle e) were not reached.

#### Cities: Skylines (2015)
- **Audience · price · platform** (dated): Colossal Order / Paradox; USD 29.99, Windows/Mac/Linux, released 2015-03-10 (Steam appdetails, undated page, fetched 2026-09-27) SOURCED [B2-S1]. Steam: "Very Positive", 270,697 positive / 29,319 negative, all languages (fetched 2026-09-27) SOURCED [B2-S2]. User tags lead with City Builder, Simulation, Building, and include Moddable, Casual, Family Friendly SOURCED [B2-S14].
- **Core interactions**: (1) roads drawn with four modes: Straight (click start/end), Curved (tangent point), Freeform, and Upgrade (repaint an existing road into another type; right-click reverses one-ways); Page Up/Down steps elevation SOURCED [B2-S5]. (2) Every road automatically spawns zone cells up to four deep on each side; the player never draws parcels SOURCED [B2-S4]. (3) Zoning is painted onto those cells with Fill (whole contiguous block), Marquee (rectangle), or Brush (small/large); right-click de-zones SOURCED [B2-S4][B2-S6]. (4) The game then grows buildings by itself where there is demand; the player places only services and landmarks SOURCED [B2-S7]. Launch reviewers found curved/freeform road laying took only a few intuitive clicks SOURCED [B2-S6].
- **Constraints, snapping, magnetism, mistakes**: roads auto-snap to other roads, angles, the zoning grid and guidelines; a menu toggles each snap SOURCED [B2-S5]; turning snapping off gives freehand freedom SOURCED [B2-S7]. No undo in the game at launch or since: a 2015-03-30 Steam thread confirms there is no undo, and a reply says the only Ctrl+Z is in the map editor SOURCED [B2-S8]; no "undo" appears in any Steam announcement 2018-03 to 2026-04 SOURCED [B2-S15]. Players compensate by saving constantly ("hit F1 for quick save" [B2-S8]; a 2019 new player saves "before EVERY SINGLE CLICK" [B2-S9]). The most-helpful negative on this theme (2018-01-26, 209 helpful) describes bulldozing a curved highway segment by segment and names missing undo as the main flaw SOURCED [B2-S16]. Mods supply undo: Move It's Ctrl+Z [B2-S9] and "Undo It!" (1.41M lifetime subscribers; undo/redo for building and bulldozing roads, buildings, props, trees) SOURCED [B2-S10].
- **Presets, templates, stamps, starting points**: in the base game, a single highway entry and prebuilt maps; scenarios (e.g. a Ferry scenario) served one 2019 new player as a gentle start SOURCED [B2-S9]. Mods add stamps: Roundabout Builder (2.09M), Parallel Road Tool (1.79M) SOURCED [B2-S10]. Vanilla road-type presets (many road classes, upgradeable) SOURCED [B2-S5].
- **Labelling**: districts are PAINTED with a brush (three sizes; right-click or an erase brush removes) that auto-snaps to roads and intersections; each new district gets an automatic name, renamed by clicking the name and typing; policies and specializations attach per district SOURCED [B2-S80] (wiki edited 2025-06-17). Players valued naming and per-area policies (2015-03-13, 633 helpful) SOURCED [B2-S3, rec 14860085]. Other label placement: not found (no dedicated query).
- **Layers and zoom**: info-view overlays (e.g. a traffic overlay showing congestion) SOURCED [B2-S7]; zoom from street level to the whole map INFERRED.
- **AI assist**: none (INFERRED; the game has advisors/"Chirper" hints, not an assistant) — a player notes you can ignore "city advisors" SOURCED [B2-S17].
- **Onboarding**: no introductory tutorial; help cards explain each concept the first time you open it SOURCED [B2-S18] ("little hints that pop up", 2020-06-16 [B2-S13]). Negation: a 2024-11-28 negative review calls the tutorial useless SOURCED [B2-S3, rec 180290021]; a new player says the web explains more than the game SOURCED [B2-S9].
- **Praise**: "Laying roads, zoning and providing essential services is a breeze" [B2-S6] (2015-03-10); road-tool flexibility makes layout "intuitive" [B2-S7]; a 2015 player loves "the way you can paint zones with different brushes" and road guidelines SOURCED [B2-S19].
- **Complaints** (negation searches: Steam negative corpus grep for undo/snap/brush/road tool/bulldoz/tutorial; WebSearch "no undo"/"undo button"; zone-brush-size thread): no undo (above); too few snapping options for cloverleafs (2015-03-10, 2,815 helpful, a POSITIVE review) SOURCED [B2-S3, rec 14822799]; road tool "seems to hate perfect lines", missing 90 degrees by a few degrees (2018-02-07, positive review) SOURCED [B2-S20]; bulldozer clumsy, no drag box SOURCED [B2-S16]; zone brush too small, no mod to enlarge it (2021-12-28; reply: two sizes, use marquee) SOURCED [B2-S11]; tree placing should be a brush (a mod fixes it) SOURCED [B2-S3, rec 14893248]. Mod ecosystem as evidence of missing controls (Steam Workshop lifetime subscribers, fetched 2026-09-27): Move It 4.70M (select/move/align anything), Precision Engineering 4.32M (angle/length readouts, 5-degree snapping), Extra Landscaping Tools 3.76M, Prop & Tree Anarchy 2.39M, Network Anarchy 2.01M (break placement rules), Node Controller 2.09M, Undo It! 1.41M, Forest Brush 1.14M SOURCED [B2-S10]. The maker itself added per-side road zoning ("Toggle Zoning": both sides, left, right, none) only in 2023-05, eight years in SOURCED [B2-S12].
- **Lesson for our toolkit**: Draw-a-road-and-the-parcels-appear is loved, but without undo, precision readouts and a move tool players save before every click; ship undo, move and measured snapping in the base toolkit.

#### Cities: Skylines II (2023)
- **Audience · price · platform** (dated): Colossal Order with Iceflake Studios (developer list as of fetch) / Paradox; USD 49.99, Windows only, released 2023-10-24 (Steam appdetails, fetched 2026-09-27) SOURCED [B2-S21]. Steam: "Mixed", 51,965 positive / 42,186 negative, all languages (fetched 2026-09-27) SOURCED [B2-S22]. PC Gamer scored it 77 on 2023-10-19 SOURCED [B2-S36]. User tags lead with City Builder, Simulation, Building, Sandbox and include Relaxing and Casual SOURCED [B2-S43].
- **Core interactions**: (1) road modes carried over from CS1 (straight, curves, continuous), plus a new Grid mode that lays a whole block of roads in three clicks (corner, width, length), a Replace tool (successor to Upgrade that also adds trees, grass, wide sidewalks or sound barriers), and a Parallel mode that draws two roads at a fixed, adjustable distance SOURCED [B2-S24] (same list on the maker's feature page [B2-S24b]). (2) Road guides show the slope as a number while you draw SOURCED [B2-S24]. (3) Zone cells still appear automatically along roads; zoning uses Fill (all contiguous cells), Marquee (any rectangle) and Paint (one cell at a time); right-click with any zoning tool de-zones, and changing type no longer needs a de-zone first SOURCED [B2-S25][B2-S27]. (4) Specialized industry is drawn as a free outline that snaps to roads SOURCED [B2-S36]. (5) Since 2026-03, a per-road zoning toggle (either side, both, or none) SOURCED [B2-S29].
- **Constraints, snapping, magnetism, mistakes**: six tool modes (Straight, Simple Curve, Complex Curve, Continuous, Grid, Replace) and six snap options plus an all-snapping toggle; by default roads snap to zone-cell length, 90 degrees, building sides, zone grid, guidelines and existing geometry SOURCED [B2-S44] (wiki marked "last verified for version 1.0"; WebFetch summary). Mistakes: "Each step of road-building can be easily canceled by pressing the right mouse button"; built roads must be bulldozed SOURCED [B2-S24] (2023-06-19); this cancels a step in progress, not an undo INFERRED. No native undo: a launch-day thread (2023-10-24) confirms Ctrl+Z "literally doesn't exist" SOURCED [B2-S31]; threads from 2024-10-26 [B2-S32] and 2025-01-07 [B2-S33] still ask; no "undo" in any of 185 announcements 2023-06-11 to 2026-09-15 SOURCED [B2-S30]. A community mod "City Rewind: Global Ctrl+Z Undo [BETA]" exists (page title confirmed; scope from snippet only) [B2-S34]. Reload-the-last-save is the advice given SOURCED [B2-S32].
- **Presets, templates, stamps, starting points**: Grid mode is itself a block stamp SOURCED [B2-S24]; roundabouts in 4 sizes and large intersections dropped onto existing roads; intersections form automatically where roads cross SOURCED [B2-S24] (the diary calls roundabouts a "wished-for" feature; CS1 players had a Roundabout Builder mod, 2.09M lifetime [B2-S10]); since 2024-12 a Line Tool places trees/props along a straight or curved line with spacing SOURCED [B2-S29].
- **Labelling**: districts are no longer painted: the District Tool places corner nodes and closing the outline creates the district; nodes can be moved or added afterwards; districts are auto-named and renamable SOURCED [B2-S81] (wiki edited 2023-11-04). A search summary claims players found the polygon district tool harder than CS1's brush — snippet only, not verified in the threads I opened [B2-S82]. Other label placement: not found.
- **Layers and zoom**: Underground view toggle (mentioned in the launch-day thread) SOURCED [B2-S31]; info views INFERRED.
- **AI assist**: none (INFERRED).
- **Onboarding**: optional tutorials, enabled at game start: camera controls first, then a short, unskippable task list (build basic utilities, first roads, first zoning), then per-panel cards shown when a service or panel is first opened; an Advisor panel (top-right) holds all topics and can restart them SOURCED [B2-S35] (2023-10-22).
- **Praise**: road tools are the most consistent praise even in negative reviews: the new tools "allow for the same level of road building as modded CS1" with less effort (2024-02-08, 740 helpful, negative) SOURCED [B2-S38]; PC Gamer: drawing and snapping roads is smooth and easy, and so is upgrading them later SOURCED [B2-S36]; a launch review likened vanilla CS2 to CS1 with the NEXT, Precision Engineering and Anarchy mods built in SOURCED [B2-S23, rec 148922551].
- **Complaints** (negation searches: negative-corpus grep for zoning/snap/grid/undo/brush; WebSearch for zoning-brush, undo, grid-gap threads; thread fetches): (a) the derived zone grid breaks: cells leave gaps along straight roads, and a clean grid takes hours of delete-and-redraw (2024-11-04) SOURCED [B2-S23, rec 178410400]; building a road strips an adjacent road's zones (2024-04-21, 692 helpful) SOURCED [B2-S23, rec 163338669]; the fix players share is a specific on/off combination of six snap options (2023-11-05) SOURCED [B2-S37]; (b) the rigid zoning grid limits curved roads, irregular parcels and European-style streets, and mods show the demand for deeper control (2026-09-09, 923 helpful) SOURCED [B2-S39]; (c) snapping: roads land at 89/91 degrees (2023-10-25) SOURCED [B2-S41]; (d) no undo (above; also wished for in a positive review, 2023-10-29 [B2-S23, rec 149163123]); (e) no control over which streets get zoning at launch (2023-10-27, 351 helpful) SOURCED [B2-S23, rec 148959226]; the maker added a per-road toggle 2026-03, crediting River-mochi's "Zone Tools" and "Easy Zoning" mods and later calling it one of the most requested features SOURCED [B2-S29]; (f) a recurring city-painter label in negative reviews: the tools outshine the simulation (e.g. 2024-02-08, 2026-05-02) SOURCED [B2-S38][B2-S23, rec 224575763]. (g) the zoning brush (lane check for item 101 f): CS1 had small and large zoning brushes [B2-S4]; CS2 shipped, as announced on 2023-07-10, with Fill, Marquee and a one-cell Paint mode [B2-S25], and the wiki still lists only those three (edited 2026-02-10) [B2-S27] SOURCED. So the sized brush is ABSENT, not hidden; one-cell painting exists. Requests to restore it are real but thin in what I found: a 2026-01-16 thread with three replies, whose author says they "can't find anyone else talking about this" [B2-S28], and a 2026-08-22 negative review (220 helpful) asking why it was removed [B2-S40] SOURCED. No announcement mentions a zoning brush; the brush hits in 185 announcements concern terraforming, terrain textures and trees SOURCED [B2-S30]. The 2023 launch-period threads I read complain about fractured grids and snapping, not the missing brush SOURCED [B2-S37][B2-S31]. (h) at launch there was no Move It equivalent: buildings had a Relocate button, but players missed moving any road node freely (2023-10-27 thread; one reply: "Should have been a no-brainer to include that on day one") SOURCED [B2-S83]; irregular lots (flatiron-style corners) cannot be zoned, and the suggested workaround is a surface tool plus mods (2024-07-24) SOURCED [B2-S84]. Mod-count evidence for CS2 not found: Paradox Mods is script-rendered, curl gets HTTP 406 and WebFetch returned no list (queries logged).
- **Lesson for our toolkit**: A derived grid that silently fractures when a nearby stroke changes is the top complaint; every road or quarter stroke should preview which derived parcels it will create or destroy before it commits.

#### Anno 1800 (Ubisoft Mainz, 2019)
- **Audience · price · platform** (dated): Ubisoft Mainz / Ubisoft; list USD 59.99, on sale at USD 14.99 (75% off) on the fetch date; Windows only; released 2019-04-16 (Steam appdetails, fetched 2026-09-27) SOURCED [B2-S45]. Steam: "Very Positive" all languages (26,419 / 6,056), "Mostly Positive" in English (10,096 / 2,778) SOURCED [B2-S46]. PC Gamer scored it 84 on 2019-04-15 SOURCED [B2-S54]. User tags lead with City Builder, Strategy, Simulation, Economy SOURCED [B2-S59]. Many of the most-helpful negative reviews are about the Ubisoft launcher, not the game SOURCED [B2-S47].
- **Core interactions**: (1) roads are drawn from point A to point B with a few clicks on a square grid; in open ground the path has only two options, vertical-then-horizontal or horizontal-then-vertical, and a building counts as connected only when a road tile touches one of its edges SOURCED [B2-S53] (maker's 2025-03-28 blog, describing Anno 1800 in retrospect). (2) Buildings are placed one by one on the grid ("Anno-Tetris", the maker's own term) SOURCED [B2-S53]. (3) Blueprint mode (a toggle, shown 2018-10-05, before launch) places free, non-working silhouettes so you can "plan street layouts, districts or even whole cities in advance"; an upgrade tool then builds every blueprint in one click or by drag; when you lack materials a silhouette is placed automatically (can be switched off) SOURCED [B2-S48]. (4) Copy tool and Stamps: since Game Update 17 (2023-03-31) a selection of buildings, streets and ornaments can be saved as a named Stamp, reused across savegames and shared as a file SOURCED [B2-S52]. (5) Area buffs: Trade Union / Town Hall items affect buildings within a radius (standard Trade Union range 15) — snippet only (fandom page not fetched, HTTP 402) [B2-S60].
- **Constraints, snapping, magnetism, mistakes**: grid-locked placement; buildings snap to nearby roads automatically — the maker states Anno 117 keeps this simple Anno 1800 behaviour SOURCED [B2-S53]. Undo: none documented; no "undo" in 66 Steam announcements (2018-09 to 2026-05) SOURCED [B2-S61]; a Steam forum search for undo returned 5 threads, none asking for undo SOURCED [B2-S55]; none of the 300 most-helpful reviews asks for undo (the single hit is figurative, about early mistakes) SOURCED [B2-S47]. Instead, correction tools arrived late: a Multi-Move Tool (drag a rectangle to move many objects) in Game Update 16 (announced 2022-12-01, released 2022-12-08) SOURCED [B2-S50], hailed by a fan site as arriving "FINALLY" (2022-12-07) SOURCED [B2-S51]. Pre-launch, some players objected that movable buildings "don't make sense" while wanting blueprints (2018-08 comments) SOURCED [B2-S49].
- **Presets, templates, stamps, starting points**: Stamps (above) [B2-S52]; Creative Mode (2023-03): unlimited money, no influence limit, no incidents, buildings need no street and cost nothing SOURCED [B2-S52]; campaign, sandbox and multiplayer at launch SOURCED [B2-S54]; scenarios later (e.g. "Seasons of Silver", named in 2023 patch notes) SOURCED [B2-S52]. Blueprint hotkey V and copy hotkey C, plus 10x10 modular layouts as a community tip — snippet only [B2-S60].
- **Labelling**: islands can be renamed (a player renamed the starting island after the campaign) SOURCED [B2-S62]; nothing further found (no dedicated query).
- **Layers and zoom**: not found (no dedicated query; out of the time box).
- **AI assist**: none (INFERRED).
- **Onboarding**: the campaign is a sandbox with a chain of missions SOURCED [B2-S54]; feature-specific tutorial quests exist (e.g. "Tutorial: Post Office", "Tutorial: Helium", named in 2023 patch notes) SOURCED [B2-S52]. Negation: a 2024-01-24 review (112 helpful) says the tutorial is lacking: one encyclopedia entry plus early supply chains in the campaign SOURCED [B2-S56]; another tells newcomers to watch a YouTube guide because "the tutorial system won't be great" (2024-12-06) SOURCED [B2-S63]; a 2025-06-02 negative review (444 helpful) says the game overwhelms with mechanics and notifications SOURCED [B2-S58].
- **Praise**: tools to edit and copy blocks of buildings cut the effort of expanding districts (2024-01-24) SOURCED [B2-S56]; pre-launch commenters welcomed blueprints as the fix for mis-sized plans that forced them to demolish rows of houses (2018-08) SOURCED [B2-S49]; mechanics are eased in through story context (2023-04-18) SOURCED [B2-S47, rec 136893226].
- **Complaints** (negation searches: negative-corpus grep for blueprint/undo/road/grid/tutorial/UI/micromanage; WebSearch undo+refund (two runs, no Anno-specific result; a third failed on the reddit.com domain filter); Steam forum undo search): blueprints designed on one island do not fit other island shapes (2023-09-27, 175 helpful) SOURCED [B2-S57]; "the grid layout hurts my brain" (2025-10-20) SOURCED [B2-S47, rec 207158817]; the UI is called a nightmare (2025-03-13) SOURCED [B2-S47, rec 190117685]; a steep, even unreasonable, learning curve (2022-12-09, 2024-01-09) SOURCED [B2-S47, recs 128229535, 155594460]. Tool-specific complaints are rare in the corpus; launcher complaints dominate (INFERRED from the grep counts).
- **Lesson for our toolkit**: Separate "plan" from "commit": a free, clearly marked blueprint layer that can be built in one sweep makes a missing undo hurt less; add move early (Anno waited 3.5 years for multi-move).

#### Kingdoms Reborn (Earthshine, Early Access since 2020)
- **Audience · price · platform** (dated): Earthshine (described as a one-person studio by a press piece — snippet only); USD 19.99, Windows only; Early Access since 2020-11-02/03 and still tagged Early Access (Steam appdetails, fetched 2026-09-27) SOURCED [B2-S64]. Steam: "Very Positive", 8,801 positive / 938 negative, all languages SOURCED [B2-S65]. Updates titled "Major Update": one in 2021, two in 2022, three in 2023, three in 2024, none in 2025, then 2026-02-17 (decorations, apocalyptic map) SOURCED [B2-S66]. Player counts differ: the maker's site says multiplayer for up to 8, the store says co-op for up to 18 SOURCED [B2-S67][B2-S64].
- **Core interactions**: (1) pick a culture, set map parameters and AI count; the game generates a large procedural world map with seven biomes SOURCED [B2-S67][B2-S70]. (2) Territory grows province by province (claim with money; food-claiming removed 2021-02-21) SOURCED [B2-S66]. (3) Buildings are placed one by one on a block grid with 90-degree rotation only SOURCED [B2-S76]. Most production buildings come from random card draws, while houses, farms, bridges, dirt roads and storage can be placed at any time SOURCED [B2-S69]. (4) Roads are drawn with a hotkey (Z); stone road drawn over dirt upgrades it in place, and labourers build roads SOURCED [B2-S71][B2-S72]. Players report that buildings work without a road link, since citizens walk any open path SOURCED [B2-S73]. (5) Citizens are simulated individually, "similar to Banished" (maker's words) SOURCED [B2-S67].
- **Constraints, snapping, magnetism, mistakes**: demolish is a separate tool (X) or a build-menu option; a player who misplaced a farm plot asked how to cancel it (2023-08-05) SOURCED [B2-S72]. Undo: not found (queries: WebSearch "Kingdoms Reborn roads placement demolish undo tutorial steam discussions"; grep of 300 reviews and 33 announcements for undo: 0 hits) [B2-S66][B2-S68]. Placement "only allows you to rotate 90 degrees" (2022-08-01) SOURCED [B2-S76]; "lack of flexibility with placement" is a reason to not recommend (2025-12-09) SOURCED [B2-S74]. Early Access instability: saves "may break" with patches (the store's own EA note) SOURCED [B2-S64].
- **Presets, templates, stamps, starting points**: the random world map is the starting point; Copy Building (Ctrl+C) was added 2023-05-19 to copy and paste already-built buildings without a card SOURCED [B2-S66]; a reviewer showed that copy lets you "circumvent the entire cards system" (2023-05-30) SOURCED [B2-S70]; on 2024-11-27 the maker made the copy button require a Wild Card SOURCED [B2-S66]. A 200+ piece decoration kit arrived 2026-02 SOURCED [B2-S66].
- **Labelling**: not found (no dedicated query).
- **Layers and zoom**: province overlay hotkey Ctrl-P (2021-01-30) SOURCED [B2-S66]; players praise the overlays (2023-08-15) SOURCED [B2-S75].
- **AI assist**: none for building; AI rival kingdoms only SOURCED [B2-S66].
- **Onboarding**: in-game tutorial with videos (e.g. "Claiming Territory", fixed 2021-01-07) and a tutorial book redesigned 2024-05-16 SOURCED [B2-S66]; hotkeys were shown only on hover, with no list in game (2021-05-04 thread) SOURCED [B2-S71]; key bindings became customizable in settings on 2024-05-16 SOURCED [B2-S66]. Negation: one long-time player says tutorials keep popping up after being turned off, and that the 2024 UI update "dumbs the game down" by telling you what to build (review edited May 2024) SOURCED [B2-S77].
- **Praise**: easy to learn, comprehensive interface, useful overlays, card system "surprisingly not annoying" (2023-08-15, 226 helpful) SOURCED [B2-S75]; the procedural maps and terrain make each start different (several positive reviews; e.g. 2023-07-04, 2020-12-25) SOURCED [B2-S68].
- **Complaints** (negation searches: negative-corpus grep for road/tutorial/UI/control/card/placement/abandon; WebSearch reviews and threads): the card layer reads as a random, slow build menu: "It's a terrible menu!" (preview, 2020-11-13) SOURCED [B2-S78]; it becomes irrelevant within about 1.5 hours once copy and wild cards arrive, and can cause a wood death spiral (2024-03-25) SOURCED [B2-S79]; citizens handle roads badly, e.g. builders erect buildings before clearing trees on the ordered road (2023-05-20) SOURCED [B2-S68, rec 138605646]; stiff placement (above); abandonment worry: "seems abandoned" (2025-11-29), though an update followed on 2026-02-17 SOURCED [B2-S68, rec 211759398][B2-S66].
- **Lesson for our toolkit**: Gating what a user may build behind chance (cards) reads as a broken menu, and players route around it; a casual author needs every declared element on demand, with difficulty expressed as rules and reasons, not as luck.

#### Lane checks (B2) — answers to the lane seat's targeted questions
1. **CS2 zoning brush (item 101 f).** SOURCED: true, with a correction. CS2 did ship without CS1's sized zoning brush: CS1 had Fill, Marquee and Brush in small and large sizes [B2-S4][B2-S6]; CS2 was announced (2023-07-10) and shipped with Fill, Marquee and a one-cell Paint mode [B2-S25], still the only three modes on the wiki edited 2026-02-10 [B2-S27]. No announcement through 2026-09-15 adds a sized zoning brush [B2-S30]. It is a real absence, not a discoverability gap: one-cell painting exists and is findable, the multi-cell brush does not. "Players asked for it back" is TRUE but THIN: I found one Steam thread (2026-01-16, 3 replies; its author could not find anyone else raising it) [B2-S28] and one negative review (2026-08-22, 220 helpful) [B2-S40]. Launch-period (2023-10/11) zoning complaints I read were about fractured grids, snapping and zones lost when roads change [B2-S37][B2-S23], not the brush. Per-road zoning, which the maker called one of the community's most requested features, was restored in 2026-03 with credit to community mods [B2-S29]; that it was the louder demand is INFERRED. Suggested rewording for 101 f: "CS2 dropped CS1's sized zoning brush (one-cell paint remains); a few players asked for it back; the bigger outcry was derived zone grids breaking."
2. **Brush gestures vs parameter panels.** No source asks for panels instead of gestures; the evidence favours gestures WITH numbers and toggles attached. SOURCED items: CS1 players praised the zoning brushes [B2-S19][B2-S6] and asked for bigger brushes and a tree brush [B2-S11][B2-S3]; the most-subscribed CS1 tool mods add numbers to drawing without replacing it (Precision Engineering: angle and length readouts, 5-degree snapping, 4.32M lifetime subscribers) [B2-S10]; CS2 moved this into the base game (slope readout, Parallel mode at a set distance, 3-click Grid) and reviewers praise it most [B2-S24][B2-S36][B2-S38]; CS2 per-road zoning is a setting on a road, applied with the road tools [B2-S29]; in Kingdoms Reborn a menu-like card gate is disliked and bypassed with a copy gesture [B2-S78][B2-S70][B2-S79]. Counter-signal: CS2 replaced CS1's painted districts (brush, three sizes) with node-drawn outlines [B2-S80][B2-S81]; whether players minded is only a search-snippet claim, unverified [B2-S82]. INFERRED reading: users want to draw the shape and have exact values shown as they draw (and settable), not a form to fill in first.
3. **Undo, game by game.** CS1: none in the base game except the map editor's Ctrl+Z (2015) [B2-S8]; recurring requests 2015-2023 [B2-S8][B2-S9][B2-S16]; supplied by mods (Undo It! 1.41M lifetime; Move It's Ctrl+Z) [B2-S10][B2-S9]. CS2: none through 2026-09; asked on launch day [B2-S31] and again in 2024 and 2025 [B2-S32][B2-S33]; a beta community mod exists [B2-S34]; the maker's substitute is right-click cancel of the step being drawn [B2-S24]. Anno 1800: none found, and no demand found (no undo request among 300 most-helpful reviews; forum search found none) [B2-S47][B2-S55]; blueprint mode (plan for free, build later) and move/multi-move tools cover correction [B2-S48][B2-S50]. Kingdoms Reborn: none found, no demand found; fixing a misplaced plot means demolishing it [B2-S72]. INFERRED: demand for undo is highest where a gesture commits money or destroys derived state at once (the Cities games), and lowest where planning is free (Anno blueprints).

#### Cross-tool patterns (B2)
- The derived layer is the product and the pain: players love that roads create zone cells and that buildings grow by themselves [B2-S6][B2-S7], and they complain most when that derived layer changes without warning (zones lost, grids fractured) [B2-S23][B2-S37][B2-S39]. INFERRED, from those sources.
- Mods show where control was missing, and makers absorb them years later: CS1 per-road zoning (2023) [B2-S12]; CS2 roundabouts, parallel roads and precision readouts built in (2023), echoing CS1 mods [B2-S24][B2-S10][B2-S23]; CS2 per-road zoning credited to named mods (2026) [B2-S29]; Anno multi-move after 3.5 years [B2-S50][B2-S51]. SOURCED dates; the causal reading is INFERRED except where the maker credits the mod [B2-S29].
- Planning surfaces reduce the need for undo: Anno blueprints and stamps [B2-S48][B2-S52]; CS2 still commits each road on click [B2-S24]. INFERRED.

### C. AI-assisted creation for non-technical users

#### C1 Dungeon Alchemist (Briganti BV, Belgium)
- **Audience · price · platform** (dated): tabletop GMs making battle maps; Steam app 1588530 SOURCED [C-S1], in Early Access since 2022-03-31, US$44.99, Windows/macOS/Linux (appdetails, undated page, fetched 2026-09-27) SOURCED [C-S2]; the maker says it will leave Early Access "late 2026" and price will not change after EA (store page, fetched 2026-09-27) SOURCED [C-S6]. Steam user tags begin Early Access, RPG, CRPG, Software, Tabletop, Procedural Generation SOURCED [C-S6].
- **Core interactions**: pick a map theme, then draw a room rectangle; the tool fills walls, floors, doors, lighting, furniture and objects "on the fly" SOURCED [C-S7]; each room has its own theme/function that can be changed after drawing SOURCED [C-S2][C-S7]; a randomize button re-runs the procedural algorithms for new rooms SOURCED [C-S2]; the refresh button gained *AI settings* so a user can refresh only the objects (2023-01-31 patch) SOURCED [C-S9]; everything placed can be added, scaled, removed, rotated, recoloured by hand SOURCED [C-S2]; export for Foundry, Roll20, Fantasy Grounds and UniversalVTT carries walls, doors and lights SOURCED [C-S7] (format list from search snippet of a community wiki: snippet only [C-S13]).
- **Constraints, snapping, magnetism, mistakes**: undo/redo for drawing rooms arrived only in the 2024-06-12 update, alongside an OPTIONAL autosave that is off until enabled in Settings SOURCED [C-S9]; undo depth not found (queries: maker FAQ, patch-notes grep for undo; community wiki blocked by a bot check). Users report lost work: autosave unreliable and stored as a separate file (2025-08-17 review 202347006), hours lost to hangs (review 195927719, updated 2026-06-14), 3 hours lost with autosave off (positive review 226599305, 2026-05-28) SOURCED [C-S4][C-S5]. Grid snapping to a 1 m grid with no off switch was a complaint in 2024-04 (review 163104169) SOURCED [C-S4]. Stairs count as objects, so re-populating furniture deletes them (review 202347006) SOURCED [C-S4]. No way to move or copy a room wholesale; the only fix for a mis-drawn room was delete and redraw, losing the decoration (review 163051630, 2024-04-17) SOURCED [C-S4] — later fixes not checked.
- **Presets, templates, stamps, starting points**: map themes and per-room themes (e.g. new room themes Skeletal Throne Room, Village Cathedral in 2024-06) SOURCED [C-S9]; object brushes, favourites (2022-09-29) SOURCED [C-S9]; a Steam Workshop of shared maps and assets SOURCED [C-S2]; but workshop assets count only as props, and rooms built from non-standard assets cannot be generated, only placed piece by piece (reviews 227674335, 2026-06-10; 221200442, 2026-03-20) SOURCED [C-S4].
- **Labelling**: not found as a feature (queries: store description, homepage, patch-note grep) — the product is a battle-map tool, labels are not its subject. INFERRED from absence.
- **Layers and zoom**: orthographic, perspective and first-person 3D views SOURCED [C-S7]; multi-level buildings and underground since 2025 SOURCED [C-S9]; per-dungeon generation rules (e.g. gas lamps instead of torches) are NOT possible (review 233211468, 2026-08-19) SOURCED [C-S4].
- **AI assist**: rule-based procedural furnishing, not a prompt. The maker marketed it as "AI-powered" in 2021 (livestream/AMA posts, 2021-10-20) SOURCED [C-S9]; today the Steam page carries a disclaimer that it "does not use any generative AI/LLM's for its room generation" SOURCED [C-S2], repeated on the maker FAQ SOURCED [C-S8]. Presented as automatic-on-draw, with a reroll (randomize/refresh), a scope choice for which parts of a room the generator fills (2022-09-29) and, from 2026-03-17, a Roof switch in an *advanced AI generation* menu SOURCED [C-S9]. No preview-before-apply and no side-by-side variations found (queries as above) — the result lands directly on the map. INFERRED from absence.
- **Onboarding**: an in-app tutorial exists (a 2022-04-27 hotfix fixed users getting stuck halfway through it) SOURCED [C-S9]; reviewers still report missing tooltips and needing hours of tutorials (review 191463036, 2025-03-29) and a lack of any tutorial or online resources (review 155655746, 2024-01-09) SOURCED [C-S4]. The homepage walks a newcomer through Pick a theme, Draw, Customise, Expand, Landscape, Change, Visualize, Export SOURCED [C-S7].
- **Praise**: Steam *Very Positive*, 3,728 positive vs 209 negative of 3,937 reviews (all languages, fetched 2026-09-27) SOURCED [C-S3]. Speed of the first result is the core praise: "it instantly fills the whole space with walls, floors, furniture, and lighting" (review 226758021, 2026-05-30) SOURCED [C-S5]; 57 of 300 sampled positive reviews use speed/time words (seconds, minutes, quick, fast, saves time) SOURCED [C-S5]. Press: 8/10, "the AI instantly populates it with a thematically appropriate interior" (2024-07-05) SOURCED [C-S12]; Pixel Bandits (2023-06-10) praises that every item can be moved and rotated after generation SOURCED [C-S11].
- **Complaints** (negation searches: all 162 English negative reviews paged via the Steam API, grepped for AI/control/random/manual/undo/tutorial; WebSearch on the AI label; the Steam discussion on what AI-powered means): 36 of 162 negatives contain the word AI (keyword count), typically saying it places objects nonsensically or in repetitive rows, so users spend longer fixing than they saved (reviews 214128836, 175314407, 160051594) or switch generation off entirely (202783020, 202347006) SOURCED [C-S4]. For precise work, "the AI is constantly interfering with the output" when tracing a scaled map (review 140087392, 2023-06-15) SOURCED [C-S4]. The AI label itself drew doubt: one reviewer called it random placement, not AI (review 149137667, 2023-10-29) SOURCED [C-S4]; a 2023-04-12 forum thread asked whether the art was AI-made, answered by users that assets are artist-made and "AI-powered means that you can (but don't have to) use AI" SOURCED [C-S10]. Other keyword counts across the 162: crash/hang/freeze 31, price/expensive/refund 34, lag/stutter/slow/performance 14 SOURCED [C-S4]. Even positive reviewers call the furniture placement dumb at times (203640975) SOURCED [C-S5].
- **Lesson for our toolkit**: A reroll must be scoped and must never eat what the user declared or placed by hand (DA re-populates over stairs and offers no per-map rules), and the machinery should be named honestly from day one (DA moved from calling itself AI-powered to a no-generative-AI disclaimer).

#### C2 Adobe Photoshop Generative Fill (Firefly and partner models)
- **Audience · price · platform** (dated): professional and hobby image editors, inside Photoshop desktop/web/iPad SOURCED [C-S24] (snippet only). Launched in the Photoshop desktop beta on 2023-05-23 SOURCED [C-S14]; general availability in the September 2023 release and credit metering from November 2023 are reported by search snippets only (CG Channel, Fstoppers) [C-S24]. Standard Firefly generations cost 1 generative credit each; partner models are a premium feature (snippet only, helpx pages answer 403 to curl and WebFetch) [C-S24]; Adobe's Community Manager set partner models at 10 credits per generation after the free beta (post 2025-09-25) SOURCED [C-S18]. Subscription prices not researched (out of scope).
- **Core interactions**: make a selection → the contextual task bar offers Generative Fill → optionally type a prompt (blank = fill from the surrounding pixels, snippet only [C-S24]) → Generate → pick one of the variations in the Properties panel; the result lands on a separate generative layer so edits are non-destructive and reversible SOURCED [C-S14]. Adobe's own tutorial says it "creates three variations" and shows combining two variations with a layer mask (WebFetch summary, page dated 2026-07-22 by the summary; raw page not confirmed, curl failed) [C-S23]; Adobe's design team's UI screenshot shows a prompt, a Generate button and "three image variations" (2025-10-28) SOURCED [C-S16]. Later controls: Generate Similar (more like a chosen variation) and Reference Image (steer with a picture), introduced to "reduce uncertainty" and randomness (2024-04-23) SOURCED [C-S15].
- **Constraints, snapping, magnetism, mistakes**: every generation is its own layer, so undo = delete/hide the layer or pick another variation SOURCED [C-S14]; a collapsed *variations* section made users believe only one result was produced (thread 2024-01-19) SOURCED [C-S20]. Model changes alter outputs: Firefly Image 3 was removed from the picker on 2026-04-28 (27.6) and from service in August 2026; Adobe says existing files are not affected SOURCED [C-S21]; a daily professional user reports the new default model is usable "around 10%" of the time and that the picker reverts to it on every new image, though another user found the choice sticky (2026-03-19/20) SOURCED [C-S22].
- **Presets, templates, stamps, starting points**: a model picker (Adobe models vs partner models) rather than presets; per helpx snippets: Firefly Fill & Expand, Firefly Image 5, Firefly Image 1; partner FLUX.2 pro, FLUX Kontext pro, Gemini 3.1 / Gemini 3; Gemini 2.5 support being removed from v27.11 (September 2026) (snippet only) [C-S24]. Partner models (Gemini 2.5 Flash Image, FLUX Kontext Pro) entered the Photoshop beta in September 2025 SOURCED [C-S17]; they return ONE variation, Firefly models several SOURCED [C-S18].
- **Labelling**: provenance labelling rather than map labels — Generative Fill supports Content Credentials, described as "nutrition labels" for content (2023-05-23) SOURCED [C-S14]; the active model is shown in the task bar, Properties panel and progress bar and stored in the generative layer; Firefly is labelled the only commercially safe option (2025-10-28) SOURCED [C-S16].
- **Layers and zoom**: generative layers (one per generation, holding its variations and the model used) SOURCED [C-S14][C-S16].
- **AI assist**: the whole feature. Presented as selection + optional prompt + several variations + choose one, never auto-applied to the pixel layer SOURCED [C-S14][C-S16]. A trust message with a shield icon appears when a generative layer is created or feedback is given: content is not used for training SOURCED [C-S16]. Refusals: outputs judged to break the User Guidelines are removed with a warning; a single Adobe bug thread opened 2023-05-23 has 1,392 replies and 310,437 views, with false-positive complaints still arriving on 2026-05-06 SOURCED [C-S19].
- **Onboarding**: discoverability through the contextual task bar that appears after a selection (helpx snippet only) [C-S24]; Adobe tutorials on adobe.com/learn [C-S23]. First-five-minutes tutorial not found (queries: helpx 403; Generative Fill tutorial searches).
- **Praise**: PetaPixel on launch day: expansions often not noticeable at first glance, though "the AI has mixed success at this early stage" (2023-05-23) SOURCED [C-S26]. Adobe's own framing that trust is earned: "We recognize that trust must be earned" (2024-06-10, after the Terms of Use backlash) SOURCED [C-S25].
- **Complaints** (negation searches: *violates the User Guidelines* false positive; *results worse after update*; *no longer creating three options*; ToS backlash): false-positive refusals on innocent photos (legs in stockings in the opening post, pool photos, a model shoot with "no nudity") across 2023-2026 SOURCED [C-S19]; quality regressions when Adobe swaps default models, and the loss of a preferred model SOURCED [C-S21][C-S22]; low resolution/sharpness was a top in-app pain point by Adobe's own research SOURCED [C-S16]; the June 2024 Terms of Use wording provoked fears of training on user work, answered by a 2024-06-10 Adobe post SOURCED [C-S25].
- **Lesson for our toolkit**: Put every generated result on its own removable layer with several side-by-side candidates and a visible record of which engine and settings made it, and never change the engine under a user's feet — a model swap that alters outputs is felt as a betrayal.

#### C3 Canva Magic Studio (Magic Edit, Magic Grab, Magic Expand, Magic Design, Magic Write; Magic Layers)
- **Audience · price · platform** (dated): non-designers making social posts, slides and documents in the browser/app; Magic Studio launched 2023-10-04 as a premium suite, with a free account getting 10 promotional tokens at launch SOURCED [C-S29]. AI use now draws on a monthly *AI allowance* that grows with the plan (help-center snippet only; canva.com returned 403 to curl and WebFetch) [C-S27]. Teams price for a five-person plan rose from US$119.99 to US$500 a year, with Canva citing Magic Studio (reported 2024-09-07) SOURCED [C-S30]. Current plan prices not fetched (canva.com blocked).
- **Core interactions**: Magic Edit — brush the area, Continue, type a short prompt, Generate, choose among four replacements or ask for more, then Done (2023-04-27 guide) SOURCED [C-S28]; Magic Design — type a prompt of five or more words and get a selection of whole designs with images and generated text, then edit by hand (2023-10-04 hands-on) SOURCED [C-S29]; Magic Grab separates a subject so it can be moved/resized, Magic Expand extends past the frame, Magic Switch converts a design to another format and language (launch coverage, snippet only) [C-S32]; Magic Layers (public beta 2026-03-11) turns a flat PNG/JPG, including an AI image, into separate editable layers with live text SOURCED [C-S31].
- **Constraints, snapping, magnetism, mistakes**: results are placed into an ordinary editable design, so the normal editor (and its undo) applies; INFERRED from [C-S28][C-S29]. Canva's own help warns results may mismatch lighting/colour/style or come back empty or unexpected (snippet only) [C-S27]. Admins can turn Magic/AI features off for a team (help-center title *Change access to Magic and AI features*, snippet only) [C-S27].
- **Presets, templates, stamps, starting points**: the template library is the base; Magic Design returns template-like whole designs from a prompt SOURCED [C-S29].
- **Labelling**: not applicable beyond text generation (Magic Write); not researched further.
- **Layers and zoom**: Magic Layers explicitly converts generated flat output into layers so a design can be refined without regenerating it SOURCED [C-S31].
- **AI assist**: presented as named *Magic* buttons inside ordinary editing flows, each showing several candidates (four for Magic Edit; a grid of designs for Magic Design) with regenerate and a Done/accept step SOURCED [C-S28][C-S29]. Trust framing at launch: Canva Shield safety/indemnity controls and a US$200M fund paying creators who consent to training (snippet only) [C-S32].
- **Onboarding**: not found as a first-run flow (queries: canva.com help pages blocked; tutorials searched) — discovery is through the photo's Edit panel per the 2023 guide SOURCED [C-S28].
- **Praise**: the hands-on reached a usable post in under five minutes after hand edits, and found generated text better than visuals (2023-10-04) SOURCED [C-S29]; Canva's CPO frames flat AI output as "a finished image you couldn't edit, refine, or make your own" — the problem Magic Layers addresses (2026-03-11) SOURCED [C-S31].
- **Complaints** (negation searches: price-increase backlash; *generic / limited control / doesn't work* review searches): re-running a Magic Design prompt gave results "not much different", and the designs were basic SOURCED [C-S29]; the 2024 price rise for AI that many had not asked for drew a large backlash (TechCrunch 2024-09-07) SOURCED [C-S30]; a Creative Bloq headline said "AI isn't a valid reason to increase your prices by 300%" (snippet only) [C-S32]; 2025-2026 claims of generic output and limited fine-tuning appeared only on listicle/marketing blogs — not counted.
- **Lesson for our toolkit**: A generated result must arrive as editable parts (layers, objects, live text), never a flat picture — Canva had to ship Magic Layers in 2026 because flat AI output could not be edited — and never make casual users pay for AI they did not ask for.

#### C4 Figma AI (Make Designs → First Draft → Figma agent; Figma Make)
- **Audience · price · platform** (dated): product designers and teams in the Figma editor (web/desktop). Figma AI features were announced at Config on 2024-06-26 in limited beta SOURCED [C-S34] (date shown in the related-articles list); Figma Make (prompt-to-app) launched 2025-05-07 SOURCED [C-S37]; the Figma design agent launched 2026-05-20 SOURCED [C-S38]; it is on all plans, free during beta with monthly limits, and its credit use varies with task complexity SOURCED [C-S39]. Seat credit limits enforced since 2026-03-18 (search snippet only; help-center *AI credit updates FAQ* not fetched) [C-S42].
- **Core interactions**: Make Designs/First Draft: type a prompt → the model picks, arranges and themes components from Figma-commissioned design systems into a fully parameterized (editable) design; images come from a diffusion model SOURCED [C-S34]; the 2024-09-24 relaunch lets the user choose one of four libraries, from lo-fi wireframes to high fidelity SOURCED [C-S36]. Figma Make: start from a design or prompt, refine by *point-and-prompt* editing, publish SOURCED [C-S37]. Figma agent (2026): select any layer, open an on-canvas prompt box (Cmd/Ctrl+Enter), run several prompts in parallel, connect a library and @-reference components; the agent edits the file directly SOURCED [C-S39]; it can be asked for three style options or several variants at once SOURCED [C-S38].
- **Constraints, snapping, magnetism, mistakes**: agent edits apply straight to the canvas; recovery is "Click Undo in the chat to revert the most recent change" or Cmd/Ctrl+Z, and Figma's own tip for comparing is to duplicate first, then undo SOURCED [C-S39] — i.e. no built-in preview-then-accept. A running prompt can be stopped SOURCED [C-S39]. On-canvas AI chat can be switched off in Preferences SOURCED [C-S39].
- **Presets, templates, stamps, starting points**: the four First Draft libraries; the user's own team library connected to the agent SOURCED [C-S36][C-S39].
- **Labelling**: not applicable (UI tool); agent chats are visible to editors by default from 2026-06-23 — the AI's reasoning trail becomes a shared record SOURCED [C-S39].
- **Layers and zoom**: outputs are ordinary Figma layers/components, never a flat image SOURCED [C-S34][C-S38].
- **AI assist**: presented first as a named generator (Make Designs), then renamed *First Draft* "to give designers a simple jumping-off point" SOURCED [C-S36], now folded into a chat agent on the canvas, fine-tuned for "direct manipulation so you can stay in control" SOURCED [C-S38].
- **Onboarding**: agent entry point is any selected layer plus a prompt box; how-to questions can be asked of the agent itself SOURCED [C-S39]. No first-run tutorial found (queries: help center pages above).
- **Praise**: forum critics still concede Figma Make bridges the gap to non-designer stakeholders with one shareable link (2026-03-10) SOURCED [C-S40]. Independent praise for First Draft not found (queries: First Draft relaunch coverage returned blogs/listicles only).
- **Complaints** (negation searches: Make Designs + Apple Weather, credits complaints, training opt-out): THE 2024 EPISODE, verified from primary sources — on 2024-07-01 designer Andy Allen showed that a weather-app prompt reproduced Apple's Weather app ("Tried three times, same results."); on 2024-07-02 CEO Dylan Field said the feature would be temporarily disabled and denied training on customer designs SOURCED [C-S35]; Figma's VP of Design's retrospective (2024-07-17) traced it to design-system assets added the week before Config that "we simply didn't vet carefully enough", removed them, disabled the feature pending a better QA process, and noted the models were off-the-shelf (GPT-4o, Amazon Titan), not fine-tuned SOURCED [C-S34]; it returned 2024-09-24 as First Draft, still limited beta SOURCED [C-S36]. Separately, content training was switched ON by default for Starter and Professional teams from 2024-08-15 (admins can opt out) SOURCED [C-S41], drawing forum threads asking that opt-out be the default (thread titles seen in search results only). Credits: a 2026-03-10 feedback thread (187 replies, 9,476 views) argues "most AI usage is for fixing bad or incomplete output" SOURCED [C-S40].
- **Lesson for our toolkit**: Trust broke when a draft reproduced a known work and was rebuilt by a pause, a plain public retrospective, a humbler name (First Draft) and outputs made of editable components from a vetted vocabulary — and since iteration mostly repairs the AI's own mistakes, never charge the user for the clerk's corrections.

#### C5 Midjourney web editor (variations grid, reroll, vary region, erase/restore, retexture, pan/zoom)
- **Audience · price · platform** (dated): hobby and professional image makers; web app (plus the original Discord bot). The web UI was opened to any user paying US$10/month in August 2024 SOURCED [C-S45]; the unified web editor shipped 2024-08-16 SOURCED [C-S43]; uploading outside images and Retexture were tested from 2024-10-23, first only for users with 10,000+ images, yearly members or 12-month subscribers SOURCED [C-S44]. Current prices not fetched.
- **Core interactions**: a prompt yields a grid of four images; V1-V4 makes variations of one, U1-U4 separates one, Vary (Subtle/Strong) makes a new grid of four, and Reroll reruns the prompt as a new grid (docs snippets only; docs.midjourney.com answered 403) [C-S46]. The editor "combines reframe / repaint / vary region / pan / zoom into a single unified interface" SOURCED [C-S43]: Erase brush marks what to regenerate, Restore brush brings back original pixels, Move/Resize reframes, Smart Select masks, Retexture restyles the whole scene (docs snippets) [C-S46]; every editing action is steered by a text prompt plus a selected region SOURCED [C-S44]. 2026: a V8.2 edit model takes plain-language edit instructions, up to four reference images, inpainting/outpainting (2026-08-27) SOURCED [C-S47]; draft mode makes 24 cheap low-resolution images per job, and *Vary* renders a chosen one at full quality (2026-06-16) SOURCED [C-S47]; a conversational mode (text and voice) that was improved on 2026-05-27 SOURCED [C-S47].
- **Constraints, snapping, magnetism, mistakes**: nothing is overwritten — every Vary/Reroll/edit is a new job beside the original INFERRED from [C-S46] (snippets) and the job model; the 2026-09-24 update says targeted edits now "change only the pixels that you've selected" and can be repeated without quality loss SOURCED [C-S47] — implying earlier edits could spill over or degrade the image (INFERRED). Undo depth not applicable/not found (queries: docs blocked).
- **Presets, templates, stamps, starting points**: style references, moodboards, personalization profiles; a Styles sidebar with *Live previews* of the current prompt across liked styles (2026-09-24) SOURCED [C-S47].
- **Labelling**: not applicable; provenance — Midjourney uses IPTC Digital Source Type metadata but, per TechCrunch (2024-10-19), had not adopted C2PA SOURCED [C-S48].
- **Layers and zoom**: no layers; pan/zoom-out are outpainting operations on a flat image SOURCED [C-S43].
- **AI assist**: the whole product. Presentation: several candidates by default (4, or 24 in draft mode), pick one, vary or rerun, then region edits; a feedback *sad face* button on a bad result SOURCED [C-S47]. Moderation: a *V2 AI moderator* that examines prompts, images, masks and outputs, meant to cut false positives (2024-10-23) SOURCED [C-S44].
- **Onboarding**: the web UI replaced Discord commands that the reviewer found much less user-friendly (2024-08-19) SOURCED [C-S45]; first-run tutorial not found (queries: docs blocked; updates feed).
- **Praise**: "The editor makes this type of refinement fast and easy." (2024-08-19) SOURCED [C-S45]; the reviewer found it good at knowing which regions to change when the prompt changes SOURCED [C-S45].
- **Complaints** (negation searches: *vary region not working … small area*; the maker's own known issues): Midjourney itself warned that very out-of-place requests or tiny regions "might not give you what you ask" (2024-10-23) SOURCED [C-S44]; its docs advise regions of roughly 20-50% of the image and warn the system may fight a prompt that is out of place (snippet only) [C-S46]; quality loss on repeated edits until the 2026-09-24 fix SOURCED [C-S47]; the hands-on reviewer wanted more traditional (manual) editing tools in the canvas SOURCED [C-S45].
- **Lesson for our toolkit**: Offer many cheap candidates first (MJ's grid of 4, draft mode of 24) and commit one at full quality, and guarantee that a regional edit touches only the selected region and can be repeated without degrading the rest — the same promise our `hold`/regenerate-with-keep must make.

#### C6 Map, town and VTT tools that ship an AI assistant or chat (brief records)
Search frame (queries in the log): *AI fantasy map generator*, *AI town map generator D&D*, *Inkarnate AI*, Azgaar AI, World Anvil / LegendKeeper AI, D&D Beyond Maps AI, *Roll20 AI*, *Foundry VTT module AI generate scene map*, Vheer, ZSky, fantasygen, Adobe Firefly fantasy map. Found: one procedural map generator with an AI chat/help/notes layer (Azgaar), four VTT-oriented AI tools (three Foundry packages and one web app that exports to Foundry), and a family of text-to-image map generators. NONE found that pairs a rule-based town/city generator with an AI clerk that declares constraints — that niche appears empty (INFERRED from these searches).

##### C6a Azgaar's Fantasy Map Generator (FMG) — procedural world maps with an AI layer
- **Audience · price · platform**: free web app (also desktop builds) for writers and GMs SOURCED [C-S49]; AI note generation uses the user's own OpenAI/Anthropic key or a local Ollama model, stored in the browser only SOURCED [C-S49].
- **Core interactions / AI assist**: *Generate note with AI* in the Notes editor writes a legend for any map object (burgs, states, rivers, markers …) SOURCED [C-S49]; an *AI Assistant widget* (PR merged 2024-09-22) SOURCED [C-S51]; an in-app help assistant backed by a help gateway replaced an earlier third-party (OpenWidget) assistant in release v1.152.1 (2026-09-11) SOURCED [C-S50][C-S51]. In development, not released: an AI chat that answers questions about the map by running code in the page — a contributor calls its `run(code)` + `describe()` design "the right call" (PR #1618 merged 2026-08-24 into the `ai-interface` branch, not master; examples: an all-pairs city-distance query and a 50-row trade table, about US$0.02 per session on a small model) SOURCED [C-S51]; *AI assistant v3* is an open PR against master (2026-09-05) SOURCED [C-S51]. An opt-in AI name-generation request (#1357) was closed 2026-04-20 and its PR #1358 was not merged SOURCED [C-S51].
- **Constraints / regeneration**: non-AI regenerate controls per element, e.g. Tools → Regenerate → Emblems re-rolls all coats of arms SOURCED [C-S49].
- **Praise / Complaints**: a GitHub search for requests to remove or disable AI showed none among the 20 titles inspected (of 28 matches; query in log) SOURCED [C-S51]; user opinion of the AI features not found (Reddit blocked for the search tool).
- **Lesson**: the AI sits beside a procedural generator as helper, note-writer and (in development) query engine over the model's own data — it never draws the map, the same split as our clerk.

##### C6b Familiar — AI co-pilot module for Foundry VTT
- **Audience · price · platform**: GMs on Foundry VTT v13/v14; two weeks free then US$6/month; bring your own AI (Claude, ChatGPT, Gemini, Grok, OpenRouter, local models) or connect over MCP (page undated, fetched 2026-09-27) SOURCED [C-S52].
- **Core interactions / AI assist**: chat with the game; build a scene by asking (tokens, walls, doors, lighting, weather, fog, trigger regions); generate a battlemap background from a prompt, e.g. asking for three options and choosing the second SOURCED [C-S52].
- **Constraints, mistakes**: "The rules it cannot fake live in code, not in its prompt" — a rules engine checks every action and a refused move is announced as refused SOURCED [C-S52]; undo of the last action; optional turn-by-turn confirmation; the AI cannot change ownership, permissions or internal IDs, and destructive operations require confirmation SOURCED [C-S52].
- **Praise / Complaints**: only maker-curated Discord testimonials found (search snippet) [C-S64]; independent reviews and complaints not found (queries: Familiar VTT review / reddit / discord).
- **Lesson**: the closest existing model of our clerk — the AI proposes, a rules engine in code disposes, refusals are spoken with a reason, and destructive acts need confirmation.

##### C6c SceneForge AI, Cibola 8, TT-RPG — prompt-to-battlemap for VTTs
- **SceneForge AI** (Foundry package, v1.20 about a month before 2026-09-27): describe → Generate → map applied to a Foundry scene; *Edit Map* requests changes using the existing map as a reference "without starting over"; pitch: no prompt engineering needed SOURCED [C-S53]. Output is an image background (INFERRED from its description of applying the map to the scene).
- **Cibola 8** (Foundry package): generates battlemaps and city maps as images, then detects walls with computer vision (OpenCV); built-in image-editing canvas; model can be switched per generation; Patreon subscription or own OpenAI key SOURCED [C-S54].
- **TT-RPG** (tt-rpg.app): AI builds a top-down battle map you "can refine by chatting"; walls, doors and lights are placed as editable objects in its editor and previewed in colour before exporting a Universal VTT file SOURCED [C-S55].
- **Complaints**: not found for any of the three (queries: package pages, the Foundry-VTT-AI-module search); Foundry's own AI Content Policy (revised 2026-03-18) now requires prepared package content to be human-made, allows AI for content improvised at a user's request, requires consent before running AI-generated code, and exempts "algorithms for procedural generation" SOURCED [C-S63].
- **Lesson**: even image-first VTT tools add a structured layer (walls, doors, lights as objects) because a picture alone is not playable — structure is what users edit and export.

##### C6d Text-to-map image generators (Adobe Firefly fantasy-map page, ZSky, Vheer, Mew Design city generator, FantasyGen)
- All return a flat picture from a prompt: Firefly — a PNG; edits happen by re-prompting or opening Photoshop/Express, no layered map (WebFetch summary, page undated) [C-S56]; ZSky — "download in high resolution", one credit per map, several variations SOURCED [C-S57]; Vheer — each design "can be regenerated or refined" (whole-image regeneration) SOURCED [C-S58]; Mew Design — a city image plus a written brief (districts, NPCs, factions), with *Chat Edit* to change one district by instruction SOURCED [C-S59]; FantasyGen — blocked (403), search snippet claims it "arranges districts logically" (snippet only) [C-S60].
- **Complaints**: garbled/invented labels and rivers that go nowhere are the recurring critique, with the workaround of re-labelling in a manual tool (blog snippets only, not counted) [C-S64]; r/dndmaps disallowed AI maps in mid-2023 (snippet only; Reddit not fetchable) [C-S64].
- **Lesson**: see T3 — none is an editable map.

##### C6e Tools with no AI (checked, so the negative is recorded)
- Inkarnate: its homepage makes zero AI claims (0 matches) SOURCED [C-S61]; the *Inkarnate AI* pages in search results are third-party AI-directory listings — traced to origin and discounted. LegendKeeper: FAQ "does not have generative AI features" SOURCED [C-S62]. World Anvil: states it does not train AI on user work (snippet only; site 403) [C-S64]. Roll20: no generative-AI map feature found (blog snippet about map redesign and alignment tool, 2026) [C-S64]. D&D Beyond / Wizards of the Coast: generative-AI art FAQ bars AI art in D&D products (snippet only; page 403) [C-S64].
- **Lesson**: in this hobby, having no AI is itself a selling point for several makers; a clerk must be optional and clearly labelled.


#### Targeted checks for design item 101 (f) (requested by the lane seat mid-task)
- T2 Dungeon Alchemist — (a) per-room theme: CONFIRMED, the Steam description says the user picks the theme of each room (undated, fetched 2026-09-27) SOURCED [C-S2]; the homepage adds that a drawn room's theme and function can be changed later SOURCED [C-S7]. (b) randomize/reroll: CONFIRMED, a *randomize* button re-runs the procedural algorithms SOURCED [C-S2]; the refresh button can be limited to objects only (patch 2023-01-31) SOURCED [C-S9]. (c) *AI off*/manual mode: PARTLY CONFIRMED — no single switch named *AI off* was found in maker text, but since 2022-09-29 users choose which parts of a room the generator fills, and since 2026-03-17 an *advanced AI generation* menu has a Roof switch SOURCED [C-S9]; users report turning generation off except walls/floors (reviews 202783020, 202347006) SOURCED [C-S4]. (d) in-house procedural, not an LLM: CONFIRMED — the Steam description carries a no-generative-AI disclaimer SOURCED [C-S2] and maker FAQ SOURCED [C-S8] (both undated; fetched 2026-09-27); note the same maker called it "AI-powered" in 2021-10-20 posts SOURCED [C-S9].
- T1 Photoshop Generative Fill variations — helpx.adobe.com could NOT be read: curl and WebFetch both got HTTP 403 (an Akamai *Access Denied* page) on 2026-09-27; not circumvented. Adobe-owned evidence instead: (i) launch press release: results go to generative layers, non-destructive and reversible (2023-05-23) SOURCED [C-S14]; (ii) Adobe tutorial on adobe.com/learn: Generative Fill "creates three variations", browse them with buttons 1-2-3, and keep all variations on a duplicated layer (WebFetch summary only, dated 2026-07-22 by the summary; raw wording NOT confirmed) [C-S23]; (iii) Adobe design team's article shows the Properties panel with "three image variations" (2025-10-28) SOURCED [C-S16]; (iv) helpx search snippets: "select Generate, then choose a variation from the Properties panel" (snippet only) [C-S24]. CHANGES in recent versions: a model picker (Adobe vs partner models) since the 2025-09-25 beta; partner models (Gemini/FLUX) return ONE variation and cost 10 credits (Community Manager, 2025-09-25) SOURCED [C-S18]; Firefly Image 3 left the picker 2026-04-28 SOURCED [C-S21]. Verdict: *three variations, each generation on its own generative layer* is CONFIRMED for Firefly models from Adobe-owned pages other than helpx (design-team page raw-confirmed; tutorial summary-only; users in C-S20 expect three); *cycle through them, generate again* is PLAUSIBLE (users press Generate again in the Properties panel per snippets); the count is model-dependent since 2025 (one for partner models).
- T3 Text-to-map generators returning an EDITABLE map — REFUTED for every one checked: Adobe Firefly fantasy-map page returns a flat PNG, edited only by re-prompting or in Photoshop/Express (WebFetch summary, undated) [C-S56]; ZSky returns downloadable images, one credit each, several variations SOURCED [C-S57]; Vheer regenerates or refines the whole image SOURCED [C-S58]; Mew Design adds a text brief and instruction-based *Chat Edit* of one district, still an image SOURCED [C-S59]; FantasyGen blocked (403; snippet only) [C-S60]. Closest to editable: SceneForge's reference-guided *Edit Map* (partial re-generation without starting over) SOURCED [C-S53], TT-RPG's walls/doors/lights as editable objects over the image SOURCED [C-S55], and Canva's Magic Layers, which splits any flat image into layers (2026-03-11) SOURCED [C-S31]. User ratings: no independent ratings found (queries logged; Reddit not reachable by the search tool); community stance evidence is snippet-only (r/dndmaps disallowing AI maps, mid-2023) [C-S64]. INFERRED: an editable generated town (objects, labels, regions) remains an open niche.


#### Gaps and blocked sources (read before trusting a "not found")
- Blocked to curl AND WebFetch (HTTP 403, not circumvented): helpx.adobe.com, canva.com, docs.midjourney.com, fantasygen.net, perchance.org, worldanvil.com, dndbeyond-support.wizards.com, dungeonalchemist.fandom.com (bot check); www.adobe.com answered WebFetch only. Reddit: the search tool refuses reddit.com; no thread was fetched. Cartographers' Guild threads need a login.
- Not found: undo depth for Dungeon Alchemist, Canva and Midjourney; first-run onboarding flows for Photoshop, Canva and Figma; independent reviews or complaints for Familiar, SceneForge, Cibola 8 and TT-RPG; user ratings of text-to-map generators; any tool pairing a rule-based TOWN/CITY generator with an AI clerk.

### D. The reference generators' own editing

Archives first (read-only greps of `research/findings/`; no file under `captures/**/network/bodies/` opened), then the
makers' public pages and the users' own words on itch.io and the ProFantasy forum (fetched 2026-09-27). Reddit
(`r/FantasyCities`, watabou's "dedicated reddit community" [D-S1]) was not fetched — `old.reddit.com` answered with a
"Blocked" page to curl at 18:48 EDT, and two web searches surfaced no Reddit thread on editing these generators.
Archive items are cited as `D-A#` (a findings file, which cites the maker's post id); they were not re-fetched here.

#### Medieval Fantasy City Generator (watabou; "MFCG")
- **Audience · price · platform** (dated): free browser app (HTML5) on itch.io and watabou.github.io, funded by
  Patreon; maps may be used "as you like", commercially included, attribution appreciated — SOURCED [D-S1] (page
  undated; fetched 2026-09-27). itch rating "4.8 out of 5 stars (3,571 total ratings)" — SOURCED [D-S1] (fetched
  2026-09-27). Users are game masters and worldbuilders (GURPS, The Fantasy Trip, Foundry modules) — SOURCED by the
  topics [D-S4]; "casual" is INFERRED.
- **Core interactions:** (1) press Enter → a whole new city; the page's only two instructions are right-click for the
  context menu "with all the options" and Enter for a new map — SOURCED [D-S1]. (2) Parameters in a Generate window
  (size, walls, citadel, plaza, temple, coast, river, number of roads …) → regenerate — SOURCED [D-A3] (the observed URL
  surface) and [D-S2] (creator, 2024-09-11: request "a new map with a specific number of roads (Generate > Roads)").
  (3) Cmd/Ctrl+click a ward "to reroll its inner geometry" — only that ward changes — SOURCED [D-S2], mechanism
  [D-A1]. (4) Warp mode: the map greys out, the mesh appears, brush tools Displace, Liquify, Relax, Bloat, Pinch,
  Equalize, Rotate and Measure; Enter submits, Esc discards — SOURCED [D-S2] (post 2023-02-25, edited 2024-04-15),
  [D-A2]. (5) Click a name to edit it, shift+click to reroll all district names, right-click to add a landmark,
  Delete to remove it — SOURCED [D-S14] (a user's summary of release notes, 2020-08). (6) Shift+click a district to
  open a district view — SOURCED [D-S2].
- **Constraints, snapping, magnetism, mistakes:** warping moves mesh vertices only: "you can't create an island or add
  a new road", and too much distortion "may cause glitches" — SOURCED [D-A4] (devlog 22794, 2018-02-01). Warp is a
  staged edit with Apply/Discard — SOURCED [D-A2]; there is no undo history (an "improved warp tool with undo history"
  was deferred to a desktop app in the 2018 roadmap) — SOURCED [D-A4]. **Manual edits are not saved**: the permalink
  carries seed and parameters only, and exported JSON cannot be re-imported (only into City Viewer) — SOURCED [D-A3]
  (creator comment on 102377277) and the creator's replies of 2024-07-29 and 2026-02-22 [D-S2], 2024-11-15 [D-S5],
  [D-S6], [D-S10]. A third party published a save-and-reimport tool for MFCG edits on 2026-02-15 — SOURCED [D-S5],
  [D-S6] (a community workaround, i.e. evidence of the gap; the tool itself not examined). Generation glitches (an
  empty area inside the walls) are recovered by rerolling that ward — SOURCED [D-A3].
- **Presets, templates, stamps, starting points:** the empty state is a finished random city; style presets on a
  separate page — SOURCED [D-S1]; no stamps; landmarks can be bulk-loaded from a text/JSON list, which the creator calls
  "an obscure way to populate a city" (2024-11-15) — SOURCED [D-S5].
- **Labelling:** district labels are placed automatically and cannot be moved ("currently labels can only be placed
  automatically", creator, 2025-06-05); per-district colours cannot be set (user, 2025-12-09: "a really annoying
  omission") — SOURCED [D-S2] comments.
- **Layers and zoom:** display toggles (buildings, alleys, grid, labels, thin lines) by single keys — SOURCED [D-S2];
  no free zoom or pan, for "technical issues" (creator, 2025-05-27) — SOURCED [D-S2]; the user asking called the fixed
  view "very limited, especially when creating bigger cities" — SOURCED [D-S2].
- **AI assist:** none found (the page, the shortcuts post and the archives mention none) — INFERRED from absence.
- **Onboarding:** two lines on the page plus a shortcuts post; hidden gestures by design — the rotation shortcut "may
  not be obvious, but I wanted to avoid creating new buttons" (creator, 2018-12) — SOURCED [D-A4]. Users discover
  features late: one found the district view only after closing the page and losing the city (2025-08-16) — SOURCED
  [D-S11]; power users call the instructions "a little piecemeal, especially with the warp command" (2020-08) —
  SOURCED [D-S14].
- **Praise:** the rating above; "Best city generator I've found!" (2024-11-04) — SOURCED [D-S5]; ProFantasy users turn
  MFCG exports into finished CC3+ maps, "something like this in 22 minutes" (2020-09) — SOURCED [D-S15]; the warp tool
  "absolutely awesome" with a request for more grab points at sea (2018-03-10) — SOURCED [D-S3].
- **Complaints (negation run):** all 392 topic titles of MFCG's itch community board were crawled (2026-09-27) — SOURCED
  [D-S4]. By title (INFERRED classification; list in the lane's scratch `ux/D/mfcg-topics-classified.txt`): **28 ask
  for direct placement or editing** (move, add or delete districts; castle and gate placement; add rivers; edit road
  origins; "an edit mode"; "a way to paint elements"; a drawn base shape), **18 ask to save, reload or import work**,
  and at most 26 mention options, sizes or counts (several of them about export size or bugs). The creator's own
  paint-over-the-mesh editor (City Painter, 2020) was abandoned: drawing over a coarse mesh "turned out to be not user
  friendly at all" — SOURCED [D-A2]; asked for a drawable base shape in 2026-05, he linked it, said he "didn't like how
  it felt", and that the idea "makes total sense" — SOURCED [D-S7]. A user rerolls cities "dozens of times" to get
  usable districts (2025-09-06) — SOURCED [D-S8]. Against numeric targets, the creator: "nobody says 'it's a town of 500
  houses'" (2025-01-28) — SOURCED [D-S9]. Negation of "users want direct editing": I looked for posts preferring
  parameters or one-click generation over editing and found none beyond the high rating itself — INFERRED.
- **Lesson for our toolkit:** a one-click generator is loved, but its engaged users ask for two things above all — to
  put a specific thing where they want it, and never to lose what they changed — so every declaration must be direct,
  durable and re-openable (skeleton file + log), with parameters as the fallback, not the answer.

#### Watabou's other generators (Village, Perilous Shores, One Page Dungeon, Urban Places) — editing notes only
- **Local rerolls per layer:** Village's tree cover rerolls without touching the rest (context menu or a key), and
  Shift+Enter rerolls the current village — SOURCED [D-A5]. **Parameter labels confuse:** a user twice could not tell
  "Some" from "Many" trees — SOURCED [D-A5] (comments 42521165, 50688261). **Touch:** long-press opens the context menu
  — SOURCED [D-A6]. **Auto-placement plus manual override:** dungeon notes became draggable because "automatic notes
  placement is far from perfect" — SOURCED [D-A6]. **Fewer doors, not more:** the creator refused a second "Open in"
  button because two would "be confusing" — SOURCED [D-A6]. **Next:** Urban Places (2025 WIP) plans "an editor (to mark
  blocks, water areas etc.)" — SOURCED [D-A6].
- **Lesson for our toolkit:** reroll by layer and by scope (trees only, this ward only) is the cheapest control
  casual users get, and every automatic placement needs a drag handle.

#### Fantasy Town Generator (Thomas; "FTG")
- **Audience · price · platform** (dated): web app with a Patreon-funded premium tier (population cap 50,000, or
  100,000 premium — SOURCED [D-A7]); the premium price was not found (query "fantasytowngenerator.com premium patreon
  tier price features"). Map editing is "only available on large screen devices (as touch support for the editing
  doesn't exist)" — SOURCED [D-S12] (docs page undated; fetched 2026-09-27).
- **Core interactions:** generate from a large create form, then either "Edit manually" or "Regenerate area" —
  SOURCED [D-S12], [D-S13]. Manual: roads as click-chains that snap and split at crossings ("Roads can't overlap");
  buildings placed with two clicks (position, then rotation; Ctrl-click skips rotation), drawn as polygons, moved,
  restyled with a paint brush, or **swapped** (details trade places, footprints stay); water and ground textures by
  clicking inside a road-enclosed area; a river drawn as a rough path, then width and smoothness adjusted; trees singly,
  by brush or as an area — SOURCED [D-S12]. Regenerate area: select lots, pick a preset or weights, then accept,
  re-roll or edit options — SOURCED [D-S13], [D-A7]. Bulk edit buildings (shared details, or regenerate contents inside
  kept footprints) — SOURCED [D-A10].
- **Constraints, snapping, magnetism, mistakes:** snapping radius 5 m by default on a user slider — SOURCED [D-A7];
  right-click cancels the current action or removes the last point — SOURCED [D-S12]; an edit session is a diff saved
  in one request, and cancelling with unsaved changes asks first — SOURCED [D-A7]; **the server can refuse a save and
  list, per building, the people affected, the proposed action and a reason, applied on "Confirm actions"** — SOURCED
  [D-A7] (the nearest precedent for our disruption-and-fates report). Regenerate and bulk-regenerate warn "This action
  cannot be undone" — SOURCED [D-A10] (image 19 of post 159738553), [D-A7]; when users deleted by accident, the creator
  restored their settlement from versioned storage (2024-06) — SOURCED [D-A9]. User-reported failures: the fill tool
  is "finicky" with generated streets (2023-02-20) and walls drawn over roads fail to save — SOURCED [D-A8].
- **Presets, templates, stamps, starting points:** create-form presets and a saveable settings file; seven building
  presets in Regenerate area; a small library of building shapes — SOURCED [D-A7], [D-A9].
- **Labelling:** pins with a label, note and colour; building names live in data — SOURCED [D-A7].
- **Layers and zoom:** four fixed background layers; the docs warn "If you save a layout and don't see your new
  texture, it might be behind another layer" — SOURCED [D-S12]; user-definable colour layers arrived 2026-06 — SOURCED
  [D-A10].
- **AI assist:** none in the editor; the creator used ChatGPT to draft event templates (2023), an authoring aid, not a
  user feature — SOURCED [D-A8] (ftg-posts-a.md, comments of 79527117).
- **Onboarding:** a user guide with one page per tool group and GIFs — SOURCED [D-S12]; the manual editor sits behind
  an "edit settlement layout" button — SOURCED [D-S12].
- **Praise:** "I can use the generation's broad strokes or get super specific whenever I want! Other tools are
  basically one or the other" (patron, 2026-05) — SOURCED [D-A10]; a patron: Wonderdraft and Inkarnate "took 8× effort
  and gave you 20 % of the function" (2025-02) — SOURCED [D-A9].
- **Complaints (negation run):** constrained re-roll of a person with **locked fields** was "one of the most requested
  features" (2024-04-02) — SOURCED [D-A9]; a user rejected district re-roll because it destroys hand-authored content
  (2025-03-06) — SOURCED [D-A9]; a request to see **three candidate layouts** before populating was refused, re-roll
  offered instead (2025-05-13) — SOURCED [D-A9]; no density control in area regeneration, and regenerated blocks come
  out denser than the original (2026-05) — SOURCED [D-A10]; the Regenerate-area docs concede "the generator doesn't
  know which ones you are happy to have edited" — SOURCED [D-S13].
- **Lesson for our toolkit:** FTG's users asked for exactly `hold` (lock what I made, re-roll the rest) and for
  variations before commit; its confirm-the-consequences dialog is worth copying and its "cannot be undone"
  regeneration is the thing to avoid.

### E. Virtual-tabletop scene editors and export

#### E1 Foundry Virtual Tabletop (Foundry 13/14 era)
- **Audience · price · platform** (dated): Self-hosted VTT for GMs. USD 50.00 one-time licence, perpetual, includes all future updates (page undated; fetched 2026-09-27) SOURCED [E-S1]. Desktop app for Windows, macOS and Linux (bundles a light server plus a Chromium browser) or a headless Node server; players connect with any modern browser SOURCED [E-S39]. Not on Steam: storesearch "Foundry Virtual Tabletop" returned 0 items (2026-09-27) SOURCED [query log]. Skews technical: Wargamer (2023) credits deep customization at the cost of a much steeper learning curve (as summarised on Wikipedia) SOURCED [E-S50].
- **Core interactions** (hands → derived):
  1. Pick a background image → Foundry derives the scene's width and height from it; the GM sets grid size in px (default 100, minimum 50), padding, a background offset X/Y, and can use a Grid Alignment tool for pre-gridded art SOURCED [E-S4].
  2. Walls: choose one of seven wall presets (normal, terrain, invisible, ethereal, door, secret door, window) and click-drag segments; Ctrl chains segments; Alt-click also selects the walls directly connected to its endpoints; double-click sets movement / light / sight / sound restrictions (None, Normal, Limited, Proximity, Reverse Proximity), direction (both, left, right = one-way) and door state (closed, open, locked) SOURCED [E-S2].
  3. Lights: click-drag sets centre and radius → Foundry splits it evenly into bright and dim; walls that block light clip it; a darkness-activation range makes a lantern light only at night SOURCED [E-S3].
  4. Import a Universal VTT file with the Universal Battlemap Importer module → one new scene with image, walls, doors/windows and lights SOURCED [E-S5, E-S6].
  5. Right-click a scene → Export Data / Import Data writes or reads one scene JSON (import overwrites the target scene) SOURCED [E-S4].
- **Constraints, snapping, magnetism, mistakes**: Wall endpoints snap to an adaptive sub-grid (50 px grid = quarter cells, 100 px = eighths, 200 px = sixteenths); "Force Snap to Grid" snaps to cell corners instead; lights snap to the grid unless Shift is held SOURCED [E-S2, E-S3]. Ctrl+Z is "Undo Canvas Operation" SOURCED [E-S30]; undo depth not found (query: "Foundry VTT undo Ctrl+Z walls deleted history limit"). A one-click "Clear Walls" button exists SOURCED [E-S2]. Changing grid size or padding after detailing displaces walls, lights and tiles; the docs say "It is recommended you decide on grid size and set it before" adding detail SOURCED [E-S4]. Built-in world backups and full snapshots (Foundry 11.311+) SOURCED [E-S32]; auto-save behaviour not documented in pages read — not found.
- **Presets, templates, stamps, starting points**: The seven wall presets plus "Clone Wall" (repeat the last wall's settings) act as stamps SOURCED [E-S2]; door animation presets (ascend, descend, slide, swing, swivel) with bundled Forgotten Adventures door art SOURCED [E-S2]; light animation presets SOURCED [E-S3]; Adventure documents bundle scenes, actors and journals for distribution SOURCED [E-S31].
- **Labelling**: Scene "Grid Scale" is free text used only in measurement tooltips SOURCED [E-S4]; the v14 scene schema carries `notes` (map pins) and `drawings` collections SOURCED [E-S33]; map-label workflow not researched further — not found.
- **Layers and zoom**: Separate Walls and Lighting layers; the Walls layer colour-codes types (yellow normal, green terrain, cyan invisible, magenta ethereal; doors purple/light-green/red by state) SOURCED [E-S2]. Foundry v14 adds native multi-level scenes: each Level has its own background/foreground image and an elevation band (docs example: a cabin's basement and ground floor) SOURCED [E-S33, E-S34].
- **AI assist**: None in core found. The package listing shows "Zero AI" / "Contains Zero AI" on the importer, and the site footer links an "AI Content Policy" SOURCED [E-S5, E-S1]. Non-AI auto-wall tools are third-party: Dungeon Channel's 2021 tool builds walls from a solid-colour floor/wall layout, cutting tracing "from potentially hours to just a couple of minutes" (Patreon-gated) SOURCED [E-S38]; the importer README lists AutoWall as a UVTT producer SOURCED [E-S6].
- **Onboarding** (first five minutes): The Knowledge Base is reference-style, one article per tool, each control named by its icon INFERRED (from E-S2..E-S4). A 2023 community guide says configuring Foundry can easily take hours and that you must self-host or pay a host SOURCED [E-S49].
- **Praise**: Comic Book Resources (2021-12-30) called Foundry an "underrated gem" and praised its lighting engine SOURCED [E-S50]. A Dungeondraft guide says of UVTT import into Foundry: "all of that is instantly generated according to your map" SOURCED [E-S9].
- **Complaints** (negation searches → findings): "Foundry VTT drawing walls tedious hours per map" → tracing framed as hours of work [E-S38]; "Foundry VTT grid doesn't line up with map image alignment problem" → itch.io buyers trading alignment workarounds (2023-02-04) SOURCED [E-S37], and a buyer whose map's stated 80 px grid "didn't line up properly across most of the map" while 70 px did (2025-03-07) SOURCED [E-S41]; "Foundry VTT steep learning curve too complicated for new GMs" → the Wargamer point above [E-S50] and a 2023 community post calling Foundry "far from the easiest option on this list to work with", prone to breaking between versions and unreliable with backups SOURCED [E-S49]; "reddit FoundryVTT walls take forever every map tracing walls" → no Reddit thread returned (itch.io results only); "Universal Battlemap Importer walls misaligned offset dd2vtt import problem Foundry" → only vendor how-to snippets naming a pixels-per-grid mismatch as the usual cause — snippet only (not fetched).
- **Lesson for our toolkit**: Foundry's own docs warn that changing the grid after walls exist displaces them, so PLAT must export the grid (pixels per cell, origin) as data alongside the walls, never leave it to be re-measured from the picture. INFERRED

#### E2 Roll20
- **Audience · price · platform** (dated): Browser-based VTT with iPad and Android apps that are player-focused and have fewer features SOURCED [E-S18]. Not on Steam: storesearch "Roll20" returned only an unrelated DLC (2026-09-27) SOURCED [query log]. Tiers Free, Plus, Pro, Elite. Plus USD 5.99/month or 59.99/year and Pro 10.99/month or 109.99/year from 2021-07-01 (EN World, 2021-05-01) SOURCED [E-S17]. Elite launched 2025-10-21 SOURCED [E-S15] at USD 150/year (GeekNative, 2025-10-22) SOURCED [E-S16]; Roll20 lists "Dynamic Lighting and Map Layers" and Mod Scripts (API) as Pro benefits SOURCED [E-S15]. 2026 prices not verified: roll20.net/pricing is script-rendered, and app.roll20.net/why-subscribe-to-roll20 and wiki.roll20.net returned Cloudflare challenges or 403 on 2026-09-27 — not found.
- **Core interactions** (hands → derived):
  1. Page menu → "Upload Background" with an image, animation or UVTT file (.uvtt/.dd2vtt/.df2vtt) → Roll20 builds a new page with the image on the Map layer and walls, doors, windows and lights on the Dynamic Lighting layer (from 2026-07-16) SOURCED [E-S11].
  2. Align to Grid, pre-2026 flow: zoom to 150%, right-click → Advanced → Align to Grid, trace a 3×3 box over the art's grid by hand, then nudge or rescale SOURCED [E-S12]. A new three-step aligner entered beta on 2026-08-19 SOURCED [E-S12]; Owlbear's developer says its steps (Anchor, Scale, Fine Tune) copy Owlbear's Offset/Size/Refine — a competitor's claim SOURCED [E-S23].
  3. Dynamic Lighting: draw barriers on the DL layer with polygon/line tools, place doors, windows and lights, then switch on DL and player vision; the maker notes that each of these tools lives in a different place SOURCED [E-S13].
  4. Dungeon Scrawl, Roll20's free map maker, syncs live to a connected page with no export step; its UVTT maps import with lighting already set up SOURCED [E-S11, E-S13].
- **Constraints, snapping, magnetism, mistakes**: A DL barrier moves only as one object and cannot be adjusted once placed; one wrong point means deleting and redrawing it; vertex editing, per-segment editing and snap/unsnap are planned, not shipped (maker, 2026-09-16) SOURCED [E-S13]. Ctrl+Z can undo an immediate deletion, and a Pro-only Rollback keeps daily save states for seven days — snippet only (help.roll20.net blocked) [E-S44]. UVTT limits: one map per file (a multi-level dungeon is one file per floor), static images only, and only the image counts against storage SOURCED [E-S11]. Per-tier upload caps of 20/50/100 MB (Free/Plus/Pro, "as of late February 2024") — snippet only [E-S45].
- **Presets, templates, stamps, starting points**: The page menu offers random dungeon generation via Dungeon Scrawl; marketplace creators such as Czepeku now ship every map as UVTT SOURCED [E-S11].
- **Labelling**: not found (the fetched pages E-S11..E-S13 do not cover map text labels).
- **Layers and zoom**: Map layer (art) and Dynamic Lighting layer (walls, portals, lights); a Map Layer Hotbar shipped in August 2026 and a DL hotbar is in design SOURCED [E-S13]. Free users who upload UVTT get the image and lighting data placed but see only the static map; the data activates if they upgrade SOURCED [E-S11].
- **AI assist**: None found. Roll20 calls UVTT import its first step into auto-detected Dynamic Lighting, meaning data carried over from the map maker rather than inference SOURCED [E-S13].
- **Onboarding** (first five minutes): The maker says a newcomer on staff needed several hours to learn the Dynamic Lighting components, and promises a more guided path from blank page to finished setup plus a player-view preview SOURCED [E-S13] (planned, not shipped).
- **Praise**: PC Gamer (2017, via Wikipedia) credited Roll20 with "a clean mapping interface" SOURCED [E-S18]. Maker-reported: very positive feedback on the August 2026 Map Layer Hotbar, and UVTT import described as an enormous time saver SOURCED [E-S13].
- **Complaints** (negation searches → findings): The maker's own survey found most GMs say "setting up a Dynamic Lighting map takes too long and is unintuitive" SOURCED [E-S13]; the maker says the old aligner has "a less-than-stellar success rate", and quotes GMs who end up with two overlapping grids or turn grid opacity down to hide the mismatch SOURCED [E-S12]. "Roll20 dynamic lighting walls frustrating hand-trace complaints forum" → forum threads about jagged Updated Dynamic Lighting edges, seeing through walls and lag from complex or freehand barriers — snippet only (threads not fetched) [E-S48]. "Roll20 UVTT upload portals wrong windows doors after upload problem 2026" → the maker's caveat that portal accuracy depends on the source tool [E-S11], and a 2023 thread where every Dungeondraft window imported as a door [E-S14] (details in E4).
- **Lesson for our toolkit**: Roll20 itself now names hand-traced lighting as the chief pain and one-file UVTT import as the cure, so PLAT's battle-map export must carry walls, doors, windows and lights as data. INFERRED

#### E3 Owlbear Rodeo (the casual comparator; 2.x)
- **Audience · price · platform** (dated): Browser VTT deliberately limited to maps, tokens and fog; players need no account (SlyFlourish 2020-11-23; Side Passages 2023-04-24) SOURCED [E-S51, E-S52]. Not on Steam: storesearch "Owlbear Rodeo" returned 0 (2026-09-27) SOURCED [query log]. Plans: Nestling (free), Fledgling, Bestling SOURCED [E-S27]. Prices when the 2.0 model was announced: Nestling free with 100 MB, Fledgling USD 3.99/month or 39.99/year (5 GB), Bestling 7.99/month or 79.99/year (10 GB) (dev log 2022-05-26) SOURCED [E-S28]. Current prices not verified: the live pricing page returned 403 and its Wayback copy (2026-07-13) has no static text — not found; a search snippet says Nestling now offers 200 MB — snippet only. Built by a team of three (2026-08-24) SOURCED [E-S23].
- **Core interactions** (hands → derived):
  1. Drop a map into the Scene Importer → a visual editor previews it; the grid colour is picked automatically from the map's brightness SOURCED [E-S26]. The grid is set by rows × columns, or by putting e.g. "49x28" in the file name SOURCED [E-S25].
  2. Alignment tool (2026-05-07): Offset (drag an anchor that turns into a magnifier with a crosshair shaped like the grid), Size (drag to match one cell), Refine (nudge at any cell corner to remove drift where you see it) SOURCED [E-S20].
  3. Fog: rectangle, polygon, circle, brush, triangle and hexagon modes; single-layer mode computes non-overlapping shapes, so adjacent rooms can be dragged roughly; Fog Fill covers the infinite canvas; select a room and Cut to reveal it; Fog Preview shows the player's view SOURCED [E-S24].
  4. Forecast (2.4, 2026-05-23): one button fogs a whole battle map by computer vision; a Slice tool repairs missed rooms; Fit / Trim / Join / Overlay operations and Shape Snapping refine shapes SOURCED [E-S19].
  5. Dynamic Fog extension (first-party, free, open source): walls are created automatically from the fog shapes the GM already drew; a Door tool is dragged along a room edge; lights attach to tokens SOURCED [E-S22].
- **Constraints, snapping, magnetism, mistakes**: Scenes have subtle grid snapping by default, and maps are locked by default so they are not moved by accident SOURCED [E-S25]; Shape Snapping works even with grid snapping off SOURCED [E-S19]. Images over 67 megapixels were refused before 2.3; 2.3 tiles images up to 144 megapixels SOURCED [E-S21]; Storage Saver (2.4) converts uploads to WebP in the browser and auto-shrinks over-limit images SOURCED [E-S19]. Undo depth and recovery not found (fetched docs E-S24..E-S26 do not mention undo; no separate query run).
- **Presets, templates, stamps, starting points**: Starter Sets in the Asset Manager, including a Tutorials Starter Set and creator maps (Czepeku) SOURCED [E-S24]; maps live outside scenes, so one map can be reused across scenes SOURCED [E-S26].
- **Labelling**: not found (fetched docs cover fog, alignment and scenes only).
- **Layers and zoom**: Infinite canvas SOURCED [E-S24, E-S26]; tiled, multi-resolution rendering loads only the visible tiles of a big map SOURCED [E-S21].
- **AI assist**: Forecast is a purpose-built computer-vision pipeline, launched in beta for the Bestling tier, and presented with manual repair tools because it will not always catch every room SOURCED [E-S19]. Legacy v1.6 (2020) announced automatic grid detection by an in-browser neural network — snippet only [E-S46]; the 2.x docs (June 2026 copy) describe manual controls and the file-name convention, with no auto-detection SOURCED [E-S25]. The developer's 2026-08-24 post is sharply critical of generative-AI companies' use of training data SOURCED [E-S23].
- **Onboarding** (first five minutes): The docs teach by worked examples with a follow-along starter scene SOURCED [E-S24]. The developer concedes the old transform tool "doesn't do a good job teaching you how to use it" SOURCED [E-S20].
- **Praise**: SlyFlourish (2020-11-23): "I really just want a map and tokens" — which Owlbear provides with no login SOURCED [E-S51]. Side Passages (2023-04-24): the basic interface makes uploading a map easy, and the on-screen drawing tools are easy to find and use SOURCED [E-S52].
- **Complaints** (negation searches → findings): "Owlbear Rodeo too limited missing features complaint dynamic lighting" → only maker pages (walls and lights existed only through third-party extensions until 2.3) SOURCED [E-S22]; "Owlbear Rodeo frustrating lost scene storage limit complaint reddit" → nothing relevant found. From the independent reviews: grid alignment and fog are hard to figure out at first, and users of full-featured VTTs will miss features SOURCED [E-S51]; alignment needed a tutorial video, and the original version kept a tabletop for only 24 hours SOURCED [E-S52]. The maker concedes that even with good tools "it will always take a lot of time to trace each room" SOURCED [E-S19].
- **Lesson for our toolkit**: Owlbear derives walls from room shapes the GM already drew and reads the grid from the file name, so PLAT can give casual users the same zero-effort path by exporting room polygons and naming files "<columns>x<rows>". INFERRED

#### E4 Export formats — Universal VTT, Foundry scene/adventure JSON, and what a map generator must export
(Adapted bullets: this record covers formats, not a tool.)
- **Universal VTT: origin and shape**: Created by Megasploot, the maker of Dungeondraft and Wonderdraft; .dd2vtt, .df2vtt and .uvtt are the same JSON file under three extensions SOURCED [E-S8]. "The map itself is a single flat image": no animation and no separately selectable map objects SOURCED [E-S8]; one map per file, so a multi-floor building is one file per floor SOURCED [E-S11].
- **Fields** (all positions and sizes in grid squares) SOURCED [E-S8], confirmed field-for-field in a real sample file [E-S10] and in the Foundry importer's code [E-S6]:
  - `format` — decimal version (sample 0.3; the importer writes 0.2 when stitching files).
  - `resolution.map_origin {x,y}` (usually 0,0; sample 2,1), `resolution.map_size {x,y}` in squares, `resolution.pixels_per_grid` integer (sample 256).
  - `line_of_sight` — array of wall polylines, each an array of `{x,y}` points.
  - `objects_line_of_sight` — same shape, for object outlines; the Foundry importer adds them as walls only when its "object walls" option is on SOURCED [E-S6].
  - `portals` — `{position{x,y}, bounds[two {x,y}], rotation (radians), closed (bool), freestanding (bool)}`.
  - `environment` — `{baked_lighting (bool), ambient_light (hex colour)}`.
  - `lights` — `{position{x,y}, range, intensity, color (hex), shadows (bool)}`.
  - `image` — base64 PNG or WebP. Arkenforge also writes optional `software` and `creator` fields SOURCED [E-S8].
- **How importers actually read it** (from the Foundry importer's source, v6.1.1) SOURCED [E-S6]: wall and portal points become pixels as (point − map_origin) × pixels_per_grid; `closed: true` becomes a door that blocks sight and light, `closed: false` becomes a proximity "window" (unless a setting makes every portal an openable door); a light's `range` in squares times the system's grid distance becomes the dim radius, with bright at half; `color` loses its first two hex digits, so colours must be 8-digit AARRGGBB; the image type is sniffed from the base64 bytes; images wider or taller than 11,000 px (or over 11,000² px in area) make the importer lower pixels-per-grid with a warning, and it refuses below 10. Owlbear's community importer creates walls, doors and lights for its Dynamic Fog extension and adjusts DPI from the grid size SOURCED [E-S29]. An AI-agent-written product blog (2026-09-20, low weight) reports the same colour and range behaviour and a generator that derives walls from room boundaries SOURCED [E-S36] — its Foundry claims match E-S6.
- **Known format ambiguity**: "The UniversalVTT Format doesn't distinguish between doors and windows"; importers infer a window only from `closed: false`, so Dungeondraft users saw every window arrive as a door (Roll20 forum, June–August 2023) SOURCED [E-S14]. Roll20 still warns in 2026: "Portal accuracy depends on the source tool." SOURCED [E-S11].
- **Producers** SOURCED: Dungeondraft (.dd2vtt), DungeonFog (.df2vtt), Arkenforge (.uvtt), Dungeon Alchemist (.dd2vtt), Mapforge (any of the three) [E-S8]; AutoWall [E-S6]; Dungeon Scrawl [E-S13]; map sellers such as Czepeku [E-S11].
- **Consumers** SOURCED: Foundry through the Universal Battlemap Importer module (v6.1.1, verified for Foundry 14; not native) [E-S5, E-S8]; Roll20 natively since 2026-07-16, uploadable on every tier though Free users see only the static map (previously a Pro/Elite Mod Script) [E-S11]; Fantasy Grounds Unity natively; MapTool (.dd2vtt); D20Pro and EncounterPlus (undocumented) [E-S8]; Arkenforge (imports and exports) [E-S8]; Owlbear Rodeo through the community "Scene Importer" extension, which lists .uvtt and .dd2vtt but not .df2vtt (repository created 2025-06-02, updated 2026-08-26, 0 stars) [E-S29].
- **"UVTT v2"**: universalvtt.org hosts a "UVTT v2.0.0-rc2" proposal (a multi-layered relational spatial format with JSON schemas) from a GitHub user's repository, under self-described initiative and consortium names; it is not the format's originator SOURCED [E-S7, E-S8]. No importer adopting v2 was found — not found (queries: the two Universal VTT format searches in the log).
- **Foundry scene JSON and Adventures**: Right-click Export Data / Import Data moves one scene as JSON SOURCED [E-S4]. The v14 Scene schema holds width, height, padding, shiftX/shiftY, grid, environment, fog, walls, lights, tokens, tiles, drawings, notes, regions, sounds and an embedded `levels` collection SOURCED [E-S33]; each Level carries background/foreground image paths and an elevation band SOURCED [E-S34]. Images are referenced by file path or URL, not embedded SOURCED [E-S4]; Adventure bundles also leave media files out SOURCED [E-S31]; hence Owlbear's importer cannot build a scene from a standalone Foundry JSON and asks for a module ZIP instead SOURCED [E-S29]. Because v14 moved backgrounds into Levels, a Foundry JSON export is tied to a Foundry version INFERRED (from E-S4 against E-S33/E-S34).
- **The reference town generator's Foundry module**: It exports no image, walls or grid. It overlays the generator's own website in a full-window iframe on an empty 5000 × 5000 Foundry scene with grid type 0 (one unit per metre) and exchanges building/person/pin events by message SOURCED [E-S35] (Maps findings file, from the module's MIT code); grid type 0 is Foundry's gridless setting INFERRED (from Foundry's constants, not checked this session).
- **Size reality for cities**: Owlbear describes the trend toward "a 100x70 mega city map with a playable 5ft grid for every building", about 140 megapixels at 140 DPI; its ceiling is 144 megapixels SOURCED [E-S21]. The Foundry importer caps at 11,000 px per side SOURCED [E-S6], which at 140 px per square is about 78 squares (390 ft at 5 ft per square) INFERRED (arithmetic). A whole city at battle-map scale therefore cannot ship as one UVTT file INFERRED.
- **Demand and complaints when export is missing**: A 2021 itch.io request asked a map editor for a wall/door JSON beside the PNG so Roll20/Foundry scenes arrive already walled SOURCED [E-S40]; hand tracing is the pain Roll20's survey names (E2) and Foundry Hub measured in hours (E1); stated-versus-actual grid-size mismatches break alignment [E-S41, E-S12].
- **What PLAT must export (checklist)** INFERRED from all of the above: (1) a .dd2vtt per playable area (widest acceptance: Foundry module, Roll20, Owlbear importer, FGU, MapTool); (2) an image rendered at an exact integer pixels-per-grid with `map_origin` 0,0 and `map_size` = image pixels ÷ pixels-per-grid, offering 70/100/140/200, the sizes Foundry says most maps use SOURCED [E-S4]; (3) walls as polylines derived from building and wall footprints, doors `closed: true`, windows `closed: false`, lights with 8-digit AARRGGBB colours and range in squares; (4) a size guard of 11,000 px per side and 144 megapixels, with a city exported as district or street crops plus a low-resolution overview; (5) a plain PNG named "<columns>x<rows>" (Owlbear) and an option to omit the drawn grid so it cannot fight the VTT's grid; (6) one file per floor now, with Foundry v14 Levels as a later target.
- **Lesson for our toolkit**: Export one .dd2vtt per playable area, with an image at a stated integer pixels-per-grid and walls, doors, windows and lights as data, never a bare picture. INFERRED

#### Cross-tool patterns (E)
- Strongest praise pattern: one-file import that arrives already walled and lit (the Dungeondraft guide on instant generation [E-S9]; Roll20 calling it an enormous time saver [E-S13]; Owlbear deriving walls from fog shapes [E-S22]) SOURCED.
- Strongest complaint pattern: hand work between map and play — tracing walls or fog, and aligning a pre-drawn grid; all three makers name it as their own top pain [E-S12, E-S13, E-S19, E-S20] SOURCED.
- Casual design cue: Owlbear hides structure until needed (static fog as "pieces of paper", filename grid, a magnifier during alignment), while Foundry exposes every restriction field; PLAT's clerk and dry-run preview should keep Owlbear's surface and Foundry's data underneath INFERRED.
- AI climate: Foundry's package site labels "Zero AI" content and Owlbear's developer is openly hostile to generative-AI companies [E-S5, E-S23] SOURCED; an AI clerk that emits standard data (walls, portals) with a preview is likelier to be accepted than generated art INFERRED.

## Part II — cross-cutting findings

How to read this part. Every rule below is the lane's reading (INFERRED) of the SOURCED facts in Part I, and names the
records and source ids it rests on. "Weight" counts independent tools, not pages: several pages about one tool count
once, and a claim that traces to one origin counts once however often it is repeated (the Inkarnate layer-ordering
line is the worked example: one uncited page, echoed — A1 check 1). Evidence grades used in the ranking: a maker's own
docs, changelog or code; a Steam review corpus read through the API (with helpful counts); mod subscriber counts; dated
threads; dated press. Listicles and search snippets are not counted.

### §1 UX patterns that make casual users succeed (ranked by weight of evidence)

| rank | pattern | tools that evidence it (independent) | strongest sources | counter-evidence found |
|---|---|---|---|---|
| 1 | **A gesture shows its derived result at once.** Draw a road and plots appear; drag a room and walls join; paint land and a coast forms; draw a path through a wall and a door appears. | CS1, CS2, Dungeondraft, Dungeon Scrawl, Dungeon Alchemist, Wonderdraft, Inkarnate, Tiny Glade, Townscaper, Manor Lords, Foundation (desire paths), Owlbear (walls from fog) — 12 | B2-S4, B2-S6, A1-S39, A1-S55, C-S7, A1-S19, B1-S6, B1-S24, B1-S52, B1-S82, E-S22; top positive reviews B1-S13 (plot tool, 2,670 helpful), C-S5 (57 of 300 DA positives cite speed) | none against the pattern itself; the complaints are about what the derivation decides (§3) |
| 2 | **Never lose work: total undo, autosave after every action, visible history, restore points.** Where it exists it is quietly relied on; where it is missing it is the loudest complaint. | present: Tiny Glade, Inkarnate 2.0, Dungeon Scrawl (free undo), Townscaper, Worldographer; missing and complained about: CS1, CS2, Manor Lords, Azgaar, Wonderdraft, Dungeon Alchemist, MFCG, FTG — 13 | B1-S44 (save = replayable action history), A1-S3 (2.0: full history on screen, autosave, snapshots), A1-S10 (autosave request, 196 upvotes), B2-S10 (Undo It! 1.41M, Move It 4.70M lifetime subscribers), B2-S9 (a new player saves "before EVERY SINGLE CLICK"), A2-S37/S38 (5 hours, "weeks" lost), D-S4 (18 of 392 MFCG board topics about saving or reloading work) | Anno 1800: no undo and no demand for one, because blueprint planning is free (B2-S47, B2-S48, B2-S55) — undo matters most where a gesture commits or destroys at once (B2, INFERRED) |
| 3 | **Protect what the author made: lock or keep, scoped re-roll, stable neighbours.** | FTG (field-locked re-roll "one of the most requested features"), Azgaar (element locks), MFCG (per-ward re-roll), Village (per-layer re-roll), Dungeon Alchemist (objects-only refresh), Dungeon Scrawl (bulk lock; replace-map warning), Tiny Glade (stability over re-roll), Worldographer (stage tags), Midjourney (region-only edits) — 9 | D-A9, A2-S35, D-S2, D-A5, C-S9, A1-S63, A1-S60, B1-S10, A2-S7, C-S47 | none; the failures are its absence (§2 AP2) |
| 4 | **Preview the derived outcome with counts before commit, and adjust it there.** | Manor Lords (+/− homes before "build"), Anno (free blueprints), Photoshop/Canva/Midjourney (candidates before accept), FTG (confirm-actions list of affected people); asked for where absent: Foundation (house-count indicator), CS2 (grids break unseen), Azgaar (Risk mode) — 9 | B1-S61, B1-S62, B1-S65 (V05), B2-S48, C-S16, C-S28, C-S46, D-A7, B1-S80, B2-S37, A2-S36 | Figma's agent applies edits directly and relies on undo ("duplicate first" to compare) — C-S39; a working alternative for designers, not evidence that casual users prefer it |
| 5 | **Everything derived stays touchable afterwards: handles, move, delete, pin.** | Tiny Glade (movable clutter, focus handles), Dungeon Alchemist (every object editable), watabou (draggable notes), CS1 (Move It the top mod), Anno (multi-move "finally"), FTG (move, swap, paint); asked for where absent: MFCG (move labels, delete districts, add roads), Dungeondraft (walls cannot be moved), Manor Lords (plots frozen after build) — 9 | B1-S39, B1-S40, C-S11, D-A6, B2-S10, B2-S50, B2-S51, D-S12, D-S2, D-S4 (28 of 392 topics ask for direct placement or editing), A1-S38 #52, B1-S59 | none |
| 6 | **Start from a finished result, never a blank page.** | Azgaar (random map on open), MFCG (Enter), Worldographer (defaults first), Dungeondraft (Map Wizard by default), Dungeon Scrawl (Random Dungeon for the blank page), Tiny Glade (starter builds), Inkarnate (cloneable templates), Wonderdraft (Landmass Wizard first) — 8 | A2-S28, A2-S40 (V14), D-S1, A2-S4, A1-S40, A1-S60, A1-S61, B1-S35, A1-S3, A1-S23; power users generate in MFCG, then finish in CC3+ (D-S15) | Townscaper opens on empty ocean and works — it has one verb (B1-S29, B1-S31) |
| 7 | **Strokes and areas, not per-cell clicks; numbers shown while drawing.** | Townscaper (click-per-block its loudest complaint), Tiny Glade (shapes added because wall-by-wall was cumbersome), CS1 (brushes praised, bigger asked), CS2 (sized brush dropped; Grid mode praised; slope readout), Foundation (brush size/shape), Inkarnate (Area/Density for buildings), CS1 mods (Precision Engineering 4.32M) — 7 | B1-S25, B1-S26, B1-S37, B2-S19, B2-S11, B2-S28, B2-S40, B2-S24, B2-S36, B1-S79, A1-S3, B2-S10 | no source asks for a form instead of a gesture (B2 check 2; A1 check 3; A2 cross-cut) |
| 8 | **Learn by doing: one-time hints at first use, a worked example, discoverable verbs.** | Tiny Glade (undo hint that completes when you press undo), Manor Lords and Foundation (moved to first-use tutorials), CS1 (help cards), Townscaper (one verb, no tutorial needed); failures: MFCG hidden gestures, Kingdoms Reborn hotkeys on hover only, Anno tutorial weak, Roll20 lighting takes hours to learn — 9 | B1-S35, B1-S55, B1-S57, B1-S75, B2-S18, B1-S31, D-A4, D-S11, B2-S71, B2-S56, E-S13 | tutorials that keep reappearing annoy veterans (B2-S77) |
| 9 | **A few named choices first (a style, a theme, a kind); numbers later.** | Inkarnate, Wonderdraft, Dungeon Scrawl (style first), Dungeon Alchemist (theme per room), Figma First Draft (four libraries), Azgaar templates; failures: Village "Some" vs "Many", Azgaar's "dizzying array of options" — 8 | A1-S15, A1-S23, A1-S51, C-S2, C-S36, A2-S41 (an expert's opinion that users want named templates), D-A5, A2-S40; MFCG's maker against count parameters: "nobody says 'it's a town of 500 houses'" (D-S9) | Azgaar's and FTG's option depth is praised by committed users (A2-S41 "tremendous amount of control"; D-A10) |
| 10 | **Hand the next tool data, not a picture.** For VTT users: one file that arrives walled, lit and on the grid. | Roll20, Foundry, Owlbear, Dungeondraft, Dungeon Alchemist, Canva (Magic Layers) — 6 | E-S11, E-S13 (V31), E-S9, E-S22, E-S4 (V35), A1-S43, C-S7, C-S31 (V25) | none |

Why these work (the mechanism, INFERRED): each removes a step where a casual user must hold the tool's model in their
head. A derived result shown at once replaces imagination; a preview replaces prediction; undo and autosave replace
caution; locks replace vigilance; handles replace re-drawing. The patterns that failed their users (§2) all add one of
those burdens back.

### §2 Anti-patterns that defeat casual users (ranked likewise)

| rank | anti-pattern | tools | strongest sources |
|---|---|---|---|
| AP1 | **Lost work.** No undo, no autosave, edits that do not persist, and actions labelled "cannot be undone". | CS1, CS2, Manor Lords, Azgaar, Wonderdraft, Dungeon Alchemist, Dungeon Scrawl (autosave paid-only), MFCG, FTG — 9 | B2-S8, B2-S16 (209 helpful), B2-S31..S33, B1-S71, B1-S72, A2-S37, A2-S38, A1-S22, C-S4, C-S9, A1-S49, A1-S66 (snippet), D-S5, D-S6, D-S10, D-S11, D-A10 ("This action cannot be undone"), A2-S7 (Worldographer's two irreversible actions) |
| AP2 | **Derivation that overwrites or decides what the author cares about, unseen.** Global re-rolls, silent restyling, a derived grid that fractures when a nearby road changes, paint-and-hope placement. | Azgaar (Risk mode re-made hand-drawn rivers), Dungeon Alchemist (re-populating deletes stairs; "the AI is constantly interfering"), FTG (district re-roll destroys hand content), CS2 (zone grids break; 692-helpful review), Dungeondraft (every wall restyled on merge), Dungeon Scrawl (replace-map), Foundation (house sites: "hope for the best"), Tiny Glade (fighting the clutter randomiser), MFCG (reroll "dozens of times" for usable districts) — 9 | A2-S36 (V11), C-S4, D-A9, B2-S23, B2-S37, A1-S39 (V20), A1-S60 (V21), B1-S18, B1-S80, B1-S8, D-S8 |
| AP3 | **Command grammar, modes and hidden gestures.** Command-then-object-then-"Do it"; right-click to finish; snaps that hide free placement; sheets; shortcuts that "may not be obvious". | CC3+/City Designer 3 (the counter-example, confirmed from dated sources 2012-2022), MFCG, Kingdoms Reborn, Roll20 Dynamic Lighting, Foundry — 5 | A2-S52 (V15), A2-S54, A2-S55, A2-S19, A2-S20, A2-S57, D-A4, D-S14, B2-S71, E-S13, E-S50 |
| AP4 | **Per-cell input where the author thinks in strokes.** | Townscaper, Tiny Glade (before shapes), CS2 (one-cell paint), Kingdoms Reborn (one-by-one, 90-degree placement) — 4 | B1-S25..S27, B1-S37, B2-S28, B2-S76 |
| AP5 | **The option wall as the front door.** | Azgaar, Village, FTG (a create form and a regenerate form with dozens of parameters) — 3; mixed, since committed users praise the same depth | A2-S40, A2-S42 (competitor; weak), D-A5, D-A10 |
| AP6 | **Paying for, or being pushed towards, what users did not ask for.** Upsell pop-ups, price rises justified by AI, credits spent repairing AI output. | Dungeon Scrawl, Canva, Inkarnate, Figma — 4 | A1-S59, C-S30 (V26), A1-S5, C-S40 |
| AP7 | **Layer bookkeeping exposed to the user.** | FTG (docs: a new texture "might be behind another layer"), Wonderdraft, Dungeondraft, Inkarnate (learning curve; the "main frustration" ranking is unsupported) — 4, weak | D-S12, A1-S26, A1-S45, A1-S9, A1-S6 |
| AP8 | **Chance-gated tools.** Buildings behind random card draws read as "a terrible menu" and players route around them. | Kingdoms Reborn — 1 | B2-S78, B2-S79, B2-S70 |

AP1 to AP3 are the three that recur across tool families (map makers, town builders, reference generators); AP4 to
AP8 are real but narrower.

### §3 "The program fills in the rest" — where users are delighted, where they feel a loss of control, and the devices that resolve it

**Delight (SOURCED patterns):** the derivation answers a gesture the user just made — blocks become arches and
gardens (B1-S1, B1-S24), a path through a wall becomes a door (B1-S6), footsteps become roads (B1-S82), plot edges hug
the road (B1-S52), a drawn road grows zone cells (B2-S4), a dragged room gets joined walls (A1-S39), a room is furnished
"instantly" (C-S5, C-S12). Small-scale variety is accepted and even liked: Townscaper's maker splits it explicitly —
the player controls the large shapes, the small ones vary (B1-S24, V02) — and a Tiny Glade reviewer liked being nudged to
let go of some control (B1-S47). Speed of the first result is the most cited praise of Dungeon Alchemist (C-S5).

**Loss of control (SOURCED patterns):** it clusters where the derivation decides **placement or count at a scale the
author cares about** — Foundation's house sites (B1-S18, B1-S80; the wiki says the needed zone size is found "through
experimentation", B1-S77, V07), Tiny Glade's clutter (B1-S8), Townscaper's building type (B1-S3), MFCG's districts and
road exits (D-S2, D-S8), Dungeon Alchemist's furniture rows (C-S4); where **derived work changes without warning** —
CS2 zone grids (B2-S23, B2-S37), Azgaar's rivers (A2-S36), Dungeondraft's wall styles (A1-S39); where **results cannot
be touched afterwards** — Manor Lords plots (B1-S59), Dungeondraft walls (A1-S38 #52), MFCG labels (D-S2); and where
**re-rolls are whole-map** — MFCG's city (D-S8), FTG's district (D-A9), Dungeon Scrawl's replace-map (A1-S60).

**The devices that resolve it, and what each resolves** (SOURCED examples; the pairing is INFERRED):

| device | resolves | examples |
|---|---|---|
| count preview with +/− before commit | "how many will I get?" | Manor Lords homes (B1-S61, B1-S65); Foundation's missing house count is its top control complaint (B1-S80) |
| ghost of what a stroke creates and destroys, plus a list of what moves | "what will this break?" | FTG's confirm-actions dialog (D-A7); absent in CS2, whose top complaint is grids breaking unseen (B2-S37) |
| candidates side by side (three to four), pick one | "I don't like this one" without losing the rest | Photoshop (C-S16), Canva (C-S28), Midjourney (C-S46); an FTG user asked for three candidate layouts before populating and was refused (D-A9) |
| re-roll scoped to a region or a layer | "change this bit only" | MFCG ward re-roll (D-S2), Village tree layer (D-A5), Dungeon Alchemist objects-only refresh (C-S9), Midjourney region edits (C-S47, V29) |
| lock / keep, on by default for what the author declared | "don't touch what I made" | FTG field-locked re-roll (D-A9); Azgaar locks with the tooltip "prevent changes to it by regeneration tools" (A2-S35, V13) — but only for some element types, and Risk mode still re-made hand rivers (A2-S36) |
| stable neighbours: editing one thing does not reshuffle others | "why did that change?" | Tiny Glade stopped a stair edit from reshuffling derived effects (B1-S10) |
| handles on derived items after commit | "let me just move that one" | Tiny Glade focus mode and movable clutter (B1-S39, B1-S40), Dungeon Alchemist objects (C-S11), watabou draggable notes (D-A6) |
| staged derivation with edits between stages | "I want to fix the coast before rivers are placed" | Worldographer's own advice; generated items tagged by stage so a stage can be deleted and re-run (A2-S4, A2-S7, V16) |
| a free planning layer, committed in one sweep | "let me try before I pay" | Anno 1800 blueprints (B2-S48, V10) |

**Where PLAT already stands (INFERRED, against item 101 and the design).** The dry run is the preview; the
disruption-and-fates report is the "what moves" list; `hold` is lock, pin, revert and regenerate-with-keep; locality
(§7.3) is "stable neighbours"; the skeleton file and log are the history. The survey adds three requirements the design
states less sharply: (a) **declared means held by default** — the author should never have to remember to lock a thing
they declared (the Azgaar and FTG failures are opt-in or partial locks); (b) **the count badge** — every area declaration
(quarter, fill, roster) shows in its preview how many plots, households and buildings it will hold, with +/− there;
(c) **a scope on every re-roll** — "re-roll this block / this quarter / trees only", never an unscoped "new city" once
the author has declared anything (that stays the one-click empty-state action only).

### §4 AI assistance for casual users — how it is presented and what earns their trust

**Presentation found (SOURCED).** The image tools present AI as: select a region, optionally type a prompt, receive
several candidates, pick one, keep it on its own removable layer (Photoshop: C-S14, C-S16, V23, V24; Canva Magic Edit:
four candidates, then Done, C-S28; Midjourney: a grid of four, vary or reroll, 24 cheap drafts, C-S46, C-S47). Figma's
2026 agent is the exception: it edits the file directly, with Undo in the chat, and Figma's own tip for comparing is to
duplicate first (C-S39, V28). In the map hobby, Azgaar's assistant is deliberately read-only — it greets users with "I
cannot change maps, but I can teach you how to do it" (A2-S58, V12) — its AI note writer has an Apply button (A2-S59),
and its Omnibar warns that "a regeneration command changes the map" (A2-S33). Familiar, a Foundry module, is the nearest
thing to our clerk: chat builds a scene, a rules engine in code checks every action, refused moves are announced, the
last action can be undone, and destructive operations need confirmation (C-S52, V30; maker's page only — no independent
review found). Dungeon Alchemist's "AI" is rule-based furnishing that lands directly on the map with a re-roll, and no
preview or side-by-side variations were found (C-S2, C-S9).

**What earns trust (SOURCED facts; the reading INFERRED).** (1) Output made of editable parts, never a flat picture —
Canva built Magic Layers in 2026 because flat AI output could not be refined (C-S31, V25); Figma's drafts are editable
components (C-S34); even image-first VTT tools add walls, doors and lights as objects (C-S54, C-S55). (2) Candidates
before commitment (above). (3) A visible record of what made the result — Content Credentials, the model stored with the
layer (C-S14, C-S16), Figma agent chats visible to editors (C-S39). (4) Honest naming and an off switch — Dungeon
Alchemist moved from "AI-powered" (2021) to a no-generative-AI disclaimer (C-S9, C-S2, V22); Figma lets users switch the
on-canvas chat off (C-S39); Canva admins can turn Magic features off (C-S27, snippet). (5) A stable engine — Adobe's
retirement of a preferred model drew complaints; one daily professional user found the new default usable "around 10%"
of the time (C-S21, C-S22).

**What breaks it (SOURCED).** A draft that reproduced a known work — Figma's Make Designs copied Apple's Weather app,
was paused, explained in a public retrospective, and returned under a humbler name (C-S34, C-S35, V27, V37); false-positive
refusals (an Adobe thread with 1,392 replies, C-S19); AI that fights deliberate work (Dungeon Alchemist: "constantly
interfering", C-S4); doubt about the label itself (C-S4, C-S10); being charged for AI the user did not ask for, or for
repairing its mistakes (C-S30, C-S40).

**The audience's climate (SOURCED).** In the tabletop-map hobby, "no AI" is a selling point for several makers:
Inkarnate banned AI-made marketplace assets after a backlash (A1-S5), Foundry labels "Zero AI" packages and requires
prepared package content to be human-made while exempting "algorithms for procedural generation" (C-S63, E-S5),
Owlbear's developer is sharply critical of generative-AI companies' use of training data (E-S23), Roll20's 2026 dungeon generator was reported by the
press as zero AI (A1-S62), and LegendKeeper states it has no generative AI (C-S62). No surveyed tool pairs a rule-based town or city
generator with an AI clerk that emits declarations; the text-to-map generators all return flat pictures (C check T3) —
INFERRED: the niche is empty, and an editable, rule-derived town is the differentiator.

**Consequences for the clerk (INFERRED).** The clerk earns trust by being the opposite of a picture generator: it writes
declarations in our own vocabulary (so it cannot copy a work's pixels, and a known city is emulated as structure, per
J78's clean-room rule), every map-changing reply arrives through the same dry run as a hand gesture — a ghost overlay,
the count badge and the fates list, a one-line reason, up to three variations where the rules allow real alternatives —
and nothing applies until the user accepts. Refusals are spoken with the rule and the closest alternatives (Familiar's
pattern, item 20 (g)). The clerk is labelled as AI, optional, and off by default in the standalone product until the
user opens it; the generator underneath is procedural, which is the distinction this audience's own policies draw.

### §5 Mapping onto the twelve tools and the clerk (all proposals INFERRED)

Each tool: the **gesture**, the **feedback** while and after the hand moves, the **preview and undo**, the
**onboarding** a casual user needs, the **evidence** it rests on, and how it compares with item 101 (g)'s draft (the
Fable manager's, written 18:49 from a first round of sources). No proposal adds a thirteenth tool: "move" and "re-roll
here" are gestures inside existing tools, per item 101 (e).

**T1 `intend` (L0).**
- Gesture: the front door is a finished town, not a form. A row of picture cards for the forms of §7.7's catalogue
  (hill-acropolis, bridge-town, port, confluence, the new citadel-and-port, …), size chips, a walls chip (none / one ring / two rings), one
  wealth slider and an era-and-style card; "Surprise me" dice. Counts and populations only behind "more".
- Feedback: the six candidate towns the design already specifies (§7.8 proxy thumbnails) are the first screen; picking
  one continues that town.
- Preview and undo: every card change is one undo step; changing intent after other declarations runs the dry run and
  lists what would move or be refused, and never wipes a declaration.
- Onboarding: the empty state is a generated town and one line, "Change anything: click it"; a short guided first town
  is offered, not forced, and never re-appears once dismissed (B2-S77).
- Evidence: §1 ranks 6 and 9 (A2-S28, D-S1, A1-S40, A1-S60, B1-S35, A2-S41, D-S9); candidates (C-S16, C-S46).
- Versus (g): agrees; amends the walls control from a slider to a three-way chip (it is discrete) and puts the six
  candidates on the first screen.

**T2 `ground` (L1).**
- Gesture: brush strokes (raise, lower, cliff, flatten) sized with the wheel; coast and river drawn as a curve with
  draggable knots; a harbour basin lassoed.
- Feedback: terrain reshades under the brush; the coast is styled automatically; on release the derived roads and plots
  on the stroke re-flow and a badge says what moved ("3 plots moved, 1 road re-routed"); height and slope shown as numbers
  while painting.
- Preview and undo: one stroke, one undo step. Never a mode question of the kind Azgaar asks on entry (Erase / Keep /
  Risk): declarations are always kept and only the derived fabric re-flows.
- Onboarding: first-open hint, "Paint hills; drag the river."
- Evidence: A1-S19 (V18), A1-S3 (derived coasts); A2-S31 and A2-S36 (V11; Risk mode re-made hand-drawn rivers); B2-S24
  (CS2 slope readout).
- Versus (g): agrees; adds the no-mode rule and the readout.

**T3 `wall` (L1).**
- Gesture: draw a line; it closes when the ends meet; magnetism to crests and to road crossings. Gates appear where roads
  cross; a gate stamp can also be dropped on the wall and slid along it by a grip.
- Feedback: towers and gates as ghosts; the enclosed area tints; a badge "gates 4 · towers 11 · houses displaced 0".
- Preview and undo: commit on release; a wall drawn across built plots shows the displaced houses in the fates list
  before commit, as FTG's confirm-actions dialog does for residents; one undo.
- Onboarding: "Roads through the wall become gates."
- Evidence: A1-S39 (Dungeondraft: walls derived from shapes; doors anchored to walls), A1-S55 (Dungeon Scrawl join or
  separate), B1-S74 (Foundation: gates snap to walls), D-A7, D-S4 ("placing gates?").
- Versus (g): agrees; adds the displaced-houses count.

**T4 `road` (L1).**
- Gesture: drag or click points, with the class picked from a short ring of chips; right-click removes the last point; a
  modifier straightens or snaps the angle; a road drawn over water becomes a bridge.
- Feedback: magnetism to roads and gates; junctions form by themselves; length and angle shown while drawing; frontage
  plots appear as ghosts along the new road.
- Preview and undo: commit on release; a road through built plots shows the fates first; one undo; any road node can be
  dragged afterwards (the move gesture).
- Onboarding: "Drag a road; it snaps."
- Evidence: B2-S4, B2-S5, B2-S24, B2-S36 (CS roads, the most praised tool family); B2-S10 (Move It 4.70M, Precision
  Engineering 4.32M lifetime subscribers); B1-S66 (right-click removes a road point); B1-S54 (Manor Lords: a road across a
  river becomes a bridge); D-S12 (FTG: snap and split at crossings); D-S7 (an MFCG user asks to choose where the big roads
  come from).
- Versus (g): agrees; adds the readout, right-click, frontage ghosts and node dragging.

**T5 `quarter` (L1).**
- Gesture: paint an area with a brush that snaps to roads, or click inside a road-enclosed block to take it whole; then a
  kind card and a typed name.
- Feedback: the area tints; a **count badge** shows the plots, households and landmarks this kind implies at this size,
  with +/− and a density dial right there.
- Preview and undo: ghost with counts, then commit; edges keep handles after commit; one undo; a declared quarter is held.
- Onboarding: "Paint a district, pick what it is."
- Evidence: B2-S80 (CS1 districts painted with a brush that snaps to roads, auto-named, renamable); B2-S81 and B2-S82
  (CS2 moved to corner-node outlines; the complaint that it is harder is snippet-only); D-S12 (FTG click-inside fill);
  B1-S61, B1-S65 (+/− before commit); B1-S80 (Foundation users ask for a house count); B1-S59 (Manor Lords plots frozen
  after build — avoid); D-S8 (MFCG users re-roll "dozens of times" for usable districts).
- Versus (g): agrees; adds the click-inside gesture and handles after commit.

**T6 `place` (L2).**
- Gesture: drop a class stamp (tavern, temple, gatehouse) on a spot, a quarter, a road or a gate, or type a locus ("near
  the north gate").
- Feedback: a ghost footprint at the best lawful site with a one-line reason and two or three faint alternatives; a
  refusal names the rule and the nearest lawful sites.
- Preview and undo: accept or nudge; the placed thing is held; one undo.
- Onboarding: "Drop a tavern near the gate."
- Evidence: A1-S39 (Dungeondraft: a door can only be placed on a wall — a stamp snaps to a valid host); C-S52 (Familiar
  announces refusals); D-S4 (castle and gate placement are recurring MFCG requests); D-S2 (MFCG landmarks by right-click).
- Versus (g): agrees.

**T7 `roster` (L2).**
- Gesture: paste or dictate a list into a visible box in the place tool; each line becomes a card whose class guess can
  be changed.
- Feedback: all sites appear as ghosts in one pass; lines the rules cannot honour are listed with their nearest options.
- Preview and undo: accept all or card by card; the roster is one undo step and each card can be reverted alone.
- Onboarding: the paste box itself, labelled "Paste your list of places" — not a hidden file load: MFCG's landmark list
  load is, in its maker's words, "an obscure way to populate a city" (D-S5), and a user had to ask how it works (D-S2).
- Evidence: D-S5, D-S2; C-S29 (prompt → options → edit by hand).
- Versus (g): agrees; adds the visible paste box.

**T8 `fill` (L3).**
- Gesture: brush density, building mix or greenery over a quarter or a block; drop a square or a park.
- Feedback: buildings re-derive under the brush, along the roads (structured, never scattered); three variations in a
  tray; one density dial.
- Preview and undo: re-roll as often as wanted, but only inside the brushed scope; declared and pinned things never move;
  one undo.
- Onboarding: "Denser here; more gardens there."
- Evidence: A1-S3 (Inkarnate answered city-building pain with an Area/Density brush); A1-S29 (V19: a scatter brush is
  "useless for placing buildings"; the GM wants buildings along roads); C-S9 (objects-only refresh); C-S47 (V29: region
  edits touch only the region); D-A10 (FTG users lack a density control and get denser blocks on regeneration); C-S16.
- Versus (g): agrees; adds "structured along roads" and the scope rule.

**T9 `shape` (L3).**
- Gesture: click a plot or building to enter it (focus mode); split, join, drag corners, set storeys, move the door, paint
  the roof; "revert to derived" on the element.
- Feedback: the site plan re-derives inside the plot only.
- Preview and undo: live; one undo per edit.
- Onboarding: appears only after a click — "Shape this one."
- Evidence: B1-S40 (Tiny Glade right-click focus handles), A1-S39 (Dungeondraft edit points), D-S12 (FTG place, draw,
  move, swap, paint), B1-S74 (Foundation part replacement), B1-S59 (Manor Lords shows the cost of freezing).
- Versus (g): agrees.

**T10 `hold` (L3).**
- Gesture: **declared things are held by default** (a small pin shows it); a lock can be added to any derived thing the
  author comes to like; a lasso plus "keep these, re-roll the rest"; "revert to derived".
- Feedback: held things stay bright while a re-roll ghosts the rest; the fates list names anything that would still move.
- Preview and undo: every re-roll is a dry run with candidates; one undo.
- Onboarding: "Lock what you love" on the first re-roll.
- Evidence: D-A9 (FTG: field-locked re-roll most requested; a district re-roll that destroys hand work was rejected);
  A2-S35, A2-S36 (Azgaar: locks for some element types only; Risk mode); C-S4 (Dungeon Alchemist re-population deletes
  stairs); B1-S47 (Tiny Glade: no lock, a press con); A1-S63 (Dungeon Scrawl bulk lock); A1-S60 (replace-map warning).
- Versus (g): **amends** — (g) has the author apply a lock icon; the evidence supports held-by-default for everything
  declared, with the lock icon for derived things.

**T11 `name` (L4).**
- Gesture: click a label to rename it, drag to move it, select quarters and name the group as a region; one switch for
  leader lines.
- Feedback: labels re-flow around the change.
- Preview and undo: one undo.
- Onboarding: "Names are yours."
- Evidence: D-S2 (MFCG users ask to move labels; the maker: labels "can only be placed automatically"); D-S14 (MFCG click
  to edit text); A1-S24 (Wonderdraft: Ctrl+drag moves a label, Alt+drag rotates); A2-S6 (Worldographer: a label attached
  to a feature moves with it).
- Versus (g): agrees.

**T12 `dress` (L4).**
- Gesture: style cards; a tint toggle; a furniture tray (compass, scale bar, cartouche); drop an image under the map and
  set its opacity to trace; export.
- Feedback: the whole map restyles live; the export dialog previews the crop and the grid.
- Preview and undo: one undo; export never changes the map.
- Onboarding: "Make it yours; export."
- Evidence: A1-S15, A1-S51 (style first); A1-S31, A1-S43, A2-S9 (tracing underlays in Wonderdraft, Dungeondraft and
  Worldographer); E4 (below).
- VTT export, checked against the design's `.dd2vtt` profile (§11): the profile already has exact pixels per square,
  origin 0,0, the grid not drawn into the image, walls from footprints, doors as portals and a size cap (8,192 px, under
  Foundry's importer limit of 11,000 px, E-S6). The survey adds four details: **windows must be written `closed: false`**
  (or left as wall gaps), because the format has no window flag and importers turn closed portals into doors (E-S14,
  V34; the profile's per-storey scenes write portals "from every opening"); **light colours as 8-digit AARRGGBB**, because
  the Foundry importer drops the first two digits (E-S6); **a plain PNG named `<columns>x<rows>`** for Owlbear's grid
  (E-S25, V36); and **grid size fixed before walls** in any Foundry scene JSON (E-S4, V35).
- Versus (g): agrees; adds the four export details.

**The clerk.**
- Gesture: a chat drawer beside the map; suggested first prompts ("a walled harbour town with a temple quarter"); "why is
  this here?" on any element's context menu.
- Feedback: every reply that would change the map arrives as a dry run — ghost overlay, count badge, fates list, a
  one-line reason — with up to three variations where the rules allow real alternatives; refusals give the rule and the
  closest alternatives.
- Preview and undo: nothing applies until accepted; each accepted reply is one undo step, and "undo the clerk's last
  change" is a button in the chat; the transcript is itself a skeleton (item 101 (b)).
- Onboarding: labelled as AI; optional; the generator works fully without it.
- Evidence: §4 (C-S14, C-S16, C-S28, C-S46, C-S52, A2-S58, C-S31, C-S34, C-S39, C-S63, A1-S5, E-S23).
- Versus (g): agrees; adds the refusal pattern, the per-change undo button, and the explicit AI label and opt-in. Where
  Figma's agent applies first and undoes after (C-S39), the clerk previews first — the choice rests on this audience's
  distrust of AI (§4) and on derived changes that can be large; it is a testable call (§6).

### §5b Verdicts on item 101 (f) R1–R12 (the Fable manager's first round), and rules the evidence adds

| rule | verdict | what changes |
|---|---|---|
| R1 one gesture, one visible consequence | CONFIRMED (§1 rank 1, 12 tools) | The phrase quoted as the essay's, "never makes mistakes", is not in it; the essay says everything "remained coherent" (V-S1). Steam counts: "95 % of 10 615" and "97 % of 13 895" are English reviews by Steam purchasers; all-language totals are 21,649 and 24,791 (V-S2, B1-S2, B1-S7). |
| R2 no wrong answers | CONFIRMED verbatim on Tiny Glade's page (B1-S6, V03) | none |
| R3 preview the derived, adjust after | CONFIRMED and sharpened | Manor Lords does preview the home count with +/− before "build" (the one-thread complaint is refuted as stated), but plots cannot be adjusted after — "adjust after" is exactly what Manor Lords lacks (B1 check). Dungeon Alchemist's "93 % of 1 930" is the English Steam-purchaser figure; all languages 94.7 % of 3,937 (C-S3, V-S2). |
| R4 paint, do not parametrise | CONFIRMED in substance; one example corrected | CS2 dropped CS1's sized zoning brush but kept one-cell paint; requests to restore it are real but thin, and the louder CS2 complaint was derived grids breaking (B2 check 1). Wonderdraft wording and price confirmed (A1 check 2, V18); "a dizzying array of options" confirmed, listing submitted April 2022 (V14). Extend: numbers shown while drawing (CS2 readouts; Precision Engineering). |
| R5 variations, one dial, reroll | CONFIRMED with qualifiers | Three variations per generation, each on its own layer: confirmed for Firefly models from Adobe pages other than helpx (V23, V24); partner models return one (C-S18). Dungeon Alchemist: per-room theme and randomize confirmed; no single "AI off" switch — per-part generation toggles since 2022-09-29 and a Roof switch in 2026 (C check T2); the maker's no-generative-AI statement confirmed (V22). Add the scope rule (§3). |
| R6 layers the user never manages | rule KEPT, evidence REPLACED | The Inkarnate "main beginner frustration" ranking is unsupported: one uncited page with stale prices (A1 check 1; V17 shows only that the page says it). Better evidence: FTG's own docs warn a texture "might be behind another layer" (D-S12); Wonderdraft's and Dungeondraft's layers take learning or planning (A1-S26, A1-S45). Weak-to-moderate. |
| R7 start from a finished town | CONFIRMED (§1 rank 6, 8 tools; Azgaar's source defaults to a random map, A2-S35) | none |
| R8 direct manipulation, no command grammar | CONFIRMED (2017 thread read, 32 dated posts; independent dated sources 2012–2022, A2) | Negation found: veterans say the curve pays off (3,000+ maps; "skiing uphill", 2015). The "2026 review: dense, dated, and intimidating" quote was not re-located by this lane. |
| R9 progressive depth | CONFIRMED | Tiny Glade's requests (copy/paste, longer buildings, more space) confirmed, copy/paste still absent after 1.16 (B1 check); Townscaper's limits are deliberate per its maker (B1-S24, V02). |
| R10 the clerk speaks in previews | CONFIRMED | Every text-to-map generator checked returns a flat picture (C check T3). Counter-model noted: Figma's agent applies directly with undo (C-S39). Closest precedent: Familiar (C-S52). |
| R11 undo total and cheap; no "cannot be undone" | CONFIRMED (§1 rank 2; §2 AP1) | Citation fix: FTG's "This action cannot be undone" is in `research/findings/ftg-posts-c.md` §2.20 (image 19 of post 159738553) and `code-ftg-client.md` §2.4, not `ftg-docs-params.md`. Manor Lords right-click: confirmed for road points (B1-S66), plot points snippet-only (B1-S64). Add autosave after every declaration and restore points. |
| R12 learn by doing | CONFIRMED with a limit | Learning by doing works for one verb (Townscaper); some players never found its hidden recipes and its controls were "nowhere to be found" at its Early Access launch (B1-S3, B1-S21). Twelve tools need first-use hints (Tiny Glade's one-time undo hint, B1-S35). |

Rules the evidence adds (for the owner-rule pass to consider; INFERRED):
- **R13 Declared means held.** What the author declared is locked by default; every re-roll keeps it (§1 rank 3; §2 AP2).
- **R14 The count badge.** Every area declaration previews its plots, households and buildings with +/− before commit
  (Manor Lords; Foundation's most repeated complaint).
- **R15 Never lose work.** Every declaration autosaves into the log; a visible history and restore points; the skeleton
  can always be exported and re-opened (the loudest theme of MFCG's board; Tiny Glade; Inkarnate 2.0; Azgaar losses).
- **R16 Everything derived has a handle, and move is a first-class gesture** (Move It 4.70M; Anno multi-move; Tiny Glade
  clutter; MFCG users; Dungeondraft walls).
- **R17 Numbers while drawing, not before** (Precision Engineering 4.32M; CS2's readouts).
- **R18 Hand off data** — the four VTT export details above.
- **R19 The clerk is optional, labelled, preview-first and never draws pixels** (§4).

### §6 Open questions and method disclosure

**Unverified or single-sourced (weakest links first).**
- The MFCG board counts (28 direct-editing, 18 saving or reloading, at most 26 option or size topics of 392) classify
  topic titles only, and posters are engaged users, not the casual majority behind the 4.8-star rating (D-S1, D-S4) — the
  lane's reading, not a survey.
- CS2's corner-node district tool being harder than CS1's brush: search snippet only (B2-S82).
- Manor Lords right-click on plot points: snippet only (B1-S64); roads confirmed (B1-S66).
- Photoshop "cycle through the variations, generate again": plausible only; helpx.adobe.com refused every fetch, and
  Adobe's tutorial page was read only as a WebFetch summary (C-S23).
- Familiar's behaviour rests on its maker's page alone (C-S52); no independent review was found.
- Townscaper's "intentionally limited" wording is one Finnish review's (B1-S33); the intent is the maker's own (B1-S24).
- FTG users' words come from this program's archived Patreon comment threads (D-A8..D-A10), not re-fetched in this lane.
- The "2026 review" quote in item 101 (f) R8 about CC3+ was not re-located.
- Undo depth (how many steps) was not found for almost any tool; Dungeondraft lets the user set it (A1-S40).

**Not covered, and why.**
- Reddit: blocked for every seat (curl returned a "Blocked" page; WebFetch "unable to fetch"; the search tool refuses
  reddit.com). Discord communities are private. YouTube transcripts were not reached.
- The session's shared WebSearch budget (200 queries) ran out at about 19:13 (B1's log), so no later search was possible;
  the verification pass therefore used direct page fetches only.
- Touch and phone editing: thin — MFCG's maker says it "simply isn't designed for small touchscreens" (D-S2, 2026-09-22),
  FTG's editor is large-screen only (D-S12), watabou's generators open the context menu on a long press (D-A6); Townscaper
  on mobile was not checked.
- Accessibility beyond one dark-mode complaint (A1-S58); non-English audiences.
- A controlled study of brushes versus parameter panels: none found by three seats (A1, A2, B2).

**What would most change these conclusions.**
1. A first-five-minutes test of our own canvas with five to eight casual game masters. No amount of review reading
   substitutes for it; the cheapest point is the M2a build (T9, T10 and the dry-run report).
2. Evidence that casual users prefer filling in forms to gestures — searched for in three seats and not found; if it
   appeared, §1 ranks 7 and 9 would weaken.
3. Whether a preview-first clerk feels slow next to apply-then-undo agents (Figma, C-S39) — test both.
4. Whether "declared means held" surprises users who expect a re-roll to change everything — test with the first re-roll.
5. City-scale VTT export: whether users want one large crop or district crops (E4 shows one file cannot hold a city at
   battle-map scale).

**Deliberately deferred — documented, not a gap to re-find.** Reddit and YouTube angles (blocked or not reached, above).
No other part of the brief was deferred.

**Method disclosure.**
- Seats: the lane seat (Opus) wrote D, the synthesis and the verification; six Opus sub-surveyors wrote A1, A2, B1, B2, C
  and E from briefs saved at `scratchpad/ux/briefs/` (COMMON.md plus one file per group), spawned 18:50 and merged
  19:12–19:24. Each seat's receipts are in Appendix A.
- Volume (from the seats' logs): 191 logged WebSearch queries (A1 44, A2 21, B1 19, B2 29, C 49, E 24, lane
  seat 5; the 200-query cap was reached), about 35 WebFetch calls, and several hundred direct page and API fetches with
  curl (Steam store, review, news and Workshop APIs; makers' docs and changelogs; GitHub APIs; forums), long pages saved to
  `scratchpad/ux/<group>/` and read with grep.
- Selection: primary sources first (makers' pages, docs, changelogs and source code; Steam review corpora read through
  the API, 100–300 most-helpful per game; mod subscriber counts; dated threads and press); listicles and content-marketing
  pages were not counted, and a claim echoed by several pages was traced to its origin before counting.
- Verification (19:22): 38 load-bearing claims across all seven groups were re-fetched live with curl and searched for
  the claimed wording or number (`scratchpad/ux/V/verify.py`; the 38 checks are listed in Appendix B): **38 of 38 found** (V01–V38,
  cited inline above). Seven checks tested keyword presence only (V05, V06, V08, V10, V33, V34, V38), so they confirm the
  page is on topic, not every detail of the reading. Separately, the Steam figures in item 101 (f) were reconciled by
  filter (V-S2).
- Labels: every claim in Part I is SOURCED (fetched this session, or read in this program's archives where marked D-A) or
  INFERRED; Part II's rules are INFERRED from them. Quotes are under 15 words, at most one per source.

## Appendix A — query logs (receipts, per seat)

#### Query log (A1)
(Entries #01-#44 below carry no clock time: the earlier minute stamps were estimates and were removed at 19:00 on the lane seat's instruction. Only the session start, 18:49:58 from `date`, is a real reading. Entries added after this note carry `date '+%H:%M'` output.)
- #01 curl Steam storesearch term=Inkarnate → total 0 (not on Steam)
- #02 curl Steam storesearch term=Wonderdraft → total 0 (not on Steam)
- #03 curl Steam storesearch term=Dungeondraft → 4 items, all "Dungeon Drafters" (app 1824580, an unrelated game) and its extras; Dungeondraft itself not on Steam
- #04 curl Steam storesearch term=Dungeon%20Scrawl → total 0 (not on Steam)
- #05 WebSearch "Inkarnate AI feature"
- #06 WebSearch "Inkarnate city map tutorial buildings town"
- #07 WebSearch "Inkarnate Pro price free vs pro features"
- #08 WebSearch "Wonderdraft undo limitations complaints"
- #09 WebSearch "Dungeondraft building tool walls rooms merge documentation"
- #10 WebSearch "Dungeon Scrawl v2 free vs paid subscription"
- #11 curl inkarnate.com/ (home, 43 KB), inkarnate.com/faq/ (30 KB), inkarnate.com/updates (SPA shell, no entries), feedback.inkarnate.com/p/ai-integration-options, feedback.inkarnate.com/changelog (Featurebase, latest ~10 entries)
- #12 curl www.wonderdraft.net/, dungeondraft.net/, www.dungeonscrawl.com/pricing, www.dungeonscrawl.com/docs (940-byte shell)
- #13 curl blizzardwatch.com 2025/10/09 Inkarnate AI article
- #14 WebSearch "\"object ordering\" Inkarnate hours fighting"
- #15 WebSearch "Loreteller Inkarnate layers guide brush object layers"
- #16 WebSearch "Inkarnate undo lost my map work not saved" (returned no Inkarnate-specific results)
- #17 WebSearch "Inkarnate 2.0 release new editor features 2026"
- #18 WebSearch "Inkarnate frustrating learning curve beginner stamps layers confusing"
- #19 WebSearch "Inkarnate Creator plan Studio plan price per year" (no current price found)
- #20 curl loreteller.com/learn/inkarnate-vs-wonderdraft/, loreteller.com/learn/inkarnate-layers-guide/, loreteller.com/ (home), tumblr theworldbrewery DM Tool Review: Inkarnate (JSON date 2021-01-20)
- #21 WebSearch "site:feedback.inkarnate.com undo" (snippets incl. private bug posts)
- #22 WebSearch "Inkarnate autosave editor save progress crash"
- #23 WebSearch "reddit r/inkarnate stamps going behind layer help" (no Inkarnate results)
- #24 WebSearch "Inkarnate 2.0 launched layers migration Path tool retired Line tool"
- #25 WebSearch "Inkarnate price increase 2025 Creator Studio annual cost reddit"
- #26 curl feedback.inkarnate.com/p/{autosave, undoing-deleted-line-causes-crash (private), undo-removes-map-to-white-checkerboarded (private), object-panel-commands, layers-sandwiched-between-paint-layers (private), brush-tool-undo-bug, regional-pricing}
- #27 curl inkarnate.com/assets/landing-page JS (no price data; prices render client-side)
- #28 curl feedback.inkarnate.com/api/v1/changelog?page=1..26&limit=10 (254 entries, 2019-12-12 .. 2026-09-08) → A1/inkcl/all.tsv; feedback.inkarnate.com/help (empty shell)
- #29 WebSearch "\"Inkarnate 2.0\" review lag slow complaints"
- #30 WebSearch "Inkarnate world generator useful or not reddit landmass generate button" (no user opinion found)
- #31 WebSearch "Inkarnate city map tedious placing buildings one by one" (nothing specific)
- #32 curl threadofsouls.com 2023/11/17 review; dungeongoblin.com inkarnate-pro-review-2021; writersanctuary.com review-inkarnate-fantasy-maps; github.com/webcompat/web-bugs/issues/130452
- #33 curl www.wonderdraft.net/images/supported_platforms.webp (returned HTML fallback, not an image)
- #34 curl api.github.com/repos/Megasploot/Wonderdraft (created 2019-03-15, last push 2019-10-09, 39 open issues)
- #35 curl api.github.com/search/issues?q=repo:Megasploot/Wonderdraft+undo (0 results)
- #36 curl api.github.com/repos/Megasploot/Wonderdraft/issues?state=all (39 issues, all open, 2020-08-02 .. 2026-04-18)
- #37 curl github.com/Megasploot/Wonderdraft/wiki (Home, edited 2020-05-05), /wiki/Quick-Guide (edited 2019-11-28), /wiki/Shortcuts (edited 2019-09-30); api.github.com issue #37 + comments
- #38 WebSearch "Wonderdraft undo redo history limit steps" (no depth found)
- #39 WebSearch "Wonderdraft labels follow path curved text tutorial"
- #40 WebSearch "Wonderdraft 1.1.9 update changelog new version" (only a crack site and unrelated hits; not opened)
- #41 WebSearch "Wonderdraft review learning curve downsides frustrating"
- #42 WebSearch "Wonderdraft crash lost map save corrupted"
- #43 WebFetch old.reddit.com/r/wonderdraft/comments/nrag8x/how_to_prevent_map_corruption/ → BLOCKED ("unable to fetch"); curl libredd.it mirror → 403
- #44 curl d20collective.com Wonderdraft review (2020-05-15); curl repology.org wonderdraft versions → connection failed (000)
- 19:00 WebSearch "Wonderdraft \"can't undo\" OR \"no undo\" OR \"undo doesn't\" symbols" (nothing Wonderdraft-specific)
- 19:00 curl megasploot.itch.io/wonderdraft → 404; curl dndbeyond.com forum thread 93041 Dungeondraft/Wonderdraft opinions (2020-12-31)
- 19:00 WebSearch "Wonderdraft label tool curve label along river \"curve\""; WebSearch "Wonderdraft macOS version download Apple 2025" (download/crack mirrors only; not opened); WebFetch youtube.com/watch?v=GeIpYwV4MT0 → page text had no title/description
- 19:01 curl thesagedm.blogspot.com 2019/06 campaign-tools-wonderdraft; painfullyhopeful.me 2020/10/28 map-upgrade; wonderdraft.net/images/supported_platforms.webp (retry)
- 19:01 WebSearch "Wonderdraft landmass wizard generate or draw by hand which do you prefer"; curl fantasymapshop.com wonderdraft-academy 4-ways-to-create-your-perfect-landmass
- 19:02 WebSearch "fantasymapshop Wonderdraft labels curved text how to curve a label"; WebSearch "Wonderdraft city map town map how to limitations"
- 19:02 curl dndbeyond.com thread 92077 Making maps for city campaigns (2020-12-21); tildes.net ~games.tabletop 1ec8 city-maps essay (2024-02-19); scribd.com/document/827630328/Manual → bot challenge, not readable
- 19:02 curl loreteller.com/learn/wonderdraft-labels-guide/
- 19:02 WebSearch "\"Wonderdraft\" 1.1 update \"curved labels\" OR \"label curve\" Megasploot"; curl api.github.com Megasploot/Wonderdraft releases, issues #4 #22 #1
- 19:03 WebSearch "Wonderdraft bend label text arc shift drag label tool options" (no primary label mechanics found)
- 19:03 curl steemit.com @loreshapergames long-day-and-wonderdraft-test-review
- 19:04 WebSearch "Wonderdraft AI feature generative Megasploot AI policy" (no built-in AI found)
- 19:05 curl dungeondraft.net (home+FAQ, 27 KB); dungeondraft.net/images/supported_platforms.webp; megasploot.github.io/DungeondraftModdingAPI/ (+ /reference/Editor/); megasploot.itch.io/dungeondraft → 404; api.github.com/repos/Megasploot/Dungeondraft; encounterlibrary.com/dungeondraft-basics/design-tools/
- 19:06 curl megasploot.github.io/DungeondraftModdingAPI/reference/{WallTool,PortalTool,PrefabTool,RoofTool,FloorShapeTool,Level,PathTool,ScatterTool,TextTool,Pathway}/; encounterlibrary.com/dungeondraft-basics/{creating-maps,making-prefabs-select-tool,settings-tracing-exporting,object-tools,lighting-text-tools}/ (first guesses of 3 slugs 404'd)
- 19:06 curl api.github.com/repos/Megasploot/Dungeondraft/issues?state=all pages 1-6
- 19:07 WebSearch "Dungeondraft town map city large map performance tips"; "Dungeondraft review battlemap software 2024 OR 2025 pros cons"; "Dungeondraft frustrating learning curve walls annoying beginner" (itch.io game posts only, irrelevant); "Dungeondraft AI generative art policy Megasploot"
- 19:07 curl technicalrpg.com review-dungeondraft-mapping-software (2021-01-16); forum.rpg.net thread 909985 → 403 blocked; nexusmods.com/dungeondraft/news/14850 → 403 blocked; foundryvtt.com/packages/dd-import/
- 19:09 curl help.roll20.net Dungeon Scrawl category 16979413182999, articles 16979743281943 (What is DS), 17380293949207 (FAQ); dungeonscrawl.com/blog/why-dungeon-scrawl; dungeonscrawl.com/about
- 19:09 curl dungeonscrawl.com/guides; rascal.news roll20s-d-d-map-maker-subscription-is-on-sale…; dungeonscrawl.com/blog/scrawliday-25
- 19:09 WebFetch help.roll20.net article 16979743281943 → 403; curl of help.roll20.net pages and dungeonscrawl.com/guides → Cloudflare "Just a moment" (403); dungeonscrawl.com/blog/scrawliday-25 → 404
- 19:09 WebSearch "Dungeon Scrawl rooms merge overlapping walls automatically snap to grid tutorial"; WebSearch "Dungeon Scrawl v2 complaints worse than v1 OR paywall OR Roll20 acquisition"
- 19:10 curl probabletrain.itch.io/dungeon-scrawl (+ /devlog, devlog 439864 V2 announcement); gigazine.net 20200624-dungeon-scrawl; app.roll20.net forum posts 11620443 (AMA, page 2) and 12220207 (Connects to Roll20, page 2); dungeonscrawl.com/docs/usageguide.md and README.md (docsify sources of the V1 docs)
- 19:11 WebSearch "site:dungeonscrawl.com guides"; "Dungeon Scrawl AI feature Roll20 AI map generation"; "Dungeon Scrawl text labels tool v2 how to add text"
- 19:11 curl dungeonscrawl.com/blog/{may-2026-updates,feb-2026-updates,june-2026-updates}; blog.dungeonscrawl.com/july-26-update; blog.roll20.net/posts/{instant-dnd-dungeons,dungeon-scrawl-updates-may-2026}; wargamer.com/dnd/roll20-random-dungeon-generator; belloflostsouls.net 2026/05 non-AI instant dungeon
- 19:12 WebSearch "\"Dungeon Scrawl\" frustrating OR limited OR \"lost my map\" OR \"wish it\" review"
- 19:12 curl dungeonscrawl.com/blog/never-lose-your-maps-again → 404; curl hn.algolia.com/api/v1/items/23614042 (HN thread 2020-06-23, 366 points, 68 comments)
- 19:12 curl www.dungeonscrawl.com/ (landing page)
- (receipt added 19:17; issued earlier, unstamped) curl feedback.inkarnate.com/{feature-requests,bugs}/p/<slug> for autosave, undoing-deleted-line-causes-crash, undo-removes-map-to-white-checkerboarded, object-panel-commands, layers-sandwiched-between-paint-layers → 404 (then retried as /p/<slug>); curl feedback.inkarnate.com/changelog?page=2 (server-rendered page ignores ?page); curl help.inkarnate.com → no connection (000)

#### Query log (A2)
Totals: 21 WebSearch queries, 1 WebFetch (Reddit, blocked), and about 20 curl/API batches covering the URLs below.
Times: only values from `date` output are shown; the start time 18:50 came from `date` (18:50:04 EDT). Earlier estimated stamps were withdrawn at 19:00 (from `date`).
- 18:50 EDT started; scratch dir SCRATCH/A2/ created.
- [time not recorded; after 18:50] Steam storesearch API: term=Worldographer, Campaign Cartographer, Fantasy Map Generator, City Designer, Inkwell, Cartographer, ProFantasy, Hexographer, Campaign Cartographer 3, Azgaar, Worldographer 2025 -> none of the three tools listed (0 hits, or unrelated titles only). Steam HTML search term=campaign cartographer and term=worldographer -> no matching title.
- [time not recorded; after 18:50] curl worldographer.com home; manual chapters 01, 02, 03, 04, 05, 07, 07b, 07c, 07e, 07f; instructions how-map-levels-work, making-city-blocks, settlements; changelog; FAQ; new-in-2025-version; download; forum.
- [time not recorded] curl store.inkwellideas.com/collections/software-icon-sets/products.json and products/bunlde-hexographer-cityographer-and-dungeonographer-pro-versions.json (license price).
- [time not recorded; after 18:50] curl profantasy.com home, /products/cc3.asp (redirect to /products/campaign-cartographer-3), /products/cd3.asp (redirect to /products/city-designer-3); github.com/Azgaar/Fantasy-Map-Generator/wiki.

- [time not recorded] WebSearch "Worldographer 2025 review"; "Worldographer clunky interface frustrating"; "Worldographer city generator settlement map opinions reddit".
- [time not recorded] curl worldographer.com/2026/01/worldographer-2025-released/; rpgpub.com thread 12198 (HTTP 403, not read); forums.hexed.press/t/handy-worldographer-settings-megathread/169; blog.worldanvil.com/reviews/city-maps-generator-creator-builder/; enworld.org thread 706620; lemmy.world API post 454202 + comment list (8 comments; the "bear to use" snippet was NOT in it, traced instead to the Hexed Press thread).
- [time not recorded] curl alternativeto.net/software/worldographer (HTTP 403, not read).
- [time not recorded] WebSearch "\"Worldographer\" \"learning curve\""; "\"Worldographer\" crash OR \"lost my\" OR \"undo\" problem forum"; "\"Worldographer\" easy to use hex map worldbuilding recommend"; "Worldographer reddit worldbuilding opinion 2025 version"; "site:reddit.com Worldographer" (no Reddit thread URLs returned); "Worldographer AI feature Inkwell Ideas artificial intelligence map".
- [time not recorded] curl enworld.org threads 673665 and 685613 (read); otherworldmapper.com/forum/viewtopic.php?t=187 (0 mentions of Worldographer; search summary had misattributed it; discarded); worldbuilderblog.me 2014 post (fetched, not used). One further enworld URL (thread id 708117) was a GUESS by me and returned an unrelated thread ("D6 RPG Things I'm Thankful For"); discarded, not cited.
- [time not recorded] WebSearch "site:reddit.com Azgaar fantasy map generator overwhelming too many options"; "site:reddit.com \"Campaign Cartographer\" learning curve worth it" (neither returned Reddit threads).
- [time not recorded, between 19:00 and 19:03] curl raw.githubusercontent.com/wiki/Azgaar/Fantasy-Map-Generator/{Home, Quick-Start-Tutorial, Q&A, Hotkeys, Heightmap-customization, Heightmap-template-editor, User-Interface, Changelog, Ollama-text-generation, Omnibar, Journeys, URL-parameters, Markers, Policy, Working-offline}.md (Knowledge-Base 404); api.github.com/repos/Azgaar/Fantasy-Map-Generator (+ git tree); raw source: src/generators/burgs-generator.ts, all 81 src/controllers/*.ts, src/components/{tooltips.ts, options-model.ts, options-schema.ts, options/tabs/tools-tab.ts, options/tabs/options-tab.ts, options/tabs/about-tab.ts}, src/main.ts.
- 19:00 (from `date`) WebSearch "Roll20 GM Hub Azgaar \"dizzying array of options\""; "Azgaar fantasy map generator overwhelming learning curve complicated interface"; "Azgaar fantasy map generator lost my map browser storage save complaint".
- 19:00-19:01 curl gmhub.roll20.net/resources/azgaar-fantasy-map-generator/; fantasymapgenerators.com/blog/fantasy-map-generator-comparison/; heredragonsabound.blogspot.com/2019/08/azgarrs-fantasy-map-generator.html.
- 19:01 (from `date`) GitHub search API: repo:Azgaar/Fantasy-Map-Generator + undo / lost work / confusing / overwhelming / tutorial; issues API #1723, #1398, #1630, #985, #1361 (+ #1361 comments); github.com/…/discussions/969 (HTML).
- 19:02 (from `date`) curl goodreads author_blog_posts 22502497 (Moe Lane) and 17160296 (mapping resources); goodreads topic 17975486 (free mapmaking thread). WebFetch https://www.reddit.com/r/FantasyMapGenerator/ -> "unable to fetch" (blocked). WebSearch "\"Azgaar\" \"so many options\" map generator"; "Azgaar map generator burg open city map watabou link town map from world map"; "map making beginners prefer painting brushes vs generator parameters sliders study casual users".
- 19:03 (from `date`) curl reedsy.com/blog/fantasy-map-generators/ (learning-curve phrase not present in current page); watabou.itch.io MFCG devlog 46967 (0.5.4 Azgaar integration).
- 19:04-19:05 (from `date`) curl profantasy.com/products/campaign-cartographer-3.json and city-designer-3.json (prices; store currency GBP per page HTML); collections/value-bundles/products.json (returned no products). WebSearch "forum.profantasy.com \"New to CC3+\" \"unwelcoming\""; curl forum.profantasy.com/discussion/7589 p1+p2 (32 dated posts).
- 19:05 (from `date`) WebSearch "ProFantasy Campaign Cartographer \"learning curve\" profantasy.com"; "Campaign Cartographer 3+ review worth learning easier than expected"; "City Designer 3 street tool random buildings along street ProFantasy tutorial".
- 19:06 (from `date`) curl rpg.net review 16868 (HTTP 403, not read); blackgate.com 2015-03-12 review; stargazersworld.com 2012-02-15 review; forum.profantasy.com/discussion/3707; rpgmaps.profantasy.com/making-a-city-part-3/.

#### Query log (B1)
Times are EDT on 2026-09-27, taken from the saved files' modification times (curl) or bracketed between them (WebSearch/WebFetch, marked ~).
- 18:50 session start; scratch dir SCRATCH/B1/ created.
- 18:50 curl Steam storesearch term=Townscaper / Tiny Glade / Manor Lords / Foundation -> ids 1291340, 2198150, 1363080, 690830.
- 18:50 curl Steam appdetails (cc=us, l=english), appreviews summary (language=all, num_per_page=0), appreviews negative + positive (english, filter=all, num_per_page=100), store pages (for tags) for all four ids.
- 18:51 NOTE: negative filter=all without day_range returned only 4 reviews for Townscaper and Tiny Glade; re-issued all four with day_range=9223372036854775807 (all-time most helpful) -> 100 negative + 100 positive each (files negall_/posall_<id>.json/.txt).
- 18:52 curl Steam news API ISteamNews/GetNewsForApp/v2 appid=<id> count=300 maxlength=0 for all four (official posts = feedname steam_community_announcements: Townscaper 37, Tiny Glade 115, Manor Lords 91, Foundation 265).
- ~18:53 WebSearch: "Townscaper review Oskar Stålberg toy "no goal" 2021 review"; "Oskar Stålberg interview Townscaper algorithm player control "wave function collapse""; "Townscaper click and drag build multiple blocks "hand hurts" feature request".
- 18:53 curl: Townscaper threads 3111394035957454126, 2573194016116976206, 2573194192013003102; github.com/mokojm/townshell; Game Developer "How Townscaper Works"; TechRaptor review (5.7 KB shell, no text); Wikipedia Townscaper.
- ~18:54 WebFetch techraptor.net Townscaper review -> HTTP 403 (not used). WebSearch: "Townscaper "too limited" OR "lack of control" OR "tedious clicking" review criticism".
- 18:54 curl: Hey Poor Player, Pocket Tactics, Pure Nintendo, Common Sense Media reviews; OpenCritic Townscaper reviews page.
- ~18:57 WebSearch: "Tiny Glade review 2024 Pounce Light diorama builder PC Gamer OR "Rock Paper Shotgun" OR Eurogamer"; "Tiny Glade developers interview Anastasia Opara Tomasz Stachowiak procedural design "fiddle" OR "fiddling" OR handles"; "pouncelight.games Tiny Glade FAQ glade size undo controls".
- 18:57 curl: Tiny Glade "Undo Button" thread; Steam guide 3337755936 (returned Steam "too many requests" page — not used); pouncelight.games/tiny-glade/ (JS shell, 165 chars); 80.lv interview; Shacknews review; Wikipedia Tiny Glade; pouncelight.games/tiny-glade/troubleshooting/saves/.
- ~19:00 Manor Lords: scan of 91 official posts for burgage/plot -> ml_plot_mentions.txt, filtered for edit/resize/adjust/move/preview/right-click/snap. WebSearch: "Manor Lords burgage plot placement number of houses plus minus buttons before build"; "Manor Lords "burgage" plot can't edit OR resize OR adjust after placing steam discussion"; "Manor Lords "family blocks" OR "how many plots" plot area design steamcommunity".
- 19:01 curl: thread 4355620138223349675 (with and without ?l=english — redirected to the forum index both times); official wiki Burgage_plot (17-char shell); threads 4358998466169558915, 4358998466165221791, 4362376656102585043, 4355620138225704118, 603029962779290611, 4358998287108092448; Hardcore Gamer guide.
- ~19:01 WebSearch: ""Manor Lords" right click remove last point placing burgage plot OR field undo point"; WebFetch wiki.hoodedhorse.com Burgage_plot -> HTTP 403.
- 19:02 curl: threads 3/4358998644638125458, 0/7128707880820779577, 0/4358998287108579877, 1/4407417241456716107 (a first attempt failed locally: a zsh loop variable named "path" clobbered PATH; no request was sent). WebSearch: "Manor Lords guide placing fields plots "right-click" to remove point OR undo last point beginner tips"; curl TheGamer roads and building-basics guides.
- ~19:03 WebSearch: "Manor Lords early access review burgage plots organic roads city building PC Gamer OR "Rock Paper Shotgun" OR Eurogamer 2024"; "Manor Lords tutorial onboarding new players confusing tooltips "tutorial" review". 19:03 curl: PCGamesN early access review; threads 3/4355619963546797053, 0/4626981956824891777.
- ~19:04 WebSearch: "Manor Lords undo button construction mistake cancel refund resources "undo""; 19:04 curl threads 592882772895354226, 4355619963545281833.
- ~19:06 Foundation: store text (B1-S16); scan of 265 official posts for zone/paint/undo/monument/tutorial -> fd_mentions.txt. WebSearch: "Foundation Polymorph Games 1.0 review 2025 residential zoning paint tool monuments"; "Foundation game Polymorph residential area paint undo erase zone houses placement control steam discussion".
- 19:07 curl: wiki.polymorph.games/foundation/Housing and /Zones; threads 632295800477617380, 1640915206451907372. WebSearch: ""Foundation" review Polymorph Games January 2025 full release city builder "residential" review score"; curl GINX review (17-char shell, not used), Wikipedia Foundation (video game).
- 19:08 curl Polygon review. curl https://www.pcgamesn.com/foundation/city-builder-roads -> HTTP 404 (a URL I guessed; not cited). WebSearch: ""Foundation is a city builder that finally understands roads" PCGamesN" -> real URL; 19:08 curl it (B1-S82).
- 19:10 quote audit (one quote per source) and timestamp correction from file mtimes.
- ~19:13 local greps of all four feeds and review sets for reroll/regenerate/shuffle/lock. WebSearch "reddit Tiny Glade copy paste buildings feature request r/TinyGlade" -> refused: session WebSearch budget exhausted (200/200); no further searches issued.

#### Query log (B2)
- Session start 18:50 EDT (from `date`); WebSearch/WebFetch loaded. Per-call times were not recorded; entries below are in issue order (Q = batch number), and the whole log spans roughly 18:50-19:10 EDT.
- Q1 (18:50:32 EDT, from `date`) Steam storesearch x4 (Cities: Skylines, Cities: Skylines II, Anno 1800, Kingdoms Reborn) -> ids 255710, 949230, 916440, 1307890.
- Q2 Steam appdetails x4; appreviews summary x4 (language=all) and x4 (language=english).
- Q3 Steam appreviews most-helpful negative/positive, day_range=all-time, paginated (CS1 300 neg/200 pos; CS2 300/200; Anno 200/100; KR 200/100); store pages x4 (app_tag grep).
- Q4 WebSearch: "Cities Skylines II zoning brush removed paint marquee fill zoning tool modes"; "\"Is there no zoning brush\" Cities Skylines II steam discussions"; "skylines.paradoxwikis.com zoning fill marquee brush road tools straight curved freeform upgrade".
- Q5 curl: Steam thread 949230/737034666592264806 ("Is there no zoning brush?"); Steam thread 255710/3200369647696854200 (zone brush size). curl to skylines/cs2.paradoxwikis.com returned a JS client-challenge page; paradoxinteractive.com and mods.paradoxplaza.com returned HTTP 406 to curl.
- Q6 WebFetch: skylines.paradoxwikis.com/Zoning; skylines.paradoxwikis.com/Roads; paradoxinteractive.com CS2 feature highlight road-tools; cs2.paradoxwikis.com/Zoning; paradoxinteractive.com CS2 feature highlight zones-signature-buildings.
- Q7 WebSearch: "Cities Skylines II patch notes zoning tool change zoning 2024 OR 2025 OR 2026 brush size paint mode update".
- Q8 Steam ISteamNews/GetNewsForApp (count=300, steam_community_announcements) x4; grep for undo/brush/zoning/inspired by.
- Q9 Steam Workshop browse (CS1, Mod tag, sort totaluniquesubscribers, p1-p2) + ISteamRemoteStorage/GetPublishedFileDetails (64 ids; then 4 ids for descriptions).
- Q10 WebSearch: "Cities: Skylines review 2015 road tools curved roads zoning undo Rock Paper Shotgun OR PC Gamer OR Polygon"; "Cities Skylines no undo OR undo button road bulldoze Paradox forum OR steam discussions"; "Cities Skylines 2015 tutorial new player advisor hints tutorial launch review learning".
- Q11 curl: Steam threads 255710/1639789306577066371, 255710/611701999537737912, 949230/595137443379885857, 255710/2448217801767911829; thesixthaxis.com 2015 review; pcgamesn.com review.
- Q12 WebSearch: "Cities Skylines II most popular mods Paradox Mods subscribers Anarchy Move It Road Builder 2025"; "Cities Skylines 2 undo mod ctrl+z undo Paradox Mods road bulldoze". WebFetch: mods.paradoxplaza.com CS2 listing sorted by subscribers (no list returned — script-rendered); mods.paradoxplaza.com/mods/150877 (title only); forum.paradoxplaza.com thread 1607353 (browser-validation page, not readable).
- Q13 curl: Steam threads 949230/4691154661545152027, 949230/3878221560446569933, 949230/3937895474112644390.
- Q14 WebSearch: "Cities: Skylines 2 review October 2023 road tools grid tool zoning snapping PC Gamer OR Eurogamer OR Rock Paper Shotgun OR IGN"; "Cities Skylines 2 zoning grid gaps curved roads zoning frustrating reddit OR forum 2024 zone cells disappear". curl: pcgamer.com CS2 review; techradar.com CS2 review (no tool mentions). WebFetch: cs2.paradoxwikis.com/Roads.
- Q15 Steam news 916440 listing + grep (blueprint, copy, move, demolish, road, tutorial, undo); Anno review corpus grep.
- Q16 WebSearch: "Anno 1800 blueprint mode DevBlog This belongs in a museum blueprint plan buildings without resources anno-union"; "Anno 1800 undo button demolish refund recently placed building undo steam discussions OR reddit"; "Anno 1800 multi move tool added game update move buildings patch notes anno-union 2020 OR 2021".
- Q17 curl: anno-union.com x-marks-the-spot (museum/blueprint devblog), updates/anno-1800-game-update-16, devblog-new-features-at-gc2018; ubisoft.com help articles 000063651 and 000063624 (script shells, no text). WebFetch of both Ubisoft help articles returned empty content.
- Q18 WebSearch: "Anno 1800 move tool introduced Game Update 7 OR 8 OR 9 move buildings free cost" (its summary misdated GU16 as 2023; primary page says posted 2022-12-01, release 2022-12-08). curl: anno.city GU16 article; anno1800.fandom.com Game_Updates (blocked, 18 chars).
- Q19 WebSearch: "Anno 1800 trade union town hall radius items buff street distance paved street range service building coverage"; "Anno 1800 review 2019 building tools blueprint mode layout grid roads RPS OR PC Gamer OR Eurogamer OR Polygon". curl: anno-union.com devblog-roads-building-in-the-grid; pcgamer.com anno-1800-review.
- Q20 WebSearch (allowed_domains incl. reddit.com) failed: "reddit.com not accessible to our user agent". WebSearch: "Anno 1800 tutorial campaign new player tutorial overwhelming onboarding beginners hard to learn review"; "\"Anno 1800\" undo misplaced building demolish refund steam discussions" (steamcommunity/anno-union/fandom only; no Anno undo thread).
- Q21 curl: Steam forum search app 916440 q=undo (5 threads; each fetched; none requests undo). WebFetch anno1800.fandom.com/wiki/Blueprint_mode -> HTTP 402.
- Q22 KR appdetails description + Steam news 1307890 listing/grep (road, drag, demolish, undo, grid, copy, blueprint, placement, tutorial, province); KR review corpus grep (neg and pos).
- Q23 WebSearch: "\"Kingdoms Reborn\" review early access city builder cards procedural world Earthshine"; "\"Kingdoms Reborn\" roads placement demolish undo tutorial steam discussions".
- Q24 curl: kingdomsreborn.com; saveorquit.com 2020 preview; chromastrike.com review; gamermatters.com impressions; Steam threads 1307890/3808408328768838836, 3111393847708087988, 4352239720873364268, 3130541756152073841.
- Q25 grep of the raw CS2 "Road Tools" diary text for roundabout/intersection wording (confirms "Roundabouts come in 4 different sizes").
- Q26 WebSearch: "reddit CitiesSkylines \"zoning brush\" CS2 missing paint brush size zoning" (no Reddit URL returned); WebFetch https://www.reddit.com/r/CitiesSkylines/search/?q=zoning+brush+cs2&restrict_sr=1 -> "unable to fetch from www.reddit.com" (blocked; no Reddit evidence used).
- Q27 WebFetch: skylines.paradoxwikis.com/Districts; cs2.paradoxwikis.com/Districts. Grep of CS1/CS2 review corpora for "district". WebSearch: "Cities Skylines 2 district tool polygon nodes vs CS1 district paint brush complaint OR prefer steam discussions". curl: Steam threads 949230/3877095833484594318, 4511002214529515635, 7119694643858837251 (none about the district tool; two used for other points).

#### Query log (C)
(receipts only; appended as issued)
- curl https://store.steampowered.com/api/storesearch/?term=Dungeon%20Alchemist&l=english&cc=US (app id 1588530)
- curl https://store.steampowered.com/api/appdetails?appids=1588530&cc=us&l=english
- curl https://store.steampowered.com/appreviews/1588530?json=1&language=all&purchase_type=all&num_per_page=0
- curl appreviews/1588530 review_type=negative filter=all num_per_page=100 (returned 1 review only; default day range) and review_type=positive filter=all (17)
- python paging of appreviews/1588530 language=english review_type=negative filter=recent num_per_page=100 cursor=… (3 pages, 162 reviews, 2022-03-31..2026-09-19); same for positive (3 pages, 300 reviews)
- curl https://store.steampowered.com/app/1588530/ (tags via InitAppTagModal; Early Access Q&A)
- WebSearch "Dungeon Alchemist turn off auto generation objects toggle manual mode room"
- WebSearch "dungeonalchemist.com FAQ export Foundry Roll20 Universal VTT"
- curl + WebFetch https://steamcommunity.com/app/1588530/discussions/0/3275813284140682477/ (pinned FAQ; thread body not rendered, index only)
- curl https://www.dungeonalchemist.com/ ; /import-to-foundry ; /faq (404) ; /faqs ; /wiki ; /blog-feed.xml ; WebFetch /faqs (only the generative-AI answer is in the static page)
- curl https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1588530&count=200&maxlength=0&format=json (195 news items)
- WebSearch "Dungeon Alchemist review early access map maker AI furnishing"
- WebSearch "Dungeon Alchemist \"AI\" label generative backlash procedural not AI reddit"
- curl https://steamcommunity.com/app/1588530/discussions/0/6169410373941861343/
- WebFetch pixelbandits.org 2023/06 review; WebFetch + curl moviesgamesandtech.com 2024/07/05 review (phrase and datePublished confirmed in raw HTML)
- curl dungeonalchemist.fandom.com/wiki/Hotkeys and /Getting_Started (blocked by a "Just a moment..." bot check; not pursued)

- curl + WebFetch https://helpx.adobe.com/photoshop/using/generative-fill.html (403 Access Denied); WebFetch https://helpx.adobe.com/photoshop/desktop/create-open-import-images/create-images/edit-images-with-generative-fill.html (403)
- WebSearch "helpx.adobe.com Photoshop Generative Fill variations Properties panel generative layer"
- WebSearch "Photoshop Generative Fill model picker partner models Gemini FLUX variations 2025 helpx"
- WebSearch (allowed_domains helpx.adobe.com) "Generative Fill Photoshop desktop \"variations\" select Generate contextual task bar"
- WebSearch (allowed_domains helpx.adobe.com) "Photoshop partner models Generative Fill one variation credits premium features"
- curl adobe.design partner-models story; jkost.com 2025/09 post; community.adobe.com partner-models thread (m-p/15520781); helpx generative-credits-faq (403); www.adobe.com/products/photoshop/generative-fill.html (no response)
- WebSearch (allowed adobe domains) "Generative Fill \"three variations\" Photoshop Properties panel"
- WebSearch "Photoshop Generative Fill \"violates the User Guidelines\" removed results false positive"
- curl community.adobe.com P: Generated images violate user guidelines (idi-p/13811808 → bug-reports-699/…-667663); "no longer creating three options" (m-p/14367053 → questions-712/…-1161579); adobe.com/learn combine-variations (curl no response ×2; WebFetch summary used)
- WebSearch "news.adobe.com May 23 2023 Generative Fill Photoshop beta press release \"non-destructively\""
- WebSearch "Adobe Generative Fill generally available September 2023 generative credits Photoshop press release"
- curl news.adobe.com 2023 press release; blog.adobe.com 2024/04/23 post
- WebSearch "Generative Fill results worse after update Firefly Image 3 bring back old model community.adobe.com"
- WebSearch "Adobe clarification terms of use June 2024 blog content access train AI backlash"
- curl community.adobe.com announcements-710 Firefly Image 3 retirement; questions-712 "Fill and Expand is awful"; blog.adobe.com 2024/06/10 and 2024/06/06 terms-of-use posts
- WebSearch "Photoshop Generative Fill hands-on review impressive but limitations resolution 2023 Verge OR PetaPixel OR \"Ars Technica\""; curl petapixel.com 2023/05/23 article

- WebSearch "Canva Magic Studio launch October 2023 newsroom Magic Switch Magic Grab Magic Expand Canva Shield"
- WebSearch "Canva help center Magic Edit how to use variations generate prompt brush"
- curl https://www.canva.com/help/using-magic-edit/ and https://www.canva.com/newsroom/news/magic-studio/ (403, bot page); WebFetch https://www.canva.com/help/using-magic-edit/ (403); WebFetch https://www.canva.com/help/editable-magic-layers/ (403)
- WebSearch (allowed_domains canva.com) "Magic Edit results variations \"Generate new results\" Canva Help Center"
- WebSearch (allowed_domains canva.com) "Canva AI usage limits Magic Studio free Pro uses per month help center"
- WebSearch "Canva \"Magic Layers\" flat image editable layers launch 2025 OR 2026 review"; curl petapixel.com 2026/03/11 Magic Layers article
- WebSearch "Canva Teams price increase 2024 AI features backlash Magic Studio justify"; curl techcrunch.com 2024/09/07 article
- WebSearch "Canva Magic Design results generic bad \"Magic Edit\" doesn't work frustrating reddit"
- WebSearch "The Verge October 4 2023 Canva Magic Studio Magic Design Magic Switch Magic Morph hands-on"; curl technical.ly hands-on (2023-10-04)
- curl makeuseof.com Magic Edit guide (datePublished 2023-04-27)
- WebSearch "\"Canva AI\" OR \"Magic Design\" review 2025 generic templates limited control complaints designers" (listicles only; not counted)

- WebSearch "Figma blog \"Make Designs\" approach Noah Levin July 2024 Apple weather app paused"
- WebSearch "Figma \"First Draft\" relaunch Make Designs renamed 2024 blog Figma AI"
- curl figma.com/blog/inside-figma-a-retrospective-on-make-designs/ ; figma.com/blog/figma-ai-first-draft/ ; techcrunch.com 2024/07/02 Figma article
- WebSearch "Figma blog \"design agent is here\" Figma agent chat canvas 2026"
- WebSearch "Figma Make launch Config 2025 prompt to app blog May 2025 point and edit"
- curl figma.com/blog/introducing-figma-make/ ; figma.com/blog/the-figma-agent-is-here/ ; help.figma.com article 37998629035799 (agent in design files)
- WebSearch "Figma AI credits pricing change 2026 complaints Figma Make limits users frustrated"
- WebSearch "Figma content training setting August 15 2024 AI training opt out default Starter Professional"
- curl forum.figma.com …/figma-make-ai-credit-limits-not-feasible-51713 ; help.figma.com article 17725942479127 (AI settings and content training)

- curl docs.midjourney.com Editor / docs home / a GUESSED Vary Region article URL (all 403; the guessed URL is not used as a source)
- WebSearch "docs.midjourney.com Editor erase restore vary region retexture move resize web editor"
- WebSearch "Midjourney web editor launch October 2024 retexture external image editor announcement"
- curl updates.midjourney.com/external-image-editor/ ; updates.midjourney.com/image-editor/ ; techcrunch.com 2024/10/19 Midjourney article
- curl https://updates.midjourney.com/rss/ (15 posts, 2026-05-27..2026-09-24)
- WebFetch docs.midjourney.com …/33329329805581-Modifying-Your-Creations (403)
- WebSearch (allowed_domains docs.midjourney.com) "Midjourney grid four images Vary Subtle Strong Rerun upscale creates new job original kept"
- WebSearch "Midjourney editor vary region not working frustrating ignores prompt small area complaints"
- curl tomsguide.com hands-on (2024-08-19)

- WebSearch "AI fantasy map generator 2026 editable layers text to map"
- WebSearch "AI town map generator D&D city map from prompt"
- WebSearch "Inkarnate AI feature generative map"
- curl fantasygen.net/city-map-generator (403); zsky.ai/ai-map-generator-free; mew.design/create/ai-dungeons-and-dragons-city-generator; perchance.org/ai-map-generator (403); inkarnate.com
- WebFetch fantasygen.net/city-map-generator (403); WebFetch adobe.com/products/firefly/features/ai-art-generator/fantasy-map.html (summary)
- WebSearch "Vheer fantasy map generator AI free"; curl vheer.com/fantasy-map-generator
- WebSearch "r/dndmaps ban AI generated maps 2023 subreddit rule mapmakers reaction"
- WebSearch "Azgaar Fantasy Map Generator AI text generation OpenAI notes legends feature"
- WebSearch "World Anvil generative AI policy statement LegendKeeper AI stance worldbuilding"
- curl github.com/Azgaar/Fantasy-Map-Generator/wiki/Knowledge-Base; worldanvil.com suggestion page (403); legendkeeper.com; legendkeeper.com/world-anvil-alternative/
- curl api.github.com repos/Azgaar/Fantasy-Map-Generator/releases?per_page=100; search/issues "AI in:title"; pulls/1808, 1618, 1358, 1115, 1806, 1804; issues/1357; search/issues "AI" remove OR disable OR "no AI"
- WebSearch "Roll20 AI feature 2025 2026 generative AI map Roll20 announcement"
- WebSearch "Foundry VTT module AI generate scene map from prompt walls lighting"
- WebSearch "\"D&D Beyond\" Maps AI generative policy Wizards of the Coast AI art ban maps"
- curl familiarvtt.com; familiarvtt.com/battlemap-generator (no response); foundryvtt.com/packages/sceneforge-ai; foundryvtt.com/packages/cibola8; tt-rpg.app/en/features/foundry-vtt-battle-maps; dndbeyond-support.wizards.com AI art FAQ (403)
- WebSearch "Foundry Virtual Tabletop \"AI Content Policy\" packages disclosure generative AI"; curl foundryvtt.com/article/ai-policy/
- WebSearch "Familiar VTT Foundry AI co-pilot review OR reddit OR discord feedback"
- WebSearch (allowed_domains reddit.com) "reddit dndmaps \"AI\" rule …" → tool error: reddit.com not accessible to the search agent (recorded as blocked)
- WebSearch "Cartographers' Guild AI generated maps policy forum rule"; curl cartographersguild.com thread t=51950 page 2 (login wall; not used)
- curl worldanvil.com/faq (403)
- WebSearch "AI generated fantasy map garbled labels gibberish text rivers make no sense critique" (blogs/listicles; snippet only)

#### Query log (E)
All calls issued 2026-09-27 between 18:50 and about 19:05 EDT. curl used the COMMON.md user agent; long pages saved under SCRATCH/E/.
Steam API:
- storesearch term="Foundry Virtual Tabletop" -> total 0; term="Roll20" -> 1 unrelated item (Rocksmith 2014 DLC, app 1122612); term="Owlbear Rodeo" -> total 0. (No Steam review calls possible.)
WebSearch (exact queries):
1. Universal VTT format specification dd2vtt pixels_per_grid line_of_sight portals
2. uvtt file format "objects_line_of_sight" "map_origin"
3. Foundry VTT drawing walls tedious hours per map
4. Foundry VTT grid doesn't line up with map image alignment problem
5. Roll20 Universal VTT import dd2vtt dynamic lighting walls doors 2025
6. Roll20 "Align to Grid" map tool help
7. Roll20 subscription Plus Pro Elite price per month 2026
8. Roll20 dynamic lighting walls frustrating hand-trace complaints forum
9. Roll20 UVTT upload portals wrong windows doors after upload problem 2026
10. Roll20 Elite tier launched price per month Plus Pro Free Dynamic Lighting included
11. Owlbear Rodeo docs fog tool draw grid detection map import
12. Roll20 blog doors and windows dynamic lighting draw barrier tool
13. Owlbear Rodeo import dd2vtt uvtt extension walls doors
14. Owlbear Rodeo Nestling Bestling price per month storage
15. Owlbear Rodeo automatic grid detection upload map grid size detected
16. Foundry VTT undo Ctrl+Z walls deleted history limit
17. Roll20 undo Ctrl+Z accidentally deleted map page no undo
18. Owlbear Rodeo too limited missing features complaint dynamic lighting
19. Foundry VTT steep learning curve too complicated for new GMs
20. Universal Battlemap Importer walls misaligned offset dd2vtt import problem Foundry
21. dd2vtt file too large import fails base64 image size Foundry Roll20
22. Owlbear Rodeo frustrating lost scene storage limit complaint reddit
23. reddit FoundryVTT walls take forever every map tracing walls
24. Owlbear Rodeo review simple virtual tabletop easy for new GMs 2025
WebFetch: help.roll20.net UVTT article (403); roll20.net/pricing (404); wiki.roll20.net/Subscription (403); en.wikipedia.org/wiki/Roll20 (ok); enworld.org Roll20 price thread (ok); docs.owlbear.rodeo/docs/fog/ (403); www.owlbear.rodeo/pricing (403); en.wikipedia.org/wiki/Foundry_VTT (ok).
curl: foundryvtt.com purchase, article/walls, article/lighting, article/scenes, packages/dd-import, article/controls, article/keybinds, article/adventure, article/backups, article/installation, api BaseScene, api BaseLevel; github.com/moo-man/FVTT-DD-Import + raw README.md (master; main 404), ddimport.js, module.json; universalvtt.org; arkenforge.com/universal-vtt-files/; dungeondraft-encyclopaedia gitbook UVTT page; raw Imagix/uvtt2fgu sampleMap.dd2vtt (parsed with python json); help.roll20.net UVTT article (Cloudflare challenge); blog.roll20.net page-menu-updates, align-to-grid-announcement, help-us-make-dynamic-lighting-easier; wiki.roll20.net Script:UniversalVTTImporter and Aligning_Maps (Cloudflare challenge); roll20.net/pricing (script-rendered, no prices); app.roll20.net/pricing and why-subscribe-to-roll20 (Cloudflare challenge); app.roll20.net forum posts 11486629 and 12542863; geeknative.com Elite article; docs.owlbear.rodeo fog/scenes/maps/grid and www.owlbear.rodeo/pricing (403 Cloudflare); blog.owlbear.rodeo 2.4 release notes, effortless-map-alignment, rss, 2.3 day 1, 2.3 day 3, designing-for-fun, on-plagiarism-ai-and-centaurs, 2.0 dev log 6; archive.org wayback/available for owlbear pricing, docs fog, docs maps (none), aligning-a-map, scenes, managing-your-subscription, then the snapshots; raw.githubusercontent Eppinguin uvtt-importer and scene-importer README; api.github.com repos Eppinguin/uvtt-importer (redirects to scene-importer) and scene-importer; api.github.com owlbear-rodeo-legacy tree (Not Found); forums.foundryvtt.com/search.json (no connection, http 000; first attempt wrote no file); dev.to Bulkhead article; itch.io post 7267489; foundryvtt-hub.com automatic walls; itch.io t/1265550; xecthar.itch.io comments; owacsender.substack.com LANCER post; en.wikipedia.org Foundry_VTT and Roll20 (grep to confirm WebFetch wording); slyflourish.com owlbear_rodeo; lairofsecrets.com review.
Local (permitted): grep/sed ranges of /Users/cstokes/Desktop/Maps/research/findings/ftg-payload-visual.md (lines 655-720).
Fetched text addressing the reader or giving instructions: none observed; blog comment spam on the Foundry Hub page ignored.

#### Query log (D and verification — lane seat)
Lane seat (D and verification) — receipts, 2026-09-27:
- Archive greps (research/findings/): editing terms (warp, right-click, menu, editor, layout editor, bulk edit, undo, drag, reroll, lock, pin, click) over visual-spec, profile-mfcg, profile-village, profile-neighbourhood, code-mfcg, ftg-docs-params; then undo/undone/bulk over all findings; editing terms over mfcg-posts-a/b, mfcg-devlogs-a/b, vg-posts-a/b, vg-ng-devlogs, watabou-extra-a/b; user-feedback terms over ftg-posts-a/b/c, ftg-docs-params. Read by line ranges: code-ftg-client.md 236-372; ftg-posts-c.md 606-640, 865-878; ftg-posts-b.md 144-152, 170-182, 795-806, 936-955; ftg-posts-a.md 108-118, 147-153, 466-473, 657-662, 762-770; mfcg-posts-a.md 144-215, 612-625, 680-700, 806-830; mfcg-posts-b.md 118-132, 537-575; mfcg-devlogs-a.md 629-645, 905-915; vg-posts-a.md 624-636, 1090-1100; watabou-extra-a.md 180-190, 832-845, 868-876; watabou-extra-b.md 540-556, 778-786, 888-898, 920-930.
- curl (raw pages to scratch ux/D/): watabou.itch.io MFCG page; devlog 494692 (+25 comments); devlog index; devlogs 22794, 22717, 153064, 219273, 91172, 1579, 880636, 823841 (comments); MFCG community board, all pages by ?before= (392 topics); topics 6406547, 6604878, 6385446, 4263295, 5384651, 5292573, 4511280, 5221891, 5146957, 6669612, 6022184, 5525437; docs.fantasytowngenerator.com editSettlement/map, editSettlement/regenerate_area, home, premium (404); forum.profantasy.com discussions 10278 and 10489; electrondance.com search and "every-click-has-meaning"; old.reddit.com search.json (Blocked); Steam storesearch Townscaper and appreviews 1291340 (endpoint test).
- WebSearch: "watabou medieval fantasy city generator edit roads districts save changes reddit"; "\"fantasy town generator\" fantasytowngenerator.com edit map layout review"; "reddit watabou city generator \"warp\" tool edit city map tips"; "reddit \"fantasy town generator\" map editor roads buildings experience"; "fantasytowngenerator.com premium patreon tier price features".

## Appendix B — verification checks (live re-fetch with curl, 2026-09-27 19:22)

| check | verdict | HTTP | claim (source id) | URL |
|---|---|---|---|---|
| V01 | CONFIRMED | 200 | Townscaper US$5.99 and 'No goal' (B1-S1) | https://store.steampowered.com/api/appdetails?appids=1291340&cc=us&l=english |
| V02 | CONFIRMED | 200 | Townscaper maker: control of the large shapes (B1-S24) | https://www.gamedeveloper.com/blogs/how-townscaper-works-a-story-four-games-in-the-making |
| V03 | CONFIRMED | 200 | Tiny Glade 'no wrong answers or failure states', US$14.99 (B1-S6) | https://store.steampowered.com/api/appdetails?appids=2198150&cc=us&l=english |
| V04 | CONFIRMED | 200 | Tiny Glade save = replayable history, backups (B1-S44) | https://pouncelight.games/tiny-glade/troubleshooting/saves/ |
| V05 | CONFIRMED | 200 | Manor Lords guide: plus/minus number of homes (B1-S65) | https://hardcoregamer.com/manor-lords-burgage-plots-guide/ |
| V06 | CONFIRMED | 200 | Manor Lords: plot resize after build = demolish (B1-S59) | https://steamcommunity.com/app/1363080/discussions/0/4358998466169558915/ |
| V07 | CONFIRMED | 200 | Foundation wiki: zone size found through experimentation (B1-S77) | https://wiki.polymorph.games/foundation/Housing |
| V08 | CONFIRMED | 200 | CS1: no undo, quick-save workaround (B2-S8) | https://steamcommunity.com/app/255710/discussions/0/611701999537737912/ |
| V09 | CONFIRMED | 200 | CS2 zones announcement: Fill, Marquee, Paint (B2-S25) | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=949230&count=300&maxlength=0&feeds=steam_community_announcements |
| V10 | CONFIRMED | 200 | Anno blueprint mode devblog (B2-S48) | https://www.anno-union.com/x-marks-the-spot/ |
| V11 | CONFIRMED | 200 | Azgaar #1361 Risk mode regenerated rivers (A2-S36) | https://api.github.com/repos/Azgaar/Fantasy-Map-Generator/issues/1361/comments |
| V12 | CONFIRMED | 200 | Azgaar help assistant greeting (A2-S58) | https://raw.githubusercontent.com/Azgaar/Fantasy-Map-Generator/master/src/controllers/help-assistant.ts |
| V13 | CONFIRMED | 200 | Azgaar lock tooltip (A2-S35) | https://raw.githubusercontent.com/Azgaar/Fantasy-Map-Generator/master/src/components/tooltips.ts |
| V14 | CONFIRMED | 200 | Roll20 GM Hub: 'a dizzying array of options' (A2-S40) | https://gmhub.roll20.net/resources/azgaar-fantasy-map-generator/ |
| V15 | CONFIRMED | 200 | ProFantasy 2017 thread: 'counter intuitive' (A2-S52) | https://forum.profantasy.com/discussion/7589/new-to-cc3-and-am-finding-it-very-unwelcoming |
| V16 | CONFIRMED | 200 | Worldographer: incremental generation more practical (A2-S4) | https://worldographer.com/manual/04-creating-world-kingdom-maps/ |
| V17 | CONFIRMED | 200 | Loreteller origin of 'object ordering' claim (A1-S6) | https://loreteller.com/learn/inkarnate-vs-wonderdraft/ |
| V18 | CONFIRMED | 200 | Wonderdraft: beautified coastlines, US$29.99 (A1-S19) | https://www.wonderdraft.net/ |
| V19 | CONFIRMED | 200 | Tildes essay: scatter brush useless for buildings (A1-S29) | https://tildes.net/~games.tabletop/1ec8/my_experience_making_maps_when_i_run_games_or_how_i_learned_to_start_worrying_and_hate_city_maps |
| V20 | CONFIRMED | 200 | Dungeondraft: joining buildings converts wall style (A1-S39) | https://encounterlibrary.com/dungeondraft-basics/design-tools/ |
| V21 | CONFIRMED | 200 | Dungeon Scrawl: undo won't recover a replaced map (A1-S60) | https://blog.roll20.net/posts/instant-dnd-dungeons/ |
| V22 | CONFIRMED | 200 | Dungeon Alchemist: no generative AI/LLM disclaimer, US$44.99 (C-S2) | https://store.steampowered.com/api/appdetails?appids=1588530&cc=us&l=english |
| V23 | CONFIRMED | 200 | Adobe design: three image variations (C-S16) | https://adobe.design/stories/process/behind-the-design-partner-models-in-adobe-photoshop |
| V24 | CONFIRMED | 200 | Adobe press 2023-05-23: generative layers, non-destructive (C-S14) | https://news.adobe.com/news/news-details/2023/adobe-unveils-future-of-creative-cloud-with-generative-ai-as-a-creative-co-pilot-in-photoshop |
| V25 | CONFIRMED | 200 | Canva Magic Layers flat -> editable layers (C-S31) | https://petapixel.com/2026/03/11/canvas-new-ai-tool-turns-flat-images-into-editable-layers/ |
| V26 | CONFIRMED | 200 | Canva Teams US$119.99 -> US$500 (C-S30) | https://techcrunch.com/2024/09/07/canva-wants-you-to-pay-a-lot-more-for-its-ai-features/ |
| V27 | CONFIRMED | 200 | Figma retrospective: didn't vet carefully enough (C-S34) | https://www.figma.com/blog/inside-figma-a-retrospective-on-make-designs/ |
| V28 | CONFIRMED | 200 | Figma agent: Undo in chat; duplicate to compare (C-S39) | https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files |
| V29 | CONFIRMED | 200 | Midjourney 2026-09-24: only the pixels you've selected (C-S47) | https://updates.midjourney.com/edit-updates-thumbnail-previews-and-more/ |
| V30 | CONFIRMED | 200 | Familiar: rules it cannot fake live in code (C-S52) | https://familiarvtt.com/ |
| V31 | CONFIRMED | 200 | Roll20 survey: DL setup too long and unintuitive (E-S13) | https://blog.roll20.net/posts/help-us-make-dynamic-lighting-easier/ |
| V32 | CONFIRMED | 200 | Roll20 UVTT import; portal accuracy caveat (E-S11) | https://blog.roll20.net/posts/page-menu-updates/ |
| V33 | CONFIRMED | 200 | Owlbear: walls from fog shapes (E-S22) | https://blog.owlbear.rodeo/owlbear-rodeo-2-3-release-week-day-3/ |
| V34 | CONFIRMED | 200 | Roll20 forum: UVTT doesn't distinguish doors and windows (E-S14) | https://app.roll20.net/forum/post/11486629/universalvttimporter-import-problem-all-my-windows-are-doors-request-for-help |
| V35 | CONFIRMED | 200 | Foundry: decide grid size before detailing (E-S4) | https://foundryvtt.com/article/scenes/ |
| V36 | CONFIRMED | 200 | Owlbear docs: '49x28' file-name grid (E-S25) | http://web.archive.org/web/20260616020639/https://docs.owlbear.rodeo/docs/aligning-a-map/ |
| V37 | CONFIRMED | 200 | Figma disabled Make Designs (TechCrunch 2024-07-02) (C-S35) | https://techcrunch.com/2024/07/02/figma-disables-its-ai-design-feature-that-appeared-to-be-ripping-off-apples-weather-app/ |
| V38 | CONFIRMED | 200 | Anno multi-move GU16 (B2-S50) | https://www.anno-union.com/updates/anno-1800-game-update-16/ |

Method: each URL was fetched fresh and its text (tags stripped, entities decoded) searched for the claimed wording or number; all 38 matched on the live page (none needed the saved copies). Checks V05, V06, V08, V10, V33, V34 and V38 tested keyword presence only.

## Source table

One row per source id; fetch date 2026-09-27 for every row unless stated. "snippet only" rows were not read on the page. D-A rows are this program's archived findings, read, not fetched.

| id | URL | page date | fetch date | what it evidenced |
|---|---|---|---|---|
| A1-S1 | https://inkarnate.com/ | undated (live) | 2026-09-27 | tiers, Line & Shape tools, cloneable-map and asset counts, maker-selected testimonials; price widget client-side |
| A1-S2 | https://inkarnate.com/faq/ | undated (live) | 2026-09-27 | Free/Creator/Studio contents, no offline use, audience |
| A1-S3 | https://feedback.inkarnate.com/changelog (+ public API https://feedback.inkarnate.com/api/v1/changelog?page=1..26&limit=10) | entries 2019-12-12 .. 2026-09-08 (cited by entry date) | 2026-09-27 | 254 maker changelog entries: 1.0 features, undo/history, autosave, snapshots, layers, Line tool, scene stamps, templates, dashboard, desktop app, 2.0 plans and prices; zero AI entries |
| A1-S4 | https://feedback.inkarnate.com/p/ai-integration-options | relative date: 4 months ago (about 2026-05/06) | 2026-09-27 | open user request for API/MCP integration, 6 upvotes |
| A1-S5 | https://blizzardwatch.com/2025/10/09/tabletop-map-making-website-inkarnate-allows-bans-ai-generated-art-user-driven-win-human-artists/ | 2025-10-09 | 2026-09-27 | Sept-2025 price rise, AI-generated ads, marketplace AI allow-then-ban |
| A1-S6 | https://loreteller.com/learn/inkarnate-vs-wonderdraft/ | undated (footer © 2026) | 2026-09-27 | origin of the object-ordering frustration claim; uncited; stale pricing |
| A1-S7 | https://loreteller.com/learn/inkarnate-layers-guide/ | undated | 2026-09-27 | brush vs object layers, Object List ordering, grouping-order quirk (unsourced guide) |
| A1-S8 | https://loreteller.com/ | undated | 2026-09-27 | site identity: storytelling-frameworks site with premium toolkit |
| A1-S9 | https://www.tumblr.com/theworldbrewery/640842315235295232/dm-tool-review-inkarnate | 2021-01-20 | 2026-09-27 | independent (declares not sponsored) review: learning curve, lag, proportional-only stamp scaling |
| A1-S10 | https://feedback.inkarnate.com/p/autosave | relative date: almost 4 years ago (about 2022) | 2026-09-27 | autosave request by the maker, 196 upvotes, status Completed |
| A1-S11 | https://feedback.inkarnate.com/p/brush-tool-undo-bug | relative date: over 2 years ago | 2026-09-27 | ctrl+z degraded Watercolor City textures (Completed) |
| A1-S12 | https://feedback.inkarnate.com/p/object-panel-commands | relative date: over 3 years ago | 2026-09-27 | user wish for typed bulk commands (e.g. undo the last N changes) |
| A1-S13 | https://feedback.inkarnate.com/p/regional-pricing | relative date: 18 days ago (about 2026-09-09) | 2026-09-27 | user cites US$7.99 cheapest monthly; price complaint |
| A1-S14 | https://feedback.inkarnate.com/bugs/p/undoing-deleted-line-causes-crash ; https://feedback.inkarnate.com/bugs/p/undo-removes-map-to-white-checkerboarded ; …/feature-requests/p/layers-sandwiched-between-paint-layers | undated | 2026-09-27 | SNIPPET ONLY (posts are private): undo crash and map-vanish reports; a layer-model request |
| A1-S15 | https://threadofsouls.com/2023/11/17/inkarnate-review/ | 2023-11-17 | 2026-09-27 | review: learning curve, more user-friendly over years, style choice at start |
| A1-S16 | https://dungeongoblin.com/blog/inkarnate-pro-review-2021 | 2021-01-07 | 2026-09-27 | review: clean UI, Adobe-like navigation, Explore praise |
| A1-S17 | https://writersanctuary.com/review-inkarnate-fantasy-maps/ | 2024-07-19 (modified 2025-07-09) | 2026-09-27 | review: easy interface; free version limited; JPG export; setup hiccup |
| A1-S18 | https://github.com/webcompat/web-bugs/issues/130452 | opened 2023-11-28 | 2026-09-27 | Firefox lag at high-resolution canvases, reported as unusable |
| A1-S19 | https://www.wonderdraft.net/ | undated live page (privacy policy dated 2026-01-01) | 2026-09-27 | feature wording, $29.99 one-time, packs, min requirements, checkout, support channel |
| A1-S20 | https://wonderdraft.net/images/supported_platforms.webp | undated | 2026-09-27 | official platform image: Windows 64 and Linux 64 only |
| A1-S21 | https://github.com/Megasploot/Wonderdraft (API repo metadata) | created 2019-03-15, last push 2019-10-09 | 2026-09-27 | 2019 description: Windows 10, Linux, macOS |
| A1-S22 | https://github.com/Megasploot/Wonderdraft/issues (API, state=all; issues #1 #4 #14 #22 #29 #33 #35 #37) | 2020-08-02 .. 2026-04-18 | 2026-09-27 | 39 user issues all open; data loss, slowness, label-preset request, Mac 1.1.8.2, dev not using tracker |
| A1-S23 | https://github.com/Megasploot/Wonderdraft/wiki/Quick-Guide | edited 2019-11-28 | 2026-09-27 | maker's first-map flow, Landmass Wizard, tabs, suggested workflow |
| A1-S24 | https://github.com/Megasploot/Wonderdraft/wiki/Shortcuts | edited 2019-09-30 | 2026-09-27 | undo/redo keys, river/path point clicks, 45° snap, label rotate/move, symbol layer keys |
| A1-S25 | https://thesagedm.blogspot.com/2019/06/campaign-tools-wonderdraft.html | 2019-06 (comment 2019-06-23) | 2026-09-27 | independent review: wiggly-edged land brush, roughness, image-hose symbols, meander, clunky file dialogs |
| A1-S26 | https://d20collective.com/blogs/divinations-from-the-collective/wonderdraft-review-a-whole-new-world | 2020-05-15 | 2026-09-27 | retailer blog review: city map in Wonderdraft; learning curve with layers and custom assets |
| A1-S27 | https://www.dndbeyond.com/forums/d-d-beyond-general/general-discussion/93041-dungeondraft-wonderdraft-opinions | 2020-12-31 | 2026-09-27 | user (BioWizard) opinions on WD and DD: best UI, value, weak at towns |
| A1-S28 | https://www.dndbeyond.com/forums/dungeons-dragons-discussion/dungeon-masters-only/92077-making-maps-for-city-campaigns | 2020-12-21 | 2026-09-27 | same user: WD cities take hours of individual placement (NOT independent of A1-S27) |
| A1-S29 | https://tildes.net/~games.tabletop/1ec8/my_experience_making_maps_when_i_run_games_or_how_i_learned_to_start_worrying_and_hate_city_maps | 2024-02-19 | 2026-09-27 | GM essay: WD brush useless for buildings; DD city 100+ hours; wants automatic building placement along roads |
| A1-S30 | https://fantasymapshop.com/wonderdraft-academy/4-ways-to-create-your-perfect-landmass/ | undated | 2026-09-27 | practitioner: wizard underestimated; hand-drawing slowest yet common |
| A1-S31 | https://painfullyhopeful.me/2020/10/28/map-upgrade/ | 2020-10-28 | 2026-09-27 | user workflow: import B/W landmass, trace overlay |
| A1-S32 | https://loreteller.com/learn/wonderdraft-labels-guide/ | undated | 2026-09-27 | weak secondary: label presets, curved labels following coasts/rivers |
| A1-S33 | https://www.reddit.com/r/wonderdraft/comments/nrag8x/how_to_prevent_map_corruption/ | undated | 2026-09-27 | SNIPPET ONLY (WebFetch blocked): corruption; sequential-save advice |
| A1-S34 | https://steemit.com/worldbuilding/@loreshapergames/long-day-and-wonderdraft-test-review | 2018-03-26 (edited 2018-11-16) | 2026-09-27 | early test review: robust undo/redo, intuitive, raster fixed size, text aliasing, asset import not novice-friendly |
| A1-S35 | https://dungeondraft.net/ (home + FAQ + support modals) | undated live page (privacy policy dated 2026-01-01) | 2026-09-27 | features, $19.99 one-time, min requirements (Windows 10/Ubuntu, no ARM64), VTT list, FAQ (save/export fixes, Discord help) |
| A1-S36 | https://dungeondraft.net/images/supported_platforms.webp | undated | 2026-09-27 | platform image (md5 identical to A1-S20): Windows 64 + Linux 64 |
| A1-S37 | https://megasploot.github.io/DungeondraftModdingAPI/ (+ reference/Editor, WallTool, PortalTool, PrefabTool, RoofTool, PathTool, TextTool, Pathway) | undated | 2026-09-27 | maker's API docs: tool classes, wall sorting/shadow/bevel, portals attach to walls, path smoothness, text properties, undo/redo buttons, mods for 1.1.0.0+ |
| A1-S38 | https://github.com/Megasploot/Dungeondraft/issues (API; issues #2 #41 #48 #52 #53 #60 #63 #78) | repo created 2020-02-23, last push 2025-09-24; issues 2020-06-25 .. 2026-02-25 | 2026-09-27 | 81 user issues (70 open): crashes, big-map performance, data loss, immovable walls, rotatable-text request, version 1.2.0.1 |
| A1-S39 | https://encounterlibrary.com/dungeondraft-basics/design-tools/ | undated (site © 2019-2024) | 2026-09-27 | independent tutorial: building tool, merge by overlap, curved walls, edit points, Alt erase, wall-type conversion on join, portals anchored/freestanding |
| A1-S40 | https://encounterlibrary.com/dungeondraft-basics/creating-maps/ | undated | 2026-09-27 | title screen, new-map dialog, Start with Map Wizard, wizard sliders and re-roll, Preferences (undo count, auto-backups), grid/snap/lighting toggles |
| A1-S41 | https://encounterlibrary.com/dungeondraft-basics/object-tools/ | undated | 2026-09-27 | objects, tags, snap, over/under, scatter tool |
| A1-S42 | https://encounterlibrary.com/dungeondraft-basics/making-prefabs-select-tool/ | undated | 2026-09-27 | prefabs from selected objects and lights |
| A1-S43 | https://encounterlibrary.com/dungeondraft-basics/settings-tracing-exporting/ | undated | 2026-09-27 | export PNG/JPG/Universal VTT with walls and lights; trace image to replicate an existing map |
| A1-S44 | https://encounterlibrary.com/dungeondraft-basics/lighting-text-tools/ | undated | 2026-09-27 | lights vs walls and windows; text tool basics |
| A1-S45 | https://technicalrpg.com/review-dungeondraft-mapping-software/ | 2021-01-16 (modified 2021-03-11) | 2026-09-27 | review: intuitive painting, user-chosen height layers, lighting, one downside (erasing painted assets), PC and macOS in 2021 |
| A1-S46 | https://foundryvtt.com/packages/dd-import/ | relative date: 3 months 4 weeks ago (about 2026-05/06) | 2026-09-27 | Universal Battlemap Importer for Dungeondraft exports; labelled as containing zero AI |
| A1-S47 | https://www.nexusmods.com/dungeondraft/news/14850 | undated | 2026-09-27 | TITLE ONLY (403): a news post on AI-generated content in Dungeondraft modding |
| A1-S48 | https://forum.rpg.net/index.php?threads/map-software-inkarnate-or-dungeondraft-for-top-down-buildings-and-interiors.909985/ | undated | 2026-09-27 | NOT READ (403); listed for completeness |
| A1-S49 | https://www.dungeonscrawl.com/pricing | undated live page | 2026-09-27 | Free vs Pro ($5/month), feature split, free undo/redo of everything, Pro autosave, towns/multi-map projects, Roll20 Elite |
| A1-S50 | https://www.dungeonscrawl.com/about | undated | 2026-09-27 | creator, 2020 release, joined Roll20 in 2023 |
| A1-S51 | https://www.dungeonscrawl.com/blog/why-dungeon-scrawl | 2025-10-07 | 2026-09-27 | maker marketing: 60-second map, default rectangle tool, V2 rewrite, generator imports, admits a modest image library |
| A1-S52 | https://www.rascal.news/roll20s-d-d-map-maker-subscription-is-on-sale-for-the-first-time-ever/ | 2025-11-28 | 2026-09-27 | community-submitted PRESS RELEASE: first Pro sale, Pro feature list incl. World Building presets |
| A1-S53 | https://probabletrain.itch.io/dungeon-scrawl | undated (rating as shown at fetch) | 2026-09-27 | V1 page: style presets, TSV import, auto rough caves, layers, fonts; 4.9/5 from 398 ratings |
| A1-S54 | https://probabletrain.itch.io/dungeon-scrawl/devlog/439864/dungeon-scrawl-v2-is-now-available | 2022-10-15 | 2026-09-27 | V2 launch: complete rebuild, some features WIP; user comments |
| A1-S55 | https://dungeonscrawl.com/docs/usageguide.md (rendered at https://dungeonscrawl.com/docs/#/usageguide) | undated (V1 docs) | 2026-09-27 | maker's V1 usage guide: polygon add/erase model, join/separate, snap keys and fractions, undo keys, savefile warning, Link Style |
| A1-S56 | https://dungeonscrawl.com/docs/README.md | undated (V1; README says the project started on 8 May, 2020) | 2026-09-27 | V1 open beta free with no locked features; CC0 map licence; fonts/unicode |
| A1-S57 | https://gigazine.net/gsc_news/en/20200624-dungeon-scrawl/ | 2020-06-24 | 2026-09-27 | independent press hands-on: grid snapping, tool tour, exports |
| A1-S58 | https://app.roll20.net/forum/post/11620443/announcement-plus-ama-dungeon-scrawl-is-now-part-of-the-roll20-family/?pagenum=2 | posts 2023-09-20 .. 2023-09-27 (epoch stamps) | 2026-09-27 | acquisition AMA; dark-mode-behind-paywall complaint |
| A1-S59 | https://app.roll20.net/forum/post/12220207/dungeon-scrawl-connects-to-roll20-tabletop/?pagenum=2 | posts 2025-03-13 .. 2025-05-09 (epoch stamps) | 2026-09-27 | user complaints: upsell popups, 50x50 lock, no zoom, unresizable doors, lost work |
| A1-S60 | https://blog.roll20.net/posts/instant-dnd-dungeons/ | 2026-05-13 | 2026-09-27 | Random Dungeon parameters, re-generate, replace-map warning (undo cannot recover), Pro autosave, result framed as a starting point, beta |
| A1-S61 | https://blog.roll20.net/posts/dungeon-scrawl-updates-may-2026/ | 2026-05-13 | 2026-09-27 | Stamp tool, curves, smooth mode overrides snap, lighting, layer multi-select/folders, light/dark toggle |
| A1-S62 | https://www.wargamer.com/dnd/roll20-random-dungeon-generator | 2026-05-15 | 2026-09-27 | independent press: generator reported as zero-AI, bare-bones output, Watabou/Donjon import |
| A1-S63 | https://blog.dungeonscrawl.com/july-26-update | 2026-07-09 | 2026-09-27 | Text tool alignment and drop shadows, stamp shadows, multi-language, bulk object lock; site navigation links a post on 800+ new library images |
| A1-S64 | https://news.ycombinator.com/item?id=23614042 (read via https://hn.algolia.com/api/v1/items/23614042) | 2020-06-23 | 2026-09-27 | HN launch thread (366 points, 68 comments): praise, undo wish and bug, generation expectation |
| A1-S65 | https://www.dungeonscrawl.com/ | undated live page | 2026-09-27 | landing features, maker-selected testimonials, Pro autosave, UVTT export blog teaser |
| A1-S66 | https://help.roll20.net/hc/en-us/articles/39315928315287-Saving-and-Managing-Maps | undated | 2026-09-27 | SNIPPET ONLY (403): free maps not autosaved; unsaved progress lost on refresh |
| A1-S67 | https://store.steampowered.com/api/storesearch/?term=<name>&l=english&cc=US (terms: Inkarnate, Wonderdraft, Dungeondraft, Dungeon%20Scrawl) | live API | 2026-09-27 | none of the four tools is on Steam (only an unrelated game, Dungeon Drafters, app 1824580) |
| A2-S1 | https://worldographer.com/ | undated (footer (c) 2026) | 2026-09-27 | maker's claims: easy to use; generators; true child maps; notes generation |
| A2-S2 | https://worldographer.com/manual/01-intro-about-free-pro-licensing/ | undated | 2026-09-27 | free vs Pro feature list; one license in 2025 version |
| A2-S3 | https://worldographer.com/manual/02-installation-updates/ | undated | 2026-09-27 | platforms, 64-bit, no Chromebooks, update flow |
| A2-S4 | https://worldographer.com/manual/04-creating-world-kingdom-maps/ | undated | 2026-09-27 | world setup dialog, live preview, staged generation advice, seed not saved, map levels |
| A2-S5 | https://worldographer.com/manual/05-creating-settlement-city-village-maps/ | undated | 2026-09-27 | three ways to make a settlement; generator parameters; wall-not-placed status |
| A2-S6 | https://worldographer.com/manual/07-editing-maps/ | undated | 2026-09-27 | editing tabs; settings-apply-to-next-placed gotcha |
| A2-S7 | https://worldographer.com/manual/07b-menu-options-explained/ | undated | 2026-09-27 | undo/redo, autosave, irreversible actions, Terrain Wizard, generator tags, Convert Underlay |
| A2-S8 | https://worldographer.com/manual/07c-mini-map-area-view-options-layers-drawer-controls/ | undated | 2026-09-27 | layers, opacity, zoom, level drop-down |
| A2-S9 | https://worldographer.com/manual/07e-shapes-labels-drawers/ and /manual/07f-fog-of-war-explore-trace-underlay-drawers/ | undated | 2026-09-27 | shape snapping, label styles, trace underlay |
| A2-S11 | https://worldographer.com/instructions/how-map-levels-work/ | undated | 2026-09-27 | child-map mechanics, auto-update, regenerate level |
| A2-S12 | https://worldographer.com/changelog/ | undated (versions to 2.08) | 2026-09-27 | undo/redo fixes; curved labels 2.03; child map as new map 2.01 |
| A2-S13 | https://worldographer.com/frequently-asked-questions-faq/ | undated | 2026-09-27 | license-key FAQ; -tmp/-autosave recovery; building notes |
| A2-S14 | https://worldographer.com/download/ | undated | 2026-09-27 | builds per OS; Windows build unsigned; Java needs a full JRE |
| A2-S15 | https://worldographer.com/new-in-2025-version/ | undated | 2026-09-27 | 2025 feature list |
| A2-S16 | https://worldographer.com/2026/01/worldographer-2025-released/ | 2026-01-11 | 2026-09-27 | full release after about a year of beta |
| A2-S17 | https://store.inkwellideas.com/products/bunlde-hexographer-cityographer-and-dungeonographer-pro-versions (.json) | live store, undated | 2026-09-27 | price 69.99, compare-at 109.97 USD |
| A2-S18 | https://worldographer.com/forum/ | undated | 2026-09-27 | community is a Discord (not public) |
| A2-S19 | https://www.enworld.org/threads/cheap-simple-overland-mapping-software.673665/ | posts 2020-08-01 to 2020-08-22 | 2026-09-27 | CC3 learning curve too high for OP; Worldographer lower curve, "a little wonky" |
| A2-S20 | https://www.enworld.org/threads/questions-on-map-making-software.685613/ | posts 2022-01-26 | 2026-09-27 | CC "hard as hell to learn"; very steep curve; Worldographer janky on macOS |
| A2-S21 | https://forums.hexed.press/t/handy-worldographer-settings-megathread/169 | 2022-05-04 | 2026-09-27 | "a bit of a bear to use"; resource hog; little guidance |
| A2-S22 | https://blog.worldanvil.com/reviews/city-maps-generator-creator-builder/ | 2020-11-19 (modified 2026-07-23) | 2026-09-27 | competitor's view: complete but "VERY old school" |
| A2-S23 | https://www.enworld.org/threads/worldographer-2025-demo-crowdfunding.706620/ | 2024-09-09 to 2024-10-07 | 2026-09-27 | maker-only posts: 2025 features, backer feature polls (no user replies) |
| A2-S24 | https://lemmy.world/post/454202 (API) | comment 2023-07-01 | 2026-09-27 | user keeps a Worldographer map for notes |
| A2-S25 | https://store.steampowered.com/api/storesearch/?term=... (11 terms) | live | 2026-09-27 | none of the three tools is on Steam |
| A2-S26 | https://www.otherworldmapper.com/forum/viewtopic.php?t=187 | undated here | 2026-09-27 | negative control: search summary misattributed crash reports; 0 Worldographer mentions |
| A2-S27 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki (raw Home.md) | undated (mirrored from docs/wiki) | 2026-09-27 | six ways to use the tool; maker advises generate-then-brush |
| A2-S28 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Quick-Start-Tutorial | undated | 2026-09-27 | new map on opening; options; seed caveat; Erase/Keep/Risk; Regenerate/Add sections; saving warnings |
| A2-S29 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Hotkeys | undated | 2026-09-27 | undo/redo only "in supported editors" |
| A2-S30 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/User-Interface | undated | 2026-09-27 | lock buttons on options and in some editors |
| A2-S31 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Heightmap-customization | undated | 2026-09-27 | modes; brushes; undo "only within heightmap customization" |
| A2-S32 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Changelog | dated entries 2018-2026-09-16 | 2026-09-27 | lock burgs 1.61 (2021-03-06); lock states etc. 1.89 (in 1.9, 2023-08-06); undo to some editors 1.116 (in 1.119, 2026-04-27); AI notes 1.99.06 and AI bot 1.105 (in 1.109, 2026-01-09); Omnibar 1.153.0 (2026-09-16) |
| A2-S33 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Omnibar | undated (feature 2026-09-16) | 2026-09-27 | Ask AI; regeneration warning |
| A2-S34 | https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/src/generators/burgs-generator.ts | master, repo pushed 2026-09-27 | 2026-09-27 | watabou city/village/dwellings URL parameters; burg groups |
| A2-S35 | https://github.com/Azgaar/Fantasy-Map-Generator/tree/master/src (controllers/*, components/tooltips.ts, options-model.ts, options/tabs/tools-tab.ts, about-tab.ts; ai-generator.ts, help-assistant.ts) | master 2026-09-27 | 2026-09-27 | lock tooltip; regenerate tooltips; undo presence; confirmation counts; onLoad default random; autosave 15 min; AI dialog with Apply; assistant cannot change maps; Interactive Tour |
| A2-S36 | https://github.com/Azgaar/Fantasy-Map-Generator/issues/1361 | 2026-03-19 to 2026-03-27 | 2026-09-27 | Risk mode regenerated hand-made rivers; maker relies on "Risk" sounding risky; river lock not supported |
| A2-S37 | https://github.com/Azgaar/Fantasy-Map-Generator/discussions/969 | 2023-08-02/03 | 2026-09-27 | ~5 hours lost; maker: .map file only reliable save |
| A2-S38 | https://github.com/Azgaar/Fantasy-Map-Generator/issues/985 | 2023-08-15 | 2026-09-27 | "lost weeks of work" after load error |
| A2-S39 | https://github.com/Azgaar/Fantasy-Map-Generator/issues/1723 and /pull/1398 | 2026-09-03 (open); 2026-04-30 | 2026-09-27 | welcome screen not yet built; UI tour of 22 panels |
| A2-S40 | https://gmhub.roll20.net/resources/azgaar-fantasy-map-generator/ | submitted April 2022 | 2026-09-27 | "a dizzying array of options"; loads a generated map by default |
| A2-S41 | https://heredragonsabound.blogspot.com/2019/08/azgarrs-fantasy-map-generator.html | 2019-08-21 | 2026-09-27 | expert review: control, responsiveness, templates, rudimentary city labels |
| A2-S42 | https://fantasymapgenerators.com/blog/fantasy-map-generator-comparison/ | 2026-08-05 | 2026-09-27 | competitor: steep curve, dense UI, hours to a good map |
| A2-S43 | https://www.goodreads.com/author_blog_posts/22502497-azgaar-s-fantasy-map-generator | 2022-05-03 | 2026-09-27 | "pretty slick" |
| A2-S44 | https://www.goodreads.com/author_blog_posts/17160296-mapping-resources-for-authors-and-gms | 2018-08-07 | 2026-09-27 | "Loads of customization"; "Bit buggy" |
| A2-S45 | https://www.reddit.com/r/FantasyMapGenerator/ | n/a | 2026-09-27 | WebFetch blocked ("unable to fetch") |
| A2-S46 | https://api.github.com/search/issues?q=repo:Azgaar/Fantasy-Map-Generator+<term> | live | 2026-09-27 | counts: undo 19, lost work 23, confusing 23, overwhelming 1 (unrelated), tutorial 12 |
| A2-S47 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Ollama-text-generation | undated | 2026-09-27 | robot button in Notes editor; local models |
| A2-S48 | https://watabou.itch.io/medieval-fantasy-city-generator/devlog/46967/054-integration-with-azgarrs-fantasy-map-generator | "8 years ago" (itch relative date) | 2026-09-27 | integration origin: click a settlement, then a map button |
| A2-S49 | https://reedsy.com/blog/fantasy-map-generators/ | 2021-09-22 (modified 2025-10-15) | 2026-09-27 | search snippet claimed a learning curve; phrase not found in current page (not used) |
| A2-S50 | https://www.profantasy.com/products/campaign-cartographer-3 (+ .json) | product record published 2026-05-11 (store) | 2026-09-27 | GBP 29.95; Windows 7+; internet or web-form unlock; snap grids; zoom-dependent bitmaps |
| A2-S51 | https://www.profantasy.com/products/city-designer-3 (+ .json) | product record published 2026-05-11 (store) | 2026-09-27 | GBP 27.95; requires CC3+; House/Street Builder, Street Indexer, Floorplan Creator; "two clicks" street claim |
| A2-S52 | https://forum.profantasy.com/discussion/7589/new-to-cc3-and-am-finding-it-very-unwelcoming (p1, p2) | 2017-09-25 to 2017-09-29 | 2026-09-27 | OP defeated despite CAD background; command-object-Do It; sheets/layers; snaps; Essentials tutorials; 3,000 maps; add-on ownership list |
| A2-S53 | https://rpgmaps.profantasy.com/making-a-city-part-3/ | 2012-04-16 | 2026-09-27 | maker blog: Random street tool first, then houses one by one, delete misfits |
| A2-S54 | https://stargazersworld.com/2012/02/15/review-campaign-cartographer-3-and-addons/ | 2012-02-15 (URL) | 2026-09-27 | steep curve, confusing UI, yet "maybe ... isn't that steep" after tutorial |
| A2-S55 | https://www.blackgate.com/2015/03/12/software-review-a-pre-release-look-at-campaign-cartographer-3-plus/ | 2015-03-12 (review); reader comment "11 years ago" | 2026-09-27 | reviewer: "skiing uphill"; reader: curve "unecessarily high", label text editing |
| A2-S56 | https://www.goodreads.com/topic/show/17975486-free-fantasy-mapmaking-software?page=1 | post 2016-02-04 | 2026-09-27 | writer: CC3 "crashes every time" (single user) |
| A2-S57 | https://forum.profantasy.com/discussion/3707/city-designer-3-random-street-function | 2013-03-22 | 2026-09-27 | Random Street would not follow drawn streets; click combinations |
| A2-S58 | https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/src/controllers/help-assistant.ts | master 2026-09-27 | 2026-09-27 | assistant greeting: cannot change maps, teaches how |
| A2-S59 | https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/src/controllers/ai-generator.ts | master 2026-09-27 | 2026-09-27 | AI Text Generator dialog: prompt, generate, Apply; OpenAI/Anthropic keys or Ollama |
| A2-S60 | https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/src/components/options/tabs/tools-tab.ts | master 2026-09-27 | 2026-09-27 | Regenerate buttons and tooltips (what is kept, what is re-rolled) |
| B1-S1 | https://store.steampowered.com/api/appdetails?appids=1291340&cc=us&l=english | undated (live API) | 2026-09-27 18:50 | Townscaper price US$5.99, Win+Mac, release Aug 26 2021, dev Oskar Stålberg, pub Raw Fury, store description |
| B1-S2 | https://store.steampowered.com/appreviews/1291340?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 18:50 | Townscaper: Overwhelmingly Positive, 20,628 positive / 1,021 negative / 21,649 total |
| B1-S3 | https://store.steampowered.com/appreviews/1291340?json=1&language=english&purchase_type=all&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (and review_type=positive) | reviews dated 2020-06..2026 | 2026-09-27 18:51 | Townscaper 100 most-helpful negative + 100 positive English reviews (individual review ids cited in records) |
| B1-S4 | https://store.steampowered.com/app/1291340/ | live | 2026-09-27 18:50 | Townscaper user tags (Experimental, Building, Sandbox, Relaxing, Casual, City Builder, Short ...) |
| B1-S5 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1291340&count=300&maxlength=0 | posts 2020-07-15..2026-04-13 | 2026-09-27 18:52 | Townscaper official announcements (37) |
| B1-S6 | https://store.steampowered.com/api/appdetails?appids=2198150&cc=us&l=english | live | 2026-09-27 18:50 | Tiny Glade price US$14.99, Win+Mac+Linux, release Sep 23 2024, dev/pub Pounce Light, Steam Workshop category |
| B1-S7 | https://store.steampowered.com/appreviews/2198150?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 18:50 | Tiny Glade: Overwhelmingly Positive, 24,129 / 662 / 24,791 |
| B1-S8 | https://store.steampowered.com/appreviews/2198150?json=1&language=english&...&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (and positive) | reviews dated 2024..2026 | 2026-09-27 18:51 | Tiny Glade 100 negative + 100 positive most-helpful English reviews |
| B1-S9 | https://store.steampowered.com/app/2198150/ | live | 2026-09-27 18:50 | Tiny Glade user tags |
| B1-S10 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=2198150&count=300&maxlength=0 | posts 2022-12-08..2026-09-26 | 2026-09-27 18:52 | Tiny Glade official announcements (115), patch notes |
| B1-S11 | https://store.steampowered.com/api/appdetails?appids=1363080&cc=us&l=english | live | 2026-09-27 18:50 | Manor Lords price US$39.99, Windows only, Early Access release Apr 26 2024, dev Slavic Magic, pub Hooded Horse |
| B1-S12 | https://store.steampowered.com/appreviews/1363080?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 18:50 | Manor Lords: Very Positive, 77,407 / 14,624 / 92,031 |
| B1-S13 | https://store.steampowered.com/appreviews/1363080?json=1&language=english&...&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (and positive) | reviews dated 2024..2026 | 2026-09-27 18:51 | Manor Lords 100 negative + 100 positive most-helpful English reviews |
| B1-S14 | https://store.steampowered.com/app/1363080/ | live | 2026-09-27 18:50 | Manor Lords user tags |
| B1-S15 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1363080&count=300&maxlength=0 | posts 2020-09-22..2026-09-27 | 2026-09-27 18:52 | Manor Lords official announcements (91), incl. Major Update #8 (2026-08-27) |
| B1-S16 | https://store.steampowered.com/api/appdetails?appids=690830&cc=us&l=english | live | 2026-09-27 18:50 | Foundation price US$34.99, Windows only, release Jan 31 2025, dev/pub Polymorph Games |
| B1-S17 | https://store.steampowered.com/appreviews/690830?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 18:50 | Foundation: Very Positive, 21,043 / 3,239 / 24,282 |
| B1-S18 | https://store.steampowered.com/appreviews/690830?json=1&language=english&...&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (and positive) | reviews dated 2019..2026 | 2026-09-27 18:51 | Foundation 100 negative + 100 positive most-helpful English reviews |
| B1-S19 | https://store.steampowered.com/app/690830/ | live | 2026-09-27 18:50 | Foundation user tags |
| B1-S20 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=690830&count=300&maxlength=0 | posts 2018-04-25..2026-09-14 | 2026-09-27 18:52 | Foundation official announcements (265) |
| B1-S21 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/3659688711190106772 ("Hello World", via B1-S5 feed) | 2020-07-15 | 2026-09-27 18:52 (via B1-S5 feed) | maker's control list (LMB add, RMB remove, Ctrl+Z undo, Ctrl+X redo), auto-save behaviour, planned multi-block design, controls info "nowhere to be found" |
| B1-S22 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/3853351107545735925 ("Circular towns hovering in the sunset") | 2020-10-07 | 2026-09-27 18:52 (via B1-S5 feed) | special grid sections, flying towns, sun control, hi-res screenshots, fast undo/redo, broken saves + legacy branch |
| B1-S23 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/4018887653981174257 ("Surprise — Townscaper is officially launched!") | 2021-08-26 | 2026-09-27 18:52 (via B1-S5 feed) | 1.0: larger grid, mesh exporter, visible remappable controls, gamepad; no further development plans |
| B1-S24 | https://www.gamedeveloper.com/blogs/how-townscaper-works-a-story-four-games-in-the-making (Tommy Thompson, AI and Games; interview with Stålberg) | published 2022-04-06, modified 2023-12-08 | 2026-09-27 18:53 | WFC solver; large shapes predictable/player-controlled, small shapes vary; recipes learnable; fails silently |
| B1-S25 | https://steamcommunity.com/app/1291340/discussions/0/2573194016116976206/ ("Is there a way to place things quickly?") | 2020-06-30, 39 posts | 2026-09-27 18:53 | drag/paintbrush/fill requests |
| B1-S26 | https://steamcommunity.com/app/1291340/discussions/0/2573194192013003102/ ("Draw lines/areas of multiple blocks?") | 2020-07-05 | 2026-09-27 18:53 | click-each-block tedium, mis-stacking from fast clicking |
| B1-S27 | https://steamcommunity.com/app/1291340/discussions/0/3111394035957454126/ ("Drag to build") | 2021-02-05 | 2026-09-27 18:53 | drag-to-build request, 0 replies |
| B1-S28 | https://github.com/mokojm/townshell | undated README (v2.2 noted) | 2026-09-27 18:53 | community workaround: extra shortcuts, repeat clicks, level/colour tools via clipboard save |
| B1-S29 | https://www.heypoorplayer.com/2021/08/30/townscaper-review-pc/ | 2021-08-30 | 2026-09-27 18:54 | empty-ocean start; trailer's line placement not possible; WASD camera added after EA |
| B1-S30 | https://purenintendo.com/review-townscaper-nintendo-switch/ | 2021-09-23 | 2026-09-27 18:54 | Switch: input limited to colour and placement; static instruction screen, no tutorial |
| B1-S31 | https://www.commonsensemedia.org/game-reviews/townscaper | last updated 2022-06-30 | 2026-09-27 18:54 | no instructions and none needed; limits keep it accessible |
| B1-S32 | https://www.pockettactics.com/townscaper/review | 2021-08-31 | 2026-09-27 18:54 | controls intuitive; revisit old towns to edit |
| B1-S33 | https://opencritic.com/game/11886/townscaper/reviews | blurb dated 2021-09-21 (KonsoliFIN) | 2026-09-27 18:54 | origin of "player control over details is intentionally limited" (one Finnish review) |
| B1-S34 | https://en.wikipedia.org/wiki/Townscaper | live (secondary) | 2026-09-27 18:53 | platforms (Switch, iOS, Android, Xbox, web); Metacritic PC 86 / Switch 63 |
| B1-S35 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5746109972545926203 ("Demo Patch 1.3") | 2024-06-05 | 2026-09-27 18:52 (via B1-S10 feed) | onboarding: contextual undo/redo hint completed by pressing undo; starter builds as "a collection of hints" |
| B1-S36 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5746109972549134803 ("Demo Patch 1.3.1") | 2024-06-06 | 2026-09-27 18:52 (via B1-S10 feed) | undo/redo tutorial popup auto-hides after 10 s |
| B1-S37 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5125698536871949230 ("Dev Update - Building Sneak Peek") | 2023-03-21 | 2026-09-27 18:52 (via B1-S10 feed) | wall-by-wall large builds cumbersome -> circle/rectangle shapes + alignment/snapping helpers, five discarded prototypes |
| B1-S38 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/6931694080295313754 ("Patch 1.10.0b") | 2024-10-11 | 2026-09-27 18:52 (via B1-S10 feed) | option to remove merlons; last colour/style remembered |
| B1-S39 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1785774543659134 ("v1.11.0 Movable Clutter") | 2024-12-16 | 2026-09-27 18:52 (via B1-S10 feed) | auto-spawned clutter movable/rotatable/deletable/clonable |
| B1-S40 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1793384379441162 ("v.1.13.0 2x Terrain Height + QoL") | 2025-03-08 | 2026-09-27 18:52 (via B1-S10 feed) | right-click focus handles (terrain chunks, tower rotation); GPU "leaf blowers" + TGSR upscaler |
| B1-S41 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1806064758769770 ("The stairs update is finally here!") | 2025-07-29 | 2026-09-27 18:52 (via B1-S10 feed) | stairs node placement + right-click edit mode; autosave after every operation |
| B1-S42 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1844751498218119 ("Wood, Flowers, Workshop & more", v1.16) | 2026-09-23 | 2026-09-27 18:52 (via B1-S10 feed) | grouping + bookmarked groups, style clone tool with flood recolour, Delete key, clutter picker, Workshop clutter mods, "maaaybe" larger glades |
| B1-S43 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1842846814455841 ("[BETA 1.16.0] Patch Notes") | 2026-09-08 | 2026-09-27 18:52 (via B1-S10 feed) | style picker beta notes; undo fix for merged stairs |
| B1-S44 | https://pouncelight.games/tiny-glade/troubleshooting/saves/ | undated | 2026-09-27 18:57 | save after every action; rolling backups; history.json replay on load; deleted-saves folder |
| B1-S45 | https://steamcommunity.com/app/2198150/discussions/0/4844274022647069568/ ("Undo Button") | 2024-09-23, 6 posts | 2026-09-27 18:57 | Ctrl+Z / Z / back-arrow undo, X redo (player answers) |
| B1-S46 | https://80.lv/articles/exclusive-tiny-glade-developers-discuss-bevy-proceduralism-publishers-cozy-games | 2024-05-30 | 2026-09-27 18:57 | developers: UX most critical; self-rearranging walls the vital element; starter buildings show elements; hand-crafted rules vs generative AI |
| B1-S47 | https://www.shacknews.com/article/141431/tiny-glade-review-score (Loren Chandler, 8/10) | 2024-09-16 | 2026-09-27 18:57 | "immediately clear what you can do"; let go of control; fiddly cursor; no lock/duplicate |
| B1-S48 | https://en.wikipedia.org/wiki/Tiny_Glade | live (secondary) | 2026-09-27 18:57 | Metacritic 74 / OpenCritic 73%; macOS 2026-05-13; critics note limited content |
| B1-S49 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/6341720536517655167 ("Tiny Glade is out NOW!") | 2024-09-23 | 2026-09-27 18:52 (via B1-S10 feed) | Daily Themes (30 prepared); windows touching ground become doors (beta) |
| B1-S50 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/6350729003513749947 ("(small) Patch 1.9.1") | 2024-10-08 | 2026-09-27 18:52 (via B1-S10 feed) | brick limit 750,000 -> 1,000,000 |
| B1-S51 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1806698490679275 ("Patch 1.14.1a") | 2025-07-31 | 2026-09-27 18:52 (via B1-S10 feed) | tutorial hint on detaching stairs |
| B1-S52 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/4539082035566397815 ("Manor Lords - Tester applications open!") | 2022-07-09 | 2026-09-27 18:52 (via B1-S15 feed) | maker: residential plot system, four points, edges conform to roads, backyards; inspired by burgage plots and drone footage |
| B1-S53 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/6339469370182581004 ("[Update 3 - 0.8.004]") | 2024-09-26 | 2026-09-27 18:52 (via B1-S15 feed) | "snap to roads" checkbox for plots fixed; help buttons incl. road curvature |
| B1-S54 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1788311419046724 ("[Update 4 - 0.8.024] Bridge Building ...") | 2025-01-10 | 2026-09-27 18:52 (via B1-S15 feed) | bridge via road tool; flexible plot snapping fix; burgage counts in region panel; real-time plot overlays |
| B1-S55 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1819386365095372 ("Major Update #5") | 2025-12-19 | 2026-09-27 18:52 (via B1-S15 feed) | tutorials rewritten; module snap-back; destroy button; road snap points fix; save overwrite confirmation; AI plot width |
| B1-S56 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1837955055356121 ("Major Update #7") | 2026-07-10 | 2026-09-27 18:52 (via B1-S15 feed) | logistics tutorial; early tutorials shortened |
| B1-S57 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1842212951300554 ("Major Update #8 ... Advanced Construction") | 2026-08-27 | 2026-09-27 18:52 (via B1-S15 feed) | Advanced Construction = professional builders (not a tool); pasture tutorial on first build; terrain overlay in road mode; failed overwrite no longer corrupts save |
| B1-S58 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1844751498228714 ("New BETA ... (0.8.110)") | 2026-09-27 | 2026-09-27 18:52 (via B1-S15 feed) | fix: Escape in building mode did not cancel plot type placement |
| B1-S59 | https://steamcommunity.com/app/1363080/discussions/0/4358998466169558915/ ("Edit Plot Size after plot is build") | 2024-05-05, 2 posts | 2026-09-27 19:01 | corners editable and home count +/- only during placement; after build only demolition |
| B1-S60 | https://steamcommunity.com/app/1363080/discussions/0/4358998466165221791/ ("resize burgage plots?") | 2024-05-04 | 2026-09-27 19:01 | resize = demolish and rebuild; animals can block the lot |
| B1-S61 | https://steamcommunity.com/app/1363080/discussions/0/4355620138225704118/ ("Can't extend living space") | 2024-04-28, 14 posts | 2026-09-27 19:01 | +/- beside the build mallet changes plots in the drawn area, before build |
| B1-S62 | https://steamcommunity.com/app/1363080/discussions/0/4358998287108092448/ ("burgage plots upgrade glitch?") | 2024-05-03, 10 posts | 2026-09-27 19:01 | minus button next to the hammer before confirming turns 2 houses into 1 plot with extension |
| B1-S63 | https://steamcommunity.com/app/1363080/discussions/3/4358998644638125458/ ("On Placement of Plots; Burgage or Otherwise", Feedback) | 2024-05-07 | 2026-09-27 19:02 | snap toggle ineffective; misaligned road snap points; request adjustable living/backyard line |
| B1-S64 | https://steamcommunity.com/app/1363080/discussions/0/4355620138223349675/ ("burgage plot is so difficult to manage") | undated in snippet | 2026-09-27 19:01 (redirected to forum index) | SNIPPET ONLY (WebSearch result text): family blocks visible at fourth point before "build"; right-click rolls back a point |
| B1-S65 | https://hardcoregamer.com/manor-lords-burgage-plots-guide/ | 2024-04-29 | 2026-09-27 19:01 | guide: rotate; plus/minus icons set number of homes |
| B1-S66 | https://www.thegamer.com/manor-lords-how-to-build-delete-edit-roads/ | 2024-05-08 | 2026-09-27 19:02 | roads: right-click undoes road point; Ctrl+scroll curvature; Alt+click delete |
| B1-S67 | https://www.thegamer.com/manor-lords-building-basics-complete-guide/ | 2024-05-08 | 2026-09-27 19:02 | plot rotation (4 directions) + hammer; burgage not movable; demolish returns resources, hurts approval |
| B1-S68 | https://www.pcgamesn.com/manor-lords/early-access-review | 2024-04-24 | 2026-09-27 19:03 | sense of place, winding roads; start = road + five families in tents; "extended demo" |
| B1-S69 | https://steamcommunity.com/app/1363080/discussions/3/4355619963546797053/ ("Needs a proper Tutorial", Feedback) | 2024-04-27, 3 posts | 2026-09-27 19:03 | tutorial = notes in cupboards; wants next-goal checklist |
| B1-S70 | https://steamcommunity.com/app/1363080/discussions/0/4626981956824891777/ ("No real tutorial?") | 2024-12-04, 6 posts | 2026-09-27 19:03 | no info until you click something; pointed to official wiki |
| B1-S71 | https://steamcommunity.com/app/1363080/discussions/0/592882772895354226/ ("to cancel a building") | 2024-12-06, 7 posts | 2026-09-27 19:04 | cancel = demolish construction site; materials collected back |
| B1-S72 | https://steamcommunity.com/app/1363080/discussions/0/4355619963545281833/ ("Cancel burgage upgrade?") | 2024-04-26, 4 posts | 2026-09-27 19:04 | accidental upgrade cannot be cancelled, only paused/demolished |
| B1-S73 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1790214123118408 ("Foundation 1.0 Is Now Available!") | 2025-01-31 | 2026-09-27 18:52 (via B1-S20 feed) | onboarding quests + visual aids; paved-road paint tool; walls in build system; monument move/replace; heraldry |
| B1-S74 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1817483467034011 ("Update 1 - Quality of Life Update") | 2025-11-26 | 2026-09-27 18:52 (via B1-S20 feed) | whole-monument move; undo/redo across monument; Part Replacement Tool; gate snapping; wall flip; visibility layers; overlapping-residential fix |
| B1-S75 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5480373588783037600 ("The 1.9.6 Desirability Update") | 2023-09-14 | 2026-09-27 18:52 (via B1-S20 feed) | villager settlement rules; beautification layer; condition-triggered advanced onboarding |
| B1-S76 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/4018887653981461874 ("Alpha 1.7.11 UI/UX Patch") | 2021-08-26 | 2026-09-27 18:52 (via B1-S20 feed) | counters for missing paint zone and ongoing construction, click to cycle |
| B1-S77 | https://wiki.polymorph.games/foundation/Housing (official wiki) | last edited 2026-07-08 | 2026-09-27 19:07 | residential zone rules: size by experimentation, 150 m to workplace, layout fixed at foundation, building over house destroys it, density rules |
| B1-S78 | https://wiki.polymorph.games/foundation/Zones (official wiki) | last edited 2026-05-04 | 2026-09-27 19:07 | nine zone types; residential zones "the only level of control" over housing; forbidden overrides |
| B1-S79 | https://steamcommunity.com/app/690830/discussions/0/632295800477617380/ ("How to erase zones?") | 2025-02-16, 8 posts | 2026-09-27 19:07 | right-drag erases; L/P brush size; circle/square brush; tutorial silent on erasing |
| B1-S80 | https://steamcommunity.com/app/690830/discussions/0/1640915206451907372/ ("House Placement") | 2019-06-27, 36 posts | 2026-09-27 19:07 | houses overlap/leave gaps; hedges and dot-zones fail; request for house-count indicator |
| B1-S81 | https://www.polygon.com/2019/8/8/20757732/foundation-windows-pc-review-polymorph-medieval | 2019-08-08 | 2026-09-27 19:08 | paintbrush district planning; UI quirks, many mini-windows |
| B1-S82 | https://www.pcgamesn.com/foundation/roads-desire-paths-city-builders (Ian Boudreau) | 2021-02-11 | 2026-09-27 19:08 | desire paths built by villagers; two-way shaping of the layout |
| B1-S83 | https://en.wikipedia.org/wiki/Foundation_(video_game) | live (secondary) | 2026-09-27 19:07 | EA 2019-02-01, 1.0 2025-01-31, one-year EA planned, Metacritic 84, Windows |
| B1-S84 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1818118366173579 ("Hotfix 1.11.0.10") | 2025-12-04 | 2026-09-27 18:52 (via B1-S20 feed) | fix: Esc out of wall edit broke undo/redo steps |
| B1-S85 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1786409468840100 ("Foundation Demo: Patch notes - 1.10.0.5.1216") | 2024-12-18 | 2026-09-27 18:52 (via B1-S20 feed) | edit-monument onboarding event when market is built |
| B1-S86 | https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1786573930692178 ("Foundation Demo: Patch notes - 1.10.0.6.1220") | 2024-12-21 | 2026-09-27 18:52 (via B1-S20 feed) | onboarding quests needed a middle mouse button (fixed) |
| B2-S1 | https://store.steampowered.com/api/appdetails?appids=255710&cc=us&l=english | undated (API) | 2026-09-27 | CS1 price USD 29.99, Win/Mac/Linux, release 2015-03-10 |
| B2-S2 | https://store.steampowered.com/appreviews/255710?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 | CS1 Very Positive 270,697 / 29,319 |
| B2-S3 | https://store.steampowered.com/appreviews/255710?json=1&language=english&purchase_type=all&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (+ positive; paginated, 300 neg / 200 pos) | reviews 2015-2026 | 2026-09-27 | CS1 review corpus; rec ids cited inline |
| B2-S4 | https://skylines.paradoxwikis.com/Zoning (WebFetch summary) | last edited 2024-01-19 | 2026-09-27 | fill/marquee/brush small+large; zones up to 4 cells from road; de-zone |
| B2-S5 | https://skylines.paradoxwikis.com/Roads (WebFetch summary) | no date shown | 2026-09-27 | straight/curved/freeform/upgrade; auto-snap to roads, angles, zone grid, guidelines; snap toggles; Page Up/Down elevation |
| B2-S6 | https://www.thesixthaxis.com/2015/03/10/cities-skylines-review/ | 2015-03-10 | 2026-09-27 | launch review: roads/zoning "a breeze"; fill, select box, two brush sizes |
| B2-S7 | https://www.pcgamesn.com/cities-skylines/cities-skylines-review | 2015-03-10 | 2026-09-27 | launch review: zoning fill or per-square paint; road tool flexibility; snapping toggle; traffic overlay |
| B2-S8 | https://steamcommunity.com/app/255710/discussions/0/611701999537737912/ | 2015-03-30 to 2015-05-13 | 2026-09-27 | no undo; quick-save workaround; Ctrl+Z only in map editor |
| B2-S9 | https://steamcommunity.com/app/255710/discussions/0/1639789306577066371/ | 2019-07-06/07 | 2026-09-27 | new player would quit without undo; saves before every click; Move It Ctrl+Z workaround |
| B2-S10 | https://steamcommunity.com/workshop/browse/?appid=255710&browsesort=totaluniquesubscribers&section=readytouseitems&requiredtags[]=Mod (p1-2) + https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/ | live counts | 2026-09-27 | CS1 mod lifetime subscribers (Move It 4,703,618; Precision Engineering 4,317,621; Undo It! 1,409,554; etc.) and mod descriptions |
| B2-S11 | https://steamcommunity.com/app/255710/discussions/0/3200369647696854200/ | 2021-12-28/29 | 2026-09-27 | zone brush too small; no mod; reply: two sizes + marquee |
| B2-S12 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=255710&count=300&maxlength=0&feeds=steam_community_announcements | items "Hotels & Retreats Dev Diary #2" 2023-05-12; "Patch Notes for patch 1.17.1" 2023-06-12 | 2026-09-27 | CS1 Toggle Zoning button (both/left/right/none) added 2023 |
| B2-S13 | https://steamcommunity.com/app/255710/discussions/0/2448217801767911829 | 2020-06-16 | 2026-09-27 | no introductory tutorial; pop-up hints |
| B2-S14 | https://store.steampowered.com/app/255710/ | live | 2026-09-27 | CS1 user tags |
| B2-S15 | same endpoint as B2-S12 (CS1 news, 300 items, 2018-03-09 to 2026-04-15) | as listed | 2026-09-27 | zero hits for "undo"/"Ctrl+Z" in CS1 announcements 2018-2026 (absence within that window only) |
| B2-S16 | https://steamcommunity.com/profiles/76561198258792690/recommended/255710/ (rec 39624798) | 2018-01-26 | 2026-09-27 | negative review, 209 helpful: no undo; segment-by-segment bulldozing |
| B2-S17 | Steam review rec 38159898 (CS1, in B2-S3 corpus) | 2017-12-08 | 2026-09-27 | player ignores advisors; paints the city |
| B2-S18 | https://steamcommunity.com/profiles/76561198030788488/recommended/255710/ (rec 25677754) | 2016-09-24 | 2026-09-27 | tutorial = help cards on first access of each concept |
| B2-S19 | https://steamcommunity.com/profiles/76561197982970265/recommended/255710/ (rec 14834121) | 2015-03-11 | 2026-09-27 | praise: painting zones with brushes; road guidelines |
| B2-S20 | https://steamcommunity.com/profiles/76561197970761123/recommended/255710/ (rec 39903286) | 2018-02-07 | 2026-09-27 | road tool misses right angles |
| B2-S21 | https://store.steampowered.com/api/appdetails?appids=949230&cc=us&l=english | undated (API) | 2026-09-27 | CS2 USD 49.99, Windows only, release 2023-10-24, devs Iceflake Studios + Colossal Order |
| B2-S22 | https://store.steampowered.com/appreviews/949230?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 | CS2 Mixed 51,965 / 42,186 |
| B2-S23 | https://store.steampowered.com/appreviews/949230?json=1&language=english&purchase_type=all&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (+ positive; paginated, 300 neg / 200 pos) | reviews 2023-2026 | 2026-09-27 | CS2 review corpus; rec ids cited inline |
| B2-S24 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=949230&count=300&maxlength=0&feeds=steam_community_announcements — item "Road Tools" | 2023-06-19 | 2026-09-27 | Grid (3 clicks), Replace, Parallel, snap options, slope readout, right-click cancels a step, bulldoze to remove |
| B2-S24b | https://www.paradoxinteractive.com/games/cities-skylines-ii/features/road-tools (WebFetch summary; curl HTTP 406) | 2023-06-19 | 2026-09-27 | same feature highlight; roundabouts in four sizes; premade intersections |
| B2-S25 | same news endpoint — item "Zones & Signature Buildings" (also https://www.paradoxinteractive.com/games/cities-skylines-ii/features/zones-signature-buildings via WebFetch) | 2023-07-10 | 2026-09-27 | Fill, Marquee, Paint (one cell at a time); right-click de-zone; type change without de-zone |
| B2-S27 | https://cs2.paradoxwikis.com/Zoning (WebFetch summary) | last edited 2026-02-10 | 2026-09-27 | three modes Fill/Marquee/Paint; no brush size |
| B2-S28 | https://steamcommunity.com/app/949230/discussions/0/737034666592264806/ | 2026-01-16 | 2026-09-27 | "Is there no zoning brush?": only fill, marquee, one-cell paint; reply: no vanilla brush, no mod known, marquee closest |
| B2-S29 | same news endpoint — items "City Corner #3 - Anniversary Free Update" (2026-03-12), "Office Evolution & City Stations - Available Now!" (2026-03-18), "City Corner #9 - Happy Six Months!" (2026-07-23), "Detailer's Patch #2 - Developer Diary" (2024-12-11), "City Corner #1" (2026-01-29) | as listed | 2026-09-27 | per-road zoning toggle credited to River-mochi's Zone Tools / Easy Zoning mods, "most requested"; Line Tool; Recolor feature credited to yenyang's mod |
| B2-S30 | same news endpoint, all 185 items (2023-06-11 to 2026-09-15) | as listed | 2026-09-27 | zero hits for "undo" / "Ctrl+Z"; "brush" hits concern terraforming, terrain textures, trees and the editor, none a zoning brush (absence within announcements only) |
| B2-S31 | https://steamcommunity.com/app/949230/discussions/0/3878221560446569933/ | 2023-10-24 | 2026-09-27 | launch-day: no Ctrl+Z undo |
| B2-S32 | https://steamcommunity.com/app/949230/discussions/0/4691154661545152027/ | 2024-10-26 | 2026-09-27 | still no undo mod; advice: reload last save |
| B2-S33 | https://steamcommunity.com/app/949230/discussions/0/595137443379885857/ | 2025-01-07 | 2026-09-27 | "No undo button?"; replies: autosave, a mod |
| B2-S34 | https://mods.paradoxplaza.com/mods/150877/Windows (WebFetch: title only) | undated | 2026-09-27 | "City Rewind: Global Ctrl+Z Undo [BETA]" exists; scope per search snippet only |
| B2-S35 | same news endpoint — item "Behind the Scenes #6: Tutorials & Advisor" | 2023-10-22 | 2026-09-27 | optional tutorials; unskippable starter task list; Advisor panel |
| B2-S36 | https://www.pcgamer.com/cities-skylines-2-review/ | 2023-10-19 (score 77) | 2026-09-27 | roads draw/snap smoothly; upgrade later; specialized-industry outlines snap to roads |
| B2-S37 | https://steamcommunity.com/app/949230/discussions/0/3937895474112644390/ | 2023-11-05/06 | 2026-09-27 | fractured zone grids; workaround = specific snap-option combination |
| B2-S38 | https://steamcommunity.com/profiles/76561198072686341/recommended/949230/ (rec 157839637) | 2024-02-08 | 2026-09-27 | negative review, 740 helpful: road tools best part; city-painter label |
| B2-S39 | https://steamcommunity.com/profiles/76561198006819838/recommended/949230/ (rec 234874567) | 2026-09-09 | 2026-09-27 | negative review, 923 helpful: rigid zoning grid; mods show demand for control |
| B2-S40 | https://steamcommunity.com/profiles/76561198031567112/recommended/949230/ (rec 233394924) | 2026-08-22 | 2026-09-27 | negative review, 220 helpful: asks why the zoning brush was removed |
| B2-S41 | https://steamcommunity.com/profiles/76561198084575596/recommended/949230/ (rec 148822225) | 2023-10-25 | 2026-09-27 | roads snap to 89/91 degrees; grid tool false conflicts |
| B2-S43 | https://store.steampowered.com/app/949230/ | live | 2026-09-27 | CS2 user tags |
| B2-S44 | https://cs2.paradoxwikis.com/Roads (WebFetch summary) | "last verified for version 1.0"; no edit date shown | 2026-09-27 | six road modes; six snap options + toggle; default snaps |
| B2-S45 | https://store.steampowered.com/api/appdetails?appids=916440&cc=us&l=english | undated (API) | 2026-09-27 | Anno 1800 list USD 59.99, USD 14.99 at 75% off on fetch date; Windows; release 2019-04-16 |
| B2-S46 | https://store.steampowered.com/appreviews/916440?json=1&language=all&purchase_type=all&num_per_page=0 (+ language=english) | live | 2026-09-27 | Very Positive 26,419/6,056 (all); Mostly Positive 10,096/2,778 (English) |
| B2-S47 | https://store.steampowered.com/appreviews/916440?json=1&language=english&purchase_type=all&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (+ positive; 200 neg / 100 pos) | reviews 2019-2026 | 2026-09-27 | Anno review corpus; rec ids inline |
| B2-S48 | https://www.anno-union.com/x-marks-the-spot/ ("DevBlog: This belongs in a museum!") | 2018-10-05 | 2026-09-27 | blueprint mode: free silhouettes, upgrade tool builds by click or drag, auto-silhouette when short (optional) |
| B2-S49 | https://www.anno-union.com/devblog-new-features-at-gc2018/ | 2018-08-20 (comments 2018-08-23 to 09-02) | 2026-09-27 | players welcome blueprints; some reject movable buildings |
| B2-S50 | https://www.anno-union.com/updates/anno-1800-game-update-16/ | posted 2022-12-01; release 2022-12-08 | 2026-09-27 | Multi-Move Tool (rectangle select) |
| B2-S51 | https://anno.city/you-wont-believe-which-feature-is-finally-being-added-to-anno-1800-with-game-update-16 | 2022-12-07 | 2026-09-27 | fan site: multi-move "finally"; moving 10+ houses one tile by hand |
| B2-S52 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=916440&count=300&maxlength=0&feeds=steam_community_announcements — items "DevBlog: What's in the Annoversary Update?" (2023-03-01), "Game Update 17 - Release Notes" (2023-03-31) | as listed | 2026-09-27 | Stamps (like the copy tool), Creative Mode, tutorial quest names, multi-move fixes |
| B2-S53 | https://www.anno-union.com/devblog-roads-building-in-the-grid/ | 2025-03-28 | 2026-09-27 | (Anno 117 blog) Anno 1800 road path rule, edge-connection rule, Anno-Tetris, intent-guessing from mouse movement tried and dropped |
| B2-S54 | https://www.pcgamer.com/anno-1800-review/ | 2019-04-15 (score 84) | 2026-09-27 | campaign = sandbox with a chain of missions; three modes |
| B2-S55 | https://steamcommunity.com/app/916440/discussions/search/?q=undo&gidforum=0 (+ the 5 result threads) | threads 2019-2025 | 2026-09-27 | no thread requesting undo |
| B2-S56 | https://steamcommunity.com/profiles/76561198117025942/recommended/916440/ (rec 156691161) | 2024-01-24 | 2026-09-27 | praise for copy/edit block tools; tutorial lacking |
| B2-S57 | https://steamcommunity.com/profiles/76561198023757658/recommended/916440/ (rec 147100212) | 2023-09-27 | 2026-09-27 | negative, 175 helpful: blueprints do not fit other island shapes |
| B2-S58 | https://steamcommunity.com/profiles/76561198075931333/recommended/916440/ (rec 196259403) | 2025-06-02 | 2026-09-27 | negative, 444 helpful: overwhelming mechanics and notifications |
| B2-S59 | https://store.steampowered.com/app/916440/ | live | 2026-09-27 | Anno 1800 user tags |
| B2-S60 | WebSearch snippets only (anno1800.fandom.com Blueprint_mode and Trade_Union; not fetched, HTTP 402) | undated | 2026-09-27 | hotkeys V/C, 10x10 layout tip, Trade Union range 15 — unverified |
| B2-S61 | same endpoint as B2-S52, all 66 items (2018-09-19 to 2026-05-13) | as listed | 2026-09-27 | zero "undo" feature hits (one unrelated "undoubtedly") |
| B2-S62 | https://steamcommunity.com/profiles/76561198138579632/recommended/916440/ (rec 154672067) | 2023-12-29 | 2026-09-27 | player renamed starting island |
| B2-S63 | https://steamcommunity.com/profiles/76561198830117805/recommended/916440/ (rec 182073544) | 2024-12-06 | 2026-09-27 | tutorial system weak; watch a YouTube guide |
| B2-S64 | https://store.steampowered.com/api/appdetails?appids=1307890&cc=us&l=english | undated (API) | 2026-09-27 | KR USD 19.99, Windows, released 2020-11-02, Early Access; EA note "saves may break"; co-op up to 18 |
| B2-S65 | https://store.steampowered.com/appreviews/1307890?json=1&language=all&purchase_type=all&num_per_page=0 (+ english) | live | 2026-09-27 | Very Positive 8,801/938 (all); 4,441/500 (English) |
| B2-S66 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1307890&count=300&maxlength=0&feeds=steam_community_announcements (33 items, 2020-09-17 to 2026-02-17) — items "Multiple Cities Update" (2021-02-21), "Translation Update" (2021-01-30), "January 7, 2021 Update", "Land of the Rising Sun" (2023-05-19), "New User Interface Update" (2024-05-16), "Renewable Energy & Emirates Revamp" (2024-11-27), "Apocalyptic Map and Decoration System" (2026-02-17) | as listed | 2026-09-27 | province claiming, Ctrl-P overlay, tutorial videos, Copy Building (Ctrl+C), copy now needs Wild Card, tutorial book, decorations; zero "undo" hits |
| B2-S67 | https://www.kingdomsreborn.com/ | undated | 2026-09-27 | maker: procedural world map, 7 biomes, simulated citizens (similar to Banished), multiplayer up to 8, card system |
| B2-S68 | https://store.steampowered.com/appreviews/1307890?json=1&language=english&purchase_type=all&review_type=negative&filter=all&day_range=9223372036854775807&num_per_page=100 (+ positive; 200 neg / 100 pos) | reviews 2020-2025 | 2026-09-27 | KR review corpus; rec ids inline |
| B2-S69 | https://chromastrike.com/kingdoms-reborn-review/ | 2024-06-23 | 2026-09-27 | cards gate most buildings; houses, farms, bridges, dirt roads, storage free |
| B2-S70 | https://gamermatters.com/kingdoms-reborn-early-access-impressions/ | 2023-05-30 | 2026-09-27 | map generated from parameters; copy circumvents cards |
| B2-S71 | https://steamcommunity.com/app/1307890/discussions/0/3130541756152073841/ | 2021-05-02 to 05-04 | 2026-09-27 | hotkeys (Z road, X demolish, B+H house); shown on hover only |
| B2-S72 | https://steamcommunity.com/app/1307890/discussions/0/4352239720873364268/ (2024-03-29); .../3111393847708087988/ (2021-02-03); .../3808408328768838836/ (2023-08-05) | as listed | 2026-09-27 | stone over dirt upgrades a road; labourers build roads; cancelling a misplaced farm = demolish |
| B2-S73 | https://steamcommunity.com/profiles/76561198021668825/recommended/1307890/ (rec 79518037, 2020-11-19); https://steamcommunity.com/profiles/76561197988494495/recommended/1307890/ (rec 152669258, 2023-12-01) | as listed | 2026-09-27 | buildings work without a road link; citizens use any path |
| B2-S74 | https://steamcommunity.com/profiles/76561197970898514/recommended/1307890/ (rec 212918654) | 2025-12-09 | 2026-09-27 | not recommended: inflexible placement; cards unneeded |
| B2-S75 | https://steamcommunity.com/profiles/76561198134709973/recommended/1307890/ (rec 144260251) | 2023-08-15 | 2026-09-27 | 226 helpful: easy to learn, overlays, card system not annoying |
| B2-S76 | https://steamcommunity.com/profiles/76561198031741033/recommended/1307890/ (rec 119902159) | 2022-08-01 | 2026-09-27 | block placement, 90-degree rotation only |
| B2-S77 | https://steamcommunity.com/profiles/76561198032781446/recommended/1307890/ (rec 133410488) | 2023-02-23, edited May 2024 | 2026-09-27 | tutorials reappear when off; UI update tells you what to build |
| B2-S78 | https://saveorquit.com/2020/11/13/preview-kingdoms-reborn/ | 2020-11-13 | 2026-09-27 | preview: card system is a random search, "a terrible menu" |
| B2-S79 | https://steamcommunity.com/profiles/76561198026481161/recommended/1307890/ (rec 161458743) | 2024-03-25 | 2026-09-27 | cards irrelevant after ~1.5 h (copy unlock); wood death spiral |
| B2-S80 | https://skylines.paradoxwikis.com/Districts (WebFetch summary) | last edited 2025-06-17 | 2026-09-27 | CS1 districts painted with 3 brush sizes, snap to roads/intersections, auto-named, renamable, per-district policies |
| B2-S81 | https://cs2.paradoxwikis.com/Districts (WebFetch summary) | last edited 2023-11-04 | 2026-09-27 | CS2 districts drawn by corner nodes; editable nodes; auto-named, renamable |
| B2-S82 | WebSearch snippet (query in Q27); links included https://forum.paradoxplaza.com/forum/threads/my-biggest-request-for-hypothetical-cs2-change-the-district-area-tool.1498215/ (not fetched) | undated | 2026-09-27 | unverified claim: polygon district tool harder than CS1 brush |
| B2-S83 | https://steamcommunity.com/app/949230/discussions/0/3877095833484594318/ | 2023-10-27 | 2026-09-27 | "Why is there no Move it! option?"; Relocate button exists for buildings |
| B2-S84 | https://steamcommunity.com/app/949230/discussions/0/4511002214529515635/ | 2024-07-24 | 2026-09-27 | "Please Fix Zoning": irregular lots impossible; surface tool + mods as workaround |
| C-S1 | https://store.steampowered.com/api/storesearch/?term=Dungeon%20Alchemist&l=english&cc=US | undated (API) | 2026-09-27 | DA Steam app id 1588530 |
| C-S2 | https://store.steampowered.com/api/appdetails?appids=1588530&cc=us&l=english | undated (API) | 2026-09-27 | DA price US$44.99, Win/Mac/Linux, EA release 2022-03-31, description: per-room theme, randomize button, tweak objects, "NO GENERATIVE AI" disclaimer |
| C-S3 | https://store.steampowered.com/appreviews/1588530?json=1&language=all&purchase_type=all&num_per_page=0 | live | 2026-09-27 | DA review summary: Very Positive, 3728+/209-/3937 |
| C-S4 | https://store.steampowered.com/appreviews/1588530?json=1&language=english&purchase_type=all&review_type=negative&filter=recent&num_per_page=100 (paged by cursor) | reviews dated 2022-03-31..2026-09-19 | 2026-09-27 | 162 English negative DA reviews; cited by recommendation id |
| C-S5 | https://store.steampowered.com/appreviews/1588530?json=1&language=english&purchase_type=all&review_type=positive&filter=recent&num_per_page=100 (paged) + filter=all | reviews to 2026-09 | 2026-09-27 | 300+ English positive DA reviews |
| C-S6 | https://store.steampowered.com/app/1588530/ | undated | 2026-09-27 | DA user tags; Early Access Q&A (leave EA late 2026; no price change) |
| C-S7 | https://www.dungeonalchemist.com/ | undated | 2026-09-27 | DA maker homepage: pick theme, draw, auto-populate, change room theme/function, views, VTT export with walls/lights/doors |
| C-S8 | https://www.dungeonalchemist.com/faqs | undated | 2026-09-27 | DA FAQ: no generative AI/LLMs; in-house procedural algorithms, own paid artists |
| C-S9 | https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1588530&count=200&maxlength=0&format=json (posts: …/4103335143102431322 2021-10-20; …/4588629064109977324 2022-09-29; …/4348798430270272038 2022-04-27; …/5035622109527049634 2023-01-31; …/5747236506606079042 2024-06-12; …/1826992588604063 2026-03-17; under https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/) | per post | 2026-09-27 | DA patch notes: "AI-powered" (2021), AI configuration options (2022), refresh-only-objects (2023), tutorial fix (2022), undo/redo for room drawing + optional autosave (2024), Roof switch in advanced AI menu (2026) |
| C-S10 | https://steamcommunity.com/app/1588530/discussions/0/6169410373941861343/ | 2023-04-12..2024-09-30 | 2026-09-27 | Users ask what "AI-powered" means; answers: artist-made assets, optional rule placement |
| C-S11 | https://www.pixelbandits.org/2023/06/dungeon-alchemist-early-access-review/ | 2023-06-10 | 2026-09-27 | EA review (WebFetch summary): every item movable after generation; VTT export with LOS/lighting |
| C-S12 | https://moviesgamesandtech.com/2024/07/05/dungeon-alchemist-review/ | 2024-07-05 | 2026-09-27 | Review 8/10; phrase confirmed in raw HTML |
| C-S13 | https://dungeonalchemist.fandom.com/wiki/VTT_Support | undated | 2026-09-27 (snippet only; fetch blocked by bot check) | community wiki: Foundry, Roll20, Fantasy Grounds, UniversalVTT export |
| C-S14 | https://news.adobe.com/news/news-details/2023/adobe-unveils-future-of-creative-cloud-with-generative-ai-as-a-creative-co-pilot-in-photoshop | 2023-05-23 | 2026-09-27 | Generative Fill launch: generative layers, non-destructive, prompts, Content Credentials "nutrition labels" |
| C-S15 | https://blog.adobe.com/en/publish/2024/04/23/the-next-generation-generative-ai-now-in-photoshop | 2024-04-23 | 2026-09-27 | Firefly Image 3 in Photoshop; Reference Image; Generate Similar; aims to reduce uncertainty/randomness |
| C-S16 | https://adobe.design/stories/process/behind-the-design-partner-models-in-adobe-photoshop | 2025-10-28 (date string on page) | 2026-09-27 | Model picker design; commercial-safety label; model stored in generative layer; shield "not used to train" message; UI with three variations; "poor resolution" top pain point |
| C-S17 | https://jkost.com/blog/2025/09/photoshop-beta-partner-models-in-generative-fill-workflow.html | 2025-09-26 | 2026-09-27 | Adobe evangelist: partner models (Gemini 2.5 Flash Image, Flux Kontext Pro) in Generative Fill beta |
| C-S18 | https://community.adobe.com/t5/photoshop-beta-discussions/gemini-2-5-flash-image-nano-banana-and-flux-kontext-pro-models-are-in-photoshop/m-p/15520781 | 2025-09-25 (Community Manager post) | 2026-09-27 | Partner models return ONE variation; 10 credits per generation after beta; workflow steps |
| C-S19 | https://community.adobe.com/bug-reports-699/p-generated-images-violate-user-guidelines-667663 | opened 2023-05-23; replies to 2026-05-06 | 2026-09-27 | Guidelines-violation false positives: 1,392 replies, 310,437 views |
| C-S20 | https://community.adobe.com/questions-712/photoshop-no-longer-creating-three-options-when-using-generative-fill-or-generative-expand-1161579 | 2024-01-19..2025-03-15 | 2026-09-27 | Users expect three options; collapsed variations section hides them |
| C-S21 | https://community.adobe.com/announcements-710/firefly-image-3-retirement-transitioning-to-firefly-fill-expand-in-photoshop-1559345 | 2026-04-28 | 2026-09-27 | Firefly Image 3 retired from Generative Fill (27.6; service removed Aug 2026); existing files unaffected |
| C-S22 | https://community.adobe.com/questions-712/firefly-fill-and-expand-is-awful-how-can-i-default-to-firefly-3-until-fill-and-expand-gets-replaced-1554354 | 2026-03-19..20 | 2026-09-27 | Professional user: new default model usable ~10% of time; picker resets per image |
| C-S23 | https://www.adobe.com/learn/photoshop/web/combine-variations-generative-fill | 2026-07-22 (per WebFetch summary) | 2026-09-27 (WebFetch only; curl no response) | Adobe tutorial: three variations; combine via layer mask |
| C-S24 | helpx.adobe.com pages plus search snippets from https://www.cgchannel.com/2023/09/adobe-ships-photoshop-25-0/ and https://fstoppers.com/news/adobe-plans-make-pay-photoshops-ai-features-even-if-have-subscription-640713 (helpx: …/photoshop/desktop/create-open-import-images/create-images/edit-images-with-generative-fill.html; …/creative-cloud/apps/generative-ai/generative-credits-faq.html; …/photoshop/desktop/generative-ai/select-an-ai-model-for-generative-control.html) | undated | 2026-09-27 (snippet only; 403 on fetch) | model list, 1 credit per standard generation, blank prompt fills from surroundings, partner models premium, Gemini 2.5 removal v27.11; also snippets: GA Sept 2023, credits from Nov 2023 |
| C-S25 | https://blog.adobe.com/en/publish/2024/06/10/updating-adobes-terms-of-use | 2024-06-10 | 2026-09-27 | Adobe: content never used to train generative AI; "trust must be earned" |
| C-S26 | https://petapixel.com/2023/05/23/photoshops-new-generative-fill-uses-ai-to-expand-or-change-photos/ | 2023-05-23 | 2026-09-27 | Launch-day press: expansions often unnoticeable, sharpness gaps, mixed success |
| C-S27 | canva.com help pages: https://www.canva.com/help/using-magic-edit/ ; https://www.canva.com/help/ai-access/ ; https://www.canva.com/help/magic-features-admin-controls/ ; https://www.canva.com/help/editable-magic-layers/ | undated | 2026-09-27 (snippet only; 403 on fetch) | Magic Edit steps; results may mismatch/empty; AI allowance by plan; admin can change access to Magic/AI |
| C-S28 | https://www.makeuseof.com/canva-how-to-use-magic-edit-tool/ | 2023-04-27 | 2026-09-27 | Magic Edit: brush → Continue → prompt → Generate → four replacements → Generate more → Done |
| C-S29 | https://technical.ly/software-development/canva-ai-magic-studio-demo/ | 2023-10-04 | 2026-09-27 | Hands-on: Magic Design from 5+ word prompt → selection of designs; rerun similar; hand edits; 10 promotional tokens |
| C-S30 | https://techcrunch.com/2024/09/07/canva-wants-you-to-pay-a-lot-more-for-its-ai-features/ | 2024-09-07 | 2026-09-27 | Teams five-person plan US$119.99 → US$500/yr, justified by Magic Studio |
| C-S31 | https://petapixel.com/2026/03/11/canvas-new-ai-tool-turns-flat-images-into-editable-layers/ | 2026-03-11 | 2026-09-27 | Magic Layers: flat image → editable layers, live text; CPO "dead end" framing; beta US/UK/CA/AU; counts toward AI allowance |
| C-S32 | search snippets: https://www.canva.com/newsroom/news/magic-studio/ ; https://voicebot.ai/2023/10/05/canvas-new-magic-studio-pulls-enormous-generative-ai-toolkit-and-200m-creator-fund-out-of-a-hat/ ; https://www.creativebloq.com/design/graphic-design-software/canva-price | 2023-10-04/05; 2024-09 | 2026-09-27 (snippet only) | Magic Grab/Expand/Switch descriptions; Canva Shield; US$200M creator fund; Creative Bloq headline |
| C-S33 | (id unused; the Figma AI launch date 2024-06-26 is evidenced inside C-S34) | — | — | — |
| C-S34 | https://www.figma.com/blog/inside-figma-a-retrospective-on-make-designs/ | 2024-07-17 (page; editor's note added later) | 2026-09-27 | Retrospective: how Make Designs worked, unvetted assets, disabled, off-the-shelf models; related list dates "Meet Figma AI" 2024-06-26 |
| C-S35 | https://techcrunch.com/2024/07/02/figma-disables-its-ai-design-feature-that-appeared-to-be-ripping-off-apples-weather-app/ | 2024-07-02 | 2026-09-27 | Andy Allen's 2024-07-01 post; CEO disables feature, denies training claims |
| C-S36 | https://www.figma.com/blog/figma-ai-first-draft/ | 2024-09-24 | 2026-09-27 | Relaunch as First Draft; four libraries; limited beta; editor's note: folded into Figma agent |
| C-S37 | https://www.figma.com/blog/introducing-figma-make/ | 2025-05-07 | 2026-09-27 | Figma Make prompt-to-app; point-and-prompt editing |
| C-S38 | https://www.figma.com/blog/the-figma-agent-is-here/ | 2026-05-20 | 2026-09-27 | On-canvas design agent; parallel prompts; multiple options; direct manipulation |
| C-S39 | https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files | undated (mentions 2026-06-23) | 2026-09-27 | Agent entry, Undo in chat / Cmd-Z, duplicate-to-compare tip, stop, beta limits, credits by complexity, chats visible by default |
| C-S40 | https://forum.figma.com/share-your-feedback-26/figma-make-ai-credit-limits-not-feasible-51713 | 2026-03-10 | 2026-09-27 | 187 replies / 9,476 views: credits consumed fixing AI output; unpredictability |
| C-S41 | https://help.figma.com/hc/en-us/articles/17725942479127-Manage-AI-settings-and-content-training-for-your-team-or-organization | undated | 2026-09-27 | Content training on by default for Starter/Professional; effective 2024-08-15 |
| C-S42 | https://help.figma.com/hc/en-us/articles/42614902212887-AI-credit-updates-FAQ (and uichemy.com/blog/figma-ai-credits/) | undated | 2026-09-27 (snippet only) | Seat credit limits enforced since 2026-03-18; monthly allocations by seat |
| C-S43 | https://updates.midjourney.com/image-editor/ | 2024-08-16 | 2026-09-27 | Unified web editor: reframe/repaint/vary region/pan/zoom |
| C-S44 | https://updates.midjourney.com/external-image-editor/ | 2024-10-23 | 2026-09-27 | Upload + edit, Retexture, text + region control, V2 AI moderator, limited rollout, known issues |
| C-S45 | https://www.tomsguide.com/ai/i-tried-midjourneys-new-ai-powered-image-editor-heres-how-it-works | 2024-08-19 | 2026-09-27 | Hands-on: editor fast and easy; Discord less user-friendly; US$10/month web access; wants more manual tools |
| C-S46 | docs.midjourney.com articles (…/32692978437005-Variations ; …/32764383466893-Editor ; …/32794723105549-Vary-Region) | undated | 2026-09-27 (snippet only; 403 on fetch) | Grid of four, V/U buttons, Vary Subtle/Strong, Reroll; Erase/Restore/Move/Smart Select/Retexture; region-size advice |
| C-S47 | https://updates.midjourney.com/rss/ (posts: /web-updates-5/ 2026-05-27; /draft-mode-for-v8-1-and-new-feature-previews/ 2026-06-16; /edit-model-for-v8/ 2026-08-27; /edit-image-quality-update/ 2026-08-29; /edit-updates-thumbnail-previews-and-more/ 2026-09-24) | per post | 2026-09-27 | Conversational mode; draft mode 24 images; V8.2 edit model; sad-face feedback; local edits without degradation; live style previews |
| C-S48 | https://techcrunch.com/2024/10/19/midjourney-plans-to-let-anyone-on-the-web-edit-images-with-ai/ | 2024-10-19 | 2026-09-27 | Editor plan; IPTC metadata but no C2PA; restricted rollout |
| C-S49 | https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Knowledge-Base | edited 2026-09-24 | 2026-09-27 | FMG: "Generate note with AI" (OpenAI/Anthropic/Ollama; key in browser); help-assistant KB; Regenerate controls |
| C-S50 | https://api.github.com/repos/Azgaar/Fantasy-Map-Generator/releases?per_page=100 (v1.109 https://github.com/Azgaar/Fantasy-Map-Generator/releases/tag/v1.109 ; v1.152.1 https://github.com/Azgaar/Fantasy-Map-Generator/releases/tag/v1.152.1) | 2026-01-08; 2026-09-11 | 2026-09-27 | Release notes: AI notes, AI widget, Claude, Ollama; help assistant added |
| C-S51 | https://github.com/Azgaar/Fantasy-Map-Generator/pull/1115 ; /pull/1618 ; /pull/1804 ; /pull/1806 ; /pull/1808 ; /pull/1358 ; /issues/1357 (via api.github.com) | 2024-08-28..2026-09-05 | 2026-09-27 | AI widget merged 2024-09-22; AI chat run(code)+describe() merged 2026-08-24 into ai-interface branch (not master); help gateway replacing OpenWidget; v3 open; AI naming request closed, PR unmerged; no remove-AI requests found |
| C-S52 | https://familiarvtt.com/ | undated | 2026-09-27 | Foundry AI co-pilot: US$6/month, BYO AI, scene building by chat, three options, rules engine in code, refusals out loud, undo, confirmation for destructive ops |
| C-S53 | https://foundryvtt.com/packages/sceneforge-ai | v1.20 "1 month ago" | 2026-09-27 | Prompt → battle map on a Foundry scene; Edit Map by reference; one-click |
| C-S54 | https://foundryvtt.com/packages/cibola8 | "Last Updated 42 minutes ago" at fetch | 2026-09-27 | AI battlemaps/city maps; OpenCV wall detection; per-generation model switch; Patreon or own key |
| C-S55 | https://www.tt-rpg.app/en/features/foundry-vtt-battle-maps | undated | 2026-09-27 | AI battle map refined by chat; walls/doors/lights editable; colour preview; UVTT export |
| C-S56 | https://www.adobe.com/products/firefly/features/ai-art-generator/fantasy-map.html | undated | 2026-09-27 (WebFetch summary only) | Prompt → flat PNG map; edit via re-prompt or Photoshop/Express; free daily generations |
| C-S57 | https://zsky.ai/ai-map-generator-free | undated | 2026-09-27 | Text-to-image maps; download; one credit per map; variations; Pro US$19/month |
| C-S58 | https://vheer.com/fantasy-map-generator | undated | 2026-09-27 | Text-to-image maps; regenerate or refine whole design |
| C-S59 | https://mew.design/create/ai-dungeons-and-dragons-city-generator | undated (© 2025-2026) | 2026-09-27 | City image + written brief; "Chat Edit" of one district; 50 free credits |
| C-S60 | https://fantasygen.net/city-map-generator | undated | 2026-09-27 (403; snippet only) | Claims AI arranges districts logically |
| C-S61 | https://inkarnate.com/ | undated | 2026-09-27 | Homepage: zero AI claims; manual editor features |
| C-S62 | https://www.legendkeeper.com/ | undated | 2026-09-27 | FAQ: no generative AI features |
| C-S63 | https://foundryvtt.com/article/ai-policy/ | revised 2026-03-18 | 2026-09-27 | Prepared content human-made; improvised AI allowed; consent before running AI code; "Zero AI" designation; procedural generation exempt |
| C-S64 | search snippets only: https://www.worldanvil.com/faq (403) ; https://dndbeyond-support.wizards.com/hc/en-us/articles/44974594091156-Generative-AI-art-FAQ (403) ; https://dumbestdnd.com/p/the-ultimate-list-for-free-dnd-maps-20-resources/ (r/dndmaps mid-2023 AI rule) ; https://blog.roll20.net/ ; https://fantasymapgenerators.com/blog/ai-fantasy-map-generator-vs-procedural/ ; familiarvtt.com Discord testimonials | various | 2026-09-27 (snippet only) | World Anvil no-training statement; WotC AI-art policy; r/dndmaps AI rule; Roll20 map redesign, no AI feature found; label/river critique of AI maps |
| E-S1 | https://foundryvtt.com/purchase/ | undated (footer (c) 2026) | 2026-09-27 | USD 50.00 perpetual licence incl. future updates; footer links an AI Content Policy |
| E-S2 | https://foundryvtt.com/article/walls/ | undated | 2026-09-27 | Wall presets, doors/secret doors, windows (proximity), direction, sub-grid snapping, force snap, clone, Ctrl-chain, Alt-select, Clear Walls, colour key |
| E-S3 | https://foundryvtt.com/article/lighting/ | undated (mentions V12, V13) | 2026-09-27 | Click-drag light radius split bright/dim; grid snap (Shift frees); walls clip light; darkness activation |
| E-S4 | https://foundryvtt.com/article/scenes/ | undated | 2026-09-27 | Background sets dimensions; grid px default 100 / min 50; common 70/100/140/200; padding; background offset; Grid Alignment tool; Export/Import Data JSON; background is a path or URL; set grid before detailing |
| E-S5 | https://foundryvtt.com/packages/dd-import | relative: v6.1.1 "3 months, 4 weeks ago"; Verified 14 | 2026-09-27 | Universal Battlemap Importer by Moo Man; "Zero AI" labels; version history back to Foundry 0.6.6 |
| E-S6 | https://github.com/moo-man/FVTT-DD-Import (raw README.md, module.json, ddimport.js, branch master) | module.json v6.1.1 | 2026-09-27 | Producers named; fidelity/offset; accepts .dd2vtt/.df2vtt/.uvtt; closed->door else proximity window; range->dim, bright = half; colour alpha stripped; 11,000 px canvas cap |
| E-S7 | http://universalvtt.org/ (GitHub Pages of TheGeolama/uvtt-v2-specification) | undated | 2026-09-27 | Third-party "UVTT v2.0.0-rc2" proposal with schemas; self-described maintainers |
| E-S8 | https://arkenforge.com/universal-vtt-files/ | published 2022-03-05, modified 2026-08-22 | 2026-09-27 | Originator (Megasploot); same file, three extensions; single flat image; full field list in squares; producers and consumers |
| E-S9 | https://dungeondraft-encyclopaedia.gitbook.io/guide/final-steps/exporting-your-map/universal-vtt | undated (community guide) | 2026-09-27 | .dd2vtt embeds PNG; walls/doors/lights generated on import |
| E-S10 | https://raw.githubusercontent.com/Imagix/uvtt2fgu/main/exampleMaps/sampleMap.dd2vtt | undated sample | 2026-09-27 | Concrete file: format 0.3, map_origin 2,1, map_size 10x10, ppg 256, portal and light objects, environment, base64 PNG |
| E-S11 | https://blog.roll20.net/posts/page-menu-updates/ | 2026-07-16 | 2026-09-27 | Native UVTT upload on all tiers; Free sees static map only; one map per file; static only; storage; portal accuracy caveat; Dungeon Scrawl sync; Czepeku UVTT |
| E-S12 | https://blog.roll20.net/posts/align-to-grid-announcement/ | 2026-07-23, modified 2026-08-19 (beta live 2026-08-19) | 2026-09-27 | Old Align to Grid steps; "less-than-stellar success rate"; GM feedback (overlapping grids, lowered opacity); new three-step aligner |
| E-S13 | https://blog.roll20.net/posts/help-us-make-dynamic-lighting-easier/ | 2026-09-16 | 2026-09-27 | Survey: DL setup too long and unintuitive; barriers not editable once placed; tools scattered; hours to learn; planned vertex editing and DL hotbar; Map Layer Hotbar Aug 2026 |
| E-S14 | https://app.roll20.net/forum/post/11486629/universalvttimporter-import-problem-all-my-windows-are-doors-request-for-help | posts 2023-06-02 to 2023-08-24 | 2026-09-27 | UVTT has no door/window distinction; closed flag decides |
| E-S15 | https://app.roll20.net/forum/post/12542863/introducing-roll20-elite-5x-storage-4x-sharing-and-more | 2025-10-21 | 2026-09-27 | Elite launch; Pro benefits incl. Dynamic Lighting, Map Layers, Mod Scripts |
| E-S16 | https://www.geeknative.com/210141/roll20-adds-new-150-subscription-aimed-at-high-usage-game-masters/ | 2025-10-22 | 2026-09-27 | Elite USD 150/year |
| E-S17 | https://www.enworld.org/threads/thinking-of-joining-roll20-lock-in-your-sub-now.679825/ (WebFetch) | 2021-05-01 | 2026-09-27 | Plus 5.99/mo, 59.99/yr; Pro 10.99/mo, 109.99/yr from 2021-07-01 |
| E-S18 | https://en.wikipedia.org/wiki/Roll20 (WebFetch + curl grep) | undated | 2026-09-27 | Browser-based; iPad and Android versions with fewer features; PC Gamer 2017 "clean mapping interface" |
| E-S19 | https://blog.owlbear.rodeo/owlbear-rodeo-2-4-release-notes/ | 2026-05-23 | 2026-09-27 | Forecast CV fog (Bestling beta), Slice, Fit/Trim/Join/Overlay, Shape Snapping, Storage Saver |
| E-S20 | https://blog.owlbear.rodeo/effortless-map-alignment/ | 2026-05-07 | 2026-09-27 | Offset / Size / Refine alignment with magnifier; old transform tool hard to learn |
| E-S21 | https://blog.owlbear.rodeo/owlbear-rodeo-2-3-release-week-day-1/ | 2024-10-05 (RSS) | 2026-09-27 | Mega-city maps ~140 MP; old 67 MP cap; 144 MP tiled rendering |
| E-S22 | https://blog.owlbear.rodeo/owlbear-rodeo-2-3-release-week-day-3/ | 2024-10-07 (RSS) | 2026-09-27 | Static fog as native choice; Dynamic Fog extension: walls from fog shapes, Door tool, token lights; free, open source |
| E-S23 | https://blog.owlbear.rodeo/on-plagiarism-ai-and-centaurs/ | 2026-08-24 (RSS) | 2026-09-27 | Team of three; developer critical of generative-AI companies; claims Roll20's aligner copies Owlbear's |
| E-S24 | http://web.archive.org/web/20260616020639/https://docs.owlbear.rodeo/docs/fog/ | snapshot 2026-06-16 | 2026-09-27 | Fog modes, single-layer auto non-overlap, Fog Fill, Cut, Fog Preview, Starter Sets, tutorial style |
| E-S25 | http://web.archive.org/web/20260616020639/https://docs.owlbear.rodeo/docs/aligning-a-map/ | snapshot 2026-06-16 | 2026-09-27 | Default subtle snapping; maps locked by default; rows x columns; "49x28" file-name convention |
| E-S26 | http://web.archive.org/web/20260616020628/https://docs.owlbear.rodeo/docs/scenes/ | snapshot 2026-06-16 | 2026-09-27 | Scene = infinite canvas; maps reusable across scenes; grid colour auto from map brightness; import preview |
| E-S27 | http://web.archive.org/web/20260616020639/https://docs.owlbear.rodeo/docs/managing-your-subscription/ | snapshot 2026-06-16 | 2026-09-27 | Plan names Nestling (free), Fledgling, Bestling |
| E-S28 | https://blog.owlbear.rodeo/owlbear-rodeo-2-0-dev-log-6/ | 2022-05-26 | 2026-09-27 | Plan prices and storage at the 2.0 subscription change |
| E-S29 | https://raw.githubusercontent.com/Eppinguin/scene-importer/main/README.md + https://api.github.com/repos/Eppinguin/scene-importer | created 2025-06-02, pushed 2026-08-26 | 2026-09-27 | Owlbear importer for .uvtt/.dd2vtt/Foundry JSON/ZIP; walls, doors, lights for Dynamic Fog; standalone Foundry JSON lacks image |
| E-S30 | https://foundryvtt.com/article/controls/ | undated | 2026-09-27 | Ctrl+Z "Undo Canvas Operation" |
| E-S31 | https://foundryvtt.com/article/adventure/ | undated | 2026-09-27 | Adventure bundles; media files not included |
| E-S32 | https://foundryvtt.com/article/backups/ | undated (mentions 11.311, V12->V13) | 2026-09-27 | World backups and snapshots |
| E-S33 | https://foundryvtt.com/api/classes/foundry.documents.BaseScene.html | API docs "Version 14" | 2026-09-27 | v14 Scene schema fields incl. embedded levels |
| E-S34 | https://foundryvtt.com/api/classes/foundry.documents.BaseLevel.html | API docs "Version 14" | 2026-09-27 | Level = background, foreground, elevation band; cabin example |
| E-S35 | /Users/cstokes/Desktop/Maps/research/findings/ftg-payload-visual.md lines 655-720 (grep/sed only) | file mtime 2026-09-25 (corrected by the lane seat) | 2026-09-27 | FTG Foundry module: iframe overlay on empty 5000x5000 gridless scene; event protocol; no image/walls exported |
| E-S36 | https://dev.to/bananafestdestiny/exporting-universal-vtt-dd2vtt-files-that-owlbear-rodeo-and-foundry-actually-import-checked-n32 | 2026-09-20 | 2026-09-27 | AI-agent product blog (low weight): walls derived from region boundaries; importer colour/range behaviour (matches E-S6) |
| E-S37 | https://itch.io/post/7267489 | 2023-02-04 | 2026-09-27 | Buyer sharing a fix for map grids not aligning in Foundry |
| E-S38 | https://www.foundryvtt-hub.com/flash/automatic-walls-tool-for-foundry-vtt/ | 2021-05-08 | 2026-09-27 | Auto-wall tool from solid-colour layout; hours to minutes; Patreon-gated |
| E-S39 | https://foundryvtt.com/article/installation/ | undated | 2026-09-27 | Windows/macOS/Linux app with server + Chromium; headless Node server; browser clients |
| E-S40 | https://itch.io/t/1265550/export-walldoor-files-for-roll20-and-foundryvtt | 2021-03-15 | 2026-09-27 | User request: wall/door JSON beside PNG export |
| E-S41 | https://xecthar.itch.io/post-apocalyptic-encounter-maps-v5/comments | comments 2025-03-07/08 | 2026-09-27 | Stated 80 px grid did not align; 70 px did |
| E-S42 | https://blog.owlbear.rodeo/rss/ | feed | 2026-09-27 | Publication dates of Owlbear posts |
| E-S43 | https://blog.owlbear.rodeo/designing-for-fun/ | 2023-07-01 | 2026-09-27 | Fetched; not used for claims |
| E-S44 | https://help.roll20.net/hc/en-us/articles/32139162477719-Rollback-Feature | snippet only | 2026-09-27 | Pro-only rollback, 7-day save states (snippet) |
| E-S45 | https://help.roll20.net/hc/en-us/articles/360037256634-Best-Practices-for-Files-on-Roll20 | snippet only | 2026-09-27 | 20/50/100 MB upload caps "as of late February 2024" (snippet) |
| E-S46 | https://www.popular.pics/reddit/post/jct9s9 | snippet only | 2026-09-27 | Owlbear Beta v1.6.0 "Automatic Grid Detection" (snippet) |
| E-S47 | https://help.roll20.net/hc/en-us/articles/41643201127831-Universal-Virtual-Tabletop-UVTT-Support | blocked (Cloudflare / 403) | 2026-09-27 | Not used |
| E-S48 | https://app.roll20.net/forum/post/10813368/dynamic-lighting-weirdness ; https://app.roll20.net/forum/post/10223955/dynamic-lighting-updates-bugs-and-feedback/?pagenum=10 | snippet only | 2026-09-27 | DL complaints (jagged edges, see-through walls, lag) (snippet) |
| E-S49 | https://owacsender.substack.com/p/lancer-should-i-use-foundryvtt | 2023-08-13 | 2026-09-27 | Community view: powerful but hard to set up, self-hosting, breaks between versions |
| E-S50 | https://en.wikipedia.org/wiki/Foundry_VTT (WebFetch + curl grep) | undated | 2026-09-27 | Wargamer 2023 steep learning curve; CBR 2021-12-30 "underrated gem", lighting engine |
| E-S51 | https://slyflourish.com/owlbear_rodeo.html | 2020-11-23 | 2026-09-27 | Map-and-tokens simplicity, no login; alignment and fog hard at first; missing features for power users |
| E-S52 | https://lairofsecrets.com/gaming/review-owlbear-rodeo/ | 2023-04-24 | 2026-09-27 | Easy upload and on-screen tools; alignment needed a video; original version 24-hour tabletops |
| E-S53 | http://web.archive.org/web/20260713105630/https://www.owlbear.rodeo/pricing | snapshot 2026-07-13 | 2026-09-27 | Script-rendered; no prices in static HTML (not usable) |
| D-S1 | https://watabou.itch.io/medieval-fantasy-city-generator | description undated; rating as shown | 2026-09-27 | free HTML5; right-click menu + Enter; rating 4.8/5 of 3,571; attribution appreciated; r/FantasyCities link |
| D-S2 | https://watabou.itch.io/medieval-fantasy-city-generator/devlog/494692/keyboard-shortcuts-and-mouse-actions | published 2023-02-25, modified 2024-04-15; 25 comments 2023-03-15 → 2026-09-22 | 2026-09-27 | shortcuts, ward reroll, warp Enter/Esc; users asking to move labels, recolour districts, delete districts, add/remove roads, import edited JSON, zoom |
| D-S3 | https://watabou.itch.io/medieval-fantasy-city-generator/devlog/22794/052-warp-tool | 2018-02-01; comment 2018-03-10 | 2026-09-27 | warp praised; more grab points asked |
| D-S4 | https://watabou.itch.io/medieval-fantasy-city-generator/community (all pages via ?before=) | topics 2017 → 2026 | 2026-09-27 | 392 topic titles; 28 direct-edit, 18 save/reload, ≤ 26 options/size (INFERRED classification) |
| D-S5 | https://itch.io/t/4263295/saving-modifications | 2024-11-04; replies 2024-11-15, 2026-02-15 | 2026-09-27 | warps and modifications not saved; landmark load "obscure"; third-party save tool |
| D-S6 | https://itch.io/t/5384651/importing-json | 2025-10-04 | 2026-09-27 | exported JSON cannot be reopened for editing; third-party tool |
| D-S7 | https://itch.io/t/6385446/any-way-to-implement-an-base-shape-for-the-city-and-from-where-roads-come-from | 2026-05-22 | 2026-09-27 | user asks to draw the city's base shape and road origins; creator on City Painter |
| D-S8 | https://itch.io/t/5292573/request-option-to-reroll-district-boundaries-and-quantity | 2025-09-06 | 2026-09-27 | rerolling "dozens of times" for usable districts |
| D-S9 | https://itch.io/t/4511280/custom-population-and-number-of-buildings | 2025-01-27; reply 2025-01-28 | 2026-09-27 | creator rejects building-count parameters |
| D-S10 | https://itch.io/t/6406547/loading-maps | 2026-05-27 | 2026-09-27 | no load of edited maps; user had saved JSON to reload |
| D-S11 | https://itch.io/t/5221891/can-you-import-already-generated-cities | 2025-08-16 | 2026-09-27 | user lost a campaign city; found district view too late |
| D-S12 | https://docs.fantasytowngenerator.com/editSettlement/map/ | undated (Docusaurus docs) | 2026-09-27 | FTG manual editor tools, right-click cancel, layer-order warning, large screens only |
| D-S13 | https://docs.fantasytowngenerator.com/editSettlement/regenerate_area/ | undated | 2026-09-27 | Regenerate area: select lots, presets/weights; "doesn't know which ones you are happy to have edited" |
| D-S14 | https://forum.profantasy.com/discussion/10278/watabou-medieval-fantasy-city-generator-updates-fyi | 2020-08 → 2020-09 | 2026-09-27 | user summary of MFCG editing; instructions "a little piecemeal" |
| D-S15 | https://forum.profantasy.com/discussion/10489/watabou-medieval-fantasy-city-generator | 2020-09, edited 2021-09 | 2026-09-27 | MFCG → SVG → DXF → CC3+ in 22 minutes; warp "gradually getting better" |
| D-A1 | research/findings/code-mfcg.md §2.13 (archive) | findings of 2026-09 | read 2026-09-27 | warp scene, ward reroll by seed, landmarks follow warps |
| D-A2 | research/findings/mfcg-posts-a.md T3, T4, T22, §4-5 (archive of Patreon posts 39697187, 40345972, 47063541 …) | posts 2020 | read 2026-09-27 | City Painter and its post-mortem; warp tools Apply/Discard; menu growth; no save |
| D-A3 | research/findings/mfcg-posts-b.md §2.21-2.22 (archive; posts 87882877, 98918904, 102377277, 62336213) | posts 2022-2024 | read 2026-09-27 | manual edits not persisted; JSON one-way; reroll as glitch recovery; URL surface |
| D-A4 | research/findings/mfcg-devlogs-a.md §2.18 + tool list (archive; itch devlogs 22717, 22794, 59798) | 2018 | read 2026-09-27 | warp limits; undo history deferred; rotation shift+drag "may not be obvious" |
| D-A5 | research/findings/vg-posts-a.md, vg-ng-devlogs.md (archive; posts 42521165, 50688261) | 2021 | read 2026-09-27 | per-layer reroll; "Some" vs "Many" confusion |
| D-A6 | research/findings/watabou-extra-a.md, watabou-extra-b.md (archive; posts 78826680, 68936414, 136013772) | 2020-2025 | read 2026-09-27 | long-press menu; draggable notes; two "open in" buttons confusing; UP editor plan |
| D-A7 | research/findings/code-ftg-client.md §2.4 (archive; FTG client read) | 2026-09 | read 2026-09-27 | FTG layout editor: diff/save, confirm-actions dialog, snapping 5 m, regenerate area, "nothing can be undone" |
| D-A8 | research/findings/ftg-posts-a.md (archive; posts 75844005, 79527117) | 2023 | read 2026-09-27 | fill tool finicky; walls not saving; ChatGPT used by the creator for templates |
| D-A9 | research/findings/ftg-posts-b.md (archive; posts 101576411, 106664214, 120828892, 127128581) | 2024-2025 | read 2026-09-27 | field-locked re-roll most requested; versioned storage as undo; three candidates refused; district re-roll destroys hand edits; "8×" |
| D-A10 | research/findings/ftg-posts-c.md §2.20, §5 (archive; posts 157283634, 159738553) | 2026-05 → 2026-06 | read 2026-09-27 | bulk edit "This action cannot be undone"; "broad strokes or super specific"; no density control |
| V-S1 | https://www.electrondance.com/every-click-has-meaning/ | 2021-08-30 | 2026-09-27 | Townscaper essay: zero tutorial, "journey of discovery", click-spells, click intent read (taller/bigger), drag-click expected but impossible, "got bored after about 30 minutes"; the phrase "never makes mistakes" is NOT in it |
| V-S2 | https://store.steampowered.com/appreviews/<id>?json=1&language=<english,all>&purchase_type=<all,steam>&num_per_page=0 for 1291340, 2198150, 1588530 | live | 2026-09-27 19:22 | review totals by filter: the counts in item 101 (f) (10 615 / 13 895 / 1 930) match English reviews by Steam purchasers (10 617 / 13 888 / 1 928 at 19:22); the sub-surveyors quote all-language, all-purchase totals |
| V-S3 | scratchpad/ux/V/verify.py (38 URLs of this table re-fetched with curl at 19:22 and searched for the claimed wording) | — | 2026-09-27 19:22 | 38 of 38 load-bearing claims found on the live page (V01-V38); list in Part II §6 |
