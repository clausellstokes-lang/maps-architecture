export const meta = {
  name: 'understand-town-generators',
  description: 'Exhaustively read every post, devlog, doc, source file, profile and screenshot; write per-slice findings files with technique/maths extraction',
  phases: [
    { title: 'Read', detail: 'one Opus reader per source slice, each writes research/findings/<key>.md', model: 'opus' },
    { title: 'Critic', detail: 'Fable completeness critic over all findings; lists unread sources and thin spots', model: 'fable' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
// The script has no filesystem access: each reader resolves its own slice from research/worklists.json
// (every list there is sorted oldest → newest). slice = [key, from, to) — counts verified before launch.
const sl = (key, from, to) => ({ key, from, to })
const cityA = [sl('watabou-city', 0, 15)], cityB = [sl('watabou-city', 15, 30)]
const vilA = [sl('watabou-village', 0, 14)], vilB = [sl('watabou-village', 14, 28)]
const ftgA = [sl('ftg', 0, 10)], ftgB = [sl('ftg', 10, 20)], ftgC = [sl('ftg', 20, 30)]
const dlA = [sl('devlog-medieval-fantasy-city-generator', 0, 23)], dlB = [sl('devlog-medieval-fantasy-city-generator', 23, 46)]
const dlVN = [sl('devlog-village-generator', 0, 21), sl('devlog-neighbourhood', 0, 6)]

const COMMON = `
PROJECT CONTEXT. The owner wants to build an ORIGINAL procedural settlement-map generator whose output can stand next to four references: watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG), Neighbourhood (NG), and Thomas Allerton's Fantasy Town Generator (FTG). None of the current source code is available. What is available: the creators' own posts/devlogs/docs, watabou's 2017 open-source ancestor (TownGeneratorOS, Haxe, GPL-3), and recordings we made of the live generators (CPU profiles attributed to class names, exact call counts, draw-call records, screenshots, FTG's server payload). Your job in this step is EXTRACTION, not design: capture every technique, mathematical principle, data structure, parameter, heuristic, failure mode and visual convention your slice reveals, precisely enough that an engineer could re-derive the algorithm.

Project root: ${ROOT}  (all paths below are relative to it unless absolute).

HARD RULES
- Read every file in your slice COMPLETELY (no skimming, no sampling). For posts/devlogs/docs: read the whole post.md INCLUDING the comments section (creator replies often explain the method), and open EVERY image listed under "Images (local files)" with the Read tool — the images are where geometry, layering and style are actually shown. Describe what each informative image demonstrates.
- Do NOT open or read any captured JavaScript bundle (captures/**/network/bodies/*.js) — the live code is proprietary; we work from the creators' words, the open-source ancestor, and recorded behaviour (report.md / *.calls.json / *.draw.json / screenshots / console traces) only.
- Separate what the source STATES from what you INFER. Tag every technique line with one of: [STATED] (creator explicitly describes method), [SHOWN] (visible in an image/recording but not explained), [INFERRED] (your reconstruction — give the reasoning), [NAMED-ONLY] (feature announced, no method given).
- For each technique give: what problem it solves; the algorithm as far as recoverable (steps, data structures, geometry/maths: e.g. Voronoi/Delaunay, straight skeleton, polygon offsetting, OBB bisection, Poisson-disc, A*, L-systems, noise, splines, Chaikin, marching squares…); parameters/constants mentioned; known failure modes and how the creator handles them (retries, discards, fallbacks); what changed versus the previous iteration; and what is still UNKNOWN that a re-implementer would have to decide.
- Cite sources by post id / devlog id / file path so claims can be re-checked.
- Write your full findings to the file named in your task (create research/findings/ if needed). No length limit on the file; be exhaustive and concrete. Then return ONLY the structured summary (keep summary strings short; the file carries the detail).`

const SCHEMA = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    findings_file: { type: 'string' },
    sources_read: { type: 'integer' },
    images_viewed: { type: 'integer' },
    sources_skipped: { type: 'array', items: { type: 'string' } },
    techniques: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          generator: { type: 'string', description: 'MFCG | VG | NG | FTG | OS | shared' },
          evidence: { type: 'string', enum: ['STATED', 'SHOWN', 'INFERRED', 'NAMED-ONLY'] },
          algorithm_summary: { type: 'string' },
          reproduction_confidence: { type: 'number', description: '0..1 that an expert could re-implement behaviour-equivalently from available evidence' },
          biggest_unknown: { type: 'string' },
        },
        required: ['name', 'generator', 'evidence', 'algorithm_summary', 'reproduction_confidence', 'biggest_unknown'],
      },
    },
    top_insights: { type: 'array', items: { type: 'string' } },
    open_questions: { type: 'array', items: { type: 'string' } },
  },
  required: ['key', 'findings_file', 'sources_read', 'images_viewed', 'techniques', 'top_insights', 'open_questions'],
}

