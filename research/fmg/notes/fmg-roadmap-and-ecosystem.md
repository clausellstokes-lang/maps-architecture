# FMG roadmap, open requests, community and ecosystem (as of 2026-10-16)

Tag legend: [STATED] creator/document says it; [OBSERVED] counted or read directly; [INFERRED] reconstruction with reasoning; [SNIPPET-ONLY] seen only in a search snippet. Local paths are under `/home/user/maps-architecture/reference/` (fmg-src = clone of https://github.com/Azgaar/Fantasy-Map-Generator at commit bae507ce, 2026-10-16; fmg-wiki = wiki mirror). "API" means the GitHub search API reached through the github MCP tool on 2026-10-16; the unauthenticated REST endpoints via curl were refused by the session proxy (see section 8).

## 1. Summary

### Takeaway
FMG is not a stalled hobby tool: in 2026 it has become a fast-moving, TypeScript, PRD-driven project (v1.154.2 on 2026-10-16, 552 `.ts` files, zero legacy JS modules left) whose maintainer closes nearly everything and keeps a curated 47-item backlog. The community's most-wished capability is history/war simulation (explicitly "most-wished across ~550 help threads" per a collaborator), followed by import/export rework, LOD for dense settlement maps, and society features (leaders, calendars, races, grouping). The ecosystem consumes FMG through four formats: the `.map` save file, the Full JSON export, GeoJSON (cells/routes/rivers/markers/zones) and CSV overviews; the single most-starred consumer is the Foundry VTT importer (62 stars).

### Cited Findings
- [OBSERVED] Upstream package version is 1.154.1 in the clone; latest release v1.154.2 dated 16 Oct 2026 with Linux/macOS desktop installers attached — `fmg-src/package.json:4`; https://github.com/Azgaar/Fantasy-Map-Generator/releases (fetched 2026-10-16).
- [OBSERVED] Repo: 6,100 stars, 1,030 forks (API search_repositories, 2026-10-16); web page shows "6.1k" stars, "1.0k" forks, 130 watching, 2,594 commits, 47 open issues, 4 open PRs, topics cartography/dungeons-and-dragons/fantasy-maps/generator/javascript/map-generation/mapmaker/procedural-generation — https://github.com/Azgaar/Fantasy-Map-Generator (fetched 2026-10-16).
- [OBSERVED] Issue totals: 1,061 issues, of which 47 open and 1,014 closed — API search_issues `is:issue`, `is:open`, `is:closed` (2026-10-16).
- [STATED] Collaborator barrulus (2026-09-04) on issue #1714: a full history simulation, together with discussion #1743 ("Generate history") and #1755 (war/battle simulation), is "the most-wished capability across about 550 help threads" — https://github.com/Azgaar/Fantasy-Map-Generator/issues/1714 (fetched 2026-10-16).

### Inferences
- [INFERRED] The project is in a maintainer-led "backlog consolidation" phase: 45 of the 47 open issues were created in a 24-minute window on 2026-09-03 (09:34–09:58 UTC) by migration from Trello, each already carrying a `theme:` label. Open issues therefore represent the maintainer's accepted backlog, not raw user demand; raw demand lives in the Ideas discussions and Discord.

### Gaps
- The dev board itself (https://github.com/users/Azgaar/projects/3) requires login; its columns/status fields could not be read (see section 8).

## 2. Roadmap and FMG 2.0 intentions, with every PRD summarized

### Takeaway
"FMG 2.0" is an architecture, not a product: the creator's architecture doc defines it as an incremental, never-big-bang transformation of the vanilla-JS app into typed generators → world state → editors/renderers, keeping `.map` compatibility and leaving a door open to WebGL. The PRDs in the repo (14 files) are almost all already shipped in v1.150–1.154 and are concentrated on editing UX, icons/styling, notes, routes and the economy, not on terrain or climate realism.

### Cited Findings — FMG 2.0 architecture
- [STATED] "The proposed FMG 2.0 architecture aims to gradually transform the project from a large, tightly-coupled vanilla JavaScript application into a modular, maintainable, and testable system." Goals listed: stay responsive on 100k-cell maps; bounded memory (UI built on demand and released on close); separate generation from rendering/UI; world data independent of SVG/DOM; reduce hidden global state; gradual JS→TS; "Improve long-term maintainability without breaking existing `.map` files"; "Allow alternative renderers in the future (e.g. WebGL)" — `fmg-src/docs/architecture/architecture.md:5-17`.
- [STATED] Target layering: settings → GENERATORS → WORLD (data + style) → EDITORS and RENDERERS ("SVG or WebGL Canvas"); "All the map-related state should be represented by a single gigantic `map` object" serialized to one JSON on save — `architecture.md:21-57`.
- [STATED] Generators must be deterministic: "The same seed reproduces the same world. Seed the RNG once, up front"; pipeline order "seed → terrain → climate → hydrology → cultures → states → burgs → routes → economy" — `architecture.md:120,128,385`.
- [STATED] "The refactor is explicitly incremental and is already in progress. The project is too large for a full rewrite" — progressive extraction, compatibility bridges, mixed JS/TS — `architecture.md:778-786`.
- [STATED] Future `.map` file: "a valid JSON capturing all data required to render and operate the map, including UI and style settings"; top-level `meta` (initial/current version, revision), `facts` (seed, graph, geography, climate, cultures, lore/calendar, units, coastline params), `layers`, `style`, `data` (topology grid/pack typed arrays; biomes, states, cultures, religions, settlements{burgs,routes}, annotations{notes,rulers}). The current data-model doc is called "inconsistent and not well-documented" — `fmg-src/docs/architecture/future-data-model.md:1-3` and JSON sketch lines 7-203.
- [STATED] Backlog issue #1698 "Rework save data format" (barrulus, 2026-09-03, Backlog): current format "arrays with custom separators" called unsafe; options considered: custom delimited, plain JSON, MessagePack, Protocol Buffers; draft structure meta/settings/world/grid/pack — https://github.com/Azgaar/Fantasy-Map-Generator/issues/1698 (fetched 2026-10-16).
- [OBSERVED] Migration status: 552 `.ts` files under `src/`, 0 non-test `.js`; `public/modules` is empty; the v1.154.0 notes say the Style Editor and presets were "the last legacy modules still waiting for migration. That work is now done: both have moved to TypeScript, retiring the remaining scripts in `public/modules`" — `find` on fmg-src/src (2026-10-16); `fmg-src/docs/updates/v1.154.0/v1.154.0 - Icon Library.md` ("Styling changes" section).
- [STATED] Rendering direction (2024): Azgaar in discussion #1126 — "JS code is pretty fast, my Mac generates a map of default settings in 0.3s"; "Graphics is slow, but it's SVG so there is no room for improvement here"; three options: keep SVG ("really good format to work with... really easy to debug"), rasterize some layers (possibly 5 fixed zoom levels), or render in 3D styled to look 2D (mapgen4 cited); regeneration + render ≈200–300 ms — https://github.com/Azgaar/Fantasy-Map-Generator/discussions/1126 (fetched 2026-10-16).
- [SNIPPET-ONLY] A mirror shows a `relief-webgl-renderer` branch in the repo and an instructions file describing gradual JS→TS migration "while maintaining compatibility with the existing generation pipeline and legacy .map user files" — search result citing https://git.korz.dev/backups/Fantasy-Map-Generator/src/branch/relief-webgl-renderer/.github/copilot-instructions.md.bak (2026-10-16).
- [OBSERVED] No search result or repo document uses "FMG 2.0" as a release name; the phrase appears only in `architecture.md:5` — grep of fmg-src/docs (2026-10-16).
- [STATED] Dev-board process: board Status is derived from GitHub state (closed-completed → Done; not-planned/duplicate → Archive; merged PR → Done); "Done... does not assert that a release has been deployed"; a reconciler script `scripts/board-reconcile.mjs` repairs status; Theme/Priority/Size fields are "fill-only" — `fmg-src/docs/board-completion.md:3-29`.
- [STATED] Release cadence 2026 (from releases page, fetched 2026-10-16): v1.119 Jagged Coastlines (26 Apr), v1.123 Eroded Terrain and Satellite Texture (12 Jun), v1.124 Economy (17 Jun), v1.140 Labels (12 Aug), v1.149.1 Electron App (27 Aug), v1.150 Journeys (1 Sep), v1.152.1 Options (11 Sep), v1.153 Omnibar (16 Sep), v1.154 Icon Library (5 Oct), v1.154.2 (16 Oct, adds Gemini provider, benchmarks).
- [OBSERVED] Last ten commits (2026-10-11..16) are benchmark infrastructure ("before/after benchmark for generation, drawing, zoom and pan", "benchmark reports slowdowns"), Assistant providers, and bug batches; desktop app releases are automated on every version bump — `git log` of fmg-src (2026-10-16).

### Cited Findings — every PRD in `fmg-src/docs/prd/` (status is [INFERRED] from changelog/closed issues unless the PRD states it)
| PRD file | What it adds | Status | Evidence |
|---|---|---|---|
| assistant.md (818 lines) | "Azgaar Assistant": one chat panel; tiers Guest (docs Q&A, daily allowance), Member (Discord sign-in, larger allowance), Key (user's own Anthropic/OpenAI/Mistral/Qwen/DeepSeek/Gemini key or local Ollama: reads the map, proposes changes applied via Preview → Apply → Undo, dry-run on a draft copy, batch all-or-nothing). Lists an "Operations catalogue" of every editable operation by model class. | Shipped in 1.154.0 ("Assistant can read map data and propose changes when your own AI key is provided") | `docs/prd/assistant.md:1-30,345-486`; `docs/wiki/Changelog.md` 1.154.0 entry; Policy wiki "Azgaar Assistant" section |
| controller-service-registry.md | Typed module registry: `Controllers.X.method()` / `Services.X.method()` with lazy or eager loading via a two-level Proxy; replaces ~40 hand-written dynamic-import call sites. | Implemented (other PRDs reference `Controllers.FeaturesOverview`) | `docs/prd/controller-service-registry.md:1-35,72`; `features-overview.md:71-73` |
| emblems-icon-library.md | Emblems join the Icon Library: picture emblems, heraldic charges as icon sets, Armoria paste and send-back live round trip, quality profiles, migration. | "Status: implemented in FMG and the companion Armoria checkout" (2026-09-28) | `docs/prd/emblems-icon-library.md:3-11` |
| entity-notes.md | Notes move from a global id-string side table to the entities themselves (3 tiers), fixing orphaned/duplicate/lake notes; migration gated at 1.152.0. | Shipped (closed #1690 "Allow adding notes for States/Religions..." completed 2026-09-10; 1.152.1 notes moved to Quill editor) | `docs/prd/entity-notes.md:3-30,187`; API closed list |
| features-overview.md | Geographical Features Overview dialog listing islands/lakes/oceans with rename, subtype (fixed sets), lake group, area, notes; makes `group` rendering-only and `subtype` domain-meaningful; custom lake groups become first-class styles; oceans get subtype ocean/sea/gulf. | Shipped (closed #1722 "Water bodies overview", #1718 "Islands overview" completed 2026-10-06; wiki page exists) | `docs/prd/features-overview.md:26-58`; `fmg-wiki/Geographical-Features-Overview.md` |
| good-multipliers.md | Five-dimension production multipliers on goods (cultureType, culture, state, religion, biome), 0 suppresses, editor popups. | Implemented ("Multipliers section documents the implemented design") | `docs/prd/good-multipliers.md:3-20,228` |
| icon-assets.md | Move 511 KB of inline `<symbol>` icon markup out of `index.html` into set directories; stable set-independent icon ids. | Shipped in 1.154.0 Icon Library | `docs/prd/icon-assets.md:3-27`; Changelog 1.154.0 |
| icon-library.md | One Icon Library for all slots (goods, markers, regiments, burgs, ports, market marker): shipped sets + custom uploads stored once + URL links; one picker; migration. "All three steps are implemented." | Shipped 1.154.0 | `docs/prd/icon-library.md:3-50,262` |
| layers-management.md | Single Layer registry replacing DOM-as-truth (`layerIsOn()` from ~341 sites), implicit triple-duplicated order, three hide mechanisms; technical layers become a concept. | Implemented (PRD written in past tense; e2e "layer-scenarios" test exists, issue #1650) | `docs/prd/layers-management.md:3-32`; API closed #1650 |
| meandering-river-routes.md | Navigable-river sea routes and trade animation follow the river's meander geometry with matching phase; no schema change. | Implemented (follows navigable-river-routes; wiring described as done) | `docs/prd/meandering-river-routes.md:3-23` |
| navigable-river-routes.md | Sea-route pathfinding traverses navigable river cells above a flux threshold; `burg.port` redefined as "final reachable water body"; closed-lake (Caspian-style) networks; river burgs flagged as ports. | Shipped (closed #1812 "Burg editor's Port toggle bypasses the river navigability check", 2026-10-12) | `docs/prd/navigable-river-routes.md:3-33`; API closed list |
| omnibar.md | Keyboard command palette (Space): commands with `>` prefix plus entity search, VS Code conventions. | Shipped 1.153.0 | `docs/prd/omnibar.md:1-20`; Changelog 1.153.0 |
| relief-icon-pools.md | Editable per-biome relief pools (weights, sizes, density) and ordered relief rules by elevation/temperature; any Icon Library icon usable as relief; "a long-standing request". | "Status: implemented" (2026-09-27); shipped 1.154.0 | `docs/prd/relief-icon-pools.md:3-32`; Changelog 1.154.0 |
| state-taxes-and-treasury.md | State treasury fed by sales tax (local + global) and poll tax, rates derived from `state.form`; explicitly no ticking economy, no spending. | Status not stated in PRD; no changelog line found | `docs/prd/state-taxes-and-treasury.md:3-27` |
| wrap-tool.md | Brush that drags packed-cell vertices with falloff (coastlines, lake shores, inland); replaces single-vertex coastline editor; "general deformation tool... is shelved" because geometry and entity coordinates live in separate representations. | Shipped 1.153.0 (closed #1716 "Cells editor [Wrap functionality]" 2026-10-06) | `docs/prd/wrap-tool.md:3-24`; Changelog 1.153.0 |

### Inferences
- [INFERRED] The 2026 roadmap is UX/editor/aesthetics-first (icons, styles, omnibar, notes, assistant, desktop app, benchmarks), with simulation depth added in bounded slices (economy 1.124, navigable rivers, taxes). Terrain/climate realism gets occasional releases (1.119 jagged coastlines, 1.123 eroded 3D terrain + satellite texture) but no PRD in the current folder targets hydrology or climate physics.
- [INFERRED] Rendering will stay SVG for editing; the architecture doc keeps WebGL as an "alternative renderer" option and a fork (barrulus) already ships a WebGL burg layer, so a hybrid (raster/WebGL background, SVG for the edited layer) is the likely medium-term direction, matching goteguru/Caellian's proposals in #1126.

### Gaps
- The dev board's Priority/Size fields and its Theme-level grouping could not be read (login wall). Whether `state-taxes-and-treasury` has shipped is unverified.
- The blog is covered by another researcher; no roadmap statement from it was surfaced by my search snippets.

## 3. Issue and request themes with counts, and the most-wanted items

### Takeaway
Open backlog (47) is dominated by UI/editors (11), import/export (8) and cultures/society (7); the recent-closed stream (100 most recent) is 39% bug-labelled and heavily UI/editor and import/export. Demand signals outside the backlog point to history/war simulation, LOD for dense maps, map versioning, performance/WASM, seamless world wrap, and VTT/engine export.

### Cited Findings — open issues by `theme:` label (47 total; API `is:open`, 2026-10-16; counted by hand from the returned labels)
| Theme label (GitHub description) | Count | Example issues |
|---|---|---|
| ui-editors (UI / UX & Editors) | 11 | #1724 image resizer for Image Converter; #1723 welcoming screen; #1721 Travel Builder arrows/segment notes; #1720 ocean overview/labels; #1719 lock elements from painting; #1717 heightmap template editor UI; #1715 topographic cross-section via ruler; #1680 province ownership change; #1668 marker note name; #1522 remove-dialog hotkey; #1478 tags for states/entities (5 comments) |
| import-export (Import / Export / Save) | 8 | #1700 wrap a full world map horizontally; #1699 view-only mode; #1698 rework save data format; #1697 simplified SVG export; #1696 country data upload from CSV; #1695 climatic zones; #1693 map frame; #1676 manage map version (1 👍) |
| cultures-society | 7 | #1692 leaders generation; #1691 religion symbols; #1689 save whole culture set; #1674 race/species distribution separate from cultures; #1673 "Is the race/species layer still coming?"; #1672 calendar generation; #1671 group states/religions/cultures |
| labels-styling | 5 | #1707 read heightmap from a legend; #1706 color picker; #1705 legend font color; #1704 bold/italic/underline; #1703 auto-number grid tiles |
| states-diplomacy | 3 | #1714 simulate history; #1713 province regeneration per state; #1712 alliances |
| rivers-water | 3 | #1711 rivers avoid acute angles; #1710 river groups with style; #1709 ocean decorations |
| climate-terrain | 3 | #1688 show cell indexes; #1687 non-directional wind simulation; #1686 finer control over heightmap generation |
| burgs-population | 3 | #1438 Burg LOD visibility (11 comments, 1 👍, assigned to Azgaar); #1684 population layer styling; #1670 assign burg tags en masse |
| markers-zones | 1 | #1708 non-passable zones |
| integrations | 1 | #1701 translations [On Hold] |
| architecture | 1 | #1682 get rid of jQuery |
| military | 1 | #1679 hide regiment |
Source: API search_issues `is:open` in Azgaar/Fantasy-Map-Generator (2026-10-16), 47 results, all pages. Note [OBSERVED]: 45 of 47 created 2026-09-03 09:34–09:58Z; only #1438 (2026-05-19), #1478 (2026-06-14), #1522 (2026-07-01) predate the Trello migration.

### Cited Findings — most-commented and most-reacted issues of all time (API `sort:comments` / `sort:reactions-+1`, 2026-10-16)
- [OBSERVED] Top comment counts are old meta/bug threads: #390 "Spaces in names" (32), #153 "Contributing code" (25), #88 "Questions, suggestions and ideas" (23), #9 (21), #144, #896 "Population can go negative" (20), #1186 (20). The only open issue in the top 50 by comments is #1438 Burg LOD (11). Enhancement threads in the top 50: #316 city generator features in burg details (16), #766 "Update Idea – Languages" (11), #87 "Improved Realism for Political Growth" (10), #34 import country CSV (12), #957 "Could FMG use canvas to draw objects rather than svg?" (7).
- [OBSERVED] Reactions are almost unused on issues: the maximum 👍 is 2 (#70 randomize options with locking, #69 custom-size PNG export, #132, #1650); all open issues have ≤1 reaction. Demand is expressed in Discussions votes and Discord instead.

### Cited Findings — Ideas discussions, sorted by top votes (https://github.com/Azgaar/Fantasy-Map-Generator/discussions/categories/ideas, pages 1–2 fetched 2026-10-16; 6 pages exist, total count not shown)
- [OBSERVED] 4 votes: Government ranks; "Unity Integration successful!" (closed); more military emblem icons (closed); group states/religions/cultures; General Expansion Ideas (8 comments); "Connect both sides of the map seamlessly. Wrap the 2D flat map like it was a 3D object" (2026-09-24); population-weighted single culture definition for states/provinces (7 comments, 2026-09-10).
- [OBSERVED] 3 votes: choose generated cultures; UI reskin concept; World Age button; country-specific export; monarchs for states; automatic population and year changing; labels for features.
- [OBSERVED] 2 votes: "Azgaar to FoundryVTT?"; fantasy biomes; unit changes without recalculation; "WASM & optimization" (19 comments); cells export information; ideologies; burg group style options; obliquity/tilt (7 comments); manage map version (7 comments); new namebases; languages and custom zones (8 comments); procedural canals; subprovinces; journeys off-road terrain cost; "joining at the edges"; rules-based biomes; locking burgs against regeneration (closed).
- [OBSERVED] 1 vote (sample): alternate coordinate systems; sea-route shoreline padding; burg alternative/long-short names; merge cultures/religions; markets dampen production concentration; biome-set presets; resize a map without regenerating.

### Cited Findings — recently closed (100 most recently created closed issues, API `is:closed sort:created`, created 2026-06-25..2026-10-15)
- [OBSERVED] Label counts: bug 39, pending review 20, theme: ui-editors 19, import-export 9, labels-styling 8, burgs-population 8, states-diplomacy 7, enhancement 6, cultures-society 6, integrations 3, invalid 3, cannot reproduce 3, climate-terrain 2, architecture 2, markers-zones 2, question 2, military 1. All 100 have `state_reason: completed`.
- [OBSERVED] Recurring complaint clusters in that set: save/load and migration breakage after version upgrades (#1957 "i can't save my maps", #1558, #1584, #1824, #1773, #1771, #1938, #1878); regeneration destroying manual work (#1948 submap regeneration, #1865 burg regeneration resets population, #1872 group restrictions ignored); export glitches (#1922 SVG into Illustrator/Inkscape, #1882 PNG partially black, #1547 Firefox filters); 3D/globe breakage (#1517, #1516); desktop/Electron bugs (#1847, #1660); mobile regression (#1524 paintbrushes on mobile).
- [OBSERVED] Several "subprovinces/subdivisions" requests (#1550, #1549, #1548, #1543, #1542, Jul 2026) were closed within days (pending review), and "Subprovinces" persists as a 2-vote idea.

### Cited Findings — maintainer positions on specific requests
- [STATED] Burg LOD (#1438): Azgaar 2026-05-19 "not complex", reuse label scale; 2026-08-24 closed as "Partially implemented with Label groups", reopened after pushback; "Not planned for now, but later we may have an advanced lod system" — https://github.com/Azgaar/Fantasy-Map-Generator/issues/1438.
- [STATED] Generate history (#1743 discussion): maintainer triage "Too broad"; Simulate History (#1714): triage note "duplicate", kept in Backlog, grouped with #1743 and #1755 — fetched 2026-10-16.
- [STATED] Mobile: "The Generator GUI is not suitable for mobile devices and performance is subpar. In general, I would say mobile devices are not supported." — `fmg-wiki/Q&A.md:60-61`.
- [STATED] Translations on hold (#1701, #1702 "basic support [On Hold]").

### Inferences
- [INFERRED] Theme ranking of felt gaps, combining open backlog, Ideas votes and the Discord-derived statement: (1) history/war/timeline simulation; (2) dense-map scalability (LOD, performance, WASM/WebGL, 500k-cell forks); (3) data-format and versioning (save format rework, map version management, country CSV import, simplified SVG, cells export info); (4) society depth (leaders, calendars, races/species, government ranks, alliances, ideologies, grouping); (5) world topology (seamless wrap/joining edges, obliquity, alternate coordinate systems); (6) VTT/engine integration (Foundry, Unity, CK3). Terrain realism per se (rivers avoiding acute angles, non-directional wind, finer heightmap control, canals) is present but low-volume.
- [INFERRED] Issue reactions are an unreliable popularity signal for FMG (max 2 👍 in 1,061 issues); Discussions votes and comment counts are the usable proxies.

### Gaps
- Discussions pages 3–6 and the Q&A category were not read; the Ideas total count is unknown. Reaction counts on discussions were only visible as "votes".
- Discord's ~550 help threads (the source of the "most-wished" claim) are not accessible.

## 4. Community and reception figures

### Takeaway
GitHub shows a mid-sized, loyal community (6.1k stars, ~1k forks, 130 watchers, 1,061 issues since 2017) with an official Discord, subreddit, Patreon and YouTube channel; none of the off-GitHub sizes could be measured because Reddit, Patreon, YouTube and the Discord invite API are all blocked in this environment.

### Cited Findings
- [OBSERVED] 6,100 stars, 1,030 forks, language HTML, pushed 2026-10-16 — API search_repositories `user:Azgaar` (2026-10-16). Web page: "6.1k", "1.0k", "130 watching", "2,594 Commits", 47 open issues, 4 open PRs — https://github.com/Azgaar/Fantasy-Map-Generator.
- [OBSERVED] Fork search `Fantasy-Map-Generator in:name fork:only` returns 1,099 repositories (includes unrelated same-name forks such as psi29a/FantasyMapGenerator, C++) — API (2026-10-16).
- [STATED] Official channels: Discord https://discordapp.com/invite/X7E84HU with `#fmg-bugs`/`#fmg-suggestions` and an "FMG Assistant" bot offering `/bug`, `/idea`, `/ask` with moderator review before GitHub submission; Reddit https://www.reddit.com/r/FantasyMapGenerator; Patreon https://www.patreon.com/azgaar; contact azgaar.fmg@yandex.com — `fmg-src/README.md:11-19`; `fmg-wiki/Reporting-bugs-and-ideas.md:3-62`.
- [OBSERVED] Test issues "First live test bug with AzgaarBot" (#1890) and "Test bug" (#1891) closed 2026-09-20 confirm the Discord→GitHub bot went live in Sept 2026 — API closed list.
- [STATED] Azgaar Assistant: Guest/Member tiers run on "the Azgaar server", questions retained 90 days, Discord OAuth sign-in raises the daily allowance; Google Analytics on the official site — `fmg-wiki/Policy.md:22-72`.
- [SNIPPET-ONLY] Official YouTube channel id UCb0_JfUg6t2k_dYuLBrGg_g is linked from the old "Getting Started" wiki; one third-party listing names a video "[Remastered] Azgaar's Fantasy Map Generator Tutorial Part 1: Basics and Creating your own map"; the GIS wiki page links a three-part series "How to create an interactive, detailed world atlas of your fantasy game world?" — search 2026-10-16; `fmg-src/docs/wiki/GIS-data-export.md:85-89`.
- [SNIPPET-ONLY] No member count for r/FantasyMapGenerator surfaced; a tracker gives ~60k for the unrelated r/FantasyMaps — search 2026-10-16 (gummysearch.com result).
- [SNIPPET-ONLY] Azgaar "first shared their fantasy map generator around March 2017" — search 2026-10-16 (alternativeto.net about page).
- [OBSERVED] Reception proxies in the repo: third-party listings on Roll20 GM Hub, Book Riot "10 of the Best Fantasy Map Generators", AlternativeTo (alternatives listed: Inkarnate, Worldographer, Wonderdraft) — search results 2026-10-16 [SNIPPET-ONLY].
- [OBSERVED] Companion projects by Azgaar: Armoria (heraldry, 367 stars, Svelte, pushed 2026-09-29), deorum (fantasy character gallery, 63 stars, pushed 2026-03-27), armoria-api (48), spell-caster (15), Fantasy-Map-Generator-old (legacy version for pre-0.70 maps), fmg-fonts — API `user:Azgaar` (2026-10-16).

### Inferences
- [INFERRED] The Discord is the primary support channel (bot-mediated reporting, ~550 help threads cited by a collaborator), so GitHub issue counts understate user demand by a large factor.

### Gaps
- Reddit member count, Patreon patron count/tiers, Discord member count and YouTube subscriber/video list: all blocked (section 8). No download/usage statistics are published; Google Analytics data is private.

## 5. Ecosystem table: tool, what it consumes or produces, format, status

### Takeaway
Consumers cluster around four FMG outputs: the Full JSON export (Foundry, Unity, OnlyWorlds), the `.map` file (Obsidian plugins, parsers), GeoJSON (QGIS, Godot plugin), and heightmap/PNG (Blender add-ons, Minecraft). Azgaar's own companions (Armoria, Watabou's MFCG/village generator) are wired in by URL. The most important forks are barrulus (scale: 500k cells, WebGL burgs, hierarchical settlements) and the vendored settlement-engine fork.

### Cited Findings — FMG's own export surface (what the ecosystem can consume)
- [OBSERVED] Export dialog: SVG; PNG/JPEG at up to 8× resolution; tiles as .zip; GeoJSON for cells, routes, rivers, markers, zones; JSON "full, minimal, pack cells or grid cells"; Save dialog writes `.map` (editable, `application/octet-stream`); Burgs and Markers overviews export CSV — `fmg-wiki/Q&A.md:33-39`; `fmg-src/src/services/io/export.ts:768-862` (functions saveGeoJsonCells/Routes/Rivers/Markers/Zones); `export-json.ts:10-13`; `save-to-file.ts:41`; `docs/wiki/GIS-data-export.md:30,48-58`.
- [STATED] GeoJSON cell properties: id, height, biome, type, population, state, province, culture, religion, neighbors; coordinates are lon/lat following Options → Configure world; "there are sometimes gaps or overlaps in the cell export data" — `docs/wiki/GIS-data-export.md:32-45`.
- [STATED] `.map`/`.gz` files from v0.70.0 onward are auto-updated on load; older maps need the old generator — `docs/wiki/Changelog.md` header.
- [OBSERVED] Outbound integrations in source: Armoria (emblem editing with live send-back), Watabou's Medieval Fantasy City Generator (`watabou-city`, `watabou-capital`, `watabou-village` links; "MFCG link" issue #1683) — grep of fmg-src/src (2026-10-16); Dropbox cloud save; Ollama/OpenAI/Anthropic/Mistral/Qwen/DeepSeek/Gemini for text — `fmg-wiki/Policy.md:18-20,42`; commit 2026-10-14 (#1964).

### Cited Findings — third-party consumers (API search_repositories `azgaar fantasy map generator -user:Azgaar`, 55 results, 2026-10-16; stars/pushed as returned)
| Tool | Consumes / produces | Format | Status / notes |
|---|---|---|---|
| Ethck/azgaar-foundry "Unofficial Azgaar's Fantasy Map Generator Import" | FMG → Foundry VTT journals (auto-linked) + scene image | Full JSON export + map picture | 62★, 19 forks, pushed 2026-03-21; Foundry package page lists 0.4.0 for v11+, GitHub notes a v12 rewrite [SNIPPET-ONLY]; known issue: image export misaligned with .map when browser zoom differs [SNIPPET-ONLY] — https://github.com/Ethck/azgaar-foundry; https://foundryvtt.com/packages/azgaar-foundry |
| niefia/AzgaarFMGtoCK3 | FMG → Crusader Kings 3 mod | Python converter | 25★, pushed 2024-05-20 |
| hasparus/share-azgaar-map | shareable links to FMG maps | TS web | 24★, pushed 2022-04-11 |
| janphelee/Fantasy-Map | C# port of FMG | — | 6★, 2022 |
| Pine129/Azgaar-Companion-Tool | companion utilities | Python | 4★, pushed 2026-05-12 |
| chriswhong/mapbox-fantasy-map-generator | render FMG in Mapbox GL JS | port | 4★, pushed 2025-11-19 |
| kwarzeski/FantasyMapGeneratorBlenderAddon | FMG map → Blender mesh | Python add-on | 4★, 2024 |
| mimmackk/blender-io-azgaar | FMG heightmap → Blender | Python add-on | 2★, pushed 2025-08-30 |
| aznan-triks/mcp-for-Azgaar | MCP server for FMG (LLM tooling) | TS | 3★, pushed 2026-10-10 |
| rrgeorge/FantasyMapConverter | FMG → EncounterPlus VTT | JS | 3★, 2024 |
| znewton/azgaarfmg-to-obsidianmd | `.map` → Obsidian vault | TS | 3★, 2024 |
| ken-bimmel/azgaar-to-obsidian | CSV exports → Obsidian vault | JS | 2★, 2023 |
| pannonbeard/obsidian-azgaar-atlas | Obsidian plugin using `.map` files | TS | 0★, pushed 2026-10-14 |
| fucknoobhanzo/fantasy-map-generator-skill | AI "skill" to drive FMG in a browser | JS | 2★, pushed 2026-08-09 |
| mosuzi/WebGL-Fantasy-Map-Generator | WebGL reimplementation "inspired by" FMG, AI-generated | JS | 2★, pushed 2026-09-20 |
| Open-Historia/open-historia-map-editor | standalone editor that generates worlds with FMG | JS | 2★, pushed 2026-07-20 |
| DaMiscDev/Tectonics.js-to-Azgaar-s-Converter | Tectonics.js CSV → FMG-compatible heightmap (input side) | Python | 2★, 2025-11 |
| hanserlodev/voronia | native Rust + wgpu engine "inspired by" FMG | Rust | 2★, pushed 2026-08-28 |
| JSJBDEV/FantasyTerrainGenerator | FMG maps → Minecraft worlds | Java | 1★, 2025 |
| MitchellTLarsen/terrain-gen | realistic heightmaps from FMG exports via terrain-diffusion | Python | 1★, 2026-04 |
| parallelopipedon/azgaar_map_generator | Godot 4 plugin outputting RFC 7946 GeoJSON, FMG-inspired | GDScript | 0★, pushed 2026-10-01 |
| OnlyWorlds/azgaar-converter | FMG export → OnlyWorlds world | JS | 0★, pushed 2026-10-08 |
| Felipe-Alves-VNGX/azgaar-map-reader | Python library reading FMG exports | Python | 0★, 2025-10 |
| Badrpas/Fantasy-Map-Parser | parser for `.map` files | JS | 0★, 2023 |
| JulianWww/mediawiki-...-extension | embed FMG in MediaWiki | — | 0★, 2024 |
| olegyev/azgaar-storage | AWS S3 storage backend | Java | 0★, 2024 |
| Aaronlan2/Fantasy-Map-Generator-CN, Corinne1124 fork | Chinese localizations | forks | 2025–2026 |
- [SNIPPET-ONLY] A Unity pipeline turning "a single Azgaar export into a playable Unity world with terrain, rivers, and political regions" (dev.to, adilbouchnita) and a Substack post on Unreal Engine 5 import noting FMG "doesn't have a direct export option for Unreal Engine 5" — search 2026-10-16; dev.to fetch failed (ENOTFOUND).
- [SNIPPET-ONLY] Wonderdraft/Inkarnate round trips are image-only: FMG is used "to quickly create a background map, then downloaded and imported into Inkarnate"; Inkarnate exports only JPG; a YouTube series starts from an Azgaar map and imports into Wonderdraft — search 2026-10-16 (enworld.org, eleanorkonik.com).
- [SNIPPET-ONLY] Docker image rutgerhartog/fmg exists (described as out of date) — search 2026-10-16.
- [OBSERVED] FMG 3D: no separate "FMG 3D" app exists; 3D is an in-app presentation-only view (three.js Mesh and Globe modes, eroded terrain bake, satellite texture) that "cannot be used for editing" — `fmg-src/docs/domain/3d-view.md:1-25`. An Azgaar-authored alpha repo (Fantasy-Map-Generator-alpha, 2021) is dormant — API `user:Azgaar`.

### Cited Findings — notable forks (API fork search sorted by stars, 2026-10-16; top 30 all ≤11 stars)
| Fork | What it changes | Status |
|---|---|---|
| barrulus/Fantasy-Map-Generator | "larger, denser worlds": heightmaps up to 500K cells; seven-tier hierarchical settlement placement; WebGL burg layer with SDF labels and quadtree hit-testing; megalopolises (multiple burgs per cell); gravity-model maritime trade network; antimeridian-wrapping sea/air routes; sky burgs/air routes; GeoJSON export scripts, JSON map loading, repair scripts; aims to stay `.map`-compatible; several upstream PRs merged | 11★, 3,136 commits, pushed 2026-10-16; author is an upstream collaborator who ran the Trello→GitHub backlog migration — https://github.com/barrulus/Fantasy-Map-Generator (fetched 2026-10-16); API closed list (labels by barrulus) |
| howlingsails/Fantasy-Map-Generator | unknown | 3★, pushed 2026-05-22 |
| goteguru/Fantasy-Map-Generator | author is the collaborator who argued SVG is the bottleneck in #1126 | 2★, 3 forks, 2022 |
| covison/Fantasy-Map-Generator-Resource-generator | "Generating resources for FMG" | 2★, 2024-12 |
| AonzOG/Fantasy-Map-Generator | Windows installer/launcher .bat scripts (Unlicense), no generator changes | 1★, pushed 2026-10-04 |
| spencerpruitt/Worldbuilding-Tool | fork; author contributed "choose the map file destination" upstream in 1.154.0 | 1★, 2026-07 |
| dyckh28-hue/Map-generator-GPU-accelerated | "GPU accelerating" FMG | 0★, 2025-08 |
| clausellstokes-lang/settlement-engine (vendored under `public/map/`, revision "sfdrop16") | listed only; audited by another researcher | — |

### Inferences
- [INFERRED] Compatibility the ecosystem actually depends on, in order: (1) Full JSON export field names (cells `h/biome/state/culture/religion/pop`, burgs, states, rivers) consumed by Foundry/Unity/OnlyWorlds/CK3 converters; (2) `.map` parsing (Obsidian, parsers, the Foundry picture alignment problem); (3) GeoJSON with lon/lat and the ten cell properties for QGIS; (4) PNG/heightmap raster for Blender/Wonderdraft/Inkarnate; (5) CSV overviews. Because #1698 proposes replacing the delimited `.map` format, every `.map`-parsing tool is at risk, while JSON/GeoJSON consumers are safer.
- [INFERRED] No fork has meaningful community traction (max 11 stars vs 6,100); forks are either personal scale experiments (barrulus) or packaging/localization. The "fork that matters" is barrulus because its features (LOD, WebGL burgs, hierarchical settlements, huge cell counts) directly address the top complaint cluster and its author now triages upstream.

### Gaps
- The Foundry module's current compatibility (v11 vs v12) is contradictory across listings and unverified. The Unity/UE5 pipelines' exact field usage could not be read (dev.to blocked).

## 6. Licensing and policy

### Takeaway
Code is MIT (copyright Max Haniyeu/Azgaar 2017–2024); generated maps are the user's for any purpose including commercial with no attribution required; bundled fonts/icons/heraldry carry their own licences; the Policy page frames FMG as "a hobby project, not a company" with no accounts and browser-local data, except the opt-in Assistant server tiers.

### Cited Findings
- [OBSERVED] `LICENSE`: "MIT License / Copyright 2017-2024 Max Haniyeu (Azgaar), azgaar.fmg@yandex.com" — `fmg-src/LICENSE:1-3`.
- [STATED] "The Generator's source is MIT-licensed. Maps you create are yours, for any purpose, commercial included, with no attribution required — though a link back is always appreciated. Some bundled assets (fonts, icon sets, coat-of-arms artwork) carry their own licences; see Dependencies." — `fmg-wiki/Policy.md:74-76`.
- [STATED] Q&A: "The Generator is licensed under MIT license and derivative works such as maps are free of charge. You can sell them or make them available for free." — `fmg-wiki/Q&A.md:20`.
- [STATED] "FMG is a hobby project, not a company. There is no account system, no user profile and nothing is sold to anyone." Maps never leave the browser; autosave in IndexedDB; Dropbox/Google Translate/AI providers are opt-in third parties — `fmg-wiki/Policy.md:3-20`.
- [STATED] Assistant risks disclosed: the model "writes small JavaScript programs that run in the Generator with the same access as the app itself"; `.map` files from others "can carry hidden instructions" (prompt injection); provided "as is" — `fmg-wiki/Policy.md:49-60`.
- [STATED] Contribution stance: "Pull requests are highly welcomed. The codebase is messy and I will appreciate if you start with minor changes." — `fmg-src/README.md:45`.
- [STATED] Future `.map` meta embeds `"license": "MIT"`, `"copyright": "Azgaar's Fantasy Map Generator"` and the source URL — `future-data-model.md:9-12`.
- [OBSERVED] Issue #6 "No License Listed" (2017) was the original licence request — API reactions list.

### Inferences
- [INFERRED] Deriving a generator from FMG code is licence-safe under MIT with attribution in source; the practical constraint is asset licences (fonts, icon sets, heraldic charges) which must be checked per asset in the Dependencies wiki page rather than assumed MIT.

### Gaps
- The Dependencies wiki page was only grepped, not catalogued; per-asset licences are not listed here. Nothing from the creator on trademark/branding use of the "Azgaar" name was found.

## 7. Implications for SettlementForge

### Takeaway
A native world generator should close the gaps FMG users feel most (history/timeline simulation, scalable dense settlement maps with LOD, robust versioned data format, society depth, seamless/global topology) while matching the four import/export surfaces the ecosystem already expects (FMG-style Full JSON, GeoJSON, `.map` reading, raster heightmap). It should not follow FMG into SVG-as-renderer, DOM-as-state, LLM-script-execution in the page, or a delimited custom save format.

### Cited Findings (anchors for each implication)
- Gaps users feel: history/war simulation "most-wished" (#1714 comment); LOD "Not planned for now" (#1438); save-format rework only in Backlog (#1698); map version management (#1676, 7-comment idea); seamless wrap (4-vote idea, #1700); society features (#1692, #1672, #1674, #1671, government ranks idea); performance/WASM (19-comment idea #1126); regeneration destroying manual edits (#1948, #1865, #1872) — all cited in section 3.
- Ecosystem compatibility: Foundry importer needs Full JSON + picture (section 5); QGIS needs GeoJSON cells with the ten properties in lon/lat (`GIS-data-export.md:32-35`); Obsidian plugins read `.map` (section 5); Blender add-ons read heightmap/PNG (section 5); CK3/Unity converters read JSON (section 5).
- FMG directions and their stated costs: SVG rendering "no room for improvement" (#1126); general deformation tool "shelved" because geometry and entity coordinates are in separate representations (`wrap-tool.md:19-23`); notes side-table orphaning (`entity-notes.md:9-27`); DOM-as-source-of-truth for layers (`layers-management.md:17-32`); Assistant executes model-written JS in-page with prompt-injection risk (`Policy.md:53-54`); 3D view is presentation-only (`3d-view.md:5-6`); mobile unsupported (`Q&A.md:61`).

### Inferences
- [INFERRED] Gaps a native generator should close:
  1. Time as a first-class axis: generate and store dated events, state/culture birth-decay, and a timeline slider (FMG's #1714 proposes deriving years from expansion cost; FMG triaged it "too broad/duplicate", leaving the field open).
  2. Scale and LOD by design: tiered settlement hierarchy and per-entity LOD level (goteguru's numeric 1–5 suggestion in #1438; barrulus fork's seven tiers and WebGL burgs show demand and feasibility).
  3. Versioned, schema-validated save format (JSON or binary with explicit `meta.version`/revision) with migration tests, since FMG's biggest closed-bug cluster is load/migration breakage after upgrades.
  4. Non-destructive regeneration: lock/pin manual edits so regenerating burgs, provinces or submaps preserves them (three recent closed bugs and a 2-vote "locking burgs" idea).
  5. Society depth: leaders, calendars, alliances, races/species as a layer separate from culture, grouping/tags of entities.
  6. Topology options: seamless horizontal wrap/globe-aware generation and obliquity (two recent 4-vote and 7-comment ideas).
- [INFERRED] Compatibility to provide: (a) an "FMG Full JSON"-shaped export (or converter) so Foundry/CK3/Unity/OnlyWorlds tools work unchanged; (b) GeoJSON export of cells/routes/rivers/markers/zones in lon/lat with FMG's property names; (c) a `.map` importer (read-only) for the installed base and for Obsidian-style tools; (d) 16-bit heightmap PNG export for Blender/Wonderdraft/Inkarnate; (e) CSV burg/marker tables. Matching these is cheaper than building a new ecosystem.
- [INFERRED] Directions NOT to follow, with reasoning:
  1. SVG/DOM as the render and state layer: the creator himself says graphics "is slow, but it's SVG so there is no room for improvement"; FMG's own PRDs spent 2026 undoing DOM-as-truth (layers, notes). PLAT should keep world data in typed arrays and render via canvas/WebGL from day one, with SVG only as an export.
  2. Separate representations for graph geometry and entity coordinates: this is why FMG shelved a general deformation tool; a native generator should anchor entities to cells/vertices so terrain edits carry settlements, rivers and routes.
  3. Custom delimited save format: FMG is now paying to replace it (#1698); start with versioned JSON (optionally compressed) and typed migration.
  4. In-page execution of LLM-written scripts for map Q&A/editing: FMG's Policy page documents prompt-injection and key-exfiltration risk; prefer a fixed, typed operation API (FMG's own "Operations catalogue" is the right half of that design).
  5. Presentation-only 3D and "mobile not supported": acceptable for FMG's desktop-cartography audience, but a settlement simulator aimed at play may need touch and a single engine for 2D/3D.
  6. Trello-style private backlog: FMG's migration to labelled GitHub issues + votes happened only in Sept 2026; adopt public theme-labelled triage from the start.

### Gaps
- No direct user research (Discord threads, Reddit) was readable; the ranking above leans on GitHub artefacts and one collaborator's summary of Discord.

## 8. Sources read and sources blocked

### Takeaway
Local clone and wiki were fully readable; GitHub issue/discussion data came through the GitHub search API and github.com page fetches; every off-GitHub community source (Reddit, Patreon, YouTube, Discord, dev.to, the blog, the login-walled project board) was blocked.

### Cited Findings — sources read
- Local: `fmg-src/docs/board-completion.md`; `docs/architecture/architecture.md` (lines 1-60, 770-810, greps); `docs/architecture/future-data-model.md`; all 15 files in `docs/prd/` (first ~30 lines each plus status greps; features-overview in full); `docs/wiki/Changelog.md` (head); `docs/wiki/GIS-data-export.md`; `docs/domain/3d-view.md` (head); `docs/updates/v1.154.0/*.md`; `README.md`; `LICENSE`; `package.json`; `src/services/io/{export.ts,export-json.ts,save-to-file.ts}` (function names only); `git log`.
- Wiki mirror: `fmg-wiki/Reporting-bugs-and-ideas.md`, `Policy.md`, `Home.md`, `Q&A.md` (grep).
- GitHub search API via MCP (2026-10-16): search_issues (`is:issue` sort comments, sort reactions-+1; `is:open` all 47; `is:closed` sort created, 100 most recent); search_repositories (forks by stars, ecosystem query, `user:Azgaar`).
- WebFetch (2026-10-16): repo page; open-issues page; issues #1698, #1438, #1714, #1743; discussion #1126; Ideas category pages 1–2; releases page; forks barrulus and AonzOG.
- WebSearch (10 of 10 budget used): r/FantasyMapGenerator size; Foundry module; QGIS workflow; 3D/Blender/Unity; YouTube tutorials; Deorum/Armoria; Wonderdraft/Inkarnate; Patreon; Reddit community (extended); "FMG 2.0" statements.

### Cited Findings — sources blocked (never counted as absent)
- https://api.github.com/repos/Azgaar/Fantasy-Map-Generator and all `/issues`, `/forks`, `/labels`, `/releases` REST endpoints via curl: HTTP 403 from the session proxy, body "GitHub access to this repository is not enabled for this session"; `add_repo` (read) answered that only git clone/fetch is served, not the API. The github MCP `list_issues` was also denied ("repository ... is not configured for this session"); only `search_*` tools worked. No rate-limit headers were ever received.
- https://github.com/users/Azgaar/projects/3 (dev board): page shows "You can't perform that action at this time." and sign-in links; no items readable.
- https://www.patreon.com/azgaar: `getaddrinfo ENOTFOUND www.patreon.com` (DNS blocked).
- https://www.reddit.com/r/FantasyMapGenerator/: "Claude Code is unable to fetch from www.reddit.com" (tool block).
- https://www.youtube.com/channel/UCb0_JfUg6t2k_dYuLBrGg_g/videos: `ENOTFOUND www.youtube.com`.
- https://discord.com/api/v9/invites/X7E84HU?with_counts=true: CONNECT tunnel 403 (no member count).
- https://dev.to/... Unity pipeline article: `ENOTFOUND dev.to`.
- https://azgaar.wordpress.com and public-api.wordpress.com: proxy log shows CONNECT 403 (covered by another researcher; not attempted by me).
- GitHub GraphQL/Discussions API: not attempted (requires auth); discussion bodies were read from HTML pages only; some replies hidden behind "Show 8 previous replies" in #1126.