const postTask = (key, who, dirs, extra = '') => ({
  key,
  prompt: `${COMMON}

YOUR SLICE (${key}): ${who}. Each directory below holds post.md (title, date, body with ![IMAGE #n] markers, links, full comment thread) and images/NN.ext in the same order as the markers. Work chronologically (the list is oldest → newest) so you can state what each iteration changed relative to the previous one.
Resolve your directory list FIRST by running this with Bash and keep the printed list as your checklist (every directory must be read):
${dirs.map((d) => `  python3 -c "import json; [print(x) for x in json.load(open('${ROOT}/research/worklists.json'))['${d.key}'][${d.from}:${d.to}]]"   # ${d.to - d.from} directories, relative to ${ROOT}`).join('\n')}
${extra}
Write findings to research/findings/${key}.md with: (1) a chronological table (date, id, title, what changed), (2) one section per technique as specified in the rules, (3) visual/style conventions observed in the images (palette, line weights, hatching, shadows, roofs, trees, water, labels, legends), (4) creator's stated design philosophy/constraints, (5) useful facts from comment threads, (6) open questions.`,
})

const TASKS = [
  {
    key: 'os-geometry',
    prompt: `${COMMON}

YOUR SLICE (os-geometry): the geometry + utility layer of watabou's open-source TownGeneratorOS. Read completely every file under reference/TownGeneratorOS/Source/com/watabou/geom/ and reference/TownGeneratorOS/Source/com/watabou/utils/ (skip nothing; coogee/ UI framework files only need a skim for anything geometric). Also read reference/TownGeneratorOS/README.md and LICENSE (state the licence and what it implies for reuse vs clean re-implementation).
Write research/findings/os-geometry.md: for every class and every non-trivial method give the exact algorithm (e.g. how Voronoi is built — incremental Delaunay with which frame/triangle bookkeeping, how relax works, how partitioning extracts regions; every Polygon operation: area, centroid, compactness formula, cut, shrink/buffer/inset semantics, smoothVertex, split, borders/findEdge, peel, simplify…; Random's generator constants and every distribution helper; PerlinNoise; MathUtils; GeomUtils intersection/interpolation maths; Spline). Include formulas, constants, complexity, numerical-robustness weaknesses, and which parts a modern rewrite should replace (and with what).`,
  },
  {
    key: 'os-model',
    prompt: `${COMMON}

YOUR SLICE (os-model): the generation pipeline of TownGeneratorOS. Read completely every file under reference/TownGeneratorOS/Source/com/watabou/towngenerator/building/ (Model.hx, Patch.hx, Topology.hx, CurtainWall.hx, Cutter.hx) plus TownScene.hx, StateManager.hx, Main.hx, and consult geom/ files when a call needs resolving.
Write research/findings/os-model.md: the pipeline stage by stage (buildPatches → optimizeJunctions → buildWalls → buildStreets → createWards → buildGeometry) with exact maths: the spiral seed placement formula, which cells get Lloyd-relaxed and why, patch bookkeeping flags, junction merging threshold, wall construction (which vertices are kept/smoothed, gate selection rules, tower placement, radius), the street graph (Topology: node construction, blocked nodes, edge costs, A* details), street smoothing, artery stitching, ward assignment by rateLocation (each ward class's scoring), the retry-on-exception loop and every throw site, every Random draw in order (determinism). Include all magic numbers. End with: limitations of this 2017 design that the live MFCG trace stages (buildPatches, optimizeJunctions, buildDomains, buildWalls, buildStreets, buildCanals, createWards, buildCityTowers, buildGeometry) suggest were later addressed.`,
  },
  {
    key: 'os-wards-render',
    prompt: `${COMMON}

YOUR SLICE (os-wards-render): ward geometry generators and rendering of TownGeneratorOS. Read completely every file under reference/TownGeneratorOS/Source/com/watabou/towngenerator/wards/ and .../mapping/ and .../ui/, plus building/Cutter.hx and the Polygon methods they call.
Write research/findings/os-wards-render.md: Ward.createGeometry base behaviour (getCityBlock insets per edge type — street/wall/neighbour widths), createAlleys recursive subdivision (exact bisect rule: longest edge, split ratio, angle jitter, alley gap, minSq, gridChaos, sizeChaos, emptyProb, termination), createOrthoBuilding (the L/rect building slicer), every ward subclass's parameters and special geometry (Castle, Cathedral, Market fountain/statue, Park radial/ semiradial cuts, Farm, GateWard, Military, Patriciate, Merchant, Craftsmen, Slum, Administration, CommonWard), rateLocation formulas. Rendering: CityMap layer order, Brush, Palette values (every colour hex of every palette), stroke widths, how walls/towers/gates/roads/buildings are drawn, PatchView. Include all constants.`,
  },
  postTask('mfcg-posts-a', 'watabou Patreon "🏰 City Generator" collection, OLDER half', cityA),
  postTask('mfcg-posts-b', 'watabou Patreon "🏰 City Generator" collection, NEWER half', cityB),
  postTask('mfcg-devlogs-a', 'watabou itch.io devlogs for Medieval Fantasy City Generator, OLDER half (format: post.md + images/)', dlA),
  postTask('mfcg-devlogs-b', 'watabou itch.io devlogs for Medieval Fantasy City Generator, NEWER half', dlB),
  postTask('vg-posts-a', 'watabou Patreon "🏡 Village Generator" collection, OLDER half', vilA),
  postTask('vg-posts-b', 'watabou Patreon "🏡 Village Generator" collection, NEWER half', vilB),
  postTask('vg-ng-devlogs', 'watabou itch.io devlogs for Village Generator (21) and Neighbourhood (6)', dlVN, 'Keep VG and NG findings in separate top-level sections.'),
  postTask('ftg-posts-a', 'Fantasy Town Generator (Thomas) Patreon development posts, OLDEST third', ftgA, 'FTG generates server-side; pay special attention to anything about road/layout growth, district logic, building/lot placement, walls, water, farms/forests, terrain, the people/economy simulation, performance, rendering (Three.js), and data/export formats.'),
  postTask('ftg-posts-b', 'Fantasy Town Generator (Thomas) Patreon development posts, MIDDLE third', ftgB, 'FTG generates server-side; pay special attention to anything about road/layout growth, district logic, building/lot placement, walls, water, farms/forests, terrain, the people/economy simulation, performance, rendering (Three.js), and data/export formats.'),
  postTask('ftg-posts-c', 'Fantasy Town Generator (Thomas) Patreon development posts, NEWEST third', ftgC, 'FTG generates server-side; pay special attention to anything about road/layout growth, district logic, building/lot placement, walls, water, farms/forests, terrain, the people/economy simulation, performance, rendering (Three.js), and data/export formats.'),
  {
    key: 'ftg-docs-params',
    prompt: `${COMMON}

YOUR SLICE (ftg-docs-params): FTG's public user guide and its generation parameter space.
Read completely: every research/ftg-docs/*.md page (36 pages; open the images listed in each — they live in research/ftg-docs/images/), with special depth on createSettlement__settlement_layout, districts, landscape, water pages. Then read research/ftg-capture/create-request.json (the exact JSON body the client PUT to the server to create our captured settlement: the full generation-parameter schema with the "Medieval europe" preset values — read it in ranges; it is ~430 KB, most of it building/profession tables, so first list top-level keys with python/jq via Bash, then read every layout/district/road/wall/water/landscape/farm/forest related subtree in full) and research/ftg-capture/presets.json (building types, resource dependency graph, professions, items/services, sizes with width in metres). Also view the creation-form screenshots captures/ftg/2026-09-21T05-08-07/steps/*.png.
Write research/findings/ftg-docs-params.md: (1) the complete layout-generation parameter schema with meanings, defaults and ranges (stages, road branch type Continue/Curve-around-origin, max road angles, segment length, branch-after-N-segments vertical/horizontal, minimum district area, new-main-road percentage, building placement Dense/Gaps/Individually placed, wall placement, initial road patterns, number of districts, suburb stage…); (2) your reconstruction of the generation algorithm those parameters imply (staged road-network growth → districts from enclosed areas → lots → buildings), tagged [STATED]/[INFERRED]; (3) the socio-economic model schema (sizes→population→buildings via resource dependency graph, professions, lifestyles, races, religions, governments, factions, calendar, schedules); (4) water/coast/river/farm/forest/natural-area options; (5) open questions.`,
  },
  {
    key: 'ftg-payload-visual',
    prompt: `${COMMON}

YOUR SLICE (ftg-payload-visual): what FTG actually returns and draws for a generated settlement ("Galeiaward": size CITY ~10000 people, Medieval europe preset, coastal, river, farms, forests, reserve natural area, walled).
Read: research/ftg-capture/layout-structure.md (schema-less decode of the 593 KB protobuf layout the server returned: field paths are numbers; infer meaning from counts, ranges and sample strings — e.g. 3.1 = 5326 road edges {id,a,b,type enum 1..14}, 3.2 = 4303 nodes {id, position in integer units up to 500000 (work out the unit from the 3500 m settlement width / 5 km extent), adjacency}, 8 = 2798 buildings {id, packed polygon coords, name, type enum, type label, entrance point…}, 9 = land-use lot groups, 10 = districts, 11 = decorations/trees…). You may write and run small Python scripts with ${ROOT}/tools/pb_raw.py's parse()/varint helpers against captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin to compute statistics that reveal the generator's behaviour: road segment length distribution (does it cluster at the 50 m parameter?), turn-angle distribution at degree-2 nodes (vs the 15° max-angle parameter), node degree histogram, edge-type frequencies, block/lot/building area and vertex-count distributions, building rectangularity and alignment to nearest road, building-to-road setback, district polygon sizes, tree spacing. Save any script under research/ftg-capture/ and put the numbers in your findings.
Also read completely the MIT-licensed Foundry module by FTG's author at reference/towngenerator-foundrymodule/ (importer.js, src/*.js, handlebars/*.hbs, README.md, docs/*.png) and document the entity model + event protocol it exposes (building/person/faction/district fields, time simulation, pins, state ids).
View every screenshot in captures/ftg/2026-09-21T05-23-58/steps/*.png and captures/ftg/2026-09-21T05-08-07/steps/013-after-create.png and 001-landing.png and describe FTG's visual language precisely (terrain texturing, water shading/shore foam, beach, field textures and hedgerows, tree sprites, road hierarchy widths/colours, plaza/lot paving, building roof colour + shading, wall + towers, docks/piers, district labels on curves, markers, UI chrome). Note captures/ftg/*/report.md hold CPU profiles of the client-side scene build (minified names; only note coarse facts: total busy time, Three.js/WASM involvement).
Write research/findings/ftg-payload-visual.md with data model, measured statistics, inferred generation rules, visual spec, and open questions.`,
  },
  {
    key: 'profile-mfcg',
    prompt: `${COMMON}

YOUR SLICE (profile-mfcg): recordings of the LIVE Medieval Fantasy City Generator (build 0.11.x). Captures: captures/mfcg/2026-09-21T05-03-24 (cold load + 3 random regenerations via Enter) and captures/mfcg/2026-09-21T05-06-58 (size=80 seeded 777001..777003, coast+river+walls+citadel+shantytown+greens+farms). Each has report.md (LARGE — read it in ranges with offset/limit, all of it), report.json, meta.json, and per pass: profile/ (gen-N.cpuprofile summaries in report.md: self time by class, top functions, call trees), coverage/gen-N.calls.json (EXACT call count of every executed function, labelled package.Class.method — load with python/jq and analyse fully), draw/gen-N.draw.json, console.jsonl (the build's own stage trace with per-stage ms, retries such as "Unable to build a street!", "Unable to build a canal!", "Bloating the citadel", "Equalizing…"), gen-N.png screenshots, and the final URL of each generation in meta.json (the blueprint parameter set: size, seed, citadel, urban_castle, plaza, temple, walls, shantytown, coast, river, greens, gates, sea, farms…).
Tasks: (1) Build the complete inventory of com.watabou.* classes and methods that executed, grouped by package (model, model.wards, model.blocks, mapping, geom, geom.polygons, utils, linguistics/tracery, export, scenes/overlays…), with call counts and time; from names+counts+call-tree parentage reconstruct the live pipeline: what each stage calls, in what order, how often (e.g. PoissonPattern, Delaunator, DCEL/HalfEdge, PolyBool/PolyCut/PolyBounds.obb, Bisector.makeCut, Topology, Canal, CurtainWall, DistrictBuilder, Grower/DocksGrower/ParkGrower, Forester, Block/TwistedBlock, WardGroup, Building, Namer, Tracery…). (2) Diff against the open-source ancestor (reference/TownGeneratorOS — read building/Model.hx for the old pipeline): what is new, replaced, or gone. (3) Cost model: ms per stage vs city size, where time goes (generation vs OpenFL rendering vs text). (4) Draw record: palette, stroke widths, fonts, label texts, layer order. (5) For each newly identified subsystem give your best [INFERRED] algorithm hypothesis from its method names/call counts, and how one could test it.
Write research/findings/profile-mfcg.md.`,
  },
  {
    key: 'profile-village',
    prompt: `${COMMON}

YOUR SLICE (profile-village): recordings of the LIVE Village Generator (1.6.x): captures/village/2026-09-21T05-04-05 (cold load + 3 regenerations; tags such as river, pond, grove, isolated, dead end, highway, palisade, no square, confluence, sparse). Contents as for the other captures: report.md (LARGE — read all of it in ranges), report.json, meta.json (final URLs with seed + tags), profile/, coverage/gen-N.calls.json (exact call counts per package.Class.method — analyse fully with python/jq), draw/gen-N.draw.json, console.jsonl, gen-N.png screenshots (view all).
Tasks: (1) full inventory of com.watabou.* classes/methods executed, grouped by package, with counts and time; reconstruct the generation pipeline (Region, terrain/heightmap + contours, water: river/pond/confluence, roads/highway/dead ends, square, lots/buildings placement along roads, fields/farms, trees/groves/orchards, palisade, Legend + population, naming) from names, counts and call-tree parentage; (2) cost model per stage; (3) draw record: palette, line widths, hatching/shading, tree rendering, label fonts/texts, layer order, contour lines; (4) [INFERRED] algorithm hypotheses per subsystem + how to test them; (5) what VG shares with MFCG (common com.watabou.geom / utils classes).
Write research/findings/profile-village.md.`,
  },
  {
    key: 'profile-neighbourhood',
    prompt: `${COMMON}

YOUR SLICE (profile-neighbourhood): recordings of the LIVE Neighbourhood generator: captures/neighbourhood/2026-09-21T05-04-54 (cold load + 3 regenerations; tags medium, square, street, area, leafy…). Contents: report.md (LARGE — read all of it in ranges), report.json, meta.json, profile/, coverage/gen-N.calls.json (exact call counts — analyse fully with python/jq), draw/gen-N.draw.json, console.jsonl, gen-N.png screenshots (view all).
Tasks: (1) full inventory of com.watabou.* classes/methods executed, grouped by package, with counts/time; reconstruct the pipeline (Hood model: street network, blocks, lot subdivision, building footprints with courtyards, roofs with hatching/ridges, chimneys/dormers, trees/greens, landmark buildings, shadows) from names, counts and call-tree parentage; (2) cost model; (3) draw record: palette, line widths, roof hatching density, shadows, fonts, layer order; (4) [INFERRED] algorithm hypotheses per subsystem + tests; (5) shared code with MFCG/VG.
Write research/findings/profile-neighbourhood.md.`,
  },
  {
    key: 'visual-spec',
    prompt: `${COMMON}

YOUR SLICE (visual-spec): the VISUAL language of all four references, from our own recordings. View every screenshot: captures/mfcg/2026-09-21T05-03-24/{profile,coverage,draw}/gen-*.png, captures/mfcg/2026-09-21T05-06-58/{profile,coverage,draw}/gen-*.png, captures/village/2026-09-21T05-04-05/*/gen-*.png, captures/neighbourhood/2026-09-21T05-04-54/*/gen-*.png, captures/ftg/2026-09-21T05-23-58/steps/*.png, captures/ftg/2026-09-21T05-08-07/steps/{001-landing,013-after-create}.png. Then load every */draw/gen-N.draw.json with python (fields under .rec: canvas2d method counts, fillStyles, strokeStyles, lineWidths, lineJoins, lineCaps, dashes, fonts, texts, pathSegs, canvases, log = ordered paint log [tMs, op, canvasSize, style, segments, lineWidth]) and the "Drawing record" sections of each captures/*/*/report.md.
Write research/findings/visual-spec.md: per generator, a precise style sheet — background/paper, palette with hex values and what each colour is used for (map colours to features by cross-checking counts/layer order with what is visible), stroke widths (in px at the recorded scale, and relative hierarchy), joins/caps, building fill/outline/roof treatment, shadows, hatching, trees (shape construction, clustering, shading), water (fill, shore lines, ripples, depth shading), fields/furrows, roads (casing vs fill, widths per class), walls/towers/gates, bridges/piers, labels (fonts, sizes, curved district labels, title, legend, scale bar, compass), grid, layer order bottom→top, and resolution/canvas strategy (how many canvases, their sizes, WebGL texture uploads). Finish with a cross-generator comparison table and the minimum renderer feature list needed to match all four.`,
  },
]

phase('Read')
log(`${TASKS.length} readers; slices: ${TASKS.map((t) => t.key).join(', ')}`)
const results = await parallel(TASKS.map((t) => () =>
  agent(t.prompt, { label: `read:${t.key}`, phase: 'Read', schema: SCHEMA, agentType: 'general-purpose', model: 'opus' })
    .then((r) => r || { key: t.key, failed: true })))

const ok = results.filter((r) => r && !r.failed)
const failed = results.filter((r) => !r || r.failed).map((r) => (r ? r.key : 'unknown'))
if (failed.length) log(`FAILED readers: ${failed.join(', ')}`)

phase('Critic')
const critic = await agent(`${COMMON}

YOU ARE THE COMPLETENESS CRITIC. ${ok.length} readers have written findings files under research/findings/ (${ok.map((r) => r.findings_file).join(', ')}). Failed/missing readers: ${failed.join(', ') || 'none'}.
1. Read research/worklists.json (every post/devlog directory that had to be read), list research/ftg-docs/*.md, and list the capture directories under captures/. For EVERY source, grep the findings files for its id/path to confirm it was covered; list every source with no citation anywhere.
2. Read every findings file completely. Flag: techniques tagged [NAMED-ONLY] or low-confidence that a DIFFERENT available source could resolve (name the source); contradictions between files; claims tagged [STATED] that look unsupported (spot-check at least 12 by opening the cited post).
3. For any uncovered source or resolvable gap that you can close yourself within this task, do it: read the source and append a "## Critic addendum" section to the relevant findings file.
Write research/findings/_critic.md (coverage table, contradictions, spot-check results with verdicts, remaining gaps). Return the structured summary (use key "_critic"; put remaining gaps in open_questions and coverage facts in top_insights; techniques may be empty).`, { label: 'critic:completeness', phase: 'Critic', schema: SCHEMA, agentType: 'general-purpose', model: 'fable' })

return {
  readers: ok.map((r) => ({ key: r.key, file: r.findings_file, sources_read: r.sources_read, images_viewed: r.images_viewed, skipped: r.sources_skipped, n_techniques: (r.techniques || []).length, top_insights: r.top_insights, open_questions: r.open_questions })),
  techniques: ok.flatMap((r) => (r.techniques || []).map((t) => ({ slice: r.key, ...t }))),
  failed,
  critic: critic ? { file: critic.findings_file, insights: critic.top_insights, gaps: critic.open_questions } : null,
}
